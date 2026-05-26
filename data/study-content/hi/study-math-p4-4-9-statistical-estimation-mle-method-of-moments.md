## 1. The one-sentence answer
**Statistical estimation via maximum likelihood estimation (MLE) and method of moments (MOM) gives you systematic ways to recover unknown parameters of a probability distribution from finite observed data.**

Aap data dekhte ho aur sochte ho ki kaunsa distribution usko generate kar raha hoga; dono methods us distribution ke parameters ko number mein badal dete hain. MOM simply moments (mean, variance) ko equate karta hai jabki MLE likelihood function ko maximise karta hai taaki data sabse probable ho jaaye. Dono estimators consistency aur asymptotic normality jaise properties laate hain lekin unke finite-sample behaviour alag-alag hote hain.

Pehle aap population moments ya likelihood likhte ho, phir un equations ko solve karte ho; result ek function hota hai jo sample values ko parameter estimates mein map karta hai. Yeh estimates aapko distribution predict karne, confidence intervals banane aur model selection mein madad karte hain.

> [!NOTE]
> The single deepest insight is that MLE directly uses the full probabilistic model while MOM only matches low-order summaries; when the model is correct, MLE usually extracts more information, but MOM remains useful when the likelihood is intractable.

## 2. Why this matters — concrete and current
In large-scale recommendation systems at Netflix, MLE is used daily to fit Poisson and negative-binomial models that predict user watch counts; the resulting parameters drive personalised ranking and are re-estimated every few hours on billions of events.

Particle physicists at CERN employ MOM to obtain initial estimates of Higgs boson mass and width from invariant-mass histograms before refining them with full MLE; these estimates feed into the likelihood fits published in the 2012 discovery paper.

Semiconductor foundries such as TSMC fit failure-time distributions (Weibull, log-normal) to wafer-test data using MLE; the shape and scale parameters determine burn-in times and warranty predictions that directly affect yield economics.

Quantitative hedge funds calibrate stochastic-volatility models (Heston, SABR) to option surfaces by combining MOM for quick overnight parameter guesses with MLE for intraday recalibration; the hybrid pipeline appears in production code at firms handling multi-billion-dollar books.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Probability density/mass function | Both MOM and MLE are defined through the model \(f(x;\theta)\) |
| Expectation and raw moments     | MOM equates sample moments to theoretical moments \(E[X^k]\) |
| Logarithm and its derivative    | MLE maximises \(\ell(\theta)=\log L(\theta)\) whose critical points require \(\frac{d}{d\theta}\ell=0\) |
| Regularity conditions for interchange of derivative and integral | Guarantees that MLE is consistent and asymptotically normal |

If any row is unfamiliar, pause and review the corresponding section on expectation or differentiation under the integral sign before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Parameter and estimator
Aap ek distribution family maan lete ho jisme ek ya zyada unknown numbers \(\theta\) hote hain; estimator ek rule hota hai jo data se \(\hat\theta\) nikaalta hai.  
Example: Bernoulli trials mein \(p\) unknown hai; sample proportion \(\hat p = \bar X\) ek estimator hai.  
Formally, an estimator is any measurable function \(\hat\theta_n:X^n\to\Theta\).  
> [!WARNING] Agar aap estimator ko data ke function ke roop mein clearly define nahi karte, toh baad mein bias-variance calculations collapse ho jaate hain.

### Step 2 — Matching moments (intuition)
Population ke pehle \(k\) moments \(\mu_k(\theta)=E_\theta[X^k]\) ko sample moments \(m_k=\frac1n\sum X_i^k\) ke barabar set karte ho.  
Example: Exponential distribution \(\lambda\) ke liye \(E[X]=1/\lambda\), isliye \(\hat\lambda=1/\bar X\).  
Mathematically solve \(\mu_k(\theta)=m_k\) for \(\theta\).  
> [!WARNING] Agar distribution ke moments exist nahi karte (heavy tails), MOM equations hi ban nahi paate.

### Step 3 — Formal method of moments
Let \(\mu(\theta)=(\mu_1(\theta),\dots,\mu_k(\theta))\) aur \(m_n\) sample-moment vector ho. Solve \(\mu(\hat\theta_n)=m_n\). Under identifiability aur continuity, \(\hat\theta_n\to\theta_0\) in probability.  
> [!WARNING] Multiple roots ho sakte hain; har root ko check karna padta hai.

