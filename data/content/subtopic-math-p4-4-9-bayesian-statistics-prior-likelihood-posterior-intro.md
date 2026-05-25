## What it is
Bayesian statistics is a framework for inference that treats probability as a measure of belief or confidence in a proposition. It uses Bayes' theorem to update these beliefs as new evidence becomes available. The core idea is to combine prior knowledge about a parameter with new data to produce an updated, more informed posterior belief.

## Why it matters
This is not just a theoretical curiosity; it's the engine behind modern machine learning, signal processing, and experimental physics. In aerospace, it's used for sensor fusion (e.g., combining GPS and inertial measurement unit data) and for estimating the state of a rocket or satellite under uncertainty. In ML, it's the foundation for everything from spam filters to uncertainty quantification in deep learning, telling you not just *what* a model predicts, but how *confident* it is.

## When to study it
Before tackling this, you must have a solid grasp of the following. If not, master them first.
*   **Axiomatic Probability:** Sample spaces, events, and the axioms of probability.
*   **Conditional Probability and Independence:** You must be able to manipulate $P(A|B)$ effortlessly.
*   **The Law of Total Probability and Bayes' Theorem (the basic formula):** You should have already seen and used the formula $P(A|B) = \frac{P(B|A)P(A)}{P(B)}$.
*   **Probability Distributions:** You need to understand both discrete (e.g., Bernoulli, Binomial) and continuous (e.g., Normal, Beta) probability density functions (PDFs) and cumulative distribution functions (CDFs).

## How to study it (step by step)
1.  **Re-derive Bayes' Theorem.** Start from the definition of conditional probability, $P(A|B) = \frac{P(A \cap B)}{P(B)}$. Write the expression for $P(A \cap B)$ in two ways and equate them to derive the theorem. This ensures you own the mechanism, not just the formula.
2.  **Relabel the terms.** Take the theorem $P(H|E) = \frac{P(E|H)P(H)}{P(E)}$ and explicitly label each term with its Bayesian name: Posterior, Likelihood, Prior, and Evidence. Write out what each one *means* in a sentence.
3.  **Work a discrete "urn" or "coin" problem.** Use a simple, countable example. E.g., "I have two coins, one fair and one biased. I pick one at random, flip it, and get heads. What's the probability I picked the biased coin?" This makes the prior, likelihood, and posterior concrete.
4.  **Focus on the update.** See the process as a flow: you start with a prior belief, you observe data, and you end with a posterior belief. The posterior from one experiment can become the prior for the next.
5.  **Sketch a continuous update.** Imagine your prior belief about a parameter $\theta$ is a wide normal distribution. Now, sketch a likelihood function that is sharply peaked around some data point. The posterior will be a new normal distribution, narrower than the prior and shifted towards the likelihood's peak. This visualizes the "learning" process.

## Key ideas, with intuition
1.  **Probability as a Degree of Belief:** In the frequentist view, probability is the long-run frequency of an event. In the Bayesian view, probability is a measure of our certainty about a proposition. This allows us to assign probabilities to things that don't have long-run frequencies, like "the probability that this specific rocket engine's thrust parameter $\theta$ is between 99kN and 101kN."

2.  **The Update Rule:** Bayes' theorem is the engine for learning from data. It formalizes how we should change our minds in light of new evidence.
    $$
    \underbrace{P(H|E)}_{\text{Posterior}} = \frac{\overbrace{P(E|H)}^{\text{Likelihood}} \overbrace{P(H)}^{\text{Prior}}}{\underbrace{P(E)}_{\text{Evidence}}}
    $$
    *   **Prior $P(H)$:** Our belief about a hypothesis $H$ *before* seeing any evidence $E$.
    *   **Likelihood $P(E|H)$:** The probability of observing the evidence $E$, *assuming* the hypothesis $H$ is true. This connects the data to the hypothesis.
    *   **Posterior $P(H|E)$:** Our updated belief about $H$ *after* seeing the evidence $E$.
    *   **Evidence $P(E)$:** The total probability of observing the evidence. It acts as a normalization constant to ensure the posterior probabilities sum to 1.

3.  **The Proportional Form:** Often, we don't care about the normalization constant $P(E)$ until the very end. The essence of the update is that the posterior is proportional to the likelihood times the prior.
    $$
    P(H|E) \propto P(E|H) P(H)
    $$
    This is the heart of the calculation. It tells us that our updated belief is a blend of our initial belief and what the data is telling us.

## Worked example
**Problem:** A certain rare disease affects 1 in 10,000 people. A test for this disease is 99% accurate, meaning it correctly identifies 99% of people who have the disease (true positive) and correctly identifies 99% of people who do not (true negative). You test positive. What is the probability you actually have the disease?

**Solution:**
1.  **Define Hypotheses and Evidence.**
    *   $H$: You have the disease.
    *   $\neg H$: You do not have the disease.
    *   $E$: You test positive.
    We want to find $P(H|E)$.

2.  **State the Known Probabilities (Prior and Likelihoods).**
    *   **Prior:** The prevalence of the disease is our prior belief.
        $P(H) = \frac{1}{10000} = 0.0001$.
        Therefore, $P(\neg H) = 1 - P(H) = 0.9999$.
    *   **Likelihoods:** These come from the test's accuracy.
        *   The probability of testing positive *given* you have the disease (true positive rate): $P(E|H) = 0.99$.
        *   The probability of testing positive *given* you don't have the disease (false positive rate): This is $1 - (\text{true negative rate}) = 1 - 0.99 = 0.01$. So, $P(E|\neg H) = 0.01$.

