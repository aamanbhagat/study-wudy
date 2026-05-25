## What it is
Kepler's third law states that the square of an object's orbital period ($T$) is directly proportional to the cube of the semi-major axis ($a$) of its orbit. This means that for any two bodies orbiting the same central mass, the ratio $\frac{T^2}{a^3}$ is constant. This law quantifies the relationship between the size of an orbit and the time it takes to complete it.

## Why it matters
This law is fundamental to astrodynamics and mission design. It allows us to calculate the orbital period of any satellite, planet, or spacecraft if we know its orbital path, a critical step in planning interplanetary transfers or placing a satellite in a specific orbit (like a geosynchronous one). It also works in reverse: by observing an object's period and orbital size, we can "weigh" the central body it orbits, which is how we determine the mass of stars, galaxies, and even supermassive black holes.

## When to study it
You must have a solid grasp of these prerequisites before proceeding:
1.  **Newton's Law of Universal Gravitation:** $F_g = \frac{GMm}{r^2}$. You need to understand what each term means and how to apply it.
2.  **Uniform Circular Motion:** Specifically, the formula for centripetal acceleration, $a_c = \frac{v^2}{r}$, and centripetal force, $F_c = \frac{mv^2}{r}$.
3.  **Basic Algebra:** You must be comfortable manipulating equations, isolating variables, and working with exponents.
4.  **Geometry of Circles and Ellipses:** Understand the definitions of radius ($r$), period ($T$), and semi-major axis ($a$).

If these are not familiar, pause and review them. The derivation is impossible without them.

## How to study it (step by step)
1.  **Derive for the simple case.** Start with a circular orbit of radius $r$. Set the gravitational force equal to the centripetal force required to keep the object in orbit. This is the physical foundation.
2.  **Introduce the period.** The speed of the object in a circular orbit is the circumference divided by the period: $v = \frac{2\pi r}{T}$. Substitute this expression for $v$ into your force-balance equation from step 1.
3.  **Isolate $T^2$ and $r^3$.** Use algebra to move all terms involving the period $T$ to one side of the equation and all terms involving the radius $r$ to the other. You should see the $T^2 \propto r^3$ relationship emerge naturally.
4.  **Generalize to ellipses.** For an elliptical orbit, the radius $r$ is replaced by the semi-major axis $a$. The full derivation for an ellipse is more complex (involving conservation of energy and angular momentum), but the final result is identical in form. For now, accept this generalization: $r \to a$.
5.  **Identify the constant of proportionality.** Look at the terms multiplying $a^3$. This constant, $\frac{4\pi^2}{G(M+m)}$, contains physical constants and the mass of the system. Understand what this implies about orbits around a given central body.
6.  **Solve a problem.** Use the derived formula to calculate something non-obvious, like the mass of the Earth, given the orbital parameters of the Moon. This will solidify the law's practical power.

## Key ideas, with intuition
1.  **Gravity provides the "leash".** For an object to stay in a circular orbit, a force must constantly pull it toward the center. This is the centripetal force. In space, the gravitational attraction between the central body (mass $M$) and the orbiting body (mass $m$) provides this force.
    $$
    F_{\text{required}} = F_{\text{provided}} \implies F_{\text{centripetal}} = F_{\text{gravity}}
    $$

2.  **Faster speed is needed for tighter orbits.** To stay in a tight (small $r$) orbit where gravity is strong, an object must move very fast. If it moves too slowly, it falls; too fast, it flies away. The force balance captures this:
    $$
    \frac{mv^2}{r} = \frac{GMm}{r^2} \implies v^2 = \frac{GM}{r}
    $$
    This shows that as $r$ decreases, $v$ must increase.

3.  **The period depends on speed and distance.** The time to complete one orbit (period $T$) is the distance traveled (circumference $2\pi r$) divided by the speed ($v$).
    $$
    T = \frac{2\pi r}{v}
    $$
    Since a tighter orbit requires a much higher speed ($v \propto 1/\sqrt{r}$) but covers a slightly shorter distance ($d \propto r$), the net effect is that tighter orbits have much shorter periods. Kepler's third law quantifies this "much shorter."

4.  **The semi-major axis is the key for ellipses.** An ellipse doesn't have a constant radius. However, the semi-major axis $a$ is the dominant parameter that determines the orbit's total energy. It acts as the "average" distance in a way that preserves the relationship between orbital size and period. For any orbit—circular, elliptical, etc.—around a central mass $M$, the period is determined solely by the semi-major axis $a$.

## Worked example
**Problem:** A geostationary satellite remains above the same point on Earth's equator. This requires its orbital period to be exactly one sidereal day (23.934 hours). Calculate the semi-major axis (orbital altitude + Earth's radius) of its orbit.

**Given:**
*   Earth's Mass, $M_E \approx 5.972 \times 10^{24}$ kg
*   Gravitational Constant, $G \approx 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Orbital Period, $T = 23.934 \text{ hours}$

**Step 1: Convert units to SI.**
The period must be in seconds.
$$
T = 23.934 \text{ hr} \times \frac{3600 \text{ s}}{1 \text{ hr}} = 86162.4 \text{ s}
$$

