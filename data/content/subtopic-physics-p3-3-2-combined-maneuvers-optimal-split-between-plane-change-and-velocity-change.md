## What it is
A combined maneuver is a single propulsive burn that simultaneously changes both the orientation of an orbit's plane (its inclination, for example) and the in-plane velocity (the orbit's size and shape). The core problem is to determine the most fuel-efficient way to execute this maneuver, as performing the plane change and velocity change components together is often more efficient than performing them as two separate burns.

## Why it matters
This is not a theoretical curiosity; it is fundamental to mission design. Inserting a satellite into geostationary orbit from a launch site not on the equator (like Cape Canaveral or Baikonur) requires a significant plane change combined with a circularization burn. For interplanetary missions, departure burns often combine raising the orbit's energy with a plane change to align with the target planet's orbital plane, saving critical propellant mass.

## When to study it
You must be comfortable with the following concepts first. If any of these are weak, review them before proceeding.
- **Orbital Elements:** Specifically inclination ($i$), right ascension of the ascending node ($\Omega$), and argument of perigee ($\omega$).
- **Keplerian Orbits:** The vis-viva equation ($v^2 = \mu(\frac{2}{r} - \frac{1}{a})$), and velocities at periapsis and apoapsis.
- **In-Plane Maneuvers:** Hohmann transfers, specifically the calculation of the two delta-Vs.
- **Simple Plane Changes:** The derivation and application of the formula $\Delta V = 2v \sin(\frac{\theta}{2})$ for a pure rotation of the velocity vector.
- **Vector Calculus:** Vector addition, subtraction, and the Law of Cosines.

## How to study it (step by step)
1.  **Re-derive the simple plane change.** Start with two velocity vectors of equal magnitude, $\vec{v}_i$ and $\vec{v}_f$, separated by an angle $\theta$. Draw the vector subtraction diagram for $\Delta \vec{v} = \vec{v}_f - \vec{v}_i$. Use the law of cosines or geometry on the resulting isosceles triangle to re-derive $\Delta V = 2v \sin(\frac{\theta}{2})$. This reinforces the geometry.
2.  **Generalize to unequal magnitudes.** Now, draw the same vector diagram but with $|\vec{v}_i| \neq |\vec{v}_f|$. This represents changing the orbit's size/shape *and* its plane. Apply the Law of Cosines to the triangle formed by $\vec{v}_i$, $\vec{v}_f$, and $\Delta \vec{v}$. This will yield the fundamental equation for a combined maneuver.
3.  **Analyze the equation.** Look at the combined maneuver $\Delta V$ equation. Ask yourself: for a fixed plane change angle $\theta$ and fixed initial velocity $v_i$, how does the cost change as $v_f$ changes? What if $v_i$ is very large or very small? Build intuition for the trade-offs.
4.  **Solve a canonical problem.** Calculate the total $\Delta V$ for a transfer from an inclined Low Earth Orbit (LEO) to an equatorial Geostationary Orbit (GEO) using three different strategies:
    a. Hohmann transfer first, then a simple plane change at apoapsis.
    b. Simple plane change in LEO first, then a Hohmann transfer.
    c. A single, combined maneuver at perigee (the first burn of the Hohmann transfer).
    Compare the total fuel cost for all three. This will prove the benefit of the combined maneuver.
5.  **Consider the optimal split.** For very large plane changes ($> 40^\circ$), it can be more efficient to perform the maneuver at a point of lower velocity, even if that point is not on the transfer orbit's apsides. This leads to the concept of "cranking" the orbit plane at apoapsis. Contemplate why this is true using the simple plane change formula as your guide.

## Key ideas, with intuition
1.  **Velocity is a Vector.** An orbital maneuver is nothing more than changing the spacecraft's velocity vector $\vec{v}$. A change in magnitude alters the orbit's energy (size/shape). A change in direction alters the orbit's plane. A combined maneuver does both at once.
2.  **Vector Subtraction is the Cost.** The fuel cost, $\Delta V$, is the magnitude of the vector change: $\Delta V = |\Delta \vec{v}| = |\vec{v}_f - \vec{v}_i|$. This simple vector triangle is the foundation for everything that follows.
3.  **The Law of Cosines Governs the Cost.** From the vector triangle, the Law of Cosines directly gives the cost of a single-burn combined maneuver, where $\theta$ is the angle of the plane change.
    $$ (\Delta V)^2 = v_i^2 + v_f^2 - 2v_i v_f \cos(\theta) $$
    This is the central equation. It combines the cost of changing speed (related to $v_i$ and $v_f$) and the cost of changing the plane (related to $\theta$).
