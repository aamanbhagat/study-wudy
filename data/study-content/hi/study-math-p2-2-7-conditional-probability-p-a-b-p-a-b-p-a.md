## 1. The one-sentence answer
**Conditional probability quantifies how the occurrence of one event changes the chance of another.**

Iska matlab yeh hai ki jab aap jaante ho ki event B already ho chuka hai, to aap event A ki probability ko naye restricted space mein measure karte ho. Normal probability sample space ko poora maanti hai, lekin yahan aap sirf un outcomes par focus karte ho jo B ke andar aate hain. Isliye formula mein denominator P(B) hota hai, kyunki woh hi ab naya total probability mass ban jaata hai.

Yeh adjustment sirf tab sense banata hai jab P(B) > 0. Agar B impossible hai, to conditioning ka koi matlab nahi banta. Real calculations mein aap pehle intersection P(A ∩ B) nikaalte ho, phir usko P(B) se divide karte ho taaki probability 0 aur 1 ke beech rahe.

> [!NOTE]
> The core "aha" is that conditioning does not change the events themselves; it only rescales the probability measure to the subspace defined by B.

## 2. Why this matters — concrete and current
In medical diagnostics, companies like Illumina use conditional probability to update disease likelihood after a positive genetic test result, dramatically reducing false positives in population screening.

In autonomous vehicle perception systems at Waymo, engineers compute P(obstacle | lidar reading) to decide braking actions when sensor noise is present, directly affecting collision rates on public roads.

In quantitative finance, JPMorgan’s risk models apply conditional probability to estimate P(default | macroeconomic indicators) when stress-testing loan portfolios under Federal Reserve scenarios.

In modern recommender systems at Spotify, the algorithm calculates P(user likes track | previous skips) to refine playlists in real time, improving retention metrics reported in quarterly earnings.

In particle physics experiments at CERN, analysts compute P(signal | observed tracks) when filtering collision events, which was essential in the 2012 Higgs boson discovery paper.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic probability    | You must already treat P as a number between 0 and 1      |
| Set intersection     | A ∩ B defines the outcomes that satisfy both events       |
| Sample space         | Conditioning restricts the original sample space          |
| Addition rule        | Needed to compute P(B) when B is expressed as disjoint unions |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Restrict the universe
Aap already jaante ho ki B ho chuka hai, isliye aap sirf B ke andar ke outcomes ko dekhte ho.  
Example: ek fair die mein P(even) = 1/2, lekin agar aap jaante ho ki number ≤ 3 hai, to sirf {1,2,3} bachta hai.  
Formal statement: the new sample space is the set B itself.  
> [!WARNING]
> Agar aap B ko ignore karke poora sample space use karte rahe, to probability galat ho jaayegi kyunki extra outcomes ko weight diya jaayega.

### Step 2 — Count favourable outcomes inside B
Ab sirf un outcomes ko count karo jo A aur B dono mein hain.  
Example: upar wale die mein “even and ≤3” sirf {2} hai.  
Formal statement: favourable mass = P(A ∩ B).  
> [!WARNING]
> Students often add P(A) + P(B) instead of intersecting; that double-counts and breaks the ratio.

### Step 3 — Normalise by the size of B
P(A ∩ B) ko P(B) se divide karo taaki nayi probability 1 tak pahunche.  
Example: P({2}) / P({1,2,3}) = (1/6) / (3/6) = 1/3.  
Formal statement: P(A|B) = P(A ∩ B) / P(B).  
> [!WARNING]
> Division by zero occurs if P(B) = 0; the definition is simply undefined in that case.

### Step 4 — Verify the three Kolmogorov axioms still hold
The new measure P(·|B) must satisfy non-negativity, normalisation to 1, and countable additivity inside B.  
All three are automatically satisfied once you divide by P(B) > 0.  
Formal statement: P(B|B) = 1 follows directly from the formula.

### Step 5 — Distinguish from joint and marginal
P(A|B) ≠ P(A ∩ B) and ≠ P(A).  
Only when A and B are independent does P(A|B) = P(A).  
Formal statement: independence is the special case where the ratio equals the marginal.

### Step 6 — Write the textbook definition
For any probability space (Ω, F, P) and events A, B ∈ F with P(B) > 0, the conditional probability is defined by the displayed equation below.

## 5. Worked examples — har step show karo

**Example 1 — Single die**
*Given:* fair six-sided die, B = {number ≤ 4}, A = {even}.  
*Find:* P(A|B).  
Step 1: B = {1,2,3,4}, P(B) = 4/6.  
Step 2: A ∩ B = {2,4}, P(A ∩ B) = 2/6.  
Step 3: P(A|B) = (2/6) / (4/6) = 1/2.  
*Why* each move: restricted space first, then intersection, then normalisation.  
**1/2**

*Reflection:* the answer differs from unconditional P(even) = 1/2 only coincidentally; the method is now ready for harder cases.

