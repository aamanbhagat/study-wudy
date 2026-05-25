## What it is
Measures of central tendency are mathematical tools used to identify the "typical" or "middle" value of a dataset. Ungrouped measures calculate this center from a raw, exact list of numbers. Grouped measures estimate this center when data has been compressed into intervals (bins) and the exact individual values are lost. 

## Why it matters
In physics and aerospace, the mean is the mathematical equivalent of the center of mass; you use it to balance rockets and filter out Gaussian noise in sensor telemetry. In machine learning, the mean and median are the default methods for imputing missing data in large datasets, while the mode is foundational for clustering algorithms (like Mean-Shift) that identify dense pockets of data.

## When to study it
You must already have a firm grasp of basic arithmetic, order of operations, and how to read frequency tables and histograms. Crucially, you must understand Sigma notation ($\sum$) for summations. If you cannot expand $\sum_{i=1}^n f_i x_i$, return to basic algebra and series before proceeding.

## How to study it (step by step)
1. **Review raw concepts:** Calculate the mean, median, and mode on a small ungrouped dataset (e.g., $\{2, 4, 4, 6, 9\}$) to solidify the raw definitions.
2. **Understand information loss:** Group that same dataset into bins (e.g., $0-5$, $5-10$) and calculate the grouped mean. Compare the result to the ungrouped mean to internalize why grouped formulas are *estimates*.
3. **Master the grouped mean:** Derive the grouped mean formula by treating every hidden data point in a bin as if it sits exactly at the bin's midpoint.
4. **Visualize the median:** Draw a histogram. Geometrically, the median is the vertical line that cuts the total area of the histogram exactly in half. 
5. **Learn linear interpolation:** Study the grouped median formula as a simple linear interpolation—walking a specific percentage into the median bin.
6. **Visualize the mode:** Locate the modal class (tallest bin) on a histogram. Understand that the grouped mode formula simply shifts the peak away from the center of the bin toward the adjacent bin with the heavier frequency.

## Key ideas, with intuition

**1. The Mean (Center of Mass)**
For ungrouped data, you sum the values and divide by the count: $\mu = \frac{1}{N} \sum x_i$. 
For grouped data, we don't know the $x_i$ values. We assume all values in a bin sit at the bin's midpoint, $m_i$. The formula becomes a weighted average:
$$ \bar{x} = \frac{\sum f_i m_i}{\sum f_i} $$
where $f_i$ is the frequency of the bin.

**2. The Grouped Median (Area Bisector)**
The median is the 50th percentile. First, find the "median class" (the bin containing the middle value). Because we don't know where values sit inside this bin, we assume they are evenly spread. We use linear interpolation to walk partway into the bin:
$$ \text{Median} = L + \left( \frac{\frac{N}{2} - F}{f} \right) w $$
*   $L$: Lower boundary of the median class.
*   $N$: Total frequency.
*   $F$: Cumulative frequency *before* the median class.
*   $f$: Frequency of the median class.
*   $w$: Width of the median class.

**3. The Grouped Mode (The Peak)**
The mode is the most frequent value. Find the "modal class" (the bin with the highest frequency). Instead of just taking the midpoint, we shift the mode toward the neighboring bin that has a higher frequency. 
$$ \text{Mode} = L + \left( \frac{d_1}{d_1 + d_2} \right) w $$
*   $L$: Lower boundary of the modal class.
*   $d_1$: Frequency difference between modal class and the *previous* class.
*   $d_2$: Frequency difference between modal class and the *next* class.
*   $w$: Width of the modal class.

## Worked example
**Problem:** Calculate the grouped mean, median, and mode for rocket component failure times.
Data: $0-10$ hours ($f=2$), $10-20$ hours ($f=7$), $20-30$ hours ($f=3$). Total $N = 12$.

**Mean:**
1. Find midpoints ($m_i$): $5, 15, 25$.
2. Multiply by frequencies ($f_i m_i$): $(2 \times 5) = 10$, $(7 \times 15) = 105$, $(3 \times 25) = 75$.
3. Sum them: $\sum f_i m_i = 10 + 105 + 75 = 190$.
4. Divide by $N$: $\bar{x} = \frac{190}{12} \approx 15.83$.
*Why it works: We treated the 7 failures in the 10-20 bin as if they all happened exactly at 15 hours.*

