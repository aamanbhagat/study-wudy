## What it is
Specific orbital energy, denoted by $\epsilon$ (epsilon), is the total energy (kinetic plus potential) of an orbiting body per unit of its own mass. For any given two-body orbit, this value is constant and depends *only* on the size of the orbit, defined by its semi-major axis $a$. It quantifies how tightly bound an object is to the body it's orbiting.

## Why it matters
This concept is the bedrock of mission design and trajectory analysis. Changing an orbit, such as moving a satellite from a low parking orbit to a high geostationary one, is fundamentally an act of changing its energy. The equation $\epsilon = -GM/2a$ tells you exactly how much energy per kilogram you must add or remove (via rocket burns) to change the size of your orbit, making it a cornerstone of calculating fuel requirements for orbital maneuvers.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites. If any are shaky, review them first.
*   Newton's Law of Universal Gravitation and gravitational fields.
*   Definitions of kinetic energy ($K = \frac{1}{2}mv^2$) and gravitational potential energy ($U = -G\frac{Mm}{r}$).
*   The principle of conservation of total mechanical energy ($E = K + U$).
*   The geometry of conic sections, specifically the definition of an ellipse's semi-major axis ($a$).
*   Conservation of specific angular momentum ($h = |\vec{r} \times \vec{v}|$).

## How to study it (step by step)
1.  **Start from Total Energy.** Write down the total mechanical energy $E$ of a satellite of mass $m$ orbiting a primary body of mass $M$.
    $$E = K + U = \frac{1}{2}mv^2 - \frac{GMm}{r}$$
2.  **Define Specific Energy.** Divide the total energy $E$ by the satellite's mass $m$ to get the specific orbital energy $\epsilon$. This removes the satellite's own properties from the equation, focusing only on the orbit itself.
    $$\epsilon = \frac{E}{m} = \frac{1}{2}v^2 - \frac{GM}{r}$$
    Notice this is a rearranged form of the *vis-viva equation*. Since total energy is conserved in an orbit, $\epsilon$ must be constant at all points along the trajectory.
3.  **Choose a Convenient Point.** To relate $\epsilon$ to the orbit's geometry, we can evaluate it at any point. The easiest points are the periapsis (closest approach, $r_p$) and apoapsis (farthest approach, $r_a$), where the velocity vector $\vec{v}$ is exactly perpendicular to the position vector $\vec{r}$.
4.  **Set Up the System.** At periapsis and apoapsis, we have two equations for specific energy:
    $$\epsilon = \frac{1}{2}v_p^2 - \frac{GM}{r_p} \quad \text{(at periapsis)}$$
    $$\epsilon = \frac{1}{2}v_a^2 - \frac{GM}{r_a} \quad \text{(at apoapsis)}$$
5.  **Use Conservation of Angular Momentum.** Specific angular momentum $h$ is also conserved: $h = r_p v_p = r_a v_a$. From this, we can express the velocities as $v_p = h/r_p$ and $v_a = h/r_a$. Substitute these into the energy equations:
    $$\epsilon = \frac{h^2}{2r_p^2} - \frac{GM}{r_p}$$
    $$\epsilon = \frac{h^2}{2r_a^2} - \frac{GM}{r_a}$$
6.  **Solve for h² and Equate.** Isolate $h^2$ in both equations.
    $$h^2 = 2r_p^2 \left(\epsilon + \frac{GM}{r_p}\right) = 2\epsilon r_p^2 + 2GM r_p$$
    $$h^2 = 2r_a^2 \left(\epsilon + \frac{GM}{r_a}\right) = 2\epsilon r_a^2 + 2GM r_a$$
    Setting them equal:
    $$2\epsilon r_p^2 + 2GM r_p = 2\epsilon r_a^2 + 2GM r_a$$
