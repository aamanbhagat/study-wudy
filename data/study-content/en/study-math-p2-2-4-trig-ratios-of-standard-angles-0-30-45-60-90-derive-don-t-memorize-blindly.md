## 1. The one-sentence answer
**The six trigonometric ratios for the angles 0°, 30°, 45°, 60°, and 90° are obtained exactly by applying the definitions of sine, cosine, and tangent to two right triangles—an isosceles right triangle and a 30-60-90 triangle—together with the unit-circle limits at the axes.**

These ratios are not arbitrary numbers to be memorized; each follows from the side-length ratios that geometry forces upon those triangles. Begin with the isosceles right triangle whose legs are both 1. Its hypotenuse must be \(\sqrt{2}\) by the Pythagorean theorem, immediately fixing the values at 45°. Next consider an equilateral triangle of side 2; bisecting one angle produces two congruent 30-60-90 right triangles whose sides are 1, \(\sqrt{3}\), and 2. The ratios of those sides yield the 30° and 60° entries. Finally, the angles 0° and 90° are read off the unit circle by letting a point approach the positive x-axis or positive y-axis; the coordinates become (1,0) and (0,1) respectively, fixing the remaining four values.

The single geometric fact that unifies every entry is the Pythagorean relation \(x^2 + y^2 = 1\) on the unit circle; once the coordinates of the five points are known, every ratio is immediate division.

> [!NOTE]
> The “aha” is that five angles collapse to two triangles plus two limiting positions; master the side lengths of those triangles and the entire table follows without further memorization.

## 2. Why this matters — concrete and current
In orbital-mechanics software at NASA’s Jet Propulsion Laboratory, the exact sine and cosine of 30° and 60° appear in closed-form expressions for transfer orbits; replacing them with floating-point approximations would accumulate round-off error across thousands of trajectory corrections.

Semiconductor mask-alignment systems at ASML use 45° beam splitters whose reflection coefficients are derived from the isosceles-right-triangle ratios; any deviation from \(\frac{\sqrt{2}}{2}\) produces measurable overlay error measured in nanometers.

Machine-learning libraries such as PyTorch implement fast-path kernels for rotation matrices at these five angles; the kernels hard-code the exact fractions so that back-propagation through a 90° rotation incurs zero rounding noise.

In x-ray crystallography, the Bragg angles for cubic lattices frequently reduce to 30° or 60°; the structure-factor calculations therefore contain exact factors of \(\frac{1}{2}\) and \(\frac{\sqrt{3}}{2}\) that cancel symbolically and improve numerical stability.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean theorem      | Supplies the missing side lengths of both reference triangles |
| Definition of sine, cosine, tangent in a right triangle | Converts side ratios into the six trigonometric values |
| Unit-circle coordinates  | Extends the same ratios to the boundary angles 0° and 90° |
| Square-root simplification | Removes redundant radicals when reporting exact values    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Right-triangle definitions
Any acute angle \(\theta\) determines a unique shape of right triangle up to similarity. The three side ratios opposite over hypotenuse, adjacent over hypotenuse, and opposite over adjacent are therefore constant for that angle; these constants are named \(\sin\theta\), \(\cos\theta\), and \(\tan\theta\).

Consider a right triangle with opposite side 3, adjacent side 4, hypotenuse 5. Then \(\sin\theta = 3/5\), \(\cos\theta = 4/5\), \(\tan\theta = 3/4\).

$$
\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \quad
\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \quad
\tan\theta = \frac{\text{opposite}}{\text{adjacent}}.
$$

> [!WARNING]
> Treating the labels “opposite” and “adjacent” as fixed to particular sides rather than relative to \(\theta\) reverses sine and cosine.

### Step 2 — The 45° case via isosceles right triangle
An isosceles right triangle has two equal acute angles; each must be 45°. Let both legs equal 1. The hypotenuse is then \(\sqrt{1^2 + 1^2} = \sqrt{2}\).

All 45-45-90 triangles are similar, so the ratios are fixed: \(\sin 45^\circ = 1/\sqrt{2}\), \(\cos 45^\circ = 1/\sqrt{2}\), \(\tan 45^\circ = 1\).

$$
\sin 45^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2}, \quad
\tan 45^\circ = 1.
$$

> [!WARNING]
> Rationalizing the denominator too early can hide the fact that both sine and cosine share the same radical.

### Step 3 — The 30°–60° case via equilateral triangle
An equilateral triangle of side 2 has all angles 60°. Bisect one angle to obtain two congruent right triangles, each with angles 30°, 60°, 90°. The side opposite 30° is half the original side, hence 1. The remaining leg is found by Pythagoras: \(\sqrt{2^2 - 1^2} = \sqrt{3}\).

