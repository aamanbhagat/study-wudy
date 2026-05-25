## What it is
Structural design patterns are blueprints that explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient. They focus on the relationships between entities, managing how they are composed and interact. Unlike creational patterns that create objects, structural patterns describe how to compose them.

## Why it matters
These patterns are fundamental to building robust, scalable systems. In aerospace, a **Facade** can provide a simple interface to a complex flight control system, abstracting away thousands of low-level operations. In machine learning, a **Decorator** can add logging or performance monitoring to a model's training pipeline without altering the core algorithm, and a **Proxy** can be used for lazy loading of massive datasets from disk or a remote source.

## When to study it
Before tackling these patterns, you must have a firm grasp of core Object-Oriented Programming (OOP) principles. Specifically, ensure you understand:
*   **Inheritance vs. Composition:** Know when to use `is-a` versus `has-a` relationships. Many structural patterns favor composition.
*   **Interfaces and Abstract Classes:** Understand how to define contracts and create base classes for polymorphism.
*   **Polymorphism:** The ability of an object to take on many forms, which is central to how patterns like Decorator and Composite achieve flexibility.

If these terms are not second nature, pause and review them. Attempting to learn patterns without this foundation is like trying to write a proof without knowing the axioms.

## How to study it (step by step)
1.  **Categorize by Intent:** Don't memorize them alphabetically. Group them by the problem they solve. Start with the "Wrapper" patterns: Adapter, Decorator, and Proxy. They all wrap an object to change its interface or behavior.
2.  **Implement an Adapter:** Find two classes in a library (or write your own) with incompatible interfaces that should work together. Write an Adapter class that translates calls from one to the other. For example, adapt a `LegacyRectangle` class (with `draw(x1, y1, x2, y2)`) to a `ModernShape` interface (with `render(topLeftPoint, width, height)`).
3.  **Implement a Decorator:** Take a simple class, like `FileStream`. Implement decorators like `GZipCompressedStream` and `AESEncryptedStream` that add functionality by wrapping the original stream object at runtime. Notice how you can stack them.
4.  **Diagram Composite:** Draw the class diagram for a file system. You'll have an abstract `FileSystemNode` with methods like `getName()` and `getSize()`. Both `File` (a leaf node) and `Directory` (a composite node containing other nodes) will implement this interface. This visual structure is the key.
5.  **Contrast Bridge and Adapter:** Read their definitions side-by-side. Note that Adapter is used retrospectively to make incompatible things work together. Bridge is used proactively, during design, to decouple an abstraction from its implementation so they can vary independently.
6.  **Analyze a Facade:** Look at the source code for a simple library you use. Identify the main class that you interact with. Observe how it likely delegates calls to a dozen other internal classes, hiding that complexity from you. That main class is a Facade.

## Key ideas, with intuition
1.  **Wrapping (Adapter, Decorator, Proxy):** Many structural patterns involve placing an object inside a "wrapper" object. The wrapper shares the same interface as the original, so the client doesn't know it's there.
    *   **Adapter:** The wrapper *translates* the interface. Think of a travel power adapter; it doesn't change the electricity, it just changes the plug shape so your device can connect to the wall.
    *   **Decorator:** The wrapper *adds* behavior before or after delegating to the wrapped object. Think of putting on a coat. You are still "you", but now you have the added property of being warm. You can add more layers (decorators).
    *   **Proxy:** The wrapper *controls access* to the original object. Think of a company check; it's not money itself, but it's a proxy that gives you controlled access to the money in the bank account.

2.  **Compositional Recursion (Composite):** The Composite pattern allows you to build tree-like structures where both individual objects (leaves) and compositions of objects (branches) are treated uniformly. A client can call `operation()` on a single leaf or on an entire branch of the tree without changing its code.
    $$ \text{TotalSize}(\text{Directory}) = \sum_{i \in \text{children}} \text{TotalSize}(i) $$
    The `TotalSize` function works on both files (base case) and directories (recursive step) because they share a common interface.

3.  **Decoupling Interface from Implementation (Bridge):** The Bridge pattern is about preventing a "cartesian product" explosion of classes. If you have `N` types of abstractions (e.g., `Window`) and `M` platforms to implement them on (e.g., `WindowsOS`, `MacOS`, `Linux`), you don't want to create $N \times M$ classes. Instead, you create `N` abstraction classes and `M` implementation classes and "bridge" them together with composition.

