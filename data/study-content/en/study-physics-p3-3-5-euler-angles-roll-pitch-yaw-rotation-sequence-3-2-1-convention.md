## 1. The one-sentence answer
**Euler angles in the 3-2-1 convention describe any orientation of a rigid body by three successive intrinsic rotations: a yaw angle ψ about the body-fixed z-axis, followed by a pitch angle θ about the resulting body y-axis, and finally a roll angle φ about the resulting body x-axis.**

These three angles therefore replace the nine redundant entries of a direction-cosine matrix with three independent scalars that are easy to visualize and to command. In aerospace vehicles the sequence matches the physical order in which pilots and autopilots apply controls: first steer left or right (yaw), then raise or lower the nose (pitch), then bank the wings (roll). Because each rotation occurs about an axis that has already been carried by the previous rotation, the final attitude is obtained by multiplying the three elementary rotation matrices in the order R = R₁(φ) R₂(θ) R₃(ψ).

The representation is minimal yet complete for all attitudes except those where the pitch angle reaches ±90°, at which point yaw and roll become indistinguishable.

> [!NOTE]
> The 3-2-1 sequence is chosen because it aligns with the dominant aerodynamic and inertial couplings of atmospheric flight; any other fixed sequence (for example 1-2-3) produces different kinematic singularities and different numerical behavior inside flight computers.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage boost-back burn uses a 3-2-1 Euler-angle command stack to rotate the vehicle from its high-velocity exo-atmospheric attitude into the precise retrograde orientation required for re-entry; the flight computer integrates the kinematic differential equations written in these angles at 100 Hz.

NASA’s Ingenuity Mars Helicopter maintains level flight by continuously estimating roll φ and pitch θ from IMU data while the yaw angle ψ is allowed to drift; the 3-2-1 convention matches the rotorcraft’s natural stability axes and keeps the pitch singularity far from the small angles flown.

Modern satellite attitude-determination software, such as the onboard Kalman filter on ESA’s Sentinel-1 constellation, ingests star-tracker quaternions and converts them to 3-2-1 Euler angles only for ground-operator telemetry because pilots and mission controllers still think in “yaw–pitch–roll” terms.

In high-performance fighter jets such as the F-35, the control-law gain scheduler is indexed by angle-of-attack and sideslip, both of which are trigonometric functions of the 3-2-1 pitch and yaw angles; the same angles are also the direct inputs to the control-stick feel system.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Direction-cosine matrix (DCM) | The 3-2-1 sequence is simply the factorization of an arbitrary DCM into three elementary plane rotations; every subsequent formula is derived from matrix multiplication of these DCMs. |
| Elementary rotation matrices R₁(α), R₂(β), R₃(γ) | Each Euler angle corresponds to one of these matrices; their explicit 3-by-3 forms must be recalled instantly. |
| Body-fixed versus inertial axes | The 3-2-1 rotations are intrinsic (body-carried), so the angular-velocity addition rule must be applied in the body frame. |
| Trigonometric identities for sin/cos of multiple angles | Extraction of Euler angles from a measured DCM requires arctangents whose arguments contain products of sines and cosines. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single rotation moves a vector in a plane
Any rigid-body orientation can be reached by rotating an orthonormal triad. Begin with one rotation about a fixed axis: a vector lying in the plane perpendicular to that axis traces a circle whose radius is preserved.

Example: rotate the inertial frame about its own z-axis by angle ψ. The new x-axis lies at angle ψ from the old x-axis.  
The corresponding DCM is  
$$
R_3(\psi)=\begin{pmatrix}\cos\psi&-\sin\psi&0\\\sin\psi&\cos\psi&0\\0&0&1\end{pmatrix}.
$$
> [!WARNING] If you treat the angle as extrinsic (space-fixed) instead of intrinsic (body-fixed), the multiplication order reverses and every subsequent transformation is wrong.

### Step 2 — Two successive rotations about different axes
After the first rotation the body y-axis has moved. The second rotation must be performed about this already-rotated axis; otherwise the sequence ceases to be intrinsic.

