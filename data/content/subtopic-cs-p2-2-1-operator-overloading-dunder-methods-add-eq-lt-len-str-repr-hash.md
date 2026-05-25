## What it is
Operator overloading allows you to define the behavior of Python's built-in operators (like `+`, `==`, `<`) for your custom objects. You achieve this by implementing special methods with double-underscore names, often called "dunder" methods. Essentially, you're teaching Python what `vector1 + vector2` should mean for your specific `Vector` class.

## Why it matters
In physics simulations and rocketry, you constantly work with mathematical entities like vectors, matrices, and tensors. Operator overloading allows your code to mirror the mathematical notation, making it vastly more readable and less error-prone. Instead of `force = v1.add(v2).multiply_by_scalar(k)`, you can write `force = (v1 + v2) * k`, which is exactly how you'd write it on a whiteboard. This is the foundation of libraries like NumPy and PyTorch, which are critical for both physics modeling and machine learning.

## When to study it
You are ready for this topic. The necessary prerequisites are:
1.  A solid understanding of Python's basic types and their operators (e.g., `+` for integers vs. strings).
2.  Proficiency with defining classes, including the `__init__` method, attributes, and instance methods.

If you are not comfortable with creating a simple `class` and instantiating it, review that first.

## How to study it (step by step)
1.  **Representing your object (`__str__`, `__repr__`):** Create a simple `Vector2D` class with `x` and `y` attributes. Before adding any dunder methods, print an instance of it. Observe the default output (`<...object at 0x...>`). Now, implement `__repr__` to return an unambiguous, developer-friendly string like `"Vector2D(3, 4)"`. Then, implement `__str__` to return a user-friendly string like `"(3, 4)"`. Test the difference by using `print()` on the object versus just typing its name in an interactive shell.
2.  **Adding arithmetic (`__add__`):** Implement the `__add__` method for your `Vector2D` class. It should take `self` and `other` as arguments. Inside the method, check if `other` is also a `Vector2D`. If so, return a *new* `Vector2D` instance whose components are the sum of the components of `self` and `other`. Test it: `v1 = Vector2D(1, 2)`, `v2 = Vector2D(3, 4)`, `v3 = v1 + v2`.
3.  **Adding comparisons (`__eq__`, `__lt__`):** Implement `__eq__` to define what it means for two vectors to be equal (i.e., their components are equal). Test it with `v1 == v2`. Then, implement `__lt__` (less than) by defining an ordering. A common choice for vectors is to order them by their magnitude (distance from the origin). You'll need a helper method to calculate magnitude: $\sqrt{x^2 + y^2}$.
4.  **Measuring your object (`__len__`):** This doesn't make sense for a `Vector2D`, so let's switch to a `Path` class that stores a list of `Vector2D` objects. Implement `__len__` for the `Path` class to return the number of vectors in its list. Now you can use the global `len()` function on your `Path` object: `len(my_path)`.
5.  **Making your object hashable (`__hash__`):** Go back to your `Vector2D` class. Try to add an instance to a `set` or use it as a dictionary key. It will fail if you've only defined `__eq__`. The rule is: if objects can be equal, they must have the same hash value. Implement `__hash__` by returning the hash of a tuple of its attributes, e.g., `hash((self.x, self.y))`. Now, you can use your vectors in sets and as dictionary keys.

## Key ideas, with intuition
1.  **Operators are syntactic sugar for method calls.** This is the central concept. When Python sees an expression like `a + b`, it translates it behind the scenes into a method call: `a.__add__(b)`. The operator is just a convenient, readable alias for the dunder method.
2.  **The contract of `__str__` vs. `__repr__`.**
    *   `__repr__` (representation) is for developers. It should be an unambiguous string that, ideally, could be used to recreate the object: `eval(repr(obj)) == obj`.
    *   `__str__` (string) is for users. It should be a readable, "pretty" representation, used by `print()`.
    *   If `__str__` is missing, Python will fall back to using `__repr__`.
3.  **Immutability and `__hash__`.** An object can only be hashed if its value cannot change over its lifetime. This is because a hash value is used to find the object's location in a data structure like a dictionary. If the object's value changed, its hash would change, and it would be "lost" in the dictionary. This is why you must implement `__hash__` for your custom immutable objects if you also implement `__eq__`. The fundamental contract is:
    $$
    \text{If } a == b, \text{ then it must hold that } \text{hash}(a) == \text{hash}(b).
    $$
4.  **Return a new instance.** For operators like `+`, `-`, `*`, the expectation is that they do not modify the original operands. `c = a + b` should leave `a` and `b` unchanged and store the result in a new object `c`. Methods that modify the object in-place have their own dunder names (e.g., `__iadd__` for `+=`).

## Worked example
Let's build a `Vector2D` class for physics calculations.

