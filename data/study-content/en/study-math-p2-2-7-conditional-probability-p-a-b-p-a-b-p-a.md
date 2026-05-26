## 1. The one-sentence answer
**Conditional probability measures the probability of event A once the sample space has been restricted to event B.**  

Start with any probability space containing two events A and B. The ordinary probability P(A) counts outcomes favourable to A across the entire space. When B is known to have occurred, every outcome outside B is removed; only the portion of A that lies inside B remains relevant. The measure of that remaining portion, normalised by the measure of B itself, is written P(A|B).  

The construction uses the intersection A ∩ B because that set contains precisely the outcomes that satisfy both events. Dividing its probability by P(B) rescales the restricted space so that its total probability equals 1.  

> [!NOTE]
> The single most important insight is that conditioning never changes the underlying outcomes; it only changes which outcomes are still considered possible.

## 2. Why this matters — concrete and current
In aerospace navigation, the probability that a GPS satellite signal is valid given that the receiver reports a dilution-of-precision value below 2 is computed daily by systems such as WAAS; the conditional figure directly determines whether an aircraft may continue a precision approach.  

In semiconductor yield analysis, TSMC conditions the probability of a latent defect in a 3 nm chip on the observed failure rate of ring-oscillator test structures; the resulting conditional probability feeds real-time process-control adjustments on the fabrication line.  

In modern machine-learning pipelines, the probability that a transformer model will hallucinate given that its attention entropy exceeds a calibrated threshold is estimated on large validation sets; this conditional drives safety filters at inference time in production systems at OpenAI and Anthropic.  

In fundamental physics, the ATLAS collaboration at CERN reports the probability of observing a Higgs-boson candidate in a diphoton final state conditioned on the invariant-mass window 120–130 GeV; every published cross-section limit rests on this conditional construction.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sample space and events  | Supplies the universe in which A and B are defined        |
| Kolmogorov axioms        | Guarantees that probabilities are non-negative and sum to 1, allowing valid rescaling |
| Set intersection         | Identifies the outcomes common to both A and B            |
| Definition of P(E)       | Provides the numerical values that enter the ratio        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Restricting the universe
When B occurs, outcomes outside B are eliminated. The new universe is exactly the set B.  
Concrete example: roll a fair six-sided die; let B = {even} = {2,4,6}. After learning the roll is even, only three faces remain possible.  
Formal statement: the restricted sample space is the set B itself.  
> [!WARNING]
> Treating the original six faces as still equally likely after restriction produces an incorrect uniform distribution over an event that no longer has measure 1.

### Step 2 — Measuring the favourable outcomes inside the restriction
Only the outcomes that also belong to A are still favourable. These outcomes form the intersection A ∩ B.  
Concrete example: let A = {multiple of 3}. Then A ∩ B = {6}.  
Formal statement: favourable set = A ∩ B.  
> [!WARNING]
> Using A instead of A ∩ B counts outcomes that lie outside the restricted space and therefore never occurred.

### Step 3 — Normalising the restricted measure
The probability of the intersection must be divided by the probability of the entire restricted space so that the conditional probabilities again sum to 1.  
Formal statement:  
$$P(A|B)=\frac{P(A\cap B)}{P(B)}$$  
> [!WARNING]
> Omitting the denominator leaves a quantity that is not a probability and can exceed 1.

### Step 4 — Verifying the axioms on the new space
The function Q(E) ≔ P(E ∩ B)/P(B) satisfies Q(∅)=0, Q(B)=1, and countable additivity on subsets of B. Hence Q is a genuine probability measure.  
> [!WARNING]
> Forgetting to check Q(B)=1 leads to later inconsistencies when further conditioning is applied.

### Step 5 — Arriving at the textbook definition
The construction above is exactly the definition of conditional probability. All subsequent theorems (chain rule, Bayes, independence) follow directly from this ratio.

## 5. Worked examples — every step shown

**Example 1 — Fair die**  
*Given:* A fair six-sided die is rolled; A = {multiple of 3}, B = {even}.  
*Find:* P(A|B).  

P(A ∩ B) = P({6}) = 1/6  
*Why:* Only outcome 6 lies in both sets.  

P(B) = P({2,4,6}) = 3/6 = 1/2  
*Why:* Three equally likely even faces out of six.  

$$P(A|B)=\frac{1/6}{1/2}=\frac13$$  
**Answer: 1/3**  

*Reflection:* The example is simple because the uniform measure makes counting sufficient; the same ratio applies when probabilities are unequal.

**Example 2 — Two cards**  
*Given:* A standard deck of 52 cards; A = {ace}, B = {spade}.  
*Find:* P(A|B).  

P(A ∩ B) = P(ace of spades) = 1/52  
*Why:* Intersection contains exactly one card.  

P(B) = 13/52 = 1/4  
*Why:* Thirteen spades.  

