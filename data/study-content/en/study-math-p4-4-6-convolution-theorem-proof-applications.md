## 1. The one-sentence answer
**The convolution theorem states that the Laplace transform of the convolution of two functions equals the product of their individual Laplace transforms.**

This equality converts the operation of folding one function over another into ordinary multiplication after the transform is taken. In an ordinary differential equation the forcing term and the system response are combined by convolution when the equation is solved in the time domain; the theorem therefore replaces that integral with multiplication once both sides have been transformed. The resulting algebraic equation is solved for the transform of the unknown solution, after which the inverse transform recovers the time-domain answer.

The same identity appears whenever linear time-invariant systems are analysed, because the output of such a system is always the convolution of the input with the impulse response. Transforming both sides therefore turns the system into a simple multiplier in the s-domain.

> [!NOTE]
> The theorem works because the exponential kernel \(e^{-st}\) of the Laplace transform turns the sliding integral that defines convolution into a product of two independent integrals; that single algebraic fact is the entire source of the method’s power.

## 2. Why this matters — concrete and current
SpaceX uses the convolution theorem inside its guidance-filter software to propagate sensor noise through the linearized equations of motion of Falcon 9; the s-domain multiplication yields the exact power spectral density of the closed-loop error without numerically integrating the time-domain convolution at 200 Hz.

In semiconductor process control, ASML’s EUV scanners model wafer-stage vibrations as the convolution of a stochastic disturbance with the servo impulse response; the theorem converts the resulting integral equation into a rational transfer-function product that is inverted in closed form to set feed-forward gains.

Pharmacokinetic models at Pfizer treat drug absorption as the convolution of a dosing schedule with a gamma-distributed residence-time kernel; Laplace-domain multiplication lets clinicians obtain the plasma concentration curve for arbitrary regimens without repeated numerical quadrature.

Audio engineers at Dolby Laboratories apply the identical identity when designing room-correction filters: the measured room impulse response is multiplied in the Laplace (or Fourier) domain by the inverse of the loudspeaker response, then inverted once to produce a single FIR correction filter.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of the Laplace transform | The theorem is an identity between two Laplace integrals. |
| Improper integrals and their convergence | Absolute integrability guarantees that the double integral arising in the proof may be reordered by Fubini’s theorem. |
| Product rule for differentiation | Used in the proof when differentiating under the integral sign. |
| Dirac delta and its sifting property | Supplies the unit element for convolution and appears in impulse-response interpretations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the convolution product
Plain English: convolution measures the accumulated overlap obtained when one function is slid across another and the pointwise product is integrated at each shift.  
Concrete example: let \(f(t)=e^{-t}\) and \(g(t)=u(t)\) (unit step). Their convolution at time \(\tau\) is \(\int_0^\tau e^{-(\tau-s)}\,ds=1-e^{-\tau}\).  
Formal statement:
\[
(f*g)(\tau)=\int_0^\tau f(\tau-s)g(s)\,ds.
\]
> [!WARNING]
> Reversing the integration limits or omitting the factor that enforces causality produces a function whose Laplace transform is not \(F(s)G(s)\).

### Step 2 — Write the Laplace transform of the convolution
Plain English: replace the convolution by its integral definition inside the Laplace integral.  
Formal statement:
\[
\mathcal{L}\{f*g\}(s)=\int_0^\infty e^{-st}\Bigl(\int_0^t f(t-u)g(u)\,du\Bigr)dt.
\]

### Step 3 — Change the order of integration
The region \(0<u<t<\infty\) is rewritten as \(0<u<\infty\) and \(u<t<\infty\). After switching the integrals one obtains
\[
\int_0^\infty g(u)\Bigl(\int_u^\infty f(t-u)e^{-st}\,dt\Bigr)du.
\]

### Step 4 — Substitute to factor the inner integral
Shift the inner variable by setting \(\sigma=t-u\). The inner integral becomes exactly \(e^{-su}F(s)\), yielding
\[
F(s)\int_0^\infty g(u)e^{-su}\,du=F(s)G(s).
\]

### Step 5 — State the theorem
The preceding calculation proves
\[
\mathcal{L}\{f*g\}=F(s)G(s).
\]
This is the textbook statement of the convolution theorem for the unilateral Laplace transform.

