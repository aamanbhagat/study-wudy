## 1. What it is — in plain English

Imagine you have a single, fixed point on a piece of paper. Now, take a pencil and a string. Tie one end of the string to the fixed point and the other end to your pencil. If you stretch the string tight and move the pencil all the way around the fixed point, what shape do you draw? You draw a perfect circle!

A circle is simply a perfectly round shape. It's the path traced by a point that moves while always staying the exact same distance from a central point. Think of it like a hula hoop: the hoop itself is the circle, and there's an invisible center point right in the middle.

Every circle has a special spot right in its absolute middle – we call this the **centre**. The distance from this centre to any point on the circle's edge is always the same. This consistent distance is super important, and we call it the **radius**.

We'll also look at other parts of a circle: a line that cuts across it (**chord**), a special chord that goes through the centre (**diameter**), a curved piece of its edge (**arc**), and two types of "slices" or regions inside the circle (**sector** and **segment**). These are all just different ways to talk about specific parts of our perfectly round shape.

## 2. Why it matters — real-world applications

Circles are everywhere, from the smallest atoms to the largest galaxies. Understanding their basic properties is fundamental to many fields of science, engineering, and daily life.

1.  **Transportation and Mechanics (Wheels, Gears, Bearings):** From the wheel of a car to the gears in a watch or the bearings that allow parts to spin smoothly, circles are essential. The consistent radius ensures smooth rotation, minimizes friction, and allows for efficient transfer of power. Without a deep understanding of circles, modern transportation and machinery would be impossible.
2.  **Architecture and Construction (Domes, Arches, Pipes):** Architects use circular designs for aesthetic appeal and structural integrity. Domes (like the Pantheon in Rome or many modern observatories) distribute weight evenly. Arches provide strength, and circular pipes are efficient for transporting fluids because they offer the largest area for a given perimeter, minimizing material use and maximizing flow.
3.  **Physics and Astronomy (Orbits, Waves, Lenses):** Planets orbit stars in elliptical (nearly circular) paths, a concept described by Kepler's laws. The study of circular motion is critical for understanding satellites, centrifuges, and even the paths of subatomic particles. Waves, whether sound or light, often propagate outwards in circular or spherical patterns. Lenses in cameras, telescopes, and eyeglasses are designed using circular and spherical geometry to focus light.
4.  **Data Storage and Telecommunications (CDs/DVDs, Antennas):** Compact discs (CDs) and digital versatile discs (DVDs) store data in a spiral track that is essentially a continuous circle. The read head moves radially while the disc spins. Satellite dishes and radar antennas are often circular parabolas, designed to focus incoming radio waves to a single point or broadcast signals efficiently in a specific direction.
5.  **Computer Graphics and Machine Learning:** In computer graphics, circles are fundamental primitives for drawing shapes, creating animations, and designing user interfaces. In machine learning, algorithms like k-means clustering rely on the concept of distance, often visualized as spheres or circles in higher dimensions, to group similar data points together.

## 3. Prerequisites — what you must know first

Before diving deep into circles, ensure you have a firm grasp of these foundational concepts:

*   **Points:** An exact location in space, usually represented by a dot.
*   **Lines:** A straight path that extends infinitely in two opposite directions.
*   **Line Segments:** A part of a line that has two distinct endpoints.
*   **Distance:** The measurement of how far apart two points or objects are.
*   **Basic Algebra:** Understanding variables, simple equations, and solving for unknowns (e.g., $x = 2y$).
*   **Basic Set Theory:** The idea of a "set" as a collection of distinct objects (in this case, points).
*   **Plane:** A flat, two-dimensional surface that extends infinitely. All our circles will exist within a plane.

## 4. The core idea — step by step

Let's break down the components of a circle, building our understanding one piece at a time.

### Step 1: The Centre

*   **Plain-English Statement:** The centre is the single, unique point that is exactly in the middle of the circle. It's the anchor point from which the circle is "drawn."
*   **Concrete Example:** If you spin a plate on a table, the spot where you put your finger to make it spin perfectly is its centre.
*   **Formal/Mathematical Version:** The **centre** of a circle, often denoted by $C$ or $O$, is the fixed point from which all points on the circle are equidistant.
*   **What Could Go Wrong:** Confusing the centre with any point *inside* the circle. The centre is a very specific, unique point.

