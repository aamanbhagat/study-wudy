## 1. The one-sentence answer
**Integration by parts** is the integral counterpart of the product rule for derivatives, obtained by rearranging \(d(uv)=u\,dv+v\,du\) and solving for one of the resulting integrals.

Start with the product rule itself: if two differentiable functions \(u(x)\) and \(v(x)\) are multiplied, their derivative is \((uv)'=u'v+uv'\). Rearrange the equation so that the term containing \(uv'\) moves to the other side; then integrate both sides. The left side becomes the single product \(uv\), while the right side splits into two separate integrals. One of those integrals is exactly the original integrand we wanted, and the other is usually simpler. This single algebraic rearrangement yields the working formula
\[
\int u\,dv=uv-\int v\,du.
\]
The only remaining skill is choosing which factor to label \(u\) and which to label \(dv\); the LIATE rule supplies a reliable order of preference.

> [!NOTE]
> The entire technique rests on one observation: differentiation lowers the “complexity” of many functions (polynomials drop degree, trig functions cycle, exponentials stay the same), so we deliberately differentiate the factor that simplifies fastest and integrate the factor that stays manageable.

## 2. Why this matters — concrete and current
In semiconductor device physics, the current–voltage integral for a MOSFET contains the product of a linear potential term and an exponential Fermi–Dirac factor; integration by parts converts that integral into a rapidly convergent series used by TCAD simulators at TSMC and Intel.  
In probabilistic machine-learning models, the evidence lower bound (ELBO) for variational auto-encoders at labs such as OpenAI repeatedly requires \(\int x\cdot\log p(x)\,dx\); integration by parts reduces the expression to an expectation that automatic-differentiation frameworks can evaluate without sampling noise.  
NASA’s orbital-mechanics pipelines evaluate the action integral \(\int t\cdot\sin(\omega t)\,dt\) when propagating two-line element sets under atmospheric drag; the closed-form result obtained by parts feeds directly into the SGP4 propagator.  
In quantum-field-theory calculations at CERN, the Passarino–Veltman reduction of one-loop tensor integrals begins with integration by parts identities that relate higher-rank integrals to lower-rank ones, cutting the computational cost of Higgs cross-section predictions by orders of magnitude.  
Signal-processing libraries inside modern smartphones (Apple A-series DSP, Qualcomm Hexagon) use integration by parts to obtain exact antiderivatives of windowed Fourier kernels, eliminating the need for numerical quadrature inside real-time audio pipelines.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Derivative       | Source of the product rule that we invert                 |
| Product rule     | The single identity we rearrange to obtain the formula    |
| Basic antiderivatives | We must still compute \(\int v\,du\) after the swap     |
| Function classification (polynomial, exponential, trig, log) | LIATE ordering depends on how fast each class simplifies under differentiation |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the product rule
Differentiate a product of two functions and write the result in differential form.  
Example: let \(u=x\), \(v=e^x\). Then \(d(uv)=d(xe^x)=e^x\,dx+x\,de^x\).  
Formal statement:
\[
d(uv)=u\,dv+v\,du.
\]
> [!WARNING]
> If you treat \(du\) and \(dv\) as ordinary derivatives instead of differential forms, the subsequent integration step becomes notationally inconsistent.

### Step 2 — Isolate the term you want to integrate
Move the \(v\,du\) term across the equality:
\[
u\,dv=d(uv)-v\,du.
\]
No new mathematics; only algebra.

### Step 3 — Integrate both sides
Integrate the previous line with respect to the underlying variable:
\[
\int u\,dv=uv-\int v\,du.
\]
The left side is the target integral; the right side replaces it with a product minus another integral.

### Step 4 — Choose the parts strategically
Label the original integrand as a product \(f(x)g(x)\). Decide which factor receives the label \(u\) (will be differentiated) and which receives \(dv\) (will be integrated). The choice determines whether the new integral is easier or harder.

### Step 5 — Apply the LIATE preference order
LIATE ranks factors in the order: Logarithmic, Inverse trig, Algebraic (polynomial), Trigonometric, Exponential. Differentiate the highest-ranking factor first.  
Concrete test: \(\int x\ln x\,dx\) — \(\ln x\) is L, so set \(u=\ln x\), \(dv=x\,dx\).

### Step 6 — Verify the new integral is simpler
After substitution, confirm that \(\int v\,du\) either has lower degree, cycles back to the original integral (reduction formula), or matches a known antiderivative. If not, swap labels and repeat.

### Step 7 — Textbook-grade formula
Under the sole hypothesis that \(u\) and \(v\) are continuously differentiable on an interval containing the domain of integration,
\[
\int_a^b u\,dv=\Bigl[uv\Bigr]_a^b-\int_a^b v\,du.
\]

## 5. Worked examples — har step show karo

**Example 1 — Polynomial times exponential**  
*Given:* \(\int x e^x\,dx\)  
*Find:* the indefinite integral.  
Set \(u=x\) (A before E), \(dv=e^x\,dx\).  
Then \(du=dx\), \(v=e^x\).  
\[
\int x e^x\,dx=x e^x-\int e^x\,dx=x e^x-e^x+C.
\]
*Why:* differentiation removed the polynomial factor, leaving only the exponential we already know.  
**Final answer**  
\[xe^x-e^x+C\]

*Reflection:* The example is the prototype for every polynomial–exponential product; LIATE choice was unambiguous.

