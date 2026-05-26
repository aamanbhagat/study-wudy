## 1. The one-sentence answer
**A Taylor series is the unique power series that equals a given infinitely differentiable function in some interval around a chosen center.**

Any power series \(\sum c_n(x-a)^n\) that converges to \(f(x)\) near \(x=a\) must have coefficients fixed by the derivatives of \(f\) at \(a\). Differentiating the series term by term and evaluating at the center immediately produces those coefficients; no other choice works. The resulting expression therefore supplies the only candidate for a local power-series representation.

This construction begins from the algebraic fact that power series can be differentiated inside their open interval of convergence. Once that license is granted, every higher derivative at the center is forced, and the coefficients follow at once.

> [!NOTE]
> The series is completely determined by local derivative data at a single point; global behavior of \(f\) enters only later when the radius of convergence is checked.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s Deep Space Network uses Taylor expansions of the gravitational potential of irregular asteroids to compute real-time trajectory corrections; the same expansion supplies the linearised state-transition matrices fed to the Kalman filter on board the spacecraft.

In semiconductor device simulation, Synopsys TCAD solvers expand carrier mobility and recombination rates in Taylor series about local electric-field values so that Newton–Raphson iterations remain inside the quadratic-convergence regime even at 3 nm process nodes.

Transformer language models at OpenAI and Google rely on the Taylor expansion of the softmax and GELU nonlinearities when computing Hessian-vector products for second-order optimisers; the resulting curvature estimates reduce the number of training steps needed to reach a given validation loss.

In precision metrology, the LIGO collaboration expands the phase response of the Fabry–Pérot cavities to third order in mirror displacement; the cubic term accounts for radiation-pressure-induced optical-spring shifts that would otherwise masquerade as gravitational-wave signals.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Power series & radius of convergence | The Taylor series is simply the power series whose coefficients are chosen to match a function; convergence questions remain unchanged. |
| Term-by-term differentiation | The only operation that extracts the coefficients from the unknown series. |
| Higher-order derivatives | Each differentiation of the series produces the next coefficient via \(f^{(n)}(a)\). |
| Factorials and \(n!\)    | They appear automatically when the \(n\)th derivative of \(x^n\) is evaluated. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Assume a power-series representation exists
Suppose \(f\) is infinitely differentiable at \(a\) and can be written as a power series in some open interval around \(a\). Then there exist coefficients \(c_n\) such that
\[
f(x)=\sum_{n=0}^\infty c_n(x-a)^n
\]
for all \(x\) inside the interval of convergence.

### Step 2 — Evaluate at the centre
Substitute \(x=a\); every term with \(n\geq 1\) vanishes and the constant term survives:
\[
f(a)=c_0.
\]
Thus the zeroth coefficient is simply the function value.

### Step 3 — Differentiate once and re-evaluate
Differentiate term by term (valid inside the open interval of convergence):
\[
f'(x)=\sum_{n=1}^\infty n c_n(x-a)^{n-1}.
\]
Set \(x=a\):
\[
f'(a)=1\cdot c_1\implies c_1=f'(a).
\]

### Step 4 — Differentiate again
A second differentiation yields
\[
f''(x)=\sum_{n=2}^\infty n(n-1)c_n(x-a)^{n-2}.
\]
Evaluating at \(x=a\) isolates the second coefficient:
\[
f''(a)=2\cdot 1\cdot c_2\implies c_2=\frac{f''(a)}{2!}.
\]

### Step 5 — Continue inductively
After \(k\) differentiations the pattern is
\[
f^{(k)}(x)=\sum_{n=k}^\infty n(n-1)\cdots(n-k+1)c_n(x-a)^{n-k}.
\]
Setting \(x=a\) leaves only the \(n=k\) term:
\[
f^{(k)}(a)=k!\,c_k\implies c_k=\frac{f^{(k)}(a)}{k!}.
\]

### Step 6 — Write the general term
Substituting the coefficients back into the original series produces the Taylor series of \(f\) centred at \(a\):
\[
f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n.
\]

### Step 7 — State the remainder (optional but necessary for rigour)
If the series is truncated after \(N\) terms, the Lagrange form of the remainder is
\[
R_N(x)=\frac{f^{(N+1)}(\xi)}{(N+1)!}(x-a)^{N+1}
\]
for some \(\xi\) between \(a\) and \(x\). This quantifies the truncation error.

> [!WARNING]
> Term-by-term differentiation is legitimate only inside the open interval of convergence; at an endpoint the differentiated series may diverge even if the original converged.

## 5. Worked examples — every step shown

**Example 1 — Exponential function**  
*Given:* \(f(x)=e^x\), centre \(a=0\).  
*Find:* its Taylor series.  

Assume \(e^x=\sum c_n x^n\).  
Differentiate: \(e^x=\sum n c_n x^{n-1}\).  
Set \(x=0\): \(c_1=1\).  
Repeat: every derivative equals \(e^x\), so at 0 every derivative equals 1.  
Hence \(c_n=1/n!\).  
The series is
\[
e^x=\sum_{n=0}^\infty\frac{x^n}{n!}.
\]
**Final answer**  
\[
\sum_{n=0}^\infty\frac{x^n}{n!}
\]

*Reflection:* The constant derivative of \(e^x\) makes every coefficient identical after scaling by \(n!\); the same pattern appears for \(\sin x\) and \(\cos x\) after cycling through the four trigonometric derivatives.

