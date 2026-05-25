## What it is
In Python, methods are functions defined inside a class. Instance methods operate on a specific instance of a class (conventionally passed as `self`), class methods operate on the class itself (passed as `cls`), and static methods are utility functions that don't depend on instance or class state. Decorators (`@classmethod`, `@staticmethod`) are used to explicitly mark class and static methods.

## Why it matters
This distinction is crucial for writing clean, organized, and extensible object-oriented code. In aerospace simulations, you might have a `Rocket` class. An instance method like `fire_thruster()` would change the state of one specific rocket (`self.fuel -= 10`). A class method like `Rocket.from_design_spec('SaturnV.json')` could act as a factory, constructing a new rocket instance from a file. A static method like `Rocket.calculate_escape_velocity(planet_mass, planet_radius)` would be a pure physics calculation logically grouped with rockets but not dependent on any specific rocket or the `Rocket` class definition itself.

## When to study it
You should be comfortable with the following before proceeding:
1.  Python functions, arguments, and return values.
2.  The `class` keyword and the concept of instantiation (creating an object from a class).
3.  The `__init__` method and instance attributes (e.g., `self.mass`).
4.  The basic concept of inheritance.

If these terms are unfamiliar, pause and review them. We will build directly on them.

## How to study it (step by step)
1.  **Code the default:** Write a simple `Vector2D` class with an `__init__(self, x, y)` and an instance method `magnitude(self)` that calculates $\sqrt{x^2 + y^2}$. Instantiate two different vectors and verify that calling `magnitude()` on each gives a different result based on its own `self.x` and `self.y`.
2.  **Add a utility:** Write a standalone function `normalize_angle(angle)` that keeps an angle in the range $[0, 2\pi]$. Now, move this function inside the `Vector2D` class and add the `@staticmethod` decorator. Call it via `Vector2D.normalize_angle(...)` and observe that it works without creating a `Vector2D` instance.
3.  **Create a factory:** Add a `@classmethod` called `from_polar(cls, r, theta)`. This method should calculate $x = r \cos(\theta)$ and $y = r \sin(\theta)$, and then return a new instance of the class by calling `cls(x, y)`. Test it: `v = Vector2D.from_polar(5, 0.785)`. Notice how you are creating an instance without directly calling `__init__`.
4.  **Test inheritance:** Create a `Vector3D` class that inherits from `Vector2D`. Give it an `__init__(self, x, y, z)`. Now, call `Vector3D.from_polar(5, 0.785)`. What happens? It will likely fail because the `from_polar` method calls `cls(x, y)`, which for `Vector3D` is `Vector3D(x, y)`, and that `__init__` expects a `z` argument. This reveals the power and responsibility of `cls`—it refers to the class it was called on (`Vector3D` in this case).
5.  **Fix the factory:** Modify the `Vector3D` class to override `from_polar`. The new method should call the parent's method using `super().from_polar(...)` to get a 2D vector and then add the `z` component, or handle it appropriately. This solidifies your understanding of how class methods interact with inheritance.

## Key ideas, with intuition
1.  **The First Argument is the Key:** The first argument of a method tells you its type and what it has access to.
    *   **`self` (Instance Method):** Has access to a specific object's data. It answers the question, "What can *this specific object* do?" Example: `my_rocket.get_current_fuel()`.
    *   **`cls` (Class Method):** Has access to the class itself, but not a specific instance. It answers, "What can the *class as a whole* do?" This is most often used for alternative ways to create instances (factories). Example: `Rocket.load_from_schematic('blueprint.xml')`.
    *   **No special first argument (Static Method):** Has access to neither instance nor class data. It's a regular function that is thematically related to the class. It answers, "What is a related utility function?" Example: `Rocket.calculate_delta_v(...)`.

2.  **State vs. No State:** The core difference is about state management.
    *   Instance methods read and modify the state of a specific object (`self.position`, `self.velocity`).
    *   Class methods can read and modify the state of the class (e.g., a class attribute like `Rocket.total_rockets_built`).
    *   Static methods are stateless with respect to the class. They are deterministic: the same inputs always produce the same outputs.

3.  **Inheritance Behavior:** This is where `@classmethod` truly shines over `@staticmethod`. When you call a class method on a subclass, the `cls` argument is the subclass itself. This allows subclasses to use or override factories defined on the parent class, and the factory will correctly produce instances of the subclass. A static method has no such awareness.

## Worked example
Let's model a particle detector. Each detector has a unique ID and counts particles. We also want a way to track how many detectors have been created in total and a utility function to convert energy units.

