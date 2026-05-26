## 1. The one-sentence answer
**Randomized algorithms deliberately inject randomness into their execution so that either correctness or runtime becomes a random variable, giving us two clean categories: Las Vegas algorithms that always return the correct answer but have random running time, and Monte Carlo algorithms that finish in deterministic time but may return an incorrect answer with bounded probability.**

Las Vegas algorithms trade worst-case time for expected time while preserving absolute correctness. Monte Carlo algorithms trade absolute correctness for guaranteed speed and a controllable error probability that shrinks with more random trials. Both rely on a source of unbiased random bits; without randomness the distinction collapses.

The central insight is that randomness is treated as a computational resource exactly like time or space: we measure how much randomness an algorithm consumes and how that randomness affects the two fundamental guarantees of correctness and termination.

> [!NOTE]
> The decisive “aha” is that Las Vegas never lies but may take arbitrarily long on some inputs, while Monte Carlo always stops on time yet may occasionally lie; choosing between them is therefore a deliberate correctness-versus-speed contract.

## 2. Why this matters — concrete and current
Google’s BigQuery uses a Monte Carlo cardinality estimator (HyperLogLog with randomized hashing) to answer distinct-count queries over petabytes of data in milliseconds while keeping relative error below 2 percent; the same query with an exact hash table would exhaust memory on every large table.

SpaceX’s telemetry pipeline runs a Las Vegas randomized consensus protocol derived from Raft with random back-off timers; expected latency stays low under bursty packet loss, yet every accepted log entry is guaranteed to be identical across all flight computers.

In semiconductor manufacturing, TSMC applies Monte Carlo particle-transport simulations (Monte Carlo ray tracing of EUV photons) to predict stochastic defects at 2 nm nodes; each simulation finishes in fixed wall-clock time and the aggregate error is driven below 0.1 percent by simply increasing the number of photon samples.

The Miller-Rabin primality test, a Monte Carlo algorithm, is embedded inside every TLS handshake performed by Cloudflare’s edge servers; a single composite number slipping through would be catastrophic, yet the probability is kept below 2^-128 by choosing 40 random bases, all inside a hard real-time budget.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Expected value       | To reason about average running time of Las Vegas algorithms |
| Indicator random variables | To convert “probability of error” statements into clean expectations |
| High-probability bounds | To turn Monte Carlo’s per-run error into an exponentially small failure probability |
| Uniform random sampling | Both classes require an ideal source of random bits whose bias is zero |

If any row is unfamiliar, pause and master that concept first; the rest of the lesson assumes these four ideas are already solid.

## 4. Building the idea — from intuition to formalism

### Step 1 — Randomness as an explicit input
A randomized algorithm is an ordinary deterministic procedure that receives, in addition to its usual input, a string of unbiased random bits.  
Example: to pick a random pivot in an array of length n you read ⌈log₂ n⌉ fresh random bits and interpret them as an integer in [0,n).  
Formally, the algorithm A is a function A(x,r) where x is the input and r is drawn uniformly from {0,1}^m.  
> [!WARNING] Treating the random bits as “just another array” hides the fact that they are consumed irreversibly; reusing the same bits across independent runs destroys independence.

### Step 2 — Two separate random variables
Define T(x,r) as the running time on input x with randomness r, and let C(x,r) be 1 if the output is correct and 0 otherwise.  
Las Vegas algorithms enforce C(x,r) = 1 for every r, while T(x,r) remains random. Monte Carlo algorithms enforce a fixed upper bound on T and allow Pr[C(x,r)=0] > 0.  
> [!WARNING] Mixing the two guarantees in one proof instantly produces a hybrid that is neither Las Vegas nor Monte Carlo and usually satisfies neither bound.

### Step 3 — Expected running time for Las Vegas
Because correctness is absolute, the only quantity left to analyze is E[T(x)]. Using indicator variables on the recursion depth of randomized quicksort yields the classic bound E[T] ≤ 2n ln n.  
Formal statement: for any fixed x, E_r[T(x,r)] ≤ c·n ln n for a small constant c.  
> [!WARNING] The expectation is over randomness only; the worst-case input can still force arbitrarily long runs, just with tiny probability.

### Step 4 — Error probability for Monte Carlo
For any fixed x we require Pr_r[C(x,r)=0] ≤ ε. Repeating the algorithm k independent times and taking the majority vote reduces the error to ≤ ε^k by the Chernoff bound.  
Formal statement: after k independent trials the failure probability is at most exp(−2k(½−ε)²).  
> [!WARNING] The repetitions must be independent; reusing the same random string leaves the error probability unchanged.

### Step 5 — Textbook-grade classification
An algorithm is Las Vegas if it always halts with the correct answer and its expected running time is finite for every input. It is Monte Carlo if it always halts within a deterministic time bound and the probability of returning an incorrect answer is at most ε < 1/2 for every input.

## 5. Worked examples — har step show karo

