## 1. The one-sentence answer
**Single inheritance lets one class acquire all attributes and methods of exactly one parent class, while Method Resolution Order (MRO) defines the precise linear sequence in which Python searches for a method or attribute starting from the child and walking up the inheritance chain.**

Single inheritance models an “is-a” relationship where a derived class extends a single base class. The child automatically receives every public and protected member of the parent unless it overrides them. Because only one parent exists, the lookup path is obvious at first glance: child first, then the single parent, then object.

MRO becomes visible the moment you call a method that is not defined locally. Python records the exact order of classes it will consult and stores it in the special attribute `__mro__`. Even in single inheritance this order is computed by the C3 linearization algorithm so that the same rule works uniformly when the language later allows multiple parents.

> [!NOTE]
> The real insight is that MRO is not “search the parent”; it is “search the pre-computed linear list that the language guarantees will respect inheritance order and local precedence.”

## 2. Why this matters — concrete and current
Django’s ORM uses single inheritance so that every model you write inherits from `django.db.models.Model`; the framework walks the MRO once at class-creation time to collect fields and managers.

PyTorch’s `nn.Module` is the root of almost every neural-network layer. When you subclass it, the MRO guarantees that `forward` is found exactly where you expect, even if intermediate mixin classes are later inserted.

In semiconductor design, the open-source Python framework PyEDA models gate libraries through single-inheritance hierarchies; the MRO determines which timing model is chosen when a derived gate overrides only some parameters.

NASA’s Europa Clipper ground-support tools define instrument-specific telemetry parsers that inherit from a single `PacketParser` base; the MRO ensures that the correct `parse` implementation is selected without ambiguity during high-speed downlink processing.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class & instance     | You must know how `self` and attribute lookup work        |
| Method definition    | You must recognise when a method is overridden            |
| `object` base class  | Python’s ultimate root that appears at the end of every MRO |
| `super()`            | Later steps rely on cooperative delegation via `super`    |

If any row above is unclear, pause and review the corresponding Phase-1 notes before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — A child class silently receives its parent’s members
A class declared with a single parent automatically sees every attribute defined in that parent.  
Example:  
```python
class Animal:
    def speak(self):
        return "sound"
class Dog(Animal):
    pass
d = Dog()
print(d.speak())   # "sound"
```
Formal statement: if \(D\) inherits from \(B\), then \(\forall m \in B\), \(m\) is visible in \(D\) unless \(D\) defines its own \(m\).

> [!WARNING]
> Forgetting that the child does not copy code but only receives a reference can later produce surprising shared-state bugs when mutable class attributes are involved.

### Step 2 — Attribute lookup walks the inheritance chain
When Python encounters `obj.method`, it first checks the instance, then the class of `obj`, then each successive parent. In single inheritance the chain is exactly two steps long before reaching `object`.

### Step 3 — Python records the chain in `__mro__`
At class-creation time Python builds and caches a tuple:
```python
Dog.__mro__   # (Dog, Animal, object)
```
This tuple is the Method Resolution Order.

### Step 4 — C3 linearization produces the order even for single inheritance
Although C3 was invented for multiple inheritance, it degenerates gracefully: for \(D(B)\) the result is simply \((D, B, \text{object})\).

### Step 5 — `super()` follows the MRO, not the textual parent
Calling `super()` inside `Dog` returns a proxy that starts searching immediately after `Dog` in the stored MRO, i.e., at `Animal`.

## 5. Worked examples — har step show karo

**Example 1 — Minimal single inheritance**  
*Given:* classes `Vehicle` and `Car`.  
*Find:* `Car.__mro__`.  
Step 1: `class Car(Vehicle): pass`.  
Step 2: Python executes C3 on the single parent list `[Vehicle]`.  
Step 3: Result is `(Car, Vehicle, object)`.  
**Final answer**  
`(Car, Vehicle, object)`

*Reflection:* The example shows that even the simplest case still produces a three-element tuple ending at `object`.

**Example 2 — Overriding a method**  
*Given:* `Vehicle` defines `start`; `Car` overrides it.  
*Find:* which method runs for `c.start()`.  
Step 1: lookup begins at `Car`.  
Step 2: `start` is found locally, search stops.  
**Final answer**  
`Car.start` executes.

