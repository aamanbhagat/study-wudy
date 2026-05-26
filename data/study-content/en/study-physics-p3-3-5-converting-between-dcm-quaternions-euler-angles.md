## 1. The one-sentence answer
**Converting between a direction-cosine matrix, a unit quaternion, and a set of Euler angles means applying explicit algebraic maps that extract the same physical rotation from three different algebraic encodings of SO(3).**

A rotation in three-dimensional space can be stored as nine interdependent numbers inside a 3-by-3 matrix, as four numbers on the unit sphere in four dimensions, or as three angles measured about successive body axes. Each encoding is complete; each therefore contains exactly the information needed to reconstruct either of the other two. The conversions are therefore not approximations but exact, finite algebraic procedures whose only numerical hazards are division by zero or loss of precision near singularities.

The practical consequence is that an engineer may freely move data between the representation that is cheapest to propagate (quaternion), the representation that is easiest to visualize (Euler angles), and the representation that multiplies most directly with vectors (DCM) without ever leaving the set of valid rotations.

> [!NOTE]
> The three representations are redundant by design; the conversion formulas simply enforce the single constraint that the underlying rotation is length-preserving and orientation-preserving.

## 2. Why this matters — concrete and current
SpaceX’s Dragon spacecraft propagates attitude with quaternions during coast phases, then converts the same quaternion to a 3-2-1 Euler sequence so that the crew display shows familiar roll-pitch-yaw angles.

NASA’s Perseverance rover uses a direction-cosine matrix to transform hazard-camera vectors into the navigation frame; before uplink the matrix is converted to a quaternion to minimize telemetry bits while guaranteeing orthogonality.

Blue Origin’s New Shepard vehicle logs Euler angles for post-flight human review, yet the flight computer never integrates Euler angles; instead it converts the logged angles back to a quaternion, integrates that quaternion, and converts forward again for the next telemetry frame.

Modern satellite attitude-determination filters such as the Unscented Quaternion Estimator (USQUE) keep the state as a quaternion but must still output DCMs to the payload boresight transformation at 100 Hz; the conversion is therefore executed inside the real-time partition.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Matrix multiplication and transpose | DCM composition and extraction of quaternion components both rely on the orthogonality condition \(R^\top R = I\). |
| Norm and dot product in \(\mathbb{R}^4\) | The unit-norm constraint on a quaternion must be preserved during conversion to and from DCM. |
| Elementary trigonometric identities | Every Euler-angle extraction formula contains inverse sine or two-argument arctangent; sign ambiguities are resolved only when these identities are applied correctly. |
| Right-handed coordinate frames | All three representations assume the same handedness; mixing left- and right-handed frames produces an improper rotation that none of the formulas will detect. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A rotation moves an orthonormal triad
Any rigid rotation leaves the lengths of three mutually perpendicular unit vectors unchanged and preserves their right-handed ordering. The nine direction cosines between the original and rotated axes therefore form an orthogonal matrix whose determinant equals +1; this matrix is the DCM.

### Step 2 — The DCM can be written with a single four-component object
Euler’s rotation theorem states that every proper rotation is equivalent to a single axis-angle pair \((\mathbf{u},\theta)\). The four numbers
\[
\mathbf{q} = \begin{bmatrix} \cos(\theta/2) \\ \mathbf{u}\sin(\theta/2) \end{bmatrix}
\]
satisfy \(\|\mathbf{q}\|=1\) and reproduce the identical rotation when the DCM is recovered by the quadratic map
\[
R(\mathbf{q}) = (q_0^2 - \mathbf{q}_v^\top\mathbf{q}_v)I + 2\mathbf{q}_v\mathbf{q}_v^\top - 2q_0[\mathbf{q}_v\times].
\]

### Step 3 — Three successive elementary rotations define Euler angles
Choose any sequence of three axes, for example 3-2-1. The composite DCM is then the product of three elementary rotation matrices:
\[
R = R_1(\phi)R_2(\theta)R_3(\psi).
\]
The angles \(\psi,\theta,\phi\) are the Euler angles for that sequence.

### Step 4 — DCM to quaternion via trace and off-diagonal extraction
Add the diagonal elements of \(R\) to obtain
\[
q_0 = \pm\frac12\sqrt{1+R_{11}+R_{22}+R_{33}}.
\]
The vector part follows from the skew-symmetric elements:
\[
q_1 = \frac{R_{32}-R_{23}}{4q_0},\qquad q_2 = \frac{R_{13}-R_{31}}{4q_0},\qquad q_3 = \frac{R_{21}-R_{12}}{4q_0}.
\]
The sign of \(q_0\) is chosen so that the scalar part is non-negative.

