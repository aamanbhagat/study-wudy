## What it is
The Hohmann transfer is an orbital maneuver that moves a spacecraft between two coplanar circular orbits using an elliptical transfer orbit. It is the most fuel-efficient two-burn maneuver possible, consisting of one burn to enter the ellipse and a second to circularize at the destination orbit. This efficiency comes at the cost of a longer transfer time compared to higher-energy transfers.

## Why it matters
This is the foundational maneuver for interplanetary travel and for moving satellites between different operational orbits, such as from a low Earth parking orbit to a geostationary orbit. Understanding the Hohmann transfer is the first step in mission design and trajectory optimization; it provides the baseline energy budget ($\Delta v$) against which all faster, more complex maneuvers are compared. Its principles are the bedrock of astrodynamics.

## When to study it
Before tackling this, you must have a firm grasp of the following. If any of these are weak, review them first.
*   **Newton's Law of Universal Gravitation:** The source of the central force.
*   **Conservation of Mechanical Energy and Angular Momentum:** The two fundamental conservation laws governing orbital motion.
*   **The Vis-viva Equation:** The equation relating speed, distance, and semi-major axis for any orbit, derived from the conservation laws. It is non-negotiable. $$v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$$ where $\mu = GM$ is the standard gravitational parameter.
*   **Orbital Elements:** Specifically, semi-major axis ($a$), periapsis ($r_p$), and apoapsis ($r_a$).
*   **Impulsive Burns:** The concept of an instantaneous change in velocity, denoted as $\Delta v$.

## How to study it (step by step)
1.  **Draw the problem.** Sketch the central body, the initial circular orbit (radius $r_1$), the final circular orbit (radius $r_2$), and the elliptical transfer orbit that is tangent to both. Label the two burn points.
2.  **Characterize the three orbits.** For each of the three orbits (initial, transfer, final), write down its key parameters. The semi-major axis of the transfer orbit, $a_t$, is the most important new piece of information you will define.
3.  **Calculate initial and final velocities.** Use the circular orbit velocity formula, a special case of the Vis-viva equation where $a=r$, to find the spacecraft's speed in the initial orbit ($v_{c1}$) and the required speed in the final orbit ($v_{c2}$).
4.  **Calculate transfer orbit velocities.** Use the Vis-viva equation for the elliptical transfer orbit to find the spacecraft's speed at its periapsis ($v_{tp}$) and apoapsis ($v_{ta}$).
5.  **Derive the $\Delta v$ for each burn.** The first burn, $\Delta v_1$, is the difference between the velocity needed to enter the transfer orbit and the initial circular velocity ($v_{tp} - v_{c1}$). The second burn, $\Delta v_2$, is the difference between the final circular velocity and the velocity at the end of the transfer ($v_{c2} - v_{ta}$).
6.  **Solve a numerical problem.** Use the derived formulas to calculate the total $\Delta v$ for a transfer from Low Earth Orbit (LEO) to Geostationary Orbit (GEO). This solidifies the theory.

## Key ideas, with intuition
1.  **Tangency is Efficiency.** The transfer ellipse just *touches* the inner and outer circular orbits. This means at the moment of the burn, the spacecraft's velocity vector and the thrust vector are perfectly aligned. This is the most efficient way to use fuel to increase orbital energy. Any thrust component not aligned with the velocity vector is partially wasted on changing the direction of motion, not just the speed.

2.  **The Transfer Orbit Connects the Dots.** The transfer orbit is an ellipse defined by the start and end points. Its closest point (periapsis) is the radius of the inner orbit, and its farthest point (apoapsis) is the radius of the outer orbit. This immediately defines the geometry of the ellipse.
    $$r_p = r_1$$
    $$r_a = r_2$$

3.  **The Semi-Major Axis is the Average.** The semi-major axis, $a_t$, determines the energy of the transfer orbit. From the geometry, it's simply the average of the periapsis and apoapsis radii.
    $$a_t = \frac{r_p + r_a}{2} = \frac{r_1 + r_2}{2}$$
    This is the crucial link. By defining the start and end points, you have defined the energy of the path between them.

4.  **Two Kicks.** You can't just slide into the final orbit. The first burn ($\Delta v_1$) "kicks" the spacecraft from the circular orbit onto the higher-energy elliptical path. When it arrives at the destination radius, it's moving too slowly to stay in a circular orbit at that altitude, so a second burn ($\Delta v_2$) is needed to "kick" it up to the required circular velocity.

## Worked example
**Problem:** A satellite is in a circular LEO at an altitude of 300 km. Calculate the total $\Delta v$ required to place it in a circular geostationary orbit (GEO) at an altitude of 35,786 km. Use Earth's gravitational parameter $\mu = 398,600 \text{ km}^3/\text{s}^2$ and radius $R_E = 6,378 \text{ km}$.

**Solution:**

1.  **Define radii.** We must use radii from the center of the Earth.
    *   Initial radius: $r_1 = R_E + 300 \text{ km} = 6,378 + 300 = 6,678 \text{ km}$.
    *   Final radius: $r_2 = R_E + 35,786 \text{ km} = 6,378 + 35,786 = 42,164 \text{ km}$.

2.  **Calculate initial circular velocity ($v_{c1}$).**
    For a circular orbit, $v_c = \sqrt{\mu/r}$.
    $$v_{c1} = \sqrt{\frac{398,600}{6,678}} = \sqrt{59.68} \approx 7.726 \text{ km/s}$$

