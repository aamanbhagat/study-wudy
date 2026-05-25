## 1. What it is — in plain English

Imagine you have a machine that takes in a single number, say `x`, and spits out another number, `y`. This is what you're used to from single-variable calculus: $y = f(x)$. For example, if $f(x) = x^2$, you put in `2`, and you get out `4`. You can draw a picture of this relationship on a flat piece of paper (a 2D graph).

Now, what if your machine is a bit more complicated? What if it needs *two* numbers as input to give you one output? Let's say it takes `x` and `y` and gives you `z`. This is a "function of several variables." For instance, $z = f(x,y) = x^2 + y^2$. You put in `x=1` and `y=2`, and you get `z = 1^2 + 2^2 = 5`. Since you have three numbers involved ($x, y, z$), you'd need a 3D space to draw a picture of this relationship – it would look like a surface.

We can extend this idea even further. What if you have a function that takes *three* input numbers, say `x`, `y`, and `z`, and gives you one output number, `w`? For example, $w = f(x,y,z) = x^2 + y^2 + z^2$. You put in `x=1, y=2, z=3`, and you get `w = 1^2 + 2^2 + 3^2 = 14`. Now, here's the trick: we can't easily draw a direct "graph" of this function because we'd need four dimensions (one for each input, plus one for the output).

To understand these higher-dimensional functions, we use a clever trick called "level curves" and "level surfaces." Think of them like slices. For a 3D graph (like $z=f(x,y)$), a level curve is what you get if you slice the surface horizontally at a specific height, `z=k`, and then look at that slice from above. For a function with three inputs ($w=f(x,y,z)$), a "level surface" is what you get if you imagine slicing its invisible 4D graph at a constant output value, `w=k`. This slice is a 3D object that we *can* visualize. These "slices" help us understand the shape and behavior of functions in higher dimensions.

## 2. Why it matters — real-world applications

Functions of several variables are not just abstract mathematical constructs; they are fundamental to describing and understanding the world around us. They allow us to model phenomena where an outcome depends on multiple interacting factors.

1.  **Meteorology and Environmental Science (Level Curves):** Weather maps frequently use *isobars* (lines of constant atmospheric pressure) and *isotherms* (lines of constant temperature). These are direct examples of level curves. If atmospheric pressure is a function of latitude and longitude, $P(lat, long)$, then an isobar is a curve where $P(lat, long) = k$ for some constant $k$. Similarly, *isohyets* show constant rainfall, and *isobaths* show constant water depth. Predicting weather patterns, understanding climate change, or mapping ocean floors relies heavily on interpreting these multi-variable functions and their level curves.

2.  **Aerospace Engineering and Fluid Dynamics (Level Surfaces):** When designing aircraft, engineers need to understand properties like air density, pressure, and temperature around the plane's wing or fuselage. These properties are functions of three spatial coordinates, e.g., $P(x,y,z)$ for pressure. A *level surface* of pressure, $P(x,y,z) = k$, would represent all points in 3D space where the pressure is the same. Visualizing these level surfaces helps engineers identify regions of high or low pressure, which are critical for calculating lift, drag, and optimizing aerodynamic efficiency. Computational Fluid Dynamics (CFD) simulations extensively use these concepts.

3.  **Machine Learning and Optimization (Graphs and Level Curves):** In machine learning, particularly in training models, we often define a "cost function" or "loss function" that measures how well a model is performing. This function typically depends on multiple parameters (weights and biases) of the model. For a simple model with two parameters, say $\theta_0$ and $\theta_1$, the cost function $J(\theta_0, \theta_1)$ can be visualized as a 3D surface (a graph). The goal of training is to find the values of $\theta_0$ and $\theta_1$ that minimize this cost function, which corresponds to finding the lowest point on the surface. The *level curves* of this cost function (often called "contour plots" in ML) help visualize the landscape of the optimization problem, showing paths that algorithms like gradient descent might take to reach the minimum.

4.  **Physics and Electromagnetism (Level Surfaces):** In electromagnetism, the electric potential $V(x,y,z)$ is a function of three spatial variables. A *level surface* of this potential, where $V(x,y,z) = k$, is called an *equipotential surface*. These surfaces are crucial because they represent regions where a charged particle would have the same potential energy. Electric field lines are always perpendicular to equipotential surfaces. Understanding these surfaces is fundamental to designing circuits, analyzing capacitor behavior, and studying the behavior of charged particles in electric fields.

## 3. Prerequisites — what you must know first

Before diving deep into functions of several variables, ensure you have a solid grasp of these foundational concepts:

*   **Functions (single variable):** Understand what a function is ($y=f(x)$), its domain (input values), range (output values), and how to graph it in 2D Cartesian coordinates.
*   **Cartesian Coordinates:** Be comfortable with plotting points and understanding coordinate systems in both 2D ($x,y$) and 3D ($x,y,z$).
*   **Basic Algebra:** Proficiency in manipulating algebraic expressions, solving equations, and understanding inequalities, especially those involving square roots, logarithms, and fractions.
*   **Basic Geometry:** Familiarity with the equations and properties of common 2D shapes (lines, circles, parabolas, ellipses, hyperbolas) and 3D shapes (planes, spheres, cylinders, cones, paraboloids, ellipsoids).
*   **Limits and Continuity (single variable):** An intuitive understanding of what a limit is and what it means for a function to be continuous. This will help later when discussing domains and behavior of multivariable functions.

## 4. The core idea — step by step

Let's break down the concepts of functions of several variables, their graphs, level curves, and level surfaces.

### Step 1: Functions of Two Variables

*   **Plain English Statement:** A function of two variables is like a rule or a recipe that takes two input numbers (usually called $x$ and $y$) and processes them to produce a single output number (usually called $z$). Think of it as a machine with two input slots and one output slot.

