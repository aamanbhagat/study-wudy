## What it is
Polymorphism, from the Greek for "many forms," is the principle that a single interface can represent different underlying forms (data types). Duck typing is a specific implementation of this principle where an object's suitability for an operation is determined by the presence of certain methods and properties, rather than its explicit type. The name comes from the saying: "If it walks like a duck and it quacks like a duck, then it must be a duck."

## Why it matters
This concept is fundamental to writing flexible, reusable code. In aerospace simulations, a single physics engine function `update_position(body, dt)` can operate on any object (`Rocket`, `Satellite`, `Debris`) as long as it provides `.velocity` and `.position` attributes and an `.apply_force()` method. In machine learning, a training loop can work with different data loaders (e.g., for images, text, or tabular data) as long as each loader object provides a `__next__()` method to yield a batch of data.

## When to study it
You should be comfortable with the core concepts of Object-Oriented Programming first. Specifically, ensure you understand:
1.  **Classes and Objects:** The distinction between a blueprint (class) and an instance (object).
2.  **Methods and Attributes:** How to define and call functions (methods) and variables (attributes) that belong to a class.
3.  **Encapsulation:** The bundling of data and the methods that operate on that data into a single unit (the object).

If you cannot write a simple Python class from scratch, instantiate it, and call its methods, review that material first.

## How to study it (step by step)
1.  **Define two distinct classes.** Create a `Vector` class with a `magnitude()` method that returns its length. Create a `ComplexNumber` class with a `magnitude()` method that returns its modulus, $|a + bi| = \sqrt{a^2 + b^2}$. Note that these classes are completely unrelated by inheritance.
2.  **Write a generic function.** Create a function `print_magnitude(obj)` that takes a single argument `obj`, calls `obj.magnitude()`, and prints the result. This function has no knowledge of `Vector` or `ComplexNumber`.
3.  **Test the function with both types.** Create an instance of your `Vector` and pass it to `print_magnitude`. Then, create an instance of `ComplexNumber` and pass it to the *same function*. Observe that it works for both. This is the core phenomenon.
4.  **Induce an error.** Create a third class, `StringWrapper`, that does *not* have a `magnitude()` method. Pass an instance of it to `print_magnitude`. Observe the `AttributeError`. This demonstrates that the contract is the method's *name*, and failure to meet it results in a runtime error.
5.  **Reflect on the contract.** The `print_magnitude` function implicitly defines a contract or an "interface." Any object you pass to it *must* have a callable method named `magnitude`. The function doesn't care about the object's class, only its behavior.

## Key ideas, with intuition
1.  **Interface over Inheritance:** The key idea is that shared behavior does not require a shared ancestor. Two objects can be treated the same way if they expose the same interface (i.e., the same set of method names), regardless of their position in a class hierarchy. Think of a USB port: it doesn't care if you plug in a mouse, a keyboard, or a flash drive. As long as the device uses the USB interface correctly, the port can communicate with it.
2.  **Behavior Defines the Type:** In duck typing, what an object *is* is less important than what it *can do*. The set of methods an object responds to effectively defines its "type" in a given context. If an object has `.read()` and `.write()` methods, it can be treated as a file-like object, even if it's actually streaming data over a network socket.
3.  **Late Binding (Runtime Resolution):** The connection between the function call (`obj.magnitude()`) and the actual code that runs (`Vector.magnitude` or `ComplexNumber.magnitude`) is made at the very last moment—at runtime. The program doesn't know or care which specific method will be executed until it's time to actually do it. This provides immense flexibility, as you can add new objects that conform to the interface without changing the functions that use them.

## Worked example
Let's model a simple celestial mechanics simulation. We need a function to calculate the gravitational force between two bodies. The formula is $F = G \frac{m_1 m_2}{r^2}$. Our function will need objects that can provide their mass and position.

**Step 1: Define the function that relies on a specific interface.**
This function expects two objects, `body1` and `body2`. It doesn't care what class they are, only that they each have a `.mass` attribute (a float) and a `.position` attribute (a tuple or vector).

```python
import math

# Gravitational constant (simplified units)
G = 6.674e-11

def calculate_gravity(body1, body2):
    """Calculates the gravitational force magnitude between two bodies."""
    # This function expects any object with .mass and .position
    
    # 1. Get positions and masses by accessing the interface
    pos1 = body1.position
    pos2 = body2.position
    m1 = body1.mass
    m2 = body2.mass
    
    # 2. Calculate distance squared
    distance_sq = (pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2
    if distance_sq == 0:
        return float('inf') # Avoid division by zero
        
    # 3. Apply Newton's law of universal gravitation
    force = G * (m1 * m2) / distance_sq
    return force

```

**Step 2: Define two completely different classes that satisfy the interface.**
A `Planet` and a `Spaceship`. They are not related by inheritance.

```python
class Planet:
    def __init__(self, name, mass, position):
        self.name = name
        self.mass = mass          # Satisfies the .mass requirement
        self.position = position  # Satisfies the .position requirement

    def __repr__(self):
        return f"Planet({self.name})"

class Spaceship:
    def __init__(self, call_sign, mass, position, velocity):
        self.call_sign = call_sign
        self.mass = mass          # Satisfies the .mass requirement
        self.position = position  # Satisfies the .position requirement
        self.velocity = velocity  # Extra data, irrelevant to the function

    def __repr__(self):
        return f"Spaceship({self.call_sign})"
```

**Step 3: Use the function with instances of both classes.**
The `calculate_gravity` function works interchangeably with `Planet` and `Spaceship` objects because both "quack" the same way—they both provide `.mass` and `.position`.

