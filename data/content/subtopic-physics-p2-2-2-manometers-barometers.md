## What it is
Manometers and barometers are instruments that measure pressure by balancing a column of fluid against the pressure in question. A barometer specifically measures atmospheric pressure against a near-perfect vacuum, giving an absolute pressure. A manometer measures the pressure difference between two points, often yielding a gauge pressure relative to the atmosphere.

## Why it matters
This concept is fundamental to fluid statics and has direct applications in aerospace and engineering. Altimeters in aircraft are essentially sophisticated barometers, relating atmospheric pressure to altitude. Pitot tubes, used to measure airspeed, rely on a differential pressure measurement akin to a manometer. Understanding this is the first step toward analyzing fluid dynamics instrumentation.

## When to study it
You must have a solid grasp of the following before proceeding:
1.  **Pressure:** The definition $P = F/A$.
2.  **Density:** The definition $\rho = m/V$.
3.  **Hydrostatic Equilibrium:** The derivation and application of the fundamental hydrostatic pressure equation, $P = P_0 + \rho g h$, which states that pressure increases linearly with depth in a static fluid.

If you cannot derive $P = P_0 + \rho g h$ from a force balance on a fluid element, review that first.

## How to study it (step by step)
1.  **Re-derive the Hydrostatic Equation:** Start with a cylindrical fluid element of height $dh$ and area $A$. Sum the forces in the vertical direction: $P(h)A - P(h+dh)A - \rho g A dh = 0$. Use the definition of the derivative to show this leads to $dP/dh = -\rho g$ (with $h$ measured upwards) or $dP/dh = \rho g$ (with $h$ measured downwards as depth). Integrate to get the final form.
2.  **Analyze the Barometer:** Draw a diagram of an inverted tube of mercury in a pool. Apply the hydrostatic equation from the vacuum at the top ($P_0 \approx 0$) down to the surface of the pool, which is at atmospheric pressure. Derive $P_{atm} = \rho g h$.
3.  **Analyze the U-tube Manometer:** Draw a U-tube with two different fluid levels, connected to a pressure source $P_{gas}$ on one side and open to the atmosphere $P_{atm}$ on the other. Identify the lowest fluid interface. Apply the core principle: pressure at the same horizontal level in a continuous fluid is equal.
4.  **Solve a Basic Barometer Problem:** Calculate the height of a water barometer at sea level. Why is mercury ($ \rho \approx 13600 \text{ kg/m}^3 $) used instead of water ($ \rho \approx 1000 \text{ kg/m}^3 $)?
5.  **Solve a Basic Manometer Problem:** A U-tube manometer is used to measure the pressure of a gas. The manometric fluid is mercury, and the height difference is $15 \text{ cm}$. Calculate the gauge pressure and absolute pressure of the gas.
6.  **Generalize the Manometer Principle:** Trace the pressure from one end to the other in a multi-fluid manometer. Start at a known pressure, add $\rho g h$ for each downward step in a fluid, and subtract $\rho g h$ for each upward step. The final pressure must equal the known pressure at the other end.

## Key ideas, with intuition
1.  **Pressure is constant along any horizontal plane in a continuous, static fluid.** Imagine a horizontal plane within the fluid. If the pressure at point A were higher than at point B on this plane, fluid would be forced from A to B, and the fluid would not be static. Therefore, for a fluid at rest, $P_A = P_B$. This is the single most important idea for solving these problems.

2.  **Moving down increases pressure; moving up decreases it.** This is the direct meaning of the hydrostatic equation $P_{deeper} = P_{shallower} + \rho g h$. Gravity pulls the fluid above you downwards, and you must support its weight. The deeper you go, the more fluid is above you, and the greater the pressure.

    $$ P_{final} = P_{start} + \sum_{down} \rho_i g h_i - \sum_{up} \rho_j g h_j $$

3.  **Absolute vs. Gauge Pressure.** Absolute pressure is measured relative to a perfect vacuum ($P_{abs} = 0$). Gauge pressure is measured relative to the local atmospheric pressure. A barometer measures absolute pressure because one end of the fluid column is exposed to a vacuum. A standard manometer open to the air measures gauge pressure.

    $$ P_{abs} = P_{gauge} + P_{atm} $$

## Worked example
**Problem:** A U-tube manometer containing mercury ($\rho_{Hg} = 13,600 \text{ kg/m}^3$) is connected to a gas tank. The other end is open to the atmosphere ($P_{atm} = 101.3 \text{ kPa}$). The mercury level on the gas tank side is $20 \text{ cm}$ higher than on the atmospheric side. What is the absolute pressure of the gas in the tank?

**Solution:**

1.  **Diagram and Strategy:** Draw the U-tube. Label the gas pressure as $P_{gas}$. Label the atmospheric pressure as $P_{atm}$. The mercury is higher on the gas side, which means the gas pressure must be *lower* than atmospheric pressure. We will use the principle that pressure at the same horizontal level is equal. Let's draw a horizontal line at the interface between the gas and the mercury (Point 1). The corresponding point in the other arm is Point 2.

2.  **Identify Points of Equal Pressure:** The lowest of the two fluid surfaces is the one open to the atmosphere. Let's choose a horizontal reference line at this lower surface. Let's call the point on the left arm (gas side) Point A and the point on the right arm (atmosphere side) Point B. Since they are at the same height in the same continuous fluid (mercury), $P_A = P_B$.

