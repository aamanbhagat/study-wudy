## What it is
Variable scope determines the accessibility of a variable within a program. Python resolves variable names using the LEGB rule, a search path that proceeds in order from **L**ocal, to **E**nclosing, to **G**lobal, to **B**uilt-in. The first place the variable is found is the one that is used.

## Why it matters
In complex physics simulations or machine learning models, you will write many functions, some nested inside others. Proper scope management prevents "action at a distance," where a function accidentally modifies a variable in another part of the program, leading to corrupted simulation states or untraceable bugs in model training. Understanding scope is fundamental to writing modular, predictable, and maintainable code.

## When to study it
Before tackling scope, you must have a firm grasp of these prerequisites:
1.  **Variable Assignment:** How to create a variable, e.g., `x = 10`.
2.  **Function Definition:** How to define a function using `def my_function():`.
3.  **Function Arguments:** How to pass data into a function, e.g., `def f(x):`.
4.  **Function Calls:** How to execute a function, e.g., `my_function()`.

If these concepts are not solid, master them first. Scope builds directly upon them.

## How to study it (step by step)
1.  **Isolate Global (G) and Local (L):** Write a script with a global variable `g_var = "global"`. Define a function that creates its own local variable `l_var = "local"` and prints both. Outside the function, print `g_var` and attempt to print `l_var`. Observe the `NameError` for `l_var` and internalize that local variables die with the function call.
2.  **Induce a Collision:** Use the same name for a global and a local variable (e.g., `x = 10` globally, and `x = 5` inside a function). Call the function and print `x` before, during, and after the call. See that the function's assignment creates a *new* local `x` and does not touch the global `x`. This is called "shadowing."
3.  **Explore Enclosing (E):** Write a nested function—a function defined inside another function. Define a variable `e_var` in the outer ("enclosing") function. From the inner function, print `e_var`. See that it's accessible. This demonstrates the `E` in LEGB.
4.  **Break a Built-in (B):** In a new script, try `print(sum([1, 2, 3]))`. It works. Now, on the line before it, assign `sum = 10`. Run it again. Observe the `TypeError: 'int' object is not callable`. You have shadowed the built-in `sum` function, demonstrating that Python checks for local/global names before checking built-ins.
5.  **Learn to Modify Scope:** Use the `global` keyword inside a function to modify a global variable. Then, in your nested function from step 3, use the `nonlocal` keyword to modify the enclosing function's variable. Contrast their behavior.

## Key ideas, with intuition
1.  **Scope is a Namespace:** A scope is like a dictionary or a lookup table that maps names to objects (values, functions, etc.). Python maintains a separate namespace for each level: one for the local function, one for its enclosing function, one for the whole module (global), and one for all the built-in functions (`print`, `len`, `sum`, etc.).
2.  **LEGB is a Search Path:** When you use a variable name, like `x`, Python is a detective. It first checks the local (L) namespace. If `x` isn't there, it checks the namespace of any enclosing function (E). If it's still not found, it checks the global (G) namespace. Failing that, it checks the built-in (B) namespace. If it's not found anywhere, you get a `NameError`.
3.  **Assignment Creates, Reading Searches:** This is the most critical distinction.
    *   An assignment statement like `x = 100` *creates or overwrites a variable in the current scope* by default.
    *   A statement that only *reads* a variable, like `y = x + 1`, triggers the LEGB search to find the value of `x`.
    *   This is why `x += 1` can be tricky. It's both a read and an assignment. If `x` isn't local, Python tries to read from an outer scope, but the assignment part makes Python treat `x` as local, causing an `UnboundLocalError` unless you use `global` or `nonlocal`.

## Worked example
Consider this code. We will trace the execution of `inner_func()`.

```python
# Global Scope (G)
GRAVITY = 9.81

def outer_func():
    # Enclosing Scope (E) for inner_func
    mass = 70.0 # kg

    def inner_func():
        # Local Scope (L)
        height = 10.0 # meters
        
        # Calculate potential energy: U = m * g * h
        # Python needs to find 'mass', 'GRAVITY', and 'height'
        potential_energy = mass * GRAVITY * height
        print(f"Potential Energy: {potential_energy} Joules")

    inner_func()

# Call the outer function to start the process
outer_func()
```

**Step-by-step trace of `potential_energy = mass * GRAVITY * height`:**

1.  **Resolve `mass`:** Python starts the LEGB search for `mass`.
    *   **L (Local):** Is `mass` defined inside `inner_func`? No.
    *   **E (Enclosing):** Is `mass` defined inside `outer_func`? Yes. `mass = 70.0`. The search stops. Python uses this value.
