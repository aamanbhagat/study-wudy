## What it is
The patched conic method is an approximation technique used in astrodynamics to simplify the design of interplanetary trajectories. It models a complex N-body gravity problem as a sequence of simpler two-body problems. The trajectory is broken into segments, or "patches," where in each patch, the spacecraft is assumed to be influenced by the gravity of only one celestial body, following a conic section (ellipse, parabola, or hyperbola) orbit around it.

## Why it matters
This is the fundamental tool for preliminary mission analysis for all interplanetary probes, from the Voyager grand tours to the Mars rovers. It provides a remarkably accurate "first guess" for fuel requirements ($\Delta v$), flight times, and launch windows. High-fidelity simulations that account for all gravitational perturbations then refine this initial patched conic solution, but they almost always start from it.

## When to study it
You must have a firm grasp of the two-body problem before tackling this. Specifically, ensure you understand:
1.  **Keplerian Orbits:** The geometry and parameters of ellipses and hyperbolas (semi-major axis $a$, eccentricity $e$).
2.  **The Vis-Viva Equation:** The relationship between speed, position, and energy in a two-body orbit.
3.  **Hyperbolic Trajectories:** The concept of hyperbolic excess velocity ($v_{\infty}$) as the velocity a spacecraft has "left over" after escaping a body's gravity.
4.  **The Sphere of Influence (SOI):** The definition and calculation of the region around a celestial body where its gravitational influence is dominant over the Sun's.

If any of these are weak, review them first. The patched conic method builds directly upon them.

## How to study it (step by step)
1.  **Master the SOI.** Derive the formula for the radius of the Sphere of Influence, $r_{SOI} = a_p \left( \frac{m_p}{m_{sun}} \right)^{2/5}$, where $a_p$ is the planet's semi-major axis and $m_p, m_{sun}$ are the masses. Understand that this is not a physical boundary but a mathematical convenience where we switch gravitational models.
2.  **Analyze the Departure Phase.** Model the spacecraft's escape from the departure planet. This is a hyperbolic trajectory relative to the planet. Use the vis-viva equation to calculate the required burnout velocity at perigee (from a parking orbit) to achieve a specific hyperbolic excess velocity, $v_{\infty}$.
3.  **Perform the "Patch."** At the SOI boundary, the magic happens. The velocity of the spacecraft relative to the Sun is the vector sum of the planet's velocity and the spacecraft's hyperbolic excess velocity relative to the planet: $\vec{v}_{s/sun} = \vec{v}_{p/sun} + \vec{v}_{\infty}$. This gives the initial conditions for the interplanetary cruise phase.
4.  **Analyze the Heliocentric Cruise.** The spacecraft is now in a new orbit around the Sun (typically an ellipse for a transfer orbit). Use the velocity vector from the previous step and the planet's position to calculate the orbital elements of this transfer orbit.
5.  **Analyze the Arrival Phase.** As the spacecraft approaches the target planet and enters its SOI, perform the patch in reverse. The spacecraft's velocity relative to the target planet is $\vec{v}_{\infty} = \vec{v}_{s/sun} - \vec{v}_{p/sun}$. This $v_{\infty}$ defines the incoming hyperbolic trajectory relative to the target planet, which determines the parameters for an orbital insertion burn or a flyby.

## Key ideas, with intuition
1.  **Gravity is a Local Bully.** The N-body problem is intractable. The patched conic method's core insight is that gravity has a very steep fall-off ($1/r^2$). Close to a planet, its gravity completely dominates the Sun's. Far from any planet, the Sun is the only game in town. The SOI is our way of defining "close."
2.  **$v_{\infty}$ is the price of admission.** Hyperbolic excess velocity, $v_{\infty}$, is the key linking parameter. Think of it as the velocity "at infinity" relative to the departure planet. This is the velocity the spacecraft carries with it out of the planet's gravity well and into the Sun's domain. It's the "ante" you pay to get into the interplanetary game.
    $$ v_{\infty}^2 = v^2 - \frac{2\mu}{r} = -\frac{\mu}{a_{hyp}} $$
    This is just the specific orbital energy equation. For a hyperbola, the semi-major axis $a_{hyp}$ is negative, so energy is positive. As $r \to \infty$, the term $\frac{2\mu}{r} \to 0$, leaving $v^2 \to v_{\infty}^2$.
3.  **Velocities are Relative.** The entire method is an exercise in changing reference frames. We calculate a trajectory in a planet-centric frame (hyperbola), then use vector addition to translate it into a heliocentric frame (ellipse), and then back into a new planet-centric frame. The velocity of the planets themselves is the bridge between these frames.

