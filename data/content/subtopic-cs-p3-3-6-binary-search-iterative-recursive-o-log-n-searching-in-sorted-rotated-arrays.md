## What it is
Binary search is a "divide and conquer" algorithm that finds the position of a target value within a **sorted** array. It works by repeatedly comparing the target value to the middle element of the array; if they are not equal, the half of the array in which the target cannot lie is eliminated, and the search continues on the remaining half. This process is repeated until the value is found or the remaining half is empty.

## Why it matters
Its efficiency, $O(\log n)$, makes it fundamental for searching massive datasets where a linear scan ($O(n)$) would be prohibitively slow. In aerospace, it's used in trajectory optimization to find the optimal parameter (e.g., launch angle) that satisfies a condition by searching a sorted range of possible values. In machine learning, it can accelerate hyperparameter tuning (e.g., finding the best learning rate) and is a key component in data structures like binary search trees.

## When to study it
You must be comfortable with these prerequisites:
*   Arrays (or lists) and index-based access.
*   Control flow: loops (`while`, `for`) and conditionals (`if`/`else`).
*   Functions and recursion (for the recursive variant).
*   Big-O notation, specifically understanding the difference between $O(1)$, $O(\log n)$, and $O(n)$.

If you are not solid on these, pause and review them first. The logic of binary search depends entirely on them.

## How to study it (step by step)
1.  **Implement the iterative version:** Take a sorted array like `[1, 3, 5, 7, 9, 11, 13]` and a target. Write a function using a `while` loop, and `low`, `high`, and `mid` pointers to find the target's index. Do this from scratch, referring to the core idea only.
2.  **Trace on paper:** For the array above, trace the values of `low`, `high`, and `mid` for two cases: a target that exists (e.g., `9`) and one that does not (e.g., `6`). This builds mechanical understanding.
3.  **Derive the time complexity:** Start with an array of size $N$. After 1 comparison, the search space is $N/2$. After 2, it's $N/4$. After $k$ comparisons, it's $N/2^k$. The algorithm stops when the search space is 1. Solve for $k$ in the equation $N/2^k = 1$. This will directly lead you to $k = \log_2 N$, hence $O(\log n)$.
4.  **Implement the recursive version:** Refactor your iterative code into a recursive function. The base cases will be "target found" or "search space empty" (`low > high`). The recursive step involves calling the function on the left or right half of the array.
5.  **Solve a rotated array problem:** Given a sorted array that has been rotated (e.g., `[4, 5, 6, 7, 0, 1, 2]`), adapt your binary search to find a target. The key is to determine which half of the array remains sorted at each step.

## Key ideas, with intuition
1.  **The Sorted Property is Everything:** The entire algorithm hinges on the array being sorted. This property is what allows us to make an intelligent decision after a single comparison. If `arr[mid] < target`, we *know* the target cannot be in the left half, because all elements to the left of `mid` are even smaller. This allows us to discard half the data at each step.

2.  **Maintaining an Invariant:** The core of the algorithm's correctness is an "invariant": a condition that is true at the start of every loop iteration. For binary search, the invariant is: *"If the target exists in the array, it must be within the indices `[low, high]`."* Each step—calculating `mid`, comparing `arr[mid]` to the target, and updating `low` or `high`—is designed to preserve this invariant while shrinking the size of the `[low, high]` window.

3.  **Logarithmic Collapse:** Why is this so fast? Imagine searching a dictionary for a word. You don't start at 'A' and read every page. You open it to the middle. If your word is alphabetically later, you discard the first half and repeat the process on the second half. With a 1024-page dictionary, one check reduces your problem to 512 pages, then 256, 128, 64, 32, 16, 8, 4, 2, and finally 1. You only needed 10 checks to search 1024 pages, because $2^{10} = 1024$. This relationship is logarithmic:
    $$ \text{Number of elements } N \implies \text{Number of operations } \approx \log_2 N $$

4.  **Pivoting in Rotated Arrays:** When a sorted array is rotated (e.g., `[7, 8, 1, 2, 3]`), it's essentially two sorted subarrays joined together. The standard binary search logic breaks. The new key idea is to use the midpoint comparison not just to check against the target, but also to determine which half of the current window (`[low, mid]` or `[mid, high]`) is the one that remains properly sorted. You can then check if the target lies in that sorted portion; if it does, search there, otherwise, search the other (non-contiguous) portion.

## Worked example
Let's find the target `22` in the sorted array `A = [2, 5, 8, 12, 16, 22, 38, 56, 72, 91]`.

**Initial State:**
*   `low = 0` (index of `2`)
*   `high = 9` (index of `91`)
*   `A = [2, 5, 8, 12, 16, 22, 38, 56, 72, 91]`

**Step 1:**
1.  Calculate midpoint: `mid = low + (high - low) // 2 = 0 + (9 - 0) // 2 = 4`.
2.  `A[mid]` is `A[4]`, which is `16`.
3.  Compare: `16 < 22`. The target must be in the right half.
4.  Update pointers to discard the left half. The new search space is `[mid + 1, high]`.
    *   `low = mid + 1 = 5`
    *   `high` remains `9`

