## What it is
A circular orbit is the simplest stable path an object can take around a central body. It occurs when the gravitational force pulling the object inward is exactly equal to the centripetal force required to keep it moving in a circle at a constant speed. This perfect balance results in a constant orbital radius and velocity.

## Why it matters
Circular orbits are the foundation of astrodynamics and mission design. Many Earth observation satellites, the International Space Station, and constellations like GPS and Starlink operate in near-circular orbits, making these calculations essential for predicting their position, planning maneuvers, and ensuring mission success. Understanding this idealized case is the first step to analyzing more complex elliptical orbits.

## When to study it
Before proceeding, you must be proficient with two concepts from Newtonian mechanics:
1.  **Newton's Law of Universal Gravitation:** You must know and understand the formula $F_g = G \frac{M m}{r^2}$.
2.  **Uniform Circular Motion:** You must be able to derive or recall the formula for centripetal acceleration, $a_c = \frac{v^2}{r}$, and centripetal force, $F_c = m a_c = \frac{m v^2}{r}$.

If you cannot derive these from first principles, review them before continuing.

## How to study it (step by step)
1.  **Derive Velocity:** Start with a force balance. Set the gravitational force equal to the centripetal force. Algebraically solve for the orbital velocity, $v$. Notice which variables cancel out and think about what that implies.
2.  **Derive Period:** The period, $T$, is the time for one full orbit. Use the definition of speed (distance/time) for a circle: $v = \frac{2\pi r}{T}$. Substitute your derived velocity from step 1 into this equation and solve for $T$. This will give you Kepler's Third Law for circular orbits.
3.  **Derive Energy:** The total orbital energy $E$ is the sum of kinetic energy ($K = \frac{1}{2}mv^2$) and gravitational potential energy ($U = -G\frac{Mm}{r}$). Substitute your velocity expression from step 1 into the kinetic energy term and simplify the sum $E = K+U$. Pay close attention to the negative signs.
4.  **Calculate for a Real Case:** Find the orbital velocity and period for the International Space Station, assuming a circular orbit at an altitude of 400 km. Use standard values for Earth's mass ($M_E$) and radius ($R_E$). This will make the abstract formulas concrete.
5.  **Analyze the Relationships:** Examine the final formulas. How does velocity change if you double the orbital radius? How does the period change? Why is the total energy negative, and what does that physically mean?

## Key ideas, with intuition
1.  **The fundamental balance is $F_g = F_c$.**
    An orbit is not about "zero gravity." It's about falling and continuously missing the ground. Gravity is the only force acting on the satellite, and it provides the exact inward pull needed to curve its path into a circle. Without this force, the satellite would fly off in a straight line. Without its tangential velocity, it would fall straight down.
    $$
    G \frac{M m}{r^2} = \frac{m v^2}{r}
    $$
2.  **Higher orbits are slower.**
    This is counter-intuitive but follows directly from the force balance. Solving for velocity, we get $v = \sqrt{\frac{GM}{r}}$. As the orbital radius $r$ increases, the required velocity $v$ *decreases*. This is because gravity is weaker at greater distances, so less tangential speed is needed to maintain the stable "falling and missing" path of an orbit.
    $$
    v \propto \frac{1}{\sqrt{r}}
    $$
3.  **Total orbital energy is negative and constant.**
    The total energy of a bound system is negative. A satellite is "trapped" in the planet's gravity well. To escape the orbit and travel to infinity, you would need to add energy to bring the total energy up to zero. The derivation reveals a simple relationship between kinetic and total energy:
    $$
    E = K + U = \frac{1}{2}mv^2 - \frac{GMm}{r}
    $$
    Substituting $v^2 = \frac{GM}{r}$ gives:
    $$
    E = \frac{1}{2}m\left(\frac{GM}{r}\right) - \frac{GMm}{r} = \frac{GMm}{2r} - \frac{GMm}{r} = -\frac{GMm}{2r}
    $$
    Notice that $E = -K$. The total energy is the negative of the kinetic energy.

## Worked example
**Problem:** A spy satellite is in a circular Low Earth Orbit (LEO) at an altitude of 300 km above the Earth's surface. Calculate its orbital velocity and period.

**Given:**
*   Gravitational constant, $G \approx 6.674 \times 10^{-11} \, \text{N m}^2/\text{kg}^2$
*   Mass of Earth, $M_E \approx 5.972 \times 10^{24} \, \text{kg}$
*   Radius of Earth, $R_E \approx 6371 \, \text{km}$
*   Altitude, $h = 300 \, \text{km}$

**Step 1: Calculate the orbital radius, $r$.**
The radius $r$ is measured from the center of the Earth, not its surface.
$r = R_E + h = 6371 \, \text{km} + 300 \, \text{km} = 6671 \, \text{km}$
Convert to meters for SI unit consistency:
$r = 6671 \times 10^3 \, \text{m} = 6.671 \times 10^6 \, \text{m}$

