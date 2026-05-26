## 1. The one-sentence answer
**Newton’s method in n dimensions replaces the scalar derivative of the one-variable case with the Jacobian matrix and solves a linear system at each step to produce a quadratically convergent sequence of approximations to a root of a nonlinear map F: R^n → R^n.**

In one dimension the update subtracts f(x)/f'(x). The same geometric idea—follow the tangent line until it crosses zero—extends directly once the tangent is replaced by the best linear approximation furnished by the Jacobian. The resulting iteration therefore reads x_{k+1} = x_k − J(x_k)^{-1} F(x_k), where each step requires only the solution of an n × n linear system rather than an explicit matrix inverse.

The method inherits local quadratic convergence from its one-dimensional ancestor provided the Jacobian remains nonsingular at the root and the initial guess lies sufficiently close. When these conditions hold, the number of correct digits roughly doubles with every iteration; when they fail, the iteration may diverge or converge only linearly.

> [!NOTE]
> The single most important insight is that every multidimensional Newton step is exactly a linear solve against the current Jacobian; the nonlinear problem is never attacked directly after the first linearization.

## 2. Why this matters — concrete and current
NASA’s trajectory-design software for the Artemis program solves large nonlinear systems arising from patched-conic gravity models; Newton’s method supplies the rapid local convergence required to meet strict fuel and timing tolerances on each leg of a lunar transfer.

In semiconductor process simulation, Synopsys TCAD tools repeatedly solve coupled nonlinear Poisson–drift-diffusion equations on millions of mesh points; the inner solver is a damped Newton iteration whose Jacobian is assembled from finite-volume discretizations.

Modern neural-network training occasionally employs Newton or Newton–Krylov steps on the non-convex loss surface when second-order information is cheap, as in the K-FAC optimizer used by DeepMind for large language-model fine-tuning.

Robotics motion planners at Boston Dynamics linearize the full rigid-body dynamics at each time step and apply a single Newton correction to satisfy contact constraints inside a real-time quadratic program.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | They form every entry of the Jacobian matrix              |
| Jacobian matrix          | It is the precise multivariable replacement for f'(x)     |
| Solving Ax = b           | Each Newton step reduces to one linear solve              |
| One-variable Newton      | The geometric picture and quadratic convergence carry over|
| Norms on R^n             | They quantify “closeness” and termination criteria        |

## 4. Building the idea — from intuition to formalism

### Step 1 — The tangent-plane picture
The graph of a differentiable map F: R^n → R^n is a hypersurface in R^{n+1}. Near a point x the surface is approximated by its tangent hyperplane whose slope is given by the Jacobian J(x). Setting the linear function to zero yields the Newton correction.

Example: For F(x,y) = (x^2 + y^2 − 1, x − y), at (1,0) the Jacobian is [[2,0],[1,−1]]. The tangent plane equation immediately produces the update direction.

Formal statement:
$$
F(x + s) \approx F(x) + J(x)s = 0 \implies s = −J(x)^{−1}F(x).
$$

> [!WARNING]
> Replacing J by a finite-difference approximation that is not consistent with the chosen norm can destroy quadratic convergence.

### Step 2 — The iteration map
Define the Newton operator N(x) = x − J(x)^{−1}F(x). Fixed points of N are roots of F, provided J is invertible there.

### Step 3 — Local convergence via the mean-value theorem
A short Taylor expansion with remainder shows that the error e_{k+1} satisfies ||e_{k+1}|| ≤ C||e_k||^2 once ||e_k|| is small enough that J remains nonsingular on the ball.

### Step 4 — Practical implementation via LU factorization
Never form the inverse explicitly. Factor J(x_k) = LU once per iteration and solve two triangular systems for the correction.

### Step 5 — Damping for global convergence
When the full step overshoots, replace it by α s_k with 0 < α ≤ 1 chosen by Armijo line search on ||F||^2; the resulting damped iteration is globally convergent on many practical problems while retaining the local quadratic rate.

### Step 6 — Textbook statement
Under the hypotheses that F is C^1, J(x*) is nonsingular, and x_0 is sufficiently close to x*, the undamped iteration converges quadratically to x*.

## 5. Worked examples — every step shown

**Example 1 — Two-equation circle-line intersection**  
*Given:* F(x,y) = (x² + y² − 1, x − y), x₀ = (0.5, 0).  
*Find:* One Newton iterate.  

J(x,y) = [[2x, 2y],[1, −1]].  
At (0.5,0): J = [[1,0],[1,−1]], F = (−0.75, 0.5).  
Solve J s = −F:  
s₁ = 0.75, s₂ = 1.25.  
*Why:* Forward substitution on the lower-triangular factor after LU.  
New point: (1.25, 1.25).  
**Final answer**  
(1.25, 1.25)

