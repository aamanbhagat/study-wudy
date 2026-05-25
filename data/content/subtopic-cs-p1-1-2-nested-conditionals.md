## What it is
Nested conditionals are decision-making structures where one `if`/`elif`/`else` statement is placed inside the code block of another. This creates a hierarchy of checks, where an inner condition is only evaluated if the outer condition is met first. It allows for more complex and granular logical branching.

## Why it matters
This pattern is fundamental for modeling sequential checks and filtering complex states. In aerospace, a flight control system first checks if a plane is above a certain altitude (`outer if`); only then does it evaluate conditions relevant to high-altitude flight, like switching to a different fuel mixture (`inner if`). In machine learning, decision tree models are literally nested conditionals; each node is a question (`if`), and traversing the tree to a leaf node to make a prediction is executing a series of nested checks.

## When to study it
You must have a solid grasp of the following before proceeding. If not, review them first.
1.  **Variables and Data Types:** `int`, `float`, `bool`, `str`.
2.  **Comparison Operators:** `==`, `!=`, `<`, `>`, `<=`, `>=`.
3.  **Boolean Logic:** The `and`, `or`, and `not` operators.
4.  **Basic Conditionals:** The structure and syntax of a single `if`/`elif`/`else` block.
5.  **Python's Indentation Rules:** Understanding that indentation defines code blocks is non-negotiable.

## How to study it (step by step)
1.  **Review the Flow:** Write a simple `if/else` statement. Draw a flowchart for it. See the single decision point and the two possible paths.
2.  **Manual Nesting:** Inside the `if` block of your simple conditional, indent and write another complete `if/else` statement. Use `print()` statements to trace the flow, e.g., `print("Outer condition met")` and `print("Inner condition met")`.
3.  **Trace with Pen and Paper:** For the code from step 2, choose values for your variables that make the outer condition true and the inner one false. Trace the execution line by line. Repeat for all four possible combinations of outcomes (True/True, True/False, False/True, False/False). Notice that the inner condition is never even checked if the outer one is false.
4.  **Implement a Classifier:** Write a program that classifies an integer. The first level of logic checks if the number is positive, negative, or zero. The *nested* logic, only for the positive and negative cases, should then check if the number is even or odd.
5.  **Logical Flattening:** Take a simple nested `if`: `if x > 0: if y > 0: print("Both positive")`. Rewrite this using a single `if` and the `and` operator. Now, add an `else` to the inner `if`: `if x > 0: if y > 0: ... else: print("x positive, y not")`. Try to flatten this and observe how the logic changes. This will teach you when nesting is required versus when it can be simplified.
6.  **Draw the Tree:** For the leap year problem in the worked example below, draw the decision tree before looking at the code. This reinforces the mental model of branching paths.

## Key ideas, with intuition
1.  **Hierarchy and Dependency:** The inner condition is dependent on the outer one. Think of it as a security checkpoint. You can't get to the gate check (inner condition) until you've passed the main entrance security (outer condition). The outer `if` acts as a gatekeeper for the entire inner block.
2.  **Indentation is Scope:** In Python, the scope of a conditional is defined purely by indentation. This is not merely a style choice; it is the syntax that the interpreter uses to understand the hierarchy. An `if` statement indented four spaces inside another `if` statement *belongs* to it.
    $$
    \begin{align*}
    \texttt{if condition\_A:} \quad &\# \text{Level 0 indentation} \\
    \texttt{    statement\_1} \quad &\# \text{Level 1 indentation, belongs to A} \\
    \texttt{    if condition\_B:} \quad &\# \text{Level 1, also belongs to A} \\
    \texttt{        statement\_2} \quad &\# \text{Level 2, belongs to B}
    \end{align*}
    $$
3.  **Specificity Gradient:** Nesting allows you to move from general to specific checks. The outermost condition is usually the broadest category, and each subsequent nested level refines the condition and handles a more specific case. For example: Is it a mammal? (broad) -> If yes, is it a canine? (specific) -> If yes, is it a wolf? (more specific).

## Worked example
Let's implement the logic for determining if a year is a leap year. The rules are:
1. The year must be evenly divisible by 4.
2. ...except if the year is also evenly divisible by 100.
3. ...unless the year is *also* evenly divisible by 400.

This structure of "a rule, with an exception, which itself has an exception" is a perfect candidate for nesting.

