## What it is
Hydrostatic pressure is the pressure exerted by a fluid at rest at a given depth, caused by the weight of the fluid above it. The formula $P = \rho g h$ calculates this pressure, where $P$ is the pressure, $\rho$ (rho) is the fluid density, $g$ is the acceleration due to gravity, and $h$ is the vertical depth below the fluid's surface. This pressure acts equally in all directions at a given depth.

## Why it matters
This principle is fundamental to aerospace engineering for calculating forces on submerged structures, such as fuel inside a rocket's propellant tank during ground operations or the pressure differential on a spacecraft during atmospheric entry. It is also the basis for atmospheric modeling, which is critical for calculating aerodynamic forces and trajectory planning. Understanding this is the first step toward analyzing more complex fluid dynamics, like lift and drag.

## When to study it
Before tackling this, you must have a solid grasp of the following from classical mechanics:
*   Newton's Second Law ($\sum \vec{F} = m\vec{a}$), specifically for static equilibrium ($\sum \vec{F} = 0$).
*   The definition of pressure as force per unit area ($P = F/A$).
*   The definition of density as mass per unit volume ($\rho = m/V$).
*   How to draw and analyze a free-body diagram.

If any of these are weak, review them first. This derivation depends entirely on them.

## How to study it (step by step)
1.  **Isolate the System:** Imagine a static, incompressible fluid of uniform density $\rho$. Within this fluid, isolate an imaginary cylindrical parcel of fluid with cross-sectional area $A$ and height $h$.
2.  **Draw the Free-Body Diagram:** Identify all vertical forces acting on this parcel. There are three: the downward force from the pressure at the top ($F_{top}$), the upward force from the pressure at the bottom ($F_{bottom}$), and the downward force of the parcel's own weight ($W$).
3.  **Apply Equilibrium Condition:** Since the fluid is static, the parcel is not accelerating. Apply Newton's Second Law for equilibrium in the vertical direction: $\sum F_y = 0$. This means the total upward force must balance the total downward force.
4.  **Substitute Physical Definitions:** Replace the forces with their definitions in terms of pressure and density. $F_{top} = P_{top}A$, $F_{bottom} = P_{bottom}A$, and $W = mg$.
5.  **Express Mass in Terms of Density:** The mass of the fluid parcel is its density times its volume: $m = \rho V$. The volume of the cylinder is $V = A h$. Therefore, $W = (\rho A h)g$.
6.  **Solve the Equation:** Substitute these expressions back into the equilibrium equation and simplify. You will find that the area $A$ cancels out, leaving a relationship between the pressure difference and the fluid properties.
7.  **Practice:** Solve two or three problems involving calculating pressure at different depths in various fluids (water, mercury, oil) to solidify the concept.

## Key ideas, with intuition
1.  **Pressure is a supporting force.** Imagine holding a heavy book. Your hand exerts an upward force to counteract the book's weight. The fluid pressure at a certain depth does the same thing: it must be strong enough to hold up the entire column of fluid sitting on top of it. The deeper you go, the taller (and heavier) the column of fluid above, so the greater the required supporting pressure.

2.  **Weight is the source of the pressure.** The entire phenomenon exists because of gravity pulling the fluid down. In a zero-gravity environment, there would be no hydrostatic pressure. The formula reflects this directly with the inclusion of $g$.
    $$
    \text{Weight of fluid column} = W = m g = (\rho V) g = \rho (A h) g
    $$

3.  **Pressure difference is what we derive first.** The derivation doesn't directly give you $P = \rho g h$. It gives you the *change* in pressure over a vertical distance $h$.
    $$
    \Delta P = P_{bottom} - P_{top} = \rho g h
    $$
    We often set the pressure at the top surface ($h=0$) to be zero (for gauge pressure) or atmospheric pressure ($P_{atm}$), which simplifies the equation to $P(h) = P_{atm} + \rho g h$.

## Worked example
**Problem:** The propellant tank of a stationary rocket on the launchpad is a cylinder filled with liquid oxygen (LOX) to a height of $12.0$ meters. The density of LOX is $\rho = 1141 \text{ kg/m}^3$. The pressure at the surface of the LOX is maintained at atmospheric pressure, $P_{atm} = 101.3 \text{ kPa}$. Calculate the absolute pressure at the bottom of the tank. Use $g = 9.81 \text{ m/s}^2$.

**Solution:**
1.  **Identify the goal:** We need to find the absolute pressure $P_{bottom}$ at the bottom of the tank.
2.  **State the governing principle:** The pressure at a depth $h$ in a fluid is the sum of the surface pressure and the hydrostatic pressure gain.
    $$
    P_{bottom} = P_{top} + \rho g h
    $$
3.  **Identify knowns:**
    *   Surface pressure, $P_{top} = P_{atm} = 101.3 \text{ kPa} = 101300 \text{ Pa}$
    *   Fluid density, $\rho = 1141 \text{ kg/m}^3$
    *   Acceleration due to gravity, $g = 9.81 \text{ m/s}^2$
    *   Fluid depth, $h = 12.0 \text{ m}$
