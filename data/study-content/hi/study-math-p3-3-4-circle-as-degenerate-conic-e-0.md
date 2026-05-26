## 1. The one-sentence answer
**A circle arises as the conic with eccentricity exactly zero, which forces the curve to collapse into a single point (the focus itself) and is therefore a degenerate conic.**

When the eccentricity definition PF = e · PM is applied with e = 0, the only points that satisfy the equation are those for which PF = 0. This means every point on the “curve” must coincide with the focus, giving a point-circle of radius zero. In the limit e → 0 the familiar round circle of positive radius appears, but the strict algebraic case e = 0 is always degenerate.

This degeneracy is not a flaw; it is the natural boundary case that completes the eccentricity classification of all conics and explains why many textbooks list “point circle” alongside intersecting lines and double lines as the three standard degenerate conics.

> [!NOTE]
> The single “aha” is that e = 0 does not describe the circles you draw with a compass; it describes their ultimate collapse to a point—the mathematical origin of the phrase “circle as degenerate conic.”

## 2. Why this matters — concrete and current
In orbital mechanics, the two-body problem under inverse-square gravity yields conic-section orbits whose eccentricity is supplied by specific energy and angular momentum. When e = 0 exactly, the orbit reduces to a point mass at the focus; this limiting case appears in the design of geostationary “hover” test masses used by ESA’s LISA Pathfinder mission to calibrate zero-eccentricity reference frames.

In semiconductor lithography, the projection optics of EUV steppers are designed so that the chief-ray bundle behaves as an e = 0 conic; any deviation produces a measurable point-spread-function collapse that is modelled as a degenerate circle before higher-order aberrations are corrected.

In algebraic geometry packages such as Macaulay2 and Singular, the ideal of a conic is homogenised; setting the eccentricity parameter to zero returns the ideal of a repeated point, allowing Gröbner-basis algorithms to test degeneracy without separate code paths.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Focus-directrix definition of conics | Supplies the single equation that produces every conic, including the e = 0 case.   |
| Polar equation of a conic r = ed/(1−e cos θ) | Shows algebraically how the denominator vanishes or the radius collapses when e = 0. |
| Homogeneous quadratic form ax² + 2hxy + by² + … = 0 | Classifies all conics (including degenerates) by the determinant of the associated matrix. |

If any of these three items are unfamiliar, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition
Aap already know that every non-degenerate conic satisfies PF = e · PM for a fixed focus F and directrix. Set e = 0. The equation immediately forces PF = 0, so the only admissible point P is the focus itself.

### Step 2 — Geometric picture
Imagine the directrix is a line and F is a point not on it. As e shrinks toward zero, the curve tightens around F until, at e = 0, nothing remains except F. The “circle” has radius zero.

### Step 3 — Polar equation test
The standard polar form with focus at the pole is
$$r = \frac{ed}{1 - e \cos\theta}.$$
Substitute e = 0:
$$r = 0$$
for every θ. The graph is the single point (0,0) in polar coordinates.

> [!WARNING]
> Students often replace e = 0 inside the denominator only and forget that the numerator also contains e; the whole fraction collapses to zero, not to a constant.

### Step 4 — Cartesian algebraic view
The general conic ax² + 2hxy + by² + 2gx + 2fy + c = 0 is degenerate when the 3 × 3 matrix
$$
\begin{pmatrix}
a & h & g \\
h & b & f \\
g & f & c
\end{pmatrix}
$$
has determinant zero. For a circle of radius R centred at (h,k) the matrix condition is satisfied precisely when R = 0, recovering the point (h,k).

### Step 5 — Limit versus strict case
If you let e → 0 while keeping the latus rectum fixed, you recover an ordinary circle of radius → ∞. The strict equality e = 0 never yields positive radius; it is the degenerate point.

## 5. Worked examples — har step show karo

**Example 1 — Direct substitution**
*Given:* Focus (0,0), directrix x = −2, eccentricity e = 0.  
*Find:* The locus.  
PF = 0 · PM ⇒ PF = 0 ⇒ (x,y) = (0,0).  
*Why:* The definition itself forces every point to the focus.  
**Final answer:** single point (0,0).

