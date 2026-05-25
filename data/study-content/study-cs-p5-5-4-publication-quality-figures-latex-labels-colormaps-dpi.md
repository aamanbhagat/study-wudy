## 1. What it is — in plain English

Imagine you've just spent months, maybe years, on a super important science project. You've collected tons of data, run complex simulations, and now you have amazing results. How do you share these results with the world? You can't just dump raw numbers on people; you need to show them pictures – graphs and charts – that tell your story clearly and convincingly.

"Publication-quality figures" means making those pictures so good, so clear, and so professional that they could appear in a top-tier scientific journal, a fancy textbook, or a high-stakes engineering report. It's about making sure your visual explanation of your science is as excellent as the science itself.

This involves three main ingredients. First, using "LaTeX labels" is like having a professional typesetter for all the text in your graphs, especially mathematical symbols, so they look crisp and correct, not like plain computer text. Second, "colormaps" are smart ways to use colors to represent data, like temperature or pressure, ensuring that the colors accurately show differences without confusing anyone. Finally, "DPI" (Dots Per Inch) is about making sure your image is sharp and detailed enough, especially when printed or zoomed in, so it doesn't look blurry or pixelated. Together, these elements transform a basic plot into a piece of art that communicates complex information flawlessly.

## 2. Why it matters — real-world applications

The ability to create publication-quality figures is not just an aesthetic choice; it's a fundamental skill for effective scientific and technical communication, with direct impact across many fields:

1.  **Aerospace Engineering & Physics Research:** When NASA or SpaceX engineers design a new rocket engine, they run complex simulations of fluid dynamics, heat transfer, and structural stress. The results are often visualized as intricate plots showing pressure contours or temperature gradients. Using perceptually uniform colormaps ensures that critical high-stress areas are accurately represented without visual artifacts, and high DPI ensures that these plots can be printed on large engineering schematics or presented in detailed design reviews without loss of clarity. LaTeX labels are crucial for correctly rendering complex physical equations and units on the plots, making them understandable to a global team of scientists.

2.  **Medical Imaging & Diagnostics:** In medical research, scientists use techniques like fMRI (functional Magnetic Resonance Imaging) to visualize brain activity or microscopy to study cellular structures. Presenting these images in scientific papers requires extreme precision. High-quality figures ensure that subtle differences in brain activation patterns or cellular morphology are clearly visible. Colormaps are carefully chosen to highlight specific biological markers, and LaTeX is used for precise anatomical labels or statistical significance indicators, helping doctors and researchers make accurate diagnoses or draw valid conclusions from their studies.

3.  **Machine Learning & Data Science:** When developing AI models, researchers need to visualize everything from model architecture and training loss curves to feature importance and decision boundaries. A clear, well-labeled plot of a neural network's performance over epochs, or a scatter plot showing the separation of data points in a high-dimensional space, is vital for debugging, optimizing, and explaining the model. Publication-quality figures allow ML engineers to present compelling evidence of their model's superiority in conferences or journals, using LaTeX for mathematical notation in loss functions or performance metrics, and appropriate colormaps for visualizing complex data clusters or probability distributions.

4.  **Climate Science & Environmental Modeling:** Climate scientists use sophisticated models to predict future climate scenarios, track ocean currents, or monitor atmospheric pollution. Visualizing vast datasets of temperature, precipitation, or pollutant concentrations across geographical regions is critical. High-resolution maps with carefully selected diverging colormaps (e.g., blue-white-red for temperature anomalies) allow researchers to visually identify trends and anomalies. LaTeX ensures that complex units (e.g., $W/m^2$ for radiative forcing) and geographical labels are rendered perfectly, enabling clear communication of critical environmental data to policymakers and the public.

## 3. Prerequisites — what you must know first

Before diving into creating publication-quality figures, you should have a solid grasp of these foundational concepts:

*   **Basic Python Programming:** Understanding variables, data types, control flow (if/else, loops), functions, and how to import libraries.
*   **NumPy Basics:** Familiarity with NumPy arrays, how to create them, perform element-wise operations, and basic array manipulation.
*   **Matplotlib Basics:** How to create simple plots (`plt.plot`, `plt.scatter`), add basic labels (`plt.xlabel`, `plt.ylabel`, `plt.title`), display plots (`plt.show`), and save them (`plt.savefig`).
*   **Basic Data Visualization Principles:** An intuitive understanding of why we use plots to represent data, what axes represent, and the goal of making data understandable visually.
*   **Conceptual Understanding of LaTeX:** Knowing that LaTeX is a powerful typesetting system, especially good for mathematical expressions, even if you haven't written a full document in it.

## 4. The core idea — step by step

Creating publication-quality figures involves carefully controlling the text, colors, and resolution of your plots. Let's break down these core ideas.

### Step 1: Elevating Text with LaTeX Labels

-   **Plain-English Statement:** Imagine the difference between a handwritten note and a beautifully typeset page from a textbook. LaTeX brings that level of professional typesetting to the text within your plots – titles, axis labels, legends, and annotations – making mathematical formulas, Greek letters, and special symbols look crisp and correct.

-   **Small Concrete Example:**
    Instead of an axis label saying "Energy (Joule)", which is fine, a LaTeX-enabled label could say "Energy ($E$, J)" or even "$E = mc^2$" with the variables and superscripts rendered perfectly.

-   **The Formal/Mathematical Version:**
    Matplotlib allows you to enable LaTeX rendering for all text elements. This is typically done by setting a runtime parameter:
    ```python
    import matplotlib.pyplot as plt
    plt.rcParams['text.usetex'] = True
    ```
    Once enabled, any string passed to Matplotlib text functions (like `plt.xlabel()`, `plt.title()`, `plt.text()`) that is enclosed in dollar signs `$` will be interpreted as LaTeX math mode. For example:
    `plt.xlabel(r'$\alpha^2 + \beta_i \cdot \omega$ (rad/s)')`
    The `r` before the string denotes a raw string, which is good practice to avoid issues with backslashes (which are common in LaTeX commands).

