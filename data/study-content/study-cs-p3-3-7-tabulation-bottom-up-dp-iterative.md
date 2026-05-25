## 1. What it is — in plain English

Imagine you're trying to solve a really big, complicated puzzle. Instead of staring at the whole thing and getting overwhelmed, what if you could break it down into tiny, super-simple mini-puzzles? And what if solving those tiny puzzles helped you solve slightly bigger ones, and those bigger ones helped you solve even bigger ones, until, eventually, you've solved the whole thing without ever feeling lost?

That's exactly what "Tabulation" is in Computer Science. It's a smart way to solve complex problems by systematically building up the solution from the simplest possible cases. We start by solving the absolute smallest versions of our problem, whose answers we know instantly.

Then, we store these answers in a kind of "lookup table" or "spreadsheet." Once we have the answers to the smallest problems, we use them to figure out the answers to slightly larger problems, and we store those too. We keep doing this, step by step, always using already-solved smaller problems to solve new, bigger ones, until we finally reach the solution to our original, big problem.

Think of it like building a LEGO castle: you start with the base bricks, then add layers on top, always making sure the lower layers are firmly in place before adding new ones. You never try to put the roof on before the walls are built! This "bottom-up" approach ensures we always have the necessary pieces (sub-problem solutions) before we need them.

## 2. Why it matters — real-world applications

Tabulation, as a form of Dynamic Programming, is incredibly powerful and finds applications in a vast array of real-world scenarios where optimal decisions or calculations need to be made based on previous results.

1.  **Bioinformatics (Sequence Alignment):** In genetics, scientists often need to compare DNA or protein sequences to find similarities, which can indicate evolutionary relationships or functional commonalities. Algorithms like Needleman-Wunsch and Smith-Waterman use tabulation to find the optimal alignment between two sequences, minimizing "gaps" or "mismatches." This is crucial for drug discovery, understanding genetic diseases, and phylogenetic tree construction.

2.  **Financial Modeling (Option Pricing):** Financial institutions use tabulation to price complex financial derivatives, such as options. The Black-Scholes model, while not directly DP, has extensions (like binomial option pricing models) that discretize time and use tabulation to calculate the option's value at each step backward from maturity, considering various stock price movements. This helps traders and investors make informed decisions about buying and selling financial instruments.