4.  **Simplifying a Subsystem (Facade):** A Facade provides a single, high-level entry point to a complex system of objects. It doesn't add new functionality, but it makes the existing functionality much easier to use by composing calls to the various subsystem parts. It reduces coupling between the client and the complex internals.

5.  **Sharing to Save Memory (Flyweight):** The Flyweight pattern is an optimization used when you need to create a huge number of similar objects. It separates an object's state into intrinsic (shared, context-independent) and extrinsic (unique, context-dependent). The shared intrinsic state is stored in a "flyweight" object, which is then reused in multiple contexts with different extrinsic states.

## Worked example
Let's implement a simplified **Decorator** pattern. Imagine a notification system. The base notification is sending an email. We want to add functionality like sending SMS or Slack messages without changing the email notification class.

**Step 1: Define the Component Interface**
This is the contract that all our objects (both the original and the decorated versions) will follow.

```java
// Notifier.java
public interface Notifier {
    void send(String message);
}
```

**Step 2: Create a Concrete Component**
This is the base object we want to decorate.

```java
// EmailNotifier.java
public class EmailNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("Sending Email with message: " + message);
    }
}
```

**Step 3: Create the Abstract Decorator**
This class also implements the component interface. It holds a reference to a `Notifier` object (the object it wraps). Its purpose is to delegate calls to the wrapped object.

```java
// BaseNotifierDecorator.java
public abstract class BaseNotifierDecorator implements Notifier {
    protected Notifier wrappedNotifier;

    public BaseNotifierDecorator(Notifier notifier) {
        this.wrappedNotifier = notifier;
    }

    @Override
    public void send(String message) {
        wrappedNotifier.send(message); // Delegation
    }
}
```

**Step 4: Create Concrete Decorators**
These classes extend the abstract decorator and add their own behavior before or after delegating the call.

```java
// SMSNotifierDecorator.java
public class SMSNotifierDecorator extends BaseNotifierDecorator {
    public SMSNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send(String message) {
        super.send(message); // First, do the wrapped behavior
        System.out.println("Sending SMS with message: " + message); // Then, add new behavior
    }
}

// SlackNotifierDecorator.java
public class SlackNotifierDecorator extends BaseNotifierDecorator {
    public SlackNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send(String message) {
        super.send(message);
        System.out.println("Sending Slack message: " + message);
    }
}
```

**Step 5: Client Code**
Now we can compose objects at runtime.

```java
// Main.java
public class Main {
    public static void main(String[] args) {
        // A simple email notifier
        Notifier notifier = new EmailNotifier();
        notifier.send("System is stable.");
        // Output: Sending Email with message: System is stable.

        System.out.println("---");

        // Now, let's decorate it with SMS and Slack capabilities at runtime
        Notifier decoratedNotifier = new SlackNotifierDecorator(
                                        new SMSNotifierDecorator(
                                            new EmailNotifier()
                                        )
                                     );
        decoratedNotifier.send("CRITICAL ALERT: System failure imminent!");
        // Output:
        // Sending Email with message: CRITICAL ALERT: System failure imminent!
        // Sending SMS with message: CRITICAL ALERT: System failure imminent!
        // Sending Slack message: CRITICAL ALERT: System failure imminent!
    }
}
```

**Reflection:** Each step builds upon the last. The interface (`Notifier`) establishes a common type. The concrete component (`EmailNotifier`) provides the core behavior. The abstract decorator (`BaseNotifierDecorator`) manages the "wrapping" relationship via composition. The concrete decorators (`SMSNotifierDecorator`, `SlackNotifierDecorator`) add new responsibilities. The client can mix and match these decorators at runtime, achieving great flexibility without a complex inheritance hierarchy.

## Diagrams
Here is an ASCII diagram representing the class structure of the Decorator example above.

