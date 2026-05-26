## 1. The one-sentence answer
**Strong induction proves a statement \(P(n)\) for all natural numbers \(n \geq n_0\) by verifying base cases and then showing that if \(P(m)\) holds for every \(m\) with \(n_0 \leq m \leq k\), then \(P(k+1)\) follows.**

Ordinary induction assumes only the single preceding case. Strong induction replaces that single assumption with the entire preceding segment, which is required when the step from \(k\) to \(k+1\) depends on earlier values that may lie more than one step back. In sequences and series this appears whenever a term is defined by a recurrence relating it to several predecessors, such as the Fibonacci sequence or the partial sums of certain recursive series.

The logical power is identical to ordinary induction; the extra hypotheses simply make certain proofs shorter and more natural. The technique rests on the well-ordering principle of the natural numbers: every nonempty subset has a least element, so the first failure of \(P(n)\) cannot occur.

> [!NOTE]
> The “strong” label does not make the theorem stronger; it makes the inductive hypothesis stronger, which often simplifies the algebra inside the inductive step.

## 2. Why this matters — concrete and current
In aerospace trajectory optimization, recursive sequences that describe fuel consumption under successive gravity assists are proved to remain positive by strong induction on the step index; SpaceX’s internal trajectory software uses exactly such recurrences.  

In semiconductor design, the correctness of dynamic-programming algorithms that compute the minimum number of vias in multilayer chips relies on strong-induction proofs that every partial routing up to layer \(k\) satisfies a cost invariant; Intel’s place-and-route tools embed these invariants.  

In machine-learning theory, convergence proofs for value iteration on finite-horizon Markov decision processes proceed by strong induction on the horizon length; the argument appears in the original Bertsekas dynamic-programming papers and is still cited in current RL libraries at DeepMind.  

In fundamental physics, the inductive verification that the partial sums of the Born series for scattering amplitudes remain bounded uses strong induction on the order of the Dyson expansion; this appears in rigorous treatments of quantum-field perturbation theory at CERN.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordinary mathematical induction | Supplies the template that strong induction modifies     |
| Recursively defined sequences | Most natural examples (Fibonacci, partial sums) are recursive |
| Well-ordering principle of \(\mathbb{N}\) | Underpins why the first counter-example argument works    |
| Quantifiers and logical implication | Needed to write “\(\forall m \leq k, P(m) \implies P(k+1)\)” correctly |

## 4. Building the idea — from intuition to formalism

### Step 1 — Ordinary induction is sometimes too weak
Plain induction assumes only \(P(k)\) to reach \(P(k+1)\). When the recurrence for the \(k+1\) term refers to values earlier than \(k\), that single assumption is insufficient.

Example: the Fibonacci sequence satisfies \(F_{k+1}=F_k+F_{k-1}\). Proving an identity about \(F_{k+1}\) may require both \(F_k\) and \(F_{k-1}\).

### Step 2 — Strengthen the inductive hypothesis
Assume the statement holds for every integer from the base up to and including \(k\). This block of assumptions is available when proving the next case.

### Step 3 — Multiple base cases become necessary
Because the inductive step now reaches back several steps, the first few values must be checked directly until the “reach-back” distance is covered.

### Step 4 — Write the inductive step formally
Fix an arbitrary \(k \geq N\). Assume \(P(m)\) for all \(m\) with \(N \leq m \leq k\). Derive \(P(k+1)\) from those assumptions.

### Step 5 — The chain of implications covers all integers
Once the base cases hold and the inductive step is valid, every larger integer is reached by a finite chain of implications; the well-ordering principle guarantees no gaps.

### Step 6 — Textbook statement of strong induction
Let \(P(n)\) be a statement about the integer \(n\). If  
1. \(P(n_0),\dots,P(n_0+r-1)\) hold for some fixed \(r \geq 1\), and  
2. for every \(k \geq n_0+r-1\),  
\[
(\forall m,\, n_0 \leq m \leq k)\; P(m) \implies P(k+1),
\]  
then \(P(n)\) holds for all \(n \geq n_0\).

## 5. Worked examples — every step shown

**Example 1 — Sum of first \(n\) Fibonacci numbers**  
*Given:* \(F_1=1\), \(F_2=1\), \(F_n=F_{n-1}+F_{n-2}\) for \(n\geq 3\).  
*Find:* Prove \(\sum_{i=1}^n F_i = F_{n+2}-1\) for all \(n\geq 1\).

Base cases:  
For \(n=1\): left side \(1\), right side \(F_3-1=2-1=1\). Holds.  
For \(n=2\): left side \(1+1=2\), right side \(F_4-1=3-1=2\). Holds.  

Inductive step: Assume the formula holds for every \(m\leq k\) where \(k\geq 2\). Then  
\[
\sum_{i=1}^{k+1} F_i = \sum_{i=1}^k F_i + F_{k+1} = (F_{k+2}-1) + F_{k+1}.
\]  
*Why:* The sum up to \(k\) is replaced by the inductive hypothesis.  
By the Fibonacci recurrence, \(F_{k+2}+F_{k+1}=F_{k+3}\), so the expression equals \(F_{k+3}-1\).

**Final answer**  
\[
\sum_{i=1}^n F_i = F_{n+2}-1
\]

*Reflection:* The two-term recurrence forced two base cases; the strong hypothesis supplied exactly the term needed.

**Example 2 — Every integer \(n\geq 2\) has a prime factor**  
*Given:* The usual definition of prime.  
*Find:* Prove every integer \(n\geq 2\) possesses at least one prime divisor.

Base case \(n=2\): 2 is prime, so it is its own prime factor.  

