## 1. The one-sentence answer
**Open/Closed Principle states that software entities (classes, modules, functions) should be open for extension but closed for modification.**

Iska matlab yeh hai ki aap existing code ko directly change kiye bina usme naye behaviour add kar sakte ho. Jab koi class already tested aur stable hai, usko modify karne se naye bugs aa sakte hain; isliye principle kehta hai ki extension points (jaise inheritance ya interfaces) use karke nayi functionality inject karo. Yeh approach code ko maintainable aur scalable banata hai kyunki purana code untouched rehta hai.

Aap soch sakte ho ki ek payment processor class already likha hua hai jo credit-card handle karta hai. Agar aap ab UPI support add karna chahte ho, toh principle ke mutabik aap us class ko edit nahi karoge; balki ek naya class banaoge jo same interface implement kare.

> [!NOTE]
> The core “aha” is that change should happen by adding new code, never by editing code that already works.

## 2. Why this matters — concrete and current
In Spring Framework, the `HandlerInterceptor` interface lets developers add cross-cutting concerns such as authentication without touching the core `DispatcherServlet` implementation that has remained stable for years.

Google’s Android Jetpack uses abstract `ViewModel` classes; new UI behaviours are introduced by subclassing rather than modifying the existing lifecycle-handling code inside `ViewModel`.

In aerospace flight-control software certified under DO-178C, low-level device drivers are kept closed after verification; new sensor fusion algorithms are added through well-defined extension interfaces so that previously validated modules never require re-certification.

LLVM compiler infrastructure exposes the `Pass` interface; each new optimisation (for example, a novel loop-vectorisation pass) is written as a separate derived class, leaving the existing pass-manager pipeline untouched.

AWS Lambda runtime layers allow custom logging or tracing behaviour to be injected by adding new layers instead of modifying the published runtime binaries that Amazon already guarantees.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Abstraction & interfaces | Provide the “closed” contract that new extensions must obey |
| Polymorphism             | Enables runtime selection of extended behaviour           |
| Dependency inversion     | Ensures high-level modules depend on abstractions, not concrete implementations |

If any of these three ideas feel shaky, pause and revisit them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the axis of change
Aap dekhte ho ki ek module mein kaunsa part baar-baar badal raha hai. Agar har nayi requirement ke liye same class edit karni pad rahi hai, woh axis of change hai.

Example: ek `ReportGenerator` class jo har baar naye export format (PDF, CSV, JSON) ke liye modify hoti hai.

Formal statement: Let \(M\) be a module whose source must remain unchanged after initial release; any new requirement \(R\) must be satisfiable by adding new code only.

> [!WARNING]
> If you misidentify the axis, you will close the wrong part and still have to edit the class later.

### Step 2 — Extract an abstraction that captures the stable contract
Define an interface or abstract class that expresses only the behaviour that never changes.

Example: `interface ReportExporter { byte[] export(Report r); }`

Formal statement: There exists an abstraction \(A\) such that every valid extension satisfies \(A\).

> [!WARNING]
> A leaky abstraction (one that exposes internal details) will force modification of the original module when extensions evolve.

### Step 3 — Make the original module depend only on the abstraction
High-level code now talks to \(A\) instead of concrete classes.

Example: `ReportGenerator` holds a reference of type `ReportExporter` injected at runtime.

Formal statement: Module \(M\) is closed against modification when \(\forall\) extensions \(E\), \(M\) interacts with \(E\) solely through \(A\).

> [!WARNING]
> Skipping dependency injection re-introduces direct coupling and defeats closure.

### Step 4 — Implement each extension in a new concrete type
New formats become separate classes that implement the same interface.

Example: `PdfExporter`, `CsvExporter`, `JsonExporter` each implement `ReportExporter`.

Formal statement: Extension \(E_i\) is substitutable for \(A\) (Liskov substitution holds).

> [!WARNING]
> Violating substitutability (for example, throwing unexpected exceptions) breaks all clients of \(A\).

### Step 5 — Achieve openness through composition or inheritance at the extension point
Clients obtain new behaviour simply by receiving a different implementation of \(A\).

Formal statement: The set of possible behaviours of \(M\) is the union of all implementations of \(A\) without any edit to \(M\)’s source.

## 5. Worked examples — har step show karo

**Example 1 — Simple shape drawing**
*Given:* A `Canvas` class that currently contains an `if-else` ladder for `Circle` and `Rectangle`.
*Find:* Extend it to support `Triangle` without editing `Canvas`.
- Introduce `interface Shape { void draw(); }`.
- Move each concrete shape into its own class implementing `Shape`.
- `Canvas` now holds `List<Shape>` and calls `draw()` polymorphically.
*Why* each move: the interface closes the drawing contract; new shapes only add code.
**Final answer:** `Canvas` never changes after the interface is introduced.

*Reflection:* The example is simple yet demonstrates that the “closed” part is the iteration logic, not the list of shapes.

