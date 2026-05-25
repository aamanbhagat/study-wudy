## What it is
Properties are a Pythonic way to manage access to an object's attributes. They use special functions called getters, setters, and deleters, wrapped in decorators, to execute code whenever an attribute is read, assigned, or deleted, while maintaining the clean syntax of direct attribute access. This lets you add logic like validation or computation to your attributes without changing how they are used.

## Why it matters
In complex systems, you must enforce invariants—rules that must always be true. In a physics simulation, a `mass` attribute must never be negative. In a rocket control system, a `thrust_percentage` must stay between 0 and 100. Properties act as gatekeepers, ensuring that assignments to critical attributes are validated, preventing bugs that could lead to simulation errors, hardware damage, or mission failure.

## When to study it
You should be comfortable with defining classes, creating instances, and understanding the difference between instance attributes (e.g., `self.value`) and methods (e.g., `self.get_value()`). A basic conceptual grasp of Python decorators—that they are functions that modify other functions—is helpful, but not strictly required, as we will build the intuition here.

## How to study it (step by step)
1.  **The "Java-style" Problem:** Write a simple class `Particle` with an attribute `_charge`. Write explicit `get_charge()` and `set_charge(value)` methods. In `set_charge`, add a check to ensure the value is a number. Notice how the user must call `p.set_charge(1.6e-19)` instead of the more natural `p.charge = 1.6e-19`. This is verbose and not "Pythonic".
2.  **The `property()` Function:** Discover the built-in `property()` function. It's the "first principles" mechanism. Modify your `Particle` class: remove the old methods and create `charge = property(get_charge, set_charge)`. Now, `p.charge = ...` automatically calls `set_charge`, and `print(p.charge)` automatically calls `get_charge`. Understand that this is the core mechanism.
3.  **Introduce `@property` Sugar:** The decorator syntax is a cleaner way to do the same thing. Rewrite your class again. Define a method `def charge(self): ...` and decorate it with `@property`. This creates the "getter".
4.  **Introduce `@<name>.setter`:** To create the setter, define another method with the same name, `def charge(self, value): ...`, and decorate it with `@charge.setter`. The name of the decorator must match the name of the property method.
5.  **Implement Validation:** Create a `RocketEngine` class with a `throttle` property. The internal attribute should be `self._throttle`. The setter must validate that any new value is between 0.0 and 1.0. If not, it should raise a `ValueError`.
6.  **Read-Only Properties:** Create a `Star` class with `mass` and `radius` attributes (with setters). Add a `density` property that is calculated from mass and radius. This property should only have a getter (`@property`), making it read-only. Prove this by trying to assign a value to `star.density` and observing the `AttributeError`.

## Key ideas, with intuition
1.  **Uniform Access Principle:** This principle states that client code should not need to know whether it is accessing a stored attribute or a computed one. Using properties, `obj.x` can either fetch a raw value or trigger a complex calculation, and the calling code remains identical. This simplifies APIs and makes code more refactorable.
2.  **Attribute as an API:** Think of a public attribute as a contract. When you first write `my_obj.x = 10`, the contract is simple. If you later need to add validation, you would have to change it to `my_obj.set_x(10)`, breaking all code that used it. Properties let you add this logic *without* changing the public contract `my_obj.x`. You are upgrading the implementation without breaking the interface.
3.  **Interception and Delegation:** A property intercepts access to an attribute. When you write `obj.x = value`, Python sees that `x` is a property and doesn't write to the object's dictionary directly. Instead, it calls the setter function associated with the `x` property, delegating the task of handling the assignment. The actual data is stored in a "private" backing variable, conventionally named with a leading underscore (e.g., `_x`).

    $$
    \text{Assignment: } \texttt{obj.x = 100} \quad \xrightarrow{\text{Intercepted}} \quad \texttt{setter_for_x(obj, 100)} \quad \xrightarrow{\text{Validation}} \quad \texttt{obj._x = 100}
    $$
    $$
    \text{Read: } \texttt{print(obj.x)} \quad \xrightarrow{\text{Intercepted}} \quad \texttt{getter_for_x(obj)} \quad \xrightarrow{\text{Computation/Return}} \quad \text{return } \texttt{obj._x}
    $$

## Worked example
We will model a spacecraft's fuel tank. The fuel mass must be non-negative, and it must not exceed the tank's capacity.

```python
class FuelTank:
    def __init__(self, capacity_kg):
        self.capacity = capacity_kg
        self._fuel_mass = 0.0  # Backing variable for our property

    @property
    def fuel_mass(self):
        """Getter: Returns the current fuel mass in kg."""
        print("(Getting fuel mass)")
        return self._fuel_mass

    @fuel_mass.setter
    def fuel_mass(self, value):
        """Setter: Validates and sets the fuel mass."""
        print(f"(Attempting to set fuel mass to {value} kg)")
        if not isinstance(value, (int, float)):
            raise TypeError("Fuel mass must be a number.")
        if value < 0:
            raise ValueError("Fuel mass cannot be negative.")
        if value > self.capacity:
            raise ValueError(f"Cannot exceed tank capacity of {self.capacity} kg.")
        self._fuel_mass = float(value)

    @fuel_mass.deleter
    def fuel_mass(self):
        """Deleter: Jettisons all fuel."""
        print("(Jettisoning all fuel)")
        self._fuel_mass = 0.0

# --- Usage ---
tank = FuelTank(capacity_kg=1500)

# 1. Set a valid fuel mass (triggers the setter)
tank.fuel_mass = 1200
# Output: (Attempting to set fuel mass to 1200 kg)

# 2. Read the fuel mass (triggers the getter)
print(f"Current mass: {tank.fuel_mass} kg")
# Output: (Getting fuel mass)
# Output: Current mass: 1200.0 kg

# 3. Attempt an invalid assignment (triggers setter's validation)
try:
    tank.fuel_mass = 2000
except ValueError as e:
    print(f"Error: {e}")
# Output: (Attempting to set fuel mass to 2000 kg)
# Output: Error: Cannot exceed tank capacity of 1500 kg.

# 4. Delete the fuel mass (triggers the deleter)
del tank.fuel_mass
# Output: (Jettisoning all fuel)

print(f"Mass after jettison: {tank.fuel_mass} kg")
# Output: (Getting fuel mass)
# Output: Mass after jettison: 0.0 kg
```

