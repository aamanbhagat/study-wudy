## 1. The one-sentence answer
**Transformations map every point of a figure to a new location according to a fixed rule while preserving key geometric properties.**

A translation slides every point the same distance in the same direction. A reflection flips every point across a line. A rotation turns every point around a fixed centre by the same angle. An enlargement scales every point away from or toward a fixed centre by the same factor. These four operations together generate the rigid motions and similarity transformations that leave distances or angles unchanged in predictable ways.

The rules are expressed with coordinates. If a point \((x,y)\) is moved, its image \((x',y')\) satisfies an equation that depends only on the chosen transformation and not on the particular figure. Once the equation is fixed, the image of any point, line segment or polygon follows immediately.

> [!NOTE]
> The single most important insight is that each transformation is completely determined by its action on a small number of points; everything else is forced.

## 2. Why this matters — concrete and current
Computer animation pipelines at Pixar and Industrial Light & Magic apply sequences of translations, rotations and enlargements to every vertex of a 3-D model before each frame is rendered.  

Semiconductor mask-alignment systems at ASML use sub-nanometre translations and rotations to overlay successive lithographic layers on a silicon wafer; any undetected rotation error produces a defective chip.  

Protein crystallographers at the Protein Data Bank apply reflection and rotation symmetries to reduce the data needed to reconstruct a molecule from X-ray diffraction patterns, cutting experimental time by factors of two to twelve.  

Satellite attitude-control software on ESA’s Sentinel missions continuously computes small rotations to keep cameras pointed at Earth while the spacecraft orbits; the same rotation matrices later re-project the collected images into map coordinates.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Cartesian coordinates| Every transformation is written as an equation in \(x\) and \(y\). |
| Distance between points | Rigid transformations preserve distance; enlargement scales it. |
| Angle measure        | Rotation is defined by angle; reflection reverses orientation. |
| Midpoint             | Reflection fixes every point on the mirror line; the midpoint test detects it. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Translation as uniform displacement
A translation moves every point the same vector.  
Example: the point \((1,2)\) translated by \((3,4)\) lands at \((4,6)\).  
Formally,  
\[
(x',y') = (x+a,y+b).
\]  
> [!WARNING]  
> Treating the shift as a multiplication instead of an addition produces scaling, not translation.

### Step 2 — Reflection as perpendicular flip
Reflection across the x-axis sends \((x,y)\) to \((x,-y)\).  
The mirror line is the perpendicular bisector of every segment joining a point to its image.  
Formally, reflection across the line \(y = mx + c\) is obtained by composing a rotation that makes the line horizontal, reflecting, and rotating back.  
> [!WARNING]  
> Forgetting that reflection reverses orientation leads to the incorrect belief that every transformation preserves clockwise order.

### Step 3 — Rotation as circular motion around a centre
Rotation by angle \(\theta\) about the origin maps  
\[
(x',y') = (x\cos\theta - y\sin\theta,\, x\sin\theta + y\cos\theta).
\]  
The distance from the centre is unchanged and the angle at the centre equals \(\theta\).  
> [!WARNING]  
> Using degrees instead of radians inside trigonometric functions produces numerically wrong coordinates.

### Step 4 — Enlargement as radial scaling
Enlargement with centre \((0,0)\) and factor \(k\) gives  
\[
(x',y') = (kx,ky).
\]  
When \(k>1\) distances grow; when \(0<k<1\) they shrink.  
> [!WARNING]  
> Choosing a non-origin centre without first translating produces an incorrect image.

### Step 5 — Composition and invariance
Any sequence of the four operations is again a transformation of the same family. Translation, rotation and reflection preserve distances; enlargement multiplies them by \(|k|\). Angles are preserved in magnitude by all four; orientation is reversed only by reflection.  
The textbook statement follows at once.

## 5. Worked examples — every step shown

**Example 1 — Pure translation**  
*Given:* Square vertices \((0,0)\), \((2,0)\), \((2,2)\), \((0,2)\); translate by \((3,-1)\).  
*Find:* Image vertices.  
Step: add \(3\) to every \(x\) and \(-1\) to every \(y\).  
*Why:* translation rule is component-wise addition.  
Image: \((3,-1)\), \((5,-1)\), \((5,1)\), \((3,1)\).  
**Final answer**  
\[(3,-1),\ (5,-1),\ (5,1),\ (3,1)\]  

*Reflection:* The operation is independent of the shape; only the vector matters.

**Example 2 — Reflection across y-axis**  
*Given:* Point \((4,3)\).  
*Find:* Image after reflection in the y-axis.  
Step 1: keep \(y\), negate \(x\).  
*Why:* y-axis is the line \(x=0\).  
Image: \((-4,3)\).  
**Final answer**  
\((-4,3)\)

*Reflection:* Orientation reverses: a clockwise triangle becomes anticlockwise.

**Example 3 — Rotation about origin**  
*Given:* Point \((1,0)\); rotate \(90^\circ\) anticlockwise.  
Step 1: \(\theta = \pi/2\), \(\cos\theta=0\), \(\sin\theta=1\).  
Step 2: substitute into rotation formula.  
*Why:* formula derived from polar coordinates.  
Image: \((0,1)\).  
**Final answer**  
\((0,1)\)

