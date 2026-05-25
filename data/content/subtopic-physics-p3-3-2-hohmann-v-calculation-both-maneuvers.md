## What it is
A Hohmann transfer is a two-impulse orbital maneuver that moves a spacecraft between two coplanar circular orbits. It is the most fuel-efficient transfer possible, using an elliptical orbit (the "transfer orbit") that is tangent to both the initial and final circular orbits. The first impulse ($\Delta v_1$) changes the orbit from circular to elliptical, and the second impulse ($\Delta v_2$) circularizes the orbit at the new radius.

## Why it matters
The Hohmann transfer is the foundational concept for interplanetary mission design and satellite repositioning. When planning a mission from Earth to Mars, the initial trajectory is a Hohmann transfer orbit around the Sun. In satellite operations, it's the standard method for moving a satellite from a low parking orbit to its final geostationary orbit, minimizing the required propellant and thus maximizing the satellite's operational lifetime.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
*   **Newton's Law of Universal Gravitation:** The source of the force governing orbital motion.
*   **Orbital Energy and the Vis-Viva Equation:** This is the core equation for this calculation. You must understand that $v^2 = \mu (\frac{2}{r} - \frac{1}{a})$, where $\mu = GM$ is the gravitational parameter, $r$ is the current distance from the central body, and $a$ is the semi-major axis of the orbit.
*   **Circular and Elliptical Orbits:** You must know the properties of these conic sections, especially that for a circular orbit $a=r$, and for an ellipse, the periapsis and apoapsis are the closest and farthest points.

## How to study it (step by step)
1.  **Draw the problem.** Sketch the central body, the initial circular orbit (radius $r_1$), the final circular orbit (radius $r_2$), and the elliptical transfer orbit connecting them. Label the points of the two engine burns. This grounds the entire problem visually.
2.  **Calculate initial and final circular velocities.** Use the circular velocity formula, $v_c = \sqrt{\mu/r}$, to find the constant speed of the spacecraft in its initial orbit ($v_{c1}$) and its target final orbit ($v_{c2}$).
3.  **Define the transfer orbit.** The key insight is that the transfer orbit's periapsis is $r_1$ and its apoapsis is $r_2$. From this, calculate its semi-major axis: $a_t = \frac{r_1 + r_2}{2}$. This value defines the energy of the transfer orbit.
4.  **Calculate transfer orbit velocities.** Use the vis-viva equation and the semi-major axis $a_t$ you just found. Calculate the velocity at periapsis ($v_{tp}$), which occurs at distance $r_1$. Then calculate the velocity at apoapsis ($v_{ta}$), which occurs at distance $r_2$.
5.  **Calculate the first burn, $\Delta v_1$.** The first burn happens at $r_1$. The spacecraft is initially moving at $v_{c1}$ and must instantaneously accelerate to $v_{tp}$ to enter the transfer ellipse. Therefore, $\Delta v_1 = v_{tp} - v_{c1}$. This burn is prograde (in the direction of motion).
6.  **Calculate the second burn, $\Delta v_2$.** The second burn happens at $r_2$. The spacecraft arrives moving at $v_{ta}$ but needs to speed up to the final circular velocity $v_{c2}$ to stay in that orbit. Therefore, $\Delta v_2 = v_{c2} - v_{ta}$. This burn is also prograde.
7.  **Sum the burns.** The total delta-v for the maneuver is $\Delta v_{total} = \Delta v_1 + \Delta v_2$.

## Key ideas, with intuition
1.  **Orbits are defined by energy.** A circular orbit has a specific, constant energy. To move to a higher (less negative energy) circular orbit, you must add energy. The burns are simply the method of adding that energy by changing kinetic energy instantaneously.
2.  **The transfer orbit is a "bridge".** The elliptical transfer orbit is a temporary path whose energy is intermediate between the initial and final orbits. Its shape is perfectly defined by the requirement that it must just touch the inner orbit at its periapsis and the outer orbit at its apoapsis. This gives us its semi-major axis, which is the key to all subsequent calculations.
    $$a_t = \frac{r_{periapsis} + r_{apoapsis}}{2} = \frac{r_1 + r_2}{2}$$
