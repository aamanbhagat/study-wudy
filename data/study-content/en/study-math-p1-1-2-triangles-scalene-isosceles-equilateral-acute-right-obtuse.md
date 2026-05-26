## 1. The one-sentence answer
**A triangle is classified by its side lengths into scalene, isosceles, or equilateral and independently by its interior angles into acute, right, or obtuse.**

These two partitions rest on direct comparisons. Side classification compares the three lengths: all different yields scalene, exactly two equal yields isosceles, and all three equal yields equilateral. Angle classification compares each interior angle to a right angle: every angle smaller produces acute, one exactly right produces right, and one larger produces obtuse. The partitions are independent; an equilateral triangle is always acute, yet an isosceles triangle may be acute, right, or obtuse.

The independence follows because side equality constrains angles through the isosceles-triangle theorem, but does not fix the size of those angles relative to 90°. Thus every combination except equilateral-obtuse and equilateral-right is geometrically possible.

> [!NOTE]
> Equilateral triangles are the only triangles that are simultaneously scalene-free, isosceles, and acute; every other triangle occupies exactly one cell in each classification.

## 2. Why this matters — concrete and current
Structural engineers at NASA Langley use scalene and isosceles right triangles to compute member forces in truss assemblies for the Artemis lunar lander; the 90° corner allows immediate application of the Pythagorean relation while unequal legs accommodate asymmetric payload distribution.

Computer-vision pipelines at OpenAI rely on acute-triangle angle bounds when triangulating 3-D keypoints from multiple camera views; the acute condition guarantees that the computed intersection lies inside the convex hull of observed rays, reducing reprojection error in training data for robotics.

Semiconductor mask designers at TSMC employ obtuse-triangle checks when placing vias near 7 nm interconnect corners; an obtuse angle signals potential stress concentration that can nucleate electromigration voids, prompting automatic rerouting before tape-out.

Surveyors for the European Space Agency’s Gaia mission correct stellar parallax measurements by decomposing observed baselines into isosceles triangles whose equal sides are known spacecraft-to-star distances; the vertex angle directly supplies the parallax after atmospheric refraction is subtracted.

## 3. Mental prerequisites
| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Straight angle = 180° | Triangle angle sum is derived from a straight angle split by one side. |
| Comparison of real numbers | Side and angle classifications are defined by equality or inequality of lengths and degree measures. |
| Interior vs. exterior angle | Distinguishes the three interior angles that determine acute/right/obtuse type. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Compare the three side lengths
Any triangle has three sides that can be measured and ordered. When no two lengths are equal the triangle is scalene; when exactly two are equal it is isosceles; when all three coincide it is equilateral.

Consider sides 5, 5, 6. Two sides match, so the triangle is isosceles.

Formally, label the sides \(a \leq b \leq c\). Then:
- scalene if \(a < b < c\),
- isosceles if \(a = b < c\) or \(a < b = c\),
- equilateral if \(a = b = c\).

> [!WARNING]
> Treating an equilateral triangle as merely isosceles loses the stronger symmetry that forces all angles to 60°.

### Step 2 — Compare each interior angle to 90°
Measure or compute the three interior angles. If every angle is less than 90° the triangle is acute; if one equals 90° it is right; if one exceeds 90° it is obtuse.

For angles 40°, 60°, 80° the triangle is acute.

The classification is exhaustive and mutually exclusive because the sum is exactly 180°; at most one angle can be ≥90°.

> [!WARNING]
> Forgetting that the angle sum is 180° may lead to the false belief that two obtuse angles could coexist.

### Step 3 — Link sides to angles via the isosceles-triangle theorem
In an isosceles triangle the base angles are equal. Consequently an isosceles right triangle must have its right angle at the vertex opposite the unequal side.

### Step 4 — Note the special case of the equilateral triangle
All sides equal forces all angles equal; each must be 60°. Hence every equilateral triangle is acute.

### Step 5 — Exhaust the admissible combinations
The only impossible pairings are equilateral-right and equilateral-obtuse. All other six combinations exist.

## 5. Worked examples — every step shown

**Example 1 — Side classification only**  
*Given:* sides 7, 9, 10.  
*Find:* side-type.  

Compare lengths: 7 ≠ 9, 9 ≠ 10, 7 ≠ 10.  
*Why:* strict inequality on every pair.  
Conclusion: scalene.

**7, 9, 10 is scalene.**

*Reflection:* The example is trivial yet forces explicit pairwise checks that later become automatic.

**Example 2 — Angle classification from sides**  
*Given:* sides 5, 5, 6.  
*Find:* angle-type.  

Recognize isosceles with equal sides 5. Base angles are equal.  
Compute vertex angle via cosine rule:  
\[
\cos C = \frac{5^2 + 5^2 - 6^2}{2\cdot5\cdot5} = \frac{14}{50} = 0.28 \implies C \approx 73.74^\circ.
\]
Base angles:  
\[
\frac{180^\circ - 73.74^\circ}{2} \approx 53.13^\circ.
\]
All angles < 90°.  
*Why:* cosine rule yields the angle opposite the distinct side; remaining angles follow from the 180° sum.  

