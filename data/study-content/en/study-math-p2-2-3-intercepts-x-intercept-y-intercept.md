## 1. The one-sentence answer
**An intercept of a curve is any point at which the curve meets a coordinate axis.**

The x-intercept occurs where the curve meets the horizontal axis; at every such point the y-coordinate is exactly zero. The y-intercept occurs where the curve meets the vertical axis; at every such point the x-coordinate is exactly zero. These two numbers therefore locate the places where the graph “starts” or “stops” relative to the origin without any further calculation.

To find them you substitute the appropriate zero into the equation of the curve and solve the resulting one-variable equation. The solutions are the intercepts themselves.

> [!NOTE]
> The single most useful fact is that every intercept calculation reduces to solving an equation in one variable after one coordinate has been set to zero; no simultaneous equations or graphing is required.

## 2. Why this matters — concrete and current
In semiconductor device physics, the current-voltage characteristic of a diode is plotted on the coordinate plane; the x-intercept gives the reverse saturation current while the y-intercept gives the forward turn-on voltage, both of which are measured directly on every production wafer at TSMC and Intel.

In orbital mechanics, the trajectory equation of a spacecraft launched from Earth is written in a coordinate system centered at the launch site; the y-intercept equals the initial altitude and the x-intercept equals the down-range distance at burnout, values used by SpaceX to verify each Falcon 9 ascent profile.

In reinforcement-learning reward shaping, a linear value-function approximator is trained on state features; its y-intercept equals the baseline reward an agent receives in the zero-feature state, a quantity that must be known before any policy-gradient update can be unbiased.

In microeconomics, a firm’s total-cost curve intersects the vertical axis at fixed cost; analysts at the Federal Reserve use this y-intercept to separate fixed from variable costs when forecasting inflation pass-through.

In structural engineering, the shear-force diagram of a simply supported beam crosses the x-axis at the point of zero shear; that location determines where stirrup spacing may be increased, a calculation performed daily in Autodesk Robot and SAP2000.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian plane          | Supplies the two perpendicular axes on which intercepts are defined |
| Ordered pair (x, y)      | Encodes the coordinates that become zero at each intercept |
| Substitution into an equation | The mechanical step that isolates the unknown intercept coordinate |

## 4. Building the idea — from intuition to formalism

### Step 1 — The axes themselves are the reference lines
The horizontal axis consists of every point whose second coordinate is zero.  
Example: the point (5, 0) lies on the horizontal axis.  
Formally, the x-axis is the set  
\[
\{(x,0) \mid x \in \mathbb{R}\}.
\]
> [!WARNING]  
> Treating the axes as “thick” or “fuzzy” regions instead of exact lines where one coordinate is identically zero produces points that are not intercepts.

### Step 2 — An x-intercept forces the second coordinate to zero
Any point on the x-axis satisfies y = 0. Substituting this value into the curve’s equation removes the variable y and leaves an equation in x alone.  
Example: for y = 2x − 6 the substitution yields 0 = 2x − 6.  
Formally, solve  
\[
f(x,0) = 0
\]  
for x.

### Step 3 — A y-intercept forces the first coordinate to zero
Any point on the y-axis satisfies x = 0. Substituting this value removes the variable x.  
Example: the same line gives y = −6 when x = 0.  
Formally, solve  
\[
f(0,y) = 0
\]  
for y.

### Step 4 — Multiple roots produce multiple intercepts
A curve may cross an axis more than once. Each real root of the substituted equation corresponds to a distinct intercept.  
Example: y = x² − 1 yields two x-intercepts, (−1,0) and (1,0).

### Step 5 — The textbook statement
Let C be the graph of an equation f(x,y) = 0 in the Cartesian plane.  
An **x-intercept** of C is any point (a,0) such that f(a,0) = 0.  
A **y-intercept** of C is any point (0,b) such that f(0,b) = 0.

## 5. Worked examples — every step shown

**Example 1 — Linear function, one intercept each**  
*Given:* y = 3x − 9  
*Find:* both intercepts.  

Substitute y = 0:  
0 = 3x − 9  *Why:* definition of x-intercept  
3x = 9    *Why:* add 9 to both sides  
x = 3    *Why:* divide by 3  
x-intercept: (3,0).  

Substitute x = 0:  
y = 3(0) − 9 *Why:* definition of y-intercept  
y = −9    *Why:* arithmetic  
y-intercept: (0,−9).  

**Example 2 — Quadratic with two x-intercepts**  
*Given:* y = x² − 4x + 3  
*Find:* all intercepts.  

