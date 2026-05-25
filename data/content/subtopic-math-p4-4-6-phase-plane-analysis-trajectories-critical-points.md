## What it is
Phase plane analysis is a graphical method for studying the behavior of a 2D autonomous system of differential equations without finding an explicit solution. We treat the system's two state variables as coordinates in a "phase plane," and the differential equations define a vector field on this plane. Solution curves, called trajectories, follow this vector field, revealing the system's qualitative evolution from any starting condition.

## Why it matters
This technique is fundamental for understanding any system whose state can be described by two variables, from predator-prey population dynamics to the motion of a pendulum. In aerospace, it's used to analyze the stability of spacecraft attitude dynamics and simple orbital transfers. In physics, it provides the entire qualitative picture for any 1D conservative mechanical system, where the axes are position and momentum.

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **Multivariable Calculus:** Specifically, the concept of a vector field.
2.  **Linear Algebra:** You must be able to compute eigenvalues and eigenvectors of a 2x2 matrix. This is non-negotiable, as they determine the geometry of the solutions.
3.  **Basic ODEs:** You should understand what a first-order system of ODEs is and what a solution represents.

If you are not fluent in finding eigenvalues and eigenvectors, stop and master that first.

## How to study it (step by step)
1.  **Master the Linear Case:** Start with a generic 2x2 autonomous linear system: $\frac{d\vec{x}}{dt} = A\vec{x}$. Understand that $(0,0)$ is always the only critical point (if $A$ is invertible).
2.  **Connect Eigenvalues to Geometry:** For the system in step 1, calculate the eigenvalues $\lambda_1, \lambda_2$ of the matrix $A$. Write down a table connecting the nature of the eigenvalues (real/complex, positive/negative/zero) to the classification of the critical point (saddle, node, spiral, center).
3.  **Sketch a Linear System:** Take a specific matrix $A$. Find its eigenvalues and eigenvectors. Draw the phase plane axes. If the eigenvectors are real, draw them as straight lines through the origin. Use the signs of the eigenvalues to determine if trajectories move toward or away from the origin along these eigenvectors, then sketch a few other representative trajectories.
4.  **Introduce Nullclines:** For a nonlinear system $\frac{dx}{dt} = f(x,y)$, $\frac{dy}{dt} = g(x,y)$, find the critical points by solving the system of algebraic equations $f(x,y)=0$ and $g(x,y)=0$. The curves $f(x,y)=0$ (where vectors are vertical) and $g(x,y)=0$ (where vectors are horizontal) are called nullclines. Sketch them.
5.  **Linearize the Nonlinear:** For each critical point $(x_0, y_0)$ found in step 4, compute the Jacobian matrix $J(x_0, y_0) = \begin{pmatrix} \partial f/\partial x & \partial f/\partial y \\ \partial g/\partial x & \partial g/\partial y \end{pmatrix}$. The behavior of the nonlinear system *near* $(x_0, y_0)$ is almost always identical to the behavior of the linear system $\frac{d\vec{u}}{dt} = J(x_0, y_0)\vec{u}$.
6.  **Classify and Sketch:** Find the eigenvalues of the Jacobian at each critical point. Use your table from step 2 to classify each one. Stitch together the local pictures into a global phase portrait, using the nullclines to guide the direction of the trajectories.

## Key ideas, with intuition
1.  **The Plane is the State Space:** For a system $\frac{dx}{dt} = f(x,y)$, $\frac{dy}{dt} = g(x,y)$, a point $(x,y)$ represents the complete state of your system at some instant. For a pendulum, this could be (angle, angular velocity). The phase plane contains every possible state the system can be in.
2.  **The ODEs are a Velocity Field:** The right-hand side of the system, $\vec{v} = \langle f(x,y), g(x,y) \rangle$, is a vector that tells you the instantaneous velocity of the state. A trajectory is simply the path you would follow if you started at a point and always moved in the direction of the velocity vector at your current location.
    $$
    \frac{d\vec{x}}{dt} = \vec{F}(\vec{x})
    $$
