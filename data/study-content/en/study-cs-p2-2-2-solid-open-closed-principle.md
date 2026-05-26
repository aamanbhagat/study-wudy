## 1. The one-sentence answer
**The Open/Closed Principle states that software entities (classes, modules, functions) should be open for extension but closed for modification.**

A class satisfies the principle when its existing source code never needs to change to accommodate new behavior. Instead, new behavior is added by writing fresh code that interacts with the original class through an abstraction such as an interface or abstract base class. The original implementation therefore remains untouched while the system grows.

Consider a payment processor that currently handles credit cards. Adding support for cryptocurrency should not require editing the processor’s internal conditional statements. The processor instead depends on a PaymentMethod abstraction; each new payment type implements that abstraction in its own class. The processor stays closed; the set of payment methods stays open.

> [!NOTE]
> The decisive insight is that the direction of dependency is reversed: concrete variations depend on an abstraction owned by the stable core, not the other way around.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover uses a layered command-dispatch architecture in which new instrument drivers are introduced solely by implementing a fixed Instrument interface; the core dispatcher binary has never been recompiled after launch.

Google’s TensorFlow 2.x Keras API lets users register custom training loops and layers by subclassing tf.keras.layers.Layer or tf.keras.Model without altering the framework’s internal graph-execution engine.

Modern semiconductor design tools such as Synopsys IC Compiler II accept user-defined optimization passes through a stable Tcl or Python extension API; the core placement-and-routing algorithms remain unmodified while foundries add process-specific rules.

Cloud providers expose autoscaling policies through interfaces such as AWS AutoScalingGroup’s ScalingPolicy contract; customers implement new metrics-driven policies without touching the underlying EC2 control plane.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Abstraction via interface or abstract class | OCP is realized by depending on an abstraction that new code can implement |
| Polymorphism             | Allows the same client code to invoke different concrete behaviors without modification |
| Dependency inversion     | The client must own or reference the abstraction, not the concrete implementations |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the axis of change
New requirements usually appear along a single dimension (new payment types, new report formats). The first task is to name that dimension explicitly.

Example: an OrderProcessor class contains a switch on payment type. The changing axis is “payment type.”

Formal statement: Let \( C \) be a client and \( V_1, V_2, \dots \) a family of concrete variations. The goal is that the source text of \( C \) remains invariant under addition of any \( V_{n+1} \).

> [!WARNING]
> Naming the wrong axis (for example, “the processor itself”) leads to over-engineering abstractions that never vary.

### Step 2 — Extract the stable abstraction
Create an interface or abstract class that captures only the operations the client needs from the varying part.

Example: define `interface PaymentMethod { void pay(Order o); }`.

Formal statement: There exists an abstraction \( A \) such that \( C \) depends solely on \( A \).

> [!WARNING]
> Including implementation details inside \( A \) re-opens \( C \) whenever those details change.

### Step 3 — Make existing variations implement the abstraction
Move each concrete behavior into a separate class that realizes \( A \).

Example: `CreditCardPayment implements PaymentMethod`, `PayPalPayment implements PaymentMethod`.

Formal statement: Each \( V_i \) satisfies the contract of \( A \).

> [!WARNING]
> Leaving even one variation inside the client reintroduces a modification point.

### Step 4 — Route all calls through the abstraction
Replace direct instantiation and type checks inside \( C \) with calls against references of type \( A \).

Example: `OrderProcessor` now holds a `PaymentMethod` field and simply invokes `method.pay(order)`.

Formal statement: \( C \) contains no occurrence of any concrete \( V_i \).

> [!WARNING]
> Retaining a single `instanceof` or `switch` defeats closure.

### Step 5 — Supply new variations externally
New behavior is introduced by writing a fresh implementation of \( A \) and injecting it into \( C \) at construction or composition time.

Example: `CryptoPayment implements PaymentMethod` is written, compiled, and passed to `OrderProcessor` without touching `OrderProcessor.java`.

Formal statement: The set of admissible behaviors of \( C \) is exactly the set of subtypes of \( A \).

> [!WARNING]
> If construction of the new subtype still requires editing a factory inside the original package, the system is not yet closed.

## 5. Worked examples — every step shown

**Example 1 — Single conditional**
*Given:* `class Logger { void log(String msg) { if (level==DEBUG) … else if … } }`
*Find:* Apply OCP so new log destinations can be added without editing Logger.
- Replace the conditional body with a call to `LogDestination.write(msg)`. *Why:* removes the type switch from the closed class.
- Define `interface LogDestination { void write(String); }`. *Why:* establishes the required abstraction.
- Implement `FileDestination` and `ConsoleDestination`. *Why:* each variation is now open for addition.
**Logger now depends only on LogDestination.**

