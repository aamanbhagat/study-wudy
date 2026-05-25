## What it is
An analytic function is a complex-valued function that is complex-differentiable in a neighborhood of every point in its domain. This is a much stronger condition than differentiability for real functions, and it is tested by a pair of equations called the Cauchy-Riemann equations, which link the partial derivatives of the function's real and imaginary parts.

## Why it matters
Analytic functions are the central objects of study in complex analysis and are foundational to many areas of science and engineering. In aerospace, they are used to model potential flow over airfoils (Joukowsky transform). In physics and electrical engineering, they are indispensable for solving problems in electromagnetism, heat conduction, and analyzing AC circuits (phasor analysis).

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **Complex Numbers:** Arithmetic ($a+ib$), polar form ($re^{i\theta}$), and Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$).
2.  **Multivariable Calculus:** The concept of limits in $\mathbb{R}^2$, and especially how to compute partial derivatives (e.g., $\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$).

If you are not confident with partial derivatives, stop and review them now. The entire derivation depends on them.

## How to study it (step by step)
1.  **Start with the definition.** Write down the definition of the derivative for a real function $f'(x)$. Now, write the exact same definition for a complex function $f(z)$, where $z$ and $\Delta z$ are complex numbers:
    $$ f'(z) = \lim_{\Delta z \to 0} \frac{f(z+\Delta z) - f(z)}{\Delta z} $$
2.  **Grasp the key difference.** For a real function, $\Delta x$ can only approach 0 from the left or the right. For a complex function, $\Delta z$ can approach 0 from *any direction* in the complex plane. For the derivative to exist, the limit must be the same regardless of the path.
3.  **Derive the Cauchy-Riemann equations.** This is the crucial step. Assume the limit exists. Evaluate it along two different paths and demand the results are equal.
    *   **Path 1: Horizontal approach.** Let $\Delta z = \Delta x$, where $\Delta x \in \mathbb{R}$.
    *   **Path 2: Vertical approach.** Let $\Delta z = i\Delta y$, where $\Delta y \in \mathbb{R}$.
    *   Set the two resulting expressions for $f'(z)$ equal to each other. Equate the real parts and the imaginary parts. This will yield the two Cauchy-Riemann equations.
4.  **Test a "good" function.** Take $f(z) = z^2$. First, write it in terms of its real and imaginary parts, $u(x,y)$ and $v(x,y)$, where $z = x+iy$. Then, compute the four partial derivatives and verify that the Cauchy-Riemann equations hold for all $z$.
5.  **Test a "bad" function.** Take $f(z) = \bar{z} = x-iy$. Show that the Cauchy-Riemann equations do *not* hold anywhere. This function is not analytic.
6.  **Connect to geometry.** Reflect on what you've found. The C-R equations impose a rigid geometric structure. They imply that an analytic function locally behaves like a rotation and a scaling, but not a reflection or a shear. This is why $f(z)=\bar{z}$ (a reflection across the real axis) fails the test.

## Key ideas, with intuition
1.  **The Derivative Must Be Path-Independent.** This is the absolute core concept. Imagine standing on a hilly terrain represented by a function's value. In single-variable calculus, you can only approach a point along a line, so you only care about the slope from the left and right. In complex analysis, the domain is a plane. You can approach a point $(x,y)$ from north, south, east, west, or any diagonal direction. For the function to be "smooth" in the complex sense (analytic), the slope (the derivative) must be the same no matter which direction you approach from.

2.  **The Cauchy-Riemann Equations are a Necessary Consequence.** Let $f(z) = u(x,y) + i v(x,y)$. The two simplest paths to check are purely horizontal and purely vertical. Demanding the derivative be the same along these two paths forces the partial derivatives of $u$ and $v$ to be related in a very specific way.
    $$ \frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \quad \text{and} \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x} $$
    The first equation says "the rate of change of the real part in the x-direction must equal the rate of change of the imaginary part in the y-direction." The second relates the other two partials. This is the algebraic enforcement of the path-independence idea.

