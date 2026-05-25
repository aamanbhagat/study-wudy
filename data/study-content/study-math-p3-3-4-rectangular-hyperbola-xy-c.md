## 1. What it is — in plain English

Imagine you have two numbers, let's call them $x$ and $y$. If you multiply them together, you always get the same result, let's say a specific number like 10. So, $x \times y = 10$.

Now, think about all the possible pairs of $x$ and $y$ that make this true. If $x$ is small, $y$ has to be big to make 10. For example, if $x=1$, $y=10$. If $x=2$, $y=5$. If $x=0.5$, $y=20$.

What happens if $x$ gets really, really big? Then $y$ has to get really, really small, almost zero, to still make 10. And if $x$ is negative? Say $x=-1$, then $y$ must be $-10$ to get $x \times y = 10$.

If you plot all these $(x, y)$ pairs on a graph, you don't get a straight line or a circle. Instead, you get a very specific curved shape that looks like two separate, smooth, mirror-image curves. These curves never actually touch the $x$-axis or the $y$-axis, but they get closer and closer forever. This special curve is called a "rectangular hyperbola," and the equation $xy = c^2$ (where $c^2$ is just that constant number, like 10 in our example) is its most common form. It's "rectangular" because its special axes are perpendicular, like the sides of a rectangle.

## 2. Why it matters — real-world applications

The rectangular hyperbola $xy = c^2$ (or variations of it) appears in many fundamental laws and practical applications, making it crucial for understanding various phenomena.

1.  **Physics — Boyle's Law (Gas Pressure and Volume):** In thermodynamics, Boyle's Law states that for a fixed amount of gas at constant temperature, the pressure ($P$) of the gas is inversely proportional to its volume ($V$). This can be written as $PV = k$, where $k$ is a constant. If you plot pressure against volume, the resulting graph is a rectangular hyperbola. This relationship is critical in designing engines, understanding atmospheric phenomena, and chemical engineering processes. For example, understanding how pressure changes with volume is essential for companies like General Electric designing gas turbines or for chemical engineers optimizing reactor volumes.

2.  **Economics — Indifference Curves:** In microeconomics, an indifference curve represents all combinations of two goods (e.g., apples and bananas) that give a consumer the same level of satisfaction or "utility." For certain types of utility functions (specifically, Cobb-Douglas utility functions), these indifference curves take the shape of rectangular hyperbolas. For example, if a consumer gets utility $U = x \cdot y$, then all points $(x,y)$ such that $xy = k$ (for a constant $k$) represent the same utility level. Economists at institutions like the Federal Reserve or analysts at financial firms use these concepts to model consumer behavior, predict market trends, and inform policy decisions.

3.  **Optics and Engineering — Lens Design and Reflection:** While not always the primary form, the underlying principles of hyperbolic geometry are vital in optics. Hyperbolic mirrors are used in some telescopes (like Cassegrain telescopes) to correct spherical aberration and focus light efficiently. The reflection property of hyperbolas ensures that light rays aimed at one focus are reflected towards the other focus. This is a more general property of hyperbolas, and specific configurations can lead to rectangular hyperbolic relationships in their design parameters. Companies like Carl Zeiss or Nikon use advanced mathematical models involving conic sections to design high-performance lenses and optical systems.

4.  **Electrical Engineering — Power and Resistance:** In a simple DC circuit, if the voltage ($V$) across a resistor is kept constant, the relationship between current ($I$) and resistance ($R$) is given by Ohm's Law: $V = IR$. If we rearrange this to $I = V/R$, or $IR = V$, we see that for a constant voltage $V$, the product of current and resistance is constant. This describes a rectangular hyperbola in the $I-R$ plane. Understanding this relationship is fundamental for electrical engineers designing circuits, power grids, or components for companies like Intel or Siemens.

## 3. Prerequisites — what you must know first

Before diving deep into the rectangular hyperbola, ensure you have a solid grasp of these foundational concepts:

*   **Cartesian Coordinate System:** How to plot points $(x, y)$ on a 2D graph with $x$-axis and $y$-axis.
*   **Basic Algebra:** Manipulating equations, solving for variables, understanding positive and negative numbers.
*   **Functions and Graphs:** The concept of a function, how to interpret graphs, and basic graph sketching.
*   **Inverse Proportionality:** Understanding that when one quantity increases, another decreases proportionally, such that their product is constant (e.g., $y = k/x$ or $xy = k$).
*   **Asymptotes:** Lines that a curve approaches closer and closer but never touches as it tends towards infinity.
*   **Conic Sections (General Idea):** The basic idea that these curves (circles, ellipses, parabolas, hyperbolas) are formed by intersecting a cone with a plane. This gives context to why the rectangular hyperbola is part of this family.
*   **Symmetry:** Understanding reflectional symmetry (across an axis) and rotational symmetry (around a point).

## 4. The core idea — step by step

Let's build up our understanding of the rectangular hyperbola $xy = c^2$ step by step.

### Step 1: The Inverse Relationship

*   **Plain-English Statement:** The most fundamental idea is that $x$ and $y$ are inversely related. If one gets bigger, the other must get smaller to keep their product constant.
*   **Concrete Example:** Imagine you have $xy = 12$.
    *   If $x=1$, then $y=12$.
    *   If $x=2$, then $y=6$.
    *   If $x=3$, then $y=4$.
    *   If $x=4$, then $y=3$.
    *   If $x=6$, then $y=2$.
    *   If $x=12$, then $y=1$.
    Notice how $y$ decreases as $x$ increases.
*   **Formal/Mathematical Version:** Given the equation $xy = c^2$, where $c$ is a non-zero real constant. We can write $y = \frac{c^2}{x}$ or $x = \frac{c^2}{y}$. This clearly shows that $y$ is inversely proportional to $x$ (and $x$ to $y$).
*   **What Could Go Wrong:** Forgetting that $c^2$ is a constant. It's not a variable that changes; it's a fixed number for a specific hyperbola. Also, realizing that $c$ can be any non-zero real number. If $c=0$, then $xy=0$, which means either $x=0$ or $y=0$, representing the axes themselves, not a hyperbola.

### Step 2: Quadrants and Signs

*   **Plain-English Statement:** Because $x \cdot y$ must be a positive constant (since $c^2$ is always positive for any real $c \neq 0$), $x$ and $y$ must always have the same sign. This means the curve will only exist in two specific quadrants.
*   **Concrete Example:** Let $xy = 9$.
    *   If $x=3$, $y=3$ (both positive, Quadrant I).
    *   If $x=-3$, $y=-3$ (both negative, Quadrant III).
    *   Can we have $x=3, y=-3$? No, because $3 \times (-3) = -9 \neq 9$.
*   **Formal/Mathematical Version:** For $xy = c^2$, since $c^2 > 0$ (for $c \neq 0$), it implies that $x$ and $y$ must both be positive ($x>0, y>0$) or both be negative ($x<0, y<0$). This means the branches of the hyperbola lie entirely in the first and third quadrants.
    If the equation were $xy = -c^2$ (i.e., the product is a negative constant), then one variable would be positive and the other negative ($x>0, y<0$ or $x<0, y>0$), placing the branches in the second and fourth quadrants.
*   **What Could Go Wrong:** Confusing $c^2$ with $c$. $c^2$ is always positive (or zero), but $c$ itself can be positive or negative. The value of $c$ affects the "spread" of the hyperbola, but $c^2$ determines which quadrants it lies in. If $c$ were complex, then $c^2$ could be negative, but we are typically dealing with real numbers in this context.

### Step 3: Asymptotes

*   **Plain-English Statement:** As $x$ gets extremely large (either positive or negative), $y$ gets extremely close to zero, but never quite reaches it. Similarly, as $y$ gets extremely large, $x$ gets extremely close to zero. These "never-touch" lines are called asymptotes.
*   **Concrete Example:** Consider $xy = 4$.
    *   If $x=1000$, $y=4/1000 = 0.004$. Very close to zero.
    *   If $x=1000000$, $y=4/1000000 = 0.000004$. Even closer to zero.
    *   If $y=1000$, $x=4/1000 = 0.004$.
*   **Formal/Mathematical Version:** From $y = \frac{c^2}{x}$:
    *   As $x \to \infty$ (or $x \to -\infty$), $y \to 0$. This means the $x$-axis ($y=0$) is a horizontal asymptote.
    *   As $x \to 0^+$ (approaching zero from positive side), $y \to \infty$.
    *   As $x \to 0^-$ (approaching zero from negative side), $y \to -\infty$.
    This means the $y$-axis ($x=0$) is a vertical asymptote.
    The rectangular hyperbola $xy = c^2$ has the coordinate axes as its asymptotes.
