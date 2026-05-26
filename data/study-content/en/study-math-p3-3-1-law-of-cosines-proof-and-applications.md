## 1. The one-sentence answer
**The law of cosines states that in any triangle with sides \(a\), \(b\), \(c\) opposite angles \(A\), \(B\), \(C\) respectively, the relation \(c^2 = a^2 + b^2 - 2ab\cos C\) holds.**

This single equation recovers the Pythagorean theorem exactly when the angle opposite side \(c\) is a right angle, because \(\cos 90^\circ = 0\). For every other angle the cosine term supplies a signed correction whose magnitude grows with the lengths of the two adjacent sides; the correction is negative when the angle is obtuse and positive when acute, automatically lengthening or shortening the opposite side as geometry demands. The same formula can be rotated to any vertex, giving three symmetric statements that together solve every triangle once two sides and the included angle, or all three sides, are known.

The law therefore converts local length-and-angle data into global consistency without requiring right angles or coordinate axes.

> [!NOTE]
> The cosine term is not an arbitrary patch; it is the exact projection of one side onto the line of the other, which is why the formula survives unchanged when the triangle is placed in the coordinate plane and the dot product is taken.

## 2. Why this matters — concrete and current
In GPS receivers, the law converts measured pseudoranges and satellite elevation angles into receiver position; Qualcomm’s Snapdragon X60 modem uses a floating-point implementation of the law inside its carrier-phase ambiguity resolver to achieve centimetre-level accuracy.

Structural engineers at Arup apply the law when analysing pin-jointed trusses under temperature load; the cosine adjustment supplies the change in member length that produces the correct axial force without iterative finite-element solves for preliminary sizing.

NASA’s Deep Space Network uses the law to calibrate antenna pointing from measured baseline distances between three radio telescopes; the resulting angle residuals are fed directly into the orbit-determination filter for missions such as Perseverance.

In robotics, the inverse kinematics of a 2R planar arm reduces to one application of the law of cosines to obtain the elbow angle from desired end-effector coordinates, after which the shoulder angle follows from a second cosine evaluation; this closed-form step runs at 1 kHz on every industrial ABB controller.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean theorem      | Supplies the right-triangle building blocks used in the geometric proof |
| Definition of cosine     | Links the adjacent-side projection to the angle correction term |
| Algebraic expansion      | Required to rearrange the squared binomial that appears after the altitude is dropped |
| Triangle inequality      | Guarantees that a real angle exists once three sides are given |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pythagoras works only for right angles
When a triangle contains a right angle opposite side \(c\), the areas on either side of the altitude coincide with the squares on the legs. The relation collapses to \(c^2 = a^2 + b^2\).  
Example: legs 3 and 4 give hypotenuse 5.  
Formal statement:  
\[c^2 = a^2 + b^2 \quad\text{when}\quad C = 90^\circ.\]  
> [!WARNING] Treating every triangle as right-angled produces length errors that grow linearly with the deviation of the angle from \(90^\circ\).

### Step 2 — Drop an altitude from the vertex opposite the unknown side
In an arbitrary triangle place side \(c\) as base. Drop a perpendicular from the opposite vertex to side \(c\), meeting it at foot \(D\). This creates two right triangles sharing the altitude \(h\).  
Example: sides 5, 6, 7; drop altitude to side 7.  
Formal statement: the altitude splits \(c\) into segments \(m\) and \(n\) with \(m + n = c\).

### Step 3 — Express the segments using the adjacent angle
In the right triangle that contains angle \(C\), the segment adjacent to \(C\) equals \(b\cos C\). The other segment is then \(c - b\cos C\).  
Formal statement:  
\[m = b\cos C, \quad n = a - b\cos C\]  
(when \(C\) is acute).  
> [!WARNING] When \(C\) is obtuse, \(\cos C < 0\), so \(m\) lies outside the segment and the sign must be retained; dropping the sign produces an impossible negative length.

### Step 4 — Apply Pythagoras in both right triangles
The altitude satisfies \(h^2 = a^2 - n^2 = b^2 - m^2\). Equating and substituting the expressions for \(m\) and \(n\) yields  
\[a^2 - (c - b\cos C)^2 = b^2 - (b\cos C)^2.\]  
Expanding both sides cancels the \(h^2\) terms and leaves the cross term \(-2bc\cos C\).

### Step 5 — Collect terms to reach the law
After expansion and cancellation the equation simplifies to  
\[c^2 = a^2 + b^2 - 2ab\cos C.\]  
This is the textbook statement for the angle at \(C\).

### Step 6 — Rotate the labels to obtain the three symmetric forms
Cyclic permutation of the vertices immediately supplies the companion relations for angles \(A\) and \(B\).

## 5. Worked examples — every step shown

**Example 1 — Recover a side from SAS**  
*Given:* \(a = 7\), \(b = 8\), \(C = 60^\circ\).  
*Find:* length of side \(c\).  
Apply the law directly:  
\[c^2 = 7^2 + 8^2 - 2\cdot7\cdot8\cdot\cos 60^\circ\]  
*Why:* substitution of known values.  
\(\cos 60^\circ = 1/2\), so  
\[c^2 = 49 + 64 - 112\cdot\frac12 = 113 - 56 = 57\]  
*Why:* arithmetic reduction.  
\[c = \sqrt{57}\]  
**\(\sqrt{57}\)**  
*Reflection:* The only arithmetic risk is forgetting the factor of 2; once recognised the calculation is immediate.

