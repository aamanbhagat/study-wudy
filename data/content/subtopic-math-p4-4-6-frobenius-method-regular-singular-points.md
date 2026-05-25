## What it is
The Frobenius method is a technique for finding a series solution to a second-order linear ordinary differential equation (ODE) around a *regular singular point*. It generalizes the standard power series method by introducing a fractional or negative power term, $x^r$, which allows it to handle solutions that are not analytic (i.e., they blow up or have cusps) at the point of interest.

## Why it matters
This method is not just a mathematical curiosity; it is essential for solving foundational equations in physics and engineering. Bessel's equation, which models phenomena like heat conduction in a cylinder or the vibration of a circular drum, has a regular singular point at the origin and is solved using this method. Similarly, Legendre's equation, crucial for problems with spherical symmetry in quantum mechanics and electromagnetism, requires this approach.

## When to study it
Before tackling this, you must be proficient with the standard power series method for solving ODEs around *ordinary points*. This includes being comfortable with:
1.  Infinite series and tests for convergence (specifically, the ratio test).
2.  Manipulating series: re-indexing summations and combining them.
3.  Classifying points of an ODE as ordinary, regular singular, or irregular singular.

If you cannot confidently determine that for the ODE $y'' + P(x)y' + Q(x)y = 0$, the point $x_0$ is a regular singular point if $(x-x_0)P(x)$ and $(x-x_0)^2Q(x)$ are analytic at $x_0$, you should review that topic first.

## How to study it (step by step)
1.  **Verify the Prerequisite.** Take the ODE $y'' + xy' + y = 0$. Use the power series method to find the solution around the ordinary point $x_0=0$. If this is trivial for you, proceed.
2.  **Master Classification.** Take the ODE $x^2(x-1)y'' + x(x+1)y' - y = 0$. Identify all singular points and classify each as regular or irregular. This is the decision point for whether to use the Frobenius method.
3.  **Derive the Indicial Equation.** For a general ODE $y'' + P(x)y' + Q(x)y = 0$ with a regular singular point at $x_0=0$, substitute the Frobenius ansatz $y(x) = \sum_{n=0}^{\infty} a_n x^{n+r}$ into the equation. Do not solve for the coefficients $a_n$. Instead, focus only on the terms with the lowest power of $x$. Show that the equation governing the coefficient $a_0$ is a quadratic equation in $r$. This is the *indicial equation*.
4.  **Solve the Simplest Case.** Find the two series solutions for $2x^2y'' - xy' + (1+x)y = 0$ around $x_0=0$. The roots of the indicial equation will be distinct and not differ by an integer. This is the most straightforward application of the method.
5.  **Understand the Three Cases.** Read about the three possible outcomes for the roots ($r_1, r_2$) of the indicial equation:
    *   Case 1: $r_1 - r_2$ is not an integer. (You just solved this).
    *   Case 2: $r_1 = r_2$.
    *   Case 3: $r_1 - r_2$ is a non-zero integer.
    For cases 2 and 3, understand *why* a second, linearly independent solution often involves a logarithmic term of the form $y_1(x)\ln(x)$. Do not solve a problem yet, just grasp the structure of the second solution.

## Key ideas, with intuition
1.  **Why Power Series Fail.** A standard power series $y = \sum a_n x^n$ can only represent functions that are smooth and well-behaved at $x=0$. But solutions to equations like Bessel's equation can look like $J_1(x) \sim \sqrt{x}$ or $Y_1(x) \sim 1/\sqrt{x}$ near $x=0$. A standard power series cannot produce a $\sqrt{x}$ or $1/\sqrt{x}$ term.
2.  **The Frobenius "Fix".** The core idea is to "factor out" the singular behavior. We assume a solution of the form:
    $$ y(x) = x^r \sum_{n=0}^{\infty} a_n x^n = x^r (\text{a well-behaved power series}) $$
    The term $x^r$ captures the problematic behavior (like $x^{1/2}$ or $x^{-1/2}$), while the remaining sum is an analytic function. The exponent $r$ is unknown and must be solved for.
3.  **The Indicial Equation Determines the Behavior.** When you substitute the Frobenius series into the ODE, the equation for the very first term (the $a_0$ term) does not depend on any other coefficients. It produces a standalone quadratic equation for the exponent $r$, called the indicial equation.
    $$ r(r-1) + p_0 r + q_0 = 0 $$
    Here, $p_0 = \lim_{x\to 0} xP(x)$ and $q_0 = \lim_{x\to 0} x^2Q(x)$. The roots of this equation, $r_1$ and $r_2$, tell you the fundamental behavior of the solutions near the singularity. For example, roots of $r=1/2, -1/2$ tell you the solutions behave like $\sqrt{x}$ and $1/\sqrt{x}$.

## Worked example
Find one Frobenius series solution for Bessel's equation of order 1/2:
$$ x^2y'' + xy' + \left(x^2 - \frac{1}{4}\right)y = 0 $$