*   **Small Concrete Example:** Consider the function $f(x,y) = x^2 + y^2$.
    *   If you input $x=1$ and $y=2$, the output is $z = f(1,2) = 1^2 + 2^2 = 1+4 = 5$.
    *   If you input $x=0$ and $y=0$, the output is $z = f(0,0) = 0^2 + 0^2 = 0$.
    *   If you input $x=3$ and $y=-1$, the output is $z = f(3,-1) = 3^2 + (-1)^2 = 9+1 = 10$.

*   **Formal/Mathematical Version:** A function $f$ of two variables is a rule that assigns to each ordered pair $(x,y)$ in a set $D$ (called the domain of $f$) a unique real number denoted by $f(x,y)$. The set $D$ is a subset of $\mathbb{R}^2$ (the $xy$-plane), and the range of $f$ is the set of all possible output values $f(x,y)$. We often write this as $z = f(x,y)$.
    $$f: D \subseteq \mathbb{R}^2 \to \mathbb{R}$$
    The domain $D$ is the set of all $(x,y)$ for which $f(x,y)$ is defined.

*   **What Could Go Wrong:** A common mistake is to confuse the domain, which is a region in the $xy$-plane (a 2D space), with the output, which is a single number. The function itself doesn't live in 2D; its *inputs* do. Another trap is forgetting that the domain might have restrictions (e.g., no square roots of negative numbers, no division by zero).

### Step 2: Graphs of Functions of Two Variables

*   **Plain English Statement:** Since we have two inputs ($x,y$) and one output ($z$), we can visualize the function as a 3D surface. Each point $(x,y)$ in the input plane corresponds to a height $z$ above or below that plane. Imagine a thin, stretched sheet or a landscape.

*   **Small Concrete Example:** Let's graph $f(x,y) = x^2 + y^2$.
    *   For $(0,0)$, $z=0$. This is the origin.
    *   For $(1,0)$, $z=1$. For $(0,1)$, $z=1$. For $(-1,0)$, $z=1$. For $(0,-1)$, $z=1$. These points form a circle of radius 1 at $z=1$.
    *   For $(2,0)$, $z=4$. For $(0,2)$, $z=4$. These points form a circle of radius 2 at $z=4$.
    *   Connecting these points, we see the shape is a bowl-like surface called a paraboloid, opening upwards from the origin.

*   **Formal/Mathematical Version:** The graph of a function $f$ of two variables is the set of all points $(x,y,z)$ in $\mathbb{R}^3$ such that $z = f(x,y)$ and $(x,y)$ is in the domain of $f$.
    $$\text{Graph}(f) = \{ (x,y,z) \in \mathbb{R}^3 \mid z = f(x,y), (x,y) \in D \}$$

*   **What Could Go Wrong:** The most significant "what could go wrong" here is attempting to graph functions of *more than two variables* directly in 3D space. If you have $f(x,y,z)$, you'd need four dimensions ($x,y,z$ for input, $w$ for output) to draw its graph, which is impossible for us to visualize directly. This is why level surfaces (next steps) become crucial.

### Step 3: Level Curves (Contour Maps)

*   **Plain English Statement:** A level curve is what you get when you slice the 3D graph of $z=f(x,y)$ with a horizontal plane, $z=k$ (where $k$ is a constant height). Then, you project that slice down onto the $xy$-plane. Think of contour lines on a topographic map: each line connects points of equal elevation.

*   **Small Concrete Example:** Let's find the level curves for $f(x,y) = x^2 + y^2$.
    We set $f(x,y) = k$ for various constant values of $k$.
    *   If $k=0$: $x^2 + y^2 = 0$. This is just the point $(0,0)$.
    *   If $k=1$: $x^2 + y^2 = 1$. This is a circle centered at the origin with radius 1.
    *   If $k=4$: $x^2 + y^2 = 4$. This is a circle centered at the origin with radius 2.
    *   If $k=-1$: $x^2 + y^2 = -1$. There are no real solutions, so no level curve for $k=-1$. This tells us the range of $f(x,y)$ must be $z \ge 0$.
    The collection of these circles for $k>0$ forms the level curves.

*   **Formal/Mathematical Version:** A level curve of a function $f(x,y)$ is the set of all points $(x,y)$ in the domain of $f$ such that $f(x,y) = k$ for some constant $k$.
    $$\text{Level Curve}(k) = \{ (x,y) \in D \mid f(x,y) = k \}$$
    Note that $k$ must be a value in the range of $f$.

*   **What Could Go Wrong:** A common mistake is confusing level curves with cross-sections. A cross-section is obtained by slicing the surface with a plane parallel to the $xz$-plane ($y=c$) or the $yz$-plane ($x=c$). These slices result in curves in the $xz$ or $yz$ plane, whereas level curves are always projected onto the $xy$-plane. Level curves are 2D objects that live in the domain of the function.

### Step 4: Functions of Three Variables

*   **Plain English Statement:** A function of three variables is a rule that takes three input numbers (usually called $x$, $y$, and $z$) and produces a single output number (often called $w$ or $u$). You can think of it as a property that varies throughout a 3D space, like temperature or density at every point in a room.

*   **Small Concrete Example:** Consider the function $f(x,y,z) = x^2 + y^2 + z^2$.
    *   If you input $x=1, y=2, z=3$, the output is $w = f(1,2,3) = 1^2 + 2^2 + 3^2 = 1+4+9 = 14$.
    *   If you input $x=0, y=0, z=0$, the output is $w = f(0,0,0) = 0$.
    *   This function represents the squared distance from the origin to the point $(x,y,z)$.

*   **Formal/Mathematical Version:** A function $f$ of three variables is a rule that assigns to each ordered triple $(x,y,z)$ in a set $D$ (the domain of $f$) a unique real number denoted by $f(x,y,z)$. The set $D$ is a subset of $\mathbb{R}^3$, and the range of $f$ is the set of all possible output values $f(x,y,z)$. We often write this as $w = f(x,y,z)$.
    $$f: D \subseteq \mathbb{R}^3 \to \mathbb{R}$$
    The domain $D$ is the set of all $(x,y,z)$ for which $f(x,y,z)$ is defined.

