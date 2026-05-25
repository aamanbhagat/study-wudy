## What it is
The classification of a second-order linear partial differential equation (PDE) is a method for categorizing it as elliptic, parabolic, or hyperbolic. This classification is determined by a simple algebraic test—the discriminant test—on the coefficients of the highest-order derivatives. This categorization directly predicts the qualitative behavior of the solutions and the type of physical phenomena the equation can model.

## Why it matters
This is not just mathematical taxonomy; it is the fundamental organizing principle of PDEs. Hyperbolic equations model wave phenomena with finite propagation speeds, crucial for analyzing supersonic flight (aerodynamics) and electromagnetic waves. Parabolic equations model diffusion and heat transfer, essential for thermal management in rocket engines and pricing financial derivatives. Elliptic equations describe steady-state systems, such as electrostatic fields or incompressible fluid flow around an airfoil.

## When to study it
Before tackling this, you must have a solid command of multivariable calculus, specifically the computation and meaning of partial derivatives. A foundational understanding of ordinary differential equations (ODEs), particularly second-order linear ODEs and the concept of a characteristic equation, is also required. If you are not comfortable with finding partial derivatives like $\frac{\partial^2 u}{\partial x \partial y}$, you are not ready.

## How to study it (step by step)
1.  **Memorize the General Form:** Write down the general second-order linear PDE in two variables, $u(x, y)$, until it is second nature:
    $$ A u_{xx} + B u_{xy} + C u_{yy} + D u_x + E u_y + F u = G(x,y) $$
    Identify that classification only depends on the principal part: the terms with the highest-order (second) derivatives, involving coefficients $A$, $B$, and $C$.

2.  **Connect to Conic Sections:** Recall the general quadratic equation for a conic section: $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$. The type of conic is determined by the discriminant $\Delta = B^2 - 4AC$. This is a direct, powerful analogy. Spend 15 minutes reviewing this algebra if it's not fresh.

3.  **Derive the Characteristic Equation:** Understand *why* this discriminant appears. The classification arises from trying to find special curves in the $(x, y)$ plane, called characteristic curves, along which the PDE simplifies into an ODE. The slopes of these curves, $dy/dx$, are given by the roots of the quadratic equation:
    $$ A \left(\frac{dy}{dx}\right)^2 - B \left(\frac{dy}{dx}\right) + C = 0 $$
    Use the quadratic formula to solve for $dy/dx$ and see that the nature of the roots depends on the sign of the discriminant $B^2 - 4AC$.

4.  **Master the Test:** Apply the discriminant test, $\Delta = B^2 - 4AC$, to the PDE's principal part.
    *   If $\Delta > 0$, the PDE is **hyperbolic**.
    *   If $\Delta = 0$, the PDE is **parabolic**.
    *   If $\Delta < 0$, the PDE is **elliptic**.

5.  **Work with Variable Coefficients:** Solve 5-10 classification problems where $A, B, C$ are functions of $x$ and $y$. This is critical. The type of the PDE can change from one region of the domain to another. For example, the equation governing transonic flow is elliptic in the subsonic region and hyperbolic in the supersonic region.

## Key ideas, with intuition
1.  **The Analogy to Conic Sections is Real:** The mathematical structure is identical. A hyperbola consists of two distinct branches, like two families of characteristic curves carrying information. A parabola is a single, unbounded curve, like a single family of characteristics for diffusion. An ellipse is a closed curve, indicating no preferred direction of information flow—the solution is determined by the entire boundary at once.

2.  **Information Propagation:** The classification tells you how information travels in the system.
    *   **Hyperbolic (Wave-like):** $\Delta > 0$. There are two real, distinct characteristic directions. Information propagates at a finite speed along these paths. Think of ripples from a stone dropped in a pond or the shock wave from a supersonic jet. A disturbance at one point is only felt later at other points inside its "cone of influence."
    *   **Parabolic (Diffusion-like):** $\Delta = 0$. There is one real, repeated characteristic direction. Information diffuses, smoothing out initial conditions. A disturbance at one point is felt everywhere else *instantaneously*, but its magnitude decays with distance. This models heat spreading through a metal rod.
    *   **Elliptic (Steady-State):** $\Delta < 0$. There are no real characteristic directions. The solution is smooth and determined by the entire boundary simultaneously. A change to the boundary conditions anywhere affects the solution *everywhere* instantly. This models the gravitational field or the steady-state temperature distribution in a metal plate.

3.  **The Discriminant is a Local Property:** For a PDE like $y u_{xx} + u_{yy} = 0$, the coefficients depend on the coordinates. The classification is not global but must be determined point by point, or region by region. This is essential for modeling complex physical systems where the behavior changes, like the transition from subsonic to supersonic flow.

## Worked example
**Problem:** Classify the Tricomi equation, $u_{xx} - x u_{yy} = 0$, and describe the regions where it is elliptic, parabolic, or hyperbolic. This equation is a simplified model for transonic fluid flow.

