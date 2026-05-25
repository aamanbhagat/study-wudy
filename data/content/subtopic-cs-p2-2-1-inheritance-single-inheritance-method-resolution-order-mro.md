## What it is
Inheritance is a mechanism where a new class, called a subclass or derived class, is created based on an existing class, the superclass or base class. The subclass automatically acquires the attributes and methods of its superclass, allowing for code reuse and the creation of a logical hierarchy. Single inheritance means a subclass can only have one direct superclass.

## Why it matters
This principle is fundamental to building scalable, maintainable software. In aerospace guidance systems, you might have a base `Filter` class that implements a generic state estimation algorithm; specific classes like `KalmanFilter` and `ParticleFilter` would then inherit from it, reusing the core logic while specializing the update steps. In machine learning, a base `Layer` class in a neural network framework provides common functionality, while `DenseLayer`, `ConvolutionalLayer`, and `RecurrentLayer` inherit and specialize it.

## When to study it
You must have a solid understanding of the following concepts before tackling inheritance:
- **Classes and Objects:** What a class is (a blueprint) and what an object is (an instance of that blueprint).
- **Attributes:** Instance variables (unique to each object, e.g., `self.mass`) and class variables.
- **Methods:** Functions defined within a class that operate on an object's data.
- **The `__init__` method:** How an object's initial state is constructed.

If you are not confident with these, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Create a Base Class:** Code a simple `Vehicle` class with an `__init__` method that sets `max_speed` and a method `display_speed()`.
2.  **Create a Derived Class:** Code a `Rocket` class that inherits from `Vehicle` using the syntax `class Rocket(Vehicle):`. For now, put only `pass` in the class body. Instantiate a `Rocket` object and call the `display_speed()` method. Observe that it works, even though the method is not defined in `Rocket`.
3.  **Extend the Subclass:** Add a new `__init__` method to `Rocket`. This method should accept `max_speed` and a new attribute, `thrust`. Inside `Rocket`'s `__init__`, you *must* call the parent's `__init__` to initialize the `max_speed`. Use `super().__init__(max_speed)`.
4.  **Override a Method:** In the `Rocket` class, define your own `display_speed()` method. Make it print the speed and the thrust. This is called method overriding. Create a `Rocket` object and call this method to see the new behavior.
5.  **Inspect the Method Resolution Order (MRO):** Create a three-level hierarchy: `Thing` -> `Vehicle` -> `Rocket`. In your code, print the MRO for the `Rocket` class using `print(Rocket.mro())` or `print(Rocket.__mro__)`. Analyze the printed list; this is the exact path Python follows to find a method.

## Key ideas, with intuition
1.  **The "Is-A" Relationship:** This is the core intuition. Inheritance should only be used when the subclass *is a* specialized version of the superclass. A `Rocket` *is a* `Vehicle`. A `Car` *is a* `Vehicle`. This relationship is not symmetric and implies a hierarchy. In contrast, a `Car` *has an* `Engine`; this is a "Has-A" relationship, which is modeled by composition (storing an `Engine` object as an attribute of a `Car` object), not inheritance.

2.  **Specialization and Extension:** A subclass starts with everything the superclass has. It can then be specialized in two ways:
    *   **Adding:** Introduce new attributes or methods that are unique to the subclass. A `Rocket` has `thrust`, but not all `Vehicles` do.
    *   **Overriding:** Redefine a method that already exists in the superclass to give it more specific behavior. The `Rocket`'s `display_info` might include thrust, which the generic `Vehicle`'s version would not.

3.  **The Method Lookup Chain (MRO):** When you call `my_rocket.launch()`, Python doesn't search randomly. It follows a strict, pre-determined order called the Method Resolution Order (MRO). For single inheritance, this is simple and intuitive:
    $$
    \text{Lookup Path for } C: [C, B, A, \text{object}]
    $$
    Where class `C` inherits from `B`, and `B` inherits from `A`. Python first checks `C` for the method. If it's not there, it checks `B`. If it's not in `B`, it checks `A`. Finally, it checks the built-in `object` class, which is the ultimate ancestor of all classes in Python. The first place the method is found is the one that gets executed.

4.  **`super()` is a Proxy to the Parent:** The `super()` function is not a synonym for the parent class itself. It's a proxy object that allows you to call methods from the *next* class in the MRO. In single inheritance, this is simply the parent. It's crucial for cleanly extending functionality, especially in `__init__`, where you want the parent to do its setup work before you add the child's specific setup.

## Worked example
Let's model a simple hierarchy for celestial bodies.

```python
class CelestialBody:
    def __init__(self, name, mass_kg):
        """Initializes a generic celestial body."""
        self.name = name
        self.mass_kg = mass_kg

    def display_info(self):
        """Prints basic information."""
        print(f"Name: {self.name}")
        print(f"Mass: {self.mass_kg:.2e} kg")

class Star(CelestialBody):
    def __init__(self, name, mass_kg, spectral_type):
        """Initializes a star, a specialized CelestialBody."""
        # Step 1: Call the parent's __init__ to handle name and mass.
        # This is critical for proper initialization.
        super().__init__(name, mass_kg)
        
        # Step 2: Add the new attribute specific to Star.
        self.spectral_type = spectral_type

    def display_info(self):
        """Overrides the parent method to add star-specific info."""
        # Step 3: Call the parent's method to print the common info first.
        # This avoids duplicating code.
        super().display_info()
        
        # Step 4: Print the specialized information.
        print(f"Spectral Type: {self.spectral_type}")

# --- Usage ---
sol = Star(name="Sol", mass_kg=1.989e30, spectral_type="G2V")
sol.display_info()

# --- MRO Inspection ---
print("\nMRO for Star class:")
print(Star.mro())
```

