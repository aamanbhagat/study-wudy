## What it is
The Runge-Kutta 4th order (RK4) method for systems is a numerical technique for approximating solutions to a set of coupled first-order ordinary differential equations. It extends the scalar RK4 method by treating the dependent variables as a single state vector and the derivatives as a vector-valued function. The core algorithm remains the same, but all operations (additions, multiplications by a scalar) are performed on vectors instead of scalars.

## Why it matters
This method is the workhorse for simulating complex dynamical systems across science and engineering. In aerospace, it's used to compute spacecraft trajectories in the N-body problem of orbital mechanics, where the position and velocity of each body are coupled. In physics, it models everything from coupled oscillators to the evolution of particle distributions, and in computer science, it can model the dynamics of complex networks or the training of certain types of neural networks (Neural ODEs).

## When to study it
Before tackling this, you must have a firm grasp of three concepts:
1.  **Scalar RK4:** You should be able to apply the standard RK4 algorithm to a single first-order ODE, $y' = f(t, y)$, by hand.
2.  **Systems of First-Order ODEs:** You must be comfortable converting a single higher-order ODE (e.g., $y'' + ay' + by = g(t)$) into an equivalent system of first-order ODEs.
3.  **Vector Algebra:** Basic operations like vector addition and scalar-vector multiplication must be second nature.

If you are not confident in these, pause and review them. The leap to systems is small but relies entirely on this foundation.

## How to study it (step by step)
1.  **Review Scalar RK4:** Write down the formulas for $k_1, k_2, k_3, k_4$ and the update rule for $y_{n+1}$ for a single equation $y' = f(t,y)$. Do not proceed until these are clear.
2.  **Vectorize the Notation:** Rewrite the scalar RK4 formulas by simply replacing the scalar variables with bolded vector variables. Let $y \to \mathbf{y}$, $f \to \mathbf{f}$, and $k_i \to \mathbf{k}_i$. Observe that the structure is formally identical.
3.  **Convert a Problem:** Take the equation for a simple harmonic oscillator, $\ddot{x} = -x$. Define a state vector $\mathbf{y} = \begin{pmatrix} x \\ \dot{x} \end{pmatrix}$. Derive the corresponding vector function $\mathbf{f}(t, \mathbf{y})$.
4.  **Hand-Calculate One Step:** Using the system from step 3, with initial conditions $x(0)=1, \dot{x}(0)=0$ and a step size $h=0.1$, calculate the vectors $\mathbf{k}_1, \mathbf{k}_2, \mathbf{k}_3, \mathbf{k}_4$ and the new state vector $\mathbf{y}_1$.
5.  **Implement in Code:** Write a short program (e.g., in Python with NumPy) that implements the vector RK4 algorithm. Test it on the harmonic oscillator from step 3 and plot the results (position vs. time, and position vs. velocity).
6.  **Apply to a Non-linear System:** Find the Lotka-Volterra (predator-prey) equations. Implement this system using your RK4 function and observe the cyclic behavior of the populations. This will solidify your understanding of how the vector function $\mathbf{f}$ can depend on multiple components of the state vector $\mathbf{y}$.

## Key ideas, with intuition
1.  **The State is a Vector:** A system's state is not just one number, but a collection of numbers. For a particle in 3D space, its state is its position $(x,y,z)$ and its velocity $(v_x, v_y, v_z)$. We package these into a single state vector, $\mathbf{y} = (x, y, z, v_x, v_y, v_z)^T$. The entire system's configuration at a given time is just one point in a high-dimensional state space.

2.  **The Dynamics are a Vector Field:** A system of ODEs, like $\frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y})$, defines a vector field. At any point $\mathbf{y}$ in the state space, the function $\mathbf{f}$ gives you a vector that tells you where the state is heading next. Solving the ODEs is equivalent to "following the arrows" of this vector field.

3.  **The RK4 "Recipe" is Universal:** The genius of the RK4 algorithm is that its weighted average of slopes works just as well for vector slopes as it does for scalar slopes. The logic is identical:
    -   Take a step in the direction of the initial slope ($\mathbf{k}_1$).
    -   Go back and check the slope at the midpoint of that tentative step ($\mathbf{k}_2$).
    -   Go back again and take a step using this better midpoint slope ($\mathbf{k}_3$).
    -   Finally, check the slope at the end of the step you just took ($\mathbf{k}_4$).
    -   Combine these four slopes with Simpson's rule-like weights to get the best overall step.

    The scalar formulas:
    $$ y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4) $$
    $$ k_1 = f(t_n, y_n) $$
    $$ k_2 = f(t_n + h/2, y_n + h/2 \cdot k_1) $$
    $$ k_3 = f(t_n + h/2, y_n + h/2 \cdot k_2) $$
    $$ k_4 = f(t_n + h, y_n + h \cdot k_3) $$

    become the vector formulas by simply adding boldface:
    $$ \mathbf{y}_{n+1} = \mathbf{y}_n + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    $$ \mathbf{k}_1 = \mathbf{f}(t_n, \mathbf{y}_n) $$
    $$ \mathbf{k}_2 = \mathbf{f}(t_n + h/2, \mathbf{y}_n + h/2 \cdot \mathbf{k}_1) $$
    $$ \mathbf{k}_3 = \mathbf{f}(t_n + h/2, \mathbf{y}_n + h/2 \cdot \mathbf{k}_2) $$
    $$ \mathbf{k}_4 = \mathbf{f}(t_n + h, \mathbf{y}_n + h \cdot \mathbf{k}_3) $$

