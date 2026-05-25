## 1. What it is — in plain English

Imagine you have a long list of numbers, maybe the scores of all students on a math test, or the daily temperatures for a month. Just looking at the raw list can be overwhelming. You want a quick, clear summary of where most of the numbers lie, how spread out they are, and if there are any unusually high or low values.

A "box-and-whisker plot," often just called a "box plot," is like a super-condensed visual report card for your data. It doesn't show every single number, but it gives you a powerful snapshot of the data's distribution, especially its central tendency and variability. Think of it as a way to quickly see the "middle chunk" of your data and how far the "tails" stretch out.

The "box" part of the plot shows you where the middle 50% of your data lives. It highlights the typical range of values. The "whiskers" extend from the box to show the full spread of the *rest* of the data, excluding any extreme outliers. If there are any truly unusual data points, they're marked individually beyond the whiskers, like little asterisks drawing attention to themselves.

In essence, a box plot divides your data into four equal sections, each containing 25% of the data points. These division points are called "quartiles." It's a fantastic tool for comparing different sets of data side-by-side, because you can instantly see which one is higher, wider, or has more extreme values.

## 2. Why it matters — real-world applications

Box-and-whisker plots are incredibly versatile and find applications across countless fields where understanding data distribution is key.

1.  **Quality Control in Manufacturing (Aerospace Engineering):** Imagine a company like Boeing or SpaceX manufacturing critical components, say, the thickness of a fuselage panel or the thrust output of a rocket engine. They collect thousands of measurements. A box plot allows engineers to quickly visualize the distribution of these measurements. If the box is too wide, it indicates high variability in the manufacturing process, potentially leading to inconsistent product quality. If the median shifts over time, it could signal a drift in machine calibration. Outliers could point to specific faulty batches or measurement errors that need immediate investigation to ensure safety and performance standards.

2.  **Medical Research and Drug Efficacy:** Pharmaceutical companies conducting clinical trials need to evaluate how a new drug affects patients. They might measure blood pressure, cholesterol levels, or symptom severity before and after treatment, or compare a drug group to a placebo group. Side-by-side box plots for each group (e.g., "Drug A," "Placebo," "Drug B") can instantly reveal:
    *   Which drug leads to a lower median blood pressure.
    *   Which drug has a tighter distribution (smaller IQR), indicating more consistent patient response.
    *   Whether there are patients who react unusually strongly (outliers) to a particular treatment, which could indicate adverse effects or exceptional efficacy in a subgroup.

3.  **Financial Analysis and Investment Risk (Machine Learning):** Financial analysts and quantitative traders use box plots to understand the distribution of stock returns, bond yields, or portfolio performance. For instance, when comparing different investment strategies or assets, box plots can show:
    *   The median return (Q2) for each.
    *   The interquartile range (IQR), which serves as a robust measure of volatility or risk – a wider box means higher risk.
    *   The presence of extreme outliers (e.g., "black swan" events or exceptional gains/losses) that might influence risk models. Machine learning algorithms that predict market movements often analyze these distributions as features.

4.  **Environmental Science and Climate Change:** Environmental scientists might collect data on air quality, water pollution levels, or temperature anomalies across different regions or over different time periods. Box plots can help them visualize and compare:
    *   The typical range of pollutant concentrations in different cities.
    *   How temperature distributions have shifted over decades, revealing trends in climate change.
    *   Identify extreme pollution events (outliers) that might be linked to specific industrial accidents or weather patterns.

## 3. Prerequisites — what you must know first

Before diving deep into box-and-whisker plots, ensure you have a solid grasp of these fundamental concepts:

*   **Quantitative Data:** Understanding that box plots are used for numerical data (measurements, counts) rather than categorical data (names, types).
*   **Ordering Data:** The ability to arrange a set of numbers from smallest to largest. This is the absolute first step for almost all calculations in this topic.
*   **Median:** The middle value of an ordered dataset. You should know how to calculate it for both odd and even numbers of data points.
*   **Range:** The difference between the maximum and minimum values in a dataset.
*   **Percentiles (Basic Understanding):** A general idea that percentiles divide a dataset into 100 equal parts. Quartiles are specific percentiles (25th, 50th, 75th).

## 4. The core idea — step by step

The core idea behind box plots is to summarize the "five-number summary" of a dataset: Minimum, First Quartile (Q1), Median (Q2), Third Quartile (Q3), and Maximum. We then add a layer of identifying potential outliers. Let's break down how to find these values and construct the plot.

### Step 1: Order the Data