```python
earth = Planet(name="Earth", mass=5.972e24, position=(0, 0))
iss = Spaceship(call_sign="ISS", mass=4.197e5, position=(6.771e6, 0))

# Calculate force between a Planet and a Spaceship
force = calculate_gravity(earth, iss)
print(f"Force between {earth} and {iss}: {force:.2f} Newtons")

# It would also work between two Planets or two Spaceships
mars = Planet(name="Mars", mass=6.39e23, position=(2.279e11, 0))
force_em = calculate_gravity(earth, mars)
print(f"Force between {earth} and {mars}: {force_em:.2f} Newtons")
```

**Reflection:**
The `calculate_gravity` function is decoupled from the concrete types of the objects it operates on. It defines an implicit contract: "to be used by me, you must have `.mass` and `.position`." This allows us to add `Asteroid`, `Star`, or `Probe` classes later, and as long as they fulfill this contract, our battle-tested physics function will work without modification. This is the power of polymorphism via duck typing.

## Diagrams
Here is a diagram illustrating how a single function `process(obj)` can invoke different behaviors based on the object it receives.

```text
               +----------------------+
               |                      |
               | def process(obj):   |
               |   ...                |
               |   obj.execute()  <---+---- Invokes the common interface method
               |   ...                |   |
               |                      |   |
               +----------------------+   |
                        |                 |
                        | Passes in       |
           +------------+------------+
           |                         |
           v                         v
+---------------------+     +---------------------+
|                     |     |                     |
|  Object A           |     |  Object B           |
|  (Class: TypeOne)   |     |  (Class: TypeTwo)   |
|---------------------|     |---------------------|
| ...                 |     | ...                 |
| execute():          |     | execute():          |
|   # Behavior One    |     |   # Behavior Two    |
|   print("A")        |     |   print("B")        |
+---------------------+     +---------------------+
          ^                         ^
          |                         |
          +-------------------------+
                  (Different concrete implementations)
```
This diagram shows that `process` is agnostic to the object's class. It only cares about the existence of an `execute()` method. The runtime system directs the call to the correct implementation, achieving different behavior through a single interface.

## Memory technique — remember this forever
1.  **Visual Hook:** Imagine a zookeeper who has a single command: "speak!". They don't care if the animal is a lion, a seal, or a parrot. They issue the "speak!" command, and the lion roars, the seal barks, and the parrot squawks. The *interface* is the command "speak!". The *polymorphic behavior* is the specific sound each animal makes. The zookeeper is your function, and the animals are the objects. The zookeeper relies on duck typing—if it can `speak()`, it's an animal they can command.

2.  **Must-know facts:**
    *   **Polymorphism:** Same interface, different behavior.
    *   **Duck Typing:** "If it walks like a duck and quacks like a duck, it is a duck." (An object's suitability is determined by its methods, not its class type).

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: **1 day**.
    *   Then in: **3 days**.
    *   Then in: **7 days**.
    *   Then in: **16 days**.
    *   Final review in: **35 days**.

4.  **First Principles Pathway:** If you ever forget, derive it from scratch. Open a Python interpreter.
    ```python
    class A:
      def go(self): print("A goes")
    class B:
      def go(self): print("B goes")
    def make_it_go(thing):
      thing.go()
    
    make_it_go(A()) # Prints "A goes"
    make_it_go(B()) # Prints "B goes"
    ```
    The fact that `make_it_go` works on two unrelated types *is* duck typing. You can re-discover the entire principle with these five lines of code.

## Common mistakes
1.  **Type Checking:** Writing code like `if isinstance(obj, Planet): ... elif isinstance(obj, Spaceship): ...`. This completely defeats the purpose of polymorphism. Your function should be agnostic to the type and just trust that the required methods exist.
2.  **Assuming an Interface:** Calling `obj.fly()` on an object that might be a `Planet`. This will cause a runtime `AttributeError`. The flexibility of duck typing comes with the responsibility of ensuring that objects passed to a function actually satisfy its implicit contract.
3.  **Confusing with Inheritance:** Believing that objects must share a common parent class to be used polymorphically. Duck typing is powerful precisely because it does *not* require a shared parent.
4.  **Inconsistent Signatures:** Defining `planet.update(dt)` and `spaceship.update(dt, engine_thrust)`. While both are named `update`, their different arguments (signatures) mean they don't satisfy a common interface, and a single function call `obj.update(delta_t)` will fail for the spaceship.

## Self-check
1.  Write a class `FileLogger` with a `log(message)` method that writes the message to a file. Write a class `ConsoleLogger` with a `log(message)` method that prints the message to the console. Now, write a single function `process_data(data, loggers)` that performs some work and calls the `.log()` method on every object in the `loggers` list.
2.  Consider the Python built-in `len()` function. It works on strings, lists, dictionaries, and many other objects. Explain how `len()` is an example of polymorphism. What "interface" do you think an object must satisfy for `len()` to work on it? (Hint: look up "dunder methods" or "magic methods" in Python).
3.  In a physics simulation, you have a function `handle_collision(obj1, obj2)`. For some objects (like planets), a collision is an inelastic event determined by mass and momentum. For others (like photons hitting a solar sail), it's a transfer of momentum without mass exchange. How would you use polymorphism to design `Planet` and `Photon` classes so that your single `handle_collision` function can work correctly for a Planet-Planet collision, a Photon-Sail collision, and a Planet-Sail collision, without using `if/else` statements to check the types of `obj1` and `obj2`? Describe the methods each class would need.