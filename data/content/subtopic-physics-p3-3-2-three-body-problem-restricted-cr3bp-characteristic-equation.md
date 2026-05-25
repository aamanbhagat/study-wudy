## What it is
The characteristic equation in the Circular Restricted Three-Body Problem (CR3BP) is a polynomial equation derived from the linearized equations of motion around a Lagrange point. Its roots, called eigenvalues, determine the local stability of that equilibrium point. A positive real root implies the point is unstable, causing small perturbations to grow exponentially over time.

## Why it matters
This equation is fundamental to modern astrodynamics and mission design. It tells us whether a spacecraft placed at a Lagrange point (like the James Webb Space Telescope at L2) will stay there or drift away, thus dictating the fuel budget for station-keeping. Furthermore, the structure of its solutions gives rise to the complex and fuel-efficient trajectories used in deep-space missions, such as halo orbits and low-energy interplanetary transfers.

## When to study it
You must have a solid grasp of the following prerequisites before tackling this topic:
*   Newtonian mechanics and gravitation.
*   The two-body problem and Keplerian orbits.
*   Rotating reference frames, including Coriolis and centrifugal accelerations.
*   The definition of the CR3BP and the location of the five Lagrange points.
*   Linearization of nonlinear systems of differential equations using the Jacobian matrix.
*   The concept of eigenvalues and eigenvectors to determine the stability of linear systems.

If you are not confident in these areas, particularly linearization and rotating frames, review them first.

## How to study it (step by step)
1.  **Write the Full Equations:** Start by writing down the full, nonlinear equations of motion for the massless third body in the synodic (rotating) frame. Ensure you understand the origin of each term: gravity from the two primaries, centrifugal force, and Coriolis force.
2.  **Define the Potential:** Combine all position-dependent forces into a single effective potential, often denoted $U$. Re-write the equations of motion using the partial derivatives of $U$. This simplifies the notation significantly. The equations become $\ddot{x} - 2n\dot{y} = \frac{\partial U}{\partial x}$ and $\ddot{y} + 2n\dot{x} = \frac{\partial U}{\partial y}$.
3.  **Linearize the System:** Choose a Lagrange point $(x_L, y_L)$. Consider a small displacement from this point: $x(t) = x_L + \xi(t)$, $y(t) = y_L + \eta(t)$. Substitute these into the equations of motion and perform a first-order Taylor expansion of the potential derivatives around the Lagrange point. Discard all terms of order two or higher in $\xi, \eta$ and their derivatives.
4.  **Assume an Exponential Solution:** For the resulting linear system of differential equations, assume a solution of the form $\xi(t) = A e^{\lambda t}$ and $\eta(t) = B e^{\lambda t}$. Substitute this ansatz into your linearized equations.
5.  **Form the Matrix Equation:** After substitution, you will have a system of linear algebraic equations for the coefficients $A$ and $B$. Write this in matrix form: $\mathbf{M} \begin{pmatrix} A \\ B \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$. The entries of the matrix $\mathbf{M}$ will be functions of $\lambda$ and the second partial derivatives of the potential ($U_{xx}, U_{yy}, U_{xy}$) evaluated at the Lagrange point.
6.  **Find the Determinant:** For a non-trivial solution to exist (i.e., $A, B$ not both zero), the determinant of the matrix $\mathbf{M}$ must be zero. Setting $\det(\mathbf{M}) = 0$ gives you the characteristic equation, a polynomial in $\lambda$.

## Key ideas, with intuition
1.  **Equilibrium is Not Stability:** The Lagrange points are points of equilibrium where the gravitational and centrifugal forces perfectly balance in the rotating frame. This is like a ball resting at the bottom of a bowl (stable) or balanced on top of a hill (unstable). The characteristic equation is the mathematical tool that tells us whether we're in the bowl or on the hill.

2.  **Linearization is a Magnifying Glass:** The full dynamics of the CR3BP are incredibly complex and chaotic. Linearization is like using a powerful magnifying glass to look at the dynamics in an infinitesimally small region around an equilibrium point. In that tiny region, the complex curves of the force field look like straight lines, and the system behaves linearly. The stability of this simple linear system tells us about the stability of the original nonlinear system *locally*.

