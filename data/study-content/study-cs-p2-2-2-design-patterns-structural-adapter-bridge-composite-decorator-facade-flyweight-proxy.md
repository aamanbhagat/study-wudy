## 1. What it is — in plain English

Imagine you're building with LEGOs. Sometimes, you have a really cool LEGO piece, but it doesn't quite fit with another piece you want to use. Or maybe you have a bunch of small pieces that, if put together in a specific way, could form a much bigger, more useful structure. That's essentially what "Structural Design Patterns" are about in programming.

These patterns are like blueprints for how to arrange classes and objects to form larger, more flexible structures. They help you make sure different parts of your software can work together smoothly, even if they weren't originally designed to. They focus on how objects are composed to achieve new functionality or to adapt existing structures.

Think of it this way: if Creational Patterns are about *how* you make new objects, and Behavioral Patterns are about *how* objects talk to each other, Structural Patterns are about *how* objects are put *together* to build bigger, more capable components. They help you organize your code so it's easier to understand, maintain, and extend without breaking existing parts.

For example, an **Adapter** pattern is like a universal travel adapter for your electronics; it lets a plug designed for one type of outlet work in another. A **Composite** pattern is like how a folder can contain both files and other folders, treating them all as "items." A **Decorator** pattern is like adding extra toppings to a basic ice cream cone, enhancing its features without changing the original cone itself.

Each of these patterns addresses a common problem related to the structure and composition of objects, making your software more robust and adaptable to change.

## 2. Why it matters — real-world applications

Structural Design Patterns are fundamental to building scalable, maintainable, and flexible software systems across various domains. Here are some concrete examples:

1.  **Integrating Legacy Systems (Adapter Pattern):**
    *   **Aerospace:** Imagine a new flight control system being developed, but it needs to interface with an existing, highly reliable, but old-fashioned navigation sensor suite. The sensor suite provides data in a proprietary format and uses an outdated communication protocol. An **Adapter** pattern would be used to wrap the legacy sensor's interface, translating its output into a format compatible with the new flight control system. This avoids rewriting the entire sensor driver, which could be costly and introduce new bugs into a safety-critical component.
    *   **Financial Services:** A bank acquires a smaller institution and needs to integrate its customer database and transaction processing systems. The legacy system has a unique API. An **Adapter** can be built to make the legacy system's API conform to the acquiring bank's standard data access interfaces, allowing new applications to seamlessly interact with old data without extensive refactoring of the legacy system itself.

2.  **Flexible UI Toolkits and Database Drivers (Bridge Pattern):**
    *   **Operating Systems/Software Libraries:** Cross-platform GUI toolkits (like Qt or JavaFX) use the **Bridge** pattern. They separate the abstract definition of a UI component (e.g., a "Button") from its concrete implementation on a specific operating system (e.g., a Windows button, a macOS button, a Linux button). This allows developers to write UI code once, and the toolkit dynamically "bridges" to the correct platform-specific rendering and event handling mechanisms at runtime.
    *   **Database Connectivity:** JDBC (Java Database Connectivity) and ODBC (Open Database Connectivity) are prime examples. The `Connection` and `Statement` interfaces define the abstract operations for interacting with a database. The concrete implementations (e.g., `OracleConnection`, `MySQLConnection`) are provided by specific database drivers. This **Bridge** allows applications to work with any database as long as there's a driver available, without changing the application's core logic.

3.  **Document Object Model (DOM) and File Systems (Composite Pattern):**
    *   **Web Browsers/XML Parsers:** The DOM, which represents HTML or XML documents, is a classic application of the **Composite** pattern. A `Node` can be an element (like `<p>` or `<div>`), which can contain other `Node`s (text, other elements), or it can be a simple text node. This allows a browser to treat individual elements and entire subtrees uniformly, enabling operations like `getElementById` or `traverse` to work consistently across the entire document structure.
    *   **Operating Systems:** File systems inherently use the **Composite** pattern. A `File` and a `Directory` (which can contain `Files` and other `Directories`) are both treated as `FileSystemEntry` objects. Operations like `delete`, `move`, or `calculateSize` can be applied uniformly to both individual files and entire directories, simplifying the file system API.

4.  **Feature-Rich Stream Processing and Logging (Decorator Pattern):**
    *   **Data Science/Machine Learning Pipelines:** In data processing, you might have a basic data stream (`DataSource`). You then want to add features like compression, encryption, or logging to this stream. A **Decorator** pattern allows you to dynamically wrap the `DataSource` with `CompressedDataSource`, `EncryptedDataSource`, or `LoggedDataSource` objects. Each decorator adds its specific functionality without altering the original `DataSource` or requiring an explosion of subclasses for every combination of features.
    *   **Java I/O Streams:** Java's `java.io` package is a canonical example. You have a basic `InputStream` (e.g., `FileInputStream`). You can then wrap it with `BufferedInputStream` for performance, `DataInputStream` for reading primitive types, or `GZIPInputStream` for decompression. Each wrapper adds functionality while maintaining the `InputStream` interface.

5.  **Simplifying Complex APIs (Facade Pattern):**
    *   **Game Engines:** Initializing a game engine often involves configuring rendering systems, audio systems, input managers, physics engines, and asset loaders. A **Facade** pattern provides a single `GameEngine` class with a simple `initialize()` method that orchestrates all these complex subsystem setups. This hides the intricate details from the game developer, presenting a clean, high-level interface.
    *   **Machine Learning Libraries:** Libraries like scikit-learn or TensorFlow often present high-level APIs that internally coordinate many complex statistical and numerical operations. A `fit()` method on a `Model` object acts as a **Facade**, hiding the details of gradient descent, backpropagation, or matrix factorization from the user, who only needs to provide data and call the method.

6.  **Memory Optimization in Large-Scale Systems (Flyweight Pattern):**
    *   **Text Editors/Word Processors:** In a document with thousands of characters, each character object could consume significant memory if it stores its font, size, and color information individually. The **Flyweight** pattern is used here: intrinsic (shared) state like font type, size, and color is stored once and shared across many character objects. The extrinsic (unique) state, like the character's position, is stored externally by the client. This drastically reduces memory footprint, especially for common characters.
    *   **Game Development:** Imagine a forest in a game with thousands of trees. Instead of creating a unique `Tree` object for each tree (each with its own mesh, texture, and material data), the **Flyweight** pattern allows you to create a few `TreeModel` objects (e.g., "Oak", "Pine", "Birch") that hold the shared graphical data. Each individual tree in the game world then only needs to store its unique position, scale, and rotation, referencing one of the shared `TreeModel` flyweights.