3.  **Express Pressures at A and B:**
    *   The pressure at Point B is simply atmospheric pressure, since it's the surface open to the air: $P_B = P_{atm}$.
    *   The pressure at Point A is due to the gas pressure *plus* the pressure from the column of mercury of height $h = 20 \text{ cm} = 0.20 \text{ m}$ above it. So, $P_A = P_{gas} + \rho_{Hg} g h$.

4.  **Equate and Solve:**
    Set $P_A = P_B$:
    $$ P_{gas} + \rho_{Hg} g h = P_{atm} $$
    Now, solve for the absolute pressure of the gas, $P_{gas}$:
    $$ P_{gas} = P_{atm} - \rho_{Hg} g h $$

5.  **Calculate:**
    *   $P_{atm} = 101,300 \text{ Pa}$
    *   $\rho_{Hg} = 13,600 \text{ kg/m}^3$
    *   $g \approx 9.81 \text{ m/s}^2$
    *   $h = 0.20 \text{ m}$

    $$ \rho_{Hg} g h = (13,600 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(0.20 \text{ m}) \approx 26,683 \text{ Pa} \approx 26.7 \text{ kPa} $$
    $$ P_{gas} = 101,300 \text{ Pa} - 26,683 \text{ Pa} = 74,617 \text{ Pa} $$

    The absolute pressure in the tank is approximately $74.6 \text{ kPa}$.

**Reflection:**
*   Step 1 (Diagram) established the geometry and intuition (gas pressure is lower).
*   Step 2 (Equal Pressure Line) is the core physical principle of hydrostatics.
*   Step 3 (Express Pressures) applied the hydrostatic equation $P = P_0 + \rho g h$ to each arm of the manometer relative to the chosen line.
*   Steps 4 & 5 are the algebraic manipulation and calculation to find the unknown.

## Diagrams

**Barometer:**
```text
      +-----------------+
      |    Vacuum       |
      |   (P ~ 0)       |
      |                 |
      |      / \        |
      |     /   \       |
      |    /     \      |
      |   /       \     |
      |  / Mercury \    |  h = Height of
      | /           \   |      Mercury Column
      |/             \  |
      +---------------+ V
      |///////////////|
<---- |//// P_atm ////| ---->
      +---------------+
```

**U-Tube Manometer (Example problem):**
```text
      P_gas                         P_atm
        |                             |
        V                             V
   +---------+                   +---------+
   |         |                   |         |
   |   Gas   |                   |   Air   |
   |         |                   |         |
   +---------+                   |/////////|
   |/////////|                   |/////////|
   |/////////|  <-- h=0.2m ->    +---------+  <-- Point B (at P_atm)
   |/////////|                   |         |
   +---------+  <-- Point A      |         |
   |                             |         |
   |         Mercury             |         |
   |                             |         |
   +-----------------------------+
```

## Memory technique — remember this forever
1.  **Visual Hook:** The "Manometer March". Start at one end of the U-tube (e.g., the side open to the atmosphere). March your finger down through the fluid. For every step down, your pressure "backpack" gets heavier (add $\rho g h$). When you march up the other side, the backpack gets lighter (subtract $\rho g h$). When you reach the other end, the pressure in your backpack must equal the pressure there.

2.  **Must-Know Formulas:**
    *   Hydrostatic Pressure: $P = P_0 + \rho g h$
    *   Manometer Core Principle: Set pressures equal at the lowest interface: $P_{left} = P_{right}$.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: 1 day, 3 days, 7 days, 16 days, 35 days.
    *   Each time, re-draw the diagrams from memory and re-derive the result for the worked example without looking.

4.  **First Principles Pathway:** If you forget everything, remember force balance. $F_{net} = 0$ for a static fluid. Draw a free-body diagram of a small fluid element. The pressure force from below must balance the pressure force from above plus the element's weight. This gives $dP = \rho g dh$. All manometer and barometer equations are just clever applications of the integral of this relation.

## Common mistakes
1.  **Incorrectly Measuring `h`:** The height $h$ is always the *vertical* difference in fluid levels, not the length along a tube (especially for inclined manometers).
2.  **Applying "Same Level, Same Pressure" Incorrectly:** This rule only applies to points within the *same continuous fluid*. You cannot draw a horizontal line that passes through both water and mercury and claim the pressure is the same.
3.  **Mixing Units:** Pressure can be in Pa, kPa, atm, or mm Hg. Ensure all terms in your equation ($P_{atm}$, $\rho g h$) are in a consistent unit system (typically SI) before adding or subtracting them. $1 \text{ atm} = 101325 \text{ Pa}$.
4.  **Confusing Gauge and Absolute Pressure:** Forgetting to add $P_{atm}$ when a problem asks for absolute pressure, or adding it when it asks for gauge pressure. Gauge pressure is simply the $\rho g h$ part for a simple U-tube open to the atmosphere.

## Self-check
1.  A simple mercury barometer reads $760 \text{ mm}$. If the instrument were carried in a pressurized aircraft cabin where the absolute pressure is $85 \text{ kPa}$, what height would the mercury column show?
2.  A U-tube manometer filled with water ($\rho = 1000 \text{ kg/m}^3$) is connected to a pressurized air pipe. The water level on the pipe side is $50 \text{ cm}$ lower than the side open to the atmosphere ($P_{atm} = 100 \text{ kPa}$). What is the gauge pressure in the pipe?
3.  A vertical tube contains a 10 cm column of water on top of a 5 cm column of mercury. The top surface of the water is open to the atmosphere. What is the absolute pressure at the very bottom of the mercury?