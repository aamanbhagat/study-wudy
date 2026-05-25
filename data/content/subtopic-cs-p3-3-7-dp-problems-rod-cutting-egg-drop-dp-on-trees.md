## What it is
These are classic dynamic programming (DP) problems that illustrate fundamental patterns. Rod cutting is a one-dimensional DP problem about resource partitioning. Egg dropping is a two-dimensional DP problem about finding an optimal strategy under worst-case scenarios. DP on trees applies the DP paradigm to graph structures, solving problems by combining solutions from subtrees.

## Why it matters
These patterns are not just academic puzzles; they model real-world optimization problems. Rod cutting is analogous to resource allocation problems, like cutting silicon wafers for CPUs or allocating bandwidth. Egg dropping's logic applies to finding critical thresholds with minimal tests, from determining a rocket engine's failure point to binary searching for a bug in a commit history. DP on trees is foundational for parsing computer languages, bioinformatics (analyzing phylogenetic trees), and optimizing network routing.

## When to study it
You must have a solid grasp of recursion, memoization, and the core principles of dynamic programming: optimal substructure and overlapping subproblems. For DP on trees, you must understand tree data structures and traversal algorithms, particularly Depth-First Search (DFS) in its post-order form. If you are not comfortable deriving a recursive solution and then optimizing it with a cache (memoization), review that first.

## How to study it (step by step)
1.  **Master Rod Cutting:** Start with the recursive solution to the rod cutting problem. Draw the recursion tree for a small example (e.g., length 4) to visualize the overlapping subproblems. Then, convert this "top-down" recursive solution to a memoized one. Finally, convert it to a "bottom-up" iterative solution using a DP table.
2.  **Derive Egg Dropping:** Define the state for the egg dropping problem: $dp(k, n)$ represents the minimum number of trials needed for $k$ eggs and $n$ floors. Spend time deriving the recurrence relation from first principles. This is the hardest part; focus on the logic: you make a choice (drop from floor $x$), and nature responds with the worst possible outcome.
3.  **Implement Egg Dropping:** Implement the solution, first with memoization, then with a 2D DP table. Pay close attention to the loop bounds and state transitions.
4.  **Start with Simple Tree DP:** Take a simple binary tree problem, like finding the maximum depth. Realize that this is a DP problem where the solution for a node is `1 + max(solution for left child, solution for right child)`. This is the core pattern.
5.  **Tackle Complex Tree DP:** Move to a problem like "Maximum Path Sum in a Binary Tree" (from any node to any other node). Here, a node must pass more than one piece of information up to its parent (e.g., the max path starting at this node and going down, and the max path fully contained within its subtree). This teaches you how to define a more complex state for tree DP.
6.  **Practice:** Solve 2-3 variants of each problem type on a coding platform. For example, Unbounded Knapsack (related to Rod Cutting), and Maximum Independent Set on a Tree.

## Key ideas, with intuition
1.  **Rod Cutting: Linear Decisions.** The key insight is that an optimal solution for a rod of length $n$ contains an optimal solution for a smaller rod. We want to find the best revenue $r_n$ for a rod of length $n$. We can make an initial cut of length $i$ (where $1 \le i \le n$), sell that piece for price $p_i$, and then we are left with a rod of length $n-i$. To maximize our total revenue, we must get the maximum possible revenue for the remaining piece, which is $r_{n-i}$. We try all possible first cuts $i$ and take the best one.
    $$r_n = \max_{1 \le i \le n} (p_i + r_{n-i})$$
    The state is one-dimensional: just the length of the rod.

2.  **Egg Dropping: Minimax Strategy.** This is a game against a malicious opponent who wants to maximize your drops. You want to minimize them. The state must capture both resources: $k$ eggs and $n$ floors to check. Let $dp(k, n)$ be the minimum number of drops needed in the worst case. If you drop an egg from floor $x$, two things can happen:
    *   **It breaks:** You have $k-1$ eggs left and must check the $x-1$ floors below. Cost: $dp(k-1, x-1)$.
    *   **It survives:** You have $k$ eggs left and must check the $n-x$ floors above. Cost: $dp(k, n-x)$.
    The worst case is the `max` of these two outcomes. You choose the floor $x$ that minimizes this worst-case cost. The `1` is for the current drop.
    $$dp(k, n) = 1 + \min_{1 \le x \le n} \max(dp(k-1, x-1), dp(k, n-x))$$