*   **What Could Go Wrong:** Again, the primary issue is visualization. We cannot graph $w=f(x,y,z)$ directly in our 3D world, as it would require a 4D space. We need a different technique to understand its behavior, which leads us to level surfaces.

### Step 5: Level Surfaces

*   **Plain English Statement:** Since we can't draw the 4D graph of $w=f(x,y,z)$, we use "level surfaces." These are like the 3D equivalent of level curves. Instead of slicing a 3D graph with a horizontal plane, we imagine slicing the invisible 4D graph with a "hyperplane" where the output $w$ is constant, $w=k$. The result of this slice is a 3D object (a surface) that we *can* visualize. It represents all points $(x,y,z)$ in space where the function's output value is the same.

*   **Small Concrete Example:** Let's find the level surfaces for $f(x,y,z) = x^2 + y^2 + z^2$.
    We set $f(x,y,z) = k$ for various constant values of $k$.
    *   If $k=0$: $x^2 + y^2 + z^2 = 0$. This is just the point $(0,0,0)$.
    *   If $k=1$: $x^2 + y^2 + z^2 = 1$. This is a sphere centered at the origin with radius 1.
    *   If $k=4$: $x^2 + y^2 + z^2 = 4$. This is a sphere centered at the origin with radius 2.
    *   If $k=-1$: $x^2 + y^2 + z^2 = -1$. No real solutions, so no level surface for $k=-1$.
    The collection of these spheres for $k \ge 0$ forms the level surfaces.

*   **Formal/Mathematical Version:** A level surface of a function $f(x,y,z)$ is the set of all points $(x,y,z)$ in the domain of $f$ such that $f(x,y,z) = k$ for some constant $k$.
    $$\text{Level Surface}(k) = \{ (x,y,z) \in D \mid f(x,y,z) = k \}$$
    Note that $k$ must be a value in the range of $f$.

*   **What Could Go Wrong:** The main trap is forgetting that level surfaces are 3D objects, not 2D curves. They are surfaces *in* 3D space, whereas level curves are curves *in* 2D space. Another pitfall is not considering the domain of the function when determining the possible values of $k$ (the range of $f$).

## 5. Worked examples — multiple, with every step shown

### Example 1: Graph and Level Curves of a Plane

**Problem:** For the function $f(x,y) = 6 - 2x - 3y$:
a) Determine the domain and range.
b) Sketch the graph of the function.
c) Sketch the level curves for $k=0, 6, 12$.

**a) Determine the domain and range.**

*   **What's given:** The function $f(x,y) = 6 - 2x - 3y$.
*   **What we want:** The domain (all valid input pairs $(x,y)$) and the range (all possible output values $z$).

1.  **Analyze the function:** The expression $6 - 2x - 3y$ involves only multiplication, subtraction, and constants.
    *   *Why this step works:* These operations are defined for all real numbers. There are no square roots of negative numbers, no denominators that could be zero, and no logarithms of non-positive numbers.
2.  **Determine the domain:** Since there are no restrictions on $x$ or $y$, any real numbers can be used as inputs.
    *   *Why this step works:* The function is a polynomial in two variables, which is defined everywhere.
    **Domain:** $D = \mathbb{R}^2$ or $\{ (x,y) \mid x \in \mathbb{R}, y \in \mathbb{R} \}$.
3.  **Determine the range:** As $x$ and $y$ can take any real values, the term $2x$ can be any real number, and $3y$ can be any real number. Their sum $2x+3y$ can also be any real number. Therefore, $6 - (2x+3y)$ can also be any real number.
    *   *Why this step works:* Linear functions of multiple variables, unless trivial (e.g., $f(x,y)=c$), typically have a range of all real numbers. We can make $2x+3y$ arbitrarily large positive or negative by choosing appropriate $x$ and $y$.
    **Range:** $R = \mathbb{R}$ or $\{ z \mid z \in \mathbb{R} \}$.

**b) Sketch the graph of the function.**

*   **What's given:** The function $z = f(x,y) = 6 - 2x - 3y$.
*   **What we want:** A 3D sketch of the surface defined by this equation.

1.  **Rewrite the equation:** The equation is $z = 6 - 2x - 3y$. We can rearrange it to $2x + 3y + z = 6$.
    *   *Why this step works:* This form is the standard equation of a plane in 3D space ($Ax + By + Cz = D$). Recognizing this immediately tells us the shape of the graph.
2.  **Find the intercepts:** To sketch a plane, finding its intercepts with the coordinate axes is often the easiest method.
    *   *x-intercept (set $y=0, z=0$):* $2x + 3(0) + 0 = 6 \implies 2x = 6 \implies x = 3$. Point: $(3,0,0)$.
    *   *y-intercept (set $x=0, z=0$):* $2(0) + 3y + 0 = 6 \implies 3y = 6 \implies y = 2$. Point: $(0,2,0)$.
    *   *z-intercept (set $x=0, y=0$):* $2(0) + 3(0) + z = 6 \implies z = 6$. Point: $(0,0,6)$.
    *   *Why this step works:* Intercepts are points where the surface crosses the axes, providing key reference points for sketching.
3.  **Sketch the plane:** Plot the three intercept points and connect them with lines to form a triangle in the first octant. This triangle represents a portion of the plane.
    *   *Why this step works:* Three non-collinear points uniquely define a plane. The triangle gives a visual representation of the plane's orientation.

    ```text
          z
          ^
          |
          |  (0,0,6)
          |  /
          | /
          |/
          +---------> y
         /|  (0,2,0)
        / |
       /  |
      (3,0,0)
     x
    ```
    **(This is a rough ASCII representation. Imagine a plane passing through these three points.)**

**c) Sketch the level curves for $k=0, 6, 12$.**

