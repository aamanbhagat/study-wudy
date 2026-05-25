## What it is
In a two-body system governed by gravity, the total mechanical energy and the total angular momentum of the orbiting body are constant. Energy conservation dictates a trade-off between the body's speed (kinetic energy) and its distance from the central mass (potential energy). Angular momentum conservation dictates that the body sweeps out equal areas in equal times, constraining its motion to a single plane.

## Why it matters
These two conservation laws are the foundation of astrodynamics. They allow us to determine the size, shape, and orientation of any orbit without needing to integrate the full equations of motion over time. For engineers, this means we can calculate key orbital parameters like apoapsis/periapsis velocities and altitudes, plan fuel-efficient orbital maneuvers (like the Hohmann transfer), and predict the trajectory of spacecraft, satellites, and celestial bodies.

## When to study it
Before tackling this, you must have a firm grasp of the following from introductory mechanics and calculus:
- Newton's Law of Universal Gravitation: $\vec{F}_g = -\frac{GMm}{r^2}\hat{r}$
- Definitions of kinetic energy ($K = \frac{1}{2}mv^2$) and potential energy ($U$)
- The work-energy theorem
- Vector cross product: $\vec{a} \times \vec{b}$
- Definitions of torque ($\vec{\tau} = \vec{r} \times \vec{F}$) and angular momentum ($\vec{L} = \vec{r} \times \vec{p}$)
- The relationship $\vec{\tau} = \frac{d\vec{L}}{dt}$
- The concept of a conservative force and its relation to potential energy: $\vec{F} = -\nabla U$

If any of these are weak, review them first. These principles are not optional prerequisites; they are the axioms from which we will derive everything.

## How to study it (step by step)
1.  **Derive Angular Momentum Conservation.** Start with Newton's law of gravitation, $\vec{F}_g$. Calculate the torque $\vec{\tau} = \vec{r} \times \vec{F}_g$ exerted by the central body (mass $M$) on the orbiting body (mass $m$). Show that because $\vec{r}$ and $\vec{F}_g$ are always anti-parallel, the torque is always zero. Use $\vec{\tau} = \frac{d\vec{L}}{dt}$ to prove that $\vec{L}$ must be a constant vector.
2.  **Interpret Angular Momentum Conservation.** A constant vector $\vec{L} = \vec{r} \times m\vec{v}$ means two things: its magnitude is constant, and its direction is constant. Explain to yourself why a constant direction for $\vec{L}$ forces the orbital motion to be confined to a plane (the "orbital plane") perpendicular to $\vec{L}$.
3.  **Derive Energy Conservation.** Start with the definition of work done by a force $\vec{F}$ over a path $d\vec{s}$: $dW = \vec{F} \cdot d\vec{s}$. Use the work-energy theorem ($dW = dK$) and the fact that gravity is a conservative force ($\vec{F}_g = -\nabla U_g$, where $U_g = -\frac{GMm}{r}$) to show that $dK = -dU_g$. Rearrange this to prove that $d(K+U_g) = 0$, meaning the total mechanical energy $E=K+U_g$ is constant.
4.  **Define Specific Quantities.** In astrodynamics, we often divide by the orbiting mass $m$ to get "specific" quantities. Define the specific angular momentum $\vec{h} = \vec{L}/m = \vec{r} \times \vec{v}$ and specific mechanical energy $\mathcal{E} = E/m = \frac{v^2}{2} - \frac{\mu}{r}$, where $\mu = GM$ is the standard gravitational parameter. These are the workhorse variables.
5.  **Solve a Periapsis-Apoapsis Problem.** Find a standard textbook problem where you are given the radius and velocity at periapsis ($r_p, v_p$) and asked to find the velocity at apoapsis ($v_a$). Use the conservation of both specific angular momentum ($r_p v_p = r_a v_a$) and specific energy ($\frac{v_p^2}{2} - \frac{\mu}{r_p} = \frac{v_a^2}{2} - \frac{\mu}{r_a}$) to solve the system of two equations for the two unknowns, $r_a$ and $v_a$.

## Key ideas, with intuition
1.  **Gravity is a Central Force, so Torque is Zero.** A central force is one that always points towards or away from a single point (the center of mass). Since the gravitational force $\vec{F}_g$ on a satellite always points toward the Earth's center, and the position vector $\vec{r}$ points from the Earth's center to the satellite, the two vectors are always collinear. The cross product of two collinear vectors is zero.
    $$ \vec{\tau} = \vec{r} \times \vec{F}_g = 0 $$
    Since torque is the rate of change of angular momentum ($\vec{\tau} = d\vec{L}/dt$), zero torque means angular momentum does not change. This is the "why" behind angular momentum conservation. Intuition: You can't use a central force to create a spin or twist.

