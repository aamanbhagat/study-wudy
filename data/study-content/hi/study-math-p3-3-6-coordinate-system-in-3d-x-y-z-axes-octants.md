## 1. The one-sentence answer
**The 3D coordinate system places three mutually perpendicular axes—x, y and z—through a common origin, locating every point by an ordered triple (x, y, z) and partitioning space into eight octants according to the sign pattern of those coordinates.**

In 2D you already know that any point is fixed once you know its signed distances from two perpendicular lines. Adding a third axis at right angles to both gives you a unique address for every location in ordinary space. The eight possible combinations of positive and negative signs on the three coordinates then label the eight octants exactly as the four sign combinations label the four quadrants in the plane.

The origin itself is the single point where all three coordinates are zero; every other point lies in precisely one octant. Once you can read the signs and magnitudes of x, y and z, you can visualise the relative positions of points, lines and planes without drawing.

> [!NOTE]
> The decisive “aha” is that the octant of a point is completely determined by the three-bit sign pattern of its coordinates; magnitude never matters for octant membership.

## 2. Why this matters — concrete and current
In aerospace, flight simulators at NASA’s Ames Research Center store every aircraft state as (x, y, z, roll, pitch, yaw) inside a right-handed body-fixed frame whose origin moves with the vehicle; octant checks quickly reject physically impossible trajectories during Monte-Carlo safety analysis.

Semiconductor mask writers from ASML use three-axis laser interferometers to position the wafer stage to sub-nanometre precision; the controller continuously monitors which octant the stage occupies so that sign-dependent error maps can be applied without lookup-table overflow.

In machine-learning, point-cloud networks such as PointNet++ process LiDAR returns from autonomous-vehicle fleets; each return is stored as (x, y, z) and is first binned by octant so that subsequent voxel-grid convolutions operate on sparse tensors whose memory layout respects the eight orthants.

Medical linear accelerators at Varian Medical Systems track the gantry and couch with a 3-D coordinate frame whose origin lies at the isocentre; treatment-planning software uses octant arithmetic to guarantee that no beam ever enters through the patient’s feet when the plan specifies superior entry.

Radio astronomers at the Event Horizon Telescope array convert measured delays into a 3-D source coordinate (x, y, z) relative to the solar-system barycentre; octant classification immediately tells the pipeline whether the source lies inside or outside the Milky-Way disk before imaging begins.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian plane (x, y)   | Supplies the first two coordinates and the notion of signed distance |
| Right angle / perpendicularity | Guarantees that the z-axis direction is uniquely fixed once x and y are chosen |
| Sign of a real number    | Determines octant membership                              |
| Ordered triple notation  | Encodes the three independent coordinates unambiguously   |

If any row is unfamiliar, pause and review that single idea before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Extending two dimensions by one perpendicular direction
Start with the familiar xy-plane. A third line through the origin that makes a right angle with both existing axes is called the z-axis.  
Example: the point (3, 4, 0) still lies in the xy-plane; the point (3, 4, 5) sits directly “above” it along the new axis.  
Formally, the three axes satisfy  
$$
\mathbf{i}\cdot\mathbf{j}=\mathbf{j}\cdot\mathbf{k}=\mathbf{k}\cdot\mathbf{i}=0,
$$  
where \(\mathbf{i}\), \(\mathbf{j}\), \(\mathbf{k}\) are unit vectors along x, y and z.  

> [!WARNING]
> If the new axis is drawn at any angle other than 90°, the three coordinates cease to be independent and distance formulas collapse.

### Step 2 — Choosing a handedness convention
Rotate your right hand so that the thumb points along positive x and the index finger along positive y; the middle finger then points along positive z. This is the right-handed convention used in almost every textbook.  
Example: (1, 0, 0) × (0, 1, 0) = (0, 0, 1) confirms the orientation.  
Formally,  
$$
\mathbf{i}\times\mathbf{j}=\mathbf{k}.
$$

