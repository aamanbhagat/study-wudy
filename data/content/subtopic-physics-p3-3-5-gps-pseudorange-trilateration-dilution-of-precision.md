## What it is
GPS positioning combines three key ideas. **Trilateration** is the geometric method of determining a position by measuring distances from multiple known points (satellites). The measured distance, called **pseudorange**, is calculated from signal travel time but is contaminated by an unknown clock error in the receiver. **Dilution of Precision (DOP)** is a unitless number that quantifies how the geometric arrangement of the satellites magnifies this measurement error into a final position error.

## Why it matters
This is the foundation of all modern navigation. In aerospace, it enables Required Navigation Performance (RNP) for aircraft, autonomous rendezvous and docking for spacecraft, and formation flying of satellite constellations. In machine learning, GPS data is the "ground truth" for training sensor fusion algorithms (like Kalman filters combining GPS and IMU data) that are critical for any autonomous vehicle, from a drone to a self-driving car.

## When to study it
You should have a firm grasp of the following before proceeding:
*   **Linear Algebra:** Solving systems of linear equations ($A\mathbf{x} = \mathbf{b}$), vector norms, matrix operations (transpose, inverse).
*   **Multivariable Calculus:** Partial derivatives and the first-order Taylor series expansion (linearization) of a multivariable function.
*   **Basic Physics:** The relationship between distance, speed, and time ($d=vt$), specifically with the speed of light, $c$.
*   **Basic Statistics:** The concepts of variance and covariance.

If you are not comfortable linearizing a function like $f(x,y) = \sqrt{x^2+y^2}$ around a point $(x_0, y_0)$, review that first.

## How to study it (step by step)
1.  **Derive the 2D range equations.** Start with a user at an unknown position $(x_u, y_u)$ and two satellites at known positions $(x_1, y_1)$ and $(x_2, y_2)$. Write the two equations for the circles centered on the satellites: $r_1^2 = (x_1-x_u)^2 + (y_1-y_u)^2$ and $r_2^2 = (x_2-x_u)^2 + (y_2-y_u)^2$. See that they intersect at two points, creating an ambiguity.
2.  **Add a third satellite.** Introduce a third satellite and a third equation. Show algebraically how this resolves the ambiguity and yields a unique solution for $(x_u, y_u)$. This is trilateration.
3.  **Introduce the clock bias.** Now, replace the true range $r_i$ with the pseudorange $\rho_i$. The core equation is that the measured signal travel time includes the receiver's clock error $\Delta t_u$. Thus, $\rho_i = c \cdot (\Delta t_{travel, i} + \Delta t_u) = r_i + c \cdot \Delta t_u$. Let the clock bias be $b_u = c \cdot \Delta t_u$. The equation becomes $\rho_i = \sqrt{(x_i - x_u)^2 + ...} + b_u$. Notice you now have four unknowns in 3D: $(x_u, y_u, z_u, b_u)$. This is why you need a fourth satellite.
4.  **Linearize the system.** The pseudorange equations are non-linear. The key step is to linearize them around an initial guess of the user's state, $\mathbf{x}_0 = [x_0, y_0, z_0, b_0]^T$. The result is a linear system of the form $\Delta \boldsymbol{\rho} = H \Delta \mathbf{x}$, where $\Delta \mathbf{x}$ is the correction to your initial guess.
5.  **Derive DOP from the linearized system.** The least-squares solution to the linear system is $\Delta \mathbf{x} = (H^T H)^{-1} H^T \Delta \boldsymbol{\rho}$. The error covariance of the state is proportional to the geometry matrix $G = (H^T H)^{-1}$. The square roots of the diagonal elements of $G$ are the DOP values. For example, $GDOP = \sqrt{G_{11} + G_{22} + G_{33} + G_{44}}$.

## Key ideas, with intuition
1.  **The Fourth Satellite is for Time.** You need three perfect distance measurements to find a unique 3D position. However, your receiver's clock is cheap and has an unknown time offset relative to the hyper-accurate atomic clocks on the satellites. This clock bias, $b_u$, acts as a fourth unknown. A fourth satellite provides the necessary fourth measurement to solve for all four unknowns: $(x_u, y_u, z_u, b_u)$. You are solving for your position in 4D spacetime.

2.  **Pseudorange = True Range + Clock Error.** The satellite sends a timestamped signal. Your receiver notes when it arrived. The travel time multiplied by $c$ gives a range. But since your receiver's clock is wrong, this "pseudorange" isn't the true geometric range.
    $$ \rho_i = \underbrace{\sqrt{(x_{s,i} - x_u)^2 + (y_{s,i} - y_u)^2 + (z_{s,i} - z_u)^2}}_{\text{True Geometric Range, } r_i} + \underbrace{b_u}_{\text{User Clock Bias}} $$
    The genius of GPS is that you don't need an atomic clock in your pocket. You use an extra satellite measurement to solve for your clock's error on the fly.

