## 1. The one-sentence answer
**Structural design patterns are reusable solutions that define how classes and objects can be composed to form larger structures while keeping those structures flexible and efficient.**

These patterns solve recurring problems that arise when you try to organise code so that parts can work together without becoming tightly coupled or bloated. Instead of forcing every class to know the internal details of every other class, each pattern introduces a thin layer of indirection or hierarchy that lets you change one side without rewriting the other. The seven patterns you will meet—Adapter, Bridge, Composite, Decorator, Facade, Flyweight and Proxy—each attack a different kind of structural friction that appears in real codebases.

> [!NOTE]
> The single most important insight is that these patterns do not add new behaviour; they rearrange existing classes and interfaces so that behaviour can be reused, extended or hidden without touching the original code.

## 2. Why this matters — concrete and current
Google’s internal gRPC framework uses the Adapter pattern to let the same service definition work with both HTTP/2 and QUIC transports without rewriting any business logic.  
Android’s Jetpack Compose rendering pipeline relies on the Composite pattern so that a single UI tree can contain both leaf widgets and nested layout groups while the layout algorithm stays unchanged.  
Unity’s asset pipeline applies the Flyweight pattern to share mesh and texture data across thousands of identical game objects, keeping memory usage under control on mobile GPUs.  
AWS SDK for Java wraps complex S3, DynamoDB and Lambda calls behind a single Facade class so that application developers never need to manage signing, retries or region selection themselves.  
Microsoft’s WPF data-binding system uses the Proxy pattern to create virtual collections that load data from the database only when the UI actually requests it.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Interface & abstract class | Every structural pattern introduces new interfaces or abstract classes to decouple clients from concrete implementations. |
| Composition over inheritance | All seven patterns prefer object composition instead of deep inheritance hierarchies. |
| Polymorphism & dynamic dispatch | Patterns such as Decorator and Composite rely on runtime method calls resolving to the correct subclass. |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the mismatch between two interfaces
When two classes need to collaborate but their method signatures do not match, you need an intermediate object that translates calls.  
Example: a legacy `OldPrinter` class has `print(String)` while your new system expects `printDocument(Document)`.  
Formally, an Adapter \(A\) satisfies \(A : Target \to Adaptee\) such that every method of \(Target\) is implemented by delegating to the corresponding method of \(Adaptee\) after suitable data conversion.

> [!WARNING]
> If you implement the Adapter by copying code instead of delegating, you create two copies of the same logic that will diverge over time.

### Step 2 — Separate abstraction from implementation
When you want to vary the abstraction and the implementation independently, introduce a Bridge that holds a reference to the implementation interface.  
Formally, let \(Abstraction\) contain a field of type \(Implementor\); every operation on \(Abstraction\) forwards to the corresponding operation on the current \(Implementor\).

### Step 3 — Treat individual objects and groups uniformly
When clients must handle both single objects and collections of objects with the same code, define a common interface for both.  
Formally, the Composite pattern makes every node implement the same \(Component\) interface; a composite node stores a list of children that are also \(Component\) objects.

### Step 4 — Add responsibility dynamically without subclass explosion
When you need to attach new behaviour to an object at runtime, wrap it inside another object that implements the same interface.  
Formally, a Decorator \(D\) holds a reference to a \(Component\) and forwards every call after executing its own additional logic.

### Step 5 — Provide a simplified entry point to a complex subsystem
When a client should not need to know the internal classes of a library, expose a single high-level class that orchestrates the subsystem.  
Formally, the Facade class contains methods that internally create and coordinate multiple subsystem objects.

### Step 6 — Share immutable state across many objects
When thousands of objects differ only in a few extrinsic parameters, extract the common intrinsic state into shared flyweight objects.  
Formally, a Flyweight factory returns the same instance for any request that carries identical intrinsic data.

### Step 7 — Control access or defer expensive operations
When you need to add lazy loading, access control or remote communication without changing the client, insert a surrogate that implements the same interface.  
Formally, a Proxy \(P\) implements \(Subject\) and holds either a reference to the real subject or enough information to create it on demand.

### Step 8 — Choose the pattern by the structural force you feel
If the dominant force is interface mismatch → Adapter; independent variation of two hierarchies → Bridge; tree structures → Composite; runtime behaviour extension → Decorator; subsystem complexity → Facade; memory pressure from duplicates → Flyweight; indirection for control → Proxy.

## 5. Worked examples — har step show karo

**Example 1 — Adapter for legacy printer**  
*Given:* `OldPrinter.print(String text)` and client code that calls `printDocument(Document d)`.  
*Find:* an Adapter that lets the client use the old printer.  
Step 1: define `interface Printer { void printDocument(Document d); }`.  
Step 2: create `class OldPrinterAdapter implements Printer { private OldPrinter legacy; … }`.  
Step 3: inside `printDocument` convert `d` to String and call `legacy.print(…)`.  
*Why* each step: the interface isolates the client from the legacy class; delegation avoids code duplication.  
**Final answer**  
```java
Printer p = new OldPrinterAdapter(new OldPrinter());
p.printDocument(myDoc);
```
*Reflection:* the adapter is thin; any future change in `OldPrinter` only affects the adapter class.