3.  **DP on Trees: Post-Order Computation.** Subproblems in a tree are the subtrees. The solution for a node $u$ depends on the solutions for its children. This naturally leads to a post-order traversal (or any DFS where children are visited before the parent). You compute the DP values for the leaves first, then their parents, and so on, up to the root. The state $dp(u)$ stores the answer to the subproblem rooted at $u$.
    $$dp(u) = f(\text{data}(u), \{dp(v) \mid v \text{ is a child of } u\})$$
    The function $f$ combines the node's own data with the pre-computed results from its children.

## Worked example
We will solve the **Rod Cutting** problem.
**Problem:** Given a rod of length $n$ and a table of prices $p_i$ for pieces of length $i=1, ..., n$, find the maximum revenue obtainable by cutting up the rod and selling the pieces.

**Example data:**
Length $n=4$.
Prices:
| Length $i$ | 1 | 2 | 3 | 4 |
|------------|---|---|---|---|
| Price $p_i$| 1 | 5 | 8 | 9 |

**Step 1: Define the subproblem.**
Let $r_n$ be the maximum revenue for a rod of length $n$. Our goal is to find $r_4$.

**Step 2: Derive the recurrence relation.**
To find $r_n$, we consider all possible first cuts. A cut of length $i$ gives us a piece of price $p_i$ and a remaining rod of length $n-i$. The maximum revenue from the remaining part is, by definition, $r_{n-i}$.
$r_n = \max_{1 \le i \le n} (p_i + r_{n-i})$.
The base case is $r_0 = 0$ (a rod of length 0 has no value).

**Step 3: Solve bottom-up using a DP table.**
We will compute $r_1, r_2, r_3, r_4$ in order.

*   **Calculate $r_1$:**
    $r_1 = \max(p_1 + r_0) = p_1 + 0 = 1$.
    The only choice is to cut a piece of length 1. Revenue = 1.

*   **Calculate $r_2$:**
    $r_2 = \max(p_1 + r_1, p_2 + r_0)$
    $r_2 = \max(1 + 1, 5 + 0) = \max(2, 5) = 5$.
    The choices are:
    1.  Cut a piece of length 1 (price 1), remaining length 1 (revenue $r_1=1$). Total: $1+1=2$.
    2.  Cut a piece of length 2 (price 5), remaining length 0 (revenue $r_0=0$). Total: $5+0=5$.
    The best choice is to not cut it at all and sell it as a piece of length 2. Revenue = 5.

*   **Calculate $r_3$:**
    $r_3 = \max(p_1 + r_2, p_2 + r_1, p_3 + r_0)$
    $r_3 = \max(1 + 5, 5 + 1, 8 + 0) = \max(6, 6, 8) = 8$.
    The choices are:
    1.  Cut length 1 (price 1), remaining length 2 (revenue $r_2=5$). Total: $1+5=6$.
    2.  Cut length 2 (price 5), remaining length 1 (revenue $r_1=1$). Total: $5+1=6$.
    3.  Cut length 3 (price 8), remaining length 0 (revenue $r_0=0$). Total: $8+0=8$.
    The best choice is to sell it as a piece of length 3. Revenue = 8.

*   **Calculate $r_4$:**
    $r_4 = \max(p_1 + r_3, p_2 + r_2, p_3 + r_1, p_4 + r_0)$
    $r_4 = \max(1 + 8, 5 + 5, 8 + 1, 9 + 0) = \max(9, 10, 9, 9) = 10$.
    The choices are:
    1.  Cut length 1 (price 1), remaining length 3 (revenue $r_3=8$). Total: $1+8=9$.
    2.  Cut length 2 (price 5), remaining length 2 (revenue $r_2=5$). Total: $5+5=10$.
    3.  Cut length 3 (price 8), remaining length 1 (revenue $r_1=1$). Total: $8+1=9$.
    4.  Cut length 4 (price 9), remaining length 0 (revenue $r_0=0$). Total: $9+0=9$.
    The best choice is to cut the rod into two pieces of length 2. Revenue = 10.

**Final Answer:** The maximum revenue for a rod of length 4 is 10.

**Reflection:** Each step builds upon the previous ones. To calculate $r_n$, we needed the already computed optimal values for all $r_j$ where $j < n$. This bottom-up approach avoids re-computation and systematically finds the global optimum.

## Diagrams
DP table for the Rod Cutting example ($n=4$):

