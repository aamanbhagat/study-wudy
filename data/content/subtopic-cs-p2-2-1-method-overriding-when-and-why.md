## What it is
Method overriding allows a subclass to provide a specific implementation of a method that is already defined in its superclass. The new method in the subclass must have the same name, parameters, and return type as the one in the parent class. This mechanism enables a subclass to specialize or completely replace the behavior inherited from its parent.

## Why it matters
Method overriding is the primary mechanism for implementing polymorphism, a core OOP principle. In physics simulations, you might have a base `CelestialBody` class with a method `calculateGravitationalForce()`. A `Star` subclass would override this to account for its massive gravity, while a `Planet` subclass would have its own implementation, and a `BlackHole` subclass would override it to use equations from general relativity. This allows you to write generic code that operates on any `CelestialBody` object, and the correct, specific physics calculation is automatically used at runtime.

## When to study it
You must have a solid grasp of **inheritance** and the concept of a **class hierarchy** (superclass/subclass, or parent/child relationships). You should also understand **method signatures** (the combination of a method's name and its parameter types). Without these, the distinction between overriding and overloading will be unclear, and the purpose of overriding will be lost.

## How to study it (step by step)
1.  **Code a simple inheritance hierarchy.** Create a `Vehicle` class with a `start_engine()` method that prints "Generic engine starts." Then create a `Car` subclass that inherits from `Vehicle` but does not override the method. Instantiate `Car` and call `start_engine()` to confirm it inherits the generic behavior.
2.  **Implement your first override.** In the `Car` class, add a new `start_engine()` method that prints "Car engine turns over... Vroom!" Instantiate `Car` again and call the method. Observe that the specialized version is called, not the generic one.
3.  **Explore the `super` keyword.** Create an `ElectricCar` subclass of `Car`. Override `start_engine()` again. Inside this new method, first call the parent's method using `super().start_engine()`, then add a line that prints "Silent electric motor engages." This shows how to *extend* parent behavior rather than just replacing it.
4.  **Connect to polymorphism.** Create a list containing instances of `Vehicle`, `Car`, and `ElectricCar`. Loop through the list, and for each element, call `start_engine()`. Notice how the *same line of code* produces different output depending on the *actual type* of the object at runtime. This is polymorphism in action.
5.  **Analyze a failure case.** Try to override `start_engine` in a subclass but change the parameter list (e.g., `start_engine(key_fob)`). Observe what happens. Most languages will treat this as a new method (method overloading), not an override. This highlights the importance of matching the method signature exactly.

## Key ideas, with intuition
1.  **Specialization, not Reinvention.** Inheritance gives you a blueprint (`superclass`). Overriding is like taking that blueprint and making a specific, necessary modification for a specialized model (`subclass`). You're not throwing the whole design away; you're refining one part of it. A `RocketEngine` class might have a `calculate_thrust()` method. A `ChemicalRocketEngine` subclass would override it with the Tsiolkovsky rocket equation, while an `IonEngine` subclass would use equations for electrostatic acceleration. The *concept* of calculating thrust is the same, but the *implementation* is specialized.

2.  **The "Is-A" Relationship Contract.** A subclass has an "is-a" relationship with its superclass (a `Car` is-a `Vehicle`). This implies a behavioral contract. If the `Vehicle` class promises a `start_engine()` method, every subclass of `Vehicle` must also honor that promise. Overriding ensures the promise is kept, but allows the subclass to fulfill it in its own way. The caller of the method doesn't need to know the specific type of vehicle, only that it can, in fact, start its engine.

3.  **Dynamic Dispatch (Late Binding).** This is the "how." When you call a method on an object, the program doesn't decide which version of the method to run when you *compile* the code. Instead, it waits until the program is *running*. It inspects the object's actual type at that moment and "dispatches" the call to the appropriate method—either the one in the base class or the overridden one in the subclass. This is why the loop in step 4 of "How to study it" works.

## Worked example
Let's model a simple particle simulation system. We have a base particle and a special type of particle that experiences relativistic effects.

**1. Define the Base Class:**
We start with a generic `Particle`. It has mass and velocity, and a method to calculate its kinetic energy using the classical formula, $E_k = \frac{1}{2}mv^2$.

```python
class Particle:
    def __init__(self, mass_kg, velocity_mps):
        self.mass = mass_kg  # mass in kilograms
        self.velocity = velocity_mps  # velocity in meters per second

    def get_kinetic_energy(self):
        """Calculates classical kinetic energy."""
        return 0.5 * self.mass * self.velocity**2
```

**2. Define the Subclass and Override the Method:**
Now, we define a `RelativisticParticle`. It "is-a" `Particle`, but its kinetic energy calculation must account for relativity. The total energy is $E = \gamma mc^2$, and kinetic energy is $E_k = E - E_0 = (\gamma - 1)mc^2$, where $\gamma = 1 / \sqrt{1 - (v/c)^2}$.

```python
import math

C = 299792458  # Speed of light in m/s

class RelativisticParticle(Particle):
    def __init__(self, mass_kg, velocity_mps):
        # Use super() to call the parent's __init__ method
        super().__init__(mass_kg, velocity_mps)

    # Override the parent's method
    def get_kinetic_energy(self):
        """Calculates relativistic kinetic energy."""
        if self.velocity >= C:
            return float('inf') # Cannot reach or exceed speed of light
        
        gamma = 1 / math.sqrt(1 - (self.velocity**2 / C**2))
        rest_energy = self.mass * C**2
        total_energy = gamma * rest_energy
        return total_energy - rest_energy
```

**3. Demonstrate Polymorphism:**
We can now treat both types of particles uniformly in our code.

```python
# Create instances
classical_p = Particle(mass_kg=1, velocity_mps=1000)
relativistic_p = RelativisticParticle(mass_kg=1, velocity_mps=150000000) # ~0.5c

# Store them in a list of their common base type
particles = [classical_p, relativistic_p]

# The same method call yields different results
for p in particles:
    # The Python interpreter performs dynamic dispatch here.
    # It checks the actual type of 'p' at runtime.
    energy = p.get_kinetic_energy()
    print(f"Particle of type {type(p).__name__} has kinetic energy: {energy:.2e} Joules")
```
**Output:**
```
Particle of type Particle has kinetic energy: 5.00e+05 Joules
Particle of type RelativisticParticle has kinetic energy: 1.16e+16 Joules
```

**Reflection:**
*   **Step 1** established the general contract: all `Particle` objects have a `get_kinetic_energy` method.
*   **Step 2** provided a specialized implementation for a subclass that needed different physics. We used the `@override` decorator (in languages that support it) or simply matched the signature to signal our intent. We also used `super().__init__` to avoid rewriting the constructor logic.
*   **Step 3** showed the power of overriding. The `for` loop doesn't know or care if `p` is a `Particle` or a `RelativisticParticle`. It just calls `p.get_kinetic_energy()`, and the runtime system ensures the correct version is executed, demonstrating polymorphism.

## Diagrams
Here is a class hierarchy diagram showing the relationship.

```text
       +-----------------+
       |     Vehicle     |
       +-----------------+
       | - speed         |
       +-----------------+
       | + start_engine()|
       +-----------------+
              ^
              | (Inheritance: "is-a")
     +--------+--------+
     |                 |
+----------+      +------------------+
|   Car    |      |   ElectricCar    |
+----------+      +------------------+
|          |      | - battery_level  |
+----------+      +------------------+
| + start_engine()|-->| + start_engine() |
+----------+      +------------------+
     (Overrides)          (Overrides and calls super)
```
This diagram shows that `Car` and `ElectricCar` both inherit from `Vehicle`. The arrow from the subclass `start_engine()` method back to the parent's method indicates that the method is being overridden.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a military chain of command. A **General (Superclass)** issues a generic order: `executeManeuver()`.
    *   The **Infantry Captain (Subclass 1)** receives this order and implements it as "Find cover and lay down suppressing fire."
    *   The **Tank Commander (Subclass 2)** receives the same order and implements it as "Advance to waypoint and engage armor."
    The *order* (method signature) is identical, but the *execution* (method implementation) is specialized to the unit. This is method overriding. You're overriding the general's generic plan with a specific, more effective one.

2.  **Must-Overlearn Facts:**
    *   To override, the method in the subclass must have the **exact same name and parameter list** as the method in the superclass.
    *   The return type must be the same or a subtype of the superclass method's return type (this is called covariance).
    *   Use `super().method_name()` to call the parent class's version of the method from within the subclass's overridden method.

3.  **Spaced Repetition Schedule:**
    *   Review this concept in **1 day**: Re-implement the `Vehicle` example from scratch.
    *   **3 days**: Explain the "General's Orders" analogy to a friend or rubber duck.
    *   **7 days**: Design a class hierarchy for different types of `Sensors` (`TemperatureSensor`, `PressureSensor`) and decide which methods (`read_value`, `calibrate`) should be overridden.
    *   **16 days**: Reread the "Common Mistakes" section and write code that makes each mistake, then fix it.
    *   **35 days**: Write a short paragraph explaining the relationship between method overriding and polymorphism.

4.  **First Principles Pathway:** If you forget the details, rebuild from the "is-a" relationship. A `Car` *is-a* `Vehicle`. If I have a collection of `Vehicle`s, I want to be able to tell each one to `start_engine()` without needing to know if it's a `Car`, `Boat`, or `Plane`. For this to work, there must be a mechanism for the specific *object* to decide how to execute that command. That mechanism is method overriding, which requires a consistent command signature so the caller knows what to say.

## Common mistakes
1.  **Accidental Overloading:** Changing the method signature (e.g., adding a parameter) in the subclass. This creates a *new* method that is distinct from the parent's; it doesn't override it. The parent's method is still inherited and can be called if you use the original signature.
2.  **Breaking the Liskov Substitution Principle:** The overridden method should fulfill the "contract" of the superclass method. For example, if `Vehicle.move()` is supposed to move the vehicle forward, `Car.move()` shouldn't make it move backward. The subclass method should do something semantically consistent with the parent method.
3.  **Forgetting to Call `super()`:** When you only want to *add* to the parent's behavior, not completely replace it, a common mistake is to rewrite all the parent's logic in the subclass. Always call `super().method()` first if you need to build upon the existing functionality.

## Self-check
1.  Consider the following code. Is `calculate_force` in `WeightedBox` overriding or overloading the method from `Box`? Why? What would be the output of `wbox.calculate_force()`?
    ```python
    class Box:
        def __init__(self, mass):
            self.mass = mass
        def calculate_force(self):
            return self.mass * 9.81

    class WeightedBox(Box):
        def calculate_force(self, gravity=9.81):
            return self.mass * gravity

    wbox = WeightedBox(10)
    # What does wbox.calculate_force() output?
    ```
2.  Design a class hierarchy for a program that simulates stellar evolution. Start with a base class `Star`. What attributes would it have? What methods would you include? Now, design two subclasses, `MainSequenceStar` and `RedGiant`. Which methods from `Star` would you need to override in these subclasses and why?
3.  Given the setup from the "Worked Example" section, predict the output of the following code and justify your prediction step-by-step by explaining the concept of dynamic dispatch.
    ```python
    p1 = RelativisticParticle(mass_kg=1e-27, velocity_mps=2.99e8) # An electron at ~0.997c
    p2 = Particle(mass_kg=1e-27, velocity_mps=2.99e8)
    
    # Note that p2 is a base Particle, but given a relativistic velocity.
    
    particles = [p1, p2]
    for p in particles:
        print(f"{p.get_kinetic_energy():.2e}")
    ```