*   **What Could Go Wrong:** Thinking the curve actually touches the axes. It gets infinitely close but never intersects them. This is a crucial characteristic of asymptotes.

### Step 4: Symmetry

*   **Plain-English Statement:** The curve is perfectly balanced. If you flip it over the line $y=x$, it looks the same. Also, if you spin it 180 degrees around the origin, it looks the same.
*   **Concrete Example:** For $xy=10$:
    *   Point $(2,5)$ is on the curve. If you swap $x$ and $y$, $(5,2)$ is also on the curve. This is symmetry about $y=x$.
    *   Point $(2,5)$ is on the curve. If you negate both coordinates, $(-2,-5)$ is also on the curve. This is symmetry about the origin.
*   **Formal/Mathematical Version:**
    1.  **Symmetry about the line $y=x$:** If $(x_0, y_0)$ is a point on the curve, then $x_0y_0 = c^2$. If we swap $x_0$ and $y_0$ to get $(y_0, x_0)$, then $y_0x_0 = c^2$ is also true. Thus, $(y_0, x_0)$ is also on the curve. This demonstrates symmetry about the line $y=x$.
    2.  **Symmetry about the origin (point symmetry):** If $(x_0, y_0)$ is a point on the curve, then $x_0y_0 = c^2$. If we consider the point $(-x_0, -y_0)$, then $(-x_0)(-y_0) = x_0y_0 = c^2$. Thus, $(-x_0, -y_0)$ is also on the curve. This demonstrates symmetry about the origin $(0,0)$.
*   **What Could Go Wrong:** Confusing symmetry about $y=x$ with symmetry about the $x$-axis or $y$-axis. The rectangular hyperbola $xy=c^2$ is *not* symmetric about the $x$-axis or $y$-axis unless $c=0$, which isn't a hyperbola.

### Step 5: The Constant $c^2$

*   **Plain-English Statement:** The value of $c^2$ determines how "spread out" the hyperbola is from the origin. A larger $c^2$ means the branches are further away from the origin.
*   **Concrete Example:**
    *   Compare $xy=1$ with $xy=9$.
    *   For $xy=1$, points like $(1,1)$ are on it.
    *   For $xy=9$, points like $(3,3)$ are on it. The point $(3,3)$ is further from the origin than $(1,1)$.
*   **Formal/Mathematical Version:** The distance from the origin $(0,0)$ to a point $(x,y)$ on the curve is $\sqrt{x^2+y^2}$. For $xy=c^2$, the closest points to the origin are where $x=y$. If $x=y$, then $x^2 = c^2$, so $x = \pm c$. The vertices are $(\pm c, \pm c)$. The distance from the origin to these vertices is $\sqrt{c^2+c^2} = \sqrt{2c^2} = |c|\sqrt{2}$. As $|c|$ increases, this distance increases, meaning the curve is further from the origin.
*   **What Could Go Wrong:** Thinking $c$ can be zero. If $c=0$, then $xy=0$, which means either $x=0$ (the $y$-axis) or $y=0$ (the $x$-axis). This is a degenerate hyperbola, not the standard curve we're studying. We always assume $c \neq 0$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Plotting and Identification

**Problem:** Sketch the graph of the equation $xy = 4$. Identify its asymptotes and determine if it has any points on the line $y=x$.

**Given:** The equation $xy = 4$.
**Want:** Sketch the graph, identify asymptotes, find points on $y=x$.

**Solution:**

1.  **Identify the form:**
    $$xy = 4$$
    This is in the form $xy = c^2$, where $c^2 = 4$.
    *This step connects the given equation to the general form of a rectangular hyperbola.*

2.  **Determine the quadrants:**
    Since $c^2 = 4 > 0$, the branches of the hyperbola will lie in the first and third quadrants.
    *This tells us where to expect the curve to appear on the graph.*

3.  **Identify the asymptotes:**
    For a rectangular hyperbola in the form $xy = c^2$, the coordinate axes are the asymptotes.
    Therefore, the vertical asymptote is $x=0$ (the $y$-axis).
    The horizontal asymptote is $y=0$ (the $x$-axis).
    *This defines the boundaries that the curve approaches but never touches.*

