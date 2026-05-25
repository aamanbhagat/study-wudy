## What it is
Finite difference methods (FDM) are a class of numerical techniques for solving differential equations. They work by approximating derivatives with algebraic expressions, called finite differences, which are evaluated at discrete points in space and time. This process transforms a continuous partial differential equation (PDE) into a system of algebraic equations that can be solved by a computer.

## Why it matters
FDM is the workhorse of computational physics and engineering. In aerospace, it's fundamental to Computational Fluid Dynamics (CFD) for simulating airflow over wings and combustion inside rocket engines. In physics, it's used to model everything from heat transfer in materials to the evolution of quantum mechanical wavefunctions. In finance, it's used to price derivatives by solving the Black-Scholes equation.

## When to study it
Before tackling this, you must have a solid grasp of the following:
1.  **Calculus:** Taylor series expansions are non-negotiable. You must understand them deeply, including the remainder term, as they are the foundation for all finite difference formulas. You also need fluency with partial derivatives.
2.  **Linear Algebra:** Many FDM schemes result in a system of linear equations of the form $A\mathbf{x}=\mathbf{b}$. You need to understand how to represent and think about these systems.
3.  **PDE Basics:** You should understand what a PDE is, the difference between initial and boundary conditions, and the basic classification of PDEs (e.g., parabolic, hyperbolic, elliptic).

If you are not comfortable deriving and using Taylor series, stop and review that first. Everything that follows depends on it.

## How to study it (step by step)
1.  **Master the building block: Taylor Series.** Write down the Taylor series expansion for a function $u(x+\Delta x)$ around the point $x$. Do the same for $u(x-\Delta x)$. Keep all terms up to $(\Delta x)^3$ and the big-O notation for the remainder.
2.  **Derive the first derivative approximations.** Using the two series from step 1, algebraically combine them to isolate an expression for $\frac{\partial u}{\partial x}$. Subtract one from the other to derive the *central difference* formula. Use just one of them to derive the *forward* and *backward* difference formulas. Note their orders of accuracy.
3.  **Derive the second derivative approximation.** Add the two Taylor series from step 1. Rearrange the resulting expression to isolate $\frac{\partial^2 u}{\partial x^2}$. This will give you the standard second-order central difference formula.
4.  **Discretize a domain.** Draw a line representing a 1D spatial domain. Mark points $x_0, x_1, ..., x_N$. Label the distance between them as $\Delta x$. This is your grid or mesh. Now, introduce a time dimension, with steps $t_0, t_1, ...$, separated by $\Delta t$. Any function $u(x,t)$ now becomes a set of values $u_j^n \equiv u(x_j, t_n)$ on this grid.
5.  **Substitute into a PDE.** Take the 1D heat equation: $\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}$. On the left side, replace $\frac{\partial u}{\partial t}$ with a simple forward difference in time. On the right side, replace $\frac{\partial^2 u}{\partial x^2}$ with the central difference formula you derived.
6.  **Formulate an update rule.** Rearrange the algebraic equation from step 5 to solve for the unknown future value $u_j^{n+1}$ in terms of known present values ($u_{j-1}^n, u_j^n, u_{j+1}^n$). This is your first numerical scheme: Forward Time, Centered Space (FTCS).

## Key ideas, with intuition
1.  **Discretization: From Continuum to Grid.** A function $u(x,t)$ is defined everywhere in its domain. We can't compute it at an infinite number of points. So, we lay a grid over the domain and only care about the function's value at the grid points, $u_j^n$. We are trading the exact, continuous solution for an approximate, discrete one.

2.  **Calculus to Algebra: The Core Trade.** The derivative is a limit: $\frac{du}{dx} = \lim_{\Delta x \to 0} \frac{u(x+\Delta x) - u(x)}{\Delta x}$. FDM's core idea is to *not* take the limit. We keep $\Delta x$ small but finite, turning the derivative into a simple division.
    $$
    \frac{\partial^2 u}{\partial x^2} \bigg|_{x_j, t_n} \approx \frac{u(x_j+\Delta x, t_n) - 2u(x_j, t_n) + u(x_j-\Delta x, t_n)}{(\Delta x)^2} = \frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{(\Delta x)^2}
    $$
    This transforms a differential equation into an algebraic one.

