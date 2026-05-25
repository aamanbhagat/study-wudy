## What it is
Powered descent guidance via the G-FOLD (Guidance for Fuel-Optimal Large Divergences) algorithm is a method for calculating fuel-optimal, hazard-avoiding landing trajectories in real-time. It mathematically transforms the highly non-linear, non-convex physics of landing a rocket into a convex optimization problem—specifically a Second-Order Cone Program (SOCP)—which guarantees finding the absolute optimal flight path in a strictly deterministic timeframe.

## Why it matters
Traditional Apollo-era guidance relied on analytical polynomials that wasted fuel and could not handle large lateral diverts to avoid sudden hazards (like craters). G-FOLD allows autonomous spacecraft to calculate entirely new, fuel-optimal paths on the fly. It is the algorithmic gold standard for modern autonomous pinpoint landing, driving technologies from Mars rovers (Curiosity, Perseverance) to reusable terrestrial launch vehicles (SpaceX Falcon 9). It bridges theoretical optimal control and real-time embedded flight software.

## When to study it
You must already possess a rigorous understanding of:
1. **Newtonian Mechanics & Kinematics:** Specifically 3D variable-mass systems.
2. **State-Space Control Theory:** Continuous and discrete-time linear systems.
3. **Convex Optimization:** You must know what makes a set convex and what a Second-Order Cone Program (SOCP) is. 

If you do not know the standard form of an SOCP, stop and read Chapter 4 of Boyd & Vandenberghe's *Convex Optimization*. Do not attempt G-FOLD without this foundation.

## How to study it (step by step)
1. Write down the 3D continuous-time equations of motion for a rocket in a uniform gravity field with mass depletion.
2. Formulate the constraints: glide slope (terrain avoidance), maximum/minimum thrust (engine limits), and boundary conditions (start and end states).
3. Identify the non-convexities: the thrust lower bound ($||\vec{T}|| \ge T_{min}$) and the mass divisor in the acceleration equation ($\vec{T}/m$).
4. Apply the change of variables $z = \ln(m)$ to linearize the mass dynamics.
5. Apply "Lossless Convexification" (LCx) to the thrust constraint by introducing a slack variable $\Gamma$.
6. Discretize the continuous-time equations using a Zero-Order Hold (ZOH) to form a finite-dimensional SOCP.
7. Code the resulting SOCP in Python using `CVXPY` to simulate a 2D landing trajectory from an arbitrary initial state to the origin.

## Key ideas, with intuition

**1. The Problem with Minimum Thrust**
Rocket engines cannot usually throttle to zero; they suffer from combustion instability. A constraint like $T_{min} \le ||\vec{T}|| \le T_{max}$ defines a hollow sphere of allowable thrust vectors. A hollow sphere is a **non-convex set** (a line connecting two valid points on opposite sides of the shell passes through the invalid empty middle). Convex solvers cannot process this.

**2. Lossless Convexification (LCx)**
We introduce a slack variable $\Gamma$ representing the *commanded* thrust magnitude, and relax the constraint to:
$$||\vec{T}|| \le \Gamma$$
$$T_{min} \le \Gamma \le T_{max}$$
This turns the hollow sphere into a solid cone (a Second-Order Cone). It is "lossless" because the optimizer's objective is to minimize fuel usage, which means minimizing $\Gamma$. The solver will naturally push $\Gamma$ down until it exactly equals the physical thrust $||\vec{T}||$, satisfying the original non-convex constraint without forcing the solver to navigate a non-convex space.

**3. Logarithmic Mass Variable**
Acceleration is $\vec{a} = \vec{g} + \frac{\vec{T}}{m}$. Dividing a control variable ($\vec{T}$) by a state variable ($m$) is highly non-linear. By substituting $z = \ln(m)$, we can manipulate the mass derivative $\dot{m} = -\alpha ||\vec{T}||$ (where $\alpha = \frac{1}{I_{sp} g_0}$) into a form that can be bounded by linear and convex constraints, making the entire dynamics matrix compatible with an SOCP solver.

## Worked example
**Claim:** Relaxing $||\vec{T}|| = \Gamma$ to $||\vec{T}|| \le \Gamma$ yields the exact same optimal solution for a fuel-minimization problem. Let's prove why this LCx step works.

