## 1. What it is — in plain English

Imagine you have a long list of numbers to multiply, like $2 \times 3 \times 4 \times 5$. No matter how you group them with parentheses, the final answer will always be the same. $(2 \times 3) \times (4 \times 5)$ gives $6 \times 20 = 120$, and $2 \times ((3 \times 4) \times 5)$ gives $2 \times (12 \times 5) = 2 \times 60 = 120$. The order of operations changes, but the result doesn't, and the *number* of basic multiplications (like $2 \times 3$) is always the same.

Now, imagine doing the same thing with matrices. Matrices are like special grids of numbers. When you multiply matrices, the order *still* doesn't change the final answer due to a property called associativity (just like with numbers). So, $(A \times B) \times C$ will give the same matrix as $A \times (B \times C)$.

However, here's the crucial difference: the *cost* (the number of simple arithmetic operations like multiplying two numbers) of performing matrix multiplication *does* depend on the order of operations! Some ways of grouping the matrices with parentheses can be incredibly cheap, while others can be incredibly expensive, even for the exact same final result.

"Matrix Chain Multiplication" is a classic problem in computer science that asks: given a sequence (a "chain") of matrices to multiply, how do we put parentheses around them to minimize the total number of scalar (single number) multiplications needed? It's about finding the cheapest way to do the job, not about changing the job itself.

## 2. Why it matters — real-world applications

Optimizing matrix multiplication order might seem like a niche academic problem, but matrices are fundamental data structures in many computational fields. Efficient computation can lead to significant performance gains.

1.  **Computer Graphics and Game Development:** In 3D graphics, objects are transformed (rotated, scaled, translated) using matrix multiplications. A complex scene might involve many transformations applied in sequence to thousands of vertices. For example, an object might be transformed from its local space to world space, then to camera space, then to projection space. Each transformation is a matrix. If you have $T_1 \times T_2 \times T_3 \times \text{vertex}$, optimizing the order of $T_1 \times T_2 \times T_3$ can significantly speed up the rendering pipeline, enabling higher frame rates and more complex visual effects in real-time applications like video games or virtual reality.

2.  **Machine Learning and Deep Learning:** Neural networks heavily rely on matrix operations. During both training and inference, data flows through layers that perform linear transformations, which are essentially matrix multiplications. A deep neural network could involve a chain of dozens or hundreds of matrix multiplications. For instance, in a convolutional neural network, feature maps are processed through multiple layers. Optimizing the order of these matrix operations can drastically reduce the computational time required to train large models or to perform real-time predictions, especially on resource-constrained devices or for very large datasets.

3.  **Scientific Computing and Physics Simulations:** Many numerical methods used in fields like computational fluid dynamics, structural mechanics, and quantum physics involve solving large systems of linear equations or performing complex simulations using matrices. For example, finite element analysis (FEA) often requires multiplying sparse matrices representing material properties and geometric constraints. Optimizing the order of these matrix multiplications can be critical for speeding up simulations that might otherwise take days or weeks to run, allowing engineers and scientists to iterate faster on designs or explore more complex phenomena.

4.  **Signal Processing:** Digital signal processing (DSP) algorithms, used in audio processing, image filtering, and telecommunications, frequently employ matrix operations. For example, applying a series of filters to a signal can be represented as a chain of matrix multiplications. Optimizing this chain ensures that real-time signal processing applications (like noise reduction in live audio or video compression) can meet their stringent latency requirements.

## 3. Prerequisites — what you must know first

Before diving deep into Matrix Chain Multiplication, ensure you have a solid understanding of these foundational concepts:

*   **Matrices:** A rectangular array of numbers. You should know what a matrix is, how its dimensions are described (rows $\times$ columns), and basic terminology.
*   **Matrix Multiplication:** The specific rules for multiplying two matrices $A$ and $B$. Crucially, you must know that $A_{p \times q}$ can only be multiplied by $B_{q \times r}$ (the number of columns in $A$ must equal the number of rows in $B$). The resulting matrix $C = AB$ will have dimensions $p \times r$.
*   **Cost of Matrix Multiplication:** How to calculate the number of scalar (single number) multiplications required to multiply two matrices. For $A_{p \times q} \times B_{q \times r}$, the cost is $p \times q \times r$.
*   **Associativity of Matrix Multiplication:** For matrices $A, B, C$, $(AB)C = A(BC)$. The final product is the same regardless of parenthesization.
*   **Dynamic Programming (DP):** This is the core algorithmic paradigm used. You should understand:
    *   **Optimal Substructure:** An optimal solution to a problem contains optimal solutions to its subproblems.
    *   **Overlapping Subproblems:** The recursive solution repeatedly solves the same subproblems.
    *   **Memoization (Top-down DP):** Storing the results of expensive function calls and returning the cached result when the same inputs occur again.
    *   **Tabulation (Bottom-up DP):** Filling a table (usually multi-dimensional) of subproblem solutions from the base cases upwards.
*   **Recursion:** Understanding how to define a problem in terms of smaller instances of itself, including identifying base cases.

## 4. The core idea — step by step

Let's break down the Matrix Chain Multiplication problem and how Dynamic Programming elegantly solves it.

### Step 1: The Problem Statement

**Plain English Statement:** We are given a list of matrices that need to be multiplied together in a specific sequence. We want to find the best way to group these multiplications using parentheses so that the total number of individual number multiplications (the "cost") is as small as possible. The actual matrices themselves don't matter, only their dimensions.

