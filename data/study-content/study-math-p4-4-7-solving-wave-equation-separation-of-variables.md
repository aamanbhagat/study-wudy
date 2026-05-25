## 1. What it is — in plain English

Imagine you have a long, taut string, like a guitar string. If you pluck it, it vibrates, creating a wave that travels along its length. The "wave equation" is a special mathematical formula that precisely describes how this string (or any other wave, like sound or light) moves and changes over time and space. It tells you exactly where each point on the string will be at any given moment.

Now, solving this wave equation can be quite tricky because the string's position depends on *both* where you are along the string (space) *and* when you're looking at it (time). This is called a Partial Differential Equation (PDE) because it involves derivatives with respect to multiple variables.

"Separation of variables" is a clever strategy to tackle such complex equations. It's like trying to fix a complicated machine: instead of trying to understand and fix everything at once, you break it down into smaller, simpler parts. For the wave equation, we assume that the wave's behavior can be described by multiplying two simpler functions: one that *only* cares about the string's position (space), and another that *only* cares about the time that has passed.

By making this assumption, we transform the single, complex PDE into two much simpler Ordinary Differential Equations (ODEs) – one for the space part and one for the time part. ODEs are much easier to solve because they only involve derivatives with respect to a single variable. Once we solve these two simpler problems, we combine their solutions to get the full picture of the wave.

## 2. Why it matters — real-world applications

The ability to solve the wave equation, especially using methods like separation of variables, is fundamental across many scientific and engineering disciplines.

1.  **Musical Instruments and Acoustics:** When a musician plucks a guitar string, strikes a drum, or blows into a flute, they are exciting vibrations that propagate as waves. Understanding and solving the wave equation allows engineers to design instruments with specific tones and resonances, predict how sound travels in concert halls, and create noise-canceling technology. For example, speaker manufacturers use principles derived from the wave equation to optimize cone design for sound reproduction.

2.  **Electromagnetism and Telecommunications:** Light, radio waves, microwaves, and X-rays are all forms of electromagnetic waves. Maxwell's equations, which govern all electromagnetic phenomena, can be reduced to wave equations in many scenarios. Solving these wave equations is critical for designing antennas, optimizing wireless communication networks (e.g., 5G infrastructure), developing radar systems for aerospace and defense, and even understanding how light propagates through optical fibers.

3.  **Seismology and Geophysics:** Earthquakes generate seismic waves that travel through the Earth's interior. Geologists and geophysicists use the wave equation to model the propagation of these P-waves and S-waves. By analyzing how these waves reflect and refract, they can map the Earth's internal structure, locate potential oil and gas reserves (critical for companies like ExxonMobil or Shell), and assess earthquake risks.

4.  **Quantum Mechanics:** While not the classical wave equation itself, the time-dependent Schrödinger equation, which describes the behavior of particles at the atomic and subatomic level, often employs separation of variables. This technique allows physicists to find the wave functions of electrons in atoms or molecules, leading to an understanding of chemical bonding, material properties, and the design of quantum computing devices.

## 3. Prerequisites — what you must know first

Before diving into solving the wave equation using separation of variables, ensure you have a solid grasp of the following concepts:

*   **Partial Derivatives:** The ability to differentiate functions of multiple variables with respect to one variable, treating others as constants.
*   **Ordinary Differential Equations (ODEs):** How to solve second-order linear homogeneous ODEs with constant coefficients (e.g., $y'' + ay' + by = 0$), including understanding characteristic equations and solutions involving exponentials, sines, and cosines.
*   **Eigenvalues and Eigenfunctions:** Familiarity with the concept of eigenvalues and eigenfunctions from linear algebra or Sturm-Liouville theory, particularly how boundary conditions constrain solutions to specific discrete values.
*   **Boundary Conditions (BCs):** What they are (conditions imposed at the spatial boundaries of the domain) and how to apply them to find specific solutions. Common types include Dirichlet (fixed value) and Neumann (fixed derivative/flux).
*   **Initial Conditions (ICs):** What they are (conditions imposed at the initial time) and how to apply them to determine unknown constants in the time-dependent part of the solution.
*   **Linearity and Superposition Principle:** The understanding that for linear PDEs, if $u_1, u_2, \dots$ are solutions, then any linear combination $c_1 u_1 + c_2 u_2 + \dots$ is also a solution. This is crucial for building the general solution.
*   **Fourier Series:** The ability to represent a periodic function (or a function defined on a finite interval) as an infinite sum of sines and cosines. You'll need to know how to calculate Fourier coefficients for sine and cosine series.

## 4. The core idea — step by step

Let's break down the method of separation of variables for the one-dimensional wave equation. We'll consider a common scenario: a vibrating string of length $L$, fixed at both ends.

### Step 1: The Wave Equation

*   **Plain English:** This is the fundamental mathematical rule that governs how waves behave. It relates how quickly the wave's shape changes over time to how quickly its curvature changes over space.
*   **Small concrete example:** Imagine a violin string. The equation describes its displacement $u(x,t)$ at any point $x$ along its length and at any time $t$.
*   **Formal/Mathematical version:** The one-dimensional homogeneous wave equation is given by:
    $$ \frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2} $$
    Here, $u(x,t)$ is the displacement of the string at position $x$ and time $t$. $c$ is the wave speed, which depends on the physical properties of the string (e.g., tension and mass per unit length).
*   **What could go wrong:** Students sometimes confuse the wave speed $c$ with other constants or forget that it's squared in the equation. Also, ensure you understand the notation of partial derivatives.

### Step 2: The Separation Assumption