4.  **Find key points for plotting:**
    Let's pick some $x$ values and find corresponding $y$ values using $y = \frac{4}{x}$.
    *   If $x=1$, then $y = \frac{4}{1} = 4$. Point: $(1, 4)$.
    *   If $x=2$, then $y = \frac{4}{2} = 2$. Point: $(2, 2)$.
    *   If $x=4$, then $y = \frac{4}{4} = 1$. Point: $(4, 1)$.
    *   If $x=-1$, then $y = \frac{4}{-1} = -4$. Point: $(-1, -4)$.
    *   If $x=-2$, then $y = \frac{4}{-2} = -2$. Point: $(-2, -2)$.
    *   If $x=-4$, then $y = \frac{4}{-4} = -1$. Point: $(-4, -1)$.
    *We choose a range of values, including positive and negative, to see the curve's behavior.*

5.  **Determine points on the line $y=x$ (vertices):**
    To find points where the hyperbola intersects the line $y=x$, substitute $y=x$ into the equation $xy=4$.
    $$x(x) = 4$$
    $$x^2 = 4$$
    Take the square root of both sides:
    $$x = \pm \sqrt{4}$$
    $$x = \pm 2$$
    Since $y=x$, the corresponding $y$ values are:
    *   If $x=2$, then $y=2$. Point: $(2, 2)$.
    *   If $x=-2$, then $y=-2$. Point: $(-2, -2)$.
    These points are called the vertices of the hyperbola in this orientation.
    *This step finds the points closest to the origin on each branch, which are important for sketching.*

6.  **Sketch the graph:**
    (A detailed ASCII diagram will be provided in Section 8. For now, imagine plotting these points and drawing two smooth curves approaching the axes.)
    *This is the final visualization step, connecting all the calculated points and asymptotes.*

**Final Answer:**
The graph of $xy=4$ is a rectangular hyperbola with branches in Quadrants I and III.
Its asymptotes are the $x$-axis ($y=0$) and the $y$-axis ($x=0$).
It has two points on the line $y=x$: $\boxed{(2,2) \text{ and } (-2,-2)}$.

**Reflection:** This example was straightforward, primarily focused on applying the definitions of quadrants, asymptotes, and vertices directly from the $xy=c^2$ form. The trickiest part might be remembering to consider both positive and negative roots for $x^2=4$.

---

### Example 2: Finding the Equation from a Point

**Problem:** A rectangular hyperbola has the coordinate axes as its asymptotes and passes through the point $(3, -6)$. Find its equation.

**Given:** Asymptotes are $x=0$ and $y=0$. Passes through $(3, -6)$.
**Want:** The equation of the hyperbola.

**Solution:**

1.  **Identify the general form:**
    Since the coordinate axes are the asymptotes, the equation of the rectangular hyperbola must be in the form $xy = c^2$ or $xy = -c^2$.
    *This uses the knowledge of asymptotes to narrow down the possible equation forms.*

2.  **Use the given point to determine the constant:**
    The hyperbola passes through the point $(3, -6)$. Substitute $x=3$ and $y=-6$ into the general form.
    $$ (3)(-6) = -18 $$
    *This calculates the specific constant value for this hyperbola.*

3.  **Determine the correct form ($c^2$ or $-c^2$):**
    Since the product $xy$ is $-18$, which is a negative constant, the equation must be of the form $xy = -k$ where $k$ is a positive constant. In our standard notation, this means the equation is $xy = -c^2$, where $c^2=18$.
    *This step clarifies the sign of the constant and matches it to the standard notation.*

4.  **Write the final equation:**
    Substituting the calculated constant, the equation is:
    $$xy = -18$$
    *This is the final equation of the hyperbola.*

**Final Answer:** The equation of the rectangular hyperbola is $\boxed{xy = -18}$.

**Reflection:** This example highlights the importance of the sign of the constant. A negative constant means the branches are in Quadrants II and IV, consistent with the given point $(3, -6)$. If the point had been $(3, 6)$, the equation would have been $xy=18$.

---

### Example 3: Finding Intersections with a Line

**Problem:** Find the coordinates of the points where the rectangular hyperbola $xy = 12$ intersects the line $y = 3x - 6$.

**Given:** Hyperbola $xy = 12$ and line $y = 3x - 6$.
**Want:** The intersection points $(x,y)$.

**Solution:**

1.  **Set up a system of equations:**
    We have two equations:
    (1) $xy = 12$
    (2) $y = 3x - 6$
    To find the intersection points, we need to solve this system simultaneously.
    *This is the standard approach for finding where two curves meet.*

