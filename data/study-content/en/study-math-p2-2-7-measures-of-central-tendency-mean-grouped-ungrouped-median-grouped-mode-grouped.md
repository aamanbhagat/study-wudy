## 1. The one-sentence answer
**Measures of central tendency locate the single value that best summarises an entire data set: the arithmetic mean balances every observation by total sum, the median splits the ordered list exactly in half, and the mode identifies the most frequent value.**

Raw observations arrive either as an ungrouped list of individual numbers or already tallied into class intervals with frequencies. The mean is obtained by dividing the sum of all values (or frequency-weighted midpoints) by the total count; it incorporates every datum but is pulled toward extremes. The median requires ordering and, for grouped data, linear interpolation inside the interval that contains the middle position; it resists outliers. The mode requires locating the peak frequency and, again for grouped data, interpolation between adjacent frequencies; it alone can be multimodal or undefined.

These three quantities answer different questions about location. The mean answers “what is the centre of mass?”, the median “what is the middle rank?”, and the mode “what is the most common occurrence?”. When the distribution is symmetric they coincide; when it is skewed they separate, revealing shape.

> [!NOTE]
> The choice among them is not arbitrary: mean minimises squared error, median minimises absolute error, mode minimises zero-one loss; each therefore optimises a different loss function.

## 2. Why this matters — concrete and current
NASA’s Mars 2020 Perseverance rover records thousands of temperature readings per sol inside its MOXIE instrument; engineers compute the grouped mean of these readings every 30 minutes to decide whether the solid-oxide electrolysis stack remains inside its 300–800 °C operating window, because a single outlier sensor failure must not trigger an unnecessary shutdown.

Google’s TensorFlow Data Validation library, used by every major production model at YouTube and Google Search, automatically computes grouped median and mode of feature distributions across daily partitions; a sudden shift in the grouped median of user-session lengths flags data drift before the model’s accuracy drops.

Semiconductor fabs at TSMC monitor critical-dimension measurements on every wafer; the mode of the grouped distribution of line widths is tracked because the most frequent value, not the average, determines whether the current photomask must be replaced to keep yield above 99.2 %.

In high-energy physics, the CMS experiment at CERN aggregates millions of calorimeter energy deposits into 0.1 GeV bins; the grouped mean of the invariant-mass histogram after background subtraction yields the reported mass of the Higgs boson (125.38 GeV) with its associated uncertainty.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Frequency table          | Supplies the \(f_i\) and class widths required for grouped formulas |
| Cumulative frequency     | Locates the interval containing the median position       |
| Midpoint of an interval  | Converts a class \([L, U)\) into a single representative value \(x_i = (L+U)/2\) |
| Ordering of data         | Required to define rank-based median and to detect modes  |
| Summation notation \(\sum\) | Compact expression for total count and total sum          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish raw observations from grouped summaries
A list of separate numbers is ungrouped data; once the same numbers are placed into intervals and counted, they become grouped data. The distinction matters because only grouped data supply ready-made frequencies and class widths.

Example: the numbers 2, 3, 3, 7 are ungrouped; after binning they become the table “class 0–4 (freq 3), class 5–9 (freq 1)”.

Formal statement: an ungrouped data set is \(\{x_1,\dots,x_n\}\); the corresponding grouped version is a partition of the real line into intervals \(I_j\) together with frequencies \(f_j = |\{i : x_i \in I_j\}|\).

> [!WARNING]
> Treating grouped data as if every observation equalled the lower boundary produces a systematic downward bias in every subsequent calculation.

### Step 2 — Form the arithmetic mean for ungrouped data
Add every observation and divide by the number of observations. The result is the balance point of the data set.

Example: for 2, 3, 3, 7 the sum is 15 and \(n=4\), so the mean is 3.75.

Formal statement:
\[
\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i
\]

> [!WARNING]
> Forgetting to divide by \(n\) yields the total sum, not the centre.

### Step 3 — Extend the mean to grouped data
Replace each interval by its midpoint \(x_j\) and weight that midpoint by its frequency \(f_j\).

Formal statement:
\[
\bar{x} = \frac{\sum f_j x_j}{\sum f_j} = \frac{\sum f_j x_j}{N}
\]

where \(N = \sum f_j\).

### Step 4 — Locate the median in grouped data
Order the data by cumulative frequency; the median is the value that splits the total count exactly in half. When that position falls inside an interval, interpolate linearly.

Formal statement: let \(N\) be total frequency. Find the smallest \(k\) such that the cumulative frequency up to interval \(k\) is at least \(N/2\). Then
\[
\text{Median} = L_k + \left(\frac{N/2 - CF_{k-1}}{f_k}\right)h_k
\]
where \(L_k\) is the lower boundary, \(CF_{k-1}\) the cumulative frequency before the interval, \(f_k\) its frequency, and \(h_k\) its width.

### Step 5 — Locate the mode in grouped data
Identify the modal class (highest frequency). Interpolate between the frequencies of the two neighbouring classes.

Formal statement:
\[
\text{Mode} = L_m + \left(\frac{f_m - f_{m-1}}{2f_m - f_{m-1} - f_{m+1}}\right)h_m
\]

### Step 6 — Recognise the three distinct loss functions
The mean minimises \(\sum(x_i - c)^2\), the median minimises \(\sum|x_i - c|\), and the mode minimises the count of mismatches. Each therefore answers a different optimisation problem.

## 5. Worked examples — every step shown

