## 1. The one-sentence answer
**Bar charts, pictograms, and pie charts are visual encodings that map categorical frequencies to geometric attributes so that comparisons and part-to-whole relations become immediate.**

These encodings rest on the same underlying data table: a list of distinct categories paired with their counts or frequencies. Once the table exists, each chart type translates the numbers into a different visual language. Bar charts use the length of rectangles, pictograms use repeated icons scaled by a chosen key, and pie charts use central angles whose sizes are proportional to the frequencies. The translation is reversible: a trained reader can recover the original frequencies from any of the three diagrams to within the precision of the drawing.

The choice among the three formats is driven by the question being asked. Length comparisons favour bars; rapid part-to-whole judgments favour pies; iconic representation for non-technical audiences favours pictograms. All three, however, require the same preliminary discipline: categories must be exhaustive and mutually exclusive, and the total frequency must be known before any scaling occurs.

> [!NOTE]
> The single most important insight is that every mark on these charts is a scaled representation of a count; therefore the first act of reading is always to recover the scale factor, not to guess relative sizes by eye.

## 2. Why this matters — concrete and current
In semiconductor yield analysis, TSMC publishes weekly defect-category counts; process engineers overlay bar charts of defect type versus wafer lot to isolate the dominant failure mode within hours rather than days.

NASA’s Earth Observatory uses pictograms of Arctic sea-ice extent on public dashboards; each icon represents 1 million km², allowing non-specialists to compare 2023 coverage directly with the 1981–2010 baseline without reading numerical tables.

The UK Office for National Statistics releases monthly pie charts of household expenditure shares; the visual immediately shows that housing costs crossed 30 % of total spend in 2022, triggering automatic policy review triggers in the Treasury’s fiscal model.

Google’s internal experimentation platform converts A/B-test outcome counts into side-by-side bar charts; the length difference feeds directly into a sequential probability ratio test whose stopping boundary is expressed in the same visual units.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Tally and frequency table| Supplies the raw counts that every chart encodes          |
| Simple proportion        | Required to compute angles in pie charts and scale keys in pictograms |
| Reading a linear scale   | Determines the value represented by any bar length or icon count |

## 4. Building the idea — from intuition to formalism

### Step 1 — Organise raw observations into categories
Plain-English claim: Every chart begins with a complete list of mutually exclusive categories and the number of times each occurs.  
Concrete example: In a class of 30 students the eye-colour data are recorded as brown 15, blue 9, green 4, other 2.  
Formal statement:  
Let \(C = \{c_1, c_2, \dots, c_k\}\) be the set of categories and let \(f_i\) be the frequency of category \(c_i\). Then \(\sum f_i = n\), where \(n\) is the total number of observations.  
> [!WARNING]
> If two observations can legitimately belong to more than one category, the frequencies are no longer additive and every subsequent chart will double-count.

### Step 2 — Choose the visual attribute that matches the comparison
Plain-English claim: Length is the most accurately perceived visual variable for comparing magnitudes; angle and area are less precise.  
Concrete example: Comparing sales of five products is clearer with five bars of different lengths than with five sectors whose angles must be judged by eye.  
Formal statement: Map each frequency \(f_i\) to a length \(\ell_i = s \cdot f_i\), where \(s\) is a chosen scale factor with units length per count.

### Step 3 — Construct a bar chart
Plain-English claim: Bars must have equal width, be separated by gaps, and sit on a common baseline so that only height carries information.  
Concrete example: Plotting the eye-colour frequencies with a vertical scale of 1 cm = 5 students produces bars of heights 3 cm, 1.8 cm, 0.8 cm and 0.4 cm.  
Formal statement: The bar chart is the function \(\ell: C \to \mathbb{R}^+\) together with the geometric rule that rectangles of width \(w\) and height \(\ell(c_i)\) are placed at positions \(x_i = i \cdot (w + g)\), \(g > 0\).

