## What it is
Separation of variables is a technique for solving certain partial differential equations (PDEs) by assuming the solution can be written as a product of functions, each of a single independent variable. This ansatz, or educated guess, transforms a single complex PDE into a set of simpler ordinary differential equations (ODEs), which can be solved individually.

## Why it matters
This method is the fundamental analytical tool for understanding wave phenomena and linear systems. In aerospace, it's used to model the vibration of structures like wings and fuselage panels (flutter analysis) and acoustic waves in rocket nozzles. In physics, it's the key to solving Schrödinger's equation in quantum mechanics and modeling electromagnetic waveguides.

## When to study it
Before tackling this, you must have mastered:
1.  **Ordinary Differential Equations:** Specifically, second-order linear homogeneous ODEs with constant coefficients. You must be able to instantly solve equations of the form $ay'' + by' + cy = 0$.
2.  **Fourier Series:** You need to understand how to represent a function as an infinite sum of sines and cosines and how to calculate the coefficients of that series.
3.  **Linear Algebra:** The concepts of eigenvalues, eigenvectors, and basis are essential. The solutions we find (eigenfunctions) form a basis for the solution space.

If you are not fluent in these, stop and review them. Hand-waving your understanding of Fourier series, in particular, will make this topic impossible.

## How to study it (step by step)
1.  **State the Problem:** Write down the 1D wave equation $u_{tt} = c^2 u_{xx}$ along with its boundary conditions (e.g., $u(0,t)=0, u(L,t)=0$) and initial conditions (e.g., $u(x,0)=f(x), u_t(x,0)=g(x)$).
2.  **Apply the Ansatz:** Assume a solution of the form $u(x,t) = X(x)T(t)$. Substitute this into the PDE. Compute the partial derivatives: $u_{tt} = X(x)T''(t)$ and $u_{xx} = X''(x)T(t)$.
3.  **Separate the Variables:** Substitute the derivatives into the PDE: $X(x)T''(t) = c^2 X''(x)T(t)$. Divide the entire equation by $c^2X(x)T(t)$ to isolate all $t$-dependent terms on one side and all $x$-dependent terms on the other: $\frac{T''(t)}{c^2T(t)} = \frac{X''(x)}{X(x)}$.
4.  **Introduce the Separation Constant:** Argue that since the left side depends only on $t$ and the right side only on $x$, they must both be equal to a constant for the equality to hold for all $x, t$. Call this constant $-\lambda^2$. (The negative sign is a convention that ensures oscillatory, physical solutions). This gives you two ODEs: $X''(x) + \lambda^2 X(x) = 0$ and $T''(t) + c^2\lambda^2 T(t) = 0$.
5.  **Solve the Spatial ODE:** Solve the $X(x)$ equation subject to the boundary conditions. This is an eigenvalue problem; non-trivial solutions for $X(x)$ will only exist for specific values of $\lambda$, called eigenvalues. The corresponding solutions $X_n(x)$ are the eigenfunctions (or "modes").
6.  **Solve the Temporal ODE:** For each eigenvalue $\lambda_n$ found in the previous step, solve the $T(t)$ equation. Let $\omega_n = c\lambda_n$. The solution will be of the form $T_n(t) = A_n \cos(\omega_n t) + B_n \sin(\omega_n t)$.
7.  **Construct the General Solution:** By the principle of superposition, any linear combination of solutions is also a solution. Form the general solution by summing all the product solutions $u_n(x,t) = X_n(x)T_n(t)$. This gives an infinite series.
8.  **Apply Initial Conditions:** Use the initial conditions $u(x,0)=f(x)$ and $u_t(x,0)=g(x)$ to find the unknown coefficients ($A_n, B_n$) using the orthogonality of the eigenfunctions, which is the core mechanism of Fourier series.

## Key ideas, with intuition
1.  **The Product Ansatz: $u(x,t) = X(x)T(t)$**
    *   **Intuition:** We are guessing that the shape of the wave in space, $X(x)$, and its amplitude's behavior in time, $T(t)$, are independent processes that can be multiplied together. Think of a jump rope: the fundamental shape is a sine-like curve ($X(x)$), and every point on that curve oscillates up and down together ($T(t)$).

2.  **The Separation Constant: $\frac{T''}{c^2T} = \frac{X''}{X} = -\lambda^2$**
    *   **Intuition:** A function of *only t* can only equal a function of *only x* if both are, in fact, constant. This constant, $-\lambda^2$, is the critical link between the spatial and temporal worlds. It dictates the spatial frequency (waviness) of the mode $X(x)$ and also its temporal frequency (how fast it oscillates). A higher spatial frequency (more wiggles in the string) requires a higher temporal frequency (faster oscillation).

3.  **Eigenfunctions as a Basis:**
    *   **Intuition:** The boundary conditions (e.g., a guitar string fixed at both ends) only permit specific standing wave patterns, or "modes." These are the eigenfunctions $X_n(x) = \sin(\frac{n\pi x}{L})$. These modes form a complete basis, like the primary colors. Any initial shape of the string $f(x)$ can be represented as a unique combination (a superposition) of these fundamental modes, just as any color can be made by mixing red, green, and blue.

