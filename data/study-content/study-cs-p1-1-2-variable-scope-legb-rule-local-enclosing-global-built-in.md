## 1. What it is — in plain English

Imagine you have a set of toys. Some toys are in your own bedroom, only you can see and play with them. These are like "local" variables. They belong to a specific, small area.

Then, some toys are in the living room, which everyone in your house can see and play with. These are like "global" variables. They belong to the whole house.

Now, imagine your older sibling has a special playroom, and you can peek into it and see their toys, but you can't reach them directly unless they let you. This is similar to an "enclosing" scope. It's a space that contains your current space, and you can see out into it.

Finally, there are things that are just part of the house itself, like the walls, the roof, or the electricity. Everyone knows what these are, and they're always there. These are like "built-in" variables or functions in Python. They are always available, no matter where you are in the house.

Variable scope, specifically the LEGB rule in Python, is simply the set of rules that determines *where* Python looks for a variable when you try to use it, and *where* a variable is created when you assign a value to it. It dictates the "visibility" and "lifetime" of variables within your code.

## 2. Why it matters — real-world applications

Understanding variable scope is fundamental for writing robust, maintainable, and efficient code in any complex system.

1.  **Large-Scale Software Development (e.g., Operating Systems, Web Servers):** In projects involving millions of lines of code and hundreds of developers (like the Linux kernel, or a Google search backend), scope prevents "name collisions." Imagine if every function could accidentally modify a variable named `count` that another, unrelated part of the system was using. Scope rules ensure that a `count` variable inside one function doesn't interfere with a `count` variable in another, or a global `count` variable, unless explicitly intended. This isolation is crucial for stability and preventing obscure bugs.

2.  **Machine Learning Model Training (e.g., Training a neural network with TensorFlow/PyTorch):** When training a complex neural network, you might have global hyperparameters (like the learning rate for the entire model). Inside a function that defines a specific layer, you might have local variables for the weights and biases of *that particular layer*. An "enclosing" scope might manage parameters for a group of layers. Scope ensures that the weights of one layer are not accidentally modified by an operation on another layer, or that a temporary variable used in a gradient calculation doesn't overwrite a critical global hyperparameter.

3.  **Game Development (e.g., Player state in an RPG):** In a game like "The Witcher 3," you have global game state variables (e.g., `current_player_level`, `world_time_of_day`). When a player enters a specific combat sequence, a function might calculate damage. Inside this `calculate_damage` function, you'd have local variables like `attacker_strength`, `defender_armor`, `damage_multiplier`. These are temporary and only relevant to that specific calculation. Scope ensures these local variables don't accidentally overwrite the global `player_level` or `world_time_of_day`, and are cleaned up after the function finishes, conserving memory.

4.  **Aerospace and Embedded Systems (e.g., Flight Control Software):** In mission-critical software for aircraft or spacecraft, reliability is paramount. Scope rules help enforce modularity and prevent unintended side effects. For instance, a function responsible for adjusting rudder position might have local variables for sensor readings and control inputs. These variables should not be accessible or modifiable by a completely separate function controlling engine thrust. Strict scope management reduces the risk of one subsystem's logic inadvertently corrupting data vital for another, which could have catastrophic consequences.

## 3. Prerequisites — what you must know first

Before diving deep into variable scope, ensure you have a solid grasp of these foundational Python concepts:

*   **Variables:** How to name and store data in memory (e.g., `x = 10`, `name = "Alice"`).
*   **Functions:** How to define reusable blocks of code and call them (e.g., `def greet(name): print(f"Hello, {name}")`).
*   **Parameters and Arguments:** How to pass data into functions (parameters are the names in the definition, arguments are the values passed during the call).
*   **Return Values:** How functions can send data back to the caller using the `return` statement.
*   **Basic Control Flow:** Understanding the sequential execution of code, and how `if/else` statements and `for`/`while` loops direct the flow.
*   **Modules and Imports:** How Python code can be organized into separate files (modules) and how to bring functionality from one module into another using `import`.

## 4. The core idea — step by step

The core idea of variable scope in Python is encapsulated by the **LEGB rule**, which stands for **L**ocal, **E**nclosing, **G**lobal, **B**uilt-in. This rule dictates the order in which Python searches for a variable when it's referenced, and also how it determines where a new variable is created when assigned.

### Step 1: The "Search Rule" (LEGB)

*   **Plain English Statement:** When you use a variable name in your Python code, Python doesn't just pick one at random. It follows a very specific "search party" order to find where that variable is defined. It always starts closest to where you are and works its way outwards.
*   **Small Concrete Example:**
    ```python
    # Built-in scope (e.g., print)
    # Global scope
    global_var = "I am global"

    def outer_function():
        # Enclosing scope
        enclosing_var = "I am enclosing"

        def inner_function():
            # Local scope
            local_var = "I am local"
            print(local_var)      # Python finds 'local_var' in Local scope
            print(enclosing_var)  # Python finds 'enclosing_var' in Enclosing scope
            print(global_var)     # Python finds 'global_var' in Global scope
            print(len("hello"))   # Python finds 'len' in Built-in scope
        inner_function()

    outer_function()
    ```
