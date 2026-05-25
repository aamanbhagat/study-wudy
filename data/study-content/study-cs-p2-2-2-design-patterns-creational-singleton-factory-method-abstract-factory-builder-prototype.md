## 1. What it is — in plain English

Imagine you're building with LEGOs. Sometimes you need a specific type of brick, but you don't want to worry about *how* it's made or *where* it comes from, just that you get the right one. Other times, you need to make sure you only ever have *one* specific brick in your entire project, like a special power core. And sometimes, you need to build a really complicated LEGO structure, piece by piece, without making a mess or forgetting a step.

"Design Patterns" are like well-tested blueprints or recipes for solving common problems in software design. They're not finished code you can just copy-paste, but rather general, reusable solutions that show you *how* to structure your code to tackle recurring challenges. Think of them as best practices that smart engineers have discovered over years of building software.

The specific patterns we're looking at today are "Creational Design Patterns." "Creational" simply means they are all about *creating* objects. They give you smarter, more flexible ways to make new objects than just using the basic `new` keyword every time. They help you control the object creation process, making your system more robust, easier to change, and less prone to errors. It's like having specialized tools for making different kinds of cookies: a cookie cutter for simple shapes, a fancy machine for complex ones, or a rule that says "only one batch of chocolate chip cookies can be baking at a time."

## 2. Why it matters — real-world applications

Creational design patterns are fundamental because object creation is a ubiquitous operation in any software system. Controlling how objects are instantiated leads to more flexible, maintainable, and scalable code.

1.  **Singleton Pattern: Resource Management & Configuration**
    *   **Application:** Imagine a large-scale enterprise application that needs to log events. You wouldn't want hundreds of different logging objects, each potentially writing to the same file or database connection independently. A **Singleton** ensures there's only *one* `Logger` instance managing all log requests, preventing conflicts and efficiently using resources.
    *   **Real-world:** Database connection pools, configuration managers, thread pools, or even a system's graphical display server often use Singletons to ensure a single point of control and shared access to a critical resource. For instance, in a physics simulation, a `SimulationTimeManager` might be a Singleton to ensure all parts of the simulation agree on the current time step and elapsed time.

2.  **Factory Method & Abstract Factory Patterns: Cross-Platform Development & Extensibility**
    *   **Application:** Consider a cross-platform user interface (UI) toolkit. When you ask for a "Button," on Windows, you want a `WinButton`, but on macOS, you want a `MacButton`. The application code shouldn't need to know which operating system it's running on to create the correct button.
    *   **Real-world:** Frameworks like Qt, Swing, or React Native use variations of factories to create platform-specific UI components. In aerospace, an `AircraftFactory` might produce different types of aircraft (e.g., `FighterJet`, `CargoPlane`) based on mission requirements, or an `EngineFactory` might produce different engine types (jet, turboprop) for a specific aircraft model. An **Abstract Factory** would be used if you needed to create *families* of related objects, like an `AirbusFactory` creating `AirbusEngine` and `AirbusCockpit` components, while a `BoeingFactory` creates `BoeingEngine` and `BoeingCockpit` components.

3.  **Builder Pattern: Complex Object Construction & Configuration**
    *   **Application:** When creating a complex object, like a custom report, a detailed email, or a configurable machine learning model pipeline, there can be many optional parameters and steps. Passing all these parameters to a constructor becomes unwieldy and error-prone.
    *   **Real-world:** SQL query builders (e.g., `SELECT * FROM users WHERE age > 30 ORDER BY name`), HTTP request builders, or even complex object initialization in game engines (e.g., configuring a spaceship with specific weapons, shields, and engines). In machine learning, a `ModelPipelineBuilder` could construct a sequence of data preprocessing steps, model training, and evaluation metrics, allowing for flexible configuration without a giant, unreadable constructor.

4.  **Prototype Pattern: Object Cloning & Performance Optimization**
    *   **Application:** Imagine a game where you need to create many identical or very similar enemy characters. Instead of creating each one from scratch (which can be slow and resource-intensive), you can create one "template" enemy and then simply clone it whenever you need a new one, perhaps making small modifications afterward.
    *   **Real-world:** Document editors often use prototypes for creating new documents from templates. In scientific simulations, if you have a complex particle object with many internal states, cloning a pre-configured particle can be much faster than re-initializing all its properties. In bioinformatics, creating many variations of a gene sequence for mutation studies could leverage the Prototype pattern.

## 3. Prerequisites — what you must know first

Before diving deep into creational design patterns, ensure you have a solid grasp of the following fundamental Computer Science and Object-Oriented Programming (OOP) concepts:

*   **Classes and Objects:** The basic building blocks of OOP; a class is a blueprint, an object is an instance of that blueprint.
*   **Encapsulation:** The principle of bundling data (attributes) and methods (functions) that operate on the data into a single unit (a class), and restricting direct access to some of the object's components (e.g., using `private` or `protected` access modifiers).
*   **Inheritance:** A mechanism where a new class (subclass/derived class) is created from an existing class (superclass/base class), inheriting its attributes and methods.
*   **Polymorphism:** The ability of an object to take on many forms; specifically, the ability of different objects to respond to the same method call in their own specific ways. This often involves method overriding and interfaces.
*   **Abstraction:** The concept of showing only essential information and hiding the complex implementation details. This is achieved through abstract classes and interfaces.
*   **Interfaces/Abstract Classes:** Contracts that define a set of methods that a class must implement. Abstract classes can have both abstract and concrete methods, while interfaces only define method signatures.
*   **Constructors:** Special methods used to initialize new objects when they are created.
*   **Static Members/Methods:** Members (variables) or methods that belong to the class itself, rather than to any specific instance of the class. They can be accessed directly using the class name.
*   **Composition vs. Inheritance:** Understanding when to use "has-a" relationships (composition) versus "is-a" relationships (inheritance) for building complex objects.
*   **Loose Coupling and High Cohesion:** Desirable software design principles where modules are independent (loose coupling) and focused on a single, well-defined purpose (high cohesion).

## 4. The core idea — step by step

Creational design patterns are all about managing the object creation process. They aim to decouple the client (the code that needs an object) from the concrete classes it instantiates. This provides more flexibility, allowing the system to decide *which* objects to create and *how* to create them at runtime, without hardcoding specific class names.

Let's explore each pattern:

### Singleton Pattern

The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.

