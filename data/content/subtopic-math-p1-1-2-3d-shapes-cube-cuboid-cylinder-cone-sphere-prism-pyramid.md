## What it is
3D shapes are geometric figures that occupy space, possessing length, width, and depth. They are categorized by their faces (flat 2D surfaces), edges (line segments where faces meet), and vertices (points where edges intersect). Prisms, pyramids, cylinders, cones, and spheres form the foundational vocabulary of three-dimensional space.

## Why it matters
Every physical object in physics and rocket science—from a rocket's cylindrical fuselage and conical fairing to a spherical pressure vessel—is modeled using these foundational shapes to calculate mass, center of gravity, and aerodynamic drag. In computer science, 3D graphics, ray tracing, and collision detection in physics engines rely entirely on calculating the intersections and bounds of these primitive volumes.

## When to study it
You must first understand 2D geometry: polygons (rectangles, triangles), circles, and how to calculate their perimeters and areas. You also need basic algebra to manipulate formulas. If you cannot confidently find the area of a circle ($A = \pi r^2$), the circumference of a circle ($C = 2\pi r$), or the area of a triangle ($A = \frac{1}{2}bh$), go back and master 2D shapes first.

## How to study it (step by step)
1. **Define the anatomy:** Learn to identify faces, edges, and vertices for polyhedra (shapes with flat faces like cubes, cuboids, prisms, and pyramids).
2. **Master volume via extrusion:** Understand that the volume of any uniform shape (prism, cylinder) is simply its 2D base area multiplied by its height.
3. **Master volume via tapering:** Memorize the $1/3$ rule—any shape that tapers to a single point (cone, pyramid) has exactly one-third the volume of its uniform counterpart.
4. **Derive surface area via nets:** Draw a cuboid and a cylinder unfolded into flat 2D "nets" on paper. Calculate the total surface area by summing the areas of the resulting 2D shapes.
5. **Tackle the sphere:** Accept the volume formula $V = \frac{4}{3}\pi r^3$ and surface area $A = 4\pi r^2$ for now. Rigorous derivation requires integral calculus, but you must memorize these to solve intermediate geometry problems.

## Key ideas, with intuition

**The Extrusion Principle (Prisms & Cylinders)**
If a shape has the exact same cross-section from bottom to top, its volume is simply the area of that base ($A_{\text{base}}$) stacked up through space to a height ($h$).
$$V = A_{\text{base}} \times h$$
For a cylinder, the base is a circle, so $V = (\pi r^2)h$. For a cuboid, the base is a rectangle, so $V = (lw)h$.

**The Tapering Principle (Pyramids & Cones)**
If a shape shares a base with a prism or cylinder but tapers to a single point (an apex), its volume is exactly one-third of the extruded shape.
$$V = \frac{1}{3} A_{\text{base}} \times h$$
For a cone, $V = \frac{1}{3}\pi r^2 h$. For a square-based pyramid, $V = \frac{1}{3}s^2 h$. 

**Surface Area is just Unfolding**
Do not memorize surface area formulas for prisms and cylinders. Instead, unfold them. If you cut a cylinder down the side and unroll it, the curved surface becomes a flat rectangle. The width of this rectangle is the circumference of the circular base ($2\pi r$), and the height is the cylinder's height ($h$).

**Euler's Formula for Polyhedra**
For any 3D shape made of flat faces (a polyhedron), the number of Faces ($F$), Vertices ($V$), and Edges ($E$) are locked in a strict topological relationship:
$$F + V - E = 2$$

## Worked example
Calculate the total surface area and volume of a closed cylinder with radius $r = 3$ and height $h = 5$.

*Step 1: Calculate the volume using the extrusion principle.*
$$V = A_{\text{base}} \times h = (\pi r^2) \times h$$
$$V = \pi (3)^2 \times 5 = 9\pi \times 5 = 45\pi$$

*Step 2: Identify the components of the surface area.*
A closed cylinder has three surfaces: a top circle, a bottom circle, and an unrolled rectangular side.

*Step 3: Calculate the area of the circular bases.*
$$A_{\text{bases}} = 2 \times (\pi r^2) = 2 \times (\pi (3)^2) = 18\pi$$

*Step 4: Calculate the area of the curved surface.*
The unrolled rectangle has height $h=5$ and width equal to the circumference $C = 2\pi r = 6\pi$.
$$A_{\text{curved}} = C \times h = 6\pi \times 5 = 30\pi$$

*Step 5: Sum for total surface area.*
$$A_{\text{total}} = 18\pi + 30\pi = 48\pi$$

*Reflection:* Breaking the 3D shape into its 2D components (the "net") turned a complex surface area problem into basic 2D geometry. The volume was found simply by stacking the base area.

## Diagrams

```text
Unrolling a Cylinder (The "Net")

      Top Base
       .---.
     /       \  r
    |    +----|---
     \       /
       '---' 
         |
         |
 +-------------------+
 |                   |
 |                   | h
 |  Curved Surface   |
 |   (Rectangle)     |
 |                   |
 +-------------------+
    w = 2 * pi * r
         |
         |
       .---.
     /       \
    |    +    |
     \       /
       '---'
     Bottom Base
```

## Memory technique — remember this forever
1. **The Hook:** "Pointy means a third." Imagine carving a pyramid out of a solid block of wood, or a cone out of a wooden cylinder. You waste exactly 2/3 of the material. The pointy shape keeps exactly 1/3.
2. **Must overlearn:**
   - Extruded Volume: $V = A_{\text{base}} h$
   - Pointy Volume: $V = \frac{1}{3} A_{\text{base}} h$
   - Sphere Volume: $V = \frac{4}{3} \pi r^3$
3. **Spaced-repetition schedule:** Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First principles pathway:** If you forget a surface area formula, draw the "net". Unfold the 3D shape into its constituent 2D rectangles, triangles, and circles. Calculate their 2D areas and sum them. You never need to memorize a surface area formula for prisms or cylinders if you can unfold them.

## Common mistakes
* **Confusing slant height ($l$) with perpendicular height ($h$):** In cones and pyramids, volume requires $h$ (the straight line from the apex down to the center of the base). Surface area requires $l$ (the distance down the slanted side). You often must use the Pythagorean theorem ($h^2 + r^2 = l^2$) to find one from the other.
* **Forgetting the top or bottom:** When calculating the surface area of a closed cylinder or prism, students frequently forget to double the base area. Read the problem carefully to see if the shape is "open" (like a drinking glass) or "closed" (like a soup can).
* **Applying the $1/3$ rule incorrectly:** The $1/3$ rule only works if the shape tapers to a *single point*. It does not work for a frustum (a cone or pyramid with the top chopped off).

## Self-check
1. A cube has a side length of $s$. If you double the side length to $2s$, by what factor does the volume increase? By what factor does the surface area increase?
2. A cone and a cylinder have the exact same radius and height. What is the ratio of the cylinder's volume to the cone's volume?
3. A sphere of radius $r$ is perfectly enclosed (inscribed) inside a cylinder, touching the sides, top, and bottom. Derive the ratio of the sphere's volume to the cylinder's volume.