## What it is
Bitmask Dynamic Programming (DP) is a technique that uses the bits of an integer to represent the state of a subproblem, typically a subset of items. For the Traveling Salesperson Problem (TSP), the bitmask efficiently tracks the set of cities that have already been visited, allowing us to build a solution city by city.

## Why it matters
This exact algorithm solves TSP for small $N$ (up to ~20), which appears in problems like optimizing tool paths for circuit board manufacturing or finding the shortest sequence for DNA fragment assembly. More importantly, the *concept* of using bitmasks to represent subsets is a fundamental tool in competitive programming and algorithm design for solving many other combinatorial problems that are otherwise intractable. For aerospace, this pattern is useful in optimizing observation schedules for a constellation of satellites or planning efficient multi-target paths for a planetary rover.

## When to study it
Before tackling this, you must have a solid grasp of three prerequisites. If you are not confident in these, stop and review them first.
1.  **Dynamic Programming:** You must understand the core concepts of state, transition, base case, and memoization. You should have solved problems like the 0/1 Knapsack or Longest Common Subsequence.
2.  **Bitwise Operations:** You must be fluent with `AND` (`&`), `OR` (`|`), `XOR` (`^`), and bit shifts (`<<`, `>>`). You should know how to use them to set, unset, and check the $i$-th bit of an integer.
3.  **Graph Theory:** You need to be comfortable with graph representations, specifically an adjacency matrix for weighted complete graphs.

## How to study it (step by step)
1.  **Warm-up with Bitwise Ops:** Write short functions to: check if the $k$-th bit is set in an integer `mask`; set the $k$-th bit; unset the $k$-th bit. Use `(mask >> k) & 1`, `mask | (1 << k)`, and `mask & ~(1 << k)`.
2.  **Formulate Brute-Force Recursion:** For TSP, write a recursive function `solve(current_city, visited_cities_set)`. This function would try to move from `current_city` to every unvisited city, recursively calling itself. Identify the overlapping subproblems: you might reach city `u` having visited set `{A, B, C}` via many different paths.
3.  **Define the DP State:** The state needs to capture everything required to make an optimal decision for the rest of the path. We need to know (1) our current location, and (2) the set of cities we have already visited. This gives us our state: `dp[mask][u]`, representing the minimum cost of a path starting at the origin, visiting exactly the cities in the set represented by `mask`, and ending at city `u`.
4.  **Write the Recurrence Relation:** To calculate `dp[mask][u]`, we must have arrived at city `u` from some other city `v` that is also in the `mask`. The path before arriving at `u` must have visited the cities in `mask` *except* for `u`, and it must have ended at `v`. Therefore, the cost is the cost of that previous path plus the cost of the final leg from `v` to `u`. We take the minimum over all possible previous cities `v`.
    $$
    dp[\text{mask}][u] = \min_{v \in \text{mask}, v \neq u} \{ dp[\text{mask} \oplus (1 \ll u)][v] + \text{cost}[v][u] \}
    $$
5.  **Identify the Base Case:** The journey starts at a designated city, let's say city 0. The path consisting of only city 0 has a cost of 0. The mask for visiting only city 0 is `1 << 0`, which is 1. So, `dp[1][0] = 0`. All other initial `dp` values should be infinity.
6.  **Implement with Memoization:** Create a 2D array `memo[1 << N][N]` initialized to -1. In your recursive function, before computing the result for `dp(mask, u)`, check if `memo[mask][u]` is not -1. If so, return the stored value. Otherwise, compute it, store it in the memo table, and then return it.
7.  **Find the Final Answer:** After visiting all cities, the mask will be `(1 << N) - 1` (all bits set to 1). The salesperson could be at any city `i` (except the start city 0). To complete the tour, they must travel from their final city `i` back to the start city 0. The total tour cost is therefore `dp[(1 << N) - 1][i] + cost[i][0]`. We take the minimum over all possible final cities `i`.

