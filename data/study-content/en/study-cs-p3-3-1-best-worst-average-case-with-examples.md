## 1. The one-sentence answer
**Best-case, worst-case, and average-case analysis quantify an algorithm’s resource consumption (time or space) under the most favorable input, the least favorable input, and the expected input distribution, respectively.**

These three quantities arise because the same algorithm can require dramatically different numbers of operations on different inputs of identical size. Consider searching an array of length *n* for a target value. When the target sits in the first position, only one comparison occurs. When the target is absent or occupies the final position, *n* comparisons are required. When targets arrive uniformly at random, roughly *n*/2 comparisons occur on average. The three numbers—1, *n*, and *n*/2—therefore describe three distinct performance regimes rather than a single fixed cost.

The distinction matters once algorithms are composed into larger systems. A component whose worst-case cost is linear may dominate the overall running time even when its average-case cost appears harmless. Consequently, engineers must select the appropriate case according to the guarantees required by the surrounding application.

> [!NOTE]
> The “case” is defined solely by the input that produces the extremal or expected cost; it is independent of the hardware or programming language used to implement the algorithm.

## 2. Why this matters — concrete and current
In database query optimizers at companies such as Google and Meta, cost models must decide whether an index scan or a full table scan will be cheaper for a given predicate. The optimizer therefore stores both the worst-case I/O count (when every row matches) and the average-case count (derived from column histograms) so that the chosen plan remains safe under adversarial data.

NASA’s flight-software certification for the Perseverance rover required every real-time task to finish inside a hard deadline even on the single worst-case input sequence that could arise during entry, descent, and landing. Average-case arguments were disallowed; only worst-case bounds entered the schedulability analysis.

Semiconductor place-and-route tools at TSMC and Intel run millions of timing paths through static timing analysis. Each path is characterized by its worst-case delay under process variation; the tool aborts if any path exceeds the clock period in that corner, even though the average path delay across all manufactured dies may be comfortably lower.

In machine-learning inference serving systems such as TensorFlow Serving, latency SLAs are expressed in tail percentiles (p99). Engineers therefore measure both the average-case latency on typical user traffic and the worst-case latency on adversarial batches so that autoscaling rules can provision enough replicas to keep the tail inside the SLA.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Input size *n*           | All three cases are expressed as functions of the size of the input.                 |
| Elementary operation     | Counting comparisons or memory accesses supplies the numeric cost inside each case.  |
| Uniform distribution     | The average-case formula is derived under an assumption that every input is equally likely. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Inputs of equal size can cost different amounts
Two arrays of length 10 may require 1 or 10 comparisons to locate a given key.  
Example: array `[5, …]` versus array `[…, 5]`.  
Formal statement: let *T*(*I*) be the number of elementary operations executed on input *I*; *T* is not a constant for all *I* with |*I*|=*n*.  
> [!WARNING] Treating *T* as constant for fixed *n* collapses the three cases into one meaningless number.

### Step 2 — Define the best-case input set
Collect every input of size *n* that produces the smallest possible value of *T*.  
Example: the single-element array containing the target at index 0 yields *T*=1.  
Formal statement:  
$$
T_{\text{best}}(n)=\min_{\substack{I\\|I|=n}}T(I).
$$

### Step 3 — Define the worst-case input set
Collect every input of size *n* that produces the largest possible value of *T*.  
Example: the target is absent or at the final index yields *T*=*n*.  
Formal statement:  
$$
T_{\text{worst}}(n)=\max_{\substack{I\\|I|=n}}T(I).
$$

### Step 4 — Define the average-case cost
Assume every input of size *n* occurs with equal probability and compute the expected value of *T*.  
Formal statement:  
$$
T_{\text{avg}}(n)=\frac{1}{N}\sum_{\substack{I\\|I|=n}}T(I),
$$  
where *N* is the number of distinct inputs of size *n*.

### Step 5 — Asymptotic notation applied to each case
Replace each exact function by its tightest big-O (or Θ) bound.  
Example: linear search yields Θ(1) best, Θ(*n*) worst, Θ(*n*) average.  
Formal statement: the three asymptotic expressions may differ; the algorithm’s advertised complexity must name which case is claimed.

### Step 6 — Textbook statement of the result
For any algorithm *A*, the functions *T*_best(*n*), *T*_worst(*n*), and *T*_avg(*n*) are well-defined once an elementary operation and an input distribution are fixed; they are independent of one another and must be reported separately when describing *A*’s complexity.

## 5. Worked examples — every step shown

**Example 1 — Linear search (best case)**  
*Given:* array *A* of length *n*, target *x* = *A*[0].  
*Find:* number of comparisons.  
Step 1: compare *x* with *A*[0] → equal, return index 0.  
*Why:* the first comparison succeeds, so the loop terminates.  
**1**  

*Reflection:* The best-case count is independent of *n*; this pattern appears in any algorithm that can short-circuit on the first datum.

