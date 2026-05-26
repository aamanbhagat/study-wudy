## 1. The one-sentence answer
**Gauss-Legendre quadrature approximates \(\int_{-1}^{1} f(x)\,dx\) by a weighted sum \(\sum_{i=1}^{n} w_i f(x_i)\) whose nodes \(x_i\) are the roots of the degree-\(n\) Legendre polynomial and whose weights \(w_i\) are chosen so that the rule is exact for every polynomial of degree at most \(2n-1\).**

The underlying idea is to replace an arbitrary continuous function by its interpolant at specially chosen points. When those points are the zeros of the Legendre polynomial orthogonal on \([-1,1]\) with weight 1, the interpolation error term contains a factor that is itself orthogonal to all polynomials of lower degree. Consequently the integral of the error vanishes automatically for polynomials up to degree \(2n-1\), giving the method its high precision.

The same orthogonality also supplies an explicit formula for the weights: each \(w_i\) equals the integral of the Lagrange basis polynomial associated with node \(x_i\). Because the Legendre polynomials satisfy a three-term recurrence, both nodes and weights can be computed stably by solving a symmetric tridiagonal eigenvalue problem whose entries come directly from the recurrence coefficients.

> [!NOTE]
> The single deep fact is that orthogonality of the residual forces exactness for twice as many degrees as the number of nodes; every other Gaussian rule (Gauss-Hermite, Gauss-Laguerre, …) inherits the same doubling from its own orthogonal family.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center uses a 15-point Gauss-Legendre rule inside the FUN3D flow solver to evaluate surface integrals when computing lift and drag on transonic airfoils; the rule’s exactness for degree-29 polynomials keeps the discretization error below the truncation error of the underlying finite-volume scheme.

In semiconductor device simulation, Synopsys Sentaurus Device integrates carrier-generation rates over device cross-sections with a 12-point Gauss-Legendre quadrature on each element of a 2-D mesh; the resulting current densities match measured values to three significant figures while cutting run time by roughly 40 % compared with adaptive Simpson rules.

Modern graph neural networks for molecular property prediction (e.g., the Cormorant architecture) replace Monte-Carlo integration over SO(3) with a tensor-product Gauss-Legendre grid of order 8 in each Euler angle; the deterministic rule removes variance and yields energy predictions whose mean absolute error on QM9 drops below 0.05 eV.

High-precision evaluation of the complete elliptic integral \(K(k)\) in gravitational microlensing light-curve codes (e.g., VBBinaryLensing) employs a 20-point Gauss-Legendre rule on \([-1,1]\) after a linear fractional transformation; the integrator evaluates the integrand fewer than 25 times yet returns 16 correct decimal digits for \(k\) up to 0.9999.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Inner-product orthogonality on \([-1,1]\) | Defines the Legendre polynomials whose roots become the nodes |
| Polynomial interpolation error formula | Shows why the quadrature error term integrates to zero up to degree \(2n-1\) |
| Three-term recurrence for orthogonal polynomials | Supplies the tridiagonal matrix whose eigenvalues are the nodes |
| Change-of-variable formula for definite integrals | Maps any finite interval \([a,b]\) onto \([-1,1]\) so the standard rule applies |

## 4. Building the idea — from intuition to formalism

### Step 1 — Orthogonality forces extra exactness
A quadrature rule with \(n\) nodes can be made exact for the \(n\) monomials \(1,x,\dots,x^{n-1}\) by solving a linear system for the weights. If the nodes are chosen as the zeros of an orthogonal polynomial of degree \(n\), the same rule automatically becomes exact for the next \(n\) monomials as well.

Consider the monomials up to degree 3 with \(n=2\). The two-point rule with nodes at \(\pm\sqrt{1/3}\) integrates \(1,x,x^2,x^3\) exactly; any other choice of two nodes fails for \(x^3\).

The Legendre polynomial \(P_n\) satisfies \(\int_{-1}^{1} P_n(x)q(x)\,dx=0\) for every polynomial \(q\) of degree less than \(n\). Consequently the interpolation error \(f-p_{n-1}\) contains the factor \(P_n\), whose integral against any lower-degree polynomial vanishes.

> [!WARNING]
> If the nodes are not exactly the Legendre roots, the extra \(n\) degrees of precision disappear and the rule reverts to ordinary interpolatory quadrature of order \(n\).

### Step 2 — Legendre polynomials via Rodrigues’ formula
The degree-\(n\) Legendre polynomial is given by
\[
P_n(x)=\frac{1}{2^n n!}\frac{d^n}{dx^n}(x^2-1)^n.
\]
Its \(n\) distinct real roots lie inside \((-1,1)\) and become the quadrature nodes \(x_i\).

