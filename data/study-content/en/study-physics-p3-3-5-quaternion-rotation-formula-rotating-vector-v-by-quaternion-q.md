## 1. The one-sentence answer
**The quaternion rotation formula rotates a three-dimensional vector \(v\) by a unit quaternion \(q\) through the operation \(v' = q \otimes v \otimes q^{-1}\), where \(v\) is first embedded as the pure quaternion \((0, v)\).**

A quaternion \(q = (w, x, y, z)\) encodes an orientation as a single rotation about an axis. To apply that orientation to any vector, the vector must be temporarily lifted into the same four-dimensional algebra so that multiplication is defined. The sandwich product then extracts the rotated vector while automatically preserving its length.

This construction works because quaternion multiplication composposes rotations and the inverse \(q^{-1}\) undoes the first multiplication, leaving only the net effect on the vector part. The result is a new pure quaternion whose imaginary components are the rotated coordinates.

> [!NOTE]
> The sandwich automatically cancels the scalar component and yields a vector whose Euclidean length is identical to the original—an algebraic guarantee that no scaling or reflection has occurred.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first-stage boosters by commanding rapid 180° flips; the flight computer propagates attitude with unit quaternions and applies the sandwich product at 100 Hz to convert thrust-vector commands into body-frame nozzle angles.

NASA’s Perseverance rover uses the same formula inside its attitude determination and control system to transform star-tracker measurements into inertial coordinates before feeding the results to the terrain-relative navigation filter.

Apple’s ARKit on iPhone and iPad continuously rotates virtual objects to match camera motion; each frame the device attitude quaternion rotates the scene-graph vectors via the identical product, guaranteeing that rendered objects remain stable to within a few pixels.

Modern low-Earth-orbit mega-constellations such as Starlink maintain continuous nadir pointing; each satellite’s onboard GNC processor evaluates the quaternion rotation formula thousands of times per orbit to map commanded inertial torques into reaction-wheel speed commands.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| 3-D vector algebra         | The object being rotated is a Euclidean vector \(v\).     |
| Quaternion multiplication  | The rotation operation is defined entirely by quaternion products. |
| Conjugate of a unit quaternion | The inverse of a unit quaternion equals its conjugate, which appears explicitly in the formula. |
| Pure quaternion            | Vectors are represented with zero scalar part so that the product remains geometrically meaningful. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Embed the vector as a quaternion
A three-component vector has no scalar part, yet quaternion multiplication is defined only on four-component objects. Append a leading zero to obtain the pure quaternion \(v = (0, v_x, v_y, v_z)\).  
Example: the vector \((1,0,0)\) becomes \(v = (0,1,0,0)\).  
\[
v = (0,\mathbf{v})
\]
> [!WARNING]
> Treating \(v\) as a three-element array and attempting to multiply it directly with \(q\) produces a dimension mismatch; the scalar slot must be explicitly zero.

### Step 2 — Form the conjugate (inverse) of the unit quaternion
For a unit quaternion the inverse equals the conjugate obtained by negating the vector part.  
Example: \(q = (0.707, 0.707, 0, 0)\) gives \(q^{-1} = (0.707, -0.707, 0, 0)\).  
\[
q^{-1} = (w, -\mathbf{q})
\]
> [!WARNING]
> Using the non-unit inverse formula \(q^{-1} = q^*/\|q\|^2\) when \(\|q\| \neq 1\) silently rescales the result; always normalize first.

### Step 3 — Perform the left multiplication \(q \otimes v\)
Quaternion multiplication combines the scalar and vector parts according to the rules \(i^2 = j^2 = k^2 = -1\) and \(ij = k\). The product is another quaternion.  
\[
q \otimes v = (w_v', \mathbf{v}')
\]
> [!WARNING]
> Reversing the multiplication order at this stage yields the rotation by the opposite angle; the sequence \(q\) then \(q^{-1}\) must be preserved.

### Step 4 — Perform the right multiplication by the conjugate
Multiply the intermediate result on the right by \(q^{-1}\). The scalar component of the final quaternion evaluates to zero, leaving only the rotated vector part.  
\[
(q \otimes v) \otimes q^{-1} = (0, \mathbf{v}')
\]
> [!WARNING]
> Extracting only the vector part before the final multiplication discards necessary cross-product terms and produces an incorrect rotation.

### Step 5 — Recover the rotated Cartesian vector
Drop the leading zero from the final pure quaternion to obtain the three-component result \(\mathbf{v}'\). This is the unique vector obtained by rotating \(\mathbf{v}\) through the angle and axis encoded by \(q\).

## 5. Worked examples — every step shown

**Example 1 — 90° rotation about z-axis**  
*Given:* \(q = \frac{\sqrt{2}}{2}(1,0,0,1)\), \(v = (1,0,0)\).  
*Find:* rotated vector.  
Step 1: embed \(v = (0,1,0,0)\). *Why:* required for quaternion multiplication.  
Step 2: \(q^{-1} = \frac{\sqrt{2}}{2}(1,0,0,-1)\). *Why:* conjugate of unit quaternion.  
Step 3: \(q \otimes v = (0, \frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}, 0)\). *Why:* apply multiplication rules.  
Step 4: final product yields \((0,0,1,0)\). *Why:* right multiplication completes rotation.  
**Final answer**  
\((0,1,0)\)

*Reflection:* The axis-aligned case makes every cross term vanish, exposing the pure 90° permutation that generalizes to arbitrary axes.

**Example 2 — Identity rotation**  
*Given:* \(q = (1,0,0,0)\), \(v = (3,4,5)\).  
Step-by-step multiplication returns exactly the input vector.  
**Final answer**  
\((3,4,5)\)

*Reflection:* Verifies that the identity quaternion leaves every vector unchanged, confirming the formula’s fixed-point behavior.

**Example 3 — Rotation by 180° about x-axis**  
*Given:* \(q = (0,1,0,0)\), \(v = (0,1,0)\).  
Algebra yields \(v' = (0,-1,0)\).  
**Final answer**  
\((0,-1,0)\)

*Reflection:* Demonstrates sign reversal of the two perpendicular components, a direct geometric consequence of a half-turn.

**Example 4 — Non-unit quaternion (must normalize first)**  
*Given:* \(q = (2,0,0,0)\), \(v = (1,0,0)\).  
Normalize to obtain the same identity rotation as Example 2.  
**Final answer**  
\((1,0,0)\)

*Reflection:* Shows that any non-unit quaternion must be normalized before use; otherwise length distortion appears.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to normalize \(q\)     | Quaternion libraries sometimes return non-unit results after multiplication | Call normalize immediately after any composition     |
| Reversing multiplication order    | Matrix analogy suggests \(q^{-1} v q\)              | Always write \(q v q^{-1}\) and keep the order fixed |
| Treating \(v\) as a 3-vector      | Programming languages allow 3-element arrays        | Explicitly construct the 4-element pure quaternion   |
| Using \(q^*\) instead of \(q^{-1}\) when \(\|q\| \neq 1\) | Conjugate equals inverse only for unit quaternions | Normalize first, then conjugate equals inverse       |
| Extracting vector part too early  | Scalar component appears to be “extra”              | Complete both multiplications before discarding scalar |
| Sign error in rotation axis       | Right-hand rule versus left-hand convention         | Verify one known 90° case before trusting the sign   |
| Accumulating floating-point drift | Repeated multiplications slowly violate unit length | Renormalize after every few compositions             |

## 7. The textbook-precise statement
Let \(q\) be a unit quaternion and let \(\mathbf{v} \in \mathbb{R}^3\). Embed \(\mathbf{v}\) as the pure quaternion \(v = (0,\mathbf{v})\). The rotated vector is the vector part of the quaternion
\[
v' = q \otimes v \otimes q^{-1}.
\]
Because \(\|q\| = 1\), we have \(q^{-1} = q^*\). The map \(\mathbf{v} \mapsto \mathbf{v}'\) is an orientation-preserving isometry of \(\mathbb{R}^3\) whose axis-angle parameters are exactly those encoded by \(q\). (Kuipers, *Quaternions and Rotation Sequences*, Princeton University Press, 1999, §4.3.)

## 8. Visual — diagram or schematic
```text
          k
          |
          |   q encodes rotation
          |   about unit axis u
   j -----+----- i
         / 
        v  -->  v'   (rotated vector lies in plane ⊥ u)
```
The diagram shows the three imaginary axes i, j, k. The rotation axis u lies somewhere in this space; the vector v is rotated in the plane perpendicular to u by the angle stored in the scalar part of q.

## 9. The memory technique

1. **The hook** — Picture two slices of bread (the two copies of q) with a slice of ham (the vector v) between them; flipping the sandwich rotates the ham.
2. **What to overlearn** — The exact expression \(v' = q \otimes v \otimes q^{-1}\) together with the rule “normalize before conjugating.”
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the sandwich by composing the two half-angle quaternion multiplications that together produce a full rotation.

## 10. What this unlocks
Mastery of the sandwich product lets you compose arbitrary attitude sequences without gimbal lock and supplies the measurement-update step inside any quaternion-based extended Kalman filter used for spacecraft navigation.

- Conversion between quaternions and direction-cosine matrices
- Derivative propagation \(\dot{q} = \frac12 q \otimes \omega\)
- Error-state attitude estimation filters
- Wahba’s problem solvers (Davenport’s q-method)

## 11. Self-check — five questions, no answers
1. Write the explicit four-component formula for the product \(q \otimes v \otimes q^{-1}\) when \(q = (w,x,y,z)\) and \(v = (0,a,b,c)\).

2. Show that the scalar part of the final quaternion is identically zero when \(\|q\| = 1\).

3. A quaternion \(q\) rotates vectors by 120° about the axis \((1,1,1)\). Compute the image of the vector \((1,0,0)\).

4. Demonstrate algebraically that applying the formula twice with \(q\) and once with \(q^2\) yields identical results.

5. Identify the algebraic step that fails if \(q\) is not renormalized after many successive multiplications, and quantify the length error that appears.