3.  **Critical Points are Equilibria:** A critical (or fixed, or equilibrium) point is a state where the velocity is zero: $\vec{F}(\vec{x}_c) = \vec{0}$. If the system starts exactly at a critical point, it stays there forever. The stability of these points (do nearby trajectories flow toward or away from them?) governs the long-term behavior of the entire system.
4.  **Near Critical Points, Systems are Approximately Linear:** Zoom in far enough on a smooth nonlinear system near a critical point, and it looks like a linear system. The behavior of that linear system is determined entirely by the eigenvalues of its matrix (the Jacobian). This is the Hartman-Grobman theorem, and it's the theoretical justification for using eigenvalues to classify nonlinear critical points.
    *   **Real eigenvalues, opposite signs ($\lambda_1 < 0 < \lambda_2$):** Saddle point (unstable). One direction is attracted, one is repelled.
    *   **Real eigenvalues, same sign:** Node. Both stable ($\lambda_1, \lambda_2 < 0$) or both unstable ($\lambda_1, \lambda_2 > 0$).
    *   **Complex conjugate eigenvalues ($a \pm bi$):** Spiral. Stable if $a<0$, unstable if $a>0$. If $a=0$, it's a center (stable, but not attracting).

## Worked example
Analyze the system:
$$
\frac{dx}{dt} = -x + y
$$
$$
\frac{dy}{dt} = -x - 3y
$$

**Step 1: Formulate as a matrix system.**
This is a linear system $\frac{d\vec{x}}{dt} = A\vec{x}$ with $\vec{x} = \begin{pmatrix} x \\ y \end{pmatrix}$ and $A = \begin{pmatrix} -1 & 1 \\ -1 & -3 \end{pmatrix}$.

**Step 2: Find the critical point(s).**
We solve $A\vec{x} = \vec{0}$. Since $\det(A) = (-1)(-3) - (1)(-1) = 3+1=4 \neq 0$, the only solution is the trivial one, $(x,y) = (0,0)$.

**Step 3: Find the eigenvalues of A.**
We solve the characteristic equation $\det(A - \lambda I) = 0$.
$$
\det \begin{pmatrix} -1-\lambda & 1 \\ -1 & -3-\lambda \end{pmatrix} = (-1-\lambda)(-3-\lambda) - (1)(-1) = 0
$$
$$
(\lambda+1)(\lambda+3) + 1 = 0
$$
$$
\lambda^2 + 4\lambda + 3 + 1 = 0
$$
$$
\lambda^2 + 4\lambda + 4 = 0
$$
$$
(\lambda+2)^2 = 0
$$
We have a repeated real eigenvalue: $\lambda_1 = \lambda_2 = -2$.

**Step 4: Classify the critical point.**
Since the eigenvalue is real and negative, trajectories will be attracted to the origin. A repeated eigenvalue indicates a special type of node, called a degenerate or improper node. Since $\lambda < 0$, it is a **stable improper node**.

**Step 5: Find the eigenvector(s).**
We solve $(A - \lambda I)\vec{v} = \vec{0}$ with $\lambda = -2$.
$$
\begin{pmatrix} -1-(-2) & 1 \\ -1 & -3-(-2) \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ -1 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
This gives the equation $v_1 + v_2 = 0$, or $v_2 = -v_1$. The only eigenvector (up to scaling) is $\vec{v} = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.

**Step 6: Sketch the phase portrait.**
Because we have only one eigenvector, trajectories will become parallel to this vector as they approach the origin. To determine the direction of rotation, we can test a point, e.g., $(1,0)$. The velocity vector there is $A\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} -1 \\ -1 \end{pmatrix}$. This vector points down and to the left. This implies the trajectories spiral in a clockwise direction.