**Example 2 — Bridge for rendering engines**  
*Given:* two abstractions `Shape` and two implementations `Renderer`.  
*Find:* code that lets any shape use any renderer.  
Create `interface Renderer { void renderCircle(float r); }`; `class VectorRenderer implements Renderer`.  
`abstract class Shape { protected Renderer renderer; }`; `class Circle extends Shape`.  
`Circle` delegates `draw()` to `renderer.renderCircle(radius)`.  
*Why:* changing `Renderer` does not require new subclasses of `Shape`.  
**Final answer**  
A `Circle` drawn with `VectorRenderer` or `RasterRenderer` uses the same `Circle` class.

**Example 3 — Composite for file system**  
*Given:* files and directories that must be listed recursively.  
*Find:* uniform code for both.  
`interface FileSystemComponent { void ls(); }`; `class File implements …`; `class Directory implements … { List<FileSystemComponent> children; }`.  
`Directory.ls()` calls `ls()` on every child.  
**Final answer**  
A single `root.ls()` call traverses the entire tree.

**Example 4 — Decorator for text formatting**  
*Given:* plain `TextView` that only draws raw text.  
*Find:* bold and italic versions without new subclasses for every combination.  
`class BoldDecorator implements TextView { private TextView inner; … }` adds `<b>` tags before delegating.  
**Final answer**  
`new ItalicDecorator(new BoldDecorator(new TextView()))` produces bold italic text.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Adapter copies logic instead of delegating | Programmer wants “quick fix”                | Always keep Adapter as a thin translation layer |
| Bridge degenerates into Adapter   | Abstraction and implementation are not varied independently | Check that both hierarchies can evolve separately |
| Composite treats leaves as composites | Missing null checks or type checks          | Make leaf operations throw or return empty collections |
| Too many Decorator layers         | Each new behaviour adds another wrapper     | Limit depth; consider strategy objects instead |
| Facade leaks internal classes     | Client imports subsystem types directly     | Make Facade the only public type in its package |
| Flyweight mutates shared state    | Extrinsic state stored inside flyweight     | Keep only immutable intrinsic data inside flyweight |
| Proxy hides expensive operation forever | No cache invalidation logic                 | Document ownership and lifetime of the real subject |

## 7. The textbook-precise statement
A structural design pattern is a named arrangement of classes and objects that satisfies a set of structural constraints while preserving substitutability. Formally, given a set of interfaces \(I_1, \dots, I_k\) and classes \(C_1, \dots, C_m\), a pattern defines a set of composition relations such that the resulting object graph satisfies the Liskov Substitution Principle for every interface in the pattern. (Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*, 1994, Chapter 4.)

## 8. Visual — diagram or schematic
```
Client
  |
  v
+----------+     delegates      +----------+
| Adapter  | -----------------> | Adaptee  |
+----------+                    +----------+
     ^
     | implements
+----------+
| Target   |
+----------+
```

## 9. The memory technique
1. **The hook** — imagine each pattern as a different kind of “middle-man” you meet in daily life: Adapter is a power-plug converter, Bridge is a remote control that works with any TV brand, Composite is a folder that can contain both files and other folders.
2. **What to overlearn** — the exact interface each pattern introduces and the single reference it holds to the object it wraps or delegates to.
3. **Spaced-repetition schedule** — review the seven pattern names and their one-line purpose on day 1, day 3, day 7, day 16 and day 35.
4. **First-principles fallback** — ask “what is the structural mismatch I am trying to hide?”; the answer directly names the pattern.

## 10. What this unlocks
Once you internalise these patterns you can read and write the architecture of almost every mainstream UI framework, game engine and cloud SDK.  
- Next you can study behavioural patterns that rely on the same composition techniques.  
- You will be able to refactor large inheritance hierarchies into cleaner bridge or decorator structures.  
- You gain the vocabulary used in system-design interviews at companies that build large-scale object-oriented systems.

## 11. Self-check — five questions, no answers
1. In one sentence, how does Adapter differ from Bridge?  
2. Draw the class diagram for a Composite that represents a menu containing both MenuItem leaves and SubMenu composites.  
3. A Decorator and a subclass both add behaviour; give two concrete reasons why the Decorator is preferable when behaviour must be added at runtime.  
4. Identify which structural pattern is being used when a class loads a 50 MB image only on the first call to `draw()`.  
5. Suppose two independent teams evolve the same abstraction and implementation; which pattern prevents their changes from forcing recompilation of each other’s code?