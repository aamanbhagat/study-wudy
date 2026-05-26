## 1. The one-sentence answer
**The coefficients of the full Fourier series of a function \(f\) on an interval of length \(2L\) are the inner products of \(f\) against the orthogonal set \(\{1, \cos(n\pi x/L), \sin(n\pi x/L)\}\).**

The Fourier series expands a periodic function by superposing constant, cosine, and sine terms whose frequencies are integer multiples of the fundamental frequency fixed by the period. Because these trigonometric functions are orthogonal with respect to the \(L^2\) inner product on one period, every coefficient isolates itself when the series is multiplied by the corresponding basis function and integrated. The resulting formulas therefore contain only a single integral each; no simultaneous equations appear.

This construction works for any integrable \(f\) whose periodic extension satisfies mild regularity conditions; the orthogonality relations themselves are proved by direct trigonometric identities and do not require the series to converge first.

> [!NOTE]
> Orthogonality is the single fact that turns an apparently infinite system of unknowns into explicit, independent integrals; everything else is bookkeeping with the normalization constants.

## 2. Why this matters — concrete and current
NASA’s Parker Solar Probe records magnetic-field time series that are decomposed into full Fourier series to separate the periodic solar-rotation signal from transient coronal-mass-ejection spikes; the sine and cosine coefficients feed directly into onboard Kalman filters that decide attitude corrections.

In semiconductor lithography, ASML’s EUV scanners model wafer-stage vibrations as Fourier series; the derived coefficients determine the exact temporal frequencies that must be notch-filtered in the control loop to keep overlay error below 1 nm.

Climate models at the European Centre for Medium-Range Weather Forecasts project surface-temperature fields onto spherical harmonics whose latitudinal factors are full Fourier series in longitude; the coefficients are updated every six hours in the operational assimilation cycle.

Audio-compression codecs such as Opus compute short-time Fourier coefficients on 20 ms frames; the explicit formulas allow the encoder to quantize only the largest \(a_n\) and \(b_n\) while discarding inaudible high-frequency terms, achieving transparent quality at 64 kbit/s.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Definite integral of products of sines and cosines | Supplies the orthogonality relations that isolate each coefficient |
| Even and odd functions | Simplifies many integrals to zero and halves the computational domain |
| \(L^2\) inner product on an interval | Gives the precise geometric meaning of the coefficient formulas |
| Uniform convergence versus pointwise convergence | Explains why term-by-term integration is justified for the coefficient derivation |

## 4. Building the idea — from intuition to formalism

### Step 1 — Periodicity fixes the frequencies
Any function that repeats every \(2L\) can be built from oscillations whose wavelengths are exactly \(2L/n\) for positive integers \(n\). The corresponding angular frequencies are therefore \(n\pi/L\).

**Example.** On \([-L,L]\) the functions \(\cos(\pi x/L)\) and \(\sin(2\pi x/L)\) each complete exactly one and two full cycles, respectively.

Formally, the candidate series is
\[
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty \Bigl( a_n\cos\frac{n\pi x}{L} + b_n\sin\frac{n\pi x}{L}\Bigr).
\]

> [!WARNING]
> Using the wrong fundamental frequency (e.g., \(2\pi/L\) instead of \(\pi/L\)) produces a set of functions that are not orthogonal on \([-L,L]\) and the coefficient integrals fail.

### Step 2 — Orthogonality of the trigonometric set
Direct integration using the product-to-sum identities yields
\[
\int_{-L}^L \cos\frac{m\pi x}{L}\cos\frac{n\pi x}{L}\,dx = L\delta_{mn}\quad(m,n\ge1),
\]
and analogous statements for sine–sine and sine–cosine pairs (the last always zero).

### Step 3 — Isolate the constant term
Integrate the series term by term from \(-L\) to \(L\). All trigonometric integrals vanish, leaving
\[
\int_{-L}^L f(x)\,dx = a_0 L,
\]
so
\[
a_0 = \frac1L\int_{-L}^L f(x)\,dx.
\]

