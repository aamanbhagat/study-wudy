## What it is
A net is a two-dimensional pattern of polygons that can be folded along its edges to form a three-dimensional solid. It is the geometric equivalent of taking a cardboard box, slicing along specific edges, and laying the entire surface perfectly flat on a plane.

## Why it matters
Nets bridge 2D geometry and 3D spatial reasoning. In aerospace engineering, rocket fuselages and aircraft skins are manufactured from flat sheets of metal; knowing how to map a 3D aerodynamic surface to a 2D sheet is mandatory. In higher mathematics, nets form the absolute foundation for topology and differential geometry, building the intuition for how flat coordinate planes (manifolds) can wrap to form complex multidimensional shapes.

## When to study it
You must already understand:
1. Basic 2D polygons (squares, rectangles, triangles) and circles.
2. How to calculate the area of these 2D shapes.
3. The definitions of 3D polyhedra components: faces (flat surfaces), edges (line segments where faces meet), and vertices (corners). 

If you cannot fluently calculate the area of a rectangle, triangle, or circle, return to basic 2D mensuration before proceeding.

## How to study it (step by step)
1. **Define the solid:** Pick a 3D shape (e.g., a cube). Count its faces, edges, and vertices.
2. **Unfold mentally:** Imagine slicing along the edges to lay the shape flat. 
3. **Draw the net:** Sketch the 2D shapes connected at their shared edges.
4. **Verify edge pairing:** Count the outer perimeter edges of your 2D net. When folded, every outer edge must pair with exactly one other outer edge. If they don't match up, your net is invalid.
5. **Calculate surface area:** Calculate the 2D area of each individual face in the net and sum them. This is the first-principles derivation of 3D surface area.
6. **Explore permutations:** Recognize that one 3D shape can have multiple valid nets. Draw at least three different valid nets for a cube.

## Key ideas, with intuition

**1. Conservation of Area**
The most important conceptual leap is that unwrapping a solid does not change its surface area. The surface area of a 3D solid is strictly equal to the area of its 2D net. 
$$A_{\text{surface}} = \sum_{i=1}^{n} A_{\text{face}_i}$$

**2. The Edge-Matching Principle**
A net is a single, continuous 2D shape. The lines *inside* the net are fold lines. The lines on the *perimeter* of the net are cut lines. For the net to close into a 3D shape without gaps, every perimeter edge must have a corresponding perimeter edge of the exact same length to mate with during folding.

**3. The Cylinder Unroll**
While polyhedra unfold into polygons, curved surfaces like cylinders unfold into a mix of shapes. The top and bottom of a cylinder are circles. The curved lateral surface unrolls into a perfect rectangle. The intuition: the width of this rectangle must wrap exactly once around the base circle, meaning the rectangle's width is exactly the circumference of the circle ($2\pi r$).

## Worked example
**Problem:** Derive the total surface area of a right circular cylinder with base radius $r=3$ and height $h=5$.

**Step 1: Identify the components of the net.**
The cylinder consists of a top circular base, a bottom circular base, and a curved lateral surface.

**Step 2: Calculate the area of the bases.**
The area of one circle is $A_{\text{circle}} = \pi r^2$.
$$A_{\text{bases}} = 2 \times (\pi (3)^2) = 18\pi$$

**Step 3: Determine the dimensions of the lateral rectangle.**
When unrolled, the lateral surface is a rectangle. Its height is the cylinder's height ($h=5$). Its width is the circumference of the base circle ($C = 2\pi r$).
$$\text{Width} = 2\pi(3) = 6\pi$$

**Step 4: Calculate the area of the rectangle.**
$$A_{\text{lateral}} = \text{Height} \times \text{Width} = 5 \times 6\pi = 30\pi$$

**Step 5: Sum the areas.**
$$A_{\text{total}} = 18\pi + 30\pi = 48\pi$$

*Reflection:* By translating the 3D cylinder into a 2D net, we avoided memorizing a complex surface area formula. We reduced a 3D problem into finding the area of two circles and one rectangle.

## Diagrams

```text
NET OF A CUBE (The "Cross" Configuration)
      +---+
      |Top|
  +---+---+---+---+
  |Lft|Frt|Rgt|Bck|
  +---+---+---+---+
      |Bot|
      +---+
Internal lines are folds. Outer lines are edges that must mate.

NET OF A CYLINDER
       .-'```'-.
     .'         '.
     |  Radius r |  <-- Top Base (Area = pi*r^2)
     '.         .'
       '-..._.-'
+-----------------------+
|                       |
|                       | Height h
|                       |
+-----------------------+
 <--- Width = 2*pi*r --->
       .-'```'-.
     .'         '.
     |           |  <-- Bottom Base
     '.         .'
       '-..._.-'
```

## Memory technique — remember this forever
1. **The Visual Hook:** "The Cardboard Box Rule." Never memorize a surface area formula. Whenever you are asked for surface area, vividly imagine taking a box cutter to the 3D shape and stomping it flat into cardboard. Calculate the cardboard.
2. **Formulas to overlearn:** 
   * Cylinder lateral area: $A_{\text{lateral}} = 2\pi r h$
   * Total surface area is always $A = \sum A_{\text{2D faces}}$
3. **Spaced-repetition schedule:** Review this concept and redraw the nets of a cube, cylinder, and pyramid at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the surface area formula for *any* prism or pyramid, draw the net. The formula is just the algebraic sum of the areas of the basic shapes you drew. 

## Common mistakes
* **Overlapping faces:** Drawing a net that, when folded, places two faces on the exact same side of the 3D shape, leaving a gaping hole on the opposite side. Always mentally fold your net to check for collisions.
* **Disconnecting the circumference:** When drawing a cylinder's net, students often draw a random rectangle. The rectangle's length is rigidly locked to $2\pi r$. If $r$ changes, the rectangle's length *must* change.
* **Assuming only one valid net:** A cube has 11 distinct valid nets. Do not assume the classic "cross" shape is the only way to unwrap it. 

## Self-check
1. Draw a valid net for a square-based pyramid. How many total faces does it have, and what are their shapes?
2. A rectangular prism has side lengths $a$, $b$, and $c$. By visualizing its net, write the full algebraic expression for its total surface area.
3. Is it possible to draw a perfect 2D net for a sphere using only flat polygons? Why or why not? (Think about peeling an orange).