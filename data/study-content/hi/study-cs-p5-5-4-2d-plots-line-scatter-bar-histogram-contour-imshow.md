## 1. The one-sentence answer

**2D plots map two variables onto a plane using distinct visual encodings (lines, points, bars, bins, level sets, or pixel arrays) so that patterns become perceptible to the human visual system.**

Line plots connect ordered pairs \((x_i, y_i)\) with straight segments to show continuous change. Scatter plots place isolated markers at the same pairs when the relationship is not assumed to be ordered or dense. Bar plots and histograms aggregate counts or frequencies into rectangular heights. Contour plots draw isolines of a scalar field \(z = f(x, y)\), while `imshow` renders the same field as a coloured pixel grid. The choice of encoding is dictated by the measurement scale of each variable and the question being asked of the data.

> [!NOTE]
> The single most important insight is that every 2D plot is a deliberate projection: you are choosing which mathematical relationship (ordering, density, frequency, gradient, or spatial correlation) to make visually immediate and which information to discard.

## 2. Why this matters — concrete and current

In the Perseverance rover’s SHERLOC instrument, contour plots of Raman intensity versus wavelength and spatial coordinate are generated daily on Mars to locate organic signatures; the same pipeline runs on the ground in JPL’s visualization cluster using matplotlib’s `contourf`.

Semiconductor fabs at TSMC use wafer maps rendered with `imshow` to display film-thickness variation across 300 mm silicon wafers; a single bad pixel cluster visible only in the image view can halt a multi-million-dollar lot.

In reinforcement-learning research, papers from DeepMind’s AlphaFold team routinely publish scatter plots of predicted versus experimental pLDDT scores; the visual separation of the high-confidence cloud from the diffuse low-confidence region is accepted as primary evidence of model calibration.

Climate-modelling groups at NCAR produce daily 2-D histograms of precipitation versus temperature from CMIP6 ensembles; the resulting joint distributions are the direct input to impact-assessment models used by the IPCC.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| NumPy `ndarray`          | All plotting libraries consume arrays; shape and dtype determine which plot function is legal |
| Basic Python slicing     | Selecting columns or sub-regions before plotting          |
| Elementary statistics    | Mean, variance, and binning logic underlie histograms and bar plots |
| Cartesian coordinate geometry | Every plot command ultimately places marks at \((x, y)\) or \((i, j)\) |

If any row is unfamiliar, pause and master it first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Data as ordered pairs
A data set for 2-D plotting is a collection of ordered pairs \((x_i, y_i)\) or a scalar field sampled on a grid.  
Example: the lists `x = [0, 1, 2]` and `y = [0, 1, 4]` represent three points.  
Formally, let \(D = \{(x_i, y_i)\}_{i=1}^n\) where each pair belongs to \(\mathbb{R}^2\).  
> [!WARNING]  
> Treating categorical labels as numeric \(x\)-coordinates without explicit conversion produces a meaningless line plot whose slope has no physical interpretation.

### Step 2 — Encoding choice by measurement scale
Continuous ordered data maps to line or contour; unordered or categorical data maps to scatter or bar; counts map to histogram.  
Example: time-series temperature readings are plotted with `plt.plot`; survey responses by category are plotted with `plt.bar`.  
The decision is expressed by the predicate: if \(x\) admits a total order and the phenomenon is expected to vary smoothly, choose a line; otherwise choose scatter.

### Step 3 — Matplotlib artist model
Every call to `plt.plot`, `plt.scatter`, etc. creates an `Artist` object that is added to the current `Axes`. The `Axes` maintains a transformation from data coordinates to display pixels.  
Formally, the renderer applies the affine map \(T: (x,y) \mapsto (s_x x + t_x, s_y y + t_y)\).  
> [!WARNING]  
> Calling `plt.plot` inside a loop without clearing the `Axes` accumulates artists, producing an ever-darker figure that no longer reflects the latest data.