3.  **Eigenvalues Dictate the Motion's "Character":** The roots $\lambda$ of the characteristic equation are the eigenvalues of the linearized system. They describe the fundamental modes of motion near the equilibrium point.
    $$ \text{Perturbation} \propto e^{\lambda t} $$
    *   If $\lambda$ is real and positive ($\lambda = a > 0$), the perturbation grows exponentially ($e^{at}$). This is instability.
    *   If $\lambda$ is real and negative ($\lambda = -a < 0$), the perturbation decays exponentially ($e^{-at}$). This is stability.
    *   If $\lambda$ is purely imaginary ($\lambda = \pm i\omega$), the perturbation oscillates ($e^{\pm i\omega t} = \cos(\omega t) \pm i\sin(\omega t)$). This is neutral or linear stability.
    *   If $\lambda$ is complex ($\lambda = a \pm i\omega$), the motion is a growing ($a>0$) or decaying ($a<0$) spiral.

## Worked example
Let's derive the characteristic equation for the in-plane motion near a collinear Lagrange point (L1, L2, or L3).

**1. Linearized Equations of Motion:**
The CR3BP equations of motion can be written in terms of the effective potential $U$:
$$ \ddot{x} - 2n\dot{y} = \frac{\partial U}{\partial x} $$
$$ \ddot{y} + 2n\dot{x} = \frac{\partial U}{\partial y} $$
Let the Lagrange point be $(x_L, 0)$. Let the perturbation be $\xi = x - x_L$ and $\eta = y - 0$. The linearized equations are:
$$ \ddot{\xi} - 2n\dot{\eta} = U_{xx}\xi + U_{xy}\eta $$
$$ \ddot{\eta} + 2n\dot{\xi} = U_{yx}\xi + U_{yy}\eta $$
where the partial derivatives $U_{xx}, U_{xy}, \dots$ are constants evaluated at the Lagrange point. For collinear points, symmetry dictates that $U_{xy} = U_{yx} = 0$.
$$ \ddot{\xi} - 2n\dot{\eta} = U_{xx}\xi $$
$$ \ddot{\eta} + 2n\dot{\xi} = U_{yy}\eta $$

**2. Assume Exponential Solution:**
Let $\xi(t) = A e^{\lambda t}$ and $\eta(t) = B e^{\lambda t}$. The derivatives are $\dot{\xi} = \lambda A e^{\lambda t}$, $\ddot{\xi} = \lambda^2 A e^{\lambda t}$, and similarly for $\eta$.

**3. Substitute and Form the Matrix Equation:**
Substituting into the linearized equations and dividing by $e^{\lambda t}$:
$$ \lambda^2 A - 2n\lambda B = U_{xx} A $$
$$ \lambda^2 B + 2n\lambda A = U_{yy} B $$
Rearranging to group terms with A and B:
$$ (\lambda^2 - U_{xx})A - (2n\lambda)B = 0 $$
$$ (2n\lambda)A + (\lambda^2 - U_{yy})B = 0 $$
In matrix form:
$$ \begin{pmatrix} \lambda^2 - U_{xx} & -2n\lambda \\ 2n\lambda & \lambda^2 - U_{yy} \end{pmatrix} \begin{pmatrix} A \\ B \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$

**4. Calculate the Determinant:**
For a non-trivial solution, the determinant of the matrix must be zero.
$$ \det \begin{pmatrix} \lambda^2 - U_{xx} & -2n\lambda \\ 2n\lambda & \lambda^2 - U_{yy} \end{pmatrix} = 0 $$
$$ (\lambda^2 - U_{xx})(\lambda^2 - U_{yy}) - (-2n\lambda)(2n\lambda) = 0 $$
$$ \lambda^4 - (U_{xx} + U_{yy})\lambda^2 + U_{xx}U_{yy} + 4n^2\lambda^2 = 0 $$
In the normalized units of the CR3BP, the mean motion $n=1$.
$$ \lambda^4 + (4 - U_{xx} - U_{yy})\lambda^2 + U_{xx}U_{yy} = 0 $$

This is the characteristic equation for in-plane motion.

