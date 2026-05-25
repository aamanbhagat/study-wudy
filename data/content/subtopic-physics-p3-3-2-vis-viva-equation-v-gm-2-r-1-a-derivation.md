## What it is
The Vis-viva equation relates the speed, $v$, of an object in a two-body orbit to its distance, $r$, from the central body. It states that the square of the speed is proportional to the difference between the inverse of the current distance and the inverse of the orbit's semi-major axis, $a$. This equation is a direct consequence of the conservation of mechanical energy.

## Why it matters
This equation is the workhorse of orbital mission design and analysis. It allows you to calculate the required velocity for a satellite at any point in a desired orbit, which is fundamental for calculating the fuel ($\Delta v$, or "delta-v") needed for orbital maneuvers like orbit insertion, circularization, or interplanetary transfers. It connects the *geometry* of an orbit (its size, $a$) to the *dynamics* of the object within it (its speed, $v$).

## When to study it
Before tackling this derivation, you must have a firm grasp of the following concepts. If any are weak, review them first.
*   **Newton's Law of Universal Gravitation:** $F_g = G \frac{M m}{r^2}$
*   **Gravitational Potential Energy:** $U_g = -G \frac{M m}{r}$
*   **Conservation of Mechanical Energy:** $E = K + U = \frac{1}{2}mv^2 - G \frac{M m}{r} = \text{constant}$
*   **Conservation of Specific Angular Momentum:** $h = ||\vec{r} \times \vec{v}|| = rv \sin\beta = \text{constant}$ (where $\beta$ is the angle between $\vec{r}$ and $\vec{v}$)
*   **Geometry of an Ellipse:** Definitions of semi-major axis ($a$), apoapsis ($r_a$), and periapsis ($r_p$), and the relations $r_a + r_p = 2a$.

## How to study it (step by step)
1.  **Start with Conservation of Energy.** Write the total mechanical energy $E$ of a satellite of mass $m$ orbiting a central body of mass $M$. This is the sum of its kinetic and potential energy.
2.  **Evaluate Energy at Apoapsis.** Pick a convenient point in the orbit: the apoapsis (farthest point). At this point, the velocity vector $\vec{v}_a$ is perpendicular to the position vector $\vec{r}_a$, so the speed is at its minimum. Write the total energy equation specifically for this point.
3.  **Evaluate Energy at Periapsis.** Do the same for the periapsis (closest point), where the velocity $\vec{v}_p$ is also perpendicular to the position vector $\vec{r}_p$ and the speed is at its maximum.
4.  **Use Conservation of Angular Momentum.** At apoapsis and periapsis, the specific angular momentum is simply $h = r_p v_p = r_a v_a$. Use this to express $v_a$ in terms of $v_p$ (or vice-versa).
5.  **Solve for Energy in terms of Geometry.** Equate the energy expressions from apoapsis and periapsis. Substitute your expression for $v_a$ from the previous step. Solve this system to find an expression for the total energy $E$ that depends *only* on geometric properties ($a$) and physical constants ($G, M, m$).
6.  **Equate and Isolate v².** You now have two expressions for the total energy $E$: the general one from Step 1 (with general $v$ and $r$) and the specific one from Step 5 (with $a$). Set them equal to each other and algebraically solve for $v^2$.

## Key ideas, with intuition
1.  **Energy is Constant, but its Form Changes.** The total energy of an orbit is fixed. As a satellite moves from periapsis to apoapsis, it "climbs" out of the gravity well. This increases its potential energy (making it less negative). To keep the total energy constant, its kinetic energy (and thus speed) must decrease. The Vis-viva equation quantifies this trade-off.
    $$ E = \underbrace{\frac{1}{2}mv^2}_{\text{Kinetic}} \underbrace{- \frac{GMm}{r}}_{\text{Potential}} = \text{Constant} $$
2.  **The Semi-Major Axis Defines the Orbit's Energy.** The most crucial insight from the derivation is that the total mechanical energy of an orbit depends *only* on its semi-major axis, $a$. It does not depend on the orbit's eccentricity (shape). A bigger orbit (larger $a$) has more energy (is less negative). This is a profound link between geometry and energy.
    $$ E = - \frac{GMm}{2a} $$
3.  **Local vs. Global.** The Vis-viva equation elegantly connects a *local* state ($v$ and $r$ at a specific point) with a *global* property of the entire orbit (its size, $a$). The $\frac{2}{r}$ term can be thought of as related to the potential energy at your current location, while the $-\frac{1}{a}$ term is related to the total energy of the orbital path you are on.

## Worked example
**Problem:** A spacecraft is in an elliptical orbit around Earth ($M_E = 5.972 \times 10^{24}$ kg, $G = 6.674 \times 10^{-11} \text{ m}^3 \text{kg}^{-1} \text{s}^{-2}$). Its perigee altitude is 300 km and its apogee altitude is 2000 km. Calculate its speed at perigee.

**Solution:**

1.  **Convert altitudes to radii.** We must measure distance from the center of the Earth. Earth's radius is $R_E \approx 6371$ km.
    *   Perigee radius: $r_p = R_E + h_p = 6371 \text{ km} + 300 \text{ km} = 6671 \text{ km} = 6.671 \times 10^6 \text{ m}$.
    *   Apogee radius: $r_a = R_E + h_a = 6371 \text{ km} + 2000 \text{ km} = 8371 \text{ km} = 8.371 \times 10^6 \text{ m}$.

