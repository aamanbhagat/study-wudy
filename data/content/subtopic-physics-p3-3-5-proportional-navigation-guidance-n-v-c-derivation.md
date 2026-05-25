## What it is
Proportional Navigation (ProNav) is a geometric guidance law used to intercept moving targets. It commands an interceptor to apply lateral acceleration proportional to the closing velocity and the rate of rotation of the line-of-sight (LOS) between the interceptor and the target. By actively driving the LOS rotation rate to zero, the interceptor establishes a collision course.

## Why it matters
ProNav is the undisputed king of terminal guidance. It is the mathematical engine inside the AIM-9 Sidewinder, the Patriot missile, and orbital rendezvous docking algorithms. In modern reinforcement learning, when AI agents are tasked with intercepting a moving target in a physics simulation, they almost always converge on ProNav from scratch because it is the mathematically optimal solution for minimizing control effort while guaranteeing an intercept.

## When to study it
You must have a rock-solid grasp of:
1. **2D Kinematics:** Specifically, polar coordinates and rotating reference frames.
2. **Vector Calculus:** Differentiating vectors in rotating frames (e.g., knowing why $\vec{v} = \dot{r}\hat{e}_r + r\dot{\theta}\hat{e}_\theta$).
3. **Small-Angle Approximations:** $\sin(\theta) \approx \theta$ and $\cos(\theta) \approx 1$.
If you cannot derive the velocity and acceleration of a particle in polar coordinates from first principles, stop and review that first. You will be lost here otherwise.

## How to study it (step by step)
1. **Draw the geometry:** Sketch the interceptor, target, the LOS vector connecting them, and an inertial reference line. Label the LOS angle $\lambda$.
2. **Define the kinematics:** Write the equations for the relative velocity between the target and interceptor, broken into components parallel to the LOS (closing velocity, $V_c$) and perpendicular to the LOS ($R\dot{\lambda}$).
3. **Internalize CBDR:** Understand the naval concept of "Constant Bearing, Decreasing Range." If $\dot{\lambda} = 0$ and $V_c > 0$, a collision is mathematically guaranteed.
4. **Differentiate the cross-LOS velocity:** Take the time derivative of $R\dot{\lambda}$ to expose the acceleration terms.
5. **Substitute the guidance law:** Inject the ProNav command $a_c = N V_c \dot{\lambda}$ into your differentiated equation.
6. **Analyze the differential equation:** Solve for the behavior of $\dot{\lambda}$ to prove that the commanded acceleration actually forces $\dot{\lambda} \to 0$.

## Key ideas, with intuition
**1. The Line of Sight (LOS) Frame**
Forget the ground. The only thing that matters is the imaginary string connecting the missile ($M$) and the target ($T$). The length of this string is the range $R$. The angle this string makes with a fixed inertial axis is $\lambda$. 

**2. Closing Velocity ($V_c$)**
This is the rate at which the distance between the two bodies is shrinking. 
$$ V_c = -\dot{R} $$
If $V_c$ is negative, the target is outrunning you.

**3. The ProNav Law**
To hit the target, we do not aim *at* the target (which results in a highly inefficient curved "pure pursuit" tail-chase). Instead, we command an acceleration perpendicular to the LOS (True ProNav) or perpendicular to the missile's velocity (Pure ProNav). The law is:
$$ a_c = N \cdot V_c \cdot \dot{\lambda} $$
Where $N$ is the dimensionless "Navigation Constant" (usually between 3 and 5). 
*   **Intuition:** If the target moves up in your windshield ($\dot{\lambda} > 0$), you pull up hard. You pull harder if you are closing fast ($V_c$) or if your gain ($N$) is high.

## Worked example
**Deriving why ProNav works (Linearized True ProNav)**

Let's prove that applying $a_c = N V_c \dot{\lambda}$ actually forces a collision. We assume a 2D engagement where the interceptor and target are roughly on a collision course, meaning angles relative to the LOS are small.

**Step 1: The cross-LOS velocity.**
The relative velocity perpendicular to the LOS is the range $R$ times the LOS rate $\dot{\lambda}$. This is driven by the perpendicular velocity components of the Target and Missile.
$$ R\dot{\lambda} = v_{T\perp} - v_{M\perp} $$

**Step 2: Differentiate with respect to time.**
Use the product rule on the left side:
$$ \dot{R}\dot{\lambda} + R\ddot{\lambda} = a_{T\perp} - a_{M\perp} $$

