## What it is
Linearization is a technique for approximating a nonlinear system of differential equations with a linear system near a specific point of interest, typically an equilibrium point. This allows us to use the powerful and complete theory of linear systems to analyze the local behavior of the much more complex nonlinear system. The core idea is that sufficiently "zoomed in" on any smooth function, it looks like a line or a plane.

## Why it matters
Almost no real-world system is truly linear. In aerospace, the equations of motion for a rocket or satellite are highly nonlinear; linearization is the first step in designing control systems to maintain stable flight attitudes. In physics, analyzing the stability of a pendulum at its highest point or the oscillations of a molecule requires linearization. In machine learning, understanding the behavior of optimization algorithms near a local minimum often involves linearizing the gradient dynamics.

## When to study it
Before tackling this, you must have a firm grasp of three areas. If you are weak on these, stop and review.
1.  **Multivariable Calculus:** You must be able to compute partial derivatives and assemble them into the Jacobian matrix. The concept of a multivariable Taylor series is the formal justification for this entire method.
2.  **Linear Algebra:** You must be able to find eigenvalues and eigenvectors of a matrix. Critically, you must understand how the signs of the real parts of the eigenvalues and the presence of imaginary parts determine the geometric behavior of the system $\dot{\mathbf{x}} = A\mathbf{x}$ (e.g., saddle, node, spiral, center).
3.  **Introductory ODEs:** You must know how to find equilibrium points (also called fixed points or critical points) of a system $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$ by solving $\mathbf{f}(\mathbf{x}) = \mathbf{0}$.

## How to study it (step by step)
1.  **Derive the approximation.** Start with a general autonomous system $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$ and an equilibrium point $\mathbf{x}_0$. Write out the first-order multivariable Taylor expansion for $\mathbf{f}(\mathbf{x})$ around $\mathbf{x}_0$. Use the fact that $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$ to simplify the expression and arrive at the linearized system.
2.  **Master the mechanics.** Take a simple nonlinear system, like the pendulum equation. Convert it to a first-order system. Find its equilibrium points. For each point, calculate the Jacobian matrix and evaluate it *at that point* to get a constant matrix $A$.
3.  **Connect to linear theory.** For each matrix $A$ you found in the previous step, calculate its eigenvalues. Based on the eigenvalues, classify the equilibrium point (e.g., saddle, stable node, unstable spiral). Sketch the phase portrait for the *linear* system near the origin.
4.  **Understand the guarantee.** Read about the Hartman-Grobman theorem. Internalize what it says: for hyperbolic fixed points (where no eigenvalue has a zero real part), the phase portrait of the nonlinear system near the equilibrium point "looks the same" as the phase portrait of its linearization. This is the theorem that justifies our entire analysis.
5.  **Explore the limits.** Find an example of a non-hyperbolic fixed point (e.g., an eigenvalue is pure imaginary). Use a plotter to see how the true nonlinear behavior can differ from the linearized prediction (e.g., a center vs. a weak spiral). This builds an intuition for why the guarantee fails in borderline cases.

## Key ideas, with intuition
1.  **Tangent Spaces as Local Universes.** Imagine a complex, curved surface representing the flow of a nonlinear system. At any single point on that surface, you can lay down a flat tangent plane. Linearization is the act of pretending that, for a small region around that point, the dynamics live entirely on that simple, flat tangent plane. The Jacobian matrix defines the rules of motion in this flat "local universe."

2.  **The Jacobian is the "Multidimensional Derivative".** In single-variable calculus, the derivative $f'(a)$ gives the slope of the best linear approximation to $f(x)$ near $x=a$: $f(x) \approx f(a) + f'(a)(x-a)$. The Jacobian matrix $J(\mathbf{x}_0)$ is the exact same concept for a vector function $\mathbf{f}(\mathbf{x})$:
    $$ \mathbf{f}(\mathbf{x}) \approx \mathbf{f}(\mathbf{x}_0) + J(\mathbf{x}_0)(\mathbf{x} - \mathbf{x}_0) $$
    It captures all the first-order rates of change of the system's components with respect to each other.