## 5. Worked examples — every step shown

**Example 1 — Convolution of two exponentials**  
*Given:* \(f(t)=e^{-at}u(t)\), \(g(t)=e^{-bt}u(t)\), \(a\neq b\).  
*Find:* \(\mathcal{L}\{f*g\}\).  
Step 1: form the convolution integral  
\[
(f*g)(t)=\int_0^t e^{-a(t-u)}e^{-bu}\,du=e^{-at}\int_0^t e^{(a-b)u}\,du.
\]  
*Why:* direct substitution of the given functions.  
Step 2: evaluate the integral  
\[
(f*g)(t)=\frac{e^{-bt}-e^{-at}}{a-b}.
\]  
*Why:* standard antiderivative of the exponential.  
Step 3: take the Laplace transform term by term  
\[
\mathcal{L}\{f*g\}=\frac{1}{a-b}\Bigl(\frac{1}{s+b}-\frac{1}{s+a}\Bigr)=\frac{1}{(s+a)(s+b)}.
\]  
*Why:* linearity and the known transform of each exponential.  
**Final answer**  
\[
\frac{1}{(s+a)(s+b)}
\]  
*Reflection:* the algebraic factorization \((s+a)(s+b)\) is precisely \(F(s)G(s)\), confirming the theorem on a concrete pair.

**Example 2 — Recovering an unknown forcing function**  
*Given:* \(y''+3y'+2y=f(t)\), \(y(0)=y'(0)=0\), and \(Y(s)=\frac{1}{s(s+1)(s+2)}\).  
*Find:* \(f(t)\).  
Step 1: factor the denominator  
\[
Y(s)=\frac{1}{s(s+1)(s+2)}\implies F(s)=s(s+1)(s+2)Y(s)=\frac{1}{s+1}.
\]  
*Why:* the characteristic polynomial multiplies \(Y(s)\) to give \(F(s)\).  
Step 2: invert  
\[
f(t)=e^{-t}u(t).
\]  
*Why:* standard inverse Laplace table.  
**Final answer**  
\[
f(t)=e^{-t}u(t)
\]  
*Reflection:* the convolution theorem converts the differential equation into multiplication, allowing immediate recovery of \(f\) without solving an integral equation.

**Example 3 — Impulse response of a second-order system**  
*Given:* \(\ddot y+2\dot y+y=\delta(t)\).  
*Find:* \(y(t)\).  
Step 1: transform both sides  
\[
(s^2+2s+1)Y(s)=1\implies Y(s)=\frac{1}{(s+1)^2}.
\]  
*Why:* Laplace of \(\delta\) is 1; initial conditions are zero.  
Step 2: recognize \(Y(s)=F(s)G(s)\) with \(F(s)=G(s)=\frac{1}{s+1}\).  
*Why:* the theorem therefore asserts that \(y(t)\) equals the convolution of \(e^{-t}u(t)\) with itself.  
Step 3: compute the convolution  
\[
y(t)=\int_0^t e^{-(t-u)}e^{-u}\,du=te^{-t}.
\]  
**Final answer**  
\[
y(t)=te^{-t}u(t)
\]  
*Reflection:* repeated factors in the denominator correspond to polynomial multipliers in time, a direct consequence of convolving a function with itself.

