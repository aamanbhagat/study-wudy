## 1. The one-sentence answer
**The equation (x − h)² + (y − k)² = r² describes every point (x, y) that lies exactly distance r from the fixed point (h, k).**

A circle is the set of all points at a fixed distance from one center. In the plane, that distance is measured with the ordinary Euclidean metric. Once you fix the center coordinates (h, k) and the radius r, the distance formula between (x, y) and (h, k) immediately produces the displayed equation. No other curve satisfies the same constant-distance condition.

The form separates the geometric ingredients cleanly: the numbers h and k locate the center, the number r fixes the size, and the squared differences enforce the distance. Every other equation of a circle can be rewritten into this shape by algebraic rearrangement.

> [!NOTE]
> The “aha” is that the equation is nothing more than the distance formula with both sides squared; once you see that identity, every subsequent manipulation (finding center, radius, or intersection) follows from ordinary algebra rather than new geometric rules.

## 2. Why this matters — concrete and current
In GPS receivers the pseudorange measurements are converted into a system of circle (or sphere) equations whose intersection yields the user’s position; the standard form is solved directly inside the Kalman-filter update step used by every modern receiver chipset.

Semiconductor mask writers at companies such as ASML and Applied Materials position the electron-beam stage by solving circle equations that describe the curved paths of calibration marks on the wafer; the (h, k) center coordinates are updated in real time from interferometric data.

Video-game physics engines (Unity, Unreal) represent circular colliders in 2-D worlds exactly by storing (h, k, r) triples; collision detection reduces to testing whether the distance between two centers is less than the sum of radii, an operation that expands algebraically from the same equation.

Radio astronomers fitting the orbit of a fast radio burst source to an array of dish positions obtain the source coordinates by solving a nonlinear least-squares problem whose residuals are written in the form (x − h)² + (y − k)² − r² = 0.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates    | The symbols x and y are the coordinates of an arbitrary point on the circle. |
| Distance formula         | The left-hand side is literally the squared Euclidean distance from (x, y) to (h, k). |
| Pythagorean theorem      | The distance formula itself rests on this theorem in the plane. |
| Squaring both sides      | Allows removal of the square-root symbol without changing the solution set. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distance is constant
A circle is defined by a single fixed distance (the radius) from one fixed point (the center).  
Concrete example: every point exactly 5 units from (2, 3) forms a circle of radius 5.  
Formal statement: distance between (x, y) and (h, k) equals r.  
> [!WARNING]  
> If you allow the distance to vary, the resulting curve is no longer a circle.

### Step 2 — Write the distance formula
The Euclidean distance in the plane is  
\[
\sqrt{(x - h)^2 + (y - k)^2}.
\]
Set this equal to r:  
\[
\sqrt{(x - h)^2 + (y - k)^2} = r.
\]

### Step 3 — Square both sides
Squaring removes the radical and yields an algebraic equation without loss of information because both sides are non-negative:  
\[
(x - h)^2 + (y - k)^2 = r^2.
\]
> [!WARNING]  
> Squaring a negative quantity would introduce extraneous solutions; the distance formula prevents that.

### Step 4 — Identify the geometric roles
In the equation (x − h)² + (y − k)² = r² the pair (h, k) is the only point that satisfies both partial derivatives being zero; it is therefore the center. The constant r² determines the size.

### Step 5 — Verify the center lies inside
Substitute x = h and y = k: both squared terms vanish and the equation reduces to 0 = r², which holds only when r = 0. Thus the center itself is not on the circle unless the radius is zero.

### Step 6 — Textbook statement reached
The algebraic relation obtained after Step 3 is the standard form of the circle equation.

## 5. Worked examples — every step shown

**Example 1 — Write the equation from center and radius**  
*Given:* Center (3, −4), radius 7.  
*Find:* The standard equation.  
Step 1: Insert h = 3, k = −4, r = 7 directly into the form.  
*Why:* The form already isolates the three parameters.  
Step 2: Write  
\[
(x - 3)^2 + (y + 4)^2 = 49.
\]  
**Final answer**  
\[(x - 3)^2 + (y + 4)^2 = 49\]  
*Reflection:* The sign change for the y-term is the only algebraic detail; once noticed it generalizes to any negative k.

**Example 2 — Identify center and radius from the equation**  
*Given:* (x + 1)² + (y − 5)² = 16.  
*Find:* Center and radius.  
Step 1: Rewrite as (x − (−1))² + (y − 5)² = 4².  
*Why:* Matches the standard form with h = −1.  
Step 2: Read off h = −1, k = 5, r = 4.  
**Final answer**  
Center (−1, 5), radius 4  
*Reflection:* The rewriting step prevents the common sign error.

