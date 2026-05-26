## 1. The one-sentence answer
**Dirichlet conditions are a set of regularity requirements on a periodic function that guarantee its Fourier series converges pointwise to the function at every point of continuity and to the average of the left and right limits at every jump discontinuity.**

A periodic function can be written as an infinite sum of sines and cosines. Without restrictions the partial sums may oscillate wildly or fail to settle on any value. The Dirichlet conditions supply the minimal control—bounded variation on each period together with a finite number of discontinuities—that forces the partial sums to behave.

These conditions appear whenever a PDE is solved by separation of variables. The resulting spatial eigenfunction expansions are Fourier series; convergence must be assured before one can interchange limits, differentiate term by term, or recover initial data.

> [!NOTE]
> The single deepest insight is that continuity alone is not enough; a function can be continuous everywhere yet still have a Fourier series that diverges at some points. Bounded variation supplies the missing global control.

## 2. Why this matters — concrete and current
In semiconductor process simulation, Intel’s TCAD tools solve the heat equation on periodic device geometries; the Fourier coefficients of the initial temperature profile are computed only after the Dirichlet conditions are verified, otherwise the predicted hot-spot temperatures oscillate and produce non-physical negative values.

NASA’s Orion spacecraft thermal-protection analysis expands the re-entry heat-flux history in Fourier series before coupling it to the ablation PDE; the series is truncated only after the number of discontinuities per orbit is confirmed to be finite, guaranteeing that the retained modes converge uniformly on the heat-shield surface.

In MRI reconstruction pipelines at Siemens Healthineers, the k-space data are treated as Fourier coefficients of a magnetization density that is assumed piecewise smooth; Dirichlet conditions justify the inverse transform step that produces artifact-free images rather than Gibbs ringing at tissue boundaries.

Quantum cascade laser designers at Thorlabs solve the time-dependent Schrödinger equation on a periodic superlattice potential; the wave function is expanded in Bloch–Fourier modes whose convergence is guaranteed only after the potential is shown to satisfy the Dirichlet criteria, allowing reliable prediction of gain spectra.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Riemann integral         | The Fourier coefficients are defined by integrals over one period. |
| Periodic functions       | The series and the convergence statement are stated on the circle \(\mathbb{R}/2\pi\mathbb{Z}\). |
| Left and right limits    | At a jump the series converges to the average of these limits. |
| Piecewise continuity     | Guarantees that the set of discontinuities is manageable. |
| Uniform convergence      | Allows term-by-term differentiation needed in PDE proofs. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A periodic function can be probed by integrals against sines and cosines
Any integrable periodic function possesses a formal trigonometric series whose coefficients are computed by averaging the product of the function with each basis function.  
Example: \(f(x)=x\) on \((-\pi,\pi]\) yields coefficients \(b_n=2(-1)^{n+1}/n\).  
The formal statement is
\[
a_0=\frac1{2\pi}\int_{-\pi}^\pi f(x)\,dx,\qquad
a_n=\frac1\pi\int_{-\pi}^\pi f(x)\cos(nx)\,dx,\qquad
b_n=\frac1\pi\int_{-\pi}^\pi f(x)\sin(nx)\,dx.
\]
> [!WARNING]  
> If the integrals do not exist the coefficients are undefined and the whole construction collapses.

### Step 2 — Partial sums are symmetric averages
The partial sum \(S_N(x)\) can be rewritten, via the Dirichlet kernel, as a weighted average of \(f\) over a small interval around \(x\).  
Example: For the square wave the kernel produces the familiar overshoot near each jump.  
Formally,
\[
S_N(x)=\frac1{2\pi}\int_{-\pi}^\pi f(x+t)D_N(t)\,dt,\qquad D_N(t)=\frac{\sin((N+1/2)t)}{\sin(t/2)}.
\]
> [!WARNING]  
> Treating \(S_N\) as a plain truncation without the kernel hides the nonlocal averaging that produces Gibbs phenomena.

### Step 3 — Bounded variation controls oscillation
A function of bounded variation on one period has finite arc length; its total variation supplies an integrable majorant for the Dirichlet kernel integrals.  
Example: The function \(f(x)=|\sin x|\) has bounded variation and its series converges everywhere.  
The mathematical statement is that the total variation \(V(f)<\infty\) implies
\[
\bigl|f(x)-S_N(x)\bigr|\le\frac{V(f)}{N+1/2}.
\]
> [!WARNING]  
> Mere integrability permits functions whose variation on every interval is infinite, destroying the decay estimate.

### Step 4 — Finite discontinuities per period
Only finitely many jumps are allowed inside each fundamental period; at every other point the left and right limits exist.  
Example: The sawtooth wave has one jump per period and converges to the average value there.  
Formally the set of discontinuities inside \([-\pi,\pi]\) is finite.  
> [!WARNING]  
> An infinite number of jumps, even if each is tiny, can accumulate and violate the variation bound.

### Step 5 — Pointwise convergence statement
Under the preceding conditions the partial sums converge at every \(x\) to \(\frac12(f(x^+)+f(x^-))\).  
This is the classical Dirichlet theorem.  
> [!WARNING]  
> The theorem gives pointwise, not uniform, convergence; uniform convergence requires the stronger Dini or Lipschitz conditions.

## 5. Worked examples — every step shown

