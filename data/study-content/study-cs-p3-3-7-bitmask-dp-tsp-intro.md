## 1. What it is — in plain English

Imagine you're planning an epic road trip. You have a list of cities you absolutely *must* visit, and you want to find the shortest total distance you have to drive to see all of them, starting from your home city and eventually returning home. This "shortest road trip" problem is famously called the Traveling Salesperson Problem (TSP).

Now, imagine you're trying to figure out the best route. You can't just randomly pick cities; you need a smart way to keep track of which cities you've already visited so you don't go back to them unnecessarily, and which city you just came from. This is where "Bitmask DP" comes in.

"Bitmask" is like a super-efficient digital checklist. For each city, you have an "on/off" switch. If the switch is "on," you've visited that city. If it's "off," you haven't. All these switches are packed into a single number, called a bitmask. "DP" stands for Dynamic Programming, which is a fancy way of saying we're breaking the big road trip problem into smaller, overlapping mini-road trips, solving each mini-trip once, and storing its answer to avoid re-calculating it later.

So, Bitmask DP for TSP means we're using this digital checklist (the bitmask) to keep track of visited cities while we systematically build up solutions to the shortest path problem using dynamic programming. It helps us explore routes efficiently without getting lost or repeating calculations for parts of the journey we've already figured out.

## 2. Why it matters — real-world applications

The Traveling Salesperson Problem, and the techniques used to solve it (like Bitmask DP for smaller instances), are fundamental to many real-world optimization challenges. While Bitmask DP specifically handles relatively small numbers of cities (typically up to 20-25), the principles extend to more complex approximation algorithms used for larger instances.

1.  **Logistics and Delivery Services**: Companies like UPS, FedEx, and Amazon face the TSP daily. They need to find the most efficient routes for their delivery trucks to drop off packages at hundreds or thousands of locations. Minimizing travel distance saves fuel, time, and labor costs, directly impacting profitability and delivery speed.
2.  **Circuit Board Manufacturing**: When drilling holes in a printed circuit board (PCB), a robotic drill head needs to visit many specific points. The order in which it drills these holes affects the total time taken. Finding the shortest path for the drill head minimizes manufacturing time, increasing production efficiency.
3.  **DNA Sequencing and Genomics (Bioinformatics)**: In some advanced sequencing techniques, fragments of DNA need to be assembled in the correct order. This can sometimes be modeled as a TSP-like problem, where "cities" are DNA fragments and "distances" represent the likelihood or cost of connecting them in a certain order. Optimizing this assembly helps reconstruct entire genomes more accurately and quickly.
4.  **Satellite Scheduling (Aerospace)**: Imaging satellites orbit Earth and need to photograph various targets. Each target has a specific window of visibility. Scheduling the sequence of target observations to maximize coverage or minimize fuel expenditure for re-positioning can be formulated as a TSP variation. This ensures optimal utilization of expensive space assets.
5.  **Machine Learning (Feature Selection/Clustering)**: While not a direct TSP application, the combinatorial optimization thinking is relevant. For instance, in some clustering algorithms, or when selecting an optimal subset of features in a high-dimensional dataset, one might explore paths through a "feature space" to find an optimal configuration. Although exact TSP is rarely used directly, the need to explore state spaces efficiently, often with constraints on "visited" states, shares conceptual similarities with Bitmask DP.

## 3. Prerequisites — what you must know first

Before diving into Bitmask DP for TSP, ensure you have a solid grasp of these foundational concepts:

*   **Dynamic Programming (DP)**: Understanding how to identify overlapping subproblems and optimal substructure, and the techniques of memoization (top-down DP with caching) and tabulation (bottom-up DP).
*   **Recursion**: Familiarity with recursive function calls, base cases, and how to break down problems into smaller instances of themselves.
*   **Graph Theory Basics**: Knowledge of what a graph is (nodes/vertices, edges), weighted graphs, paths, cycles, and common graph representations (adjacency matrix, adjacency list).
*   **Bitwise Operations**: A strong understanding of bitwise AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), left shift (`<<`), and right shift (`>>`) operations, and how they manipulate individual bits within an integer.
*   **Combinatorics Basics**: An intuitive understanding of permutations and combinations, as these problems often involve exploring different orderings or selections of elements.
*   **Complexity Analysis**: Ability to analyze the time and space complexity of algorithms using Big O notation.

## 4. The core idea — step by step

Let's break down the core idea of using Bitmask DP to solve the Traveling Salesperson Problem.

### ### Step 1: Understanding the Traveling Salesperson Problem (TSP) Formally

*   **Plain English Statement**: The Traveling Salesperson Problem asks us to find the shortest possible route that visits a given set of cities exactly once and returns to the origin city. Think of a salesperson starting from their home, visiting all clients, and then returning home, wanting to minimize total travel time or distance.

*   **Small Concrete Example**:
    Imagine you have 3 cities: A, B, C. Let's say city A is your starting point.
    Possible routes:
    1.  A $\to$ B $\to$ C $\to$ A
    2.  A $\to$ C $\to$ B $\to$ A
    You would calculate the total distance for each route (e.g., $dist(A,B) + dist(B,C) + dist(C,A)$) and pick the one with the minimum total distance.

