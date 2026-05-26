## 1. The one-sentence answer
**A box-and-whisker plot is a visual summary of a univariate data set that marks its five-number summary—minimum, first quartile Q1, median Q2, third quartile Q3, and maximum—while the interquartile range IQR = Q3 − Q1 isolates the spread of the central 50 % of observations.**

To construct one, first arrange every observation in ascending order. The median splits the ordered list into two equal halves. Q1 is the median of the lower half; Q3 is the median of the upper half. The box stretches from Q1 to Q3; a line inside the box marks the median. Whiskers extend from the box ends to the smallest and largest values that lie within 1.5 × IQR of Q1 or Q3; any points beyond those fences are plotted individually as outliers.

The resulting diagram therefore encodes location, spread, skewness, and tail behavior in a single compact graphic that requires no assumption of normality.

> [!NOTE]
> The IQR is deliberately insensitive to the extreme tails; it therefore remains stable even when the minimum or maximum is corrupted by recording errors, which is why box plots are preferred over range-based summaries in exploratory analysis.

## 2. Why this matters — concrete and current
NASA mission planners use box plots of telemetry residuals from the Mars Perseverance rover’s sensors to detect anomalous thruster firings without being misled by occasional cosmic-ray spikes.

Quantitative equity desks at Jane Street compute daily IQR of mid-price returns across thousands of instruments; values exceeding three times the rolling IQR trigger automated circuit-breaker reviews before market open.

Semiconductor foundries at TSMC monitor the IQR of critical-dimension measurements across wafer lots; a sudden widening of the box signals a process drift hours before any yield loss appears in final test.

Epidemiologists at the CDC’s National Center for Health Statistics publish annual box plots of age-adjusted BMI distributions from NHANES; the changing position of Q3 relative to Q1 tracks the rightward shift of the upper tail of obesity prevalence.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ordered list         | Quartiles are defined only after data are sorted.         |
| Median               | The median is itself the second quartile and the anchor for locating Q1 and Q3. |
| Division into halves | Quartiles are medians of the halves created by the overall median. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Order the observations
Any summary that depends on position must begin with the data arranged from smallest to largest.  
Example: the five heights 162 cm, 155 cm, 170 cm, 158 cm, 168 cm become 155, 158, 162, 168, 170.  
Formally, let the ordered sample be \(x_{(1)} \le x_{(2)} \le \cdots \le x_{(n)}\).

> [!WARNING]
> If even one pair is left out of order, every subsequent quartile index will be wrong.

### Step 2 — Locate the median
The median divides the ordered list into two equal parts.  
For odd \(n = 2k+1\), it is \(x_{(k+1)}\). For even \(n = 2k\), any value between \(x_{(k)}\) and \(x_{(k+1)}\) may be used; the conventional choice is their average.  
This value is denoted \(Q_2\).

> [!WARNING]
> Treating the median as the arithmetic mean of the whole data set instead of the positional middle destroys the resistance to outliers that quartiles are meant to provide.

### Step 3 — Split the halves
Remove the median. The lower half consists of the observations strictly below \(Q_2\); the upper half consists of those strictly above \(Q_2\).  
When \(n\) is odd the two halves each contain \(k\) observations; when \(n\) is even each half also contains \(k\) observations.

> [!WARNING]
> Including the median itself in either half shifts Q1 or Q3 by one position and produces inconsistent software output.

### Step 4 — Compute Q1 and Q3
Q1 is the median of the lower half; Q3 is the median of the upper half.  
Using the same positional rule as Step 2 yields the first and third quartiles.

### Step 5 — Form the five-number summary and IQR
The five numbers are \(\min, Q_1, Q_2, Q_3, \max\).  
Their differences give three ranges: the full range, the IQR, and the two whisker lengths.  
The interquartile range is defined by the equation
\[
\text{IQR} = Q_3 - Q_1.
\]

### Step 6 — Draw the box plot
Place a rectangular box from \(Q_1\) to \(Q_3\). Draw a line segment at \(Q_2\). Extend whiskers to the most extreme observations still inside the fences \([Q_1 - 1.5 \times \text{IQR}, Q_3 + 1.5 \times \text{IQR}]\). Plot any remaining points individually.

## 5. Worked examples — every step shown

**Example 1 — Five observations, odd count**  
*Given:* 3, 7, 8, 12, 15  
*Find:* Q1, Q2, Q3, IQR  

Ordered list: 3, 7, 8, 12, 15.  
Median \(Q_2 = 8\) (third position).  
Lower half: 3, 7 → median \(Q_1 = 5\).  
Upper half: 12, 15 → median \(Q_3 = 13.5\).  
\[
\text{IQR} = 13.5 - 5 = 8.5
\]  
**8.5**  

