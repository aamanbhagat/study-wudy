## What it is
Composition and inheritance are two fundamental ways to create relationships between classes in object-oriented programming. Inheritance models an "is-a" relationship, where a specialized class is a specific type of a more general class. Composition models a "has-a" relationship, where a complex object is built from, or contains, other objects.

## Why it matters
This choice is central to designing robust, flexible software. In aerospace simulations, a `CrewDragon` *is-a* `Spacecraft` (inheritance), but it *has-a* `LifeSupportSystem` and an array of `DracoThruster` objects (composition). Choosing composition allows you to swap out the thruster model without changing the `CrewDragon` class, promoting modularity and reuse, which is critical for complex systems like flight software or machine learning pipelines where models are composed of different layers.

## When to study it
You must be comfortable with the basics of object-oriented programming first. Specifically, you need to understand:
1.  **Classes and Objects:** The blueprint vs. the instance.
2.  **Constructors:** How an object is initialized (e.g., `__init__` in Python).
3.  **Instance Variables (Attributes):** Data that belongs to a specific object.
4.  **Methods:** Functions that belong to a class.

If you are not solid on these, pause and review them.

## How to study it (step by step)
1.  **Code a simple "is-a" relationship.** Create a base class `PropulsiveElement`. Then, create two child classes, `SolidRocketMotor` and `LiquidRocketEngine`, that inherit from it. Both will share a `thrust_newtons` attribute from the parent but might have different methods, like `ignite()` for the solid and `throttle(percentage)` for the liquid.
2.  **Code a simple "has-a" relationship.** Create an `Engine` class with a `throttle` method. Then create a `LaunchVehicle` class. In the `LaunchVehicle`'s constructor (`__init__`), create an instance of the `Engine` class and assign it to an attribute, e.g., `self.first_stage_engine = Engine()`.
3.  **Access the functionality.** For the "is-a" example, you can call `my_liquid_engine.ignite()` if `ignite` is defined in the parent. For the "has-a" example, you must go through the container object: `my_rocket.first_stage_engine.throttle(100)`. Notice the explicit delegation.
4.  **Test for flexibility.** Modify your `LaunchVehicle` class to accept an *already created* engine object in its constructor: `def __init__(self, engine_object): self.engine = engine_object`. Now you can build a `LaunchVehicle` with different engine types at runtime. This demonstrates the power of composition.
5.  **Read about the principle: "Favor composition over inheritance."** Search for this phrase and read one or two articles. Internalize why composition often leads to more flexible, less coupled designs than inheritance. Inheritance creates a very strong, often rigid, link between classes.

## Key ideas, with intuition
1.  **Inheritance ("is-a"): A Taxonomy Relationship.** This is about classification. A `Square` *is-a* `Rectangle`. A `Falcon9` *is-a* `Rocket`. This relationship is static and defined at the time you write the code. It creates a tight coupling between the parent and child; changes to the parent can break the child. Use it when a subclass truly is a subtype of the superclass and can be used anywhere the superclass is expected (Liskov Substitution Principle).
    $$
    \text{class Child(Parent): ...}
    $$
2.  **Composition ("has-a"): A Construction Relationship.** This is about assembly. A `Car` *has-a* `Engine`. A `Computer` *has-a* `CPU`. The `Car` object contains an `Engine` object and can delegate tasks to it (e.g., `car.start()` might call `car.engine.ignite()`). This is a looser coupling; the `Car` only needs to know the public interface of the `Engine`, not how it works internally.
    $$
    \text{class Car:}\\
    \quad \text{def __init__(self):}\\
    \quad\quad \text{self.engine = Engine()}
    $$
3.  **Flexibility at Runtime.** With composition, you can change the components of an object after it has been created. You could design a `Car` with a `swap_engine()` method. You cannot change the parent class of an object at runtime; inheritance is fixed when the program is compiled or interpreted.

## Worked example
Let's model a spacecraft. A spacecraft *has-a* guidance system. A crewed spacecraft *is-a* type of spacecraft.

**Step 1: Define the component class.**
This is the "part" in the "has-a" relationship.

```python
# The component class
class InertialMeasurementUnit:
    """A simple IMU class to track orientation."""
    def __init__(self):
        self.orientation_quaternion = (1.0, 0.0, 0.0, 0.0) # (w, x, y, z)

    def get_orientation(self):
        print(f"IMU reports orientation: {self.orientation_quaternion}")
        return self.orientation_quaternion
```
*Reflection:* We've created a self-contained component. It manages its own state (`orientation_quaternion`) and provides a clear interface (`get_orientation`).

**Step 2: Define the base container class using composition.**
This class will contain the component.

```python
# The base container class ("has-a")
class Spacecraft:
    """A generic spacecraft."""
    def __init__(self, name):
        self.name = name
        # Composition: The Spacecraft HAS-A InertialMeasurementUnit.
        self.guidance_system = InertialMeasurementUnit()

    def report_status(self):
        print(f"Status for {self.name}:")
        # Delegation: The Spacecraft asks its component to do the work.
        self.guidance_system.get_orientation()
```
*Reflection:* The `Spacecraft` class doesn't know *how* the orientation is calculated. It just knows it *has-a* guidance system that it can query. This is loose coupling.

**Step 3: Define a specialized class using inheritance.**
This class will be a specific *type* of the base class.

