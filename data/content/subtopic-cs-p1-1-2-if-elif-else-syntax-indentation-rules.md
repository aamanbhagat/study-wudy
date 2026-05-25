## What it is
Conditional statements, using the `if`, `elif`, and `else` keywords, allow a program to execute different blocks of code based on whether specific conditions are true or false. They are the primary mechanism for creating decision-making logic and branching paths in your code.

## Why it matters
This is the foundation of all intelligent behavior in software. In aerospace, a flight controller uses conditional logic to decide whether to fire thrusters based on sensor data (`if altitude < target_altitude:`). In machine learning, a classifier uses a chain of learned conditions to decide if an image contains a tumor (`if confidence_score > 0.95:`). Without conditionals, programs would be simple, linear sequences of instructions, incapable of reacting to input or changing state.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites. If not, master them first.
*   **Variables:** How to declare and assign values to variables.
*   **Data Types:** Specifically `int`, `float`, and especially `bool` (`True` and `False`).
*   **Comparison Operators:** `==` (equals), `!=` (not equals), `>` (greater than), `<` (less than), `>=` (greater than or equal to), `<=` (less than or equal to).
*   **Logical Operators:** `and`, `or`, `not`.

## How to study it (step by step)
1.  **The simple `if`:** Write a program that checks if a number is positive. Define a variable `x = 10`. Write `if x > 0:`. On the next line, indent (press Tab or 4 spaces) and write `print("x is positive")`. Run it. Change `x` to `-5` and run it again. Observe that nothing is printed.
2.  **Adding the fallback `else`:** Modify your previous code. After the indented print statement, un-indent and write `else:`. On the next line, indent and write `print("x is not positive")`. Test with both positive and negative values for `x`. See how exactly one of the two blocks always runs.
3.  **Handling multiple exclusive conditions with `elif`:** Now, handle three cases: positive, negative, and zero. Start with `if x > 0:`. Next, un-indent and write `elif x < 0:`. Indent and print the "negative" message. Finally, use `else:` for the only remaining case: zero. Test with `x = 10`, `x = -5`, and `x = 0`. This structure is a chain; the first condition that evaluates to `True` executes its block, and the rest of the chain is skipped.
4.  **Mastering indentation:** Intentionally break your code. Take one of your working examples and remove the indentation from a line inside an `if` block. Run it. You will get an `IndentationError`. This is not a suggestion; in Python, indentation is syntactically mandatory for defining code blocks. It is how the interpreter knows which lines of code "belong" to the `if`.
5.  **Nesting conditionals:** Write a program to check if a number is positive *and* even. First, check `if x > 0:`. *Inside* that indented block, add another `if` statement: `if x % 2 == 0:`. The modulo operator `%` gives the remainder of a division. This demonstrates how you can create more complex logic by placing conditionals inside one another.

## Key ideas, with intuition
*   **A Fork in the Road:** Think of your program as a single path of instructions being executed one after another. An `if` statement is a fork in that path. The program evaluates a condition (e.g., "Is `x` greater than 0?") and chooses which path to take based on the `True`/`False` answer.
*   **The Boolean Gatekeeper:** Every `if` or `elif` is guarded by a condition that must evaluate to a Boolean value: `True` or `False`. If the condition is `True`, the gate opens and the code block inside is executed. If it's `False`, the program skips that block and moves to the next `elif` or `else` in the chain.
*   **Indentation Defines Scope:** How does Python know where a code block begins and ends? Unlike other languages that use `{...}` braces, Python uses whitespace. Any sequence of lines indented to the same level after a colon (`:`) is considered a single block. When the indentation level returns to the previous level, the block has ended. This forces clean, readable code.
    $$
    \text{if condition:} \\
    \quad \underbrace{\text{statement 1} \newline \text{statement 2}}_{\text{This is one block, defined by indentation.}} \\
    \text{next\_statement\_outside\_block}
    $$
*   **Mutual Exclusivity:** In a single `if`/`elif`/`...`/`else` chain, only one block of code can possibly execute. The interpreter checks the conditions from top to bottom. The very first one that evaluates to `True` gets executed, and the entire rest of the chain is skipped. The `else` block is a default catch-all that only runs if *all* preceding `if` and `elif` conditions were `False`.

## Worked example
Let's model a basic rocket engine check. The engine is "GO" for launch only if its temperature is within a specific range and its pressure is above a minimum threshold.

**Problem:** Given `temperature` in Celsius and `pressure` in kPa, print "GO for launch" if temperature is between 20 and 30 degrees (inclusive) and pressure is above 1000 kPa. Otherwise, print "Scrub launch."

**Code:**
```python
# Step 1: Define the state variables for the engine.
temperature_c = 25
pressure_kpa = 1500

# Step 2: Create the primary condition check. We need to check both temperature and pressure.
# A natural way to do this is to nest the checks. First, check the temperature.
if temperature_c >= 20 and temperature_c <= 30:
    # Step 3: If the temperature is in range, then proceed to check the pressure.
    # This is a nested conditional. It only runs if the outer 'if' was True.
    if pressure_kpa > 1000:
        # Step 4: If both conditions are met, print the success message.
        print("GO for launch")
    else:
        # Step 5: If temperature was OK but pressure was not, print a specific failure message.
        print("Scrub launch: Pressure out of range.")
else:
    # Step 6: If the first condition (temperature) failed, we don't even need to check pressure.
    # The 'else' corresponds to the first 'if'.
    print("Scrub launch: Temperature out of range.")

```

