## 1. The one-sentence answer
**Composition models a "has-a" relationship by letting one class contain references to objects of other classes, whereas inheritance models an "is-a" relationship by letting a subclass acquire the structure and behaviour of a superclass.**

Iska matlab yeh hai ki jab aap ek class ko doosri class ke andar rakh dete ho, toh pehli class ko doosri ki zaroorat padti hai bina uske behaviour ko inherit kiye. Inheritance mein ek class dusri class ka extension hoti hai, jaise Dog Animal ka special case hai. Composition mein aap naye behaviour ko build karte ho by combining existing objects, jo code ko flexible aur loosely coupled rakhta hai.

Dono approaches code reuse provide karte hain lekin unke implications alag hain. Inheritance compile-time binding create karta hai aur hierarchy tight karta hai, jabki composition runtime mein objects ko swap karne ki flexibility deti hai.

> [!NOTE]
> The core "aha" moment yeh hai ki "is-a" sirf tab sahi hai jab subclass sach mein superclass ka perfect specialisation ho; warna "has-a" (composition) hamesha safer aur extensible hota hai kyunki yeh future changes ko tolerate karta hai.

## 2. Why this matters — concrete and current
Google’s Android framework heavily uses composition inside Activity and Fragment classes; instead of inheriting from dozens of UI components, they compose them via ViewGroup and lifecycle delegates, allowing Google to evolve the framework without breaking millions of apps.

In aerospace, NASA’s flight software for the Perseverance rover models hardware subsystems (thrusters, cameras, power units) as composable objects rather than deep inheritance trees; this lets engineers hot-swap simulation mocks during testing without touching the core navigation logic.

Modern ML infrastructure at OpenAI and Meta uses composition inside training pipelines: a Trainer object holds references to Optimizer, Scheduler, and DataLoader instances instead of inheriting from each, enabling researchers to recombine components for new experiments in hours rather than days.

Semiconductor design tools from Synopsys and Cadence represent chip modules through composition; a Processor core “has-a” Cache, ALU, and BusInterface objects, making it possible to generate variants for different process nodes without rewriting inheritance hierarchies.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class and object     | Composition and inheritance both operate on classes that become runtime objects. |
| Reference vs value   | Composition stores references to other objects; understanding this prevents accidental deep copies. |
| Method overriding    | Needed to see why inheritance can break encapsulation when subclasses override superclass methods unexpectedly. |
| Access modifiers     | Knowing public/protected/private helps judge when inheritance leaks internal details. |

Agar aap inme se koi bhi weak feel kar rahe ho, toh pehle OOP Fundamentals ke “Class & Object” aur “Encapsulation” sections padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday language distinction
Aap sochiye ek Car class ke baare mein. Car ke paas engine hota hai, lekin Car engine nahi hoti. Iska seedha matlab hai “has-a” relationship.

Example: `class Car { private Engine engine; }` — yahan Car Engine ko contain karti hai.

Formal statement:  
A class C has a component of type E when C declares a field whose declared type is E (or a supertype of E).

> [!WARNING]
> Agar aap is step mein “Car is an Engine” bolne lagte ho, toh hierarchy galat ban jaayegi aur Car ko Engine ke saare methods inherit karne padenge jo semantically meaningless hain.

### Step 2 — Inheritance direction check
Jab aap “is-a” test apply karte ho, subclass ko superclass ki jagah use karna chahiye bina kisi behaviour change ke (Liskov substitution).

Example: `class Dog extends Animal` — har Dog ek Animal hai, isliye substitution valid hai.

Formal statement:  
If S is a subclass of T, then for every object s of type S there must exist a corresponding object t of type T such that s and t are indistinguishable in all observable behaviour of T.

### Step 3 — Delegation instead of inheritance
Composition mein behaviour reuse ke liye aap contained object ko delegate karte ho.

Example: Car class apna start() method Engine ke start() par delegate karti hai.

Formal statement:  
Delegation occurs when an object forwards a message to a contained collaborator: `this.engine.start()`.

### Step 4 — Runtime flexibility
Composition allow karta hai ki aap contained object ko runtime par replace kar sako.

Example: Car mein ElectricEngine ya PetrolEngine dono daal sakte ho bina Car class badle.

Formal statement:  
If C holds a reference of interface type E, then any concrete implementation of E may be supplied at construction or via setter, changing behaviour without recompiling C.

### Step 5 — Coupling and fragility
Inheritance superclass ke internal details ko subclass ke liye visible bana deta hai, jo fragile base class problem create karta hai.

Example: Agar Animal mein protected weight field change ho jaaye, toh saare subclasses toot sakte hain.

Formal statement:  
Inheritance creates a static, compile-time dependency on the concrete superclass implementation; any non-private change in the superclass can break subclasses.

### Step 6 — Textbook-grade rule
Prefer composition over inheritance when the relationship is not a pure behavioural specialisation; use inheritance only when the Liskov substitution principle holds and the hierarchy is stable.