4.  **Calculate the hydrostatic pressure component ($\rho g h$):**
    $$
    P_{hydrostatic} = (1141 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(12.0 \text{ m})
    $$
    $$
    P_{hydrostatic} = 134315.72 \text{ kg} \cdot \text{m}^{-1} \cdot \text{s}^{-2} = 134315.72 \text{ Pa}
    $$
    Note: The unit $\text{kg} \cdot \text{m}^{-1} \cdot \text{s}^{-2}$ is the definition of a Pascal (Pa), which is $\text{N/m}^2$.
5.  **Calculate the absolute pressure:**
    $$
    P_{bottom} = P_{top} + P_{hydrostatic} = 101300 \text{ Pa} + 134315.72 \text{ Pa}
    $$
    $$
    P_{bottom} = 235615.72 \text{ Pa}
    $$
6.  **Final Answer with appropriate units and significant figures:**
    $$
    P_{bottom} \approx 235.6 \text{ kPa}
    $$

**Reflection:** Each step logically followed from the previous. We started with the physical principle (Step 2), which told us exactly which quantities we needed. We identified those quantities from the problem statement (Step 3). We calculated the pressure increase due to the fluid's weight (Step 4) and added it to the initial surface pressure to find the final absolute pressure (Step 5).

## Diagrams
A cylindrical parcel of fluid in static equilibrium.

```text
       <---- A ---->
      +-----------+   <-- Surface at depth h_1, Pressure P_1
      |           |   Force F_1 = P_1 * A (downward)
      |           |
      |           |
      |   Fluid   |
      |  Parcel   |
 y ^  | (density rho) |   Weight W = m*g = (rho*A*h)*g (downward)
   |  |           |
   |  |           |
   |  |           |
   |  +-----------+   <-- Surface at depth h_2, Pressure P_2
   |                Force F_2 = P_2 * A (upward)
   +-----> x

   where h = h_2 - h_1
```
The free-body diagram for this parcel is:
```text
      F_top = P_1 * A
            |
            V
      +-----------+
      |           |
      |     W     |
      |     |     |
      |     V     |
      +-----------+
            ^
            |
      F_bottom = P_2 * A

Equilibrium: F_bottom = F_top + W
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a diver. The deeper they go (`h`), the more water is piled on top of them. The "density" of that water (`ρ`) and gravity (`g`) determine how heavy that pile is. The pressure is just the weight of that pile. **Pressure = (density of pile) * (gravity) * (height of pile)**.

2.  **Must-Memorize Formulas:**
    $$
    P = \rho g h \quad (\text{This is gauge pressure if surface is at 0 pressure})
    $$
    $$
    P = F/A
    $$
    $$
    \rho = m/V
    $$

3.  **Spaced Repetition Schedule:** Review this derivation and solve one problem on: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Draw a cylinder of fluid.
    *   State that it's in equilibrium: $\sum F_y = 0$.
    *   Write the force balance: $F_{up} - F_{down} - W = 0$.
    *   Substitute definitions: $P_{bottom}A - P_{top}A - mg = 0$.
    *   Substitute mass: $P_{bottom}A - P_{top}A - (\rho V)g = 0$.
    *   Substitute volume: $P_{bottom}A - P_{top}A - (\rho A h)g = 0$.
    *   Cancel area $A$: $P_{bottom} - P_{top} - \rho g h = 0$.
    *   Rearrange: $\Delta P = \rho g h$.

## Common mistakes
*   **Gauge vs. Absolute Pressure:** $P = \rho g h$ gives the *increase* in pressure from the surface. If the surface is open to the atmosphere, the absolute pressure is $P_{abs} = P_{atm} + \rho g h$. Forgetting to add $P_{atm}$ when asked for absolute pressure is a common error.
*   **Units:** Using cm for height with kg/m³ for density. You must be consistent. Convert everything to SI units (meters, kilograms, seconds, Pascals) before calculating.
*   **Vertical Height:** The $h$ is always the straight-down vertical distance from the surface. If a container has a slanted side, the pressure at the bottom depends on the vertical depth, not the slant length.
*   **Assuming Constant Density:** This derivation assumes an incompressible fluid ($\rho$ is constant). For gases like the atmosphere, density changes with altitude, and this formula is only an approximation over small height changes. A more complex integration is required for gases.

## Self-check
1.  A vertical tube is sealed at the bottom and filled with mercury ($\rho = 13600 \text{ kg/m}^3$) to a height of $760 \text{ mm}$. What is the gauge pressure at the bottom of the tube in Pascals?
2.  A U-shaped tube contains water ($\rho_w = 1000 \text{ kg/m}^3$). A less dense, immiscible oil is poured into the left arm. The oil forms a column of height $h_o = 10 \text{ cm}$. As a result, the water level in the right arm rises above the interface between the oil and water in the left arm by a height $h_w$. Find $h_w$ if the oil's density is $\rho_o = 800 \text{ kg/m}^3$.
3.  Assume the Earth's atmosphere has a constant temperature. The ideal gas law implies that density is proportional to pressure, $\rho = cP$ for some constant $c$. Starting from the differential form of the hydrostatic equation, $dP = -\rho g \,dh$, derive an expression for how pressure $P(h)$ varies with height $h$ above sea level, given the pressure at sea level is $P_0$.