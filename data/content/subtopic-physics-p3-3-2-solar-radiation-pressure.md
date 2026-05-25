## What it is
Solar radiation pressure (SRP) is the mechanical pressure exerted upon any surface due to the exchange of momentum between the object and electromagnetic radiation. In space, this is the tiny but relentless force exerted by photons from the Sun as they strike a spacecraft's surface. This force is always directed away from the Sun.

## Why it matters
For most large, dense satellites in low Earth orbit, SRP is a minor perturbation. However, for long-duration missions, interplanetary travel, or objects with a high area-to-mass ratio (like solar sails or defunct satellites), this small force accumulates over time, significantly altering trajectories. Accurate modeling of SRP is critical for precision orbit determination, station-keeping, and designing missions that use it for propulsion (solar sailing).

## When to study it
You should be comfortable with the following before tackling this topic:
*   **Classical Mechanics:** Newton's Second Law ($ \vec{F} = d\vec{p}/dt $), conservation of momentum.
*   **Electromagnetism:** The concept of a photon, and the relationship between a photon's energy ($E$) and momentum ($p$), specifically $p = E/c$.
*   **Orbital Mechanics:** The basics of Keplerian orbits and the concept of orbital perturbations (forces other than the primary gravitational body).

If you are not solid on the momentum of a photon, review that first. The entire concept hinges on it.

## How to study it (step by step)
1.  **Start with First Principles:** Re-derive the momentum of a photon. Recall from special relativity that $E^2 = (pc)^2 + (m_0c^2)^2$. For a massless photon ($m_0=0$), this simplifies to $E = pc$, or $p = E/c$. This is the foundation.
2.  **Derive Pressure for Perfect Absorption:** Consider a stream of photons hitting a perfectly black surface of area $A$ perpendicular to the stream. The energy per unit time per unit area is the solar flux, $S$. The force is the rate of momentum transfer: $F = d p/d t$. In time $\Delta t$, the energy absorbed is $E = S A \Delta t$. The momentum absorbed is $p = E/c = (S A \Delta t)/c$. The force is therefore $F = p/\Delta t = SA/c$. The pressure is $P = F/A = S/c$.
3.  **Derive Pressure for Perfect Reflection:** Now consider a perfectly reflective (mirror) surface. The photons arrive with momentum $p_{initial}$ and leave with momentum $p_{final} = -p_{initial}$. The total change in momentum is $\Delta p = p_{final} - p_{initial} = (-p_{initial}) - p_{initial} = -2p_{initial}$. The magnitude of the momentum transferred to the surface is twice that of the absorption case. Therefore, the force is $F = 2SA/c$ and the pressure is $P = 2S/c$.
4.  **Generalize the Model:** Real surfaces are neither perfectly absorbing nor perfectly reflecting. We introduce a coefficient of reflection, $C_R$, which combines factors like specular reflection, diffuse reflection, and absorption. The force can then be modeled as $F = \frac{S}{c} C_R A_{\perp}$, where $A_{\perp}$ is the cross-sectional area perpendicular to the Sun. $C_R$ typically ranges from 1 (perfect absorption) to 2 (perfect reflection).
5.  **Solve a Problem:** Find the solar constant $S$ at 1 AU (approx. $1361 \text{ W/m}^2$) and the speed of light $c$. Calculate the SRP force on a 10 m$^2$ solar panel with $C_R = 1.4$ in Earth orbit. Then, calculate the resulting acceleration for a 500 kg satellite.

## Key ideas, with intuition
1.  **Light is a Stream of Particles:** For this topic, it's most intuitive to think of light not as a wave, but as a constant stream of tiny "bullets" (photons). Each photon carries a tiny amount of momentum. The collective impact of trillions of these photons per second creates a steady force.
2.  **Bouncing is Better than Sticking:** A photon that reflects off a surface imparts more momentum than one that is absorbed. This is a direct analogy to classical collisions. A ball that bounces off a wall (elastic collision) exerts a greater force on the wall than a clay ball that sticks to it (inelastic collision) because the change in the ball's momentum is larger.
    $$ \Delta p_{\text{absorb}} = p_{\text{final}} - p_{\text{initial}} = 0 - p = -p $$
    $$ \Delta p_{\text{reflect}} = p_{\text{final}} - p_{\text{initial}} = (-p) - p = -2p $$
