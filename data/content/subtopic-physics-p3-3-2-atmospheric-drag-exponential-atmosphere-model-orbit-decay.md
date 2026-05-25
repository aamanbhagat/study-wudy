## What it is
Atmospheric drag is the force exerted by air molecules on a satellite, opposing its motion. The exponential atmosphere model is a first-order approximation stating that air density decreases exponentially with altitude. Orbit decay is the gradual, spiraling descent of a satellite caused by the continuous energy loss from this drag.

## Why it matters
This is the primary factor determining the operational lifetime of any satellite in Low Earth Orbit (LEO), from the International Space Station to Starlink constellations. Understanding decay is critical for mission planning, collision avoidance with space debris, and predicting when and where an object will re-enter the atmosphere. It's also harnessed for aerobraking maneuvers, using a planet's atmosphere to decelerate a spacecraft and save propellant.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Newtonian Gravity:** The inverse-square law, $F_g = \frac{GMm}{r^2}$.
2.  **Orbital Energy:** The total energy of an orbit, $E = \frac{1}{2}mv^2 - \frac{GMm}{r}$, and its specific form for circular orbits, $E = -\frac{GMm}{2r}$.
3.  **Basic Fluid Dynamics:** The standard drag equation, $F_D = \frac{1}{2} \rho v^2 C_D A$.
4.  **Elementary Calculus:** Basic differentiation and integration, especially with exponential functions.

If these are not solid, review them first. We will build directly upon them.

## How to study it (step by step)
1.  **Isolate the Drag Force:** Write down the standard drag equation $F_D = \frac{1}{2} \rho v^2 C_D A$. Define each term for a satellite: $\rho$ is the atmospheric density, $v$ is the orbital velocity, $C_D$ is the dimensionless drag coefficient (typically ~2.2 for satellites), and $A$ is the cross-sectional area perpendicular to the velocity vector.
2.  **Model the Atmosphere:** Write down the exponential atmosphere model: $\rho(h) = \rho_0 e^{-h/H}$. Here, $h$ is the altitude above a reference surface, $\rho_0$ is the known density at that reference altitude, and $H$ is the *scale height*. Intuitively, $H$ is the vertical distance over which the density drops by a factor of $e \approx 2.718$.
3.  **Calculate Energy Loss per Orbit:** Drag is a non-conservative force that does negative work. The work done by drag over one nearly circular orbit is $W_D = \vec{F}_D \cdot \vec{d}$. Since $\vec{F}_D$ is anti-parallel to the velocity vector $\vec{v}$, this simplifies to $W_D \approx -F_D \times (\text{distance of one orbit}) = -F_D (2\pi r)$. This work equals the change in the orbit's total energy, $\Delta E_{orbit}$.
4.  **Relate Energy Loss to Altitude Loss:** For a circular orbit, total energy is $E = -\frac{GMm}{2r}$. Take the differential: $dE = \frac{GMm}{2r^2} dr$. For a small change, we can approximate $\Delta E \approx \frac{GMm}{2r^2} \Delta r$.
5.  **Combine and Solve:** Equate the results from steps 3 and 4: $\Delta E_{orbit} = W_D$.
    $$ \frac{GMm}{2r^2} \Delta r_{orbit} \approx -F_D (2\pi r) $$
    Substitute $F_D$ from step 1 and solve for $\Delta r_{orbit}$, the altitude lost per orbit.
6.  **Analyze the "Drag Paradox":** As the satellite's altitude $r$ decreases, its total energy $E$ becomes more negative (it loses energy). However, the orbital velocity for a circular orbit is $v = \sqrt{GM/r}$. As $r$ decreases, $v$ *increases*. Meditate on this: drag makes the satellite speed up. The loss in potential energy is greater than the work done by drag, with the difference being converted into kinetic energy.

