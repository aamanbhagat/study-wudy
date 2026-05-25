## What it is
Solving Laplace's or a related equation (like the Helmholtz equation) on a disk involves finding a function $u(r, \theta)$ that satisfies the PDE inside a circle and matches given conditions on its boundary. We use polar coordinates $(r, \theta)$ because they respect the circular symmetry of the domain, which simplifies the problem immensely. This process often leads to Bessel's equation, a famous differential equation whose solutions, Bessel functions, describe wave-like phenomena in circular or cylindrical geometries.

## Why it matters
This isn't just an academic exercise. The solution describes the steady-state temperature distribution on a circular plate, the electrostatic potential inside a cylindrical conductor, and most famously, the vibrational modes of a circular drumhead. In aerospace, understanding these modes is critical for analyzing vibrations in circular components like fuel tanks, nozzles, or fuselage sections to prevent resonance-induced structural failure.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Multivariable Calculus:** The Laplacian operator ($\nabla^2$) and coordinate transformations, specifically from Cartesian to polar.
2.  **Ordinary Differential Equations (ODEs):** The method of separation of variables, solving second-order linear ODEs, and familiarity with Sturm-Liouville theory.
3.  **Fourier Series:** The concept of representing a periodic function as an infinite sum of sines and cosines. This is non-negotiable for applying the boundary conditions.

If you cannot derive the Laplacian in polar coordinates or solve $y'' + \lambda y = 0$ with boundary conditions from memory, review those topics first.

## How to study it (step by step)
1.  **Transform the Laplacian.** Start with the Cartesian Laplacian $\nabla^2 u = u_{xx} + u_{yy}$. Use the chain rule with $x = r\cos\theta$ and $y = r\sin\theta$ to derive its polar form: $\nabla^2 u = u_{rr} + \frac{1}{r}u_r + \frac{1}{r^2}u_{\theta\theta}$. Do this derivation by hand once. It is tedious but essential.
2.  **Separate variables for the Helmholtz Equation.** The classic connection to Bessel functions comes from the Helmholtz equation, $\nabla^2 u + k^2 u = 0$, which models vibrations. Assume a separable solution $u(r, \theta) = R(r)\Theta(\theta)$. Substitute this into the polar Helmholtz equation and separate the $r$ and $\theta$ dependencies to get two ODEs.
3.  **Solve the Angular ODE.** The equation for $\Theta(\theta)$ will be $\Theta''(\theta) + n^2 \Theta(\theta) = 0$. Solve it and apply the physical condition of periodicity, $\Theta(\theta) = \Theta(\theta + 2\pi)$, to show why the separation constant must be $n^2$ where $n$ is an integer.
4.  **Solve the Radial ODE.** The equation for $R(r)$ will be $r^2 R''(r) + r R'(r) + (k^2 r^2 - n^2) R(r) = 0$. This is **Bessel's differential equation**. Its solutions are the Bessel functions $J_n(kr)$ and Neumann functions $Y_n(kr)$.
5.  **Apply physical boundary conditions.** For a problem on a solid disk, the solution must be finite at the origin ($r=0$). Since $Y_n(r) \to -\infty$ as $r \to 0$, we must discard the Neumann functions. The solution form is $R(r) = A J_n(kr)$.
6.  **Construct the general solution.** Use the principle of superposition. The full solution is a sum over all possible integer modes $n$: $u(r, \theta) = \sum_{n=0}^{\infty} J_n(kr) [A_n \cos(n\theta) + B_n \sin(n\theta)]$. The coefficients $A_n, B_n$ and the constant $k$ are determined by the boundary conditions at the edge of the disk ($r=a$).