7.  **Isolate ε.** Rearrange the terms to solve for $\epsilon$.
    $$2GM(r_p - r_a) = 2\epsilon(r_a^2 - r_p^2)$$
    $$GM(r_p - r_a) = \epsilon(r_a - r_p)(r_a + r_p)$$
    Since $r_a \neq r_p$ for an ellipse, we can divide by $(r_a - r_p)$, which is the same as $-(r_p - r_a)$.
    $$-GM = \epsilon(r_a + r_p)$$
    From the geometry of an ellipse, we know the semi-major axis is $a = (r_p + r_a)/2$, so $r_p + r_a = 2a$.
    $$-GM = \epsilon(2a)$$
    $$\epsilon = -\frac{GM}{2a}$$
    This is the result. It connects a dynamic property (energy) to a purely geometric one (the size of the orbit).

## Key ideas, with intuition
*   **The Semi-Major Axis *is* the Energy.** This is the core concept. The size of an orbit, defined by $a$, is a direct proxy for its total energy. A bigger orbit has a larger $a$, which means $\epsilon$ is a *less negative* number—i.e., it has more energy.
*   **Negative Energy Means "Bound".** The negative sign is crucial. It signifies that the orbiting body is trapped in the primary's gravity well. It does not have enough kinetic energy to overcome the negative potential energy and escape to infinity (where potential energy is zero). To escape, you must add energy to bring $\epsilon$ up to zero or greater.
    $$ \epsilon = \begin{cases} < 0 & \text{Bound Orbit (Ellipse/Circle)} \\ = 0 & \text{Parabolic Trajectory (Escape)} \\ > 0 & \text{Hyperbolic Trajectory (Escape with excess velocity)} \end{cases} $$
*   **Energy is "Per Kilogram".** Specific energy lets us discuss the properties of an *orbit*, independent of the satellite. A 1 kg CubeSat and a 100,000 kg space station in the same orbit have vastly different total energies ($E$), but they have the exact same specific orbital energy ($\epsilon$).

## Worked example
**Problem:** A satellite is in an elliptical orbit around Earth with a perigee altitude of 400 km and an apogee altitude of 4000 km. Earth's radius is $R_\oplus \approx 6371$ km and its standard gravitational parameter is $\mu = GM_\oplus \approx 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$. Calculate the satellite's specific orbital energy.

**Solution:**
1.  **Convert altitudes to radii.** Orbital mechanics calculations are always from the center of the primary body.
    *   Radius at perigee, $r_p = R_\oplus + h_p = 6371 \text{ km} + 400 \text{ km} = 6771 \text{ km}$.
    *   Radius at apogee, $r_a = R_\oplus + h_a = 6371 \text{ km} + 4000 \text{ km} = 10371 \text{ km}$.

2.  **Calculate the semi-major axis, $a$.** The semi-major axis is the average of the perigee and apogee radii.
    $$a = \frac{r_p + r_a}{2} = \frac{6771 \text{ km} + 10371 \text{ km}}{2} = \frac{17142 \text{ km}}{2} = 8571 \text{ km}$$

3.  **Convert to SI units.** The gravitational parameter $\mu$ is in meters, so we must convert $a$ to meters.
    $$a = 8571 \text{ km} \times 1000 \frac{\text{m}}{\text{km}} = 8.571 \times 10^6 \text{ m}$$

4.  **Apply the specific orbital energy formula.**
    $$\epsilon = -\frac{GM}{2a} = -\frac{\mu}{2a}$$
    $$\epsilon = -\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{2 \times (8.571 \times 10^6 \text{ m})}$$
    $$\epsilon = -\frac{3.986 \times 10^{14}}{1.7142 \times 10^7} \frac{\text{m}^2}{\text{s}^2}$$
    $$\epsilon \approx -2.325 \times 10^7 \text{ J/kg}$$

**Reflection:** Each step was necessary. Step 1 avoided the common mistake of using altitude. Step 2 found the single geometric parameter that defines the energy. Step 3 ensured unit consistency. Step 4 applied the derived formula directly. The final result is negative, confirming the satellite is in a bound orbit.

## Diagrams
An elliptical orbit showing the key geometric parameters.