3.  **Burns are instantaneous velocity changes.** We model an engine burn as an instantaneous kick. The spacecraft's position does not change during the burn, but its velocity vector does. This new velocity vector determines the new orbit. At the point of the first burn, the spacecraft is at radius $r_1$, and its velocity changes from $v_{c1}$ to $v_{tp}$.
4.  **The Vis-Viva equation is your calculator.** This equation is the workhorse of orbital mechanics. It directly connects the energy of an orbit (represented by its semi-major axis, $a$) to the spacecraft's speed ($v$) at any given position ($r$). Once you know the semi-major axis of the transfer orbit, you can find the velocity at any point on it.
    $$v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$$

## Worked example
**Problem:** A satellite is in a 300 km altitude circular Low Earth Orbit (LEO). Calculate the total $\Delta v$ required to move it to a 35,786 km altitude circular Geostationary Orbit (GEO). Use Earth's gravitational parameter $\mu = 398,600 \text{ km}^3/\text{s}^2$ and Earth's equatorial radius $R_E = 6,378 \text{ km}$.

**Solution:**

1.  **Define radii.** We must use radii from the center of the Earth, not altitudes.
    *   Initial radius: $r_1 = R_E + h_1 = 6378 + 300 = 6678 \text{ km}$
    *   Final radius: $r_2 = R_E + h_2 = 6378 + 35786 = 42164 \text{ km}$

2.  **Calculate circular velocities.**
    *   $v_{c1} = \sqrt{\frac{\mu}{r_1}} = \sqrt{\frac{398600}{6678}} = 7.73 \text{ km/s}$
    *   $v_{c2} = \sqrt{\frac{\mu}{r_2}} = \sqrt{\frac{398600}{42164}} = 3.07 \text{ km/s}$

3.  **Define the transfer orbit.**
    *   $a_t = \frac{r_1 + r_2}{2} = \frac{6678 + 42164}{2} = 24421 \text{ km}$

4.  **Calculate transfer orbit velocities using Vis-Viva.**
    *   At periapsis ($r=r_1$): $v_{tp}^2 = \mu (\frac{2}{r_1} - \frac{1}{a_t}) = 398600 (\frac{2}{6678} - \frac{1}{24421}) = 102.99 \text{ km}^2/\text{s}^2$
        $v_{tp} = \sqrt{102.99} = 10.15 \text{ km/s}$
    *   At apoapsis ($r=r_2$): $v_{ta}^2 = \mu (\frac{2}{r_2} - \frac{1}{a_t}) = 398600 (\frac{2}{42164} - \frac{1}{24421}) = 2.52 \text{ km}^2/\text{s}^2$
        $v_{ta} = \sqrt{2.52} = 1.59 \text{ km/s}$

5.  **Calculate the first burn, $\Delta v_1$.**
    *   $\Delta v_1 = v_{tp} - v_{c1} = 10.15 - 7.73 = 2.42 \text{ km/s}$

6.  **Calculate the second burn, $\Delta v_2$.**
    *   $\Delta v_2 = v_{c2} - v_{ta} = 3.07 - 1.59 = 1.48 \text{ km/s}$

7.  **Sum the burns.**
    *   $\Delta v_{total} = \Delta v_1 + \Delta v_2 = 2.42 + 1.48 = 3.90 \text{ km/s}$

**Reflection:** Each step was a necessary prerequisite for the next. We needed the radii to define the orbits. We needed the orbit definitions to calculate the velocities. We needed the velocities before and after each burn point to find the required change in velocity, the $\Delta v$. The logic flows directly from the geometry of the maneuver.

