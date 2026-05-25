## What it is
Stability analysis for an equilibrium point of a differential equation determines the long-term behavior of solutions that start near that point. An equilibrium is a state where the system is unchanging; stability asks if the system returns to this state after a small nudge (stable), flies away from it (unstable), or exhibits more complex behavior like orbiting it. This analysis is typically done by linearizing the system around the equilibrium and examining the eigenvalues of the resulting matrix.

## Why it matters
This is the foundation of control theory and dynamical systems analysis. In aerospace, it determines if a satellite's orbit or an aircraft's flight attitude is self-correcting or will catastrophically diverge after a disturbance. In machine learning, the minima of a loss function are stable equilibria, and understanding stability helps analyze why optimization algorithms like gradient descent converge.

## When to study it
You must be proficient with the following before proceeding:
1.  **Multivariable Calculus:** Specifically, computing the Jacobian matrix of a vector-valued function.
2.  **Linear Algebra:** Finding eigenvalues and eigenvectors of a 2x2 matrix is non-negotiable. You should understand what complex eigenvalues imply.
3.  **Systems of Linear ODEs:** You must know how to solve $\vec{x}' = A\vec{x}$ and understand how the solution's behavior depends on the eigenvalues of $A$.

If you are not fluent in these, stop and review them. Hand-waving your understanding of eigenvalues will make this topic impossible.

## How to study it (step by step)
1.  **Review Eigenvalues:** Solve for the eigenvalues and eigenvectors of five different 2x2 matrices. Include cases with real distinct, real repeated, and complex conjugate eigenvalues. Time yourself; this should be a fast, mechanical process.
2.  **Derive Linearization:** Take a general nonlinear system $\vec{x}' = \vec{f}(\vec{x})$ and a fixed point $\vec{x}_0$. Use a multivariable Taylor series expansion for $\vec{f}(\vec{x})$ around $\vec{x}_0$ and truncate after the linear term to derive the linearized system $\vec{u}' = J(\vec{x}_0)\vec{u}$, where $\vec{u} = \vec{x} - \vec{x}_0$.
3.  **Connect Eigenvalues to Solutions:** For the linearized system, write down the general solution form for each eigenvalue case (real positive, real negative, complex with positive/negative real part). Explicitly observe how the sign of the real part of the eigenvalue $\lambda$ in the term $e^{\lambda t}$ governs whether solutions grow or decay.
4.  **Classify and Sketch:** Create a table that maps eigenvalue properties (e.g., $\lambda_1 > \lambda_2 > 0$; $\lambda = a \pm ib$ with $a < 0$) to the name of the equilibrium (e.g., unstable node; stable spiral). For each case, sketch a generic phase portrait.
5.  **Solve a Full Problem:** Take a nonlinear system, find all its equilibria, and then linearize and classify each one. A good example is the simple pendulum with friction.

## Key ideas, with intuition
1.  **Equilibria are "flat spots."** An equilibrium point $\vec{x}_0$ is a point where the system dynamics are zero: $\vec{x}' = \vec{f}(\vec{x}_0) = \vec{0}$. If you start the system *exactly* at $\vec{x}_0$, it stays there forever. The interesting question is what happens if you start *near* $\vec{x}_0$.

2.  **Near an equilibrium, everything looks linear.** Any sufficiently smooth function looks like a line if you zoom in enough. We exploit this by replacing the complicated nonlinear function $\vec{f}(\vec{x})$ with its best linear approximation near $\vec{x}_0$. This approximation is given by the Jacobian matrix, $J$.
    $$ \vec{x}' = \vec{f}(\vec{x}) \approx \vec{f}(\vec{x}_0) + J(\vec{x}_0)(\vec{x} - \vec{x}_0) $$
    Since $\vec{f}(\vec{x}_0) = \vec{0}$, and letting $\vec{u} = \vec{x} - \vec{x}_0$ be the small perturbation from equilibrium, we get the linearized system:
    $$ \vec{u}' = J(\vec{x}_0)\vec{u} $$
    The behavior of this simple linear system almost always tells you the behavior of the original nonlinear system right around the equilibrium point.

