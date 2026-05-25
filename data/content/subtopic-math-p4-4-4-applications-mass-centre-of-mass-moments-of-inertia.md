## What it is
These are physical properties of continuous bodies (like metal plates or solid objects) calculated by treating them as an infinite collection of infinitesimal point masses. Mass is the integral of density over a region. The centre of mass is the mass-weighted average position, or "balance point." The moment of inertia measures an object's resistance to being spun about an axis.

## Why it matters
This is the bridge from idealized point-mass physics to the mechanics of real, extended objects. In aerospace, the centre of mass determines an aircraft or rocket's stability and control characteristics. Moments of inertia are critical for calculating the torques required to orient a satellite, control the spin of a rocket stage, or analyze the dynamics of any rotating machinery.

## When to study it
You must have mastered double and triple integrals over general regions in Cartesian, polar, cylindrical, and spherical coordinates. A conceptual understanding of mass, density, and moments from single-variable calculus or introductory physics is also essential. If you cannot confidently set up and evaluate an integral like $\int_0^1 \int_x^{x^2} xy \, dy \, dx$, you should review that first.

## How to study it (step by step)
1.  **Review the 1D case:** Recall from single-variable calculus how to find the mass and centre of mass of a thin rod with variable density $\rho(x)$. Mass $M = \int_a^b \rho(x) \, dx$. Centre of mass $\bar{x} = \frac{1}{M} \int_a^b x \rho(x) \, dx$. This is the foundation.
2.  **Derive the 2D Mass Formula:** Consider a flat plate (a lamina) over a region $D$ in the xy-plane with density $\rho(x,y)$. Partition $D$ into tiny rectangles of area $\Delta A$. The mass of a small piece is $\Delta m \approx \rho(x_i, y_j) \Delta A$. Summing these and taking the limit gives the total mass: $M = \iint_D \rho(x,y) \, dA$.
3.  **Derive the 2D Centre of Mass:** The "moment" of a piece about the y-axis is its mass times its distance from the y-axis: $x_i \Delta m \approx x_i \rho(x_i, y_j) \Delta A$. Summing gives the total moment about the y-axis, $M_y = \iint_D x \rho(x,y) \, dA$. Similarly, $M_x = \iint_D y \rho(x,y) \, dA$. The centre of mass $(\bar{x}, \bar{y})$ is the weighted average: $\bar{x} = M_y / M$ and $\bar{y} = M_x / M$.
4.  **Derive the Moments of Inertia:** The moment of inertia of a point mass $m$ at distance $r$ from an axis is $mr^2$. For our lamina piece, $\Delta I \approx r^2 \Delta m = r^2 \rho(x_i, y_j) \Delta A$. The distance to the x-axis is $y$, so $I_x = \iint_D y^2 \rho(x,y) \, dA$. The distance to the y-axis is $x$, so $I_y = \iint_D x^2 \rho(x,y) \, dA$. The polar moment of inertia (about the origin) is $I_O = \iint_D (x^2+y^2) \rho(x,y) \, dA = I_x + I_y$.
5.  **Generalize to 3D:** Repeat the logic for a solid region $E$ with density $\rho(x,y,z)$. All double integrals become triple integrals, and $dA$ becomes $dV$. For example, $M = \iiint_E \rho(x,y,z) \, dV$ and $\bar{z} = \frac{1}{M} \iiint_E z \rho(x,y,z) \, dV$.
6.  **Solve Problems:** Work through problems for regions with different shapes (triangles, parabolic sections, semicircles) and with both constant and variable density functions. Pay meticulous attention to setting up the bounds of integration.

## Key ideas, with intuition
1.  **From Sums to Integrals:** Every one of these formulas comes from the same principle. Start with the discrete formula for a system of point masses ($m_1, m_2, ..., m_n$), and then generalize by replacing the sum with an integral and the point mass $m_i$ with an infinitesimal mass element $dm$.
    $$ \sum_{i=1}^n m_i \quad \longrightarrow \quad \int dm $$
2.  **Density is the Conversion Factor:** The density function $\rho$ is what allows us to connect geometry to mass. It's the crucial link that lets us write the mass element $dm$ in terms of a geometric element ($dx$, $dA$, or $dV$).
    $$ dm = \rho \, dV \quad (\text{or } \rho \, dA, \text{ or } \rho \, dx) $$
3.  **Centre of Mass is a Weighted Average:** The formula for the centre of mass is not arbitrary. It is the continuous analogue of the familiar weighted average formula.
    $$ \bar{x}_{\text{discrete}} = \frac{\sum m_i x_i}{\sum m_i} \quad \longrightarrow \quad \bar{x}_{\text{continuous}} = \frac{\int x \, dm}{\int dm} = \frac{\iint_D x \rho(x,y) \, dA}{\iint_D \rho(x,y) \, dA} $$