2.  **Constant Angular Momentum means Planar Motion and Kepler's 2nd Law.** The angular momentum vector is $\vec{L} = \vec{r} \times m\vec{v}$. By the definition of the cross product, $\vec{L}$ is perpendicular to both $\vec{r}$ and $\vec{v}$. If $\vec{L}$ is a constant vector, it always points in the same direction in space. This means that $\vec{r}$ and $\vec{v}$ must always lie in the plane that is perpendicular to $\vec{L}$. This is the orbital plane. Furthermore, the magnitude of the angular momentum, $h = |\vec{r} \times \vec{v}| = rv \sin\theta = rv_\perp$, relates to the area swept out by the position vector. Constant $h$ is a mathematical statement of Kepler's Second Law: a line joining a planet and the Sun sweeps out equal areas during equal intervals of time.

3.  **Gravity is Conservative, so Mechanical Energy is Conserved.** A force is conservative if the work it does on an object moving between two points does not depend on the path taken. Gravity has this property. This allows us to define a potential energy function $U_g = -GMm/r$ such that the work done by gravity is the negative of the change in potential energy. The work-energy theorem states that the total work done equals the change in kinetic energy.
    $$ W_{net} = \Delta K $$
    If gravity is the only force, then $W_{net} = W_g = -\Delta U_g$.
    $$ -\Delta U_g = \Delta K \implies \Delta K + \Delta U_g = \Delta(K+U_g) = 0 $$
    This means the total mechanical energy $E = K+U_g$ is constant. Intuition: Energy is a cosmic accounting system. You can trade the energy of motion (kinetic) for the energy of position (potential), but the total amount in your account is fixed unless an external force like drag or thrust makes a deposit or withdrawal.