3.  **The Stencil: A Local Recipe for Global Behavior.** After discretization, the PDE becomes a rule that connects a point's future value to the present values of itself and its immediate neighbors. This "computational stencil" is applied at every grid point. The global behavior of the solution emerges from the repeated local application of this simple rule.

## Worked example
**Problem:** Solve the 1D heat equation $\frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2}$ for $x \in [0, 1]$ and $t \ge 0$.
-   Boundary Conditions (BCs): $u(0, t) = 0$, $u(1, t) = 0$.
-   Initial Condition (IC): $u(x, 0) = \sin(\pi x)$.
-   Use FDM to find the temperature at $t=0.01$.

**Solution:**

1.  **Discretize the domain.** Let's choose a simple spatial grid with $\Delta x = 0.25$. This gives us points $x_0=0, x_1=0.25, x_2=0.5, x_3=0.75, x_4=1$. The BCs fix $u_0^n=0$ and $u_4^n=0$ for all $n$. We only need to solve for the interior points $u_1, u_2, u_3$. For stability, we must choose $\Delta t$ such that $r = \frac{\alpha \Delta t}{(\Delta x)^2} \le \frac{1}{2}$. Here $\alpha=1$, so let's choose $r=0.4$. This gives $\Delta t = r (\Delta x)^2 = 0.4 \cdot (0.25)^2 = 0.025$. This is too large to find the solution at $t=0.01$. Let's pick a smaller $\Delta t = 0.005$, which gives $r = \frac{1 \cdot 0.005}{(0.25)^2} = 0.08 \le 0.5$. We will need two time steps to reach $t=0.01$.

2.  **Apply the FTCS scheme.** The discretized equation is:
    $$
    \frac{u_j^{n+1} - u_j^n}{\Delta t} = \frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{(\Delta x)^2}
    $$
    Rearranging for the update rule:
    $$
    u_j^{n+1} = u_j^n + r (u_{j+1}^n - 2u_j^n + u_{j-1}^n)
    $$
    With $r=0.08$, this is $u_j^{n+1} = u_j^n + 0.08 (u_{j+1}^n - 2u_j^n + u_{j-1}^n)$.

3.  **Set Initial Conditions (t=0, n=0).**
    -   $u_0^0 = 0$ (BC)
    -   $u_1^0 = \sin(\pi \cdot 0.25) = \sin(\pi/4) \approx 0.7071$
    -   $u_2^0 = \sin(\pi \cdot 0.50) = \sin(\pi/2) = 1.0$
    -   $u_3^0 = \sin(\pi \cdot 0.75) = \sin(3\pi/4) \approx 0.7071$
    -   $u_4^0 = 0$ (BC)

4.  **Compute the first time step (t=0.005, n=1).**
    -   $u_1^1 = u_1^0 + r(u_2^0 - 2u_1^0 + u_0^0) = 0.7071 + 0.08(1.0 - 2(0.7071) + 0) \approx 0.6739$
    -   $u_2^1 = u_2^0 + r(u_3^0 - 2u_2^0 + u_1^0) = 1.0 + 0.08(0.7071 - 2(1.0) + 0.7071) \approx 0.9531$
    -   $u_3^1 = u_3^0 + r(u_4^0 - 2u_3^0 + u_2^0) = 0.7071 + 0.08(0 - 2(0.7071) + 1.0) \approx 0.6739$

5.  **Compute the second time step (t=0.01, n=2).**
    -   $u_1^2 = u_1^1 + r(u_2^1 - 2u_1^1 + u_0^1) = 0.6739 + 0.08(0.9531 - 2(0.6739) + 0) \approx 0.6421$
    -   $u_2^2 = u_2^1 + r(u_3^1 - 2u_2^1 + u_1^1) = 0.9531 + 0.08(0.6739 - 2(0.9531) + 0.6739) \approx 0.9073$
    -   $u_3^2 = u_3^1 + r(u_4^1 - 2u_3^1 + u_2^1) = 0.6739 + 0.08(0 - 2(0.6739) + 0.9531) \approx 0.6421$

**Reflection:** Each step was pure arithmetic. We started with the known IC and used the update rule—a local recipe—to march the solution forward in time. The BCs provided fixed values at the edges of our domain for each step. We have now found an approximate solution at $t=0.01$.