3.  **Route Optimization and Logistics:** Companies like FedEx, UPS, and Amazon need to find the most efficient routes for their delivery trucks or packages. While simpler shortest path algorithms (like Dijkstra's) are used, more complex scenarios involving time windows, multiple depots, or dynamic changes can leverage DP. For instance, the Bellman-Ford algorithm, which can be formulated using tabulation, finds shortest paths in graphs that might have negative edge weights, a scenario that arises in certain optimization problems. More broadly, the traveling salesman problem (though NP-hard) often uses DP techniques for smaller instances or as a component of approximation algorithms.

4.  **Resource Allocation and Project Management:** In large-scale projects, managers need to allocate resources (time, money, personnel) efficiently to minimize cost or maximize output. Tabulation can be used to solve problems like the Knapsack Problem (e.g., selecting which projects to fund given a budget constraint to maximize overall return) or scheduling tasks with dependencies to minimize project completion time. This is vital in aerospace engineering for planning mission critical tasks, or in manufacturing for optimizing production lines.

5.  **Reinforcement Learning (AI/Machine Learning):** In artificial intelligence, especially in reinforcement learning, agents learn to make decisions in an environment to maximize a cumulative reward. The core algorithms, like Value Iteration and Policy Iteration, are essentially dynamic programming algorithms. They use tabulation to compute the optimal value function or policy for a given Markov Decision Process (MDP), which dictates an agent's best actions in various states. This is fundamental to training autonomous systems, from self-driving cars to robotic control, and even in developing game-playing AIs.

## 3. Prerequisites — what you must know first

Before diving deep into tabulation, ensure you have a solid grasp of these foundational concepts:

*   **Recursion:** A programming technique where a function calls itself to solve smaller instances of the same problem.
*   **Base Cases:** The non-recursive conditions that stop a recursive function, providing a known answer for the smallest problems.
*   **Memoization (Top-Down DP):** A technique where results of expensive function calls are stored (cached) to avoid recomputing them, typically applied to recursive solutions. Tabulation is the "bottom-up" counterpart to memoization's "top-down" approach.
*   **Iteration:** The process of repeatedly executing a block of code using loops (e.g., `for` loops, `while` loops). Tabulation is inherently iterative.
*   **Arrays/Lists:** Linear data structures used to store collections of elements, often serving as the "table" in dynamic programming.
*   **Time and Space Complexity:** How to analyze the efficiency of algorithms in terms of time taken and memory used, typically using Big O notation.
*   **Problem Decomposition:** The ability to break down a large problem into smaller, more manageable subproblems.
*   **Optimal Substructure:** A property where an optimal solution to a problem can be constructed from optimal solutions to its subproblems.
*   **Overlapping Subproblems:** A property where the same subproblems are encountered and solved repeatedly when using a recursive approach. This is the key indicator that dynamic programming (either memoization or tabulation) can be beneficial.

## 4. The core idea — step by step

Let's break down the process of applying tabulation step by step, using the classic Fibonacci sequence as our running example. The Fibonacci sequence is defined as $F(0)=0$, $F(1)=1$, and $F(n) = F(n-1) + F(n-2)$ for $n \ge 2$. We want to find $F(n)$ for a given $n$.

### Step 1: Identify the problem and its structure

*   **Plain English:** What's the main question we're trying to answer? Can we see smaller versions of this question inside the big one?
    *   For Fibonacci: We want to find the $n$-th Fibonacci number. We notice that to find $F(n)$, we need $F(n-1)$ and $F(n-2)$. These are just smaller versions of the same problem.
*   **Concrete Example:** To find $F(5)$, we need $F(4)$ and $F(3)$. To find $F(4)$, we need $F(3)$ and $F(2)$, and so on.
*   **Formal/Mathematical Version:** We are looking for $P(n)$, where $P(n)$ is the $n$-th Fibonacci number. The structure reveals $P(n)$ depends on $P(n-1)$ and $P(n-2)$. This shows **optimal substructure** (the optimal solution to $P(n)$ uses optimal solutions to $P(n-1)$ and $P(n-2)$) and **overlapping subproblems** (e.g., $P(3)$ is needed for both $P(4)$ and $P(5)$).
*   **What could go wrong:** Not recognizing that the problem has these two key properties (optimal substructure and overlapping subproblems). If a problem doesn't have both, dynamic programming might not be the most efficient approach.

### Step 2: Define the DP state

*   **Plain English:** What piece of information do we need to store for each smaller problem? This will be the "cell" in our table (often an array). What does $DP[i]$ represent?
    *   For Fibonacci: We need to store the $i$-th Fibonacci number. So, $DP[i]$ will store $F(i)$.
*   **Concrete Example:** If we want $F(5)$, our table will need entries like $DP[0], DP[1], \dots, DP[5]$. $DP[3]$ will hold the value of $F(3)$.
*   **Formal/Mathematical Version:** Let $DP[i]$ denote the solution to the subproblem of finding the $i$-th Fibonacci number. The size of our DP table will typically be related to the input size, often $N+1$ for problems up to $N$.
*   **What could go wrong:** Defining the DP state incorrectly. For instance, if $DP[i]$ meant "the sum of Fibonacci numbers up to $i$", it wouldn't directly help us compute $F(i)$ using the given recurrence. The state must directly correspond to the subproblems.

### Step 3: Determine the base cases

*   **Plain English:** What are the absolute simplest versions of our problem whose answers we already know, without needing to calculate anything else? These are the starting points for filling our table.
    *   For Fibonacci: We know $F(0)=0$ and $F(1)=1$ by definition.
*   **Concrete Example:** We'll set $DP[0] = 0$ and $DP[1] = 1$. These are the first cells we fill in our table.
*   **Formal/Mathematical Version:**
    $$DP[0] = 0$$
    $$DP[1] = 1$$
*   **What could go wrong:** Incorrectly identifying base cases or missing some of them. If your base cases are wrong, all subsequent calculations built upon them will also be wrong.

### Step 4: Formulate the recurrence relation (transition)

*   **Plain English:** How do we use the answers to smaller problems (which are already in our table) to figure out the answer for a slightly larger problem? This is the rule that tells us how to fill each new cell in our table.
    *   For Fibonacci: The definition itself gives us the rule: $F(n) = F(n-1) + F(n-2)$.
*   **Concrete Example:** To find $DP[2]$, we use $DP[0]$ and $DP[1]$. So $DP[2] = DP[1] + DP[0] = 1 + 0 = 1$. To find $DP[3]$, we use $DP[1]$ and $DP[2]$. So $DP[3] = DP[2] + DP[1] = 1 + 1 = 2$.
*   **Formal/Mathematical Version:** For $i \ge 2$:
    $$DP[i] = DP[i-1] + DP[i-2]$$
*   **What could go wrong:** Getting the recurrence relation wrong. This is often the trickiest part, requiring careful thought about how subproblems combine to form larger problems. A common error is using values that don't represent the correct subproblem solutions.

### Step 5: Determine the iteration order

*   **Plain English:** In what order should we fill our table? We *must* calculate a cell's value only *after* all the cells it depends on have already been calculated and stored. For most tabulation problems, this means iterating from the smallest problem instances up to the largest.
    *   For Fibonacci: We start with $DP[0]$ and $DP[1]$. Then we calculate $DP[2]$ (which depends on $DP[0]$ and $DP[1]$). Then $DP[3]$ (depends on $DP[1]$ and $DP[2]$), and so on, all the way up to $DP[n]$.
*   **Concrete Example:** If we want $F(5)$, we'd fill the table in this order: $DP[0] \to DP[1] \to DP[2] \to DP[3] \to DP[4] \to DP[5]$.
*   **Formal/Mathematical Version:** We will iterate $i$ from $2$ up to $n$ (inclusive) to compute $DP[i]$.
*   **What could go wrong:** Iterating in the wrong order. If you try to calculate $DP[5]$ before $DP[3]$ and $DP[4]$ are known, you'll be using uninitialized or incorrect values, leading to wrong results or errors.

### Step 6: Construct the DP table iteratively

*   **Plain English:** This is where we actually write the code to create the table (e.g., an array) and fill it using loops, applying our base cases and recurrence relation in the correct iteration order.
    *   For Fibonacci:
        1.  Create an array `dp` of size `n+1`.
        2.  Set `dp[0] = 0`.
        3.  Set `dp[1] = 1`.
        4.  Loop `i` from `2` to `n`: `dp[i] = dp[i-1] + dp[i-2]`.
*   **Concrete Example (for $n=5$):**
    *   `dp = [_, _, _, _, _, _]` (size 6)
    *   `dp[0] = 0`
    *   `dp[1] = 1`
    *   `i=2`: `dp[2] = dp[1] + dp[0] = 1 + 0 = 1`
    *   `i=3`: `dp[3] = dp[2] + dp[1] = 1 + 1 = 2`
    *   `i=4`: `dp[4] = dp[3] + dp[2] = 2 + 1 = 3`
    *   `i=5`: `dp[5] = dp[4] + dp[3] = 3 + 2 = 5`
    *   Table: `dp = [0, 1, 1, 2, 3, 5]`
*   **Formal/Mathematical Version (Pseudocode):**
    ```
    function fibonacci_tabulation(n):
        if n == 0: return 0
        if n == 1: return 1

        DP = array of size (n + 1)
        DP[0] = 0
        DP[1] = 1

        for i from 2 to n:
            DP[i] = DP[i-1] + DP[i-2]

        return DP[n]
    ```
*   **What could go wrong:** Off-by-one errors in loop bounds or array indexing. Forgetting to handle edge cases for small `n` (like `n=0` or `n=1` in Fibonacci) before the loop starts.

### Step 7: Extract the final answer

*   **Plain English:** Once the entire table is filled, where is the answer to our original big problem?
    *   For Fibonacci: The answer to finding $F(n)$ is simply stored in $DP[n]$.
*   **Concrete Example:** For $n=5$, the answer is $DP[5]$, which is $5$.
*   **Formal/Mathematical Version:** The final solution to $P(n)$ is $DP[n]$. (For multi-dimensional DP, it might be $DP[N_1][N_2]$ or the maximum/minimum value within a certain range of the table).
*   **What could go wrong:** Looking in the wrong cell for the final answer, especially in problems where the answer isn't just the last cell computed but perhaps a maximum value across a row or column.

## 5. Worked examples — multiple, with every step shown

### Example 1: Fibonacci Number (Easy)

**Problem:** Calculate the $n$-th Fibonacci number using tabulation. The Fibonacci sequence is defined as $F(0)=0$, $F(1)=1$, and $F(n) = F(n-1) + F(n-2)$ for $n \ge 2$.

**Given:** An integer $n$.
**Wanted:** The value of $F(n)$.

Let's calculate $F(6)$.

1.  **Define DP state:**
    Let $DP[i]$ represent the $i$-th Fibonacci number, $F(i)$.
    *Explanation: We need to store each Fibonacci number as we compute it, so an array where the index is the Fibonacci number's position is natural.*

2.  **Determine base cases:**
    From the definition:
    $$DP[0] = 0$$
    $$DP[1] = 1$$
    *Explanation: These are the smallest, known values that don't depend on any other Fibonacci numbers.*

3.  **Formulate recurrence relation:**
    From the definition:
    $$DP[i] = DP[i-1] + DP[i-2] \quad \text{for } i \ge 2$$
    *Explanation: To get the current Fibonacci number, we sum the two preceding ones. This directly translates to our DP array.*

4.  **Determine iteration order:**
    We must calculate $DP[i]$ after $DP[i-1]$ and $DP[i-2]$ are known. So, we iterate $i$ from $2$ up to $n$.
    *Explanation: This ensures that when we try to compute $DP[i]$, all its dependencies (smaller subproblems) are already solved and stored in our table.*

5.  **Construct the DP table iteratively (for $n=6$):**
    First, create a `DP` array of size $n+1 = 7$. Initialize with placeholder values (e.g., `_`).
    $$DP = [\_, \_, \_, \_, \_, \_, \_]$$

    Apply base cases:
    $$DP[0] = 0$$
    $$DP[1] = 1$$
    $$DP = [0, 1, \_, \_, \_, \_, \_]$$

    Now, iterate from $i=2$ to $6$:

    *   For $i=2$:
        $$DP[2] = DP[2-1] + DP[2-2] = DP[1] + DP[0] = 1 + 0 = 1$$
        $$DP = [0, 1, 1, \_, \_, \_, \_]$$
        *Explanation: $F(2)$ is the sum of $F(1)$ and $F(0)$, which are already in $DP[1]$ and $DP[0]$.*

    *   For $i=3$:
        $$DP[3] = DP[3-1] + DP[3-2] = DP[2] + DP[1] = 1 + 1 = 2$$
        $$DP = [0, 1, 1, 2, \_, \_, \_]$$
        *Explanation: $F(3)$ is the sum of $F(2)$ and $F(1)$, which are in $DP[2]$ and $DP[1]$.*

    *   For $i=4$:
        $$DP[4] = DP[4-1] + DP[4-2] = DP[3] + DP[2] = 2 + 1 = 3$$
        $$DP = [0, 1, 1, 2, 3, \_, \_]$$
        *Explanation: $F(4)$ is the sum of $F(3)$ and $F(2)$, which are in $DP[3]$ and $DP[2]$.*

    *   For $i=5$:
        $$DP[5] = DP[5-1] + DP[5-2] = DP[4] + DP[3] = 3 + 2 = 5$$
        $$DP = [0, 1, 1, 2, 3, 5, \_]$$
        *Explanation: $F(5)$ is the sum of $F(4)$ and $F(3)$, which are in $DP[4]$ and $DP[3]$.*

    *   For $i=6$:
        $$DP[6] = DP[6-1] + DP[6-2] = DP[5] + DP[4] = 5 + 3 = 8$$
        $$DP = [0, 1, 1, 2, 3, 5, 8]$$
        *Explanation: $F(6)$ is the sum of $F(5)$ and $F(4)$, which are in $DP[5]$ and $DP[4]$.*

6.  **Extract the final answer:**
    The $n$-th Fibonacci number, $F(n)$, is stored in $DP[n]$. For $n=6$, the answer is $DP[6]$.
    $$\boxed{8}$$

**Reflection:** This example was straightforward because the problem definition directly provided the recurrence and base cases. The key was simply to translate this into an iterative table-filling process.

---

### Example 2: Minimum Cost Climbing Stairs (Medium)

**Problem:** You are given an integer array `cost` where `cost[i]` is the cost of the $i$-th step on a staircase. Once you pay the cost, you can either climb one or two steps. You can start from step 0 or step 1. Find the minimum cost to reach the top of the floor (which is one step *beyond* the last step in the `cost` array).

**Given:** An array of integers `cost` of length $N$.
**Wanted:** The minimum total cost to reach the "top" (index $N$).

Let's use `cost = [10, 15, 20]`. Here $N=3$. The "top" is step 3.

1.  **Define DP state:**
    Let $DP[i]$ be the minimum cost to reach step $i$.
    *Explanation: We want the minimum cost to reach the 'top', which is just past the last step in the array. If `cost` has $N$ steps (indices $0$ to $N-1$), the 'top' is step $N$. So we need to calculate costs up to $DP[N]$.*

2.  **Determine base cases:**
    You can start from step 0 or step 1 with no initial cost.
    $$DP[0] = 0 \quad \text{(Cost to reach step 0 is 0, as you can start there)}$$
    $$DP[1] = 0 \quad \text{(Cost to reach step 1 is 0, as you can start there)}$$
    *Explanation: The problem states we can start at index 0 or 1 for free. This means the cost to *arrive* at these steps from an imaginary "start" position is 0.*

3.  **Formulate recurrence relation:**
    To reach step $i$, you could have come from step $i-1$ (and paid `cost[i-1]` to step up) OR from step $i-2$ (and paid `cost[i-2]` to step up).
    So, the minimum cost to reach step $i$ is the minimum of these two options:
    $$DP[i] = \min(DP[i-1] + \text{cost}[i-1], DP[i-2] + \text{cost}[i-2]) \quad \text{for } i \ge 2$$
    *Explanation: This is the core logic. To reach step `i`, we must have taken a step from `i-1` or `i-2`. The cost of that step is the `cost` at the step you just came *from*. So, if you came from `i-1`, you were at `DP[i-1]` and paid `cost[i-1]`. If you came from `i-2`, you were at `DP[i-2]` and paid `cost[i-2]`.*

4.  **Determine iteration order:**
    We need $DP[i-1]$ and $DP[i-2]$ to calculate $DP[i]$. So, we iterate $i$ from $2$ up to $N$ (the "top" step).
    *Explanation: We build up the costs from the beginning of the staircase towards the top.*

5.  **Construct the DP table iteratively (for `cost = [10, 15, 20]`, $N=3$):**
    Create a `DP` array of size $N+1 = 4$. Initialize with placeholder values.
    $$DP = [\_, \_, \_, \_]$$

    Apply base cases:
    $$DP[0] = 0$$
    $$DP[1] = 0$$
    $$DP = [0, 0, \_, \_]$$

    Now, iterate from $i=2$ to $N=3$:

    *   For $i=2$:
        $$DP[2] = \min(DP[2-1] + \text{cost}[2-1], DP[2-2] + \text{cost}[2-2])$$
        $$DP[2] = \min(DP[1] + \text{cost}[1], DP[0] + \text{cost}[0])$$
        $$DP[2] = \min(0 + 15, 0 + 10)$$
        $$DP[2] = \min(15, 10) = 10$$
        $$DP = [0, 0, 10, \_]$$
        *Explanation: To reach step 2, we can come from step 1 (cost $DP[1]$ plus cost of step 1, which is `cost[1]`) or from step 0 (cost $DP[0]$ plus cost of step 0, which is `cost[0]`). We take the minimum.*

    *   For $i=3$:
        $$DP[3] = \min(DP[3-1] + \text{cost}[3-1], DP[3-2] + \text{cost}[3-2])$$
        $$DP[3] = \min(DP[2] + \text{cost}[2], DP[1] + \text{cost}[1])$$
        $$DP[3] = \min(10 + 20, 0 + 15)$$
        $$DP[3] = \min(30, 15) = 15$$
        $$DP = [0, 0, 10, 15]$$
        *Explanation: To reach step 3 (the top), we can come from step 2 (cost $DP[2]$ plus cost of step 2, `cost[2]`) or from step 1 (cost $DP[1]$ plus cost of step 1, `cost[1]`). We take the minimum.*

6.  **Extract the final answer:**
    The minimum cost to reach the "top" (step $N$) is $DP[N]$. For `cost = [10, 15, 20]`, $N=3$, the answer is $DP[3]$.
    $$\boxed{15}$$

**Reflection:** The trickiest part here was correctly defining the recurrence relation and understanding what `cost[i]` represents in the context of `DP[i]`. It's the cost *paid to step onto* step `i`, not the cost to *reach* step `i` and then step *off* it. The base cases of $DP[0]=0$ and $DP[1]=0$ are crucial for the "start from 0 or 1" condition.

---

### Example 3: Coin Change (Harder)

**Problem:** You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that `amount`. If that `amount` cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.

**Given:** An array `coins` and an integer `amount`.
**Wanted:** Minimum number of coins to make `amount`, or -1 if impossible.

Let's use `coins = [1, 2, 5]` and `amount = 11`.

1.  **Define DP state:**
    Let $DP[i]$ be the minimum number of coins required to make an amount of $i$.
    *Explanation: We want to find the minimum coins for `amount`. To do this bottom-up, we'll need to know the minimum coins for all smaller amounts up to `amount`.*

2.  **Determine base cases:**
    The minimum number of coins to make an amount of 0 is 0.
    $$DP[0] = 0$$
    For all other amounts $i > 0$, we initially don't know if they can be made, or what the minimum coins would be. So, we initialize them to a very large number (representing infinity), indicating "not yet reachable" or "impossible".
    $$DP[i] = \infty \quad \text{for } i > 0$$
    *Explanation: We can make 0 amount with 0 coins. For any other amount, until we find a way to make it, we assume it's impossible or requires an infinite number of coins. This allows `min` operations to correctly pick valid paths.*

3.  **Formulate recurrence relation:**
    To find $DP[i]$ (minimum coins for amount $i$), we can try using each coin denomination $c$ from our `coins` array.
    If we use coin $c$, then the remaining amount we need to make is $i-c$. The number of coins for $i$ would then be $1$ (for coin $c$) plus the minimum coins needed for $i-c$, which is $DP[i-c]$.
    We want the *minimum* of all such possibilities.
    $$DP[i] = \min_{c \in \text{coins}, i-c \ge 0} (1 + DP[i-c])$$
    This should only be considered if $DP[i-c]$ is not $\infty$.
    *Explanation: For each amount `i`, we iterate through all available `coins`. If we use a `coin`, the problem reduces to finding the minimum coins for `i - coin`. We add 1 (for the current `coin`) to that subproblem's solution and take the minimum across all possible `coins`.*

4.  **Determine iteration order:**
    To calculate $DP[i]$, we need $DP[i-c]$ for various $c$. Since $c$ is always positive, $i-c < i$. This means we must iterate $i$ from $1$ up to `amount`. For each $i$, we then iterate through all `coins`.
    *Explanation: We build up solutions for amounts $1, 2, 3, \dots, \text{amount}$, ensuring that when we calculate for amount `i`, all smaller amounts `i-c` have already been computed.*

5.  **Construct the DP table iteratively (for `coins = [1, 2, 5]`, `amount = 11`):**
    Create a `DP` array of size `amount + 1 = 12`. Initialize $DP[0]=0$ and all others to $\infty$.
    $$DP = [0, \infty, \infty, \infty, \infty, \infty, \infty, \infty, \infty, \infty, \infty, \infty]$$

    Now, iterate $i$ from $1$ to $11$:

    *   For $i=1$:
        *   `coin=1`: $1-1=0$. $DP[0]=0$. So $1+DP[0]=1$. $DP[1]=\min(\infty, 1)=1$.
        $$DP = [0, 1, \infty, \infty, \dots]$$

    *   For $i=2$:
        *   `coin=1`: $2-1=1$. $DP[1]=1$. So $1+DP[1]=2$. $DP[2]=\min(\infty, 2)=2$.
        *   `coin=2`: $2-2=0$. $DP[0]=0$. So $1+DP[0]=1$. $DP[2]=\min(2, 1)=1$.
        $$DP = [0, 1, 1, \infty, \dots]$$

    *   For $i=3$:
        *   `coin=1`: $3-1=2$. $DP[2]=1$. So $1+DP[2]=2$. $DP[3]=\min(\infty, 2)=2$.
        *   `coin=2`: $3-2=1$. $DP[1]=1$. So $1+DP[1]=2$. $DP[3]=\min(2, 2)=2$.
        *   `coin=5`: $3-5 < 0$. Skip.
        $$DP = [0, 1, 1, 2, \infty, \dots]$$

    *   For $i=4$:
        *   `coin=1`: $4-1=3$. $DP[3]=2$. So $1+DP[3]=3$. $DP[4]=\min(\infty, 3)=3$.
        *   `coin=2`: $4-2=2$. $DP[2]=1$. So $1+DP[2]=2$. $DP[4]=\min(3, 2)=2$.
        *   `coin=5`: $4-5 < 0$. Skip.
        $$DP = [0, 1, 1, 2, 2, \infty, \dots]$$

    *   For $i=5$:
        *   `coin=1`: $5-1=4$. $DP[4]=2$. So $1+DP[4]=3$. $DP[5]=\min(\infty, 3)=3$.
        *   `coin=2`: $5-2=3$. $DP[3]=2$. So $1+DP[3]=3$. $DP[5]=\min(3, 3)=3$.
        *   `coin=5`: $5-5=0$. $DP[0]=0$. So $1+DP[0]=1$. $DP[5]=\min(3, 1)=1$.
        $$DP = [0, 1, 1, 2, 2, 1, \infty, \dots]$$

    ... (continuing this process up to $i=11$)

    *   For $i=6$: (using $DP[5]=1, DP[4]=2, DP[1]=1$)
        *   `coin=1`: $1+DP[5]=1+1=2$.
        *   `coin=2`: $1+DP[4]=1+2=3$.
        *   `coin=5`: $1+DP[1]=1+1=2$.
        $DP[6] = \min(2,3,2) = 2$.
        $$DP = [0, 1, 1, 2, 2, 1, 2, \infty, \dots]$$

    *   For $i=7$: (using $DP[6]=2, DP[5]=1, DP[2]=1$)
        *   `coin=1`: $1+DP[6]=1+2=3$.
        *   `coin=2`: $1+DP[5]=1+1=2$.
        *   `coin=5`: $1+DP[2]=1+1=2$.
        $DP[7] = \min(3,2,2) = 2$.
        $$DP = [0, 1, 1, 2, 2, 1, 2, 2, \infty, \dots]$$

    *   For $i=8$: (using $DP[7]=2, DP[6]=2, DP[3]=2$)
        *   `coin=1`: $1+DP[7]=1+2=3$.
        *   `coin=2`: $1+DP[6]=1+2=3$.
        *   `coin=5`: $1+DP[3]=1+2=3$.
        $DP[8] = \min(3,3,3) = 3$.
        $$DP = [0, 1, 1, 2, 2, 1, 2, 2, 3, \infty, \dots]$$

    *   For $i=9$: (using $DP[8]=3, DP[7]=2, DP[4]=2$)
        *   `coin=1`: $1+DP[8]=1+3=4$.
        *   `coin=2`: $1+DP[7]=1+2=3$.
        *   `coin=5`: $1+DP[4]=1+2=3$.
        $DP[9] = \min(4,3,3) = 3$.
        $$DP = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, \infty, \dots]$$

    *   For $i=10$: (using $DP[9]=3, DP[8]=3, DP[5]=1$)
        *   `coin=1`: $1+DP[9]=1+3=4$.
        *   `coin=2`: $1+DP[8]=1+3=4$.
        *   `coin=5`: $1+DP[5]=1+1=2$.
        $DP[10] = \min(4,4,2) = 2$.
        $$DP = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, \infty]$$

    *   For $i=11$: (using $DP[10]=2, DP[9]=3, DP[6]=2$)
        *   `coin=1`: $1+DP[10]=1+2=3$.
        *   `coin=2`: $1+DP[9]=1+3=4$.
        *   `coin=5`: $1+DP[6]=1+2=3$.
        $DP[11] = \min(3,4,3) = 3$.
        $$DP = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]$$