**Example 2 — Payment processing service**
*Given:* `PaymentService` class with a `process(Payment p)` method containing a switch on payment type.
*Find:* Add cryptocurrency support.
- Extract `interface PaymentProcessor { void process(Payment p); }`.
- Move each case into `CreditCardProcessor`, `PayPalProcessor`, etc.
- Inject the chosen processor via constructor.
*Why* each move: switch statement was the axis of change; removing it closes the service.
**Final answer:** Adding `CryptoProcessor` requires zero edits to `PaymentService`.

*Reflection:* Real projects often hide the switch inside factories; the principle still applies to the service itself.

**Example 3 — Logging with multiple sinks**
*Given:* A monolithic logger writing only to files.
*Find:* Support console and remote syslog sinks.
- Define `interface LogSink { void write(LogEntry e); }`.
- Implement `FileSink`, `ConsoleSink`, `SyslogSink`.
- Logger composes a list of sinks.
*Why* each move: each new sink is an extension; logger remains closed.
**Final answer:** Logger source stays untouched for any future sink.

*Reflection:* Composition over inheritance keeps the design flexible when multiple extensions must be active simultaneously.

**Example 4 — Plugin architecture in an IDE**
*Given:* Core editor that must support arbitrary language servers.
*Find:* Add Rust language support later.
- Core defines `LanguageServer` interface with `parse`, `complete`, `diagnose`.
- Each language is a separate JAR implementing the interface.
- Editor loads implementations via service loader at startup.
*Why* each move: interface is the stable contract; new JARs are pure extensions.
**Final answer:** Editor binary never recompiles when a new language server appears.

*Reflection:* This scales to hundreds of extensions precisely because the core obeys the principle.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Over-abstracting too early        | Fear of future change leads to needless interfaces | Wait until the axis of change is observed            |
| Leaky abstractions                | Implementation details slip into the interface | Keep interface methods minimal and stable            |
| Modifying the closed module “just once” | Short-term convenience wins over long-term safety | Enforce code-review rule: no edits to closed classes |
| Inheritance used where composition fits | Misunderstanding the extension mechanism    | Prefer injecting different implementations           |
| Ignoring Liskov substitution      | New subclass changes expected behaviour     | Write contract tests for the abstraction             |
| Forgetting to close the client    | Only the service is closed, callers still switch | Push the choice of implementation to configuration   |
| Creating “one-size-fits-all” interface | Trying to predict every possible extension  | Evolve the interface only when a genuinely new axis appears |

## 7. The textbook-precise statement
“A class should be open for extension and closed for modification. That is, its source code should never have to be altered once it has been placed in production, yet it should be possible to extend its behaviour without modifying its source.” — Robert C. Martin, *Agile Software Development, Principles, Patterns, and Practices*, 2002, Chapter 8.

All hypotheses: the class must already be behind a stable abstraction; every extension must be substitutable for that abstraction; clients must obtain their dependencies through injection or configuration rather than direct instantiation.

## 8. Visual — diagram or schematic
```text
Client
  |
  v
Service  <--- uses --->  Abstraction (interface)
                            /          \
                    ConcreteA        ConcreteB   (new extensions)
```
- `Service` never references `ConcreteA` or `ConcreteB` directly.
- Adding `ConcreteC` only requires a new class and configuration change.

## 9. The memory technique

1. **The hook** — Picture a restaurant kitchen whose recipe book is sealed in glass (“closed”). Chefs add new dishes by writing on separate cards that the kitchen simply accepts (“open”).
2. **What to overlearn** — The single sentence: “Add new code, never edit working code.” Also remember the interface is the only thing both the service and all extensions share.
3. **Spaced-repetition schedule** — Review the definition after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the wording, ask: “Which part of this module will keep changing?” Then extract an abstraction around the stable part.

## 10. What this unlocks
Mastering OCP lets you design plugin systems, micro-service extension points, and testable architectures without fear of regression.

- Next you will meet the Liskov Substitution Principle, which guarantees that every extension remains safe to substitute.
- You will also see how OCP and Dependency Inversion together produce the “Dependency Inversion Principle” layer of SOLID.
- Factory patterns, strategy patterns, and decorator patterns all become natural consequences once OCP is internalised.

## 11. Self-check — five questions, no answers
1. A class contains a long switch on an enum that keeps growing with every new requirement. Which axis of change have you identified, and what abstraction would close the class?
2. You created an interface with ten methods because “we might need them later.” Two months later you must add an eleventh method. Did you truly keep the original class closed? Explain.
3. In a drawing application, `Circle` and `Square` both implement `Shape`. A new requirement arrives: “triangles must be filled with a gradient.” Which module(s) must you modify to stay compliant with OCP?
4. A colleague suggests editing the existing `PaymentService` to add a one-line special case for refunds. Using the principle, give a one-sentence reason why this is dangerous.
5. Suppose an abstraction `Logger` is implemented by `FileLogger`. A new subclass `SecureLogger` overrides a method and throws `RuntimeException` when the file system is full, whereas the interface contract promises it will never throw. Which principle is violated and why does it break OCP clients?