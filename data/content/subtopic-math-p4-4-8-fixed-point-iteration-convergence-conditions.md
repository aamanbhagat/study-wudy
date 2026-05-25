## What it is
Fixed-point iteration finds a solution to an equation of the form $x = g(x)$ by repeatedly applying the function $g$ to an initial guess, i.e., $x_{n+1} = g(x_n)$. The convergence conditions are a set of mathematical requirements on the function $g(x)$ and the starting interval that guarantee this iterative process will succeed and converge to the true solution.

## Why it matters
This concept is fundamental to solving nonlinear equations that appear everywhere, from finding stable orbits in celestial mechanics (e.g., solving Kepler's equation) to determining equilibrium states in chemical reactions and physics simulations. In machine learning, optimization algorithms like Expectation-Maximization can be viewed as a form of fixed-point iteration, where we seek a fixed point of a parameter update equation.

## When to study it
Before tackling this, you must have a firm grasp of single-variable calculus. Specifically, you need to understand:
1.  **Limits and Continuity:** The entire concept of convergence is defined by limits.
2.  **Derivatives:** The derivative of $g(x)$ is the central tool for analyzing convergence.
3.  **The Mean Value Theorem (MVT):** This theorem is not just useful; it is the theoretical engine that drives the proof of the primary convergence condition. If you are hazy on the MVT, review it first.

## How to study it (step by step)
1.  **Review the Mean Value Theorem.** State it precisely: If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists some $c \in (a, b)$ such that $f'(c) = \frac{f(b) - f(a)}{b - a}$. This is the key.
2.  **Derive the main convergence condition.** Let $p$ be the true fixed point, so $p = g(p)$. Define the error at step $n$ as $e_n = x_n - p$. Express the error at the next step, $e_{n+1} = x_{n+1} - p = g(x_n) - g(p)$, and apply the MVT to the right-hand side. This will directly link the new error to the old error via the derivative $g'(x)$.
3.  **Interpret the condition $|g'(x)| < 1$ geometrically.** Draw a graph of $y=x$ and a function $y=g(x)$ that has a shallow slope near their intersection. Trace the iteration path (a "cobweb" or "staircase" diagram) and see how it spirals inward. Do the same for a function with a steep slope ($|g'(x)| > 1$) and see how it spirals outward.
4.  **Solve one problem, two ways.** Take the equation $x^2 - x - 2 = 0$ (roots are -1 and 2). Rearrange it to $x = g_1(x) = x^2 - 2$ and $x = g_2(x) = \sqrt{x+2}$. Analyze $|g_1'(x)|$ and $|g_2'(x)|$ near the root $x=2$ to predict which will converge. Then, perform a few iterations for each starting at $x_0 = 2.5$ to confirm your prediction.
5.  **Formalize the conditions.** State the Fixed-Point Theorem, which combines two conditions: (i) $g$ maps an interval $[a,b]$ into itself, ensuring the iterates don't escape, and (ii) $|g'(x)| \le k < 1$ for all $x \in [a,b]$, ensuring the iteration contracts towards a unique fixed point.

## Key ideas, with intuition
1.  **The error must shrink with each step.** The goal is to get closer to the fixed point $p$. If the distance from the point at step $n$, $|x_n - p|$, is larger than the distance at step $n+1$, $|x_{n+1} - p|$, then we are making progress. The convergence condition is simply a guarantee that this shrinking happens.

2.  **The derivative is a shrinking/stretching factor.** The Mean Value Theorem provides the crucial link. Let $p$ be the fixed point.
    $$ x_{n+1} - p = g(x_n) - g(p) $$
    By the MVT, there exists a $\xi_n$ between $x_n$ and $p$ such that:
    $$ g(x_n) - g(p) = g'(\xi_n)(x_n - p) $$
    Therefore, the error propagates as:
    $$ e_{n+1} = g'(\xi_n) e_n $$
    For the error to shrink, $|e_{n+1}| < |e_n|$, we must have $|g'(\xi_n)| < 1$. If the slope of $g(x)$ near the fixed point has a magnitude less than 1, it acts as a contraction, pulling any nearby point closer.