-   **What Could Go Wrong:**
    The most common issue is that Matplotlib needs a working LaTeX installation on your system (e.g., TeX Live, MiKTeX) to render text. If it's not installed or not configured correctly in your system's PATH, Matplotlib will raise an error. Another common pitfall is forgetting the `r` for raw strings, leading to `\n` being interpreted as a newline instead of a LaTeX command for example.

### Step 2: Choosing and Using Colormaps Effectively

-   **Plain-English Statement:** When you show data using colors – like a heat map or a scatter plot where color indicates a third variable – you need to pick colors that accurately represent the data without tricking the eye. Some color schemes can make small differences look huge, or hide important patterns altogether. A good colormap helps your brain correctly interpret the data's variations.

-   **Small Concrete Example:**
    Imagine plotting temperature across a surface. If you use a "rainbow" colormap (like 'jet'), a smooth change in temperature might appear to have sharp boundaries or "false edges" because of how our eyes perceive different hues. A "perceptually uniform" colormap, like 'viridis' or 'plasma', would show that same smooth change as a smooth gradient, making the actual variations much clearer.

-   **The Formal/Mathematical Version:**
    Colormaps are functions that map a scalar value (e.g., a data point's magnitude) to a specific color (typically an RGB or RGBA tuple). Matplotlib provides several categories of colormaps:
    *   **Sequential:** For data that goes from low to high (e.g., temperature, density). Examples: `viridis`, `plasma`, `cividis`, `magma`, `Blues`.
    *   **Diverging:** For data with a critical central value, where deviations in either direction are significant (e.g., temperature anomalies, correlation coefficients). Examples: `coolwarm`, `bwr`, `seismic`.
    *   **Qualitative:** For discrete categories where no inherent order exists (e.g., different species, regions). Examples: `tab10`, `Paired`.

    The key concept here is **perceptual uniformity**. A perceptually uniform colormap (PUC) ensures that equal changes in data values correspond to approximately equal perceived changes in color, both in luminance (brightness) and hue. Matplotlib's default colormaps (`viridis`, `plasma`, `cividis`, `magma`) are designed to be perceptually uniform and also robust for colorblind viewers.

    You apply a colormap using the `cmap` argument in plotting functions like `plt.imshow()`, `plt.scatter()`, `plt.pcolormesh()`, or `plt.contourf()`:
    ```python
    plt.scatter(x, y, c=z, cmap='viridis') # 'c' specifies the data for coloring
    plt.colorbar(label='Z-value')
    ```

-   **What Could Go Wrong:**
    The most common mistake is using non-perceptually uniform colormaps like 'jet' or 'rainbow'. These maps can introduce artifacts, hide details, or exaggerate differences that aren't truly there, leading to misinterpretation of data. Another issue is choosing a colormap that doesn't suit the data type (e.g., using a sequential map for diverging data). Also, neglecting to add a colorbar makes the color information unquantifiable.

### Step 3: Resolution (DPI) for Clarity

-   **Plain-English Statement:** Have you ever seen a picture on a computer screen that looks fine, but then when you print it, it's blurry or pixelated? That's about resolution. DPI (Dots Per Inch) tells you how many tiny dots (pixels) are packed into every inch of your image. For publication, you want a high DPI so your figures look super sharp, whether they're printed in a journal or viewed on a high-resolution display, without jagged edges or fuzziness.

-   **Small Concrete Example:**
    A figure saved at `dpi=72` (common for web display) might look okay on a screen but will appear blocky if printed. The same figure saved at `dpi=300` or `dpi=600` will look much smoother and clearer when printed, especially when zoomed in.

-   **The Formal/Mathematical Version:**
    DPI stands for "Dots Per Inch" and is a measure of spatial printing or screen resolution. When saving a figure, the `dpi` parameter in `plt.savefig()` determines the number of pixels per inch. For example, if you have a figure with `figsize=(6, 4)` inches and save it with `dpi=100`, the resulting image will have dimensions of $6 \times 100 = 600$ pixels by $4 \times 100 = 400$ pixels. If you save it with `dpi=300`, it will be $1800 \times 1200$ pixels.
    ```python
    plt.savefig('my_figure.png', dpi=300)
    ```
    Common recommendations:
    *   **Web/Screen:** `dpi=72` to `dpi=150`
    *   **Print (journals, reports):** `dpi=300` to `dpi=600` (often 300 is minimum acceptable for high-quality print)

-   **What Could Go Wrong:**
    Saving with too low a DPI for print will result in a blurry or pixelated image. Saving with an excessively high DPI (e.g., `dpi=1200` for a simple line plot) can lead to unnecessarily large file sizes without a perceptible increase in quality for most use cases. It's also important to consider the target medium – a PDF vector graphic often scales better than a raster image (PNG, JPG) for print, but DPI is still relevant for embedded raster elements within a PDF.

### Step 4: Putting it all together (Basic Figure Structure)

-   **Plain-English Statement:** Now, we combine these elements into a complete recipe for a great plot. It's not just about turning on LaTeX, picking colors, and setting resolution; it's also about structuring your plot clearly with appropriate labels, legends, and making sure everything fits together nicely.

-   **Small Concrete Example:**
    A scatter plot showing experimental data points, where the color of each point indicates a measured property. The axes are labeled with units using LaTeX, the plot has a descriptive LaTeX title, a colorbar explains the color scale, and the whole thing is saved as a high-resolution image ready for a report.

-   **The Formal/Mathematical Version:**
    The process typically involves:
    1.  Importing `matplotlib.pyplot` and `numpy`.
    2.  Setting global Matplotlib parameters, especially `plt.rcParams['text.usetex'] = True` for LaTeX.
    3.  Creating data using NumPy.
    4.  Creating a figure and an axes object (`fig, ax = plt.subplots(figsize=(...))`).
    5.  Plotting the data on the axes using appropriate functions (e.g., `ax.plot()`, `ax.scatter()`).
    6.  Adding LaTeX-enabled labels, title, and potentially a legend (`ax.set_xlabel(r'...')`, `ax.set_title(r'...')`, `ax.legend()`).
    7.  If using color for data, adding a colorbar (`fig.colorbar(scatter_plot_object, ax=ax, label=r'...')`).
    8.  Adjusting layout to prevent labels from overlapping (`plt.tight_layout()`).
    9.  Saving the figure with the desired filename and DPI (`plt.savefig('filename.png', dpi=300)`).
    10. Showing the plot (optional, for interactive viewing) (`plt.show()`).

-   **What Could Go Wrong:**
    Forgetting `plt.tight_layout()` can lead to labels or titles being cut off. Not explicitly setting `figsize` can result in figures that are too small or too large, making text unreadable or wasting space. Forgetting to close figures with `plt.close(fig)` in scripts (especially when generating many plots) can lead to memory issues.

## 5. Worked examples — multiple, with every step shown

We'll use `matplotlib.pyplot` for all examples. Assume `import matplotlib.pyplot as plt` and `import numpy as np` are at the top of each script.

### Example 1: Simple Line Plot with LaTeX Labels and High DPI

**Problem:** Create a plot of the sine function, $y = \sin(x)$, for $x$ from $0$ to $2\pi$. The plot should have a title, x-axis label, and y-axis label, all using LaTeX for mathematical symbols. Save the figure as a PNG file with a resolution suitable for print.

**Given:**
*   Function: $y = \sin(x)$
*   Range for $x$: $[0, 2\pi]$
*   Output format: PNG
*   Resolution: Print-quality (e.g., 300 DPI)

**What we want:** A line plot with professional LaTeX labels and high resolution.

**Steps:**

```python
import matplotlib.pyplot as plt
import numpy as np

# Step 1: Enable LaTeX rendering for all text in Matplotlib
plt.rcParams['text.usetex'] = True
# Explanation: This line tells Matplotlib to use a LaTeX backend to render all text strings.
#              This ensures that mathematical expressions and special characters look professionally typeset.

# Step 2: Generate data for the sine function
x = np.linspace(0, 2 * np.pi, 400)
# Explanation: Create 400 evenly spaced points between 0 and 2*pi (inclusive) for the x-axis.
y = np.sin(x)
# Explanation: Calculate the sine of each x-value to get the corresponding y-values.

# Step 3: Create the plot
fig, ax = plt.subplots(figsize=(8, 5))
# Explanation: Create a figure (the entire window) and an axes (the plotting area) object.
#              figsize=(8, 5) sets the figure size to 8 inches wide by 5 inches tall,
#              which is a good starting point for publication.

ax.plot(x, y, color='blue', linewidth=2)
# Explanation: Plot the x and y data as a blue line with a thickness of 2 points.

# Step 4: Add LaTeX-enabled labels and title
ax.set_xlabel(r'$x$ (rad)', fontsize=14)
# Explanation: Set the x-axis label. The 'r' before the string denotes a raw string,
#              which is good practice for LaTeX to avoid issues with backslashes.
#              '$\alpha$' makes 'alpha' a Greek letter. '(rad)' is plain text.
#              fontsize=14 makes the label larger and more readable.
ax.set_ylabel(r'$y = \sin(x)$', fontsize=14)
# Explanation: Set the y-axis label, again using LaTeX for the function definition.
ax.set_title(r'Plot of the Sine Function: $y = \sin(x)$', fontsize=16)
# Explanation: Set the plot title using LaTeX for the function.
#              fontsize=16 makes the title prominent.

# Step 5: Add a grid for better readability
ax.grid(True, linestyle='--', alpha=0.7)
# Explanation: Add a dashed grid to the plot, making it easier to read values.
#              alpha=0.7 makes the grid slightly transparent so it doesn't overpower the data.

# Step 6: Adjust layout and save the figure
plt.tight_layout()
# Explanation: Automatically adjust plot parameters for a tight layout, preventing labels
#              and titles from overlapping or being cut off.
plt.savefig('sine_plot_latex_300dpi.png', dpi=300, bbox_inches='tight')
# Explanation: Save the figure as a PNG file.
#              'sine_plot_latex_300dpi.png' is the filename.
#              dpi=300 sets the resolution to 300 dots per inch, which is standard for print quality.
#              bbox_inches='tight' ensures that all elements, including labels, are included in the saved figure's bounding box.
# plt.show() # Uncomment to display the plot interactively
```

**Final Answer Description:**
A PNG image file named `sine_plot_latex_300dpi.png` will be generated. The plot will show a blue sine wave. The x-axis will be labeled "$x$ (rad)", the y-axis will be labeled "$y = \sin(x)$", and the title will be "Plot of the Sine Function: $y = \sin(x)$". All mathematical symbols will be rendered using LaTeX, appearing crisp and professional. The image will have a resolution of 300 DPI, making it suitable for high-quality printing.

**Reflection:**
This example was relatively straightforward because it focused on enabling LaTeX and setting DPI. The main "trickiness" might be remembering the `r` prefix for raw strings and ensuring a LaTeX distribution is installed. The `plt.rcParams['text.usetex'] = True` setting is crucial and often forgotten.

---

### Example 2: Scatter Plot with Sequential Colormap and Colorbar

**Problem:** Visualize a 2D dataset where each point has an associated scalar value (e.g., temperature). Use a scatter plot, color-coding points based on their scalar value using a perceptually uniform sequential colormap. Include LaTeX labels for axes and a title, and add a colorbar with a LaTeX label. Save the figure at 400 DPI.

**Given:**
*   2D data points $(x, y)$
*   Scalar value $Z$ for each point
*   Output format: PNG
*   Resolution: 400 DPI
*   Colormap: Perceptually uniform sequential

**What we want:** A scatter plot with points colored by $Z$, a colorbar, and professional LaTeX labels, saved at high resolution.

**Steps:**

```python
import matplotlib.pyplot as plt
import numpy as np

# Step 1: Enable LaTeX rendering
plt.rcParams['text.usetex'] = True

# Step 2: Generate synthetic 2D data with a scalar value (Z)
np.random.seed(42) # for reproducibility
num_points = 500
x = np.random.rand(num_points) * 10
# Explanation: Create 500 random x-coordinates between 0 and 10.
y = np.random.rand(num_points) * 10
# Explanation: Create 500 random y-coordinates between 0 and 10.
z = np.sin(x/2) + np.cos(y/3) + np.random.randn(num_points) * 0.5
# Explanation: Calculate a scalar value 'z' for each point based on x and y,
#              adding some random noise to simulate real data. This 'z' will determine the color.

# Step 3: Create the scatter plot with a colormap
fig, ax = plt.subplots(figsize=(9, 7))
# Explanation: Create a figure and axes, setting a slightly larger size for clarity,
#              especially with the colorbar.

scatter = ax.scatter(x, y, c=z, cmap='viridis', s=50, alpha=0.8, edgecolor='none')
# Explanation: Create a scatter plot.
#              'x' and 'y' are the coordinates.
#              'c=z' tells Matplotlib to use the 'z' values for coloring the points.
#              'cmap='viridis'' selects the 'viridis' colormap, which is perceptually uniform and sequential.
#              's=50' sets the size of each marker to 50.
#              'alpha=0.8' makes the points slightly transparent, useful for overlapping points.
#              'edgecolor='none'' removes the black outline from markers.

# Step 4: Add LaTeX-enabled labels, title, and a colorbar
ax.set_xlabel(r'Position in $x$ ($\mu$m)', fontsize=14)
# Explanation: x-axis label with LaTeX for 'mu' (Greek letter for micro) and unit.
ax.set_ylabel(r'Position in $y$ ($\mu$m)', fontsize=14)
# Explanation: y-axis label with LaTeX.
ax.set_title(r'Temperature Distribution on a Surface ($T_{avg}$)', fontsize=16)
# Explanation: Plot title with LaTeX for average temperature.

cbar = fig.colorbar(scatter, ax=ax, orientation='vertical', pad=0.02)
# Explanation: Add a colorbar to the figure, associated with the 'scatter' plot.
#              'ax=ax' ensures the colorbar is placed next to the main axes.
#              'orientation='vertical'' is the default but explicitly stated.
#              'pad=0.02' adds a small padding between the plot and the colorbar.
cbar.set_label(r'Temperature ($T$, K)', fontsize=14)
# Explanation: Set the label for the colorbar, again using LaTeX for temperature symbol and unit.

# Step 5: Adjust layout and save the figure
plt.tight_layout()
plt.savefig('scatter_viridis_400dpi.png', dpi=400, bbox_inches='tight')
# Explanation: Save the figure with 400 DPI, suitable for higher-quality print,
#              and ensure a tight bounding box.
# plt.show()
```

**Final Answer Description:**
A PNG image file named `scatter_viridis_400dpi.png` will be created. It will display 500 scatter points. The color of each point will correspond to its `z` value, ranging smoothly according to the 'viridis' colormap (typically from dark purple for low values to bright yellow for high values). The x-axis will be labeled "Position in $x$ ($\mu$m)", the y-axis "Position in $y$ ($\mu$m)", and the title "Temperature Distribution on a Surface ($T_{avg}$)", all with LaTeX-rendered symbols. A vertical colorbar to the right of the plot will be labeled "Temperature ($T$, K)", indicating the scalar values represented by the colors. The image will have a resolution of 400 DPI.

**Reflection:**
This example introduced the `c` and `cmap` arguments for scatter plots and the `plt.colorbar()` function. The main challenge here is selecting an appropriate colormap (like 'viridis') and remembering to add a colorbar with a descriptive label, as without it, the color information is meaningless.

---

### Example 3: Contour Plot with Diverging Colormap and Custom Ticks

**Problem:** Generate a 2D contour plot of a function $f(x, y) = \sin(x) + \cos(y)$. Use a diverging colormap to highlight regions above and below zero. Customize the colorbar ticks to show specific values. Use LaTeX for all labels and save as a high-resolution PDF.

**Given:**
*   Function: $f(x, y) = \sin(x) + \cos(y)$
*   Range for $x, y$: $[-2\pi, 2\pi]$
*   Colormap: Perceptually uniform diverging
*   Output format: PDF
*   Resolution: High (PDF is vector, but DPI can affect raster elements if any)

**What we want:** A contour plot showing positive and negative values clearly, with custom colorbar ticks and LaTeX labels, saved as a PDF.

**Steps:**

```python
import matplotlib.pyplot as plt
import numpy as np

# Step 1: Enable LaTeX rendering
plt.rcParams['text.usetex'] = True

# Step 2: Generate 2D grid data for the function
x = np.linspace(-2 * np.pi, 2 * np.pi, 200)
y = np.linspace(-2 * np.pi, 2 * np.pi, 200)
# Explanation: Create 200 points for x and y, spanning from -2*pi to 2*pi.
X, Y = np.meshgrid(x, y)
# Explanation: Create 2D meshgrid arrays from x and y, needed for 2D plotting functions.
Z = np.sin(X) + np.cos(Y)
# Explanation: Calculate the function value Z at each (X, Y) point.

# Step 3: Create the contour plot with a diverging colormap
fig, ax = plt.subplots(figsize=(10, 8))
# Explanation: Create a figure and axes, using a larger size for detailed contour plots.

# Define contour levels. Ensure 0 is a distinct level if it's a critical boundary.
levels = np.linspace(Z.min(), Z.max(), 20)
# Explanation: Create 20 evenly spaced contour levels from the minimum to maximum Z value.
#              This helps visualize the gradient smoothly.

contourf = ax.contourf(X, Y, Z, levels=levels, cmap='coolwarm', extend='both')
# Explanation: Create a filled contour plot.
#              'X', 'Y', 'Z' are the meshgrid data.
#              'levels' specifies the contour lines.
#              'cmap='coolwarm'' is a perceptually uniform diverging colormap,
#              great for showing positive/negative deviations from a central value (0 in this case).
#              'extend='both'' adds triangles to the colorbar ends if data extends beyond the colormap range.

contour_lines = ax.contour(X, Y, Z, levels=[0], colors='black', linestyles='solid', linewidths=1.5)
# Explanation: Add a specific contour line at Z=0 to clearly mark the boundary between positive and negative values.
#              'colors='black'' makes this line stand out.

# Step 4: Add LaTeX-enabled labels, title, and a colorbar with custom ticks
ax.set_xlabel(r'Angular Position $\theta_x$ (rad)', fontsize=14)
ax.set_ylabel(r'Angular Position $\theta_y$ (rad)', fontsize=14)
ax.set_title(r'Scalar Field $f(\theta_x, \theta_y) = \sin(\theta_x) + \cos(\theta_y)$', fontsize=16)

cbar = fig.colorbar(contourf, ax=ax, orientation='vertical', pad=0.02)
cbar.set_label(r'Field Value $f(\theta_x, \theta_y)$', fontsize=14)

# Customizing colorbar ticks
cbar_ticks = np.arange(np.floor(Z.min()), np.ceil(Z.max()) + 1, 0.5)
# Explanation: Generate ticks from min Z to max Z, with a step of 0.5.
cbar.set_ticks(cbar_ticks)
# Explanation: Apply the custom ticks to the colorbar.
cbar.ax.tick_params(labelsize=10) # Adjust tick label font size
# Explanation: Make the tick labels on the colorbar slightly smaller.

# Step 5: Adjust layout and save the figure as PDF
plt.tight_layout()
plt.savefig('contour_diverging_latex.pdf', bbox_inches='tight')
# Explanation: Save as a PDF. PDF is a vector format, meaning it scales perfectly
#              without pixelation, making it ideal for print. DPI is less critical
#              for vector graphics unless there are embedded raster images.
# plt.show()
```

**Final Answer Description:**
A PDF file named `contour_diverging_latex.pdf` will be generated. The plot will show a filled contour map of the function $f(x, y) = \sin(x) + \cos(y)$ over the specified range. The colors will transition smoothly using the 'coolwarm' colormap, clearly distinguishing positive (reddish) and negative (bluish) values, with white indicating values near zero. A solid black contour line will explicitly mark where $Z=0$. The x-axis will be labeled "Angular Position $\theta_x$ (rad)", the y-axis "Angular Position $\theta_y$ (rad)", and the title "Scalar Field $f(\theta_x, \theta_y) = \sin(\theta_x) + \cos(\theta_y)$", all with professional LaTeX rendering. A vertical colorbar will be labeled "Field Value $f(\theta_x, \theta_y)$" and will have custom ticks at intervals of 0.5, clearly indicating the magnitude of the field. Being a PDF, the figure will be perfectly scalable without loss of quality.

**Reflection:**
This example was more complex due to the 2D data generation with `meshgrid`, the use of `contourf` (and `contour` for specific lines), and the diverging colormap. The custom colorbar ticks and saving as PDF were also new elements. The main challenge is correctly setting up the `levels` for `contourf` to ensure smooth transitions and accurately representing the data's range, and understanding that PDF output handles resolution differently than raster images.

---

### Example 4: Multi-Panel Figure with Shared LaTeX Labels and Fine-tuned Layout

**Problem:** Create a figure with two subplots side-by-side. The left subplot should show a decaying exponential function $y_1(t) = e^{-0.5t} \cos(2\pi t)$ and the right subplot should show a damped sine function $y_2(t) = e^{-0.1t} \sin(3\pi t)$. Both plots should share a common x-axis label. Use LaTeX for all labels and titles. Adjust figure size and layout for optimal presentation and save as a high-resolution PNG.

**Given:**
*   Functions: $y_1(t) = e^{-0.5t} \cos(2\pi t)$ and $y_2(t) = e^{-0.1t} \sin(3\pi t)$
*   Range for $t$: $[0, 5]$
*   Two subplots side-by-side
*   Shared x-axis label
*   Output format: PNG
*   Resolution: 600 DPI

**What we want:** A two-panel figure with distinct functions, shared x-axis label, LaTeX throughout, and a very high-resolution output.

**Steps:**

```python
import matplotlib.pyplot as plt
import numpy as np

# Step 1: Enable LaTeX rendering
plt.rcParams['text.usetex'] = True
# Explanation: Global setting for LaTeX.

# Step 2: Generate data for both functions
t = np.linspace(0, 5, 500)
# Explanation: Time array from 0 to 5 with 500 points.

y1 = np.exp(-0.5 * t) * np.cos(2 * np.pi * t)
# Explanation: Calculate values for the decaying exponential function.
y2 = np.exp(-0.1 * t) * np.sin(3 * np.pi * t)
# Explanation: Calculate values for the damped sine function.

# Step 3: Create a figure with two subplots
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5), sharex=True)
# Explanation: Create a figure and two axes objects arranged in 1 row, 2 columns.
#              figsize=(12, 5) makes the overall figure wider to accommodate two plots.
#              sharex=True ensures both subplots share the same x-axis, which is good practice
#              when comparing plots over the same independent variable.

# Step 4: Plot data on the first subplot (ax1)
ax1.plot(t, y1, color='red', linewidth=1.5, label=r'$y_1(t)$')
# Explanation: Plot y1 on ax1.
ax1.set_title(r'Decaying Cosine: $y_1(t) = e^{-0.5t} \cos(2\pi t)$', fontsize=14)
# Explanation: Title for the first subplot, using LaTeX.
ax1.set_ylabel(r'Amplitude $A_1$', fontsize=12)
# Explanation: y-axis label for the first subplot.
ax1.grid(True, linestyle=':', alpha=0.6)
ax1.legend(fontsize=10)
# Explanation: Add a legend to ax1.

# Step 5: Plot data on the second subplot (ax2)
ax2.plot(t, y2, color='green', linewidth=1.5, label=r'$y_2(t)$')
# Explanation: Plot y2 on ax2.
ax2.set_title(r'Damped Sine: $y_2(t) = e^{-0.1t} \sin(3\pi t)$', fontsize=14)
# Explanation: Title for the second subplot, using LaTeX.
ax2.set_ylabel(r'Amplitude $A_2$', fontsize=12) # Even though y-axis is distinct, it's good to label
# Explanation: y-axis label for the second subplot.
ax2.grid(True, linestyle=':', alpha=0.6)
ax2.legend(fontsize=10)
# Explanation: Add a legend to ax2.

# Step 6: Add a common x-axis label for the entire figure
fig.supxlabel(r'Time $t$ (s)', fontsize=14)
# Explanation: Use fig.supxlabel to add a super x-label that spans across all subplots.
#              This is ideal when subplots share the same x-axis.

# Step 7: Adjust overall layout and save the figure
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
# Explanation: Adjust layout. 'rect' argument provides padding for the super title/labels.
#              [left, bottom, right, top] in figure coordinates.
#              This ensures the fig.supxlabel is not cut off.
plt.savefig('multi_panel_functions_600dpi.png', dpi=600, bbox_inches='tight')
# Explanation: Save at a very high resolution (600 DPI) for maximum clarity in print.
# plt.show()
```

**Final Answer Description:**
A PNG image file named `multi_panel_functions_600dpi.png` will be created. It will contain two subplots arranged horizontally. The left subplot will show a red line representing $y_1(t) = e^{-0.5t} \cos(2\pi t)$, titled "Decaying Cosine: $y_1(t) = e^{-0.5t} \cos(2\pi t)$" and labeled "Amplitude $A_1$" on the y-axis. The right subplot will show a green line representing $y_2(t) = e^{-0.1t} \sin(3\pi t)$, titled "Damped Sine: $y_2(t) = e^{-0.1t} \sin(3\pi t)$" and labeled "Amplitude $A_2$" on the y-axis. Both subplots will share a common x-axis labeled "Time $t$ (s)" at the bottom of the entire figure. All text, including titles, labels, and legends, will be rendered using LaTeX. The figure will be saved at 600 DPI, ensuring exceptional clarity and detail for high-quality publication.

**Reflection:**
This example introduced multi-panel figures using `plt.subplots()` with `sharex=True` and the `fig.supxlabel()` for a common label. The `plt.tight_layout(rect=...)` argument is crucial for preventing super-labels from being cut off. The complexity here lies in coordinating multiple plots and their labels within a single figure while maintaining a professional appearance and high resolution.

## 6. Common mistakes and traps

1.  **Using 'jet' or 'rainbow' colormaps:** These are not perceptually uniform, meaning they can visually exaggerate or hide data variations, leading to misinterpretation. They also perform poorly for colorblind individuals.
    *   *Why it happens:* They are visually vibrant and often the default in older software or examples, appearing "pretty" without considering their scientific accuracy.
2.  **Forgetting to install a LaTeX distribution:** Matplotlib's `usetex=True` functionality relies on an external LaTeX installation (like TeX Live or MiKTeX). If it's not present or correctly configured in your system's PATH, Matplotlib will throw an error.
    *   *Why it happens:* Students assume Matplotlib has built-in LaTeX rendering or forget this external dependency.
3.  **Not using raw strings (`r''`) for LaTeX expressions:** Backslashes (`\`) are escape characters in Python strings and also heavily used in LaTeX commands (e.g., `\alpha`). If not using a raw string, you'd need to double-escape every backslash (e.g., `\\alpha`), which is cumbersome and error-prone.
    *   *Why it happens:* Forgetting the `r` prefix, leading to `\n` being interpreted as newline instead of a LaTeX command or other unexpected parsing issues.
4.  **Setting DPI too low for print:** A DPI of 72 or 96 might look fine on a screen but will appear pixelated and blurry when printed in a journal or report.
    *   *Why it happens:* Not understanding the difference between screen resolution and print resolution, or simply sticking with default save settings.
5.  **Neglecting `plt.tight_layout()` or `fig.subplots_adjust()`:** Without proper layout adjustments, titles, axis labels, or legends can overlap with the plot area or with other subplots, making the figure unreadable.
    *   *Why it happens:* Focusing on the plot content itself and forgetting about the surrounding elements' positioning, especially in multi-panel figures.
6.  **Forgetting to add a colorbar when using colormaps:** If you color-code data points or regions, but don't include a colorbar, the reader has no way of knowing what values the colors represent, rendering the color information useless.
    *   *Why it happens:* Overlooking the necessity of a legend for color, similar to how one would add a legend for different line types.

## 7. Textbook-precise explanation

**Publication-Quality Figures** in scientific computing refers to the standard of visual representation required for formal dissemination of research findings, typically in peer-reviewed journals, academic theses, or professional reports. This standard mandates clarity, precision, accuracy, and aesthetic appeal to ensure unambiguous communication of quantitative information. The primary components contributing to this standard, as applied in Python's Matplotlib library, include:

1.  **LaTeX Labels:**
    *   **Definition:** LaTeX ($\text{\LaTeX}$) is a document preparation system renowned for its high-quality typesetting, particularly for mathematical expressions, scientific symbols, and complex document structures. In the context of figure generation, Matplotlib integrates with a local LaTeX installation to render all text elements (titles, axis labels, legends, annotations) using LaTeX's text and math modes. This ensures that mathematical equations, Greek letters (e.g., $\alpha, \beta, \gamma$), superscripts ($x^2$), subscripts ($y_i$), and special symbols (e.g., $\Delta, \Sigma, \int$) are typeset with professional glyphs and correct spacing, matching the quality of surrounding text in a scientific document.
    *   **Mechanism:** Matplotlib's `text.usetex` runtime configuration parameter, when set to `True`, instructs the backend to pass text strings enclosed in dollar signs (`$...$`) to a LaTeX renderer. The output, typically a PostScript or PDF snippet, is then embedded into the figure.
    *   **Reference:** Matplotlib documentation on Text Rendering With LaTeX. (Hunter, J. D. (2007). Matplotlib: A 2D graphics environment. *Computing in Science & Engineering*, *9*(3), 90-95.)

2.  **Colormaps:**
    *   **Definition:** A colormap, or color scale, is a function $C: [0, 1] \to \mathbb{R}^3$ (or $\mathbb{R}^4$ for RGBA) that maps a normalized scalar data value (typically mapped to the interval $[0,1]$ from the data's minimum to maximum) to a unique color in a specified color space. Colormaps are categorized based on their intended use:
        *   **Sequential:** Designed for ordered data that progresses from low to high values (e.g., temperature, density). Perceptually uniform sequential colormaps (e.g., 'viridis', 'plasma', 'cividis', 'magma') are preferred as they ensure that equal changes in data value correspond to equal perceived changes in color, both in luminance and hue.
        *   **Diverging:** Designed for data that has a critical central value (e.g., zero, mean), where deviations in either direction are equally important (e.g., temperature anomalies, correlation coefficients). These maps typically transition from one color through a neutral color (often white or light grey) to another distinct color (e.g., 'coolwarm', 'bwr', 'seismic').
        *   **Qualitative (or Categorical):** Designed for discrete, unordered data categories (e.g., different species, political parties). These maps consist of distinct, easily distinguishable colors that do not imply any order or magnitude (e.g., 'tab10', 'Paired').
    *   **Perceptual Uniformity:** A colormap is perceptually uniform if a linear change in data value results in a linear change in perceived color difference across its entire range. This property is crucial for accurately representing quantitative data and avoiding visual artifacts or misinterpretations.
    *   **Reference:** (Borland, D., & Taylor II, R. M. (2007). Rainbow color map critiques: An overview and annotated bibliography. *IEEE transactions on visualization and computer graphics*, *13*(6), 1359-1368.) (Kovesi, P. (2015). Good colour maps for visualisation. arXiv preprint arXiv:1509.03700.)

3.  **DPI (Dots Per Inch):**
    *   **Definition:** DPI (Dots Per Inch) is a measure of spatial print resolution, quantifying the number of individual dots of ink a printer can place within a linear inch. In digital image context, it refers to the pixel density of a raster image. When saving a figure to a raster format (e.g., PNG, JPEG, TIFF), the `dpi` parameter in Matplotlib's `savefig()` function determines the pixel dimensions of the output image. A higher DPI results in a larger number of pixels per unit of physical length, leading to a sharper, more detailed image, especially when printed or viewed at high magnification.
    *   **Implications:** For screen display, `72-150 DPI` is often sufficient. For high-quality print publications, a minimum of `300 DPI` is typically required, with `600 DPI` or higher often preferred for figures with fine details or text. For vector graphic formats (e.g., PDF, SVG), DPI is less directly applicable to the vector elements themselves, as they scale without pixelation. However, any embedded raster images within a vector graphic will still be subject to their inherent DPI.
    *   **Reference:** (Tufte, E. R. (2001). *The Visual Display of Quantitative Information*. Graphics Press.)

## 8. ASCII diagrams

Here are some conceptual ASCII diagrams to illustrate the components:

```text
+-------------------------------------------------------------+
|                     Figure Title                            |
|                     (using LaTeX: $A \cdot B^2$)            |
|                                                             |
|   +-----------------------------------------------------+   |
|   |                                                     |   |
|   |                                                     |   |
|   | Y-axis Label                                        |   |
|   | (using LaTeX: $\sum_{i=1}^{N} x_i$)                 |   |
|   |                                                     |   |
|   |      . . . . . . . . . . . . . . . . . . .          |   |
|   |      .       (o)   (o)   (o)            .          |   |
|   |      .     (o)     (o)     (o)          .          |   |
|   |      .   (o)  (o)  (o)  (o)  (o)        .          |   |
|   |      . . . . . . . . . . . . . . . . . . .          |   |
|   |                                                     |   |
|   +-----------------------------------------------------+   |
|                                                             |
|                     X-axis Label                            |
|                     (using LaTeX: $f(t) = e^{-\alpha t}$)   |
+-------------------------------------------------------------+
Figure 1: Basic Plot Structure with LaTeX Labels.
          The text elements (title, axis labels) are rendered
          with professional mathematical notation.

```

```text
+-------------------------------------------------------------+
|                       Colormap Concept                      |
|                                                             |
| Data Value:   Low  <-------------------------------->  High |
|                                                             |
| Colormap 1 (Perceptually Uniform - 'viridis'):              |
|   [Dark Purple]----[Blue]----[Green]----[Yellow]----[Bright Yellow]
|   (Smooth, even perceived change across range)              |
|                                                             |
| Colormap 2 (Non-Perceptually Uniform - 'jet' / 'rainbow'):  |
|   [Blue]--[Cyan]--[Green]--[Yellow]--[Orange]--[Red]--[Magenta]
|   (Uneven perceived change, some areas appear more dominant) |
|                                                             |
|                                                             |
|                 +-----------------------+                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 |                       |                   |
|                 +-----------------------+                   |
|                      Colorbar (quantifies colormap)         |
+-------------------------------------------------------------+
Figure 2: Colormap Comparison and Colorbar.
          Illustrates the concept of mapping data values to colors,
          highlighting the difference between perceptually uniform
          and non-uniform colormaps. The colorbar provides quantitative
          interpretation.
```

```text
+-------------------------------------------------------------+
|                         DPI Concept                         |
|                                                             |
| Image Area: 1 inch x 1 inch                                 |
|                                                             |
| Low DPI (e.g., 72 DPI):                                     |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   . . . . . . . .                                           |
|   (Fewer, larger "dots" / pixels per inch)                  |
|   (Looks blocky when printed large)                         |
|                                                             |
| High DPI (e.g., 300 DPI):                                   |
|   ..........................................................|
|   ..........................................................|
|   ..........................................................|
|   ..........................................................|
|   ..........................................................|
|   ..........................................................|
|   ..........................................................|
|   ..........................................................|
|   (Many, smaller "dots" / pixels per inch)                  |
|   (Looks sharp and smooth when printed large)               |
+-------------------------------------------------------------+
Figure 3: DPI (Dots Per Inch) Illustration.
          Shows how more "dots" or pixels packed into the same
          physical inch result in higher resolution and clarity.
```

## 9. Memory technique — never forget this

1.  **Mnemonic:** Think of a high-quality **LCD** screen, which stands for **L**abels (LaTeX), **C**olormaps, and **D**PI. This mnemonic helps you remember the three key pillars of publication-quality figures. Just like an LCD screen gives you a clear, vibrant picture, applying L, C, and D to your plots makes them clear and professional.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **LaTeX:** `plt.rcParams['text.usetex'] = True` (and use `r'$\alpha + \beta$'` for strings).
    *   **Colormaps:** Always choose perceptually uniform colormaps for quantitative data (e.g., `'viridis'`, `'plasma'`, `'cividis'`, `'magma'` for sequential; `'coolwarm'`, `'bwr'`, `'seismic'` for diverging). Avoid `'jet'`.
    *   **DPI:** For print, use `plt.savefig('my_figure.png', dpi=300, bbox_inches='tight')` (or higher, up to 600 DPI). For vector graphics like PDF, `dpi` is less critical but `bbox_inches='tight'` is still good.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the `plt.rcParams` setting, try applying LaTeX to a simple plot title.
    *   **3 Days:** Create a scatter plot with a `viridis` colormap and a colorbar.
    *   **7 Days:** Generate a multi-panel figure with LaTeX labels and save it at 300 DPI.
    *   **16 Days:** Create a contour plot with a diverging colormap, custom colorbar ticks, and save as PDF. Reflect on why `'jet'` is bad.
    *   **35 Days:** Explain to someone else (or write down) the importance of each of the LCD components and demonstrate an example of each.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the specific commands, always go back to the fundamental goal: **Effective Scientific Communication.**
    *   **Why do I need LaTeX?** Because plain text can't correctly render $E=mc^2$ or $\mu_i$. Scientific communication *requires* precise mathematical notation. How do I get precise notation in my plot text? Matplotlib must have a way to use a professional typesetter, which is LaTeX.
    *   **Why do I need specific colormaps?** Because my goal is to show data accurately. If I use colors that trick the eye, I'm miscommunicating. How do I choose colors that accurately represent data and don't mislead? They must change uniformly and be accessible to all viewers (colorblindness). This leads to perceptually uniform colormaps.
    *   **Why do I need high DPI?** Because my figure might be printed or viewed on high-res screens. If it's blurry, it looks unprofessional and might obscure details. How do I make sure my image is sharp and detailed enough for its final medium? By increasing its resolution, which is controlled by DPI.

This pathway allows you to reconstruct the *need* for these features, which then makes finding the specific Matplotlib commands much easier (e.g., by searching "matplotlib latex", "matplotlib colormap best practice", "matplotlib save high resolution").

## 10. Connections — what this leads to

Mastering publication-quality figures is a foundational skill that unlocks and enhances many advanced areas in scientific computing and data visualization:

*   **Advanced Matplotlib and Seaborn Customization:** This lesson provides the gateway to deep customization of every aspect of a plot. You'll move beyond basic plots to creating highly specific visualizations, learning about `rcParams` for global styling, custom tick formatters, annotations, and more complex subplot arrangements.
*   **Interactive Visualization Libraries (Plotly, Bokeh):** While this lesson focuses on static figures, the principles of clear labeling, effective color use, and high-fidelity rendering translate directly to interactive platforms. Understanding static best practices helps you design effective interactive dashboards and web-based visualizations.
*   **Scientific Visualization Libraries (VTK, ParaView):** For 3D data, volumetric rendering, or complex simulations (common in physics, engineering, and climate science), libraries like VTK (Visualization Toolkit) and ParaView are used. The emphasis on accurate color representation and high-resolution output is even more critical in these complex domains.
*   **Data Storytelling and Communication:** Beyond just making pretty plots, these skills are crucial for effective data storytelling. You learn to make your visualizations not just accurate but also compelling and easy for your audience to understand, which is vital for presentations, grant proposals, and public outreach.
*   **Reproducible Research:** High-quality, programmatically generated figures are a cornerstone of reproducible research. By scripting figure generation with precise control over labels, colormaps, and resolution, you ensure that anyone can recreate your exact figures from your data and code, contributing to scientific transparency and integrity.
*   **Visual Analytics:** As you progress, you'll apply these principles in visual analytics, where the goal is to use visualization to gain insights from data. A well-designed figure can reveal patterns, anomalies, and relationships that might be hidden in raw numbers.
*   **Infographics and Technical Illustration:** The principles of clear, concise, and aesthetically pleasing visual communication extend to creating more complex infographics and technical illustrations for textbooks, educational materials, or popular science articles.

## 11. Self-check questions

1.  Explain in your own words why using `plt.rcParams['text.usetex'] = True` is beneficial for scientific figures, providing an example of a mathematical expression that would look significantly better with LaTeX.
2.  You are plotting a heat map of temperature anomalies, where values can be positive (warmer than average) or negative (cooler than average). Which type of colormap (sequential, diverging, or qualitative) would you choose, and why? Give an example of a specific Matplotlib colormap you would use.
3.  A journal requires figures to be submitted at a minimum resolution of 300 DPI for print. If your Matplotlib figure has a `figsize=(7, 5)` (width, height in inches), what would be the pixel dimensions of the saved PNG image if you meet this requirement? Show your calculation.
4.  Describe two common mistakes related to colormaps or LaTeX rendering that can degrade the quality of a scientific figure, and explain how to avoid them.
5.  You need to create a figure with three vertically stacked subplots, each showing a different phase of a chemical reaction over time. All subplots should share a common time axis label at the bottom. How would you structure your `plt.subplots()` call, and what Matplotlib function would you use to add the common x-axis label? Ensure all labels use LaTeX, and the final figure is saved as a PDF for a poster presentation.