## 1. The one-sentence answer
**`super()` returns a proxy object that delegates method calls to the next class in the method resolution order (MRO).**

In single inheritance this proxy reaches the immediate parent; the mechanism therefore lets a subclass invoke an overridden method without naming the parent class explicitly. The delegation is dynamic: it follows the linearised inheritance chain computed at class creation time rather than a static parent pointer. Consequently the same line of code continues to work when the inheritance hierarchy is later extended or when multiple inheritance is introduced.

The intuition is simple. A child class that redefines a method still needs the original behaviour in many cases; instead of copying the parent implementation or hard-coding the parent name, the child asks the language runtime for “the next version of this method” and the runtime supplies it according to the established order of classes.

> [!NOTE]
> The decisive insight is that `super()` does not name a class; it names a position in a pre-computed linear order, which is why the identical call works unchanged under multiple inheritance.

## 2. Why this matters — concrete and current
In the PyTorch neural-network library every custom `Module` subclass calls `super().__init__()` so that the framework’s parameter-registration logic executes before the user’s own initialisation; omitting it silently breaks automatic differentiation and optimiser registration for thousands of research models each year.

Game-engine developers at Unity and Unreal rely on the same pattern when a `Character` subclass overrides `Tick` yet must still invoke the parent’s physics update; the delegation keeps frame-rate-critical code paths intact while allowing specialised behaviour.

Semiconductor design tools written in Python (for example, parts of Intel’s internal verification stack) use cooperative multiple inheritance for mixin classes that each contribute a slice of initialisation; `super()` guarantees every mixin’s setup runs exactly once regardless of declaration order.

NASA’s Jet Propulsion Laboratory employs the identical idiom inside the F’ (F Prime) flight-software framework so that component base classes can enforce telemetry contracts while derived payload controllers add domain logic without breaking the contract chain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Class definition & instantiation | `super()` is only meaningful inside a method of a class   |
| Method overriding        | The reason a call to the parent version is required       |
| Inheritance hierarchy    | Supplies the chain that `super()` traverses               |
| Method resolution order (MRO) | Determines exactly which method is reached by the proxy  |

## 4. Building the idea — from intuition to formalism

### Step 1 — A subclass may replace a parent method
A child class is free to supply its own implementation of any inherited method.  
```python
class Parent:
    def greet(self):
        return "hello from Parent"
class Child(Parent):
    def greet(self):
        return "hello from Child"
```
The formal statement is simply that the attribute lookup `Child().greet` yields the function defined in `Child`, shadowing the one in `Parent`.

> [!WARNING]
> If the overriding method never invokes the parent version, the original behaviour is lost forever for instances of the child.

### Step 2 — Explicit parent calls couple the child to a concrete name
One obvious remedy is to write `Parent.greet(self)` inside the child. This works for single inheritance yet hard-codes the parent class name, violating the open-closed principle when the hierarchy changes.

### Step 3 — The language can compute the “next” class automatically
Python records a linear order of classes—the MRO—when each class is created. The built-in `super()` returns a proxy whose attribute lookup begins immediately after the class that issued the call inside that MRO.

### Step 4 — The proxy is bound to the original instance
`super()` therefore behaves like an implicit `self` that starts searching one class later. The call `super().greet()` is equivalent to `NextClass.greet(self)` where `NextClass` is taken from the MRO slice after the current class.

### Step 5 — The same syntax works under multiple inheritance
Because the MRO already linearises every ancestor, a cooperative chain of `super()` calls visits every class exactly once without the programmer naming any of them.

### Step 6 — Textbook statement
Let `C` be a class, `m` a method defined in `C`, and `M` the MRO of `C`. Inside `m`, the expression `super()` yields a `super` object `S` such that attribute lookup on `S` begins at the class immediately following `C` in `M`. (See Python Language Reference, §3.3.3.3 and CPython source `Objects/typeobject.c:slot_tp_init`.)

## 5. Worked examples — every step shown

**Example 1 — Single inheritance, explicit greeting**  
*Given:* the two-class hierarchy above.  
*Find:* output of `Child().greet()` after inserting `super()`.  
Step 1: `class Child(Parent):` records MRO `[Child, Parent, object]`.  
*Why*: Python builds the linear order at class-creation time.  
Step 2: Inside `Child.greet` write `return super().greet() + " (via super)"`.  
*Why*: `super()` returns a proxy whose `greet` attribute resolves to `Parent.greet`.  
Step 3: Execution binds the proxy to the original instance.  
**`hello from Parent (via super)`**