**Example 1 — Randomized pivot selection (Las Vegas)**  
*Given:* Array A of n distinct numbers.  
*Find:* Index of the median with expected linear time.  
Choose pivot index uniformly at random, partition, then recurse only on the side containing the median.  
*Why:* Each pivot choice is independent, so the expected size reduction yields E[T(n)] = O(n).  
**Final answer: O(n) expected time, always correct.**  
*Reflection:* The algorithm is Las Vegas because correctness never fails; only depth is random.

**Example 2 — Monte Carlo π estimation**  
*Given:* A unit square.  
*Find:* Approximation of π.  
Throw N points uniformly at random; let M be the number inside the quarter-circle. Return 4M/N.  
*Why:* The ratio converges to π/4 by the law of large numbers.  
**Final answer: 4M/N with additive error O(1/√N).**  
*Reflection:* Fixed N gives fixed runtime; error shrinks only with more random samples.

**Example 3 — Miller-Rabin primality (Monte Carlo)**  
*Given:* Odd integer n > 2, security parameter k.  
*Find:* “prime” or “composite”.  
For k random bases a, run the strong-pseudoprime test; if any base witnesses compositeness return “composite”.  
*Why:* If n is composite at least ¾ of the bases are witnesses, hence error ≤ 4^−k.  
**Final answer: “prime” with error probability ≤ 4^−k.**  
*Reflection:* Always finishes in O(k log³ n) time regardless of answer.

**Example 4 — Randomized quicksort (Las Vegas)**  
*Given:* Array of n elements.  
*Find:* Sorted array.  
Pick random pivot, recurse on both sides.  
*Why:* Expected recursion depth is 2 ln n, giving 2n ln n comparisons.  
**Final answer: always sorted, expected 2n ln n comparisons.**  
*Reflection:* The same code becomes Monte Carlo if we add an early-abort timer; correctness would then be lost.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing “expected time” with “high-probability time” | Students replace E[T] by “T is O(n log n) with high probability” without proof | Always state whether the bound is expectation or holds with probability 1−1/n^c |
| Re-using the same random bits across trials | The independence assumption required by Chernoff or linearity collapses | Generate a fresh random string for every independent repetition |
| Claiming Monte Carlo always gives the right answer “in practice” | Ignores the non-zero error probability that can be amplified by adversarial input | Keep the explicit ε in every complexity statement |
| Forgetting that Las Vegas may never finish on some inputs | The tail bound Pr[T > t] > 0 for every finite t is overlooked | Report both expectation and a high-probability tail when possible |
| Treating randomized algorithms as heuristics | Heuristics have no proven error bound; Monte Carlo algorithms do | Demand an explicit probability statement before calling an algorithm Monte Carlo |
| Measuring only average-case over inputs instead of over randomness | The definition fixes the input and averages only over r | Write “for every x, E_r[…]” or “for every x, Pr_r[…]” |

## 7. The textbook-precise statement
A Las Vegas algorithm for a problem Π is a randomized algorithm A such that for every input x, (i) A(x,r) outputs a correct solution with probability 1 over the internal randomness r, and (ii) the expected running time E_r[T_A(x,r)] is finite. A Monte Carlo algorithm for Π is a randomized algorithm A such that for every input x there exists ε < 1/2 with Pr_r[A(x,r) is incorrect] ≤ ε and T_A(x,r) ≤ t(n) for a deterministic function t. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 9, randomized algorithms section.)

## 8. Visual — diagram or schematic
```
Input x
   |
   v
[Random bits r] --> Algorithm A(x,r)
   |                       |
   |                       v
   |                 Output (correct?)
   |
   +-- Las Vegas:  correct=YES, time=random
   +-- Monte Carlo: time=bounded, correct=maybe
```

## 9. The memory technique
**The hook** — Picture two gamblers: Las Vegas always pays the exact winnings but may stay at the table until sunrise; Monte Carlo leaves exactly at midnight but might hand you the wrong chip stack with small probability.

**What to overlearn** — Las Vegas: correctness probability = 1, runtime expectation finite. Monte Carlo: runtime bounded, error probability ≤ ε < 1/2.

**Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — If you forget which is which, ask only two questions: “Can it ever lie?” and “Can it run forever?” The answer pair uniquely identifies the class.

## 10. What this unlocks
Mastery of these two classes lets you analyze every subsequent randomized data structure and streaming algorithm.  

- Skip lists and treaps rely on Las Vegas random priorities.  
- Locality-sensitive hashing and MinHash are Monte Carlo estimators.  
- Randomized incremental construction in computational geometry alternates between both styles depending on whether the conflict graph or the final structure must be exact.

## 11. Self-check — five questions, no answers
1. Give a one-sentence definition that distinguishes Las Vegas from Monte Carlo using only the two random variables T and C.  
2. For randomized quicksort on an array of length n, compute E[T(n)] using indicator variables on the number of comparisons between each pair.  
3. A Monte Carlo algorithm returns the correct answer with probability 0.9. How many independent repetitions are needed to push the error below 10^{-6}?  
4. Why does simply measuring average running time over a uniform distribution of inputs fail to prove that an algorithm is Las Vegas?  
5. Construct a concrete input on which a Las Vegas algorithm may exceed any given time bound with positive probability, yet still possess finite expectation.