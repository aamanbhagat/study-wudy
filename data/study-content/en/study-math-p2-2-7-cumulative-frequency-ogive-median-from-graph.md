## 1. The one-sentence answer
**Cumulative frequency records the running total of observations up to each class boundary, and an ogive is the smooth curve of those totals from which the median is read directly as the value at half the total frequency.**

A frequency table lists how many data points fall inside each interval. Adding those counts one interval at a time produces a new column whose final entry equals the sample size n. Plotting the cumulative totals against the upper endpoints of the intervals and joining the points with straight lines yields the ogive. The median is the horizontal coordinate where this curve crosses the vertical line at height n/2.

Because the ogive is strictly increasing, every cumulative value between 0 and n corresponds to exactly one point on the horizontal axis. This property turns the graph into a reliable visual tool for locating order statistics without returning to the raw list.

> [!NOTE]
> The median on an ogive is the x-value at which the curve first reaches or passes n/2; any vertical line drawn at that height intersects the curve at the median, not at a class midpoint.

## 2. Why this matters — concrete and current
In semiconductor yield analysis, engineers at TSMC accumulate defect counts across wafer bins; the ogive immediately shows the median defect density that half the wafers fall below, guiding process adjustments before full production runs.

Epidemiologists tracking COVID-19 at the WHO maintain daily cumulative case counts by age band. Plotting the ogive allows rapid extraction of the median age of infection, a figure used in real-time resource allocation models published in The Lancet.

Insurance actuaries at Lloyd’s construct ogives of claim sizes from historical portfolios. The median read from the curve determines the attachment point for reinsurance layers, directly affecting premium calculations that appear in annual regulatory filings.

NASA’s Mars Sample Return mission planners use cumulative frequency graphs of particle-size distributions measured by the Perseverance rover’s PIXL instrument. The median grain diameter extracted from the ogive informs sieve specifications for the sample cache hardware.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Grouped frequency table  | Supplies the raw counts that are cumulatively summed      |
| Upper class boundaries   | Provide the precise x-coordinates for plotting points     |
| Linear interpolation     | Allows reading values between plotted points on the ogive |
| Order statistics         | The median is defined as the middle position in an ordered list |

## 4. Building the idea — from intuition to formalism

### Step 1 — Running totals replace scattered counts
A frequency table tells how many observations sit inside each interval, yet it hides how many lie at or below any chosen boundary. Summing frequencies sequentially produces a single increasing sequence that answers the question “how many data points are ≤ x?” for every x that is an upper boundary.

Concrete example: intervals 0–10 (freq 4), 10–20 (freq 7). The cumulative sequence is 4 then 11.

Formal statement: if \(f_i\) is the frequency of the i-th class, the cumulative frequency up to class k is
\[
F_k = \sum_{i=1}^k f_i.
\]

> [!WARNING]
> Using lower boundaries instead of upper boundaries shifts every plotted point left by one class width and produces an incorrect median.

### Step 2 — Plotting points at upper boundaries
Each cumulative total \(F_k\) is paired with the upper endpoint of its class. These (x, y) pairs are the only points guaranteed to lie on the ogive; connecting them with straight-line segments creates a continuous, piecewise-linear graph.

### Step 3 — The ogive becomes a visual lookup table
Because the curve is continuous and strictly increasing from (lowest boundary, 0) to (highest boundary, n), any horizontal line y = c intersects it at exactly one x-value. That x-value is the smallest number below which c observations lie.

### Step 4 — Locating the median
The median occupies position n/2 in the ordered list. On the ogive this position corresponds to height n/2. The x-coordinate of the intersection is therefore the median.

Formal statement: let \(G(x)\) be the ogive function. The median m satisfies
\[
G(m) = \frac{n}{2}.
\]

### Step 5 — Linear interpolation between plotted points
When n/2 falls between two consecutive plotted heights \(F_{k-1}\) and \(F_k\), the median is found by linear interpolation inside that segment:
\[
m = L + \left( \frac{\frac{n}{2} - F_{k-1}}{f_k} \right) w,
\]
where L is the lower boundary of the class, w its width.

## 5. Worked examples — every step shown

**Example 1 — Ungrouped data turned into ogive**
*Given:* Scores: 3, 7, 8, 12, 15 (n = 5).  
*Find:* Median via ogive.

Sort the data (already sorted).  
Cumulative frequencies: 1, 2, 3, 4, 5.  
Plot points (3,1), (7,2), (8,3), (12,4), (15,5).  
n/2 = 2.5 lies between (7,2) and (8,3).  
Interpolate: distance 1 on y-axis, need 0.5, so 0.5 of the way from 7 to 8.  
m = 7 + 0.5 × 1 = 7.5.

**7.5**

*Reflection:* The tiny data set forces exact interpolation between two consecutive integers; the same arithmetic scales unchanged to grouped tables.

