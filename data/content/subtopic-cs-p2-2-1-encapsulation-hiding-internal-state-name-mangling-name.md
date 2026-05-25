## What it is
Encapsulation is the bundling of data (attributes) and the methods that operate on that data into a single unit, an object. A key principle of encapsulation is *information hiding*: restricting direct access to an object's internal state from outside the object's definition. This is achieved by making attributes "private".

## Why it matters
In complex systems like flight control software or physics simulations, encapsulation prevents catastrophic errors. Imagine a `Rocket` object; you don't want another part of the code to accidentally set `rocket.fuel_level = -100`. Encapsulation forces all interactions to happen through controlled methods, like `rocket.jettison_stage()`, which can validate state changes and ensure the object remains in a consistent, physically possible state.

## When to study it
You should be comfortable with the fundamentals of Python programming and the basic concepts of Object-Oriented Programming. Specifically, you must understand:
1.  How to define a `class`.
2.  How to create an `instance` of a class.
3.  The meaning of `self`, attributes (`self.x`), and methods (`def my_method(self):`).

If these terms are unfamiliar, review the basics of class and object creation first.

## How to study it (step by step)
1.  **Create a "naked" object:** Write a simple `Point` class with public attributes `x` and `y`. Create an instance and show that you can read *and* write to `p.x` and `p.y` from anywhere, including setting them to nonsensical values like `"hello"`.
2.  **Introduce the "internal use" convention:** Modify the class to use `_x` and `_y`. Demonstrate that you can still access `p._x` directly. Discuss why this is a "gentleman's agreement" among programmers not to touch it, a convention, not a rule enforced by the language.
3.  **Implement name mangling:** Change `_x` and `_y` to `__x` and `__y`. Now, try to access `p.__x`. Observe the `AttributeError`. This is Python's enforcement mechanism.
4.  **Reveal the mangled name:** On your instance `p`, run `print(p.__dict__)` or `print(dir(p))`. Find the attribute that looks like `_Point__x`. This reveals the trick: Python has renamed the attribute to prevent accidental access.
5.  **Build controlled access:** Write `get_x()` and `set_x(value)` methods for your class. The `set_x` method should contain logic to ensure the new value is a number. This is the core of building a safe public interface (API).
6.  **Refactor with properties:** Learn about the `@property` decorator. Refactor your `get_x` and `set_x` methods into a property. This provides the safety of the setter method with the clean syntax of direct attribute access (`p.x = 10` now calls your validation logic automatically).

## Key ideas, with intuition
1.  **The Object as a Capsule:** Think of an object as a space capsule. The internal life-support systems (the data, like `__oxygen_level`) are complex and delicate. The astronauts (the methods inside the class) can operate them directly. People outside the capsule (other parts of your code) can only interact through a well-defined control panel (the public methods, like `get_status()`). They can't just open a panel and start rewiring things.
2.  **Public API vs. Private Implementation:** Encapsulation separates *what* an object does (its public API) from *how* it does it (its private implementation). This is powerful. You can completely refactor the internal workings of your `RocketEngine` class, perhaps changing how `__thrust` is calculated, and as long as the public `set_thrust_percentage()` method still works the same way, no other code that uses your class will break.
3.  **Name Mangling is for Inheritance, Not Security:** The primary reason for `__name` is to prevent naming collisions in subclasses. If a parent class has a `__calculate_stuff()` method, and a child class also defines a `__calculate_stuff()` method, name mangling ensures they don't overwrite each other. The parent's becomes `_Parent__calculate_stuff` and the child's becomes `_Child__calculate_stuff`. It is *not* a security feature; the name is predictable and the data is still accessible.

## Worked example
Let's model a particle in a 1D box. Its position must be within the box boundaries, $0 \le x \le L$.

```python
class ParticleInBox:
    def __init__(self, length: float, initial_position: float):
        self.length = length  # Public attribute for the box length
        self.__position = 0.0 # Private attribute for the particle's position
        
        # Use our own setter method during initialization to validate
        self.set_position(initial_position)

    def set_position(self, new_position: float):
        """Sets the particle's position, but only if it's inside the box."""
        if 0 <= new_position <= self.length:
            self.__position = new_position
            print(f"Position set to {self.__position}")
        else:
            print(f"Error: Position {new_position} is outside the box [0, {self.length}]")

    def get_position(self) -> float:
        """Returns the current position of the particle."""
        return self.__position

# --- Usage ---
L = 10.0
p = ParticleInBox(length=L, initial_position=5.0) # Position set to 5.0

# 1. Try to set position using the public method (the "front door")
print("\nAttempting to move particle via public method:")
p.set_position(9.5)  # Works: Position set to 9.5
p.set_position(11.0) # Fails: Error: Position 11.0 is outside the box [0, 10.0]
print(f"Current position is: {p.get_position()}") # Prints 9.5, the last valid position

# 2. Try to set the position directly (fails)
print("\nAttempting to modify internal state directly:")
try:
    p.__position = -2.0
except AttributeError as e:
    print(f"Caught expected error: {e}")

# 3. Access using the mangled name (the "back door")
print("\nAccessing via mangled name:")
mangled_name = '_ParticleInBox__position'
print(f"Object's internal dict: {p.__dict__}")
setattr(p, mangled_name, -2.0) # This bypasses our validation!
print(f"Position after mangling access: {p.get_position()}") # Whoops, it's -2.0 now!
```

