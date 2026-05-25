## What it is
The centre of mass (CM) is the unique point where the weighted average of the positions of all parts of a system is located. For a rigid body, it is the "balance point"—the object would be perfectly balanced if you could place it on a pivot at its centre of mass. It's the point that moves as if all the object's mass were concentrated there.

## Why it matters
In aerospace, the stability of a rocket depends critically on the relative positions of its centre of mass and its centre of pressure. An unstable rocket will tumble. In orbital mechanics, planets and stars orbit their mutual centre of mass (the barycenter), which is why our sun wobbles slightly. In computer graphics and physics simulations, treating complex objects as point masses located at their CM dramatically simplifies calculations of motion.

## When to study it
Before tackling these derivations, you must have a solid grasp of single-variable integral calculus, particularly definite integrals. You also need to understand the concept of mass density: linear ($\lambda$, in kg/m), areal ($\sigma$, in kg/m²), and volumetric ($\rho$, in kg/m³). If you cannot confidently set up and solve an integral to find the area under a curve, you should review that topic first.

## How to study it (step by step)
1.  **Master the Discrete Case:** Write down the formula for the CM of a system of point masses $m_1, m_2, ..., m_n$ at positions $\vec{r}_1, \vec{r}_2, ..., \vec{r}_n$. Convince yourself it's just a weighted average.
2.  **Make the Leap to Continuous:** Understand how the sum $\sum m_i \vec{r}_i$ becomes the integral $\int \vec{r} \, dm$ as the number of particles goes to infinity and their mass becomes infinitesimal. This is the core conceptual step.
3.  **Derive for a 1D Rod:** Start with a uniform rod of length $L$. Define the linear mass density $\lambda$. Set up the integral for $x_{CM}$ from $x=0$ to $x=L$. This is the simplest case and will build your confidence.
4.  **Derive for a 2D Triangle:** Tackle a uniform right-angled triangle. The key here is choosing the right differential element, $dm$. Slice the triangle into infinitesimally thin horizontal strips and find the CM of each strip. Integrate these to find the CM of the whole triangle.
5.  **Derive for a 2D Semicircle:** Use polar coordinates or vertical strips to find the CM of a uniform semicircular lamina. This introduces more complex integration and the power of choosing a good coordinate system. Note how symmetry immediately tells you one coordinate of the CM.
6.  **Derive for a 3D Hemisphere:** Extend the logic to three dimensions. Find the CM of a solid, uniform hemisphere by slicing it into thin circular disks. This will solidify your understanding of how to set up volume integrals for CM calculations.

## Key ideas, with intuition
1.  **The Master Formula:** The position of the centre of mass, $\vec{R}_{CM}$, is the mass-weighted average position. For a continuous body, we replace the sum with an integral over the entire body.
    $$ \vec{R}_{CM} = \frac{\int \vec{r} \, dm}{\int dm} = \frac{1}{M} \int \vec{r} \, dm $$
    Here, $\vec{r}$ is the position vector of an infinitesimal mass element $dm$, and $M$ is the total mass of the object. This is just the discrete formula $\frac{\sum m_i \vec{r}_i}{\sum m_i}$ in the limit of infinite tiny masses.

2.  **Symmetry is a Free Lunch:** If an object has an axis or plane of symmetry, the centre of mass *must* lie on that axis or plane. For a sphere, the CM is at the geometric centre. For a uniform cylinder, it's on the central axis. For an isosceles triangle, it's on the altitude. Use this to simplify problems immediately; don't calculate what you already know.

3.  **The Differential Mass Element ($dm$):** This is the heart of the technique. You must express $dm$ in terms of geometric variables. The choice of element is key.
    *   **For a 1D rod:** Use a small length $dx$. If linear density is $\lambda$, then $dm = \lambda \, dx$.
    *   **For a 2D shape (lamina):** Use a small area $dA$. If areal density is $\sigma$, then $dm = \sigma \, dA$. You must then express $dA$ in terms of your integration variable (e.g., $dA = \text{width}(y) \cdot dy$).
    *   **For a 3D solid:** Use a small volume $dV$. If volumetric density is $\rho$, then $dm = \rho \, dV$. You then express $dV$ in terms of your integration variable (e.g., for a slice of a cone, $dV = \pi r(z)^2 \cdot dz$).

## Worked example
**Problem:** Find the centre of mass of a uniform triangular lamina with vertices at (0,0), (b,0), and (0,h).

**Solution:**
1.  **Assess Symmetry:** The triangle is not symmetric about the x or y-axis. We must calculate both $x_{CM}$ and $y_{CM}$. The object is uniform, so its areal mass density $\sigma$ is constant. Total mass $M = \sigma \cdot \text{Area} = \sigma \cdot \frac{1}{2}bh$.

2.  **Choose a Differential Element:** Let's find $y_{CM}$ first. The most effective way is to slice the triangle into thin horizontal strips of height $dy$ at a position $y$ from the base.

3.  **Characterize the Element:**
    *   The height of the strip is $dy$.
    *   The width of the strip, let's call it $w(y)$, changes with $y$. The line connecting (b,0) and (0,h) has the equation $\frac{x}{b} + \frac{y}{h} = 1$. Solving for $x$ (the width at height y) gives $x = b(1 - \frac{y}{h})$. So, $w(y) = b(1 - \frac{y}{h})$.
    *   The area of the strip is $dA = w(y) \, dy = b(1 - \frac{y}{h}) \, dy$.
    *   The mass of the strip is $dm = \sigma \, dA = \sigma b(1 - \frac{y}{h}) \, dy$.
    *   The centre of mass of this thin rectangular strip is at its geometric centre. Its y-coordinate is simply $y$.

