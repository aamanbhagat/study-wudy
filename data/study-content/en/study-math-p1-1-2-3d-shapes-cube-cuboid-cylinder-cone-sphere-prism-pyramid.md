## 1. The one-sentence answer
**These seven shapes form the core vocabulary of three-dimensional geometry, each defined by a precise combination of flat faces, curved surfaces, straight edges, and vertices that determine their volumes and surface areas.**

A cube is a solid whose six faces are identical squares meeting at right angles. A cuboid relaxes that requirement so opposite faces remain rectangles while lengths may differ. A prism extends any polygonal base through a fixed height with lateral faces that are parallelograms; a pyramid tapers from the same base to a single apex. The remaining three shapes introduce curvature: a cylinder has two parallel circular bases joined by a curved lateral surface, a cone tapers from one circular base to an apex, and a sphere is the set of all points at fixed distance from a centre.

These definitions are not arbitrary. They arise directly from the way planes and circles intersect space, and they fix the numerical relations that let us compute how much material a shape contains or how much paint its surface requires.

> [!NOTE]
> The single most useful fact is that every volume formula ultimately multiplies a base area by a height factor; the factor is 1 for prisms and cylinders, 1/3 for pyramids and cones, and 4/3 for spheres because the sphere can be decomposed into infinitesimal cones.

## 2. Why this matters — concrete and current
SpaceX computes the exact cylindrical volume of propellant tanks and the conical volume of nose fairings to determine payload margins for each Falcon 9 launch; a 0.1 % error in the radius propagates to hundreds of kilograms of fuel miscalculation.

Semiconductor foundries model silicon ingots as cylinders and finished chips as thin cuboids when calculating material yield; the surface-area-to-volume ratio of each cuboid governs heat dissipation limits in 3 nm processes.

MRI scanners reconstruct the human head as an approximate sphere and the torso as a cylinder to calibrate magnetic-field homogeneity; the formulas determine coil geometry that keeps field variation below 1 ppm across the imaging volume.

Architects sizing concrete columns (cylinders) and roof pyramids for stadia rely on the same volume and lateral-surface formulas to order formwork and estimate curing times.

## 3. Mental prerequisites

| Concept              | Why you need it here                              |
|----------------------|---------------------------------------------------|
| Area of polygons and circles | Supplies the base area that every 3-D volume multiplies |
| Right angle and perpendicularity | Defines edges and faces of polyhedra              |
| Pythagorean theorem   | Calculates slant heights on cones and pyramids    |
| Variables and substitution | Allows uniform statements of volume and surface-area formulas |

## 4. Building the idea — from intuition to formalism

### Step 1 — From flat shapes to solids
A two-dimensional figure lies entirely in one plane; giving it a third dimension perpendicular to that plane produces a solid whose extent in the new direction is called its height.  
Example: a square of side 2 cm extruded 3 cm becomes a cube only when the height equals the side length.  
Formally, if a region \(B\) of area \(A\) is translated distance \(h\) along a line perpendicular to its plane, the resulting solid has volume \(V = A \cdot h\).

> [!WARNING]
> If the extrusion direction is not perpendicular, the volume formula changes to \(A \cdot h \cdot \sin\theta\); omitting the sine is the most common source of over-estimated volumes.

### Step 2 — Polyhedra with parallel faces: cuboid and cube
A cuboid is bounded by three pairs of identical rectangles whose adjacent edges meet at right angles. When all edges are equal the cuboid is a cube.  
Example: edges 4 cm, 3 cm, 2 cm give volume \(4 \times 3 \times 2 = 24\) cm³.  
\[
V = lwh, \qquad SA = 2(lw + lh + wh)
\]

### Step 3 — Generalising the base: prism and pyramid
Any polygon can serve as base. A prism keeps the base unchanged along the height; a pyramid shrinks the base linearly to a point.  
Example: triangular base area 10 cm², height 6 cm yields prism volume 60 cm³ and pyramid volume 20 cm³.  
\[
V_{\text{prism}} = A_{\text{base}} \cdot h, \qquad V_{\text{pyramid}} = \frac13 A_{\text{base}} \cdot h
\]

