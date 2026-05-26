## 1. The one-sentence answer
**Probability assigns to each event the fraction of equally likely outcomes that belong to it.**

An experiment produces one outcome from a fixed collection of possibilities. That complete collection is called the sample space. An event is any subset of the sample space that we choose to track. When every outcome is equally likely, the probability of an event is obtained by dividing the number of outcomes inside the event by the total number of outcomes in the sample space.

This ratio is always a number between zero and one. It equals zero only when the event contains no outcomes at all, and it equals one only when the event contains every possible outcome.

> [!NOTE]
> The single decisive insight is that probability is not a property of the physical world itself; it is a ratio that appears once we have listed every possible result and declared them equally likely.

## 2. Why this matters — concrete and current
SpaceX uses the same counting argument when it models the probability that a Falcon 9 booster lands inside the designated recovery zone: the sample space consists of all feasible trajectories consistent with sensor noise, and the favourable set is the subset that lands within the barge perimeter.

In semiconductor manufacturing, TSMC estimates the probability that a die passes final test by treating every possible combination of process variations as an equally likely point in a high-dimensional sample space; the fraction that satisfies all electrical specifications determines expected yield.

Modern large-language-model training runs rely on Monte-Carlo estimates of token-prediction error; each forward pass draws an outcome from the model’s output distribution, and the empirical fraction of correct tokens is precisely the ratio of favourable samples to total samples.

Epidemiologists at the CDC compute the probability that a sequenced SARS-CoV-2 genome belongs to a designated variant of concern by enumerating all observed lineages (the sample space) and counting how many fall inside the variant’s defining mutation set.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Set                  | Sample spaces and events are sets; subset and cardinality operations are required. |
| Counting (finite)    | The formula reduces to counting elements of two sets.     |
| Fraction             | The probability value is literally a ratio of two integers. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An experiment and its possible results
Any repeatable procedure that ends with exactly one result is an experiment. The result itself is an outcome.  
Concrete example: toss a fair coin once. The two possible results are “heads” and “tails.”  
Formally, an experiment is a well-defined procedure together with its set of conceivable results.

> [!WARNING]
> If the list of conceivable results is left incomplete, every later ratio will be wrong.

### Step 2 — The sample space
Collect every possible outcome into one set; call that set the sample space and denote it \(\Omega\).  
For the coin toss, \(\Omega = \{\text{H}, \text{T}\}\).  
\[
\Omega = \{\omega_1, \omega_2, \dots, \omega_n\}
\]
where each \(\omega_i\) is a single, indivisible outcome.

> [!WARNING]
> Treating two physically distinct results as the same element of \(\Omega\) collapses the denominator and distorts every probability that follows.

### Step 3 — Events as subsets
An event is any subset \(E \subseteq \Omega\) that groups the outcomes we care about.  
For the coin, the event “lands heads” is the singleton \(E = \{\text{H}\}\).  
\[
E \subseteq \Omega
\]

> [!WARNING]
> Students sometimes treat an event as a single outcome rather than a set; this prevents correct use of set operations later.

### Step 4 — Equally likely outcomes
Assume each element of \(\Omega\) occurs with the same chance. This modelling choice must be justified by symmetry or by physical construction (fair coin, unbiased die, etc.).

> [!WARNING]
> Applying the ratio formula when outcomes are not equiprobable produces systematically incorrect values.

### Step 5 — Counting favourable outcomes
Let \(|E|\) be the number of outcomes inside \(E\) and let \(|\Omega|\) be the total number of outcomes. Both are ordinary integers obtained by enumeration.

### Step 6 — The probability definition
Under the equiprobable assumption the probability of \(E\) is the ratio
\[
P(E) = \frac{|E|}{|\Omega|}.
\]
This number lies in \([0,1]\) and equals 1 precisely when \(E = \Omega\).

### Step 7 — Immediate consequences
Because \(E\) is a subset, \(0 \le |E| \le |\Omega|\), hence \(0 \le P(E) \le 1\). The empty event \(\emptyset\) receives probability 0; the certain event \(\Omega\) receives probability 1.

## 5. Worked examples — every step shown

**Example 1 — Single fair coin**  
*Given:* One fair coin is tossed.  
*Find:* Probability it shows heads.  
Step 1: \(\Omega = \{\text{H}, \text{T}\}\), \(|\Omega| = 2\).  
*Why:* Both faces are physically possible and constructed to be symmetric.  
Step 2: Event \(E = \{\text{H}\}\), \(|E| = 1\).  
*Why:* Only one outcome satisfies the description “heads.”  
Step 3: \(P(E) = 1/2\).  
**Answer:** \(\frac12\)

*Reflection:* The example is trivial yet forces explicit construction of \(\Omega\) and \(E\); the same discipline scales to harder problems.

**Example 2 — Fair six-sided die**  
*Given:* A fair die is rolled once.  
*Find:* Probability the face is even.  
Step 1: \(\Omega = \{1,2,3,4,5,6\}\), \(|\Omega| = 6\).  
*Why:* Each integer face is a distinct, equally likely outcome.  
Step 2: \(E = \{2,4,6\}\), \(|E| = 3\).  
*Why:* The predicate “even” selects exactly these three elements.  
Step 3: \(P(E) = 3/6 = 1/2\).  
**Answer:** \(\frac12\)