**Example 2 — Linear search (worst case)**  
*Given:* array *A* of length *n*, *x* not present.  
*Find:* number of comparisons.  
Step 1: compare *x* with *A*[0] → unequal.  
*Why:* continue scanning.  
Step 2: … repeat until *A*[*n*−1].  
*Why:* every element must be examined to certify absence.  
**n**  

*Reflection:* The worst-case count grows linearly; any claim of “fast search” must therefore specify that the target is known to exist.

**Example 3 — Linear search (average case)**  
*Given:* uniform random placement of *x*.  
*Find:* expected comparisons.  
Step 1: probability target at position *k* is 1/*n*.  
*Why:* uniform distribution assumption.  
Step 2: cost at position *k* is *k*.  
*Why:* *k* comparisons are performed.  
Step 3: expectation = ∑_{k=1}^n *k*·(1/*n*) = (*n*+1)/2.  
**Θ(n)**  

*Reflection:* The average-case bound matches the worst-case bound for this algorithm; many students incorrectly assume it must be strictly smaller.

**Example 4 — Insertion sort on already-sorted input**  
*Given:* sorted array of length *n*.  
*Find:* number of comparisons.  
Step 1: outer loop runs *n*−1 times.  
*Why:* each new element is inserted.  
Step 2: inner while loop performs 0 comparisons for each insertion.  
*Why:* the new element is already larger than all previous.  
**n−1** (best case)  

*Reflection:* The same algorithm on reverse-sorted input performs Θ(*n*²) comparisons, illustrating how input order alone changes the case.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Reporting only “O(n)” without naming the case | Textbooks sometimes omit the qualifier when context is obvious | Always write “worst-case Θ(n)” or “average-case Θ(n log n)” |
| Confusing best-case with average-case | Intuition that “most inputs are easy” | Compute the expectation explicitly before claiming average-case |
| Using big-O for best-case and Θ for worst-case inconsistently | Loose notation habits | Adopt a single convention (Θ when both upper and lower bounds are tight) |
| Assuming uniform distribution without stating it | Average-case formulas collapse without it | Explicitly list the probability measure used |
| Treating space complexity identically to time | Space usage often does not vary with input values | Verify whether the case distinction applies to the resource in question |
| Ignoring that *n* must be defined identically across cases | Different authors count keys versus bytes | Fix the measure of size once at the beginning of the analysis |
| Believing randomized algorithms have no worst case | Randomization only changes the distribution | A worst-case input still exists; randomization merely reduces its probability |

## 7. The textbook-precise statement
Let *A* be an algorithm, let *I* range over inputs, and let |*I*|=*n*. Define *T*(*I*) as the number of elementary operations executed by *A* on *I*. Then the best-case, worst-case, and average-case costs are  
$$
T_{\text{best}}(n)=\min_{|I|=n}T(I),\qquad
T_{\text{worst}}(n)=\max_{|I|=n}T(I),\qquad
T_{\text{avg}}(n)=\mathbb{E}_{|I|=n}[T(I)]
$$  
under a stated probability measure on inputs of size *n*. (Cormen et al., *Introduction to Algorithms*, 4e, §2.3.)

## 8. Visual — diagram or schematic
```text
T(n)
 ^
 |          worst
 |         / Θ(n)
 |        /
 |   avg / Θ(n)
 |      /
 |best / Θ(1)
 |    /
 +------------------> n
```
Horizontal axis = input size *n*; three curves show the distinct growth rates of best, average, and worst cases for linear search.

## 9. The memory technique
1. **The hook** — Picture three roads of identical length: a perfect highway (best), rush-hour traffic (average), and a roadblock forcing a detour (worst).  
2. **What to overlearn** — The three symbols Θ_best, Θ_worst, Θ_avg must be written together; never memorize a lone bound.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the three functions by enumerating all inputs of size *n*, counting operations on each, then taking min, max, and mean.

## 10. What this unlocks
Accurate case analysis is the prerequisite for every subsequent topic that compares algorithms: deciding whether quicksort’s average-case Θ(*n* log *n*) justifies its use over mergesort, proving that a hash table’s expected O(1) lookup survives only under uniform hashing, and performing amortized analysis on dynamic arrays.

- Next: Big-O, Θ, Ω notation applied to each case  
- Next: Recurrence relations for divide-and-conquer (worst-case depth)  
- Next: Randomized algorithms and expected-case analysis  

## 11. Self-check — five questions, no answers
1. For linear search, prove that the average-case count equals (*n*+1)/2 under the uniform model.  
2. Give an algorithm whose best-case, average-case, and worst-case complexities are all Θ(*n* log *n*).  
3. An adversary claims “my sort never exceeds 3*n* comparisons.” Which case is being bounded?  
4. Why does the average-case analysis of quicksort require an assumption that the pivot rank is uniformly random?  
5. Construct a concrete input family of size *n* that forces insertion sort into its worst-case quadratic behavior while keeping the best-case linear.