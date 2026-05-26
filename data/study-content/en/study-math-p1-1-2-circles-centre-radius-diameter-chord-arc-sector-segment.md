## 1. The one-sentence answer
**A circle is the set of all points in a plane that lie at a fixed positive distance from a single interior point called its centre.**

The fixed distance is the radius. Every other named part of the circle—diameter, chord, arc, sector, segment—is obtained by selecting two or more of these points and connecting them with straight lines or with the curve itself. The definitions are therefore purely set-theoretic: they require only the Euclidean plane and the notion of equal distance.

Because the construction begins from a single point and a single length, all further properties (straightness of chords, curvature of arcs, areas of sectors) follow directly from the definition without additional assumptions.

> [!NOTE]
> The centre is the only point inside the circle that is not itself part of the circle; every other interior point lies at a strictly smaller distance from the centre.

## 2. Why this matters — concrete and current
Satellite navigation systems compute a user’s position by solving the intersection of spheres whose radii are signal travel times; the two-dimensional projection of each sphere is a circle whose centre is the satellite’s ground-track projection. Engineers at companies such as Garmin and u-blox therefore treat every received pseudorange as a circle radius.

Hard-disk read/write heads in data centres fly a few nanometres above rotating platters whose tracks are concentric circles; servo algorithms continuously measure the radial distance from the spindle centre to keep the head on the correct track.

In semiconductor lithography, the projection optics of an extreme-ultraviolet scanner must keep the wafer flat to within a few nanometres across a circular exposure field 26 mm in diameter; any deviation from circular symmetry produces overlay errors that scrap entire wafers.

Planetary scientists at NASA’s Jet Propulsion Laboratory fit observed asteroid occultation chords to circles in order to determine shape and size; the 2023 Lucy mission used such circle fits to refine the model of the Trojan asteroid Polymele before the spacecraft fly-by.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Point and line segment | The radius, diameter and chord are all line segments whose endpoints lie on the circle. |
| Distance (Euclidean) | The circle is defined by equality of distance from the centre. |
| Plane                | All constructions occur inside a single flat surface.     |

## 4. Building the idea — from intuition to formalism

### Step 1 — The centre and the radius
Fix one point \(O\) in the plane and one positive length \(r\). The circle is the collection of every point whose distance from \(O\) equals \(r\).

Example: Let \(O\) be the origin and \(r = 3\). Then every point \((x,y)\) satisfying \(\sqrt{x^2 + y^2} = 3\) lies on the circle.

Formal statement:
\[
\{ P \mid \operatorname{dist}(O,P) = r \}.
\]

> [!WARNING]
> If you allow the distance to be less than or equal to \(r\), you have described the disk, not the circle; the boundary alone is required.

### Step 2 — The diameter
Any line segment that passes through the centre and joins two points on the circle has length \(2r\) and is called a diameter.

Formal statement: If \(A\) and \(B\) lie on the circle and \(O\) lies on segment \(AB\), then \(AB\) is a diameter and \(\lvert AB\rvert = 2r\).

### Step 3 — A chord
Any line segment joining two distinct points on the circle is a chord. A diameter is the longest possible chord.

Formal statement: For distinct points \(A,B\) on the circle, segment \(AB\) is a chord.

### Step 4 — An arc
An arc is the portion of the circle between two points, traversed along the curve. It is denoted by the two endpoints and the minor or major designation.

Formal statement: Given distinct points \(A,B\) on the circle, the minor arc \(\overset{\frown}{AB}\) is the shorter of the two paths along the circle from \(A\) to \(B\).

### Step 5 — A sector
A sector is the region bounded by two radii and the arc they subtend.

Formal statement: For radii \(OA\) and \(OB\), the sector is the union of all segments from \(O\) to points on arc \(\overset{\frown}{AB}\).

### Step 6 — A segment
A segment is the region bounded by a chord and the arc it subtends.

Formal statement: For chord \(AB\), the segment is the intersection of the disk with one of the half-planes determined by line \(AB\), minus the triangular portion on the other side of the chord.

## 5. Worked examples — every step shown

**Example 1 — Identify parts from coordinates**  
*Given:* Centre \(O(0,0)\), radius 5; points \(A(3,4)\), \(B(-3,-4)\).  
*Find:* Radius length, whether \(AB\) is a diameter, length of chord \(AB\).

Distance \(OA = \sqrt{3^2+4^2}=5\), confirming \(A\) lies on the circle.  
*Why:* The definition requires every point on the circle to be exactly distance \(r\) from the centre.  
Distance \(OB=5\) likewise.  
*Why:* Same verification for \(B\).  
Midpoint of \(AB\) is \((0,0)\), which coincides with \(O\).  
*Why:* A diameter must contain the centre.  
Thus \(AB\) is a diameter of length 10.  
*Why:* Twice the radius.

