## 1. The one-sentence answer
**The Hamilton product is the unique bilinear multiplication on the four-dimensional real vector space \(\mathbb{R}^4\) that turns it into the division algebra of quaternions, defined by the basis rules \(i^2 = j^2 = k^2 = -1\) and \(ij = k\), \(ji = -k\).**

A quaternion is simply an ordered 4-tuple \((w, x, y, z)\) that we treat as the formal sum \(w + xi + yj + zk\). Ordinary addition and scalar multiplication work component-wise, exactly as in \(\mathbb{R}^4\). The new operation is the product of two such objects. Because the product must be bilinear, it is completely determined once we decide how the three imaginary units multiply with one another.

The rules \(i^2 = j^2 = k^2 = -1\) and the cyclic relations \(ij = k\), \(jk = i\), \(ki = j\) (with opposite signs when the order is reversed) are forced by the single algebraic demand that every nonzero quaternion must possess a multiplicative inverse. These nine rules, together with distributivity, generate the full sixteen-term expansion that appears when two general quaternions are multiplied.

> [!NOTE]
> The Hamilton product is non-commutative: the order of the factors matters, which is precisely why it can represent three-dimensional rotations without gimbal lock.

## 2. Why this matters — concrete and current
SpaceX’s Dragon spacecraft propagates its attitude quaternion at 100 Hz using the Hamilton product to compose successive small rotations measured by its IMU; any sign error in the product immediately produces a 180° attitude flip that the guidance filter must detect and correct.

NASA’s Perseverance rover stores its star-tracker measurements as unit quaternions and fuses them with gyro data inside an extended Kalman filter whose covariance propagation step contains the 4-by-4 matrix representation of the Hamilton product; the filter is documented in JPL Publication 20-4.

In the Robot Operating System (ROS) Noetic, the `tf2` library converts between roll-pitch-yaw angles and quaternions by calling the Hamilton product to compose extrinsic rotations; every mobile robot and manipulator that uses ROS therefore executes this operation thousands of times per second.

Modern GPU-accelerated visual-inertial odometry pipelines such as VINS-Fusion represent camera poses as quaternions and update them by left- or right-multiplying incremental Hamilton products; the choice of left versus right multiplication corresponds to body versus spatial frame conventions and must be consistent to avoid divergence of the optimizer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Real and complex numbers | Quaternions extend \(\mathbb{C}\) by adjoining two more imaginary units whose algebra must remain consistent. |
| Bilinear maps            | The product is linear in each argument separately, allowing the sixteen-term formula to be derived from only nine basis rules. |
| Non-commutative rings    | The product does not satisfy \(pq = qp\), which is required for faithful representation of 3-D rotations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Four real numbers with three imaginary units
A quaternion is an element of \(\mathbb{R}^4\) written \(q = w + xi + yj + zk\). Addition and real scaling are component-wise. The only new structure is a multiplication that must map any pair of quaternions back into the same four-dimensional space.

**Example.** The two quaternions \(1 + 2i + 3j + 4k\) and \(5 + 6i + 7j + 8k\) must produce a third quaternion whose four components are ordinary real numbers.

The formal statement is simply that the set \(\mathbb{H} = \{w + xi + yj + zk \mid w,x,y,z \in \mathbb{R}\}\) is closed under a yet-to-be-defined multiplication.

> [!WARNING]
> Treating the four components as an ordinary Euclidean vector and using the dot product instead of the Hamilton product destroys the algebraic inverse and therefore the ability to represent rotations.

### Step 2 — Multiplication table for the basis
We require \(i^2 = j^2 = k^2 = -1\) and the cyclic products \(ij = k\), \(jk = i\), \(ki = j\). The opposite order yields the negative: \(ji = -k\), etc.

**Example.** Compute \(i \cdot j\): the rule gives \(k\). Compute \(j \cdot i\): the rule gives \(-k\).

Formally,
\[
i^2 = j^2 = k^2 = -1, \quad ij = k, \quad jk = i, \quad ki = j.
\]

> [!WARNING]
> Reversing any of the three cyclic products produces the opposite orientation and therefore an improper rotation (reflection) instead of a proper one.

