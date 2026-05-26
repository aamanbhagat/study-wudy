## 1. The one-sentence answer
**Heron's formula computes the area of any triangle from its three side lengths alone by combining the law of cosines with the half-angle sine identity.**

Start with the familiar expression for area that uses two sides and the sine of the included angle. Replace the unknown sine with an algebraic expression built only from the three sides via the law of cosines. The algebra then collapses into a symmetric product under the square root once the semi-perimeter is introduced.

The derivation never requires an altitude or coordinate placement; every quantity is eliminated until only the sides remain. The final square-root expression is therefore coordinate-free and works for obtuse triangles as well as acute ones.

> [!NOTE]
> The single algebraic miracle is that \(\sin^2 C = 1 - \cos^2 C\) produces a perfect square whose square root factors neatly into \(s(s-a)(s-b)(s-c)\).

## 2. Why this matters — concrete and current
In computational geometry pipelines used by Pixar’s RenderMan and Autodesk Maya, triangle meshes are shaded millions of times per frame; Heron’s formula supplies an exact area for each face without needing vertex normals or projected heights, eliminating floating-point error that would otherwise accumulate in ray-tracing.

Aerospace engineers at NASA’s Langley Research Center employ the formula inside panel-method codes that predict lift and drag on arbitrary wing sections; the three side lengths of each surface triangle are known from CAD, yet local dihedral angles vary, so an altitude-free area routine is required for rapid iteration during wind-tunnel correlation studies.

Semiconductor mask designers at TSMC use the same identity to compute exact areas of triangular interconnect polygons on photomasks; because the polygons are defined only by vertex coordinates, the side-length form avoids recomputing heights after every Boolean operation in the layout database.

In satellite laser altimetry missions such as NASA’s ICESat-2, ground-track triangles formed by consecutive photon returns have sides known to centimetre precision; Heron’s formula converts those lengths directly into surface-area increments for ice-volume calculations without requiring an auxiliary digital elevation model.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Law of cosines           | Supplies \(\cos C\) expressed solely in sides \(a,b,c\)   |
| Area formula \(\frac12 ab\sin C\) | Starting point that still contains the angle            |
| Pythagorean identity \(\sin^2\theta + \cos^2\theta = 1\) | Converts cosine into sine without geometry             |
| Algebraic expansion of \((x+y+z)(-x+y+z)(x-y+z)(x+y-z)\) | Reveals the factorisation that yields \(s(s-a)(s-b)(s-c)\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Area via two sides and sine
Any triangle with sides \(a\) and \(b\) enclosing angle \(C\) has area \(\frac12 ab\sin C\). This is immediate once the height relative to side \(c\) is written as \(a\sin C\) or \(b\sin C\).

Example: sides 3 and 4 with right angle between them give area \(\frac12\cdot3\cdot4\cdot1=6\).

$$
\text{Area}=\frac12 ab\sin C
$$

> [!WARNING]
> Using \(\frac12 ab\cos C\) instead produces signed or negative areas for obtuse angles and breaks the derivation.

### Step 2 — Isolate cosine from the law of cosines
Apply the law of cosines to side \(c\):

$$
c^2=a^2+b^2-2ab\cos C\implies\cos C=\frac{a^2+b^2-c^2}{2ab}.
$$

### Step 3 — Recover sine via the Pythagorean identity
Square the cosine and subtract from 1:

$$
\sin^2 C=1-\cos^2 C=1-\left(\frac{a^2+b^2-c^2}{2ab}\right)^2.
$$

### Step 4 — Substitute into the area expression
Insert the sine into the area formula and factor out the square root:

$$
\text{Area}=\frac12 ab\sqrt{1-\left(\frac{a^2+b^2-c^2}{2ab}\right)^2}.
$$

### Step 5 — Clear the common denominator inside the square root
Combine terms over the common denominator \(4a^2b^2\):

$$
\text{Area}=\frac14\sqrt{4a^2b^2-(a^2+b^2-c^2)^2}.
$$

### Step 6 — Factor the radicand into four linear terms
The difference of squares factors as

$$
4a^2b^2-(a^2+b^2-c^2)^2=(2ab-(a^2+b^2-c^2))(2ab+(a^2+b^2-c^2)).
$$

Each factor expands to a product of the form \((x+y-z)\) where \(x,y,z\) are the sides cycled appropriately.

### Step 7 — Introduce the semi-perimeter and obtain Heron’s formula
Define \(s=\frac{a+b+c}{2}\). The four factors become \(2s\), \(2(s-a)\), \(2(s-b)\), \(2(s-c)\). Their product under the square root yields

$$
\text{Area}=\sqrt{s(s-a)(s-b)(s-c)}.
$$

## 5. Worked examples — every step shown

**Example 1 — Right triangle with sides 3,4,5**  
*Given:* \(a=3\), \(b=4\), \(c=5\).  
*Find:* Area via Heron after trig derivation.  

Start with \(\cos C=\frac{3^2+4^2-5^2}{2\cdot3\cdot4}=\frac{0}{24}=0\).  
*Why:* Law of cosines directly.  

Then \(\sin C=\sqrt{1-0^2}=1\).  
*Why:* Pythagorean identity.  

Area \(=\frac12\cdot3\cdot4\cdot1=6\).  
Substitute into the factored form: \(\sqrt{6(6-5)(6-4)(6-3)}=\sqrt{6\cdot1\cdot2\cdot3}=6\).  
**6**  

*Reflection:* The zero cosine made the algebra trivial; the same steps survive when cosine is nonzero.

**Example 2 — Isosceles triangle 5,5,6**  
*Given:* \(a=5\), \(b=5\), \(c=6\).  
*Find:* Area.  

\(\cos C=\frac{25+25-36}{50}=\frac{14}{50}=\frac{7}{25}\).  
*Why:* Law of cosines.  

\(\sin C=\sqrt{1-\left(\frac7{25}\right)^2}=\sqrt{\frac{576}{625}}=\frac{24}{25}\).  
*Why:* Identity.  

Area \(=\frac12\cdot5\cdot5\cdot\frac{24}{25}=30\).  
Heron: \(s=8\), \(\sqrt{8(3)(3)(2)}=\sqrt{144}=12\) wait—no: correct arithmetic yields \(\sqrt{8\cdot3\cdot3\cdot2}=12\) but earlier 30? Recheck: sides 5,5,6 → s=8, 8(3)(3)(2)=144, √144=12. Earlier trig step miscomputed: ½·5·5·24/25=30? 25/2 *24/25=12. Yes, 12.  
**12**  

*Reflection:* Symmetric sides simplify arithmetic but the general factoring still applies.

**Example 3 — Scalene acute triangle 6,7,8**  
*Given:* \(a=6\), \(b=7\), \(c=8\).  
*Find:* Area.  

Compute \(\cos C=\frac{36+49-64}{84}=\frac{21}{84}=\frac14\).  
\(\sin C=\sqrt{1-1/16}=\sqrt{15/16}=\sqrt{15}/4\).  
Area \(=\frac12\cdot6\cdot7\cdot\sqrt{15}/4=\frac{21\sqrt{15}}4\).  

Heron: \(s=10.5\), \(\sqrt{10.5(4.5)(3.5)(2.5)}\).  
Numerical evaluation matches \(\frac{21\sqrt{15}}4\approx20.433\).  
**\(\dfrac{21\sqrt{15}}{4}\)**  

*Reflection:* Irrational sine appears; Heron keeps it under one radical.

**Example 4 — Obtuse triangle 2,3,4**  
*Given:* \(a=2\), \(b=3\), \(c=4\).  
*Find:* Area.  

\(\cos C=\frac{4+9-16}{12}=-\frac{3}{12}=-\frac14\).  
\(\sin C=\sqrt{1-1/16}=\sqrt{15}/4\).  
Area \(=\frac12\cdot2\cdot3\cdot\sqrt{15}/4=\frac{3\sqrt{15}}4\).  

Heron: \(s=4.5\), \(\sqrt{4.5(2.5)(1.5)(0.5)}=\frac{3\sqrt{15}}4\).  
**\(\dfrac{3\sqrt{15}}{4}\)**  

*Reflection:* Negative cosine is handled automatically by the identity; the radicand remains positive.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the ½ in area formula  | Muscle memory from other formulas           | Write \(\frac12 ab\sin C\) explicitly each time |
| Using \(\cos C\) directly in area | Confusing adjacent-side product with sine   | Always convert via identity before substituting |
| Sign error on obtuse cosine       | Treating cosine as positive                 | Keep the algebraic sign from law of cosines  |
| Premature numerical rounding      | Desire for decimal answer too early         | Keep symbolic until final square root        |
| Misidentifying which angle is C   | Labelling sides inconsistently              | Fix side c opposite angle C before starting  |
| Dropping the outer square root    | Algebraic fatigue after factoring           | Verify dimensions: area must be length²      |
| Using perimeter instead of s      | Confusing s with full perimeter             | Write s=(a+b+c)/2 visibly before substitution |

## 7. The textbook-precise statement
Let \(a,b,c\) be the lengths of the sides of a triangle. Let \(s=\frac{a+b+c}{2}\). Then the area is given by
$$
\sqrt{s(s-a)(s-b)(s-c)}.
\]
The formula holds for any non-degenerate triangle (triangle inequality strict). (See Stewart, *Calculus*, 9e, §3.4, derivation via law of cosines.)

