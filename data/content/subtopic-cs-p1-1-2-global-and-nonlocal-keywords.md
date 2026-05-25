## What it is
The `global` and `nonlocal` keywords are declarations in Python that change how variables are assigned within functions. By default, assigning a value to a variable inside a function creates a *local* variable; `global` forces assignments to target a variable in the main module scope, while `nonlocal` forces assignments to target a variable in the nearest enclosing function's scope.

## Why it matters
These keywords control state modification across different scopes, which is fundamental to more advanced patterns. In physics simulations, you might use a `nonlocal` variable in a numerical integrator's helper function to update a state variable like total energy or time step without passing it as an argument repeatedly. In machine learning, they are used implicitly in closures and decorators, which are common for creating stateful functions like learning rate schedulers or model wrappers.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Functions:** Defining functions (`def`), passing arguments, and using `return`.
2.  **Variable Scope:** The concept of local vs. global scope. You must understand why a variable defined inside a function is not accessible outside it.
3.  **Assignment vs. Read:** The difference between reading a variable's value (`print(x)`) and assigning to it (`x = 10`).

If you are not confident with these, pause and review them. The behavior of `global` and `nonlocal` is nonsensical without a solid understanding of Python's default scope rules.

## How to study it (step by step)
1.  **Observe the default behavior.** Write a script with a global variable `x`. Write a function that tries to increment `x`. Run it and see the `UnboundLocalError`. Ask yourself: why did Python assume `x` was local even though a global `x` exists? (Answer: because of the assignment `x = x + 1`).
2.  **Fix with `global`.** Add the line `global x` at the start of your function from step 1. Run it again. Observe that it now works as expected. This demonstrates that `global` is an explicit instruction to the interpreter.
3.  **Create a nested function.** Write a function `outer()` that defines a variable `y`. Inside `outer()`, define another function `inner()` that tries to increment `y`. Call `outer()`, which in turn calls `inner()`. You will see the same `UnboundLocalError` for `y`.
4.  **Fix with `nonlocal`.** Add `nonlocal y` at the start of the `inner()` function. Run it again. Observe that it now correctly modifies the `y` from the `outer` function's scope.
5.  **Contrast them.** Create a script with a global `z`, an `outer` function with its own `z`, and an `inner` function. Inside `inner`, use `global z` and modify it. Then, comment that out and use `nonlocal z` and modify it. Predict the output in both cases, then run the code to verify. This will solidify the distinction between the two keywords.

## Key ideas, with intuition
1.  **The LEGB Rule for Reading:** When you *read* a variable, Python searches for it in a specific order: **L**ocal, **E**nclosing, **G**lobal, **B**uilt-in. It takes the first one it finds. This is why a function can read a global variable without any special keyword.
2.  **Assignment Creates Local Scope by Default:** This is the most crucial concept. If a function contains an assignment statement for a variable (e.g., `x = 5`), Python assumes `x` is a *local* variable for the *entire* function. It doesn't matter where the assignment is; its mere presence flags the variable as local. This is what causes the `UnboundLocalError` if you try to read the variable before the assignment.
3.  **`global` and `nonlocal` are Declarations:** These keywords are messages to the Python interpreter. They say, "For the variable named here, suspend the default rule. When you see an assignment, do not create a local variable. Instead, find the variable in the specified scope and modify it there."
    -   `global x`: "Assignments to `x` in this function will modify the single `x` at the module level."
    -   `nonlocal x`: "Assignments to `x` in this function will modify the `x` found in the nearest enclosing function's scope. Do not skip over it to the global scope."

## Worked example
Let's build a simple counter factory. The factory function will create and return a *new* counter function. Each counter will have its own independent count.

```python
def create_counter():
    """A factory for creating counter functions."""
    count = 0  # This is in the enclosing scope of increment()

    def increment():
        """Increments the counter from the enclosing scope."""
        nonlocal count # Tell Python we are NOT creating a new local 'count'
        count += 1
        return count

    return increment

# --- Usage ---
counter1 = create_counter()
counter2 = create_counter()

# Call counter1 three times
print(f"Counter 1, call 1: {counter1()}") # Output: 1
print(f"Counter 1, call 2: {counter1()}") # Output: 2
print(f"Counter 1, call 3: {counter1()}") # Output: 3

# Call counter2 once to show it's independent
print(f"Counter 2, call 1: {counter2()}") # Output: 1
```

