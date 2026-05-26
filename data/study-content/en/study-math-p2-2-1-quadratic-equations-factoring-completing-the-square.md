## 1. The one-sentence answer
**Quadratic equations are polynomial equations of degree two whose solutions are found by factoring into linear terms when integer roots exist or by completing the square to rewrite the expression as a shifted square plus constant.**

A quadratic equation always takes the form \(ax^2 + bx + c = 0\) with \(a \neq 0\). Its graph is a parabola. The two algebraic techniques in this lesson convert that equation into an explicit statement about the values of \(x\) that make the left side zero.

Factoring works when the quadratic splits cleanly into a product of binomials whose roots are immediately visible. Completing the square works for every quadratic, even those whose roots are irrational or complex; it rewrites the expression so that the square-root step becomes mechanical. Both routes ultimately isolate \(x\).

> [!NOTE]
> The single deepest insight is that every quadratic can be rewritten as a perfect square plus a constant; factoring is merely the special case in which that constant is zero after scaling.

## 2. Why this matters — concrete and current
NASA trajectory designers solve quadratic equations when computing the burn times that place a spacecraft on a Hohmann transfer orbit between Earth and Mars; the resulting parabola in velocity–time space must be solved to millisecond precision.

In semiconductor process control, Intel engineers fit quadratic models to gate-delay versus voltage curves; completing the square converts each model into vertex form so the minimum-delay operating point is read off in one step.

Gradient-descent implementations inside PyTorch and TensorFlow encounter quadratic loss surfaces when training linear layers; analysts complete the square analytically to locate the exact minimum before any numerical optimizer runs.

Radio astronomers at the Event Horizon Telescope collaboration model the diffraction pattern of a black-hole shadow with a quadratic phase term; factoring the resulting intensity equation yields the angular radii of the bright rings used to calibrate the array.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distributive law     | Required to expand \((x + p)(x + q)\) back to \(x^2 + (p+q)x + pq\) |
| Integer factor pairs | Needed to guess binomial factors quickly                  |
| Square-root function | Appears after completing the square; domain restrictions must be respected |
| Linear equations     | Every quadratic solution path ends by solving a linear equation |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognize the monic quadratic
A quadratic whose leading coefficient is 1 can be written \(x^2 + bx + c = 0\). Its graph crosses the x-axis at points whose sum is \(-b\) and product is \(c\).

Example: \(x^2 + 5x + 6 = 0\) crosses at two points that add to \(-5\) and multiply to 6.

Formal statement:
\[
x^2 + bx + c = (x - r)(x - s),\qquad r + s = -b,\quad rs = c.
\]

> [!WARNING]
> If the leading coefficient is not 1, dividing through by \(a\) must be done before searching for integer pairs; forgetting this produces incorrect factors.

### Step 2 — Factor when integer roots exist
Search for integers \(p, q\) such that \(p + q = b\) and \(pq = c\). The equation then factors as \((x + p)(x + q) = 0\), so each factor supplies a root.

Formal statement:
\[
x^2 + bx + c = (x + p)(x + q) \implies x = -p \text{ or } x = -q.
\]

### Step 3 — Introduce the completion square identity
Any quadratic can be rewritten by adding and subtracting the same quantity inside the expression. The identity
\[
x^2 + bx = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2
\]
turns the left side into a difference of squares after the adjustment.

### Step 4 — Scale for a general leading coefficient
When the leading coefficient is \(a\), first factor \(a\) out of the \(x^2\) and \(x\) terms:
\[
ax^2 + bx + c = a\left(x^2 + \frac{b}{a}x\right) + c.
\]
Complete the square inside the parentheses, then distribute \(a\) back.

### Step 5 — Isolate the roots
After completing the square the equation reads
\[
a\left(x + \frac{b}{2a}\right)^2 = k.
\]
Taking square roots yields the two solutions
\[
x = -\frac{b}{2a} \pm \sqrt{\frac{k}{a}}.
\]
This is the textbook endpoint for the completing-the-square method.

## 5. Worked examples — every step shown

**Example 1 — Simple monic factoring**  
*Given:* \(x^2 + 7x + 12 = 0\)  
*Find:* all real roots.  

\(x^2 + 7x + 12 = (x + 3)(x + 4)\)  
*Why:* Need two numbers summing to 7 and multiplying to 12; 3 and 4 work.  

\((x + 3)(x + 4) = 0\)  
*Why:* Zero-product property.  

\(x = -3\) or \(x = -4\)  
*Why:* Each factor equals zero.  

**Answer:** \(\mathbf{x = -3,\ -4}\)

*Reflection:* The constant term was positive, so both factors carried the same sign; the middle term positive fixed that sign as positive.

**Example 2 — Leading coefficient greater than 1**  
*Given:* \(2x^2 - 5x - 3 = 0\)  
*Find:* all real roots.  

Look for factors of \(2 \cdot (-3) = -6\) that sum to \(-5\): \(-6\) and \(1\).  

Rewrite: \(2x^2 - 6x + x - 3 = 0\)  
*Why:* Split the middle term using the pair found above.  

\(2x(x - 3) + 1(x - 3) = 0\)  
*Why:* Group.  

\((2x + 1)(x - 3) = 0\)  
*Why:* Common factor extracted.  

\(x = -\frac12\) or \(x = 3\)  
*Why:* Zero-product property.  