*   **Plain English:** Before you can find the middle or any specific quarter of your data, everything needs to be lined up from the smallest value to the largest. Imagine sorting a deck of cards by number.
*   **Small Concrete Example:**
    Given the dataset: $[10, 5, 20, 15, 25]$
    Ordered data: $[5, 10, 15, 20, 25]$
*   **Formal/Mathematical Version:** Given a dataset $X = \{x_1, x_2, \ldots, x_n\}$, the first step is to sort it in ascending order to obtain $X' = \{x_{(1)}, x_{(2)}, \ldots, x_{(n)}\}$, where $x_{(1)} \le x_{(2)} \le \ldots \le x_{(n)}$.
*   **What Could Go Wrong:** Not sorting the data at all, or sorting it incorrectly (e.g., descending instead of ascending, or making a mistake with one of the numbers). This will lead to completely wrong results for all subsequent steps.

### Step 2: Find the Median (Q2)

*   **Plain English:** The median is the value that splits your *ordered* dataset exactly in half. 50% of the data points are below it, and 50% are above it. It's the "middle child."
*   **Small Concrete Example:**
    Using the ordered data from Step 1: $[5, 10, 15, 20, 25]$
    There are 5 data points. The middle one is the 3rd value.
    Median ($Q_2$) = $15$.

    If the dataset were: $[5, 10, 15, 20, 25, 30]$ (6 data points)
    The middle is between the 3rd and 4th values.
    Median ($Q_2$) = $\frac{15 + 20}{2} = 17.5$.
*   **Formal/Mathematical Version:** The median, denoted as $Q_2$, is calculated as follows:
    *   If $n$ (the number of data points) is odd, $Q_2 = x_{(\frac{n+1}{2})}$.
    *   If $n$ is even, $Q_2 = \frac{x_{(\frac{n}{2})} + x_{(\frac{n}{2}+1)}}{2}$.
*   **What Could Go Wrong:** Miscalculating the median, especially for an even number of data points where you need to average the two middle values. Forgetting to sort the data *before* finding the median.

### Step 3: Find the First Quartile (Q1)

*   **Plain English:** The first quartile is the median of the *lower half* of your data. It marks the point below which 25% of the data falls. Think of it as the "middle of the first half."
*   **Small Concrete Example:**
    Using the ordered data: $[5, 10, 15, 20, 25]$
    The lower half is the data *below* the median (15). So, $[5, 10]$. (Note: When $n$ is odd, the median itself is typically *excluded* from both halves for quartile calculation using this method, often called Tukey's method or the "median-inclusive" method if the median is included in the halves only if it's one of two middle points).
    For $[5, 10]$, the median is $\frac{5 + 10}{2} = 7.5$.
    So, $Q_1 = 7.5$.

    Let's use an example where $n$ is even for Q2: $[5, 10, 15, 20, 25, 30]$
    $Q_2 = 17.5$. The lower half is $[5, 10, 15]$.
    For $[5, 10, 15]$, the median is $10$.
    So, $Q_1 = 10$.
*   **Formal/Mathematical Version:** $Q_1$ is the median of the lower half of the sorted data.
    *   If $n$ is odd, the lower half consists of all data points $x_{(i)}$ where $i < \frac{n+1}{2}$.
    *   If $n$ is even, the lower half consists of all data points $x_{(i)}$ where $i \le \frac{n}{2}$.
*   **What Could Go Wrong:** Incorrectly identifying the lower half of the data, especially when $n$ is odd and the median needs to be excluded. Different software packages (like R, Excel) can have slightly different conventions for calculating quartiles, which can lead to minor discrepancies. For this lesson, we will stick to the standard method where the median is excluded from the halves if $n$ is odd.

### Step 4: Find the Third Quartile (Q3)

*   **Plain English:** The third quartile is the median of the *upper half* of your data. It marks the point below which 75% of the data falls (and above which 25% falls). It's the "middle of the second half."
*   **Small Concrete Example:**
    Using the ordered data: $[5, 10, 15, 20, 25]$
    The upper half is the data *above* the median (15). So, $[20, 25]$.
    For $[20, 25]$, the median is $\frac{20 + 25}{2} = 22.5$.
    So, $Q_3 = 22.5$.

    Using the example where $n$ is even for Q2: $[5, 10, 15, 20, 25, 30]$
    $Q_2 = 17.5$. The upper half is $[20, 25, 30]$.
    For $[20, 25, 30]$, the median is $25$.
    So, $Q_3 = 25$.
*   **Formal/Mathematical Version:** $Q_3$ is the median of the upper half of the sorted data.
    *   If $n$ is odd, the upper half consists of all data points $x_{(i)}$ where $i > \frac{n+1}{2}$.
    *   If $n$ is even, the upper half consists of all data points $x_{(i)}$ where $i > \frac{n}{2}$.
