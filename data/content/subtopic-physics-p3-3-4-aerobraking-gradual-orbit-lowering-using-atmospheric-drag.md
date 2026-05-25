## What it is
Aerobraking is an orbital maneuver that uses the drag from a planet's atmosphere to gradually reduce the energy of an orbit. Instead of firing a rocket engine, a spacecraft performs a series of carefully controlled passes through the upper atmosphere at its orbit's lowest point (periapsis). Each pass converts some of the spacecraft's kinetic energy into heat, lowering the orbit's highest point (apoapsis).

## Why it matters
Aerobraking is a cornerstone of modern interplanetary mission design, especially for orbiters at Mars. It drastically reduces the amount of propellant a spacecraft must carry, as atmospheric drag does the work of a large rocket engine. This mass saving allows for more science instruments or a smaller, cheaper launch vehicle, directly impacting mission feasibility and cost.

## When to study it
Before tackling aerobraking, you must have a solid grasp of these prerequisites:
1.  **Orbital Mechanics:** The vis-viva equation, the specific orbital energy equation ($\mathcal{E} = -\frac{\mu}{2a}$), and the definitions of orbital elements, particularly semi-major axis ($a$), apoapsis radius ($r_a$), and periapsis radius ($r_p$).
2.  **Atmospheric Models:** The exponential atmosphere model, $\rho(h) = \rho_0 e^{-h/H}$, where $\rho$ is density, $h$ is altitude, and $H$ is the scale height.
3.  **Aerodynamics:** The basic drag equation, $F_D = \frac{1}{2} \rho v^2 C_D A$.

If these are not familiar, master them first. Aerobraking combines these three topics.

## How to study it (step by step)
1.  **Isolate the action:** Realize that for a highly elliptical orbit, atmospheric density is only significant for a very short period around periapsis. This allows us to model the complex drag force as a single, instantaneous impulse, $\Delta v$, that occurs at periapsis and opposes the velocity vector.
2.  **Calculate the velocity change:** For a single pass, approximate the change in velocity $\Delta v$ using the work-energy theorem. The work done by drag $W_D$ equals the change in kinetic energy. $W_D = \int F_D ds \approx F_{D,avg} \cdot L$, where $L$ is the effective path length through the atmosphere. This gives $\Delta(\frac{1}{2}mv^2)$, from which you can find $\Delta v$.
3.  **Connect $\Delta v$ to orbital energy:** The specific orbital energy is $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$. At periapsis, a change in velocity $\Delta v_p$ leads to a change in energy $\Delta \mathcal{E}$. Derive this: $\mathcal{E}_{new} = \frac{(v_p - \Delta v_p)^2}{2} - \frac{\mu}{r_p}$.
4.  **Connect energy to orbit shape:** Use the fundamental relation $\mathcal{E} = -\frac{\mu}{2a}$. The change in energy $\Delta \mathcal{E}$ you just found directly causes a change in the semi-major axis, $\Delta a$. Find the expression for the new semi-major axis, $a_{new}$.
5.  **Find the new apoapsis:** The periapsis radius $r_p$ remains essentially unchanged by the impulse. Use the relation $2a = r_a + r_p$. Since you know $a_{new}$ and $r_p$, calculate the new apoapsis radius, $r_{a, new}$. This is the primary goal of the maneuver.
6.  **Consider the limits:** What stops us from making a very deep pass for a large $\Delta v$? The two main constraints are peak heating rate and peak dynamic pressure ($\frac{1}{2}\rho v^2$). These factors can damage the spacecraft and must be kept within safe limits, which dictates the lowest safe periapsis altitude.

## Key ideas, with intuition
1.  **Impulse at Periapsis:** The atmosphere is vanishingly thin except at the very bottom of the orbit. All the braking force is applied in a short, intense burst at periapsis. This simplifies the problem immensely: we don't need to integrate over the whole orbit, just analyze the velocity change at this single point.
2.  **Slowing Down Lowers the High Point:** This is a core, non-intuitive principle of orbital mechanics. Applying a braking force (retrograde thrust or drag) at one point in an orbit causes the altitude at the opposite point of the orbit to decrease. Aerobraking happens at periapsis (the low point), so its effect is to lower the apoapsis (the high point).
    ```text
    Initial Orbit: High Apoapsis
           /-----------\
          /             \
         /               \
        * (Planet)        \
       / \                 \
      | P |-----------------A (Apoapsis)
       \ /
        (Drag pass at Periapsis)
    
    Final Orbit: Lower Apoapsis
           /-----\
          /       \
         /         \
        * (Planet)  \
       / \           A' (New, lower Apoapsis)
      | P |---------/
       \ /
    ```
