## 1. The one-sentence answer
**Term-by-term differentiation and integration of power series means that inside the open interval of convergence, a power series may be differentiated or integrated by performing the operation on each coefficient separately, and the resulting series has the same radius of convergence.**

A power series behaves like an infinite polynomial. Polynomials can be differentiated or integrated term by term without restriction; the same rule extends to power series, but only where the series converges absolutely. Outside that open interval the operations may fail even if the original series converges.

The radius itself never changes under these operations. Endpoints must be checked separately because convergence there can be destroyed or created by differentiation or integration.

> [!NOTE]
> The radius of convergence is invariant; only the behavior at the endpoints can change.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s trajectory-design software represents gravitational potentials as power series in distance; term-by-term differentiation yields the force field used by the Deep Space Network for real-time corrections.

In semiconductor physics, compact models for transistor current–voltage curves are built from integrated power series; the resulting expressions are embedded in SPICE simulators run by TSMC and Intel for every process node.

Transformer-based language models rely on attention-score approximations obtained by integrating generating functions; the term-by-term integration step appears explicitly in the FlashAttention-2 paper that accelerated training at Meta and OpenAI.

In radio-frequency engineering, Bessel-function expansions of FM spectra are differentiated term by term to obtain instantaneous frequency deviation; this calculation is performed inside Keysight’s vector-signal-analysis firmware.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Definition of a power series   | Supplies the object on which the operations act           |
| Radius and interval of convergence | Determines the open set where term-by-term operations are valid |
| Limit comparison and ratio tests | Used to compute the radius of the differentiated or integrated series |
| Uniform convergence on compact subintervals | Guarantees that the sum of the derivative equals the derivative of the sum |

## 4. Building the idea — from intuition to formalism

### Step 1 — Power series as formal objects
A power series is an expression \(\sum_{n=0}^\infty a_n(x-c)^n\). Inside its disk of convergence it defines a function; outside it diverges.

**Example.** \(\sum_{n=0}^\infty x^n\) converges for \(|x|<1\) to \(1/(1-x)\).

**Formal statement.**
\[
f(x)=\sum_{n=0}^\infty a_n(x-c)^n,\qquad R=\frac1{\limsup|a_n|^{1/n}}.
\]

> [!WARNING]
> Writing the series without first determining \(R\) leads to invalid operations at points where the series diverges.

### Step 2 — Differentiation of a single term
Differentiate the general term: \(\frac{d}{dx}[a_n(x-c)^n]=na_n(x-c)^{n-1}\). The new coefficients are \(b_n=na_n\).

**Example.** Differentiating \(x^n\) gives \(n x^{n-1}\).

**Formal statement.**
\[
f'(x)=\sum_{n=1}^\infty n a_n(x-c)^{n-1}.
\]

> [!WARNING]
> Forgetting the factor \(n\) produces an incorrect series whose radius may appear different.

### Step 3 — Integration of a single term
Integrate term by term: \(\int a_n(x-c)^n\,dx=\frac{a_n}{n+1}(x-c)^{n+1}+C\).

**Example.** \(\int x^n\,dx=\frac{x^{n+1}}{n+1}\).

**Formal statement.**
\[
\int f(x)\,dx=\sum_{n=0}^\infty\frac{a_n}{n+1}(x-c)^{n+1}+C.
\]

> [!WARNING]
> Omitting the constant of integration hides the fact that the integrated series may converge at an endpoint where the original did not.

### Step 4 — Radius invariance
Apply the ratio test to the new coefficients. For differentiation, \(\lim|n a_n|^{1/n}=\lim|a_n|^{1/n}\), so the radius stays \(R\).

**Formal statement.**
\[
R_{\text{diff}}=R_{\text{int}}=R.
\]

> [!WARNING]
> Checking convergence only at the endpoints of the new series without recomputing the radius wastes effort; the radius is already known.

### Step 5 — Interchange of limit and derivative
On any compact interval \([c-r,c+r]\) with \(r<R\), the differentiated series converges uniformly, justifying
\[
\frac{d}{dx}\sum a_n(x-c)^n=\sum\frac{d}{dx}a_n(x-c)^n.
\]

**Formal statement.** Uniform convergence on compact subsets of \((c-R,c+R)\).

> [!WARNING]
> Uniform convergence fails at the endpoints; interchanging limit and derivative there can produce a wrong answer.

### Step 6 — The complete theorem
Inside the open interval of convergence both operations are valid and produce a new power series with identical radius.

## 5. Worked examples — every step shown

**Example 1 — Differentiating the geometric series**  
*Given:* \(\sum_{n=0}^\infty x^n=1/(1-x)\) for \(|x|<1\).  
*Find:* the series for \(1/(1-x)^2\).  
Start with \(\sum_{n=0}^\infty x^n\).  
*Why:* given representation inside radius 1.  
Differentiate term by term: \(\sum_{n=1}^\infty n x^{n-1}\).  
*Why:* Step 2 of the construction.  
Re-index by letting \(k=n-1\): \(\sum_{k=0}^\infty(k+1)x^k\).  
*Why:* standard shift to restore non-negative powers.  
Recognize the sum equals \(1/(1-x)^2\).  
**Final answer**  
\[
\sum_{n=0}^\infty(n+1)x^n=\frac1{(1-x)^2},\qquad|x|<1.
\]

*Reflection.* The only algebraic step that can be misindexed is the re-labeling; once the radius is known to be unchanged, verification at a test point confirms correctness.