*   **Plain-English Statement:** "I need *one and only one* specific manager, resource, or configuration for my entire application, and everyone should use that exact same one."
*   **Small Concrete Example:** A `ConfigurationManager` that loads settings from a file. You only want to load these settings once and have all parts of your application access the same loaded settings.
*   **Formal/Mathematical Version:** Let $S$ be a class. The Singleton pattern ensures that there exists at most one instance $s \in S$ at any given time. Formally, for any two instances $s_1, s_2$ of $S$, it must be true that $s_1 = s_2$. This is achieved by making the constructor private and providing a static method to retrieve the sole instance.
    $$ \forall s_1, s_2 \in \text{Instances}(S) \implies s_1 = s_2 $$
*   **What Could Go Wrong:**
    *   **Global State Issues:** Singletons can become global variables, leading to tightly coupled code that is difficult to test and maintain.
    *   **Thread Safety:** If not implemented carefully, multiple threads trying to access or create the Singleton simultaneously can lead to multiple instances being created.
    *   **Testing Difficulties:** Mocking or replacing a Singleton for testing purposes can be challenging due to its global nature.

### Factory Method Pattern

The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate.

*   **Plain-English Statement:** "I know I need *some kind* of product, but I'll let my specialized 'factories' (subclasses) figure out the exact type of product to make."
*   **Small Concrete Example:** A `Document` class has a `createPage()` method. `WordDocument` overrides `createPage()` to return a `WordPage`, while `PdfDocument` overrides it to return a `PdfPage`. The client code just asks a `Document` to `createPage()`, without knowing the specific page type.
*   **Formal/Mathematical Version:** Let $P$ be an abstract `Product` and $C$ be an abstract `Creator`. The `Creator` class declares a `factoryMethod()` that returns an object of type $P$. Concrete subclasses $C_i$ of `Creator` override `factoryMethod()` to return specific `ConcreteProduct` types $P_j$.
    $$ \text{Creator} \xrightarrow{\text{declares}} \text{factoryMethod}() \to P $$
    $$ \text{ConcreteCreator}_i \xrightarrow{\text{implements}} \text{factoryMethod}() \to \text{ConcreteProduct}_j $$
*   **What Could Go Wrong:**
    *   **Parallel Class Hierarchies:** Can lead to a proliferation of classes if every new product requires a new creator subclass.
    *   **Over-engineering:** For very simple creation scenarios, a factory method can add unnecessary complexity.

### Abstract Factory Pattern

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

*   **Plain-English Statement:** "I need a *whole set* of related products (like a matching set of furniture), and I'll pick a 'factory' that knows how to make all the pieces for that specific style."
*   **Small Concrete Example:** An `UIFactory` interface with methods like `createButton()` and `createCheckbox()`. `WindowsUIFactory` implements these to create `WinButton` and `WinCheckbox`, while `MacUIFactory` creates `MacButton` and `MacCheckbox`. The client code uses `UIFactory` to get a consistent set of UI elements for a given OS.
*   **Formal/Mathematical Version:** Let $F$ be an `AbstractFactory` interface, declaring methods $m_1(), m_2(), \dots, m_k()$, where each $m_i()$ returns an `AbstractProduct` type $P_i$. Concrete factories $F_j$ implement $F$ to create concrete product families $P_{i,j}$.
    $$ \text{AbstractFactory} \xrightarrow{\text{declares}} \{ \text{createProductA}() \to \text{AbstractProductA}, \text{createProductB}() \to \text{AbstractProductB}, \dots \} $$
    $$ \text{ConcreteFactory}_j \xrightarrow{\text{implements}} \{ \text{createProductA}() \to \text{ConcreteProductA}_j, \text{createProductB}() \to \text{ConcreteProductB}_j, \dots \} $$
*   **What Could Go Wrong:**
    *   **Adding New Product Types:** If you need to introduce a new type of product (e.g., `createRadioButton()` to `UIFactory`), you have to modify the `AbstractFactory` interface and *all* its concrete implementations, which violates the Open/Closed Principle (open for extension, closed for modification).
    *   **Complexity:** Can be overly complex for simple product families.

### Builder Pattern

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

*   **Plain-English Statement:** "I need to build a really complicated object with many parts and options. I'll use a step-by-step assistant (the builder) to put it together, so I don't miss anything or get confused."
*   **Small Concrete Example:** Building a `Pizza` object. Instead of a constructor with 10 parameters, you have a `PizzaBuilder` with methods like `addDough(type)`, `addSauce(type)`, `addTopping(topping)`, `bake()`, and finally `build()` to get the `Pizza` object.
*   **Formal/Mathematical Version:** Let $P$ be a `Product` and $B$ be an `AbstractBuilder` interface. A `Director` orchestrates the construction using $B$. `ConcreteBuilder` implementations $B_i$ construct specific representations of $P$.
    $$ \text{Builder} \xrightarrow{\text{declares}} \{ \text{buildPartA}(), \text{buildPartB}(), \dots, \text{getResult}() \to P \} $$
    $$ \text{Director} \xrightarrow{\text{uses}} \text{Builder} \xrightarrow{\text{to construct}} P $$
*   **What Could Go Wrong:**
    *   **Verbosity:** Can be too verbose for objects with few construction steps or simple constructors.
    *   **Unnecessary Director:** Sometimes the `Director` class (which orchestrates the building process) is not strictly necessary, and the client can interact directly with the builder.

### Prototype Pattern

The Prototype pattern creates new objects by copying an existing object, known as the prototype.

*   **Plain-English Statement:** "I have an object that's already set up exactly how I like it. Instead of building a new one from scratch, I'll just make a perfect copy of this one."
*   **Small Concrete Example:** A `Monster` object in a game, pre-configured with health, attack power, and a specific appearance. When you need a new monster, you call `monsterTemplate.clone()` to get a new, identical monster instance.
*   **Formal/Mathematical Version:** Let $P$ be an `AbstractPrototype` interface, declaring a `clone()` method. Concrete prototypes $P_i$ implement `clone()` to return a new instance of themselves, typically by copying their internal state.
    $$ \text{AbstractPrototype} \xrightarrow{\text{declares}} \text{clone}() \to \text{AbstractPrototype} $$
    $$ \text{ConcretePrototype}_i \xrightarrow{\text{implements}} \text{clone}() \to \text{ConcretePrototype}_i \text{ (a copy)} $$
