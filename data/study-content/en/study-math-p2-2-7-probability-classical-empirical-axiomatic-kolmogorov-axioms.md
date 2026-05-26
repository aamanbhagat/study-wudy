## 1. The one-sentence answer
**Probability is a number between 0 and 1 assigned to events according to three axioms that make counting equally likely outcomes and observing long-run frequencies special cases of the same consistent theory.**

Classical probability counts favorable outcomes when every outcome in a finite list is equally likely. This works for coin tosses and dice but collapses when outcomes are not equiprobable or when the list is infinite. Empirical probability replaces counting with observed relative frequency after many trials; it matches intuition yet offers no guarantee that the observed ratio will converge or obey logical rules such as “the probability of A or B equals the sum minus the overlap.” Kolmogorov’s axioms remove both restrictions by declaring that probability is a function P defined on a collection of subsets (events) of a sample space that satisfies non-negativity, normalization on the whole space, and countable additivity for disjoint events. From these three statements alone every standard theorem follows.

> [!NOTE]
> The decisive insight is that the same three rules simultaneously justify counting, justify averaging over data, and prevent contradictions when events are combined.

## 2. Why this matters — concrete and current
Modern weather-forecast ensembles run thousands of perturbed simulations of the atmosphere; the fraction of runs predicting rain above a threshold is converted into a probability only after the Kolmogorov axioms guarantee that the reported 30 % chance is coherent across overlapping regions and successive forecast days.

In semiconductor yield analysis, the probability that a chip passes all tests is computed by treating each defect mechanism as an event; the axioms ensure that the calculated yield never exceeds 1 even when thousands of overlapping failure modes are considered, allowing TSMC and Intel to set accurate production targets.

Large language models estimate next-token probabilities by maximum-likelihood training on token sequences; the training objective is well-defined only because the resulting numbers are forced to obey the axioms, preventing the model from assigning negative probabilities or probabilities that fail to sum to 1 over the vocabulary.

Gravitational-wave observatories such as LIGO report detection significance as a p-value that is later converted into a probability of astrophysical origin; the conversion step relies on the axioms to combine background rates from multiple detectors without double-counting correlated noise.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Set notation and subsets | Events are subsets; unions and intersections appear in the axioms |
| Counting (permutations, combinations) | Classical probability reduces to counting equally likely outcomes |
| Limits of sequences      | Empirical probability is defined via the limit of relative frequencies |
| Function notation        | Probability is a function P that maps events to numbers   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Equally likely outcomes
When every member of a finite list can occur with the same chance, probability reduces to a ratio of counts.  
Example: a fair six-sided die has six faces; the chance of rolling a 4 is therefore 1 out of 6.  
Formally, if the sample space \(\Omega\) contains \(n\) equally likely outcomes and event \(A\) contains \(k\) of them, then
\[
P(A)=\frac{k}{n}.
\]
> [!WARNING] Treating outcomes as equally likely when they are not (for example, treating “rain” and “no rain” as equally likely in a desert) produces answers that contradict observed frequencies.

### Step 2 — Relative frequency in repeated trials
When outcomes are not known to be equiprobable, repeat the experiment many times and record the proportion of successes.  
Example: a possibly biased coin is tossed 1000 times and lands heads 470 times; the empirical probability is therefore 0.47.  
This ratio is written
\[
P(A)\approx\frac{\text{number of times }A\text{ occurred}}{\text{total trials}}.
\]

### Step 3 — The need for a unified foundation
Both counting and frequency counting must obey the same arithmetic rules when events are combined. The statement “probability of A or B” must equal the sum of the separate probabilities minus their overlap, whether the numbers came from counting or from data. This requirement forces the introduction of an abstract function P obeying explicit rules.

### Step 4 — Sample space and event collection
Fix a set \(\Omega\) whose elements are the possible outcomes. An event is any subset of \(\Omega\) to which probability will be assigned. The collection of all such subsets must be closed under complements and countable unions; such a collection is called a \(\sigma\)-algebra.

### Step 5 — Kolmogorov’s three axioms
Kolmogorov’s axioms state that a probability measure P satisfies:
1. Non-negativity: \(P(A)\ge 0\) for every event \(A\).
2. Normalization: \(P(\Omega)=1\).
3. Countable additivity: if \(A_i\) are pairwise disjoint, then \(P(\bigcup_{i=1}^\infty A_i)=\sum_{i=1}^\infty P(A_i)\).

### Step 6 — Deriving the familiar rules
From the three axioms one proves \(P(\emptyset)=0\), \(P(A^c)=1-P(A)\), and the inclusion-exclusion formula for two events
\[
P(A\cup B)=P(A)+P(B)-P(A\cap B).
\]
All later theorems rest on these derivations.

## 5. Worked examples — every step shown

**Example 1 — Fair die**  
*Given:* A fair six-sided die is rolled once.  
*Find:* Probability of rolling an even number.  
Step 1: \(\Omega=\{1,2,3,4,5,6\}\).  
*Why:* The experiment’s possible results are listed exhaustively.  
Step 2: Even numbers form the set \(A=\{2,4,6\}\).  
*Why:* Definition of the event.  
Step 3: \(P(A)=3/6=1/2\).  
*Why:* Classical counting under equal likelihood.  
**1/2**

*Reflection:* The example is simple because equiprobability is given; the same number can also be obtained empirically by rolling many dice.

