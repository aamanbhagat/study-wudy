## What it is
Statistical estimation is the process of using data to guess the value of an unknown parameter of a probability distribution. The Method of Moments (MoM) does this by equating the theoretical moments of the distribution (like the mean) to the sample moments calculated from the data. Maximum Likelihood Estimation (MLE) finds the parameter value that makes the observed data most probable.

## Why it matters
Estimation is the core of statistical inference and machine learning. In ML, the cost functions for many models (e.g., cross-entropy for classification) are derived directly from the principle of maximum likelihood. In aerospace, you use estimation to determine the reliability parameters of a component from failure data, or to fit a trajectory model to noisy sensor readings from a rocket.

## When to study it
Before tackling this, you must be fluent in:
1.  **Probability Distributions:** You must know the definitions of PMFs and PDFs for common distributions (Bernoulli, Binomial, Poisson, Exponential, Normal).
2.  **Calculus:** You need single-variable and multi-variable differentiation to find maxima, including the use of logarithms to simplify products (the log-trick).
3.  **Expected Value and Moments:** You must be able to compute theoretical moments, like $E[X]$ and $E[X^2]$, for a given distribution.

If you are not comfortable calculating $E[X] = \int_{-\infty}^{\infty} x f(x) dx$ for a continuous distribution, review that first.

## How to study it (step by step)
1.  **Master the Method of Moments.** It's simpler. Take the Poisson distribution with PMF $p(k; \lambda) = \frac{\lambda^k e^{-\lambda}}{k!}$. Derive its first theoretical moment, $E[X] = \lambda$. Given data $x_1, ..., x_n$, set this equal to the first sample moment, $\bar{x} = \frac{1}{n}\sum x_i$, to find the estimator $\hat{\lambda}_{MoM} = \bar{x}$.
2.  **Internalize the Likelihood Function.** This is the key conceptual leap for MLE. Given i.i.d. data $x_1, ..., x_n$ from a distribution with PDF/PMF $f(x; \theta)$, the likelihood is $L(\theta | x_1, ..., x_n) = \prod_{i=1}^n f(x_i; \theta)$. Crucially, this is a function of the *parameter* $\theta$, with the data held fixed.
3.  **Learn the Log-Likelihood Trick.** Realize that maximizing $L(\theta)$ is equivalent to maximizing the log-likelihood $\ell(\theta) = \ln(L(\theta))$. Since $\ln(ab) = \ln(a) + \ln(b)$, this transforms the product into a sum: $\ell(\theta) = \sum_{i=1}^n \ln(f(x_i; \theta))$, which is far easier to differentiate.
4.  **Derive the MLE for a simple case.** For a sequence of Bernoulli trials (coin flips) with parameter $p$, write down the likelihood function, take the log, differentiate with respect to $p$, set the result to zero, and solve for $\hat{p}_{MLE}$.
5.  **Compare the two methods.** Take a single distribution, like the Exponential, and derive both the MoM and MLE estimators for its parameter. Observe whether they are the same or different and reflect on why.
6.  **Explore estimator properties.** Read about the concepts of bias, variance, and consistency. Understand, without detailed proofs for now, that MLEs have desirable asymptotic properties (they are consistent, asymptotically unbiased, and efficient), which is why they are often preferred.

## Key ideas, with intuition
1.  **The Core Problem: Guessing the machine's setting.** Imagine a machine that produces numbers according to some distribution, say Normal($\mu, \sigma^2$). You don't know the settings for $\mu$ and $\sigma^2$. You collect a sample of numbers from the machine. Your job is to use this sample to make the best possible guess for the true settings. An "estimator" is your guessing strategy.

2.  **Method of Moments: "Make it look like the data."** This method's philosophy is simple: whatever the true parameter $\theta$ is, it implies certain theoretical properties, like the mean $E[X]$. Your data also has a mean, the sample mean $\bar{x}$. The MoM estimator is the value of $\theta$ that makes the theoretical mean equal to the sample mean. If you need to estimate two parameters, you match the first two moments (mean and variance).
    $$
    \text{Population Moment } k: \mu'_k = E[X^k] \quad (\text{a function of } \theta)
    $$
    $$
    \text{Sample Moment } k: m_k = \frac{1}{n}\sum_{i=1}^n X_i^k \quad (\text{a number from data})
    $$
    The MoM principle is to set $\mu'_k = m_k$ and solve for the parameter(s).