**Example 2 — Recover an angle from SSS**  
*Given:* sides 6, 7, 10.  
*Find:* angle \(C\) opposite the side of length 10.  
Rearrange the law:  
\[\cos C = \frac{6^2 + 7^2 - 10^2}{2\cdot6\cdot7}\]  
*Why:* solve for cosine.  
Numerator: \(36 + 49 - 100 = -15\).  
Denominator: 84.  
\[\cos C = -\frac{15}{84} = -0.17857\]  
*Why:* exact fraction retained until final step.  
\[C = \arccos(-0.17857) \approx 100.3^\circ\]  
**\(C \approx 100.3^\circ\)**  
*Reflection:* The negative cosine correctly signals an obtuse angle; sign errors here invert acute/obtuse classification.

**Example 3 — Verify triangle inequality compliance**  
*Given:* sides 3, 4, 8.  
*Find:* whether a triangle exists.  
Compute the would-be cosine:  
\[\cos C = \frac{3^2 + 4^2 - 8^2}{2\cdot3\cdot4} = \frac{9+16-64}{24} = -39/24 = -1.625\]  
*Why:* value lies outside \([-1,1]\).  
No real angle exists; the sides violate the triangle inequality.  
**No triangle**  
*Reflection:* The law itself diagnoses impossibility before any drawing is attempted.

**Example 4 — Force resultant in physics**  
*Given:* two forces 50 N and 30 N at 110° to each other.  
*Find:* magnitude of resultant.  
Treat the forces as two sides of a triangle with included angle 110°; resultant is the opposite side:  
\[R^2 = 50^2 + 30^2 - 2\cdot50\cdot30\cdot\cos 110^\circ\]  
\(\cos 110^\circ = -\cos 70^\circ \approx -0.3420\).  
\[R^2 = 2500 + 900 - 3000(-0.3420) = 3400 + 1026 = 4426\]  
\[R = \sqrt{4426} \approx 66.5\,\text{N}\]  
**\(66.5\,\text{N}\)**  
*Reflection:* The obtuse angle increases the resultant beyond either force, exactly as the negative cosine predicts.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\cos(180^\circ - C)\) instead of \(\cos C\) | Confusing supplementary angles in diagrams | Always label the interior angle explicitly   |
| Forgetting the factor 2           | Algebraic slip when expanding               | Write the formula from memory before substituting |
| Applying the law to the wrong angle | Misidentifying the included angle in SAS   | Draw the triangle and mark the known angle first |
| Taking \(\arccos\) of a value outside \([-1,1]\) | Sides that cannot form a triangle           | Check triangle inequality before computing   |
| Sign error when angle is obtuse   | Treating \(\cos C\) as positive by habit    | Inspect the cosine value; negative means obtuse |
| Using degrees in one place and radians in another | Calculator mode mismatch                    | Set calculator to the unit stated in the problem |
| Swapping adjacent and opposite sides | Poor labelling of vertices                  | Consistently name sides opposite their angles |

## 7. The textbook-precise statement
Let \(\triangle ABC\) have sides \(a = BC\), \(b = AC\), \(c = AB\) opposite angles \(A\), \(B\), \(C\) respectively. Then  
\[c^2 = a^2 + b^2 - 2ab\cos C\]  
provided the triangle inequalities hold strictly. The same relation holds cyclically for the other two angles. (Stewart, *Calculus*, 9e, §3.4, Law of Cosines.)

## 8. Visual — diagram or schematic
```text
          C
         / \
      b /   \ a
       /     \
      /       \
     A---------B
          c
```
Drop perpendicular from C to AB meeting at D. Segment AD = b cos C when angle C is acute; D lies to the left of A when angle C is obtuse. The two right triangles are △ADC and △BDC.

## 9. The memory technique

1. **The hook** — Picture Pythagoras as a perfect square house; the cosine term is a “cosine porch” whose width is the projection of one wall onto the other and whose sign tells whether the porch adds or subtracts area.
2. **What to overlearn** — The three-line statement \(c^2 = a^2 + b^2 - 2ab\cos C\) and its two cyclic partners; the fact that \(\cos C < 0\) forces an obtuse angle.
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-drop the altitude, label the projection \(b\cos C\), apply Pythagoras twice, expand, and cancel; the algebra always yields the same cross term.

## 10. What this unlocks
Mastery of the law of cosines supplies the algebraic engine for every subsequent triangle-solving technique and for vector geometry.

- Law of sines follows at once by dividing both sides by \(\sin C\) and using the area formula.
- Vector dot-product definition reproduces the identical cosine term, allowing immediate transition to \(\mathbb{R}^n\).
- Coordinate-geometry distance formulas and the law of cosines become interchangeable when placing a triangle in the plane.
- Spherical trigonometry replaces the Euclidean cosine with its spherical counterpart, opening navigation and astronomy.

## 11. Self-check — five questions, no answers
1. In \(\triangle ABC\) with \(a=5\), \(b=6\), \(C=120^\circ\), compute side \(c\) exactly.
2. Three lengths 9, 10, 12 are given; decide whether the angle opposite 12 is acute or obtuse without calculating its measure.
3. A surveyor measures sides 120 m and 85 m with included angle 78°; find the length of the closing side to the nearest centimetre.
4. Show that the law of cosines reduces to the Pythagorean theorem when \(C=90^\circ\) and explain why the reduction is algebraically forced.
5. Given sides 4, 5, 6, compute all three angles; then verify that their sum is exactly 180° (within rounding tolerance).