3.  **Energy Governs Size:** The size of an orbit, defined by its semi-major axis $a$, is determined *only* by its total energy $\mathcal{E}$. Drag is a non-conservative force that removes energy from the system.
    $$ \mathcal{E} = -\frac{\mu}{2a} $$
    Since drag does negative work, $\Delta\mathcal{E}$ is negative. For $\mathcal{E}$ to become more negative, the semi-major axis $a$ must decrease. This is the fundamental physics driving the process.

## Worked example
A 1500 kg Mars orbiter is in an initial orbit with a periapsis altitude of 150 km and an apoapsis altitude of 20,000 km. The spacecraft has a drag coefficient $C_D = 2.2$ and a cross-sectional area $A = 15 \, \text{m}^2$. Calculate the apoapsis altitude after one pass.

**Mars data:**
- Gravitational parameter, $\mu = 4.2828 \times 10^{13} \, \text{m}^3/\text{s}^2$
- Radius of Mars, $R_M = 3390 \, \text{km}$
- Atmospheric density at 150 km, $\rho_p \approx 2.5 \times 10^{-9} \, \text{kg}/\text{m}^3$

**Step 1: Find initial orbital parameters.**
- Periapsis radius: $r_p = R_M + 150 \, \text{km} = 3540 \, \text{km} = 3.54 \times 10^6 \, \text{m}$
- Apoapsis radius: $r_a = R_M + 20000 \, \text{km} = 23390 \, \text{km} = 2.339 \times 10^7 \, \text{m}$
- Semi-major axis: $a = \frac{r_a + r_p}{2} = \frac{2.339 \times 10^7 + 3.54 \times 10^6}{2} = 1.3465 \times 10^7 \, \text{m}$

**Step 2: Find velocity at periapsis using the vis-viva equation.**
$$ v_p^2 = \mu \left( \frac{2}{r_p} - \frac{1}{a} \right) $$
$$ v_p^2 = 4.2828 \times 10^{13} \left( \frac{2}{3.54 \times 10^6} - \frac{1}{1.3465 \times 10^7} \right) = 2.098 \times 10^7 \, (\text{m/s})^2 $$
$$ v_p = 4580 \, \text{m/s} $$

**Step 3: Approximate the velocity change $\Delta v_p$.**
The change in energy equals the work done by drag. The force of drag at periapsis is $F_D = \frac{1}{2} \rho_p v_p^2 C_D A$.
$$ F_D = \frac{1}{2} (2.5 \times 10^{-9}) (4580)^2 (2.2)(15) = 0.86 \, \text{N} $$
To find the total impulse, we need an effective path length. A reasonable estimate is twice the atmospheric scale height, which for Mars at this altitude is $H \approx 10$ km. So, $L \approx 20$ km.
The work done is $W_D = -F_D \cdot L = -0.86 \cdot (20 \times 10^3) = -17200 \, \text{J}$.
The change in kinetic energy is $\Delta K = W_D$.
$$ \frac{1}{2} m v_{p,new}^2 - \frac{1}{2} m v_p^2 = W_D $$
$$ \frac{1}{2} m (v_p - \Delta v_p)^2 - \frac{1}{2} m v_p^2 \approx \frac{1}{2} m (v_p^2 - 2v_p\Delta v_p) - \frac{1}{2} m v_p^2 = -m v_p \Delta v_p $$
So, $-m v_p \Delta v_p = W_D \implies \Delta v_p = -\frac{W_D}{m v_p} = \frac{17200}{(1500)(4580)} = 2.5 \, \text{m/s} $.
The velocity decreases by 2.5 m/s.

**Step 4: Calculate the new orbit from the new velocity.**
- New periapsis velocity: $v_{p,new} = 4580 - 2.5 = 4577.5 \, \text{m/s}$
- New specific energy: $\mathcal{E}_{new} = \frac{v_{p,new}^2}{2} - \frac{\mu}{r_p} = \frac{(4577.5)^2}{2} - \frac{4.2828 \times 10^{13}}{3.54 \times 10^6} = -1.623 \times 10^6 \, \text{J/kg}$
- New semi-major axis: $a_{new} = -\frac{\mu}{2\mathcal{E}_{new}} = -\frac{4.2828 \times 10^{13}}{2(-1.623 \times 10^6)} = 1.3194 \times 10^7 \, \text{m}$

