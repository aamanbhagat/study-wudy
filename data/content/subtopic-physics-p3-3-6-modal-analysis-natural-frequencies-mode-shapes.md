## What it is
Modal analysis is the study of the dynamic properties of structures under vibrational excitation. It identifies a system's "natural frequencies" (the specific rates at which the structure naturally oscillates when disturbed) and "mode shapes" (the physical deformation patterns the structure assumes at those frequencies). 

## Why it matters
Rockets endure extreme acoustic and vibrational loads during launch. If the launch vehicle's forcing frequency (from engine thrust or aerodynamics) matches the spacecraft's natural frequency, resonance occurs. This amplifies vibrations until structural failure—tearing off solar panels or triggering "Pogo" oscillations that can destroy a rocket. Modal analysis allows engineers to design structures with natural frequencies safely outside the spectrum of launch vehicle vibrations.

## When to study it
You must already understand:
1. Linear Algebra: Matrix determinants, eigenvalues, and eigenvectors.
2. Differential Equations: Second-order linear ODEs.
3. Classical Mechanics: Free-body diagrams and coupled mass-spring systems.

If you cannot confidently find the eigenvalues of a $2 \times 2$ matrix or solve $m\ddot{x} + kx = 0$, stop here and review those prerequisites.

## How to study it (step by step)
1. Write down Newton's second law for a multi-degree-of-freedom system to form the matrix equation of motion: $M\ddot{\vec{x}} + K\vec{x} = \vec{0}$.
2. Substitute the harmonic guess $\vec{x}(t) = \vec{\phi} e^{i\omega t}$ to convert the differential equation into an algebraic eigenvalue problem.
3. Solve the characteristic equation $\det(K - \omega^2 M) = 0$ to find the eigenvalues ($\lambda = \omega^2$).
4. Take the square root of the eigenvalues to find the natural frequencies ($\omega_n$).
5. Substitute each $\omega_n$ back into the matrix equation to solve for the corresponding eigenvectors, which represent the mode shapes ($\vec{\phi}_n$).
6. Verify orthogonality: check that $\vec{\phi}_1^T M \vec{\phi}_2 = 0$.

## Key ideas, with intuition

**The Matrix Equation of Motion**
Any complex linear structure can be modeled as a giant system of masses and springs. 
$$M\ddot{\vec{x}} + K\vec{x} = \vec{0}$$
Here, $M$ is the mass matrix (inertia), $K$ is the stiffness matrix (restoring forces), and $\vec{x}$ is the displacement vector. 

**The Harmonic Assumption**
When a structure vibrates at a natural frequency, every point in the structure moves in sync, reaching maximum displacement simultaneously. We express this mathematically by separating space and time:
$$\vec{x}(t) = \vec{\phi} \sin(\omega t)$$
where $\vec{\phi}$ is a constant vector of spatial amplitudes (the mode shape) and $\omega$ is the angular frequency.

**The Generalized Eigenvalue Problem**
Taking the second time derivative of our harmonic guess gives $\ddot{\vec{x}} = -\omega^2 \vec{\phi} \sin(\omega t)$. Substituting this into the equation of motion yields:
$$(K - \omega^2 M)\vec{\phi} = \vec{0}$$
For the structure to vibrate at all, $\vec{\phi}$ cannot be the zero vector. Therefore, the matrix $(K - \omega^2 M)$ must be singular, meaning its determinant is zero:
$$\det(K - \omega^2 M) = 0$$
This is the characteristic equation. The roots are the natural frequencies ($\omega$), and the null spaces are the mode shapes ($\vec{\phi}$).

## Worked example
Consider two identical masses $m$, connected to each other and to two rigid walls by three identical springs with stiffness $k$. Let $x_1$ and $x_2$ be their displacements.

**1. Equations of Motion:**
Mass 1: $m\ddot{x}_1 = -kx_1 + k(x_2 - x_1) \implies m\ddot{x}_1 + 2kx_1 - kx_2 = 0$
Mass 2: $m\ddot{x}_2 = -k(x_2 - x_1) - kx_2 \implies m\ddot{x}_2 - kx_1 + 2kx_2 = 0$

**2. Matrix Form:**
$$ \begin{bmatrix} m & 0 \\ 0 & m \end{bmatrix} \begin{bmatrix} \ddot{x}_1 \\ \ddot{x}_2 \end{bmatrix} + \begin{bmatrix} 2k & -k \\ -k & 2k \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} $$

