## What it is
Brute-force search, also known as exhaustive search, is an algorithmic paradigm that systematically enumerates every possible candidate in the entire search space for a problem. It then checks whether each candidate satisfies the problem's conditions to find a solution. It is the most direct, straightforward approach, relying on raw computational power rather than clever insights.

## Why it matters
Brute force is the fundamental baseline against which all "smarter" algorithms are measured; if your sophisticated algorithm isn't better than brute force, it's not useful. In physics and engineering, when the problem space is small and well-defined, brute force is often the simplest and most reliable method. For example, in optimizing a simple rocket trajectory across a small, discretized set of possible thrust vectors, an exhaustive search can guarantee finding the true optimum, whereas more complex algorithms might get stuck in local optima.

## When to study it
You are ready for this topic. The necessary prerequisites are:
1.  **Basic Programming:** Fluency with loops (especially nested loops), conditionals, and recursion.
2.  **Combinatorics:** Understanding of permutations ($n!$), combinations ($\binom{n}{k}$), and powers ($k^n$).
3.  **Asymptotic Notation (Big O):** You must be able to analyze the time complexity of an algorithm and understand the difference between polynomial ($O(n^k)$), exponential ($O(k^n)$), and factorial ($O(n!)$) growth. This is non-negotiable, as it is the primary tool for deciding when brute force is "acceptable."

## How to study it (step by step)
1.  **Implement the simplest case:** Write a function to find the maximum value in an unsorted array. This is a linear scan, a simple form of brute force. Analyze its $O(n)$ complexity. Notice you must check *every* element to be certain.
2.  **Implement a polynomial case:** Solve the "Two Sum" problem: given an array of integers and a target value, find two numbers that sum to the target. Use nested loops to check every pair of numbers. Analyze its $O(n^2)$ complexity and reflect on why it's exhaustive for pairs.
3.  **Implement a factorial case:** Write a function that generates all permutations of a small string, e.g., "abc". Use recursion. This will help you internalize how factorial complexity arises from sequential choices.
4.  **Analyze the explosion:** For the permutation function, add a counter. Run it for strings of length 3, 4, 5, ..., 10. Print the number of permutations generated. See for yourself how quickly $n!$ grows. Calculate how long it would take for $n=20$ if one permutation takes 1 microsecond. This builds intuition for the "wall" where brute force becomes infeasible.
5.  **Define "acceptable":** For a typical competitive programming platform, a modern CPU can perform roughly $10^8$ operations per second. If your input size $n=20$ and your complexity is $O(2^n)$, you have $2^{20} \approx 10^6$ operations, which is acceptable. If $n=40$, $2^{40} \approx 10^{12}$, which is not. "Acceptable" is a direct function of the problem's constraints on $n$.

## Key ideas, with intuition
1.  **Search Space:** This is the set of *all possible answers*. For a 4-digit PIN, the search space is all numbers from 0000 to 9999, a total of $10^4$ candidates. Brute force means walking through this entire set.
2.  **Generate and Test:** This is the core loop of any brute-force algorithm. The "generate" step creates the next candidate solution (e.g., the next PIN `0001`), and the "test" step checks if it's correct (e.g., does this PIN unlock the phone?).
3.  **Combinatorial Explosion:** This is the critical limitation. The size of the search space often grows explosively with the input size, $n$.
    *   **Polynomial $O(n^k)$:** Finding pairs, triplets, etc. Grows fast, but manageable for moderate $n$.
    *   **Exponential $O(k^n)$:** Making a binary choice for each of $n$ items (e.g., include in subset or not). Search space size is $2^n$.
    *   **Factorial $O(n!)$:** Arranging $n$ items in all possible orders (permutations). This is the fastest-growing and becomes infeasible very quickly.
    Brute force is only acceptable when this explosion doesn't happen for the given constraints on $n$. If a problem states $n \le 20$, an $O(2^n)$ algorithm might pass. If $n \le 1000$, it will not.

## Worked example
**Problem:** Solve the 4-Queens problem. Place 4 chess queens on a 4x4 board such that no two queens can attack each other. This means no two queens can be on the same row, column, or diagonal.

**Brute-Force Approach:** We will systematically generate all possible placements of 4 queens and test each placement for validity. A naive approach would be to choose 4 squares out of 16, which is $\binom{16}{4} = 1820$. A smarter, but still brute-force, approach is to recognize that there must be exactly one queen per column.

**Steps:**
1.  **Define the Search Space:** We must place one queen in each column. Let's represent a placement by an array `q` of length 4, where `q[i]` is the row of the queen in column `i`. For column 0, the queen can be in row 0, 1, 2, or 3. Same for column 1, 2, and 3. The total search space is $4 \times 4 \times 4 \times 4 = 4^4 = 256$ possible placements.

2.  **Generate Candidates:** We can use four nested loops to generate all 256 placements.
    ```python
    # Pseudocode
    for q0 in 0..3:  # Row for queen in column 0
      for q1 in 0..3:  # Row for queen in column 1
        for q2 in 0..3:  # Row for queen in column 2
          for q3 in 0..3:  # Row for queen in column 3
            placement = [q0, q1, q2, q3]
            # Now, test this placement
    ```
    A candidate placement is an array, e.g., `[0, 0, 0, 0]` means all queens are in the top row. `[1, 3, 0, 2]` is another candidate.