4.  **Moment of Inertia is Mass-Weighted Average of $r^2$:** This quantity measures resistance to rotation. Mass that is farther from the axis of rotation is "harder" to spin. The squared distance term ($r^2$) reflects that this effect is highly non-linear; doubling the distance of a mass quadruples its contribution to the moment of inertia.
    $$ I = \int r^2 \, dm $$

## Worked example
Find the mass and centre of mass of a triangular lamina with vertices at (0,0), (1,0), and (0,2), given the density function $\rho(x,y) = 1+3x+y$.

**1. Define the region D and set up the mass integral.**
The region $D$ is a triangle bounded by the x-axis ($y=0$), the y-axis ($x=0$), and the line connecting (1,0) and (0,2). The equation of this line is $y = -2x+2$, or $x = 1 - y/2$. We can integrate with respect to $x$ first, then $y$.
The bounds are $0 \le y \le 2$ and $0 \le x \le 1 - y/2$.

The mass $M$ is given by:
$$ M = \iint_D \rho(x,y) \, dA = \int_0^2 \int_0^{1-y/2} (1+3x+y) \, dx \, dy $$

**2. Evaluate the mass integral.**
First, the inner integral (with respect to $x$):
$$ \int_0^{1-y/2} (1+3x+y) \, dx = \left[ x + \frac{3}{2}x^2 + yx \right]_0^{1-y/2} $$
$$ = (1-\frac{y}{2}) + \frac{3}{2}(1-\frac{y}{2})^2 + y(1-\frac{y}{2}) - 0 $$
$$ = (1-\frac{y}{2}) + \frac{3}{2}(1-y+\frac{y^2}{4}) + y - \frac{y^2}{2} $$
$$ = 1 - \frac{y}{2} + \frac{3}{2} - \frac{3}{2}y + \frac{3}{8}y^2 + y - \frac{y^2}{2} = \frac{5}{2} - y - \frac{1}{8}y^2 $$
Now, the outer integral (with respect to $y$):
$$ M = \int_0^2 (\frac{5}{2} - y - \frac{1}{8}y^2) \, dy = \left[ \frac{5}{2}y - \frac{1}{2}y^2 - \frac{1}{24}y^3 \right]_0^2 $$
$$ = (\frac{5}{2}(2) - \frac{1}{2}(2)^2 - \frac{1}{24}(2)^3) - 0 = 5 - 2 - \frac{8}{24} = 3 - \frac{1}{3} = \frac{8}{3} $$
*Reflection: The mass calculation is a standard double integral. The key was correctly identifying the bounds for the triangular region and carefully executing the two stages of integration.*

**3. Set up and evaluate the moment integrals.**
Moment about the y-axis, $M_y$:
$$ M_y = \iint_D x \rho(x,y) \, dA = \int_0^2 \int_0^{1-y/2} x(1+3x+y) \, dx \, dy $$
$$ M_y = \int_0^2 \int_0^{1-y/2} (x+3x^2+xy) \, dx \, dy = \int_0^2 \left[ \frac{1}{2}x^2 + x^3 + \frac{1}{2}x^2y \right]_0^{1-y/2} \, dy $$
This integral evaluates to $M_y = \frac{5}{4}$. (The algebra is tedious but direct).

Moment about the x-axis, $M_x$:
$$ M_x = \iint_D y \rho(x,y) \, dA = \int_0^2 \int_0^{1-y/2} y(1+3x+y) \, dx \, dy $$
$$ M_x = \int_0^2 y \left[ x + \frac{3}{2}x^2 + yx \right]_0^{1-y/2} \, dy = \int_0^2 y(\frac{5}{2} - y - \frac{1}{8}y^2) \, dy $$
$$ M_x = \int_0^2 (\frac{5}{2}y - y^2 - \frac{1}{8}y^3) \, dy = \left[ \frac{5}{4}y^2 - \frac{1}{3}y^3 - \frac{1}{32}y^4 \right]_0^2 = 5 - \frac{8}{3} - \frac{16}{32} = \frac{11}{6} $$
*Reflection: These integrals add one factor of $x$ or $y$ to the integrand. This makes the integration slightly more complex but follows the same procedure. The second integral for $M_x$ reused the inner integral result from the mass calculation, which is a common time-saver.*

**4. Calculate the centre of mass.**
$$ \bar{x} = \frac{M_y}{M} = \frac{5/4}{8/3} = \frac{5}{4} \cdot \frac{3}{8} = \frac{15}{32} $$
$$ \bar{y} = \frac{M_x}{M} = \frac{11/6}{8/3} = \frac{11}{6} \cdot \frac{3}{8} = \frac{11}{16} $$
The centre of mass is $(\frac{15}{32}, \frac{11}{16})$.

*Reflection: The final step is simple arithmetic. The result $(\approx 0.47, \approx 0.69)$ is a point within the original triangle, which serves as a good sanity check.*

