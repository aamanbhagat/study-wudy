## 1. What it is — in plain English

Imagine you have a set of rules for something. A simple inequality is just one rule. For example, "you must be taller than 140 cm to ride this roller coaster" is an inequality ($Height > 140$). Or, "the temperature must be below 0 degrees Celsius for the water to freeze" ($Temperature < 0$). These are single conditions.

A **compound inequality** is when you combine two or more of these rules using the words "AND" or "OR". It's like having multiple conditions that need to be met, or multiple acceptable options.

When we say "AND," it means *both* rules must be true at the same time. Think of it like a strict bouncer at a club: you need to be *both* over 18 *and* have a valid ID. If either condition isn't met, you're not getting in. The solution to an "AND" inequality is the numbers that satisfy every single rule involved.

When we say "OR," it means *at least one* of the rules must be true. This is more flexible. Think of it like a discount offer: you get 10% off if you *either* spend over $50 *or* buy two specific items. You don't need to do both, just one of them is enough to qualify. The solution to an "OR" inequality includes all numbers that satisfy any of the rules.

## 2. Why it matters — real-world applications

Compound inequalities are fundamental because the real world rarely operates on a single condition. Most systems and decisions involve multiple constraints or alternatives.

1.  **Aerospace Engineering (Launch Windows):** When launching a rocket, there isn't just one condition for a successful launch. Engineers must consider a "launch window" defined by multiple factors. For example, the wind speed must be *between* 10 km/h and 50 km/h ($10 < WindSpeed < 50$), *AND* the cloud cover must be *less than* 70% ($CloudCover < 70\%$), *AND* the target satellite must be *within* a specific orbital alignment range. All these "AND" conditions must be met simultaneously for the launch to proceed safely and effectively.

2.  **Machine Learning (Data Filtering and Classification):** In data analysis and machine learning, you often need to filter data points based on multiple criteria. For instance, a financial model might only consider transactions where the amount is *greater than* $1000 ($Amount > 1000$) *AND* the transaction type is "fraudulent" ($Type = \text{"fraudulent"}$), *OR* where the user's risk score is *above* 0.8 ($RiskScore > 0.8$). This helps in isolating specific subsets of data for training or anomaly detection.

3.  **Physics and Material Science (Operating Conditions):** Many materials and systems have specific operating ranges. A certain alloy might maintain its structural integrity only if the temperature is *between* $-20^\circ C$ and $150^\circ C$ ($-20 \le T \le 150$) *AND* the applied pressure is *below* 500 kPa ($P < 500$). Exceeding any of these "AND" conditions could lead to material failure. Conversely, a sensor might activate if the light intensity is *below* 10 lux ($Light < 10$) *OR* the motion detector is triggered ($Motion = \text{true}$).

4.  **Finance (Loan Eligibility):** Banks use compound inequalities to determine eligibility for loans or credit cards. A customer might qualify if their credit score is *above* 700 ($CreditScore > 700$) *AND* their annual income is *at least* $50,000 ($Income \ge 50000$). Alternatively, they might qualify if their credit score is *above* 750 ($CreditScore > 750$) *OR* they have a co-signer with excellent credit.

## 3. Prerequisites — what you must know first

Before diving into compound inequalities, ensure you have a solid grasp of these foundational concepts:

*   **Basic Inequalities:** Understanding the meaning of $<, >, \le, \ge$ and how to interpret statements like $x < 5$ or $y \ge -2$.
*   **Solving Linear Inequalities:** The ability to isolate a variable in an inequality, including the crucial rule about flipping the inequality sign when multiplying or dividing by a negative number. (e.g., solving $2x - 3 > 7$ or $-4x \le 12$).
*   **Number Line Representation:** How to graphically represent the solution set of a simple inequality on a number line using open/closed circles and shading.
*   **Interval Notation:** How to express solution sets using parentheses and brackets (e.g., $(-\infty, 5)$ for $x < 5$, or $[-2, \infty)$ for $y \ge -2$).
*   **Basic Set Theory (Implicit):** An intuitive understanding of intersection (overlap) and union (combination) of sets, which are the underlying concepts for "AND" and "OR" respectively.