## Worked example
**Problem:** Solve the simple harmonic oscillator equation $\ddot{x} = -x$ with initial conditions $x(0)=1$, $\dot{x}(0)=0$. Perform one step of RK4 with step size $h=0.1$.

**Step 1: Convert to a first-order system.**
Let $y_1 = x$ and $y_2 = \dot{x}$.
Then $\dot{y}_1 = \dot{x} = y_2$.
And $\dot{y}_2 = \ddot{x} = -x = -y_1$.
Our system is:
$$ \frac{d}{dt} \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} = \begin{pmatrix} y_2 \\ -y_1 \end{pmatrix} $$
So, our state vector is $\mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \end{pmatrix}$ and our function is $\mathbf{f}(t, \mathbf{y}) = \begin{pmatrix} y_2 \\ -y_1 \end{pmatrix}$.
The initial condition is $\mathbf{y}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ at $t_0 = 0$.

**Step 2: Calculate the four RK4 vectors, $\mathbf{k}_i$.**
Here $h=0.1$.

-   **Calculate $\mathbf{k}_1$:**
    $$ \mathbf{k}_1 = \mathbf{f}(t_0, \mathbf{y}_0) = \mathbf{f}\left(0, \begin{pmatrix} 1 \\ 0 \end{pmatrix}\right) = \begin{pmatrix} 0 \\ -1 \end{pmatrix} $$

-   **Calculate $\mathbf{k}_2$:**
    First, find the intermediate state: $\mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \frac{0.1}{2}\begin{pmatrix} 0 \\ -1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ -0.05 \end{pmatrix} = \begin{pmatrix} 1 \\ -0.05 \end{pmatrix}$.
    $$ \mathbf{k}_2 = \mathbf{f}(t_0 + h/2, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_1) = \mathbf{f}\left(0.05, \begin{pmatrix} 1 \\ -0.05 \end{pmatrix}\right) = \begin{pmatrix} -0.05 \\ -1 \end{pmatrix} $$

-   **Calculate $\mathbf{k}_3$:**
    First, find the next intermediate state: $\mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \frac{0.1}{2}\begin{pmatrix} -0.05 \\ -1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \begin{pmatrix} -0.0025 \\ -0.05 \end{pmatrix} = \begin{pmatrix} 0.9975 \\ -0.05 \end{pmatrix}$.
    $$ \mathbf{k}_3 = \mathbf{f}(t_0 + h/2, \mathbf{y}_0 + \frac{h}{2}\mathbf{k}_2) = \mathbf{f}\left(0.05, \begin{pmatrix} 0.9975 \\ -0.05 \end{pmatrix}\right) = \begin{pmatrix} -0.05 \\ -0.9975 \end{pmatrix} $$

-   **Calculate $\mathbf{k}_4$:**
    First, find the final intermediate state: $\mathbf{y}_0 + h\mathbf{k}_3 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + 0.1\begin{pmatrix} -0.05 \\ -0.9975 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \begin{pmatrix} -0.005 \\ -0.09975 \end{pmatrix} = \begin{pmatrix} 0.995 \\ -0.09975 \end{pmatrix}$.
    $$ \mathbf{k}_4 = \mathbf{f}(t_0 + h, \mathbf{y}_0 + h\mathbf{k}_3) = \mathbf{f}\left(0.1, \begin{pmatrix} 0.995 \\ -0.09975 \end{pmatrix}\right) = \begin{pmatrix} -0.09975 \\ -0.995 \end{pmatrix} $$

**Step 3: Combine the vectors to find $\mathbf{y}_1$.**
$$ \mathbf{y}_1 = \mathbf{y}_0 + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
$$ \mathbf{y}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \frac{0.1}{6} \left( \begin{pmatrix} 0 \\ -1 \end{pmatrix} + 2\begin{pmatrix} -0.05 \\ -1 \end{pmatrix} + 2\begin{pmatrix} -0.05 \\ -0.9975 \end{pmatrix} + \begin{pmatrix} -0.09975 \\ -0.995 \end{pmatrix} \right) $$
$$ \mathbf{y}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \frac{0.1}{6} \left( \begin{pmatrix} 0 - 0.1 - 0.1 - 0.09975 \\ -1 - 2 - 1.995 - 0.995 \end{pmatrix} \right) $$
$$ \mathbf{y}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \frac{0.1}{6} \begin{pmatrix} -0.29975 \\ -5.99 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \begin{pmatrix} -0.0049958 \\ -0.0998333 \end{pmatrix} $$
$$ \mathbf{y}_1 = \begin{pmatrix} 0.9950042 \\ -0.0998333 \end{pmatrix} $$