### Step 2: The Circle Itself (Circumference)

*   **Plain-English Statement:** The circle is the curved boundary, the "edge" or "rim" of the round shape. It's not the solid area inside, but just the line that forms the shape.
*   **Concrete Example:** The rubber part of a bicycle tire, or the outer edge of a hula hoop.
*   **Formal/Mathematical Version:** A **circle** is the set of all points in a plane that are at a fixed, constant distance from a given fixed point (the centre). The length of this boundary is called the **circumference**.
*   **What Could Go Wrong:** Many people incorrectly use "circle" to refer to the entire disk (the area inside). Mathematically, the circle is only the boundary line. The region *enclosed* by the circle is called a disk.

### Step 3: Radius

*   **Plain-English Statement:** The radius is the distance from the centre of the circle to any point on its edge. It's also the line segment connecting these two points.
*   **Concrete Example:** A spoke on a bicycle wheel. Each spoke goes from the centre hub to the rim, and all spokes of the same wheel are the same length.
*   **Formal/Mathematical Version:** A **radius** (plural: radii) is a line segment connecting the centre of the circle to any point on the circle. The length of this segment is denoted by $r$. All radii of the same circle have equal length.
    $$ \text{Length of radius} = r $$
*   **What Could Go Wrong:** Forgetting that the radius *must* start at the centre and end on the circle. Also, sometimes "radius" refers to the segment, and sometimes it refers to its length. Context usually clarifies this.

### Step 4: Diameter

*   **Plain-English Statement:** The diameter is a straight line that goes all the way across the circle, passing directly through its centre. It connects two points on the circle's edge.
*   **Concrete Example:** If you cut a pizza exactly in half, the cut line that passes through the very middle is a diameter.
*   **Formal/Mathematical Version:** A **diameter** is a line segment that passes through the centre of a circle and has its endpoints on the circle. The length of a diameter, denoted by $d$, is twice the length of the radius.
    $$ d = 2r $$
*   **What Could Go Wrong:** Drawing a line across the circle that *doesn't* go through the centre and calling it a diameter. That would be a chord (see next step). The diameter is a very specific type of chord.

### Step 5: Chord

*   **Plain-English Statement:** A chord is any straight line segment that connects two different points on the edge of a circle. It doesn't have to pass through the centre.
*   **Concrete Example:** Imagine a string stretched taut between two points on the rim of a drum. That string represents a chord.
*   **Formal/Mathematical Version:** A **chord** is a line segment whose endpoints both lie on the circle.
*   **What Could Go Wrong:** Confusing a chord with a diameter. Remember, a diameter *is* a chord, but it's a special one – the longest possible chord in any given circle. Not all chords are diameters.

### Step 6: Arc

*   **Plain-English Statement:** An arc is just a curved part of the circle's edge. It's like taking a piece of the circle's circumference.
*   **Concrete Example:** The curved crust on a single slice of pizza, or the path a pendulum swings along.
*   **Formal/Mathematical Version:** An **arc** is a continuous portion of the circumference of a circle. It is defined by two endpoints on the circle and all the points on the circle between them. Arcs can be classified as **minor arcs** (less than half the circle) or **major arcs** (more than half the circle). A **semicircle** is an arc that is exactly half the circle.
*   **What Could Go Wrong:** Thinking of an arc as a straight line. It's inherently curved, following the path of the circle.

### Step 7: Sector

*   **Plain-English Statement:** A sector is a region inside the circle that looks like a slice of pizza or pie. It's formed by two radii and the arc between their endpoints.
*   **Concrete Example:** A single slice of a round cake or pie.
*   **Formal/Mathematical Version:** A **sector** of a circle is the region bounded by two radii and the arc connecting their endpoints. It is essentially a "pie slice" of the circle's area.
*   **What Could Go Wrong:** Confusing a sector with a segment (see next step). A sector always involves the centre of the circle.

### Step 8: Segment

