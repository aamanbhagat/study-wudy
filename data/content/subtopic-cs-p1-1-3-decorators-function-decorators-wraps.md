## What it is
A decorator in Python is a function that takes another function as an argument, adds some functionality to it (or "decorates" it), and returns the modified function without altering the original function's source code. The `@` symbol is syntactic sugar, a shorthand way to apply a decorator to a function definition.

## Why it matters
Decorators are a cornerstone of idiomatic Python, promoting clean, reusable code. In web frameworks like Flask, `@app.route('/')` decorates a function to turn it into a web endpoint. In machine learning and scientific computing, you'll use decorators for logging function calls, timing code execution for performance profiling (`@timer`), and caching the results of expensive computations (`@lru_cache`) like physics simulations or data transformations.

## When to study it
Before tackling decorators, you must have a solid grasp of three concepts. If these are not clear, stop and review them first.
1.  **Functions as First-Class Objects:** You must understand that functions can be assigned to variables, passed as arguments to other functions, and returned from other functions.
2.  **Nested Functions:** You need to be comfortable defining a function inside another function.
3.  **Closures:** You must understand how a nested function (the "inner" function) can access variables from its enclosing (the "outer" function's) scope, even after the outer function has finished executing.

## How to study it (step by step)
1.  **Manual Decoration:** Forget the `@` symbol for now. Write a simple function `say_hello()`. Then, write a decorator function `my_decorator(func)` that defines a nested `wrapper()` function. Inside `wrapper()`, print a "before" message, call `func()`, and print an "after" message. The decorator must return `wrapper`. Manually apply it: `say_hello = my_decorator(say_hello)`. Call `say_hello()` and observe the output.
2.  **Syntactic Sugar:** Now, rewrite the code from step 1, but this time, place `@my_decorator` directly above the `def say_hello():` line. Remove the manual assignment line. Run it and verify the output is identical. This will solidify that `@` is just a shortcut.
3.  **Decorating Functions with Arguments:** Modify `say_hello()` to take an argument, e.g., `say_hello(name)`. Your decorator from step 2 will break. Fix it by modifying your `wrapper` function to accept arbitrary arguments using `*args` and `**kwargs`, and pass them along to the original function: `def wrapper(*args, **kwargs): ... func(*args, **kwargs) ...`.
4.  **Handling Return Values:** Modify your decorated function to return a value, e.g., `def add(a, b): return a + b`. Your current decorator will "swallow" this return value. Fix the `wrapper` function to capture and return the result of the original function call: `result = func(*args, **kwargs); return result`.
5.  **Preserving Metadata:** Print `say_hello.__name__` and `say_hello.__doc__` from your decorated function. Notice they reflect the `wrapper` function, not `say_hello`. This is a problem for debugging and introspection. Fix it by importing `wraps` from the `functools` module and adding `@wraps(func)` as a decorator *inside* your decorator, just above the `wrapper` definition. Re-run and observe that the original metadata is now preserved.

## Key ideas, with intuition
1.  **Functions are Objects:** The most fundamental idea. You can pass a function around just like you pass an integer or a string. A decorator is simply a function that accepts a function object.
    $$
    \text{decorator}(\text{function\_object}) \rightarrow \text{new\_function\_object}
    $$
2.  **The Wrapper Pattern:** A decorator doesn't modify the original function. It builds a new function—the wrapper—around it. The wrapper can execute code before and/or after it calls the original function, which it holds onto via a closure. It's like putting a letter (the original function) inside an envelope (the wrapper). The envelope has addressing info and a stamp, but the letter inside is unchanged.
3.  **`@` is Just a Shortcut:** The `@` syntax is a clean, readable way to perform a simple assignment. The following two code blocks are functionally identical:
    
    **Block 1: Using `@`**
    ```python
    @my_decorator
    def my_func():
        pass
    ```
    
    **Block 2: Manual Assignment**
    ```python
    def my_func():
        pass
    my_func = my_decorator(my_func)
    ```
    Always read `@my_decorator` as "take the following function and pass it into `my_decorator`, then reassign its name to the result."
4.  **`functools.wraps` is for Honesty:** Without `@wraps`, your decorated function lies about its identity. It pretends to be the `wrapper` function. This breaks help systems (`help(my_func)`), debuggers, and other tools. `@wraps` is a decorator that decorates your wrapper, copying the essential metadata (`__name__`, `__doc__`, etc.) from the original function onto the wrapper, so it behaves transparently.

## Worked example
Let's build a decorator to time a function's execution, a common task in optimizing physics or ML models.

```python
import time
import functools

# 1. Define the decorator function. It takes the function to be decorated as an argument.
def timer(func):
    """A decorator that prints the execution time of a function."""
    
    # 2. Use @functools.wraps to preserve the original function's metadata.
    @functools.wraps(func)
    
    # 3. Define the wrapper function. It takes the arguments intended for the original function.
    def wrapper(*args, **kwargs):
        # 4. Code to execute *before* the original function.
        start_time = time.perf_counter()
        
        # 5. Call the original function, passing its arguments, and store the result.
        value = func(*args, **kwargs)
        
        # 6. Code to execute *after* the original function.
        end_time = time.perf_counter()
        run_time = end_time - start_time
        print(f"Finished {func.__name__!r} in {run_time:.4f} secs")
        
        # 7. Return the result of the original function call.
        return value
        
    # 8. The decorator returns the wrapper function.
    return wrapper

# 9. Apply the decorator to a function.
@timer
def waste_time(num_times):
    """A function that simulates a time-consuming task."""
    for _ in range(num_times):
        sum([i**2 for i in range(10000)])

# 10. Call the decorated function as usual.
waste_time(1)
waste_time(10)

# 11. Check the metadata.
print(f"Function name: {waste_time.__name__}")
print(f"Docstring: {waste_time.__doc__}")
```
**Reflection:**
-   Step 1 defined the decorator's structure, accepting a function `func`.
-   Step 2 (`@functools.wraps`) was crucial for step 11 to work correctly, making our decorator robust.
-   Step 3 (`wrapper`) is the core. Using `*args, **kwargs` makes our `timer` generic—it can decorate any function, regardless of its parameters.
-   Steps 4 & 6 add the "decoration"—the timing logic.
-   Step 5 calls the original function.
-   Step 7 ensures that if `waste_time` returned a value, it would be passed back to the caller. This is critical and often forgotten.
-   Step 8 returns the newly created `wrapper` function, which replaces the original `waste_time` name.

## Diagrams
The `@` syntax is a reassignment operation.

```text
# Before Python executes the file:
def my_decorator(func): ...
def my_func(): ...

# Python sees @my_decorator and performs this transformation:
my_func = my_decorator(my_func)

# Now, the name 'my_func' no longer points to the original function.
# It points to the 'wrapper' function returned by my_decorator.
```

The call flow for a decorated function:

```text
               Caller
                  |
                  | Calls my_func(...)
                  v
+------------------------------------+
|          wrapper(...)              |  <-- 'my_func' now points here
|   - Does "before" actions (e.g. start timer) |
|   - Calls original_func(...)       |
|                  |                 |
|                  v                 |
|   +----------------------------+   |
|   |    original_func(...)      |   |
|   | - Does its actual work   |   |
|   | - returns value          |   |
|   +----------------------------+   |
|                  ^                 |
|                  | returns value   |
|   - Does "after" actions (e.g. stop timer) |
|   - returns value from original    |
+------------------------------------+
                  ^
                  | Returns final value
                  |
               Caller
```

## Memory technique — remember this forever
1.  **The Story:** Think of a decorator as a **"Function Valet."** You give your car keys (your function) to the valet (`@decorator`). The valet doesn't change your car. They just add services: they might note the time you arrived (`before`), park the car (`call the original function`), and note the time you leave (`after`). When you ask for your car, they give you the keys back (`return wrapper`), but the whole parking service is now attached to that action. `functools.wraps` is the valet wearing a name tag that says "Valet for [Your Car's Name]" so you don't get confused and think the valet *is* your car.