*   **Plain English:** We make an educated guess that the solution $u(x,t)$ can be written as a product of two simpler functions: one that depends *only* on space ($x$) and another that depends *only* on time ($t$).
*   **Small concrete example:** Instead of trying to find a single complex function $u(x,t)$, we assume $u(x,t) = X(x)T(t)$. So, if you know how the string's shape changes with position ($X(x)$) and how its amplitude changes with time ($T(t)$), you can multiply them to get the full motion.
*   **Formal/Mathematical version:** We assume a solution of the form:
    $$ u(x,t) = X(x)T(t) $$
    where $X(x)$ is a function of $x$ only, and $T(t)$ is a function of $t$ only.
*   **What could go wrong:** This is an *assumption*. It doesn't always work for all PDEs or boundary conditions. However, for many common linear homogeneous PDEs (like the wave equation with homogeneous boundary conditions), it's a very powerful and effective technique.

### Step 3: Separating Variables

*   **Plain English:** We plug our assumed product solution into the wave equation and then algebraically rearrange it so that one side of the equation contains *only* functions of $x$ and the other side contains *only* functions of $t$.
*   **Small concrete example:** If we have $X T'' = c^2 X'' T$, we want to get $T''/T$ on one side and $X''/X$ on the other.
*   **Formal/Mathematical version:**
    1.  First, calculate the partial derivatives of $u(x,t) = X(x)T(t)$:
        $$ \frac{\partial^2 u}{\partial t^2} = X(x)T''(t) $$
        $$ \frac{\partial^2 u}{\partial x^2} = X''(x)T(t) $$
        (Here, $T''$ denotes $\frac{d^2 T}{dt^2}$ and $X''$ denotes $\frac{d^2 X}{dx^2}$, as $X$ depends only on $x$ and $T$ only on $t$.)
    2.  Substitute these into the wave equation:
        $$ X(x)T''(t) = c^2 X''(x)T(t) $$
    3.  Divide both sides by $c^2 X(x)T(t)$ (assuming $X(x)T(t) \neq 0$, which would be a trivial zero solution):
        $$ \frac{T''(t)}{c^2 T(t)} = \frac{X''(x)}{X(x)} $$
*   **What could go wrong:** Common algebraic mistakes include incorrect division or differentiation. Remember that $X(x)$ is treated as a constant when differentiating with respect to $t$, and $T(t)$ is treated as a constant when differentiating with respect to $x$.

### Step 4: Introducing the Separation Constant

*   **Plain English:** Look at the equation from Step 3: one side depends *only* on $t$, and the other side depends *only* on $x$. The only way two functions, each depending on a different independent variable, can be equal for *all* possible values of those variables is if both sides are equal to the *same constant*. We call this the "separation constant."
*   **Small concrete example:** If you have $f(x) = g(t)$, and this holds for all $x$ and $t$, then $f(x)$ must be a constant (say, $k$), and $g(t)$ must also be that same constant $k$. We usually choose $-\lambda$ for the constant in wave/heat equations because it often leads to oscillatory solutions, which are physically meaningful for waves.
*   **Formal/Mathematical version:**
    $$ \frac{T''(t)}{c^2 T(t)} = \frac{X''(x)}{X(x)} = -\lambda $$
    where $\lambda$ is the separation constant. The choice of $-\lambda$ (negative sign) is conventional because it typically leads to physically relevant oscillatory solutions for $X(x)$ and $T(t)$. If we chose $+\lambda$, we would get exponential solutions, which are usually not suitable for bounded vibrating systems unless $\lambda=0$.
*   **What could go wrong:** Choosing the wrong sign for the separation constant. If you choose $+\lambda$ and expect oscillatory solutions, you'll run into issues when applying boundary conditions. Always consider the physical nature of the problem.

### Step 5: Solving the Ordinary Differential Equations (ODEs)

*   **Plain English:** Now we have two separate, simpler ODEs, one for $X(x)$ and one for $T(t)$. We solve each of these independently. The solutions will depend on the value of the separation constant $\lambda$.
*   **Small concrete example:** From the previous step, we get $X''(x) = -\lambda X(x)$ and $T''(t) = -\lambda c^2 T(t)$. These are standard second-order linear ODEs.
*   **Formal/Mathematical version:**
    1.  **Spatial ODE:**
        $$ \frac{X''(x)}{X(x)} = -\lambda \implies X''(x) + \lambda X(x) = 0 $$
    2.  **Temporal ODE:**
        $$ \frac{T''(t)}{c^2 T(t)} = -\lambda \implies T''(t) + \lambda c^2 T(t) = 0 $$
    The solutions to these ODEs depend on the sign of $\lambda$:
    *   **Case 1: $\lambda < 0$ (Let $\lambda = -\mu^2$ for $\mu > 0$)**
        $X''(x) - \mu^2 X(x) = 0 \implies X(x) = A e^{\mu x} + B e^{-\mu x}$
        $T''(t) - \mu^2 c^2 T(t) = 0 \implies T(t) = D e^{\mu c t} + E e^{-\mu c t}$
        These are exponential solutions, which typically grow unbounded and are not suitable for vibrating strings with fixed ends.
    *   **Case 2: $\lambda = 0$**
        $X''(x) = 0 \implies X(x) = Ax + B$
        $T''(t) = 0 \implies T(t) = Dt + E$
        These are linear solutions.
    *   **Case 3: $\lambda > 0$ (Let $\lambda = k^2$ for $k > 0$)**
        $X''(x) + k^2 X(x) = 0 \implies X(x) = A \cos(kx) + B \sin(kx)$
        $T''(t) + k^2 c^2 T(t) = 0 \implies T(t) = D \cos(kct) + E \sin(kct)$
        These are oscillatory solutions, which are characteristic of waves.
