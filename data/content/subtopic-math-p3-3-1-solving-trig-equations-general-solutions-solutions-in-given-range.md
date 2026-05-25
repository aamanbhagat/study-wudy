## What it is
Solving a trigonometric equation means finding the specific angles that make an equation involving trigonometric functions true. Because trigonometric functions are periodic, these equations naturally have an infinite number of solutions, known as the "general solution." Finding solutions in a "given range" requires calculating the general solution first, then applying inequalities to filter out the specific angles that fall within a defined boundary.

## Why it matters
In physics and engineering, oscillatory behavior is everywhere. If you are calculating the exact time a satellite in a sinusoidal orbit crosses the equator, or determining when an alternating current circuit hits a threshold voltage to trigger a logic gate, you are solving trig equations. The general solution gives you every instance in time this event will ever happen; the bounded solution tells you when it happens during your specific mission window.

## When to study it
Do not attempt this until you have absolute fluency in:
1. The unit circle (radians, coordinates, and quadrants).
2. Inverse trigonometric functions and their principal domains.
3. Basic algebraic manipulation (factoring quadratics).
4. Core trigonometric identities (Pythagorean, double-angle, and angle addition). 
If you cannot instantly state that $\sin(5\pi/6) = 1/2$ or factor $2x^2 - x - 1 = 0$, go back and master those first.

## How to study it (step by step)
1. **Master the principal value:** Understand that $\arcsin(x)$, $\arccos(x)$, and $\arctan(x)$ output exactly *one* angle (the principal value, $\alpha$). 
2. **Visualize the symmetries:** Draw a unit circle. For any value $k \in [-1, 1]$, draw the line $y = k$ (for sine) or $x = k$ (for cosine). Observe how it intersects the circle twice. These are your two base solutions.
3. **Derive the general formulas:** Write down the algebraic expressions that capture the two intersections plus infinite rotations ($+ 2n\pi$). 
4. **Practice linear trig equations:** Solve equations of the form $a \sin(x) + b = 0$. Write the general solution, then plug in integers for $n$ to find solutions in a range like $[0, 2\pi]$.
5. **Handle multiple angles:** Solve equations like $\cos(3x) = 0.5$. *Crucial:* Find the general solution for $3x$ first, *then* divide the entire equation by 3.
6. **Integrate identities and factoring:** Solve quadratic trig equations (e.g., $\sin^2 x - \sin x = 0$) by factoring. If the equation mixes functions (e.g., sine and cosine), use identities to convert it to a single function before solving.

## Key ideas, with intuition
**1. The Principal Value ($\alpha$)**
When solving $\sin(\theta) = k$, your calculator gives you $\alpha = \arcsin(k)$. This is just one angle. It is the starting point, not the final answer.

**2. The General Solution for Cosine**
Cosine represents the $x$-coordinate on the unit circle. If $\cos(\theta) = k$, the vertical line $x = k$ hits the circle at an angle $\alpha$ (above the $x$-axis) and $-\alpha$ (below the $x$-axis). Because the circle repeats every $2\pi$, the general solution is:
$$ \theta = 2n\pi \pm \alpha \quad \text{where } n \in \mathbb{Z} $$

**3. The General Solution for Sine**
Sine represents the $y$-coordinate. The horizontal line $y = k$ hits the circle at $\alpha$ (in quadrant I or IV) and at $\pi - \alpha$ (the reflection across the $y$-axis). You can write this as two separate sequences: $\theta = 2n\pi + \alpha$ and $\theta = 2n\pi + (\pi - \alpha)$. 
Mathematics prefers elegance. We combine these into a single formula:
$$ \theta = n\pi + (-1)^n \alpha \quad \text{where } n \in \mathbb{Z} $$
*Intuition:* If $n$ is even, you are on the right side of the circle, adding $\alpha$. If $n$ is odd, you are on the left side (at $\pi, 3\pi, \dots$), subtracting $\alpha$.

**4. The General Solution for Tangent**
Tangent represents slope. A line through the origin with a given slope intersects the unit circle at two points exactly $\pi$ radians apart. Therefore, it repeats every $\pi$, not $2\pi$:
$$ \theta = n\pi + \alpha \quad \text{where } n \in \mathbb{Z} $$

## Worked example
**Problem:** Solve $2\sin^2(x) - \cos(x) - 1 = 0$ for $x \in [0, 2\pi]$.