### Step 4 — Construct a pictogram
Plain-English claim: Replace each unit of the scale with a recognisable icon; partial icons represent fractional counts.  
Concrete example: Using one smiley face = 5 students yields three full faces for brown, one full face plus four-fifths of a face for blue, etc.  
Formal statement: Let \(k\) be the key (icons per count). The number of icons drawn for category \(c_i\) is \(\lceil f_i / k \rceil\) with the final icon shaded to the proportion \(f_i \bmod k\).

### Step 5 — Construct a pie chart
Plain-English claim: The full circle of 360° is divided so each sector angle is proportional to its frequency.  
Concrete example: Brown receives \((15/30) \times 360^\circ = 180^\circ\).  
Formal statement:  
\[
\theta_i = 360^\circ \cdot \frac{f_i}{\sum f_j}.
\]

### Step 6 — Recover frequencies from a finished chart
Plain-English claim: Reading is the inverse operation: measure the visual attribute, divide by the scale factor, and obtain the original count.  
Formal statement: Given a measured length \(\ell_i\) or angle \(\theta_i\), the estimated frequency is \(\hat{f}_i = \ell_i / s\) or \(\hat{f}_i = (\theta_i / 360^\circ) \cdot n\).

### Step 7 — Textbook statement
A categorical frequency distribution on a finite set \(C\) may be represented by any of three diagrams whose geometric parameters are linear functions of the frequencies; the diagrams are informationally equivalent provided the scale factors are stated or recoverable.

## 5. Worked examples — every step shown

**Example 1 — Reading a bar chart**  
*Given:* A vertical bar chart shows four categories with bar heights 4.5 cm, 2.0 cm, 3.5 cm, 1.0 cm; the scale label states “1 cm represents 20 items”.  
*Find:* The frequency of each category.  
Measure height of first bar: 4.5 cm.  
Divide by scale: \(4.5 / 1 = 4.5\). Multiply by 20: \(4.5 \times 20 = 90\).  
*Why:* The scale converts length back to count.  
Repeat for remaining bars: 40, 70, 20.  
**90, 40, 70, 20**  
*Reflection:* The only arithmetic required is multiplication by the reciprocal of the scale; any misreading of the scale label produces a constant-factor error across all categories.

**Example 2 — Drawing a pictogram**  
*Given:* Transport survey: car 45, bus 30, walk 15; choose one bicycle icon = 10 people.  
*Find:* The pictogram.  
Compute icons needed: car \(45/10 = 4.5\), bus 3, walk 1.5.  
Draw 4 full bicycles and one half-shaded for car; 3 full for bus; 1 full and one half-shaded for walk.  
Label the key beneath the diagram.  
**Completed pictogram with key “🚲 = 10 people”**  
*Reflection:* Partial icons must be drawn to exact proportion; guessing the fraction visually defeats the purpose of the key.

**Example 3 — Calculating pie-chart angles**  
*Given:* The same transport data: totals 90.  
*Find:* Sector angles.  
Divide each frequency by total: \(45/90 = 0.5\), \(30/90 = 1/3\), \(15/90 = 1/6\).  
Multiply by 360°: \(0.5 \times 360 = 180^\circ\), \(120^\circ\), \(60^\circ\).  
**180°, 120°, 60°**  
*Reflection:* The sum of angles must be exactly 360°; any rounding error that breaks this identity signals an arithmetic mistake.