## Key ideas, with intuition
1.  **The State is a Snapshot:** The DP state `dp[mask][u]` is a complete snapshot of our progress. It tells us "the best way to have arrived at city `u`, having visited exactly the set of cities `mask`." It doesn't care about the *order* in which the cities in `mask` were visited, only that `u` was last. This compression of path history into a single set is the key insight.

2.  **The Mask is a Set:** An integer is a fantastically compact way to represent a subset. If we have $N=4$ cities {0, 1, 2, 3}, the integer $13$ (binary `1101`) represents the subset {0, 2, 3}.
    *   To check if city `i` is in the set: `if (mask & (1 << i))`.
    *   To add city `i` to the set: `new_mask = mask | (1 << i)`.
    *   To remove city `i` from the set: `new_mask = mask ^ (1 << i)`. This is the XOR operation, which is clean for toggling the bit.

3.  **The Transition is Building a Path:** The recurrence relation is the logic for adding one more city to an existing path.
    $$
    \underbrace{dp[\text{mask}][u]}_{\text{Cost of path ending at } u \text{ visiting } \{\text{mask}\}} = \min_{v} \left( \underbrace{dp[\text{mask without } u][v]}_{\text{Cost of shorter path ending at } v} + \underbrace{\text{cost}[v][u]}_{\text{Cost of final step}} \right)
    $$
    We are essentially saying: "To find the best way to get to `u` through this set of cities, I'll look at all possible last-steps (`v` to `u`) and for each, I'll take the best known way to get to `v`."

## Worked example
Consider 4 cities (0, 1, 2, 3) with starting city 0. The cost matrix `C` is:
$$
C = \begin{pmatrix}
0 & 10 & 15 & 20 \\
10 & 0 & 35 & 25 \\
15 & 35 & 0 & 30 \\
20 & 25 & 30 & 0
\end{pmatrix}
$$

Let's compute `dp[13][3]`.
*   **State:** `dp[13][3]` means "minimum cost to visit cities {0, 2, 3}, ending at city 3".
*   **Mask:** `13` in binary is `1101`. The set bits are at positions 0, 2, and 3, corresponding to cities {0, 2, 3}.
*   **Current City:** `u = 3`.
*   **Recurrence:** We must have come from a city `v` in the mask, where `v != 3`. The candidates for `v` are {0, 2}.
    $$
    dp[13][3] = \min( dp[13 \oplus (1 \ll 3)][0] + C[0][3], \quad dp[13 \oplus (1 \ll 3)][2] + C[2][3] )
    $$
*   **Subproblems:**
    *   The mask `13 \oplus (1 \ll 3)` is `1101_2 \oplus 1000_2 = 0101_2`, which is `5`.
    *   So we need `dp[5][0]` and `dp[5][2]`.
    $$
    dp[13][3] = \min( dp[5][0] + C[0][3], \quad dp[5][2] + C[2][3] )
    $$
*   **Solving Subproblem `dp[5][2]`:**
    *   State: `dp[5][2]` means "min cost to visit {0, 2}, ending at 2".
    *   Mask: `5` is `0101_2`. Cities are {0, 2}.
    *   Current City: `u = 2`.
    *   The only previous city `v` could be 0.
    *   Recurrence: `dp[5][2] = dp[5 \oplus (1 \ll 2)][0] + C[0][2] = dp[1][0] + C[0][2]`.