*   **What Could Go Wrong:**
    *   **Shallow vs. Deep Copy:** A common pitfall is not understanding the difference. A shallow copy copies references to nested objects, meaning changes to a nested object in the copy will affect the original. A deep copy recursively copies all nested objects, ensuring complete independence.
    *   **Circular References:** If objects have circular references (A refers to B, B refers to A), deep cloning can lead to infinite loops or stack overflows if not handled carefully.
    *   **Complex Internal State:** Cloning objects with very complex internal state (e.g., open file handles, database connections) can be tricky or inappropriate.

## 5. Worked examples — multiple, with every step shown

We will use a Python-like pseudo-code for clarity, focusing on the OOP principles.

### Example 1: Singleton - Logger (Easy)

**Problem:** Design a logging system that ensures only one instance of the logger exists throughout the application, to centralize log management and prevent multiple writers to the same log file.

**Given:** We need a `Logger` class.
**What we want:** A mechanism to ensure that calling `Logger.getInstance()` always returns the *same* object.

**Steps:**

1.  **Make the constructor private:** This prevents direct instantiation of `Logger` objects using `Logger()`. This is crucial for controlling the creation process.
    ```python
    class Logger:
        _instance = None # To hold the single instance

        def __init__(self):
            # Step 1: Prevent direct instantiation
            if Logger._instance is not None:
                raise Exception("This class is a singleton! Use getInstance() instead.")
            self.log_file = "application.log"
            print(f"Logger initialized, logging to {self.log_file}")
    ```
    *Explanation:* The `__init__` method is the constructor. By checking `_instance` inside it, we ensure that if someone *tries* to call `Logger()` directly after the first instance is created, an error is raised, reinforcing the singleton rule. The `_instance` variable is `None` initially, meaning no instance has been created yet.

2.  **Create a static method to get the instance:** This method will be the *only* way to obtain a `Logger` instance. It checks if an instance already exists; if not, it creates one and stores it, then returns it.
    ```python
    class Logger:
        _instance = None

        def __init__(self):
            if Logger._instance is not None:
                raise Exception("This class is a singleton! Use getInstance() instead.")
            self.log_file = "application.log"
            print(f"Logger initialized, logging to {self.log_file}")
            # This line should ideally be outside the public access path
            # Logger._instance = self # This would be set in getInstance

        @staticmethod
        def getInstance():
            # Step 2: Provide a static method to access the instance
            if Logger._instance is None:
                # Create the instance if it doesn't exist
                Logger._instance = Logger() # This calls the constructor
            return Logger._instance
    ```
    *Explanation:* The `getInstance()` method is `staticmethod`, meaning it belongs to the class, not an object. It's the gatekeeper. The first time it's called, `_instance` is `None`, so it creates a `Logger` object (which calls the `__init__` method) and assigns it to `_instance`. Subsequent calls will find `_instance` already set and simply return the existing one.

3.  **Add logging functionality:** Implement a simple `log` method.
    ```python
    class Logger:
        _instance = None

        def __init__(self):
            if Logger._instance is not None:
                raise Exception("This class is a singleton! Use getInstance() instead.")
            self.log_file = "application.log"
            print(f"Logger initialized, logging to {self.log_file}")

        @staticmethod
        def getInstance():
            if Logger._instance is None:
                Logger._instance = Logger()
            return Logger._instance

        def log(self, message):
            # Step 3: Add actual functionality
            with open(self.log_file, "a") as f:
                f.write(f"{message}\n")
            print(f"Logged: {message}")
    ```
    *Explanation:* The `log` method uses the instance's `log_file` attribute to write messages. Since all callers get the *same* instance, they all write to the *same* file.

4.  **Test the Singleton behavior:**
    ```python
    # Client code
    logger1 = Logger.getInstance() # First call, creates instance
    logger1.log("Application started.")

    logger2 = Logger.getInstance() # Second call, returns existing instance
    logger2.log("User logged in.")

    # Verify that both logger1 and logger2 are the same object
    print(f"Are logger1 and logger2 the same object? {logger1 is logger2}")

    # Try to create a new instance directly (should raise an error if __init__ is protected)
    try:
        logger3 = Logger()
    except Exception as e:
        print(f"Attempted direct instantiation: {e}")
    ```
    *Explanation:* `logger1` and `logger2` are indeed the same object, as verified by `is` operator (checks object identity). The attempt to create `logger3` directly fails, confirming the private constructor enforcement.

**Final Answer:**
The `Logger` class successfully implements the Singleton pattern, ensuring only one instance is ever created and accessed globally.

```python
# The Singleton Logger Class
class Logger:
    _instance = None # Holds the single instance

    def __init__(self):
        # Prevent direct instantiation after the first one
        if Logger._instance is not None:
            raise Exception("This class is a singleton! Use getInstance() instead.")
        self.log_file = "application.log"
        print(f"Logger initialized, logging to {self.log_file}")

    @staticmethod
    def getInstance():
        # Lazy initialization: create instance only when first requested
        if Logger._instance is None:
            Logger._instance = Logger()
        return Logger._instance

    def log(self, message):
        with open(self.log_file, "a") as f:
            f.write(f"{message}\n")
        print(f"Logged: {message}")

# Client Usage:
print("--- Singleton Logger Example ---")
logger1 = Logger.getInstance()
logger1.log("System initialization complete.")

logger2 = Logger.getInstance()
logger2.log("Data processing started.")

# Verify that both references point to the same object
print(f"logger1 object ID: {id(logger1)}")
print(f"logger2 object ID: {id(logger2)}")
print(f"Are logger1 and logger2 the same object? {logger1 is logger2}") # Output: True

# Attempt to create an instance directly (will raise an exception as designed)
try:
    logger3 = Logger()
except Exception as e:
    print(f"Error: {e}")

print("--------------------------------")
```

**Reflection:** The trickiest part of the Singleton is ensuring thread safety in multi-threaded environments. The above Python example is *not* inherently thread-safe in all scenarios (e.g., two threads calling `getInstance()` simultaneously when `_instance` is `None`). Real-world Singletons often require locking mechanisms (e.g., mutexes) to prevent race conditions during initialization.

### Example 2: Factory Method - Vehicle Creation (Medium)

**Problem:** Design a system to create different types of vehicles (Car, Bike) based on a user's request, without the client code needing to know the specific class names of the vehicles. The creation logic should be encapsulated.

