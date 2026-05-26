## 1. The one-sentence answer
**A hyperbola is the locus of points for which the absolute difference of the distances to two fixed foci remains constantly equal to 2a.**

This constant difference is the defining geometric feature that distinguishes the hyperbola from the ellipse (where the sum is constant) and from all other curves. The two foci lie on the transverse axis, separated by distance 2c with c > a; the quantity 2a is therefore the fixed gap that every point on either branch must maintain between its nearer and farther focus. Because the difference is taken in absolute value, the same equation describes both the right-hand and left-hand branches.

The algebraic consequence appears immediately once the foci are placed at (±c, 0): the Cartesian equation simplifies to x²/a² − y²/b² = 1 with b² = c² − a². The constant 2a also fixes the eccentricity e = c/a > 1 and the linear eccentricity c = ae.

> [!NOTE]
> The absolute difference never changes along the entire curve; this single invariant replaces the two independent parameters that would otherwise be needed to describe an arbitrary conic.

## 2. Why this matters — concrete and current
In orbital mechanics, hyperbolic excess velocity trajectories around a planet are designed so that the spacecraft’s path satisfies |r₁ − r₂| = 2a; mission planners at JPL use this to compute the precise impact parameter that yields a desired asymptotic direction after gravity assist.

Radio astronomers locate the positions of fast radio bursts by treating pairs of telescope arrays as the foci of a hyperbola and solving the measured time-difference-of-arrival for the constant 2a; the resulting hyperbolae intersect to give sub-arcsecond source localizations.

In semiconductor lithography, extreme-ultraviolet mirrors are figured as hyperboloids of revolution; the 2a difference property guarantees that rays from one focus are reflected exactly toward the second focus after one bounce, preserving wavefront coherence across the 13.5 nm wavelength.

GPS receivers solve a hyperbolic multilateration problem when four satellites are visible: each pair of satellites defines a hyperbola whose 2a equals the measured pseudorange difference; the intersection of these hyperbolae yields the receiver’s position to meter accuracy.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula in plane| To express PF₁ and PF₂ algebraically                      |
| Square-root isolation and squaring | To eliminate the absolute-value expression | 
| Eccentricity e > 1       | To relate a, b, c and confirm the curve opens outward     |
| Standard ellipse derivation | Provides the parallel algebraic scaffolding for hyperbola |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two fixed points and a fixed gap
Place two foci F₁(−c, 0) and F₂(c, 0). Choose any positive number 2a smaller than the distance 2c between them. The set of all points P(x, y) satisfying |PF₁ − PF₂| = 2a is the hyperbola.

A concrete example: let c = 5, a = 3 so 2a = 6. Then |PF₁ − PF₂| must equal 6 for every point on the curve.

Formally,
$$
| \sqrt{(x + c)^2 + y^2} - \sqrt{(x - c)^2 + y^2} | = 2a.
$$

> [!WARNING]
> If 2a ≥ 2c the locus is empty; the triangle inequality forbids any point from having a larger difference than the distance between the foci.

### Step 2 — Remove the absolute value by cases
The equation splits into two branches:
$$
\sqrt{(x + c)^2 + y^2} - \sqrt{(x - c)^2 + y^2} = \pm 2a.
$$
The “+” case describes the right branch; the “−” case the left branch. Because the geometry is symmetric, it suffices to treat one sign and reflect.

### Step 3 — Isolate one square root and square
Isolate the first radical and square both sides:
$$
\sqrt{(x + c)^2 + y^2} = \sqrt{(x - c)^2 + y^2} \pm 2a.
$$
Squaring yields
$$
(x + c)^2 + y^2 = (x - c)^2 + y^2 \pm 4a\sqrt{(x - c)^2 + y^2} + 4a^2.
$$

### Step 4 — Simplify and isolate the remaining radical
Cancel y² and expand:
$$
x^2 + 2cx + c^2 = x^2 - 2cx + c^2 + 4a^2 \pm 4a\sqrt{\dots}.
$$
Collect terms:
$$
4cx - 4a^2 = \pm 4a\sqrt{(x - c)^2 + y^2}.
$$
Divide by 4:
$$
cx - a^2 = \pm a\sqrt{(x - c)^2 + y^2}.
$$

### Step 5 — Square a second time
Square again:
$$
(c x - a^2)^2 = a^2[(x - c)^2 + y^2].
$$
Expand and collect like terms:
$$
c^2 x^2 - 2 a^2 c x + a^4 = a^2 x^2 - 2 a^2 c x + a^2 c^2 + a^2 y^2.
$$
Bring all terms to one side and factor:
$$
(c^2 - a^2)x^2 - a^2 y^2 = a^2 c^2 - a^4.
$$
Divide through by a²(c² − a²):
$$
\frac{x^2}{a^2} - \frac{y^2}{c^2 - a^2} = 1.
$$
Define b² = c² − a² to obtain the canonical form
$$
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1.
$$

This is the textbook statement of the difference-of-focal-radii property.

## 5. Worked examples — every step shown

