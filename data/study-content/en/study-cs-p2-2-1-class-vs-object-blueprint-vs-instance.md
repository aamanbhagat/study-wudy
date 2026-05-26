## 1. The one-sentence answer
**A class is a blueprint that defines the structure and behaviour of objects; an object is a concrete instance created from that blueprint at runtime.**

A class therefore never holds runtime data of its own; it only supplies the template of fields and methods. An object materialises when the runtime allocates memory according to the class layout and initialises its state. The distinction is not merely linguistic: the same class can produce thousands of objects, each with independent state yet identical possible behaviours.

This separation lets programmers write the definition once and then manufacture as many working copies as needed without rewriting code. The blueprint remains unchanged while the instances evolve.

> [!NOTE]
> The decisive insight is that a class describes *possibility*; an object embodies *actuality*. Confusing the two collapses the ability to create multiple independent entities from a single definition.

## 2. Why this matters — concrete and current
In the design of autonomous vehicle software at Waymo, engineers define a single `Vehicle` class that encodes kinematics, sensor interfaces and safety invariants. Each physical car on the road becomes a distinct `Vehicle` object whose current position, velocity and fault status differ, yet all obey the same behavioural contract.

Modern Java Virtual Machine implementations rely on the same separation when they load a `java.lang.String` class once and then allocate millions of distinct `String` objects for text processing inside large language-model tokenisers.

In semiconductor design tools from Synopsys, a `Transistor` class captures geometry rules and electrical models; each individual transistor on a chip layout is an object whose coordinates and doping parameters are set during place-and-route, allowing the same class to describe billions of devices without code duplication.

Game-engine physics at Unity Technologies uses a `Rigidbody` class to declare mass, velocity and collision callbacks; every rigid body in a scene is an object whose instantaneous transform is updated each frame while the class definition stays fixed.

## 3. Mental prerequisites
| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Variable         | Objects store state in named variables called fields.     |
| Function         | Classes bundle related functions (methods) that operate on that state. |
| Memory allocation| Creating an object requires the runtime to reserve memory according to the class layout. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A blueprint contains only descriptions
A class never stores concrete values that belong to any particular entity; it only records the names and types of data that every future instance will possess.  
Consider the declaration of a minimal class that will later represent a point on a plane.  
```java
class Point {
    int x;
    int y;
}
```
Formally the class is a type definition:
\[
\text{Point} \triangleq \{\text{x}:\texttt{int},\ \text{y}:\texttt{int},\ \text{methods}\ldots\}
\]
> [!WARNING]
> Treating the class itself as if it already possessed an `x` value leads to the misconception that all objects share one global coordinate.

### Step 2 — Instantiation allocates and initialises state
An object appears only when the `new` operator (or equivalent) requests memory whose layout matches the class and then runs any initialisation code.  
```java
Point p = new Point();
p.x = 3;
p.y = 4;
```
The runtime action is:
\[
\text{alloc}(\text{Point}) \rightarrow o \quad\text{where } o.x,o.y\text{ are now addressable cells.}
\]
> [!WARNING]
> Omitting the allocation step leaves a null reference; subsequent field access produces a runtime error rather than a compile-time one.

### Step 3 — Multiple objects share the blueprint yet differ in state
Because the class is only a template, any number of objects may be created from it, each receiving its own memory region.  
```java
Point a = new Point(); a.x = 1;
Point b = new Point(); b.x = 5;
```
The two objects satisfy:
\[
a \neq b \quad\text{yet}\quad \text{type}(a)=\text{type}(b)=\text{Point}.
\]
> [!WARNING]
> Assuming that changing a field in one object automatically changes the same field in another object violates the independence guaranteed by separate allocations.

### Step 4 — Methods belong to the class, data belongs to the object
Method code is stored once with the class; each object supplies its own data when the method executes.  
```java
class Point {
    int x, y;
    double distance() { return Math.sqrt(x*x + y*y); }
}
```
Invocation `a.distance()` binds the receiver `a` to the implicit parameter `this` inside the single copy of the method body.  
> [!WARNING]
> Duplicating method bodies inside every object wastes memory and breaks the guarantee that behaviour updates apply uniformly to all instances.

### Step 5 — The textbook statement
A class \(C\) is a compile-time artefact that defines a set of fields \(F_C\) and methods \(M_C\). An object of class \(C\) is a runtime value \(o\) whose memory layout realises exactly the fields \(F_C\) and whose method table points to \(M_C\). (See: Gamma et al., *Design Patterns*, Addison-Wesley, 1995, pp. 11–12.)

## 5. Worked examples — every step shown

**Example 1 — Minimal class and single object**  
*Given:* The class `Counter` with one field.  
*Find:* Create one object and increment its count.  
```java
class Counter { int count = 0; }
Counter c = new Counter();   // allocation
c.count = c.count + 1;       // mutation
```
*Why* the first line merely declares a type.  
*Why* the second line requests memory and initialises the field.  
*Why* the third line reads then writes only the memory belonging to `c`.  
**Final answer**  
`c.count == 1` after execution.

