## What it is
Infinite limits describe a function whose output explodes toward positive or negative infinity as the input approaches a specific, finite value. Limits at infinity describe the behavior of a function's output as the input grows endlessly large in either the positive or negative direction. Geometrically, infinite limits manifest as vertical asymptotes, while limits at infinity manifest as horizontal asymptotes.

## Why it matters
In physics, infinite limits often represent singularities—such as the gravitational force $F \propto 1/r^2$ exploding as distance $r \to 0$. Limits at infinity define steady-state behaviors, such as terminal velocity in fluid dynamics or a spacecraft's escape velocity as distance approaches infinity. In machine learning, limits at infinity dictate the bounds of activation functions; the sigmoid function approaches $1$ as $x \to \infty$ and $0$ as $x \to -\infty$, squashing infinite domains into usable probabilities.

## When to study it
You must already understand:
1. The intuitive and graphical definition of a limit.
2. How to evaluate finite limits using direct substitution and algebraic manipulation (factoring, conjugate method).
3. The distinction between a zero in the numerator ($0/k = 0$) and a zero in the denominator ($k/0$, which requires further analysis).

If you cannot confidently factor polynomials or simplify complex fractions, review precalculus algebra first.

## How to study it (step by step)
1. **Master the "Tiny/Huge" principle:** Understand that dividing a constant by a vanishingly small number yields a massive number. Evaluate $\lim_{x \to 0^+} 1/x$ and $\lim_{x \to 0^-} 1/x$ by plugging in $0.1, 0.01, 0.001$.
2. **Formalize Vertical Asymptotes:** Learn to identify where denominators equal zero, and test the left- and right-hand limits to see if the function shoots to $+\infty$ or $-\infty$.
3. **Master the "Dominant Term" principle:** For limits at infinity ($\lim_{x \to \pm\infty}$), recognize that highest-degree terms dwarf all others. $x^3$ makes $1000x^2$ irrelevant as $x \to \infty$.
4. **Formalize Horizontal Asymptotes:** Practice dividing the numerator and denominator of a rational function by the highest power of $x$ in the denominator to rigorously prove its limit at infinity.
5. **Handle Radicals at Infinity:** Practice limits involving $\sqrt{x^2}$ as $x \to -\infty$. This is where most students fail due to sign errors.

## Key ideas, with intuition

**1. The Engine of Vertical Asymptotes (Infinite Limits)**
If $\lim_{x \to a} f(x) = \pm\infty$, the line $x = a$ is a vertical asymptote. This happens when the denominator of a fraction shrinks to zero while the numerator approaches a non-zero constant.
*Intuition:* $\frac{\text{Finite}}{\text{Infinitesimal}} = \text{Infinity}$. The sign ($\pm$) depends on whether the infinitesimal is positive or negative.

**2. The Engine of Horizontal Asymptotes (Limits at Infinity)**
If $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$, the line $y = L$ is a horizontal asymptote. 
*Intuition:* As $x$ gets massive, constants and lower-order terms stop mattering. In the function $f(x) = \frac{3x^2 + 2x}{x^2 - 5}$, the $+2x$ and $-5$ are microscopic noise when $x = 1,000,000$. The function is effectively $\frac{3x^2}{x^2} = 3$.

**3. The Fundamental Limit at Infinity**
For any rational number $r > 0$:
$$ \lim_{x \to \infty} \frac{1}{x^r} = 0 $$
If $r > 0$ is a rational number such that $x^r$ is defined for all $x$, then $\lim_{x \to -\infty} \frac{1}{x^r} = 0$.

## Worked example
**Problem:** Find the vertical and horizontal asymptotes of $f(x) = \frac{2x^2 - 8}{x^2 - x - 2}$.

**Step 1: Factor to find domain restrictions (Vertical Asymptotes).**
$$ f(x) = \frac{2(x^2 - 4)}{(x-2)(x+1)} = \frac{2(x-2)(x+2)}{(x-2)(x+1)} $$
The denominator is zero at $x = 2$ and $x = -1$.

**Step 2: Test the restrictions for infinite limits.**
At $x = 2$, the $(x-2)$ terms cancel. 
$$ \lim_{x \to 2} f(x) = \lim_{x \to 2} \frac{2(x+2)}{x+1} = \frac{2(4)}{3} = \frac{8}{3} $$
Because the limit is finite, $x=2$ is a *removable discontinuity* (a hole), NOT a vertical asymptote.