**Output:**
```
Name: Sol
Mass: 1.99e+30 kg
Spectral Type: G2V

MRO for Star class:
[<class '__main__.Star'>, <class '__main__.CelestialBody'>, <class 'object'>]
```

**Reflection:**
- **Step 1** worked because `super().__init__()` correctly passed the `name` and `mass_kg` arguments up the MRO to `CelestialBody.__init__`, which initialized those attributes on the `sol` object.
- **Step 2** worked by adding a new instance attribute, `spectral_type`, which is unique to the `Star` class, demonstrating extension.
- **Step 3** worked because `super().display_info()` found the `display_info` method in the next item of the MRO (`CelestialBody`) and executed it.
- **Step 4** demonstrates specialization. After the parent method ran, the child method added its own specific output. The final MRO printout confirms the exact lookup path: `Star` -> `CelestialBody` -> `object`.

## Diagrams
Here is the class hierarchy for the worked example. The arrow indicates inheritance ("Is-A").

```text
+-----------------+
|  CelestialBody  |
|-----------------|
| - name          |
| - mass_kg       |
|-----------------|
| + __init__()    |
| + display_info()|
+-----------------+
        ^
        | (inherits from)
        |
+-----------------+
|      Star       |
|-----------------|
| - spectral_type |
|-----------------|
| + __init__()    |
| + display_info()|  <-- (overrides)
+-----------------+
```

The Method Resolution Order (MRO) lookup path for an instance of `Star`:

```text
[ Start lookup ]
      |
      v
+-----------------+
|      Star       | --- (1) Look for method here first.
+-----------------+
      |
      v
+-----------------+
|  CelestialBody  | --- (2) If not in Star, look here next.
+-----------------+
      |
      v
+-----------------+
|     object      | --- (3) If not in CelestialBody, look here.
+-----------------+
      |
      v
[ Method not found error ]
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of inheritance as **"The Ancestral Library"**. When you ask an object (`sol`) to perform a method (`display_info`), it first checks its own personal bookshelf (`Star` class). If the book isn't there, it walks up to its parent's office (`CelestialBody` class) and checks their bookshelf. It continues up the chain of ancestors until it finds the right instruction book or reaches the original ancestor (`object`), who has a few basic books for everyone. `super()` is the librarian's note that says, "For the first part of this topic, see the book on my parent's shelf."

2.  **Must-overlearn facts:**
    *   Inheritance syntax: `class Subclass(Superclass):`
    *   Calling parent's method: `super().method_name(args)`
    *   The MRO is the ordered list of classes Python will search for a method.

3.  **Spaced-repetition schedule:** Review this material and your own code examples at **1 day, 3 days, 7 days, 16 days, and 35 days** from now.

4.  **"First principles" pathway:** If you forget the exact syntax for `super()`, you can rebuild the idea from the MRO. You know you need to execute code from the next class in the MRO chain. How do you reference that "next class" without hard-coding its name? The language must provide a mechanism to do this. That mechanism is `super()`. This thought process will lead you to look up the correct syntax, because you understand the underlying *need*.

## Common mistakes
1.  **Forgetting to call `super().__init__`:** A subclass `__init__` *overrides* the parent's `__init__`. If you don't explicitly call `super().__init__(...)`, the parent's initialization code never runs, and your object will be missing attributes it was supposed to inherit.
2.  **"Is-A" vs. "Has-A" confusion:** Do not use inheritance for composition. A `Rocket` does not inherit from `Engine`; a `Rocket` *has an* `Engine`. The `Engine` should be an attribute of the `Rocket` class (`self.engine = Engine()`).
3.  **Mismatched `__init__` signatures:** When you call `super().__init__(...)`, you must pass the arguments that the *parent's* `__init__` method expects. Forgetting an argument or passing them in the wrong order will cause an error.

## Self-check
1.  Given the classes below, what will be the exact output of `d.speak()`?
    ```python
    class Animal:
        def __init__(self, name):
            self.name = name
        def speak(self):
            print(f"{self.name} makes a sound.")
    
    class Dog(Animal):
        def speak(self):
            print(f"{self.name} barks.")

    d = Dog("Rex")
    d.speak()
    ```

2.  Modify the `Dog` class from question 1. The new `speak` method should first print that the dog barks, and *then* print the generic sound an animal makes using the parent class's method. How would you implement this?

3.  You are modeling objects in a solar system. You have classes for `Star`, `Planet`, `Moon`, and `Asteroid`. Sketch out a single-inheritance hierarchy for these four classes. Justify why your chosen base class is the most appropriate. Is there any relationship that single inheritance cannot model well here?