**Example 2 — Standard grouped table**
*Given:*  
Class | Freq  
10–20 | 6  
20–30 | 10  
30–40 | 4  
(n = 20).  
*Find:* Median.

Cumulative: 6, 16, 20.  
n/2 = 10 lies inside 20–30 class.  
L = 20, w = 10, F_{prev} = 6, f = 10.  
m = 20 + (10 − 6)/10 × 10 = 24.

**24**

*Reflection:* The formula automatically handles the case where the median class is not the first or last.

**Example 3 — Median near the lower tail**
*Given:* Same table but frequencies 12, 5, 3.  
*Find:* Median.

Cumulative: 12, 17, 20.  
n/2 = 10 lies inside first class.  
m = 10 + (10 − 0)/12 × 10 = 18.33.

**18.33**

*Reflection:* When more than half the data sit in the lowest class the median is pulled downward, correctly captured by the interpolation ratio.

**Example 4 — Reading from a sketched ogive**
*Given:* Ogive passes through (50,18) and (60,32), n = 40.  
*Find:* Median.

n/2 = 20 lies between 18 and 32.  
Fraction = (20 − 18)/(32 − 18) = 2/14.  
m = 50 + (2/14) × 10 ≈ 51.43.

**51.43**

*Reflection:* The calculation never requires the original frequencies once the two bracketing points are known.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Plotting at midpoints               | Habit from histograms                       | Always use upper class boundaries                    |
| Forgetting n/2 must be on y-axis    | Confusing median with mean                  | Mark horizontal line at height n/2 first             |
| Using lower boundary in interpolation | Formula misremembered                       | Write L as lower boundary of the median class        |
| Treating cumulative frequency as percentage | Column labelled “cumulative %”            | Keep raw counts until interpolation is finished      |
| Connecting points with curves instead of lines | Over-smoothing assumption                 | Use straight segments unless explicitly told otherwise |
| Reading x at the plotted point rather than interpolated | Discrete thinking                         | Always solve the linear equation inside the segment  |
| Ignoring open-ended classes at the end | Last class has no upper bound             | Exclude or cap the final class before plotting       |

## 7. The textbook-precise statement
Let the classes be intervals \([x_{i-1}, x_i)\) with frequencies \(f_i\), \(i = 1,\dots,k\), and let \(N = \sum f_i\). The cumulative frequency function is the step function
\[
F(x) = \sum_{x_i \le x} f_i.
\]
The ogive is the continuous piecewise-linear interpolant of the points \((x_i, F(x_i))\). The median is any number m satisfying \(F(m) = N/2\); when the ogive is strictly increasing there is a unique such m. (See Triola, *Elementary Statistics*, 14e, §2.4.)

## 8. Visual — diagram or schematic
```text
y
↑
N ────────────────────●
   |                 /
   |               /
N/2 ────────────●
   |           /
   |         /
   |       /
   |     /
   |   /
   | /
 0 ●───────────────────────► x
   x0   x1   x2   x3   x4
```
Points are plotted at each upper boundary \(x_i\) with height equal to the cumulative total up to that boundary. Straight-line segments connect successive points. The median is the x-coordinate where the rising line crosses height N/2.

## 9. The memory technique
1. **The hook** — Picture an “ogre” (ogive) who keeps a running tally of every person who walks past; when the tally reaches half the village, the ogre points at that exact person—the median.
2. **What to overlearn** — The interpolation formula and the rule “plot at upper boundaries.”
3. **Spaced-repetition schedule** — Review the interpolation formula after 1 day, redraw an ogive after 3 days, solve a fresh grouped-data median after 7 days, teach the method to someone after 16 days, and construct an ogive from raw data after 35 days.
4. **First-principles fallback** — Rebuild the cumulative column by adding frequencies left to right, plot the pairs, draw the horizontal at n/2, then solve the line equation between the two bracketing points.

## 10. What this unlocks
Mastery of ogives supplies the visual and computational foundation for all percentile work and for the later construction of box plots and Lorenz curves.

- Quartiles and deciles are read from the same curve at heights n/4, 3n/4, etc.
- The empirical cumulative distribution function in probability is the probabilistic analogue of the ogive.
- Non-parametric tolerance intervals in industrial statistics rely on the same interpolation logic.

## 11. Self-check — five questions, no answers
1. For the frequency table with classes 5–10 (8), 10–15 (12), 15–20 (5), compute the exact median by interpolation and state which class contains it.
2. An ogive passes through (30, 25) and (40, 55). If n = 80, what is the median?
3. Why does plotting cumulative frequency against lower boundaries produce a systematically biased median?
4. A data set has n = 101. Where exactly on the y-axis must the horizontal line be drawn to locate the median?
5. Given only the two points that bracket the median on an ogive, can the original class frequencies be recovered? If so, how; if not, why not?