At $x = -1$, the numerator approaches $2(-1+2) = 2$, and the denominator approaches $0$.
$$ \lim_{x \to -1^+} \frac{2(x+2)}{x+1} = \frac{2(\text{positive})}{\text{tiny positive}} = +\infty $$
$$ \lim_{x \to -1^-} \frac{2(x+2)}{x+1} = \frac{2(\text{positive})}{\text{tiny negative}} = -\infty $$
Because the limits are infinite, **$x = -1$ is a vertical asymptote.**

**Step 3: Evaluate limits at infinity (Horizontal Asymptotes).**
Divide every term by $x^2$ (the highest power in the denominator):
$$ \lim_{x \to \infty} \frac{\frac{2x^2}{x^2} - \frac{8}{x^2}}{\frac{x^2}{x^2} - \frac{x}{x^2} - \frac{2}{x^2}} = \lim_{x \to \infty} \frac{2 - \frac{8}{x^2}}{1 - \frac{1}{x} - \frac{2}{x^2}} $$
As $x \to \infty$, all terms with $x$ in the denominator go to $0$.
$$ \frac{2 - 0}{1 - 0 - 0} = 2 $$
The limit as $x \to -\infty$ yields the exact same result. Thus, **$y = 2$ is a horizontal asymptote.**

*Reflection:* Factoring first prevented us from falsely identifying $x=2$ as a vertical asymptote. Dividing by the highest power of $x$ rigorously proved the horizontal asymptote without hand-waving.

## Diagrams

The classic hyperbola $f(x) = \frac{1}{x}$, demonstrating both concepts.

```text
          y
          ^
          |      |  f(x) = 1/x
          |      |
          |      *
          |      | \
          |      |   \
----------+------+------*-----------> x
          |      |        \
          |      |          *------ Horizontal Asymptote: 
          |      |                    lim_{x->∞} f(x) = 0
          |      |
 Vertical Asymptote:
 lim_{x->0^+} f(x) = ∞
```

## Memory technique — remember this forever
**1. The Mnemonic:** 
* "Limits **AT** infinity look **AT** the horizon." (Horizontal Asymptotes).
* "Infinite limits shoot to the stars or fall to the core." (Vertical Asymptotes).

**2. The Core Facts to Overlearn:**
* $\frac{k}{0} \implies \text{Vertical Asymptote}$ (if $k \neq 0$).
* $\frac{0}{0} \implies \text{More work needed}$ (usually a hole).
* $\sqrt{x^2} = |x|$. If $x \to -\infty$, then $\sqrt{x^2} = -x$.

**3. Spaced Repetition Schedule:**
Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:**
If you forget the shortcut rules for horizontal asymptotes (comparing degrees), you can *always* derive the answer by dividing the numerator and denominator by the highest power of $x$ found in the denominator. This forces all lower-degree terms to become fractions over $x$, which safely vanish to zero.

## Common mistakes
1. **Assuming zero in the denominator guarantees a vertical asymptote.** It does not. If the numerator is also zero, it is often a removable discontinuity (a hole). Always check the limit.
2. **Believing a function cannot cross its horizontal asymptote.** A function can cross its horizontal asymptote infinitely many times (e.g., $f(x) = \frac{\sin x}{x}$). A horizontal asymptote only dictates the *end behavior* as $x \to \pm\infty$, not the local behavior.
3. **Dropping the negative sign in radical limits.** When evaluating $\lim_{x \to -\infty} \frac{x}{\sqrt{x^2 + 1}}$, students pull $x^2$ out of the root as $x$. It must be $|x|$, which evaluates to $-x$ because $x$ is negative. The limit is $-1$, not $1$.

## Self-check
1. Find all vertical and horizontal asymptotes of $f(x) = \frac{4x^2 - 9}{2x^2 + 5x - 12}$.
2. Evaluate $\lim_{x \to -\infty} \frac{3x - 2}{\sqrt{9x^2 + 4}}$. (Watch your signs carefully).
3. Construct a rational function $g(x)$ that has a vertical asymptote at $x = 4$, a hole at $x = -2$, and a horizontal asymptote at $y = 5$.