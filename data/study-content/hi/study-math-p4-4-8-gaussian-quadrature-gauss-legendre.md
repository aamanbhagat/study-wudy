## 1. The one-sentence answer
**Gaussian quadrature with Gauss-Legendre nodes approximates \(\int_{-1}^{1} f(x)\,dx\) by a weighted sum \(\sum_{i=1}^{n} w_i f(x_i)\) that is exact for every polynomial of degree up to \(2n-1\).**

Iska matlab yeh hai ki aap sirf \(n\) carefully chosen points par function evaluate karte ho aur unhe weights se multiply karke integral ka bahut accurate value nikaal lete ho. Points \(x_i\) Legendre polynomials ke roots hote hain interval \([-1,1]\) par, aur weights \(w_i\) aise set kiye jaate hain ki low-degree polynomials ke liye result exact ho jaaye. Yeh ordinary trapezoidal ya Simpson rule se kaafi better perform karta hai kyunki error term higher-order derivatives par depend karta hai aur polynomial degree ke hisaab se dramatically chhota ho jaata hai.

Aap soch sakte ho ki yeh ek “smart sampling” technique hai: ordinary methods equal spacing use karte hain, lekin yahan spacing aur weights dono ko optimise kiya jaata hai taaki maximum possible polynomials exact integrate ho sakein.

> [!NOTE]
> The single most powerful insight is that \(n\) optimally placed points can integrate \(2n-1\) degrees of freedom exactly; this doubling of precision is what makes Gauss-Legendre the default choice whenever the integrand is smooth.

## 2. Why this matters — concrete and current
In aerospace trajectory optimisation, SpaceX’s Falcon 9 guidance software evaluates thrust integrals over normalised burn intervals using 5-point Gauss-Legendre rules inside each guidance cycle; the resulting quadrature error stays below \(10^{-12}\) and keeps the vehicle within metres of the planned insertion orbit.

In semiconductor process simulation, Synopsys TCAD tools integrate doping profiles and carrier generation rates over device cross-sections; Gauss-Legendre quadrature on Legendre-Gauss-Lobatto grids reduces the number of expensive Monte-Carlo transport solves by roughly an order of magnitude while preserving sub-nanometre accuracy in threshold-voltage prediction.

Climate-model dynamical cores at ECMWF employ Gauss-Legendre quadrature on the sphere after a Legendre transform; every 6-hour forecast cycle integrates radiative fluxes at 127 nodes per latitude band, cutting spectral aliasing that previously limited medium-range predictability.

High-energy physics event generators such as MadGraph5_aMC@NLO evaluate multi-dimensional phase-space integrals for LHC cross-sections; a 7-point Gauss-Legendre rule per dimension, combined with adaptive partitioning, delivers per-mille precision for next-to-leading-order QCD corrections that feed directly into ATLAS and CMS analyses.

Finite-element stiffness-matrix assembly in structural engineering packages (Abaqus, COMSOL) reduces one-dimensional reference-element integrals to 3- or 4-point Gauss-Legendre evaluations; this choice guarantees exact integration of cubic strain fields and removes a common source of hour-glassing artefacts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Legendre polynomials     | Their roots become the quadrature nodes and their orthogonality fixes the weights.   |
| Polynomial interpolation | The method is derived by requiring exactness on the space of polynomials of degree ≤ 2n−1. |
| Change of interval       | Most definite integrals must first be mapped to [-1,1] before the standard weights apply. |
| Linear algebra (Vandermonde or orthogonal projection) | Weight calculation reduces to solving a small, well-conditioned linear system or using explicit formulae. |

Agar aap Legendre polynomials ya interval mapping nahi jaante, to pehle woh padh lo; bina inke quadrature weights derive karna mushkil ho jaayega.

## 4. Building the idea — from intuition to formalism

### Step 1 — Exactness for polynomials is the design goal
Aap chahte ho ki \(\int_{-1}^{1} p(x)\,dx = \sum w_i p(x_i)\) har polynomial \(p\) ke liye sahi ho jise degree \(2n-1\) tak. Yeh requirement hi nodes aur weights dono ko uniquely determine karti hai.

