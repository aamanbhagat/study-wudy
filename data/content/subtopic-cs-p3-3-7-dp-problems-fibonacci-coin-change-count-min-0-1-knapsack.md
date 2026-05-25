## What it is
Dynamic Programming (DP) is an algorithmic technique for solving an optimization problem by breaking it down into a collection of simpler, overlapping subproblems. We solve each subproblem only once and store its solution, typically in an array or table. The next time the same subproblem occurs, instead of recomputing its solution, we simply look up the previously computed solution, saving computation time.

## Why it matters
DP is the core of solving a vast class of optimization and counting problems that would otherwise be computationally intractable. In aerospace, it's used for trajectory optimization, finding the most fuel-efficient path for a spacecraft subject to constraints. In machine learning, algorithms like Viterbi (used in Hidden Markov Models for speech recognition) and sequence alignment for bioinformatics (like BLAST) are direct applications of DP.

## When to study it
Before tackling DP, you must have a solid grasp of **recursion**. You need to be able to formulate a problem's solution in terms of solutions to smaller instances of the same problem. You should also understand **memoization** (top-down DP) as a concept and be comfortable with **Big O notation** to appreciate *why* DP is an improvement over naive recursion.

## How to study it (step by step)
1.  **Solve Fibonacci recursively.** Write a function `fib(n)` that calls `fib(n-1) + fib(n-2)`. Draw the call tree for `fib(5)` and notice how many times `fib(2)` or `fib(1)` are re-calculated. This highlights the problem DP solves.
2.  **Add memoization.** Modify your recursive Fibonacci function to use a cache (an array or hash map). Before computing `fib(n)`, check if the result is already in the cache. If so, return it. If not, compute it, store it in the cache, and then return it. This is top-down DP.
3.  **Convert to tabulation.** Rewrite the solution iteratively (bottom-up). Create an array `dp` of size `n+1`. Initialize `dp[0]` and `dp[1]`, then use a loop to compute `dp[i] = dp[i-1] + dp[i-2]` up to `n`. This is bottom-up DP.
4.  **Apply the pattern to Coin Change (min coins).** Formulate the recurrence relation first. To make change for amount `A`, what is the subproblem? It's making change for a smaller amount. The minimum coins for `A` is `1 + min(coins for A - c)` for all coin denominations `c`.
5.  **Solve Coin Change (counting ways).** Notice the similarity and the key difference in the recurrence. Instead of taking a `min`, you will be summing the ways from different subproblems. This builds flexibility in defining the state transition.
6.  **Generalize to 2D DP with 0/1 Knapsack.** Here, the subproblem is defined by two parameters: the items you are allowed to consider, and the remaining capacity of the knapsack. This will require a 2D DP table. The logic remains the same: define the state, find the recurrence, and build the table.

## Key ideas, with intuition
1.  **Optimal Substructure:** A problem has optimal substructure if an optimal solution to the overall problem can be constructed from optimal solutions to its subproblems. For the "minimum coin change" problem, the optimal solution for amount $A$ *must* involve an optimal solution for some amount $A' < A$. If it didn't, you could swap in the better solution for $A'$ and improve your solution for $A$, which is a contradiction.

2.  **Overlapping Subproblems:** A problem has overlapping subproblems if a recursive algorithm solves the same subproblems over and over again. The naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` is the classic example. Computing `fib(5)` requires `fib(4)` and `fib(3)`. `fib(4)` requires `fib(3)` and `fib(2)`. The subproblem `fib(3)` is computed twice. DP stores the result of `fib(3)` the first time it's computed, avoiding the redundant work.

3.  **The State and State Transition:** The "state" is the set of parameters that uniquely identifies a subproblem. For Fibonacci, the state is just $n$. For 0/1 Knapsack, the state is `(i, w)`, representing the maximum value using items from index $1$ to $i$ with a maximum weight capacity of $w$. The state transition is the recurrence relation that defines how to compute the solution for a state based on the solutions of "smaller" states.
    $$
    \text{dp}[\text{state}] = f(\text{dp}[\text{previous state}_1], \text{dp}[\text{previous state}_2], \dots)
    $$

## Worked example
Let's solve the **Minimum Coin Change** problem.
**Problem:** Given a set of coin denominations `coins = {1, 3, 4}` and a total amount `A = 6`, find the minimum number of coins required to make that amount.

**1. Define the State:**
Let $dp[i]$ be the minimum number of coins required to make change for amount $i$. Our goal is to find $dp[6]$.

**2. Define the Base Case:**
To make change for amount 0, you need 0 coins. So, $dp[0] = 0$.

**3. Find the Recurrence Relation (State Transition):**
To compute $dp[i]$, consider the last coin you add. It could be a 1, a 3, or a 4.
- If you add a coin of value $c$, you must have already optimally made change for the amount $i-c$.
- The number of coins in this case would be $1 + dp[i-c]$.
- Since we want the *minimum* number of coins, we must try every possible last coin and take the minimum.
So, for each amount $i$ from 1 to $A$:
$$
dp[i] = 1 + \min_{c \in \text{coins}, c \le i} \{ dp[i-c] \}
$$

**4. Build the DP Table (Bottom-up):**
We need to compute $dp[0], dp[1], \dots, dp[6]$.
Initialize $dp$ array of size 7 with $\infty$, and set $dp[0] = 0$.

-   **$i=1$**: Coins $\le 1$: {1}.
    $dp[1] = 1 + dp[1-1] = 1 + dp[0] = 1+0 = 1$.
-   **$i=2$**: Coins $\le 2$: {1}.
    $dp[2] = 1 + dp[2-1] = 1 + dp[1] = 1+1 = 2$.
-   **$i=3$**: Coins $\le 3$: {1, 3}.
    $dp[3] = 1 + \min(dp[3-1], dp[3-3]) = 1 + \min(dp[2], dp[0]) = 1 + \min(2, 0) = 1$.
-   **$i=4$**: Coins $\le 4$: {1, 3, 4}.
    $dp[4] = 1 + \min(dp[4-1], dp[4-3], dp[4-4]) = 1 + \min(dp[3], dp[1], dp[0]) = 1 + \min(1, 1, 0) = 1$.
-   **$i=5$**: Coins $\le 5$: {1, 3, 4}.
    $dp[5] = 1 + \min(dp[5-1], dp[5-3], dp[5-4]) = 1 + \min(dp[4], dp[2], dp[1]) = 1 + \min(1, 2, 1) = 2$.
-   **$i=6$**: Coins $\le 6$: {1, 3, 4}.
    $dp[6] = 1 + \min(dp[6-1], dp[6-3], dp[6-4]) = 1 + \min(dp[5], dp[3], dp[2]) = 1 + \min(2, 1, 2) = 2$.

**Final Answer:** $dp[6] = 2$. The optimal solution is two coins of value 3.

**Reflection:** Each step builds upon the last. We defined the subproblem ($dp[i]$), found the base case ($dp[0]$), and established the rule for building larger solutions from smaller ones (the recurrence). The bottom-up calculation ensures that whenever we need to look up a value like $dp[i-c]$, it has already been computed.

## Diagrams
This ASCII diagram shows the DP table for the coin change example. The arrows show the dependencies for calculating $dp[6]$. To find the value for cell 6, we look back at cells 5 (6-1), 3 (6-3), and 2 (6-4), take the minimum of their values (which is 1, from cell 3), and add 1.

```text
Amount (i)
  ^
