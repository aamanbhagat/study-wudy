## 1. The one-sentence answer
**Mean, median, and mode are the three fundamental measures of central tendency that locate the "middle" of a data set in different ways.**

The mean balances every value by its magnitude. It is the arithmetic average obtained by dividing the total sum by the number of observations. The median balances the data by position alone; once the values are placed in order, it is the value that splits the list exactly in half. The mode balances by frequency; it is simply the value that appears most often.

These three quantities behave identically on perfectly symmetric data but diverge as soon as asymmetry or repeated values appear. For raw lists the calculations are direct. For grouped data the same ideas are recovered by treating each class interval as a single representative point (its midpoint) weighted by its frequency.

> [!NOTE]
> The mean is pulled toward extreme values; the median resists them; the mode simply reports the most common observation. Choosing which one to use is therefore a decision about what kind of "center" the problem actually requires.

## 2. Why this matters — concrete and current
NASA’s Mars Climate Orbiter mission in 1999 used mean thrust values computed from raw sensor streams; a unit-conversion error in those means produced the loss of the spacecraft. Modern semiconductor fabs at TSMC calculate the median of wafer-thickness measurements across thousands of dies every hour; any drift in the median triggers immediate process correction before yield collapses.

In large-scale machine-learning pipelines at Google, the mode of token frequencies inside training corpora determines vocabulary size for language models; an undetected change in mode can shift model performance by several BLEU points. Public-health agencies tracking COVID-19 used grouped age-band data to compute mean days from infection to hospitalization; these means fed directly into ICU-capacity forecasts published by the CDC.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordering of real numbers | Median requires sorting; mode comparison also uses order. |
| Summation notation       | Mean is defined via \(\sum x_i\).                         |
| Frequency counts         | Grouped data replaces raw values by class frequencies.    |
| Midpoint of an interval  | Grouped mean and median use class midpoints.              |

## 4. Building the idea — from intuition to formalism

### Step 1 — The mean as total mass divided by count
The mean treats every datum as a unit mass on a number line and finds the balance point. For the raw list 3, 7, 7 the total mass is 17 and there are three points, so the balance point is 17/3.

The formal statement is
\[
\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i.
\]

> [!WARNING]
> Forgetting to divide by n produces the sum, not the mean; many later formulas then become dimensionally inconsistent.

### Step 2 — The median as positional middle
Sort the data. If n is odd the middle position is unique; if n is even any value between the two central positions satisfies the definition, though convention often takes their average.

For the sorted list 3, 7, 7 the median is 7.

\[
\text{Median} = 
\begin{cases}
x_{\frac{n+1}{2}} & n\text{ odd}\\
\frac{x_{n/2}+x_{n/2+1}}{2} & n\text{ even}
\end{cases}
\]

> [!WARNING]
> Failing to sort first produces an arbitrary number that has no positional meaning.

### Step 3 — The mode as highest frequency
Count occurrences. The value with the largest count is the mode. The list 3, 7, 7 has mode 7.

No closed formula exists; the mode is defined by direct comparison of frequencies.

> [!WARNING]
> A data set may have no mode or several modes; claiming “the” mode when frequencies are tied misleads.

### Step 4 — Extending the mean to grouped data
Replace each class by its midpoint \(x_i\) weighted by frequency \(f_i\):
\[
\bar{x} = \frac{\sum f_i x_i}{\sum f_i}.
\]

### Step 5 — Extending the median to grouped data
Locate the class that contains the \(\frac{N}{2}\)-th observation, then interpolate linearly inside that class:
\[
\text{Median} = L + \left(\frac{\frac{N}{2}-F}{f}\right)h,
\]
where \(L\) is the lower boundary, \(F\) the cumulative frequency before the median class, \(f\) its frequency, and \(h\) its width.

### Step 6 — Extending the mode to grouped data
The modal class is the one with highest frequency. Its midpoint is reported as the mode, or linear interpolation between adjacent classes may be used.

## 5. Worked examples — every step shown

**Example 1 — Raw-data mean**  
*Given:* 4, 8, 12, 16  
*Find:* mean  
Sum: \(4+8+12+16=40\).  
*Why* — addition aggregates total mass.  
Divide by count: \(40/4=10\).  
*Why* — division normalizes by number of observations.  
**10**

*Reflection:* The numbers are equally spaced; any measure of center yields 10. The arithmetic is deliberately trivial so the definition is visible.

