## 1. The one-sentence answer
**These five distributions arise from sequences of independent Bernoulli trials and give exact probability mass functions for the number of successes, the number of trials until a fixed number of successes, or the count of rare events.**

A Bernoulli trial is an experiment with exactly two outcomes, conventionally called success and failure. All the listed distributions are built by repeating such trials or by taking mathematically convenient limits of those repetitions. The binomial distribution counts successes in a fixed number of trials; the geometric and negative binomial count trials until a prescribed number of successes occur; the Poisson distribution emerges when the success probability per trial becomes tiny while the expected number of successes stays finite.

Each distribution is completely determined by one or two parameters that have direct physical meaning: the success probability \(p\) for Bernoulli and binomial families, the rate \(\lambda\) for Poisson, and the pair \((r,p)\) for negative binomial. Once the parameters are fixed, the probability of every possible outcome is given by an explicit formula that can be evaluated with elementary arithmetic.

> [!NOTE]
> The deepest single insight is that all five distributions are different ways of slicing the same underlying sequence of independent coin flips; changing which slice you keep produces the different formulas.

## 2. Why this matters — concrete and current
In semiconductor yield analysis, TSMC models the number of defective dies on a wafer with the binomial distribution; the parameter \(p\) is estimated daily from probe-test data and directly drives lot disposition decisions that affect billions of dollars of inventory.

NASA’s Deep Space Network uses the Poisson distribution to schedule telemetry retransmissions: the arrival of bit errors on the uplink is treated as a Poisson process whose rate \(\lambda\) is measured from historical passes, allowing the mission team to set the exact number of repeat packets needed to keep the probability of message loss below \(10^{-6}\).

Modern large-language-model training pipelines at OpenAI and Google employ negative-binomial loss layers when modeling the number of tokens until a rare syntactic event (for example, the appearance of a balanced parenthesis pair). The extra dispersion parameter improves calibration on tail tokens compared with a plain Poisson or binomial head.

In single-molecule fluorescence microscopy, the waiting time until the \(r\)-th photon emission from a labelled protein is recorded; the geometric distribution supplies the likelihood used by the maximum-likelihood estimator that recovers the protein’s on-rate constant.

Credit-card fraud teams at Visa run real-time binomial scans over sliding windows of 20 transactions; an unusually high success count (fraud) triggers an immediate hold, and the exact tail probability is computed from the binomial pmf rather than from a normal approximation to avoid false positives on low-volume accounts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sample space and events  | Every distribution is defined on a countable outcome set. |
| Probability axioms       | Normalization \(\sum p_k=1\) must be verified.            |
| Independence             | All five families require independent trials.             |
| Random variable          | The distributions are pmfs of integer-valued r.v.s.       |
| Expectation and variance | Parameter interpretation and moment matching rely on them.|

## 4. Building the idea — from intuition to formalism

### Step 1 — A single trial
A single experiment yields success with probability \(p\) or failure with probability \(1-p\).  
Example: flip a coin once, heads = success.  
The random variable \(X\) satisfies
\[
P(X=1)=p,\qquad P(X=0)=1-p.
\]
> [!WARNING]
> Treating the two outcomes as equally likely when \(p\neq 1/2\) produces every subsequent probability wrong by the factor \(p/(1-p)\).

### Step 2 — Fixed number of independent trials
Repeat the trial \(n\) times and count the total number of successes.  
Example: 10 independent coin flips, let \(X\) be the number of heads.  
The probability mass function is
\[
P(X=k)=\binom{n}{k}p^k(1-p)^{n-k},\qquad k=0,1,\dots,n.
\]
This is the binomial distribution with parameters \(n\) and \(p\).

### Step 3 — Rare events in a large population
Let \(n\to\infty\) and \(p\to 0\) while the product \(\lambda=np\) stays constant.  
The binomial probabilities converge pointwise to
\[
P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!},\qquad k=0,1,2,\dots
\]
—the Poisson distribution with rate \(\lambda\).

### Step 4 — Waiting time for the first success
Continue independent trials until the first success appears.  
Let \(X\) be the number of trials required.  
Then
\[
P(X=k)=(1-p)^{k-1}p,\qquad k=1,2,3,\dots
\]
This is the geometric distribution (trials until first success).

### Step 5 — Waiting time for the \(r\)-th success
Continue until the \(r\)-th success occurs.  
The number of trials \(X\) needed satisfies
\[
P(X=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r},\qquad k=r,r+1,\dots
\]
—the negative binomial distribution with parameters \(r\) and \(p\).

### Step 6 — Unified textbook statement
A random variable belongs to one of the five families if and only if its probability mass function matches one of the six displayed formulas above (Bernoulli is the special case \(n=1\) of binomial). All moments, generating functions, and limit relations follow directly from these pmfs.

## 5. Worked examples — every step shown

**Example 1 — Single Bernoulli trial**  
*Given:* A biased coin with \(P(\text{heads})=0.3\).  
*Find:* \(P(X=1)\).  
Step: By definition \(X=1\) on heads.  
*Why:* The Bernoulli pmf assigns probability \(p\) to the success outcome.  
**Final answer**  
\[ \mathbf{P(X=1)=0.3} \]  
*Reflection:* The example is trivial yet forces the reader to distinguish the parameter \(p\) from the realized value.

**Example 2 — Binomial tail**  
*Given:* 20 independent trials, \(p=0.4\).  
*Find:* \(P(X\le 2)\).  
Step 1: Write the pmf  
\[
P(X=k)=\binom{20}{k}(0.4)^k(0.6)^{20-k}.
\]  
*Why:* Definition of binomial.  
Step 2: Sum the first three terms  
\[
P(X=0)=(0.6)^{20},\quad P(X=1)=20\cdot0.4\cdot(0.6)^{19},\quad P(X=2)=\binom{20}{2}(0.4)^2(0.6)^{18}.
\]  
*Why:* Additivity of disjoint events.  
**Final answer**  
\[ \mathbf{P(X\le2)\approx0.0115} \]  
*Reflection:* Direct summation is feasible for small \(k\); for larger values one switches to software or normal approximation.

