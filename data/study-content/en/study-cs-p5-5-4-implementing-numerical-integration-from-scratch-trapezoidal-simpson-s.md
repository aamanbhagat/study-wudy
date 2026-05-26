## 1. The one-sentence answer
**Numerical integration from scratch approximates the definite integral of a function by replacing the area under its curve with sums of simple geometric shapes whose areas are easy to compute exactly.**

The integral \(\int_a^b f(x)\,dx\) equals the net signed area between the graph of \(f\) and the x-axis. When no antiderivative exists in closed form, or when only sampled values of \(f\) are available, the area is partitioned into narrow strips and each strip is replaced by a trapezoid or a parabolic segment. Summing the areas of these shapes yields a sequence of approximations whose error shrinks predictably as the partition is refined.

The trapezoidal rule connects consecutive sample points with straight lines, while Simpson’s rule connects them with quadratic arcs. Both rules are derived by integrating the interpolating polynomial on each subinterval and then summing the results. The only data required are the function values at the nodes; no symbolic differentiation or integration is performed.

> [!NOTE]
> The decisive insight is that the error of each rule is controlled by a higher derivative of \(f\): the trapezoidal error involves \(f''\), Simpson’s error involves \(f^{(4)}\). Once this link is seen, convergence order and step-size choice become mechanical rather than empirical.

## 2. Why this matters — concrete and current
NASA’s trajectory-design software for the Artemis lunar missions evaluates millions of line-of-sight integrals through Earth’s atmosphere; each integral is replaced by an adaptive Simpson quadrature whose nodes are generated on the fly from tabulated density models.  

Semiconductor foundries such as TSMC simulate dopant diffusion inside silicon wafers by solving the diffusion equation with finite-element time stepping; the spatial integrals that arise at each time step are evaluated with composite trapezoidal rules on nonuniform meshes extracted from process metrology data.  

In large-scale transformer training at Google and OpenAI, the attention softmax is normalized by a partition function that is estimated via numerical quadrature over the key-query dot-product distribution; the quadrature is implemented with a low-order trapezoidal rule inside the fused CUDA kernel to avoid an extra memory pass.  

Climate models at the European Centre for Medium-Range Weather Forecasts integrate radiative transfer through atmospheric columns millions of times per forecast cycle; the vertical integrals are performed with a fixed-order Simpson rule whose nodes coincide with the model’s sigma levels, guaranteeing conservation of energy to machine precision.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Riemann integral definition | Supplies the limit that both rules are approximating.                               |
| Polynomial interpolation | Trapezoidal uses degree-1, Simpson uses degree-2; error formulas follow from interpolation remainder. |
| Basic Python loops and lists | All implementations are written from scratch without external libraries.            |
| Derivative notation      | Error bounds are expressed with \(f''\) or \(f^{(4)}\).                             |

## 4. Building the idea — from intuition to formalism

### Step 1 — Area as a limit of rectangles
Any definite integral equals a limit of rectangular areas. Partition \([a,b]\) into \(n\) subintervals of width \(h=(b-a)/n\). On each subinterval the height is taken as \(f(x_i)\) and the rectangle area is summed. The resulting Riemann sum converges to the integral when \(f\) is continuous.

Example: \(\int_0^1 x\,dx\). With \(n=2\), \(h=0.5\), the sum is \(0.25+0.75=1\), already close to the exact value \(1/2\).

Formal statement:
\[
\int_a^b f(x)\,dx = \lim_{n\to\infty}\sum_{i=0}^{n-1}f(x_i)h.
\]

> [!WARNING]
> Using left or right endpoints alone produces first-order error; the method therefore converges slowly for any function whose derivative is nonzero.

### Step 2 — Replacing rectangles by trapezoids
A straight line connecting \(f(x_i)\) and \(f(x_{i+1})\) forms a trapezoid whose area is the average of the two heights times the width. Summing these areas gives the composite trapezoidal rule.

Example: same integral, \(n=2\). Trapezoids yield \((0+0.5)/2\cdot0.5 + (0.5+1)/2\cdot0.5 = 0.5\).

