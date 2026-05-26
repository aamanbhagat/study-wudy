## 1. The one-sentence answer
**The Liskov Substitution Principle requires that every object of a derived type must be substitutable for an object of its base type without changing the observable behavior or correctness of any program that uses the base type.**

This rule enforces behavioral compatibility rather than mere syntactic inheritance. A subclass may add new capabilities, yet it must honor every contract already established by the superclass: the same preconditions must hold before a method is called, and the same postconditions must hold afterward. When the rule is followed, client code written against the base type continues to work unchanged when a subclass instance appears in its place.

When the rule is broken, seemingly innocent inheritance produces silent failures that surface only at runtime or under new usage. The principle therefore separates “is-a” relationships that are merely taxonomic from those that are semantically safe.

> [!NOTE]
> The decisive insight is that LSP is a *behavioral* constraint, not a structural one; two classes may share an inheritance arrow yet still violate the principle if their runtime contracts diverge.

## 2. Why this matters — concrete and current
NASA’s flight software for the Mars Perseverance rover models multiple propulsion and attitude-control subsystems through a common base interface; any concrete thruster or reaction-wheel controller must satisfy the identical pre- and post-conditions so that the autonomy layer can substitute units without re-verification of the calling sequences.

In the Java Collections Framework, `ArrayList` and `LinkedList` both implement `List`; libraries such as Apache Commons Collections and Google Guava rely on the substitution guarantee when they accept a `List` parameter and later swap implementations for performance tuning.

Modern deep-learning frameworks expose a common `Module` base class (PyTorch) or `Layer` base class (TensorFlow). Custom layers inherit from these bases; optimizers and training loops invoke methods whose contracts are fixed by the base, allowing new layer types to be dropped into existing pipelines without altering the training harness.

Semiconductor design tools at TSMC and Intel use class hierarchies for device models (MOSFET, FinFET, GAA). Simulation kernels written against the base device interface accept any concrete model; substitution failures would corrupt timing and power analysis across an entire tape-out.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Class inheritance & polymorphism | LSP only applies inside an inheritance hierarchy; you must already understand how a reference of the base type can point to a derived object. |
| Method preconditions and postconditions | The principle is expressed in terms of contracts; you must be able to state what must be true before and after a method executes. |
| Exception and error semantics | Subclasses may throw only the exceptions permitted by the base contract; this is one concrete way contracts are checked. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with ordinary inheritance
A subclass may reuse and extend a superclass.  
Example: `class Square extends Rectangle`.  
No formal statement yet.  
> [!WARNING]  
> Treating inheritance as only “code reuse” ignores behavioral obligations and is the most common source of later substitution bugs.

### Step 2 — Introduce the client’s expectation
Any code written against the base type forms an implicit contract about observable results.  
Example: code that sets `width` and `height` independently on a `Rectangle` expects the two values to remain independent.  
No math yet.

### Step 3 — Require substitutability
If a subclass instance is supplied wherever the base type is expected, the client code must still produce correct results.  
Example: passing a `Square` where a `Rectangle` is declared must not break the independence assumption.

### Step 4 — Formalize with contracts
Let \(S\) be a subtype of \(T\). For every method \(m\) in \(T\), the precondition of \(m\) in \(S\) must be no stronger than in \(T\), and the postcondition of \(m\) in \(S\) must be no weaker than in \(T\).  
\[
\text{pre}_S(m) \implies \text{pre}_T(m) \quad\text{and}\quad \text{post}_T(m) \implies \text{post}_S(m)
\]

### Step 5 — Strengthen to behavioral equivalence
The observable state transitions and any exceptions thrown must remain within the envelope defined by the base type.  
This yields the textbook formulation of the principle.

## 5. Worked examples — every step shown

**Example 1 — Rectangle/Square violation**  
*Given:* `Rectangle` with independent `setWidth`/`setHeight`; `Square` overrides both to keep sides equal.  
*Find:* Does `Square` satisfy LSP?  
Step 1: Client does `r.setWidth(5); r.setHeight(6); assert r.area()==30`.  
*Why:* This sequence is valid for any `Rectangle`.  
Step 2: Substitute `Square` instance.  
*Why:* The reference is still of static type `Rectangle`.  
Step 3: After the two calls both dimensions are 6, area is 36.  
*Why:* Postcondition of `setHeight` (area equals width×height) is violated.  
**Final answer: violates LSP.**

*Reflection:* The example is tricky because the override looks reasonable locally yet breaks a client invariant that the base type itself never promised to protect.

**Example 2 — Read-only collection**  
*Given:* `List` interface promises `add` may throw `UnsupportedOperationException`; `ImmutableList` implements it by always throwing.  
*Find:* Is substitution safe?  
Step 1: Precondition of `add` in base is “none”.  
*Why:* The base places no requirement on the caller.  
Step 2: Subclass keeps the same precondition.  
*Why:* LSP allows equal or weaker preconditions.  
Step 3: Postcondition is still satisfied (exception is permitted).  
**Final answer: obeys LSP.**

