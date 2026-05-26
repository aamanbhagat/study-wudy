## 1. The one-sentence answer
**Greedy algorithms make the locally optimal choice at each step hoping it leads to a globally optimal solution for problems that exhibit optimal substructure and the greedy-choice property.**

Greedy algorithms solve optimization problems by always picking the choice that looks best right now, without reconsidering earlier decisions. Activity selection sorts intervals by finish time and picks the one that finishes earliest, allowing maximum remaining activities. Fractional knapsack sorts items by value-density and fills capacity continuously. Huffman coding repeatedly merges the two lowest-frequency nodes to build an optimal prefix code tree.

This works only when the problem satisfies two properties: optimal substructure (an optimal solution contains optimal solutions to subproblems) and greedy-choice property (a locally optimal choice can be extended to a globally optimal solution). When either property fails, greedy produces wrong answers.

> [!NOTE]
> The deepest insight is that greedy never backtracks; its power comes entirely from proving that the first greedy choice can always sit inside some optimal solution, after which induction finishes the argument.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network uses a greedy scheduler derived from activity selection to allocate antenna time among Mars rovers and deep-space probes; each 24-hour window must accommodate the maximum number of high-priority passes without overlap.

Google’s Borg cluster scheduler applies a fractional-knapsack-style greedy heuristic when packing containers onto machines: it ranks tasks by CPU/memory density and fills each machine until the residual capacity is minimized, achieving >90 % average utilization across tens of thousands of machines.

JPEG and PNG image encoders inside every browser and smartphone run Huffman coding (or its arithmetic-coding cousin) on quantized DCT coefficients; the resulting prefix codes reduce file size by 30–50 % without any loss of decoded pixels.

Modern semiconductor place-and-route tools from Synopsys and Cadence embed Huffman-style coding when compressing mask data for EUV lithography; the frequency-based tree minimizes the total number of e-beam shots, directly lowering mask-write time and cost per wafer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sorting (comparison or counting) | All three algorithms begin by sorting on a key (finish time, value/weight ratio, frequency). |
| Binary tree and prefix codes | Huffman coding constructs a binary tree whose leaf depths determine code lengths. |
| Proof by induction       | Correctness of every greedy algorithm rests on an inductive argument after the first greedy choice. |
| Priority queue / min-heap | Huffman’s repeated extraction of two minimum frequencies is O(n log n) only with a heap. |

If any row is unfamiliar, pause and master it before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the greedy choice
Aap har step par woh choice lete ho jo turant sabse behtar dikhti hai. Activity selection mein sabse pehle khatam hone wali activity choose karo. Fractional knapsack mein sabse badi value/weight wali item lo. Huffman coding mein do sabse chhoti frequencies ko merge karo.

Example: intervals (1,3), (2,4), (3,5). Earliest finish is (1,3).  
Formal: at each step select activity \(a_i\) with smallest finish time \(f_i\).

> [!WARNING]
> If the chosen key (finish time, density, frequency) is wrong, the entire solution collapses even though every later step looks locally correct.

### Step 2 — Prove the greedy-choice property
Dikhao ki koi bhi optimal solution S mein aapka greedy choice g replace kiya ja sakta hai bina optimality khoye. Activity selection ke liye: let S be optimal; let g be earliest-finishing activity; if S does not contain g, replace the first activity of S with g; the new set remains feasible and same size.

### Step 3 — Show optimal substructure
Baaki problem jo greedy choice ke baad bachti hai woh bhi optimal honi chahiye. Activity selection ke liye: subproblem on activities that start after \(f_g\) must itself be solved optimally.

### Step 4 — Write the algorithm skeleton
Sort once, then iterate once making irrevocable choices. For Huffman, replace the sort with a min-heap loop that runs n−1 times.

### Step 5 — Analyse time complexity
Activity selection and fractional knapsack are \(\Theta(n\log n)\) due to sorting. Huffman coding is \(\Theta(n\log n)\) because each of the n−1 merges costs O(log n) heap operations.

### Step 6 — State the theorem
Cormen et al., Introduction to Algorithms, 4e, Theorem 16.1: “The greedy algorithm for activity selection always produces an optimal solution.”

## 5. Worked examples — har step show karo

**Example 1 — Activity selection (small instance)**  
*Given:* activities A(1,3), B(2,4), C(3,5), D(0.5,6).  
*Find:* maximum number of non-overlapping activities.  
Sort by finish time: A(3), B(4), C(5), D(6).  
Pick A. Next candidate must start ≥3; B starts at 2 (reject), C at 3 (accept).  
D starts at 0.5 (reject).  
**Optimal set: A,C**  
*Why:* sorting guarantees earliest finish is considered first; each acceptance maximises residual time.

