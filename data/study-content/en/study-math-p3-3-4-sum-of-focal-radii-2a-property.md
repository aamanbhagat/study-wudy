## 1. The one-sentence answer
**For any ellipse, the sum of the distances from every point on the curve to the two foci equals the constant length 2a, where a is the semi-major axis.**

This single numerical invariant replaces the need to track two separate distances. It arises because an ellipse is the set of points whose combined pull from two fixed centers remains fixed; the value 2a is exactly the length of the major axis, recovered when the point sits at either vertex. The constancy supplies both an algebraic identity and a physical construction: stretch a string of length 2a between two pins and trace the curve.

The property is independent of the coordinate system once the foci are located. It holds equally for points in the plane that satisfy the Cartesian equation of the ellipse and for points located by direct measurement. Consequently, any calculation involving distances to the foci can be replaced by the single number 2a.

> [!NOTE]
> The “string length” 2a is larger than the distance between the foci; the difference 2a − 2c equals the constant gap that keeps the curve from collapsing into a line segment.

## 2. Why this matters — concrete and current
Orbital mechanics at NASA and ESA uses the constant-sum property to compute transfer times on elliptical orbits without integrating the full two-body equations at every point; the vis-viva equation is derived directly from PF1 + PF2 = 2a.

Semiconductor mask writers employ elliptical laser spots whose intensity contours obey the same sum rule; metrology software corrects beam placement by measuring the invariant 2a rather than fitting separate focal offsets.

In gravitational lensing surveys (e.g., the Dark Energy Survey), candidate elliptical mass distributions are screened by checking whether image positions satisfy a constant sum of distances to two estimated foci, reducing false positives before full ray-tracing.

Acoustic design software for concert halls models elliptical reflectors so that every reflection path from one focus to the other totals exactly 2a; this guarantees coherent arrival times at the listener position.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula         | Computes PF1 and PF2 for any point P                      |
| Standard ellipse equation | Supplies the value of a and the location of the foci      |
| Pythagorean relation c² = a² − b² | Locates the foci once a and b are known                |
| Vertex coordinates       | Provides the simplest points where the sum equals 2a      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two fixed centers and a fixed total length
Place two pins at (−c, 0) and (c, 0). Stretch a string of fixed length 2a > 2c between them. Any point P reached by pulling the string taut satisfies PF1 + PF2 = 2a by construction.  
**Example:** c = 3, 2a = 10. At the right vertex (5, 0) the distances are 8 + 2 = 10.  
$$PF_1 + PF_2 = 2a.$$  
> [!WARNING]
> If 2a ≤ 2c the string is too short and no curve exists; the inequality must be strict.

### Step 2 — Identification of a with the semi-major axis
When P lies at the vertex (a, 0), the distances become a + c and a − c, summing again to 2a. Thus the string length equals the major-axis length.  
$$2a = \text{major-axis length}.$$

### Step 3 — Invariance for every point on the curve
Any other point on the traced curve still uses the same string, so the sum cannot change. The Cartesian equation \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) is merely the algebraic translation of this geometric constraint.  
$$PF_1 + PF_2 = 2a \quad \text{for all } P \text{ on the ellipse}.$$

### Step 4 — Algebraic verification at an arbitrary point
Substitute a general point (x, y) satisfying the ellipse equation into the distance sum and simplify using c² = a² − b²; the radicals cancel to 2a. This confirms the geometric claim analytically.

### Step 5 — Distinction from the hyperbola
The hyperbola replaces the sum by a constant difference; the ellipse is the only conic whose focal radii add to a fixed length.

### Step 6 — Textbook statement recovered
The preceding steps together constitute the classical theorem: the sum of the focal radii is constant and equal to the major axis.

## 5. Worked examples — every step shown

**Example 1 — Vertex check**  
*Given:* Ellipse \(\frac{x^2}{25} + \frac{y^2}{16} = 1\).  
*Find:* Sum of focal radii at (5, 0).  
Distance to (−3, 0): 5 − (−3) = 8.  
Distance to (3, 0): 5 − 3 = 2.  
*Why:* Both distances are measured along the x-axis using the distance formula.  
Sum = 8 + 2 = 10.  
**10**  
*Reflection:* The vertex lies on the major axis, so arithmetic is immediate; the result equals 2a.

**Example 2 — End of minor axis**  
*Given:* Same ellipse.  
*Find:* Sum at (0, 4).  
Distance to (−3, 0): \(\sqrt{(0+3)^2 + (4-0)^2} = 5\).  
Distance to (3, 0): \(\sqrt{(0-3)^2 + (4-0)^2} = 5\).  
*Why:* Symmetry about the y-axis makes the distances equal.  
Sum = 5 + 5 = 10.  
**10**  
*Reflection:* The calculation uses the Pythagorean theorem twice; the sum still collapses to 2a.

