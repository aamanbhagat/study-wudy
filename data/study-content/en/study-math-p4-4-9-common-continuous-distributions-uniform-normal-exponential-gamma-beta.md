## 1. The one-sentence answer
**Common continuous distributions are the canonical families of probability density functions that assign probabilities to intervals for random variables taking values anywhere in a continuum.**

These densities integrate to one over their support and are parameterized so that location, scale, and shape can be adjusted independently. The uniform spreads mass evenly, the normal concentrates symmetrically around a mean, the exponential governs memoryless waiting times, the gamma extends the exponential to sums of waiting times, and the beta models proportions on a bounded interval. Each arises either from physical invariance properties or as limiting objects under repeated operations.

The same five families therefore cover measurement error, reliability, queueing, Bayesian updating, and Monte Carlo sampling with only a handful of functional forms.

> [!NOTE]
> The decisive insight is that every member is completely determined by at most three numbers (location, scale, shape) yet can reproduce the aggregate behavior of arbitrarily many microscopic random effects.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network uses the exponential distribution to schedule maintenance on receivers whose failure times are memoryless; the same model appears in the reliability block diagrams of the James Webb Space Telescope.

Particle physicists at CERN fit the normal distribution to millions of reconstructed track momenta; the resulting 5-sigma thresholds rest on the central-limit justification of normality for summed detector noise.

Google’s Borg cluster scheduler models task-completion times with gamma distributions whose shape parameter is estimated from live telemetry; the fitted gamma then supplies tail probabilities that decide preemption policies.

Facebook’s A/B testing platform places beta priors on click-through rates; the beta-binomial conjugate update yields closed-form posterior credible intervals that are recomputed in real time for every experiment.

Monte Carlo ray tracers inside Pixar’s RenderMan employ the uniform distribution on the unit square to generate low-discrepancy samples; the same uniform base is transformed into normals or exponentials via inverse-CDF or Box–Muller steps inside each pixel shader.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Riemann integral         | Normalizing a density and computing interval probabilities require ∫ f(x) dx = 1 and P(a < X < b) = ∫_a^b f(x) dx |
| Limit theorems           | The normal arises only as the n → ∞ limit of standardized sums; the gamma appears as the n → ∞ sum of exponentials |
| Indicator functions      | The support of each density is expressed by multiplying the functional form by an indicator 1_{x ∈ S} |

## 4. Building the idea — from intuition to formalism

### Step 1 — Flat density on an interval
Any continuous random variable confined to a finite interval [a, b] with no preferred location must spread its probability uniformly.  
Example: a spinner that lands anywhere on [0, 1] with equal likelihood.  
The density is therefore constant on that interval:
$$
f(x) = \frac{1}{b-a} \mathbf{1}_{[a,b]}(x).
$$
> [!WARNING] Treating the uniform density as a probability for a single point yields zero; probabilities exist only for intervals.

### Step 2 — Memoryless waiting time
Suppose the remaining time until an event is independent of elapsed time. The only density satisfying this functional equation f(x + t) / (1 − F(x)) = f(t) is the exponential.  
Example: radioactive decay of a single atom.  
Its density on [0, ∞) is
$$
f(x) = \lambda e^{-\lambda x}.
$$

### Step 3 — Sum of many small independent effects
When a measurement error is the sum of a large number of tiny, independent contributions, the standardized sum converges in distribution to a symmetric bell shape whose tails decay like e^{-x^2/2}. This limiting object is the standard normal density
$$
\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}.
$$

### Step 4 — Generalizing the exponential
The sum of k independent exponential random variables with the same rate has density proportional to x^{k-1} e^{-\lambda x}. Replacing the integer k by a real shape parameter α produces the gamma family
$$
f(x) = \frac{\lambda^\alpha}{\Gamma(\alpha)} x^{\alpha-1} e^{-\lambda x}, \quad x > 0.
$$