**Example 1 — Square wave**  
*Given:* \(f(x)=1\) for \(0<x<\pi\), \(f(x)=-1\) for \(-\pi<x<0\), extended periodically.  
*Find:* Does the Fourier series converge at \(x=\pi/2\) and at \(x=0\)?  
The coefficients are \(b_n=4/(n\pi)\) for odd \(n\).  
The partial sum at a continuity point satisfies
\[
\lim_{N\to\infty}S_N(\pi/2)=1
\]
because \(f\) is continuous there and of bounded variation.  
At the jump,
\[
\lim_{N\to\infty}S_N(0)=\frac12(1+(-1))=0.
\]
**Final answer**  
The series converges to 1 at \(\pi/2\) and to 0 at 0.  
*Reflection:* The jump forces the average; forgetting the average is the most common algebraic slip.

**Example 2 — Triangular wave**  
*Given:* \(f(x)=\pi-|x|\) on \([-\pi,\pi]\).  
*Find:* Rate of convergence of coefficients.  
Integration by parts yields \(a_n=-2(1-(-1)^n)/(n^2\pi)\).  
Because \(f\) is continuous and piecewise smooth the coefficients decay as \(1/n^2\).  
**Final answer**  
\(a_n=O(1/n^2)\).  
*Reflection:* Continuity plus bounded variation upgrades decay from \(1/n\) to \(1/n^2\).

**Example 3 — Function with two jumps**  
*Given:* \(f(x)=\operatorname{sign}(\sin x)\).  
*Find:* Number of discontinuities per period.  
Exactly two jumps occur inside \([-\pi,\pi]\). Total variation equals 4.  
The Dirichlet theorem therefore applies directly.  
**Final answer**  
Series converges pointwise everywhere.  
*Reflection:* Counting jumps per period is a quick sanity check before invoking the theorem.

**Example 4 — PDE initial datum**  
*Given:* Heat equation \(u_t=u_{xx}\) on the circle with initial datum \(f(x)=x(\pi-x)(\pi+x)\) for \(|x|<\pi\).  
*Find:* Justification for term-by-term differentiation.  
\(f\) is \(C^1\) and periodic, hence of bounded variation.  
Uniform convergence of the differentiated series follows from the Weierstrass M-test on the coefficients.  
**Final answer**  
The formal series solution is \(C^\infty\) for \(t>0\).  
*Reflection:* Dirichlet conditions on the initial datum license every later manipulation inside the PDE.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming continuity suffices      | Students recall “continuous functions are integrable” but forget Weierstrass counter-examples | Always verify bounded variation explicitly           |
| Ignoring the average at jumps     | Visual intuition suggests the series should reach one side | Write \(\frac12(f^++f^-)\) every time a jump is present |
| Applying the theorem to non-periodic data | Forgetting to extend the function periodically      | Check \(f(-\pi)=f(\pi)\) before computing coefficients |
| Confusing pointwise with uniform convergence | PDE texts often interchange limit and derivative without comment | Test uniform convergence separately via Weierstrass test |
| Counting discontinuities on the whole line instead of one period | Periodicity hides repeats                           | Restrict attention to one fundamental period         |
| Using Lebesgue integrability alone | Modern courses emphasize \(L^1\) but Dirichlet needs variation | Add the total-variation check as a second step       |
| Differentiating the series term by term without decay | Coefficients may decay only as \(1/n\)              | Verify an extra factor of \(n\) decay first          |

## 7. The textbook-precise statement
Let \(f\) be \(2\pi\)-periodic, integrable on \([-\pi,\pi]\), and of bounded variation on every finite interval. Suppose moreover that \(f\) possesses at most finitely many discontinuities in each period. Then at every \(x\in\mathbb{R}\),
\[
\lim_{N\to\infty}S_N(x)=\frac{f(x^+)+f(x^-)}{2}.
\]
If in addition \(f\) is continuous at \(x\), the series converges to \(f(x)\).  
(See Tolstov, *Fourier Series*, Ch. 1, Thm. 5.1.)

## 8. Visual — diagram or schematic
```text
f(x)
  1 |     ****     ****
    |    *    *   *    *
  0 |***      ***      ***→ x
   -π       0       π
Jumps at x = kπ (k odd). Vertical dashed lines mark the average value 0 to which S_N converges. Horizontal arrows indicate one period.
```

## 9. The memory technique
1. **The hook** — Picture a mountain path of finite total length that is allowed to jump off cliffs only a few times each lap; the Fourier “tourist” walking the path can always locate the hiker’s average position.  
2. **What to overlearn** — The exact statement “finite jumps + bounded variation per period ⇒ pointwise convergence to the average.”  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the Dirichlet-kernel representation and bound the remainder by the total variation divided by \(N\).

## 10. What this unlocks
Dirichlet conditions justify every subsequent operation on Fourier series inside linear PDEs: term-by-term differentiation, energy estimates, and passage to the limit inside weak formulations.  
- Next: Sturm–Liouville theory and eigenfunction expansions  
- Gibbs phenomenon and uniform convergence criteria  
- Fejér and Cesàro summability for \(L^1\) data  
- Sobolev-space embeddings that replace classical variation conditions

## 11. Self-check — five questions, no answers
1. State the precise hypotheses of Dirichlet’s theorem and exhibit a continuous periodic function that violates them.  
2. Compute the Fourier coefficients of \(f(x)=x^2\) on \([-\pi,\pi]\) and prove the series converges uniformly.  
3. A function has countably many jumps inside one period; does the theorem apply? Construct a counter-example if not.  
4. In the heat equation on the circle, the initial datum is the characteristic function of an interval. Verify the Dirichlet conditions and write the explicit solution for \(t>0\).  
5. Explain why the formal term-by-term second derivative of a Fourier series may fail to converge even when the original series converges pointwise.