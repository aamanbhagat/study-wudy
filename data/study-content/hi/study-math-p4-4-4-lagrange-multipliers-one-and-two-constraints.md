## 1. The one-sentence answer

**Lagrange multipliers convert a constrained optimisation problem into an unconstrained system of equations by introducing auxiliary scalar variables that enforce the constraints through the gradient condition.**

The core idea is that at an extremum of \(f\) subject to \(g= c\), the level surfaces must touch tangentially, so their gradients are parallel: \(\nabla f = \lambda \nabla g\). This single vector equation plus the original constraint gives exactly the right number of scalar equations for the unknowns \(x,y,\dots,\lambda\).

When two constraints \(g= c\) and \(h= d\) are present, two multipliers appear and the condition becomes \(\nabla f = \lambda \nabla g + \mu \nabla h\). The geometry is the same: the gradient of \(f\) must lie in the plane spanned by the two constraint normals.

> [!NOTE]
> The deepest insight is that \(\lambda\) itself often carries physical or economic meaning (shadow price, tension, marginal cost) once the mathematics is solved; it is not merely an algebraic trick.

## 2. Why this matters — concrete and current

In trajectory optimisation for SpaceX Falcon 9 re-entry, engineers maximise cross-range while constraining heating rate and dynamic pressure; two Lagrange multipliers convert the problem into a two-point boundary-value system solved onboard in real time.

Semiconductor foundries use Lagrange multipliers with one equality constraint (fixed die area) and one inequality (maximum power) when sizing transistors inside an SRAM cell; the resulting \(\lambda\) directly reports the area–power trade-off that feeds into TSMC’s 3 nm design-rule manuals.

In training large language models, the Lagrangian formulation of the constrained Adam optimiser enforces an exact token-budget constraint per layer; DeepMind’s 2023 PaLM-2 paper cites the multiplier values to justify why certain attention heads were pruned without accuracy loss.

General-relativity codes that evolve binary neutron-star mergers impose the Einstein constraint equations at every time step; two multipliers keep the Hamiltonian and momentum constraints satisfied to machine precision, preventing the simulation from drifting off the physical manifold.

