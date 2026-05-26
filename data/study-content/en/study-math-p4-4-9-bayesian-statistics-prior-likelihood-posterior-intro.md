## 1. The one-sentence answer
**Bayesian statistics updates beliefs about unknown parameters by combining a prior distribution with observed data through the likelihood to produce a posterior distribution via Bayes’ theorem.**

The core operation is reallocation of probability mass. Before seeing data you assign a probability distribution (the prior) that encodes what you already consider plausible. After seeing data you multiply that prior pointwise by the likelihood function, which measures how well each parameter value explains the observations, and then normalise so the result integrates to one. The normalised result is the posterior, the updated state of knowledge.

This single multiplication-and-normalisation step replaces the entire classical workflow of point estimates and p-values. Every subsequent Bayesian calculation—prediction, decision, model comparison—begins from the posterior.

> [!NOTE]
> The posterior is not a statement about long-run frequencies; it is a statement about degrees of belief conditional on the data actually seen.

## 2. Why this matters — concrete and current
SpaceX uses Bayesian filters to fuse noisy telemetry from multiple sensors when estimating the real-time state of a returning booster; the prior at each time step is the posterior from the previous step.

In drug development, Pfizer’s 2020 COVID-19 vaccine trial analysis incorporated a weakly informative prior on the log-odds ratio derived from earlier coronavirus vaccine candidates, then updated it with the observed case counts to obtain the final posterior probability that efficacy exceeds 50 %.

Modern semiconductor yield modelling at TSMC treats each wafer’s defect rate as a random variable whose prior is learned from previous process nodes; after measuring a new lot the posterior directly supplies the predictive distribution used for lot disposition.

LIGO’s gravitational-wave pipelines maintain a prior over source parameters (masses, spins, sky location) that is updated in milliseconds by the likelihood of the strain data; the resulting posterior sky map is what triggers electromagnetic follow-up observations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Conditional probability | Bayes’ theorem is simply the chain rule rearranged.       |
| Normalisation of densities | The posterior must integrate to 1; the normalising constant is the marginal likelihood. |
| Random variables as functions | Parameters are treated as random variables with distributions. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Probability as degree of belief
You begin with an unknown quantity θ whose value you are uncertain about. You encode that uncertainty by a probability distribution π(θ) that assigns higher density to values you consider more plausible.

**Example.** Before flipping a coin you might believe a fair coin is most likely, so π(p) could be a Beta(2,2) density peaked at 0.5.

Formally the prior is any probability measure Π on the parameter space Θ satisfying ∫_Θ dΠ(θ) = 1.

> [!WARNING]
> Treating the prior as a frequency statement about how often θ occurs in repeated experiments leads to immediate confusion; the prior quantifies current belief, not long-run frequency.

### Step 2 — Likelihood as information from data
Data D arrive. For each fixed θ the likelihood function L(θ) = p(D|θ) reports how probable the observed data would be if that θ were true.

**Example.** After observing 7 heads in 10 flips the likelihood is p(D|p) = p^7(1-p)^3.

The likelihood is not a probability distribution over θ; its integral over θ need not equal 1.

> [!WARNING]
> Interpreting the likelihood itself as a posterior without the prior produces the “likelihood fallacy” and yields answers that ignore all pre-data knowledge.

### Step 3 — Unnormalised posterior as product
Bayes’ theorem states that the product of prior and likelihood is proportional to the posterior:
$$
\pi(\theta|D) \propto \pi(\theta) \cdot L(\theta).
$$
The constant of proportionality is recovered by integration.

### Step 4 — Marginal likelihood as normaliser
The marginal likelihood (evidence) is the integral
$$
m(D) = \int_\Theta \pi(\theta) L(\theta)\,d\theta.
$$
Dividing the product by m(D) yields a density that integrates to one:
$$
\pi(\theta|D) = \frac{\pi(\theta) L(\theta)}{m(D)}.
$$

### Step 5 — Posterior as complete updated belief
The function π(θ|D) is now the sole carrier of information about θ. All subsequent inference—point summaries, interval statements, predictions—uses only this posterior.

## 5. Worked examples — every step shown

**Example 1 — Fair or two-headed coin**
*Given:* Prior P(two-headed) = 0.1, P(fair) = 0.9. Observe one head.
*Find:* Posterior probability the coin is two-headed.
- Prior odds = 0.1/0.9 = 1/9.  
  *Why:* Convert probabilities to odds for multiplication.
- Likelihood ratio = 1 / 0.5 = 2.  
  *Why:* Two-headed coin always produces heads; fair coin produces heads with probability 1/2.
- Posterior odds = (1/9)·2 = 2/9.  
  *Why:* Bayes’ theorem multiplies prior odds by likelihood ratio.
- Posterior P(two-headed|D) = (2/9) / (1 + 2/9) = 2/11.  
  *Why:* Normalise odds back to probability.

**Final answer**  
**2/11**

*Reflection:* The single datum shifts belief from 0.1 to roughly 0.18; repeated heads would drive the posterior toward 1.

**Example 2 — Beta–Bernoulli conjugate update**
*Given:* Prior Beta(α=2,β=2). Observe 7 heads, 3 tails.
*Find:* Posterior.
- Likelihood ∝ p^7(1-p)^3.  
  *Why:* Bernoulli likelihood for independent trials.