```text
              +----------------+
              | <<interface>>  |
              |    Notifier    |
              |----------------|
              | + send(msg)    |
              +-------+--------+
                      ^
                      | (implements)
      +---------------+-------------------------+
      |                                         |
+-----+-------------+                 +---------+---------------+
|  EmailNotifier    |                 | BaseNotifierDecorator   |
|-------------------|                 |-------------------------|
| + send(msg)       |                 | # wrappedNotifier       |
+-------------------+                 |-------------------------|
                                      | + send(msg)             |
                                      +------------+------------+
                                                   ^
                                                   | (extends)
                           +-----------------------+-----------------------+
                           |                                               |
            +--------------+---------------+             +--------------+---------------+
            |    SMSNotifierDecorator    |             |   SlackNotifierDecorator   |
            |----------------------------|             |----------------------------|
            | + send(msg)                |             | + send(msg)                |
            +----------------------------+             +----------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're building a custom toolkit.
    *   You have a European screwdriver, but American screws. You use an **Adapter** bit.
    *   You have a basic wrench. You add a torque-measuring extension; that's a **Decorator**.
    *   The whole toolkit, a single drawer, or a single wrench can all be "weighed". That's **Composite**.
    *   You need a "Get Ready" button on your workbench that organizes your lighting, turns on the power tools, and unlocks the vise. That's a **Facade**.
    *   You have a single wrench handle (**Bridge** abstraction) that can connect to dozens of different socket heads (**Bridge** implementation).
    *   You have 10,000 identical screws. You don't model each one; you model one screw type (**Flyweight**) and just track the position of each.
    *   You have a rare, fragile tool locked away. You use a cheap 3D-printed replica (**Proxy**) for planning your work, only getting the real one when you must.

2.  **Must Overlearn:**
    *   **Core Idea:** Structural patterns organize relationships between objects via composition.
    *   **Adapter Intent:** "Convert the interface of a class into another interface clients expect."
    *   **Decorator Intent:** "Attach additional responsibilities to an object dynamically."

3.  **Spaced Repetition Schedule:** Review your implementations and these notes at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not skip this. Active recall is non-negotiable.

4.  **First Principles Pathway:** If you forget a pattern, derive it from the problem.
    *   **Problem:** "I need to add behavior to objects, but I can't use inheritance because I need to do it at runtime, and I need to combine behaviors freely."
    *   **Derivation:** This implies I can't change the original class. So, I must create a new class that *contains* the original object (composition). For the client to not know the difference, my new class must have the same interface as the original. To add behavior, my new class's methods will do their new work, then call the original object's methods. This re-invents the Decorator pattern.

## Common mistakes
1.  **Confusing Decorator with Inheritance:** A student might create `EmailAndSmsNotifier` and `EmailAndSmsAndSlackNotifier` classes through inheritance. This leads to a class explosion and is static. Decorator uses composition to add features dynamically at runtime.
2.  **Confusing Adapter, Bridge, and Proxy:** They look similar structurally (they all "wrap" or "point to" another object). Remember their *intent*. Adapter *changes* an interface. Proxy *provides the same* interface but controls access. Bridge *decouples* an interface from its implementation *before* they are even built.
3.  **Over-engineering with Facade:** Creating a Facade that becomes a "God Object," coupling all parts of the system to itself. A Facade should simplify, not become a monolithic controller for the entire subsystem.
4.  **Implementing Composite Incorrectly:** Forgetting to define the "leaf" and "composite" operations correctly. For example, a `File`'s `add(node)` method should throw an exception, while a `Directory`'s `add(node)` method should add the node to its children list.

## Self-check
1.  You have a `Metrics` library that expects to receive data via a `push(metricName, value)` method. Your physics simulation engine produces data by calling a `logData(timestamp, sensorID, reading)` method on a logger object. Which pattern would you use to make these two systems work together without modifying either of them? Why?
2.  You are designing a GUI framework. A `Window` can contain `Panel`s, and `Panel`s can contain other `Panel`s, `Button`s, and `TextBox`es. You want to be able to call a `draw()` method on any element—be it a single `Button` or an entire `Window`—and have it correctly render itself and all its children. Which pattern is the most suitable for this structure and why?
3.  You are building a satellite imagery viewer. A full high-resolution image is several gigabytes and slow to download. The user first sees a grid of low-resolution thumbnails. Only when the user clicks a thumbnail should the full-resolution image be fetched. Which pattern would you use to represent the image objects in the grid? Describe the components of your proposed solution.