## 4. The core idea — step by step

Let's break down the concept of compound inequalities, building from simple ideas to the more complex.

### Step 1: Review Simple Inequalities

A simple inequality is a statement comparing two expressions, indicating that one is greater than, less than, greater than or equal to, or less than or equal to the other.

*   **Plain-English Statement:** It's a single rule that defines a range of numbers.
*   **Small Concrete Example:** "Numbers greater than 3."
*   **Formal/Mathematical Version:** $x > 3$.
    *   On a number line, this is represented by an open circle at 3 and shading to the right.
    *   In interval notation: $(3, \infty)$.
*   **What Could Go Wrong:** Forgetting that an open circle and parenthesis mean "not including the number," while a closed circle and bracket mean "including the number."

### Step 2: Understanding "AND" (Conjunction)

When two inequalities are joined by "AND," it means that a number must satisfy *both* conditions simultaneously. The solution set is the overlap or intersection of the individual solution sets.

*   **Plain-English Statement:** "Both rules must be true at the same time." Think of it as finding the common ground between two sets of numbers.
*   **Small Concrete Example:** "Numbers greater than 2 AND numbers less than 7."
    *   Numbers like 3, 4, 5, 6 satisfy both.
    *   Numbers like 1 (not > 2) or 8 (not < 7) do not.
*   **Formal/Mathematical Version:** $x > 2 \text{ AND } x < 7$.
    *   This can often be written as a single "sandwiched" inequality: $2 < x < 7$.
    *   In interval notation: $(2, 7)$.
*   **What Could Go Wrong:** Mistakenly including numbers that satisfy only one of the conditions. For example, thinking $x=1$ is a solution because it's less than 7, even though it's not greater than 2.

### Step 3: Understanding "OR" (Disjunction)

When two inequalities are joined by "OR," it means that a number must satisfy *at least one* of the conditions. The solution set is the combination or union of the individual solution sets.

*   **Plain-English Statement:** "At least one of the rules must be true." Think of it as gathering all numbers that fit either description.
*   **Small Concrete Example:** "Numbers less than 2 OR numbers greater than 7."
    *   Numbers like 0, 1 satisfy $x < 2$.
    *   Numbers like 8, 9 satisfy $x > 7$.
    *   Numbers like 4, 5, 6 satisfy neither and are *not* solutions.
*   **Formal/Mathematical Version:** $x < 2 \text{ OR } x > 7$.
    *   In interval notation, we use the union symbol: $(-\infty, 2) \cup (7, \infty)$.
*   **What Could Go Wrong:** Excluding numbers that satisfy only one condition, or incorrectly thinking there must be an overlap. For example, thinking $x=0$ isn't a solution because it's not greater than 7.

### Step 4: Solving "AND" Inequalities

To solve a compound inequality with "AND," you solve each simple inequality separately and then find the intersection of their solution sets.

*   **Plain-English Statement:** Break it into two separate problems, solve each, then look for where their solutions overlap on the number line.
*   **Small Concrete Example:** Solve $2x - 1 < 5 \text{ AND } x + 3 \ge 4$.
    *   First inequality: $2x - 1 < 5 \implies 2x < 6 \implies x < 3$.
    *   Second inequality: $x + 3 \ge 4 \implies x \ge 1$.
    *   Intersection: Numbers that are both less than 3 AND greater than or equal to 1. This is $1 \le x < 3$.
    *   Interval notation: $[1, 3)$.
*   **What Could Go Wrong:**
    *   If the individual solution sets have no overlap (e.g., $x < 1$ AND $x > 5$), the solution is "no solution" or the empty set ($\emptyset$).
    *   Incorrectly combining the two solutions if they are not "sandwiched" nicely. Always graph on a number line to visualize the intersection.

### Step 5: Solving "OR" Inequalities

To solve a compound inequality with "OR," you solve each simple inequality separately and then combine their solution sets (find their union).