4.  **Plane Changes are Cheaper when Slow.** Look at the simple plane change formula: $\Delta V = 2v \sin(\frac{\theta}{2})$. The cost is directly proportional to the velocity $v$ at which you perform the burn. Therefore, it is always most efficient to perform a plane change at the point in an orbit where the spacecraft is moving slowest (apoapsis). This is the single most important piece of intuition. This is why Strategy 4(a) above is usually much better than 4(b). The combined maneuver (4c) is often even better because it gets some of the plane change "for free" while performing a large burn anyway.

## Worked example
**Problem:** A spacecraft is in a 300 km circular LEO with an inclination of $28.5^\circ$. We want to place it in a geostationary orbit (GEO), which is circular at 42,164 km from Earth's center and has an inclination of $0^\circ$. Compare the $\Delta V$ cost of performing the first Hohmann transfer burn as a combined maneuver versus performing the burn and the plane change separately at LEO.

**Given:**
- Earth's gravitational parameter $\mu = 398,600 \text{ km}^3/\text{s}^2$.
- Earth's radius $R_E = 6378 \text{ km}$.
- Initial orbit: circular, $h_1 = 300 \text{ km}$, $i_1 = 28.5^\circ$.
- Final orbit: circular, $r_2 = 42,164 \text{ km}$, $i_2 = 0^\circ$.
- The required plane change is $\theta = 28.5^\circ$.

**Step 1: Calculate initial and transfer orbit velocities.**
- Initial radius: $r_1 = R_E + h_1 = 6378 + 300 = 6678 \text{ km}$.
- Initial circular velocity in LEO: $v_{i} = v_{c1} = \sqrt{\frac{\mu}{r_1}} = \sqrt{\frac{398600}{6678}} = 7.726 \text{ km/s}$.
- Hohmann transfer orbit semi-major axis: $a_t = \frac{r_1 + r_2}{2} = \frac{6678 + 42164}{2} = 24421 \text{ km}$.
- Velocity at perigee of transfer orbit (after the first burn): $v_{p} = \sqrt{\mu(\frac{2}{r_1} - \frac{1}{a_t})} = \sqrt{398600(\frac{2}{6678} - \frac{1}{24421})} = 10.15 \text{ km/s}$.

**Step 2: Strategy A - Separate Maneuvers (Plane Change then Burn).**
- First, perform the plane change in LEO.
  $\Delta V_{pc} = 2 v_{i} \sin(\frac{\theta}{2}) = 2(7.726) \sin(\frac{28.5^\circ}{2}) = 3.824 \text{ km/s}$.
- Then, perform the Hohmann burn to leave LEO.
  $\Delta V_{burn} = v_{p} - v_{i} = 10.15 - 7.726 = 2.424 \text{ km/s}$.
- Total $\Delta V_A = \Delta V_{pc} + \Delta V_{burn} = 3.824 + 2.424 = 6.248 \text{ km/s}$.

**Step 3: Strategy B - Combined Maneuver.**
- We perform a single burn at perigee to both raise the apoapsis and change the plane.
- Initial velocity vector magnitude: $v_i = 7.726 \text{ km/s}$.
- Final velocity vector magnitude (in the new plane): $v_f = v_p = 10.15 \text{ km/s}$.
- Angle between the vectors: $\theta = 28.5^\circ$.
- Use the Law of Cosines formula for the combined maneuver:
  $\Delta V_B = \sqrt{v_i^2 + v_f^2 - 2v_i v_f \cos(\theta)}$
  $\Delta V_B = \sqrt{(7.726)^2 + (10.15)^2 - 2(7.726)(10.15)\cos(28.5^\circ)}$
  $\Delta V_B = \sqrt{59.69 + 103.02 - 156.84(0.8788)}$
  $\Delta V_B = \sqrt{162.71 - 137.84} = \sqrt{24.87} = 4.987 \text{ km/s}$.

**Reflection:**
- Strategy A (separate burns) cost $6.248 \text{ km/s}$.
- Strategy B (combined burn) cost $4.987 \text{ km/s}$.
- The combined maneuver saves $1.261 \text{ km/s}$, a massive amount of propellant.
- This works because we are applying the thrust needed for the plane change at the same time as the large thrust needed to raise the orbit's energy. The vector addition is highly favorable.

## Diagrams

This diagram shows the vector relationship for a combined maneuver. $\vec{v}_i$ is the initial velocity. The burn provides a $\Delta \vec{v}$, resulting in the final velocity $\vec{v}_f$, which has a new magnitude and is rotated by an angle $\theta$.

