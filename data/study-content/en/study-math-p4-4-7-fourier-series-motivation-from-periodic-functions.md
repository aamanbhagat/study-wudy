## 1. The one-sentence answer
**Fourier series express a periodic function as an infinite linear combination of sines and cosines whose frequencies are integer multiples of a single fundamental frequency.**

A periodic function repeats its values after a fixed interval called the period. The simplest repeating patterns are pure sine and cosine waves. Any more complicated periodic shape can be built by adding these waves together, provided their frequencies are chosen as exact multiples of the base frequency set by the period. The coefficients in the sum are fixed by integrals that measure how much of each pure wave is present in the original function.

This decomposition is forced upon us once we insist on solving linear partial differential equations on an interval with periodic boundary conditions. Separation of variables then produces eigenfunctions that are precisely these sines and cosines; the series is the most general superposition that satisfies the boundary conditions.

> [!NOTE]
> The decisive insight is that periodicity discretizes the allowed frequencies; without periodicity the same idea produces a continuous Fourier integral instead of a series.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, the ASML EUV lithography scanners model periodic mask patterns with Fourier series to compute diffraction orders that determine feature fidelity at the 3 nm node.  

Aircraft wing flutter analysis at Boeing relies on periodic aerodynamic loads expressed via Fourier series inside the linearized Navier–Stokes solver; the resulting frequency-domain system is solved for each harmonic before time-domain reconstruction.  

In gravitational-wave astronomy, the LIGO-Virgo collaboration matches detector strain data against template banks that contain Fourier-series representations of the inspiral chirp when the signal is folded over many orbital periods of a binary neutron-star system.  

Climate-model ensembles at the European Centre for Medium-Range Weather Forecasts expand the diurnal and seasonal cycles of radiative forcing as Fourier series so that the spectral dynamical core can integrate the primitive equations exactly at those discrete frequencies.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Periodicity of a function | The entire construction collapses if \(f(x+T)\neq f(x)\); the period \(T\) fixes the fundamental frequency. |
| Inner-product integrals   | Coefficients are extracted by orthogonality integrals; without \(L^2\) integration the series cannot be computed. |
| Convergence of sequences of functions | The partial sums must approach the target function in a controlled sense (pointwise, uniform, or \(L^2\)). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Periodicity forces a discrete frequency grid
A function that repeats every \(T\) seconds cannot contain arbitrary frequencies; any admissible frequency must complete an integer number of cycles in time \(T\).

Consider the pure tone \(\sin(2\pi t/T)\). It returns to the same value after exactly \(T\). The next admissible tone is \(\sin(4\pi t/T)\), and so on.

Formally, the admissible angular frequencies are
\[
\omega_n = \frac{2\pi n}{T},\qquad n\in\mathbb{Z}.
\]

> [!WARNING]
> Using a non-integer multiple of \(2\pi/T\) produces a function that fails to match at the endpoints \(x=0\) and \(x=T\), destroying periodicity.

### Step 2 — Orthogonality on one period
Distinct admissible frequencies are orthogonal with respect to the \(L^2\) inner product on \([0,T]\).

Direct integration yields
\[
\int_0^T \sin\left(\frac{2\pi m}{T}x\right)\sin\left(\frac{2\pi n}{T}x\right)\,dx = \frac{T}{2}\delta_{mn},\qquad m,n\geq 1.
\]

> [!WARNING]
> Forgetting the normalization factor \(T/2\) produces coefficients that are off by a constant and ruins later reconstructions.

### Step 3 — Projection onto each harmonic
Any square-integrable periodic function can be projected onto each basis function by the inner-product formula.

The cosine coefficient is therefore
\[
a_n = \frac{2}{T}\int_0^T f(x)\cos\left(\frac{2\pi n}{T}x\right)\,dx.
\]

### Step 4 — Assembling the formal series
Collecting all projections supplies the candidate expansion
\[
f(x)\sim\frac{a_0}{2}+ \sum_{n=1}^\infty\Bigl(a_n\cos\bigl(\tfrac{2\pi n}{T}x\bigr)+b_n\sin\bigl(\tfrac{2\pi n}{T}x\bigr)\Bigr).
\]

### Step 5 — Convergence in \(L^2\)
If \(f\in L^2([0,T])\) and is extended periodically, the partial sums converge to \(f\) in the \(L^2\) norm (Parseval’s identity holds).

This is the textbook statement that justifies calling the right-hand side the Fourier series of \(f\).

## 5. Worked examples — every step shown

**Example 1 — Constant function**  
*Given:* \(f(x)=3\) on \([0,2\pi]\), period \(T=2\pi\).  
*Find:* its Fourier series.  

The constant term is
\[
a_0=\frac{1}{\pi}\int_0^{2\pi}3\,dx=6.
\]
All other integrals of \(\cos(nx)\) or \(\sin(nx)\) against a constant vanish by direct evaluation.  
**Final answer**  
\[
3.
\]

*Reflection:* The example shows that a function already equal to one harmonic needs only that coefficient; the rest are automatically zero.

**Example 2 — Sawtooth wave**  
*Given:* \(f(x)=x\) on \((-\pi,\pi)\), extended periodically.  
*Find:* the Fourier series.  

Because the function is odd, all \(a_n=0\). The sine coefficients are
\[
b_n=\frac{2}{\pi}\int_0^\pi x\sin(nx)\,dx= \frac{2(-1)^{n+1}}{n}.
\]
Hence
\[
f(x)\sim 2\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}\sin(nx).
\]

