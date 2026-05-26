## 1. The one-sentence answer
**Liskov Substitution Principle (LSP) states that if S is a subtype of T, then objects of type T may be replaced with objects of type S without changing any of the desirable properties of the program.**

LSP ensures that inheritance actually models an “is-a” relationship that preserves behaviour. When a child class satisfies every contract and invariant that its parent class promises, any code written against the parent continues to work correctly with the child. This removes hidden surprises that appear only at runtime when a derived class is passed where the base class was expected.

The principle is behavioural, not merely syntactic. Two classes may share the same method signatures yet violate LSP if the child strengthens preconditions, weakens postconditions, or breaks invariants that the parent guaranteed. Such violations turn polymorphism from a reliability tool into a source of subtle bugs.

> [!NOTE]
> The single “aha” moment is this: inheritance is not about code reuse; it is about safe substitutability. If substituting a subclass can break existing code, the inheritance relationship itself is incorrect.

## 2. Why this matters — concrete and current
In the Java Collections Framework, `ArrayList` and `LinkedList` both extend `AbstractList`. Any algorithm written against `List` continues to behave correctly when either implementation is supplied; violating this contract would break thousands of libraries that depend on the `List` interface.

Google’s Guice dependency-injection container relies on LSP when it substitutes mock implementations during unit tests. If a mock violated the contracts of the real service interface, test results would diverge from production behaviour, defeating the purpose of automated verification.

Microsoft’s .NET runtime uses LSP in the `Stream` hierarchy. Code that reads from `FileStream`, `MemoryStream`, or `NetworkStream` through the common `Stream` base class works unchanged across all three; a subclass that threw unexpected exceptions on `Read` would break the entire I/O abstraction layer.

In aerospace flight-software written in C++, the `Sensor` abstract base class defines timing and error-handling contracts. Subclasses for GPS, IMU, and magnetometer sensors must honour those contracts so that the attitude-control module can treat every sensor identically without case-by-case checks.

The Spring Framework’s `TransactionManager` hierarchy demonstrates LSP at scale: `JpaTransactionManager`, `DataSourceTransactionManager`, and `JtaTransactionManager` are interchangeable behind the same interface, allowing application code to remain unaware of the underlying persistence technology.

## 3. Mental prerequisites

| Concept              | Why you need it here |
|----------------------|----------------------|
| Class inheritance    | LSP is defined only in the presence of an “is-a” relationship expressed through inheritance or interface implementation. |
| Contracts (preconditions, postconditions, invariants) | Substitutability is judged by whether the subclass respects every contract the superclass established. |
| Polymorphism         | The principle exists to guarantee that polymorphic calls remain correct after substitution. |

If any of these three ideas are unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with everyday substitution
A child class must be usable wherever its parent class is expected.  
Example: if a function accepts a `Bird` and calls `fly()`, any subclass `Penguin` must also be able to `fly()` without throwing an exception or altering program state unexpectedly.  
Formal statement: For every object `o1` of type `S` there exists an object `o2` of type `T` such that for all programs `P` defined in terms of `T`, the behaviour of `P` is unchanged when `o1` is substituted for `o2`.  
> [!WARNING] If a subclass silently changes the observable outcome of a method that the parent promised would succeed, every caller of that method becomes a potential source of runtime failure.

### Step 2 — Preconditions cannot be strengthened
A subclass may weaken but never strengthen a precondition.  
Example: `Rectangle.setWidth(w)` accepts any positive integer; a `Square` subclass that suddenly requires `w == height` has strengthened the precondition and therefore violates LSP.  
Formal: If `pre_T(m)` is the precondition of method `m` in `T`, then `pre_S(m) ⇒ pre_T(m)` must hold.

### Step 3 — Postconditions cannot be weakened
A subclass must satisfy every postcondition the parent established.  
Example: `Bird.fly()` guarantees that altitude increases; a subclass `Penguin` whose `fly()` leaves altitude unchanged weakens the postcondition.

### Step 4 — Invariants must be preserved
Any invariant stated or implied by the parent must remain true after subclass methods execute.  
Example: `Account` maintains `balance ≥ 0`; a subclass `OverdraftAccount` that permits negative balance only if an explicit flag is set still preserves the invariant once the flag logic is part of the class contract.

### Step 5 — History constraint (behaviour over time)
A subclass must not introduce state changes that the parent’s clients cannot anticipate.  
Example: a mutable `Point` subclass that caches its polar coordinates must keep the Cartesian values consistent; any mutation that silently invalidates the cache violates the history constraint.

### Step 6 — The formal substitutability rule
Let `S <: T`. Then `S` is substitutable for `T` if and only if every client that satisfies the contracts of `T` also satisfies the contracts of `S`. This is the textbook-grade statement of LSP.

## 5. Worked examples — har step show karo

**Example 1 — Rectangle/Square counter-example**  
*Given:* `Rectangle` with `setWidth(w)` and `setHeight(h)` that independently update area.  
*Find:* Does `Square` inherit safely?  
Step 1: `Square.setWidth(w)` also sets height = w.  
Step 2: Client code `r.setWidth(5); r.setHeight(4); assert r.area()==20` now fails for a `Square`.  
*Why:* The client relied on independent width/height mutations promised by `Rectangle`.  
**Final answer: Square violates LSP.**

*Reflection:* The example shows how an apparently innocent override breaks an implicit postcondition.

