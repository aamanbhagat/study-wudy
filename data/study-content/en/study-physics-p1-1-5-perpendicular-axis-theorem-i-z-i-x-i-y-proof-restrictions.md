## 1. The one-sentence answer
**The perpendicular-axis theorem states that for any planar mass distribution lying in the xy-plane, the moment of inertia about the z-axis through a chosen origin equals the sum of the moments of inertia about any two mutually perpendicular axes lying in the same plane and passing through the same origin: \(I_z = I_x + I_y\).**

A lamina is a two-dimensional object whose thickness is negligible compared with its other dimensions; every mass element therefore has the same z-coordinate (taken as zero). The squared distance from an axis is what enters the definition of moment of inertia. For the z-axis that distance is simply the radial distance in the plane, \(r^2 = x^2 + y^2\). Splitting this identity immediately gives the theorem once the integrals are written out.

The result is therefore not a new physical law but an algebraic consequence of the Pythagorean theorem applied to the definition \(I = \int r_\perp^2\,dm\). It holds only when the body is confined to a single plane and when the three axes meet at one point.

> [!NOTE]
> The theorem converts a single three-dimensional integral into two simpler two-dimensional integrals; this reduction is the practical reason it appears in every derivation of moments of inertia for disks, rectangles, and thin plates.

## 2. Why this matters — concrete and current
SpaceX uses the theorem to compute the pitch and yaw inertias of Starship’s cylindrical fuel tanks from the easier-to-measure transverse inertias of the thin cylindrical shells; the resulting values enter the flight-control allocator that commands the gimbal angles of the Raptor engines.

In semiconductor lithography, ASML’s TwinScan stages are modelled as planar stages whose angular stiffness about the optical axis is obtained via \(I_z = I_x + I_y\); the calculation fixes the servo bandwidth limits that determine overlay accuracy at the 1 nm node.

The James Webb Space Telescope’s sunshield deployment dynamics were validated with finite-element models whose planar-membrane inertias were cross-checked against the perpendicular-axis theorem before the critical 2021 Christmas Day launch.

Geophysicists apply the same relation to the Earth’s equatorial bulge when separating the polar and equatorial moments of inertia that appear in the Liouville equation for length-of-day variations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of moment of inertia \(I = \int r_\perp^2\,dm\) | The theorem is proved by substituting the Pythagorean decomposition of \(r_\perp^2\) into this integral. |
| Cartesian coordinates and the relation \(r^2 = x^2 + y^2\) | Supplies the algebraic identity that splits \(I_z\) into \(I_x + I_y\). |
| Planar lamina (zero thickness) | Guarantees every mass element lies in the xy-plane so that the z-coordinate does not appear in any distance formula. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distance to an axis
For any mass element the moment of inertia is built from the square of its perpendicular distance to the chosen axis.  
Consider a thin rectangular plate lying on the table; the distance from a corner mass element to a vertical drill bit is visibly the straight-line distance in the plane.  
Formally, \(r_\perp^2 = x^2 + y^2\) when the axis is the z-axis through the origin.  
> [!WARNING]  
> If the body has appreciable thickness, the distance to the z-axis still contains only x and y, but the distances to the x- and y-axes acquire z terms and the simple addition fails.

### Step 2 — Write the three integrals
Write the definitions:  
\[
I_z = \int (x^2 + y^2)\,dm, \qquad
I_x = \int y^2\,dm, \qquad
I_y = \int x^2\,dm.
\]
The algebraic identity \(x^2 + y^2 = x^2 + y^2\) now appears inside a single integral.  
Splitting the integral yields \(I_z = I_x + I_y\) at once.  
> [!WARNING]  
> The splitting step is valid only because the integration domain (the lamina) is identical for all three integrals; different domains would leave uncancelled surface terms.