3.  **DOP is Error Amplification from Geometry.** Imagine two satellites are very close together in the sky. The circles of possible positions defined by their ranges will be nearly tangent. A tiny error in either range measurement will cause the intersection point to shift by a large amount. This is high DOP. Now imagine the satellites are far apart. The circles intersect at a steep angle. The same tiny error in range results in a much smaller shift in the intersection point. This is low DOP.
    $$ \text{Position Error} \approx \text{DOP} \times \text{User Range Error} $$
    DOP is determined entirely by the geometry matrix $H$, which contains the line-of-sight unit vectors from you to the satellites. A "good" $H$ leads to a small $(H^T H)^{-1}$ matrix and thus low DOP.

## Worked example
Let's solve a simplified 2D problem using linearization.
**Problem:** A user is at an unknown 2D position $(x_u, y_u)$. Two satellites are at $S_1 = (10, 0)$ and $S_2 = (0, 10)$. The measured pseudoranges are $\rho_1 = 10$ and $\rho_2 = 10$. We know *a priori* that the user clock bias is $b_u = 2$. Find the user's position.

**1. Set up the non-linear equations.**
The user state has two unknowns, $\mathbf{x} = [x_u, y_u]^T$.
The equations are:
$\rho_1 = \sqrt{(10 - x_u)^2 + (0 - y_u)^2} + b_u \implies 10 = \sqrt{(10 - x_u)^2 + y_u^2} + 2$
$\rho_2 = \sqrt{(0 - x_u)^2 + (10 - y_u)^2} + b_u \implies 10 = \sqrt{x_u^2 + (10 - y_u)^2} + 2$

This simplifies to:
$8 = \sqrt{(10 - x_u)^2 + y_u^2}$
$8 = \sqrt{x_u^2 + (10 - y_u)^2}$

**2. Make an initial guess.**
Let's guess the user is at the origin: $\mathbf{x}_0 = [0, 0]^T$.

**3. Calculate the expected pseudoranges at the guess.**
At $\mathbf{x}_0 = [0, 0]^T$:
$\hat{\rho}_1 = \sqrt{(10-0)^2 + 0^2} + 2 = 12$
$\hat{\rho}_2 = \sqrt{0^2 + (10-0)^2} + 2 = 12$

**4. Compute the measurement residual, $\Delta\boldsymbol{\rho}$.**
This is the difference between what we actually measured and what our guess predicted.
$\Delta\boldsymbol{\rho} = \begin{bmatrix} \rho_1 - \hat{\rho}_1 \\ \rho_2 - \hat{\rho}_2 \end{bmatrix} = \begin{bmatrix} 10 - 12 \\ 10 - 12 \end{bmatrix} = \begin{bmatrix} -2 \\ -2 \end{bmatrix}$

**5. Compute the geometry matrix, $H$.**
$H$ is the matrix of partial derivatives of the pseudorange functions with respect to the state variables, evaluated at the guess $\mathbf{x}_0$. The generic form for a single satellite $i$ is $H_i = [-\frac{x_{s,i}-x_u}{r_i}, -\frac{y_{s,i}-y_u}{r_i}]$.
For $S_1$ at $(0,0)$: $r_1 = 10$. $H_1 = [-\frac{10-0}{10}, -\frac{0-0}{10}] = [-1, 0]$.
For $S_2$ at $(0,0)$: $r_2 = 10$. $H_2 = [-\frac{0-0}{10}, -\frac{10-0}{10}] = [0, -1]$.
So, $H = \begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}$.

**6. Solve the linear system $\Delta\boldsymbol{\rho} = H \Delta\mathbf{x}$.**
$\begin{bmatrix} -2 \\ -2 \end{bmatrix} = \begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix} \begin{bmatrix} \Delta x \\ \Delta y \end{bmatrix}$
The solution is clearly $\Delta x = 2$ and $\Delta y = 2$. So $\Delta\mathbf{x} = [2, 2]^T$.

**7. Update the position estimate.**
$\mathbf{x}_1 = \mathbf{x}_0 + \Delta\mathbf{x} = [0, 0]^T + [2, 2]^T = [2, 2]^T$.

**Reflection:** Our first guess was $(0,0)$. After one iteration, our new estimate is $(2,2)$. The true answer is actually $(2,2)$ since $8^2 = (10-2)^2 + 2^2 = 64$ and $8^2 = 2^2 + (10-2)^2 = 64$. In this case, because our initial guess was symmetric and the problem was linear enough, we converged in one step. Typically, this process would be repeated until $\Delta\mathbf{x}$ is very small.

