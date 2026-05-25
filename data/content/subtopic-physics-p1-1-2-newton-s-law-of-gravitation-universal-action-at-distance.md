## What it is
Newton's law of universal gravitation states that every particle of matter in the universe attracts every other particle with a force. This force is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers. This force acts instantaneously across any distance, regardless of the medium between the objects, a concept known as "action at a distance."

## Why it matters
This law is the foundation of orbital mechanics. It allows us to calculate the trajectories of satellites, probes, and planets; design gravity-assist maneuvers for interplanetary missions; and predict phenomena like tides. In astrophysics, it is the starting point for understanding the formation and dynamics of galaxies and stars.

## When to study it
You must have a solid grasp of Newton's three laws of motion, particularly the concepts of force, mass, and acceleration ($F=ma$) and action-reaction pairs. You should also be comfortable with basic vector notation (magnitude and direction) and the concept of proportionality. If you are not confident with these, review them first.

## How to study it (step by step)
1.  **Unpack the Proportionalities.** Newton didn't just write down an equation. He reasoned from observation. Write out the two core relationships in words and symbols:
    *   Force is proportional to the product of the masses: $F \propto m_1 m_2$.
    *   Force is inversely proportional to the square of the distance: $F \propto \frac{1}{r^2}$.
2.  **Combine and Formalize.** Combine these into a single proportionality: $F \propto \frac{m_1 m_2}{r^2}$. To convert this to an equation, introduce the constant of proportionality, $G$, the universal gravitational constant. Write the final scalar equation: $F = G \frac{m_1 m_2}{r^2}$.
3.  **Investigate the Constant.** Look up the value and units of $G$: $6.674 \times 10^{-11} \, \text{N} \cdot \text{m}^2 / \text{kg}^2$. Meditate on how incredibly small this number is. This is why you don't feel gravitationally attracted to a textbook, but you do to a planet. Calculate the gravitational force between two 100 kg people standing 1 meter apart to feel this smallness.
4.  **Explore the Inverse-Square Law.** This is the most critical part. Create a table: if the distance between two bodies is $r$ and the force is $F$, what is the force at $2r$? At $3r$? At $r/2$? The answers are $F/4$, $F/9$, and $4F$. This rapid fall-off is a defining feature of the law.
5.  **Introduce Vectors.** Gravity is a force, which is a vector. Rewrite the law to capture direction. The force on mass 1 due to mass 2, $\vec{F}_{12}$, points from mass 1 *towards* mass 2. We write this as:
    $$ \vec{F}_{12} = -G \frac{m_1 m_2}{r^2} \hat{r}_{12} $$
    Here, $\hat{r}_{12}$ is the unit vector pointing *from* mass 2 *to* mass 1. The negative sign ensures the force is attractive, pulling mass 1 back along that direction, towards mass 2.

## Key ideas, with intuition
*   **Universality:** The genius of the law is its universality. The same rule that makes an apple fall to the ground also keeps the Moon in orbit around the Earth. Before Newton, celestial and terrestrial motions were considered entirely separate domains governed by different rules. This was a monumental unification of physics.
*   **The Inverse-Square Law:** Why $1/r^2$? Imagine the "influence" of a massive object spreading out uniformly in all directions. This influence gets diluted as it spreads over the surface of a sphere. The surface area of a sphere is $A = 4\pi r^2$. The force per unit area, or intensity, therefore drops off as $1/r^2$. This is the same reason a light bulb appears dimmer the farther away you are.
    $$ \text{Force} \sim \frac{1}{\text{Surface Area}} \propto \frac{1}{r^2} $$
*   **Action at a Distance:** This was deeply troubling to Newton himself. How can the Sun "tell" the Earth where to go without touching it or sending any particle? The model simply posits that the force is transmitted instantaneously across empty space. This is a key feature of the Newtonian model, which was later superseded by Einstein's theory of general relativity, where gravity propagates at the speed of light. For our purposes in this phase, we accept action at a distance as a postulate of the theory.
*   **Center of Mass:** The distance $r$ is the distance between the *centers of mass* of the two objects. For spherically symmetric objects like planets (as a good approximation), the center of mass is the geometric center. This is why for calculating your weight, you use the radius of the Earth as $r$, not your height above the ground.

## Worked example
**Problem:** Calculate the acceleration due to gravity, $g$, on the surface of the Earth.

**Given:**
*   Mass of Earth, $M_E \approx 5.972 \times 10^{24} \, \text{kg}$
*   Radius of Earth, $R_E \approx 6.371 \times 10^6 \, \text{m}$
*   Universal gravitational constant, $G \approx 6.674 \times 10^{-11} \, \text{N} \cdot \text{m}^2 / \text{kg}^2$

**Steps:**
1.  **Write Newton's two laws for force.** First, the law of universal gravitation for an object of mass $m$ on the surface of the Earth.
    $$ F_g = G \frac{M_E m}{R_E^2} $$
    Second, Newton's second law of motion for the same object experiencing that force.
    $$ F_g = ma $$
    In this context, the acceleration $a$ is what we call $g$.
    $$ F_g = mg $$