*   **Plain-English Statement:** A segment is a region inside the circle that's cut off by a chord. Think of it as the part of the pizza *after* you've cut off the crust (the flat piece, not a full slice from the centre).
*   **Concrete Example:** If you cut a round cookie with a straight knife, the smaller piece you cut off (or the larger piece remaining) is a segment.
*   **Formal/Mathematical Version:** A **segment** of a circle is the region bounded by a chord and the arc it subtends (the arc between the chord's endpoints). Like arcs, segments can be **minor segments** (smaller area) or **major segments** (larger area).
*   **What Could Go Wrong:** Confusing a segment with a sector. A segment is defined by a chord and an arc, while a sector is defined by two radii and an arc. The segment does *not* include the centre of the circle unless the chord is a diameter.

## 5. Worked examples — multiple, with every step shown

Let's apply these definitions to some problems.

### Example 1: Finding Diameter from Radius

**Problem:** A circle has a radius of $7 \text{ cm}$. What is its diameter?

**Given:** Radius $r = 7 \text{ cm}$.
**Want:** Diameter $d$.

**Step-by-step solution:**

1.  **Recall the relationship between radius and diameter:** The diameter is always twice the length of the radius.
    $$ d = 2r $$
    *This is the fundamental definition linking these two parts of a circle.*
2.  **Substitute the given radius value into the formula:**
    $$ d = 2 \times 7 \text{ cm} $$
    *We replace the variable 'r' with the specific value provided in the problem.*
3.  **Perform the multiplication:**
    $$ d = 14 \text{ cm} $$
    *This gives us the numerical value for the diameter.*

**Final Answer:** The diameter of the circle is $\boxed{14 \text{ cm}}$.

**Reflection:** This example is straightforward and tests the most basic relationship. The key is knowing the formula $d=2r$.

### Example 2: Identifying Parts in a Diagram

**Problem:** Consider a circle with centre $O$. Points $A, B, C, D, E$ are on the circle. A line segment connects $A$ and $C$. Another line segment connects $D$ and $E$, passing through $O$. The curved path from $A$ to $B$ is shown. Identify the following:
    a) A radius
    b) A diameter
    c) A chord (that is not a diameter)
    d) An arc

**Given:** A description of a circle with labeled points and segments.
**Want:** To identify specific parts of the circle based on their definitions.

**Step-by-step solution:**

1.  **Identify a radius:** A radius connects the centre to any point on the circle.
    *   From the description, $O$ is the centre. Points $A, B, C, D, E$ are on the circle.
    *   Therefore, segments like $OA$, $OB$, $OC$, $OD$, $OE$ are all radii.
    *   Let's pick one: $\mathbf{OA}$.
    *This applies the definition of a radius: centre to circumference.*
2.  **Identify a diameter:** A diameter connects two points on the circle and passes through the centre.
    *   The description states that segment $DE$ connects $D$ and $E$ (both on the circle) and passes through $O$ (the centre).
    *   Therefore, $\mathbf{DE}$ is a diameter.
    *This applies the definition of a diameter: endpoints on circle, passes through centre.*
3.  **Identify a chord (that is not a diameter):** A chord connects any two points on the circle.
    *   Segment $AC$ connects points $A$ and $C$, both on the circle. The problem statement does not say it passes through the centre.
    *   Therefore, $\mathbf{AC}$ is a chord. (Note: $DE$ is also a chord, but we're looking for one that is *not* a diameter).
    *This applies the definition of a chord: endpoints on circle.*
4.  **Identify an arc:** An arc is a curved portion of the circle's circumference.
    *   The description mentions "the curved path from $A$ to $B$."
    *   Therefore, $\mathbf{\text{arc } AB}$ (often written as $\widehat{AB}$) is an arc.
    *This applies the definition of an arc: a continuous part of the circumference.*

**Final Answer:**
a) A radius: $\boxed{OA}$ (or $OB, OC, OD, OE$)
b) A diameter: $\boxed{DE}$
c) A chord (not a diameter): $\boxed{AC}$
d) An arc: $\boxed{\widehat{AB}}$

**Reflection:** This example emphasizes understanding the verbal definitions and applying them to a given context, which is crucial for geometric reasoning.

### Example 3: Finding Radius using a Chord and Perpendicular Distance

**Problem:** A chord of a circle is $16 \text{ cm}$ long. The perpendicular distance from the centre of the circle to this chord is $6 \text{ cm}$. Find the radius of the circle.

**Given:**
*   Chord length $= 16 \text{ cm}$
*   Perpendicular distance from centre to chord $= 6 \text{ cm}$
**Want:** Radius $r$.

**Step-by-step solution:**

