## 1. The one-sentence answer
**Absolute value equations and inequalities describe distances on the real line and are solved by converting each instance of |expression| into a pair of cases that remove the absolute-value bars while preserving the distance interpretation.**

The absolute value |x| equals the distance between x and zero. Any equation or inequality containing |·| therefore asserts a precise distance condition. Solving it requires translating that distance condition into ordinary linear statements without the bars, which always produces two symmetric cases around the center point.

Because distance is nonnegative, the number on the right-hand side of an equation must be checked for sign; a negative right-hand side yields the empty set. Inequalities split into two families according to whether the distance is required to be smaller or larger than a given value, each family mapping to a different logical connective (and versus or).

> [!NOTE]
> The single most important insight is that |A| = B is equivalent to A = B or A = −B only when B ≥ 0; the absolute-value symbol itself already encodes the choice of sign, so the algebra must never introduce an extraneous negative on the right-hand side.

## 2. Why this matters — concrete and current
In semiconductor process control, the tolerance specification |V_th − 0.7 V| ≤ 0.05 V on threshold voltage directly determines yield; fabs at TSMC and Intel solve hundreds of such inequalities daily when setting ion-implantation targets.

Spacecraft navigation software at JPL uses absolute-value inequalities to bound position error: |r − r_target| < 3σ guarantees that the Mars Perseverance rover’s landing ellipse stays inside the safety corridor; the same pattern appears in every Kalman-filter update.

In machine-learning fairness auditing, the metric |precision_groupA − precision_groupB| < ε is checked after each training epoch; violating the inequality triggers re-weighting in libraries such as AIF360.

Error analysis in numerical linear algebra relies on component-wise bounds |x_i − x̂_i| ≤ machine_ε · |x_i|; these component-wise absolute-value inequalities are summed to produce the norm-wise backward-error guarantees published in LAPACK documentation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Number line and distance | Absolute value is literally distance from zero            |
| Linear equations         | Each case produced by removing bars is a linear equation  |
| Interval notation        | Solution sets of absolute-value inequalities are intervals|
| Solution of compound inequalities | The logical “and” / “or” connectives arise naturally from the two cases |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distance definition
Absolute value records distance on the number line.  
Concrete example: |−3| = 3 because −3 lies three units left of zero.  
Formal statement:  
$$ |x| = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases} $$  
> [!WARNING] Treating |−3| as −3 instead of +3 immediately produces sign errors in every subsequent equation.

### Step 2 — Removing bars from an equation
The equation |A| = c asserts that A itself is exactly c units from zero, so A equals either c or −c.  
Concrete example: |x − 4| = 2 ⇒ x − 4 = 2 or x − 4 = −2.  
Formal statement (c ≥ 0):  
$$ |A| = c \iff A = c \quad \text{or} \quad A = -c $$  
> [!WARNING] If c < 0 the statement is false for every real A; students who skip the sign check obtain phantom solutions.

### Step 3 — Strict inequality “less than”
|x| < c means the distance from x to zero is smaller than c, i.e., x lies strictly between −c and c.  
Formal statement (c > 0):  
$$ |x| < c \iff -c < x < c $$  
> [!WARNING] Replacing the compound inequality with two separate statements joined by “or” produces the wrong solution set.

### Step 4 — Strict inequality “greater than”
|x| > c means the distance from x to zero exceeds c, so x lies outside the interval [−c, c].  
Formal statement (c > 0):  
$$ |x| > c \iff x < -c \quad \text{or} \quad x > c $$  
> [!WARNING] Using “and” instead of “or” yields the empty set.

### Step 5 — Translation to arbitrary center
Replacing x by (x − h) shifts the center from zero to h. All prior rules apply verbatim to the new expression.  
Formal statement:  
$$ |x - h| = c \iff x - h = c \quad \text{or} \quad x - h = -c $$  
> [!WARNING] Forgetting to distribute the minus sign when writing the second case (x − h = −c) is the most frequent algebraic slip.

### Step 6 — General compound form
Any absolute-value equation or inequality reduces to a pair of linear statements whose logical connective is determined by the relation symbol. This pair is the textbook statement of the method.

## 5. Worked examples — every step shown

**Example 1 — Simple equation**  
*Given:* |2x − 5| = 7  
*Find:* all real x.  
Step 1: 2x − 5 = 7 or 2x − 5 = −7  
*Why:* definition of |A| = c with c > 0.  
Step 2: 2x = 12 or 2x = −2  
*Why:* add 5 to both sides of each equation.  
Step 3: x = 6 or x = −1  
*Why:* divide by 2.  
**x = 6 or x = −1**

*Reflection:* The two solutions are symmetric about the center 5/2; this symmetry always appears when the right-hand side is positive.

