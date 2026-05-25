## What it is
Continuity means you can draw a function's graph without lifting your pen from the paper. Mathematically, it means the behavior of a function as it approaches a specific point perfectly matches the actual, defined value of the function at that exact point. A discontinuity is a break in this graph, which manifests in three distinct ways: a missing point (removable), a sudden vertical shift (jump), or an explosion toward infinity (infinite).

## Why it matters
In physics and aerospace, continuous functions model physical realities. An aircraft's position and velocity must be continuous—objects do not teleport. However, discontinuities are equally vital: they model sudden, violent shifts. A shockwave in supersonic flight is modeled as a jump discontinuity in fluid density and pressure. In machine learning, continuity is a strict requirement for gradient descent; you cannot compute a reliable derivative (slope) to optimize a neural network if the loss landscape contains jumps or holes. 

## When to study it
You must study this immediately after mastering **Limits**. Specifically, you need a rock-solid understanding of left-hand limits, right-hand limits, two-sided limits, and how to evaluate limits of rational and piecewise functions. If you cannot confidently evaluate $\lim_{x \to a} f(x)$ algebraically, stop and review limits. 

## How to study it (step by step)
1. Memorize the strict 3-part formal definition of continuity at a point. Do not paraphrase it.
2. Draw a completely continuous curve, then manually erase or alter parts of it to create a hole (removable), a step (jump), and a vertical asymptote (infinite).
3. Translate your three drawings into limit notation. Write out exactly what is happening to $\lim_{x \to a^-} f(x)$ and $\lim_{x \to a^+} f(x)$ for each drawing.
4. Practice evaluating limits for piecewise functions exactly at their boundary points (where the rule changes).
5. Classify 5-10 rational functions by finding where the denominator is zero, taking limits at those points, and categorizing the resulting discontinuities.

## Key ideas, with intuition

**1. The Formal Definition of Continuity**
A function $f(x)$ is continuous at a point $x=a$ if and only if all three of the following conditions are met:
1. $f(a)$ is defined.
2. $\lim_{x \to a} f(x)$ exists.
3. $\lim_{x \to a} f(x) = f(a)$.

*Intuition:* The limit is the destination the path *suggests* you are going. The function value is where you *actually* arrive. For a function to be continuous, the suggested destination and the actual destination must be the exact same place.

**2. Removable Discontinuity (The Hole)**
This occurs when $\lim_{x \to a} f(x)$ exists (a finite number), but it does not equal $f(a)$. The function value $f(a)$ might be defined elsewhere, or it might be completely undefined.
*Intuition:* A missing bridge plank. The road approaches the exact same point from both sides, but the point itself is missing or displaced. You can "remove" the discontinuity by redefining $f(a)$ to equal the limit.

**3. Jump Discontinuity (The Step)**
This occurs when the left-hand limit and right-hand limit both exist (are finite numbers), but they are not equal:
$$ \lim_{x \to a^-} f(x) \neq \lim_{x \to a^+} f(x) $$
*Intuition:* A teleportation pad. The path suddenly shifts vertically. No single point can be redefined to fix this break.

**4. Infinite Discontinuity (The Wall)**
This occurs when at least one of the one-sided limits approaches positive or negative infinity:
$$ \lim_{x \to a^-} f(x) = \pm \infty \quad \text{or} \quad \lim_{x \to a^+} f(x) = \pm \infty $$
*Intuition:* A vertical asymptote. The function explodes up or down.

## Worked example
**Problem:** Let $f(x) = \begin{cases} \frac{x^2 - 9}{x - 3} & \text{if } x \neq 3 \\ 10 & \text{if } x = 3 \end{cases}$. Determine if $f(x)$ is continuous at $x=3$. If it is not, classify the type of discontinuity.

**Step 1: Check if $f(3)$ is defined.**
Based on the piecewise definition, $f(3) = 10$.
Condition 1 is met.

