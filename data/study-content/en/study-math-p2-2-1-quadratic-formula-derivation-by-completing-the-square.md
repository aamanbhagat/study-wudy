## 1. The one-sentence answer
**The quadratic formula is obtained by completing the square on the general equation \(ax^2 + bx + c = 0\).**

Any quadratic equation can be rewritten by isolating the squared and linear terms, adding a constant that turns the left side into a perfect square, and then taking square roots. This algebraic manipulation produces the familiar expression involving the discriminant without ever guessing the formula in advance. The process works for any coefficients where \(a \neq 0\) and reveals why the \(\pm\) symbol and the square-root term appear.

Completing the square is not a trick; it is the systematic way to convert an asymmetric quadratic into a symmetric one whose roots are obvious. Once the square is completed, every subsequent step is reversible and therefore preserves the solution set exactly.

> [!NOTE]
> The single algebraic act of adding \((b/(2a))^2\) to both sides simultaneously creates the square root in the final formula and forces the \(\pm\) because every nonzero number has two square roots.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 trajectory software solves quadratic equations at every guidance update to compute the exact time a booster will reach apogee under constant thrust and gravity; the derivation by completing the square guarantees that the code uses the mathematically exact roots rather than an iterative approximation that could accumulate error during re-entry.

In semiconductor timing analysis, Synopsys PrimeTime models gate delay as a quadratic function of load capacitance and supply voltage; completing the square converts that model into an explicit formula for the voltage that produces a target delay, allowing static timing tools to certify clock frequencies before tape-out.

Modern portfolio optimizers at Renaissance Technologies solve thousands of quadratic programs daily; the closed-form solution obtained by completing the square supplies the analytic gradient used inside their interior-point solvers, reducing each iteration from cubic to linear cost in the number of assets.

The Schrödinger equation for the hydrogen atom reduces, after separation of variables, to a quadratic characteristic equation whose roots are the allowed energy levels; deriving the quadratic formula by completing the square shows directly that the energy spacing is inversely proportional to \(n^2\), matching the observed spectral lines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear equation solving  | Every step after completing the square is a linear operation on both sides. |
| Laws of exponents        | Extracting square roots requires \((x^2)^{1/2} = |x|\) and handling of negative bases under even roots. |
| Distributive property    | Expanding \((x + k)^2\) and factoring out \(a\) both rely on correct distribution. |
| Domain restrictions      | Division by \(a\) and the requirement that the discriminant be nonnegative must be stated explicitly. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Normalize the leading coefficient
Divide the entire equation by \(a\) so the squared term has coefficient 1. This removes the extra factor that would otherwise clutter every later expression.

Example: \(2x^2 + 8x + 6 = 0\) becomes \(x^2 + 4x + 3 = 0\).

Formal statement:
\[
ax^2 + bx + c = 0 \quad \implies \quad x^2 + \frac{b}{a}x + \frac{c}{a} = 0.
\]

> [!WARNING]
> Forgetting to divide the constant term \(c\) produces an incorrect linear coefficient later.

### Step 2 — Isolate the variable terms
Move the constant to the right-hand side so only the \(x^2\) and \(x\) terms remain on the left.

Formal statement:
\[
x^2 + \frac{b}{a}x = -\frac{c}{a}.
\]

### Step 3 — Prepare the perfect-square trinomial
Take half the coefficient of \(x\), square it, and add that quantity to both sides. The left side is now a square.

Formal statement:
\[
x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2.
\]

> [!WARNING]
> Using \(b/a\) instead of half of \(b/a\) yields the wrong constant and destroys the square.

### Step 4 — Factor the left side
The left side collapses to a squared binomial.

Formal statement:
\[
\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}.
\]

### Step 5 — Extract square roots
Apply the square-root operation to both sides, remembering that \(\sqrt{k^2} = \pm k\).

Formal statement:
\[
x + \frac{b}{2a} = \pm \sqrt{\frac{b^2 - 4ac}{4a^2}} = \pm \frac{\sqrt{b^2 - 4ac}}{2a}.
\]

### Step 6 — Solve for \(x\)
Subtract the constant term and obtain the two roots.

Formal statement:
\[
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
\]

## 5. Worked examples — every step shown

**Example 1 — Monic integer coefficients**  
*Given:* \(x^2 + 6x + 5 = 0\)  
*Find:* exact roots  

Divide by 1 (already monic).  
Move constant: \(x^2 + 6x = -5\).  
Add \((3)^2\): \(x^2 + 6x + 9 = 4\).  
Factor: \((x + 3)^2 = 4\).  
Root extraction: \(x + 3 = \pm 2\).  
Solve: \(x = -3 \pm 2\).  

**Final answer**  
\[ x = -1 \quad\text{or}\quad x = -5 \]

*Reflection:* The numbers stayed small because the leading coefficient was already 1; the same arithmetic appears inside the general formula.

**Example 2 — Non-monic with even linear coefficient**  
*Given:* \(2x^2 - 8x + 6 = 0\)  
*Find:* exact roots  

Divide by 2: \(x^2 - 4x + 3 = 0\).  
Move constant: \(x^2 - 4x = -3\).  
Add \((-2)^2\): \(x^2 - 4x + 4 = 1\).  
Factor: \((x - 2)^2 = 1\).  
Root extraction: \(x - 2 = \pm 1\).  
Solve: \(x = 2 \pm 1\).