*Reflection:* The ratio simplifies, but one must still count before cancelling.

**Example 3 — Two fair coins**  
*Given:* Two distinguishable fair coins are tossed.  
*Find:* Probability both show the same face.  
Step 1: \(\Omega = \{\text{HH}, \text{HT}, \text{TH}, \text{TT}\}\), \(|\Omega| = 4\).  
*Why:* Each coin contributes two possibilities, and order matters because coins are labelled.  
Step 2: \(E = \{\text{HH}, \text{TT}\}\), \(|E| = 2\).  
*Why:* Only these two outcomes satisfy “both faces identical.”  
Step 3: \(P(E) = 2/4 = 1/2\).  
**Answer:** \(\frac12\)

*Reflection:* The sample space grows exponentially; systematic enumeration prevents omission.

**Example 4 — Two dice, sum equals 7**  
*Given:* Two fair six-sided dice are rolled.  
*Find:* Probability their faces sum to 7.  
Step 1: \(\Omega\) contains 36 ordered pairs \((i,j)\) with \(1\le i,j\le 6\).  
*Why:* Each die is independent and equiprobable.  
Step 2: Favourable pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Thus \(|E| = 6\).  
*Why:* Direct enumeration of pairs whose components add to 7.  
Step 3: \(P(E) = 6/36 = 1/6\).  
**Answer:** \(\frac16\)

*Reflection:* The counting step is now non-trivial; the same listing technique extends to larger discrete spaces.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting that order matters     | Treating unordered collections as outcomes  | Always label outcomes distinctly (coin 1 vs coin 2)  |
| Using the formula with unequal probabilities | Habit of applying the ratio without checking symmetry | Verify physical fairness or list explicit probabilities first |
| Confusing “at least one” with “exactly one” | Linguistic ambiguity                        | Translate the English phrase into an exact set definition before counting |
| Double-counting intersections     | Adding cardinalities without inclusion-exclusion | Draw a Venn diagram or use ordered pairs             |
| Treating the empty set as impossible in practice | Zero probability feels counter-intuitive    | Remember \(P(\emptyset) = 0\) is a modelling choice, not a physical claim |
| Miscounting when dice are indistinguishable | Over-counting or under-counting symmetric outcomes | Decide once whether outcomes are ordered or unordered and stay consistent |
| Assuming the sample space is finite | Real problems sometimes require infinite sets | Check that the experiment truly terminates with finitely many results |

## 7. The textbook-precise statement
Let \(\Omega\) be a finite nonempty set called the sample space. Let every element of \(\Omega\) be regarded as equally likely. An event is any subset \(E\subseteq\Omega\). The probability of \(E\) is defined by
\[
P(E)=\frac{|E|}{|\Omega|}.
\]
This satisfies Kolmogorov’s three axioms restricted to the finite equiprobable case. (See Blitzstein & Hwang, *Introduction to Probability*, 2nd ed., §1.1.)

## 8. Visual — diagram or schematic
```text
          Sample Space Ω
   ┌─────────────────────────────┐
   │  H   T                      │   ← two-element coin example
   │                             │
   │     Event E = {H}           │   ← favourable outcomes
   │      ●                      │
   └─────────────────────────────┘
   |E| = 1     |Ω| = 2     P(E) = 1/2
```
The rectangle represents the entire set of possible results. The filled circle marks the single outcome that belongs to the chosen event.

## 9. The memory technique
1. **The hook** — Picture the sample space as an enormous glass jar filled with identical marbles; an event is any smaller jar into which you have poured some of those marbles. Probability is simply the fraction of marbles now sitting in the smaller jar.
2. **What to overlearn** — The formula \(P(E)=|E|/|\Omega|\) together with the two boundary values \(P(\emptyset)=0\) and \(P(\Omega)=1\).
3. **Spaced-repetition schedule** — Review the definition after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Rebuild by (a) listing every distinct outcome, (b) confirming equal likelihood, (c) counting how many satisfy the event description, (d) dividing the two integers.

## 10. What this unlocks
This counting definition is the gateway to every subsequent concept in discrete probability. It directly supplies the foundation for the addition rule, conditional probability, independence, random variables, expectation, and the binomial distribution.

- Addition rule for mutually exclusive events  
- Definition of conditional probability \(P(A|B)=P(A\cap B)/P(B)\)  
- Notion of independence via \(P(A\cap B)=P(A)P(B)\)  
- Introduction of discrete random variables as functions on \(\Omega\)

## 11. Self-check — five questions, no answers
1. A fair coin is tossed three times. Write the sample space and compute the probability of obtaining exactly two heads.  
2. Two fair six-sided dice are rolled. What is the probability that their product is even?  
3. Explain in one sentence why the probability of drawing the ace of spades from a standard 52-card deck equals \(1/52\).  
4. A student claims that the probability of rolling a sum of 13 with two dice is \(1/36\). Identify the modelling error.  
5. Construct a sample space for the experiment “birth month of a randomly chosen person” that makes every outcome equally likely, then give the probability that the month begins with the letter J.