*   **What could go wrong:** Incorrectly solving the ODEs, especially if you're not careful with the characteristic equation or the general solution forms for different signs of $\lambda$. It's crucial to consider all three cases for $\lambda$.

### Step 6: Applying Boundary Conditions (BCs)

*   **Plain English:** The physical constraints of the problem (e.g., the ends of the string are fixed) provide "boundary conditions." We apply these conditions to the spatial solution $X(x)$ to find the allowed values of the separation constant $\lambda$ and the specific forms of $X(x)$. These allowed values of $\lambda$ are called eigenvalues, and the corresponding $X(x)$ functions are called eigenfunctions.
*   **Small concrete example:** For a string of length $L$ fixed at both ends, the displacement at $x=0$ and $x=L$ must always be zero. So, $u(0,t) = 0$ and $u(L,t) = 0$. Since $u(x,t) = X(x)T(t)$, this means $X(0)T(t) = 0$ and $X(L)T(t) = 0$. If $T(t)$ is not always zero (which would be a trivial solution of no movement), then $X(0)=0$ and $X(L)=0$.
*   **Formal/Mathematical version:** Let's assume fixed ends (Dirichlet boundary conditions):
    $$ u(0,t) = 0 \quad \text{and} \quad u(L,t) = 0 \quad \text{for all } t \ge 0 $$
    Applying these to $u(x,t) = X(x)T(t)$:
    $$ X(0)T(t) = 0 \implies X(0) = 0 $$
    $$ X(L)T(t) = 0 \implies X(L) = 0 $$
    Now, let's apply these to the general solutions for $X(x)$ from Step 5:
    *   **Case 1 ($\lambda < 0$):** $X(x) = A e^{\mu x} + B e^{-\mu x}$
        $X(0) = A + B = 0 \implies B = -A$
        $X(L) = A e^{\mu L} + B e^{-\mu L} = A(e^{\mu L} - e^{-\mu L}) = 0$
        Since $\mu > 0$ and $L > 0$, $e^{\mu L} - e^{-\mu L} \neq 0$. This implies $A=0$, and thus $B=0$. So, $X(x)=0$, which is a trivial solution.
    *   **Case 2 ($\lambda = 0$):** $X(x) = Ax + B$
        $X(0) = B = 0$
        $X(L) = AL + B = AL = 0 \implies A=0$. So, $X(x)=0$, again a trivial solution.
    *   **Case 3 ($\lambda > 0$, $\lambda = k^2$):** $X(x) = A \cos(kx) + B \sin(kx)$
        $X(0) = A \cos(0) + B \sin(0) = A = 0$
        So, $X(x) = B \sin(kx)$.
        Now, apply $X(L)=0$:
        $X(L) = B \sin(kL) = 0$
        For a non-trivial solution ($B \neq 0$), we must have $\sin(kL) = 0$. This occurs when $kL$ is an integer multiple of $\pi$:
        $$ kL = n\pi \quad \text{for } n = 1, 2, 3, \dots $$
        (We exclude $n=0$ because it would lead to $k=0$ and thus $\lambda=0$, which we already showed gives trivial solutions. Negative $n$ values just give redundant solutions like $-\sin(kx)$.)
        This gives us the allowed values for $k$:
        $$ k_n = \frac{n\pi}{L} $$
        And thus the eigenvalues for $\lambda$:
        $$ \lambda_n = k_n^2 = \left(\frac{n\pi}{L}\right)^2 $$
        The corresponding eigenfunctions are:
        $$ X_n(x) = B_n \sin\left(\frac{n\pi x}{L}\right) $$
*   **What could go wrong:** Forgetting to test all cases for $\lambda$. Incorrectly applying the boundary conditions (e.g., $X(0)=0$ to $T(t)$ or vice versa). Algebraic errors when solving for $k_n$.

### Step 7: Constructing the General Solution using Superposition