*   **What's given:** The function $f(x,y) = 6 - 2x - 3y$ and specific values for $k$.
*   **What we want:** The equations of the level curves and a sketch of them in the $xy$-plane.

1.  **Set $f(x,y) = k$ for each value of $k$:**
    *   *Why this step works:* This is the definition of a level curve.
    *   **For $k=0$**:
        $$6 - 2x - 3y = 0$$
        $$2x + 3y = 6$$
        This is the equation of a line. We can find its intercepts: if $x=0, 3y=6 \implies y=2$. If $y=0, 2x=6 \implies x=3$. So, it passes through $(0,2)$ and $(3,0)$.
    *   **For $k=6$**:
        $$6 - 2x - 3y = 6$$
        $$-2x - 3y = 0$$
        $$2x + 3y = 0$$
        This is also a line. It passes through $(0,0)$. If $x=3, 3y=-6 \implies y=-2$. So, it passes through $(0,0)$ and $(3,-2)$.
    *   **For $k=12$**:
        $$6 - 2x - 3y = 12$$
        $$-2x - 3y = 6$$
        $$2x + 3y = -6$$
        This is a line. If $x=0, 3y=-6 \implies y=-2$. If $y=0, 2x=-6 \implies x=-3$. So, it passes through $(0,-2)$ and $(-3,0)$.
2.  **Sketch the lines in the $xy$-plane:**
    *   *Why this step works:* Plotting these lines shows the "contour map" of the function.

    ```text
          ^ y
          |
        2 +---x---- (k=0)
          |  /
          | /
          |/
    -3----+----+---x---> x
          |\   3
          | \
        -2+--x------- (k=12)
          | (k=6, passes through origin)
    ```
    **(The lines are parallel to each other. The line $2x+3y=0$ passes through the origin. The line $2x+3y=6$ passes through $(3,0)$ and $(0,2)$. The line $2x+3y=-6$ passes through $(-3,0)$ and $(0,-2)$.)**

**Reflection:** This example demonstrates that for linear functions of two variables, the graph is a plane, and the level curves are a family of parallel lines. The spacing of the lines indicates the steepness of the plane; closer lines mean a steeper slope.

---

### Example 2: Domain, Graph, and Level Curves of a Hemisphere

**Problem:** For the function $f(x,y) = \sqrt{9 - x^2 - y^2}$:
a) Determine the domain and range.
b) Sketch the graph of the function.
c) Sketch the level curves for $k=0, 1, 2, 3$.

**a) Determine the domain and range.**

*   **What's given:** The function $f(x,y) = \sqrt{9 - x^2 - y^2}$.
*   **What we want:** The domain and range.

1.  **Analyze the square root:** For $\sqrt{A}$ to be a real number, $A$ must be non-negative.
    *   *Why this step works:* This is a fundamental property of real numbers and square roots.
2.  **Set up the domain condition:** We need $9 - x^2 - y^2 \ge 0$.
    *   *Why this step works:* This ensures the expression under the square root is valid.
3.  **Rearrange the inequality:**
    $$9 \ge x^2 + y^2$$
    $$x^2 + y^2 \le 9$$
    *   *Why this step works:* This form is recognizable as the equation of a circle.
4.  **Describe the domain:** The domain is the set of all points $(x,y)$ such that $x^2 + y^2 \le 9$. This represents the interior and boundary of a circle centered at the origin with radius 3.
    **Domain:** $D = \{ (x,y) \in \mathbb{R}^2 \mid x^2 + y^2 \le 9 \}$.
5.  **Determine the range:**
    *   Since $x^2 + y^2 \ge 0$, the maximum value of $9 - x^2 - y^2$ occurs when $x^2+y^2$ is at its minimum, which is 0 (at the origin).
    *   So, max value of $\sqrt{9 - x^2 - y^2}$ is $\sqrt{9 - 0} = \sqrt{9} = 3$.
    *   The minimum value of $9 - x^2 - y^2$ occurs when $x^2+y^2$ is at its maximum, which is 9 (on the boundary $x^2+y^2=9$).
    *   So, min value of $\sqrt{9 - x^2 - y^2}$ is $\sqrt{9 - 9} = \sqrt{0} = 0$.
    *   *Why this step works:* The range of $\sqrt{u}$ for $u \ge 0$ is $[0, \infty)$. We need to find the range of $u = 9 - x^2 - y^2$ over the domain $x^2+y^2 \le 9$. The smallest value of $x^2+y^2$ is 0, giving $u=9$. The largest value of $x^2+y^2$ is 9, giving $u=0$. So $u$ ranges from 0 to 9. Therefore, $\sqrt{u}$ ranges from $\sqrt{0}=0$ to $\sqrt{9}=3$.
    **Range:** $R = [0, 3]$ or $\{ z \mid 0 \le z \le 3 \}$.

**b) Sketch the graph of the function.**

*   **What's given:** The function $z = \sqrt{9 - x^2 - y^2}$.
*   **What we want:** A 3D sketch of the surface.

1.  **Square both sides:** $z^2 = 9 - x^2 - y^2$.
    *   *Why this step works:* Squaring helps to eliminate the square root and reveal a more familiar geometric equation.
2.  **Rearrange the terms:** $x^2 + y^2 + z^2 = 9$.
    *   *Why this step works:* This is the standard equation of a sphere centered at the origin.
3.  **Consider the original function's restriction:** Since $z = \sqrt{9 - x^2 - y^2}$, by definition of the square root, $z$ must be non-negative ($z \ge 0$).
    *   *Why this step works:* Squaring an equation can introduce extraneous solutions. We must always refer back to the original function to ensure our graph accurately reflects its properties.
4.  **Describe the graph:** The equation $x^2 + y^2 + z^2 = 9$ describes a sphere of radius 3 centered at the origin. The condition $z \ge 0$ means we only consider the upper half of this sphere.
    **Graph:** The graph is the upper hemisphere of a sphere with radius 3 centered at the origin.

