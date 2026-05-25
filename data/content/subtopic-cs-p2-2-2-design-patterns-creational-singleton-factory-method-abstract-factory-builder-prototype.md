## What it is
Creational design patterns are standardized, reusable solutions for object creation. They abstract the instantiation process, decoupling a system from the specific classes it needs to create. Instead of calling a constructor directly with `new`, you delegate creation to a special object or method.

## Why it matters
These patterns manage complexity in large systems. In aerospace flight software, an **Abstract Factory** can create entire families of simulation objects for different vehicle configurations (e.g., `Falcon9Factory` vs. `StarshipFactory`), allowing the simulation core to remain ignorant of specific vehicle parts. In machine learning, a **Builder** pattern is invaluable for constructing complex neural network architectures layer-by-layer, ensuring a valid state at each step before finalizing the model.

## When to study it
Before tackling these patterns, you must have a firm grasp of fundamental Object-Oriented Programming (OOP) principles. Ensure you are completely comfortable with:
*   Classes and Objects
*   The four pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism
*   Abstract Classes and Interfaces
*   The difference between `is-a` (inheritance) and `has-a` (composition) relationships

If any of these are weak, pause and review. Applying patterns without understanding these foundations leads to incorrect and brittle code.

## How to study it (step by step)
1.  **Isolate the problem.** Write a small program that creates several related objects using direct constructor calls (e.g., `new Dog()`, `new Cat()`). Notice how the client code is tightly coupled to the `Dog` and `Cat` classes.
2.  **Implement Singleton.** Create a `Logger` class for your program. Refactor it to be a Singleton, ensuring only one instance can ever exist. Use a private constructor and a static `getInstance()` method.
3.  **Implement Factory Method.** Refactor your animal creation code. Create an abstract `AnimalFactory` with a method `createAnimal()`. Implement concrete factories like `DogFactory` and `CatFactory` that return the specific animal types. The client code now only depends on `AnimalFactory`.
4.  **Evolve to Abstract Factory.** Imagine you need families of objects (e.g., `WildAnimalFactory` creates `Lion` and `Tiger`; `DomesticAnimalFactory` creates `Dog` and `Cat`). Implement this. Note that the abstract factory is an object that has multiple factory methods.
5.  **Implement Builder.** Design a `Rocket` class with many complex, optional configuration parameters (engine type, number of stages, payload fairing size). Instead of a messy constructor with ten arguments, create a `RocketBuilder` class. Implement a fluent interface (e.g., `builder.withEngine("Raptor").withStages(2).build()`).
6.  **Implement Prototype.** Take a fully configured `Rocket` object from your Builder. Add a `clone()` method. Use this method to create a new, identical rocket object, and then modify a small part of the clone (e.g., change the payload). This is more efficient than rebuilding from scratch.

## Key ideas, with intuition
1.  **Decouple Client from Concrete Class.** The core idea is to break the dependency of `Client` code on `new ConcreteProduct()`. The client should only know about an abstract `Product` interface and an abstract `Creator` interface. This allows you to introduce new product types without changing any client code.
    $$
    \text{Client} \rightarrow \text{CreatorInterface} \rightarrow \text{ProductInterface}
    $$
    $$
    \text{NOT: Client} \rightarrow \text{ConcreteProduct}
    $$

2.  **Singleton: One and Only One.** This pattern enforces that a class has only one instance and provides a global point of access to it. Think of it as a global variable, but with controlled creation. It's achieved with a `private` constructor and a `public static` method that manages the single instance. Use with extreme caution, as it introduces global state.

3.  **Factories: Delegating Creation.**
    *   **Factory Method:** A class delegates instantiation to its subclasses. The superclass provides an abstract `create()` method, and subclasses provide the implementation. It's a single method that "manufactures" an object.
    *   **Abstract Factory:** Provides an interface for creating *families* of related objects without specifying their concrete classes. Think of it as a factory that creates other factories, or an object with multiple factory methods for creating a suite of related products (e.g., `createButton()`, `createCheckbox()`).

4.  **Builder: Step-by-Step Construction.** When an object has a complex constructor with many parameters (some optional), a Builder is used. It separates the construction of a complex object from its final representation, allowing you to use the same construction process to create different representations. It's like assembling a custom PC: you pick the CPU, then the GPU, then the RAM, and only at the end do you have a complete `PC` object.