$$P(A|B)=\frac{1/52}{13/52}=1/13$$  
**Answer: 1/13**  

*Reflection:* The calculation shows that conditioning on suit reduces the conditional probability of drawing an ace to the probability within the spade suit alone.

**Example 3 — Medical test**  
*Given:* Disease prevalence P(D) = 0.01, test sensitivity P(+|D) = 0.95, false-positive rate P(+|¬D) = 0.05. Let A = {positive test}, B = {has disease}.  
*Find:* P(B|A).  

First compute the joint and marginal:  
P(A ∩ B) = P(+ ∩ D) = 0.95 × 0.01 = 0.0095  
P(A) = P(+ ∩ D) + P(+ ∩ ¬D) = 0.0095 + 0.05 × 0.99 = 0.059  
*Why:* Law of total probability partitions on disease status.  

$$P(B|A)=\frac{0.0095}{0.059}\approx0.161$$  
**Answer: ≈ 0.161**  

*Reflection:* The low positive predictive value despite high sensitivity illustrates how base rate and false-positive rate interact through the conditional definition.

**Example 4 — Three events**  
*Given:* Three independent fair coin flips; A = {exactly two heads}, B = {first flip heads}.  
*Find:* P(A|B).  

P(A ∩ B) = P(first H and exactly one more H in the remaining two flips) = (1/2) × C(2,1) × (1/2)^2 = 2/8 = 1/4  
P(B) = 1/2  
*Why:* Intersection fixes first flip and counts exactly one head among the last two.  

$$P(A|B)=\frac{1/4}{1/2}=1/2$$  
**Answer: 1/2**  

*Reflection:* Independence of flips simplifies counting yet the conditional ratio remains indispensable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Swapping A and B                  | Linguistic habit of reading “given” backwards | Always write the conditioning event after the bar   |
| Using P(A) instead of P(B)        | Forgetting which set restricts the space    | Explicitly identify the restricted sample space first |
| Treating P(A|B) as P(A ∩ B)       | Omitting the required normalisation         | Verify the result sums to 1 over partitions of B    |
| Assuming independence without check | Over-generalising from simple examples      | Test whether P(A ∩ B) equals P(A)P(B) before simplifying |
| Dividing by zero when P(B)=0      | Overlooking impossible conditioning events  | State P(B)>0 as an explicit hypothesis              |
| Counting outcomes after restriction without re-weighting | Uniform intuition persists too long         | Convert counts to probabilities before dividing     |
| Confusing conditional with joint  | Notation P(A,B) looks similar               | Keep the vertical bar distinct in every expression  |

## 7. The textbook-precise statement
Let (Ω, F, P) be a probability space and let A, B ∈ F with P(B) > 0. The conditional probability of A given B is the number  
$$P(A|B)=\frac{P(A\cap B)}{P(B)}.$$  
This definition appears in Sheldon Ross, *A First Course in Probability*, 10th ed., §3.1.

## 8. Visual — diagram or schematic
```text
          Ω
   ┌──────────────────────┐
   │                      │
   │   A                  │
   │  ┌───────┐           │
   │  │ A∩B   │           │
   │  │       │           │
   │  └───────┘           │
   │       B              │
   │  ┌────────────────┐  │
   │  │                │  │
   │  └────────────────┘  │
   └──────────────────────┘
```
Labelled regions: outer rectangle = Ω, large lower oval = B, small upper-left oval = A, shaded lens = A ∩ B. All probability mass outside B is discarded when conditioning on B; only the shaded lens, renormalised by the measure of the lower oval, survives.

## 9. The memory technique

1. **The hook** — Picture B as a spotlight that illuminates only part of the room; A given B is the fraction of the spotlight that also covers A.  
2. **What to overlearn** — The ratio definition itself and the requirement P(B) > 0.  
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by restricting the sample space to B, identifying favourable outcomes as A ∩ B, and normalising by P(B).

## 10. What this unlocks
Conditional probability is the direct gateway to Bayes’ theorem, the law of total probability, and the definition of independence.  

- Bayes’ theorem rewrites the same ratio to invert the order of conditioning.  
- The chain rule decomposes joint probabilities into successive conditional factors.  
- Independence is precisely the statement that P(A|B) = P(A).  
- Markov chains and martingales are built by iterated conditioning on successive sigma-algebras.

## 11. Self-check — five questions, no answers
1. A fair coin is flipped twice. Compute P(second flip heads | exactly one head).  
2. In a group of 100 people, 40 like coffee, 30 like tea, and 10 like both. What is the probability that a randomly chosen tea-drinker also likes coffee?  
3. Show that P(A|B) + P(A^c|B) = 1 whenever P(B) > 0.  
4. Give a concrete numerical example in which P(A|B) > P(A) and explain why the inequality is possible.  
5. A student claims that if A ⊂ B then P(A|B) = P(A). Decide whether the claim is always true and justify your answer with a counter-example or proof.