Apply a pitch rotation θ about the new y-axis. Its elementary matrix is  
$$
R_2(\theta)=\begin{pmatrix}\cos\theta&0&\sin\theta\\0&1&0\\-\sin\theta&0&\cos\theta\end{pmatrix}.
$$
The composite transformation after yaw then pitch is the product R₂(θ) R₃(ψ).

### Step 3 — Third rotation completes the attitude
A final roll φ about the twice-rotated x-axis supplies the missing degree of freedom. Its matrix is  
$$
R_1(\phi)=\begin{pmatrix}1&0&0\\0&\cos\phi&-\sin\phi\\0&\sin\phi&\cos\phi\end{pmatrix}.
$$
The total direction-cosine matrix from inertial to body axes is therefore  
$$
R=R_1(\phi)R_2(\theta)R_3(\psi).
$$

### Step 4 — Angular velocity in body axes
Differentiate the attitude matrix while remembering that each angle changes with time. The body angular velocity ω = [p q r]ᵀ satisfies  
$$
\omega=\begin{bmatrix}1&0&-\sin\theta\\0&\cos\phi&\sin\phi\cos\theta\\0&-\sin\phi&\cos\phi\cos\theta\end{bmatrix}\begin{bmatrix}\dot\phi\\\dot\theta\\\dot\psi\end{bmatrix}.
$$
This kinematic relation is obtained by adding the three instantaneous rotation vectors expressed in the final body frame.

### Step 5 — Extraction of angles from a measured DCM
Given an arbitrary DCM C, the 3-2-1 angles are recovered by  
$$
\theta=-\arcsin(C_{13}),\qquad\phi=\atantwo(C_{23},C_{33}),\qquad\psi=\atantwo(C_{12},C_{11}),
$$
provided |θ| < 90°. At θ = ±90° the arctangent arguments become indeterminate; this is the classic gimbal-lock singularity.

## 5. Worked examples — every step shown

**Example 1 — Identity attitude**  
*Given:* All Euler angles zero.  
*Find:* The DCM R.  
R₃(0) = I, R₂(0) = I, R₁(0) = I.  
Matrix multiplication yields R = I.  
**R = I**  
*Reflection:* The trivial case confirms that the multiplication order is consistent with an unrotated body.

**Example 2 — Pure yaw of 90°**  
*Given:* φ = 0, θ = 0, ψ = 90°.  
*Find:* R.  
R₃(π/2) rotates x into y; subsequent matrices remain identity.  
Result:  
$$
R=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}.
$$
**R as above**  
*Reflection:* Only the first and second rows are swapped; pitch and roll remain zero.

**Example 3 — Conversion from DCM to angles**  
*Given:*  
$$
C=\begin{pmatrix}0.866&0.5&0\\-0.5&0.866&0\\0&0&1\end{pmatrix}.
$$
*Find:* φ, θ, ψ.  
C₁₃ = 0 ⇒ θ = 0.  
C₁₁ = 0.866, C₁₂ = 0.5 ⇒ ψ = 30°.  
C₂₃ = 0, C₃₃ = 1 ⇒ φ = 0.  
**φ = 0°, θ = 0°, ψ = 30°**  
*Reflection:* The DCM is exactly R₃(30°), so recovery is immediate.

**Example 4 — Near gimbal lock**  
*Given:* φ = 10°, θ = 89°, ψ = 20°.  
*Find:* Reconstructed DCM and recovered angles.  
Compute R = R₁(10°)R₂(89°)R₃(20°).  
C₁₃ = −sin(89°)cos(20°) ≈ −0.9994.  
θ = −arcsin(C₁₃) ≈ 89°.  
The recovered ψ and φ differ from the originals by less than 0.01° when floating-point precision is adequate, but at exactly 90° the yaw and roll channels become linearly dependent.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Reversing multiplication order | Students confuse intrinsic and extrinsic conventions | Always write R = R₁(φ) R₂(θ) R₃(ψ) and verify with a known 90° rotation. |
| Using degrees inside trigonometric functions | Flight software often mixes degrees and radians | Convert to radians before calling sin/cos or use degree-mode wrappers explicitly. |
| Ignoring the θ = ±90° singularity | The two-axis degeneracy appears only at isolated points | Monitor |θ| and switch to quaternions when |θ| > 80°. |
| Extracting angles with wrong atan2 arguments | Sign errors in the off-diagonal elements flip quadrants | Always use atan2(y,x) with the exact matrix elements shown in Step 5. |
| Treating body rates p,q,r as Euler rates | The kinematic matrix is not the identity | Integrate the full 3×3 relation or use the inverse matrix when commanding rates. |
| Forgetting that yaw is applied first | Visualizing rotations in the wrong temporal order | Draw the triad after each successive rotation on paper before coding. |
| Assuming all Euler sequences are equivalent | Different sequences move the singularity to different axes | Verify that the vehicle’s dominant motion axis avoids the singularity of the chosen sequence. |

