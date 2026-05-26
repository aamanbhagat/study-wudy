## 1. The one-sentence answer
**A continuous random variable is fully described by its cumulative distribution function \(F(x) = P(X \leq x)\), whose derivative is the probability density function \(f(x)\), with percentiles obtained by inverting \(F\).**

Probability for continuous variables cannot be assigned to single points. Instead, probability lives in intervals and equals the area between two points under a density curve. The CDF accumulates that probability from \(-\infty\) up to any chosen point, always rising smoothly from 0 to 1. Differentiating the CDF recovers the density; integrating the density between limits recovers interval probabilities. Percentiles are simply the points on the x-axis that cut off a prescribed area under the density, which is the same as reading the inverse of the CDF.

The density itself need not be bounded by 1; only areas matter. A tall thin spike and a short wide hump can both enclose the same area and therefore assign the same probability to an interval.

> [!NOTE]
> The single most important shift is realizing that \(f(x)\) is never a probability; it is a rate, and only its integral over an interval yields a probability.

## 2. Why this matters — concrete and current
In aerospace guidance, the European Space Agency models GPS signal-in-space errors as continuous random variables whose CDF is used to compute the probability that position error stays inside a 7.6 m alert limit; the resulting protection levels appear directly in the Galileo integrity equation.

In semiconductor process control, Intel fits threshold-voltage distributions of 3 nm transistors with log-normal densities; the 99.9th percentile of that density determines the supply voltage needed to keep cache bit-error rates below \(10^{-12}\).

In machine-learning calibration, modern neural networks output softmax vectors that are treated as parameters of a Dirichlet distribution; the CDF of the resulting predictive distribution supplies the credible intervals reported by DeepMind’s uncertainty-estimation pipelines for medical imaging.

Climate-impact studies at Lawrence Livermore National Laboratory integrate regional temperature PDFs under RCP scenarios to obtain the 95th-percentile increase in extreme-heat days, feeding directly into the IPCC AR6 risk tables.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Riemann integral         | Probability equals area under the density curve           |
| Derivative as instantaneous rate | The PDF is the derivative of the CDF                      |
| Limit definition of continuity | Ensures \(P(X = x) = 0\) for every single point           |
| Inverse function         | Percentiles are obtained by inverting the CDF             |

## 4. Building the idea — from intuition to formalism

### Step 1 — From point masses to smeared-out mass
In the discrete case probability sits on countable points. For a continuous variable the probability at any exact point is forced to zero; instead, probability is distributed smoothly across intervals.

Consider the time \(T\) until the next bus arrives. The chance that \(T\) equals exactly 3.14159 minutes is zero; the chance that it lies between 3 and 4 minutes is positive.

Formally, \(P(X = x) = 0\) for every real \(x\), while \(P(a < X < b) > 0\) whenever the interval \((a,b)\) has positive length.

> [!WARNING]
> Treating \(f(x)\) itself as a probability produces nonsense; the density may exceed 1.

### Step 2 — The cumulative distribution function
We accumulate probability from \(-\infty\) up to a variable upper limit. The resulting function \(F(x)\) is always non-decreasing, right-continuous, \(\lim_{x\to-\infty}F(x)=0\) and \(\lim_{x\to\infty}F(x)=1\).

For the bus example, \(F(5)\) equals the probability the bus arrives by minute 5.

Mathematically,
\[
F(x) := P(X \leq x).
\]

