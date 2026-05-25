## What it is
Control flow refers to the order in which the individual statements, instructions, or function calls of a program are executed or evaluated. By default, execution is sequential (top to bottom), but control flow statements allow you to perform actions conditionally (branching) or repeatedly (looping), creating non-linear execution paths. These constructs are the fundamental building blocks of algorithms.

## Why it matters
Control flow is the logic of your program. In aerospace, a flight controller uses `if/else` logic to decide whether to fire thrusters based on sensor readings. In physics, simulating planetary motion involves a `for` loop to iterate through discrete time steps, updating positions and velocities at each step. In machine learning, training a neural network uses a `while` loop that continues until the model's error drops below a certain tolerance.

## When to study it
You must be comfortable with the following C fundamentals before tackling control flow:
*   **Variable Declaration and Basic Types:** `int`, `float`, `double`, `char`.
*   **Operators:**
    *   Arithmetic: `+`, `-`, `*`, `/`, `%`
    *   Assignment: `=`
    *   Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
    *   Logical: `&&` (AND), `||` (OR), `!` (NOT)
*   **Basic I/O:** `printf()` and `scanf()`.
*   The concept of a statement being terminated by a semicolon `;`.

If any of these are shaky, review them first. Control flow statements rely entirely on evaluating expressions built with these operators.

## How to study it (step by step)
1.  **Binary Decisions:** Write a program that asks for a number and uses an `if-else if-else` chain to print whether the number is positive, negative, or zero. Focus on how the conditions (`x > 0`, `x < 0`) are mutually exclusive and how the `else` acts as a catch-all.
2.  **Multi-way Decisions:** Write a program that takes an integer `1-7` and prints the corresponding day of the week. Implement this using a `switch` statement. Intentionally forget a `break` statement for one of the cases to see how "fall-through" works, then fix it.
3.  **Condition-controlled Loops:** Calculate the sum of the first $N$ integers, where $N$ is user-provided. First, implement this with a `while` loop. Pay attention to initializing your counter *before* the loop and incrementing it *inside* the loop.
4.  **Count-controlled Loops:** Re-implement the sum of the first $N$ integers using a `for` loop. Notice how the `for` loop's syntax `for(init; cond; update)` neatly bundles the three parts of the `while` loop (initialization, condition, update) into one line.
5.  **Guaranteed Execution Loop:** Write a simple command-line menu that prints options and asks for input. Use a `do-while` loop to ensure the menu is always displayed at least once. The loop should continue until the user enters a 'q' for quit.
6.  **Altering Loop Behavior:** Write a loop that iterates from 1 to 20. Inside, use `continue` to skip printing any number divisible by 3. Use `break` to exit the loop entirely if the number 15 is reached. This will solidify the difference between skipping an iteration and terminating the loop.
7.  **(Optional but instructive) Unstructured Jumps:** Create a 3x3 nested loop. Use `goto` to jump from the innermost loop to a label outside the entire nested structure when a specific condition is met (e.g., `i==1 && j==2`). Reflect on why a boolean flag and `break` statements might be cleaner and easier to reason about.

## Key ideas, with intuition
1.  **Branching (`if`, `switch`): The Fork in the Road.** A program's execution path is like a road. An `if` statement is a fork. The condition, a boolean expression like `(temperature > 100.0)`, is a signpost that directs traffic down one path or the other. `switch` is a multi-way intersection or roundabout, efficiently directing traffic based on a single integer-like value.

2.  **Pre-Test Loops (`while`, `for`): The Guarded Bridge.** These loops check the condition *before* executing the loop body. Imagine a bridge with a guard. `while (condition_is_true)` means the guard checks your pass *before* you cross. If your pass is invalid initially, you never cross at all (the loop body never runs). The `for` loop is just a specialized, more structured version of this, ideal when you know the number of iterations in advance.

3.  **Post-Test Loops (`do-while`): The Toll Booth.** This loop checks the condition *after* executing the loop body. Imagine a toll road where you drive a segment and then pay at a booth at the end to see if you can drive the next segment. You always travel at least one segment. This is useful for tasks that must be performed at least once, like prompting a user for input.

4.  **Loop Control (`break`, `continue`): The Eject Button and the Skip Button.** Inside any loop, `break` is an emergency eject button. It immediately terminates the *innermost* loop you are in and execution continues at the statement following the loop. `continue` is a skip button. It immediately ends the *current iteration* and starts the next one, re-evaluating the loop's condition and update expression.

5.  **Unconditional Jump (`goto`): The Teleporter.** `goto` immediately transfers control to a labeled statement elsewhere in the function. It's powerful but dangerous. Overuse of `goto` can create "spaghetti code" that is impossible to follow, like trying to read a book where pages teleport you to random chapters. Its rare valid uses are typically for breaking out of deeply nested loops or for specific cleanup patterns in system-level code.

## Worked example
Let's write a C program to find the smallest factor (other than 1) of an integer `n` provided by the user. This will synthesize a `for` loop, an `if` statement, and a `break`.

