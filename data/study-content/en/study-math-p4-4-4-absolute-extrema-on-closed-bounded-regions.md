## 1. The one-sentence answer
**Absolute extrema on closed bounded regions are the global maximum and minimum values attained by a continuous function on a compact set in the plane, found by comparing interior critical points with values on the boundary.**

A function \(f(x,y)\) that is continuous on a closed and bounded region \(D\) must reach both a highest and a lowest value somewhere in \(D\). These values cannot hide at infinity or in an open hole because \(D\) has no such escape routes. The search therefore splits into two exhaustive parts: locate every point inside \(D\) where both partial derivatives vanish, then examine every point on the outer edge of \(D\).

The interior candidates are found exactly as in unconstrained multivariable calculus. The boundary requires a reduction to single-variable calculus, either by parameterizing each straight or curved side or by solving a constrained problem. Once all candidate values are computed, the largest and smallest among them are the absolute extrema.

> [!NOTE]
> The decisive insight is that compactness forces the extreme values to occur at a finite list of explicitly computable points; no further search is needed once the interior critical points and the boundary extrema have been checked.

## 2. Why this matters — concrete and current
NASA trajectory planners minimize fuel consumption of a spacecraft subject to the closed, bounded set of admissible thrust and attitude angles; the resulting absolute minimum occurs either at an interior stationary point of the Hamiltonian or on the boundary of the feasible control region.

In semiconductor mask optimization, engineers maximize lithographic yield over a closed rectangular domain of possible exposure doses and focus offsets; the global maximum determines the process window that is certified for production.

Machine-learning hyperparameter search on a closed bounded grid (learning rate and regularization coefficient both restricted to compact intervals) guarantees that the best validation accuracy is attained and can be reported reproducibly.

Aerodynamic shape design for wind-turbine blades treats chord-length and twist-angle pairs inside a closed bounded design space; the absolute maximum lift-to-drag ratio is certified only after both interior critical points and the boundary of the allowable geometric envelope have been evaluated.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Partial derivatives            | Locate candidate points inside the region                 |
| Single-variable extreme-value theorem | Optimize the restriction of \(f\) to each boundary curve |
| Parameterization of curves     | Convert boundary search into ordinary one-variable calculus |
| Continuity on compact sets     | Guarantee that extrema exist before any calculation begins |

## 4. Building the idea — from intuition to formalism

### Step 1 — Compactness guarantees existence
A continuous function on a closed and bounded set cannot “run away” to infinity or approach a missing limit point.  
Concrete example: \(f(x,y)=x^2+y^2\) on the closed unit disk attains its minimum 0 at the origin and its maximum 1 on the circle.  
Formal statement: If \(f\) is continuous and \(D\subset\mathbb{R}^2\) is closed and bounded, then there exist points \((x_0,y_0),(x_1,y_1)\in D\) such that
\[
f(x_0,y_0)=\min_D f,\qquad f(x_1,y_1)=\max_D f.
\]
> [!WARNING] If the region is open (for example the open disk), the same function may fail to attain its infimum or supremum.

### Step 2 — Interior candidates are critical points
Inside the open region the usual first-derivative test applies.  
Formal statement: If an interior point is a local extremum and the first partial derivatives exist, then
\[
f_x(x_0,y_0)=0,\qquad f_y(x_0,y_0)=0.
\]
> [!WARNING] A point where the gradient fails to exist (for example a cusp) may still be an extremum and must be checked separately.

### Step 3 — Boundary search reduces dimension
Each connected component of the boundary is a compact curve that can be parameterized by a single variable \(t\). Substituting yields an ordinary function \(g(t)=f(x(t),y(t))\) whose extrema are found by the single-variable method.  
> [!WARNING] Omitting even one segment of a polygonal boundary produces an incomplete candidate list.

### Step 4 — Compare all candidate values
Evaluate \(f\) at every interior critical point and at every boundary extremum; the largest and smallest numbers among these finitely many values are the absolute extrema.  
Formal statement: The absolute maximum is
\[
\max\bigl\{f(c):c\text{ interior critical or boundary extremum}\bigr\}.
\]

### Step 5 — The Extreme-Value Theorem for two variables
Combining the preceding four steps yields the complete algorithm used in every textbook.  
Formal statement appears in Section 7.

## 5. Worked examples — every step shown

**Example 1 — Unit square**  
*Given:* \(f(x,y)=x^2-2xy+3y^2+2x-6y\) on the closed square \(D=[0,2]\times[0,1]\).  
*Find:* absolute maximum and minimum.  

Compute partial derivatives:
\[
f_x=2x-2y+2,\qquad f_y=-2x+6y-6.
\]
Set both to zero:
\[
x-y+1=0,\qquad -x+3y-3=0.
\]
Solving yields the single critical point \((1,0)\), which lies inside \(D\).  
Value: \(f(1,0)=1\).

