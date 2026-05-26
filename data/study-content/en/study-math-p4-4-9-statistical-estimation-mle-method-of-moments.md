## 1. The one-sentence answer
**Maximum likelihood estimation selects the parameter value that makes the observed data most probable under the assumed model, while the method of moments equates the first few sample moments to their theoretical counterparts and solves for the parameters.**

Both procedures turn a sample into a point estimate of an unknown parameter \(\theta\). Begin with a parametric family of densities \(f(x;\theta)\). The likelihood function is simply the joint density of the sample viewed as a function of \(\theta\) alone; its logarithm is usually easier to maximize. Setting the derivative of the log-likelihood to zero yields the MLE. The method of moments instead matches the first \(k\) empirical moments \(\frac1n\sum X_i^r\) to the population moments \(\mathbb{E}_\theta[X^r]\) for \(r=1,\dots,k\), producing a system of equations whose solution is the estimator.

The two routes often coincide for exponential families but diverge elsewhere; MLE enjoys stronger asymptotic optimality while method of moments is frequently simpler to compute.

> [!NOTE]
> The single deepest insight is that both techniques convert an inverse problem—“which \(\theta\) produced these data?”—into an ordinary optimization or algebraic problem by using the model’s own probability measure as the objective.

## 2. Why this matters — concrete and current
In training logistic-regression or neural-network classifiers at companies such as OpenAI and Google DeepMind, the cross-entropy loss minimized by stochastic gradient descent is exactly the negative log-likelihood of the Bernoulli or categorical model; the learned weights are therefore MLEs.

Particle physicists at CERN extract the Higgs boson mass and width by maximizing the likelihood of observed four-lepton invariant-mass spectra against a composite parametric model that includes signal and background components; the resulting profile-likelihood intervals are the official published measurements.

Quantitative-finance desks at Jane Street and Citadel fit stochastic-volatility models to high-frequency equity returns via the method of moments because the first four moments of the return distribution can be matched analytically to the parameters of a variance-gamma or Heston process, giving starting values that are then refined by MLE.

Semiconductor foundries such as TSMC calibrate the threshold-voltage distributions of millions of transistors on each wafer by matching sample means and variances to the parameters of a normal or log-normal model; the resulting estimates feed directly into SPICE corner models used for circuit timing sign-off.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Probability density/mass function | Supplies the expression \(f(x;\theta)\) that becomes the likelihood |
| Expectation and moments  | Method of moments equates \(\mathbb{E}[X^r]\) to sample averages |
| Logarithm and differentiation | Converts products into sums and locates critical points of the likelihood |
| Law of large numbers     | Guarantees that sample moments converge to population moments |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the likelihood of an i.i.d. sample
The joint density of \(n\) independent observations is the product of the individual densities.  
Example: three coin flips with unknown heads probability \(\theta\) yield the likelihood \(\theta^2(1-\theta)\) when two heads and one tail appear.  
Formally,
\[
L(\theta;x_1,\dots,x_n)=\prod_{i=1}^n f(x_i;\theta).
\]
> [!WARNING] Treating the observations as fixed numbers rather than realizations of random variables leads to writing the likelihood as a function of the data instead of \(\theta\).

### Step 2 — Switch to the log-likelihood
Because the logarithm is strictly increasing, the maximizer is unchanged, yet the expression becomes a sum.  
For the coin example the log-likelihood is \(2\log\theta+\log(1-\theta)\).  
Formally,
\[
\ell(\theta)=\sum_{i=1}^n\log f(x_i;\theta).
\]

### Step 3 — Locate the critical point by differentiation
Differentiate with respect to \(\theta\) and set the derivative to zero.  
The coin example yields \(\frac2\theta-\frac1{1-\theta}=0\), solved by \(\hat\theta=2/3\).  
Formally the score equation is
\[
\frac{\partial\ell}{\partial\theta}=0.
\]

### Step 4 — Verify it is a maximum
Check the second derivative is negative, or compare boundary values when the domain is closed.  
For the coin, \(\frac{\partial^2\ell}{\partial\theta^2}=-\frac2{\theta^2}-\frac1{(1-\theta)^2}<0\) everywhere, confirming a maximum.

### Step 5 — Method of moments: equate the first population moment
Compute \(\mathbb{E}_\theta[X]\) from the model and set it equal to the sample mean \(\bar X\).  
For an exponential distribution with rate \(\lambda\), \(\mathbb{E}[X]=1/\lambda\), so \(\hat\lambda=1/\bar X\).

### Step 6 — Higher-order moments when needed
When the model has \(k\) parameters, equate the first \(k\) moments and solve the resulting system.  
For a normal distribution the first two moment equations recover the usual sample mean and sample variance.

### Step 7 — Asymptotic properties (textbook arrival)
Under standard regularity conditions both estimators are consistent and asymptotically normal; the MLE moreover attains the Cramér–Rao lower bound asymptotically.

## 5. Worked examples — every step shown

**Example 1 — Exponential rate from a single observation**  
*Given:* \(X\sim\text{Exp}(\lambda)\), one observation \(x=2\).  
*Find:* MLE of \(\lambda\).  
The density is \(\lambda e^{-\lambda x}\).  
Likelihood: \(L(\lambda)= \lambda e^{-\lambda\cdot2}\).  
Log-likelihood: \(\ell(\lambda)=\log\lambda-2\lambda\).  
Derivative: \(\frac1\lambda-2=0\).  
*Why:* chain rule on \(\log\lambda\) and linear term.  
Solution: \(\hat\lambda=1/2\).  
**\(\hat\lambda=1/2\)**  
*Reflection:* The single-observation case already shows that the MLE inverts the mean–parameter relationship.