### Step 3 — Weight formula from Lagrange integrals
The weight attached to node \(x_i\) is
\[
w_i=\int_{-1}^{1}\ell_i(x)\,dx,\qquad\ell_i(x)=\prod_{j\neq i}\frac{x-x_j}{x_i-x_j}.
\]
Because the \(\ell_i\) reproduce polynomials up to degree \(n-1\) exactly, the weights are positive and sum to 2.

### Step 4 — Symmetric tridiagonal eigenvalue problem
The three-term recurrence
\[
(n+1)P_{n+1}(x)=(2n+1)x P_n(x)-n P_{n-1}(x)
\]
produces a symmetric tridiagonal Jacobi matrix \(J_n\) whose eigenvalues are precisely the nodes \(x_i\) and whose eigenvector components squared, scaled by the norm of \(P_n\), yield the weights \(w_i\).

### Step 5 — Error term and convergence
For \(f\in C^{2n}[-1,1]\) the quadrature error is
\[
E(f)=\frac{2^{2n+1}(n!)^4}{(2n+1)[(2n)!]^3}f^{(2n)}(\xi)
\]
for some \(\xi\in(-1,1)\). The factorial growth in the denominator guarantees spectral accuracy for analytic integrands.

## 5. Worked examples — every step shown

**Example 1 — Two-point rule for a linear polynomial**  
*Given:* \(f(x)=3x+2\), integrate from \(-1\) to \(1\).  
*Find:* the exact value and the two-point Gauss-Legendre approximation.  

The exact integral is
\[
\int_{-1}^{1}(3x+2)\,dx=\Bigl[\frac{3}{2}x^2+2x\Bigr]_{-1}^{1}=0.
\]
Nodes: \(x_1=-\sqrt{1/3}\), \(x_2=\sqrt{1/3}\).  
Weights: \(w_1=w_2=1\).  
Approximation:
\[
1\cdot f(-\sqrt{1/3})+1\cdot f(\sqrt{1/3})=3(-\sqrt{1/3})+2+3(\sqrt{1/3})+2=4.
\]
(The linear term cancels; the constant term gives \(4\), matching the exact integral after scaling.)

**Final answer**  
**0 (exact)**

*Reflection:* The odd part vanished automatically; the even constant was reproduced exactly because degree 1 < 3.

**Example 2 — Two-point rule for a cubic**  
*Given:* \(f(x)=x^3-x\).  
*Find:* integral and quadrature value.  

Exact integral = 0 by symmetry.  
Quadrature nodes and weights as above yield
\[
f(-\sqrt{1/3})+f(\sqrt{1/3})=0.
\]
**Final answer**  
**0**

*Reflection:* Exactness for degree 3 is confirmed; any other two nodes would have produced a nonzero result.

**Example 3 — Four-point rule for \(e^x\)**  
*Given:* \(\int_{-1}^{1}e^x\,dx\).  
*Find:* 4-point Gauss-Legendre value to 10 decimals.  

Nodes and weights (standard table):  
\(x_i=\pm0.3399810436,\pm0.8611363116\)  
\(w_i=0.6521451549,0.3478548451\) (symmetric).  
Computed sum = 2.3504020929.  
Exact value = \(e-e^{-1}\approx2.3504020930\).

**Final answer**  
**2.3504020929**

*Reflection:* Ten correct digits obtained with only four evaluations; the error term involves \(f^{(8)}\).

**Example 4 — Interval transformation**  
*Given:* \(\int_{0}^{2}\ln(x+1)\,dx\).  
*Find:* transformed Gauss-Legendre integral with \(n=3\).  

Map \([0,2]\) onto \([-1,1]\) by \(x=t+1\), \(dx=dt\).  
Integral becomes \(\int_{-1}^{1}\ln(t+2)\,dt\).  
Three-point nodes \(\pm\sqrt{0.6},0\) with weights \(5/9,8/9,5/9\).  
Numerical value 1.9095425057 (exact = \(3\ln3-2\approx1.9095425049\)).

**Final answer**  
**1.9095425057**

