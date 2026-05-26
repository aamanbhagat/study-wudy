## 1. The one-sentence answer
**2D plots in scientific Python are Matplotlib functions that map one- or two-dimensional NumPy arrays to geometric marks on a Cartesian canvas, each function chosen so that position, length, area, or color directly encodes the numerical relationships.**

Line plots connect ordered pairs with straight segments to show continuous change. Scatter plots place isolated markers so that point density or position reveals correlation without assuming order. Bar plots use rectangular heights to compare discrete categories. Histograms bin a single variable and display frequency as bar area. Contour plots draw level curves of a scalar function of two variables. Imshow renders a matrix as a colored grid so that pixel intensity stands for the matrix entry.

These six primitives cover the majority of exploratory and publication-grade figures in computational science because each matches a distinct data geometry: ordered sequences, unordered pairs, categorical counts, univariate distributions, level sets, and dense fields.

> [!NOTE]
> The decisive insight is that the same numerical array can be plotted with any of these functions; only the chosen mapping reveals or conceals the structure present in the data.

## 2. Why this matters — concrete and current
NASA’s Kepler and TESS missions produce time-series photometry that is routinely inspected with line plots to detect exoplanet transits; a single mis-scaled line plot can hide a 0.1 % flux drop that constitutes a discovery.

In machine-learning research, loss surfaces of deep networks are visualized with contour and imshow plots; the 2014 paper “Visualizing and Understanding Convolutional Networks” by Zeiler & Fergus used such plots to diagnose why certain architectures converge while others oscillate.

Semiconductor foundries employ histogram and bar plots of wafer-test measurements to monitor process variation; Intel’s 2022 process-node reports cite histogram overlap statistics between successive lots as the acceptance criterion for high-volume manufacturing.

Climate-model ensembles at NOAA and ECMWF generate two-dimensional fields of temperature and precipitation that are archived and compared using imshow and contour overlays; discrepancies between models are quantified by subtracting the arrays and replotting the difference field.

High-energy physics experiments at CERN store petabytes of calorimeter data; physicists produce scatter plots of energy versus pseudorapidity in real time during data-taking shifts to verify detector calibration before the next fill.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| NumPy ndarray            | All six plotting functions consume ndarray objects; shape and dtype determine what can be plotted. |
| Basic Python slicing     | Selecting rows, columns, or subsets of data is required before any plot call. |
| Cartesian coordinate geometry | Every plot places marks at explicit (x, y) locations; understanding axes orientation prevents inverted or transposed figures. |
| Matplotlib pyplot interface | The state-machine API (plt.plot, plt.scatter, …) is the entry point; without it the functions are inaccessible. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Data must be arrays, not lists
Plain-English claim: Matplotlib expects homogeneous numeric data; Python lists are accepted but converted internally, incurring both time and memory overhead.

Concrete example: the list `[0, 1, 4, 9]` works, yet `np.array([0, 1, 4, 9])` is the object actually stored in the figure’s data structures.

Formal statement:
$$
\text{data} \in \mathbb{R}^{n} \quad \text{or} \quad \mathbb{R}^{m \times n}
$$

> [!WARNING]
> Passing an object array or a list of strings silently produces an empty or malformed plot; always verify `dtype` before the call.

### Step 2 — Line plot encodes ordered dependence
A line plot draws straight-line segments between consecutive points, making first-order trends visible.

Example: `plt.plot(x, y)` with strictly increasing `x` yields a polygonal chain.

Formal:
$$
\{(x_i, y_i)\}_{i=1}^n \mapsto \text{segments connecting } (x_i,y_i) \text{ to } (x_{i+1},y_{i+1})
$$

> [!WARNING]
> If `x` is not monotonic the line will fold back on itself, producing visual artifacts that look like multiple-valued functions.

### Step 3 — Scatter plot removes the ordering assumption
Scatter replaces the connecting segments with isolated markers, exposing density and outliers without implying sequence.

Formal:
$$
\{(x_i, y_i)\} \mapsto \text{marker at each coordinate, no edges drawn}
$$

### Step 4 — Bar and histogram map magnitude to length or area
Bar plots compare heights of rectangular glyphs; histograms first aggregate a continuous variable into bins and then apply the same glyph.

Formal (histogram):
$$
\text{bin edges } b_0 < b_1 < \dots < b_k, \quad h_j = |\{x_i : b_{j-1} \le x_i < b_j\}|
$$

### Step 5 — Contour extracts level sets
Contour computes and draws the implicit curves \(f(x,y)=c\) for chosen constants \(c\).

Formal:
$$
C_c = \{(x,y) : f(x,y)=c\}
$$

### Step 6 — Imshow treats the matrix as an image
Imshow maps each matrix entry to a colored rectangle whose color is determined by a colormap and a normalization.

Formal:
$$
M_{ij} \mapsto \text{color } \mathcal{C}(M_{ij})
$$

The final textbook statement is therefore: the six functions together realize a family of visual encodings that are bijective with respect to the geometric structure of the input array.

## 5. Worked examples — every step shown

**Example 1 — Simple line plot of \(\sin x\)**
*Given:* `x = np.linspace(0, 2*np.pi, 200)`, `y = np.sin(x)`.
*Find:* the Matplotlib call that produces a smooth curve.

- Create the arrays (already given).  
  *Why:* guarantees 200 evenly spaced samples.  
- Execute `plt.plot(x, y)`.  
  *Why:* connects consecutive points with segments.  
- Execute `plt.show()`.  
  *Why:* flushes the figure to the backend.

**Final answer**  
```python
plt.plot(x, np.sin(x))
plt.show()
```