3.  **Maximum Likelihood: "What parameter makes my data least surprising?"** MLE asks a different question: "Of all the possible values the parameter $\theta$ could take, which one makes the data I *actually observed* the most probable outcome?" You write down the joint probability of observing your specific data points, $x_1, ..., x_n$. This joint probability, viewed as a function of $\theta$, is the Likelihood Function. The MLE is the value of $\theta$ that maximizes this function.
    $$
    L(\theta | \mathbf{x}) = \prod_{i=1}^n f(x_i; \theta)
    $$
    We find $\hat{\theta}_{MLE} = \arg\max_{\theta} L(\theta | \mathbf{x})$.

4.  **The Log-Likelihood is a Computational Tool.** Products of many small probabilities are numerically unstable and algebraically difficult to differentiate. The natural logarithm turns products into sums and is a monotonically increasing function, so the maximum of $\ln(L(\theta))$ occurs at the same $\theta$ as the maximum of $L(\theta)$.
    $$
    \ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln f(x_i; \theta)
    $$
    This is almost always the function you will work with when finding an MLE.

## Worked example
Let's find the MoM and MLE estimators for the parameter $\lambda$ of an Exponential distribution, given i.i.d. data $x_1, ..., x_n$. The PDF is $f(x; \lambda) = \lambda e^{-\lambda x}$ for $x \ge 0$.

**1. Method of Moments (MoM)**

*   **Step 1: Find the first theoretical moment.** We need to compute $E[X]$.
    $$
    E[X] = \int_{0}^{\infty} x f(x; \lambda) dx = \int_{0}^{\infty} x \lambda e^{-\lambda x} dx
    $$
    Using integration by parts ($u=x, dv=\lambda e^{-\lambda x}dx$), we find:
    $$
    E[X] = \left[-x e^{-\lambda x}\right]_{0}^{\infty} - \int_{0}^{\infty} -e^{-\lambda x} dx = 0 - \left[\frac{1}{\lambda}e^{-\lambda x}\right]_{0}^{\infty} = \frac{1}{\lambda}
    $$
*   **Step 2: Find the first sample moment.** This is simply the sample mean.
    $$
    m_1 = \bar{x} = \frac{1}{n}\sum_{i=1}^n x_i
    $$
*   **Step 3: Equate them and solve for the parameter.**
    $$
    E[X] = m_1 \implies \frac{1}{\lambda} = \bar{x} \implies \hat{\lambda}_{MoM} = \frac{1}{\bar{x}}
    $$

**2. Maximum Likelihood Estimation (MLE)**

*   **Step 1: Write down the Likelihood function.**
    $$
    L(\lambda | \mathbf{x}) = \prod_{i=1}^n f(x_i; \lambda) = \prod_{i=1}^n \lambda e^{-\lambda x_i} = \lambda^n e^{-\lambda \sum x_i}
    $$
*   **Step 2: Take the natural log to get the log-likelihood.**
    $$
    \ell(\lambda) = \ln(L(\lambda)) = \ln(\lambda^n e^{-\lambda \sum x_i}) = n \ln(\lambda) - \lambda \sum_{i=1}^n x_i
    $$
*   **Step 3: Differentiate with respect to the parameter and set to zero.**
    $$
    \frac{d\ell}{d\lambda} = \frac{n}{\lambda} - \sum_{i=1}^n x_i = 0
    $$
*   **Step 4: Solve for the parameter.**
    $$
    \frac{n}{\lambda} = \sum x_i \implies \lambda = \frac{n}{\sum x_i} \implies \hat{\lambda}_{MLE} = \frac{1}{\frac{1}{n}\sum x_i} = \frac{1}{\bar{x}}
    $$
*   **Step 5 (Verification):** Check that this is a maximum using the second derivative.
    $$
    \frac{d^2\ell}{d\lambda^2} = -\frac{n}{\lambda^2}
    $$
    Since $n>0$ and $\lambda^2 > 0$, this is always negative, confirming we have found a maximum.