**Answer:** \(\mathbf{x = -\frac12,\ 3}\)

*Reflection:* Always test the product of leading and constant coefficients first when the leading coefficient is not 1.

**Example 3 — Completing the square, monic**  
*Given:* \(x^2 + 6x + 2 = 0\)  
*Find:* exact roots.  

\(x^2 + 6x = -2\)  
*Why:* Move constant.  

\(x^2 + 6x + 9 = -2 + 9\)  
*Why:* Add \(\left(\frac62\right)^2\) to both sides.  

\((x + 3)^2 = 7\)  
*Why:* Left side is now a square.  

\(x + 3 = \pm\sqrt7\)  
*Why:* Square-root both sides.  

\(x = -3 \pm \sqrt7\)  
*Why:* Subtract 3.  

**Answer:** \(\mathbf{x = -3 \pm \sqrt7}\)

*Reflection:* The added 9 appears on both sides; forgetting the right-hand addition is the most common slip.

**Example 4 — Completing the square, non-monic**  
*Given:* \(3x^2 - 12x + 5 = 0\)  
*Find:* exact roots.  

Divide by 3: \(x^2 - 4x + \frac53 = 0\)  
*Why:* Make leading coefficient 1.  

\(x^2 - 4x = -\frac53\)  
*Why:* Move constant.  

\(x^2 - 4x + 4 = -\frac53 + 4\)  
*Why:* Add \(\left(\frac{-4}{2}\right)^2 = 4\).  

\((x - 2)^2 = \frac73\)  
*Why:* Simplify right side.  

\(x - 2 = \pm\sqrt{\frac73}\)  
*Why:* Square-root both sides.  

\(x = 2 \pm \sqrt{\frac73}\)  
*Why:* Add 2.  

**Answer:** \(\mathbf{x = 2 \pm \sqrt{\frac73}}\)

*Reflection:* Dividing through by the leading coefficient at the start prevents coefficient errors later.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to divide by \(a\) before completing square | Habit of treating every quadratic as monic | Always factor \(a\) out first                |
| Sign error when splitting middle term | Negative product misread as positive pair   | Write the two numbers with explicit signs    |
| Losing the \(\pm\) after square root | Visual symmetry of the squared term         | Write both branches immediately              |
| Treating \(c\) as the constant to complete square with | Confusing \(b\) term with constant          | Always use \(\left(\frac{b}{2a}\right)^2\)   |
| Assuming every quadratic factors over integers | Over-generalizing from classroom examples   | Switch to completing the square when integer search fails |
| Dropping the leading coefficient after dividing | Arithmetic oversight                        | Keep the divided equation on a separate line |
| Solving only one root       | Zero-product property applied to one factor | Explicitly list both solutions               |

## 7. The textbook-precise statement
Let \(a, b, c \in \mathbb{R}\) with \(a \neq 0\). The equation \(ax^2 + bx + c = 0\) may be solved by factoring when integers \(p, q\) exist such that \(apq = c\) and \(a(p + q) = b\), yielding roots \(x = -p, -q\). Otherwise, rewrite
\[
ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + \left(c - \frac{b^2}{4a}\right).
\]
Setting the expression to zero and isolating the squared term produces the solutions
\[
x = -\frac{b}{2a} \pm \sqrt{\frac{b^2 - 4ac}{4a^2}}.
\]
(See Stewart, *Precalculus*, 8e, §2.3.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     parabola y = x^2 + 6x + 2
          |          /\
          |         /  \
   root   |   -3-√7     -3+√7
   ------>|     •         •
          |      \       /
          |       \     /
   vertex |        \   /
   at x=-3|         \ /
          +----------•----------> x
                    ( -3 , -7 )
```
The diagram shows the two roots obtained after completing the square; the vertex lies exactly midway between them at \(x = -b/(2a)\).

## 9. The memory technique

**The hook**  
Picture the quadratic as a rectangle you must turn into a square; you “steal” a strip from one side and glue it to the adjacent side until both sides match.

**What to overlearn**  
1. \(x^2 + bx + c = (x + p)(x + q)\) with \(p+q = -b\), \(pq = c\).  
2. Half of \(b\), squared, is the completing-square patch.  
3. Always divide by \(a\) first when \(a \neq 1\).

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the identity \((x + k)^2 = x^2 + 2kx + k^2\) and solve for the added constant \(k = b/2\) to recover the completion step.

## 10. What this unlocks
Mastery of these two techniques supplies the algebraic engine for deriving the quadratic formula, graphing parabolas in vertex form, and analyzing stability in second-order linear recurrence relations.

- Quadratic formula derivation  
- Vertex form of a parabola  
- Optimization of quadratic objective functions  
- Characteristic equations of linear homogeneous recurrences  
- Partial-fraction decomposition of rational functions with quadratic denominators

## 11. Self-check — five questions, no answers
1. Factor \(x^2 - 9x + 20\) completely over the integers.  
2. Complete the square for \(x^2 + 10x + 17\) and state the vertex coordinates.  
3. Solve \(4x^2 - 4x - 3 = 0\) by factoring; verify both roots satisfy the original equation.  
4. A student writes \(2x^2 + 5x + 2 = (2x + 1)(x + 2)\). Identify the error and correct it.  
5. Without calculating the discriminant, decide whether \(3x^2 - 2x + 4 = 0\) can be solved by integer factoring; justify your conclusion.