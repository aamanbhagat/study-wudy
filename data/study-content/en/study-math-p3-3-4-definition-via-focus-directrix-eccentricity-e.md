## 1. The one-sentence answer
**A conic section is the locus of points P in the plane such that the ratio of the distance from P to a fixed point (the focus) to the distance from P to a fixed line (the directrix) equals a positive constant e called the eccentricity.**

This single ratio condition produces every non-degenerate conic. When the ratio equals 1 the curve opens indefinitely in one direction and is called a parabola. When the ratio is less than 1 the curve closes on itself and is called an ellipse. When the ratio exceeds 1 the curve has two separate branches and is called a hyperbola. The same geometric rule therefore replaces the older “slice of a cone” description with an intrinsic plane definition that works equally well in coordinates or in vector geometry.

The definition is local and metric: only distances matter, so the curve can be translated or rotated without changing its intrinsic shape. Once the focus, directrix and eccentricity are fixed, every point on the curve is completely determined by measuring two distances and enforcing the constant ratio.

> [!NOTE]
> The single number e classifies the entire family: e = 1 yields a parabola, 0 ≤ e < 1 an ellipse (or circle when e = 0), and e > 1 a hyperbola; no other cases exist.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network uses parabolic reflectors whose surfaces satisfy the focus-directrix property with e = 1; every incoming radio wave parallel to the axis reflects exactly through the feed horn because the path-length difference is zero.

Keplerian orbits of satellites and planets are ellipses whose focus is the system barycentre and whose eccentricity is recovered from radar ranging; SpaceX’s Starlink constellation publishes its orbital elements in precisely this focus-directrix language.

Hyperbolic trajectories appear in gravitational slingshots; the 2019 Parker Solar Probe used a Venus fly-by whose excess speed relative to the Sun produced an e > 1 hyperbola whose asymptotes were calculated from the same ratio definition.

In semiconductor lithography, extreme-ultraviolet mirrors are off-axis ellipsoids (e < 1) whose two foci map the plasma source onto the reticle; the mirror figure is specified to nanometres by enforcing the constant-ratio condition across the aperture.

LORAN-C and modern eLoran navigation rely on hyperbolas of constant time-difference whose foci are fixed transmitter towers; the receiver solves the e > 1 locus equation in real time.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Cartesian distance formula | Both PF and PD are Euclidean distances; the ratio is meaningless without them. |
| Equation of a straight line | The directrix is given by a linear equation; perpendicular distance must be computed from it. |
| Ratio of positive reals  | Eccentricity e is defined as that ratio and must remain constant for every point on the curve. |
| Plane Cartesian coordinates | All subsequent algebraic derivations (standard forms, foci locations) presuppose an xy-plane. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Fix the two geometric anchors
A single point F (focus) and a single line D (directrix) are chosen in the plane. Every candidate point P is then judged solely by how far it lies from F and from D.  
Example: let F = (0,0) and D be the line x = −2.  
Formally the two distances are  
$$PF = \sqrt{(x-0)^2 + (y-0)^2}, \qquad PD = |x+2|.$$  
> [!WARNING]  
> Treating the directrix as a point instead of a line collapses the definition into a circle and erases the entire conic family.

### Step 2 — Introduce the constant ratio e
The eccentricity e > 0 is declared once and for all. The defining relation is required to hold identically:  
$$PF = e \cdot PD.$$  
This single scalar equation is the entire content of the definition; no further reference to cones is needed.

### Step 3 — Specialise to e = 1 (parabola)
When e = 1 the relation simplifies to PF = PD. Substituting the expressions from Step 1 yields  
$$x^2 + y^2 = (x+2)^2.$$  
Expansion and simplification produce the standard parabolic equation y² = 4x.

### Step 4 — Specialise to e < 1 (ellipse)
Choose F = (c,0) and directrix x = a/e with 0 < e < 1 and a > c. The same ratio condition expands, after algebraic completion of the square, into  
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \quad b^2 = a^2(1-e^2).$$  
The curve is bounded and closed.

### Step 5 — Specialise to e > 1 (hyperbola)
Now a/e < c. The identical ratio condition produces  
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad b^2 = a^2(e^2-1).$$  
Two unbounded branches appear.

### Step 6 — Recover the classical focus-directrix statement
Any non-degenerate conic is completely characterised by the triple (F, D, e). Conversely, every triple with e > 0 determines a unique conic (parabola, ellipse or hyperbola). This equivalence is the textbook definition.

## 5. Worked examples — every step shown

**Example 1 — Identify the curve from given focus, directrix and e**  
*Given:* Focus F(−1,2), directrix x + y − 1 = 0, e = 1.  
*Find:* The Cartesian equation.  

Distance PF:  
$$\sqrt{(x+1)^2 + (y-2)^2}.$$  
*Why:* Euclidean distance from (x,y) to (−1,2).  

Distance PD:  
$$\frac{|x+y-1|}{\sqrt{2}}.$$  
*Why:* Perpendicular distance from point to line ax+by+c=0.  

Set PF = 1·PD and square both sides:  
$$(x+1)^2 + (y-2)^2 = \frac{(x+y-1)^2}{2}.$$  
*Why:* Squaring removes the square root and the absolute value while preserving equality since distances are non-negative.  

Clear the denominator and expand:  
$$2(x^2 + 2x + 1 + y^2 − 4y + 4) = (x+y−1)^2.$$  
After simplification the equation is  
$$x^2 + y^2 + 2x − 4y + 5 = 0.$$  
**Final answer:** \(x^2 + y^2 + 2x - 4y + 5 = 0\) (parabola).  

*Reflection:* The only non-obvious step was normalising the line distance; once that factor is written, algebra is mechanical.