*   **What Could Go Wrong:** Similar to $Q_1$, incorrectly identifying the upper half of the data.

### Step 5: Calculate the Interquartile Range (IQR)

*   **Plain English:** The IQR is simply the distance between the first and third quartiles. It tells you how spread out the middle 50% of your data is. A small IQR means the middle data points are clustered tightly; a large IQR means they are more spread out.
*   **Small Concrete Example:**
    From previous examples, if $Q_1 = 7.5$ and $Q_3 = 22.5$:
    $IQR = Q_3 - Q_1 = 22.5 - 7.5 = 15$.
*   **Formal/Mathematical Version:** The Interquartile Range (IQR) is defined as $IQR = Q_3 - Q_1$.
*   **What Could Go Wrong:** Simple arithmetic error. Confusing IQR with the full range (Max - Min).

### Step 6: Identify Potential Outliers

*   **Plain English:** Outliers are data points that are unusually far away from the bulk of the data. We use the IQR to set "fences" beyond which data points are considered potential outliers. These aren't removed from the data, but they are highlighted.
*   **Small Concrete Example:**
    Let $Q_1 = 7.5$, $Q_3 = 22.5$, $IQR = 15$.
    Lower Fence = $Q_1 - 1.5 \times IQR = 7.5 - (1.5 \times 15) = 7.5 - 22.5 = -15$.
    Upper Fence = $Q_3 + 1.5 \times IQR = 22.5 + (1.5 \times 15) = 22.5 + 22.5 = 45$.
    Any data point less than $-15$ or greater than $45$ would be an outlier.
    If our data was $[5, 10, 15, 20, 25]$, there are no outliers.
    If we had data like $[5, 10, 15, 20, 25, 60]$, then $60$ would be an outlier because $60 > 45$.
*   **Formal/Mathematical Version:** Potential outliers are defined as any data point $x$ such that:
    $$x < Q_1 - 1.5 \cdot IQR \quad \text{or} \quad x > Q_3 + 1.5 \cdot IQR$$
    The values $Q_1 - 1.5 \cdot IQR$ and $Q_3 + 1.5 \cdot IQR$ are called the **lower fence** and **upper fence**, respectively.
*   **What Could Go Wrong:** Using the wrong multiplier (e.g., $3 \times IQR$ for extreme outliers, but $1.5 \times IQR$ is the standard for box plots). Calculation errors in determining the fences. Forgetting to check *all* data points against the fences.

### Step 7: Construct the Box-and-Whisker Plot

*   **Plain English:** Now we draw the picture!
    1.  Draw a number line that covers the full range of your data (including outliers).
    2.  Draw a box from $Q_1$ to $Q_3$. This box represents the middle 50% of your data.
    3.  Draw a line inside the box at the median ($Q_2$).
    4.  Draw "whiskers" extending from the box. These whiskers go to the smallest and largest data points that are *not* outliers. That is, the lower whisker extends from $Q_1$ to the smallest data point $\ge$ Lower Fence, and the upper whisker extends from $Q_3$ to the largest data point $\le$ Upper Fence.
    5.  Mark any outliers individually with dots, asterisks, or small circles beyond the whiskers.
*   **Small Concrete Example:**
    Let's use the data from Example 3 below: $[1, 2, 3, 4, 5, 6, 7, 8, 9, 20]$.
    $Q_1 = 3.5$, $Q_2 = 5.5$, $Q_3 = 7.5$, $IQR = 4$.
    Lower Fence $= 3.5 - 1.5 \times 4 = 3.5 - 6 = -2.5$.
    Upper Fence $= 7.5 + 1.5 \times 4 = 7.5 + 6 = 13.5$.
    Minimum non-outlier: $1$ (since $1 > -2.5$).
    Maximum non-outlier: $9$ (since $9 < 13.5$).
    Outlier: $20$ (since $20 > 13.5$).
    The box would be from $3.5$ to $7.5$, with a line at $5.5$. The lower whisker would go to $1$. The upper whisker would go to $9$. A dot would be placed at $20$.
*   **Formal/Mathematical Version:**
    1.  A horizontal or vertical axis is drawn to represent the range of the data.
    2.  A rectangular box is drawn from $Q_1$ to $Q_3$. The length of this box is the IQR.
    3.  A line is drawn within the box at $Q_2$ (the median).
    4.  "Whiskers" extend from the box. The lower whisker extends from $Q_1$ to the smallest data point that is greater than or equal to the Lower Fence ($Q_1 - 1.5 \cdot IQR$). The upper whisker extends from $Q_3$ to the largest data point that is less than or equal to the Upper Fence ($Q_3 + 1.5 \cdot IQR$).
    5.  Any data points falling outside the fences are plotted individually as points (e.g., asterisks or circles) and are considered outliers.