3.  **Stability is Determined by Eigenvalues.** The stability of the linear system $\dot{\mathbf{u}} = A\mathbf{u}$ is entirely determined by the eigenvalues of $A$.
    - If all eigenvalues have a negative real part, trajectories are pulled toward the origin. The equilibrium is stable.
    - If any eigenvalue has a positive real part, some trajectories are pushed away. The equilibrium is unstable.
    - If there are eigenvalues with zero real part, the analysis is inconclusive (non-hyperbolic case).
    The Hartman-Grobman theorem states that this stability transfers directly to the original nonlinear system for the first two cases.

## Worked example
Consider the undamped pendulum, described by $\ddot{\theta} + \sin(\theta) = 0$. We'll set physical constants $g/L=1$ for simplicity.

**Step 1: Convert to a first-order system.**
Let $x_1 = \theta$ and $x_2 = \dot{\theta}$. Then the system is:
$$ \dot{x}_1 = x_2 $$
$$ \dot{x}_2 = -\sin(x_1) $$
In vector form, $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$ where $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$ and $\mathbf{f}(\mathbf{x}) = \begin{pmatrix} x_2 \\ -\sin(x_1) \end{pmatrix}$.

**Step 2: Find equilibrium points.**
We solve $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$.
$$ x_2 = 0 $$
$$ -\sin(x_1) = 0 $$
This gives $x_2 = 0$ and $x_1 = n\pi$ for any integer $n$. Let's analyze two points: $(0,0)$ (pendulum hanging down) and $(\pi, 0)$ (pendulum balanced perfectly upright).

**Step 3: Compute the Jacobian matrix.**
The Jacobian of $\mathbf{f}$ is a matrix of partial derivatives:
$$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\ \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -\cos(x_1) & 0 \end{pmatrix} $$

**Step 4: Linearize at each equilibrium point.**
*   **Case 1: The downward point $(0,0)$.**
    Evaluate the Jacobian at $(0,0)$:
    $$ A_1 = J(0,0) = \begin{pmatrix} 0 & 1 \\ -\cos(0) & 0 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} $$
    The linearized system is $\dot{\mathbf{u}} = A_1 \mathbf{u}$. Find the eigenvalues of $A_1$: $\det(A_1 - \lambda I) = \lambda^2 + 1 = 0 \implies \lambda = \pm i$.
    *Reflection:* Pure imaginary eigenvalues suggest a center in the linear system. This corresponds to small oscillations around the stable equilibrium, which is physically correct. This is a non-hyperbolic point, so linearization doesn't guarantee stability, but in this physical system we know it is a center.

*   **Case 2: The upright point $(\pi,0)$.**
    Evaluate the Jacobian at $(\pi,0)$:
    $$ A_2 = J(\pi,0) = \begin{pmatrix} 0 & 1 \\ -\cos(\pi) & 0 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} $$
    The linearized system is $\dot{\mathbf{u}} = A_2 \mathbf{u}$. Find the eigenvalues of $A_2$: $\det(A_2 - \lambda I) = \lambda^2 - 1 = 0 \implies \lambda = \pm 1$.
    *Reflection:* The eigenvalues are real and of opposite sign ($\lambda_1 = 1, \lambda_2 = -1$). This is the signature of a saddle point. The equilibrium is unstable. This is physically correct: the slightest perturbation from the upright position will cause the pendulum to fall away. Since this is a hyperbolic point, the nonlinear system's behavior near $(\pi,0)$ is definitively that of a saddle.

## Diagrams
Here are ASCII diagrams for the phase portraits of the two linearized systems from the example. `u1` corresponds to the perturbation in angle, `u2` to the perturbation in angular velocity.

Linearization at $(0,0)$ (Center):
```text
      u2
      ^
      |
   .-----.
  /       \
 <         >
 |    O    |
 <         >
  \       /
   '-----'
      |
      +---------> u1
```
*Description: Trajectories are closed ellipses centered at the origin, representing periodic oscillations.*