```python
import math

class ParticleDetector:
    # Class attribute: shared by all instances of the class
    detectors_built = 0

    def __init__(self, detector_id):
        # Instance attributes: unique to each instance
        self.detector_id = detector_id
        self.particles_counted = 0
        
        # Modify class state during instance creation
        ParticleDetector.detectors_built += 1

    # 1. Instance Method: operates on 'self'
    def detect_particle(self, count=1):
        """Increments the count for this specific detector."""
        self.particles_counted += count
        print(f"Detector {self.detector_id} counted {count} particle(s). Total: {self.particles_counted}")

    # 2. Class Method: operates on 'cls'
    @classmethod
    def from_lab_inventory(cls, lab_name):
        """A factory to create a detector with a standardized ID."""
        new_id = f"{lab_name}-{cls.detectors_built + 1}"
        return cls(new_id) # 'cls' is ParticleDetector here

    # 3. Static Method: no 'self' or 'cls'
    @staticmethod
    def ev_to_joules(electron_volts):
        """Converts electron-volts to Joules. A general utility."""
        return electron_volts * 1.60218e-19

# --- Usage ---

# Create instances directly
d1 = ParticleDetector("Alpha-01")
d1.detect_particle(5)

# Use the class method factory
d2 = ParticleDetector.from_lab_inventory("CERN")
d2.detect_particle(10)

# Access class attribute
print(f"Total detectors built: {ParticleDetector.detectors_built}")

# Use the static method utility
energy_joules = ParticleDetector.ev_to_joules(500) # 500 eV
print(f"500 eV is {energy_joules:.4e} Joules.")
```

**Reflection:**
1.  `detect_particle` had to be an instance method because it modifies `self.particles_counted`, a value unique to `d1` and `d2`.
2.  `from_lab_inventory` had to be a class method because it needed access to the class `ParticleDetector` (as `cls`) to create a new instance `cls(new_id)`. It also uses a class attribute `cls.detectors_built` for naming.
3.  `ev_to_joules` is a pure calculation. It doesn't know or care about any specific detector or the detector class itself. Making it a `@staticmethod` groups it logically within the class without giving it unnecessary access to state.

## Diagrams
```text
+-------------------------------------------------+
| class ParticleDetector                          |
|                                                 |
|   +--------------------------+                  |
|   | Class Attributes         |                  |
|   |   detectors_built = 2    |                  |
|   +--------------------------+                  |
|                                                 |
|   @classmethod                                  |
|   from_lab_inventory(cls) ---+                  |
|                              | (has access to)  |
|   @staticmethod              |                  |
|   ev_to_joules()             V                  |
|                        (no access)              |
+-------------------------------------------------+
       ^
       | .__class__
       |
+--------------------------+   +--------------------------+
| Instance d1              |   | Instance d2              |
| (self)                   |   | (self)                   |
|                          |   |                          |
|   detector_id = "Alpha-01" |   |   detector_id = "CERN-2" |
|   particles_counted = 5  |   |   particles_counted = 10 |
|                          |   |                          |
|   detect_particle(self) ---+   |   detect_particle(self) ---+
|                          | |   |                          | |
+--------------------------+ |   +--------------------------+ |
                           | |                              | |
                           V V                              V V
                       (has access to its own attributes)
```

## Memory technique — remember this forever
1.  **The "Who are you?" Mnemonic:**
    *   **Instance Method:** Asks the object, "**Who are you?**" -> `self`. It needs to know which specific object it's working with.
    *   **Class Method:** Asks the object, "**What kind are you?**" -> `cls`. It needs to know the blueprint (the class) it came from.
    *   **Static Method:** Asks "**What do you know?**". It doesn't care about the object or the class, only about performing a calculation with the data it's given.

2.  **Must-Overlearn Facts:**
    *   Instance: `def method(self, ...)` -> Needs an instance. `obj.method()`.
    *   Class: `@classmethod def method(cls, ...)` -> Needs a class. `ClassName.method()`.
    *   Static: `@staticmethod def method(...)` -> Needs neither. `ClassName.method()`.

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson tomorrow (1 day).
    *   Then in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Finally, in 35 days. Actively re-code the worked example from memory each time.

4.  **First Principles Pathway:** If you forget, remember that Python automatically passes the instance as the first argument when you call `my_object.my_method()`. This implicit passing of `self` is the foundation of instance methods. The decorators `@classmethod` and `@staticmethod` are simply instructions to Python to change this default behavior: "Hey Python, for this next one, pass the *class* instead," or "Hey Python, don't pass anything automatically."

## Common mistakes
1.  **Forgetting the decorator:** Writing `def my_static_method(x, y):` without `@staticmethod`. When you call `MyClass.my_static_method(1, 2)`, it works, but `my_instance.my_static_method(1, 2)` will fail with a `TypeError` because Python tries to pass `self` as the first argument.
2.  **Using `@staticmethod` for factories:** Writing a factory method like `from_config` as a static method. It will work for the base class, but if a subclass inherits it, the factory will still be hard-coded to return an instance of the base class, not the subclass. A `@classmethod` using `cls(...)` solves this.
3.  **Accessing `self` in a static or class method:** Trying to access `self.my_attribute` inside a method decorated with `@classmethod` or `@staticmethod`. This will raise an `AttributeError` because `self` (the instance) does not exist in that context.

## Self-check
1.  Create a `Temperature` class that stores temperature in Kelvin. Write an instance method `to_celsius(self)`.
2.  Add two class methods to `Temperature`: `from_celsius(cls, celsius)` and `from_fahrenheit(cls, fahrenheit)`. Both should return a new `Temperature` instance with the correct Kelvin value.
3.  Add a static method `is_valid_kelvin(kelvin)` that returns `True` if the input temperature is at or above absolute zero ($0K$) and `False` otherwise. Why must this be a static method and not an instance method?