3.  **The Force is an Inverse-Square Law:** The Sun's energy spreads out spherically. The solar flux $S$ decreases with the square of the distance from the Sun, just like gravity. Therefore, the SRP force is not constant throughout the solar system.
    $$ S(r) = S_0 \left( \frac{r_0}{r} \right)^2 $$
    Where $S_0$ is the known flux at a reference distance $r_0$ (e.g., 1 AU).
4.  **Area-to-Mass Ratio Rules All:** The thing that determines how much an orbit is perturbed is acceleration ($a = F/m$), not force. For SRP, the force is proportional to area ($F \propto A$) and the acceleration is proportional to the area-to-mass ratio.
    $$ a_{SRP} = \frac{F_{SRP}}{m} \propto \frac{A}{m} $$
    This is why a large, light solar sail is affected dramatically, while a small, dense tungsten sphere is barely nudged.

## Worked example
**Problem:** A cubesat with a mass of $m = 4$ kg is in orbit around Earth at 1 AU from the Sun. One face, with an area of $A = 0.01 \text{ m}^2$ (10cm x 10cm), is pointing directly at the Sun. This face has a coefficient of reflection $C_R = 1.2$ (partially absorbing, partially reflecting). Calculate the acceleration of the cubesat due to solar radiation pressure.

**Given:**
*   Solar flux at 1 AU: $S \approx 1361 \text{ W/m}^2$
*   Speed of light: $c \approx 3 \times 10^8 \text{ m/s}$
*   Mass: $m = 4 \text{ kg}$
*   Area facing the Sun: $A = 0.01 \text{ m}^2$
*   Coefficient of reflection: $C_R = 1.2$

**Steps:**

1.  **Calculate the base radiation pressure for perfect absorption.**
    This is the fundamental pressure unit we'll scale.
    $$ P_{abs} = \frac{S}{c} = \frac{1361 \text{ W/m}^2}{3 \times 10^8 \text{ m/s}} \approx 4.54 \times 10^{-6} \text{ N/m}^2 $$
    *Why this step?* It establishes the fundamental physical constant for pressure at this distance from the sun.

2.  **Calculate the total force on the surface.**
    We use the generalized "cannonball" model, which incorporates the surface properties via $C_R$.
    $$ F_{SRP} = P_{abs} \cdot C_R \cdot A = (4.54 \times 10^{-6} \text{ N/m}^2) \cdot (1.2) \cdot (0.01 \text{ m}^2) $$
    $$ F_{SRP} \approx 5.45 \times 10^{-8} \text{ N} $$
    *Why this step?* We scale the base pressure by the area and the surface properties to find the total force acting on the satellite.

3.  **Calculate the resulting acceleration.**
    Using Newton's Second Law, $a = F/m$.
    $$ a_{SRP} = \frac{F_{SRP}}{m} = \frac{5.45 \times 10^{-8} \text{ N}}{4 \text{ kg}} \approx 1.36 \times 10^{-8} \text{ m/s}^2 $$
    *Why this step?* In orbital mechanics, acceleration is the key quantity that describes how the velocity vector (and thus the orbit) changes over time.

**Reflection:** The final acceleration is tiny—about one ten-billionth of Earth's gravity. However, this force is constant and unidirectional (relative to the Sun). Over a year, this small acceleration can change a satellite's velocity by several meters per second, which is a significant change for precision orbits.

## Diagrams

**Diagram 1: Photon Momentum Transfer at a Surface**
This diagram shows a single photon's momentum vector interacting with a surface. The angle of incidence is $\theta$ with respect to the surface normal $\hat{n}$.

```text
       SUN ----> \       /
       LIGHT     \     /
                  \   /  Reflected Photon
       Incident    \ /   (momentum p_r)
       Photon       V
       (momentum p_i)
       ------------------ Surface
                  |
                  | Absorbed Photon
                  | (momentum transferred)
                  V

       <-- p_i_normal -->
       <---------------->
       p_r_normal - p_i_normal = Total normal momentum change
```
*Description:* For a more precise vector diagram, draw a surface with its normal vector $\hat{n}$ pointing up. An incident light ray vector $\hat{s}$ points down and to the right, hitting the surface at an angle $\theta$ to the normal. The reflected ray points up and to the right, also at an angle $\theta$. The force vector on the surface points down and to the left, opposite the change in the photon's momentum.