### Reflection
1.  When `create_counter()` is called, it creates a local variable `count` and a function `increment`.
2.  The `nonlocal count` line in `increment` is critical. It tells `increment` that when it sees `count += 1`, it should not create its own local `count`. Instead, it must reach into the scope of `create_counter` and modify the `count` variable that lives there.
3.  `create_counter` then *returns* the `increment` function itself. The returned function "remembers" its enclosing scope, including the `count` variable. This is a concept called a *closure*.
4.  Each call to `create_counter` creates a *new* scope with a *new* `count` variable. That's why `counter1` and `counter2` are independent; they are closures over different instances of the `count` variable.

## Diagrams
Here is a diagram representing the nested scopes (LEGB rule) and how `global` and `nonlocal` operate.

```text
+-------------------------------------------------+
| Global (Module) Scope                           |
|  x = 100                                        |
|                                                 |
|  +-------------------------------------------+  |
|  | Enclosing Scope (e.g., outer_function)    |  |
|  |   y = 50                                  |  |
|  |                                           |  |
|  |   +------------------------------------+  |  |
|  |   | Local Scope (e.g., inner_function) |  |  |
|  |   |                                    |  |  |
|  |   |   z = 1                            |  |  |
|  |   |                                    |  |  |
|  |   |   nonlocal y  --------------------->|  |  |  Finds 'y' here
|  |   |   global x  ------------------------+--+---> Finds 'x' here
|  |   +------------------------------------+  |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine scopes are nested rooms in a building.
    -   Your **Local** room is where you are now.
    -   The **Enclosing** room is the office suite your room is in.
    -   The **Global** lobby is the ground floor of the entire building.
    -   By default, if you create something (`x = 5`), it stays in your local room.
    -   `nonlocal` is like a pneumatic tube to your suite's mailroom (`Enclosing` scope). It sends the variable out one level.
    -   `global` is like a chute straight to the main lobby (`Global` scope), bypassing any intermediate floors.

2.  **Must-Know Facts:** Overlearn these three rules. Do not paraphrase.
    -   An assignment inside a function makes a variable local to that function.
    -   `global x` declares that assignments to `x` refer to the module-level `x`.
    -   `nonlocal x` declares that assignments to `x` refer to the `x` in the nearest enclosing function's scope.

3.  **Spaced Repetition Schedule:** Review this material and try to re-derive the worked example from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, rebuild from this logic:
    -   What does Python do when it sees a name? It searches L-E-G-B.
    -   What does Python do when it sees an *assignment*? It assumes the name is Local.
    -   This default assumption is the "problem." How do we override it? With an explicit declaration.
    -   Which declaration targets the module? `global`.
    -   Which declaration targets the "in-between" scope? `nonlocal`.

## Common mistakes
1.  **Using `global` when `nonlocal` is needed.** In nested functions, `global` will skip the enclosing scope entirely and modify the top-level variable, which is often a bug.
2.  **Using `nonlocal` in a non-nested function.** `nonlocal` is only for use in a nested function. Using it at the top level of a function will raise a `SyntaxError` because there is no enclosing scope to refer to.
3.  **Confusing read access with write access.** You can *read* a global or nonlocal variable without any keyword. The keywords are only necessary when you need to *assign* to the variable.
4.  **Overuse.** Often, it's cleaner to pass variables as arguments and return results. `global` and `nonlocal` can make code harder to follow because the "owner" of the data is less obvious. Use them when you are intentionally managing state across scopes, as in a closure or decorator.

## Self-check
1.  What will be printed by the following code?
    ```python
    x = 10
    def func():
        global x
        x = 20
    func()
    print(x)
    ```
2.  What will be printed by the following code?
    ```python
    def outer():
        x = "local"
        def inner():
            nonlocal x
            x = "nonlocal"
        def inner2():
            x = "local again" # No nonlocal keyword
        inner()
        print(x)
        inner2()
        print(x)
    outer()
    ```
3.  Write a function `make_multiplier(n)` that takes a number `n`. It should return another function, `multiplier`, which takes a number `x` and returns `n * x`. The value of `n` must be "remembered" by the `multiplier` function using a closure and the `nonlocal` (or implicit read) mechanism.