3.  **Characterize the transfer orbit.**
    The transfer ellipse has $r_p = r_1$ and $r_a = r_2$.
    Its semi-major axis is $a_t = \frac{r_1 + r_2}{2} = \frac{6,678 + 42,164}{2} = 24,421 \text{ km}$.

4.  **Calculate velocities on the transfer orbit.** Use the Vis-viva equation: $v^2 = \mu(\frac{2}{r} - \frac{1}{a})$.
    *   Velocity at periapsis ($r = r_1$):
        $$v_{tp} = \sqrt{\mu\left(\frac{2}{r_1} - \frac{1}{a_t}\right)} = \sqrt{398,600\left(\frac{2}{6,678} - \frac{1}{24,421}\right)} \approx 10.15 \text{ km/s}$$
    *   Velocity at apoapsis ($r = r_2$):
        $$v_{ta} = \sqrt{\mu\left(\frac{2}{r_2} - \frac{1}{a_t}\right)} = \sqrt{398,600\left(\frac{2}{42,164} - \frac{1}{24,421}\right)} \approx 1.607 \text{ km/s}$$

5.  **Calculate final circular velocity ($v_{c2}$).**
    $$v_{c2} = \sqrt{\frac{\mu}{r_2}} = \sqrt{\frac{398,600}{42,164}} \approx 3.075 \text{ km/s}$$

6.  **Calculate the two burns.**
    *   First burn (at LEO): $\Delta v_1 = v_{tp} - v_{c1} = 10.15 - 7.726 = 2.424 \text{ km/s}$.
    *   Second burn (at GEO): $\Delta v_2 = v_{c2} - v_{ta} = 3.075 - 1.607 = 1.468 \text{ km/s}$.

7.  **Calculate total $\Delta v$.**
    $$\Delta v_{total} = \Delta v_1 + \Delta v_2 = 2.424 + 1.468 = 3.892 \text{ km/s}$$

**Reflection:** Each step builds on the last. We define the geometry first (radii, semi-major axis), which then allows us to calculate the required speeds using the fundamental Vis-viva equation. The $\Delta v$ is simply the difference between the speed you *have* and the speed you *need* at each transition point.

## Diagrams
```text
                 Apoapsis Burn (Δv2)
                      *
                    /   \
                  /       \
                /           \
               |             |
               |      .      |   Final Orbit (r2)
               |     (+)     |--------------------->
               |      C      |
                \           /
        ---------\---------/----------------> Initial Orbit (r1)
                  \       /
                    \   /
                      *
                Periapsis Burn (Δv1)

(+) C = Central Body (e.g., Earth)
--->  = Direction of orbit
*     = Burn point
The dashed line is the Hohmann transfer ellipse.
```

## Memory technique — remember this forever
1.  **Visual Hook:** "The Hohmann Highway." It's the slow, scenic, fuel-saver route between two circular "cities." You get on the highway with an acceleration ramp ($\Delta v_1$) and get off using an exit ramp ($\Delta v_2$).

2.  **Must-Know Formulas:** Overlearn these. Do not paraphrase.
    *   Vis-viva Equation: $$v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$$
    *   Circular Velocity: $$v_c = \sqrt{\frac{\mu}{r}}$$
    *   Transfer Semi-major Axis: $$a_t = \frac{r_1 + r_2}{2}$$

3.  **Spaced Repetition Schedule:** Re-derive the worked example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do it without looking at your notes.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with the total energy of an orbit: $E = \frac{1}{2}mv^2 - \frac{GmM}{r}$.
    *   State that for a given orbit, energy is constant and related to the semi-major axis: $E = -\frac{GmM}{2a}$.
    *   Equate the two expressions for $E$ and solve for $v^2$. This gives you the Vis-viva equation.
    *   From there, apply the geometry ($r_p=r_1, r_a=r_2, a_t=(r_1+r_2)/2$) as in the worked example. You can always reconstruct the entire maneuver from just the conservation of energy.

## Common mistakes
1.  **Altitude vs. Radius:** Using altitude instead of the radius from the center of the central body. All orbital equations use the radius $r = R_{body} + h_{altitude}$. This is the most common error.
2.  **Mixing up Velocities:** Calculating $\Delta v_1$ as $v_{c1} - v_{tp}$. The burn increases your speed, so the velocity on the transfer orbit at that point *must* be higher. The result must be positive.
3.  **Assuming Coplanar Orbits:** The standard Hohmann transfer only works for orbits in the same plane. A real-world transfer between inclined orbits requires a third, more complex (and costly) plane-change burn.
4.  **Applying it to non-tangential transfers:** The Hohmann transfer is optimal because it is tangential. If you need to transfer between two orbits that don't touch, or do a non-tangential burn, the calculations are different and more complex.

## Self-check
1.  Calculate the total $\Delta v$ required for a Hohmann transfer from Earth orbit to Mars orbit. Assume both are circular and coplanar. (You will need to look up their orbital radii and the Sun's gravitational parameter).
2.  Explain, using the concept of orbital energy ($E = -\mu/2a$), why the Hohmann transfer is the minimum-energy transfer between two circular orbits. What would increasing the energy of the transfer orbit do to its shape and the transfer time?
3.  Using Kepler's Third Law ($T^2 = \frac{4\pi^2}{\mu}a^3$), derive a general expression for the time of flight for a Hohmann transfer from an orbit of radius $r_1$ to one of radius $r_2$.