*Reflection:* Explicitly documenting allowed exceptions makes the contract check mechanical.

**Example 3 — Bird hierarchy**  
*Given:* `Bird` with `fly()`; `Penguin` inherits and throws `CannotFlyException`.  
*Find:* LSP compliance.  
Step 1: Base postcondition: “bird has changed position or returned normally”.  
*Why:* That is the documented contract.  
Step 2: Subclass always throws.  
*Why:* Throwing an undeclared exception violates the postcondition.  
**Final answer: violates LSP.**

*Reflection:* The counter-example shows that adding a new exception is a postcondition change.

**Example 4 — Payment processor with fee**  
*Given:* `PaymentProcessor` with `charge(amount)` returning net amount received; `PremiumProcessor` subtracts a documented fee yet still returns the correct net.  
*Find:* Compliance.  
Step 1: Precondition identical (amount > 0).  
*Why:* No strengthening.  
Step 2: Postcondition: “returned value equals amount minus any declared fee”.  
*Why:* Weaker postcondition is allowed only if the base already permits it; here the base states “net amount”.  
**Final answer: obeys LSP.**

*Reflection:* The fee is part of the observable result, so it must be part of the documented postcondition.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Square/Rectangle | Author focuses on geometric similarity instead of behavioral contract | Document mutability expectations in the base class before subclassing |
| Adding stronger preconditions | Subclass author wants to “protect” the object | Review every overridden method against the base precondition table |
| Throwing new unchecked exceptions | Java allows it; developer treats it as an implementation detail | Declare all permitted exceptions in the base method signature |
| Mutable collections returned as immutable views | Convenience overrides hide mutation side-effects | Return truly immutable wrappers or copies when the base promises immutability |
| Changing return-type covariance that narrows expected range | Language feature used without checking client assumptions | Verify that every possible returned value still satisfies the base postcondition |
| Temporal ordering assumptions (e.g., init must precede use) | Subclass adds extra setup step | Encode ordering in the base class via a state machine or explicit precondition |
| Logging side-effects that alter timing | Debug code changes observable performance contract | Keep logging orthogonal to functional postconditions |

## 7. The textbook-precise statement
A type \(S\) is a behavioral subtype of type \(T\) if, for every object \(s\) of type \(S\), there exists an object \(t\) of type \(T\) such that, for all programs \(P\) defined in terms of \(T\), the observable behavior of \(P\) is unchanged when \(t\) is replaced by \(s\). (Barbara Liskov, “Data Abstraction and Hierarchy”, SIGPLAN Notices, 1987; restated in Liskov & Wing, “A Behavioral Notion of Subtyping”, ACM TOPLAS, 1994.)

## 8. Visual — diagram or schematic
```text
Base type T
├── precondition: amount > 0
├── postcondition: returns net ≥ 0
│
Subtype S1 (good)          Subtype S2 (bad)
- same precondition        - precondition: amount ≥ 100   ← stronger
- postcondition: net =     - postcondition: may throw
  amount – fee               new exception
```
The diagram shows two inheritance arrows; only the left child preserves the original contracts.

## 9. The memory technique
1. **The hook** — Picture a “substitute teacher” who must follow the exact lesson plan left by the regular teacher; any deviation (extra homework, different grading) breaks the class contract.
2. **What to overlearn** — The two inequalities: \(\text{pre}_S \implies \text{pre}_T\) and \(\text{post}_T \implies \text{post}_S\).
3. **Spaced-repetition schedule** — Review the two inequalities at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the client code once against the base type, then mentally replace the instance with the subclass and check every assertion that the client relied upon.

## 10. What this unlocks
LSP supplies the semantic foundation for safe polymorphism and is a prerequisite for the remaining SOLID principles, especially Interface Segregation and Dependency Inversion.  

- Open/Closed Principle relies on substitutable extensions.  
- Dependency Inversion abstractions must satisfy LSP to be replaceable by multiple concrete implementations.  
- Design-by-contract methodologies and model-checking tools use the same pre/postcondition rules.  
- Refactoring toward composition instead of inheritance becomes clearer once behavioral substitution is understood.

## 11. Self-check — five questions, no answers
1. A subclass overrides a method and adds a non-null precondition on one parameter; does this obey LSP?  
2. In a hierarchy of immutable value objects, a subclass caches a derived field; which contracts must still hold?  
3. You change a base-class method from throwing `IOException` to throwing the narrower `FileNotFoundException`. Is the change LSP-safe for existing subclasses?  
4. A `Stack` implemented by inheriting from `Vector` allows clients to insert elements in the middle via the inherited API. Identify the LSP violation.  
5. Given two candidate subclasses, one that narrows the range of legal return values and one that widens it, which (if either) can be substituted without breaking clients?