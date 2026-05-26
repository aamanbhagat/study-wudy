## 1. The one-sentence answer
**Lagrange multipliers convert a constrained optimization problem into an unconstrained system of equations by requiring that the gradient of the objective function be a linear combination of the gradients of the constraint functions at the extremum.**

At an extremum of \(f\) subject to \(g(\mathbf{x})=c\), the level surface of \(f\) must be tangent to the level surface of \(g\). Tangency means their normals—the gradients—are parallel, so one is a scalar multiple of the other. This produces the vector equation \(\nabla f=\lambda\nabla g\) together with the original constraint.  

The same geometry extends immediately to two constraints: the gradient of \(f\) must lie in the plane spanned by the two constraint normals, yielding \(\nabla f=\lambda\nabla g+\mu\nabla h\) plus the two constraint equations.  

The method therefore replaces the original constrained search with a larger but fully algebraic system whose solutions are the candidate points.

> [!NOTE]
> The scalar \(\lambda\) (or \(\mu\)) is never needed after the equations are solved; it is an auxiliary variable whose only purpose is to enforce the parallelism of the gradients.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s trajectory optimization tools use Lagrange multipliers to enforce fuel and boundary constraints while minimizing propellant mass for interplanetary transfers; the same framework appears in the open-source software GPOPS-II employed on the Mars 2020 mission planning.  

Support-vector-machine training in machine-learning libraries (LIBSVM, scikit-learn) solves a quadratic program whose KKT conditions are precisely the Lagrange-multiplier equations for the margin-maximization problem subject to linear separation constraints.  

Semiconductor process engineers minimize etch non-uniformity subject to two simultaneous constraints on chamber pressure and gas-flow ratio; the resulting system is solved inside commercial TCAD packages such as Synopsys Sentaurus.  

In general-relativity initial-data construction, the Einstein constraints are enforced via Lagrange multipliers when solving the Hamiltonian and momentum constraints on a spatial hypersurface; the technique is central to the Spectral Einstein Code (SpEC) used by the SXS collaboration.  

Portfolio optimization at quantitative hedge funds maximizes expected return subject to a volatility budget and a sector-exposure limit; the two-constraint Lagrange system is solved millions of times per trading day inside production risk engines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | Gradients are assembled component-wise from partials.     |
| Gradient vector          | The method equates linear combinations of gradients.      |
| Level surfaces           | Tangency of level surfaces supplies the geometric picture. |
| Dot-product geometry     | Parallelism of vectors is expressed by a scalar multiple. |
| Systems of nonlinear equations | The final algebraic problem is solved by standard techniques. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Level curves must touch
A constrained extremum occurs where the highest (or lowest) level curve of \(f\) that still intersects the constraint curve does so at exactly one point.  

Consider \(f(x,y)=x^2+y^2\) and the line \(x+y=1\). The smallest circle centered at the origin that touches the line touches it at a single point.  

At that point the gradients satisfy \(\nabla f=\lambda\nabla g\), or
\[
(2x,2y)=\lambda(1,1).
\]
> [!WARNING]
> If the gradients are evaluated at a point that is not on the constraint, the resulting \(\lambda\) has no meaning for the original problem.

### Step 2 — The multiplier enforces parallelism
The scalar \(\lambda\) absorbs any difference in magnitude while preserving direction.  

For the same example the two scalar equations are \(2x=\lambda\) and \(2y=\lambda\), forcing \(x=y\).  

The formal statement is the vector equation
\[
\nabla f(\mathbf{x})=\lambda\nabla g(\mathbf{x}).
\]

### Step 3 — Restore the constraint
The vector equation supplies \(n\) scalar equations in \(n+1\) unknowns; the original constraint supplies the missing equation.  

Appending \(x+y=1\) yields the solvable system
\[
2x=\lambda,\qquad 2y=\lambda,\qquad x+y=1.
\]

### Step 4 — Two constraints span a plane
When two independent constraints \(g= c\) and \(h=d\) are present, \(\nabla f\) must lie in the plane spanned by \(\nabla g\) and \(\nabla h\).  

The equation therefore becomes
\[
\nabla f=\lambda\nabla g+\mu\nabla h.
\]

### Step 5 — The complete algebraic system
For one constraint the full system is
\[
\nabla f=\lambda\nabla g,\qquad g=c.
\]
For two constraints it is
\[
\nabla f=\lambda\nabla g+\mu\nabla h,\qquad g=c,\qquad h=d.
\]
This is the textbook statement of the method of Lagrange multipliers.