3.  **Test a Candidate:** For a given `placement = [q0, q1, q2, q3]`, we must check for attacks.
    *   **Row attacks:** Check if any two queens are in the same row. This means checking if `q[i] == q[j]` for any `i != j`.
    *   **Diagonal attacks:** Two queens at `(col_i, row_i)` and `(col_j, row_j)` are on the same diagonal if the absolute difference of their rows equals the absolute difference of their columns: $|row_i - row_j| = |col_i - col_j|$. In our notation, this is $|q[i] - q[j]| = |i - j|$.

4.  **Execute and Find Solutions:**
    *   Let's test `[1, 3, 0, 2]`.
    *   **Rows:** `1, 3, 0, 2` are all unique. No row attacks.
    *   **Diagonals:**
        *   Q0 at (0,1) and Q1 at (1,3): $|3-1| = 2$, $|1-0|=1$. Not a diagonal attack.
        *   Q0 at (0,1) and Q2 at (2,0): $|0-1| = 1$, $|2-0|=2$. Not a diagonal attack.
        *   Q0 at (0,1) and Q3 at (3,2): $|2-1| = 1$, $|3-0|=3$. Not a diagonal attack.
        *   Q1 at (1,3) and Q2 at (2,0): $|0-3| = 3$, $|2-1|=1$. Not a diagonal attack.
        *   Q1 at (1,3) and Q3 at (3,2): $|2-3| = 1$, $|3-1|=2$. Not a diagonal attack.
        *   Q2 at (2,0) and Q3 at (3,2): $|2-0| = 2$, $|3-2|=1$. Not a diagonal attack.
    *   This placement is valid. It is a solution.

5.  **Reflection:** By iterating through all 256 possibilities and testing each one, we are guaranteed to find all solutions. The generation step was simple (nested loops). The test step was also simple (checking pairs for row/diagonal conflicts). This worked because the search space ($4^4$) was very small. For an 8x8 board, the search space would be $8^8 \approx 16$ million, which is still manageable. For a 20x20 board, $20^{20}$ is astronomically large, and this brute-force approach is completely unacceptable.

## Diagrams
A search tree for generating permutations of `{A, B, C}`. The brute-force algorithm explores every path from the root to a leaf.

```text
              (Start)
            /    |    \
           A     B     C      (Choice for 1st position)
          / \   / \   / \
         B   C A   C A   B    (Choice for 2nd position)
         |   | |   | |   |
         C   B C   A B   A    (Choice for 3rd position)

Leaves: [ABC, ACB, BAC, BCA, CAB, CBA]
```

A solution to the 4-Queens problem, `[1, 3, 0, 2]`:

```text
  +---+---+---+---+
3 |   | Q |   |   |
  +---+---+---+---+
2 |   |   |   | Q |
  +---+---+---+---+
1 | Q |   |   |   |
  +---+---+---+---+
0 |   |   | Q |   |
  +---+---+---+---+
    0   1   2   3
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Brute Force: Try every key on the janitor's keychain." It's not clever, it's not fast, but if the right key is on the chain, you *will* open the door. It's exhaustive and guaranteed to work if you have enough time.
2.  **Overlearn these facts:**
    *   Acceptability depends on **problem constraints** and **time complexity**.
    *   $O(n!)$ -> Acceptable only for $n \lesssim 12$.
    *   $O(2^n)$ -> Acceptable only for $n \lesssim 22$.
    *   $O(n^2)$ -> Acceptable for $n \lesssim 10^4$.
    (These are rough estimates for a 1-second time limit).
3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, try to re-derive the 4-Queens solution from scratch.
4.  **First Principles Pathway:** If you're ever unsure if brute force is viable, don't guess. Rebuild from first principles:
    *   What constitutes one "candidate solution"?
    *   How many choices do I have at each step of building a candidate?
    *   How many steps are there?
    *   Multiply the number of choices at each step to get the size of the search space. (e.g., for permutations of $n$ items, it's $n \times (n-1) \times \dots \times 1 = n!$).
    *   Compare this number to $\approx 10^8$.

## Common mistakes
1.  **Ignoring Constraints:** Seeing a problem that can be solved with brute force for a small $n$, and incorrectly assuming the same code will work for the full problem constraints where $n$ is large. Always check the maximum possible value of $n$.
2.  **Miscalculating Complexity:** Confusing $O(n^2)$ with $O(2^n)$. For $n=20$, $n^2 = 400$ but $2^n \approx 1,000,000$. This mistake can lead you to dismiss a viable brute-force solution or attempt an infeasible one.
3.  **Premature Optimization:** Making a brute-force search more complicated to "prune" the search space, but introducing bugs or, worse, pruning the branch with the correct answer. Get the simple, correct brute force working first, then consider optimizations.
4.  **Generating Duplicates:** In problems like finding subsets or combinations, writing a generation step that produces the same candidate multiple times (e.g., generating `{1, 2}` and `{2, 1}` when they are the same set). This doesn't make the solution wrong, but it wastes computation.

## Self-check
1.  You need to crack a password that is known to be exactly 6 lowercase English letters. Is a brute-force attack acceptable? Justify with a calculation of the search space size.
2.  Given an array of $n$ integers, find the contiguous subarray with the largest sum. Describe a brute-force algorithm to solve this. What is its time complexity? For what values of $n$ would this be acceptable?
3.  You are given a set of $n$ cities and the distances between every pair of cities. You must find the shortest possible route that visits each city exactly once and returns to the origin city (the Traveling Salesperson Problem). Describe the brute-force approach and its time complexity. If $n=15$, is this approach feasible on a standard computer?