## 1. The one-sentence answer
**The area of any triangle equals half the product of two sides and the sine of the included angle.**

Any triangle can be placed inside a rectangle whose sides are exactly those two given lengths. The height of the triangle is then the adjacent side multiplied by the sine of the angle between them, because sine directly measures the vertical rise per unit length along the base. Multiplying that height by the base and dividing by two recovers the familiar area formula without ever needing the altitude itself.

This single relation replaces the classical “half base times height” whenever the height is inconvenient to measure or calculate. It works for acute angles, obtuse angles, and right angles alike, provided the angle lies between the two chosen sides.

> [!NOTE]
> The sine function automatically supplies the correct height even when the angle exceeds 90°, because sin(180° − θ) = sin θ; thus the formula needs no extra cases.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX’s flight-dynamics team uses the formula to compute instantaneous cross-sectional area of a spacecraft relative to the Sun for solar-radiation-pressure torque calculations; two position vectors from the centre of mass and the included angle give the projected area in a single step.

Semiconductor mask designers at TSMC employ the same identity when verifying the area of triangular fill patterns used to balance local metal density; the two edge lengths and the vertex angle are known from the layout database, so area is obtained without constructing an auxiliary altitude.

In robotic grasping, Boston Dynamics’ Atlas control software evaluates the area of the contact triangle formed by three fingertip force vectors; the included angle is read from the wrist IMU, allowing real-time adjustment of grip force to keep the grasp wrench inside the friction cone.

Surveyors at Ordnance Survey still rely on the formula when reducing theodolite measurements to map area; two measured sides and the horizontal angle between them yield the area of each triangular parcel without requiring a perpendicular offset.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of sine       | Supplies the height-to-hypotenuse ratio that replaces explicit altitude |
| Area of a rectangle      | Starting point for the geometric derivation               |
| Angle between two sides  | Must be the included angle; otherwise the sine relation fails |
| Radians versus degrees   | Calculator mode must match the unit of the given angle    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Drop a perpendicular from the opposite vertex
Place any triangle ABC so that sides a and b meet at vertex C. Drop a perpendicular from the third vertex to the line containing side b; call the foot D. The length of that perpendicular is the height corresponding to base b.

Example: sides a = 5, b = 4, ∠C = 30°. The perpendicular falls inside the triangle and its length equals 5 sin 30° = 2.5.

$$h = a\sin C$$

> [!WARNING]
> If you drop the perpendicular to the wrong side, the angle used is no longer ∠C and the sine term becomes meaningless for the given data.

### Step 2 — Express the height with the sine ratio
In the right triangle formed by the perpendicular, side a is the hypotenuse and ∠C is one acute angle. By definition, sin C equals opposite over hypotenuse, so the height is a sin C.

Example continued: sin 30° = ½, therefore h = 5 × ½ = 2.5.

$$h = a\sin C$$

> [!WARNING]
> Using cosine instead of sine gives the adjacent segment, not the height; the area would then be wrong.

### Step 3 — Multiply by the chosen base and halve
The area of the original triangle is half the product of base b and height h.

Example continued: area = ½ × 4 × 2.5 = 5.

$$\text{Area} = \frac12 b\cdot(a\sin C)$$

> [!WARNING]
> Forgetting the outer ½ produces twice the correct area.

### Step 4 — Rearrange to the symmetric form
The expression is symmetric in a and b, so we may write it with either side first.

$$\text{Area} = \frac12 ab\sin C$$

> [!WARNING]
> Swapping the angle for a non-included angle violates the derivation; the formula then gives an incorrect value.

### Step 5 — Verify the obtuse case
When ∠C > 90°, sin C remains positive and the perpendicular falls outside the triangle, yet the same algebraic expression continues to hold because sin(180° − θ) = sin θ.

Example: a = 5, b = 4, ∠C = 150°. sin 150° = ½, area = ½ × 5 × 4 × ½ = 5 (identical to the 30° case, as expected by geometry).

> [!WARNING]
> Treating sin of an obtuse angle as negative produces a negative area, which is meaningless.

## 5. Worked examples — every step shown

**Example 1 — Right-angled triangle check**  
*Given:* a = 3, b = 4, ∠C = 90°.  
*Find:* area.  
Area = ½ab sin C.  
Substitute: ½ × 3 × 4 × sin 90° = ½ × 12 × 1 = 6.  
*Why:* sin 90° = 1 by definition of the right angle.  
**6**  
*Reflection:* The formula reproduces the classic ½ab result for right triangles; any deviation signals an arithmetic slip.

