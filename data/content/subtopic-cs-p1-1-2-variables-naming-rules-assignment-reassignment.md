## What it is
A variable is a name that you, the programmer, assign to a value stored in the computer's memory. Think of it as a label you attach to a piece of data, like `mass = 70` or `acceleration = 9.81`, so you can refer to it by that name later in your program. This act of labeling is called *assignment*.

## Why it matters
Variables are the fundamental way a program remembers information. In a rocket trajectory simulation, variables will store the rocket's current `mass`, `thrust`, `altitude`, and `velocity`, which are constantly updated. In a machine learning model, variables store the weights and biases that the model learns, representing the core of its "knowledge."

## When to study it
You are ready for this topic. The only prerequisite is having a working Python interpreter installed on your machine. You do not need any prior programming knowledge.

## How to study it (step by step)
1.  **Open a Python Interpreter:** Open your terminal or command prompt and type `python` or `python3`. This interactive environment (the "REPL") gives you immediate feedback.
2.  **Perform Your First Assignment:** Type `x = 10` and press Enter. You have just created a variable named `x` and assigned it the integer value `10`. The `=` symbol is the *assignment operator*.
3.  **Retrieve the Value:** Type `x` and press Enter. The interpreter will show you the value stored in `x`, which is `10`. Now type `print(x)` and observe the same result. Understand that using the name retrieves the value it points to.
4.  **Experiment with Naming Rules:** Try to create variables that break the rules. Attempt `1st_place = "gold"`, `my-variable = 5`, and `for = 10`. Observe the `SyntaxError` Python gives you. Internalize the rules by seeing them fail.
5.  **Practice Reassignment:** In the same session, assign a new value to `x`. Type `x = 20.5` and press Enter. Now retrieve the value of `x` again. Notice that the old value (`10`) is gone and `x` now refers to the new value (`20.5`).
6.  **Assign One Variable to Another:** Create a new variable `y = x`. What is the value of `y`? Now, reassign `x` again: `x = 0`. Check the value of `y` one more time. Notice that `y` still holds `20.5`. This is a critical insight into how assignment works: it copies the *value* (or more accurately, the reference), not the dependency.

## Key ideas, with intuition
1.  **Assignment Creates a Pointer, Not a Box:** A common but flawed analogy is that a variable is a "box" you put data in. A more accurate model for Python is that a variable is a *name tag* or a *pointer* that points to an object in memory.
    - When you write `mass = 90`, Python creates an integer object with the value 90 in memory, and makes the name `mass` point to it.

2.  **Reassignment Re-points the Name:** When you reassign a variable, you are not changing the original data object. You are simply taking the name tag and attaching it to a *new* data object.
    - If you then write `mass = 91`, Python creates a *new* integer object with the value 91, and moves the `mass` name tag to point to this new object. The original `90` object is now unlabeled and will be cleaned up by Python's garbage collector.

3.  **Names Have Strict Rules:** Variable names exist for human readability and compiler/interpreter correctness. To avoid ambiguity, they must follow rules. In Python:
    - Must start with a letter (a-z, A-Z) or an underscore (`_`).
    - The rest of the name can contain letters, numbers (0-9), and underscores.
    - Names are case-sensitive: `Mass` and `mass` are two different variables.
    - Cannot be a reserved keyword (like `if`, `for`, `while`). These words have special meaning to Python.

## Worked example
Let's trace the state of two variables, `altitude` and `rate_of_climb`, through a short sequence of operations.

**Code:**
```python
# 1. Initial assignment
altitude = 5000
rate_of_climb = 15

# 2. Print current state
print("Initial altitude (m):", altitude)

# 3. Update altitude based on rate of climb
altitude = altitude + rate_of_climb

# 4. Print new state
print("New altitude (m):", altitude)
```

**Step-by-step execution trace:**
1.  **`altitude = 5000`**: Python creates an integer object `5000` in memory. The name `altitude` is created and set to point to this object.
2.  **`rate_of_climb = 15`**: Python creates an integer object `15` in memory. The name `rate_of_climb` is created and set to point to it.
3.  **`print(...)`**: The program looks up the object `altitude` points to (`5000`) and displays it.
4.  **`altitude = altitude + rate_of_climb`**: This is the key step.
    - First, the right-hand side is evaluated: `altitude + rate_of_climb`.
    - Python retrieves the value `altitude` points to (`5000`).
    - Python retrieves the value `rate_of_climb` points to (`15`).
    - It computes their sum: `5000 + 15 = 5015`.
    - Python creates a *new* integer object in memory with the value `5015`.
    - Finally, the assignment operator `=` takes the name `altitude` and makes it point to this new `5015` object. The old `5000` object is no longer pointed to by `altitude`.