**Example 2 — Normal mean and variance**  
*Given:* i.i.d. \(X_i\sim\mathcal N(\mu,\sigma^2)\), sample \(\{1,3,5\}\).  
*Find:* Joint MLE.  
Log-likelihood:
\[
\ell(\mu,\sigma^2)=-\frac n2\log(2\pi\sigma^2)-\frac1{2\sigma^2}\sum(x_i-\mu)^2.
\]
Partial derivatives set to zero give \(\hat\mu=\bar x=3\) and
\[
\hat\sigma^2=\frac1n\sum(x_i-\hat\mu)^2=8/3.
\]
*Why:* the score for \(\mu\) is the average deviation; the score for \(\sigma^2\) equates the second moment to the variance.  
**\(\hat\mu=3\), \(\hat\sigma^2=8/3\)**  
*Reflection:* The MLE for variance uses divisor \(n\), not \(n-1\); the distinction appears only after the maximization step.

**Example 3 — Method of moments for uniform**  
*Given:* \(X_i\sim\text{Unif}(0,\theta)\).  
*Find:* MoM estimator.  
Population mean \(\mathbb{E}[X]=\theta/2\).  
Set equal to sample mean: \(\hat\theta=2\bar X\).  
**\(\hat\theta=2\bar X\)**  
*Reflection:* The estimator can exceed the largest observation, a known defect of MoM for bounded support.

**Example 4 — Gamma shape and rate**  
*Given:* Gamma(\(\alpha,\beta\)) sample with \(\bar x=4\), \(s^2=6\).  
*Find:* MoM estimators.  
\(\mathbb{E}[X]=\alpha/\beta=4\), \(\text{Var}(X)=\alpha/\beta^2=6\).  
Divide the two equations: \(\hat\alpha=4^2/6\approx2.667\), \(\hat\beta=4/6\approx0.667\).  
**\(\hat\alpha=8/3\), \(\hat\beta=2/3\)**  
*Reflection:* Solving the nonlinear system reduces to a ratio of moments.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using divisor \(n-1\) for MLE variance | Confusion with unbiased estimation | Remember MLE maximizes the likelihood, not unbiasedness |
| Forgetting to check domain boundaries | Parameter space may be open or closed | Evaluate likelihood at boundaries when critical point lies outside |
| Matching raw moments instead of central moments for location-scale families | Algebraic convenience misleads | Always use the lowest-order moments that involve each parameter |
| Treating MLE and MAP as identical | Prior is omitted in MLE | Explicitly set prior flat when comparing |
| Assuming consistency without regularity | Some models violate differentiability | Verify Fisher information is positive and finite |
| Solving moment equations without uniqueness check | Multiple roots possible | Substitute back into original moment expressions |
| Ignoring invariance property | MLE of \(g(\theta)\) equals \(g(\hat\theta)\) only under continuous mapping | State the invariance theorem before applying it |

## 7. The textbook-precise statement
Let \(X_1,\dots,X_n\) be i.i.d. with density (or mass function) \(f(x;\theta)\), \(\theta\in\Theta\subseteq\mathbb R^k\). The maximum-likelihood estimator is any measurable function \(\hat\theta_n\) satisfying
\[
\hat\theta_n\in\arg\max_{\theta\in\Theta}\prod_{i=1}^n f(x_i;\theta).
\]
Under the usual regularity conditions (Casella & Berger, *Statistical Inference*, 2e, §7.2), \(\sqrt n(\hat\theta_n-\theta)\xrightarrow d\mathcal N(0,I(\theta)^{-1})\) where \(I(\theta)\) is the Fisher information matrix. The method-of-moments estimator of order \(k\) solves the system
\[
\frac1n\sum_{i=1}^n X_i^r=m_r(\theta),\qquad r=1,\dots,k,
\]
where \(m_r(\theta)=\mathbb E_\theta[X^r]\).

## 8. Visual — diagram or schematic
```
theta axis
   ^
   |          L(theta)
   |         /\
   |        /  \
   |       /    \
   |      /      \
   |     /        \
   |    /          \
   +-------------------------> theta
        theta_hat
```
The curve is the likelihood function; its peak is the MLE. The horizontal axis is the parameter space; the vertical axis is the value of the likelihood (or log-likelihood). The mode is the reported estimate; curvature at the mode supplies the asymptotic variance via the observed information.

## 9. The memory technique
1. **The hook** — picture a radio tuner: you turn the dial (vary \(\theta\)) until the static disappears and the station comes in loudest; that dial position is the MLE.  
2. **What to overlearn** — score equation \(\partial\ell/\partial\theta=0\); first two moment identities for normal and exponential families.  
3. **Spaced-repetition schedule** — review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from the definition of the joint density, take the logarithm, differentiate, and set the result to zero; for moments replace the integral definition of expectation by the sample average.

## 10. What this unlocks
These two estimation principles are the gateway to asymptotic statistics, information theory, and modern machine-learning optimization.  
- Fisher information and the Cramér–Rao bound  
- EM algorithm for latent-variable models  
- Generalized linear models and their score equations  
- Empirical risk minimization in statistical learning theory  
- Profile likelihood and Wilks’ theorem for confidence regions

## 11. Self-check — five questions, no answers
1. Derive the MLE for the success probability of a geometric distribution from a sample of \(n\) i.i.d. trials.  
2. Show that the method-of-moments estimator for the uniform endpoint \(\theta\) can exceed \(\max X_i\).  
3. Compute the observed information matrix for the normal model and verify it equals \(n/(2\sigma^4)\) for the variance component.  
4. Explain why the MLE for the rate of an exponential remains consistent even though it is biased for finite \(n\).  
5. Construct a two-parameter model in which the moment equations admit two distinct real solutions; decide which solution is admissible.