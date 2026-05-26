## 1. The one-sentence answer
**A class should have only one reason to change.**

That single sentence captures the entire principle. When a class owns two distinct responsibilities, any change to one responsibility risks breaking the other. The result is fragile code that must be edited in multiple places for a single logical update.

Consider a module that both calculates payroll and prints paychecks. A change in tax rules affects the calculation; a change in printer drivers affects the output. These two concerns evolve on independent schedules, yet they share the same source file. The principle forces the designer to separate them so each file changes for only one of those reasons.

> [!NOTE]
> The "reason to change" is not about lines of code or method count; it is about the single axis of variation that the class is allowed to track.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover isolates sensor fusion from actuator command logic. A single requirement change in navigation algorithms must not force re-validation of the propulsion safety layer.

Google’s Borg cluster scheduler keeps job admission control in a different package from resource allocation accounting. Independent teams can modify quota policies without touching the core placement heuristics that run every few seconds.

Modern semiconductor design tools such as those from Synopsys separate netlist parsing from timing-analysis engines. A new file format introduced by a foundry affects only the parser; the timing model remains untouched and re-certified once.

Machine-learning training pipelines at OpenAI keep data-preprocessing transforms in separate classes from gradient-update logic. Dataset schema changes therefore do not invalidate the optimizer’s numerical tests.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Class / module           | SRP is stated in terms of what a single class owns        |
| Cohesion                 | SRP is the enforcement mechanism that produces high cohesion |
| Coupling                 | Violating SRP usually increases coupling between concerns |

## 4. Building the idea — from intuition to formalism

### Step 1 — A module should do one thing
A module that performs two unrelated tasks forces its maintainer to understand both tasks even when only one must be altered.  
Example: a `ReportGenerator` that both queries a database and formats HTML.  
Formal statement:  
$$ \text{Responsibility}(C) = \{ r \mid r \text{ is a distinct reason for } C \text{ to change} \} $$  
> [!WARNING]
> Treating “one thing” as “one method” hides the real problem; two methods can still serve two separate reasons to change.

### Step 2 — Identify the axes of change
List every stakeholder or external force that could demand a modification. Each distinct stakeholder defines a separate responsibility.  
Example: accounting rules versus UI branding.  
Formal statement:  
$$ |\{ \text{stakeholders that can force } C \text{ to change}\}| = 1 $$

### Step 3 — Separate along those axes
Create a new class for each independent axis; delegate from the original class.  
Example: split into `PayrollCalculator` and `PaycheckPrinter`.  
Formal statement: after split, each new class satisfies  
$$ |\text{Responsibility}(C_i)| = 1 $$

### Step 4 — Preserve behaviour through composition
Clients interact with the original abstraction via an interface or by holding references to the new classes.  
Example: `PayrollService` holds both calculator and printer.  
Formal statement:  
$$ \text{Behaviour}(C) = \text{Behaviour}(C_1) \circ \text{Behaviour}(C_2) $$

### Step 5 — The textbook statement
A class adheres to the Single Responsibility Principle if and only if it possesses exactly one reason to change.

## 5. Worked examples — every step shown

**Example 1 — Trivial split**  
*Given:* A class `Invoice` that calculates totals and also saves itself to a file.  
*Find:* Two classes each obeying SRP.  
Step 1: Identify reasons → tax rules and storage format.  
*Why* — two independent change vectors.  
Step 2: Extract `InvoiceCalculator` and `InvoiceRepository`.  
*Why* — each now owns one vector.  
**Final answer**  
```java
class InvoiceCalculator { … }
class InvoiceRepository { … }
```
*Reflection* — the original class became a thin coordinator; the trick was naming the new classes after their change axis rather than after data.

**Example 2 — GUI widget**  
*Given:* `TemperatureDisplay` that reads a sensor and renders to Swing.  
*Find:* SRP-compliant design.  
Step 1: Sensor protocol versus pixel layout.  
*Why* — hardware engineers and UX designers change independently.  
Step 2: `SensorReader` and `TemperatureView`.  
**Final answer**  
Two classes; `TemperatureView` receives a value through an observer.  
*Reflection* — threading concerns now live only in the reader.

