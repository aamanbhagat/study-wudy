## 1. The one-sentence answer
**Bottom-up O(n) heapify builds a heap by calling sift-down on every non-leaf node starting from the last one and moving upward, achieving linear time instead of the naïve O(n log n).**

Aap already jaante hain ki ek complete binary tree mein last non-leaf node floor((n-2)/2) index par hota hai. Iske neeche sab leaves hain, unhe touch karne ki zarurat nahi. Har sift-down operation tree ki height ke hisaab se time leta hai, lekin neeche wale nodes ki height bahut kam hoti hai, isliye total cost O(n) ban jaati hai.

Yeh approach tab useful hoti hai jab aapko ek unsorted array ko ek baar mein heap banana ho, jaise priority queue initialise karte waqt. Har level par nodes ki sankhya double hoti hai jabki unki height ek kam hoti hai, is balance ki wajah se linear time milta hai.

> [!NOTE]
> The core aha moment yeh hai ki sift-down cost har node ke liye uski height ke hisaab se hoti hai, aur nodes ki sankhya height ke saath exponentially badhti hai, isliye sum n-1 + (n-1)/2 + (n-1)/4 + … = O(n) ban jaata hai.

## 2. Why this matters — concrete and current
In Linux CFS scheduler, the runqueue is maintained as a red-black tree but the underlying priority decisions often rely on a heap built once in O(n) from an array of task priorities during context-switch heavy workloads; this avoids per-task O(log n) insertions when thousands of tasks wake up together.

In CUDA-based graph analytics libraries such as Gunrock, the frontier queue for BFS or SSSP is materialised as a heap; the bottom-up build is used once per superstep on GPU memory so that the subsequent extract-min operations stay efficient without paying repeated log factors during the initial frontier construction.

Modern database engines like PostgreSQL’s parallel sort use a heap to merge sorted runs; the O(n) build-heap step is invoked on each worker’s local run before the final merge phase, directly affecting query latency on terabyte-scale TPC-H benchmarks.

In high-frequency trading systems at firms such as Jane Street, order-book priority queues are rebuilt from scratch after every market-data snapshot; the linear-time construction guarantees that the rebuild stays inside the 10-microsecond budget even when the book contains tens of thousands of price levels.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Complete binary tree     | Heap must occupy array indices 1…n without gaps           |
| Max-heap / min-heap property | Defines the invariant that sift-down restores           |
| Array indexing for trees | Parent = i/2, children = 2i and 2i+1 (1-based)            |
| Sift-down (heapify)      | The primitive operation whose cost we sum to O(n)         |

Agar aap inme se koi bhi weak feel kar rahe hain to pehle “Binary heap basics” aur “Sift-down operation” padh lijiye.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the last non-leaf node
Aap observe karte hain ki leaves ko kabhi bhi sift-down nahi karna padta kyunki unke neeche kuch nahi hota. Isliye hum sirf index floor(n/2) tak jaate hain (1-based).

Example: n = 7 array ke liye last non-leaf index 3 hai.

Formal statement:  
$$ \text{lastNonLeaf} = \left\lfloor \frac{n}{2} \right\rfloor $$

> [!WARNING]
> Agar aap lastNonLeaf galat calculate karte hain (zero-based vs one-based confusion) to leaves par bhi sift-down call ho jaayega aur time waste hoga.

### Step 2 — Walk from last non-leaf to root
Har node i ke liye sift-down(i) call karo jab tak i >= 1. Yeh bottom-up direction hai.

Example: indices 3,2,1 par successively sift-down.

Formal: for i = floor(n/2) downto 1 do siftDown(i).

> [!WARNING]
> Top-down order (1 se n/2 tak) sub-heaps ko pehle fix nahi karta, isliye invariant toot jaata hai.

### Step 3 — Cost of a single sift-down at height h
Ek node jo height h par hai, uska sift-down worst-case 2h comparisons leta hai (kyunki har level par do children compare karne padte hain).

### Step 4 — Count nodes at each height
Ek complete binary tree mein height h = floor(log n) wale level par at most 2^h nodes hote hain.

### Step 5 — Sum the total cost
Total cost = sum_{h=0}^{floor(log n)} (number of nodes at height h) * O(h)  
= sum h * 2^{floor(log n)-h} = O(n).

### Step 6 — Reach the textbook bound
The summation converges to less than 2n, giving the clean O(n) result.

## 5. Worked examples — har step show karo

