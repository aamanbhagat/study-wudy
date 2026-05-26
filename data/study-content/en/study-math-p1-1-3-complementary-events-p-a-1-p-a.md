## 1. The one-sentence answer
**Complementary events partition the sample space so that exactly one of them must occur, forcing their probabilities to sum to 1.**

The complement of an event *A*, written *A'*, collects every outcome that *A* does not contain. Because the sample space already contains every possible outcome, *A* together with *A'* leaves nothing out and overlaps in nothing. Their probabilities are therefore exhaustive and disjoint, which immediately yields the numerical relation *P(A') = 1 − P(A)*.

This identity is not an extra rule to memorize; it follows directly from the axioms that probabilities are non-negative and that the entire sample space has probability 1. Once those two facts are granted, the complement supplies the missing probability mass without further calculation.

> [!NOTE]
> The single most useful consequence is that computing the probability of “at least one success” is often far harder than computing “zero successes”; the complement converts the harder problem into the easier one.

## 2. Why this matters — concrete and current
SpaceX reliability engineers calculate the probability that a Falcon 9 first-stage landing fails by first finding the probability that every subsystem performs correctly and subtracting from 1; the complement avoids enumerating thousands of distinct failure modes.

In semiconductor yield analysis at TSMC, the probability that a wafer contains zero defects is obtained directly; subtracting that figure from 1 supplies the probability that the wafer must be scrapped or reworked, guiding fab capacity forecasts without simulating every defect pattern.

Google’s spam filter team models the event “message is spam” and its complement “message is not spam.” Because these two events cover every incoming email, the model can normalize its output scores so they always sum to 1, satisfying calibration requirements demanded by downstream ranking systems.

Epidemiologists at the WHO studying COVID-19 vaccine efficacy compute the probability that a trial participant remains uninfected; the complement immediately yields the probability of infection, allowing rapid comparison across trial arms without re-deriving the full infection process each time.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sample space         | Supplies the universal set whose probability is defined to be 1 |
| Event                | A subset of the sample space whose complement we will form |
| Probability measure  | Must satisfy non-negativity and normalization on the whole space |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every outcome belongs somewhere
Any trial produces exactly one outcome. That outcome either satisfies the description of event *A* or it does not.  
Concrete example: roll a fair six-sided die; the outcome 4 satisfies “even number” while 3 does not.  
Formally, the sample space *Ω* satisfies *Ω = A ∪ A'* and *A ∩ A' = ∅*.  
> [!WARNING] Treating *A'* as “everything except the outcomes you happen to be thinking about” instead of the strict set-theoretic complement will leave outcomes unaccounted for.

### Step 2 — Probability is additive over disjoint sets
When two sets share no outcomes, the probability of their union equals the sum of their separate probabilities.  
Concrete example: probability of rolling a 1 or a 2 on a die is 1/6 + 1/6.  
Formally, if *A ∩ B = ∅* then *P(A ∪ B) = P(A) + P(B)*.  
> [!WARNING] Adding probabilities when the sets overlap double-counts the intersection.

### Step 3 — The whole sample space has probability 1
By definition the certain event *Ω* receives probability 1.  
Formally, *P(Ω) = 1*.  
> [!WARNING] Forgetting this axiom leaves the equation under-determined; you cannot solve for the complement.

### Step 4 — Union of *A* and *A'* recovers *Ω*
From Step 1 the two sets are exhaustive and disjoint, so their union is exactly *Ω*.  
Formally, *A ∪ A' = Ω*.  
> [!WARNING] If the definition of *A'* is altered (for example by excluding outcomes thought “impossible”), the union is no longer *Ω*.

### Step 5 — Additivity plus normalization produces the formula
Apply Step 2 to the disjoint union in Step 4 and insert Step 3:  
$$P(A \cup A') = P(A) + P(A') = P(\Omega) = 1.$$  
Solving for the complement immediately yields  
$$P(A') = 1 - P(A).$$  
This is the textbook statement of the result.

## 5. Worked examples — every step shown

**Example 1 — Fair coin**  
*Given:* A fair coin is tossed once; let *A* be the event “heads.”  
*Find:* *P(A')*.  
*P(A) = 1/2* (by symmetry of the coin).  
*Why:* The two faces are equally likely and exhaustive.  
*P(A') = 1 − P(A) = 1 − 1/2 = 1/2*.  
**1/2**  
*Reflection:* The complement is simply “tails”; the arithmetic is trivial yet illustrates that the formula recovers the obvious answer.

**Example 2 — Six-sided die**  
*Given:* A fair die is rolled; let *A* be the event “number ≤ 2.”  
*Find:* Probability the number is greater than 2.  
*P(A) = 2/6 = 1/3*.  
*Why:* Two favorable faces out of six.  
*P(A') = 1 − 1/3 = 2/3*.  
**2/3**  
*Reflection:* Direct counting of the complement {3,4,5,6} confirms the subtraction; the example scales to larger discrete spaces.

**Example 3 — Drawing a card**  
*Given:* A standard 52-card deck is shuffled; let *A* be “ace of spades.”  
*Find:* Probability the card is not the ace of spades.  
*P(A) = 1/52*.  
*Why:* Exactly one card satisfies the description.  
*P(A') = 1 − 1/52 = 51/52*.  
**51/52**  
*Reflection:* The formula avoids listing 51 separate outcomes; the single subtraction replaces 51 additions.

**Example 4 — At least one head in three tosses**  
*Given:* Three independent fair coins; let *A* be “at least one head.”  
*Find:* *P(A')*.  
It is easier to count the complementary event “zero heads,” i.e., TTT, whose probability is (1/2)^3 = 1/8.  
*Why:* The three tosses are independent, so the joint probability multiplies.  
*P(A') = 1/8*, therefore *P(A) = 1 − 1/8 = 7/8*.  
**7/8**  
*Reflection:* The complement reduced an enumeration of seven outcomes to a single outcome; this pattern generalizes to binomial settings.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating *A'* as “unlikely events” | Intuition confuses rarity with logical negation | Always define *A'* as the set of outcomes not in *A* |
| Subtracting from 1 when events overlap | Forgetting that additivity requires disjointness | Verify *A ∩ A' = ∅* before applying the formula      |
| Using the formula on continuous densities without integration | Probability is an integral, not a point value | Integrate the density over the complementary region  |
| Assuming *P(A')* is automatically small when *P(A)* is large | Psychological anchoring on the given probability | Compute both sides explicitly on a small example     |
| Confusing complement with conditional probability | Both involve “given that something else” language | Keep notation distinct: *A'* versus *A|B*            |
| Applying the rule when the sample space is not fully known | Hidden outcomes violate exhaustiveness      | Explicitly list or axiomatize *Ω* first              |
| Numerical instability when *P(A)* is given as 0.999999 | Floating-point rounding hides the exact complement | Keep exact fractions until the final subtraction     |

## 7. The textbook-precise statement
Let *(Ω, ℱ, P)* be a probability space and let *A ∈ ℱ*. The complement of *A* relative to *Ω* is the set *A^c = Ω \ A*. Because *A* and *A^c* are disjoint and their union equals *Ω*, countable additivity together with normalization yields  
$$P(A^c) = 1 - P(A).$$  
(See Ross, *A First Course in Probability*, 10e, §2.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          Ω
   +-------------------+
   |                   |
   |   +---------+     |
   |   |    A    |     |
   |   |         |     |
   |   +---------+     |
   |                   |
   |      A'           |
   +-------------------+
```
Label *Ω* the outer rectangle, *A* the inner rectangle, and the remaining shaded region *A'*. The two regions together fill *Ω* without overlap.

## 9. The memory technique

1. **The hook** — Picture a coin resting on your palm: one face is *A*, the other face is forced to be *A'*; together they make the whole coin whose “probability weight” is 1.
2. **What to overlearn** — The identity *P(A') = 1 − P(A)* and the set equality *A ∪ A' = Ω*, *A ∩ A' = ∅*.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing *P(A) + P(A') = P(Ω) = 1* and solving.

## 10. What this unlocks
Mastery of complements converts many “at-least-one” or “none” calculations into single-term subtractions and prepares the ground for inclusion-exclusion, conditional probability, and Bayes’ theorem.  
- Union probability via inclusion-exclusion  
- Law of total probability (partitioning on *A* and *A'*)  
- Binomial and Poisson tail probabilities  
- Reliability block diagrams in engineering  

## 11. Self-check — five questions, no answers
1. A fair die is rolled. Compute the probability that the outcome is not a multiple of 3.  
2. In a class of 30 students, the probability that a randomly chosen student has a birthday in January is 4/30. What is the probability the chosen student’s birthday is not in January?  
3. Three independent sensors each fail with probability 0.01. What is the probability that at least one sensor fails?  
4. Explain why *P(A')* cannot be negative even when *P(A)* is given only approximately.  
5. A continuous random variable *X* has density *f(x)* on [0,1]. Write an integral expression for *P(X > 0.7)* using the complement.