2.  **Substitute (2) into (1):**
    Substitute the expression for $y$ from equation (2) into equation (1).
    $$x(3x - 6) = 12$$
    *This eliminates one variable, leaving an equation in terms of a single variable.*

3.  **Solve the resulting quadratic equation for $x$:**
    Distribute $x$ on the left side:
    $$3x^2 - 6x = 12$$
    Move all terms to one side to form a standard quadratic equation $ax^2 + bx + c = 0$:
    $$3x^2 - 6x - 12 = 0$$
    Divide the entire equation by 3 to simplify:
    $$x^2 - 2x - 4 = 0$$
    This quadratic equation does not factor easily, so we use the quadratic formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.
    Here, $a=1$, $b=-2$, $c=-4$.
    $$x = \frac{-(-2) \pm \sqrt{(-2)^2 - 4(1)(-4)}}{2(1)}$$
    $$x = \frac{2 \pm \sqrt{4 + 16}}{2}$$
    $$x = \frac{2 \pm \sqrt{20}}{2}$$
    Simplify the square root: $\sqrt{20} = \sqrt{4 \times 5} = 2\sqrt{5}$.
    $$x = \frac{2 \pm 2\sqrt{5}}{2}$$
    Divide both terms in the numerator by 2:
    $$x = 1 \pm \sqrt{5}$$
    So, we have two possible $x$ values:
    $x_1 = 1 + \sqrt{5}$
    $x_2 = 1 - \sqrt{5}$
    *This is the core algebraic step, solving for the $x$-coordinates of the intersection points.*

4.  **Find the corresponding $y$ values using equation (2):**
    For $x_1 = 1 + \sqrt{5}$:
    $$y_1 = 3(1 + \sqrt{5}) - 6$$
    $$y_1 = 3 + 3\sqrt{5} - 6$$
    $$y_1 = 3\sqrt{5} - 3$$
    For $x_2 = 1 - \sqrt{5}$:
    $$y_2 = 3(1 - \sqrt{5}) - 6$$
    $$y_2 = 3 - 3\sqrt{5} - 6$$
    $$y_2 = -3 - 3\sqrt{5}$$
    *We use the simpler linear equation to find $y$ values, as it's less prone to errors than using the hyperbola equation with potentially irrational denominators.*

**Final Answer:** The points of intersection are $\boxed{(1+\sqrt{5}, 3\sqrt{5}-3) \text{ and } (1-\sqrt{5}, -3-3\sqrt{5})}$.

**Reflection:** This example was harder due to the irrational roots from the quadratic formula. It tests algebraic manipulation skills, especially with simplifying square roots. It also shows that intersection points don't always have "nice" integer coordinates.

---

### Example 4: Transformation of Axes (Advanced)

**Problem:** The equation of a curve is given by $xy - 2x - 3y - 4 = 0$. Show that this equation represents a rectangular hyperbola by transforming the coordinate system to new axes $X$ and $Y$ where $x = X+h$ and $y = Y+k$. Find the values of $h$ and $k$ and the equation of the hyperbola in terms of $X$ and $Y$.

**Given:** Equation $xy - 2x - 3y - 4 = 0$.
**Want:** To show it's a rectangular hyperbola, find $h, k$, and the transformed equation.

**Solution:**

1.  **Substitute the transformation equations:**
    We are given $x = X+h$ and $y = Y+k$. Substitute these into the original equation:
    $$(X+h)(Y+k) - 2(X+h) - 3(Y+k) - 4 = 0$$
    *This is the first step in translating the origin to $(h,k)$.*

2.  **Expand and group terms:**
    Expand the product $(X+h)(Y+k)$:
    $$XY + Xk + Yh + hk - 2X - 2h - 3Y - 3k - 4 = 0$$
    Now, group terms by $XY$, $X$, $Y$, and constant terms:
    $$XY + (k-2)X + (h-3)Y + (hk - 2h - 3k - 4) = 0$$
    *Careful algebraic expansion and grouping are crucial here to avoid errors.*

3.  **Eliminate the $X$ and $Y$ terms:**
    For the transformed equation to be in the standard rectangular hyperbola form $XY = C'$, we need the coefficients of $X$ and $Y$ to be zero.
    Set the coefficient of $X$ to zero:
    $$k-2 = 0 \implies k = 2$$
    Set the coefficient of $Y$ to zero:
    $$h-3 = 0 \implies h = 3$$
    *This is the key step: choosing $h$ and $k$ such that the linear terms vanish, which means the new origin $(h,k)$ is the center of the hyperbola.*