4.  **Superposition: $u(x,t) = \sum_{n=1}^{\infty} u_n(x,t)$**
    *   **Intuition:** The wave equation is linear. This means that waves pass through each other without interacting. If we have two valid solutions, their sum is also a valid solution. We exploit this by finding all the simple "mode" solutions and adding them up with the right weights (the Fourier coefficients) to build the one complex solution that matches our specific initial conditions.

## Worked example
Solve the 1D wave equation for a string of length $L$ fixed at both ends, with an initial displacement $f(x)$ and zero initial velocity.

**Problem Statement:**
*   PDE: $u_{tt} = c^2 u_{xx}$ for $x \in [0, L], t > 0$.
*   Boundary Conditions (BCs): $u(0,t) = 0$, $u(L,t) = 0$.
*   Initial Conditions (ICs): $u(x,0) = f(x)$, $u_t(x,0) = 0$.

**Step 1: Ansatz and Separation**
Let $u(x,t) = X(x)T(t)$. Substituting into the PDE gives $XT'' = c^2 X''T$.
Separating variables: $\frac{T''}{c^2T} = \frac{X''}{X} = -\lambda^2$.
This yields two ODEs:
1.  $X'' + \lambda^2 X = 0$
2.  $T'' + c^2\lambda^2 T = 0$

**Step 2: Solve the Spatial Problem (Eigenvalue Problem)**
The general solution to $X'' + \lambda^2 X = 0$ is $X(x) = A \cos(\lambda x) + B \sin(\lambda x)$.
Apply BCs:
*   $u(0,t) = X(0)T(t) = 0 \implies X(0) = 0$.
    $X(0) = A \cos(0) + B \sin(0) = A = 0$. So, $X(x) = B \sin(\lambda x)$.
*   $u(L,t) = X(L)T(t) = 0 \implies X(L) = 0$.
    $X(L) = B \sin(\lambda L) = 0$. We need $B \neq 0$ for a non-trivial solution, so we must have $\sin(\lambda L) = 0$.
This is true when $\lambda L = n\pi$ for $n = 1, 2, 3, \ldots$.
The eigenvalues are $\lambda_n = \frac{n\pi}{L}$.
The corresponding eigenfunctions are $X_n(x) = \sin\left(\frac{n\pi x}{L}\right)$. (We can absorb the constant $B$ into the temporal solution).

**Step 3: Solve the Temporal Problem**
For each $\lambda_n$, the temporal ODE is $T'' + c^2\left(\frac{n\pi}{L}\right)^2 T = 0$.
Let $\omega_n = \frac{cn\pi}{L}$ (the angular frequency of the $n$-th mode). The ODE is $T'' + \omega_n^2 T = 0$.
The general solution is $T_n(t) = A_n \cos(\omega_n t) + B_n \sin(\omega_n t)$.

**Step 4: Superposition**
The general solution is the sum of all product solutions $u_n(x,t) = X_n(x)T_n(t)$:
$$ u(x,t) = \sum_{n=1}^{\infty} \left(A_n \cos\left(\frac{cn\pi t}{L}\right) + B_n \sin\left(\frac{cn\pi t}{L}\right)\right) \sin\left(\frac{n\pi x}{L}\right) $$

**Step 5: Apply Initial Conditions**
*   First IC: $u(x,0) = f(x)$.
    $$ f(x) = \sum_{n=1}^{\infty} A_n \sin\left(\frac{n\pi x}{L}\right) $$
    This is a Fourier sine series for $f(x)$. The coefficients are given by:
    $$ A_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
*   Second IC: $u_t(x,0) = 0$. First, differentiate $u(x,t)$ with respect to $t$:
    $$ u_t(x,t) = \sum_{n=1}^{\infty} \left(-A_n \omega_n \sin(\omega_n t) + B_n \omega_n \cos(\omega_n t)\right) \sin\left(\frac{n\pi x}{L}\right) $$
    Now set $t=0$:
    $$ u_t(x,0) = 0 = \sum_{n=1}^{\infty} B_n \omega_n \sin\left(\frac{n\pi x}{L}\right) $$
    For this series to be zero for all $x$, every coefficient must be zero. Since $\omega_n \neq 0$, we must have $B_n = 0$ for all $n$.

**Final Solution:**
The solution is
$$ u(x,t) = \sum_{n=1}^{\infty} A_n \cos\left(\frac{cn\pi t}{L}\right) \sin\left(\frac{n\pi x}{L}\right) $$
where
$$ A_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$

*Reflection*: Each step was necessary. The ansatz broke the PDE into ODEs. The spatial ODE with its boundary conditions quantized the problem into discrete modes (eigenfunctions). The temporal ODE described how each mode oscillates. Superposition allowed us to build a general solution, and the initial conditions provided the specific "recipe" (the Fourier coefficients) for combining the modes.