**Reflection:**
The exact solution is $x(t) = \cos(t)$ and $\dot{x}(t) = -\sin(t)$. At $t=0.1$, the exact values are $x(0.1) = \cos(0.1) \approx 0.99500416$ and $\dot{x}(0.1) = -\sin(0.1) \approx -0.09983341$. Our RK4 approximation is extremely accurate after just one step. Each step correctly calculated a slope vector ($\mathbf{k}_i$), used it to find a new tentative point in the $(y_1, y_2)$ phase space, and then combined these probes to make a highly accurate final jump from $\mathbf{y}_0$ to $\mathbf{y}_1$.

## Diagrams
This ASCII diagram shows a single RK4 step in the 2D phase space $(y_1, y_2)$ for our harmonic oscillator example.

```text
      y2 (velocity)
      ^
      |
      |
      | . . . . . . . . . . . . . . . . . . . . . . . . . . y_0
      |                                                 /
      |                                                / k1
      |                                               v
      | . . . . . . . . . . . . . y_0 + (h/2)k_1 <---'
      |                             \
      |                              \ k2
      |                               v
      | . . . . y_0 + (h/2)k_2 <-----'
      |             \
      |              \ k3
      |               v
      |                y_1 (Final Point)
      +------------------------------------------------------------> y1 (position)
```
The diagram illustrates the process: starting at $\mathbf{y}_0$, we probe the direction of flow ($\mathbf{k}_1$), use that to look ahead to a midpoint, probe again ($\mathbf{k}_2$), and so on. The final step to $\mathbf{y}_1$ is a weighted average of these probe vectors, resulting in a path that "cuts the corner" more accurately than a simple Euler step would.

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the scalar RK4 formulas. Now, imagine you are upgrading your math software. You select all the variables ($y, k_1, k_2, ...$) and the function name ($f$) and hit **Ctrl+B** to make them bold. **That's it.** The algorithm for systems is just the bolded version of the scalar algorithm.

2.  **Must-Overlearn Formulas:**
    $$ \mathbf{y}_{n+1} = \mathbf{y}_n + \frac{h}{6}(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4) $$
    $$ \mathbf{k}_1 = \mathbf{f}(t_n, \mathbf{y}_n) $$
    $$ \mathbf{k}_2 = \mathbf{f}(t_n + \frac{h}{2}, \mathbf{y}_n + \frac{h}{2}\mathbf{k}_1) $$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the worked example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the formulas, you can rebuild them. Start with the idea of a weighted average of slopes, like in Simpson's rule for integration. Taylor expand the solution $y(t+h)$ and the RK4 formula, and match terms to derive the coefficients. For the system version, simply assert that this process must hold for each component of the vector independently. The logic doesn't change just because you have more than one variable; it just applies in parallel to each component.

## Common mistakes
1.  **Component Contamination:** When calculating $\mathbf{k}_2 = \mathbf{f}(t, \mathbf{y}_n + \frac{h}{2}\mathbf{k}_1)$, students sometimes use the first component of the updated position to calculate the second component of $\mathbf{k}_2$. This is wrong. You must calculate the *entire* intermediate state vector $\mathbf{y}_n + \frac{h}{2}\mathbf{k}_1$ first, then pass that *entire* vector into $\mathbf{f}$ to get the *entire* $\mathbf{k}_2$ vector. The k-vectors are calculated sequentially and atomically.
2.  **Incorrect System Formulation:** A common error is incorrectly converting a higher-order ODE into a system. For an N-th order equation, you need N state variables, usually $y_1=x, y_2=\dot{x}, ..., y_N = x^{(N-1)}$. A mistake here invalidates the entire subsequent calculation.
3.  **Mixing Scalar and Vector Operations:** Forgetting that a term like $\frac{h}{2}\mathbf{k}_1$ is a vector, and trying to add it to only one component of $\mathbf{y}_n$. All additions must be vector additions.

## Self-check
1.  Convert the damped, forced oscillator equation $m\ddot{x} + c\dot{x} + kx = F_0\cos(\omega t)$ into a system of first-order ODEs in the form $\dot{\mathbf{y}} = \mathbf{f}(t, \mathbf{y})$. Identify $\mathbf{y}$ and $\mathbf{f}$.
2.  Consider the two-body problem in 2D, described by the system:
    $\ddot{x} = -GM \frac{x}{(x^2+y^2)^{3/2}}$
    $\ddot{y} = -GM \frac{y}{(x^2+y^2)^{3/2}}$
    Define the 4-component state vector $\mathbf{y}$. Write out the explicit formula for the vector function $\mathbf{f}(t, \mathbf{y})$.
3.  For the system in question 2, assume you have calculated $\mathbf{y}_n$ and $\mathbf{k}_1$. Write out, in full component form, the expressions for the four components of the vector $\mathbf{k}_2$. Do not substitute any numbers; provide the algebraic expressions.