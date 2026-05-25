## What it is
An **instance attribute** is a variable that belongs to a single, specific object (an instance of a class); its value is unique to that object. A **class attribute** is a variable that is shared among all instances of a class; if you change its value, the change is reflected across all objects of that class.

## Why it matters
This distinction is fundamental for managing state in complex systems. In aerospace simulations, a `Rocket` class might have a class attribute for the gravitational constant, $g = 9.81 \, \text{m/s}^2$, since it's the same for all rockets near Earth. However, each rocket instance would have its own instance attributes for `current_fuel` and `velocity`, as these are unique to each vehicle. In machine learning, a neural network layer class might share a default activation function (class attribute) while each instance has its own unique weight matrix (instance attribute).

## When to study it
You must understand the basics of classes and objects before tackling this. Specifically, you should be able to:
1.  Define a class using the `class` keyword.
2.  Instantiate an object from a class (e.g., `my_object = MyClass()`).
3.  Understand the purpose and use of the `__init__` method and the `self` parameter.

If these concepts are not solid, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Code the simplest case:** Write a `Vector` class. In `__init__`, define two instance attributes: `self.x` and `self.y`. Create two `Vector` objects, `v1` and `v2`, with different values. Use `print(v1.x, v2.x)` to prove their `x` values are independent.
2.  **Introduce a class attribute:** Add `dimensions = 2` directly under the `class Vector:` line, outside of any method. Print `Vector.dimensions`, `v1.dimensions`, and `v2.dimensions`. Observe that they are all the same.
3.  **Demonstrate shared state:** Change the class attribute via the class: `Vector.dimensions = 3`. Now, re-print `v1.dimensions` and `v2.dimensions`. Notice that both instances now see the new value. This is the core behavior of a class attribute.
4.  **Demonstrate shadowing:** Now, assign a value to the attribute on just one instance: `v1.dimensions = "2D"`. Print `v1.dimensions`, `v2.dimensions`, and `Vector.dimensions`. You will see that `v1` now has its *own* instance attribute called `dimensions` which "shadows" or hides the class attribute. `v2` is unaffected.
5.  **Explore namespaces:** Use the built-in `vars()` function. Print `vars(v1)`, `vars(v2)`, and `vars(Vector)`. This will explicitly show you which attributes live in the instance's namespace versus the class's namespace. You'll see `'dimensions': '2D'` inside `vars(v1)` but not `vars(v2)`.
6.  **Refactor for a use case:** Create a `Satellite` class. It should have a class attribute `ORBITAL_DECAY_RATE_PER_DAY_KM = 0.1`. It should have instance attributes for `id` and `current_altitude_km`. Write a method `pass_one_day()` that updates the instance's altitude using the shared decay rate. This solidifies the "why."

## Key ideas, with intuition
1.  **Blueprint vs. Building:** Think of a class as an architect's blueprint for a house. A **class attribute** is a note written on the blueprint itself, like "All houses must use copper pipes." Every house built from this blueprint will have copper pipes. An **instance attribute** is a feature of a specific house, like its street address or the color of its front door. Changing the door color of one house doesn't change the others.

2.  **Shared vs. Owned:** Class attributes are *shared* data. Instance attributes are *owned* data. If you have a counter for how many objects of a class have been created, that counter should be a class attribute because it relates to the class as a whole, not any single instance.

3.  **The Lookup Chain:** When you write `my_object.my_attribute`, Python follows a strict search order:
    $$
    \text{Instance Namespace} \rightarrow \text{Class Namespace} \rightarrow \text{Parent Class(es) Namespace}
    $$
    It first checks if `my_object` has its own personal `my_attribute`. If it finds it, it stops. If not, it checks the object's class for a shared `my_attribute`. This is why an instance attribute can "shadow" a class attribute of the same name.

## Worked example
Let's model probes in a deep space network. All probes are made by one agency, but each has a unique name and mission status.

```python
class DeepSpaceProbe:
    # Class attribute: shared by all probes
    MANUFACTURING_AGENCY = "Jet Propulsion Laboratory"

    def __init__(self, name: str):
        # Instance attributes: unique to each probe
        self.name = name
        self.status = "Nominal"
        print(f"Probe '{self.name}' commissioned by {self.MANUFACTURING_AGENCY}.")

    def update_status(self, new_status: str):
        print(f"'{self.name}' status changing from '{self.status}' to '{new_status}'.")
        self.status = new_status

# Step 1: Create two instances of the class.
voyager1 = DeepSpaceProbe("Voyager 1")
juno = DeepSpaceProbe("Juno")

# Step 2: Access attributes on both instances.
# Note they have unique names but share the agency.
print(f"\n{voyager1.name}'s agency: {voyager1.MANUFACTURING_AGENCY}")
print(f"{juno.name}'s agency: {juno.MANUFACTURING_AGENCY}")
print(f"{voyager1.name}'s status: {voyager1.status}")

# Step 3: Modify an instance attribute on one object.
voyager1.update_status("Entering Interstellar Space")

# Step 4: Verify that the other instance is unaffected.
print(f"\nStatus check:")
print(f"- {voyager1.name}: {voyager1.status}")
print(f"- {juno.name}: {juno.status}  <-- Unchanged")

# Step 5: Modify the class attribute directly on the class.
# This might happen if the agency is rebranded.
DeepSpaceProbe.MANUFACTURING_AGENCY = "JPL / Caltech"
print("\nAgency has been rebranded.")

# Step 6: Verify the change is reflected in ALL instances.
print(f"- {voyager1.name}'s new agency: {voyager1.MANUFACTURING_AGENCY}")
print(f"- {juno.name}'s new agency: {juno.MANUFACTURING_AGENCY}")
```