## Diagrams
Here are the first three spatial modes (eigenfunctions) for a string of length $L$ fixed at both ends. Any vibration of the string is a weighted sum of these fundamental shapes.

```text
       ^ u(x)
       |
   n=1 |    .----.
       |   /      \
       |  /        \
       | /          \
       +----------------> x
       0            L

       ^ u(x)
       |
   n=2 |   .----.   
       |  /      \  /
       | /        \/
       |/          \
       +----------------> x
       0     L/2    L

       ^ u(x)
       |
   n=3 |   .--.   .--.
       |  /    \ /    \
       | /      X      \
       |/       |\      /
       +----------------> x
       0      L/3    2L/3  L
```

## Memory technique — remember this forever
1.  **The Story: "The Specialists' Contract"**
    You have a complex problem involving space ($x$) and time ($t$)—the PDE. You hire two specialists: Mr. X, a spatial analyst, and Ms. T, a temporal analyst. They can't work on the problem together.
    *   **Separate:** They agree to work on separate parts, assuming the solution is a product of their work: $u=XT$.
    *   **The Contract ($\lambda$):** They negotiate a contract term, the separation constant $\lambda$. This constant links their work: Mr. X's spatial "waviness" ($\lambda$) must match Ms. T's temporal "frequency" ($\omega = c\lambda$).
    *   **Solve:** Each specialist solves their own simple ODE based on the contract terms and boundary/initial conditions. Mr. X finds the fundamental shapes (modes), and Ms. T finds how each shape oscillates.
    *   **Superpose:** You, the project manager, take all their mode-solutions and combine them (superposition) to create the final product that meets the client's initial request ($u(x,0)=f(x)$).

2.  **Formulas to Overlearn:**
    *   The PDE: $u_{tt} = c^2 u_{xx}$
    *   The Ansatz: $u(x,t) = X(x)T(t)$
    *   The General Solution (for fixed ends): $u(x,t) = \sum_{n=1}^{\infty} (A_n \cos(\omega_n t) + B_n \sin(\omega_n t)) \sin(k_n x)$ where $k_n = \frac{n\pi}{L}$ and $\omega_n = ck_n$.

3.  **Spaced Repetition Schedule:**
    Derive the solution for the fixed-end string from scratch (PDE to final Fourier coefficients) at these intervals:
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 7 days
    *   In 16 days
    *   In 35 days

4.  **First Principles Pathway:**
    If you forget everything, remember this:
    1.  Start with $u_{tt} = c^2 u_{xx}$.
    2.  Assume $u = XT$.
    3.  Substitute: $XT'' = c^2 X''T$.
    4.  Divide by $c^2XT$: $\frac{T''}{c^2T} = \frac{X''}{X}$.
    5.  A function of $t$ equals a function of $x$. This implies both must be a constant. Call it $-\lambda^2$.
    6.  You now have two ODEs. The rest is an ODE and Fourier series problem, which you already know how to solve.

## Common mistakes
1.  **Sign of the Separation Constant:** Choosing the separation constant to be $+\lambda^2$ instead of $-\lambda^2$. This leads to $X'' - \lambda^2 X = 0$, which has exponential solutions ($e^{\lambda x}, e^{-\lambda x}$). These cannot satisfy the boundary conditions $X(0)=X(L)=0$ without being the trivial zero solution. Always choose the sign that gives oscillatory solutions in the bounded spatial dimension.
2.  **Forgetting the $n=0$ or negative $n$ cases:** When solving $\sin(\lambda L) = 0$ to get $\lambda_n = n\pi/L$, students sometimes forget to check why we only take $n=1, 2, 3, \ldots$. For $n=0$, $\lambda_0=0$, giving $X(x)=0$ (trivial). For negative $n$, $\sin(-kx) = -\sin(kx)$, which is not a new, linearly independent solution, so we omit it.
3.  **Mixing up Coefficients:** Confusing the formulas for $A_n$ and $B_n$. Remember $A_n$ is associated with the initial position $u(x,0)$ (since it multiplies $\cos(\omega_n t)$, which is 1 at $t=0$) and $B_n$ is associated with the initial velocity $u_t(x,0)$ (since it multiplies $\sin(\omega_n t)$, whose derivative is $\omega_n$ at $t=0$).

## Self-check
1.  Solve the 1D wave equation on $[0, L]$ with boundary conditions $u(0,t)=0$ (fixed end) and $u_x(L,t)=0$ (free end). How do the eigenfunctions $X_n(x)$ change from the fixed-fixed case?
2.  Solve the vibrating string problem (fixed ends at $x=0, L$) for a string that is initially flat, $u(x,0)=0$, but is given an initial velocity, $u_t(x,0) = g(x)$.
3.  Consider the wave equation with a damping term: $u_{tt} + k u_t = c^2 u_{xx}$, where $k>0$ is a constant. Can you still use separation of variables? If so, how does the temporal solution $T(t)$ change?