**Example 1 — Ungrouped mean**  
*Given:* 4, 7, 8, 11, 14  
*Find:* arithmetic mean  
Sum = 4 + 7 + 8 + 11 + 14 = 44  
Why: addition aggregates every observation.  
Divide by count: 44 / 5 = 8.8  
Why: division normalises by sample size.  
**8.8**

*Reflection:* The calculation is direct; any omitted datum changes the result, illustrating sensitivity to every value.

**Example 2 — Grouped mean**  
*Given:* classes 0–10 (f=5), 10–20 (f=8), 20–30 (f=3); midpoints 5, 15, 25  
*Find:* mean  
\(\sum f x = 5\cdot5 + 8\cdot15 + 3\cdot25 = 25 + 120 + 75 = 220\)  
Why: each midpoint is weighted by how many observations it represents.  
\(N = 5+8+3=16\)  
\(\bar{x} = 220/16 = 13.75\)  
**13.75**

*Reflection:* Using midpoints introduces a small discretisation error that vanishes only as class width approaches zero.

**Example 3 — Grouped median**  
*Given:* classes 0–10 (f=4), 10–20 (f=7), 20–30 (f=5); N=16  
*Find:* median  
N/2 = 8. Cumulative frequencies: 4, 11, 16.  
Interval 10–20 contains the 8th observation.  
L=10, CF before=4, f=7, h=10.  
Median = 10 + ((8-4)/7)·10 = 10 + (4/7)·10 ≈ 15.71  
**15.71**

*Reflection:* Interpolation assumes uniform spread inside the interval; the assumption is weakest near the tails.

**Example 4 — Grouped mode**  
*Given:* same table as Example 3.  
*Find:* mode  
Modal class is 10–20 (f_m=7). Neighbours: f_{m-1}=4, f_{m+1}=5.  
Mode = 10 + ((7-4)/(14-4-5))·10 = 10 + (3/5)·10 = 16  
**16**

*Reflection:* The formula returns a value inside the modal class that is pulled toward the taller neighbour.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using lower boundary instead of midpoint | Habit of reading the left endpoint first            | Always compute (L+U)/2 before multiplying by f       |
| Forgetting to convert cumulative frequency correctly | Miscounting the position of N/2                     | Write the running total column explicitly            |
| Applying ungrouped formulas to frequency tables | Pattern-matching the symbol \(\sum x_i\)            | Check whether frequencies appear in the data         |
| Treating open-ended classes as having width zero | No upper limit supplied                             | Adopt conventional width from adjacent classes       |
| Declaring “no mode” when two classes tie | Over-generalising the unimodal case                 | Report “bimodal” and list both modal classes         |
| Interpolating median when N is even and split exactly on a boundary | Forgetting the definition of median position        | Verify whether N/2 lands on an observation or inside an interval |
| Rounding midpoints before summation | Premature rounding error accumulation               | Keep at least two extra decimals until final division |

## 7. The textbook-precise statement
Let \(x_1,\dots,x_n\) be real numbers. The (arithmetic) mean is \(\bar{x}=\frac1n\sum x_i\). For data grouped into intervals with frequencies \(f_j\) and midpoints \(x_j\), the mean is \(\bar{x}=\sum f_j x_j / N\). The median is any number \(m\) such that at least half the observations are \(\le m\) and at least half are \(\ge m\); for grouped data the linear-interpolation formula above supplies the conventional unique representative. The mode is any value that attains the global maximum frequency; the grouped interpolation formula yields the conventional representative inside the modal class. (See Triola, *Elementary Statistics*, 14e, §3-2 and §3-3.)

## 8. Visual — diagram or schematic
```text
Frequency
  ^
7 |         ████
6 |         ████
5 |     ████████
4 |     ████████
3 |     ████████
2 | ████████████
1 | ████████████
  +----------------->
    0-10  10-20  20-30   Class
          ↑      ↑
       Median  Mode
```
The tallest bar is the modal class; the vertical line at cumulative count N/2 crosses the median class.

## 9. The memory technique

1. **The hook** — Picture three people standing on a seesaw: the mean is the single fulcrum that balances every person’s weight, the median is the person exactly in the middle of the line, and the mode is the person wearing the most common shirt colour.
2. **What to overlearn** — The three formulas (ungrouped mean, grouped mean, grouped median, grouped mode) and the fact that mean uses every value, median uses rank, mode uses frequency.
3. **Spaced-repetition schedule** — Review the definitions after 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute one grouped example from scratch.
4. **First-principles fallback** — Re-derive any formula by writing the optimisation problem it solves: minimise squared error for the mean, absolute error for the median, mismatch count for the mode.

## 10. What this unlocks
These three statistics are the foundation for every subsequent measure of spread, shape, and association.  

- Standard deviation and variance are defined relative to the mean.  
- Quartiles, deciles, and percentiles extend the median construction.  
- Skewness coefficients compare mean, median, and mode directly.  
- Box plots and histograms use all three to summarise shape.  
- Many machine-learning loss functions (MSE, MAE, 0-1) are direct generalisations of the same three criteria.

## 11. Self-check — five questions, no answers
1. Compute the grouped mean of the distribution: classes 5–15 (f=6), 15–25 (f=10), 25–35 (f=4).  
2. A data set has N=25. Which cumulative-frequency threshold must be reached or exceeded to locate the median interval?  
3. In a grouped frequency table the modal class has frequency 12, the preceding class 9, the following class 7, width 5, lower boundary 20. What is the mode?  
4. Explain in one sentence why adding an outlier changes the mean but may leave the median unchanged.  
5. For the same data set the mean is 47.3, the median is 51.8, and the mode is 53.0. Sketch the implied skewness and justify your sketch in two sentences.