## What it is
Publication-quality figures are graphics designed for formal scientific communication, such as journal articles, conference papers, or dissertations. They are characterized by high resolution (clarity), professional typesetting for labels and equations (often using LaTeX), and carefully chosen colormaps that accurately represent the data without introducing visual artifacts.

## Why it matters
In physics, machine learning, and aerospace, your results are primarily communicated through figures. A low-quality plot can obscure a significant discovery, while a well-crafted one can make a complex result intuitive and compelling. Journals have strict requirements for figure resolution (DPI) and font embedding, and using LaTeX directly in your plots ensures that mathematical notation is crisp, correct, and consistent with your manuscript.

## When to study it
You should be comfortable with the fundamentals of scientific Python programming before tackling this. Specifically, you must have a solid grasp of:
1.  **NumPy**: Creating and manipulating multi-dimensional arrays.
2.  **Matplotlib basics**: Creating simple plots (`plt.plot`, `plt.scatter`), customizing axes (`plt.xlabel`, `plt.xlim`), and managing figures and subplots (`plt.figure`, `plt.subplots`).
3.  **Basic LaTeX syntax**: You don't need to be an expert, but you should know how to write basic mathematical expressions like `$\alpha^2$` or `$\int_a^b f(x)\,dx$`.

If you have not yet installed a LaTeX distribution (like MiKTeX for Windows, MacTeX for macOS, or TeX Live for Linux), you must do that first. Matplotlib calls out to your system's LaTeX compiler to render the text.

## How to study it (step by step)
1.  **Configure Matplotlib for LaTeX**. Create a simple plot. Before showing it, add the following lines to your script to tell Matplotlib to use your system's LaTeX compiler for all text rendering. Observe the change in font and mathematical rendering.
    ```python
    import matplotlib.pyplot as plt
    plt.rcParams.update({
        "text.usetex": True,
        "font.family": "serif",
        "font.serif": ["Computer Modern Roman"],
    })
    ```
2.  **Practice LaTeX Labels**. Create a plot of $y = \sin(x)$. Label the x-axis with `r'$x$ (radians)'` and the y-axis with `r'$\sin(x)$'`. Add a title: `r'Plot of the sine function $f(x) = \sin(x)$'`. The `r''` string prefix denotes a raw string, which prevents Python from misinterpreting backslashes in LaTeX commands.
3.  **Explore Colormaps**. Create a 2D NumPy array of data, for example, $Z(x, y) = \cos(x) \sin(y)$. Use `plt.pcolormesh` to display it. Apply the default colormap, then apply `'viridis'`, `'cividis'`, and `'jet'`. Notice how `'jet'` (the old default) creates sharp, artificial-looking bands of color, while `'viridis'` and `'cividis'` show a smooth, perceptually uniform transition.
4.  **Master DPI**. Save the figure from the previous step using `plt.savefig()`. First, save it with the default DPI: `plt.savefig('low_res.png')`. Then, save it for publication: `plt.savefig('high_res.png', dpi=300)`. Open both files and zoom in. The difference in sharpness will be immediately obvious. 300 DPI is a common minimum for print.
5.  **Combine Everything**. Create a single, complex figure that uses all three elements. For example, plot the electric potential of a dipole. Use LaTeX for the labels ($V(r, \theta)$, $x$, $y$). Use a perceptually uniform diverging colormap like `'bwr'` (blue-white-red) to show positive and negative potential. Save the final result as a PDF (a vector format) and as a 600 DPI PNG (a high-resolution raster format).

## Key ideas, with intuition
1.  **Vector vs. Raster Graphics**: A raster image (PNG, JPG) is a grid of pixels. If you zoom in, it becomes blocky. A vector image (PDF, SVG, EPS) is a set of mathematical instructions for drawing shapes and lines. It can be scaled infinitely without losing quality. For plots with simple lines, vector is superior. For complex heatmaps, a high-DPI raster image is often more practical.
    $$
    \text{Raster Image} \propto \text{Grid of Pixels (Resolution Dependent)} \\
    \text{Vector Image} \propto \text{Set of Drawing Commands (Resolution Independent)}
    $$
2.  **Perceptual Uniformity in Colormaps**: Your brain does not perceive brightness linearly. A bad colormap, like 'jet', has regions where a small change in data value causes a large, abrupt change in perceived brightness (e.g., the transition from cyan to yellow). This creates false "boundaries" in your data. A perceptually uniform colormap like 'viridis' ensures that the perceived change in color is directly proportional to the change in data value, giving a more honest representation.
3.  **DPI (Dots Per Inch)**: This is a measure of raster image resolution. It literally means how many pixels are printed or displayed per inch of space. A low DPI (e.g., 72 or 96) is fine for a screen, but when printed, it will look blurry. Journals require high DPI (typically 300 for color images, 600 for line art) to ensure the printed figure is sharp and professional.
    $$
    \text{Image Width (pixels)} = \text{Image Width (inches)} \times \text{DPI}
    $$

## Worked example
Let's plot the 2D wave function probability density $|\psi(x, y)|^2$ for a simple quantum system, where $\psi(x, y) = \sin(2\pi x) \sin(3\pi y)$. This requires LaTeX for the labels, a good colormap for the density, and high DPI for saving.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Configure Matplotlib for LaTeX rendering
plt.rcParams.update({
    "text.usetex": True,
    "font.family": "serif",
    "font.serif": ["Computer Modern Roman"],
    "font.size": 12
})