### Step 4 — Introducing circular bases: cylinder
Replace the polygonal base by a disk of radius \(r\). The solid is a cylinder.  
Example: \(r = 5\) cm, \(h = 10\) cm gives \(V = \pi \times 25 \times 10 = 250\pi\) cm³.  
\[
V = \pi r^2 h, \qquad SA = 2\pi r(h + r)
\]

### Step 5 — Tapering the cylinder: cone
Linearly reduce the radius from \(r\) at the base to zero at height \(h\). The factor 1/3 appears because cross-sectional area decreases quadratically.  
Example: same \(r\) and \(h\) as above yield cone volume \(250\pi/3\) cm³.  
\[
V = \frac13 \pi r^2 h, \qquad SA = \pi r(r + \sqrt{r^2 + h^2})
\]

### Step 6 — The sphere as limit of stacked disks
A sphere of radius \(r\) can be sliced into disks whose radii vary from 0 to \(r\) and back to 0. Integration produces the factor 4/3.  
\[
V = \frac43 \pi r^3, \qquad SA = 4\pi r^2
\]

### Step 7 — Euler’s relation for convex polyhedra
For any convex polyhedron, vertices \(V\), edges \(E\), and faces \(F\) satisfy \(V - E + F = 2\). This supplies an internal consistency check once the numbers of each element are counted.

## 5. Worked examples — every step shown

**Example 1 — Cube surface area**  
*Given:* edge length \(a = 7\) cm.  
*Find:* total surface area.  
Step 1: one face area = \(7 \times 7 = 49\) cm².  
*Why:* area of square is side squared.  
Step 2: six faces give \(6 \times 49 = 294\) cm².  
*Why:* opposite faces are identical and all six are counted.  
**294 cm²**

*Reflection:* The example is trivial yet forces explicit use of the multiplier 6 before any formula is memorised.

**Example 2 — Cuboid volume from given dimensions**  
*Given:* length 8 cm, width 5 cm, height 3 cm.  
*Find:* volume.  
Step 1: multiply length by width: \(8 \times 5 = 40\) cm².  
*Why:* this is the base area.  
Step 2: multiply by height: \(40 \times 3 = 120\) cm³.  
*Why:* height is the perpendicular distance between bases.  
**120 cm³**

*Reflection:* The order of multiplication does not matter, illustrating commutativity of volume.

**Example 3 — Cylinder lateral area plus bases**  
*Given:* radius 4 cm, height 9 cm.  
*Find:* total surface area.  
Step 1: curved area = \(2\pi r h = 2\pi \times 4 \times 9 = 72\pi\) cm².  
*Why:* unroll the side into a rectangle of width \(2\pi r\) and height 9.  
Step 2: two bases = \(2 \times \pi r^2 = 32\pi\) cm².  
*Why:* each base is a full circle.  
Step 3: add: \(104\pi\) cm².  
**104\pi cm²**

*Reflection:* Students often forget the two bases; separating curved and flat contributions prevents the error.

**Example 4 — Cone volume with slant-height check**  
*Given:* base radius 6 cm, height 8 cm.  
*Find:* volume and total surface area.  
Step 1: volume = \(\frac13 \pi r^2 h = \frac13 \pi \times 36 \times 8 = 96\pi\) cm³.  
*Why:* the one-third factor follows from tapering.  
Step 2: slant height \(l = \sqrt{6^2 + 8^2} = 10\) cm.  
*Why:* Pythagorean theorem on the right triangle formed by radius, height and slant.  
Step 3: lateral area = \(\pi r l = 60\pi\) cm²; total area = \(60\pi + 36\pi = 96\pi\) cm².  
**Volume: 96\pi cm³; surface area: 96\pi cm²**