**Reflection:**
- **Step 1:** The simple assignment `tank.fuel_mass = 1200` was intercepted by the `@fuel_mass.setter` method, which performed validation before updating the internal `_fuel_mass`.
- **Step 2:** The access `tank.fuel_mass` was intercepted by the `@property` (getter) method, which returned the value of `_fuel_mass`.
- **Step 3:** The setter's validation logic worked as intended, raising a `ValueError` and preventing the object from entering an invalid state (overfilled tank).
- **Step 4:** The `del` statement was intercepted by the `@fuel_mass.deleter`, which ran its specific logic (setting mass to zero) instead of deleting the attribute from the object.

## Diagrams
This diagram shows the flow of control when code attempts to set a property. The assignment is intercepted and routed through the setter method, which controls access to the "private" internal state.

```text
External Code                |   FuelTank Object `tank`
-----------------------------|----------------------------------------------------
                             |
tank.fuel_mass = 1200        |
       |                     |
       `-----> Intercepted by|   @fuel_mass.setter
                             |       |
                             |       V
                             |   Validate(1200) -> Passes checks
                             |       |
                             |       V
                             |   self._fuel_mass = 1200  (Internal state updated)
                             |
                             |   +-------------------+
                             |   | Private State:    |
                             |   |  _fuel_mass: 1200 |
                             |   +-------------------+
```

## Memory technique — remember this forever
1.  **The Bouncer Analogy:** Think of a property as a bouncer controlling access to a VIP room (`_attribute`).
    -   `@property` (getter): Someone inside asks "Who's in the VIP room?". The bouncer checks and reports back. This is *reading* the state.
    -   `@<name>.setter`: Someone tries to *enter* the VIP room. The bouncer checks their ID and dress code (validation). If they pass, they're allowed in (the `_attribute` is updated). If not, they're rejected (`ValueError`).
    -   `@<name>.deleter`: The manager says "Clear the room". The bouncer goes in and empties it (`_attribute` is reset or deleted).

2.  **Must-learn facts:** The canonical structure. Burn this into your memory.
    ```python
    class MyClass:
        def __init__(self):
            self._x = None  # The "private" backing variable

        @property
        def x(self):
            # Getter: Controls reading self._x
            return self._x

        @x.setter
        def x(self, value):
            # Setter: Controls writing to self._x
            # VALIDATION LOGIC GOES HERE
            self._x = value
    ```

3.  **Spaced Repetition Schedule:**
    -   Review this entire lesson in: 1 day.
    -   Re-implement the `FuelTank` example from scratch in: 3 days.
    -   Re-implement the self-check problems in: 7 days.
    -   Explain the Bouncer Analogy to a rubber duck in: 16 days.
    -   Derive the decorator syntax from the `property()` function in: 35 days.

4.  **First Principles Pathway:** If you forget the decorator syntax, remember the underlying mechanism: the `property()` built-in function. The decorators are just syntactic sugar for this:
    ```python
    # This...
    @property
    def x(self): ...
    @x.setter
    def x(self, v): ...

    # ...is just a prettier way to write this:
    def get_x(self): ...
    def set_x(self, v): ...
    x = property(get_x, set_x)
    ```

## Common mistakes
1.  **Infinite Recursion:** Naming the backing variable the same as the property. Inside the `x` setter, writing `self.x = value` will call the setter again, which calls itself, leading to a `RecursionError`. Always use a different name, like `self._x`.
2.  **Bypassing the Setter:** Code from *outside* the class modifying the private backing variable directly (e.g., `tank._fuel_mass = -500`). This completely bypasses your validation. The leading underscore is a convention telling other programmers "don't touch this directly."
3.  **Getter/Setter Mismatch:** Defining a setter for a property `x` but naming the method something else, like `set_x`. The decorator must be `@x.setter` and the method name must be `x`.

## Self-check
1.  Create a `Temperature` class. It should store temperature in Kelvin internally. Implement a `celsius` property that allows you to get and set the temperature in Celsius, performing the conversion $K = C + 273.15$ automatically. The setter for `celsius` should raise a `ValueError` if the user tries to set a temperature below absolute zero (-273.15 °C).
2.  Create a `Box` class with `width`, `height`, and `depth` properties (with validation to ensure they are positive). Add a read-only `volume` property that computes and returns the volume.
3.  Extend the `Box` class. Add a `dimensions` property. Its getter should return a tuple `(width, height, depth)`. Its setter should accept a tuple `(w, h, d)` and use it to set the `width`, `height`, and `depth` attributes simultaneously, running their respective validation logic.