**Example 2 — Acute non-right triangle**  
*Given:* a = 7, b = 5, ∠C = 42°.  
*Find:* area (calculator in degree mode).  
sin 42° ≈ 0.6694.  
Area = ½ × 7 × 5 × 0.6694 = ½ × 35 × 0.6694 ≈ 11.7145.  
*Why:* Multiplication is associative, so the ½ may be applied last.  
**11.71 (to 2 d.p.)**  
*Reflection:* Rounding occurs only at the final step; premature rounding of sin 42° introduces avoidable error.

**Example 3 — Obtuse included angle**  
*Given:* a = 10, b = 6, ∠C = 120°.  
*Find:* area.  
sin 120° = sin(180° − 60°) = sin 60° = √3/2.  
Area = ½ × 10 × 6 × √3/2 = 30 × √3/2 = 15√3.  
*Why:* The supplementary-angle identity preserves the positive height.  
**15√3**  
*Reflection:* The obtuse case requires no extra branch; the sine identity handles it automatically.

**Example 4 — Solve for an unknown angle**  
*Given:* sides 8 and 11 enclose an area of 35.  
*Find:* the included angle C.  
35 = ½ × 8 × 11 × sin C.  
35 = 44 sin C.  
sin C = 35/44 ≈ 0.7955.  
C = arcsin(0.7955) ≈ 52.8° or 180° − 52.8° = 127.2°.  
*Why:* The sine equation yields two solutions in [0°, 180°], both geometrically possible.  
**52.8° or 127.2°**  
*Reflection:* Always report both angles unless additional context (e.g., triangle inequality) discards one.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Using a non-included angle  | Habit from SAS congruence notation          | Explicitly label the angle between the two sides     |
| Calculator in wrong mode    | Default setting is radians                  | Check mode before every calculation                  |
| Forgetting the ½            | Confusion with vector cross-product magnitude | Write the ½ first on every line                      |
| Negative sine for obtuse angles | Mistaken sign convention                 | Recall sin(180° − θ) = sin θ > 0                     |
| Confusing side labels       | a opposite A, etc.                          | Draw the triangle and mark the included angle first  |
| Using degrees in a radians-only system | Library functions differ                | Convert explicitly or set the calculator mode        |
| Area reported negative      | Copying −ab sin C from vector formula       | Always take absolute value for geometric area        |

## 7. The textbook-precise statement
Let △ABC be any triangle in the Euclidean plane. Let sides b = AC and a = BC enclose angle C at vertex C. Then the area of △ABC is given by  
$$\text{Area}(\triangle ABC)=\frac12ab\sin C.$$  
The statement holds whether C is acute, right, or obtuse, provided 0° < C < 180°. (See Sullivan, *Precalculus*, 11e, §7.2, Theorem 2.)

## 8. Visual — diagram or schematic
```text
          B
         /|
        / | h = a sin C
       /  |
      /   |
   a /    |C = included angle
    /     |
   /______|
  A   b    D (foot of perpendicular)
```
Side AB = c (not needed). The height from B to side AC extended (if obtuse) still equals a sin C.

## 9. The memory technique
1. **The hook** — Picture the two sides a and b forming an open book; the sine of the opening angle instantly gives the “lift” of the opposite corner, and halving the rectangle they span yields the triangular area.  
2. **What to overlearn** — Area = ½ab sin C; sin(180° − θ) = sin θ; the angle must lie between a and b.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by dropping an altitude, writing h = a sin C, then Area = ½ b h.

## 10. What this unlocks
Mastery of this formula removes the need for altitudes in every subsequent trigonometric development and supplies the magnitude of the cross product in vector geometry.  
- Law of cosines derivations  
- Trigonometric form of the dot-product identity  
- Area formulas in coordinate geometry and determinants  
- Vector cross-product magnitude in 3-D rigid-body dynamics  
- Integration of polar areas expressed as ½ r₁ r₂ sin θ

## 11. Self-check — five questions, no answers
1. Two sides of lengths 9 and 12 enclose a 60° angle. Compute the area exactly.  
2. A triangle has sides 5 and 7 with included angle θ such that its area equals 12. Find two possible values of θ in degrees.  
3. Explain why the formula still returns a positive area when the included angle is 135°.  
4. A student computes ½ × 4 × 6 × sin 30° and obtains 12. Identify the error and give the correct area.  
5. In △ABC, sides a = 10, b = 10, area = 50. Without finding any angles, decide whether the included angle can be obtuse.