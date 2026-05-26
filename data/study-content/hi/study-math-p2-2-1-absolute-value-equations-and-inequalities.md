## 1. The one-sentence answer
**Absolute value equations and inequalities are statements that contain |x| and require you to find all x that make the statement true by considering the definition |x| = x when x ≥ 0 and |x| = −x when x < 0.**

The absolute value |x| simply measures distance on the number line from zero. When you write |x| = 5 you are saying “x is exactly 5 units away from zero,” which immediately gives two solutions. When the absolute value appears inside an inequality such as |x| < 5, you are restricting x to an interval around zero.

Because the expression inside the bars can itself be an algebraic expression, the same distance idea must be applied after isolating the absolute-value term. Once isolated, you split the problem into two cases or convert the inequality into a compound statement; both routes rest on the piecewise definition of absolute value.

> [!NOTE]
> The single most important “aha” is that every absolute-value equation or inequality is really two ordinary equations or inequalities glued together by the sign choice; solving them separately and then combining the solution sets is the entire method.

## 2. Why this matters — concrete and current
In GPS receivers the horizontal dilution of precision calculation uses absolute deviations |observed − predicted| to bound position error; manufacturers such as u-blox publish tolerance intervals that are solved exactly as absolute-value inequalities.

In semiconductor process control the critical-dimension uniformity spec is written |CD_measured − target| ≤ 2 nm; fabs convert these specs into linear inequalities before feeding them to statistical-process-control software.

In reinforcement-learning reward shaping, the “dead-zone” penalty |error| − ε when |error| > ε is an absolute-value expression; OpenAI’s PPO implementations clip gradients inside such zones to stabilise training.

In aerospace guidance the Apollo-era “velocity-to-be-gained” algorithm solved |v_desired − v_actual| = 0 at engine cutoff; modern SpaceX flight software still uses the same absolute-value termination logic inside the boost-back burn sequencer.

In audio engineering the LUFS loudness standard defines momentary loudness deviation as |L_k − L_target| ≤ 1 LU; mastering engineers solve these inequalities when setting dynamic-range compressors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear equations         | Absolute-value equations reduce to two linear equations   |
| Interval notation        | Solution sets of absolute-value inequalities are intervals|
| Number-line distance     | |x − a| is distance between x and a; needed for intuition |
| Sign charts / cases      | The definition of |·| changes at zero, forcing case splits |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Distance interpretation
Absolute value |x − a| equals the distance between x and a on the real line.  
Example: |x − 3| = 4 means x is 4 units from 3, so x = 7 or x = −1.  
Formal statement:  
$$|x - a| = d \quad (d > 0) \iff x = a + d \;\text{or}\; x = a - d.$$  
> [!WARNING] Treating |x − a| as a single algebraic term instead of two distances produces only one root and loses half the solution set.

### Step 2 — Case definition of absolute value
By definition  
$$|x| = \begin{cases} x & x \ge 0 \\ -x & x < 0 \end{cases}.$$  
Any equation |expression| = k therefore splits into expression = k and expression = −k.  
> [!WARNING] Forgetting to check the domain condition (x ≥ 0 or x < 0) after solving each case can admit extraneous roots.

### Step 3 — Isolation before splitting
Move every term not inside the bars to the opposite side until the absolute-value expression stands alone.  
Example: 2|x − 1| − 3 = 7 becomes |x − 1| = 5. Only then split.  
> [!WARNING] Splitting before isolation mixes constants with the absolute-value term and yields inconsistent equations.

### Step 4 — Compound inequality form
For |x − a| < d the solution is the single interval a − d < x < a + d.  
For |x − a| > d the solution is the union (−∞, a − d) ∪ (a + d, ∞).  
Formal:  
$$|x - a| < d \iff a - d < x < a + d.$$  
> [!WARNING] Reversing the inequality symbol when multiplying or dividing by a negative number inside a case is a frequent source of sign errors.

### Step 5 — Graphical verification
Graph y = |f(x)| and y = k; intersections give solutions. The V-shaped graph of |x| makes the two-branch behaviour visible at once.  
> [!WARNING] Relying solely on graphs without algebraic verification can miss exact boundary points when the graph is sketched by hand.

### Step 6 — General statement for any linear expression
Let f(x) = mx + c with m ≠ 0. Then  
$$|mx + c| = k \iff mx + c = k \;\text{or}\; mx + c = -k.$$  
Solving each linear equation and taking the union finishes the process. This is the textbook-grade procedure used in Sullivan, Algebra & Trigonometry, 11e, §2.6.

## 5. Worked examples — har step show karo