**Example 2 — Raw-data median with even count**  
*Given:* 2, 5, 5, 9, 11, 14  
*Find:* median  
Sort (already sorted).  
*Why* — median definition requires order.  
Two central values are 5 and 9.  
Average: \((5+9)/2=7\).  
*Why* — even-case convention places median halfway between.  
**7**

*Reflection:* The repeated 5 does not affect the median; only positions matter.

**Example 3 — Grouped mean**  
*Given:* classes 0–10 (f=4), 10–20 (f=6), 20–30 (f=2)  
*Find:* mean  
Midpoints: 5, 15, 25.  
Weighted sum: \(4\cdot5 + 6\cdot15 + 2\cdot25 = 20+90+50=160\).  
*Why* — each midpoint stands for every observation in its class.  
Total frequency: 12.  
Mean: \(160/12 \approx 13.333\).  
**13.333**

*Reflection:* The result lies inside the second class, pulled rightward by the higher-frequency interval.

**Example 4 — Grouped median**  
*Given:* same table, N=12.  
*Find:* median  
Cumulative frequencies: 4, 10, 12.  
\(\frac{N}{2}=6\) falls inside second class (10–20).  
L=10, F=4, f=6, h=10.  
\[
10 + \left(\frac{6-4}{6}\right)10 \approx 13.333.
\]
**13.333**

*Reflection:* Interpolation assumes uniform spread inside the class—an assumption that can be checked only with raw data.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using mean on heavily skewed data | Mean is sensitive to outliers               | Compute median first; compare both           |
| Forgetting to sort before median  | Position is meaningless without order       | Always write the sorted list explicitly      |
| Treating open-ended classes as finite | Midpoint undefined for unbounded intervals | Exclude or estimate boundary from context    |
| Reporting bimodal data as single mode | Two frequencies tied                        | State “bimodal, modes = a and b”             |
| Using class limits instead of midpoints | Midpoint is the unbiased representative     | Calculate (lower+upper)/2 each time          |
| Dividing grouped sum by number of classes | Confuses total frequency with class count   | Always divide by \(\sum f_i\)                |
| Interpolating median when N even  | Formula assumes continuous cumulative       | Check parity of N before applying formula    |

## 7. The textbook-precise statement
Let \(x_1,\dots,x_n\) be real numbers. The **arithmetic mean** is \(\bar{x}=\frac1n\sum x_i\). The **median** is any number m such that at least half the observations are \(\le m\) and at least half are \(\ge m\). The **mode** is any value that attains the maximum frequency.

For grouped data with k classes having frequencies \(f_i\) and midpoints \(x_i\), the mean is \(\bar{x}=\sum f_i x_i/\sum f_i\). The median is obtained by locating the class containing the cumulative position \(N/2\) and applying linear interpolation inside that class (see Triola, *Elementary Statistics*, 14e, §3-2 and §3-3).

## 8. Visual — diagram or schematic
```text
Number line (raw data 3,7,7,12)
3     7     12
|-----|-----|
      ↑mean=7.333
        ↑median=7
          ↑mode=7
```
The diagram shows how the mean is displaced rightward by the outlier 12 while median and mode remain at the repeated central value.

## 9. The memory technique
**The hook** — picture three people standing on a seesaw: the mean balances total weight, the median balances head-count, the mode balances the person who brought the most friends.

**What to overlearn**  
- Raw mean formula \(\bar{x}=\frac1n\sum x_i\)  
- Even/odd median rule  
- Grouped mean \(\sum f x/\sum f\)

**Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from the definition of “balance point,” “middle position,” and “highest count”; re-derive each formula in two lines.

## 10. What this unlocks
These three quantities are the first summary statistics any data set receives; every subsequent technique—variance, skewness, box plots, hypothesis tests—compares itself to them.

- Variance and standard deviation are defined as average squared distance from the mean.  
- Skewness quantifies the signed difference between mean and median.  
- Box-plot construction places the median at the center and uses quartiles derived from the same ordering.  
- Many machine-learning normalization layers subtract the mean or the median before scaling.

## 11. Self-check — five questions, no answers
1. Compute the mean, median, and mode of the raw list 1, 3, 3, 6, 10.  
2. A frequency table has classes 0–5 (f=8), 5–10 (f=3). What is the grouped mean?  
3. Why does adding the outlier 100 to {1,2,3} change the mean but not the median?  
4. For an even number of observations, must the median itself be one of the data values?  
5. In a grouped table the modal class is identified, yet two adjacent classes have equal highest frequency. Which value should be reported as the mode, and why?