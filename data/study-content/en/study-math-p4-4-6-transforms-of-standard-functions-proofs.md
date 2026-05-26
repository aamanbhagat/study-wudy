## 1. The one-sentence answer
**The Laplace transform of any standard function is obtained by evaluating the improper integral that defines the transform, which reduces to an algebraic expression after elementary integration by parts or substitution.**

The definition itself supplies the proof for every elementary function. You integrate \(f(t)e^{-st}\) from zero to infinity and take the limit; the exponential decay forces the boundary term at infinity to vanish whenever the real part of \(s\) is large enough. The resulting finite expression is the transform.

Because the integral is linear, the same calculation works for linear combinations, products with powers of \(t\), and shifts in the \(s\)-plane. Each new transform is therefore derived once from the definition and then reused without repeating the integration.

> [!NOTE]
> The “proof” is never more than the evaluation of one definite integral; every later property follows from algebraic manipulation of that result.

## 2. Why this matters — concrete and current
SpaceX uses the closed-form Laplace transforms of polynomials and exponentials to obtain exact transfer functions for Falcon 9 thrust-vector control loops before any numerical simulation is run.  

Semiconductor foundries such as TSMC embed the transforms of ramp and sinusoidal inputs into compact models that predict voltage overshoot on power-delivery networks during clock-gating transients.  

The Laser Interferometer Gravitational-Wave Observatory (LIGO) matches filtered detector output against the Laplace transforms of exponentially damped sinusoids that represent ring-down modes of merging black holes.  

Modern reinforcement-learning pipelines for robotic locomotion pre-compute the Laplace transforms of reference trajectories so that the policy gradient can be evaluated in closed form rather than by quadrature at every time step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of the improper integral \(\int_0^\infty\) | The transform is literally this limit; without it the proofs cannot even be stated. |
| Integration by parts     | Required to reduce \(\int t^n e^{-st}\,dt\) and \(\int e^{at}e^{-st}\,dt\). |
| Limit \(\lim_{u\to\infty}e^{-cu}=0\) for \(\operatorname{Re}(c)>0\) | Guarantees that every boundary term at infinity vanishes. |
| Radius of convergence for exponential series | Justifies term-by-term integration when the transform of a power series is required. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The integral definition
The Laplace transform simply multiplies the given function by a decaying exponential and integrates. For the constant function 1 the integral is immediate.  
Concrete example: \(\int_0^\infty e^{-st}\,dt = \lim_{T\to\infty}\bigl[-s^{-1}e^{-st}\bigr]_0^T = s^{-1}\) when \(\operatorname{Re}(s)>0\).  
Formal statement:
\[
\mathcal{L}\{1\}(s)=\frac1s,\qquad\operatorname{Re}(s)>0.
\]
> [!WARNING]
> Omitting the condition \(\operatorname{Re}(s)>0\) produces an expression that is formally correct but meaningless for the functions that actually arise in ODEs.

### Step 2 — Exponential shift
Replace the constant 1 by \(e^{at}\). The same integration yields a shifted denominator.  
Formal statement:
\[
\mathcal{L}\{e^{at}\}(s)=\frac1{s-a},\qquad\operatorname{Re}(s)>\operatorname{Re}(a).
\]

### Step 3 — Differentiation under the integral sign for powers of \(t\)
Differentiate the transform of 1 with respect to the parameter \(s\); each differentiation brings down a factor of \(-t\). After \(n\) differentiations the transform of \(t^n\) appears.  
Formal statement:
\[
\mathcal{L}\{t^n\}(s)=\frac{n!}{s^{n+1}},\qquad\operatorname{Re}(s)>0.
\]

### Step 4 — Trigonometric functions via Euler’s formula
Express \(\sin bt\) and \(\cos bt\) as imaginary and real parts of \(e^{ibt}\). Apply the exponential-shift result and separate real and imaginary parts.  
Formal statement:
\[
\mathcal{L}\{\sin bt\}(s)=\frac{b}{s^2+b^2},\qquad\mathcal{L}\{\cos bt\}(s)=\frac{s}{s^2+b^2}.
\]

### Step 5 — The textbook statement
All of the above derivations are collected into a single table that lists each standard function together with the precise half-plane of convergence; this table is the working reference used in every subsequent ODE solution.

## 5. Worked examples — every step shown

**Example 1 — Constant function**  
*Given:* \(f(t)=1\).  
*Find:* \(\mathcal{L}\{1\}(s)\).  
\[
\int_0^\infty e^{-st}\,dt=\lim_{T\to\infty}\Bigl[-\frac1s e^{-st}\Bigr]_0^T=\frac1s.
\]
*Why:* The antiderivative of the exponential is immediate and the upper limit vanishes for \(\operatorname{Re}(s)>0\).  
**\(\frac1s\)**

*Reflection:* The only subtlety is remembering to state the half-plane; the algebra itself is one line.

**Example 2 — Linear function**  
*Given:* \(f(t)=t\).  
*Find:* \(\mathcal{L}\{t\}(s)\).  
Differentiate the transform of 1 with respect to \(s\):
\[
\frac{d}{ds}\Bigl(\frac1s\Bigr)=-\frac1{s^2}=-\int_0^\infty t\,e^{-st}\,dt.
\]
Hence the transform equals \(1/s^2\).  
**\(\frac1{s^2}\)**