**Example 2 — Fractional knapsack**  
*Given:* capacity W=10, items (value,weight): (60,5), (100,10), (120,15).  
*Find:* maximum value.  
Densities: 12, 10, 8. Sort descending.  
Take all of first (value 60, weight 5). Remaining W=5.  
Take half of second: 5/10 of 100 = 50.  
Total value 110.  
**Answer: 110**  
*Why:* fractional allowance lets us use every unit of capacity at the highest possible density.

**Example 3 — Huffman coding frequencies**  
*Given:* symbols A:5, B:9, C:12, D:13, E:16, F:45.  
*Find:* optimal prefix codes and weighted path length.  
Use min-heap. Repeatedly merge two smallest: 5+9=14, then 12+13=25, then 14+16=30, then 25+30=55, finally 55+45=100.  
Tree yields codes: F:0 (1 bit), E:10, D:110, C:1110, B:11110, A:11111.  
Weighted path length = 5·5 + 9·5 + 12·4 + 13·3 + 16·3 + 45·1 = 224.  
**Answer: 224 bits**  
*Why:* lowest-frequency symbols receive longest codes; every merge preserves optimality by the greedy choice property.

**Example 4 — Mixed trap instance**  
*Given:* same activities as Example 1 but add E(4,4.5).  
Greedy still picks A then C (finish 5). E overlaps C. Optimal remains A,C.  
If student wrongly sorts by start time, picks D then nothing else — suboptimal.  
**Answer: still A,C**  
*Reflection:* the example shows that an incorrect sorting key immediately produces a non-optimal set, illustrating why the proof in Step 2 is mandatory.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sorting by start time instead of finish time | Intuition says “start early” but ignores blocking later activities | Always prove the greedy key on paper before coding |
| Treating knapsack as 0-1 when fractional is allowed | Problem statement omitted the word “fractional” | Check problem constraints twice; fractional allows breaking items |
| Using array instead of heap for Huffman | O(n²) merges feel acceptable for n≤1000 | Remember n can be 10⁵ symbols in compression; heap is required |
| Forgetting to prove greedy-choice property | Students copy pseudocode without proof | Write the two-line exchange argument every time |
| Assuming all items fit when W is small | Overflow in residual capacity calculation | Use floating-point or scaled integers consistently |
| Stopping Huffman early when two nodes remain | Off-by-one in loop count | Run exactly n−1 merges for n symbols |
| Ignoring prefix-free requirement | Codes look short but break instantaneous decoding | Verify no code is prefix of another after tree construction |

## 7. The textbook-precise statement
An optimization problem exhibits the **greedy-choice property** if there exists an optimal solution that contains the greedy choice. It exhibits **optimal substructure** if an optimal solution to the problem contains optimal solutions to subproblems. When both hold, the greedy algorithm that repeatedly selects the locally optimal choice and solves the remaining subproblem optimally returns a globally optimal solution (Cormen et al., *Introduction to Algorithms*, 4e, §16.1–16.3).

## 8. Visual — diagram or schematic
```
Activity timeline (finish-time order)
Time: 0    1    2    3    4    5    6
       [A       ]
            [B      ]
                 [C     ]
                      [D            ]
Selected: A (ends 3) then C (ends 5)
```

## 9. The memory technique

1. **The hook** — Picture a greedy squirrel that always grabs the nearest acorn; if the forest has the “earliest-finish” ordering, the squirrel ends up with the largest pile.  
2. **What to overlearn** — Activity selection sorts by finish time; fractional knapsack sorts by value/weight; Huffman performs n−1 min-heap merges.  
3. **Spaced-repetition schedule** — Review the three sorting keys after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — If the algorithm is forgotten, re-derive by writing the exchange argument: replace any non-greedy choice with the greedy one and show feasibility and value do not decrease.

## 10. What this unlocks
Mastery of these three problems lets you recognise the same pattern in interval scheduling, task sequencing with deadlines, and optimal merge patterns. It directly prepares you for matroid theory, approximation algorithms (set cover), and the design of custom greedy heuristics inside compilers and databases.

- Interval graph colouring
- Kruskal’s MST (another greedy proof)
- Dijkstra’s algorithm (greedy on distance labels)
- Online median maintenance with two heaps

## 11. Self-check — five questions, no answers
1. For activities (1,4), (2,3), (3,5), which set does greedy return and is it optimal?  
2. In fractional knapsack, item densities are 5, 4, 9; capacity 7. Compute maximum value.  
3. Draw the Huffman tree for frequencies 2,3,5,7 and give the code for the symbol of frequency 7.  
4. Why does sorting by start time fail on the counter-example in Section 5?  
5. State the exact loop invariant used in the proof of activity-selection optimality.