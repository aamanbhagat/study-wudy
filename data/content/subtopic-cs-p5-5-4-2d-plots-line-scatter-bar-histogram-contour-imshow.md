## What it is
2D plotting is the process of creating visual representations of data on a two-dimensional plane. In scientific computing with Python, this is typically done using libraries like Matplotlib, which provides a suite of functions to map numerical data (often in NumPy arrays) to graphical elements like points, lines, bars, and colored regions. The goal is to transform raw numbers into an intuitive format for analysis, interpretation, and communication.

## Why it matters
Visualizations are the primary interface between numerical simulation and human insight. In aerospace, you will plot spacecraft trajectories (line plots), analyze sensor noise (histograms), visualize pressure distributions over an airfoil (contour plots), and display satellite imagery (`imshow`). In machine learning, you will constantly plot training loss vs. epoch (line plots) and visualize decision boundaries (contour plots).

## When to study it
Before tackling this, you must have a firm grasp of basic Python programming (functions, loops, lists) and, most importantly, proficiency with the NumPy library. You must be comfortable creating NumPy arrays, performing element-wise operations, using slicing, and understanding array shapes (1D, 2D). Without NumPy fluency, you will struggle to prepare data in the correct format for these plotting functions.

## How to study it (step by step)
1.  **Setup and First Plot:** Install Matplotlib (`pip install matplotlib`). Import the `pyplot` interface: `import matplotlib.pyplot as plt`. Create two NumPy arrays, `x` and `y`, and generate your first line plot with `plt.plot(x, y)` followed by `plt.show()`.
2.  **Distinguish Line and Scatter:** Use the same `x` and `y` data. Create a scatter plot with `plt.scatter(x, y)`. Notice the difference: `plot` connects points sequentially, implying a relationship or trend, while `scatter` treats each point as an independent observation.
3.  **Visualize a Distribution:** Generate a 1D NumPy array of 1000 random numbers from a normal distribution (`np.random.randn`). Use `plt.hist()` to create a histogram. Experiment with the `bins` argument (e.g., `bins=10`, `bins=50`) and observe how it changes the plot's appearance and the story it tells.
4.  **Handle Categorical Data:** Create a simple bar chart. Define category labels (e.g., `['Rocket A', 'Rocket B']`) and corresponding values (e.g., `[98.5, 99.2]` for launch success rate). Use `plt.bar()` to visualize this comparison.
5.  **Visualize a 2D Field:** Create a 2D grid of coordinates using `np.meshgrid`. Define a function $z = f(x, y)$, like $z = \sin(\sqrt{x^2 + y^2})$. Compute the `z` values for your grid.
6.  **Compare `imshow` and `contour`:** Use your 2D grid data from the previous step. First, visualize it with `plt.imshow()`, which maps each `z` value to a colored pixel, creating a raster image. Then, visualize the same data with `plt.contour()`, which draws lines of constant `z` value (isoclines), like a topographical map. Add a color bar with `plt.colorbar()` to make sense of the values.

## Key ideas, with intuition
1.  **The Figure and Axes Abstraction:** Think of a `Figure` as the entire canvas or window you are drawing on. An `Axes` is a single plot within that figure (the part with the x-axis, y-axis, etc.). You can have multiple `Axes` on one `Figure`. The command `fig, ax = plt.subplots()` is the standard way to create both objects, giving you explicit control over your plot (`ax.plot(...)`) instead of relying on the global state (`plt.plot(...)`).
2.  **Data Dimensionality Determines Plot Type:** This is the most critical decision framework.
    *   **One 1D array:** What is the *distribution* of these values? -> **Histogram**.
    *   **Two 1D arrays (X, Y):** How does Y *vary with* X? -> **Line Plot** (if ordered) or **Scatter Plot** (if independent samples).
    *   **Categorical labels and a 1D array of values:** How do these discrete categories *compare*? -> **Bar Chart**.
    *   **One 2D array (Z) on a grid (X, Y):** What is the value of this field at each point? -> **`imshow`** (for a pixel-based view) or **`contour`** (for a topographical view).
