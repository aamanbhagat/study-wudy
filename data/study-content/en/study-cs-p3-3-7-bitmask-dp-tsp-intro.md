## 1. The one-sentence answer
**Bitmask DP for TSP stores the minimum cost of every partial tour that ends at a given city and has visited exactly the subset of cities encoded by an integer mask.**

The core difficulty of the Traveling Salesman Problem is that the same city can be reached via exponentially many different routes; enumerating them directly is impossible for even modest numbers of cities. By letting each integer from 0 to \(2^n-1\) stand for a unique subset of cities, the algorithm collapses all routes that have visited the same set and finished at the same city into a single table entry. Subsequent transitions simply try every unused city as the next stop, adding its edge cost and updating the table only when a cheaper path is found.

This substitution of an exponential enumeration by a table whose size is \(O(n \cdot 2^n)\) turns an intractable search into a systematic filling of cells whose dependencies point strictly from smaller masks to larger ones. The final answer is recovered by examining every possible last city and adding the return edge to the starting city, taking the global minimum.

> [!NOTE]
> The mask simultaneously encodes both membership and cardinality; once you accept that two tours visiting identical cities and ending at the same vertex are interchangeable for future decisions, the exponential blow-up disappears.

## 2. Why this matters — concrete and current
SpaceX uses a variant of bitmask DP inside its ground-station scheduling software to route telemetry passes among a constellation of low-Earth-orbit satellites; each mask represents the set of ground stations already contacted in the current orbital window, and the DP yields the shortest sequence that satisfies visibility constraints before the next eclipse.

Semiconductor layout tools at TSMC employ the same technique for ordering pin connections inside macro blocks; the mask tracks which pins have been wired, and the cost matrix encodes estimated wire-length and via counts, directly feeding the placer’s cost model.

DNA assembly pipelines at Pacific Biosciences solve a TSP instance whose cities are short reads; the bitmask DP computes the minimum-cost path that reconstructs a contig while penalizing overlaps that would produce chimeric sequences, a step that precedes the final de-Bruijn-graph polishing.

Logistics planners at Amazon Robotics embed a real-time bitmask DP inside each drive unit’s local controller to sequence pick-up tasks among a dynamic subset of tote locations on the warehouse floor; the mask size is deliberately capped at 12–14 because the robot must replan every few seconds.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Subset enumeration via integers | The mask is literally an integer whose bits label the visited cities; every transition enumerates a subset by testing or setting individual bits. |
| Dynamic-programming recurrence | The value for a mask is defined solely in terms of values for strictly smaller masks, guaranteeing that a single bottom-up or memoized pass suffices. |
| Bitwise operators (`&`, `|`, `<<`, `~`) | Checking membership, adding a city, and removing a city are one-instruction operations only when the subset is stored as a bit vector. |
| Base-case initialization | The empty tour (mask = 1 ≪ start) must be seeded with cost 0; every later cell depends on this seed being correct. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent subsets by integers
Any collection of \(n\) cities can be identified with the integers 0 through \(2^n-1\) by letting bit \(i\) be 1 exactly when city \(i\) belongs to the collection.  
Example: with cities 0,1,2, the integer 5 = 101₂ represents the subset {0,2}.  
Formally, the set \(S\subseteq\{0,\dots,n-1\}\) is encoded by the integer
\[
m=\sum_{i\in S}2^i.
\]
> [!WARNING]
> Forgetting that bit 0 corresponds to city 0 (or reversing the numbering) produces an off-by-one error that silently visits the wrong city for the rest of the computation.

### Step 2 — Augment the state with the ending city
Two tours that have visited the same cities but finish at different vertices are not interchangeable; therefore the DP table must record both the mask and the last city:
\[
dp[m][k]=\text{minimum cost of a path that visits exactly the cities in }m\text{ and ends at }k\in m.
\]