**Step 2: Calculate the orbital velocity, $v$.**
We use the formula derived from the force balance. Note that the satellite's mass $m$ is irrelevant.
$$
v = \sqrt{\frac{G M_E}{r}}
$$
$$
v = \sqrt{\frac{(6.674 \times 10^{-11})(5.972 \times 10^{24})}{6.671 \times 10^6}}
$$
$$
v = \sqrt{\frac{3.986 \times 10^{14}}{6.671 \times 10^6}} = \sqrt{5.975 \times 10^7}
$$
$$
v \approx 7730 \, \text{m/s} \quad (\text{or } 7.73 \, \text{km/s})
$$

**Step 3: Calculate the orbital period, $T$.**
The period is the time to travel the circumference ($2\pi r$) at speed $v$.
$$
T = \frac{2\pi r}{v}
$$
$$
T = \frac{2\pi (6.671 \times 10^6 \, \text{m})}{7730 \, \text{m/s}}
$$
$$
T \approx \frac{4.191 \times 10^7}{7730} \approx 5422 \, \text{s}
$$
To convert this to minutes: $T \approx 5422 \, \text{s} / (60 \, \text{s/min}) \approx 90.4 \, \text{minutes}$.

**Reflection:**
*   Step 1 worked because we correctly identified that orbital radius is from the center of the central body.
*   Step 2 worked because we started from the fundamental force balance, yielding a direct formula for velocity.
*   Step 3 worked because we used the basic definition of speed for uniform circular motion to find the time for one revolution.

## Diagrams
A satellite in a circular orbit around a central body (M). The satellite (m) has a velocity vector $\vec{v}$ tangent to the orbital path and a gravitational force vector $\vec{F_g}$ pointing directly toward the center of M. These two vectors are always perpendicular.

```text
               ^
               | v
               |
          , - ~ ~ ~ - ,
      , ~               ~ ,
    ,                       ,
   ,          <---- F_g     ,
  ,             ,-----.     ,
  |            /       \    | m
  |           |    M    |   |
  |            \       /    |
  ,             `-----'     ,
   ,                       ,
    ,                     ,
      , ~               ~ ,
          ' - . . . - '

```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture yourself whirling a ball on a string around your head. The string's tension is gravity ($F_g$). Your hand's speed creates the circular motion ($F_c$). If you cut the string (gravity disappears), the ball flies off straight. If you stop moving your hand (velocity becomes zero), the ball falls inward. An orbit is the perfect, continuous balance of these two effects. **Gravity provides the centripetal force.**
2.  **Must-know formulas:** Overlearn these until they are automatic.
    *   Velocity: $v = \sqrt{\frac{GM}{r}}$
    *   Period: $T = 2\pi\sqrt{\frac{r^3}{GM}}$
    *   Energy: $E = -\frac{GMm}{2r}$
3.  **Spaced Repetition Schedule:** Re-derive these three formulas from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just look at them; actively recreate the derivations.
4.  **First Principles Pathway:** If you forget everything, remember this one fact: **Gravity IS the centripetal force.**
    *   Write it down: $F_g = F_c \implies G \frac{Mm}{r^2} = \frac{mv^2}{r}$.
    *   From here, you can solve for $v$.
    *   Then use $T = \frac{2\pi r}{v}$ to get the period.
    *   Finally, use $E = \frac{1}{2}mv^2 - \frac{GMm}{r}$ to get the energy. This pathway is indestructible.

## Common mistakes
1.  **Radius vs. Altitude:** Using the altitude ($h$) instead of the orbital radius ($r$). Always remember $r = R_{planet} + h$. This is the most frequent error.
2.  **Mass Confusion:** Using the satellite's mass ($m$) instead of the central body's mass ($M$) in the velocity and period formulas. Remember, $m$ cancels out; the orbit's speed and period are independent of the satellite's mass.
3.  **Energy Sign Error:** Forgetting the negative sign on gravitational potential energy ($U = -G\frac{Mm}{r}$) and thus on total energy ($E = -\frac{GMm}{2r}$). A positive total energy means the object is unbound and on an escape trajectory, not in an orbit.

## Self-check
1.  The Mars Reconnaissance Orbiter (MRO) orbits Mars at an average altitude of 280 km. Calculate its orbital speed. (You will need to look up the mass and radius of Mars).
2.  A geostationary satellite orbits Earth such that its period $T$ is exactly 24 hours, causing it to remain above a fixed point on the equator. Starting from the formula for orbital period, derive an expression for its orbital radius $r$ and calculate its value.
3.  A satellite in a circular orbit of radius $r$ has a total energy of $E_1$. If the satellite is moved to a new, stable circular orbit with radius $2r$, what is its new total energy $E_2$ in terms of $E_1$? Has energy been added to or removed from the satellite to make this happen?