**Example 3 — Does the point lie on the circle?**  
*Given:* Equation (x − 2)² + (y − 1)² = 25 and point (5, 5).  
*Find:* Verify membership.  
Step 1: Substitute x = 5, y = 5.  
*Why:* Direct substitution tests the distance condition.  
Step 2: (5 − 2)² + (5 − 1)² = 9 + 16 = 25, which equals the right-hand side.  
**Final answer**  
The point lies on the circle.  
*Reflection:* Arithmetic verification is identical to checking the distance equals r.

**Example 4 — Find the circle through three non-collinear points**  
*Given:* Points A(1, 1), B(5, 1), C(3, 4).  
*Find:* The standard equation.  
Step 1: The perpendicular bisector of AB is the vertical line x = 3.  
*Why:* Midpoint of A and B is (3, 1); AB is horizontal, so perpendicular is vertical.  
Step 2: Perpendicular bisector of AC has midpoint (2, 2.5) and slope −3/2, hence equation y − 2.5 = −(3/2)(x − 2).  
Step 3: Intersect with x = 3: y − 2.5 = −(3/2)(1) ⇒ y = 1.  
*Why:* The center is equidistant from all three points, hence lies on both bisectors.  
Step 4: Distance from (3, 1) to (1, 1) is 2, so r² = 4.  
**Final answer**  
\[(x - 3)^2 + (y - 1)^2 = 4\]  
*Reflection:* The algebraic work reduces to solving two linear equations; the circle equation appears only at the end.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing (x + h) instead of (x − h) | Confusing the sign in the distance formula | Always expand (x − h)² mentally before writing |
| Treating r as the right-hand side | Forgetting to square the radius             | Replace r with r² immediately after reading  |
| Assuming the center is at origin  | Over-generalizing from special cases        | Check whether h or k is nonzero in every problem |
| Using the general form x² + y² + Dx + Ey + F = 0 without completing the square | Skipping the translation to standard form   | Complete the square on every general equation before reading off center |
| Allowing r² to be negative        | Solving an inequality or quadratic with wrong sign | Verify r² > 0 after any algebraic manipulation |
| Forgetting that vertical and horizontal diameters are not the only ones | Visualizing only axis-aligned circles       | Draw the center and at least two non-axis points |
| Plugging the center into the left side and expecting zero | Misunderstanding that the center is not on the circle | Substitute (h, k) deliberately to see it yields zero only when r = 0 |

## 7. The textbook-precise statement
Let h, k, r be real numbers with r > 0. The set of points (x, y) ∈ ℝ² satisfying  
\[
(x - h)^2 + (y - k)^2 = r^2
\]  
is precisely the circle of radius r centered at (h, k). (Stewart, *Calculus*, 9e, §1.9, Definition of a circle.)

## 8. Visual — diagram or schematic
```text
          y
          ↑
          │          (x,y)
          │         •
          │       /   \
          │     /       \
          │   /           \
          │ /               \
   (h,k) •───────────────────• (h+r,k)
          │       r
          └──────────────────────→ x
```
Labelled elements: center (h, k), arbitrary point (x, y) on circumference, radius segment of length r, horizontal and vertical distances |x − h| and |y − k| shown as dashed lines forming the right triangle whose hypotenuse is r.

## 9. The memory technique

1. **The hook**  
   Picture the center (h, k) as a “home” point; every other point must “reach home” by travelling exactly r units. The squared terms count the east-west and north-south legs of that journey.

2. **What to overlearn**  
   - The exact form (x − h)² + (y − k)² = r²  
   - The translation: h is the x-coordinate of the center, k the y-coordinate  
   - r² appears on the right-hand side, never r

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Re-derive by writing the distance formula, setting it equal to r, and squaring both sides.

## 10. What this unlocks
Mastery of the standard circle equation supplies the algebraic substrate for every subsequent conic section, for parametric representations used in trigonometry and calculus, and for the implicit differentiation that yields tangent lines and normal vectors.

- Translation and scaling of conics  
- Polar form of circles and cardioids  
- Arc-length integrals in Calculus I  
- Collision detection algorithms in computational geometry  
- Least-squares circle fitting in statistics and metrology

## 11. Self-check — five questions, no answers
1. Write the standard equation of the circle centered at (−2, 7) with radius √13.  
2. Given (x − 4)² + (y + 9)² = 36, state the center and radius without rewriting.  
3. Does the point (−1, 2) lie on the circle (x + 3)² + (y − 1)² = 25? Show the arithmetic.  
4. Find h and k if the circle (x − h)² + (y − k)² = 49 passes through both (0, 0) and (7, 0).  
5. A circle centered at (5, 5) is tangent to the line x = 1. Write its equation in standard form.