**c) Sketch the level curves for $k=0, 1, 2, 3$.**

*   **What's given:** The function $f(x,y) = \sqrt{9 - x^2 - y^2}$ and specific $k$ values.
*   **What we want:** The equations of the level curves and a sketch in the $xy$-plane.

1.  **Set $f(x,y) = k$ for each value of $k$:**
    *   *Why this step works:* This is the definition of a level curve.
    *   **For $k=0$**:
        $$\sqrt{9 - x^2 - y^2} = 0$$
        $$9 - x^2 - y^2 = 0$$
        $$x^2 + y^2 = 9$$
        This is a circle centered at the origin with radius 3.
    *   **For $k=1$**:
        $$\sqrt{9 - x^2 - y^2} = 1$$
        $$9 - x^2 - y^2 = 1^2$$
        $$9 - x^2 - y^2 = 1$$
        $$x^2 + y^2 = 8$$
        This is a circle centered at the origin with radius $\sqrt{8} = 2\sqrt{2} \approx 2.83$.
    *   **For $k=2$**:
        $$\sqrt{9 - x^2 - y^2} = 2$$
        $$9 - x^2 - y^2 = 2^2$$
        $$9 - x^2 - y^2 = 4$$
        $$x^2 + y^2 = 5$$
        This is a circle centered at the origin with radius $\sqrt{5} \approx 2.24$.
    *   **For $k=3$**:
        $$\sqrt{9 - x^2 - y^2} = 3$$
        $$9 - x^2 - y^2 = 3^2$$
        $$9 - x^2 - y^2 = 9$$
        $$x^2 + y^2 = 0$$
        This is just the point $(0,0)$.
2.  **Sketch the circles in the $xy$-plane:**
    *   *Why this step works:* Plotting these concentric circles shows the "contour map."

    ```text
          ^ y
          |
          |   (k=0, r=3)
          |  /  (k=1, r=sqrt(8))
          | /   (k=2, r=sqrt(5))
          |/    (k=3, r=0)
    ------+------> x
          |
          |
    ```
    **(Concentric circles centered at the origin. The outermost circle has radius 3 ($k=0$), then radius $\sqrt{8}$ ($k=1$), then radius $\sqrt{5}$ ($k=2$), and finally a single point at the origin ($k=3$).)**

**Reflection:** This example highlights how domain restrictions are crucial. The range of $k$ values for level curves must be within the function's range. The level curves are concentric circles, showing a "hill" shape where the peak is at $z=3$ (the origin of the $xy$-plane) and the base is at $z=0$ (the circle $x^2+y^2=9$). The circles get closer together as $k$ decreases, indicating the surface is getting steeper towards the base.

---

### Example 3: Level Surfaces of a Paraboloid

**Problem:** For the function $f(x,y,z) = x^2 + y^2 - z$:
a) Determine the domain and range.
b) Describe the level surfaces for $k=-1, 0, 1$.

**a) Determine the domain and range.**

*   **What's given:** The function $f(x,y,z) = x^2 + y^2 - z$.
*   **What we want:** The domain and range.

1.  **Analyze the function:** The expression $x^2 + y^2 - z$ involves only squaring, addition, and subtraction.
    *   *Why this step works:* These operations are defined for all real numbers.
2.  **Determine the domain:** Since there are no restrictions on $x, y,$ or $z$, any real numbers can be used as inputs.
    **Domain:** $D = \mathbb{R}^3$ or $\{ (x,y,z) \mid x,y,z \in \mathbb{R} \}$.
3.  **Determine the range:**
    *   The term $x^2+y^2$ can be any non-negative real number (minimum 0).
    *   The term $-z$ can be any real number (positive, negative, or zero).
    *   Therefore, their sum $x^2+y^2-z$ can be any real number. For example, to get a very large positive value, make $x$ large and $z$ small. To get a very large negative value, make $z$ large and $x,y$ small.
    *   *Why this step works:* We can choose $(x,y,z)$ values that make the output arbitrarily large or small, covering all real numbers.
    **Range:** $R = \mathbb{R}$ or $\{ w \mid w \in \mathbb{R} \}$.

**b) Describe the level surfaces for $k=-1, 0, 1$.**

*   **What's given:** The function $f(x,y,z) = x^2 + y^2 - z$ and specific $k$ values.
*   **What we want:** The equations of the level surfaces and a description of their geometric shape.

1.  **Set $f(x,y,z) = k$ for each value of $k$:**
    *   *Why this step works:* This is the definition of a level surface.
    *   **For $k=-1$**:
        $$x^2 + y^2 - z = -1$$
        $$z = x^2 + y^2 + 1$$
        This is the equation of a paraboloid that opens upwards along the $z$-axis, with its vertex at $(0,0,1)$.
    *   **For $k=0$**:
        $$x^2 + y^2 - z = 0$$
        $$z = x^2 + y^2$$
        This is the equation of a paraboloid that opens upwards along the $z$-axis, with its vertex at the origin $(0,0,0)$.
    *   **For $k=1$**:
        $$x^2 + y^2 - z = 1$$
        $$z = x^2 + y^2 - 1$$
        This is the equation of a paraboloid that opens upwards along the $z$-axis, with its vertex at $(0,0,-1)$.
2.  **Describe the family of surfaces:** The level surfaces are a family of paraboloids opening upwards along the $z$-axis. As $k$ increases, the vertex of the paraboloid shifts downwards along the $z$-axis.
    *   *Why this step works:* Recognizing the standard forms of quadric surfaces is key to describing them geometrically.

**Reflection:** This example shows that level surfaces can be shifted versions of the same basic shape. The value of $k$ acts as a vertical shift for these paraboloids. This helps visualize how the "output value" $w$ changes as we move through 3D space.

---

### Example 4: Domain and Level Surfaces of a Logarithmic Function

**Problem:** For the function $f(x,y,z) = \ln(x^2+y^2+z^2-1)$:
a) Determine the domain.
b) Describe the level surfaces for $k=0, 1, \ln(3)$.

