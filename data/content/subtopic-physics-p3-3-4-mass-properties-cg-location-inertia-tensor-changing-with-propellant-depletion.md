## What it is
A rocket's mass properties describe how its mass is distributed in space. The Center of Gravity (CG) is the average location of this mass, and the inertia tensor describes its resistance to rotation. These properties are not constant; they change continuously as the rocket consumes propellant, altering its flight dynamics.

## Why it matters
The location of the CG relative to the Center of Pressure (CP) determines a rocket's aerodynamic stability. As the CG shifts during flight, the control system (e.g., gimbaled engines, fins) must constantly adjust to maintain stability and steer the vehicle. Understanding this change is fundamental to designing guidance, navigation, and control (GNC) systems that prevent the rocket from tumbling out of control.

## When to study it
You must have a solid grasp of the following before proceeding:
*   **Statics:** Calculating the center of mass (or CG) for systems of point masses and for continuous bodies using integration.
*   **Rigid Body Dynamics:** Definition of the moment of inertia and the inertia tensor ($I$).
*   **Parallel Axis Theorem:** Calculating the moment of inertia of a body about an axis that is parallel to an axis through its center of mass.
*   **Basic Calculus:** Differentiation and integration.

If these concepts are not fresh, review them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Model the system simply.** Start by modeling a rocket as just two point masses: a constant dry mass ($m_d$) representing the structure and payload, and a time-varying propellant mass ($m_p(t)$).
2.  **Derive the CG location vs. time.** Place your two masses on an axis. Write the standard formula for the center of mass, but substitute $m_p(t) = m_{p,0} - \dot{m} t$, where $\dot{m}$ is the constant mass flow rate. Solve for the CG position as a function of time, $x_{cg}(t)$.
3.  **Analyze the result.** Plot or inspect the function $x_{cg}(t)$. Notice that the CG moves towards the heavier, non-changing components (typically the engine and payload) as the propellant is depleted.
4.  **Review the Parallel Axis Theorem.** Write it down: $I = I_{cm} + md^2$. Understand that to find the inertia of the whole rocket about its *combined* CG, you must apply this theorem to each component, where $d$ is the distance from that component's CG to the combined CG.
5.  **Derive the moment of inertia vs. time.** Using your two-point-mass model, calculate the total moment of inertia about the system's combined CG, $x_{cg}(t)$. The distances $d$ will now also be functions of time. Your final expression for $I(t)$ will depend on $m_p(t)$ and $x_{cg}(t)$.
6.  **Extend to continuous bodies.** Replace the point masses with simple shapes (e.g., model the propellant as a cylinder of decreasing height). Recalculate $x_{cg}(t)$ and $I(t)$ using integrals. The principles are identical, but the math is more involved.

## Key ideas, with intuition
1.  **The CG moves toward the nose.** Propellant tanks are typically large and located in the main body of the rocket. As this mass is expelled from the tail, the average mass location, or CG, shifts forward towards the remaining heavy components like the payload, avionics, and upper-stage engines.

2.  **The rocket becomes more responsive.** The moment of inertia measures resistance to angular acceleration ($\tau = I \alpha$). As the rocket burns fuel, its total mass $m$ decreases. More importantly, this mass is removed from the tanks, which are often far from the CG. Since inertia scales with mass and distance squared ($I \approx \sum m_i r_i^2$), burning propellant dramatically reduces $I$. A lower $I$ means a given control torque (from engine gimbaling) produces a larger angular acceleration $\alpha$, making the vehicle more "nimble" or agile.

3.  **The Parallel Axis Theorem is the key computational tool.** You cannot simply add the moments of inertia of the engine, tank, and payload about their own individual centers of mass. To find the total inertia of the rocket, you must translate each component's inertia to a common axis—the instantaneous combined CG of the entire vehicle—using the Parallel Axis Theorem.
    $$
    I_{total, about\_CG} = \sum_{i} (I_{cm,i} + m_i d_i^2)
    $$
    Here, $I_{cm,i}$ is the inertia of component $i$ about its own center of mass, and $d_i$ is the distance from the center of mass of component $i$ to the overall vehicle's center of gravity. Since the vehicle's CG is moving, the distances $d_i$ are functions of time.

