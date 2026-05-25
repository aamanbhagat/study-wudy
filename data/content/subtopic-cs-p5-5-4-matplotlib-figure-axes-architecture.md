## What it is
The Matplotlib figure/axes architecture is an object-oriented model for creating visualizations. The `Figure` is the top-level container for all plot elements—think of it as the entire window or page. The `Axes` (not "axis") is the individual plot itself—the region with the data, ticks, labels, and spines.

## Why it matters
This explicit, object-oriented approach is the foundation of all complex, publication-quality scientific plotting. In physics and aerospace, you will constantly compare results from different simulations or experiments side-by-side on the same figure, which requires manipulating individual `Axes` objects. In machine learning, you'll use it to plot loss curves, feature distributions, and confusion matrices in a structured grid.

## When to study it
You should be comfortable with basic Python syntax (functions, variables, loops) and have a working knowledge of NumPy for creating and manipulating numerical arrays. It is also helpful to have used the simpler `matplotlib.pyplot` stateful interface (e.g., `plt.plot()`, `plt.title()`) so you can appreciate the power and control the object-oriented approach provides.

## How to study it (step by step)
1.  **Create and Inspect:** Use `fig, ax = plt.subplots()` to create a `Figure` and a single `Axes`. Print `type(fig)` and `type(ax)`. See that they are distinct Matplotlib objects.
2.  **Plot with the `Axes` Object:** Generate some data with NumPy. Instead of `plt.plot(x, y)`, call the method directly on your axes object: `ax.plot(x, y)`. Notice the syntax: you are telling a specific object what to do.
3.  **Customize with `Axes` Methods:** Use `ax.set_title()`, `ax.set_xlabel()`, `ax.set_ylabel()`, and `ax.grid(True)`. Contrast this with the `plt.xlabel()` family of functions. This reinforces the idea of manipulating a specific object's state.
4.  **Create a Grid of Subplots:** Generate a 2x2 grid of plots using `fig, axs = plt.subplots(2, 2)`. Print `axs.shape` and `type(axs[0, 0])`. Observe that `axs` is a NumPy array of `Axes` objects.
5.  **Iterate and Plot:** Write a nested loop to iterate through the `axs` array. In each iteration, select one `Axes` object (e.g., `ax = axs[i, j]`) and plot a unique function on it.
6.  **Control the Figure:** After plotting on all axes, call `fig.suptitle("Main Title for the Whole Figure")` to add a centered title for the entire figure. Use `fig.tight_layout()` to automatically adjust subplot params so that subplots are nicely fit in the figure.

## Key ideas, with intuition
1.  **The Artist Analogy:** Think of the `Figure` as a blank canvas. An `Axes` is a specific rectangular region on that canvas where you will paint a chart. Everything you see on the plot—the lines, the text, the ticks—is a child object called an "Artist". You control the final image by manipulating these artists.

2.  **Explicit is Better than Implicit:** The simple `plt.plot()` interface is "stateful"; Matplotlib implicitly keeps track of the "current" figure and axes you're working on. This is convenient for simple plots but fragile for complex ones. The `fig, ax` approach is "stateless" or object-oriented; you explicitly state which `Axes` object you are commanding (`ax.plot()` vs `axs[0,1].plot()`). This is robust, readable, and unambiguous.

3.  **Hierarchy of Control:** The objects are nested. A `Figure` object contains one or more `Axes` objects. An `Axes` object contains `XAxis` and `YAxis` objects, which in turn contain the tick marks and labels. This hierarchy means you can control elements at any level of detail.
    *   To set the title for the whole page: `fig.suptitle(...)`
    *   To set the title for a single subplot: `ax.set_title(...)`

4.  **`subplots()` is a Factory:** The function `plt.subplots()` is the most common and convenient way to start. It is a factory that produces and returns both the canvas (`Figure`) and a single `Axes` or a NumPy array of `Axes` objects, ready for you to work with.
    $$
    \text{fig, axs} = \text{plt.subplots}(\text{nrows}, \text{ncols})
    $$
    This one line sets up the entire structure for you.

## Worked example
Let's create a figure with two subplots stacked vertically. The top will show a sine wave, and the bottom will show its derivative, a cosine wave.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Prepare data
x = np.linspace(0, 2 * np.pi, 400)
y_sin = np.sin(x)
y_cos = np.cos(x)

# 2. Create the Figure and Axes objects
# We want 2 rows, 1 column. This returns the figure and a NumPy array of the 2 axes.
fig, axs = plt.subplots(2, 1, sharex=True)

# 3. Plot on the first Axes (axs[0])
axs[0].plot(x, y_sin, color='blue')
axs[0].set_title('Function: $f(x) = \sin(x)$')
axs[0].set_ylabel('Amplitude')
axs[0].grid(True)

