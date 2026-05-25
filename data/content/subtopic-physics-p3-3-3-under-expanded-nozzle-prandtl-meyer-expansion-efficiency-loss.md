## What it is
An under-expanded nozzle is one in which the pressure of the exhaust gas at the nozzle exit, $p_e$, is greater than the ambient pressure of the surrounding atmosphere, $p_a$. Because the gas is still at a higher pressure, it must continue to expand *outside* the physical nozzle until its pressure matches the ambient pressure. This external expansion occurs through a series of waves known as a Prandtl-Meyer expansion fan.

## Why it matters
This concept is fundamental to rocket engine design and performance analysis. A rocket's nozzle is typically optimized for a specific altitude (a specific $p_a$), but it must operate from sea level to vacuum. Understanding under-expansion is critical for calculating the actual thrust produced at lower altitudes and predicting the shape and behavior of the exhaust plume, which has implications for vehicle stability and base heating.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites:
*   **Compressible, Isentropic Flow:** The concepts of Mach number ($M$), stagnation properties (temperature $T_0$, pressure $p_0$), and the isentropic flow relations.
*   **Converging-Diverging Nozzles:** How a de Laval nozzle works, including the sonic condition at the throat ($M=1$) and supersonic expansion in the diverging section.
*   **The Rocket Thrust Equation:** You must be able to derive and interpret the full thrust equation, $F = \dot{m} u_e + (p_e - p_a) A_e$, distinguishing between momentum thrust and pressure thrust.

If any of these are weak, review them first. The logic here builds directly upon them.

## How to study it (step by step)
1.  **Revisit the Thrust Equation:** Write down the full thrust equation. Isolate the pressure thrust term, $(p_e - p_a) A_e$. For an under-expanded nozzle, what is the sign of this term? Convince yourself that while this term is positive, it signifies a non-optimal condition.
2.  **Define the Problem:** The flow exits at $p_e > p_a$ and $M_e > 1$. The gas must expand and turn to match $p_a$. Why can't this happen instantaneously? (Hint: Information in supersonic flow travels within a Mach cone).
3.  **Introduce the Prandtl-Meyer Fan:** Research the concept of a Prandtl-Meyer expansion fan. Understand it as a continuous series of isentropic expansion Mach waves that turn a supersonic flow around a convex corner. The outside edge of the nozzle exit acts as this "corner".
4.  **Derive the Prandtl-Meyer Function:** Work through the derivation of the Prandtl-Meyer function, $\nu(M)$. Start with the change in velocity across a single weak Mach wave and integrate to find the total turning angle for a given change in Mach number.
    $$ \nu(M) = \sqrt{\frac{\gamma+1}{\gamma-1}} \tan^{-1}\left(\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)}\right) - \tan^{-1}\left(\sqrt{M^2-1}\right) $$
5.  **Calculate the Plume Deflection:** Use the isentropic relations to find the final Mach number, $M_f$, that the flow must reach for its pressure to become $p_a$. Then, the total turning angle of the plume boundary, $\delta$, is simply $\delta = \nu(M_f) - \nu(M_e)$.
6.  **Connect to Efficiency Loss:** Reason about the thrust vector. The total momentum flux is conserved, but because the flow is turned outwards by an angle $\delta$, the axial component of the momentum is reduced. The lost axial momentum represents a thrust loss compared to an ideally expanded nozzle that directs all exhaust flow axially.

## Key ideas, with intuition
1.  **Pressure Matching is Inevitable:** A static fluid cannot sustain a pressure difference without a barrier. The exhaust gas, once it leaves the nozzle, is a fluid that must eventually come to equilibrium with the surrounding atmosphere. Since $p_e > p_a$, the gas *must* expand.
2.  **Supersonic Flow Turns by Expanding:** In supersonic flow ($M>1$), the fluid is "unaware" of obstacles downstream. To turn a corner, the flow expands via a series of Mach waves originating from the corner. This expansion drops the pressure, density, and temperature, but *increases* the Mach number and velocity. This is the Prandtl-Meyer expansion fan.
3.  **Thrust is a Vector:** The rocket only benefits from thrust directed along its axis of motion. The thrust equation $F = \dot{m} u_e + (p_e - p_a) A_e$ is a 1D simplification. When the flow expands outside the nozzle, it turns away from the axis. The velocity vector $\vec{u}_f$ after expansion is no longer purely axial. The axial thrust is proportional to $\vec{u}_f \cdot \hat{x}$, which is less than $|\vec{u}_f|$. This reduction is the efficiency loss. You didn't get the full benefit of accelerating the gas to its final velocity because some of that velocity is pointed sideways.

