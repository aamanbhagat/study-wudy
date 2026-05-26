## 1. The one-sentence answer
**Optimization locates the largest or smallest value of a quantity by setting its derivative to zero and checking the surrounding behavior.**

A function changes most rapidly where its slope is steep and stops increasing or decreasing where its slope is zero. Those stationary points are candidates for maxima or minima. In an unconstrained problem the only requirement is that the derivative exists and equals zero; the second derivative or a sign chart then distinguishes a peak from a valley. Real problems usually arrive with extra conditions—fixed perimeter, fixed volume, fixed budget—so the model is first reduced to a single-variable function before the derivative test is applied.

Constrained cases are handled by expressing every variable in terms of one free variable (substitution) or, at a more advanced level, by introducing a multiplier that enforces the side condition. The same first-derivative condition appears, now applied to the reduced function or to the Lagrangian; the geometry is simply that the level curves of the objective become tangent to the constraint curve at the optimum.

> [!NOTE]
> The decisive geometric fact is that at an optimum the gradient of the objective is parallel to the gradient of the constraint; this single vector condition replaces an entire system of inequalities.

## 2. Why this matters — concrete and current
SpaceX sizes the propellant tanks of Starship to maximize payload mass for a given total vehicle length; the resulting single-variable cubic is optimized exactly as in a first-semester calculus exercise.

In semiconductor manufacturing, TSMC minimizes the cycle time of a photolithography scanner subject to a fixed total energy budget per wafer; the model reduces to a constrained quadratic program whose solution is obtained by substitution before any numerical solver is invoked.

Epidemiologists at the WHO fit logistic growth curves to daily case counts; the time of peak incidence is the point where the derivative of the cumulative curve equals zero, directly informing hospital-bed allocation weeks in advance.

Tesla’s Autopilot team optimizes the jerk profile of a lane-change maneuver so that passenger discomfort (integral of squared jerk) is minimized subject to a hard constraint on total lateral displacement; the Euler–Lagrange equation collapses to a simple cubic spline whose coefficients are fixed by endpoint conditions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Guarantees that “slope = 0” is a well-defined statement   |
| Power, product and chain rules | Required to compute the derivatives that locate extrema   |
| Domain and range of a function | Determines whether a critical point lies inside the feasible interval |
| Quadratic formula        | Solves the linear or quadratic equations that arise after differentiation |

## 4. Building the idea — from intuition to formalism