**Step 3: Substitute knowns.**
We know $\dot{R} = -V_c$. 
Let the target's lateral acceleration be $a_T = a_{T\perp}$.
Let the missile's commanded lateral acceleration be $a_c = a_{M\perp}$.
$$ -V_c\dot{\lambda} + R\ddot{\lambda} = a_T - a_c $$

**Step 4: Inject the ProNav law.**
Substitute $a_c = N V_c \dot{\lambda}$:
$$ -V_c\dot{\lambda} + R\ddot{\lambda} = a_T - N V_c \dot{\lambda} $$

**Step 5: Rearrange into a standard ODE.**
Move all $\dot{\lambda}$ terms to the left side:
$$ R\ddot{\lambda} + (N - 1)V_c\dot{\lambda} = a_T $$

*Reflection:* Look closely at this differential equation. It is a first-order ODE for $\dot{\lambda}$ (since $\ddot{\lambda}$ is the derivative of $\dot{\lambda}$). If the target is not maneuvering ($a_T = 0$), the equation is $R\ddot{\lambda} + (N-1)V_c\dot{\lambda} = 0$. 
Because $R$ and $V_c$ are positive, as long as $N > 1$, the coefficient $(N-1)V_c$ is positive. This means the homogeneous solution for $\dot{\lambda}$ decays exponentially to zero! By driving $\dot{\lambda} \to 0$, the missile establishes a perfect collision course. (In practice, $N \ge 3$ is used to ensure the acceleration commands don't spike at the very end of the intercept when $R \to 0$).

## Diagrams

```text
       Inertial Reference
               ^
               |               Target (T)
               |              /
               |             /  V_T
               |            /
               |           / \ gamma_T
               |          /   - - - - - -
               |         /
               |        /
               |       /  R (Range)
               |      /
               |     /
               |    / lambda (LOS angle)
               |   /
               |  / \ gamma_M
               | /   - - - - - -
  Missile (M)  |/  V_M
               +------------------------>
```
*   $\lambda$: Line of sight angle.
*   $\gamma_M, \gamma_T$: Flight path angles of Missile and Target.
*   $V_M, V_T$: Velocity vectors.
*   To achieve intercept, the missile maneuvers to make $\dot{\lambda} = 0$.

## Memory technique — remember this forever
1. **The Mnemonic:** **N**o **V**elocity **L**eft. 
   When you intercept, there is **N**o **V**elocity **L**eft. 
   **N** $\cdot$ **V**$_c$ $\cdot$ $\dot{\lambda}$ (Lambda -> L).
2. **Formulas to overlearn:**
   *   $a_c = N V_c \dot{\lambda}$
   *   $V_c = -\dot{R}$
   *   $R\ddot{\lambda} + (N-1)V_c\dot{\lambda} = a_T$
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days. Re-derive the ODE from scratch each time.
4. **First principles pathway:** If you forget the law, remember the goal: force the cross-LOS velocity ($R\dot{\lambda}$) to zero. Differentiate $R\dot{\lambda} = v_{T\perp} - v_{M\perp}$ to find the acceleration relationship.

## Common mistakes
1. **Confusing True vs. Pure ProNav:** True ProNav applies acceleration perpendicular to the *LOS*. Pure ProNav applies it perpendicular to the *Missile Velocity vector*. The formula $N V_c \dot{\lambda}$ is generally taught using True ProNav for mathematical elegance, but aerodynamic missiles use Pure ProNav because they generate lift perpendicular to their airflow.
2. **Ignoring the sign of $V_c$:** If a target is faster than the missile and flying away, $V_c$ is negative. The math breaks down because the missile will push $\dot{\lambda}$ the wrong way. ProNav only works if you are actually closing on the target.
3. **Assuming $N=1$ is enough:** Mathematically $N>1$ drives $\dot{\lambda}$ to zero, but if $N<2$, the commanded acceleration actually approaches infinity as $R \to 0$. You need $N \ge 3$ for finite acceleration at intercept.

## Self-check
1. If an interceptor and target are on a perfect, non-maneuvering collision course, what is the value of $a_c$?
2. Using the ODE $R\ddot{\lambda} + (N-1)V_c\dot{\lambda} = a_T$, explain mathematically why a navigation constant of $N=1$ is disastrous if the target executes a constant acceleration maneuver ($a_T = \text{constant}$).
3. In a real aerodynamic missile, acceleration is limited by the maximum G-force the airframe can pull. How does a sudden, high-G target maneuver just before impact affect the $\dot{\lambda}$ term, and why does this cause missiles to miss?