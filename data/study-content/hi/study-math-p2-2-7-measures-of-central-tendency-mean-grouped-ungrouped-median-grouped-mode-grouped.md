## 1. The one-sentence answer
**Measures of central tendency locate the single representative value around which an entire data set clusters, using the arithmetic mean (for both raw and frequency-grouped data), the median (via cumulative frequencies for grouped data), and the mode (via modal class for grouped data).**

Ungrouped mean simply adds every observation and divides by count, giving equal weight to each point. When data arrives already binned into class intervals with frequencies, direct summation becomes inefficient, so we replace it with the weighted sum \(\sum f_i x_i / \sum f_i\) where \(x_i\) is the class mark. Median and mode shift from ordering or counting individual values to locating the class that contains the 50th percentile or the highest frequency, respectively, using linear interpolation inside that class.

These three quantities answer different questions: mean answers “what is the balance point,” median answers “what splits the data in half,” and mode answers “what occurs most often.” They coincide only for perfectly symmetric unimodal distributions.

> [!NOTE]
> The decisive insight is that grouping replaces individual values by their class marks; all subsequent formulas are just weighted versions of the ungrouped definitions, with weights equal to the frequencies.

## 2. Why this matters — concrete and current
The U.S. Census Bureau publishes grouped income tables every year; analysts compute both mean and median household income from those bins to compare states without releasing individual records.  

In semiconductor yield analysis, TSMC records defect counts inside 5-nm process bins; the mode of the grouped defect distribution immediately flags the most common failure mechanism on a given wafer lot.  

Spotify’s audio-feature pipeline bins song loudness and tempo into 0.5 dB and 4 BPM intervals; the grouped median of these features is used to build daily “taste profiles” for the 500 million users because it resists outliers from a few extremely loud tracks.  

NASA’s Mars Perseverance rover transmits rock-composition spectra already aggregated into energy bins; the science team computes the grouped mean of each bin to estimate average elemental abundance while the lander is power-constrained and cannot downlink raw counts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Frequency table          | Supplies the \(f_i\) column that becomes the weight in every grouped formula |
| Class mark / mid-point   | Replaces every observation inside an interval by a single representative value \(x_i\) |
| Cumulative frequency     | Locates the class containing the median without listing every datum |
| Linear interpolation     | Converts the position inside a class into an actual numerical estimate for median and mode |

If any row is unfamiliar, pause and master frequency tables first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From raw list to single balance point
The arithmetic mean is the unique point at which the total signed deviations of all observations sum to zero.  
For the list 4, 7, 9 the mean is 6.666… because (4-6.666) + (7-6.666) + (9-6.666) = 0.  
Formally,  
\[
\bar{x} = \frac{1}{n}\sum_{i=1}^n x_i.
\]
> [!WARNING]
> Treating the mean as “just the average” without the zero-deviation property hides why it shifts dramatically when one extreme value is added.

### Step 2 — Introducing frequencies
When values repeat, multiply each distinct value by its frequency:  
\[
\bar{x} = \frac{\sum f_i x_i}{\sum f_i}.
\]
The denominator is now total sample size \(N = \sum f_i\).

### Step 3 — Grouping forces class marks
Data arrive only as intervals. Choose the midpoint \(x_i\) of each interval as the representative; the same weighted-mean formula still holds, now called the direct method for grouped data.

### Step 4 — Cumulative frequency locates the median class
Order the classes. The median class is the smallest class whose cumulative frequency reaches or exceeds \(N/2\). Inside that class the median is obtained by linear interpolation:  
\[
\text{Median} = L + \left(\frac{N/2 - cf}{f}\right)h,
\]
where \(L\) is the lower boundary, \(cf\) the cumulative frequency before the class, \(f\) the class frequency, and \(h\) the width.

### Step 5 — Modal class and mode interpolation
The modal class has the highest frequency. The mode inside it is  
\[
\text{Mode} = L + \left(\frac{f_m - f_{prev}}{2f_m - f_{prev} - f_{next}}\right)h.
\]
This formula assumes the frequencies rise to the modal class and then fall, giving a triangular shape.

### Step 6 — Textbook-grade summary
All three measures are now expressed solely in terms of class marks, frequencies, and class boundaries; no individual observations are required once the frequency distribution is given.

## 5. Worked examples — har step show karo

**Example 1 — Ungrouped mean**  
*Given:* Daily temperatures: 22, 24, 19, 25, 23.  
*Find:* Mean.  
Sum = 113.  
\[
\bar{x} = \frac{113}{5} = 22.6.
\]
*Why:* Direct application of the definition; each day contributes equally.  
**22.6**

*Reflection:* With only five numbers the calculation is trivial; the same principle scales to millions once grouping is introduced.

**Example 2 — Grouped mean (direct method)**  
*Given:* Marks of 50 students:  

