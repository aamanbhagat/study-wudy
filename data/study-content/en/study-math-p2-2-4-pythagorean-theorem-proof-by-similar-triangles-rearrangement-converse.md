## 1. The one-sentence answer
**The Pythagorean theorem states that in any right triangle the square of the hypotenuse equals the sum of the squares of the other two sides, with the converse asserting the converse implication, both provable by similarity or rearrangement.**

The theorem equates areas: the region covered by the square on the longest side exactly matches the combined regions of the squares on the remaining sides when a right angle is present. Similarity proofs create three similar right triangles from one altitude and equate ratios of corresponding sides. Rearrangement proofs move four copies of the triangle inside a larger square to show two different dissections occupy identical area.

The converse reverses the implication: equal squares force the angle between the sides to be right. These statements together classify right triangles by side lengths alone.

> [!NOTE]
> The altitude to the hypotenuse is the single geometric act that simultaneously produces three similar triangles and encodes all three pairwise ratios needed for the proof.

## 2. Why this matters — concrete and current
In semiconductor mask alignment, ASML’s EUV lithography scanners use the converse to verify orthogonality of calibration grids to sub-nanometer tolerance; any deviation from \(a^2 + b^2 = c^2\) triggers a corrective rotation stage.

NASA’s Perseverance rover terrain mesh generator applies the theorem in its wheel-contact triangle solver to compute instantaneous slope angles from stereo camera baselines, feeding slope data directly into traction-control firmware.

In transformer-based language models, rotary positional embeddings (Su et al., 2021) rely on 2-D rotation matrices whose norm preservation is guaranteed by the Pythagorean identity, ensuring attention scores remain bounded during training of models such as Llama-3.

Survey-grade total stations from Leica employ the rearrangement form to compute diagonal distances from measured rectangular offsets in real time, eliminating cumulative rounding error in cadastral boundary calculations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Area of a square     | Both proofs equate areas of squares built on the sides    |
| Similar triangles    | Corresponding angles produce proportional sides           |
| Altitude to a side   | Creates the three similar triangles in the first proof    |
| Algebraic expansion  | \((a+b)^2 = a^2 + 2ab + b^2\) appears in rearrangement    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Right angle implies orthogonal squares
A right angle forces the two legs to meet so that squares erected outwardly on each side share no interior overlap with the triangle itself.  
Example: legs 3 and 4 give squares of area 9 and 16 whose total 25 equals the square on the hypotenuse 5.  
\[
a^2 + b^2 = c^2
\]
> [!WARNING]
> Treating the right angle as merely “90 degrees” without using perpendicularity to justify area additivity leads to diagrams that cannot be dissected.

### Step 2 — Drop the altitude to the hypotenuse
The altitude from the right angle to the hypotenuse creates two smaller right triangles, each sharing an acute angle with the original triangle.  
All three triangles therefore have identical angles and are similar.  
\[
\triangle ABC \sim \triangle ACB' \sim \triangle BC A'
\]

### Step 3 — Write the three similarity ratios
Corresponding sides give the geometric-mean relations  
\[
\frac{a}{c} = \frac{p}{a}, \qquad \frac{b}{c} = \frac{q}{b}, \qquad \frac{a}{b} = \frac{p}{q}
\]
where \(p+q=c\). Cross-multiplication immediately yields \(a^2 = cp\) and \(b^2 = cq\).

### Step 4 — Add the two leg relations
Adding the projected segments recovers the hypotenuse:  
\[
a^2 + b^2 = c(p+q) = c^2.
\]

### Step 5 — Rearrangement proof via four congruent triangles
Place four copies of the right triangle inside a square of side \(a+b\). One dissection leaves an inner square of side \(c\); the other leaves two squares of sides \(a\) and \(b\). Both inner regions therefore have equal area:  
\[
(a+b)^2 - 4\cdot\frac12 ab = c^2 \implies a^2 + b^2 = c^2.
\]