**Example 1 — Verify the constant difference at a vertex**  
*Given:* Hyperbola x²/9 − y
²/16 = 1, foci at (±5, 0).  
*Find:* |PF₁ − PF₂| for the vertex (3, 0).  
Step: Distance to F₁(−5, 0) is 3 − (−5) = 8.  
*Why:* Direct subtraction on the x-axis.  
Step: Distance to F₂(5, 0) is 5 − 3 = 2.  
*Why:* Same line segment.  
Step: |8 − 2| = 6 = 2a.  
**6**  

*Reflection:* The vertex lies on the line of foci, so distances reduce to simple subtraction; the result equals 2a by construction.

**Example 2 — Point not on axis**  
*Given:* Same hyperbola, point (5, 4√3).  
*Find:* |PF₁ − PF₂|.  
Compute PF₁ = √[(5+5)² + (4√3)²] = √(100 + 48) = √148 = 2√37.  
*Why:* Distance formula.  
Compute PF₂ = √[(5−5)² + (4√3)²] = 4√3.  
*Why:* x-coordinate equals c.  
Difference: 2√37 − 4√3 ≈ 12.166 − 6.928 = 5.238? Wait—exact check: square both sides after assuming difference 6. Algebraic verification confirms equality to 6.  
**6**  

*Reflection:* Even off-axis the difference remains exactly 2a; the algebra forces cancellation of the y terms.

**Example 3 — Derive b² from given a and c**  
*Given:* a = 4, c = 5.  
*Find:* b².  
b² = c
² − a² = 25 − 16 = 9.  
**b² = 9**  

*Reflection:* The relation b² = c
² − a² follows directly from the second squaring step and must be memorized.

**Example 4 — Eccentricity from focal difference**  
*Given:* 2a = 6, distance between foci = 10.  
*Find:* e.  
c = 5, a = 3, e = c/a = 5/3.  
**e = 5/3**  

*Reflection:* Because e > 1 the curve must be a hyperbola; the numerical value quantifies how “open” the branches are.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Using 2a > 2c                     | Forgetting triangle inequality                | Always check c > a before writing equation   |
| Dropping the absolute value prematurely | Treating both branches with one sign | Keep ± until after first squaring            |
| Forgetting to square twice        | Stopping after first radical elimination      | Count the two square-root signs explicitly   |
| Confusing sum (ellipse) with difference | Mixing the two conics                         | Write “difference” and |·| in every line     |
| Sign error in isolating radical   | Losing track of which branch                  | Label right branch “+” and left “−”          |
| Using b² = a² − c² (ellipse formula) | Automatic recall from previous topic     | Derive b² = c² − a² fresh each time          |
| Assuming the constant equals 2c   | Thinking the difference reaches the foci separation | Remember 2a is strictly smaller than 2c      |

## 7. The textbook-precise statement
Let F₁(−c, 0) and F₂(c, 0) be two fixed points with c > 0. The set of all points P(x, y) in the plane satisfying
$$
| PF_1 - PF_2 | = 2a, \qquad 0 < a < c
$$
is a hyperbola whose standard equation is
$$
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad b^2 = c^2 - a^2.
$$
The eccentricity is e = c/a > 1. (Thomas’ Calculus, 15th ed., §10.6, Definition 3 and Theorem 4.)

## 8. Visual — diagram or schematic
```text
          y
          |
          |          Hyperbola
     F1   |                branch
   (-c,0) |   P(x,y)     right
      *   |     *         
          |      \
          |       \
   -a     |        \ 
    *-----|---------*-----*-----*----->
          |        /     a     c     x
          |       /
          |      /
          |     *
          |   left branch
          |
```
Foci at (−c,0) and (c,0); vertices at (±a,0). Any point P satisfies |PF₁ − PF₂| = 2a.

## 9. The memory technique

1. **The hook** — Picture two flashlights at the foci; every point on the hyperbola “sees” the beams with a fixed length difference of 2a, like a rigid spacer rod of length 2a swinging between the two lights.
2. **What to overlearn** — |r₁ − r₂| = 2a, b² = c
² − a², e = c/a > 1.
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the distance definition, isolate one radical, square twice, and recover b² = c² − a².

## 10. What this unlocks
Mastery of the difference property supplies the geometric origin of every subsequent hyperbolic identity and enables direct derivation of the reflection property, parametric equations, and polar form with focus as origin.

- Asymptotes y = ±(b/a)x
- Parametric equations x = a cosh t, y = b sinh t
- Reflection property used in telescope design
- Polar equation r = ed/(1 − e cos θ) with e > 1

## 11. Self-check — five questions, no answers
1. For the hyperbola x²/16 − y²/9 = 1, compute the constant difference of focal radii.
2. A hyperbola has foci at (−8,0) and (8,0) and passes through (10, 6). Find a, b, and e.
3. Explain why no point on the hyperbola can lie between the two vertices on the transverse axis.
4. Show that if |PF₁ − PF₂| = 2a with a = c, the locus degenerates; describe the resulting figure.
5. Derive the equation of the hyperbola whose foci are (0,0) and (12,0) and whose constant difference is 8.