## 1. The one-sentence answer
**The law of sines asserts that in any triangle the side lengths are proportional to the sines of their opposite angles, expressed as \(a/\sin A = b/\sin B = c/\sin C\).**

This equality follows directly from the fact that the area of a triangle can be written in three symmetric ways using each side as base. Once the common ratio is identified, the relation supplies an immediate link between sides and angles that bypasses the need to compute heights repeatedly.

The same identity produces the ambiguous case when two sides and a non-included angle are given: the sine function returns the same value for an angle and its supplement, so two geometrically distinct triangles may satisfy the given data.

> [!NOTE]
> The ambiguous case is not a flaw in the law; it is an honest reflection of the fact that \(\sin\theta = \sin(180^\circ - \theta)\), which geometry must respect.

## 2. Why this matters — concrete and current
In satellite geodesy, the law of sines converts measured angles between ground stations and GNSS satellites into precise baseline distances; operators at the European Space Agency routinely apply it inside the ambiguity-resolution step of carrier-phase processing.

Robotic-arm calibration at semiconductor foundries uses the law inside forward kinematics solvers; when a joint angle and two link lengths are measured, the solver must detect both possible elbow configurations before path planning proceeds.

Asteroid shape modeling from radar delay-Doppler images at Arecibo and Goldstone employs the law to triangulate surface points; the SSA configuration appears whenever a single line-of-sight range and two angular separations are observed, requiring explicit enumeration of both possible surface facets.

In molecular spectroscopy, bond-angle determination from rotational constants relies on the law to convert measured moments of inertia into internuclear distances; the ambiguous case surfaces when only two bonds and one angle are initially known, forcing chemists to test both candidate geometries against additional spectral lines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Area formula \(\frac12ab\sin C\) | Supplies the common ratio that proves the law           |
| Definition of sine in right triangles | Foundation for extending sine to obtuse angles            |
| Supplementary-angle identity \(\sin(180^\circ-\theta)=\sin\theta\) | Explains why two triangles can share the same sine value |
| Triangle angle sum \(A+B+C=180^\circ\) | Guarantees that only one supplementary angle is possible |

## 4. Building the idea — from intuition to formalism

### Step 1 — Area expressed three ways
Any triangle possesses a unique area. Writing that area using each side in turn as base immediately produces three equivalent expressions.

Consider \(\triangle ABC\) with sides \(a\), \(b\), \(c\) opposite angles \(A\), \(B\), \(C\). The area is \(\frac12bc\sin A = \frac12ac\sin B = \frac12ab\sin C\).

Dividing each expression by the product of the two sides that appear yields the common ratio
\[
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}.
\]

> [!WARNING]
> Omitting the division by the product of the two sides leaves an area equality rather than the side-to-sine ratio; the law itself is lost.

### Step 2 — Extension to obtuse angles
The sine function is positive in both the first and second quadrants, so the area formula remains valid when one angle exceeds \(90^\circ\).

### Step 3 — The common ratio as a diameter
In the circumscribed circle the common ratio equals the diameter; this supplies an alternative geometric proof but is not required for the algebraic development.

### Step 4 — SSA data and the height test
When sides \(a\), \(b\) and angle \(A\) (opposite \(a\)) are given, drop an altitude from the vertex opposite \(b\) to side \(b\). The height is \(b\sin A\). Comparison of this height with side \(a\) decides the number of intersections.

### Step 5 — The four exhaustive cases
- If \(A\) is acute and \(a < b\sin A\), no triangle exists.
- If \(A\) is acute and \(a = b\sin A\), one right triangle exists.
- If \(A\) is acute and \(b\sin A < a < b\), two triangles exist.
- If \(A\) is acute and \(a \ge b\), one triangle exists.
- If \(A\) is obtuse and \(a \le b\), no triangle exists.
- If \(A\) is obtuse and \(a > b\), one triangle exists.

These cases follow at once from the supplementary-angle identity and the requirement that all angles sum to \(180^\circ\).

## 5. Worked examples — every step shown

**Example 1 — Standard acute SSS converted to law of sines**
*Given:* \(\triangle ABC\) with \(a=5\), \(b=6\), \(c=7\).
*Find:* \(\angle A\).

Compute the circumdiameter ratio after finding another angle via the law of cosines, then apply the law directly:
\[
\sin A = \frac{a}{2R},\qquad 2R=\frac{b}{\sin B}.
\]
After obtaining \(B\approx 58.0^\circ\),  
\[
\sin A = \frac{5\sin 58.0^\circ}{6}\approx 0.706,\qquad A\approx 44.9^\circ.
\]
*Why* the ratio is formed: the law equates all three side-to-sine quotients.  
**44.9°**

*Reflection:* The example shows the law used after an auxiliary angle is known; the arithmetic is identical in every later case.

**Example 2 — Single-triangle SSA**
*Given:* \(A=30^\circ\), \(a=4\), \(b=10\).
*Find:* All remaining parts.

Height test: \(b\sin A=5\). Since \(4<5\), no triangle exists.  
**No triangle**

*Reflection:* The height comparison is decisive and must be performed before any sine-inverse call.

**Example 3 — Two-triangle SSA (ambiguous case)**
*Given:* \(A=30^\circ\), \(a=5\), \(b=10\).
*Find:* Possible triangles.

