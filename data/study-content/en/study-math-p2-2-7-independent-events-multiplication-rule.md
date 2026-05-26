## 1. The one-sentence answer
**Independent events obey the multiplication rule: the probability that both occur equals the product of their separate probabilities.**

Two events are independent when the occurrence of one supplies no information about the other. In that case the joint outcome is formed simply by scaling the individual chances. This scaling follows directly from the definition of independence and produces the compact product formula. The rule extends without change to any finite collection of mutually independent events.

The distinction matters because most everyday events are not independent. Rain today changes the chance of rain tomorrow; drawing one card without replacement changes the chance for the next card. Only when that feedback loop is absent does multiplication become valid.

> [!NOTE]
> Independence is an assumption about the world, not a property of the numbers themselves; once the assumption holds, multiplication is forced.

## 2. Why this matters — concrete and current
In semiconductor yield analysis, Intel models the probability that a die passes both the electrical test and the thermal stress test as the product of the two pass rates when the failure mechanisms have been shown to be independent through controlled experiments.

In genome-wide association studies, the Broad Institute multiplies the minor-allele frequencies of unlinked SNPs to obtain the expected frequency of a multi-locus haplotype under the null hypothesis of no linkage disequilibrium.

Spacecraft fault-tree analysis at NASA multiplies the failure probabilities of redundant power buses once hardware qualification data confirm that a single cosmic-ray strike cannot affect both buses simultaneously.

Modern large-language-model training pipelines treat successive gradient-update batches as independent draws when the data-shuffling step has destroyed temporal correlation, allowing the multiplication rule to convert per-batch loss variances into an overall variance estimate.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sample space and events  | Supplies the universe in which probabilities are assigned |
| Definition of probability| Gives the numerical values that will be multiplied        |
| Intersection notation    | Provides the compact symbol \(A \cap B\) for “both occur” |

## 4. Building the idea — from intuition to formalism

### Step 1 — Events as sets
Any outcome we care about is represented by a set of possible results.  
Example: rolling a fair six-sided die, let \(A\) be the set of even numbers.  
Formal statement: \(A = \{2,4,6\}\).  
> [!WARNING]
> Treating the label “even” as already carrying a probability invites later confusion between the set and its measure.

### Step 2 — Probability as a number attached to each set
Each event receives a number between 0 and 1 that obeys the Kolmogorov axioms.  
Example: \(P(A) = 3/6 = 1/2\).  
Formal statement: \(P: \mathcal{F} \to [0,1]\).  
> [!WARNING]
> Writing \(P(\text{even}) = 3\) instead of \(1/2\) breaks the normalization axiom.

### Step 3 — Joint event as intersection
The event that both \(A\) and \(B\) occur is the intersection \(A \cap B\).  
Example: let \(B\) be “number greater than 3”; then \(A \cap B = \{4,6\}\).  
Formal statement: \(P(A \cap B)\) is the probability of the joint event.  
> [!WARNING]
> Using the word “and” without writing the intersection symbol hides whether dependence will later matter.

### Step 4 — Dependence versus independence
Two events are dependent when \(P(A \cap B) \neq P(A)P(B)\).  
Independence is the special case of equality.  
Example: on separate dice, the events “first die even” and “second die > 3” satisfy equality.  
Formal statement: \(A\) and \(B\) are independent when \(P(A \cap B) = P(A)P(B)\).  
> [!WARNING]
> Checking numerical equality after computing the joint probability begs the question; independence must be justified by the physical or experimental setup.

### Step 5 — Multiplication rule follows at once
Substitute the definition into the joint probability.  
Formal statement:  
$$P(A \cap B) = P(A) P(B)$$  
when \(A\) and \(B\) are independent.  
> [!WARNING]
> The formula is not an extra axiom; it is the definition rewritten.

### Step 6 — Extension to three or more events
Mutual independence requires every sub-collection to factor.  
Formal statement:  
$$P(A \cap B \cap C) = P(A) P(B) P(C)$$  
when the triple is mutually independent.  
> [!WARNING]
> Pairwise independence does not imply mutual independence; a classic counter-example uses three events on a four-point space.

## 5. Worked examples — every step shown

**Example 1 — Two coin flips**  
*Given:* A fair coin is flipped twice; flips are physically separate.  
*Find:* Probability both land heads.  
Step 1: Define \(A =\) first flip heads, \(P(A) = 1/2\).  
*Why* — symmetry of fair coin.  
Step 2: Define \(B =\) second flip heads, \(P(B) = 1/2\).  
*Why* — same symmetry.  
Step 3: Separate physical mechanisms imply independence.  
*Why* — no causal link between flips.  
Step 4: Apply multiplication rule.  
$$P(A \cap B) = (1/2)(1/2) = 1/4$$  
**Final answer**  
**\(1/4\)**  

*Reflection*  
The example is easy because the independence claim is obvious; the same arithmetic appears in far harder settings once independence is verified.

