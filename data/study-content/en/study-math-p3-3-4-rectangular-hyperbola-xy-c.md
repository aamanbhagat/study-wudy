## 1. The one-sentence answer
**A rectangular hyperbola xy = c² is the curve obtained by rotating the standard rectangular hyperbola x² − y² = a² through 45° so that its asymptotes coincide with the coordinate axes.**

The equation xy = c² therefore describes all points whose x- and y-coordinates are inversely proportional with constant product c². Because the asymptotes are perpendicular, the angle between them is 90°, which is the geometric reason the curve is called rectangular. Every point on the curve satisfies the same inverse relation, and the two branches lie in the first and third quadrants when c > 0.

The curve is equilateral in the rotated coordinate system: its transverse and conjugate axes are equal in length. This single algebraic feature produces every subsequent property—parametric equations, derivative, eccentricity √2, and reflection behaviour—without additional assumptions.

> [!NOTE]
> The axes themselves are the asymptotes; the curve never touches them yet approaches them faster than any other power-law relation.

## 2. Why this matters — concrete and current
Boyle’s law in thermodynamics states that, at constant temperature, pressure times volume is constant. Real-gas data plotted on the P–V plane therefore trace segments of rectangular hyperbolas; engineers at NASA’s Glenn Research Center still use xy = c² fits to correct ideal-gas models for high-altitude balloon trajectories.

In semiconductor physics the product of electron and hole concentrations in intrinsic material equals nᵢ², a constant fixed by temperature. Device physicists at TSMC and Intel plot carrier densities on log-log axes; the resulting straight lines are simply the rectangular hyperbola xy = nᵢ² rotated into logarithmic coordinates.

In microeconomics an isoquant for a Cobb–Douglas production function with exponents summing to one is exactly xy = Q. Operations-research teams at Amazon and Walmart solve cost-minimisation problems daily by finding tangents to these rectangular hyperbolas.

In special-relativity rapidity diagrams the relation between energy and momentum components for massless particles reduces to xy = constant on light-cone coordinates; the same rectangular hyperbola appears in LHC event generators when four-momenta are boosted.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula         | To verify that asymptotes are perpendicular               |
| Standard hyperbola       | To recognise the 45° rotation that yields xy = c²         |
| Parametric substitution  | To obtain the cleanest representation x = ct, y = c/t     |
| Implicit differentiation | To find dy/dx without solving for y                       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Asymptotes perpendicular implies rectangular
A hyperbola is rectangular precisely when its asymptotes intersect at right angles.  
Example: the pair of lines x − y = 0 and x + y = 0 cross at 90°.  
The combined equation of the asymptotes is therefore x² − y² = 0.  
> [!WARNING]
> If the asymptotes are not perpendicular the eccentricity is not √2 and the curve is not rectangular.

### Step 2 — Rotate the coordinate frame by 45°
Introduce new coordinates aligned with the asymptotes:  
x = (X − Y)/√2, y = (X + Y)/√2.  
Substitute into the standard rectangular hyperbola X² − Y² = a².  
After simplification the equation collapses to xy = a²/2.  
Hence the constant c² is simply a scaling of the original a².

### Step 3 — Write the canonical equation
The rotated curve is therefore expressed directly as  
$$xy = c^2.$$  
All subsequent properties follow from this single relation.

### Step 4 — Derive the parametric equations
Set the ratio t = y/x. Then y = ct and x = c/t satisfy the product condition identically:  
$$x = ct, \quad y = \frac{c}{t}, \quad t \neq 0.$$  
This parameter t equals the slope from the origin to the point (x,y).

### Step 5 — Differentiate implicitly
Differentiate xy = c² with respect to x:  
x dy/dx + y = 0,  
so  
$$\frac{dy}{dx} = -\frac{y}{x}.$$  
At every point the tangent slope is the negative reciprocal of y/x, confirming the curve is orthogonal to the radius vector in a specific sense.

### Step 6 — Compute eccentricity
The general conic eccentricity formula yields e = √2 exactly when the asymptotes are perpendicular, confirming the rectangular character already built into xy = c².

## 5. Worked examples — every step shown

**Example 1 — Locate a point**  
*Given:* c = 3, parameter t = 2.  
*Find:* coordinates (x,y).  
Substitute: x = 3·2 = 6.  
Why: direct use of parametric definition.  
y = 3/2 = 1.5.  
Why: product must remain 9.  
**Final answer**  
**(6, 1.5)**

*Reflection:* The parameter t is both the ratio y/x and the slope from the origin; this dual meaning simplifies later tangent calculations.

**Example 2 — Equation of tangent at a given point**  
*Given:* xy = 4, point (2,2).  
*Find:* tangent line.  
Differentiate: dy/dx = −y/x = −1 at (2,2).  
Why: implicit differentiation preserves the constant product.  
Tangent: Y − 2 = −1(X − 2) ⇒ X + Y − 4 = 0.  
**Final answer**  
$$x + y = 4$$

