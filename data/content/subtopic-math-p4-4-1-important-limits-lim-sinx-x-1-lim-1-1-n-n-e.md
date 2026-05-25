## What it is
These are two foundational limits that evaluate to indeterminate forms ($0/0$ and $1^\infty$) but converge to specific, highly useful constants. The limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$ resolves the ratio of a sine wave to its argument near the origin. The limit $\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$ defines Euler's number as the ceiling of continuous, infinite compounding.

## Why it matters
Without $\lim_{x \to 0} \frac{\sin x}{x} = 1$, you cannot prove that the derivative of $\sin x$ is $\cos x$. This makes it the bedrock of all harmonic analysis, used to model pendulums, AC circuits, and orbital mechanics. Without the $e$ limit, you cannot differentiate exponential functions. It is the mathematical foundation for continuous growth, radioactive decay, and the Tsiolkovsky rocket equation ($\Delta v = I_{sp} g_0 \ln \frac{m_0}{m_f}$). 

## When to study it
You must already understand:
1. Limit evaluation and indeterminate forms ($0/0$, $\infty/\infty$).
2. The Squeeze Theorem (Sandwich Theorem).
3. Unit circle trigonometry and the formulas for the area of a triangle and a circular sector.
If you do not understand the Squeeze Theorem, stop. You cannot rigorously prove the sine limit without it.

## How to study it (step by step)
1. **Graph the functions:** Plot $f(x) = \frac{\sin x}{x}$ and $g(x) = \left(1 + \frac{1}{x}\right)^x$. Observe the $y$-values as $x \to 0$ and $x \to \infty$, respectively.
2. **Derive the sine limit:** Draw a unit circle. Use the Squeeze Theorem to compare the area of an inscribed triangle, a circular sector, and a circumscribed triangle. 
3. **Analyze the exponential limit:** Calculate $\left(1 + \frac{1}{n}\right)^n$ for $n = 1, 10, 100, 1000$ to watch the sequence converge asymptotically to $2.71828...$
4. **Master algebraic manipulation:** Practice inserting constants to match arguments. To solve $\lim_{x \to 0} \frac{\sin(ax)}{x}$, multiply the numerator and denominator by $a$ to force the denominator to match the argument of the sine function.
5. **Derive the cosine limit:** Use $\lim_{x \to 0} \frac{\sin x}{x} = 1$ and the trigonometric conjugate to prove that $\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$.

## Key ideas, with intuition
**Small Angle Approximation**
As an angle $x$ becomes extremely small, the arc length of a circle ($x$ in radians) becomes virtually indistinguishable from the vertical chord ($\sin x$). Therefore, near zero, the ratio of the two is exactly $1$. 

**The Squeeze Theorem Geometry**
For a small positive angle $x$ in a unit circle (radius $r=1$):
* Area of inner triangle = $\frac{1}{2}(1)(\sin x) = \frac{1}{2}\sin x$
* Area of circular sector = $\frac{1}{2}r^2 x = \frac{1}{2}x$
* Area of outer tangent triangle = $\frac{1}{2}(1)(\tan x) = \frac{1}{2}\tan x$

Since Inner Triangle $<$ Sector $<$ Outer Triangle:
$$ \frac{1}{2}\sin x < \frac{1}{2}x < \frac{1}{2}\frac{\sin x}{\cos x} $$
Divide everything by $\frac{1}{2}\sin x$:
$$ 1 < \frac{x}{\sin x} < \frac{1}{\cos x} $$
Take the reciprocal (which flips the inequalities):
$$ 1 > \frac{\sin x}{x} > \cos x $$
As $x \to 0$, $\cos x \to 1$. By the Squeeze Theorem, $\frac{\sin x}{x}$ is forced to $1$.

**The $1^\infty$ Speed Limit**
Imagine a bank offering 100% interest. Compounded annually ($n=1$), your multiplier is $(1 + 1)^1 = 2$. Compounded monthly ($n=12$), it is $(1 + \frac{1}{12})^{12} \approx 2.61$. You might think compounding infinitely yields infinite money. It doesn't. The decreasing size of the fraction $\frac{1}{n}$ perfectly counteracts the increasing exponent $n$, creating a hard mathematical speed limit: $e$.

## Worked example
**Problem:** Evaluate $\lim_{x \to 0} \frac{1 - \cos x}{x}$.