*   **Plain-English Statement:** Break it into two separate problems, solve each, then combine all numbers that are part of *either* solution.
*   **Small Concrete Example:** Solve $3x + 2 < -1 \text{ OR } x - 5 \ge 0$.
    *   First inequality: $3x + 2 < -1 \implies 3x < -3 \implies x < -1$.
    *   Second inequality: $x - 5 \ge 0 \implies x \ge 5$.
    *   Union: Numbers that are less than -1 OR greater than or equal to 5.
    *   Interval notation: $(-\infty, -1) \cup [5, \infty)$.
*   **What Could Go Wrong:**
    *   If the individual solution sets overlap completely (e.g., $x < 5$ OR $x > 1$), the union might cover all real numbers. Don't assume disjoint intervals.
    *   Forgetting to use the union symbol ($\cup$) in interval notation when the solution consists of two separate regions.

### Step 6: Representing Solutions on a Number Line and in Interval Notation

Once you've solved a compound inequality, it's crucial to represent the solution clearly.

*   **Plain-English Statement:** Draw a picture of the solution on a number line, and write it concisely using mathematical symbols.
*   **Small Concrete Example:**
    *   For $1 \le x < 3$: Draw a closed circle at 1, an open circle at 3, and shade the region between them. Interval: $[1, 3)$.
    *   For $x < -1 \text{ OR } x \ge 5$: Draw an open circle at -1 and shade left. Draw a closed circle at 5 and shade right. Interval: $(-\infty, -1) \cup [5, \infty)$.
*   **Formal/Mathematical Version:** Use standard number line conventions (open/closed circles, shading) and interval notation (parentheses for exclusive endpoints, brackets for inclusive endpoints, $\cup$ for union, $\infty$ for infinity).
*   **What Could Go Wrong:** Mixing up open/closed circles with parentheses/brackets. Forgetting that $\infty$ and $-\infty$ *always* get parentheses.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify your understanding.

### Example 1: Simple "AND" (Sandwiched Inequality)

**Problem:** Solve the compound inequality $-3 \le 2x + 5 < 11$. Express the solution in interval notation and graph it on a number line.

**What's Given:** A compound inequality where $2x+5$ is "sandwiched" between $-3$ (inclusive) and $11$ (exclusive). This implicitly means "$2x+5 \ge -3$ AND $2x+5 < 11$".
**What We Want:** The range of $x$ values that satisfy both conditions, expressed as an interval and a graph.

**Solution:**

$$ -3 \le 2x + 5 < 11 $$

We can solve this type of "AND" inequality by performing operations on all three parts simultaneously.

$$ -3 - 5 \le 2x + 5 - 5 < 11 - 5 $$
This step subtracts 5 from all three parts of the inequality. This keeps the inequality balanced and helps isolate the term with $x$.

$$ -8 \le 2x < 6 $$
This is the simplified inequality after subtracting 5.

$$ \frac{-8}{2} \le \frac{2x}{2} < \frac{6}{2} $$
This step divides all three parts by 2. Since 2 is a positive number, the inequality signs do not flip. This isolates $x$.

$$ -4 \le x < 3 $$
This is the solution for $x$. It means $x$ must be greater than or equal to $-4$ AND less than $3$.

**Interval Notation:** $[-4, 3)$

**Number Line Graph:**
```text
<----------------------------------------------------------------->
  -5     -4     -3     -2     -1      0      1      2      3      4      5
         ●==================================================o
```
(Closed circle at -4, open circle at 3, shaded region between them)

**Reflection:** This example demonstrates the most common way "AND" inequalities appear – in a compact, three-part form. The key is to apply operations to all parts simultaneously.

### Example 2: "AND" with Separate Solutions

**Problem:** Solve $4x - 5 < 7 \text{ AND } -2x + 3 \le -5$. Express the solution in interval notation and graph it on a number line.

**What's Given:** Two separate inequalities connected by "AND".
**What We Want:** The values of $x$ that satisfy *both* inequalities.

**Solution:**

First, solve the left inequality:
$$ 4x - 5 < 7 $$
$$ 4x - 5 + 5 < 7 + 5 $$
Add 5 to both sides to isolate the $4x$ term.

$$ 4x < 12 $$
$$ \frac{4x}{4} < \frac{12}{4} $$
Divide both sides by 4. Since 4 is positive, the inequality sign remains the same.

