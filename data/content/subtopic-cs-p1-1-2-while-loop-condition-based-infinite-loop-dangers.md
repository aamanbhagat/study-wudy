## What it is
A `while` loop is a fundamental control flow structure that repeatedly executes a block of code as long as a specified boolean condition evaluates to `True`. The condition is checked *before* each potential execution of the code block. Once the condition becomes `False`, the loop terminates and the program continues with the next line of code.

## Why it matters
`while` loops are essential for tasks where the number of iterations is not known in advance. In rocket science, a guidance system might run a loop like `while not_on_correct_trajectory: adjust_thrusters()`, continuously making corrections. In machine learning, an algorithm trains `while error > tolerance_threshold: update_model_weights()`, iterating until the model is accurate enough.

## When to study it
Before tackling `while` loops, you must have a firm grasp of the following prerequisites. If you are not confident with these, master them first.
*   Variables and assignment (e.g., `x = 5`).
*   Data types, especially integers (`int`) and booleans (`True`, `False`).
*   Comparison operators (`<`, `>`, `==`, `!=`, `<=`, `>=`).
*   The `if` statement. A `while` loop is conceptually a repeating `if` statement.

## How to study it (step by step)
1.  **Write a simple counter.** Open your Python editor. Write a `while` loop that initializes a variable `count = 1` and prints its value, incrementing it by one each time, until it reaches 5. The condition will be `while count <= 5:`.
2.  **Analyze the components.** Identify the three crucial parts of your loop from step 1: the *initialization* (`count = 1`), the *condition* (`count <= 5`), and the *state change* (`count = count + 1`).
3.  **Create an infinite loop.** Deliberately comment out the state change line from your first loop. Run the program. Observe that it prints `1` endlessly. Learn the keyboard shortcut to terminate a running program in your terminal (usually `Ctrl+C`). This experience is vital.
4.  **Implement a condition-based stop.** Write a loop that asks for user input and only stops when the user types the word "exit". The condition will be something like `while user_input != "exit":`. This demonstrates looping for an unknown number of iterations.
5.  **Compare with a `for` loop.** Take the counter from step 1 and rewrite it using a `for` loop (e.g., `for count in range(1, 6):`). Articulate the difference: `for` loops are best for iterating a known number of times over a sequence, while `while` loops are best for iterating until a specific condition is met.

## Key ideas, with intuition
1.  **The Gatekeeper Condition:** The `while <condition>:` part acts as a gatekeeper. Before each pass through the loop, the program checks the condition. If it's `True`, the gate opens and the code inside the loop body runs. If it's `False`, the gate stays shut, and the program skips the loop body entirely, moving on.

2.  **The Necessity of State Change:** For a loop to terminate, something inside its body must eventually cause the gatekeeper's condition to become `False`. This is the *state change*. If the state never changes in a way that affects the condition, the gatekeeper will always see `True` and the loop will run forever.
    $$ \text{Loop State: } S_0 \xrightarrow{\text{iteration 1}} S_1 \xrightarrow{\text{iteration 2}} S_2 \dots \xrightarrow{\text{iteration n}} S_n $$
    For the loop `while C(S_i)` to terminate, there must exist some iteration $n$ where the condition $C(S_n)$ evaluates to `False`.

3.  **Zero or More Iterations:** Because the condition is checked *before* the first execution, it's possible for a `while` loop's body to never run at all. If the condition is `False` from the very beginning, the program simply skips it. This is a key difference from `do-while` loops found in other languages, which always execute at least once.

## Worked example
**Problem:** Find the smallest power of 3 that is greater than 1000.

**Solution:**
We don't know how many times we need to multiply by 3, so a `while` loop is the perfect tool.

1.  **Initialization:** We need a variable to hold the current power of 3. Let's start with the first power, $3^1=3$.
    ```python
    power_of_3 = 3
    ```

2.  **Condition:** We want to keep going *while* our number is not yet greater than 1000. So, the loop continues as long as `power_of_3 <= 1000`.
    ```python
    while power_of_3 <= 1000:
    ```

3.  **State Change:** Inside the loop, to get the *next* power of 3, we must multiply the current value by 3. This is the crucial step that makes progress toward the exit condition.
    ```python
    power_of_3 = power_of_3 * 3
    ```

