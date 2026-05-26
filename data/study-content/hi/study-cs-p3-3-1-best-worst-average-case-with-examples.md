## 1. The one-sentence answer
**Best, worst, and average case describe how an algorithm’s running time or space changes with different inputs of the same size.**

Yeh teen cases aapko batate hain ki ek hi size ke input par algorithm kitna tez ya slow ho sakta hai. Best case tab hota hai jab input algorithm ke liye sabse favourable ho, worst case tab jab sabse unfavourable ho, aur average case tab jab input randomly aaye. Iska matlab yeh hai ki sirf big-O notation likh dena kaafi nahi; aapko yeh bhi pata hona chahiye ki woh bound kis input distribution par apply hoti hai.

Real analysis mein hum time complexity ko ek function T(n, I) maante hain jahaan I input ko represent karta hai. Best case min_I T(n, I) hota hai, worst case max_I T(n, I), aur average case expected value hota hai over some probability distribution on I.

> [!NOTE]
> The single most important “aha” is that worst-case analysis gives a guarantee you can rely on, while average-case analysis tells you what you will probably see in practice; confusing the two is the root of most wrong performance claims.

## 2. Why this matters — concrete and current
Google’s Bigtable uses memtable flushing whose latency is analysed under worst-case adversarial write patterns; the paper explicitly bounds the worst-case write amplification to keep tail latencies under 10 ms.

In autonomous driving, LiDAR point-cloud clustering algorithms at Waymo are profiled with average-case analysis over real road distributions because worst-case O(n²) behaviour only appears in pathological empty scenes that never occur on highways.

Semiconductor place-and-route tools at TSMC run simulated-annealing placement whose cooling schedule is tuned using average-case wire-length expectations derived from Rent’s rule distributions, not worst-case.

Redis sorted-set operations (ziplist vs. skiplist) switch thresholds after measuring both worst-case rebalance cost and average-case lookup cost on production traces containing 10⁹ operations.

NASA’s Perseverance rover’s image-compression pipeline uses best-case analysis for lossless LZ77 on uniform Martian terrain images to guarantee that the 2 Mbps downlink budget is never exceeded even when every frame is compressible.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Big-O, Θ, Ω          | To express the three cases formally                       |
| Input size n         | All three cases are functions of the same n               |
| Probability space    | Required only for average-case expectation                |
| Loop counting        | Basic technique to obtain T(n) before case analysis       |

Agar aapko loop counting ya asymptotic notation abhi tak clear nahi hai, toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Runtime is input-dependent
Algorithm ka execution time sirf n par depend nahi karta; woh exact values aur arrangement of input par bhi depend karta hai.  
Example: linear search on array [1,2,3,4] finds 1 in one comparison but 4 in four comparisons.  
Formal statement: Let T(n,I) be the number of primitive operations on input I of size n. Then T is not a function of n alone.  
> [!WARNING]
> Agar aap T(n) ko single-valued मान लोगे toh best/worst distinction hi gayab ho jaayegi.

### Step 2 — Best case is the minimum
Best case = min { T(n,I) | |I|=n }.  
Example: linear search, best case when target is at index 0 → 1 comparison.  
Formal:  
$$
T_{\text{best}}(n)=\min_{|I|=n}T(n,I)
$$

### Step 3 — Worst case is the maximum
Worst case = max { T(n,I) | |I|=n }.  
Example: linear search, target absent or at last position → n comparisons.  
Formal:  
$$
T_{\text{worst}}(n)=\max_{|I|=n}T(n,I)
$$

### Step 4 — Average case requires a distribution
Average case = expected value E[T(n,I)] under a probability distribution P on inputs of size n.  
Example: linear search, target equally likely at any of n positions → (n+1)/2 comparisons.  
Formal:  
$$
T_{\text{avg}}(n)=\sum_{|I|=n}T(n,I)\cdot P(I)
$$

### Step 5 — Distribution choice matters
Different distributions give different average cases. Uniform random permutation is common for sorting; Zipf distribution appears in real search logs.  
> [!WARNING]
> Galat distribution choose karne se average-case number production behaviour se bilkul alag ho sakta hai.

### Step 6 — Relating cases to asymptotic bounds
We usually say “linear search is Θ(n) in worst case” and “Θ(1) in best case”. Average case under uniform distribution is still Θ(n).  
Formal textbook statement appears in section 7.

### Step 7 — Space complexity also has cases
Same three cases apply to auxiliary memory. Example: quicksort recursion stack is O(log n) on average, O(n) in worst case.

## 5. Worked examples — har step show karo

**Example 1 — Linear search (best case)**  
*Given:* Array A of n distinct integers, target x = A[0].  
*Find:* Number of comparisons.  
Step 1: Compare x with A[0] → match found.  
Step 2: Return index 0.  
*Why:* Input was deliberately chosen to trigger immediate success.  
**Final answer: 1 comparison**  
*Reflection:* Best-case number is constant, independent of n.