```c
#include <stdio.h>

int main() {
    int n;
    int factor = 0; // Initialize factor to a "not found" state

    // 1. Get user input
    printf("Enter an integer greater than 1: ");
    scanf("%d", &n);

    // 2. Input validation
    if (n <= 1) {
        printf("Invalid input. Number must be greater than 1.\n");
        return 1; // Exit with an error code
    }

    // 3. Loop through potential factors
    // We start at 2, the smallest possible prime factor.
    // We only need to check up to sqrt(n), but for simplicity, we'll go to n/2.
    // Any factor larger than n/2 would imply a co-factor smaller than 2, which is impossible.
    for (int i = 2; i <= n / 2; ++i) {
        // 4. Check for divisibility
        if (n % i == 0) {
            factor = i; // We found the smallest factor
            break;      // Exit the loop immediately. No need to check further.
        }
    }

    // 5. Report the result
    if (factor == 0) {
        // If the loop finished without finding a factor, the number is prime.
        printf("%d is a prime number.\n", n);
    } else {
        printf("The smallest factor of %d is %d.\n", n, factor);
    }

    return 0;
}
```
**Reflection:**
*   **Step 1-2:** Standard setup and input validation using an `if` statement. This is a basic form of conditional logic.
*   **Step 3:** The `for` loop is the perfect choice because we have a clear start (`i = 2`), end (`i <= n / 2`), and update (`++i`) for our search.
*   **Step 4:** The `if (n % i == 0)` is the core decision. If the remainder of `n` divided by `i` is zero, `i` is a factor. The `break` is crucial for efficiency. Once we find the *smallest* factor, we can stop searching.
*   **Step 5:** A final `if/else` checks our `factor` variable. Its state tells us whether the loop completed normally (prime number) or was terminated early by `break` (composite number).

## Diagrams
An `if-else` statement's flow of control:
```text
      [ Start ]
          |
          V
    /------------\
   (  Condition?  )
    \------------/
          |
    (True)|      (False)
          |------------>|
          V             V
  [ if-block code ] [ else-block code ]
          |             |
          |------------>|
          |
          V
      [ End ]
```
A `while` loop's flow of control (pre-test):
```text
          [ Start ]
              |
              V
        /------------\
----->(  Condition?  )
|      \------------/
|            | (True)
|            V
|    [ Loop Body Code ]
|            |
|____________|
             | (False)
             V
           [ End ]
```

## Memory technique — remember this forever
1.  **The Story:** You are a quality control inspector (`the program`) on an assembly line.
    *   `if`/`else`: You see a product. **If** it's defective, you pull it aside. **Else**, you let it pass.
    *   `switch`: You're at a sorting station. **Case** 'A' parts go in bin 1, **Case** 'B' in bin 2. `default` is the scrap heap.
    *   `for`: You must inspect *exactly 100* products. `for (i=0; i<100; i++)`. This is a fixed, known quantity.
    *   `while`: You inspect products **while** the "line active" light is on. You don't know when it will turn off. You check the light *before* grabbing each product.
    *   `do-while`: You must inspect at least one product to start your shift. You **do** the inspection, then check **while** the light is still on.
    *   `break`: You hit the big red emergency stop button. The whole line halts.
    *   `continue`: You see a product you aren't responsible for. You let it pass and `continue` to the next one.
    *   `goto`: A chaotic, unscheduled teleport to another part of the factory. Don't use it.

2.  **Must Overlearn:** The syntax of the three main loops. Drill this until it's muscle memory.
    *   `for (initialization; condition; update) { /* body */ }`
    *   `while (condition) { /* body */ }`
    *   `do { /* body */ } while (condition);` **<-- MEMORIZE THE SEMICOLON!**

3.  **Spaced Repetition Schedule:** Review these structures and write a small program using each one at: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget everything, remember that all control flow can be built from a conditional jump. A `while` loop is fundamentally an `if` statement that `goto`s back to itself.
    `while (C) { S; }` is equivalent to:
    ```c
    loop_start:
        if (!C) {
            goto loop_end;
        }
        S;
        goto loop_start;
    loop_end:
    ```
    This is not how you should write code, but it's the machine-level truth. Understanding this helps you see `while`, `for`, etc., as convenient, structured abstractions over this primitive operation.

## Common mistakes
1.  **Assignment vs. Comparison:** Writing `if (x = 5)` instead of `if (x == 5)`. The first assigns `5` to `x` and the expression itself evaluates to `5` (which is `true` in C), so the `if` block always runs. This is a very common and frustrating bug.
2.  **Missing `break` in `switch`:** Forgetting `break;` at the end of a `case` block will cause the program to "fall through" and execute the code in the next `case` as well. This is sometimes done intentionally but is usually a bug.
3.  **Off-By-One Errors:** In `for` loops, mixing up `<` and `<=` can cause the loop to run one too many or one too few times. Always double-check your boundary conditions. For an array of size $N$, the valid indices are $0$ to $N-1$, so the loop is `for (i=0; i<N; i++)`.
4.  **Infinite Loops:** Forgetting to update the variable in a `while` loop's condition.
    ```c
    int i = 0;
    while (i < 10) {
        printf("Hello\n"); // Oops, 'i' is never incremented!
    }
    ```

## Self-check
1.  Write a program to print the first $N$ terms of the Fibonacci sequence, where $F_0 = 0, F_1 = 1$, and $F_n = F_{n-1} + F_{n-2}$. The user should provide $N$.
2.  Write a program that reads text from the user character by character until they signal end-of-file (Ctrl+D on Linux/macOS, Ctrl+Z on Windows). The program should count and report the total number of uppercase letters, lowercase letters, digits, and whitespace characters (`' '`, `'\t'`, `'\n'`). Use a `switch` statement for character classification.
3.  Implement Newton's method to find a root of $f(x) = \cos(x) - x$. The iteration is given by $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$. Start with an initial guess $x_0 = 0.5$. Use a `do-while` loop to continue iterating until the absolute difference $|x_{n+1} - x_n|$ is less than a tolerance of $10^{-8}$.