2.  **Calculate the semi-major axis, $a$.** The semi-major axis is the average of the perigee and apogee distances.
    $$ a = \frac{r_p + r_a}{2} = \frac{6.671 \times 10^6 \text{ m} + 8.371 \times 10^6 \text{ m}}{2} = \frac{15.042 \times 10^6 \text{ m}}{2} = 7.521 \times 10^6 \text{ m} $$

3.  **Apply the Vis-viva equation.** We want to find the speed $v$ at the specific radius $r = r_p$.
    $$ v^2 = GM \left( \frac{2}{r} - \frac{1}{a} \right) $$
    $$ v_p^2 = GM_E \left( \frac{2}{r_p} - \frac{1}{a} \right) $$

4.  **Substitute values and solve.**
    *   First, calculate the standard gravitational parameter $\mu = GM_E$:
        $\mu = (6.674 \times 10^{-11})(5.972 \times 10^{24}) \approx 3.986 \times 10^{14} \text{ m}^3\text{s}^{-2}$.
    *   Now, substitute into the equation:
        $$ v_p^2 = (3.986 \times 10^{14}) \left( \frac{2}{6.671 \times 10^6} - \frac{1}{7.521 \times 10^6} \right) $$
        $$ v_p^2 = (3.986 \times 10^{14}) \left( 2.997 \times 10^{-7} - 1.329 \times 10^{-7} \right) $$
        $$ v_p^2 = (3.986 \times 10^{14}) (1.668 \times 10^{-7}) $$
        $$ v_p^2 \approx 6.649 \times 10^7 \text{ m}^2\text{s}^{-2} $$
    *   Take the square root to find the speed:
        $$ v_p = \sqrt{6.649 \times 10^7} \approx 8154 \text{ m/s} \approx 8.15 \text{ km/s} $$

**Reflection:** Each step was necessary. Converting altitudes to radii (Step 1) is crucial because gravity acts from the center of mass. Calculating the semi-major axis (Step 2) gave us the 'global' energy parameter of the orbit. Applying the Vis-viva equation (Step 3) directly connected this global parameter to the local state at perigee. The final calculation (Step 4) yielded the speed.

## Diagrams

An elliptical orbit showing key parameters:

```text
               * m (v_a)
             *   *
           *       *
         *           *
        *             *
(M)-----.---------------.-----> Apocenter (r_a)
 F1     *             * F2
         *           *
           *       *
             *   *
               * m (v_p)
               ^
               |
            Pericenter (r_p)

<---------- 2a ----------> (Major Axis)
```
*   `(M)`: Central body at one focus, F1.
*   `m`: Orbiting body.
*   `r_p`: Periapsis distance (closest approach).
*   `r_a`: Apoapsis distance (farthest point).
*   `v_p`, `v_a`: Velocity vectors at periapsis and apoapsis (perpendicular to position vector).
*   `2a`: The length of the major axis of the ellipse.

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of orbital energy as a bank account. `GM` is the bank. To exist at a distance `r`, you must pay a "potential energy tax" of `1/r`. But wait! An orbit gives you a "kinetic energy credit" of another `1/r`, for a total local value of `2/r`. Your total "energy wealth" for the entire orbit is fixed at `1/a`. The Vis-viva equation is the bank statement: `v^2 = GM ( local\_value - total\_wealth )`.
2.  **Formulas to Overlearn:**
    $$ v^2 = GM \left( \frac{2}{r} - \frac{1}{a} \right) $$
    $$ E = - \frac{GMm}{2a} $$
3.  **Spaced Repetition Schedule:** Review this derivation and these two formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive it from scratch each time.
4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Start with the two pillars: Conservation of Energy and Conservation of Angular Momentum.
    *   `Energy`: $E = \frac{1}{2}mv^2 - \frac{GMm}{r}$.
    *   `Angular Momentum`: $r_p v_p = r_a v_a$.
    *   The key is to find $E$ in terms of $a$. Write the energy equation at apoapsis and periapsis, substitute one velocity using angular momentum, and solve. You'll find $E = -GMm/2a$.
    *   Equate the two energy expressions and solve for $v^2$.

## Common mistakes
*   **Altitude vs. Radius:** Always add the planet's radius to any given altitude. Gravitational laws are defined from the center of mass. Forgetting this is the most common error.
*   **Units:** Using kilometers for radius when $G$ or $\mu=GM$ is in meters. Convert everything to a consistent system (SI: meters, kilograms, seconds) before calculating.
*   **Parabolic/Hyperbolic Orbits:** The Vis-viva equation works for all conic sections. For a parabola (escape trajectory), $a \to \infty$, so $1/a \to 0$. For a hyperbola (flyby), $a$ is negative. Students often forget this and assume it's only for ellipses.
*   **Wrong `a`:** Using the full major axis ($2a$) instead of the semi-major axis ($a$) in the formula.

## Self-check
1.  A satellite is in a circular orbit with a speed of 7.5 km/s around Earth. What is its altitude above the surface?
2.  A probe in orbit around Jupiter ($M_J = 1.898 \times 10^{27}$ kg) is observed to be traveling at 50 km/s at a distance of $2 \times 10^8$ m from the planet's center. Is its orbit bound (elliptical) or unbound (hyperbolic)? Justify your answer without fully calculating the trajectory.
3.  Derive the escape velocity formula, $v_{esc} = \sqrt{\frac{2GM}{r}}$, directly from the Vis-viva equation by considering the definition of an escape trajectory. What is the total mechanical energy of an object moving at exactly escape velocity?