*   **What Could Go Wrong:** Drawing whiskers to the absolute minimum/maximum values *even if* there are outliers. Incorrectly labeling the plot. Drawing the box or median line in the wrong position.

## 5. Worked examples — multiple, with every step shown

We will use the method where the median is *excluded* when calculating the quartiles for odd-sized datasets. This is a common method (often called Tukey's method or the "hinge" method).

### Example 1: Small dataset, odd $n$, no outliers

**Problem:** Construct a box-and-whisker plot for the following dataset: $[12, 5, 18, 9, 15, 20, 7]$

**What's given:** A set of 7 quantitative data points.
**What we want:** The five-number summary (Min, Q1, Q2, Q3, Max), IQR, outlier fences, and a description of the box plot.

**Step 1: Order the Data**
Given data: $[12, 5, 18, 9, 15, 20, 7]$
Sorted data: $[5, 7, 9, 12, 15, 18, 20]$
*Explanation: We arrange all the numbers from smallest to largest to make it easy to find the middle values.*

**Step 2: Find the Median (Q2)**
Number of data points $n=7$ (odd).
The median is the $\frac{n+1}{2}$-th value.
$Q_2 = x_{(\frac{7+1}{2})} = x_{(4)} = 12$.
*Explanation: With 7 points, the 4th point is exactly in the middle, with 3 points before it and 3 points after it. This is our median.*

**Step 3: Find the First Quartile (Q1)**
The lower half of the data (excluding the median $Q_2=12$) is: $[5, 7, 9]$.
Number of points in lower half $n_L = 3$ (odd).
$Q_1$ is the median of the lower half, which is the $\frac{n_L+1}{2}$-th value.
$Q_1 = x_{( \frac{3+1}{2} )} = x_{(2)} = 7$.
*Explanation: We take the data points strictly less than the median (12). For this subset, we find its median, which is 7.*

**Step 4: Find the Third Quartile (Q3)**
The upper half of the data (excluding the median $Q_2=12$) is: $[15, 18, 20]$.
Number of points in upper half $n_U = 3$ (odd).
$Q_3$ is the median of the upper half, which is the $\frac{n_U+1}{2}$-th value.
$Q_3 = x_{( \frac{3+1}{2} )} = x_{(2)} = 18$.
*Explanation: We take the data points strictly greater than the median (12). For this subset, we find its median, which is 18.*

**Step 5: Calculate the Interquartile Range (IQR)**
$IQR = Q_3 - Q_1$
$IQR = 18 - 7 = 11$.
*Explanation: This value tells us the spread of the middle 50% of our data.*

**Step 6: Identify Potential Outliers**
Lower Fence $= Q_1 - 1.5 \times IQR = 7 - (1.5 \times 11) = 7 - 16.5 = -9.5$.
Upper Fence $= Q_3 + 1.5 \times IQR = 18 + (1.5 \times 11) = 18 + 16.5 = 34.5$.
Check data points:
All data points $[5, 7, 9, 12, 15, 18, 20]$ are between $-9.5$ and $34.5$.
Therefore, there are no outliers.
*Explanation: We establish boundaries using the IQR. Any data point outside these boundaries is flagged as an outlier. In this case, all our data points are within the acceptable range.*

**Step 7: Construct the Box-and-Whisker Plot**
Minimum value (non-outlier) = $5$.
Maximum value (non-outlier) = $20$.
The five-number summary is: Min=$5$, Q1=$7$, Q2=$12$, Q3=$18$, Max=$20$.
The box will extend from $7$ to $18$, with a line at $12$.
The lower whisker will extend from $7$ to $5$.
The upper whisker will extend from $18$ to $20$.
There are no individual outlier points.

**Final Answer:**
The five-number summary is: Min = 5, Q1 = 7, Q2 = 12, Q3 = 18, Max = 20.
IQR = 11.
No outliers.
The box plot will have a box from 7 to 18, with a median line at 12. Whiskers will extend to 5 (lower) and 20 (upper).

*Reflection:* This example was straightforward because the dataset was small, had an odd number of points, and no outliers. The key challenge here is correctly identifying the "halves" for Q1 and Q3 when the median is a single data point.

---

### Example 2: Moderate dataset, even $n$, no outliers

**Problem:** Construct a box-and-whisker plot for the following dataset representing daily temperatures in Celsius: $[18, 22, 15, 20, 25, 19, 23, 17, 21, 16]$

**What's given:** A set of 10 quantitative data points.
**What we want:** The five-number summary, IQR, outlier fences, and a description of the box plot.

**Step 1: Order the Data**
Given data: $[18, 22, 15, 20, 25, 19, 23, 17, 21, 16]$
Sorted data: $[15, 16, 17, 18, 19, 20, 21, 22, 23, 25]$
*Explanation: Sorting is always the first step to organize the data.*

**Step 2: Find the Median (Q2)**
Number of data points $n=10$ (even).
The median is the average of the $\frac{n}{2}$-th and $(\frac{n}{2}+1)$-th values.
$Q_2 = \frac{x_{(10/2)} + x_{(10/2 + 1)}}{2} = \frac{x_{(5)} + x_{(6)}}{2} = \frac{19 + 20}{2} = \frac{39}{2} = 19.5$.
*Explanation: Since there's an even number of points, the median falls between the 5th and 6th values. We average them.*

**Step 3: Find the First Quartile (Q1)**
The lower half of the data (all points up to $x_{(n/2)}$) is: $[15, 16, 17, 18, 19]$.
Number of points in lower half $n_L = 5$ (odd).
$Q_1$ is the median of the lower half, which is the $\frac{n_L+1}{2}$-th value.
$Q_1 = x_{( \frac{5+1}{2} )} = x_{(3)} = 17$.
*Explanation: The lower half consists of the first 5 data points. The median of these 5 points is the 3rd one, which is 17.*

**Step 4: Find the Third Quartile (Q3)**
The upper half of the data (all points from $x_{(n/2+1)}$ onwards) is: $[20, 21, 22, 23, 25]$.
Number of points in upper half $n_U = 5$ (odd).
$Q_3$ is the median of the upper half, which is the $\frac{n_U+1}{2}$-th value.
$Q_3 = x_{( \frac{5+1}{2} )} = x_{(3)} = 22$.
*Explanation: The upper half consists of the last 5 data points. The median of these 5 points is the 3rd one (relative to this subset), which is 22.*

**Step 5: Calculate the Interquartile Range (IQR)**
$IQR = Q_3 - Q_1$
$IQR = 22 - 17 = 5$.
*Explanation: The middle 50% of the daily temperatures spans 5 degrees Celsius.*

**Step 6: Identify Potential Outliers**
Lower Fence $= Q_1 - 1.5 \times IQR = 17 - (1.5 \times 5) = 17 - 7.5 = 9.5$.
Upper Fence $= Q_3 + 1.5 \times IQR = 22 + (1.5 \times 5) = 22 + 7.5 = 29.5$.
Check data points:
All data points $[15, 16, 17, 18, 19, 20, 21, 22, 23, 25]$ are between $9.5$ and $29.5$.
Therefore, there are no outliers.
*Explanation: No temperatures are unusually cold or hot based on our outlier criteria.*

**Step 7: Construct the Box-and-Whisker Plot**
Minimum value (non-outlier) = $15$.
Maximum value (non-outlier) = $25$.
The five-number summary is: Min=$15$, Q1=$17$, Q2=$19.5$, Q3=$22$, Max=$25$.
The box will extend from $17$ to $22$, with a line at $19.5$.
The lower whisker will extend from $17$ to $15$.
The upper whisker will extend from $22$ to $25$.
There are no individual outlier points.

**Final Answer:**
The five-number summary is: Min = 15, Q1 = 17, Q2 = 19.5, Q3 = 22, Max = 25.
IQR = 5.
No outliers.
The box plot will have a box from 17 to 22, with a median line at 19.5. Whiskers will extend to 15 (lower) and 25 (upper).

*Reflection:* This example involved an even number of data points, which required averaging for the median. The calculation of Q1 and Q3 was simpler here because the split into halves was exact, with no single median point to exclude.

---

### Example 3: Larger dataset, with outliers

**Problem:** Construct a box-and-whisker plot for the following dataset representing student test scores: $[65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 100, 40, 110]$

**What's given:** A set of 15 quantitative data points.
**What we want:** The five-number summary, IQR, outlier fences, identify outliers, and a description of the box plot.

**Step 1: Order the Data**
Given data: $[65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 100, 40, 110]$
Sorted data: $[40, 65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 100, 110]$
*Explanation: Always start by putting the data in ascending order.*

**Step 2: Find the Median (Q2)**
Number of data points $n=15$ (odd).
$Q_2 = x_{(\frac{15+1}{2})} = x_{(8)} = 82$.
*Explanation: The 8th value is the middle point, with 7 values below and 7 values above.*

**Step 3: Find the First Quartile (Q1)**
The lower half of the data (excluding $Q_2=82$) is: $[40, 65, 70, 72, 75, 78, 80]$.
Number of points in lower half $n_L = 7$ (odd).
$Q_1 = x_{( \frac{7+1}{2} )} = x_{(4)} = 72$.
*Explanation: The median of the lower 7 points is the 4th point, which is 72.*

**Step 4: Find the Third Quartile (Q3)**
The upper half of the data (excluding $Q_2=82$) is: $[85, 88, 90, 92, 95, 100, 110]$.
Number of points in upper half $n_U = 7$ (odd).
$Q_3 = x_{( \frac{7+1}{2} )} = x_{(4)} = 92$.
*Explanation: The median of the upper 7 points is the 4th point (relative to this subset), which is 92.*

**Step 5: Calculate the Interquartile Range (IQR)**
$IQR = Q_3 - Q_1$
$IQR = 92 - 72 = 20$.
*Explanation: The middle 50% of test scores spans 20 points.*

**Step 6: Identify Potential Outliers**
Lower Fence $= Q_1 - 1.5 \times IQR = 72 - (1.5 \times 20) = 72 - 30 = 42$.
Upper Fence $= Q_3 + 1.5 \times IQR = 92 + (1.5 \times 20) = 92 + 30 = 122$.
Check data points against fences:
*   $40 < 42$ $\Rightarrow$ $40$ is an outlier.
*   $110 < 122$ $\Rightarrow$ $110$ is NOT an outlier.
*   All other data points are between $42$ and $122$.
Outlier(s): $40$.
*Explanation: We calculate the fences. Any score below 42 or above 122 is an outlier. The score 40 falls below the lower fence, so it's an outlier. The score 110 is within the upper fence, so it's not considered an outlier by this definition.*

**Step 7: Construct the Box-and-Whisker Plot**
Minimum non-outlier value: The smallest value in the dataset that is NOT an outlier. This is $65$ (since $40$ is an outlier).
Maximum non-outlier value: The largest value in the dataset that is NOT an outlier. This is $110$.
The five-number summary (for the plot components) is: Min non-outlier=$65$, Q1=$72$, Q2=$82$, Q3=$92$, Max non-outlier=$110$.
The box will extend from $72$ to $92$, with a line at $82$.
The lower whisker will extend from $72$ to $65$.
The upper whisker will extend from $92$ to $110$.
An individual point will be plotted at $40$ to represent the outlier.

**Final Answer:**
The five-number summary (for plot components) is: Min (non-outlier) = 65, Q1 = 72, Q2 = 82, Q3 = 92, Max (non-outlier) = 110.
IQR = 20.
Outlier(s): 40.
The box plot will have a box from 72 to 92, with a median line at 82. Whiskers will extend to 65 (lower) and 110 (upper). An outlier point will be marked at 40.

*Reflection:* This example introduced an outlier, which is a critical feature of box plots. It's important to remember that whiskers *do not* extend to outliers; instead, outliers are plotted separately. Also, identifying the minimum/maximum *non-outlier* for the whiskers is crucial.

---

### Example 4: Dataset with repeated values and edge cases for quartile calculation

**Problem:** Construct a box-and-whisker plot for the following dataset: $[1, 2, 2, 3, 4, 4, 4, 5, 6, 7, 8, 8, 9, 10]$

**What's given:** A set of 14 quantitative data points with repeated values.
**What we want:** The five-number summary, IQR, outlier fences, identify outliers, and a description of the box plot.

**Step 1: Order the Data**
The data is already sorted: $[1, 2, 2, 3, 4, 4, 4, 5, 6, 7, 8, 8, 9, 10]$
*Explanation: Data must always be ordered first.*

**Step 2: Find the Median (Q2)**
Number of data points $n=14$ (even).
$Q_2 = \frac{x_{(14/2)} + x_{(14/2 + 1)}}{2} = \frac{x_{(7)} + x_{(8)}}{2} = \frac{4 + 5}{2} = \frac{9}{2} = 4.5$.
*Explanation: With an even number of points, the median is the average of the two middle values (7th and 8th).*

**Step 3: Find the First Quartile (Q1)**
The lower half of the data (all points up to $x_{(n/2)}$) is: $[1, 2, 2, 3, 4, 4, 4]$.
Number of points in lower half $n_L = 7$ (odd).
$Q_1$ is the median of the lower half, which is the $\frac{n_L+1}{2}$-th value.
$Q_1 = x_{( \frac{7+1}{2} )} = x_{(4)} = 3$.
*Explanation: The lower half has 7 points. The median of these is the 4th point, which is 3.*

**Step 4: Find the Third Quartile (Q3)**
The upper half of the data (all points from $x_{(n/2+1)}$ onwards) is: $[5, 6, 7, 8, 8, 9, 10]$.
Number of points in upper half $n_U = 7$ (odd).
$Q_3$ is the median of the upper half, which is the $\frac{n_U+1}{2}$-th value.
$Q_3 = x_{( \frac{7+1}{2} )} = x_{(4)} = 8$.
*Explanation: The upper half also has 7 points. The median of these is the 4th point (relative to this subset), which is 8.*

**Step 5: Calculate the Interquartile Range (IQR)**
$IQR = Q_3 - Q_1$
$IQR = 8 - 3 = 5$.
*Explanation: The spread of the middle 50% of the data is 5 units.*

**Step 6: Identify Potential Outliers**
Lower Fence $= Q_1 - 1.5 \times IQR = 3 - (1.5 \times 5) = 3 - 7.5 = -4.5$.
Upper Fence $= Q_3 + 1.5 \times IQR = 8 + (1.5 \times 5) = 8 + 7.5 = 15.5$.
Check data points:
All data points $[1, 2, 2, 3, 4, 4, 4, 5, 6, 7, 8, 8, 9, 10]$ are between $-4.5$ and $15.5$.
Therefore, there are no outliers.
*Explanation: All data points fall within the calculated fences, so no outliers are detected by this criterion.*

**Step 7: Construct the Box-and-Whisker Plot**
Minimum value (non-outlier) = $1$.
Maximum value (non-outlier) = $10$.
The five-number summary is: Min=$1$, Q1=$3$, Q2=$4.5$, Q3=$8$, Max=$10$.
The box will extend from $3$ to $8$, with a line at $4.5$.
The lower whisker will extend from $3$ to $1$.
The upper whisker will extend from $8$ to $10$.
There are no individual outlier points.

**Final Answer:**
The five-number summary is: Min = 1, Q1 = 3, Q2 = 4.5, Q3 = 8, Max = 10.
IQR = 5.
No outliers.
The box plot will have a box from 3 to 8, with a median line at 4.5. Whiskers will extend to 1 (lower) and 10 (upper).

*Reflection:* This example highlighted how to handle datasets with repeated values, which doesn't change the core process but can sometimes make it feel less intuitive. The even number of data points for the full dataset, but odd number for the halves, is a common scenario that reinforces the method of finding the median of the respective halves.

---

## 6. Common mistakes and traps

1.  **Not Sorting the Data:** This is the most fundamental mistake. All quartile calculations depend on the data being in ascending order. Forgetting to sort or sorting incorrectly will lead to entirely wrong results.
2.  **Incorrect Median Calculation for Even $n$:** When the number of data points ($n$) is even, the median is the average of the two middle values. Students sometimes pick just one of them or make an arithmetic error in averaging.
3.  **Inconsistent Quartile Calculation Methods:** There are several slightly different conventions for calculating quartiles (e.g., inclusive vs. exclusive median for odd $n$, or using interpolation formulas). This lesson uses the "Tukey's hinges" method (median-exclusive for odd $n$). If you switch between methods (or use software that uses a different one), your Q1 and Q3 values might differ slightly, leading to confusion. Stick to one method.
4.  **Incorrectly Defining Lower/Upper Halves for Q1/Q3:**
    *   For odd $n$: The median ($Q_2$) should typically be *excluded* from both the lower and upper halves when calculating $Q_1$ and $Q_3$.
    *   For even $n$: The dataset is split exactly in half, and the median is not explicitly part of either half (as it's an average).
    Misinterpreting these rules will lead to incorrect quartile values.
5.  **Drawing Whiskers to Absolute Min/Max When Outliers Are Present:** A crucial rule for box plots is that whiskers extend only to the *most extreme non-outlier* data points. Outliers are plotted as individual points beyond the whiskers. Extending a whisker to an outlier defeats the purpose of identifying outliers visually.
6.  **Confusing IQR with Range:** The Interquartile Range ($Q_3 - Q_1$) represents the spread of the middle 50% of the data. The full range (Max - Min) represents the spread of 100% of the data. They are distinct measures and serve different purposes.

## 7. Textbook-precise explanation

A **box-and-whisker plot**, or **box plot**, is a standardized way of displaying the distribution of a dataset based on its five-number summary: the minimum value, the first quartile ($Q_1$), the median ($Q_2$), the third quartile ($Q_3$), and the maximum value. It also visually identifies potential outliers.

Let $X = \{x_1, x_2, \ldots, x_n\}$ be a dataset of $n$ quantitative observations.

1.  **Ordered Data:** First, the data must be sorted in ascending order: $x_{(1)} \le x_{(2)} \le \ldots \le x_{(n)}$.
    *   The **minimum value** is $x_{(1)}$.
    *   The **maximum value** is $x_{(n)}$.

2.  **Median ($Q_2$):** The median is the value that divides the ordered dataset into two equal halves. It is also known as the 50th percentile.
    *   If $n$ is odd, $Q_2 = x_{(\frac{n+1}{2})}$.
    *   If $n$ is even, $Q_2 = \frac{x_{(\frac{n}{2})} + x_{(\frac{n}{2}+1)}}{2}$.

3.  **First Quartile ($Q_1$):** The first quartile is the median of the lower half of the data. It is also known as the 25th percentile.
    *   If $n$ is odd, the lower half consists of the $n_L = \frac{n-1}{2}$ data points below $Q_2$: $\{x_{(1)}, \ldots, x_{(\frac{n-1}{2})}\}$. $Q_1$ is the median of this sub-dataset.
    *   If $n$ is even, the lower half consists of the $n_L = \frac{n}{2}$ data points: $\{x_{(1)}, \ldots, x_{(\frac{n}{2})}\}$. $Q_1$ is the median of this sub-dataset.
    *(Note: This method, often attributed to Tukey, excludes the median $Q_2$ from the halves when $n$ is odd. Other methods exist, such as those used by some software packages like Excel's `PERCENTILE.INC` which might interpolate or include $Q_2$ in the halves.)*

4.  **Third Quartile ($Q_3$):** The third quartile is the median of the upper half of the data. It is also known as the 75th percentile.
    *   If $n$ is odd, the upper half consists of the $n_U = \frac{n-1}{2}$ data points above $Q_2$: $\{x_{(\frac{n+3}{2})}, \ldots, x_{(n)}\}$. $Q_3$ is the median of this sub-dataset.
    *   If $n$ is even, the upper half consists of the $n_U = \frac{n}{2}$ data points: $\{x_{(\frac{n}{2}+1)}, \ldots, x_{(n)}\}$. $Q_3$ is the median of this sub-dataset.

5.  **Interquartile Range (IQR):** The IQR is a measure of statistical dispersion, representing the range of the middle 50% of the data.
    $$IQR = Q_3 - Q_1$$

6.  **Outlier Fences and Outliers:** Potential outliers are identified using the IQR.
    *   **Lower Fence:** $LF = Q_1 - 1.5 \cdot IQR$
    *   **Upper Fence:** $UF = Q_3 + 1.5 \cdot IQR$
    Any data point $x$ such that $x < LF$ or $x > UF$ is considered a **potential outlier**.

7.  **Construction of the Box Plot:**
    *   A rectangular box is drawn from $Q_1$ to $Q_3$. The width of the box is $IQR$.
    *   A line is drawn inside the box at $Q_2$ (the median).
    *   "Whiskers" extend from the box. The lower whisker extends from $Q_1$ to the smallest data point that is greater than or equal to $LF$. The upper whisker extends from $Q_3$ to the largest data point that is less than or equal to $UF$.
    *   All data points that fall outside the fences (i.e., potential outliers) are plotted individually as separate points (e.g., circles or asterisks) beyond the whiskers.

Box plots are particularly useful for comparing distributions between several groups or datasets side-by-side, as they clearly show central tendency, spread, skewness, and the presence of outliers.

*(Refer to: Devore, Jay L. *Probability and Statistics for Engineering and the Sciences*. Cengage Learning, 9th ed., Chapter 2. Or, Freedman, David, Robert Pisani, and Roger Purves. *Statistics*. W. W. Norton & Company, 4th ed., Chapter 3.)*

## 8. ASCII diagrams

Here's an ASCII diagram of a typical box-and-whisker plot. This plot assumes a dataset with a lower outlier and an upper outlier.

```text
       Min. Non-Outlier           Max. Non-Outlier
               |----------------------|
               |                      |
      Outlier  *                      * Outlier
               |                      |
    <----------|----------|----------|---------->
   Number Line 0          5         10         15

                       +-----+
                       |     |
                 +-----|-----|-----+
                 |     |     |     |
                 |-----|-----|-----|-----|
                 |  Q1 |  Q2 |  Q3 |
                 +-----+-----+-----+
                       |     |
                       |-----|
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       |     |
                       