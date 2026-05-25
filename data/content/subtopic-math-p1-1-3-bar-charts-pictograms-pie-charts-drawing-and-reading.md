## What it is
Bar charts, pictograms, and pie charts are foundational visual tools used to represent categorical data. They map raw numbers (frequencies) to geometric properties: bar charts use the length of rectangles, pictograms use the count of symbols, and pie charts use the angle of circular sectors. 

## Why it matters
Data visualization is the bedrock of exploratory data analysis in machine learning, experimental physics, and aerospace engineering. Before you run complex regressions or plot orbital telemetry, you must know how to map numerical frequencies to geometry without distorting the truth. Misrepresenting a scale or proportion at this level leads to catastrophic misinterpretations of data later on.

## When to study it
You must have a solid grasp of:
*   Basic arithmetic (addition, multiplication, division).
*   Fractions, decimals, and percentages.
*   Basic geometry (specifically, knowing that a full circle is $360^\circ$ and understanding how to use a protractor).
If you cannot seamlessly convert a fraction to a percentage and then to a degree out of 360, review fractions and basic geometry first.

## How to study it (step by step)
1.  **Master the Frequency Table:** Before drawing any chart, organize your raw data into a table of Categories and Frequencies. Calculate the Total Frequency.
2.  **Bar Charts (Scaling):** Choose a linear scale for your y-axis (e.g., 1 unit = 5 observations). Ensure the axis starts at $0$. Draw bars of equal width; only the height encodes information.
3.  **Pictograms (The Key):** Define a "Key" (e.g., 1 star = 10 units). For frequencies that aren't multiples of the key, determine how to draw partial symbols (e.g., half a star = 5 units).
4.  **Pie Charts (Angles):** Convert each category's frequency into a fraction of the total. Multiply by $360^\circ$ to find the sector angle. 
5.  **Reverse Engineering:** Practice reading charts backwards. Given a pie chart with a $90^\circ$ sector and a total population of $400$, calculate the raw frequency (it is $\frac{90}{360} \times 400 = 100$).

## Key ideas, with intuition
**Proportionality is everything.** 
The core engine of all three charts is strict proportionality. If Category A has twice the frequency of Category B, its bar must be exactly twice as tall, it must have exactly twice as many icons, and its pie slice must have exactly twice the angle. 

**The Pie Chart Angle Formula.**
A pie chart represents the "whole" as a full circle, which is $360^\circ$. If a category has frequency $f$ and the total frequency of all categories is $N$, the fraction of the whole is $\frac{f}{N}$. To find the angle $\theta$, you take that fraction of the circle:
$$ \theta = \frac{f}{N} \times 360^\circ $$

**The Baseline.**
A bar chart must always start its frequency axis at $0$. If you start the axis at $10$, a bar representing $20$ will look infinitely larger than a bar representing $10$ (since the $10$ bar will have zero height). This is a common statistical lie; do not commit it.

## Worked example
**Problem:** An engineering team tests 45 rocket valves. The outcomes are: 30 Successes, 10 Partial Failures, and 5 Critical Failures. Calculate the angles required to draw a pie chart.

**Step 1: Verify the total frequency ($N$).**
$$ N = 30 + 10 + 5 = 45 $$

**Step 2: Calculate the angle for Success.**
$$ \theta_{\text{Success}} = \frac{30}{45} \times 360^\circ $$
Simplify the fraction $\frac{30}{45} = \frac{2}{3}$.
$$ \theta_{\text{Success}} = \frac{2}{3} \times 360^\circ = 240^\circ $$

**Step 3: Calculate the angle for Partial Failure.**
$$ \theta_{\text{Partial}} = \frac{10}{45} \times 360^\circ $$
Simplify the fraction $\frac{10}{45} = \frac{2}{9}$.
$$ \theta_{\text{Partial}} = \frac{2}{9} \times 360^\circ = 80^\circ $$

**Step 4: Calculate the angle for Critical Failure.**
$$ \theta_{\text{Critical}} = \frac{5}{45} \times 360^\circ $$
Simplify the fraction $\frac{5}{45} = \frac{1}{9}$.
$$ \theta_{\text{Critical}} = \frac{1}{9} \times 360^\circ = 40^\circ $$

**Step 5: Sanity check.**
The sum of all angles must equal $360^\circ$.
$$ 240^\circ + 80^\circ + 40^\circ = 360^\circ $$
*Reflection:* By reducing the fractions first, the arithmetic becomes trivial. The sanity check guarantees no data was lost in translation.

## Diagrams

```text
BAR CHART: Rocket Valve Tests
Freq
 30 |   [======]
 25 |   [======]
 20 |   [======]
 15 |   [======]
 10 |   [======]      [======]
  5 |   [======]      [======]      [======]
  0 +------------------------------------------
        Success       Partial       Critical

PICTOGRAM: Rocket Valve Tests
Key: [*] = 10 valves, [.] = 5 valves

Success  : [*] [*] [*]
Partial  : [*]
Critical : [.]
```
*Note on Pie Charts:* To draw the pie chart for this data, draw a circle, mark the center, draw a vertical radius, and use a protractor to measure $240^\circ$ clockwise for Success, then $80^\circ$ from that new line for Partial, leaving exactly $40^\circ$ for Critical.

## Memory technique — remember this forever
1.  **Mnemonic:** "Bars for Length, Pics for Count, Pie for Parts of 360."
2.  **Must overlearn:** 
    $$ \text{Sector Angle} = \left( \frac{\text{Frequency}}{\text{Total Frequency}} \right) \times 360^\circ $$
3.  **Spaced-repetition schedule:** Review this concept and re-derive a pie chart from a data table at 1 day, 3 days, 7 days, 16 days, and 35 days.
4.  **First principles pathway:** If you forget the pie chart formula, set up a basic equivalence ratio. The ratio of the angle $\theta$ to the whole circle ($360^\circ$) must equal the ratio of the category frequency $f$ to the total frequency $N$. 
    $$ \frac{\theta}{360^\circ} = \frac{f}{N} $$
    Multiply both sides by $360^\circ$ to isolate $\theta$.

## Common mistakes
*   **Confusing percentages with degrees:** A student calculates a category is $50\%$ of the total, and then draws a $50^\circ$ angle on the pie chart. $50\%$ of a circle is $180^\circ$, not $50^\circ$.
*   **Truncating the y-axis on bar charts:** Starting the vertical axis at a number other than $0$ to exaggerate differences between categories. 
*   **Ignoring the pictogram key:** Counting the raw number of symbols and assuming that is the frequency, without multiplying by the key's value.

## Self-check
1.  A bar chart has a y-axis where 1 grid square equals 4 units. A bar is 3.5 grid squares tall. What is the frequency of that category?
2.  In a survey of 72 people, 18 prefer Python. What is the angle of the "Python" sector in a pie chart?
3.  A pictogram uses a satellite icon to represent 20 launches. How would you draw 45 launches? If those 45 launches represent exactly a $90^\circ$ slice of a pie chart containing all launches, what is the total number of launches?