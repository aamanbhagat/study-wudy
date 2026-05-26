## 1. The one-sentence answer
**The three-dimensional Cartesian coordinate system locates every point in space by an ordered triple (x, y, z) measured along three mutually perpendicular axes that divide space into eight octants.**

Begin with the familiar xy-plane. A point is fixed once its signed distances from two perpendicular lines are known. To reach any location above or below that plane, introduce a third line through the origin that stands straight up, perpendicular to both existing axes. Call this line the z-axis. The three axes together create a rigid frame; any point P is now reached by traveling distance x along the first axis, y along the second, and z along the third. Because each coordinate can be positive or negative, space splits into eight regions called octants, each identified by the unique pattern of signs in (x, y, z).

The labeling of octants follows a simple convention: the first octant contains all points where x > 0, y > 0, z > 0; the remaining seven octants are numbered by cycling the sign changes in a fixed order. Distances, angles, and volumes are computed directly from the three coordinates without further reference to the octant number itself.

> [!NOTE]
> The right-hand rule fixes the positive direction of the z-axis once the positive x- and y-axes are chosen: point the index finger along positive x, the middle finger along positive y, and the thumb points along positive z.

## 2. Why this matters — concrete and current
In aerospace guidance, NASA’s Deep Space Network records spacecraft position vectors in the International Celestial Reference Frame, an inertial 3-D Cartesian system whose origin lies at the solar-system barycenter; every trajectory correction maneuver is a vector subtraction performed in these coordinates. Semiconductor lithography machines from ASML map wafer surfaces to sub-nanometer precision using a three-axis stage whose encoders report (x, y, z) displacements; overlay errors between successive mask layers are minimized only when the coordinate frame remains orthogonal to within microradians. In machine-learning pipelines for protein-structure prediction, models such as AlphaFold embed each residue’s spatial location as a point (x, y, z) inside a bounding box; the network’s loss function penalizes deviations measured by Euclidean distance in exactly this coordinate system. Finally, clinical CT scanners reconstruct a patient’s anatomy as a regular 3-D lattice of voxels whose indices map directly to physical (x, y, z) locations measured from the isocenter; radiation-treatment planning software optimizes beam angles inside the same frame.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Signed distances on a line | Coordinates record both magnitude and direction from origin |
| Perpendicular lines      | The three axes must intersect at right angles for distances to obey Pythagoras in 3-D |
| 2-D Cartesian plane      | The xy-plane is the base; the z-axis is erected perpendicular to it |
| Sign of a real number    | Octants are defined solely by the combination of three signs |

## 4. Building the idea — from intuition to formalism

### Step 1 — Extend the number line to a plane
A single signed number locates a point on a line. Two perpendicular lines, each carrying its own signed scale, locate a point in a plane. The pair (x, y) is the unique ordered pair that reaches the point by traveling x units horizontally then y units vertically.

### Step 2 — Erect a third axis perpendicular to the plane
At the origin of the xy-plane, draw a line that forms 90° angles with both existing axes. Call its positive direction the positive z-axis. The three lines now intersect at a single point called the origin O and are pairwise perpendicular.

### Step 3 — Apply the right-hand rule for orientation
Curl the fingers of the right hand from the positive x-axis toward the positive y-axis; the thumb points in the positive z-direction. This convention fixes the orientation once and for all.

### Step 4 — Assign coordinates to an arbitrary point
Drop perpendiculars from any point P to each of the three axes. The signed lengths of these perpendiculars are the coordinates x, y, z. Thus P is written (x, y, z).

### Step 5 — Partition space by sign patterns
Each coordinate may be positive or negative (or zero on the bounding planes). The eight possible sign combinations label the eight open octants:

- Octant I: (+, +, +)
- Octant II: (−, +, +)
- Octant III: (−, −, +)
- Octant IV: (+, −, +)
- Octant V: (+, +, −)
- Octant VI: (−, +, −)
- Octant VII: (−, −, −)
- Octant VIII: (+, −, −)

### Step 6 — Formal definition of the coordinate system
The set \(\mathbb{R}^3\) together with the standard basis vectors
\[
\mathbf{i} = (1,0,0),\quad \mathbf{j} = (0,1,0),\quad \mathbf{k} = (0,0,1)
\]
and the Euclidean distance
\[
d(P,Q) = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}
\]
constitutes the three-dimensional Cartesian coordinate system.

> [!WARNING]
> Reversing the positive z-direction (left-hand rule) inverts every subsequent octant label and produces opposite signs for every cross-product; all orientation-dependent formulas then fail.

## 5. Worked examples — every step shown

**Example 1 — Locate a point in Octant I**  
*Given:* Coordinates (3, 4, 5).  
*Find:* The octant containing the point.  
Step 1: Examine the sign of each coordinate.  
*Why:* Octant membership is determined exclusively by signs.  
All three signs are positive.  
*Why:* The ordered triple therefore satisfies the definition of Octant I.  
**Answer: Octant I**

