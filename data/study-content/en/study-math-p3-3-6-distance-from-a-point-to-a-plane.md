## 1. The one-sentence answer
**The distance from a point to a plane is the length of the unique perpendicular from the point to the plane.**

This length is obtained by projecting the vector from any point on the plane to the given point onto the unit normal vector of the plane. The absolute value ensures the result is positive regardless of which side of the plane the point lies on. The denominator normalises the plane’s coefficients so that the expression yields an actual Euclidean distance rather than a scaled quantity.

The derivation rests only on the dot-product definition of projection and the standard Cartesian equation of a plane; no integration or limits are required.

> [!NOTE]
> The absolute value in the final formula is not decorative: omitting it produces a signed distance that is negative on one side of the plane, which is useful for some algorithms but fatal for a pure distance query.

## 2. Why this matters — concrete and current
In LiDAR-based mapping systems used by Waymo and Cruise, the distance from each laser return to the estimated ground plane determines whether the point belongs to the road surface or to an obstacle; errors of a few centimetres propagate directly into collision-avoidance decisions.

Semiconductor manufacturers align silicon wafers under extreme-ultraviolet scanners by minimising the distance from measured surface points to a fitted reference plane; the same calculation appears in the calibration routines of ASML’s TwinScan machines.

In computational protein crystallography, the distance from an atom to the least-squares plane of an aromatic ring quantifies deviation from planarity, a quantity reported in every refinement cycle of Phenix and REFMAC.

Ray-tracing engines inside Pixar’s RenderMan and NVIDIA’s OptiX compute the distance from a ray origin to each triangle’s supporting plane as the first step of intersection culling, rejecting millions of rays per frame before any barycentric test occurs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian plane equation | Supplies the coefficients \(a,b,c,d\) that encode the normal direction. |
| Vector dot product       | Measures the projection of a vector onto the normal; the geometric heart of the distance formula. |
| Unit vector              | Converts the raw projection into an actual length.        |
| Absolute value           | Removes sign ambiguity arising from choice of normal orientation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Plane as level set
A plane is the set of all points whose position vectors satisfy a linear equation.  
Example: the equation \(2x - y + 3z = 6\) describes every point \((x,y,z)\) whose weighted coordinates sum to 6.  
Formally, \(ax + by + cz + d = 0\).  
> [!WARNING]  
> Treating the constant term as part of the normal vector instead of separating it will corrupt the later projection.

### Step 2 — Normal vector
The coefficients \((a,b,c)\) form a vector \(\mathbf{n}\) orthogonal to every vector lying inside the plane.  
Any two points on the plane give a vector whose dot product with \(\mathbf{n}\) is zero.

### Step 3 — Vector from plane to external point
Let \(P_0(x_0,y_0,z_0)\) be the external point and \(Q(x_1,y_1,z_1)\) any point on the plane. The vector \(\overrightarrow{QP_0}\) points from the plane toward \(P_0\).

### Step 4 — Projection onto the normal
The scalar projection of \(\overrightarrow{QP_0}\) onto the direction of \(\mathbf{n}\) equals \(\frac{\overrightarrow{QP_0}\cdot\mathbf{n}}{|\mathbf{n}|}\).  
This length is exactly the distance when the normal is unit length.

### Step 5 — Removing dependence on chosen point Q
Substitute the plane equation: \(\overrightarrow{QP_0}\cdot\mathbf{n} = ax_0 + by_0 + cz_0 + d\).  
The expression is identical for every choice of Q on the plane.

### Step 6 — Normalisation and absolute value
Divide by \(|\mathbf{n}|\) and take the absolute value to guarantee a positive Euclidean distance independent of normal orientation.  
The textbook formula follows at once.

## 5. Worked examples — every step shown

**Example 1 — Axis-aligned plane**  
*Given:* Plane \(z = 4\) (i.e., \(0x + 0y + 1z - 4 = 0\)) and point \((1,2,7)\).  
*Find:* Distance.  
Step: Identify \(a=0,b=0,c=1,d=-4\), \((x_0,y_0,z_0)=(1,2,7)\).  
*Why:* Matches the general form directly.  
Numerator: \(|0\cdot1 + 0\cdot2 + 1\cdot7 - 4| = |3|\).  
*Why:* Dot product of \((1,2,7)\) with normal plus constant.  
Denominator: \(\sqrt{0+0+1}=1\).  
*Why:* Normal already unit length.  
**3**  
*Reflection:* The absolute value discards the sign; the distance is simply the difference in the free coordinate.