```python
# Goal: Determine if `year` is a leap year.
year = 2000

# Step 1: The main rule. Is the year divisible by 4?
# We use the modulo operator, %, which gives the remainder of a division.
# If year % 4 == 0, the remainder is 0, so it's evenly divisible.
if year % 4 == 0:
    # We are now inside the block for "years divisible by 4".
    # This is our first level of nesting.
    print(f"{year} is divisible by 4. Checking exceptions...")

    # Step 2: The first exception. Is it also divisible by 100?
    if year % 100 == 0:
        # We are now inside the block for "years divisible by 100".
        # This is our second level of nesting.
        print(f"{year} is also divisible by 100. Checking the exception to the exception...")

        # Step 3: The exception to the exception. Is it divisible by 400?
        if year % 400 == 0:
            # If it's divisible by 4, 100, AND 400, it IS a leap year.
            print(f"Result: {year} is a leap year.")
        else:
            # If it's divisible by 4 and 100 but NOT 400, it is NOT a leap year.
            print(f"Result: {year} is not a leap year.")
    else:
        # If it's divisible by 4 but NOT by 100, it IS a leap year.
        # This is the 'else' for the 'if year % 100 == 0' check.
        print(f"Result: {year} is a leap year.")
else:
    # If it fails the very first check, it is NOT a leap year.
    # This is the 'else' for the 'if year % 4 == 0' check.
    print(f"Result: {year} is not a leap year.")

```

**Reflection:**
- **Step 1** acted as a gatekeeper. If `year` was 2001, the code inside this `if` would never run.
- **Step 2** only runs because the condition in Step 1 was true. It refines the logic, handling the special case of century years.
- **Step 3** is the most specific check, only reachable if the first two conditions are met. The `else` clauses at each level correctly handle the cases where a condition is *not* met, immediately providing an answer.

## Diagrams
A flowchart is the canonical way to visualize nested conditional logic. It shows the branching paths created by each decision.

```text
                 START
                   |
                   v
           +------------------+
 No <---- |  Is year % 4 == 0? | ----> Yes
 |        +------------------+         |
 |                                     |
 |                                     v
 |                             +-------------------+
 |                      Yes <--| Is year % 100 == 0? |--> No
 |                      |      +-------------------+    |
 |                      |                               |
 |                      v                               |
 |              +-------------------+                   |
 |       No <---| Is year % 400 == 0? |--> Yes           |
 |       |      +-------------------+    |              |
 |       |                               |              |
 v       v                               v              v
+-----------------+              +-----------------+
| NOT a Leap Year |              |   IS a Leap Year  |
+-----------------+              +-----------------+
        |                                |
        +--------------------------------+
                   |
                   v
                  END
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of **Russian Nesting Dolls (Matryoshka)**. You cannot inspect or open an inner doll without first opening the outer doll that contains it. The outer `if` is the largest doll. The code block inside it, including any nested `if` statements, is the next doll down.
2.  **Must Overlearn:**
    - The syntax: `if outer_condition: ... if inner_condition: ...`
    - The rule: **Indentation dictates nesting.** An indented block is subordinate to the line preceding it that is one level less indented.
3.  **Spaced Repetition Schedule:** Review this concept and your own coded examples at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**
4.  **First Principles Pathway:** If you forget everything, start here: An `if` statement executes a block of code if its condition is true. That block can contain *any* valid Python code. Since another `if` statement is valid Python code, it can be placed inside. Nesting is not a new feature; it is an emergent property of this fundamental rule.

## Common mistakes
1.  **Mismatched Indentation:** Indenting an `else` to the wrong level. An `else` always pairs with the nearest, preceding, unclosed `if` at the same indentation level. A common error is intending an `else` to match the outer `if` when it should match the inner one.
2.  **Over-flattening Logic:** Incorrectly converting a nested structure to a compound one with `and`. The structure `if c1: if c2: A else: B` is **not** the same as `if c1 and c2: A else: B`. The first version executes `B` if `c1` is true and `c2` is false. The second version executes `B` if `c1 and c2` is false (which could be because `c1` is false, or `c2` is false, or both).
3.  **Excessive Nesting:** Creating code that is nested too deeply (`if... if... if... if...`). This is often called the "arrowhead anti-pattern" because the code visually forms an arrow shape. It is extremely difficult to read and debug. Often, this can be refactored using `elif`, helper functions, or by inverting the logic (e.g., checking for failure conditions first).

## Self-check
1.  Write a script that takes an integer `x`. It should print "Positive and Even" if `x` is greater than 0 and divisible by 2. Use a nested conditional.
2.  Create a simple authentication system. Define a `correct_username` and `correct_password`. The program should first check if the provided username is correct. Only if it is correct should it then check the password. Provide three distinct outputs: "Login successful", "Incorrect password", or "Username not found".
3.  A spacecraft's thruster will only fire if three conditions are met in sequence. First, check if `temperature_celsius` is between -100 and 100. If it is, then check if `pressure_kpa` is above 5000. If it is, then check if the command `is_authorized` is `True`. Your program should print "Thruster firing!" only if all three conditions are met. If any check fails, it should print which specific check failed (e.g., "Error: Temperature out of range") and stop.