### Step 5 — Proportions on a bounded interval
Any random variable taking values in (0,1) can be obtained by normalizing two independent gamma variables with the same rate. The resulting density on (0,1) is the beta:
$$
f(x) = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)} x^{\alpha-1}(1-x)^{\beta-1}.
$$

### Step 6 — Closure under certain transformations
The gamma family is closed under addition of independent copies; the beta family is closed under the map X ↦ 1 − X and under independent products after suitable reparameterization. These algebraic closures make the families conjugate priors and sufficient statistics.

### Step 7 — Parameter interpretation
Location shifts the graph rigidly (normal), scale stretches it (all except uniform), and shape controls skewness or tail weight (gamma, beta). Once these three roles are fixed, every subsequent calculation reduces to evaluating the density or its integral at the transformed arguments.

## 5. Worked examples — every step shown

**Example 1 — Uniform interval probability**  
*Given:* X ∼ Uniform[−2, 5].  
*Find:* P(−1 < X < 3).  
The length of the support is 7, so the density equals 1/7 everywhere inside [−2, 5].  
The interval (−1, 3) lies entirely inside the support and has length 4.  
Hence
$$
P(-1 < X < 3) = 4 \times \frac{1}{7} = \frac{4}{7}.
$$
*Why:* the uniform assigns probability exactly proportional to length.  
**Final answer:** 4/7  
*Reflection:* the calculation fails only if the queried interval overlaps the boundary; always clip to the support first.

**Example 2 — Exponential tail**  
*Given:* inter-arrival times ∼ Exp(0.5).  
*Find:* P(X > 10).  
The survival function of an exponential is e^{-\lambda x}.  
Substitute λ = 0.5 and x = 10:
$$
P(X > 10) = e^{-5} \approx 0.006738.
$$
*Why:* memorylessness converts the integral ∫_{10}^∞ λ e^{-\lambda x} dx directly into the closed exponential.  
**Final answer:** e^{-5}  
*Reflection:* numerical overflow is avoided by keeping the answer in exact exponential form until evaluation is required.

**Example 3 — Normal standardization**  
*Given:* X ∼ N(μ = 100, σ = 15).  
*Find:* P(85 < X < 130).  
Subtract the mean and divide by the standard deviation:
$$
Z = \frac{X-100}{15} \sim N(0,1).
$$
The inequalities become −1 < Z < 2.  
Look up the standard normal table or integrate ϕ(z):
$$
\Phi(2) - \Phi(-1) = 0.9772 - 0.1587 = 0.8185.
$$
**Final answer:** 0.8185  
*Reflection:* every normal probability reduces to a standard-normal difference after affine transformation; the parameters disappear.

**Example 4 — Gamma waiting time for k events**  
*Given:* arrivals form a Poisson process of rate 2; find the density of the time until the third arrival.  
The waiting time for the r-th event in a rate-λ Poisson process is Gamma(α = r, λ).  
Here r = 3, λ = 2, so
$$
f(t) = \frac{2^3}{2!} t^{2} e^{-2t} = 4t^2 e^{-2t}, \quad t > 0.
$$
**Final answer:** 4t²e^{-2t} (t > 0)  
*Reflection:* integer shape recovers the Erlang distribution; the factorial in the denominator is exactly Γ(r).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using pdf value as a probability  | pdf can exceed 1; probability lives only on intervals | Always integrate; never report f(x) as P(X = x)     |
| Forgetting the indicator of support | Formulas are written without explicit domain        | Write 1_{x>0} or 1_{[a,b]}(x) in every density       |
| Confusing rate and scale in exponential/gamma | λ appears in numerator or denominator depending on convention | Fix the convention once: λ = rate = 1/mean           |
| Treating beta parameters as probabilities themselves | α, β > 0 but need not sum to 1                      | Remember α/(α+β) is the mean; α, β control concentration |
| Applying CLT without checking moments | Finite variance is required                         | Verify E[X²] < ∞ before invoking normality           |
| Mixing cdf and survival function signs | 1 − F(x) versus F(−x) for symmetric distributions   | Draw the axis and shade the tail each time           |
| Using gamma for negative data     | Support is strictly positive                        | Check domain before choosing family                  |