7.  **Access Control and Lazy Loading (Proxy Pattern):**
    *   **Remote Method Invocation (RMI) / Web Services:** When you call a method on an object that actually resides on a different machine, you're using a **Proxy**. The local proxy object has the same interface as the remote object. When you call a method on the proxy, it handles the network communication, serialization, and deserialization to forward the call to the real object on the remote server and return the result.
    *   **Image Loading in UI:** In applications displaying many images (e.g., a photo gallery), loading all images upfront can consume huge amounts of memory and slow down startup. A **Virtual Proxy** for an `Image` object can be used. The `ProxyImage` initially holds just the image filename. When the `display()` method is called, and only then, does the `ProxyImage` create and delegate to a `RealImage` object to load the actual image data from disk. This implements "lazy loading," improving performance and reducing memory usage.

## 3. Prerequisites — what you must know first

Before diving deep into Structural Design Patterns, you must have a solid grasp of the following fundamental Computer Science and Object-Oriented Programming (OOP) concepts:

*   **Object-Oriented Programming (OOP) Fundamentals:** A clear understanding of classes, objects, constructors, methods, fields, and how they interact.
*   **Encapsulation:** The principle of bundling data (attributes) and methods (functions) that operate on the data into a single unit (class), and restricting direct access to some of an object's components.
*   **Inheritance:** The mechanism by which one class acquires the properties and behaviors of another class, forming a hierarchical relationship (is-a relationship).
*   **Polymorphism:** The ability of an object to take on many forms, typically achieved through method overriding or interface implementation, allowing a single interface to represent different underlying forms (e.g., a base class reference variable can refer to objects of derived classes).
*   **Abstraction:** The concept of hiding complex implementation details and showing only the essential features of an object. This is often achieved through abstract classes and interfaces.
*   **Interfaces:** A contract that defines a set of methods that a class must implement. It specifies *what* an object can do, without specifying *how* it does it.
*   **Abstract Classes:** Classes that cannot be instantiated directly and often contain abstract methods (methods without an implementation) that must be implemented by concrete subclasses. They provide a partial implementation and define a common interface for a family of related classes.
*   **Delegation:** A design technique where an object (the delegator) handles a request by passing it on to another object (the delegate) that is responsible for the actual work. This is a powerful alternative to inheritance for achieving code reuse.
*   **Composition over Inheritance:** A design principle stating that classes should achieve polymorphic behavior and code reuse by containing instances of other classes (composition) rather than by inheriting from them. This promotes flexibility and avoids the "fragile base class" problem.
*   **SOLID Principles (especially Open/Closed and Liskov Substitution):**
    *   **Open/Closed Principle (OCP):** Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification. This means you should be able to add new functionality without changing existing, working code.
    *   **Liskov Substitution Principle (LSP):** Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program. If `S` is a subtype of `T`, then objects of type `T` may be replaced with objects of type `S` without breaking the program.