**Reflection:**
- **Step 1** worked because we used the intended `set_position` method, which contains our validation logic. This is the correct, encapsulated way to interact with the object.
- **Step 2** failed with an `AttributeError` because Python performed name mangling on `__position`, so `p.__position` doesn't exist. This prevents accidental modification.
- **Step 3** worked, but it proves that this is not a security system. By knowing the name mangling rule (`_ClassName__attributeName`), we bypassed the validation logic in `set_position` and put the object into an invalid state. This demonstrates that encapsulation is about preventing *accidents*, not malicious attacks.

## Diagrams

This diagram shows the "wall" of encapsulation. The outside world can only access the internal state via the public API.

```text
+-------------------------------------------------+
|                  OUTSIDE CODE                   |
+-------------------------------------------------+
      |                                   ^
      | p.set_position(5.0)               | p.get_position()
      | (Allowed Call)                    | (Allowed Call)
      v                                   |
+------------------ Object `p` -------------------+
|                                                 |
|      +-----------------------------------+      |
|      |          PUBLIC API               |      |
|      |  - set_position(value)            |      |
|      |  - get_position()                 |      |
|      +-----------------------------------+      |
|                  ^            |                 |
| (internal access)|            | (internal access)
|                  |            v                 |
|      +-----------------------------------+      |
|      |        INTERNAL STATE             |      |
|      |  - __position = 5.0               |      |
|      +-----------------------------------+      |
|                                                 |
+-------------------------------------------------+
      |
      | p.__position = -2.0
      | (AttributeError: Blocked by name mangling)
      x
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "The Two-Underscore Bodyguard". An attribute like `__fuel` is a VIP. You can't access it directly. You must go through its publicist, the `set_fuel()` method. The bodyguard's real name is secretly `_ClassName__fuel`, but he doesn't advertise it. He's there to stop accidents, not assassins.

2.  **Overlearn this fact:**
    > Inside `class Rocket:`, the attribute `self.__payload` is automatically renamed by Python to `self._Rocket__payload`.

3.  **Spaced Repetition Schedule:**
    - Review this concept tomorrow. (1 day)
    - Review it again this weekend. (3 days)
    - Review it next week. (7 days)
    - Review in two more weeks. (16 days)
    - Review in a month. (35 days)

4.  **First Principles Pathway:** If you forget the exact mangled name, how can you find it? Create an instance of the class, say `my_obj`, and then run `print(dir(my_obj))`. The mangled name will be present in the list of attributes and methods. This is your infallible escape hatch.

## Common mistakes
1.  **Believing `__` provides security:** It doesn't. It's a mechanism to prevent name collisions during inheritance and to signal "this is internal," but it's easily bypassed. Don't use it for sensitive data.
2.  **Overusing `__`:** The `_single_underscore` convention is often sufficient. Use `__double_underscore` specifically when you are writing a class that you expect to be subclassed, and you want to ensure a method or attribute in your class won't be accidentally overridden by the child class.
3.  **Typing the mangled name wrong:** A common error is forgetting the single leading underscore. It's `_ClassName__name`, not `ClassName__name`.
4.  **Confusing Getters/Setters with Properties:** Writing `get_x()` and `set_x()` methods is the classic way. Using the `@property` decorator is the more "Pythonic" way to achieve the same result with a cleaner syntax for the user of the class. They solve the same problem.

## Self-check
1.  Create a `Spacecraft` class with a private attribute `__temperature` (in Kelvin). Implement a method `set_temperature(kelvin)` that raises a `ValueError` if the input is below absolute zero (0 K).
2.  Consider a class `_SecretBase` with an attribute `self.__location`. What will the mangled name of this attribute be? Why is the leading underscore on the *class name* significant here?
3.  Create a base class `Engine` with a method `__ignite()`. Create a child class `RocketEngine` that inherits from `Engine` and also has its own `__ignite()` method. From an instance of `RocketEngine`, demonstrate that calling the parent's ignition sequence requires explicitly referencing the mangled name, proving that the methods did not overwrite each other.