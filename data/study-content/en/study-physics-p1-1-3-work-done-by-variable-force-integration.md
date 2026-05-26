## 1. The one-sentence answer
**Work done by a variable force equals the definite integral of force with respect to displacement along the path.**

When force stays constant, work is simply force times distance. The moment force changes with position, that simple product no longer captures the physics; each infinitesimal slice of path experiences its own force value. Summing those unequal contributions requires adding up infinitely many tiny products, which is exactly what the definite integral performs.

The integral therefore replaces the old formula \(W = F \Delta x\) with the limit of a sum: divide the path into \(N\) segments, compute \(F(x_i)\Delta x_i\) in each, then let \(N \to \infty\). The result is path-dependent only through the limits and the function \(F(x)\); direction enters through the sign of both force and displacement.

> [!NOTE]
> The area under the \(F(x)\) curve is not an approximation; once the integral is taken, that area is the exact mechanical work transferred.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by throttling Merlin engines so thrust varies continuously with altitude and remaining propellant mass; the work done against gravity and drag is obtained by integrating the time-varying thrust vector along the descent trajectory, allowing precise landing-burn timing.

In gravitational wave observatories such as LIGO, the test-mass suspension fibres experience a position-dependent restoring force from both gravity and the fibre’s own elasticity; calculating the thermal-noise energy stored in these modes requires integrating the variable force over the small but finite displacement amplitudes.

Semiconductor ion implanters accelerate dopant ions through a time-varying electrostatic potential that changes along the beam line; the kinetic energy finally delivered to the wafer is the integral of \(qE(x)\) from source to target, and any miscalculation produces incorrect doping depth profiles.

When a rocket ascends through an atmosphere whose density falls exponentially, both thrust and aerodynamic drag are functions of altitude; mission-design software integrates the net force over the entire ascent profile to obtain the exact \(\Delta v\) budget required to reach a target orbit.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of work for constant force | Supplies the starting point that the integral generalises |
| One-dimensional definite integral | The mathematical operation that replaces the finite sum   |
| Force as a function of position \(F(x)\) | The integrand; without it the integral cannot be written  |
| Sign convention for displacement | Determines whether work is positive or negative           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant force gives a rectangle
Work is the product of a single force value and a displacement. On a graph whose horizontal axis is position and vertical axis is force, that product appears as the area of a rectangle.

Example: a 3 N force acting over 4 m produces a rectangle of area 12 J.

Formal statement:
\[
W = F \cdot \Delta x
\]

> [!WARNING]
> Treating a slowly varying force as exactly constant over a large interval silently replaces the true area with a rectangle that may lie entirely above or below the curve.

### Step 2 — Force changes, so the rectangle breaks
If force is different at different positions, one rectangle cannot represent the whole displacement. The path must be cut into smaller pieces, each short enough that force is nearly constant inside it.

Example: force rises linearly from 0 N to 6 N over 3 m; three 1 m segments give three rectangles whose areas are 1 J, 3 J and 5 J.

Formal statement: partition the interval \([x_0, x_f]\) into \(N\) subintervals of width \(\Delta x_i\); inside the \(i\)-th subinterval the force is approximately \(F(x_i)\).

### Step 3 — Sum the rectangular areas
Total work is the sum of the small contributions:
\[
W \approx \sum_{i=1}^N F(x_i) \Delta x_i
\]

This sum is the Riemann sum for the function \(F(x)\).

> [!WARNING]
> Using left-endpoint or right-endpoint values indiscriminately can produce a systematic over- or under-estimate when the force is monotonic.

### Step 4 — Shrink the pieces to zero width
Let every \(\Delta x_i \to 0\) while \(N \to \infty\). The Riemann sum converges to the definite integral regardless of the sample-point choice inside each subinterval (provided \(F(x)\) is continuous).

Formal statement:
\[
W = \lim_{N \to \infty} \sum_{i=1}^N F(x_i) \Delta x_i = \int_{x_0}^{x_f} F(x) \, dx
\]

### Step 5 — Textbook statement of the result
For a force that depends only on position along a straight line, the work done by that force between limits \(a\) and \(b\) is the definite integral of \(F(x)\) from \(a\) to \(b\).

## 5. Worked examples — every step shown

**Example 1 — Linear spring**
*Given:* A spring obeys \(F(x) = -kx\) with \(k = 200\) N m\(^{-1}\). The end moves from \(x = 0\) to \(x = 0.05\) m.  
*Find:* Work done by the spring force.

- Write the integral: \(W = \int_0^{0.05} (-200x) \, dx\)  
  *Why:* The definition in Step 5 maps the given \(F(x)\) and limits directly onto the definite integral.
- Antiderivative: \(W = -100 x^2 \big|_0^{0.05}\)  
  *Why:* Power rule reverses the differentiation that produced the integrand.
- Evaluate: \(W = -100(0.05)^2 - (-100)(0)^2 = -0.25\) J  
  *Why:* The negative sign indicates the force opposed the imposed displacement.

**Answer:** \(\mathbf{-0.25}\) J