4.  **Calculate the new constant term:**
    Substitute $h=3$ and $k=2$ into the constant term:
    $$hk - 2h - 3k - 4$$
    $$(3)(2) - 2(3) - 3(2) - 4$$
    $$6 - 6 - 6 - 4$$
    $$-10$$
    *This determines the constant that will appear on the right side of the transformed equation.*

5.  **Write the transformed equation:**
    Substitute $k-2=0$, $h-3=0$, and the calculated constant term back into the grouped equation:
    $$XY + (0)X + (0)Y + (-10) = 0$$
    $$XY - 10 = 0$$
    $$XY = 10$$
    *This is the equation in the new coordinate system, clearly showing it is a rectangular hyperbola.*

**Final Answer:**
The values are $\boxed{h=3}$ and $\boxed{k=2}$.
The transformed equation is $\boxed{XY=10}$.
This shows that the original equation represents a rectangular hyperbola centered at $(3,2)$ in the original $(x,y)$ coordinate system.

**Reflection:** This example is significantly harder as it involves a transformation of coordinates. It demonstrates that not all rectangular hyperbolas are centered at the origin. The key insight is to eliminate the linear terms ($X$ and $Y$) by choosing appropriate $h$ and $k$, effectively shifting the origin to the center of the hyperbola. This process is common for identifying and simplifying equations of conic sections.

## 6. Common mistakes and traps

1.  **Assuming $c$ is always positive:** While $c^2$ is always positive (for a non-degenerate hyperbola), $c$ itself can be positive or negative. The equation $xy = c^2$ means the product is positive, placing branches in Quadrants I and III. An equation like $xy = -9$ is still a rectangular hyperbola, but its branches are in Quadrants II and IV. Students sometimes incorrectly assume all $xy=k$ forms are $xy=c^2$ with $c>0$.
2.  **Confusing asymptotes with axes:** While the coordinate axes ($x=0, y=0$) *are* the asymptotes for $xy=c^2$, students might think this is true for *all* hyperbolas. For a translated hyperbola like $(x-h)(y-k)=c^2$, the asymptotes are $x=h$ and $y=k$.
3.  **Forgetting $x \neq 0$ and $y \neq 0$:** Because $y = c^2/x$ and $x = c^2/y$, neither $x$ nor $y$ can ever be zero. This means the curve never actually touches the asymptotes.
4.  **Incorrectly simplifying square roots:** When solving for vertices or intersections, students might make errors like $\sqrt{x^2}=x$ (forgetting $\pm$) or $\sqrt{A+B} = \sqrt{A}+\sqrt{B}$ (which is incorrect).
5.  **Not recognizing translated forms:** An equation like $xy - 2x + 3y - 6 = 0$ might not immediately look like a hyperbola. Students need to be able to complete the "factoring" by grouping (e.g., $(x+3)(y-2) = 0$) or use the transformation method as shown in Example 4.
6.  **Mistaking it for a parabola or ellipse:** While all are conic sections, their equations and shapes are distinct. The $xy$ term is characteristic of a rotated conic, and the inverse relationship is unique to the hyperbola.

## 7. Textbook-precise explanation

A **rectangular hyperbola** is a specific type of hyperbola whose asymptotes are perpendicular. When its asymptotes are chosen as the coordinate axes, its equation takes the simplest form.

**Definition:** A rectangular hyperbola is a curve defined by the equation
$$xy = c^2$$
where $c$ is a non-zero real constant.

**Properties:**

1.  **Asymptotes:** The lines $x=0$ (the $y$-axis) and $y=0$ (the $x$-axis) are the asymptotes of the hyperbola. This can be seen by rewriting the equation as $y = \frac{c^2}{x}$. As $|x| \to \infty$, $y \to 0$. As $x \to 0$, $|y| \to \infty$.
2.  **Quadrants:**
    *   If $c^2 > 0$ (i.e., $c \neq 0$), then $x$ and $y$ must have the same sign. The branches of the hyperbola lie in the first quadrant ($x>0, y>0$) and the third quadrant ($x<0, y<0$).
    *   If the equation is $xy = -c^2$ (where $c^2 > 0$), then $x$ and $y$ must have opposite signs. The branches lie in the second quadrant ($x<0, y>0$) and the fourth quadrant ($x>0, y<0$).