Linearization at $(\pi,0)$ (Saddle):
```text
      u2
      ^
      | \   /
      |  \ /
<---- |---O---| ---->
      |  / \
      | /   \
      |
      +---------> u1
```
*Description: Trajectories come in along the stable eigenvector (the u1-axis in this case, for $\lambda=-1$) and fly out along the unstable eigenvector (the line u2=u1, for $\lambda=1$).*

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a tiny bug standing on a vast, hilly landscape (the nonlinear system's behavior). You can't see the whole landscape, only the ground right under your feet. To figure out if you're at the bottom of a valley (stable point) or the top of a hill (unstable point), you lay down a small, flat piece of cardboard (the linear approximation). The steepness and direction of this cardboard (the Jacobian's eigenvalues) tells you whether you'll roll away or stay put.

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    *   Equilibrium condition: $\mathbf{f}(\mathbf{x}_0) = \mathbf{0}$
    *   Jacobian matrix: $J_{ij} = \frac{\partial f_i}{\partial x_j}$
    *   Linearized system: $\dot{\mathbf{u}} = J(\mathbf{x}_0)\mathbf{u}$, where $\mathbf{u} = \mathbf{x} - \mathbf{x}_0$

3.  **Spaced Repetition Schedule:** Redo the pendulum example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not look at the solution until you are finished or completely stuck.

4.  **First Principles Pathway:** If you forget everything, remember the **multivariable Taylor series**. Any differentiable function $\mathbf{f}(\mathbf{x})$ near a point $\mathbf{x}_0$ can be written as:
    $$ \mathbf{f}(\mathbf{x}) = \mathbf{f}(\mathbf{x}_0) + J(\mathbf{x}_0)(\mathbf{x} - \mathbf{x}_0) + \text{Higher Order Terms} $$
    The entire method derives from this. For an ODE $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$, let $\mathbf{x} = \mathbf{x}_0 + \mathbf{u}$. Then $\dot{\mathbf{x}} = \dot{\mathbf{u}}$. Substitute into the Taylor expansion, use the fact that $\mathbf{f}(\mathbf{x}_0)=\mathbf{0}$ for an equilibrium point, and ignore the higher order terms. You will re-derive $\dot{\mathbf{u}} \approx J(\mathbf{x}_0)\mathbf{u}$.

## Common mistakes
1.  **Evaluating the Jacobian Incorrectly.** A common error is to analyze the Jacobian $J(\mathbf{x})$ with variables still in it. You must substitute the specific coordinates of the equilibrium point $\mathbf{x}_0$ to get a constant matrix before finding eigenvalues.
2.  **Linearizing Around a Non-Equilibrium Point.** The entire stability analysis is based on perturbations from a state of rest. If you linearize around a point $\mathbf{x}_a$ where $\mathbf{f}(\mathbf{x}_a) \neq \mathbf{0}$, the resulting linear equation will be non-homogeneous, and the eigenvalue analysis for stability is not directly applicable.
3.  **Over-trusting the Linearization for Non-Hyperbolic Cases.** When an eigenvalue has a zero real part (e.g., $\lambda = \pm i$ or $\lambda = 0$), the linearization is inconclusive. The linear system might show a center, but the nonlinear system could have a stable or unstable spiral. The higher-order terms, which we ignored, now dominate the dynamics.

## Self-check
1.  Consider the system $\dot{x} = x - xy$, $\dot{y} = -y + xy$. Find all equilibrium points. Linearize the system around the equilibrium point where $x>0$ and $y>0$. Classify this point.
2.  The Van der Pol oscillator is given by $\ddot{x} - \mu(1-x^2)\dot{x} + x = 0$. Convert this to a system of two first-order equations. Show that the origin $(0,0)$ is the only equilibrium point. Linearize the system at the origin and analyze its stability for $\mu < 0$, $\mu=0$, and $\mu > 0$.
3.  Suppose you linearize a 2D system at an equilibrium point and find the eigenvalues are $\lambda = \pm 2i$. What are the possible behaviors of the *original nonlinear system* near this point? Explain why your linear analysis is not sufficient to distinguish between them.