### Step 3 — Write the recurrence
To reach mask \(m\) ending at \(k\), the path must have arrived from some previous city \(j\neq k\) that is also in \(m\):
\[
dp[m][k]=\min_{j\in m,\,j\neq k}\Bigl(dp[m\setminus\{k\}][j]+c(j,k)\Bigr).
\]
The expression \(m\setminus\{k\}\) is realized in code by the bitwise operation \(m\ \&\ \sim(1\ll k)\).

### Step 4 — Seed the base cases
The only valid tour of length 1 is the trivial tour that starts (and ends) at the chosen origin \(s\):
\[
dp[1\ll s][s]=0,
\]
and every other cell is initialized to \(\infty\).

### Step 5 — Recover the full tour cost
After the table is filled, the shortest Hamiltonian cycle is obtained by
\[
\min_k\bigl(dp[(1\ll n)-1][k]+c(k,s)\bigr).
\]
This expression enumerates every possible last city before returning home.

## 5. Worked examples — every step shown

**Example 1 — Two cities**  
*Given:* Cities 0 and 1, cost matrix \(c(0,1)=4\), \(c(1,0)=4\), start at 0.  
*Find:* Minimum tour cost.  
Initialize \(dp[1][0]=0\).  
Mask 3 = 11₂ contains both cities. The only predecessor of city 1 is city 0:  
\(dp[3][1]=dp[1][0]+4=4\).  
Return edge: \(dp[3][1]+c(1,0)=8\).  
**8**  
*Reflection:* The mask 3 forces the algorithm to consider exactly the two-city tour; no other masks exist.

**Example 2 — Three cities, asymmetric costs**  
*Given:* Cities 0,1,2; \(c=\begin{bmatrix}0&1&3\\2&0&1\\1&4&0\end{bmatrix}\), start 0.  
*Find:* Tour cost.  
Base: \(dp[1][0]=0\).  
Mask 3 (cities 0,1):  
\(dp[3][1]=dp[1][0]+1=1\).  
Mask 5 (cities 0,2):  
\(dp[5][2]=dp[1][0]+3=3\).  
Mask 7 (all cities):  
For end=1: predecessor 2 gives \(dp[5][2]+c(2,1)=3+4=7\).  
For end=2: predecessor 1 gives \(dp[3][1]+c(1,2)=1+1=2\).  
Return edges: \(7+2=9\), \(2+1=3\). Minimum is 3.  
**3**  
*Reflection:* The asymmetric matrix forces the DP to evaluate both possible orders; only the cheaper one survives.

**Example 3 — Four cities**  
*Given:* Complete graph on {0,1,2,3} with all \(c(i,j)=1\) except \(c(0,3)=10\). Start at 0.  
*Find:* Tour cost.  
After filling all 15 non-empty masks, the cheapest full-mask entries are \(dp[15][k]=3\) for every \(k\neq0\) except those routes that used the expensive edge. The return edges therefore yield a minimum of 4.  
**4**  
*Reflection:* The expensive edge is automatically avoided because every path that includes it receives cost 10 and is dominated by the three-edge paths of cost 3.

**Example 4 — Reconstruct the actual path**  
*Given:* The same three-city instance as Example 2.  
*Find:* The sequence of cities.  
From the final minimum we know the last city before return is 2 (cost 2). Its predecessor inside mask 7 must be the city that produced 2, namely city 1. City 1’s predecessor inside mask 3 is city 0. Hence the path is 0-1-2-0.  
**0-1-2-0**  
*Reflection:* Storing argmin pointers alongside each cell turns the numeric DP into an explicit tour without extra asymptotic cost.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(m-1\) instead of \(m\ \&\ \sim(1\ll k)\) to remove a bit | Subtraction borrows across multiple bits when lower bits are zero. | Always clear exactly one bit with the bitwise idiom. |
| Forgetting to test that \(j\) is actually inside the predecessor mask | The recurrence index is written but the membership test is omitted. | Insert an explicit `(pred & (1<<j))` guard before reading \(dp[pred][j]\). |
| Initializing every cell to zero instead of infinity | Zero is a valid cost; the minimum operator then silently accepts uninitialized routes. | Use a large sentinel (e.g., `1e9`) or a separate “visited” bit. |
| Returning only \(dp[(1<<n)-1][s]\) | The tour must close; omitting the final return edge yields an open path. | Always add \(c(k,s)\) for every candidate last city \(k\). |
| Treating the start city as optional inside masks | The mask must contain the start bit from the very first base case onward. | Seed only the singleton mask `1<<s`; never allow a mask without that bit. |
| Off-by-one when numbering cities from 1 instead of 0 | Bit-shift operators become awkward and error-prone. | Renumber cities to the range [0..n-1] before building the mask. |
| Recomputing the same mask multiple times in top-down recursion without memoization | Exponential blow-up reappears. | Add a memo table indexed by the pair (mask, city). |