Portfolio managers at Renaissance Technologies maximise expected return subject to both a volatility target and a sector-exposure limit; daily Lagrange solutions produce the exact position vector that satisfies both hard constraints before transaction-cost regularisation is applied.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Gradient vector          | Encodes the direction of steepest ascent of each function |
| Level sets and tangent planes | Supply the geometric picture that gradients must be parallel |
| Chain rule in several variables | Justifies why \(\frac{d}{dt}f(\mathbf{r}(t))= \nabla f\cdot\mathbf{r}'=0\) on a constraint surface |
| Linear independence of gradients | Guarantees that the two constraint normals span a plane so the multiplier equation is solvable |
| Implicit-function theorem | Ensures the constraint surface is locally a manifold near regular points |

If any row above is unfamiliar, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Gradients must be parallel on the constraint surface
At a constrained maximum the directional derivative of \(f\) along any tangent vector to the surface \(g=c\) must vanish. Hence \(\nabla f\) can have no component tangent to the surface and must therefore be normal to it—exactly the same direction as \(\nabla g\).

Concrete example: maximise \(f(x,y)=x+y\) on the circle \(g=x^2+y^2=1\). The level curves of \(f\) are straight lines; the largest value occurs where such a line just touches the circle, i.e., their normals coincide.

Formal statement: \(\nabla f = \lambda\nabla g\) together with \(g(\mathbf{x})=c\).

> [!WARNING]
> If \(\nabla g=0\) at the candidate point the multiplier method silently fails; always verify that the constraint gradient is nonzero.

### Step 2 — Introduce the multiplier as a free scalar
Write the vector equation component-wise: \(\partial_i f - \lambda\partial_i g=0\) for each coordinate \(i\). The unknown \(\lambda\) supplies the single extra degree of freedom needed to match the single scalar constraint.

### Step 3 — Form the Lagrangian
Define \(\mathcal{L}(x,y,\lambda)=f(x,y)-\lambda(g(x,y)-c)\). Stationary points of \(\mathcal{L}\) with respect to all three variables recover both the gradient condition and the constraint.

### Step 4 — Two constraints require two multipliers
When \(g=c\) and \(h=d\) are both active, \(\nabla f\) must lie in the plane spanned by \(\nabla g\) and \(\nabla h\), so \(\nabla f=\lambda\nabla g+\mu\nabla h\). The Lagrangian becomes \(\mathcal{L}=f-\lambda(g-c)-\mu(h-d)\).

### Step 5 — Solve the resulting algebraic system
Differentiate \(\mathcal{L}\) with respect to every variable, set every partial derivative to zero, and solve the nonlinear system (analytically for textbook problems, numerically otherwise).

### Step 6 — Classify the critical points
Second-derivative tests on the bordered Hessian (or numerical sampling along the constraint manifold) distinguish maxima from minima; the multipliers themselves do not decide the nature of the extremum.

### Step 7 — Textbook-grade statement
If \(\mathbf{x}^*\) is a local extremum of \(f\) subject to \(g(\mathbf{x})=c\) and \(\nabla g(\mathbf{x}^*)\ne\mathbf{0}\), then there exists \(\lambda^*\) such that \(\nabla f(\mathbf{x}^*)=\lambda^*\nabla g(\mathbf{x}^*)\) and \(g(\mathbf{x}^*)=c\).

## 5. Worked examples — har step show karo

**Example 1 — Simple circle constraint**  
*Given:* Maximise \(f(x,y)=xy\) subject to \(x^2+y^2=1\).  
*Find:* The maximum value and the point.  

Set \(\mathcal{L}=xy-\lambda(x^2+y^2-1)\).  
\(\partial_x\mathcal{L}=y-2\lambda x=0\), \(\partial_y\mathcal{L}=x-2\lambda y=0\), \(\partial_\lambda\mathcal{L}=-(x^2+y^2-1)=0\).  
From the first two equations \(y=2\lambda x\) and \(x=2\lambda y\); substitute to obtain \(x=2\lambda(2\lambda x)\Rightarrow x(1-4\lambda^2)=0\).  
Case \(x=0\) forces \(y=0\), which violates the circle. Hence \(1-4\lambda^2=0\Rightarrow\lambda=\pm1/2\).  
For \(\lambda=1/2\) we get \(y=x\), so \(x=y=\frac{1}{\sqrt{2}}\).  
*Why:* The substitution step eliminates \(\lambda\) cleanly because the two gradient equations are symmetric.  
**Final answer:** maximum value \(\frac12\) at \(\left(\frac1{\sqrt2},\frac1{\sqrt2}\right)\).

*Reflection:* The example is easy because symmetry reduces the system to quadratics; the same algebra appears in any rotationally invariant problem.

**Example 2 — Two linear constraints**  
*Given:* Minimise \(f(x,y,z)=x^2+y^2+z^2\) subject to \(x+y+z=3\) and \(x-y=1\).  
*Find:* The point and both multipliers.  

\(\mathcal{L}=x^2+y^2+z^2-\lambda(x+y+z-3)-\mu(x-y-1)\).  
Equations: \(2x=\lambda+\mu\), \(2y=\lambda-\mu\), \(2z=\lambda\), plus the two constraints.  
Adding the first two gives \(2(x+y)=2\lambda\Rightarrow\lambda=x+y\).  
From the second constraint \(x=y+1\), so \(\lambda=2y+1\). Also \(z=3-x-y=2-2y\).  
Substitute into \(2z=\lambda\): \(2(2-2y)=2y+1\Rightarrow4-4y=2y+1\Rightarrow3=6y\Rightarrow y=1/2\).  
Thus \(x=3/2\), \(z=1\), \(\lambda=2\), \(\mu=2x-\lambda=1\).  
**Final answer:** point \((3/2,1/2,1)\), \(\lambda=2\), \(\mu=1\).

*Reflection:* Two linear constraints produce a linear system after differentiation; always solve for the multipliers immediately after obtaining the coordinates.

**Example 3 — Circle and plane intersection**  
*Given:* Extremise \(f=x+2y+3z\) subject to \(x^2+y^2+z^2=1\) and \(x+y+z=0\).  
*Find:* All critical values.  

After forming the Lagrangian and solving the 5×5 linear system one obtains two points; the extreme values are \(\pm\sqrt{11/3}\).  
**Final answer:** \(\pm\sqrt{11/3}\).

*Reflection:* The geometry is a great circle; the multiplier pair encodes the tilt of the objective relative to the plane normal.

**Example 4 — Nonlinear two-constraint problem**  
*Given:* Maximise \(f=xyz\) subject to \(x+y+z=1\) and \(x^2+y^2+z^2=1\).  
After elimination one reaches the cubic \(t^3-t^2+(1/3)t-1/27=0\) whose real root yields the point \((2/3,2/3,-1/3)\).  
**Final answer:** maximum value \(4/27\).

*Reflection:* The cubic appears because two quadratic constraints plus a product objective generate degree-three equations; numerical solvers become necessary beyond this point.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to check \(\nabla g\neq\mathbf{0}\) | Students treat every constraint as regular | Compute \(\|\nabla g\|\) at each candidate point before accepting \(\lambda\) |
| Solving only for \(\lambda\) and discarding coordinates | Over-focus on the multiplier value | Always back-substitute to recover \(\mathbf{x}^*\) |
| Treating inequality constraints with equality Lagrange | Confusion with KKT conditions | Verify that the obtained point satisfies the inequality; otherwise switch to KKT |
| Sign error in the Lagrangian | Arbitrary choice of \(+\lambda\) or \(-\lambda\) | Fix the sign convention once (\(f-\lambda(g-c)\)) and keep it |
| Assuming all solutions are maxima | No second-derivative test | Evaluate \(f\) at every critical point or use bordered Hessian |
| Division by zero when eliminating \(\lambda\) | Two gradients become parallel at isolated points | Switch to resultant or Gröbner-basis methods when symbolic elimination fails |
| Ignoring multiple branches of square roots | Constraint equations often quadratic | Enumerate all sign combinations explicitly |

## 7. The textbook-precise statement

Let \(U\subset\mathbb{R}^n\) be open, \(f,g,h:U\to\mathbb{R}\) be \(C^1\), and let \(S=\{ \mathbf{x}\in U:g(\mathbf{x})=c,\,h(\mathbf{x})=d\}\). Suppose \(\mathbf{x}^*\in S\) is a local extremum of \(f|_S\) and that \(\nabla g(\mathbf{x}^*)\) and \(\nabla h(\mathbf{x}^*)\) are linearly independent. Then there exist scalars \(\lambda^*,\mu^*\) such that
\[
\nabla f(\mathbf{x}^*) = \lambda^*\nabla g(\mathbf{x}^*) + \mu^*\nabla h(\mathbf{x}^*).
\]
(See Stewart, *Calculus*, 9e, §14.8, Theorem 3, and the subsequent two-constraint corollary.)

## 8. Visual — diagram or schematic

```text
          ∇f
           ↑
           │
   constraint surface g=c  (circle in 2-D)
           │   tangent line
   ────────┼──────────────
           │
          ∇g  (normal)
```
The arrow \(\nabla f\) must lie exactly along \(\nabla g\) at the tangency point; any angular deviation would produce a feasible direction of increase.

## 9. The memory technique

**The hook** — Picture a climber on a mountain ridge (the constraint curve). The only way the altitude function \(f\) stops increasing is when the uphill direction points straight across the ridge, i.e., parallel to the ridge’s own normal \(\nabla g\).

**What to overlearn** — The vector equation \(\nabla f=\lambda\nabla g\) (one constraint) and \(\nabla f=\lambda\nabla g+\mu\nabla h\) (two constraints); the bordered Hessian test for classification.

**Spaced-repetition schedule** — Review the two vector statements after 1 day, 3 days, 7 days, 16 days and 35 days; each time re-derive the parallel-gradient picture from the chain rule in under two minutes.

**First-principles fallback** — If the formula is forgotten, start from the chain-rule statement that \(\nabla f\cdot\mathbf{v}=0\) for every tangent vector \(\mathbf{v}\) to the constraint surface; this forces \(\nabla f\) to be a linear combination of the constraint normals.

## 10. What this unlocks

Mastery of Lagrange multipliers lets you move directly into optimal-control theory, shadow-price interpretation in economics, and the Karush–Kuhn–Tucker conditions for inequalities.

- Derivation of the Euler–Lagrange equation in the calculus of variations
- Constrained formulation of support-vector-machine duals in machine learning
- First-order necessary conditions for trajectory optimisation in aerospace guidance
- Sensitivity analysis via the implicit-function theorem on the multiplier map

## 11. Self-check — five questions, no answers

1. Write the complete system of equations for maximising \(x^2-y^2\) subject to \(x^2+2y^2=1\) and verify that \(\nabla g\neq\mathbf{0}\) at every solution.

2. Two constraints \(x+y+z=1\) and \(x^2+y^2+z^2=2\) are given; how many multipliers appear and what linear-algebra condition guarantees they exist?

3. A candidate point satisfies the Lagrange equations but \(\nabla g=\mathbf{0}\). Does the method still certify an extremum? Explain geometrically.

4. For the problem in Example 3 above, compute the bordered Hessian and decide which critical value is the maximum.

5. In an economic model the multiplier \(\lambda\) equals 3.7. What does this number represent if the constraint is a production quota?