## Key ideas, with intuition
1.  **Symmetry is everything.** Solving a problem involving a disk in Cartesian coordinates $(x,y)$ is a nightmare because the boundary $x^2+y^2=a^2$ is awkward. In polar coordinates, the boundary is simply $r=a$. Choosing the right coordinate system is half the battle.
2.  **Separation of Variables turns one hard problem into two easier ones.** The core assumption $u(r, \theta) = R(r)\Theta(\theta)$ lets us split a 2D PDE into two 1D ODEs. One describes how the solution behaves as you go around the circle (azimuthally), and the other describes how it behaves as you move from the center to the edge (radially).
    $$
    \frac{r^2 R'' + rR'}{R} + k^2 r^2 = - \frac{\Theta''}{\Theta} = n^2
    $$
    The left side depends only on $r$, the right only on $\theta$. For them to be equal everywhere, they must both equal a constant, which we call $n^2$.
3.  **Bessel Functions are the "Sines and Cosines" for Circles.** Just as sines and cosines are the natural functions for periodic behavior on a line, Bessel functions ($J_n$) are the natural functions for wave-like behavior on a disk. They oscillate but their amplitude decays with distance, looking like ripples in a pond. The Neumann functions ($Y_n$) are the other solution, but they are singular at the origin, making them non-physical for a solid disk.

## Worked example
**Problem:** Find the vibrational modes of a circular drumhead of radius $a$. The membrane is fixed at its edge, so its displacement $u(r, \theta, t)$ from equilibrium is zero there. The vibration is governed by the wave equation, and by separating time, we get the Helmholtz equation for the spatial part: $\nabla^2 u + k^2 u = 0$, with boundary condition $u(a, \theta) = 0$.

**Solution:**
1.  **Setup:** We need to solve $\nabla^2 u + k^2 u = 0$ on the disk $r \le a$, with $u(a, \theta)=0$. The solution must also be finite at $r=0$.

2.  **Separation of Variables:** As derived in the key ideas, we assume $u(r, \theta) = R(r)\Theta(\theta)$. This yields two ODEs:
    *   Angular: $\Theta'' + n^2 \Theta = 0 \implies \Theta(\theta) = A\cos(n\theta) + B\sin(n\theta)$ for $n \in \mathbb{Z}$.
    *   Radial: $r^2 R'' + r R' + (k^2 r^2 - n^2) R = 0$. This is Bessel's equation.

3.  **Apply Radial Boundary Conditions:**
    *   **Finiteness at $r=0$:** The general solution to the radial ODE is $R(r) = C_1 J_n(kr) + C_2 Y_n(kr)$. Since $Y_n(kr)$ is singular (blows up) at $r=0$, we must have $C_2=0$. So, $R(r) = C_1 J_n(kr)$.
    *   **Fixed edge at $r=a$:** We require $u(a, \theta) = 0$, which means $R(a)=0$. This implies $J_n(ka) = 0$.

4.  **Find the Eigenvalues ($k$):** The condition $J_n(ka) = 0$ means that $ka$ must be a zero (a root) of the Bessel function $J_n$. Let's denote the $m$-th zero of $J_n(x)$ as $\alpha_{nm}$. Then we must have $ka = \alpha_{nm}$ for $m=1, 2, 3, \ldots$. This quantizes the possible values of $k$:
    $$
    k_{nm} = \frac{\alpha_{nm}}{a}
    $$
    These are the wave numbers for the allowed vibrational modes.

5.  **Construct the Solution (Eigenfunctions):** Each pair $(n, m)$ corresponds to a unique vibrational mode (an eigenfunction):
    $$
    u_{nm}(r, \theta) = J_n\left(\frac{\alpha_{nm}r}{a}\right) (A_{nm}\cos(n\theta) + B_{nm}\sin(n\theta))
    $$
    The general solution is a superposition of all these modes. The constants $A_{nm}, B_{nm}$ would be determined by the initial shape and velocity of the drumhead.

**Reflection:** Each step systematically constrained our solution. Separation of variables gave us the *form* of the solution. Periodicity in $\theta$ made $n$ an integer. Finiteness at the center eliminated the $Y_n$ functions. The fixed boundary condition at $r=a$ quantized the wave number $k$ by linking it to the discrete zeros of the Bessel functions.

## Diagrams
A disk in polar coordinates showing the domain and boundary.

```text
                 ^ y
                 |
                 |
        +--------|--------+
       /         |         \
      /          |          \
     /     (r,θ) |           \
    |       *----|-----> x    |  Domain: r < a
    |      / \   |           |  Boundary: r = a
    |     /   \  |           |
     \   r     θ/           /
      \        .           /
       \     . .          /
        +-----------------+
                 |
                 |
```

The fundamental vibrational mode $(n=0, m=1)$, which is radially symmetric (no dependence on $\theta$). It looks like the whole drumhead moving up and down.

```text
Side View of u_01(r) displacement:

      ^ u
      |
     /|\
    / | \
   /  |  \
--/---|---\--- > r
 -a   0   a

Top view (contour lines):
        +--------+
       /  ++++++  \
      / ++      ++ \
     | +          + |
     | +          + |
      \ ++      ++ /
       \  ++++++  /
        +--------+
(center has max displacement)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Helmholtz's Circular Drum":
    *   **H**elmholtz on a **C**ircle **D**emands **B**essel.
    *   The geometry is a **Circle**, so use **Polar** coordinates.
    *   The radial equation you get is **Bessel's** equation.
    *   The boundary conditions are like tuning pegs on a **Drum**, they only allow specific frequencies (zeros of Bessel functions).

2.  **Must-Overlearn Formulas:**
    *   **Polar Laplacian:** $\nabla^2 u = u_{rr} + \frac{1}{r}u_r + \frac{1}{r^2}u_{\theta\theta}$
    *   **Bessel's Equation of order $n$:** $x^2 y'' + x y' + (x^2 - n^2) y = 0$
    *   **Vibrational Mode Solution Form:** $u_{nm}(r, \theta) = J_n(k_{nm}r) \times (\text{trig functions of } n\theta)$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the main results from scratch in **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with the PDE you need to solve (e.g., $\nabla^2 u + k^2 u = 0$).
    *   Write down the transformation from Cartesian to polar: $x=r\cos\theta, y=r\sin\theta$.
    *   Painstakingly apply the chain rule to find $u_{xx}$ and $u_{yy}$ in terms of partials in $r$ and $\theta$ to re-derive the polar Laplacian.
    *   Substitute $u(r,\theta) = R(r)\Theta(\theta)$ into the PDE.
    *   Algebraically separate the variables. This will always lead you back to the two required ODEs, one of which will be Bessel's equation.

## Common mistakes
1.  **Forgetting the $r$ terms in the Laplacian:** Writing $\nabla^2 u = u_{rr} + u_{\theta\theta}$ is a fatal error. The $\frac{1}{r}$ and $\frac{1}{r^2}$ terms are crucial and come directly from the coordinate transformation.
2.  **Keeping the singular solution:** Including the Neumann function $Y_n(r)$ in a problem involving a solid disk ($r=0$ is in the domain). This solution is non-physical as it implies an infinite value at the center. It is only valid for domains like an annulus (a disk with a hole in the center).
3.  **Confusing Laplace and Helmholtz:** The standard Laplace equation $\nabla^2 u = 0$ on a disk leads to the Cauchy-Euler equation $r^2 R'' + rR' - n^2 R = 0$, with solutions $R(r) = A r^n + B r^{-n}$. The Helmholtz equation $\nabla^2 u + k^2 u = 0$ is the one that leads to Bessel's equation. Know which problem you are solving.
4.  **Incorrectly applying boundary conditions:** Thinking that $J_n(k)=0$ is the condition. The condition is $J_n(ka)=0$, where $a$ is the radius of the disk. The argument of the Bessel function must be evaluated at the boundary.

## Self-check
1.  Solve the standard Laplace equation $\nabla^2 u = 0$ on a disk of radius $a$ with the boundary condition $u(a, \theta) = 3\sin(2\theta) + 4\cos(3\theta)$. (Hint: You will not need Bessel functions for this).
2.  An annular membrane (a disk of radius $b$ with a hole of radius $a < b$) is vibrating. It is fixed at both the inner and outer edges, so $u(a, \theta)=0$ and $u(b, \theta)=0$. What is the form of the radial solution $R(r)$? Write down the equation that determines the allowed wave numbers $k$.
3.  A circular drum of radius $a=1$ is struck. Its fundamental frequency of vibration (the lowest tone) corresponds to the mode with the most minimal spatial variation. Identify the values of $n$ and $m$ for this mode and write down the equation that its wave number $k$ must satisfy. The first zero of $J_0(x)$ is $\alpha_{01} \approx 2.4048$. What is the wave number $k$ for this fundamental mode?