3.  **Eigenvalues are exponential growth/decay rates.** The solution to the linearized system is a combination of terms like $e^{\lambda t}\vec{v}$, where $\lambda$ is an eigenvalue and $\vec{v}$ is its eigenvector.
    *   If $\text{Re}(\lambda) > 0$, the term $e^{\lambda t}$ grows exponentially. This pushes the solution *away* from the equilibrium. This is instability.
    *   If $\text{Re}(\lambda) < 0$, the term $e^{\lambda t}$ decays exponentially. This pulls the solution *toward* the equilibrium. This is stability.
    *   If $\text{Im}(\lambda) \neq 0$, the solution oscillates (due to Euler's formula: $e^{(a+ib)t} = e^{at}(\cos(bt) + i\sin(bt))$). This creates spirals or centers.

The classification is just a naming convention for these fundamental behaviors.
*   **Node:** Two real eigenvalues, same sign. Stable if both negative, unstable if both positive.
*   **Saddle:** Two real eigenvalues, opposite signs. Unstable, as it's stable in one direction (eigenvector for $\lambda<0$) but unstable in another (eigenvector for $\lambda>0$).
*   **Spiral:** Complex conjugate eigenvalues. Stable if real part is negative, unstable if positive.
*   **Centre:** Purely imaginary eigenvalues ($\text{Re}(\lambda) = 0$). Solutions orbit the point. This is the one case where the linear analysis is fragile; nonlinear terms can disrupt the perfect orbits.

## Worked example
Classify the stability of the equilibrium point at $(0,0)$ for the system:
$$
\begin{cases}
x' = -x + 4y \\
y' = x - y
\end{cases}
$$

**Step 1: Verify the equilibrium point.**
At $(0,0)$, we have $x' = -0 + 4(0) = 0$ and $y' = 0 - 0 = 0$. So, $(0,0)$ is indeed an equilibrium point.

**Step 2: Linearize the system.**
The system is already linear. We can write it in matrix form $\vec{x}' = A\vec{x}$:
$$
\begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix} -1 & 4 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}
$$
The matrix $A$ is the Jacobian of the system, evaluated at any point, since the system is linear.
$$ A = J(0,0) = \begin{pmatrix} -1 & 4 \\ 1 & -1 \end{pmatrix} $$

**Step 3: Find the eigenvalues of the matrix A.**
We solve the characteristic equation $\det(A - \lambda I) = 0$.
$$ \det \begin{pmatrix} -1-\lambda & 4 \\ 1 & -1-\lambda \end{pmatrix} = 0 $$
$$ (-1-\lambda)(-1-\lambda) - (4)(1) = 0 $$
$$ (\lambda+1)^2 - 4 = 0 $$
$$ \lambda^2 + 2\lambda + 1 - 4 = 0 $$
$$ \lambda^2 + 2\lambda - 3 = 0 $$
$$ (\lambda+3)(\lambda-1) = 0 $$
The eigenvalues are $\lambda_1 = 1$ and $\lambda_2 = -3$.

**Step 4: Classify the equilibrium based on the eigenvalues.**
We have two real eigenvalues with opposite signs ($\lambda_1 > 0$, $\lambda_2 < 0$). This is the definition of a **saddle point**.

**Reflection:**
*   Step 1 confirmed we were analyzing a valid fixed point.
*   Step 2 was trivial because the system was linear, but for a nonlinear system, this would involve computing the Jacobian. The matrix $A$ defines the local linear dynamics.
*   Step 3, finding the eigenvalues, is the core computational step. The roots of the characteristic polynomial determine everything.
*   Step 4 is the interpretation. The positive eigenvalue $\lambda_1=1$ implies exponential growth in one direction, while the negative eigenvalue $\lambda_2=-3$ implies exponential decay in another. This push-pull in different directions creates the characteristic saddle shape. The equilibrium is unstable because any component in the unstable direction will cause the solution to fly away.

## Diagrams

A saddle point, corresponding to the worked example ($\lambda_1 > 0, \lambda_2 < 0$). Trajectories are pulled in along the stable eigenvector's direction and pushed out along the unstable one.
```text
      ^ y
      |     /|\     /|\
      |      |       |
      |----->*<------|------> x
      |      |       |
      |     \|/     \|/
```