*Reflection:* The single middle value is excluded from both halves; forgetting this rule would have produced Q1 = 7.

**Example 2 — Six observations, even count**  
*Given:* 4, 5, 6, 8, 9, 11  
*Find:* five-number summary and IQR  

Ordered: 4, 5, 6, 8, 9, 11.  
\(Q_2 = (6 + 8)/2 = 7\).  
Lower half: 4, 5, 6 → \(Q_1 = 5\).  
Upper half: 8, 9, 11 → \(Q_3 = 9\).  
IQR = 4.  
Five-number summary: 4, 5, 7, 9, 11.  

*Reflection:* The average of the two central values is required; choosing either 6 or 8 alone would shift the halves.

**Example 3 — Data with an outlier**  
*Given:* 2, 3, 3, 4, 5, 6, 20  
*Find:* fences and which points are outliers  

Ordered list yields Q1 = 3, Q3 = 6, IQR = 3.  
Fences: 3 − 4.5 = −1.5 and 6 + 4.5 = 10.5.  
20 lies outside the upper fence and is plotted separately.  

*Reflection:* The IQR itself never incorporates the outlier, so the fences remain stable.

**Example 4 — Larger set requiring index arithmetic**  
*Given:* the ordered 20-value data set whose positions give Q1 at index 5.5 (average of 5th and 6th) and Q3 at index 15.5.  
Compute IQR directly from those values and state the box-plot elements.  

*Reflection:* Index formulas generalize; always verify whether software uses inclusive or exclusive conventions.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Including the median in a half | Students forget to remove Q2 before splitting | Explicitly set the median aside first.       |
| Using mean instead of median for Q1/Q3 | Familiarity with the mean overrides positional definition | Re-state: “median of the lower half,” never “mean.” |
| Confusing percentile rank with quartile index | Different software packages number positions differently | Always compute from first principles on small data. |
| Treating IQR as a percentage | IQR is an interval length, not a proportion | Write IQR = Q3 − Q1 each time.               |
| Drawing whiskers to min/max unconditionally | Textbooks sometimes omit the 1.5 × IQR rule | Check the fence calculation before extending whiskers. |
| Forgetting that n even splits halves evenly | The overall median is an average, not a datum | Count the observations on each side after removal. |
| Mixing inclusive and exclusive quartiles across tools | Excel, R, and Python default differently | Replicate the exact rule used by the target software on a test set. |

## 7. The textbook-precise statement
Let \(x_{(1)} \le \cdots \le x_{(n)}\) be an ordered sample of size \(n\). The sample quartiles are the medians of the lower and upper halves after removal of the sample median. The interquartile range is \(\text{IQR} = Q_3 - Q_1\). A box plot displays the closed interval \([Q_1, Q_3]\), a line at \(Q_2\), whiskers to the most extreme observations inside the fences \([Q_1 - 1.5 \cdot \text{IQR}, Q_3 + 1.5 \cdot \text{IQR}]\), and individual symbols for all other points (Moore, McCabe & Craig, *Introduction to the Practice of Statistics*, 10e, §1.3).

## 8. Visual — diagram or schematic
```text
          min          Q1     Q2      Q3          max
           |            |      |       |            |
           o------------|======|=======|------------o
                        |      |       |
                     lower fence     upper fence
 whiskers to min/max inside fences; outliers plotted separately
```

## 9. The memory technique
1. **The hook** — picture a box of chocolates divided into four equal rows; the two inner rows form the box, the outer rows are the whiskers, and any chocolate that fell on the floor is an outlier.
2. **What to overlearn** — IQR = Q3 − Q1; fences = Q1 ± 1.5 × IQR; the median is always Q2.
3. **Spaced-repetition schedule** — review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — re-sort the data, locate the median position, split the halves, and recompute each quartile as a median.

## 10. What this unlocks
Mastery of quartiles and IQR supplies the language for every subsequent resistant summary and for the detection of skewness before any parametric model is fitted.  

- Construction of modified box plots and variable-width box plots  
- Five-number summaries inside stem-and-leaf displays  
- Robust scaling in machine-learning preprocessing pipelines  
- Non-parametric tests that rely on rank positions (Wilcoxon, Mann–Whitney)  

## 11. Self-check — five questions, no answers
1. For the ordered set {1, 2, 3, 4, 5, 6, 7}, compute Q1, Q2, Q3 and IQR.  
2. A data set of 101 observations has Q3 = 48 and IQR = 12. What is the value of Q1?  
3. Explain why adding a single extreme outlier cannot change the IQR.  
4. Two software packages report different Q1 values for the same list of 20 numbers. What single procedural difference most likely accounts for the discrepancy?  
5. Sketch a box plot whose lower whisker is longer than the upper whisker yet contains no outliers; state the implication for skewness.