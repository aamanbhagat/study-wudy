## 1. The one-sentence answer
**Mutually exclusive events are events that cannot occur simultaneously, so the probability of their union equals the sum of their individual probabilities.**

Two events are mutually exclusive when their intersection is empty: nothing can belong to both. In everyday language this means “one or the other, but never both at once.” The addition rule therefore collapses to simple arithmetic because the overlap term vanishes.  

Consider rolling a fair six-sided die. The event “roll a 3” and the event “roll a 4” share no outcomes. Their probabilities add directly: 1/6 + 1/6 = 1/3. If the events overlapped, that shared region would be counted twice and would have to be subtracted once; mutual exclusivity removes the need for subtraction.  

The same principle scales to any finite collection of pairwise disjoint events. The probability of “at least one of them occurs” is exactly the sum of the separate probabilities.

> [!NOTE]
> The addition rule for mutually exclusive events is not an approximation; it is exact once the intersection is provably empty.

## 2. Why this matters — concrete and current
In semiconductor yield analysis, Intel treats each wafer defect type (particle, crystal slip, lithography overlay error) as mutually exclusive when the root-cause classification algorithm assigns every defect to exactly one category; the total defect probability is therefore the direct sum of the individual type probabilities, guiding process-control budgets.

NASA’s Mars 2020 entry-descent-landing fault tree models “parachute failure,” “radar altimeter lock loss,” and “thruster valve stuck closed” as mutually exclusive terminal states; mission-success probability is obtained by summing the probabilities of the complementary success paths.

In high-frequency trading, Citadel’s risk engine flags “latency-spike event” and “market-data-gap event” as mutually exclusive because both cannot be triggered by the same packet sequence; the firm’s intraday value-at-risk therefore adds the two loss distributions without an overlap correction.

In CRISPR guide-RNA design, off-target cleavage sites are partitioned into mutually exclusive bins by mismatch position; the aggregate off-target probability used by the Broad Institute’s GUIDE-seq pipeline is the sum across bins.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Outcome and sample space | Defines the universal set in which events live            |
| Probability of a single event | Supplies the numbers that will be added                   |
| Set intersection         | Identifies the overlap that must be empty                 |
| Set union                | Names the combined event whose probability we seek        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Events as sets of outcomes
Any event is simply a collection of possible results. On a fair coin, “heads” is the set {H}.  

Example: rolling a die, the event “even number” = {2,4,6}.  

Formally, an event \(A\) is a subset of the sample space \(\Omega\):  
\[
A \subseteq \Omega.
\]

> [!WARNING]
> Treating an event as a single number instead of a set hides the possibility that two events can share outcomes.

### Step 2 — Intersection captures simultaneous occurrence
The intersection \(A \cap B\) contains every outcome that belongs to both events.  

Example: “even” \(\cap\) “greater than 3” = {4,6}.  

If \(A \cap B = \emptyset\), the events share nothing.

### Step 3 — Mutual exclusivity defined
Two events are mutually exclusive (or disjoint) precisely when their intersection is empty:  
\[
A \cap B = \emptyset.
\]

### Step 4 — Probability measure on the union
The probability of the combined event \(A \cup B\) is given by the measure of the set union:  
\[
P(A \cup B) = P(A) + P(B) - P(A \cap B).
\]

### Step 5 — Overlap term vanishes
When \(A \cap B = \emptyset\), the subtracted term is zero, yielding the addition rule:  
\[
P(A \cup B) = P(A) + P(B).
\]

### Step 6 — Finite additivity for multiple disjoint events
The same logic extends inductively: if \(A_1, \dots, A_n\) are pairwise disjoint,  
\[
P\Bigl(\bigcup_{i=1}^n A_i\Bigr) = \sum_{i=1}^n P(A_i).
\]

## 5. Worked examples — every step shown

**Example 1 — Single roll of a fair die**  
*Given:* A fair six-sided die is rolled once. Let \(A =\) “roll a 1” and \(B =\) “roll a 2”.  
*Find:* \(P(A \cup B)\).  

- \(A \cap B = \emptyset\) because 1 and 2 are distinct faces.  
  *Why:* Distinct faces cannot appear together.  
- Therefore the addition rule applies:  
  \[
  P(A \cup B) = P(A) + P(B) = \frac{1}{6} + \frac{1}{6} = \frac{1}{3}.
  \]  
**Answer:** \(\dfrac{1}{3}\).  

*Reflection:* The example is trivial yet forces explicit verification that the intersection is empty.

**Example 2 — Drawing one card from a standard deck**  
*Given:* A card is drawn at random. Let \(A =\) “ace of spades” and \(B =\) “king of hearts”.  
*Find:* \(P(A \cup B)\).  

- Both events contain exactly one card; the cards differ, so \(A \cap B = \emptyset\).  
  *Why:* One draw yields one card.  
-  
  \[
  P(A \cup B) = \frac{1}{52} + \frac{1}{52} = \frac{1}{26}.
  \]  
