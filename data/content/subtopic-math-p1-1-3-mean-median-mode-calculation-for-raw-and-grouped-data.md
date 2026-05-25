## What it is
Mean, median, and mode are measures of central tendency that summarize a dataset using a single representative number. The mean is the arithmetic average, the median is the positional middle, and the mode is the most frequent value. "Raw data" consists of exact, individual data points, whereas "grouped data" has been binned into intervals (classes) with associated frequencies, requiring interpolation to estimate these centers.

## Why it matters
In aerospace and physics, raw sensor readings (like a gyroscope's angular velocity) contain noise. The mean acts as a low-pass filter to find the true signal, while the median is used to reject extreme, non-physical outliers (like a cosmic ray hitting a sensor). In machine learning, the choice of loss function—Mean Squared Error versus Mean Absolute Error—is directly tied to the mathematical properties of the mean and median, respectively.

## When to study it
You must already understand:
- Basic arithmetic and order of operations.
- Summation notation ($\Sigma$).
- The equation of a line ($y = mx + b$) and the concept of linear interpolation.
If you cannot confidently interpolate a value between two points on a graph, review linear equations before tackling grouped medians.

## How to study it (step by step)
1. **Master raw data:** Calculate the mean, median, and mode for a small set of unbinned numbers. Do one with an odd number of items, and one with an even number.
2. **Understand the grouped data assumption:** Recognize that when data is binned (e.g., 5 items in the $10-20$ range), we lose the exact values. We must assume the data is evenly distributed within the bin.
3. **Derive the grouped mean:** Treat the midpoint of each bin as a point mass, and calculate the weighted average.
4. **Visualize the grouped median:** Plot a cumulative frequency graph (ogive). Find where the $y$-axis equals $n/2$, and trace it to the $x$-axis.
5. **Derive the grouped median formula:** Use similar triangles / linear interpolation to find the exact $x$-value within the median class.
6. **Learn the grouped mode formula:** Understand it as finding the peak of a parabola fitted to the highest bin and its two neighbors in a histogram.

## Key ideas, with intuition

**1. The Mean as Center of Mass**
For raw data, $\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$. If data points are weights on a number line, the mean is the fulcrum where the line perfectly balances. 
For grouped data, we assume all mass in a class is concentrated at its midpoint $m_i$. The mean becomes a weighted average using frequencies $f_i$:
$$ \bar{x} \approx \frac{\sum f_i m_i}{\sum f_i} $$

**2. The Median as a Robust Percentile**
The median is the 50th percentile. It is robust, meaning moving an extreme outlier further out changes the mean, but leaves the median untouched. 
For grouped data, we find the "median class" (the bin containing the $n/2$-th value) and linearly interpolate:
$$ \text{Median} = L + \left( \frac{\frac{n}{2} - CF}{f} \right) w $$
Where $L$ is the lower boundary of the median class, $CF$ is the cumulative frequency *before* this class, $f$ is the frequency of this class, and $w$ is the class width.

**3. The Mode as the Mountain Peak**
The mode is the most common value. In grouped data, the "modal class" is the bin with the highest frequency. To estimate the exact mode within that bin, we shift the estimate away from the center toward the neighboring bin with the higher frequency:
$$ \text{Mode} = L + \left( \frac{f_1 - f_0}{2f_1 - f_0 - f_2} \right) w $$
Where $f_1$ is the modal class frequency, $f_0$ is the previous class frequency, and $f_2$ is the next class frequency.

## Worked example
**Problem:** Calculate the mean, median, and mode for the following grouped sensor error data.
Classes (Error in degrees): $0-10$, $10-20$, $20-30$.
Frequencies: $2, 5, 3$.

**Step 1: Setup the table**
Total $n = 2 + 5 + 3 = 10$.
Midpoints ($m_i$): $5, 15, 25$.
Cumulative Frequencies ($CF$): $2, 7, 10$.

**Step 2: Mean**
$$ \bar{x} = \frac{(2 \times 5) + (5 \times 15) + (3 \times 25)}{10} = \frac{10 + 75 + 75}{10} = \frac{160}{10} = 16 $$
*Reflection:* We assumed the 5 readings in the $10-20$ bin averaged out to exactly $15$.

**Step 3: Median**
The middle is $n/2 = 5$. The 5th value falls in the $10-20$ class (since $CF$ goes from 2 up to 7 here).
$L = 10$, $CF_{\text{prev}} = 2$, $f = 5$, $w = 10$.
$$ \text{Median} = 10 + \left( \frac{5 - 2}{5} \right) 10 = 10 + \left(\frac{3}{5}\right)10 = 10 + 6 = 16 $$
*Reflection:* We needed 3 more steps into a bin of 5 items. Assuming uniform distribution, we went $3/5$ of the way across the bin width of 10.

**Step 4: Mode**
Modal class is $10-20$ (highest frequency, $f_1 = 5$).
$L = 10$, $f_0 = 2$ (prev), $f_2 = 3$ (next), $w = 10$.
$$ \text{Mode} = 10 + \left( \frac{5 - 2}{2(5) - 2 - 3} \right) 10 = 10 + \left( \frac{3}{10 - 5} \right) 10 = 10 + \left(\frac{3}{5}\right)10 = 16 $$
*Reflection:* The next bin ($f_2=3$) pulled the peak slightly further to the right than the previous bin ($f_0=2$) did to the left.

## Diagrams

```text
Linear Interpolation of the Grouped Median
(Cumulative Frequency Ogive)

  CF
  10 |                      * (30, 10)
     |                     /
   7 |              *-----/ (20, 7)
     |             /|    /
 n/2=5 |- - - - - + |   /
     |           /  |  /
   2 |    *-----/   | / (10, 2)
     |   /         /|/
     +--+---------+-+--------> Data (x)
        0        10 ^       30
                    |
               Median = 16
```
*Notice how the median is simply the x-value corresponding to $y = 5$ on the line segment connecting $(10, 2)$ and $(20, 7)$.*

## Memory technique — remember this forever
1. **The Hook:** "Mean is Mass (fulcrum), Median is Middle (interpolation), Mode is Mountain (peak)."
2. **Must Overlearn:** 
   - $\text{Median} = L + \left( \frac{\frac{n}{2} - CF}{f} \right) w$
   - $\text{Mode} = L + \left( \frac{f_1 - f_0}{2f_1 - f_0 - f_2} \right) w$
3. **Spaced-repetition schedule:** Review the derivations and do one grouped data problem from scratch at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the median formula, draw the cumulative frequency graph. Plot the bottom of the median class $(L, CF_{\text{prev}})$ and the top of the median class $(L+w, CF_{\text{prev}} + f)$. Find the equation of the line connecting them, and solve for $x$ when $y = n/2$. 

## Common mistakes
- **Forgetting to sort raw data:** You cannot find the median of `[9, 2, 7]` by picking `2`. It must be sorted to `[2, 7, 9]`, making `7` the median.
- **Using the wrong CF:** In the median formula, $CF$ is the cumulative frequency of the class *strictly before* the median class, not the median class itself.
- **Averaging class boundaries:** When finding the grouped mean, students sometimes add the lower and upper bounds and divide by $n$. You must use the *midpoints* of each class and multiply by the frequencies.

## Self-check
1. Find the mean, median, and mode of the raw dataset: $4, 1, 7, 4, 9, 2$.
2. A dataset of rocket engine burn times is grouped into classes: $100-110$s ($f=4$), $110-120$s ($f=10$), $120-130$s ($f=6$). Calculate the grouped median.
3. If a sensor occasionally outputs a value of $9999$ due to a software bug, which measure of central tendency (mean or median) will be completely corrupted, and which will remain accurate? Prove it conceptually.