*   **Formal/Mathematical Version:**
    When Python encounters a name $N$, it attempts to resolve it by searching through namespaces in the following order:
    1.  $\mathcal{L}$ (Local scope)
    2.  $\mathcal{E}$ (Enclosing function locals)
    3.  $\mathcal{G}$ (Global/Module scope)
    4.  $\mathcal{B}$ (Built-in scope)

    If $N$ is found in any of these scopes, the search stops, and that binding is used. This can be represented as:
    $$ \text{Resolve}(N) = \begin{cases} N \in \mathcal{L} & \text{if found in local scope} \\ N \in \mathcal{E} & \text{else if found in enclosing scope} \\ N \in \mathcal{G} & \text{else if found in global scope} \\ N \in \mathcal{B} & \text{else if found in built-in scope} \\ \text{NameError} & \text{otherwise} \end{cases} $$
*   **What Could Go Wrong:** If Python cannot find the variable in any of these four scopes, it will raise a `NameError`. For example, trying to print `non_existent_var` would cause this error.

### Step 2: Local Scope (L)

*   **Plain English Statement:** This is the innermost, most immediate scope. Variables defined *inside* a function (including its parameters) live here. They are only visible and accessible from within that specific function. Once the function finishes executing, these local variables are typically destroyed.
*   **Small Concrete Example:**
    ```python
    def my_function():
        local_message = "Hello from local scope!" # 'local_message' is local
        print(local_message)

    my_function()
    # print(local_message) # This would cause a NameError
    ```
    *Explanation:* `local_message` is defined within `my_function`. It's accessible inside, but not outside.
*   **Formal/Mathematical Version:**
    A name $N$ is considered local if it is assigned within the current function body, or if it is a parameter to the function. The set of local names for a function $f$ is denoted $\mathcal{L}_f$.
    $$ \mathcal{L}_f = \{ N \mid N \text{ is assigned in } f \text{ or } N \text{ is a parameter of } f \} $$
*   **What Could Go Wrong:** Attempting to access a local variable from outside the function where it was defined will result in a `NameError`.

### Step 3: Enclosing Scope (E)

*   **Plain English Statement:** This scope applies when you have functions defined *inside* other functions (nested functions). The inner function can "see" variables defined in its immediate outer (enclosing) function. It's like looking out your bedroom window into your sibling's playroom.
*   **Small Concrete Example:**
    ```python
    def outer_function():
        enclosing_message = "Hello from enclosing scope!" # 'enclosing_message' is in enclosing scope for inner_function

        def inner_function():
            print(enclosing_message) # inner_function can access enclosing_message
        inner_function()

    outer_function()
    ```
    *Explanation:* `inner_function` can access `enclosing_message` because `outer_function` is its enclosing scope.
*   **Formal/Mathematical Version:**
    For a nested function $f_{inner}$ defined within an outer function $f_{outer}$, the enclosing scope $\mathcal{E}_{f_{inner}}$ consists of the local names of $f_{outer}$, i.e., $\mathcal{E}_{f_{inner}} = \mathcal{L}_{f_{outer}}$. This mechanism is crucial for creating "closures."
*   **What Could Go Wrong:** If you try to *assign* to an `enclosing_message` from `inner_function` without using the `nonlocal` keyword, Python will assume you want to create a *new local* variable inside `inner_function` with the same name, rather than modifying the one in the enclosing scope. This can lead to unexpected behavior.

### Step 4: Global Scope (G)

*   **Plain English Statement:** This is the top-level scope of a Python script or module. Variables defined directly in the main body of a `.py` file (outside any function) are global. They are visible and accessible from anywhere within that module. It's like the living room where everyone in the house can see the toys.
*   **Small Concrete Example:**
    ```python
    global_count = 0 # 'global_count' is in global scope

    def increment():
        # global_count += 1 # This would cause UnboundLocalError without 'global' keyword
        print(f"Inside function, global_count is {global_count}")

    increment()
    print(f"Outside function, global_count is {global_count}")
    ```
    *Explanation:* `global_count` is defined at the module level. Functions can *read* it directly.
*   **Formal/Mathematical Version:**
    The global scope $\mathcal{G}$ consists of all names defined at the module level (i.e., not inside any function or class definition). When a module is imported, its global scope becomes the local scope of the `import` statement for the imported names.
*   **What Could Go Wrong:** While functions can *read* global variables, if you try to *assign* a new value to a global variable from inside a function, Python will, by default, create a *new local variable* with the same name, rather than modifying the global one. This is a common source of bugs and requires the `global` keyword (see Step 7).

### Step 5: Built-in Scope (B)

*   **Plain English Statement:** This is the widest, outermost scope. It contains all the names that Python automatically provides to you, such as common functions (`print()`, `len()`, `range()`), types (`int`, `str`, `list`), and constants (`True`, `False`, `None`). These are always available, like the fundamental structure of the house itself.
*   **Small Concrete Example:**
    ```python
    print("Hello") # 'print' is a built-in function
    length = len("Python") # 'len' is a built-in function
    is_true = True # 'True' is a built-in constant
    ```
    *Explanation:* `print`, `len`, and `True` are always available without any explicit definition.
*   **Formal/Mathematical Version:**
    The built-in scope $\mathcal{B}$ contains all names defined in the `builtins` module. This scope is automatically loaded by the Python interpreter at startup and is always available.
*   **What Could Go Wrong:** It's possible to "shadow" a built-in name by defining your own variable or function with the same name (e.g., `len = 5`). While Python allows this, it's almost always a bad idea because it makes your code confusing and prevents you from using the original built-in functionality.

### Step 6: Assignment vs. Access (The "Local by Default" Rule)