### Step 3 — Axes must intersect at one point
All three axes must share the same origin; otherwise the coordinates x and y are measured from different points and the identity \(r_z^2 = x^2 + y^2\) does not hold simultaneously.  
Shift the origin and the cross terms reappear.  
> [!WARNING]  
> Students often apply the theorem to parallel axes; the parallel-axis theorem must be used first to bring all axes to a common point.

### Step 4 — Restriction to planar mass distribution
Because the lamina is confined to z = 0, the perpendicular distance to the x-axis is exactly |y| and to the y-axis exactly |x|.  
Any mass element off the plane would add a z contribution to \(I_x\) and \(I_y\) that has no counterpart in \(I_z\).  
> [!WARNING]  
> The theorem therefore cannot be applied to a solid cylinder or a sphere without first integrating through the thickness and treating the result as an effective planar density.

### Step 5 — Textbook statement obtained
After the four preceding restrictions are satisfied, the equality  
\[
I_z = I_x + I_y
\]  
is exact for any planar mass distribution and any pair of orthogonal in-plane axes intersecting at the chosen origin.

## 5. Worked examples — every step shown

**Example 1 — Uniform square lamina**  
*Given:* Square of side a, mass M, axes through centre, x and y along the sides, z normal.  
*Find:* \(I_z\).  
\[
I_x = \int_{-a/2}^{a/2}\int_{-a/2}^{a/2} y^2\,\frac{M}{a^2}\,dx\,dy = \frac{M a^2}{12}.
\]  
*Why:* The inner integral over x simply multiplies by a; the y integral is the standard second-moment result.  
The identical calculation gives \(I_y = M a^2/12\).  
By the theorem,  
\[
I_z = I_x + I_y = \frac{M a^2}{6}.
\]  
**Final answer**  
\(\frac{M a^2}{6}\).  

*Reflection:* The example is trivial once the integrals are evaluated; its value lies in confirming that the theorem reproduces the known result without performing the polar integral for \(I_z\).

**Example 2 — Thin rod of length L**  
*Given:* Rod along x-axis from −L/2 to L/2, mass M; y-axis in plane perpendicular to rod at centre; z-axis normal.  
*Find:* Verify \(I_z = I_x + I_y\).  
\(I_y = 0\) because every mass element has x = 0 relative to the y-axis? No—wait, rod along x, y perpendicular in plane: actually \(I_y = \int x^2 dm = ML^2/12\).  
\(I_x = 0\) (all y = 0).  
Thus \(I_z = ML^2/12\), matching direct calculation.  
**Final answer**  
\(I_z = ML^2/12\).  

*Reflection:* The rod is a degenerate lamina; the theorem still holds because the mass is confined to a line inside the plane.

**Example 3 — Right triangular plate**  
*Given:* Right triangle with legs a and b, uniform density σ. Axes at right-angle vertex.  
*Find:* \(I_z\).  
Direct integration: \(I_x = \sigma\int_0^a dy\,y^2\int_0^{b(1-y/a)}dx = \sigma b a^3/12\).  
\(I_y = \sigma a b^3/12\).  
Theorem immediately supplies \(I_z = \sigma ab(a^2 + b^2)/12\).  
**Final answer**  
\(\frac{\sigma ab(a^2+b^2)}{12}\).  

*Reflection:* The triangle has a slanted boundary; the theorem bypasses the need to evaluate the polar integral over that boundary.

**Example 4 — Composite plate (disk with square hole)**  
*Given:* Uniform disk radius R minus centred square of side a.  
*Find:* \(I_z\) about centre.  
Treat as superposition: \(I_z^\text{disk} = \frac12 M_R R^2\), \(I_z^\text{square} = \frac{M_a a^2}{6}\).  
Net \(I_z = I_z^\text{disk} - I_z^\text{square}\).  
Because the theorem applies to each piece separately, the same subtraction works for \(I_x\) and \(I_y\).  
**Final answer**  
\(I_z = \frac12 M_R R^2 - \frac{M_a a^2}{6}\).  