**Given:** We need `Car` and `Bike` objects.
**What we want:** A factory that produces `Vehicle` objects, where the specific vehicle type is determined by the factory's implementation.

**Steps:**

1.  **Define a common `Vehicle` interface (or abstract class):** All vehicles should conform to this interface.
    ```python
    from abc import ABC, abstractmethod

    class Vehicle(ABC):
        @abstractmethod
        def drive(self):
            pass

        @abstractmethod
        def get_type(self):
            pass
    ```
    *Explanation:* `ABC` (Abstract Base Class) and `@abstractmethod` are Python's way of defining an interface. Any class implementing `Vehicle` *must* provide `drive()` and `get_type()` methods.

2.  **Create concrete `Vehicle` classes:** Implement the `Vehicle` interface for each specific vehicle type.
    ```python
    class Car(Vehicle):
        def drive(self):
            print("Driving a car on four wheels.")

        def get_type(self):
            return "Car"

    class Bike(Vehicle):
        def drive(self):
            print("Riding a bike on two wheels.")

        def get_type(self):
            return "Bike"
    ```
    *Explanation:* `Car` and `Bike` are our concrete products. They implement the `Vehicle` interface, providing their specific `drive` and `get_type` behaviors.

3.  **Define an abstract `VehicleCreator` (or `VehicleFactory`) class:** This class will declare the `factory_method` that returns a `Vehicle`. It might also contain common logic that operates on `Vehicle` objects.
    ```python
    class VehicleCreator(ABC):
        @abstractmethod
        def factory_method(self) -> Vehicle:
            """
            The factory method, which subclasses will implement to return a concrete product.
            """
            pass

        def operate_vehicle(self):
            """
            A method that uses the product created by the factory method.
            This shows that the Creator class can have core logic that is independent
            of the concrete product's class.
            """
            vehicle = self.factory_method() # Call the factory method to get a product
            print(f"Creator: Operating a {vehicle.get_type()}...")
            vehicle.drive()
            print("Creator: Vehicle operation complete.")
            return vehicle
    ```
    *Explanation:* `VehicleCreator` is the abstract creator. Its `factory_method` is abstract, meaning subclasses *must* implement it. The `operate_vehicle` method demonstrates how the creator can use the product created by its `factory_method` without knowing its concrete type (polymorphism).

4.  **Create concrete `VehicleCreator` classes:** Each concrete creator will override the `factory_method` to produce a specific concrete `Vehicle` type.
    ```python
    class CarCreator(VehicleCreator):
        def factory_method(self) -> Vehicle:
            return Car()

    class BikeCreator(VehicleCreator):
        def factory_method(self) -> Vehicle:
            return Bike()
    ```
    *Explanation:* `CarCreator` and `BikeCreator` are concrete creators. They each implement `factory_method` to return a `Car` and a `Bike` object, respectively. The client interacts with these creators, not directly with `Car` or `Bike`.

5.  **Client code usage:** The client interacts with the `VehicleCreator` interface, not specific vehicle or creator types.
    ```python
    # Client code
    print("--- Factory Method Example ---")
    def client_code(creator: VehicleCreator):
        """
        The client code works with an instance of a concrete creator,
        albeit through its abstract interface.
        """
        print(f"Client: I'm not aware of the creator's class, but it works.")
        vehicle = creator.operate_vehicle()
        print(f"Client: The vehicle type is {vehicle.get_type()}.")
        print("\n")

    print("App: Launching with the CarCreator.")
    client_code(CarCreator())

    print("App: Launching with the BikeCreator.")
    client_code(BikeCreator())
    print("------------------------------")
    ```
    *Explanation:* The `client_code` function takes any `VehicleCreator`. It calls `operate_vehicle()` on it, which internally uses the `factory_method` to get a `Vehicle`. The client doesn't know if it's getting a `Car` or a `Bike`, only that it's a `Vehicle`.

**Final Answer:**
The Factory Method pattern successfully decouples the client from the concrete product types.

```python
from abc import ABC, abstractmethod

# Step 1: Define a common Vehicle interface
class Vehicle(ABC):
    @abstractmethod
    def drive(self):
        pass

    @abstractmethod
    def get_type(self):
        pass

# Step 2: Create concrete Vehicle classes
class Car(Vehicle):
    def drive(self):
        print("Driving a car on four wheels.")

    def get_type(self):
        return "Car"

class Bike(Vehicle):
    def drive(self):
        print("Riding a bike on two wheels.")

    def get_type(self):
        return "Bike"

# Step 3: Define an abstract VehicleCreator class
class VehicleCreator(ABC):
    @abstractmethod
    def factory_method(self) -> Vehicle:
        pass

    def operate_vehicle(self):
        vehicle = self.factory_method()
        print(f"Creator: Operating a {vehicle.get_type()}...")
        vehicle.drive()
        print("Creator: Vehicle operation complete.")
        return vehicle

# Step 4: Create concrete VehicleCreator classes
class CarCreator(VehicleCreator):
    def factory_method(self) -> Vehicle:
        return Car()

class BikeCreator(VehicleCreator):
    def factory_method(self) -> Vehicle:
        return Bike()

# Step 5: Client code usage
print("--- Factory Method Example ---")
def client_code(creator: VehicleCreator):
    print(f"Client: I'm not aware of the creator's class, but it works.")
    vehicle = creator.operate_vehicle()
    print(f"Client: The vehicle type is {vehicle.get_type()}.")
    print("\n")

print("App: Launching with the CarCreator.")
client_code(CarCreator())

print("App: Launching with the BikeCreator.")
client_code(BikeCreator())
print("------------------------------")
```

**Reflection:** The key insight here is that the `VehicleCreator` (the "Creator") delegates the actual object instantiation to its subclasses. The `operate_vehicle` method in `VehicleCreator` can perform operations on *any* `Vehicle` without knowing its specific concrete type, demonstrating polymorphism and loose coupling. The tricky part is understanding when to use Factory Method versus a simple factory function or a more complex Abstract Factory. Factory Method is best when you have a class (the Creator) that *itself* needs to create objects, and you want to allow its subclasses to define *what* specific objects are created.

### Example 3: Builder - Computer Configuration (Hard)

**Problem:** Construct a complex `Computer` object with many optional parts (CPU, RAM, Storage, GPU, OS) and different configurations (e.g., Gaming PC, Office PC). A direct constructor would be unwieldy.