2.  **Resolve `GRAVITY`:** Python starts the LEGB search for `GRAVITY`.
    *   **L (Local):** Is `GRAVITY` in `inner_func`? No.
    *   **E (Enclosing):** Is `GRAVITY` in `outer_func`? No.
    *   **G (Global):** Is `GRAVITY` in the global (module) scope? Yes. `GRAVITY = 9.81`. The search stops. Python uses this value.
3.  **Resolve `height`:** Python starts the LEGB search for `height`.
    *   **L (Local):** Is `height` in `inner_func`? Yes. `height = 10.0`. The search stops immediately. Python uses this value.

**Reflection:** The LEGB rule allows the innermost function (`inner_func`) to cleanly access variables from its parent scopes without needing them to be passed as arguments. This creates a clear hierarchy for constants (`GRAVITY`), parameters (`mass`), and local calculations (`height`).

## Diagrams
This diagram shows the nested structure of scopes and the search path Python follows.

```text
+---------------------------------------------------+
| Built-in Scope (B)                                |
|  - print(), len(), sum(), ...                     |
|                                                   |
|  +-----------------------------------------------+
|  | Global Scope (G)                              |
|  |  - GRAVITY                                    |
|  |                                                |
|  |  +-------------------------------------------+
|  |  | Enclosing Scope (E) - outer_func          |
|  |  |  - mass                                   |
|  |  |                                           |
|  |  |  +--------------------------------------+
|  |  |  | Local Scope (L) - inner_func         |
|  |  |  |  - height                           |
|  |  |  |                                     |
|  |  |  |      <-- Python starts search here  |
|  |  |  +--------------------------------------+
|  |  |             ^                           |
|  |  +-------------|---------------------------+
|  |                ^                           |
|  +----------------|---------------------------+
|                   ^                            |
+-------------------|----------------------------+
                    |
              LEGB Search Path (inside -> out)
```

## Memory technique — remember this forever
1.  **Mnemonic:** **LEGB**. Think of the chain of command on a rocket launch. **L**ocal Control -> **E**ngine Systems -> **G**round Control -> **B**asic Physics. You check the most immediate, specialized system first before escalating outwards.
2.  **Must Overlearn:**
    *   The search order: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in.
    *   **Assignment creates local variables.** `x = 1` inside a function makes `x` local.
    *   To modify an outer variable, you must declare your intent: `global x` or `nonlocal x`.
3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: 1 day, 3 days, 7 days, 16 days, 35 days.
    *   Each time, rewrite the worked example from memory and trace the LEGB path for each variable.
4.  **First Principles Pathway:** If you ever forget, you can rediscover the rule experimentally. Write a nested function structure. Place a `print(x)` in the innermost scope. Then, define `x` in only one scope at a time (L, then E, then G) and run the code. The output will prove which scope is found first.

## Common mistakes
1.  **`UnboundLocalError`:** Writing `x = x + 1` inside a function when `x` is a global variable. Python sees the assignment (`=`) and declares `x` to be local to the function. But when it tries to evaluate the right-hand side (`x + 1`), it can't find a local `x` that has been initialized yet. The fix is to add `global x` at the top of the function.
2.  **Accidental Shadowing:** Naming a variable the same as a built-in function, like `list = [1, 2, 3]` or `sum = my_sum`. Later, when you try to call `list()` or `sum()`, you get an error because your variable is found first in the G or L scope, hiding the B scope version.
3.  **Confusing `global` and `nonlocal`:** Using `global` to try to modify a variable in an enclosing (but not global) scope. `global` *always* refers to the module-level scope. `nonlocal` is specifically for nested functions to modify a variable in the parent function's scope.

## Self-check
1.  What will the following code print?
    ```python
    a = 10
    def my_func():
        a = 5
        print(a)
    my_func()
    print(a)
    ```
2.  Predict the output of this code. Explain the LEGB search for `x` at the line marked `# HERE`.
    ```python
    x = "global"
    def outer():
        x = "enclosing"
        def inner():
            # x is not defined locally
            print(x) # HERE
        inner()
    outer()
    ```
3.  Modify the code below so that each call to `counter()` prints the next integer, starting with 1. You are only allowed to add one line inside the `increment` function.
    ```python
    def make_counter():
        count = 0
        def increment():
            # Add one line here
            count += 1
            return count
        return increment

    counter = make_counter()
    print(counter()) # Should print 1
    print(counter()) # Should print 2
    ```