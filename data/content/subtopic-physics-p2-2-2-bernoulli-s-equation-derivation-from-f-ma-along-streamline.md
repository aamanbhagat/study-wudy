## What it is
Bernoulli's equation is a statement of the conservation of energy for a fluid particle moving along a streamline. It relates the fluid's pressure, velocity, and height, showing that as the fluid speeds up, its pressure or potential energy must decrease, and vice versa. It is fundamentally Newton's second law, $F=ma$, applied to a fluid element, expressed in the language of energy.

## Why it matters
This principle is the foundation of aerodynamics and hydrodynamics. It explains how an airplane wing generates lift (by creating a pressure difference from different airspeeds) and how a Venturi meter measures flow rate. In rocket science, it's used in a modified form (for compressible flow) to design engine nozzles that convert high-pressure, low-velocity gas into a high-velocity exhaust stream to generate thrust.

## When to study it
You must have a solid grasp of the following before proceeding. If not, review them first.
*   **Newton's Second Law:** $F_{net} = ma$.
*   **Calculus:** Derivatives, integrals, and the chain rule (specifically, how to express acceleration $a = \frac{dv}{dt}$ in terms of spatial position, $s$).
*   **Work-Energy Theorem:** The net work done on an object equals its change in kinetic energy, $W_{net} = \Delta K$.
*   **Fluid Concepts:** Pressure ($P$), density ($\rho$), and the concept of a streamline (the path a massless particle would follow in a steady flow).