6.  **Extract the final answer:**
    The minimum coins for `amount` is $DP[\text{amount}]$. If $DP[\text{amount}]$ is still $\infty$, it means the amount cannot be made.
    For `amount = 11`, $DP[11]=3$. Since $3 \ne \infty$, this is our answer.
    $$\boxed{3}$$

**Reflection:** The main challenge here was correctly initializing the DP table with $\infty$ and handling the $DP[i-c]$ being $\infty$ condition in the recurrence. The nested loops (outer for amount, inner for coins) are typical for problems where each state can be reached by multiple "previous" states.

---

### Example 4: Longest Common Subsequence (LCS) (Hardest, 2D DP)

**Problem:** Given two strings, `text1` and `text2`, return the length of their longest common subsequence. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Given:** Two strings, `text1` and `text2`.
**Wanted:** The length of their Longest Common Subsequence (LCS).

Let's use `text1 = "abcde"` and `text2 = "ace"`.

1.  **Define DP state:**
    Let $DP[i][j]$ be the length of the Longest Common Subsequence of `text1[0...i-1]` and `text2[0...j-1]`.
    *Explanation: Since we have two strings, our subproblems involve prefixes of these strings. A 2D table naturally stores the LCS length for all combinations of prefixes. We use `i-1` and `j-1` to simplify indexing later when comparing characters.*

