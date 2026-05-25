## 1. What it is — in plain English

Imagine you have a giant, perfectly pointed party hat, but it's actually two hats joined at their tips, one pointing up and one pointing down. This shape is called a double cone.

Now, imagine you take a perfectly flat knife and slice through this double cone. The shape you get where the knife cuts the cone is called a "conic section." Depending on how you angle your knife, you can get different shapes: an ellipse (like a squashed circle), a parabola (like the path of a thrown ball), or a hyperbola (two separate curves).

A circle is just a very special, perfectly symmetrical way to slice that cone. If you cut the cone straight across, perfectly horizontal to the ground, you get a circle. It's the "most normal" or "least squashed" of all the conic sections.

Mathematicians have a way to measure how "squashed" a conic section is, called its "eccentricity," denoted by the letter $e$. For an ellipse, $e$ is between 0 and 1. For a parabola, $e$ is exactly 1. For a hyperbola, $e$ is greater than 1. For a circle, because it's not squashed at all, its eccentricity is exactly $e=0$. This is why we call it a "degenerate" conic — it's a special, simplified case where the squashing factor is zero.

## 2. Why it matters — real-world applications

The circle, as a degenerate conic, is fundamental because it represents the ideal of perfect symmetry and constant radius, which has profound implications across science, engineering, and technology.

1.  **Optics and Lenses (Physics/Engineering):** The design of most simple lenses and mirrors relies on spherical (circular in 2D cross-section) surfaces. While advanced optics use aspherical (non-circular) surfaces to correct aberrations, the spherical lens is the foundational building block. For example, a basic magnifying glass or the initial design of a telescope objective uses spherical surfaces, precisely because the circle represents the most straightforward geometry for light refraction and reflection. Companies like **Zeiss** or **Nikon** base their lens manufacturing on these geometric principles.

2.  **Aerospace Engineering and Orbital Mechanics (Physics):** While most celestial orbits are elliptical (with eccentricity $0 < e < 1$), a perfectly circular orbit ($e=0$) is an idealized and crucial theoretical case. Understanding the circle as a degenerate conic allows engineers at organizations like **NASA** or **SpaceX** to simplify initial calculations for satellite trajectories or understand the minimum energy requirements for orbital maneuvers. For instance, geostationary satellites aim for orbits that are as close to circular as possible to maintain a constant distance from a point on Earth's surface.

3.  **Mechanical Engineering and Design:** Circles are ubiquitous in mechanical design due to their rotational symmetry. Wheels, gears, bearings, pipes, and shafts are all circular in cross-section. The efficiency and smooth operation of machinery, from a simple bicycle to complex industrial turbines (e.g., those designed by **General Electric** or **Siemens**), depend on the precise geometry of circular components. The circular shape ensures uniform stress distribution under rotation and minimizes friction.

4.  **Computer Graphics and Machine Learning:** In computer graphics, rendering circular shapes efficiently is critical for creating realistic environments and objects. In machine learning, particularly in clustering algorithms like K-Means, clusters are often modeled as spherical (circular in 2D) distributions. The assumption of spherical clusters simplifies the distance calculations and allows for efficient grouping of data points. For example, in image recognition tasks, features might be grouped into circular regions in a high-dimensional feature space.

## 3. Prerequisites — what you must know first

Before diving deep into the circle as a degenerate conic, ensure you have a solid grasp of these foundational concepts:

*   **Basic Algebra:** Proficiency in manipulating algebraic expressions, solving linear and quadratic equations, and understanding variables.
*   **Coordinate Geometry:** Familiarity with the Cartesian coordinate system (x-y plane), plotting points, and understanding the concept of distance between two points.
    *   *Distance Formula:* If $P_1 = (x_1, y_1)$ and $P_2 = (x_2, y_2)$, the distance $d$ between them is $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
*   **Equation of a Circle:** Knowledge of the standard form $(x-h)^2 + (y-k)^2 = r^2$ and the general form $Ax^2 + Ay^2 + Dx + Ey + F = 0$.
*   **Introduction to Conic Sections:** A general understanding of what conic sections are (parabola, ellipse, hyperbola) and how they are formed by slicing a cone. You should know their basic shapes and distinguishing features.
*   **Eccentricity ($e$):** An initial understanding of eccentricity as a measure of "squashedness" for ellipses, parabolas, and hyperbolas, even if you don't know its full derivation yet. You should know that $0 < e < 1$ for an ellipse, $e=1$ for a parabola, and $e > 1$ for a hyperbola.

