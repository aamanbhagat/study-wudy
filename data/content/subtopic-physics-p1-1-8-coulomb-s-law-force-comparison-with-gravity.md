## What it is
Coulomb's law is a fundamental principle of physics that quantifies the electrostatic force between two stationary, electrically charged particles. This force is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them. The force acts along the straight line connecting the two particles.

## Why it matters
This law is the bedrock of electrostatics, which is essential for designing nearly all modern electronics, from computer chips to high-voltage power lines. In aerospace, it's critical for understanding spacecraft charging in the space plasma environment, designing ion thrusters (a form of electric propulsion), and mitigating electrostatic discharge that can damage sensitive components. It is the first step toward Maxwell's equations, which govern all of electricity, magnetism, and light.

## When to study it
Before tackling this, you must have a solid grasp of Newtonian mechanics, specifically Newton's third law and the concept of force as a vector. You must be comfortable with vector addition and decomposition into components. A firm understanding of Newton's law of universal gravitation is also essential, as the mathematical structure is nearly identical, and comparing the two is a core part of understanding this topic.

## How to study it (step by step)
1.  **Isolate the formula:** Write down the scalar form of Coulomb's Law, $F_e = k \frac{|q_1 q_2|}{r^2}$. Identify each term: $F_e$ (electric force), $k$ (Coulomb's constant), $q_1, q_2$ (charges), and $r$ (distance). Note the units for each.
2.  **Grasp the vector nature:** Derive the vector form, $\vec{F}_{12} = k \frac{q_1 q_2}{r^2} \hat{r}_{12}$. Understand that $\hat{r}_{12}$ is a unit vector pointing from charge 1 to charge 2. Work through why the product $q_1 q_2$ correctly determines whether the force is repulsive (positive product, same direction as $\hat{r}_{12}$) or attractive (negative product, opposite direction to $\hat{r}_{12}$).
3.  **Compare with Gravity:** Create a two-column table. In one column, list the properties of Coulomb's force. In the other, list the properties of gravitational force ($F_g = G \frac{m_1 m_2}{r^2}$). Note the similarities (inverse-square law, dependence on properties of the bodies, acts along a line) and differences (strength, attraction vs. attraction/repulsion, mediating particle).
4.  **Solve a 1D problem:** Place three charges on the x-axis. For example, $q_A$ at $x=0$, $q_B$ at $x=2$, and $q_C$ at $x=5$. Calculate the net force on charge $q_B$ due to $q_A$ and $q_C$. This forces you to handle vector addition in one dimension.
5.  **Solve a 2D problem:** Place three charges at the vertices of a right triangle. Calculate the net force on the charge at the right-angle vertex. This requires decomposing forces into x and y components and then recombining them to find the resultant force magnitude and direction.
6.  **Calculate the force ratio:** For a proton and an electron separated by any distance $r$, calculate the ratio of the electric force magnitude to the gravitational force magnitude, $F_e/F_g$. The distance $r$ will cancel out, leaving a ratio of fundamental constants. The enormous result will build your intuition about the relative strengths of these two fundamental forces.

## Key ideas, with intuition
1.  **Inverse-Square Law:** The force weakens as $1/r^2$. Imagine a point charge emitting its "influence" in all directions. This influence spreads out over the surface of a sphere. The surface area of a sphere is $4\pi r^2$. So, the strength of the influence at any point on the sphere's surface is diluted by a factor proportional to $r^2$. Double the distance, and the force is quartered.
    $$ F_e \propto \frac{1}{r^2} $$
2.  **Force is Proportional to Charge:** The "amount" of electrical property an object has is its charge, $q$. The interaction depends on both objects, so the force must be proportional to the product of their charges. If you double one charge, you double the force. If you double both, you quadruple the force.
    $$ F_e \propto q_1 q_2 $$
3.  **Like Repels, Opposites Attract:** This is the core rule of interaction. The sign of the product $q_1 q_2$ determines the nature of the force.
    *   If $q_1$ and $q_2$ have the same sign (both positive or both negative), $q_1 q_2 > 0$, and the force is repulsive.
    *   If $q_1$ and $q_2$ have opposite signs, $q_1 q_2 < 0$, and the force is attractive.