- Posterior ∝ p^{2+7-1}(1-p)^{2+3-1} = Beta(9,5).  
  *Why:* Beta is conjugate; exponents add directly.

**Final answer**  
**Beta(9,5)**

*Reflection:* Conjugacy turns integration into arithmetic; the posterior parameters are prior parameters plus counts.

**Example 3 — Normal data, unknown mean, known variance**
*Given:* Prior μ ∼ N(0,1), data x₁…xₙ ∼ N(μ,σ²=1), observed sample mean x̄=2.3, n=10.
*Find:* Posterior for μ.
- Likelihood ∝ exp(−n/2(μ−x̄)²).  
  *Why:* Normal sampling model.
- Posterior variance = (1 + n)^{-1} = 1/11.  
  *Why:* Precisions (inverse variances) add.
- Posterior mean = (0·1 + 10·2.3)/11 = 2.09.  
  *Why:* Weighted average of prior and data means by precision.

**Final answer**  
**N(2.09, 1/11)**

*Reflection:* Larger n shrinks posterior variance; the formula recovers the classical estimator only as prior variance → ∞.

**Example 4 — Posterior predictive for new observation**
*Given:* Posterior Beta(9,5) from Example 2.
*Find:* Probability the next flip is heads.
- Predictive probability = ∫ p·Beta(p|9,5) dp = 9/(9+5) = 0.643.  
  *Why:* Expectation of p under the posterior.

**Final answer**  
**0.643**

*Reflection:* The predictive distribution averages the likelihood over posterior uncertainty rather than plugging in a point estimate.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Using an improper flat prior without checking integrability | Convenience; “I have no information”          | Verify posterior propriety after update      |
| Treating the likelihood as a density over θ | Confusion between p(D|θ) and p(θ|D)           | Always normalise explicitly once            |
| Forgetting to normalise when reporting intervals | Focus on shape rather than measure            | Compute marginal likelihood or use MCMC samples that already integrate to 1 |
| Interpreting credible intervals as frequentist coverage | Language overlap with classical statistics    | State clearly: “probability that θ lies in interval given D” |
| Choosing a prior after seeing data | Desire to “let data speak”                    | Fix prior before looking at likelihood       |
| Ignoring sensitivity to prior in small samples | Over-reliance on asymptotic results           | Re-run with several plausible priors         |
| Confusing posterior mode with MLE | Both involve maximising a product             | Remember mode maximises prior × likelihood, not likelihood alone |

## 7. The textbook-precise statement
Let Θ be a parameter space equipped with σ-algebra ℱ and prior probability measure Π. Let the observation X have conditional density f(x|θ) with respect to a dominating measure μ. Then the posterior measure Π(·|x) is absolutely continuous with respect to Π with Radon–Nikodym derivative
$$
\frac{d\Pi(\cdot|x)}{d\Pi}(\theta) = \frac{f(x|\theta)}{m(x)},\qquad m(x)=\int_\Theta f(x|\theta)\,\Pi(d\theta),
$$
provided m(x)>0. (See Gelman et al., *Bayesian Data Analysis*, 3e, §1.3.)

## 8. Visual — diagram or schematic
```text
Prior π(θ)
     │
     ▼
Likelihood L(θ)  ──►  Product π(θ)L(θ)
     │                       │
     ▼                       ▼
Normaliser m(D)  ◄───────────┘
     │
     ▼
Posterior π(θ|D) = π(θ)L(θ)/m(D)
```
The diagram shows the two inputs (prior and likelihood) multiplied, then scaled by the single scalar m(D) that forces the area under the posterior curve to equal 1.

## 9. The memory technique

1. **The hook** — Picture a courtroom: the prior is the judge’s initial leanings, the likelihood is the evidence presented, the posterior is the final verdict after weighing both.
2. **What to overlearn** — π(θ|D) ∝ π(θ) L(θ) and the fact that the normalising constant is the marginal likelihood m(D).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the definition of conditional probability P(A|B)=P(A,B)/P(B) and set A=“θ in dθ”, B=“data D”.

## 10. What this unlocks
Mastery of prior–likelihood–posterior immediately opens conjugate families, hierarchical models, Bayesian hypothesis testing via Bayes factors, and computational methods such as MCMC and variational inference.

- Next: conjugate priors (Beta–Bernoulli, Normal–Normal, Gamma–Poisson)
- Next: credible intervals and highest-posterior-density regions
- Next: posterior predictive checks and model criticism
- Next: Markov-chain Monte Carlo sampling from the posterior

## 11. Self-check — five questions, no answers
1. A coin has prior Beta(1,1). After 100 heads and 0 tails, what is the posterior mode?
2. Explain in one sentence why the likelihood function is not required to integrate to 1 over θ.
3. You obtain a posterior N(5,1). A new observation is drawn from N(θ,4). What is the posterior predictive variance?
4. Identify the step that fails if the marginal likelihood m(D) equals zero.
5. Two analysts use the same likelihood but different priors and obtain posteriors whose 95 % credible intervals barely overlap. Which modelling choice most plausibly explains the discrepancy?