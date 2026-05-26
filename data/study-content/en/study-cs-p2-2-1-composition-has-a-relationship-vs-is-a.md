## 1. The one-sentence answer
**Composition expresses a has-a relationship by embedding one object inside another, while inheritance expresses an is-a relationship by deriving a new class from an existing one.**

A class models a concept. When one concept contains another as a part, the natural modeling choice is to store a reference (or value) to the contained object inside the container class. When one concept is a specialized form of another, the natural modeling choice is to derive the specialized class from the general one. These two mechanisms are not interchangeable; each carries different guarantees about substitutability, lifetime, and coupling.

The distinction appears immediately in code structure. Inheritance reuses behavior by extending a base class and overriding or adding methods. Composition reuses behavior by delegating calls to an object held as a field. The resulting designs differ sharply in how easily they accommodate change.

> [!NOTE]
> The decisive insight is that inheritance creates a compile-time, rigid taxonomy while composition creates a run-time, flexible assembly; most production systems therefore favor composition for the majority of their collaborations.

## 2. Why this matters — concrete and current
SpaceX’s flight software models each physical subsystem (engine, avionics, thermal) as an independent component that is assembled into a vehicle at runtime rather than inherited from a monolithic “Spacecraft” base class; this permits the same engine controller to be reused across Falcon, Starship, and Dragon variants without creating brittle inheritance hierarchies.

In the PyTorch deep-learning framework, every neural-network layer is a `Module` that holds other `Module` instances as attributes; the resulting computation graph is built by composition, allowing arbitrary topologies to be constructed and differentiated without forcing every model to inherit from a fixed “Layer” superclass.

Modern Android development replaced the inheritance-heavy `Activity` inheritance model with Jetpack Compose, in which UI elements are ordinary Kotlin objects that contain other UI objects; this shift eliminated the single-inheritance bottleneck that previously forced developers to choose between visual behavior and lifecycle behavior.

Semiconductor design tools at TSMC and Intel represent each IP block (CPU core, memory controller, interconnect) as a composable module with well-defined ports; inheritance would be impractical because the same core IP must be instantiated in hundreds of different SoC configurations whose relationships cannot be captured by a static is-a tree.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class and object     | Both composition and inheritance operate on classes that encapsulate state and behavior |
| Reference semantics  | Composition stores a reference to another object; understanding aliasing and ownership is required |
| Method dispatch      | Inheritance relies on polymorphic dispatch; composition relies on ordinary delegation |
| Access modifiers     | Knowing what “private” versus “protected” exposes determines whether a relationship is truly encapsulated |

## 4. Building the idea — from intuition to formalism

### Step 1 — Real-world containment versus specialization
Everyday objects either contain other objects or are special cases of broader categories. A car contains an engine; it is not “an engine with wheels added.” A dog is an animal; it does not merely contain an animal.

### Step 2 — Mapping containment to code
Store the contained object as a field. The container class forwards or delegates selected operations to the contained object when necessary.

### Step 3 — Mapping specialization to code
Declare the specialized class as extending the general class. The derived class automatically receives the base class’s interface and may override selected behaviors.

### Step 4 — Substitutability
Inheritance guarantees that an instance of the derived class can be used wherever the base class is expected (the Liskov substitution principle). Composition provides no such guarantee; the containing object is a distinct type.

### Step 5 — Lifetime coupling
With inheritance the derived object’s lifetime is identical to the base object’s lifetime. With composition the contained object may be created, replaced, or destroyed independently of the container.

### Step 6 — Change propagation
Adding a method to a base class instantly affects all derived classes. Adding a method to a composed object affects only the container if the container explicitly delegates to it.

### Step 7 — The design rule
Because inheritance creates a permanent, compile-time is-a link while composition creates a replaceable has-a link, the default engineering choice is composition; inheritance is reserved for cases where true substitutability is required and the taxonomy is stable.

## 5. Worked examples — every step shown

**Example 1 — Simple domain model**
- *Given:* A `Dog` that should make sound and a `Tail` that can wag.
- *Find:* Whether to inherit or compose.
Create a `Tail` class with a `wag()` method.  
*Why:* The tail is a separable part.  
Declare `class Dog { private Tail tail; }`.  
*Why:* The dog now holds a reference to its tail.  
Call `tail.wag()` from a `Dog` method when needed.  
*Why:* Behavior is reused by delegation rather than inheritance.  
**Dog has-a Tail**

**Example 2 — GUI button**
- *Given:* A clickable rectangle that must also display text.
- *Find:* The relationship between `Button` and `Label`.
Create a `Label` class.  
*Why:* Text display is a distinct responsibility.  
Store `private Label label;` inside `Button`.  
*Why:* The button owns its label.  
Forward `setText()` calls to the label field.  
*Why:* The button reuses label behavior without becoming a label.  
**Button has-a Label**