### Step 4 — Line plot as piecewise-linear interpolant
`plt.plot(x, y)` draws segments between consecutive points after sorting by \(x\).  
The rendered object is the graph of the piecewise-linear function \(\hat{f}(x) = y_i + \frac{y_{i+1}-y_i}{x_{i+1}-x_i}(x-x_i)\) for \(x \in [x_i, x_{i+1}]\).

### Step 5 — Scatter as discrete measure
`plt.scatter(x, y, s=size, c=color)` places markers whose visual variables (size, colour) can encode additional dimensions. The underlying data remain the same set \(D\).

### Step 6 — Histogram as empirical density estimator
`plt.hist(y, bins=k)` partitions the range of \(y\) into \(k\) intervals and counts occupancy. The height of the \(j\)-th bar equals \(\frac{1}{n h} \sum_i \mathbf{1}_{[b_j, b_{j+1})}(y_i)\) where \(h\) is bin width.

### Step 7 — Contour and imshow for scalar fields
Given a matrix \(Z \in \mathbb{R}^{m\times n}\) defined on meshgrid \((X,Y)\), `contour(X,Y,Z)` draws level sets \(\{(x,y) : f(x,y) = c_k\}\). `imshow(Z)` maps each matrix entry to a coloured pixel via a colormap.

### Step 8 — Closing the loop with explicit Axes
All production code ends with `fig, ax = plt.subplots()` followed by `ax.plot(...)` and `ax.set_xlabel(...)`. This guarantees a single, well-defined coordinate transformation and reproducible output.

## 5. Worked examples — har step show karo

**Example 1 — Minimal line plot**  
*Given:* `x = np.linspace(0, 2*np.pi, 200)`, `y = np.sin(x)`.  
*Find:* the code that produces a clean line plot.  
```python
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0, 2*np.pi, 200)
y = np.sin(x)
fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_xlabel('x')
ax.set_ylabel('sin(x)')
```
*Why:* `linspace` guarantees ordered, evenly spaced abscissae required by Step 4.  
**Final answer**  
A single smooth sine curve appears on labelled axes.

*Reflection:* The example is trivial yet already demonstrates the explicit `Axes` pattern demanded by Step 8.

**Example 2 — Scatter with colour dimension**  
*Given:* 500 random points whose colour encodes a third variable.  
*Find:* the scatter call.  
```python
rng = np.random.default_rng(0)
x = rng.normal(size=500)
y = rng.normal(size=500)
c = x**2 + y**2
fig, ax = plt.subplots()
ax.scatter(x, y, c=c, cmap='viridis', s=8)
```
*Why:* Colour mapping adds a visual channel without requiring a third spatial axis.  
**Final answer**  
Points appear with colour varying continuously from centre outward.

*Reflection:* Students often forget that `c` must be the same length as `x`; the length check is performed inside `scatter`.

**Example 3 — Histogram versus bar**  
*Given:* 10 000 samples from a standard normal.  
*Find:* both a histogram and a bar plot of binned counts.  
```python
data = rng.normal(size=10_000)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8,3))
ax1.hist(data, bins=40, density=True)
ax2.bar(np.arange(40), np.histogram(data, bins=40)[0])
```
*Why:* `hist` automatically computes bins; `bar` requires explicit heights, illustrating the distinction in Step 6.  
**Final answer**  
Left panel shows density estimate; right panel shows raw counts.

*Reflection:* Using `density=True` normalises area to one, matching the formal definition of a probability density.

**Example 4 — Contour and imshow of the same field**  
*Given:* \(z = \sin(x)\cos(y)\) on \([- \pi, \pi]^2\).  
*Find:* both visualisations side by side.  
```python
x = np.linspace(-np.pi, np.pi, 200)
X, Y = np.meshgrid(x, x)
Z = np.sin(X) * np.cos(Y)
fig, (ax1, ax2) = plt.subplots(1, 2)
ax1.contour(X, Y, Z, levels=10)
ax2.imshow(Z, extent=[-np.pi, np.pi, -np.pi, np.pi], origin='lower')
```
*Why:* `contour` draws isolines; `imshow` fills pixels, exactly the two encodings of Step 7.  
**Final answer**  
Left panel: closed curves of constant \(z\); right panel: smooth colour image of the same surface.

