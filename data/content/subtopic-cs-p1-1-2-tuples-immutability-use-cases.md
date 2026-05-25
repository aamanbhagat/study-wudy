## What it is
A tuple is an ordered collection of elements, similar to a list. The defining characteristic of a tuple is its **immutability**: once a tuple is created, you cannot change, add, or remove its elements. It is defined using parentheses `()`.

## Why it matters
Immutability provides data integrity. In physics simulations or rocket guidance systems, physical constants like the gravitational constant $G$ or the speed of light $c$ must not be accidentally changed; storing them in a tuple `(G, c)` ensures this. In machine learning, functions often return multiple fixed values like `(loss, accuracy)`, and tuples are the natural, safe way to bundle this data. Because they are immutable, tuples can also be used as keys in dictionaries, which is critical for creating complex data structures and lookup tables.

## When to study it
You should understand the following before tackling tuples:
*   Basic data types: integers, floats, strings.
*   Variables and assignment.
*   Lists: how to create them, index them (`my_list[0]`), and modify them (`my_list[0] = 'new'`).
If you are not comfortable with lists, study those first. Tuples are best understood by contrasting them with lists.

## How to study it (step by step)
1.  **Create and Inspect:** Open a Python interpreter. Create a simple tuple: `point = (10, 20, 30)`. Use `type(point)` to confirm it's a tuple and `print(point)` to see its contents.
2.  **Access Elements:** Practice indexing. Access the first element with `point[0]` and the last with `point[-1]`. Use slicing to get a sub-tuple, e.g., `point[0:2]`. Notice this works exactly like with lists.
3.  **Prove Immutability:** Intentionally try to break it. Execute `point[0] = 5`. You will receive a `TypeError`. This error is not a failure; it is the *most important lesson* about tuples. Understand that this is by design.
4.  **Master Unpacking:** This is a key feature. Create a tuple `constants = (9.81, 6.674e-11)`. Now, assign its elements to variables in one line: `g, G = constants`. Verify the values of `g` and `G`. This is a clean and common Python idiom.
5.  **Use as Dictionary Keys:** Create a dictionary to store the populations of capital cities, where the key is a `(latitude, longitude)` tuple. Example: `capitals = {(40.71, -74.00): 'New York', (35.68, 139.69): 'Tokyo'}`. Try to do this with a list as a key; you will get a `TypeError` because keys must be immutable.
6.  **Explore Tuple Methods:** Use `dir(tuple)` to see the available methods. You will notice only two: `count()` and `index()`. Compare this to the long list of methods for a list (`append()`, `remove()`, etc.). This reinforces the idea that tuples are simple and unchangeable.

## Key ideas, with intuition
1.  **Immutability is a Contract:** Think of a tuple as a signed contract. The terms (elements) are agreed upon at creation and cannot be altered. A list is a draft document; you can edit it freely. This "contract" makes your code safer and more predictable, as you can pass a tuple to a function and be certain the function cannot change your data.

2.  **Structure vs. Sequence:** A list is typically a homogeneous sequence of items whose length can change (e.g., a list of student names). A tuple is often a heterogeneous structure where each position has a specific meaning (e.g., `(name, age, student_id)`). The order and number of elements are part of the data's definition.