y = 0 ⇒ x² − 4x + 3 = 0 *Why:* substitute y = 0  
(x − 1)(x − 3) = 0 *Why:* factor  
x = 1 or x = 3 *Why:* zero-product property  
x-intercepts: (1,0), (3,0).  

x = 0 ⇒ y = 3 *Why:* substitute x = 0  
y-intercept: (0,3).  

**Example 3 — Vertical line (no y-intercept)**  
*Given:* x = 5  
*Find:* intercepts.  

y = 0 gives x = 5, so x-intercept (5,0).  
x = 0 gives 0 = 5, contradiction; no y-intercept exists.  

**Example 4 — Rational function with both intercepts at origin**  
*Given:* y = (x − 2)/(x + 1)  
*Find:* intercepts.  

y = 0 ⇒ x − 2 = 0 ⇒ x = 2 *Why:* numerator zero, denominator nonzero  
x-intercept: (2,0).  

x = 0 ⇒ y = −2/1 = −2 *Why:* direct substitution  
y-intercept: (0,−2).  

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to set the opposite variable to zero | Students solve the original two-variable equation instead | Write the substitution explicitly before any algebra |
| Reporting an intercept as a single number instead of an ordered pair | Confusion between “the intercept value” and “the point” | Always write (a,0) or (0,b) |
| Assuming every line has both intercepts | Vertical and horizontal lines each miss one axis | Check whether the substituted equation is consistent |
| Accepting extraneous roots introduced by factoring or clearing denominators | Algebraic manipulation can add solutions | Verify each candidate in the original equation |
| Confusing x-intercept with y-intercept when reading a graph | Visual symmetry misleads the eye | Label each axis crossing with its coordinate pair before recording |
| Treating the origin as “both” intercepts without checking | Origin satisfies both conditions simultaneously | Record it once as (0,0) and note it satisfies both definitions |
| Division by zero when the line passes through the origin in intercept form | Formula x/a + y/b = 1 is undefined for a = 0 or b = 0 | Use the general substitution method instead of the intercept form |

## 7. The textbook-precise statement
Let f be a function from ℝ² to ℝ. The graph of the equation f(x,y) = 0 is a subset of the Cartesian plane. A point (a,0) on the x-axis is an x-intercept of the graph if and only if f(a,0) = 0. A point (0,b) on the y-axis is a y-intercept if and only if f(0,b) = 0. (See Stewart, *Precalculus*, 8e, §1.8.)

## 8. Visual — diagram or schematic
```text
          y
          ↑
          │     • (0,b)  y-intercept
          │    /
          │   /
          │  /
          │ /
──────────┼──────────→ x
         /│
        / │
       /  │
      /   │
 (a,0)•   │
   x-intercept
```

The diagram shows a straight line crossing the positive x-axis at (a,0) and the positive y-axis at (0,b). The origin is marked where the axes intersect.

## 9. The memory technique
**The hook** — Picture the letter “X” lying on its side; the horizontal stroke is the x-axis and the crossing point is the x-intercept. The upright stroke of the “Y” is the y-axis and its crossing is the y-intercept.

**What to overlearn**  
- x-intercept: set y = 0 and solve for x.  
- y-intercept: set x = 0 and solve for y.  
- Record every answer as an ordered pair.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Return to the definitions: the x-axis is the set of points with second coordinate zero; substitute that literal zero into the given equation.

## 10. What this unlocks
Mastery of intercepts is presupposed by every later technique that rewrites a relation in standard form.  

- Slope-intercept form y = mx + b uses the y-intercept directly.  
- Factored form of a polynomial reveals x-intercepts as roots.  
- Linear programming feasible regions are bounded by lines whose intercepts determine the vertices.  
- Partial-fraction decomposition begins by locating vertical-axis intercepts of rational functions.  
- Tangent-line approximations in calculus require the y-intercept of the tangent line.

## 11. Self-check — five questions, no answers
1. Find both intercepts of the line 4x − 5y = 20.  
2. A curve has x-intercepts at x = −2 and x = 3 and a y-intercept at y = 6. Write a possible quadratic equation whose graph satisfies these conditions.  
3. Does the vertical line x = −7 possess a y-intercept? Explain using the definition.  
4. The equation y = (x² − 1)/(x − 1) appears to have an x-intercept at x = 1; is (1,0) actually on the graph?  
5. Graph the line that has x-intercept (−4,0) and y-intercept (0,2) and verify that its slope equals −1/2.