> [!WARNING]
> Using a left-handed frame silently reverses every cross-product sign and will mismatch published data that assume the right-hand rule.

### Step 3 — Labelling the eight octants by sign triples
Each coordinate can be positive or negative, giving 2³ = 8 regions. We label them by the ordered signs of (x, y, z).  
Example: (+, +, +) is the “first” octant; (–, +, –) is the sixth.  
No formula is required yet; the label is simply the three-bit sign string.

### Step 4 — Assigning numeric octant numbers (optional but common)
Some texts number the octants 1 through 8 by reading the sign pattern as a binary number (+++ = 1, ++– = 2, etc.). The numbering is arbitrary; only the sign triple is invariant.

### Step 5 — Coordinate of an arbitrary point
Any point P is reached by travelling x units along the x-axis, then y units parallel to the y-axis, then z units parallel to the z-axis. Its address is therefore the ordered triple (x, y, z).  
Formal statement: the position vector is  
$$
\mathbf{r}=x\mathbf{i}+y\mathbf{j}+z\mathbf{k}.
$$

### Step 6 — Distance and midpoint formulas follow at once
The Euclidean distance between (x₁, y₁, z₁) and (x₂, y₂, z₂) is  
$$
\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}.
$$  
The midpoint is the arithmetic average of each coordinate.

### Step 7 — Octant membership test
Given any triple (x, y, z), examine the three signs. The resulting pattern tells the octant instantly; magnitude is irrelevant.

### Step 8 — Textbook-grade definition
A rectangular coordinate system in three-dimensional Euclidean space consists of an ordered triple of mutually perpendicular lines intersecting at a point O (the origin), together with a consistent orientation and identical scales on each axis. The coordinates of a point P are the signed distances from P to the three coordinate planes.

## 5. Worked examples — har step show karo

**Example 1 — Locating a point inside the first octant**  
*Given:* coordinates (2, 3, 4).  
*Find:* octant and distance from origin.  
Step 1: all three signs are positive → first octant.  
Step 2: distance = \(\sqrt{2^2+3^2+4^2}=\sqrt{29}\).  
*Why* each move: sign inspection uses only the definition of octants; distance formula follows directly from three perpendicular segments.  
**\(\sqrt{29}\), first octant**

*Reflection:* the example is trivial yet forces explicit sign checking before any calculation.

**Example 2 — Crossing from one octant to another**  
*Given:* line from (1, 1, 1) to (–2, 3, –4).  
*Find:* which octants it traverses.  
Parametrise: (1–3t, 1+2t, 1–5t), t from 0 to 1.  
At t = 1/3, x = 0, y = 5/3 > 0, z = –2/3 < 0 → crosses into octant (+, +, –) then (–, +, –).  
*Why:* zero crossings change exactly one sign bit, hence move to an adjacent octant.  
**Octants traversed: (+,+,+) → (+,+ ,–) → (–,+,–)**

*Reflection:* tracking sign changes prevents mistakenly counting non-adjacent octants.

**Example 3 — Midpoint lying on a coordinate plane**  
*Given:* A(3, –1, 4), B(–1, 5, –2).  
*Find:* midpoint and its octant.  
Midpoint = \(\left(\frac{3-1}{2},\frac{-1+5}{2},\frac{4-2}{2}\right)=(1,2,1)\).  
All positive → first octant.  
*Why:* averaging each coordinate separately follows from the section formula.  
**(1,2,1), first octant**

*Reflection:* even when endpoints lie in different octants the midpoint may still sit in a well-defined octant.

**Example 4 — Distance between opposite octants**  
*Given:* P(2,3,4) in first octant, Q(–2,–3,–4) in seventh.  
*Find:* distance.  
Distance = \(\sqrt{(4)^2+(6)^2+(8)^2}=2\sqrt{29}\).  
*Why:* each difference doubles because signs are exactly reversed.  
**\(2\sqrt{29}\)**

