## What it is

In a linear dynamical system described by the differential equation $\dot{x} = Ax$, the eigenvalues of the state matrix $A$ are complex numbers that perfectly describe the system's natural behaviors over time. The real part of each eigenvalue dictates whether the system's energy exponentially explodes or decays (stability), while the imaginary part dictates the frequency at which the system oscillates (system modes).

## Why it matters

When designing a Guidance, Navigation, and Control (GNC) system for a rocket or aircraft, you must ensure the vehicle does not tumble out of control. The eigenvalues of the vehicle's flight dynamics matrix immediately tell you if the vehicle is naturally stable (like a dart) or unstable (like balancing a broom on your hand). Furthermore, they tell you exactly what control effort is required to artificially shift those eigenvalues into a stable configuration. 

## When to study it

You must have a rock-solid grasp of:
1. **Linear Algebra:** Matrix multiplication, determinants, and finding eigenvalues/eigenvectors ($\det(A - \lambda I) = 0$).
2. **Ordinary Differential Equations:** Solving first-order linear ODEs ($\dot{x} = ax$).
3. **Complex Numbers:** Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$).

If you cannot confidently find the eigenvalues of a $2 \times 2$ matrix or do not intuitively understand why the derivative of $e^{at}$ is $a e^{at}$, stop and review those topics first.

## How to study it (step by step)

1. **Review the scalar case:** Solve the 1D system $\dot{x} = ax$. Graph $x(t)$ for $a = -1$, $a = 0$, and $a = 1$. This builds the baseline intuition for exponential growth and decay.
2. **Diagonalize a $2 \times 2$ system:** Take a coupled system $\dot{x} = Ax$ and rewrite it as $\dot{z} = \Lambda z$ using the eigenvector matrix $V$ (where $x = Vz$ and $\Lambda$ is the diagonal matrix of eigenvalues). Prove to yourself that a coupled matrix system is just a set of independent scalar systems hiding in a different coordinate frame.
3. **Map the complex plane:** Plot generic eigenvalues $\lambda = \sigma \pm i\omega$ on a 2D plane (Real vs. Imaginary axes). Write down the mapping: horizontal position ($\sigma$) equals growth/decay rate; vertical position ($\omega$) equals oscillation frequency.
4. **Solve a physical system:** Write the equations of motion for a simple mass-spring-damper. Convert the second-order differential equation into a system of two first-order equations ($\dot{x} = Ax$). Calculate the eigenvalues of $A$.
5. **Perturb the physics:** In your mass-spring-damper, mathematically increase the damping coefficient. Recalculate the eigenvalues. Watch how they migrate across the complex plane.

## Key ideas, with intuition

**1. The State-Space Representation**
We write linear systems as $\dot{x} = Ax$. The matrix $A$ acts as a map: you feed it the current state of the system $x$, and it spits out the current velocity of the system $\dot{x}$. 

**2. The Matrix Exponential**
The solution to the scalar equation $\dot{x} = ax$ is $x(t) = x(0)e^{at}$. 
The solution to the matrix equation $\dot{x} = Ax$ is exactly analogous: $x(t) = e^{At}x(0)$. 
If $A$ is diagonalizable, we can decompose it into its eigenvalues and eigenvectors. The time evolution of the system is entirely governed by $e^{\lambda_i t}$, where $\lambda_i$ are the eigenvalues of $A$.

**3. Complex Eigenvalues Dictate Time History**
Eigenvalues are generally complex numbers: $\lambda = \sigma + i\omega$. 
Plug this into the exponential:
$$e^{\lambda t} = e^{(\sigma + i\omega)t} = e^{\sigma t} \cdot e^{i\omega t}$$
Using Euler's formula, this expands to:
$$e^{\lambda t} = e^{\sigma t} (\cos(\omega t) + i\sin(\omega t))$$
This equation is the Rosetta Stone of linear systems. It separates the behavior into two distinct physical phenomena:
*   **$e^{\sigma t}$ (The Envelope):** Governed entirely by the real part $\sigma$.
*   **$\cos(\omega t)$ (The Oscillation):** Governed entirely by the imaginary part $\omega$.

**4. The Stability Criteria**
Because the envelope of the system's response is $e^{\sigma t}$, stability is determined strictly by the sign of $\sigma$ (the real part of the eigenvalue):
*   **$\sigma < 0$ (Left half-plane):** $e^{\sigma t}$ shrinks to 0. The system is asymptotically **stable**.
*   **$\sigma > 0$ (Right half-plane):** $e^{\sigma t}$ grows to infinity. The system is **unstable**.
*   **$\sigma = 0$ (Imaginary axis):** $e^{0} = 1$. The system neither grows nor decays. It is **marginally stable** (pure oscillation).