**Step 1: Define the cost function.** 
We want to maximize final mass, which is equivalent to minimizing the integral of commanded thrust magnitude over time: 
$$J = \int_0^{t_f} \Gamma(t) dt$$

**Step 2: Assume a sub-optimal boundary.** 
Suppose the convex solver finds an "optimal" solution where, at some time $t_k$, the thrust is strictly inside the cone: $||\vec{T}(t_k)|| < \Gamma(t_k)$. 

**Step 3: Construct a strictly better solution.** 
Because $||\vec{T}(t_k)|| < \Gamma(t_k)$, we can create a *new* solution by simply lowering $\Gamma(t_k)$ until $\Gamma(t_k) = ||\vec{T}(t_k)||$. 

**Step 4: Evaluate the new solution.** 
This new solution strictly decreases the cost function $J$ (since we are integrating a smaller $\Gamma$) without violating the constraint $||\vec{T}|| \le \Gamma$ or altering the physical acceleration $\vec{T}/m$.

**Step 5: Conclude by contradiction.** 
Since we found a solution with a lower cost, the solution from Step 2 could not have been optimal. Therefore, the true optimal solution found by the solver *must* lie exactly on the boundary where $||\vec{T}|| = \Gamma$. The relaxation is lossless.

## Diagrams

```text
NON-CONVEX THRUST REGION          CONVEXIFIED REGION (SOCP)
(Hollow Cylinder/Sphere)          (Solid Cone via Slack Variable Γ)

       ||T||                             Γ (Commanded Thrust)
         ^                               ^
         |                               |
  T_max _|_ _______               T_max _|_ _______
        |  |       |                    |  \       /
        |  | EMPTY |                    |   \     / 
  T_min _|_|_______|              T_min _|_  \___/  <-- Solver pushes 
        | /         \                   |    |   |      Γ down to here
        |/___________> T_x              |____|___|____> ||T||
                                             
If T_min > 0, the space of          By adding Γ, we create a solid cone.
valid T vectors is a hollow         The constraint ||T|| <= Γ is a standard
shell. You cannot interpolate       Second-Order Cone constraint.
between two valid thrusts.
```

## Memory technique — remember this forever
1. **The Hook:** "You can't optimize a hollow donut; fill it to make an ice cream cone." (The donut is the min-thrust constraint; the cone is the SOCP relaxation).
2. **The Must-Know Formulas:**
   * Slack relaxation: $||\vec{T}|| \le \Gamma$
   * Mass transformation: $z = \ln(m)$
   * Mass depletion: $\dot{m} = -\alpha \Gamma$
3. **Spaced-repetition schedule:** Review the LCx proof and the $z=\ln(m)$ substitution at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the setup, start with $\vec{F}=m\vec{a}$ and $\dot{m} = -\frac{||\vec{T}||}{I_{sp} g_0}$. Ask yourself: "Where does this violate $f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$?" You will immediately spot the $T/m$ division and the $T_{min}$ bound.

## Common mistakes
1. **Applying LCx to time-optimal problems:** Lossless convexification *only* works if the objective function penalizes the slack variable (e.g., fuel-optimal). If you minimize time without penalizing fuel, the solver will exploit the slack space, resulting in a mathematical solution where $\Gamma > ||\vec{T}||$ (which is physically impossible to fly).
2. **Ignoring aerodynamic drag:** G-FOLD assumes drag is negligible (valid for Martian atmosphere or final lunar/vacuum descent). Drag depends on velocity squared, which introduces severe non-convexities that standard G-FOLD cannot handle without successive linearization.
3. **Discretization blindness:** Assuming the continuous-time proof of LCx holds perfectly in discrete time. Zero-Order Hold introduces minor discretization errors that can cause slight constraint violations between time steps.

## Self-check
1. Why does the substitution $z = \ln(m)$ specifically help handle the $\vec{T}/m$ term in the equations of motion? Show the algebraic result.
2. If a future rocket engine can throttle smoothly from 0% to 100%, do we still need Lossless Convexification for the thrust constraint? Why or why not?
3. Formulate the glide-slope constraint (the rocket must stay within a cone of angle $\gamma$ from the vertical $z$-axis to avoid terrain) strictly as a Second-Order Cone constraint.