**Step 1: Unify the trigonometric functions.**
Use the Pythagorean identity $\sin^2(x) = 1 - \cos^2(x)$.
$$ 2(1 - \cos^2(x)) - \cos(x) - 1 = 0 $$
$$ 2 - 2\cos^2(x) - \cos(x) - 1 = 0 $$
$$ -2\cos^2(x) - \cos(x) + 1 = 0 $$
$$ 2\cos^2(x) + \cos(x) - 1 = 0 $$

**Step 2: Factor the quadratic.**
Let $u = \cos(x)$. We have $2u^2 + u - 1 = 0$, which factors to $(2u - 1)(u + 1) = 0$.
Therefore, $\cos(x) = \frac{1}{2}$ or $\cos(x) = -1$.

**Step 3: Find the general solutions.**
For $\cos(x) = \frac{1}{2}$, the principal value is $\alpha = \frac{\pi}{3}$.
$$ x = 2n\pi \pm \frac{\pi}{3} $$

For $\cos(x) = -1$, the principal value is $\alpha = \pi$.
$$ x = 2n\pi \pm \pi \implies x = (2n+1)\pi $$

**Step 4: Filter for the given range $x \in [0, 2\pi]$.**
Test integer values of $n$:
From $x = 2n\pi \pm \frac{\pi}{3}$:
*   $n = 0 \implies x = \frac{\pi}{3}, -\frac{\pi}{3}$ (Reject $-\frac{\pi}{3}$)
*   $n = 1 \implies x = 2\pi - \frac{\pi}{3} = \frac{5\pi}{3}$, and $x = 2\pi + \frac{\pi}{3}$ (Reject $2\pi + \frac{\pi}{3}$)

From $x = (2n+1)\pi$:
*   $n = 0 \implies x = \pi$

**Final Answer:** $x \in \left\{ \frac{\pi}{3}, \pi, \frac{5\pi}{3} \right\}$.

*Reflection:* By converting to a single function, treating it as an algebraic polynomial, finding the infinite general solution, and *then* filtering, we guaranteed no solutions were missed.

## Diagrams
```text
Symmetries on the Unit Circle

      Sine: y = k                  Cosine: x = k
         |                            |
  \      |      /              \      |      /
   \   (a)     /                \     |     / (a)
    \____|____/                  \____|____/
----*----|----*---- y = k    ---------+----*---- x = k
   /     |     \                 /    |    \
  /      |      \               /     |     \ (-a)
 /       |       \             /      |      \
         |                            |

* Sine intersects at a and pi-a.
* Cosine intersects at a and -a.
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of Cosine as a horizontal clamp (left/right symmetry, $\pm \alpha$) and Sine as an alternating pendulum (swinging between even/odd multiples of $\pi$, hence $(-1)^n$).
2. **Formulas to overlearn:**
   * $\cos(\theta) = \cos(\alpha) \implies \theta = 2n\pi \pm \alpha$
   * $\sin(\theta) = \sin(\alpha) \implies \theta = n\pi + (-1)^n \alpha$
   * $\tan(\theta) = \tan(\alpha) \implies \theta = n\pi + \alpha$
3. **Spaced-repetition schedule:** Review these formulas and derive them from the unit circle at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formulas, draw a circle. Draw a line for your value. Find the two angles that hit that line in the first rotation $[0, 2\pi]$. Add $+ 2n\pi$ to both. You now have the general solution, even if it's in two pieces instead of one elegant formula.

## Common mistakes
1. **Dividing by a variable trig function:** If you have $\sin(x)\cos(x) = \frac{1}{2}\sin(x)$, dividing by $\sin(x)$ loses the solutions where $\sin(x) = 0$. Always subtract and factor instead: $\sin(x)(\cos(x) - \frac{1}{2}) = 0$.
2. **Applying the range restriction too early:** If solving $\sin(2x) = 1$ for $x \in [0, 2\pi]$, students often find $2x = \frac{\pi}{2}$, so $x = \frac{\pi}{4}$. They miss the second solution because they didn't write the general solution $2x = 2n\pi + \frac{\pi}{2}$ *before* dividing by 2.
3. **Forgetting the secondary angle:** Using your calculator to find $\arcsin(0.8)$ and just adding $2n\pi$, completely forgetting the $\pi - \arcsin(0.8)$ intersection.

## Self-check
1. Find the general solution for $\sqrt{3}\tan(x) - 1 = 0$.
2. Find all solutions to $\cos(3x) = \frac{\sqrt{2}}{2}$ in the interval $x \in [0, \pi]$.
3. Find the general solution for $\sin(2x) = \cos(x)$. (Hint: use a double-angle identity and factor).