**Example 2 — Two events on a die**  
*Given:* Same die.  
*Find:* Probability of rolling a number divisible by 2 or by 3.  
Step 1: \(A=\{2,4,6\}\), \(B=\{3,6\}\).  
*Why:* List outcomes satisfying each condition.  
Step 2: \(A\cap B=\{6\}\).  
*Why:* Intersection isolates the overlap.  
Step 3: \(P(A\cup B)=3/6+2/6-1/6=4/6=2/3\).  
*Why:* Apply inclusion-exclusion derived from the axioms.  
**2/3**

*Reflection:* Overlap must be subtracted once; forgetting this produces a probability greater than 1, violating the axioms.

**Example 3 — Empirical coin**  
*Given:* 500 tosses of a coin yield 320 heads.  
*Find:* Empirical probability of heads on the next toss.  
Step 1: Count heads = 320, total tosses = 500.  
*Why:* Direct recording of frequency.  
Step 2: Ratio = 320/500 = 0.64.  
*Why:* Definition of relative frequency.  
**0.64**

*Reflection:* The number is only an estimate; the axioms do not guarantee convergence after any finite number of trials.

**Example 4 — Using additivity**  
*Given:* Events \(A\) and \(B\) are disjoint, \(P(A)=0.3\), \(P(B)=0.4\).  
*Find:* \(P(A\cup B)\).  
Step 1: Because \(A\cap B=\emptyset\), axiom 3 gives \(P(A\cup B)=P(A)+P(B)\).  
*Why:* Countable additivity for two sets.  
Step 2: Sum = 0.7.  
*Why:* Arithmetic.  
**0.7**

*Reflection:* The result cannot exceed 1; if it did, the axioms would be violated.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming all outcomes are equiprobable | Habit from dice and coins                   | Check whether symmetry or data justifies equal likelihood |
| Adding probabilities of overlapping events | Forgetting to subtract the intersection     | Always draw the Venn diagram first           |
| Treating empirical frequency as exact probability | Confusing finite sample with the limit      | Keep the approximation symbol until the law of large numbers is invoked |
| Assigning probability > 1 to a union | Naïve addition without checking axioms      | Verify \(P(A\cup B)\le 1\) after every calculation |
| Using an infinite sample space without a \(\sigma\)-algebra | Ignoring that not every subset need be measurable | Restrict attention to the Borel or Lebesgue sets |
| Confusing \(P(A^c)\) with \(1-P(A)\) only for finite spaces | Belief that axioms apply only to finite cases | Note that complement rule follows from axioms 2 and 3 for any space |
| Reporting a probability of 0 or 1 for events that can still occur | Misreading “almost surely” language         | Distinguish impossibility (\(P=0\) and empty) from probability-zero events |

## 7. The textbook-precise statement
Let \(\Omega\) be a set and let \(\mathcal{F}\) be a \(\sigma\)-algebra of subsets of \(\Omega\). A probability measure is a function \(P:\mathcal{F}\to[0,1]\) satisfying  
(1) \(P(A)\ge 0\) for all \(A\in\mathcal{F}\),  
(2) \(P(\Omega)=1\),  
(3) if \(\{A_n\}_{n=1}^\infty\subset\mathcal{F}\) are pairwise disjoint, then \(P(\bigcup A_n)=\sum P(A_n)\).  

(Ross, *A First Course in Probability*, 10e, §2.2, Kolmogorov axioms.)

## 8. Visual — diagram or schematic
```text
          Ω (sample space)
   ┌──────────────────────────────┐
   │          A                   │
   │   ┌───────────┐              │
   │   │     A∩B   │     B        │
   │   └───────────┘              │
   │                              │
   └──────────────────────────────┘
P(A∪B) = P(A) + P(B) − P(A∩B)
```
The rectangle represents \(\Omega\), the two circles represent events \(A\) and \(B\), and their lens-shaped overlap is the intersection whose probability must be subtracted once.

## 9. The memory technique
1. **The hook** — Picture three traffic lights that must all be green before any probability statement is allowed: non-negativity, total certainty on the whole space, and “no double-counting on disjoint roads.”
2. **What to overlearn** — The three axioms verbatim and the two-event inclusion-exclusion formula.
3. **Spaced-repetition schedule** — Review the axioms after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive \(P(A^c)=1-P(A)\) directly from axioms 2 and 3 by writing \(\Omega=A\cup A^c\) and applying additivity.

## 10. What this unlocks
Kolmogorov’s axioms supply the common language for random variables, expectation, conditional probability, and all limit theorems.  

- Construction of random variables as measurable functions on \((\Omega,\mathcal{F},P)\).  
- Definition of independence via \(P(A\cap B)=P(A)P(B)\).  
- Markov chains and stochastic processes whose transition probabilities must satisfy the axioms at every step.  
- Modern statistical inference that converts likelihoods into coherent posterior probabilities.

## 11. Self-check — five questions, no answers
1. A fair coin is tossed twice. Compute the probability that at least one head appears, first by enumeration and then by the complement rule; verify both answers agree.  
2. In 200 independent trials an event occurs 28 times. Give the empirical probability and state the precise sense in which this number approximates a Kolmogorov probability.  
3. Events \(A\) and \(B\) satisfy \(P(A)=0.6\), \(P(B)=0.5\), and \(P(A\cap B)=0.2\). Compute \(P(A\cup B)\) and prove the result cannot exceed 1 using only the axioms.  
4. Explain why the collection of events must be closed under countable unions rather than merely finite unions.  
5. A sample space contains a countably infinite collection of disjoint events each having probability \(1/2^n\) for \(n=1,2,3,\dots\). Show that their union has probability 1.