**Step 2: State the governing equation.**
We start with the derived form of Kepler's third law. We assume the satellite's mass $m$ is negligible compared to Earth's mass $M_E$, so $M+m \approx M_E$. For a circular geostationary orbit, the semi-major axis $a$ is simply the orbital radius $r$.
$$
T^2 = \frac{4\pi^2}{GM_E} a^3
$$

**Step 3: Isolate the unknown variable, $a$.**
Rearrange the equation to solve for $a^3$, then take the cube root.
$$
a^3 = \frac{GM_E T^2}{4\pi^2}
$$
$$
a = \sqrt[3]{\frac{GM_E T^2}{4\pi^2}}
$$

**Step 4: Substitute values and calculate.**
$$
a = \sqrt[3]{\frac{(6.674 \times 10^{-11})(5.972 \times 10^{24})(86162.4)^2}{4\pi^2}}
$$
$$
a = \sqrt[3]{\frac{(6.674 \times 10^{-11})(5.972 \times 10^{24})(7.424 \times 10^9)}{39.478}}
$$
$$
a = \sqrt[3]{7.537 \times 10^{22} \text{ m}^3}
$$
$$
a \approx 4.224 \times 10^7 \text{ m} \quad \text{or} \quad 42,240 \text{ km}
$$

**Reflection:**
This result is the radius of the geostationary orbit from the center of the Earth.
*   Step 1 (Unit Conversion) was critical to avoid errors in calculation with the constant $G$.
*   Step 2 (Stating the Law) identified the correct physical principle. The approximation $M+m \approx M$ is valid and standard for satellites.
*   Step 3 (Algebra) correctly isolated the variable we needed to find.
*   Step 4 (Calculation) executed the plan, yielding a physically meaningful number for a well-known orbit.

## Diagrams
A simple circular orbit showing the key vectors.

```text
              v
             -->
          .---*---.
        ,'    ^    `.
      ,'      |      `.
     /        | Fg     \
    |         |         |
    |    M    |         |
    |    *<---+---------* m
    |         r         |
     \                 /
      `.             ,'
        `...........'

M: Mass of central body
m: Mass of orbiting body
r: Orbital radius
v: Tangential velocity vector
Fg: Gravitational force vector (acting as centripetal force)
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a square clock (T²) on one side of a scale, balanced by a cubic box (a³) on the other. To keep them balanced, you need a special weight: the "4-pi-squared over G-M" weight. The relationship is a balance between time and space.

2.  **Overlearn this formula:** For a small mass orbiting a large mass $M$:
    $$
    T^2 = \left(\frac{4\pi^2}{GM}\right) a^3
    $$
    Memorize it exactly. The parentheses emphasize that $(\frac{4\pi^2}{GM})$ is just a constant for a given solar system or planetary system.

3.  **Spaced Repetition Schedule:**
    *   Review this derivation in **1 day**.
    *   Solve a new problem in **3 days**.
    *   Re-derive from first principles in **7 days**.
    *   Explain it to an imaginary student in **16 days**.
    *   Check your memory of the formula in **35 days**.

4.  **First Principles Pathway:** If you forget the formula, re-derive it for a circle. This is your safety net.
    *   **Step A:** Force balance: Gravity = Centripetal. $\frac{GMm}{r^2} = \frac{mv^2}{r}$.
    *   **Step B:** Definition of orbital speed: Speed = Distance/Time. $v = \frac{2\pi r}{T}$.
    *   **Step C:** Substitute B into A and solve for $T^2$.

## Common mistakes
1.  **Using inconsistent units.** Using kilometers for distance but seconds for time will give an incorrect answer because $G$ is in meters, kilograms, and seconds. Always convert to SI units first.
2.  **Forgetting to square or cube.** Students often write $T \propto a$ or $T^2 \propto a^2$. Check the exponents. A simple way to check is that the units must match.
3.  **Using radius instead of semi-major axis.** For circular orbits, $r=a$, but for elliptical orbits, you must use the semi-major axis $a$. Do not use the periapsis or apoapsis distance alone.
4.  **Ignoring the mass of the smaller body ($m$).** In most cases (planet/sun, satellite/planet), $m$ is negligible. But for binary star systems or the Earth-Moon system (where the Moon's mass is ~1.2% of Earth's), the full $G(M+m)$ term is required for high precision.

## Self-check
1.  An asteroid orbits the Sun with a semi-major axis four times that of Earth's. What is its orbital period in Earth years?
2.  Mars has a mass of $6.417 \times 10^{23}$ kg and a radius of 3390 km. At what altitude must a satellite orbit Mars to have a "Martian-stationary" orbit, given that Mars's sidereal day (its "sol") is 24.623 hours?
3.  Two neutron stars, each with a mass of $1.5 M_{\text{Sun}}$ (where $M_{\text{Sun}} \approx 2 \times 10^{30}$ kg), orbit each other with a separation distance of $200,000$ km. Assuming circular orbits around their common center of mass, what is their orbital period? (Hint: Think carefully about the radius of their individual orbits and the total mass of the system.)