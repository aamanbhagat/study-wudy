## 1. The one-sentence answer
**The binomial distribution is the exact probability law for the number of successes observed when a fixed number of independent Bernoulli trials are performed, each sharing the same success probability.**

A Bernoulli trial is an experiment with exactly two possible outcomes, conventionally labelled success and failure. When that trial is repeated a known number of times and the only quantity recorded is the total count of successes, the resulting random variable follows the binomial distribution. Its probability mass function therefore enumerates every possible count by multiplying the number of distinct sequences that produce that count by the probability of any single such sequence.

The mean and variance follow at once from the linearity of expectation and the independence of the trials; no summation is required once these two properties are invoked.

> [!NOTE]
> The binomial distribution is completely determined by the two parameters \(n\) and \(p\); once they are fixed, every probability, every moment, and every tail bound is fixed as well.

## 2. Why this matters — concrete and current
SpaceX records the number of successful engine ignitions across the nine Merlin engines on a Falcon 9 first stage; each engine is treated as an independent trial with success probability estimated from ground-test data. The resulting binomial probabilities are used to set launch-commit criteria and to size propellant margins.

In semiconductor manufacturing, Intel counts the number of defective dies on a 300 mm wafer that contains several thousand dies. The binomial model supplies the acceptance sampling plans that decide whether a wafer lot proceeds to packaging or is scrapped.

Modern A/B testing platforms at Google and Meta treat each user visit as a Bernoulli trial whose success probability is the click-through rate of a given webpage variant. The binomial likelihood is the core of the statistical test that declares one variant superior.

Genome-wide association studies count the number of minor alleles carried by cases versus controls at a given locus. Under the null hypothesis of no association the count is binomial; deviation from the expected mean \(np\) supplies the test statistic that flags candidate variants.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Bernoulli trial          | The atomic experiment whose repetition generates the binomial count |
| Combination \(\binom{n}{k}\) | Counts the distinct sequences that produce exactly \(k\) successes |
| Independence             | Justifies multiplying probabilities across trials         |
| Expectation (linearity)  | Yields the mean \(np\) without summing the PMF            |
| Variance of a single Bernoulli | Supplies the building block \(p(1-p)\) for the binomial variance |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single trial
A single trial admits only two outcomes. Label success probability \(p\) and failure probability \(1-p\). The indicator random variable \(X_1\) equals 1 on success and 0 on failure.

\[
P(X_1=1)=p,\qquad P(X_1=0)=1-p.
\]

> [!WARNING]
> Treating the two outcomes as equally likely when \(p\neq 1/2\) produces every subsequent probability incorrectly.

### Step 2 — Fixed number of independent repetitions
Perform the identical trial \(n\) times and assume the outcomes are independent. The joint probability of any specific sequence containing exactly \(k\) successes is therefore
\[
p^k(1-p)^{n-k}.
\]

### Step 3 — Counting the sequences
Exactly \(k\) successes can occur in \(\binom{n}{k}\) distinct sequences. Multiplying the number of sequences by the probability of each yields the probability mass function
\[
P(X=k)=\binom{n}{k}p^k(1-p)^{n-k},\qquad k=0,1,\dots,n.
\]

### Step 4 — Verification that probabilities sum to one
The binomial theorem states
\[
\sum_{k=0}^n\binom{n}{k}p^k(1-p)^{n-k}=(p+(1-p))^n=1^n=1.
\]
Hence the PMF is properly normalised.

### Step 5 — Mean via linearity
Write the total number of successes as the sum of indicator variables:
\[
X=X_1+\dots+X_n.
\]
Linearity of expectation, which holds regardless of dependence, gives
\[
E[X]=E[X_1]+\dots+E[X_n]=np.
\]

### Step 6 — Variance via independence
Independence implies that the variance of the sum equals the sum of the variances:
\[
\operatorname{Var}(X)=\sum_{i=1}^n\operatorname{Var}(X_i)=n\cdot p(1-p).
\]

### Step 7 — Formal statement
The random variable \(X\) is said to follow the binomial distribution with parameters \(n\) and \(p\), written \(X\sim\operatorname{Bin}(n,p)\), when its PMF, mean, and variance are exactly those derived above.

## 5. Worked examples — every step shown

**Example 1 — Coin tosses**  
*Given:* A fair coin is tossed 5 times.  
*Find:* \(P(X=3)\).  

\[
\binom{5}{3}=\frac{5!}{3!2!}=10.
\]
Each sequence of 3 heads and 2 tails has probability
\[
(1/2)^3(1/2)^2=(1/2)^5=1/32.
\]
Thus
\[
P(X=3)=10\times\frac{1}{32}=\frac{5}{16}.
\]

**Final answer**  
\[\frac{5}{16}\]

*Reflection:* The only arithmetic required is the binomial coefficient; once it is correct the powers of \(p\) and \(1-p\) follow immediately.

**Example 2 — Biased trial**  
*Given:* \(n=4\), \(p=0.3\).  
*Find:* \(P(X=2)\).  