6 |         +-----------+
  |         | dp[6]=2   | <--- min(dp[5], dp[3], dp[2]) + 1
5 | +-----------+       |
  | | dp[5]=2   |       |
4 | +-----------+       |
  | | dp[4]=1   |       |
3 | +-----------+       |
  | | dp[3]=1   | ------+
2 | +-----------+       |
  | | dp[2]=2   | ------+
1 | +-----------+
  | | dp[1]=1   |
0 +-----------+
  | | dp[0]=0   |
  +-------------------> Index
    0 1 2 3 4 5 6
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of DP as building a Lego tower. You can't build the 10th floor before the 9th. You start with the foundation (base case), then build each floor (subproblem) one by one, using the completed floors below you. The "state transition" is your blueprint for how to add the next floor.

2.  **Formulas to Overlearn:** The exact formulas change, but the *structure* is constant. Burn these two patterns into your mind.
    -   **1D DP (Fibonacci, Coin Change):**
        $$
        dp[i] = \text{aggregate}(\text{options involving } dp[j] \text{ where } j < i)
        $$
        (Aggregate can be `min`, `max`, `sum`, etc.)
    -   **0/1 Knapsack (2D DP):**
        $$
        dp[i][w] = \max(dp[i-1][w], \quad \text{value}[i] + dp[i-1][w - \text{weight}[i]])
        $$
        (This means: for item $i$ and capacity $w$, the best value is either *not* taking item $i$ (value is $dp[i-1][w]$) or taking item $i$ (value is $\text{value}[i]$ + best value for remaining capacity)).

3.  **Spaced Repetition Schedule:**
    -   Day 1: Re-solve coin change (min and count) from scratch.
    -   Day 3: Re-solve 0/1 knapsack from scratch.
    -   Day 7: Solve Longest Increasing Subsequence.
    -   Day 16: Re-solve knapsack and coin change.
    -   Day 35: Solve a medium DP problem on a platform like LeetCode (e.g., Edit Distance).

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    1.  Write the naive, brute-force recursive solution. Don't worry about efficiency.
    2.  Identify the parameters that change in your recursive calls. These define your state. (`fib(n)` -> state is `n`. `knapsack(i, w)` -> state is `(i, w)`).
    3.  Create a cache (array, map) indexed by the state. Before any recursive call, check the cache. After any computation, store the result in the cache. This is memoization.
    4.  (Optional but good practice) Convert the memoized recursion to a bottom-up iterative solution. This is tabulation.

## Common mistakes
1.  **Incorrect State Definition:** Forgetting a necessary parameter. In 0/1 Knapsack, a common mistake is trying to define the state with only the remaining capacity, `dp[w]`. This fails because you also need to know *which items you are still allowed to use*. The correct state is `dp[i][w]`.
2.  **Wrong Base Cases:** Forgetting to initialize `dp[0]=0` in coin change, or initializing the DP table with 0 when you need to find a minimum (you should use $\infty$ instead, so any real value is smaller).
3.  **Off-by-One Errors in Loops/Indices:** Carefully check your loop bounds. Does your array need to be size `N` or `N+1`? Does your loop go `to N` or `to N-1`?
4.  **Mixing up Coin Change problems:** The recurrence for *minimum coins* involves `min()`, while the recurrence for *counting ways* involves `sum()`. Using the wrong one will give a nonsensical answer.

## Self-check
1.  Given an array of integers, find the length of the longest subsequence that is strictly increasing. Example: For `[10, 9, 2, 5, 3, 7, 101, 18]`, the longest increasing subsequence is `[2, 3, 7, 101]`, so the answer is 4. What is the state and recurrence relation?
2.  You are given two strings, `word1` and `word2`. Find the minimum number of operations (insert, delete, or substitute a character) required to convert `word1` to `word2`. This is the "Edit Distance" problem. How would you define the 2D DP state?
3.  You have a rod of length $N$. You can cut the rod into integer-length pieces. Given a price list where `prices[i]` is the selling price of a piece of length `i+1`, what is the maximum revenue you can obtain by cutting up the rod and selling the pieces?