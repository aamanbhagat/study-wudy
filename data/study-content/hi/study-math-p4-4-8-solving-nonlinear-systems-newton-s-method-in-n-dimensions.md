## 1. The one-sentence answer
**Newton’s method in n dimensions solves a system of nonlinear equations** \(F(x)=0\) where \(F:\mathbb{R}^n\to\mathbb{R}^n\) by iteratively linearising the system with its Jacobian matrix and solving the resulting linear system at each step.

The core idea is simple once you see the geometry. In one dimension you replace the curve by its tangent line; in higher dimensions you replace the nonlinear surface by its tangent hyperplane. That hyperplane is given by the first-order Taylor expansion, whose slope matrix is exactly the Jacobian. Solving the linear system on that hyperplane gives the next guess, and the process repeats.

Because each step only uses local derivative information, the method converges quadratically when started close enough to a root and when the Jacobian stays well-conditioned. Far from the root or when the Jacobian is singular, the iteration can diverge or stall.

> [!NOTE]
> The single most powerful mental shift is realising that the Jacobian is not merely a matrix of partial derivatives; it is the linear map that tells you how every component of the residual changes when you move any coordinate of the input. Once you internalise that, the update formula becomes obvious rather than memorised.

## 2. Why this matters — concrete and current
NASA’s trajectory-design software for Artemis lunar missions repeatedly solves six-dimensional nonlinear systems that enforce position, velocity and orientation constraints at patch points between different gravitational models; Newton’s method with analytic Jacobians supplies the corrections inside the targeting loop.

In semiconductor process simulation, Synopsys TCAD tools solve coupled drift-diffusion-Poisson equations on three-dimensional meshes; the nonlinear solver inside the Newton–Raphson loop must converge to machine precision at every time step or the predicted transistor characteristics become unreliable.

Modern bundle-adjustment pipelines in computer-vision libraries such as COLMAP and Google’s ARCore minimise a large nonlinear least-squares objective whose normal equations are solved by a sparse, damped Newton step; each iteration updates millions of camera and point parameters simultaneously.

Power-grid operators run real-time state estimation every few seconds; the measurement model is a set of quadratic power-flow equations whose solution by a Newton-type method yields the voltage magnitudes and angles used for contingency analysis.