**Step 2:**
1.  State: `low = 5`, `high = 9`. Search space is `[22, 38, 56, 72, 91]`.
2.  Calculate midpoint: `mid = 5 + (9 - 5) // 2 = 5 + 2 = 7`.
3.  `A[mid]` is `A[7]`, which is `56`.
4.  Compare: `56 > 22`. The target must be in the left half of this new space.
5.  Update pointers to discard the right half. The new search space is `[low, mid - 1]`.
    *   `low` remains `5`
    *   `high = mid - 1 = 6`

**Step 3:**
1.  State: `low = 5`, `high = 6`. Search space is `[22, 38]`.
2.  Calculate midpoint: `mid = 5 + (6 - 5) // 2 = 5 + 0 = 5`.
3.  `A[mid]` is `A[5]`, which is `22`.
4.  Compare: `22 == 22`. The target is found.
5.  Return `mid`, which is `5`.

**Reflection:** Each step successfully reduced the search space while guaranteeing the target, if present, remained within the `[low, high]` bounds. The first step eliminated 5 elements, the second eliminated 3, and the third found the target. This rapid reduction is the hallmark of binary search.

## Diagrams
Here is a trace of the worked example, showing how the `low`, `high`, and `mid` pointers converge.

**Iteration 1:**
```text
Index: 0  1  2   3   4   5   6   7   8   9
Array: [2, 5, 8, 12, 16, 22, 38, 56, 72, 91]
        ^              ^                   ^
        L              M                   H
Action: A[M] < target. Discard left. New L = M+1.
```

**Iteration 2:**
```text
Index: 0  1  2   3   4   5   6   7   8   9
Array: [2, 5, 8, 12, 16, 22, 38, 56, 72, 91]
                           ^      ^      ^
                           L      M      H
Action: A[M] > target. Discard right. New H = M-1.
```

**Iteration 3:**
```text
Index: 0  1  2   3   4   5   6   7   8   9
Array: [2, 5, 8, 12, 16, 22, 38, 56, 72, 91]
                           ^  ^
                           L,M H
Action: A[M] == target. Found. Return M.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "The Price is Right". You're guessing a price between \$1 and \$1000. Your first guess is \$500. The host says "Higher". Now you know the price is in [\$501, \$1000]. Your next guess is the midpoint, \$750. The host says "Lower". Now you know it's in [\$501, \$749]. You are performing a binary search on the price range.

2.  **Must overlearn:**
    *   The loop condition: `while low <= high:` (The `=` is crucial for arrays with one element).
    *   The midpoint calculation: `mid = low + (high - low) // 2` (This avoids potential integer overflow on massive arrays where `low + high` could exceed the maximum integer size).
    *   The pointer updates: `high = mid - 1` and `low = mid + 1`.

3.  **Spaced Repetition Schedule:** Re-implement binary search from scratch (both iterative and recursive) on these days:
    *   Day 1
    *   Day 3
    *   Day 7
    *   Day 16
    *   Day 35

4.  **First Principles Pathway:** If you forget the implementation, rebuild it from the invariant: "The target must be in `[low, high]`".
    *   Start with `low = 0`, `high = n-1`. The invariant holds.
    *   The loop must shrink the `[low, high]` window, so it must eventually end. Thus, `while low <= high`.
    *   Pick a probe: `mid`. The middle is the most efficient.
    *   If `A[mid] == target`, you're done.
    *   If `A[mid] < target`, the target must be to the right. To maintain the invariant, you must include everything from `mid+1` onwards. So, `low = mid + 1`.
    *   If `A[mid] > target`, the target must be to the left. To maintain the invariant, you must include everything up to `mid-1`. So, `high = mid - 1`.
    *   If the loop finishes (`low > high`), the window is empty. The invariant holds, but the space is empty, so the target was never in the array. Return -1.

## Common mistakes
1.  **Off-by-one pointer updates:** Writing `high = mid` or `low = mid`. This fails to shrink the search space if `low` and `mid` are the same, leading to an infinite loop. Always use `mid - 1` and `mid + 1`.
2.  **Incorrect loop condition:** Using `while low < high`. This will fail for cases where the target is the last element to be checked, as the loop will terminate before `low` and `high` converge on the final index.
3.  **Forgetting sorted property:** Applying binary search to an unsorted array. It will produce an incorrect answer without warning. Always verify this precondition.
4.  **Mishandling "not found":** Not having a clear return path for when the loop terminates naturally (e.g., returning -1 or `None`). The loop finishing means the element is not present.

## Self-check
1.  Given the sorted array `[10, 20, 30, 40, 50, 60, 70]` and target `25`, what are the values of `low`, `high`, and `mid` at each step of an iterative binary search? What is the final result?
2.  Write a recursive binary search function that, instead of returning the index, returns `True` if a target element is found and `False` otherwise.
3.  Given the rotated sorted array `[6, 7, 8, 1, 2, 3, 4, 5]`, how would you modify binary search to find the index of the minimum element (`1`) in $O(\log n)$ time?