**Example 2 — Derive standard form from focus-directrix data (e < 1)**  
*Given:* F(0,0), directrix x = 4, e = 1/2.  
*Find:* Standard equation.  

PF = (1/2) PD yields  
$$\sqrt{x^2 + y^2} = \frac12 |x-4|.$$  
Square:  
$$x^2 + y^2 = \frac14 (x-4)^2.$$  
Multiply by 4:  
$$4x^2 + 4y^2 = (x-4)^2.$$  
Expand and rearrange:  
$$3x^2 + 4y^2 + 8x − 16 = 0.$$  
Divide by 16 after completing the square:  
$$\frac{(x + \frac43)^2}{(\frac43)^2} + \frac{y^2}{(\frac43)^2} = 1.$$  
**Final answer:** ellipse centred at (−4/3,0) with semi-major axis 4/3.  

*Reflection:* The centre is shifted exactly because the focus is not at the origin relative to the directrix.

**Example 3 — Recover e from a given ellipse equation**  
*Given:* \(\frac{x^2}{25} + \frac{y^2}{16} = 1\).  
*Find:* e.  

a = 5, b = 4, so c = 3. Then  
$$e = \frac{c}{a} = \frac35.$$  
**Final answer:** \(e = 0.6\).

*Reflection:* The definition forces e = c/a; any other ratio would violate PF = e·PD.

**Example 4 — Hyperbola with vertical directrix and e > 1**  
*Given:* F(3,0), directrix x = 1, e = 3/2.  
*Find:* Equation.  

PF = (3/2) PD produces  
$$\sqrt{(x-3)^2 + y^2} = \frac32 |x-1|.$$  
Square, clear fractions, simplify to  
$$\frac{x^2}{4} - \frac{y^2}{5} = 1.$$  
**Final answer:** \(\frac{x^2}{4} - \frac{y^2}{5} = 1\).

*Reflection:* The sign change in the standard form appears automatically once e exceeds 1.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using distance to focus as the perpendicular distance to a line | Students confuse the focus (point) with the directrix (line) | Always label PF and PD explicitly before writing the ratio. |
| Forgetting to divide by the norm when computing PD | The formula |ax+by+c|/√(a²+b
²) is misremembered | Write the norm in every distance-to-line calculation. |
| Assuming the focus lies on the directrix | The definition permits any placement; degeneracy occurs only when e = 0 and focus lies on directrix | Check that e > 0 and focus not on directrix before proceeding. |
| Squaring both sides without verifying non-negativity | Distances are positive, yet algebraic extraneous roots can appear | After solving, substitute sample points back into the original ratio. |
| Confusing the numerical value of e with the linear eccentricity c | c is a length; e is dimensionless | Keep the symbols distinct from the first step. |
| Placing the directrix through the focus when e ≠ 1 | Produces degenerate point or empty set | Verify a > c for ellipse, a < c for hyperbola. |
| Treating the circle as a separate case instead of e = 0 | The definition still holds when focus and directrix are infinitely far apart | Note that e = 0 forces PF = 0, i.e., the focus itself, which is the limiting ellipse. |

## 7. The textbook-precise statement
Let F be a fixed point, D a fixed line, and e a fixed positive real number. The conic with focus F, directrix D and eccentricity e is the set  
$$\{P\in\mathbb{R}^2 : PF = e\cdot PD\}.$$  
If e = 1 the set is a parabola; if 0 < e < 1 an ellipse; if e > 1 a hyperbola. (Stewart, *Calculus*, 9e, §10.6, Definition 3.)

## 8. Visual — diagram or schematic
```text
          directrix
              |
   D: x = -p  |               focus F
              |                  •
--------------+-----------------------
              |                 (c,0)
              | 
              • P(x,y)
             /|
            / |
       PF  /  | PD
          /   |
         /    |
```
Horizontal axis x, vertical y. Focus at (c,0), directrix the vertical line x = −p. For any point P the two segments PF and the perpendicular PD satisfy PF/PD = e constantly.

## 9. The memory technique

1. **The hook**  
   Picture a silver pin at the focus and a rigid straight-edge as the directrix; stretch a string of length e times the distance to the edge and swing the pencil—every point it traces obeys the definition.

2. **What to overlearn**  
   - PF = e·PD (core equality)  
   - e = 1 parabola, e < 1 ellipse, e > 1 hyperbola (classification)  
   - c = ae (relation between linear and angular eccentricity)

3. **Spaced-repetition schedule**  
   Review the equality and classification at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Return to the distance definitions PF and PD, impose the ratio, square both sides and complete the square; the three canonical forms emerge without memorisation.

## 10. What this unlocks
Mastery of the focus-directrix definition supplies the geometric origin of every later algebraic and polar property of conics.  

- Derivation of the standard Cartesian forms and the reflective properties used in optics.  
- Polar equations with focus at the pole: r = ed/(1 − e cos θ).  
- Kepler’s first law and orbital mechanics.  
- Conic fitting algorithms in computer vision and robust regression.  
- Dandelin spheres that recover the focus-directrix property from the cone slice.

## 11. Self-check — five questions, no answers
1. Given focus (2,0), directrix x = −2 and e = 2/3, write the Cartesian equation and state the type of conic.  
2. For the hyperbola x²/9 − y
²/16 = 1 compute the eccentricity directly from the focus-directrix definition without using the formula e = c/a.  
3. A point P satisfies PF = 1.5 PD where F is (0,0) and D is x = 4. Show that P cannot lie on the y-axis.  
4. Explain why the set defined by PF = 0·PD is a single point, and why that point may be regarded as a degenerate ellipse.  
5. Two candidate definitions are offered: (i) PF/PD = constant, (ii) PF + PD = constant. Which produces an ellipse and which a parabola? Construct a numerical counter-example showing the two loci are distinct.