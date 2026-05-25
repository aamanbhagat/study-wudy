## What it is
Bayes' theorem is a mathematical formula for updating the probability of a hypothesis as new evidence becomes available. It allows you to reverse conditional probabilities: if you know the probability of observing certain evidence given a hypothesis, Bayes' theorem tells you the probability that the hypothesis is true given the observed evidence.

## Why it matters
This is the engine of modern machine learning, sensor fusion, and scientific reasoning. In aerospace, Kalman filters use continuous Bayesian updating to estimate a rocket's true trajectory from noisy GPS and accelerometer data. In computer science, it forms the mathematical foundation of spam filters, medical diagnosis algorithms, and probabilistic AI. It is how rational agents update their beliefs in a universe of uncertainty.

## When to study it
You must already possess a rock-solid understanding of:
1. Basic probability axioms.
2. The definition of conditional probability: $P(A|B) = \frac{P(A \cap B)}{P(B)}$.
3. The Law of Total Probability. 

If you cannot intuitively explain what $P(A \cap B)$ means or how to partition a sample space, stop and review foundational probability. You are not ready for Bayes.

## How to study it (step by step)
1. Write down the definitions of conditional probability for both $P(A|B)$ and $P(B|A)$. 
2. Set the two equations equal to their shared intersection $P(A \cap B)$ to derive Bayes' theorem yourself.
3. Review the Law of Total Probability to understand how to expand the denominator $P(B)$ when it is not explicitly given.
4. Solve a classic "base rate" problem (e.g., a rare disease with an imperfect test) to see how the math contradicts flawed human intuition.
5. Solve an engineering problem: given multiple sensors with known error rates, calculate the probability a specific sensor failed given a bad reading.
6. Map the algebraic terms to the standard Bayesian vocabulary: Prior, Likelihood, Marginal, and Posterior.

## Key ideas, with intuition

**1. The Derivation**
Bayes' theorem is not magic; it is a trivial algebraic rearrangement. 
Start with the definition of conditional probability:
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
$$P(B|A) = \frac{P(A \cap B)}{P(A)}$$
Rearrange the second equation to isolate the joint probability: $P(A \cap B) = P(B|A)P(A)$.
Substitute this into the numerator of the first equation:
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

**2. The Vocabulary**
You must know the names of these terms to read any advanced literature:
*   $P(A)$: **Prior**. Your belief in hypothesis $A$ before seeing evidence.
*   $P(B|A)$: **Likelihood**. The probability of seeing evidence $B$ *if* hypothesis $A$ is true.
*   $P(B)$: **Marginal (or Evidence)**. The total probability of seeing evidence $B$ under all possible hypotheses.
*   $P(A|B)$: **Posterior**. Your updated belief in hypothesis $A$ after seeing evidence $B$.

**3. Expanding the Denominator**
In practice, $P(B)$ is rarely handed to you. You must build it by summing the probabilities of all the different ways $B$ could happen. If $A$ and $\neg A$ (not $A$) are the only possibilities:
$$P(B) = P(B|A)P(A) + P(B|\neg A)P(\neg A)$$

## Worked example
**Problem:** A rocket's primary altimeter has a 1% chance of failing during ascent ($P(F) = 0.01$). If it fails, the diagnostic system will flag an error 95% of the time ($P(E|F) = 0.95$). If it has *not* failed, the system falsely flags an error 2% of the time ($P(E|\neg F) = 0.02$). The diagnostic system flags an error. What is the probability the altimeter actually failed?

**Step 1: Identify the goal.** 
We want the posterior probability of failure given an error: $P(F|E)$.

**Step 2: State Bayes' theorem.**
$$P(F|E) = \frac{P(E|F)P(F)}{P(E)}$$

**Step 3: Expand the denominator using the Law of Total Probability.**
$$P(E) = P(E|F)P(F) + P(E|\neg F)P(\neg F)$$

**Step 4: Plug in the known values.**
The prior of failure $P(F) = 0.01$. Therefore, $P(\neg F) = 0.99$.
$$P(E) = (0.95)(0.01) + (0.02)(0.99)$$
$$P(E) = 0.0095 + 0.0198 = 0.0293$$

**Step 5: Calculate the posterior.**
$$P(F|E) = \frac{0.0095}{0.0293} \approx 0.324$$

**Reflection:** Even though the diagnostic system is highly accurate (95% true positive, only 2% false positive), the probability that the altimeter actually failed is only 32.4%. Why? Because the *prior* probability of failure is so low (1%) that the absolute number of false alarms overwhelms the absolute number of true failures. 

## Diagrams

A probability tree is the best way to visualize the expansion of the denominator in Bayes' theorem. 

```text
            Prior               Likelihood          Joint Probability (Branch Product)
                             ___ Error (E)        P(F ∩ E)  = 0.01 * 0.95 = 0.0095
                     0.95  /
                 _________ Fail (F)
                /  0.01    \
               /             \__ No Error (~E)    P(F ∩ ~E) = 0.01 * 0.05 = 0.0005
Start --------|
               \             ___ Error (E)        P(~F ∩ E) = 0.99 * 0.02 = 0.0198
                \  0.99    /
                 _________ OK (~F)
                           \
                     0.98    \__ No Error (~E)    P(~F ∩ ~E) = 0.99 * 0.98 = 0.9702

To find P(F | E), look at the tree. 
Evidence E happened. Therefore, you are on one of the branches ending in E.
The total probability of being on an E branch is 0.0095 + 0.0198 = 0.0293.
The probability you arrived there via the F branch is 0.0095.
Result: 0.0095 / 0.0293.
```

## Memory technique — remember this forever
1. **The Hook:** Think "Posterior = (Likelihood $\times$ Prior) / Evidence". 
2. **The Formula to Overlearn:** 
   $$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$
3. **Spaced Repetition Schedule:** Review this derivation and solve one word problem at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you forget the formula, never guess. Write $P(A \cap B) = P(B \cap A)$. Expand both sides using the definition of conditional probability: $P(A|B)P(B) = P(B|A)P(A)$. Divide by $P(B)$. You have rebuilt the theorem.

## Common mistakes
1. **Base Rate Neglect:** Students look at a test with 99% accuracy and assume a positive result means a 99% chance of the hypothesis being true. You *must* multiply by the prior.
2. **Confusing $P(A|B)$ with $P(B|A)$:** The probability of a smoke alarm sounding given a fire is near 100%. The probability of a fire given a smoke alarm sounding is much lower (because of burnt toast). Do not swap them.
3. **Botching the denominator:** Forgetting that $P(B)$ must account for *all* mutually exclusive ways $B$ can happen. 

## Self-check
1. If $P(X)=0.2$, $P(Y)=0.5$, and $P(Y|X)=0.8$, what is the exact value of $P(X|Y)$?
2. A spam filter flags the word "crypto". 2% of all your incoming emails are spam. 70% of spam emails contain "crypto". 5% of non-spam emails contain "crypto". What is the probability an email is spam given it contains the word "crypto"?
3. Prove Bayes' theorem for three mutually exclusive and exhaustive hypotheses $H_1, H_2, H_3$. Write the formula for $P(H_2 | E)$ entirely in terms of priors and likelihoods.