*Reflection:* `origin='lower'` aligns the array index \((0,0)\) with the mathematical lower-left corner.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting `fig, ax = plt.subplots()` | Reliance on implicit `plt` state            | Always create explicit `Axes` first          |
| Plotting unsorted x for line plot | Assumption that data order equals x-order   | Sort or use `np.argsort` before `plot`       |
| Using `plt.imshow` on 1-D data    | Confusion between image and vector data     | Check `.ndim == 2` before calling `imshow`   |
| Colourbar missing after `contourf`| Colour mapping not attached to figure       | Store the mappable and call `fig.colorbar`   |
| Log-scale axis labels wrong       | Tick formatter not updated after `set_yscale('log')` | Use `SymmetricalLogLocator` or `ScalarFormatter` |
| Overlapping labels                | Default `tight_layout` not called           | Call `fig.tight_layout()` before `savefig`   |
| Saving before `show()` in interactive session | Event loop not flushed                      | Use `plt.show(block=True)` or save directly  |

## 7. The textbook-precise statement

A 2-D plotting routine accepts a finite set of points \(D\subset\mathbb{R}^2\) or a sampled scalar field \(Z\in\mathbb{R}^{m\times n}\) together with an encoding map \(\phi\) that assigns each datum to a visual mark. The routine returns a figure whose geometry realises the graph of the piecewise-linear interpolant (line), the discrete measure (scatter), the histogram estimator, or the level sets of \(Z\) (contour/imshow). All operations are performed under an affine screen transformation \(T\) that preserves the ordering and adjacency relations present in the data. (Hunter, J. D. “Matplotlib: A 2D Graphics Environment”, Computing in Science & Engineering, 2007, §3.)

## 8. Visual — diagram or schematic

```
          y
          ^
          |      contour lines
          |    /------------\
          |   /   * (scatter) \
          |  /     line        \
          | /___________________\______> x
          |   bars     histogram
          |
imshow pixels fill the rectangle
```

The diagram shows the same coordinate plane hosting every encoding listed in Step 2.

## 9. The memory technique

1. **The hook** — Picture a single sheet of graph paper: a line walks across it, dots land on it, bars stand on it, a contour map draws paths of equal height, and a photograph (imshow) covers every square with colour.

2. **What to overlearn** — The four canonical calls: `ax.plot`, `ax.scatter`, `ax.hist`, `ax.contour`/`imshow`; the explicit `fig, ax = plt.subplots()` pattern; and the fact that `cmap` and `norm` control colour mapping.

3. **Spaced-repetition schedule** — Review the four calls after 1 day, 3 days, 7 days, 16 days, and 35 days by re-plotting the sine-wave example each time.

4. **First-principles fallback** — If the exact function name is forgotten, ask: “Is the data ordered and continuous?” → line; “Are the points independent?” → scatter; “Do I need counts?” → histogram; “Is the quantity defined everywhere on a grid?” → contour or imshow.

## 10. What this unlocks

Mastery of these six plot types is the prerequisite for all higher-dimensional visualisation, interactive dashboards, and publication-quality figures in scientific Python.

- 3-D surface and volume rendering (Phase 5 continuation)  
- Seaborn statistical graphics that wrap the same matplotlib artists  
- Animation of time-evolving fields using `FuncAnimation`  
- Export to vector formats (PDF, SVG) required by journals

## 11. Self-check — five questions, no answers

1. Given an unsorted list of \((x,y)\) pairs, which single line of code guarantees a correct line plot?  
2. Why does `ax.imshow(Z)` produce a vertically flipped image compared with the mathematical \((x,y)\) plane, and how is it corrected?  
3. A data set contains both numeric timestamps and categorical labels; which plot type must be ruled out and why?  
4. After `ax.contourf(X,Y,Z)`, the colour bar is missing; write the minimal additional statement that restores it.  
5. You observe that two adjacent histogram bins have swapped heights after you change the number of bins from 20 to 21. What property of the data or the algorithm explains the swap?