## 5. Worked examples — every step shown

**Example 1 — Distance from origin to a line**  
*Given:* Minimize \(f(x,y)=x^2+y^2\) subject to \(g(x,y)=x+y-1=0\).  
*Find:* The minimum value and the point.  

Set \(\nabla f=\lambda\nabla g\):
\[
(2x,2y)=\lambda(1,1).
\]
*Why:* Gradients must be parallel.  

This produces the two equations \(2x=\lambda\) and \(2y=\lambda\).  
*Why:* Component-wise equality of vectors.  

Add the constraint:
\[
x+y=1.
\]
*Why:* The point must lie on the given line.  

Substitute \(\lambda=2x\) into the second equation to obtain \(x=y\).  
*Why:* Both coordinates equal \(\lambda/2\).  

Solve \(x+x=1\) to get \(x=\frac12\), \(y=\frac12\), \(\lambda=1\).  
*Why:* Linear system is now fully determined.  

The minimum value is \(f(\frac12,\frac12)=\frac12\).  
**\(\frac12\)**

*Reflection:* The symmetry of the objective forced the solution onto the angle bisector; the same symmetry appears in any Euclidean projection problem.

**Example 2 — Linear constraint, quadratic objective**  
*Given:* Maximize \(f(x,y)=xy\) subject to \(x+2y=4\).  
*Find:* The maximum.  

\(\nabla f=(y,x)\), \(\nabla g=(1,2)\).  
*Why:* Compute partial derivatives directly.  

Set \((y,x)=\lambda(1,2)\), so \(y=\lambda\), \(x=2\lambda\).  
*Why:* Parallelism again.  

Substitute into constraint: \(2\lambda+2\lambda=4\) gives \(\lambda=1\), hence \(x=2\), \(y=1\).  
*Why:* Constraint closes the system.  

Value \(f(2,1)=2\).  
**2**

*Reflection:* The method recovers the AM-GM result without logarithms.

**Example 3 — Two constraints in three variables**  
*Given:* Minimize \(f(x,y,z)=x^2+y^2+z^2\) subject to \(x+y+z=1\) and \(x-y=0\).  
*Find:* The point.  

\(\nabla f=(2x,2y,2z)\), \(\nabla g=(1,1,1)\), \(\nabla h=(1,-1,0)\).  
*Why:* Two normals span the admissible directions.  

Equations:
\[
2x=\lambda+\mu,\qquad 2y=\lambda-\mu,\qquad 2z=\lambda,
\]
\[
x+y+z=1,\qquad x-y=0.
\]
*Why:* Full Lagrange system written component-wise.  

From the last two constraints \(x=y\), \(z=1-2x\).  
*Why:* Direct substitution.  

Equate first and second components after adding: \(4x=2\lambda\) so \(\lambda=2x\).  
*Why:* Linear algebra on the first two equations.  

Third component gives \(2z=2x\) so \(z=x\).  
*Why:* Consistency of all three expressions for \(\lambda\).  

Then \(x+x+x=1\) yields \(x=\frac13\), point \((\frac13,\frac13,\frac13)\).  
**\((\frac13,\frac13,\frac13)\)**

*Reflection:* The two planes intersect in a line; the nearest point on that line to the origin is the orthogonal projection.

**Example 4 — Non-linear two-constraint case**  
*Given:* Extremize \(f=x+y+z\) subject to \(x^2+y^2=1\) and \(x+z=1\).  
*Find:* All critical points.  

System:
\[
(1,1,1)=\lambda(2x,2y,0)+\mu(1,0,1),
\]
\[
x^2+y^2=1,\qquad x+z=1.
\]
*Why:* Two independent constraints.  

Component equations: \(1=2\lambda x+\mu\), \(1=2\lambda y\), \(1=\mu\).  
*Why:* Read off coefficients.  

Thus \(\mu=1\), \(1=2\lambda y\) so \(\lambda=\frac12 y^{-1}\) (assuming \(y\neq0\)).  
*Why:* Solve for multipliers first when possible.  

First component: \(1=2(\frac12 y^{-1})x+1\) simplifies to \(0=x/y\), hence \(x=0\).  
*Why:* Algebraic cancellation.  