### Step 4 — Isolate a cosine coefficient
Multiply the series by \(\cos(m\pi x/L)\) and integrate. Orthogonality kills every term except the \(m\)-th cosine:
\[
a_m = \frac1L\int_{-L}^L f(x)\cos\frac{m\pi x}{L}\,dx,\qquad m\ge1.
\]

### Step 5 — Isolate a sine coefficient
The identical procedure with \(\sin(m\pi x/L)\) produces
\[
b_m = \frac1L\int_{-L}^L f(x)\sin\frac{m\pi x}{L}\,dx,\qquad m\ge1.
\]

### Step 6 — Assemble the coefficient formulas
Collecting the three displayed integrals gives the complete set of Fourier coefficients on \([-L,L]\).

## 5. Worked examples — every step shown

**Example 1 — Constant function**  
*Given:* \(f(x)=3\) on \([- \pi,\pi]\).  
*Find:* all Fourier coefficients.  

Integrate once:
\[
a_0 = \frac1\pi\int_{-\pi}^\pi 3\,dx = 6.
\]
For \(n\ge1\),
\[
a_n = \frac1\pi\int_{-\pi}^\pi 3\cos(nx)\,dx = 0
\]
because the integrand is odd.  
Likewise \(b_n=0\).  

**Final answer**  
\[
\frac{a_0}{2}=3,\quad a_n=b_n=0.
\]

*Reflection.* The constant is recovered exactly by the \(a_0\) term; orthogonality automatically discards all oscillatory contributions.

**Example 2 — Odd linear function**  
*Given:* \(f(x)=x\) on \([- \pi,\pi]\).  
*Find:* coefficients.  

\(f\) is odd, so all \(a_n=0\). For \(b_n\),
\[
b_n = \frac1\pi\int_{-\pi}^\pi x\sin(nx)\,dx.
\]
Integration by parts (\(u=x\), \(dv=\sin(nx)dx\)) yields
\[
b_n = \frac{2(-1)^{n+1}}{n}.
\]

**Final answer**  
\[
b_n = \frac{2(-1)^{n+1}}{n}.
\]

*Reflection.* The factor 2 arises from evaluating the boundary term at both endpoints; the alternating sign tracks the parity of \(n\).

**Example 3 — Even quadratic**  
*Given:* \(f(x)=x^2\) on \([- \pi,\pi]\).  
*Find:* \(a_n\).  

Symmetry forces \(b_n=0\). Compute
\[
a_0 = \frac1\pi\int_{-\pi}^\pi x^2\,dx = \frac{2\pi^2}{3},
\]
\[
a_n = \frac2\pi\int_0^\pi x^2\cos(nx)\,dx = \frac{4(-1)^n}{n^2}.
\]

**Final answer**  
\[
\frac{a_0}{2}=\frac{\pi^2}{3},\qquad a_n=\frac{4(-1)^n}{n^2}.
\]

*Reflection.* Evenness halves the interval; the second integration by parts produces the \(1/n^2\) decay characteristic of twice-differentiable functions.

**Example 4 — Discontinuous square wave**  
*Given:* \(f(x)=-1\) for \(-\pi<x<0\), \(f(x)=1\) for \(0<x<\pi\).  
*Find:* coefficients.  

\(a_n=0\) by oddness. The sine integrals evaluate to
\[
b_n = \frac{4}{n\pi}\quad(n\text{ odd}),\qquad b_n=0\quad(n\text{ even}).
\]

**Final answer**  
\[
b_n = \frac{4}{n\pi}\ (n\text{ odd}).
\]

*Reflection.* The jump discontinuity slows decay to \(1/n\); Gibbs ringing appears near the jump because high-frequency coefficients remain appreciable.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using interval length \(2\pi\) when the period is \(2L\) | Automatic habit from the normalized case | Always insert the factor \(\pi/L\) in the arguments of sine and cosine before integrating |
| Forgetting the conventional \(a_0/2\) | Notation inconsistency between texts | Decide once whether the constant term is written \(a_0/2\) or \(a_0\) and keep the integral definition consistent |
| Integrating over \([0,2L]\) with formulas written for \([-L,L]\) | Shifting the interval without adjusting limits | Translate the function or change variables so the interval is symmetric before applying the listed formulas |
| Sign error in \(b_n\) for odd functions | Losing track of the sign in integration by parts | Keep the boundary term \([-uv]\) explicit and evaluate at both endpoints each time |
| Treating a piecewise function as continuous at the endpoints | Forgetting periodic extension may jump | Evaluate one-sided limits at \(\pm L\) and insert the average value if needed for convergence |
| Dividing by \(2L\) instead of \(L\) for \(a_n\) | Confusing total length with half-length normalization | Memorize that each cosine or sine has norm squared equal to \(L\) on \([-L,L]\) |
| Assuming all coefficients vanish for \(n\) larger than some cutoff | Expecting band-limited behavior | Verify decay rate from smoothness; discontinuous data never have finite support in frequency |