**Example 2 — Sine**  
*Given:* \(f(x)=\sin x\), \(a=0\).  
*Find:* Taylor series up to order 5.  

\(f(0)=0\), \(f'(0)=1\), \(f''(0)=0\), \(f'''(0)=-1\), \(f^{(4)}(0)=0\), \(f^{(5)}(0)=1\).  
Coefficients: \(c_0=0\), \(c_1=1\), \(c_2=0\), \(c_3=-1/3!\), \(c_4=0\), \(c_5=1/5!\).  
Series:
\[
\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}.
\]

*Reflection:* Odd derivatives alone survive; the pattern of alternating signs is fixed by the cycle of sine derivatives.

**Example 3 — Geometric series**  
*Given:* \(f(x)=1/(1-x)\), \(a=0\).  
*Find:* its Taylor series.  

All derivatives are \(f^{(n)}(x)=n!(1-x)^{-n-1}\), so at 0 they equal \(n!\).  
Thus \(c_n=1\). The series is \(\sum x^n\), valid for \(|x|<1\).

*Reflection:* The radius of convergence is visible from the singularity at \(x=1\), illustrating that local derivative data do not determine global convergence.

**Example 4 — Non-analytic smooth function**  
*Given:* \(f(x)=e^{-1/x^2}\) for \(x>0\), \(f(x)=0\) for \(x\leq 0\).  
*Find:* Taylor series at 0.  

Every derivative at 0 vanishes (standard limit argument). The formal Taylor series is identically zero, yet \(f(x)>0\) for \(x>0\).  

*Reflection:* The example shows that existence of all derivatives is necessary but not sufficient for the series to represent the function; analyticity must be verified separately.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the radius of convergence | Students treat the formal series as globally valid. | Always compute or estimate the radius via ratio/root test after obtaining coefficients. |
| Differentiating at an endpoint | The theorem permits term-by-term differentiation only inside the open interval. | Restrict evaluation to \(|x-a|<R\). |
| Confusing Taylor with Maclaurin | Maclaurin is merely the special case \(a=0\). | Write the centre explicitly each time. |
| Assuming every \(C^\infty\) function equals its Taylor series | Counter-examples exist (Example 4). | Check remainder \(\to 0\) or verify analyticity. |
| Dropping the factorial in the denominator | Counting differentiations without the product rule. | Keep the inductive step \(c_k=f^{(k)}(a)/k!\) visible. |
| Using the series outside its interval of guaranteed convergence | Extrapolation beyond the nearest singularity. | Locate singularities of \(f\) first; they bound the radius. |
| Neglecting the remainder term when approximating | Truncation error is invisible without \(R_N\). | Always state the order and bound \(|R_N|\) for numerical work. |

## 7. The textbook-precise statement
Let \(f\) be infinitely differentiable on an open interval containing \(a\). The **Taylor series** of \(f\) centred at \(a\) is the power series
\[
\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n.
\]
If the remainder \(R_N(x)\to 0\) as \(N\to\infty\) for each fixed \(x\) in some interval, then the series converges to \(f(x)\) on that interval. (See Stewart, *Calculus*, 9e, §11.10, Theorem 3.)

## 8. Visual — diagram or schematic

```
f(x)
 ^
 |               •
 |            •     •
 |         •           •
 |      •                 •
 |   •                       •
 |•_____________________________•______ x
         a
```
The curve is \(f\), the dots mark successive polynomial approximants of increasing degree that match \(f\) and all its derivatives at the single point \(a\); away from \(a\) they may diverge once \(|x-a|\) exceeds the radius.

## 9. The memory technique

1. **The hook** — Picture a lighthouse at \(a\); each derivative is a successive “flash” that paints the coefficient onto the power-series lighthouse beam.
2. **What to overlearn** — The coefficient formula \(c_n=f^{(n)}(a)/n!\) and the statement that term-by-term differentiation is valid inside the open disk of convergence.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the coefficients by writing the assumed series, differentiating \(k\) times, and evaluating at \(a\).

## 10. What this unlocks
Taylor series supply the local polynomial model that underpins linearisation in differential equations, asymptotic analysis, numerical quadrature, and automatic differentiation.  

- Remainder estimates lead directly to Taylor’s theorem with integral or Lagrange remainder.  
- Power-series solutions of ODEs become routine once the coefficient rule is known.  
- Complex analysis extends the same idea to disks in the complex plane, yielding analytic continuation.  
- Numerical methods such as Newton iteration and finite-difference stencils are first-order Taylor expansions.

## 11. Self-check — five questions, no answers
1. Write the Taylor series of \(\ln(1+x)\) about \(a=0\) up to order 4 and state its radius of convergence.  
2. Show that the Taylor series of any polynomial of degree \(d\) about any point is the polynomial itself after degree \(d\).  
3. Compute the Taylor polynomial of degree 3 for \(f(x)=\tan x\) at \(a=0\) and bound the error on \([-0.1,0.1]\).  
4. Explain why the function \(f(x)=|x|^3\) has a Taylor series of all even powers only, yet is not equal to that series.  
5. Given that the remainder after \(N\) terms satisfies \(|R_N(x)|\leq M|x-a|^{N+1}/(N+1)!\) on an interval, derive an explicit \(N\) guaranteeing five-decimal accuracy for \(e^{0.3}\).