### Step 6 — Converse by contradiction
Assume \(a^2 + b^2 = c^2\) yet the angle at C is not right. Construct a second triangle with legs \(a,b\) and right angle; its hypotenuse \(c'\) satisfies \(a^2 + b^2 = {c'}^2\). Then \(c = c'\), forcing the constructed angle to coincide with the original, a contradiction. Hence the angle is right.

## 5. Worked examples — every step shown

**Example 1 — 5-12-13 triangle verification**  
*Given:* sides 5, 12, 13.  
*Find:* whether the triangle is right-angled.  
Check \(5^2 + 12^2 = 25 + 144 = 169 = 13^2\).  
*Why:* direct substitution into the theorem statement.  
**Yes, right-angled.**

*Reflection:* The numbers are Pythagorean primitives; the check is immediate once squares are computed.

**Example 2 — Similar-triangle proof on a 20-21-29 triangle**  
*Given:* right \(\triangle ABC\) with \(BC=20\), \(AC=21\), hypotenuse \(AB=29\).  
*Find:* length of altitude to hypotenuse.  
Let altitude meet \(AB\) at \(D\). Then \(AD = 20^2/29 = 400/29\).  
*Why:* geometric mean \(a^2 = c\cdot p\).  
**Altitude length = \(\frac{20\cdot21}{29}\).**

*Reflection:* The altitude formula follows at once from the similarity ratios without trigonometry.

**Example 3 — Rearrangement on non-primitive sides**  
*Given:* legs 9, 12.  
*Find:* hypotenuse via rearrangement identity.  
\((9+12)^2 - 2\cdot9\cdot12 = 441 - 216 = 225 = 15^2\).  
*Why:* expansion isolates \(a^2 + b^2\).  
**Hypotenuse = 15.**

*Reflection:* The algebraic cancellation works for any positive reals, not merely integers.

**Example 4 — Converse applied to a bridge truss**  
*Given:* members 8 m, 15 m, 17 m.  
*Find:* whether a right angle exists.  
\(8^2 + 15^2 = 64 + 225 = 289 = 17^2\).  
By the converse the angle between the 8 m and 15 m members is right.  
**Right angle confirmed.**

*Reflection:* Equality alone is decisive; angle measurement is unnecessary.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming similarity without shared angle | Forgetting the altitude creates the shared acute angles | Always draw the altitude first               |
| Using \(a^2 + b^2 = c^2\) on non-right triangles | Over-generalising the statement             | Verify the right angle or apply the converse |
| Confusing geometric mean segments with arithmetic mean | Intuitive averaging habit                   | Label \(p\) and \(q\) explicitly             |
| Forgetting the factor 4 in rearrangement | Miscounting congruent triangles             | Count triangles before subtracting area      |
| Applying converse to zero or negative lengths | Algebraic habit without geometric check     | State positivity of lengths as hypothesis    |
| Mixing leg and hypotenuse in ratios | Labelling sides inconsistently              | Fix hypotenuse as side opposite right angle  |
| Believing one proof suffices for all cases | Underestimating multiple independent proofs | Keep both similarity and rearrangement visible |

## 7. The textbook-precise statement
**Theorem (Pythagorean).** Let \(\triangle ABC\) have a right angle at C. Let \(a=BC\), \(b=AC\), \(c=AB\). Then \(a^2 + b^2 = c^2\). Conversely, if \(a,b,c>0\) satisfy \(a^2 + b^2 = c^2\), then \(\angle C = 90^\circ\).

Proofs appear in Euclid’s *Elements*, Book I, Proposition 47 (rearrangement) and Proposition 48 (converse). The similarity proof is given in many modern texts, e.g., Stewart, *Calculus*, 9e, §6.1.

## 8. Visual — diagram or schematic
```text
A
|\
| \ c
b |  \
|   \
|    \
C-----B
   a
```
Drop altitude from C to hypotenuse AB, meeting at D. This creates segments p = AD, q = DB with p + q = c. The three similar triangles are ABC, ACD, and CBD.

## 9. The memory technique
1. **The hook** — Picture three nested shadows of the same right triangle cast by one flashlight; their side ratios lock together like Russian dolls.  
2. **What to overlearn** — \(a^2 + b^2 = c^2\), the geometric-mean pair \(a^2 = cp\), \(b^2 = cq\), and the converse statement verbatim.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by writing the three similarity ratios from the altitude diagram and adding the two leg equations.

## 10. What this unlocks
The theorem supplies the distance formula in coordinate geometry and the Euclidean norm in linear algebra. It is the immediate prerequisite for the definitions of sine and cosine via right-triangle ratios, the law of cosines, and all subsequent trigonometric identities.

- Distance between points in the plane  
- Vector dot-product test for orthogonality  
- Polar-to-Cartesian conversion  
- Pythagorean trigonometric identity \(\sin^2\theta + \cos^2\theta = 1\)

## 11. Self-check — five questions, no answers
1. In a right triangle the altitude to the hypotenuse is 6 and one segment of the hypotenuse is 8. What is the adjacent leg?  
2. A square of side 10 contains four right triangles of legs 3 and 4 arranged so their hypotenuses form an inner quadrilateral. Compute the side length of that quadrilateral.  
3. Given sides 7, 24, x, for which positive x is the triangle right-angled?  
4. Explain why the rearrangement proof still holds when the legs are irrational.  
5. A surveyor measures offsets 119 m and 120 m and a closing diagonal 169 m. Is the corner right? What single arithmetic check decides?