*   **Formal/Mathematical Version**:
    Given a complete, weighted graph $G = (V, E)$, where $V$ is the set of $N$ cities and $E$ is the set of edges (representing roads between cities) with associated non-negative weights (distances or costs). The goal is to find a Hamiltonian cycle of minimum total weight. A Hamiltonian cycle is a cycle that visits each vertex exactly once.
    Let $c_{ij}$ be the cost of traveling from city $i$ to city $j$. We want to find a permutation $\pi = (\pi_0, \pi_1, \ldots, \pi_{N-1})$ of the cities such that $\pi_0$ is the starting city, and the total cost
    $$ \sum_{i=0}^{N-2} c_{\pi_i, \pi_{i+1}} + c_{\pi_{N-1}, \pi_0} $$
    is minimized.

*   **What Could Go Wrong**: If we try to solve this by listing all possible routes (permutations), the number of routes grows extremely fast. For $N$ cities, there are $(N-1)!$ possible routes (if we fix the start city). For just 10 cities, this is $9! = 362,880$. For 20 cities, it's $19! \approx 1.2 \times 10^{17}$, which is computationally infeasible even for supercomputers. This exponential growth is why TSP is classified as an NP-hard problem.

### ### Step 2: Breaking Down TSP with Dynamic Programming

*   **Plain English Statement**: Since brute-force is too slow, we use Dynamic Programming. DP works by breaking a big problem into smaller, overlapping subproblems. The idea here is that if we know the shortest path to visit a *subset* of cities and end at a particular city, we can use that information to find the shortest path to visit a *larger subset* of cities.

*   **Small Concrete Example**:
    Suppose we want to find the shortest path to visit cities {A, B, C} ending at C.
    To reach C, we must have come from either A or B.
    *   If we came from A: the path was {A, B} ending at A, then A $\to$ C.
    *   If we came from B: the path was {A, B} ending at B, then B $\to$ C.
    We would take the minimum of these two options. Notice that "shortest path to visit {A, B} ending at A" and "shortest path to visit {A, B} ending at B" are smaller subproblems that we can solve first.

*   **Formal/Mathematical Version**:
    We need a way to define a "state" that captures enough information to solve subproblems. A state must tell us:
    1.  Which cities have already been visited.
    2.  Which city we are currently at (the last city visited in the path).
    A DP state could be represented as $dp(\text{current\_city}, \text{set\_of\_visited\_cities})$.

*   **What Could Go Wrong**: Representing the `set_of_visited_cities` using a standard data structure like a list or hash set would be inefficient for DP. Comparing sets, hashing sets, or passing them around recursively would be too slow and consume too much memory. We need a more compact and efficient way to represent this set.

### ### Step 3: Introducing Bitmasks to Represent Visited Sets

*   **Plain English Statement**: This is the "Bitmask" part. Instead of a list of visited cities, we use a single integer where each "bit" (binary digit) acts as a flag. If the $i$-th bit is '1', it means city $i$ has been visited. If it's '0', city $i$ has not been visited. This is extremely compact and allows for very fast set operations using bitwise logic.

*   **Small Concrete Example**:
    Let's say we have 4 cities, indexed 0, 1, 2, 3.
    *   If no cities are visited: `0000` (binary) = 0 (decimal)
    *   If only city 0 is visited: `0001` (binary) = 1 (decimal)
    *   If only city 1 is visited: `0010` (binary) = 2 (decimal)
    *   If cities 0 and 1 are visited: `0011` (binary) = 3 (decimal)
    *   If cities 0, 2, and 3 are visited: `1101` (binary) = 13 (decimal)
    *   If all 4 cities are visited: `1111` (binary) = 15 (decimal)
    To mark city $i$ as visited: `mask = mask | (1 << i)`
    To check if city $i$ is visited: `(mask & (1 << i)) != 0`
    To remove city $i$ from visited set (if it was the last one added): `mask = mask ^ (1 << i)` (XORing with `1 << i` flips the $i$-th bit).

*   **Formal/Mathematical Version**:
    Let $N$ be the number of cities. We can assign an index $i \in \{0, 1, \ldots, N-1\}$ to each city.
    A bitmask $mask$ is an integer where the $i$-th bit (from right, 0-indexed) is set to 1 if city $i$ is visited, and 0 otherwise.
    The total number of possible masks is $2^N$.
    Operations:
    *   Setting the $i$-th bit: $mask \leftarrow mask | (1 \ll i)$
    *   Checking the $i$-th bit: $(mask \gg i) \& 1$ or $(mask \& (1 \ll i)) \neq 0$
    *   Unsetting the $i$-th bit: $mask \leftarrow mask \text{ XOR } (1 \ll i)$ (assuming the bit was set)
    *   Checking if a mask contains another mask (subset): $(mask\_A \text{ AND } mask\_B) == mask\_B$

*   **What Could Go Wrong**: Misunderstanding bitwise operations can lead to subtle bugs. Forgetting that `1 << i` creates a number with only the $i$-th bit set can cause issues. Also, off-by-one errors in city indexing (0-indexed vs. 1-indexed) are common.

### ### Step 4: Defining the DP State for Bitmask DP TSP

*   **Plain English Statement**: Our DP table, often called `dp`, will store the minimum cost for each unique subproblem. Each subproblem is defined by two pieces of information: the set of cities already visited (represented by a bitmask) and the *last city* visited in that path.

*   **Small Concrete Example**:
    For $N=4$ cities (0, 1, 2, 3):
    `dp[mask][last_city]`
    *   `dp[0001 (binary)][0]` would store the cost of visiting only city 0, ending at city 0 (which is 0, our starting point).
    *   `dp[0011 (binary)][1]` would store the minimum cost to visit cities {0, 1}, ending at city 1.
    *   `dp[0101 (binary)][2]` would store the minimum cost to visit cities {0, 2}, ending at city 2.