**Example 2 — General coefficients**  
*Given:* Plane \(x + 2y + 2z = 0\) and point \((1,2,3)\).  
*Find:* Distance.  
Rewrite: \(a=1,b=2,c=2,d=0\).  
Numerator: \(|1+4+6|=11\).  
*Why:* Evaluates the plane function at the point.  
Denominator: \(\sqrt{1+4+4}=\sqrt{9}=3\).  
*Why:* Euclidean norm of normal.  
**11/3**  
*Reflection:* Scaling the entire equation by any constant leaves the ratio unchanged.

**Example 3 — Point on the plane**  
*Given:* Same plane and point \((2,-1,0)\).  
Numerator: \(|2-2+0|=0\).  
Distance = 0.  
*Reflection:* Verifies the formula returns zero exactly on the surface.

**Example 4 — Non-origin plane, fractional answer**  
*Given:* Plane \(3x - y + z - 5 = 0\) and point \((-1,4,2)\).  
Numerator: \(| -3 -4 +2 -5 |=10\).  
Denominator: \(\sqrt{9+1+1}=\sqrt{11}\).  
**10/\sqrt{11}**  
*Reflection:* The result is irrational; rationalising the denominator is unnecessary unless further algebraic manipulation is required.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Forgetting the absolute value     | Signed distance appears in derivations        | Always wrap the numerator in \(\lvert\,\rvert\)      |
| Using the plane constant without sign flip | Equation written as \(ax+by+cz=d\)            | Move all terms to left side before extracting \(d\)  |
| Normalising only the point coordinates | Confusion between point and plane scaling     | Normalise the normal vector, never the point         |
| Dividing by \(a^2+b^2+c^2\) instead of its square root | Missing the unit-vector step                  | Remember the projection formula requires \(\lvert\mathbf{n}\rvert\) |
| Choosing a different point on the plane changes the answer | Arithmetic slip in substitution               | Prove algebraically that any point on the plane yields the identical numerator |
| Applying the 2-D line formula in 3-D | Dimensional oversight                         | Verify the normal has three components               |
| Treating vertical planes specially | Over-generalising 2-D intuition               | The formula is dimension-independent; no special case needed |

## 7. The textbook-precise statement
Let \(\Pi\) be the plane \(ax+by+cz+d=0\) with \((a,b,c)\neq(0,0,0)\) and let \(P_0(x_0,y_0,z_0)\) be any point in \(\mathbb{R}^3\). The Euclidean distance from \(P_0\) to \(\Pi\) is
\[
d = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}.
\]
(Stewart, *Calculus*, 9e, §12.5, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          z
          ↑
          |       • P0(x0,y0,z0)
          |      /
          |     /  d (perpendicular)
          |    /
----------+--------------- plane ax+by+cz+d=0
         / 
        /  normal n = (a,b,c)
       /
      origin
```
The perpendicular segment of length \(d\) meets the plane at right angles to every line lying inside the plane; its direction coincides with \(\mathbf{n}\).

## 9. The memory technique
1. **The hook** — Picture the normal vector as a rigid measuring rod standing straight up from the plane; the distance is how far the point sits along that rod.  
2. **What to overlearn** — The full formula and the fact that scaling the plane equation does not change \(d\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by writing the projection \(\frac{\overrightarrow{QP_0}\cdot\mathbf{n}}{|\mathbf{n}|}\) and substituting the plane equation for the dot product.

## 10. What this unlocks
Mastery of point-to-plane distance supplies the primitive operation for point-to-polyhedron distance, half-space clipping, and the Hessian normal form used in linear programming.  
- Distance from point to line via cross-product formula  
- Plane-to-plane angle via normal dot product  
- Convex-hull separation tests in computational geometry  
- Ray–plane intersection parameter \(t = -(\mathbf{o}\cdot\mathbf{n}+d)/(\mathbf{v}\cdot\mathbf{n})\) in ray tracing  

## 11. Self-check — five questions, no answers
1. Compute the distance from \((0,0,0)\) to the plane \(x+y+z=1\).  
2. Show that scaling every coefficient of the plane equation by \(k\neq0\) leaves the distance unchanged.  
3. A point lies at distance 5 from the plane \(2x-3y+z=7\). What is the value of the plane expression evaluated at that point?  
4. Derive the distance formula starting from the parametric equation of the perpendicular line.  
5. Two planes have normals that are negatives of each other. Does the distance from a given point to each plane ever differ? Explain.