A stable spiral, corresponding to complex eigenvalues with $\text{Re}(\lambda) < 0$. Trajectories spiral inwards towards the equilibrium.
```text
      ^ y
      |
      |   \--_
      |  /    `\
      | |   *->|
      |  \._ / /
      |     `---
      +----------------> x
```

## Memory technique — remember this forever
1.  **The Mnemonic:** Think of a topographical map.
    *   **Stable Node:** The bottom of a bowl. A ball placed anywhere inside rolls to the bottom. ($\lambda_1, \lambda_2 < 0$)
    *   **Unstable Node:** The peak of a hill. A ball placed on top and nudged will roll away in any direction. ($\lambda_1, \lambda_2 > 0$)
    *   **Saddle:** The center of a Pringles chip or a mountain pass. The ball can roll down the sides (unstable direction) or is guided towards the center if it starts on the upward-curving ends (stable direction). ($\lambda_1 > 0, \lambda_2 < 0$)
    *   **Spiral:** A whirlpool (stable spiral) or a water spout (unstable spiral).
    *   **Centre:** A circular running track on perfectly flat ground.

2.  **Must-Know Formulas:**
    Let $A$ be the 2x2 Jacobian matrix with trace $T = \text{tr}(A)$ and determinant $D = \det(A)$. The eigenvalues are $\lambda = \frac{T \pm \sqrt{T^2 - 4D}}{2}$.
    *   **Stability:** If $T < 0$ and $D > 0$, it is **stable**.
    *   **Instability:** If $T > 0$ or $D < 0$, it is **unstable**.
    *   **Type:**
        *   $D < 0 \implies$ **Saddle** (real, opposite sign eigenvalues).
        *   $D > 0$ and $T^2 - 4D > 0 \implies$ **Node** (real, same sign eigenvalues).
        *   $D > 0$ and $T^2 - 4D < 0 \implies$ **Spiral** (complex conjugate eigenvalues).
        *   $D > 0$ and $T = 0 \implies$ **Centre** (purely imaginary eigenvalues).

3.  **Spaced Repetition Schedule:**
    Review this entire mini-lesson and re-derive the classifications from the eigenvalue signs at: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders now.

4.  **First Principles Pathway:**
    If you forget everything, remember this: the solution looks like $c_1 e^{\lambda_1 t}\vec{v}_1 + c_2 e^{\lambda_2 t}\vec{v}_2$.
    *   What does $e^{\lambda t}$ do as $t \to \infty$?
    *   If $\lambda$ is real and negative, it decays to 0.
    *   If $\lambda$ is real and positive, it blows up.
    *   If $\lambda = a+ib$, the term is $e^{at}e^{ibt}$. The $e^{at}$ part controls the amplitude (decay/growth), and the $e^{ibt}$ part causes rotation.
    You can rebuild the entire classification system from these two facts.

## Common mistakes
1.  **Analyzing the wrong point:** Students compute the Jacobian but forget to substitute the coordinates of the specific equilibrium point they are analyzing. The Jacobian is a function of $(x,y)$ for nonlinear systems.
2.  **Mixing up Trace and Determinant rules:** Memorizing the $T, D$ rules without understanding the underlying eigenvalue logic leads to errors. Forgetting that $D<0$ immediately implies a saddle is a common one.
3.  **Assuming centres are always stable:** The linear analysis for a centre ($T=0, D>0$) is borderline. Small nonlinear terms, which we ignored, can turn a centre into a stable or unstable spiral. You cannot conclude stability for a nonlinear system from a centre in its linearization.
4.  **Incorrectly solving the characteristic equation:** Simple algebra errors when finding eigenvalues are the most frequent source of incorrect classifications. Double-check your calculation of $(\lambda - a)(\lambda - d) - bc$.

## Self-check
1.  Classify the equilibrium at $(0,0)$ for the system $x' = -3x + 2y$, $y' = -2x + 2y$.
2.  Find the equilibrium point of the system $x' = x - y$, $y' = x^2 - 1$. Linearize the system at this point and classify its stability.
3.  Find all equilibrium points for the system $x' = x(1-x-y)$, $y' = y(0.5-0.25y-0.75x)$. Classify each one.