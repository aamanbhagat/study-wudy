## What it is
An improper integral is a definite integral where the standard rules of integration don't immediately apply. This happens for one of two reasons: either the interval of integration is infinite (Type I), or the function being integrated has an infinite discontinuity (a vertical asymptote) within the interval (Type II).

## Why it matters
Improper integrals are essential for modeling phenomena over unbounded domains. In probability, the total probability of a continuous random variable is found by integrating its probability density function from $-\infty$ to $\infty$, which must equal 1. In physics, calculating the escape velocity of a rocket requires integrating the force of gravity over an infinite distance.

## When to study it
Before tackling this, you must have mastered:
1.  **Definite Integrals:** The concept of the integral as the area under a curve and the Fundamental Theorem of Calculus.
2.  **Limits:** Specifically, limits as a variable approaches infinity ($ \lim_{x \to \infty} f(x) $) and limits as a variable approaches a finite number where a function is undefined ($ \lim_{x \to a} f(x) $).

If you are not fluent in both of these, stop and review them now. There is no way to understand improper integrals without a firm grasp of limits.

## How to study it (step by step)
1.  **Redefine the problem.** Start with a Type I integral, $\int_a^\infty f(x) \, dx$. Recognize that you cannot directly substitute $\infty$. The core move is to replace infinity with a finite variable, $t$, and then see what happens as $t$ approaches infinity.
2.  **Derive the definition.** Formulate the idea from step 1 into a precise definition: $\int_a^\infty f(x) \, dx \equiv \lim_{t \to \infty} \int_a^t f(x) \, dx$. This turns an "improper" problem into a standard definite integral followed by a limit calculation.
3.  **Solve canonical examples.** Calculate $\int_1^\infty \frac{1}{x^2} \, dx$ and $\int_1^\infty \frac{1}{x} \, dx$. The first converges to a finite value, while the second diverges to infinity. Internalize why one function shrinks "fast enough" to have finite area while the other does not. This is the central tension of the topic.
4.  **Extend to Type II.** Apply the same logic to a function with a vertical asymptote. For an integral $\int_a^b f(x) \, dx$ where $f(x)$ is discontinuous at $x=b$, replace the "problem point" $b$ with a variable $t$. The definition becomes $\int_a^b f(x) \, dx \equiv \lim_{t \to b^-} \int_a^t f(x) \, dx$. The notation $t \to b^-$ is critical; we must approach from within the interval.
5.  **Solve canonical Type II examples.** Calculate $\int_0^1 \frac{1}{\sqrt{x}} \, dx$ and $\int_0^1 \frac{1}{x} \, dx$. Again, observe the convergence/divergence dichotomy.
6.  **Master the "split".** For integrals with two problem points (e.g., $\int_{-\infty}^\infty f(x) \, dx$ or $\int_0^2 \frac{1}{x-1} \, dx$), you *must* split the integral into two separate improper integrals at an arbitrary finite point $c$. For the original integral to converge, *both* resulting integrals must converge independently.

## Key ideas, with intuition
1.  **Replace the problem, then take a limit.** This is the fundamental technique. Whether the problem is an infinite bound or a vertical asymptote, you replace it with a variable, perform a standard integration, and then evaluate the limit as the variable approaches the original problem point. You are asking, "What value does the area *approach*?"
    $$ \underbrace{\int_1^\infty \frac{1}{x^2} \, dx}_{\text{Improper Integral}} \quad \rightarrow \quad \underbrace{\lim_{t \to \infty} \int_1^t \frac{1}{x^2} \, dx}_{\text{Limit of Proper Integrals}} $$

2.  **Convergence vs. Divergence.** An improper integral either **converges** to a finite number or **diverges** (goes to $\pm\infty$ or does not exist). Intuitively, for an infinite region to have a finite area, the function's height must decrease "fast enough" to zero. The function $f(x) = 1/x^2$ decays quickly enough for its infinite tail to have a finite area (1). The function $f(x) = 1/x$ does not.

3.  **Splitting is non-negotiable.** If an integral has more than one "improper" feature, it must be broken apart. For example, to evaluate $\int_{-\infty}^\infty f(x) \, dx$, you must choose a constant $c$ (often $c=0$) and evaluate two separate limits:
    $$ \int_{-\infty}^\infty f(x) \, dx = \lim_{a \to -\infty} \int_a^c f(x) \, dx + \lim_{b \to \infty} \int_c^b f(x) \, dx $$
    If either piece diverges, the whole integral diverges. You cannot combine them into a single symmetric limit.

## Worked example
Evaluate $\int_0^\infty x e^{-x^2} \, dx$.

**Step 1: Identify the impropriety.**
The upper limit of integration is $\infty$. This is a Type I improper integral.

**Step 2: Rewrite as a limit.**
Replace $\infty$ with a variable $t$ and write the integral as a limit.
$$ \int_0^\infty x e^{-x^2} \, dx = \lim_{t \to \infty} \int_0^t x e^{-x^2} \, dx $$

**Step 3: Evaluate the definite integral.**
Focus on the integral part: $\int_0^t x e^{-x^2} \, dx$. This is a candidate for u-substitution.
Let $u = -x^2$. Then $du = -2x \, dx$, which means $x \, dx = -\frac{1}{2} du$.
We must also change the limits of integration:
- When $x=0$, $u = -0^2 = 0$.
- When $x=t$, $u = -t^2$.