**Given:** A `Computer` object with multiple attributes.
**What we want:** A step-by-step construction process that allows flexible configuration and produces different `Computer` representations.

**Steps:**

1.  **Define the `Product` class:** This is the complex object we want to build. It should have attributes for all its possible parts.
    ```python
    class Computer:
        def __init__(self):
            self.cpu = None
            self.ram = None
            self.storage = None
            self.gpu = None
            self.os = None
            self.components = [] # For other arbitrary components

        def add_component(self, component):
            self.components.append(component)

        def display_config(self):
            print("--- Computer Configuration ---")
            print(f"CPU: {self.cpu if self.cpu else 'N/A'}")
            print(f"RAM: {self.ram if self.ram else 'N/A'}")
            print(f"Storage: {self.storage if self.storage else 'N/A'}")
            print(f"GPU: {self.gpu if self.gpu else 'N/A'}")
            print(f"OS: {self.os if self.os else 'N/A'}")
            if self.components:
                print("Other Components:")
                for comp in self.components:
                    print(f"  - {comp}")
            print("------------------------------")
    ```
    *Explanation:* The `Computer` class is simple; it just holds the parts. It has an `add_component` method for flexibility and `display_config` for output.

2.  **Define an abstract `ComputerBuilder` interface:** This interface declares all the possible steps to build a computer.
    ```python
    from abc import ABC, abstractmethod

    class ComputerBuilder(ABC):
        @abstractmethod
        def reset(self):
            pass

        @abstractmethod
        def set_cpu(self, cpu: str):
            pass

        @abstractmethod
        def set_ram(self, ram: str):
            pass

        @abstractmethod
        def set_storage(self, storage: str):
            pass

        @abstractmethod
        def set_gpu(self, gpu: str):
            pass

        @abstractmethod
        def set_os(self, os: str):
            pass

        @abstractmethod
        def add_extra_component(self, component: str):
            pass

        @abstractmethod
        def get_result(self) -> Computer:
            pass
    ```
    *Explanation:* `ComputerBuilder` defines the contract for any concrete builder. It includes methods for setting each part and a `get_result()` method to retrieve the built `Computer`. `reset()` is important for reusing the builder.

3.  **Implement a concrete `GamingPCBuilder`:** This builder will implement the `ComputerBuilder` interface and assemble a `Computer` object.
    ```python
    class GamingPCBuilder(ComputerBuilder):
        def __init__(self):
            self.reset()

        def reset(self):
            self._computer = Computer()

        def set_cpu(self, cpu: str):
            self._computer.cpu = cpu
            return self # For method chaining

        def set_ram(self, ram: str):
            self._computer.ram = ram
            return self

        def set_storage(self, storage: str):
            self._computer.storage = storage
            return self

        def set_gpu(self, gpu: str):
            self._computer.gpu = gpu
            return self

        def set_os(self, os: str):
            self._computer.os = os
            return self

        def add_extra_component(self, component: str):
            self._computer.add_component(component)
            return self

        def get_result(self) -> Computer:
            product = self._computer
            self.reset() # Reset builder for future use
            return product
    ```
    *Explanation:* `GamingPCBuilder` holds an instance of `Computer` (`_computer`). Each `set_` method configures a part of this `_computer` and returns `self`, enabling method chaining (e.g., `builder.set_cpu(...).set_ram(...)`). `get_result()` returns the fully built `Computer` and resets the builder.

4.  **Define a `Director` (optional but useful):** The `Director` class knows how to construct specific *types* of computers using a builder. It hides the complexity of the construction steps from the client.
    ```python
    class Director:
        def __init__(self):
            self._builder = None

        @property
        def builder(self) -> ComputerBuilder:
            return self._builder

        @builder.setter
        def builder(self, builder: ComputerBuilder):
            self._builder = builder

        def build_gaming_pc(self):
            # This sequence defines a specific product (Gaming PC)
            self.builder.reset()
            self.builder.set_cpu("Intel i9-13900K")
            self.builder.set_ram("32GB DDR5")
            self.builder.set_storage("2TB NVMe SSD")
            self.builder.set_gpu("NVIDIA RTX 4090")
            self.builder.set_os("Windows 11 Pro")
            self.builder.add_extra_component("Liquid Cooler")
            self.builder.add_extra_component("RGB Keyboard")

        def build_office_pc(self):
            # This sequence defines another product (Office PC)
            self.builder.reset()
            self.builder.set_cpu("Intel i5-13600K")
            self.builder.set_ram("16GB DDR4")
            self.builder.set_storage("500GB SSD")
            self.builder.set_os("Windows 10 Home")
    ```
    *Explanation:* The `Director` takes a `ComputerBuilder` and provides methods (`build_gaming_pc`, `build_office_pc`) that encapsulate the specific sequence of calls to the builder to produce predefined configurations. This separates the complex construction logic from the client.

5.  **Client code usage:** The client can either use the `Director` for predefined configurations or directly interact with the builder for custom configurations.
    ```python
    # Client code
    print("--- Builder Example ---")
    director = Director()
    gaming_builder = GamingPCBuilder()
    director.builder = gaming_builder

    print("Building a Gaming PC via Director:")
    director.build_gaming_pc()
    gaming_pc = gaming_builder.get_result()
    gaming_pc.display_config()

    print("\nBuilding a Custom Office PC directly with Builder:")
    office_builder = GamingPCBuilder() # Can reuse the same builder implementation
    custom_office_pc = (office_builder.set_cpu("AMD Ryzen 7 7700")
                                      .set_ram("16GB DDR5")
                                      .set_storage("1TB NVMe SSD")
                                      .set_os("Ubuntu Linux")
                                      .add_extra_component("Ergonomic Mouse")
                                      .get_result())
    custom_office_pc.display_config()
    print("-----------------------")
    ```
    *Explanation:* The client first uses the `Director` to build a `GamingPC`. Then, it directly uses the `GamingPCBuilder` (which is a concrete builder) to create a `Custom Office PC` with method chaining, showing the flexibility.

**Final Answer:**
The Builder pattern successfully constructs complex `Computer` objects step-by-step, allowing for various configurations and decoupling the construction logic from the `Computer` class itself.