$$ x < 3 $$
This is the solution for the first inequality. In interval notation: $(-\infty, 3)$.

Next, solve the right inequality:
$$ -2x + 3 \le -5 $$
$$ -2x + 3 - 3 \le -5 - 3 $$
Subtract 3 from both sides to isolate the $-2x$ term.

$$ -2x \le -8 $$
$$ \frac{-2x}{-2} \ge \frac{-8}{-2} $$
Divide both sides by -2. **Crucially, since we are dividing by a negative number, we must flip the inequality sign.**

$$ x \ge 4 $$
This is the solution for the second inequality. In interval notation: $[4, \infty)$.

Now, combine the solutions using "AND". We need $x < 3$ AND $x \ge 4$.
Let's visualize this on a number line:
For $x < 3$:
```text
<----------------------------------------------------------------->
  0      1      2      3      4      5      6      7      8
========o
```
For $x \ge 4$:
```text
<----------------------------------------------------------------->
  0      1      2      3      4      5      6      7      8
                       ●=========================================>
```
Where do these two shaded regions overlap? They don't! There is no number that is simultaneously less than 3 and greater than or equal to 4.

**Interval Notation:** $\emptyset$ (empty set) or "No Solution"

**Number Line Graph:**
```text
<----------------------------------------------------------------->
  0      1      2      3      4      5      6      7      8
         (no overlap)
```

**Reflection:** This example highlights that "AND" inequalities don't always have a solution. If the individual solution sets do not intersect, the compound inequality has no solution. Always visualize on a number line to confirm.

### Example 3: "OR" with Disjoint Solutions

**Problem:** Solve $5x + 1 < -9 \text{ OR } 2x - 3 \ge 7$. Express the solution in interval notation and graph it on a number line.

**What's Given:** Two separate inequalities connected by "OR".
**What We Want:** The values of $x$ that satisfy *at least one* of the inequalities.

**Solution:**

First, solve the left inequality:
$$ 5x + 1 < -9 $$
$$ 5x + 1 - 1 < -9 - 1 $$
Subtract 1 from both sides.

$$ 5x < -10 $$
$$ \frac{5x}{5} < \frac{-10}{5} $$
Divide both sides by 5. Since 5 is positive, the inequality sign remains the same.

$$ x < -2 $$
This is the solution for the first inequality. In interval notation: $(-\infty, -2)$.

Next, solve the right inequality:
$$ 2x - 3 \ge 7 $$
$$ 2x - 3 + 3 \ge 7 + 3 $$
Add 3 to both sides.

$$ 2x \ge 10 $$
$$ \frac{2x}{2} \ge \frac{10}{2} $$
Divide both sides by 2. Since 2 is positive, the inequality sign remains the same.

$$ x \ge 5 $$
This is the solution for the second inequality. In interval notation: $[5, \infty)$.

Now, combine the solutions using "OR". We need $x < -2$ OR $x \ge 5$.
This means any number that is less than -2 is a solution, and any number that is greater than or equal to 5 is a solution.

**Interval Notation:** $(-\infty, -2) \cup [5, \infty)$

**Number Line Graph:**
```text
<----------------------------------------------------------------->
  -4     -3     -2     -1      0      1      2      3      4      5      6
========o                                                ●=================>
```
(Open circle at -2, shaded left; Closed circle at 5, shaded right)

**Reflection:** This example demonstrates a typical "OR" scenario where the solution consists of two separate, disjoint intervals. The union symbol ($\cup$) is essential to connect them.

### Example 4: "OR" with Overlapping Solutions (All Real Numbers)

**Problem:** Solve $x + 2 < 5 \text{ OR } x - 1 > -3$. Express the solution in interval notation and graph it on a number line.

**What's Given:** Two separate inequalities connected by "OR".
**What We Want:** The values of $x$ that satisfy *at least one* of the inequalities.

**Solution:**

First, solve the left inequality:
$$ x + 2 < 5 $$
$$ x + 2 - 2 < 5 - 2 $$
Subtract 2 from both sides.

