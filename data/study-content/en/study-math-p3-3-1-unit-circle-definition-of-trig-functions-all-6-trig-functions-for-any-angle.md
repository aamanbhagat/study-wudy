## 1. The one-sentence answer
**All six trigonometric functions are defined for any real angle θ via the coordinates (x, y) of the intersection point between the terminal ray of θ and the unit circle x² + y² = 1.**

The unit circle is the set of points exactly distance 1 from the origin. An angle θ is measured from the positive x-axis; its terminal ray strikes the circle at a unique point (x, y). By definition, that point supplies the values of cosine and sine directly: x equals cosine of θ and y equals sine of θ. The remaining four functions are then obtained from these two coordinates by division. Because every real number θ corresponds to exactly one such intersection point (after reducing modulo 2π), the definitions extend without gaps or exceptions to negative angles, angles larger than 2π, and every intermediate value.

This coordinate approach replaces the older right-triangle definitions, which only worked for acute angles inside a triangle. On the unit circle the same two numbers x and y generate every function for every angle, and the algebraic relations among the six functions follow immediately from the single equation x² + y² = 1.

> [!NOTE]
> The single geometric fact x² + y² = 1 is the source of every Pythagorean identity; once you see the point (cos θ, sin θ) lying on that circle, the identities are no longer separate formulas to memorize but direct algebraic consequences.

## 2. Why this matters — concrete and current
In aerospace guidance, the unit-circle definitions let inertial measurement units convert raw gyroscope angles into direction cosines that feed the Kalman filter on every SpaceX Falcon 9 flight; the six functions appear explicitly in the rotation matrices that keep the vehicle pointed at the correct quaternion.

Semiconductor lithography machines from ASML use the same definitions inside their wafer-stage controllers: sub-nanometer positioning requires real-time sine and cosine of arbitrary angles to compensate for thermal drift, and the reciprocal functions appear in the Jacobian matrices that linearize the servo loops.

In machine-learning libraries such as PyTorch and TensorFlow, the automatic-differentiation engine treats sin, cos, tan and their reciprocals as primitive operations whose derivatives are again expressed via the unit-circle identities; every transformer attention head therefore relies on these definitions when positional encodings are computed.

Radio astronomers at the Event Horizon Telescope collaboration reduce visibility data with the van Cittert–Zernike theorem, whose complex exponentials are rewritten via Euler’s formula using precisely the unit-circle values of sine and cosine for each baseline angle.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates    | The definitions are literally the x- and y-coordinates of a point on the circle. |
| Radian measure           | Angles must be treated as arc lengths on the unit circle so that θ and θ + 2πk label the same point. |
| Even/odd symmetry        | Explains why cosine is even and sine is odd when angles become negative. |
| Modular arithmetic (mod 2π) | Allows reduction of any angle to the interval [0, 2π) without changing function values. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The unit circle as a measuring device
Place a circle of radius 1 at the origin. Any angle θ is an instruction to rotate a ray counterclockwise from the positive x-axis by arc length θ along the circumference. Because the radius is 1, the arc length equals the angle in radians. The ray meets the circle at exactly one point P.

### Step 2 — Coordinates supply sine and cosine
Label the intersection point P = (x, y). Define  
$$
\cos\theta = x, \qquad \sin\theta = y.
$$
For θ = 0 the ray lies along the x-axis, P = (1, 0), so cos 0 = 1 and sin 0 = 0. For θ = π/2 the ray reaches (0, 1), recovering the familiar values.

> [!WARNING]
> If you forget that the radius is fixed at 1, you will later divide by the wrong hypotenuse when moving to non-unit circles.

### Step 3 — Tangent as the ratio of coordinates
Define  
$$
\tan\theta = \frac{y}{x} = \frac{\sin\theta}{\cos\theta},
$$
provided x ≠ 0. Geometrically this is the slope of the terminal ray. At θ = π/4 the point is (√2/2, √2/2), so tan(π/4) = 1.

### Step 4 — Reciprocal functions complete the set
Define the three reciprocal functions wherever the denominators are nonzero:  
$$
\csc\theta = \frac{1}{y}, \quad \sec\theta = \frac{1}{x}, \quad \cot\theta = \frac{x}{y}.
$$
Each is simply the reciprocal of one of the first three functions.

### Step 5 — Quadrant signs follow from coordinate signs
In quadrant II, x < 0 and y > 0, so cosine and its reciprocal secant are negative while sine, cosecant, tangent, and cotangent keep their usual signs. The pattern repeats every quadrant because the circle is symmetric.

### Step 6 — Full domain via periodicity
Any real θ differs from some angle φ ∈ [0, 2π) by an integer multiple of 2π. Because rotation by 2π returns to the same point,  
$$
\sin(\theta + 2\pi k) = \sin\theta, \quad \cos(\theta + 2\pi k) = \cos\theta
$$
for every integer k. The remaining four functions inherit the same periodicity.

### Step 7 — Textbook statement
For any real θ let (x, y) be the point on the unit circle reached by angle θ. Then the six trigonometric functions are defined by the coordinate assignments and ratios given in Steps 2–4, with the understanding that the functions are undefined precisely where the relevant denominator vanishes.

## 5. Worked examples — every step shown