*Reflection*: The call succeeded without mentioning `Parent`, illustrating name decoupling.

**Example 2 — Adding initialisation**  
*Given:* `Parent.__init__` sets `self.x = 1`.  
*Find:* correct child initialisation that also sets `self.y = 2`.  
Step 1: `def __init__(self): super().__init__(); self.y = 2`.  
*Why*: Parent initialisation must run first.  
Step 2: Instance now contains both attributes.  
**`c = Child(); assert c.x == 1 and c.y == 2`**

*Reflection*: Forgetting the `super()` line leaves `x` undefined—an extremely common initialisation bug.

**Example 3 — Two-level chain**  
*Given:* `GrandChild(Child)` that also overrides `greet`.  
*Find:* result of `GrandChild().greet()` when every level uses `super()`.  
Step 1: MRO = `[GrandChild, Child, Parent, object]`.  
Step 2: Each `super()` call advances one position.  
**`hello from Parent (via super) (via super)`**

*Reflection*: The same source line produces a three-class cooperation without any class name appearing.

**Example 4 — Diamond multiple inheritance**  
*Given:* `class A: def greet(self): return "A"`; `B(A)`, `C(A)`; `D(B,C)` all call `super()`.  
*Find:* `D().greet()` result.  
Step 1: MRO = `[D, B, C, A, object]`.  
Step 2: `super()` in `D` reaches `B`, `B`’s `super()` reaches `C`, `C`’s `super()` reaches `A`.  
**`A`**

*Reflection*: Linearisation guarantees each class appears once; explicit parent names would have produced duplicate or missed calls.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Omitting `super().__init__`         | Developer assumes child body replaces parent body   | Always write the call as the first statement         |
| Using `Parent.__init__(self)` in MI | Hard-coded name ignores MRO                         | Use `super()` everywhere                             |
| Calling `super()` outside a method  | Proxy needs an instance and class context           | Only invoke inside instance or class methods         |
| Expecting Python 2 `super(Child,self)` syntax | Old form required explicit arguments         | Use zero-argument form in Python 3                   |
| Shadowing `super` as a variable     | Accidental local name hides builtin                 | Never assign to the identifier `super`               |
| Assuming order of mixin initialisation | MRO depends on declaration order              | Print `Class.__mro__` during debugging               |
| Using `super` with static methods   | Static methods have no implicit instance            | Convert to class method or pass the class explicitly |

## 7. The textbook-precise statement
Let \(C\) be a class whose body contains a function definition \(f\). At runtime the name `super` inside \(f\) evaluates to an instance of `super` whose `__get__` descriptor returns the result of `object.__getattribute__(next_class, name)` where `next_class` is the successor of \(C\) in \(C.__mro__\). (Python Language Reference, version 3.12, §3.3.3.3; also documented in Ramalho, *Fluent Python*, 2e, Chapter 12.)

## 8. Visual — diagram or schematic
```text
MRO for D(B, C) where B(A), C(A):
D
│
B ─── C
│     │
└── A ──┘
   │
 object

super() call chain inside greet:
D.greet ─super()→ B.greet ─super()→ C.greet ─super()→ A.greet
```
Each arrow represents one proxy lookup; the chain follows the MRO exactly once.

## 9. The memory technique
**The hook** — picture a relay race baton labelled “super”; each runner (class) must pass it forward without knowing the final recipient.

**What to overlearn** — zero-argument `super()` inside an instance method always advances one step in the MRO; the MRO of any class `X` is obtained by `X.__mro__`.

**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — rebuild the MRO by C3 linearisation, then locate the current class and pick its immediate successor.

## 10. What this unlocks
Mastery of `super()` is the prerequisite for safe cooperative multiple inheritance, mixin composition, and correct initialisation of complex frameworks.  

- Next: Python’s C3 linearisation algorithm  
- Method resolution order edge cases ( `__mro_entries__` )  
- Abstract base classes and registration patterns  
- Metaclass `__init__` versus `__new__` interplay  

## 11. Self-check — five questions, no answers
1. In a three-class chain `A → B → C`, what single change turns an infinite recursion into a correct cooperative call?  
2. Write the MRO for `class X(A, B)` when both `A` and `B` inherit from `Base`.  
3. Predict the printed order of `__init__` messages when four mixins each call `super().__init__()`.  
4. Identify the bug: a subclass stores an attribute in `__init__` before calling `super().__init__()`.  
5. Demonstrate that replacing every `super()` with an explicit parent name breaks a diamond hierarchy; show the resulting duplicate or missing call.