*Reflection:* The numerical coincidence of volume and surface area here is accidental; the distinct units (cm³ vs cm²) remain the reliable check.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using diameter instead of radius in \(\pi r^2\) | Habit from 2-D circles where diameter is often given | Write “radius” explicitly before substituting |
| Forgetting the 1/3 in pyramid/cone volumes | Confusing prism with pyramid                | Always ask “does the cross-section shrink?” before choosing the coefficient |
| Adding slant height to height in cone SA | Treating slant as vertical dimension        | Draw the right triangle each time            |
| Counting only visible faces on a cuboid | Perspective drawing hides three faces       | Enumerate opposite pairs: front/back, left/right, top/bottom |
| Applying sphere volume to a hemisphere | Over-generalising the 4/3 factor            | Halve the sphere volume explicitly when needed |
| Mixing lateral area with total area | Ambiguous wording in problems               | Label “lateral only” or “including bases” in every calculation |
| Ignoring units until the end      | Focus on numbers alone                      | Carry units through every line               |

## 7. The textbook-precise statement
A **right circular cylinder** is the solid generated by translating a disk of radius \(r\) distance \(h\) along the line perpendicular to its plane. Its volume is \(\pi r^2 h\) and its total surface area is \(2\pi r(r+h)\).  
A **right circular cone** is generated by joining every point on the circumference of a base disk of radius \(r\) to an apex at perpendicular distance \(h\); volume \(\frac13\pi r^2 h\), total surface area \(\pi r(r+l)\) where \(l=\sqrt{r^2+h^2}\).  
A **sphere** of radius \(r\) is the set of points at distance \(r\) from a fixed centre; volume \(\frac43\pi r^3\), surface area \(4\pi r^2\).  
Analogous statements hold for the polyhedral cases with polygonal bases (cube, cuboid, prism, pyramid). These definitions appear in Stewart, *Calculus*, 9e, §6.2 and §8.3.

## 8. Visual — diagram or schematic
```text
          top square face
        +-------------+          z
       /|            /|          ^
      / |           / |          |
     +-------------+  |          +--> y
     |  |          |  |         /
     |  +----------|--+        x
     | /           | /
     |/            |/
     +-------------+
     bottom square face
```
Cube with edges parallel to coordinate axes; opposite faces equal and perpendicular.

## 9. The memory technique
**The hook** — Picture a pyramid as an Egyptian tent whose volume is one-third the rectangular prism that would enclose it; the cone is the circular version of the same tent.  
**What to overlearn** — The five volume multipliers (1, 1, 1, 1/3, 4/3) attached to prism, cylinder, cuboid/cube, pyramid/cone, sphere.  
**Spaced-repetition schedule** — Review formulas at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive any volume by integrating cross-sectional area along the height axis.

## 10. What this unlocks
Mastery of these seven solids supplies the geometric primitives required for multivariable calculus (triple integrals over cylinders and spheres), linear algebra (affine transformations of cuboids), and physics (moments of inertia, gravitational potential).  

- Surface integrals over closed polyhedra lead directly to the divergence theorem.  
- Parameterisation of cylinders and spheres introduces spherical and cylindrical coordinates.  
- Euler’s formula extends to planar graphs and topological invariants.

## 11. Self-check — five questions, no answers
1. A cuboid has edges 2, 3 and 6; a cube has edge 3. Which has the greater surface area and by how much?  
2. A cylinder and a cone share the same base radius and height. What is the exact ratio of their volumes?  
3. The slant height of a cone is 13 cm and its base radius is 5 cm. Compute its volume without first finding the perpendicular height.  
4. A square pyramid and a triangular prism have bases of equal area and the same height. Which solid has the larger volume, and why?  
5. Identify the single incorrect numerical claim among the following four statements and explain the error: (a) sphere volume = 4/3 πr³, (b) cone lateral area = πr²h, (c) cube diagonal = a√3, (d) prism volume = base area × height.