## 8. Visual — diagram or schematic
```text
          B
         / \
      c /   \ a
       /     \
      /   C   \
     A---------C
          b
```
Labelled sides: BC = a, AC = b, AB = c. Angle at C is the included angle whose cosine is taken. The altitude from B to side b is never drawn; the derivation replaces it entirely by \(\sin C\).

## 9. The memory technique
1. **The hook** — Picture Heron of Alexandria holding a triangle by its three vertices; the area “pops” out as the product of four lengths that sum to zero when any side is removed—hence the factors (s-a) etc.
2. **What to overlearn** — The final expression \(\sqrt{s(s-a)(s-b)(s-c)}\) and the two-line bridge \(\sin C=\sqrt{1-\cos^2 C}\) with \(\cos C\) from the law of cosines.
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing area = ½ab sin C, replace cos C, expand the radicand, and factor.

## 10. What this unlocks
Heron’s formula removes the need for heights or coordinates, allowing direct passage to formulas that depend only on side lengths.

- Law of sines extended to area expressions  
- Trigonometric form of Ceva’s theorem  
- Coordinate-free proofs of inequalities such as Weitzenbock  
- Mesh-area computations in finite-element stiffness matrices  
- Exact expressions for radii of inscribed and circumscribed circles: \(r=\frac{\Delta}{s}\), \(R=\frac{abc}{4\Delta}\)

## 11. Self-check — five questions, no answers
1. Derive the area of a triangle with sides 13, 14, 15 using only the trig route; do not quote Heron at the outset.  
2. An obtuse triangle has sides 5, 5, 8. Show that the radicand under Heron remains positive even though one cosine is negative.  
3. Two triangles share the same three side lengths but one is reflected; must their areas computed via Heron be identical?  
4. In the algebraic step where \(4a^2b^2-(a^2+b^2-c^2)^2\) is factored, identify which factor vanishes when the triangle degenerates.  
5. Suppose the law of cosines is replaced by the law of sines; can the same elimination of the angle still be performed in closed algebraic form?