### Step 3 — Differentiating to obtain the density
Where \(F\) is absolutely continuous it possesses a derivative \(f = F'\). The fundamental theorem of calculus then converts areas back into differences of \(F\).

Thus
\[
f(x) = \frac{d}{dx}F(x).
\]

> [!WARNING]
> If \(F\) has jumps, a density does not exist; the random variable is not continuous.

### Step 4 — Recovering interval probabilities
The probability of an interval equals the definite integral of the density, equivalently the difference of the CDF values at the endpoints:
\[
P(a < X < b) = \int_a^b f(x)\,dx = F(b) - F(a).
\]

### Step 5 — Normalisation and non-negativity
Because total probability is 1 and probabilities cannot be negative,
\[
f(x) \geq 0 \quad \text{for all } x, \qquad \int_{-\infty}^{\infty} f(x)\,dx = 1.
\]

### Step 6 — Percentiles via the quantile function
The \(\alpha\)-percentile (or \(\alpha\)-quantile) is the smallest number \(q_\alpha\) satisfying \(F(q_\alpha) \geq \alpha\). When \(F\) is strictly increasing this is simply the inverse:
\[
q_\alpha = F^{-1}(\alpha).
\]

## 5. Worked examples — every step shown

**Example 1 — Uniform density on [0,1]**
*Given:* \(f(x) = 1\) for \(x \in [0,1]\), zero elsewhere.  
*Find:* \(F(x)\) and the 70th percentile.  

Integrate from 0 to \(x\):
\[
F(x) = \int_0^x 1\,dt = x, \quad 0 \leq x \leq 1.
\]
*Why:* Fundamental theorem of calculus applied to constant integrand.  
Set \(F(q) = 0.7\):
\[
q = 0.7.
\]
*Why:* Direct inversion of the linear CDF.  
**0.7**

*Reflection:* The uniform is the simplest case where every step is elementary arithmetic; the same inversion pattern generalises to any strictly monotone \(F\).

**Example 2 — Exponential with rate \(\lambda = 2\)**
*Given:* \(f(x) = 2e^{-2x}\) for \(x \geq 0\).  
*Find:* \(P(0.5 < X < 1.5)\).  

Compute the CDF first:
\[
F(x) = 1 - e^{-2x}, \quad x \geq 0.
\]
*Why:* Antiderivative of \(2e^{-2x}\) is \(-e^{-2x}\).  
Subtract:
\[
F(1.5) - F(0.5) = (1 - e^{-3}) - (1 - e^{-1}) = e^{-1} - e^{-3}.
\]
**\(e^{-1} - e^{-3}\)**

*Reflection:* Using the CDF shortcut avoids recomputing the integral each time.

**Example 3 — Finding a percentile for a non-standard density**
*Given:* \(f(x) = \frac{3}{4}(1-x^2)\) on \([-1,1]\).  
*Find:* 90th percentile.  

Integrate to obtain
\[
F(x) = \frac{3}{4}\Bigl(x - \frac{x^3}{3}\Bigr) + \frac12, \quad -1 \leq x \leq 1.
\]
*Why:* Antiderivative term-by-term.  
Solve \(F(q) = 0.9\):
\[
\frac{3}{4}\Bigl(q - \frac{q^3}{3}\Bigr) + 0.5 = 0.9 \implies q - \frac{q^3}{3} = \frac{8}{15}.
\]
Numerical root \(q \approx 0.875\).  
**Approximately 0.875**

*Reflection:* When the CDF lacks an elementary inverse, numerical solution is required; the definition via \(F(q) \geq \alpha\) remains exact.

**Example 4 — Mixed discrete-continuous warning**
*Given:* A random variable whose CDF jumps at zero and is continuous elsewhere.  
*Find:* Whether a density exists.  

The jump implies \(P(X=0)>0\), violating the continuous requirement that \(P(X=x)=0\) everywhere. Hence no PDF exists.  
**No PDF exists**

*Reflection:* Always verify absolute continuity before writing \(f = F'\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating \(f(x)\) as a probability | Density can exceed 1                        | Always integrate before interpreting a number as probability |
| Forgetting \(P(X=x)=0\)           | Discrete intuition lingers                  | State the integral limits explicitly                 |
| Using \(F(b)-F(a)\) when \(F\) has jumps | CDF still defined but not absolutely continuous | Check continuity of \(F\) first                      |
| Inverting \(F\) at a flat region  | Multiple quantiles satisfy the inequality   | Adopt the left-inverse definition \(q_\alpha = \inf\{x:F(x)\ge\alpha\} \) |
| Normalising with wrong constant   | Integral omitted or miscomputed             | Verify \(\int f = 1\) after every scaling            |
| Confusing percentile with probability value | Percentile is on the x-axis                 | Label axes clearly: percentile = x-value, probability = area |
| Assuming symmetry for median      | Median equals mean only for symmetric densities | Compute the 0.5-quantile directly                    |

## 7. The textbook-precise statement
Let \(X\) be a random variable on a probability space \((\Omega,\mathcal{F},P)\). \(X\) is (absolutely) continuous if there exists a non-negative measurable function \(f:\mathbb{R}\to[0,\infty)\) such that
\[
P(X\in B) = \int_B f(x)\,dx
\]
for every Borel set \(B\). The function \(F(x)=P(X\le x)\) is then absolutely continuous, \(F'=f\) almost everywhere, and \(\int_{-\infty}^\infty f=1\). The \(\alpha\)-quantile is \(F^{-1}(\alpha)=\inf\{x:F(x)\ge\alpha\}\). (See Billingsley, *Probability and Measure*, 3rd ed., §14.)

## 8. Visual — diagram or schematic
```text
PDF f(x)          CDF F(x)
   ^                 ^
   |   /\            |      ____
   |  /  \           |     /
   | /    \          |    /
   |/      \         |   /
   +---------> x     +--/----------> x
     a   b              q_α
Area between a and b = F(b)−F(a)
```

The left curve is a generic unimodal density; the shaded vertical strip between \(a\) and \(b\) has area equal to the vertical rise of the right-hand CDF between the same abscissae. The \(\alpha\)-quantile \(q_\alpha\) is read off the CDF at height \(\alpha\).

## 9. The memory technique
**The hook** — Picture probability mass as honey poured on the real line; the CDF is the height of the honey to the left of any point, the PDF is how fast that height grows, and a percentile is the spot where the honey reaches a chosen fraction of its total volume.

**What to overlearn**  
- \(P(a<X<b)=F(b)-F(a)\)  
- \(\int f=1\), \(f\ge0\)  
- \(q_\alpha=F^{-1}(\alpha)\)

**Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the interval probability from the definition \(F(x)=P(X\le x)\) and the fundamental theorem of calculus.

## 10. What this unlocks
Mastery of PDF, CDF and quantiles lets you compute arbitrary interval probabilities, obtain calibrated prediction intervals, and pass directly to joint distributions, conditional densities, and limit theorems.

- Transformation of random variables  
- Law of large numbers and central-limit theorem statements for continuous variables  
- Expectation as \(\int xf(x)\,dx\)  
- Convergence in distribution via CDF convergence

## 11. Self-check — five questions, no answers
1. A density equals 2 on [0, 0.6] and 0 elsewhere. Does it integrate to 1?  
2. If \(F(x)=0\) for \(x<0\) and \(F(x)=x^2\) for \(0\le x\le1\), what is \(P(0.2<X<0.8)\)?  
3. For the same \(F\), compute the 25th percentile.  
4. Why can a PDF exceed 1 yet still be valid?  
5. A CDF is constant on an interval. What does that imply about the probability measure on that interval?