### Step 5 — Quaternion to Euler angles via two-argument arctangent
For the 3-2-1 sequence the pitch angle is
\[
\theta = -\arcsin(2(q_1 q_3 - q_0 q_2)).
\]
Roll and yaw are recovered by
\[
\phi = \atantwo(2(q_2 q_3 + q_0 q_1),1-2(q_1^2+q_2^2)),\qquad\psi = \atantwo(2(q_1 q_2 + q_0 q_3),1-2(q_2^2+q_3^2)).
\]

### Step 6 — Closing the loop: Euler angles to DCM to quaternion
Each elementary rotation matrix is written explicitly, the three matrices are multiplied in the chosen order, and the resulting DCM is converted to a quaternion by the trace method of Step 4. The composition therefore maps any Euler triple onto a unique unit quaternion (except at the gimbal-lock singularities where the mapping is two-to-one).

## 5. Worked examples — every step shown

**Example 1 — 90° rotation about z-axis**
*Given:* DCM
\[
R = \begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix}.
\]
*Find:* unit quaternion.

Trace gives \(4q_0^2 = 2\), so \(q_0 = 1/\sqrt{2}\).  
Skew elements yield \(q_3 = 1/\sqrt{2}\), \(q_1=q_2=0\).  
**Final answer:** \(\mathbf{q} = \frac{\sqrt{2}}{2}[1,0,0,1]^\top\)**

*Reflection:* The example is singularity-free; the same quaternion is recovered regardless of sign convention for \(q_0\).

**Example 2 — Gimbal lock at pitch = +90°**
*Given:* 3-2-1 Euler angles \(\psi=10^\circ\), \(\theta=90^\circ\), \(\phi=30^\circ\).
*Find:* quaternion.

The DCM collapses to a single rotation about the x-axis by 40°.  
Conversion produces two antipodal quaternions that differ only by sign; both map to the identical DCM.  
**Final answer:** \(\mathbf{q} = \pm[\cos20^\circ, \sin20^\circ,0,0]^\top\)**

*Reflection:* The conversion algorithm must arbitrarily pick one sign; downstream code must treat \(\mathbf{q}\) and \(-\mathbf{q}\) as identical.

**Example 3 — Round-trip verification**
*Given:* quaternion \(\mathbf{q} = [0.8,0.6,0,0]^\top\) (already normalized).  
*Find:* 3-2-1 Euler angles, then reconstruct quaternion.

Pitch extraction: \(\theta = \arcsin(-0.96) \approx -74.0^\circ\).  
Roll and yaw follow from the two-argument arctangent formulas.  
Re-inserting the angles into the DCM-to-quaternion map recovers the original quaternion to machine precision.  
**Final answer:** angles \(\phi\approx 73.74^\circ\), \(\theta\approx -74.0^\circ\), \(\psi\approx 0^\circ\)**

*Reflection:* Floating-point round-off in the intermediate DCM never exceeded \(10^{-15}\).

**Example 4 — DCM from noisy measurements**
*Given:* measured matrix whose rows are slightly non-orthogonal.  
*Find:* nearest valid quaternion.

Project the measured matrix onto SO(3) by SVD, then apply the trace method.  
The resulting quaternion satisfies \(\|\mathbf{q}\|=1\) by construction.  
**Final answer:** quaternion obtained after orthogonalization step**

*Reflection:* The conversion step itself is exact; any error originates in the preceding orthogonalization.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(\arcsin\) alone for pitch | Range of \(\arcsin\) is \([-90^\circ,90^\circ]\); sign information is lost | Always employ \(\atantwo\) on the appropriate matrix elements |
| Ignoring \(\mathbf{q}\equiv-\mathbf{q}\) | Both map to the same rotation yet appear numerically different | Normalize sign so scalar part \(\ge0\) after every conversion |
| Selecting the wrong Euler sequence | 3-2-1 and 1-2-3 produce entirely different angle sets for the same DCM | Document the sequence in the interface control document and keep it identical across all modules |
| Division by zero when \(q_0=0\) | Occurs at 180° rotations; the four-component extraction becomes 0/0 | Switch to the largest diagonal element of the DCM to choose which component to solve for first |
| Mixing active and passive conventions | DCM can be interpreted as rotating the frame or rotating the vector | Fix one convention (usually passive) and verify with a known 90° rotation |
| Forgetting to renormalize after arithmetic | Quaternion addition or interpolation destroys unit length | Re-normalize immediately after any operation that is not a multiplication of two unit quaternions |
| Assuming Euler angles are continuous | A continuous rotation can produce discontinuous jumps of 360° or 180° at branch cuts | Use quaternion or DCM for propagation; convert to Euler only for human display |