**Example 2 — Linear search (worst case)**  
*Given:* x not present in A.  
*Find:* Comparisons performed.  
Step 1: Check all n positions.  
Step 2: Return “not found”.  
*Why:* Every element must be examined to be sure.  
**Final answer: n comparisons**  
*Reflection:* Guarantees an upper bound you can always rely on.

**Example 3 — Linear search (average case, uniform)**  
*Given:* x equally likely to be at any index 1 to n or absent (n+1 possibilities).  
*Find:* Expected comparisons.  
Calculation:  
$$
E[T]=\frac{1}{n+1}(1+2+\dots+n+(n+1))=\frac{(n+1)(n+2)/2}{n+1}=\frac{n+1}{2}
$$  
*Why:* Each position equally probable, arithmetic-series sum used.  
**Final answer: (n+1)/2 comparisons**  
*Reflection:* Still linear; average does not improve asymptotic class here.

**Example 4 — Insertion sort (average case on random permutation)**  
*Given:* n distinct keys in random order.  
*Find:* Expected number of comparisons.  
Step 1: Outer loop runs n−1 times.  
Step 2: For each position i, inner while loop compares until correct place found.  
Step 3: For each i, expected inner comparisons = i/2 (uniform insertion position).  
Step 4: Total expectation = Σ_{i=2}^n (i/2) = Θ(n²).  
*Why:* Linearity of expectation lets us sum independent expectations.  
**Final answer: ~n²/4 comparisons**  
*Reflection:* Average case same quadratic class as worst case; only constant factor improves.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Claiming “average O(1)” for hash table without load-factor distribution | Students forget collisions depend on input distribution | Always state the assumed distribution        |
| Treating best case as typical performance | Intuitive hope that “best” will happen      | Never use best-case numbers for SLAs         |
| Forgetting that average still needs Θ notation | Focus only on exact expectation             | After computing E[T], still apply asymptotic bounds |
| Using worst-case input for average-case proof | Mixing definitions                          | Keep three separate functions T_best, T_worst, T_avg |
| Ignoring space cases for recursion | Only time is analysed                       | Apply same three cases to auxiliary memory   |
| Assuming uniform distribution in real data | Real data often Zipf or adversarial         | Validate distribution against production logs |
| Reporting only big-O instead of Θ for cases | Loose upper bound hides tight behaviour     | Prefer Θ when both upper and lower bounds match |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 2, page 29:  
“For a given algorithm, we may be interested in three cases. The *worst-case running time* of an algorithm is the longest running time over all inputs of size n. The *best-case running time* is the shortest. The *average-case running time* is the expected running time over all inputs of size n, assuming some distribution. When we say that the running time is Θ(g(n)) in the worst case, we mean that T_worst(n) = Θ(g(n)).”

## 8. Visual — diagram or schematic
```
Input distribution
          │
Best      │   ★   (minimum T)
          │
Average   │   ●   (expected T)
          │
Worst     │   ◆   (maximum T)
          └──────────────────► Input instances (same n)
```

## 9. The memory technique
1. **The hook** — Picture three weather forecasts for the same city: “best day ever”, “worst storm in history”, and “typical day you should pack for”. Same city (n), different forecasts (cases).
2. **What to overlearn** — Worst-case bound is the promise you can sell; average-case bound is the number you will usually measure.
3. **Spaced-repetition schedule** — Review definitions after 1 day, compute one average-case example after 3 days, contrast all three cases on insertion sort after 7 days, derive expectation formula from scratch after 16 days, teach the three cases to someone else after 35 days.
4. **First-principles fallback** — Start from T(n,I), write the three set expressions (min, max, expectation), then apply asymptotic notation to each.

## 10. What this unlocks
You can now rigorously analyse any new algorithm (quicksort, hash tables, graph traversals) and know exactly which guarantee you are giving.

- Next topics: amortised analysis, competitive analysis, and smoothed analysis all build directly on these three cases.
- You will be able to read research papers that report “O(n log n) expected under random pivots” without confusion.

## 11. Self-check — five questions, no answers
1. For linear search, write the exact best-case, worst-case, and average-case comparison counts when the target is guaranteed to be present.
2. Why does the average-case analysis of quicksort require a random pivot or random input permutation assumption?
3. Give one concrete input distribution under which the average-case time of insertion sort becomes Θ(n log n).
4. A student claims “my algorithm is O(1) because best case is constant.” Identify the mistake and state the correct claim.
5. Using the same loop-counting method as Example 4, compute the exact leading constant for the average number of swaps performed by insertion sort on a random permutation.