*   **Basic Software Design Principles:** Familiarity with ideas like DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid), and YAGNI (You Ain't Gonna Need It).

## 4. The core idea — step by step

Structural patterns are about how classes and objects are composed to form larger structures. They focus on relationships between objects, making them more flexible and efficient. Let's explore each pattern.

### Step 1: The Adapter Pattern

**Plain-English Statement:** The Adapter pattern helps two incompatible interfaces work together. It's like a universal travel adapter that lets your European hairdryer plug into an American outlet, or a language translator allowing two people speaking different languages to communicate.

**Small Concrete Example:**
Imagine you have a `LegacyLogger` class with a method `logMessage(String message, int level)`. Your new system expects an `ILogger` interface with a method `log(String message)`. You can create an `OldLoggerAdapter` that implements `ILogger` and, in its `log` method, calls the `LegacyLogger`'s `logMessage` method, mapping the new `String` message to the old `String` message and providing a default `int` level.

**Formal/Mathematical Version:**
Let $T$ be the `Target` interface that the client expects, and $A$ be the `Adaptee` class with an incompatible interface. The `Adapter` class $AD$ implements $T$ and holds an instance of $A$.
$$
\text{interface Target} \{ \\
\quad \text{void request(); } \\
\} \\
\\
\text{class Adaptee} \{ \\
\quad \text{void specificRequest(); } \\
\} \\
\\
\text{class Adapter implements Target} \{ \\
\quad \text{private Adaptee adaptee;} \\
\quad \text{public Adapter(Adaptee a) } \{ \\
\quad \quad \text{this.adaptee = a;} \\
\quad \} \\
\quad \text{public void request() } \{ \\
\quad \quad \text{adaptee.specificRequest(); } \\
\quad \} \\
\}
$$
The client interacts only with the `Target` interface, unaware of the `Adaptee`'s specific interface.

**What could go wrong:**
Over-reliance on adapters can lead to a proliferation of adapter classes, making the codebase harder to navigate. If the `Adaptee`'s interface changes frequently, the `Adapter` will also need frequent updates. It can also mask deeper design issues if used to avoid proper refactoring of poorly designed interfaces.

### Step 2: The Bridge Pattern

**Plain-English Statement:** The Bridge pattern separates an object's abstraction (what it *is* or *does*) from its implementation (how it *does* it). This allows both parts to change independently without affecting each other. Think of a remote control (abstraction) and the device it controls (implementation) – you can use the same remote for different TVs, and a TV can be controlled by different remotes.

**Small Concrete Example:**
Consider a `Shape` abstraction (e.g., `Circle`, `Square`) and a `DrawingAPI` implementation (e.g., `OpenGLDrawingAPI`, `DirectXDrawingAPI`). Instead of having `OpenGLCircle`, `DirectXCircle`, `OpenGLSquare`, `DirectXSquare` (a class explosion), you can have `Circle` and `Square` classes that *contain* a `DrawingAPI` object. A `Circle` then delegates its drawing operation to its contained `DrawingAPI` object.

**Formal/Mathematical Version:**
Let $A$ be the `Abstraction` and $I$ be the `Implementor` interface. $A$ contains a reference to $I$. Concrete abstractions ($A_1, A_2, \dots$) can vary independently of concrete implementors ($I_1, I_2, \dots$).
$$
\text{interface Implementor} \{ \\
\quad \text{void operationImpl(); } \\
\} \\
\\
\text{class ConcreteImplementorA implements Implementor} \{ \\
\quad \text{public void operationImpl() } \{ \dots \} \\
\} \\
\\
\text{class ConcreteImplementorB implements Implementor} \{ \\
\quad \text{public void operationImpl() } \{ \dots \} \\
\} \\
\\
\text{abstract class Abstraction} \{ \\
\quad \text{protected Implementor implementor;} \\
\quad \text{public Abstraction(Implementor impl) } \{ \\
\quad \quad \text{this.implementor = impl;} \\
\quad \} \\
\quad \text{public abstract void operation(); } \\
\} \\
\\
\text{class RefinedAbstraction extends Abstraction} \{ \\
\quad \text{public RefinedAbstraction(Implementor impl) } \{ \\
\quad \quad \text{super(impl); } \\
\quad \} \\
\quad \text{public void operation() } \{ \\
\quad \quad \text{implementor.operationImpl(); } \\
\quad \} \\
\}
$$
The `Abstraction` delegates its operations to its `Implementor` object.

**What could go wrong:**
Introducing the Bridge pattern can add initial complexity to the design, as it requires creating separate hierarchies for abstraction and implementation. If the abstraction and implementation are tightly coupled and unlikely to vary independently, the Bridge might be an over-engineering.

### Step 3: The Composite Pattern

**Plain-English Statement:** The Composite pattern lets you treat individual objects and compositions of objects uniformly. It's like how a file system treats a single file and a directory (which contains many files and other directories) as the same "file system entry." This allows you to perform operations on a group of objects as if they were a single object.

**Small Concrete Example:**
In a graphics editor, you can have individual `Shape` objects (e.g., `Circle`, `Rectangle`) and `Group` objects, which contain multiple `Shape` or `Group` objects. Both `Shape` and `Group` implement a common `Graphic` interface with a `draw()` method. When `draw()` is called on a `Group`, it iterates through its children and calls `draw()` on each of them.

**Formal/Mathematical Version:**
Let $C$ be the `Component` interface, which defines operations common to both individual objects and composites. $L$ is a `Leaf` (individual object) and $CO$ is a `Composite` (group of objects). $CO$ contains a collection of $C$ objects.
$$
\text{interface Component} \{ \\
\quad \text{void operation(); } \\
\quad \text{void add(Component c); } \\
\quad \text{void remove(Component c); } \\
\quad \text{Component getChild(int i); } \\
\} \\
\\
\text{class Leaf implements Component} \{ \\
\quad \text{public void operation() } \{ \dots \} \\
\quad \text{public void add(Component c) } \{ \text{throw new UnsupportedOperationException();} \} \\
\quad \text{public void remove(Component c) } \{ \text{throw new UnsupportedOperationException();} \} \\
\quad \text{public Component getChild(int i) } \{ \text{throw new UnsupportedOperationException();} \} \\
\} \\
\\
\text{class Composite implements Component} \{ \\
\quad \text{private List<Component> children;} \\
\quad \text{public void operation() } \{ \\
\quad \quad \text{for (Component c : children) } \{ \\
\quad \quad \quad \text{c.operation(); } \\
\quad \quad \} \\
\quad \} \\
\quad \text{public void add(Component c) } \{ \text{children.add(c);} \} \\
\quad \text{public void remove(Component c) } \{ \text{children.remove(c);} \} \\
\quad \text{public Component getChild(int i) } \{ \text{return children.get(i);} \} \\
\}
$$
Clients interact with `Component` objects, treating `Leaf` and `Composite` objects uniformly. Note that `add`, `remove`, `getChild` operations might be defined on `Component` but throw `UnsupportedOperationException` for `Leaf` objects, or they might be defined only on `Composite` if type safety is prioritized over transparency. The GoF book suggests placing them in `Component` for transparency.

**What could go wrong:**
The Composite pattern can make it difficult to restrict the types of components that can be added to a composite if the `add` method is defined in the base `Component` interface. This "type safety vs. transparency" trade-off needs careful consideration. It can also lead to issues if the client assumes all components are composites and tries to add children to leaves.

### Step 4: The Decorator Pattern

**Plain-English Statement:** The Decorator pattern allows you to add new functionalities to an object dynamically without changing its structure. It's like adding toppings to a coffee or ice cream – each topping adds a new feature or modifies the existing one, but the core item remains the same. It's an alternative to subclassing for extending functionality.

**Small Concrete Example:**
You have a `Coffee` object that returns "Basic Coffee" for its description and "$5.00" for its cost. You want to add `Milk`, `Sugar`, and `Whip` to it. You create a `MilkDecorator` that wraps the `Coffee` object, overriding its `getDescription()` to add "with Milk" and its `cost()` to add "$0.50". You can then wrap this `MilkDecorator` with a `SugarDecorator`, and so on.

**Formal/Mathematical Version:**
Let $C$ be the `Component` interface. A `ConcreteComponent` implements $C$. A `Decorator` is an abstract class that also implements $C$ and holds a reference to a $C$ object. `ConcreteDecoratorA`, `ConcreteDecoratorB`, etc., extend `Decorator`.
$$
\text{interface Component} \{ \\
\quad \text{String operation(); } \\
\} \\
\\
\text{class ConcreteComponent implements Component} \{ \\
\quad \text{public String operation() } \{ \\
\quad \quad \text{return "ConcreteComponent operation";} \\
\quad \} \\
\} \\
\\
\text{abstract class Decorator implements Component} \{ \\
\quad \text{protected Component component;} \\
\quad \text{public Decorator(Component c) } \{ \\
\quad \quad \text{this.component = c;} \\
\quad \} \\
\quad \text{public String operation() } \{ \\
\quad \quad \text{return component.operation(); } \\
\quad \} \\
\} \\
\\
\text{class ConcreteDecoratorA extends Decorator} \{ \\
\quad \text{public ConcreteDecoratorA(Component c) } \{ \\
\quad \quad \text{super(c); } \\
\quad \} \\
\quad \text{public String operation() } \{ \\
\quad \quad \text{return "DecoratorA(" + super.operation() + ")";} \\
\quad \} \\
\}
$$
The client can wrap a `ConcreteComponent` with multiple `ConcreteDecorator`s, each adding its own behavior before or after delegating to the wrapped component.

**What could go wrong:**
Decorators can lead to many small objects, making debugging and understanding the object graph more complex. If the order of decorators matters, it can be tricky to manage. It's also not suitable if the core functionality needs to be changed, only if additional responsibilities are to be added.

### Step 5: The Facade Pattern

**Plain-English Statement:** The Facade pattern provides a simplified, high-level interface to a complex subsystem. It's like the dashboard of a car: you interact with a few simple controls (steering wheel, accelerator, brake) to manage a highly complex engine, transmission, and braking system without needing to know their internal workings.

**Small Concrete Example:**
A `Computer` class could act as a facade for starting up a computer. Internally, it might involve interacting with `CPU`, `Memory`, `HardDrive`, and `BIOS` objects, calling methods like `CPU.start()`, `Memory.loadOS()`, `HardDrive.readBootSector()`, `BIOS.powerOnSelfTest()`. The client just calls `Computer.start()`.

**Formal/Mathematical Version:**
Let $S_1, S_2, \dots, S_n$ be classes within a complex subsystem. The `Facade` class $F$ provides a single, simplified interface to these classes.
$$
\text{class SubsystemClass1} \{ \\
\quad \text{void operation1(); } \\
\quad \text{void operationX(); } \\
\} \\
\\
\text{class SubsystemClass2} \{ \\
\quad \text{void operation2(); } \\
\quad \text{void operationY(); } \\
\} \\
\\
\text{class Facade} \{ \\
\quad \text{private SubsystemClass1 subsystem1;} \\
\quad \text{private SubsystemClass2 subsystem2;} \\
\\
\quad \text{public Facade() } \{ \\
\quad \quad \text{this.subsystem1 = new SubsystemClass1(); } \\
\quad \quad \text{this.subsystem2 = new SubsystemClass2(); } \\
\quad \} \\
\\
\quad \text{public void simplifiedOperation() } \{ \\
\quad \quad \text{subsystem1.operationX(); } \\
\quad \quad \text{subsystem2.operationY(); } \\
\quad \quad \text{subsystem1.operation1(); } \\
\quad \} \\
\}
$$
The client interacts only with `Facade` for common tasks, optionally accessing subsystem classes directly for advanced functionality.

**What could go wrong:**
A Facade can become a "god object" if it tries to manage too many unrelated subsystems or exposes too much of the subsystem's functionality, defeating its purpose of simplification. It can also become a bottleneck if not designed carefully.

### Step 6: The Flyweight Pattern

**Plain-English Statement:** The Flyweight pattern minimizes memory usage by sharing as much data as possible between multiple objects. It achieves this by separating the intrinsic (shared, context-independent) state from the extrinsic (unique, context-dependent) state. Think of it like a shared font library for a text editor: instead of each character object storing its font, size, and style, these properties are stored once and referenced by many character objects.

**Small Concrete Example:**
In a game, you might have thousands of tree objects. Instead of each `Tree` instance having its own `Mesh` and `Texture` objects, you can create a few `TreeModel` objects (e.g., `OakModel`, `PineModel`) that hold the shared `Mesh` and `Texture`. Each actual `Tree` object in the game world then only needs to store its unique position, scale, and a reference to its `TreeModel` flyweight.

**Formal/Mathematical Version:**
Let $F$ be the `Flyweight` interface. `ConcreteFlyweight` objects store `intrinsicState`. `FlyweightFactory` manages and retrieves shared `Flyweight` objects. Clients pass `extrinsicState` to `Flyweight` operations.
$$
\text{interface Flyweight} \{ \\
\quad \text{void operation(ExtrinsicState extrinsicState); } \\
\} \\
\\
\text{class ConcreteFlyweight implements Flyweight} \{ \\
\quad \text{private IntrinsicState intrinsicState;} \\
\\
\quad \text{public ConcreteFlyweight(IntrinsicState is) } \{ \\
\quad \quad \text{this.intrinsicState = is;} \\
\quad \} \\
\\
\quad \text{public void operation(ExtrinsicState extrinsicState) } \{ \\
\quad \quad \text{// Use intrinsicState and extrinsicState} \\
\quad \quad \text{System.out.println("Intrinsic: " + intrinsicState + ", Extrinsic: " + extrinsicState);} \\
\quad \} \\
\} \\
\\
\text{class FlyweightFactory} \{ \\
\quad \text{private Map<IntrinsicState, Flyweight> flyweights;} \\
\\
\quad \text{public FlyweightFactory() } \{ \\
\quad \quad \text{this.flyweights = new HashMap<>(); } \\
\quad \} \\
\\
\quad \text{public Flyweight getFlyweight(IntrinsicState key) } \{ \\
\quad \quad \text{if (!flyweights.containsKey(key)) } \{ \\
\quad \quad \quad \text{flyweights.put(key, new ConcreteFlyweight(key)); } \\
\quad \quad \} \\
\quad \quad \text{return flyweights.get(key); } \\
\quad \} \\
\}
$$
Clients request flyweights from the `FlyweightFactory`, passing unique `extrinsicState` when invoking operations.

**What could go wrong:**
The Flyweight pattern can introduce complexity by requiring careful separation of intrinsic and extrinsic state, which might not always be straightforward. If the number of shared objects is not significantly large, or if the memory savings are negligible, the added complexity might not be justified.

### Step 7: The Proxy Pattern

**Plain-English Statement:** The Proxy pattern provides a substitute or placeholder for another object to control access to it. It's like a security guard (proxy) standing in front of a VIP (real object), controlling who gets to interact with the VIP, or a stand-in actor (proxy) performing actions until the real actor (real object) is ready.

**Small Concrete Example:**
You have a `RealImage` class that loads a large image from disk, which is a slow operation. You want to display thumbnails quickly and only load the full image when a user clicks on it. You can create a `ProxyImage` class that implements the same `Image` interface. `ProxyImage` initially only stores the filename. When its `display()` method is called, it checks if the `RealImage` has been loaded; if not, it loads it, then delegates the `display()` call to the `RealImage`.

**Formal/Mathematical Version:**
Let $S$ be the `Subject` interface, which both the `RealSubject` and `Proxy` implement. The `Proxy` holds a reference to the `RealSubject`.
$$
\text{interface Subject} \{ \\
\quad \text{void request(); } \\
\} \\
\\
\text{class RealSubject implements Subject} \{ \\
\quad \text{public void request() } \{ \\
\quad \quad \text{// Perform actual, possibly heavy, operation} \\
\quad \quad \text{System.out.println("RealSubject: Handling request.");} \\
\quad \} \\
\} \\
\\
\text{class Proxy implements Subject} \{ \\
\quad \text{private RealSubject realSubject;} \\
\\
\quad \text{public void request() } \{ \\
\quad \quad \text{if (realSubject == null) } \{ \\
\quad \quad \quad \text{realSubject = new RealSubject(); // Lazy initialization} \\
\quad \quad \} \\
\quad \quad \text{// Add access control, logging, caching, etc. here} \\
\quad \quad \text{System.out.println("Proxy: Logging request.");} \\
\quad \quad \text{realSubject.request(); } \\
\quad \} \\
\}
$$
The client interacts with the `Proxy` as if it were the `RealSubject`. The `Proxy` can control access, provide logging, implement lazy loading, or perform other pre/post-processing.

**What could go wrong:**
A Proxy can introduce overhead due to the extra layer of indirection. If the proxy's responsibilities become too broad, it can become complex and difficult to maintain. Overuse can also lead to an unnecessary proliferation of classes.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding.

### Example 1: Adapter Pattern — Legacy Temperature Sensor

**Problem:**
You are building a new smart home system that requires temperature readings in Celsius. You have an existing, reliable, but old temperature sensor that only provides readings in Fahrenheit through a specific interface. You need to integrate this legacy sensor into your new system.

**Identify what's given and what we want:**
*   **Given:**
    *   A new system expecting an interface `TemperatureSensor` with a method `getTemperatureCelsius()`.
    *   A `LegacyFahrenheitSensor` class with a method `getFahrenheitReading()`.
*   **Wanted:**
    *   An `Adapter` class that implements `TemperatureSensor` and wraps `LegacyFahrenheitSensor`, converting Fahrenheit to Celsius.

**Show every algebraic / logical step:**

1.  **Define the Target Interface:** First, we define the interface that our new system expects. This is our `Target`.
    ```
    interface TemperatureSensor {
        double getTemperatureCelsius();
    }
    ```
    *Explanation:* This sets the contract for any temperature sensor in our new system. It specifies that we need a method to get temperature in Celsius.

2.  **Define the Adaptee Class:** Next, we have the existing legacy sensor. This is our `Adaptee`.
    ```
    class LegacyFahrenheitSensor {
        public double getFahrenheitReading() {
            // Simulates reading from a physical sensor
            // For example, return a fixed value for demonstration
            return 68.0; // 20 degrees Celsius
        }
    }
    ```
    *Explanation:* This is the class we cannot modify. It provides temperature in Fahrenheit.

3.  **Create the Adapter Class:** Now, we create our `FahrenheitToCelsiusAdapter` class. It must implement the `TemperatureSensor` interface and contain an instance of `LegacyFahrenheitSensor`.
    ```
    class FahrenheitToCelsiusAdapter implements TemperatureSensor {
        private LegacyFahrenheitSensor legacySensor;

        public FahrenheitToCelsiusAdapter(LegacyFahrenheitSensor sensor) {
            this.legacySensor = sensor;
        }

        @Override
        public double getTemperatureCelsius() {
            // Step 3a: Get the reading from the legacy sensor in Fahrenheit.
            double fahrenheit = legacySensor.getFahrenheitReading();

            // Step 3b: Convert Fahrenheit to Celsius.
            // The formula for Fahrenheit to Celsius is (F - 32) * 5/9.
            double celsius = (fahrenheit - 32) * 5.0 / 9.0;

            // Step 3c: Return the converted value.
            return celsius;
        }
    }
    ```
    *Explanation:*
    *   The adapter implements `TemperatureSensor`, fulfilling the new system's contract.
    *   It holds a reference to `LegacyFahrenheitSensor` so it can communicate with it.
    *   The `getTemperatureCelsius()` method is where the magic happens: it calls the adaptee's method, performs the necessary conversion, and then returns the result in the expected format.

4.  **Client Usage:** Finally, we show how the new system (client) would use the adapter.
    ```
    class SmartHomeController {
        private TemperatureSensor sensor;

        public SmartHomeController(TemperatureSensor sensor) {
            this.sensor = sensor;
        }

        public void displayCurrentTemperature() {
            double tempCelsius = sensor.getTemperatureCelsius();
            System.out.println("Current room temperature: " + tempCelsius + " °C");
        }
    }

    // Main application setup
    public class AdapterDemo {
        public static void main(String[] args) {
            // Create the legacy sensor
            LegacyFahrenheitSensor oldSensor = new LegacyFahrenheitSensor();

            // Create the adapter, wrapping the legacy sensor
            TemperatureSensor adapter = new FahrenheitToCelsiusAdapter(oldSensor);

            // Use the adapter in the new system
            SmartHomeController controller = new SmartHomeController(adapter);
            controller.displayCurrentTemperature();
        }
    }
    ```
    *Explanation:* The `SmartHomeController` doesn't know or care that it's talking to a legacy sensor. It just interacts with the `TemperatureSensor` interface, which the adapter correctly implements.

**Final Answer:**
The `FahrenheitToCelsiusAdapter` successfully converts the Fahrenheit reading from `LegacyFahrenheitSensor` into Celsius, allowing it to integrate seamlessly with the `TemperatureSensor` interface expected by `SmartHomeController`.
The output would be:
```text
Current room temperature: 20.0 °C
```

**Reflection on what made the example tricky:**
This example is relatively straightforward because the conversion logic is simple. The trickiest part is understanding the roles: which is the `Target`, which is the `Adaptee`, and how the `Adapter` acts as the bridge. Ensuring the adapter correctly implements the `Target` interface and correctly delegates and transforms calls to the `Adaptee` is key.

---

### Example 2: Composite Pattern — Organizational Chart

**Problem:**
Design a system to represent an organizational hierarchy (employees and teams) where both individual employees and entire teams can be treated uniformly when performing operations like displaying their details or calculating total salaries.

**Identify what's given and what we want:**
*   **Given:**
    *   Individual `Employee` objects with a name, position, and salary.
    *   `Team` objects that can contain `Employee` objects and other `Team` objects.
*   **Wanted:**
    *   A common interface `OrganizationalUnit` for both `Employee` and `Team`.
    *   The ability to display details and calculate total salaries for any `OrganizationalUnit`, whether it's a single employee or a complex team structure.

**Show every algebraic / logical step:**

1.  **Define the Component Interface:** This interface will be implemented by both `Employee` (Leaf) and `Team` (Composite).
    ```
    interface OrganizationalUnit {
        void displayDetails(int indentLevel);
        double getSalary();
        // For composite-specific operations, we'll add them here as per GoF.
        // Leaves will throw UnsupportedOperationException.
        void addUnit(OrganizationalUnit unit);
        void removeUnit(OrganizationalUnit unit);
    }
    ```
    *Explanation:* `displayDetails` shows the unit's info, `getSalary` returns its salary. `addUnit` and `removeUnit` are for managing children in composite objects.

2.  **Define the Leaf Class (`Employee`):** This is the individual component.
    ```
    class Employee implements OrganizationalUnit {
        private String name;
        private String position;
        private double salary;

        public Employee(String name, String position, double salary) {
            this.name = name;
            this.position = position;
            this.salary = salary;
        }

        @Override
        public void displayDetails(int indentLevel) {
            String indent = "  ".repeat(indentLevel);
            System.out.println(indent + "- Employee: " + name + " (" + position + "), Salary: $" + salary);
        }

        @Override
        public double getSalary() {
            return salary;
        }

        @Override
        public void addUnit(OrganizationalUnit unit) {
            throw new UnsupportedOperationException("Cannot add units to an employee.");
        }

        @Override
        public void removeUnit(OrganizationalUnit unit) {
            throw new UnsupportedOperationException("Cannot remove units from an employee.");
        }
    }
    ```
    *Explanation:* An `Employee` has its own details and salary. It throws `UnsupportedOperationException` for `addUnit` and `removeUnit` because it's a leaf.

3.  **Define the Composite Class (`Team`):** This class can contain other `OrganizationalUnit`s.
    ```
    import java.util.ArrayList;
    import java.util.List;

    class Team implements OrganizationalUnit {
        private String name;
        private String department;
        private List<OrganizationalUnit> members;

        public Team(String name, String department) {
            this.name = name;
            this.department = department;
            this.members = new ArrayList<>();
        }

        @Override
        public void addUnit(OrganizationalUnit unit) {
            members.add(unit);
        }

        @Override
        public void removeUnit(OrganizationalUnit unit) {
            members.remove(unit);
        }

        @Override
        public void displayDetails(int indentLevel) {
            String indent = "  ".repeat(indentLevel);
            System.out.println(indent + "+ Team: " + name + " (" + department + ")");
            for (OrganizationalUnit unit : members) {
                unit.displayDetails(indentLevel + 1); // Recursively display children
            }
        }

        @Override
        public double getSalary() {
            double totalSalary = 0;
            for (OrganizationalUnit unit : members) {
                totalSalary += unit.getSalary(); // Recursively sum children's salaries
            }
            return totalSalary;
        }
    }
    ```
    *Explanation:*
    *   A `Team` has a name and department and a list of `members` (which can be `Employee`s or other `Team`s).
    *   `addUnit` and `removeUnit` manage its children.
    *   `displayDetails` prints its own info, then iterates and calls `displayDetails` on each of its members, incrementing the indent level for visual hierarchy. This is the recursive part of the composite pattern.
    *   `getSalary` sums the salaries of all its members, again recursively.

4.  **Client Usage (Building and Traversing the Hierarchy):**
    ```
    public class OrgChartDemo {
        public static void main(String[] args) {
            // Create individual employees (leaves)
            Employee ceo = new Employee("Alice", "CEO", 200000.0);
            Employee cto = new Employee("Bob", "CTO", 180000.0);
            Employee devLead1 = new Employee("Charlie", "Dev Lead", 120000.0);
            Employee devLead2 = new Employee("Diana", "Dev Lead", 125000.0);
            Employee dev1 = new Employee("Eve", "Developer", 90000.0);
            Employee dev2 = new Employee("Frank", "Developer", 92000.0);
            Employee qaLead = new Employee("Grace", "QA Lead", 110000.0);
            Employee qa1 = new Employee("Heidi", "QA Engineer", 85000.0);

            // Create teams (composites)
            Team devTeamA = new Team("Development Team A", "Engineering");
            devTeamA.addUnit(devLead1);
            devTeamA.addUnit(dev1);
            devTeamA.addUnit(dev2);

            Team devTeamB = new Team("Development Team B", "Engineering");
            devTeamB.addUnit(devLead2);

            Team qaTeam = new Team("QA Team", "Engineering");
            qaTeam.addUnit(qaLead);
            qaTeam.addUnit(qa1);

            Team engineeringDept = new Team("Engineering Department", "Company");
            engineeringDept.addUnit(cto);
            engineeringDept.addUnit(devTeamA);
            engineeringDept.addUnit(devTeamB);
            engineeringDept.addUnit(qaTeam);

            Team companyRoot = new Team("Acme Corp", "Company");
            companyRoot.addUnit(ceo);
            companyRoot.addUnit(engineeringDept);

            // Display the entire organizational chart
            System.out.println("--- Organizational Chart ---");
            companyRoot.displayDetails(0);

            // Calculate total salary for the entire company
            System.out.println("\n--- Salary Report ---");
            double totalCompanySalary = companyRoot.getSalary();
            System.out.println("Total salary for Acme Corp: $" + totalCompanySalary);

            // Calculate total salary for a specific team
            double totalDevTeamASalary = devTeamA.getSalary();
            System.out.println("Total salary for Development Team A: $" + totalDevTeamASalary);
        }
    }
    ```
    *Explanation:* We construct a tree-like structure where `Team` objects contain other `Team` objects and `Employee` objects. The client code then calls `displayDetails()` or `getSalary()` on the top-level `companyRoot` (or any `Team` or `Employee`), and the composite pattern handles the recursive traversal and aggregation automatically.

**Final Answer:**
The `OrganizationalUnit` interface, implemented by `Employee` (leaf) and `Team` (composite), allows for a uniform treatment of individual employees and teams.
The output would be:
```text
--- Organizational Chart ---
+ Team: Acme Corp (Company)
  - Employee: Alice (CEO), Salary: $200000.0
  + Team: Engineering Department (Company)
    - Employee: Bob (CTO), Salary: $180000.0
    + Team: Development Team A (Engineering)
      - Employee: Charlie (Dev Lead), Salary: $120000.0
      - Employee: Eve (Developer), Salary: $90000.0
      - Employee: Frank (Developer), Salary: $92000.0
    + Team: Development Team B (Engineering)
      - Employee: Diana (Dev Lead), Salary: $125000.0
    + Team: QA Team (Engineering)
      - Employee: Grace (QA Lead), Salary: $110000.0
      - Employee: Heidi (QA Engineer), Salary: $85000.0

--- Salary Report ---
Total salary for Acme Corp: $1002000.0
Total salary for Development Team A: $302000.0
```

**Reflection on what made the example tricky:**
The main challenge here is understanding the recursive nature of operations like `displayDetails` and `getSalary` within the `Composite` class. Each composite delegates the operation to its children, which might be other composites or leaves, creating a chain of calls that traverses the entire structure. The "transparency" aspect (where `Leaf` implements `addUnit` but throws an exception) is a common design choice in Composite that can feel a bit counter-intuitive initially.

---

### Example 3: Decorator Pattern — Custom Coffee Orders

**Problem:**
You are developing a coffee shop ordering system. A customer can order a `BasicCoffee` and add various condiments like `Milk`, `Sugar`, and `Whip`. Each condiment adds to the cost and description. You need a flexible way to combine these options without creating a huge number of subclasses (e.g., `CoffeeWithMilk`, `CoffeeWithMilkAndSugar`, `CoffeeWithMilkAndSugarAndWhip`).

**Identify what's given and what we want:**
*   **Given:**
    *   A `Beverage` interface with `getDescription()` and `cost()` methods.
    *   A `BasicCoffee` class implementing `Beverage`.
    *   Condiments (`Milk`, `Sugar`, `Whip`) that can be added.
*   **Wanted:**
    *   A system where condiments can be added dynamically to any `Beverage`.
    *   The total cost and description should reflect all added condiments.

**Show every algebraic / logical step:**

1.  **Define the Component Interface:** This is the base interface for all beverages and decorators.
    ```
    interface Beverage {
        String getDescription();
        double cost();
    }
    ```
    *Explanation:* This contract ensures all components (basic beverages and decorators) have methods to describe themselves and state their cost.

2.  **Define the Concrete Component (`BasicCoffee`):** This is the core object we will decorate.
    ```
    class BasicCoffee implements Beverage {
        @Override
        public String getDescription() {
            return "Basic Coffee";
        }

        @Override
        public double cost() {
            return 5.00;
        }
    }
    ```
    *Explanation:* This is our starting point, a simple coffee with a base description and cost.

3.  **Define the Abstract Decorator Class:** This class will implement the `Beverage` interface and hold a reference to another `Beverage` object.
    ```
    abstract class CondimentDecorator implements Beverage {
        protected Beverage beverage; // The beverage being wrapped

        public CondimentDecorator(Beverage beverage) {
            this.beverage = beverage;
        }

        // Delegate these methods by default, concrete decorators will override
        @Override
        public String getDescription() {
            return beverage.getDescription();
        }

        @Override
        public double cost() {
            return beverage.cost();
        }
    }
    ```
    *Explanation:*
    *   `CondimentDecorator` itself is a `Beverage`, so it can be used wherever a `Beverage` is expected.
    *   It *has-a* `Beverage` (composition), meaning it wraps another beverage.
    *   Its default `getDescription()` and `cost()` methods simply delegate to the wrapped beverage. Subclasses will override these to add their specific modifications.

4.  **Define Concrete Decorator Classes (`Milk`, `Sugar`, `Whip`):** Each condiment is a concrete decorator.
    ```
    class Milk extends CondimentDecorator {
        public Milk(Beverage beverage) {
            super(beverage);
        }

        @Override
        public String getDescription() {
            return beverage.getDescription() + ", Milk";
        }

        @Override
        public double cost() {
            return beverage.cost() + 0.50;
        }
    }

    class Sugar extends CondimentDecorator {
        public Sugar(Beverage beverage) {
            super(beverage);
        }

        @Override
        public String getDescription() {
            return beverage.getDescription() + ", Sugar";
        }

        @Override
        public double cost() {
            return beverage.cost() + 0.20;
        }
    }

    class Whip extends CondimentDecorator {
        public Whip(Beverage beverage) {
            super(beverage);
        }

        @Override
        public String getDescription() {
            return beverage.getDescription() + ", Whip";
        }

        @Override
        public double cost() {
            return beverage.cost() + 0.70;
        }
    }
    ```
    *Explanation:* Each decorator's `getDescription()` adds its own description to the wrapped beverage's description, and its `cost()` adds its own cost to the wrapped beverage's cost. This creates a chain of responsibility.

5.  **Client Usage (Ordering Coffee):**
    ```
    public class CoffeeShopDemo {
        public static void main(String[] args) {
            // Order 1: Basic Coffee
            Beverage coffee1 = new BasicCoffee();
            System.out.println("Order 1: " + coffee1.getDescription() + " - $" + String.format("%.2f", coffee1.cost()));
            // Expected: Basic Coffee - $5.00

            // Order 2: Coffee with Milk
            Beverage coffee2 = new BasicCoffee();
            coffee2 = new Milk(coffee2); // Wrap basic coffee with milk
            System.out.println("Order 2: " + coffee2.getDescription() + " - $" + String.format("%.2f", coffee2.cost()));
            // Expected: Basic Coffee, Milk - $5.50

            // Order 3: Coffee with Milk and Whip
            Beverage coffee3 = new BasicCoffee();
            coffee3 = new Milk(coffee3); // Wrap with Milk
            coffee3 = new Whip(coffee3); // Wrap with Whip (wraps the Milk-wrapped coffee)
            System.out.println("Order 3: " + coffee3.getDescription() + " - $" + String.format("%.2f", coffee3.cost()));
            // Expected: Basic Coffee, Milk, Whip - $6.20

            // Order 4: Coffee with Sugar, Milk, and Whip (order matters for description, not cost)
            Beverage coffee4 = new BasicCoffee();
            coffee4 = new Sugar(coffee4);
            coffee4 = new Milk(coffee4);
            coffee4 = new Whip(coffee4);
            System.out.println("Order 4: " + coffee4.getDescription() + " - $" + String.format("%.2f", coffee4.cost()));
            // Expected: Basic Coffee, Sugar, Milk, Whip - $6.40
        }
    }
    ```
    *Explanation:* The client code dynamically wraps a `BasicCoffee` object with different `CondimentDecorator` instances. Each `new Decorator(beverage)` call creates a new object that wraps the previous one, forming a chain. When `cost()` or `getDescription()` is called on the outermost decorator, it delegates to the inner one, which in turn delegates further, until the `BasicCoffee` is reached. The results are then accumulated back up the chain.

**Final Answer:**
The Decorator pattern allows dynamic addition of features (condiments) to a base object (`BasicCoffee`) without modifying its class.
The output would be:
```text
Order 1: Basic Coffee - $5.00
Order 2: Basic Coffee, Milk - $5.50
Order 3: Basic Coffee, Milk, Whip - $6.20
Order 4: Basic Coffee, Sugar, Milk, Whip - $6.40
```

**Reflection on what made the example tricky:**
The main "trick" with Decorator is understanding the chain of responsibility and how each decorator wraps the previous one. It's not about modifying the original object, but creating a new object that *contains* the original and adds functionality before or after delegating to it. The `super(beverage)` call in the decorator constructor and the `beverage.getDescription()`/`beverage.cost()` calls are crucial for this chaining.

---

### Example 4: Proxy Pattern — Virtual Image Loader

**Problem:**
You are building an image gallery application that displays many high-resolution images. Loading all images at once is slow and consumes excessive memory. You want to implement lazy loading: images should only be loaded from disk when they are actually requested for display.

**Identify what's given and what we want:**
*   **Given:**
    *   An `Image` interface with a `display()` method.
    *   A `RealImage` class that implements `Image` and performs a heavy disk I/O operation in its constructor to load the image data.
*   **Wanted:**
    *   A `ProxyImage` class that also implements `Image`.
    *   `ProxyImage` should defer the creation and loading of `RealImage` until its `display()` method is called for the first time.

**Show every algebraic / logical step:**

1.  **Define the Subject Interface:** This is the common interface for both the real object and the proxy.
    ```
    interface Image {
        void display();
    }
    ```
    *Explanation:* This defines the contract for any image object, specifying that it must have a `display()` method.

2.  **Define the Real Subject Class (`RealImage`):** This is the actual object that performs the heavy operation.
    ```
    class RealImage implements Image {
        private String filename;

        public RealImage(String filename) {
            this.filename = filename;
            loadImageFromDisk(); // This is the heavy operation
        }

        private void loadImageFromDisk() {
            System.out.println("Loading image: " + filename + " from disk...");
            try {
                Thread.sleep(2000); // Simulate heavy loading time
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("Image " + filename + " loaded.");
        }

        @Override
        public void display() {
            System.out.println("Displaying image: " + filename);
        }
    }
    ```
    *Explanation:* The `RealImage` constructor simulates a time-consuming operation (loading from disk). Its `display()` method simply confirms the display.

3.  **Define the Proxy Class (`ProxyImage`):** This class will act as a stand-in for `RealImage`.
    ```
    class ProxyImage implements Image {
        private String filename;
        private RealImage realImage; // Reference to the real image, initialized lazily

        public ProxyImage(String filename) {
            this.filename = filename;
            this.realImage = null; // Initially, no real image is loaded
            System.out.println("Proxy created for image: " + filename + " (not loaded yet)");
        }

        @Override
        public void display() {
            // Step 3a: Check if the real image has been loaded yet.
            if (realImage == null) {
                // Step 3b: If not, create and load the real image.
                System.out.println("Proxy: Real image " + filename + " requested for display. Loading now...");
                realImage = new RealImage(filename);
            }
            // Step 3c: Delegate the display call to the real image.
            realImage.display();
        }
    }
    ```
    *Explanation:*
    *   `ProxyImage` also implements `Image`, so it can be used interchangeably with `RealImage`.
    *   It stores the `filename` but doesn't load the `RealImage` in its constructor.
    *   When `display()` is called:
        *   It first checks if `realImage` is `null`. If it is, it means the image hasn't been loaded yet.
        *   It then creates a new `RealImage` instance, which triggers the heavy loading operation.
        *   Finally, it delegates the `display()` call to the now-loaded `realImage`.

4.  **Client Usage (Gallery Application):**
    ```
    public class ImageGalleryDemo {
        public static void main(String[] args) {
            System.out.println("--- Creating image proxies ---");
            // Create a list of image proxies. No images are loaded yet.
            Image image1 = new ProxyImage("photo_a.jpg");
            Image image2 = new ProxyImage("photo_b.jpg");
            Image image3 = new ProxyImage("photo_c.jpg");

            System.out.println("\n--- First display request (image1) ---");
            // Only image1 will be loaded now
            image1.display();

            System.out.println("\n--- Second display request (image1 again) ---");
            // image1 is already loaded, no re-loading
            image1.display();

            System.out.println("\n--- Third display request (image2) ---");
            // Only image2 will be loaded now
            image2.display();

            System.out.println("\n--- No display for image3 ---");
            // image3 is never displayed, so it's never loaded
        }
    }
    ```
    *Explanation:*
    *   When `ProxyImage` objects are created, only their filenames are stored; the "Loading image..." message from `RealImage` does not appear.
    *   When `image1.display()` is called for the first time, `RealImage("photo_a.jpg")` is instantiated and loaded.
    *   When `image1.display()` is called again, `realImage` is no longer `null`, so the heavy loading is skipped.
    *   `image2.display()` triggers the loading of `RealImage("photo_b.jpg")`.
    *   `image3` is never displayed, so its `RealImage` instance is never created, saving memory and processing time.

**Final Answer:**
The `ProxyImage` successfully implements lazy loading for `RealImage` objects. The heavy image loading operation is deferred until the `display()` method is invoked, improving application startup time and resource usage.
The output would be:
```text
--- Creating image proxies ---
Proxy created for image: photo_a.jpg (not loaded yet)
Proxy created for image: photo_b.jpg (not loaded yet)
Proxy created for image: photo_c.jpg (not loaded yet)

--- First display request (image1) ---
Proxy: Real image photo_a.jpg requested for display. Loading now...
Loading image: photo_a.jpg from disk...
Image photo_a.jpg loaded.
Displaying image: photo_a.jpg

--- Second display request (image1 again) ---
Displaying image: photo_a.jpg

--- Third display request (image2) ---
Proxy: Real image photo_b.jpg requested for display. Loading now...
Loading image: photo_b.jpg from disk...
Image photo_b.jpg loaded.
Displaying image: photo_b.jpg

--- No display for image3 ---
```

**Reflection on what made the example tricky:**
The core idea of the Proxy pattern is simple: one object stands in for another. The "trick" often lies in understanding *when* the proxy should delegate to the real subject and *what additional responsibilities* the proxy should handle (e.g., lazy loading, access control, logging, caching). In this example, the conditional instantiation of `realImage` inside the `display()` method is the key to lazy loading.

## 6. Common mistakes and traps

1.  **Over-engineering with Patterns:** Applying a pattern when a simpler solution would suffice. For instance, using a Decorator for a single, fixed extension instead of a simple subclass, or a Facade for a subsystem with only one or two classes. Patterns add complexity; they should solve a problem, not create one.
2.  **Confusing Similar Patterns:**
    *   **Adapter vs. Decorator:** Both wrap objects. Adapter *changes* the interface of the wrapped object to match a client's expectation. Decorator *adds responsibilities* to the wrapped object while keeping the same interface.
    *   **Facade vs. Adapter:** Facade provides a *simplified* interface to an entire subsystem. Adapter converts *one* interface to another.
    *   **Proxy vs. Decorator:** Both wrap an object and have the same interface. Proxy controls *access* to the real subject (e.g., lazy loading, security). Decorator *adds new behavior* or state.
3.  **Violating SOLID Principles:** Incorrectly applying a pattern can lead to violations. For example, a Facade that becomes a "god object" violates the Single Responsibility Principle (SRP). A Composite where leaf nodes don't correctly handle composite-specific operations (e.g., `add` method) can violate the Liskov Substitution Principle (LSP) if not handled carefully (though GoF often suggests throwing `UnsupportedOperationException` for leaves, which is a common LSP trade-off).
4.  **Ignoring Performance Implications:** Patterns like Decorator and Proxy introduce layers of indirection, which can have a minor performance overhead. While usually negligible, in high-performance or real-time systems, this needs consideration. Flyweight, conversely, is specifically for performance optimization.
5.  **Mismanaging State in Flyweight:** Incorrectly separating intrinsic (shared) and extrinsic (unique) state in the Flyweight pattern can lead to bugs where objects unexpectedly share or modify state they shouldn't, or where memory isn't actually saved.
6.  **Tight Coupling within Structural Patterns:** While structural patterns aim to reduce coupling in certain ways, it's possible to introduce new forms of tight coupling. For example, if a Decorator's added behavior relies too heavily on the concrete type of the wrapped component, it limits flexibility.

## 7. Textbook-precise explanation

Structural design patterns are concerned with how classes and objects are composed to form larger structures. They focus on simplifying the relationships between entities, making systems more flexible, efficient, and robust. These patterns primarily deal with the composition of objects, rather