The integral becomes:
$$ \int_0^{-t^2} e^u \left(-\frac{1}{2} du\right) = -\frac{1}{2} \int_0^{-t^2} e^u \, du = -\frac{1}{2} [e^u]_0^{-t^2} $$
$$ = -\frac{1}{2} (e^{-t^2} - e^0) = -\frac{1}{2} (e^{-t^2} - 1) = \frac{1}{2} (1 - e^{-t^2}) $$

**Step 4: Evaluate the limit.**
Now substitute this result back into the limit expression from Step 2.
$$ \lim_{t \to \infty} \frac{1}{2} (1 - e^{-t^2}) $$
As $t \to \infty$, $t^2 \to \infty$, so $-t^2 \to -\infty$. The term $e^{-t^2}$ approaches $e^{-\infty}$, which is 0.
$$ = \frac{1}{2} (1 - 0) = \frac{1}{2} $$

**Reflection:**
The integral converges to $\frac{1}{2}$. Each step had a clear purpose. Step 1 identified the problem. Step 2 translated the improper integral into the language of limits, which is the core definition. Step 3 used a standard integration technique (u-substitution) to find the area over the finite interval $[0, t]$. Step 4 completed the process by evaluating the limit to find what value this finite area approaches as the interval becomes infinite.

## Diagrams
**Type I: Infinite Limit**
This shows the area under $y = f(x)$ from $a$ to $\infty$. We compute the shaded area up to a moving boundary $t$, then take the limit as $t \to \infty$.

```text
      y
      |
      | f(x)
      |..
      |: ` .
      |:   ` .
      |:     ` .
      |:       `................
      |:SHADED::.
 -----+------------------------------> x
      a         t -> inf
```

**Type II: Discontinuous Integrand**
This shows the area under $y = f(x)$ from $a$ to $b$, where there is a vertical asymptote at $x=a$. We compute the shaded area from a moving boundary $t$ to $b$, then take the limit as $t \to a^+$.

```text
      y
      | .
      | :
      | :
      | :       SHADED
      | :       ::::::::
      | :       ::::::::
      | :       ::::::::
      | :       ::::::::
 -----+------------------------------> x
      a         b
      ^
      |
      t -> a+
```

## Memory technique — remember this forever
1.  **The Story: Taming Infinity.** An integral is a sum. You can't sum up an infinite number of things over an infinite space directly. The trick is to **tame infinity**: put a temporary, finite boundary on it ($t$), do your sum (integrate), and then see what happens when you let the boundary run away towards the problem point (take the limit). This works for both infinite tails (Type I) and infinite spikes (Type II).

2.  **Formulas to Overlearn:**
    *   Type I (Infinite upper limit): $$ \int_a^\infty f(x) \, dx = \lim_{t \to \infty} \int_a^t f(x) \, dx $$
    *   Type II (Discontinuity at $b$): $$ \int_a^b f(x) \, dx = \lim_{t \to b^-} \int_a^t f(x) \, dx $$

3.  **Spaced Repetition Schedule:** Review these definitions and solve one problem of each type on Day 1, Day 3, Day 7, Day 16, and Day 35.

4.  **First Principles Pathway:** If you forget the formula, re-derive it. A definite integral $\int_a^b$ is the limit of a Riemann sum over the interval $[a, b]$. You cannot define a Riemann sum over an infinite interval. The only logical way forward is to define it over a finite interval $[a, t]$ and then take the limit of that result as $t \to \infty$. This naturally rebuilds the definition.

## Common mistakes
1.  **Plugging in $\infty$.** Never write expressions like $[-\frac{1}{x}]_1^\infty$ or "$\frac{1}{\infty}$". These are meaningless. Always use the formal limit notation. The process is `integral -> limit of integral -> evaluate integral -> evaluate limit`.
2.  **Ignoring discontinuities.** A very common trap is an integral like $\int_{-1}^1 \frac{1}{x^2} \, dx$. The integrand has a vertical asymptote at $x=0$, which is inside the interval. You *must* split this into $\int_{-1}^0 \frac{1}{x^2} \, dx + \int_0^1 \frac{1}{x^2} \, dx$ and evaluate each as a separate limit. Simply integrating and plugging in the endpoints will give a wrong answer.
3.  **Incorrectly combining limits.** For an integral like $\int_{-\infty}^\infty x \, dx$, it is incorrect to write $\lim_{t \to \infty} \int_{-t}^t x \, dx = \lim_{t \to \infty} [\frac{x^2}{2}]_{-t}^t = \lim_{t \to \infty} (\frac{t^2}{2} - \frac{(-t)^2}{2}) = 0$. You must split it at $x=0$. Both $\int_0^\infty x \, dx$ and $\int_{-\infty}^0 x \, dx$ diverge, so the original integral diverges.

## Self-check
1.  Determine if $\int_1^\infty \frac{1}{x\sqrt{x}} \, dx$ converges or diverges. If it converges, find its value.
2.  Evaluate $\int_0^5 \frac{1}{\sqrt[3]{5-x}} \, dx$.
3.  Does $\int_0^\infty \frac{1}{x^2+1} \, dx$ converge or diverge? Explain your reasoning and find its value if it converges.