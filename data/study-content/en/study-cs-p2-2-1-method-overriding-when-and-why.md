## 1. The one-sentence answer
**Method overriding occurs when a subclass supplies its own implementation of a method whose signature exactly matches one already defined in its superclass.**

At the level of source code this replacement is invisible to any client that holds a reference typed as the superclass. The running program nevertheless executes the subclass version whenever the actual object is an instance of the subclass. The mechanism therefore separates the promise of an interface from the concrete behaviour that fulfils it.

The distinction matters once an inheritance hierarchy grows beyond a single level. Without overriding, every subclass would be forced to inherit behaviour that may be incorrect or inefficient for its own domain; with overriding, each subclass can refine that behaviour while remaining substitutable for the superclass type.

> [!NOTE]
> The single most important realisation is that overriding is not about changing the contract; it is about changing only the fulfilment of an already-published contract at runtime.

## 2. Why this matters — concrete and current
In the Android framework, `Activity.onCreate` is overridden in every screen implementation so that the base class can perform lifecycle bookkeeping while each concrete activity supplies its own view hierarchy and saved-state restoration logic.  

In modern machine-learning libraries such as PyTorch, the `nn.Module.forward` method is overridden by every custom neural-network class; the optimiser and autograd engine interact only with the base-class interface, yet the subclass computation graph is executed.  

Inside the Linux kernel’s driver model, the `struct file_operations` table is populated by device-driver authors who override selected function pointers (`read`, `write`, `ioctl`) while the virtual file-system layer continues to dispatch through the common structure.  

In semiconductor design tools, the OpenAccess C++ API requires every technology-specific plug-in to override virtual methods such as `oaDevice::create` so that the core database can treat every foundry’s devices uniformly.  

Flight-control software certified to DO-178C frequently overrides a base `Sensor::sample` method in each hardware-abstraction subclass, allowing the same guidance loop to run unchanged against simulated or real sensors.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class inheritance    | Supplies the method that will be replaced                 |
| Method signature     | Must be identical for replacement to be legal             |
| Reference vs. object | Determines which implementation is chosen at runtime      |
| Polymorphism         | The language feature that makes overriding observable     |

## 4. Building the idea — from intuition to formalism

### Step 1 — A subclass already possesses every method declared in its superclass
When you write `class Dog extends Animal`, an instance of `Dog` automatically contains every non-private member of `Animal`.  
Example: `Animal` declares `void makeSound()`. A bare `Dog` object already responds to `makeSound`.  
Formal statement:  
\[
\text{If } D \preceq A \text{ then } \forall m \in \text{methods}(A),\; m \in \text{methods}(D).
\]
> [!WARNING]
> Treating inheritance as simple textual copy-and-paste hides the fact that the method still belongs to the superclass namespace until it is explicitly replaced.

### Step 2 — The inherited behaviour may be inappropriate for the subclass
A `Dog` should bark, not produce a generic animal noise. The language therefore permits the author of `Dog` to supply a new body for `makeSound`.  
Example: inside `Dog` we write an implementation whose source text is textually distinct from `Animal`’s.  
Formal statement: the compiler records two distinct code addresses for the same selector.

### Step 3 — The replacement must preserve the observable contract
The new method must accept exactly the same parameter types, return the same type, and throw only compatible checked exceptions. Otherwise the compiler rejects the declaration.  
Example: changing `makeSound(int volume)` would constitute overloading, not overriding.

### Step 4 — Dispatch is performed on the dynamic type of the receiver
At runtime the virtual method table (or equivalent) of the actual object is consulted, not the static type of the reference.  
Formal statement:  
\[
\text{call } r.m(\dots) \text{ executes } \text{code}(m, \text{dynamicType}(r)).
\]

### Step 5 — The `@Override` annotation (or equivalent) makes the intent explicit
Modern languages require or encourage an annotation so that accidental signature mismatches become compile-time errors rather than silent overloads.

### Step 6 — Overriding realises behavioural subtyping
The Liskov substitution principle is satisfied because every overridden method still accepts the preconditions and guarantees the postconditions of the superclass method.

### Step 7 — The textbook statement
A method `m` declared in class `C` is overridden by a method `m'` declared in subclass `D` when `m` and `m'` have identical signatures and `D \preceq C`. Invocation through a reference of type `C` executes `m'` whenever the receiver’s runtime class is `D` or any further descendant that does not override `m'` again.

## 5. Worked examples — every step shown

**Example 1 — Minimal override**  
*Given:* `Animal` with `makeSound`; `Dog` extends `Animal`.  
*Find:* output of `Animal a = new Dog(); a.makeSound();`.  
Step 1: static type of `a` is `Animal`.  
*Why*: the variable declaration fixes the compile-time view.  
Step 2: dynamic type of `a` is `Dog`.  
*Why*: the `new` expression creates a `Dog` instance.  
Step 3: `Dog` overrides `makeSound`.  
*Why*: identical signature and explicit redefinition.  
**"bark"**