**Reflection:**
-   **Step 1 & 2:** We defined `MANUFACTURING_AGENCY` at the class level because it's a constant fact about all probes. `name` and `status` were defined in `__init__` with `self` because they are specific to each probe instance.
-   **Step 3 & 4:** Modifying `voyager1.status` only affected `voyager1`, proving it's an instance attribute.
-   **Step 5 & 6:** Modifying `DeepSpaceProbe.MANUFACTURING_AGENCY` affected both `voyager1` and `juno` because they don't have their *own* `MANUFACTURING_AGENCY` attribute; they look it up from their shared class blueprint.

## Diagrams
Here is the memory layout for the `DeepSpaceProbe` example after Step 2.

```text
            +---------------------------------+
            |       Class: DeepSpaceProbe     |
            |---------------------------------|
            | Class Attribute:                |
            |   MANUFACTURING_AGENCY: "JPL"   |
            |---------------------------------|
            | Methods:                        |
            |   __init__                      |
            |   update_status                 |
            +---------------------------------+
                         ^
                         | .__class__
           +-------------+-------------+
           |                           |
+--------------------------+  +--------------------------+
|  Instance: voyager1      |  |  Instance: juno          |
|--------------------------|  |--------------------------|
| Instance Attributes:     |  | Instance Attributes:     |
|   name: "Voyager 1"      |  |   name: "Juno"           |
|   status: "Nominal"      |  |   status: "Nominal"      |
+--------------------------+  +--------------------------+
```
The instances `voyager1` and `juno` each have their own memory for their instance attributes. Both contain a hidden pointer (`.__class__`) to the single `DeepSpaceProbe` class object, where the shared `MANUFACTURING_AGENCY` attribute resides.

## Memory technique — remember this forever
1.  **Mnemonic Story:** Think of a **Class** as a **Kingdom**.
    *   The **Class Attribute** is the **Kingdom's Law** (e.g., "Everyone pays 10% tax"). It's written in the central law book and applies to all citizens.
    *   An **Instance** is a **Citizen** of that kingdom.
    *   An **Instance Attribute** is a **Citizen's personal property** (e.g., their name, their house). It belongs only to them. If one citizen paints their house red, other houses are not affected.

2.  **Must-know facts:**
    *   Class attribute: `class MyClass: my_var = 10`
    *   Instance attribute: `def __init__(self): self.my_var = 10`
    *   Lookup order: `instance` first, then `class`.

3.  **Spaced Repetition Schedule:** Review this concept and re-code the `DeepSpaceProbe` example from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days**. Do not skip this.

4.  **First Principles Derivation:** If you ever forget, open a Python interpreter.
    ```python
    class Test:
        class_attr = 'shared'
        def __init__(self, val):
            self.inst_attr = val
    
    t1 = Test(1)
    t2 = Test(2)
    
    # Now, inspect everything.
    print(f"t1 has instance data: {vars(t1)}")
    print(f"t2 has instance data: {vars(t2)}")
    print(f"The class has data: {vars(Test)}")
    
    # Test the lookup
    print(f"t1.inst_attr is {t1.inst_attr}") # Should be 1
    print(f"t1.class_attr is {t1.class_attr}") # Should be 'shared'
    
    # Test modification
    Test.class_attr = 'new shared'
    print(f"Now t1.class_attr is {t1.class_attr}") # Should be 'new shared'
    ```
    This simple experiment reconstructs all the core behaviors from scratch.

## Common mistakes
1.  **Modifying a mutable class attribute via an instance.** If a class attribute is a list (e.g., `my_list = []`), and you write `my_instance.my_list.append(5)`, you are modifying the *single shared list*. This change will be visible to all other instances, which is often a surprise and a source of bugs.
2.  **Accidental shadowing.** Intending to change a class-level counter (`MyClass.counter += 1`) but accidentally writing `self.counter += 1`. This creates a new instance attribute `counter` for that one object, leaving the class attribute unchanged and breaking the shared counter.
3.  **Confusing class data with instance defaults.** Defining a complex object like a dictionary as a class attribute to serve as a "default" for an instance attribute. If any instance modifies that dictionary, it modifies it for all future instances, because they all get a reference to the same dictionary. The correct pattern is to create a *new* dictionary inside `__init__`.

## Self-check
1.  What will be the output of the following code?
    ```python
    class Car:
        wheels = 4 # Class attribute
        def __init__(self, color):
            self.color = color # Instance attribute

    car1 = Car("Red")
    car2 = Car("Blue")
    Car.wheels = 3
    print(f"{car1.color}, {car1.wheels}")
    print(f"{car2.color}, {car2.wheels}")
    ```
2.  After the following code runs, what are the values of `s1.data`, `s2.data`, and `Server.data`?
    ```python
    class Server:
        data = "Class Data"
        
    s1 = Server()
    s2 = Server()
    s1.data = "Instance 1 Data"
    ```
3.  Implement a `Star` class for an astrophysics simulation. It should keep track of how many `Star` objects have been created. This counter should be accessible via the class itself (e.g., `Star.star_count`). Each star instance should also have its own unique `mass` in solar masses. Demonstrate your class by creating three stars and then printing the total count.