**Example 4 — Mixed reading and comparison**  
*Given:* A bar chart and a pie chart of identical data are presented side by side; the bar scale is 1 cm = 8 units, the pie chart shows a 135° sector.  
*Find:* The frequency represented by the 135° sector and its corresponding bar height.  
Frequency from pie: \((135/360) \times n\). First recover \(n\) from the largest bar (assume it is 6 cm high): \(6 \times 8 = 48\), therefore total \(n = 48\). Sector frequency: \((135/360) \times 48 = 18\). Bar height for 18: \(18 / 8 = 2.25\) cm.  
**18; 2.25 cm**  
*Reflection:* Cross-checking two representations of the same data catches scale misreads that would be invisible in a single chart.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Omitting the scale or key         | Author assumes reader can guess magnitudes  | Write the scale explicitly on every axis or legend   |
| Bars touching with no gap         | Confusion with histograms                   | Insert a visible gap between every pair of bars      |
| 3-D pie charts                    | Visual fashion overrides accuracy           | Use flat 2-D circles only                            |
| Rounding angles before summing    | Early rounding destroys 360° closure        | Keep exact fractions until the final multiplication  |
| Pictogram icons of unequal size   | Artistic impulse overrides the key          | Enforce identical icon size; shade only for fractions|
| Reading bar height from the top of a label | Label placement interferes with measurement | Measure to the top of the bar rectangle itself       |
| Treating “other” category as zero | Invisible slice looks absent                | Always compute and display the residual slice        |

## 7. The textbook-precise statement
A frequency distribution on a finite categorical set \(C = \{c_1,\dots,c_k\}\) with frequencies \(f_i\) may be represented by a bar chart, pictogram or pie chart. The bar chart maps each \(f_i\) to a rectangle of height proportional to \(f_i\); the pictogram maps each \(f_i\) to a number of identical icons scaled by a fixed key; the pie chart partitions the circle into sectors whose angles satisfy \(\theta_i = 360^\circ \cdot f_i / n\). All three representations are informationally equivalent once the respective scale factors are known. (See Moore, McCabe & Craig, *Introduction to the Practice of Statistics*, 10e, §1.1.)

## 8. Visual — diagram or schematic
```text
Bar chart (scale: 1 cm = 10 people)
          ^
people    |
100  |    ████
 80  |    ████
 60  |    ████   ████
 40  |    ████   ████   ████
 20  |    ████   ████   ████   ████
  0  +----+----+----+----+----+----> categories
      catA catB catC catD catE
```
Each ████ block is 2 cm high. Gaps of 0.5 cm separate the bars. Axis labels and scale statement are placed outside the plotting region.

## 9. The memory technique
1. **The hook** — Picture a shopkeeper weighing fruit on three different balances: one gives length (bar), one counts scoops (pictogram), one divides the whole pie (pie chart). The fruit weight never changes; only the measuring instrument does.  
2. **What to overlearn** — The pie-chart angle formula \(\theta = 360^\circ \times f/n\); the rule that bars are separated by gaps; the requirement that a pictogram key must be stated.  
3. **Spaced-repetition schedule** — Review the angle formula at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Reconstruct any chart by returning to the frequency table, writing each \(f_i\), then applying the linear mapping appropriate to the chosen format.

## 10. What this unlocks
Mastery of these three diagrams supplies the visual grammar required for every subsequent statistical graphic.  

- Histograms and stem-and-leaf plots extend the bar-chart idea to continuous data.  
- Mosaic plots and treemaps generalise the part-to-whole logic of pie charts to multiple categorical variables.  
- Dot plots and Cleveland dot charts refine the length-comparison principle for higher precision.  
- All modern visualisation libraries (ggplot2, matplotlib, D3) inherit the same scale-mapping abstractions introduced here.

## 11. Self-check — five questions, no answers
1. A bar chart has bars of heights 3.2 cm, 1.6 cm and 4.8 cm with scale “1 cm = 25 units”. What are the three frequencies?  
2. Draw a pictogram for the data set {A:28, B:14, C:7} using one star = 7 observations.  
3. A pie chart contains sectors of 90°, 120° and 150°. If the total frequency is 80, calculate each frequency.  
4. Why is it invalid to draw a pie chart when the categories are allowed to overlap?  
5. A pictogram uses a key of 5 icons per 100 people. One category shows 3 full icons and one icon shaded to 60 %. What frequency does that category represent?