Thus \(\sin 30^\circ = 1/2\), \(\cos 30^\circ = \sqrt{3}/2\), and the 60° values are swapped.

$$
\sin 30^\circ = \frac12, \quad
\cos 30^\circ = \frac{\sqrt{3}}{2}, \quad
\tan 30^\circ = \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}.
$$

> [!WARNING]
> Forgetting that the short leg is opposite the 30° angle (not the 60° angle) swaps the entire pair of values.

### Step 4 — 0° and 90° on the unit circle
Place the right triangle inside the unit circle centered at the origin. As the angle approaches 0°, the opposite side shrinks to zero while the adjacent side approaches the radius 1; the coordinates become (1,0). As the angle approaches 90°, the coordinates become (0,1).

Hence \(\sin 0^\circ = 0\), \(\cos 0^\circ = 1\), \(\sin 90^\circ = 1\), \(\cos 90^\circ = 0\), and the two tangents are 0 and undefined respectively.

$$
\sin 0^\circ = 0, \quad
\cos 0^\circ = 1, \quad
\sin 90^\circ = 1, \quad
\cos 90^\circ = 0.
$$

> [!WARNING]
> Declaring \(\tan 90^\circ = \infty\) without noting that the function is undefined at exactly 90° leads to division-by-zero errors in code.

### Step 5 — Exact table via the two triangles
Collecting the five angles yields the standard table. All entries are exact; no decimal approximations are required.

$$
\begin{array}{c|cccc}
\theta & \sin\theta & \cos\theta & \tan\theta \\
\hline
0^\circ   & 0          & 1          & 0          \\
30^\circ  & 1/2        & \sqrt{3}/2 & 1/\sqrt{3} \\
45^\circ  & \sqrt{2}/2 & \sqrt{2}/2 & 1          \\
60^\circ  & \sqrt{3}/2 & 1/2        & \sqrt{3}   \\
90^\circ  & 1          & 0          & \text{undef}
\end{array}
$$

## 5. Worked examples — every step shown

**Example 1 — Direct evaluation at 30°**  
*Given:* \(\theta = 30^\circ\).  
*Find:* \(\sin 30^\circ\), \(\cos 30^\circ\), \(\tan 30^\circ\).

From the 30-60-90 triangle the sides are 1 (opp 30°), \(\sqrt{3}\) (opp 60°), 2 (hyp).  
Divide opposite by hypotenuse: \(\sin 30^\circ = 1/2\).  
*Why:* definition of sine.  
Divide adjacent by hypotenuse: \(\cos 30^\circ = \sqrt{3}/2\).  
*Why:* definition of cosine.  
Divide opposite by adjacent: \(\tan 30^\circ = 1/\sqrt{3}\).  
*Why:* definition of tangent.  

**\(\sin 30^\circ = 1/2\), \(\cos 30^\circ = \sqrt{3}/2\), \(\tan 30^\circ = 1/\sqrt{3}\)**

*Reflection:* The only arithmetic was reading the side lengths already fixed by geometry; the same sides give all three ratios.

**Example 2 — 45° in a square diagonal**  
*Given:* A square of side 1; a diagonal is drawn.  
*Find:* The angle between diagonal and side, and its sine.

The diagonal forms two 45-45-90 triangles. Hypotenuse = \(\sqrt{2}\).  
Opposite side = 1, so \(\sin 45^\circ = 1/\sqrt{2}\).  
Rationalize: \(\sqrt{2}/2\).

**\(\sin 45^\circ = \sqrt{2}/2\)**

*Reflection:* Recognizing that every square diagonal creates the reference 45° triangle removes any need to invoke a calculator.

**Example 3 — Complementary-angle identity check**  
*Given:* 30° and its complement 60°.  
*Find:* Verify \(\sin 60^\circ = \cos 30^\circ\).

From the same 30-60-90 triangle, side opposite 60° is \(\sqrt{3}\), hypotenuse 2, hence \(\sin 60^\circ = \sqrt{3}/2\).  
Side adjacent to 30° is also \(\sqrt{3}\), hypotenuse 2, hence \(\cos 30^\circ = \sqrt{3}/2\).  
They match.

**\(\sin 60^\circ = \cos 30^\circ = \sqrt{3}/2\)**

*Reflection:* Complementary angles simply swap opposite and adjacent legs inside one triangle.

**Example 4 — Tangent at 0° via limit**  
*Given:* \(\theta \to 0^\circ\).  
*Find:* \(\tan\theta\).

On the unit circle, opposite side \(\to 0\), adjacent side \(\to 1\).  
Thus \(\tan\theta = 0/1 = 0\).

**\(\tan 0^\circ = 0\)**