Boundary analysis:  
- Bottom: \(y=0\), \(0\le x\le2\), \(g(x)=x^2+2x\), \(g'=2x+2=0\) at \(x=-1\) (outside). Endpoints give \(g(0)=0\), \(g(2)=8\).  
- Top: \(y=1\), \(g(x)=x^2-2x+3-6+2x=x^2-3\), endpoints \(g(0)=-3\), \(g(2)=1\).  
- Left: \(x=0\), \(0\le y\le1\), \(g(y)=3y^2-6y\), \(g'=6y-6=0\) at \(y=1\). Values: \(g(0)=0\), \(g(1)=-3\).  
- Right: \(x=2\), \(g(y)=4-4y+3y^2+4-6y=3y^2-10y+8\), critical point outside interval. Endpoints 8 and 1.  

Candidate values: 1 (interior), 8, 0, −3.  
**Absolute maximum = 8, absolute minimum = −3.**

*Reflection:* The interior critical point was a saddle; the global minimum occurred on the boundary.

**Example 2 — Closed unit disk**  
*Given:* \(f(x,y)=x^2+y^2-2x\) on \(D:x^2+y^2\le1\).  
Interior critical point: \(\nabla f=(2x-2,2y)=0\) gives \((1,0)\), outside disk. No interior candidates.  
Boundary: \(x=\cos\theta\), \(y=\sin\theta\), \(g(\theta)=\cos^2\theta+\sin^2\theta-2\cos\theta=1-2\cos\theta\).  
\(g'(\theta)=2\sin\theta=0\) at \(\theta=0,\pi\). Values \(g(0)=-1\), \(g(\pi)=3\).  
**Absolute maximum = 3, absolute minimum = −1.**

*Reflection:* When the only critical point lies outside, extrema live exclusively on the boundary.

**Example 3 — Triangular region**  
*Given:* \(f(x,y)=xy\) on the triangle with vertices \((0,0),(2,0),(0,2)\).  
Interior critical point: \(\nabla f=(y,x)=0\) gives \((0,0)\), on boundary.  
Boundary edges yield candidates 0, 0, and maximum 1 at \((1,1)\) on hypotenuse.  
**Absolute maximum = 1, absolute minimum = 0.**

*Reflection:* The hypotenuse parameterization \(x=t\), \(y=2-t\) immediately produces the interior boundary maximum.

**Example 4 — Function with saddle and curved boundary**  
*Given:* \(f(x,y)=x^3-3x+y^2\) on the closed disk \(x^2+y^2\le4\).  
Interior: \(f_x=3x^2-3=0\) gives \(x=\pm1\); \(f_y=2y=0\) gives \(y=0\). Points \((1,0)\) value −2, \((-1,0)\) value 2.  
Boundary \(x=2\cos\theta\), \(y=2\sin\theta\): \(g(\theta)=8\cos^3\theta-6\cos\theta+4\sin^2\theta\). Differentiating and solving produces additional candidates whose values are 4, −4, 0.  
**Absolute maximum = 4, absolute minimum = −4.**

*Reflection:* Both interior saddles and multiple boundary critical points must be compared.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting a boundary segment       | Polygon has more sides than expected        | List every edge explicitly before parameterizing     |
| Using only interior critical points | Belief that boundary is “less important”    | Always treat boundary as a separate one-variable problem |
| Assuming gradient zero on boundary  | Confusing Lagrange with direct parameterization | Parameterize first; use Lagrange only when explicitly constrained |
| Missing endpoint evaluation         | Single-variable calculus habit forgotten    | After finding \(g'(t)=0\), always evaluate endpoints |
| Treating open region as closed      | Overlooking that compactness is required    | Verify closed and bounded before claiming existence  |
| Confusing local and absolute extrema| Local test does not compare distant points  | Collect every candidate value and compare numerically|
| Division by zero in parameterization| Curve passes through origin or singular point | Reparameterize or split the boundary into smooth arcs|

## 7. The textbook-precise statement
Let \(D\subset\mathbb{R}^2\) be closed and bounded and let \(f:D\to\mathbb{R}\) be continuous. Then \(f\) attains an absolute maximum and an absolute minimum on \(D\). Moreover, if \(f\) is differentiable on the interior of \(D\), every absolute extremum occurs either at a critical point in the interior or at an extremum of the restriction of \(f\) to the boundary of \(D\). (Stewart, *Calculus*, 9e, §14.7, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     . (0,2)
          |    / \
          |   /   \
          |  /  C  \     C = interior critical point
          | /       \
          |/_________\______> x
       (0,0)        (2,0)
```
The triangle above is closed and bounded. Interior critical point C must be compared with the three edge extrema (including vertices).

## 9. The memory technique
1. **The hook** — Picture the region as a fenced pasture: the sheep (extreme values) can stand either in the open field (interior critical points) or pressed against the fence (boundary).  
2. **What to overlearn** — The algorithm “critical points inside + extrema on each boundary component” and the fact that compactness guarantees attainment.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive existence from the extreme-value theorem on \(\mathbb{R}\) applied to the continuous image of a compact metric space.

## 10. What this unlocks
This result supplies the rigorous justification for every later optimization procedure on compact sets, including Lagrange multipliers with inequality constraints and the Karush–Kuhn–Tucker conditions.

- Constrained optimization via Lagrange multipliers  
- Linear programming on polyhedra  
- Calculus of variations with fixed endpoints  
- Global optimization algorithms in machine learning  

## 11. Self-check — five questions, no answers
1. State the precise hypotheses under which a continuous function on a plane region is guaranteed to attain absolute extrema.  
2. Find the absolute extrema of \(f(x,y)=x^2+y^2-xy\) on the closed unit disk.  
3. A triangular plate has vertices at \((0,0)\), \((3,0)\), \((0,4)\). Where must the hottest and coldest points of a temperature function occur?  
4. Why does the method fail if the region is the open unit disk? Give a concrete counter-example.  
5. On the square \([0,1]\times[0,1]\), a function has an interior critical point that is a saddle and four boundary critical points. How many numbers must you compare to determine the absolute maximum?