## Diagrams
```text
                  . . . . . . . . . . . . . . . . . . . . .
            .                                               .
        .                                                       .
      .                                                           .
    .                                                               .
   .                                                                 .
  .                  <----(v_c2)----[S/C]--->Δv_2                      .
 .                                                                     .
.                + (Central Body)                r_2                   .
.                                                                      .
 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 .                 . '                       ' .                       .
  .              .   '                     '   .                     .
   .           .     '                   '     .                   .
    .          .     '                 '     .                   .
     .         .     '               '     .                     .
      .        .     '             '     .                       .
       .       . . . .' . . . . . .' . . .                         .
        .          [S/C]--->Δv_1                                 .
         .           ^----(v_c1)                               .
          .            r_1                                   .
            . . . . . . . . . . . . . . . . . . . . . . . . .
```
This diagram shows the initial circular orbit (inner solid circle, radius $r_1$), the final circular orbit (outer solid circle, radius $r_2$), and the elliptical transfer orbit (dashed line). The first burn, $\Delta v_1$, occurs on the inner orbit to accelerate the spacecraft [S/C] from $v_{c1}$ to the transfer periapsis velocity. The second burn, $\Delta v_2$, occurs on the outer orbit to accelerate the spacecraft from the transfer apoapsis velocity to $v_{c2}$.

## Memory technique — remember this forever
1.  **The Story:** Imagine you're driving on a small, circular inner-city ring road ($r_1$). To get to the big, fast outer-belt highway ($r_2$), you must first accelerate hard onto a long, elliptical on-ramp ($\Delta v_1$). You coast up this ramp, naturally slowing down as you climb away from the city center. When you reach the highway, you're moving too slowly to merge, so you must accelerate again to match the highway's speed ($\Delta v_2$). The Hohmann transfer is this exact "floor it, coast, floor it again" maneuver.

2.  **Formulas to Overlearn:**
    *   Circular Velocity: $v_c = \sqrt{\frac{\mu}{r}}$
    *   Vis-Viva Equation: $v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$
    *   Hohmann Transfer Semi-major Axis: $a_t = \frac{r_1 + r_2}{2}$

3.  **Spaced Repetition Schedule:** Review this material and re-work the example at **1 day, 3 days, 7 days, 16 days, and 35 days** from now. Set calendar reminders.

4.  **First Principles Pathway:** If you forget the formulas, rebuild them.
    *   For circular velocity: Set gravitational force equal to centripetal force. $G\frac{Mm}{r^2} = \frac{mv^2}{r}$. Solve for $v$.
    *   For Vis-Viva: Start with the conservation of energy. Total Energy $E = \frac{1}{2}mv^2 - G\frac{Mm}{r}$. The specific energy is constant and equals $E/m = -\frac{\mu}{2a}$. Equate these and solve for $v^2$.

## Common mistakes
*   **Using altitude instead of radius.** All orbital equations use the distance from the center of the central body ($r$), not the altitude above the surface ($h$). Always calculate $r = R_{body} + h$.
*   **Mixing up the $\Delta v$ subtractions.** The burn is always an increase in speed for this transfer. The final velocity must be greater than the initial velocity at the burn point. So, it's always $\Delta v = v_{faster} - v_{slower}$. For the first burn, $v_{tp} > v_{c1}$. For the second, $v_{c2} > v_{ta}$.
*   **Calculating only one burn.** The Hohmann transfer is explicitly a two-burn maneuver. Finding only $\Delta v_1$ is an incomplete answer.
*   **Incorrect semi-major axis.** Using $r_1$ or $r_2$ as the semi-major axis for the transfer orbit. Remember, the transfer orbit is its own distinct ellipse, and its semi-major axis is the *average* of the initial and final radii.

## Self-check
1.  A spy satellite is in a 250 km circular orbit around Earth. The mission requires moving it to a 600 km circular orbit. Calculate the total $\Delta v$ for the Hohmann transfer.
2.  A probe is orbiting the Moon in a 100 km circular orbit. To prepare for its return to Earth, it must first move to a 10,000 km circular "phasing orbit". Calculate $\Delta v_1$, $\Delta v_2$, and the time of flight for the transfer. (Moon's $\mu = 4904 \text{ km}^3/\text{s}^2$). *Hint: The time of flight is half the period of the transfer orbit.*
3.  Derive a single expression for the total Hohmann transfer $\Delta v$ as a function of $\mu$, $r_1$, and the ratio $n = r_2/r_1$. Use this expression to show that as $r_2 \to \infty$ (an escape trajectory), the $\Delta v_2$ requirement goes to zero. What does $\Delta v_1$ become in this case?