## 1. The one-sentence answer
**A box-and-whisker plot summarises a data set by showing the median, the spread of the middle 50 % of values through the interquartile range (IQR), and the overall range while highlighting outliers.**

Pehla quartile Q1 data ke lowest 25 % ko alag karta hai, dusra quartile Q2 median hota hai jo data ko exactly aadha-aadha baant deta hai, aur teesra quartile Q3 top 25 % ko mark karta hai. IQR = Q3 − Q1 sirf middle 50 % ki variability batata hai, isliye extreme values isko affect nahi karte. Box plot mein ek box Q1 se Q3 tak banta hai, uske andar ek line median ke liye, aur whiskers min aur max tak jaate hain (ya phir 1.5 × IQR ke andar tak).

> [!NOTE]
> IQR aur median dono order statistics hain; inko calculate karne ke liye sirf data ko sort karna padta hai, koi actual addition ya multiplication nahi chahiye.

## 2. Why this matters — concrete and current
In semiconductor manufacturing at TSMC, engineers use box plots on wafer thickness measurements across thousands of chips to detect process drift; an IQR that suddenly widens signals contamination before yield drops.

In reinforcement-learning research at DeepMind, performance distributions of agents on Atari games are compared with box plots so that the IQR shows consistency across random seeds rather than just mean score, which can be skewed by a few lucky runs.

Climate scientists at NASA’s GISS apply box-and-whisker plots to monthly temperature anomalies over 140 years; the whiskers reveal whether recent decades have pushed the upper tail beyond any historical IQR, giving a non-parametric view of extremes.

Quantitative finance teams at Jane Street monitor daily P&L distributions of trading strategies with box plots; when the IQR of a strategy’s returns shrinks while the median stays positive, they know the edge is becoming crowded.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sorting a list       | Quartiles are defined only after data is ordered.         |
| Percentile position  | Formula for locating Q1 and Q3 uses fractional positions. |
| Median               | Median is exactly Q2; understanding it makes IQR natural. |
| Outlier rule         | 1.5 × IQR fence is the conventional whisker cutoff.       |

Agar aap sorting aur median nahi samajhte, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Order the data
Data ko chhote se bade order mein arrange karna zaroori hai kyunki quartiles position pe depend karte hain.  
Example: raw scores 7, 3, 9, 1, 5 → sorted list 1, 3, 5, 7, 9.  
Formal statement: let \(x_{(1)} \leq x_{(2)} \leq \dots \leq x_{(n)}\) be the ordered sample.  
> [!WARNING] Agar order galat ho gaya to Q1 aur Q3 dono galat nikalenge aur pura box plot ulta ho jaayega.

### Step 2 — Locate the median Q2
Agar n odd hai to middle value, agar even hai to do middle values ka average.  
Example: sorted 1, 3, 5, 7, 9 → Q2 = 5.  
Formal: \(Q_2 = x_{((n+1)/2)}\) (n odd) or average of two central terms (n even).

### Step 3 — Locate Q1 and Q3
Lower half se median Q1, upper half se median Q3.  
Example: lower half 1, 3 → Q1 = 2; upper half 7, 9 → Q3 = 8.  
Formal: position index \(k = \lfloor (n+1)/4 \rfloor\) with linear interpolation when needed.

### Step 4 — Compute IQR
IQR = Q3 − Q1.  
Example: 8 − 2 = 6.  
Formal: \(\text{IQR} = Q_3 - Q_1\).

### Step 5 — Draw the box and whiskers
Box Q1 se Q3 tak, vertical line at Q2; whiskers extend to smallest and largest values inside [Q1 − 1.5·IQR, Q3 + 1.5·IQR].  
Formal fence: lower fence \(Q_1 - 1.5 \times \text{IQR}\), upper fence \(Q_3 + 1.5 \times \text{IQR}\).

### Step 6 — Flag outliers
Koi bhi point fence ke bahar outlier maana jaata hai aur alag se plot kiya jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Five-point toy set**  
*Given:* 4, 8, 2, 6, 10  
*Find:* quartiles, IQR, and box-plot elements.  
Sorted: 2, 4, 6, 8, 10.  
Q2 = 6 (middle). Lower half 2, 4 → Q1 = 3; upper half 8, 10 → Q3 = 9.  
IQR = 9 − 3 = 6.  
Fences: 3 − 9 = −6, 9 + 9 = 18. All points inside → whiskers 2 to 10.  
**Final answer**  
Box: [3, 9], median line at 6, whiskers 2 and 10.  
*Reflection:* Simple odd count case shows how halves are split cleanly.

**Example 2 — Even count with interpolation**  
*Given:* 1, 3, 4, 7, 8, 9  
*Find:* Q1 and Q3.  
Sorted same. n = 6, position for Q1 = (6 + 1)/4 = 1.75.  
Value = 1 + 0.75·(3 − 1) = 2.5.  
Q3 position 5.25 → 8 + 0.25·(9 − 8) = 8.25.  
**Final answer**  
Q1 = 2.5, Q3 = 8.25, IQR = 5.75.  
*Reflection:* Interpolation formula must be applied when position is not integer.