```python
# The specialized class ("is-a")
class CrewCapsule(Spacecraft):
    """A spacecraft that IS-A Spacecraft, but with crew capacity."""
    def __init__(self, name, crew_capacity):
        # Call the parent class's constructor
        super().__init__(name)
        self.crew_capacity = crew_capacity

    def report_status(self):
        # Override the parent method to add more info
        super().report_status() # Call the parent's method first
        print(f"Crew capacity: {self.crew_capacity} astronauts")
```
*Reflection:* `CrewCapsule` inherits all the functionality of `Spacecraft`, including the composed `guidance_system`. We didn't need to redefine it. We then specialized the behavior by adding a `crew_capacity` and augmenting the `report_status` method.

**Step 4: Use the classes.**

```python
# Create and use an instance of the specialized class
dragon = CrewCapsule(name="Dragon Endeavour", crew_capacity=4)
dragon.report_status()

# Output:
# Status for Dragon Endeavour:
# IMU reports orientation: (1.0, 0.0, 0.0, 0.0)
# Crew capacity: 4 astronauts
```
*Reflection:* This example shows both relationships working together. `CrewCapsule` *is-a* `Spacecraft`, and every `Spacecraft` *has-a* `InertialMeasurementUnit`. This is a common and powerful pattern.

## Diagrams

**Inheritance ("is-a")**
The arrow means "inherits from" or "is a type of".

```text
+----------------+
|   Spacecraft   |
+----------------+
| - name         |
| + report_status()|
+----------------+
       ^
       |
       | is-a
       |
+----------------+
|  CrewCapsule   |
+----------------+
| - crew_capacity|
| + report_status()|
+----------------+
```

**Composition ("has-a")**
The line with a diamond means "contains" or "has a".

```text
+----------------+<>------>+--------------------------+
|   Spacecraft   |         |  InertialMeasurementUnit |
+----------------+         +--------------------------+
| - name         |         | - orientation_quaternion |
| - guidance_system|         | + get_orientation()      |
| + report_status()|         +--------------------------+
+----------------+
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of LEGOs vs. Animals.
    *   **Composition is LEGOs:** You build a complex model (a car) by **composing** it from simpler, independent bricks (wheels, chassis, engine block). The car *has-a* wheel. You can swap the wheels for different ones.
    *   **Inheritance is Animals:** A `Poodle` *is-a* `Dog`. A `Dog` *is-a* `Canine`. This is a biological taxonomy. You can't swap out the "dog-ness" of a poodle. It's a fundamental, unchangeable classification.

2.  **Formulas to Overlearn:**
    *   Inheritance: `class Child(Parent): ...`  (Think: "Child is-a Parent")
    *   Composition: `class Container: def __init__(self): self.component = Component()` (Think: "Container has-a Component")
    *   Guiding Principle: "Favor composition over inheritance."

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in: **1 day**.
    *   Re-implement the worked example from scratch in: **3 days**.
    *   Explain the LEGOs vs. Animals analogy to a friend (or a rubber duck) in: **7 days**.
    *   Find an example of composition in a library you use and analyze it in: **16 days**.
    *   Write a new, complex example combining both in: **35 days**.

4.  **First Principles Pathway:** If you're ever confused, stop and ask the fundamental question in plain English: "Is object A a *specialized version* of object B, or is object A *built using* object B?" The answer dictates the relationship. The syntax is just the implementation of that decision.

## Common mistakes
1.  **Using Inheritance for Code Reuse:** The most common trap. You have a `Logger` class that writes to a file. You need a `Rocket` class that needs logging. You might be tempted to make `Rocket` inherit from `Logger` just to get the logging methods. This is wrong. A `Rocket` is not a type of `Logger`. The correct design is that a `Rocket` *has-a* `Logger` instance.
2.  **The Brittle Base Class Problem:** With inheritance, if you have a deep hierarchy (`A` inherits from `B`, which inherits from `C`...), a change in the base class `C` can ripple down and break `A` in unexpected ways. Composition isolates objects from each other, preventing this.
3.  **Violating the Liskov Substitution Principle (LSP):** A famous example is making `Square` inherit from `Rectangle`. A `Rectangle` has a `set_width` and `set_height` method. If you call `rect.set_width(5)` and `rect.set_height(10)`, you expect the width to be 5 and height to be 10. For a `Square` instance, `set_width(5)` must also set the height to 5. This breaks the expectation of how a `Rectangle` behaves, violating LSP. This signals that inheritance was the wrong tool here.

## Self-check
1.  You are modeling a `Human` and a `Heart`. What is the primary relationship between them? Write the Python class skeletons to represent this.
2.  You are modeling a university's personnel. You have the concepts of `Person`, `Student`, `Professor`, and `TeachingAssistant`. A `Student` is a `Person`, a `Professor` is a `Person`. A `TeachingAssistant` is both a `Student` and has duties like a `Professor`. How would you model these relationships? Draw a diagram and justify your use of inheritance and/or composition.
3.  You are designing a video game. You have a `Character` class. You want characters to have different abilities, like `Flyable`, `Swimmable`, `MagicUser`. A single character might have one, two, or all of these abilities, and you want to be able to add or remove abilities during the game. Is inheriting from `FlyableCharacter` a good design? Why or why not? Propose a better design using the principles discussed.