### Step 1 — A quantity stops growing when its rate of change vanishes
If a smooth function is increasing, its graph rises; when it ceases to rise, the tangent must be horizontal.  
Example: height of a thrown ball is \(h(t)= -4.9t^2 + 20t + 1\). The ball is still climbing while \(h'(t)>0\).  
Formal statement: a differentiable function \(f\) has a horizontal tangent at \(c\) when
\[
f'(c)=0.
\]
> [!WARNING] Setting the derivative to zero finds candidates only; it does not yet prove a maximum or minimum exists.

### Step 2 — Critical points are the only places extrema can occur
Inside an open interval the Extreme Value Theorem guarantees that any extremum of a continuous function occurs where the derivative is zero or does not exist.  
Example: on \((0,\infty)\) the function \(f(x)=x^2\) has its minimum only at the critical point \(x=0\).  
Formal statement: if \(f\) attains a local extremum at an interior point \(c\) and \(f'(c)\) exists, then \(f'(c)=0\).

### Step 3 — The second-derivative test classifies the critical point
The sign of \(f''(c)\) tells whether the graph is concave up (local minimum) or concave down (local maximum).  
Example: \(f(x)=x^3-3x\) has \(f'(x)=3x^2-3=0\) at \(x=\pm1\); \(f''(1)=-6<0\) so \(x=1\) is a local maximum.  
Formal statement: if \(f'(c)=0\) and \(f''(c)>0\) then \(c\) is a local minimum.

### Step 4 — Real problems must be turned into functions of one variable
A physical constraint supplies a relation among several variables; solve that relation for one variable and substitute.  
Example: a rectangular enclosure against a wall uses 100 m of fence; the area \(A=x(100-2x)\) is now a function of one variable.

### Step 5 — Endpoints and physical bounds must be checked separately
The Extreme Value Theorem applies only on a closed bounded interval; the largest and smallest values occur at critical points or at the endpoints.  
Formal statement: on \([a,b]\) evaluate \(f\) at every critical point in \((a,b)\) and at \(a\) and \(b\); the global max and min are the largest and smallest of these numbers.

### Step 6 — The method of substitution yields the textbook statement of unconstrained optimization
After substitution the problem reduces to finding the critical points of a differentiable function \(f:[a,b]\to\mathbb{R}\) and comparing their values with the endpoint values. The point at which the absolute maximum or minimum occurs is the solution of the original optimization problem.

## 5. Worked examples — every step shown

**Example 1 — Open box from a square sheet**  
*Given:* a 12 cm square of cardboard; squares of side \(x\) are cut from each corner and the sides folded up.  
*Find:* the value of \(x\) that maximizes volume.  

Volume: \(V(x)=x(12-2x)^2\).  
Differentiate:  
\[
V'(x)=(12-2x)^2 + x\cdot2(12-2x)(-2)=(12-2x)[(12-2x)-4x]=(12-2x)(12-6x).
\]  
*Why:* product rule applied to \(x\cdot u(x)^2\) where \(u=12-2x\).  
Set \(V'(x)=0\): \(x=2\) or \(x=6\). Only \(x=2\) lies inside \((0,6)\).  
Second derivative or sign chart confirms a maximum.  
**Final answer:** \(x=2\) cm yields maximum volume 128 cm³.

*Reflection:* the quadratic factor appeared because the width and length are linearly related to the same cut size; this pattern repeats in every “fold-up” problem.

**Example 2 — Rectangular field with one side a river**  
*Given:* 200 m of fence, river forms one side.  
*Find:* dimensions maximizing area.  

Let \(x\) be the side perpendicular to the river; then parallel side is \(200-2x\).  
Area: \(A(x)=x(200-2x)\).  
\(A'(x)=200-4x=0\) gives \(x=50\).  
**Final answer:** 50 m by 100 m, area 5000 m².

*Reflection:* the absence of an endpoint check is legitimate because the domain is open and area tends to zero at both ends.

**Example 3 — Cylinder inscribed in a sphere**  
*Given:* sphere of radius 6; cylinder inside touches the sphere along a circle.  
*Find:* height of cylinder that maximizes volume.  

Constraint: \(r^2+(h/2)^2=36\).  
Volume: \(V=\pi r^2 h=\pi(36-(h/2)^2)h\).  
\(V'(h)=\pi(36-3(h/2)^2)=0\) yields \(h=2\sqrt{6}\).  
**Final answer:** height \(2\sqrt{6}\approx4.90\) (radius \(\sqrt{18}\)).

*Reflection:* substitution converted a two-variable constrained problem into an ordinary single-variable calculus exercise.

**Example 4 — Lightest ladder leaning over a fence**  
*Given:* 2 m fence 1 m from a building; ladder must touch the ground, clear the fence, and reach the building.  
*Find:* shortest ladder.  

Let \(\theta\) be the angle with the ground. Length \(L(\theta)=1/\cos\theta+2/\sin\theta\).  
\(L'(\theta)=\tan\theta/\cos\theta-2\cot\theta/\sin\theta=0\) simplifies to \(\tan^3\theta=2\).  
**Final answer:** \(\theta=\arctan(2^{1/3})\), \(L\approx3.61\) m.

*Reflection:* trigonometric substitution often linearizes the geometry before differentiation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to restrict the domain | Physical lengths cannot be negative                 | Write the interval of admissible \(x\) before differentiating |
| Treating an endpoint as a critical point | Endpoints have no derivative requirement            | Always evaluate function values at \(a\) and \(b\) separately |
| Using the second-derivative test when \(f''=0\) | Test is inconclusive at inflection points           | Fall back to the first-derivative sign chart         |
| Substituting the constraint after differentiating | Violates the chain rule on the constraint surface   | Substitute first, then differentiate                 |
| Maximizing area when perimeter is fixed but units are mixed | Dimensional inconsistency hides the error           | Keep all quantities in consistent units from the start |
| Ignoring that a critical point may be a minimum when a maximum is requested | The second-derivative sign is misread               | State the sign of \(f''(c)\) explicitly in every solution |
| Assuming the feasible set is closed when it is open | The supremum may not be attained                    | Check the limiting behavior as \(x\) approaches the boundary |

## 7. The textbook-precise statement
Let \(f\) be continuous on a closed interval \([a,b]\) and differentiable on \((a,b)\). Then the absolute maximum and absolute minimum of \(f\) on \([a,b]\) occur either at a critical point \(c\in(a,b)\) where \(f'(c)=0\) or at an endpoint \(a\) or \(b\). (Stewart, *Calculus*, 9e, §4.1, Theorem 3 and §4.7 for constrained substitution examples.)

## 8. Visual — diagram or schematic
```text
y
↑
|          local max
|         /\
|        /  \
|       /    \   local min
|      /      \__/
|     /
|    /
+---+----------------→ x
    a   c1  c2   b
```
Horizontal tangents appear only at \(c_1\) and \(c_2\); the global maximum on \([a,b]\) is the larger of \(f(c_1)\) and \(f(b)\).

## 9. The memory technique
1. **The hook** — picture a ball rolling along a roller-coaster track; it is instantaneously weightless exactly where the track is horizontal—the same place the derivative is zero.
2. **What to overlearn** — the equation \(f'(c)=0\) together with the three-line checklist “critical points, endpoints, compare values.”
3. **Spaced-repetition schedule** — review the roller-coaster image and the checklist at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from the definition \(f'(c)=\lim_{h\to0}(f(c+h)-f(c))/h=0\), which forces the numerator to approach zero faster than the denominator, i.e., a horizontal tangent.

## 10. What this unlocks
The same critical-point logic extends directly to functions of several variables, to Lagrange multipliers for equality constraints, and to the Karush–Kuhn–Tucker conditions for inequality constraints that appear in operations research.  
- Multivariable gradients and the Hessian test  
- Lagrange multipliers (Stewart §14.8)  
- Linear programming duality via the simplex method  
- Optimal control and Pontryagin’s principle in aerospace trajectory design

## 11. Self-check — five questions, no answers
1. A rectangle is inscribed in a semicircle of radius 5; find the dimensions that maximize area.  
2. Show that the critical point of \(f(x)=x^4-2x^2\) at \(x=0\) is neither a local max nor a local min.  
3. A cylindrical can must hold 1000 cm³; minimize surface area when the top and bottom are cut from square sheets (waste is discarded).  
4. Explain why the substitution method fails if the constraint is an inequality rather than an equality.  
5. For the ladder problem in Example 4, verify that the critical point found is indeed a minimum by examining the sign of \(L'(\theta)\) on either side.