Formal statement:
\[
T_n = \frac{h}{2}\Bigl(f(a)+2\sum_{i=1}^{n-1}f(a+ih)+f(b)\Bigr).
\]

> [!WARNING]
> Forgetting the factor of 2 on interior points produces an answer exactly twice as large as the correct trapezoidal value.

### Step 3 — Local quadratic interpolation
On two adjacent subintervals Simpson’s rule fits a parabola through three consecutive points and integrates that parabola exactly. The resulting weight pattern is \(1,4,1\) scaled by \(h/3\).

Example: \(\int_0^1 x^2\,dx\), \(n=2\). Nodes 0, 0.5, 1 give Simpson value \(1/6\), matching the exact integral.

Formal statement (one pair of intervals):
\[
\int_{x_i}^{x_i+2h}\!f(x)\,dx = \frac{h}{3}\bigl(f(x_i)+4f(x_i+h)+f(x_i+2h)\bigr).
\]

> [!WARNING]
> Applying the \(1,4,1\) weights to an odd number of intervals without special handling at the end produces an inconsistent formula.

### Step 4 — Composite Simpson rule
Repeating the two-interval pattern across the whole domain yields the composite Simpson rule, which requires an even number of subintervals.

Formal statement:
\[
S_n = \frac{h}{3}\Bigl(f(a)+4\sum_{k\text{ odd}}f(a+kh)+2\sum_{k\text{ even}}f(a+kh)+f(b)\Bigr).
\]

### Step 5 — Error scaling with step size
Taylor expansion of the local truncation error shows that the trapezoidal error per interval is \(O(h^3)\) while Simpson’s is \(O(h^5)\). Summing \(n\) intervals therefore produces global orders \(O(h^2)\) and \(O(h^4)\) respectively.

### Step 6 — Implementation skeleton
Store the nodes in a list, evaluate \(f\) at each node once, then apply the weighted sum. No symbolic manipulation is required.

## 5. Worked examples — every step shown

**Example 1 — Linear function**  
*Given:* \(f(x)=x\) on \([0,1]\), \(n=2\).  
*Find:* trapezoidal approximation.  
Compute \(h=0.5\).  
Nodes: \(0,0.5,1\).  
Weighted sum: \(\frac{0.5}{2}(0+2\cdot0.5+1)=0.5\).  
*Why* the interior coefficient is 2: it arises from adding the right leg of the first trapezoid and the left leg of the second.  
**0.5**  

*Reflection:* Because \(f\) is linear the trapezoidal rule is exact; the same calculation with Simpson yields the identical result.

**Example 2 — Quadratic, Simpson**  
*Given:* \(f(x)=x^2\) on \([0,2]\), \(n=4\).  
*Find:* Simpson value.  
\(h=0.5\). Nodes: 0,0.5,1,1.5,2.  
Weights: 1,4,2,4,1.  
Sum: \(\frac{0.5}{3}(0+4\cdot0.25+2\cdot1+4\cdot2.25+4)=8/3\).  
*Why* interior even indices receive 2: they are shared endpoints of two parabolic pieces.  
**8/3**  

*Reflection:* The exact integral is also \(8/3\), confirming fourth-order accuracy on polynomials up to degree 3.

**Example 3 — Composite trapezoidal with more panels**  
*Given:* \(f(x)=\sin x\) on \([0,\pi]\), \(n=4\).  
*Find:* \(T_4\).  
\(h=\pi/4\).  
Nodes and values computed sequentially. Weighted sum yields \(\approx1.896\).  
*Why* the endpoint weights are halved: each endpoint belongs to only one trapezoid.  
**1.896** (rounded)  

*Reflection:* The second derivative of sine is bounded, guaranteeing the observed \(O(h^2)\) convergence.

