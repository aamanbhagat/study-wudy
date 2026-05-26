## 1. The one-sentence answer
**Vector addition is performed geometrically by placing two vectors head-to-tail (triangle law) or as adjacent sides of a parallelogram (parallelogram law), with the resultant given by the closing side or diagonal.**

Vectors carry both magnitude and direction. When two such quantities act together, their combined effect cannot be found by ordinary arithmetic because direction matters. The triangle law arranges the vectors so the tail of the second touches the head of the first; the straight line from the free tail to the free head is the resultant. The parallelogram law reaches the identical resultant by completing a parallelogram whose sides are the two vectors; the diagonal is the sum. Both constructions follow directly from the definition of a vector as an arrow that can be translated without change.

These two pictures are equivalent because the diagonal of the parallelogram is precisely the third side of the triangle formed by the same arrows. The equivalence guarantees that vector addition is commutative: \(\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}\).

> [!NOTE]
> The resultant is independent of which law you draw; the choice is only a matter of convenience for calculation or diagram clarity.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing burns combine thrust, aerodynamic drag, and gravity vectors at each instant; trajectory software adds these vectors with the parallelogram construction inside its guidance loop to keep the landing ellipse inside the drone-ship deck.  

ESA’s Juice mission to Jupiter must cancel the velocity vector of Earth’s orbit against the spacecraft’s hyperbolic escape vector; mission designers use repeated triangle-law additions to size the gravity-assist burns at Venus and Earth.  

In semiconductor metrology, atomic-force microscopes measure surface forces whose lateral and normal components are added vectorially; the parallelogram law appears inside the real-time stiffness calibration routine that converts cantilever deflection into piconewton forces.  

LIGO’s seismic isolation platforms continuously null residual ground motion by superposing actuator force vectors; any misalignment in the addition produces excess noise at 10–30 Hz, directly limiting binary-neutron-star detection range.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distinction between scalar and vector | Only vectors possess direction; scalars add algebraically |
| Tail-to-head translation of arrows   | Vectors may be moved parallel to themselves without change |
| Basic Euclidean geometry (triangle inequality, opposite angles) | Guarantees the resultant lies inside the constructed figure |

## 4. Building the idea — from intuition to formalism

### Step 1 — Arrows carry direction as well as length
A single force or velocity is drawn as an arrow whose length is proportional to magnitude and whose orientation shows direction.  
Example: a 3 N force east and a 4 N force north.  
Formal statement: a vector \(\mathbf{A}\) is an element of a vector space equipped with addition and scalar multiplication satisfying the usual axioms.  
> [!WARNING]
> Treating the numbers 3 and 4 as ordinary scalars yields 7 N, which has no direction and is physically meaningless.

### Step 2 — Place the arrows head-to-tail
Translate the second arrow so its tail coincides with the head of the first.  
The two arrows now form two sides of a triangle.  
Formal statement: \(\mathbf{A} + \mathbf{B}\) is the unique vector whose representative arrow runs from the free tail of \(\mathbf{A}\) to the free head of \(\mathbf{B}\).  
> [!WARNING]
> Reversing the order of placement without also reversing the sense of one arrow produces the negative resultant.

### Step 3 — Close the triangle to obtain the resultant
Draw the straight line that completes the triangle. Its length and direction are the magnitude and direction of the sum.  
Example: the 3 N east plus 4 N north arrow closes with a 5 N northeast arrow (3-4-5 triangle).  
Formal statement:  
\[
\mathbf{R} = \mathbf{A} + \mathbf{B} \quad \text{(triangle law)}
\]

### Step 4 — Equivalence via the parallelogram construction
Translate both vectors so their tails coincide. Complete the parallelogram. The diagonal from the common tail is identical to the closing side of the triangle.  
Formal statement:  
\[
\mathbf{R} = \mathbf{A} + \mathbf{B} \quad \text{(parallelogram law)}
\]  
The two laws therefore define the same operation.

### Step 5 — Algebraic expression in components
Resolve each vector into orthogonal components. Addition reduces to separate scalar additions:  
\[
R_x = A_x + B_x, \quad R_y = A_y + B_y.
\]  
The magnitude of the resultant is recovered by Pythagoras:  
\[
|\mathbf{R}| = \sqrt{R_x^2 + R_y^2}.
\]  
This is the coordinate realization of either geometric law.

## 5. Worked examples — every step shown

**Example 1 — Two perpendicular forces**  
*Given:* \(\mathbf{A} = 3\,\text{N east}\), \(\mathbf{B} = 4\,\text{N north}\).  
*Find:* \(\mathbf{R} = \mathbf{A} + \mathbf{B}\).  

Place tail of \(\mathbf{B}\) at head of \(\mathbf{A}\).  
*Why:* satisfies the head-to-tail requirement of the triangle law.  

The closing side forms a right triangle with legs 3 N and 4 N.  
*Why:* the angle between east and north is 90°.  

Apply Pythagoras:  
\[
R = \sqrt{3^2 + 4^2} = 5\,\text{N}.
\]  
Direction: \(\tan^{-1}(4/3) = 53.13^\circ\) north of east.  
**\(\mathbf{R} = 5\,\text{N at } 53.13^\circ\) north of east.**  

