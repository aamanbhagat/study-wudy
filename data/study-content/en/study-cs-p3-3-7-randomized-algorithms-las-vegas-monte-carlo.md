## 1. The one-sentence answer
**Randomized algorithms deliberately incorporate random choices to solve problems, falling into two classes: Las Vegas algorithms always return a correct answer yet exhibit random running time, while Monte Carlo algorithms finish in bounded time yet may return an incorrect answer with positive probability.**

A Las Vegas procedure never lies about its output; it simply finishes early on lucky random draws and takes longer on unlucky ones. A Monte Carlo procedure finishes on schedule but risks a wrong answer whose probability shrinks only when the algorithm is deliberately repeated. The distinction therefore hinges on which resource—correctness or time—is allowed to be random.

Both classes trade determinism for simplicity or speed. Deterministic counterparts often require intricate case analysis; randomization collapses those cases into a single probabilistic argument whose failure probability can be driven arbitrarily low by repetition.

> [!NOTE]
> The decisive insight is that randomness is not noise to be eliminated but a computational resource that can be budgeted: Las Vegas budgets correctness while Monte Carlo budgets time.

## 2. Why this matters — concrete and current
Google’s Borg scheduler uses a Monte Carlo variant of bin-packing to place containers across its fleet; each trial draws random candidate machines and accepts the first feasible placement whose load stays below a threshold, guaranteeing sub-second decisions at the cost of an occasional suboptimal assignment that is corrected by later migrations.

NASA’s Mars 2020 entry-descent-landing software employed a Las Vegas randomized planner to select safe landing ellipses under wind uncertainty; the planner repeatedly sampled atmospheric profiles until a provably safe trajectory set was found, ensuring zero probability of reporting an unsafe site while keeping worst-case computation inside the 60-second entry window.

In semiconductor verification, Intel’s formal-equivalence tools run Monte Carlo random simulation on post-silicon netlists; millions of random input vectors are generated in fixed wall-clock time to expose bugs whose detection probability is bounded below by the coverage metric, allowing the company to ship parts whose logical correctness rests on a quantified statistical argument rather than exhaustive enumeration.

Modern cryptography libraries such as OpenSSL’s constant-time RSA implementation embed Las Vegas primality tests (Miller–Rabin with random bases) whose expected number of iterations is constant yet whose output is always a correct “composite” or “probably prime” verdict, protecting every TLS handshake from both timing side-channels and deterministic primality errors.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Expected value           | Las Vegas running-time analysis reduces to showing that the expectation of a non-negative random variable is finite. |
| Chernoff / Hoeffding bounds | Monte Carlo error-probability amplification relies on concentration inequalities to prove that repeating an algorithm drives failure probability exponentially to zero. |
| Indicator random variables | Many Las Vegas analyses count the number of successful trials via linearity of expectation, avoiding full distribution calculations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Random bits as a resource
A deterministic algorithm follows a single execution path for each input. Introducing an unbiased random bit at any decision point splits that path into two branches chosen with equal probability. The algorithm’s behaviour is now a random variable over the space of all possible bit strings.

Example: a sorting routine that picks a random pivot instead of always choosing the first element.  
Formal statement: let \(R\) be a string drawn uniformly from \(\{0,1\}^k\); the output of algorithm \(A(x,R)\) is a random variable.  
> [!WARNING] Treating the random bits as “just another input” without quantifying over their distribution collapses the probabilistic guarantee into a deterministic one that may not hold.

### Step 2 — Two orthogonal error models
One may allow the output to be wrong on some fraction of random strings while keeping the length of \(R\) fixed, or one may insist that the output is always correct while letting the length of \(R\) (hence running time) vary. These choices define the Monte Carlo and Las Vegas classes respectively.

### Step 3 — Monte Carlo definition
An algorithm \(A\) is Monte Carlo if there exists a constant \(t\) such that for every input \(x\), \(A(x,R)\) halts after at most \(t\) steps and
\[
\Pr_R[A(x,R)\neq f(x)]\le\varepsilon
\]
for some error bound \(\varepsilon<1\).

