## 1. The one-sentence answer
**Bayes' theorem is the rule that converts a prior probability into a posterior probability once new evidence arrives.**

It rests on the observation that the joint probability of two events can be written in either order. Because the joint probability is the same either way, the two expressions for conditional probability must be equal after rearrangement. This single algebraic identity lets any probability statement be updated when fresh data appears.

The theorem therefore supplies the precise mechanism for rational belief revision. It does not tell us what the numbers are; it tells us how any two numbers must be related once the evidence is taken into account. All later applications—medical diagnosis, spam filters, machine-learning classifiers—are simply repeated uses of this identity on different events.

> [!NOTE]
> The “aha” is that P(A|B) and P(B|A) are almost never equal; the theorem supplies the exact numerical bridge between them.

## 2. Why this matters — concrete and current
Google’s spam filter (2002–present) treats every incoming email as a vector of word tokens and uses a naïve-Bayes classifier whose core update step is Bayes’ theorem; the filter still processes billions of messages daily.

In the 2020–2022 COVID-19 testing programs, public-health agencies applied the theorem to convert a test’s sensitivity and specificity into the probability that a positive result indicated true infection, given local prevalence; the calculation changed quarantine policy in multiple countries.

Particle physicists at the LHC use Bayesian inference to set upper limits on the cross-section of hypothetical particles; each new data-taking period updates the posterior via Bayes’ theorem, and the resulting credible intervals appear in every ATLAS and CMS paper.

Modern self-driving-car perception stacks (Waymo, Cruise) maintain a posterior distribution over object classes and positions; each LiDAR or camera frame is folded in by a Bayes update inside the tracking filter, allowing the vehicle to revise its belief about a pedestrian’s intent within milliseconds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Conditional probability  | Bayes’ theorem is an identity between two conditional probabilities |
| Joint probability        | The derivation equates the two factorizations of the same joint event |
| Law of total probability | Converts the marginal probability in the denominator into a sum over mutually exclusive cases |

## 4. Building the idea — from intuition to formalism

### Step 1 — Conditional probability as a ratio
Conditional probability measures how often A occurs once B is known.  
Example: In a deck of 52 cards, the probability that the card is an ace given that it is a spade is 1/13.  
The formal statement is  
$$P(A|B)=\frac{P(A\cap B)}{P(B)}.$$  
> [!WARNING] Treating P(A|B) as “P(A) after B happens” without dividing by P(B) produces numbers larger than 1.

### Step 2 — Symmetry of the joint probability
The joint event “A and B” is the same set regardless of order.  
Example: Drawing an ace of spades is the same event whether you first say “ace” or first say “spade.”  
Hence  
$$P(A\cap B)=P(B\cap A).$$

### Step 3 — Two expressions for the same joint
Substitute the definition of conditional probability into each side of the equality above:  
$$P(A|B)P(B)=P(B|A)P(A).$$

### Step 4 — Solve for the desired conditional
Divide both sides by P(B) (assumed positive) to isolate the target probability:  
$$P(A|B)=\frac{P(B|A)P(A)}{P(B)}.$$

### Step 5 — Expand the marginal probability
When B can arise in several mutually exclusive ways, replace the denominator by the law of total probability:  
$$P(B)=\sum_i P(B|A_i)P(A_i).$$  
The resulting expression is the textbook statement of Bayes’ theorem.

## 5. Worked examples — every step shown

**Example 1 — Disease test (base rate)**  
*Given:* A disease affects 1 % of the population. A test is 99 % sensitive and 95 % specific.  
*Find:* Probability a person has the disease given a positive test.  

Step 1: Write the known probabilities.  
$$P(D)=0.01,\quad P(+|D)=0.99,\quad P(-|\neg D)=0.95.$$  
*Why:* These are the prior and the test characteristics supplied by the problem.  

Step 2: Compute the false-positive rate.  
$$P(+|\neg D)=1-0.95=0.05.$$  
*Why:* Specificity is the true-negative rate; its complement is required for the total-probability denominator.  

Step 3: Apply Bayes’ theorem.  
$$P(D|+)=\frac{P(+|D)P(D)}{P(+|D)P(D)+P(+|\neg D)P(\neg D)}=\frac{0.99\times0.01}{0.99\times0.01+0.05\times0.99}=0.165.$$  
*Why:* The denominator expands the marginal probability of a positive result.  

**0.165**  

*Reflection:* The low posterior despite excellent test accuracy illustrates the effect of the small base rate; the same arithmetic appears in every screening program.

**Example 2 — Two mutually exclusive causes**  
*Given:* A factory has two machines; machine A produces 60 % of items and 2 % defectives, machine B produces 40 % and 5 % defectives. An item is defective.  
*Find:* Probability it came from machine A.  

Step 1: Identify events and priors.  
$$P(A)=0.6,\quad P(B)=0.4,\quad P(D|A)=0.02,\quad P(D|B)=0.05.$$  
*Why:* The machines partition production.  