## 7. The textbook-precise statement
A continuous random variable X possesses a probability density function f if
$$
P(a \le X \le b) = \int_a^b f(x)\,dx
$$
for every a < b, where f ≥ 0 and ∫_{-∞}^∞ f(x) dx = 1. The five standard families are defined by the following densities (Ross, *Introduction to Probability Models*, 12e, §2.3–2.7):

- Uniform[a,b]: f(x) = 1/(b−a) on [a,b]
- Normal(μ,σ²): f(x) = (1/(σ√(2π))) exp(−(x−μ)²/(2σ²))
- Exponential(λ): f(x) = λ exp(−λx) for x ≥ 0
- Gamma(α,λ): f(x) = [λ^α / Γ(α)] x^{α−1} exp(−λx) for x > 0
- Beta(α,β): f(x) = [Γ(α+β)/(Γ(α)Γ(β))] x^{α−1}(1−x)^{β−1} for 0 < x < 1

## 8. Visual — diagram or schematic
```text
Density height
   ^
   |   Normal (bell)
   |     /\
   |    /  \   Gamma (skew right)
   |   /    \    /\
   |  /      \  /  \   Beta (U or hump on [0,1])
   | /        \/    \    /\
---+------------------+----+--> x
   0   Exp (decay)     1
```
Horizontal axis labelled from 0 to ∞ (or [0,1] for beta); vertical axis is density value. Normal is symmetric about its mean; exponential starts at λ and decays; gamma starts at 0 with a power-law rise then decays; beta is confined to [0,1] and may be U-shaped or unimodal.

## 9. The memory technique

**The hook**  
Picture five Greek letters walking in a line: U (flat line), N (bell), E (ski-slope decay), Γ (ski-slope with hump), B (curve trapped between two walls labelled 0 and 1).

**What to overlearn**  
1. pdf formulas exactly as written in §7  
2. mean and variance for each family (uniform: (a+b)/2, (b−a)²/12; normal: μ, σ²; exponential: 1/λ, 1/λ²; gamma: α/λ, α/λ²; beta: α/(α+β), αβ/[(α+β)²(α+β+1)])  
3. support of each density

**Spaced-repetition schedule**  
Review the five pdfs at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Re-derive each density from its characterizing property: constant height for uniform, memoryless functional equation for exponential, moment-generating-function limit for normal, convolution closure for gamma, Dirichlet marginal for beta.

## 10. What this unlocks
Mastery of these five families supplies the building blocks for the chi-squared, Student’s t, F, and Dirichlet distributions, for maximum-likelihood estimation of location-scale models, and for conjugate Bayesian analysis of binomial, Poisson, and normal data.

- Chi-squared as Gamma(n/2, 1/2)  
- t-distribution as normal / sqrt(chi-squared) ratio  
- Conjugate updating rules in Bayesian inference  
- Asymptotic normality of MLEs via the central-limit theorem

## 11. Self-check — five questions, no answers
1. Compute P(|X| > 3) for X ∼ N(0,1) and compare it with the bound given by Chebyshev’s inequality.  
2. Show that the minimum of n i.i.d. Exp(λ) random variables is again exponential; identify its rate.  
3. Let X ∼ Gamma(α,λ) and Y ∼ Gamma(β,λ) be independent. Find the distribution of X/(X+Y).  
4. A random variable has pdf f(x) = c x^{3} (1−x)^{2} on (0,1). Determine c and decide whether the distribution is beta; if so, give its parameters.  
5. Explain why the sum of 30 independent Uniform[0,1] variables is approximately normal, yet the sum of 30 independent Exp(1) variables is not approximately normal.