## 1. What it is — in plain English

Imagine you have two identical ice cream cones, one placed upside down on top of the other, so their pointy ends meet. This forms a "double cone." Now, imagine slicing through this double cone with a flat knife (a plane).

If you slice straight across, you get a circle. If you tilt the knife a bit, you get an ellipse. If you tilt it even more, parallel to the edge of one cone, you get a parabola.

But what if you slice the double cone in a way that the knife cuts *both* the top cone and the bottom cone, without passing through the very center where their tips meet? The shapes you get on each cone are called a **hyperbola**. It's not one continuous curve, but two separate, mirror-image curves that open away from each other. Think of them like two opposing "bowls" or two stretched-out "U" shapes.

These two separate curves are perfectly symmetrical, and they never meet. As they stretch outwards, they get closer and closer to two straight lines called "asymptotes," but they never actually touch them.

## 2. Why it matters — real-world applications

The hyperbola isn't just a theoretical shape; it plays a crucial role in various real-world phenomena and technologies:

1.  **Navigation Systems (LORAN, DECCA):** Before GPS, systems like LORAN (LOng RAnge Navigation) and DECCA used hyperbolic geometry. A ship or aircraft would measure the *difference* in time it took to receive synchronized radio signals from two pairs of transmitting stations. Since radio waves travel at a constant speed, a constant time difference implies a constant *difference in distance* to the two stations. The locus of points with a constant difference in distance from two fixed points is a hyperbola. By using two pairs of stations, the ship could pinpoint its location as the intersection of two hyperbolas.

2.  **Astronomy and Spacecraft Trajectories:** When a celestial body (like a comet) or a spacecraft approaches a massive object (like a planet or star) but has enough speed to escape its gravitational pull, its path often follows a hyperbolic trajectory. This is especially true for "gravitational slingshot" maneuvers, where a spacecraft uses a planet's gravity to accelerate and change direction, effectively following a hyperbolic path relative to the planet, allowing it to travel to distant parts of the solar system.

3.  **Optics and Telescope Design:** Hyperbolic mirrors are used in the design of certain types of reflecting telescopes, such as the Cassegrain telescope. In these designs, a primary parabolic mirror focuses incoming light to a point, but a smaller, secondary hyperbolic mirror is placed before that focal point. This hyperbolic mirror then reflects the light to a different focal point (often through a hole in the primary mirror), making the telescope more compact and allowing for a longer effective focal length.

4.  **Architectural Design (Cooling Towers):** Many large cooling towers for power plants are built in the shape of a hyperboloid of revolution (a 3D shape formed by rotating a hyperbola around its axis). This specific shape offers exceptional structural strength and stability, allowing them to be built tall and thin, while also being efficient for airflow and heat dissipation. The hyperbolic cross-section is naturally resistant to wind shear.

## 3. Prerequisites — what you must know first

To fully grasp the concepts of the hyperbola, ensure you have a solid understanding of these fundamental mathematical ideas:

*   **Cartesian Coordinates:** How to plot points $(x,y)$ in a 2D plane and understand the x-axis and y-axis.
*   **Distance Formula:** How to calculate the distance between any two points $(x_1, y_1)$ and $(x_2, y_2)$, which is $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
*   **Algebraic Manipulation:** Proficiency in solving equations, rearranging terms, factoring expressions, and working with square roots.
*   **Equation of a Line:** Understanding $y = mx + c$ (or $y - y_1 = m(x - x_1)$) for slope-intercept form and point-slope form, including parallel and perpendicular lines.
*   **Equation of a Circle:** $(x-h)^2 + (y-k)^2 = r^2$, understanding center and radius.
*   **Completing the Square:** A crucial algebraic technique for converting quadratic expressions into a perfect square trinomial, essential for transforming general conic equations into standard forms.
*   **Basic Properties of Ellipses:** While a hyperbola is distinct, understanding the ellipse's definition (sum of distances), foci, and standard forms will provide a comparative context.
*   **Pythagorean Theorem:** $a^2 + b^2 = c^2$, as it forms the basis for relationships between key parameters in conic sections.

## 4. The core idea — step by step

Let's build up our understanding of the hyperbola piece by piece, starting from its fundamental definition.

### Step 1: The Locus Definition

*   **Plain English Statement:** A hyperbola is the set of all points in a plane such that the *absolute difference* of the distances from two fixed points (called **foci**, plural of focus) is a positive constant.

*   **Small Concrete Example:** Imagine two points, $F_1$ and $F_2$, on a piece of paper. If you pick a point $P$ such that the distance from $P$ to $F_1$ minus the distance from $P$ to $F_2$ (or vice-versa) is, say, 6 units, then $P$ is on a hyperbola. If you find all such points $P$, you'll trace out the two branches of a hyperbola.