## 5. Worked examples — har step show karo

**Example 1 — Simple has-a**
*Given:* Car needs an engine but is not an engine.  
*Find:* Model via composition.  
```java
class Engine { void start() { System.out.println("Engine started"); } }
class Car {
    private Engine engine = new Engine();   // composition
    void start() { engine.start(); }        // delegation
}
```
*Why:* Field declaration creates the “has-a” link; delegation reuses behaviour without inheritance.  
**Final answer**  
`Car` contains an `Engine`; no “is-a” relationship exists.

**Example 2 — is-a check**
*Given:* Should `Dog` inherit from `Animal`?  
*Find:* Apply substitution test.  
Dog can be used wherever Animal is expected (eat(), sleep()).  
*Why:* Every behaviour of Animal is meaningful for Dog.  
**Final answer**  
Inheritance is valid here.

**Example 3 — Wrong inheritance**
*Given:* `Penguin extends Bird` where Bird has fly().  
*Find:* Why it breaks.  
Penguin cannot fly, so overriding fly() to throw exception violates substitution.  
*Why:* “is-a” test fails at runtime.  
**Final answer**  
Use composition: Penguin has-a FlyingBehaviour that can be a NoFly implementation.

**Example 4 — Runtime swap**
*Given:* Car must support different engines.  
*Find:* Code that allows swap.  
```java
interface Engine { void start(); }
class Car { private Engine e; Car(Engine e) { this.e = e; } }
```
*Why:* Constructor injection lets caller decide concrete engine at runtime.  
**Final answer**  
Composition yields open/closed design.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using inheritance for code reuse only | Students see “extends” as free method copy | Ask “is this a true specialisation?” before extending |
| Deep inheritance hierarchies      | Each level adds one more “is-a” claim       | Limit depth to 2; prefer composition layers  |
| Forgetting to delegate            | Developer copies code instead of calling contained object | Always write `this.collaborator.method()`    |
| Protected field leakage           | Subclass directly accesses superclass state | Keep fields private; provide protected methods only when truly needed |
| Static type coupling              | Subclass compiled against concrete superclass | Depend on interfaces, inject via composition |
| Violating LSP with empty overrides| Subclass overrides to disable behaviour     | Throw UnsupportedOperationException only as last resort; redesign with composition |

## 7. The textbook-precise statement
When a class C declares an instance variable whose type is another class E (or interface E), C is said to be composed of E; this realises the “has-a” relationship. Inheritance, by contrast, occurs when a class S is declared as a direct or indirect extension of class T; every instance of S is then also an instance of T, realising the “is-a” relationship, provided the Liskov substitution principle holds for all observable behaviour of T. (Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*, 1994, pp. 19–20; Martin, *Agile Software Development: Principles, Patterns, and Practices*, 2002, Chapter 8.)

## 8. Visual — diagram or schematic
```text
Composition (has-a)                  Inheritance (is-a)
+----------------+                   +----------------+
|     Car        |                   |     Animal     |
|  - engine:Engine|                   |  + eat()       |
|  + start()      |                   |  + sleep()     |
|    delegates to|                   +-------^--------+
+----------------+                           |
         |                                   | extends
         v                           +----------------+
   +-----------+                     |     Dog        |
   |  Engine   |                     |  + bark()      |
   +-----------+                     +----------------+
```

## 9. The memory technique
1. **The hook** — Picture a Lego car: the body “has-a” wheels you can swap; the body is never “a wheel”.
2. **What to overlearn** — “Has-a = field of other type”, “Is-a = extends + LSP holds”.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Ask: “Can I replace the contained object at runtime without touching the container class?” If yes, composition; if the answer is “this object must always be exactly this type forever”, consider inheritance.

## 10. What this unlocks
Mastering composition versus inheritance lets aap cleanly implement design patterns such as Strategy, Decorator, and Adapter, all of which rely on runtime delegation instead of static hierarchies.

- Next topics: Interface segregation, dependency injection, and the Strategy pattern.
- Techniques unlocked: writing testable code with mock collaborators, building plugin architectures, and avoiding fragile base classes.

## 11. Self-check — five questions, no answers
1. A `Square` class inherits from `Rectangle` and overrides `setWidth` and `setHeight`. Does this satisfy Liskov substitution? Why or why not?
2. Rewrite the `Square`/`Rectangle` example using composition instead of inheritance. Show the minimal class skeleton.
3. In a game engine, should `Player` inherit from `Sprite` or contain a `Sprite` reference? Give one concrete reason.
4. Identify the fragile base class problem in the following hierarchy: `class Loan { protected double interestRate; }` followed by three subclasses that directly read and modify `interestRate`.
5. A class `Report` needs to output either PDF or HTML. Which relationship (has-a or is-a) should `Report` use with its formatter, and why?