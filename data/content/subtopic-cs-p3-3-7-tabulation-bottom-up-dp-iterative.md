## What it is
Tabulation is an iterative Dynamic Programming (DP) technique that solves a problem by filling up a table (typically an array or grid) of solutions to subproblems. It starts with the smallest, simplest subproblems (the base cases) and systematically builds up to the solution for the original, larger problem. This bottom-up approach ensures that when we need to compute the solution for a given subproblem, the solutions for all its smaller, prerequisite subproblems have already been computed and stored in the table.

## Why it matters
DP is the core of solving complex optimization problems, which are ubiquitous. In rocket science, the Bellman equation, a cornerstone of optimal control theory, is solved using DP to find the most fuel-efficient trajectory for a spacecraft. In machine learning, the Viterbi algorithm uses DP to find the most likely sequence of hidden states in a Hidden Markov Model, which is fundamental to modern speech recognition and bioinformatics sequence alignment.

## When to study it
Before tackling tabulation, you must have a solid grasp of these prerequisites:
1.  **Recursion:** Tabulation is often a way to de-recursify a solution. You must first be able to think about problems recursively.
2.  **Memoization (Top-Down DP):** Understand how to use a cache (like a hash map or array) to store results of a recursive function to avoid re-computation. Tabulation is the other side of the DP coin.
3.  **Big O Notation:** You need this to appreciate *why* DP is an improvement, typically taking a problem from exponential time complexity $O(c^N)$ down to polynomial time $O(N^k)$.
4.  **Arrays/Lists:** The "table" in tabulation is almost always a multi-dimensional array.

If you are not comfortable with recursion and memoization, stop and master those first. Tabulation will be confusing otherwise.

## How to study it (step by step)
1.  **Identify a DP Problem:** Take a problem that can be solved with naive recursion but has overlapping subproblems. The classic example is computing the Nth Fibonacci number, $F_n$. The naive recursion `fib(n) = fib(n-1) + fib(n-2)` is inefficient.
2.  **Define the State:** Identify the parameters that uniquely define a subproblem. For Fibonacci, the only parameter is the integer $n$. This tells you the dimensions of your table. Here, we need a 1D table (an array) to store solutions for $F_0, F_1, ..., F_N$. Let's call it `dp`. `dp[i]` will store the value of $F_i$.
3.  **Determine Table Size:** Your table must be large enough to hold the solution for all relevant subproblems, from the base cases up to the final answer. For $F_N$, you need to store solutions for indices 0 through $N$, so the table size must be $N+1$.
4.  **Find the Recurrence Relation:** Express the solution for a state in terms of solutions for smaller states. This is the same relation as in the recursive solution. For Fibonacci, the relation is `dp[i] = dp[i-1] + dp[i-2]`.
5.  **Initialize Base Cases:** Fill in the table for the smallest subproblems that don't depend on any others. For Fibonacci, $F_0 = 0$ and $F_1 = 1$. So, initialize `dp[0] = 0` and `dp[1] = 1`.
6.  **Determine Iteration Order:** Choose the loop order that guarantees when you compute `dp[i]`, all the values it depends on (e.g., `dp[i-1]`, `dp[i-2]`) are already computed. For Fibonacci, this means a simple forward loop from $i=2$ up to $N$.
7.  **Code and Solve:** Write the loops to fill the rest of the table according to the recurrence relation. The final answer will be in the table at the index corresponding to the original problem, `dp[N]`.

## Key ideas, with intuition
1.  **Optimal Substructure:** An optimal solution to a problem contains within it optimal solutions to subproblems.
    *   *Intuition:* If the shortest path from New York to Los Angeles passes through Chicago, then the NY-to-Chicago portion of that path *must* be the shortest path from New York to Chicago. If it weren't, you could substitute a shorter NY-to-Chicago path and get a shorter overall trip, which is a contradiction. DP relies on this principle to build larger optimal solutions from smaller ones.

