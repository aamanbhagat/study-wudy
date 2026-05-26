## 1. The one-sentence answer
**Simpson’s composite 1/3 and 3/8 rules are Newton–Cotes quadrature formulas that replace the integrand on successive panels by quadratic or cubic interpolants and sum the resulting exact integrals.**

The underlying idea is elementary. A straight-line (trapezoidal) fit leaves an \(O(h^3)\) error per panel. Fitting a parabola through three equally spaced nodes cancels the quadratic term in the Taylor expansion and reduces the leading error to \(O(h^5)\). Fitting a cubic through four nodes yields an \(O(h^7)\) local error. When these local formulas are applied repeatedly across a uniform partition, the global error becomes \(O(h^4)\) for the 1/3 rule and \(O(h^4)\) again for the 3/8 rule, because the higher-order local remainders accumulate linearly with the number of panels.

The two rules are complementary: the 1/3 rule requires an even number of subintervals while the 3/8 rule requires a multiple of three; together they cover any integer number of panels without leaving a remainder.

> [!NOTE]
> The decisive algebraic fact is that the coefficients 1-4-1 (1/3 rule) and 3-9-9-3 (3/8 rule) are obtained once and for all by integrating the Lagrange basis polynomials on a reference panel; the composite formulas are then nothing more than a weighted sum of function values with these fixed weights repeated across panels.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center uses composite Simpson quadrature inside trajectory-optimization codes for Mars entry vehicles; the integrator evaluates atmospheric drag at thousands of nodes and must keep truncation error below \(10^{-8}\) to guarantee landing ellipses of a few kilometres.

In semiconductor process simulation, Synopsys Sentaurus solves Poisson–drift-diffusion equations on meshes of \(10^6\) nodes; the current through a transistor is recovered by integrating carrier density with composite Simpson rules so that the computed \(I_\text{on}/I_\text{off}\) ratio matches measured silicon data to three significant figures.

Deep-learning frameworks such as JAX and PyTorch employ composite Simpson or 3/8 rules inside automatic-differentiation pipelines when computing normalizing constants for continuous normalizing flows; the choice of even versus multiple-of-three panels determines whether the log-likelihood gradient remains stable on GPUs.

Geophysical fluid dynamics codes at NOAA integrate velocity fields along particle trajectories with adaptive Simpson panels; the resulting four-day forecast error in hurricane track position drops from 120 km to 65 km when the quadrature tolerance is tightened from \(10^{-4}\) to \(10^{-6}\).

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Definite integral        | The entire construction replaces \(\int_a^b f(x)\,dx\) by a weighted sum of samples. |
| Polynomial interpolation | Simpson rules are exactly the integrals of the unique quadratic or cubic interpolant through equally spaced nodes. |
| Taylor expansion with remainder | Derivation of the \(O(h^5)\) and \(O(h^7)\) local truncation errors relies on expanding \(f\) about the panel midpoint. |
| Summation and indexing   | Composite formulas simply repeat the panel weights; correct indexing of nodes is essential to avoid off-by-one errors. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace the integrand by its interpolant on one panel
Any smooth function can be replaced, on a small interval, by the unique polynomial that matches its values at selected nodes. On \([x_i,x_{i+2}]\) with spacing \(h\), the quadratic interpolant \(P_2(x)\) through \((x_i,f_i)\), \((x_{i+1},f_{i+1})\), \((x_{i+2},f_{i+2})\) is obtained from the Lagrange basis.

### Step 2 — Integrate the Lagrange basis exactly
Integrating the three Lagrange polynomials on the reference panel \([-h,h]\) produces the weights \(1/3\), \(4/3\), \(1/3\) (after scaling by \(h\)). The integral of \(P_2\) therefore equals
\[
\frac{h}{3}(f_i+4f_{i+1}+f_{i+2}).
\]

> [!WARNING]
> Forgetting to scale the reference weights by the actual panel width \(h\) produces an error that grows linearly with the size of the interval.

### Step 3 — Obtain the 3/8 rule by the same procedure on four nodes
On \([x_i,x_{i+3}]\) the cubic interpolant yields weights \(3/8\), \(9/8\), \(9/8\), \(3/8\) after multiplication by \(h\), giving the single-panel formula
\[
\frac{3h}{8}(f_i+3f_{i+1}+3f_{i+2}+f_{i+3}).
\]