### Step 3 — Extend by bilinearity and distributivity
Any product \(q_1 q_2\) is obtained by writing each quaternion in basis form, multiplying term by term, and collecting coefficients of \(1,i,j,k\).

**Example.** \((a + bi)(c + di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i\), recovering ordinary complex multiplication.

The formal expansion therefore contains exactly sixteen real multiplications and twelve real additions.

### Step 4 — Write the sixteen-term formula
Collecting coefficients yields the Hamilton product
\[
\begin{align*}
q_1 \otimes q_2 &= (w_1w_2 - x_1x_2 - y_1y_2 - z_1z_2) \\
&+ (w_1x_2 + x_1w_2 + y_1z_2 - z_1y_2)i \\
&+ (w_1y_2 - x_1z_2 + y_1w_2 + z_1x_2)j \\
&+ (w_1z_2 + x_1y_2 - y_1x_2 + z_1w_2)k.
\end{align*}
\]

### Step 5 — Matrix representation
Left multiplication by \(q_1\) is the linear map
\[
q_1 \otimes q_2 = \begin{bmatrix}
w_1 & -x_1 & -y_1 & -z_1 \\
x_1 & w_1 & -z_1 & y_1 \\
y_1 & z_1 & w_1 & -x_1 \\
z_1 & -y_1 & x_1 & w_1
\end{bmatrix}
\begin{bmatrix} w_2 \\ x_2 \\ y_2 \\ z_2 \end{bmatrix}.
\]

### Step 6 — The textbook statement
The Hamilton product equips \(\mathbb{H}\) with the structure of a non-commutative division algebra over \(\mathbb{R}\). Every nonzero quaternion \(q\) satisfies \(q \otimes q^{-1} = 1\), where \(q^{-1} = \overline{q}/\|q\|^2\).

## 5. Worked examples — every step shown

**Example 1 — Basis element check**  
*Given:* \(i\) and \(j\).  
*Find:* \(i \otimes j\).  
Multiply the basis elements directly: \(i \otimes j = k\) by the cyclic rule.  
*Why:* The multiplication table is the definition of the algebra.  
**\(k\)**  
*Reflection:* Verifies that the nine basis rules are applied exactly as stated.

**Example 2 — Two pure vector quaternions**  
*Given:* \(q_1 = 0 + 1i + 0j + 0k\), \(q_2 = 0 + 0i + 1j + 0k\).  
*Find:* \(q_1 \otimes q_2\).  
Apply the full formula: scalar part \(0\cdot0 -1\cdot0 -0\cdot1 -0\cdot0 = 0\);  
\(i\) coefficient \(0\cdot0 +1\cdot0 +0\cdot0 -0\cdot1 = 0\);  
\(j\) coefficient \(0\cdot1 -1\cdot0 +0\cdot0 +0\cdot0 = 0\);  
\(k\) coefficient \(0\cdot0 +1\cdot1 -0\cdot0 +0\cdot0 = 1\).  
**\(0 + 0i + 0j + 1k = k\)**  
*Reflection:* Shows that the cross-product-like term appears automatically.

**Example 3 — Unit quaternion rotation composition**  
*Given:* \(q_1 = \frac{\sqrt{2}}{2}(1 + k)\), \(q_2 = \frac{\sqrt{2}}{2}(1 + i)\).  
*Find:* \(q_1 \otimes q_2\).  
Scalar: \(\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2}}{2} - 0 - 0 - \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2}}{2} = 0\);  
\(i\): \(\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2}}{2} + 0 + 0 - \frac{\sqrt{2}}{2}\cdot0 = \frac12\);  
\(j\): \(\frac{\sqrt{2}}{2}\cdot0 - 0 + 0 + \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2}}{2} = \frac12\);  
\(k\): \(\frac{\sqrt{2}}{2}\cdot0 + 0 - 0 + \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{2}}{2} = \frac12\).  
**\(\frac12(0 + i + j + k)\)**  
*Reflection:* Composition of two 90° rotations about different axes yields a single 120° rotation.

