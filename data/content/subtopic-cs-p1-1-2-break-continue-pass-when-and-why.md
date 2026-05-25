## What it is
The keywords `break`, `continue`, and `pass` are control flow statements in Python. They alter the standard execution path inside loops (`for`, `while`) or other code blocks. `break` terminates a loop entirely, `continue` skips the current iteration and proceeds to the next, and `pass` is a null operation that does nothing, acting as a placeholder.

## Why it matters
These statements are fundamental for writing efficient and readable code that handles complex conditions. In physics simulations or machine learning training, you might use `break` to stop a process once a desired precision is reached or if the model diverges. You would use `continue` to skip a corrupted data point in a satellite telemetry stream or a non-physical result in a simulation step without halting the entire analysis.

## When to study it
You must have a solid understanding of the following prerequisites before tackling this subtopic:
- `for` loops
- `while` loops
- `if`/`elif`/`else` conditional statements

If you cannot write a loop to iterate through a list and print elements based on a condition, review those topics first. These keywords are meaningless without the context of the structures they control.

## How to study it (step by step)
1.  **Baseline Loop:** Write a `for` loop that prints the integers from 0 to 9. Confirm you understand its execution flow from start to finish.
2.  **Introduce `break`:** Modify your loop. Add a conditional: `if i == 5: break`. Trace the execution by hand. Notice that the loop terminates completely when `i` is 5; the numbers 6, 7, 8, and 9 are never printed. The program execution jumps to the first statement *after* the loop.
3.  **Introduce `continue`:** Start a new loop from 0 to 9. This time, add the conditional `if i == 5: continue`. Trace this execution. Observe that when `i` is 5, the `print(i)` statement is skipped, but the loop does not terminate. It immediately starts the next iteration where `i` becomes 6.
4.  **Introduce `pass`:** Define a function `def placeholder_function():` but leave it empty. Notice Python gives you a syntax error (`IndentationError: expected an indented block`). Now, place `pass` inside the function. The error disappears. `pass` syntactically fills the space where code is required but you have nothing to write yet.
5.  **Combine and Solve:** Write a script to find the first multiple of 17 in the range of integers from 100 down to 50. Use a `for` loop, an `if` statement, and `break`. This forces you to use `break` for its primary purpose: ending a search once the goal is met.
6.  **Edge Case Analysis:** Consider a `while` loop with a `continue`. What happens if the `continue` statement causes you to skip the line of code that updates the loop's condition variable (e.g., `i += 1`)? You've just created an infinite loop. Write one intentionally to see this failure mode. This builds an intuition for careful placement.

## Key ideas, with intuition
1.  **Altering the "Natural" Flow:** A standard `for` loop is predictable: it executes its block for every item in the sequence. These keywords are manual overrides. Think of them as goto statements with strict, well-defined limitations that prevent the chaos of an actual `goto`.