```python
from abc import ABC, abstractmethod

# Step 1: Define the Product class (the complex object to be built)
class Computer:
    def __init__(self):
        self.cpu = None
        self.ram = None
        self.storage = None
        self.gpu = None
        self.os = None
        self.components = []

    def add_component(self, component):
        self.components.append(component)

    def display_config(self):
        print("--- Computer Configuration ---")
        print(f"CPU: {self.cpu if self.cpu else 'N/A'}")
        print(f"RAM: {self.ram if self.ram else 'N/A'}")
        print(f"Storage: {self.storage if self.storage else 'N/A'}")
        print(f"GPU: {self.gpu if self.gpu else 'N/A'}")
        print(f"OS: {self.os if self.os else 'N/A'}")
        if self.components:
            print("Other Components:")
            for comp in self.components:
                print(f"  - {comp}")
        print("------------------------------")

# Step 2: Define an abstract ComputerBuilder interface
class ComputerBuilder(ABC):
    @abstractmethod
    def reset(self):
        pass

    @abstractmethod
    def set_cpu(self, cpu: str):
        pass

    @abstractmethod
    def set_ram(self, ram: str):
        pass

    @abstractmethod
    def set_storage(self, storage: str):
        pass

    @abstractmethod
    def set_gpu(self, gpu: str):
        pass

    @abstractmethod
    def set_os(self, os: str):
        pass

    @abstractmethod
    def add_extra_component(self, component: str):
        pass

    @abstractmethod
    def get_result(self) -> Computer:
        pass

# Step 3: Implement a concrete GamingPCBuilder
class GamingPCBuilder(ComputerBuilder):
    def __init__(self):
        self.reset()

    def reset(self):
        self._computer = Computer()

    def set_cpu(self, cpu: str):
        self._computer.cpu = cpu
        return self # Enable method chaining

    def set_ram(self, ram: str):
        self._computer.ram = ram
        return self

    def set_storage(self, storage: str):
        self._computer.storage = storage
        return self

    def set_gpu(self, gpu: str):
        self._computer.gpu = gpu
        return self

    def set_os(self, os: str):
        self._computer.os = os
        return self

    def add_extra_component(self, component: str):
        self._computer.add_component(component)
        return self

    def get_result(self) -> Computer:
        product = self._computer
        self.reset() # Reset builder for future use
        return product

# Step 4: Define a Director (optional)
class Director:
    def __init__(self):
        self._builder = None

    @property
    def builder(self) -> ComputerBuilder:
        return self._builder

    @builder.setter
    def builder(self, builder: ComputerBuilder):
        self._builder = builder

    def build_gaming_pc(self):
        self.builder.reset()
        self.builder.set_cpu("Intel i9-13900K").set_ram("32GB DDR5").set_storage("2TB NVMe SSD") \
                    .set_gpu("NVIDIA RTX 4090").set_os("Windows 11 Pro") \
                    .add_extra_component("Liquid Cooler").add_extra_component("RGB Keyboard")

    def build_office_pc(self):
        self.builder.reset()
        self.builder.set_cpu("Intel i5-13600K").set_ram("16GB DDR4").set_storage("500GB SSD") \
                    .set_os("Windows 10 Home")

# Step 5: Client code usage
print("--- Builder Example ---")
director = Director()
gaming_builder = GamingPCBuilder()
director.builder = gaming_builder

print("Building a Gaming PC via Director:")
director.build_gaming_pc()
gaming_pc = gaming_builder.get_result()
gaming_pc.display_config()

print("\nBuilding a Custom Office PC directly with Builder (method chaining):")
office_builder = GamingPCBuilder()
custom_office_pc = (office_builder.set_cpu("AMD Ryzen 7 7700")
                                  .set_ram("16GB DDR5")
                                  .set_storage("1TB NVMe SSD")
                                  .set_os("Ubuntu Linux")
                                  .add_extra_component("Ergonomic Mouse")
                                  .get_result())
custom_office_pc.display_config()
print("-----------------------")
```

**Reflection:** The "hard" part of the Builder pattern often lies in correctly designing the `Product` (to be flexible enough for various configurations), the `Builder` interface (to cover all necessary construction steps), and deciding whether a `Director` is truly beneficial or just adds overhead. Method chaining (`return self`) is a common and elegant way to make the builder API fluent.

### Example 4: Prototype - Shape Cloning (Medium)

**Problem:** Create new graphical shape objects (e.g., Circle, Rectangle) by copying existing ones, rather than re-initializing them from scratch. This is useful for creating many similar objects efficiently.

**Given:** `Circle` and `Rectangle` classes with specific attributes (color, position, radius/width/height).
**What we want:** A mechanism to clone these shapes, creating new, independent instances with the same initial state.

**Steps:**

1.  **Define a common `Shape` interface with a `clone()` method:** This interface will declare the `clone` method that all concrete shapes must implement.
    ```python
    from abc import ABC, abstractmethod
    import copy # For deep copying

    class Shape(ABC):
        def __init__(self, x: int, y: int, color: str):
            self.x = x
            self.y = y
            self.color = color

        @abstractmethod
        def clone(self):
            """Returns a deep copy of the object."""
            pass

        @abstractmethod
        def draw(self):
            pass
    ```
    *Explanation:* The `Shape` abstract class has common attributes (`x`, `y`, `color`) and declares the `clone()` and `draw()` abstract methods. `clone()` is the core of the Prototype pattern.

2.  **Create concrete `Shape` classes (e.g., `Circle`, `Rectangle`):** These classes will implement the `clone()` method to return a deep copy of themselves.
    ```python
    class Circle(Shape):
        def __init__(self, x: int, y: int, color: str, radius: int):
            super().__init__(x, y, color)
            self.radius = radius

        def clone(self):
            # Step 2: Implement clone using deepcopy to ensure independence
            return copy.deepcopy(self)

        def draw(self):
            print(f"Drawing a {self.color} Circle at ({self.x},{self.y}) with radius {self.radius}")

    class Rectangle(Shape):
        def __init__(self, x: int, y: int, color: str, width: int, height: int):
            super().__init__(x, y, color)
            self.width = width
            self.height = height

        def clone(self):
            # Step 2: Implement clone using deepcopy
            return copy.deepcopy(self)

        def draw(self):
            print(f"Drawing a {self.color} Rectangle at ({self.x},{self.y}) with width {self.width}, height {self.height}")
    ```
    *Explanation:* Both `Circle` and `Rectangle` extend `Shape`. Their `clone()` methods use `copy.deepcopy(self)` to create a new, independent object that is a copy of the current instance. This is critical for preventing changes in the cloned object from affecting the original.

