## 1. The one-sentence answer
**Power series solutions at ordinary points let you construct analytic solutions to linear ODEs by assuming a power series centred at a point where the coefficient functions remain analytic, then recursively determining every coefficient.**

An ordinary point \(x_0\) of the equation \(y'' + P(x)y' + Q(x)y = 0\) is any point where both \(P\) and \(Q\) are analytic. Around such a point you may safely write the unknown solution as \(y = \sum_{n=0}^\infty a_n(x-x_0)^n\). Substituting this series into the ODE produces an algebraic recurrence that fixes every \(a_n\) once the first two arbitrary constants are chosen; the resulting series converges at least inside the common disk of analyticity of \(P\) and \(Q\).

The method therefore converts a differential problem into an infinite but completely determined algebraic problem. Because the recurrence is linear, the two independent solutions appear automatically as the even-powered and odd-powered series (or their linear combinations).

> [!NOTE]
> The single deepest insight is that analyticity of the coefficients guarantees analyticity of the solutions; no “extra” singularities are introduced by the differential equation itself.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s GMAT and ESA’s GODOT propagate spacecraft trajectories by solving the perturbed two-body problem; the perturbation functions are analytic except at isolated singularities, so power-series propagators centred at ordinary points give high-order Taylor expansions that are evaluated thousands of times per second.

Semiconductor-device simulators such as Synopsys Sentaurus solve the drift-diffusion equations whose doping profiles are analytic inside each layer; power-series expansions about ordinary points inside a finite-element cell supply the local basis functions that achieve spectral accuracy without increasing mesh density.

In machine-learning libraries, the SciPy function `scipy.special.iv` for modified Bessel functions is computed via the power-series recurrence at the ordinary point \(z=0\); every call to a neural-network layer that uses Bessel activations therefore rests on the same recurrence derived in this lesson.

Microwave-filter design software (Keysight ADS) expands the telegrapher’s equations about ordinary points along a transmission line to obtain the chain parameters as rapidly convergent power series, allowing real-time optimisation of 5G mm-wave circuits.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Taylor series            | The entire solution is constructed as a Taylor series whose coefficients must be found. |
| Radius of convergence    | Determines the interval on which the formal series actually solves the ODE.          |
| Analytic functions       | \(P\) and \(Q\) must be analytic at \(x_0\) for the recurrence to be valid.          |
| Linear recurrence relations | The ODE translates into a recurrence that lets every coefficient be computed from previous ones. |

If any of these four ideas are shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise an ordinary point
An ordinary point is simply a point where the coefficient functions \(P(x)\) and \(Q(x)\) possess convergent power series.  
Example: for \(y'' + \frac{1}{1-x}y' + y = 0\), \(x=0\) is ordinary because both \(\frac{1}{1-x}\) and the constant 1 are analytic inside \(|x|<1\).  
Formally, \(x_0\) is ordinary when there exists \(R>0\) such that  
\[
P(x)=\sum_{n=0}^\infty p_n(x-x_0)^n,\qquad Q(x)=\sum_{n=0}^\infty q_n(x-x_0)^n
\]  
both converge for \(|x-x_0|<R\).

> [!WARNING]
> If you mis-classify a regular singular point as ordinary, the recurrence will eventually demand division by zero and the method collapses.

### Step 2 — Write the assumed solution
Assume  
\[
y=\sum_{n=0}^\infty a_n(x-x_0)^n.
\]  
Differentiate term by term (justified inside the disk of convergence):  
\[
y'=\sum_{n=1}^\infty n a_n(x-x_0)^{n-1},\qquad y''=\sum_{n=2}^\infty n(n-1)a_n(x-x_0)^{n-2}.
\]

### Step 3 — Substitute and shift indices
Insert the three series into the ODE, multiply by the common power \((x-x_0)^{n}\) after shifting all sums to the same index, and collect coefficients of like powers. The result is a linear recurrence relating \(a_{n+2}\) to \(a_{n+1}\) and \(a_n\) (second-order case).

### Step 4 — Solve the recurrence
The recurrence is always of the form  
\[
(n+2)(n+1)a_{n+2}=F(a_{n+1},a_n,n,p_k,q_k)
\]  
where \(F\) is known once \(P\) and \(Q\) are given. Choose \(a_0\) and \(a_1\) freely; every subsequent coefficient is then uniquely determined.

### Step 5 — Determine the radius of convergence
By the theory of analytic coefficients, the radius is at least the distance from \(x_0\) to the nearest singularity of \(P\) or \(Q\). No further computation is required for the lower bound.

### Step 6 — Obtain the general solution
The two arbitrary constants \(a_0\) and \(a_1\) generate two linearly independent series \(y_1(x)\) and \(y_2(x)\). Their linear combination  
\[
y=c_1 y_1+c_2 y_2
\]  
is the general solution inside the disk of convergence.

## 5. Worked examples — har step show karo

**Example 1 — Simple harmonic oscillator**  
*Given:* \(y''+y=0\), ordinary point \(x_0=0\).  
*Find:* Power-series solution.  
Assume \(y=\sum_{n=0}^\infty a_n x^n\). Then \(y''=\sum_{n=2}^\infty n(n-1)a_n x^{n-2}\).  
Substitute:  
\[
\sum_{n=2}^\infty n(n-1)a_n x^{n-2}+\sum_{n=0}^\infty a_n x^n=0.
\]  
Shift the first sum by letting \(k=n-2\):  
\[
\sum_{k=0}^\infty(k+2)(k+1)a_{k+2}x^k+\sum_{k=0}^\infty a_k x^k=0.
\]  
Equate coefficients: \((k+2)(k+1)a_{k+2}+a_k=0\), hence  
\[
a_{k+2}=-\frac{a_k}{(k+1)(k+2)}.
\]  
*Why:* The recurrence follows directly from collecting like powers after index alignment.  
Choose \(a_0=1,a_1=0\) → even solution; \(a_0=0,a_1=1\) → odd solution.  
**Final answer**  
\[
y_1=\sum_{m=0}^\infty\frac{(-1)^m}{(2m)!}x^{2m},\qquad y_2=\sum_{m=0}^\infty\frac{(-1)^m}{(2m+1)!}x^{2m+1}.
\]

*Reflection:* The recurrence reproduces the Taylor series of \(\cos x\) and \(\sin x\), confirming correctness.

**Example 2 — Airy equation at ordinary point**  
*Given:* \(y''-xy=0\), \(x_0=0\).  
*Find:* First four nonzero terms of each independent solution.  
Recurrence becomes \(a_{n+2}=\frac{a_{n-1}}{(n+2)(n+1)}\) for \(n\geq1\).  
With \(a_0=1,a_1=0\) we obtain the even-powered series starting \(1+\frac{x^3}{3!}+\frac{x^6}{6!}+\cdots\).  
With \(a_0=0,a_1=1\) we obtain the odd series \(x+\frac{x^4}{4!}+\frac{x^7}{7!}+\cdots\).  
**Final answer**  
\[
y_1=1+\frac{x^3}{6}+\frac{x^6}{180}+\frac{x^9}{12960}+O(x^{12}),\quad y_2=x+\frac{x^4}{24}+\frac{x^7}{5040}+O(x^{10}).
\]

*Reflection:* The three-term recurrence (instead of two) arises because the coefficient of \(y\) is linear in \(x\).

**Example 3 — Non-homogeneous term**  
*Given:* \(y''+y= x\), ordinary point 0.  
Particular solution: assume \(y_p=\sum a_n x^n\), plug in, obtain \(a_2=-\frac{a_0}{2}+ \frac{1}{2}\), and so on; homogeneous part unchanged.  
**Final answer**  
\[
y_p=x.
\]

*Reflection:* Polynomial right-hand side forces only finitely many extra terms.

**Example 4 — Shifted centre**  
*Given:* \(y''+(x-1)y=0\), ordinary point \(x_0=1\).  
Let \(t=x-1\), equation becomes \(y''+t y=0\). Recurrence identical to Airy but in variable \(t\).  
**Final answer**  
Series in powers of \((x-1)\) with same coefficient pattern.

*Reflection:* Translation of the independent variable moves the ordinary point to the origin without changing the algebraic structure.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to shift the summation index | Students differentiate but leave the powers mismatched | Always rewrite every sum so the power of \((x-x_0)\) is identical before collecting coefficients |
| Dividing by zero in the recurrence | Treating a singular point as ordinary | Check analyticity of \(P\) and \(Q\) at the chosen centre first |
| Stopping after two terms | Believing the series is finite | Verify that the recurrence continues indefinitely unless the right-hand side forces termination |
| Using radius smaller than necessary | Computing ratio test on every example instead of invoking the coefficient theorem | Quote the guaranteed radius directly from the nearest singularity of \(P\) or \(Q\) |
| Confusing arbitrary constants | Setting both \(a_0=a_1=0\) | Remember \(a_0=y(x_0)\), \(a_1=y'(x_0)\) are free parameters |
| Sign errors in recurrence | Mishandling negative signs when moving terms | Keep the ODE in standard form \(y''+P y'+Q y=0\) before substitution |

## 7. The textbook-precise statement
Let \(P(x)\) and \(Q(x)\) be analytic at \(x_0\) with power-series expansions convergent in \(|x-x_0|<R\). Then the initial-value problem  
\[
y''+P(x)y'+Q(x)y=0,\qquad y(x_0)=a,\quad y'(x_0)=b
\]  
possesses a unique solution that is analytic in the same disk and is given by the power series  
\[
y(x)=\sum_{n=0}^\infty a_n(x-x_0)^n
\]  
whose coefficients satisfy the recurrence obtained by formal substitution (Coddington, *An Introduction to Ordinary Differential Equations*, 1961, §4.2, Theorem 2).

## 8. Visual — diagram or schematic
```text
Radius R
+-------------------+
|                   |
|   singularities   |   <--- nearest singularity of P or Q
|        •          |
|                   |
|     ordinary      |
|      point o------|------> solution analytic inside this disk
|                   |
+-------------------+
```
The circle is centred at the ordinary point; the solution series converges everywhere inside and may or may not converge on the boundary.

## 9. The memory technique
1. **The hook** — Picture the recurrence as a factory conveyor belt: each new coefficient \(a_{n+2}\) is stamped out by a machine that only needs the previous two pieces and the “blueprints” \(p_k,q_k\).
2. **What to overlearn** — The two-term recurrence formula for the constant-coefficient case \(a_{n+2}=-\frac{a_n}{(n+1)(n+2)}\) and the statement “radius ≥ distance to nearest singularity of P or Q”.
3. **Spaced-repetition schedule** — Review the recurrence derivation after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If the formula is forgotten, re-derive by writing the three series, shifting indices until all powers match, and equating the single coefficient of each power to zero.

## 10. What this unlocks
Mastery of ordinary-point expansions is the prerequisite for the Frobenius method at regular singular points, for asymptotic matching in boundary-layer theory, and for constructing special-function libraries (Bessel, hypergeometric, Legendre). It also supplies the local series used inside spectral-element and p-FEM codes.

- Frobenius series at regular singular points  
- Asymptotic expansions for large |x|  
- Sturm–Liouville eigenfunction expansions  
- Analytic continuation across the complex plane  

## 11. Self-check — five questions, no answers
1. Classify \(x=0\) for the equation \((x^2+1)y''+xy'+y=0\) and state the guaranteed radius.  
2. Derive the recurrence for \(y''-x^2 y=0\) at \(x=0\) and compute \(a_6\) when \(a_0=1,a_1=0\).  
3. Explain why the power series for \(\sin x\) satisfies \(y''+y=0\) without ever invoking trigonometric identities.  
4. A student claims the radius is exactly 1 for every equation whose leading coefficient is \(1-x^2\); what is the flaw?  
5. Show that if \(P\) and \(Q\) are entire, every solution around any ordinary point is an entire function.