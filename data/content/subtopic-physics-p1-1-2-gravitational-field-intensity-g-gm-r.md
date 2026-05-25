## What it is
The gravitational field intensity, denoted by $g$, is the gravitational force experienced per unit of mass at a specific point in space. It is a vector quantity that describes both the strength and direction of gravity created by a source mass, independent of any other object placed in that field.

## Why it matters
This concept is the bedrock of orbital mechanics, allowing us to calculate the forces on satellites and spacecraft without needing to know their specific mass beforehand. In advanced physics, understanding fields is crucial for grasping Einstein's General Relativity, where gravity is not a force but a curvature of spacetime caused by mass. For engineering, it explains why an object's weight changes with altitude, a critical factor in rocket launches and satellite deployment.

## When to study it
Before tackling this, you must have a solid grasp of two concepts:
1.  **Newton's Law of Universal Gravitation**: $F_g = \frac{GMm}{r^2}$. You must understand what each term ($G, M, m, r$) represents.
2.  **Newton's Second Law of Motion**: $\vec{F} = m\vec{a}$. You need to be comfortable with the relationship between force, mass, and acceleration.

If these are not yet solid, pause and review them. We will build directly upon them.

## How to study it (step by step)
1.  **Derive from First Principles.** Start with Newton's Law of Universal Gravitation, $F_g = \frac{GMm}{r^2}$. Write down the definition of a field: force per unit test mass, $g = F_g/m$. Substitute the first equation into the second and cancel the test mass $m$. This is non-negotiable; you must be able to do this from memory.
2.  **Calculate Earth's Surface Gravity.** Use the derived formula $g = \frac{GM}{r^2}$ to calculate the value of $g$ on the surface of the Earth. Look up the values for $G$ (the gravitational constant), $M_E$ (mass of Earth), and $r_E$ (radius of Earth). Your result should be approximately $9.8 \, \text{m/s}^2$. This connects the abstract formula to a familiar number.
3.  **Analyze the Inverse-Square Relationship.** Create a table. Calculate $g$ at distances $r_E$, $2r_E$, $3r_E$, and $4r_E$ from Earth's center. Notice how the value of $g$ drops off not linearly, but as $1/r^2$. This builds intuition for how gravity weakens with distance.
4.  **Vector Nature.** Draw a large mass $M$. Now, at various points around it, draw arrows representing the vector $\vec{g}$. The arrows should always point towards the center of $M$, and their length should decrease as you move further away. This solidifies the idea that $g$ is a vector field.
5.  **Solve a problem involving altitude.** Find the gravitational field intensity at the cruising altitude of a typical commercial airliner (e.g., 11 km). The key challenge here is correctly identifying $r$ as the Earth's radius *plus* the altitude.

## Key ideas, with intuition
1.  **A Field is a "Force Map" for Space.** Imagine a massive object like the Sun. It alters the space around it. The gravitational field is a map of this alteration. For any point in space, the field vector $\vec{g}$ tells you, "If you place a 1 kg mass right here, this is the exact force vector it will feel." The field exists even if there's no test mass present.

2.  **The Field Belongs to the Source Mass.** The formula for gravitational field intensity is:
    $$ g = \frac{GM}{r^2} $$
    Notice that the test mass, $m$, is gone. The field intensity $g$ at a point depends only on the mass of the object creating the field ($M$) and the distance to that object ($r$). A planet creates its gravitational field; a tiny asteroid placed in that field simply responds to it. This separation of source and test object is a pivotal concept in physics.

3.  **The Inverse-Square Law Dictates Strength.** The $r^2$ in the denominator is the most important part of the relationship. It means gravity is a long-range but rapidly weakening force. If you double your distance from the center of a planet, the gravitational field strength drops to one-quarter of its original value ($1/2^2$). If you triple the distance, it drops to one-ninth ($1/3^2$). This is a geometric effect: the influence of the source mass is spreading out over the surface of a sphere, whose area grows as $A = 4\pi r^2$.

## Worked example
**Problem:** The International Space Station (ISS) orbits at an average altitude of 400 km above Earth's surface. Calculate the magnitude of the gravitational field intensity, $g_{ISS}$, at this altitude.

**Given:**
- Gravitational Constant, $G \approx 6.674 \times 10^{-11} \, \text{N}\cdot\text{m}^2/\text{kg}^2$
- Mass of Earth, $M_E \approx 5.972 \times 10^{24} \, \text{kg}$
- Mean Radius of Earth, $r_E \approx 6.371 \times 10^{6} \, \text{m}$
- Altitude of ISS, $h = 400 \, \text{km} = 4.0 \times 10^5 \, \text{m}$

**Solution:**

1.  **Identify the correct formula.** The gravitational field intensity is given by $g = \frac{GM}{r^2}$.