5.  **`print(...)`**: The program looks up the object `altitude` *now* points to (`5015`) and displays it.

**Reflection:** The core operation is that assignment (`=`) happens *last*. The entire right-hand side is fully calculated first, producing a final value. Only then does the variable on the left-hand side get pointed to that result.

## Diagrams
Here is how memory looks during the worked example. The "Names" are what you type; the "Memory" contains the actual data objects.

**After lines 1 & 2:**
```text
      Names                  Memory
+-----------------+      +----------------+
| altitude        |----->| Integer: 5000  |
| rate_of_climb   |----->| Integer: 15    |
+-----------------+      +----------------+
```

**After line 3 (`altitude = altitude + rate_of_climb`):**
```text
      Names                  Memory
+-----------------+      +----------------+
| altitude        |--+   | Integer: 5000  |  <-- Now orphaned
| rate_of_climb   |--|-->| Integer: 15    |
+-----------------+  |   +----------------+
                     |   | Integer: 5015  |  <-- Newly created
                     +-->+----------------+
```
The arrow from `altitude` has been redirected to the new object `5015`.

## Memory technique — remember this forever
1.  **The "Sticky Note" Mnemonic:** Think of variables as sticky notes (the names) and data as heavy, unmovable objects (the values in memory).
    - **Assignment `mass = 90`**: You write `mass` on a sticky note and place it on the `90` object.
    - **Reassignment `mass = 91`**: You peel the `mass` sticky note off the `90` object and place it on a new `91` object. You never change the objects themselves.

2.  **Facts to Overlearn:**
    - Assignment operator: `=`
    - Naming rules: Start with letter or underscore; then letters, numbers, underscores. Case-sensitive. Not a keyword.
    - Reassignment logic: `x = x + 1` means "compute the value of `x + 1` first, then make the name `x` point to that new result."

3.  **Spaced Repetition Schedule:**
    - **1 day:** Redo the "How to study it" steps in a fresh Python interpreter.
    - **3 days:** Write a small program that swaps the values of two variables, `a` and `b`.
    - **7 days:** Explain the "Sticky Note" mnemonic to a friend or write it out. Draw the diagram.
    - **16 days:** Find the list of Python keywords. Write a program that fails by trying to use three of them as variable names.
    - **35 days:** Re-read this lesson. Can you predict the output of every code snippet without running it?

4.  **First Principles Pathway:** If you forget, remember that a computer program is a sequence of instructions for manipulating data in memory. To manipulate data, you must first be able to refer to it. A variable is the most basic form of reference: a human-readable name for a memory location containing a value. The rules exist to make this reference unambiguous for the computer.

## Common mistakes
1.  **Confusing Assignment `=` with Equality `==`:** `x = 5` means "make `x` point to 5". `x == 5` asks the question, "Does `x` currently point to 5?" and evaluates to `True` or `False`. You cannot use them interchangeably.
2.  **Using a Variable Before Assigning It:** If you try to use a variable that hasn't been created yet (e.g., `print(initial_velocity)` without a preceding `initial_velocity = ...`), Python will stop with a `NameError`. A name must exist before you can retrieve its value.
3.  **Illegal Names:** Trying to name a variable `2nd_stage_separation` or `max-thrust` will result in a `SyntaxError`. The hyphen `-` is interpreted as subtraction, and names cannot start with a number. Use `second_stage_separation` or `max_thrust` instead.

## Self-check
1.  Which of the following are valid Python variable names?
    - `_thrust`
    - `G`
    - `delta-v`
    - `9lives`
    - `payloadMass`
    - `while`

2.  After the following code is executed, what are the final values of `a` and `b`?
    ```python
    a = 10
    b = 20
    a = b
    b = 5
    ```

3.  A rocket's position is stored in a variable `x`. Write the single line of code that updates the rocket's position based on its current velocity `v` and a small time step `dt`, according to the physics formula $x_{new} = x_{old} + v \cdot dt$.