\[
\binom{4}{2}=6,\qquad 0.3^2(0.7)^2=0.0441.
\]
\[
P(X=2)=6\times0.0441=0.2646.
\]

**Final answer**  
\[0.2646\]

*Reflection:* Decimal arithmetic replaces fractions; rounding error appears only after the final multiplication.

**Example 3 — Direct mean and variance**  
*Given:* \(n=20\), \(p=0.6\).  
*Find:* \(E[X]\) and \(\operatorname{Var}(X)\).  

\[
E[X]=20\times0.6=12,
\]
\[
\operatorname{Var}(X)=20\times0.6\times0.4=4.8.
\]

**Final answer**  
\[E[X]=12,\quad\operatorname{Var}(X)=4.8\]

*Reflection:* No summation over the PMF is performed; linearity and independence suffice.

**Example 4 — Cumulative probability**  
*Given:* \(n=10\), \(p=0.5\).  
*Find:* \(P(X\le2)\).  

Compute each term:
\[
P(X=0)=\binom{10}{0}(0.5)^{10}=1/1024,
\]
\[
P(X=1)=10/1024,
\]
\[
P(X=2)=45/1024.
\]
Sum:
\[
P(X\le2)=(1+10+45)/1024=56/1024=7/128.
\]

**Final answer**  
\[7/128\]

*Reflection:* When \(p=1/2\) every term shares the common factor \(2^{-n}\); the binomial coefficients alone determine the relative sizes.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(p=0.5\) when the coin is biased | Habit from fair-coin problems               | Always substitute the given numerical value of \(p\) |
| Forgetting that \(\binom{n}{k}\) counts sequences | Treating the PMF as simply \(p^k(1-p)^{n-k}\) | Write the combinatorial factor explicitly each time  |
| Adding variances when trials are dependent | Misapplying the independence assumption     | Verify independence before summing variances         |
| Computing \(E[X]\) by summing \(k\cdot P(X=k)\) when \(n\) is large | Unnecessary labour                          | Use \(E[X]=np\) immediately                          |
| Treating \(X\) as continuous      | Confusing binomial with normal approximation | Keep the support \(\{0,1,\dots,n\}\) in view         |
| Using \(n-1\) in the variance formula | Confusing sample variance with population variance | Remember the binomial variance is \(np(1-p)\) exactly |
| Rounding intermediate binomial coefficients | Loss of precision in large \(n\)            | Keep fractions or exact integers until the final step |

## 7. The textbook-precise statement
Let \(X\) be the number of successes in \(n\) independent Bernoulli trials, each having success probability \(p\in(0,1)\). Then
\[
P(X=k)=\binom{n}{k}p^k(1-p)^{n-k},\qquad k=0,1,\dots,n,
\]
\[
E[X]=np,\qquad\operatorname{Var}(X)=np(1-p).
\]
(Blitzstein & Hwang, *Introduction to Probability*, 2e, §3.3.)

## 8. Visual — diagram or schematic
```text
Probability mass function  Bin(5,0.4)
k | P(X=k)
0 | 0.0778  ███
1 | 0.2592  ██████████
2 | 0.3456  █████████████
3 | 0.2304  █████████
4 | 0.0768  ███
5 | 0.0102  ▌
          0   0.1  0.2  0.3  0.4
```
Each bar height equals the PMF evaluated at that integer \(k\). The diagram is labelled with the exact support \(\{0,1,2,3,4,5\}\) and uses the numerical value \(p=0.4\) only for illustration.

## 9. The memory technique

**The hook**  
Picture \(n\) soldiers each firing once; the total hits \(X\) is binomial. The mean is “expected hits = soldiers × hit probability”; variance is the same quantity scaled by the failure probability.

**What to overlearn**  
- PMF: \(\binom{n}{k}p^k(1-p)^{n-k}\)  
- Mean: \(np\)  
- Variance: \(np(1-p)\)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the mean from linearity of indicator variables and the variance from independence; the PMF follows from counting sequences once the independence assumption is stated.

## 10. What this unlocks
The binomial distribution is the gateway to the Poisson limit, the normal approximation with continuity correction, and the exact tests used in clinical trials. It also supplies the likelihood function for logistic regression and the success-count model inside the beta-binomial conjugate analysis.

- Poisson approximation when \(n\to\infty\), \(p\to0\), \(np=\lambda\) fixed  
- De Moivre–Laplace central limit theorem  
- Hypothesis testing for a single proportion  
- Beta-binomial hierarchical model

## 11. Self-check — five questions, no answers
1. A biased coin with \(p=0.7\) is tossed 8 times. Compute \(P(X=6)\) exactly.  
2. For which values of \(n\) and \(p\) does the binomial variance attain its maximum possible value for fixed \(n\)?  
3. Show that the mode of \(\operatorname{Bin}(n,p)\) is \(\lfloor(n+1)p\rfloor\) or \(\lceil(n+1)p\rceil-1\).  
4. An experimenter reports “I observed 12 successes in 20 trials.” Which single number, if changed, would most alter the reported variance?  
5. Explain why the statement “the trials are independent, therefore the variance is \(np\)” is incorrect.