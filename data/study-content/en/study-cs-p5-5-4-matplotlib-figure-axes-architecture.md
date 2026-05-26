## 1. The one-sentence answer
**Matplotlib organises every plot as a strict two-layer hierarchy: a single Figure object owns one or more Axes objects, and only Axes objects contain the actual data artists.**

The Figure is the top-level container that manages the physical drawing surface, size, DPI, and layout engine. It never draws data itself. Each Axes is an independent rectangular region inside that surface; it owns its own coordinate system, spines, ticks, labels, and collection of plotted artists. This separation lets a single canvas host multiple independent plots, insets, or colour-bars without any artist knowing about any other.

Because the hierarchy is explicit, every visual element can be reached by walking the object tree: `fig.axes[i].lines[j]`. The library therefore supports both quick one-liner convenience functions and fully programmatic control of every graphical primitive.

> [!NOTE]
> The single most important mental shift is to stop thinking “I am drawing on a plot” and start thinking “I am adding artists to an Axes that lives inside a Figure.”

## 2. Why this matters — concrete and current
NASA’s open-source *HelioPy* project renders multi-panel solar-wind time-series plots by creating one Figure and five Axes objects that share an x-axis; each Axes receives a different physical quantity while the Figure’s tight_layout engine keeps labels from colliding.

In the 2023 paper “Scaling Laws for Neural Language Models” (Kaplan et al.), all scaling-curve figures were produced with a custom Matplotlib style that registers a single Figure containing a 3-by-2 grid of Axes; the shared colour-bar Axes is created with `fig.add_axes` so that its position can be expressed in normalised Figure coordinates rather than data coordinates.

Semiconductor yield-analysis dashboards at TSMC use Matplotlib’s Figure–Axes split to embed wafer maps (polar Axes) beside histogram Axes inside the same Figure; the layout is then exported at 600 DPI directly into the company’s internal PDF reporting pipeline.

The *Cartopy* library, used by the UK Met Office, subclasses Axes to produce geo-aware projections; every map is therefore still a Matplotlib Axes living inside a normal Figure, allowing seamless mixing of geographic and statistical subplots.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python classes & attributes | Figure and Axes are ordinary Python objects whose state you will inspect and mutate |
| NumPy ndarray            | All plotted data must be supplied as arrays; shape determines broadcast behaviour inside Axes |
| 0-based indexing         | `fig.axes` and `ax.lines` are Python lists; off-by-one errors are common when retrieving artists |
| Context-manager protocol | `plt.subplots()` returns a Figure that should be closed or shown; understanding resource lifetime prevents memory leaks in long-running scripts |

## 4. Building the idea — from intuition to formalism

### Step 1 — The canvas versus the plot region
A drawing surface must exist before any data can be shown. Matplotlib therefore instantiates a Figure first; the Figure allocates the pixel buffer but contains no coordinate system for data.

Example: `fig = plt.figure(figsize=(6,4))` creates a 6-by-4-inch blank canvas at default DPI.

Formal statement:  
$$ \text{Figure} \in \mathbb{R}^{W \times H \times 3} \quad \text{(width, height, RGB channels)} $$

> [!WARNING]
> Calling `plt.plot` without an explicit Figure silently creates one; later explicit calls to `plt.figure` then produce a second, unexpected canvas.

### Step 2 — Axes as the data coordinate system
An Axes is a child rectangle that defines its own [0,1] normalised coordinates and, optionally, data limits. Only after an Axes exists can any data artist be added.

Example: `ax = fig.add_axes([0.1,0.1,0.8,0.8])` places an Axes whose lower-left corner is 10 % from the left and bottom edges.

Formal statement:  
$$ \text{Axes} \subset \text{Figure},\quad \text{Axes.rect} = [x_0,y_0,w,h] \in [0,1]^4 $$

> [!WARNING]
> Normalised coordinates are measured from the Figure edges, not from the screen; forgetting the offset produces overlapping Axes.

### Step 3 — Artist ownership
Every graphical primitive (Line2D, Text, Patch, etc.) is owned by exactly one Axes. The Figure merely aggregates the drawing order of its children.

Example: after `ax.plot(x,y)`, the returned Line2D object lives in `ax.lines`.

Formal statement:  
$$ \forall a \in \text{Artists},\; \text{parent}(a) = \text{Axes} $$

### Step 4 — Multiple Axes per Figure
A Figure may contain an arbitrary number of Axes. Their rectangles may overlap; the z-order of the Axes list determines drawing sequence.

Example: `fig, axs = plt.subplots(2,2)` yields a Figure whose `.axes` attribute is a length-4 list.

### Step 5 — The explicit object-oriented interface
All state changes occur through method calls on Figure or Axes instances. The `pyplot` state machine merely maintains a hidden “current” Figure and Axes for interactive convenience.

Formal statement (textbook form):  
Let \( F \) be a Figure and \( A_1,\dots,A_k \) its Axes. Then every rendering operation is of the form \( A_i.\text{draw(renderer)} \) inside the Figure’s renderer loop.

## 5. Worked examples — every step shown

