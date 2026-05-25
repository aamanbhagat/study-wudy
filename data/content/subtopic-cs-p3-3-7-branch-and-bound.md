## What it is
Branch and Bound (B&B) is an algorithmic paradigm for solving optimization problems. It systematically explores a tree of all possible solutions (branching) but discards large subtrees of candidate solutions by using an estimated "bound" to prove that no solution in the subtree can be better than the best one found so far (bounding). It is an intelligent, exhaustive search that is often much faster than brute force.

## Why it matters
B&B is a cornerstone for tackling NP-hard optimization problems, which are ubiquitous. In aerospace, it's used for mission planning, such as finding the optimal sequence of observations for a satellite or the most fuel-efficient trajectory for a multi-body rendezvous (a variant of the Traveling Salesperson Problem). In machine learning, it appears in algorithms for feature selection and finding the optimal structure of certain models like decision trees.

## When to study it
Before tackling Branch and Bound, you must have a firm grasp of these prerequisites:
*   **Recursion and Backtracking:** B&B is an extension of backtracking. You must be able to write a recursive function that explores a solution space.
*   **Graph/Tree Traversal:** Understand Depth-First Search (DFS) and Breadth-First Search (BFS). B&B explores a "state space tree."
*   **Priority Queues (Heaps):** The most effective B&B strategies use a priority queue to decide which part of the solution space to explore next.
*   **Optimization vs. Decision Problems:** Understand that B&B finds the *best* solution (e.g., minimum cost, maximum profit), not just *a* solution.

If you are not confident in these, pause and review them. Hand-waving your understanding of backtracking will make B&B impossible to grasp.

## How to study it (step by step)
1.  **Solidify Backtracking:** Solve the N-Queens problem using standard backtracking. Focus on how the recursive calls build and tear down partial solutions.
2.  **Introduce the "Bound":** Take a simple problem like finding the shortest path in a weighted graph. Implement a simple backtracking search. Now, add a global variable `min_cost_so_far`. Before exploring a neighbor, check if `current_path_cost + edge_weight >= min_cost_so_far`. If it is, don't recurse. You have just implemented the core idea of B&B.
3.  **Formalize the Bounding Function:** Study the 0/1 Knapsack problem. The key is defining an *optimistic* bound. For a given node (partial solution), a good bound is the value of items already taken *plus* the value that could be obtained by taking fractions of the remaining items. This is an optimistic estimate because we can't actually take fractions of items.
4.  **Implement 0/1 Knapsack:** Code the 0/1 Knapsack problem using B&B. Use a priority queue to implement a "Best-First" search, where you always explore the node with the highest (most optimistic) bound.
5.  **Compare Search Strategies:** Re-implement your Knapsack solution using a simple stack (DFS). Observe how the Best-First search often finds a good solution faster, which allows for more aggressive pruning earlier in the search, even though the final answer is the same.
6.  **Analyze Bound Tightness:** Consider the Traveling Salesperson Problem (TSP). A simple bound for a partial tour is the length of the tour so far. A *tighter* bound is the length so far plus the cost of the Minimum Spanning Tree (MST) of the unvisited cities. A tighter bound leads to more pruning and a faster algorithm. Understand why.

## Key ideas, with intuition
1.  **State Space Tree:** The entire set of possible solutions is structured as a tree. The root represents the initial state (no decisions made), and each child node represents a decision that extends the solution of its parent. A path from the root to a leaf is a complete candidate solution.

2.  **Branching:** This is the process of generating the children of a node. It's simply exploring the next set of choices available from the current state. For example, in the Knapsack problem, for the next item, we can either include it or not include it. This creates two branches.

3.  **Bounding Function ($c(x)$):** This is the core of the algorithm. For any node $x$ in the tree, the bounding function $c(x)$ provides an *optimistic* estimate of the best solution achievable in the subtree rooted at $x$.
    *   For a **maximization** problem (like Knapsack value), the bound must be an **upper bound**: $c(x) \ge \text{actual best value in subtree}$.
    *   For a **minimization** problem (like TSP cost), the bound must be a **lower bound**: $c(x) \le \text{actual best cost in subtree}$.
    A loose bound works, but a "tight" bound (closer to the true value) is more powerful.

4.  **Pruning:** Let $L$ be the value of the best complete solution found so far (e.g., the maximum profit). When considering a node $x$, we calculate its bound $c(x)$.
    *   For a maximization problem, if $c(x) \le L$, we can **prune** the entire subtree at $x$. The optimistic estimate is already no better than our current best, so nothing in this branch can beat it.
    *   For a minimization problem, if $c(x) \ge L$, we prune.

## Worked example
Let's solve the 0/1 Knapsack problem.
*   **Capacity:** $W=10$
*   **Items (value, weight):**
    *   A: (40, 4) -> Value/Weight Ratio: 10
    *   B: (42, 7) -> Value/Weight Ratio: 6
    *   C: (25, 5) -> Value/Weight Ratio: 5
    *   D: (12, 3) -> Value/Weight Ratio: 4
*   **Goal:** Maximize total value without exceeding weight capacity.
*   **Bounding Function:** For a node, the bound is (value of items taken) + (remaining capacity) * (best value/weight ratio of remaining items). This is optimistic because it assumes we can fill the rest of the knapsack with fractions of the most valuable item.

**Steps:**
1.  **Initialization:** `max_profit = 0`. Start at the root node (no items selected).
    *   Node 0 (Root): value=0, weight=0.
    *   Bound: $0 + (10 - 0) \times 10 = 100$. (Ratio 10 is from item A).
    *   Put root in a priority queue, ordered by bound.