2.  **Determine base cases:**
    If either string is empty, the LCS length is 0.
    $$DP[0][j] = 0 \quad \text{for all } j \text{ from } 0 \text{ to } \text{len(text2)}$$
    $$DP[i][0] = 0 \quad \text{for all } i \text{ from } 0 \text{ to } \text{len(text1)}$$
    *Explanation: An empty string has no characters, so it cannot form a common subsequence with any other string.*

3.  **Formulate recurrence relation:**
    For $i > 0$ and $j > 0$:
    *   **Case 1: Characters match.** If `text1[i-1]` (the $i$-th character of `text1`) is equal to `text2[j-1]` (the $j$-th character of `text2`):
        Then this character is part of the LCS. The length of the LCS increases by 1, and we add it to the LCS of the *previous* prefixes:
        $$DP[i][j] = 1 + DP[i-1][j-1]$$
        *Explanation: If the current characters match, we include them in the LCS. This means the LCS length is 1 plus the LCS of the strings without these matching characters.*

    *   **Case 2: Characters do not match.** If `text1[i-1]` is not equal to `text2[j-1]`:
        We cannot include both characters in the LCS. We must either exclude `text1[i-1]` (and find LCS of `text1[0...i-2]` and `text2[0...j-1]`, which is $DP[i-1][j]$) OR exclude `text2[j-1]` (and find LCS of `text1[0...i-1]` and `text2[0...j-2]`, which is $DP[i][j-1]$). We take the maximum of these two options.
        $$DP[i][j] = \max(DP[i-1][j], DP[i][j-1])$$
        *Explanation: If characters don't match, we try two paths: either drop the last character of `text1` and find LCS with `text2`, or drop the last character of `text2` and find LCS with `text1`. We take the best result.*