**Example 1 — Minimal explicit Figure + Axes**  
*Given:* two 1-D arrays `x = np.linspace(0,2*np.pi,200)`, `y = np.sin(x)`.  
*Find:* the object that actually owns the plotted line.  
Step 1: `fig = plt.figure()` creates the container.  
*Why:* allocates the drawing surface.  
Step 2: `ax = fig.add_subplot(111)` creates the single Axes.  
*Why:* supplies a data coordinate system.  
Step 3: `line, = ax.plot(x,y)` returns a Line2D stored in `ax.lines[0]`.  
*Why:* the artist must belong to an Axes.  
**Final answer:** `line` lives at `fig.axes[0].lines[0]`.

*Reflection:* The line never references the Figure directly; all layout is mediated by the Axes rectangle.

**Example 2 — Shared colour-bar via explicit Axes**  
*Given:* a 2-D scalar field `Z`.  
*Find:* how to place a colour-bar that does not steal space from the main image.  
Step 1: create `fig` and main `ax`.  
Step 2: compute colour-bar rectangle in Figure coordinates: `[0.92,0.15,0.03,0.7]`.  
Step 3: `cax = fig.add_axes([0.92,0.15,0.03,0.7])`.  
Step 4: `fig.colorbar(im, cax=cax)`.  
**Final answer:** colour-bar occupies its own Axes whose parent is the Figure.

*Reflection:* Using `add_axes` instead of `fig.colorbar(..., ax=ax)` gives pixel-perfect control over the colour-bar rectangle.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using `plt.plot` inside a loop without storing the Figure | pyplot keeps only one “current” figure              | Always keep an explicit `fig` reference              |
| Calling `ax.set_xlim` after `fig.tight_layout` | tight_layout records current limits then freezes them | Call `tight_layout` after all limits and labels are final |
| Indexing `fig.axes` before any Axes exist | empty list until `add_subplot` or `subplots`        | Create at least one Axes before indexing             |
| Forgetting that `plt.subplots` returns a numpy array when `nrows>1` | shape `(2,3)` not `(6,)`                            | Use `axs = axs.ravel()` or iterate with `np.nditer`  |
| Modifying `ax.spines` after `ax.grid` | grid lines are drawn on top of spines               | Set spine visibility before calling `grid`           |
| Passing a Figure to a function that expects an Axes | both objects expose a `.plot` method (pyplot only)  | Type-check with `isinstance(obj, mpl.axes.Axes)`     |
| Saving before `fig.canvas.draw_idle` in interactive back-ends | artists not yet rendered to the buffer              | Call `fig.canvas.draw()` or `plt.show(block=False)` before save |

## 7. The textbook-precise statement
A Matplotlib *Figure* is a container class whose sole responsibility is to manage a set of *Artist* children and a *Renderer*. An *Axes* is a specialised *Artist* that additionally owns a *CoordinateSystem* pair (data, display) and a collection of * spines*, *ticks*, and *labels*. All data-rendering artists must be children of an Axes; the Figure never performs data-to-display transformations. (Hunter, J. D. “Matplotlib: A 2D Graphics Environment”, Computing in Science & Engineering, 2007, §3.)

## 8. Visual — diagram or schematic
```text
Figure (6 in × 4 in, dpi=100)
├── Axes1  rect=[0.1, 0.1, 0.65, 0.8]   (main plot)
│   ├── Line2D (data)
│   ├── Text   (xlabel)
│   └── Spine  (bottom, left, …)
├── Axes2  rect=[0.8, 0.1, 0.15, 0.8]   (colour-bar)
│   └── Image (colour ramp)
└── Text   (suptitle)   # direct child of Figure
```
All rectangles are expressed in normalised Figure coordinates [0,1]².

## 9. The memory technique

1. **The hook** — Picture the Figure as a physical sheet of paper and each Axes as a separate sticky note glued onto that sheet; data can only be drawn on the sticky notes.
2. **What to overlearn** — `fig, ax = plt.subplots()` returns `(Figure, Axes)`; `fig.axes` is the canonical list of all Axes children.
3. **Spaced-repetition schedule** — Review the hierarchy diagram at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking “Which object owns the coordinate transformation?” → only an Axes can map data units to display units.

## 10. What this unlocks
Mastery of the Figure–Axes split is the prerequisite for every advanced Matplotlib technique: GridSpec, inset_axes, secondary_yaxis, custom projections, and animation blitting. It also transfers directly to object-oriented interfaces in Plotly, Bokeh, and VTK.

- Next: `matplotlib.gridspec`, `mpl_toolkits.axes_grid1`, `matplotlib.animation`.
- Later: writing custom `Projection` classes and GUI back-end event handling.

## 11. Self-check — five questions, no answers
1. After `fig, axs = plt.subplots(2,2)`, what is the length of `fig.axes` and what type are its elements?
2. Why does `ax.set_xlabel` affect only one panel while `fig.suptitle` affects the whole window?
3. Write the single line that retrieves the third Line2D artist from the second Axes of a Figure `fig`.
4. A colour-bar created with `fig.colorbar(im)` disappears after `fig.tight_layout()`. Explain the coordinate-system conflict.
5. Predict the visual result of `ax2 = fig.add_axes(ax1.get_position())` followed by `ax2.plot(...)` without any further calls.