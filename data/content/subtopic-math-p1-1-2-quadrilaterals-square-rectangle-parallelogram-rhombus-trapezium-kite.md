## What it is
A quadrilateral is a two-dimensional polygon with exactly four straight sides, four vertices, and four interior angles. We classify them based on their specific symmetries and properties: parallel sides (parallelogram, trapezium), equal side lengths (rhombus, square), equal angles (rectangle, square), and adjacent equal sides (kite). 

## Why it matters
You cannot do vector physics without quadrilaterals; the "parallelogram law" is the fundamental visual and algebraic method for adding force or velocity vectors. In computer science and machine learning, bounding boxes for object detection are rectangles, requiring fast area and intersection calculations. In calculus, the "trapezoidal rule" is a primary numerical method for approximating integrals when exact analytical solutions are impossible.

## When to study it
You must already understand:
1. Basic points, lines, and angles (acute, obtuse, right).
2. Parallel lines and transversals (alternate interior angles).
3. Triangles, specifically the area formula ($A = \frac{1}{2}bh$) and the conditions for triangle congruence (SSS, SAS, ASA). 

If you cannot prove two triangles are congruent, stop and review triangles. Every property of a quadrilateral is proven by drawing a diagonal and analyzing the two resulting triangles.

## How to study it (step by step)
1. **Draw the hierarchy:** Map out the "family tree" of quadrilaterals from the most general (any 4-sided shape) to the most specific (the square).
2. **Prove the angle sum:** Draw a generic quadrilateral, draw one diagonal to split it into two triangles, and prove the interior angles sum to $360^\circ$.
3. **Master the parallelogram:** Prove that opposite sides are equal and diagonals bisect each other using congruent triangles. 
4. **Derive area formulas:** Start with a rectangle ($A = bh$). Transform a parallelogram into a rectangle by moving a triangular slice from one end to the other. 
5. **Analyze diagonals:** Create a table listing all six shapes. For each, determine if the diagonals: bisect each other, are equal in length, or intersect at $90^\circ$. 
6. **Solve composite shapes:** Calculate the area and perimeter of complex figures by decomposing them into rectangles and right triangles.

## Key ideas, with intuition

**1. The Inheritance Hierarchy**
Quadrilaterals function like object-oriented programming classes. A square *inherits* all properties of a rectangle and a rhombus. A rectangle *inherits* all properties of a parallelogram. If a theorem applies to a parallelogram, it automatically applies to a rectangle and a square.

**2. The Diagonal Reduction**
A quadrilateral is just two triangles glued together along a common edge (the diagonal). Because a triangle's interior angles sum to $180^\circ$, a quadrilateral's interior angles sum to:
$$ 180^\circ + 180^\circ = 360^\circ $$

**3. Height vs. Slant**
Area is always a measure of a strictly horizontal base multiplied by a strictly vertical height. For a parallelogram or trapezium, the slanted side is *never* the height. Area is $A = b \times h$, not base times slant.

**4. The Trapezium as an Average**
A trapezium has one pair of parallel sides (lengths $a$ and $b$). Its area is simply the height multiplied by the *average* of the two parallel bases:
$$ A = \frac{a + b}{2} \times h $$

## Worked example
**Problem:** Derive the area formula for a trapezium with parallel bases $a$ and $b$, and perpendicular height $h$, using only the area of a triangle.

**Step 1: Decompose the shape.**
Draw a trapezium with top base $a$ and bottom base $b$. Draw a single diagonal connecting two opposite vertices. This splits the trapezium into two triangles: Triangle 1 and Triangle 2.

**Step 2: Analyze Triangle 1 (using bottom base).**
Triangle 1 has base $b$. Its height is the perpendicular distance between the parallel lines, which is $h$.
$$ \text{Area}_1 = \frac{1}{2}bh $$

**Step 3: Analyze Triangle 2 (using top base).**
Triangle 2 is "upside down". Its base is $a$. Because it spans the same parallel lines, its perpendicular height is also $h$.
$$ \text{Area}_2 = \frac{1}{2}ah $$

**Step 4: Sum the areas.**
$$ \text{Total Area} = \text{Area}_1 + \text{Area}_2 $$
$$ \text{Total Area} = \frac{1}{2}bh + \frac{1}{2}ah $$
Factor out the common terms $\frac{1}{2}$ and $h$:
$$ \text{Total Area} = \frac{1}{2}(a + b)h $$

*Reflection:* By reducing the unknown shape to known shapes (triangles), we derived the formula from first principles. You never need to blindly memorize the trapezium formula again.

## Diagrams

```text
THE QUADRILATERAL HIERARCHY
(Arrows mean "is a special type of")

                 Quadrilateral
                 /     |      \
                /      |       \
       Trapezium Parallelogram  Kite
                /      |       \
               /       |        \
      Rectangle     Rhombus      \
               \       |         /
                \      |        /
                   Square
```

```text
PARALLELOGRAM AREA INTUITION
Move the left triangle to the right to form a rectangle.

      b
  +-------+                  +-------+
 /       /|                 |       |
/       / | h      -->      |       | h
+-------+ +                 +-------+
  b                           b
```

## Memory technique — remember this forever
**1. Visual Hook:**
Think of the "Family Tree" diagram above. The Square is the "golden child" at the bottom who inherits every good trait (parallel sides, $90^\circ$ angles, equal sides, perpendicular diagonals). 

**2. Must Overlearn:**
*   Sum of interior angles: $360^\circ$
*   Area of a trapezium: $A = \frac{1}{2}(a+b)h$
*   Parallelogram diagonals *bisect* each other. Rhombus/Kite diagonals intersect at *right angles* ($90^\circ$).

**3. Spaced Repetition Schedule:**
Review the hierarchy and derive the trapezium area on day 1, day 3, day 7, day 16, and day 35.

**4. First Principles Pathway:**
If you forget any area formula or angle sum, **draw a diagonal**. Every quadrilateral is just two triangles. If you know triangle area ($A = \frac{1}{2}bh$) and angle sum ($180^\circ$), you can rebuild all quadrilateral math on the spot.

## Common mistakes
*   **Confusing slant length with height:** Using the slanted side of a parallelogram as $h$ in $A = bh$. Height must be strictly perpendicular to the base.
*   **Assuming rectangle diagonals are perpendicular:** Diagonals of a rectangle are equal in length and bisect each other, but they do *not* cross at $90^\circ$ unless the rectangle is also a square.
*   **Exclusive definitions:** Saying "that's not a rectangle, it's a square." A square *is* a rectangle. Failing to grasp the inclusive hierarchy makes higher-level geometry proofs impossible.

## Self-check
1. A quadrilateral has three interior angles measuring $110^\circ$, $85^\circ$, and $65^\circ$. What is the measure of the fourth angle?
2. Draw a kite. Draw its two diagonals. Using congruent triangles, prove that the longer diagonal bisects the interior angles at the vertices it connects.
3. Derive the area of a kite using only the lengths of its two diagonals, $d_1$ and $d_2$. (Hint: Use the fact that the diagonals intersect at $90^\circ$).