*   **Plain English Statement:** This is a crucial distinction! When you *read* a variable, Python uses the LEGB rule to find it. But when you *assign* a value to a variable (e.g., `x = 10`), Python assumes you want to create a *new local variable* in the current scope, unless you explicitly tell it otherwise. It doesn't automatically modify a variable in an outer scope.
*   **Small Concrete Example:**
    ```python
    x = 10 # Global x

    def modify_x():
        x = 20 # This creates a NEW LOCAL x, it does NOT modify the global x
        print(f"Inside function, x is {x}") # Prints 20

    modify_x()
    print(f"Outside function, x is {x}") # Prints 10 (global x is unchanged)
    ```
    *Explanation:* The `x = 20` inside `modify_x` creates a new local `x`, hiding the global `x` from within the function.
*   **Formal/Mathematical Version:**
    If a name $N$ is assigned within a scope, it becomes a local name for that scope, i.e., $N \in \mathcal{L}_{\text{current}}$. This rule applies even if a name $N$ already exists in an enclosing or global scope. The assignment creates a new binding in the current local namespace, effectively "shadowing" any outer names with the same identifier.
*   **What Could Go Wrong:** This is the source of the infamous `UnboundLocalError`. If you try to *read* a variable in a function, and then *assign* to it later in the *same function*, Python assumes the variable is local. If the read happens before the assignment, Python thinks you're trying to use a local variable that hasn't been created yet.
    ```python
    y = 10 # Global y

    def troublesome_function():
        print(y) # Python tries to find 'y' in local scope first.
                 # Since an assignment 'y = 20' appears later in THIS function,
                 # Python treats 'y' as local. But it hasn't been assigned yet.
        y = 20   # This assignment makes 'y' local to troublesome_function

    # troublesome_function() # This would raise UnboundLocalError
    ```

### Step 7: `global` and `nonlocal` keywords

*   **Plain English Statement:** These are special keywords you use to explicitly tell Python: "Hey, I know I'm inside a function, but I want to modify a variable that lives in an *outer* scope, not create a new local one." `global` is for modifying a variable in the module's global scope. `nonlocal` is for modifying a variable in an *enclosing function's* scope (but not the global scope).
*   **Small Concrete Example:**
    ```python
    global_counter = 0

    def increment_global():
        global global_counter # Explicitly state we want to modify the global variable
        global_counter += 1
        print(f"Inside function, global_counter is {global_counter}")

    increment_global() # Prints: Inside function, global_counter is 1
    print(f"Outside function, global_counter is {global_counter}") # Prints: Outside function, global_counter is 1

    def outer_with_nonlocal():
        enclosing_value = "Outer value"

        def inner_with_nonlocal():
            nonlocal enclosing_value # Explicitly state we want to modify the enclosing variable
            enclosing_value = "Modified by inner"
            print(f"Inside inner, enclosing_value is: {enclosing_value}")

        inner_with_nonlocal()
        print(f"Inside outer, enclosing_value is: {enclosing_value}")

    outer_with_nonlocal()
    # Output:
    # Inside inner, enclosing_value is: Modified by inner
    # Inside outer, enclosing_value is: Modified by inner
    ```
*   **Formal/Mathematical Version:**
    The `global` statement declares that a name $N$ refers to a variable in the global (module) scope, even if an assignment for $N$ occurs within the current function.
    $$ \forall N \in \text{names declared `global`}: N \in \mathcal{G} $$
    The `nonlocal` statement declares that a name $N$ refers to a variable in the nearest enclosing function scope (excluding the global scope), even if an assignment for $N$ occurs within the current function.
    $$ \forall N \in \text{names declared `nonlocal`}: N \in \mathcal{E}_{\text{nearest}} $$
*   **What Could Go Wrong:** Overusing `global` can make code hard to understand and debug, as functions can have "side effects" that are not immediately obvious. It breaks encapsulation. Forgetting `nonlocal` in nested functions will lead to unintended local variable creation instead of modifying the enclosing one. You cannot use `nonlocal` to modify a global variable, nor `global` to modify an enclosing function's variable.

## 5. Worked examples — multiple, with every step shown

### Example 1: Local vs. Global Access

**Problem:** Predict the output of the following Python code, explaining why each `print` statement produces its result based on the LEGB rule.

```python
planet = "Earth" # Global variable

def explore_planet():
    planet = "Mars" # Local variable
    print(f"Inside function: Exploring {planet}")

print(f"Before function call: {planet}")
explore_planet()
print(f"After function call: {planet}")
```

**Given:** A global variable `planet` and a function `explore_planet` that defines its own local `planet`.
**Want:** The exact output of the program and the reasoning.

**Solution Steps:**

1.  `planet = "Earth"`
    *   **Explanation:** This line executes first. `planet` is assigned the string "Earth". Since this assignment happens at the top level of the script, `planet` is created in the **Global scope**.
    *   Current Global Scope: `{'planet': 'Earth'}`