1.  **Visualize the setup:** Draw a circle with its centre $O$. Draw a chord, let's call it $AB$. Draw a line segment from $O$ perpendicular to $AB$. Let this point of intersection be $M$.
    *   *This helps translate the problem into a visual geometric figure.*
2.  **Recall a key geometric property:** A radius drawn to the endpoint of a chord, along with the perpendicular distance from the centre to the chord and half the chord's length, forms a right-angled triangle. Also, the perpendicular from the centre to a chord bisects the chord.
    *   *This property is crucial for solving problems involving chords and radii. If you didn't know this, you'd be stuck.*
3.  **Determine the lengths of the sides of the right-angled triangle:**
    *   The perpendicular distance from the centre to the chord is one leg: $OM = 6 \text{ cm}$.
    *   The chord $AB$ is $16 \text{ cm}$. Since $OM$ bisects $AB$, $AM = MB = \frac{16}{2} = 8 \text{ cm}$. This is the other leg of the right triangle ($OMA$ or $OMB$).
    *   The radius $OA$ (or $OB$) is the hypotenuse of this right-angled triangle.
    *   *We are breaking down the given information into the components of the right triangle.*
4.  **Apply the Pythagorean theorem:** In a right-angled triangle, the square of the hypotenuse ($r^2$) is equal to the sum of the squares of the other two sides ($OM^2 + AM^2$).
    $$ r^2 = OM^2 + AM^2 $$
    *This theorem is the bridge between the lengths of the sides of a right triangle.*
5.  **Substitute the known values into the equation:**
    $$ r^2 = (6 \text{ cm})^2 + (8 \text{ cm})^2 $$
    *We replace the variables with their numerical values.*
6.  **Calculate the squares:**
    $$ r^2 = 36 \text{ cm}^2 + 64 \text{ cm}^2 $$
    *Performing the exponentiation.*
7.  **Add the values:**
    $$ r^2 = 100 \text{ cm}^2 $$
    *Combining the terms.*
8.  **Take the square root of both sides to find $r$:**
    $$ r = \sqrt{100 \text{ cm}^2} $$
    $$ r = 10 \text{ cm} $$
    *Solving for the unknown variable, the radius.*

**Final Answer:** The radius of the circle is $\boxed{10 \text{ cm}}$.

**Reflection:** This example is more challenging as it requires knowledge of a geometric property (perpendicular from centre bisects chord) and the Pythagorean theorem. It shows how different geometric concepts interlink.

### Example 4: Calculating Sector Area (Conceptual Introduction)

**Problem:** A circle has a radius of $5 \text{ cm}$. A sector of this circle is formed by two radii that enclose an angle of $72^\circ$ at the centre. What fraction of the total circle's area does this sector represent? (Do not calculate the area, just the fraction).

**Given:**
*   Radius $r = 5 \text{ cm}$
*   Central angle of sector $\theta = 72^\circ$
**Want:** The fraction of the total circle's area that the sector represents.

**Step-by-step solution:**

1.  **Understand what a sector is:** A sector is a "slice" of the circle defined by two radii and the arc between them. Its area is proportional to the central angle it subtends.
    *   *Recalling the definition of a sector is the first step.*
2.  **Recall the total angle in a circle:** A full circle corresponds to an angle of $360^\circ$ at its centre.
    *   *This is a fundamental fact about circles and angles.*
3.  **Formulate the fraction:** The fraction of the circle's area represented by the sector is the ratio of the sector's central angle to the total angle of a circle.
    $$ \text{Fraction} = \frac{\text{Central Angle of Sector}}{\text{Total Angle in a Circle}} $$
    *This logical step connects the angle to the proportion of the area.*
4.  **Substitute the given values:**
    $$ \text{Fraction} = \frac{72^\circ}{360^\circ} $$
    *Replacing the general terms with the specific numbers from the problem.*
5.  **Simplify the fraction:**
    $$ \text{Fraction} = \frac{72}{360} $$
    *   Divide both numerator and denominator by common factors. Both are divisible by 2, then by 36 (or repeatedly by smaller factors).
    *   $72 \div 72 = 1$
    *   $360 \div 72 = 5$
    $$ \text{Fraction} = \frac{1}{5} $$
    *Performing the arithmetic to get the simplest form.*

**Final Answer:** The sector represents $\boxed{\frac{1}{5}}$ of the total circle's area.