**Small Concrete Example:** Suppose we have three matrices: $A_1$, $A_2$, and $A_3$.
$A_1$ has dimensions $10 \times 100$.
$A_2$ has dimensions $100 \times 5$.
$A_3$ has dimensions $5 \times 50$.

We want to compute $A_1 A_2 A_3$. There are two possible ways to parenthesize this product:
1.  $(A_1 A_2) A_3$
2.  $A_1 (A_2 A_3)$

We need to figure out which one is cheaper.

**The Formal/Mathematical Version:**
Given a sequence of $n$ matrices $A_1, A_2, \ldots, A_n$, where matrix $A_i$ has dimensions $p_{i-1} \times p_i$. We want to find an optimal parenthesization of the product $A_1 A_2 \ldots A_n$ such that the total number of scalar multiplications is minimized.

The dimensions can be stored in an array $P = [p_0, p_1, \ldots, p_n]$, where $A_i$ has dimensions $p_{i-1} \times p_i$.

For our example:
$A_1: p_0 \times p_1 = 10 \times 100$
$A_2: p_1 \times p_2 = 100 \times 5$
$A_3: p_2 \times p_3 = 5 \times 50$
So, $P = [10, 100, 5, 50]$.

**What could go wrong:** Students often confuse the number of matrices ($n$) with the length of the $P$ array ($n+1$). Remember that $P$ stores the dimensions, so $P[0]$ is the row count of $A_1$, $P[1]$ is the column count of $A_1$ (and row count of $A_2$), and so on.

### Step 2: Cost of Matrix Multiplication

**Plain English Statement:** Before we can minimize the total cost, we need to know how to calculate the cost of a single matrix multiplication. The cost is simply the number of individual multiplications of numbers required.

**Small Concrete Example:**
Let's multiply two matrices $A$ and $B$.
$A$ has dimensions $p \times q$.
$B$ has dimensions $q \times r$.
The resulting matrix $C = AB$ will have dimensions $p \times r$.

To compute each entry $C_{ij}$ in the result matrix, we perform $q$ multiplications and $q-1$ additions. Since there are $p \times r$ entries in $C$, the total number of scalar multiplications is $p \times q \times r$.

Let's calculate the cost for our example parenthesizations:
1.  **$(A_1 A_2) A_3$**:
    *   First, compute $A_1 A_2$. $A_1$ is $10 \times 100$, $A_2$ is $100 \times 5$.
        Cost of $A_1 A_2 = 10 \times 100 \times 5 = 5000$ scalar multiplications.
        The result, let's call it $A_{12}$, is $10 \times 5$.
    *   Next, compute $A_{12} A_3$. $A_{12}$ is $10 \times 5$, $A_3$ is $5 \times 50$.
        Cost of $A_{12} A_3 = 10 \times 5 \times 50 = 2500$ scalar multiplications.
    *   Total cost for $(A_1 A_2) A_3 = 5000 + 2500 = 7500$.

2.  **$A_1 (A_2 A_3)$**:
    *   First, compute $A_2 A_3$. $A_2$ is $100 \times 5$, $A_3$ is $5 \times 50$.
        Cost of $A_2 A_3 = 100 \times 5 \times 50 = 25000$ scalar multiplications.
        The result, let's call it $A_{23}$, is $100 \times 50$.
    *   Next, compute $A_1 A_{23}$. $A_1$ is $10 \times 100$, $A_{23}$ is $100 \times 50$.
        Cost of $A_1 A_{23} = 10 \times 100 \times 50 = 50000$ scalar multiplications.
    *   Total cost for $A_1 (A_2 A_3) = 25000 + 50000 = 75000$.

Clearly, $7500$ is much less than $75000$. The first parenthesization is the optimal one for this example.

**The Formal/Mathematical Version:**
The cost of multiplying a matrix of dimensions $p \times q$ by a matrix of dimensions $q \times r$ is $pqr$ scalar multiplications.
If we are multiplying $A_i$ (dimensions $p_{i-1} \times p_i$) by $A_j$ (dimensions $p_{j-1} \times p_j$), and these are the *final* two matrices being multiplied at some step, their dimensions would be $P_{\text{rows}} \times P_{\text{cols}}$ and $Q_{\text{rows}} \times Q_{\text{cols}}$. The cost would be $P_{\text{rows}} \times P_{\text{cols}} \times Q_{\text{cols}}$.

**What could go wrong:** Forgetting the $pqr$ formula, or using the wrong dimensions (e.g., using $p_i p_j p_k$ instead of $p_{i-1} p_k p_j$ for a split at $k$).

### Step 3: Optimal Substructure

**Plain English Statement:** If we have found the absolute cheapest way to multiply a long chain of matrices, say $A_1 \ldots A_n$, then any sub-part of that chain, like $A_i \ldots A_j$, must also be multiplied in the cheapest possible way *within* the overall optimal solution. If it weren't, we could just replace that sub-optimal part with its optimal version, and the overall solution would become even cheaper, which contradicts our assumption that the original solution was already optimal.

