## 1. The one-sentence answer
**A greedy algorithm repeatedly selects the locally optimal choice according to a simple, fixed rule, and this rule produces a globally optimal solution precisely when the problem exhibits both the greedy-choice property and optimal substructure.**

The rule never backtracks. It commits to each selection immediately and reduces the remaining instance to a smaller subproblem of the same form. For activity selection the rule is “pick the activity that finishes earliest.” For fractional knapsack it is “take as much as possible of the item with highest value density.” For Huffman coding it is “merge the two nodes with currently smallest frequencies.”  

Each rule is justified only after proving that some optimal solution can always be transformed to include the greedy choice without losing optimality. When that proof succeeds, the algorithm is correct and runs in near-linear time after an initial sort. When the proof fails, the same rule produces arbitrarily bad answers.

> [!NOTE]
> The decisive insight is that correctness is not automatic; it is a theorem that must be established for each new problem by exhibiting an exchange argument or a matroid structure.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network schedules hundreds of communication passes daily; the activity-selection algorithm (with minor priority extensions) produces the feasible schedule in milliseconds, freeing engineers to focus on link-margin calculations rather than combinatorial search.

Modern JPEG and PNG encoders still rely on Huffman coding to produce the final bit-stream after DCT or LZ77 stages; the same algorithm appears inside Google’s Brotli and Facebook’s Zstandard, shaving 5–15 % off web-page payloads that traverse every edge of the Internet.

Cloud object stores such as Amazon S3 and Google Cloud Storage decide how many parity shards to keep for each object. The underlying allocation problem reduces to a fractional-knapsack instance whose solution minimises expected storage cost while meeting durability SLAs of eleven nines.

In semiconductor place-and-route tools (Cadence Innovus, Synopsys IC Compiler), thousands of timing-critical nets must be buffered under a tight power budget. A greedy buffering pass ordered by slack and capacitance density routinely yields placements whose power is within 2 % of the integer-linear-program optimum while finishing in minutes rather than hours.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sorting by a total order | Every greedy rule begins by ordering candidate choices.   |
| Proof by contradiction   | The standard way to prove a greedy choice is safe.        |
| Binary tree traversals   | Huffman coding constructs and later decodes a prefix tree.|
| Priority queues          | Efficient implementation of Huffman and activity selection.|

## 4. Building the idea — from intuition to formalism

### Step 1 — The greedy template
Any greedy algorithm follows the same skeleton: sort candidates by an irrevocable key, then repeatedly accept the next candidate that remains feasible.  

Example: given activities with start and finish times, sort by finish time and accept the first feasible activity.  

Formally, let \(C\) be the set of candidates and \(\prec\) the ordering. The algorithm returns the sequence  
\[
S = \{c_1 \prec c_2 \prec \dots \prec c_k\}
\]  
where each \(c_i\) is feasible given \(S_{i-1}\).  

> [!WARNING]
> Using a different ordering (e.g., shortest duration) can produce a feasible but suboptimal set; the ordering itself must be proved safe.

### Step 2 — Greedy-choice property
A problem satisfies the greedy-choice property if, for every instance, some optimal solution contains the greedy choice.  

For activity selection the earliest-finishing activity belongs to at least one optimal schedule.  

> [!WARNING]
> The property is existential (“some” optimum), not universal (“every” optimum).

### Step 3 — Optimal substructure
After the greedy choice is taken, the residual problem must itself be optimal.  

Activity selection reduces to the subproblem consisting of all activities that start after the chosen finish time.  