**Example 3 — Refactoring an inheritance hierarchy**
- *Given:* `Rectangle` and `Square` where `Square extends Rectangle`.
- *Find:* The hidden cost when `setWidth` and `setHeight` are overridden.
The override violates substitutability because a square cannot independently change width and height.  
*Why:* The is-a claim is false under mutation.  
Replace inheritance with composition: `Square` holds a `Rectangle` and exposes only equal-side operations.  
*Why:* The relationship becomes has-a; the square now controls its rectangle.  
**Square has-a Rectangle**

**Example 4 — Strategy pattern via composition**
- *Given:* A `PaymentProcessor` that must support credit-card and crypto payments.
- *Find:* How to add a new payment method without modifying existing classes.
Define a `PaymentStrategy` interface.  
*Why:* Each algorithm is encapsulated.  
Store `private PaymentStrategy strategy;` inside `PaymentProcessor`.  
*Why:* The processor owns a replaceable strategy.  
At runtime inject `CreditCardStrategy` or `CryptoStrategy`.  
*Why:* Behavior is selected by composition, not by inheritance from `PaymentProcessor`.  
**PaymentProcessor has-a PaymentStrategy**

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating every specialization as inheritance | Intuitive taxonomy feels natural            | Ask whether the subtype must be substitutable at runtime |
| Deep inheritance hierarchies      | Each new requirement seems to need one more level | Limit depth to two or three; prefer composition beyond that |
| “Is-a” declared on mutable state  | Overlooking behavioral contracts            | Verify the Liskov substitution principle on all public methods |
| Composition without delegation    | Simply storing an object but never using it | Ensure every contained object is actually sent messages |
| Inheritance for code reuse alone  | Convenience of gaining methods for free     | Use composition plus forwarding instead      |
| Forgetting ownership semantics    | Assuming contained objects live as long as the container | Decide and document ownership or use smart pointers / ownership types |
| Confusing aggregation with composition | Both are has-a relationships                | Distinguish whole-part lifetime coupling explicitly |

## 7. The textbook-precise statement
Composition is the technique of implementing a class by storing references to instances of other classes that supply needed functionality; inheritance is the technique of defining a new class by extending an existing class so that the new class acquires the existing class’s interface and implementation. The Gang of Four states the design preference explicitly: “Favor object composition over class inheritance” (Gamma et al., *Design Patterns*, 1994, p. 20). The hypothesis required for safe inheritance is the Liskov substitution principle: for every object `o1` of type `S` there must exist an object `o2` of type `T` such that every program `P` defined in terms of `T` behaves identically when `o1` is substituted for `o2` (Liskov, *Data Abstraction and Hierarchy*, 1987).

## 8. Visual — diagram or schematic
```text
Inheritance (is-a)               Composition (has-a)
┌─────────────┐                  ┌─────────────┐
│   Animal    │                  │    Car      │
└──────┬──────┘                  │─────────────│
       │ extends                 │ -engine:Engine
       ▼                         └──────┬──────┘
┌─────────────┐                         │ holds
│    Dog      │                         ▼
└─────────────┘                  ┌─────────────┐
                                 │   Engine    │
                                 └─────────────┘
```
The left diagram shows a solid arrow from subclass to superclass. The right diagram shows a diamond or simple line with a field name indicating containment.

## 9. The memory technique
1. **The hook** — Picture a medieval knight: he *is* a human (inheritance) but *has* armor and a sword (composition). The armor can be swapped; the humanity cannot.
2. **What to overlearn** — “Favor composition over inheritance” and the two questions “Can it be replaced at runtime?” and “Does it satisfy substitutability?”
3. **Spaced-repetition schedule** — Review the knight image and the two questions after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive by asking whether the candidate relationship survives replacement of the part or reclassification of the whole; if replacement is possible, choose composition.

## 10. What this unlocks
Mastery of composition versus inheritance is the gateway to the Gang of Four patterns that rely on runtime delegation.

- Strategy pattern
- Decorator pattern
- State pattern
- Bridge pattern
- Dependency injection frameworks
- Interface segregation and the composition root in clean architecture

## 11. Self-check — five questions, no answers
1. A `Student` class contains a list of `Course` objects. Is the relationship inheritance or composition? Justify by checking substitutability.
2. Why does `Square extends Rectangle` usually violate the Liskov substitution principle when `setWidth` and `setHeight` exist?
3. Rewrite the following inheritance fragment using composition only: `class Logger extends FileWriter`.
4. In a game engine, should a `Player` inherit from `Movable` or hold a `MovementComponent`? Give the runtime replacement argument.
5. Identify the hidden coupling introduced when a new protected method is added to a base class that already has five derived classes.