**Example 4 — Error comparison on the same mesh**  
*Given:* \(f(x)=e^x\) on \([0,1]\), \(n=4\).  
Trapezoidal result: 1.72722. Simpson result: 1.71886. Exact: 1.71828.  
*Why* Simpson is closer: its leading error term contains \(f^{(4)}\) rather than \(f''\).  
**Simpson error \(\approx6\times10^{-4}\)**  

*Reflection:* The same nodes produce two different approximations; the difference itself estimates the dominant error.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using an odd number of intervals for Simpson | The 1-4-2-4-… pattern requires pairs of intervals   | Always enforce even \(n\) or fall back to trapezoidal on the last interval |
| Forgetting to halve endpoint weights | Copying the interior pattern to the ends            | Explicitly code the first and last coefficients as \(h/2\) or \(h/3\) |
| Evaluating the function more than once per node | Redundant calls inside separate loops               | Build the node list first, then a single evaluation pass |
| Applying the rule to a discontinuous integrand | Error formulas assume \(C^4\) or \(C^2\) smoothness | Check continuity of the required derivative before trusting the order |
| Confusing \(h\) with total width  | Notation slip when \(n\) changes                    | Always recompute \(h=(b-a)/n\) immediately after choosing \(n\) |
| Ignoring floating-point accumulation | Many additions of similar magnitudes                | Use compensated summation (Kahan) for very large \(n\) |
| Assuming the rule is exact for all polynomials | Simpson is exact only up to degree 3                | Test with a degree-4 monomial to observe the nonzero error |

## 7. The textbook-precise statement
Let \(f\in C^4[a,b]\). The composite Simpson rule \(S_n\) with even \(n\) satisfies
\[
\int_a^b f(x)\,dx = S_n - \frac{(b-a)}{180}h^4 f^{(4)}(\xi)
\]
for some \(\xi\in(a,b)\). (Burden & Faires, *Numerical Analysis*, 10e, Theorem 4.4.)

## 8. Visual — diagram or schematic
```text
x:  a ------ x1 ------ x2 ------ x3 ------ b
f:  *        *        *        *        *
    \       / \      / \      / \      /
     \     /   \    /   \    /   \    /
      \   /     \  /     \  /     \  /
       \ /       \/       \/       \ /
        trapezoid   parabolic arc   trapezoid
```
Horizontal axis labelled with nodes \(a=x_0,x_1,\dots,x_n=b\). Vertical segments show function values. Straight lines illustrate trapezoidal pieces; the middle pair of intervals shows the parabolic arc used by Simpson.

## 9. The memory technique

1. **The hook** — Picture a circus trapeze (straight bar = trapezoidal) swinging beside a clown’s curved unicycle (parabola = Simpson).  
2. **What to overlearn** — \(T_n\) formula, \(S_n\) formula, global orders \(O(h^2)\) and \(O(h^4)\).  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive both rules by integrating the Lagrange interpolant of degree 1 or 2 on a single pair of intervals, then sum.

## 10. What this unlocks
Mastery of these two classical rules supplies the concrete foundation for every subsequent quadrature method, adaptive refinement strategy, and Gaussian-weight derivation.

- Adaptive quadrature (Simpson with automatic step halving)  
- Gaussian quadrature nodes and weights  
- Clenshaw–Curtis and Chebyshev spectral integration  
- Finite-element stiffness-matrix assembly  
- Monte-Carlo variance-reduction techniques that still rely on low-order control variates

## 11. Self-check — five questions, no answers
1. Derive the trapezoidal rule on a single interval by integrating the linear interpolant and state the exact local truncation error term.  
2. Show that Simpson’s rule integrates any cubic polynomial exactly, even though it is constructed from quadratics.  
3. For \(f(x)=\sqrt{x}\) on \([0,1]\) with \(n=4\), compute both \(T_4\) and \(S_4\) and explain why the observed error orders deviate from theory.  
4. A programmer wrote a Simpson routine that accepts any positive integer \(n\). Identify the latent bug and the minimal correction.  
5. Given only the numerical values of \(T_{2^k}\) for \(k=1,2,3,4\), construct a Romberg extrapolation table up to the \(O(h^6)\) column without recomputing any function values.