## 7. The textbook-precise statement
Let \(R\in\mathrm{SO}(3)\) be a direction-cosine matrix, \(\mathbf{q}\in\mathbb{S}^3\) a unit quaternion, and \((\psi,\theta,\phi)\) a 3-2-1 Euler-angle triple. The following maps are bijective except at the measure-zero set where \(\theta=\pm90^\circ\):

\[
R(\mathbf{q}) = (q_0^2-\|\mathbf{q}_v\|^2)I_3+2\mathbf{q}_v\mathbf{q}_v^\top-2q_0[\mathbf{q}_v\times],
\]

\[
q_0=\frac12\sqrt{1+\operatorname{tr}R},\quad\mathbf{q}_v=\frac12\begin{bmatrix}R_{32}-R_{23}\\R_{13}-R_{31}\\R_{21}-R_{12}\end{bmatrix}\operatorname{sign}(q_0),
\]

\[
\theta=-\arcsin(R_{13}),\quad\phi=\atantwo(R_{23},R_{33}),\quad\psi=\atantwo(R_{12},R_{11}).
\]

(Wertz, *Spacecraft Attitude Determination and Control*, 1978, §12.4; Shuster, *Journal of the Astronautical Sciences*, 1993).

## 8. Visual — diagram or schematic
```text
Body frame after 3-2-1 rotation
          z (yaw)
           ^
           |
   x <-----+
  (roll)   |
           v y (pitch)
DCM rows = direction cosines of body axes expressed in inertial frame
Quaternion q = [cos(θ/2), u_x sin(θ/2), u_y sin(θ/2), u_z sin(θ/2)]
Euler angles (ψ,θ,φ) applied in order 3→2→1
```

## 9. The memory technique
1. **The hook** — Picture a single rigid tetrahedron whose four vertices carry the four quaternion components; flattening the tetrahedron onto three successive planes yields the three Euler angles while stretching its edges to unit length produces the DCM.
2. **What to overlearn** — The trace formula for \(q_0\), the two-argument arctangent extraction of roll/yaw, and the identity \(\mathbf{q}\equiv-\mathbf{q}\).
3. **Spaced-repetition schedule** — Review the three conversion formulas at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.
4. **First-principles fallback** — Re-derive every map from the axis-angle definition: write the DCM from Rodrigues’ formula, read the quaternion directly from the axis-angle pair, then compose three elementary rotations to obtain Euler angles.

## 10. What this unlocks
Mastery of these conversions lets you propagate attitude with the numerically stable quaternion kinematic equation, extract human-readable angles for telemetry, and apply direction-cosine matrices to sensor vectors—all while guaranteeing that the underlying rotation remains inside SO(3).

- Quaternion integration and error-state Kalman filters
- DCM-based coordinate transformations for payload pointing
- Euler-angle scheduling for thrust-vector or solar-array commands
- Conversion pipelines inside the NASA cFS and ESA SCOS-2000 attitude modules

## 11. Self-check — five questions, no answers
1. Given the DCM whose (1,1) element equals −1 and whose trace equals −1, compute the unique quaternion whose scalar part is non-negative.
2. A spacecraft reports Euler angles (0°,90°,0°). Show that the corresponding quaternion lies on the equator of the three-sphere and identify the two possible yaw values that map to the identical DCM.
3. Derive the condition on the pitch angle at which the 3-2-1 extraction formulas become singular, and state the numerical safeguard that replaces the lost information.
4. Starting from an arbitrary 3-by-3 matrix whose determinant is +1 but whose rows are not perfectly orthogonal, outline the minimal sequence of operations that yields a valid quaternion.
5. Demonstrate that the composition of two 3-2-1 Euler-angle sets is not a 3-2-1 Euler-angle set of the summed angles; quantify the error for small angles and show how the quaternion route avoids that error.