**Example 2 — Inequality “less than”**  
*Given:* |3x + 1| < 4  
*Find:* solution set.  
Step 1: −4 < 3x + 1 < 4  
*Why:* definition of |A| < c.  
Step 2: −5 < 3x < 3  
*Why:* subtract 1 throughout.  
Step 3: −5/3 < x < 1  
*Why:* divide by 3 (positive, inequality direction unchanged).  
**−5/3 < x < 1**

*Reflection:* The solution is a single open interval whose midpoint is the zero of the inner expression.

**Example 3 — Inequality “greater than” with negative right-hand side check**  
*Given:* |x − 2| > −3  
*Find:* solution set.  
Step 1: Note that −3 < 0.  
*Why:* absolute value is always ≥ 0, so cannot be > negative number.  
Solution set: empty.  
**∅**

*Reflection:* Always test the sign of the right-hand side before splitting cases.

**Example 4 — Nested absolute values**  
*Given:* | |x| − 3 | = 1  
*Find:* all real x.  
Step 1: |x| − 3 = 1 or |x| − 3 = −1  
*Why:* outer absolute value removed.  
Step 2: |x| = 4 or |x| = 2  
*Why:* add 3 to both sides of each.  
Step 3: x = ±4 or x = ±2  
*Why:* definition of |x| = positive constant.  
**x = −4, −2, 2, 4**

*Reflection:* Each absolute-value layer doubles the number of candidate cases; systematic casework prevents omission.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Solving |x| = −2 and obtaining x = ±2 | Forgetting absolute value cannot equal negative | Test sign of right-hand side first           |
| Writing −c < x < c when the inequality is > | Confusing the two inequality directions | Memorize: “less than” produces interval, “greater than” produces union of rays |
| Dropping the minus sign in second case | Algebraic haste when writing x − h = −c | Always write both equations explicitly before solving |
| Treating |x − 3| < −1 as having solutions | Same sign error as first trap | Immediate empty-set declaration |
| Using “and” for |x| > 5 | Logical connective reversed | Draw number-line picture before writing symbols |
| Forgetting to flip inequality when multiplying by negative | Inner expression may contain negative coefficient | Check coefficient sign after isolating the absolute value |
| Solving |x + 1| = |x − 1| by squaring both sides | Overkill that hides extraneous roots | Use definition: distances to −1 and to 1 are equal only at x = 0 |

## 7. The textbook-precise statement
Let A be a real-valued expression and let c be a real constant. Then:

- If c > 0, |A| = c ⇔ A = c or A = −c.  
- If c = 0, |A| = 0 ⇔ A = 0.  
- If c < 0, |A| = c has solution set ∅.  

For inequalities (c > 0):

- |A| < c ⇔ −c < A < c,  
- |A| > c ⇔ A < −c or A > c,  
- |A| ≤ c ⇔ −c ≤ A ≤ c,  
- |A| ≥ c ⇔ A ≤ −c or A ≥ c.

(Sullivan, *Algebra & Trigonometry*, 10e, §1.6, Theorems 1–4.)

## 8. Visual — diagram or schematic
```text
Number line for |x − 3| = 2
          −∞ ────●────●────●────●──── ∞
                 −1    1    3    5
                 ▲    ▲    ▲    ▲
               case1 case2  center case2 case1
Solutions: x = 1 and x = 5
Interval picture for |x − 3| < 2 : shaded open segment (1,5)
Interval picture for |x − 3| > 2 : two rays (−∞,1) ∪ (5,∞)
```

## 9. The memory technique

1. **The hook** — Picture the absolute-value bars as a pair of calipers that measure distance; the equation |A| = c means the calipers open exactly c units and can sit on either side of the center.

2. **What to overlearn**  
   - |x| = c (c ≥ 0) → two cases x = c, x = −c  
   - |x| < c → single interval (−c, c)  
   - |x| > c → union of two rays

3. **Spaced-repetition schedule** — Review the three bullet facts above at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Return to the geometric definition: absolute value is distance; redraw the number line, mark the center, mark the two points at distance c, and read off the coordinates.

## 10. What this unlocks
Mastery of absolute-value equations supplies the template for every later “case-split” argument in algebra and analysis.  

- Piecewise-defined functions  
- Solving equations containing square roots (via squaring and checking)  
- Triangle inequality proofs in metric spaces  
- Linear programming with absolute-value objectives (LP duality)  
- Robust optimization and worst-case analysis in control theory

## 11. Self-check — five questions, no answers
1. Solve |5 − 2x| = 9 and verify both roots satisfy the original equation.  
2. Determine the solution set of |x + 4| ≤ −1 and justify your conclusion in one sentence.  
3. Graph the solution set of |2x − 1| > 3 on the number line; label the boundary points.  
4. Without solving, decide whether |x − 7| = |x + 7| has any real solutions; explain geometrically.  
5. Convert the compound inequality −3 ≤ |x − 2| ≤ 3 into an equivalent statement without absolute-value symbols and simplify.