**Example 4 — Non-commutativity**  
*Given:* Same quaternions as Example 3 but in reverse order.  
*Find:* \(q_2 \otimes q_1\).  
Repeating the arithmetic yields \(\frac12(0 - i - j + k)\).  
**Different from Example 3**  
*Reflection:* Demonstrates that order must be tracked carefully in attitude propagation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Swapping left and right multiplication | Both conventions exist in the literature    | Fix one convention (usually body-to-inertial) and document it. |
| Forgetting the sign changes in the vector part | Pattern matching with dot product           | Always expand the four scalar equations explicitly.  |
| Normalizing after each product    | Fear of drift                               | Normalize only after composing many increments.      |
| Treating quaternion multiplication as component-wise | Confusion with vectors                      | Remember the cross-product terms that appear.        |
| Using \(q \otimes v \otimes q^{-1}\) with non-unit \(q\) | Algebraic inverse formula omitted           | Enforce \(\|q\| = 1\) before rotation formulas.      |
| Reversing cyclic order of \(i,j,k\) | Mirror-image algebra                        | Verify \(ij = k\) once at the start of any derivation. |
| Losing track of scalar sign when conjugating | Conjugate definition misremembered          | Write \(\overline{q} = w - xi - yj - zk\) explicitly. |

## 7. The textbook-precise statement
Let \(\mathbb{H}\) be the real vector space \(\mathbb{R}^4\) equipped with the bilinear operation
\[
(q_1 \otimes q_2)_w = w_1 w_2 - \mathbf{v}_1 \cdot \mathbf{v}_2, \quad
(q_1 \otimes q_2)_{\mathbf{v}} = w_1 \mathbf{v}_2 + w_2 \mathbf{v}_1 + \mathbf{v}_1 \times \mathbf{v}_2,
\]
where \(q = (w,\mathbf{v})\). Then \((\mathbb{H},\otimes)\) is an associative, non-commutative division algebra over \(\mathbb{R}\). Every nonzero element possesses the two-sided inverse \(q^{-1} = \overline{q}/\|q\|^2\). (Schaub & Junkins, *Analytical Mechanics of Space Systems*, 3rd ed., §3.3.)

## 8. Visual — diagram or schematic
```text
          k
          |
          |
   j -----+----- i
          |
          |
         -k

Left multiplication by q = w + x i + y j + z k
rotates the vector part (x,y,z) while scaling by w.
```
The three imaginary axes obey the right-hand rule: \(i\) thumb, \(j\) index, \(k\) middle finger.

## 9. The memory technique

1. **The hook** — Picture the three imaginary units standing at the corners of a triangle; each points to the next in the order \(i\to j\to k\) and the product is the third corner. Reverse the arrow and attach a minus sign.
2. **What to overlearn** — The nine basis rules, the four-component formula written once, and the fact that \(\|q_1\otimes q_2\| = \|q_1\|\|q_2\|\).
3. **Spaced-repetition schedule** — Review the basis table at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the sixteen-term expression from the nine basis rules and bilinearity in under two minutes.

## 10. What this unlocks
Mastery of the Hamilton product lets you compose arbitrary attitude rotations without singularities and propagate covariance through the linearised attitude kinematics.

- Quaternion kinematic differential equation \(\dot{q} = \frac12 q \otimes \omega\)
- Error-state Kalman filter measurement update for star trackers
- Wahba’s problem solved via Davenport’s q-method
- Lie-group variational integrators on SO(3) via unit quaternions

## 11. Self-check — five questions, no answers
1. Compute \((1+i+j+k)\otimes(1-i+j-k)\) by hand and verify that the result has norm 4.
2. Show that the Hamilton product of two pure vector quaternions \(\mathbf{u}\) and \(\mathbf{v}\) equals \(-\mathbf{u}\cdot\mathbf{v} + \mathbf{u}\times\mathbf{v}\).
3. Demonstrate algebraically that left multiplication by a unit quaternion preserves the Euclidean norm of any quaternion.
4. Given two successive 90° rotations about body-fixed axes, write the composite quaternion and confirm it differs when the order is reversed.
5. Identify the single sign error in a claimed product formula that would turn a proper rotation into an improper one.