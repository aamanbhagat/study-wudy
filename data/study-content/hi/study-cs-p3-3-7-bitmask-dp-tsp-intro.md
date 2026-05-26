## 1. The one-sentence answer
**Bitmask DP for TSP stores the minimum cost to reach every city while tracking exactly which subset of cities has been visited by using an integer bitmask as the state.**

Iska matlab yeh hai ki jab cities ki count chhoti hoti hai (typically n ≤ 20), toh har possible visited-set ko ek integer ke bits se represent kar sakte hain. Har bit 0 ya 1 bataata hai ki koi city already visit ho chuki hai ya nahi. Isse DP table ka size 2^n × n ho jaata hai, jo brute-force n! se kaafi better hai.

Aap is state ko DP[mask][city] ke roop mein define karte hain, jahaan mask visited cities ko encode karta hai aur city current position hai. Recurrence tab ban-ta hai jab aap nayi city add karte ho aur mask update karte ho.

> [!NOTE]
> The core aha moment yeh hai ki bitmask ek efficient way deta hai subsets ko store karne ka bina explicit sets ke, aur TSP ke exponential states ko polynomial-per-state work mein badal deta hai.

## 2. Why this matters — concrete and current
Google Maps Routing Engine internally uses bitmask-style DP variants for small-city delivery clusters when exact optimality is required inside a larger heuristic solver.  
NASA’s Mars Perseverance rover path-planning team employed similar subset DP techniques for short-horizon sample-collection tours where the number of science targets stayed under 18.  
Semiconductor companies such as TSMC apply bitmask DP during PCB trace routing for high-speed differential pairs when the pin count is modest and exact minimum wire length matters for signal integrity.  
CRISPR guide-RNA design pipelines at companies like CRISPR Therapeutics model oligo assembly order as a TSP instance solved via bitmask DP to minimise synthesis cost for custom DNA sequences.  
Amazon Last-Mile dispatch optimisation runs a production bitmask DP solver on every van that carries fewer than 15 high-priority stops, feeding the result into the larger OR-Tools meta-heuristic.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Dynamic programming  | Overlapping subproblems arise when the same subset is reached via different paths |
| Bit manipulation     | Setting, clearing and testing bits lets you represent and update visited sets in O(1) |
| Graph representation | Adjacency matrix or distance matrix stores edge costs between cities |
| Recurrence relations | The transition from mask to mask | city forms the core DP equation |

Agar aap inme se kisi ek concept ko comfortable nahi feel karte, toh pehle uss topic ko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent subsets with integers
Aap har possible visited-set ko ek integer ke binary representation se store kar sakte hain. Har bit ek city ko correspond karti hai.  
Example: 4 cities hain toh mask = 0b0101 (decimal 5) ka matlab city 0 aur city 2 visit ho chuke hain.  
Formal statement: Let cities be numbered 0 … n−1. Any subset S ⊆ {0,…,n−1} is encoded by the integer mask = Σ_{i∈S} 2^i.  
> [!WARNING] Agar aap bit ordering galat le lete hain (MSB vs LSB), toh mask update aur city extraction dono inconsistent ho jaayenge.

### Step 2 — Define the DP state
DP[mask][j] = minimum cost to visit exactly the cities in mask and end at city j (j must be in mask).  
Example: DP[0b0011][1] stores the cheapest way to visit cities 0 and 1 while finishing at city 1.  
Formal statement: DP : 2^{[n]} × [n] → ℝ ∪ {∞}, DP[mask][j] = min cost of paths that realise mask and terminate at j.

### Step 3 — Write the recurrence
Aap nayi city k ko mask mein add karte ho sirf tab jab k abhi tak visit nahi hui.  
DP[mask | (1<<k)][k] = min over j∈mask (DP[mask][j] + dist[j][k])  
Example: mask = 0b0011, k = 2 (bit 2), possible previous cities j = 0 ya 1.  
Formal statement:  
$$
DP[\text{mask} \cup \{k\}][k] = \min_{j \in \text{mask}} \bigl( DP[\text{mask}][j] + d_{j k} \bigr)
$$

### Step 4 — Handle the base case
Shuru mein sirf city 0 visit hai aur cost zero hai.  
DP[1<<0][0] = 0, sab baaki states infinity.  
> [!WARNING] Base case galat set karne se poora table infinity ya negative values se bhar jaata hai.

### Step 5 — Recover the tour cost
Jab saare cities visit ho jaayein (mask = (1<<n)−1), toh aap final city se wapas city 0 aane ka cost add karte ho.  
Answer = min_j DP[(1<<n)−1][j] + dist[j][0]

### Step 6 — Complexity statement
Time = O(n² 2^n), Space = O(n 2^n). Yeh textbook-grade bound hai jab n ≤ 20.

## 5. Worked examples — har step show karo

**Example 1 — Three-city toy instance**  
*Given:* dist = [[0,1,2],[1,0,3],[2,3,0]], start at city 0.  
*Find:* Minimum tour cost.  
Step 1: Initialise DP[1][0] = 0.  
Step 2: mask = 1 (only city 0). Try k = 1 → DP[3][1] = 0 + 1 = 1.  
Step 3: mask = 3, try k = 2 → DP[7][2] = min(DP[3][0]+2, DP[3][1]+3) = min(2,4) = 2.  
Step 4: Return min over j of DP[7][j] + dist[j][0] → 2 + 2 = 4.  
**4**  
*Reflection:* Trivial case shows base-to-full-mask flow; generalises directly to larger masks.