**Example 2 — Identify the octant of (−2, 0, 7)**  
*Given:* (−2, 0, 7).  
*Find:* Octant or bounding plane.  
The y-coordinate is zero, so the point lies on a coordinate plane.  
*Why:* Any zero coordinate places the point on a bounding face rather than inside an open octant.  
**Answer: On the xz-plane (not inside any open octant)**

**Example 3 — Convert a verbal description to coordinates**  
*Given:* A point 4 units in front of the yz-plane, 3 units left of the xz-plane, and 5 units below the xy-plane.  
*Find:* Its coordinates.  
Positive x lies in front of the yz-plane → x = +4.  
Negative y lies left of the xz-plane → y = −3.  
Negative z lies below the xy-plane → z = −5.  
*Why:* Each directional phrase maps directly to a signed axis.  
**Answer: (4, −3, −5)**

**Example 4 — Determine the octant after reflection**  
*Given:* Point P(2, −1, 3) reflected through the origin.  
*Find:* Octant of the image point.  
Reflection through the origin negates every coordinate: (−2, 1, −3).  
*Why:* Central inversion multiplies the position vector by −1.  
Signs are (−, +, −) → Octant VI.  
**Answer: Octant VI**

*Reflection:* Each example isolates one coordinate property—sign pattern, zero coordinate, directional language, or central inversion—so the underlying rule is exercised without extraneous arithmetic.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Swapping y and z when reading diagrams | Printed figures sometimes rotate the view           | Always verify the right-hand rule on the given axes  |
| Treating the origin as belonging to Octant I | Origin has all coordinates zero                     | State explicitly that open octants exclude the planes |
| Assuming positive z always points “up” on screen | Screen conventions vary (y-up vs z-up)              | Check the axis labels rather than visual intuition   |
| Forgetting that axes are lines, not rays | Negative coordinates lie on the opposite rays       | Draw the entire line, not merely the positive half   |
| Labeling octants by cyclic permutation instead of sign order | Confusion with 2-D quadrant numbering               | Memorize the eight sign triplets in fixed sequence   |
| Using left-hand rule for z-axis   | Habit from mirror-image diagrams                    | Physically form the right-hand gesture each time     |
| Confusing “octant” with “orthant” | Terminology overlap in higher dimensions            | Use “octant” strictly for three dimensions           |

## 7. The textbook-precise statement
In Stewart, *Calculus*, 9e, §12.1, the three-dimensional coordinate system is introduced as follows:  
“Let three mutually perpendicular axes—the x-axis, the y-axis, and the z-axis—intersect at the origin O. The positive directions are chosen so that the unit vectors \(\mathbf{i}\), \(\mathbf{j}\), \(\mathbf{k}\) along these axes satisfy the right-hand rule. Every point P in space is assigned the unique ordered triple (x, y, z) whose components are the signed distances from P to the respective coordinate planes. The eight regions determined by the coordinate planes are called octants.”

## 8. Visual — diagram or schematic
```text
          z
          |
          |     y
          |    /
          |   /
          |  /
          | /
O---------+--------- x
         /|
        / |
       /  |
      z   y (negative directions extend behind)
```
Axes intersect at right angles at O. Positive x points right, positive y forward, positive z upward. The eight octants occupy the eight spatial “corners” formed by these three planes.

## 9. The memory technique

1. **The hook**  
   Picture the corner of a room: floor edges are +x and +y, the vertical edge rising from the corner is +z. Every other octant is the same corner after one or more walls are replaced by their mirrors.

2. **What to overlearn**  
   - The right-hand rule for axis orientation.  
   - The eight sign triplets that label the octants.  
   - The distance formula in \(\mathbb{R}^3\).

3. **Spaced-repetition schedule**  
   Review the right-hand rule and octant signs at 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
   Re-derive orientation by placing the thumb, index, and middle finger of the right hand at mutual right angles; the coordinate triple is then fixed.

## 10. What this unlocks
Mastery of the 3-D Cartesian frame supplies the language for every subsequent object in solid geometry. Vectors are arrows whose components are differences of coordinates; the dot and cross products are defined component-wise; planes receive equations of the form \(ax + by + cz = d\); distance and angle formulas between lines, planes, and surfaces all reduce to algebraic operations on (x, y, z) triples. The same coordinate language reappears unchanged in multivariable calculus, linear algebra, and physics.

## 11. Self-check — five questions, no answers
1. A point has coordinates (−3, 4, −2). Which octant does it occupy?  
2. If the positive z-axis is reversed while x and y remain fixed, which sign pattern now corresponds to the original Octant I?  
3. Write the coordinates of the point that lies 5 units behind the yz-plane, 2 units above the xy-plane, and on the positive y-axis.  
4. Two points differ only in the sign of their z-coordinates. Are they necessarily in octants that are mirror images across the xy-plane?  
5. Explain why the origin does not belong to any open octant and identify all bounding planes that contain it.