## 1. The one-sentence answer
**The second derivative test classifies a critical point of a twice-differentiable function \(f:\mathbb{R}^n\to\mathbb{R}\) by examining the eigenvalues of the Hessian matrix, or equivalently (in two variables) the sign of its determinant.**

A critical point occurs where the gradient vanishes. The first derivatives alone cannot distinguish whether the function rises, falls, or changes direction around that point. The second derivatives supply the local curvature information. When the Hessian is positive definite, every direction curves upward and the point is a local minimum; when negative definite, a local maximum; when the eigenvalues have mixed signs, a saddle appears.

In two variables the definiteness test reduces to a single scalar: the Hessian determinant. Its sign together with the sign of one second partial immediately yields the classification without computing eigenvalues explicitly. The test fails precisely when the Hessian is singular, leaving the nature of the critical point undecided by second-order information alone.

> [!NOTE]
> The Hessian determinant is not itself a curvature; it is the product of the two principal curvatures. Its sign therefore detects whether the curvatures have the same sign (extremum) or opposite signs (saddle).

## 2. Why this matters — concrete and current
In aerospace trajectory optimization, SpaceX’s Falcon 9 guidance algorithms evaluate the Hessian of the fuel-consumption objective at each candidate thrust vector; a positive-definite Hessian confirms a locally optimal burn schedule before the trajectory is uploaded to the flight computer.

In semiconductor process control, TSMC uses the Hessian test inside nonlinear least-squares fits of transistor threshold-voltage models; a negative Hessian determinant flags saddle points that would otherwise produce unstable parameter estimates across wafer lots.

Machine-learning researchers at DeepMind apply the same test to the loss landscape of transformer models during hyperparameter search; when the Hessian determinant changes sign, training is halted and the learning-rate schedule is adjusted to escape the detected saddle.

In fundamental physics, lattice QCD collaborations at CERN compute the Hessian of the effective potential for the Higgs field; the sign of its determinant distinguishes the physical vacuum from unphysical metastable states in beyond-Standard-Model scenarios.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | The Hessian is built from them; without fluency the matrix cannot be formed. |
| Gradient and critical points | The test applies only where \(\nabla f=0\); elsewhere the first-order behavior already decides monotonicity. |
| Quadratic forms and definiteness | The sign pattern of the Hessian eigenvalues is exactly the definiteness of the second-order Taylor term. |
| Taylor expansion in several variables | The test is the multivariable analogue of the single-variable second-derivative test derived from the quadratic term. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Curvature is encoded by the quadratic term
Near an isolated critical point the linear term vanishes, so the local shape is governed by the quadratic part of the Taylor expansion.  
Consider \(f(x,y)=x^2+y^2\) at the origin. The surface is a paraboloid opening upward.  
The second-order Taylor polynomial is
\[
\frac12\begin{pmatrix}x&y\end{pmatrix}
\begin{pmatrix}
f_{xx}&f_{xy}\\
f_{yx}&f_{yy}
\end{pmatrix}
\begin{pmatrix}x\\y
\end{pmatrix}.
\]
> [!WARNING]
> If the linear term is mistakenly retained, the test will be applied at a non-critical point and will give meaningless results.

### Step 2 — The Hessian matrix assembles all second partials
Differentiate the gradient once more to obtain the symmetric matrix of second derivatives:
\[
H_f=\begin{pmatrix}
f_{xx}&f_{xy}\\
f_{yx}&f_{yy}
\end{pmatrix}.
\]
Symmetry follows at once from equality of mixed partials when they are continuous.

### Step 3 — Eigenvalues of the Hessian decide definiteness
The quadratic form is positive definite precisely when both eigenvalues of \(H_f\) are positive. In that case every direction curves upward and a local minimum occurs.

### Step 4 — In two variables the eigenvalue test reduces to the determinant
Let \(\lambda_1,\lambda_2\) be the eigenvalues. Then
\[
\lambda_1\lambda_2=\det H_f,\qquad\lambda_1+\lambda_2=\operatorname{tr}H_f.
\]
Both eigenvalues positive if and only if \(\det H_f>0\) and \(\operatorname{tr}H_f>0\) (or equivalently \(f_{xx}>0\)).

### Step 5 — Sign chart yields the classical test
- \(\det H_f>0\) and \(f_{xx}>0\): local minimum,  
- \(\det H_f>0\) and \(f_{xx}<0\): local maximum,  
- \(\det H_f<0\): saddle point,  
- \(\det H_f=0\): test inconclusive.

### Step 6 — The same logic extends to \(n\) variables
Compute the Hessian, test the signs of its leading principal minors (Sylvester’s criterion), or compute its eigenvalues. The two-variable determinant rule is the \(n=2\) case of this general procedure.

## 5. Worked examples — every step shown

**Example 1 — Simple paraboloid**  
*Given:* \(f(x,y)=x^2+y^2+3\).  
*Find:* Classify the critical point at the origin.  

Compute first partials:
\[
f_x=2x,\quad f_y=2y.
\]
Set to zero: only solution \((0,0)\).  
Second partials:
\[
f_{xx}=2,\quad f_{xy}=0,\quad f_{yy}=2.
\]
Hessian determinant:
\[
H=2\cdot2-0^2=4>0,\quad f_{xx}=2>0.
\]
Local minimum.  
**Final answer**  
Local minimum at \((0,0)\).  

*Reflection* The example is trivial yet shows every algebraic step; the same arithmetic appears unchanged inside every later example.

**Example 2 — Saddle surface**  
*Given:* \(f(x,y)=x^2-y^2\).  
*Find:* Nature of the origin.  

