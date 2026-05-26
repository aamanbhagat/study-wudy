## 1. The one-sentence answer
**A circle with eccentricity exactly zero is the degenerate point conic consisting solely of its focus.**

In the focus-directrix definition, the eccentricity \(e\) is the constant ratio of distance from a point to the focus over distance from the same point to the directrix. Setting \(e = 0\) forces every point on the curve to lie at distance zero from the focus, so the only point that satisfies the condition is the focus itself. This single-point set is formally a circle of radius zero.

The same algebraic object appears when the general second-degree equation of a conic has equal coefficients on \(x^2\) and \(y^2\), zero linear terms after translation, and the constant term arranged so that the radius vanishes. The geometric and algebraic pictures therefore coincide on a degenerate case.

> [!NOTE]
> The “circle of radius zero” is the precise mathematical object that sits at the boundary between ordinary circles (\(e = 0\), positive radius) and the empty set; every later limiting argument that sends the eccentricity of an ellipse to zero passes through this point.

## 2. Why this matters — concrete and current
In orbital mechanics, the two-body problem yields conic-section trajectories whose eccentricity classifies the orbit. When a spacecraft performs an exactly circular parking orbit about a planet, the eccentricity is identically zero; any numerical integrator or symbolic propagator must therefore handle the degenerate focus-directrix relation without division by zero.

Semiconductor mask design uses circular apertures whose Fourier transforms are Airy disks. When the radius of the aperture shrinks to the wavelength scale, the mathematics reduces to the zero-radius point source whose transform is a constant; this limiting case appears in rigorous diffraction codes used by ASML and Intel.

In algebraic geometry, the projective closure of the circle \(x^2 + y^2 = r^2\) intersects the line at infinity at the two circular points \(I\) and \(J\). Setting \(r = 0\) collapses the circle onto the origin, furnishing the simplest example of a scheme-theoretic point that still carries the complex structure of those circular points; this construction is used in modern intersection-theory software such as Macaulay2.