2.  **Determine the correct distance, $r$.** The distance $r$ is measured from the center of the mass creating the field (Earth's center). Therefore, it is the sum of Earth's radius and the station's altitude.
    $$ r = r_E + h $$
    $$ r = (6.371 \times 10^6 \, \text{m}) + (4.0 \times 10^5 \, \text{m}) = 6.771 \times 10^6 \, \text{m} $$

3.  **Substitute the values into the formula.**
    $$ g_{ISS} = \frac{(6.674 \times 10^{-11} \, \text{N}\cdot\text{m}^2/\text{kg}^2)(5.972 \times 10^{24} \, \text{kg})}{(6.771 \times 10^6 \, \text{m})^2} $$

4.  **Calculate the numerator and denominator.**
    - Numerator: $(6.674 \times 10^{-11}) \times (5.972 \times 10^{24}) \approx 3.986 \times 10^{14} \, \text{N}\cdot\text{m}^2/\text{kg}$
    - Denominator: $(6.771 \times 10^6)^2 \approx 4.585 \times 10^{13} \, \text{m}^2$

5.  **Compute the final result.**
    $$ g_{ISS} = \frac{3.986 \times 10^{14}}{4.585 \times 10^{13}} \, \frac{\text{N}}{\text{kg}} \approx 8.69 \, \text{N/kg} $$
    Since $1 \, \text{N} = 1 \, \text{kg}\cdot\text{m/s}^2$, the units N/kg are equivalent to m/s².
    $$ g_{ISS} \approx 8.69 \, \text{m/s}^2 $$

**Reflection:**
- Step 1 worked because we correctly identified the governing physical law.
- Step 2 was the critical step. We correctly interpreted $r$ as the distance from the *center* of the Earth, not from the surface. This is a common point of error.
- Steps 3-5 were careful execution of the arithmetic, ensuring powers of ten were handled correctly. The result, ~8.7 m/s², is slightly less than the surface value of ~9.8 m/s², which makes intuitive sense. Astronauts on the ISS are not "weightless"; they are in a constant state of freefall in a gravitational field that is still about 90% as strong as on the surface.

## Diagrams
This diagram shows the gravitational field $\vec{g}$ created by a source mass $M$. The field exists at all points in space. The vectors point towards $M$ and their length decreases with distance, indicating a weaker field.

```text
               <--g--.
           <----g---- .
        <------g------  .
                         .
     <---------g---------  M --------g--------->
                         .
        .     ------g------>
           .   ----g---->
              . --g-->
```

This diagram shows the force $\vec{F_g}$ on a test mass $m$ placed in the field of $M$. The force is the product of the test mass and the field vector at that location: $\vec{F_g} = m\vec{g}$.

```text
                    r
          <--------------------->
          M                       m ----> F_g
        (Source)                (Test)
                                  |
                                  V
                                  g (field vector at m's location)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a King, "Big M," sitting on his throne at the center of the planet. He shouts commands with a strength of "Big G." His voice spreads out in all directions (over a sphere of area $\propto r^2$). The intensity of his command ($g$) at any location is his shouting strength ($G$) times his own power ($M$), divided by how spread out his voice has become ($r^2$). The command is always "Come here!", so the vector points inward.

2.  **Formulas to Overlearn:**
    $$ g = \frac{GM}{r^2} $$
    $$ F_g = mg $$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the formula from first principles on this schedule:
    - In 24 hours.
    - In 3 days.
    - In 7 days.
    - In 16 days.
    - In 35 days.

4.  **First Principles Pathway:** If you forget $g = \frac{GM}{r^2}$, you can rebuild it in seconds.
    - Start with the definition of any field: it's force per unit "charge." For gravity, the "charge" is mass. So, $g = \frac{F_g}{m}$.
    - State the universal law for the force $F_g$: $F_g = \frac{GMm}{r^2}$.
    - Substitute the force into the definition: $g = \frac{(GMm/r^2)}{m}$.
    - Cancel the test mass $m$: $g = \frac{GM}{r^2}$. Done.

## Common mistakes
1.  **Confusing $G$ and $g$.** $G$ is the universal gravitational constant, $6.674 \times 10^{-11} \, \text{N}\cdot\text{m}^2/\text{kg}^2$. It is the same everywhere in the universe. $g$ is the local gravitational field intensity, which varies depending on the mass $M$ and distance $r$. On Earth's surface, $g \approx 9.8 \, \text{m/s}^2$.
2.  **Using Altitude for $r$.** Students often plug an altitude (like 400 km) directly into the formula for $r$. Remember, $r$ is the total distance from the *center* of the celestial body, so you must always add the body's radius to the altitude: $r = r_{planet} + h_{altitude}$.
3.  **Forgetting to Square $r$.** A simple but frequent algebraic error is to calculate $GM/r$ instead of $GM/r^2$. Always double-check that you have squared the distance term in the denominator.

## Self-check
1.  The mass of the Moon is $7.34 \times 10^{22} \, \text{kg}$ and its radius is $1.74 \times 10^6 \, \text{m}$. What is the gravitational field intensity $g_{moon}$ on its surface?
2.  At what altitude above Earth's surface is the gravitational field intensity equal to $4.9 \, \text{m/s}^2$? (Hint: this is half the surface value).
3.  An exoplanet is discovered to have a gravitational field intensity at its surface equal to that of Earth ($9.8 \, \text{m/s}^2$), but its mass is twice the mass of Earth. What is the radius of this exoplanet, expressed as a multiple of Earth's radius $r_E$?