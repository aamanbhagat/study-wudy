## 1. The one-sentence answer
**The section formula in 3D locates the unique point that divides the line segment joining two given points in a prescribed ratio.**

In two dimensions the same idea reduces to a weighted average of the coordinates. In three dimensions the arithmetic is identical once the third coordinate is included; only the geometric setting changes. The formula therefore supplies the coordinates of any interior or exterior division point without requiring vector diagrams or parametric equations each time.

The underlying mechanism is linear interpolation. Any point on the line can be expressed as a convex combination (internal division) or an affine combination (external division) of the endpoints. The weights are exactly the parts of the given ratio.

> [!NOTE]
> The ratio m:n always means “m parts toward the second point and n parts toward the first”; reversing the order silently produces the complementary point.

## 2. Why this matters — concrete and current
In aerospace trajectory design, SpaceX’s guidance software uses the 3-D section formula to compute intermediate waypoints on transfer orbits when a booster must reach a precise staging altitude at a prescribed time ratio.

Semiconductor mask-alignment systems at ASML interpolate between measured fiducial marks on a silicon wafer; the section formula supplies the exact (x,y,z) correction point when the stage must be positioned at a 3:2 division of two calibration points.

Robotics path planners in Boston Dynamics’ Atlas robot generate smooth foot-placement trajectories by subdividing straight-line segments in prescribed ratios, ensuring torque limits are respected at every interpolated joint configuration.

Computer-graphics pipelines in Pixar’s RenderMan evaluate surface points along silhouette edges by dividing camera-ray intersection segments in the ratio dictated by depth-buffer samples, guaranteeing sub-pixel accuracy without solving additional ray equations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates in 3-D | The formula operates component-wise on (x,y,z) triples.   |
| Ratio notation m:n       | Determines the weights applied to each endpoint.          |
| Internal vs. external division | Distinguishes convex combinations from affine ones.       |
| Basic vector addition    | Provides the geometric justification for the weighted sum.|

## 4. Building the idea — from intuition to formalism

### Step 1 — Weighted averages on a number line
A point dividing the interval from a to b in the ratio m:n lies m parts of the way from a toward b and n parts back from b.  
Concrete numbers: a = 2, b = 8, m = 1, n = 1 yields the midpoint 5.  
Formal statement:  
$$x = \frac{n\cdot a + m\cdot b}{m+n}.$$  
> [!WARNING]  
> Swapping m and n produces the point that divides the segment in the complementary ratio, not the same point.

### Step 2 — Extend the same weights to each coordinate separately
Because the three axes are independent, the identical weights apply to y and to z.  
Example: A(1,2,3) to B(4,8,15) in ratio 1:2 gives x = (2·1 + 1·4)/3 = 2, and likewise for y and z.  
Formal statement: the point P has coordinates  
$$P = \left( \frac{nx_1 + mx_2}{m+n},\ \frac{ny_1 + my_2}{m+n},\ \frac{nz_1 + mz_2}{m+n} \right).$$

### Step 3 — Internal versus external division
When the division point lies between the endpoints the ratio is taken positive; when it lies outside, one part is taken negative.  
The algebraic form remains unchanged; only the sign of m or n changes.  
> [!WARNING]  
> Forgetting the sign change for external division yields a point on the wrong side of the segment.

### Step 4 — Midpoint as the special case m = n = 1
Substituting equal positive parts collapses the formula to the arithmetic mean of each coordinate triple.  
This recovers the familiar midpoint formula in 3-D.

### Step 5 — Vector form (textbook statement)
Let position vectors of A and B be \(\vec{A}\) and \(\vec{B}\). The point dividing AB in ratio m:n has position vector  
$$\vec{P} = \frac{n\vec{A} + m\vec{B}}{m+n}.$$  
All preceding coordinate formulae are merely the component-wise expansion of this single vector equation.

## 5. Worked examples — every step shown

**Example 1 — Internal division**  
*Given:* A(2,3,5), B(8,9,17), ratio 2:3.  
*Find:* Coordinates of the division point P.  

Step 1: Write the formula  
$$P_x = \frac{3\cdot2 + 2\cdot8}{2+3} = \frac{6+16}{5} = \frac{22}{5}.$$  
*Why:* Weights are swapped relative to the ratio m:n.  

Step 2: Repeat for y  
$$P_y = \frac{3\cdot3 + 2\cdot9}{5} = \frac{9+18}{5} = \frac{27}{5}.$$  

Step 3: Repeat for z  
$$P_z = \frac{3\cdot5 + 2\cdot17}{5} = \frac{15+34}{5} = \frac{49}{5}.$$  

**\(\left( \frac{22}{5},\ \frac{27}{5},\ \frac{49}{5} \right)\)**  