**Median:**
1. Target: $\frac{N}{2} = \frac{12}{2} = 6$. We want the 6th value.
2. Cumulative frequencies: $2, 9, 12$. The 6th value falls in the $10-20$ bin.
3. Apply formula: $L = 10$, $F = 2$, $f = 7$, $w = 10$.
$$ \text{Median} = 10 + \left( \frac{6 - 2}{7} \right) 10 = 10 + \left( \frac{40}{7} \right) \approx 15.71 $$
*Why it works: We needed 4 more values to reach 6 (since we had 2 from the previous bin). We walked $\frac{4}{7}$ of the way into a bin of width 10.*

**Mode:**
1. Modal class is $10-20$ (highest frequency, $f=7$).
2. $d_1 = 7 - 2 = 5$.
3. $d_2 = 7 - 3 = 4$.
4. Apply formula: $L = 10, w = 10$.
$$ \text{Mode} = 10 + \left( \frac{5}{5 + 4} \right) 10 = 10 + \left( \frac{50}{9} \right) \approx 15.56 $$
*Why it works: The bin before has frequency 2, the bin after has 3. The peak is pulled slightly to the right of the midpoint, but $d_1 > d_2$ means the left side falls off steeper, pushing the intersection slightly left of center.*

## Diagrams
Here is the geometric intuition for the Grouped Mode formula. By drawing diagonals from the top corners of the modal bin to the top corners of the adjacent bins, their intersection exactly matches the formula.

```text
Freq
  |       Modal Bin (10-20)
7 |       +-------+
  |       | \   / |
  |       |  \ /  | <- Intersection x-coordinate is the Mode (15.56)
  |       |   X   |
3 |       |  / \  +-------+ (20-30)
2 | +-------+   \ |       |
  | | (0-10)|    \|       |
  +-+-------+-----+-------+-- Hours
    0       10   15.56    20       30
```

## Memory technique — remember this forever
1. **The Hooks:** 
   * Mean = **Center of Mass** (midpoints weighted by frequency).
   * Median = **Walking the Bin** (linear interpolation to find the middle area).
   * Mode = **The Crossed Diagonals** (pulled by adjacent bin heights).
2. **Must-know formulas:** Overlearn the grouped Median and Mode formulas. Write them out exactly as presented in the "Key Ideas" section.
3. **Spaced-repetition schedule:** Write the three grouped formulas from memory at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the median formula, draw a cumulative frequency graph (ogive). Draw a horizontal line at $y = \frac{N}{2}$, find where it hits the line segment of the median bin, and use basic slope ($y = mx + b$) to find the $x$-coordinate. The formula is just algebra applied to that geometry.

## Common mistakes
* **Using class limits instead of boundaries:** If bins are given as $0-9$, $10-19$, $20-29$, there is a gap. You must close the gap by using boundaries ($0.5-9.5$, $9.5-19.5$). $L$ must be $9.5$, not $10$.
* **Forgetting the frequency in the mean:** Students often sum the midpoints and divide by the number of bins ($\frac{\sum m_i}{k}$). You must weight them by frequency ($\frac{\sum f_i m_i}{\sum f_i}$).
* **Treating grouped answers as exact:** Grouped data calculations are interpolations. They are approximations of the raw data, not ground truth.

## Self-check
1. A dataset has bins $0-4$ ($f=3$), $4-8$ ($f=5$), $8-12$ ($f=2$). Calculate the grouped mean.
2. In the same dataset, calculate the grouped median. What happens to the fraction $\frac{\frac{N}{2} - F}{f}$ when the median falls exactly on a boundary?
3. Prove algebraically that if a grouped distribution with 3 bins is perfectly symmetrical (e.g., frequencies are $a, b, a$), the grouped mean, median, and mode formulas will all yield the exact midpoint of the middle bin.