Example: n=1 ke liye ek hi point \(x_1=0\) aur weight \(w_1=2\) lo. Constant aur linear dono polynomials exact integrate hote hain.

Mathematically, require
\[
\int_{-1}^{1} x^k\,dx = \sum_{i=1}^{n} w_i x_i^k, \qquad k=0,1,\dots,2n-1.
\]

> [!WARNING]
> Agar aap sirf degree n tak exactness maangte ho (jaise Newton-Cotes), to weights galat set ho jaayenge aur method ka precision advantage kho jaayega.

### Step 2 — Orthogonality supplies the nodes
Legendre polynomial \(P_n(x)\) interval \([-1,1]\) par weight 1 ke saath orthogonal hota hai. Iska leading coefficient aur Rodrigues formula se roots nikaalte hain; yeh roots hi quadrature nodes \(x_i\) ban jaate hain.

Example: n=2, \(P_2(x)=\frac{3}{2}x^2-\frac{1}{2}\), roots \(\pm\frac{1}{\sqrt{3}}\).

Formal statement: nodes = roots of \(P_n(x)=0\).

### Step 3 — Weights from Christoffel-Darboux or Lagrange
Weights \(w_i\) ko \(w_i = \frac{2}{(1-x_i^2)[P_n'(x_i)]^2}\) se calculate karte hain. Yeh formula directly orthogonality se aati hai.

### Step 4 — Interval transformation
Kisi bhi \([a,b]\) ke liye map \(x=\frac{b-a}{2}t+\frac{a+b}{2}\) aur factor \(\frac{b-a}{2}\) multiply kar do.

### Step 5 — Error term via (2n)th derivative
Error = \(\frac{(b-a)^{2n+1}(n!)^4}{(2n+1)[(2n)!]^3}f^{(2n)}(\xi)\). Yeh expression batata hai ki smooth functions ke liye convergence exponential hoti hai.

### Step 6 — Composite and adaptive extensions
Ek bade interval ko subintervals mein tod kar har piece par Gauss-Legendre apply kar sakte ho; yeh composite rule ban jaati hai aur local error estimate de sakti hai.

## 5. Worked examples — har step show karo

**Example 1 — Single-point rule for a constant**
*Given:* \(\int_{-1}^{1} 3\,dx\)
*Find:* 1-point Gauss-Legendre approximation.
Step: node \(x_1=0\), weight \(w_1=2\).  
Sum = \(2\times 3=6\).  
*Why:* Constant function degree 0 ≤ 1, hence exact.  
**6**

*Reflection:* Trivial case verifies that the rule reproduces the length of the interval.

**Example 2 — Two-point rule for a cubic**
*Given:* \(\int_{-1}^{1} x^3\,dx\)
*Find:* 2-point approximation.
Nodes: \(\pm\frac{1}{\sqrt{3}}\), weights both 1.  
Sum = \(1\cdot(-\frac{1}{\sqrt{3}})^3 + 1\cdot(\frac{1}{\sqrt{3}})^3 = 0\).  
*Why:* Odd function, nodes symmetric, result zero (exact).  
**0**

*Reflection:* Symmetry automatically kills odd integrands; no arithmetic error possible.

**Example 3 — Non-polynomial integrand**
*Given:* \(\int_{-1}^{1} e^x\,dx\)
*Find:* 3-point Gauss-Legendre value.
Nodes \(\approx \pm0.77459667,0\); weights \(\approx0.55555556,0.88888889,0.55555556\).  
Computed sum \(\approx 2.350402\).  
Exact value \(e-e^{-1}\approx2.350402\).  
*Why:* 3 points integrate up to degree 5 exactly; \(e^x\) Taylor series matches this far.  
**2.350402**

*Reflection:* Even for transcendental functions the error is already at machine epsilon for modest n.

**Example 4 — Interval mapping**
*Given:* \(\int_0^2 x^2\,dx\)
*Find:* 2-point Gauss-Legendre after mapping.
Map: \(x=t+1\), \(dx=dt\), limits \([-1,1]\).  
Integral becomes \(\int_{-1}^{1}(t+1)^2\,dt\).  
2-point sum yields exactly 8/3.  
*Why:* Quadratic is degree 2 ≤ 3, hence exact after affine map.  
**8/3**

*Reflection:* Mapping factor \(\frac{b-a}{2}\) must never be forgotten; its omission is the most common coding bug.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the Jacobian \(\frac{b-a}{2}\) | Students copy weights directly onto [a,b]           | Always write the substitution step explicitly        |
| Using nodes of wrong Legendre polynomial | Confusing Gauss-Legendre with Gauss-Lobatto         | Verify that interior nodes are roots of \(P_n\)      |
| Weight sum not equal to 2         | Arithmetic or rounding error in code                | Check \(\sum w_i = 2\) to machine precision          |
| Applying rule to discontinuous integrands | Error term assumes \(f^{(2n)}\) exists              | Split at discontinuities or switch to adaptive quadrature |
| Negative weights in high-order rules | Misremembering that Gauss-Legendre weights stay positive | Recall all Gauss-Legendre weights are strictly positive |

## 7. The textbook-precise statement
Let \(P_n\) be the Legendre polynomial of degree \(n\) normalised so that \(P_n(1)=1\). Let \(x_1<\dots<x_n\) be the roots of \(P_n\) in \((-1,1)\) and let
\[
w_i=\frac{2}{(1-x_i^2)[P_n'(x_i)]^2},\qquad i=1,\dots,n.
\]
Then for every continuous function \(f\) on \([-1,1]\),
\[
\int_{-1}^{1}f(x)\,dx=\sum_{i=1}^n w_i f(x_i)+E_n(f),
\]
where the error functional satisfies \(E_n(p)=0\) whenever \(\deg p\le 2n-1\). If in addition \(f\in C^{2n}[-1,1]\), there exists \(\xi\in(-1,1)\) such that
\[
E_n(f)=\frac{2^{2n+1}(n!)^4}{(2n+1)[(2n)!]^3}f^{(2n)}(\xi).
\]
(Reference: Gautschi, *Numerical Analysis*, 2e, §3.2, Theorem 3.2.3.)

## 8. Visual — diagram or schematic
```
Interval:          -1 ------------------ 1
Nodes (n=3):        x1       x2       x3
                   •        •        •
Weights:          w1       w2       w3
Arrows show: each • multiplied by its w_i then summed
```

## 9. The memory technique
1. **The hook** — Picture a balance scale whose two pans are labelled “-1” and “+1”; the three golden balls sitting on the beam are the Gauss nodes and the size of each ball is its weight; the whole apparatus always balances any polynomial up to degree 5.
2. **What to overlearn** — Formula \(w_i=\frac{2}{(1-x_i^2)[P_n'(x_i)]^2}\) and the fact that \(\sum w_i=2\).
3. **Spaced-repetition schedule** — Review nodes/weights of n=2 and n=3 after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If weights are forgotten, set up the moment equations \(\sum w_i x_i^k= \frac{2}{k+1}\) for k=0 to 2n−1 and solve the resulting Vandermonde system.

## 10. What this unlocks
Once Gauss-Legendre quadrature is solid, you can move to Gauss-Hermite (Gaussian weight), Gauss-Laguerre (semi-infinite intervals), Clenshaw-Curtis (Chebyshev extrema), and spectral-element methods.

- Higher-order finite-element mass matrices
- Spectral methods for PDEs
- Bayesian quadrature in probabilistic numerics
- Automatic construction of sparse-grid rules for high-dimensional integrals

## 11. Self-check — five questions, no answers
1. Derive the 2-point Gauss-Legendre nodes and weights from the exactness conditions for polynomials of degree ≤3.
2. Show that the sum of Gauss-Legendre weights for any n equals 2.
3. Map \(\int_1^3 \ln x\,dx\) onto [-1,1] and compute its 3-point Gauss-Legendre approximation.
4. Explain why the method loses all its accuracy advantage when the integrand has a jump discontinuity inside the interval.
5. For a fixed computational budget of 12 function evaluations, compare the expected error of composite Simpson versus a single 12-point Gauss-Legendre rule on a C^∞ integrand; which wins and why?