**Step 5: Find the new apoapsis altitude.**
- $2a_{new} = r_{a,new} + r_p \implies r_{a,new} = 2a_{new} - r_p$
- $r_{a,new} = 2(1.3194 \times 10^7) - 3.54 \times 10^6 = 2.2848 \times 10^7 \, \text{m}$
- New apoapsis altitude: $h_{a,new} = r_{a,new} - R_M = 22848 \, \text{km} - 3390 \, \text{km} = 19458 \, \text{km}$.

**Reflection:** Each step built on the last. We used the initial orbit to find the conditions at periapsis (Step 1-2). We used those conditions to calculate the effect of drag (Step 3). Finally, we used that small change in velocity to propagate its effect to the entire orbit shape, finding the new, lower apoapsis (Step 4-5). The key was the impulse approximation at periapsis.

## Diagrams
```text
Diagram 1: The Aerobraking Process

               Before Aerobraking Pass
           /---------------------------\
          /                             \
         /                               \
        * (Planet)                        \
       / \                                 \
      | P |---------------------------------A (Initial Apoapsis)
       \ /
        (Atmosphere)

               After Aerobraking Pass
           /------------------\
          /                    \
         /                      \
        * (Planet)               \
       / \                        A' (New, Lower Apoapsis)
      | P |----------------------/
       \ /
        (Drag at P lowers A)
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture "skipping" a spacecraft off the atmosphere like a flat stone on a lake. Each skip is a pass. The stone doesn't sink (re-enter) immediately. Each time it hits the water (atmosphere), it loses some speed, and its next arc is lower and shorter. Aerobraking "skips" the spacecraft off the atmosphere to methodically shrink the high point of its orbital arc.
2.  **Must-learn formulas:**
    $$ F_D = \frac{1}{2} \rho v^2 C_D A \quad \text{(The cause)} $$
    $$ \mathcal{E} = -\frac{\mu}{2a} \quad \text{(The consequence)} $$
    $$ v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right) \quad \text{(The link between them)} $$
3.  **Spaced-repetition schedule:** Review these formulas and the "skipping stone" visual in 1 day, 3 days, 7 days, 16 days, and 35 days.
4.  **First principles pathway:** If you forget, rebuild it.
    - Drag is a force, $\vec{F}_D$, that opposes velocity.
    - Forces do work: $W_D = \int \vec{F}_D \cdot d\vec{s}$. Since the force opposes displacement, $W_D < 0$.
    - The Work-Energy theorem states $\Delta E_{total} = W_{non-conservative}$. Here, $W_{non-conservative} = W_D$.
    - So, the total orbital energy $E$ must decrease.
    - The formula for orbital energy is $E = -\frac{G M m}{2a}$. For $E$ to decrease (become more negative), the semi-major axis $a$ must get smaller.
    - The maneuver happens at periapsis, $r_p$. Since $2a = r_a + r_p$, if $a$ decreases and $r_p$ is constant, $r_a$ must decrease. You have just re-derived the entire principle.

## Common mistakes
1.  **Modeling as a continuous spiral:** Aerobraking is not a smooth, continuous orbital decay. It's a sequence of many distinct, stable elliptical orbits, where each orbit's apoapsis is slightly lower than the previous one.
2.  **Thinking periapsis drops:** The drag happens at periapsis, but the main effect is on apoapsis. Mission controllers carefully manage the periapsis altitude, often performing small thruster burns at apoapsis to raise it if it drops too low.
3.  **Using constant atmospheric density:** The exponential nature of the atmosphere is critical. A small change in periapsis altitude causes a large change in density and thus in drag and heating. Using a single average density is a poor approximation.
4.  **Forgetting about heat:** The orbital energy lost doesn't vanish; it's converted into thermal energy. The maximum allowable temperature of the spacecraft's solar panels or main antenna often sets the limit for the minimum periapsis altitude, constraining the entire process.

## Self-check
1.  A spacecraft in a 24-hour elliptical orbit undergoes one aerobraking pass. Is its new orbital period longer or shorter than 24 hours? Justify your answer using Kepler's Third Law.
2.  A mission planner has two options for an aerobraking campaign: (A) many passes with a high periapsis altitude, or (B) fewer passes with a lower periapsis altitude. What is the primary trade-off between these two strategies in terms of mission duration and risk to the spacecraft?
3.  Starting with the specific orbital energy equation, $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$, and the relation $\mathcal{E} = -\frac{\mu}{2a}$, derive an expression for the change in semi-major axis, $\Delta a$, resulting from a small change in velocity, $\Delta v_p$, at periapsis. Your answer should be in terms of $a$, $r_p$, $v_p$, and $\Delta v_p$.