*Reflection*: the example isolates the single fact that dynamic type governs dispatch.

**Example 2 — Override with super call**  
*Given:* `Vehicle.start()` prints “starting”; `ElectricCar` overrides it to call `super.start()` then print “(silently)”.  
*Find:* behaviour of `new ElectricCar().start()`.  
Step 1: `ElectricCar` version executes first.  
*Why*: dynamic type is `ElectricCar`.  
Step 2: `super.start()` resolves to `Vehicle.start`.  
*Why*: `super` explicitly selects the immediate superclass implementation.  
**"starting\n(silently)"**

*Reflection*: `super` provides a controlled way to extend rather than replace behaviour.

**Example 3 — Collection of heterogeneous objects**  
*Given:* `List<Shape>` containing `Circle`, `Rectangle`, and `Shape` instances, each overriding `double area()`.  
*Find:* sum of areas.  
Step 1: iterate the list.  
*Why*: each element’s static type is `Shape`.  
Step 2: invoke `area()` on every element.  
*Why*: dynamic dispatch selects the correct formula.  
**Total area computed correctly without `instanceof` tests.**

*Reflection*: overriding eliminates type-case statements.

**Example 4 — Covariant return (Java 5+)**  
*Given:* `Object clone()` overridden in `ArrayList` as `ArrayList clone()`.  
*Find:* compile-time type of `list.clone()`.  
Step 1: signature matches except return type.  
*Why*: Java permits covariant returns for overriding.  
Step 2: call site sees `ArrayList`.  
*Why*: the more specific return type is known statically.  
**No cast required.**

*Reflection*: language evolution refined the overriding rules while preserving binary compatibility.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Signature mismatch          | Parameter count or type differs slightly    | Always copy the superclass declaration verbatim |
| Missing `@Override`         | Compiler silently creates an overload       | Enable compiler warnings or use the annotation |
| Overriding a final method   | Attempt to change behaviour of a sealed API | Read the superclass documentation first      |
| Static method “override”    | Static methods are not dispatched virtually | Use class-name qualification instead         |
| Changing access modifier    | Widening from protected to public           | Keep access modifier identical or narrower   |
| Forgetting to call super    | Required initialisation omitted             | Document and enforce the super call contract |
| Overriding equals without hashCode | Contract violation leads to broken hash tables | Always override both together                |

## 7. The textbook-precise statement
A method declaration `m` in class `C` is an overriding declaration of a method `m'` in superclass `B` (where `C extends B`) if and only if `m` and `m'` have the same name, the same number of parameters, and the same parameter types (after type erasure in generic languages), `m` is not declared `static`, and `C` is a subtype of `B`. Invocation of `m` through a reference whose static type is `B` executes the implementation supplied by the most specific overriding method in the runtime class of the receiver (Java Language Specification, 3rd ed., §8.4.8; equivalent wording appears in the C# specification §10.6.4 and the C++ standard [class.virtual]).

## 8. Visual — diagram or schematic
```text
          Animal (superclass)
            makeSound()
               |
               | inherits
               v
          Dog (subclass)
            makeSound()   <-- overrides
               |
               | inherits
               v
          Labrador (further subclass)
            makeSound()   <-- overrides again
```
At runtime a reference `Animal a = new Labrador()` consults Labrador’s vtable entry for `makeSound`.

## 9. The memory technique
1. **The hook** — Picture a theatre understudy: the playbill (superclass) advertises the role, yet the actor who walks on stage (dynamic object) delivers the lines.  
2. **What to overlearn** — Signature identity, dynamic dispatch, `@Override` annotation.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the two facts “inheritance copies members” and “call sites use the runtime type of the receiver.”

## 10. What this unlocks
Method overriding is the implementation technique that realises runtime polymorphism and thereby enables the open-closed principle.  

- Next: abstract classes and interfaces that declare methods intended only to be overridden.  
- Next: the template-method and strategy patterns.  
- Next: safe use of collections of base-type references (`List<Shape>`).  
- Next: testing frameworks that rely on subclassing to inject mock behaviour.

## 11. Self-check — five questions, no answers
1. If a subclass declares a method with the same name but an additional parameter, is that overriding or overloading?  
2. In a language without virtual methods (C++ default), what happens when a base-class pointer calls a method redefined in the derived class?  
3. Write the smallest Java program that demonstrates that changing a method’s return type from `Number` to `Integer` is legal for overriding.  
4. Identify the trap: a programmer overrides `equals(Object)` but not `hashCode`; what concrete failure occurs in a `HashSet`?  
5. Given three classes `A`, `B extends A`, `C extends B`, each overriding `f()`, which implementation runs for the call `((A)new C()).f()`?