## Diagrams
A 2D lamina in the first quadrant, showing an infinitesimal mass element $dm$ at $(x,y)$.

```text
      y
      ^
      |
      |
      +---------+
      |         |
      |    D    |
      |         |
      |  (x,y)  |
      |    .---- dm = rho(x,y) dA
      |   | |   |
      |   +-+   |
      |         |
      +---------+-----------> x
      O
```

Distances used for moments of inertia calculation.

```text
      y
      ^
      |
      |
      |     (x,y)
      | y ----.---- dm
      | |     |
      | |     |
      | |<-x->|
      | |     |
      +-------------------> x
      O
```
The distance from $dm$ to the x-axis is $y$. The distance from $dm$ to the y-axis is $x$. The distance from $dm$ to the origin is $r = \sqrt{x^2+y^2}$.

## Memory technique — remember this forever
1.  **The Story: The Weighted Average Principle.**
    Think of any of these quantities as a continuous weighted average. What are you averaging, and what is the weight?
    -   **Centre of Mass $(\bar{x})$:** You are averaging the *position* $x$. The weight is the mass at that position, $dm$.
    -   **Moment of Inertia $(I_x)$:** You are averaging the *squared distance from the x-axis*, $y^2$. The weight is the mass, $dm$.
    This "average of [quantity] weighted by [mass]" structure, $\frac{\int \text{[quantity]} \, dm}{\int dm}$, generates almost all the formulas. (Note: for moment of inertia, we don't divide by total mass by definition, so it's just $\int \text{[quantity]} \, dm$).

2.  **Formulas to Overlearn (2D case):**
    $$ M = \iint_D \rho(x,y) \, dA $$
    $$ \bar{x} = \frac{1}{M} \iint_D x \rho(x,y) \, dA \quad , \quad \bar{y} = \frac{1}{M} \iint_D y \rho(x,y) \, dA $$
    $$ I_x = \iint_D y^2 \rho(x,y) \, dA \quad , \quad I_y = \iint_D x^2 \rho(x,y) \, dA $$

3.  **Spaced Repetition Schedule:**
    -   Day 1: Re-derive the formulas from the "weighted average" principle.
    -   Day 3: Solve a problem for a rectangular lamina with constant density.
    -   Day 7: Solve a problem for a semicircular lamina using polar coordinates.
    -   Day 16: Write down the 3D formulas for $M, \bar{z}, I_z$ from memory.
    -   Day 35: Explain to an imaginary student why the moment of inertia about the x-axis ($I_x$) depends on $y^2$.

4.  **First Principles Pathway:**
    If you forget everything, start with a finite sum of $N$ point masses.
    -   Total Mass: $M = \sum m_i$
    -   X-coordinate of Centre of Mass: $\bar{x} = \frac{\sum m_i x_i}{\sum m_i}$
    -   Moment of Inertia about y-axis: $I_y = \sum m_i x_i^2$
    Now, make the leap to a continuous body: $\sum \rightarrow \int$ and $m_i \rightarrow dm = \rho \, dA$. Substitute these into the discrete formulas, and you will recover the integral definitions.

## Common mistakes
1.  **Mixing up variables for moments.** The moment of inertia *about the x-axis* ($I_x$) uses the squared distance *to the x-axis*, which is $y^2$. The moment of inertia *about the y-axis* ($I_y$) uses $x^2$. Many students swap these.
2.  **Forgetting the density function $\rho$.** When density is a constant, say $\rho_0$, it's easy to forget to include it. The formulas always have $\rho$, even if it just factors out of the integral.
3.  **Dividing by M when you shouldn't.** The coordinates of the centre of mass $(\bar{x}, \bar{y})$ are found by dividing the moments ($M_y, M_x$) by the total mass $M$. The moments of inertia ($I_x, I_y, I_O$) are *not* divided by mass.
4.  **Errors in integral bounds.** This is the most frequent point of failure. The physics concepts can be correct, but if you cannot correctly describe the domain of integration $D$, the final answer will be wrong. Always sketch the region $D$ before writing down the integral.

## Self-check
1.  Find the centre of mass of a uniform rectangular lamina defined by $0 \le x \le a$ and $0 \le y \le b$. The density $\rho(x,y) = \rho_0$ is constant. (Your intuition should tell you the answer before you start).
2.  Set up the integral for the moment of inertia $I_x$ of a semicircular lamina of radius $R$, occupying the region $x^2+y^2 \le R^2, y \ge 0$. Assume the density is proportional to the distance from the origin, $\rho(x,y) = k\sqrt{x^2+y^2}$. What coordinate system is best here?
3.  Find the centre of mass $(\bar{x}, \bar{y}, \bar{z})$ of a uniform solid hemisphere of radius $R$ defined by $x^2+y^2+z^2 \le R^2$ and $z \ge 0$. Assume constant density $\rho_0$. By symmetry, what can you say about $\bar{x}$ and $\bar{y}$ before any calculation?