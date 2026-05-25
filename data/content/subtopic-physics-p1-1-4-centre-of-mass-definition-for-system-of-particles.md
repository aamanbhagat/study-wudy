## What it is
The centre of mass (CM) of a system of particles is the unique point where the weighted average of the positions of all particles is located. The "weight" for each particle's position is its mass. It is the point at which the system would balance perfectly in a uniform gravitational field.

## Why it matters
The centre of mass simplifies the analysis of complex systems. The entire system, no matter how its constituent parts move relative to each other, translates through space as if all its mass were concentrated at the CM and all external forces were applied at that single point. This is crucial for calculating the trajectory of a tumbling rocket, the orbit of a binary star system, or understanding how a complex molecule moves in a fluid.

## When to study it
You should be comfortable with basic vector algebra, specifically position vectors ($\vec{r}$), vector addition, and scalar multiplication of vectors. You also need a clear understanding of what a "system" of particles is and how to define a coordinate system with an origin. If you cannot confidently write down the position vector for a point in a 2D plane, review that first.

## How to study it (step by step)
1.  **Start in 1D:** Imagine two masses, $m_1$ and $m_2$, on a number line at positions $x_1$ and $x_2$. Intuitively, their balance point will be closer to the heavier mass. Derive the formula $x_{CM} = \frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}$ from the principle of moments (torques), where the "fulcrum" is the centre of mass.
2.  **Generalize to N particles in 1D:** Extend the logic from step 1 to a system of $N$ particles on a line. The formula becomes $x_{CM} = \frac{\sum_{i=1}^{N} m_i x_i}{\sum_{i=1}^{N} m_i}$.
3.  **Move to 2D/3D with Vectors:** Realize that position is a vector. Replace the scalar positions $x_i$ with position vectors $\vec{r}_i$. The formula naturally becomes $\vec{r}_{CM} = \frac{\sum_{i=1}^{N} m_i \vec{r}_i}{\sum_{i=1}^{N} m_i}$.
4.  **Deconstruct the Vector Equation:** Understand that the single vector equation for $\vec{r}_{CM}$ is a compact way of writing three separate scalar equations for its components: $x_{CM}$, $y_{CM}$, and $z_{CM}$. For example, $y_{CM} = \frac{\sum m_i y_i}{\sum m_i}$.
5.  **Solve a problem:** Take three point masses at the vertices of a triangle and calculate the coordinates of their centre of mass. Choose a convenient origin (e.g., one of the masses).
6.  **Build intuition with symmetry:** Consider a system of two *equal* masses. Where is the CM? What about four equal masses at the corners of a square? Use symmetry to predict the location of the CM without calculation.

## Key ideas, with intuition
*   **The Weighted Average:** The centre of mass is not the geometric centre. It's an average of positions, but weighted by mass. Think of a seesaw: a heavy person must sit closer to the fulcrum to balance a light person sitting further away. The centre of mass is this fulcrum.
    $$ \vec{r}_{CM} = \frac{m_1\vec{r}_1 + m_2\vec{r}_2 + \dots + m_N\vec{r}_N}{m_1 + m_2 + \dots + m_N} $$
*   **The Denominator is Just the Total Mass:** The sum in the denominator, $\sum_{i=1}^{N} m_i$, is simply the total mass of the system, which we often denote as $M$. This simplifies the formula visually.
    $$ \vec{r}_{CM} = \frac{1}{M} \sum_{i=1}^{N} m_i \vec{r}_i $$
*   **Independence of Components:** The vector nature of the definition is powerful. The x-coordinate of the centre of mass ($x_{CM}$) depends *only* on the x-coordinates of the individual particles ($x_i$) and their masses. It is completely independent of their y- or z-coordinates. This allows us to break down a complex 3D problem into three simple 1D problems.
    $$ x_{CM} = \frac{\sum m_i x_i}{M}, \quad y_{CM} = \frac{\sum m_i y_i}{M}, \quad z_{CM} = \frac{\sum m_i z_i}{M} $$

## Worked example
**Problem:** A system consists of three particles in the $xy$-plane. Particle 1 has mass $m_1 = 1.0$ kg and is at $\vec{r}_1 = (0, 2.0)$ m. Particle 2 has mass $m_2 = 2.0$ kg and is at the origin, $\vec{r}_2 = (0, 0)$ m. Particle 3 has mass $m_3 = 3.0$ kg and is at $\vec{r}_3 = (4.0, 0)$ m. Find the coordinates of the centre of mass.

**Solution:**

1.  **Identify the goal:** We need to find the vector $\vec{r}_{CM} = (x_{CM}, y_{CM})$.
2.  **Calculate the total mass, M:**
    $$ M = m_1 + m_2 + m_3 = 1.0 \text{ kg} + 2.0 \text{ kg} + 3.0 \text{ kg} = 6.0 \text{ kg} $$