**Small Concrete Example:**
We determined that $(A_1 A_2) A_3$ is the optimal way to multiply $A_1 A_2 A_3$.
This means that when we calculate $(A_1 A_2)$, we are performing an optimal subproblem solution (trivially true for two matrices, as there's only one way to multiply them). The principle becomes more apparent with longer chains.
Consider $A_1 A_2 A_3 A_4$. Suppose the optimal parenthesization is $(A_1 (A_2 A_3)) A_4$.
This means that:
*   The multiplication of $A_2 A_3$ must be done optimally (which it is, as there's only one way for two matrices).
*   The multiplication of $A_1 (A_2 A_3)$ must be done optimally.
*   The final multiplication of $(A_1 (A_2 A_3)) A_4$ must be done optimally.

**The Formal/Mathematical Version:**
Let $A_i \ldots A_j$ be a subchain of matrices. If an optimal parenthesization of $A_i \ldots A_j$ splits the product between $A_k$ and $A_{k+1}$ (i.e., $(A_i \ldots A_k)(A_{k+1} \ldots A_j)$), then the parenthesization of the prefix $A_i \ldots A_k$ within this optimal solution must itself be an optimal parenthesization of $A_i \ldots A_k$. Similarly, the parenthesization of the suffix $A_{k+1} \ldots A_j$ must be an optimal parenthesization of $A_{k+1} \ldots A_j$.

The total cost would be:
$Cost(A_i \ldots A_j) = Cost(A_i \ldots A_k) + Cost(A_{k+1} \ldots A_j) + \text{Cost of multiplying the two resulting matrices}$

**What could go wrong:** Not grasping that "optimal substructure" means you can build the optimal solution to a large problem from the optimal solutions to its smaller parts. This is a cornerstone of Dynamic Programming.

### Step 4: Overlapping Subproblems

**Plain English Statement:** If we try to solve this problem using a straightforward recursive approach (where we try every possible split point), we'll end up solving the same smaller subproblems many, many times. This redundant computation makes the recursive approach very inefficient.

**Small Concrete Example:**
Consider finding the optimal parenthesization for $A_1 A_2 A_3 A_4$.
A recursive function, let's call it `MinCost(i, j)`, would calculate the minimum cost for multiplying $A_i \ldots A_j$.

To calculate `MinCost(1, 4)`:
*   Try splitting at $k=1$: `MinCost(1, 1) + MinCost(2, 4) + cost(A1, A234)`
*   Try splitting at $k=2$: `MinCost(1, 2) + MinCost(3, 4) + cost(A12, A34)`
*   Try splitting at $k=3$: `MinCost(1, 3) + MinCost(4, 4) + cost(A123, A4)`

Notice that `MinCost(1, 2)` needs to be computed.
Now consider `MinCost(1, 3)`:
*   Try splitting at $k=1$: `MinCost(1, 1) + MinCost(2, 3) + cost(A1, A23)`
*   Try splitting at $k=2$: `MinCost(1, 2) + MinCost(3, 3) + cost(A12, A3)`

Here, `MinCost(1, 2)` (for $A_1 A_2$) is needed to calculate `MinCost(1, 4)` (if split at $k=2$) AND to calculate `MinCost(1, 3)` (if split at $k=2$). This is a simple example, but for longer chains, the same subproblems ($A_i \ldots A_j$) are repeatedly calculated.

**The Formal/Mathematical Version:**
A naive recursive algorithm for computing $m[i][j]$ (the minimum cost for $A_i \ldots A_j$) would have an exponential time complexity, roughly $O(4^n/n^{3/2})$. This is because the recursion tree for $m[i][j]$ will branch out and repeatedly compute the same $m[x][y]$ values multiple times. This redundancy signals that Dynamic Programming (either memoization or tabulation) is suitable.

**What could go wrong:** Thinking that a recursive solution is always efficient. For problems with overlapping subproblems, pure recursion without memoization leads to exponential time complexity.

### Step 5: Defining the DP State

**Plain English Statement:** To avoid re-calculating the same subproblems, we need a way to store their results. A table (usually a 2D array) is perfect for this. Each cell in the table will store the minimum cost for a specific subproblem.

**Small Concrete Example:**
We'll use a 2D array, let's call it `m`, where `m[i][j]` will store the minimum number of scalar multiplications required to compute the product of matrices $A_i$ through $A_j$.
The indices $i$ and $j$ will typically range from $1$ to $n$ (the total number of matrices).

For $n=3$ matrices, our table `m` would look like this (conceptually):
```
    j=1   j=2   j=3
i=1  ?     ?     ?
i=2  -     ?     ?
i=3  -     -     ?
```
The diagonal elements `m[i][i]` represent the cost of multiplying a single matrix, which is 0. So, `m[1][1]=0`, `m[2][2]=0`, `m[3][3]=0`. We only care about `i <= j`.

We'll also need another 2D array, `s`, to store the *split points* that led to the optimal cost. `s[i][j]` will store the index $k$ such that the optimal parenthesization of $A_i \ldots A_j$ splits the product as $(A_i \ldots A_k)(A_{k+1} \ldots A_j)$. This table is used to reconstruct the actual parenthesization later.

**The Formal/Mathematical Version:**
Let $m[i][j]$ be the minimum number of scalar multiplications needed to compute the product $A_i A_{i+1} \ldots A_j$.
Let $s[i][j]$ be the index $k$ that yields the optimal cost $m[i][j]$. That is, $s[i][j]=k$ means the optimal parenthesization for $A_i \ldots A_j$ is $(A_i \ldots A_k)(A_{k+1} \ldots A_j)$.

**What could go wrong:** Incorrectly defining the range of indices for `i` and `j` or what `m[i][j]` represents. Forgetting to store the split points if the actual parenthesization is required.

### Step 6: Recurrence Relation

**Plain English Statement:** Now we need a formula to calculate `m[i][j]` using values we've already computed. To find the minimum cost for multiplying $A_i \ldots A_j$, we consider every possible place we could make the *final* split. If we split the chain at matrix $A_k$ (meaning we multiply $(A_i \ldots A_k)$ by $(A_{k+1} \ldots A_j)$), the total cost for this split would be:
1.  The minimum cost to multiply $A_i \ldots A_k$ (which is $m[i][k]$).
2.  The minimum cost to multiply $A_{k+1} \ldots A_j$ (which is $m[k+1][j]$).
3.  The cost of multiplying the two resulting matrices from step 1 and 2. The first resulting matrix has dimensions $p_{i-1} \times p_k$. The second resulting matrix has dimensions $p_k \times p_j$. So, the cost of their multiplication is $p_{i-1} \times p_k \times p_j$.

We try all possible split points $k$ (from $i$ to $j-1$) and pick the one that gives the minimum total cost.

**Small Concrete Example:**
Let's find $m[1][3]$ for $A_1 A_2 A_3$ with $P = [10, 100, 5, 50]$.
Possible split points $k$ for $A_1 A_2 A_3$ (i=1, j=3):
*   $k=1$: $(A_1) (A_2 A_3)$
    Cost = $m[1][1] + m[2][3] + p_{1-1} p_1 p_3 = m[1][1] + m[2][3] + p_0 p_1 p_3$
*   $k=2$: $(A_1 A_2) (A_3)$
    Cost = $m[1][2] + m[3][3] + p_{1-1} p_2 p_3 = m[1][2] + m[3][3] + p_0 p_2 p_3$

We need to compute $m[1][1]$, $m[2][3]$, $m[1][2]$, $m[3][3]$ first.
Base cases: $m[i][i] = 0$ for all $i$. So $m[1][1]=0$ and $m[3][3]=0$.

Now, for $m[1][2]$ (multiplying $A_1 A_2$):
Only one split point $k=1$. Cost = $m[1][1] + m[2][2] + p_0 p_1 p_2 = 0 + 0 + (10 \times 100 \times 5) = 5000$.
So, $m[1][2]=5000$. $s[1][2]=1$.

For $m[2][3]$ (multiplying $A_2 A_3$):
Only one split point $k=2$. Cost = $m[2][2] + m[3][3] + p_1 p_2 p_3 = 0 + 0 + (100 \times 5 \times 50) = 25000$.
So, $m[2][3]=25000$. $s[2][3]=2$.

Now back to $m[1][3]$:
*   $k=1$: $m[1][1] + m[2][3] + p_0 p_1 p_3 = 0 + 25000 + (10 \times 100 \times 50) = 25000 + 50000 = 75000$.
*   $k=2$: $m[1][2] + m[3][3] + p_0 p_2 p_3 = 5000 + 0 + (10 \times 5 \times 50) = 5000 + 2500 = 7500$.

The minimum is $7500$. So, $m[1][3]=7500$ and $s[1][3]=2$ (because $k=2$ gave the minimum).

**The Formal/Mathematical Version:**
The recurrence relation for $m[i][j]$ is:
$$m[i][j] = \begin{cases}
    0 & \text{if } i = j \\
    \min_{i \le k < j} \{ m[i][k] + m[k+1][j] + p_{i-1} p_k p_j \} & \text{if } i < j
\end{cases}$$
Where $p_{i-1}$ is the row dimension of $A_i$, $p_k$ is the column dimension of $A_k$ (and row dimension of $A_{k+1}$), and $p_j$ is the column dimension of $A_j$.
The indices $i$ and $j$ range from $1$ to $n$.

**What could go wrong:** Off-by-one errors in the indices, especially with $p_{i-1}, p_k, p_j$. Forgetting to iterate $k$ from $i$ to $j-1$.

### Step 7: Building the Solution (Tabulation)

**Plain English Statement:** We fill our `m` table in a specific order to ensure that whenever we need to calculate `m[i][j]`, all the smaller subproblems it depends on (like $m[i][k]$ and $m[k+1][j]$) have already been computed. This usually means filling the table diagonally, starting with subproblems of length 2, then length 3, and so on, up to length $n$.

**Small Concrete Example:**
For $n$ matrices, we'll have an `m` table of size $(n+1) \times (n+1)$ (using 1-based indexing for matrices $A_1 \ldots A_n$).

1.  **Initialize base cases:** Set $m[i][i] = 0$ for all $i=1 \ldots n$.
2.  **Iterate `length` (or `L`):** This represents the length of the matrix chain we are currently considering. It goes from $2$ up to $n$.
    *   For `length = 2`: We calculate $m[1][2], m[2][3], \ldots, m[n-1][n]$. These are pairs of matrices.
    *   For `length = 3`: We calculate $m[1][3], m[2][4], \ldots, m[n-2][n]$. These are triplets of matrices.
    *   ...and so on, until `length = n` (which is $m[1][n]$, the full problem).
3.  **Iterate `i`:** For a given `length`, `i` represents the starting index of the matrix chain. It goes from $1$ up to $n - \text{length} + 1$.
4.  **Calculate `j`:** The ending index `j` is simply $i + \text{length} - 1$.
5.  **Iterate `k`:** For each `(i, j)` pair, iterate through all possible split points `k` from $i$ to $j-1$.
    *   Calculate `cost = m[i][k] + m[k+1][j] + P[i-1] * P[k] * P[j]`.
    *   If this `cost` is less than the current `m[i][j]`, update `m[i][j]` with this new minimum cost and store `k` in `s[i][j]`.

**The Formal/Mathematical Version (Algorithm Structure):**

```
MATRIX-CHAIN-ORDER(P)
  n = P.length - 1  // Number of matrices
  Let m[1..n, 1..n] be a table for costs
  Let s[1..n, 1..n] be a table for split points

  For i = 1 to n
    m[i][i] = 0  // Cost of multiplying a single matrix is 0

  For length = 2 to n  // length is the chain length
    For i = 1 to n - length + 1  // i is the start index of the chain
      j = i + length - 1  // j is the end index of the chain
      m[i][j] = infinity // Initialize with a very large value

      For k = i to j - 1  // k is the split point
        cost = m[i][k] + m[k+1][j] + P[i-1] * P[k] * P[j]
        If cost < m[i][j]
          m[i][j] = cost
          s[i][j] = k // Store the optimal split point

  Return m and s
```

**What could go wrong:** Incorrect loop bounds for `length`, `i`, or `k`. Forgetting to initialize `m[i][j]` to infinity before finding the minimum. Using 0-based indexing for $P$ and 1-based for $m, s$ without careful adjustment.

## 5. Worked examples — multiple, with every step shown

Let's work through examples using the tabulation method. We'll use 1-based indexing for matrices $A_1, \ldots, A_n$ and for the `m` and `s` tables. The dimension array $P$ will be 0-indexed, $P[0], \ldots, P[n]$.

### Example 1: Three Matrices (Easy)

**Problem:** Find the minimum cost to multiply $A_1 A_2 A_3$.
**Given:**
$A_1$ is $10 \times 100$
$A_2$ is $100 \times 5$
$A_3$ is $5 \times 50$
**What we want:** The minimum number of scalar multiplications and the optimal parenthesization.

**1. Define dimensions array P:**
$P = [10, 100, 5, 50]$
Here, $n=3$ matrices.
$A_1: P[0] \times P[1] = 10 \times 100$
$A_2: P[1] \times P[2] = 100 \times 5$
$A_3: P[2] \times P[3] = 5 \times 50$

**2. Initialize `m` and `s` tables:**
`m` table (size $4 \times 4$ for $n=3$ matrices, using 1-based indexing):
```
    j=1   j=2   j=3
i=1 [ 0 ] [inf] [inf]
i=2 [ - ] [ 0 ] [inf]
i=3 [ - ] [ - ] [ 0 ]
```
`s` table (size $4 \times 4$):
```
    j=1   j=2   j=3
i=1 [ 0 ] [ 0 ] [ 0 ]
i=2 [ - ] [ 0 ] [ 0 ]
i=3 [ - ] [ - ] [ 0 ]
```
(Initialize `s` with 0s or nulls; it's only used for $i \ne j$).

**3. Fill the tables (length `L` from 2 to `n`):**

**L = 2 (chains of 2 matrices):**
*   **i = 1, j = 2 ($A_1 A_2$)**
    *   `k` can only be `1` (from `i` to `j-1`, so `1` to `1`).
    *   Cost = $m[1][1] + m[2][2] + P[1-1] \times P[1] \times P[2]$
    *   Cost = $m[1][1] + m[2][2] + P[0] \times P[1] \times P[2]$
    *   Cost = $0 + 0 + (10 \times 100 \times 5) = 5000$
    *   $m[1][2] = 5000$
    *   $s[1][2] = 1$
*   **i = 2, j = 3 ($A_2 A_3$)**
    *   `k` can only be `2`.
    *   Cost = $m[2][2] + m[3][3] + P[2-1] \times P[2] \times P[3]$
    *   Cost = $m[2][2] + m[3][3] + P[1] \times P[2] \times P[3]$
    *   Cost = $0 + 0 + (100 \times 5 \times 50) = 25000$
    *   $m[2][3] = 25000$
    *   $s[2][3] = 2$

`m` table after L=2:
```
    j=1   j=2   j=3
i=1 [ 0 ] [5000] [inf]
i=2 [ - ] [ 0 ] [25000]
i=3 [ - ] [ - ] [ 0 ]
```
`s` table after L=2:
```
    j=1   j=2   j=3
i=1 [ 0 ] [ 1 ] [ 0 ]
i=2 [ - ] [ 0 ] [ 2 ]
i=3 [ - ] [ - ] [ 0 ]
```

**L = 3 (chains of 3 matrices):**
*   **i = 1, j = 3 ($A_1 A_2 A_3$)**
    *   Initialize $m[1][3] = \text{inf}$.
    *   **Try k = 1:** $(A_1) (A_2 A_3)$
        *   Cost = $m[1][1] + m[2][3] + P[1-1] \times P[1] \times P[3]$
        *   Cost = $m[1][1] + m[2][3] + P[0] \times P[1] \times P[3]$
        *   Cost = $0 + 25000 + (10 \times 100 \times 50) = 25000 + 50000 = 75000$
        *   $m[1][3]$ is currently $75000$. $s[1][3] = 1$.
    *   **Try k = 2:** $(A_1 A_2) (A_3)$
        *   Cost = $m[1][2] + m[3][3] + P[1-1] \times P[2] \times P[3]$
        *   Cost = $m[1][2] + m[3][3] + P[0] \times P[2] \times P[3]$
        *   Cost = $5000 + 0 + (10 \times 5 \times 50) = 5000 + 2500 = 7500$
        *   Since $7500 < 75000$, update $m[1][3] = 7500$. $s[1][3] = 2$.

`m` table after L=3:
```
    j=1   j=2   j=3
i=1 [ 0 ] [5000] [7500]
i=2 [ - ] [ 0 ] [25000]
i=3 [ - ] [ - ] [ 0 ]
```
`s` table after L=3:
```
    j=1   j=2   j=3
i=1 [ 0 ] [ 1 ] [ 2 ]
i=2 [ - ] [ 0 ] [ 2 ]
i=3 [ - ] [ - ] [ 0 ]
```

**4. Final Answer:**
The minimum number of scalar multiplications is $\mathbf{m[1][3] = 7500}$.

**5. Reconstruct Parenthesization:**
Start with $s[1][3] = 2$. This means the final split is $(A_1 A_2) (A_3)$.
Now, recursively look at the subproblems:
*   For $(A_1 A_2)$, $s[1][2] = 1$. This means $(A_1)(A_2)$.
*   For $(A_3)$, it's a single matrix, no further split.
So, the optimal parenthesization is $\mathbf{( (A_1 A_2) A_3 )}$.

**Reflection:** This example clearly demonstrates how the order matters. The cost difference between 7500 and 75000 is substantial. The bottom-up approach fills smaller subproblems first, which are then used to solve larger ones.

---

### Example 2: Four Matrices (Medium)

**Problem:** Find the minimum cost to multiply $A_1 A_2 A_3 A_4$.
**Given:**
$A_1$ is $30 \times 35$
$A_2$ is $35 \times 15$
$A_3$ is $15 \times 5$
$A_4$ is $5 \times 10$
**What we want:** The minimum number of scalar multiplications and the optimal parenthesization.

**1. Define dimensions array P:**
$P = [30, 35, 15, 5, 10]$
Here, $n=4$ matrices.
$A_1: P[0] \times P[1] = 30 \times 35$
$A_2: P[1] \times P[2] = 35 \times 15$
$A_3: P[2] \times P[3] = 15 \times 5$
$A_4: P[3] \times P[4] = 5 \times 10$

**2. Initialize `m` and `s` tables:**
`m` table (size $5 \times 5$, 1-based indexing):
```
    j=1   j=2   j=3   j=4
i=1 [ 0 ] [inf] [inf] [inf]
i=2 [ - ] [ 0 ] [inf] [inf]
i=3 [ - ] [ - ] [ 0 ] [inf]
i=4 [ - ] [ - ] [ - ] [ 0 ]
```
`s` table (size $5 \times 5$):
```
    j=1   j=2   j=3   j=4
i=1 [ 0 ] [ 0 ] [ 0 ] [ 0 ]
i=2 [ - ] [ 0 ] [ 0 ] [ 0 ]
i=3 [ - ] [ - ] [ 0 ] [ 0 ]
i=4 [ - ] [ - ] [ - ] [ 0 ]
```

**3. Fill the tables (length `L` from 2 to `n`):**

**L = 2:**
*   $m[1][2]$ ($A_1 A_2$): $m[1][1] + m[2][2] + P[0] P[1] P[2] = 0 + 0 + (30 \times 35 \times 15) = 15750$. $s[1][2]=1$.
*   $m[2][3]$ ($A_2 A_3$): $m[2][2] + m[3][3] + P[1] P[2] P[3] = 0 + 0 + (35 \times 15 \times 5) = 2625$. $s[2][3]=2$.
*   $m[3][4]$ ($A_3 A_4$): $m[3][3] + m[4][4] + P[2] P[3] P[4] = 0 + 0 + (15 \times 5 \times 10) = 750$. $s[3][4]=3$.

`m` table after L=2:
```
    j=1    j=2    j=3    j=4
i=1 [ 0 ] [15750] [inf] [inf]
i=2 [ - ] [ 0 ]  [2625] [inf]
i=3 [ - ] [ - ]  [ 0 ]  [ 750 ]
i=4 [ - ] [ - ]  [ - ]  [ 0 ]
```
`s` table after L=2:
```
    j=1   j=2   j=3   j=4
i=1 [ 0 ] [ 1 ] [ 0 ] [ 0 ]
i=2 [ - ] [ 0 ] [ 2 ] [ 0 ]
i=3 [ - ] [ - ] [ 0 ] [ 3 ]
i=4 [ - ] [ - ] [ - ] [ 0 ]
```

**L = 3:**
*   **i = 1, j = 3 ($A_1 A_2 A_3$)**
    *   $m[1][3] = \text{inf}$.
    *   **k = 1:** $(A_1) (A_2 A_3)$
        *   Cost = $m[1][1] + m[2][3] + P[0] P[1] P[3]$
        *   Cost = $0 + 2625 + (30 \times 35 \times 5) = 2625 + 5250 = 7875$.
        *   $m[1][3] = 7875$, $s[1][3] = 1$.
    *   **k = 2:** $(A_1 A_2) (A_3)$
        *   Cost = $m[1][2] + m[3][3] + P[0] P[2] P[3]$
        *   Cost = $15750 + 0 + (30 \times 15 \times 5) = 15750 + 2250 = 18000$.
        *   $7875 < 18000$, so $m[1][3]$ remains $7875$, $s[1][3]$ remains $1$.
*   **i = 2, j = 4 ($A_2 A_3 A_4$)**
    *   $m[2][4] = \text{inf}$.
    *   **k = 2:** $(A_2) (A_3 A_4)$
        *   Cost = $m[2][2] + m[3][4] + P[1] P[2] P[4]$
        *   Cost = $0 + 750 + (35 \times 15 \times 10) = 750 + 5250 = 6000$.
        *   $m[2][4] = 6000$, $s[2][4] = 2$.
    *   **k = 3:** $(A_2 A_3) (A_4)$
        *   Cost = $m[2][3] + m[4][4] + P[1] P[3] P[4]$
        *   Cost = $2625 + 0 + (35 \times 5 \times 10) = 2625 + 1750 = 4375$.
        *   Since $4375 < 6000$, update $m[2][4] = 4375$. $s[2][4] = 3$.

`m` table after L=3:
```
    j=1    j=2    j=3    j=4
i=1 [ 0 ] [15750] [7875] [inf]
i=2 [ - ] [ 0 ]  [2625] [4375]
i=3 [ - ] [ - ]  [ 0 ]  [ 750 ]
i=4 [ - ] [ - ]  [ - ]  [ 0 ]
```
`s` table after L=3:
```
    j=1   j=2   j=3   j=4
i=1 [ 0 ] [ 1 ] [ 1 ] [ 0 ]
i=2 [ - ] [ 0 ] [ 2 ] [ 3 ]
i=3 [ - ] [ - ] [ 0 ] [ 3 ]
i=4 [ - ] [ - ] [ - ] [ 0 ]
```

**L = 4:**
*   **i = 1, j = 4 ($A_1 A_2 A_3 A_4$)**
    *   $m[1][4] = \text{inf}$.
    *   **k = 1:** $(A_1) (A_2 A_3 A_4)$
        *   Cost = $m[1][1] + m[2][4] + P[0] P[1] P[4]$
        *   Cost = $0 + 4375 + (30 \times 35 \times 10) = 4375 + 10500 = 14875$.
        *   $m[1][4] = 14875$, $s[1][4] = 1$.
    *   **k = 2:** $(A_1 A_2) (A_3 A_4)$
        *   Cost = $m[1][2] + m[3][4] + P[0] P[2] P[4]$
        *   Cost = $15750 + 750 + (30 \times 15 \times 10) = 16500 + 4500 = 21000$.
        *   $14875 < 21000$, so $m[1][4]$ remains $14875$, $s[1][4]$ remains $1$.
    *   **k = 3:** $(A_1 A_2 A_3) (A_4)$
        *   Cost = $m[1][3] + m[4][4] + P[0] P[3] P[4]$
        *   Cost = $7875 + 0 + (30 \times 5 \times 10) = 7875 + 1500 = 9375$.
        *   Since $9375 < 14875$, update $m[1][4] = 9375$. $s[1][4] = 3$.

`m` table after L=4:
```
    j=1    j=2    j=3    j=4
i=1 [ 0 ] [15750] [7875] [9375]
i=2 [ - ] [ 0 ]  [2625] [4375]
i=3 [ - ] [ - ]  [ 0 ]  [ 750 ]
i=4 [ - ] [ - ]  [ - ]  [ 0 ]
```
`s` table after L=4:
```
    j=1   j=2   j=3   j=4
i=1 [ 0 ] [ 1 ] [ 1 ] [ 3 ]
i=2 [ - ] [ 0 ] [ 2 ] [ 3 ]
i=3 [ - ] [ - ] [ 0 ] [ 3 ]
i=4 [ - ] [ - ] [ - ] [ 0 ]
```

**4. Final Answer:**
The minimum number of scalar multiplications is $\mathbf{m[1][4] = 9375}$.

**5. Reconstruct Parenthesization:**
*   $s[1][4] = 3$. This means the final split is $(A_1 A_2 A_3) (A_4)$.
*   Now, recursively look at $(A_1 A_2 A_3)$: $s[1][3] = 1$. This means $(A_1) (A_2 A_3)$.
*   Now, recursively look at $(A_2 A_3)$: $s[2][3] = 2$. This means $(A_2) (A_3)$.
*   So, combining: $((A_1 (A_2 A_3)) A_4)$.

The optimal parenthesization is $\mathbf{( (A_1 (A_2 A_3)) A_4 )}$.

**Reflection:** This example shows how the `k` value can change for different `(i,j)` pairs. It also highlights that the optimal split point for a chain of length `L` might be found by combining subproblems of varying lengths, as long as `m[i][k]` and `m[k+1][j]` are already computed.

---

### Example 3: Five Matrices (Harder)

**Problem:** Find the minimum cost to multiply $A_1 A_2 A_3 A_4 A_5$.
**Given:**
$A_1: 5 \times 10$
$A_2: 10 \times 3$
$A_3: 3 \times 12$
$A_4: 12 \times 5$
$A_5: 5 \times 50$
**What we want:** The minimum number of scalar multiplications and the optimal parenthesization.

**1. Define dimensions array P:**
$P = [5, 10, 3, 12, 5, 50]$
Here, $n=5$ matrices.

**2. Initialize `m` and `s` tables:**
`m` table (size $6 \times 6$, 1-based indexing):
```
    j=1   j=2   j=3   j=4   j=5
i=1 [ 0 ] [inf] [inf] [inf] [inf]
i=2 [ - ] [ 0 ] [inf] [inf] [inf]
i=3 [ - ] [ - ] [ 0 ] [inf] [inf]
i=4 [ - ] [ - ] [ - ] [ 0 ] [inf]
i=5 [ - ] [ - ] [ - ] [ - ] [ 0 ]
```
`s` table (size $6 \times 6$):
```
    j=1   j=2   j=3   j=4   j=5
i=1 [ 0 ] [ 0 ] [ 0 ] [ 0 ] [ 0 ]
i=2 [ - ] [ 0 ] [ 0 ] [ 0 ] [ 0 ]
i=3 [ - ] [ - ] [ 0 ] [ 0 ] [ 0 ]
i=4 [ - ] [ - ] [ - ] [ 0 ] [ 0 ]
i=5 [ - ] [ - ] [ - ] [ - ] [ 0 ]
```

**3. Fill the tables (length `L` from 2 to `n`):**

**L = 2:**
*   $m[1][2]$ ($A_1 A_2$): $P[0]P[1]P[2] = 5 \times 10 \times 3 = 150$. $s[1][2]=1$.
*   $m[2][3]$ ($A_2 A_3$): $P[1]P[2]P[3] = 10 \times 3 \times 12 = 360$. $s[2][3]=2$.
*   $m[3][4]$ ($A_3 A_4$): $P[2]P[3]P[4] = 3 \times 12 \times 5 = 180$. $s[3][4]=3$.
*   $m[4][5]$ ($A_4 A_5$): $P[3]P[4]P[5] = 12 \times 5 \times 50 = 3000$. $s[4][5]=4$.

`m` table (L=2 completed):
```
    j=1   j=2   j=3   j=4   j=5
i=1 [ 0 ] [150] [inf] [inf] [inf]
i=2 [ - ] [ 0 ] [360] [inf] [inf]
i=3 [ - ] [ - ] [ 0 ] [180] [inf]
i=4 [ - ] [ - ] [ - ] [ 0 ] [3000]
i=5 [ - ] [ - ] [ - ] [ - ] [ 0 ]
```

**L = 3:**
*   **i = 1, j = 3 ($A_1 A_2 A_3$)**
    *   $m[1][3] = \text{inf}$
    *   k=1: $m[1][1]+m[2][3]+P[0]P[1]P[3] = 0+360+(5 \times 10 \times 12) = 360+600 = 960$. $s[1][3]=1$.
    *   k=2: $m[1][2]+m[3][3]+P[0]P[2]P[3] = 150+0+(5 \times 3 \times 12) = 150+180 = 330$. $s[1][3]=2$.
    *   $m[1][3] = 330$.
*   **i = 2, j = 4 ($A_2 A_3 A_4$)**
    *   $m[2][4] = \text{inf}$
    *   k=2: $m[2][2]+m[3][4]+P[1]P[2]P[4] = 0+180+(10 \times 3 \times 5) = 180+150 = 330$. $s[2][4]=2$.
    *   k=3: $m[2][3]+m[4][4]+P[1]P[3]P[4] = 360+0+(10 \times 12 \times 5) = 360+600 = 960$. $s[2][4]$ remains $2$.
    *   $m[2][4] = 330$.
*   **i = 3, j = 5 ($A_3 A_4 A_5$)**
    *   $m[3][5] = \text{inf}$
    *   k=3: $m[3][3]+m[4][5]+P[2]P[3]P[5] = 0+3000+(3 \times 12 \times 50) = 3000+1800 = 4800$. $s[3][5]=3$.
    *   k=4: $m[3][4]+m[5][5]+P[2]P[4]P[5] = 180+0+(3 \times 5 \times 50) = 180+750 = 930$. $s[3][5]=4$.
    *   $m[3][5] = 930$.

`m` table (L=3 completed):
```
    j=1   j=2   j=3   j=4   j=5
i=1 [ 0 ] [150] [330] [inf] [inf]
i=2 [ - ] [ 0 ] [360] [330] [inf]
i=3 [ - ] [ - ] [ 0 ] [180] [930]
i=4 [ - ] [ - ] [ - ] [ 0 ] [3000]
i=5 [ - ] [ - ] [ - ] [ - ] [ 0 ]
```

**L = 4:**
*   **i = 1, j = 4 ($A_1 A_2 A_3 A_4$)**
    *   $m[1][4] = \text{inf}$
    *   k=1: $m[1][1]+m[2][4]+P[0]P[1]P[4] = 0+330+(5 \times 10 \times 5) = 330+250 = 580$. $s[1][4]=1$.
    *   k=2: $m[1][2]+m[3][4]+P[0]P[2]P[4] = 150+180+(5 \times 3 \times 5) = 330+75 = 405$. $s[1][4]=2$.
    *   k=3: $m[1][3]+m[4][4]+P[0]P[3]P[4] = 330+0+(5 \times 12 \times 5) = 330+300 = 630$. $s[1][4]$ remains $2$.
    *   $m[1][4] = 405$.
*   **i = 2, j = 5 ($A_2 A_3 A_4 A_5$)**
    *   $m[