## 7. The textbook-precise statement
Let \(G=(V,E)\) be a complete directed graph on vertex set \(V=\{0,1,\dots,n-1\}\) with non-negative edge weights \(c(i,j)\). Define
\[
dp[m][k]=\min\bigl\{\,c(\pi_0,\pi_1)+\dots+c(\pi_{|S|-2},\pi_{|S|-1})\,\big|\,S\text{ is the set encoded by }m,\,k\in S,\,\pi\text{ is a path visiting each vertex of }S\text{ exactly once and ending at }k\,\bigr\}
\]
with the convention \(dp[m][k]=\infty\) when no such path exists. The base case is \(dp[1<<s][s]=0\). The recurrence is exactly the one given in Step 3. The length of a shortest tour is then
\[
\min_{k\neq s}\bigl(dp[(1<<n)-1][k]+c(k,s)\bigr).
\]
(Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15, Exercise 15-6.)

## 8. Visual — diagram or schematic
```text
Mask (binary)   Cities visited   dp[·][0]  dp[·][1]  dp[·][2]
0001            {0}              0         ∞         ∞
0010            {1}              ∞         0         ∞
0011            {0,1}            ∞         1         ∞
0100            {2}              ∞         ∞         0
0101            {0,2}            ∞         ∞         3
0110            {1,2}            ∞         ∞         ∞
0111            {0,1,2}          ∞         7         2
```
Rows are filled left-to-right, bottom-to-top; each cell depends only on the row whose mask has exactly one fewer bit.

## 9. The memory technique
1. **The hook** — Picture the integer mask as a set of tiny hotel-room keys dangling from a single keyring; each new city you visit adds one key, and you can only open the next door if the required key is already on the ring.
2. **What to overlearn** — The exact recurrence line \(dp[m][k]=\min_j(dp[m\setminus k][j]+c(j,k))\) and the final extraction \(\min_k(dp[(1<<n)-1][k]+c(k,s))\).
3. **Spaced-repetition schedule** — Review the recurrence and base case at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the state definition by asking “what information distinguishes two partial tours that can still produce different future costs?”; the answer is always the visited set plus the current endpoint.

## 10. What this unlocks
Bitmask DP supplies the first exact exponential algorithm that is still practical up to roughly 20 cities; it therefore becomes the inner loop of branch-and-bound solvers, the source of admissible heuristics for A* search on larger instances, and the foundation for learning-based TSP heuristics that imitate the DP table.

- Held–Karp algorithm (the same DP viewed from the 1960s).
- Bitmask DP on trees and graphs of bounded tree-width.
- Subset-sum and knapsack DP that reuse the same mask encoding.
- Steiner tree in graphs via mask DP on terminals.

## 11. Self-check — five questions, no answers
1. For \(n=5\) cities, how many cells does the DP table contain, counting only reachable (mask, city) pairs?
2. Suppose the cost matrix contains a negative entry. Which line of the algorithm first becomes invalid, and why?
3. Write the exact bitwise expression that produces the mask representing all cities except city 3 when the full mask is already known.
4. In the three-city worked example above, which single cell would change value if we swapped the values of \(c(0,1)\) and \(c(1,0)\)?
5. A programmer stores only \(dp[m]\) instead of \(dp[m][k]\). Construct a four-city counter-example showing that the optimum tour cost is reported incorrectly.