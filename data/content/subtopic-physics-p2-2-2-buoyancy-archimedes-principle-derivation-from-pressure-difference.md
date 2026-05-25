## What it is
Buoyancy is the upward force exerted by a fluid that opposes the weight of a partially or fully immersed object. Archimedes' principle states this buoyant force is equal to the weight of the fluid that the object displaces. This is not a new fundamental force; it is the net result of pressure increasing with fluid depth.

## Why it matters
Understanding buoyancy is critical for designing ships, submarines, and submersibles, where controlling ascent and descent is paramount. In aerospace, it governs the flight of high-altitude balloons and airships. Even inside a rocket's fuel tank, buoyancy effects (and their absence in microgravity) influence propellant management and sloshing dynamics.

## When to study it
Before tackling this, you must have a solid grasp of the following:
1.  **Pressure in a static fluid:** Specifically, the relationship $P(h) = P_0 + \rho g h$, where $\rho$ is the fluid density, $g$ is gravitational acceleration, and $h$ is the depth.
2.  **Definition of pressure:** The relationship between force and pressure, $F = P \cdot A$.
3.  **Newton's Laws:** Specifically, the concept of net force and static equilibrium ($\sum \vec{F} = 0$).
4.  **Basic integral calculus:** To understand the generalization from a simple cylinder to an arbitrary shape.

If you are not confident in deriving the pressure-depth relationship, review that first.

## How to study it (step by step)
1.  **Derive the buoyant force for a cylinder.** Start with a simple right cylinder of height $L$ and area $A$ submerged in a fluid of density $\rho_f$. Use the pressure-depth formula to calculate the force on the top surface and the bottom surface. Find the net force.
2.  **Connect the result to Archimedes' principle.** Show that the net force you calculated in step 1 is exactly equal to $\rho_f g (L \cdot A)$, which is the density of the fluid times gravity times the volume of the cylinder—the weight of the displaced fluid.
3.  **Generalize the principle.** Consider an object of arbitrary shape. Argue that the net horizontal force from pressure must be zero. Then, express the net vertical force as an integral of pressure over the vertical components of the surface area. Show this integral resolves to the weight of the displaced fluid.
4.  **Analyze static equilibrium.** For a floating object, set the buoyant force equal to the object's total weight ($F_B = W_{obj}$). Use this to derive the condition for floating based on densities: $\rho_{obj} < \rho_f$.
5.  **Solve problems.** Work through at least three problems: one with a fully submerged object, one with a partially submerged (floating) object, and one involving an object in a non-standard fluid (like air).

## Key ideas, with intuition
1.  **Pressure Pushes Harder on the Bottom:** The core reason for buoyancy is that pressure in a fluid increases with depth. Imagine a submerged cube. The fluid pushes on all sides, but it pushes harder on the bottom face than on the top face because the bottom face is deeper. The horizontal forces cancel each other out, but the stronger upward push on the bottom and weaker downward push on the top result in a net upward force.

2.  **The Fluid Wants Its Space Back:** This is the intuition behind Archimedes' principle. When you submerge an object, you displace a certain volume of fluid. The buoyant force is the force the surrounding fluid exerts to support that object. This force is identical to the force that was required to support the fluid that used to be there. Therefore, the buoyant force is precisely the weight of the displaced fluid.

3.  **The Formula is about the *Fluid*, not the *Object*:** The buoyant force depends on the density of the *fluid* and the volume of the object that is *submerged*.
    $$ F_B = \rho_{\text{fluid}} g V_{\text{submerged}} $$
    The object's own density only comes into play when you compare the buoyant force to the object's weight ($W_{obj} = \rho_{obj} g V_{total}$) to see if it sinks or floats.

4.  **Floating is a Battle of Densities:** An object floats if its average density is less than the density of the fluid. If $\rho_{obj} < \rho_{fluid}$, the object's weight is less than the weight of the same volume of fluid. It will rise until the buoyant force (acting on the now smaller submerged volume) exactly balances its weight. This is why a steel ship (mostly empty space inside) can float on water, while a solid steel block sinks.

## Worked example
**Problem:** A rectangular block of wood has dimensions $10 \text{ cm} \times 20 \text{ cm} \times 30 \text{ cm}$ and a density of $\rho_{wood} = 700 \text{ kg/m}^3$. It is placed in a tank of freshwater ($\rho_{water} = 1000 \text{ kg/m}^3$). What percentage of the block's volume is submerged?

**Solution:**

1.  **Identify the condition for floating.** The block is in static equilibrium, floating on the water. This means the net force is zero. The two vertical forces acting on it are its weight ($W$) acting downwards and the buoyant force ($F_B$) acting upwards.
    $$ F_{net} = F_B - W = 0 \implies F_B = W $$
    This is the fundamental condition we will solve.

2.  **Calculate the weight of the block.**
    First, find the total volume of the block. Convert dimensions to meters: $0.1 \text{ m}, 0.2 \text{ m}, 0.3 \text{ m}$.
    $$ V_{total} = 0.1 \cdot 0.2 \cdot 0.3 = 0.006 \text{ m}^3 $$
    The weight is its mass times $g$. Mass is density times volume.
    $$ W = m_{wood} g = (\rho_{wood} V_{total}) g $$
    $$ W = (700 \text{ kg/m}^3)(0.006 \text{ m}^3)(g) = 4.2 g \text{ N} $$