3.  **Client code usage:** Create a prototype object, then clone it and modify the clone.
    ```python
    # Client code
    print("--- Prototype Example ---")

    # Create a prototype circle
    original_circle = Circle(10, 20, "Red", 5)
    original_circle.draw()

    # Clone the circle
    cloned_circle = original_circle.clone()
    cloned_circle.x = 30 # Modify the clone's position
    cloned_circle.color = "Blue" # Modify the clone's color
    cloned_circle.draw()

    # Verify original is unchanged
    original_circle.draw()
    print(f"Original circle ID: {id(original_circle)}, Cloned circle ID: {id(cloned_circle)}")
    print(f"Are original and cloned circles the same object? {original_circle is cloned_circle}") # False, they are distinct

    print("\n")

    # Create a prototype rectangle
    original_rectangle = Rectangle(50, 60, "Green", 10, 15)
    original_rectangle.draw()

    # Clone the rectangle
    cloned_rectangle = original_rectangle.clone()
    cloned_rectangle.y = 70 # Modify the clone's position
    cloned_rectangle.width = 20 # Modify the clone's width
    cloned_rectangle.draw()

    # Verify original is unchanged
    original_rectangle.draw()
    print(f"Original rectangle ID: {id(original_rectangle)}, Cloned rectangle ID: {id(cloned_rectangle)}")
    print(f"Are original and cloned rectangles the same object? {original_rectangle is cloned_rectangle}") # False
    print("-------------------------")
    ```
    *Explanation:* We create `original_circle`, then `cloned_circle` by calling `clone()`. We modify `cloned_circle`'s attributes. The output clearly shows that `original_circle` remains unchanged, and `id()` confirms they are distinct objects. This demonstrates successful deep copying.

**Final Answer:**
The Prototype pattern allows for efficient creation of new `Shape` objects by cloning existing ones, ensuring independence between the original and cloned objects.

```python
from abc import ABC, abstractmethod
import copy # Essential for deep copying

# Step 1: Define a common Shape interface with a clone() method
class Shape(ABC):
    def __init__(self, x: int, y: int, color: str):
        self.x = x
        self.y = y
        self.color = color

    @abstractmethod
    def clone(self):
        """Returns a deep copy of the object."""
        pass

    @abstractmethod
    def draw(self):
        pass

# Step 2: Create concrete Shape classes
class Circle(Shape):
    def __init__(self, x: int, y: int, color: str, radius: int):
        super().__init__(x, y, color)
        self.radius = radius
        # For demonstration of nested objects and deep copy importance
        self.metadata = {"creator": "PrototypeExample", "version": 1.0}

    def clone(self):
        # Using copy.deepcopy ensures all nested objects are also copied,
        # making the clone completely independent of the original.
        return copy.deepcopy(self)

    def draw(self):
        print(f"Drawing a {self.color} Circle at ({self.x},{self.y}) with radius {self.radius}. Metadata: {self.metadata}")

class Rectangle(Shape):
    def __init__(self, x: int, y: int, color: str, width: int, height: int):
        super().__init__(x, y, color)
        self.width = width
        self.height = height
        self.metadata = {"creator": "PrototypeExample", "version": 1.0}

    def clone(self):
        return copy.deepcopy(self)

    def draw(self):
        print(f"Drawing a {self.color} Rectangle at ({self.x},{self.y}) with width {self.width}, height {self.height}. Metadata: {self.metadata}")

# Step 3: Client code usage
print("--- Prototype Example ---")

# Create a prototype circle
original_circle = Circle(10, 20, "Red", 5)
original_circle.metadata["version"] = 1.1 # Modify original's nested object
original_circle.draw()

# Clone the circle
cloned_circle = original_circle.clone()
cloned_circle.x = 30
cloned_circle.color = "Blue"
cloned_circle.metadata["creator"] = "ClonedInstance" # Modify clone's nested object
cloned_circle.draw()

# Verify original is unchanged (especially its nested metadata)
original_circle.draw()
print(f"Original circle ID: {id(original_circle)}, Cloned circle ID: {id(cloned_circle)}")
print(f"Are original and cloned circles the same object? {original_circle is cloned_circle}")

print("\n")

# Create a prototype rectangle
original_rectangle = Rectangle(50, 60, "Green", 10, 15)
original_rectangle.draw()

# Clone the rectangle
cloned_rectangle = original_rectangle.clone()
cloned_rectangle.y = 70
cloned_rectangle.width = 20
cloned_rectangle.draw()

# Verify original is unchanged
original_rectangle.draw()
print(f"Original rectangle ID: {id(original_rectangle)}, Cloned rectangle ID: {id(cloned_rectangle)}")
print(f"Are original and cloned rectangles the same object? {original_rectangle is cloned_rectangle}")
print("-------------------------")
```

**Reflection:** The primary challenge with the Prototype pattern is correctly handling **shallow vs. deep copying**. If an object contains references to other objects, a shallow copy will copy only the references, meaning both the original and the clone will point to the *same* nested object. Modifying the nested object in the clone would then also modify it in the original. `copy.deepcopy()` in Python handles this recursively, but in languages like Java or C++, you often have to implement deep copy logic manually within the `clone()` method, which can be complex for deeply nested or circularly referenced objects.

## 6. Common mistakes and traps

1.  **Overuse of Singleton:** Treating Singleton as a glorified global variable. While it provides global access, it introduces tight coupling and makes testing difficult. Many Singletons can often be replaced by Dependency Injection or passing objects as parameters.
2.  **Non-Thread-Safe Singletons:** Forgetting to implement proper synchronization (e.g., locks, mutexes) in multi-threaded environments when initializing the Singleton instance. This can lead to multiple instances being created, violating the core principle.
3.  **Ignoring Interfaces/Abstract Classes for Factory Patterns:** Directly returning concrete types from factory methods or having concrete factory classes without a common interface. This defeats the purpose of decoupling and polymorphism, making the system rigid.
4.  **Shallow vs. Deep Copy in Prototype:** This is the most common and subtle error. If an object has complex internal state (objects within objects), a shallow copy will lead to shared state between the original and the clone, causing unexpected side effects. Always consider whether a deep copy is needed.
5.  **Builder Pattern Verbosity for Simple Objects:** Applying the Builder pattern to objects with only a few simple parameters. In such cases, a simple constructor or a static factory method is often clearer and less verbose.
6.  **Not Resetting the Builder:** Forgetting to call a `reset()` or `clear()` method on the builder after retrieving the product. This can lead to a builder retaining state from a previous construction, affecting subsequent products.
7.  **Confusing Factory Method and Abstract Factory:**
    *   **Factory Method:** A single abstract method in a `Creator` class that subclasses implement to produce *one type* of product. It's about letting subclasses decide *which* concrete product to instantiate.
    *   **Abstract Factory:** An interface for creating *families* of related products. It's about providing a factory that produces multiple, related products that belong to a specific "family" or "theme."

