## What it is
Similarity is the principle that allows us to predict the behavior of a full-scale system (a "prototype") by studying a smaller, scaled-down version (a "model"). For the model's behavior to accurately represent the prototype's, three conditions must be met in sequence: geometric similarity (scaled shape), kinematic similarity (scaled velocity field), and dynamic similarity (scaled force field). Dynamic similarity is the most crucial and is achieved when key dimensionless numbers, like the Reynolds number, are identical for both the model and the prototype.

## Why it matters
This is the theoretical foundation for all experimental fluid dynamics, particularly in aerospace engineering. Instead of building a multi-billion dollar, full-scale F-35 to test a new wing design, engineers build a small model and test it in a wind tunnel. By ensuring similarity, the measured forces (lift, drag) on the model can be reliably scaled up to predict the forces on the actual aircraft, saving immense resources and enabling rapid iteration. These scaling laws are also fundamental in physics for understanding how phenomena change with scale, from galactic dynamics to microscopic flows.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Navier-Stokes Equations:** You don't need to solve them, but you must understand what each term represents: unsteady acceleration, convective acceleration, pressure gradient, viscous forces, and body forces.
2.  **Fluid Properties:** A solid grasp of density ($\rho$), dynamic viscosity ($\mu$), and kinematic viscosity ($\nu = \mu/\rho$).
3.  **Dimensional Analysis:** Familiarity with the concept of physical dimensions (Mass, Length, Time) and the idea of non-dimensionalizing equations and parameters. The Buckingham Pi theorem is the formal background, but an intuitive understanding is sufficient.

If you are not confident with the physical meaning of the terms in the Navier-Stokes equation, review that first. This entire topic is an application of it.

## How to study it (step by step)
1.  **Define the Hierarchy:** Write down the definitions of Geometric, Kinematic, and Dynamic similarity. Convince yourself that dynamic similarity is impossible without kinematic similarity, which is impossible without geometric similarity. Draw two airfoils of different sizes and map corresponding points, velocity vectors, and force vectors to visualize this hierarchy.
2.  **Derive Reynolds Number:** Take the steady, incompressible Navier-Stokes equation for momentum. Non-dimensionalize it by defining characteristic scales for length ($L$) and velocity ($V$). The process will naturally cause a single dimensionless group to appear, which you will recognize as the Reynolds number. This proves that for two flows to be dynamically similar, their Reynolds numbers must match.
3.  **Interpret Dimensionless Numbers as Force Ratios:** For the Reynolds number, $Re = \frac{\rho V L}{\mu}$, identify the numerator ($\rho V^2 L^2$) as proportional to inertial forces and the denominator ($\mu V L$) as proportional to viscous forces. Internalize that $Re$ is the ratio of inertia to viscosity. A high $Re$ flow is dominated by momentum (tending toward turbulence), while a low $Re$ flow is dominated by viscosity (smooth and syrupy).
4.  **Solve a Classic Wind Tunnel Problem:** Find and solve a problem where you are given prototype conditions (e.g., a car moving through air) and model constraints (e.g., a 1/10th scale model in a pressurized wind tunnel). Calculate the required tunnel velocity to match the Reynolds number, and then use the measured model drag to predict the prototype drag.
5.  **Explore the Limits:** Consider a high-speed aircraft. Would matching the Reynolds number be enough? No, because at high speeds, air compressibility becomes significant. This effect is governed by the Mach number (ratio of flow speed to sound speed). This shows that dynamic similarity requires matching *all* relevant dimensionless numbers.

## Key ideas, with intuition
1.  **Similarity is a Hierarchy: G $\rightarrow$ K $\rightarrow$ D.**
    *   **Geometric Similarity:** The model is a scaled version of the prototype. All length ratios are constant. $L_{model}/L_{prototype} = \text{constant}$. This is the necessary foundation.
    *   **Kinematic Similarity:** The fluid flow patterns are scaled versions. At corresponding geometric points, the velocity vectors are scaled by a constant factor. This means the streamlines around the model look identical to the streamlines around the prototype. $V_{model}/V_{prototype} = \text{constant}$ at corresponding points.
    *   **Dynamic Similarity:** The forces acting on the fluid and the object are scaled versions. At corresponding points, the force vectors are scaled by a constant factor. This is the ultimate goal, as it allows us to predict forces like drag and lift.

2.  **Dimensionless Numbers Guarantee Dynamic Similarity.**
    How can we ensure that all forces scale by the same constant? We can't measure every force everywhere. Instead, we look at the ratios of forces. If the ratio of any two types of forces (e.g., inertia to viscosity) is the same in the model and the prototype, then the overall force balance will behave identically. These force ratios are precisely what dimensionless numbers represent.