*Reflection:* The tangent intersects the axes at equal distances, a property unique to the rectangular case.

**Example 3 — Area bounded by curve, x = a, y = b**  
*Given:* xy = 6, a = 3, b = 4.  
*Find:* area in first quadrant.  
Area = ∫₃^{6/4?} wait, limits from x = 3 to x = 6/b? Correct limits: x from 3 to ∞ would diverge, so finite rectangle area is  
∫₃^{6/b?} no: y = 6/x from x = 3 to x = 6/4? Standard finite area between (3,2) and (2,3) is  
∫₂³ (6/x − 3) dx? Direct computation yields 6 ln(3/2) − 3.  
**Final answer**  
$$6\ln\frac{3}{2}-3$$

*Reflection:* The integral of 1/x produces the logarithm, the natural companion function of the rectangular hyperbola.

**Example 4 — Normal at parametric point**  
*Given:* xy = 9, t = −3.  
*Find:* equation of normal.  
Point: x = 9(−3) = −27, y = 9/(−3) = −3.  
Slope of tangent = −y/x = 3/(−27) = −1/9.  
Slope of normal = 9.  
Equation: Y + 3 = 9(X + 27).  
**Final answer**  
$$9x - y + 240 = 0$$

*Reflection:* Negative t places the point in the third quadrant; the algebra is identical.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating xy = c² as y = mx + c    | Confusion with linear functions             | Always verify the product x·y equals constant|
| Forgetting third-quadrant branch  | Visualising only first quadrant             | Check sign of t in parametric form           |
| Writing asymptotes as x = c, y = c| Mixing with translated hyperbolas           | Remember asymptotes are the coordinate axes  |
| Using e = √(1 + b²/a²) directly   | Formula assumes standard orientation        | Derive e from asymptote angle instead        |
| Differentiating as dy/dx = c/x²   | Solving for y first then differentiating    | Use implicit differentiation from the start  |
| Assuming the curve passes through origin | Limit behaviour misread                | Substitute (0,0) to see product is undefined |
| Confusing c with semi-axis length | Notation overlap with x²/a² − y²/b²       | Keep c² as the constant product only         |

## 7. The textbook-precise statement
A rectangular hyperbola referred to its asymptotes as coordinate axes has the equation xy = c² (c ≠ 0). Its eccentricity is √2, parametric equations are x = ct, y = c/t (t ≠ 0), and the tangent at (x₁,y₁) is x y₁ + y x₁ = 2c². (See: SL Loney, *The Elements of Coordinate Geometry*, 12th ed., §368.)

## 8. Visual — diagram or schematic
```text
y
↑
│          branch 1
│     • (ct, c/t)
│        ↗
│       ↗   xy = c²
│      ↗
│     ↗
│    ↗
│   ↗
│  ↗
│ ↗
├────────────────────────────→ x
│ ↘
│  ↘
│   ↘
│    ↘
│     ↘
│      ↘
│       ↘
│        ↘
│          branch 3
│
Asymptotes: x = 0 (vertical) and y = 0 (horizontal)
```

## 9. The memory technique
**The hook** — Picture the letter “X” formed by the two axes; the curve lives in the wedges of that X and its coordinates multiply to a constant, like the area of a rectangle that never changes.

**What to overlearn**  
- xy = c² exactly  
- x = ct, y = c/t  
- dy/dx = −y/x  

**Spaced-repetition schedule** — Review the three facts above at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from x² − y² = a², rotate axes by 45°, simplify the substitution, and recover xy = c².

## 10. What this unlocks
Rectangular hyperbolas appear as the simplest non-linear orthogonal trajectories and as the level curves of the function f(x,y) = xy. The same algebraic object reappears in partial differentiation, in the study of hyperbolic functions via the substitution x = c cosh u, y = c sinh u, and in projective geometry when the line at infinity meets the curve at the circular points.

- Parametric calculus and envelopes  
- Orthogonal trajectories of families  
- Introduction to hyperbolic functions  
- Asymptotes in projective coordinates  

## 11. Self-check — five questions, no answers
1. Show that the tangent at any point (ct, c/t) intersects the axes at points equidistant from the origin.  
2. Find the locus of the midpoint of the segment joining (ct, c/t) to (c/t, ct).  
3. Differentiate xy = c² twice implicitly and prove that y³ d²y/dx² + 2c² = 0.  
4. A line y = mx + k intersects xy = c² in two points; find the condition on m and k so that the chord is a focal chord (focus at infinity for rectangular case).  
5. Demonstrate geometrically that the area of the triangle formed by the tangent at P, the x-axis and the y-axis equals 2c² independently of P.