*Reflection:* Local definitions always take precedence because they appear first in the MRO.

**Example 3 — Using `super()` to extend, not replace**  
*Given:* both classes implement `__init__`.  
Code:
```python
class Vehicle:
    def __init__(self):
        self.speed = 0
class Car(Vehicle):
    def __init__(self):
        super().__init__()
        self.doors = 4
```
*Why* each line: `super()` jumps to the next class in `Car.__mro__`, i.e., `Vehicle`.  
**Final answer**  
`c = Car()` yields an instance whose `__dict__` contains both `speed` and `doors`.

*Reflection:* Cooperative `super()` works only because the MRO guarantees a total order.

**Example 4 — Inspecting MRO at runtime**  
*Given:* the hierarchy above.  
*Find:* the class that actually supplies `object.__init__`.  
Step 1: `Car.__mro__[2]` is `object`.  
Step 2: therefore `object.__init__` is reached only if neither `Car` nor `Vehicle` defines `__init__`.  
**Final answer**  
`object`

*Reflection:* This demonstrates how the cached tuple lets you predict behaviour without mentally simulating recursion.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming `super()` calls the parent named in the class statement | `super()` follows MRO position, not source text     | Always print `Class.__mro__` before using `super`    |
| Forgetting that `object` is the final class | Python silently inserts it                          | Remember every MRO ends with `object`                |
| Overriding `__new__` without calling `super` | `__new__` is static and lives in `object`           | Explicitly delegate unless you truly intend otherwise|
| Thinking MRO is recomputed on every call | MRO is cached at class creation                     | Re-create the class after editing parents to refresh |
| Shadowing a parent method with an instance attribute | Attribute lookup checks instance before class       | Use different names or properties                    |
| Circular inheritance (even accidental via import) | Breaks C3 linearization                             | Keep inheritance DAG acyclic                         |

## 7. The textbook-precise statement
In Python, single inheritance of class \(D\) from class \(B\) produces the MRO
\[
\text{MRO}(D) = (D) + \text{MRO}(B)
\]
where “\(+\)” denotes list concatenation after C3 merge. The resulting tuple \(T\) satisfies: (i) \(D\) appears before any of its parents, (ii) the relative order of parents is preserved, and (iii) \(T[-1] = \texttt{object}\). Method lookup for an instance of \(D\) returns the first entry in \(T\) that defines the requested attribute (Python Language Reference, version 3.12, §3.3.2 and §4.6).

## 8. Visual — diagram or schematic
```
Car.__mro__
+--------+
|  Car   |  <-- lookup starts here
+--------+
    |
    v
+--------+
| Vehicle|
+--------+
    |
    v
+--------+
| object |  <-- final fallback
+--------+
```

## 9. The memory technique
1. **The hook** — picture a single-file family tree where each generation can only have one parent; the MRO is the straight line drawn from you to your parent to grandparent to Adam (object).
2. **What to overlearn** — every MRO ends with `object`; `super()` starts searching at the next slot after the current class.
3. **Spaced-repetition schedule** — review the four examples after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the tuple, recreate the class and print `.__mro__`; the printed order is the authoritative answer.

## 10. What this unlocks
Mastering single-inheritance MRO lets you read any Django model, PyTorch layer, or Pandas extension without fear. It directly prepares you for multiple inheritance, cooperative multiple inheritance via `super()`, abstract base classes, and metaclasses that modify `__mro__` at creation time.

- Next topics: multiple inheritance & diamond problem
- Cooperative `super()` chains
- `__init_subclass__` and metaclass MRO manipulation

## 11. Self-check — five questions, no answers
1. Write the exact tuple that `class A(B): pass` produces for `A.__mro__`.
2. If `Car` overrides `__str__` and `Vehicle` also defines it, which implementation is chosen for `str(c)`?
3. Inside `Car.__init__`, what does `super().__init__()` actually invoke when the MRO is `(Car, Vehicle, object)`?
4. Predict the output of `print(Car.__mro__)` after you add a new parent via multiple inheritance later.
5. Identify the single line that would break the guarantee that `object` is the last element of any MRO.