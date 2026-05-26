## 1. The one-sentence answer
**Mutually exclusive events cannot occur at the same time, so the probability of their union is exactly the sum of their separate probabilities.**

Two events A and B are mutually exclusive when their intersection is empty. This means the outcome that satisfies A automatically rules out B, and vice versa. In probability language, A ∩ B = ∅. Because the overlapping region has zero measure, the usual subtraction term in the addition rule disappears, leaving P(A ∪ B) = P(A) + P(B).

Aap can picture this as two completely separate regions on the sample space. No outcome sits in both regions, so adding the probabilities never double-counts anything. The rule holds only when exclusivity is verified first; otherwise the formula fails.

> [!NOTE]
> The single most important insight is that exclusivity is a property of the events themselves, not of the probabilities attached to them. Once you confirm A ∩ B = ∅, the addition rule becomes mechanical.

## 2. Why this matters — concrete and current
In quality-control systems at semiconductor fabs such as TSMC, a single wafer cannot be classified as both “defective due to particle contamination” and “defective due to mask misalignment” on the same inspection pass; the two failure modes are defined to be mutually exclusive, allowing engineers to add their probabilities directly when forecasting yield loss.

In aerospace telemetry, NASA’s Mars Perseverance rover records either a “thruster firing event” or a “wheel-motor stall event” within the same 10-millisecond window; mission software treats these as mutually exclusive so that the total probability of any critical anomaly is obtained by simple addition before triggering safe-mode.

In high-frequency trading engines at firms such as Jane Street, an order-book update is tagged either “price improvement” or “trade-through violation”; the mutually exclusive classification lets the risk engine compute the probability of regulatory breach by adding the two separate frequencies without overlap correction.

In medical diagnostic pipelines, a chest X-ray classifier at Google Health labels a scan as either “pneumonia present” or “pneumonia absent”; because these labels are defined to be exhaustive and mutually exclusive, the reported sensitivity and specificity combine directly into overall accuracy via the addition rule.

In particle-physics experiments at CERN, a collision event is reconstructed as either “Higgs boson decay to two photons” or “Higgs boson decay to four leptons”; the two decay channels are mutually exclusive, so physicists add their branching ratios to obtain the total observed Higgs signal strength.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sample space and outcomes | Defines the universe in which events live                 |
| Basic probability P(A)   | The quantities you will add                               |
| Set intersection         | The test that decides whether events are mutually exclusive |
| Union notation A ∪ B     | The event whose probability you ultimately compute        |

If any row above is unfamiliar, pause and review the corresponding earlier lesson before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visual separation of regions
Imagine the sample space drawn as a rectangle. Two events appear as circles that do not touch or overlap at all.  
Concrete example: rolling a fair six-sided die; let A = {2} and B = {5}. The circles sit at separate points and share no common outcome.  
Formal statement: A ∩ B = ∅.  
> [!WARNING]  
> If you sketch the circles overlapping even slightly, the addition rule you are about to derive will be invalid.

### Step 2 — Counting favourable outcomes without double-counting
Because no outcome belongs to both A and B, the total number of favourable outcomes for “A or B” is simply |A| + |B|.  
Example: in the die above, |A ∪ B| = 1 + 1 = 2.  
Formal: |A ∪ B| = |A| + |B| when A ∩ B = ∅.

### Step 3 — Converting counts to probabilities
Divide the count by the size of the sample space: P(A ∪ B) = (|A| + |B|)/N = P(A) + P(B).  
Example: P(A ∪ B) = 2/6 = 1/3, which equals 1/6 + 1/6.

### Step 4 — Replacing counting with measure
Replace the finite counting measure with the probability measure P. The same logic yields the general addition rule for any probability space.  
Formal statement: If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B).

### Step 5 — Textbook-grade statement
If events A and B satisfy A ∩ B = ∅, then  
$$P(A \cup B) = P(A) + P(B).$$  
This is the precise addition rule for mutually exclusive events.

## 5. Worked examples — har step show karo

**Example 1 — Single coin flip**  
*Given:* A fair coin is flipped once. Let A = heads, B = tails.  
*Find:* P(A ∪ B).  
Step 1: Verify A ∩ B = ∅ because a single flip cannot be both heads and tails.  
Step 2: P(A) = 1/2, P(B) = 1/2.  
Step 3: Apply rule → P(A ∪ B) = 1/2 + 1/2.  
**1**  
*Reflection:* The example is trivial yet confirms that exhaustive and mutually exclusive events cover the entire sample space.