**Example 2 — Shape drawing**
*Given:* `draw(Shape s)` contains `if (s instanceof Circle) … else if (s instanceof Square)`.
*Find:* Add Triangle without modifying draw.
- Introduce `interface Shape { void draw(); }`. *Why:* moves behavior to the object itself.
- Each concrete shape implements its own draw. *Why:* client code becomes uniform.
- `draw(Shape s) { s.draw(); }`. *Why:* closed against new shapes.
**Final answer: draw is now closed; any new shape implements Shape.**

**Example 3 — Discount policy**
*Given:* PricingService hard-codes seasonal discounts.
*Find:* Introduce a new “loyalty” discount without recompiling PricingService.
- Define `interface DiscountPolicy { BigDecimal apply(Item i); }`. *Why:* abstracts the varying rule.
- PricingService receives a `DiscountPolicy` at construction. *Why:* policy is supplied externally.
- New `LoyaltyDiscount implements DiscountPolicy` is written. *Why:* no change to PricingService.
**Final answer: PricingService is closed; discount rules remain open.**

**Example 4 — Plugin architecture**
*Given:* An IDE core that must support arbitrary language servers.
*Find:* Add a Rust language server without rebuilding the IDE binary.
- Core defines `interface LanguageServer { void didOpen(Document); … }`. *Why:* fixed contract.
- Each server is a separate JAR implementing the interface and discovered via ServiceLoader. *Why:* discovery is external to the core.
- IDE loads implementations at startup; no source modification occurs. *Why:* satisfies both openness and closure.
**Final answer: IDE core binary remains unchanged for any number of new languages.**

*Reflection:* The pattern in every case is identical: move the varying decision from control flow inside the client to subtype selection outside the client.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Over-generalizing every class     | Fear of future change                       | Identify the actual axis of change before abstracting |
| Leaking implementation in the interface | Designer thinks in concrete terms first   | Keep the interface minimal and client-centric        |
| Retaining type checks “just once” | Legacy code migration feels expensive       | Delete the last conditional; use composition instead |
| Abstracting the wrong module      | Misidentifying what is stable versus variable | Ask which component will be modified most often      |
| Factory still lives inside closed code | Convenience of central creation            | Move factories to configuration or separate package  |
| Inheritance used where composition suffices | Habit of extending concrete classes      | Prefer delegation to an injected strategy            |
| Ignoring performance cost of indirection | Micro-benchmark mindset                   | Measure only after the design is closed              |

## 7. The textbook-precise statement
A module is open if it is possible to extend its behavior without modifying its source code. A module is closed if it is possible to use it without risk that later extensions will invalidate existing clients. Formally, let \( M \) be a module, \( I \) an interface owned by \( M \), and \( C \) any client of \( M \). Then for every new subtype \( S \) of \( I \), the text of both \( M \) and \( C \) remains unchanged (Robert C. Martin, *Agile Software Development: Principles, Patterns, and Practices*, 2002, Chapter 8).

## 8. Visual — diagram or schematic
```text
Client  ──depends on──►  Abstraction (I)
                           ▲
                           │ implements
          ┌────────────────┼────────────────┐
          │                │                │
     ConcreteA        ConcreteB        ConcreteC  (new, added later)
```
The arrow from Client points only to the interface; each concrete class points upward to the same interface. No arrow exists from Client to any ConcreteX.

## 9. The memory technique
1. **The hook** — Picture a locked vault (the closed core) whose only door accepts new keys (extensions) cut later; the vault itself is never cut open.
2. **What to overlearn** — “Open for extension, closed for modification” plus the dependency rule: client owns the interface.
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking: “Which source file would I otherwise have to edit?” Then move that decision to a subtype.

## 10. What this unlocks
Mastery of OCP makes the remaining SOLID principles and most design patterns immediately usable, because they all rely on stable abstractions and externalized variation.

- Strategy, Template Method, and Decorator patterns become natural expressions of closure.
- Dependency Inversion Principle is the enabling mechanism for OCP.
- Liskov Substitution Principle guarantees that added subtypes remain safe replacements.
- Interface Segregation Principle keeps the abstractions used for extension small and focused.

## 11. Self-check — five questions, no answers
1. A class contains a single `if` statement that chooses between two report formats. Which one-line change would violate OCP?
2. You have extracted an interface but still instantiate the concrete class inside the same package. Does this satisfy closure? Why or why not?
3. Name two distinct axes of change that could appear in a logging framework and the corresponding abstractions that would close the framework against each.
4. Suppose a new requirement arrives that changes the signature of the abstraction itself. Does OCP protect the client? Explain.
5. In a system already obeying OCP, a performance-critical hot path still contains a virtual call. What reasoning would justify leaving the indirection in place versus removing it?