## Worked example
Consider a simplified rocket modeled as two point masses on the x-axis. The origin is at the engine nozzle.
*   A dry mass $m_d = 1000$ kg (engine, structure, payload) with its CG at $x_d = 10$ m.
*   An initial propellant mass $m_{p,0} = 9000$ kg, treated as a point mass at $x_p = 5$ m.
*   The rocket burns propellant at a constant rate $\dot{m} = 100$ kg/s for a total burn time of $t_b = 90$ s.

Find the CG location and the moment of inertia about the y-axis through the CG ($I_{yy}$) at liftoff ($t=0$) and at burnout ($t=90$ s).

**Step 1: Define mass as a function of time.**
The propellant mass at time $t$ is:
$m_p(t) = m_{p,0} - \dot{m}t = 9000 - 100t$.
The total mass is:
$m_{tot}(t) = m_d + m_p(t) = 1000 + (9000 - 100t) = 10000 - 100t$.

**Step 2: Derive the CG location as a function of time.**
$$
x_{cg}(t) = \frac{m_d x_d + m_p(t) x_p}{m_{tot}(t)} = \frac{(1000)(10) + (9000 - 100t)(5)}{10000 - 100t}
$$
$$
x_{cg}(t) = \frac{10000 + 45000 - 500t}{10000 - 100t} = \frac{55000 - 500t}{10000 - 100t}
$$

**Step 3: Calculate CG at liftoff ($t=0$).**
$m_{tot}(0) = 10000$ kg.
$x_{cg}(0) = \frac{55000}{10000} = 5.5$ m.

**Step 4: Calculate CG at burnout ($t=90$ s).**
$m_p(90) = 9000 - 100(90) = 0$ kg.
$m_{tot}(90) = 1000$ kg.
$x_{cg}(90) = \frac{(1000)(10) + (0)(5)}{1000} = 10$ m.
*Reflection:* The CG moved from 5.5 m to 10 m, shifting towards the fixed dry mass as propellant was depleted. This makes sense.

**Step 5: Derive Moment of Inertia about the CG.**
Using the Parallel Axis Theorem for point masses ($I_{cm,i}=0$):
$I_{yy}(t) = I_d + I_p = m_d(x_d - x_{cg}(t))^2 + m_p(t)(x_p - x_{cg}(t))^2$.

**Step 6: Calculate $I_{yy}$ at liftoff ($t=0$).**
We know $x_{cg}(0) = 5.5$ m.
$d_d = x_d - x_{cg}(0) = 10 - 5.5 = 4.5$ m.
$d_p = x_p - x_{cg}(0) = 5 - 5.5 = -0.5$ m.
$I_{yy}(0) = (1000)(4.5)^2 + (9000)(-0.5)^2 = 1000(20.25) + 9000(0.25)$
$I_{yy}(0) = 20250 + 2250 = 22500 \text{ kg} \cdot \text{m}^2$.

**Step 7: Calculate $I_{yy}$ at burnout ($t=90$ s).**
We know $x_{cg}(90) = 10$ m and $m_p(90) = 0$ kg.
The system is just the dry mass, and the CG is at the dry mass location. The distance from the dry mass to the CG is zero.
$d_d = x_d - x_{cg}(90) = 10 - 10 = 0$ m.
$I_{yy}(90) = (1000)(0)^2 + (0)(5-10)^2 = 0 \text{ kg} \cdot \text{m}^2$.
*Reflection:* The inertia calculation for point masses at burnout is trivial. For a real rocket with distributed mass, the dry mass itself would have a non-zero moment of inertia about its own center of mass, $I_{cm,d}$, which would be the final answer. The key takeaway is the dramatic reduction in inertia.

## Diagrams

