## 1. The one-sentence answer
**Binary search locates a target in a sorted array by repeatedly halving the search interval in O(log n) time, and the same halving principle extends to rotated sorted arrays once the pivot region is identified.**

The algorithm rests on one invariant: after each comparison the target can lie in only one of the two halves. Because the array is ordered, the comparison immediately discards the impossible half, shrinking the interval by roughly half each step. After k steps the interval length is at most n/2^k; it reaches size 1 after O(log n) steps.

The same invariant holds for a rotated sorted array once an extra test determines which side of the midpoint remains sorted. The search then proceeds on the sorted side or on the unsorted side that must contain the target, preserving the logarithmic bound.

> [!NOTE]
> The decisive insight is that the ordering information lets you discard half the remaining candidates with a single comparison; without ordering you cannot discard anything and the cost reverts to linear.

## 2. Why this matters — concrete and current
In the Linux ext4 file system the directory index uses a hashed B-tree whose leaf lookup is a binary search over a sorted block; every file open therefore performs several binary searches inside the kernel.  
SpaceX’s onboard flight software maintains a sorted table of trajectory waypoints; attitude-control loops invoke binary search at 100 Hz to retrieve the nearest reference point, guaranteeing deterministic latency under 10 µs on the radiation-hardened processor.  
Google’s LevelDB and its descendant RocksDB store SSTable index blocks as sorted key lists; every read request executes binary search inside the block before falling back to a Bloom filter, directly affecting tail latency of production databases serving billions of queries daily.  
In semiconductor timing analysis, Synopsys PrimeTime performs binary search over millions of cell delay tables to solve the static-timing equations for a 5 nm chip; each search must finish inside the allotted 0.1 ms budget per path to keep full-chip analysis tractable.  
Modern CPU branch predictors store recent branch outcomes in a sorted circular buffer; the predictor performs a binary search to locate the most recent occurrence of the same program counter, enabling the O(log n) lookup required by the 4 GHz pipeline.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Random-access array      | Enables O(1) retrieval of any index inside the current interval |
| Total order (≤, =, ≥)    | Guarantees that a comparison at the midpoint safely discards one side |
| Integer division & overflow handling | Midpoint formula (low + high) / 2 must not overflow or produce off-by-one errors |
| Base-case termination    | Search ends when interval length becomes 0 or 1; missing this produces infinite loops |

## 4. Building the idea — from intuition to formalism

### Step 1 — The halving invariant
If the array is sorted, comparing the target against the middle element tells you whether the target lies entirely to the left or entirely to the right of that element.  
Example: array [1, 3, 5, 7, 9], target = 7. Middle value 5 < 7, therefore the answer cannot be in [1, 3, 5].  
Formally, after the comparison the feasible interval shrinks from size m to size ⌊m/2⌋.  
> [!WARNING]  
> Treating the two sides symmetrically when duplicates exist can discard the only occurrence of the target.

### Step 2 — Midpoint calculation
The index of the middle element is computed as low + (high − low) / 2 to avoid integer overflow.  
In an interval [low, high] the formula yields an index strictly inside the interval for any high > low.  
> [!WARNING]  
> Using (low + high) / 2 on 32-bit integers when low and high are both near 2^31 − 1 produces overflow and an invalid negative index.

### Step 3 — Iterative loop structure
Maintain two indices low and high. While low ≤ high, compute mid, compare, and set either high = mid − 1 or low = mid + 1. The loop terminates when the interval collapses.  
The number of iterations is at most ⌈log₂(n + 1)⌉ because the interval length halves each time.

### Step 4 — Recursive formulation
The same logic is expressed by a tail-recursive call on the chosen sub-interval. The base case returns −1 when low > high. Recursion depth is O(log n) and can be converted to iteration by a compiler.

### Step 5 — Extension to rotated arrays
A rotated sorted array still contains two sorted segments separated by a pivot. After computing mid, test whether A[mid] lies in the left or right sorted segment by comparing A[mid] with A[low]. The target is then searched only inside the segment that can contain it, preserving the halving invariant.

### Step 6 — Complexity derivation
Let T(n) be the worst-case comparisons. Then T(n) ≤ T(⌈n/2⌉) + 1 with T(1) = 1. Unrolling yields T(n) ≤ 1 + log₂ n, hence T(n) = Θ(log n).

### Step 7 — Textbook statement
Binary search returns the index of a target value inside a sorted or rotated-sorted array, or reports absence, after Θ(log n) comparisons.

## 5. Worked examples — every step shown

**Example 1 — Standard sorted array**  
*Given:* A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23.  
*Find:* index of 23 or −1.  
low = 0, high = 9 → mid = 4, A[4] = 16 < 23 → low = 5.  
*Why:* target must be after 16.  
low = 5, high = 9 → mid = 7, A[7] = 56 > 23 → high = 6.  
*Why:* target must be before 56.  
low = 5, high = 6 → mid = 5, A[5] = 23 = 23 → return 5.  
**5**  
*Reflection:* The three comparisons halved a 10-element interval exactly as predicted by log₂ 10 ≈ 3.3.