## Key ideas, with intuition
1.  **Atmosphere is a "Hill", Not a "Wall":** The atmosphere doesn't just stop. It fades away exponentially. The scale height, $H$, defines the "steepness" of this fade. A planet with a hot, lightweight upper atmosphere (like Hydrogen) will have a large scale height, meaning its atmosphere extends very far.
2.  **The Ballistic Coefficient:** We can group the satellite's properties into a single term called the ballistic coefficient, $B = \frac{C_D A}{m}$. The drag force is proportional to $B$. To minimize drag and maximize orbital lifetime, you want a low ballistic coefficient: be heavy ($m$ large), small ($A$ small), and aerodynamically slick ($C_D$ small). This is why a cannonball stays in the air longer than a feather.
    $$ F_D = \frac{1}{2} \rho v^2 \left( \frac{m}{B} \right) \quad \text{(This form is often used)} $$
3.  **The Drag Paradox:** This is the most crucial intuition. Drag removes energy from the orbit, causing the satellite to fall to a lower altitude. At this lower altitude, the gravitational potential is lower, and to maintain a stable orbit, the satellite must move faster.
    $$ \text{Energy Loss (from Drag)} \rightarrow \text{Altitude Decrease} \rightarrow \text{Potential Energy Decrease} \rightarrow \text{Kinetic Energy Increase} \rightarrow \text{Velocity Increase} $$
    The satellite converts gravitational potential energy into kinetic energy, and drag dissipates some of it as heat.

## Worked example
**Problem:** The International Space Station (ISS) has a mass $m = 450,000$ kg and an effective cross-sectional area $A = 2500$ m$^2$. It is in a nearly circular orbit at an altitude of $h = 400$ km. For this altitude, assume an atmospheric density $\rho = 2.5 \times 10^{-12}$ kg/m$^3$ and a drag coefficient $C_D = 2.2$. Earth's mass is $M \approx 5.972 \times 10^{24}$ kg and its radius is $R_E \approx 6371$ km. Calculate the altitude loss per orbit.

**Solution:**

1.  **Identify parameters:**
    *   Orbital radius: $r = R_E + h = 6371 \text{ km} + 400 \text{ km} = 6771 \times 10^3$ m.
    *   Gravitational constant: $G \approx 6.674 \times 10^{-11}$ N m$^2$/kg$^2$.
    *   Satellite parameters: $m=4.5\times 10^5$ kg, $A=2500$ m$^2$, $C_D=2.2$.
    *   Atmospheric density: $\rho = 2.5 \times 10^{-12}$ kg/m$^3$.

2.  **Calculate orbital velocity:** For a circular orbit:
    $$ v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{(6.674 \times 10^{-11})(5.972 \times 10^{24})}{6771 \times 10^3}} \approx 7669 \text{ m/s} $$

3.  **Calculate the drag force:**
    $$ F_D = \frac{1}{2} \rho v^2 C_D A = \frac{1}{2} (2.5 \times 10^{-12}) (7669)^2 (2.2) (2500) \approx 0.404 \text{ N} $$
    This is a tiny force, about the weight of an apple, acting on a 450-ton station.

4.  **Calculate the energy loss per orbit:**
    $$ \Delta E_{orbit} = W_D \approx -F_D (2\pi r) = -(0.404)(2\pi \times 6771 \times 10^3) \approx -1.72 \times 10^7 \text{ J} $$
    The ISS loses 17.2 megajoules of energy each orbit.

5.  **Relate energy loss to altitude loss:**
    $$ \Delta E = \frac{GMm}{2r^2} \Delta r \implies \Delta r = \frac{2r^2 \Delta E}{GMm} $$
    $$ \Delta r_{orbit} \approx \frac{2(6771 \times 10^3)^2 (-1.72 \times 10^7)}{(6.674 \times 10^{-11})(5.972 \times 10^{24})(4.5 \times 10^5)} \approx -8.8 \text{ m} $$

The ISS loses approximately 8.8 meters of altitude per orbit.

**Reflection:** Each step builds on the last. We found the satellite's state ($r, v$), used that to find the perturbing force ($F_D$), calculated the work done by that force ($\Delta E$), and finally translated that energy loss back into a change in the orbital state ($\Delta r$). This cause-and-effect chain is fundamental to perturbation analysis.