Constraint \(x=0\) forces \(y=\pm1\), \(z=1\).  
Points: \((0,1,1)\) and \((0,-1,1)\).  
** \((0,1,1)\) and \((0,-1,1)\) **

*Reflection:* The sphere–plane intersection is a circle; the linear objective selects the highest and lowest points on that circle.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to include the constraint equations | The multiplier equations alone are under-determined. | Always write the full system of \(n+k\) equations before solving. |
| Assuming every solution is a minimum | Lagrange yields critical points only; second-derivative tests or comparison is required. | Evaluate \(f\) at all candidate points. |
| Division by zero when solving for \(\lambda\) | A component of \(\nabla g\) vanishes at the point. | Keep \(\lambda\) symbolic until the end or use resultants. |
| Treating dependent constraints as independent | The two gradients become linearly dependent and the multiplier matrix is singular. | Check \(\nabla g\times\nabla h\neq\mathbf{0}\) at candidate points. |
| Using the method on an open domain without boundary constraints | The hypothesis that the extremum lies on the constraint surface fails. | Verify that the feasible set is compact or examine behavior at infinity. |
| Sign error in the multiplier definition | Some texts write \(\nabla g=\lambda\nabla f\). | Fix the convention \(\nabla f=\lambda\nabla g\) once and keep it. |
| Ignoring extraneous roots introduced by squaring | Algebraic manipulations create extra solutions. | Substitute every candidate back into the original constraints. |

## 7. The textbook-precise statement
Let \(f,g,h:\mathbb{R}^n\to\mathbb{R}\) be continuously differentiable. Suppose \(\mathbf{x}_0\) is a local extremum of \(f\) subject to the two constraints \(g(\mathbf{x})=c\) and \(h(\mathbf{x})=d\), and suppose \(\nabla g(\mathbf{x}_0)\) and \(\nabla h(\mathbf{x}_0)\) are linearly independent. Then there exist scalars \(\lambda,\mu\) such that
\[
\nabla f(\mathbf{x}_0)=\lambda\nabla g(\mathbf{x}_0)+\mu\nabla h(\mathbf{x}_0).
\]
(Stewart, *Calculus*, 9e, §14.8, Theorem 1, extended to two constraints.)

## 8. Visual

```text
          ∇f
           ↑
           │
   level curve of f  ──────●────── (tangent point)
                           │
   constraint curve g=c  ──┼──────
                           │
                          ∇g
```
The diagram shows two curves touching at a single point; their normals \(\nabla f\) and \(\nabla g\) are collinear.

## 9. The memory technique

1. **The hook** — Picture a hiker on a mountain ridge (the constraint) who can only walk where the trail is level; at the highest reachable point the uphill direction must be exactly perpendicular to the trail, i.e., the gradient of height must be parallel to the trail’s normal.  
2. **What to overlearn** — The vector equation \(\nabla f=\lambda\nabla g\) (one constraint) and \(\nabla f=\lambda\nabla g+\mu\nabla h\) (two constraints); the fact that \(\lambda,\mu\) are discarded after solving.  
3. **Spaced-repetition schedule** — Review the vector equation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the geometric requirement that \(\nabla f\) must be orthogonal to every tangent vector of the constraint surface; that orthogonality forces \(\nabla f\) into the span of the constraint normals.

## 10. What this unlocks
Lagrange multipliers supply the first-order necessary conditions for equality-constrained nonlinear programs and therefore serve as the gateway to the full Karush–Kuhn–Tucker theory used in inequality-constrained optimization.  

- Shadow prices in economics  
- KKT conditions in convex optimization  
- Penalty and augmented-Lagrangian methods  
- Sensitivity analysis via the implicit-function theorem on the Lagrange system  
- Discrete counterparts in finite-element discretizations of optimal-control problems  

## 11. Self-check — five questions, no answers
1. State the precise geometric condition that must hold between \(\nabla f\) and the constraint gradients at a constrained extremum.  
2. Write the complete Lagrange system for minimizing \(x^2+2y^2+3z^2\) subject to \(x+y+z=1\) and \(x-y-z=0\).  
3. A proposed critical point satisfies the Lagrange equations but \(\nabla g\) and \(\nabla h\) are parallel there. What does this imply?  
4. Compute the maximum of \(x+y+z\) on the unit circle \(x^2+y^2=1\) lying in the plane \(z=1\) using two constraints; verify the value by parametrization.  
5. Explain why the method can produce a saddle even when the constraint set is compact.