**Example 3 — Arbitrary interior point on curve**  
*Given:* Same ellipse, point (3, 3.2).  
*Find:* Verify the sum.  
First confirm the point lies on the ellipse: \(\frac{9}{25} + \frac{10.24}{16} = 0.36 + 0.64 = 1\).  
Distances: \(\sqrt{(3+3)^2 + (3.2-0)^2} = \sqrt{46.24} = 6.8\), \(\sqrt{(3-3)^2 + (3.2-0)^2} = 3.2\).  
*Why:* Each square root is the Euclidean distance; the point satisfies the equation so the sum must be 2a.  
Sum = 6.8 + 3.2 = 10.  
**10**  
*Reflection:* Algebraic verification replaces geometric construction.

**Example 4 — Finding the constant from foci and a point**  
*Given:* Foci at (−4, 0), (4, 0) and point (0, 6).  
*Find:* The value of 2a.  
Distances: \(\sqrt{(0+4)^2 + 6^2} = 2\sqrt{13}\), \(\sqrt{(0-4)^2 + 6^2} = 2\sqrt{13}\).  
*Why:* The sum is the definition of 2a.  
2a = 4√13.  
**4√13**  
*Reflection:* The constant is recovered directly from any single point; no equation needed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using 2a for a hyperbola          | Confusing the two conics                    | Always check whether the definition uses sum or difference |
| Setting 2a equal to the focal distance | Forgetting 2a > 2c                        | Verify c < a before writing the equation     |
| Calculating only one focus distance | Assuming symmetry that is not present     | Compute both distances explicitly            |
| Using the minor axis as 2a        | Misidentifying a and b                      | Read a from the denominator under x² after standard form |
| Forgetting to confirm the point lies on the ellipse | Starting a verification with an arbitrary point | Substitute into the ellipse equation first   |
| Sign error when foci are at (±c,0) | Treating c as negative                      | Keep c positive by definition                |
| Mixing PF1 + PF2 with PF1 − PF2 in one calculation | Copying the hyperbola formula by habit   | Write the ellipse definition at the top of the page |

## 7. The textbook-precise statement
Let the ellipse be given by \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with a > b > 0. Let the foci be F1(−c, 0) and F2(c, 0) where c = √(a² − b²). Then for every point P(x, y) on the ellipse,  
$$|PF_1| + |PF_2| = 2a.$$  
This is Theorem 3 in Stewart, *Calculus*, 9e, §10.5.

## 8. Visual — diagram or schematic
```text
          y
          |
      4 --+----------- P(0,4) ------------+
          |           / \                 |
          |          /   \                |
      0 --+---------F1----F2---------------+-- x
         -c         -3     3      c
          |          \   /                |
     -4 --+----------- \ / ---------------+
          |             Q                 |
```
Labelled elements: foci F1(−c,0), F2(c,0); vertices at (±a,0); minor-axis end at (0,b); any point P on the curve satisfies PF1 + PF2 = 2a.

## 9. The memory technique

**The hook**  
Picture two thumbtacks and a loop of string exactly as long as the major axis; the pencil point never lets the string slacken.

**What to overlearn**  
- PF1 + PF2 ≡ 2a for every point on an ellipse.  
- c² = a² − b² with a > c > 0.  
- The constant 2a is recovered at either vertex.

**Spaced-repetition schedule**  
Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by placing foci at (±c,0), writing the two distance expressions, imposing the ellipse equation, and simplifying the radicals with the identity c² = a² − b².

## 10. What this unlocks
The constant-sum property is the gateway to the reflection property, the directrix definition, and the parametric equations used in orbital mechanics and computer graphics.

- Reflection property of the ellipse  
- String-property derivations of the area and arc-length formulas  
- Polar equation with focus at the origin  
- Kepler’s first law and the vis-viva equation  
- Elliptical waveguides and resonator modes

## 11. Self-check — five questions, no answers
1. For the ellipse \(\frac{x^2}{36} + \frac{y^2}{20} = 1\), compute the sum of focal radii at the point (6,0) and at (−3,√(20·(1−9/36))).

2. A point P satisfies PF1 + PF2 = 10 where the foci are 6 units apart. Does P lie on an ellipse? If so, give the value of a.

3. An ellipse has foci at (−5,0) and (5,0) and passes through (0,13). Find its Cartesian equation.

4. Explain why replacing the sum PF1 + PF2 by the difference PF1 − PF2 yields a hyperbola rather than an ellipse.

5. A student computes PF1 + PF2 = 2b instead of 2a. Which modelling error most likely produced this result?