4.  **Vastly Stronger than Gravity:** While both forces follow an inverse-square law, the electrostatic force is intrinsically far stronger than gravity. The reason you don't feel the electric force from everyday objects is that they are overwhelmingly electrically neutral, with nearly perfect cancellation between their positive (protons) and negative (electrons) charges. Gravity, which is only attractive, has no such cancellation and thus dominates on astronomical scales.

## Worked example
**Problem:** A charge $q_1 = +2.0 \, \mu\text{C}$ is at the origin $(0, 0)$. A second charge $q_2 = -3.0 \, \mu\text{C}$ is at the point $(0.4 \, \text{m}, 0)$. A third charge $q_3 = +5.0 \, \mu\text{C}$ is at $(0.4 \, \text{m}, 0.3 \, \text{m})$. Find the net electrostatic force on charge $q_3$.

**Solution:**
1.  **Identify the goal:** We need to find the net force on $q_3$, which is the vector sum of the force from $q_1$ ($\vec{F}_{13}$) and the force from $q_2$ ($\vec{F}_{23}$).
    $$ \vec{F}_{\text{net}, 3} = \vec{F}_{13} + \vec{F}_{23} $$
2.  **Calculate $\vec{F}_{13}$ (force on $q_3$ from $q_1$):**
    *   Find the distance $r_{13}$: The distance from $(0,0)$ to $(0.4, 0.3)$ is $r_{13} = \sqrt{(0.4-0)^2 + (0.3-0)^2} = \sqrt{0.16 + 0.09} = \sqrt{0.25} = 0.5 \, \text{m}$.
    *   Calculate the magnitude $F_{13}$:
        $$ F_{13} = k \frac{|q_1 q_3|}{r_{13}^2} = (8.99 \times 10^9) \frac{|(2.0 \times 10^{-6})(5.0 \times 10^{-6})|}{(0.5)^2} = 0.36 \, \text{N} $$
    *   Determine the direction of $\vec{F}_{13}$: $q_1$ and $q_3$ are both positive, so the force is repulsive. It points from $q_1$ to $q_3$. The angle is $\theta = \arctan(0.3/0.4) = 36.9^\circ$.
    *   Decompose into components:
        $F_{13,x} = F_{13} \cos(\theta) = 0.36 \times (0.4/0.5) = 0.288 \, \text{N}$
        $F_{13,y} = F_{13} \sin(\theta) = 0.36 \times (0.3/0.5) = 0.216 \, \text{N}$
        So, $\vec{F}_{13} = (0.288 \hat{i} + 0.216 \hat{j}) \, \text{N}$.
3.  **Calculate $\vec{F}_{23}$ (force on $q_3$ from $q_2$):**
    *   Find the distance $r_{23}$: The distance from $(0.4, 0)$ to $(0.4, 0.3)$ is purely in the y-direction. $r_{23} = 0.3 \, \text{m}$.
    *   Calculate the magnitude $F_{23}$:
        $$ F_{23} = k \frac{|q_2 q_3|}{r_{23}^2} = (8.99 \times 10^9) \frac{|(-3.0 \times 10^{-6})(5.0 \times 10^{-6})|}{(0.3)^2} = 1.50 \, \text{N} $$
    *   Determine the direction of $\vec{F}_{23}$: $q_2$ is negative and $q_3$ is positive, so the force is attractive. It points from $q_3$ straight down towards $q_2$. This is in the negative y-direction.
    *   So, $\vec{F}_{23} = -1.50 \hat{j} \, \text{N}$.
4.  **Sum the vectors:**
    $$ \vec{F}_{\text{net}, 3} = \vec{F}_{13} + \vec{F}_{23} = (0.288 \hat{i} + 0.216 \hat{j}) + (0 - 1.50 \hat{j}) $$
    $$ \vec{F}_{\text{net}, 3} = (0.288 \hat{i} - 1.284 \hat{j}) \, \text{N} $$
5.  **Final result (optional magnitude and angle):**
    *   Magnitude: $|\vec{F}_{\text{net}, 3}| = \sqrt{(0.288)^2 + (-1.284)^2} \approx 1.32 \, \text{N}$.
    *   Direction: $\phi = \arctan(-1.284 / 0.288) \approx -77.4^\circ$ (below the positive x-axis).