3.  **Express the buoyant force.**
    The buoyant force is the weight of the displaced water. It depends on the submerged volume, $V_{submerged}$, which we need to find.
    $$ F_B = \rho_{water} g V_{submerged} $$
    $$ F_B = (1000 \text{ kg/m}^3) g V_{submerged} $$

4.  **Equate the forces and solve for the submerged volume.**
    Using the equilibrium condition from step 1:
    $$ F_B = W $$
    $$ (1000) g V_{submerged} = (700) g V_{total} $$
    Notice that $g$ cancels out. This is expected; the equilibrium condition is fundamentally about mass and density.
    $$ 1000 \cdot V_{submerged} = 700 \cdot V_{total} $$
    $$ V_{submerged} = \frac{700}{1000} V_{total} = 0.7 V_{total} $$

5.  **State the final answer.**
    The submerged volume is 0.7 times the total volume. Therefore, 70% of the block's volume is submerged.

**Reflection:** Each step builds on the last. Step 1 sets up the physics of the problem (equilibrium). Steps 2 and 3 define the two competing forces using their fundamental formulas. Step 4 solves the resulting algebraic equation. The cancellation of $g$ shows that the fraction submerged depends only on the ratio of the object's density to the fluid's density: $\frac{V_{submerged}}{V_{total}} = \frac{\rho_{object}}{\rho_{fluid}}$.

## Diagrams
Here is a diagram showing the derivation of the buoyant force on a submerged cylinder.

```text
       Surface of fluid (pressure P_0)
           |
           | h_top
           |
      +----|----+
      |    V    |   Area A, Force F_top = P_top * A
      |         |
      |         |   Cylinder of height L
      |         |
      |    ^    |   Area A, Force F_bot = P_bot * A
      +----|----+
           |
           | h_bot = h_top + L
           V
         Depth
```
The net upward force (Buoyant Force) is $F_B = F_{bot} - F_{top}$.
$P_{top} = P_0 + \rho_f g h_{top}$
$P_{bot} = P_0 + \rho_f g h_{bot} = P_0 + \rho_f g (h_{top} + L)$
$F_B = (P_{bot} - P_{top})A = (\rho_f g L)A = \rho_f g V_{cylinder}$

## Memory technique — remember this forever
1.  **The Story:** A king gives you a crown and asks if it's pure gold. You can't melt it. You submerge it in water. The water, angry at being pushed aside, shoves back on the crown. The force of its shove is exactly the weight of the water that used to be where the crown now is. This is the buoyant force. You measure this force (e.g., with a scale) and you know the weight of the displaced water. Since you know water's density, you can find the displaced volume, which is the crown's volume. Volume and weight give you density. Compare to gold. This is the (apocryphal) story of Archimedes. **Remember: The fluid pushes back with the weight of its displaced self.**

2.  **Formulas to Overlearn:**
    -   Buoyant Force: $F_B = \rho_{\text{fluid}} g V_{\text{submerged}}$
    -   Floating Condition: $F_B = W_{object}$ (which implies $\frac{\rho_{object}}{\rho_{fluid}} = \frac{V_{submerged}}{V_{total}}$)

3.  **Spaced Repetition Schedule:** Review this material and re-derive the main formula from pressure difference at these intervals:
    -   1 day
    -   3 days
    -   7 days
    -   16 days
    -   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    -   Buoyancy is a net force from pressure.
    -   Pressure is $P = F/A$. So net force is $\Delta P \cdot A$.
    -   Pressure increases with depth: $P(h) = \rho g h$.
    -   For a simple box of height $L$ and area $A$: $F_{net} = (P_{bottom} - P_{top})A = (\rho g h_{bottom} - \rho g h_{top})A$.
    -   $h_{bottom} - h_{top} = L$. So $F_{net} = (\rho g L)A = \rho g (L \cdot A) = \rho g V$.
    -   This is the buoyant force. You have re-derived it.

## Common mistakes
1.  **Using the wrong density.** The formula $F_B = \rho g V$ uses the density of the *fluid* ($\rho_{fluid}$), not the object. The object's weight uses the object's density. Do not mix them up.
2.  **Using the wrong volume.** For a floating or partially submerged object, $V_{submerged}$ is only the part of the volume that is below the fluid surface. For a fully submerged object, $V_{submerged} = V_{total}$. Be precise.
3.  **Ignoring the weight of air.** For most problems, the buoyant force from air is negligible. But for very light objects like a helium balloon, the buoyant force from the displaced air is the entire reason it rises. Context matters.
4.  **Confusing apparent weight with actual weight.** An object's weight ($W=mg$) is constant. Its "apparent weight" when submerged is $W_{app} = W - F_B$. This is what a scale would read if you weighed the object underwater. Do not use apparent weight in the equilibrium equation unless the problem is specifically about a scale reading.

## Self-check
1.  An aluminum sphere ($\rho_{Al} = 2700 \text{ kg/m}^3$) with a radius of $r=5$ cm is fully submerged in gasoline ($\rho_{gas} = 720 \text{ kg/m}^3$). What is the buoyant force on the sphere? What is its apparent weight?
2.  An iceberg ($\rho_{ice} \approx 917 \text{ kg/m}^3$) floats in the North Atlantic Ocean ($\rho_{seawater} \approx 1025 \text{ kg/m}^3$). What percentage of the iceberg's volume is visible above the water?
3.  You have a hollow sphere made of a material with density $\rho_m$. The sphere has an outer radius $R_o$ and an inner radius $R_i$. Derive an expression for the maximum possible ratio $R_i / R_o$ for the sphere to float in a fluid of density $\rho_f$. Interpret what happens when $\rho_m < \rho_f$.