**Diagram 2: SRP as an Orbital Perturbation**
This shows how the SRP force vector behaves over an orbit.

```text
                SUN (far away)
      ---->     ---->     ---->     ---->
      ---->     ---->     ---->     ---->
      ---->     ---->     ---->     ---->

                    /-------\
                   /         \
                  |     o     |   <-- Satellite
                  |   EARTH   |
                   \         /
                    \-------/
                       ^
                       | F_srp (always anti-sunward)
```
*Description:* The Sun is far to the left, so all incoming rays are parallel. The Earth is at the center. A satellite is shown in a circular orbit around the Earth. At every point in its orbit (when not in Earth's shadow), the force vector $\vec{F}_{SRP}$ on the satellite is a horizontal arrow pointing to the right, away from the Sun. This illustrates that SRP is a non-central force, unlike Earth's gravity which always points toward the center.

## Memory technique — remember this forever
1.  **The Story:** Imagine the Sun is a giant cosmic **S**pray can, shooting a constant stream of photons. The pressure it creates is simply the **S**pray's intensity divided by how fast it travels (**c**). A black t-shirt (**absorption**) just gets wet, but a mirror (**reflection**) throws the spray right back, giving you a double push. The force is this pressure times the **A**rea you expose.
2.  **Must-Know Formulas:**
    *   Pressure for perfect absorption: $$ P = \frac{S}{c} $$
    *   Force (cannonball model): $$ F_{SRP} = \frac{S}{c} C_R A_{\perp} $$
    *   Solar flux variation: $$ S(r) = S_0 \left(\frac{r_0}{r}\right)^2 $$
3.  **Spaced Repetition Schedule:** Review your notes and re-derive the force equation from $p=E/c$ on this schedule:
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 1 week (7 days)
    *   In 2 weeks (16 days)
    *   In 1 month (35 days)
4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Photons have momentum: $p = E/c$.
    *   Force is the rate of momentum change: $F = dp/dt$.
    *   Intensity (Flux) $S$ is energy per area per time: $S = \frac{E}{A \cdot t}$.
    *   So, energy delivered in time $t$ is $E = S \cdot A \cdot t$.
    *   Momentum delivered in time $t$ is $p = (S \cdot A \cdot t) / c$.
    *   Force is $F = p/t = (S \cdot A)/c$. This is the formula for perfect absorption. The general case just adds a scaling factor $C_R$.

## Common mistakes
*   **Forgetting the factor of 2 for reflection:** Students often calculate pressure as $S/c$ for all cases. Remember, bouncing imparts double the momentum of sticking. $C_R$ is between 1 and 2, not 0 and 1.
*   **Ignoring the angle of incidence:** The force depends on the area *projected* perpendicular to the sun, $A_{\perp} = A \cos\theta$. A panel angled away from the sun intercepts fewer photons and thus feels less force.
*   **Assuming constant force:** The SRP force weakens with the square of the distance from the Sun. A probe going to Jupiter feels much less SRP than one going to Venus. Also, the force disappears instantly when the spacecraft enters a planet's shadow (eclipse).
*   **Confusing Force and Acceleration:** The largest satellite doesn't necessarily experience the largest *perturbation*. It's the acceleration ($F/m$) that matters, so the area-to-mass ratio is the critical parameter.

## Self-check
1.  A flat, perfectly black ($C_R=1$) solar sail with area $A = 100 \text{ m}^2$ is at 1 AU, facing the Sun. What is the magnitude of the SRP force on it?
2.  The same sail is now tilted so that its surface normal makes a $60^\circ$ angle with the direction of the Sun. What is the magnitude of the force on the sail? What is the direction of this force? (Hint: The force is exerted perpendicular to the surface for a simple model).
3.  A spherical spacecraft with radius $R=1$ m and mass $m=500$ kg travels from Earth (1 AU) to Mars (1.52 AU). Its surface has a uniform $C_R = 1.4$. By what percentage does the SRP *acceleration* it experiences decrease during its journey?