$$ x < 3 $$
This is the solution for the first inequality. In interval notation: $(-\infty, 3)$.

Next, solve the right inequality:
$$ x - 1 > -3 $$
$$ x - 1 + 1 > -3 + 1 $$
Add 1 to both sides.

$$ x > -2 $$
This is the solution for the second inequality. In interval notation: $(-2, \infty)$.

Now, combine the solutions using "OR". We need $x < 3$ OR $x > -2$.
Let's visualize this on a number line:
For $x < 3$:
```text
<----------------------------------------------------------------->
  -3     -2     -1      0      1      2      3      4      5
========o--------------------------------------------------------
```
For $x > -2$:
```text
<----------------------------------------------------------------->
  -3     -2     -1      0      1      2      3      4      5
               o=================================================>
```
If we take the "union" (all numbers that satisfy *either* condition), we can see that the shaded regions completely cover the entire number line. For example, $x=0$ satisfies both. $x=-3$ satisfies $x<3$. $x=4$ satisfies $x>-2$. Any real number will satisfy at least one of these.

**Interval Notation:** $(-\infty, \infty)$ or $\mathbb{R}$ (all real numbers)

**Number Line Graph:**
```text
<=================================================================>
  -3     -2     -1      0      1      2      3      4      5
```
(The entire number line is shaded)

**Reflection:** This example shows that an "OR" inequality can sometimes result in the solution being all real numbers, especially when the individual solution sets significantly overlap or cover each other. It's crucial not to simply write the two intervals separately if their union forms a continuous range.

## 6. Common mistakes and traps

Students often stumble on compound inequalities due to a few recurring issues. Be vigilant for these:

1.  **Forgetting to Flip the Inequality Sign:** The most common error! When multiplying or dividing *both sides* of an inequality by a *negative number*, you **must** reverse the direction of the inequality sign. Forgetting this leads to entirely incorrect solution sets.
2.  **Confusing "AND" with "OR":** This is fundamental. "AND" means intersection (overlap), requiring *all* conditions to be true. "OR" means union (combination), requiring *at least one* condition to be true. Misinterpreting these logical connectors is a critical mistake.
3.  **Incorrectly Identifying Intersection/Union on the Number Line:** Even if the individual inequalities are solved correctly, students might misinterpret the graphical representation. For "AND," look *only* for where the shaded regions overlap. For "OR," shade *all* regions covered by *either* inequality.
4.  **Mistakes with Endpoints (Inclusive vs. Exclusive):** Confusing open circles/parentheses ($<, >$) with closed circles/brackets ($\le, \ge$). This affects whether the boundary numbers are included in the solution, which is crucial for interval notation. Remember $\infty$ and $-\infty$ always get parentheses.
5.  **Assuming an "AND" Inequality Always Has a Solution:** As seen in Example 2, if the individual solution sets of an "AND" compound inequality do not overlap, there is no solution ($\emptyset$). Don't force an answer.
6.  **Assuming an "OR" Inequality Always Results in Disjoint Intervals:** As seen in Example 4, if the individual solution sets of an "OR" compound inequality overlap extensively or cover each other, the union might be a single interval or even all real numbers. Don't automatically use the $\cup$ symbol if the combined region is continuous.

## 7. Textbook-precise explanation

A **compound inequality** is formed by combining two or more simple inequalities with the logical connectors "AND" (conjunction) or "OR" (disjunction).

Let $P(x)$ and $Q(x)$ be two inequality statements involving a variable $x$.

1.  **Conjunction ("AND"):**
    A compound inequality formed by "AND" is written as $P(x) \text{ AND } Q(x)$.
    The solution set for $P(x) \text{ AND } Q(x)$ is the set of all values of $x$ for which *both* $P(x)$ is true *and* $Q(x)$ is true.
    In set theory notation, if $S_1$ is the solution set for $P(x)$ and $S_2$ is the solution set for $Q(x)$, then the solution set for $P(x) \text{ AND } Q(x)$ is the **intersection** of $S_1$ and $S_2$, denoted as $S_1 \cap S_2$.
    This type of compound inequality can sometimes be written in a compact form, such as $a < x < b$, which implicitly means $x > a \text{ AND } x < b$.

