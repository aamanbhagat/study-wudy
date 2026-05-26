## 1. The one-sentence answer
**Critical points of a multivariable function \(f\) are the solutions to \(\nabla f = 0\), and they are classified by examining the eigenvalues of the Hessian matrix at those points.**

A critical point occurs wherever every first partial derivative is simultaneously zero. This means the tangent plane is horizontal, so the function is neither increasing nor decreasing in any direction at that instant. In one variable we only check the sign of \(f''\), but here the second-derivative information lives in a matrix whose eigenvalues tell us whether the surface bends upward, downward, or in mixed directions.

The classification is local: a point may look like a minimum along one slice and a maximum along another. The Hessian test converts that geometric picture into a linear-algebra question—positive-definite, negative-definite, or indefinite—without needing to examine every possible direction by hand.

> [!NOTE]
> The single deepest insight is that the gradient condition \(\nabla f = \mathbf{0}\) only locates candidates; the Hessian supplies the curvature verdict that actually decides the nature of each candidate.

## 2. Why this matters — concrete and current
In aerospace trajectory optimization, SpaceX’s guidance algorithms repeatedly solve for critical points of a fuel-consumption functional whose variables are thrust-vector angles and staging times; the Hessian test confirms that the computed burn schedule is a true local minimum rather than a saddle that would waste propellant.

Semiconductor process engineers at TSMC minimize etch-rate non-uniformity over a wafer by treating the rate as a function of gas-flow rates and temperature gradients; critical-point analysis locates the operating set-point that yields the flattest profile, directly affecting chip yield.

In machine-learning training, the loss surface of a ResNet is a function of millions of weights. Practitioners locate and classify critical points to distinguish benign flat minima (good generalization) from sharp saddles that produce brittle models; recent papers from DeepMind use the Hessian spectrum exactly for this purpose.

Meteorologists running ensemble weather models treat sea-level pressure as a scalar field on the sphere; critical points mark the centers of highs and lows, and the Hessian eigenvalues distinguish stable anticyclones from transient troughs that evolve rapidly.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Partial derivatives  | They form every entry of the gradient and Hessian         |
| Gradient vector      | Setting it to zero is the defining equation for critical points |
| Hessian matrix       | Its eigenvalues decide the second-derivative test         |
| Eigenvalues & definiteness | Positive/negative/indefinite tells min/max/saddle       |
| Taylor expansion in several variables | Supplies the local quadratic approximation used in classification |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The gradient must vanish
A surface has a horizontal tangent plane precisely when every directional derivative is zero. In coordinates this is the vector equation \(\nabla f = \mathbf{0}\).

Example: \(f(x,y)=x^2+y^2\). Then \(\nabla f=(2x,2y)\). Setting both components to zero forces \(x=0,y=0\).

Formally,
\[
\nabla f(\mathbf{x})=\mathbf{0}.
\]

> [!WARNING]
> If you forget that every component must be zero simultaneously, you will report lines or curves instead of isolated points.

### Step 2 — The Hessian encodes curvature
Differentiate the gradient once more to obtain the symmetric matrix of second partials:
\[
H_f=\begin{pmatrix}f_{xx}&f_{xy}\\f_{yx}&f_{yy}\end{pmatrix}.
\]

At a critical point the quadratic form \(\mathbf{v}^T H_f\mathbf{v}\) approximates the change in \(f\).

### Step 3 — Eigenvalue test for definiteness
Compute the eigenvalues \(\lambda_1,\lambda_2\) of \(H_f\).

- Both \(\lambda>0\): positive definite → local minimum.  
- Both \(\lambda<0\): negative definite → local maximum.  
- Mixed signs: indefinite → saddle.

### Step 4 — Degenerate case when determinant is zero
If \(\det H_f=0\), at least one eigenvalue is zero. The quadratic test is inconclusive; higher-order terms or directional slices must be examined.

### Step 5 — Textbook classification theorem
The statements above are collected into a single rigorous test (see §7).

## 5. Worked examples — har step show karo

**Example 1 — Simple paraboloid**  
*Given:* \(f(x,y)=x^2+y^2+3\).  
*Find:* critical points and their nature.  

Compute \(\nabla f=(2x,2y)= (0,0)\) → \((0,0)\).  
Hessian \(H=\begin{pmatrix}2&0\\0&2\end{pmatrix}\), eigenvalues 2,2 both positive.  
**Local minimum at (0,0).**  
*Why:* each partial had to be solved simultaneously; eigenvalues immediately gave definiteness.

**Example 2 — Saddle**  
*Given:* \(f(x,y)=x^2-y^2\).  
*Find:* classification at origin.  

\(\nabla f=(2x,-2y)=(0,0)\) → origin.  
\(H=\begin{pmatrix}2&0\\0&-2\end{pmatrix}\), eigenvalues +2 and –2.  
**Saddle point.**  
*Why:* opposite signs of eigenvalues prove the function rises in x-direction and falls in y-direction.

