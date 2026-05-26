## 1. The one-sentence answer
**Three points are collinear precisely when the vectors connecting them are scalar multiples of each other, which is equivalent to the signed area of the triangle they form being zero.**

This condition arises directly from the geometry of the plane. If points \(A\), \(B\), and \(C\) lie on a single straight line, then the direction from \(A\) to \(B\) must be exactly proportional to the direction from \(A\) to \(C\). Any deviation produces a nonzero height relative to the base, creating positive area. The algebraic translation of that geometric fact yields a single equation that must hold for the three coordinate pairs.

The same relation can be expressed through slopes: the slope between the first pair equals the slope between the second pair. Both routes are equivalent; each simply encodes that the points share one common direction.

> [!NOTE]
> The determinant test \(\begin{vmatrix} x_1 & y_1 & 1 \\ x_2 & y_2 & 1 \\ x_3 & y_3 & 1 \end{vmatrix} = 0\) is the most compact and numerically stable form; it simultaneously checks both the slope condition and the area condition without division.

## 2. Why this matters — concrete and current
Autonomous-vehicle path planners at Waymo and Cruise test whether successive LiDAR points lie on a straight lane boundary by evaluating the collinearity determinant; a nonzero result triggers a curvature update in the trajectory optimizer.

In semiconductor mask design, ASML’s computational lithography tools verify that three alignment marks remain collinear after thermal expansion so that overlay error stays below 1 nm; the test is performed millions of times per wafer.

Robotic-arm calibration routines at Boston Dynamics compute collinearity of three end-effector positions recorded by an external motion-capture system; any deviation quantifies joint-angle encoder drift.

In GPS-denied navigation for drones, the PX4 flight stack checks whether three successive visual-feature points remain collinear to decide whether the vehicle is flying a straight-line segment or must switch to visual-inertial odometry fusion.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates    | Supplies the ordered pairs \((x,y)\) that enter every test|
| Slope of a line          | Provides the intuitive “same direction” criterion         |
| Determinant of a 3×3 matrix | Encodes the signed area of the triangle formed by three points |

## 4. Building the idea — from intuition to formalism

### Step 1 — Same direction means proportional vectors
Two displacement vectors point the same way when one is a real multiple of the other.  
Example: From \(A(0,0)\) to \(B(2,4)\) is \(\langle 2,4\rangle\); from \(A\) to \(C(3,6)\) is \(\langle 3,6\rangle = 1.5\langle 2,4\rangle\).  
Formally, points \(A(x_1,y_1)\), \(B(x_2,y_2)\), \(C(x_3,y_3)\) are collinear when
\[
\langle x_2-x_1,\, y_2-y_1\rangle = k\langle x_3-x_1,\, y_3-y_1\rangle
\]
for some scalar \(k\).

> [!WARNING]
> Treating \(k\) as necessarily positive misses the case where \(C\) lies on the opposite side of \(A\) from \(B\).

### Step 2 — Eliminate the unknown scalar
Equating components yields two equations:
\[
x_2-x_1 = k(x_3-x_1),\qquad y_2-y_1 = k(y_3-y_1).
\]
Cross-multiplying removes \(k\):
\[
(x_2-x_1)(y_3-y_1) = (x_3-x_1)(y_2-y_1).
\]

### Step 3 — Rearrange into slope equality
Dividing both sides by the product of the denominators recovers the familiar slope test:
\[
\frac{y_2-y_1}{x_2-x_1} = \frac{y_3-y_1}{x_3-x_1},
\]
provided neither denominator is zero.

### Step 4 — Convert to area form
Expanding the cross-multiplication identity produces the expression
\[
x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)=0,
\]
which is exactly twice the signed area of triangle \(ABC\).

### Step 5 — Compact matrix statement
The area expression is the expansion of the determinant
\[
\begin{vmatrix}
x_1 & y_1 & 1 \\
x_2 & y_2 & 1 \\
x_3 & y_3 & 1
\end{vmatrix}=0.
\]
This is the textbook criterion for collinearity.

## 5. Worked examples — every step shown

**Example 1 — Horizontal line**  
*Given:* \(A(1,2)\), \(B(3,2)\), \(C(5,2)\).  
*Find:* Are they collinear?  
Compute the determinant:
\[
\begin{vmatrix}1&2&1\\3&2&1\\5&2&1\end{vmatrix}
=1(2\cdot1-1\cdot2)-2(3\cdot1-1\cdot5)+1(3\cdot2-2\cdot5)=0.
\]
*Why:* Each row contributes the same \(y\)-coordinate, so the height is zero.  
**Final answer:** The points are collinear.

*Reflection:* The zero height is obvious visually; the determinant merely records that fact algebraically.