**Final answer**  
\[ x = 3 \quad\text{or}\quad x = 1 \]

*Reflection:* Division by the leading coefficient must be performed first; omitting it produces an incorrect half-coefficient.

**Example 3 — Irrational roots**  
*Given:* \(x^2 - 2x - 4 = 0\)  
*Find:* exact roots  

Move constant: \(x^2 - 2x = 4\).  
Add \(1^2\): \(x^2 - 2x + 1 = 5\).  
Factor: \((x - 1)^2 = 5\).  
Root extraction: \(x - 1 = \pm \sqrt{5}\).  
Solve: \(x = 1 \pm \sqrt{5}\).

**Final answer**  
\[ x = 1 + \sqrt{5},\quad 1 - \sqrt{5} \]

*Reflection:* The discriminant appears naturally as the right-hand side after completing the square.

**Example 4 — General coefficients with fractions**  
*Given:* \(3x^2 + 5x - 2 = 0\)  
*Find:* exact roots  

Divide by 3: \(x^2 + \frac{5}{3}x - \frac{2}{3} = 0\).  
Move constant: \(x^2 + \frac{5}{3}x = \frac{2}{3}\).  
Add \(\left(\frac{5}{6}\right)^2\): \(x^2 + \frac{5}{3}x + \frac{25}{36} = \frac{2}{3} + \frac{25}{36} = \frac{49}{36}\).  
Factor: \(\left(x + \frac{5}{6}\right)^2 = \left(\frac{7}{6}\right)^2\).  
Root extraction: \(x + \frac{5}{6} = \pm \frac{7}{6}\).  
Solve: \(x = -\frac{5}{6} \pm \frac{7}{6}\).

**Final answer**  
\[ x = \frac{1}{3},\quad x = -2 \]

*Reflection:* All fractions share a common denominator once the square is completed, confirming the general formula’s denominator \(2a\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to divide \(c\) by \(a\) | Mechanical oversight after dividing leading term | Write every coefficient with denominator \(a\) immediately. |
| Using \(b\) instead of \(b/a\) when halving | Treating the original equation as monic   | Always work with the normalized equation.            |
| Dropping the \(\pm\) after square-root extraction | Belief that “the positive root is enough” | Remember every nonzero square has two roots.         |
| Writing \(\sqrt{4a^2} = 2a\) without absolute value | Ignoring that square-root symbol yields nonnegative result | Keep the \(\pm\) outside and treat \(2a\) as signed. |
| Applying the formula when \(a = 0\) | Not checking the hypothesis                 | State \(a \neq 0\) before any division.              |
| Sign error when moving \(c/a\)    | Treating subtraction as part of the square  | Move the constant first, then add the completing term. |
| Canceling \(2a\) incorrectly with the square root | Treating numerator and denominator symmetrically | Factor \(2a\) out of the square-root denominator only. |

## 7. The textbook-precise statement
Let \(a, b, c \in \mathbb{R}\) with \(a \neq 0\). The solutions of the equation
\[
ax^2 + bx + c = 0
\]
are given by
\[
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a},
\]
provided the discriminant \(b^2 - 4ac \ge 0\) when real roots are required. (See Stewart, *Algebra and Trigonometry*, 5e, §2.5, Completing the Square.)

## 8. Visual — diagram or schematic
```text
Original quadratic          After normalization      After completing square
ax² + bx + c                x² + (b/a)x            (x + b/(2a))²
     \                         /                           |
      \                       /                            |
       constant moved        half-coefficient squared      square-root
       to right side          added to both sides          yields ±
```

The diagram shows the three algebraic regions: the original asymmetric expression, the normalized monic trinomial, and the perfect-square binomial whose roots are immediate.

## 9. The memory technique

1. **The hook** — Picture a lopsided rectangle being turned into a perfect square by adding one small square in the corner; the side length of that added square is exactly \(b/(2a)\).

2. **What to overlearn**  
   \[
   x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
   \]
   and the single completing-square step
   \[
   x^2 + px \quad\to\quad \left(x + \frac{p}{2}\right)^2 - \left(\frac{p}{2}\right)^2.
   \]

3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Begin again from \(ax^2 + bx + c = 0\), divide by \(a\), move \(c/a\), add \((b/(2a))^2\), factor, and extract roots; the algebra itself regenerates the formula.

## 10. What this unlocks
Mastery of this derivation supplies the explicit roots needed for vertex form, for graphing parabolas, and for solving quadratic inequalities by sign charts. It is also the algebraic engine behind the distance formula in coordinate geometry and the characteristic equation of every 2-by-2 matrix.

- Quadratic functions in vertex form \(a(x-h)^2 + k\)
- Discriminant analysis and nature of roots
- Systems of quadratic equations
- Conic sections (parabolas, ellipses, hyperbolas)

## 11. Self-check — five questions, no answers
1. Derive the quadratic formula from \(3x^2 - 7x + 2 = 0\) by completing the square and state both roots.

2. In Step 3 of the derivation, why must the quantity added to both sides be exactly \((b/(2a))^2\) rather than any other constant?

3. A student writes \(x = -b \pm \sqrt{b^2 - 4ac}/2a\). Identify the single parenthesis error and correct it.

4. For which values of \(a\) does the derivation fail, and what does the original equation become in those cases?

5. Show that completing the square on \(ax^2 + bx + c = 0\) yields an expression whose numerator is exactly the discriminant; explain why this quantity must be nonnegative for real roots.