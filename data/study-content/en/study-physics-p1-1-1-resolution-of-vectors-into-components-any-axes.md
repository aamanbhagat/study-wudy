## 1. The one-sentence answer
**Resolution of a vector into components along any axes means expressing the vector as the sum of two (or three) vectors, each lying exactly along one chosen axis, whose lengths are the projections of the original vector onto those axes.**

Any vector possesses only magnitude and direction. When you select a pair of axes—rotated by an arbitrary angle relative to a fixed reference—the vector’s effect along each axis is isolated by dropping perpendiculars from its tip to the axes. These perpendicular distances, scaled by the cosine or sine of the angle between the vector and the axis, become the component magnitudes. The original vector is recovered exactly when the two component vectors are added head-to-tail. This decomposition works for any orientation of the axes because the underlying geometry of similar triangles remains unchanged.

The procedure is identical in three dimensions: three mutually perpendicular axes yield three scalar components. The choice of axis directions is dictated by the symmetry of the physical problem rather than by any universal coordinate frame.

> [!NOTE]
> The components are not unique properties of the vector; they are properties of the chosen axes. Rotate the axes and the numerical values change while the vector itself remains identical.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing algorithm resolves the vehicle’s velocity vector into components parallel and perpendicular to the landing platform at every guidance cycle; the perpendicular component directly supplies the throttle command that nulls lateral drift.

In semiconductor lithography, ASML’s extreme-ultraviolet scanners resolve overlay-error vectors measured by metrology tools onto the stage’s fast-scan and slow-scan axes; the resulting component corrections are fed to piezoelectric actuators whose bandwidth exceeds 1 kHz.

During the Mars 2020 entry, descent, and landing sequence, the spacecraft’s inertial measurement unit supplied a velocity vector that was continuously decomposed along the heat-shield symmetry axis and the lift-vector plane; the lift-vector component determined bank-angle commands that steered the vehicle to the target ellipse.

Seismic waves arriving at an array of geophones are resolved into radial and transverse components relative to the source-receiver line; petroleum exploration companies such as Schlumberger use these components to separate compressional from shear energy before migration.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector definition        | Components are themselves vectors; you must already treat magnitude and direction as a single entity. |
| Sine and cosine definitions | Projections are trigonometric ratios of the angle between the vector and the chosen axis. |
| Pythagorean theorem      | Orthogonal components recombine to the original magnitude via \(a^2 + b^2 = c^2\). |
| Similar triangles        | The geometry that justifies \(A_x = A\cos\theta\) is similarity between the component triangle and the unit circle. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A vector is an arrow
A vector is completely specified by its length and the direction in which the arrow points. Draw any arrow; its length is fixed, yet you may view it from any angle.

### Step 2 — Axes are reference lines you impose
Choose two lines that intersect at the tail of the arrow and lie at any angle you like. These lines are the axes. Their orientation is chosen for convenience, not dictated by the vector.

### Step 3 — Drop perpendiculars
From the tip of the arrow drop a perpendicular to each axis. The foot of each perpendicular marks the end of a segment lying exactly on that axis. These segments are the component vectors.

### Step 4 — Length of each segment is a projection
The length of the segment on an axis equals the original magnitude multiplied by the cosine of the angle between the original arrow and that axis.  
\[
A_x = A\cos\theta_x
\]
where \(\theta_x\) is the angle between \(\mathbf{A}\) and the chosen \(x\)-axis.

### Step 5 — The complementary component follows automatically
Because the two axes are perpendicular, the second component is obtained from the sine of the same angle or, equivalently, from the cosine of the complementary angle:  
\[
A_y = A\sin\theta_x = A\cos(90^\circ - \theta_x).
\]

### Step 6 — Vector reconstruction
Adding the two component vectors head-to-tail recovers the original arrow exactly:  
\[
\mathbf{A} = A_x\hat{i} + A_y\hat{j}.
\]
This equality is an identity; it holds for any orientation of the axes.