5.  **Prototype: Cloning an Existing Object.** Instead of creating an object from scratch, you create a new object by copying an existing one. This is useful when the cost of creating a new object is high (e.g., it requires a database query or heavy computation). You create a "prototypical" instance and then clone it whenever you need a new one.

## Worked example
We will implement the **Factory Method** pattern. The problem: A logistics application needs to create different types of transport vehicles (`Truck`, `Ship`), but the client code that plans the delivery should not be coupled to the concrete vehicle classes.

**Step 1: Define the Product Interface.**
This is the common interface for all objects the factory will create.

```java
// Product interface
interface Transport {
    void deliver();
}
```

**Step 2: Create Concrete Products.**
These are the specific implementations of the `Transport` interface.

```java
// Concrete Product 1
class Truck implements Transport {
    public void deliver() {
        System.out.println("Delivering by land in a truck.");
    }
}

// Concrete Product 2
class Ship implements Transport {
    public void deliver() {
        System.out.println("Delivering by sea in a ship.");
    }
}
```

**Step 3: Define the Creator (Factory) Class.**
This abstract class has a `factoryMethod` which subclasses will implement. Note that the business logic (`planDelivery`) uses the product created by the factory method, but it doesn't know *which* concrete product it is.

```java
// Creator (abstract factory)
abstract class Logistics {
    // The business logic that uses the product.
    public void planDelivery() {
        Transport t = createTransport(); // The magic happens here.
        t.deliver();
    }

    // The factory method. Subclasses MUST implement this.
    public abstract Transport createTransport();
}
```

**Step 4: Create Concrete Creators.**
These subclasses decide which concrete product to instantiate.

```java
// Concrete Creator 1
class RoadLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}

// Concrete Creator 2
class SeaLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Ship();
    }
}
```

**Step 5: Client Code.**
The client code picks a factory based on its needs and uses it, without ever knowing about `Truck` or `Ship`.

```java
public class Application {
    public static void main(String[] args) {
        Logistics logistics;

        // Based on some configuration or input...
        String transportType = "road"; 

        if (transportType.equals("road")) {
            logistics = new RoadLogistics();
        } else {
            logistics = new SeaLogistics();
        }

        // ...the client code works with the factory via its abstract interface.
        logistics.planDelivery(); 
        // Output for "road": Delivering by land in a truck.
        // Output for "sea": Delivering by sea in a ship.
    }
}
```

**Reflection:**
*   Step 1 & 2 established a common contract (`Transport`) for our products.
*   Step 3 defined the factory's core logic, which depends on the `Transport` interface, not a concrete class. The `createTransport()` method is the key hook.
*   Step 4 provided the specific implementations, coupling the `RoadLogistics` to the `Truck`, but this coupling is now isolated inside the factory.
*   Step 5, the client, is completely decoupled. It can plan a delivery without ever saying `new Truck()` or `new Ship()`. We can add an `AirLogistics` factory with a `Plane` product later without touching the `Application` class at all.

## Diagrams
A diagram showing the Factory Method pattern structure.

```text
+----------------+          +------------------+
|    Creator     |<>------>|     Product      |
|----------------|          |------------------|
| + planDelivery() |        | + operation()    |
| # createProduct()|          +------------------+
+----------------+                  ^
        ^                           |
        | (implements)              | (implements)
+----------------+          +------------------+
| ConcreteCreator|          | ConcreteProduct  |
|----------------|          |------------------|
| + createProduct()| ------->| + operation()    |
+----------------+          +------------------+
       (returns new ConcreteProduct)
```

Comparison of Factory Method vs. Abstract Factory.