*Reflection:* The negative result is physically required; the same integral with reversed limits yields the positive work done on the spring.

**Example 2 — Gravitational force near Earth**
*Given:* \(F(y) = -mg\) (constant) from \(y = 0\) to \(y = h\).  
*Find:* Work done by gravity.

- Integral: \(W = \int_0^h (-mg) \, dy\)  
  *Why:* Even a constant is a valid integrand.
- Result: \(W = -mgh\)  
  *Why:* The integral of a constant recovers the elementary formula.

**Answer:** \(\mathbf{-mgh}\)

*Reflection:* The integral formalism contains the constant-force case as a trivial special instance.

**Example 3 — Inverse-square gravity**
*Given:* \(F(r) = -GMm/r^2\) from \(r = R_E\) to \(r = 2R_E\).  
*Find:* Work done by Earth’s gravity on a mass \(m\).

- Set up: \(W = \int_{R_E}^{2R_E} (-GMm/r^2) \, dr\)  
  *Why:* Limits follow the radial path outward.
- Antiderivative: \(W = GMm/r \big|_{R_E}^{2R_E}\)  
  *Why:* Integral of \(r^{-2}\) is \(-r^{-1}\).
- Evaluate: \(W = GMm(1/(2R_E) - 1/R_E) = -GMm/(2R_E)\)  
  *Why:* Negative work again signals opposition to the displacement.

**Answer:** \(\mathbf{-GMm/(2R_E)}\)

*Reflection:* The integral converges at infinity, allowing escape-velocity calculations later.

**Example 4 — Force given by data points**
*Given:* Measured force values at five equally spaced positions.  
*Find:* Approximate work by trapezoidal rule, then compare with exact integral of the fitted quadratic.

(The algebraic steps mirror the Riemann-sum construction in Step 3, confirming numerical convergence to the integral.)

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Integrating with respect to time instead of displacement | Confusing power with work                   | Always check the differential: \(F\,dx\), never \(F\,dt\) |
| Forgetting the sign of \(F(x)\) | Treating force as a magnitude               | Keep the algebraic sign of \(F(x)\) explicit         |
| Using average force without justification | Assuming symmetry that may not exist        | Verify the function is linear before replacing by midpoint value |
| Wrong integration limits    | Reading the coordinate axis backwards       | Sketch the path and mark start and end points first  |
| Treating a vector force as scalar | Ignoring that only the component along \(dx\) does work | Project \(\mathbf{F}\cdot d\mathbf{r}\) before integrating |
| Evaluating the antiderivative at a single point | Losing the definite-integral structure      | Always write the evaluation bar \(\big|_a^b\)        |
| Neglecting units inside the integral | Treating the integral as a pure number      | Carry SI units through every antiderivative          |

## 7. The textbook-precise statement
Let \(F(x)\) be a continuous scalar function giving the component of force parallel to the displacement along a straight line. The work done by this force when the point of application moves from \(x = a\) to \(x = b\) is
\[
W = \int_a^b F(x)\, dx.
\]
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §7-4.)

## 8. Visual — diagram or schematic
```text
F(x)
 ^
 |          /|
 |         / |
 |        /  |  area = work
 |       /   |
 |      /    |
 |     /     |
 |    /______|____> x
      a      b
```
Horizontal axis labelled “position \(x\)”, vertical axis labelled “force component \(F(x)\)”. The shaded region between the curve, the x-axis, and the vertical lines at \(a\) and \(b\) is the geometric representation of the integral.

## 9. The memory technique
1. **The hook** — Picture the force–displacement graph as a hilly landscape; the integral is the total volume of dirt you must shovel to level the path from a to b.
2. **What to overlearn** — \(W = \int_a^b F(x)\, dx\); the differential must be \(dx\), not \(dt\); the sign of \(F\) is algebraic, not absolute.
3. **Spaced-repetition schedule** — Review the definition after 1 day, re-derive the spring example after 3 days, solve an inverse-square problem after 7 days, explain the trapezoidal-rule error after 16 days, and reconstruct the Riemann-sum limit after 35 days.
4. **First-principles fallback** — Begin with the constant-force rectangle, subdivide, form the Riemann sum, pass to the limit; the integral appears automatically.

## 10. What this unlocks
Mastery of the integral definition of work opens every subsequent energy calculation that involves non-uniform fields.  
- Kinetic-energy theorem for variable forces  
- Potential-energy functions via \(U(x) = -\int F(x)\, dx\)  
- Conservation of mechanical energy statements  
- Rocket equation derivations that integrate thrust and drag  
- Action integrals in Lagrangian mechanics

## 11. Self-check — five questions, no answers
1. A force \(F(x) = 3x^2\) acts from \(x=1\) to \(x=2\). Compute the work in one line.
2. Why does reversing the integration limits change the sign of work?
3. A measured force table contains five points; which quadrature rule converges fastest to the true integral and why?
4. If \(F(x)\) is everywhere positive yet the calculated work is negative, what single mistake was almost certainly made?
5. Starting from the definition of kinetic energy, derive the work–kinetic-energy theorem for a variable force in one dimension.