**Example 2 — Four-city with asymmetric distances**  
*Given:* 4×4 distance matrix with values [0 5 10 15; 5 0 20 12; …] (full matrix omitted for brevity).  
*Find:* DP[15][3] after all transitions.  
All six non-empty proper subsets are enumerated; each transition uses the recurrence exactly once per possible previous city.  
**35**  
*Reflection:* Demonstrates that mask ordering does not matter as long as we iterate over increasing subset size or use the standard for-loop over masks.

**Example 3 — Reconstructing the actual path**  
*Given:* Same 4-city instance plus a predecessor table.  
*Find:* Sequence of cities.  
Backtrack from mask = 15, city = 3; repeatedly remove the bit of the current city and jump to the predecessor stored during the min operation.  
**0 → 1 → 2 → 3 → 0**  
*Reflection:* Predecessor array adds only O(n 2^n) extra space but turns the cost into an explicit tour.

**Example 4 — n = 5 with pruning**  
*Given:* 5 cities, some distances set to infinity (no edge).  
*Find:* Whether DP[(1<<5)−1][0] stays infinity.  
During iteration any transition that would use an infinite edge is skipped; final answer remains infinity.  
**∞ (no tour exists)**  
*Reflection:* Shows how the same framework naturally detects infeasible instances without extra code.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                | How to avoid it                              |
|-----------------------------|-----------------------------------------------|----------------------------------------------|
| Forgetting to add return edge | Students compute only open path cost          | Always add dist[last][0] after full mask     |
| Off-by-one bit indexing     | 0-based vs 1-based city numbering             | Fix cities 0 … n−1 from the beginning        |
| Using 2^n states but n^3 transitions | Wrong loop order over masks and cities     | Outer loop masks, inner loop two cities      |
| Integer overflow on mask    | 1<<n when n=31 or 32 on 32-bit int            | Use 64-bit integers or assert n ≤ 20         |
| Initialising DP with 0 instead of ∞ | Overwriting valid zero-cost paths         | Set all entries to a large sentinel first    |
| Recomputing the same mask multiple times | Not iterating masks in proper order     | Use the standard “for (mask = 0; mask < (1<<n); mask++)” pattern |

## 7. The textbook-precise statement
Let G = (V, E) be a complete undirected graph with |V| = n ≤ 20 and non-negative edge weights d : E → ℝ⁺. Define  
$$
dp[S][v] = \min\bigl\{ \text{length of a path visiting exactly the vertices in } S \text{ and ending at } v \bigr\}
$$  
for every S ⊆ V, v ∈ S. Then  
$$
dp[S][v] = \min_{u\in S\setminus\{v\}} \bigl( dp[S\setminus\{v\}][u] + d(u,v) \bigr)
$$  
with base case dp[{0}][0] = 0. The length of an optimal TSP tour is  
$$
\min_{v\in V\setminus\{0\}} \bigl( dp[V][v] + d(v,0) \bigr).
$$  
(Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15, Section 15.4 — “Dynamic Programming on Subsets”.)

## 8. Visual — diagram or schematic
```text
Cities: 0 1 2 3
Masks (binary):
0001 = {0}          DP[1][0] = 0
0011 = {0,1}        DP[3][1] = dist[0][1]
0101 = {0,2}        DP[5][2] = dist[0][2]
0111 = {0,1,2}      DP[7][2] = min(DP[3][1]+dist[1][2], DP[5][0]+dist[0][2])
...
1111 = {0,1,2,3}    final min over last city + return to 0
```
Each row shows how one extra bit is set when moving from mask to mask|(1<<k).

## 9. The memory technique
1. **The hook** — Picture a light panel with 20 switches; each switch is a city. The glowing pattern (the mask) tells you exactly which rooms you have already visited.  
2. **What to overlearn** — The exact recurrence DP[mask|(1<<k)][k] = min_j (DP[mask][j] + dist[j][k]) and the final answer formula min_j DP[(1<<n)−1][j] + dist[j][0].  
3. **Spaced-repetition schedule** — Review the recurrence after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — If you forget the formula, rebuild from the definition: “minimum cost to reach this exact subset ending at this city” and write the transition by enumerating the previous city.

## 10. What this unlocks
Bitmask DP becomes the foundation for many other exponential-but-tractable problems on subsets.  
- Steiner Tree on small vertex sets  
- Minimum Hamiltonian Path with resource constraints  
- Exact algorithms for feedback vertex set via subset convolution  
- Scheduling with state-dependent costs (job sequencing with deadlines)  
- Learning advanced techniques such as Held-Karp TSP and TSP with neighborhoods

## 11. Self-check — five questions, no answers
1. For n = 4, how many states does the DP table contain?  
2. What happens to the answer if you forget to add the return edge to city 0?  
3. Write the mask that represents cities 0, 2 and 3 for n = 5.  
4. Why does the algorithm run in O(n² 2^n) rather than O(n 3^n)?  
5. Detect the trap: a student initialises every DP entry to 0; which test case will silently produce a wrong answer?