```text
       FACTORY METHOD                        ABSTRACT FACTORY
+-------------------------+         +--------------------------------+
|   Logistics             |         |   GUIFactory (Interface)       |
|-------------------------|         |--------------------------------|
| abstract createTransport()|         | + createButton()               |
+-------------------------+         | + createCheckbox()             |
           ^                        +--------------------------------+
           |                                       ^
           |                                       | (implements)
+-------------------------+         +--------------------------------+
|   RoadLogistics         |         |   WindowsFactory               |
|-------------------------|         |--------------------------------|
| + createTransport() {   |         | + createButton() { WinBtn }    |
|     return new Truck(); |         | + createCheckbox() { WinCheck }|
|   }                     |         +--------------------------------+
+-------------------------+
                                    +--------------------------------+
                                    |   MacOSFactory                 |
                                    |--------------------------------|
                                    | + createButton() { MacBtn }    |
                                    | + createCheckbox() { MacCheck }|
                                    +--------------------------------+

Focus: A single creation method.    Focus: Creating families of objects.
Implemented by subclasses.          Implemented by objects.
```

## Memory technique — remember this forever
1.  **The Car Factory Analogy:**
    *   **Singleton:** The one and only **CEO** of the entire corporation.
    *   **Factory Method:** A specific assembly **Line** (`Creator`) that can be configured to produce a specific model (`Product`). A `SedanLine` makes `Sedans`.
    *   **Abstract Factory:** The entire **Factory Plant** (`AbstractFactory`) which contains multiple lines to produce a whole family of related parts: a `SedanPlant` has a line for sedan bodies, sedan engines, and sedan wheels.
    *   **Builder:** The **Custom Shop** where a mechanic builds a car step-by-step (`.addEngine()`, `.addWheels()`, `.paint()`) and gives you the final car (`.build()`).
    *   **Prototype:** A perfect showroom **Model Car**. To make another, you just **Clone** it, maybe changing the paint color.

2.  **Must-Overlearn Facts:**
    *   **Factory Method:** *Define an interface for creating an object, but let subclasses decide which class to instantiate.*
    *   **Abstract Factory:** *Provide an interface for creating families of related or dependent objects without specifying their concrete classes.*
    *   **Builder:** *Separate the construction of a complex object from its representation so that the same construction process can create different representations.*

3.  **Spaced Repetition Schedule:** Review this material and your own implementations at **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders now.

4.  **First Principles Pathway:** If you forget the patterns, start from the problem: "My client code is full of `new ConcreteThing()` and I have `if/else` or `switch` statements to decide which 'Thing' to create. This is rigid." The goal is to move the `new` keyword out of the client.
    *   "How can I hide the `new` inside another object?" -> Leads to a **Factory**.
    *   "What if I need to build a complex object in multiple steps?" -> Leads to a **Builder**.
    *   "What if creating this object is expensive and I'd rather copy an existing one?" -> Leads to **Prototype**.

## Common mistakes
1.  **Overusing Singleton:** Using Singleton for everything because global access seems easy. This creates hidden dependencies, makes unit testing a nightmare, and breaks SOLID principles. Reserve it for genuine single-instance resources like a hardware driver or a logger.
2.  **Confusing Factory Method and Abstract Factory:** A Factory Method is a single method, and inheritance is used to change the product type. An Abstract Factory is an object with multiple factory methods, and you use different objects (composition) to get different families of products.
3.  **Builder for Simple Objects:** Applying the Builder pattern to an object with only 2-3 constructor arguments. This is over-engineering; a simple constructor is more readable and efficient. Use Builder only when you have many parameters, especially optional ones.
4.  **Prototype with Shallow Copies:** Implementing `clone()` with a shallow copy when the object contains references to other mutable objects. This means the original and the clone will share the same internal objects, leading to bizarre bugs when one is modified. You almost always need a deep copy.

## Self-check
1.  You are designing a configuration object for a spacecraft's trajectory simulation. It requires orbital parameters (apoapsis, periapsis, inclination), engine burn details (duration, thrust), and optional settings for atmospheric drag models. Why is the Builder pattern a better choice here than a constructor or a Factory Method?
2.  You have a UI framework that must run on Windows, macOS, and Linux. You need to create buttons, text fields, and windows that look native on each platform. Which creational pattern is the most appropriate for managing the creation of these UI elements, and why? How would you structure the classes?
3.  A game engine needs to spawn thousands of identical enemy spaceships. Creating each ship involves loading models, textures, and AI scripts, which is computationally expensive. After being spawned, some ships might get a unique weapon upgrade. Which creational pattern would be most efficient for this task and how would you handle the weapon upgrade?