3.  **Mapping Data to Aesthetics:** Every plot is a mapping from data to visual properties. `plt.plot(x, y)` maps pairs of values to x-y coordinates and connects them. `plt.scatter(x, y, c=z, s=a)` is more powerful: it maps `(x,y)` to position, a third variable `z` to color, and a fourth variable `a` to size. Understanding this mapping is key to creating rich, informative visualizations.

## Worked example
Let's visualize the 2D sinc function, $Z = \frac{\sin(\sqrt{X^2 + Y^2})}{\sqrt{X^2 + Y^2}}$, using a filled contour plot. This function describes diffraction patterns in optics.

```python
import numpy as np
import matplotlib.pyplot as plt

# Step 1: Create the coordinate grid.
# We need a grid of (x, y) points to evaluate our function.
x = np.linspace(-15, 15, 300)
y = np.linspace(-15, 15, 300)
X, Y = np.meshgrid(x, y) # X and Y are now 2D arrays.

# Step 2: Calculate the function value Z at each point on the grid.
# We calculate the distance from the origin for each point.
R = np.sqrt(X**2 + Y**2)
# The function is undefined at R=0, so we handle the division by zero.
# We replace R=0 with a tiny number (1e-9) to avoid the warning.
R[R == 0] = 1e-9 
Z = np.sin(R) / R

# Step 3: Create the plot objects.
# This gives us a figure and a single axes object to draw on.
fig, ax = plt.subplots(figsize=(8, 6))

# Step 4: Create the filled contour plot.
# We specify X, Y, Z, the number of contour levels, and a colormap.
# 'contourf' stands for 'filled contour'.
contour_plot = ax.contourf(X, Y, Z, levels=20, cmap='viridis')

# Step 5: Add a color bar and labels for clarity.
# The color bar provides a legend for the Z values.
fig.colorbar(contour_plot, ax=ax, label='Amplitude')
ax.set_title('2D Sinc Function')
ax.set_xlabel('X coordinate')
ax.set_ylabel('Y coordinate')
ax.set_aspect('equal', adjustable='box') # Ensure x and y axes are scaled equally

# Step 6: Display the plot.
plt.show()
```

**Reflection:**
*   **Step 1** was essential because functions like `contourf` require data on a structured grid, not just random points. `meshgrid` is the canonical tool for this.
*   **Step 2** involved the core scientific computation, applying the mathematical function to our grid. Handling the singularity at $R=0$ is a common practical issue in physics simulations.
*   **Step 3 & 4** are the core of the visualization, mapping our 2D `Z` array to colored regions on the `ax` object. Using `contourf` instead of `contour` fills the space between the contour lines, which is often easier to interpret.
*   **Step 5** is about making the plot interpretable. Without labels and a color bar, the plot is just a pretty picture; with them, it's a piece of scientific communication.

## Diagrams
A diagram illustrating the Matplotlib Figure/Axes hierarchy.

```text
+--------------------------------------------------+
| Figure (The whole window, fig)                   |
|                                                  |
|  +--------------------------------------------+  |
|  | Axes (The plot itself, ax)                 |  |
|  |                                            |  |
|  | Y-axis Label                               |  |
|  |   ^                                        |  |
|  |   |                                        |  |
|  |   +-----> Plotted Data (lines, points)     |  |
|  |                                            |  |
|  |   Title                                    |  |
|  |                                            |  |
|  +--------------------------------------------+  |
|  ----------------> X-axis Label                |
|                                                  |
+--------------------------------------------------+
```

A diagram illustrating how a histogram works.

