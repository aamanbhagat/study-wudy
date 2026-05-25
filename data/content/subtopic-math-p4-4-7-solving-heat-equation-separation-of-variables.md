## What it is
The separation of variables is a technique for solving certain partial differential equations (PDEs), such as the heat equation, by assuming the solution is a product of functions, each depending on only one independent variable. This ansatz, or educated guess, transforms the single, complex PDE into a set of simpler, solvable ordinary differential equations (ODEs).

## Why it matters
This method is the fundamental analytical tool for linear PDEs, which model countless physical phenomena. In aerospace, it's used to model heat dissipation in rocket nozzles and atmospheric reentry heat shields. In physics, it solves the Schrödinger equation for quantum systems and the wave equation for vibrations. In computer science, the underlying principles of decomposing a complex state into simpler modes appear in signal processing (Fourier analysis) and are conceptually related to diffusion models in machine learning.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
1.  **Multivariable Calculus:** Specifically, the meaning and computation of partial derivatives.
2.  **Ordinary Differential Equations:** You must be able to solve second-order linear homogeneous ODEs with constant coefficients, of the form $ay'' + by' + cy = 0$.
3.  **Linear Algebra:** The concepts of superposition, basis, and eigenvalue problems are essential.
4.  **Fourier Series:** You need to understand that a function on a finite interval can be represented as an infinite sum of sine and cosine functions.

