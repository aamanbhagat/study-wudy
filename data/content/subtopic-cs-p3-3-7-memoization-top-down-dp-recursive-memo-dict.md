## What it is
Memoization is an optimization technique where you cache—or "memoize"—the results of expensive function calls and return the cached result when the same inputs occur again. It is a top-down approach to dynamic programming, where you start with the overall problem and break it down recursively, storing solutions to subproblems as you encounter them for the first time. This avoids re-computation of the same subproblems.

## Why it matters
Memoization turns many algorithms with exponential time complexity into ones with polynomial (often linear) time complexity, making previously intractable problems solvable. In aerospace, this is critical for trajectory optimization and pathfinding algorithms where the same intermediate states might be evaluated repeatedly. In machine learning, it appears in algorithms like Viterbi decoding for Hidden Markov Models, which is used in speech recognition and bioinformatics to find the most likely sequence of hidden states.

## When to study it
You must have a solid grasp of **recursion** before attempting this. Specifically, you need to be able to trace a recursion tree by hand and understand the call stack. You also need to be proficient with **hash maps** (dictionaries in Python, `std::unordered_map` in C++), as they are the most common data structure used to store the memoized results. If you cannot write a recursive factorial or Fibonacci function from scratch and explain its execution, review recursion first.

## How to study it (step by step)
1.  **Implement Naive Recursion:** Write a simple recursive function for the Fibonacci sequence, $F(n) = F(n-1) + F(n-2)$ with base cases $F(0)=0, F(1)=1$.
2.  **Trace and Find Waste:** For a small input like $n=5$, draw the entire recursion tree. Circle every node that represents a repeated computation (e.g., you will see `fib(3)` is computed twice). This visualizes the problem memoization solves.
3.  **Introduce the Memo:** Modify your function to take an additional argument: a hash map called `memo`. This map will store results, with the input `n` as the key and the output `F(n)` as the value.
4.  **Add the Pattern:** At the very beginning of your recursive function, add a check: "Is `n` in `memo`?". If yes, return the stored value immediately.
5.  **Store the Result:** If `n` is not in the memo, compute the result as before. But, right before you return the newly computed result, store it in the memo: `memo[n] = result`.
6.  **Trace Again:** Draw the recursion tree for your memoized function with $n=5$. Notice how entire branches of the tree are now pruned because the function returns a cached value instead of recursing.
7.  **Generalize:** Apply this exact "check, compute, store" pattern to a different problem, like the "Climbing Stairs" problem (finding the number of ways to climb $n$ stairs taking 1 or 2 steps at a time).

## Key ideas, with intuition
1.  **Overlapping Subproblems:** This is the property that makes memoization effective. A problem has overlapping subproblems if finding its solution involves solving the same subproblems multiple times. The naive recursive Fibonacci calculation is the canonical example:
    $$ F(5) \rightarrow F(4) + F(3) $$
    $$ F(4) \rightarrow F(3) + F(2) $$
    Notice that $F(3)$ is needed by both the $F(5)$ and $F(4)$ calculations. Instead of recomputing it, we should compute it once and store the result.

2.  **Optimal Substructure:** This property means that the optimal solution to the overall problem can be constructed from the optimal solutions of its subproblems. For Fibonacci, the structure is simple addition: $F(n)$ is built directly from the solutions for $F(n-1)$ and $F(n-2)$. Memoization relies on this to build up the solution from the bottom (in terms of execution order) while thinking about it from the top down.

3.  **The State and the Memo:** The "state" is the set of parameters that uniquely defines a subproblem. In the Fibonacci example, the state is just the integer $n$. This state becomes the key in our memoization table (the hash map). The value is the solution to the subproblem defined by that state. The core logic is a simple wrapper:
    ```
    function solve(state):
        if state in memo:
            return memo[state]
        
        result = compute_recursively(state)
        
        memo[state] = result
        return result
    ```

## Worked example
Let's find the 5th Fibonacci number, $F(5)$, using memoization.

**Problem:** Compute $F(n)$ where $F(n) = F(n-1) + F(n-2)$, and $F(0)=0, F(1)=1$.

**Step 1: Plain Recursive Solution (for comparison)**
```python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```
Calling `fib(5)` results in a cascade of calls, many of which are redundant.

**Step 2: Memoized Solution**
We'll create a wrapper function to initialize the memo dictionary. The recursive helper function will contain the core logic.