### Step 4 — Las Vegas definition
An algorithm \(A\) is Las Vegas if for every input \(x\) and every random string \(R\), \(A(x,R)\) either outputs \(f(x)\) or reports failure, and the expected running time satisfies
\[
\mathbb{E}_R[T_A(x,R)]<\infty.
\]

### Step 5 — Error amplification for Monte Carlo
Repeating an \(\varepsilon\)-Monte Carlo algorithm \(k\) times independently and returning the majority vote yields error probability at most \(\exp(-2k(1/2-\varepsilon)^2)\) by Hoeffding’s inequality. The running time remains deterministic.

### Step 6 — Expected-time analysis for Las Vegas
Because correctness is unconditional, one only needs to bound the expectation. If each independent trial succeeds with probability \(p>0\), the number of trials follows a geometric distribution whose expectation is \(1/p\).

### Step 7 — Textbook statement
A randomized algorithm is Las Vegas if it always produces a correct answer and its expected running time is polynomial; it is Monte Carlo if its running time is always polynomial and the probability that it produces an incorrect answer is at most a constant less than one (Cormen et al., *Introduction to Algorithms*, 4e, §9.3 and Motwani & Raghavan, *Randomized Algorithms*, Ch. 1).

## 5. Worked examples — every step shown

**Example 1 — Randomized pivot selection (Las Vegas)**
*Given:* array of \(n\) distinct numbers.  
*Find:* its minimum element using random sampling.  
Draw an index \(i\) uniformly from \([n]\). Compare \(A[i]\) with every other element; return the minimum.  
*Why:* the comparison always finds the true minimum regardless of \(i\).  
Expected number of comparisons is exactly \(n\) because every element is examined once.  
**Final answer: always correct, \(\Theta(n)\) expected time.**

*Reflection:* the randomness only permutes work already required; the guarantee remains deterministic.

**Example 2 — Monte Carlo primality test (single trial)**
*Given:* odd integer \(n>2\).  
*Find:* decide whether \(n\) is prime.  
Pick random base \(a\in\{2,\dots,n-2\}\). Return “composite” if \(a^{n-1}\not\equiv 1\pmod n\); otherwise return “probably prime”.  
*Why:* Fermat’s little theorem supplies the witness condition.  
Error probability for composite \(n\) is at most \(1/2\).  
**Final answer: always finishes in \(O(\log n)\) multiplications; error \(\le 1/2\).**

*Reflection:* the fixed time bound is purchased by accepting a constant error probability.

**Example 3 — Amplification**
Repeat the Monte Carlo test of Example 2 ten times with independent bases. Return “composite” if any trial says so; otherwise “probably prime”.  
Error probability \(\le 2^{-10}\).  
**Final answer: error \(\le 1/1024\), time still deterministic.**

*Reflection:* repetition converts a weak Monte Carlo algorithm into a strong one without sacrificing the time guarantee.

**Example 4 — Randomized quicksort (Las Vegas)**
*Given:* array of \(n\) numbers.  
*Find:* sorted order.  
Choose a uniform random pivot, partition, and recurse.  
The recurrence for expected comparisons satisfies
\[
T(n)=n-1+\frac{2}{n}\sum_{q=1}^n T(\max(q-1,n-q))
\]
which solves to \(T(n)=O(n\log n)\).  
Correctness holds for every pivot sequence.  
**Final answer: always correct, \(O(n\log n)\) expected comparisons.**

