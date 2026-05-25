## What it is
Clairaut's theorem states that if a multivariable function has continuous second-order partial derivatives, then the order of differentiation does not matter. For a function $f(x, y)$, this means the partial derivative with respect to $x$ then $y$ is identical to the partial derivative with respect to $y$ then $x$.

## Why it matters
This theorem is the foundation for the concept of "conservative vector fields" in physics, which are central to gravity and electromagnetism. An electrostatic field $\vec{E}$ is conservative, meaning it can be written as the gradient of a scalar potential, $\vec{E} = -\nabla V$. Clairaut's theorem guarantees that the curl of such a field is zero ($\nabla \times \vec{E} = 0$), a fundamental law of electrostatics. In machine learning, the theorem guarantees the Hessian matrix (the matrix of all second partial derivatives) is symmetric, which dramatically simplifies and speeds up second-order optimization algorithms.

## When to study it
You must be proficient with the following before tackling this:
1.  **Functions of several variables:** Understanding the concept of a function $f: \mathbb{R}^n \to \mathbb{R}$, like $z = f(x, y)$.
2.  **Partial derivatives:** Fluency in computing $\frac{\partial f}{\partial x}$ by treating other variables as constants.
3.  **Higher-order partial derivatives:** Knowing how to compute derivatives like $f_{xx} = \frac{\partial^2 f}{\partial x^2}$ and, crucially, the mixed partials $f_{xy} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)$ and $f_{yx} = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right)$.
4.  **Continuity:** A firm grasp of what it means for a multivariable function to be continuous at a point and in a region.

If you are not confident in these, review them first.

## How to study it (step by step)
1.  **Mechanical Verification:** Take a simple polynomial function, like $f(x, y) = 2x^3y^4 + 5x^2$. Manually compute $f_x$, then $f_{xy}$. Then, compute $f_y$, then $f_{yx}$. Verify they are identical. This builds mechanical confidence.
2.  **Understand the "Why":** The core of the proof relies on applying the single-variable Mean Value Theorem twice. Consider the quantity $\Delta = f(x+h, y+k) - f(x+h, y) - f(x, y+k) + f(x, y)$. First, apply the MVT in the $x$-direction, then the $y$-direction. Then, regroup the terms and apply it in the $y$-direction, then the $x$-direction. Seeing that both paths lead to the same expression (which involves $f_{xy}$ and $f_{yx}$ at intermediate points) is the key insight. You don't need to write the full proof, but trace its logic.
3.  **Break the Theorem:** Study the canonical counterexample: $f(x, y) = \frac{xy(x^2 - y^2)}{x^2 + y^2}$ for $(x, y) \neq (0, 0)$ and $f(0, 0) = 0$. Use the limit definition of the partial derivative to show that $f_{xy}(0, 0) = -1$ while $f_{yx}(0, 0) = 1$. This demonstrates *why* the continuity condition on the second partials is not just a technicality—it's essential.
4.  **Connect to Physics:** Find the definition of a "conservative vector field" $\vec{F} = \langle P(x, y), Q(x, y) \rangle$. The test for this is $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$. Realize that if $\vec{F} = \nabla \phi$, then $P = \phi_x$ and $Q = \phi_y$. The test is therefore $\phi_{xy} = \phi_{yx}$, which is exactly Clairaut's theorem. This application is a primary reason the theorem is taught.
5.  **Generalize:** Extend the idea to three variables. For a function $g(x, y, z)$, what does Clairaut's theorem imply about $g_{xyz}$, $g_{yxz}$, and $g_{zxy}$? Work it out.

## Key ideas, with intuition
1.  **Differentiation Order as a Path:** Think of taking partial derivatives as moving along a grid in the domain. Differentiating with respect to $x$ then $y$ ($f_{xy}$) is like measuring how the "east-west slope" changes as you take a small step "north". Differentiating with respect to $y$ then $x$ ($f_{yx}$) is like measuring how the "north-south slope" changes as you take a small step "east".
2.  **Smoothness Forbids Twists:** For a "smooth" surface (one with continuous second partials), these two measurements must be the same. If they were different, it would imply a sort of infinitesimal "twist" or "kink" in the surface at that point, which violates the smoothness condition. The continuity requirement ensures the surface behaves predictably at small scales.
3.  **Symmetry of the Hessian:** The most important consequence is that the Hessian matrix, the matrix of all second-order partials, is symmetric. For $f(x, y)$, the Hessian is:
    $$
    H_f = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}
    $$
    Clairaut's theorem, $f_{xy} = f_{yx}$, means that $H_f = H_f^T$. This property is computationally invaluable in optimization, physics, and engineering.

## Worked example
Let's verify Clairaut's theorem for the function $f(x, y) = x \sin(xy)$.