## How to study it (step by step)
1.  **State the Problem:** Write down the 1D heat equation $u_t = k u_{xx}$ along with its boundary conditions (BCs, e.g., $u(0,t)=0, u(L,t)=0$) and initial condition (IC, e.g., $u(x,0)=f(x)$). Understand what each piece represents physically: a rod of length $L$, with a thermal diffusivity $k$, whose ends are held at a fixed temperature, starting with a known temperature profile $f(x)$.
2.  **Apply the Ansatz:** Assume a solution of the form $u(x,t) = X(x)T(t)$. Substitute this into the PDE. Compute the partial derivatives: $u_t = X(x)T'(t)$ and $u_{xx} = X''(x)T(t)$.
3.  **Separate the Variables:** Substitute and rearrange the equation to get all $t$-dependent terms on one side and all $x$-dependent terms on the other: $\frac{T'(t)}{k T(t)} = \frac{X''(x)}{X(x)}$.
4.  **Introduce the Separation Constant:** Argue that since a function of $t$ equals a function of $x$ for all $x$ and $t$, both must be equal to a constant. For physical reasons (no exponential temperature growth), we choose a negative constant, $-\lambda^2$. This gives you two ODEs: $T' + k\lambda^2 T = 0$ and $X'' + \lambda^2 X = 0$.
5.  **Solve the Spatial ODE:** Solve the $X(x)$ equation first. Its general solution is $X(x) = A\cos(\lambda x) + B\sin(\lambda x)$. Apply the boundary conditions to this solution. You will find that non-trivial solutions only exist for a discrete set of values $\lambda_n$, the *eigenvalues*. This determines the spatial "modes" $X_n(x)$ of heat distribution.
6.  **Solve the Temporal ODE:** For each eigenvalue $\lambda_n$, solve the $T(t)$ equation. This is a simple first-order ODE whose solution is an exponential decay: $T_n(t) = C_n e^{-k\lambda_n^2 t}$.
7.  **Construct the General Solution:** By the principle of superposition, the full solution is a sum of all possible product solutions $u_n(x,t) = X_n(x)T_n(t)$. This forms an infinite series: $u(x,t) = \sum_{n=1}^{\infty} B_n X_n(x) T_n(t)$. The final constant $B_n$ absorbs previous constants.
8.  **Apply the Initial Condition:** Set $t=0$ in your general solution and equate it to the initial condition $f(x)$. This gives $f(x) = \sum_{n=1}^{\infty} B_n X_n(x)$. Recognize this as a Fourier series expansion for $f(x)$ and solve for the coefficients $B_n$ using the orthogonality of the functions $X_n(x)$.

## Key ideas, with intuition
1.  **The Ansatz: $u(x,t) = X(x)T(t)$**
    *   **Intuition:** We guess that the temperature profile's shape over space, $X(x)$, is independent of its decay over time, $T(t)$. The final temperature at any point $(x,t)$ is just the initial spatial shape scaled by a time-dependent decay factor. While this is a huge simplification, linearity allows us to combine many such simple solutions to build the true, complex one.

2.  **The Separation Constant: $\frac{T'}{kT} = \frac{X''}{X} = -\lambda^2$**
    *   **Intuition:** This is the mathematical pivot. The only way a function purely of time can equal a function purely of space for all values is if both are constant. We call it $-\lambda^2$ (a negative number) because a positive constant would lead to $T(t) \propto e^{kt}$, meaning the temperature would grow infinitely, which is physically impossible for a cooling rod. The negative constant ensures $T(t)$ decays exponentially and $X(x)$ oscillates spatially (sines/cosines), which is exactly what we observe in nature.

3.  **Boundary Conditions create Eigenfunctions/Eigenvalues**
    *   **Intuition:** Imagine a guitar string pinned at both ends. It can't just vibrate in any shape; it can only vibrate in specific "modes" or harmonics. The boundary conditions (the pins) *quantize* the possible solutions. For the heat equation, holding the ends of the rod at $0^\circ$ C forces the spatial shape $X(x)$ to be a sine wave that fits perfectly between $0$ and $L$. This restricts $\lambda$ to a discrete set of values $\lambda_n = \frac{n\pi}{L}$, which correspond to the allowed "thermal modes."

4.  **Superposition and Fourier's Trick**
    *   **Intuition:** One single mode, like $u_1(x,t) = B_1 \sin(\frac{\pi x}{L})e^{-k(\pi/L)^2 t}$, is a valid but very specific solution. What if the initial temperature profile is a square wave? No single sine wave can match that. The principle of superposition says we can add up all the allowed modes ($n=1, 2, 3, ...$) to build a more complex solution. The initial condition $u(x,0)=f(x)$ is the blueprint. Fourier analysis provides the exact recipe for how much of each mode ($B_n$) to mix in to build that initial shape.

## Worked example
**Problem:** Solve the heat equation $u_t = k u_{xx}$ for a thin rod of length $L=\pi$, with boundary conditions $u(0,t) = u(\pi,t) = 0$ and initial condition $u(x,0) = 50$.

1.  **Ansatz & Separation:** Let $u(x,t) = X(x)T(t)$. Substituting into $u_t = k u_{xx}$ gives $XT' = kX''T$. Separating yields $\frac{T'}{kT} = \frac{X''}{X} = -\lambda^2$. This gives two ODEs:
    *   $X'' + \lambda^2 X = 0$
    *   $T' + k\lambda^2 T = 0$

2.  **Solve for $X(x)$ with BCs:** The general solution is $X(x) = A\cos(\lambda x) + B\sin(\lambda x)$.
    *   Apply BC $u(0,t)=0 \implies X(0)=0$: $A\cos(0) + B\sin(0) = A = 0$. So, $X(x) = B\sin(\lambda x)$.
    *   Apply BC $u(\pi,t)=0 \implies X(\pi)=0$: $B\sin(\lambda \pi) = 0$. For a non-trivial solution, $B \neq 0$, so we need $\sin(\lambda \pi) = 0$.
    *   This implies $\lambda \pi = n\pi$ for integer $n=1, 2, 3, \dots$.
    *   The eigenvalues are $\lambda_n = n$. The eigenfunctions are $X_n(x) = \sin(nx)$.

3.  **Solve for $T(t)$:** For each $\lambda_n = n$, the temporal ODE is $T' + kn^2 T = 0$. This is a standard first-order ODE with solution $T_n(t) = C_n e^{-kn^2 t}$.

4.  **Superposition:** Combine the solutions and sum them up. The product solution is $u_n(x,t) = X_n(x)T_n(t)$. Let a new constant $B_n$ represent the product of $B$ and $C_n$.
    $$ u(x,t) = \sum_{n=1}^{\infty} B_n \sin(nx) e^{-kn^2 t} $$

5.  **Apply IC:** At $t=0$, we have $u(x,0) = 50$.
    $$ 50 = \sum_{n=1}^{\infty} B_n \sin(nx) $$
    This is the Fourier sine series for the constant function $f(x)=50$ on $[0, \pi]$. We find the coefficients $B_n$ using the orthogonality formula:
    $$ B_n = \frac{2}{L} \int_0^L f(x) \sin(\frac{n\pi x}{L}) dx = \frac{2}{\pi} \int_0^\pi 50 \sin(nx) dx $$
    $$ B_n = \frac{100}{\pi} \left[ -\frac{\cos(nx)}{n} \right]_0^\pi = -\frac{100}{n\pi} (\cos(n\pi) - \cos(0)) $$
    $$ B_n = -\frac{100}{n\pi} ((-1)^n - 1) $$
    This is zero if $n$ is even. If $n$ is odd, $(-1)^n = -1$, so $B_n = -\frac{100}{n\pi}(-2) = \frac{200}{n\pi}$.

6.  **Final Solution:** Substitute the coefficients back into the general solution.
    $$ u(x,t) = \sum_{n=1,3,5,...}^{\infty} \frac{200}{n\pi} \sin(nx) e^{-kn^2 t} $$

**Reflection:** The separation ansatz broke the PDE into ODEs. The spatial BCs quantized the problem, allowing only specific sine waves. The temporal ODE dictated that each of these modes must decay exponentially. The IC determined the initial "amplitude" of each mode via a Fourier series calculation.

## Diagrams
A 1D rod and its temperature evolution.

```text
1. The physical setup: a rod of length L on the x-axis.

      Temperature u(x,t)
      ^
      |
      +----------------------------------------+
      0                                        L
      ---------------------------------------------> x-axis (position)

2. Temperature profile u(x,t) over time.

      u(x,0) = f(x)
      ^
      |****************** (t=0, initial flat temp)
      |
      |   ~~~~~~~~~~~~~   (t=t1 > 0, starts to cool)
      |
      |      -------      (t=t2 > t1, cooler still)
      |
      +------------------ (t -> inf, approaches 0)
      0                  L
      ---------------------------------------------> x
```

## Memory technique — remember this forever
1.  **The Story: "Separate, Constrain, Sum"**
    You are a sound engineer for an orchestra. The complex music is the PDE solution $u(x,t)$.
    *   **Separate:** You can't analyze the whole orchestra at once. You isolate each instrument family (the functions $X(x)$ and $T(t)$).
    *   **Constrain:** The concert hall's acoustics (the *boundary conditions*) only allow certain notes to resonate properly. These are the *eigenvalues* ($\lambda_n$). All other notes fade away.
    *   **Sum:** You mix the volumes of these resonant notes (the coefficients $B_n$) according to the opening musical score (the *initial condition*) to create the final performance ($u(x,t)$).

2.  **Formulas to Overlearn:**
    *   The Equation: $u_t = k u_{xx}$
    *   The Ansatz: $u(x,t) = X(x)T(t)$
    *   The Resulting ODEs: $X'' + \lambda^2 X = 0$ and $T' + k\lambda^2 T = 0$

3.  **Spaced Repetition Schedule:**
    Review this entire lesson and re-derive the worked example from a blank sheet:
    *   In 1 day.
    *   In 3 days.
    *   In 7 days.
    *   In 16 days.
    *   In 35 days.

4.  **First Principles Pathway:**
    If you forget everything, start here:
    1.  Write $u_t = k u_{xx}$.
    2.  Write the guess $u = XT$.
    3.  Substitute: $XT' = kX''T$.
    4.  Divide by $kXT$ to get $\frac{T'}{kT} = \frac{X''}{X}$.
    5.  Set both sides to a constant. The rest is solving ODEs you already know.

## Common mistakes
1.  **Sign of the Separation Constant:** Choosing the constant as $+\lambda^2$ instead of $-\lambda^2$. This leads to $T(t) = C e^{k\lambda^2 t}$, which implies the temperature grows infinitely. This is unphysical for a simple diffusion problem. Always ask: does my solution make physical sense?
2.  **Mixing up BCs and ICs:** Boundary conditions ($u(0,t), u(L,t)$) determine the *form* of the eigenfunctions (e.g., sine waves) and the allowed eigenvalues $\lambda_n$. The initial condition ($u(x,0)$) determines the *coefficients* $B_n$ in the final summation.
3.  **Errors in Fourier Coefficients:** Simple integration errors when calculating the coefficients $B_n$. Be meticulous with the integral $\int f(x) X_n(x) dx$. Forgetting the normalization factor ($2/L$) is also common.
4.  **Ignoring the Trivial Solution:** When applying boundary conditions to $X(x) = A\cos(\lambda x) + B\sin(\lambda x)$, students might conclude that $A=0$ and $B=0$ is the only option. You must explicitly seek *non-trivial* solutions ($B \neq 0$ in the example), which is what forces the quantization of $\lambda$.

## Self-check
1.  Solve the heat equation $u_t = k u_{xx}$ on the interval $[0, L]$ with $u(0,t)=u(L,t)=0$, but this time with the initial condition $u(x,0) = 3\sin(\frac{2\pi x}{L})$. (Hint: you shouldn't need to compute any complex integrals).
2.  Consider the same equation and interval, but with *insulated* ends. The boundary conditions become "no heat flux," which means $u_x(0,t) = 0$ and $u_x(L,t) = 0$. How does this change the eigenfunctions $X_n(x)$ and eigenvalues $\lambda_n$? What is the physical meaning of the $n=0$ solution in this case?
3.  Take the final solution from the worked example. What is the limit of $u(x,t)$ as $t \to \infty$? Does this match your physical intuition for a rod whose ends are kept at a temperature of zero? Why does the term with the smallest value of $n$ dominate the solution for large $t$?