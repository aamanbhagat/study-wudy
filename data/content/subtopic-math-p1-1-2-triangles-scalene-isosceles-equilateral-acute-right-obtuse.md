## What it is
A triangle is a two-dimensional polygon with exactly three straight sides and three interior angles. We classify them by their side lengths—scalene (zero equal sides), isosceles (two equal sides), or equilateral (three equal sides)—and by their interior angles—acute (all strictly less than $90^\circ$), right (exactly one $90^\circ$ angle), or obtuse (exactly one angle strictly greater than $90^\circ$).

## Why it matters
Triangles are the only inherently rigid polygon; if you fix the lengths of the three sides, the angles cannot change. This makes them the absolute foundation of structural engineering and aerospace trusses. In physics, right triangles are used to decompose force and velocity vectors into orthogonal (independent) components. In computer science, 3D rendering engines tessellate all complex surfaces into millions of flat triangles because their mathematics is computationally cheap and perfectly predictable.

## When to study it
You must understand basic angles (degrees and radians), straight lines, and the concept of parallel lines intersecting a transversal. If you do not know that a straight line represents an angle of $180^\circ$ (or $\pi$ radians) and that alternate interior angles are equal, stop and review basic line geometry first.

## How to study it (step by step)
1. **Memorize the root definitions:** Associate the names with their literal meanings (e.g., *equi-lateral* means equal-sides). 
2. **Derive the interior angle sum:** Draw a triangle. Draw a line through the top vertex parallel to the base. Use alternate interior angles to prove the three angles sum to a straight line ($180^\circ$).
3. **Map the combinations:** Draw a 3x3 grid (Sides: Scalene, Isosceles, Equilateral vs. Angles: Acute, Right, Obtuse). Attempt to draw a triangle in each of the 9 boxes. You will find that two boxes are impossible. 
4. **Prove the Isosceles Triangle Theorem:** Draw an isosceles triangle. Drop a line from the top vertex to the midpoint of the base. Prove the two resulting right triangles are identical, thereby proving base angles are equal.
5. **Solve missing angle problems:** Write algebraic equations for triangles where angles are given as variables (e.g., $x$, $2x$, and $x+20$). Set the sum to $180^\circ$ and solve.

## Key ideas, with intuition

**1. The Interior Angle Sum is Absolute**
For any triangle in a flat (Euclidean) plane, the sum of the interior angles $\alpha, \beta, \gamma$ is exactly $180^\circ$ ($\pi$ radians). 
$$ \alpha + \beta + \gamma = 180^\circ $$
*Intuition:* Imagine a pen resting on one side of the triangle. If you slide and rotate the pen around the three corners until it returns to its starting side, it will have flipped exactly upside down—a $180^\circ$ rotation.

**2. Side-Angle Correspondence**
A triangle is a physical mechanism. If you open a hinge (an angle) wider, the side opposite that hinge must stretch to connect the ends. Therefore:
* The **longest side** is always opposite the **largest angle**.
* The **shortest side** is always opposite the **smallest angle**.
* Equal sides have equal opposite angles. This is why an equilateral triangle must also be equiangular ($180^\circ / 3 = 60^\circ$).

**3. The Right Triangle is the Gateway to Vectors**
A right triangle contains one $90^\circ$ angle. Because the total sum is $180^\circ$, the other two angles must sum to exactly $90^\circ$. 
$$ \alpha + \beta = 90^\circ $$
These two angles are called *complementary*. The side opposite the $90^\circ$ angle is the *hypotenuse*. The other two sides are *legs*. This orthogonal relationship allows us to treat the legs as independent $x$ and $y$ axes.

## Worked example
**Problem:** You are given an isosceles triangle with one angle measuring $110^\circ$. Find the measures of the other two angles.

**Step 1: Identify the constraints.**
The triangle is isosceles, meaning two sides are equal, which implies two angles are equal. The sum of all three angles is $180^\circ$.

**Step 2: Determine the position of the $110^\circ$ angle.**
Could the equal base angles be $110^\circ$? 
Let's check: $110^\circ + 110^\circ = 220^\circ$. 
This is strictly greater than $180^\circ$. Therefore, the $110^\circ$ angle cannot be one of the base angles. It must be the single vertex angle. The triangle is an *obtuse isosceles* triangle.

**Step 3: Set up the equation.**
Let the two unknown equal base angles be $x$.
$$ x + x + 110^\circ = 180^\circ $$

**Step 4: Solve for $x$.**
$$ 2x + 110^\circ = 180^\circ $$
$$ 2x = 70^\circ $$
$$ x = 35^\circ $$

**Reflection:** This worked because we relied on the hard limit of the $180^\circ$ sum to logically eliminate an impossible scenario, leaving only one valid algebraic setup. 

## Diagrams

```text
CLASSIFICATION BY SIDES:

   Equilateral           Isosceles             Scalene
   (3 equal sides)       (2 equal sides)       (0 equal sides)
         *                     *                     *
        / \                   / \                   /  \
       /   \                 /   \                 /     \
      /     \               /     \               /        \
     *-------*             *-------*             *-----------*
      60-60-60            Base angles             All angles
                            equal                 different

CLASSIFICATION BY ANGLES:

   Right Triangle        Acute Triangle        Obtuse Triangle
   (One 90° angle)       (All < 90°)           (One > 90°)
    y                      *
    ^                     / \                       *
    |                    /   \                     /  \
    *                   /     \                   /     \
    | \                /       \                 /        \
    |  \              *---------*               *-----------*
    *---* -> x        (e.g., 50-60-70)          (e.g., 30-30-120)
```

## Memory technique — remember this forever
1. **Mnemonic:** Use the etymology.
   * **Equilateral:** *Equi* (equal) + *lateral* (sides).
   * **Isosceles:** *Iso* (same) + *skelos* (legs). Think of a person standing with two equal legs.
   * **Scalene:** *Skalenos* (uneven). Think of a scale that is unbalanced.
2. **Must overlearn:** 
   * $\alpha + \beta + \gamma = 180^\circ$
   * Largest angle is opposite the longest side.
3. **Spaced-repetition schedule:** Review this material and derive the angle sum on days 1, 3, 7, 16, and 35.
4. **First principles pathway:** If you forget the interior angle sum, draw a triangle on a piece of paper. Draw a straight line passing through the top vertex, strictly parallel to the bottom base. The alternate interior angles from the transversal sides will map the bottom two angles to the top, forming a perfect straight line ($180^\circ$).

## Common mistakes
* **Assuming right triangles can be equilateral.** A right triangle has a $90^\circ$ angle. An equilateral triangle has three $60^\circ$ angles. They are mutually exclusive.
* **Drawing an isosceles triangle only one way.** Students often assume the "unequal" side must be the horizontal base. An isosceles triangle can be rotated; the two equal sides can be anywhere.
* **Thinking obtuse triangles can have two obtuse angles.** If you have two angles greater than $90^\circ$, their sum exceeds $180^\circ$ before you even add the third angle. A triangle can have at most *one* obtuse (or right) angle.

## Self-check
1. Can a scalene triangle be a right triangle? If so, sketch it and assign valid angle measures.
2. A triangle has side lengths of $7$, $10$, and $12$. The angles are $35^\circ$, $56^\circ$, and $89^\circ$. Which side length is strictly opposite the $56^\circ$ angle?
3. Prove algebraically that it is impossible for an equilateral triangle to be obtuse.