3.  **Vertices:** The points closest to the origin on the branches are called the vertices. These occur where $x=y$ (for $xy=c^2$) or $x=-y$ (for $xy=-c^2$).
    *   For $xy=c^2$, substituting $y=x$ yields $x^2=c^2$, so $x = \pm c$. The vertices are $(c,c)$ and $(-c,-c)$.
    *   For $xy=-c^2$, substituting $y=-x$ yields $-x^2=-c^2$, so $x^2=c^2$, $x = \pm c$. The vertices are $(-c,c)$ and $(c,-c)$.
4.  **Symmetry:**
    *   **About the origin:** The hyperbola is symmetric about the origin $(0,0)$. If $(x,y)$ is on the curve, then $(-x,-y)$ is also on the curve.
    *   **About the line $y=x$:** For $xy=c^2$, if $(x,y)$ is on the curve, then $(y,x)$ is also on the curve.
    *   **About the line $y=-x$:** For $xy=-c^2$, if $(x,y)$ is on the curve, then $(-y,-x)$ is also on the curve.
5.  **Semi-transverse axis:** The distance from the origin to a vertex is $|c|\sqrt{2}$. This is the semi-transverse axis length for the hyperbola in this orientation.
6.  **Eccentricity:** A hyperbola is generally defined by $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$. A rectangular hyperbola is one where $a=b$. Its eccentricity $e = \sqrt{1 + \frac{b^2}{a^2}}$ simplifies to $e = \sqrt{1+1} = \sqrt{2}$. This is a defining characteristic of a rectangular hyperbola.
7.  **Rotation:** The equation $xy=c^2$ can be obtained by rotating the standard hyperbola equation $\frac{X^2}{a^2} - \frac{Y^2}{a^2} = 1$ (where $a^2=c^2/2$) by $45^\circ$.
    (Reference: Stewart, Calculus, 9e, Chapter 10.5, "Conic Sections in Polar Coordinates" or any advanced Analytic Geometry textbook.)

## 8. ASCII diagrams

Here's a representation of the rectangular hyperbola $xy=4$. The axes are the asymptotes.