*   **Base Case:** We've hit the base case `dp[1][0]`. The cost to visit just the starting city {0} and end there is 0. So, `dp[1][0] = 0`.
*   **Calculation:**
    *   `dp[5][2] = 0 + C[0][2] = 15`.
    *   Similarly, we would find `dp[5][0]` is impossible (can't end at 0 after starting there and visiting another city), so it would be $\infty$. A proper implementation handles this. A better path to {0,2} would be 0 -> 2. Let's assume we need to calculate `dp[3][1]` to get to city 1 from city 0, which would be `dp[1][0] + C[0][1] = 10`.
*   **Back to the Original Problem:** Assuming we have computed all smaller subproblems, we would plug them in. Let's say we found `dp[5][0] = \infty` and `dp[9][2] = \dots`. The calculation proceeds by building up from the base case.
*   **Reflection:** Each step breaks the problem down into a slightly smaller one: finding the best path to the *previous* city, using a slightly smaller *set of cities*. The bitmask and current city index perfectly define these subproblems, and memoization ensures we never solve the same one twice.

## Diagrams
A 4-city complete graph for the worked example:
```text
      (0) --10-- (1)
     / | \     / |
    /  |  \   /  |
   15  |   20 35  |
  /    |    \ /   |
 /     |     X    25
(2) --30-- (3)    |
 \___________/
```

Mapping a mask to a subset of visited cities:
```text
N = 4 cities {0, 1, 2, 3}

Mask (integer)   Mask (binary)     Set of Visited Cities
-----------------------------------------------------------
      1               0001              {0}
      3               0011              {0, 1}
      9               1001              {0, 3}
     13               1101              {0, 2, 3}
     15               1111              {0, 1, 2, 3}
```

## Memory technique — remember this forever
1.  **The Story: The Masked Cartographer.** Imagine a cartographer mapping a new land. Their map is initially blank. At each step, they are at a city `u`. Their "mask" is a special magical overlay on the map that illuminates all the cities they have already visited. To decide where to go next, they look at their current location `u` and the illuminated set `mask`, and calculate the shortest path. The state `dp[mask][u]` is the "cost to have illuminated the set `mask` and be standing at city `u`."
2.  **Formulas to Overlearn:** (Start at city 0)
    *   **State:** `dp[mask][u]`: min cost to visit cities in `mask`, ending at `u`.
    *   **Transition:** `dp[mask][u] = min_{v | (mask & (1<<v)) && v!=u} (dp[mask ^ (1<<u)][v] + cost[v][u])`
    *   **Final Answer:** `min_{i=1}^{N-1} (dp[(1<<N)-1][i] + cost[i][0])`
3.  **Spaced Repetition Schedule:** Review this material and re-solve a TSP problem from scratch at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not skip this.
4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Start with the goal: Find the shortest tour visiting all cities.
    *   This requires making a sequence of decisions: which city to visit next.
    *   A recursive function needs to know where it is (`current_city`) and where it's been (`visited_set`). So, `solve(current_city, visited_set)`.
    *   The `visited_set` is inefficient. How to represent a set of numbers from $0$ to $N-1$? A bitmask integer. `visited_set` becomes `mask`.
    *   The state for memoization is therefore `dp[mask][current_city]`. The rest is the logic of transitioning from a smaller set to a larger one.

## Common mistakes
1.  **Incorrect Base Case:** Setting `dp[0][0] = 0`. The mask `0` means no cities have been visited. The base case must be for a path of length 1, starting and ending at the origin: `dp[1 << start_node][start_node] = 0`.
2.  **Forgetting the Final Edge:** The final answer is not just `min(dp[(1<<N)-1][i])`. A tour is a cycle. You must add the cost of the edge from the last city `i` back to the starting city.
3.  **Looping Over All Cities in Transition:** In the recurrence for `dp[mask][u]`, when finding the previous city `v`, you must only loop over cities `v` that are actually *in the mask*. A common bug is to loop `v` from 0 to N-1 and forget to check `if (mask & (1 << v))`.
4.  **Mixing up `mask ^ (1<<u)` and `mask - (1<<u)`:** Using XOR (`^`) is generally safer and more idiomatic for removing an element from the set represented by the mask. Subtraction can sometimes work but can fail if other bits are involved in a borrow, leading to subtle bugs. Stick with XOR.

## Self-check
1.  For a 6-city problem (0-indexed), what is the integer value of the bitmask representing the set of visited cities {0, 2, 5}? What is the DP state for a path that has visited these cities and ends at city 2?
2.  Given the cost matrix from the worked example, write out the full recurrence for `dp[7][1]`. What are the exact subproblems (e.g., `dp[x][y]`) you need to have already solved to compute this?
3.  The time complexity of this algorithm is $O(N^2 \cdot 2^N)$. The space complexity is $O(N \cdot 2^N)$. Justify each factor in these expressions by relating it to the DP state, loops, and transitions in the algorithm. Why is this approach infeasible for $N=50$?