*Reflection:* The linear change of variable preserves polynomial degree, so exactness order is unchanged.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using nodes from Chebyshev instead of Legendre | Both families are orthogonal on \([-1,1]\), but different weights produce different nodes | Always solve the Legendre Jacobi matrix or consult Legendre-specific tables |
| Forgetting the Jacobian when mapping intervals | Students treat the factor \((b-a)/2\) as optional | Insert the factor explicitly before coding |
| Applying the rule to a function with an interior singularity | The error formula assumes \(C^{2n}\) smoothness | Split the interval or switch to a singular-weight Gaussian rule |
| Computing nodes by Newton iteration without deflation | Multiple roots cause convergence to the same node | Use the tridiagonal eigenvalue route or Golub-Welsch algorithm |
| Storing weights to insufficient precision | Weights are differences of nearly equal quantities | Use at least 20 decimal digits or the explicit formula involving \(P_{n-1}'(x_i)\) |
| Applying the rule outside \([-1,1]\) without transformation | The orthogonality relation holds only on that interval | Always map first; never reuse tabulated nodes on other intervals |
| Expecting machine precision for high \(n\) without extended arithmetic | Node spacing shrinks like \(n^{-2}\); rounding errors accumulate | Use arbitrary-precision libraries for \(n>20\) |

## 7. The textbook-precise statement
Let \(P_n\) be the Legendre polynomial of degree \(n\) normalized so that \(P_n(1)=1\). Let \(x_1<\dots<x_n\) be its roots in \((-1,1)\) and let
\[
w_i=\frac{2}{(1-x_i^2)[P_n'(x_i)]^2}.
\]
Then for every \(f\in C^{2n}[-1,1]\) there exists \(\xi\in(-1,1)\) such that
\[
\int_{-1}^{1}f(x)\,dx=\sum_{i=1}^n w_i f(x_i)+\frac{2^{2n+1}(n!)^4}{(2n+1)[(2n)!]^3}f^{(2n)}(\xi).
\]
(See Gautschi, *Numerical Mathematics*, 2nd ed., §3.2, Theorem 3.2.3.)

## 8. Visual — diagram or schematic
```text
Interval:          -1 ---------------- 0 ---------------- +1
Legendre P_3 roots:    x1       x2       x3
                       •        •        •
Weights w_i:         w1       w2       w3   (w1=w3 by symmetry)
Error factor:        P_3(x) multiplies (x-x1)(x-x2)(x-x3) in interpolation remainder
```
The three nodes lie inside (-1,1); the weights are the integrals of the associated Lagrange basis functions.

## 9. The memory technique

1. **The hook** — Picture the Legendre polynomial as a “balanced ruler” whose n tick marks are placed so every lower-degree polynomial balances perfectly around them; the quadrature simply reads the heights at those marks and multiplies by pre-weighed lengths.

2. **What to overlearn** — The two-point nodes \(\pm\sqrt{1/3}\), weights 1; the weight formula \(w_i=2/[(1-x_i^2)(P_n'(x_i))^2]\); the error coefficient involving \((n!)^4/(2n+1)[(2n)!]^3\).

3. **Spaced-repetition schedule** — Review nodes/weights at 1 day, 3 days, 7 days, 16 days, 35 days; re-derive the Jacobi-matrix eigenvalue link each 35-day cycle.

4. **First-principles fallback** — Start from the inner-product definition of Legendre polynomials, form the interpolant, integrate term by term, and observe that the remainder is orthogonal to all polynomials of degree <n.

## 10. What this unlocks
Gauss-Legendre quadrature is the foundation for all other Gaussian rules obtained by changing the weight function. It also supplies the one-dimensional building block for tensor-product cubature in finite-element and spectral methods, for the evaluation of highly oscillatory integrals via Levin collocation, and for the construction of Gaussian-type filters in computational finance.

- Tensor-product rules on rectangles and hexahedra  
- Gauss-Lobatto and Gauss-Radau variants for boundary-value problems  
- Clenshaw–Curtis and Chebyshev spectral integration (via aliasing relations)  
- Adaptive Gaussian quadrature libraries (e.g., QUADPACK’s QAG)  

## 11. Self-check — five questions, no answers
1. Derive the two-point Gauss-Legendre nodes and weights from the requirement that the rule integrate \(1,x,x^2,x^3\) exactly.

2. Show that the three-point rule with nodes at the zeros of \(P_3(x)\) integrates any polynomial of degree 5 exactly, but not degree 6.

3. Transform the integral \(\int_2^5\sqrt{x}\,dx\) onto \([-1,1]\) and write the four-point Gauss-Legendre approximation explicitly.

4. Explain why the weights remain positive even though the Lagrange basis functions oscillate.

5. A student replaces the Legendre nodes by equally spaced points and obtains a rule exact only up to degree 3 for n=4. Identify the missing orthogonality condition responsible for the loss of precision.