**Example 1 — Tiny array of size 3**  
*Given:* A = [-, 4, 2, 7] (1-based)  
*Find:* Build max-heap bottom-up.  

Last non-leaf = 1.  
siftDown(1): 4 < 7, swap → [-,7,2,4].  
**Final heap:** [-,7,2,4]  
*Why:* Only one non-leaf existed; single comparison sufficed.

*Reflection:* Trivial case shows that leaves are never touched.

**Example 2 — Size 7, one level deeper**  
*Given:* A = [-,1,3,5,7,9,11,13]  
*Find:* Bottom-up build.  

lastNonLeaf=3.  
siftDown(3): 5<13 → [-,1,3,13,7,9,11,5]  
siftDown(2): 3<11 → [-,1,11,13,7,9,3,5]  
siftDown(1): 1<13 → [-,13,11,1,7,9,3,5] then 1<9 swap → [-,13,11,9,7,1,3,5]  
**Final heap:** [-,13,11,9,7,1,3,5]  
*Why:* Each sift-down only descended as far as its own height required.

*Reflection:* Demonstrates cost asymmetry between root and leaves.

**Example 3 — Already heap**  
*Given:* Perfect max-heap of size 7.  
Bottom-up calls still run but every sift-down stops immediately.  
**Final answer remains identical.**  
*Why:* Shows that algorithm is correct even when no swaps occur.

*Reflection:* Worst-case analysis does not equal average-case behaviour.

**Example 4 — Size 10 (non-power-of-two)**  
*Given:* A = [-, 4,1,3,2,16,9,10,14,8,7]  
After processing indices 5 downto 1 we obtain the standard max-heap shown in CLRS.  
**Final array:** [-,16,14,10,8,7,9,3,2,4,1]  
*Why:* The extra three leaves on the last level never participate.

*Reflection:* Works for any n, not just 2^k-1.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using 0-based indexing without adjustment | Most languages are 0-based                  | Decide once: either add 1 sentinel or map formulas carefully |
| Calling heapify on leaves   | Miscalculating lastNonLeaf                  | Always set i = n//2 (integer division)       |
| Assuming every sift-down costs log n      | Forgetting height decreases                 | Write the summation explicitly               |
| Forgetting to restore heap property after last swap in extract-max | Separate concern but related                | Keep build-heap and extract-max implementations distinct |
| Off-by-one in child index 2*i+1           | 1-based vs 0-based mix-up                   | Draw the tree on paper for first 10 nodes    |
| Rebuilding from scratch every time        | Not caching the O(n) result                 | Memoise the heap when input array is static  |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 6, Theorem 6.3:  
Given an arbitrary array A[1..n], the procedure BUILD-MAX-HEAP(A) produces a max-heap in O(n) time. The procedure calls MAX-HEAPIFY(A,i) for i = floor(n/2) downto 1. The proof bounds the total cost by summing h·⌈n/2^{h+1}⌉ over h = 0 to floor(log n), which is strictly less than 2n.

## 8. Visual — diagram or schematic
```
Index:  1      2      3      4   5   6   7
Value:  16    14     10     8   7   9   3
Tree:
          16
       /      \
     14        10
    /  \      /  \
   8    7    9    3
Last non-leaf = 3; sift-down order: 3→2→1
```

## 9. The memory technique
1. **The hook** — Imagine pouring concrete from the roof of a pyramid; it is impossible, so you start at the base and work upward—exactly the order of heapify calls.
2. **What to overlearn** — lastNonLeaf = n//2 and total cost < 2n.
3. **Spaced-repetition schedule** — Review the summation proof at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the sum ∑ h·2^{log n - h} by letting k = log n - h and recognising the arithmetico-geometric series.

## 10. What this unlocks
Once you can build a heap in linear time you can implement heapsort in O(n log n) end-to-end and initialise Dijkstra’s or Prim’s priority queue without paying an extra log n factor per vertex.

- Heapsort
- O(1) amortised insert via build-heap + lazy inserts
- External-memory priority queues
- Bottom-up merging in Huffman coding

## 11. Self-check — five questions, no answers
1. For n = 1 000 000 what is the exact index of the last non-leaf node?
2. Why does the height of nodes at the bottom-most internal level equal 1, not 0?
3. Compute the exact number of comparisons performed by BUILD-MAX-HEAP on a strictly decreasing array of size 7.
4. If you mistakenly call sift-down from 1 to n//2 instead of n//2 downto 1, which heap property first breaks and on which node?
5. Prove that the total cost is strictly less than 2n using the closed-form sum of the series.