**Example 4 — Piecewise forcing via convolution**  
*Given:* \(y'+y=u(t-1)\).  
*Find:* \(y(t)\).  
Step 1: write \(F(s)=\frac{e^{-s}}{s}\), \(G(s)=\frac{1}{s+1}\).  
*Why:* Laplace of the shifted step and of the impulse response.  
Step 2: multiply  
\[
Y(s)=\frac{e^{-s}}{s(s+1)}.
\]  
Step 3: partial fractions and shift theorem give  
\[
y(t)=(1-e^{-(t-1)})u(t-1).
\]  
**Final answer**  
\[
y(t)=(1-e^{-(t-1)})u(t-1)
\]  
*Reflection:* the exponential delay appears automatically once the product is inverted; no separate convolution integral need be evaluated.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the lower limit 0 in the unilateral convolution | Students copy the bilateral formula | Always write \(\int_0^t\) when using the unilateral Laplace transform. |
| Treating convolution as pointwise multiplication | Notation \(f*g\) looks like ordinary product | Explicitly expand the integral definition on the first line of every calculation. |
| Ignoring the region of integration when changing order | Double-integral limits are drawn incorrectly | Sketch the \((t,u)\) plane and shade \(0<u<t<\infty\) before applying Fubini. |
| Applying the theorem to non-causal functions without extending by zero | The proof uses \(t>0\) throughout | Multiply every function by the unit step \(u(t)\) before transforming. |
| Confusing \(\mathcal{L}\{f g\}\) with \(\mathcal{L}\{f*g\}\) | Both operations turn into products under different transforms | Remember: time-domain product \(\to\) frequency convolution; time convolution \(\to\) frequency product. |
| Dropping the factor \(e^{-su}\) after the substitution \(\sigma=t-u\) | Algebraic slip during the change of variable | Keep the exponential term visible until the inner integral is recognized as \(F(s)\). |
| Inverting \(F(s)G(s)\) without checking ROC overlap | The product may converge in a smaller half-plane | Verify that the common abscissa of convergence lies to the right of all poles before inverting. |

## 7. The textbook-precise statement
Let \(f\) and \(g\) be piecewise continuous on \([0,\infty)\) and of exponential order. Then their convolution
\[
(f*g)(t)=\int_0^t f(t-s)g(s)\,ds
\]
exists for all \(t>0\) and
\[
\mathcal{L}\{f*g\}(s)=F(s)G(s),\qquad\operatorname{Re}(s)>\max(\sigma_f,\sigma_g),
\]
where \(F=\mathcal{L}\{f\}\) and \(G=\mathcal{L}\{g\}\). (Boyce & DiPrima, *Elementary Differential Equations*, 11th ed., §6.6, Theorem 2.)

## 8. Visual — diagram or schematic
```text
t-axis ─────────────────────────────────────────────▶
          g(u)          f(t-u)
            ▁▁▁          ▁▁▁
           ▏   ▏        ▏   ▏
          ▏     ▏      ▏     ▏
         ▏       ▏    ▏       ▏
u=0 ────●─────────●────────────●────▶ u
        0         u          t
```
The shaded overlap region between the leftward-moving copy of \(f\) and the fixed copy of \(g\) is integrated at each fixed \(t\) to produce the value of \((f*g)(t)\). The vertical line at \(u=t\) marks the upper limit of integration.

## 9. The memory technique
1. **The hook** — Picture two trains of boxcars labelled \(f\) and \(g\) sliding past each other; the total “cargo overlap” at each instant is the convolution, and the Laplace transform simply multiplies the two cargo manifests.  
2. **What to overlearn** — \(\mathcal{L}\{f*g\}=F(s)G(s)\) together with the explicit integral definition of \(*\).  
3. **Spaced-repetition schedule** — Re-derive the double-integral interchange after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — Return to the definition, insert the Laplace integral, change the order of integration, and shift the inner variable; every other property follows.

## 10. What this unlocks
Mastery of the convolution theorem lets you replace any linear constant-coefficient initial-value problem by an algebraic equation in the s-domain and then recover the solution by a single inverse transform. The same identity underpins the construction of Green’s functions, the analysis of feedback loops, and the design of digital filters via bilinear transformation.

- Next: variation of parameters expressed through convolution  
- Next: Laplace-transform solution of systems of ODEs  
- Next: transfer-function algebra in classical control theory  
- Next: derivation of the Fourier convolution theorem by letting \(s\to i\omega\)

## 11. Self-check — five questions, no answers
1. Compute \((e^{-t}u(t))*(t u(t))\) directly from the integral definition and verify that its Laplace transform equals \(\frac{1}{s+1}\cdot\frac{1}{s^2}\).  
2. A system has impulse response \(e^{-2t}u(t)\). Write the output when the input is the rectangular pulse \(u(t)-u(t-3)\).  
3. Why does the convolution theorem fail if either function grows faster than every exponential?  
4. Show that convolution is commutative, i.e., \(f*g=g*f\), by a change of variable inside the integral.  
5. Given \(Y(s)=\frac{1}{(s+1)(s^2+1)}\), recover \(y(t)\) both by partial fractions and by explicitly convolving the inverse transforms; confirm the two expressions coincide.