2.  **`break`: The Emergency Exit.** When a `break` statement is executed, the program immediately exits the *innermost enclosing* `for` or `while` loop. It's not just for the current iteration; the entire loop construct is terminated.
    $$
    \text{for } i \text{ in sequence: } \\
    \quad \text{...} \\
    \quad \text{if (condition_is_met):} \\
    \quad \quad \mathbf{break} \quad \text{// Execution jumps here} \\
    \quad \text{...} \\
    \text{// to the first line of code after the loop.}
    $$

3.  **`continue`: Skip This Round.** When a `continue` statement is executed, the program immediately abandons the rest of the code in the current iteration. It then jumps back to the top of the loop to begin the next iteration.
    $$
    \text{for } i \text{ in sequence: } \quad \text{// Execution jumps back here} \\
    \quad \text{...} \\
    \quad \text{if (condition_is_met):} \\
    \quad \quad \mathbf{continue} \\
    \quad \text{// This part of the loop body is skipped for this iteration.} \\
    \quad \text{...}
    $$

4.  **`pass`: A Syntactic Placeholder.** Python's syntax requires an indented block in certain places (like after a `def`, `class`, or `if` statement). If you have no code to put there yet, `pass` is a null statement that satisfies the interpreter without performing any action. It literally "passes" the time.

## Worked example
**Problem:** We are processing a list of sensor readings from a rocket's engine test. The list contains temperatures in Celsius. We need to find the first temperature reading that exceeds the critical threshold of 500°C. We must ignore any invalid negative readings.

**Data:** `readings = [120, 150, -30, 200, 450, 512, 550]`
**Threshold:** `500`

**Solution:**
```python
readings = [120, 150, -30, 200, 450, 512, 550]
critical_temp = 500
found_temp = None # Use None to indicate we haven't found it yet

print("Starting engine temperature check...")

for temp in readings:
    # Step 1: Check for invalid data
    if temp < 0:
        print(f"Skipping invalid reading: {temp}")
        continue # Skip the rest of this iteration and go to the next reading

    # Step 2: Process valid data
    print(f"Checking temperature: {temp}°C")

    # Step 3: Check against the critical threshold
    if temp > critical_temp:
        print(f"CRITICAL: Temperature {temp}°C exceeds threshold of {critical_temp}°C.")
        found_temp = temp
        break # Exit the loop immediately, our search is over

print("Engine temperature check complete.")

if found_temp is not None:
    print(f"First critical temperature recorded was: {found_temp}°C")
else:
    print("No critical temperatures were found in the readings.")
```

**Reflection:**
- The `continue` on line 11 was crucial. When `temp` was `-30`, it prevented the "Checking temperature..." and threshold comparison logic from running on invalid data. The loop immediately started the next iteration with `temp = 200`.
- The `break` on line 18 was essential for efficiency. Once the first critical temperature (`512`) was found, there was no need to check the rest of the list (`550`). The `break` statement terminated the loop, saving computation time.
- The `found_temp` variable, initialized to `None`, allows the code after the loop to know *why* the loop ended—whether it completed naturally or was terminated by `break`.

## Diagrams
Here is a flowchart illustrating the control flow for `break` and `continue` within a loop.

**`break` Flowchart:**
```text
          +-----------------+
          |  Start of Loop  |
          +--------+--------+
                   |
                   v
          +-----------------+
          |  Loop Condition |<---+
          | (e.g., for item)|    |
          +--------+--------+    |
                   | (True)     |
                   v            |
        +--------------------+  | (Next iteration)
        | Is break_condition?|--+ (False)
        +----------+---------+
                   | (True)
                   v
+----------------------------------------+
|                                        |
|           +-----------------+          |
+---------->| Code After Loop |          |
            +-----------------+          |
                                         |
```

**`continue` Flowchart:**
```text
          +-----------------+
          |  Start of Loop  |
          +--------+--------+
                   |
                   v
          +-----------------+ ----+
          |  Loop Condition |<----+ (Jump to next iteration)
          | (e.g., for item)|     |
          +--------+--------+     |
                   | (True)      |
                   v             |
      +------------------------+ |
      | Is continue_condition? |-+ (True)
      +------------+-----------+
                   | (False)
                   v
          +-----------------+
          | Remainder of    |
          | Loop Body       |
          +-----------------+
                   |
                   +-------------+ (End of current iteration)
```

## Memory technique — remember this forever
1.  **The Story:** You are a quality assurance inspector on an assembly line.
    - **`continue`**: You inspect a product. It has a minor, fixable flaw. You mark it, set it aside, and *continue* to the next product on the belt. The line keeps moving.
    - **`break`**: You inspect a product and it's catastrophically broken, indicating a fundamental machine failure. You slam the big red emergency stop button. The entire assembly line halts. You *break* the process.
    - **`pass`**: You see a gap on the assembly line reserved for a future machine. To prevent anyone from asking questions, you put up a sign that says "RESERVED". The sign does nothing but fills the empty space. You *pass* over it.

2.  **Overlearn these facts:**
    - `break`: Terminates the innermost `for` or `while` loop.
    - `continue`: Skips the remainder of the current iteration and proceeds to the next iteration of the innermost loop.
    - `pass`: A null statement; a placeholder where syntax requires a statement.

3.  **Spaced Repetition Schedule:**
    - Review this entire lesson in: **1 day**.
    - Then again in: **3 days**.
    - Then again in: **7 days**.
    - Then again in: **16 days**.
    - Final review in: **35 days**.

4.  **First Principles Pathway:** If you forget, remember that code executes sequentially. A loop is a structure that forces the *program counter* (the pointer to the current instruction) to jump backward.
    - `break` is an unconditional jump to the instruction immediately *after* the loop block.
    - `continue` is an unconditional jump to the *top* of the loop block (specifically, to the logic that prepares the next iteration).
    - `pass` is a "No-Op" (No Operation) instruction. The program counter simply advances to the next instruction as if `pass` wasn't there.

## Common mistakes
1.  **Nested Loop Confusion:** A `break` or `continue` statement only affects the innermost loop it is in. Students often expect `break` to exit all nested loops at once. This is incorrect; it only exits one level.
2.  **`break` vs. `return`:** In the context of a function, `break` exits a loop, but execution continues within the function. `return` exits the entire function immediately, regardless of any loops.
3.  **Accidental Infinite Loops:** Placing a `continue` before the loop variable is updated in a `while` loop.
    ```python
    i = 0
    while i < 10:
        if i % 2 == 0:
            continue # Whoops, i is even, so we skip the increment
        i += 1 # This line is never reached when i is 0, 2, 4...
    ```
4.  **Misunderstanding Loop `else` Clauses:** Python loops can have an `else` block. This `else` block executes *only if the loop completes its entire sequence without being terminated by a `break` statement*. Many students assume it runs every time the loop condition becomes false.

## Self-check
1.  What is the exact output of the following code? Trace it by hand before running it.
    ```python
    for i in range(1, 8):
        if i % 3 == 0:
            continue
        if i == 6:
            break
        print(i, end=' ')
    ```
2.  Write a Python script that iterates through numbers from 1 to 100. It should print the first number it finds that is divisible by both 5 and 9. Once found, the program should stop.
3.  You are given a list of lists (a 2D matrix) representing terrain data, e.g., `terrain = [[1, 2, 3], [4, -1, 5], [6, 7, 8]]`. Write a script that searches this terrain for a "hazard", represented by a negative number. If a hazard is found, your script should print a warning message with the row number and immediately stop searching that row, moving on to the next. If the number `99` is found (a "goal"), it should stop all searching immediately and print "Goal found!".