**Reflection:** In this case, $\hat{\lambda}_{MoM} = \hat{\lambda}_{MLE}$. This is not always true, but it happens for several common distributions. Both methods provide an intuitive answer: the rate parameter $\lambda$ is estimated as the reciprocal of the average observed event time $\bar{x}$.

## Diagrams
Here is a conceptual diagram of a log-likelihood function. The function maps possible parameter values ($\theta$) to the log-probability of having observed your data. The MLE is the value of $\theta$ at the peak of this curve.

```text
      ^ Log-Likelihood l(θ)
      |
      |
      |        *******
      |     ***       ***
      |   **             **
      |  *                 *
 l(θ̂) |-*-------------------*---------
      | *                     *
      |*                       *
      +----------------------------------> θ (Parameter value)
                       ^
                       |
                     θ̂_MLE
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **MoM:** Think of a police sketch artist. They ask for the "moments" of the suspect: "What was his average height? (1st moment). What was the spread in his possible height? (2nd moment)". The artist draws a picture that **matches the moments** given by the witness. **M**ethod **o**f **M**oments **M**atches **M**oments.
    *   **MLE:** You are a detective arriving at a crime scene. You see the evidence (the data). You ask yourself: "Who is the suspect ($\theta$) for whom this specific evidence is the **most likely** outcome of their actions?" You are maximizing the likelihood of the evidence.

2.  **Must-know formulas:**
    *   Method of Moments: $E[X^k] = \frac{1}{n}\sum_{i=1}^n X_i^k$. (Set theoretical moment = sample moment).
    *   Likelihood Function: $L(\theta | \mathbf{x}) = \prod_{i=1}^n f(x_i; \theta)$.
    *   Log-Likelihood Function: $\ell(\theta) = \sum_{i=1}^n \ln f(x_i; \theta)$.

3.  **Spaced Repetition Schedule:** Review this material and re-work the Exponential example from scratch at **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:**
    *   If you forget MoM: Remember the name. It's about moments. Write down the formula for the theoretical mean $E[X]$ and the sample mean $\bar{x}$. Set them equal. Solve.
    *   If you forget MLE: Remember the name. It's about maximum likelihood. Write down the probability of seeing one data point, $f(x_i; \theta)$. Since they are independent, the probability of seeing all of them is the product, $\prod f(x_i; \theta)$. This is the function you need to maximize with respect to $\theta$ using calculus. The log is just a trick to make the calculus easier.

## Common mistakes
1.  **Confusing the variable in the Likelihood function.** The PDF $f(x|\theta)$ is a function of $x$. The Likelihood $L(\theta|x)$ is a function of $\theta$. You differentiate with respect to $\theta$.
2.  **Forgetting the log-trick.** Trying to differentiate the product form of the likelihood function, $\prod f(x_i; \theta)$, is a common and painful error. Always take the log first.
3.  **Incorrectly computing theoretical moments for MoM.** Students often make mistakes in the integration or summation required to find $E[X]$ or $E[X^2]$. Be meticulous with this prerequisite step.
4.  **Ignoring constants during differentiation.** When differentiating the log-likelihood $\ell(\theta)$, be careful. Terms that don't involve $\theta$ are constants that vanish, but terms like $\ln(c\theta) = \ln(c) + \ln(\theta)$ have parts that vanish and parts that don't.

## Self-check
1.  The Geometric distribution has PMF $p(k; p) = (1-p)^{k-1}p$ for $k=1, 2, ...$ and mean $E[X] = 1/p$. Given observations $x_1, ..., x_n$, find the Method of Moments estimator for $p$.
2.  The Poisson distribution has PMF $p(k; \lambda) = \frac{\lambda^k e^{-\lambda}}{k!}$ for $k=0, 1, 2, ...$. Given observations $x_1, ..., x_n$, find the Maximum Likelihood Estimator for $\lambda$.
3.  A Uniform distribution is defined on the interval $[0, \theta]$ with PDF $f(x; \theta) = 1/\theta$ for $0 \le x \le \theta$. Given observations $x_1, ..., x_n$, find the MLE for $\theta$. (Hint: Calculus might not work here. Think about the definition of the likelihood function and what constraints the data place on $\theta$.)