**Example 3 — Microservice boundary**  
*Given:* A service that both authenticates users and logs audit events.  
*Find:* Correct service split.  
Step 1: Security policy versus compliance retention.  
Step 2: `AuthService` and `AuditLogger`.  
**Final answer**  
Separate deployments with distinct SLAs.  
*Reflection* — operational ownership becomes obvious once responsibilities are named.

**Example 4 — Refactoring legacy monolith**  
*Given:* 1200-line `OrderProcessor` handling validation, pricing, persistence, and email.  
*Find:* Step-wise extraction order.  
Step 1: Four change reasons → four new classes.  
Step 2: Introduce interfaces first, then move behaviour.  
**Final answer**  
`Order`, `PricingEngine`, `OrderRepository`, `NotificationService`.  
*Reflection* — the hardest part was deciding the order of extraction so that tests remained green after each commit.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| “It’s just one more if-statement” | Local convenience masks long-term ownership | Ask “which stakeholder owns this line?”      |
| Over-fragmentation into 2-line classes | Fear of any second responsibility         | Keep data and behaviour that truly change together |
| Naming after data instead of reason | Habit from database modelling             | Name after the change axis (e.g., `TaxRuleEngine`) |
| Mixing I/O with domain logic      | Quick prototype becomes permanent           | Draw the boundary on paper before coding     |
| SRP applied at method level only  | Misreading “class” as “function”            | Review the class’s public interface as a whole |
| Ignoring configuration changes    | Config seen as “not code”                   | Treat each config key as a potential reason  |
| God interface that hides multiple responsibilities | Single interface name feels clean       | Split interface when implementations diverge |

## 7. The textbook-precise statement
A class *C* satisfies the Single Responsibility Principle when there exists exactly one cohesive reason *r* such that any modification to *C* is caused solely by a change in *r*. (Robert C. Martin, *Agile Software Development: Principles, Patterns, and Practices*, 2002, Chapter 8.)

## 8. Visual — diagram or schematic
```text
Before (violates SRP)
+---------------------+
|   ReportGenerator   |
|---------------------|
| +queryDatabase()    |
| +formatHtml()       |
| +printToPdf()       |
+---------------------+
          ▲ two reasons

After (compliant)
+------------------+     +------------------+     +------------------+
|  DataCollector   |     |   HtmlFormatter  |     |   PdfRenderer    |
|------------------|     |------------------|     |------------------|
| +fetchRows()     |     | +render()        |     | +toPdf()         |
+------------------+     +------------------+     +------------------+
```

## 9. The memory technique
1. **The hook** — Imagine a Swiss-army knife whose can-opener and screwdriver are welded together; changing the screwdriver angle breaks the can-opener. SRP is the rule that keeps the blades on separate hinges.
2. **What to overlearn** — The phrase “one reason to change”; the two-class split pattern.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by listing every external force that could require editing the class, then grouping those forces until only one group remains.

## 10. What this unlocks
SRP is the foundation of the remaining SOLID principles and of clean architecture.  

- Open/Closed Principle becomes tractable once each class has a single axis.  
- Interface Segregation Principle is the same idea applied to interfaces.  
- Dependency Inversion becomes straightforward when dependencies point to single-purpose abstractions.  
- Domain-driven design aggregates and bounded contexts rely on the same separation of reasons.

## 11. Self-check — five questions, no answers
1. A class contains two public methods that share no fields. Does this automatically violate SRP?  
2. You extract a private helper method. Has the original class’s responsibility count changed?  
3. Name two stakeholders whose independent schedules would force a `User` class to change.  
4. In a system that must support both SQL and MongoDB persistence, which classes should be created to keep each obeying SRP?  
5. A logging statement appears inside a pricing calculation. Which principle is most directly threatened and why?