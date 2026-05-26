## 1. The one-sentence answer
**Structural design patterns compose classes and objects into larger, flexible structures while preserving existing interfaces and implementations.**

These patterns solve the recurring problem of making independent components work together or scale without rewriting core logic. Adapter converts one interface into another so unrelated classes collaborate. Bridge decouples an abstraction from its implementation so both can evolve separately. Composite treats individual objects and groups uniformly through a shared interface. Decorator adds responsibilities dynamically without subclass explosion. Facade supplies a simplified entry point to a complex subsystem. Flyweight shares fine-grained objects to conserve memory under high duplication. Proxy controls access to an object through an intermediary.

The decisive insight is that each pattern achieves its goal by inserting an intermediate type that redirects, wraps, or shares references rather than modifying the participants themselves.

> [!NOTE]
> The single mental model uniting all seven patterns is indirection: every pattern introduces a new object whose sole job is to stand between clients and the original types, thereby changing structure without changing identity.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses the Proxy pattern to mediate every hardware register access through a hardware-abstraction layer; this allowed the same flight code to run unchanged on both the engineering model and the actual spacecraft.

Google’s TensorFlow graph executor employs the Flyweight pattern to share immutable tensor metadata across thousands of concurrent operations, reducing peak memory by more than 40 % on large language-model training runs reported in their 2021 MLSys paper.

Microsoft’s WinUI framework applies the Adapter pattern to map legacy Win32 controls onto the modern XAML object model, enabling gradual migration of million-line desktop applications without breaking binary compatibility.

Amazon Web Services’ SDK for Java uses the Facade pattern to hide the orchestration of S3 multipart uploads, retry policies, and signing logic behind a single high-level `AmazonS3Client.putObject` call, which is invoked billions of times daily.

The Composite pattern appears in the DOM implementation inside every major browser engine; treating a single `<div>` and an entire subtree identically lets layout algorithms remain oblivious to nesting depth.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Interface vs. implementation separation | All seven patterns rely on clients depending only on abstract types. |
| Object composition over inheritance | The patterns achieve flexibility precisely by composing objects at runtime rather than fixing hierarchies at compile time. |
| Reference semantics and sharing | Flyweight and Proxy depend on understanding when multiple clients hold references to the same underlying instance. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify incompatible or rigid boundaries
Two classes cannot collaborate because their method signatures differ, or a single abstraction must support multiple independent implementations.  
Example: a `LegacyRectangle` exposes `draw(x1,y1,x2,y2)` while a graphics client expects `render(Point topLeft, Point bottomRight)`.  
Formally, let \(C\) be a client type and \(T\) a target type; an incompatibility exists when no subtype relation or conversion function maps \(T\)’s expected operations onto \(C\)’s provided operations.  
> [!WARNING]
> Treating the incompatibility as a mere naming issue instead of an interface mismatch leads to scattered type casts that defeat static checking.

### Step 2 — Introduce an intermediate object that redirects calls
Create a new class whose interface matches what the client expects and whose implementation forwards to the existing component.  
Example: `RectangleAdapter` implements the client’s `Shape` interface and holds a `LegacyRectangle`; its `render` method translates coordinates and delegates.  
The redirection is expressed as a delegation equation: \(\text{Adapter}.f(x) = \text{Adaptee}.g(\text{translate}(x))\).

### Step 3 — Separate the abstraction from its implementation hierarchy
When both the “what” and the “how” must vary independently, factor the implementation into its own hierarchy and connect the two hierarchies through a reference.  
Example: `Window` abstraction holds a `WindowImpl` pointer; `Window` subclasses add decorations while `WindowImpl` subclasses supply platform-specific drawing.  
Formally, the Bridge relation is a Cartesian product of two independent type families linked by a single reference field.

### Step 4 — Allow uniform treatment of individuals and aggregates
Define a common interface for both leaf objects and containers; containers forward operations to children recursively.  
Example: `Graphic` interface declares `draw`; both `Line` and `Picture` (which holds a list of `Graphic`s) implement it identically from the client’s viewpoint.  
The recursive contract is expressed by the equation \(\text{Composite}.op() = \forall c \in \text{children}: c.op()\).

### Step 5 — Attach additional behavior without altering the original class
Wrap an object inside another that implements the same interface and performs extra work before or after delegation.  
Example: `BorderDecorator` wraps any `VisualComponent`, draws a border, then calls the wrapped component’s `draw`.  
The added responsibility is expressed by the equation \(\text{Decorator}.op() = \text{extra}(); \text{Component}.op()\).

### Step 6 — Provide a single simplified entry point to a complex subsystem
Introduce a high-level class that orchestrates several lower-level classes while hiding their existence.  
Example: `CompilerFacade` exposes only `compile(String source)` while internally coordinating `Scanner`, `Parser`, `Optimizer`, and `CodeGen`.

### Step 7 — Share immutable state across many fine-grained objects
Extract intrinsic (shared) state into a flyweight object and pass extrinsic (context-dependent) state at call time.  
Example: a font glyph’s shape is stored once; position and color are supplied per use.  
The memory equation is \(M = |F| \cdot s + n \cdot e\) where \(F\) is the set of flyweights, \(s\) their size, \(n\) the number of logical objects, and \(e\) the extrinsic data size.

### Step 8 — Control access through a surrogate
Insert a proxy that implements the same interface as the real subject and decides when, how, or whether to forward each request.  
The textbook statement of the entire family is therefore: a structural pattern is any technique that achieves a desired object graph topology by introducing typed intermediaries whose interfaces are compatible with the participants they connect.