Machine-learning pipelines that fit ellipses to noisy data (e.g., pupil tracking or cell-boundary detection) frequently regularize the eccentricity toward zero to avoid degeneracy; the explicit \(e = 0\) case supplies the analytic gradient needed for stable training of such models.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Focus-directrix definition of conics | Supplies the single parameter \(e\) that distinguishes all conics |
| General quadratic equation \(Ax^2 + Bxy + Cy^2 + \dots = 0\) | Allows algebraic recognition that \(A = C\), \(B = 0\) yields a circle (possibly degenerate) |
| Translation of axes      | Removes linear terms so the degeneracy condition becomes visible |
| Polar form with focus at pole | Makes the equation \(r = \frac{ed}{1 - e\cos\theta}\) collapse cleanly at \(e = 0\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — The ratio definition forces a single point
Any point \(P\) on the conic must satisfy \(PF = e \cdot PD\). When \(e = 0\), the right-hand side vanishes for any finite \(PD\), so \(PF = 0\). The only location satisfying this is the focus itself.

Example: place the focus at the origin and the directrix at \(x = -d\). Then \(PF = 0\) implies the sole admissible point is \((0,0)\).

Formal statement:
\[
PF = 0 \cdot PD \implies P \equiv F.
\]

> [!WARNING]
> Treating \(e = 0\) as “just a very small ellipse” hides the fact that the directrix distance must simultaneously tend to infinity; otherwise the radius never stays finite.

### Step 2 — Polar equation with focus at the pole
The standard polar equation is
\[
r = \frac{e d}{1 - e \cos\theta}.
\]
Substituting \(e = 0\) yields \(r = 0\) for every \(\theta\), again the single point at the pole.

### Step 3 — Cartesian degeneration
Start from the translated circle equation
\[
(x-h)^2 + (y-k)^2 = r^2.
\]
If \(r = 0\), the left-hand side is a sum of squares equal to zero, satisfied only at the center \((h,k)\). This is algebraically identical to the point-focus obtained in Step 1.

### Step 4 — Discriminant test
For the general conic, the invariant \(\Delta = \begin{vmatrix} A & B/2 & D/2 \\ B/2 & C & E/2 \\ D/2 & E/2 & F \end{vmatrix}\). When \(\Delta = 0\) and \(A = C\), \(B = 0\), the conic degenerates to a point (the zero-radius circle).

### Step 5 — Textbook classification
A non-degenerate circle has \(e = 0\) and \(r > 0\); the boundary case \(r = 0\) is the degenerate conic of eccentricity zero.

## 5. Worked examples — every step shown

**Example 1 — Direct substitution**
*Given:* Focus at \((0,0)\), directrix \(x = -4\), eccentricity \(e = 0\).
*Find:* The locus.
\[
PF = 0 \cdot PD \implies \sqrt{x^2 + y^2} = 0 \implies x = 0,\ y = 0.
\]
*Why:* The definition forces the distance to the focus to vanish.  
**Final answer:** the single point \((0,0)\).

*Reflection:* The example shows that degeneracy is immediate once \(e\) is set to zero; no further restriction on the directrix is needed.

**Example 2 — Polar collapse**
*Given:* \(r = \frac{0.5 \cdot 3}{1 - 0.5\cos\theta}\). Set \(e = 0\).
*Find:* Simplified equation.
\[
r = \frac{0}{1 - 0 \cdot \cos\theta} = 0.
\]
*Why:* Numerator vanishes identically.  
**Final answer:** \(r = 0\).

*Reflection:* The same point is recovered regardless of the angular coordinate.

**Example 3 — Cartesian radius zero**
*Given:* \((x-1)^2 + (y+2)^2 = 0\).
*Find:* Geometric object.
Expand:
\[
x^2 - 2x + 1 + y^2 + 4y + 4 = 0 \implies x^2 + y^2 - 2x + 4y + 5 = 0.
\]
The only real solution is \(x = 1\), \(y = -2\).  
*Why:* Sum of squares equals zero only at the center.  
**Final answer:** degenerate point-circle at \((1,-2)\).

*Reflection:* The algebraic signature \(A = C = 1\), \(B = 0\), constant term chosen so radius vanishes signals degeneracy.

**Example 4 — Discriminant verification**
*Given:* \(x^2 + y^2 + 2x + 2y + 2 = 0\).
Compute \(\Delta\):
\[
\Delta = \begin{vmatrix}1 & 0 & 1\\0 & 1 & 1\\1 & 1 & 2\end{vmatrix} = 0.
\]
Hence the conic is degenerate; completing the square shows radius zero.  
**Final answer:** point \((-1,-1)\).

*Reflection:* The vanishing determinant supplies an invariant test independent of coordinate choice.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(e = 0\) as an ordinary circle of positive radius | Students forget that finite \(d\) forces radius zero | Always check whether the constant term yields \(r > 0\) after translation |
| Dividing by \(e\) in orbital formulas | Formulae written for \(e > 0\) become undefined | Isolate the \(e = 0\) case before any division |
| Confusing point-circle with empty set | Both give no “visible” curve | Remember \(\Delta = 0\) distinguishes a real point from the empty conic |
| Assuming the directrix may be ignored | Directrix distance appears to drop out when \(e = 0\) | Retain the directrix formally; it recedes to infinity only in the non-degenerate limit |
| Misapplying the invariant \(\Delta\) without checking \(A = C\) | Degeneracy can also produce two lines | Verify the quadratic part is a positive-definite multiple of \(x^2 + y^2\) |
| Forgetting complex circular points at infinity | Projective view omitted in real-variable courses | Note that even the point-circle still passes through \(I\) and \(J\) in \(\mathbb{CP}^2\) |
| Numerical instability when \(e\) is set exactly to zero in floating-point code | Underflow or division by zero | Add an explicit `if e == 0` branch returning the focus coordinates |

## 7. The textbook-precise statement
A conic section in the plane is the locus of points \(P\) satisfying \(PF = e \cdot PD\), where \(F\) is a fixed focus and \(D\) the corresponding directrix. When \(e = 0\) the locus reduces to the singleton \(\{F\}\). Equivalently, the quadratic form
\[
Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0
\]
with \(A = C \neq 0\), \(B = 0\) and discriminant \(\Delta = 0\) represents a point-circle (degenerate circle of eccentricity zero). (See: Apostol, *Calculus*, Vol. 1, 2nd ed., §13.5.)

## 8. Visual — diagram or schematic
```text
Directrix: x = -d (d → ∞)
          |
F (focus) •  ← only point remaining when e = 0
          |
          |   (no other points satisfy PF = 0·PD)
```
The diagram shows the focus alone; any finite directrix distance becomes irrelevant because the right-hand side is identically zero.

## 9. The memory technique
1. **The hook** — Picture a spotlight whose “beam” is forced to have zero width: the only illuminated point is the bulb itself.
2. **What to overlearn** — \(e = 0 \implies\) locus = focus point; \(\Delta = 0\) and \(A = C\) confirms algebraic degeneracy.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from \(PF = e\cdot PD\) by setting the right-hand side to zero.

## 10. What this unlocks
The zero-eccentricity case is the starting point for all limiting arguments that send elliptical eccentricity to zero and for the projective classification of conics via the circular points at infinity. It also supplies the base case for the continuous dependence of orbital elements on eccentricity and for the degeneration of quadric surfaces in three-dimensional projective geometry.

## 11. Self-check — five questions, no answers
1. Using the focus-directrix definition, show that \(e = 0\) yields exactly one point regardless of directrix placement.
2. Convert the polar equation \(r = \frac{ed}{1-e\cos\theta}\) to Cartesian coordinates and set \(e = 0\); verify the resulting equation describes a single point.
3. For the general conic \(x^2 + y^2 + Dx + Ey + F = 0\), find the precise condition on \(F\) that forces \(\Delta = 0\) and hence a point-circle.
4. Explain why the same algebraic object (the origin) can be viewed both as a degenerate circle and as the intersection of the imaginary circle \(x^2 + y^2 + 1 = 0\) with the real plane.
5. In orbital mechanics software, an integrator encounters \(e = 0\). Which singularity must be specially coded, and what value should the true anomaly take?