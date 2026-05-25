## What it is
Curve sketching is a systematic process for producing a qualitative, accurate graph of a function using its analytical properties. Instead of plotting many points, we use calculus—specifically the first and second derivatives—to find the function's essential features: where it increases or decreases, its local extrema, its concavity, and its end behavior.

## Why it matters
This is not just about drawing graphs. In machine learning, you sketch loss functions to understand how optimization algorithms find minima. In aerospace, you sketch the trajectory of a rocket to find its maximum altitude (apogee) or analyze its stability by examining the potential energy function, where local minima correspond to stable equilibrium points.

## When to study it
Before tackling this, you must have a firm grasp of the following. If any of these are weak, review them first.
*   **Functions:** Domain, range, intercepts, and symmetry.
*   **Limits:** Including limits at infinity to find horizontal asymptotes.
*   **Continuity:** Identifying vertical asymptotes.
*   **Derivatives:** All differentiation rules (power, product, quotient, chain).
*   **First Derivative Test:** Finding critical points ($f'(x)=0$ or DNE) and using them to determine intervals of increase/decrease and locate local extrema.
*   **Second Derivative Test:** Finding possible inflection points ($f''(x)=0$ or DNE) and using them to determine intervals of concavity.

## How to study it (step by step)
1.  **Isolate the tools.** Review the First Derivative Test. Solve 5 problems where you only find critical points and intervals of increase/decrease. Do the same for the Second Derivative Test, finding only inflection points and concavity. Keep them separate to build mastery.
2.  **Create a checklist.** Synthesize your knowledge into a single, ordered checklist. Start with pre-calculus items (domain, intercepts, asymptotes) and then add the calculus steps (first derivative analysis, second derivative analysis).
3.  **Sketch a polynomial.** Use your checklist to sketch a simple cubic or quartic polynomial, like $f(x) = x^4 - 4x^3$. This isolates the derivative analysis without the complexity of asymptotes.
4.  **Sketch a rational function.** Now, apply the full checklist to a rational function, like $f(x) = \frac{x+1}{x^2}$. This forces you to integrate pre-calculus skills (asymptotes) with the calculus steps.
5.  **Analyze the "DNE" cases.** Find and sketch a function with a cusp (where $f'$ is undefined), such as $f(x) = x^{2/3}$. This is a common point of failure and requires careful handling of the domain of the derivative.
6.  **Synthesize.** Pick a function from your physics or engineering textbook and attempt to sketch it. The goal is not a perfect drawing, but a correct qualitative analysis of its behavior.

## Key ideas, with intuition
1.  **The First Derivative is the "Direction" Function.** The sign of $f'(x)$ tells you the direction of the curve. If $f'(x) > 0$, the original function $f(x)$ is increasing (moving up and to the right). If $f'(x) < 0$, it's decreasing. A critical point, where $f'(x)=0$ or is undefined, is a location where the direction *might* change, like the peak of a hill or the bottom of a valley.
    $$f'(x) > 0 \implies f(x) \text{ is increasing}$$
    $$f'(x) < 0 \implies f(x) \text{ is decreasing}$$

2.  **The Second Derivative is the "Curvature" Function.** The sign of $f''(x)$ tells you the concavity of the curve. If $f''(x) > 0$, the curve is concave up (shaped like a 'U', holding water). This means the slope, $f'(x)$, is increasing. If $f''(x) < 0$, the curve is concave down (shaped like an 'n', spilling water), and the slope is decreasing. An inflection point, where $f''(x)=0$ or is undefined, is where the curvature *might* change.
    $$f''(x) > 0 \implies f(x) \text{ is concave up}$$
    $$f''(x) < 0 \implies f(x) \text{ is concave down}$$

3.  **Asymptotes are the "Scaffolding".** Before you draw the curve, you must draw its boundaries. Vertical, horizontal, and slant asymptotes are lines that the function approaches but typically does not cross. They define the large-scale structure and end behavior of the graph, providing a frame within which to draw the details found by the derivatives.

## Worked example
Let's sketch the graph of $f(x) = \frac{2x^2}{x^2 - 1}$.

**Step 1: Pre-Calculus Analysis (Domain, Intercepts, Asymptotes)**
*   **Domain:** The denominator cannot be zero, so $x^2 - 1 \neq 0 \implies x \neq \pm 1$. The domain is $(-\infty, -1) \cup (-1, 1) \cup (1, \infty)$.
*   **Intercepts:**
    *   y-intercept (set $x=0$): $f(0) = \frac{0}{-1} = 0$. The point is $(0,0)$.
    *   x-intercept (set $f(x)=0$): $\frac{2x^2}{x^2 - 1} = 0 \implies 2x^2 = 0 \implies x=0$. The point is $(0,0)$.
*   **Symmetry:** $f(-x) = \frac{2(-x)^2}{(-x)^2 - 1} = \frac{2x^2}{x^2 - 1} = f(x)$. The function is even, symmetric about the y-axis.
*   **Asymptotes:**
    *   Vertical Asymptotes: Occur where the denominator is zero, at $x=1$ and $x=-1$.
    *   Horizontal Asymptote: We check the limit as $x \to \infty$. $\lim_{x \to \infty} \frac{2x^2}{x^2 - 1} = \lim_{x \to \infty} \frac{2}{1 - 1/x^2} = 2$. So, $y=2$ is a horizontal asymptote.

**Step 2: First Derivative Analysis (Increasing/Decreasing, Local Extrema)**
*   Find $f'(x)$ using the quotient rule:
    $$f'(x) = \frac{(4x)(x^2 - 1) - (2x^2)(2x)}{(x^2 - 1)^2} = \frac{4x^3 - 4x - 4x^3}{(x^2 - 1)^2} = \frac{-4x}{(x^2 - 1)^2}$$
*   **Critical Points:** Set $f'(x)=0 \implies -4x = 0 \implies x=0$. The derivative is undefined at $x=\pm 1$, but these are not in the domain, so they are not critical points. The only critical point is $x=0$.
*   **Intervals:** We test points around the critical point and VAs: $(-\infty, -1)$, $(-1, 0)$, $(0, 1)$, $(1, \infty)$.
    *   $x=-2$: $f'(-2) = \frac{8}{9} > 0$ (Increasing)
    *   $x=-0.5$: $f'(-0.5) = \frac{2}{(0.75)^2} > 0$ (Increasing)
    *   $x=0.5$: $f'(0.5) = \frac{-2}{(0.75)^2} < 0$ (Decreasing)
    *   $x=2$: $f'(2) = \frac{-8}{9} < 0$ (Decreasing)
*   **Local Extrema:** At $x=0$, the function changes from increasing to decreasing. Thus, there is a local maximum at $(0, f(0)) = (0,0)$.

**Step 3: Second Derivative Analysis (Concavity, Inflection Points)**
*   Find $f''(x)$ using the quotient rule on $f'(x)$:
    $$f''(x) = \frac{(-4)(x^2 - 1)^2 - (-4x)(2(x^2 - 1)(2x))}{(x^2 - 1)^4} = \frac{-4(x^2 - 1) + 16x^2}{(x^2 - 1)^3} = \frac{12x^2 + 4}{(x^2 - 1)^3}$$
*   **Possible Inflection Points:** Set $f''(x)=0 \implies 12x^2+4=0$. This has no real solutions. The second derivative is undefined at $x=\pm 1$, which are not in the domain. Thus, there are no inflection points.
*   **Intervals:** We test points around the VAs: $(-\infty, -1)$, $(-1, 1)$, $(1, \infty)$.
    *   $x=-2$: $f''(-2) = \frac{52}{27} > 0$ (Concave Up)
    *   $x=0$: $f''(0) = \frac{4}{-1} < 0$ (Concave Down)
    *   $x=2$: $f''(2) = \frac{52}{27} > 0$ (Concave Up)

**Step 4: Sketch the Graph**
1.  Draw the asymptotes: dashed vertical lines at $x=\pm 1$ and a dashed horizontal line at $y=2$.
2.  Plot the intercept/critical point: $(0,0)$.
3.  For $x \in (-\infty, -1)$: Increasing and Concave Up. Start near $y=2$, go up towards the VA at $x=-1$.
4.  For $x \in (-1, 0)$: Increasing and Concave Down. Start from $-\infty$ at the VA $x=-1$, curve up to the maximum at $(0,0)$.
5.  For $x \in (0, 1)$: Decreasing and Concave Down. Go down from $(0,0)$ towards $-\infty$ at the VA $x=1$.
6.  For $x \in (1, \infty)$: Decreasing and Concave Up. Start from $+\infty$ at the VA $x=1$ and curve down, approaching the HA $y=2$.

*Reflection:* Each step built upon the last. The pre-calculus analysis gave us the frame (asymptotes). The first derivative gave us the direction of the curve within that frame. The second derivative gave us the shape (curvature) of the curve as it moved in that direction.

## Diagrams
A summary of how the first and second derivatives determine the shape of the curve $f(x)$:

```text
       f'(x) > 0 (Incr)   f'(x) < 0 (Decr)
        +----------------+----------------+
f''(x)>0|      /         |         \      |
(Concave|     /          |          \     |
   Up)  |    /           |           `-.  |
        +----------------+----------------+
f''(x)<0|   .´           |           \    |
(Concave|  /             |            \   |
  Down) | /              |             \  |
        +----------------+----------------+
```

Sketch for $f(x) = \frac{2x^2}{x^2 - 1}$:

```text
      y
      ^
      |
      |          :                  :
 y=2  + - - - - -|- - - - - - - - - -|- - - - - >
      |        .´:`.                :`.
      |      .´  :  `.            .´  :
      |    .´    :    `.        .´    :
 -----|----------O----------:----------+----- x
      |          :  (0,0)   `.    .´    :
      |          :          `-.´      :
      |          :            `       :
      |          :                    :
                x=-1                 x=1
```

## Memory technique — remember this forever
1.  **Mnemonic:** "D.A.I.S.I.C." (pronounced "daisic"). This is your ordered checklist.
    *   **D**omain
    *   **A**symptotes & **I**ntercepts
    *   **S**ign of first derivative (Increase/Decrease)
    *   **I**ntervals of concavity (from second derivative)
    *   **C**ritical points & sketch

2.  **Must-know formulas:**
    *   $f'(x)$ determines slope: $f'(x)>0 \implies$ increasing, $f'(x)<0 \implies$ decreasing.
    *   $f''(x)$ determines concavity: $f''(x)>0 \implies$ concave up, $f''(x)<0 \implies$ concave down.

3.  **Spaced Repetition Schedule:**
    *   Review your DAISIC checklist and the two key facts above in **1 day**.
    *   Work a new rational function problem in **3 days**.
    *   Work a function with a radical or trig function in **7 days**.
    *   Review the entire process in **16 days**.
    *   Teach the concept to a friend or write it out from memory in **35 days**.

4.  **First Principles Pathway:** If you forget everything, remember what a derivative *is*. $f'(a)$ is the slope of the tangent line to $f(x)$ at $x=a$. If the slope is positive, the line goes up, so the function must be increasing. If the slope is negative, the line goes down, so the function must be decreasing. The second derivative, $f''(x)$, is the derivative of the slope function $f'(x)$. If $f''(x) > 0$, it means the *slope is increasing*—it's getting less negative or more positive, which forces the curve to bend upwards (concave up).

## Common mistakes
1.  **Ignoring the "DNE" cases.** Students correctly find where $f'(x)=0$ but forget to check where $f'(x)$ is undefined (e.g., for functions like $f(x)=x^{1/3}$). These are also critical points.
2.  **Confusing $f(x)$, $f'(x)$, and $f''(x)$.** A common error is to evaluate $f(x)$ when testing intervals for $f'(x)$. Always plug your test points into the specific function you are analyzing (the first derivative for slope, the second for concavity).
3.  **Sloppy interval testing.** Choosing test points that are not in the domain of the function, or making algebraic errors when evaluating the sign of the derivatives. Be systematic. Draw a number line for $f'$ and another for $f''$.
4.  **Assuming all critical points are extrema.** A critical point where $f'(x)=0$ is only a *candidate* for an extremum. The derivative must change sign across the point for it to be a local max or min (e.g., $f(x)=x^3$ has a critical point at $x=0$ but no extremum).

## Self-check
1.  Use the systematic approach to sketch $f(x) = x^3 - 3x^2 + 4$.
2.  Sketch $g(x) = \frac{x^2+x-2}{x^2-1}$. Pay close attention to the domain and how it differs from vertical asymptotes.
3.  Sketch $h(t) = t + \cos(t)$ on the interval $[0, 2\pi]$. How does the periodic nature of the cosine function affect the sketch?