3.  **Analyticity is "Infinitely Nice".** This is a profound difference from real analysis. A real function can be differentiable once but not twice (e.g., $f(x) = x^2 \sin(1/x)$). If a complex function is differentiable just *once* in a neighborhood (i.e., it's analytic), it is automatically infinitely differentiable, and it can be represented by a Taylor series. The C-R equations are so restrictive that they force the function to be incredibly well-behaved.

## Worked example
**Question:** Show that $f(z) = \cos(z)$ is analytic for all $z \in \mathbb{C}$.

**Solution:**
1.  **Express $f(z)$ in terms of $u(x,y) + i v(x,y)$.**
    We start with $z = x+iy$ and use Euler's formula and trigonometric identities.
    $$ \cos(z) = \cos(x+iy) = \cos(x)\cos(iy) - \sin(x)\sin(iy) $$
    Recall the hyperbolic relations: $\cos(iy) = \cosh(y)$ and $\sin(iy) = i\sinh(y)$.
    $$ \cos(z) = \cos(x)\cosh(y) - \sin(x)(i\sinh(y)) $$
    $$ \cos(z) = \cos(x)\cosh(y) - i\sin(x)\sinh(y) $$
    By inspection, we identify the real and imaginary parts:
    $u(x,y) = \cos(x)\cosh(y)$
    $v(x,y) = -\sin(x)\sinh(y)$

2.  **Compute the four partial derivatives.**
    $$ \frac{\partial u}{\partial x} = -\sin(x)\cosh(y) $$
    $$ \frac{\partial u}{\partial y} = \cos(x)\sinh(y) $$
    $$ \frac{\partial v}{\partial x} = -\cos(x)\sinh(y) $$
    $$ \frac{\partial v}{\partial y} = -\sin(x)\cosh(y) $$

3.  **Verify the Cauchy-Riemann equations.**
    *   First equation: Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
        Yes: $-\sin(x)\cosh(y) = -\sin(x)\cosh(y)$. This holds for all $(x,y)$.
    *   Second equation: Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
        Yes: $\cos(x)\sinh(y) = -(-\cos(x)\sinh(y)) = \cos(x)\sinh(y)$. This also holds for all $(x,y)$.

4.  **Conclusion.**
    The partial derivatives are continuous everywhere and the Cauchy-Riemann equations are satisfied for all $(x,y) \in \mathbb{R}^2$. Therefore, the function $f(z) = \cos(z)$ is analytic everywhere in the complex plane. Such a function is called an *entire* function.

**Reflection:** The process was mechanical but demonstrates the principle. We translated the complex function into its real and imaginary components, which are multivariable real functions. Then we applied the C-R equations as a direct test. The fact that they held for all points confirmed the function's analyticity.

## Diagrams
Here is a visualization of the two paths used in the derivation of the Cauchy-Riemann equations. For the derivative at point $z$ to exist, the limit must be the same whether we approach along Path 1 or Path 2.

```text
        Im(z)
          ^
          |
          |   Path 2 (Vertical)
          |      ^
          |      |  Δz = iΔy
          |      |
          +------z------> Path 1 (Horizontal)
          |             Δz = Δx
          |
          |
----------+----------------------------> Re(z)
          |
          |
          |
```

## Memory technique — remember this forever
1.  **The Mnemonic/Story:** Think of the Cauchy-Riemann equations as a "reality check". For a function to be truly complex-differentiable, its behavior in the real dimension ($x$) must be compatible with its behavior in the imaginary dimension ($y$). The equations are the contract that enforces this compatibility.
    *   $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$: "Change in **real part** along **real axis**" equals "Change in **imaginary part** along **imaginary axis**". This is the symmetric part of the contract.
    *   $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$: "Change in **real part** along **imaginary axis**" equals the *negative* of "Change in **imaginary part** along **real axis**". This is the anti-symmetric part, capturing the rotational nature of complex multiplication.

2.  **Formulas to Overlearn (Do not paraphrase):**
    Let $f(z) = u(x,y) + i v(x,y)$.
    $$ \frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} $$
    $$ \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x} $$

3.  **Spaced Repetition Schedule:**
    Review this material and re-derive the C-R equations from the limit definition at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders.

4.  **First Principles Pathway:** If you forget the formulas, you can always rebuild them.
    *   Start with $f'(z) = \lim_{\Delta z \to 0} \frac{\Delta f}{\Delta z}$.
    *   Path 1: $\Delta z = \Delta x$. Sub in $f=u+iv$ and $z=x+iy$. The limit becomes $\frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x}$.
    *   Path 2: $\Delta z = i\Delta y$. The limit becomes $\frac{1}{i}(\frac{\partial u}{\partial y} + i\frac{\partial v}{\partial y}) = \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$.
    *   Equate the results from Path 1 and Path 2. Equating the real parts gives the first C-R equation. Equating the imaginary parts gives the second.

## Common mistakes
1.  **Forgetting the minus sign.** The most common error is writing the second equation as $\frac{\partial u}{\partial y} = \frac{\partial v}{\partial x}$. The negative sign is critical.
2.  **Confusing analyticity with differentiability at a point.** A function can satisfy the C-R equations at a single point but not in any neighborhood around it. This makes it differentiable at that point, but *not analytic* there. Analyticity requires differentiability in an open disk.
3.  **Incorrectly splitting into u and v.** Be meticulous when converting functions like $e^z$ or $\sin z$ into their $u(x,y)$ and $v(x,y)$ forms. A mistake here invalidates all subsequent work.
4.  **Assuming any function of $z$ is analytic.** Functions involving non-complex operations like $\bar{z}$, $\text{Re}(z)$, or $|z|$ are almost never analytic. Analyticity typically requires the function to be expressible purely in terms of $z$, not its components.

## Self-check
1.  Is the function $f(z) = z^3$ analytic? Use the Cauchy-Riemann equations to prove your answer.
2.  Consider the function $f(z) = |z|^2$. Find the point(s) where it is complex-differentiable by checking the Cauchy-Riemann equations. Is this function analytic anywhere? Explain why or why not.
3.  Let $f(z) = u(x,y) + i v(x,y)$ be an analytic function. If $v(x,y)$ is a constant, what can you conclude about $f(z)$? Prove it using the Cauchy-Riemann equations.