*Reflection:* the factor of two is a direct geometric consequence of central symmetry through the origin.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Drawing z-axis at 60° instead of 90° | Artist’s perspective habit                  | Always verify that \(\mathbf{i}\cdot\mathbf{k}=0\)   |
| Forgetting that (0,0,0) belongs to no octant | Origin is the boundary of all eight regions | Explicitly test whether any coordinate is zero       |
| Using left-handed axes in a right-handed textbook | Software defaults differ                    | Check cross-product \(\mathbf{i}\times\mathbf{j}=\mathbf{k}\) once |
| Swapping y and z when reading engineering drawings | Different disciplines rotate the labels     | Adopt one convention and label axes on every sketch  |
| Assuming octant number is universal | Arbitrary numbering schemes exist           | Always state the sign triple; never rely on a number |
| Calculating distance without taking square root | Forgetting the definition of Euclidean norm | Write the square-root symbol before substituting     |
| Sign error when a point lies on a plane | Zero is neither positive nor negative       | Treat zero as a separate boundary case first         |

## 7. The textbook-precise statement
A rectangular Cartesian coordinate system in \(\mathbb{R}^3\) consists of an ordered triple of lines \(\ell_x,\ell_y,\ell_z\) passing through a common origin O, mutually perpendicular, equipped with identical scales and oriented so that the ordered basis \(\{\mathbf{e}_x,\mathbf{e}_y,\mathbf{e}_z\}\) is right-handed. The coordinate of a point P is the unique ordered triple \((x,y,z)\) such that  
\[
\overrightarrow{OP}=x\mathbf{e}_x+y\mathbf{e}_y+z\mathbf{e}_z.
\]  
The eight open octants are the connected components of \(\mathbb{R}^3\) minus the coordinate planes, each labelled by the sign pattern of \((x,y,z)\). (Stewart, *Calculus*, 9e, §12.1)

## 8. Visual — diagram or schematic
```text
      z
      |
      |     (+,+,+)
      |    /
      |   /
      |  /
      | /________ y
     /| 
    / |      (+,+,-) below xy-plane
   /  |
  x   |
      |___________ (origin at intersection)
```
Positive x right, positive y forward, positive z up. Each of the eight sign combinations occupies one of the eight infinite cones separated by the three planes.

## 9. The memory technique

**The hook**  
Picture the corner of a room as the origin; the floor edges are +x and +y; the vertical edge where the two walls meet is +z. Standing inside that corner puts you in the first octant; each time you step through a wall or the floor you flip exactly one sign.

**What to overlearn**  
- Right-hand rule: thumb x, index y, middle z.  
- Octant membership depends only on the three signs.  
- Distance formula \(\sqrt{\Delta x^2+\Delta y^2+\Delta z^2}\).

**Spaced-repetition schedule**  
Review the sign-to-octant table after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback**  
If you forget the distance formula, rebuild it: the three displacements are mutually perpendicular, so Pythagoras in 3-D is simply the sum of three squares under the square root.

## 10. What this unlocks
Mastery of 3-D coordinates lets you write equations of lines and planes, compute volumes with triple integrals, and understand rigid-body transformations.  

- Equations of planes: \(ax+by+cz=d\)  
- Direction cosines and angles between lines  
- Cross product and torque in mechanics  
- 3-D rotation matrices in computer graphics  
- Gradient, curl and divergence in vector calculus  

## 11. Self-check — five questions, no answers
1. A point has coordinates (–3, 0, 5). Which octant does it belong to, or does it lie on a boundary?  
2. Show that the points (1,2,3), (2,3,1) and (3,1,2) all lie in the same octant and form an equilateral triangle.  
3. Derive the midpoint formula in 3-D starting from the section formula in 2-D.  
4. Two points lie in opposite octants symmetric through the origin. Prove their distance is twice the distance of either point from the origin.  
5. A line crosses two coordinate planes. How many octants can it intersect at most? Construct an explicit parametric example that achieves this maximum.