2.  **Disjunction ("OR"):**
    A compound inequality formed by "OR" is written as $P(x) \text{ OR } Q(x)$.
    The solution set for $P(x) \text{ OR } Q(x)$ is the set of all values of $x$ for which *either* $P(x)$ is true *or* $Q(x)$ is true (or both).
    In set theory notation, if $S_1$ is the solution set for $P(x)$ and $S_2$ is the solution set for $Q(x)$, then the solution set for $P(x) \text{ OR } Q(x)$ is the **union** of $S_1$ and $S_2$, denoted as $S_1 \cup S_2$.

**Solving Procedure:**
To solve a compound inequality:
1.  Solve each simple inequality independently to find its individual solution set.
2.  If the inequalities are connected by "AND", find the intersection of the individual solution sets.
3.  If the inequalities are connected by "OR", find the union of the individual solution sets.
4.  Express the final solution using interval notation and/or by graphing on a number line.

**Example (Textbook Style):**
Consider the compound inequality $2x - 1 \le 3 \text{ AND } x + 4 > 1$.
1.  Solve $2x - 1 \le 3$:
    $2x \le 4 \implies x \le 2$. Solution set $S_1 = (-\infty, 2]$.
2.  Solve $x + 4 > 1$:
    $x > -3$. Solution set $S_2 = (-3, \infty)$.
3.  Since the connector is "AND", we find the intersection $S_1 \cap S_2$:
    $S_1 \cap S_2 = (-\infty, 2] \cap (-3, \infty) = (-3, 2]$.
    Thus, the solution is $-3 < x \le 2$.

(Refer to "Blitzer, Algebra for College Students, 9e, §2.6" or "Stewart, Precalculus, 7e, §1.5" for further reading on inequalities and interval notation.)

## 8. ASCII diagrams

Here are two ASCII diagrams illustrating "AND" and "OR" on a number line.

**1. "AND" (Intersection) Example: $x > 1 \text{ AND } x \le 5$**
(Solution: $1 < x \le 5$)

```text
Individual inequalities:
x > 1:
<-------------------o===============================================>
  0   1   2   3   4   5   6   7   8

x <= 5:
<===============================================●------------------->
  0   1   2   3   4   5   6   7   8

Combined Solution (AND - the overlap):
<-------------------o===========================●------------------->
  0   1   2   3   4   5   6   7   8
```
*Description:* The top line shows $x > 1$ with an open circle at 1 and shading to the right. The middle line shows $x \le 5$ with a closed circle at 5 and shading to the left. The bottom line, representing the "AND" solution, shows only the region where both are shaded: an open circle at 1, a closed circle at 5, and shading between them.

**2. "OR" (Union) Example: $x < 2 \text{ OR } x \ge 6$**
(Solution: $(-\infty, 2) \cup [6, \infty)$)

```text
Individual inequalities:
x < 2:
<===================o----------------------------------------------->
  0   1   2   3   4   5   6   7   8

x >= 6:
<-------------------------------------------------●=================>
  0   1   2   3   4   5   6   7   8

Combined Solution (OR - all shaded regions):
<===================o-----------------------------●=================>
  0   1   2   3   4   5   6   7   8
```
*Description:* The top line shows $x < 2$ with an open circle at 2 and shading to the left. The middle line shows $x \ge 6$ with a closed circle at 6 and shading to the right. The bottom line, representing the "OR" solution, shows all regions that were shaded in either of the top two lines: shading left from an open circle at 2, and shading right from a closed circle at 6, with a gap in between.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **"AND" is like a narrow bridge.** You need to be on *both* sides of the road to cross it. If you're not on the common path, you fall off. The solution is the *overlap* where both conditions are true.
    *   **"OR" is like a fork in the road.** You can choose *either* path to reach a destination. As long as you pick one, you're good. The solution includes *all* paths that satisfy *at least one* condition.