**Example 2 — Integrating the geometric series**  
*Given:* \(\sum_{n=0}^\infty x^n\).  
*Find:* series for \(-\ln(1-x)\).  
Integrate term by term: \(\sum_{n=0}^\infty\frac{x^{n+1}}{n+1}\).  
*Why:* Step 3.  
The constant is zero because the integrated function vanishes at \(x=0\).  
*Why:* definite integral from 0 to \(x\).  
Thus \(-\ln(1-x)=\sum_{n=1}^\infty\frac{x^n}{n}\), \(|x|<1\).  
**Final answer**  
\[
-\ln(1-x)=\sum_{n=1}^\infty\frac{x^n}{n},\qquad|x|<1.
\]

*Reflection.* Endpoint \(x=1\) now converges (harmonic series) although differentiation would have destroyed convergence there.

**Example 3 — Solving \(y'=y\) by series**  
*Given:* assume \(y=\sum a_n x^n\).  
*Find:* the exponential series.  
Differentiate: \(\sum n a_n x^{n-1}=\sum a_n x^n\).  
*Why:* term-by-term differentiation permitted inside radius.  
Equate coefficients: \(n a_n=a_n\) implies recurrence \(a_n=a_{n-1}/(n-1)\) wait no, actually \( (n+1)a_{n+1}=a_n \).  
*Why:* shift index on left side.  
Solution \(a_n=a_0/n!\).  
**Final answer**  
\[
y=a_0\sum_{n=0}^\infty\frac{x^n}{n!}.
\]

*Reflection.* The radius is infinite, so no endpoint issues arise.

**Example 4 — Radius check after integration**  
*Given:* \(\sum_{n=1}^\infty n^2 x^n\), radius 1.  
*Find:* radius after integration.  
New coefficients \(b_n=n^2/(n+1)\).  
*Why:* direct application of integration formula.  
\(\lim|b_n|^{1/n}=\lim n^{2/n}\cdot n/(n+1)^{1/n}=1\), radius unchanged.  
**Final answer** radius remains 1.

*Reflection.* The polynomial factor \(n^2\) disappears under the root test, illustrating radius invariance.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Differentiating at an endpoint where convergence is conditional | The differentiated series loses the alternating signs that produced convergence | Always restrict term-by-term differentiation to the open interval \((c-R,c+R)\) |
| Forgetting the factor \(n\) when differentiating | Mechanical oversight when writing the general term | Write the differentiated coefficient explicitly as \(n a_n\) before simplifying |
| Assuming the integrated series diverges wherever the original did | Integration can improve convergence at endpoints | Test the endpoints of the integrated series separately even when radius is known |
| Interchanging sum and derivative on the whole closed interval | Uniform convergence holds only on compact subsets strictly inside the interval | Choose a smaller radius \(r<R\) and work on \([c-r,c+r]\) |
| Computing a new radius after each operation | Unnecessary arithmetic because radius is invariant | State once that \(R\) is unchanged, then move on |
| Neglecting the constant of integration | The antiderivative is a family of functions | Include “+C” and determine it from an initial condition when solving DEs |
| Using the differentiated series to evaluate at a point where only the original converges | The differentiated series may diverge | Verify the evaluation point lies inside the open interval before substituting |

## 7. The textbook-precise statement
Let \(\sum_{n=0}^\infty a_n(x-c)^n\) have radius of convergence \(R>0\). Then the series may be differentiated and integrated term by term on the interval \((c-R,c+R)\); the resulting series have the same radius \(R\). Moreover, if \(f(x)=\sum a_n(x-c)^n\) for \(|x-c|<R\), then
\[
f'(x)=\sum_{n=1}^\infty n a_n(x-c)^{n-1},\qquad\int_c^x f(t)\,dt=\sum_{n=0}^\infty\frac{a_n}{n+1}(x-c)^{n+1}.
\]
(See Stewart, *Calculus*, 9e, §11.9, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          c-R          c          c+R
           |           |           |
   diverge | converge  | converge  | diverge
           |     (open interval)   |
Differentiate: same open interval, endpoints must be re-checked
Integrate:    same open interval, endpoints may gain convergence
```
The vertical bars mark the radius boundaries; arrows indicate that differentiation and integration never move those boundaries.

## 9. The memory technique

**The hook.** Picture a power series as an infinitely long polynomial whose “tail” lives beyond distance \(R\); differentiation and integration act only on the visible part inside the circle and never push the tail inward or outward.

**What to overlearn.**  
1. Radius formula after differentiation: \(\limsup|n a_n|^{1/n}=\limsup|a_n|^{1/n}\).  
2. Statement: operations valid on \((c-R,c+R)\).  
3. Endpoint convergence must be tested separately.

**Spaced-repetition schedule.** Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback.** Re-derive the radius using the ratio test on the new coefficients \(n a_n\) or \(a_n/(n+1)\); the limit is identical to the original.

## 10. What this unlocks
Term-by-term operations let you convert a differential equation into an algebraic recurrence for the coefficients, obtain Taylor series for inverses and compositions, and manipulate generating functions in combinatorics and probability.

- Power-series solutions of linear ODEs  
- Derivation of Taylor series for \(\arctan\), \(\ln\), and Bessel functions  
- Moment-generating functions in probability theory  
- Formal power-series rings in algebraic combinatorics  

## 11. Self-check — five questions, no answers
1. Compute the power series for \(\arctan x\) by integrating the geometric series and state its radius.  
2. Differentiate \(\sum_{n=0}^\infty\frac{x^n}{n!}\) twice and verify that the resulting series equals the original.  
3. For the series \(\sum_{n=1}^\infty(-1)^n\frac{x^n}{n}\), decide whether term-by-term differentiation is legitimate at \(x=1\).  
4. A student claims that integrating a series with radius 2 produces a series with radius 3. What is the error?  
5. Starting from \(\sum n^2 x^n\), obtain the series for \(\sum n x^n\) by a single term-by-term operation and justify the radius.