**Example 3 — Outlier present**  
*Given:* 12, 15, 16, 18, 19, 22, 35  
*Find:* whiskers and outliers.  
Q1 = 15, Q3 = 22, IQR = 7.  
Fences: 15 − 10.5 = 4.5, 22 + 10.5 = 32.5.  
35 > 32.5 → outlier. Whiskers reach 12 and 22.  
**Final answer**  
Box [15, 22], median 18, whiskers 12–22, outlier dot at 35.  
*Reflection:* 1.5 × IQR rule automatically isolates the extreme point.

**Example 4 — Real data slice (exam scores)**  
*Given:* 45, 52, 58, 61, 67, 71, 74, 78, 82, 91  
*Find:* full box-plot summary.  
Sorted already. Q1 position 2.75 → 52 + 0.75·(58 − 52) = 56.5.  
Q2 = average of 67 and 71 = 69.  
Q3 position 8.25 → 78 + 0.25·(82 − 78) = 79.  
IQR = 22.5. Fences 22.75 and 112.75. No outliers.  
**Final answer**  
Box [56.5, 79], median 69, whiskers 45 and 91.  
*Reflection:* Real data forces both interpolation and even-n median handling together.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using n/4 instead of (n+1)/4 | Students copy Excel’s PERCENTILE.INC habit | Always write position = (n+1)·p first        |
| Splitting halves including median | Forgetting median belongs to neither half | Explicitly remove Q2 before finding Q1, Q3   |
| Treating IQR as standard deviation | Confusing robust spread with moment-based spread | Remember IQR uses only two order statistics  |
| Plotting whiskers to absolute min/max always | Ignoring 1.5 × IQR fence                    | Calculate fences before drawing whiskers     |
| Forgetting interpolation    | Assuming every quartile lands on a datum    | Check if position index is integer           |
| Swapping Q1 and Q3 labels   | Visual confusion when data is left-skewed   | Always verify Q1 < Q2 < Q3 after calculation |

## 7. The textbook-precise statement
Let \(X = \{x_1, \dots, x_n\}\) be a finite real sample. Let \(x_{(1)} \leq \dots \leq x_{(n)}\) denote the order statistics. The first quartile \(Q_1\) is the 0.25-quantile, the second quartile \(Q_2\) is the 0.5-quantile (sample median), and the third quartile \(Q_3\) is the 0.75-quantile, each obtained by linear interpolation between adjacent order statistics when the ideal index \((n+1)p\) is non-integer. The interquartile range is defined as \(\text{IQR} = Q_3 - Q_1\). The box plot consists of a rectangle spanning \([Q_1, Q_3]\), a line segment at \(Q_2\), and whiskers extending to the most extreme observations inside the closed interval \([Q_1 - 1.5 \cdot \text{IQR}, Q_3 + 1.5 \cdot \text{IQR}]\); any observation outside this interval is plotted individually as an outlier. (Moore, *The Basic Practice of Statistics*, 8e, §2.5)

## 8. Visual — diagram or schematic
```
          outlier
             *
   |---------|-----|---------|
  min       Q1    Q2    Q3   max
   |_________|_____|_________|
       box      median
             whiskers
```
Horizontal axis: data values increasing left to right. Box rectangle from Q1 to Q3. Thick vertical line exactly at Q2. Thin horizontal lines (whiskers) from Q1 leftward to the smallest non-outlier and from Q3 rightward to the largest non-outlier. Any point beyond the 1.5·IQR fences marked with a separate symbol (*).

## 9. The memory technique
1. **The hook** — Imagine a cat sitting inside a cardboard box; the box covers the cat’s middle half (IQR), the cat’s spine is the median line, and its tail and whiskers stretch out only as far as the safe fence before they become “outliers”.
2. **What to overlearn** — IQR = Q3 − Q1; fences = Q1 − 1.5·IQR and Q3 + 1.5·IQR; median is always Q2.
3. **Spaced-repetition schedule** — Review definitions after 1 day, recalculate one worked example after 3 days, draw a fresh box plot from raw data after 7 days, explain the 1.5 rule to someone else after 16 days, and derive fences from scratch after 35 days.
4. **First-principles fallback** — Sort the list, locate the three central positions using (n+1)p, interpolate if needed, subtract to obtain IQR, multiply by 1.5 for fences.

## 10. What this unlocks
Mastery of quartiles and IQR lets you move directly into robust statistics, resistant lines, and non-parametric tests.  
- Next: five-number summary and its use in side-by-side comparisons.  
- Next: modified box plots that display skewness via whisker asymmetry.  
- Next: introduction to cumulative distribution functions where quartiles appear as inverse-CDF values at 0.25, 0.5, 0.75.

## 11. Self-check — five questions, no answers
1. For the ordered set 3, 5, 7, 9, 11, 13 compute Q1, Q2, Q3 and IQR.  
2. A data set has Q1 = 20, Q3 = 50. One observation equals 95. Is it an outlier under the 1.5·IQR rule?  
3. Why does the median line inside the box sometimes sit closer to Q1 than to Q3?  
4. If every value in a sample is multiplied by −1, what happens to the IQR?  
5. Two classes have identical medians and identical IQRs yet one box plot shows an outlier while the other does not. Construct such a pair of data sets.