2.  **1-3 Formulas/Facts You MUST Overlearn:**
    *   **"AND" means Intersection ($\cap$)**: Find where the solutions *overlap*. If no overlap, then no solution ($\emptyset$).
    *   **"OR" means Union ($\cup$)**: Combine *all* parts of the individual solutions. If they connect or overlap, merge them into a single interval.
    *   **Flip the sign!** When multiplying or dividing *both sides* of an inequality by a *negative number*, you *must* reverse the inequality symbol ($< \leftrightarrow >, \le \leftrightarrow \ge$).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, work through all examples, and try 2-3 self-check questions.
    *   **Day 3:** Reread the "Core Idea" and "Common Mistakes" sections. Try 1-2 new self-check questions.
    *   **Day 7:** Quickly review the "Memory Technique" and "Textbook-Precise Explanation." Solve one challenging compound inequality problem.
    *   **Day 16:** Solve a mixed set of 2-3 compound inequalities (some AND, some OR, some with negative coefficients).
    *   **Day 35:** Without looking at notes, try to explain compound inequalities (AND/OR) to an imaginary friend. Then solve one complex problem and check your explanation against the lesson.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget how to handle compound inequalities, go back to the most basic logical definitions:
    *   What does "AND" truly mean in everyday language? "Both conditions must be met."
    *   What does "OR" truly mean? "At least one condition must be met."
    *   How do these translate to numbers on a line? If I have two sets of numbers, $A$ and $B$:
        *   For "AND," which numbers are in *both* $A$ *and* $B$? (This is the overlap/intersection).
        *   For "OR," which numbers are in $A$, or in $B$, or in both? (This is everything in $A$ combined with everything in $B$ / the union).
    *   Then, remember the fundamental rule of inequalities: they behave like equations, *except* for the sign flip when multiplying/dividing by a negative. This simple logical and mathematical foundation will allow you to rebuild the rules for solving compound inequalities.

## 10. Connections — what this leads to

Compound inequalities are a cornerstone concept that unlocks many advanced topics in mathematics and related fields:

1.  **Absolute Value Inequalities:** Solving inequalities involving absolute values (e.g., $|x-3| < 5$) almost always translates directly into a compound inequality. For instance, $|A| < B$ becomes $-B < A < B$ (an "AND" type), and $|A| > B$ becomes $A < -B \text{ OR } A > B$ (an "OR" type).
2.  **Domain and Range of Functions:** Determining the valid input (domain) or output (range) values for complex functions often involves compound inequalities. For example, a function might require the expression under a square root to be non-negative *AND* a denominator to be non-zero.
3.  **Piecewise Functions:** These functions are defined by different rules for different parts of their domain. The "pieces" are often defined using compound inequalities (e.g., $f(x) = x^2$ if $x < 0$, and $f(x) = x+1$ if $x \ge 0$).
4.  **Linear Programming:** In optimization problems, the "feasible region" (the set of all possible solutions) is defined by a system of linear inequalities, which are essentially multiple "AND" conditions that must all be satisfied.
5.  **Set Theory:** Compound inequalities provide a concrete, numerical context for understanding the abstract concepts of set intersection ($\cap$) and set union ($\cup$), which are fundamental in advanced mathematics.
6.  **Boolean Logic and Computer Science:** The logical operators "AND" and "OR" are direct counterparts to their use in programming and digital logic design. Understanding how they combine conditions in mathematics directly translates to how they combine conditions in code (e.g., `if (condition1 && condition2)` or `if (condition1 || condition2)`).
7.  **Calculus (Finding Intervals of Increase/Decrease, Concavity):** In calculus, you'll use inequalities to find intervals where a function is increasing or decreasing, or concave up/down, often resulting in compound inequalities for the solution.

## 11. Self-check questions

Solve each compound inequality, express the solution in interval notation, and sketch a graph on a number line. Do not provide answers.

1.  $3x - 2 \le 10 \text{ AND } x + 5 > 3$
2.  $-1 < 2x + 7 \le 15$
3.  $4 - x < 1 \text{ OR } 2x + 3 \ge 11$
4.  $5x + 1 \le -4 \text{ OR } -3x + 2 < 8$
5.  $x + 6 < 2 \text{ AND } -2x + 1 \le -5$