3.  **Two conditions: staying in the game and winning the game.** For convergence to be guaranteed on an interval $[a, b]$, two things must happen:
    *   **Existence (Staying in):** The function must not send you outside the interval. For any $x \in [a, b]$, we require $g(x) \in [a, b]$. This ensures the next iteration $x_{n+1}$ is still in our trusted zone.
    *   **Uniqueness & Convergence (Winning):** The function must be a contraction on that interval. We require $|g'(x)| \le k < 1$ for all $x \in [a,b]$. This ensures the iterates get progressively closer to a single, unique fixed point within the interval.

## Worked example
Let's find the root of $f(x) = x^3 + 2x^2 - 5 = 0$ near $x=1.3$.

**Step 1: Rearrange $f(x)=0$ into the form $x=g(x)$.**
A bad choice: $x = \sqrt[3]{5 - 2x^2}$. The derivative will be large.
A good choice: Isolate the $2x^2$ term.
$2x^2 = 5 - x^3 \implies x^2 = \frac{5-x^3}{2} \implies x = \sqrt{\frac{5-x^3}{2}}$.
Let's use $g(x) = \sqrt{\frac{5-x^3}{2}}$.

**Step 2: Check the convergence condition $|g'(x)| < 1$.**
First, find the derivative using the chain rule.
$$ g'(x) = \frac{1}{2 \sqrt{\frac{5-x^3}{2}}} \cdot \left( -\frac{3x^2}{2} \right) = -\frac{3x^2}{4} \sqrt{\frac{2}{5-x^3}} $$
Now, evaluate this derivative near our expected root, $p \approx 1.3$.
$$ g'(1.3) = -\frac{3(1.3)^2}{4} \sqrt{\frac{2}{5-(1.3)^3}} = -\frac{3(1.69)}{4} \sqrt{\frac{2}{5-2.197}} = -1.2675 \sqrt{\frac{2}{2.803}} \approx -1.2675 \cdot 0.845 \approx -1.07 $$
This is a problem. $|g'(1.3)| \approx 1.07 > 1$. This form is unlikely to converge.

**Step 3: Try a different rearrangement.**
Let's isolate the $x^3$ term from $x^3 + 2x^2 - 5 = 0$.
$x^3 = 5 - 2x^2 \implies x = \frac{5 - 2x^2}{x^2} = \frac{5}{x^2} - 2$. This is also a poor choice.
Let's try isolating $x$ from the $2x^2$ term in a different way.
$x(x^2 + 2x) = 5 \implies x = \frac{5}{x^2+2x}$.
Let's use $g(x) = \frac{5}{x^2+2x}$.

**Step 4: Check the condition for the new $g(x)$.**
$$ g'(x) = -5(x^2+2x)^{-2}(2x+2) = -\frac{5(2x+2)}{(x^2+2x)^2} $$
Evaluate this near $x=1.3$:
$$ g'(1.3) = -\frac{5(2(1.3)+2)}{((1.3)^2+2(1.3))^2} = -\frac{5(4.6)}{(1.69+2.6)^2} = -\frac{23}{(4.29)^2} = -\frac{23}{18.4} \approx -0.427 $$
Since $|g'(1.3)| \approx 0.427 < 1$, this form should converge.

**Step 5: Perform the iteration.**
Let $x_0 = 1.3$.
$x_1 = g(x_0) = \frac{5}{(1.3)^2+2(1.3)} = \frac{5}{1.69+2.6} = \frac{5}{4.29} \approx 1.1655$
$x_2 = g(x_1) = \frac{5}{(1.1655)^2+2(1.1655)} = \frac{5}{1.358 + 2.331} = \frac{5}{3.689} \approx 1.3554$
$x_3 = g(x_2) = \frac{5}{(1.3554)^2+2(1.3554)} = \frac{5}{1.837 + 2.7108} = \frac{5}{4.5478} \approx 1.0994$
$x_4 = \dots \approx 1.405$
The process is oscillating but appears to be closing in on the true root, which is approximately $p \approx 1.24$. The choice of $g(x)$ is critical, and its derivative's magnitude near the root dictates success or failure.

## Diagrams

