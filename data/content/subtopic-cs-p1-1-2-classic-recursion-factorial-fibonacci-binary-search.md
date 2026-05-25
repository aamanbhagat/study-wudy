## What it is
Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem. In programming, this is achieved when a function calls itself. Every recursive function has two parts: a **base case**, which is a simple condition that stops the recursion, and a **recursive step**, which breaks the problem down and calls the function again with a simpler input.

## Why it matters
Recursion is a fundamental concept in computer science that mirrors mathematical induction. It is essential for understanding and implementing advanced algorithms like tree and graph traversals (e.g., pathfinding for a Mars rover), efficient sorting algorithms (mergesort, quicksort), and for parsing complex structures like code itself (compilers). In physics and graphics, it's the natural way to model self-similar structures like fractals.

## When to study it
You should be comfortable with the following Python concepts before tackling recursion:
*   Defining and calling functions (`def`, `return`).
*   Function arguments and parameters.
*   Conditional logic (`if`/`elif`/`else`).
*   The basic idea of the call stack: when a function is called, it's added to a stack; when it returns, it's removed.

If you are not solid on these, review them first. Recursion builds directly on the mechanics of function calls.

## How to study it (step by step)
1.  **Implement Factorial Iteratively:** Write a Python function `factorial_iter(n)` that calculates $n!$ using a `for` loop. This is your baseline.
2.  **Implement Factorial Recursively:** Write `factorial_rec(n)`. Identify the base case ($0! = 1$) and the recursive step ($n! = n \cdot (n-1)!$). Trace the execution of `factorial_rec(3)` on paper, drawing the call stack frame for each call.
3.  **Implement Fibonacci Recursively:** Write a function `fib(n)` to find the n-th Fibonacci number. The definition is recursive: $F_n = F_{n-1} + F_{n-2}$, with base cases $F_0 = 0$ and $F_1 = 1$. Trace `fib(4)` and notice the repeated, inefficient calculations (e.g., `fib(2)` is calculated twice). This illustrates a key trade-off.
4.  **Understand Binary Search:** On paper, take a sorted list of 16 numbers. Manually search for a value using binary search: check the middle, eliminate half the list, repeat. Verbally narrate the "problem" you are solving at each step. Notice it's the same problem ("find X in this sorted list") on a smaller list.
5.  **Implement Binary Search Recursively:** Write a function `binary_search(arr, target, low, high)`. The base case is when `low > high` (target not found). The recursive step involves calling `binary_search` on either the left or right half of the current sub-array.
6.  **Reflect and Compare:** For one of the problems (e.g., factorial), place the iterative and recursive functions side-by-side. The recursive version is often more concise and closer to the mathematical definition, but the iterative version can be more memory-efficient by avoiding deep call stacks.

## Key ideas, with intuition
*   **Base Case: The Escape Hatch.** A recursive function must have a condition under which it does *not* call itself. This is the simplest possible version of the problem, which can be solved directly. Without a base case, the function would call itself forever, leading to a stack overflow error.
    *   *Intuition:* If you're giving directions using landmarks ("keep going until you see the big oak tree"), the "big oak tree" is the base case. It's the signal to stop the process.

*   **Recursive Step: Shrink and Delegate.** This is the core of the algorithm. The function does a small amount of work and then calls itself to solve a slightly smaller or simpler version of the original problem.
    *   *Intuition:* Imagine washing a tall stack of plates. You wash one plate (the work), and then you're left with a smaller stack of plates (the simpler problem). The process is the same for the smaller stack.

*   **The Leap of Faith.** When writing the recursive step, you must *trust* that the recursive call will work correctly for the smaller problem. Don't try to mentally trace the entire call chain while you're writing the code. Just assume `my_function(n-1)` returns the correct answer for `n-1`, and then figure out how to use that answer to solve for `n`.
    $$ \text{To solve for } n, \text{ assume you have the solution for } n-1. $$

*   **The Call Stack: The Computer's Memory.** Each time a function calls itself, a new "frame" is pushed onto the call stack. This frame stores the function's local variables for that specific call. When a function returns, its frame is popped off the stack, and control returns to the caller. This is how the program keeps track of all the pending calculations.

## Worked example
Let's trace the execution of `factorial(3)` step-by-step.

```python
def factorial(n):
    # Base Case
    if n == 0:
        return 1
    # Recursive Step
    else:
        return n * factorial(n - 1)

# Initial call
result = factorial(3)
```

1.  **`factorial(3)` is called.**
    *   `n` is 3. `n == 0` is false.
    *   It must compute `3 * factorial(2)`. It pauses and calls `factorial(2)`.

2.  **`factorial(2)` is called.**
    *   `n` is 2. `n == 0` is false.
    *   It must compute `2 * factorial(1)`. It pauses and calls `factorial(1)`.

3.  **`factorial(1)` is called.**
    *   `n` is 1. `n == 0` is false.
    *   It must compute `1 * factorial(0)`. It pauses and calls `factorial(0)`.

4.  **`factorial(0)` is called.**
    *   `n` is 0. `n == 0` is true.
    *   It hits the **base case** and `return 1`. This call is finished.

5.  **Control returns to `factorial(1)`.**
    *   It was waiting for the result of `factorial(0)`, which is `1`.
    *   It can now compute its return value: `1 * 1`, which is `1`.
    *   It `return 1`. This call is finished.

6.  **Control returns to `factorial(2)`.**
    *   It was waiting for the result of `factorial(1)`, which is `1`.
    *   It can now compute its return value: `2 * 1`, which is `2`.
    *   It `return 2`. This call is finished.