**Reflection:**
- Step 1 framed the problem correctly.
- Step 2 found the equilibrium state.
- Step 3, finding the eigenvalues, was the crucial classification step. The negative real part told us "stable," and the repeated root told us "improper node."
- Step 5 gave us the one special line that trajectories approach asymptotically.
- Step 6 used a test point to resolve the ambiguity of direction, completing the qualitative picture.

## Diagrams
A phase portrait for the worked example (stable improper node). Trajectories approach the origin parallel to the eigenvector $\vec{v} = (1, -1)$.

```text
        y
        ^
        |
     \  |  /
      \ | /
       \|/
<-------+-------> x
       /|\
      / | \
     /  |  \
        |

Description:
The axes are x and y, intersecting at the origin (0,0). The line y=-x is drawn as a dashed line; this is the eigenvector. Several trajectories are sketched. They all start from the periphery and move towards the origin. They curve in a clockwise direction, becoming tangent to the line y=-x just as they reach the origin. For example, a trajectory starting at (0, 2) would move down and left, crossing the y=-x line, and approach the origin from the third quadrant.
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the phase plane as a **topographical map of a landscape**, and a trajectory as the path a ball would take rolling down it. Critical points are the bottoms of bowls (stable nodes/spirals), the tops of hills (unstable nodes/spirals), or saddle points on a mountain pass. The vector field is the gradient of this landscape.
2.  **Must Overlearn:**
    *   Critical points: $\frac{dx}{dt} = 0$ and $\frac{dy}{dt} = 0$.
    *   Linearization: Use the Jacobian matrix $J = \begin{pmatrix} \partial f/\partial x & \partial f/\partial y \\ \partial g/\partial x & \partial g/\partial y \end{pmatrix}$ at the critical point.
    *   Stability from eigenvalues $\lambda = a \pm bi$:
        *   If any $a > 0 \implies$ Unstable.
        *   If all $a < 0 \implies$ Stable.
        *   If all $a = 0 \implies$ Center or other borderline case.
3.  **Spaced Repetition Schedule:** Redo the worked example from scratch and classify a new linear system at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the classification rules, remember the form of the general solution for a linear system: $\vec{x}(t) = c_1 e^{\lambda_1 t}\vec{v}_1 + c_2 e^{\lambda_2 t}\vec{v}_2$. The real part of $\lambda$ lives in an exponent. If it's positive, that term explodes as $t \to \infty$ (unstable). If it's negative, it decays to zero (stable). If it's zero, it oscillates forever (center). The imaginary part creates rotation ($e^{ibt} = \cos(bt) + i\sin(bt)$).

## Common mistakes
1.  **Confusing Nullclines and Trajectories:** A nullcline is a line where the vector field is purely vertical or purely horizontal. A trajectory *crosses* a nullcline with a vertical or horizontal tangent; it does not flow *along* the nullcline (unless the nullcline is also an eigenvector).
2.  **Eigenvalue Arithmetic Errors:** The most common source of error. A sign mistake in the characteristic polynomial leads to a completely wrong classification. Double-check $\det(A-\lambda I) = \lambda^2 - \text{tr}(A)\lambda + \det(A) = 0$.
3.  **Ignoring the Direction of Flow:** After classifying a point as a spiral or node, students often forget to determine if it's stable (inward) or unstable (outward). The sign of the real part of the eigenvalue tells you this. For spirals, they also forget to check if it's clockwise or counter-clockwise by testing a point (e.g., on the positive x-axis).

## Self-check
1.  Consider the linear system $\frac{dx}{dt} = 6x - y$, $\frac{dy}{dt} = 5x + 2y$. Find the critical point, classify its type and stability, and sketch the phase portrait.
2.  Find all critical points of the nonlinear system for the undamped pendulum: $\frac{d\theta}{dt} = \omega$, $\frac{d\omega}{dt} = -\frac{g}{L}\sin(\theta)$. Linearize the system at each critical point and classify them.
3.  You are analyzing a physical system and find a critical point that is a center. What does this imply about the energy of the system for trajectories near that point? How would this differ from a stable spiral?