**Convergent Case: $|g'(x)| < 1$ (Cobweb Diagram)**
The iteration spirals inwards towards the fixed point $p$.

```text
      y
      |
      |     / y=x
      |    /
      |   /
 g(x) |  /--------. y=g(x)
      | /|        |
      |/ |        |
      *--+--------+-----> x
      | /|\       p
      |/ | `----,
      | /|     /
      |/ |    /
      '--+---'
     x1  x0
```

**Divergent Case: $|g'(x)| > 1$ (Spiral Diagram)**
The iteration spirals outwards, away from the fixed point $p$.

```text
        y
        |
        |           / y=x
        |          /
 y=g(x) |         /
 ,-----.|        /
 |      |       /
 |      |      /
-+------+-----*-----> x
        |     /|p
        |    / |
        |   /  |
        |  /   |
        | /    |
        |/     `----,
       x0          x1
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Gentle Slope Guarantees Goal."
    *   **Gentle Slope:** The magnitude of the derivative (the slope) must be less than 1. $|g'(x)| < 1$.
    *   **Guarantees:** This provides a sufficient condition for convergence.
    *   **Goal:** The iteration will find the goal, which is the fixed point.

2.  **Must-know formulas:**
    *   The iteration: $x_{n+1} = g(x_n)$
    *   The convergence condition: $|g'(x)| \le k < 1$ for $x$ in an interval containing the fixed point $p$.
    *   The error propagation: $|p - x_{n+1}| \le k |p - x_n|$.

3.  **Spaced Repetition Schedule:** Review this topic and re-derive the main result at **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget the exact condition, rebuild it.
    *   Start with the goal: We want the error to shrink. $|e_{n+1}| < |e_n|$.
    *   Define the error: $e_n = x_n - p$.
    *   Write the error at the next step using the iteration definition: $e_{n+1} = x_{n+1} - p = g(x_n) - p$.
    *   Since $p = g(p)$, you can write $e_{n+1} = g(x_n) - g(p)$.
    *   This expression, $g(x_n) - g(p)$, screams "Mean Value Theorem". Apply it: $g(x_n) - g(p) = g'(\xi)(x_n-p)$ for some $\xi$ between $x_n$ and $p$.
    *   Substitute back: $e_{n+1} = g'(\xi)e_n$.
    *   Take the magnitude: $|e_{n+1}| = |g'(\xi)||e_n|$.
    *   For $|e_{n+1}| < |e_n|$, you clearly need $|g'(\xi)| < 1$.

## Common mistakes
1.  **Checking the derivative at the wrong place.** You must check $|g'(x)| < 1$ in a neighborhood *of the fixed point*. Checking it at your initial guess $x_0$ is not sufficient, as the derivative might be different at the solution.
2.  **Incorrectly rearranging $f(x)=0$.** As the worked example shows, not all algebraic rearrangements to $x=g(x)$ are created equal. The art is in finding a $g(x)$ that has a "gentle slope."
3.  **Confusing Necessary vs. Sufficient.** The condition $|g'(x)| < 1$ is *sufficient* for convergence. If $|g'(p)|=1$, the test is inconclusive and the iteration might converge or diverge (very slowly). If $|g'(p)|>1$, it will diverge (unless $x_0 = p$).
4.  **Ignoring the existence condition.** For a formal proof, you must also show that $g$ maps your chosen interval back into itself. Forgetting this can lead to an iterate $x_k$ that lands outside the interval where the derivative condition holds.

## Self-check
1.  Consider the iteration $x_{n+1} = g(x_n)$ with $g(x) = 1 + \frac{1}{2}\sin(x)$. Does this iteration have a unique fixed point on the interval $[0, 2]$, and if so, will the iteration converge to it?
2.  The equation $e^x - 3x^2 = 0$ has a root between 0.5 and 1.5. Propose two different rearrangements of the form $x=g(x)$ and determine which one is suitable for finding this root using fixed-point iteration.
3.  Prove that if $g$ is continuously differentiable, $p=g(p)$, and $|g'(p)| > 1$, then there exists an interval $(p-\delta, p+\delta)$ such that for any initial guess $x_0$ in that interval (with $x_0 \neq p$), the sequence $|x_n - p|$ is strictly increasing.