2.  **Overlapping Subproblems:** A naive recursive algorithm solves the same subproblems over and over.
    *   *Intuition:* To compute `fib(5)`, you need `fib(4)` and `fib(3)`. To compute `fib(4)`, you need `fib(3)` and `fib(2)`. Notice that `fib(3)` is being computed twice. Tabulation computes `fib(3)` once, stores it, and re-uses the result.

3.  **State Transition (Recurrence Relation):** This is the mathematical rule for building the solution to a larger problem from smaller ones. It is the heart of the DP algorithm.
    $$
    \text{dp}[\text{state}] = f(\text{dp}[\text{smaller state}_1], \text{dp}[\text{smaller state}_2], \dots)
    $$
    *   *Intuition:* This is the blueprint. For our Fibonacci builder, the blueprint is "to build the i-th floor, stack the (i-1)-th and (i-2)-th floors on top of each other."

4.  **Bottom-Up Construction:** This is the core difference from memoization. You start with nothing built (no recursive calls) and lay the foundation (base cases). Then you iteratively build up, level by level, until you reach the top. This avoids recursion overhead and can sometimes be more space-efficient.

## Worked example
**Problem:** Calculate the 6th Fibonacci number, $F_6$.

**1. State & Table Size:**
The state is just the index $i$. We need to calculate up to $F_6$, so we need indices 0 through 6. Our table `dp` will be an array of size 7.

**2. Recurrence Relation:**
$F_i = F_{i-1} + F_{i-2}$. In our table, this is `dp[i] = dp[i-1] + dp[i-2]`.

**3. Initialize Base Cases:**
We know $F_0 = 0$ and $F_1 = 1$.
`dp[0] = 0`
`dp[1] = 1`

**4. Iteration and Filling the Table:**
We iterate from $i=2$ up to 6, applying the recurrence.

*   **Initial Table:**
    `dp = [0, 1, ?, ?, ?, ?, ?]`

*   **i = 2:** `dp[2] = dp[1] + dp[0] = 1 + 0 = 1`
    `dp = [0, 1, 1, ?, ?, ?, ?]`

*   **i = 3:** `dp[3] = dp[2] + dp[1] = 1 + 1 = 2`
    `dp = [0, 1, 1, 2, ?, ?, ?]`

*   **i = 4:** `dp[4] = dp[3] + dp[2] = 2 + 1 = 3`
    `dp = [0, 1, 1, 2, 3, ?, ?]`

*   **i = 5:** `dp[5] = dp[4] + dp[3] = 3 + 2 = 5`
    `dp = [0, 1, 1, 2, 3, 5, ?]`

*   **i = 6:** `dp[6] = dp[5] + dp[4] = 5 + 3 = 8`
    `dp = [0, 1, 1, 2, 3, 5, 8]`

**5. Final Answer:**
The solution is the value at the target index: `dp[6] = 8$.

**Reflection:** Each step worked because the dependencies were always met. To calculate `dp[i]`, we needed `dp[i-1]` and `dp[i-2]`. Our simple forward loop `i=2, 3, 4...` ensured that by the time we reached `i`, the values for `i-1` and `i-2` were already computed and waiting in the table. This is the essence of the bottom-up approach.

## Diagrams
Here is the state of the `dp` table as it's being filled for $F_6$.

**Initial State (Base Cases Filled):**
```text
index: 0   1   2   3   4   5   6
      +---+---+---+---+---+---+---+
dp:   | 0 | 1 |   |   |   |   |   |
      +---+---+---+---+---+---+---+
```

**After computing dp[2]:**
```text
index: 0   1   2   3   4   5   6
      +---+---+---+---+---+---+---+
dp:   | 0 | 1 | 1 |   |   |   |   |
      +---+---+---+---+---+---+---+
              ^---^
              dp[1]+dp[0]
```

**Final State (Table Filled):**
```text
index: 0   1   2   3   4   5   6
      +---+---+---+---+---+---+---+
