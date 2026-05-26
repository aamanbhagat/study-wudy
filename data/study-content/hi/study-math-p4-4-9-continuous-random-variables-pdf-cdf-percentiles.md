## 1. The one-sentence answer
**Continuous random variables are described by a probability density function (PDF) whose integral over an interval gives the probability that the variable lies in that interval, with the cumulative distribution function (CDF) obtained by integrating the PDF from negative infinity, and percentiles recovered by inverting the CDF.**

A continuous random variable can take any value in a real interval rather than jumping between discrete points. Its behaviour is captured entirely by the PDF \(f_X(x)\), which itself is never a probability; only areas under the curve represent probabilities. The CDF \(F_X(x)\) accumulates all probability up to \(x\), so \(F_X(x) = P(X \leq x)\). Percentiles are simply the inverse operation: given a probability \(p\), solve \(F_X(x_p) = p\) for the value \(x_p\).

Because the PDF is a density, its value at a single point does not matter; only integrals do. This is why \(P(X = a) = 0\) for any exact point \(a\), yet intervals around \(a\) can carry positive probability.

> [!NOTE]
> The single deepest insight is that the PDF and CDF are two views of the same information: differentiation recovers the density from the cumulative function, while integration recovers the cumulative from the density; percentiles live in the CDF world and must be obtained by inversion, not by direct inspection of the PDF.

## 2. Why this matters — concrete and current
In quantitative finance, Black–Scholes option pricing and modern risk engines at firms such as Jane Street and Citadel treat log-returns as continuous random variables; the PDF of the normal distribution supplies the density needed to compute Value-at-Risk and expected shortfall integrals every trading day.

NASA’s Mars 2020 entry-descent-landing team modelled atmospheric density and wind gusts as continuous random variables; the CDF of the resulting drag force distribution determined the probability that the parachute would deploy inside the required velocity corridor.

In semiconductor manufacturing, Intel and TSMC treat transistor threshold voltages as continuous random variables whose PDF is extracted from process variation data; the 99.7th percentile of this distribution sets the minimum supply voltage that guarantees timing closure across an entire wafer.

Deep-learning frameworks such as PyTorch and JAX treat pre-activation values inside batch-norm layers as continuous random variables; the running mean and variance are empirical estimates of the first two moments of the underlying PDF, and gradient flow depends on the differentiability of the CDF.

Climate models at the European Centre for Medium-Range Weather Forecasts integrate precipitation PDFs over catchment areas to obtain the CDF of flood volume, which is then inverted to report 100-year return levels used by civil-engineering codes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Riemann integral         | Probability equals the area under the PDF curve           |
| Fundamental theorem of calculus | Differentiation and integration are inverse operations linking PDF and CDF |
| Inverse function         | Percentiles require solving \(F_X(x_p) = p\) for \(x_p\)  |
| Properties of probability measures | Ensures \(F_X(\infty) = 1\) and \(F_X(-\infty) = 0\)      |

If any of these four items feel shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — From discrete histograms to continuous density
Imagine shrinking the width of histogram bins while keeping total area equal to one. The resulting smooth curve is the PDF. For the uniform distribution on \([0,1]\) the height must be exactly 1 so that width times height equals 1.

Formal statement: A non-negative function \(f_X\) is a PDF if
\[
\int_{-\infty}^{\infty} f_X(x)\,dx = 1.
\]

> [!WARNING]
> Treating \(f_X(a)\) itself as a probability is the most common early mistake; it has units of probability per unit length.

### Step 2 — Probability as area, not height
The probability that \(X\) lies between \(a\) and \(b\) is the definite integral of the PDF:
\[
P(a < X \leq b) = \int_a^b f_X(x)\,dx.
\]
For the same uniform example this integral is simply \(b-a\) when \(0\leq a<b\leq 1\).