*Reflection:* The same matrix works for any point; only the angle and centre must be fixed.

**Example 4 — Enlargement from a non-origin centre**  
*Given:* Point \((4,2)\); enlarge by factor 3 about centre \((1,1)\).  
Step 1: translate centre to origin: \((4-1,2-1)=(3,1)\).  
Step 2: scale: \((9,3)\).  
Step 3: translate back: \((9+1,3+1)=(10,4)\).  
*Why:* enlargement formula applies only after centre is moved to origin.  
**Final answer**  
\((10,4)\)

*Reflection:* The three-step sandwich (translate–scale–translate) is the general pattern for any non-origin centre.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying rotation matrix without subtracting the centre first | Students treat every rotation as if it were about the origin | Always translate the centre to the origin, rotate, translate back |
| Confusing reflection line with the perpendicular from a point | Visual intuition fails for oblique lines | Compute the foot of the perpendicular; the image lies the same distance on the opposite side |
| Using the wrong sign for enlargement factor | Negative \(k\) produces an extra reflection | Check whether orientation must be preserved; if yes, keep \(k>0\) |
| Adding angles in degrees to a radian formula | Calculator mode mismatch | Convert degrees to radians before inserting into \(\sin\) or \(\cos\) |
| Assuming every transformation preserves area | Enlargement scales area by \(k^2\) | Compute the absolute value of the determinant of the linear part |
| Forgetting that composition order matters | Matrix multiplication is non-commutative | Write the sequence from right to left in matrix form |
| Treating a 180° rotation as a reflection | Both reverse orientation in some sense, yet only reflection fixes a line | Test a single point not on the supposed mirror |

## 7. The textbook-precise statement
A transformation \(T\) of the Euclidean plane is a function that assigns to each point \(P\) a unique image \(T(P)\). The four basic isometries and similarities are:

- Translation by vector \(\mathbf{v}\): \(T(P)=P+\mathbf{v}\).  
- Reflection in line \(L\): \(T(P)\) is the point such that the foot of the perpendicular from \(P\) to \(L\) is the midpoint of segment \(PT(P)\).  
- Rotation about centre \(C\) by angle \(\theta\): the distance \(CP = CT(P)\) and the directed angle \(\angle PCT(P)=\theta\).  
- Enlargement (homothety) with centre \(C\) and factor \(k\neq 0\): \(T(P)\) lies on ray \(CP\) and \(CT(P)=|k|\,CP\).

When \(k=\pm 1\) the enlargement reduces to an isometry. (See: Brannan, Esplen, Gray, *Geometry*, 2e, §4.2.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
    (0,2) +----- (2,2)     after 90° rotation about (0,0)
          |      |
          |      |
    (0,0) +----- (2,0)  -->  (-2,0) <-- (0,2)  image of (2,0)
          |
          +------------------> x
```
Labelled points: original square vertices shown; image of (2,0) after rotation is (-2,0); image of (0,2) is (2,0). Axes and origin marked.

## 9. The memory technique

1. **The hook**  
   Picture four arrows on a coordinate plane: slide (translation), flip (reflection), spin (rotation), grow/shrink (enlargement). Each arrow carries its own symbol: \(\rightarrow\), mirror line, curved arrow, radial rays.

2. **What to overlearn**  
   - Translation: \((x+a,y+b)\).  
   - Rotation matrix about origin: \(\begin{pmatrix}\cos\theta & -\sin\theta\\\sin\theta & \cos\theta\end{pmatrix}\).  
   - Enlargement from origin: \((kx,ky)\).

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Return to the definitions: distance preservation for the first three, radial scaling for enlargement; recompute the image of the unit vectors \(\mathbf{i}\) and \(\mathbf{j}\).

## 10. What this unlocks
These operations generate all isometries and similarities of the plane and are the building blocks of congruence and similarity proofs. They reappear as matrix groups in linear algebra, as symmetry operations in group theory, and as the geometric layers inside convolutional neural networks that must be invariant under translation and rotation.

- Matrix representation of linear transformations  
- Symmetry groups of regular polygons  
- Change of basis and coordinate transformations  
- Computer-graphics rendering pipelines  

## 11. Self-check — five questions, no answers
1. Translate the triangle with vertices \((0,0)\), \((3,0)\), \((0,4)\) by the vector \((-2,5)\). State the new vertices.

2. Reflect the point \((5,-1)\) first across the x-axis and then across the line \(x=2\). Give the final coordinates.

3. A square centred at the origin with side length 2 is rotated \(45^\circ\) anticlockwise about the origin. Compute the coordinates of its vertices.

4. Enlarge the segment joining \((1,1)\) and \((3,2)\) by factor \(2\) with centre \((0,0)\). Does the image segment remain parallel to the original? Why?

5. Two successive reflections across parallel lines distance \(d\) apart are performed. Identify the single transformation that produces the same result and state its parameters.