**Reflection:**
*   **Step 1** sets up the initial state.
*   **Step 2** uses an `if` with a compound condition (`and`) to check the temperature range. This is the first gate.
*   **Step 3** shows nesting. The pressure check is only performed if the temperature check passed, which is efficient.
*   **Step 4** is the "success" path where all conditions were met.
*   **Steps 5 and 6** handle the two different failure modes. The `else` clauses ensure that a message is printed for any case that isn't a success, providing clear feedback. The nesting allows for more specific error messages.

## Diagrams
A flowchart for a simple `if`/`elif`/`else` structure.

```text
                 +-----------------+
                 | Program Start   |
                 +-----------------+
                        |
                        v
              +--------------------+
      +-------| if condition_A?    |-------+
      |       +--------------------+       |
      | (True)                             | (False)
      v                                    v
+--------------+               +--------------------+
| Execute      |       +-------| elif condition_B?  |-------+
| Block A      |       |       +--------------------+       |
+--------------+       | (True)                             | (False)
      |                v                                    v
      |          +--------------+                     +--------------+
      |          | Execute      |                     | Execute      |
      |          | Block B      |                     | Block C (else) |
      |          +--------------+                     +--------------+
      |                |                                    |
      +----------------+------------------------------------+
                       |
                       v
                 +-----------------+
                 | Program End     |
                 +-----------------+
```
This diagram shows that the program flow evaluates `condition_A`. If true, it executes Block A and then exits the structure. If false, it proceeds to evaluate `condition_B`, and so on. Exactly one path through the blocks (A, B, or C) is taken.

## Memory technique — remember this forever
1.  **The Story:** Imagine you're at a checkpoint with a series of guards.
    *   The first guard is `if`. He asks you a question (`condition1`). If you answer "yes" (`True`), he lets you into his room (`code block 1`), and you *never meet the other guards*. You go straight to the exit.
    *   If you answer "no" (`False`), he sends you to the next guard, `elif`. He asks a *different* question (`condition2`). If you answer "yes", you go into his room (`code block 2`) and then to the exit.
    *   The last guard is `else`. He has no question. He's the default. If all other guards turned you away, he automatically puts you in his room (`code block 3`).
    You can only ever enter one guard's room.

2.  **Overlearn this syntax:** Burn this pattern into your memory. Note the colons and the indentation.
    ```python
    if condition1:
        # code to run if condition1 is True
    elif condition2:
        # code to run if condition1 is False AND condition2 is True
    else:
        # code to run if all preceding conditions are False
    ```

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in **1 day**. Write a new program from scratch.
    *   Review in **3 days**. Explain the "Guard" analogy to a rubber duck or a friend.
    *   Review in **7 days**. Re-draw the ASCII flowchart from memory.
    *   Review in **16 days**. Write a nested `if` statement.
    *   Review in **35 days**. Solve the "Hard" self-check problem again.

4.  **First Principles Pathway:** If you forget the syntax, reason it out.
    *   "I need to do something *only if* a condition is met." That's the keyword `if`.
    *   "What's the condition?" `if my_variable == 10`.
    *   "How do I mark the end of the condition and the start of the code to run?" A colon: `if my_variable == 10:`.
    *   "How do I group the code that should run?" Python's rule: indentation.
    *   "What if the condition is false?" I need a fallback. That's the keyword `else:`.
    *   "What if I have more than two possibilities?" I need an "else if". Python shortens this to `elif`.

## Common mistakes
*   **Assignment vs. Comparison:** Writing `if x = 5:` instead of `if x == 5:`. The single equals sign `=` is for *assigning* a value, while the double equals `==` is for *comparing* two values. This is a very common error.
*   **Forgetting the Colon:** Each `if`, `elif`, and `else` line must end with a colon `:`. Forgetting it will cause a `SyntaxError`.
*   **Inconsistent Indentation:** Mixing tabs and spaces, or using a different number of spaces for different lines within the same block. This will raise an `IndentationError`. Configure your editor to use 4 spaces for every Tab key press.
*   **Incorrect `elif` Order:** If your conditions overlap, the order matters. `if x > 10:` followed by `elif x > 5:` will never trigger the second block for a number like 15, because the first condition is met and the chain is exited. You must order your checks from most specific to least specific, or ensure they are mutually exclusive.

## Self-check
1.  **Easy:** Write a program that defines a variable `altitude_km`. If the altitude is greater than 100, print "Karman line reached. Welcome to space."
2.  **Medium:** Write a program that takes a single integer, `number`. It should print "Fizz" if the number is divisible by 3, "Buzz" if it's divisible by 5, and "FizzBuzz" if it's divisible by both 3 and 5. If none of these are true, it should print the number itself. (Hint: The order of your `if`/`elif` checks is critical here.)
3.  **Hard:** A rocket stage can be commanded to "Continue burn", "Stage separation", or "Shutdown". The rules are:
    *   If `fuel_percentage` is above 20% AND `altitude_km` is below 60, "Continue burn".
    *   If `fuel_percentage` is 20% or less, BUT `altitude_km` is below 60, "Shutdown".
    *   If `altitude_km` is 60 or above, command "Stage separation" regardless of fuel.
    Write a program that takes `fuel_percentage` and `altitude_km` as variables and prints the correct command.