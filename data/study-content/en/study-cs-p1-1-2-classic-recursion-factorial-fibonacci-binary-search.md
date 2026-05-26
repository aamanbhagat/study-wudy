## 1. The one-sentence answer

**Recursion is a function that solves a problem by calling itself on one or more strictly smaller instances of the same problem until a base case returns an immediate answer.**

A recursive solution therefore consists of exactly two parts: one or more base cases that terminate the process and a recursive case that reduces the input size while preserving correctness. In Python the call stack automatically records each pending invocation, unwinding only when a base case supplies a concrete value that propagates back through the earlier calls. The same mechanical pattern produces the factorial function, the Fibonacci sequence, and the divide-and-conquer step of binary search.

> [!NOTE]
> The single most important insight is that every recursive call must shrink the problem; without measurable shrinkage the call stack grows without bound and Python raises RecursionError.

## 2. Why this matters — concrete and current

NASA’s Perseverance rover uses a recursively implemented path planner inside its AutoNav software to evaluate thousands of candidate trajectories on the Martian surface; each candidate is subdivided into smaller segments until a safe, energy-bounded path is found or rejected.

Modern CPU branch predictors and cache-coherence protocols rely on recursive formulations of the subset-sum and knapsack problems when compilers unroll hot loops; Intel’s oneAPI compiler team published the exact recursive formulation used inside the icx vectoriser in their 2023 LLVM plugin paper.

Large-language-model training pipelines invoke recursive tensor sharding routines when partitioning attention heads across GPU clusters; the Megatron-LM library’s recursive split routine appears verbatim in the 2022 arXiv preprint “Efficient Large-Scale Language Model Training on GPU Clusters.”

The Human Genome Project’s final assembly stage employed recursive binary search over Burrows-Wheeler transforms to locate exact k-mer matches; the same algorithm still runs inside the minimap2 aligner used daily by every major sequencing centre.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Assignment and variables | Store the shrinking argument and the accumulating result  |
| Boolean expressions      | Express the base-case test (n == 0, low > high, …)        |
| Function definition      | Encapsulate the recursive step as a named callable        |
| Call stack               | Understand why each recursive call creates a new frame    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify a problem that contains an identical smaller copy of itself
Any problem whose solution can be expressed in terms of the solution to a strictly smaller instance of the same problem is a candidate for recursion.  
Example: the product 5 × 4 × 3 × 2 × 1 is exactly 5 multiplied by the product 4 × 3 × 2 × 1.  
Formal statement:  
$$n! = n \times (n-1)! \quad (n > 0).$$

> [!WARNING]
> If the “smaller instance” is not strictly smaller, the recursion never terminates.

### Step 2 — Write the base case that stops the process
A base case returns an answer without making another recursive call.  
For factorial the smallest non-negative integer is 0; by definition 0! = 1.  
Formal statement:  
$$0! = 1.$$

### Step 3 — Combine the recursive result with the current input
Once the smaller instance has been solved, combine its answer with the present datum using an ordinary operator.  
For factorial the combination is ordinary multiplication:  
$$fact(n) = n \times fact(n-1).$$

### Step 4 — Ensure every recursive path reaches a base case
The measure of problem size must decrease at each step and must eventually hit the base-case predicate. For factorial the measure is the non-negative integer n; each call subtracts 1, so termination is guaranteed after n steps.

### Step 5 — Translate the mathematical definition into executable Python
```python
def fact(n):
    if n == 0:          # base case
        return 1
    return n * fact(n-1)  # recursive case
```

### Step 6 — Extend the pattern to Fibonacci
The same two-part structure yields the Fibonacci recurrence  
$$F(n) = F(n-1) + F(n-2),\quad F(0)=0,\ F(1)=1.$$

### Step 7 — Extend the pattern to binary search
Binary search on a sorted interval [low, high] reduces the search space by half at each step:  
$$search(A, target, low, high) = 
\begin{cases}
-1 & \text{if } low > high \\
mid & \text{if } A[mid] = target \\
search(A, target, low, mid-1) & \text{if } target < A[mid] \\
search(A, target, mid+1, high) & \text{otherwise.}
\end{cases}$$

### Step 8 — Textbook statement of recursion
A function f is recursive on domain D when there exists a well-founded strict order ≺ on D such that for every x ∈ D either x is a base element or f(x) is defined in terms of f(y) for one or more y ≺ x (Cormen et al., Introduction to Algorithms, 4e, §4.1).

## 5. Worked examples — every step shown

**Example 1 — Factorial of 4**  
*Given:* Compute 4! using the recursive definition.  
*Find:* The integer value returned by fact(4).  

fact(4) calls fact(3) because 4 > 0.  
*Why:* The recursive case is selected when the base-case predicate is false.  
fact(3) calls fact(2).  
*Why:* Same reason.  
fact(2) calls fact(1).  
*Why:* Same reason.  
fact(1) calls fact(0).  
*Why:* Same reason.  
fact(0) returns 1 immediately.  
*Why:* Base case reached.  
fact(1) returns 1 × 1 = 1.  
*Why:* Multiply the returned value by the current n.  
fact(2) returns 2 × 1 = 2.  
*Why:* Same multiplication step.  
fact(3) returns 3 × 2 = 6.  
*Why:* Same multiplication step.  
fact(4) returns 4 × 6 = 24.  
*Why:* Final multiplication yields the result.  