*Reflection:* Parameter differentiation replaces an integration-by-parts calculation and generalises instantly to higher powers.

**Example 3 — Shifted exponential**  
*Given:* \(f(t)=e^{3t}\).  
*Find:* \(\mathcal{L}\{e^{3t}\}(s)\).  
\[
\int_0^\infty e^{3t}e^{-st}\,dt=\int_0^\infty e^{-(s-3)t}\,dt=\frac1{s-3},\quad\operatorname{Re}(s)>3.
\]
**\(\frac1{s-3}\)**

*Reflection:* The only change from Step 1 is the replacement of the constant 0 by the constant 3 inside the exponent.

**Example 4 — Sine via complex exponential**  
*Given:* \(f(t)=\sin 2t\).  
*Find:* \(\mathcal{L}\{\sin 2t\}(s)\).  
\[
\sin 2t=\operatorname{Im}(e^{i2t})\implies\mathcal{L}\{\sin 2t\}=\operatorname{Im}\Bigl(\frac1{s-2i}\Bigr)=\frac{2}{s^2+4}.
\]
**\(\frac{2}{s^2+4}\)**

*Reflection:* Keeping the imaginary-part operation outside the integral is justified by uniform convergence on compact sets inside the half-plane.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the half-plane of convergence | The algebraic expression appears before the limit is taken | Always recompute the limit at infinity before writing the final formula |
| Applying the transform of \(t^n\) when \(\operatorname{Re}(s)\le0\) | The integral diverges, yet the formula \(n!/s^{n+1}\) is still written | Check the sign of \(\operatorname{Re}(s)\) first |
| Confusing \(\mathcal{L}\{e^{at}\}\) with \(\mathcal{L}\{e^{-at}\}\) | Sign error inside the exponent | Write the exponent as \(-(s-a)\) explicitly |
| Using the sine formula for \(\sinh\) | Students replace \(b\) by \(ib\) without adjusting the sign | Keep hyperbolic identities separate until the final step |
| Differentiating the transform with respect to \(t\) instead of \(s\) | Misreading the parameter | Remember that \(s\) is the variable of differentiation |
| Ignoring the lower limit at \(t=0\) when integration by parts is used | The boundary term at zero is dropped | Explicitly evaluate \([-uv]_0^\infty\) each time |
| Treating the transform of a product as the product of transforms | Linearity is misapplied | Use the convolution theorem only after the basic table is proved |

## 7. The textbook-precise statement
Let \(f\) be piecewise continuous on \([0,\infty)\) and of exponential order \(\alpha\). Then the Laplace transform
\[
F(s)=\int_0^\infty f(t)e^{-st}\,dt
\]
exists for all \(s\) with \(\operatorname{Re}(s)>\alpha\). In particular the following identities hold in their respective half-planes (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §6.1, Table 6.1):
\[
\begin{align*}
\mathcal{L}\{1\}&=\frac1s,\\
\mathcal{L}\{t^n\}&=\frac{n!}{s^{n+1}},\quad n\in\mathbb{N},\\
\mathcal{L}\{e^{at}\}&=\frac1{s-a},\\
\mathcal{L}\{\sin bt\}&=\frac{b}{s^2+b^2}.
\end{align*}
\]

## 8. Visual — diagram or schematic
```text
s-plane
Im
 ^
 |          Region of convergence
 |          (right of vertical line)
 |   σ=α
 |     |
 |     |█████████████
 |     |█████████████  ← all transforms analytic here
 +-----|-------------→ Re
 0     α
```
The vertical line \(\operatorname{Re}(s)=\alpha\) is the abscissa of convergence; every standard-function transform is holomorphic to its right.

## 9. The memory technique
1. **The hook** — Picture the factor \(e^{-st}\) as a “vacuum cleaner” that sucks the function down to zero at infinity, leaving only the algebraic residue at \(s\).  
2. **What to overlearn** — The four entries \(\frac1s\), \(\frac1{s-a}\), \(\frac{n!}{s^{n+1}}\), \(\frac{b}{s^2+b^2}\) together with their half-planes.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the definition \(\int_0^\infty f(t)e^{-st}\,dt\) and integrate by parts or substitute; the table is rebuilt in under two minutes.

## 10. What this unlocks
These explicit transforms turn every constant-coefficient linear ODE into an algebraic equation in the \(s\)-domain.  

- Convolution theorem for non-homogeneous terms  
- Heaviside and Dirac delta response formulas  
- Partial-fraction inversion that recovers time-domain solutions  
- Transfer-function analysis in control theory  
- Frequency-response plots obtained by setting \(s=i\omega\)

## 11. Self-check — five questions, no answers
1. Compute \(\mathcal{L}\{t^3e^{2t}\}(s)\) directly from the definition and state the half-plane.  
2. Differentiate the transform of \(\cos bt\) with respect to \(s\) and identify the new function obtained.  
3. Why does the formula for \(\mathcal{L}\{t^n\}\) fail when \(\operatorname{Re}(s)\le0\)?  
4. Show that the Laplace transform of \(\sinh at\) equals \(\frac{a}{s^2-a^2}\) without using hyperbolic identities in advance.  
5. A student claims that \(\mathcal{L}\{e^{t^2}\}(s)\) exists for large \(s\). Produce a one-line argument showing the claim is false.