**Example 2 — Two dice, disjoint face sets**  
*Given:* Two fair dice rolled; A = first die shows 1, B = first die shows 6.  
*Find:* P(A ∪ B).  
Step 1: A ∩ B = ∅ (one die cannot show both 1 and 6).  
Step 2: P(A) = 1/6, P(B) = 1/6.  
Step 3: P(A ∪ B) = 1/6 + 1/6 = 1/3.  
**1/3**  
*Reflection:* Even though two dice are involved, exclusivity is checked only on the first die’s faces.

**Example 3 — Card draw with suit restriction**  
*Given:* One card drawn from a standard deck. A = spade, B = heart.  
*Find:* P(A ∪ B).  
Step 1: A ∩ B = ∅ (a card has only one suit).  
Step 2: P(A) = 13/52, P(B) = 13/52.  
Step 3: P(A ∪ B) = 13/52 + 13/52 = 1/2.  
**1/2**  
*Reflection:* The calculation ignores clubs and diamonds because they lie outside A ∪ B.

**Example 4 — Mixed exhaustive and non-exhaustive case**  
*Given:* A die is rolled. A = even number {2,4,6}, B = number greater than 4 {5,6}.  
*Find:* P(A ∪ B) after checking exclusivity.  
Step 1: Intersection = {6} ≠ ∅, so events are not mutually exclusive.  
Step 2: Because exclusivity fails, the simple addition rule cannot be used; one must subtract the intersection.  
*Reflection:* This deliberately shows the boundary where the rule stops applying.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Adding probabilities without checking intersection | Students assume “different sounding” events are exclusive | Always write A ∩ B explicitly and verify it is empty |
| Confusing mutually exclusive with independent | Both concepts involve “no relationship”, yet they are distinct | Test independence with P(A ∩ B) = P(A)P(B); test exclusivity with P(A ∩ B) = 0 |
| Using the rule on continuous densities without care | Overlap can have measure zero yet events still intersect | Confirm the supports are disjoint intervals          |
| Forgetting that exhaustive events may still overlap | “One of them must happen” does not imply exclusivity | Exhaustiveness and exclusivity are separate checks   |
| Applying rule to more than two events without pairwise exclusivity | Triple overlap may still exist                | Verify every pairwise intersection is empty          |
| Treating “almost surely” disjoint events as exactly disjoint | Real-world events can have tiny overlap probability | Use the exact definition; reserve “almost surely” for measure-theoretic arguments |

## 7. The textbook-precise statement
Let (Ω, F, P) be a probability space. Events A, B ∈ F are said to be mutually exclusive if A ∩ B = ∅. Under this hypothesis the addition rule states  
$$P(A \cup B) = P(A) + P(B).$$  
The result extends immediately to any finite collection of pairwise disjoint events: if A_i ∩ A_j = ∅ for all i ≠ j, then  
$$P\Bigl(\bigcup_{i=1}^n A_i\Bigr) = \sum_{i=1}^n P(A_i).$$  
(See Sheldon Ross, *A First Course in Probability*, 10e, §2.3.)

## 8. Visual — diagram or schematic
```text
Sample space Ω (rectangle)
+---------------------------+
|                           |
|   A (circle)     B (circle)|
|  (no overlap)             |
|                           |
+---------------------------+
```
Label the left circle “A”, the right circle “B”, and the surrounding rectangle “Ω”. The gap between the circles indicates A ∩ B = ∅.

## 9. The memory technique
1. **The hook** — Picture two rival cricket teams that can never bat at the same moment on the same pitch; their innings are mutually exclusive, so total match probability is simply the sum.  
2. **What to overlearn** — The exact statement “A ∩ B = ∅ ⇒ P(A ∪ B) = P(A) + P(B)” and the definition of pairwise disjoint.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-draw the Venn diagram; if the circles touch nowhere, add the probabilities; if they touch anywhere, revert to the full inclusion-exclusion formula.

## 10. What this unlocks
Mastery of the mutually exclusive addition rule lets you move directly to the general inclusion-exclusion principle, the law of total probability for partitions, and the construction of probability mass functions for discrete random variables.  
- Next topic: inclusion-exclusion for non-exclusive events  
- Conditional probability on disjoint partitions  
- Derivation of the cumulative distribution function for discrete random variables

## 11. Self-check — five questions, no answers
1. Two events A and B satisfy P(A) = 0.3, P(B) = 0.4. If they are mutually exclusive, compute P(A ∪ B).  
2. A fair coin is flipped twice. Define A = first flip heads, B = second flip tails. Are A and B mutually exclusive?  
3. In a deck of 52 cards, let A = ace, B = spade. Compute P(A ∪ B) after checking exclusivity.  
4. Explain in one sentence why “A and B are independent” does not imply “A and B are mutually exclusive”.  
5. A continuous random variable X has support on [0,1] ∪ [2,3]. Let A = {X ≤ 0.5}, B = {X ≥ 2.5}. Are A and B mutually exclusive? Justify.