2.  `print(f"Before function call: {planet}")`
    *   **Explanation:** Python needs to resolve the name `planet`.
        *   It first checks the **Local scope** (none here, as we're at the top level).
        *   It then checks the **Enclosing scope** (none here).
        *   It then checks the **Global scope**. It finds `planet` bound to "Earth".
    *   **Output:** `Before function call: Earth`

3.  `explore_planet()`
    *   **Explanation:** The `explore_planet` function is called. A new **Local scope** is created for this function.
    *   Inside `explore_planet()`:
        *   `planet = "Mars"`
            *   **Explanation:** An assignment happens. According to the "local by default" rule (Step 6), Python creates a *new* variable named `planet` specifically within the **Local scope** of `explore_planet`. This local `planet` shadows the global `planet` *inside this function*.
            *   Current Local Scope of `explore_planet`: `{'planet': 'Mars'}`
            *   Global Scope (unchanged): `{'planet': 'Earth'}`
        *   `print(f"Inside function: Exploring {planet}")`
            *   **Explanation:** Python needs to resolve `planet`.
                *   It checks the **Local scope** of `explore_planet`. It finds `planet` bound to "Mars". The search stops.
            *   **Output:** `Inside function: Exploring Mars`

4.  Function `explore_planet()` finishes.
    *   **Explanation:** The local scope of `explore_planet` is destroyed, along with its local `planet` variable.

5.  `print(f"After function call: {planet}")`
    *   **Explanation:** Python needs to resolve the name `planet` again.
        *   It checks the **Local scope** (none here, as we're back at the top level).
        *   It checks the **Enclosing scope** (none here).
        *   It checks the **Global scope**. It finds `planet` bound to "Earth" (which was never modified).
    *   **Output:** `After function call: Earth`

**Final Answer:**
```text
Before function call: Earth
Inside function: Exploring Mars
After function call: Earth
```

**Reflection:** This example highlights that assignment inside a function creates a new local variable by default, even if a global variable with the same name exists. The global variable remains untouched.

---

### Example 2: Enclosing Scope and `nonlocal`

**Problem:** Analyze the following code involving nested functions and the `nonlocal` keyword. Predict the output and explain the role of `nonlocal`.

```python
def make_counter():
    count = 0 # Enclosing scope variable

    def increment():
        nonlocal count # Declare intent to modify 'count' in enclosing scope
        count += 1
        print(f"Inner increment: {count}")

    def get_count():
        return count # Access 'count' from enclosing scope

    return increment, get_count

inc, get = make_counter()

inc()
inc()
final_count = get()
print(f"Final count: {final_count}")
```

**Given:** A factory function `make_counter` that creates a counter with an `increment` function and a `get_count` function.
**Want:** The exact output and explanation of `nonlocal`.

**Solution Steps:**

1.  `def make_counter(): ...`
    *   **Explanation:** Defines `make_counter`. No code executes yet.

2.  `inc, get = make_counter()`
    *   **Explanation:** `make_counter` is called. A **Local scope** is created for `make_counter`.
        *   `count = 0`
            *   **Explanation:** `count` is assigned `0` within `make_counter`'s local scope. For the nested functions `increment` and `get_count`, this `count` variable will be in their **Enclosing scope**.
            *   Local Scope of `make_counter`: `{'count': 0}`
        *   `def increment(): ...` and `def get_count(): ...`
            *   **Explanation:** These inner functions are defined. They "remember" the `count` variable from their enclosing `make_counter`'s scope. This forms a **closure**.
        *   `return increment, get_count`
            *   **Explanation:** The two functions are returned and assigned to `inc` and `get` respectively. The local scope of `make_counter` is technically destroyed, but the `count` variable persists because `inc` and `get` still refer to it.

3.  `inc()`
    *   **Explanation:** The `increment` function (bound to `inc`) is called. A **Local scope** is created for `increment`.
        *   `nonlocal count`
            *   **Explanation:** This statement tells Python: "When I refer to `count` in this function, I mean the `count` variable in my nearest **Enclosing scope** (which is `make_counter`'s scope), not a new local one, and I intend to modify it."
        *   `count += 1`
            *   **Explanation:** Python finds `count` in the enclosing scope (current value `0`), increments it to `1`, and updates the `count` in `make_counter`'s scope.
            *   Enclosing Scope of `increment` (which is `make_counter`'s original local scope): `{'count': 1}`
        *   `print(f"Inner increment: {count}")`
            *   **Explanation:** Python resolves `count` from the enclosing scope.
            *   **Output:** `Inner increment: 1`

4.  `inc()`
    *   **Explanation:** `increment` is called again.
        *   `nonlocal count`
            *   **Explanation:** Again, refers to the enclosing `count`.
        *   `count += 1`
            *   **Explanation:** `count` (current value `1`) is incremented to `2`.
            *   Enclosing Scope: `{'count': 2}`
        *   `print(f"Inner increment: {count}")`
            *   **Explanation:** Resolves `count` from enclosing scope.
            *   **Output:** `Inner increment: 2`

5.  `final_count = get()`
    *   **Explanation:** The `get_count` function is called. A **Local scope** is created for `get_count`.
        *   `return count`
            *   **Explanation:** Python resolves `count`.
                *   Checks Local scope of `get_count` (none).
                *   Checks **Enclosing scope** of `get_count` (which is `make_counter`'s original local scope). Finds `count` bound to `2`.
            *   The value `2` is returned and assigned to `final_count`.

6.  `print(f"Final count: {final_count}")`
    *   **Explanation:** Prints the value of `final_count`.
    *   **Output:** `Final count: 2`

**Final Answer:**
```text
Inner increment: 1
Inner increment: 2
Final count: 2
```

**Reflection:** This example demonstrates the power of `nonlocal` for modifying variables in enclosing function scopes, enabling concepts like closures and stateful functions. Without `nonlocal`, `count += 1` inside `increment` would have created a new local `count` variable, and the outer `count` would have remained `0`.

---

### Example 3: `global` Keyword and `UnboundLocalError`

**Problem:** Predict the output of the following code. Pay close attention to the commented-out line and explain why it would cause an error.

```python
total_sum = 100 # Global variable

def calculate_sum(value):
    # print(total_sum) # Line A: If uncommented and 'global total_sum' is NOT used later, this would cause UnboundLocalError
    global total_sum # Declare intent to modify the global total_sum
    total_sum += value
    print(f"Inside function: total_sum is {total_sum}")

print(f"Before call: total_sum is {total_sum}")
calculate_sum(50)
print(f"After call: total_sum is {total_sum}")
```

**Given:** A global variable `total_sum` and a function `calculate_sum` that uses `global` to modify it.
**Want:** The exact output and an explanation for the `UnboundLocalError` if Line A were uncommented without `global total_sum`.

**Solution Steps:**

1.  `total_sum = 100`
    *   **Explanation:** `total_sum` is created in the **Global scope** with value `100`.
    *   Global Scope: `{'total_sum': 100}`

2.  `print(f"Before call: total_sum is {total_sum}")`
    *   **Explanation:** Python resolves `total_sum` from the Global scope.
    *   **Output:** `Before call: total_sum is 100`

3.  `calculate_sum(50)`
    *   **Explanation:** The function `calculate_sum` is called with `value = 50`. A **Local scope** is created for the function.
        *   `global total_sum`
            *   **Explanation:** This declaration tells Python that any assignments to `total_sum` within this function should refer to the `total_sum` in the **Global scope**, not create a new local one.
        *   `total_sum += value`
            *   **Explanation:** Python finds the global `total_sum` (value `100`), adds `value` (which is `50`) to it. So, `100 + 50 = 150`. The global `total_sum` is updated to `150`.
            *   Global Scope: `{'total_sum': 150}`
        *   `print(f"Inside function: total_sum is {total_sum}")`
            *   **Explanation:** Python resolves `total_sum` (now explicitly global) and prints its current value.
            *   **Output:** `Inside function: total_sum is 150`

4.  Function `calculate_sum()` finishes.
    *   **Explanation:** The local scope of `calculate_sum` is destroyed.

5.  `print(f"After call: total_sum is {total_sum}")`
    *   **Explanation:** Python resolves `total_sum` from the Global scope.
    *   **Output:** `After call: total_sum is 150`

**Final Answer:**
```text
Before call: total_sum is 100
Inside function: total_sum is 150
After call: total_sum is 150
```

**Explanation for `UnboundLocalError` (if Line A were uncommented and `global total_sum` was *not* used):**

If `print(total_sum)` (Line A) were uncommented, and `global total_sum` was *not* declared later in the function, Python would encounter an `UnboundLocalError`. Here's why:

When Python compiles `calculate_sum`, it scans the function body for assignments. It sees `total_sum += value`, which is an assignment to `total_sum`. Because of the "local by default" rule (Step 6), Python marks `total_sum` as a *local variable* for this function.

Then, when `print(total_sum)` (Line A) executes, Python looks for the local `total_sum`. Since the assignment `total_sum += value` happens *after* Line A, the local `total_sum` hasn't been created yet. You're trying to use a local variable before it's bound to a value, leading to `UnboundLocalError`. The global `total_sum` is completely ignored in this scenario because Python has already decided `total_sum` is local to the function.

**Reflection:** This example demonstrates the critical role of the `global` keyword for modifying module-level variables from within a function and clarifies the `UnboundLocalError` trap.

---

### Example 4: Shadowing Built-ins and Order of Operations

**Problem:** Predict the output of the following code and explain how built-in names can be shadowed.

```python
len = 5 # Global variable, shadows built-in len

def process_data(data_list):
    print(f"Data list: {data_list}")
    # print(len(data_list)) # Line B: This would cause an error
    length_of_list = len # Accesses the global 'len' (which is 5)
    print(f"Length of list (using shadowed len): {length_of_list}")

process_data([1, 2, 3])

def get_true_length(data_list):
    import builtins # Explicitly import the builtins module
    print(f"True length of list: {builtins.len(data_list)}")

get_true_length(["a", "b"])
```

**Given:** A global variable named `len` that shadows the built-in `len` function, and functions that interact with it.
**Want:** The exact output, an explanation of shadowing, and why Line B would error.

**Solution Steps:**

1.  `len = 5`
    *   **Explanation:** This line assigns the integer `5` to a variable named `len` in the **Global scope**. This `len` now "shadows" (hides) the built-in `len()` function. From this point on, if Python looks for `len` in the global scope, it will find `5` first, before ever reaching the built-in scope.
    *   Global Scope: `{'len': 5}`
    *   Built-in Scope: `{'len': <built-in function len>}` (but effectively hidden by global `len`)

2.  `def process_data(data_list): ...`
    *   **Explanation:** Defines the function `process_data`.

3.  `process_data([1, 2, 3])`
    *   **Explanation:** Calls `process_data` with `data_list = [1, 2, 3]`. A **Local scope** is created for `process_data`.
        *   `print(f"Data list: {data_list}")`
            *   **Explanation:** Prints the parameter `data_list`.
            *   **Output:** `Data list: [1, 2, 3]`
        *   `length_of_list = len`
            *   **Explanation:** Python needs to resolve `len`.
                *   Checks Local scope of `process_data` (none).
                *   Checks Enclosing scope (none).
                *   Checks **Global scope**. It finds `len` bound to `5`. The search stops.
            *   `length_of_list` is assigned the value `5`.
        *   `print(f"Length of list (using shadowed len): {length_of_list}")`
            *   **Explanation:** Prints the value of `length_of_list`.
            *   **Output:** `Length of list (using shadowed len): 5`

4.  Function `process_data()` finishes.

5.  `def get_true_length(data_list): ...`
    *   **Explanation:** Defines the function `get_true_length`.

6.  `get_true_length(["a", "b"])`
    *   **Explanation:** Calls `get_true_length` with `data_list = ["a", "b"]`. A **Local scope** is created.
        *   `import builtins`
            *   **Explanation:** This imports the `builtins` module, which contains all the built-in names. Now, we can explicitly access the *original* built-in `len` function via `builtins.len`.
        *   `print(f"True length of list: {builtins.len(data_list)}")`
            *   **Explanation:** `builtins.len` is the original built-in function. It's called with `data_list` (which is `["a", "b"]`). The length is `2`.
            *   **Output:** `True length of list: 2`

**Final Answer:**
```text
Data list: [1, 2, 3]
Length of list (using shadowed len): 5
True length of list: 2
```

**Explanation for Error (if Line B were uncommented):**

If `print(len(data_list))` (Line B) were uncommented, it would cause a `TypeError: 'int' object is not callable`.
Here's why:
When Python tries to execute `len(data_list)`, it first resolves the name `len`. Following LEGB, it finds `len` in the **Global scope**, where it's bound to the integer `5`. It then attempts to call `5` as if it were a function (because of the parentheses `()`). Since an integer is not a callable object, this results in a `TypeError`.

**Reflection:** This example demonstrates the concept of "shadowing," where a variable in an inner scope (in this case, global) hides a variable with the same name in an outer scope (built-in). It also shows how to explicitly access a shadowed built-in by importing the `builtins` module. Shadowing built-ins is generally considered bad practice.

## 6. Common mistakes and traps

1.  **`UnboundLocalError`:** This happens when you try to *read* a variable inside a function, but then later in the *same function*, you *assign* to a variable with that same name. Python, seeing the later assignment, assumes the variable is local to the function. Since the read happens before the local variable is assigned, it's "unbound."
    *   *Why it happens:* Python's "local by default" rule for assignments, combined with its compilation strategy that determines variable scope before execution.

2.  **Forgetting `global` or `nonlocal` for modifications:** Attempting to modify a global or enclosing variable from inside a function without using the `global` or `nonlocal` keywords. This will result in a new local variable being created instead of modifying the intended outer variable, leading to unexpected behavior and subtle bugs.
    *   *Why it happens:* Misunderstanding the "local by default" rule for assignments (Step 6).

3.  **Shadowing Built-in Names:** Creating a variable or function with the same name as a Python built-in (e.g., `list = [1, 2, 3]`, `print = "hello"`). This hides the original built-in, making it inaccessible or causing `TypeError` if you try to use the shadowed name as its original type.
    *   *Why it happens:* Lack of awareness of the built-in scope and the LEGB search order.

4.  **Misunderstanding `global` vs. `nonlocal`:** Using `global` when `nonlocal` is needed, or vice-versa. `global` only affects variables at the module level. `nonlocal` affects variables in the immediate enclosing *function* scope, but not the global scope.
    *   *Why it happens:* Confusing the hierarchy of scopes, especially between nested functions and the module top-level.

5.  **Over-reliance on Global Variables:** Using many global variables to pass data between functions. This makes code hard to test, debug, and reason about, as any function could potentially modify global state, leading to "spaghetti code" and unpredictable side effects.
    *   *Why it happens:* Trying to avoid passing parameters or returning values, or not fully grasping function encapsulation.

6.  **Confusing Function Parameters with Global/Enclosing Variables:** Parameters are always local to the function. Even if a parameter has the same name as a global or enclosing variable, it will shadow it within the function.
    *   *Why it happens:* Not recognizing that parameter binding is a form of local assignment.

## 7. Textbook-precise explanation

In Python, the concept of **scope** defines the region of a program where a name (identifier) is visible and can be referenced. Each time a function is called, a new **namespace** (a mapping from names to objects) is created for its local variables. These namespaces are organized hierarchically, and Python uses the **LEGB rule** for name resolution.

Formally, when an identifier $N$ is referenced, the Python interpreter searches for its binding in the following sequence of namespaces:

1.  **Local ($\mathcal{L}$):** The innermost scope, which is the current function's local namespace. This includes names assigned within the function body (e.g., `x = 10`), function parameters (e.g., `def func(param): ...`), and names introduced by `for` loops or `with` statements.
    $$ N \in \mathcal{L}_{\text{current_function}} $$
2.  **Enclosing ($\mathcal{E}$):** If $N$ is not found in the local scope, the interpreter proceeds to search the local namespaces of any enclosing functions, from the innermost to the outermost. This applies to nested function definitions.
    $$ N \in \mathcal{L}_{\text{enclosing_function}_1} \rightarrow \mathcal{L}_{\text{enclosing_function}_2} \rightarrow \dots $$
3.  **Global ($\mathcal{G}$):** If $N$ is still not found, the search moves to the global scope, which is the namespace of the current module. This includes names defined at the top level of a script or module, and names imported from other modules.
    $$ N \in \mathcal{G}_{\text{current_module}} $$
4.  **Built-in ($\mathcal{B}$):** Finally, if $N$ is not found in the global scope, the interpreter searches the built-in namespace, which contains all of Python's pre-defined names (e.g., `print`, `len`, `True`, `None`).
    $$ N \in \mathcal{B}_{\text{builtins_module}} $$

If the name $N$ is not found in any of these scopes, a `NameError` exception is raised.

**Assignment Rule:**
When an assignment statement (`N = value`) occurs within a function (or any scope), the default behavior is to create or modify a name binding in the **local scope** ($\mathcal{L}$) of that function. This is often referred to as the "local by default" rule. If a name $N$ exists in an outer scope (enclosing, global, or built-in) but is assigned within a function, a new local binding for $N$ is created, effectively "shadowing" the outer name within that function's scope.

To modify a name in an outer scope from within a function, explicit keywords are required:
*   The `global` statement (`global N`) declares that $N$ refers to the name in the **global (module) scope** for the purpose of assignment.
    $$ \text{assignment to } N \text{ (with `global N`)} \implies N \in \mathcal{G}_{\text{current_module}} $$
*   The `nonlocal` statement (`nonlocal N`) declares that $N$ refers to the name in the nearest **enclosing function scope** (not the global scope) for the purpose of assignment.
    $$ \text{assignment to } N \text{ (with `nonlocal N`)} \implies N \in \mathcal{L}_{\text{nearest_enclosing_function}} $$

Understanding these rules is crucial for predicting program behavior, managing data flow, and avoiding common errors like `UnboundLocalError`.

*(Referenced concepts from: Python Language Reference, "Fluent Python" by Luciano Ramalho, and general principles of programming language design.)*

## 8. ASCII diagrams

Here's a conceptual diagram illustrating the nested nature of Python's scopes and the LEGB search order:

```text
+---------------------------------------------------------------------------------+
| Built-in Scope (B)                                                              |
| (e.g., print, len, str, True, False, None)                                      |
|                                                                                 |
|   +---------------------------------------------------------------------------+ |
|   | Global Scope (G) - Module Level                                           | |
|   | (e.g., variables defined directly in a .py file, imported modules)        | |
|   |   `MY_GLOBAL_VAR = 100`                                                   | |
|   |   `def func_global(): ...`                                                | |
|   |                                                                           | |
|   |   +---------------------------------------------------------------------+ | |
|   |   | Enclosing Function Scope (E) - For `outer_func`                     | |
|   |   | (e.g., variables defined in an outer function that contains an inner) | |
|   |   |   `def outer_func():`                                               | |
|   |   |     `enclosing_data = [1, 2, 3]`                                    | |
|   |   |                                                                     | |
|   |   |     +-------------------------------------------------------------+ | |
|   |   |     | Local Scope (L) - For `inner_func`                          | |
|   |   |     | (e.g., variables defined inside `inner_func`, parameters)   | |
|   |   |     |   `def inner_func(param_a):`                                | |
|   |   |     |     `local_result = param_a * 2`                            | |
|   |   |     |     `print(local_result)`   <--- Search starts HERE (L)     | |
|   |   |     |     `print(enclosing_data)` <--- Then here (E)              | |
|   |   |     |     `print(MY_GLOBAL_VAR)`  <--- Then here (G)              | |
|   |   |     |     `print(len)`            <--- Then here (B)              | |
|   |   |     |                                                             | |
|   |   |     +-------------------------------------------------------------+ | |
|   |   |                                                                     | |
|   |   +---------------------------------------------------------------------+ | |
|   |                                                                           | |
|   +---------------------------------------------------------------------------+ |
|                                                                                 |
+---------------------------------------------------------------------------------+

                                 Search Direction (LEGB):
                                 <--- L (Local)
                                 <--- E (Enclosing)
                                 <--- G (Global)
                                 <--- B (Built-in)
```

**Description of the Diagram:**
The diagram depicts four concentric boxes, each representing a scope level. The innermost box is the Local scope, followed by Enclosing, Global, and finally, the Built-in scope as the outermost. The arrows indicate the order in which Python searches for a variable name when it is referenced. When a name is encountered (e.g., `print(local_result)`), Python first checks the Local scope. If not found, it moves to the Enclosing scope, then Global, and finally Built-in. The search stops as soon as the name is found in any of these scopes.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic:**
    To remember the LEGB rule, think: **L**azy **E**lephants **G**rab **B**ananas.
    *   **L**azy $\rightarrow$ **L**ocal
    *   **E**lephants $\rightarrow$ **E**nclosing
    *   **G**rab $\rightarrow$ **G**lobal
    *   **B**ananas $\rightarrow$ **B**uilt-in

    And to remember the "assignment creates local by default" rule, extend it: **L**azy **E**lephants **G**rab **B**ananas **L**ocally. The last "Locally" reminds you that assignment defaults to the local scope unless `global` or `nonlocal` is used.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Fact 1: The LEGB Search Order:** When Python looks for a variable, it *always* checks Local, then Enclosing, then Global, then Built-in. The first one it finds, it uses.
    *   **Fact 2: Assignment is Local by Default:** If you assign a value to a variable inside a function (e.g., `x = 10`), Python creates a *new local variable* `x` by default, even if a variable with the same name exists in an outer scope.
    *   **Fact 3: Keywords for Outer Scope Modification:** To modify a variable in the Global scope, use `global var_name`. To modify a variable in an Enclosing function's scope, use `nonlocal var_name`.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson thoroughly. Explain the LEGB rule and the assignment rule to an imaginary friend. Solve the self-check questions.
    *   **Day 3:** Re-read the "Core Idea" and "Common Mistakes" sections. Write out 2-3 small code examples demonstrating each scope and the use of `global`/`nonlocal`.
    *   **Day 7:** Attempt to explain the `UnboundLocalError` without looking at your notes. Redraw the ASCII diagram from memory.
    *   **Day 16:** Review the "Textbook-Precise Explanation" and connect it back to your intuitive understanding. Solve a new, slightly harder problem involving nested functions and scope.
    *   **Day 35:** Without any notes, write down the LEGB rule, the default assignment behavior, and when to use `global`/`nonlocal`. Create a complex example that tests all these concepts.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the LEGB rule, think about why programming languages need scope:
    *   **Problem:** If every variable was visible everywhere (global), names would clash constantly, and functions would accidentally modify data they shouldn't. This leads to unmanageable, buggy code.
    *   **Solution: Isolation/Encapsulation:** We need ways to limit variable visibility.
        *   **Local:** The most basic form of isolation. A function should have its own temporary workspace. This is the first place to look.
        *   **Enclosing:** What if a function needs to cooperate with its immediate creator (another function)? It makes sense for inner functions to "see" their parent's variables, but not necessarily modify them by default. This creates a chain.
        *   **Global:** Some data *must* be shared across the entire program (e.g., configuration settings). This is the module level. It's a wider scope, but still contained.
        *   **Built-in:** Finally, the language itself provides fundamental tools. These should always be available and form the outermost layer.
    *   **Assignment vs. Access:** If assigning always modified the outermost variable, it would be dangerous. So, by default, assignment *must* create a new local variable to maintain isolation. Only with explicit keywords (`global`, `nonlocal`) should you reach out and modify an outer variable, because this is a powerful operation that breaks some encapsulation and should be done intentionally.

## 10. Connections — what this leads to

Understanding variable scope, particularly the LEGB rule, is not just about avoiding errors; it's a foundational concept that unlocks many advanced Python features and paradigms:

*   **Closures:** This is a direct consequence of the Enclosing scope. A closure is a function that "remembers" the values from its enclosing lexical scope even after the enclosing function has finished executing. This is essential for creating factory functions, decorators, and maintaining state in functional programming patterns.
*   **Decorators:** Python decorators are functions that wrap other functions, adding functionality. They heavily rely on closures and the enclosing scope to access and modify the decorated function or its context.
*   **Object-Oriented Programming (OOP):** When you define classes, you encounter different types of variables:
    *   **Instance variables:** These are local to a specific instance of a class (e.g., `self.name`).
    *   **Class variables:** These are shared among all instances of a class (e.g., `ClassName.count`).
    *   **Method scope:** Variables defined inside a method are local to that method.
    Understanding LEGB helps distinguish these and how they interact.
*   **Module Design and Namespaces:** Scope is crucial for organizing code into modules. Each module has its own global scope, preventing name collisions between different parts of a large application. `import` statements bring names into the current module's global scope.
*   **Context Managers (`with` statement):** While not directly about LEGB, context managers often manage resources that are scoped to the `with` block, ensuring proper setup and teardown, similar to how local variables are managed.
*   **Functional Programming:** Emphasizes pure functions that avoid side effects. A deep understanding of scope helps enforce this by limiting a function's interaction with global state, promoting predictability and testability.
*   **Debugging and Error Handling:** When a `NameError` or `UnboundLocalError` occurs, a solid grasp of LEGB is the first tool you use to diagnose why a variable isn't visible or accessible in a particular context.
*   **Concurrency and Parallelism:** In multi-threaded or multi-process applications, understanding how variables are scoped (e.g., thread-local storage vs. shared global variables) is critical to prevent race conditions and ensure data integrity.

## 11. Self-check questions

1.  **Easy:**
    ```python
    a = 10
    def func1():
        b = 20
        print(a)
        print(b)
    func1()
    # print(b) # What would happen if this line were uncommented?
    ```
    What is the output of the code, and why would the commented line cause an error?

2.  **Medium:**
    ```python
    x = "global"

    def outer():
        x = "enclosing"
        def inner():
            print(x)
        inner()

    outer()
    ```
    What is printed when `outer()` is called, and from which scope is `x` resolved inside `inner()`?

3.  **Intermediate:**
    ```python
    counter = 0

    def increment_counter():
        counter += 1 # Is this line valid?
        print(counter)

    # increment_counter() # What happens when this function is called?
    print(counter)
    ```
    If `increment_counter()` is called, what error occurs, and why? How would you fix it to correctly increment the global `counter`?

4.  **Hard:**
    ```python
    def create_adder(x):
        def adder(y):
            nonlocal x
            x += y
            return x
        return adder

    add_five = create_adder(5)
    print(add_five(3))
    print(add_five(2))
    print(add_five(10))
    ```
    Trace the execution of this code and predict the final three outputs. Explain how `nonlocal` affects the variable `x`.

5.  **Challenging:**
    ```python
    my_var = "Global"

    def func_a():
        my_var = "Local A"
        def func_b():
            my_var = "Local B"
            def func_c():
                # nonlocal my_var # Line X
                # global my_var  # Line Y
                print(my_var)
            func_c()
        func_b()

    func_a()
    ```
    What would be printed if:
    a) Neither Line X nor Line Y is uncommented?
    b) Only Line X (`nonlocal my_var`) is uncommented, and `func_c` also contains `my_var = "Modified by C"` before the print statement?
    c) Only Line Y (`global my_var`) is uncommented, and `func_c` also contains `my_var = "Modified by C"` before the print statement?
    Explain your reasoning for each scenario.