## Worked example
Let's find the $\Delta v$ required for the first burn of a Hohmann transfer from Earth to Mars, starting from a 300 km altitude circular parking orbit around Earth.

**Given:**
- Earth's gravitational parameter, $\mu_E = 398600 \text{ km}^3/\text{s}^2$
- Sun's gravitational parameter, $\mu_S = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$
- Earth's radius, $R_E = 6378 \text{ km}$
- Earth's orbital radius (assume circular), $r_E = 1 \text{ AU} \approx 1.496 \times 10^8 \text{ km}$
- Mars' orbital radius (assume circular), $r_M = 1.524 \text{ AU} \approx 2.279 \times 10^8 \text{ km}$

**Step 1: Analyze the Heliocentric Transfer Orbit**
The Hohmann transfer is an ellipse tangent to Earth's orbit at its perihelion and Mars' orbit at its aphelion.
The semi-major axis of the transfer orbit is:
$$ a_{trans} = \frac{r_E + r_M}{2} = \frac{1.496 \times 10^8 + 2.279 \times 10^8}{2} = 1.8875 \times 10^8 \text{ km} $$
The spacecraft's speed at perihelion (just after leaving Earth's SOI) is found using the vis-viva equation in the Sun's frame:
$$ v_{p/trans}^2 = \mu_S \left( \frac{2}{r_E} - \frac{1}{a_{trans}} \right) $$
$$ v_{p/trans}^2 = (1.327 \times 10^{11}) \left( \frac{2}{1.496 \times 10^8} - \frac{1}{1.8875 \times 10^8} \right) \implies v_{p/trans} \approx 32.73 \text{ km/s} $$

**Step 2: Find the Required Hyperbolic Excess Velocity ($v_{\infty}$)**
Earth's orbital speed is:
$$ v_E = \sqrt{\frac{\mu_S}{r_E}} = \sqrt{\frac{1.327 \times 10^{11}}{1.496 \times 10^8}} \approx 29.78 \text{ km/s} $$
To enter the Hohmann transfer, the spacecraft must accelerate in the direction of Earth's motion. The required velocity relative to the Sun ($v_{p/trans}$) is the sum of Earth's velocity ($v_E$) and the hyperbolic excess velocity ($v_{\infty}$) relative to Earth.
$$ v_{p/trans} = v_E + v_{\infty} $$
$$ v_{\infty} = v_{p/trans} - v_E = 32.73 - 29.78 = 2.95 \text{ km/s} $$
This is the speed the spacecraft needs "at infinity" with respect to Earth.

**Step 3: Analyze the Earth Departure Hyperbola**
The spacecraft starts in a circular parking orbit at altitude $h = 300$ km.
The radius of this orbit is $r_p = R_E + h = 6378 + 300 = 6678 \text{ km}$. This will be the perigee of the departure hyperbola.
The speed in the circular parking orbit is:
$$ v_{circ} = \sqrt{\frac{\mu_E}{r_p}} = \sqrt{\frac{398600}{6678}} \approx 7.72 \text{ km/s} $$
Now we use the specific energy equation (vis-viva for the hyperbola) to find the required speed at perigee, $v_{p/hyp}$, to achieve our target $v_{\infty}$.
$$ v_{\infty}^2 = v_{p/hyp}^2 - \frac{2\mu_E}{r_p} $$
$$ v_{p/hyp}^2 = v_{\infty}^2 + \frac{2\mu_E}{r_p} = (2.95)^2 + \frac{2 \times 398600}{6678} \implies v_{p/hyp} \approx 11.31 \text{ km/s} $$

**Step 4: Calculate the Trans-Mars Injection (TMI) Burn**
The required delta-v is the difference between the perigee speed of the hyperbola and the speed in the initial circular orbit. The burn is assumed to be instantaneous.
$$ \Delta v = v_{p/hyp} - v_{circ} = 11.31 - 7.72 = 3.59 \text{ km/s} $$

**Reflection:** Each step builds on the last. We started with the big picture (the heliocentric transfer) to find our target velocity. This target, when compared to Earth's own velocity, gave us the necessary escape velocity ($v_{\infty}$). Finally, we zoomed into the Earth-centric departure phase to calculate the exact burn needed from a specific parking orbit to achieve that $v_{\infty}$.

## Diagrams