**Example 2 — Minor versus major arc**  
*Given:* Same circle; points \(A\) and \(B\) diametrically opposite.  
*Find:* Measure of minor arc \(\overset{\frown}{AB}\).

The central angle is \(180^\circ\).  
*Why:* The angle at the centre between opposite radii is a straight angle.  
The minor arc is therefore the semicircle of length \(5\pi\).

**Example 3 — Sector area**  
*Given:* Radius 5, central angle \(60^\circ\).  
*Find:* Area of sector.

Area of full circle is \(\pi r^2 = 25\pi\).  
*Why:* Standard formula derived from definition of \(\pi\).  
Fraction of circle: \(60/360 = 1/6\).  
*Why:* Central angle proportion equals area proportion.  
Sector area = \(25\pi/6\).

**Example 4 — Segment area**  
*Given:* Same \(60^\circ\) sector.  
*Find:* Area of the segment bounded by chord \(AB\) and minor arc.

Area of triangle \(OAB\): \(\frac12 r^2\sin\theta = \frac12\cdot25\cdot(\sqrt3/2) = 25\sqrt3/4\).  
*Why:* Two sides equal to radius, included angle \(\theta\).  
Segment area = sector area minus triangle area = \(25\pi/6 - 25\sqrt3/4\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Calling the disk a circle         | Everyday language uses “circle” for both    | Always test: does the interior satisfy the distance equality? Only the boundary does. |
| Treating every chord as a diameter| Diameter is visually prominent              | Check whether the chord passes through the centre.   |
| Confusing arc length with chord length | Both connect the same endpoints             | Arc length uses angle in radians times radius; chord length uses law of cosines. |
| Labelling a sector by its arc only | Notation \(\overset{\frown}{AB}\) omits radii | Always verify the region includes the two radii.     |
| Assuming all segments are equal for equal chords | Forgets the arc may be major or minor       | Specify minor or major segment explicitly.           |
| Measuring radius from a point on the circumference | Origin of measurement is misidentified      | Re-state the definition: radius starts at the centre. |
| Using diameter in the area formula without halving | Formula \(\pi r^2\) is forgotten            | Replace diameter \(d\) by \(r = d/2\) before squaring. |

## 7. The textbook-precise statement
A circle in the Euclidean plane is the locus  
\[
C = \{ P \in \mathbb{R}^2 \mid \lVert P - O \rVert = r \},
\]  
where \(O\) is a fixed point (the centre) and \(r > 0\) (the radius). A diameter is any chord containing \(O\). An arc, sector and segment are defined relative to two distinct points \(A,B \in C\) and the central angle \(\angle AOB\). (See Euclid, *Elements*, Book I, Definition 15–18 and Book III for the classical treatment; modern vector form appears in Apostol, *Calculus*, Vol. 1, 2e, §1.4.)

## 8. Visual — diagram or schematic
```text
          B
         /|\
        / | \
       /  |  \   minor arc AB
      /   |O  \
     A----+----+
          diameter
```
- \(O\) is the centre.  
- Radii \(OA\), \(OB\) are drawn.  
- Chord \(AB\) is the straight line between \(A\) and \(B\).  
- The curved path from \(A\) to \(B\) (shorter one) is the minor arc.  
- The region bounded by radii and arc is the sector.  
- The region bounded by chord and arc is the segment.

## 9. The memory technique
1. **The hook** — Picture a bicycle wheel: the hub is the centre, every spoke is a radius, the longest spoke-to-spoke line through the hub is a diameter, the rubber between two spokes is an arc, the pie slice is a sector, and the thin rubber strip outside a chord is a segment.
2. **What to overlearn** — Radius \(r\), diameter \(2r\), circumference \(2\pi r\), full-circle area \(\pi r^2\).
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Rebuild from the set definition: fix \(O\) and \(r\), locate any two points at distance \(r\), then name the connecting segments and regions.

## 10. What this unlocks
Mastery of these six terms supplies the vocabulary for every subsequent theorem about angles, lengths and areas inside circles.

- Inscribed-angle theorem  
- Power of a point  
- Circumference and arc-length formulas  
- Area of circular segments used in integration  
- Polar-coordinate representations in calculus and physics  

## 11. Self-check — five questions, no answers
1. A point \(P\) satisfies \(\operatorname{dist}(O,P)=r\) and lies on the line segment joining two diametrically opposite points. Must \(P\) be the centre?
2. Two chords of equal length subtend different central angles; is this possible on the same circle?
3. Express the length of a minor arc whose central angle is \(\theta\) radians in terms of \(r\) only.
4. A sector has area \(8\pi\) and radius 4. What is the central angle in degrees?
5. A chord of length 6 is drawn in a circle of radius 5. Compute the area of the smaller segment (exact value).