## Worked example
A rocket engine has a nozzle with an exit area $A_e=2.0 \, \text{m}^2$. It operates where the ambient pressure is $p_a = 50 \, \text{kPa}$. The exhaust gases, with $\gamma = 1.2$, exit the nozzle at $p_e = 100 \, \text{kPa}$ and Mach number $M_e = 3.0$. Calculate the angle $\delta$ through which the exhaust plume is deflected.

**Step 1: Identify the flow condition.**
We are given $p_e = 100 \, \text{kPa}$ and $p_a = 50 \, \text{kPa}$. Since $p_e > p_a$, the nozzle is under-expanded. The flow must expand externally until its pressure is $p_f = p_a$.

**Step 2: Find the final Mach number, $M_f$.**
The expansion is isentropic. We can use the isentropic pressure relation involving the Mach number. The stagnation pressure $p_0$ is constant throughout the expansion from the exit plane to the final state.
$$ \frac{p_0}{p} = \left(1 + \frac{\gamma-1}{2} M^2\right)^{\frac{\gamma}{\gamma-1}} $$
Since $p_0$ is the same for the exit state (e) and final state (f):
$$ p_e \left(1 + \frac{\gamma-1}{2} M_e^2\right)^{\frac{\gamma}{\gamma-1}} = p_f \left(1 + \frac{\gamma-1}{2} M_f^2\right)^{\frac{\gamma}{\gamma-1}} $$
Rearranging for the term with $M_f$:
$$ \left(1 + \frac{1.2-1}{2} M_f^2\right)^{\frac{1.2}{0.2}} = \frac{p_e}{p_f} \left(1 + \frac{1.2-1}{2} M_e^2\right)^{\frac{1.2}{0.2}} $$
$$ \left(1 + 0.1 M_f^2\right)^{6} = \frac{100}{50} \left(1 + 0.1 (3.0)^2\right)^{6} = 2 \left(1.9\right)^{6} = 94.19 $$
$$ 1 + 0.1 M_f^2 = (94.19)^{1/6} \approx 2.135 $$
$$ 0.1 M_f^2 = 1.135 \implies M_f^2 = 11.35 \implies M_f \approx 3.37 $$

**Step 3: Calculate the Prandtl-Meyer function values.**
Use the Prandtl-Meyer function $\nu(M)$ for $M_e$ and $M_f$. Note that angles must be in radians for the formula.
For $M_e = 3.0$ and $\gamma=1.2$:
$$ \nu(3.0) = \sqrt{\frac{2.2}{0.2}} \tan^{-1}\left(\sqrt{\frac{0.2}{2.2}(3^2-1)}\right) - \tan^{-1}\left(\sqrt{3^2-1}\right) $$
$$ \nu(3.0) = \sqrt{11} \tan^{-1}(\sqrt{0.727}) - \tan^{-1}(\sqrt{8}) \approx 3.317 \times 0.7056 - 1.231 \approx 1.11 \, \text{rad} \approx 63.6^\circ $$
For $M_f = 3.37$ and $\gamma=1.2$:
$$ \nu(3.37) = \sqrt{11} \tan^{-1}\left(\sqrt{\frac{0.2}{2.2}(3.37^2-1)}\right) - \tan^{-1}\left(\sqrt{3.37^2-1}\right) $$
$$ \nu(3.37) = \sqrt{11} \tan^{-1}(\sqrt{0.94}) - \tan^{-1}(\sqrt{10.35}) \approx 3.317 \times 0.77 - 1.269 \approx 1.28 \, \text{rad} \approx 73.3^\circ $$

**Step 4: Find the turning angle $\delta$.**
The total turning angle is the difference in the Prandtl-Meyer function values.
$$ \delta = \nu(M_f) - \nu(M_e) = 73.3^\circ - 63.6^\circ = 9.7^\circ $$

**Reflection:**
Each step builds on the last. Step 1 confirmed the physical regime. Step 2 used the isentropic relations (a prerequisite) to find the state of the gas after it finished expanding. Step 3 applied the key tool for this subtopic, the Prandtl-Meyer function, to translate Mach numbers into "turning potential". Step 4 combined these to find the final physical deflection angle. This deflection angle is directly related to the lost thrust.