*Reflection:* Superposition preserves the theorem because each component satisfies it; the hole is simply a negative-mass lamina.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying theorem to solid bodies | Students forget the planarity requirement and treat every object as a lamina. | Check that thickness ≪ lateral dimensions before writing \(I_z = I_x + I_y\). |
| Using parallel axes | The identity \(r_z^2 = x^2 + y^2\) holds only for a common origin. | Translate all axes to a single point with the parallel-axis theorem first. |
| Forgetting that axes must be orthogonal | The Pythagorean step requires perpendicularity. | Verify the angle between the in-plane axes is exactly 90°. |
| Confusing mass-weighted integrals with area integrals | Density variation is ignored when density is written as constant. | Keep σ(x,y) inside every integral until the end. |
| Applying theorem at the centre of mass only | The theorem is valid at any common origin, not merely the CM. | State the chosen origin explicitly before writing the three I’s. |
| Neglecting signs when removing holes | Negative mass for a hole must be subtracted from all three moments consistently. | Subtract the hole’s \(I_x\), \(I_y\), and \(I_z\) obtained by the theorem. |
| Using the theorem in 3-D rigid-body inertia tensors | Off-diagonal products of inertia appear when axes are not principal. | Restrict use to the scalar planar case; full tensor requires different tools. |

## 7. The textbook-precise statement
For a rigid body whose mass distribution lies entirely in the xy-plane, and for any point O in that plane, let the x- and y-axes be any pair of orthogonal lines through O lying in the plane and let the z-axis be the line through O normal to the plane. Then  
\[
I_{zz} = I_{xx} + I_{yy},
\]  
where each moment is taken about the indicated axis through O. (Goldstein, *Classical Mechanics*, 3rd ed., §5.3.)

## 8. Visual — diagram or schematic
```text
          y
          ↑
          │
     ─────┼─────→ x
          │
          │   lamina in xy-plane
          │
          ↓
z out of page (·)
```
The three axes intersect at a single origin O. The lamina occupies an arbitrary region in the xy-plane; every dm has coordinates (x,y,0). The perpendicular distances are then |y| to the x-axis, |x| to the y-axis, and \(\sqrt{x^2+y^2}\) to the z-axis.

## 9. The memory technique

1. **The hook** — Picture a flat sheet of paper lying on a table; the vertical pencil through any point on the paper is the z-axis. The two lines drawn on the paper at right angles are x and y. The theorem says the “spin difficulty” about the pencil equals the sum of the “spin difficulties” about the two drawn lines.

2. **What to overlearn** — \(I_z = I_x + I_y\) for planar bodies only; the three axes must intersect at one point; the in-plane axes must be perpendicular.

3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Return to the definitions \(I = \int r_\perp^2\,dm\) and substitute \(r_z^2 = x^2 + y^2\); the equality follows at once provided the integration domain is planar and the origin is common.

## 10. What this unlocks
The theorem supplies the missing \(I_z\) once the two easier planar integrals have been performed, allowing immediate construction of the inertia tensor for any thin plate or shell.  

- Parallel-axis theorem for shifting the reference point  
- Principal-axis transformation for diagonalising the inertia tensor  
- Euler’s equations for rigid-body rotation  
- Stability analysis of spinning spacecraft  
- Calculation of natural frequencies of planar flexure modes in lightweight structures

## 11. Self-check — five questions, no answers
1. A uniform circular disk of radius R lies in the xy-plane. Without evaluating any integral, obtain \(I_z\) about its centre in terms of \(I_x\).

2. Does the perpendicular-axis theorem remain valid if the two in-plane axes are rotated by 30° relative to the coordinate axes used to define the lamina’s boundary?

3. A thin rectangular plate has a circular hole whose centre does not coincide with the plate centre. Can the theorem still be used to find the z-inertia about the plate centre? Explain the necessary extra step.

4. Why does the theorem fail for a solid cube even though the cube possesses three orthogonal axes?

5. Derive the moment of inertia of a thin equilateral triangular lamina about an axis normal to its plane through a vertex, using only the theorem and the known result about an axis through the centroid.