```python
import math

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # For developers: Unambiguous representation
    def __repr__(self):
        return f"Vector2D({self.x}, {self.y})"

    # For users: Pretty printing
    def __str__(self):
        return f"({self.x}, {self.y})"

    # Defines behavior for the '+' operator
    def __add__(self, other):
        if isinstance(other, Vector2D):
            # Return a NEW Vector2D instance
            return Vector2D(self.x + other.x, self.y + other.y)
        return NotImplemented # Important for operations with other types

    # Defines behavior for the '==' operator
    def __eq__(self, other):
        if isinstance(other, Vector2D):
            return self.x == other.x and self.y == other.y
        return False

    # Defines behavior for the '<' operator based on magnitude
    def __lt__(self, other):
        if isinstance(other, Vector2D):
            return self.magnitude() < other.magnitude()
        return NotImplemented

    # A regular helper method
    def magnitude(self):
        return math.sqrt(self.x**2 + self.y**2)

# --- Usage ---
v1 = Vector2D(1, 2)
v2 = Vector2D(3, 4)

# Test __add__
v_sum = v1 + v2
print(f"v1 + v2 = {v_sum}") # Uses __str__

# Test __eq__
v_clone = Vector2D(1, 2)
print(f"v1 == v2: {v1 == v2}")
print(f"v1 == v_clone: {v1 == v_clone}")

# Test __lt__
print(f"v1 < v2: {v1 < v2}")

# Test __repr__
print([v1, v2]) # Containers use __repr__ for their elements
```

**Reflection:**
- `__init__` sets up the object's state.
- `__repr__` and `__str__` control how the object appears when inspected or printed.
- `__add__` intercepts the `+` operator, performs vector addition, and crucially, returns a *new* `Vector2D` object, leaving `v1` and `v2` untouched.
- `__eq__` and `__lt__` intercept comparison operators, allowing us to define equality and ordering based on the object's internal state (components and magnitude).

## Diagrams

The core translation from operator to method call:

```text
+-----------------------+      +---------------------------+
| User Code             |      | Python Interpreter        |
|                       |      |                           |
|   result = obj1 + obj2|----->| Calls obj1.__add__(obj2)  |
|                       |      |                           |
|   is_equal = a == b   |----->| Calls a.__eq__(b)         |
|                       |      |                           |
|   length = len(cont)  |----->| Calls cont.__len__()      |
|                       |      |                           |
+-----------------------+      +---------------------------+
```

## Memory technique — remember this forever
1.  **The Mnemonic:** Think of dunder methods as a **"diplomatic protocol"**. Your custom object is a new country. For it to interact with the established world of Python (its operators, functions like `len()`, and containers like `set`), it must have diplomats that speak the right language. The `__add__` method is your "Ambassador of Addition," `__len__` is the "Envoy of Length." The double underscores are the official seals on their diplomatic papers.
2.  **Must-learn facts:**
    *   `obj1 + obj2` is syntactic sugar for `obj1.__add__(obj2)`.
    *   `__str__` is for `print()`, for users. `__repr__` is for debugging, for developers.
    *   If `a == b` is true, then `hash(a) == hash(b)` must also be true. Implement `__hash__` if you implement `__eq__`.
3.  **Spaced-repetition schedule:** Review this material and your own code examples in **1 day, 3 days, 7 days, 16 days, and 35 days**.
4.  **First principles pathway:** If you forget which dunder corresponds to an operator (e.g., `%`), you can reason it out. What is the operation called? Modulo. So the dunder is likely `__mod__`. Less than? `__lt__`. The fundamental principle is that Python translates intuitive operator symbols into predictable method names on the objects involved.

## Common mistakes
1.  **Modifying `self` in arithmetic dunders.** `__add__` should return a new object. `v1 + v2` should not change `v1`. The operator for in-place addition is `+=`, which maps to `__iadd__`.
2.  **Implementing `__str__` but not `__repr__`.** This makes debugging painful. When you print a list of your objects, you'll see a list of unhelpful `<...>` strings because containers always use `__repr__`. Always implement `__repr__` first.
3.  **`__eq__` without `__hash__`.** Defining equality means you can compare objects with `==`. But if you then try to add them to a `set` or use them as a dictionary key, you'll get a `TypeError: unhashable type`. You must implement `__hash__` for immutable objects that have a custom `__eq__`.
4.  **Incorrect return types.** `__len__` must return an `int`. `__eq__`, `__lt__`, `__gt__`, etc., must return a `bool`. `__add__` should return an instance of your class or `NotImplemented`. Returning `None` from these will cause errors.

## Self-check
1.  Create a `Time` class that stores `hours` and `minutes`. Implement `__str__` to display it as `HH:MM` (e.g., `09:05`). Implement `__eq__`.
2.  For the `Time` class, implement `__add__`. Adding a `Time` object to another should correctly handle minute and hour rollovers (e.g., `Time(10, 45) + Time(1, 30)` should result in `Time(12, 15)`).
3.  Create a `Molecule` class that stores a dictionary of atom counts (e.g., `{'H': 2, 'O': 1}` for water). Implement `__eq__` and `__hash__`. Then, implement `__lt__` to order molecules by their total number of atoms. What is a potential ambiguity in this ordering scheme, and how does your implementation handle it?