**1. Overall Patched Conic Trajectory (Earth to Mars)**
```text
                          Mars' Orbit
                       . . . . . . . . . .
                   . .                       . .
                .                               .
              .                                   .
             .                /-\                 .
            .                / | \                .
           .                |  S |                .  <-- Sun (S)
           .                 \ | /                .
            .                 \-/                 .
             .           Hohmann Transfer         .
   Earth's    \             Ellipse             /   (Arrival at Mars)
    Orbit      \ . . . . . . . . . . . . . . . /      /
        o<--------O--------------------------->o     /
       / \      /                             (M)   /
      / E \    /(Departure from Earth)             /
     (SOI)    /                                   /
             /                                   /
            (Hyperbolic Escape)                 (Hyperbolic Capture)
```

**2. Departure Phase Detail**
```text
                     To Sun ->
                     (Heliocentric Transfer Orbit)
                            ^
                            | v_inf vector
                            |
           /----------------o------> v_p/hyp (at SOI boundary, approx.)
          /
         / Hyperbolic
        /  Escape Path
       /
      o <-- Perigee Burn (TMI)
     / \
    | E | <-- Earth
     \_/
    Circular Parking Orbit
```

## Memory technique — remember this forever
1.  **The Story: "The Interplanetary Relay Race."**
    - Your spacecraft is a baton. Earth is the first runner. The Sun is the second, and Mars is the third.
    - **Departure:** To leave Earth, you don't just drop the baton; you have to *throw it forward* to the next runner (the Sun's gravitational field). The speed of that throw, relative to the first runner, is $v_{\infty}$. Earth (runner 1) gives the baton a final push.
    - **Cruise:** The baton is now flying through the air between runners. Its path is governed by the stadium's gravity (the Sun).
    - **Arrival:** Mars (runner 3) has to catch the baton. The speed at which the baton comes in, relative to Mars, is the arrival $v_{\infty}$.
    - The "patch" is the handoff at the edge of the runner's reach (the SOI).

2.  **Must-Know Formulas:**
    - Vis-Viva (Energy): $v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$
    - Hyperbolic Excess Velocity (Energy at infinity): $v_{\infty}^2 = -\frac{\mu}{a_{hyp}}$
    - The Patch (Vector Addition): $\vec{v}_{s/sun} = \vec{v}_{p/sun} + \vec{v}_{\infty}$

3.  **Spaced Repetition Schedule:** Review this material and re-work the example at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start with conservation of energy. Specific orbital energy $\epsilon = \frac{v^2}{2} - \frac{\mu}{r}$. For a hyperbola, $\epsilon > 0$. As $r \to \infty$, potential energy $-\frac{\mu}{r} \to 0$, so all remaining energy is kinetic: $\epsilon = \frac{v_{\infty}^2}{2}$. This defines $v_{\infty}$. The whole method is just applying this energy concept in different gravitational fields and stitching the solutions together by ensuring the velocity vectors match up at the boundary.

## Common mistakes
1.  **Scalar vs. Vector Addition:** Adding speeds instead of velocities. $v_{\infty}$ is a vector. For a Hohmann transfer, it's aligned with the planet's velocity vector, so scalar addition works. For other transfers, you need trigonometry or vector components.
2.  **Mixing up $\mu$ values:** Using the Sun's gravitational parameter ($\mu_S$) when calculating the departure hyperbola, or using Earth's ($\mu_E$) for the heliocentric cruise. Always ask: "Whose gravity field am I in right now?"
3.  **Confusing $v$ at SOI with $v_{\infty}$:** The spacecraft's speed when it crosses the SOI boundary is *not* $v_{\infty}$. Its speed is slightly higher because it still has a little bit of potential energy from the planet's gravity well that hasn't been converted to kinetic energy yet. $v_{\infty}$ is the asymptotic velocity far from the planet.

## Self-check
1.  A probe is planned for a flyby of Jupiter. Mission planners want to use Jupiter's gravity to *increase* the probe's heliocentric speed. When the probe approaches Jupiter's SOI, should its hyperbolic trajectory pass in front of the planet or behind it, relative to Jupiter's direction of motion around the Sun? Justify your answer using the vector addition formula for patching conics.
2.  Calculate the hyperbolic excess velocity ($v_{\infty}$) upon arrival at Mars for the Hohmann transfer designed in the worked example. (Hint: you will need Mars' orbital velocity and the spacecraft's heliocentric velocity at the aphelion of the transfer orbit). Mars' gravitational parameter is $\mu_M = 42828 \text{ km}^3/\text{s}^2$.
3.  A spacecraft leaves Earth with a $v_{\infty}$ of 4.0 km/s. The TMI burn occurs at a perigee altitude of 250 km. The mission is aborted right after the burn, and the spacecraft is now on a hyperbolic trajectory relative to Earth. How long will it take for the spacecraft to reach the approximate distance of the Moon's orbit (384,400 km)? (This requires integrating the equation of motion on a hyperbola, or finding a suitable approximation).