Formally, if \(G(I)\) is the greedy choice on instance \(I\) and \(I'\) is the residual instance, then  
\[
OPT(I) = \{G(I)\} \cup OPT(I').
\]

### Step 4 — Exchange argument
To prove the greedy-choice property, assume an arbitrary optimum \(O\) that does not contain the greedy choice \(g\). Construct a new solution \(O'\) by swapping the conflicting element of \(O\) with \(g\); show \(O'\) is still feasible and has equal or better value.  

### Step 5 — Matroid or exchange closure (optional strengthening)
Many greedy problems are matroids; the hereditary and augmentation properties guarantee that the greedy algorithm always yields a maximum-weight independent set. Activity selection corresponds to the interval matroid.

### Step 6 — Concrete algorithms
- Activity selection: sort by finish time, scan once.  
- Fractional knapsack: sort by value/weight, fill until capacity exhausted.  
- Huffman coding: maintain a min-priority queue of frequencies; repeatedly merge the two smallest nodes until one root remains.

### Step 7 — Complexity
All three algorithms are \(O(n\log n)\) because of the initial sort (or \(O(n)\) after counting sort when keys are small integers).

### Step 8 — Textbook statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 16: “A greedy algorithm makes a locally optimal choice hoping it leads to a globally optimal solution; correctness follows when the problem possesses the greedy-choice property and optimal substructure.”

## 5. Worked examples — every step shown

**Example 1 — Activity selection**  
*Given:* Activities \((s_i,f_i)\): (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11).  
*Find:* Maximum number of non-overlapping activities.  

Sort by finish time: (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11).  
Select (1,4). Residual start \(\ge 4\): select (5,7). Residual start \(\ge 7\): select (8,11).  
*Why* each selection: earliest finish leaves the largest feasible suffix.  

**Answer**  
\{(1,4), (5,7), (8,11)\}

*Reflection:* The ordering by finish time, not start time, is what guarantees optimality.

**Example 2 — Fractional knapsack**  
*Given:* Capacity \(W=50\), items (value,weight): (60,10), (100,20), (120,30).  
*Find:* Maximum value.  

Densities: 6, 5, 4.  
Take all of first (value 60, weight 10).  
Take all of second (value 100, weight 20).  
Take 20/30 of third: value \(120\times\frac{2}{3}=80\).  
Total value \(60+100+80=240\).

*Why* the fractions: only the last item may be split; earlier items are taken whole because they have higher density.

**Answer**  
240

*Reflection:* The algorithm never needs to consider integer constraints; the fractional relaxation is exact.

**Example 3 — Huffman coding (full tree construction)**  
*Given:* Symbols A:5, B:9, C:12, D:13, E:16, F:45.  
*Find:* Prefix codes and weighted path length.  

Priority queue: 5,9,12,13,16,45.  
Merge 5+9=14. Queue: 12,13,14,16,45.  
Merge 12+13=25. Queue: 14,16,25,45.  
Merge 14+16=30. Queue: 25,30,45.  
Merge 25+30=55. Queue: 45,55.  
Merge 45+55=100.  

Tree yields codes: F:0 (len 1), E:10 (2), D:110 (3), C:1110 (4), B:11110 (5), A:11111 (5).  
Weighted path length: \(5\cdot5+9\cdot5+12\cdot4+13\cdot3+16\cdot2+45\cdot1=224\).

**Answer**  
224

*Reflection:* The two smallest nodes are always merged; this minimises the increase in total path length at every step.

**Example 4 — Mixed instance requiring all three ideas**  
*Given:* 4 activities, 3 items for knapsack, and 3 symbols; each subproblem solved independently then combined under a shared capacity constraint. (Details omitted for brevity; the pattern is identical to the three preceding examples.)

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Sorting by start time instead of finish | Intuition says “begin as early as possible” | Always prove the ordering with an exchange argument |
| Treating knapsack as 0-1 when fractional is allowed | Forgetting the problem statement permits fractions | Check whether items are divisible before coding |
| Using a FIFO queue for Huffman    | Forgetting that merges must always pick the current two minima | Use a binary heap or sorted linked list        |
| Forgetting to update residual capacity after each knapsack addition | Off-by-one in the loop                      | Maintain an explicit remaining-capacity variable |
| Assuming greedy works for interval graph colouring | Colouring is NP-hard; greedy ordering does not guarantee optimality | Verify matroid or substructure before claiming optimality |
| Ignoring equal-frequency ties in Huffman | Different trees may result; weighted length stays the same but codes differ | Any consistent tie-breaking rule is acceptable |
| Applying greedy to weighted activity selection without weights in the ordering | Earliest finish ignores profit              | Use dynamic programming instead              |

## 7. The textbook-precise statement
Let \(I\) be an instance of an optimisation problem. A greedy algorithm is correct if (1) the problem exhibits the greedy-choice property: there exists an optimal solution that contains the first greedy choice \(g(I)\), and (2) the problem exhibits optimal substructure: every optimal solution of the residual instance \(I'\) yields, together with \(g(I)\), an optimal solution of \(I\). Under these two conditions the algorithm that repeatedly selects \(g\) returns an optimal solution (Cormen et al., *Introduction to Algorithms*, 4e, Theorem 16.1).

## 8. Visual — diagram or schematic
```text
Activity selection timeline (finish-time order)
0   1   2   3   4   5   6   7   8   9  10  11
    [===A===]
        [==B==]
[=========C=========]
                [===D===]
                        [===E===]
                                [===F===]
Greedy picks: A (fin 4), D (fin 7), F (fin 11)
```
The horizontal bars represent intervals; the selected set is the one whose right endpoints are earliest among all feasible candidates at each step.

## 9. The memory technique

**The hook**  
Picture a greedy squirrel that always grabs the nearest acorn it can carry; because the forest is an interval matroid, the squirrel’s bag is guaranteed to be maximal.

**What to overlearn**  
1. Activity selection sorts by finish time.  
2. Fractional knapsack sorts by value/weight.  
3. Huffman repeatedly merges the two smallest frequencies.

**Spaced-repetition schedule**  
Review the three ordering rules at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the exchange argument: assume an optimum that omits the greedy choice, swap the conflicting element, and show feasibility and value are preserved.

## 10. What this unlocks
Mastery of these three canonical proofs lets you recognise when a new optimisation problem is amenable to greedy methods and, equally important, when it is not (e.g., 0-1 knapsack, weighted interval scheduling). The same proof techniques reappear in matroid theory, online algorithms, and approximation algorithms for set cover.

- Next: dynamic programming on the same problems to see the contrast.  
- Next: matroid intersection and weighted matroids.  
- Next: online competitive analysis of the ski-rental and paging problems.

## 11. Self-check — five questions, no answers
1. Prove that sorting activity selection by start time can produce a schedule whose size is only half of optimal.  
2. For the fractional-knapsack instance with items (value,weight) = (10,2), (10,3), (12,4) and capacity 5, compute both the greedy value and the optimal integer value.  
3. Draw the Huffman tree for frequencies 1,1,2,2,3 and give the resulting code lengths.  
4. In activity selection, if two activities finish at the identical time, which tie-breaking rule preserves optimality?  
5. Explain why the greedy algorithm for the 0-1 knapsack problem can be arbitrarily far from optimal; give a concrete counter-example with three items.