4.  **Putting it all together and printing the result:**
    ```python
    # Step 1: Initialize the variable
    power_of_3 = 3
    print(f"Starting with {power_of_3}")

    # Step 2: Loop while the condition is true
    while power_of_3 <= 1000:
        # Step 3: Change the state to make progress
        power_of_3 = power_of_3 * 3
        print(f"  ... next power is {power_of_3}")

    # After the loop finishes, the condition is false.
    # This means power_of_3 is now > 1000.
    print(f"The first power of 3 greater than 1000 is: {power_of_3}")
    ```

**Output:**
```
Starting with 3
  ... next power is 9
  ... next power is 27
  ... next power is 81
  ... next power is 243
  ... next power is 729
  ... next power is 2187
The first power of 3 greater than 1000 is: 2187
```

**Reflection:**
*   The **initialization** gave us a starting point.
*   The **condition** correctly defined the boundary of our problem (`<= 1000`).
*   The **state change** (`*= 3`) ensured the loop made progress and eventually terminated. When `power_of_3` became `2187`, the condition `2187 <= 1000` was checked, evaluated to `False`, and the loop exited.

## Diagrams
A flowchart for a `while` loop:
```text
          +-----------+
          |   Start   |
          +-----+-----+
                |
                v
      +---------+---------+
      |                   |
      |  Check Condition  |
      |                   |
      +---------+---------+
          |           ^
(False)   |           | (True)
          v           |
      +-------+   +---+-----------+
      |  End  |   | Execute Body  |
      +-------+   | Update State  |
                  +---------------+
```

## Memory technique — remember this forever
1.  **The "Are We There Yet?" Story:** A `while` loop is a persistent child in a car asking, "Are we there yet?".
    *   **Initialization:** Getting in the car (`miles_to_go = 100`).
    *   **Condition:** `while miles_to_go > 0:` (The child asks the question).
    *   **Loop Body:** The car drives for a bit (`print("Not yet...")`).
    *   **State Change:** The car covers distance (`miles_to_go = miles_to_go - 10`).
    *   **Infinite Loop:** The car runs out of gas but the child keeps asking. The state (`miles_to_go`) stops changing, so the condition is never met.

2.  **Overlearn this structure (the "ICS" pattern):**
    ```python
    # I - Initialization
    variable = initial_value

    # C - Condition
    while boolean_expression_with_variable:
        # Loop Body
        ...
        # S - State Change
        variable = new_value
    ```

3.  **Spaced Repetition Schedule:** Review this concept and re-do the worked example at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you ever forget how a `while` loop works, rebuild it from an `if` statement. An `if` statement checks a condition *once*. A `while` loop is simply a structure that says: "Do what's in this `if` block, and when you're done, jump back to the top and check the `if` condition again. Keep doing this until the condition is false."

## Common mistakes
1.  **Forgetting the State Change:** The most common cause of infinite loops. You initialize `i = 0` and check `while i < 10:`, but you forget to add `i = i + 1` inside the loop. The value of `i` never changes, so the condition is always true.
2.  **Off-By-One Errors:** Using `<` when you should use `<=` or vice-versa. If you want to include the number 10 in your loop, `while i < 10` will stop when `i` is 9. You need `while i <= 10`. Always test your loop boundaries.
3.  **Incorrect Boolean Logic:** Writing a condition that can never be met or is always true from the start. For example, `x = 5; while x > 0 and x < 4: ...` will never run because `x` cannot be both greater than 0 and less than 4 while being 5.

## Self-check
1.  Write a `while` loop that prints the numbers from 100 down to 80, inclusive, in steps of 2 (i.e., 100, 98, 96...).
2.  Write a program that simulates a simple login. It should have a hard-coded password. The program should use a `while` loop to repeatedly ask the user for the password until they enter the correct one, at which point it should print "Access granted" and terminate.
3.  A number is a "perfect power" if it can be expressed as $a^b$ for integers $a > 1$ and $b > 1$. Write a program that takes an integer `n` as input and determines if it's a perfect power. Use nested `while` loops. (Hint: For each possible base `a` from 2 up to $\sqrt{n}$, check if powers of `a` can equal `n`).