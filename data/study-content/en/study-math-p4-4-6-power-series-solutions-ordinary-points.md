## 1. The one-sentence answer
**A linear second-order ODE possesses two linearly independent analytic solutions in power series form centered at any ordinary point.**

An ordinary point is a location where the coefficient functions of the normalized equation are analytic. At every such point the equation admits solutions that can be written as infinite Taylor-like series whose coefficients are fixed recursively by substituting the series into the differential equation and matching like powers of the independent variable. The resulting series converge inside a disk whose radius is at least as large as the distance to the nearest singular point of the coefficients.

This construction replaces the need for guessing closed-form expressions with an algorithmic procedure that always works inside its guaranteed interval of validity. The two independent series together span the full two-dimensional solution space, so the general solution is their linear combination with arbitrary constants.

> [!NOTE]
> The decisive fact is that analyticity of the coefficients forces the recurrence relation to determine every coefficient from the two free initial ones; no negative powers or logarithmic terms ever appear.

## 2. Why this matters — concrete and current
In aerospace guidance, the linearized equations of relative motion between two spacecraft (Clohessy–Wiltshire equations with time-varying orbital radius) are solved by power series about perigee; SpaceX and ESA trajectory teams use the resulting series to propagate reference trajectories to meter-level accuracy without numerical integration at every step.

Semiconductor process modeling employs the drift-diffusion equations whose doping profiles yield analytic coefficients inside each layer; power-series solutions centered at layer interfaces supply the exact carrier concentrations needed for TCAD calibration at TSMC and Intel.

In machine-learning physics simulators, neural networks are trained to match the coefficients of power-series solutions of the Schrödinger equation for the quantum harmonic oscillator; this hybrid approach appears in recent work on differentiable physics engines at DeepMind and NVIDIA.