**Example 2 — Target absent**  
*Given:* same array, target = 13.  
low = 0, high = 9, mid = 4 (16 > 13) → high = 3.  
low = 0, high = 3, mid = 1 (5 < 13) → low = 2.  
low = 2, high = 3, mid = 2 (8 < 13) → low = 3.  
low = 3, high = 3, mid = 3 (12 < 13) → low = 4.  
low > high → return −1.  
**−1**  
*Reflection:* The final interval collapse proves absence without ever examining every element.

**Example 3 — Rotated array, target on sorted side**  
*Given:* A = [15, 18, 2, 5, 7, 9, 12], target = 5.  
low = 0, high = 6, mid = 3, A[3] = 5 equals target → return 3.  
**3**  
*Reflection:* Early match inside the rotated segment still terminates in constant time.

**Example 4 — Rotated array, target requires pivot logic**  
*Given:* A = [4, 5, 6, 7, 0, 1, 2], target = 0.  
low = 0, high = 6, mid = 3, A[3] = 7 > A[0] so left half [4..7] is sorted; 0 not inside it → search right.  
low = 4, high = 6, mid = 5, A[5] = 1 > 0 → high = 4.  
low = 4, high = 4, A[4] = 0 → return 4.  
**4**  
*Reflection:* One extra comparison at the first midpoint correctly identified the unsorted side containing the target.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Infinite loop               | low/high update leaves interval unchanged   | Always move low or high strictly past mid            |
| Off-by-one on last element  | Using < instead of ≤ in loop condition      | Standardise on while low ≤ high                      |
| Midpoint overflow           | (low + high) / 2 on large indices           | Write low + (high − low) / 2                         |
| Ignoring rotation pivot     | Treating rotated array as fully sorted      | Test A[mid] ≥ A[low] before deciding search side     |
| Duplicate handling          | Assuming unique elements                    | Decide whether to return any or leftmost occurrence  |
| Negative indices in recursion | Base case low > high never reached         | Explicit return −1 when low > high                   |
| Assuming 0-based vs 1-based | Language indexing mismatch                  | Document index convention at the start of every implementation |

## 7. The textbook-precise statement
Let A[0..n−1] be an array that is either strictly increasing or strictly increasing after a single left rotation. Binary search returns the unique index i such that A[i] = target, or −1 if no such i exists. The algorithm maintains the invariant that if the target exists it lies inside [low, high]; each iteration halves the interval length, guaranteeing termination after at most ⌈log₂(n+1)⌉ comparisons (Cormen et al., *Introduction to Algorithms*, 4e, §2.3.1 and exercise 2.3-5).

## 8. Visual — diagram or schematic
```text
Initial interval          [L----------------M----------------H]
After first comparison     [L--------M--------H]   discarded
After second               [L----M----H]           discarded
After third                [L-M-H]                 discarded
Final                      [L=H] → answer or −1
```
Each arrow represents one comparison that discards half the current candidates. The diagram is drawn for any power-of-two length; the same halving pattern holds for arbitrary n.

## 9. The memory technique
1. **The hook** — Picture a librarian who tears the book in half at the middle page, throws away the irrelevant half, and repeats; the pile of discarded pages grows exponentially while the remaining book shrinks to a single page in log n tears.  
2. **What to overlearn** — The loop condition “while low ≤ high”, the safe midpoint formula, and the rotated-array test “if A[mid] ≥ A[low]”.  
3. **Spaced-repetition schedule** — Review the four worked examples after 1 day, redraw the halving diagram after 3 days, implement both iterative and recursive versions from memory after 7 days, solve a rotated-array problem after 16 days, and re-derive Θ(log n) after 35 days.  
4. **First-principles fallback** — Start from the definition of a sorted array, write the single comparison that discards half the interval, then count how many times you can repeat that step before the interval length reaches 1.

## 10. What this unlocks
Binary search is the canonical divide-and-conquer primitive. It directly yields efficient implementations of lower_bound / upper_bound, the basis for set and map data structures, and the decision procedure inside quickselect and quicksort. It also supplies the model for all later logarithmic algorithms on trees (BST search, segment trees) and for the analysis of any algorithm whose recurrence is T(n) = T(n/2) + Θ(1).

## 11. Self-check — five questions, no answers
1. In a 1025-element sorted array, what is the exact maximum number of comparisons performed by binary search?  
2. Write the three-line change needed to convert the standard iterative binary search into one that returns the leftmost occurrence of a duplicate target.  
3. For the rotated array [6,7,1,2,3,4,5] and target 2, list the sequence of midpoints examined.  
4. Why does the loop “while low < high” sometimes return the wrong answer on a single-element array?  
5. Derive the exact constant hidden by the big-O notation for the number of comparisons on an array of length 2^k − 1.