## 7. The textbook-precise statement
Let \(f\in L^1([-L,L])\). The Fourier coefficients of \(f\) are defined by
\[
a_0=\frac1L\int_{-L}^L f(x)\,dx,\qquad
a_n=\frac1L\int_{-L}^L f(x)\cos\frac{n\pi x}{L}\,dx\ (n\ge1),\qquad
b_n=\frac1L\int_{-L}^L f(x)\sin\frac{n\pi x}{L}\,dx\ (n\ge1).
\]
The associated trigonometric series is
\[
\frac{a_0}{2}+\sum_{n=1}^\infty\Bigl(a_n\cos\frac{n\pi x}{L}+b_n\sin\frac{n\pi x}{L}\Bigr).
\]
(See Strauss, *Partial Differential Equations*, 2e, §3.2, Theorem 1.)

## 8. Visual — diagram or schematic
```text
x = -L ---------------- 0 ---------------- +L
     |                  |                  |
   cos(πx/L)     cos(2πx/L)      cos(3πx/L)
     |______/\_|      |____/\_|      |___/\_|
     |                  |                  |
   sin(πx/L)     sin(2πx/L)      sin(3πx/L)
     |\_|    |\_|     |\_|    |\_|     |\_|    |\_|
```
The diagram shows the first three cosine and sine basis functions on \([-L,L]\). Vertical dashed lines mark the endpoints; each cosine begins and ends at the same height, each sine begins and ends at zero, illustrating the periodicity that will be imposed after the coefficients are computed.

## 9. The memory technique

1. **The hook** — Picture an old-fashioned radio dial: the constant term \(a_0\) is the station’s carrier power; each pair \((a_n,b_n)\) is a tuned LC circuit that extracts only its own frequency because every other station is orthogonal (null response) on the shared antenna.

2. **What to overlearn** — The three integral formulas for \(a_0,a_n,b_n\) together with the normalization factor \(1/L\); the orthogonality integral \(\int_{-L}^L\cos(m\pi x/L)\cos(n\pi x/L)\,dx=L\delta_{mn}\).

3. **Spaced-repetition schedule** — Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback** — Re-derive any coefficient by writing the inner-product definition \(\langle f,\phi_n\rangle/\langle\phi_n,\phi_n\rangle\) and evaluating the denominator integral once.

## 10. What this unlocks
With the coefficients in hand one can separate variables in the heat, wave, and Laplace equations on rectangles or disks, obtain explicit series solutions, and justify term-by-term differentiation under suitable decay conditions.

- Separation of variables for the one-dimensional heat equation
- Eigenfunction expansions on finite intervals
- Gibbs phenomenon and convergence theory
- Fast Fourier transform algorithms that compute the same coefficients in \(O(N\log N)\) time

## 11. Self-check — five questions, no answers
1. Compute the Fourier coefficients of \(f(x)=|x|\) on \([-1,1]\) and state the resulting series.

2. Show that if \(f\) is even then every \(b_n=0\), and verify the claim by direct substitution into the integral for \(b_n\).

3. A function satisfies \(f(-x)=-f(x)\) and \(f(0)=0\). Which coefficients must vanish? Which may survive?

4. Suppose the formulas are written on \([0,2L]\) instead of \([-L,L]\). Derive the modified expressions for \(a_n\) and \(b_n\).

5. Identify the error in the following reasoning: “Because the square wave is bounded, its Fourier coefficients must decay faster than \(1/n^2\).”