# 2. Generate the data
x = np.linspace(0, 1, 400)
y = np.linspace(0, 1, 400)
X, Y = np.meshgrid(x, y)
Psi = np.sin(2 * np.pi * X) * np.sin(3 * np.pi * Y)
ProbDensity = np.abs(Psi)**2

# 3. Create the plot
fig, ax = plt.subplots(figsize=(6, 5))

# Use a perceptually uniform colormap ('magma')
im = ax.pcolormesh(X, Y, ProbDensity, cmap='magma', shading='auto')

# 4. Add LaTeX labels and title
ax.set_xlabel(r'$x/L$')
ax.set_ylabel(r'$y/L$')
ax.set_title(r'Probability Density $|\psi(x,y)|^2 = \sin^2(2\pi x/L) \sin^2(3\pi y/L)$')
ax.set_aspect('equal') # Ensure the plot is square

# Add a colorbar with a LaTeX label
cbar = fig.colorbar(im, ax=ax)
cbar.set_label(r'$|\psi|^2$')

# 5. Save the figure with high DPI and tight layout
plt.savefig('prob_density.png', dpi=300, bbox_inches='tight')
plt.show()
```

### Reflection
-   **Step 1 (rcParams)**: This was crucial for enabling the professional LaTeX font (Computer Modern) and math rendering. Without it, the title and labels would look amateurish.
-   **Step 3 (pcolormesh)**: We chose `'magma'`, a perceptually uniform colormap, which accurately represents the continuous probability density without creating false visual contours.
-   **Step 4 (Labels)**: Using raw strings (`r'...'`) with LaTeX commands made the mathematical notation precise and clear, matching what would be in the paper's text.
-   **Step 5 (savefig)**: Setting `dpi=300` ensures the output PNG is sharp enough for printing. `bbox_inches='tight'` automatically adjusts the figure padding to prevent labels from being cut off, a common frustration.

## Diagrams
Here is an ASCII diagram illustrating why a perceptually uniform colormap is superior to a non-uniform one like 'jet' for representing a simple linear gradient.

```text
Data Gradient (Linear increase from 0 to 1)
[0.0] [0.2] [0.4] [0.6] [0.8] [1.0]
  |     |     |     |     |     |

'viridis' (Perceptually Uniform)
  |     |     |     |     |     |
[dark] [.] [med-green] [.] [yellow]
--> Smooth, even perceived change. What you see IS the data.

'jet' (Non-uniform)
  |     |     |     |     |     |
[blue] [cyan] [YELLOW] [orange] [red]
        |       |
        +-------+
     Sudden, large jump in brightness.
     This creates a false "edge" in the data where none exists.
--> Misleading visual artifacts.
```

## Memory technique — remember this forever
1.  **Mnemonic**: **L.C.D.** — **L**aTeX, **C**olormap, **D**PI. Just like an LCD screen is how you *view* information, L.C.D. is how you *present* scientific information. Your plot is your display.
2.  **Facts to Overlearn**:
    *   Enable LaTeX: `plt.rcParams.update({"text.usetex": True, "font.family": "serif"})`
    *   Save for Publication: `plt.savefig('filename.png', dpi=300, bbox_inches='tight')`
    *   Good Default Colormap: Use `cmap='viridis'` or another perceptually uniform map. Avoid `cmap='jet'`.
3.  **Spaced Repetition Schedule**: Review and re-implement the worked example from scratch at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not copy-paste.
4.  **First Principles Pathway**: If you forget the exact commands, reason from the goal.
    *   "My math labels look wrong." -> How to render *math* in Matplotlib? -> Search "matplotlib latex" -> `text.usetex`.
    *   "My heatmap has weird stripes." -> What controls the color? -> Search "matplotlib colormaps" -> Perceptual uniformity, `cmap`.
    *   "My saved plot is blurry." -> How to save a *high-resolution* plot? -> Search "matplotlib save resolution" -> `dpi`.

## Common mistakes
1.  **`text.usetex: True` Fails**: This almost always means you do not have a LaTeX distribution installed on your system PATH. Matplotlib is not a LaTeX compiler; it is just a frontend that calls it.
2.  **Using 'jet' Colormap**: Many older codebases and tutorials use 'jet' as the default. It is now known to be misleading. Actively replace it with 'viridis', 'cividis', 'magma', or 'plasma'.
3.  **Forgetting `bbox_inches='tight'`**: You create a beautiful plot, but when you save it, the x-label or title is partially cut off. This command automatically adjusts the bounding box to include all elements.
4.  **Submitting Vector Graphics with too much data**: Saving a scatter plot with a million points as a PDF can create a huge, slow-to-render file. In such cases, a high-DPI PNG is often better. This is called "rasterizing" the data part of the figure.

## Self-check
1.  Take a simple plot of $y=x^2$ and change the x-axis label to be "Displacement $\Delta x$ (m)".
2.  Generate a 2D array representing the distance from the center, $R = \sqrt{x^2 + y^2}$. Plot this using `imshow` and the `coolwarm` diverging colormap. Save the result as a vector PDF.
3.  Create a figure with two subplots arranged vertically. The top plot should show the decay of an isotope, $N(t) = N_0 e^{-\lambda t}$, with all axes and titles properly labeled using LaTeX. The bottom plot should be a 2D heatmap of the gravitational potential, $\Phi(x,y) = -GM/\sqrt{x^2+y^2}$. Save the entire figure as a single 600 DPI TIFF file, ensuring no labels are cropped.