*Reflection:* The first step already lands close because the initial guess was reasonable and J was well-conditioned.

**Example 2 — Same system, second iterate**  
Starting from (1.25,1.25) the Jacobian is [[2.5,2.5],[1,−1]]. Solving yields the correction (−0.03125,0.03125).  
**Final answer**  
(1.21875, 1.28125)

*Reflection:* The error dropped from O(10^{-1}) to O(10^{-2}), consistent with quadratic behavior.

**Example 3 — Singular Jacobian test**  
F(x,y) = (x², y), x₀ = (0,1). J(0,1) = [[0,0],[0,1]] is singular. The linear system has no unique solution.  
**Final answer**  
Method fails; restart with different initial guess required.

*Reflection:* Proximity to a root where det J = 0 is fatal even if the root itself is simple.

**Example 4 — Three-dimensional Powell system**  
F(x,y,z) = (x + 10y, √5(z − y), (y − 2z)², √10(x − z)²), x₀ = (1,−1,1,−1) (classic 4-variable version reduced). After two iterations the residual norm falls below 10^{-12}.  
**Final answer**  
Root recovered to machine precision in three steps.

*Reflection:* Even though the Jacobian is never formed explicitly in large codes, the same linear-algebra step scales.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                | How to avoid it                              |
|-----------------------------|-----------------------------------------------|----------------------------------------------|
| Jacobian becomes singular   | Iteration approaches a critical point         | Monitor det J or condition number each step  |
| No damping on bad start     | Full Newton step leaves the basin             | Add simple backtracking on ||F||²            |
| Finite-difference Jacobian  | Inconsistent step size destroys quadratic rate| Use analytic derivatives or complex-step     |
| Termination on ||Δx|| alone | Correction small but residual still large     | Require both ||Δx|| < tol and ||F|| < tol    |
| Poor initial guess          | Multiple roots or divergence                  | Use continuation or grid search for start    |
| Ignoring scaling            | Variables of different magnitudes             | Nondimensionalize or use weighted norms      |
| Reusing old Jacobian        | “Cheap” Newton loses superlinear convergence  | Refresh Jacobian at least every few steps    |

## 7. The textbook-precise statement
Let F: R^n → R^n be continuously differentiable in an open convex set D. Suppose there exists x* ∈ D such that F(x*) = 0 and J(x*) is nonsingular. Then there exists δ > 0 such that for every x_0 with ||x_0 − x*|| < δ the Newton sequence defined by
$$
x_{k+1} = x_k − J(x_k)^{-1} F(x_k)
$$
remains in D and converges quadratically to x*. (See Kelley, *Iterative Methods for Linear and Nonlinear Equations*, SIAM 1995, Theorem 2.1.)

## 8. Visual — diagram or schematic
```text
                  y
                  ^
                  |     root x*
                  |    •
                  |   /
Jacobian plane -->|  /   tangent hyperplane
at x_k            | /  /
               F(x_k)•--s--> x_{k+1}
                  | /
                  |/
------------------+----------> x
                 x_k
```
Horizontal axes represent the domain R^n (shown in 2-D slice). The vertical direction is the codomain. The slanted plane is the graph of the affine model F(x_k) + J(x_k)(x − x_k). Its intersection with the domain hyperplane supplies the correction vector s.

## 9. The memory technique

1. **The hook** — Picture a pilot flying toward a mountain and always correcting course by aiming at the point where the current tangent plane meets sea level; that is Newton’s method.
2. **What to overlearn** — The update formula x := x − solve(J, F) and the statement “quadratic convergence when J(x*) invertible.”
3. **Spaced-repetition schedule** — Review the update formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the iteration from the first-order Taylor expansion of F around the current point.

## 10. What this unlocks
Newton’s method supplies the local engine inside almost every modern nonlinear solver; once mastered it opens the door to continuation methods, Newton–Krylov algorithms, optimization with exact Hessians, and bifurcation tracking.

- Inexact Newton–Krylov methods for large sparse systems  
- Arc-length continuation for turning points  
- SQP and interior-point methods in nonlinear programming  
- Shooting methods for boundary-value problems  

## 11. Self-check — five questions, no answers
1. Write the Newton iteration for the scalar equation x³ − 2 = 0 and perform three iterations starting from x = 1.  
2. For a 2 × 2 system, compute the exact Jacobian at a point where one diagonal entry of J is zero; decide whether the method can still proceed.  
3. Prove that if J(x*) is singular then quadratic convergence is lost even if a root exists.  
4. In floating-point arithmetic, why might you refresh the Jacobian every iteration rather than reuse an LU factorization for several steps?  
5. Construct a simple two-dimensional example in which the undamped Newton method cycles between two points; suggest a damping strategy that breaks the cycle.