**Step 1: Identify the coefficients.**
Compare the given equation to the standard form $A u_{xx} + B u_{xy} + C u_{yy} + \dots = 0$.
We have:
*   $A = 1$
*   $B = 0$
*   $C = -x$

**Step 2: Compute the discriminant.**
The discriminant is $\Delta = B^2 - 4AC$.
$$ \Delta = (0)^2 - 4(1)(-x) = 4x $$

**Step 3: Analyze the sign of the discriminant.**
The classification depends on the value of $x$.
*   **Hyperbolic:** $\Delta > 0 \implies 4x > 0 \implies x > 0$.
    The equation is hyperbolic in the right half-plane. This corresponds to the supersonic region in the flow model.
*   **Parabolic:** $\Delta = 0 \implies 4x = 0 \implies x = 0$.
    The equation is parabolic on the y-axis. This corresponds to the sonic line where the flow speed is exactly Mach 1.
*   **Elliptic:** $\Delta < 0 \implies 4x < 0 \implies x < 0$.
    The equation is elliptic in the left half-plane. This corresponds to the subsonic region.

**Reflection:** This example demonstrates that the classification is not necessarily a global property of the equation. The coefficients can be functions of the independent variables, causing the PDE to change type across its domain. This mathematical change directly mirrors a physical change in the system being modeled (subsonic to supersonic flow).

## Diagrams
Here is a diagram showing the regions of classification for the Tricomi equation from the worked example.

```text
       y-axis
         ^
         |
         |
 Elliptic| Parabolic | Hyperbolic
  (x < 0) |  (x = 0)  |  (x > 0)
         |           |
<--------+-----------+---------> x-axis
         |           |
         |           |
         |           |
```

This diagram illustrates the characteristic curves for each type.

```text
      Hyperbolic (Δ > 0)         Parabolic (Δ = 0)          Elliptic (Δ < 0)
Two families of characteristics  One family of characteristics   No real characteristics

         y ^                      y ^                       y ^
           |  \   /                  |  -----                   |
           |   \ /                   |  -----                   |
           |    X                    |  -----                   |
           |   / \                   |  -----                   |
           |  /   \                  |  -----                   |
           +-----------> x          +-----------> x           +-----------> x
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of a grade report. **H**yperbolic is **P**ositive (great, $>0$), **P**arabolic is **Z**ero (pass/fail, $=0$), **E**lliptic is **N**egative (bad, $<0$). Or, "Hyper People Excel" -> Hyperbolic ($>$), Parabolic ($=$), Elliptic ($<$).

2.  **Must-Know Formula:** You must overlearn the general form and the discriminant.
    *   General Form: $A u_{xx} + B u_{xy} + C u_{yy} + \dots = 0$
    *   Discriminant: $\Delta = B^2 - 4AC$

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in **1 day**.
    *   Drill 5 classification problems in **3 days**.
    *   Re-derive the characteristic equation from first principles in **7 days**.
    *   Explain the physical meaning of each class to a peer (or a wall) in **16 days**.
    *   Do a mixed set of problems in **35 days**.

4.  **First Principles Pathway:** If you forget the formula, re-derive it. Start by seeking coordinate transformations $(\xi, \eta)$ that simplify the PDE. This search leads you to the characteristic curves, whose slopes $dy/dx$ must satisfy the quadratic equation $A(dy/dx)^2 - B(dy/dx) + C = 0$. The discriminant of *this* quadratic equation, which you can always derive using the quadratic formula, is $B^2 - 4AC$. The number of real solutions for the slope $dy/dx$ (two, one, or zero) defines the classification.

## Common mistakes
1.  **Ignoring the Standard Form:** Students incorrectly identify A, B, and C. For the equation $u_{xx} + 2u_{xy} + 5u_y = u_{yy}$, you must first rewrite it as $u_{xx} + 2u_{xy} - u_{yy} + 5u_y = 0$ to correctly identify $A=1, B=2, C=-1$.
2.  **The Factor of 2:** In conic sections, the form is often $Ax^2 + 2Bxy + \dots$. In PDEs, the standard form is $A u_{xx} + B u_{xy} + \dots$. Be vigilant: the coefficient of the mixed partial derivative is simply $B$. Do not halve it.
3.  **Global vs. Local:** Forgetting that classification can be local for variable-coefficient PDEs. Never say "the Tricomi equation is hyperbolic." State *where* it is hyperbolic.

## Self-check
1.  Classify the PDE: $3u_{xx} + 5u_{xy} - 2u_{yy} + u_x = 0$.
2.  Find the regions in the $(x, y)$ plane where the PDE $u_{xx} + 2x u_{xy} + (1-y^2)u_{yy} = 0$ is elliptic, parabolic, and hyperbolic. Sketch these regions.
3.  Consider the equation for a vibrating beam, $u_{tttt} + c^2 u_{xx} = 0$. Why does the discriminant test we have studied not apply directly to this equation? What does this imply about its classification?