**Example 3 — Poisson approximation**  
*Given:* 1000 trials, \(p=0.002\), \(\lambda=2\).  
*Find:* \(P(X=3)\).  
Step: Use Poisson formula directly  
\[
P(X=3)=\frac{2^3e^{-2}}{3!}=0.1804.
\]  
*Why:* The limit theorem justifies replacing the binomial coefficient and powers by the Poisson expression.  
**Final answer**  
\[ \mathbf{0.1804} \]  
*Reflection:* The numerical difference from the exact binomial is less than 0.001, illustrating practical accuracy.

**Example 4 — Negative binomial expectation**  
*Given:* Negative binomial, \(r=3\), \(p=0.25\).  
*Find:* \(\mathbb{E}[X]\).  
Step 1: Recall the mean formula derived from the pmf  
\[
\mathbb{E}[X]=\frac{r}{p}.
\]  
*Why:* Differentiate the probability generating function or sum the series.  
**Final answer**  
\[ \mathbf{\mathbb{E}[X]=12} \]  
*Reflection:* The result shows that waiting time scales linearly with the required successes and inversely with success probability.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(n\) instead of \(k\) as the summation index in binomial | Confusion between fixed sample size and variable count | Always write the pmf with \(k\) as the dummy index. |
| Geometric starting at 0 instead of 1 | Mixing “number of failures” and “number of trials” conventions | State explicitly whether support begins at 0 or 1 before writing the pmf. |
| Forgetting the binomial coefficient in negative binomial | Treating the last trial as the only success | Remember the \(r\)-th success must occur on the final trial; the preceding \(k-1\) trials contain exactly \(r-1\) successes. |
| Applying Poisson when \(\lambda\) is large and \(n\) moderate | Ignoring the regime of the limit theorem | Check both \(n>20\lambda\) and \(p<0.05\) before invoking Poisson. |
| Confusing variance formulas across families | Memorizing without derivation | Re-derive \(\mathrm{Var}(X)\) from the pmf each time until automatic. |
| Treating trials as independent when they are not | Real data often contain dependence | Verify the physical independence assumption before choosing a distribution. |
| Using \(p\) for failure probability | Notation clash in older texts | Adopt a consistent convention: \(p=\) success probability everywhere. |

## 7. The textbook-precise statement
Let \(X\) be a random variable on the non-negative integers. Then:

- Bernoulli(\(p\)): \(P(X=1)=p\), \(P(X=0)=1-p\), \(0<p<1\).
- Binomial(\(n,p\)): \(P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}\), \(k=0,\dots,n\).
- Poisson(\(\lambda\)): \(P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!}\), \(\lambda>0\).
- Geometric(\(p\)): \(P(X=k)=(1-p)^{k-1}p\), \(k=1,2,\dots\).
- NegativeBinomial(\(r,p\)): \(P(X=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r}\), \(k=r,r+1,\dots\).

(Reference: Ross, *A First Course in Probability*, 10e, Sections 4.3–4.7.)

## 8. Visual — diagram or schematic
```text
Sequence of i.i.d. Bernoulli(p) trials
T1 T2 T3 T4 T5 T6 T7 T8 ...
 S  F  S  F  F  S  F  S ...
          ↑
Binomial(n=8) counts total S’s → X=3
Geometric(p) stops at first S   → X=1 (T1)
NegBin(r=2,p) stops at 2nd S    → X=6 (T6)
Poisson(λ) approximates rare S’s in large n
```

## 9. The memory technique

**The hook**  
Picture five archers shooting at a target: one shot (Bernoulli), a fixed quiver of arrows (binomial), a long-range Poisson sniper, a single-arrow archer who stops after the first hit (geometric), and a squad that keeps shooting until they collectively score \(r\) hits (negative binomial).

**What to overlearn**  
1. Binomial pmf with the binomial coefficient.  
2. Poisson limit relation \(\lambda=np\).  
3. Means: \(\mathbb{E}[X_{\text{Bin}}]=np\), \(\mathbb{E}[X_{\text{Poisson}}]=\lambda\), \(\mathbb{E}[X_{\text{Geo}}]=1/p\), \(\mathbb{E}[X_{\text{NB}}]=r/p\).

**Spaced-repetition schedule**  
Review the six pmfs at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the definition of independent trials, write the probability of any specific sequence containing exactly \(k\) successes, then multiply by the number of such sequences.

## 10. What this unlocks
Mastery of these distributions supplies the likelihood functions used in generalized linear models, the arrival processes in queueing theory, and the conjugate priors in Bayesian inference.

- Poisson processes and continuous-time Markov chains  
- Likelihood-ratio tests for contingency tables  
- Branching processes and Galton–Watson extinction probabilities  
- Empirical Bayes shrinkage estimators in high-throughput biology  

## 11. Self-check — five questions, no answers
1. A fair coin is flipped 12 times. Compute \(P(\text{exactly 3 heads})\) directly from the binomial formula.  
2. Show that the Poisson(\(\lambda\)) probabilities sum to 1 by using the Taylor series of \(e^\lambda\).  
3. Derive the variance of a geometric random variable starting at 1.  
4. A negative-binomial random variable with parameters \(r=5\), \(p=0.2\) is observed to equal 30. Write the exact likelihood of this observation.  
5. Explain why the binomial variance \(np(1-p)\) is maximized at \(p=1/2\) while the Poisson variance equals its mean for every \(\lambda\).