*   **Formal/Mathematical Version**:
    Let $N$ be the number of cities. We define a 2D DP table:
    $dp[mask][u]$: The minimum cost of a path that starts at a designated `start_node`, visits all cities whose bits are set in $mask$, and ends at city $u$.
    The dimensions of this table will be $2^N \times N$.
    Initialize all $dp[mask][u]$ to infinity, except for the base case.

*   **What Could Go Wrong**: Incorrectly defining what `mask` represents. Does `mask` include the `last_city` or not? For TSP, `mask` *always includes* `last_city`. If `mask` represents visited cities and `u` is the current city, then the $u$-th bit *must* be set in `mask`. Forgetting to initialize with infinity, which is crucial for `min` operations.

### ### Step 5: Formulating the Recurrence Relation

*   **Plain English Statement**: To calculate `dp[mask][u]` (the minimum cost to visit cities in `mask` ending at `u`), we consider all possible cities `v` that we could have come from *just before* `u`. For each `v`, we look up the minimum cost to visit the cities in `mask` *excluding* `u`, ending at `v` (which is `dp[mask_without_u][v]`), and add the cost of traveling from `v` to `u`. We take the minimum of all these possibilities.

*   **Small Concrete Example**:
    Suppose we want to calculate `dp[0111 (binary)][2]` (min cost to visit {0, 1, 2} ending at city 2).
    We could have come to city 2 from city 0 or city 1.
    1.  Came from city 0: `dp[0011 (binary)][0]` (min cost to visit {0, 1} ending at 0) + `cost(0, 2)`.
    2.  Came from city 1: `dp[0101 (binary)][1]` (min cost to visit {0, 2} ending at 1) + `cost(1, 2)`.
    `dp[0111][2]` would be the minimum of these two values.