## Worked example

Let's analyze an undamped harmonic oscillator (a mass on a spring with no friction). Let mass $m=1$ and stiffness $k=4$.
The equation of motion is: $\ddot{y} = -4y$.

**Step 1: Convert to state-space.**
Define the state vector $x = \begin{bmatrix} y \\ \dot{y} \end{bmatrix} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}$.
Take the derivative:
$\dot{x}_1 = \dot{y} = x_2$
$\dot{x}_2 = \ddot{y} = -4x_1$

Write this as $\dot{x} = Ax$:
$$ \begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -4 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} $$

**Step 2: Find the eigenvalues of $A$.**
Set $\det(A - \lambda I) = 0$:
$$ \det \begin{bmatrix} -\lambda & 1 \\ -4 & -\lambda \end{bmatrix} = (-\lambda)(-\lambda) - (1)(-4) = \lambda^2 + 4 = 0 $$
$$ \lambda^2 = -4 \implies \lambda = \pm 2i $$

**Reflection:**
The eigenvalues are $\lambda = 0 \pm 2i$. 
The real part is $\sigma = 0$. Therefore, $e^{0t} = 1$. The system does not decay or grow; it is marginally stable.
The imaginary part is $\omega = 2$. The system oscillates at $2 \text{ rad/s}$. This perfectly matches our physical intuition of a frictionless mass-spring system bouncing forever.

## Diagrams

```text
The Complex S-Plane (Eigenvalue Locations)

         Imaginary Axis (jw)
                ^
                |   x  <-- High frequency oscillation, decaying
                |
                |
                |          x <-- Low frequency oscillation, GROWING
                |
----------------+-----------------> Real Axis (sigma)
                | Origin (0,0)
                |
                |          x <-- Conjugate pair
                |
                |   x  <-- Conjugate pair
                v

   STABLE REGION       UNSTABLE REGION
   (Left Half)         (Right Half)
   sigma < 0           sigma > 0
```

## Memory technique — remember this forever

1. **Mnemonic:** *"Left is Life, Right is Ruin."* 
   If your eigenvalues fall on the left side of the complex plane ($\sigma < 0$), your rocket lives. If they fall on the right side ($\sigma > 0$), your rocket is ruined.
2. **Must overlearn formula:** $\lambda = \sigma \pm i\omega \implies x(t) \propto e^{\sigma t}\sin(\omega t)$.
3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget why eigenvalues matter, derive it. Assume a solution of the form $x(t) = v e^{\lambda t}$ for the system $\dot{x} = Ax$. 
   Take the derivative: $\dot{x}(t) = \lambda v e^{\lambda t}$. 
   Substitute both into the original ODE: $\lambda v e^{\lambda t} = A v e^{\lambda t}$. 
   Divide out the scalar $e^{\lambda t}$, leaving $Av = \lambda v$. This proves that the temporal behavior of a linear system is strictly an eigenvalue problem.

## Common mistakes

1. **Confusing the eigenvalue with the eigenvector.** The eigenvalue $\lambda$ tells you *how* the mode evolves in time ($e^{\lambda t}$). The eigenvector $v$ tells you *what physical states* are participating in that mode.
2. **Assuming $\sigma = 0$ is "safe".** Marginal stability ($\sigma = 0$) is mathematically stable, but practically dangerous. In the real world, tiny unmodeled nonlinearities or aerodynamic perturbations will easily push a marginally stable eigenvalue into the right half-plane.
3. **Forgetting complex eigenvalues always come in conjugate pairs.** If your state matrix $A$ has real physical coefficients, any complex eigenvalue $\sigma + i\omega$ MUST be accompanied by $\sigma - i\omega$. 

## Self-check

1. A $2 \times 2$ matrix $A$ has eigenvalues $\lambda = -2 \pm 3i$. What is the mathematical envelope of the system's decay over time, and what is its oscillation frequency?
2. Construct a diagonal state matrix $A$ for a system that exhibits pure exponential growth at a rate of $e^{5t}$ in one state, and pure decay at $e^{-t}$ in the other state, with absolutely no oscillation.
3. Prove mathematically that if $A$ has a zero eigenvalue ($\lambda = 0$), the system has at least one equilibrium point (a state where $\dot{x} = 0$) other than the origin.