Critical point: \((0,0)\).  
Second partials: \(f_{xx}=2\), \(f_{yy}=-2\), \(f_{xy}=0\).  
\[
H=2\cdot(-2)-0=-4<0.
\]
Saddle point.  
**Final answer**  
Saddle at \((0,0)\).  

*Reflection* The sign change of \(H\) is the only new information needed; no further derivatives are required.

**Example 3 — Borderline case**  
*Given:* \(f(x,y)=x^4-y^4\).  
*Find:* Status of the origin.  

Critical point: \((0,0)\).  
Second partials at origin: all zero, so \(H=0\).  
Test inconclusive. (Higher-order terms decide: saddle.)  
**Final answer**  
Inconclusive; examine fourth-order terms.  

*Reflection* Zero determinant forces the student to leave the second-derivative regime.

**Example 4 — Non-polynomial function**  
*Given:* \(f(x,y)=e^{x^2+y^2}\).  
*Find:* Classification at origin.  

Gradient vanishes only at \((0,0)\).  
Second partials: \(f_{xx}=2e^{x^2+y^2}\), likewise \(f_{yy}\), \(f_{xy}=0\).  
At origin: \(H=4>0\), \(f_{xx}=2>0\).  
Local minimum.  
**Final answer**  
Local minimum at \((0,0)\).  

*Reflection* The exponential factor never changes sign, so the test reduces to the quadratic case.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to verify the point is critical before computing \(H\) | Students compute the determinant everywhere and misinterpret signs | Always solve \(\nabla f=0\) first; record the coordinates. |
| Using \(f_{yy}\) instead of \(f_{xx}\) when the trace test is ambiguous | The classical statement privileges \(f_{xx}\); swapping yields the opposite conclusion if signs differ | Choose whichever second partial is nonzero; if both zero then \(H=0\). |
| Treating \(H=0\) as “no information” rather than “test fails” | Over-generalisation from single-variable calculus | Explicitly state “higher-order test required.” |
| Ignoring symmetry of mixed partials | Numerical or symbolic differentiation errors | Verify \(f_{xy}=f_{yx}\) at the point. |
| Applying the test to a non-twice-differentiable function | The Hessian is assumed to exist and be continuous | Check \(C^2\) regularity in a neighbourhood. |
| Confusing the Hessian determinant with the Jacobian determinant | Notation overlap in some texts | Keep separate symbols: \(\det H_f\) versus \(\det Df\). |
| Assuming a positive determinant implies a minimum without checking trace or \(f_{xx}\) | Forgetting the two-eigenvalue condition | Always perform the two-part test: \(H>0\) and \(f_{xx}>0\). |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}^2\to\mathbb{R}\) be twice continuously differentiable in a neighbourhood of a critical point \((a,b)\) where \(\nabla f(a,b)=0\). Let
\[
H=\det\begin{pmatrix}f_{xx}(a,b)&f_{xy}(a,b)\\f_{yx}(a,b)&f_{yy}(a,b)\end{pmatrix}.
\]
If \(H>0\) and \(f_{xx}(a,b)>0\), then \(f\) has a strict local minimum at \((a,b)\).  
If \(H>0\) and \(f_{xx}(a,b)<0\), then a strict local maximum.  
If \(H<0\), then a saddle point.  
If \(H=0\), the test is inconclusive.  
(Stewart, *Calculus*, 9e, §14.7, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          z
          ↑
          │     local max  (H>0, f_xx<0)
          │        •
          │       / \
          │      /   \
----------│-----/----- \------→ y
          │    /       \
          │   /  saddle  \     (H<0)
          │  /   (H=0)    \
          │ /               \
local min │•                 •
(H>0,f_xx>0)
```
The diagram shows the three non-degenerate cases along a slice; the Hessian determinant distinguishes the curvature signs at each labelled point.

## 9. The memory technique
1. **The hook** — Picture the Hessian determinant as a tiny “traffic light” sitting at the critical point: green (positive) with an upward arrow means minimum; green with downward arrow means maximum; red (negative) means saddle; off (zero) means “look elsewhere.”  
2. **What to overlearn** — The exact two-line decision table: \(H>0\) and \(f_{xx}>0\) → min; \(H<0\) → saddle.  
3. **Spaced-repetition schedule** — Review the decision table at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the test from the quadratic Taylor polynomial by completing the square or computing the eigenvalues of the \(2\times2\) matrix.

## 10. What this unlocks
The second-derivative test is the gateway to Morse theory, constrained optimisation via bordered Hessians, and the analysis of loss landscapes in deep learning. It also supplies the local ingredient for the inverse-function theorem and the Morse lemma, which classify generic singularities of smooth maps.

- Lagrange-multiplier second-order conditions  
- Newton’s method in several variables (Hessian as iteration matrix)  
- Index theory of critical points on manifolds  

## 11. Self-check — five questions, no answers
1. Compute the Hessian determinant of \(f(x,y)=x^3-3xy^2\) at the origin and state the conclusion of the test.  
2. Give an example of a \(C^\infty\) function whose Hessian vanishes at a local minimum.  
3. Explain why the test cannot be applied at a point where \(f_{xy}\) fails to equal \(f_{yx}\).  
4. For the function \(f(x,y)=\cos x+\cos y\), locate all critical points inside \([0,2\pi]^2\) and classify each using the Hessian test.  
5. Prove that if \(\det H_f(a,b)<0\) then the level set \(f(x,y)=f(a,b)\) cannot be a smooth curve in any neighbourhood of \((a,b)\).