```text
r[j]: Maximum revenue for a rod of length j

j=0: r[0] = 0 (Base case)

j=1: r[1] = p[1] + r[0] = 1 + 0 = 1

j=2: r[2] = max( p[1]+r[1], p[2]+r[0] )
             = max( 1 + 1 ,  5 + 0  ) = 5

j=3: r[3] = max( p[1]+r[2], p[2]+r[1], p[3]+r[0] )
             = max( 1 + 5 ,  5 + 1 ,  8 + 0  ) = 8

j=4: r[4] = max( p[1]+r[3], p[2]+r[2], p[3]+r[1], p[4]+r[0] )
             = max( 1 + 8 ,  5 + 5 ,  8 + 1 ,  9 + 0  ) = 10

DP Table:
 Index j | 0 | 1 | 2 | 3 |  4 |
---------+---+---+---+---+----+
 Value r[j]| 0 | 1 | 5 | 8 | 10 |
```

DP on Trees computation flow:

```text
       (u)
      /   \
     (v)   (w)
    / \
  (x) (y)

Computation Order (Post-order traversal):
1. Solve for leaves x, y, w.
   dp(x) = ...
   dp(y) = ...
   dp(w) = ...
   ^
   |
2. Solve for v, using results from its children x and y.
   dp(v) = f(data(v), dp(x), dp(y))
   ^
   |
3. Solve for root u, using results from its children v and w.
   dp(u) = f(data(u), dp(v), dp(w))
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**C**ut, **D**rop, **C**limb."
    *   **Cut** the rod into pieces. (1D DP)
    *   **Drop** the egg from a floor. (Minimax DP)
    *   **Climb** the tree from the leaves. (Tree DP)

2.  **Formulas to overlearn:**
    *   Rod Cutting: $r_n = \max_{1 \le i \le n} (p_i + r_{n-i})$
    *   Egg Dropping: $dp(k, n) = 1 + \min_{1 \le x \le n} \max(dp(k-1, x-1), dp(k, n-x))$
    *   DP on Trees (Conceptual): $dp(\text{node}) = f(\text{node.data, } dp(\text{children}))$

3.  **Spaced Repetition Schedule:**
    *   Review these three recurrences and the "Cut, Drop, Climb" mnemonic in **1 day**.
    *   Re-derive one of them from scratch in **3 days**.
    *   Solve a new, related problem in **7 days**.
    *   Review all three again in **16 days**.
    *   Explain the concepts to a friend (or a rubber duck) in **35 days**.

4.  **First Principles Pathway:** If you forget, rebuild from the core DP questions:
    1.  **What is the state?** What minimal information do I need to define a subproblem? (Length of rod? Eggs and floors left? A subtree?)
    2.  **What is the goal?** Am I maximizing a value, minimizing a cost, or counting possibilities?
    3.  **What are my choices?** What action can I take at this state? (Where to make the first cut? Which floor to drop from? How to combine children's results?)
    4.  **How do choices affect the state?** Formulate the recurrence relation that connects the solution of the current state to the solutions of smaller sub-states.

## Common mistakes
*   **Incorrect State Definition:** Especially in egg dropping, students try to use only one variable (e.g., `dp[n]`), but the solution depends on both the number of floors *and* the number of eggs. The state must capture all constraints.
*   **Off-by-One Errors:** In rod cutting, mixing up 0-based and 1-based indexing for prices and the DP array is a common source of bugs. Be consistent.
*   **Wrong Traversal for Tree DP:** Using a pre-order or in-order traversal when a post-order traversal is required. You cannot compute the value for a parent until you have the final computed values for all its children.
*   **Misunderstanding Minimax:** In egg dropping, confusing the `min` and `max`. You choose $x$ to `min`imize the outcome, but you must assume that after your choice, the `max`imum (worst-case) number of future drops will be required.

## Self-check
1.  (Easy) Modify the rod cutting problem to include a fixed cost $c$ for every cut made. How does the recurrence relation $r_n$ change?
2.  (Medium) For the egg dropping problem with 2 eggs and 100 floors, what is the optimal first floor to drop an egg from? Explain your reasoning without calculating the full DP table.
3.  (Hard) You are given a binary tree where each node has a positive or negative integer value. Write the recurrence relation(s) for a DP state that would allow you to find the maximum path sum between any two nodes in the tree. The path does not need to pass through the root.