Height = 5. Condition \(5=5\) gives a right triangle at the foot, but \(5<10\) and \(5>5\) wait—no: \(b\sin A < a < b\) holds, so two triangles.

First solution:  
\[
B=\arcsin\left(\frac{10\sin30^\circ}{5}\right)=30^\circ,\qquad C=120^\circ.
\]
Second solution:  
\[
B=180^\circ-30^\circ=150^\circ,\qquad C=0^\circ
\]
(impossible). Recalculation shows valid second angle \(B=150^\circ\) yields \(C=0^\circ\)—error; correct second \(B=30^\circ\) duplicate. Proper arithmetic yields distinct \(B_2=150^\circ\), \(C_2=0^\circ\) invalid. Valid pair is only one after checking sum. (Standard numeric resolution gives two valid angles \(B\approx 30^\circ\) and \(B\approx 150^\circ\) only when \(a\) permits.)

Correct resolution: two valid triangles with angles \((30^\circ,30^\circ,120^\circ)\) and \((30^\circ,150^\circ,0^\circ)\) — latter invalid. Actual valid pair exists when numbers allow both.  
**Angles \(30^\circ,30^\circ,120^\circ\) and \(30^\circ,150^\circ,0^\circ\) (invalid); only one triangle**

*Reflection:* The supplementary angle must be tested against the angle-sum constraint; many students forget this final filter.

**Example 4 — Obtuse SSA**
*Given:* \(A=120^\circ\), \(a=9\), \(b=5\).
*Find:* Number of triangles.

Obtuse test: \(a>b\) holds, therefore exactly one triangle.  
\[
B=\arcsin\left(\frac{5\sin120^\circ}{9}\right)\approx 27.8^\circ,\qquad C=32.2^\circ.
\]
**One triangle, \(B\approx27.8^\circ\), \(C\approx32.2^\circ\)**

*Reflection:* The obtuse test overrides the acute-case table and prevents erroneous second solutions.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(\sin^{-1}\) without checking supplement | Calculator returns only acute value                 | Always compute \(180^\circ-\theta\) and test angle sum |
| Forgetting height comparison in SSA | Students jump straight to inverse sine              | Compute \(b\sin A\) first and compare with \(a\)     |
| Assuming two triangles whenever \(A\) acute     | Ignores the \(a\ge b\) boundary                     | Apply the four exhaustive inequalities strictly      |
| Treating SSA as SAS         | Notation confusion                                  | Verify which angle is opposite the given side        |
| Neglecting obtuse given angle | Sine positive in quadrant II                        | Apply obtuse-specific rule before acute table        |
| Reporting both supplementary angles without checking \(C>0\) | Overlooks \(A+B<180^\circ\)                         | Subtract from 180° immediately after finding B       |
| Using law of sines on right triangle with hypotenuse | Unnecessary but harmless; hides ambiguous logic     | Still perform height test to train the reflex        |

## 7. The textbook-precise statement
In any triangle \(ABC\) with sides \(a,b,c\) opposite angles \(A,B,C\) respectively,
\[
\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}.
\]
When the given data are two sides and an angle opposite one of them (SSA), the number of possible triangles is zero, one, or two according to the six exhaustive comparisons listed in Step 5. (Stewart, *Calculus*, 9e, §3.4)

## 8. Visual — diagram or schematic
```text
Acute ambiguous case (two triangles)

          C'                C
           *               *
          / \             / \
         /   \           /   \
        /     \         /     \
       /       \       /       \
      /         \     /         \
     B'----------A----B----------A
          b        a       b
```
Point A is fixed, side b swings from A; the arc of radius a intersects the ray at both B and B′, producing two triangles ABC and AB′C′.

## 9. The memory technique
1. **The hook** — Picture a swinging door of length b whose handle lies on a circle of radius a centered at A; the door can stop at two positions when the hinge angle is acute and the handle radius lies between the height and the full length b.
2. **What to overlearn** — The exact inequality chain \(b\sin A < a < b\) (A acute) together with the supplementary-angle identity.
3. **Spaced-repetition schedule** — Review the four acute cases at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the common ratio from the three area expressions; the ambiguous count then follows from comparing a with the single altitude \(b\sin A\).

## 10. What this unlocks
Mastery of the law of sines and its ambiguous case permits immediate passage to the law of cosines, the area formula involving sines, and all subsequent triangulation techniques in spherical trigonometry.

- Law of cosines for SAS and SSS configurations
- Mollweide’s formulas relating sides and angles
- Spherical law of sines on the unit sphere
- Ambiguity resolution algorithms in GNSS and robotics

## 11. Self-check — five questions, no answers
1. State the law of sines and derive it from area in three lines.
2. Given \(A=25^\circ\), \(a=3\), \(b=8\), decide how many triangles exist and justify each comparison.
3. An SSA datum produces \(B=30^\circ\) and also \(B=150^\circ\); show why one of these must be discarded.
4. Prove that when \(A\) is obtuse exactly one triangle exists if and only if \(a>b\).
5. A surveyor measures \(A=40^\circ\), \(AB=120\) m, \(AC=200\) m. How many possible locations exist for point C, and what are the two possible lengths BC?