2.  **Overlearn These Formulas:**
    -   The boilerplate structure:
        ```python
        import functools
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                # ... before code ...
                result = func(*args, **kwargs)
                # ... after code ...
                return result
            return wrapper
        ```
    -   The syntactic sugar equivalence: `@decorator` on `def f...` $\equiv$ `f = decorator(f)`

3.  **Spaced Repetition Schedule:** Review this topic and re-implement a timing or logging decorator from scratch on this schedule:
    -   In 1 day.
    -   In 3 days.
    -   In 7 days.
    -   In 16 days.
    -   In 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from this truth: "A decorator is a function that takes a function and returns a new function."
    -   Start with `def my_decorator(original_function):`.
    -   You need to return a function. So, define one inside: `def new_function():`.
    -   This `new_function` needs to run the original one. So, add `original_function()` inside it.
    -   Return the `new_function` from the decorator.
    -   Now refine: what if `original_function` has arguments? Add `*args, **kwargs` to `new_function` and pass them through. What if it returns something? `return` the result from `original_function`.

## Common mistakes
1.  **Forgetting to return the wrapper:** The decorator function `my_decorator` must end with `return wrapper`. If it doesn't, it will return `None`, and your decorated function will be reassigned to `None`, causing an error when you try to call it.
2.  **Forgetting the wrapper to return the value:** The `wrapper` function must `return func(*args, **kwargs)`. If you forget this, your decorated function will always return `None`, even if the original function was supposed to return a result. This is a subtle and common bug.
3.  **Not using `*args, **kwargs`:** Writing `def wrapper():` instead of `def wrapper(*args, **kwargs):` makes your decorator brittle. It will only work on functions that take no arguments and will fail with a `TypeError` for any other function.
4.  **Skipping `@functools.wraps`:** This leads to confusing debugging. If an error occurs inside your decorated function, the traceback will show the name `wrapper`, not your function's name. `help(your_function)` will show the docstring for the wrapper, not the original.

## Self-check
1.  Write a decorator named `@log_call` that prints the message "Calling function `some_func`..." before the decorated function is executed. `some_func` should be the actual name of the function being called.
2.  Write a decorator named `@enforce_positive` that checks if all positional and keyword arguments passed to a function are positive numbers (integers or floats greater than zero). If any argument is not a positive number, it should raise a `ValueError`. Otherwise, it should run the function as normal.
3.  Write a decorator factory: a function that takes an argument and *returns* a decorator. Specifically, create a function `def repeat(num_times):` that returns a decorator. This decorator should cause the decorated function to be executed `num_times` in a row. For example, `@repeat(3)` should run the function three times.