## 7. The textbook-precise statement
Let {e₁, e₂, e₃} be an orthonormal triad fixed to the rigid body. The 3-2-1 Euler angles (φ, θ, ψ) are the unique angles satisfying |θ| < π/2 such that the rotation taking the inertial triad into the body triad is the composition of a rotation by ψ about e₃, followed by a rotation by θ about the once-rotated e₂, followed by a rotation by φ about the twice-rotated e₁. The corresponding direction-cosine matrix is exactly  
$$
C_b^i=R_1(\phi)R_2(\theta)R_3(\psi),
$$  
where each Rᵢ(·) is the elementary rotation matrix about the i-th axis. (See Wiesel, *Spaceflight Dynamics*, 3e, §2.4.)

## 8. Visual — diagram or schematic
```text
Inertial triad (I)          After yaw ψ        After pitch θ        After roll φ (body)
     z_I                     z'                   z''                  z_b
      ↑                       ↑                    ↑                    ↑
      |                       |                    |                    |
      +----→ y_I             +----→ y'            +----→ y''           +----→ y_b
     /                       /                    /                    /
    /                       /                    /                    /
   x_I                     x'                   x''                  x_b
```
Each arrow indicates the axis about which the next rotation occurs. The final body axes (x_b, y_b, z_b) are those used for roll, pitch and yaw commands.

## 9. The memory technique

1. **The hook** — Picture a yawing airplane (rotate on the vertical), then a nodding airplane (rotate on the wing axis), then a rolling airplane (rotate on the fuselage axis); the order “yaw–pitch–roll” spells the sequence 3-2-1.
2. **What to overlearn** — The DCM product R = R₁(φ) R₂(θ) R₃(ψ) and the kinematic matrix that maps (φ̇, θ̇, ψ̇) to (p, q, r).
3. **Spaced-repetition schedule** — Review the DCM product at 1 day, the singularity condition at 3 days, angle-extraction formulas at 7 days, and full kinematic integration at 16 and 35 days.
4. **First-principles fallback** — Re-derive the composite matrix by multiplying the three elementary rotations from right to left, then differentiate with the chain rule while expressing every angular-velocity contribution in the final body frame.

## 10. What this unlocks
Mastery of 3-2-1 Euler angles supplies the attitude kinematics required for strap-down inertial navigation, for linearized flight-control design, and for converting between quaternions and Euler angles inside mission-design software. The immediate next topics are the quaternion kinematic differential equation, the Euler-angle form of the rigid-body attitude dynamics (Euler’s equations augmented by gravity-gradient or aerodynamic torques), and the design of attitude estimators that avoid the gimbal-lock singularity.

## 11. Self-check — five questions, no answers
1. Write the explicit 3-by-3 direction-cosine matrix for φ = 30°, θ = 45°, ψ = 60° and verify that its determinant equals +1.  
2. A vehicle reports body rates p = 0.1, q = 0.2, r = 0.3 rad s⁻¹ at the instant φ = 10°, θ = 20°, ψ = 30°. Compute the Euler-angle rates φ̇, θ̇, ψ̇.  
3. Demonstrate numerically that when θ = 90° the columns of the DCM that multiply ψ̇ and φ̇ become linearly dependent.  
4. An attitude matrix measured by a star tracker has C₁₃ = −0.8. Is the pitch angle inside or outside the safe extraction range?  
5. Derive the inverse of the 3-2-1 kinematic matrix and state the condition under which the inverse ceases to exist.