**Example 2 — Polynomial times sine**  
*Given:* \(\int x\sin x\,dx\)  
*Find:* the antiderivative.  
\(u=x\), \(dv=\sin x\,dx\) → \(du=dx\), \(v=-\cos x\).  
\[
\int x\sin x\,dx=-x\cos x-\int(-\cos x)\,dx=-x\cos x+\int\cos x\,dx=-x\cos x+\sin x+C.
\]
*Why:* integration of sine produced cosine; the new integral is standard.  
**Final answer**  
\[-x\cos x+\sin x+C\]

*Reflection:* Shows the same LIATE decision works for any polynomial–trig pair.

**Example 3 — Logarithm**  
*Given:* \(\int\ln x\,dx\)  
*Find:* the antiderivative.  
Write \(\ln x\) as \(1\cdot\ln x\). Set \(u=\ln x\) (L), \(dv=dx\) → \(du=\frac1x\,dx\), \(v=x\).  
\[
\int\ln x\,dx=x\ln x-\int x\cdot\frac1x\,dx=x\ln x-\int1\,dx=x\ln x-x+C.
\]
*Why:* the extra integral collapsed to a trivial constant.  
**Final answer**  
\[x\ln x-x+C\]

*Reflection:* Demonstrates why logarithms are always differentiated first.

**Example 4 — Reduction formula**  
*Given:* \(I_n=\int x^n e^x\,dx\)  
*Find:* a recurrence relating \(I_n\) to \(I_{n-1}\).  
\(u=x^n\), \(dv=e^x\,dx\) → \(du=n x^{n-1}dx\), \(v=e^x\).  
\[
I_n=x^n e^x-n\int x^{n-1}e^x\,dx=x^n e^x-n I_{n-1}.
\]
*Why:* each application lowers the power by one until \(I_0\) is reached.  
**Final answer**  
\[I_n=e^x\sum_{k=0}^n(-1)^k\frac{n!}{(n-k)!}x^{n-k}+C\]

*Reflection:* Tabular method or repeated parts both follow from this single recurrence.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the minus sign | Algebraic rearrangement is mis-copied | Always write \(uv-\int v\,du\) explicitly before substituting |
| Choosing \(dv\) as the more complicated factor | Student follows alphabetical order instead of LIATE | Recite LIATE aloud while labelling |
| Differentiating both factors | Mechanical habit from product rule | Label only one factor as \(u\) |
| Applying the formula to definite integrals without evaluating the boundary term | Boundary term looks “extra” | Write \([uv]_a^b\) first, then subtract the remaining integral |
| Using integration by parts on a sum instead of a product | Mis-identification of integrand structure | Factor the integrand; if no product exists, another technique is needed |
| Circular choice that returns the original integral without progress | Both factors are exponentials or trig functions of same type | Switch to another method (e.g., substitution) |
| Dropping the constant of integration midway | Focus only on the definite-integral version | Keep \(+C\) until the very last line for indefinite integrals |

## 7. The textbook-precise statement
Let \(u\) and \(v\) be continuously differentiable real-valued functions on an open interval \(I\). Then the integration-by-parts formula
\[
\int u(x)\,dv(x)=u(x)v(x)-\int v(x)\,du(x)
\]
holds for every \(x\in I\) (indefinite-integral version). For a closed bounded interval \([a,b]\subset I\) the corresponding definite-integral statement is
\[
\int_a^b u\,dv=\Bigl[uv\Bigr]_a^b-\int_a^b v\,du,
\]
where the bracket notation denotes \(u(b)v(b)-u(a)v(a)\). (Stewart, *Calculus*, 9e, §7.1, Theorem 1.)

## 8. Visual — diagram or schematic
```text
Product rule (differentiate)          Integration by parts (integrate)
     u·v                                   ∫u dv
      |                                      |
   d(uv) = u dv + v du   →   rearrange →   uv - ∫v du
      |                                      |
   derivative lowers degree          new integral usually simpler
```
LIATE arrow points from “differentiate first” (L) to “integrate first” (E).

## 9. The memory technique

1. **The hook**  
   Picture a queue of five people labelled L-I-A-T-E; the person at the front (Log) is always asked to step out and differentiate, while the last person (Exp) stays and integrates.

2. **What to overlearn**  
   - Formula: \(\int u\,dv=uv-\int v\,du\)  
   - LIATE order exactly as written  
   - Boundary term must be evaluated for definite integrals

3. **Spaced-repetition schedule**  
   Review the formula and LIATE on day 1, day 3, day 7, day 16, day 35.

4. **First-principles fallback**  
   If the formula is forgotten, restart from the product rule \(d(uv)=u\,dv+v\,du\), move the \(v\,du\) term, and integrate both sides.

## 10. What this unlocks
Integration by parts is the gateway to reduction formulas, tabular integration, and the systematic treatment of products that appear in trigonometric integrals and improper integrals.  
- Reduction formulas for \(\int\sin^n x\,dx\) and \(\int x^n e^x\,dx\)  
- Derivation of the gamma-function recurrence \(\Gamma(z+1)=z\Gamma(z)\)  
- Integration of inverse trigonometric functions and polylogarithms  
- Foundation for integration by parts in higher dimensions (Green’s identities)

## 11. Self-check — five questions, no answers
1. Compute \(\int x^2e^{3x}\,dx\) and verify by differentiation.  
2. Without calculating, decide the LIATE labels for \(\int\arctan x\,dx\).  
3. Evaluate the definite integral \(\int_0^1\ln x\,dx\) and confirm the boundary term vanishes.  
4. Identify the single step that fails if a student writes \(\int u\,dv=uv+\int v\,du\).  
5. Derive the reduction formula for \(\int x^n\cos x\,dx\) and state the base case.