```python
def fib_memo(n):
    memo = {}  # Initialize the memo for this run
    return _fib_helper(n, memo)

def _fib_helper(n, memo):
    # Base case
    if n <= 1:
        return n
    
    # 1. Check the memo
    if n in memo:
        return memo[n] # Return cached result
    
    # 2. Compute if not in memo
    result = _fib_helper(n-1, memo) + _fib_helper(n-2, memo)
    
    # 3. Store the result before returning
    memo[n] = result
    return result

# Let's trace fib_memo(4) for simplicity
# Call stack trace:
# _fib_helper(4, {})
#   4 not in memo. Compute...
#   _fib_helper(3, {})
#     3 not in memo. Compute...
#     _fib_helper(2, {})
#       2 not in memo. Compute...
#       _fib_helper(1, {}) -> returns 1
#       _fib_helper(0, {}) -> returns 0
#       result for n=2 is 1+0=1. Store memo[2]=1. Return 1.
#     _fib_helper(1, {2:1}) -> returns 1
#     result for n=3 is 1+1=2. Store memo[3]=2. Return 2.
#   _fib_helper(2, {2:1, 3:2})
#     2 IS in memo! Return memo[2] which is 1. (This is the key step!)
#   result for n=4 is 2+1=3. Store memo[4]=3. Return 3.
```

**Reflection:**
- The `_fib_helper` function follows the "check, compute, store" pattern perfectly.
- The check `if n in memo` prevents an entire branch of recursive calls (`_fib_helper(2, ...)` and its children) from being executed a second time.
- The `memo` dictionary is passed by reference down the call stack, so all recursive calls share and build up the same set of solutions. This sharing is what makes the optimization work.

## Diagrams

**1. Naive Recursion Tree for `fib(5)`**
Note the repeated subtrees for `fib(3)`, `fib(2)`, etc.

```text
                      fib(5)
                    /        \
              fib(4)          fib(3)
             /      \        /      \
        fib(3)    fib(2)    fib(2)   fib(1)
       /      \    /    \    /    \
    fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
   /      \
fib(1)   fib(0)
```

**2. Memoized Recursion Tree for `fib(5)`**
A `*` indicates a call that is served directly from the memo, pruning the tree.

```text
                      fib(5)
                    /        \
              fib(4)          fib(3)*
             /      \        
        fib(3)    fib(2)    
       /      \    /    \    
    fib(2) fib(1) fib(1) fib(0) 
   /      \
fib(1)   fib(0)
```
When the right branch `fib(3)` is called, its result has already been computed by the left branch and stored. The entire subtree is avoided.

## Memory technique — remember this forever
1.  **The Story:** Imagine a lazy but clever mathematician asked to solve a problem. The first time, she does all the hard work, but she writes the answer on a small **memo pad** next to the question. The next time someone asks her the *exact same question*, she doesn't re-solve it; she just glances at her memo pad and gives the answer instantly. Memoization is just teaching your recursive function to use a memo pad.

2.  **Must-Know Formulas/Pattern:** Overlearn this three-part structure. It is the heart of every top-down DP solution.
    ```python
    # Part 1: The Check
    if key in memo:
        return memo[key]

    # Part 2: The Recursive Compute
    result = recursive_call(...) + recursive_call(...)

    # Part 3: The Store
    memo[key] = result
    return result
    ```

3.  **Spaced Repetition Schedule:** Re-implement a memoized Fibonacci from scratch at these intervals:
    - 1 day from now.
    - 3 days from now.
    - 7 days from now.
    - 16 days from now.
    - 35 days from now.

4.  **First Principles Pathway:** If you forget, derive it.
    - Start with the pure, correct recursive solution.
    - Identify the function arguments that uniquely define a subproblem. This is your "state" and will be the `key` for your memo.
    - Create a hash map (`memo`) to store results.
    - Wrap your recursive logic in the three-part pattern above: Check, Compute, Store.

## Common mistakes
1.  **Forgetting the Base Case:** Memoization is an optimization layer on top of recursion. If your underlying recursion is flawed (e.g., infinite recursion due to a missing base case), memoization won't fix it.
2.  **Incorrect Memo Key:** The key must uniquely represent the state of a subproblem. If you're solving a grid problem, the key is probably a tuple `(row, col)`, not just `row`. If you use an incomplete key, you'll get "collisions" where the memo returns a correct answer for the wrong subproblem.
3.  **Passing Memo Incorrectly:** In languages like Python, dictionaries are passed by reference, which is what you want. In languages like C++, you must be careful to pass the map by reference (`&memo`) not by value, otherwise each recursive call gets its own copy of the map and no actual memoization occurs across different branches of the recursion tree.

## Self-check
1.  What is the time and space complexity of the naive recursive Fibonacci function? What about the memoized version? Explain the difference using the concept of the recursion tree.
2.  You are climbing a staircase with $n$ steps. You can hop either 1, 2, or 3 steps at a time. Write a memoized recursive function `count_ways(n)` to find the total number of unique ways to reach the top.
3.  Consider the "Longest Common Subsequence" problem for two strings, `s1` and `s2`. The state of a subproblem is defined by the current indices `i` and `j` in each string. What would be an appropriate key for the memoization table? Write the function signature and the "check" part of the memoization logic for this problem.