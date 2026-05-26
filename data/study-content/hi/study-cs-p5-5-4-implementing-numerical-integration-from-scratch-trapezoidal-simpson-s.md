## 1. The one-sentence answer

**Numerical integration from scratch approximates \(\int_a^b f(x)\,dx\) by replacing the curve with simple geometric shapes whose areas are easy to compute exactly.**

Trapezoidal rule joins consecutive points with straight lines and treats each strip as a trapezoid. Simpson’s rule fits a quadratic through every three points and sums the exact areas under those parabolas. Both methods convert an unknown integral into a weighted sum of function values at chosen nodes.

Aap soch sakte ho ki continuous area ko discrete points par measure karke, un points ko connect karke, aur unke neeche wale shapes ka area nikaal kar approximation kar rahe ho. Yeh approach tab useful hoti hai jab antiderivative analytically nahi milta.

> [!NOTE]
> The single most important “aha” is that the error order improves dramatically once you allow the approximating pieces to be quadratic instead of linear: trapezoidal error per interval is \(O(h^3)\), Simpson’s is \(O(h^5)\).

## 2. Why this matters — concrete and current

SpaceX uses composite Simpson quadrature inside trajectory optimizers that propagate Falcon 9 stage-separation burns; a 0.01 % gain in integration accuracy directly reduces propellant margin calculations.  
In semiconductor TCAD tools such as Synopsys Sentaurus, carrier-density integrals over doping profiles are evaluated with adaptive trapezoidal rules because the doping functions contain abrupt junctions that defeat symbolic antiderivatives.  
Google’s JAX library implements its own `scipy.integrate` style trapezoidal and Simpson kernels so that gradients of simulation losses remain exact; every training step of a physics-informed neural network therefore calls these routines thousands of times.  
LIGO’s strain-to-frequency pipeline integrates power spectral density estimates with a 4th-order composite Simpson rule to keep phase errors below 10^{-8} rad across 4 km interferometer arms.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definite integral as net signed area | Defines the quantity we are approximating               |
| Linear and quadratic interpolation | Trapezoidal uses lines, Simpson’s uses parabolas        |
| Big-O error analysis     | Lets us compare convergence rates without running code  |
| Python loops and NumPy arrays | Actual implementation must be vectorised for speed      |

Agar aap interpolation ya error orders nahi jaante, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Partition the interval
Aap interval \([a,b]\) ko \(n\) equal-width subintervals mein todte ho. Har subinterval ki width \(h = (b-a)/n\) hoti hai. Nodes \(x_i = a + i h\) par function values \(f(x_i)\) collect karte ho.

**Concrete example.** Let \(a=0\), \(b=2\), \(n=4\). Then \(h=0.5\) and nodes are \(0,0.5,1,1.5,2\).

Formal statement:
\[
x_i = a + i h,\qquad i=0,1,\dots,n.
\]

> [!WARNING]
> Agar \(n\) even nahi hai to Simpson’s rule seedha apply nahi ho sakta; aapko last interval alag se handle karna padega.

### Step 2 — Replace the curve by straight lines (trapezoidal)
Har pair \((x_i,f(x_i))\) aur \((x_{i+1},f(x_{i+1}))\) ko ek line se jod do. Us line ke neeche ka area ek trapezoid ka area hai:
\[
A_i = \frac{h}{2}\bigl(f(x_i)+f(x_{i+1})\bigr).
\]

### Step 3 — Sum all trapezoids
Total approximation composite trapezoidal rule ban jaati hai:
\[
T = \frac{h}{2}\bigl(f(x_0)+2f(x_1)+\dots+2f(x_{n-1})+f(x_n)\bigr).
\]

### Step 4 — Fit a parabola through every three points (Simpson’s)
Teen consecutive points par ek unique quadratic \(p(x)\) fit karte ho. Us quadratic ka exact integral nikaalte ho. Result ek weighted sum deta hai:
\[
S_i = \frac{h}{3}\bigl(f(x_{2i})+4f(x_{2i+1})+f(x_{2i+2})\bigr).
\]

### Step 5 — Composite Simpson’s rule
Agar \(n\) even hai to pura interval cover karne ke liye \(n/2\) aise groups banate ho:
\[
S = \frac{h}{3}\Bigl(f(x_0)+4f(x_1)+2f(x_2)+\dots+4f(x_{n-1})+f(x_n)\Bigr).
\]

### Step 6 — Derive the error term (textbook rigour)
Taylor expansion se pata chalta hai ki trapezoidal ka local truncation error \(-\frac{h^3}{12}f''(\xi)\) aur Simpson’s ka \(-\frac{h^5}{90}f^{(4)}(\xi)\) hota hai. Global error phir \(O(h^2)\) aur \(O(h^4)\) ban jaata hai.

### Step 7 — Translate the formulas into executable Python
Ab aap in formulas ko NumPy arrays par direct implement kar sakte ho bina `scipy` ke.

## 5. Worked examples — har step show karo