**Step 1: Compute $f_x$ and then $f_{xy}$.**
First, find the partial derivative with respect to $x$, using the product rule.
$$
f_x = \frac{\partial}{\partial x}(x \sin(xy)) = (1) \cdot \sin(xy) + x \cdot \frac{\partial}{\partial x}(\sin(xy))
$$
$$
f_x = \sin(xy) + x \cos(xy) \cdot y = \sin(xy) + xy\cos(xy)
$$
Now, differentiate this result with respect to $y$.
$$
f_{xy} = \frac{\partial}{\partial y}(\sin(xy) + xy\cos(xy))
$$
$$
f_{xy} = \cos(xy) \cdot x + \left[ (x) \cos(xy) + xy (-\sin(xy) \cdot x) \right] \quad \text{(using product rule on the second term)}
$$
$$
f_{xy} = x\cos(xy) + x\cos(xy) - x^2y\sin(xy) = 2x\cos(xy) - x^2y\sin(xy)
$$

**Step 2: Compute $f_y$ and then $f_{yx}$.**
First, find the partial derivative with respect to $y$.
$$
f_y = \frac{\partial}{\partial y}(x \sin(xy)) = x \cdot \frac{\partial}{\partial y}(\sin(xy))
$$
$$
f_y = x \cos(xy) \cdot x = x^2\cos(xy)
$$
Now, differentiate this result with respect to $x$, using the product rule.
$$
f_{yx} = \frac{\partial}{\partial x}(x^2\cos(xy))
$$
$$
f_{yx} = (2x)\cos(xy) + x^2(-\sin(xy) \cdot y)
$$
$$
f_{yx} = 2x\cos(xy) - x^2y\sin(xy)
$$

**Step 3: Compare and reflect.**
We found that $f_{xy} = 2x\cos(xy) - x^2y\sin(xy)$ and $f_{yx} = 2x\cos(xy) - x^2y\sin(xy)$. They are identical.
This worked because the function $f(x, y) = x \sin(xy)$ and all of its partial derivatives are compositions of polynomials, sines, and cosines, which are continuous everywhere on $\mathbb{R}^2$. Therefore, the conditions of Clairaut's theorem are satisfied, and the equality of mixed partials is guaranteed.

## Diagrams
This diagram illustrates the small rectangle in the domain used to intuit the proof of the theorem. The value of the function is evaluated at these four corners to approximate the mixed partial derivatives.

```text
      y
      ^
      |
      |
(x,y+k)+-------+(x+h,y+k)
      |       |
      |       |
 (x,y)+-------+(x+h,y)
      |
      +---------------> x
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Clairaut's Commute is Continuous." Imagine your office is northeast of your home on a grid. You can drive East then North, or North then East. The "mixed partial" is the change in slope along one path versus the other. If the terrain is *continuous* and smooth, the net change in grade is the same. The path doesn't matter for a smooth ride.
2.  **Must overlearn:**
    *   **Theorem Statement:** If $f_{xy}$ and $f_{yx}$ are continuous in a region, then $f_{xy} = f_{yx}$ in that region.
    *   **Leibniz Notation:** $\displaystyle \frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$
    *   **Consequence:** The Hessian matrix is symmetric.
3.  **Spaced Repetition Schedule:** Review this concept and re-derive an example at: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders.
4.  **First Principles Pathway:** If you forget, remember the proof sketch. Define the second-difference operator on a small rectangle: $\Delta = [f(x+h, y+k) - f(x+h, y)] - [f(x, y+k) - f(x, y)]$. Apply the Mean Value Theorem twice in $x$ then $y$. Rearrange the terms and apply it twice in $y$ then $x$. Equating the results and taking the limit as $h, k \to 0$ recovers the theorem.

## Common mistakes
1.  **Ignoring the Continuity Condition:** Assuming $f_{xy}=f_{yx}$ is always true. It is not. For strange functions, especially piecewise ones defined differently at the origin, you must check for continuity of the second partials before applying the theorem.
2.  **Notation Reversal:** Confusing the order of operations. In subscript notation, $f_{xy}$, you differentiate left-to-right (first $x$, then $y$). In Leibniz notation, $\frac{\partial^2 f}{\partial y \partial x}$, you differentiate right-to-left (first $x$, then $y$). They mean the same thing, but the visual order is reversed.
3.  **Algebraic Errors:** The most common failure is a simple mistake in differentiation (e.g., misapplying the product or chain rule). If your mixed partials for a standard function (like a polynomial or exponential) are not coming out equal, your first suspect should be your own algebra. Recalculate carefully.

## Self-check
1.  Verify Clairaut's theorem for the function $f(x, y) = \ln(x^2 + y^2)$ for $(x, y) \neq (0, 0)$.
2.  Given a function $g(x, y, z)$ with continuous third-order partial derivatives, what can you say about the relationship between $g_{xyz}$, $g_{zyx}$, and $g_{yxz}$?
3.  A scientist proposes that the temperature in a plate is given by $T(x, y) = e^{-y} \cos(x) - e^{-x} \cos(y)$. A law of thermodynamics for this plate requires that $\frac{\partial^2 T}{\partial x^2} + \frac{\partial^2 T}{\partial y^2} = 0$. Is this law satisfied? Separately, is the vector field $\vec{F} = \nabla T$ conservative? Justify your answer.