**Example 2 — Non-collinear case**  
*Given:* \(A(0,0)\), \(B(1,1)\), \(C(2,3)\).  
*Find:* Collinearity status.  
Slope \(AB = 1/1 = 1\); slope \(AC = 3/2 = 1.5\). Slopes differ, hence not collinear.  
Determinant check:
\[
\begin{vmatrix}0&0&1\\1&1&1\\2&3&1\end{vmatrix}=0(1\cdot1-1\cdot3)-0(1\cdot1-1\cdot2)+1(1\cdot3-1\cdot2)=1\neq0.
\]
**Final answer:** Not collinear.

*Reflection:* Slope mismatch immediately signals failure; the determinant quantifies the mismatch as area.

**Example 3 — Vertical line**  
*Given:* \(A(4,1)\), \(B(4,3)\), \(C(4,7)\).  
All \(x\)-coordinates identical, so slopes involve division by zero. Use the determinant directly:
\[
\begin{vmatrix}4&1&1\\4&3&1\\4&7&1\end{vmatrix}=4(3\cdot1-1\cdot7)-1(4\cdot1-1\cdot4)+1(4\cdot7-3\cdot4)=0.
\]
**Final answer:** Collinear (vertical line).

*Reflection:* The determinant handles the infinite-slope case without special casing.

**Example 4 — Rational ratio**  
*Given:* \(A(0,0)\), \(B(2,4)\), \(C(3,6)\).  
Check vector proportion:
\[
\langle2,4\rangle = \tfrac23\langle3,6\rangle.
\]
Determinant:
\[
\begin{vmatrix}0&0&1\\2&4&1\\3&6&1\end{vmatrix}=0(4\cdot1-1\cdot6)-0(2\cdot1-1\cdot3)+1(2\cdot6-4\cdot3)=0.
\]
**Final answer:** Collinear; \(C\) divides \(AB\) extended in ratio \(3:2\).

*Reflection:* The scalar \(k\) need not be integer; the determinant absorbs any rational multiple.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Division by zero when checking slopes | Vertical line produces undefined slope     | Always fall back to the determinant test     |
| Forgetting the order of points    | Signed area changes sign with order         | Use absolute value only after confirming zero|
| Using distance equality instead   | Equidistant points need not be collinear    | Verify direction, not merely length          |
| Treating collinear as “on segment”| Points may be collinear yet outside segment | Distinguish line versus line segment         |
| Floating-point rounding in code   | Tiny nonzero determinant from rounding      | Compare absolute value against small epsilon |
| Assuming three distinct points    | Repeated points trivially satisfy equation  | Add explicit distinctness check when required|
| Ignoring orientation              | Negative area still indicates collinearity  | Accept any sign; only magnitude matters      |

## 7. The textbook-precise statement
Let \(A(x_1,y_1)\), \(B(x_2,y_2)\), \(C(x_3,y_3)\) be three points in the Euclidean plane. These points are collinear if and only if
\[
\begin{vmatrix}
x_1 & y_1 & 1 \\
x_2 & y_2 & 1 \\
x_3 & y_3 & 1
\end{vmatrix}
= 0.
\]
(Thomas, *Calculus*, 14e, §12.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
y
^
|     C(3,6)
|    /
|   /  
|  B(2,4)
| /
A(0,0)---------> x
```
All three points lie on the single line whose direction vector is \(\langle 1,2\rangle\).

## 9. The memory technique
1. **The hook** — Picture three fence posts; if the string stretched between them sags, area appears and they are not collinear.
2. **What to overlearn** — The 3×3 determinant equals zero; the two slope fractions are equal.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the area formula from the cross-product of vectors \(\overrightarrow{AB}\) and \(\overrightarrow{AC}\).

## 10. What this unlocks
Mastery of collinearity supplies the algebraic test that later decides whether four points form a parallelogram, whether a point lies inside a triangle, and whether a polygon is convex.

- Equation of a straight line in intercept form
- Section formula and ratio of division
- Convex-hull algorithms in computational geometry
- Line-segment intersection tests in graphics pipelines

## 11. Self-check — five questions, no answers
1. Show that \((0,0)\), \((a,b)\), \((2a,2b)\) are always collinear for any real \(a,b\) not both zero.
2. Find the value of \(k\) that makes \((1,2)\), \((3,4)\), \((5,k)\) collinear.
3. A vertical line contains \((−2,5)\) and \((−2,9)\). Must \((−2,0)\) also lie on it? Prove using the determinant.
4. Explain why the slope test alone fails for the triple \((1,1)\), \((2,2)\), \((3,3)\) yet the determinant succeeds.
5. Given four points, devise a procedure that uses the collinearity test to decide whether they form a trapezoid with at least one pair of parallel sides.