2.  **Equate the two expressions for force.** The gravitational force *is* the net force causing the acceleration. Therefore, the expressions must be equal.
    $$ mg = G \frac{M_E m}{R_E^2} $$

3.  **Solve for g.** Notice that the mass of the object, $m$, appears on both sides. It cancels out. This is profound: the acceleration due to gravity is independent of the mass of the falling object.
    $$ g = G \frac{M_E}{R_E^2} $$

4.  **Substitute the values and calculate.**
    $$ g = (6.674 \times 10^{-11} \, \frac{\text{N} \cdot \text{m}^2}{\text{kg}^2}) \frac{(5.972 \times 10^{24} \, \text{kg})}{(6.371 \times 10^6 \, \text{m})^2} $$
    $$ g \approx \frac{3.986 \times 10^{14}}{4.059 \times 10^{13}} \, \frac{\text{N}}{\text{kg}} $$
    $$ g \approx 9.82 \, \frac{\text{m}}{\text{s}^2} $$
    (Note: $\text{N}/\text{kg} = (\text{kg} \cdot \text{m}/\text{s}^2)/\text{kg} = \text{m}/\text{s}^2$)

**Reflection:**
*   Step 1 worked because we correctly identified the two different ways to describe the same force on an object.
*   Step 2 connected these two perspectives, which is the core of dynamics problems.
*   Step 3 simplified the problem algebraically and revealed the deep physical principle of the equivalence of gravitational and inertial mass.
*   Step 4 showed that the familiar value of $g \approx 9.8 \, \text{m}/\text{s}^2$ is not a fundamental constant, but is derived from the mass and radius of our specific planet.

## Diagrams
Here are two masses, $m_1$ and $m_2$, and the gravitational forces they exert on each other. Note that the forces form an action-reaction pair as required by Newton's Third Law: they are equal in magnitude and opposite in direction.

```text
       <-- F_12 --                  -- F_21 -->
      ( m1 ) --------------------- ( m2 )
             <-------- r --------->

F_12: Force on m1 due to m2
F_21: Force on m2 due to m1
|F_12| = |F_21|
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of a dating app for celestial bodies. The "attraction" ($F_g$) is stronger if both profiles are "massive" ($m_1 m_2$). But this attraction drops off *super fast* with distance ($r^2$ in the denominator) — nobody likes a long-distance relationship. The universal matchmaker, "$G$", is a constant that sets the rules for everyone in the universe.
2.  **Overlearn these formulas:**
    *   Scalar form: $$F_g = G \frac{m_1 m_2}{r^2}$$
    *   Vector form: $$\vec{F}_{12} = -G \frac{m_1 m_2}{r^2} \hat{r}_{12}$$
    *   Local gravity from universal law: $$g = G \frac{M_{\text{planet}}}{R_{\text{planet}}^2}$$
3.  **Spaced Repetition Schedule:** Review this material and try to re-derive the main formula from the proportionalities at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, rebuild it from the logic.
    *   Force must depend on the "amount of stuff," so it's proportional to both masses: $F \propto m_1 m_2$.
    *   This influence spreads out in 3D space, so it weakens like the surface area of a sphere: $F \propto 1/r^2$.
    *   Combine them: $F \propto \frac{m_1 m_2}{r^2}$.
    *   An equation needs a constant to get the units right. Call it $G$: $F = G \frac{m_1 m_2}{r^2}$.

## Common mistakes
*   **r is not radius (usually).** $r$ is the distance between the centers of mass. Only when an object is on the surface of a planet does $r$ happen to equal the planet's radius. For a satellite in orbit, $r$ is the planet's radius *plus* the satellite's altitude.
*   **Forgetting to square r.** This is the most common algebraic mistake. Always double-check that you have $r^2$ in the denominator, not $r$.
*   **Confusing G and g.** $G$ is the universal constant, the same value everywhere in the universe. $g$ is the local acceleration due to gravity, which is different on the Earth, Moon, or Mars. You just derived that $g$ depends on the planet's mass and radius.
*   **Vector direction errors.** The force is always attractive. The force vector on mass 1 points *towards* mass 2. The negative sign in the vector formula is crucial and easy to forget.

## Self-check
1.  A planet has twice the mass of Earth but the same radius. What would be the value of $g$ on its surface?
2.  Satellite A orbits the Earth at an altitude of 1,000 km. Satellite B, which has the same mass, orbits at an altitude of 3,000 km. What is the ratio of the gravitational force on satellite A to the gravitational force on satellite B? (Be careful with what 'r' represents).
3.  Using $g = G M_E / R_E^2$ and the fact that the Earth's average density $\rho$ is its mass divided by its volume ($V = \frac{4}{3}\pi R_E^3$), rewrite the expression for $g$ in terms of density $\rho$, $G$, and $R_E$. How does surface gravity depend on the radius for a planet of constant density?