## Diagrams

```text
       Nozzle Wall
      /
     /
    /____________________
   |                     |-----> Flow at M_e, p_e
   |_____________________|----->
    \                      
     \
      \
       Nozzle Wall

       <-- Rocket Body      Exhaust Plume -->


       Nozzle Exit Plane
       . . . . . . . . . . . . . . . . . . . . . . . .
      /____________________\ . . . . . . . . . . . . .
     |                     | \           .           .
     |      M_e > 1        |  \ <-- Prandtl-Meyer  .
     |      p_e > p_a      |   \    Expansion Fan  .
     |_____________________|    \          .      .
      \                      /     \         .    .
       . . . . . . . . . . ./        \        .   .
                           |           \       .  .
                           | Flow turns  \      . .
                           v by angle d   \     .
                                           \    .
                                            \   .  Flow at M_f, p_f=p_a
                                             \  .
                                              \.
```
The diagram shows the exhaust flow leaving the nozzle. Because $p_e > p_a$, the flow expands around the "corner" of the nozzle lip. This expansion happens through a fan of waves, turning the outer streamline by an angle $\delta$.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a crowded room ($p_e$) opening into an empty field ($p_a$). The people (gas molecules) don't just move straight out; they immediately spread out in all directions to fill the empty space. "Under-expanded" means the nozzle was too *small* for the job; it didn't let the crowd expand enough *inside*, so they spill out sideways *outside*.
2.  **Must-Know Formulas:**
    *   Thrust: $F = \dot{m} u_e + (p_e - p_a) A_e$. Know what each term means. For under-expanded, the pressure term is positive.
    *   Prandtl-Meyer Function: $\nu(M) = \sqrt{\frac{\gamma+1}{\gamma-1}} \tan^{-1}\left(\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)}\right) - \tan^{-1}\left(\sqrt{M^2-1}\right)$. You don't need to memorize the derivation on an exam, but you *must* know what it represents: the angle a supersonic flow turns through when expanding from $M=1$ to $M$. The turning angle between two states is $\delta = \nu(M_f) - \nu(M_e)$.
3.  **Spaced Repetition Schedule:** Review this material and re-work the example problem at **1 day, 3 days, 7 days, 16 days, 35 days**.
4.  **First Principles Pathway:** If you forget everything, rebuild from the conservation of momentum. For the Prandtl-Meyer function, recall it comes from analyzing the geometry of the velocity vector change ($d\vec{V}$) across a single Mach wave. The component of velocity change is normal to the velocity vector, leading to turning. Integrating this infinitesimal turning over a range of Mach numbers yields the function $\nu(M)$.

## Common mistakes
1.  **Sign Error:** Confusing under-expanded ($p_e > p_a$) with over-expanded ($p_e < p_a$). Remember: **Under**-expanded = **Under**-sized nozzle for the low ambient pressure.
2.  **Misinterpreting Pressure Thrust:** Seeing the positive $(p_e - p_a)A_e$ term and thinking under-expansion is beneficial. It is not. An ideal nozzle would have expanded the flow further *inside* the nozzle, converting that excess pressure into more kinetic energy (higher $u_e$) directed purely axially, yielding even greater total thrust.
3.  **Applying PM to Subsonic Flow:** The Prandtl-Meyer relations are only valid for supersonic flow ($M>1$). The terms inside the square roots become imaginary for $M<1$.
4.  **Angle Units:** The Prandtl-Meyer formula requires angles in radians for the $\tan^{-1}$ terms. Mixing degrees and radians in the calculation is a frequent source of error.

## Self-check
1.  A rocket ascends from sea level to vacuum. Describe when its nozzle is under-expanded, ideally expanded, and over-expanded. How does the shape of the exhaust plume change during ascent?
2.  For the worked example above, assume the mass flow rate is $\dot{m} = 150 \, \text{kg/s}$ and the exit velocity is $u_e = 2500 \, \text{m/s}$. Calculate the initial thrust at the exit plane. Qualitatively, how does the final axial thrust after external expansion compare to this value?
3.  A nozzle is designed to be perfectly expanded at an altitude where $p_a = 30 \, \text{kPa}$. If this same engine is test-fired in a facility where the chamber is evacuated to $p_a = 1 \, \text{kPa}$, is the flow under-expanded or over-expanded? What physical phenomena would you expect to see at the nozzle exit?