*   **Formal/Mathematical Version:** Let $F_1$ and $F_2$ be the two foci. For any point $P(x,y)$ on the hyperbola, the definition is:
    $$|PF_1 - PF_2| = 2a$$
    where $2a$ is the constant difference, and $a > 0$. The value $a$ is half the length of the transverse axis (which we'll define soon).

*   **What Could Go Wrong:** A common mistake is to confuse this with the definition of an ellipse, where the *sum* of the distances is constant ($PF_1 + PF_2 = 2a$). For a hyperbola, it's the *difference*. Always remember: **Hyperbola = Difference**, **Ellipse = Sum**.

### Step 2: Standard Forms (Centered at the Origin)

To make the equation simpler, we often place the center of the hyperbola at the origin $(0,0)$ and its foci on one of the coordinate axes. There are two main standard forms, depending on whether the hyperbola opens horizontally or vertically.

*   **Plain English Statement:** These are the simplest equations for a hyperbola when its center is at $(0,0)$. The orientation (whether it opens left-right or up-down) depends on which variable ($x$ or $y$) comes first and is positive.

*   **Small Concrete Example:**
    *   $\frac{x^2}{9} - \frac{y^2}{4} = 1$: This hyperbola opens left and right because the $x^2$ term is positive.
    *   $\frac{y^2}{16} - \frac{x^2}{25} = 1$: This hyperbola opens up and down because the $y^2$ term is positive.

*   **Formal/Mathematical Version:**
    1.  **Horizontal Hyperbola (opens left and right):**
        $$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$
        Here, the $x^2$ term is positive.
    2.  **Vertical Hyperbola (opens up and down):**
        $$\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$$
        Here, the $y^2$ term is positive.

    In both cases, $a^2$ is always the denominator of the *positive* term, and $b^2$ is the denominator of the *negative* term. This is a crucial distinction from ellipses, where $a^2$ is always the larger denominator. For hyperbolas, $a^2$ can be smaller than $b^2$.

*   **What Could Go Wrong:** The most common error is assuming $a^2$ is always the larger denominator, as it is with ellipses. For hyperbolas, $a^2$ is simply the denominator associated with the *positive* term, and it determines the distance to the vertices along the transverse axis.

### Step 3: Vertices and Transverse Axis

*   **Plain English Statement:** The **vertices** are the two points on each branch of the hyperbola that are closest to the center. The line segment connecting these two vertices is called the **transverse axis**. This axis indicates the direction the hyperbola opens.

*   **Small Concrete Example:**
    *   For $\frac{x^2}{9} - \frac{y^2}{4} = 1$, we have $a^2 = 9$, so $a=3$. The vertices are at $(\pm 3, 0)$. The transverse axis is the x-axis.
    *   For $\frac{y^2}{16} - \frac{x^2}{25} = 1$, we have $a^2 = 16$, so $a=4$. The vertices are at $(0, \pm 4)$. The transverse axis is the y-axis.

*   **Formal/Mathematical Version:**
    *   For a horizontal hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$:
        *   Vertices: $V_1(-a, 0)$ and $V_2(a, 0)$.
        *   Transverse Axis: The segment on the x-axis from $(-a,0)$ to $(a,0)$. Its length is $2a$.
    *   For a vertical hyperbola $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$:
        *   Vertices: $V_1(0, -a)$ and $V_2(0, a)$.
        *   Transverse Axis: The segment on the y-axis from $(0,-a)$ to $(0,a)$. Its length is $2a$.

*   **What Could Go Wrong:** Incorrectly identifying $a$. Remember, $a^2$ is always under the *positive* term, and $a$ is the distance from the center to a vertex.

### Step 4: Foci

*   **Plain English Statement:** The **foci** (plural of focus) are the two fixed points mentioned in the locus definition. They always lie on the transverse axis, *outside* the vertices, further away from the center than the vertices are.

*   **Small Concrete Example:**
    *   For $\frac{x^2}{9} - \frac{y^2}{4} = 1$, we have $a^2=9$ and $b^2=4$. The relationship for hyperbolas is $c^2 = a^2 + b^2$. So, $c^2 = 9 + 4 = 13$, which means $c = \sqrt{13}$. Since it's a horizontal hyperbola, the foci are at $(\pm \sqrt{13}, 0)$. Notice $\sqrt{13} \approx 3.6$, which is greater than $a=3$, so the foci are indeed outside the vertices.
    *   For $\frac{y^2}{16} - \frac{x^2}{25} = 1$, we have $a^2=16$ and $b^2=25$. So $c^2 = 16 + 25 = 41$, which means $c = \sqrt{41}$. Since it's a vertical hyperbola, the foci are at $(0, \pm \sqrt{41})$.

*   **Formal/Mathematical Version:** The distance from the center to each focus is denoted by $c$. The relationship between $a$, $b$, and $c$ for a hyperbola is:
    $$c^2 = a^2 + b^2$$
    *   For a horizontal hyperbola: Foci are $F_1(-c, 0)$ and $F_2(c, 0)$.
    *   For a vertical hyperbola: Foci are $F_1(0, -c)$ and $F_2(0, c)$.
    Note that for a hyperbola, $c > a$.

*   **What Could Go Wrong:** The most critical mistake here is using the ellipse formula for $c^2$, which is $c^2 = a^2 - b^2$. For a hyperbola, $c$ must be *greater* than $a$ (foci are outside vertices), which requires $c^2 = a^2 + b^2$. Always remember: **Hyperbola uses PLUS for $c^2$**.

### Step 5: Asymptotes

*   **Plain English Statement:** Asymptotes are two straight lines that the branches of the hyperbola approach closer and closer to as they extend infinitely far from the center. They act as "guides" for the shape of the hyperbola, even though the hyperbola never actually touches them. They always pass through the center of the hyperbola.

*   **Small Concrete Example:**
    *   For $\frac{x^2}{9} - \frac{y^2}{4} = 1$, we have $a=3$ and $b=2$. The center is $(0,0)$. The slopes of the asymptotes are $\pm \frac{b}{a} = \pm \frac{2}{3}$. So the equations are $y = \pm \frac{2}{3}x$.
    *   For $\frac{y^2}{16} - \frac{x^2}{25} = 1$, we have $a=4$ and $b=5$. The center is $(0,0)$. The slopes of the asymptotes are $\pm \frac{a}{b} = \pm \frac{4}{5}$. So the equations are $y = \pm \frac{4}{5}x$.

*   **Formal/Mathematical Version:** The equations for the asymptotes (centered at the origin) are:
    *   For a horizontal hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$:
        $$y = \pm \frac{b}{a}x$$
    *   For a vertical hyperbola $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$:
        $$y = \pm \frac{a}{b}x$$
    A helpful way to remember this is to think of the slope as $\frac{\text{change in } y}{\text{change in } x}$. For a horizontal hyperbola, $a$ is along the x-axis, $b$ along the y-axis, so $y/x = b/a$. For a vertical hyperbola, $a$ is along the y-axis, $b$ along the x-axis, so $y/x = a/b$.

*   **What Could Go Wrong:** Swapping $a$ and $b$ in the slope, or forgetting the $\pm$ sign (there are always two asymptotes).

### Step 6: Conjugate Axis and Rectangular Box

*   **Plain English Statement:** The **conjugate axis** is perpendicular to the transverse axis and passes through the center. While the hyperbola doesn't intersect this axis, its length ($2b$) is crucial for constructing the asymptotes. If you draw a rectangle with sides of length $2a$ (along the transverse axis) and $2b$ (along the conjugate axis), centered at the origin, the diagonals of this "central rectangle" are precisely the asymptotes!

*   **Small Concrete Example:**
    *   For $\frac{x^2}{9} - \frac{y^2}{4} = 1$, $a=3, b=2$. The transverse axis is along the x-axis (length $2a=6$). The conjugate axis is along the y-axis (length $2b=4$). The central rectangle has corners at $(\pm 3, \pm 2)$. The diagonals of this box are $y = \pm \frac{2}{3}x$, which are the asymptotes.
    *   For $\frac{y^2}{16} - \frac{x^2}{25} = 1$, $a=4, b=5$. The transverse axis is along the y-axis (length $2a=8$). The conjugate axis is along the x-axis (length $2b=10$). The central rectangle has corners at $(\pm 5, \pm 4)$. The diagonals of this box are $y = \pm \frac{4}{5}x$, which are the asymptotes.

*   **Formal/Mathematical Version:**
    *   The length of the conjugate axis is $2b$.
    *   For a horizontal hyperbola, its endpoints would be $(0, \pm b)$.
    *   For a vertical hyperbola, its endpoints would be $(\pm b, 0)$.
    *   The vertices of the central rectangle are $(\pm a, \pm b)$ for a horizontal hyperbola, and $(\pm b, \pm a)$ for a vertical hyperbola. The diagonals connect these corners and define the asymptotes.

*   **What Could Go Wrong:** Not understanding the role of $b$ in the geometry. $b$ doesn't directly give a point on the hyperbola, but it's essential for the asymptotes and the visual construction.

### Step 7: Eccentricity

*   **Plain English Statement:** **Eccentricity**, denoted by $e$, is a number that tells us how "open" or "wide" the branches of the hyperbola are. For a hyperbola, the eccentricity is always *greater than 1*. A larger eccentricity means the branches are wider and the asymptotes are closer to perpendicular.

*   **Small Concrete Example:**
    *   For $\frac{x^2}{9} - \frac{y^2}{4} = 1$, we found $a=3$ and $c=\sqrt{13}$. So, $e = \frac{c}{a} = \frac{\sqrt{13}}{3} \approx 1.20$. Since $1.20 > 1$, this is a valid eccentricity for a hyperbola.
    *   For $\frac{y^2}{16} - \frac{x^2}{25} = 1$, we found $a=4$ and $c=\sqrt{41}$. So, $e = \frac{c}{a} = \frac{\sqrt{41}}{4} \approx 1.60$. This is also greater than 1.

*   **Formal/Mathematical Version:** Eccentricity is defined as:
    $$e = \frac{c}{a}$$
    For a hyperbola, $c > a$, so $e > 1$.
    (Compare this to an ellipse, where $c < a$, so $0 < e < 1$. For a parabola, $e=1$.)

*   **What Could Go Wrong:** Forgetting the condition $e>1$ for a hyperbola, or confusing it with the ellipse's eccentricity range.

### Step 8: Standard Forms (Centered at $(h,k)$)

*   **Plain English Statement:** If the center of the hyperbola is not at the origin $(0,0)$ but at some other point $(h,k)$, we simply shift the entire graph. This means replacing $x$ with $(x-h)$ and $y$ with $(y-k)$ in all our formulas.

*   **Small Concrete Example:**
    *   The horizontal hyperbola $\frac{(x-1)^2}{9} - \frac{(y+2)^2}{4} = 1$ has its center at $(1, -2)$.
    *   The vertical hyperbola $\frac{(y-3)^2}{16} - \frac{(x-0)^2}{25} = 1$ (which can be written as $\frac{(y-3)^2}{16} - \frac{x^2}{25} = 1$) has its center at $(0, 3)$.

*   **Formal/Mathematical Version:**
    1.  **Horizontal Hyperbola (center $(h,k)$):**
        $$\frac{(x-h)^2}{a^2} - \frac{(y-k)^2}{b^2} = 1$$
    2.  **Vertical Hyperbola (center $(h,k)$):**
        $$\frac{(y-k)^2}{a^2} - \frac{(x-h)^2}{b^2} = 1$$
    All other formulas (vertices, foci, asymptotes) also shift:
    *   Vertices: $(h \pm a, k)$ or $(h, k \pm a)$.
    *   Foci: $(h \pm c, k)$ or $(h, k \pm c)$.
    *   Asymptotes: $y-k = \pm \frac{b}{a}(x-h)$ (horizontal) or $y-k = \pm \frac{a}{b}(x-h)$ (vertical).

*   **What Could Go Wrong:** Sign errors when identifying $h$ and $k$. Remember that $(x-h)$ means the x-coordinate of the center is $h$, and $(y-k)$ means the y-coordinate of the center is $k$. For example, $(x+3)^2$ means $h=-3$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Finding properties from a standard equation

**Problem:** Find the center, vertices, foci, asymptotes, and eccentricity of the hyperbola given by the equation $\frac{x^2}{16} - \frac{y^2}{9} = 1$.

**Given:** The equation of the hyperbola: $\frac{x^2}{16} - \frac{y^2}{9} = 1$.
**Want:** Center, vertices, foci, asymptotes, eccentricity.

**Step-by-step Solution:**

1.  **Identify the standard form and orientation.**
    $$ \frac{x^2}{16} - \frac{y^2}{9} = 1 $$
    *   The $x^2$ term is positive, which means this is a **horizontal hyperbola**.
    *   Since there are no $(x-h)$ or $(y-k)$ terms, the center is at the origin.
    *   **Center:** $\boxed{(0,0)}$

2.  **Determine $a^2$ and $b^2$.**
    *   From the standard form, $a^2$ is the denominator of the positive term, and $b^2$ is the denominator of the negative term.
    *   $a^2 = 16 \implies a = \sqrt{16} = 4$
    *   $b^2 = 9 \implies b = \sqrt{9} = 3$

3.  **Calculate $c^2$ and $c$.**
    *   For a hyperbola, the relationship between $a, b, c$ is $c^2 = a^2 + b^2$.
    *   $c^2 = 16 + 9 = 25$
    *   $c = \sqrt{25} = 5$

4.  **Find the vertices.**
    *   For a horizontal hyperbola centered at $(0,0)$, the vertices are at $(\pm a, 0)$.
    *   Vertices: $(\pm 4, 0)$
    *   **Vertices:** $\boxed{(-4,0) \text{ and } (4,0)}$

5.  **Find the foci.**
    *   For a horizontal hyperbola centered at $(0,0)$, the foci are at $(\pm c, 0)$.
    *   Foci: $(\pm 5, 0)$
    *   **Foci:** $\boxed{(-5,0) \text{ and } (5,0)}$

6.  **Find the asymptotes.**
    *   For a horizontal hyperbola centered at $(0,0)$, the asymptotes are $y = \pm \frac{b}{a}x$.
    *   $y = \pm \frac{3}{4}x$
    *   **Asymptotes:** $\boxed{y = \frac{3}{4}x \text{ and } y = -\frac{3}{4}x}$

7.  **Calculate the eccentricity.**
    *   The eccentricity formula is $e = \frac{c}{a}$.
    *   $e = \frac{5}{4}$
    *   **Eccentricity:** $\boxed{\frac{5}{4}}$

**Reflection:** This example was straightforward because the equation was already in standard form and centered at the origin. The key was correctly identifying $a^2$ and $b^2$ based on the positive/negative terms, and using the correct $c^2 = a^2 + b^2$ formula for a hyperbola.

### Example 2: Converting general form to standard form and finding properties

**Problem:** Find the center, vertices, foci, asymptotes, and eccentricity of the hyperbola given by the equation $9x^2 - 4y^2 - 18x - 16y - 43 = 0$.

**Given:** The general form equation: $9x^2 - 4y^2 - 18x - 16y - 43 = 0$.
**Want:** Center, vertices, foci, asymptotes, eccentricity.

**Step-by-step Solution:**

1.  **Group $x$ terms and $y$ terms, and move the constant to the right side.**
    *   Group terms: $(9x^2 - 18x) - (4y^2 + 16y) = 43$
    *   *Explanation:* We group the $x$ terms and $y$ terms together to prepare for completing the square. Notice we factored out a negative sign from the $y$ terms, changing $-16y$ to $+16y$ inside the parenthesis.

2.  **Factor out coefficients of $x^2$ and $y^2$.**
    *   $9(x^2 - 2x) - 4(y^2 + 4y) = 43$
    *   *Explanation:* Completing the square requires the quadratic terms ($x^2, y^2$) to have a coefficient of 1.

3.  **Complete the square for both $x$ and $y$ terms.**
    *   For $x^2 - 2x$: Take half of $-2$ (which is $-1$), and square it (which is $1$).
        *   Add $1$ inside the parenthesis: $9(x^2 - 2x + 1)$
        *   Since we added $1$ *inside* a parenthesis multiplied by $9$, we actually added $9 \times 1 = 9$ to the left side. So, add $9$ to the right side as well.
    *   For $y^2 + 4y$: Take half of $4$ (which is $2$), and square it (which is $4$).
        *   Add $4$ inside the parenthesis: $-4(y^2 + 4y + 4)$
        *   Since we added $4$ *inside* a parenthesis multiplied by $-4$, we actually added $-4 \times 4 = -16$ to the left side. So, add $-16$ to the right side as well.
    *   Equation becomes: $9(x^2 - 2x + 1) - 4(y^2 + 4y + 4) = 43 + 9 - 16$
    *   *Explanation:* This is the most crucial step. Remember to balance the equation by adding the *actual* value added/subtracted to the left side to the right side.

4.  **Rewrite the squared terms and simplify the right side.**
    *   $9(x-1)^2 - 4(y+2)^2 = 36$
    *   *Explanation:* We've now got the terms in the form $(x-h)^2$ and $(y-k)^2$.

5.  **Divide by the constant on the right side to make it 1.**
    *   $\frac{9(x-1)^2}{36} - \frac{4(y+2)^2}{36} = \frac{36}{36}$
    *   $\frac{(x-1)^2}{4} - \frac{(y+2)^2}{9} = 1$
    *   *Explanation:* This is the standard form of the hyperbola.

6.  **Identify the center, $a^2$, $b^2$, and orientation.**
    *   The center $(h,k)$ is $(1, -2)$.
    *   The $x^2$ term is positive, so it's a **horizontal hyperbola**.
    *   $a^2 = 4 \implies a = 2$
    *   $b^2 = 9 \implies b = 3$
    *   **Center:** $\boxed{(1,-2)}$

7.  **Calculate $c^2$ and $c$.**
    *   $c^2 = a^2 + b^2 = 4 + 9 = 13$
    *   $c = \sqrt{13}$

8.  **Find the vertices.**
    *   For a horizontal hyperbola centered at $(h,k)$, vertices are $(h \pm a, k)$.
    *   Vertices: $(1 \pm 2, -2)$
    *   $V_1 = (1-2, -2) = (-1, -2)$
    *   $V_2 = (1+2, -2) = (3, -2)$
    *   **Vertices:** $\boxed{(-1,-2) \text{ and } (3,-2)}$

9.  **Find the foci.**
    *   For a horizontal hyperbola centered at $(h,k)$, foci are $(h \pm c, k)$.
    *   Foci: $(1 \pm \sqrt{13}, -2)$
    *   **Foci:** $\boxed{(1-\sqrt{13},-2) \text{ and } (1+\sqrt{13},-2)}$

10. **Find the asymptotes.**
    *   For a horizontal hyperbola centered at $(h,k)$, asymptotes are $y-k = \pm \frac{b}{a}(x-h)$.
    *   $y - (-2) = \pm \frac{3}{2}(x - 1)$
    *   $y + 2 = \pm \frac{3}{2}(x - 1)$
    *   **Asymptotes:** $\boxed{y + 2 = \frac{3}{2}(x - 1) \text{ and } y + 2 = -\frac{3}{2}(x - 1)}$

11. **Calculate the eccentricity.**
    *   $e = \frac{c}{a} = \frac{\sqrt{13}}{2}$
    *   **Eccentricity:** $\boxed{\frac{\sqrt{13}}{2}}$

**Reflection:** This example was harder due to the need for completing the square. The most common pitfalls are sign errors when factoring out coefficients (like $-4(y^2+4y)$) and correctly balancing the equation when adding constants to complete the square (e.g., adding $9 \times 1$ and $-4 \times 4$ to the right side).

### Example 3: Finding the equation from given properties (foci and a vertex)

**Problem:** Find the standard equation of the hyperbola with foci at $(0, \pm 5)$ and vertices at $(0, \pm 3)$.

**Given:** Foci $F_1(0, -5)$, $F_2(0, 5)$ and Vertices $V_1(0, -3)$, $V_2(0, 3)$.
**Want:** Standard equation of the hyperbola.

**Step-by-step Solution:**

1.  **Determine the center.**
    *   The foci and vertices are symmetric about the origin. The midpoint of the foci (or vertices) is the center.
    *   Center: $\left(\frac{0+0}{2}, \frac{-5+5}{2}\right) = (0,0)$.
    *   **Center:** $(0,0)$

2.  **Determine the orientation.**
    *   Since the foci and vertices are on the y-axis (their x-coordinates are 0), the transverse axis is vertical.
    *   This means it's a **vertical hyperbola**, so its standard form will be $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$.

3.  **Determine $a$ and $c$.**
    *   The distance from the center to a vertex is $a$. From $(0,0)$ to $(0,3)$, $a=3$.
    *   The distance from the center to a focus is $c$. From $(0,0)$ to $(0,5)$, $c=5$.
    *   $a = 3$
    *   $c = 5$

4.  **Calculate $b^2$.**
    *   For a hyperbola, $c^2 = a^2 + b^2$.
    *   $5^2 = 3^2 + b^2$
    *   $25 = 9 + b^2$
    *   $b^2 = 25 - 9 = 16$
    *   $b = 4$

5.  **Write the standard equation.**
    *   Using the vertical hyperbola form $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$, substitute $a^2=9$ and $b^2=16$.
    *   **Equation:** $\boxed{\frac{y^2}{9} - \frac{x^2}{16} = 1}$

**Reflection:** This example required working backward from given geometric properties. The key steps were correctly identifying the center and orientation, then using the definitions of $a$ (distance to vertex) and $c$ (distance to focus) to find their values, and finally using $c^2 = a^2 + b^2$ to find $b^2$.

### Example 4: Finding the equation from asymptotes and a point

**Problem:** Find the standard equation of the hyperbola with asymptotes $y = \pm \frac{3}{2}x$ that passes through the point $(4, \sqrt{5})$.

**Given:** Asymptotes $y = \pm \frac{3}{2}x$ and a point $(4, \sqrt{5})$ on the hyperbola.
**Want:** Standard equation of the hyperbola.

**Step-by-step Solution:**

1.  **Determine the center and orientation from the asymptotes.**
    *   The asymptotes are $y = \pm \frac{3}{2}x$. Since there are no $(x-h)$ or $(y-k)$ terms, the center of the hyperbola is at the origin $(0,0)$.
    *   The slope of the asymptotes is $\pm \frac{3}{2}$.
    *   If it's a horizontal hyperbola ($\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$), the slope is $\pm \frac{b}{a}$. So, $\frac{b}{a} = \frac{3}{2}$.
    *   If it's a vertical hyperbola ($\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$), the slope is $\pm \frac{a}{b}$. So, $\frac{a}{b} = \frac{3}{2}$.
    *   Let's test both possibilities.

2.  **Case A: Assume it's a horizontal hyperbola.**
    *   Standard form: $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$.
    *   Asymptote slope: $\frac{b}{a} = \frac{3}{2} \implies b = \frac{3}{2}a$.
    *   Substitute this into the standard equation: $\frac{x^2}{a^2} - \frac{y^2}{(\frac{3}{2}a)^2} = 1 \implies \frac{x^2}{a^2} - \frac{y^2}{\frac{9}{4}a^2} = 1$.
    *   Now, use the given point $(4, \sqrt{5})$ to find $a^2$.
    *   $\frac{4^2}{a^2} - \frac{(\sqrt{5})^2}{\frac{9}{4}a^2} = 1$
    *   $\frac{16}{a^2} - \frac{5}{\frac{9}{4}a^2} = 1$
    *   $\frac{16}{a^2} - \frac{20}{9a^2} = 1$
    *   Multiply by $9a^2$ to clear denominators: $9(16) - 20 = 9a^2$
    *   $144 - 20 = 9a^2$
    *   $124 = 9a^2 \implies a^2 = \frac{124}{9}$.
    *   Now find $b^2$: $b^2 = (\frac{3}{2}a)^2 = \frac{9}{4}a^2 = \frac{9}{4} \left(\frac{124}{9}\right) = \frac{124}{4} = 31$.
    *   So, for a horizontal hyperbola, the equation would be $\frac{x^2}{124/9} - \frac{y^2}{31} = 1$. This is a valid equation.

3.  **Case B: Assume it's a vertical hyperbola.**
    *   Standard form: $\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$.
    *   Asymptote slope: $\frac{a}{b} = \frac{3}{2} \implies a = \frac{3}{2}b$.
    *   Substitute this into the standard equation: $\frac{y^2}{(\frac{3}{2}b)^2} - \frac{x^2}{b^2} = 1 \implies \frac{y^2}{\frac{9}{4}b^2} - \frac{x^2}{b^2} = 1$.
    *   Now, use the given point $(4, \sqrt{5})$ to find $b^2$.
    *   $\frac{(\sqrt{5})^2}{\frac{9}{4}b^2} - \frac{4^2}{b^2} = 1$
    *   $\frac{5}{\frac{9}{4}b^2} - \frac{16}{b^2} = 1$
    *   $\frac{20}{9b^2} - \frac{16}{b^2} = 1$
    *   Multiply by $9b^2$: $20 - 9(16) = 9b^2$
    *   $20 - 144 = 9b^2$
    *   $-124 = 9b^2 \implies b^2 = -\frac{124}{9}$.
    *   *Explanation:* Since $b^2$ must be positive (it's a square of a real length), this case is impossible. Therefore, the hyperbola cannot be vertical.

4.  **Final Equation (from Case A).**
    *   The hyperbola must be horizontal.
    *   $a^2 = \frac{124}{9}$ and $b^2 = 31$.
    *   **Equation:** $\boxed{\frac{x^2}{124/9} - \frac{y^2}{31} = 1}$ (or $\frac{9x^2}{124} - \frac{y^2}{31} = 1$)

**Reflection:** This example was challenging because the orientation wasn't immediately obvious. It required setting up a system of equations (one from the asymptote slope, one from the point on the hyperbola) and testing both possible orientations. The key insight was that $a^2$ and $b^2$ must be positive, which eliminated one case.

## 6. Common mistakes and traps

1.  **Confusing Hyperbola and Ellipse $c^2$ relation:** The most frequent error. For a hyperbola, $c^2 = a^2 + b^2$. For an ellipse, $c^2 = a^2 - b^2$. Remember: Hyperbola's foci are *outside* its vertices, so $c > a$, thus $c^2$ must be *larger* than $a^2$, requiring addition.
2.  **Incorrectly identifying $a^2$ and $b^2$:** For hyperbolas, $a^2$ is always the denominator of the *positive* term, and $b^2$ is the denominator of the *negative* term. It's *not* necessarily the larger denominator (as it is for ellipses). This directly impacts orientation.
3.  **Swapping $a$ and $b$ in asymptote slopes:** For a horizontal hyperbola, the asymptotes are $y = \pm \frac{b}{a}x$. For a vertical hyperbola, they are $y = \pm \frac{a}{b}x$. A good mental check is to remember that the slope is $\frac{\text{vertical change}}{\text{horizontal change}}$. For horizontal hyperbolas, $a$ is horizontal, $b$ is vertical. For vertical hyperbolas, $a$ is vertical, $b$ is horizontal.
4.  **Sign errors with $(h,k)$ in shifted hyperbolas:** When the equation is $\frac{(x-h)^2}{a^2} - \frac{(y-k)^2}{b^2} = 1$, the center is $(h,k)$. Students often forget that $(x+h)^2$ means the x-coordinate of the center is $-h$.
5.  **Errors during completing the square:** Especially when factoring out negative coefficients (e.g., $-(4y^2+16y)$ becomes $-4(y^2+4y)$) and when balancing the equation by adding constants to the right side (e.g., if you add $9 \times 1$ and $-4 \times 4$ to the left, you must add $9$ and $-16$ to the right).
6.  **Forgetting $e>1$ for hyperbolas:** Eccentricity $e = c/a$. Since $c > a$ for a hyperbola, $e$ must always be greater than 1. If your calculation yields $e \le 1$, you've made a mistake.

## 7. Textbook-precise explanation

A **hyperbola** is a conic section defined as the locus of all points $P$ in a plane such that the absolute difference of the distances from $P$ to two fixed points, called the **foci** ($F_1$ and $F_2$), is a positive constant, denoted $2a$. Mathematically, this is expressed as $|PF_1 - PF_2| = 2a$.

Let the center of the hyperbola be $(h,k)$. The distance from the center to each vertex is $a$, and the distance from the center to each focus is $c$. The relationship between these parameters is given by $c^2 = a^2 + b^2$, where $b$ is the semi-conjugate axis length.

The **standard forms** of the equation of a hyperbola are:

1.  **Horizontal Hyperbola (transverse axis parallel to the x-axis):**
    $$\frac{(x-h)^2}{a^2} - \frac{(y-k)^2}{b^2} = 1$$
    *   **Center:** $(h,k)$
    *   **Vertices:** $(h \pm a, k)$
    *   **Foci:** $(h \pm c, k)$
    *   **Transverse Axis:** The line segment connecting the vertices, length $2a$.
    *   **Conjugate Axis:** The line segment perpendicular to the transverse axis, passing through the center, length $2b$. Its endpoints are $(h, k \pm b)$.
    *   **Asymptotes:** $y-k = \pm \frac{b}{a}(x-h)$

2.  **Vertical Hyperbola (transverse axis parallel to the y-axis):**
    $$\frac{(y-k)^2}{a^2} - \frac{(x-h)^2}{b^2} = 1$$
    *   **Center:** $(h,k)$
    *   **Vertices:** $(h, k \pm a)$
    *   **Foci:** $(h, k \pm c)$
    *   **Transverse Axis:** The line segment connecting the vertices, length $2a$.
    *   **Conjugate Axis:** The line segment perpendicular to the transverse axis, passing through the center, length $2b$. Its endpoints are $(h \pm b, k)$.
    *   **Asymptotes:** $y-k = \pm \frac{a}{b}(x-h)$

In both cases, $a^2$ is the denominator of the positive term, and $b^2$ is the denominator of the negative term. The value $a$ is always the distance from the center to a vertex.

The **eccentricity** of a hyperbola, denoted $e$, is given by $e = \frac{c}{a}$. For a hyperbola, $c > a$, which implies $e > 1$. The eccentricity measures the "openness" of the hyperbola's branches; as $e$ increases, the branches become wider.

The general equation of a conic section is $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$. For a hyperbola, if $B=0$, then $AC < 0$ (i.e., $A$ and $C$ have opposite signs). If $B \neq 0$, the condition is $B^2 - 4AC > 0$.

*References:*
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021. (Chapter 10, Conic Sections)
*   Larson, Ron, and Bruce H. Edwards. *Calculus*. 11th ed., Cengage Learning, 2018. (Chapter 10, Conic Sections)

## 8. ASCII diagrams

Here are two ASCII diagrams illustrating key features of a hyperbola centered at the origin:

```text
       ^ y
       |
       |     \   /
       |      \ /
       |       * V2 (0,a)
       |       |
       |       |
       |       F2 (0,c)
       |       |
<------C-------|-------> x
       |       | (0,0)
       |       F1 (0,-c)
       |       |
       |       * V1 (0,-a)
       |      / \
       |     /   \
       |    /     \
       v

  Vertical Hyperbola Example: (y^2/a^2) - (x^2/b^2) = 1
  C: Center (0,0)
  V1, V2: Vertices (0, +/- a)
  F1, F2: Foci (0, +/- c)
  The dashed lines would be the asymptotes, y = +/- (a/b)x
```

```text
       ^ y
       |
       |    . . . . . . . . . . . . . . . . . . . Asymptote (y = (b/a)x)
       |   .                 .                 .
       |  .                  .                  .
       | .                   .                   .
       |*--------------------*-------------------*
       | V_y_upper (0,b)     |                   |
       | .         .         |         .         .
       | .         .         |         .         .
       | .         .         |         .         .
       | .         .         |         .         .
       *-----------F1--------C---------F2--------*-----------> x
       (-c,0)      (-a,0)   (0,0)      (a,0)     (c,0)
       | .         .         |         .         .
       | .         .         |         .         .
       | .         .         |         .         .
       | .         .         |         .         .
       |*--------------------*-------------------*
       | V_y_lower (0,-b)    |                   |
       |  .                  .                  .
       |   .                 .                 .
       |    . . . . . . . . . . . . . . . . . . . Asymptote (y = -(b/a)x)
       v

  Horizontal Hyperbola Example: (x^2/a^2) - (y^2/b^2) = 1
  C: Center (0,0)
  (a,0), (-a,0): Vertices (actual points on the hyperbola)
  (c,0), (-c,0): Foci (F1, F2)
  The rectangle formed by corners (+/- a, +/- b) is the 'central box'.
  The dashed lines are the asymptotes, which are the diagonals of this central box.
  The actual hyperbola curves start at the vertices (a,0) and (-a,0) and approach the asymptotes.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **For $c^2 = a^2 \pm b^2$:** Think "Hyperbola **H**as **A**ddition" (for $c^2 = a^2 + b^2$) and "Ellipse **E**agerly **S**ubtracts" (for $c^2 = a^2 - b^2$). This is the most crucial distinction.
    *   **For Asymptotes:** Visualize the "central rectangle" or "asymptote box" (with sides $2a$ and $2b$). The asymptotes are always the diagonals of this box. The slope is always $\frac{\text{vertical distance}}{\text{horizontal distance}}$ from the center to a corner of this box.
        *   If the $x^2$ term is positive (horizontal hyperbola), $a$ is horizontal, $b$ is vertical. So slope is $\pm b/a$.
        *   If the $y^2$ term is positive (vertical hyperbola), $a$ is vertical, $b$ is horizontal. So slope is $\pm a/b$.

2.  **Formulas/Facts to Overlearn:**
    *   **Standard Forms (centered at $(h,k)$):**
        *   Horizontal: $\frac{(x-h)^2}{a^2} - \frac{(y-k)^2}{b^2} = 1$
        *   Vertical: $\frac{(y-k)^2}{a^2} - \frac{(x-h)^2}{b^2} = 1$
        (Crucially, $a^2$ is always under the positive term.)
    *   **Foci Relationship:** $c^2 = a^2 + b^2$ (always addition for hyperbola).
    *   **Eccentricity:** $e = c/a$ (always $e > 1$ for hyperbola).

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day.
    *   **Review 2:** After 3 days.
    *   **Review 3:** After 7 days.
    *   **Review 4:** After 16 days.
    *   **Review 5:** After 35 days.
    (Actively recall definitions, sketch diagrams, and work through a simple problem each time.)

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the standard equation, you can rebuild it from the locus definition:
    *   **Start with the definition:** $|PF_1 - PF_2| = 2a$.
    *   **Place the foci:** For simplicity, place them on the x-axis at $F_1(-c, 0)$ and $F_2(c, 0)$. Let $P(x,y)$ be a point on the hyperbola.
    *   **Apply distance formula:** $\sqrt{(x-(-c))^2 + (y-0)^2} - \sqrt{(x-c)^2 + (y-0)^2} = \pm 2a$.
    *   **Isolate one radical:** $\sqrt{(x+c)^2 + y^2} = \pm 2a + \sqrt{(x-c)^2 + y^2}$.
    *   **Square both sides:** This will eliminate one radical, but you'll still have one on the right side.
    *   **Rearrange and isolate the remaining radical:** Get the remaining radical term by itself on one side.
    *   **Square both sides again:** This will eliminate the final radical.
    *   **Simplify algebraically:** Collect $x^2$ and $y^2$ terms. You will eventually arrive at an equation of the form $\frac{x^2}{a^2} - \frac{y^2}{c^2-a^2} = 1$.
    *   **Define $b^2$:** Let $b^2 = c^2 - a^2$. (This implies $c^2 = a^2 + b^2$, which is our key relationship).
    *   **Final Form:** $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$.
    This derivation is lengthy and algebraically intensive, but it reinforces every part of the definition and the relationships between $a, b, c$.

## 10. Connections — what this leads to

Understanding the hyperbola is not an isolated skill; it's a foundational piece that connects to many advanced mathematical and scientific concepts:

1.  **Calculus:**
    *   **Derivatives:** Finding the slope of tangent lines to a hyperbola at any point. This is crucial for optimization problems and understanding instantaneous rates of change.
    *   **Integrals:** Calculating areas bounded by hyperbolic curves, or volumes of solids generated by revolving a hyperbola around an axis (hyperboloids).
    *   **Hyperbolic Functions:** The functions $\sinh(x)$, $\cosh(x)$, $\tanh(x)$ (hyperbolic sine, cosine, tangent) are analogous to trigonometric functions and are directly related to the geometry of the hyperbola (e.g., $(x/a)^2 - (y/b)^2 = 1$ can be parameterized by $x = a \cosh(t)$, $y = b \sinh(t)$). These functions appear in solutions to certain differential equations and in physics (e.g., catenary curves).

2.  **Analytic Geometry:**
    *   **General Conic Sections:** The hyperbola is one of the three non-degenerate conic sections. Understanding its properties allows for a deeper study of the general quadratic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$ and how to classify and rotate conic sections.
    *   **Polar Coordinates:** Representing hyperbolas using polar coordinates, which simplifies certain types of problems, especially in celestial mechanics.

3.  **Linear Algebra:**
    *   **Quadratic Forms:** The equation of a hyperbola can be expressed as a quadratic form, which can be analyzed using matrices and eigenvalues, leading to concepts like principal axes and rotations.

4.  **Physics and Engineering:**
    *   **Special Relativity:** In spacetime diagrams, the path of constant spacetime interval (invariant separation between events) forms a hyperbola. This is fundamental to understanding how observers in different inertial frames perceive time and space.
    *   **Electromagnetism:** Fields around charged particles can sometimes be described using hyperbolic geometry.
    *   **Acoustics:** The principle of constant difference in distances from two sound sources (leading to hyperbolic localization) is used in sound ranging and acoustic navigation.

5.  **Differential Equations:**
    *   Solutions to certain second-order linear differential equations involve hyperbolic functions, which are directly tied to the hyperbola's definition.

## 11. Self-check questions

1.  A hyperbola has its foci at $(\pm 6, 0)$ and vertices at $(\pm 4, 0)$. Write its standard equation.
2.  Consider the hyperbola given by $\frac{(y+1)^2}{25} - \frac{(x-3)^2}{144} = 1$. Find its center, vertices, foci, and the equations of its asymptotes.
3.  Convert the equation $4x^2 - 9y^2 + 32x + 36y - 8 = 0$ into standard form. Then, identify its center, orientation, and eccentricity.
4.  A hyperbola is centered at the origin, has a horizontal transverse axis, and its asymptotes are $y = \pm \frac{1}{2}x$. If the hyperbola passes through the point $(6, \sqrt{5})$, what is its standard equation?
5.  Explain the difference in the relationship between $a, b, c$ for an ellipse versus a hyperbola, and how this relates to their respective eccentricities.