```text
       ^ y
       |
       |
       |
   .   |   .
    \  |  /
     \ | /
      \|/
-------+-------------------> x
      /|\
     / | \
    /  |  \
   '   |   '
       |
       |
       |

Key Points for xy=4:
(1,4)
(2,2) -- Vertex
(4,1)
(-1,-4)
(-2,-2) -- Vertex
(-4,-1)

Description of the figure:
The diagram shows a Cartesian coordinate system with the x-axis and y-axis.
Two smooth, symmetrical curves are drawn:
1.  One curve is in the first quadrant (x>0, y>0). It starts from near the positive y-axis, curves downwards and to the right, passing through points like (1,4), (2,2), and (4,1). It approaches the positive x-axis as x increases, and approaches the positive y-axis as x approaches 0.
2.  The second curve is in the third quadrant (x<0, y<0). It is a mirror image of the first curve, reflected through the origin. It starts from near the negative y-axis, curves upwards and to the left, passing through points like (-1,-4), (-2,-2), and (-4,-1). It approaches the negative x-axis as x becomes more negative, and approaches the negative y-axis as x approaches 0 from the negative side.
The x-axis and y-axis are explicitly labeled as asymptotes, meaning the curves get infinitely close to them but never touch.
The points (2,2) and (-2,-2) are marked as vertices, representing the points on each branch closest to the origin.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:** Think of an "X" mark, like a cross, for the $x$ and $y$ axes. Now, imagine putting "bows" or "boomerangs" in the opposite corners (quadrants) of this "X". The "bows" are the curves, and the "X" reminds you of the $xy$ in the equation and that the axes are the asymptotes. For $xy=c^2$ (positive $c^2$), the bows are in the "top-right" and "bottom-left" quadrants. For $xy=-c^2$ (negative $c^2$), the bows are in the "top-left" and "bottom-right" quadrants.

2.  **Formulas/Facts to Overlearn:**
    *   The equation: $xy = c^2$ (or $xy = -c^2$)
    *   Asymptotes: $x=0$ and $y=0$ (for the standard form)
    *   Vertices (closest points to origin): $(c,c)$ and $(-c,-c)$ for $xy=c^2$.

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson:
        *   **1 Day** after initial study.
        *   **3 Days** after the first review.
        *   **7 Days** after the second review.
        *   **16 Days** after the third review.
        *   **35 Days** after the fourth review.
    *   During each review, try to recall the key properties and sketch a graph from memory before looking at your notes.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the properties of $xy=c^2$, you can always rebuild them from the core idea:
    *   **Start with $xy = c^2$.**
    *   **Asymptotes:** Rearrange to $y = c^2/x$. What happens if $x \to 0$? $y \to \pm \infty$. What happens if $x \to \pm \infty$? $y \to 0$. This immediately tells you $x=0$ and $y=0$ are asymptotes.
    *   **Quadrants:** Since $c^2$ must be positive (for a hyperbola), $x$ and $y$ must have the same sign. This means Quadrants I and III. If it was $xy=-c^2$, then $x$ and $y$ must have opposite signs, leading to Quadrants II and IV.
    *   **Vertices:** These are the points closest to the origin. Due to symmetry, these must lie on the line $y=x$ (or $y=-x$). Substitute $y=x$ into $xy=c^2 \implies x^2=c^2 \implies x=\pm c$. So vertices are $(c,c)$ and $(-c,-c)$.

## 10. Connections — what this leads to

Understanding the rectangular hyperbola $xy=c^2$ is a stepping stone to several more advanced mathematical and scientific concepts:

1.  **General Hyperbolas:** This is a special case of the general hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$. The rectangular hyperbola is when $a=b$. This understanding helps in grasping the more complex properties of general hyperbolas, including their foci, directrices, and general equations.
2.  **Rotation of Axes:** The equation $xy=c^2$ is a standard hyperbola that has been rotated by $45^\circ$. This introduces the general concept of rotation of axes in coordinate geometry, where the term $Bxy$ in the general quadratic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$ indicates a rotated conic section.
3.  **Calculus — Derivatives and Integrals:** You'll encounter functions like $y=k/x$ (which is $xy=k$) frequently in calculus.
    *   Finding the derivative $\frac{dy}{dx} = -\frac{k}{x^2}$ helps understand rates of change for inversely proportional quantities.
    *   Integrating $\int \frac{1}{x} dx = \ln|x| + C$ is fundamental, and the graph of $y=1/x$ is a rectangular hyperbola.
4.  **Complex Numbers and Conformal Mapping:** In complex analysis, the transformation $w = 1/z$ maps circles and lines to other circles and lines, but it also relates to hyperbolic geometry. The real and imaginary parts of $w$ can form rectangular hyperbolas.
5.  **Inverse Functions and Reciprocal Graphs:** The function $y=k/x$ is a reciprocal function. Understanding its graph and properties is fundamental to understanding inverse functions in general and their graphical representations.
6.  **Rational Functions:** The rectangular hyperbola is the graph of the simplest non-linear rational function $y = \frac{k}{x}$. This extends to more complex rational functions with multiple asymptotes and more intricate behaviors.
7.  **Special Relativity:** While not directly $xy=c^2$, the spacetime interval in special relativity $s^2 = c^2t^2 - x^2$ is related to hyperbolic geometry. The Lorentz transformations, which describe how measurements of space and time change for observers in relative motion, are essentially hyperbolic rotations. Curves of constant spacetime interval are hyperbolas in spacetime diagrams.
8.  **Projective Geometry:** Conic sections, including hyperbolas, are fundamental objects in projective geometry, where they are seen as projections of a circle. This provides a deeper, more abstract understanding of their properties.

## 11. Self-check questions

1.  Describe, in your own words, why the branches of $xy=16$ lie in Quadrants I and III, while the branches of $xy=-25$ lie in Quadrants II and IV.
2.  A curve has the equation $(x-1)(y+2) = 9$. What are its asymptotes? What are the coordinates of its vertices?
3.  Find the equation of the rectangular hyperbola that passes through the point $(-4, 1)$ and has the coordinate axes as its asymptotes.
4.  The line $y = x+1$ intersects the rectangular hyperbola $xy=6$. Find the coordinates of the intersection points.
5.  Consider the equation $3xy - 6x + 9y - 12 = 0$. Show that this is a rectangular hyperbola by rewriting it in the form $(x-h)(y-k)=C$. Identify the center $(h,k)$ and the constant $C$.