**Step 1: Classify the point $x_0=0$.**
The equation in standard form is $y'' + \frac{1}{x}y' + \left(1 - \frac{1}{4x^2}\right)y = 0$.
Here, $P(x) = 1/x$ and $Q(x) = 1 - 1/(4x^2)$.
- $xP(x) = 1$ (analytic at $x=0$).
- $x^2Q(x) = x^2 - 1/4$ (analytic at $x=0$).
Since both are analytic, $x_0=0$ is a **regular singular point**. The Frobenius method applies.

**Step 2: Apply the Frobenius ansatz.**
Assume a solution $y(x) = \sum_{n=0}^{\infty} a_n x^{n+r}$ with $a_0 \neq 0$.
Calculate its derivatives:
- $y' = \sum_{n=0}^{\infty} (n+r) a_n x^{n+r-1}$
- $y'' = \sum_{n=0}^{\infty} (n+r)(n+r-1) a_n x^{n+r-2}$

**Step 3: Substitute into the ODE.**
$$ x^2 \sum (n+r)(n+r-1) a_n x^{n+r-2} + x \sum (n+r) a_n x^{n+r-1} + \left(x^2 - \frac{1}{4}\right) \sum a_n x^{n+r} = 0 $$
Distribute the coefficients:
$$ \sum (n+r)(n+r-1) a_n x^{n+r} + \sum (n+r) a_n x^{n+r} + \sum a_n x^{n+r+2} - \sum \frac{1}{4} a_n x^{n+r} = 0 $$
Combine terms with the same power of $x$:
$$ \sum_{n=0}^{\infty} \left[(n+r)(n+r-1) + (n+r) - \frac{1}{4}\right] a_n x^{n+r} + \sum_{n=0}^{\infty} a_n x^{n+r+2} = 0 $$
Simplify the bracketed term: $(n+r)^2 - 1/4$.
$$ \sum_{n=0}^{\infty} \left[(n+r)^2 - \frac{1}{4}\right] a_n x^{n+r} + \sum_{n=0}^{\infty} a_n x^{n+r+2} = 0 $$

**Step 4: Find the Indicial Equation.**
The lowest power of $x$ is $x^r$, which occurs when $n=0$ in the first sum. The coefficient of this term must be zero.
$$ \left[ (0+r)^2 - \frac{1}{4} \right] a_0 = 0 $$
Since we assumed $a_0 \neq 0$, the term in brackets must be zero. This is the indicial equation:
$$ r^2 - \frac{1}{4} = 0 \implies r = \pm \frac{1}{2} $$
Let's choose $r_1 = 1/2$.

**Step 5: Find the Recurrence Relation.**
Let's re-index the second sum to match the powers of $x$. Let $k=n+2 \implies n=k-2$.
$$ \sum_{k=0}^{\infty} \left[(k+r)^2 - \frac{1}{4}\right] a_k x^{k+r} + \sum_{k=2}^{\infty} a_{k-2} x^{k+r} = 0 $$
Now, we write out the terms for $k=0$ and $k=1$ from the first sum and then combine the rest.
- $k=0$: $\left[r^2 - 1/4\right]a_0 x^r = 0$ (the indicial equation, already solved).
- $k=1$: $\left[(1+r)^2 - 1/4\right]a_1 x^{1+r} = 0$.
- $k \ge 2$: $\sum_{k=2}^{\infty} \left( \left[(k+r)^2 - \frac{1}{4}\right] a_k + a_{k-2} \right) x^{k+r} = 0$.

For our chosen root $r=1/2$:
- The $k=1$ equation becomes: $\left[(1+1/2)^2 - 1/4\right]a_1 = \left[9/4 - 1/4\right]a_1 = 2a_1 = 0 \implies a_1 = 0$.
- The recurrence relation for $k \ge 2$ becomes:
$$ \left[(k+1/2)^2 - 1/4\right] a_k + a_{k-2} = 0 $$
$$ \left[k^2+k+1/4 - 1/4\right] a_k = -a_{k-2} $$
$$ k(k+1) a_k = -a_{k-2} \implies a_k = \frac{-a_{k-2}}{k(k+1)} $$
Since $a_1=0$, all odd coefficients are zero ($a_3, a_5, \dots = 0$).
For even coefficients (let $k=2m$):
- $a_2 = \frac{-a_0}{2 \cdot 3} = \frac{-a_0}{3!}$
- $a_4 = \frac{-a_2}{4 \cdot 5} = \frac{-(-a_0/3!)}{20} = \frac{a_0}{5!}$
- In general, $a_{2m} = \frac{(-1)^m a_0}{(2m+1)!}$.

