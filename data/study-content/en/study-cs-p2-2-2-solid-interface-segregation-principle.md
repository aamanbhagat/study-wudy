## 1. The one-sentence answer
**The Interface Segregation Principle states that clients should never be forced to depend on interfaces they do not use.**

A single bloated interface mixes unrelated responsibilities. Any class implementing it must provide every method, even those irrelevant to its purpose. This creates unnecessary coupling and fragile code that changes for reasons unrelated to the class itself.

The remedy is to split the large interface into smaller, focused ones. Each client then depends only on the precise set of methods it needs. The resulting design remains stable when one client’s requirements evolve.

> [!NOTE]
> The principle is not about making interfaces small for their own sake; it is about ensuring that the dependency graph between clients and abstractions contains no superfluous edges.

## 2. Why this matters — concrete and current
In the Android framework, the original `View` class accumulated dozens of callbacks over successive releases. Later components such as `RecyclerView` and `MotionLayout` interact only with narrow listener interfaces (`OnScrollListener`, `TransitionListener`). This segregation lets Google evolve touch-handling logic without forcing every custom view to recompile or implement empty methods.

JetBrains’ IntelliJ Platform defines more than thirty separate extension-point interfaces (`EditorFactoryListener`, `ProjectManagerListener`, etc.). Plugin authors implement only the contracts they need. When JetBrains adds new editor events, existing plugins remain binary-compatible because they never depended on the new methods.

In the Linux kernel’s VFS layer, the `struct inode_operations` and `struct file_operations` are deliberately separate. File-system developers implement only the operations their storage medium supports. A network file system therefore never carries unused local-disk methods, reducing both binary size and attack surface.

Modern machine-learning runtimes such as PyTorch’s ATen dispatch table expose distinct `DispatchKey` interfaces for CPU, CUDA, and XPU back-ends. Operator authors register only the kernels they implement; the core engine never forces a CPU-only contributor to satisfy a CUDA-specific contract.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Interface / abstract class | ISP is stated in terms of the contracts clients depend on |
| Client–implementation split| The principle concerns what a client sees, not how it is realised |
| Cohesion                   | Low cohesion of an interface is the symptom ISP corrects  |

## 4. Building the idea — from intuition to formalism

### Step 1 — A fat interface creates accidental dependencies
A single interface that declares every possible operation forces every implementer to know about operations it will never invoke.  
Example: an `IPrinter` declaring `Print`, `Scan`, and `Fax`. A basic inkjet printer must still supply a no-op `Fax` method.  
Formal statement: if interface \(I\) contains method set \(M\) and client \(C\) uses only subset \(M_C \subset M\), then \(C\) depends on \(M \setminus M_C\) unnecessarily.

> [!WARNING]
> Treating the extra methods as harmless “just implement them empty” still couples the client to their signatures and future changes.

### Step 2 — Split along usage boundaries
Identify the distinct roles clients play and extract a separate interface for each role.  
Example: extract `IPrint`, `IScan`, and `IFax`. The inkjet now implements only `IPrint`.  
Formal statement: partition \(M\) into disjoint subsets \(M_1, M_2, \dots, M_k\) such that each client \(C_i\) depends on exactly one \(M_i\).

### Step 3 — Clients depend on the narrowest sufficient contract
After segregation, each client references only the interface that matches its actual calls.  
Example: a print spooler now holds an `IPrint*`, never an `IPrinter*`.  
Formal statement: the dependency relation becomes \(C_i \to I_i\) where \(I_i\) exports precisely \(M_{C_i}\).

### Step 4 — Implementation classes remain free to compose
A class may implement several segregated interfaces when it genuinely supports multiple roles.  
Example: a multifunction device implements `IPrint`, `IScan`, and `IFax`.  
Formal statement: \(\text{implements}(D, I_1) \land \text{implements}(D, I_2)\) is admissible provided each \(I_j\) is minimal.

### Step 5 — The resulting design satisfies ISP
No client is forced to accept methods outside its usage set.  
Textbook statement (Martin): “Clients should not be forced to depend upon interfaces that they do not use.”

## 5. Worked examples — every step shown

**Example 1 — Single-role printer**  
*Given:* A monolithic `IPrinter` with `print`, `scan`, `fax`.  
*Find:* Segregated design for a print-only client.  
Step 1: Extract `interface IPrint { void print(Document d); }`.  
*Why* — removes two unused methods from the client’s view.  
Step 2: The spooler now depends solely on `IPrint`.  
*Why* — the dependency edge count drops from 3 to 1.  
**Final answer**  
```java
IPrint printer = new InkjetPrinter();
printer.print(doc);
```
*Reflection* — The example is trivial yet demonstrates the exact edge removal ISP targets.