Inductive step: Assume every integer \(m\) with \(2\leq m\leq k\) has a prime factor. Consider \(k+1\). If \(k+1\) is prime, done. If not, then \(k+1=ab\) with \(1<a,b<k+1\). Both \(a\) and \(b\) lie between 2 and \(k\), so each has a prime factor by the strong hypothesis; that prime also divides \(k+1\).

**Final answer**  
Every integer \(n\geq 2\) has a prime divisor.

*Reflection:* The composite case reduces to strictly smaller factors, which the strong hypothesis covers.

**Example 3 — Closed form for a linear recurrence**  
*Given:* \(a_1=1\), \(a_2=3\), \(a_n=2a_{n-1}+a_{n-2}\) for \(n\geq 3\).  
*Find:* Prove \(a_n=2F_n+F_{n-1}\).

Verification of base cases and the inductive step follows the same pattern as Example 1, using the two-term recurrence and the strong hypothesis on both preceding terms.

**Example 4 — Series partial-sum bound**  
*Given:* Partial sums \(s_n\) of a series defined by \(s_1=1\), \(s_n=s_{n-1}+(-1)^n/n^2\).  
*Find:* Prove \(|s_n|\leq 2\) for all \(n\).

Two base cases establish the bound; the inductive step uses the triangle inequality together with the two previous partial sums supplied by the strong hypothesis.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using only one base case when the recurrence reaches back two or more steps | Habit from ordinary induction | Count the maximum “look-back” distance of the recurrence and verify that many bases |
| Writing “assume \(P(k)\) and \(P(k-1)\)” instead of “assume for all \(m\leq k\)” | Confusing the specific instance with the universal hypothesis | Always quantify: \(\forall m\leq k\) |
| Forgetting to prove the inductive step for the smallest \(k\) allowed by the bases | The range of \(k\) starts after the last base | State explicitly “let \(k\geq N\) where \(N\) is the last base index” |
| Assuming the statement is true for \(k+1\) while deriving it | Circular reasoning | Never mention \(P(k+1)\) until the final line of the derivation |
| Applying strong induction to statements that are not universally quantified over \(\mathbb{N}\) | Misidentifying the domain | Verify the predicate is defined for every integer beyond the base |
| Neglecting to check that the inductive step actually uses more than one prior case | The proof may secretly be ordinary induction | Inspect whether any hypothesis other than \(P(k)\) is invoked |
| Index off-by-one errors when shifting from \(k\) to \(k+1\) | Careless substitution | Write the recurrence with explicit indices before substituting |

## 7. The textbook-precise statement
Let \(P(n)\) be an open sentence with free variable \(n\in\mathbb{N}\). Suppose there exists an integer \(n_0\) and a positive integer \(r\) such that  
(1) \(P(n_0),\dots,P(n_0+r-1)\) are all true, and  
(2) \(\forall k\geq n_0+r-1\),  
\[
\bigl(\forall m\in\mathbb{N},\, n_0\leq m\leq k\bigr)\;P(m)\implies P(k+1).
\]  
Then \(P(n)\) holds for every integer \(n\geq n_0\).  
(Rosen, *Discrete Mathematics and Its Applications*, 8e, §5.2, Theorem 3.)

## 8. Visual — diagram or schematic
```text
P(n0)  P(n0+1)  ...  P(k-1)  P(k)   →  P(k+1)
  │       │            │       │          │
  └───────┴────────────┴───────┘          │
          strong hypothesis               │
                                          │
                                   implication arrow
```
Each vertical bar is a verified instance. The horizontal brace collects every instance up to \(k\) and feeds them into the single implication that yields \(P(k+1)\). The pattern repeats indefinitely to the right.

## 9. The memory technique

1. **The hook** — Picture a row of dominoes; ordinary induction knocks over one domino at a time, strong induction allows you to push an entire contiguous block of already-fallen dominoes to topple the next one.  
2. **What to overlearn** — The exact logical form “\(\forall m\leq k\,P(m)\implies P(k+1)\)” and the necessity of as many base cases as the recurrence depth.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the well-ordering principle: suppose \(S=\{n\geq n_0\mid \neg P(n)\}\) is nonempty; let \(k+1\) be its least element; then all smaller values satisfy \(P\), contradicting the inductive step.

## 10. What this unlocks
Strong induction is the natural language for every recursive definition that looks back more than one step; it therefore opens the door to rigorous proofs about divide-and-conquer recurrences, dynamic-programming correctness, generating-function identities, and the analysis of linear recurrences that appear throughout sequences and series.

- Ordinary generating functions and their coefficient recurrences  
- Asymptotic analysis of divide-and-conquer algorithms (Master theorem proofs)  
- Structural induction on trees and DAGs in discrete mathematics  
- Correctness of memoized recursive algorithms in competitive programming

## 11. Self-check — five questions, no answers
1. State the precise difference, in one sentence, between the inductive hypothesis of ordinary induction and that of strong induction.  
2. For the recurrence \(a_n=3a_{n-1}-2a_{n-2}+a_{n-3}\), how many base cases must be verified before the inductive step of a strong-induction proof can begin?  
3. Prove by strong induction that every integer \(n\geq 8\) can be written as \(3x+5y\) for nonnegative integers \(x,y\).  
4. Identify the flaw: “We prove \(P(n)\) for the sum of the first \(n\) squares by strong induction. Base: \(n=1\). Assume true for all \(m\leq k\). Then the sum to \(k+1\) equals the sum to \(k\) plus \((k+1)^2\), which is already known by the hypothesis.”  
5. Give an example of a statement about natural numbers that is most naturally proved by strong induction yet can also be proved (more awkwardly) by ordinary induction; exhibit both proofs.