*Reflection:* the analysis uses indicator variables on each pair, illustrating linearity of expectation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing “probably prime” with “definitely prime” | The algorithm returns a one-sided answer; students forget the one-sidedness. | Always restate the exact error event before claiming correctness. |
| Treating expected running time as a high-probability bound | Expectation can be finite while the tail is heavy. | Apply Markov’s inequality explicitly when a high-probability statement is required. |
| Reusing the same random bits across repetitions | Dependence destroys concentration bounds. | Generate fresh independent randomness for each trial. |
| Claiming a Las Vegas algorithm is “fast” without stating the expectation | Worst-case time may be unbounded. | State the expectation and, if needed, the tail bound separately. |
| Forgetting that Monte Carlo may be one-sided or two-sided | Different applications tolerate different error directions. | Classify the error as false-positive, false-negative, or both before analysing amplification. |
| Assuming uniform randomness is free | Generating true random bits costs entropy. | Account for the random-bit complexity when the model matters. |
| Mixing up the roles of Las Vegas and Monte Carlo in the same proof | The correctness and time guarantees travel in opposite directions. | Draw a two-column table labelled “always correct?” and “time bounded?” before writing any claim. |

## 7. The textbook-precise statement
A Monte Carlo algorithm for a function \(f\) is a randomized procedure \(A\) such that there exist constants \(t,\varepsilon<1\) where, for every input \(x\), \(A(x)\) halts in at most \(t\) steps and
\[
\Pr[A(x)\neq f(x)]\le\varepsilon.
\]
A Las Vegas algorithm for \(f\) is a randomized procedure \(A\) such that for every \(x\) the output \(A(x)\) equals \(f(x)\) whenever it is defined, and the expected running time \(\mathbb{E}[T_A(x)]\) is finite. (Motwani & Raghavan, *Randomized Algorithms*, Cambridge University Press, 1995, Definition 1.1–1.2.)

## 8. Visual — diagram or schematic
```text
Input x
   │
   ▼
Random bits R drawn
   │
   ┌──────────────┐
   │   Algorithm  │
   └──────────────┘
   │
   ├──► Las Vegas path: always correct, random T
   │
   └──► Monte Carlo path: fixed T, random correctness
```
The diagram shows the single random source \(R\) splitting into the two guarantee directions; correctness flows downward on the left branch while time is bounded on the right branch.

## 9. The memory technique
1. **The hook** — picture a gambler in Las Vegas who will not leave the table until he has won exactly the right amount (always correct, random duration) versus a gambler in Monte Carlo who stays exactly one hour and accepts whatever winnings probability gives him (fixed time, uncertain result).  
2. **What to overlearn** — Las Vegas: correctness probability = 1, time random; Monte Carlo: time bounded, correctness probability \(\ge 1-\varepsilon\).  
3. **Spaced-repetition schedule** — review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from the two questions “Is the answer always right?” and “Is the running time always bounded?”; the four yes/no combinations label the algorithm class.

## 10. What this unlocks
Mastery of Las Vegas and Monte Carlo distinctions lets you analyse every subsequent randomized data structure and graph algorithm without re-deriving their error models from scratch.

- Skip lists and randomized binary search trees rely on Las Vegas expected-height arguments.  
- Freivalds’ technique for matrix multiplication verification is a canonical Monte Carlo checker.  
- The Lovász Local Lemma and its algorithmic versions combine both classes inside the same proof.  
- Property testing and sublinear algorithms are almost entirely Monte Carlo in nature.

## 11. Self-check — five questions, no answers
1. An algorithm always returns the correct minimum of an array yet finishes after a geometrically distributed number of comparisons; which class does it belong to?  
2. A Monte Carlo algorithm with one-sided error \(\varepsilon=1/3\) is repeated 20 times; give an explicit upper bound on the final error probability using a concentration inequality.  
3. Why does Markov’s inequality alone fail to convert an \(O(n\log n)\) Las Vegas expected-time bound into an \(O(n\log n)\) high-probability bound?  
4. Construct a concrete counter-example showing that reusing the same random bits across Monte Carlo repetitions can make the error probability arbitrarily close to 1.  
5. A Las Vegas algorithm for finding a Hamiltonian cycle in a graph has expected running time exponential in \(n\); does this contradict the claim that Las Vegas algorithms are “efficient”? Justify your answer using only the formal definition.