## 7. Textbook-precise explanation

Creational design patterns are a category of design patterns that deal with object creation mechanisms, trying to create objects in a manner suitable for the situation while increasing the flexibility and reuse of the code. They abstract the instantiation process, decoupling the client from the concrete classes that are instantiated.

**Singleton Pattern:**
*   **Definition:** Ensures a class has only one instance and provides a global point of access to it.
*   **Structure:** Typically involves a private constructor, a static private member to hold the single instance, and a static public method to access that instance.
*   **Formalization:** Let $C$ be a class. The Singleton pattern guarantees that there exists a unique instance $c \in C$. This uniqueness is enforced by restricting direct instantiation and providing a controlled access point.
    $$ \exists! c \in C \quad \text{such that} \quad \forall c' \in C, c' = c $$
*   **Reference:** Gamma, Helm, Johnson, Vlissides. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994. (Often referred to as the "Gang of Four" or GoF book).

**Factory Method Pattern:**
*   **Definition:** Defines an interface for creating an object, but lets subclasses decide which class to instantiate. The Factory Method lets a class defer instantiation to subclasses.
*   **Structure:**
    *   **Product (interface/abstract class):** Declares the interface for objects the factory method creates.
    *   **ConcreteProduct:** Implements the Product interface.
    *   **Creator (abstract class):** Declares the factory method, which returns an object of type Product. May also define an implementation of some operation that calls the factory method.
    *   **ConcreteCreator:** Overrides the factory method to return an instance of a ConcreteProduct.
*   **Formalization:** Let $P$ be the `Product` interface and $C$ be the `Creator` abstract class. $C$ declares a method $m() \to P$. For each `ConcreteCreator` $C_i$ (subclass of $C$), $m()$ is implemented to return a specific `ConcreteProduct` $P_j$ (implementing $P$).
*   **Reference:** GoF book.

**Abstract Factory Pattern:**
*   **Definition:** Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
*   **Structure:**
    *   **AbstractFactory (interface/abstract class):** Declares an interface for operations that create abstract products.
    *   **ConcreteFactory:** Implements the AbstractFactory interface to create concrete product objects that belong to a specific family.
    *   **AbstractProduct (interface/abstract class):** Declares an interface for a type of product object.
    *   **ConcreteProduct:** Implements the AbstractProduct interface.
    *   **Client:** Uses the AbstractFactory and AbstractProduct interfaces.
*   **Formalization:** Let $F$ be an `AbstractFactory` interface that declares methods $\{m_1(), m_2(), \dots, m_k()\}$, where each $m_i()$ returns an `AbstractProduct` $P_i$. A `ConcreteFactory` $F_j$ implements $F$ such that $m_i()$ returns `ConcreteProduct` $P_{i,j}$, where all $P_{i,j}$ belong to family $j$.
*   **Reference:** GoF book.

**Builder Pattern:**
*   **Definition:** Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
*   **Structure:**
    *   **Builder (interface/abstract class):** Specifies an abstract interface for creating parts of a Product object.
    *   **ConcreteBuilder:** Implements the Builder interface to construct and assemble parts of the product. It provides an interface for retrieving the product.
    *   **Product:** The complex object under construction.
    *   **Director (optional):** Constructs an object using the Builder interface.
*   **Formalization:** Let $B$ be the `Builder` interface with methods $\{b_1(), b_2(), \dots, b_k(), \text{getResult}() \to P \}$. A `Director` $D$ takes a `ConcreteBuilder` $B_i$ and calls its methods in a specific sequence to construct a `Product` $P$.
*   **Reference:** GoF book.

**Prototype Pattern:**
*   **Definition:** Specifies the kinds of objects to create using a prototypical instance, and creates new objects by copying this prototype.
*   **Structure:**
    *   **Prototype (interface/abstract class):** Declares an interface for cloning itself.
    *   **ConcretePrototype:** Implements the cloning operation.
    *   **Client:** Creates a new object by asking a prototype to clone itself.
*   **Formalization:** Let $P$ be the `Prototype` interface, declaring a method `clone() \to P$. Each `ConcretePrototype` $P_i$ implements `clone()` to return a new instance of $P_i$ that is a copy of itself.
*   **Reference:** GoF book.

## 8. ASCII diagrams

```text
                                +-------------------+
                                |     Singleton     |
                                +-------------------+
                                | - instance: Singleton | (static, private)
                                | - __init__()      | (private/protected)
                                +-------------------+
                                | + getInstance(): Singleton | (static, public)
                                +-------------------+
                                        ^
                                        |
                                        |  (getInstance() returns the same instance)
                                        |
                                +-------------------+
                                |       Client      |
                                +-------------------+
                                | + requestInstance()|
                                +-------------------+
```
*Description: The Singleton diagram shows a single class `Singleton`. It has a private static member `instance` that holds the sole object. Its constructor `__init__()` is private or protected to prevent direct instantiation. The public static method `getInstance()` is the only way to access the instance; it creates the instance if it doesn't exist, otherwise returns the existing one. The `Client` interacts solely through `getInstance()`.*

```text
                         +-------------------+             +-------------------+
                         | <<interface>>     |             | <<interface>>     |
                         |      Product      |             |     Creator       |
                         +-------------------+             +-------------------+
                         | + operation(): void |<--------->| + factoryMethod(): Product | (abstract)
                         +-------------------+             | + anOperation(): void | (calls factoryMethod)
                                 ^   ^                     +-------------------+
                                 |   |                             ^   ^
                                 |   |                             |   |
                  implements     |   | implements      extends     |   | extends
                                 |   |                             |   |
                  +--------------+   +--------------+  +-----------+   +-----------+
                  |  ConcreteProductA |              |  |ConcreteCreatorA|           |ConcreteCreatorB|
                  +-------------------+              +----------------