**Reflection:** This example introduces the idea of proportional parts of a circle, connecting angles to area (or arc length). It's a conceptual step towards calculating actual areas and lengths later. The radius value was not needed for this specific question, which is a common trick in math problems to test understanding of what information is truly relevant.

## 6. Common mistakes and traps

1.  **Confusing "Circle" with "Disk":** The most common mistake. A circle is only the boundary line (the circumference), while the disk is the region *inside* the circle.
2.  **Mistaking a Chord for a Diameter:** All diameters are chords, but not all chords are diameters. A diameter *must* pass through the centre.
3.  **Confusing Sector and Segment:** A **sector** is a "pizza slice" (bounded by two radii and an arc), always including the centre. A **segment** is a region cut off by a chord (bounded by a chord and an arc), and usually does *not* include the centre.
4.  **Incorrectly Relating Radius and Diameter:** Forgetting that $d = 2r$ or mistakenly thinking $d = r^2$ or $r = 2d$.
5.  **Assuming an Arc is a Straight Line:** An arc is a *curved* portion of the circle's circumference, not a straight line segment.
6.  **Ignoring the "Perpendicular" Condition:** In problems involving chords and the centre, the property that a perpendicular from the centre bisects a chord is critical. Students often forget the "perpendicular" part and assume any line from the centre to the chord bisects it.

## 7. Textbook-precise explanation

In Euclidean geometry, a circle is formally defined as follows:

**Definition (Circle):** A **circle** is the locus of all points in a plane that are equidistant from a fixed point in that plane. This fixed point is called the **centre** (often denoted $C$ or $O$), and the fixed distance is called the **radius** (denoted $r$).
*   *Reference: Euclid's Elements, Book III, Definition 1; Stewart, Calculus, 9e, Appendix B.1*

From this fundamental definition, other components are rigorously defined:

*   **Radius ($r$):** A line segment connecting the centre of the circle to any point on its circumference. The length of this segment is $r$.
*   **Diameter ($d$):** A line segment whose endpoints lie on the circle and which passes through the centre. Its length is $d = 2r$. A diameter is the longest possible chord of a circle.
*   **Chord:** A line segment whose endpoints both lie on the circle.
*   **Arc:** A continuous portion of the circumference of a circle. An arc is typically specified by its two endpoints and can be a **minor arc** (less than half the circumference), a **major arc** (more than half the circumference), or a **semicircle** (exactly half the circumference, defined by the endpoints of a diameter).
*   **Sector:** A region of a circle bounded by two radii and the arc intercepted by those radii. Its area is proportional to the central angle subtended by the arc.
*   **Segment:** A region of a circle bounded by a chord and the arc subtended by that chord. A segment does not include the centre of the circle unless the chord is a diameter (in which case it forms a semicircle).

These definitions are precise and unambiguous, forming the bedrock for more advanced geometric theorems and calculations involving circles.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the basic components: Centre, Radius, and Diameter. We will describe the others in prose.

```text
       .
     .   .
   .       .
  .         .
 .           .
.      C-----R .  <- C is the Centre, CR is a Radius.
.     /      .
.    /       .
.   D--------E  <- DE is a Diameter (passes through C).
 .           .
  .         .
   .       .
     .   .
       .
```

**Description of other components based on the diagram above:**

