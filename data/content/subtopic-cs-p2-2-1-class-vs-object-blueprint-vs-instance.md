## What it is
A **class** is a blueprint or template that defines the properties (attributes) and behaviors (methods) that a certain type of entity will have. An **object** is a specific, concrete instance created from that class blueprint, with its own unique state (values for its attributes) and access to the shared behaviors. In short, a class defines a concept, while an object is a tangible realization of that concept.

## Why it matters
This distinction is the bedrock of object-oriented programming, which is used to model complex systems. In physics simulations, you might define a `CelestialBody` class; Earth, Mars, and Jupiter would be distinct objects of this class, each with its own mass, velocity, and position. In aerospace guidance systems, a `KalmanFilter` class could be instantiated into multiple, independent filter objects, each tracking a different state variable (e.g., one for position, one for orientation).

## When to study it
Before tackling this, you must have a firm grasp of basic procedural programming concepts. Specifically, you should understand:
1.  **Data Types:** What `int`, `string`, `float`, etc., are. A class is essentially a custom, user-defined data type.
2.  **Variables:** How to declare, assign, and use variables to store data. Object attributes are like variables scoped to that object.
3.  **Functions/Procedures:** How to define and call functions that encapsulate a piece of logic. Class methods are functions bound to a class.

If these are not solid, pause and review them.

## How to study it (step by step)
1.  **Write the Blueprint:** In a language like Python, define a simple class `Point` that represents a point in 2D space. Give it two attributes, `x` and `y`. Do not create any objects yet. Just write the `class Point: ...` block.
2.  **Instantiate One Object:** Create a single instance of your `Point` class. For example: `p1 = Point()`. Use a `print()` statement to see what `p1` is. Notice that the output tells you it's a `Point` object at a specific memory address.
3.  **Set its State:** Assign values to the attributes of your object: `p1.x = 10` and `p1.y = 20`. Print these values to confirm they are stored.
4.  **Instantiate a Second Object:** Create another instance: `p2 = Point()`. Assign different values to its attributes, like `p2.x = -3` and `p2.y = 5`.
5.  **Verify Independence:** Print the attributes of both `p1` and `p2`. Observe that changing the state of `p2` had zero effect on `p1`. They are separate entities in memory, built from the same blueprint.
6.  **Add Behavior:** Modify the `Point` class to include a method, for example, `distance_from_origin()`, that calculates $\sqrt{x^2 + y^2}$.
7.  **Call the Behavior:** Call this new method on both of your objects: `p1.distance_from_origin()` and `p2.distance_from_origin()`. Observe that the *same* method logic operates on the *different* state of each object to produce a different result.

## Key ideas, with intuition
1.  **Blueprint vs. Building:** This is the core analogy. An architect's blueprint for a house is the **class**. It defines the number of rooms, the square footage, and the style. The actual houses built from that blueprint are the **objects**. You can build many houses from one blueprint; each is a distinct house at a different address, and you can paint them different colors (i.e., give them different state).

2.  **State (Attributes) & Behavior (Methods):** A class bundles data and the functions that operate on that data.
    *   **State:** The data an object holds. For a `Rocket` class, attributes could be `fuel_mass`, `dry_mass`, and `thrust`. Each rocket *object* will have its own values for these.
    *   **Behavior:** The actions an object can perform. For the `Rocket` class, a method could be `calculate_delta_v()`. The *logic* for this calculation is defined once in the class, but when you call it on a specific rocket object, it uses that object's unique `fuel_mass` and `dry_mass`.

3.  **Identity:** Every object has a unique identity, separate from its state. If we create two `Point` objects, `p1` and `p2`, and set both of their coordinates to $(3, 4)$, they are still two different objects that happen to have the same state. They exist at different memory addresses.
    $$
    p_1 \neq p_2 \quad \text{even if} \quad (p_1.x = p_2.x \text{ and } p_1.y = p_2.y)
    $$
    This is like two identical copies of a book. They have the same text (state), but they are physically distinct objects (identity).

## Worked example
Let's model a 3D vector, a fundamental concept in physics.

**Step 1: Define the Class (The Blueprint)**
We'll create a `Vector3D` class in Python. It needs attributes for its components `x`, `y`, and `z`, and a behavior to calculate its magnitude. The `__init__` method is a special "constructor" that runs when an object is created.

```python
import math

class Vector3D:
    # This is the constructor. It's called when we create a new object.
    # 'self' refers to the specific instance being created.
    def __init__(self, x_component, y_component, z_component):
        print(f"Creating a Vector3D object at {id(self)}...")
        self.x = x_component
        self.y = y_component
        self.z = z_component

    # This is a method (behavior).
    def magnitude(self):
        # This method uses the object's own state (self.x, self.y, self.z).
        return math.sqrt(self.x**2 + self.y**2 + self.z**2)
```
*Reflection:* This code block defines the *idea* of a 3D vector. It doesn't represent any specific vector yet; it just specifies that any `Vector3D` *must* have x, y, and z components and *can* have its magnitude calculated.