3.  **Apply Bayes' Theorem.**
    $$
    P(H|E) = \frac{P(E|H)P(H)}{P(E)}
    $$

4.  **Calculate the Denominator (Evidence).**
    The evidence $P(E)$ is the total probability of testing positive. We calculate this using the Law of Total Probability:
    $$
    \begin{aligned}
    P(E) &= P(E|H)P(H) + P(E|\neg H)P(\neg H) \\
    &= (0.99)(0.0001) + (0.01)(0.9999) \\
    &= 0.000099 + 0.009999 \\
    &= 0.010098
    \end{aligned}
    $$

5.  **Calculate the Posterior.**
    $$
    \begin{aligned}
    P(H|E) &= \frac{(0.99)(0.0001)}{0.010098} \\
    &\approx 0.0098
    \end{aligned}
    $$

**Reflection:**
Even with a 99% accurate test, a positive result means there is only a ~0.98% chance you have the disease. The initial belief (the very low prior probability) dominates the outcome. The denominator, $P(E)$, worked by weighting the two ways you could get a positive result: a true positive from a sick person (rare) and a false positive from a healthy person (common). Because the healthy group is so much larger, false positives make up the vast majority of all positive tests.

## Diagrams

This diagram shows the flow of a Bayesian update.

```text
           +-----------------+
           |   Prior Belief  |
           |      P(H)       |
           +-----------------+
                   |
                   | Combines with...
                   v
+----------------------------------------+      +-----------------+
|              Likelihood                |----->| Posterior Belief|
|   How probable is the evidence E,      |      |      P(H|E)     |
|   given our hypothesis H is true?      |      +-----------------+
|              P(E|H)                    |
+----------------------------------------+
```

This diagram shows how the posterior distribution for a parameter $\theta$ is a compromise between the prior and the likelihood.

```text
Probability Density
     ^
     |
     |              /-------------\
     |             /               \   <-- Likelihood (from data)
     |            /                 \      (Peaked at data's suggestion)
     |           /                   \
     |    . . . / . . . . . . . . . . \ . . . . . .   <-- Prior
     | .       /           \           . . . . . . .   (Broad, initial belief)
     |  .     /             \           .   /----\
     |   .   /               \         .   /      \  <-- Posterior
     |    . /                 \       .   /        \   (Narrower, compromise)
     +--------------------------------------------------> Parameter value θ
```

## Memory technique — remember this forever
1.  **The Detective Mnemonic:** Think of Bayesian inference as a detective story.
    *   **Prior:** The detective's initial list of suspects and their probabilities of guilt before any clues are found. *("I think it's the butler, I'm 30% sure.")*
    *   **Likelihood:** The detective finds a clue (e.g., a muddy bootprint). The likelihood is the probability of finding this clue *if* a specific suspect were guilty. *("If the butler did it, there's a 90% chance he'd leave a muddy print.")*
    *   **Posterior:** The detective's updated suspicion after considering the clue. *("Given the bootprint, my suspicion for the butler is now 85%.")*

2.  **Formulas to Overlearn:**
    *   The full form: $P(H|E) = \frac{P(E|H)P(H)}{P(E)}$
    *   The "engine" form: Posterior $\propto$ Likelihood $\times$ Prior

3.  **Spaced Repetition Schedule:** Review this material and re-work the example at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget Bayes' theorem, derive it.
    *   Start with the definition of conditional probability: $P(A|B) = \frac{P(A \cap B)}{P(B)}$.
    *   This means $P(A \cap B) = P(A|B)P(B)$.
    *   By symmetry, $P(B \cap A) = P(B|A)P(A)$.
    *   Since $P(A \cap B) = P(B \cap A)$, we have $P(A|B)P(B) = P(B|A)P(A)$.
    *   Divide by $P(B)$ to get $P(A|B) = \frac{P(B|A)P(A)}{P(B)}$. Done.

## Common mistakes
1.  **The Base Rate Fallacy:** Ignoring the prior. In the medical example, the intuitive-but-wrong answer is 99%. This happens when you forget that the disease is extremely rare, a crucial piece of prior information.
2.  **Confusing the Likelihood and the Posterior:** Mistaking $P(E|H)$ for $P(H|E)$. The probability of a positive test given you have the disease is not the same as the probability you have the disease given a positive test. The first is a property of the test; the second is what you want to know.
3.  **Choosing a "Uninformative" Prior and Thinking It's Objective:** Students often try to set a uniform prior (e.g., $P(H)=0.5$) to be "objective." This is still a choice with consequences. Acknowledging that the prior represents existing knowledge (even if that knowledge is vague) is more honest and effective.

## Self-check
1.  An aircraft's engine has two independent fire detection systems, A and B.
    *   $P(\text{Fire}) = 0.001$.
    *   $P(\text{A alarms} | \text{Fire}) = 0.95$.
    *   $P(\text{A alarms} | \text{No Fire}) = 0.01$.
    System A sounds an alarm. What is the probability there is actually a fire?

2.  In the statement "Posterior $\propto$ Likelihood $\times$ Prior," explain in one sentence what role the Likelihood plays in shifting your belief from the Prior to the Posterior.

3.  You perform the medical test from the worked example and test positive. Your posterior probability of having the disease is now ~0.98%. A week later, you take a *second, independent* test of the exact same type, and it also comes back positive. What is your new posterior probability of having the disease?