*   **Chord:** Imagine drawing a straight line from point `D` to point `R`. This line segment `DR` would be a chord. It connects two points on the circle but does not necessarily pass through the centre `C`.
*   **Arc:** The curved path from point `D` to point `R` along the circle's edge is an arc, denoted $\widehat{DR}$. Similarly, the curved path from `R` to `E` is an arc, $\widehat{RE}$.
*   **Sector:** The region bounded by radii `CD`, `CR` and the arc $\widehat{DR}$ would form a sector. It's the "pie slice" with its tip at the centre `C`.
*   **Segment:** The region bounded by the chord `DR` (as described above) and the arc $\widehat{DR}$ would form a segment. It's the "cut-off piece" of the circle, not including the centre `C`.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"C-R-D-C-A-S-S"**: "Circles Really Do Create Awesome Shapes, See?"
        *   **C**entre: The dot in the middle.
        *   **R**adius: Halfway.
        *   **D**iameter: Double the radius, all the way across through the centre.
        *   **C**hord: Cut across.
        *   **A**rc: A curve.
        *   **S**ector: Slice of pizza.
        *   **S**egment: Section cut by a chord (like a piece of a cookie).
    *   **Visual Distinction (Sector vs. Segment):** Think of **S**ect**or** as a "pie **or** pizza slice" (includes the centre, has a curved crust and two straight edges). Think of **S**eg**ment** as a "cut-off cookie frag**ment**" (has a straight cut and a curved edge, doesn't include the centre).

2.  **1-3 Formulas/Facts to Overlearn:**
    *   $$ d = 2r $$ (Diameter is twice the radius)
    *   A diameter is the longest possible chord.
    *   A perpendicular from the centre to a chord bisects the chord. (This is a crucial property for problem-solving).

3.  **Spaced-Repetition Schedule:**
    *   Review these definitions and formulas:
        *   **1 day** after initial learning.
        *   **3 days** after the first review.
        *   **7 days** after the second review.
        *   **16 days** after the third review.
        *   **35 days** after the fourth review.
    *   Actively recall the definitions, draw diagrams, and work through simple examples during each review.

4.  **First-Principles Re-derivation Pathway:**
    *   If you forget the details, always return to the fundamental definition of a circle: **"A circle is the set of all points equidistant from a fixed centre point."**
    *   From this:
        *   The **radius** ($r$) is that "equidistant" length.
        *   A **diameter** ($d$) is simply two radii laid end-to-end, passing through the centre, hence $d = 2r$.
        *   A **chord** is any line connecting two points on the circle. Since the diameter connects two points on the circle, it's a special chord.
        *   An **arc** is just a piece of that "set of points" (the circumference).
        *   A **sector** is formed by two radii (from the centre) and the arc between them – it's a "slice" of the circle's area.
        *   A **segment** is formed by a chord and its corresponding arc – it's a "piece" of the circle's area cut off by a straight line.
    *   By always going back to the core definition, you can logically reconstruct the meaning of each component.

## 10. Connections — what this leads to

Understanding the basic components of a circle is absolutely foundational. These concepts unlock a vast array of mathematical and scientific topics:

*   **Circumference and Area:** Knowing radius and diameter allows calculation of the distance around the circle ($\text{Circumference} = 2\pi r$) and the space it encloses ($\text{Area} = \pi r^2$).
*   **Angles in Circles:** Properties of inscribed angles, central angles, tangents, and secants, which are crucial in advanced geometry.
*   **Trigonometry and the Unit Circle:** The unit circle (a circle with radius 1 centered at the origin) is the cornerstone of trigonometry, where angles are related to coordinates on the circle, defining sine, cosine, and tangent.
*   **Analytic Geometry:** Representing circles using algebraic equations (e.g., $(x-h)^2 + (y-k)^2 = r^2$) and analyzing their properties in a coordinate plane.
*   **Calculus:** Calculating arc lengths, areas of sectors and segments using integration, and understanding rates of change in circular motion.
*   **Solid Geometry:** Extending these 2D concepts to 3D shapes like spheres, cylinders, and cones, which are built upon circular bases or cross-sections.
*   **Physics:** Describing circular motion, orbital mechanics, wave propagation, and optics.
*   **Engineering:** Designing gears, wheels, pipes, lenses, and countless other circular components in mechanical, civil, and electrical engineering.
*   **Complex Numbers:** Visualizing complex numbers and their operations on the complex plane using circles.

## 11. Self-check questions

1.  In your own words, explain the difference between a circle and a disk.
2.  If a circle has a diameter of $18 \text{ cm}$, what is its radius?
3.  Draw a circle and label its centre, a radius, a diameter, a chord that is not a diameter, an arc, a sector, and a segment. Use different colors or labels to clearly distinguish each part.
4.  A chord of a circle is $24 \text{ cm}$ long. The radius of the circle is $13 \text{ cm}$. What is the perpendicular distance from the centre of the circle to this chord?
5.  Consider a circle with centre $O$. Points $P, Q, R, S$ are on the circle.
    *   a) Can $PQ$ be both a chord and a diameter? If so, under what condition?
    *   b) If $\widehat{PQ}$ is a minor arc, and $\widehat{RS}$ is a major arc, what does this tell you about the relative lengths of the arcs and the angles they subtend at the centre?