**Step 2: Check if $\lim_{x \to 3} f(x)$ exists.**
We evaluate the limit of the function as $x$ approaches 3. Since $x \neq 3$ during the limit process, we use the top rule:
$$ \lim_{x \to 3} \frac{x^2 - 9}{x - 3} $$
Direct substitution yields $\frac{0}{0}$. We factor the numerator:
$$ \lim_{x \to 3} \frac{(x - 3)(x + 3)}{x - 3} = \lim_{x \to 3} (x + 3) = 6 $$
The limit exists and equals 6. Condition 2 is met.

**Step 3: Compare the limit to the function value.**
$$ \lim_{x \to 3} f(x) = 6 \neq 10 = f(3) $$
Condition 3 fails. The function is discontinuous at $x=3$.

**Step 4: Classify the discontinuity.**
Because the two-sided limit exists (it equals 6) but does not match the function value, this is a **removable discontinuity**. 

*Reflection:* Factoring allowed us to bypass the $\frac{0}{0}$ indeterminate form to find the true trajectory of the function. Because the trajectory converged to a finite number (6), we knew it was a "hole" rather than an asymptote (infinite) or a step (jump).

## Diagrams

```text
1. REMOVABLE (Hole)        2. JUMP (Step)             3. INFINITE (Asymptote)
      y                          y                          y
      |                          |                          |      |
      |       o (a, L)           |       o (a, L2)          |      |
      |      / \                 |      /                   |      |
      |     /   \                |     /                    |    /   \
      |    /     \               |    /                     |   /     \
      |   /       \              |   * (a, L1)              |  /       \
      |  /         \             |    \                     | /         \
      | /           \            |     \                    |/           \
------|------|------x      ------|------|------x      ------|------|------x
             a                          a                          a
```

## Memory technique — remember this forever
1. **The Visual Hook:** The "Bridge Test". 
   * Left limit = West bridge span.
   * Right limit = East bridge span.
   * $f(a)$ = The final plank connecting them.
   * *Removable:* Spans align, plank is missing.
   * *Jump:* Spans don't align (earthquake).
   * *Infinite:* Spans curve up into space.
2. **The Formula to Overlearn:** The single equation $\lim_{x \to a} f(x) = f(a)$. If this holds, it is continuous. If it fails, the *way* it fails tells you the type of discontinuity.
3. **Spaced-repetition schedule:** Review this concept and re-draw the three graphs at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the classifications, ask yourself: "How can a pen leave the paper?" 
   * It skips a single dot $\rightarrow$ limit exists, point doesn't match $\rightarrow$ Removable.
   * It shifts up/down $\rightarrow$ limits exist but disagree $\rightarrow$ Jump.
   * It shoots off the page $\rightarrow$ limit is infinity $\rightarrow$ Infinite.

## Common mistakes
* **Assuming an undefined $f(a)$ implies an infinite discontinuity.** A zero in the denominator does not guarantee an asymptote. If the numerator is also zero, it is often a removable discontinuity (a hole). Always take the limit to check.
* **Failing to check both sides of a piecewise function.** Students often plug $x=a$ into one side of a piecewise boundary and assume continuity. You must explicitly calculate $\lim_{x \to a^-}$ and $\lim_{x \to a^+}$ using the respective pieces of the function.
* **Confusing "Limit Does Not Exist" (DNE).** Both Jump and Infinite discontinuities mean the two-sided limit DNE. You must dig deeper into *why* it DNE (disagreeing finite limits vs. infinite limits) to classify it correctly.

## Self-check
1. Classify the discontinuity of $f(x) = \frac{x^2 - 1}{x - 1}$ at $x=1$. 
2. Find the value of the constant $c$ that makes $f(x)$ continuous everywhere: 
   $f(x) = \begin{cases} cx^2 + 2x & \text{if } x < 2 \\ x^3 - cx & \text{if } x \ge 2 \end{cases}$
3. Determine all points of discontinuity for $f(x) = \frac{x - 4}{x^2 - 16}$. Classify each point as removable, jump, or infinite.