**Step 6: Write the Solution.**
Substituting the coefficients back into the series form with $r=1/2$:
$$ y_1(x) = x^{1/2} \sum_{m=0}^{\infty} a_{2m} x^{2m} = a_0 x^{1/2} \sum_{m=0}^{\infty} \frac{(-1)^m}{(2m+1)!} x^{2m} $$
Let's clean this up. Multiply and divide by $x$:
$$ y_1(x) = \frac{a_0}{\sqrt{x}} \sum_{m=0}^{\infty} \frac{(-1)^m}{(2m+1)!} x^{2m+1} $$
The sum is the Taylor series for $\sin(x)$.
$$ y_1(x) = a_0 \frac{\sin(x)}{\sqrt{x}} $$
This is one of the two solutions, the Bessel function of the first kind of order 1/2, scaled by a constant.

**Reflection:**
- Classifying the point confirmed the method was valid.
- The ansatz $y = \sum a_n x^{n+r}$ was the key algebraic tool.
- Isolating the lowest power of $x$ ($x^r$) naturally produced the indicial equation for $r$.
- Setting the coefficients of all powers of $x$ to zero yielded the recurrence relation for the $a_n$.
- Solving the recurrence gave the specific series, which in this case simplified to a known function.

## Diagrams
A conceptual flowchart for the Frobenius method:

```text
       Start with ODE: a(x)y'' + b(x)y' + c(x)y = 0
                       |
                       V
      Identify singular point x_0 (e.g., x_0 = 0)
                       |
                       V
      Classify x_0: Is it a REGULAR singular point?
      (Check if (x-x_0)P(x) and (x-x_0)^2Q(x) are analytic)
          /      \
      NO /        \ YES
        /          \
  Method Fails      V
                   Assume solution y(x) = x^r * sum(a_n * x^n)
                       |
                       V
                  Substitute into ODE and group by powers of x
                       |
                       V
      Lowest power term -> Indicial Equation for r
                       |
                       V
                  Solve for roots r1, r2
                       |
                       V
      Higher power terms -> Recurrence Relation for a_n
                       |
                       V
      Use r1, r2 and recurrence to find series solutions y1(x), y2(x)
      (Structure depends on whether r1=r2, r1-r2 is integer, etc.)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**F**ractional **R**oots **O**ften **B**eat **E**lementary **N**ewtonian **I**ntegration, **U**sing **S**eries." The key is **Fractional Roots** — the method is all about finding the exponent $r$.
2.  **Formulas to Overlearn:**
    *   The Ansatz: $y(x) = \sum_{n=0}^{\infty} a_n x^{n+r}$, with the crucial condition $a_0 \neq 0$.
    *   Regular Singular Point Definition: For $y'' + P(x)y' + Q(x)y=0$ at $x_0$, the limits $p_0 = \lim_{x\to x_0} (x-x_0)P(x)$ and $q_0 = \lim_{x\to x_0} (x-x_0)^2Q(x)$ must be finite.
    *   The Indicial Equation: $r(r-1) + p_0 r + q_0 = 0$.
3.  **Spaced Repetition Schedule:** Review this entire mini-lesson at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, try to re-derive the indicial equation from the ansatz.
4.  **First Principles Pathway:** If you forget everything, remember this: "My normal power series doesn't work. I'll try multiplying it by an unknown power, $x^r$."
    *   Write $y = x^r \sum a_n x^n$.
    *   Plug it into the ODE.
    *   Don't panic. Algebraically collect all terms by their power of $x$.
    *   The coefficient of the absolute lowest power of $x$ *must* be zero. Since you demand $a_0 \neq 0$, the part involving $r$ must be zero. That's your indicial equation.

## Common mistakes
1.  **Incorrectly Classifying the Point:** Applying the Frobenius method to an irregular singular point. It will fail, often by producing a trivial solution or a divergent series.
2.  **Forgetting $a_0 \neq 0$:** This assumption is what forces the indicial equation to be true. If you allow $a_0=0$, you haven't actually found the lowest power term in your series, and your logic collapses.
3.  **Errors in Index Shifting:** When combining series like $\sum a_n x^{n+r}$ and $\sum b_n x^{n+r+2}$, a mistake in re-indexing the second sum is the most common source of error in finding the recurrence relation.
4.  **Stopping at One Solution:** Finding the solution for $r_1$ is only half the battle. You must address the second linearly independent solution, especially in the tricky cases where the roots are repeated or differ by an integer.

## Self-check
1.  Consider the ODE $3x y'' + y' - y = 0$. Classify the point $x_0=0$ and find the indicial equation and its roots.
2.  For Legendre's equation, $(1-x^2)y'' - 2xy' + \alpha(\alpha+1)y = 0$, show that $x=\pm 1$ are regular singular points. (Hint: It's easier to work with the point $t=0$ after a change of variables $t=x-1$).
3.  Find the complete series solution for $xy'' + 2y' + xy = 0$ around $x_0=0$. The roots of the indicial equation will differ by an integer. Analyze what happens when you try to find the second solution.