*Reflection* The example isolates allocation from mutation; the same pattern scales to any class.

**Example 2 — Two independent counters**  
*Given:* Same `Counter` class.  
*Find:* Show that two objects maintain separate state.  
```java
Counter c1 = new Counter();
Counter c2 = new Counter();
c1.count = 10;
System.out.println(c2.count); // prints 0
```
*Why* each `new` produces a fresh memory block.  
*Why* assignment to `c1.count` cannot affect `c2.count`.  
**Final answer**  
`c2.count` remains 0.

*Reflection* Demonstrates that identity, not the class, determines which data is read.

**Example 3 — Shared method, distinct receivers**  
*Given:* `Counter` augmented with a method.  
*Find:* Invoke the method on two objects.  
```java
class Counter {
    int count = 0;
    void inc() { count++; }
}
Counter a = new Counter();
Counter b = new Counter();
a.inc();
b.inc();
b.inc();
```
*Why* the single `inc` method body executes twice with different implicit `this` values.  
**Final answer**  
`a.count == 1`, `b.count == 2`.

*Reflection* Shows code reuse without data sharing.

**Example 4 — Class-level constant versus instance field**  
*Given:* A class containing both a `static` constant and an instance field.  
*Find:* Observe that the constant is identical across objects while fields differ.  
```java
class Circle {
    static final double PI = 3.14159;
    double radius;
}
Circle c1 = new Circle(); c1.radius = 2;
Circle c2 = new Circle(); c2.radius = 5;
```
*Why* `PI` is stored once with the class.  
*Why* each `radius` lives inside its own object.  
**Final answer**  
`c1.PI == c2.PI` yet `c1.radius != c2.radius`.

*Reflection* Distinguishes class-level versus instance-level storage.

## 6. Common traps and how to avoid them
| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Declaring fields inside main      | Treating local variables as class state     | Always place data declarations inside the class body |
| Using `new` on a primitive        | Confusing classes with built-in types       | Remember only reference types require `new`  |
| Static fields mistaken for shared object state | Static storage lives with the class, not instances | Use instance fields when each object needs its own value |
| Forgetting to initialise fields   | Assuming default values are always safe     | Provide constructors or explicit initialisers |
| Calling a method on a null reference | Variable declared but never assigned an object | Initialise before first use or add null checks |
| Overwriting the class definition at runtime | Dynamic languages allow monkey-patching     | Treat class source as immutable contract     |
| Expecting one object to affect another via assignment | Reference copy versus deep copy confusion   | Distinguish `a = b` (alias) from cloning     |

## 7. The textbook-precise statement
A class \(C\) is a syntactic construct that introduces a new type together with a set of named fields \(F_C\) and a set of methods \(M_C\). An object of type \(C\) is a first-class runtime entity whose storage layout is exactly the cartesian product of the fields in \(F_C\) and whose dynamic method dispatch table resolves every identifier in \(M_C\). (See: Abelson & Sussman, *Structure and Interpretation of Computer Programs*, 2e, §3.1.)

## 8. Visual — diagram or schematic
```text
          Class (blueprint)                Objects (instances)
   +---------------------------+     +-------------+   +-------------+
   | class Point {             |     | Point@0xA1  |   | Point@0xB7  |
   |   int x;                  |     | x = 3       |   | x = 10      |
   |   int y;                  |     | y = 4       |   | y = 20      |
   |   double distance() {...} |     +-------------+   +-------------+
   | }                         |
   +---------------------------+
```
The single rectangle on the left exists at compile time; each rounded box on the right is allocated separately at runtime and holds its own `x` and `y` values.

## 9. The memory technique
1. **The hook** — Picture a cookie-cutter (class) and the actual cookies (objects) it stamps out; the cutter never changes, each cookie can be eaten independently.  
2. **What to overlearn** — “Class = definition only; object = allocated memory + state.”  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “If I need five different points, do I copy the field declarations five times or once?”

## 10. What this unlocks
Mastery of the class–object distinction is the prerequisite for inheritance, polymorphism, encapsulation and design patterns.  
- Next: constructors and object initialisation order  
- Next: reference semantics versus value semantics  
- Next: static versus instance members  
- Next: interfaces as pure behavioural blueprints

## 11. Self-check — five questions, no answers
1. Write the shortest class that can produce two objects whose integer fields differ after construction.  
2. In a language without an explicit `new` keyword, how can you still distinguish the moment an object is allocated from the moment its class is defined?  
3. Predict the output when two variables are assigned the same object reference and then one field is mutated through the first variable.  
4. Identify the compile-time versus runtime error in the fragment `Point p; p.x = 5;` and explain why each occurs.  
5. Given a class containing only static members, can any object of that class ever hold distinct state? Justify your answer.