4.  **Determine iteration order:**
    To calculate $DP[i][j]$, we need $DP[i-1][j-1]$, $DP[i-1][j]$, and $DP[i][j-1]$. This means we must iterate $i$ from $1$ to `len(text1)` and $j$ from $1$ to `len(text2)`. The order of $i$ and $j$ loops doesn't strictly matter (e.g., $i$ outer, $j$ inner; or $j$ outer, $i$ inner) as long as both dimensions increase.
    *Explanation: We fill the 2D table row by row, or column by column, ensuring that all cells to the left and above the current cell are already computed.*

5.  **Construct the DP table iteratively (for `text1="abcde"`, `text2="ace"`):**
    Let $N_1 = \text{len(text1)} = 5$ and $N_2 = \text{len(text2)} = 3$.
    Create a $DP$ table of size $(N_1+1) \times (N_2+1)$, i.e., $6 \times 4$.
    Initialize the first row and first column to 0 (base cases).

    $$DP =
    \begin{pmatrix}
    0 & 0 & 0 & 0 \\
    0 & \_ & \_ & \_ \\
    0 & \_ & \_ & \_ \\
    0 & \_ & \_ & \_ \\
    0 & \_ & \_ & \_ \\
    0 & \_ & \_ & \_
    \end{pmatrix}$$
    (Rows correspond to `text1` prefixes, columns to `text2` prefixes)
    `text1`: (empty) a b c d e
    `text2`: (empty) a c e

    Iterate $i$ from $1$ to $5$, and $j$ from $1$ to $3$:

    *   **$i=1$ (`text1` prefix "a"), $j=1$ (`text2` prefix "a"):**
        `text1[0]` ('a') == `text2[0]` ('a'). Match!
        $DP[1][1] = 1 + DP[0][0] = 1 + 0 = 1$.
        $$DP =
        \begin{pmatrix}
        0 & 0 & 0 & 0 \\
        0 & 1 & \_ & \_ \\
        0 & \_ & \_ & \_ \\
        \vdots & & &
        \end{pmatrix}$$

    *   **$i=1$ (`text1` prefix "a"), $j=2$ (`text2` prefix "ac"):