**Example 2 — Independent quality-control tests**  
*Given:* A circuit passes test A with probability 0.95 and test B with probability 0.90; tests are independent.  
*Find:* Probability it passes both.  
Step 1: Write \(P(A) = 0.95\), \(P(B) = 0.90\).  
*Why* — given success rates.  
Step 2: Independence justified by separate test hardware.  
*Why* — documented in qualification report.  
Step 3: Multiply.  
$$P(A \cap B) = 0.95 \times 0.90 = 0.855$$  
**Final answer**  
**0.855**  

*Reflection*  
Decimals replace fractions; the rule itself is unchanged.

**Example 3 — Three independent sensors**  
*Given:* Three identical sensors each detect a signal with probability 0.8; detections are mutually independent.  
*Find:* Probability all three detect.  
Step 1: \(P(A_i) = 0.8\) for each sensor \(i\).  
*Why* — identical specification.  
Step 2: Mutual independence stated.  
*Why* — sensors powered by separate batteries.  
Step 3: Multiply three factors.  
$$P(A_1 \cap A_2 \cap A_3) = 0.8^3 = 0.512$$  
**Final answer**  
**0.512**  

*Reflection*  
The exponent notation appears only after mutual independence is confirmed.

**Example 4 — Mixed success and failure**  
*Given:* Probability a rocket launch succeeds is 0.92; probability a telemetry link stays up is 0.85; events independent.  
*Find:* Probability of successful launch and lost telemetry.  
Step 1: Let \(S =\) launch success, \(P(S) = 0.92\).  
*Why* — historical data.  
Step 2: Let \(L =\) link lost, \(P(L) = 0.15\).  
*Why* — complement of 0.85.  
Step 3: Independence allows product.  
$$P(S \cap L) = 0.92 \times 0.15 = 0.138$$  
**Final answer**  
**0.138**  

*Reflection*  
Complements are handled before multiplication; independence still supplies the product.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming “different” implies independent | Everyday language uses “independent” loosely | Demand an explicit physical or statistical justification |
| Multiplying when sampling without replacement | Forgetting the dependence created by finite population | Check whether the first outcome changes the second probability |
| Treating pairwise independence as mutual | The distinction is invisible in two-event problems | Verify the equality for every sub-collection         |
| Using the rule on conditional probabilities | Confusing \(P(A \cap B)\) with \(P(A \mid B)\) | Write the conditioning bar explicitly before deciding |
| Forgetting that zero-probability events are independent of everything | Edge case feels artificial                  | Apply the definition directly: \(0 = P(A) \cdot 0\)  |
| Applying the rule to continuous densities without care | Measure-zero sets behave differently        | Integrate the joint density only after confirming independence |
| Confusing “independent trials” with “independent events” | Trial language hides the precise events     | Name the concrete events before writing the product  |

## 7. The textbook-precise statement
Let \((\Omega, \mathcal{F}, P)\) be a probability space. Events \(A, B \in \mathcal{F}\) are independent if  
$$P(A \cap B) = P(A) P(B).$$  
A finite collection \(\{A_i\}_{i=1}^n\) is mutually independent if for every sub-collection the probability of the intersection equals the product of the probabilities.  
Reference: Blitzstein & Hwang, *Introduction to Probability*, 2e, §2.5.

## 8. Visual — diagram or schematic
```text
          First event A
          P(A) = p
               |
               v
     -----------------
    |                 |
    v                 v
Second event B     Second event B^c
P(B) = q           P(B^c) = 1-q
    |                 |
    v                 v
A∩B : p*q        A∩B^c : p*(1-q)
```
The diagram shows two separate branches whose probabilities multiply only after the independence assumption is stated.

## 9. The memory technique
1. **The hook** — Picture two perfectly isolated rooms; whatever happens in one room never leaks into the other. The only way the joint probability can be obtained is by multiplying the two isolated chances.
2. **What to overlearn** — The equality \(P(A \cap B) = P(A)P(B)\) and the phrase “mutual independence for three or more.”
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the definition of independence and substitute into the joint-probability expression.

## 10. What this unlocks
The multiplication rule is the gateway to all calculations that treat repeated trials as separate.  
- Binomial and multinomial distributions rest on it.  
- Poisson processes arise as limits of independent increments.  
- Conditional probability and Bayes’ theorem become necessary precisely when independence fails.  
- Modern probabilistic graphical models encode independence assumptions so that joint distributions factor into products.

## 11. Self-check — five questions, no answers
1. Two events each have probability 1/2. Their joint probability is 1/4. Are they necessarily independent?  
2. A die is rolled twice. Let \(A\) be “first roll = 6” and \(B\) be “second roll = 6.” Compute \(P(A \cap B)\) under independence.  
3. In a deck of 52 cards, let \(A\) be “first card ace of spades” and \(B\) be “second card ace of spades.” Are \(A\) and \(B\) independent when the first card is replaced? When it is not?  
4. Three events satisfy \(P(A_i) = 1/2\) for each \(i\) and every pairwise product equals the joint probability of that pair. Must the triple product also hold?  
5. An engineer multiplies three success probabilities and obtains 0.729. Later discovers that the middle component shares a power supply with the first. What must be recomputed?