## 4. The core idea — step by step

Let's build up the understanding of the circle as a degenerate conic, starting from the most fundamental definitions.

### Step 1: Recap Conic Sections and their Origin

**Plain English:** Imagine you have two identical ice cream cones, one placed upside down on top of the other, touching at their points. This forms a "double right-circular cone." When you slice this 3D shape with a flat plane (like a piece of paper), the curve formed by the intersection is called a conic section. The shape of the cut depends on the angle of your slice.

**Concrete Example:**
*   If you slice horizontally, parallel to the base of the cone, you get a circle.
*   If you slice at a slight angle, you get an ellipse.
*   If you slice parallel to the side of the cone, you get a parabola.
*   If you slice vertically, cutting through both cones, you get a hyperbola.

**Formal/Mathematical Version:** A conic section is the locus of points formed by the intersection of a plane with a double right-circular cone.

**What could go wrong:** Students sometimes confuse the 2D "cone" (a triangle) with the 3D "cone" (a solid of revolution). Remember, we're talking about a 3D object being sliced.

### Step 2: The Focus-Directrix Definition of Conics

**Plain English:** There's another, more mathematical way to define all conic sections, not just by slicing a cone. It involves a special point (called the **focus**) and a special line (called the **directrix**). For any conic section, every point on the curve has a special property: its distance to the focus is always a constant multiple of its distance to the directrix. This constant multiple is what we call the **eccentricity**, $e$.

**Concrete Example:** Imagine you have a point $F$ (the focus) and a line $L$ (the directrix). If you want to draw an ellipse, you'd pick an eccentricity $e$ (say, $0.5$). Then, you'd find all points $P$ such that the distance from $P$ to $F$ is exactly half the distance from $P$ to $L$. If you did this for all such points, you'd trace out an ellipse.

**Formal/Mathematical Version:** A conic section is defined as the locus of all points $P$ in a plane such that the ratio of the distance from $P$ to a fixed point $F$ (the focus) to the distance from $P$ to a fixed line $L$ (the directrix) is a constant $e$ (the eccentricity).
$$ \frac{PF}{PD} = e $$
where $PF$ is the distance from point $P$ to the focus $F$, and $PD$ is the perpendicular distance from point $P$ to the directrix $L$.

**What could go wrong:** It's easy to mix up which distance goes in the numerator and which in the denominator. Always remember it's $PF$ (distance to focus) over $PD$ (distance to directrix).

### Step 3: Eccentricity ($e$) and its Role

**Plain English:** The eccentricity $e$ is the "shape factor" of a conic section. It tells you how "stretched" or "squashed" the curve is.
*   If $e$ is small (close to 0), the curve is less stretched.
*   If $e$ is large, the curve is more stretched.

**Concrete Example:**
*   An ellipse has $0 < e < 1$. The closer $e$ is to 0, the more circular the ellipse becomes.
*   A parabola has $e=1$. It's a specific "stretch."
*   A hyperbola has $e > 1$. It's stretched even more than a parabola.

**Formal/Mathematical Version:** The value of $e$ determines the type of conic section:
*   $e=0$: Circle
*   $0 < e < 1$: Ellipse
*   $e=1$: Parabola
*   $e > 1$: Hyperbola

For ellipses and hyperbolas, $e$ can also be defined as the ratio $c/a$, where $c$ is the distance from the center to a focus, and $a$ is the distance from the center to a vertex.

**What could go wrong:** Students often remember $e=1$ for a parabola but forget that $e=0$ is the special case for a circle. Keep them distinct!

### Step 4: What Happens When $e=0$?

**Plain English:** Now, let's apply the focus-directrix definition to the case of a circle. If the eccentricity $e$ is exactly 0, what does our ratio $\frac{PF}{PD} = e$ tell us? It tells us that $\frac{PF}{PD} = 0$. The only way a fraction can be zero is if its numerator is zero, assuming the denominator is not infinite. So, $PF$ must be 0. This means the distance from any point $P$ on the curve to the focus $F$ is zero. This can only happen if the point $P$ *is* the focus $F$. But that doesn't make sense for a curve with many points. What it *really* means is that the focus $F$ acts as the *center* of the curve, and all points $P$ on the curve are equidistant from this central focus.

**Concrete Example:** Imagine drawing a curve. If $e=0$, the "pull" towards the focus is so strong that the focus effectively becomes the point around which everything revolves, and the directrix has no influence on the shape in the usual sense. Every point on the curve is the same distance from this central focus.

