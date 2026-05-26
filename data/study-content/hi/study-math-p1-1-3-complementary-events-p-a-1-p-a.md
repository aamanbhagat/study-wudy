## 1. The one-sentence answer
**Complementary events** simply mean that for any event A inside a sample space, its complement A' contains every outcome that A does not, and therefore their probabilities always add to exactly 1.

Yeh rule aapko probability space ko do hisson mein todne ki permission deti hai: jo kuch A ke andar hai aur jo kuch A ke bahar hai. Kyunki dono hisse mil kar poora sample space cover karte hain aur koi overlap nahi hota, unki probabilities ka sum 1 hona zaroori hai. Iska seedha natija P(A') = 1 − P(A) hai. 

Agar aap ek baar yeh dekh lein ki A aur A' ek dusre ke “ulta” hain aur saath mil kar saari possibilities le lete hain, toh calculation bahut simple ho jaati hai — aap sirf ek taraf ki probability nikaal kar dusri taraf ko 1 se subtract kar dete hain.

> [!NOTE]
> The deepest “aha” here is that you never need to count the outcomes in A' directly; once you know P(A), the complement probability is free.

## 2. Why this matters — concrete and current
In aerospace reliability analysis, NASA’s fault-tree software uses complementary probability to compute “probability of mission failure” by first calculating the easier “probability of at least one critical subsystem working” and subtracting from 1.

In semiconductor yield modelling, TSMC engineers calculate the probability that a chip has zero defects by first finding the probability it has at least one defect and then taking the complement; this directly feeds into wafer-cost decisions.

In modern large-language-model training, dropout regularisation treats each neuron as an event; the probability that a neuron is dropped is obtained instantly as 1 minus the keep probability, avoiding separate sampling loops.

In gravitational-wave astronomy, LIGO’s detection pipelines compute the false-alarm rate by finding the probability that noise alone exceeds a threshold and then subtracting from 1 to obtain the probability that a real signal is present.

In weather-risk derivatives traded on the CME, the probability that temperature stays below a strike value is calculated via the complement of the exceedance probability, because the latter has already been pre-computed by meteorological ensembles.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sample space         | Defines the universal set whose total probability is 1    |
| Event                | The set A whose complement we want                        |
| Probability axioms   | Guarantees that P(S) = 1 and disjoint events add          |
| Set notation         | Needed to write A' = S \ A cleanly                        |

If any row above feels shaky, pause and review that single idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The whole is exactly one
Every random experiment has a sample space S whose probability is defined to be 1.  
Concrete example: rolling a fair six-sided die, S = {1,2,3,4,5,6}, P(S) = 1.  
Formal statement:  
$$P(S) = 1.$$  
> [!WARNING] If you ever assign P(S) anything other than 1, the entire probability model collapses.

### Step 2 — Partition into A and its complement
Any event A divides S into two disjoint pieces: A itself and everything else, called A'.  
Example: A = “roll an even number” = {2,4,6}, then A' = {1,3,5}.  
Formal statement:  
$$A \cup A' = S \quad \text{and} \quad A \cap A' = \emptyset.$$

### Step 3 — Additivity on disjoint sets
Because A and A' share no outcomes, the third axiom says their probabilities add:  
$$P(A \cup A') = P(A) + P(A').$$  
Substitute the result of Step 1:  
$$P(A) + P(A') = 1.$$

### Step 4 — Solve for the complement
Algebraic rearrangement immediately yields the working formula  
$$P(A') = 1 - P(A).$$  
This is now a theorem, not a definition.

### Step 5 — Verify with equally likely outcomes
When |S| = n and each outcome has probability 1/n,  
$$P(A) = \frac{|A|}{n}, \quad P(A') = \frac{n - |A|}{n} = 1 - P(A).$$  
The counting argument matches the axiomatic derivation.

## 5. Worked examples — har step show karo

**Example 1 — Single coin toss**  
*Given:* Fair coin, A = heads.  
*Find:* P(tails).  
P(A) = 1/2.  
By definition of complement, tails = A'.  
$$P(A') = 1 - \frac12 = \frac12.$$  
*Why:* We used the partition property directly.  
**Final answer**  
**1/2**

*Reflection:* The example is trivial yet shows that we never counted tails explicitly.

**Example 2 — Fair six-sided die**  
*Given:* A = “number ≤ 2”.  
*Find:* P(A').  
|A| = 2, so P(A) = 2/6 = 1/3.  
$$P(A') = 1 - \frac13 = \frac23.$$  
*Why:* Subtraction replaces counting the three outcomes {3,4,5,6}.  
**Final answer**  
**2/3**

*Reflection:* Demonstrates saving arithmetic when |A'| is larger than |A|.

**Example 3 — Two independent coin tosses**  
*Given:* Sample space of HH, HT, TH, TT. A = “at least one head”.  
*Find:* P(no heads).  
P(A) = 3/4.  
$$P(A') = 1 - \frac34 = \frac14.$$  
*Why:* Only TT belongs to A', confirming the formula.  
**Final answer**  
**1/4**

*Reflection:* Shows the formula works even when outcomes are not singletons.

**Example 4 — Biased spinner with continuous angle**  
*Given:* Spinner uniform on [0, 360°), A = “angle between 0° and 90°”.  
*Find:* P(A').  
P(A) = 90/360 = 1/4.  
$$P(A') = 1 - \frac14 = \frac34.$$  
*Why:* Length of complement arc is 270°, ratio 270/360 = 3/4.  
**Final answer**  
**3/4**

*Reflection:* Formula is identical for continuous uniform distributions.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating A' as “opposite” in English sense | Everyday language confuses logical complement with colloquial opposite | Always draw the sample-space rectangle and shade A' explicitly |
| Adding P(A) + P(A') and getting something other than 1 | Forgot that A and A' are exhaustive | Check the union equals S before adding |
| Using 1 − P(A) when A and B are mutually exclusive but not complements | Student thinks any two disjoint events are complements | Verify A ∪ B = S, not merely A ∩ B = ∅ |
| Forgetting that P(A') can be larger than 0.5 | Psychological bias toward the named event | Always compare |A| and |S| − |A| before calculating |
| Applying the formula to conditional probability without adjusting the space | Confuses unconditional complement with conditional | Write the new sample space first, then complement |
| Notation mix-up between A' and A^c | Different textbooks use different symbols | Pick one symbol for the whole solution |
| Calculating 1 − P(A) when events are not in the same probability space | Copy-paste from another problem | Restate the sample space at the start of every question |

## 7. The textbook-precise statement
Let (Ω, F, P) be a probability space and let A ∈ F. The complement of A relative to Ω is the set A^c := Ω \ A. Because A and A^c are disjoint and their union is Ω, the axioms of probability give  
$$P(A) + P(A^c) = P(Ω) = 1.$$  
Hence  
$$P(A^c) = 1 - P(A).$$  
(See Sheldon Ross, *A First Course in Probability*, 10th ed., §2.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
Sample Space Ω (rectangle)
+---------------------------+
|                           |
|   A (shaded left)         |   A' (shaded right)
|   +----------+            |
|   |          |            |
|   |          |            |
|   +----------+            |
|                           |
+---------------------------+
A ∪ A' = Ω, A ∩ A' = empty
```

## 9. The memory technique
1. **The hook** — Picture a coin: one side is A, the other side is instantly A'; the whole coin is worth 1.
2. **What to overlearn** — The single identity P(A') = 1 − P(A) together with the two set facts A ∪ A' = Ω and A ∩ A' = ∅.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If the formula vanishes from memory, redraw the rectangle, label the two regions, invoke additivity on disjoint exhaustive sets, then solve for the unknown region.

## 10. What this unlocks
Once you treat complements as first-class citizens you can immediately access inclusion-exclusion, De Morgan’s laws, and the duality between “at least one” and “none”.  

- Union probability via complements  
- Binomial tail bounds  
- Poisson paradigm calculations  
- Reliability block diagrams  
- Monte-Carlo variance reduction by conditioning on the rare event’s complement  

## 11. Self-check — five questions, no answers
1. A fair die is rolled. Compute P(the outcome is not a multiple of 3).  
2. In a deck of 52 cards, let A be “drawing a red ace”. What is P(A')?  
3. Two fair coins are tossed. Show that P(no tails) equals 1 minus P(at least one tail) without enumerating the sample space again.  
4. A continuous random variable X is uniform on [0,10]. If P(X ≤ 4) = 0.4, find P(X > 4) using only the complement rule.  
5. A student claims “A and A' are independent because they never overlap.” Identify the conceptual error and correct it with a concrete counter-example.