### Step 4 — Likelihood and its maximum (intuition)
Data ko sabse probable banane wala \(\theta\) choose karte ho. Likelihood \(L(\theta)=\prod f(x_i;\theta)\) hota hai.  
Example: Normal mean \(\mu\) ke liye \(L(\mu)\) tab maximum hota hai jab \(\mu=\bar x\).  
> [!WARNING] Direct maximisation hard ho sakti hai; log transform zaruri hai.

### Step 5 — Log-likelihood and score equation
\(\ell(\theta)=\sum\log f(x_i;\theta)\). Critical point solve karte ho \(\nabla\ell(\hat\theta)=0\).  
Under regularity, \(\sqrt n(\hat\theta-\theta)\to N(0,I(\theta)^{-1})\) jahaan \(I\) Fisher information hai.  
> [!WARNING] Boundary maxima ya multiple local maxima ho sakte hain; numerical checks zaroori hain.

### Step 6 — Asymptotic comparison
MOM aur MLE dono consistent hote hain, lekin MLE asymptotic variance MOM se chhoti ya barabar hoti hai (Cramér–Rao).  
> [!WARNING] Finite samples mein MOM kabhi-kabhi better mean-square error de sakta hai.

## 5. Worked examples — har step show karo

**Example 1 — Exponential rate via MOM**  
*Given:* i.i.d. \(X_i\sim\text{Exp}(\lambda)\), \(n=5\), observations \(2.1, 3.4, 1.8, 4.2, 2.5\).  
*Find:* MOM estimator of \(\lambda\).  
Sample mean \(m_1=\frac{1}{5}(2.1+3.4+1.8+4.2+2.5)=2.8\).  
For Exp, \(E[X]=1/\lambda\), therefore set \(1/\hat\lambda=2.8\).  
\(\hat\lambda=1/2.8\).  
*Why:* Single moment equation directly gives the unique solution.  
**Final answer** \(\hat\lambda=5/14\).  
*Reflection:* Simple one-parameter case shows MOM algebra is immediate; generalises to any distribution whose mean is invertible.