### Step 7 — General axes via direction cosines
When the axes are rotated by an arbitrary angle \(\phi\) relative to a fixed frame, the direction cosines \(\cos\alpha\) and \(\cos\beta\) (where \(\alpha\) and \(\beta\) are angles with the new axes) replace the simple trigonometric functions. The component formulas remain formally identical.

### Step 8 — Textbook statement
Any vector \(\mathbf{A}\) may be expressed in an orthonormal basis \(\{\hat{e}_1,\hat{e}_2\}\) oriented at any angle by the linear combination  
\[
\mathbf{A} = (\mathbf{A}\cdot\hat{e}_1)\hat{e}_1 + (\mathbf{A}\cdot\hat{e}_2)\hat{e}_2.
\]

> [!WARNING]
> If the axes are mistakenly assumed to coincide with the vector’s own direction, both components collapse to a single non-zero value and the reconstruction identity fails.

## 5. Worked examples — every step shown

**Example 1 — 30° launch velocity**  
*Given:* Velocity vector of magnitude 40 m s⁻¹ at 30° to the horizontal.  
*Find:* Horizontal and vertical components.  

\[
v_x = 40\cos 30^\circ = 40 \times \frac{\sqrt{3}}{2} = 20\sqrt{3}\ \text{m s}^{-1}
\]
*Why:* cosine gives adjacent side to the angle with the horizontal axis.  

\[
v_y = 40\sin 30^\circ = 40 \times 0.5 = 20\ \text{m s}^{-1}
\]
*Why:* sine gives opposite side to the same angle.  

**Final answer**  
**\(v_x = 20\sqrt{3}\) m s⁻¹, \(v_y = 20\) m s⁻¹**

*Reflection:* The angle was measured from the axis itself; swapping sine and cosine is the most common first error.

**Example 2 — Force on an inclined plane**  
*Given:* 100 N force acting parallel to a 20° incline.  
*Find:* Components parallel and perpendicular to the incline (axes aligned with the incline).  

The parallel axis coincides with the force, so  
\[
F_\parallel = 100\ \text{N},\qquad F_\perp = 0
\]
*Why:* angle between force and parallel axis is zero; cosine of zero is unity.

*Reflection:* When an axis is chosen along the vector, one component vanishes—an immediate sanity check.

**Example 3 — Arbitrary 37° axes**  
*Given:* Vector \(\mathbf{A} = 5\hat{i} + 12\hat{j}\). Axes rotated 37° counterclockwise from the original \(x\)-axis.  
*Find:* Components along the new axes.  