**a) Determine the domain.**

*   **What's given:** The function $f(x,y,z) = \ln(x^2+y^2+z^2-1)$.
*   **What we want:** The domain.

1.  **Analyze the logarithm:** For $\ln(A)$ to be defined, $A$ must be strictly positive ($A > 0$).
    *   *Why this step works:* This is a fundamental property of the natural logarithm function.
2.  **Set up the domain condition:** We need $x^2+y^2+z^2-1 > 0$.
    *   *Why this step works:* This ensures the argument of the logarithm is valid.
3.  **Rearrange the inequality:**
    $$x^2+y^2+z^2 > 1$$
    *   *Why this step works:* This form is recognizable as the equation of a sphere.
4.  **Describe the domain:** The domain is the set of all points $(x,y,z)$ such that $x^2+y^2+z^2 > 1$. This represents all points *outside* of the sphere centered at the origin with radius 1. The sphere itself is not included.
    **Domain:** $D = \{ (x,y,z) \in \mathbb{R}^3 \mid x^2+y^2+z^2 > 1 \}$.

**b) Describe the level surfaces for $k=0, 1, \ln(3)$.**

*   **What's given:** The function $f(x,y,z) = \ln(x^2+y^2+z^2-1)$ and specific $k$ values.
*   **What we want:** The equations of the level surfaces and a description of their geometric shape.

1.  **Set $f(x,y,z) = k$ for each value of $k$:**
    *   *Why this step works:* This is the definition of a level surface.
    *   **For $k=0$**:
        $$\ln(x^2+y^2+z^2-1) = 0$$
        To solve for the argument of the logarithm, we exponentiate both sides with base $e$:
        $$e^{\ln(x^2+y^2+z^2-1)} = e^0$$
        $$x^2+y^2+z^2-1 = 1$$
        $$x^2+y^2+z^2 = 2$$
        This is a sphere centered at the origin with radius $\sqrt{2}$.
    *   **For $k=1$**:
        $$\ln(x^2+y^2+z^2-1) = 1$$
        $$e^{\ln(x^2+y^2+z^2-1)} = e^1$$
        $$x^2+y^2+z^2-1 = e$$
        $$x^2+y^2+z^2 = 1+e$$
        This is a sphere centered at the origin with radius $\sqrt{1+e}$. (Since $e \approx 2.718$, $\sqrt{1+e} \approx \sqrt{3.718} \approx 1.928$).
    *   **For $k=\ln(3)$**:
        $$\ln(x^2+y^2+z^2-1) = \ln(3)$$
        Since $\ln(A) = \ln(B) \implies A=B$:
        $$x^2+y^2+z^2-1 = 3$$
        $$x^2+y^2+z^2 = 4$$
        This is a sphere centered at the origin with radius 2.
2.  **Check if level surfaces are in the domain:** For all these level surfaces, the radius $R$ is $\sqrt{2}$, $\sqrt{1+e}$, or $2$. In all cases, $R > 1$, so $R^2 > 1$. This means $x^2+y^2+z^2 > 1$, so all these level surfaces are indeed within the domain $D$.
    *   *Why this step works:* It's crucial to verify that the level surfaces actually exist within the function's defined domain.
3.  **Describe the family of surfaces:** The level surfaces are a family of concentric spheres centered at the origin. As $k$ increases, the radius of the spheres increases.
    *   *Why this step works:* Recognizing the standard form for spheres allows for a clear geometric description.

**Reflection:** This example highlights the importance of carefully determining the domain first, as it dictates where the function is defined and thus where level surfaces can exist. The level surfaces are concentric spheres, and the value of $k$ (the output of the $\ln$ function) directly relates to the radius of these spheres.

## 6. Common mistakes and traps

1.  **Confusing Level Curves with Cross-Sections:**
    *   **Why it happens:** Both involve "slicing" a surface. A level curve ($f(x,y)=k$) is a slice parallel to the $xy$-plane, projected onto the $xy$-plane. A cross-section (e.g., $f(x,y)$ with $x=c$ or $y=c$) is a slice parallel to the $yz$ or $xz$ plane, and the resulting curve lies in that plane. Level curves are 2D representations of constant output, while cross-sections show how the output changes along one input variable while holding another constant.

2.  **Forgetting Domain Restrictions:**
    *   **Why it happens:** Students often jump straight to graphing or finding level sets without first determining the domain. Functions involving square roots (argument must be $\ge 0$), logarithms (argument must be $>0$), or fractions (denominator must be $\ne 0$) have restricted domains. Ignoring these leads to incorrect graphs or level sets that don't actually exist for the function.

3.  **Trying to Graph Functions of 3+ Variables Directly:**
    *   **Why it happens:** We are so accustomed to 2D and 3D graphs that the intuition to extend this to $w=f(x,y,z)$ is strong. However, a direct graph of $f(x,y,z)$ would require 4 dimensions ($x,y,z$ for input, $w$ for output), which is impossible to visualize. This is precisely why level *surfaces* are introduced.

4.  **Misinterpreting the Constant $k$ in $f(x,y)=k$ or $f(x,y,z)=k$:**
    *   **Why it happens:** The constant $k$ represents a specific *output value* of the function. It must be a value within the *range* of the function. If $k$ is outside the range, there will be no corresponding level curve or surface. For example, $f(x,y) = x^2+y^2$ has a range of $[0, \infty)$, so $k$ cannot be negative.

5.  **Assuming All Level Curves/Surfaces are Simple Geometric Shapes:**
    *   **Why it happens:** Many textbook examples use functions whose level sets are circles, spheres, lines, or planes, which are easy to visualize. However, level curves/surfaces can be much more complex shapes, including non-standard curves, disconnected regions, or even single points. Don't assume simplicity; always derive the equation for $f(x,y)=k$ or $f(x,y,z)=k$ and then identify the shape.