3.  **Calculate the x-component of the CM, $x_{CM}$:**
    We use the formula $x_{CM} = \frac{1}{M} \sum m_i x_i$.
    $$ x_{CM} = \frac{m_1 x_1 + m_2 x_2 + m_3 x_3}{M} $$
    $$ x_{CM} = \frac{(1.0 \text{ kg})(0 \text{ m}) + (2.0 \text{ kg})(0 \text{ m}) + (3.0 \text{ kg})(4.0 \text{ m})}{6.0 \text{ kg}} $$
    $$ x_{CM} = \frac{0 + 0 + 12.0 \text{ kg}\cdot\text{m}}{6.0 \text{ kg}} = 2.0 \text{ m} $$
4.  **Calculate the y-component of the CM, $y_{CM}$:**
    We use the formula $y_{CM} = \frac{1}{M} \sum m_i y_i$.
    $$ y_{CM} = \frac{m_1 y_1 + m_2 y_2 + m_3 y_3}{M} $$
    $$ y_{CM} = \frac{(1.0 \text{ kg})(2.0 \text{ m}) + (2.0 \text{ kg})(0 \text{ m}) + (3.0 \text{ kg})(0 \text{ m})}{6.0 \text{ kg}} $$
    $$ y_{CM} = \frac{2.0 \text{ kg}\cdot\text{m} + 0 + 0}{6.0 \text{ kg}} = \frac{2.0}{6.0} \text{ m} \approx 0.33 \text{ m} $$
5.  **State the final answer as a vector or coordinates:**
    The centre of mass is located at $\vec{r}_{CM} = (2.0, 0.33)$ m.

**Reflection:**
Step 2 (calculating total mass) is a prerequisite for the component calculations. Steps 3 and 4 are independent applications of the same core idea (a mass-weighted average) to different spatial dimensions. Step 5 assembles the components back into a final position vector, which is the complete answer. Notice the CM is "pulled" towards the heavier mass $m_3$ in the x-direction and towards $m_1$ in the y-direction, as expected.

## Diagrams
A diagram for the worked example.

```text
      y |
        |
      2 + m1 (1kg)
        |
        |
      1 +
        |
        + . . . CM (2.0, 0.33)
  m2----|----------+----------+----------+-----> x
(2kg)   |          1          2          3     4
      (0,0)                                   m3 (3kg)
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the centre of mass as the "capital city" of a country made of separate islands (the particles). The location of the capital isn't the geographic centre of the map. It's placed based on a weighted average of the "population" (mass) of each island. The most populous island has the most influence, pulling the capital closer to it.
2.  **Formulas to Overlearn:**
    *   Vector form: $\vec{r}_{CM} = \frac{1}{M} \sum_{i=1}^{N} m_i \vec{r}_i$
    *   Component form: $x_{CM} = \frac{\sum m_i x_i}{\sum m_i}$ (and similarly for y, z).
3.  **Spaced Repetition Schedule:** Review this concept and re-derive the formulas from the "first principles pathway" below at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the formula, rebuild it from the idea of a **balance point**. For two masses on a seesaw, the torques must balance: $m_1 g d_1 = m_2 g d_2$, where $d_1$ and $d_2$ are the distances from the fulcrum. Let the fulcrum be at $x_{CM}$ and the masses at $x_1$ and $x_2$. Then $d_1 = |x_{CM} - x_1|$ and $d_2 = |x_2 - x_{CM}|$. The balance equation is $m_1(x_{CM} - x_1) = m_2(x_2 - x_{CM})$. Solve this for $x_{CM}$:
    $m_1 x_{CM} - m_1 x_1 = m_2 x_2 - m_2 x_{CM}$
    $m_1 x_{CM} + m_2 x_{CM} = m_1 x_1 + m_2 x_2$
    $x_{CM}(m_1 + m_2) = m_1 x_1 + m_2 x_2$
    $x_{CM} = \frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}$.
    This is the formula for two particles. Generalizing this logic to N particles in 3D gives the full vector formula.

## Common mistakes
*   **Forgetting to divide by the total mass.** Students often just sum the $m_i x_i$ products and forget the final division step. The units will be wrong (kg·m instead of m), which is a good sanity check.
*   **Calculating a geometric average.** Finding the average position $(\vec{r}_1 + \vec{r}_2 + \dots)/N$ instead of the mass-weighted average. This only works if all masses are equal.
*   **Sign errors with coordinates.** If a particle is at $x = -5$, you must use $-5$ in the formula. A hastily drawn diagram can lead to using only positive distances. Always use the coordinate values, not just their magnitudes.

## Self-check
1.  A 60 kg person and an 80 kg person are in a 10 m long canoe of mass 20 kg. The 60 kg person is 1 m from the left end, the 80 kg person is 1 m from the right end, and the canoe's own centre of mass is at its centre. Treating the people as point masses, find the centre of mass of the entire system relative to the left end of the canoe.
2.  Three particles of equal mass $m$ are located at the vertices of an equilateral triangle of side length $a$. Place the triangle in the $xy$-plane with one vertex at the origin and one side along the x-axis. Find the coordinates of the centre of mass.
3.  A uniform circular pizza has its centre of mass at the origin (0,0). A circular piece is cut out and eaten. The piece was centered at $(R/2, 0)$, where $R$ is the radius of the original pizza. Where is the centre of mass of the remaining pizza? (Hint: treat the missing piece as a "negative mass".)