**Answer:** \(\dfrac{1}{26}\).

*Reflection:* Demonstrates that mutual exclusivity follows from physical constraints of the experiment.

**Example 3 — Two independent coin flips**  
*Given:* Two fair coins are flipped. Let \(A =\) “first coin heads”, \(B =\) “second coin heads”.  
*Find:* \(P(A \cup B)\).  

- \(A \cap B\) is nonempty (HH is possible), so the events are *not* mutually exclusive.  
  *Why:* The problem statement does not claim exclusivity; we must check.  
- The addition rule cannot be applied directly; the general formula is required.  
**Answer:** Not applicable; events overlap.

*Reflection:* Shows the necessity of verifying the empty-intersection condition before invoking the rule.

**Example 4 — Three mutually exclusive weather states**  
*Given:* Tomorrow’s weather in a desert city is classified as “rain”, “snow”, or “clear”. Historical frequencies are 0.08, 0.01, 0.91.  
*Find:* Probability of precipitation (rain or snow).  

- Rain and snow cannot occur together in the classification scheme, and both are disjoint from clear.  
  *Why:* The scheme partitions the sample space.  
-  
  \[
  P(\text{precip}) = 0.08 + 0.01 = 0.09.
  \]  
**Answer:** \(0.09\).

*Reflection:* Extends the rule to three events and illustrates real data aggregation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Adding probabilities without checking disjointness | Habit from counting problems where overlap is ignored | Explicitly compute or argue \(A \cap B = \emptyset\) first |
| Treating “almost never together” as mutually exclusive | Everyday language blurs “rare” and “impossible” | Demand logical or physical impossibility of joint occurrence |
| Forgetting that the rule applies only to the union probability | Confusion with multiplication rule for independent events | Write the target probability as \(P(A \cup B)\) before applying any formula |
| Applying the rule to continuous densities without intervals being disjoint | Overlap can hide inside continuous supports | Verify that the intervals share no interior points |
| Double-counting when events are defined on different trials | Implicit assumption that trials are the same | Keep sample-space descriptions consistent across events |
| Using the rule for conditional probability statements | Misreading “given that” as exclusivity | Translate the wording into set notation before deciding |
| Assuming exhaustive events are automatically exclusive | Exhaustiveness concerns coverage, not overlap | Check both partition properties separately |

## 7. The textbook-precise statement
Let \((\Omega, \mathcal{F}, P)\) be a probability space. Events \(A, B \in \mathcal{F}\) are **mutually exclusive** if \(A \cap B = \emptyset\). In that case  
\[
P(A \cup B) = P(A) + P(B).
\]  
More generally, if \(\{A_i\}_{i\in I}\) is any finite or countably infinite collection of pairwise disjoint events, then  
\[
P\Bigl(\bigcup_{i\in I} A_i\Bigr) = \sum_{i\in I} P(A_i).
\]  
(Ross, *A First Course in Probability*, 10e, §2.5, Theorem 3.)

## 8. Visual — diagram or schematic
```text
Sample space Ω (rectangle)
+---------------------------+
|                           |
|   A          B            |
|  [===]      [===]         |   A and B are disjoint rectangles
|                           |
+---------------------------+
      P(A) + P(B) = P(A∪B)
```
The two shaded regions share no area; the total shaded measure is therefore the sum of the separate measures.

## 9. The memory technique
1. **The hook** — Picture two locked railroad switches that can never both be thrown at the same moment; trains on those tracks never collide, so total traffic probability is simply the sum of each track’s traffic.  
2. **What to overlearn** — The definition \(A \cap B = \emptyset\) together with the formula \(P(A \cup B) = P(A) + P(B)\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the general union formula by setting the intersection term to zero.

## 10. What this unlocks
Mastery of the addition rule for disjoint events supplies the foundation for constructing probability mass functions over partitions and for simplifying inclusion-exclusion expansions in later work.  

- Venn-diagram counting with overlap  
- Law of total probability via partitioning  
- Binomial and Poisson distributions (sums of disjoint indicator events)  
- Reliability block diagrams in engineering  
- First-step analysis in Markov chains

## 11. Self-check — five questions, no answers
1. A fair coin is flipped twice. Are “exactly one head” and “exactly two heads” mutually exclusive? Justify.  
2. Compute \(P(A \cup B)\) when \(P(A)=0.3\), \(P(B)=0.4\), and \(A \cap B = \emptyset\).  
3. In a 52-card deck, let \(A\) be “heart” and \(B\) be “ace”. Are \(A\) and \(B\) mutually exclusive? If not, compute \(P(A \cup B)\) correctly.  
4. Three events \(A\), \(B\), and \(C\) satisfy \(A \cap B = A \cap C = B \cap C = \emptyset\). Write the probability of their union.  
5. A weather model lists five mutually exclusive precipitation categories whose probabilities sum to 0.97. What does this imply about the remaining probability mass?