*Reflection:* The example is trivial yet shows that degeneracy is immediate, not hidden.

**Example 2 — Polar collapse**
*Given:* r = 3e / (1 − e cos θ).  
*Find:* Curve when e = 0.  
r = 0 for all θ.  
*Why:* Numerator vanishes while denominator → 1.  
**Final answer:** the pole only.

*Reflection:* Demonstrates the polar formula’s built-in degeneracy detector.

**Example 3 — Matrix test**
*Given:* x² + y
² − 2x − 2y + 1 = 0.  
*Find:* Is it degenerate?  
Matrix determinant evaluates to zero; radius = 0 after completing square.  
*Why:* (x−1)² + (y−1)² = 0.  
**Final answer:** point (1,1).

*Reflection:* Links algebraic degeneracy test to geometry.

**Example 4 — Orbit energy**
*Given:* Specific energy ε = −GM/(2a) and e = √(1 + 2εh²/(GM)²).  
*Find:* Orbit type when e = 0.  
ε must be −∞, i.e., h = 0 and particle sits at focus.  
*Why:* Zero angular momentum plus infinite negative energy collapses orbit to a point.  
**Final answer:** degenerate point mass at focus.

*Reflection:* Shows the same mathematics governs both geometry and physics.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing “circle of radius r when e = 0” | Confusing the limit e → 0 with the strict value | Always check whether e appears in numerator; if yes, r = 0. |
| Forgetting the point satisfies the homogeneous equation | Treats degeneracy as an extra condition instead of a matrix rank drop | Compute det of 3 × 3 matrix first; zero determinant signals degeneracy before geometry. |
| Using Cartesian circle equation (x−h)²+(y−k)² = r² with r > 0 | Equation is already non-degenerate; e is undefined | Derive e from focus-directrix form; only r = 0 yields e = 0. |
| Assuming every e = 0 case is a circle | Over-generalising the name “circle” to the point | Call it “point circle” explicitly until radius is restored by taking limits. |
| Ignoring vertical directrix in polar derivation | Sign error in denominator hides r = 0 | Keep the general form r = ed/(1 − e cos(θ − α)) and substitute e = 0 directly. |

## 7. The textbook-precise statement
A conic section is the locus of points P satisfying PF = e · PM. When e = 0 the locus reduces to the singleton {F}. In the projective plane this is the rank-1 quadric consisting of a repeated point. (See: Coxeter, *Projective Geometry*, 2e, §8.3; also Stewart, *Calculus*, 9e, §10.6, paragraph on limiting eccentricity.)

## 8. Visual — diagram or schematic
```
Directrix: x = -d
F (focus) at (0,0)
e = 0  ⇒  PF = 0
Only allowed point: (0,0)
All other candidate points P(x,y) give PF > 0, violating equation.
```
The diagram is simply the origin marked with a heavy dot; no curve exists.

## 9. The memory technique
1. **The hook** — Picture a rubber band stretched around a focus and directrix; when you let e drop to zero the band snaps to a single point at the focus.
2. **What to overlearn** — (i) PF = 0 when e = 0; (ii) polar form collapses to r = 0; (iii) 3 × 3 matrix determinant = 0 signals degeneracy.
3. **Spaced-repetition schedule** — Review the three facts above at 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Return to PF = e · PM, set e = 0, conclude P ≡ F.

## 10. What this unlocks
You can now classify every degenerate conic uniformly by eccentricity or by matrix rank, which feeds directly into:
- projective geometry theorems on pencils of conics,
- orbital perturbation theory when e is numerically zero,
- computer-vision ellipse-fitting algorithms that must detect and discard degenerate fits.

## 11. Self-check — five questions, no answers
1. Using the focus-directrix definition, prove that e = 0 forces the locus to be exactly one point.
2. Substitute e = 0 into r = ed/(1 − e cos θ) and state the resulting graph.
3. Compute the determinant of the 3 × 3 matrix for x² + y
² + 2x + 2y + 1 = 0 and interpret the result.
4. In orbital mechanics, what physical conditions produce e = 0 exactly?
5. A student claims “a circle of radius 5 has e = 0.” Identify the error and correct it.