**Formal/Mathematical Version:**
Given the focus-directrix definition:
$$ \frac{PF}{PD} = e $$
Substitute $e=0$:
$$ \frac{PF}{PD} = 0 $$
For this equation to hold, and assuming $PD$ is a finite, non-zero distance (which it usually is for other conics), the numerator $PF$ must be zero:
$$ PF = 0 $$
This implies that the distance from any point $P$ on the conic to the focus $F$ is zero. This means that $P$ and $F$ are the same point, which is nonsensical for a curve. The correct interpretation is that the focus $F$ becomes the **center** of the circle, and the distance $PF$ becomes the constant **radius** $r$ of the circle. The equation $PF=0$ is an extreme simplification that needs careful interpretation in context. More accurately, as $e \to 0$, the focus $F$ approaches the center of the conic.

**What could go wrong:** Directly interpreting $PF=0$ as "the curve is just a point." Instead, understand it as the focus *becoming* the center, and the constant ratio property evolving into the constant distance property of a circle.

### Step 5: The Directrix's Fate when $e=0$

**Plain English:** If $e=0$, and we know $PF$ becomes the radius $r$ (a constant, non-zero distance), then our equation $\frac{PF}{PD} = e$ becomes $\frac{r}{PD} = 0$. For this to be true, and $r$ is a non-zero number, the denominator $PD$ must be infinitely large. This means the directrix line has moved infinitely far away from the focus. It no longer influences the shape of the curve in a measurable way because it's too far to matter.

**Concrete Example:** Imagine the directrix line moving further and further away. As it gets infinitely far, its influence on the shape defined by the ratio $PF/PD$ diminishes, until at infinity, it effectively vanishes, leaving only the influence of the central focus.

**Formal/Mathematical Version:**
From $PF/PD = e$, with $e=0$, we have $PF = 0 \cdot PD$.
If we interpret $PF$ as the constant radius $r$ of the circle, then:
$$ r = 0 \cdot PD $$
For this equation to hold with a non-zero radius $r$, $PD$ must approach infinity.
$$ PD \to \infty $$
Therefore, for a circle ($e=0$), the directrix is considered to be at infinity. This means the concept of a directrix becomes irrelevant for defining a circle in the focus-directrix sense, as its influence is effectively nullified.

**What could go wrong:** Thinking the directrix simply "disappears." It doesn't disappear; it recedes to infinity, which is a specific mathematical condition.

### Step 6: Deriving the Circle Equation from $e=0$

**Plain English:** Since the focus $F$ becomes the center of the circle when $e=0$, and all points $P$ on the curve are equidistant from this center, we can use the distance formula to write the equation. If the center (which is our focus) is at $(h,k)$ and the constant distance (our radius) is $r$, then any point $(x,y)$ on the circle must be $r$ units away from $(h,k)$.

**Concrete Example:** Let the focus $F$ be at $(2,3)$ and the constant distance (radius) be $5$. Then any point $P(x,y)$ on the circle must satisfy: distance from $(x,y)$ to $(2,3)$ is $5$. Using the distance formula: $\sqrt{(x-2)^2 + (y-3)^2} = 5$. Squaring both sides gives $(x-2)^2 + (y-3)^2 = 25$.

**Formal/Mathematical Version:**
Let the focus $F$ be at the point $(h,k)$.
Let any point on the circle be $P(x,y)$.
When $e=0$, the focus $F$ is the center of the circle, and the distance $PF$ is the constant radius $r$.
Using the distance formula for $PF$:
$$ PF = \sqrt{(x-h)^2 + (y-k)^2} $$
Since $PF = r$:
$$ \sqrt{(x-h)^2 + (y-k)^2} = r $$
Squaring both sides yields the standard equation of a circle:
$$ (x-h)^2 + (y-k)^2 = r^2 $$
This demonstrates how the circle equation naturally emerges from the focus-directrix definition when the eccentricity is zero.

**What could go wrong:** Forgetting that $r$ is the constant distance *from the focus/center*. It's not an arbitrary value; it's the specific distance that makes the $PF = e \cdot PD$ definition work out as $PF=r$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Derivation from Focus and Radius

**Problem:** A conic section has an eccentricity $e=0$ and its focus is located at the point $(0,0)$. If the constant distance from the focus to any point on the conic is $7$ units, write the equation of this conic section.

**Given:**
*   Eccentricity $e=0$.
*   Focus $F = (0,0)$.
*   Constant distance from focus to any point on conic $= 7$ units.