Planetary ephemerides maintained by NASA’s Jet Propulsion Laboratory incorporate perturbative power-series solutions of the n-body problem expanded about mean orbital elements; the resulting polynomials are evaluated millions of times per day in deep-space navigation software.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Taylor series            | The candidate solutions are precisely Taylor series whose coefficients satisfy the ODE. |
| Radius of convergence    | Determines the interval on which the constructed series solves the ODE. |
| Analytic functions       | Guarantees that every derivative exists and the recurrence closes. |
| Second-order linear ODE theory | Supplies the dimension of the solution space and the notion of linear independence. |
| Index shifting           | Aligns powers of (x−x₀) so coefficients can be equated. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify an ordinary point
An ordinary point of  
\[ y'' + P(x)y' + Q(x)y = 0 \]  
is any point \(x_0\) at which both \(P\) and \(Q\) possess convergent power series.  
Example: \(P(x)=0\), \(Q(x)=1\) are analytic everywhere, so every real number is ordinary.  
Formal statement: \(x_0\) is ordinary if \(P\) and \(Q\) are analytic at \(x_0\).  
> [!WARNING]  
> Treating a point where \(P\) or \(Q\) has a pole as ordinary produces a recurrence that eventually demands division by zero.

### Step 2 — Assume a power-series form
Postulate  
\[ y = \sum_{n=0}^\infty a_n (x-x_0)^n. \]  
Differentiate term by term twice. The assumption is justified once the coefficients are shown to exist inside a positive radius.

### Step 3 — Substitute into the ODE
Insert the series for \(y\), \(y'\), and \(y''\) into the equation. Each term becomes a power series; their linear combination must be the zero series.

### Step 4 — Shift indices to a common power
Re-index every series so that the general term contains \((x-x_0)^k\) for the same running index \(k\). This produces a single series whose coefficient must vanish for every \(k\).

### Step 5 — Obtain the recurrence relation
Equating the coefficient of each power to zero yields a two-step (or higher) recurrence expressing \(a_{n+2}\) in terms of earlier coefficients. The first two coefficients \(a_0\) and \(a_1\) remain arbitrary.

### Step 6 — Determine the radius of convergence
Apply the ratio test to the recurrence; the radius is at least the distance from \(x_0\) to the nearest singularity of \(P\) or \(Q\).

### Step 7 — Construct the general solution
The two independent choices \((a_0,a_1)=(1,0)\) and \((a_0,a_1)=(0,1)\) produce fundamental solutions \(y_1(x)\) and \(y_2(x)\). Their linear combination is the general solution inside the common disk of convergence.

## 5. Worked examples — every step shown

**Example 1 — Constant-coefficient oscillator**  
*Given:* \(y''+y=0\), ordinary point \(x_0=0\).  
*Find:* Power-series solution.  
Assume \(y=\sum_{n=0}^\infty a_n x^n\).  
Differentiate: \(y''=\sum_{n=2}^\infty n(n-1)a_n x^{n-2}\).  
*Why:* Term-by-term differentiation is valid inside the radius.  
Shift index: \(y''=\sum_{k=0}^\infty (k+2)(k+1)a_{k+2}x^k\).  
*Why:* Replace \(n-2\) by \(k\).  
Substitute: \(\sum[(k+2)(k+1)a_{k+2}+a_k]x^k=0\).  
*Why:* The sum of two series is zero only if every coefficient vanishes.  
Recurrence: \(a_{k+2}=-\frac{a_k}{(k+2)(k+1)}\).  
*Why:* Solve the algebraic relation for the highest index.  
Arbitrary constants: \(a_0=A\), \(a_1=B\).  
Series:  
\[ y=A\sum_{m=0}^\infty\frac{(-1)^m}{(2m)!}x^{2m}+B\sum_{m=0}^\infty\frac{(-1)^m}{(2m+1)!}x^{2m+1}. \]  
**Final answer**  
\[ y=A\cos x+B\sin x \] (recognized after summation).  

*Reflection:* The recurrence reproduced the familiar Taylor coefficients; the same algebra works for non-constant analytic coefficients.

**Example 2 — Airy equation at an ordinary point**  
*Given:* \(y''-xy=0\), \(x_0=0\).  
*Find:* First two series solutions.  
Assume \(y=\sum a_n x^n\). After index shifts the recurrence is  
\[ a_{n+3}=\frac{a_n}{(n+3)(n+2)},\quad n\geq0. \]  
*Why:* Each substitution and shift contributes one factor of the denominator.  
Choosing \((a_0,a_1,a_2)=(1,0,0)\) and \((0,1,0)\) yields the Airy functions Ai and Bi as power series.  
**Final answer**  
\[ y_1=\sum_{k=0}^\infty\frac{x^{3k}}{3^{2k}k!(3k)!/k!},\quad y_2=x+\sum_{k=1}^\infty\frac{x^{3k+1}}{3^{2k+1}k!(3k+1)!/k!}. \]  

*Reflection:* Two arbitrary constants still appear; the third initial coefficient is fixed by the recurrence.

**Example 3 — Legendre equation truncated**  
*Given:* \((1-x^2)y''-2xy'+2y=0\) at \(x=0\).  
*Find:* Polynomial solution of degree 2.  
Recurrence yields \(a_2=-a_0\), higher coefficients zero when the parameter equals 2.  
**Final answer**  
\[ y=a_0(1-x^2)+a_1 x. \]  

*Reflection:* Termination of the series at even or odd degree produces the Legendre polynomials.

**Example 4 — Non-homogeneous forcing**  
*Given:* \(y''+y=\sin x\), \(x_0=0\).  
*Find:* Particular series solution.  
Assume \(y_p=\sum b_n x^n\). Equating coefficients gives the same homogeneous recurrence plus an inhomogeneous term from the sine series. Solving yields the known particular solution \(-\frac12 x\cos x\).  
**Final answer**  
\[ y_p=-\frac12 x\cos x. \]  

*Reflection:* The method extends verbatim to non-homogeneous analytic right-hand sides.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to shift all three series | Different starting indices produce mismatched powers | Always write every sum beginning at the same index \(k\) before equating coefficients. |
| Treating a singular point as ordinary | Recurrence eventually divides by zero | Check analyticity of \(P\) and \(Q\) at the expansion point first. |
| Stopping after finding one series | The second arbitrary constant is overlooked | Always generate two independent solutions by separate choices of \((a_0,a_1)\). |
| Using the wrong recurrence step | Off-by-one index error after multiple shifts | Label each shift explicitly with a new dummy index. |
| Claiming convergence everywhere | Radius equals distance to nearest singularity of coefficients | Compute the radius via the ratio test on the recurrence. |
| Adding arbitrary constants to both series | Over-parameterization | Fix one series with \((1,0)\) and the other with \((0,1)\). |
| Ignoring even/odd decoupling | Recurrence relates every other coefficient | Separate the even and odd sub-series from the outset. |

## 7. The textbook-precise statement
Let \(P(x)\) and \(Q(x)\) be analytic at \(x_0\) with power-series radii of convergence \(R_P\) and \(R_Q\). Then the initial-value problem  
\[ y''+P(x)y'+Q(x)y=0,\qquad y(x_0)=a,\quad y'(x_0)=b \]  
possesses a unique solution analytic at \(x_0\) whose Taylor series about \(x_0\) converges at least in the disk \(|x-x_0|<\min(R_P,R_Q)\). (Boyce & DiPrima, *Elementary Differential Equations*, 11e, Theorem 5.3.1.)

## 8. Visual — diagram or schematic
```text
x0 ───●────────────────────────────▶ x
       |               |          |
       R               singularity
       |<------------- min(R_P,R_Q) ------------>|
Power-series disk of guaranteed convergence
```
The dot marks the ordinary point; the nearest singularities of the coefficients bound the interval of guaranteed convergence.

## 9. The memory technique
1. **The hook** — Picture an “ordinary” office desk: two free pens (\(a_0,a_1\)) and a tidy recurrence that files every later coefficient automatically; no “singular” mess of negative powers appears.  
2. **What to overlearn** — Recurrence always determines \(a_{n+2}\) from previous terms; radius \(\geq\) distance to nearest singularity; two independent series suffice.  
3. **Spaced-repetition schedule** — Review the definition of ordinary point after 1 day, the recurrence derivation after 3 days, radius calculation after 7 days, full theorem after 16 days, and a fresh example after 35 days.  
4. **First-principles fallback** — Re-derive the recurrence by writing the three series, shifting indices, and setting the general coefficient to zero.

## 10. What this unlocks
Power-series solutions at ordinary points supply the local analytic building blocks used for Frobenius series at regular singular points, for asymptotic matching in boundary-layer theory, and for constructing global solutions via analytic continuation.  

- Frobenius method at regular singular points  
- Legendre and Hermite polynomials  
- Quantum harmonic oscillator wave functions  
- Perturbation series in celestial mechanics  
- Taylor methods for numerical ODE integration

## 11. Self-check — five questions, no answers
1. Verify that \(x=1\) is an ordinary point of \(y''+(x-1)^{-2}y=0\) or explain why it is not.  
2. Derive the recurrence for the coefficients of \(y''+x y=0\) expanded at \(x=0\).  
3. Compute the radius of convergence of the series obtained in Example 2.  
4. Show that the two series generated by \((a_0,a_1)=(1,0)\) and \((0,1)\) are linearly independent on their common interval of convergence.  
5. Identify the mistake in the following argument: “Because the recurrence relates \(a_{n+2}\) to \(a_n\), every solution must be an even function.”