## Diagrams

**Orbit Decay Spiral:**
A satellite's velocity vector $\vec{v}$ is tangential to the orbit. The drag force $\vec{F}_D$ is always directly opposite the velocity vector. This causes the satellite to slowly spiral inward.

```text
                  . . . . . . . . . . .
            .                           .
         .                                 .
       .                                     .
      .                  <-- F_D    v -->      .
     .                      * (Sat)            .
    .                                            .
   .                      /|\                    .
   .                       |                     .
   .                       | F_g                 .
    .                      |                     .
     .                     * (Earth)           .
      .                                      .
       .                                   .
         .                               .
            .                           .
               . . . . . . . . . . . .
```

**Exponential Atmosphere Model:**
This graph shows how density drops off rapidly with altitude. Most of the drag effect happens at the lowest point of the orbit (periapsis).

```text
Altitude (h)
  ^
  |
H |-------------.
  |             : /
  |             :/
  |             /
  |            /
  |           /
  |          /
  |         /
0 +--------/----------------> Density (rho)
         rho_0/e           rho_0
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a satellite "skimming stones" on the top of the atmosphere. Each skip is one orbit. With each skip, it loses a bit of speed relative to a perfect orbit, digs a little deeper into the "water" (denser air), and for its next skip, it has to go even faster to stay up. This continues, with faster and faster skips getting deeper and deeper, until the final "plunge" of reentry. The paradox is resolved: it speeds up because it's falling, not because drag is helping it.

2.  **Must-Know Formulas:**
    *   $F_D = \frac{1}{2} \rho v^2 C_D A$
    *   $\rho(h) = \rho_0 e^{-h/H}$
    *   $\Delta E_{orbit} \approx -F_D (2\pi r)$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the $\Delta r_{orbit}$ result from these three formulas in **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   **Work-Energy Theorem:** Change in total energy = Work done by non-conservative forces.
    *   $\Delta E = W_{drag}$.
    *   The only non-conservative force is drag. Work is force times distance. $W_{drag} \approx -F_D \cdot (\text{circumference})$.
    *   Total energy is purely a function of semi-major axis (or radius for a circle). $E = -GMm/2r$.
    *   Find the change in energy for a change in radius: $dE/dr$.
    *   Set them equal: $\frac{dE}{dr}\Delta r = W_{drag}$. Solve for $\Delta r$.

## Common mistakes
1.  **The Drag Paradox:** Forgetting that orbital velocity *increases* as the satellite descends due to drag. Students intuitively think drag must slow the object down, which is true relative to the air, but the orbital speed increases.
2.  **Using Earth Radius Instead of Orbital Radius:** A very common error is to use $R_E$ in the velocity or force equations instead of $r = R_E + h$. All orbital mechanics calculations are relative to the center of the primary body.
3.  **Constant Density Assumption:** Using a single, constant value for density for an orbit that is even slightly elliptical. The exponential dependence means almost all drag occurs at the lowest point of the orbit (periapsis), so you must use the density at that altitude.
4.  **Sign Errors:** The work done by drag is negative, so the change in energy $\Delta E$ is negative. Forgetting this sign will incorrectly imply that the satellite gains altitude.

## Self-check
1.  Two satellites are identical in every way (mass, shape, etc.), but satellite A is in a circular orbit at 300 km altitude and satellite B is at 600 km. Which one will experience a greater altitude loss per orbit, and roughly by what factor? (Hint: Consider both density and velocity changes).
2.  Derive an expression for the rate of change of the semi-major axis, $\frac{da}{dt}$, for a satellite in a nearly circular orbit under the influence of atmospheric drag.
3.  An old satellite is in a decaying elliptical orbit. At which point in its orbit (apoapsis or periapsis) is the drag force the strongest? At which point does the drag force have the largest effect on changing the shape of the orbit (i.e., reducing the apoapsis altitude)? Explain your reasoning.