*   **Plain English:** Since the wave equation is linear, if we find many individual solutions $u_n(x,t)$, then any sum of these solutions is also a valid solution. We combine all the allowed $X_n(x)$ and $T_n(t)$ solutions to form an infinite series, which represents the general solution.
*   **Small concrete example:** We found $X_n(x) = B_n \sin(k_n x)$ and $T_n(t) = D_n \cos(k_n c t) + E_n \sin(k_n c t)$. Each product $X_n(x)T_n(t)$ is a solution. The general solution is the sum of all such products.
*   **Formal/Mathematical version:**
    For each eigenvalue $\lambda_n = (n\pi/L)^2$, we have a spatial solution $X_n(x) = B_n \sin(n\pi x/L)$ and a temporal solution $T_n(t) = D_n \cos(n\pi c t/L) + E_n \sin(n\pi c t/L)$.
    Combining these, each $u_n(x,t) = X_n(x)T_n(t)$ is a particular solution:
    $$ u_n(x,t) = \sin\left(\frac{n\pi x}{L}\right) \left[ B_n D_n \cos\left(\frac{n\pi c t}{L}\right) + B_n E_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
    Let $A_n = B_n D_n$ and $C_n = B_n E_n$. Then, by the superposition principle, the general solution is an infinite sum of these particular solutions:
    $$ u(x,t) = \sum_{n=1}^\infty u_n(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ A_n \cos\left(\frac{n\pi c t}{L}\right) + C_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
*   **What could go wrong:** Forgetting to sum over all possible $n$ values. Incorrectly combining the constants ($B_n D_n$ and $B_n E_n$ become the new coefficients $A_n$ and $C_n$).

### Step 8: Applying Initial Conditions (ICs) using Fourier Series

*   **Plain English:** The problem usually specifies the initial state of the wave: its shape at time $t=0$ (initial displacement) and its speed at time $t=0$ (initial velocity). We use these "initial conditions" to find the specific values of the coefficients ($A_n$ and $C_n$) in our general solution. This step almost always involves Fourier series.
*   **Small concrete example:** If you pluck a guitar string, you give it an initial shape $f(x)$ and an initial velocity $g(x)$. We need to match our sum of sines to these initial shapes.
*   **Formal/Mathematical version:** We are typically given two initial conditions:
    1.  Initial displacement: $u(x,0) = f(x)$
    2.  Initial velocity: $\frac{\partial u}{\partial t}(x,0) = g(x)$
    Apply the first IC to the general solution:
    $$ u(x,0) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ A_n \cos(0) + C_n \sin(0) \right] = \sum_{n=1}^\infty A_n \sin\left(\frac{n\pi x}{L}\right) = f(x) $$
    This is a Fourier sine series for $f(x)$. The coefficients $A_n$ are given by the Fourier sine coefficient formula:
    $$ A_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
    Now, differentiate $u(x,t)$ with respect to $t$:
    $$ \frac{\partial u}{\partial t}(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ -A_n \left(\frac{n\pi c}{L}\right) \sin\left(\frac{n\pi c t}{L}\right) + C_n \left(\frac{n\pi c}{L}\right) \cos\left(\frac{n\pi c t}{L}\right) \right] $$
    Apply the second IC:
    $$ \frac{\partial u}{\partial t}(x,0) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ -A_n \left(\frac{n\pi c}{L}\right) \sin(0) + C_n \left(\frac{n\pi c}{L}\right) \cos(0) \right] $$
    $$ = \sum_{n=1}^\infty C_n \left(\frac{n\pi c}{L}\right) \sin\left(\frac{n\pi x}{L}\right) = g(x) $$
    This is another Fourier sine series, this time for $g(x)$. The coefficients $C_n \left(\frac{n\pi c}{L}\right)$ are given by the Fourier sine coefficient formula:
    $$ C_n \left(\frac{n\pi c}{L}\right) = \frac{2}{L} \int_0^L g(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
    Solving for $C_n$:
    $$ C_n = \frac{2}{n\pi c} \int_0^L g(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
    With $A_n$ and $C_n$ determined, the unique solution $u(x,t)$ is fully specified.
*   **What could go wrong:** Mistakes in calculating the Fourier coefficients (integration errors, incorrect formula, wrong limits). Forgetting to differentiate the general solution with respect to $t$ *before* applying the initial velocity condition.

## 5. Worked examples — multiple, with every step shown

We will solve the one-dimensional wave equation:
$$ \frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2} \quad \text{for } 0 < x < L, t > 0 $$
with fixed boundary conditions:
$$ u(0,t) = 0, \quad u(L,t) = 0 $$
and initial conditions:
$$ u(x,0) = f(x) $$
$$ \frac{\partial u}{\partial t}(x,0) = g(x) $$

### Example 1: Plucked String with Zero Initial Velocity

**Problem:** Find the displacement $u(x,t)$ of a string of length $L$ fixed at both ends, given an initial displacement $f(x) = \sin(\frac{\pi x}{L})$ and zero initial velocity $g(x) = 0$.

**Given:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$
*   Boundary conditions: $u(0,t) = 0$, $u(L,t) = 0$
*   Initial displacement: $u(x,0) = \sin(\frac{\pi x}{L})$
*   Initial velocity: $u_t(x,0) = 0$

**What we want:** The specific function $u(x,t)$ that satisfies all these conditions.

**Step 1: Assume a product solution and separate variables.**
We assume $u(x,t) = X(x)T(t)$. Substituting into the wave equation and separating gives:
$$ \frac{T''(t)}{c^2 T(t)} = \frac{X''(x)}{X(x)} = -\lambda $$
*Explanation: This is the standard first step for separation of variables. The negative separation constant $-\lambda$ is chosen to yield oscillatory solutions for the spatial part, which is consistent with fixed boundary conditions.*

This yields two ODEs:
1.  $X''(x) + \lambda X(x) = 0$
2.  $T''(t) + \lambda c^2 T(t) = 0$
*Explanation: Rearranging the separated equations into standard ODE forms.*

**Step 2: Apply boundary conditions to the spatial ODE.**
The boundary conditions are $u(0,t)=0$ and $u(L,t)=0$. Since $u(x,t) = X(x)T(t)$, and for non-trivial solutions $T(t) \neq 0$, we must have:
$$ X(0) = 0 \quad \text{and} \quad X(L) = 0 $$
*Explanation: If the ends are fixed, the spatial part of the solution must be zero at those points.*

We consider the three cases for $\lambda$:
*   If $\lambda < 0$, $X(x) = A e^{\sqrt{-\lambda}x} + B e^{-\sqrt{-\lambda}x}$. Applying $X(0)=0 \implies A+B=0 \implies B=-A$. Applying $X(L)=0 \implies A(e^{\sqrt{-\lambda}L} - e^{-\sqrt{-\lambda}L}) = 0$. Since $\sqrt{-\lambda}L \neq 0$, $e^{\sqrt{-\lambda}L} - e^{-\sqrt{-\lambda}L} \neq 0$. Thus $A=0$, implying $B=0$, so $X(x)=0$ (trivial solution).
*   If $\lambda = 0$, $X(x) = Ax + B$. Applying $X(0)=0 \implies B=0$. Applying $X(L)=0 \implies AL=0 \implies A=0$. So $X(x)=0$ (trivial solution).
*   If $\lambda > 0$, let $\lambda = k^2$ for $k>0$. The general solution is $X(x) = A \cos(kx) + B \sin(kx)$.
    *   $X(0) = A \cos(0) + B \sin(0) = A = 0$.
    *   So, $X(x) = B \sin(kx)$.
    *   $X(L) = B \sin(kL) = 0$. For a non-trivial solution ($B \neq 0$), we must have $\sin(kL) = 0$.
    *   This implies $kL = n\pi$ for $n = 1, 2, 3, \dots$. (We exclude $n=0$ as it leads to $\lambda=0$, which gives trivial solutions).
    *   Therefore, $k_n = \frac{n\pi}{L}$.
    *   And the eigenvalues are $\lambda_n = k_n^2 = \left(\frac{n\pi}{L}\right)^2$.
    *   The corresponding eigenfunctions are $X_n(x) = B_n \sin\left(\frac{n\pi x}{L}\right)$.
*Explanation: Systematically checking all possible values of $\lambda$ to find non-trivial solutions that satisfy the boundary conditions. Only positive $\lambda$ yields oscillatory solutions, which are physically meaningful for fixed ends. This step determines the allowed spatial modes (eigenfunctions) and their corresponding frequencies (eigenvalues).*

**Step 3: Solve the temporal ODE for each eigenvalue.**
For each $\lambda_n = \left(\frac{n\pi}{L}\right)^2$, the temporal ODE is $T''(t) + \left(\frac{n\pi}{L}\right)^2 c^2 T(t) = 0$.
Let $\omega_n = \frac{n\pi c}{L}$. Then $T''(t) + \omega_n^2 T(t) = 0$.
The general solution for $T(t)$ is $T_n(t) = D_n \cos(\omega_n t) + E_n \sin(\omega_n t)$.
*Explanation: Solving the second ODE using the eigenvalues found from the spatial problem. This gives the time-dependent behavior for each spatial mode.*

**Step 4: Form the general solution using superposition.**
Combining $X_n(x)$ and $T_n(t)$, and applying the superposition principle:
$$ u(x,t) = \sum_{n=1}^\infty X_n(x)T_n(t) = \sum_{n=1}^\infty B_n \sin\left(\frac{n\pi x}{L}\right) \left[ D_n \cos\left(\frac{n\pi c t}{L}\right) + E_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
Let $A_n = B_n D_n$ and $C_n = B_n E_n$.
$$ u(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ A_n \cos\left(\frac{n\pi c t}{L}\right) + C_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
*Explanation: The general solution is an infinite sum of products of eigenfunctions and their corresponding time-dependent solutions. This is allowed because the wave equation is linear.*

**Step 5: Apply initial conditions to find coefficients $A_n$ and $C_n$.**
*   **Initial displacement:** $u(x,0) = f(x) = \sin(\frac{\pi x}{L})$
    $$ u(x,0) = \sum_{n=1}^\infty A_n \sin\left(\frac{n\pi x}{L}\right) = \sin\left(\frac{\pi x}{L}\right) $$
    By inspection, this is a Fourier sine series where only the $n=1$ term is non-zero.
    So, $A_1 = 1$ and $A_n = 0$ for $n \neq 1$.
    *Explanation: We match the general solution at $t=0$ to the given initial displacement. This becomes a Fourier sine series problem. In this specific case, the initial displacement perfectly matches the first Fourier sine term, simplifying the coefficients.*

*   **Initial velocity:** $\frac{\partial u}{\partial t}(x,0) = g(x) = 0$
    First, differentiate $u(x,t)$ with respect to $t$:
    $$ \frac{\partial u}{\partial t}(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ -A_n \left(\frac{n\pi c}{L}\right) \sin\left(\frac{n\pi c t}{L}\right) + C_n \left(\frac{n\pi c}{L}\right) \cos\left(\frac{n\pi c t}{L}\right) \right] $$
    Now, set $t=0$:
    $$ \frac{\partial u}{\partial t}(x,0) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ C_n \left(\frac{n\pi c}{L}\right) \right] = 0 $$
    For this sum to be zero for all $x$, all the coefficients must be zero:
    $$ C_n \left(\frac{n\pi c}{L}\right) = 0 $$
    Since $\frac{n\pi c}{L} \neq 0$ for $n \ge 1$, we must have $C_n = 0$ for all $n$.
    *Explanation: We differentiate the general solution with respect to time, then apply the initial velocity condition. This again leads to a Fourier series, which must be zero for all $x$, implying all its coefficients are zero.*

**Step 6: Write the final solution.**
Substitute $A_1=1$, $A_n=0$ (for $n \neq 1$), and $C_n=0$ (for all $n$) into the general solution:
$$ u(x,t) = \sin\left(\frac{\pi x}{L}\right) \left[ 1 \cdot \cos\left(\frac{\pi c t}{L}\right) + 0 \cdot \sin\left(\frac{\pi c t}{L}\right) \right] $$
$$ \boxed{u(x,t) = \sin\left(\frac{\pi x}{L}\right) \cos\left(\frac{\pi c t}{L}\right)} $$
*Explanation: Combining the determined coefficients back into the general solution yields the unique solution for the given initial and boundary conditions.*

**Reflection:** This example was relatively easy because the initial displacement $f(x)$ perfectly matched one of the eigenfunctions, making the Fourier series calculation trivial (by inspection). The zero initial velocity also simplified the $C_n$ coefficients to zero. This solution represents the fundamental mode of vibration of the string.

---

### Example 2: String with Zero Initial Displacement and Non-Zero Initial Velocity

**Problem:** Find the displacement $u(x,t)$ of a string of length $L$ fixed at both ends, given zero initial displacement $f(x) = 0$ and an initial velocity $g(x) = \sin(\frac{2\pi x}{L})$.

**Given:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$
*   Boundary conditions: $u(0,t) = 0$, $u(L,t) = 0$
*   Initial displacement: $u(x,0) = 0$
*   Initial velocity: $u_t(x,0) = \sin(\frac{2\pi x}{L})$

**What we want:** The specific function $u(x,t)$ that satisfies all these conditions.

**Steps 1-4: General solution (same as Example 1).**
The general solution for $u(x,t)$ (before applying initial conditions) is:
$$ u(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ A_n \cos\left(\frac{n\pi c t}{L}\right) + C_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
*Explanation: The separation of variables, solving ODEs, and applying boundary conditions lead to this general form, regardless of the specific initial conditions.*

**Step 5: Apply initial conditions to find coefficients $A_n$ and $C_n$.**
*   **Initial displacement:** $u(x,0) = f(x) = 0$
    $$ u(x,0) = \sum_{n=1}^\infty A_n \sin\left(\frac{n\pi x}{L}\right) = 0 $$
    For this sum to be zero for all $x$, all the coefficients $A_n$ must be zero:
    $$ A_n = 0 \quad \text{for all } n \ge 1 $$
    *Explanation: The initial displacement being zero means there are no cosine terms in the time-dependent part of the solution.*

*   **Initial velocity:** $\frac{\partial u}{\partial t}(x,0) = g(x) = \sin(\frac{2\pi x}{L})$
    First, differentiate $u(x,t)$ with respect to $t$ (with $A_n=0$):
    $$ \frac{\partial u}{\partial t}(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ C_n \left(\frac{n\pi c}{L}\right) \cos\left(\frac{n\pi c t}{L}\right) \right] $$
    Now, set $t=0$:
    $$ \frac{\partial u}{\partial t}(x,0) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ C_n \left(\frac{n\pi c}{L}\right) \right] = \sin\left(\frac{2\pi x}{L}\right) $$
    By inspection, this is a Fourier sine series where only the $n=2$ term is non-zero.
    So, for $n=2$:
    $$ C_2 \left(\frac{2\pi c}{L}\right) = 1 $$
    $$ C_2 = \frac{L}{2\pi c} $$
    For $n \neq 2$:
    $$ C_n \left(\frac{n\pi c}{L}\right) = 0 \implies C_n = 0 \quad \text{for } n \neq 2 $$
    *Explanation: Similar to Example 1, the initial velocity perfectly matches one of the Fourier sine terms (the second mode), making coefficient calculation straightforward.*

**Step 6: Write the final solution.**
Substitute $A_n=0$ (for all $n$), $C_2 = \frac{L}{2\pi c}$, and $C_n=0$ (for $n \neq 2$) into the general solution:
$$ u(x,t) = \sin\left(\frac{2\pi x}{L}\right) \left[ 0 \cdot \cos\left(\frac{2\pi c t}{L}\right) + \frac{L}{2\pi c} \sin\left(\frac{2\pi c t}{L}\right) \right] $$
$$ \boxed{u(x,t) = \frac{L}{2\pi c} \sin\left(\frac{2\pi x}{L}\right) \sin\left(\frac{2\pi c t}{L}\right)} $$
*Explanation: Substituting the determined coefficients into the general solution gives the unique solution.*

**Reflection:** This example highlights how initial velocity contributes to the sine terms in the temporal part of the solution. Again, the specific form of $g(x)$ made the Fourier coefficient calculation simple by inspection. This solution represents the second harmonic mode of vibration.

---

### Example 3: String with Initial Displacement and Zero Initial Velocity (requiring integration)

**Problem:** Find the displacement $u(x,t)$ of a string of length $L$ fixed at both ends, given an initial displacement $f(x) = x(L-x)$ and zero initial velocity $g(x) = 0$.

**Given:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$
*   Boundary conditions: $u(0,t) = 0$, $u(L,t) = 0$
*   Initial displacement: $u(x,0) = x(L-x)$
*   Initial velocity: $u_t(x,0) = 0$

**What we want:** The specific function $u(x,t)$ that satisfies all these conditions.

**Steps 1-4: General solution (same as Example 1).**
The general solution for $u(x,t)$ (before applying initial conditions) is:
$$ u(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ A_n \cos\left(\frac{n\pi c t}{L}\right) + C_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
*Explanation: The general form is established from the PDE and BCs.*

**Step 5: Apply initial conditions to find coefficients $A_n$ and $C_n$.**
*   **Initial displacement:** $u(x,0) = f(x) = x(L-x)$
    $$ u(x,0) = \sum_{n=1}^\infty A_n \sin\left(\frac{n\pi x}{L}\right) = x(L-x) $$
    Here, $f(x) = xL - x^2$ is not a simple sine function, so we must use the Fourier sine coefficient formula:
    $$ A_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx = \frac{2}{L} \int_0^L (Lx - x^2) \sin\left(\frac{n\pi x}{L}\right) dx $$
    We use integration by parts (twice) or a table of integrals. Let $k = \frac{n\pi}{L}$.
    $$ \int x \sin(kx) dx = -\frac{x}{k}\cos(kx) + \frac{1}{k^2}\sin(kx) $$
    $$ \int x^2 \sin(kx) dx = -\frac{x^2}{k}\cos(kx) + \frac{2x}{k^2}\sin(kx) + \frac{2}{k^3}\cos(kx) $$
    So,
    $$ \int_0^L (Lx - x^2) \sin(kx) dx = L \int_0^L x \sin(kx) dx - \int_0^L x^2 \sin(kx) dx $$
    Let's evaluate the integrals for the limits $0$ to $L$. Recall $kL = n\pi$.
    At $x=L$: $\sin(kL) = \sin(n\pi) = 0$, $\cos(kL) = \cos(n\pi) = (-1)^n$.
    At $x=0$: $\sin(0) = 0$, $\cos(0) = 1$.

    $$ \int_0^L x \sin(kx) dx = \left[-\frac{x}{k}\cos(kx) + \frac{1}{k^2}\sin(kx)\right]_0^L $$
    $$ = \left(-\frac{L}{k}\cos(n\pi) + 0\right) - (0 + 0) = -\frac{L}{k}(-1)^n $$

    $$ \int_0^L x^2 \sin(kx) dx = \left[-\frac{x^2}{k}\cos(kx) + \frac{2x}{k^2}\sin(kx) + \frac{2}{k^3}\cos(kx)\right]_0^L $$
    $$ = \left(-\frac{L^2}{k}\cos(n\pi) + 0 + \frac{2}{k^3}\cos(n\pi)\right) - \left(0 + 0 + \frac{2}{k^3}\cos(0)\right) $$
    $$ = -\frac{L^2}{k}(-1)^n + \frac{2}{k^3}(-1)^n - \frac{2}{k^3} $$

    Now, combine these:
    $$ \int_0^L (Lx - x^2) \sin(kx) dx = L \left(-\frac{L}{k}(-1)^n\right) - \left(-\frac{L^2}{k}(-1)^n + \frac{2}{k^3}(-1)^n - \frac{2}{k^3}\right) $$
    $$ = -\frac{L^2}{k}(-1)^n + \frac{L^2}{k}(-1)^n - \frac{2}{k^3}(-1)^n + \frac{2}{k^3} $$
    $$ = \frac{2}{k^3} (1 - (-1)^n) $$
    Substitute $k = \frac{n\pi}{L}$:
    $$ = \frac{2}{(n\pi/L)^3} (1 - (-1)^n) = \frac{2L^3}{n^3\pi^3} (1 - (-1)^n) $$
    Finally, for $A_n$:
    $$ A_n = \frac{2}{L} \cdot \frac{2L^3}{n^3\pi^3} (1 - (-1)^n) = \frac{4L^2}{n^3\pi^3} (1 - (-1)^n) $$
    Notice that $(1 - (-1)^n)$ is $0$ if $n$ is even, and $2$ if $n$ is odd.
    So, $A_n = 0$ for even $n$.
    For odd $n$: $A_n = \frac{4L^2}{n^3\pi^3} (2) = \frac{8L^2}{n^3\pi^3}$.
    *Explanation: This is the most computationally intensive part, requiring careful integration to find the Fourier coefficients for the given initial displacement. The result shows that only odd modes are excited by this parabolic initial shape.*

*   **Initial velocity:** $\frac{\partial u}{\partial t}(x,0) = g(x) = 0$
    As shown in Example 1, if $g(x)=0$, then all $C_n=0$.
    *Explanation: Zero initial velocity implies no sine terms in the temporal part of the solution.*

**Step 6: Write the final solution.**
Substitute $A_n$ (for odd $n$) and $C_n=0$ into the general solution:
$$ \boxed{u(x,t) = \sum_{n \text{ odd}}^\infty \frac{8L^2}{n^3\pi^3} \sin\left(\frac{n\pi x}{L}\right) \cos\left(\frac{n\pi c t}{L}\right)} $$
Or, writing $n=2m-1$ for $m=1,2,3,\dots$:
$$ \boxed{u(x,t) = \sum_{m=1}^\infty \frac{8L^2}{(2m-1)^3\pi^3} \sin\left(\frac{(2m-1)\pi x}{L}\right) \cos\left(\frac{(2m-1)\pi c t}{L}\right)} $$
*Explanation: The final solution is an infinite series, as expected when the initial conditions are not simple eigenfunctions. Only odd modes contribute to the vibration for this initial displacement.*

**Reflection:** This example demonstrates the full power of Fourier series. When the initial conditions are not simple sines or cosines, we must perform the integration to find the coefficients. The resulting solution is an infinite sum, representing the complex superposition of many vibrational modes. The fact that only odd modes are present is a common result for initial displacements that are symmetric about the string's midpoint and zero at the ends.

---

### Example 4: String with Initial Displacement and Initial Velocity (both non-zero)

**Problem:** Find the displacement $u(x,t)$ of a string of length $L$ fixed at both ends, given an initial displacement $f(x) = \sin(\frac{\pi x}{L})$ and an initial velocity $g(x) = \sin(\frac{3\pi x}{L})$.

**Given:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$
*   Boundary conditions: $u(0,t) = 0$, $u(L,t) = 0$
*   Initial displacement: $u(x,0) = \sin(\frac{\pi x}{L})$
*   Initial velocity: $u_t(x,0) = \sin(\frac{3\pi x}{L})$

**What we want:** The specific function $u(x,t)$ that satisfies all these conditions.

**Steps 1-4: General solution (same as Example 1).**
The general solution for $u(x,t)$ (before applying initial conditions) is:
$$ u(x,t) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ A_n \cos\left(\frac{n\pi c t}{L}\right) + C_n \sin\left(\frac{n\pi c t}{L}\right) \right] $$
*Explanation: The general form is consistently derived from the PDE and BCs.*

**Step 5: Apply initial conditions to find coefficients $A_n$ and $C_n$.**
*   **Initial displacement:** $u(x,0) = f(x) = \sin(\frac{\pi x}{L})$
    $$ u(x,0) = \sum_{n=1}^\infty A_n \sin\left(\frac{n\pi x}{L}\right) = \sin\left(\frac{\pi x}{L}\right) $$
    By inspection, we find:
    $$ A_1 = 1 $$
    $$ A_n = 0 \quad \text{for } n \neq 1 $$
    *Explanation: The initial displacement matches the first eigenfunction, so only $A_1$ is non-zero.*

*   **Initial velocity:** $\frac{\partial u}{\partial t}(x,0) = g(x) = \sin(\frac{3\pi x}{L})$
    The derivative of $u(x,t)$ with respect to $t$ at $t=0$ is:
    $$ \frac{\partial u}{\partial t}(x,0) = \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ C_n \left(\frac{n\pi c}{L}\right) \right] $$
    We set this equal to $g(x)$:
    $$ \sum_{n=1}^\infty \sin\left(\frac{n\pi x}{L}\right) \left[ C_n \left(\frac{n\pi c}{L}\right) \right] = \sin\left(\frac{3\pi x}{L}\right) $$
    By inspection, only the $n=3$ term is non-zero:
    For $n=3$:
    $$ C_3 \left(\frac{3\pi c}{L}\right) = 1 $$
    $$ C_3 = \frac{L}{3\pi c} $$
    For $n \neq 3$:
    $$ C_n \left(\frac{n\pi c}{L}\right) = 0 \implies C_n = 0 \quad \text{for } n \neq 3 $$
    *Explanation: The initial velocity matches the third eigenfunction, so only $C_3$ is non-zero.*

**Step 6: Write the final solution.**
Substitute $A_1=1$, $A_n=0$ (for $n \neq 1$), $C_3 = \frac{L}{3\pi c}$, and $C_n=0$ (for $n \neq 3$) into the general solution:
$$ u(x,t) = \sin\left(\frac{1\pi x}{L}\right) \left[ A_1 \cos\left(\frac{1\pi c t}{L}\right) + C_1 \sin\left(\frac{1\pi c t}{L}\right) \right] $$
$$ + \sin\left(\frac{3\pi x}{L}\right) \left[ A_3 \cos\left(\frac{3\pi c t}{L}\right) + C_3 \sin\left(\frac{3\pi c t}{L}\right) \right] $$
All other terms are zero.
$$ u(x,t) = \sin\left(\frac{\pi x}{L}\right) \left[ 1 \cdot \cos\left(\frac{\pi c t}{L}\right) + 0 \cdot \sin\left(\frac{\pi c t}{L}\right) \right] $$
$$ + \sin\left(\frac{3\pi x}{L}\right) \left[ 0 \cdot \cos\left(\frac{3\pi c t}{L}\right) + \frac{L}{3\pi c} \sin\left(\frac{3\pi c t}{L}\right) \right] $$
$$ \boxed{u(x,t) = \sin\left(\frac{\pi x}{L}\right) \cos\left(\frac{\pi c t}{L}\right) + \frac{L}{3\pi c} \sin\left(\frac{3\pi x}{L}\right) \sin\left(\frac{3\pi c t}{L}\right)} $$
*Explanation: The final solution is a sum of two distinct modes, one driven by the initial displacement and another by the initial velocity. This demonstrates the superposition principle in action.*

**Reflection:** This example shows how initial displacement and initial velocity contribute independently to the coefficients $A_n$ and $C_n$ respectively. Even though both initial conditions were simple sines, they corresponded to different modes ($n=1$ for displacement, $n=3$ for velocity), resulting in a solution that is a superposition of these two modes. This is a common and important scenario in wave phenomena.

## 6. Common mistakes and traps

1.  **Incorrect Sign of Separation Constant:** Choosing $\lambda$ instead of $-\lambda$ (or vice versa) without considering the physical implications. For bounded domains (like a finite string), solutions usually need to be oscillatory, which requires $\lambda > 0$ if the ODE is $X'' + \lambda X = 0$. Using the wrong sign often leads to exponentially growing solutions that don't fit the physical boundary conditions.
2.  **Algebraic Errors during Separation:** Mistakes in differentiating $X(x)T(t)$ or rearranging the terms to isolate $X''/X$ and $T''/T$. Be meticulous with algebra.
3.  **Forgetting Trivial Solutions:** Not checking the cases $\lambda=0$ or $\lambda<0$ for the spatial ODE. While often these lead to trivial (zero) solutions for homogeneous boundary conditions, it's a necessary step to show why they are excluded.
4.  **Incorrectly Applying Boundary Conditions (BCs):** Applying BCs to the temporal function $T(t)$ instead of the spatial function $X(x)$, or applying them incorrectly (e.g., $X'(0)=0$ instead of $X(0)=0$ for a fixed end). BCs are defined at spatial boundaries and thus constrain $X(x)$.
5.  **Confusing Initial Conditions (ICs) and Boundary Conditions (BCs):** BCs are spatial constraints (at $x=0, L$), while ICs are temporal constraints (at $t=0$). BCs determine the eigenvalues and eigenfunctions ($X_n(x)$), while ICs determine the coefficients ($A_n, C_n$) of the series solution.
6.  **Errors in Fourier Series Calculation:** This is a major source of mistakes. Common issues include:
    *   Using the wrong formula for $A_n$ or $C_n$ (e.g., using the full Fourier series formula instead of the sine series formula when dealing with odd functions on $[0,L]$).
    *   Incorrect integration (especially integration by parts).
    *   Incorrect limits of integration (always $[0,L]$ for the string problem).
    *   Misinterpreting the result for even/odd $n$ (e.g., $(1 - (-1)^n)$ factor).
7.  **Forgetting Superposition:** Not summing up all individual solutions $u_n(x,t)$ to form the general solution. The power of linearity allows for this infinite sum.

## 7. Textbook-precise explanation

Consider the one-dimensional homogeneous wave equation for the displacement $u(x,t)$ of a vibrating string of length $L$:
$$ \frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2} \quad \text{for } 0 < x < L, t > 0 $$
where $c$ is the wave speed. This equation is subject to:

1.  **Homogeneous Dirichlet Boundary Conditions (fixed ends):**
    $$ u(0,t) = 0, \quad u(L,t) = 0 \quad \text{for all } t \ge 0 $$
2.  **