```text
              /
             /
            /
      v_f  /
          /
         /
        /  <-- angle theta
       +----------------> v_i
       | \
       |  \
       |   \
 Delta V    \
       |     \
       |      \
       v       \
```

The relationship is $\vec{v}_f = \vec{v}_i + \Delta \vec{v}$, or more usefully for calculation, $\Delta \vec{v} = \vec{v}_f - \vec{v}_i$. The diagram above shows the vector addition triangle; the Law of Cosines is applied to this geometry.

## Memory technique — remember this forever
1.  **Visual Hook:** "Turn when you're slow, burn when you must." Imagine driving a car. Making a sharp turn is easier and safer at low speed. If you also need to accelerate onto a highway, you time the turn and the acceleration together for a smooth on-ramp merge. For orbits, it's not about smoothness, but fuel: it costs less energy to "turn" (change plane) a slow-moving object.
2.  **Must-Know Formulas:** Overlearn these two.
    -   **Pure Plane Change:** $\Delta V = 2v \sin(\frac{\theta}{2})$ (Cost is proportional to current velocity $v$).
    -   **Combined Maneuver:** $\Delta V = \sqrt{v_i^2 + v_f^2 - 2v_i v_f \cos(\theta)}$ (Law of Cosines on the velocity vectors).
3.  **Spaced Repetition Schedule:** Review this topic and re-solve the worked example at: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, rebuild it.
    -   Start with the definition of a maneuver: $\Delta \vec{v} = \vec{v}_{final} - \vec{v}_{initial}$.
    -   The cost is the magnitude of this vector: $\Delta V = |\Delta \vec{v}|$.
    -   To find the magnitude of a vector, square it using the dot product: $(\Delta V)^2 = |\vec{v}_f - \vec{v}_i|^2 = (\vec{v}_f - \vec{v}_i) \cdot (\vec{v}_f - \vec{v}_i)$.
    -   Expand the dot product: $(\Delta V)^2 = \vec{v}_f \cdot \vec{v}_f - 2(\vec{v}_f \cdot \vec{v}_i) + \vec{v}_i \cdot \vec{v}_i$.
    -   Recall the definition of the dot product $\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos(\theta)$. This gives: $(\Delta V)^2 = v_f^2 - 2v_f v_i \cos(\theta) + v_i^2$.
    -   Take the square root. You have just re-derived the Law of Cosines and the core formula for combined maneuvers.

## Common mistakes
1.  **Using the wrong angle.** The angle $\theta$ in the formula is the total angle of the plane change. For an inclination change from $i_1$ to $i_2$ at the equator, it's simply $|i_1 - i_2|$. If the burn is not at the equator, the geometry is more complex (spherical law of cosines is needed).
2.  **Applying the formula at the wrong time.** The combined maneuver is often most efficient when combined with the *largest* of the planned burns. For a LEO-to-GEO transfer, this is the first burn at perigee, not the second circularization burn at apogee.
3.  **Assuming a single burn is always optimal.** For very large plane changes (e.g., $> 40^\circ$), it can be more efficient to use a three-burn sequence: one burn to raise apoapsis far out of the gravity well, a second tiny-velocity burn at apoapsis to perform the plane change cheaply, and a third to re-circularize. This is because the $v$ in $2v\sin(\theta/2)$ becomes extremely small at a very high apoapsis.
4.  **Algebraic errors with the Law of Cosines.** It's easy to drop a square or mix up $v_i$ and $v_f$. Write every step down clearly, as in the worked example.

## Self-check
1.  A satellite is in a highly elliptical "Molyina" orbit. To maximize fuel efficiency for a simple plane change maneuver, should the burn be performed near perigee or apogee? Why?
2.  A spacecraft in a 400 km circular Earth orbit ($v \approx 7.67$ km/s) must enter a new orbit at the same altitude, but with its plane rotated by $10^\circ$. It must also decrease its speed to $7.50$ km/s in the new plane. Calculate the $\Delta V$ for a single combined burn to achieve this.
3.  Consider a transfer from a 200 km circular orbit at $i=45^\circ$ to a 1000 km circular orbit at $i=0^\circ$. You have two options for the first burn (leaving the 200 km orbit): (A) a tangential burn to enter a Hohmann transfer orbit, or (B) a combined burn that also accomplishes $5^\circ$ of the required plane change. Which burn, A or B, will have a larger magnitude? Justify your answer conceptually without full calculations.