*Reflection:* The only arithmetic risk is inverting the weights; once noticed, every coordinate follows identically.

**Example 2 — External division**  
*Given:* A(1,−1,2), B(4,5,−2), ratio 3:−2.  
*Find:* P.  

Apply the same formula with negative part:  
$$P_x = \frac{(-2)\cdot1 + 3\cdot4}{3-2} = \frac{-2+12}{1} = 10.$$  
$$P_y = \frac{(-2)\cdot(-1) + 3\cdot5}{1} = 17,$$  
$$P_z = \frac{(-2)\cdot2 + 3\cdot(-2)}{1} = -10.$$  

** (10, 17, −10) **  

*Reflection:* The negative denominator signals external division; magnitude comparison with the segment length verifies location.

**Example 3 — Midpoint**  
*Given:* A(−3,4,7), B(5,−2,1).  
*Find:* Midpoint M.  

m = n = 1 yields  
$$M = \left( \frac{5-3}{2},\ \frac{-2+4}{2},\ \frac{1+7}{2} \right) = (1,1,4).$$  

** (1, 1, 4) **  

*Reflection:* Special case reduces mental load; always check that denominator equals twice either part.

**Example 4 — Find the ratio given a point**  
*Given:* A(2,1,3), B(8,7,15), P(4,3,7).  
*Find:* Ratio m:n.  

Set up the x-equation:  
$$\frac{n\cdot2 + m\cdot8}{m+n} = 4 \implies 2n + 8m = 4m + 4n \implies 4m = 2n \implies m/n = 1/2.$$  
Verification in y and z yields the same ratio.  

** 1:2 **  

*Reflection:* Solving one coordinate suffices when consistency is later confirmed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reversing m and n                 | Habit from 2-D problems where order feels symmetric | Always label “m parts toward B” before substituting |
| Treating external ratio as positive | Sign omitted when point lies outside segment | Insert minus sign explicitly and check denominator sign |
| Forgetting the third coordinate   | Copy-paste from 2-D formula                 | Write all three lines before simplifying     |
| Division by zero when m = −n      | External ratio sums to zero                 | Recognise parallel or infinite case immediately |
| Assuming P lies on AB when coordinates satisfy only one axis | Over-reliance on a single equation          | Verify the computed ratio in the remaining two coordinates |
| Using vector formula without normalising | Confusion between position and free vectors | Keep position vectors relative to the same origin |
| Rounding intermediate fractions   | Desire for decimals                         | Keep exact fractional form until final simplification |

## 7. The textbook-precise statement
Let A(x₁,y₁,z₁) and B(x₂,y₂,z₂) be two distinct points in ℝ³ and let m,n be real numbers with m+n ≠ 0. The unique point P that divides the segment AB internally or externally in the ratio m:n has coordinates  
$$P = \left( \frac{nx_1 + mx_2}{m+n},\ \frac{ny_1 + my_2}{m+n},\ \frac{nz_1 + mz_2}{m+n} \right).$$  
(Thomas’ Calculus, 15th ed., §12.2, Vector and Parametric Equations.)

## 8. Visual — diagram or schematic
```text
z
 ↑
 |     B(8,9,17)
 |    /
 |   / P(4.4,5.4,9.8)   ratio 2:3
 |  /
 | / A(2,3,5)
 +------------------> y
/
x
```
Axes labelled; A and B shown as endpoints; P marked on the line segment with fractional distances indicated.

## 9. The memory technique

1. **The hook** — Picture a see-saw: heavier weight m sits closer to B, lighter weight n closer to A; the balance point is P.  
2. **What to overlearn** — The vector form \(\vec{P}=\frac{n\vec{A}+m\vec{B}}{m+n}\) and the sign convention for external division.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the parametric definition \(\vec{r}(t)=(1-t)\vec{A}+t\vec{B}\) and set t = m/(m+n).

## 10. What this unlocks
Mastery of the section formula supplies the algebraic engine behind parametric lines, Bézier curves of degree 1, and barycentric coordinates.  

- Line–plane intersection calculations  
- Barycentric coordinates on triangles and tetrahedra  
- Midpoint subdivision in octrees and k-d trees  
- Linear interpolation inside ray-marching shaders  

## 11. Self-check — five questions, no answers
1. Find the point dividing (0,0,0) to (6,9,12) in the ratio 5:1.  
2. A point P divides A(−2,1,4) and B(4,7,−8) externally in the ratio 3:2. Compute P.  
3. The midpoint of A and B is (3,−1,5). If A = (7,2,9), locate B.  
4. Show that the three points obtained by dividing AB in ratios 1:2, 1:1 and 2:1 are collinear.  
5. Given A(1,2,3), B(4,5,6) and P(2,3,4), decide whether P lies inside, on, or outside segment AB and state the ratio.