**Example 2 — Two cards**
*Given:* standard deck, B = {first card is ace}, A = {second card is ace}.  
*Find:* P(A|B).  
Step 1: P(B) = 4/52.  
Step 2: P(A ∩ B) = (4/52)·(3/51).  
Step 3: P(A|B) = [(4/52)·(3/51)] / (4/52) = 3/51.  
*Why* each move: joint probability computed via chain rule, then conditioned.  
**3/51**

*Reflection:* without conditioning the answer would be 3/51 anyway, but the same machinery works when dependence is stronger.

**Example 3 — Medical test**
*Given:* disease prevalence 1 %, test sensitivity 99 %, false-positive rate 5 %. Let B = positive test, A = has disease.  
*Find:* P(A|B).  
Step 1: P(A) = 0.01, P(B|A) = 0.99, P(B|A^c) = 0.05.  
Step 2: P(B) = 0.99·0.01 + 0.05·0.99 = 0.0594.  
Step 3: P(A|B) = (0.99·0.01) / 0.0594 ≈ 0.166.  
*Why* each move: total probability theorem expands denominator.  
**≈ 0.166**

*Reflection:* the low posterior despite accurate test shows base-rate effect.

**Example 4 — Three events**
*Given:* P(A) = 0.4, P(B) = 0.5, P(A ∩ B ∩ C) = 0.1, P(B ∩ C) = 0.2.  
*Find:* P(A | B ∩ C).  
Step 1: new conditioning event is B ∩ C with P(B ∩ C) = 0.2.  
Step 2: intersection with A is A ∩ B ∩ C.  
Step 3: P(A | B ∩ C) = 0.1 / 0.2 = 0.5.  
*Why* each move: formula extends directly to multiple conditions.  
**0.5**

*Reflection:* the same ratio works for any sigma-algebra element as long as its probability is positive.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Using P(A) in denominator   | Confusing which event is given              | Always place the conditioning event in denominator   |
| Treating P(A|B) = P(B|A)    | Symmetry illusion                           | Draw Venn or tree; check numbers are different       |
| Forgetting P(B) > 0         | Edge case overlooked                        | Explicitly verify denominator positive before dividing |
| Adding probabilities instead of intersecting | Misreading “and”                         | Write A ∩ B in set notation every time               |
| Using counts without normalising | Forgetting the ratio                        | Always divide joint count by marginal count of B     |
| Assuming independence       | Over-applying the special case              | Check whether P(A|B) equals P(A) before claiming     |
| Ignoring dependence in chain rule | Calculating joints incorrectly         | Write P(A ∩ B) = P(A|B) P(B) explicitly              |

## 7. The textbook-precise statement
Let (Ω, F, P) be a probability space. For events A, B ∈ F with P(B) > 0, the conditional probability of A given B is defined by
$$
P(A|B) = \frac{P(A \cap B)}{P(B)}.
$$
This definition appears in Sheldon Ross, *A First Course in Probability*, 10th ed., §3.1. All subsequent properties (chain rule, Bayes’ theorem, independence) are derived from this equation under the single hypothesis P(B) > 0.

## 8. Visual — diagram or schematic
```text
          Ω
   +-------------------+
   |                   |
   |   +-------+       |
   |   |   B   |       |
   |   | +---+ |       |
   |   | |A∩B| |       |
   |   | +---+ |       |
   |   +-------+       |
   +-------------------+
```
Labelled regions: entire rectangle = Ω, large inner oval = B, shaded lens = A ∩ B. All probability mass outside B is ignored after conditioning.

## 9. The memory technique
1. **The hook** — Picture a spotlight shining only on region B; whatever lies inside the spotlight is the only world that now exists, and you measure A’s share inside that circle.
2. **What to overlearn** — P(A|B) = P(A ∩ B)/P(B) with the strict requirement P(B) > 0; also remember the verbal gloss “probability of A inside B”.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, and 35 days, each time solving one fresh numerical example.
4. **First-principles fallback** — If the formula slips, redraw the Venn diagram, shade B, compute the ratio of shaded areas, and the division reappears automatically.

## 10. What this unlocks
Conditional probability is the direct gateway to Bayes’ theorem, independence testing, and all modern causal inference.

- Bayes’ theorem for belief updating
- Law of total probability with partitions
- Markov chains and transition kernels
- Naive Bayes classifiers in machine learning
- Conditional expectation and martingale theory

## 11. Self-check — five questions, no answers
1. A fair coin is flipped twice. Compute P(second heads | at least one heads).
2. In a group of 100 people, 40 like tea, 30 like coffee, and 10 like both. What is the probability a randomly chosen coffee-drinker also likes tea?
3. Explain in one sentence why P(A|B) can be larger than P(A) even though B is “extra information”.
4. Identify the mistake: a student writes P(A|B) = P(A ∩ B)/P(A). What numerical consequence follows if P(A) < P(B)?
5. Construct a concrete numerical example where P(A|B) = P(A) yet A and B are not independent.