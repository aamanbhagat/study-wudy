## What it is
Cumulative frequency is a running total of frequencies, showing how many data points are less than or equal to a specific value. An ogive (pronounced "oh-jive") is the smooth, S-shaped graph of this cumulative data. Finding the median from an ogive means locating the exact middle data point on the y-axis (the cumulative count) and tracing it to the curve and down to the x-axis to find its actual value.

## Why it matters
In aerospace and reliability engineering, an ogive represents the cumulative probability of component failure over time—telling you exactly when 50% of your fleet's engines will require maintenance. In machine learning and higher statistics, the ogive evolves into the Cumulative Distribution Function (CDF). The CDF is foundational for algorithms that sample from complex probability distributions and for statistical tests (like the Kolmogorov-Smirnov test) that compare datasets.

## When to study it
You must already understand:
1. Grouped frequency tables (bins/classes and frequencies).
2. The difference between continuous and discrete data.
3. How to plot coordinates on a Cartesian plane.
4. The concept of the median for ungrouped data (the middle value when sorted).
If you cannot confidently find the median of a simple list of numbers or read a histogram, review those first.

## How to study it (step by step)
1. **Build the table:** Add a "Cumulative Frequency" (CF) column to a grouped frequency table. Calculate it by keeping a running total of the frequencies.
2. **Identify boundaries:** Identify the *upper class boundary* for each group. 
3. **Anchor the curve:** Find the lower boundary of the very first group. The cumulative frequency here is $0$. This is your starting coordinate: $(x_{\text{lower}}, 0)$.
4. **Plot the points:** Plot coordinates as $(\text{Upper Boundary}, \text{Cumulative Frequency})$. 
5. **Draw the ogive:** Connect the points with a smooth, continuously rising curve.
6. **Find the median rank:** Calculate $N/2$, where $N$ is the total frequency (the highest y-value on your graph). 
7. **Trace the median:** Find $N/2$ on the y-axis. Draw a horizontal line to the curve, then a vertical line straight down to the x-axis. That x-value is your median.

## Key ideas, with intuition
**The Running Total (The "Less Than" Rule):** 
Cumulative frequency answers the question, "How many items are *less than or equal to* this value?" If 5 people scored 0-10, and 10 people scored 10-20, then 15 people scored *less than 20*. 

**Why Upper Boundaries?** 
You cannot know you have accumulated all the data points in a bin until you reach the absolute end of that bin. Therefore, the cumulative frequency must be plotted against the *upper* boundary of the class. Plotting against the midpoint is a fatal conceptual error—it implies you've accumulated all the bin's data by the time you're only halfway through the bin.

**The S-Curve (Sigmoid):** 
Most natural data clusters around the mean. The ogive starts flat (few low outliers), rises steeply in the middle (where most of the data lives), and flattens out at the top (few high outliers). The steepest part of the ogive corresponds to the highest bars on a histogram.

**The Median is just a Mapping:**
The y-axis is "rank" (from $0$ to $N$). The x-axis is "value". The median is the value of the middle rank. You are simply using the curve as a function to map $y = N/2$ to its corresponding $x$.

## Worked example
**Problem:** Find the median from the following grouped continuous data.
Classes: $0 \le x < 10$, $10 \le x < 20$, $20 \le x < 30$, $30 \le x < 40$
Frequencies: $2, 5, 10, 3$

**Step 1: Create the Cumulative Frequency (CF) table.**
*   $< 10$: CF = $2$
*   $< 20$: CF = $2 + 5 = 7$
*   $< 30$: CF = $7 + 10 = 17$
*   $< 40$: CF = $17 + 3 = 20$
Total $N = 20$.

**Step 2: Identify coordinates to plot.**
Anchor at lower boundary of first class: $(0, 0)$.
Plot upper boundaries: $(10, 2), (20, 7), (30, 17), (40, 20)$.

**Step 3: Find the median position.**
Median rank = $N/2 = 20/2 = 10$.

**Step 4: Trace on the graph (or interpolate).**
We need the x-value when $y = 10$. 
Looking at our points, $y=10$ happens between $(20, 7)$ and $(30, 17)$.
The y-value grows by $10$ (from $7$ to $17$) in this bin. We only need it to grow by $3$ (from $7$ to $10$).
So, we move $3/10$ of the way into the bin.
The bin width on the x-axis is $10$ (from $20$ to $30$).
$x_{\text{median}} = 20 + \left(\frac{3}{10} \times 10\right) = 23$.

*Reflection:* The geometric tracing on an ogive is just a visual representation of linear interpolation. We assume the 10 data points in the $20 \le x < 30$ bin are evenly spread out, so the 3rd point in that bin sits exactly $30\%$ of the way along the x-axis.

## Diagrams

```text
Cumulative Frequency (y)
 20 |                                      *(40,20)
    |                                   .´ 
 17 |                          *(30,17)
    |                         /
    |                       /
    |                     /
 10 | - - - - - - - - - + (Median trace)
    |                   | /
  7 |             *(20,7)
    |            /      |
    |          /        |
  2 |    *(10,2)        |
    |  /                |
  0 +--*----------------v------------------ Data Value (x)
       0  10    20     23      30      40
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Ogive goes **UP** and **OVER**." 
   * Plot on the **UP**per boundary.
   * To find the median, go **OVER** from the y-axis, then down.
2. **Must Overlearn:**
   * Plot coordinates: $(x_{\text{upper}}, \text{CF})$.
   * Median y-coordinate: $y = \frac{N}{2}$.
3. **Spaced-repetition schedule:** Review this concept, redraw the graph, and re-solve the worked example in 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to plot it, ask yourself: "At what exact point do I *know* I have counted all the people who scored in the 10-20 bin?" You only know once you hit 20. Therefore, the total count must be plotted at $x=20$.

## Common mistakes
1. **Plotting against midpoints:** Students often confuse ogives with frequency polygons. If you plot CF against the class midpoint, your entire curve shifts left, and your median will be completely wrong.
2. **Stating the median is $N/2$:** Students calculate $N/2 = 10$ and write "Median = 10". $10$ is the *rank* (the y-value). The median is the *data value* (the x-value).
3. **Floating graphs:** Forgetting to anchor the graph at $(x_{\text{lower}}, 0)$. An ogive must start at zero on the y-axis.

## Self-check
1. If a dataset has bins $0-5, 5-10, 10-15$ with frequencies $4, 8, 2$, what are the exact four $(x,y)$ coordinates you will plot to draw the ogive?
2. The Lower Quartile ($Q_1$) is the 25th percentile, and the Upper Quartile ($Q_3$) is the 75th percentile. How would you find these values using an ogive of $N=120$?
3. Look at the slope of an ogive. Why is it mathematically impossible for an ogive to ever slope downwards (i.e., have a negative derivative)?