**Reflection:** Each step was necessary. We first identified the interacting pairs. For each pair, we found the distance, then the force magnitude. Crucially, we then determined the force direction and expressed it as a vector before summing. Attempting to add the magnitudes $0.36 \, \text{N}$ and $1.50 \, \text{N}$ directly would have given the wrong answer because forces are vectors.

## Diagrams
Interaction between two point charges:
```text
Case 1: Repulsion (like charges, q1*q2 > 0)

q1 (+) -----> F_21        F_12 <----- q2 (+)
<---------- r ---------->

Case 2: Attraction (opposite charges, q1*q2 < 0)

q1 (+) <----- F_21        F_12 -----> q2 (-)
<---------- r ---------->
```

Diagram for the worked example:
```text
        ^ y
        |
        |
        | . . . . . q3(+)
        |         . /
        |       .  /
        |     .   / F_13 (repulsive)
        |   .    /
        | .     V F_23 (attractive)
q1(+) . . . . . q2(-) ----> x
(0,0)         (0.4, 0)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Coulomb's Law is **k**ind of **q**uir**q**y over **r-squared**." This directly maps to the structure $k \frac{q_1 q_2}{r^2}$.
2.  **Must overlearn:**
    *   Scalar form: $$ F_e = k \frac{|q_1 q_2|}{r^2} $$
    *   Vector form: $$ \vec{F}_{12} = k \frac{q_1 q_2}{r^2} \hat{r}_{12} $$
    *   Coulomb's constant: $$ k = \frac{1}{4\pi\epsilon_0} \approx 8.99 \times 10^9 \, \frac{\text{N}\cdot\text{m}^2}{\text{C}^2} $$
3.  **Spaced Repetition:** Review these formulas and the mnemonic *without looking* at your notes on these days: Day 1, Day 3, Day 7, Day 16, Day 35. Use flashcards.
4.  **First Principles Pathway:** If you forget the exact formula, rebuild it.
    *   Force is an interaction. What causes it? Charge. So it must depend on both charges, $q_1$ and $q_2$. The simplest way is multiplication: $F \propto q_1 q_2$.
    *   How does it depend on distance? Like light from a bulb or paint from a spray can, it spreads out over a sphere. The sphere's area is $\propto r^2$. So the force must weaken as $1/r^2$.
    *   Combine them: $F \propto \frac{q_1 q_2}{r^2}$.
    *   Physics requires an equation with consistent units. Introduce a constant, $k$, to make the units match. $F = k \frac{q_1 q_2}{r^2}$.
    *   Force is a vector. What's the direction? Along the line connecting the charges. That's the unit vector $\hat{r}$.

## Common mistakes
*   **Adding magnitudes, not vectors:** Calculating $F_{13}$ and $F_{23}$ and then just adding the numbers. Force is a vector; you must add components.
*   **Unit errors:** Forgetting to convert microcoulombs ($\mu\text{C}$) to coulombs ($10^{-6} \, \text{C}$) or centimeters to meters before plugging numbers into the formula. The constant $k$ is in SI units.
*   **Forgetting to square r:** A simple but frequent algebraic slip. Always write the formula down first, then substitute values.
*   **Mixing up $\hat{r}$ direction:** The vector $\vec{r}_{12}$ points *from* 1 *to* 2. The force $\vec{F}_{12}$ (force *on* 2 *by* 1) is in this direction if the charges repel and in the opposite direction if they attract.

## Self-check
1.  A charge of $+4Q$ is at $x=0$ and a charge of $-Q$ is at $x=L$. Is there a point on the x-axis where a third charge could be placed so that the net force on it is zero? If so, is this point between the charges, to the left of $+4Q$, or to the right of $-Q$?
2.  Four identical positive charges $+q$ are fixed at the corners of a square with side length $s$. What is the magnitude and direction of the net electrostatic force on the charge at the top right corner?
3.  An electron with charge $-e$ and mass $m_e$ is in a stable circular orbit around a heavy nucleus with charge $+Ze$. The electrostatic force provides the necessary centripetal force. Derive an expression for the kinetic energy of the electron in terms of $k, e, Z,$ and the orbital radius $r$.