7.  **Control returns to `factorial(3)`.**
    *   It was waiting for the result of `factorial(2)`, which is `2`.
    *   It can now compute its return value: `3 * 2`, which is `6`.
    *   It `return 6`. This call is finished.

8.  The original call completes. The variable `result` is assigned the value `6`.

Each step delegated a smaller problem until it hit the trivial base case. The results were then passed back up the chain of calls and combined to produce the final answer.

## Diagrams
The call stack for `factorial(3)`:

```text
STACK (grows downwards)

1. factorial(3) called
   [ frame for factorial(3), n=3, waiting for factorial(2) ]

2. factorial(2) called
   [ frame for factorial(3), n=3, waiting for factorial(2) ]
   [ frame for factorial(2), n=2, waiting for factorial(1) ]

3. factorial(1) called
   [ frame for factorial(3), n=3, waiting for factorial(2) ]
   [ frame for factorial(2), n=2, waiting for factorial(1) ]
   [ frame for factorial(1), n=1, waiting for factorial(0) ]

4. factorial(0) called
   [ frame for factorial(3), n=3, waiting for factorial(2) ]
   [ frame for factorial(2), n=2, waiting for factorial(1) ]
   [ frame for factorial(1), n=1, waiting for factorial(0) ]
   [ frame for factorial(0), n=0 ] -> hits base case, returns 1

5. factorial(0) returns, frame is popped
   [ frame for factorial(3), n=3, waiting for factorial(2) ]
   [ frame for factorial(2), n=2, waiting for factorial(1) ]
   [ frame for factorial(1), n=1 ] -> receives 1, returns 1*1=1

6. factorial(1) returns, frame is popped
   [ frame for factorial(3), n=3, waiting for factorial(2) ]
   [ frame for factorial(2), n=2 ] -> receives 1, returns 2*1=2

7. factorial(2) returns, frame is popped
   [ frame for factorial(3), n=3 ] -> receives 2, returns 3*2=6

8. factorial(3) returns, frame is popped. Stack is empty.
```

Binary Search on `arr = [2, 5, 8, 12, 16, 23, 38, 56]`, searching for `target = 23`:

```text
Initial call: binary_search(arr, 23, low=0, high=7)
  mid = (0+7)//2 = 3. arr[3] = 12.
  12 < 23, so we search the right half.
  Recursive call: binary_search(arr, 23, low=4, high=7)

Search space:
[2, 5, 8, 12, | 16, 23, 38, 56]
 low=0       mid=3         high=7
             ^
             arr[mid] < target, so new low = mid + 1

New call: binary_search(arr, 23, low=4, high=7)
  mid = (4+7)//2 = 5. arr[5] = 23.
  23 == 23, found! Return index 5.

Search space:
[ ... | 16, 23, 38, 56]
        low=4 mid=5  high=7
              ^
              arr[mid] == target, return mid
```

## Memory technique — remember this forever
1.  **Mnemonic: The Matryoshka Doll.** Think of recursion as a set of Russian nesting dolls. To solve the problem of the biggest doll, you open it and find a slightly smaller, identical doll inside. You repeat this until you find the smallest, solid doll that can't be opened (the **base case**). The solution is found only when you put all the dolls back together in the reverse order you opened them (the **return values propagating up the call stack**).

2.  **Must-know facts:**
    *   Every recursive function MUST have a **base case**. `if condition: return value`
    *   Every recursive function MUST have a **recursive step** that calls itself on a problem that is verifiably closer to the base case. `return func(n-1)`

3.  **Spaced Repetition Schedule:**
    *   Re-implement one of these algorithms from scratch in **1 day**.
    *   Re-implement a different one in **3 days**.
    *   Explain the call stack for `fib(4)` to a rubber duck in **7 days**.
    *   Re-implement binary search in **16 days**.
    *   Write a recursive solution to a new problem in **35 days**.

4.  **First Principles Pathway:** If you forget how to write a recursive function, ask two questions:
    *   **"What is the absolute simplest version of this problem I can solve directly?"** This defines your base case. For factorial, it's $0! = 1$. For binary search, it's an empty list.
    *   **"If I magically had the solution for a slightly smaller problem, how would I solve my current problem?"** This defines your recursive step. For factorial, if I have $(n-1)!$, then $n!$ is just $n \times (n-1)!$.

## Common mistakes
*   **Missing Base Case:** Forgetting the `if` condition that stops the recursion. This results in an infinite loop of function calls and a `RecursionError: maximum recursion depth exceeded`.
*   **No Progress Towards Base Case:** The recursive call doesn't actually simplify the problem. For example, calling `factorial(n)` inside the `factorial(n)` function. The input must change in a way that eventually triggers the base case (e.g., `n-1`).
*   **Forgetting to `return`:** Writing `my_func(n-1)` instead of `return my_func(n-1)`. The recursive call computes a value, but that value is thrown away instead of being passed back up the call stack to the caller.
*   **Inefficient Fibonacci:** The naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` is computationally expensive because it re-calculates the same values many times. It's a classic example of when recursion is elegant but inefficient without optimization (like memoization).

## Self-check
1.  Write a recursive function `sum_to(n)` that computes the sum of all integers from 1 to `n`. What is the base case?
2.  Write a recursive function `power(base, exp)` that computes $base^{exp}$. Assume `exp` is a non-negative integer. (Hint: $b^e = b \cdot b^{e-1}$).
3.  Write a recursive function `is_palindrome(s)` that returns `True` if a string `s` is a palindrome and `False` otherwise. Do not use slicing to reverse the string. (Hint: Compare the first and last characters. If they match, what is the smaller problem you need to solve?)