## Diagrams
A 2D visualization of trilateration:

```text
       S2(x2,y2)
         +
        /|\
       / | \
      /  |  \ r2
     /   |   \
    /    |    \
   +-----------+ P(x,y)  <-- Point of intersection
 S1(x1,y1)   r1 \  /
               \ /
                + S3(x3,y3)

Three satellites (S1, S2, S3) provide distance measurements (r1, r2, r3) which define circles. The intersection of these three circles gives the unique user position P.
```

A comparison of good vs. bad satellite geometry for DOP:

```text
     GOOD GEOMETRY (LOW DOP)            BAD GEOMETRY (HIGH DOP)

          S2                                S1--S2
          +                                  +--+
         / \                                /    \
        /   \                              /      \
       /     \                            /        \
      /       \                          /          \
 S1--+----o----+--S3                S3--+------------+--S4
      \       /                          \          /
       \     /                            \        /
        \   /                              \      /
         \ /                                \    /
          +                                  o
          S4

'o' represents the uncertainty region.
Left: Satellites are well-spaced. Range uncertainties create a small, compact position uncertainty.
Right: Satellites are clustered. The same range uncertainties create a large, elongated position uncertainty.
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of being lost in the mountains. You ask three people on three different peaks (the satellites) how far away you are. Their answers define three circles on your map, and you are at the intersection. But your watch is wrong (clock bias), so all their distance estimates are off by a fixed amount. You find a fourth person on a fourth peak and their answer allows you to figure out both how wrong your watch is *and* your true location. **Geometry determines the quality of your fix.**
2.  **Must-Overlearn Formulas:**
    *   Pseudorange definition: $\rho_i = r_i + b_u = \sqrt{(x_{s,i} - x_u)^2 + ...} + b_u$
    *   Linearized model: $\Delta\boldsymbol{\rho} = H \Delta\mathbf{x}$
    *   Geometry matrix for position + time: $G = (H^T H)^{-1}$
3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Spend 10 minutes rebuilding the key ideas from scratch each time.
4.  **First Principles Pathway:** If you forget, start here:
    *   Distance = speed × time.
    *   My measured time is wrong: $t_{measured} = t_{true} + t_{error}$.
    *   So my measured range (pseudorange) is wrong: $\rho = c \cdot t_{measured} = c \cdot t_{true} + c \cdot t_{error} = r_{true} + b_{user}$.
    *   This gives a system of non-linear equations, one for each satellite.
    *   To solve non-linear equations, I need to linearize them around a guess and iterate. The matrix in that linearization ($H$) describes the geometry. The inverse of $H^T H$ tells me how errors propagate.

## Common mistakes
1.  **Confusing Trilateration (Distances) with Triangulation (Angles):** GPS uses time-of-flight to get distances. It does not measure angles between satellites.
2.  **Forgetting the "+1" Satellite Rule:** Thinking you only need 3 satellites for a 3D position. You need 4. In general, for an $N$-dimensional position problem with an unknown clock bias, you need $N+1$ measurements.
3.  **Misinterpreting DOP as the Error:** DOP is a unitless *multiplier*. A low DOP of 1.5 is excellent, but if your measurement error (due to atmosphere, etc.) is 30 meters, your position error will still be ~45 meters. A high DOP of 10 is poor, but if your measurements are perfect, your position will be too. Error = DOP × Measurement Noise.
4.  **Ignoring the Iterative Solution:** Believing there is a simple closed-form algebraic solution. Receivers must make an initial guess (e.g., last known position, or center of the Earth) and iterate multiple times per second to refine the solution.

## Self-check
1.  A GPS-like system is designed for a 1D environment (e.g., a train on a track). The train's position is the single variable $x$. The train's clock has an unknown bias. How many transmitters (satellites) are required at a minimum to determine the train's position?
2.  You are designing a satellite navigation system for Mars rovers. You can place 4 satellites in any orbit you choose. To minimize the average PDOP for a rover operating near the Martian equator, should you place the satellites in polar orbits (passing over the poles) or in equatorial orbits (circling above the equator)? Justify your choice based on satellite geometry.
3.  Given the linearized system $\Delta\boldsymbol{\rho} = H \Delta\mathbf{x}$, where $\mathbf{x} = [x, y, z, b_u]^T$, and the error covariance of the measurements $\Delta\boldsymbol{\rho}$ is $\sigma_u^2 I$ (where $I$ is the identity matrix), derive an expression for the variance of the vertical position error (the error in $z$). Your answer should be in terms of $\sigma_u$ and the elements of the matrix $G = (H^T H)^{-1}$.