**Reflection:**
Each step follows a standard procedure for stability analysis. Step 1 simplifies the physics into a linear system. Step 2 introduces the ansatz that turns differential equations into algebraic ones. Step 3 organizes these into a standard matrix problem. Step 4 uses a fundamental result from linear algebra (that the determinant must be zero for non-trivial solutions) to extract the final characteristic equation. The structure of this equation, a quadratic in $\lambda^2$, is a direct consequence of the underlying Hamiltonian structure of the problem.

## Diagrams
```text
                 L3
                  *
                  |
                  |
      +y          |
      ^           |
      |           |
M1----*-----------+-----------*----M2 -------> +x
(1-μ) L1          |           L2   (μ)
                  |
                  |
                  |
                  *
                 L4 (Equilateral)

(Diagram shows the synodic/rotating frame. M1 and M2 are the primary masses.
 L1, L2, L3 are the collinear Lagrange points. L4 and L5 (not shown)
 form equilateral triangles with M1 and M2.)
```

## Memory technique — remember this forever
1.  **Story:** Think of the characteristic equation as the "Destiny Equation" for a spacecraft near a Lagrange point. The system is born at an equilibrium point. We perturb it slightly. The roots, $\lambda$, are its "genes." If any gene ($\lambda$) has a positive real part, its destiny is to grow uncontrollably and fly away from home (instability). If all genes are purely imaginary, its destiny is to oscillate around home forever (stability).

2.  **Formulas to Overlearn:**
    *   The linearized equations (with Coriolis coupling):
        $$ \ddot{\xi} - 2\dot{\eta} = U_{xx}\xi $$
        $$ \ddot{\eta} + 2\dot{\xi} = U_{yy}\eta $$
        (This is the simplified form for collinear points where $n=1$ and $U_{xy}=0$).
    *   The characteristic equation for in-plane motion at a collinear point:
        $$ \lambda^4 + (4 - U_{xx} - U_{yy})\lambda^2 + U_{xx}U_{yy} = 0 $$

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, try to re-derive the characteristic equation from the equations of motion without looking at your notes.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    1.  Start with Newton's second law in a rotating frame: $\mathbf{a}_{rot} = \mathbf{F}_{grav}/m - 2(\mathbf{\omega} \times \mathbf{v}_{rot}) - \mathbf{\omega} \times (\mathbf{\omega} \times \mathbf{r})$.
    2.  Write this out in 2D components for the CR3BP. This gives you the full nonlinear equations.
    3.  Identify the equilibrium points (Lagrange points) where acceleration and velocity are zero.
    4.  Linearize the equations around one of these points by taking the Jacobian of the system.
    5.  Find the eigenvalues of the resulting linear system by solving $\det(\mathbf{J} - \lambda\mathbf{I}) = 0$. This is the characteristic equation.

## Common mistakes
*   **Forgetting Coriolis:** Dropping the $2n\dot{y}$ and $2n\dot{x}$ terms. These terms are essential; they couple the x and y motion and are a primary reason the dynamics are so rich.
*   **Sign Errors in the Potential:** The effective potential $U$ combines gravitational potential (negative) and a centrifugal-like term (positive). A sign error here will propagate through all the second derivatives and lead to incorrect stability conclusions.
*   **Evaluating Derivatives Incorrectly:** The coefficients $U_{xx}, U_{yy}$ are not variables; they are numbers obtained by evaluating the second partial derivatives *at* the specific Lagrange point in question.
*   **Assuming Instability Means Useless:** Finding that L1, L2, and L3 are unstable does not mean they are useless. It means a spacecraft there requires active control (station-keeping), and it also enables the existence of fascinating trajectories *near* these points, like halo orbits.

## Self-check
1.  What is the physical interpretation of the roots of the characteristic equation being a complex conjugate pair with a positive real part, i.e., $\lambda = a \pm i\omega$ where $a > 0$?
2.  The out-of-plane ($z$) motion in the CR3BP linearizes to $\ddot{\zeta} = U_{zz}\zeta$. What is its characteristic equation? What condition must $U_{zz}$ satisfy for the motion to be stable in the vertical direction?
3.  For the equilateral Lagrange points L4 and L5, the second partial derivative $U_{xy}$ is non-zero. Re-derive the characteristic equation starting from the general linearized equations (before setting $U_{xy}=0$) and explain how this term changes the final polynomial.