```text
       t = 0 (Liftoff)                          t = t_burnout

          ^ x-axis                                 ^ x-axis
          |                                        |
      10m +-- m_d (Dry Mass)                   10m +-- m_d  (CG is here now)
          |                                        |
          |                                        |
          |                                        |
        5.5m +-- CG (Center of Gravity)              |
          |                                        |
        5m  +-- m_p (Propellant)                   5m  +-- (Propellant is gone)
          |                                        |
          |                                        |
          |                                        |
        0m  +---------------------> y-axis         0m  +---------------------> y-axis
```

This diagram shows the locations of the dry mass, propellant mass, and the combined Center of Gravity (CG) at the start and end of the burn. Notice the CG moves from 5.5m up to 10m, the location of the dry mass.

## Memory technique — remember this forever
1.  **The Story:** Imagine a firefighter climbing a ladder while holding a heavy, leaking fire hose. At the bottom, the hose is full and heavy, and their combined center of gravity is low. As they climb, water drains out. Their combined CG shifts upwards, towards their body, away from the now-empty hose. The firefighter (the rocket's dry mass) becomes the dominant mass. They also become more agile, able to pivot and aim more easily, just as the rocket's moment of inertia drops.

2.  **Must-know formulas:**
    $$
    x_{cg}(t) = \frac{\sum m_i(t) x_i}{\sum m_i(t)}
    $$
    $$
    I_{total}(t) = \sum \left( I_{cm,i} + m_i(t) \left[ x_i - x_{cg}(t) \right]^2 \right)
    $$

3.  **Spaced Repetition Schedule:**
    *   Review this material and re-derive the worked example in **1 day**.
    *   Review again in **3 days**.
    *   Solve a new problem (e.g., from a textbook) in **7 days**.
    *   Explain the concept to a friend (or a wall) in **16 days**.
    *   Quickly re-derive the main formulas from scratch in **35 days**.

4.  **First Principles Pathway:** If you forget everything, start here:
    *   The definition of the center of mass is the mass-weighted average of position: $x_{cg} = (\int x dm) / (\int dm)$.
    *   For a system of bodies, this becomes a sum: $x_{cg} = (\sum m_i x_i) / (\sum m_i)$.
    *   The only "trick" is that mass is a function of time: $m_i \rightarrow m_i(t)$.
    *   The definition of moment of inertia is $I = \int r^2 dm$. The Parallel Axis Theorem ($I = I_{cm} + md^2$) is a direct consequence of this.
    *   Apply these two definitions to a system where one of the masses, $m_p$, and thus the total mass $m_{tot}$, changes with time. All results follow from this.

## Common mistakes
1.  **Forgetting the CG moves.** A common error is to calculate the CG at liftoff, $x_{cg}(0)$, and then use that *fixed* value to calculate the moment of inertia at a later time $t$. You must use the instantaneous CG, $x_{cg}(t)$, for the distances in the Parallel Axis Theorem at time $t$.
2.  **Assuming linear change in inertia.** Mass decreases linearly, and the CG position changes non-linearly. The moment of inertia, which depends on both mass and the square of the CG-dependent distance, is a complex non-linear function of time. Do not assume you can just interpolate it.
3.  **Adding inertias about different axes.** Students sometimes add the inertia of the payload about the payload's CG to the inertia of the fuel tank about the tank's CG. This is wrong. All inertias must be translated to a single, common reference point (the vehicle's combined CG) before being summed.

## Self-check
1.  A two-stage rocket jettisons its first stage after burnout. The first stage is at the bottom. Instantly after separation, does the second stage's CG shift, and if so, in which direction relative to the second stage's own geometry?
2.  For the worked example, find the time $t$ at which the rocket's CG is located at $x=7$ m.
3.  Model the propellant not as a point mass, but as a uniform rod of length $L=6$ m and initial mass $m_{p,0} = 9000$ kg, with its center initially at $x_p=5$ m (so it extends from 2m to 8m). Assume the propellant is consumed from the bottom up, so the rod's length shortens while its top remains at $x=8$ m. Derive the expression for the rocket's CG, $x_{cg}(t)$, under these new assumptions (dry mass is the same as the example).