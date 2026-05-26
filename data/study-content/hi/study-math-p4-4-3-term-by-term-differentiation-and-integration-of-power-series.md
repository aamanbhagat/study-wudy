## 1. The one-sentence answer
**Term-by-term differentiation and integration of power series means you can differentiate or integrate a power series inside its open interval of convergence exactly as if it were a finite polynomial, and the resulting series still converges to the derivative or integral of the original sum.**

A power series \(\sum a_n(x-c)^n\) represents a function \(f(x)\) inside its radius of convergence \(R\). Differentiating term by term produces \(\sum n a_n(x-c)^{n-1}\), which equals \(f'(x)\) for all \(|x-c|<R\). The same holds for integration. Outside the open interval the operation may fail even if the new series converges.

This works because uniform convergence on compact subintervals inside \((-R,R)\) lets you interchange the limit (the infinite sum) with the derivative or integral operators. The radius itself stays exactly the same; only the endpoints need separate checking.

> [!NOTE]
> The single most important “aha” is that differentiation lowers the degree of each term yet never shrinks the radius; the analytic character of the function is preserved throughout the entire open interval.

## 2. Why this matters — concrete and current
In orbital-mechanics software at NASA’s Jet Propulsion Laboratory, the gravitational potential of an irregular asteroid is expanded as a power series in spherical harmonics; term-by-term differentiation yields the force field used for real-time trajectory corrections.

Semiconductor-device simulators (Synopsys TCAD, Silvaco) expand carrier-density profiles around a bias point as power series; integration term by term produces total charge and capacitance values that feed directly into SPICE models for 3 nm node design.

Transformer-based language models rely on analytic approximations of activation functions such as GELU; the series for the error function is integrated term by term to obtain cheap, differentiable surrogates that run on edge TPUs.

In high-energy physics, the perturbative expansion of the scattering amplitude in quantum field theory is a power series in the coupling constant; integration term by term generates higher-loop contributions that are compared against LHC data.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Power series definition  | You must already know radius \(R\) and interval of convergence before any operation. |
| Limit of functions       | Term-by-term operations are justified by interchanging limits with derivatives.      |
| Uniform convergence      | On any compact subinterval inside \((-R,R)\) the convergence is uniform, enabling interchange. |
| Derivative of polynomials| The finite case is obvious; the infinite case reduces to controlling the remainder.  |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the finite case you already trust
A polynomial can be differentiated or integrated term by term with no restrictions. Write the partial sum \(s_N(x)=\sum_{n=0}^N a_n(x-c)^n\). Then \(s_N'(x)=\sum_{n=1}^N n a_n(x-c)^{n-1}\) exactly.

### Step 2 — Take the limit and ask what survives
Let \(N\to\infty\). The question is whether \(\lim s_N'(x)\) equals the derivative of \(\lim s_N(x)\). Inside the open disk of convergence the answer is yes.

### Step 3 — Radius stays invariant
Differentiating multiplies the general term by \(n\) and lowers the power by one; the root test still yields the same radius \(R\). Integration raises the power and divides by \(n+1\); again \(R\) is unchanged.

### Step 4 — Uniform convergence on compact subsets
On any closed interval \([c-r,c+r]\) with \(r<R\), Weierstrass M-test supplies a convergent numerical series that dominates the differentiated terms, proving uniform convergence.

### Step 5 — Interchange theorem
Uniform convergence of the differentiated series plus continuity of each term lets you pass the derivative inside the sum, giving \(f'(x)=\sum n a_n(x-c)^{n-1}\) for \(|x-c|<R\).

### Step 6 — Endpoint behaviour is independent
At the endpoints \(x=c\pm R\) the differentiated series may diverge even when the original converges; always test separately.

### Step 7 — Integration version
Integrating term by term from \(c\) to \(x\) produces \(\int_c^x f(t)\,dt=\sum\frac{a_n}{n+1}(x-c)^{n+1}\) with the same radius \(R\).

### Step 8 — Textbook-grade statement
If \(f(x)=\sum_{n=0}^\infty a_n(x-c)^n\) for \(|x-c|<R\), then \(f\) is infinitely differentiable on that interval, each derivative is obtained by term-by-term differentiation, and every antiderivative is obtained by term-by-term integration.

> [!WARNING]
> Forgetting to verify endpoints after differentiation is the most common source of incorrect radius claims.

## 5. Worked examples — har step show karo

**Example 1 — Geometric series differentiation**  
*Given:* \(f(x)=\sum_{n=0}^\infty x^n=\frac{1}{1-x}\) for \(|x|<1\).  
*Find:* \(f'(x)\).  
Differentiate term by term: \(\sum_{n=1}^\infty n x^{n-1}\).  
*Why:* The radius remains 1, so the equality holds on \((-1,1)\).  
**Final answer** \(\sum_{n=1}^\infty n x^{n-1}=\frac{1}{(1-x)^2}\).

*Reflection:* The example is easy yet shows that the differentiated series converges on exactly the same open interval.

**Example 2 — Integration of geometric series**  
*Given:* Same series.  
*Find:* \(\int_0^x\frac{1}{1-t}\,dt\).  
Integrate term by term: \(\sum_{n=0}^\infty\frac{x^{n+1}}{n+1}\).  
*Why:* Integration preserves radius 1.  
**Final answer** \(-\ln(1-x)=\sum_{n=1}^\infty\frac{x^n}{n}\) for \(|x|<1\).

*Reflection:* The logarithm appears naturally; the constant term vanishes because the lower limit is zero.

**Example 3 — Radius check after differentiation**  
*Given:* \(\sum_{n=1}^\infty\frac{x^n}{n^2}\), \(R=1\).  
Differentiate: \(\sum_{n=1}^\infty\frac{x^{n-1}}{n}\).  
*Why:* Root test still gives radius 1; at \(x=1\) the differentiated series becomes the harmonic series and diverges.  
**Final answer** The differentiated series converges on \((-1,1)\) only.

*Reflection:* Endpoints must be examined afresh after each differentiation.

**Example 4 — Twice differentiated series**  
*Given:* \(\sum_{n=0}^\infty\frac{(-1)^n x^{2n}}{(2n)!}\) (cosine).  
Differentiate twice: \(-\sum_{n=1}^\infty\frac{(-1)^n x^{2n-2}}{(2n-2)!}\).  
*Why:* Radius remains infinite; the result equals \(-\cos x\).  
**Final answer** \(-\cos x=-\sum_{n=0}^\infty\frac{(-1)^n x^{2n}}{(2n)!}\).

*Reflection:* Repeated differentiation stays valid on the whole real line.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using the differentiated series at an endpoint | Students forget radius invariance does not extend to endpoints | Always re-test \(x=c\pm R\) after differentiation    |
| Assuming the constant of integration is zero | Integration from an arbitrary point adds a constant | Fix lower limit explicitly (usually \(c\))           |
| Confusing pointwise with uniform convergence | Limit and derivative interchange needs uniformity   | Invoke Weierstrass M-test on compact subintervals    |
| Forgetting the factor \(n\)       | Mechanical term-by-term copying error               | Write the general term explicitly before differentiating |
| Changing the centre of expansion  | Shifting \(c\) alters coefficients                  | Keep the same \(c\) throughout                       |

## 7. The textbook-precise statement
Theorem (Stewart, Calculus, 9e, §11.9). Let \(\sum_{n=0}^\infty a_n(x-c)^n\) have radius of convergence \(R>0\). If \(f(x)=\sum_{n=0}^\infty a_n(x-c)^n\) for \(|x-c|<R\), then \(f\) is differentiable on \((c-R,c+R)\) and  
\[f'(x)=\sum_{n=1}^\infty n a_n(x-c)^{n-1},\qquad |x-c|<R.\]  
Moreover, the integrated series  
\[\int_c^x f(t)\,dt=\sum_{n=0}^\infty\frac{a_n}{n+1}(x-c)^{n+1}\]  
also converges to the integral on the same open interval. The radius of both new series is exactly \(R\).

## 8. Visual — diagram or schematic
```text
          c-R               c                 c+R
           |----------------|----------------|
 interval: open              closed            open
 diff'ble: yes               yes               yes
 at ends:  check separately  check separately  check separately
```
The vertical bars mark the endpoints; the open interval between them is where term-by-term operations are always valid.

## 9. The memory technique

**The hook**  
Picture the power series as an infinite conveyor belt of terms; differentiation is simply pressing a “multiply-by-n and shift left” button that never jams inside the safety zone \((-R,R)\).

**What to overlearn**  
- Radius \(R\) is invariant under term-by-term differentiation or integration.  
- The equality holds strictly inside the open interval.  
- Endpoints must be tested independently after each operation.

**Spaced-repetition schedule**  
Review the radius-invariance fact after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget the theorem, return to the Weierstrass M-test on \([c-r,c+r]\) with \(r<R\); uniform convergence justifies interchanging sum and derivative.

## 10. What this unlocks
You can now manipulate Taylor series of elementary functions, derive power-series solutions of differential equations, and justify term-by-term operations inside analytic-function theory.

- Taylor’s theorem with remainder  
- Power-series method for ODEs (Frobenius)  
- Analytic continuation along paths  
- Generating-function techniques in combinatorics

## 11. Self-check — five questions, no answers
1. Differentiate \(\sum_{n=0}^\infty\frac{x^n}{n!}\) term by term and state the radius.  
2. Integrate \(\sum_{n=1}^\infty(-1)^n\frac{x^n}{n}\) from 0 to \(x\) and identify the resulting function inside the interval of convergence.  
3. Does term-by-term differentiation preserve convergence at the endpoint \(x=R\)? Give a counter-example.  
4. A student claims that \(\sum n^2 x^n\) has radius 1. Verify and then differentiate twice; what is the new radius?  
5. Explain why uniform convergence on compact subintervals is essential for justifying term-by-term differentiation.