### Step 3 — Cumulative distribution via integration
Define the CDF by accumulating area from \(-\infty\):
\[
F_X(x) := \int_{-\infty}^x f_X(t)\,dt.
\]
By the fundamental theorem of calculus, wherever \(f_X\) is continuous we recover \(f_X(x) = F_X'(x)\).

> [!WARNING]
> Forgetting the lower limit \(-\infty\) produces an off-by-constant error that ruins later percentile calculations.

### Step 4 — Percentiles via inversion of the CDF
The \(p\)-th percentile (quantile) \(x_p\) satisfies
\[
F_X(x_p) = p, \qquad 0<p<1.
\]
When \(F_X\) is strictly increasing it possesses an inverse \(F_X^{-1}\), and \(x_p = F_X^{-1}(p)\).

### Step 5 — Handling flat regions and jumps in the CDF
If the CDF is constant on an interval, the PDF is zero there; if the CDF jumps, a point mass exists and the random variable is no longer purely continuous. Purely continuous cases have continuous CDFs.

### Step 6 — Textbook-grade summary statement
A random variable \(X\) is continuous if there exists a non-negative integrable function \(f_X\) (the PDF) such that \(F_X(x) = \int_{-\infty}^x f_X(t)\,dt\) for all \(x\), with \(F_X\) absolutely continuous and \(F_X'(x) = f_X(x)\) almost everywhere.

## 5. Worked examples — har step show karo

**Example 1 — Uniform on [2,5]**
*Given:* \(X\sim\text{Uniform}[2,5]\).  
*Find:* PDF, CDF, and the 80th percentile.  

The total length is 3, therefore the constant height must be \(1/3\):
\[
f_X(x) = \frac13,\quad 2\leq x\leq 5.
\]
Integrating from 2 to \(x\) gives the CDF:
\[
F_X(x) = \frac{x-2}{3},\quad 2\leq x\leq 5.
\]
Set \(F_X(x_{0.8})=0.8\):
\[
\frac{x_{0.8}-2}{3}=0.8 \implies x_{0.8}=4.4.
\]
*Why* each move: normalisation fixes the height; the lower limit of integration is the left endpoint of the support; inversion is direct algebra because the CDF is linear.  
**Final answer:** \(f_X(x)=\frac13\) on \([2,5]\), \(F_X(x)=\frac{x-2}{3}\), \(x_{0.8}=4.4\).

*Reflection:* The example is simple because the support is finite and the density constant; the same inversion logic extends to any strictly increasing CDF.

**Example 2 — Exponential with rate \(\lambda=2\)**
*Given:* \(f_X(x)=2e^{-2x}\) for \(x\geq 0\).  
*Find:* CDF and the median.  

\[
F_X(x)=\int_0^x 2e^{-2t}\,dt = 1-e^{-2x},\quad x\geq 0.
\]
Set \(F_X(m)=0.5\):
\[
1-e^{-2m}=0.5\implies m=\frac{\ln 2}{2}\approx 0.3466.
\]
*Why:* The antiderivative of \(e^{-ax}\) is immediate; the lower limit is the support boundary.  
**Final answer:** \(F_X(x)=1-e^{-2x}\), median \(\frac{\ln 2}{2}\).

*Reflection:* Exponential distributions illustrate memorylessness; the median formula generalises to any rate \(\lambda\) as \(\frac{\ln 2}{\lambda}\).

**Example 3 — Standard normal**
*Given:* \(X\sim\mathcal N(0,1)\).  
*Find:* 95th percentile using the inverse CDF.  

No elementary antiderivative exists, so we use the known value \(\Phi^{-1}(0.95)\approx 1.64485\).  
**Final answer:** \(x_{0.95}\approx 1.64485\).

*Reflection:* In practice one calls `scipy.stats.norm.ppf(0.95)` or reads a table; the conceptual step remains inversion of the CDF.

**Example 4 — Mixed support with truncation**
*Given:* \(X\) has PDF proportional to \(x^2\) on \([0,2]\).  
*Find:* Normalising constant, CDF, and 90th percentile.  

First normalise:
\[
\int_0^2 c x^2\,dx = c\cdot\frac83=1\implies c=\frac38.
\]
CDF:
\[
F_X(x)=\frac38\cdot\frac{x^3}{3}=\frac{x^3}{8},\quad 0\leq x\leq 2.
\]
Solve \(\frac{x^3}{8}=0.9\):
\[
x=\sqrt[3]{7.2}\approx 1.932.
\]
*Why:* Normalisation uses the integral definition; the power rule integrates \(x^2\) directly.  
**Final answer:** \(c=\frac38\), \(F_X(x)=\frac{x^3}{8}\), \(x_{0.9}\approx 1.932\).

*Reflection:* Polynomial densities on finite intervals always yield elementary CDFs and algebraic or root-finding inversions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(f_X(a)\) as a probability | Confusing density with mass | Always integrate over an interval, never evaluate at a point |
| Forgetting the lower limit \(-\infty\) when writing the CDF | Treating the antiderivative as the CDF itself | Explicitly write \(\int_{-\infty}^x\) every time |
| Inverting the PDF instead of the CDF for percentiles | Misreading “inverse” | Percentiles live in the CDF world; differentiate only after integration |
| Assuming every CDF is strictly increasing | Ignoring intervals where PDF is zero | Check whether \(F_X\) is constant on any interval before inverting |
| Normalising constant omitted | Jumping straight to “the shape looks right” | Always verify \(\int f_X=1\) before any probability calculation |
| Using \(P(X\leq x)\) for discrete variables in continuous formulas | Mixing paradigms | Confirm the random variable has no atoms before applying continuous formulas |
| Reporting percentile as area under PDF | Confusing vertical and horizontal readings | Draw the CDF curve and mark the horizontal line at height \(p\) |

## 7. The textbook-precise statement
A random variable \(X\) defined on a probability space \((\Omega,\mathcal F,P)\) is said to be (absolutely) continuous if there exists a non-negative Borel-measurable function \(f_X:\mathbb R\to[0,\infty)\) such that
\[
F_X(x)=P(X\leq x)=\int_{-\infty}^x f_X(t)\,dt
\]
for every \(x\in\mathbb R\), where the integral is Lebesgue. In that case \(f_X\) is called the probability density function of \(X\) and satisfies \(\int_{-\infty}^\infty f_X=1\). The CDF \(F_X\) is absolutely continuous and differentiable almost everywhere, with \(F_X'=f_X\) a.e. The quantile function (generalised inverse) is
\[
F_X^{-1}(p)=\inf\{x\in\mathbb R:F_X(x)\geq p\},\qquad p\in(0,1).
\]
(Source: Ross, *A First Course in Probability*, 10e, §5.1–5.3.)

## 8. Visual — diagram or schematic
```
          f_X(x)
            ^
            |          /\
            |         /  \
            |        /    \
            |_______/      \___________> x
           -∞      a      b      ∞
CDF F(x)   0      ↑      ↑
                 F(a)   F(b)=p
```
Horizontal line at height \(p\) on the CDF intersects at the percentile; vertical strip between \(a\) and \(b\) on the PDF gives probability via area.

## 9. The memory technique

**The hook**  
Picture the CDF as a staircase that has been smoothed into a ramp; the PDF is the slope of that ramp. Percentiles are the points where you slice the ramp horizontally at height \(p\).

**What to overlearn**  
1. \(F_X(x)=\int_{-\infty}^x f_X(t)\,dt\)  
2. \(x_p=F_X^{-1}(p)\)  
3. \(P(a<X\leq b)=\int_a^b f_X(x)\,dx\)

**Spaced-repetition schedule**  
Review the three identities above after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If the inversion formula slips, start from the definition \(F_X(x_p)=p\) and solve the integral equation directly for the specific density at hand.

## 10. What this unlocks
Mastery of PDF–CDF–quantile relationships lets you move immediately to joint densities, conditional distributions, transformation of variables, and convergence theorems.

- Multivariate change-of-variable formula for joint PDFs  
- Derivation of the distribution of order statistics  
- Central-limit-theorem statements that rely on CDF convergence  
- Expectation as \(\int x f_X(x)\,dx\) expressed via survival function using the CDF  
- Quantile–quantile plots and empirical distribution functions in statistics

## 11. Self-check — five questions, no answers
1. For \(f_X(x)=c x\) on \([0,2]\), find \(c\) and then \(P(0.5<X<1.5)\).  
2. The CDF of a continuous random variable is given by \(F(x)=1-e^{-x/3}\) for \(x\geq 0\). Compute the 40th percentile.  
3. Explain why \(P(X=3)=0\) yet \(P(2.9<X<3.1)>0\) can both be true.  
4. A student claims “the PDF at the mean is always 0.5.” Identify the error.  
5. Given only the PDF of a truncated normal on \([0,\infty)\), outline the exact sequence of integrals and inversions needed to obtain the 95th percentile.