4.  **Set up and Solve the Integral for $y_{CM}$:**
    $$ y_{CM} = \frac{1}{M} \int y \, dm $$
    The strips cover the triangle from $y=0$ to $y=h$.
    $$ y_{CM} = \frac{1}{M} \int_{0}^{h} y \left[ \sigma b \left(1 - \frac{y}{h}\right) \, dy \right] $$
    Substitute $M = \frac{1}{2}\sigma bh$. The $\sigma$ and $b$ terms will cancel.
    $$ y_{CM} = \frac{1}{\frac{1}{2}\sigma bh} \int_{0}^{h} \sigma b \left(y - \frac{y^2}{h}\right) \, dy = \frac{2}{h} \int_{0}^{h} \left(y - \frac{y^2}{h}\right) \, dy $$
    Now, integrate:
    $$ y_{CM} = \frac{2}{h} \left[ \frac{y^2}{2} - \frac{y^3}{3h} \right]_{0}^{h} = \frac{2}{h} \left( \left(\frac{h^2}{2} - \frac{h^3}{3h}\right) - (0) \right) $$
    $$ y_{CM} = \frac{2}{h} \left( \frac{h^2}{2} - \frac{h^2}{3} \right) = \frac{2}{h} \left( \frac{3h^2 - 2h^2}{6} \right) = \frac{2}{h} \left( \frac{h^2}{6} \right) = \frac{h}{3} $$

5.  **Repeat for $x_{CM}$:** By a symmetric argument (slicing into vertical strips of width $dx$), one can show $x_{CM} = \frac{b}{3}$.

**Reflection:** The key was choosing a differential element (a horizontal strip) whose own centre of mass was easy to define ($y_{CM, \text{strip}} = y$). This turned a 2D problem into a 1D integral. Expressing the width of the strip $w(y)$ in terms of the integration variable $y$ using the equation of the hypotenuse was the critical algebraic step.

## Diagrams
```text
      ^ y
      |
      h +------+ (0,h)
        |     /
        |    /
        |   /
      y +--+--+---- dm = sigma * w(y) * dy
        | /|\ \
        |  |  w(y)
        |  | /
        | /
    --0 +----------------> x
      (0,0)    b
```
*Description*: A right-angled triangle in the first quadrant. The y-axis runs from (0,0) to (0,h). The x-axis runs from (0,0) to (b,0). A thin horizontal rectangular strip is shown at height `y`, with thickness `dy` and width `w(y)`.

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a wobbly, oddly shaped plate (like Texas). To find its balance point, you mentally "scan" it with a laser, strip by strip. For each strip, you weigh its contribution to the overall balance (`r dm`). The integral is just the process of adding up all those tiny contributions perfectly.
2.  **Must Overlearn:**
    *   The definitional formula: $\vec{R}_{CM} = \frac{1}{M} \int \vec{r} \, dm$
    *   The mass element conversions: $dm = \lambda \, dL$, $dm = \sigma \, dA$, $dm = \rho \, dV$
3.  **Spaced Repetition Schedule:** Re-derive the CM for the triangle from scratch on Day 1, Day 3, Day 7, Day 16, and Day 35. Do not just read your notes. Force your brain to reconstruct the logic.
4.  **First Principles Pathway:** If you forget everything, start with two point masses, $m_1$ and $m_2$. Their CM is $R_{CM} = \frac{m_1 r_1 + m_2 r_2}{m_1 + m_2}$. Now imagine your continuous object is just a huge collection of these point masses. The sums naturally become integrals in the limit: $\sum m_i \to \int dm$ and $\sum m_i r_i \to \int r \, dm$.

## Common mistakes
1.  **Sloppy `dm`:** Writing $dm = \sigma dA$ and then forgetting to express $dA$ in terms of the integration variable. For the triangle, $dA = w(y)dy$, and you *must* find the function $w(y)$.
2.  **Incorrect Position `r`:** In the integral $\int y \, dm$, the $y$ term represents the y-coordinate of the centre of mass of the *element* $dm$, not just the y-coordinate of the bottom of the element. For a simple horizontal strip, these are the same. For a more complex element, they might not be.
3.  **Ignoring Symmetry:** Calculating $x_{CM}$ for a uniform semicircle symmetric about the y-axis. By symmetry, you know $x_{CM}=0$. Don't do unnecessary work.
4.  **Forgetting to Divide by Total Mass M:** The CM is an *average* position. Forgetting to divide by $M$ at the end is a very common error that gives an answer with the wrong units (mass-length instead of length).

## Self-check
1.  Find the centre of mass of a uniform rod of length $L$ but with a linear mass density that varies as $\lambda(x) = kx^2$, where $x$ is the distance from one end.
2.  Derive the y-coordinate of the centre of mass for a uniform, solid cone of height $h$ and base radius $R$, oriented with its base on the x-y plane and its apex at $(0,0,h)$.
3.  A uniform wire is bent into a semicircle of radius $R$. Find the coordinates of its centre of mass. (Note: this is a 1D problem in a 2D space).