## 1. The one-sentence answer
**Critical points of a multivariable function \(f\) are the points where the gradient vanishes (or fails to exist), and they are classified as local minima, maxima, or saddles by examining the eigenvalues of the Hessian matrix at those points.**

A function \(f:\mathbb{R}^n\to\mathbb{R}\) changes most rapidly in the direction of its gradient vector. Setting that vector to the zero vector therefore locates the “flat spots” where the function may reach an extremum. In one variable this reduces to solving \(f'(x)=0\); in several variables the same idea becomes the simultaneous system of partial-derivative equations \(\partial f/\partial x_i=0\) for each coordinate.

The second-derivative test generalises via the Hessian. Its eigenvalues tell the curvature in every direction at once: all positive implies a local minimum, all negative a local maximum, and mixed signs a saddle. When an eigenvalue is zero the test is inconclusive and higher-order analysis is required.

> [!NOTE]
> The decisive geometric fact is that the Hessian quadratic form approximates the function’s deviation from its tangent hyperplane; the sign pattern of that quadratic form decides whether the graph lies above, below, or on both sides of the hyperplane near the critical point.

## 2. Why this matters — concrete and current
In training a neural network, the loss surface is a high-dimensional function whose critical points determine convergence of gradient-descent algorithms; companies such as OpenAI locate and classify these points to diagnose why certain architectures plateau.

Aerospace trajectory optimisation treats fuel consumption as a function of thrust-vector angles and atmospheric density; critical-point analysis on the resulting multivariable map yields the optimal ascent profile used by SpaceX Falcon 9 first-stage recovery.

Semiconductor process engineers minimise defect density over a parameter space of temperature, pressure, and dopant concentration; the Hessian test distinguishes stable operating windows from saddle points that produce runaway yield loss.

In general relativity, the effective potential for geodesic motion around a Kerr black hole possesses critical points whose classification reveals stable circular orbits; the second-derivative test directly supplies the innermost stable circular orbit radius observed by the Event Horizon Telescope.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Partial derivatives            | Gradient components are partial derivatives               |
| Multivariable chain rule       | Needed to compute directional derivatives and Hessians    |
| Taylor expansion in one variable | Supplies the local quadratic approximation underlying the second-derivative test |
| Eigenvalues of symmetric matrices | Curvature signs are the eigenvalues of the Hessian        |
| Quadratic forms                | The Hessian defines a quadratic form whose definiteness classifies the critical point |

## 4. Building the idea — from intuition to formalism

### Step 1 — The gradient points “uphill”
The gradient \(\nabla f\) at a point is the vector whose direction is the steepest ascent and whose magnitude is the rate of that ascent. Consequently any point where the gradient is nonzero cannot be a local extremum, because motion along \(\nabla f\) immediately increases \(f\).

Concrete example: \(f(x,y)=x^2+y^2\). At \((1,0)\) we have \(\nabla f=(2,0)\neq\mathbf{0}\), and moving right raises the value while moving left lowers it.

Formal statement: if \(\nabla f(\mathbf{a})\neq\mathbf{0}\), then there exists a direction \(\mathbf{u}\) such that the directional derivative \(D_{\mathbf{u}}f(\mathbf{a})>0\).

> [!WARNING]
> Forgetting that the gradient must be defined everywhere in a neighbourhood can lead to mistaking a cusp or corner for a critical point.

### Step 2 — Vanishing gradient locates candidate extrema
A point \(\mathbf{a}\) is called a critical point when either \(\nabla f(\mathbf{a})=\mathbf{0}\) or \(\nabla f\) fails to exist at \(\mathbf{a}\). Only these points can be local minima or maxima.

Formal statement: \(\mathbf{a}\) is critical if \(\nabla f(\mathbf{a})=\mathbf{0}\) or \(\mathbf{a}\) is not an interior point of the domain of differentiability.

### Step 3 — The Hessian supplies the quadratic approximation
Near a critical point the first-order term vanishes, so the Taylor expansion begins with the quadratic form
\[
f(\mathbf{a}+\mathbf{h})\approx f(\mathbf{a})+\frac12\mathbf{h}^T H_f(\mathbf{a})\mathbf{h}.
\]
The symmetric matrix \(H_f(\mathbf{a})\) of second partial derivatives therefore governs the local shape.

### Step 4 — Eigenvalues classify the quadratic form
A symmetric matrix is positive definite when all eigenvalues are positive, negative definite when all are negative, and indefinite when both signs appear. These three cases correspond to local minimum, local maximum, and saddle, respectively.

Formal statement: let \(\lambda_1,\dots,\lambda_n\) be the eigenvalues of \(H_f(\mathbf{a})\). Then \(\mathbf{a}\) is a strict local minimum if every \(\lambda_i>0\), a strict local maximum if every \(\lambda_i<0\), and a saddle if both positive and negative eigenvalues exist.

### Step 5 — The two-variable test via determinant
When \(n=2\) the eigenvalues share the sign of the trace and the product equals \(\det H\). The familiar test follows at once:
\[
D=\det H_f(a,b)=f_{xx}f_{yy}-(f_{xy})^2.
\]
If \(D>0\) and \(f_{xx}>0\) then local minimum; if \(D>0\) and \(f_{xx}<0\) then local maximum; if \(D<0\) then saddle.

### Step 6 — Textbook statement of the second-derivative test
Let \(f\) be twice continuously differentiable on an open set containing the critical point \(\mathbf{a}\). If the Hessian at \(\mathbf{a}\) is positive definite then \(\mathbf{a}\) is a strict local minimum; if negative definite then a strict local maximum; if indefinite then a saddle point. (Stewart, *Calculus*, 9e, §14.7, Theorem 3.)

## 5. Worked examples — every step shown

**Example 1 — Simple paraboloid**
- *Given:* \(f(x,y)=x^2+y^2\)
- *Find:* critical points and their nature.

Compute \(\nabla f=(2x,2y)\).  
*Why:* each component is a partial derivative.  
Set both components to zero: \(x=0\), \(y=0\). The only critical point is \((0,0)\).  
Hessian: \(H=\begin{pmatrix}2&0\\0&2\end{pmatrix}\). Eigenvalues are \(2,2>0\).  
*Why:* diagonal matrix makes eigenvalues immediate.  
Thus \((0,0)\) is a strict local minimum.

**Final answer**  
\((0,0)\) is a strict local minimum.

*Reflection:* The function is already its own quadratic approximation; the test is immediate.

**Example 2 — Saddle surface**
- *Given:* \(f(x,y)=x^2-y^2\)
- *Find:* classification of the origin.

\(\nabla f=(2x,-2y)=\mathbf{0}\) forces \(x=y=0\).  
Hessian \(H=\begin{pmatrix}2&0\\0&-2\end{pmatrix}\). Eigenvalues \(2,-2\) of opposite sign.  
Hence a saddle.

**Final answer**  
\((0,0)\) is a saddle point.

*Reflection:* Opposite curvature in orthogonal directions produces the classic saddle geometry.

**Example 3 — Degenerate case**
- *Given:* \(f(x,y)=x^4+y^4\)
- *Find:* nature of the critical point at the origin.

\(\nabla f=(4x^3,4y^3)=\mathbf{0}\) again yields only \((0,0)\).  
Hessian at origin is the zero matrix; test inconclusive.  
Higher-order terms \(x^4+y^4>0\) for \((x,y)\neq0\) show a minimum.

**Final answer**  
Strict local minimum, although Hessian test fails.

*Reflection:* Vanishing Hessian forces examination of the first non-vanishing homogeneous polynomial.

**Example 4 — Three variables**
- *Given:* \(f(x,y,z)=x^2+y^2+z^2+xy+xz\)
- *Find:* classification of the sole critical point.

\(\nabla f=(2x+y+x,2y+x,2z+x)=\mathbf{0}\) yields the linear system whose unique solution is the origin.  
Hessian
\[
H=\begin{pmatrix}3&1&1\\1&2&0\\1&0&2\end{pmatrix}.
\]
Characteristic polynomial \(\lambda^3-7\lambda^2+13\lambda-6=0\) has roots \(3,2,1>0\).  
Hence positive definite; local minimum.

**Final answer**  
Origin is a strict local minimum.

*Reflection:* Eigenvalue computation replaces the two-variable determinant test once dimension exceeds two.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating points where a partial fails to exist as automatically critical | Confusing “gradient undefined” with “gradient zero” | Check domain of differentiability first              |
| Using only the determinant sign without the trace or \(f_{xx}\) | Forgets that \(D>0\) still needs curvature sign     | Always inspect the sign of \(f_{xx}\) or trace       |
| Forgetting to solve the full system \(\nabla f=\mathbf{0}\) | Partial derivatives set to zero independently       | Write the vector equation explicitly                 |
| Assuming every critical point is an extremum | Overlooks saddles                                   | Always compute the full eigenvalue signature         |
| Applying the test at a boundary point | Hessian test requires an interior open neighbourhood | Restrict attention to interior critical points       |
| Neglecting higher-order terms when Hessian vanishes | Over-reliance on the second-derivative test         | Examine the lowest-degree non-zero homogeneous part  |
| Numerical round-off in eigenvalue computation | Floating-point matrices rarely have exact zero eigenvalues | Use exact arithmetic or rigorous interval arithmetic |

## 7. The textbook-precise statement
Let \(U\subset\mathbb{R}^n\) be open and let \(f:U\to\mathbb{R}\) be twice continuously differentiable. A point \(\mathbf{a}\in U\) is a critical point if \(\nabla f(\mathbf{a})=\mathbf{0}\). If the Hessian matrix \(H_f(\mathbf{a})\) is positive definite then \(\mathbf{a}\) is a strict local minimum of \(f\); if negative definite then a strict local maximum; if indefinite then a saddle point. When \(H_f(\mathbf{a})\) is singular the test is inconclusive. (Stewart, *Calculus*, 9e, §14.7.)

## 8. Visual — diagram or schematic
```text
          z
          |
          |   / saddle ridge
          |  /
          | /     local max
     local min   /
          |     /
----------+----+------ y
         /    /
        /    /
       /    local min
      /
     x
```
Axes labelled \(x,y,z\); three critical points shown: a paraboloid bowl (local min), a downward paraboloid (local max), and a hyperbolic paraboloid (saddle) whose level curves are a crossed pair of lines at the origin.

## 9. The memory technique
1. **The hook** — Picture a marble rolling on a sheet: it stops only where the sheet is perfectly horizontal (gradient zero); whether it rests in a valley, on a peak, or at a mountain pass is decided by whether the sheet curves up, down, or both ways (Hessian eigenvalues).

2. **What to overlearn**  
   - \(\nabla f=\mathbf{0}\) locates candidates.  
   - Eigenvalue signs of \(H_f\) classify.  
   - In two variables: \(D=f_{xx}f_{yy}-(f_{xy})^2\) together with sign of \(f_{xx}\).

3. **Spaced-repetition schedule** — Review definitions at 1 day, recompute a two-variable example at 3 days, classify a three-variable Hessian at 7 days, prove the second-derivative test from Taylor expansion at 16 days, and derive the degenerate-case fallback at 35 days.

4. **First-principles fallback** — Re-expand \(f(\mathbf{a}+\mathbf{h})\) to second order; the resulting quadratic form’s definiteness is settled by completing the square or computing its eigenvalues.

## 10. What this unlocks
Critical-point classification is the gateway to Lagrange multipliers, constrained optimisation, Morse theory, and the study of gradient flows. It also supplies the analytic foundation for the implicit-function theorem and for the stability analysis of equilibria in dynamical systems.

- Next: Lagrange multipliers for equality constraints  
- Next: Second-derivative test on manifolds  
- Next: Morse lemma and handle decompositions

## 11. Self-check — five questions, no answers
1. Find and classify all critical points of \(f(x,y)=x^3-3x+y^2\).

2. Show that \(f(x,y,z)=x^2+y^2+z^2+xyz\) has a single critical point and determine its nature.

3. Construct a \(C^\infty\) function whose Hessian vanishes at the origin yet the origin is a saddle.

4. Explain why the second-derivative test cannot be applied at a point on the boundary of the domain.

5. A symmetric \(3\times3\) matrix has eigenvalues \(2,0,-1\). What can be concluded about any critical point whose Hessian is similar to this matrix?