*Reflection:* The limiting argument replaces the undefined “division by the adjacent side at exactly zero” with a concrete coordinate approach.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Swapping sin 30° and sin 60°      | Students remember “1/2 and √3/2” but not which angle owns the smaller value | Always label the side opposite 30° first (it is half the hypotenuse) |
| Writing tan 90° = ∞ instead of undefined | Infinity is a useful shorthand in limits but not a number | State “the expression opposite/adjacent has zero in the denominator” |
| Rationalizing every entry prematurely | Desire for “nice” decimals hides common factors     | Keep unreduced radicals until the final simplification step |
| Using decimal approximations inside further exact work | Calculator gives 0.866…; subsequent algebra refuses to cancel | Retain exact symbolic forms until the very last line |
| Forgetting that cos 0° = 1 while sin 0° = 0 | Visualizing the point (1,0) is less intuitive than (0,1) | Draw the unit-circle point explicitly for each axis angle |
| Assuming the reference triangles must have hypotenuse 1 | Confusion between unit-circle and any similar triangle | Scale the sides after ratios are read; the ratio itself is scale-invariant |
| Confusing adjacent side at 60° with the short leg | The short leg is always opposite the 30° angle | Mark the 30° angle first, then identify its opposite side |

## 7. The textbook-precise statement
Let \(\theta\) be one of the angles \(0^\circ,30^\circ,45^\circ,60^\circ,90^\circ\). The values of the trigonometric functions are given by the following table, each entry obtained from the side ratios of the 45-45-90 or 30-60-90 triangle (or the corresponding unit-circle limits) and satisfying \(\sin^2\theta + \cos^2\theta = 1\).

$$
\begin{array}{c|ccc}
\theta & \sin\theta & \cos\theta & \tan\theta \\
\hline
0^\circ   & 0 & 1 & 0 \\
30^\circ  & \frac12 & \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{3} \\
45^\circ  & \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 1 \\
60^\circ  & \frac{\sqrt{3}}{2} & \frac12 & \sqrt{3} \\
90^\circ  & 1 & 0 & \text{undefined}
\end{array}
$$

(Stewart, *Calculus*, 9e, §1.3, Table 1.)

## 8. Visual — diagram or schematic
```text
Unit circle radius 1, origin O
          y
          |
          |     (0,1) 90°
          |      *
          |     /|
          |    / |
          |45°/  |
          |  /   |
          | /    |
( -1,0)---O------+------(1,0) 0°
          |      x
          |     /
          |    /  30°
          |   /   
          |  /    
          | *     
          |      (√3/2, 1/2) 30°
```
The five labeled points are exactly the terminal points of the rays at 0°, 30°, 45°, 60°, and 90°; their coordinates are the (cos, sin) pairs derived above.

## 9. The memory technique
**The hook**  
Picture two physical triangles lying on the desk: a square cut along its diagonal (45°) and an equilateral triangle of side 2 cm cut in half (30°–60°). The side lengths 1-1-√2 and 1-√3-2 are the only numbers you ever need.

**What to overlearn**  
- Side lengths of the two reference triangles.  
- The unit-circle coordinates for the four axis points.  
- The identity \(\sin^2\theta + \cos^2\theta = 1\) evaluated at each angle.

**Spaced-repetition schedule**  
Review the side lengths at 1 day, 3 days, 7 days, 16 days, and 35 days; each time reconstruct the table from the triangles rather than reading a pre-printed chart.

**First-principles fallback**  
If the values are forgotten, redraw the isosceles right triangle and the bisected equilateral triangle, apply the Pythagorean theorem once, and read the six ratios directly.

## 10. What this unlocks
These exact ratios become the building blocks for angle-addition formulas, multiple-angle identities, and the exact solution of cubic and quartic equations that arise in geometry. They also supply the reference angles used in the reduction formulas that convert any angle to an equivalent acute angle between 0° and 90°.

- Trigonometric identities (sum, difference, double-angle)  
- Inverse trigonometric functions and their ranges  
- Fourier analysis at discrete frequencies that are multiples of 30° or 45°  
- Rotation matrices in linear algebra and computer graphics

## 11. Self-check — five questions, no answers
1. Using only the 30-60-90 triangle, compute \(\cot 60^\circ\) without consulting any table.  
2. A right triangle has a 45° angle and hypotenuse 6. Find the exact lengths of both legs.  
3. Explain why \(\tan 90^\circ\) cannot be assigned any real number, using the unit-circle definition.  
4. Show that \(\sin 30^\circ + \sin 60^\circ = \cos 30^\circ\) by direct substitution of the derived values.  
5. An equilateral triangle of side 4 is bisected; a second right triangle is formed by connecting the midpoint of one side to the opposite vertex. Identify the angles and compute \(\sin\) of each acute angle in the new triangle.