**Example 1 — Simple equation**  
*Given:* |x| = 7  
*Find:* all real x.  
Step 1: By definition, x = 7 or x = −7.  
*Why:* The distance from zero is 7 in both directions.  
**Final answer**  
x = 7 or x = −7

*Reflection:* The example is the base case; every later problem reduces to it after isolation.

**Example 2 — Equation with coefficient**  
*Given:* 3|x − 2| = 12  
*Find:* x.  
Step 1: Divide both sides by 3 → |x − 2| = 4.  
*Why:* Coefficient must be removed first.  
Step 2: Split → x − 2 = 4 or x − 2 = −4 → x = 6 or x = −2.  
**Final answer**  
x = 6 or x = −2

*Reflection:* Isolation before splitting is the only mechanical rule needed.

**Example 3 — Strict inequality**  
*Given:* |2x + 1| < 5  
*Find:* solution set.  
Step 1: −5 < 2x + 1 < 5.  
*Why:* Compound form replaces two separate cases.  
Step 2: Subtract 1 → −6 < 2x < 4.  
Step 3: Divide by 2 → −3 < x < 2.  
**Final answer**  
−3 < x < 2

*Reflection:* The interval is centred at the root of the inner expression.

**Example 4 — Non-strict inequality with union**  
*Given:* |x − 4| ≥ 3  
*Find:* solution set.  
Step 1: x − 4 ≤ −3 or x − 4 ≥ 3.  
Step 2: x ≤ 1 or x ≥ 7.  
**Final answer**  
(−∞, 1] ∪ [7, ∞)

*Reflection:* The solution is two unbounded rays; students often forget to include the endpoints when equality is allowed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Solving only one case             | Forgetting the negative branch              | Write both equations explicitly every time   |
| Not isolating first               | Absolute value still mixed with constants   | Move all other terms before splitting        |
| Sign error after dividing by −m   | Inequality direction reversed               | Flip symbol and highlight the step in red    |
| Extraneous roots from squaring    | Squaring both sides without checking        | Never square; always use case definition     |
| Writing |x| < −3 as a solution     | Interval cannot have negative length        | Immediately recognise empty set              |
| Forgetting parentheses            | −|x − 1| written as −|x| − 1                | Always keep the entire expression inside bars|
| Mixing “and” with “or”            | Confusing conjunction and disjunction       | Use interval notation to visualise unions    |

## 7. The textbook-precise statement
Let a, b ∈ ℝ with b ≥ 0. The equation |x − a| = b is equivalent to the disjunction  
x − a = b ∨ x − a = −b,  
whose solution set is {a + b, a − b}.  
The inequality |x − a| < b is equivalent to the conjunction  
a − b < x < a + b.  
The inequality |x − a| > b is equivalent to the disjunction  
x < a − b ∨ x > a + b.  
All statements follow directly from the piecewise definition of |·| and the trichotomy property of the reals (Sullivan, Algebra & Trigonometry, 11e, §2.6).

## 8. Visual — diagram or schematic
```
Number line:
          -3   -2   -1    0    1    2    3
           |    |    |    |    |    |    |
|x-0|=2  <--●--------------●-->
          -2               2
|x|<2    <-------●●●●●●●●●------->
                 interval (−2,2)
|x|>2    <---●         ●--->
         (−∞,−2)∪(2,∞)
```

## 9. The memory technique

1. **The hook** — Picture a guard standing at zero; |x| tells how many steps the guard must walk left or right to reach you. Two possible directions, two solutions.

2. **What to overlearn**  
   - |x| = c (c > 0) ⇒ x = ±c  
   - |x| < c ⇒ −c < x < c  
   - |x| > c ⇒ x < −c or x > c

3. **Spaced-repetition schedule** — Review the three rules above after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback** — Return to the piecewise definition |x| = x if x ≥ 0 else −x; rewrite the original statement as two ordinary linear statements and solve.

## 10. What this unlocks
Mastery of absolute-value equations lets you handle distance constraints that appear in linear programming, tolerance analysis, and piecewise-linear modelling.  

- Next topic: piecewise-defined functions  
- Graphing |f(x)| and solving |f(x)| = g(x) graphically  
- Introduction to norms ||x||_1 and ||x||_∞ in linear algebra  
- Solving equations with nested radicals or square roots that reduce to absolute-value cases

## 11. Self-check — five questions, no answers
1. Solve |3x − 1| = 8 and verify both roots satisfy the original equation.  
2. Write the solution set of |2x + 5| ≤ 3 in interval notation.  
3. For which values of k does |x − 2| = k have exactly one solution?  
4. A student claims |x − 1| > −4 has no solution. Is the claim correct? Explain.  
5. Solve |x + 3| + |x − 1| = 4 and determine whether the solution set is an interval or a union of two points.