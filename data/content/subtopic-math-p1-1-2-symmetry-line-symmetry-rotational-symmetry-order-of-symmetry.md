## What it is
Symmetry is the mathematical property where an object remains invariant (unchanged in its appearance) after undergoing a specific transformation. Line symmetry occurs when a shape can be reflected across a central axis and map perfectly onto itself. Rotational symmetry occurs when a shape can be rotated around its center by a certain angle and map perfectly onto itself. The order of symmetry counts exactly how many times this matching occurs during one full $360^\circ$ rotation.

## Why it matters
Symmetry is the bedrock of modern physics and engineering. In physics, Noether's Theorem proves that every continuous symmetry in the universe corresponds to a conserved quantity (e.g., rotational symmetry dictates the conservation of angular momentum). In aerospace engineering, line symmetry is non-negotiable for aerodynamic stability and balancing the center of mass in rocket design. In computer science, Convolutional Neural Networks (CNNs) are explicitly designed to exploit translational and rotational symmetries to recognize objects in images efficiently.

## When to study it
You should already understand basic 2D polygons (triangles, squares, regular vs. irregular shapes), the concept of an axis, and angle measurement in degrees (specifically that a full circle is $360^\circ$). If you cannot confidently identify the center of a shape or calculate basic fractions of $360^\circ$, review basic angles and polygons first.

## How to study it (step by step)
1. Draw the first four regular polygons (equilateral triangle, square, regular pentagon, regular hexagon). Draw every line that cuts them into two identical, mirroring halves. Count them.
2. For each polygon, place a dot at the center. Calculate the smallest angle you must rotate the shape so it looks identical. Verify this is $\frac{360^\circ}{n}$, where $n$ is the number of sides.
3. Write out the capital letters of the alphabet. Categorize them into: only line symmetry (e.g., A), only rotational symmetry (e.g., S, Z), both (e.g., H, X), or neither (e.g., F).
4. Find a non-regular shape (like a rectangle or a parallelogram). Identify its lines of symmetry (if any) and its order of rotational symmetry. Notice how regularity affects symmetry.

## Key ideas, with intuition
**Line Symmetry (Reflectional Symmetry):** 
Imagine folding the 2D plane along a line. If the two halves of the shape perfectly overlap, that fold line is an axis of symmetry. It is a test of *reflectional invariance*. A shape can have zero, one, or multiple lines of symmetry.

**Rotational Symmetry:** 
Imagine pinning the shape at its exact center of mass and spinning it. If the shape looks exactly as it did before you started spinning—prior to reaching a full $360^\circ$—it possesses rotational symmetry. 

**Order of Rotational Symmetry ($n$):** 
This is the number of times the shape maps onto itself during one complete $360^\circ$ rotation. Every shape has an order of at least $1$ (the $360^\circ$ rotation itself). We only say a shape "has rotational symmetry" if $n \ge 2$.

**The Angle of Symmetry ($\theta$):** 
The smallest angle $\theta$ required to rotate a shape onto itself is directly tied to its order $n$. The relationship is strictly:
$$ \theta = \frac{360^\circ}{n} $$

## Worked example
**Problem:** Analyze the symmetry of a regular hexagon. Find its lines of symmetry, order of rotational symmetry, and smallest angle of rotation.

**Step 1: Line symmetry.** 
A regular hexagon has 6 vertices and 6 edges. We can draw lines through opposite vertices (3 lines) and lines through the midpoints of opposite edges (3 lines). 
*Total = 6 lines of symmetry.*

**Step 2: Order of rotational symmetry.** 
As we rotate the hexagon, vertex 1 can map onto any of the 6 vertex positions. Since all sides and angles are equal, the shape matches itself 6 times in a full rotation. 
*Order $n = 6$.*

**Step 3: Smallest angle of rotation.** 
Using the formula $\theta = \frac{360^\circ}{n}$, we calculate:
$$ \theta = \frac{360^\circ}{6} = 60^\circ $$

*Reflection:* For any *regular* polygon with $k$ sides, the number of lines of symmetry and the order of rotational symmetry are both exactly $k$. This is a direct consequence of all sides and interior angles being identical.

## Diagrams

```text
Rectangle (Line Symmetry = 2, Rotational Order = 2)
  +--------|--------+
  |        |        |
--+--------+--------+-- Horizontal Axis
  |        |        |
  +--------|--------+
           Vertical Axis
* Note: Diagonals are NOT lines of symmetry for a rectangle.

Letter 'Z' (Line Symmetry = 0, Rotational Order = 2)
  *-------+
          |
         /
        /
       |
       +-------*
* Pin the center. Rotate 180 degrees. The top '*' maps to the bottom '*', 
  and the shape is unchanged. It cannot be folded to match itself.
```

## Memory technique — remember this forever
1. **Visual Hook:** Line symmetry is a **Mirror** (or a Fold). Rotational symmetry is a **Fidget Spinner** (pin the center and spin).
2. **Must Overlearn:**
   * Order of symmetry formula: $n = \frac{360^\circ}{\theta}$
   * A *regular* $n$-gon always has exactly $n$ lines of symmetry and rotational order $n$.
3. **Spaced-repetition schedule:** Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First Principles Pathway:** If you forget the angle formula, think of a circle. A full circle is $360^\circ$. If a shape has $n$ identical "spokes" or vertices, you must divide the full circle equally among them to find the angular distance between identical states. Therefore, $\theta = \frac{360^\circ}{n}$.

## Common mistakes
* **The Rectangle Diagonal Trap:** Assuming the diagonal of a rectangle is a line of symmetry. If you fold a standard piece of paper corner-to-corner, the edges stick out. Only a square has diagonal lines of symmetry.
* **"Zero" Rotational Symmetry:** Stating an irregular shape has an order of rotational symmetry of $0$. Every shape can be rotated $360^\circ$ to look like itself. The minimum order is always $1$.
* **The Parallelogram Illusion:** Assuming a standard parallelogram has line symmetry. It has $0$ lines of symmetry, but it *does* have rotational symmetry of order $2$.

## Self-check
1. What is the order of rotational symmetry for an equilateral triangle, and what is its smallest angle of rotation?
2. Consider the capital letter 'H'. How many lines of symmetry does it have, and what is its order of rotational symmetry?
3. A mystery regular polygon has a minimum rotational symmetry angle of $15^\circ$. How many lines of symmetry does this polygon have?