# 4. Plot on the second Axes (axs[1])
axs[1].plot(x, y_cos, color='red')
axs[1].set_title('Derivative: $f\'(x) = \cos(x)$')
axs[1].set_xlabel('x (radians)')
axs[1].set_ylabel('Amplitude')
axs[1].grid(True)

# 5. Add a title to the entire Figure and adjust layout
fig.suptitle('A Function and Its Derivative', fontsize=16)
fig.tight_layout(rect=[0, 0.03, 1, 0.95]) # Adjust layout to make room for suptitle

# 6. Display the plot
plt.show()
```

**Reflection:**
-   Step 2: `plt.subplots(2, 1)` was the crucial entry point. It created the canvas and the two plotting areas, returning handles to them (`fig`, `axs`).
-   Steps 3 & 4: We used `axs[0]` and `axs[1]` to explicitly target which subplot we were modifying. This avoids any ambiguity. All plotting and customization calls were methods of the specific `Axes` object.
-   Step 5: We used the `fig` object to control figure-level properties like the main title and the overall layout, demonstrating the object hierarchy.

## Diagrams

This diagram shows the conceptual hierarchy of a Matplotlib plot with two subplots.

```text
+-------------------------------------------------+
| Figure (fig)                                    |
| +---------------------------------------------+ |
| | Axes (ax1)                 ^                | |
| |                            | YAxis          | |
| |   +----------------------+                | |
| |   |                      |                | |
| |   |       (plot data)    |                | |
| |   +----------------------+                | |
| |   ---------------------->                 | |
| |            XAxis                          | |
| +---------------------------------------------+ |
| +---------------------------------------------+ |
| | Axes (ax2)                                  | |
| |                                             | |
| |   (similar components to ax1)               | |
| |                                             | |
| +---------------------------------------------+ |
+-------------------------------------------------+
```

## Memory technique — remember this forever
1.  **The Story: "The Art Gallery"**
    Think of creating a plot as curating an art gallery.
    -   `fig = plt.figure()`: You rent the **building** (the `Figure`).
    -   `ax = fig.add_subplot(1, 1, 1)`: You designate a **room** for a painting (the `Axes`).
    -   `fig, ax = plt.subplots()`: This is the express setup. You get a gallery with one room and one painting canvas, ready to go.
    -   `ax.plot()`: You take your brush and paint directly onto the **canvas in that specific room**. You don't just shout "Paint a line!" into the gallery entrance (`plt.plot()`).

2.  **Must Overlearn Formulas/Code:**
    -   `import matplotlib.pyplot as plt`
    -   `fig, ax = plt.subplots()` (For one plot)
    -   `fig, axs = plt.subplots(nrows, ncols)` (For a grid of plots)

3.  **Spaced Repetition Schedule:**
    Review this concept and rewrite the worked example from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget everything, remember this: the goal is to get a Python variable that directly points to the plot you want to change. The function that "makes plots" and *returns* those pointers is `plt.subplots()`. Start there, get the `fig` and `ax` objects, and then use standard Python object methods (`ax.set_...`, `ax.plot`, etc.) to manipulate them.

## Common mistakes
1.  **Mixing Interfaces:** Calling `plt.title('A Title')` after creating `fig, ax = plt.subplots()`. This might accidentally work on the "currently active" axes, but it's bad practice. Always use the object's method: `ax.set_title('A Title')`.
2.  **Incorrectly Indexing `axs`:** When `plt.subplots(2, 2)` is called, `axs` is a 2D NumPy array. Accessing the top-right plot is `axs[0, 1]`. Forgetting this and trying `axs[1]` will either fail or give you the whole first row.
3.  **Getter/Setter Confusion:** Trying to set a title with `ax.title = 'My Title'`. The correct method is `ax.set_title('My Title')`. Most properties are modified with `set_*` methods.
4.  **Forgetting `plt.show()`:** In scripts, your code will generate the plot object in memory, but it won't appear on screen until you explicitly call `plt.show()`.

## Self-check
1.  Using the object-oriented approach, create a single figure and axes. Plot the function $y = x^3$ for $x \in [-2, 2]$. Set the title of the plot to "Cubic Function" and label the x-axis as "x-value".
2.  Create a figure with four subplots in a 2x2 grid. In the bottom-right subplot (and only that one), plot a scatter plot of 50 random points where both x and y are drawn from a standard normal distribution.
3.  Create a single figure. Manually add two `Axes` to it using `fig.add_axes()`. The first `Axes` should occupy the rectangle `[0.1, 0.1, 0.8, 0.8]` (left, bottom, width, height in figure coordinates). The second `Axes` should be a smaller inset plot occupying `[0.6, 0.2, 0.25, 0.25]`. Plot a parabola on the main axes and a straight line on the inset axes.