```text
                      v_a
                       <--
                     .---.
                 . '   m   ' .
              .  '           '  .
            .  '               '  .
           . '                   ' .
          .                          .
          |                          |
<---------+--------------------------+--------->  Major Axis
          |         F_1              |
          .            *M            .
           .           .           .
            .         .         . ' v_p
              .      .      . '   --->
                 . . . . . '
                     ^
                     |--r_p--|
                     |
                     |------------r_a-----------|
                     |
                     |---------- a ----------|
```
**Figure 1:** An ellipse with the primary body M at one focus ($F_1$). The satellite $m$ is shown at apoapsis, with its corresponding radius $r_a$ and velocity $v_a$. The periapsis radius $r_p$ and velocity $v_p$ are also indicated. The semi-major axis $a$ is half the length of the major axis ($2a = r_p + r_a$).

## Memory technique — remember this forever
1.  **Visual Hook:** Imagine an orbit as a "gravity well". The deeper in the well you are, the more "negative" your energy. The semi-major axis, $a$, is like a measuring stick telling you how high up the walls of the well you are. A larger $a$ means you are higher up (less negative energy), closer to the "escape" level at the top (zero energy). The formula $\epsilon = -GM/2a$ is the price tag for your position on that well.

2.  **Must Overlearn:**
    *   $\epsilon = \frac{1}{2}v^2 - \frac{GM}{r}$ (The definition: specific KE + specific PE)
    *   $\epsilon = -\frac{GM}{2a}$ (The result: energy depends only on size)

3.  **Spaced Repetition Schedule:** Review this derivation and these formulas now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Do not just read it; re-derive it from a blank sheet of paper each time.

4.  **First Principles Pathway:** If you forget $\epsilon = -GM/2a$, rebuild it.
    *   Start with $E = K+U \implies \epsilon = \frac{1}{2}v^2 - \frac{GM}{r}$. This is fundamental.
    *   Remember that $\epsilon$ is constant. Evaluate it at periapsis and apoapsis.
    *   Use conservation of angular momentum, $h = r_p v_p = r_a v_a$, to eliminate the velocities.
    *   Use the geometric definition $2a = r_p + r_a$.
    *   Solve the resulting algebraic system for $\epsilon$.

## Common mistakes
*   **Using altitude for $r$.** Always use the radius from the center of the primary body ($r = R_{\text{planet}} + h_{\text{altitude}}$). This is the single most common error.
*   **Forgetting the negative sign.** Bound orbits *always* have negative specific energy. If you get a positive answer for an elliptical orbit, check your signs.
*   **Unit Mismatches.** Gravitational parameters are often given in $\text{m}^3/\text{s}^2$ or $\text{km}^3/\text{s}^2$. Ensure your semi-major axis $a$ is in the corresponding unit (meters or kilometers) before calculating.
*   **Confusing Energy and Velocity.** Do not assume the point of highest velocity (periapsis) is the point of highest energy. Specific energy $\epsilon$ is constant everywhere on the orbit. The trade-off between kinetic and potential energy is what changes speed.

## Self-check
1.  A spy satellite is in a circular Low Earth Orbit (LEO) at a constant altitude of 250 km. What is its specific orbital energy? (Note: for a circular orbit, $a=r$).
2.  The James Webb Space Telescope orbits the Sun at the L2 Lagrange point, with a semi-major axis of approximately $1.01$ Astronomical Units (AU), where $1 \text{ AU} \approx 1.496 \times 10^{11} \text{ m}$. Calculate its specific orbital energy with respect to the Sun. ($\mu_{Sun} \approx 1.327 \times 10^{20} \text{ m}^3/\text{s}^2$).
3.  A spacecraft in a circular orbit of radius $r_1$ performs a single, instantaneous burn to enter an elliptical transfer orbit whose apogee is at radius $r_2$. In terms of $G$, $M$, $r_1$, and $r_2$, what is the change in specific orbital energy, $\Delta \epsilon$, required for this maneuver?