## 5. Worked examples — every step shown

**Example 1 — Adapter for legacy payment gateway**  
*Given:* `ModernPayment` interface with `pay(amount, token)`; `OldGateway` with `charge(float, String)`.  
*Find:* working integration.  
Create `PaymentAdapter implements ModernPayment`.  
Inside `pay`: convert token to legacy string, call `charge(amount, legacyToken)`.  
*Why* each line preserves the client contract while reusing the old implementation.  
**Final answer:** `PaymentAdapter` satisfies `ModernPayment` without modifying either original class.  
*Reflection:* The translation logic lives in one place; any future change to the legacy signature touches only the adapter.

**Example 2 — Bridge for rendering engines**  
*Given:* abstraction `Shape` and two implementations `RasterImpl`, `VectorImpl`.  
*Find:* independent extension of both.  
`Shape` holds `Renderer` reference. `Circle` delegates drawing to the renderer.  
New `SVGRenderer` can be plugged in without touching `Circle`.  
**Final answer:** two orthogonal hierarchies connected by a single reference field.  
*Reflection:* Adding a new shape or a new renderer never forces recompilation of the other family.

**Example 3 — Composite file system**  
*Given:* `File` and `Directory` must be listed uniformly.  
Both implement `Node` with `list()`. `Directory` stores a list of `Node`s and recurses.  
**Final answer:** client code calls `root.list()` without knowing which nodes are leaves.  
*Reflection:* The recursion is invisible to clients; depth is an implementation detail.

**Example 4 — Decorator for I/O streams**  
*Given:* basic `InputStream`.  
Wrap successively with `BufferedInputStream`, then `GZIPInputStream`.  
Each wrapper adds one responsibility while preserving the `read` contract.  
**Final answer:** arbitrary stacking of behaviors at runtime.  
*Reflection:* No combinatorial explosion of subclasses occurs.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using inheritance where composition is required | Familiarity with “is-a” thinking | Ask whether the new behavior must be changeable at runtime; if yes, wrap instead of subclass. |
| Over-wrapping with too many decorators | Each decorator feels small and harmless | Keep a visible ownership graph; limit depth to what the domain actually needs. |
| Sharing mutable flyweights | Forgetting that extrinsic state must remain external | Mark intrinsic state `final` or immutable by construction. |
| Proxy that leaks the real subject type | Returning the concrete class from a factory | Return only the proxy interface from every public API. |
| Facade that becomes a god class | Gradually adding more subsystem features to the single entry point | Enforce a narrow public contract; push new operations into subsystem classes. |
| Bridge with too many cross references | Treating every combination as a separate bridge | Keep the bridge pointer one-to-one; use abstract factories for creation. |
| Adapter that duplicates domain logic | Placing conversion code in multiple adapters | Centralize conversion in a single utility or value type. |

## 7. The textbook-precise statement
A structural design pattern is a named configuration of classes and objects that achieves a particular topology (adapter, bridge, composite, decorator, facade, flyweight, or proxy) while satisfying the open-closed principle. The canonical reference is Gamma, Helm, Johnson, Vlissides, *Design Patterns: Elements of Reusable Object-Oriented Software*, Addison-Wesley, 1994, Chapter 4.

## 8. Visual — diagram or schematic
```text
Client
  |
  v
Adapter/Proxy/Decorator  -->  RealSubject / Component
             ^                        |
             |                        v
          Bridge                 Flyweight (shared)
             ^                        |
             |                        v
        Abstraction               Intrinsic State
             |
             v
        Implementor
```
The diagram shows a client interacting with an intermediary (top row) that either redirects, wraps, or shares access to the underlying participants (bottom row). Arrows represent reference or delegation links.

## 9. The memory technique
**The hook** — Picture seven different kinds of “middlemen” standing between you and a library: a translator (Adapter), a drawbridge (Bridge), a folder of papers (Composite), gift wrapping (Decorator), a hotel concierge (Facade), a rubber stamp (Flyweight), and a bodyguard (Proxy).

**What to overlearn** — Every structural pattern introduces exactly one new type whose interface is identical to the type it stands in front of; the new type’s sole responsibility is redirection, wrapping, or sharing.

**Spaced-repetition schedule** — Review the seven pattern names and one-line intents at 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — If the names vanish, reconstruct each pattern by asking: “What single extra object would let me change structure without touching existing classes?” The answer names the pattern.

## 10. What this unlocks
Mastery of these patterns lets you apply the open-closed principle at the level of object graphs and prepares you for behavioral patterns that rely on the same intermediaries.

- Next: behavioral patterns (Strategy, Observer, Command) that often compose with structural intermediaries.
- SOLID open-closed principle becomes mechanically realizable.
- Dependency-injection containers become trivial once you can recognize the proxies and adapters they generate.

## 11. Self-check — five questions, no answers
1. A client must use a third-party JSON parser whose API returns raw strings; which structural pattern lets you expose a typed `parseToModel` method without altering the parser or the client?

2. You need to support both a console renderer and a web-canvas renderer for the same set of geometric figures, and you anticipate adding new figures later. Which pattern separates these two variation axes?

3. A menu can contain menu items or entire submenus. Which pattern lets a single `draw` call traverse the entire hierarchy uniformly?

4. You must add logging, encryption, and compression to an existing stream class at runtime in any combination. Which pattern avoids creating a subclass for every combination?

5. An application creates millions of identical tree-leaf objects that differ only in their world coordinates. Which pattern reduces memory while preserving identical behavior?