**Step 2: Instantiate Objects (The Instances)**
Now, let's create two different `Vector3D` objects from this class.

```python
# Create the first instance, representing a position vector.
position_vector = Vector3D(3, 4, 0)

# Create the second instance, representing a velocity vector.
velocity_vector = Vector3D(0, 10, -5)
```
*Reflection:* This is the act of "building from the blueprint." We called the `Vector3D` class twice, passing different arguments to its `__init__` constructor. The output from the `print` statement inside `__init__` confirms that two distinct objects were created at different memory locations (`id(self)`).

**Step 3: Use the Objects**
Let's access their state and behavior.

```python
# Accessing state (attributes)
print(f"Position vector components: ({position_vector.x}, {position_vector.y}, {position_vector.z})")
print(f"Velocity vector components: ({velocity_vector.x}, {velocity_vector.y}, {velocity_vector.z})")

# Calling behavior (methods)
pos_mag = position_vector.magnitude()
vel_mag = velocity_vector.magnitude()

print(f"Magnitude of position vector (distance): {pos_mag:.2f}")
print(f"Magnitude of velocity vector (speed): {vel_mag:.2f}")
```
*Reflection:* We used dot notation (`.`) to access the unique attributes of each object. We also called the `magnitude` method on each. Notice how the *same* `magnitude` code from the class definition produced different results because it operated on the different internal states of `position_vector` and `velocity_vector`.

## Diagrams
Here is an ASCII diagram illustrating the concept. The Class is the template on the left. The Objects are the concrete instances in memory on the right, each with its own values.

```text
+-----------------------+      (instantiation)      +-----------------------------+
|      CLASS            |                           |      OBJECT: rocket_1       |
|    Rocket             |                           |      (instance of Rocket)   |
|-----------------------|                           |-----------------------------|
|                       |                           | ATTRIBUTES (State)          |
| ATTRIBUTES:           |        +----------------> |   name: "Falcon 9"          |
|   name (string)       |        |                  |   thrust_kN: 7607           |
|   thrust_kN (float)   |        |                  |   height_m: 70.0            |
|   height_m (float)    |        |                  +-----------------------------+
|                       |        |
|-----------------------|        |                  +-----------------------------+
|                       |        |                  |      OBJECT: rocket_2       |
| METHODS:              |        |                  |      (instance of Rocket)   |
|   launch()            |        |                  |-----------------------------|
|   get_TWR()           |--------+                  | ATTRIBUTES (State)          |
|                       |                           |   name: "Saturn V"          |
+-----------------------+                           |   thrust_kN: 35100          |
    (Blueprint in code)                             |   height_m: 110.6           |
                                                    +-----------------------------+
                                                       (Instances in memory)
```

## Memory technique — remember this forever
1.  **Mnemonic:** A **Class** is a **C**ookie **C**utter. An **Object** is the actual **O**utput, the cookie. You can make many cookies (objects) from one cutter (class), and you can decorate each one differently (give it a unique state).

2.  **Facts to Overlearn:**
    *   A class is a user-defined blueprint for an object.
    *   An object is a specific instance of a class.
    *   Syntax (Python): `my_object = MyClass(arguments)`

3.  **Spaced Repetition Schedule:** Review this concept and your own coded examples at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders.

4.  **First Principles Pathway:** If you forget, fall back to built-in types. In math, you have the *concept* of an integer. This is the "class". The specific numbers `5`, `-10`, and `42` are the "objects" or "instances" of that integer concept. A class is just you defining a new concept, and an object is you creating a specific value that fits that concept.

## Common mistakes
1.  **Trying to use the class as an object.** Writing `Vector3D.magnitude()` will fail. The `magnitude` method needs the `self.x`, `self.y`, and `self.z` data from a *specific instance*. You must call it on an object, like `position_vector.magnitude()`.
2.  **Confusing class variables with instance variables.** A class can have variables that are shared by all instances. A common mistake is to modify such a shared variable thinking you are only changing one object, when in fact you are changing it for all of them.
3.  **Forgetting `self`.** In many languages (like Python), methods must explicitly accept the instance itself as the first argument (conventionally named `self`). Forgetting it (`def magnitude():`) means the method won't know which object's data to operate on.

## Self-check
1.  Define a class named `Spaceship` with attributes for `name` (a string) and `fuel_percentage` (a float from 0.0 to 100.0). Create one instance of this class representing the "Endurance" with 75% fuel.
2.  Add a method to your `Spaceship` class called `use_fuel(amount)`. This method should decrease the `fuel_percentage` by `amount`. Create two spaceships, "Discovery One" and "Serenity", both with 100% fuel. Call `use_fuel(15)` on "Discovery One". Then print the fuel percentages for *both* ships to verify they are independent.
3.  Explain what would happen if `fuel_percentage` were defined as a *class attribute* (outside the `__init__` method) instead of an *instance attribute* (inside `__init__` using `self.`). Write the code to demonstrate the difference in behavior when you call `use_fuel` on one instance.