**Step 1:** Recognize the $0/0$ indeterminate form. Multiply the numerator and denominator by the conjugate of the numerator.
$$ \lim_{x \to 0} \frac{1 - \cos x}{x} \cdot \frac{1 + \cos x}{1 + \cos x} $$

**Step 2:** Expand the numerator using the difference of squares.
$$ \lim_{x \to 0} \frac{1 - \cos^2 x}{x(1 + \cos x)} $$

**Step 3:** Apply the Pythagorean identity ($\sin^2 x = 1 - \cos^2 x$).
$$ \lim_{x \to 0} \frac{\sin^2 x}{x(1 + \cos x)} $$

**Step 4:** Factor the expression to isolate the known limit $\frac{\sin x}{x}$.
$$ \lim_{x \to 0} \left( \frac{\sin x}{x} \cdot \frac{\sin x}{1 + \cos x} \right) $$

**Step 5:** Evaluate the limits of the individual components.
$$ \left( \lim_{x \to 0} \frac{\sin x}{x} \right) \cdot \left( \lim_{x \to 0} \frac{\sin x}{1 + \cos x} \right) = (1) \cdot \left( \frac{0}{1 + 1} \right) = 1 \cdot 0 = 0 $$

*Reflection:* We cannot evaluate $0/0$ directly. By using the conjugate, we transformed the cosine expression into a sine expression, allowing us to extract the known $\frac{\sin x}{x}$ building block to resolve the indeterminacy.

## Diagrams
```text
SQUEEZE THEOREM GEOMETRY (Unit Circle, r=1)

y-axis
  ^
  |      Outer Triangle (Area = 1/2 * 1 * tan(x))
  |      .  \
  |      .    \
  |      .      \
  |      .        \
  |      .          \
  |      .            \
  |      . Sector       \ 
  |      . (1/2*x)        \
  |      . .                \
  |      .   . Inner Tri      \
  |      .     .(1/2*sin(x))    \
  |      .       .                \
  |      .         .                \
  |      .      x    .                \
  +-------------------------------------> x-axis
  (0,0)                (1,0)
```
*   **Inner Triangle:** Vertices at $(0,0)$, $(1,0)$, and $(\cos x, \sin x)$.
*   **Sector:** The wedge of the circle from $0$ to $x$.
*   **Outer Triangle:** Vertices at $(0,0)$, $(1,0)$, and $(1, \tan x)$.

## Memory technique — remember this forever
1. **Mnemonic:** "Sine and $x$ are twins at the origin" ($\sin x \approx x$). "Compound infinitely, hit the $e$-ceiling."
2. **Overlearn these formulas:**
   * $\lim_{x \to 0} \frac{\sin x}{x} = 1$
   * $\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$
   * $\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$
3. **Spaced-repetition schedule:** Review this derivation and these formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget $\frac{\sin x}{x} = 1$, draw the unit circle and compare the area of the inscribed triangle ($\frac{1}{2}\sin x$) to the sector ($\frac{1}{2}x$). If you forget $e$, calculate $(1 + \frac{1}{100})^{100}$ on a calculator to see it approaches $2.718$.

## Common mistakes
* **Using L'Hôpital's Rule for $\frac{\sin x}{x}$:** This is a catastrophic logical error (circular reasoning). You need $\lim_{x \to 0} \frac{\sin x}{x} = 1$ to prove that $\frac{d}{dx}\sin x = \cos x$. You cannot use the derivative to prove the limit that defines the derivative.
* **Working in degrees:** The limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$ is strictly false if $x$ is in degrees. (It evaluates to $\pi/180$). Calculus is done in radians because radians are dimensionless arc lengths, tying geometry directly to algebra.
* **Assuming $1^\infty = 1$:** Students see $(1 + \frac{1}{n})^n$, assume the inside goes to $1$, and conclude $1^\infty = 1$. $1^\infty$ is an indeterminate form. The base is strictly *greater* than 1 at all finite steps, which competes with the infinite exponent.

## Self-check
1. Evaluate $\lim_{x \to 0} \frac{\sin(7x)}{3x}$.
2. Evaluate $\lim_{n \to \infty} \left(1 + \frac{5}{n}\right)^n$.
3. Evaluate $\lim_{x \to 0} \frac{\tan(2x)}{x}$. *(Hint: Break tangent into sine and cosine).*