**Example 1 — Zero angle**  
*Given:* θ = 0.  
*Find:* all six functions.  
The terminal ray meets the circle at (1, 0).  
$$
\cos 0 = 1, \quad \sin 0 = 0.
$$
$$
\tan 0 = \frac{0}{1} = 0, \quad \sec 0 = \frac{1}{1} = 1, \quad \csc 0 \text{ undefined (division by zero)}, \quad \cot 0 = \frac{1}{0} \text{ undefined}.
$$
**Final answer**  
cos 0 = 1, sin 0 = 0, tan 0 = 0, sec 0 = 1; csc 0 and cot 0 undefined.  
*Reflection:* The example shows immediately where two functions fail; the unit-circle picture makes the zero denominator visible at once.

**Example 2 — 135 degrees**  
*Given:* θ = 3π/4.  
*Find:* all six values.  
Reference angle π/4 in quadrant II gives coordinates (−√2/2, √2/2).  
$$
\cos\frac{3\pi}{4} = -\frac{\sqrt{2}}{2}, \quad \sin\frac{3\pi}{4} = \frac{\sqrt{2}}{2}.
$$
$$
\tan\frac{3\pi}{4} = -1, \quad \sec\frac{3\pi}{4} = -\sqrt{2}, \quad \csc\frac{3\pi}{4} = \sqrt{2}, \quad \cot\frac{3\pi}{4} = -1.
$$
**Final answer**  
−√2/2, √2/2, −1, √2, −√2, −1.  
*Reflection:* Quadrant signs are read directly from the coordinates; no separate sign chart is required.

**Example 3 — Negative angle**  
*Given:* θ = −π/3.  
*Find:* sine and cosine.  
Clockwise rotation of π/3 lands at (1/2, −√3/2).  
$$
\cos(-\pi/3) = \frac12, \quad \sin(-\pi/3) = -\frac{\sqrt{3}}{2}.
$$
**Final answer**  
1/2 and −√3/2.  
*Reflection:* Even/odd behavior appears automatically once the point is located.

**Example 4 — Coterminal reduction**  
*Given:* θ = 9π/4.  
*Find:* tan θ.  
Reduce: 9π/4 − 2π = π/4. Point (√2/2, √2/2) yields tan(π/4) = 1, hence tan(9π/4) = 1.  
**Final answer**  
1.  
*Reflection:* Periodicity lets every angle collapse to the first positive revolution; the coordinate definitions remain unchanged.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Using a non-unit radius           | Old triangle habits persist                   | Always verify the circle equation x² + y² = 1 before reading coordinates. |
| Forgetting undefined cases        | Division by zero at axes is overlooked        | Check whether x or y equals zero before writing tan, cot, sec, or csc. |
| Wrong quadrant signs              | Memorized tables instead of coordinates       | Plot or compute the actual (x, y) point each time.   |
| Mixing degrees and radians        | Calculator mode left in degrees               | Convert to radians or set calculator to radians before any calculation. |
| Treating tan as periodic with π/2 | Period of tangent is π, not 2π                | Reduce modulo π for tangent and cotangent.           |
| Confusing reference angle with θ  | Reference angle is always acute               | Keep the original quadrant when assigning signs.     |
| Writing csc θ = 1/sin θ without domain check | Algebraic shorthand hides zeros               | State the domain restriction explicitly each time.   |

## 7. The textbook-precise statement
Let θ be any real number. Let P = (cos θ, sin θ) be the unique point on the unit circle x² + y² = 1 whose position vector makes a signed angle θ with the positive x-axis (measured counterclockwise). Then  
$$
\tan\theta = \frac{\sin\theta}{\cos\theta},\quad
\cot\theta = \frac{\cos\theta}{\sin\theta},\quad
\sec\theta = \frac{1}{\cos\theta},\quad
\csc\theta = \frac{1}{\sin\theta},
$$
where each function is defined precisely on the set of θ for which the denominator is nonzero. (See Stewart, *Calculus*, 9e, §1.3 and §3.4.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     P=(x,y)
          |    /
          |   / θ
          |  /
          | /_________> x
         (0,0)   unit circle x²+y²=1
```
The diagram shows the unit circle centered at the origin, the positive x-axis, a terminal ray at angle θ intersecting the circle at P = (x, y), with x = cos θ and y = sin θ. All six functions are read from these two coordinates or their ratios.

## 9. The memory technique

**The hook**  
Picture the unit circle as a clock whose single hand always has length 1; the x-coordinate is “how far east,” the y-coordinate is “how far north.” Every trig value is just a reading of east, north, or their ratios.

**What to overlearn**  
- cos θ = x, sin θ = y on x² + y² = 1.  
- tan θ = sin θ / cos θ (undefined when cos θ = 0).  
- Period 2π for sine and cosine; period π for tangent and cotangent.

**Spaced-repetition schedule**  
Review the coordinate definitions at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
If memory fails, redraw the unit circle, mark the angle, read the coordinates, and recompute the six ratios from x and y.

## 10. What this unlocks
Mastery of the unit-circle definitions supplies the algebraic foundation for trigonometric identities, inverse functions, and all later calculus operations on trig functions.  

- Differentiation and integration of the six functions  
- Trigonometric substitutions in integrals  
- Fourier series and harmonic analysis  
- Complex exponentials via Euler’s formula  
- Linear transformations and rotation matrices in linear algebra

## 11. Self-check — five questions, no answers
1. For θ = 5π/3 locate the point on the unit circle and list all six function values.  
2. Why is tan(θ + π) = tan θ for every θ where tan θ is defined?  
3. Evaluate sec(7π/6) and explain the sign.  
4. An angle θ satisfies cos θ = −3/5 and lies in quadrant III. Compute the remaining five functions.  
5. Identify the largest open interval containing 0 on which all six trigonometric functions are defined and continuous.