Direction cosines: \(\cos 37^\circ \approx 0.7986\), \(\sin 37^\circ \approx 0.6018\).  
\[
A_{x'} = A_x\cos 37^\circ + A_y\sin 37^\circ = 5(0.7986) + 12(0.6018) = 11.214
\]
*Why:* each original component contributes its projection onto the new axis.  

\[
A_{y'} = -A_x\sin 37^\circ + A_y\cos 37^\circ = -5(0.6018) + 12(0.7986) = 6.572
\]
*Why:* the negative sign appears because the new \(y'\) axis is 90° counterclockwise from \(x'\).

**Final answer**  
**\(A_{x'} \approx 11.21\), \(A_{y'} \approx 6.57\)**

*Reflection:* Matrix rotation formula is simply the dot-product definition written component-wise.

**Example 4 — Three-dimensional case**  
*Given:* Position vector \(\mathbf{r} = (3,4,12)\) m.  
*Find:* Components along an axis set whose unit vectors satisfy direction cosines \(\ell=0.6\), \(m=0.8\), \(n=0\) for the first new axis.  

\[
r_1 = \mathbf{r}\cdot\hat{e}_1 = 3(0.6) + 4(0.8) + 12(0) = 5\ \text{m}
\]
*Why:* definition of scalar projection.  

The remaining two orthogonal axes are constructed by Gram–Schmidt; their components follow identically.

**Final answer**  
**\(r_1 = 5\) m (first new axis)**

*Reflection:* The same dot-product rule extends without modification to any dimension.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Swapping sine and cosine            | Angle is measured from the wrong axis               | Always identify which side is adjacent to the chosen axis |
| Treating components as scalars only | Forgetting they are directed quantities             | Attach the correct unit vector after each calculation |
| Assuming components are invariant   | Axes are rotated without recalculating angles       | Recalculate \(\theta\) for every new axis orientation |
| Using non-orthogonal axes without adjustment | Expecting Pythagoras to hold                        | Verify orthogonality before applying \(A^2 = A_x^2 + A_y^2\) |
| Sign errors in rotated frames       | Missing the quadrant or rotation sense              | Draw the original vector and both axis sets on the same diagram |
| Neglecting the reconstruction check | Accepting numerical values without verification     | Always recompute \(\sqrt{A_x^2 + A_y^2}\) and compare with original magnitude |
| Confusing projection with component | Using the full magnitude instead of the adjacent side | Remember the projection is the adjacent leg of the right triangle |

## 7. The textbook-precise statement
Let \(\mathbf{A}\) be a vector in a Euclidean space and let \(\{\hat{e}_i\}\) be any orthonormal basis. Then there exist unique scalars \(A_i\) such that  
\[
\mathbf{A} = \sum_i A_i\hat{e}_i,\qquad A_i = \mathbf{A}\cdot\hat{e}_i.
\]
The scalars \(A_i\) are the components of \(\mathbf{A}\) with respect to the basis \(\{\hat{e}_i\}\). (See Goldstein, Poole & Safko, *Classical Mechanics*, 3e, §1.2.)

## 8. Visual — diagram or schematic
```text
          A
         /|
        / |  A_y
       /  |
      /   |
     /θ___|
    /_____|
       A_x
Axes rotated by φ from horizontal:
x' axis at angle φ, y' axis at φ+90°.
Perpendiculars from tip of A land on both x' and y'.
```
The diagram shows the original vector \(\mathbf{A}\) and the right triangle formed with the chosen \(x\)-axis; the angle \(\theta\) is measured from that axis to \(\mathbf{A}\).

## 9. The memory technique
1. **The hook** — Picture the vector as a flashlight beam and the axes as two perpendicular walls; the brightness on each wall is the component.
2. **What to overlearn** — \(A_x = A\cos\theta\), \(A_y = A\sin\theta\), and the reconstruction identity \(\mathbf{A} = A_x\hat{i} + A_y\hat{j}\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from similar triangles: the component triangle is similar to the unit-circle triangle, so ratios of sides are cosine and sine.

## 10. What this unlocks
Mastery of arbitrary-axis resolution permits immediate transition to non-Cartesian coordinate systems, constrained motion on inclined planes, and the decomposition of forces and momenta in rocket nozzle and guidance problems.

- Projectile motion on inclined planes
- Rotation matrices and orthogonal transformations
- Lagrangian mechanics with generalized coordinates aligned to constraints
- Stress-tensor principal-axis transformations in continuum mechanics

## 11. Self-check — five questions, no answers
1. A 12 N force acts at 50° to a chosen axis. Calculate the component along that axis and the component perpendicular to it.
2. A velocity vector \(\mathbf{v} = 3\hat{i} - 4\hat{j}\) is to be resolved onto axes rotated 30° clockwise. Find the new components.
3. Explain why the magnitude of a vector is independent of axis orientation while its components are not.
4. A student obtains components whose Pythagorean sum exceeds the original magnitude. What single assumption is most likely violated?
5. In a three-dimensional orthonormal frame whose first axis makes angles 60°, 45°, and 60° with the fixed \(x,y,z\) axes respectively, resolve the vector \(\mathbf{r} = (1,2,2)\).