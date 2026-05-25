## What it is
A quadrilateral is a two-dimensional polygon with four straight sides and four vertices. By classifying quadrilaterals based on parallel sides, equal side lengths, and right angles, we uncover a strict hierarchy of shapes (parallelograms, rectangles, rhombuses, squares, trapezoids, and kites) governed by specific, predictable rules regarding their diagonals, internal angles, and symmetries.

## Why it matters
In physics and aerospace, the parallelogram is the fundamental geometric model for vector addition (forces, velocities) and orbital mechanics. In structural engineering, understanding that a rectangle will shear into a general parallelogram under lateral load—unless braced by a diagonal—dictates truss design. In computer science, quadrilaterals form the basis of bounding boxes in collision detection algorithms and are used extensively in finite element analysis (FEA) to mesh 3D surfaces for aerodynamic simulations.

## When to study it
Do not attempt this until you have mastered:
1. Parallel lines intersected by a transversal (alternate interior, corresponding, and consecutive interior angles).
2. Triangle congruence postulates (SSS, SAS, ASA, AAS).
3. The definition of polygons and the sum of interior angles ($S = (n-2) \times 180^\circ$).

## How to study it (step by step)
1. **Draw the hierarchy map:** Map the "family tree" of quadrilaterals: Quadrilateral $\rightarrow$ Parallelogram $\rightarrow$ Rectangle & Rhombus $\rightarrow$ Square. Understand that properties inherit downward.
2. **Derive the parallelogram:** Draw a parallelogram, draw its diagonal, and use alternate interior angles and ASA congruence to prove opposite sides and opposite angles are equal.
3. **Prove diagonal bisection:** Draw both diagonals in a parallelogram. Use ASA congruence on the opposing triangles to prove the diagonals cut each other exactly in half.
4. **Isolate the rectangle:** Define a rectangle as a parallelogram with one right angle. Prove that this forces all angles to be $90^\circ$ and forces the diagonals to be exactly equal in length.
5. **Isolate the rhombus:** Define a rhombus as a parallelogram with two adjacent equal sides. Prove that this forces all sides to be equal and forces the diagonals to intersect at exactly $90^\circ$.
6. **Analyze symmetry:** For each shape, draw all lines of reflectional symmetry and determine the order of rotational symmetry.

## Key ideas, with intuition

**1. The Inheritance Principle**
Think of quadrilaterals like object-oriented programming classes. "Parallelogram" is the parent class. Its core properties are: opposite sides parallel, opposite sides equal, opposite angles equal, and **diagonals bisect each other**. "Rectangle" and "Rhombus" are child classes. They inherit *all* parallelogram properties and add their own. "Square" inherits from both Rectangle and Rhombus.

**2. The Rectangle-Rhombus Duality**
Rectangles and rhombuses are geometric opposites. 
*   **Rectangle:** Constrains *angles* (all $90^\circ$). This forces the diagonals to be **equal in length**.
*   **Rhombus:** Constrains *sides* (all equal). This forces the diagonals to be **perpendicular** ($90^\circ$ to each other).
*   **Square:** Constrains both. Diagonals are equal *and* perpendicular.

**3. Symmetry dictates diagonals**
If a quadrilateral has a line of symmetry that passes through opposite vertices (like a kite or a rhombus), the diagonals *must* be perpendicular. The line of symmetry acts as a mirror; the other diagonal is reflected across it, forcing a $90^\circ$ intersection.

## Worked example
**Claim:** The diagonals of a rhombus intersect at right angles ($90^\circ$).

**Proof:**
Let $ABCD$ be a rhombus. By definition, all four sides are equal: $AB = BC = CD = DA$.
Let the diagonals $AC$ and $BD$ intersect at point $M$.
Because a rhombus is a type of parallelogram, its diagonals bisect each other. Therefore, $AM = MC$ and $BM = MD$.

Consider $\triangle ABM$ and $\triangle ADM$:
1. $AB = AD$ (Definition of a rhombus)
2. $AM = AM$ (Reflexive property; shared side)
3. $BM = MD$ (Diagonals of a parallelogram bisect each other)

By Side-Side-Side (SSS) congruence, $\triangle ABM \cong \triangle ADM$.
Because the triangles are congruent, their corresponding angles are equal: $\angle AMB = \angle AMD$.
Since $B, M,$ and $D$ form a straight line, $\angle AMB + \angle AMD = 180^\circ$.
Therefore, $2\angle AMB = 180^\circ \implies \angle AMB = 90^\circ$.

*Reflection:* Notice how we didn't just state the rule; we built it from the absolute foundation of triangle congruence. If you ever forget the properties of a rhombus, drawing the diagonals and looking for congruent triangles will immediately reveal the truth.

## Diagrams

```text
The Quadrilateral Hierarchy (Properties Inherit Downward)

                 [ Quadrilateral ]
                 (4 sides, 360 deg)
                         |
                         v
                 [ Parallelogram ]
               - Diagonals bisect
               - Opp sides/angles equal
               - Rotational symmetry order 2
                         |
            +------------+------------+
            |                         |
            v                         v
       [ Rectangle ]             [ Rhombus ]
   - Diagonals are EQUAL     - Diagonals are PERPENDICULAR
   - 4 lines of symmetry     - Diagonals bisect angles
   (if non-square: 2 lines)  - 2 lines of symmetry
            |                         |
            +------------+------------+
                         |
                         v
                    [ Square ]
                - Diagonals bisect
                - Diagonals are EQUAL
                - Diagonals are PERPENDICULAR
                - 4 lines of symmetry
                - Rotational symmetry order 4
```

## Memory technique — remember this forever

1. **The Mnemonic:** "REP"
   *   **R**ectangles have **E**qual diagonals.
   *   **R**hombuses have **P**erpendicular diagonals.
   *   Squares are both, so they have both.

2. **Facts to overlearn:**
   *   Parallelogram: Diagonals bisect.
   *   Rectangle: Diagonals are equal.
   *   Rhombus: Diagonals are perpendicular.

3. **Spaced-repetition schedule:**
   Review these properties and mentally re-derive them at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days. 

4. **The "first principles" pathway:**
   If you forget everything, draw the shape, draw the diagonals, and look for "Z-angles" (alternate interior angles from parallel lines). Use those angles to prove the triangles inside the shape are congruent. The congruence will immediately tell you if the diagonals are equal, bisected, or perpendicular.

## Common mistakes
*   **Assuming parallelogram diagonals are equal.** A standard, slanted parallelogram has one long diagonal and one short diagonal. Only when you push it upright into a rectangle do the diagonals equalize.
*   **Assuming rhombus diagonals are equal.** A rhombus is a "squished square." One diagonal stretches out, the other compresses. They are perpendicular, but rarely equal.
*   **Confusing Trapezoids with Isosceles Trapezoids.** A standard trapezoid (one pair of parallel sides) has no symmetry and unequal diagonals. Only an *isosceles* trapezoid (non-parallel sides are equal) has equal diagonals and one line of symmetry.

## Self-check
1. A quadrilateral has diagonals that bisect each other and are equal in length, but they do not intersect at $90^\circ$. What specific shape is this?
2. In rhombus $ABCD$, diagonals $AC$ and $BD$ intersect at $M$. If $\angle MAB = 35^\circ$, what are the measures of all other angles in $\triangle ABM$, and what is the measure of the entire angle $\angle ABC$?
3. Prove from first principles that if the diagonals of a quadrilateral bisect each other, the opposite sides of the quadrilateral must be parallel (i.e., it is a parallelogram).