6.  **Incorrectly Visualizing 3D from 2D Level Curves:**
    *   **Why it happens:** While level curves are powerful for visualizing 3D surfaces, it takes practice to translate the 2D contour map back into a 3D mental image. For instance, closely spaced level curves indicate a steep slope, while widely spaced curves indicate a gentle slope. Concentric circles can represent a cone, a paraboloid, or a hemisphere, depending on how the $k$ values relate to the radii.

## 7. Textbook-precise explanation

Let $D$ be a subset of $\mathbb{R}^n$. A function $f$ of $n$ variables is a rule that assigns to each ordered $n$-tuple $(x_1, x_2, \ldots, x_n)$ in $D$ a unique real number denoted by $f(x_1, x_2, \ldots, x_n)$. The set $D$ is called the **domain** of $f$, and the set of all possible output values is called the **range** of $f$. We can write this as $f: D \subseteq \mathbb{R}^n \to \mathbb{R}$.

For a function of two variables, $z = f(x,y)$:
*   The **domain** $D$ is a subset of $\mathbb{R}^2$.
*   The **range** $R$ is a subset of $\mathbb{R}$.
*   The **graph** of $f$ is the set of all points $(x,y,z)$ in $\mathbb{R}^3$ such that $z = f(x,y)$ for $(x,y) \in D$. Formally, $\text{Graph}(f) = \{ (x,y,z) \in \mathbb{R}^3 \mid z = f(x,y), (x,y) \in D \}$. This graph is a surface in three-dimensional space.
*   A **level curve** of $f$ is the set of all points $(x,y)$ in the domain of $f$ such that $f(x,y) = k$, where $k$ is a constant in the range of $f$. Formally, $\text{Level Curve}(k) = \{ (x,y) \in D \mid f(x,y) = k \}$. These are curves in the $xy$-plane.

For a function of three variables, $w = f(x,y,z)$:
*   The **domain** $D$ is a subset of $\mathbb{R}^3$.
*   The **range** $R$ is a subset of $\mathbb{R}$.
*   The graph of $f$ would be a subset of $\mathbb{R}^4$, which cannot be directly visualized.
*   A **level surface** of $f$ is the set of all points $(x,y,z)$ in the domain of $f$ such that $f(x,y,z) = k$, where $k$ is a constant in the range of $f$. Formally, $\text{Level Surface}(k) = \{ (x,y,z) \in D \mid f(x,y,z) = k \}$. These are surfaces in three-dimensional space.

(Based on concepts from Stewart, Calculus, 9e, Chapter 14: Partial Derivatives, Section 14.1: Functions of Several Variables).

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a paraboloid and its level curves.

```text
               ^ z
              /
             /
            /
           O---------  (Graph of z = x^2 + y^2)
          /|\
         / | \
        /  |  \
       /   |   \
      /    |    \
     /     |     \
    /      |      \
   /       |       \
  /        |        \
 /         |         \
/----------+----------\
|          |          |
|          |          |
|          |          |
|          |          |
|          |          |
|          |          |
|          |          |
+----------+----------+------> y
 \         |         /
  \        |        /
   \       |       /
    \      |      /
     \     |     /
      \    |    /
       \   |   /
        \  |  /
         \ | /
          \|/
           x

       (View from above: xy-plane)
          ^ y
          |
         / \
        /   \
       |  .  |  <-- Level curve for k=4 (x^2+y^2=4, radius 2)
       | / \ |
       | | . | | <-- Level curve for k=1 (x^2+y^2=1, radius 1)
       | |   | |
       |  \ /  |
        \ / \ /
         \   /
          \ /
           . (k=0, x^2+y^2=0, origin)
           +---------> x
```
**Description of the Figure:**
The top part shows a 3D sketch of the graph of $z = x^2 + y^2$, which is a paraboloid opening upwards with its vertex at the origin $(0,0,0)$. The $z$-axis is vertical, and the $x$ and $y$ axes are in the horizontal plane. The surface is bowl-shaped.

The bottom part shows a 2D sketch of the level curves of $z = x^2 + y^2$ in the $xy$-plane.
*   For $k=0$, the level curve is $x^2+y^2=0$, which is the single point $(0,0)$ (marked with a dot).
*   For $k=1$, the level curve is $x^2+y^2=1$, a circle of radius 1 centered at the origin.
*   For $k=4$, the level curve is $x^2+y^2=4$, a circle of radius 2 centered at the origin.
These concentric circles represent the "contour lines" of the paraboloid, showing how the height $z$ changes as you move away from the origin in the $xy$-plane. The circles are labeled with their corresponding $k$ values and radii.