| Class | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 |
|-------|------|-------|-------|-------|-------|
| f     | 5    | 12    | 18    | 10    | 5     |

Class marks: 5, 15, 25, 35, 45.  
\[
\sum f_i x_i = 5\cdot5 + 12\cdot15 + 18\cdot25 + 10\cdot35 + 5\cdot45 = 1195, \quad N=50.
\]
\[
\bar{x} = \frac{1195}{50} = 23.9.
\]
*Why:* Each class mark is multiplied by how many students fall inside that interval.  
**23.9**

*Reflection:* Grouping reduces 50 additions to 5; the result is an approximation whose error shrinks as class width decreases.

**Example 3 — Grouped median**  
Using the same table, \(N/2 = 25\). Cumulative frequencies: 5, 17, 35,… so median class is 20-30.  
\(L=20\), \(cf=17\), \(f=18\), \(h=10\).  
\[
\text{Median} = 20 + \left(\frac{25-17}{18}\right)\times10 = 24.44.
\]
*Why:* 25th observation lies inside the third class; interpolation assumes uniform spread inside the interval.  
**24.44**

*Reflection:* Median is robust to the extreme values that would pull the mean.

**Example 4 — Grouped mode**  
Modal class 20-30 (\(f_m=18\)), previous frequency 12, next 10.  
\[
\text{Mode} = 20 + \left(\frac{18-12}{2\cdot18-12-10}\right)\times10 = 23.33.
\]
*Why:* The formula weights how sharply the frequencies peak at the modal class.  
**23.33**

*Reflection:* When mean, median and mode are close, the distribution is nearly symmetric.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using class limits instead of mid-points | Students copy table values directly         | Always compute \(x_i = (L_i + U_i)/2\) first         |
| Forgetting to verify \(N = \sum f_i\) | Arithmetic slip                             | Add frequencies before any calculation               |
| Applying median formula to wrong class | Cumulative frequency column skipped         | Build cumulative column explicitly before locating \(N/2\) |
| Negative or zero denominator in mode formula | Adjacent frequencies equal modal frequency  | Check that \(2f_m > f_{prev}+f_{next}\); otherwise data may be bimodal |
| Reporting mean to more decimals than class width allows | Over-precision illusion                     | Round final answer to one decimal beyond class width |

## 7. The textbook-precise statement
Let the grouped data consist of \(k\) classes with lower boundaries \(L_i\), widths \(h_i\), frequencies \(f_i\) and class marks \(x_i = L_i + h_i/2\). The mean is
\[
\bar{x} = \frac{\sum_{i=1}^k f_i x_i}{\sum_{i=1}^k f_i},
\]
provided \(\sum f_i = N < \infty\). The median is the unique number \(m\) such that the proportion of observations strictly less than \(m\) equals 1/2; when \(m\) lies inside class \(j\) whose cumulative frequency up to \(j-1\) is \(cf_{j-1}\), it is given by the interpolation formula above. The mode is the value that maximises the density estimate inside the class of highest frequency, again via linear interpolation. (See Freedman, Pisani & Purves, *Statistics*, 4e, Chapter 4.)

## 8. Visual — diagram or schematic
```
Class intervals:   0-10   10-20   20-30   30-40   40-50
Frequencies:        5      12      18      10       5
Cumulative:         5      17      35      45      50
                     |       |       |       |       |
Median position ----+---> 25th obs inside 20-30
Mode position --------------> highest bar (20-30)
```

## 9. The memory technique
1. **The hook** — Picture three M’s standing on a number line: Mean is the fulcrum that balances all weights, Median is the knife that cuts the pile exactly in half, Mode is the tallest stack of blocks.
2. **What to overlearn** — The three formulas for grouped mean, median and mode exactly as written in Step 6.
3. **Spaced-repetition schedule** — Review the formulas after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Re-derive median by writing the definition “half the total frequency lies on each side” and solving the resulting linear equation inside the median class.

## 10. What this unlocks
Once you can compute these three measures from any frequency table you can move directly to measures of dispersion (variance, quartile deviation), skewness, and the empirical relation Mean – Mode ≈ 3(Mean – Median). These in turn feed into probability distributions, sampling theory and the first algorithms in machine-learning pipelines that preprocess tabular data.

## 11. Self-check — five questions, no answers
1. Compute the mean of the ungrouped data 3, 8, 12, 5, 7.  
2. A frequency table has classes 5-15 (f=4), 15-25 (f=9). What is the grouped mean?  
3. In a grouped distribution with N=80, the cumulative frequency reaches 31 just before the class 30-40 (f=22). Find the median.  
4. The frequencies around the modal class 40-50 are 11, 27, 19. Compute the mode.  
5. Why does adding one very large outlier change the mean but leave the median almost unchanged in a grouped table?