*   **Formal/Mathematical Version**:
    Let `start_node` be the fixed starting city (usually city 0).
    **Base Case**: $dp[1 \ll \text{start\_node}][\text{start\_node}] = 0$. All other $dp[mask][u]$ are initialized to $\infty$.
    **Iteration Order**: We iterate through masks in increasing order of the number of set bits (or simply increasing integer value of `mask`). This ensures that `dp[mask_without_u][v]` is already computed when we need it.
    **Recurrence**: For each $mask$ from $1$ to $(1 \ll N) - 1$:
    For each city $u$ from $0$ to $N-1$:
        If the $u$-th bit is NOT set in $mask$ (`!(mask & (1 \ll u))`), then this state is invalid; continue.
        If $u == \text{start\_node}$ and $mask \neq (1 \ll \text{start\_node})$, this means we're trying to visit the start node *again* before visiting all other nodes, which is not allowed for intermediate steps. Continue.
        
        For each city $v$ from $0$ to $N-1$:
            If $v == u$, continue (cannot come from itself).
            If the $v$-th bit is set in $mask$ (`mask & (1 \ll v)`):
                Let $prev\_mask = mask \text{ XOR } (1 \ll u)$ (this is `mask` with city $u$ removed).
                If $dp[prev\_mask][v]$ is not $\infty$ (meaning there's a valid path to $v$ with `prev_mask`):
                    $$ dp[mask][u] = \min(dp[mask][u], dp[prev\_mask][v] + \text{cost}(v, u)) $$

*   **What Could Go Wrong**:
    1.  **Incorrect `prev_mask` calculation**: Using `mask - (1 << u)` instead of `mask ^ (1 << u)` can lead to wrong results if `mask` is not just `(1<<v) | (1<<u)`. XOR is the correct way to flip a bit.
    2.  **Wrong iteration order**: If you try to calculate `dp[mask][u]` before `dp[prev_mask][v]` is ready, you'll use uninitialized (or incorrect) values. Iterating masks by increasing value ensures this.
    3.  **Base case errors**: Setting the base case incorrectly, or not initializing other states to infinity.
    4.  **Self-loops or re-visiting start node**: The conditions `v == u` and `u == start_node` (for intermediate masks) are crucial to enforce the "visit each city exactly once" rule.

### ### Step 6: Calculating the Final Answer

*   **Plain English Statement**: Once the entire `dp` table is filled, the final answer is the minimum cost to visit *all* cities and then return to the starting city. We look at all paths that visited *all* cities and ended at some city `u` (other than the start city), and then add the cost to travel from that `u` back to the `start_node`.

*   **Small Concrete Example**:
    If we started at city 0, and we have $N$ cities, the mask representing all cities visited is `(1 << N) - 1`.
    We need to find:
    `min(dp[(1 << N) - 1][1] + cost(1, 0),`
    `    dp[(1 << N) - 1][2] + cost(2, 0),`
    `    ...`
    `    dp[(1 << N) - 1][N-1] + cost(N-1, 0))`

*   **Formal/Mathematical Version**:
    Let `all_cities_mask` be the mask where all $N$ bits are set, i.e., $(1 \ll N) - 1$.
    The final minimum cost is:
    $$ \min_{u=0 \dots N-1, u \neq \text{start\_node}} (dp[\text{all\_cities\_mask}][u] + \text{cost}(u, \text{start\_node})) $$
    If the graph is such that no Hamiltonian cycle exists (e.g., disconnected graph and `start_node` cannot reach all others), this minimum could remain $\infty$.

*   **What Could Go Wrong**: Forgetting to add the final `cost(u, start_node)` is a very common mistake. Also, if the problem statement is a variation (e.g., "shortest path visiting all cities, *not* necessarily returning to start"), the final step would be different.

## 5. Worked examples — multiple, with every step shown

Let's assume `start_node = 0` for all examples. Costs are given by an adjacency matrix `adj[i][j]`. Initialize `dp` table with $\infty$.

### Example 1 (Easy): 3 Cities

**Problem**: Find the shortest Hamiltonian cycle starting and ending at city 0 for a graph with 3 cities (0, 1, 2).
**Given**: Adjacency matrix `adj`:
$$
\begin{pmatrix}
\infty & 10 & 15 \\
10 & \infty & 5 \\
15 & 5 & \infty
\end{pmatrix}
$$
(Note: $\infty$ for self-loops, `adj[i][j]` is cost from `i` to `j`).
**What we want**: The minimum total cost of a path $0 \to \text{city } X \to \text{city } Y \to 0$ where $X, Y \in \{1, 2\}$ and $X \neq Y$.

**Solution**:
Number of cities $N=3$.
DP table `dp[mask][last_city]`. `mask` goes from 0 to $2^3 - 1 = 7$. `last_city` goes from 0 to 2.

**Initialization**:
`dp` table is $8 \times 3$. All values are $\infty$.
Base case: $dp[1 \ll 0][0] = dp[001_2][0] = dp[1][0] = 0$.
Explanation: The cost to visit only city 0, ending at city 0, is 0.

**Iteration**:
We iterate `mask` from 1 to 7. For each `mask`, iterate `u` from 0 to 2.

*   **`mask = 1 (001_2)`**:
    *   `u = 0`: `dp[1][0] = 0` (base case, already set).
    *   `u = 1`: `(1 & (1 << 1)) == 0`. Bit 1 not set. Skip.
    *   `u = 2`: `(1 & (1 << 2)) == 0`. Bit 2 not set. Skip.

*   **`mask = 2 (010_2)`**:
    *   `u = 0`: `(2 & (1 << 0)) == 0`. Bit 0 not set. Skip.
    *   `u = 1`: `(2 & (1 << 1)) != 0`. Bit 1 is set.
        *   `prev_mask = 2 \text{ XOR } (1 \ll 1) = 0`.
        *   This `prev_mask` is invalid (empty set, cannot come from anywhere unless it's the start). We only consider valid `prev_mask` that contains `start_node`.
        *   A path must start at city 0. So, for any `mask` to be valid, `mask` must have bit 0 set. `mask = 2` does not have bit 0 set. This state is unreachable from city 0. `dp[2][1]` remains $\infty$.
    *   `u = 2`: Bit 2 not set. Skip.

*   **`mask = 3 (011_2)`**: Cities {0, 1} visited.
    *   `u = 0`: `u == start_node` and `mask != (1 << start_node)`. Skip (cannot end at start unless all cities visited).
    *   `u = 1`: `(3 & (1 << 1)) != 0`. Bit 1 is set.
        *   `prev_mask = 3 \text{ XOR } (1 \ll 1) = 1 (001_2)`. This represents {0}.
        *   Consider `v = 0`: `(1 & (1 << 0)) != 0`. Bit 0 is set in `prev_mask`.
            *   `dp[3][1] = min(dp[3][1], dp[1][0] + adj[0][1])`
            *   `dp[3][1] = min(\infty, 0 + 10) = 10`.
            Explanation: To visit {0, 1} ending at 1, we must have come from 0. The cost is (path {0} ending at 0) + cost(0 to 1).
    *   `u = 2`: `(3 & (1 << 2)) == 0`. Bit 2 not set. Skip.

*   **`mask = 4 (100_2)`**:
    *   `u = 0, 1`: Bit not set. Skip.
    *   `u = 2`: `(4 & (1 << 2)) != 0`. Bit 2 is set.
        *   `prev_mask = 4 \text{ XOR } (1 \ll 2) = 0`. Invalid. (Again, must have bit 0 set in mask).
        *   `dp[4][2]` remains $\infty$.

*   **`mask = 5 (101_2)`**: Cities {0, 2} visited.
    *   `u = 0`: Skip.
    *   `u = 1`: Bit 1 not set. Skip.
    *   `u = 2`: `(5 & (1 << 2)) != 0`. Bit 2 is set.
        *   `prev_mask = 5 \text{ XOR } (1 \ll 2) = 1 (001_2)`. This represents {0}.
        *   Consider `v = 0`: `(1 & (1 << 0)) != 0`. Bit 0 is set in `prev_mask`.
            *   `dp[5][2] = min(dp[5][2], dp[1][0] + adj[0][2])`
            *   `dp[5][2] = min(\infty, 0 + 15) = 15`.
            Explanation: To visit {0, 2} ending at 2, we must have come from 0. The cost is (path {0} ending at 0) + cost(0 to 2).

*   **`mask = 6 (110_2)`**: Cities {1, 2} visited.
    *   `u = 0`: Skip.
    *   `u = 1`: Bit 1 is set.
        *   `prev_mask = 6 \text{ XOR } (1 \ll 1) = 4 (100_2)`. This represents {2}.
        *   `dp[4][2]` is $\infty$. No valid path.
    *   `u = 2`: Bit 2 is set.
        *   `prev_mask = 6 \text{ XOR } (1 \ll 2) = 2 (010_2)`. This represents {1}.
        *   `dp[2][1]` is $\infty$. No valid path.
    *   `dp[6][1]` and `dp[6][2]` remain $\infty$. This is correct because mask 6 ({1,2}) doesn't include city 0, so it's not reachable from our starting point.

*   **`mask = 7 (111_2)`**: Cities {0, 1, 2} visited. This is `all_cities_mask`.
    *   `u = 0`: Skip (cannot end at start before returning home).
    *   `u = 1`: `(7 & (1 << 1)) != 0`. Bit 1 is set.
        *   `prev_mask = 7 \text{ XOR } (1 \ll 1) = 5 (101_2)`. This represents {0, 2}.
        *   Consider `v = 0`: `(5 & (1 << 0)) != 0`. Bit 0 is set in `prev_mask`.
            *   `dp[7][1] = min(dp[7][1], dp[5][0] + adj[0][1])`. `dp[5][0]` is $\infty$.
        *   Consider `v = 2`: `(5 & (1 << 2)) != 0`. Bit 2 is set in `prev_mask`.
            *   `dp[7][1] = min(dp[7][1], dp[5][2] + adj[2][1])`
            *   `dp[7][1] = min(\infty, 15 + 5) = 20`.
            Explanation: To visit {0,1,2} ending at 1, we must have come from 2. Cost is (path {0,2} ending at 2) + cost(2 to 1).
    *   `u = 2`: `(7 & (1 << 2)) != 0`. Bit 2 is set.
        *   `prev_mask = 7 \text{ XOR } (1 \ll 2) = 3 (011_2)`. This represents {0, 1}.
        *   Consider `v = 0`: `(3 & (1 << 0)) != 0`. Bit 0 is set in `prev_mask`.
            *   `dp[7][2] = min(dp[7][2], dp[3][0] + adj[0][2])`. `dp[3][0]` is $\infty$.
        *   Consider `v = 1`: `(3 & (1 << 1)) != 0`. Bit 1 is set in `prev_mask`.
            *   `dp[7][2] = min(dp[7][2], dp[3][1] + adj[1][2])`
            *   `dp[7][2] = min(\infty, 10 + 5) = 15`.
            Explanation: To visit {0,1,2} ending at 2, we must have come from 1. Cost is (path {0,1} ending at 1) + cost(1 to 2).

**Final Answer Calculation**:
`all_cities_mask = 7 (111_2)`.
`min_cost = \infty`.
For `u` from 0 to 2, `u != start_node` (so `u = 1, 2`):
*   `u = 1`: `min_cost = min(\infty, dp[7][1] + adj[1][0]) = min(\infty, 20 + 10) = 30`.
    Explanation: Path $0 \to 2 \to 1 \to 0$. Cost $15 + 5 + 10 = 30$.
*   `u = 2`: `min_cost = min(30, dp[7][2] + adj[2][0]) = min(30, 15 + 15) = 30`.
    Explanation: Path $0 \to 1 \to 2 \to 0$. Cost $10 + 5 + 15 = 30$.

The minimum cost is $\boxed{30}$.

**Reflection**: This example was straightforward because the graph is small and fully connected. The key was to correctly handle the base case and the `prev_mask` calculation. The `dp[mask][u]` values that remained $\infty$ were for masks that didn't include the starting city 0, indicating they were unreachable.

### Example 2 (Medium): 4 Cities, non-symmetric costs

**Problem**: Find the shortest Hamiltonian cycle starting and ending at city 0 for a graph with 4 cities (0, 1, 2, 3) with non-symmetric costs.
**Given**: Adjacency matrix `adj`:
$$
\begin{pmatrix}
\infty & 2 & 9 & 10 \\
1 & \infty & 6 & 4 \\
\text{inf} & 7 & \infty & 8 \\
6 & 3 & 12 & \infty
\end{pmatrix}
$$
(Note: `adj[2][0]` is $\infty$, meaning no direct path from 2 to 0).
**What we want**: The minimum total cost of a path $0 \to \text{city } X \to \text{city } Y \to \text{city } Z \to 0$ where $X, Y, Z \in \{1, 2, 3\}$ and $X, Y, Z$ are distinct.

**Solution**:
Number of cities $N=4$. `start_node = 0`.
`dp` table `dp[mask][last_city]`. `mask` goes from 0 to $2^4 - 1 = 15$. `last_city` goes from 0 to 3.

**Initialization**:
`dp` table is $16 \times 4$. All values are $\infty$.
Base case: $dp[1 \ll 0][0] = dp[0001_2][0] = dp[1][0] = 0$.

**Iteration (Key Steps - not all masks shown due to length)**:

*   **`mask = 1 (0001_2)`**: `dp[1][0] = 0`.

*   **`mask = 3 (0011_2)`**: Cities {0, 1}.
    *   `u = 1`: `prev_mask = 1 (0001_2)`. `v = 0`.
        *   `dp[3][1] = min(\infty, dp[1][0] + adj[0][1]) = 0 + 2 = 2`.
        Explanation: Path $0 \to 1$.

*   **`mask = 5 (0101_2)`**: Cities {0, 2}.
    *   `u = 2`: `prev_mask = 1 (0001_2)`. `v = 0`.
        *   `dp[5][2] = min(\infty, dp[1][0] + adj[0][2]) = 0 + 9 = 9`.
        Explanation: Path $0 \to 2$.

*   **`mask = 9 (1001_2)`**: Cities {0, 3}.
    *   `u = 3`: `prev_mask = 1 (0001_2)`. `v = 0`.
        *   `dp[9][3] = min(\infty, dp[1][0] + adj[0][3]) = 0 + 10 = 10`.
        Explanation: Path $0 \to 3$.

*   **`mask = 7 (0111_2)`**: Cities {0, 1, 2}.
    *   `u = 1`: `prev_mask = 5 (0101_2)` ({0,2}).
        *   `v = 0`: `dp[5][0]` is $\infty$.
        *   `v = 2`: `dp[7][1] = min(\infty, dp[5][2] + adj[2][1]) = 9 + 7 = 16`.
        Explanation: Path $0 \to 2 \to 1$.
    *   `u = 2`: `prev_mask = 3 (0011_2)` ({0,1}).
        *   `v = 0`: `dp[3][0]` is $\infty$.
        *   `v = 1`: `dp[7][2] = min(\infty, dp[3][1] + adj[1][2]) = 2 + 6 = 8`.
        Explanation: Path $0 \to 1 \to 2$.

*   **`mask = 11 (1011_2)`**: Cities {0, 1, 3}.
    *   `u = 1`: `prev_mask = 9 (1001_2)` ({0,3}).
        *   `v = 3`: `dp[11][1] = min(\infty, dp[9][3] + adj[3][1]) = 10 + 3 = 13`.
        Explanation: Path $0 \to 3 \to 1$.
    *   `u = 3`: `prev_mask = 3 (0011_2)` ({0,1}).
        *   `v = 1`: `dp[11][3] = min(\infty, dp[3][1] + adj[1][3]) = 2 + 4 = 6`.
        Explanation: Path $0 \to 1 \to 3$.

*   **`mask = 13 (1101_2)`**: Cities {0, 2, 3}.
    *   `u = 2`: `prev_mask = 9 (1001_2)` ({0,3}).
        *   `v = 3`: `dp[13][2] = min(\infty, dp[9][3] + adj[3][2]) = 10 + 12 = 22`.
        Explanation: Path $0 \to 3 \to 2$.
    *   `u = 3`: `prev_mask = 5 (0101_2)` ({0,2}).
        *   `v = 2`: `dp[13][3] = min(\infty, dp[5][2] + adj[2][3]) = 9 + 8 = 17`.
        Explanation: Path $0 \to 2 \to 3$.

*   **`mask = 15 (1111_2)`**: All cities {0, 1, 2, 3}. This is `all_cities_mask`.
    *   `u = 1`: `prev_mask = 13 (1101_2)` ({0,2,3}).
        *   `v = 2`: `dp[15][1] = min(\infty, dp[13][2] + adj[2][1]) = 22 + 7 = 29`.
        Explanation: Path $0 \to 3 \to 2 \to 1$.
        *   `v = 3`: `dp[15][1] = min(29, dp[13][3] + adj[3][1]) = min(29, 17 + 3) = 20`.
        Explanation: Path $0 \to 2 \to 3 \to 1$.
    *   `u = 2`: `prev_mask = 11 (1011_2)` ({0,1,3}).
        *   `v = 1`: `dp[15][2] = min(\infty, dp[11][1] + adj[1][2]) = 13 + 6 = 19`.
        Explanation: Path $0 \to 3 \to 1 \to 2$.
        *   `v = 3`: `dp[15][2] = min(19, dp[11][3] + adj[3][2]) = min(19, 6 + 12) = 18`.
        Explanation: Path $0 \to 1 \to 3 \to 2$.
    *   `u = 3`: `prev_mask = 7 (0111_2)` ({0,1,2}).
        *   `v = 1`: `dp[15][3] = min(\infty, dp[7][1] + adj[1][3]) = 16 + 4 = 20`.
        Explanation: Path $0 \to 2 \to 1 \to 3$.
        *   `v = 2`: `dp[15][3] = min(20, dp[7][2] + adj[2][3]) = min(20, 8 + 8) = 16`.
        Explanation: Path $0 \to 1 \to 2 \to 3$.

**Final Answer Calculation**:
`all_cities_mask = 15 (1111_2)`.
`min_cost = \infty`.
For `u` from 1 to 3:
*   `u = 1`: `min_cost = min(\infty, dp[15][1] + adj[1][0]) = min(\infty, 20 + 1) = 21`.
    Explanation: Path $0 \to 2 \to 3 \to 1 \to 0$. Cost $9+8+3+1=21$.
*   `u = 2`: `min_cost = min(21, dp[15][2] + adj[2][0]) = min(21, 18 + \infty) = 21`.
    Explanation: Path $0 \to 1 \to 3 \to 2 \to 0$. Cost $2+4+12+\infty = \infty$. (No direct path from 2 to 0).
*   `u = 3`: `min_cost = min(21, dp[15][3] + adj[3][0]) = min(21, 16 + 6) = 21`.
    Explanation: Path $0 \to 1 \to 2 \to 3 \to 0$. Cost $2+6+8+6=22$.
    Wait, `min(21, 22)` is `21`. My calculation of `dp[15][3]` was $16$, so $16+6=22$.
    The minimum path ending at 3 was $0 \to 1 \to 2 \to 3$ with cost 16. Adding `adj[3][0] = 6` gives $16+6=22$.
    The minimum path ending at 1 was $0 \to 2 \to 3 \to 1$ with cost 20. Adding `adj[1][0] = 1` gives $20+1=21$.

The minimum cost is $\boxed{21}$.

**Reflection**: The non-symmetric costs and the `adj[2][0] = \infty` complicated things. It's crucial to correctly handle $\infty$ values, as they represent unreachable paths and should not contribute to the minimum unless no other path exists. This example showed how some paths could be valid intermediate steps but lead to an overall invalid cycle due to a missing return path.

### Example 3 (Hard): 5 Cities, Handling Unreachable Paths

**Problem**: Find the shortest Hamiltonian cycle starting and ending at city 0 for a graph with 5 cities (0, 1, 2, 3, 4).
**Given**: Adjacency matrix `adj`:
$$
\begin{pmatrix}
\infty & 3 & 4 & \infty & 8 \\
3 & \infty & 2 & 1 & \infty \\
4 & 2 & \infty & 5 & \infty \\
\infty & 1 & 5 & \infty & 6 \\
8 & \infty & \infty & 6 & \infty
\end{pmatrix}
$$
Notice `adj[0][3] = \infty`, `adj[1][4] = \infty`, etc.
**What we want**: The minimum total cost of a path $0 \to \text{city } X \to \text{city } Y \to \text{city } Z \to \text{city } W \to 0$.

**Solution**:
Number of cities $N=5$. `start_node = 0`.
`dp` table `dp[mask][last_city]`. `mask` goes from 0 to $2^5 - 1 = 31$. `last_city` goes from 0 to 4.

**Initialization**:
`dp` table is $32 \times 5$. All values are $\infty$.
Base case: $dp[1 \ll 0][0] = dp[00001_2][0] = dp[1][0] = 0$.

**Iteration (Conceptual steps for a few masks, focusing on the impact of $\infty$ costs)**:

*   **`mask = 1 (00001_2)`**: `dp[1][0] = 0`.

*   **`mask = 3 (00011_2)`**: Cities {0, 1}.
    *   `u = 1`: `prev_mask = 1`. `v = 0`.
        *   `dp[3][1] = dp[1][0] + adj[0][1] = 0 + 3 = 3`. (Path $0 \to 1$)

*   **`mask = 5 (00101_2)`**: Cities {0, 2}.
    *   `u = 2`: `prev_mask = 1`. `v = 0`.
        *   `dp[5][2] = dp[1][0] + adj[0][2] = 0 + 4 = 4`. (Path $0 \to 2$)

*   **`mask = 9 (01001_2)`**: Cities {0, 3}.
    *   `u = 3`: `prev_mask = 1`. `v = 0`.
        *   `dp[9][3] = dp[1][0] + adj[0][3] = 0 + \infty = \infty`.
        Explanation: No direct path from 0 to 3. So, any path trying to go $0 \to 3$ directly will be $\infty$. This means any path that *must* include the edge $(0,3)$ will be $\infty$.

*   **`mask = 17 (10001_2)`**: Cities {0, 4}.
    *   `u = 4`: `prev_mask = 1`. `v = 0`.
        *   `dp[17][4] = dp[1][0] + adj[0][4] = 0 + 8 = 8`. (Path $0 \to 4$)

*   **`mask = 7 (00111_2)`**: Cities {0, 1, 2}.
    *   `u = 1`: `prev_mask = 5` ({0,2}). `v = 2`.
        *   `dp[7][1] = min(\infty, dp[5][2] + adj[2][1]) = 4 + 2 = 6`. (Path $0 \to 2 \to 1$)
    *   `u = 2`: `prev_mask = 3` ({0,1}). `v = 1`.
        *   `dp[7][2] = min(\infty, dp[3][1] + adj[1][2]) = 3 + 2 = 5`. (Path $0 \to 1 \to 2$)

*   **`mask = 11 (01011_2)`**: Cities {0, 1, 3}.
    *   `u = 1`: `prev_mask = 9` ({0,3}). `v = 3`.
        *   `dp[11][1] = min(\infty, dp[9][3] + adj[3][1]) = \infty + 1 = \infty`.
        Explanation: Since `dp[9][3]` is $\infty$ (no path $0 \to 3$), any path that goes $0 \to 3 \to 1$ is also $\infty$.
    *   `u = 3`: `prev_mask = 3` ({0,1}). `v = 1`.
        *   `dp[11][3] = min(\infty, dp[3][1] + adj[1][3]) = 3 + 1 = 4`. (Path $0 \to 1 \to 3$)

... (Many more masks and calculations) ...

Let's jump to `all_cities_mask = 31 (11111_2)`.
Suppose after all calculations, we have:
`dp[31][1]` (min cost to visit all, ending at 1)
`dp[31][2]` (min cost to visit all, ending at 2)
`dp[31][3]` (min cost to visit all, ending at 3)
`dp[31][4]` (min cost to visit all, ending at 4)

Let's trace one potential path: $0 \to 1 \to 2 \to 3 \to 4 \to 0$.
Cost: `adj[0][1] + adj[1][2] + adj[2][3] + adj[3][4] + adj[4][0]`
Cost: $3 + 2 + 5 + 6 + 8 = 24$.
This path would contribute to `dp[31][4]` (min cost for $0 \to 1 \to 2 \to 3 \to 4$) and then `adj[4][0]` for the final return.

Let's trace another potential path: $0 \to 2 \to 1 \to 3 \to 4 \to 0$.
Cost: `adj[0][2] + adj[2][1] + adj[1][3] + adj[3][4] + adj[4][0]`
Cost: $4 + 2 + 1 + 6 + 8 = 21$.

These would be calculated as:
`dp[mask=1][0] = 0`
`dp[mask=3][1] = dp[1][0] + adj[0][1] = 0 + 3 = 3` ($0 \to 1$)
`dp[mask=7][2] = dp[3][1] + adj[1][2] = 3 + 2 = 5` ($0 \to 1 \to 2$)
`dp[mask=15][3] = dp[7][2] + adj[2][3] = 5 + 5 = 10` ($0 \to 1 \to 2 \to 3$)
`dp[mask=31][4] = dp[15][3] + adj[3][4] = 10 + 6 = 16` ($0 \to 1 \to 2 \to 3 \to 4$)

Final calculation for this path: `dp[31][4] + adj[4][0] = 16 + 8 = 24$.

Let's re-evaluate the $0 \to 2 \to 1 \to 3 \to 4 \to 0$ path.
`dp[mask=1][0] = 0`
`dp[mask=5][2] = dp[1][0] + adj[0][2] = 0 + 4 = 4` ($0 \to 2$)
`dp[mask=7][1] = dp[5][2] + adj[2][1] = 4 + 2 = 6` ($0 \to 2 \to 1$)
`dp[mask=11][3]` (cities {0,1,3}, ending at 3):
    `prev_mask = 7` ({0,1,2}). `v = 1`.
    `dp[11][3] = dp[7][1] + adj[1][3] = 6 + 1 = 7`. ($0 \to 2 \to 1 \to 3$)
`dp[mask=31][4]` (cities {0,1,2,3,4}, ending at 4):
    `prev_mask = 15` ({0,1,2,3}). `v = 3`.
    This `dp[15][3]` would be the minimum of $(dp[7][1] + adj[1][3] \text{ or } dp[11][2] + adj[2][3])$.
    Let's assume `dp[15][3]` is calculated to be 7 (from $0 \to 2 \to 1 \to 3$).
    Then `dp[31][4] = dp[15][3] + adj[3][4] = 7 + 6 = 13`. ($0 \to 2 \to 1 \to 3 \to 4$)

Final calculation for this path: `dp[31][4] + adj[4][0] = 13 + 8 = 21$.

The minimum cost is $\boxed{21}$.

**Reflection**: This example highlights how the $\infty$ values for `adj[i][j]` (no direct path) propagate through the DP table. If a path relies on a non-existent edge, its cost becomes $\infty$, and it will naturally be ignored when taking the `min`. This ensures that only valid, connected paths are considered. The larger number of cities simply means more states and more transitions to calculate, but the logic remains the same.

### Example 4 (Conceptual): TSP without returning to start

**Problem**: Find the shortest path that visits all cities exactly once, starting at city 0, but *without* needing to return to city 0.
**Given**: Same adjacency matrix as Example 2:
$$
\begin{pmatrix}
\infty & 2 & 9 & 10 \\
1 & \infty & 6 & 4 \\
\text{inf} & 7 & \infty & 8 \\
6 & 3 & 12 & \infty
\end{pmatrix}
$$
**What we want**: The minimum total cost of a path $0 \to \text{city } X \to \text{city } Y \to \text{city } Z$ where $X, Y, Z \in \{1, 2, 3\}$ and $X, Y, Z$ are distinct.

**Solution**:
The DP state `dp[mask][last_city]` and the recurrence relation remain *exactly the same* as standard TSP. We are still finding the minimum cost to visit a `mask` of cities, ending at `last_city`.

The only change is in the **final answer calculation**.
Instead of adding `adj[u][start_node]`, we simply find the minimum value among all `dp[all_cities_mask][u]` for any `u`.

**Final Answer Calculation**:
`all_cities_mask = 15 (1111_2)`.
`min_cost = \infty`.
For `u` from 0 to 3:
*   `u = 0`: `dp[15][0]` is $\infty$ (cannot end at start unless we just started, which isn't the final state of visiting all cities).
*   `u = 1`: `min_cost = min(\infty, dp[15][1]) = min(\infty, 20) = 20`.
    Explanation: Path $0 \to 2 \to 3 \to 1$. Cost $9+8+3=20$.
*   `u = 2`: `min_cost = min(20, dp[15][2]) = min(20, 18) = 18`.
    Explanation: Path $0 \to 1 \to 3 \to 2$. Cost $2+4+12=18$.
*   `u = 3`: `min_cost = min(18, dp[15][3]) = min(18, 16) = 16`.
    Explanation: Path $0 \to 1 \to 2 \to 3$. Cost $2+6+8=16$.

The minimum cost is $\boxed{16}$.

**Reflection**: This example demonstrates the flexibility of the Bitmask DP approach. By slightly altering the final step, we can solve variations of the problem without changing the core DP logic. This is a powerful aspect of dynamic programming: once you've built the table of subproblem solutions, you can query it in different ways to answer related questions.

## 6. Common mistakes and traps

1.  **Incorrect Base Case Initialization**: Forgetting to set `dp[1 << start_node][start_node] = 0` (and all other `dp` values to $\infty$) is a common error. If the base case is wrong, all subsequent calculations will be incorrect.
2.  **Off-by-One Errors in Bitmasking**: Confusing 0-indexed cities with 1-indexed cities, or incorrectly using `1