*Reflection:* Integration by parts appears once; the boundary term at \(\pi\) supplies the alternating sign.

**Example 3 — Square wave**  
*Given:* \(f(x)=1\) for \(0<x<\pi\), \(f(x)=-1\) for \(-\pi<x<0\), period \(2\pi\).  
*Find:* the series.  

Only odd harmonics survive:
\[
f(x)\sim\frac{4}{\pi}\sum_{k=0}^\infty\frac{\sin((2k+1)x)}{2k+1}.
\]

*Reflection:* Discontinuities slow convergence; Gibbs ringing appears near jumps.

**Example 4 — Piecewise quadratic**  
*Given:* \(f(x)=x^2\) on \([-\pi,\pi]\).  
*Find:* the full series up to \(n=2\).  

Even function, so
\[
a_0=\frac{2}{\pi}\int_0^\pi x^2\,dx=\frac{2\pi^2}{3},\qquad a_2=\frac{2}{\pi}\int_0^\pi x^2\cos(2x)\,dx=-1.
\]
All other coefficients through \(n=2\) vanish.  
**Final answer**  
\[
\frac{\pi^2}{3}- \cos(2x)+\cdots
\]

*Reflection:* Polynomial times cosine still integrates in closed form via parts twice.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using period \(2L\) when interval length is \(L\) | Confusion between full period and half-range | Always verify \(f(x+T)=f(x)\) explicitly before writing \(\omega=2\pi/T\). |
| Omitting the factor \(1/2\) in \(a_0\) | Historical convention clash | Compute \(a_0\) from the same formula as \(a_n\) and halve only the constant term. |
| Integrating over the wrong interval | Forgetting the series is periodic | Extend the integrand periodically or restrict strictly to one period. |
| Expecting pointwise convergence everywhere | Gibbs phenomenon at jumps | State \(L^2\) convergence first; add uniform convergence only after checking smoothness. |
| Sign error in \(b_n\) for odd functions | Losing track of integration limits | Always integrate from \(-\pi\) to \(\pi\) or exploit symmetry before evaluating. |
| Treating the series as finite | Truncation error mistaken for exact solution | Keep the summation symbol until the PDE solution is verified to satisfy the equation. |
| Normalizing with \(T\) instead of \(2\pi\) | Mixing normalized and un-normalized bases | Fix the period at the outset and keep \(2\pi n/T\) throughout. |

## 7. The textbook-precise statement
Let \(f\in L^2([-\pi,\pi])\). Its Fourier series is
\[
\frac{a_0}{2}+\sum_{n=1}^\infty(a_n\cos nx+b_n\sin nx),
\]
where
\[
a_n=\frac1\pi\int_{-\pi}^\pi f(x)\cos(nx)\,dx,\qquad n\geq0,
\]
\[
b_n=\frac1\pi\int_{-\pi}^\pi f(x)\sin(nx)\,dx,\qquad n\geq1.
\]
If in addition \(f\) is \(2\pi\)-periodic and of bounded variation, the series converges pointwise to \(f(x)\) at every point of continuity (Jordan’s criterion). (See Strauss, *Partial Differential Equations*, 2e, §5.3.)

## 8. Visual — diagram or schematic
```text
x-axis:  -π ---- 0 ---- π ---- 2π ---- 3π
f(x):    sawtooth rising linearly from -π to π, then jumps down
Harmonics: sin(x)  (1 cycle), sin(2x) (2 cycles), sin(3x) (3 cycles) …
Superposition arrow → partial sum approximates the sawtooth with increasing oscillations near the jump.
```
The diagram shows three periods of the sawtooth together with the first three sine harmonics aligned at the same phase; their weighted sum visibly reduces the error away from the discontinuity.

## 9. The memory technique
1. **The hook** — Picture a piano string vibrating only at integer multiples of its fundamental pitch; every periodic forcing is simply a chord played on that string.  
2. **What to overlearn** — The formulas for \(a_n\) and \(b_n\), and the fact that \(\int_0^T\cos(2\pi mx/T)\cos(2\pi nx/T)\,dx=(T/2)\delta_{mn}\).  
3. **Spaced-repetition schedule** — Review the orthogonality integral at 1 day, recompute the sawtooth coefficients at 3 days, prove Parseval at 7 days, derive the heat-equation solution at 16 days, and reconstruct a square-wave Gibbs sum at 35 days.  
4. **First-principles fallback** — Begin from the inner-product definition, integrate by parts to obtain coefficients, then invoke completeness of the trigonometric system in \(L^2\).

## 10. What this unlocks
Fourier series supply the eigenfunction expansion needed for separation of variables on periodic domains, which immediately generalizes to the Fourier transform on the line and to Sturm–Liouville theory on bounded intervals.

- Heat equation on a circle  
- Wave equation with periodic boundary conditions  
- Laplace equation in an annulus  
- Spectral methods in computational fluid dynamics  

## 11. Self-check — five questions, no answers
1. Compute the Fourier coefficients of \(f(x)=\lvert x\rvert\) on \([-\pi,\pi]\).  
2. Does the Fourier series of a continuous periodic function always converge uniformly?  
3. A function satisfies \(f(x+1)=f(x)\). Write the admissible frequencies in radians per unit length.  
4. Identify the error: a student integrates the coefficient formula from \(0\) to \(2\pi\) but uses period \(4\pi\).  
5. Prove that if \(f\) is even then all sine coefficients vanish, using only the integral definitions.