```text
Data: [1.1, 1.8, 2.3, 2.5, 2.9, 3.2, 3.8, 4.5]

Bins (Edges): [1.0, 2.0, 3.0, 4.0, 5.0]

Bin 1: [1.0, 2.0) -> contains 1.1, 1.8  (Count: 2)
Bin 2: [2.0, 3.0) -> contains 2.3, 2.5, 2.9  (Count: 3)
Bin 3: [3.0, 4.0) -> contains 3.2, 3.8  (Count: 2)
Bin 4: [4.0, 5.0) -> contains 4.5  (Count: 1)

Resulting Plot:
  |
3 +    #
  |  # #
2 +--#-#----+
  |  # # #  |
1 +--#-#-#--#-+
  |  | | |  |
0 +--+---+--+--+--> Values
   1   2   3  4
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**L**azy **S**cientists **B**arely **H**andle **C**omplex **I**mages."
    *   **L**ine: `plt.plot()`
    *   **S**catter: `plt.scatter()`
    *   **B**ar: `plt.bar()`
    *   **H**istogram: `plt.hist()`
    *   **C**ontour: `plt.contour()`
    *   **I**mage Show: `plt.imshow()`
2.  **Overlearn these facts:**
    *   The standard setup: `import matplotlib.pyplot as plt; import numpy as np; fig, ax = plt.subplots()`
    *   The data-dimension mapping:
        *   `ax.hist(1D_array)`
        *   `ax.plot(X_1D, Y_1D)` or `ax.scatter(X_1D, Y_1D)`
        *   `ax.contour(X_2D, Y_2D, Z_2D)` or `ax.imshow(Z_2D)`
3.  **Spaced Repetition Schedule:** Re-implement one of each plot type from scratch (without looking at old code) on this schedule:
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 7 days
    *   In 16 days
    *   In 35 days
4.  **First Principles Pathway:** If you forget a function's name or arguments, remember the core principle: **You are mapping data arrays to visual properties on an Axes.** Ask yourself: What is the dimensionality of my data? (1D, 2x1D, 2D grid?). What do I want to show? (A trend, a distribution, a field?). Your answer will point you to the right plot type. You can then search "matplotlib plot for [my goal]" (e.g., "matplotlib plot for 2D field data") to find the function name.

## Common mistakes
1.  **Mixing up `plot` and `scatter`:** Using `plt.plot(x, y, 'o')` to create a scatter plot. While this works, it's stylistically poor and inflexible. `plt.scatter()` is superior as it allows you to map other variables to color and size for each individual point, which `plot` cannot do.
2.  **Dimension Mismatch for `imshow`/`contour`:** Passing 1D arrays to `imshow` (e.g., `ax.imshow(x, y, z)`). These functions expect a single 2D array `Z` representing the values on the grid. The `X` and `Y` grid coordinates are passed to `contour`, but for `imshow`, they are often inferred or set via the `extent` keyword argument.
3.  **Forgetting `plt.show()`:** Writing a complete plotting script, running it from the command line, and seeing nothing happen. Interactive environments like Jupyter notebooks often display plots automatically, but in a standalone `.py` script, you must explicitly call `plt.show()` to render the figure.
4.  **Histogram Bin Confusion:** Assuming `bins=10` creates 10 bins of equal width over the data range. It does, but it's often better to provide an array of bin *edges* (e.g., `bins=np.linspace(0, 100, 11)`) for explicit control, especially with non-uniform data.

## Self-check
1.  Generate data for the function $y = \cos(x) \cdot e^{-0.1x}$ for $x$ from 0 to $10\pi$. Create a single figure containing two subplots: one showing a line plot of the function, and another showing a histogram of the $y$ values.
2.  Simulate a random walk in 2D. Start at $(0,0)$. For 1000 steps, move by a random amount in x and y (e.g., from a standard normal distribution). Create a scatter plot of the 1000 resulting points, and color each point based on its step number (i.e., time).
3.  The gravitational potential in a 2D plane due to two masses $m_1$ and $m_2$ at positions $(x_1, y_1)$ and $(x_2, y_2)$ is given by $\Phi(x, y) = -G \left( \frac{m_1}{r_1} + \frac{m_2}{r_2} \right)$, where $r_i = \sqrt{(x-x_i)^2 + (y-y_i)^2}$. Place two masses of different sizes on a 2D grid and create a filled contour plot of their combined potential field. Add a color bar and label the axes.