3.  **Packing and Unpacking:**
    *   **Packing:** When you write `data = 'alpha', 100, True`, Python "packs" these values into a single tuple.
    *   **Unpacking:** When you write `name, value, status = data`, Python "unpacks" the tuple's elements into the individual variables. This is an elegant way to handle multiple return values from a function.
    $$
    \text{def get_position(): return (10, 20, 5)} \\
    x, y, z = \text{get_position()} \quad \text{// Unpacking}
    $$

4.  **Performance:** Because tuples are immutable, Python can perform internal optimizations. They are generally slightly faster to create and take up less memory than lists with the same elements. For large-scale data processing, this can be a meaningful difference.

## Worked example
Let's model a function that calculates the initial horizontal ($v_x$) and vertical ($v_y$) components of a velocity vector given a magnitude $v$ and an angle $\theta$ (in radians). The function must return both components. A tuple is the perfect tool for this.

**Problem:** Write a Python function `resolve_velocity(v, theta)` that returns the horizontal and vertical components as a single object. Then, call it with $v = 50 \, \text{m/s}$ and $\theta = \frac{\pi}{4}$ and store the results in `vx` and `vy`.

**Solution:**

1.  **Import `math` module:** We need `math.cos` and `math.sin`.
    ```python
    import math
    ```
2.  **Define the function:** The function will take `v` and `theta` as arguments. The formulas are $v_x = v \cos(\theta)$ and $v_y = v \sin(\theta)$. We return the two values in a tuple.
    ```python
    def resolve_velocity(v, theta):
        """Calculates velocity components."""
        vx = v * math.cos(theta)
        vy = v * math.sin(theta)
        return (vx, vy) # Explicitly return a tuple
    ```
3.  **Set initial conditions:** Define the magnitude and angle.
    ```python
    initial_v = 50
    initial_theta = math.pi / 4
    ```
4.  **Call the function and unpack the result:** We call the function and use tuple unpacking to assign the returned values directly to our variables.
    ```python
    vx, vy = resolve_velocity(initial_v, initial_theta)
    ```
5.  **Print and verify:**
    ```python
    print(f"Initial velocity: {initial_v} m/s at {initial_theta:.2f} radians")
    print(f"Horizontal component (vx): {vx:.2f} m/s")
    print(f"Vertical component (vy): {vy:.2f} m/s")
    ```
    Output:
    ```
    Initial velocity: 50 m/s at 0.79 radians
    Horizontal component (vx): 35.36 m/s
    Vertical component (vy): 35.36 m/s
    ```

**Reflection:**
*   Step 2 worked because returning `(vx, vy)` bundles two distinct but related pieces of data into a single, immutable package.
*   Step 4 demonstrates the power of unpacking. The alternative, `components = resolve_velocity(...)` followed by `vx = components[0]` and `vy = components[1]`, is more verbose and less clear. The immutability of the returned tuple ensures the caller can't accidentally modify one of the components inside the returned object.

## Diagrams
Here is a conceptual diagram of how a list and a tuple might be stored in memory. The key difference is that the list's structure is mutable (can change size), while the tuple's is fixed.

```text
Memory Diagram

LIST: my_list = [101, 202, 303]
(Can grow or shrink)

 my_list
+-----------+      +-----------------+
| ref_to_A  |----->| Header (size=3) |
+-----------+      | Pointer to 101  | ----> [Integer Object: 101]
                   | Pointer to 202  | ----> [Integer Object: 202]
                   | Pointer to 303  | ----> [Integer Object: 303]
                   +-----------------+
                   (Can add/remove pointers)


TUPLE: my_tuple = (101, 202, 303)
(Fixed size)

 my_tuple
+-----------+      +-----------------+
| ref_to_B  |----->| Header (size=3) |
+-----------+      | Pointer to 101  | ----> [Integer Object: 101]
                   | Pointer to 202  | ----> [Integer Object: 202]
                   | Pointer to 303  | ----> [Integer Object: 303]
                   +-----------------+
                   (CANNOT add/remove pointers. Fixed block.)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Tuples are Tablets, Lists are chalkboards." You can easily erase and rewrite on a chalkboard (a list is mutable). You cannot change what is carved into a stone tablet (a tuple is immutable).

2.  **Must-overlearn facts:**
    *   Syntax: `my_tuple = (1, 2, 3)`
    *   Single-element tuple syntax: `single = (1,)` (the comma is mandatory).
    *   Immutability: You cannot change a tuple after creation. `my_tuple[0] = 5` will raise a `TypeError`.

3.  **Spaced Repetition Schedule:** Review this material and your notes at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you ever forget the core property of a tuple, you can derive it in seconds. Open a Python interpreter and run these two lines:
    ```python
    t = (1, 2)
    t[0] = 99
    ```
    The `TypeError: 'tuple' object does not support item assignment` is the first principle of immutability, proven by experiment.

## Common mistakes
1.  **Single-Element Tuple Syntax Error:** Writing `x = (42)` does not create a tuple. It creates an integer `42`, as the parentheses are just for grouping. To create a tuple with one element, you must include a trailing comma: `x = (42,)`.
2.  **Attempting to Modify a Tuple:** A common error for beginners is treating a tuple like a list, trying `my_tuple.append(5)` or `del my_tuple[0]`. These operations will fail. The fix is to realize you need a list, not a tuple, or to create a *new* tuple: `new_tuple = my_tuple + (5,)`.
3.  **Confusing Tuple Immutability with Element Immutability:** If a tuple contains a mutable object, like a list, the *contents* of that inner list can be changed. The tuple itself doesn't change; it still points to the exact same list object.
    ```python
    # This is tricky, but valid
    t = (1, [2, 3])
    t[1].append(4) # This WORKS. t is now (1, [2, 3, 4])
    # You modified the list *inside* the tuple, not the tuple itself.
    ```

## Self-check
1.  Write a single line of Python code to swap the values of two variables, `a` and `b`, using tuple packing and unpacking.
2.  Write a function `get_extremes(numbers)` that takes a list of numbers and returns a tuple containing the minimum and maximum numbers in the list.
3.  A 3D vector can be represented by a tuple `(x, y, z)`. Write a function `add_vectors(v1, v2)` that takes two such vector tuples and returns a new tuple representing their sum. For example, `add_vectors((1, 2, 3), (4, 5, 6))` should return `(5, 7, 9)`.