## Worked example
**Problem:** A satellite in orbit around Earth has a perigee altitude of 500 km and a velocity of 8.0 km/s at this point. What is its velocity at its apogee altitude of 1500 km? (Use Earth's radius $R_E \approx 6371$ km and gravitational parameter $\mu_E \approx 3.986 \times 10^5 \text{ km}^3/\text{s}^2$).

**Solution:**

1.  **Identify knowns and convert to radii.**
    The altitudes are given, not the radii. The radius is altitude + Earth's radius.
    - Perigee radius: $r_p = 500 \text{ km} + 6371 \text{ km} = 6871 \text{ km}$
    - Apogee radius: $r_a = 1500 \text{ km} + 6371 \text{ km} = 7871 \text{ km}$
    - Perigee velocity: $v_p = 8.0 \text{ km/s}$
    - We need to find the apogee velocity, $v_a$.

2.  **Apply Conservation of Angular Momentum.**
    At perigee and apogee, the velocity vector is exactly perpendicular to the position vector. Thus, the specific angular momentum $h = rv_\perp$ simplifies to $h = r_p v_p$ at perigee and $h = r_a v_a$ at apogee. Since angular momentum is conserved:
    $$ r_p v_p = r_a v_a $$
    This gives us one equation relating our knowns to our unknown, $v_a$.
    $$ (6871 \text{ km})(8.0 \text{ km/s}) = (7871 \text{ km}) v_a $$
    $$ v_a = \frac{6871 \times 8.0}{7871} \text{ km/s} \approx 6.98 \text{ km/s} $$

**Reflection:**
- Step 1 worked because we correctly identified that orbital mechanics calculations use the distance from the center of the central body (radius), not the distance from the surface (altitude).
- Step 2 worked because conservation of angular momentum provides a direct, simple relationship between radius and velocity at the two extreme points of an ellipse (the apsides), where the velocity is purely tangential. We didn't even need to use the energy equation for this specific question, which highlights the power of choosing the right conservation law. If the problem had asked for the semi-major axis, we would have needed the energy equation as well.

## Diagrams
An elliptical orbit, showing the key vectors at an arbitrary point.

```text
                  . . . . . . . . . . . . . . .
            .                                     .
        .                                             .
      .                                                 .
     .                                                   .
    .                                                     .
   .                                                       .
   .                      v_perp ^                         .
  .                            |   /                       .
 .                             |  / v                      .
 .                             | /                         .
 .                             o<------------------ r ------. Satellite (m)
 .                           /
  .                         / v_rad
   .                       .
    .                     .
     .         F_g <---- @ ------> r=0                     .
      .                (M)                                .
        .             Focus                               .
            .                                     .
                  . . . . . . . . . . . . . . .
```
- `@ (M)` is the central body (e.g., Earth) at one focus of the ellipse.
- `o (m)` is the orbiting satellite.
- `r` is the position vector from M to m.
- `v` is the velocity vector of the satellite, tangent to the orbital path.
- `v_perp` (or $v_\theta$) and `v_rad` (or $v_r$) are the tangential and radial components of the velocity.
- `F_g` is the force of gravity, pointing from m to M (anti-parallel to `r`).

## Memory technique — remember this forever
1.  **The Mnemonic Story: "The Cosmic Ice Skater"**
    Imagine an ice skater spinning in space around a star. Her path is an ellipse.
    - **Angular Momentum:** As she gets closer to the star (periapsis), she pulls her arms in. Her radius `r` decreases, so to keep her angular momentum `h = r * v_perp` constant, her tangential velocity `v_perp` must increase. She spins faster. As she moves away (apoapsis), she extends her arms, `r` increases, and she slows down. Her angular momentum is her "spin identity," and it never changes.
    - **Energy:** Her total energy is her "effort level," which is also constant. It's a sum of her speed-energy (kinetic) and her altitude-energy (potential). When she falls closer to the star, her potential energy decreases (becomes more negative), so her kinetic energy must increase to keep the total constant. She speeds up.

2.  **Formulas to Overlearn (Specific Form):**
    - **Specific Angular Momentum:** $h = r v \cos\gamma$ (where $\gamma$ is the flight path angle, the angle between $\vec{r}$ and $\vec{v}$). At apoapsis and periapsis, $\gamma=90^\circ$ and $\cos\gamma=1$, so $h = r_p v_p = r_a v_a$.
    - **Specific Mechanical Energy:** $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$. This value is constant everywhere on the orbit.

3.  **Spaced Repetition Schedule:**
    Derive the two conservation laws from first principles and solve one new problem on: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:**
    - If you forget the angular momentum formula, remember **torque**. Gravity is a central force $\implies \vec{F}_g \propto -\hat{r}$. Torque $\vec{\tau} = \vec{r} \times \vec{F}_g = 0$. Since $\vec{\tau} = d\vec{L}/dt$, $\vec{L}$ must be constant.
    - If you forget the energy formula, remember **work**. Gravity is a conservative force $\implies \vec{F}_g = -\nabla U_g$. The Work-Energy theorem says $dK = \vec{F}_g \cdot d\vec{s}$. Substitute to get $dK = -\nabla U_g \cdot d\vec{s} = -dU_g$. Rearrange to $d(K+U_g)=0$, so $K+U_g$ is constant.

## Common mistakes
1.  **Using Altitude Instead of Radius.** Always add the central body's radius to the altitude to get the orbital radius $r$. All formulas use the distance from the center of mass.
2.  **Ignoring the Negative Sign in Potential Energy.** Gravitational potential energy is defined as zero at an infinite distance and becomes more negative as you get closer. $U_g = -GMm/r$. Forgetting the negative sign will make all energy calculations incorrect.
3.  **Applying Conservation Laws When They Don't Apply.** These laws only hold if gravity is the *only* force acting on the body. If there is atmospheric drag, solar radiation pressure, or engine thrust, then energy and angular momentum are *not* conserved.
4.  **Using Total Velocity for Angular Momentum.** The magnitude of specific angular momentum is $h = |\vec{r} \times \vec{v}| = r v \sin\theta = r v_\perp$. It is the component of velocity perpendicular to the position vector that matters. This is only equal to the total velocity at periapsis and apoapsis.

## Self-check
1.  A geostationary satellite is in a circular orbit. If a small thruster burn slightly increases its speed (in the direction of motion), what happens *immediately* to its specific energy and its specific angular momentum?
2.  A probe is in an elliptical orbit around Mars. At its closest point (periapsis), it is 400 km above the surface with a speed of 4.0 km/s. Its speed at its farthest point (apoapsis) is 1.5 km/s. What is the probe's altitude at apoapsis? (You will need to look up Mars' radius and gravitational parameter).
3.  A comet on a hyperbolic trajectory passes by the Sun. Its speed at perihelion (closest approach) of 0.5 AU is 60 km/s. What will its speed be when it is effectively at an infinite distance from the Sun? (This is its "hyperbolic excess velocity").