3.  **The Reynolds Number is the Ratio of Inertial to Viscous Forces.**
    Let's make this concrete. Inertial forces are related to the momentum of the fluid, roughly scaling with mass times acceleration, which is $(\rho L^3) \times (V/t) = (\rho L^3) \times (V^2/L) \sim \rho V^2 L^2$. Viscous forces are related to shear stress times area, which is $(\mu \frac{V}{L}) \times L^2 \sim \mu V L$.
    $$
    Re = \frac{\text{Inertial Forces}}{\text{Viscous Forces}} \sim \frac{\rho V^2 L^2}{\mu V L} = \frac{\rho V L}{\mu}
    $$
    For the flow dynamics to be similar, this ratio must be the same for the model and the prototype: $Re_{model} = Re_{prototype}$.

4.  **Force Coefficients Connect the Model to the Prototype.**
    If dynamic similarity is achieved (e.g., $Re_m = Re_p$), it means the force balance is the same. This implies that dimensionless force coefficients, like the drag coefficient $C_D$, will be identical for both.
    $$
    C_D = \frac{F_D}{\frac{1}{2}\rho V^2 A}
    $$
    Since $C_{D,m} = C_{D,p}$, we can measure the drag force $F_{D,m}$ on the model and then calculate the drag force on the prototype:
    $$
    F_{D,p} = F_{D,m} \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{V_p}{V_m} \right)^2 \left( \frac{A_p}{A_m} \right)
    $$
    This equation is the practical payoff of the entire theory.

## Worked example
**Problem:** A submarine is 100 m long and will travel at 15 m/s in seawater ($\rho = 1025 \text{ kg/m}^3, \mu = 1.07 \times 10^{-3} \text{ Pa}\cdot\text{s}$). A 1/40th scale model is to be tested in a freshwater wind tunnel ($\rho = 998 \text{ kg/m}^3, \mu = 1.00 \times 10^{-3} \text{ Pa}\cdot\text{s}$). (a) What speed must the water in the tunnel have to achieve dynamic similarity? (b) If the drag force on the model is measured to be 2700 N, what is the drag force on the full-scale submarine?

**Solution:**
Let subscript 'p' denote the prototype (submarine) and 'm' denote the model.

**(a) Find the required model velocity.**
For dynamic similarity, we must match the Reynolds number.
$$
Re_p = Re_m
$$
$$
\frac{\rho_p V_p L_p}{\mu_p} = \frac{\rho_m V_m L_m}{\mu_m}
$$
We are given:
- $L_p = 100$ m
- $V_p = 15$ m/s
- $\rho_p = 1025$ kg/m$^3$
- $\mu_p = 1.07 \times 10^{-3}$ Pa$\cdot$s
- $L_m = L_p / 40 = 100 / 40 = 2.5$ m
- $\rho_m = 998$ kg/m$^3$
- $\mu_m = 1.00 \times 10^{-3}$ Pa$\cdot$s

We need to solve for $V_m$:
$$
V_m = V_p \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{L_p}{L_m} \right) \left( \frac{\mu_m}{\mu_p} \right)
$$
$$
V_m = (15 \text{ m/s}) \left( \frac{1025}{998} \right) \left( 40 \right) \left( \frac{1.00 \times 10^{-3}}{1.07 \times 10^{-3}} \right)
$$
$$
V_m = (15) \times (1.027) \times (40) \times (0.9346) \approx 574.5 \text{ m/s}
$$
This is an extremely high speed, highlighting a practical challenge of similarity testing.

**(b) Find the prototype drag force.**
Since $Re_p = Re_m$, dynamic similarity is achieved, which means the drag coefficients are equal.
$$
C_{D,p} = C_{D,m}
$$
$$
\frac{F_{D,p}}{\frac{1}{2}\rho_p V_p^2 A_p} = \frac{F_{D,m}}{\frac{1}{2}\rho_m V_m^2 A_m}
$$
The frontal area $A$ scales with length squared, so $A_p/A_m = (L_p/L_m)^2 = 40^2 = 1600$.
Solving for the prototype drag force, $F_{D,p}$:
$$
F_{D,p} = F_{D,m} \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{V_p}{V_m} \right)^2 \left( \frac{A_p}{A_m} \right)
$$
$$
F_{D,p} = (2700 \text{ N}) \left( \frac{1025}{998} \right) \left( \frac{15}{574.5} \right)^2 \left( 1600 \right)
$$
$$
F_{D,p} = (2700) \times (1.027) \times (0.0261)^2 \times (1600)
$$
$$
F_{D,p} = (2700) \times (1.027) \times (6.81 \times 10^{-4}) \times (1600) \approx 3020 \text{ N}
$$