*Reflection:* The only non-obvious choice is the number of points; too few yields visible corners.

**Example 2 — Scatter of correlated Gaussian samples**
*Given:* 500 draws from a bivariate normal with correlation 0.8.
*Find:* the call that reveals the elliptical cloud.

- Stack the samples into shape `(500, 2)`.  
  *Why:* matches the `(N, 2)` expectation of `scatter`.  
- Call `plt.scatter(X[:,0], X[:,1], s=5)`.  
  *Why:* small markers prevent overplotting.  

**Final answer**  
```python
plt.scatter(X[:,0], X[:,1], s=5, alpha=0.5)
```

*Reflection:* Alpha blending is required once point count exceeds a few thousand.

**Example 3 — Histogram of standard normal draws**
*Given:* `z = np.random.randn(10000)`.
*Find:* frequency distribution.

- Call `plt.hist(z, bins=50)`.  
  *Why:* 50 bins balance resolution and noise.  

**Final answer**  
```python
plt.hist(z, bins=50, density=True)
```

*Reflection:* `density=True` converts counts to a probability density, enabling overlay with a theoretical PDF.

**Example 4 — Contour and imshow of the same function**
*Given:* `X, Y = np.meshgrid(np.linspace(-2,2,200), np.linspace(-2,2,200))`, `Z = np.exp(-X**2-Y**2)`.
*Find:* both level curves and pixel image.

- `plt.contour(X, Y, Z, levels=10)` draws isolines.  
- `plt.imshow(Z, extent=[-2,2,-2,2])` renders the field.  

**Final answer**  
```python
plt.contour(X, Y, Z, levels=8)
plt.imshow(Z, extent=[-2,2,-2,2], origin='lower')
```

*Reflection:* `origin='lower'` aligns array indexing with Cartesian axes.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting `plt.show()`     | Interactive backends sometimes auto-display | Always end scripts with explicit `show()`    |
| Transposed axes in imshow   | NumPy row-major order versus image convention | Use `origin='lower'` and check extent        |
| Line plot of unsorted data  | Implicit ordering assumed by `plot`         | Sort the x-array before calling `plot`       |
| Histogram bin count too low | Default 10 bins hide multimodality          | Set `bins='auto'` or compute via Freedman–Diaconis |
| Scatter with default size   | Large markers produce solid black regions   | Pass `s=1`–`s=10` for dense clouds           |
| Colorbar missing after imshow | Color mapping is stateless unless recorded | Capture the return value: `im = plt.imshow(...)`; `plt.colorbar(im)` |
| Contour on non-gridded data | Algorithm expects Cartesian mesh            | Always generate input with `meshgrid`        |

## 7. The textbook-precise statement
Hunter, J. D. “Matplotlib: A 2D Graphics Environment.” Computing in Science & Engineering 9.3 (2007): 90–95.

A 2D plotting primitive \(P\) is a map
\[
P : \mathbb{R}^{n}\times\mathbb{R}^{n}\;\text{or}\;\mathbb{R}^{m\times n}\;\to\;\text{Artist}
\]
that produces a collection of graphical marks whose geometric attributes are continuous functions of the supplied coordinates, subject to the precondition that the input arrays are finite, numeric, and of compatible shape.

## 8. Visual — diagram or schematic
```text
          y
          ^
          |   contour lines
          |  /  /  /  
          | /  /  /   
          |/  /  /    
          +-----------→ x
          imshow grid (colored cells)
```
Horizontal axis labeled “x”, vertical “y”. Contour curves are closed or open isolines of constant scalar value. The underlying rectangle is tiled by small squares whose fill color is determined by the matrix value at that cell; the lower-left corner of the rectangle is the origin when `origin='lower'`.

## 9. The memory technique

1. **The hook** — Picture six colored pencils lined up on a desk: a continuous pen (line), loose confetti (scatter), stacked blocks (bar), a measuring cup pouring into bins (histogram), a topographic map (contour), and a printed photograph (imshow).  
2. **What to overlearn** — The six function names and their minimal signatures: `plot(x,y)`, `scatter(x,y)`, `bar(x,height)`, `hist(x)`, `contour(X,Y,Z)`, `imshow(Z)`.  
3. **Spaced-repetition schedule** — Review the signatures at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the required array shape by asking “How many independent coordinates does this glyph need?” (one for bar/histogram height, two for everything else).

## 10. What this unlocks
Mastery of these six primitives is the prerequisite for interactive visualization (ipywidgets), statistical graphics (seaborn, plotly), 3-D surface rendering (`plot_surface`), animation (`FuncAnimation`), and publication pipelines that export vector figures to LaTeX.

- Seaborn’s `relplot` and `displot` are thin wrappers around scatter and histogram.  
- Contour and imshow together enable gradient-field visualization required for optimization and PDE courses.  
- The same data-preparation patterns reappear in PyVista and Mayavi for volumetric data.

## 11. Self-check — five questions, no answers
1. Given an array of shape `(1000,)` containing timestamps and another of shape `(1000,)` containing voltages, which single function produces a plot that respects temporal order?  
2. A scatter plot of 50 000 points appears completely black. Name the two minimal parameter changes that restore visibility of structure.  
3. Why does `plt.imshow(M)` display the first row of `M` at the top of the figure by default, and how is the Cartesian convention restored?  
4. You call `plt.contour(x, y, z)` where `x` and `y` are 1-D vectors of length 50 and `z` is `(50,50)`. The call raises an error. What is the precise shape mismatch?  
5. A histogram of a bimodal distribution shows only one peak when plotted with the default number of bins. Which rule or keyword argument selects a bin count that separates the modes?