For level surfaces, imagine the equation $x^2+y^2+z^2=k$.
*   If $k=0$, it's a point $(0,0,0)$.
*   If $k=1$, it's a sphere of radius 1 centered at the origin.
*   If $k=4$, it's a sphere of radius 2 centered at the origin.
These are concentric spheres in 3D space. Visualizing them would involve drawing multiple spheres, one inside the other, each representing a constant output value $k$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Level Lines Look Like Layers, Level Surfaces Show Shape."**
        *   **Level Lines (curves):** Think of **L**ayers on a topographic map. Each line is a constant **L**evel of elevation. You're looking down from above.
        *   **Level Surfaces:** Think of **S**lices of a 4D object, revealing its 3D **S**hape. Imagine cutting an onion to see its concentric layers, but in 3D.
    *   For $z=f(x,y)$, imagine a mountain. The graph is the mountain itself. The level curves are the contour lines drawn on a flat map of the mountain.
    *   For $w=f(x,y,z)$, imagine the temperature in a room. You can't draw a graph, but you can draw "isothermal surfaces" – surfaces where the temperature is constant. These are the level surfaces.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Graph of $f(x,y)$:** $z = f(x,y)$ defines a **surface in $\mathbb{R}^3$**.
    2.  **Level Curve of $f(x,y)$:** $f(x,y) = k$ defines a **curve in $\mathbb{R}^2$** (the $xy$-plane).
    3.  **Level Surface of $f(x,y,z)$:** $f(x,y,z) = k$ defines a **surface in $\mathbb{R}^3$**.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after this lesson. Redo one example from each category (graph, level curve, level surface).
    *   **Review 2:** In 1 day. Briefly recall the definitions and try to describe the level sets for $f(x,y) = x^2-y^2$ and $f(x,y,z) = x+y+z$.
    *   **Review 3:** In 3 days. Work through two new problems, one involving level curves and one involving level surfaces, paying attention to domain restrictions.
    *   **Review 4:** In 7 days. Explain the concepts out loud to an imaginary peer, using analogies. Sketch a graph and its level curves from memory.
    *   **Review 5:** In 16 days. Work through a harder problem involving a more complex function and its level sets.
    *   **Review 6:** In 35 days. Revisit the core definitions and the three key facts. Connect them to partial derivatives (if you've learned them by then).

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget what a level curve or surface is, start from the most basic concept of a function:
    1.  **Function $y=f(x)$:** One input, one output. Graph is a curve in 2D ($xy$-plane).
    2.  **Extend to $z=f(x,y)$:** Two inputs, one output. Graph is a surface in 3D ($xyz$-space).
    3.  **How to visualize $z=f(x,y)$ in 2D?** You need to "lose" a dimension. Set the output $z$ to a constant value, $k$. So, $f(x,y)=k$. This equation describes a curve in the $xy$-plane. This is the definition of a **level curve**.
    4.  **Extend to $w=f(x,y,z)$:** Three inputs, one output. Graph would be in 4D ($xyzw$-space), which we can't draw.
    5.  **How to visualize $w=f(x,y,z)$ in 3D?** Again, "lose" a dimension by setting the output $w$ to a constant value, $k$. So, $f(x,y,z)=k$. This equation describes a surface in 3D ($xyz$-space). This is the definition of a **level surface**.
    This pathway shows that level sets are simply techniques to visualize higher-dimensional functions by fixing the output value, reducing the dimensionality of the visualization by one.

## 10. Connections — what this leads to

Understanding functions of several variables, their graphs, and their level sets is absolutely foundational for nearly all subsequent topics in multivariable calculus and beyond.

1.  **Partial Derivatives:** The concept of a level curve/surface is crucial for understanding partial derivatives. A partial derivative (e.g., $\frac{\partial f}{\partial x}$) tells you the rate of change of the function as you move in one coordinate direction (e.g., $x$) while holding other variables (like $y$) constant. This is essentially moving along a path *on the surface* or *within the domain* that is perpendicular to the level sets.
2.  **Directional Derivatives and the Gradient Vector:** The gradient vector, $\nabla f$, points in the direction of the steepest ascent of the function. Crucially, the gradient vector is always *perpendicular* to the level curves (for $f(x,y)$) or level surfaces (for $f(x,y,z)$). This geometric relationship is one of the most important insights in multivariable calculus.
3.  **Optimization (Maxima and Minima):** Finding local maxima and minima of functions of several variables involves using partial derivatives and the Hessian matrix. The intuition gained from visualizing graphs (peaks and valleys) and level curves (concentric contours around extrema) is invaluable here.
4.  **Multiple Integrals:** While not directly about graphs or level sets, understanding the domain of integration for double and triple integrals (which are regions in $\mathbb{R}^2$ and $\mathbb{R}^3$) depends on being comfortable with functions that define boundaries in these spaces.
5.  **Tangent Planes and Linear Approximations:** The concept of a tangent plane to a surface $z=f(x,y)$ at a point $(x_0,y_0,z_0)$ is a direct extension of tangent lines for single-variable functions. This relies on the graph of $f$.
6.  **Conservative Vector Fields:** In vector calculus, a vector field $\mathbf{F}$ is conservative if it is the gradient of some scalar potential function $\phi(x,y,z)$. The level surfaces of this potential function $\phi$ (i.e., $\phi(x,y,z)=k$) are equipotential surfaces, and the vector field lines are everywhere perpendicular to these surfaces. This is a powerful application in physics (e.g., electric fields, gravitational fields).
7.  **Implicit Differentiation:** When you have an equation like $F(x,y,z)=0$ that implicitly defines $z$ as a function of $x$ and $y$, you are essentially looking at a specific level surface of the function $F(x,y,z)$.

## 11. Self-check questions

1.  Consider the function $f(x,y) = \frac{1}{\sqrt{x^2+y^2-4}}$.
    a) Determine the domain of $f$.
    b) Describe the shape of the graph of $f$. (Hint: Consider $z^2 = \frac{1}{x^2+y^2-4}$.)
    c) Sketch the level curves for $k=1/2$ and $k=1/\sqrt{5}$.

2.  Let $g(x,y,z) = x^2+y^2-z^2$.
    a) Describe the domain and range of $g$.
    b) Describe the level surfaces for $k=0, 1, -1$. Identify the type of quadric surface for each.

3.  Sketch the graph of $f(x,y) = \sqrt{x^2+y^2}$. Then, sketch its level curves for $k=0, 1, 2, 3$. What geometric shape does the graph resemble, and how do the level curves reinforce this?

4.  A company's profit, $P$, depends on the number of units produced for two products, $x$ and $y$, according to the function $P(x,y) = 200x + 300y - x^2 - y^2$.
    a) Describe what the level curves $P(x,y) = k$ represent in this context.
    b) Find the equation of the level curve for $k=10000$. What shape is this curve?
    c) What does it mean if the level curves are very close together or very far apart in a certain region?

5.  For the function $h(x,y,z) = \arctan(x^2+y^2+z^2)$.
    a) Determine the domain and range of $h$.
    b) Describe the level surfaces for $k=\pi/4$ and $k=\pi/3$.
    c) Can there be a level surface for $k=\pi/2$? Explain why or why not.