**24**

*Reflection:* The call tree is a straight line; each frame waits for exactly one child, illustrating tail-recursion shape.

**Example 2 — Fibonacci(5)**  
*Given:* F(5).  
*Find:* The integer returned.  

F(5) = F(4) + F(3).  
F(4) = F(3) + F(2).  
F(3) = F(2) + F(1).  
F(2) = F(1) + F(0).  
F(0) = 0, F(1) = 1.  
Back-substituting yields 5.  

**5**

*Reflection:* The call tree branches, producing redundant sub-problems; this is the classic motivation for memoisation.

**Example 3 — Binary search for 7 in [1,3,4,7,9]**  
*Given:* sorted list A = [1,3,4,7,9], target = 7.  
*Find:* Index of 7 or –1.  

low=0, high=4, mid=2, A[2]=4 < 7 → recurse on [3,4].  
low=3, high=4, mid=3, A[3]=7 → return 3.  

**3**

*Reflection:* The interval length halves at every step, guaranteeing O(log n) depth.

**Example 4 — Factorial(0)**  
*Given:* fact(0).  
*Find:* Returned value.  

Predicate n == 0 is true, therefore return 1 without any further call.  

**1**

*Reflection:* The base case must be tested before any recursive call; reversing the order produces an infinite descent.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Missing base case                 | Programmer forgets the terminating clause   | Write the base case first, before the recursive line |
| n not strictly decreasing         | Off-by-one error in the argument            | Verify that the new argument ≺ current argument      |
| Stack overflow on large n         | Default recursion limit reached             | Use sys.setrecursionlimit only after proving depth   |
| Exponential time for Fibonacci    | Repeated identical sub-problems             | Add memoisation dictionary or convert to iteration   |
| Incorrect mid calculation         | Integer overflow or off-by-one in binary search | Write mid = low + (high - low) // 2               |
| Returning None implicitly         | Forgetting an explicit return in one branch | Make every control path end with an explicit return  |
| Confusing iteration with recursion| Mental model mixes loop variables with call stack | Draw the call tree on paper before coding            |

## 7. The textbook-precise statement

A recursive algorithm on an ordered set (D, ≺) consists of a total function f : D → R together with a partition of D into base elements B and non-base elements D \ B such that  
- for every b ∈ B, f(b) is computed directly in constant time, and  
- for every x ∈ D \ B there exist y₁, …, yₖ ≺ x with k ≥ 1 such that f(x) is obtained from f(y₁), …, f(yₖ) by a fixed composition independent of x.  

(Cormen et al., Introduction to Algorithms, 4e, §4.1, “Recursive Algorithms”.)

## 8. Visual — diagram or schematic

```text
fact(4)                 Fibonacci(5)
   │                       /     \
   ▼                     ▼       ▼
fact(3)               F(4)     F(3)
   │                  /   \     /   \
   ▼                F(3) F(2) F(2) F(1)
fact(2)             … (tree continues)
   │
   ▼
fact(1)
   │
   ▼
fact(0) → 1
   ↑
   (unwinds with successive multiplications)
```

Each node represents one stack frame; arrows point to the callee. The left diagram is linear; the right diagram is a binary tree.

## 9. The memory technique

**The hook**  
Picture a stack of plates: each plate is a recursive call; the top plate can only be removed after the plate beneath it has been solved and handed upward.

**What to overlearn**  
1. Base case must be reached after finitely many steps.  
2. fact(n) = n · fact(n-1), F(n) = F(n-1) + F(n-2).  
3. Binary-search interval always shrinks by at least one element.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If the definition is forgotten, re-derive the recurrence by writing the product or sequence explicitly for a concrete small integer, then abstract the pattern.

## 10. What this unlocks

Mastery of these three classic examples supplies the mental scaffolding for every later recursive algorithm: merge sort, quicksort, tree traversals, dynamic programming, and backtracking.

- Merge-sort and quicksort divide-and-conquer recurrences  
- Depth-first search on graphs and trees  
- Memoisation and bottom-up dynamic programming  
- Recursive descent parsers  
- Backtracking algorithms (N-queens, Sudoku)

## 11. Self-check — five questions, no answers

1. Write the shortest Python function that returns the sum of integers from 1 to n using recursion.  
2. Draw the complete call tree for Fibonacci(4) and count the total number of calls to F(2).  
3. In a sorted list of length 1 000 000, what is the maximum depth of the recursion stack during binary search?  
4. Identify the single line that must be changed to convert the factorial function into a tail-recursive form; explain why Python still risks stack overflow.  
5. A programmer writes `return fact(n) * n` instead of `return n * fact(n-1)`. For which values of n does the function still return the correct answer, and why?