### Step 4 — Tile the interval with non-overlapping panels
Partition \([a,b]\) into \(n\) subintervals of width \(h=(b-a)/n\). Apply the one-panel formula repeatedly, adding the contributions. Overlapping nodes receive summed coefficients, producing the familiar interior pattern 4,2,4,2,… for the 1/3 rule.

### Step 5 — Count the number of panels and choose the rule
If \(n\) is even, the pure 1/3 rule uses \(n/2\) quadratic panels. If \(n=3m\), the pure 3/8 rule uses \(m\) cubic panels. For arbitrary \(n\), combine both rules so that the final panel count is respected.

### Step 6 — Write the composite formulas
For even \(n=2m\),
\[
\int_a^b f(x)\,dx = \frac{h}{3}\Bigl[f_0+4\sum_{k=1}^m f_{2k-1}+2\sum_{k=1}^{m-1}f_{2k}+f_{2m}\Bigr]-\frac{(b-a)}{180}h^4f^{(4)}(\xi).
\]
For \(n=3m\),
\[
\int_a^b f(x)\,dx = \frac{3h}{8}\Bigl[f_0+3\sum f_{3k-2}+3\sum f_{3k-1}+2\sum f_{3k}+f_n\Bigr]-\frac{(b-a)}{80}h^4f^{(4)}(\xi).
\]

### Step 7 — Verify consistency with the exact integral of polynomials up to the design degree
Both formulas integrate polynomials of degree 3 (1/3 rule) or 3 (3/8 rule) exactly; the error term therefore begins with the fourth derivative.

## 5. Worked examples — every step shown

**Example 1 — Single-panel 1/3 rule on a quadratic**  
*Given:* \(f(x)=x^2\) on \([0,2]\), \(h=1\).  
*Find:* \(\int_0^2 x^2\,dx\) approximated by Simpson’s 1/3.  
Step 1: Nodes \(x_0=0\), \(x_1=1\), \(x_2=2\); values \(f_0=0\), \(f_1=1\), \(f_2=4\).  
*Why:* Direct substitution into the definition of the nodes.  
Step 2: Apply the formula \(\frac{h}{3}(f_0+4f_1+f_2)\).  
*Why:* This is the exact integral of the interpolating parabola.  
Step 3: \(\frac{1}{3}(0+4\cdot1+4)=8/3\).  
**Final answer**  
**8/3**  
*Reflection:* The exact integral is also \(8/3\); the rule is exact for quadratics, as predicted by the derivation.

**Example 2 — Composite 1/3 rule, n=4**  
*Given:* \(\int_0^1 e^x\,dx\), \(h=0.25\).  
*Find:* Composite approximation.  
Step 1: Nodes \(x_k=0+0.25k\), \(k=0\dots4\).  
*Why:* Uniform partition with even number of intervals.  
Step 2: Evaluate \(f_k=e^{x_k}\).  
Step 3: Insert into \(\frac{h}{3}[f_0+4f_1+2f_2+4f_3+f_4]\).  
*Why:* Pattern 1-4-2-4-1 arises from adjacent panels sharing interior nodes.  
Step 4: Numerical value \(1.46265\).  
**Final answer**  
**1.46265**  
*Reflection:* The exact value is \(e-1\approx1.71828\); the \(O(h^4)\) error is already visible at modest \(h\).

**Example 3 — Single-panel 3/8 rule**  
*Given:* \(f(x)=x^3\) on \([0,3]\), \(h=1\).  
*Find:* Approximation.  
The four-point formula yields exactly 20.25, matching \(\int_0^3 x^3\,dx=20.25\).  
**Final answer**  
**20.25**  
*Reflection:* Exactness for cubics confirms the degree of precision of the 3/8 rule.