## How to study it (step by step)
1.  **Isolate the System:** Draw a single, infinitesimally small cylindrical fluid element moving along a curved streamline. Define its properties: cross-sectional area $A$, length $ds$, and mass $dm = \rho A ds$.
2.  **Identify the Forces:** Identify all forces acting on the element *along the streamline*. There are two: the force from pressure difference and the component of the gravitational force.
3.  **Apply Newton's Second Law:** Write down the net force, $dF_s$, along the streamline. Set this equal to the mass of the element times its acceleration along the streamline, $dm \cdot a_s$.
4.  **Express Acceleration Spatially:** The key trick. Acceleration $a_s = \frac{dv}{dt}$. Use the chain rule to convert the time derivative to a spatial derivative: $a_s = \frac{dv}{ds}\frac{ds}{dt} = v\frac{dv}{ds}$. This expresses how velocity changes with *position* along the streamline, which is what we need for steady flow.
5.  **Form the Differential Equation:** Substitute the forces and the spatial acceleration into $F=ma$. You will arrive at a differential equation relating changes in pressure ($dP$), velocity ($dv$), and height ($dz$).
6.  **Integrate:** Integrate the differential equation along the streamline under the assumptions of incompressible ($\rho$ is constant) and non-viscous (no friction) flow. This yields the final form of Bernoulli's equation.
7.  **Solve a Problem:** Use the final equation to solve for the exit velocity of water from a tank (Torricelli's Law), reinforcing the physical meaning of each term.

## Key ideas, with intuition
1.  **Pressure Gradient is a Force:** A fluid element only moves if there's a net force on it. If the pressure on its back face ($P$) is higher than the pressure on its front face ($P+dP$, where $dP$ is negative), there is a net forward force. The force is $F_{pressure} = P A - (P+dP) A = -A \, dP$. The negative sign means the force points from high pressure to low pressure.

2.  **Gravity Does Work:** If the fluid element moves uphill, gravity does negative work, slowing it down (or requiring a pressure force to push it). The component of the gravitational force along the streamline is $F_{gravity} = -mg \sin\theta$. For a fluid element of length $ds$ moving up a height $dz$, we have $\sin\theta = \frac{dz}{ds}$. So, $F_{gravity} = -(dm) g \frac{dz}{ds} = -(\rho A ds) g \frac{dz}{ds} = -\rho A g \, dz$.

3.  **Acceleration in Steady Flow:** Even if the flow pattern is constant over time (steady flow), a fluid element accelerates if it moves from a wide part of a pipe to a narrow part. Its velocity must increase. This is *convective acceleration*, and it's captured by the term $a_s = v \frac{dv}{ds}$. This is distinct from local acceleration $\frac{\partial v}{\partial t}$, which is zero in steady flow.

4.  **The Master Equation (Euler's Equation):** Combining these ideas using $F_{net} = ma$ gives the fundamental equation of motion along a streamline before integration.
    $$ dF_s = F_{pressure} + F_{gravity} = -A \, dP - \rho A g \, dz $$
    $$ dm \cdot a_s = (\rho A ds) \left(v \frac{dv}{ds}\right) = \rho A v \, dv $$
    Setting them equal and dividing by $A$:
    $$ -dP - \rho g \, dz = \rho v \, dv $$
    Rearranging gives Euler's equation for inviscid, steady flow:
    $$ \frac{dP}{\rho} + v \, dv + g \, dz = 0 $$
    This equation says that if you move a small step $ds$ along a streamline, the changes in pressure, kinetic energy, and potential energy must sum to zero. Integrating this equation directly gives Bernoulli's principle.

## Worked example
**Problem:** A large, open water tank has a small hole in its side, a height $h$ below the water surface. Find the speed, $v$, of the water as it exits the hole.

**Solution:**
1.  **Assumptions:** We assume the flow is steady, incompressible, and non-viscous. The tank is open to the atmosphere.
2.  **Choose Points:** Select two points along a single streamline.
    *   Point 1: At the free surface of the water in the tank.
    *   Point 2: At the exit hole.
3.  **Write Bernoulli's Equation:**
    $$ P_1 + \frac{1}{2}\rho v_1^2 + \rho g z_1 = P_2 + \frac{1}{2}\rho v_2^2 + \rho g z_2 $$
4.  **Apply Conditions and Simplify:**
    *   **Pressure:** The tank is open to the atmosphere, and the water exits into the atmosphere. So, $P_1 = P_2 = P_{atm}$. The pressure terms cancel.
    *   **Velocity at Surface:** The tank is "large," so the water level drops very slowly. We can approximate the velocity at the surface as zero: $v_1 \approx 0$.
    *   **Height:** Let's set our reference height $z=0$ at the level of the hole. Then $z_2 = 0$ and $z_1 = h$.
5.  **Substitute and Solve:**
    The equation simplifies to:
    $$ P_{atm} + \frac{1}{2}\rho (0)^2 + \rho g h = P_{atm} + \frac{1}{2}\rho v_2^2 + \rho g (0) $$
    $$ \rho g h = \frac{1}{2}\rho v_2^2 $$
    Cancel the density $\rho$:
    $$ g h = \frac{1}{2} v_2^2 $$
    Solve for the exit velocity, $v_2$:
    $$ v_2 = \sqrt{2gh} $$

**Reflection:** This result, known as Torricelli's Law, is identical to the speed an object would have if it were simply dropped from a height $h$. This makes perfect sense: the potential energy of the water at the surface ($\rho g h$ per unit volume) is converted entirely into kinetic energy ($\frac{1}{2}\rho v^2$ per unit volume) at the exit. The derivation worked because we correctly identified a streamline and applied the conservation principle between two points where we knew most of the variables (or could reasonably approximate them).

## Diagrams

A fluid element moving along a streamline, showing the forces acting on it.

```text
       Streamline -->
      /
     /
    /
   +-----------------+  --> v+dv
  /|                 | /
 / |      dm         |/  Area A
P->|      rho        |<- P+dP
   |                 |
   +-----------------+
   ds
   |
   | dz
   |
   +------------> ds cos(theta)
   |
   V  Weight = dm * g
```
**Figure description:** The diagram shows a small cylindrical fluid element of length $ds$ and cross-sectional area $A$. It is aligned with a curved streamline. The pressure force $P \cdot A$ pushes on the left face, and $(P+dP) \cdot A$ pushes on the right face. The weight vector $dm \cdot g$ points vertically downward. The vertical displacement corresponding to the length $ds$ is $dz$.

## Memory technique — remember this forever
1.  **The Story: The Energy Bank Account.** Think of a fluid parcel's energy as a bank account with three funds:
    *   **Pressure ($P$):** "Liquid" assets. This is the energy immediately available to do work.
    *   **Kinetic Energy ($\frac{1}{2}\rho v^2$):** "Stocks." This is energy tied up in motion.
    *   **Potential Energy ($\rho g z$):** "Real Estate." This is energy stored due to height.
    For an ideal fluid (no friction/fees), moving along a streamline is like transferring money between these funds. The total balance **must remain constant**. If you sell real estate (go down), your cash or stocks must go up. If you buy stocks (speed up), you must sell real estate or spend cash.

2.  **Formulas to Overlearn:**
    *   Pressure form: $P + \frac{1}{2}\rho v^2 + \rho g z = \text{constant}$ (Units of Pressure, Pascals)
    *   Head form: $\frac{P}{\rho g} + \frac{v^2}{2g} + z = \text{constant}$ (Units of Length, meters)

3.  **Spaced Repetition Schedule:** Review this lesson and re-derive the equation from $F=ma$ at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Draw a fluid element on a streamline.
    *   Sum forces along the streamline: $dF_s = (-A \, dP) + (-dm \, g \sin\theta)$.
    *   Set equal to mass times acceleration: $dF_s = dm \cdot a_s$.
    *   Substitute $dm = \rho A ds$, $\sin\theta = dz/ds$, and $a_s = v \, dv/ds$.
    *   Cancel terms and integrate. You cannot fail if you follow these steps.

## Common mistakes
1.  **Applying across streamlines:** Bernoulli's equation in this form is valid *along a single streamline*. You cannot compare a point on a streamline near the top of a pipe with a point on a different streamline at the bottom, unless the flow is also *irrotational*.
2.  **Ignoring Assumptions:** Applying the equation to situations with significant friction (viscosity), compressibility (high-speed gas flow), or unsteady conditions. This is the most common error in practice.
3.  **Pressure Confusion:** Confusing absolute pressure with gauge pressure. Be consistent. If you use gauge pressure for $P_1$, you must use it for $P_2$. It's safest to use absolute pressure unless terms will obviously cancel.
4.  **Forgetting the $\rho$:** Students often write $\frac{1}{2}v^2$ instead of $\frac{1}{2}\rho v^2$. Remember, each term must have units of pressure (energy per unit volume), so the kinetic energy term needs the mass density.

## Self-check
1.  Water flows through a horizontal pipe that constricts from a diameter of 10 cm to 5 cm. If the velocity in the 10 cm section is 1 m/s, what is the pressure difference between the two sections? (You will also need the continuity equation, $A_1 v_1 = A_2 v_2$).
2.  An aircraft is flying at an altitude where the air density is $1.0 \text{ kg/m}^3$. The air flows over the top of the wing at 250 m/s and under the bottom of the wing at 220 m/s. If the wing has a surface area of $20 \text{ m}^2$, what is the approximate net lift force on the wing?
3.  Starting from Euler's equation for steady flow along a streamline, $\frac{dP}{\rho} + v \, dv + g \, dz = 0$, derive Bernoulli's equation for a *compressible* fluid that follows an isothermal process ($P/\rho = \text{constant}$). How does the resulting equation differ from the standard incompressible form?