**3. Characteristic Equation:**
Set $\det(K - \omega^2 M) = 0$:
$$ \det \begin{bmatrix} 2k - \omega^2 m & -k \\ -k & 2k - \omega^2 m \end{bmatrix} = 0 $$
$$ (2k - \omega^2 m)^2 - (-k)^2 = 0 $$
$$ 2k - \omega^2 m = \pm k $$

**4. Natural Frequencies:**
Solving for $\omega^2$ yields two eigenvalues:
$\omega_1^2 = \frac{k}{m} \implies \omega_1 = \sqrt{\frac{k}{m}}$
$\omega_2^2 = \frac{3k}{m} \implies \omega_2 = \sqrt{\frac{3k}{m}}$

**5. Mode Shapes:**
Substitute $\omega_1^2$ back into $(K - \omega^2 M)\vec{\phi} = \vec{0}$:
$$ \begin{bmatrix} k & -k \\ -k & k \end{bmatrix} \begin{bmatrix} \phi_{11} \\ \phi_{21} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \implies \phi_{11} = \phi_{21} $$
Mode 1: $\vec{\phi}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$ (Masses move together in unison).

Substitute $\omega_2^2$:
$$ \begin{bmatrix} -k & -k \\ -k & -k \end{bmatrix} \begin{bmatrix} \phi_{12} \\ \phi_{22} \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \implies \phi_{12} = -\phi_{22} $$
Mode 2: $\vec{\phi}_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$ (Masses move in opposite directions).

*Reflection:* The math perfectly captures the physics. In Mode 1, the middle spring is never stretched, so the effective stiffness is just $k$. In Mode 2, the masses crash toward each other, compressing the middle spring from both sides, resulting in a higher effective stiffness ($3k$) and a higher frequency.

## Diagrams

```text
SYSTEM SETUP:
|       k       [ m ]       k       [ m ]       k       |
|---/\/\/\/\---| x_1 |---/\/\/\/\---| x_2 |---/\/\/\/\---|
|               [___]               [___]               |
Wall                                                 Wall

MODE SHAPE 1 (w_1 = sqrt(k/m)):
Masses move in phase. Middle spring is unstretched.
[ m ] --->        [ m ] --->
 x_1 = 1           x_2 = 1

MODE SHAPE 2 (w_2 = sqrt(3k/m)):
Masses move out of phase. Middle spring is highly compressed.
[ m ] --->    <---[ m ]
 x_1 = 1           x_2 = -1
```

## Memory technique — remember this forever
1. **The Hook:** Think of the comic book punch sound: **"K-wAM!"** 
   This translates to $K - \omega^2 M = 0$.
2. **The Formulas to overlearn:**
   * Characteristic Equation: $\det(K - \omega^2 M) = 0$
   * Eigenvalue Problem: $(K - \omega^2 M)\vec{\phi} = \vec{0}$
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget "K-wAM", start at $F=ma$. Write $M\ddot{\vec{x}} = -K\vec{x}$. Guess a harmonic solution $\vec{x} = \vec{\phi} e^{i\omega t}$. Differentiate twice to get $\ddot{\vec{x}} = -\omega^2 \vec{\phi} e^{i\omega t}$. Substitute back: $-\omega^2 M \vec{\phi} = -K \vec{\phi}$. Rearrange to get $(K - \omega^2 M)\vec{\phi} = \vec{0}$.

## Common mistakes
1. **Forgetting the square root:** The eigenvalue $\lambda$ is $\omega^2$, not $\omega$. You must take the square root to find the natural frequency.
2. **Confusing Hz with rad/s:** The math outputs $\omega$ in radians per second. Spacecraft requirements are usually in Hertz ($f$). Remember $f = \frac{\omega}{2\pi}$.
3. **Treating mode shapes as absolute displacements:** Eigenvectors can be scaled arbitrarily. A mode shape of $[1, 1]^T$ is the exact same physical mode as $[50, 50]^T$. It only tells you the *ratio* of displacements, not the actual travel distance.

## Self-check
1. If you double the mass of a spacecraft but keep its structural stiffness identical, by what factor do its natural frequencies change?
2. Set up the $M$ and $K$ matrices for a 2-mass, 1-spring system floating in space (no walls). Calculate the frequencies. What does a natural frequency of $\omega = 0$ imply physically?
3. Prove mathematically that for a symmetric $K$ matrix and diagonal $M$ matrix, the mode shapes corresponding to two distinct natural frequencies are orthogonal with respect to the mass matrix (i.e., $\vec{\phi}_1^T M \vec{\phi}_2 = 0$).