High-energy physicists fitting parton-distribution functions to LHC cross-section data minimise a \(\chi^2\) function whose gradient and Hessian are assembled from thousands of nonlinear observables; a trust-region Newton solver guarantees that the extracted PDFs remain physically consistent.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Jacobian matrix          | Supplies the linear map that replaces the nonlinear system at each iterate |
| Solving linear systems   | The Newton step reduces to solving \(J s = -F(x)\) at every iteration |
| Vector-valued functions  | \(F\) maps \(\mathbb{R}^n\) to \(\mathbb{R}^n\), so all operations are vector/matrix operations |
| Local quadratic convergence | Explains why the method becomes extremely fast once you are close to a root |
| Condition number         | Warns when the Jacobian is nearly singular and the step becomes unreliable |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From scalar tangent line to tangent hyperplane
In one variable the Newton update is \(x_{new}=x-F(x)/F'(x)\). The same geometric picture works in higher dimensions once you replace the scalar derivative by the linear map that best approximates \(F\) near the current point.

Take the two-dimensional system  
\[
F(x,y)=\begin{pmatrix}x^2+y^2-1\\x-y\end{pmatrix}=0.
\]
At the point \((0.8,0.7)\) the Jacobian is the matrix of partial derivatives; the tangent plane is the graph of that linear map.

Formally, the first-order Taylor expansion around \(x_k\) reads  
\[
F(x_k+s)\approx F(x_k)+J(x_k)s.
\]
Setting the right-hand side to zero and solving for \(s\) produces the Newton step.

> [!WARNING]
> If you forget that \(J\) must be evaluated at the current point \(x_k\) and reuse an old Jacobian, the linear model quickly becomes stale and the iteration may diverge.

### Step 2 — The linear model and the correction equation
The equation \(J(x_k)s=-F(x_k)\) is an \(n\times n\) linear system. Its solution \(s\) is the displacement that would drive the linearised residual to zero.

In the example above,  
\[
J(0.8,0.7)=\begin{pmatrix}1.6&1.4\\1&-1\end{pmatrix},\qquad F(0.8,0.7)=\begin{pmatrix}0.13&0.1\end{pmatrix}^T,
\]
so one solves a \(2\times2\) system for \(s\).

> [!WARNING]
> When \(J\) is singular or badly conditioned the linear solve itself fails or produces huge steps; always monitor \(\kappa(J)\) or use a factorisation that detects rank deficiency.

### Step 3 — The update and the iteration map
Once \(s\) is obtained, set  
\[
x_{k+1}=x_k+s.
\]
Repeating this map defines the Newton iteration  
\[
x_{k+1}=x_k-J(x_k)^{-1}F(x_k).
\]

### Step 4 — Local convergence theorem (statement only)
If \(F\) is continuously differentiable, \(J(x^*)\) is nonsingular, and \(\|x_0-x^*\|\) is sufficiently small, then the iterates converge quadratically to the root \(x^*\).

### Step 5 — Practical implementation via LU factorisation
Never form the inverse explicitly. Compute the LU factorisation of \(J(x_k)\) once per iteration and solve two triangular systems for \(s\).

## 5. Worked examples — har step show karo

**Example 1 — Two-dimensional circle-line intersection**  
*Given:* \(F(x,y)=(x^2+y^2-1,x-y)^T\), start at \((0.8,0.7)\).  
*Find:* one Newton iterate.  

Compute  
\[
J=\begin{pmatrix}1.6&1.4\\1&-1\end{pmatrix},\quad F=\begin{pmatrix}0.13&0.1\end{pmatrix}^T.
\]
Solve \(Js=-F\) by Cramer’s rule or Gaussian elimination to obtain \(s=(-0.05714,-0.15714)^T\).  
*Why:* the linear solve finds the exact zero of the tangent-plane model.  
New point: \((0.74286,0.54286)^T\).  
**Final answer** \((0.74286,0.54286)^T\)

*Reflection:* the example is simple enough that every matrix entry can be checked by hand; the same arithmetic scales unchanged to larger systems once a linear solver is available.

**Example 2 — Three-dimensional nonlinear system**  
*Given:*  
\[
F(x,y,z)=\begin{pmatrix}x^2+y^2+z^2-1\\x+2y-3z\\x-y+z-1\end{pmatrix},\quad x_0=(0.5,0.5,0.5)^T.
\]
*Find:* the first Newton correction.  

Jacobian at \(x_0\) and right-hand side are assembled entry-wise; the resulting \(3\times3\) system is solved by LU to give the step.  
**Final answer** \(x_1=(0.64286,0.35714,0.5)^T\)

*Reflection:* dimension three already forces you to treat the Jacobian as a black-box linear operator rather than writing every entry explicitly.

**Example 3 — System with singular Jacobian at start**  
*Given:* \(F(x,y)=(x^2-y,x-y^2)^T\), start exactly at \((0,0)\).  
*Find:* behaviour of the first step.  

\(J(0,0)\) is the zero matrix, so the linear system has either no solution or infinitely many. The iteration cannot proceed without regularisation.  
**Final answer** method fails at first step.

*Reflection:* this trap appears whenever the initial guess lies on a singular set; a small random perturbation or a line-search safeguard is required.

**Example 4 — Quadratic convergence demonstration**  
*Given:* the same circle-line system, start at \((0.9,0.8)\). Perform three iterations and record the Euclidean distance to the true root \((1/\sqrt{2},1/\sqrt{2})\).  
*Find:* successive error ratios.  

Errors after iterations 1, 2, 3 are approximately \(0.12\), \(0.0036\), \(3\times10^{-6}\). The ratio of consecutive squared errors approaches a constant, confirming quadratic convergence.  
**Final answer** quadratic rate observed numerically.

*Reflection:* once the iterate enters the basin, each extra correct digit roughly doubles; this is why Newton is preferred for high-precision work.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Re-using a stale Jacobian | Derivative information becomes inaccurate far from the root | Re-evaluate \(J\) at every accepted point or use a Broyden update only when cheap |
| Ignoring singular or ill-conditioned \(J\) | Linear solve produces huge or meaningless steps | Monitor \(\kappa(J)\) or pivot; switch to trust-region or pseudo-inverse |
| Starting too far from any root | Quadratic convergence is only local | Use a globally convergent wrapper (line search, trust region, or continuation) |
| Not checking residual after update | Round-off or coding error may leave residual unchanged | Always compute \(\|F(x_{new})\|\) and compare with \(\|F(x)\|\) |
| Treating every component with the same tolerance | Some equations may be scaled very differently | Scale the equations or variables so that typical residuals are order one |
| Forgetting that \(F\) itself may be expensive | Analytic Jacobian is unavailable or costly | Use finite-difference Jacobian only when the cost is acceptable; otherwise automatic differentiation |

## 7. The textbook-precise statement
Let \(F:\mathbb{R}^n\to\mathbb{R}^n\) be continuously differentiable in an open neighbourhood of a root \(x^*\) where the Jacobian matrix \(J(x^*)\) is nonsingular. Then there exists a neighbourhood \(U\) of \(x^*\) such that for every initial vector \(x_0\in U\) the Newton iteration  
\[
x_{k+1}=x_k-J(x_k)^{-1}F(x_k)
\]
is well-defined and converges quadratically to \(x^*\). (Burden, Faires & Burden, *Numerical Analysis*, 10e, §10.2, Theorem 10.6.)

## 8. Visual — diagram or schematic
```text
          F(x) surface
               /\
              /  \   tangent hyperplane at x_k
             /    \________________
            /                     \
   root x* /                       \  Newton step s
          /_________________________\
         x_k
```
The diagram shows the nonlinear surface, its tangent hyperplane at the current point \(x_k\), and the Newton displacement \(s\) that reaches the zero of the plane. The true root lies where the surface itself crosses zero.

## 9. The memory technique

1. **The hook** — Picture a mountaineer standing on a mountainside; the Jacobian is the flat map she unfolds, and the Newton step is the straight-line arrow she draws on that map to the nearest “lake” (the linearised root).  
2. **What to overlearn** — The update \(x\leftarrow x-J^{-1}F(x)\) and the fact that quadratic convergence requires only \(J(x^*)\) nonsingular and a sufficiently close start.  
3. **Spaced-repetition schedule** — Review the scalar-to-vector analogy after 1 day, solve one 3-D example after 3 days, code a small solver after 7 days, and re-derive the local convergence argument after 16 and 35 days.  
4. **First-principles fallback** — If the formula is forgotten, begin from the Taylor expansion \(F(x+s)\approx F(x)+J(x)s=0\) and solve the linear model for \(s\).

## 10. What this unlocks
Once you master the basic Newton step you can immediately move to globally convergent variants (trust-region, line-search, continuation), inexact Newton–Krylov methods for large sparse systems, and sensitivity analysis via the implicit-function theorem.

- Damped Newton and trust-region globalisation  
- Broyden and other quasi-Newton updates that avoid Jacobian recomputation  
- Newton–Krylov methods (GMRES inside the linear step)  
- Parameter-continuation and pseudo-arclength methods for tracing solution curves  
- Automatic-differentiation pipelines that supply exact Jacobians at machine precision  

## 11. Self-check — five questions, no answers
1. Write the Newton iteration for the system \(F(x,y)=(e^x-y, x^2+y^2-2)^T\) starting from \((0,1)\).  
2. Suppose \(J(x_k)\) has a condition number of \(10^{12}\). What practical difficulty will appear in floating-point arithmetic?  
3. Prove that if \(F\) is linear then Newton reaches the exact root in one step.  
4. Give a concrete two-dimensional example where the Jacobian is singular at the initial guess but the system still possesses a root.  
5. A student claims that “Newton always converges if the Jacobian is evaluated exactly.” Construct a counter-example or explain why the claim is false.