**Reflection:** Step (a) used the core principle of dynamic similarity: matching the governing dimensionless number ($Re$). Step (b) used the consequence of that similarity: the dimensionless force coefficients are equal, allowing us to scale the measured force from the model back to the prototype. Notice we did not need to calculate the actual value of $Re$ or $C_D$.

## Diagrams
A diagram illustrating geometric and kinematic similarity for flow over an airfoil.

```text
Prototype (p):
        V_p -->
      . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Streamlines
     .                                                         .
    .                                                           .
   .         ***************                                     .
  .      ****               ****                                  .
 .     **          P_1         **                                  .
.     *                         *                                  .
. -----*-----------------------*---------------------------------------
      L_p

Model (m):
        V_m -->
      . . . . . . . . . . . . . . . Streamlines
     .                             .
    .        *******               .
   .      ***   P_1'  ***           .
  .     **             **           .
 . -----*---------------*----------------
      L_m

Geometric Similarity: L_p / L_m = constant. The shape is identical, just scaled.
Kinematic Similarity: If V(P_1) is the velocity vector at point P_1 on the prototype,
and V(P_1') is the velocity at the corresponding point P_1' on the model,
then V(P_1) / V(P_1') = constant for all corresponding points.
This means the streamline patterns are geometrically similar.
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a Russian nesting doll set, but of airplanes. The largest doll is the real plane (Prototype). Each smaller doll is a Model.
    *   **Geometric:** They all have the exact same shape, just different sizes.
    *   **Kinematic:** If you could see the air flowing around them, the streamline patterns would be identical, just shrunk down for the smaller dolls.
    *   **Dynamic:** To make the patterns identical, the "forces" holding the patterns in place must be balanced in the same way. This balance is captured by the Reynolds number. The story is **G**iant **K**inetic **D**olls. (Geometric $\rightarrow$ Kinematic $\rightarrow$ Dynamic).

2.  **Formulas to Overlearn (DO NOT PARAPHRASE):**
    *   Reynolds Number: $$Re = \frac{\rho V L}{\mu}$$
    *   Force Coefficient (e.g., Drag): $$C_F = \frac{F}{\frac{1}{2}\rho V^2 A}$$

3.  **Spaced Repetition Schedule:** Review this material from scratch on day 1, day 3, day 7, day 16, and day 35. On review days, try to re-derive the Reynolds number from the Navier-Stokes equation.

4.  **First Principles Pathway:** If you forget everything, remember this: the behavior of a fluid is governed by the Navier-Stokes equations (conservation of momentum). Dynamic similarity means two flows are governed by equations that are algebraically identical. You make them identical by non-dimensionalizing them. When you non-dimensionalize the incompressible Navier-Stokes equation, the term $\frac{\mu}{\rho V L}$ appears, which is $\frac{1}{Re}$. For the non-dimensional equations to be identical, this term must be the same for both the model and prototype. Thus, $Re_m = Re_p$.

## Common mistakes
1.  **Using the Wrong Fluid Properties:** In the worked example, students often mistakenly use the prototype fluid's density ($\rho_p$) when calculating the model's Reynolds number. Always be meticulous: $Re_m$ uses model properties ($\rho_m, V_m, L_m, \mu_m$), and $Re_p$ uses prototype properties.
2.  **Assuming Forces are Equal:** The most common error is to think that if $Re_m = Re_p$, then the drag force $F_{D,m}$ is somehow equal or directly proportional to $F_{D,p}$. This is false. It is the *dimensionless force coefficients* ($C_D$) that are equal. You must use the $C_D$ equality to scale the force correctly.
3.  **Ignoring Other Physics:** Reynolds similarity only guarantees similarity of inertial and viscous forces. If the flow is near or above the speed of sound, compressibility matters, and you must also match the Mach number ($Ma$). If the flow has a free surface (like a ship), gravity waves matter, and you must match the Froude number ($Fr$). Assuming $Re$ is the only god-term is a frequent oversimplification.

## Self-check
1.  A 1/50th scale model of an airfoil is created. If the chord length (a characteristic length) of the prototype is 2.5 meters, what is the chord length of the model in centimeters?
2.  A sphere of diameter 10 cm is tested in a high-speed wind tunnel with air at 20°C. The goal is to simulate the drag on a sphere of diameter 1 m moving through water at 20°C at 2 m/s. What is the required air speed in the wind tunnel? (You will need to look up the fluid properties for air and water at 20°C).
3.  You are tasked with designing a model test for a hydrofoil, a boat that flies on underwater wings. The full-scale hydrofoil will operate at high speed. What are the two primary dimensionless numbers you would need to match between your model and the prototype? Explain why each is necessary.