**Want:** The equation of the conic section.

**Solution:**

1.  **Identify the type of conic:**
    *   Since $e=0$, we know this conic section is a circle.
    *   *Explanation:* The eccentricity $e$ is the defining characteristic for conic sections. $e=0$ uniquely identifies a circle.

2.  **Relate focus to center and constant distance to radius:**
    *   For a circle, the focus $F$ becomes the center $(h,k)$ of the circle. So, $(h,k) = (0,0)$.
    *   The constant distance from the center to any point on the circle is the radius $r$. So, $r=7$.
    *   *Explanation:* This is the core insight from $e=0$. The focus-directrix definition collapses into the standard definition of a circle.

3.  **Use the standard equation of a circle:**
    *   The standard equation of a circle is $(x-h)^2 + (y-k)^2 = r^2$.
    *   *Explanation:* This is the general formula for a circle with center $(h,k)$ and radius $r$.

4.  **Substitute the known values:**
    *   Substitute $h=0$, $k=0$, and $r=7$ into the equation:
    *   $(x-0)^2 + (y-0)^2 = 7^2$
    *   *Explanation:* We're plugging in the specific values we derived from the problem statement.

5.  **Simplify the equation:**
    *   $x^2 + y^2 = 49$
    *   *Explanation:* Perform the arithmetic to get the final, simplified form of the equation.

**Final Answer:**
$$ \boxed{x^2 + y^2 = 49} $$

**Reflection:** This example was straightforward because the problem directly gave us the information that, due to $e=0$, translates directly into the center and radius of a circle. It reinforces the direct link between $e=0$ and the circle's fundamental properties.

---

### Example 2: Identifying $e=0$ from a Conic Equation

**Problem:** Consider the conic section given by the equation $3x^2 + 3y^2 - 12x + 18y - 6 = 0$. Determine its type and state its eccentricity.

**Given:** The equation $3x^2 + 3y^2 - 12x + 18y - 6 = 0$.

**Want:** Type of conic section and its eccentricity $e$.

**Solution:**