**Example 3 — Constrained-looking but unconstrained**  
*Given:* \(f(x,y)=x^3-3x+y^2\).  
*Find:* all critical points and classify.  

\(\nabla f=(3x^2-3,2y)=(0,0)\) → \(x=\pm1\), \(y=0\).  
At (1,0): \(H=\begin{pmatrix}6&0\\0&2\end{pmatrix}\), both eigenvalues positive → local min.  
At (–1,0): \(H=\begin{pmatrix}-6&0\\0&2\end{pmatrix}\), eigenvalues opposite → saddle.  
**Two critical points: local min at (1,0), saddle at (–1,0).**  
*Why:* cubic term produced two distinct roots; Hessian evaluated separately at each.

**Example 4 — Degenerate case**  
*Given:* \(f(x,y)=x^4-y^4\).  
*Find:* nature at origin.  

\(\nabla f=(4x^3,-4y^3)=(0,0)\) → origin.  
\(H=\begin{pmatrix}0&0\\0&0\end{pmatrix}\), det=0.  
Test inconclusive. Slice along y=0: \(f(x,0)=x^4\ge0\); along x=0: \(f(0,y)=-y^4\le0\).  
**Origin is a saddle (higher-order test needed).**  
*Why:* zero eigenvalues forced us to examine fourth-order terms along axes.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting only one partial to zero | Students treat variables independently | Always solve the full system \(\nabla f=\mathbf{0}\) simultaneously |
| Forgetting symmetry of Hessian | Mixed partials look different at first glance | Compute \(f_{xy}\) and \(f_{yx}\) separately then verify equality |
| Declaring minimum when det>0 but trace<0 | Sign of eigenvalues missed | Always compute eigenvalues or check both trace and det |
| Ignoring boundary or domain | Critical points inside open set only | State domain explicitly before searching |
| Using first-derivative test on multivariable | One-variable habit | Never use sign charts; switch to Hessian immediately |
| Assuming non-degenerate when det=0 | Over-confidence in quadratic test | Check det first; if zero, examine higher-order terms |
| Numerical round-off in eigenvalues | Floating-point matrices | Use exact arithmetic or high-precision libraries for classification |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}^n\to\mathbb{R}\) be twice continuously differentiable on an open set \(U\). A point \(\mathbf{a}\in U\) is a critical point if \(\nabla f(\mathbf{a})=\mathbf{0}\). Let \(H_f(\mathbf{a})\) be the Hessian matrix at \(\mathbf{a}\). If \(H_f(\mathbf{a})\) is positive definite then \(\mathbf{a}\) is a strict local minimum; if negative definite then a strict local maximum; if indefinite then a saddle. If \(\det H_f(\mathbf{a})=0\) the test is inconclusive. (Stewart, *Calculus*, 9e, §14.7, Theorem 3.)

## 8. Visual — diagram or schematic
```
y
↑
|     / saddle ridge
|    /     • (0,0) saddle
|   /     /     \
|  /     /       \
| /     /         \
|/     /           \
+-----•-------------•----→ x
      local min     local max (along other slice)
```
Horizontal plane at height f(0,0); surface rises along x-axis, falls along y-axis, forming classic saddle geometry.

## 9. The memory technique
1. **The hook** — Picture a marble at the critical point: if the Hessian eigenvalues are both positive the marble rolls back (bowl); both negative it falls away (hilltop); opposite signs it rolls off in one direction and climbs in the other (saddle).
2. **What to overlearn** — \(\nabla f=\mathbf{0}\) locates; eigenvalues of \(H\) classify; det\(H>0\) and trace\(H>0\) together imply local min.
3. **Spaced-repetition schedule** — Review the three eigenvalue cases after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the second-order Taylor expansion \(f(\mathbf{a}+\mathbf{h})\approx f(\mathbf{a})+\frac12\mathbf{h}^TH\mathbf{h}\) and examine the quadratic form directly.

## 10. What this unlocks
Mastery of critical-point classification lets you proceed to constrained optimization via Lagrange multipliers, stability analysis of autonomous systems, and the study of Morse theory.

- Next topics: Lagrange multipliers, second-derivative test on manifolds, Morse lemma.
- Techniques unlocked: Newton’s method in several variables, trust-region methods in optimization, curvature-based mesh refinement in FEM.

## 11. Self-check — five questions, no answers
1. Find and classify all critical points of \(f(x,y)=x^2+xy+y^2+2x-3y\).
2. For which values of \(a\) does \(f(x,y)=x^3+ax y^2\) have a non-degenerate critical point at the origin?
3. Construct a \(C^\infty\) function whose Hessian at (0,0) is the zero matrix yet the origin is a local minimum.
4. A symmetric 3×3 matrix has eigenvalues 2, –1, 0. What can be said about the corresponding critical point?
5. Why does the test fail when the Hessian is singular, and what geometric feature appears in that case?