## Diagrams
A 1D spatial grid:
```text
     <-- dx -->
  ...----|---------|---------|----...
       x_{j-1}    x_j     x_{j+1}
```

The FTCS stencil for the 1D heat equation. It shows that the value at grid point $j$ at the future time step $n+1$ depends on three points at the present time step $n$.
```text
time ^
     |
t_n+1|           o (u_j^{n+1})
     |           ^
     |          /|\
     |         / | \
t_n  |...---o---o---o---...
     |   (u_{j-1}^n) (u_j^n) (u_{j+1}^n)
     |
     +---------------------------> space (j)
```

## Memory technique — remember this forever
1.  **The Story:** Think of a derivative as a "local slope". The finite difference formulas are just ways of calculating that slope using nearby points on a grid, like finding the grade of a hill by measuring the rise over run between two survey markers. The second derivative, $\frac{d^2u}{dx^2}$, measures *curvature* or "how bent" the function is. The formula $\frac{u_{j+1} - 2u_j + u_{j-1}}{(\Delta x)^2}$ is an average of the slopes on either side, which intuitively captures this "bendedness".

2.  **Must-know formulas:**
    $$
    \text{1st Deriv (Central): } \quad \frac{\partial u}{\partial x} \approx \frac{u_{j+1} - u_{j-1}}{2\Delta x}
    $$
    $$
    \text{2nd Deriv (Central): } \quad \frac{\partial^2 u}{\partial x^2} \approx \frac{u_{j+1} - 2u_j + u_{j-1}}{(\Delta x)^2}
    $$

3.  **Spaced Repetition Schedule:**
    -   Derive these two formulas from Taylor series now.
    -   Review and re-derive in 1 day.
    -   Review and re-derive in 3 days.
    -   Review and re-derive in 7 days.
    -   Review and re-derive in 16 days.
    -   Review and re-derive in 35 days.

4.  **First Principles Pathway:** If you forget the formulas, you can *always* re-derive them.
    -   Write down the Taylor expansions:
        $u(x+\Delta x) = u(x) + u'(x)\Delta x + \frac{u''(x)}{2!}(\Delta x)^2 + \frac{u'''(x)}{3!}(\Delta x)^3 + \dots$
        $u(x-\Delta x) = u(x) - u'(x)\Delta x + \frac{u''(x)}{2!}(\Delta x)^2 - \frac{u'''(x)}{3!}(\Delta x)^3 + \dots$
    -   To get $u'(x)$: Subtract the second from the first. The even powers cancel. Rearrange for $u'(x)$.
    -   To get $u''(x)$: Add the two series. The odd powers cancel. Rearrange for $u''(x)$.

## Common mistakes
1.  **Index Errors:** Confusing the time index (superscript $n$) with the space index (subscript $j$). Write out the stencil diagram to keep track of which points from which time level you are using.
2.  **Forgetting $\Delta t$ and $\Delta x$:** Writing the update rule but forgetting to include the discretization parameters, e.g., writing $u_j^{n+1} = u_j^n + (u_{j+1}^n - 2u_j^n + u_{j-1}^n)$. This is dimensionally and physically incorrect. Remember the factor $r = \frac{\alpha \Delta t}{(\Delta x)^2}$.
3.  **Ignoring Stability:** Assuming any choice of $\Delta t$ and $\Delta x$ will work. For explicit schemes like FTCS, there is a strict limit on the size of the time step relative to the spatial step. If you violate it (e.g., $\frac{\alpha \Delta t}{(\Delta x)^2} > 1/2$ for the heat equation), your numerical solution will develop oscillations that grow exponentially, yielding nonsense.

## Self-check
1.  Derive the second-order accurate forward-difference approximation for the first derivative, $u'(x)$. (Hint: you will need to use the Taylor expansion for $u(x+2\Delta x)$ as well as $u(x+\Delta x)$).
2.  Discretize the 1D linear advection equation, $\frac{\partial u}{\partial t} + c \frac{\partial u}{\partial x} = 0$. Use a forward difference for time and a central difference for space. Write down the explicit update rule for $u_j^{n+1}$.
3.  Consider the 2D Laplace equation, $\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$. Discretize the domain with grid spacing $\Delta x = \Delta y = h$. Let $u_{i,j}$ denote the value of $u$ at $(x_i, y_j)$. Derive the finite difference equation that relates $u_{i,j}$ to its four nearest neighbors.