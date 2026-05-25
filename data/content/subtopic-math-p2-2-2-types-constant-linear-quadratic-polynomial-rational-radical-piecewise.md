## What it is
Function types are classifications of mathematical relationships based on the algebraic operations acting on the input variable. Just as organisms are classified by their traits, functions are grouped by their highest powers, fractions, roots, or conditional rules, which dictate their overall shape, domain, and behavior.

## Why it matters
Recognizing function types instantly tells you how a system behaves without having to plot it point by point. In physics, linear functions model constant velocity, quadratics model uniform acceleration (like a rocket's altitude in early flight), and rational functions model inverse-square laws like gravity and electromagnetism. In machine learning, piecewise functions (specifically the Rectified Linear Unit, or ReLU) act as the foundational activation functions that allow neural networks to learn complex, non-linear patterns.

## When to study it
You must already understand the basic definition of a function (inputs, outputs, domain, range) and possess solid algebraic manipulation skills (exponents, fractions, factoring). If you cannot confidently evaluate $f(x) = x^2 - 3x$ at $x = -2$, or if you do not know what an independent variable is, return to basic function notation and order of operations.

## How to study it (step by step)
1. **Define the base forms:** Write out the general algebraic form for each type (e.g., $f(x) = ax^2 + bx + c$ for quadratics) and identify the defining algebraic feature (the squared term).
2. **Plot the "parent" functions:** Graph the absolute simplest version of each type ($y=c$, $y=x$, $y=x^2$, $y=x^3$, $y=1/x$, $y=\sqrt{x}$) by calculating points from $x=-3$ to $x=3$. Memorize these base shapes.
3. **Hunt for domain restrictions:** For rational and radical functions, deliberately look for inputs that break the rules of real numbers. Find where denominators equal zero, and where the expressions inside even roots become negative. 
4. **Analyze end behavior:** Ask yourself, "What happens to $f(x)$ as $x$ becomes massively positive ($x \to \infty$) or massively negative ($x \to -\infty$)?" Notice how the highest power in a polynomial always wins this tug-of-war.
5. **Deconstruct piecewise functions:** Practice reading the "if" conditions (the domain restrictions) *before* looking at the algebraic rules. Draw vertical dashed lines on a graph to separate the zones, and plot each rule only in its allowed zone.

## Key ideas, with intuition
**1. Polynomials are the foundation.** 
Constant ($f(x)=c$), linear ($f(x)=mx+b$), and quadratic ($f(x)=ax^2+bx+c$) functions are simply polynomials of degree 0, 1, and 2. The "degree" (highest exponent) dictates the maximum number of times the graph can change direction. 

**2. Rational functions are ratios of polynomials.**
$$f(x) = \frac{P(x)}{Q(x)}$$
*Intuition:* The denominator fights the numerator. When the denominator $Q(x)$ approaches zero, the fraction explodes toward infinity, creating a vertical "wall" called an asymptote. The function is undefined exactly at $Q(x) = 0$.

**3. Radical functions are inverses of powers.**
$$f(x) = \sqrt[n]{x}$$
*Intuition:* They grow incredibly slowly. Because you cannot square a real number and get a negative result, even roots (like square roots) have strict domains: the inside must be $\ge 0$. 

**4. Piecewise functions are stitched realities.**
$$f(x) = \begin{cases} x^2 & \text{if } x < 0 \\ 2x & \text{if } x \ge 0 \end{cases}$$
*Intuition:* They are not a single algebraic rule, but a set of instructions. Think of them as a machine with a sorting mechanism at the front: the input's value determines which internal factory line (rule) processes it.

## Worked example
**Problem:** Find the domain of the piecewise function $f(x) = \begin{cases} \frac{1}{x+2} & x < 0 \\ \sqrt{x-1} & x \ge 0 \end{cases}$.

**Step 1: Analyze the first piece.** 
The rule is $y = \frac{1}{x+2}$, which is active only when $x < 0$. 
Because it is a rational function, the denominator cannot be zero: $x + 2 \neq 0 \implies x \neq -2$. 
We check if $x = -2$ falls within the active condition ($x < 0$). It does. Therefore, $-2$ must be excluded.
Domain of piece 1: $(-\infty, -2) \cup (-2, 0)$.

**Step 2: Analyze the second piece.**
The rule is $y = \sqrt{x-1}$, which is active only when $x \ge 0$.
Because it is a radical function (even root), the inside must be non-negative: $x - 1 \ge 0 \implies x \ge 1$.
We check this against the active condition ($x \ge 0$). The requirement $x \ge 1$ is stricter, so it supersedes $x \ge 0$.
Domain of piece 2: $[1, \infty)$.

**Step 3: Combine the domains.**
The total domain is the union of the valid inputs from both pieces.
Domain: $(-\infty, -2) \cup (-2, 0) \cup [1, \infty)$.

*Reflection:* Breaking the function into independent regions prevents us from applying rules where they don't belong. We must check the algebraic restriction (division by zero, negative roots) *against* the piecewise condition.

## Diagrams

```text
THE FUNCTION ZOO: PARENT SHAPES

   Quadratic: y = x^2            Radical: y = sqrt(x)
      y |                           y |
        |   |   |                     |         .  -  -
      4 +   *   *                   2 +      *
        |  /     \                    |   *
      1 + *       *                 1 + *
        |/         \                  |/
  ------+-----------+------ x   ------+------------------ x
       -2   0   2                     0   1   4

   Rational: y = 1/x             Piecewise: (x<0: -1, x>=0: x)
      y |                           y |
      * |                             |       *
        |                             |     /
      . |                             |   *
--------+-------- . ------- x   ------+------------------ x
      . |                             o (hole at 0,-1)
        |                             |
        | *                         -1+-------*-------*
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of the "Function Zoo".
   * **Constant:** A flatline (dead).
   * **Linear:** A ramp.
   * **Quadratic:** A satellite dish (parabola).
   * **Polynomial:** A roller coaster (multiple hills/valleys).
   * **Rational:** A split highway (driven apart by an asymptote).
   * **Radical:** A bird's wing (starts at a point, rises slowly).
   * **Piecewise:** Frankenstein's monster (stitched together from different parts).

2. **Formulas to overlearn:**
   * Polynomial general form: $$P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_0$$ (where $n$ is a non-negative integer).
   * Rational definition: $$f(x) = \frac{P(x)}{Q(x)}, \text{ where } Q(x) \neq 0$$

3. **Spaced-repetition schedule:** Review these shapes and definitions at 1 day, 3 days, 7 days, 16 days, and 35 days. Draw the parent graphs from memory on a blank sheet of paper.

4. **First principles pathway:** If you forget a function's shape or domain, you can always rebuild it by testing three things: 
   * Extreme values ($x = 1,000,000$ and $x = -1,000,000$).
   * Zero ($x = 0$).
   * Danger zones (where a denominator equals $0$, or an expression under a square root becomes negative).

## Common mistakes
* **Simplifying before finding the domain:** Students often simplify a rational function like $f(x) = \frac{x^2+x}{x}$ to $f(x) = x+1$ and claim the domain is all real numbers. It is not. The original function dictates the domain; $x \neq 0$.
* **Double-dipping in piecewise functions:** When evaluating a piecewise function at a boundary (e.g., $x=0$), students sometimes plug the value into both rules. Look closely at the inequalities: only one will have the "or equal to" ($\le$ or $\ge$) sign.
* **Assuming all roots have restricted domains:** Students often assume $\sqrt[3]{x}$ has a domain of $x \ge 0$. Odd roots can accept negative inputs (e.g., $\sqrt[3]{-8} = -2$). Only *even* roots have restricted domains.

## Self-check
1. Identify the overarching type of this function: $f(x) = \frac{3x^2 - 2}{\sqrt{x}}$. What two base types is it composed of?
2. Determine the exact domain of the rational function $g(x) = \frac{x-2}{x^2 - 4}$. 
3. Construct a piecewise function $h(x)$ that is constant at $y=4$ for $x < -2$, linear with a slope of $-1$ for $-2 \le x \le 2$, and quadratic for $x > 2$, ensuring the graph connects seamlessly (is continuous) at all boundaries.