**Example 2 — Ostrich cannot replace Bird**  
*Given:* `Bird.fly()` guarantees altitude > 0 after call.  
*Find:* Can `Ostrich` be a subtype?  
Step 1: `Ostrich.fly()` throws `CannotFlyException`.  
Step 2: Any loop that collects `Bird` objects and calls `fly()` on each now terminates abnormally.  
*Why:* Strengthened precondition (must be able to fly) and weakened postcondition.  
**Final answer: Ostrich is not substitutable.**

**Example 3 — Read-only collection**  
*Given:* `List<T>` declares `add(T)` with postcondition “size increases by one”.  
*Find:* Can an immutable list subclass `List`?  
Step 1: `ImmutableList.add(T)` throws `UnsupportedOperationException`.  
Step 2: Code that appends elements inside a generic algorithm fails.  
*Why:* Postcondition of `add` is not honoured.  
**Final answer: Immutable list must implement a separate interface without mutation methods.**

**Example 4 — Payment processor with fee**  
*Given:* `PaymentProcessor.process(amount)` guarantees that exactly `amount` is charged.  
*Find:* Can `PremiumProcessor` that deducts a 2 % platform fee be a subtype?  
Step 1: `PremiumProcessor.process(100)` charges only 98 to the merchant.  
Step 2: Any reconciliation routine expecting the full amount now reports a discrepancy.  
*Why:* Postcondition on transferred amount is weakened.  
**Final answer: LSP violation; fee logic must be modelled outside the substitution relationship.**

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Overriding to throw “NotSupportedException” | Developer re-uses an interface for convenience rather than for substitutability | Split the interface; provide separate read-only and mutable abstractions |
| Strengthening preconditions in the name of “validation” | Desire to add safety checks that the parent never required | Move extra checks into a separate guard method that callers invoke explicitly |
| Caching that breaks observable state | Performance optimisation without preserving history constraint | Ensure cached values are invalidated exactly when the parent’s contract demands |
| Returning a more specific type that callers do not expect | Covariant return looks harmless in statically typed languages | Verify that every client still compiles and behaves correctly after recompilation |
| Adding new mutable fields that affect parent methods | Subclass state leaks into inherited behaviour | Keep subclass state orthogonal; override only when the new state truly extends the contract |
| Assuming “if it compiles it is substitutable” | Compiler only checks signatures, never behavioural contracts | Write contract tests that exercise every promised postcondition for both parent and child |

## 7. The textbook-precise statement
Barbara Liskov and Jeannette Wing, “A behavioral notion of subtyping”, ACM Transactions on Programming Languages and Systems, 1994:

Let \(S\) be a subtype of \(T\). For every object \(x:S\) there exists an object \(y:T\) such that for every program \(P\) written in terms of \(T\), the observable behaviour of \(P\) is unchanged when \(x\) is substituted for \(y\).

All preconditions of methods in \(T\) must remain valid or be weakened in \(S\); all postconditions and invariants of \(T\) must remain valid or be strengthened in \(S\); and the history of state changes observable through \(T\)’s interface must be preserved by \(S\).

## 8. Visual — diagram or schematic
```text
          Client Code
               |
               v
        +-------------+          substitutable
        |   Bird      | <---------------------+
        | + fly()     |                       |
        +-------------+                       |
               ^                              |
               | inherits                     | inherits
        +-------------+                +-------------+
        |  Sparrow    |                |  Penguin    |
        | + fly()     |                | + fly()     |
        +-------------+                |  (throws)   |
                                       +-------------+
```
If the arrow from `Penguin` to `Bird` exists, every call site written against `Bird` must continue to function; the throw violates that requirement.

## 9. The memory technique
1. **The hook** — Picture a “substitute teacher” who must teach exactly the same lesson plan; if the substitute changes the rules mid-class, students (callers) become confused.
2. **What to overlearn** — “Preconditions may weaken, postconditions must strengthen, invariants never break.”
3. **Spaced-repetition schedule** — Review the one-sentence definition after 1 day, 3 days, 7 days, 16 days, and 35 days; each time implement one new example that passes or fails LSP.
4. **First-principles fallback** — Re-derive by asking: “If I replace every occurrence of the parent reference with the child reference, does any existing assertion still hold?”

## 10. What this unlocks
LSP is the behavioural foundation for safe polymorphism and therefore for the remaining SOLID principles (Interface Segregation and Dependency Inversion both rely on substitutable abstractions).

- Open/Closed Principle becomes practical only when new subtypes can be introduced without modifying existing code.
- Dependency Inversion Principle requires that both high-level and low-level modules depend on abstractions that satisfy LSP.
- Design by Contract techniques gain enforceable meaning once LSP is the acceptance criterion for inheritance.

## 11. Self-check — five questions, no answers
1. A subclass overrides a method to accept a narrower range of input values. Does this violate LSP? Why or why not?
2. Implement a `Circle` that inherits from `Ellipse`. Write the minimal set of methods that would cause an LSP violation and show the failing client code.
3. In a statically typed language, can a program that compiles still violate LSP? Give a concrete counter-example.
4. Explain how introducing an extra interface (instead of inheritance) can repair an LSP violation while preserving polymorphism.
5. A library author changes a base-class method from `final` to non-final and a subclass overrides it, altering a previously stable postcondition. Which clients are now at risk and how would you detect the regression?