2.  **Iteration 1:** Dequeue Node 0. Explore its children.
    *   **Node 1 (Take A):** value=40, weight=4.
        *   Bound: $40 + (10 - 4) \times 6 = 40 + 36 = 76$. (Ratio 6 is from item B, the next best).
    *   **Node 2 (Don't Take A):** value=0, weight=0.
        *   Bound: $0 + (10 - 0) \times 6 = 60$.
    *   Enqueue Node 1 (bound 76) and Node 2 (bound 60).

3.  **Iteration 2:** Dequeue Node 1 (highest bound). Explore its children (decide on item B).
    *   **Node 3 (Take A, Take B):** value=82, weight=11. This is invalid ($11 > 10$). Prune this path.
    *   **Node 4 (Take A, Don't Take B):** value=40, weight=4.
        *   Bound: $40 + (10 - 4) \times 5 = 40 + 30 = 70$. (Ratio 5 is from item C).
    *   Enqueue Node 4 (bound 70). Priority Queue: [Node 4 (70), Node 2 (60)].

4.  **Iteration 3:** Dequeue Node 4. Explore its children (decide on item C).
    *   **Node 5 (Take A, Don't B, Take C):** value=65, weight=9. This is a valid complete solution (no items left to consider). Update `max_profit = 65`.
    *   **Node 6 (Take A, Don't B, Don't C):** value=40, weight=4.
        *   Bound: $40 + (10 - 4) \times 4 = 40 + 24 = 64$. (Ratio 4 is from item D).
        *   The bound (64) is less than `max_profit` (65). **PRUNE** this node. We don't even add it to the queue.

5.  **Iteration 4:** Dequeue Node 2 (next best bound is 60).
    *   The bound (60) is less than `max_profit` (65). **PRUNE** this entire subtree. We don't need to explore any paths that start with "Don't Take A".

6.  **Termination:** The priority queue is now empty. The optimal solution found is {A, C} with a total value of 65.

**Reflection:** The key moments were pruning Node 6 because its optimistic bound was worse than a real solution we'd already found, and pruning the entire subtree at Node 2 for the same reason. This saved us from exploring many useless branches.

## Diagrams
Here is the state space tree for the worked example. `(v, w)` is (value, weight), `b` is the bound. `X` marks a pruned branch.

```text
                                     Node 0 (v=0, w=0, b=100)
                                      /                      \
                                 (Take A)                  (Don't Take A)
                                /                            \
                Node 1 (v=40, w=4, b=76)                  Node 2 (v=0, w=0, b=60)
                /                \                            |
           (Take B)          (Don't Take B)                     X <-- PRUNED (b=60 < max_profit=65)
          /                      \
Node 3 (v=82, w=11)        Node 4 (v=40, w=4, b=70)
  |                              /                \
  X <-- PRUNED (invalid)    (Take C)          (Don't Take C)
                             /                      \
            Node 5 (v=65, w=9)                Node 6 (v=40, w=4, b=64)
              |                                     |
    (Leaf, new max_profit=65)                       X <-- PRUNED (b=64 < max_profit=65)
```

## Memory technique — remember this forever
1.  **The Story:** You are a mining corporation CEO exploring a mountain for gold. The mountain has branching tunnels (the state space tree). Your top geologist gives you an **optimistic (upper bound)** estimate of the gold in each major tunnel system. You also have a running total of the **best single truckload of gold (best solution so far)** you've actually extracted. When you consider a new tunnel system, if the geologist's optimistic estimate is *less than* your best truckload so far, you immediately abandon that entire system and tell your miners not to waste their time. You **bound** the potential, then **branch** or **prune**.

2.  **Must Overlearn:**
    *   **Maximization Pruning Rule:** Prune node $x$ if `bound(x) <= best_solution_found_so_far`.
    *   **Minimization Pruning Rule:** Prune node $x$ if `bound(x) >= best_solution_found_so_far`.
    *   **Bound Property:** The bound must be *optimistic*. (Upper bound for max problems, lower bound for min problems).

3.  **Spaced Repetition Schedule:** Review this material and re-solve the Knapsack problem from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the details, rebuild it from backtracking.
    *   Start with a brute-force recursive search that explores every possibility.
    *   Ask: "How can I be smarter?"
    *   Realize you can stop exploring a path if you know it's a dead end.
    *   Define a "dead end": a path whose *best possible outcome* is still worse than a real solution you've already found.
    *   This requires an "estimate of the best possible outcome." That's your bounding function. The pruning rule follows directly from this logic.

## Common mistakes
1.  **Incorrect Bound:** Using a pessimistic bound. For Knapsack, if your bound was pessimistic (a lower bound), you might prune a branch that contains the optimal solution. The algorithm would fail.
2.  **Confusing with Dynamic Programming:** Both can solve Knapsack. DP is tabular and bottom-up; it solves all smaller subproblems. B&B is a top-down tree search that uses pruning to avoid solving most subproblems. For some problem instances, B&B can be much faster and use less memory.
3.  **Off-by-One in Bound Calculation:** In the Knapsack example, when calculating the bound for a node, forgetting to use the *remaining* capacity and the *remaining* items. The bound is always about the future potential from the current node.

## Self-check
1.  You are using Branch and Bound to find the *shortest* path between two nodes in a complex, weighted graph. What is the pruning rule? State it in terms of `bound(node)` and `shortest_path_found_so_far`.
2.  For the Traveling Salesperson Problem (TSP), where the goal is to find the minimum cost tour that visits every city once, propose a valid (optimistic) bounding function for a node representing a partial tour (e.g., A -> C -> B -> ...). Justify why it is a lower bound.
3.  How would using a simple LIFO stack (emulating DFS) instead of a priority queue for your list of "live" nodes affect the B&B algorithm's behavior? Consider its effect on (a) the first solution found, (b) the total number of nodes explored, and (c) memory usage.