Step 2: Substitute into Bayes’ theorem.  
$$P(A|D)=\frac{0.02\times0.6}{0.02\times0.6+0.05\times0.4}=0.375.$$  
*Why:* The denominator sums the two ways a defective item can arise.  

**0.375**  

*Reflection:* The calculation is identical in form to the disease example once the partition is recognized.

**Example 3 — Sequential evidence**  
*Given:* Same disease data as Example 1. A second independent test on the same person is also positive.  
*Find:* Updated probability after both positives.  

Step 1: Use the posterior from Example 1 as the new prior.  
$$P(D)=0.165.$$  
*Why:* Bayes’ theorem is applied iteratively; yesterday’s posterior becomes today’s prior.  

Step 2: Repeat the update with the second likelihood.  
$$P(D|+,+)=\frac{0.99\times0.165}{0.99\times0.165+0.05\times0.835}\approx0.796.$$  
*Why:* Independence of tests lets the same likelihood be reused.  

**0.796**  

*Reflection:* Each new piece of evidence simply multiplies the numerator and adds the complementary term in the denominator.

**Example 4 — Continuous parameter (Beta-Binomial)**  
*Given:* A coin with unknown heads probability θ is assumed to have a uniform prior Beta(1,1). After 7 heads and 3 tails the likelihood is binomial.  
*Find:* Posterior mean of θ.  

Step 1: Write the Beta update rule (derived from Bayes).  
Posterior ∝ likelihood × prior → Beta(1+7,1+3)=Beta(8,4).  
*Why:* The uniform prior is conjugate; the normalizing constant cancels in the mean formula.  

Step 2: Compute the mean of Beta(α,β).  
$$\mathbb{E}[\theta]=\frac{\alpha}{\alpha+\beta}=\frac{8}{12}\approx0.667.$$  
*Why:* The mean formula follows directly from the definition of the Beta density.  

**0.667**  

*Reflection:* The same theorem that updates a binary disease probability also updates an entire distribution over a continuous parameter.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Swapping P(A|B) with P(B|A)       | Linguistic ambiguity of “given”             | Always label the conditioning event explicitly |
| Forgetting the base rate          | Intuition focuses on test accuracy alone    | Write P(A) before writing any likelihood     |
| Treating successive tests as independent when they are not | Shared measurement error                    | Check the independence assumption in the model |
| Using P(B) directly instead of total probability | Denominator looks like a single number      | Expand P(B) whenever more than one cause exists |
| Normalizing with the wrong partition | Overlooking a possible cause                | List every mutually exclusive, exhaustive case first |
| Interpreting posterior as “probability the hypothesis is true” without priors | Frequentist training                        | State the prior explicitly before any calculation |
| Numerical overflow in many updates | Repeated multiplication of small probabilities | Work in log space or rescale at each step    |

## 7. The textbook-precise statement
Let A and B be events in a probability space with P(B)>0. Then  
$$P(A|B)=\frac{P(B|A)P(A)}{P(B)}.$$  
If {A_i} is a countable partition of the sample space, the denominator expands as  
$$P(B)=\sum_i P(B|A_i)P(A_i).$$  
(See Feller, *An Introduction to Probability Theory and Its Applications*, Vol. 1, 3rd ed., §5.2.)

## 8. Visual — diagram or schematic
```text
Prior P(A) ──likelihood P(B|A)──► joint P(A∩B)
                                    │
                                    ▼
                          P(A|B) ◄── divide by P(B)
Prior P(¬A) ──likelihood P(B|¬A)──► joint P(¬A∩B)
```
The vertical bar represents the marginal P(B) obtained by summing the two joints; the arrow from joint to posterior is the normalization step that yields the updated probability.

## 9. The memory technique
1. **The hook** — Picture a pair of scales: one pan holds the prior times the likelihood, the other holds the marginal evidence; the balance point is the posterior.  
2. **What to overlearn** — The four-symbol identity P(A|B)P(B)=P(B|A)P(A) and the instruction “always expand the denominator.”  
3. **Spaced-repetition schedule** — Review the identity at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the two definitions of joint probability and the law of total probability; the algebra is four lines.

## 10. What this unlocks
Bayes’ theorem is the single updating engine behind all Bayesian inference. It directly enables:

- Conjugate priors and closed-form posterior updates  
- Markov-chain Monte Carlo sampling for intractable posteriors  
- Bayesian networks and causal graphical models  
- Sequential Monte Carlo / particle filters used in tracking  
- Bayesian optimization and active learning loops  

## 11. Self-check — five questions, no answers
1. A test with 90 % sensitivity and 80 % specificity is applied to a population where prevalence is 5 %. Compute the positive predictive value.  
2. Two events A and B satisfy P(A|B)=P(B|A). What must be true about their probabilities?  
3. In Example 3 above, a third independent positive test arrives. Without recalculating the full fraction, state whether the posterior must exceed 0.9.  
4. Explain why omitting one term from the law-of-total-probability denominator systematically biases every subsequent Bayes update.  
5. A continuous parameter θ has prior density f(θ). After observing data x the likelihood is L(x|θ). Write the normalizing constant required to obtain the posterior density and state its name.