**Example 2 — Bernoulli success probability via MLE**  
*Given:* 10 independent Bernoulli trials, 7 successes.  
*Find:* MLE of \(p\).  
Likelihood \(L(p)=p^7(1-p)^3\).  
Log-likelihood \(\ell(p)=7\log p+3\log(1-p)\).  
Derivative \(\ell'(p)=7/p-3/(1-p)=0\) yields \(7(1-p)=3p\), so \(7=10p\).  
\(\hat p=0.7\).  
*Why:* Score equation linear in this exponential-family case.  
**Final answer** \(\hat p=0.7\).  
*Reflection:* MLE coincides with sample proportion; illustrates that MLE recovers intuitive estimators inside exponential families.

**Example 3 — Normal variance via MOM versus MLE**  
*Given:* \(X_i\sim N(\mu,\sigma^2)\) i.i.d., both parameters unknown.  
*Find:* MOM and MLE for \(\sigma^2\).  
MOM: set \(m_2-m_1^2=s_n^2\) (biased version).  
MLE: \(\hat\sigma^2_{\text{MLE}}=\frac1n\sum(X_i-\bar X)^2\).  
Difference: MLE divides by \(n\), MOM by \(n-1\) after bias correction.  
*Why:* Second-moment equation for MOM ignores the estimation of \(\mu\).  
**Final answer** MOM uses \(n-1\), MLE uses \(n\).  
*Reflection:* Shows how MLE automatically accounts for degrees of freedom lost in estimating the mean.

**Example 4 — Poisson parameter with small-sample MLE**  
*Given:* Counts 3, 0, 2, 1, 4.  
*Find:* MLE of \(\lambda\).  
\(\ell(\lambda)=\sum(x_i\log\lambda-\lambda-\log x_i!)\).  
\(\ell'(\lambda)=\frac1n\sum x_i-\lambda=0\) gives \(\hat\lambda=\bar x=2\).  
*Why:* Poisson mean equals variance, so MLE again equals sample mean.  
**Final answer** \(\hat\lambda=2\).  
*Reflection:* Demonstrates that even when likelihood is non-quadratic, the score equation remains linear for one-parameter exponential families.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using MOM when moments do not exist | Student forgets heavy-tail distributions            | Check moment existence before writing equations      |
| Treating MLE as always unbiased   | Textbooks emphasise asymptotics only                | Compute bias explicitly for small \(n\)              |
| Forgetting to verify second-derivative test | Multiple critical points possible                   | Evaluate \(\ell''(\hat\theta)<0\) or plot likelihood |
| Confusing sample variance formulas | MOM and MLE differ by factor \(n/(n-1)\)            | Always label which divisor you used                  |
| Ignoring parameter constraints    | MLE can land outside \(\Theta\)                     | Project onto feasible set after optimisation         |
| Assuming asymptotic normality for \(n=10\) | Finite-sample skewness ignored                      | Use bootstrap or exact pivots when \(n\) small       |
| Solving MOM equations without checking uniqueness | Identifiability failure                             | Solve symbolically first, count real roots           |

## 7. The textbook-precise statement
Let \(X_1,\dots,X_n\) be i.i.d. with density (or mass function) \(f(x;\theta)\) belonging to a dominated family, \(\theta\in\Theta\subset\mathbb{R}^k\) open. The method-of-moments estimator \(\hat\theta_n\) solves \(\mu(\hat\theta_n)=m_n\) where \(\mu_j(\theta)=E_\theta[X^j]\) and \(m_n\) is the vector of sample raw moments, provided a unique solution exists in a neighbourhood of the true value. The maximum-likelihood estimator \(\hat\theta_n\) maximises the likelihood \(L_n(\theta)=\prod_{i=1}^n f(X_i;\theta)\) or, equivalently, the log-likelihood \(\ell_n(\theta)\). Under standard regularity conditions (differentiability under the integral, positive-definite Fisher information, identifiability), both estimators are consistent and asymptotically normal with asymptotic variance given by the inverse Fisher information for MLE and by the delta-method sandwich for MOM. (Casella & Berger, *Statistical Inference*, 2nd ed., Chapter 7, Theorems 7.2.10 and 7.2.20.)

## 8. Visual — diagram or schematic
```
          likelihood L(θ)
              ^
              |               *
              |            *     *
              |         *           *
              |      *                 *
              |   *                       *
              +-----------------------------→ θ
                 θ̂_MLE               θ_true
```
Horizontal axis is the parameter; vertical axis is the likelihood value. The peak is the MLE; the true value lies nearby for large samples. The curve is unimodal under regularity.

## 9. The memory technique
**The hook** — Picture a photographer adjusting a camera lens until the image of a star is sharpest; MLE is that focusing action on the likelihood surface while MOM is roughly aligning the average brightness.

**What to overlearn** — Score equation \(\nabla\ell=0\), Fisher information definition \(I(\theta)=-E[\nabla^2\ell]\), MOM moment-matching identity \(\mu(\theta)=m_n\).

**Spaced-repetition schedule** — Review definitions after 1 day, solve one MOM/MLE pair after 3 days, derive asymptotic variance after 7 days, compare efficiencies on a new distribution after 16 days, and re-derive Cramér–Rao bound after 35 days.

**First-principles fallback** — If the formula is forgotten, start from the definition of likelihood, take logarithm, differentiate, set to zero, and solve; for MOM equate the first \(k\) moments and invert.

## 10. What this unlocks
Once you master MLE and MOM you can immediately study asymptotic efficiency, the Cramér–Rao lower bound, and the delta method for functions of estimators. These tools open the door to generalised linear models, EM algorithm derivations, and Bayesian posterior mode approximations that replace the likelihood with a posterior.

- Asymptotic normality and efficiency comparisons  
- Construction of Wald, likelihood-ratio and score tests  
- Regularised estimation (MAP) and information criteria (AIC/BIC)  
- Empirical distribution function and quantile estimation extensions  

## 11. Self-check — five questions, no answers
1. Derive the MOM estimator for the shape parameter of a Gamma distribution when the rate is known.  
2. Show that for the uniform\((0,\theta)\) family the MLE is the sample maximum and compute its bias.  
3. For a Poisson sample of size 20 with mean 3, compute both MOM and MLE; are they numerically identical?  
4. Identify the regularity condition violated by the uniform example above and explain why asymptotic normality fails.  
5. Given two candidate estimators, one MOM and one MLE, for the same parameter, which one has smaller asymptotic variance and under what precise condition?