dp:   | 0 | 1 | 1 | 2 | 3 | 5 | 8 |
      +---+---+---+---+---+---+---+
                                  ^
                                  Final Answer
```

## Memory technique — remember this forever
1.  **The Mnemonic: "The LEGO Master Builder"**
    Imagine building a complex LEGO model. You don't start with the flag on the highest tower. You open the instructions to page 1. You build the foundation (the **base cases**). Then, you follow the steps (**iteration order**) to add pieces, building upon what's already there (**recurrence relation**). Tabulation is just being a methodical LEGO builder for algorithms: start from the bottom, build up, and never try to place a brick where there's no support.

2.  **The Must-Know Formulas/Facts:**
    Overlearn these three conceptual steps, not a single formula, as they apply to *every* DP problem.
    *   **State Definition:** `dp[i][j]...` = Solution to the subproblem defined by parameters `i, j, ...`
    *   **Recurrence Relation:** `dp[i]...` = A function of `dp` values with smaller indices.
    *   **Base Cases:** `dp[0]...` = The solution to the smallest possible subproblem.

3.  **Spaced Repetition Schedule:**
    Drill a new DP problem using this tabulation framework on these days:
    *   Day 1: Climbing Stairs
    *   Day 3: House Robber
    *   Day 7: Coin Change
    *   Day 16: Longest Increasing Subsequence
    *   Day 35: Edit Distance

4.  **First Principles Pathway:**
    If you're ever stuck, rebuild from here:
    1.  Write the naive, brute-force recursive solution.
    2.  Identify the parameters of your recursive function `solve(arg1, arg2, ...)`. These arguments become the dimensions of your DP table: `dp[arg1][arg2]...`.
    3.  The `return` statement of the recursion gives you the recurrence relation.
    4.  The stopping conditions of the recursion (e.g., `if n <= 1`) give you the base cases.
    5.  The recursive calls (`solve(arg1-1, ...)` etc.) show you the dependencies. You must loop in an order that computes these dependencies first.

## Common mistakes
1.  **Off-by-one Table Sizing:** For a problem of size `N`, you often need a table of size `N+1` to accommodate the `0`-th case or to have a valid index `N`. Forgetting the `+1` is a common source of `IndexOutOfBounds` errors.
2.  **Incorrect Loop Order in 2D+ DP:** For a problem with state `dp[i][j]`, if the recurrence is `dp[i][j] = dp[i-1][j] + dp[i][j-1]`, you can loop over `i` then `j` or vice-versa. But if it's `dp[i][j] = dp[i-1][j-1]`, your loops must be structured to respect that diagonal dependency. Always check the recurrence before writing the loops.
3.  **Forgetting to Initialize Base Cases:** The loops build upon the base cases. If you don't seed the table with these initial values, your first few calculations will be based on garbage data, invalidating the entire table.
4.  **Mixing up States and Values:** Remember that `dp[i]` stores the *solution* for the subproblem of size `i`, not necessarily the value `i` itself.

## Self-check
1.  **Easy:** The "Climbing Stairs" problem asks how many distinct ways you can climb to the top of `n` stairs if you can take either 1 or 2 steps at a time. Define the state, recurrence relation, and base cases for a tabulation solution.
2.  **Medium:** For the "House Robber" problem, you are given an array of non-negative integers representing the amount of money in each house. You cannot rob two adjacent houses. Find the maximum amount of money you can rob. Define `dp[i]` as the maximum money you can rob up to and including house `i`. What is the recurrence relation?
3.  **Hard:** For the "Edit Distance" problem, you need to find the minimum operations to convert `word1` to `word2`. The state is `dp[i][j]`: the minimum distance between the first `i` characters of `word1` and the first `j` characters of `word2`. What is the recurrence relation if `word1[i] != word2[j]`? Consider the three possible operations: insert, delete, and replace.