**Example 1 — Single trapezoid**  
*Given:* \(\int_0^1 x^2\,dx\), \(n=1\).  
*Find:* Trapezoidal approximation.  
Step 1: \(h=1\), nodes \(0,1\).  
Step 2: \(T = \frac{1}{2}(0+1)=0.5\).  
*Why:* Formula directly lagaya kyunki ek hi interval hai.  
**0.5**

*Reflection:* Exact answer \(1/3\) se 50 % galat hai; linear approximation quadratic ke liye weak hai.

**Example 2 — Composite trapezoidal, n=4**  
*Given:* \(\int_0^1 e^x\,dx\).  
*Find:* \(T_4\).  
\(h=0.25\), nodes \(0,0.25,0.5,0.75,1\).  
Values: \(1, 1.2840, 1.6487, 2.1170, 2.7183\).  
\(T = 0.125(1 + 2\cdot1.2840 + 2\cdot1.6487 + 2\cdot2.1170 + 2.7183) = 1.7272\).  
*Why:* Har internal point ko 2 se multiply kiya kyunki woh do trapezoids mein share hota hai.  
**1.7272**

*Reflection:* Exact value \(e-1\approx1.7183\); error already 0.5 % se kam.

**Example 3 — Simpson’s rule, n=2**  
*Given:* \(\int_0^2 x^3\,dx\).  
*Find:* \(S_2\).  
\(h=1\), nodes \(0,1,2\).  
\(S = \frac{1}{3}(0 + 4\cdot1 + 8) = 4\).  
*Why:* Quadratic fit kiya aur exact integral liya.  
**4**

*Reflection:* Exact answer bhi 4 hai; degree-3 polynomial par Simpson’s exact hota hai.

**Example 4 — Composite Simpson’s, n=4**  
*Given:* \(\int_0^{\pi/2}\sin x\,dx\).  
*Find:* \(S_4\).  
\(h=\pi/8\). Nodes aur values calculate karke formula apply karo. Final result **0.999999** (machine precision tak exact).

*Reflection:* Higher even \(n\) se error \(O(h^4)\) ki wajah se jaldi girta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the factor 2 on interior points | Students copy single-interval formula       | Always write the coefficient pattern first   |
| Using odd n with Simpson’s        | Rule requires pairs of intervals            | Check n % 2 == 0 before coding               |
| Off-by-one in array indexing      | 0-based vs 1-based confusion                | Use Python slices: f[1:-1:2] for odd indices |
| h not recomputed after changing n | Hard-coded step size                        | Always compute h = (b-a)/n inside function   |
| Applying Simpson to non-smooth f  | Error term assumes f^{(4)} continuous       | Inspect plot or derivative before choosing rule |

## 7. The textbook-precise statement

Let \(f\in C^4[a,b]\) and let \(n\) be even. The composite Simpson rule
\[
S_n(f)=\frac{h}{3}\Bigl[f(a)+f(b)+4\sum_{k=1}^{n/2}f(a+(2k-1)h)+2\sum_{k=1}^{n/2-1}f(a+2kh)\Bigr],
\]
where \(h=(b-a)/n\), satisfies
\[
\int_a^b f(x)\,dx-S_n(f)=-\frac{(b-a)}{180}h^4 f^{(4)}(\xi)
\]
for some \(\xi\in(a,b)\). (Burden & Faires, *Numerical Analysis*, 10e, Theorem 4.4.)

## 8. Visual — diagram or schematic

```text
x0   x1   x2   x3   x4
 |    |    |    |    |
 f0---f1---f2---f3---f4     trapezoidal lines
   \  /  \  /  \  /  \
    \/____\/____\/____\     Simpson parabolas
```

Horizontal axis labelled with equal spacing h; vertical lines show f values. Trapezoids are straight-line tops; Simpson’s rule curves the tops into upward or downward parabolas between every three points.

## 9. The memory technique

1. **The hook** — Picture a “trap-ezoid” that catches the area like a net, then imagine upgrading the net to a “parabola-parachute” that hugs the curve much tighter.
2. **What to overlearn** — Coefficient pattern for Simpson’s: 1,4,2,4,2,…,1 and the global error orders \(O(h^2)\) vs \(O(h^4)\).
3. **Spaced-repetition schedule** — Review formulas after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from Taylor expansion of f around the midpoint of each panel; integrate term-by-term to recover both rules and their leading error terms.

## 10. What this unlocks

Once aap numerical quadrature implement kar sakte ho, aap ODE solvers (Runge–Kutta), finite-element stiffness matrices, and Monte-Carlo variance reduction schemes seedha likh sakte ho.

- Adaptive quadrature with error control
- Gaussian quadrature nodes/weights derivation
- Spectral methods that replace polynomials by global bases

## 11. Self-check — five questions, no answers

1. Derive the coefficient 4 in Simpson’s rule from integrating a fitted quadratic.
2. For \(f(x)=x^4\) on [0,1], compute both \(T_4\) and \(S_4\) and compare absolute errors.
3. Why does Simpson’s rule give the exact integral for any cubic polynomial?
4. Identify the bug: a student wrote `np.sum(f[::2])` instead of separating odd and even indices.
5. If \(f''(x)\) changes sign inside [a,b], which rule is more likely to underestimate the integral and why?