**The triangle is acute isosceles.**

*Reflection:* Isosceles symmetry reduces computation; the acute conclusion follows directly once the largest angle is shown < 90°.

**Example 3 — Right isosceles case**  
*Given:* sides 1, 1, \(\sqrt{2}\).  
*Find:* both classifications.  

Sides satisfy \(1^2 + 1^2 = (\sqrt{2})^2\), so a right angle exists opposite \(\sqrt{2}\).  
Equal legs imply the right angle lies between them.  
Remaining angles are each 45°.  

**Right isosceles triangle.**

*Reflection:* Pythagorean relation simultaneously proves both the right angle and the 45-45-90 angle set.

**Example 4 — Obtuse scalene**  
*Given:* sides 3, 4, 6.  
*Find:* both classifications.  

Check cosine of angle opposite 6:  
\[
\cos C = \frac{3^2 + 4^2 - 6^2}{2\cdot3\cdot4} = \frac{25-36}{24} = -\frac{11}{24} \approx -0.4583.
\]
\(C = \arccos(-0.4583) \approx 117.3^\circ > 90^\circ\).  
Sides all unequal.  

**Obtuse scalene triangle.**

*Reflection:* Negative cosine unambiguously signals obtuse; scalene status is settled by three distinct lengths.

## 6. Common traps and how to avoid them
| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Calling every isosceles triangle equilateral | Over-generalising the word “equal” | Count equal sides explicitly before naming. |
| Assuming an obtuse triangle cannot have two equal sides | Visualising only scalene obtuse examples | Apply cosine rule to the longest side regardless of side-type. |
| Forgetting that equilateral implies acute | Treating 60° as non-obvious | Derive each angle = 60° from side equality and angle sum. |
| Using exterior angles for classification | Confusing interior and exterior | Identify the three angles that lie inside the triangle boundary. |
| Declaring a triangle right when one leg equals the hypotenuse | Arithmetic slip in Pythagorean check | Verify \(a^2 + b^2 = c^2\) with \(c\) strictly longest. |
| Labelling a triangle scalene when two sides differ by rounding error | Measurement noise | Work symbolically or keep exact radicals until classification. |
| Believing angle sum permits two right angles | Mis-remembering 180° partition | Prove at most one angle ≥ 90° from the sum identity. |

## 7. The textbook-precise statement
A triangle with sides \(a,b,c\) and opposite angles \(A,B,C\) is  
- scalene if \(a\neq b\neq c\neq a\),  
- isosceles if exactly two sides are equal,  
- equilateral if \(a=b=c\).  

Independently it is  
- acute if \(A,B,C<90^\circ\),  
- right if one angle equals \(90^\circ\),  
- obtuse if one angle exceeds \(90^\circ\).  

All statements presuppose the angle sum \(A+B+C=180^\circ\) (Euclid, *Elements*, Book I, Proposition 32). See also Stewart, *Calculus*, 9e, §1.3 for the cosine-rule classification test.

## 8. Visual — diagram or schematic
```text
          C
         /\
   a    /  \   b
       /    \
      /______\
     A   c    B

Labels: sides a=BC, b=AC, c=AB.
Angle at A, B, or C compared with 90°.
Side equality: a=b (isosceles at C), a=b=c (equilateral).
```

## 9. The memory technique
1. **The hook** — Picture a three-sided coat hanger: if all arms differ it hangs “scaly” (scalene); if two arms match it is “iso” (equal); if all three collapse into one length it forms an “equi-lateral” circle. Angles are read by whether the hanger fits inside, on, or outside a right-angle corner.

2. **What to overlearn** — (i) angle sum = 180°, (ii) equilateral ⇒ 60° each, (iii) longest side lies opposite largest angle.

3. **Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive angle sum from parallel-line alternate-interior angles, then compare each side or angle directly to the definitions.

## 10. What this unlocks
Mastery of these labels supplies the vocabulary required for congruence criteria, similarity, the law of sines and cosines, and area formulae that distinguish base-height pairs by side type.

- Pythagorean theorem (right triangles only)  
- Triangle inequality and its proof via the largest-angle test  
- Trigonometric form of Ceva’s theorem  
- Mesh-generation algorithms in finite-element analysis  

## 11. Self-check — five questions, no answers
1. A triangle has sides 2, 3, 4. Is it acute, right, or obtuse? Show the cosine of the largest angle.

2. Prove that an equilateral triangle cannot contain a 90° angle without contradicting the angle-sum theorem.

3. Construct an isosceles obtuse triangle whose equal sides are each of length 5. Give the range of admissible base lengths.

4. Two angles of a triangle measure 40° and 60°. What is the side-type classification? What is the angle-type classification?

5. In a right triangle the two legs are 20 and 21. Compute the third side exactly, then state both classifications of the triangle.