*Reflection:* perpendicular vectors produce the simplest numerical case; the same geometry appears whenever forces or velocities are orthogonal.

**Example 2 — Collinear vectors in same direction**  
*Given:* \(\mathbf{A} = 2\,\text{m/s}\), \(\mathbf{B} = 5\,\text{m/s}\), both east.  
*Find:* \(\mathbf{R}\).  

Head-to-tail placement yields a single arrow of length 7 m/s.  
*Why:* the angle is 0°, so the triangle degenerates to a straight line.  
**\(\mathbf{R} = 7\,\text{m/s east}\).**  

*Reflection:* scalar addition is recovered as the special case of parallel vectors.

**Example 3 — Vectors at 60°**  
*Given:* \(|\mathbf{A}| = 6\), \(|\mathbf{B}| = 8\), angle 60°.  
*Find:* \(|\mathbf{R}|\).  

Law of cosines inside the triangle:  
\[
R^2 = 6^2 + 8^2 + 2\cdot6\cdot8\cdot\cos 120^\circ = 36 + 64 - 96 = 4,
\]  
\[
R = 2.
\]  
**\(|\mathbf{R}| = 2\) (units of \(\mathbf{A}\), \(\mathbf{B}\)).**  

*Reflection:* obtuse interior angle reduces the resultant; the cosine term encodes directional opposition.

**Example 4 — Three vectors by successive pairwise addition**  
*Given:* \(\mathbf{A}\), \(\mathbf{B}\), \(\mathbf{C}\).  
*Find:* \(\mathbf{A}+\mathbf{B}+\mathbf{C}\).  

First form \(\mathbf{D} = \mathbf{A} + \mathbf{B}\) by either law.  
*Why:* vector addition is associative, so grouping is arbitrary.  

Then add \(\mathbf{C}\) to \(\mathbf{D}\) by the triangle law.  
**Final resultant is the closing side of the polygon formed by all three arrows.**  

*Reflection:* any number of vectors may be added by chaining the same two-vector construction.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Adding magnitudes only      | Forgetting direction is part of the vector  | Always draw the arrow before computing       |
| Reversing one arrow’s sense | Misreading “head-to-tail” as tail-to-tail   | Label every head and tail explicitly         |
| Using interior angle instead of exterior | Confusing the triangle’s interior with the angle between vectors | Measure the angle between the directions of the two arrows as drawn |
| Treating negative components as subtraction of lengths | Sign indicates opposite direction           | Keep components signed throughout            |
| Assuming commutativity fails for non-orthogonal vectors | Visual asymmetry of a particular drawing    | Verify by swapping order; resultant is identical |
| Forgetting that the zero vector has undefined direction | Edge case when two equal vectors oppose     | Check \(|\mathbf{R}|=0\) separately          |
| Scaling diagram inconsistently | Using different length scales for each vector | Choose one scale for the entire figure       |

## 7. The textbook-precise statement
Let \(\mathbf{A}\) and \(\mathbf{B}\) be vectors in a real inner-product space. Their sum \(\mathbf{A}+\mathbf{B}\) is the unique vector \(\mathbf{R}\) such that, for any choice of origin, the representative arrows satisfy the triangle or parallelogram closure. In components relative to an orthonormal basis,  
\[
R^i = A^i + B^i.
\]  
The operation is associative, commutative, and admits the zero vector as identity (Kleppner & Kolenkow, *An Introduction to Mechanics*, 1st ed., §1.6).

## 8. Visual — diagram or schematic
```text
Triangle law                     Parallelogram law
   B                              B
   ^                              ^
   |                              |
A  |----> R                   A   |----> R
   \     /                       \     /
    \   /                         \   /
     \ /                           \ /
      C                             C
```
Label: arrow A from origin to point C, arrow B from C to head of R; parallelogram completes with translated copy of A from head of B to head of R.

## 9. The memory technique

1. **The hook** — Picture two people pulling a rope: one walks east, the other north; the rope’s free end moves northeast along the diagonal of the square they trace (parallelogram).  
2. **What to overlearn** — \(R^2 = A^2 + B^2 + 2AB\cos\theta\) (law of cosines) and the component-wise rule \(R_x = A_x + B_x\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the definition that a vector is unchanged by parallel translation; reconstruct either figure and read off the closing arrow.

## 10. What this unlocks
Mastery of these two geometric laws supplies the addition rule required for every subsequent vector operation in kinematics and dynamics.  

- Resolution into rectangular components  
- Dot and cross products  
- Newton’s second law written as \(\mathbf{F}_\text{net} = m\mathbf{a}\)  
- Relative velocity in rocket staging and orbital mechanics  
- Linear momentum conservation in collisions  

## 11. Self-check — five questions, no answers
1. Two forces of 5 N and 12 N act at right angles. What is the magnitude of their resultant?  
2. A velocity 4 m/s east is added to 3 m/s at 120° from east. Compute the resultant vector in component form.  
3. Under what geometric condition does the triangle law reduce to ordinary arithmetic addition of lengths?  
4. A student draws two arrows tail-to-tail and claims the closing side of the triangle they form is the sum. Identify the error.  
5. Show that the parallelogram law implies \(\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}\) without using components.