1.  **Examine the coefficients of the squared terms:**
    *   The equation is in the general form $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$.
    *   Here, $A=3$, $C=3$, and $B=0$ (since there's no $xy$ term).
    *   *Explanation:* The coefficients of $x^2$ and $y^2$ are crucial for identifying conic sections.

2.  **Determine the type of conic based on coefficients:**
    *   Since $A=C$ (both are 3) and $B=0$, this indicates that the conic section is a circle.
    *   *Explanation:* For an ellipse, $A$ and $C$ would have the same sign but generally different values (e.g., $4x^2 + 9y^2$). For a circle, they must be equal and non-zero. For a parabola, one of $A$ or $C$ would be zero. For a hyperbola, $A$ and $C$ would have opposite signs.

3.  **State the eccentricity:**
    *   Because the conic section is a circle, its eccentricity is $e=0$.
    *   *Explanation:* This is a direct definition: a circle is the conic section with eccentricity zero.

4.  **(Optional but good practice) Convert to standard form to confirm:**
    *   Divide the entire equation by 3 to simplify:
        $x^2 + y^2 - 4x + 6y - 2 = 0$
    *   Group $x$ terms and $y$ terms, and move the constant to the right side:
        $(x^2 - 4x) + (y^2 + 6y) = 2$
    *   Complete the square for $x$: $(x^2 - 4x + 4) - 4 + (y^2 + 6y) = 2$
    *   Complete the square for $y$: $(x^2 - 4x + 4) + (y^2 + 6y + 9) - 4 - 9 = 2$
    *   Rewrite as squared terms: $(x-2)^2 + (y+3)^2 - 13 = 2$
    *   Move constants to the right: $(x-2)^2 + (y+3)^2 = 15$
    *   This is clearly the equation of a circle with center $(2,-3)$ and radius $\sqrt{15}$.
    *   *Explanation:* Completing the square is a standard algebraic technique to convert the general form of a conic section into its standard form, which makes its properties (center, radius) explicit and confirms its type.

**Final Answer:**
The conic section is a **circle**, and its eccentricity is $\boxed{e=0}$.

**Reflection:** This example demonstrates how to recognize a circle from its general algebraic equation and, by extension, deduce its eccentricity. The key is recognizing the equality of the coefficients of $x^2$ and $y^2$.

---

### Example 3: Focus-Directrix Definition with $e=0$ (Conceptual)

**Problem:** A conic section is defined by the property that for any point $P(x,y)$ on the curve, its distance from the point $F(1, -2)$ is equal to $0$ times its perpendicular distance from the line $L: x=5$. Find the equation of this conic section.

**Given:**
*   Focus $F = (1, -2)$.
*   Directrix $L: x=5$.
*   Eccentricity $e=0$. (Implied by "distance from $F$ is equal to $0$ times distance from $L$")

**Want:** The equation of the conic section.

**Solution:**

1.  **Write down the focus-directrix definition:**
    *   The fundamental definition is $PF = e \cdot PD$.
    *   *Explanation:* This is the starting point for any conic section defined by focus, directrix, and eccentricity.

2.  **Substitute the given eccentricity:**
    *   We are given that the distance from $P$ to $F$ is $0$ times the distance from $P$ to $L$. This means $e=0$.
    *   $PF = 0 \cdot PD$
    *   *Explanation:* The problem statement directly implies $e=0$.

3.  **Simplify the equation:**
    *   $PF = 0$
    *   *Explanation:* Any number multiplied by zero is zero.

4.  **Interpret $PF=0$ for a conic section:**
    *   For $PF=0$ to hold for all points $P$ on the curve, it implies that the distance from any point $P$ to the focus $F$ is zero. This means $P$ must always be the same point as $F$.
    *   However, a curve is not a single point. In the context of conic sections, when $e=0$, the focus $F$ becomes the **center** of the circle, and the "distance from $F$" becomes the **radius** $r$.
    *   The equation $PF=0$ means that the directrix's influence vanishes, and the definition simplifies to "all points are equidistant from the focus." But what is this constant distance? It's not 0, otherwise it would be a point.
    *   The interpretation of $PF=0 \cdot PD$ for a circle is that the focus $F$ is the center of the circle, and $PF$ is the constant radius $r$. The directrix $L$ is at infinity, making $PD \to \infty$. Thus, $r = 0 \cdot \infty$, which is an indeterminate form, but it means that the directrix has no influence.
    *   The problem statement "distance from $F$ is equal to $0$ times its perpendicular distance from the line $L$" is a slightly tricky way of stating $e=0$. It means the definition $PF=e \cdot PD$ holds, and since $e=0$, it simplifies to $PF=0$. This is the point where the definition needs to be reinterpreted for the special case of a circle.
    *   *Correction/Refinement:* The statement $PF=0 \cdot PD$ implies $PF=0$. If $PF=0$, then *all points on the conic are the focus itself*. This would mean the conic is just a single point, $F(1,-2)$. This is a **degenerate circle** with radius $r=0$.
    *   *Explanation:* This is a crucial subtlety. While $e=0$ typically defines a circle of *any* radius, the *literal* application of $PF=0 \cdot PD$ leading to $PF=0$ implies a circle of radius zero. This is a "point circle."

5.  **Write the equation of the point circle:**
    *   If the conic is a point circle at $F(1,-2)$, then its center is $(h,k) = (1,-2)$ and its radius is $r=0$.
    *   Using $(x-h)^2 + (y-k)^2 = r^2$:
    *   $(x-1)^2 + (y-(-2))^2 = 0^2$
    *   $(x-1)^2 + (y+2)^2 = 0$
    *   *Explanation:* A point circle is a valid, albeit trivial, circle. Its equation is derived in the same way, just with $r=0$.

**Final Answer:**
The equation of the conic section is $\boxed{(x-1)^2 + (y+2)^2 = 0}$. This represents a **point circle** at $(1,-2)$.

**Reflection:** This example highlights a critical nuance: if you *strictly* apply $PF = e \cdot PD$ with $e=0$, you get $PF=0$, which implies a point circle (radius 0). For a circle with a non-zero radius, the directrix must be at infinity, and the focus acts as the center, with $PF=r$ being the definition. This problem forces you to consider the most literal interpretation of $e=0$ in the focus-directrix definition.

---

### Example 4: General Conic Equation and Conditions for $e=0$

**Problem:** For the general quadratic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$, what conditions on the coefficients $A, B, C$ must be met for the equation to represent a circle? How does this relate to $e=0$?

**Given:** The general conic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$.

**Want:** Conditions on $A, B, C$ for a circle, and the relation to $e=0$.

**Solution:**

1.  **Recall the standard form of a circle:**
    *   The standard form of a circle is $(x-h)^2 + (y-k)^2 = r^2$.
    *   *Explanation:* This is the target form we want to match.

2.  **Expand the standard form:**
    *   $(x^2 - 2hx + h^2) + (y^2 - 2ky + k^2) = r^2$
    *   $x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0$
    *   *Explanation:* Expanding allows us to see the coefficients of $x^2, y^2, xy, x, y,$ and the constant term.

3.  **Compare expanded standard form with the general conic equation:**
    *   General: $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$
    *   Expanded Circle: $x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0$

4.  **Derive conditions on $A, B, C$:**
    *   **Condition on $B$ (the $xy$ term):** In the expanded circle equation, there is no $xy$ term. This means the coefficient of $xy$ in the general equation must be zero.
        *   Therefore, $\boxed{B=0}$.
        *   *Explanation:* The $xy$ term represents a rotation of the conic. A circle is perfectly symmetrical and is never "rotated" in its standard form.

    *   **Condition on $A$ and $C$ (the $x^2$ and $y^2$ terms):** In the expanded circle equation, the coefficients of $x^2$ and $y^2$ are both $1$. In the general equation, they are $A$ and $C$. For the general equation to represent a circle, $A$ and $C$ must be equal (and non-zero, otherwise it's not a quadratic in both $x$ and $y$). We can always divide the entire equation by $A$ (since $A \ne 0$) to make the coefficients of $x^2$ and $y^2$ equal to 1.
        *   Therefore, $\boxed{A=C}$ (and $A \ne 0$).
        *   *Explanation:* Equal coefficients for $x^2$ and $y^2$ (after ensuring $B=0$) indicate that the scaling in the $x$ and $y$ directions is the same, which is characteristic of a circle.

5.  **Relate these conditions to eccentricity $e=0$:**
    *   The conditions $A=C$ and $B=0$ are the algebraic criteria that define a circle from the general quadratic equation.
    *   A circle is, by definition, the conic section with eccentricity $e=0$.
    *   Thus, when these conditions ($A=C$ and $B=0$) are met, the resulting conic has an eccentricity of $\boxed{e=0}$.
    *   *Explanation:* The algebraic conditions are simply the translation of the geometric property ($e=0$) into the coordinate system.

**Final Answer:**
For the general quadratic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$ to represent a circle, the following conditions on the coefficients $A, B, C$ must be met:
1.  $\boxed{B=0}$ (no $xy$ term)
2.  $\boxed{A=C}$ (coefficients of $x^2$ and $y^2$ are equal and non-zero).
These conditions correspond to the conic section having an eccentricity of $\boxed{e=0}$.

**Reflection:** This example connects the algebraic form of a conic section directly to its geometric type and eccentricity. It's a powerful way to understand how $e=0$ manifests in the coefficients of the equation. It also highlights the importance of the $xy$ term in conic sections, which represents rotation.

## 6. Common mistakes and traps

1.  **Confusing $e=0$ with $e=1$:** Students often remember that $e=1$ defines a parabola, and sometimes incorrectly assume $e=0$ is for a parabola or another conic. Remember: $e=0$ is *only* for a circle.
2.  **Forgetting the Directrix's Role:** While the directrix is at infinity for a circle, students might incorrectly assume it simply doesn't exist or try to apply finite directrix formulas, leading to contradictions. The directrix *recedes to infinity*.
3.  **Misinterpreting "Degenerate":** The term "degenerate" doesn't mean "not important" or "broken." In mathematics, it means a special or extreme case where a more general form simplifies. For a conic, it means the most symmetrical form.
4.  **Applying Focus-Directrix Formulas Literally for $e=0$:** As seen in Example 3, strictly applying $PF = 0 \cdot PD$ leads to $PF=0$, implying a point circle (radius 0). While mathematically valid, it's not what's usually meant by "a circle." For a circle with $r>0$, the focus-directrix definition needs to be interpreted as the focus becoming the center and the directrix receding to infinity.
5.  **Mixing up Center and Focus:** For ellipses and hyperbolas, the foci are distinct from the center. For a circle ($e=0$), the focus *is* the center. Failing to recognize this can lead to incorrect equations or conceptual errors.
6.  **Incorrectly Identifying Conic from General Equation:** Not recognizing that $A=C$ and $B=0$ are the key conditions for a circle in the general quadratic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$. Forgetting to check $B=0$ is a common oversight.

## 7. Textbook-precise explanation

A conic section is formally defined as the curve formed by the intersection of a plane with a double right-circular cone. Alternatively, and more analytically, a conic section is the locus of a point $P$ such that its distance from a fixed point $F$ (the focus) is in a constant ratio $e$ (the eccentricity) to its perpendicular distance from a fixed line $L$ (the directrix). This is expressed as $PF = e \cdot PD$.

**The Circle as a Degenerate Conic ($e=0$):**

When the eccentricity $e=0$, the defining equation $PF = e \cdot PD$ simplifies to:
$$ PF = 0 \cdot PD $$
$$ PF = 0 $$
This implies that the distance from any point $P$ on the conic to the fixed point $F$ (the focus) must be zero. A strict interpretation of $PF=0$ would mean that every point $P$ on the curve is coincident with the focus $F$, resulting in a single point. This specific case is known as a **point circle**, which is a degenerate circle with radius $r=0$.

For a non-degenerate circle (i.e., a circle with a non-zero radius $r$), the interpretation is slightly more nuanced:
As $e \to 0$, the focus $F$ approaches the geometric center of the conic. The condition $PF = e \cdot PD$ transforms into the property that all points $P$ on the curve are equidistant from this central focus $F$. This constant distance is precisely the radius $r$ of the circle.
Concurrently, for $PF = r$ (where $r \ne 0$) and $e=0$ to hold in $PF = e \cdot PD$, the perpendicular distance $PD$ from any point $P$ to the directrix $L$ must tend to infinity ($PD \to \infty$). Thus, for a circle, the directrix is considered to be infinitely far from the focus/center.

Therefore, a circle is the conic section characterized by an eccentricity $e=0$. Geometrically, this corresponds to a cutting plane that is perpendicular to the axis of the double cone. Analytically, if the focus is located at $(h,k)$ and the constant distance (radius) is $r$, the equation of the circle is derived directly from the distance formula:
$$ \sqrt{(x-h)^2 + (y-k)^2} = r $$
Squaring both sides yields the standard form of the equation of a circle:
$$ (x-h)^2 + (y-k)^2 = r^2 $$
In the general quadratic equation $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$, the conditions for representing a circle are $A=C$ (and $A \ne 0$) and $B=0$. These algebraic conditions are the direct consequence of the geometric property $e=0$.

**Reference:** Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021, Chapter 10, Section 10.1 (Conics, Parabolas, Ellipses, Hyperbolas). While Stewart might not explicitly state "circle as degenerate conic" in the title, the definition of eccentricity and its values for different conics implicitly defines the circle as the $e=0$ case.

## 8. ASCII diagrams

```text
       ^
      /|\
     / | \
    /  |  \
   /   |   \
  /    |    \
 /     |     \
/      |      \
-------O-------  <-- Cutting plane (horizontal)
\      |      /
 \     |     /
  \    |    /
   \   |   /
    \  |  /
     \ | /
      \|/
       v

  Resulting shape:
      *****
    **     **
   *         *
  *           *
  *           *
   *         *
    **     **
      *****
      (A Circle)

Description: This diagram illustrates a double right-circular cone being intersected by a plane that is perfectly horizontal (perpendicular to the cone's axis). The resulting cross-section, where the plane cuts the cone, is a perfect circle. This horizontal slice corresponds to the eccentricity e=0.

----------------------------------------------------------------------

Focus-Directrix for an Ellipse (e < 1):

      Directrix (L)
      |
      |
      |   P
      |   .
      |    \
      |     \
      |      F (Focus)
      |       .
      |        \
      |         \
      |          \
      |           \
      |            \
      |             \
      |              \
      |               \
      |                \
      |                 \
      |                  \
      |                   \
      |                    \
      |                     \
      |                      \
      |                       \
      |                        \
      |                         \
      |                          \
      |                           \
      |                            \
      |                             \
      |                              \
      |                               \
      |                                \
      |                                 \
      |                                  \
      |                                   \
      |                                    \
      |                                     \
      |                                      \
      |                                       \
      |                                        \
      |                                         \
      |                                          \
      |                                           \
      |                                            \
      |                                             \
      |                                              \
      |                                               \
      |                                                \
      |                                                 \
      |                                                  \
      |                                                   \
      |                                                    \
      |                                                     \
      |                                                      \
      |                                                       \
      |                                                        \
      |                                                         \
      |                                                          \
      |                                                           \
      |                                                            \
      |                                                             \
      |                                                              \
      |                                                               \
      |                                                                \
      |                                                                 \
      |                                                                  \
      |                                                                   \
      |                                                                    \
      |                                                                     \
      |                                                                      \
      |                                                                       \
      |                                                                        \
      |                                                                         \
      |                                                                          \
      |                                                                           \
      |                                                                            \
      |                                                                             \
      |                                                                              \
      |                                                                               \
      |                                                                                \
      |                                                                                 \
      |                                                                                  \
      |                                                                                   \
      |                                                                                    \
      |                                                                                     \
      |                                                                                      \
      |                                                                                       \
      |                                                                                        \
      |                                                                                         \
      |                                                                                          \
      |                                                                                           \
      |                                                                                            \
      |                                                                                             \
      |                                                                                              \
      |                                                                                               \
      |                                                                                                \
      |                                                                                                 \
      |                                                                                                  \
      |                                                                                                   \
      |                                                                                                    \
      |                                                                                                     \
      |                                                                                                      \
      |                                                                                                       \
      |                                                                                                        \
      |                                                                                                         \
      |                                                                                                          \
      |                                                                                                           \
      |                                                                                                            \
      |                                                                                                             \
      |                                                                                                              \
      |                                                                                                               \
      |                                                                                                                \
      |                                                                                                                 \
      |                                                                                                                  \
      |                                                                                                                   \
      |                                                                                                                    \
      |                                                                                                                     \
      |                                                                                                                      \
      |                                                                                                                       \
      |                                                                                                                        \
      |                                                                                                                         \
      |                                                                                                                          \
      |                                                                                                                           \
      |                                                                                                                            \
      |                                                                                                                             \
      |                                                                                                                              \
      |                                                                                                                               \
      |                                                                                                                                \
      |                                                                                                                                 \
      |                                                                                                                                  \
      |                                                                                                                                   \
      |                                                                                                                                    \
      |                                                                                                                                     \
      |                                                                                                                                      \
      |                                                                                                                                       \
      |                                                                                                                                        \
      |                                                                                                                                         \
      |                                                                                                                                          \
      |                                                                                                                                           \
      |                                                                                                                                            \
      |                                                                                                                                             \
      |                                                                                                                                              \
      |                                                                                                                                               \
      |                                                                                                                                                \
      |                                                                                                                                                 \
      |                                                                                                                                                  \
      |                                                                                                                                                   \
      |                                                                                                                                                    \
      |                                                                                                                                                     \
      |                                                                                                                                                      \
      |                                                                                                                                                       \
      |                                                                                                                                                        \
      |                                                                                                                                                         \
      |                                                                                                                                                          \
      |                                                                                                                                                           \
      |                                                                                                                                                            \
      |                                                                                                                                                             \
      |                                                                                                                                                              \
      |                                                                                                                                                               \
      |                                                                                                                                                                \
      |                                                                                                                                                                 \
      |                                                                                                                                                                  \
      |                                                                                                                                                                   \
      |                                                                                                                                                                    \
      |                                                                                                                                                                     \
      |                                                                                                                                                                      \
      |                                                                                                                                                                       \
      |                                                                                                                                                                        \
      |                                                                                                                                                                         \
      |                                                                                                                                                                          \
      |                                                                                                                                                                           \
      |                                                                                                                                                                            \
      |                                                                                                                                                                             \
      |                                                                                                                                                                              \
      |                                                                                                                                                                               \
      |                                                                                                                                                                                \
      |                                                                                                                                                                                 \
      |                                                                                                                                                                                  \
      |                                                                                                                                                                                   \
      |                                                                                                                                                                                    \
      |                                                                                                                                                                                     \
      |                                                                                                                                                                                      \
      |                                                                                                                                                                                       \
      |                                                                                                                                                                                        \
      |                                                                                                                                                                                         \
      |                                                                                                                                                                                          \
      |                                                                                                                                                                                           \
      |                                                                                                                                                                                            \
      |                                                                                                                                                                                             \
      |                                                                                                                                                                                              \
      |                                                                                                                                                                                               \
      |                                                                                                                                                                                                \
      |                                                                                                                                                                                                 \
      |                                                                                                                                                                                                  \
      |                                                                                                                                                                                                   \
      |                                                                                                                                                                                                    \
      |                                                                                                                                                                                                     \
      |                                                                                                                                                                                                      \
      |                                                                                                                                                                                                       \
      |                                                                                                                                                                                                        \
      |                                                                                                                                                                                                         \
      |                                                                                                                                                                                                          \
      |                                                                                                                                                                                                           \
      |                                                                                                                                                                                                            \
      |                                                                                                                                                                                                             \
      |                                                                                                                                                                                                              \
      |                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                               \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             \
      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              \
      |                                                                                                                                                                                          