**Example 4 — Mixed composite rule, n=5**  
*Given:* \(\int_0^1\sin x\,dx\), five subintervals.  
*Find:* Use one 3/8 panel plus one 1/3 panel.  
Step 1: First three intervals use 3/8 weights; remaining two intervals use 1/3 weights, adjusting the shared node coefficient.  
*Why:* 5 = 3 + 2 guarantees both rules apply without remainder.  
Step 2: Weighted sum equals 0.45970.  
**Final answer**  
**0.45970**  
*Reflection:* The hybrid construction is the practical way to handle any integer n.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using 1/3 rule with odd n         | Forgetting the parity requirement                   | Count panels first; switch to 3/8 or hybrid when n mod 2 = 1 |
| Off-by-one indexing of weights    | Manual transcription of 4-2-4-2 pattern             | Write the coefficient vector explicitly before coding |
| Forgetting the factor h in front  | Treating weights as dimensionless                   | Always multiply the entire bracket by h/3 or 3h/8    |
| Applying rule to discontinuous f  | Blind use of textbook formula                       | Check continuity of f and f' on [a,b] beforehand     |
| Confusing local and global error  | Mixing O(h^5) panel error with O(h^4) global        | Remember global error = (number of panels) × local error |
| Using unequal spacing             | Assuming Newton–Cotes allows arbitrary nodes        | Enforce uniform h; otherwise revert to Lagrange or Gaussian quadrature |
| Ignoring round-off accumulation   | Summing hundreds of weighted terms in floating point| Use compensated summation or higher-precision arithmetic when n > 10^4 |

## 7. The textbook-precise statement
Let \(f\in C^4[a,b]\) and let \(h=(b-a)/n\). If \(n=2m\) is even, then
\[
\int_a^b f(x)\,dx=\frac{h}{3}\Bigl[f(a)+4\sum_{k=1}^m f(a+(2k-1)h)+2\sum_{k=1}^{m-1}f(a+2kh)+f(b)\Bigr]-\frac{b-a}{180}h^4f^{(4)}(\xi)
\]
for some \(\xi\in(a,b)\). If \(n=3m\), the analogous 3/8 formula holds with leading error coefficient \(-3(b-a)h^4/80\). (Burden, Faires, Burden, *Numerical Analysis*, 10e, §4.1.)

## 8. Visual — diagram or schematic
```text
x0      x1      x2      x3      x4      x5
 |-------|-------|-------|-------|-------|
   h       h       h       h       h
   \_____/
   parabola (1/3)
           \_____/
           parabola (1/3)
                   \_____/
                   parabola (1/3)
```
Each parabolic arc is integrated exactly; adjacent arcs share the interior node whose coefficient becomes 2 after addition.

## 9. The memory technique
**The hook**  
Picture a chain of roller-coaster parabolas (1/3) or cubic humps (3/8) laid end-to-end across the interval; the weights 1-4-1 or 3-9-9-3 are the “tickets” collected at each station.

**What to overlearn**  
- 1-4-2-4-…-1 pattern for even panels.  
- 3-9-9-3 pattern for multiples of three.  
- Global error order \(O(h^4)\) for both rules.

**Spaced-repetition schedule**  
Review the two composite formulas at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive any panel weight by integrating the Lagrange cardinal polynomials on \([0,nh]\) with symbolic software or by hand; the arithmetic is only four lines long.

## 10. What this unlocks
Composite Simpson rules are the gateway to all higher-order Newton–Cotes and Clenshaw–Curtis quadratures, to Romberg integration (which accelerates the \(O(h^4)\) error by extrapolation), and to the error-control logic inside adaptive quadrature libraries.

- Gaussian quadrature on non-uniform nodes  
- Adaptive Simpson with automatic panel bisection  
- Richardson extrapolation and Romberg tableau  
- Spectral collocation methods that replace polynomials by global Chebyshev interpolants

## 11. Self-check — five questions, no answers
1. Derive the coefficient 4 in the interior of the composite 1/3 rule by adding two adjacent single-panel formulas.  
2. Compute the composite 1/3 approximation to \(\int_0^{\pi/2}\sin x\,dx\) with \(n=4\) and compare the absolute error with the theoretical bound.  
3. Show that the 3/8 rule integrates cubics exactly but not quartics; exhibit a concrete quartic counter-example.  
4. A partition has 7 subintervals. Which combination of 1/3 and 3/8 panels yields a valid quadrature, and what is the coefficient of the node that lies at the junction?  
5. Explain why the global error remains \(O(h^4)\) even though the 3/8 rule has a smaller local truncation constant than the 1/3 rule.