**Example 2 — Payment processor with optional 3-D Secure**  
*Given:* `IPayment` containing `pay`, `refund`, `verify3DS`.  
*Find:* Minimal interface for a processor that never performs 3-D Secure.  
Step 1: Split into `IPayment` and `I3DSecure`.  
*Why* — `verify3DS` is used only by certain gateways.  
Step 2: Legacy gateway implements only `IPayment`.  
*Why* — no need to throw `UnsupportedOperationException`.  
**Final answer**  
```java
IPayment p = new LegacyGateway();
p.pay(amount);
```
*Reflection* — The split prevents propagation of an irrelevant security concern.

**Example 3 — Composite robot controller**  
*Given:* `IRobot` with `move`, `speak`, `fire`, `diagnose`.  
*Find:* Interfaces for a wheeled base that never speaks or fires.  
Step 1: Create `IMovable`, `ISpeakable`, `IWeapon`, `IDiagnosable`.  
*Why* — each capability is an independent client concern.  
Step 2: Wheeled base implements only `IMovable` and `IDiagnosable`.  
*Why* — compile-time guarantee that no voice or weapon code is reachable.  
**Final answer**  
```java
IMovable base = new WheeledChassis();
base.move(forward);
```
*Reflection* — Composition of interfaces replaces inheritance of a god interface.

**Example 4 — Library API evolution**  
*Given:* `ICollection<T>` with 12 methods including `sort` and `parallelStream`.  
*Find:* Allow a new immutable collection without forcing a sort implementation.  
Step 1: Move mutation and sorting into `IMutableCollection` and `ISortable`.  
*Why* — existing immutable clients never see the new methods.  
Step 2: Add `parallelStream` only to `IParallelisable`.  
*Why* — clients that never requested parallelism remain unaffected by future optimisations.  
**Final answer**  
```java
ICollection<String> names = new ImmutableList<>();
```
*Reflection* — Segregation permits independent, backward-compatible growth of the library.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| “Just add a default method”       | Fear of breaking implementers               | Introduce a new segregated interface instead         |
| One interface per class           | Over-eager application of SRP               | Split only when distinct client usage sets exist     |
| Marker interfaces with no methods | Desire to tag classes without behaviour     | Use annotations or sealed hierarchies                |
| Reusing an existing broad interface for convenience | Copy-paste from legacy code          | Audit every dependency before adopting an interface  |
| Throwing UnsupportedOperationException | Pretending the method is optional      | Remove the method from the interface the client sees |
| God interface in third-party library | External author did not apply ISP     | Wrap the library with adapter interfaces you control |
| Over-segregation into single-method interfaces | Premature optimisation of cohesion | Keep an interface only when at least two clients share the exact set |

## 7. The textbook-precise statement
Robert C. Martin, *Agile Software Development, Principles, Patterns, and Practices*, 2002, Chapter 10:  
“No client should be forced to depend on methods it does not use. When this occurs, the client is forced to change whenever the interface changes, even though the client does not care about the change.”  
The statement assumes (a) an interface is a set of operation signatures, (b) a client is any module that holds a reference typed to that interface, and (c) the only permissible dependency is the subset of signatures actually invoked by that client.

## 8. Visual — diagram or schematic
```text
Before ISP
ClientA ──► IAll [print, scan, fax]
ClientB ──► IAll [print, scan, fax]

After ISP
ClientA ──► IPrint [print]
ClientB ──► IScan [scan]
Printer   implements IPrint
Scanner   implements IScan
```

## 9. The memory technique
1. **The hook** — Imagine an interface as a restaurant menu. ISP says: never hand a customer a menu containing dishes they cannot order; give them a single-page card with only the meals they actually eat.
2. **What to overlearn** — “Many client-specific interfaces > one general interface.”
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by listing every method a concrete client actually calls, then extract exactly that subset into a new interface.

## 10. What this unlocks
ISP supplies the final refinement needed to keep the other SOLID principles stable under change. It directly enables the Open/Closed Principle by ensuring new behaviour can be added through new narrow interfaces rather than modification of existing ones. It also reduces the surface area that the Dependency Inversion Principle must abstract, making dependency-injection containers simpler to configure.

- Next: Liskov Substitution Principle applied to segregated interfaces
- Next: Composition over inheritance patterns that rely on role interfaces
- Next: Hexagonal architecture port definitions

## 11. Self-check — five questions, no answers
1. A class implements an interface containing ten methods yet invokes only two at runtime. Which principle is violated and why?
2. You are given a legacy `IReportGenerator` with `generatePDF`, `generateHTML`, `generateCSV`, and `emailReport`. Two new clients need only CSV output. Sketch the minimal refactoring that obeys ISP.
3. Explain the difference between ISP and the Single Responsibility Principle using the same interface as an example.
4. In a system where every class implements exactly one method, is ISP automatically satisfied? Construct a counter-example if not.
5. A third-party library adds a new method to an interface you already implement. How does ISP guide your migration strategy?