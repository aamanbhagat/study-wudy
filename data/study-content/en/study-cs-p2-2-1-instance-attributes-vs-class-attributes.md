## 1. The one-sentence answer

**Instance attributes are data stored on each individual object, while class attributes are data stored on the class and shared by every object of that class.**

An attribute is simply a named value attached to something. In object-oriented code the “something” can be either one concrete object or the blueprint that produces objects. When the value lives on the concrete object it is private to that object; every other object can carry a different value under the same name. When the value lives on the blueprint it is visible to every object created from that blueprint, and a change made through the class is visible to all of them.

The distinction is not about visibility modifiers such as public or private; it is about ownership and lifetime. Instance attributes are created and destroyed with each object. Class attributes are created when the class statement executes and persist until the class itself is garbage-collected.

> [!NOTE]
> The lookup rule “instance first, then class” is the single fact that explains almost every surprise you will meet with these two kinds of attribute.

## 2. Why this matters — concrete and current

In the CPython interpreter the type object itself stores dozens of class attributes (`__slots__`, `__dict__`, method wrappers) that every instance consults before falling back to its own dictionary; a mistaken assignment to one of these names on an instance silently creates a shadowing attribute and breaks method resolution for that object only.

Aircraft-configuration software at Boeing stores the immutable maximum take-off weight as a class attribute on each `AircraftType` so that every instantiated airframe shares the same certified limit without duplicating the value in memory.

Modern PyTorch modules keep a class attribute `_version` incremented on the `nn.Module` class whenever a new operator registration occurs; every model instance reads the current version through the class, guaranteeing that saved checkpoints remain compatible across processes without each instance carrying its own copy.

Semiconductor design tools written in Python use class attributes on `Transistor` to hold technology constants (oxide thickness, mobility) that are identical for every transistor of a given process node, while each concrete transistor instance stores its own width and length as instance attributes.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| `class` statement execution| Determines the moment class attributes are created        |
| `self` parameter in methods| The mechanism that attaches instance attributes           |
| Attribute lookup order     | Explains why `obj.x` may return a class or instance value |
| `id()` and `is`            | Distinguishes shared versus distinct objects              |

## 4. Building the idea — from intuition to formalism

### Step 1 — Attributes are simply dictionary entries
Every object and every class maintains its own `__dict__`.  
```python
class C: pass
c = C()
c.x = 1
print(c.__dict__)   # {'x': 1}
```
Formally, an attribute reference `obj.name` is syntactic sugar for `obj.__dict__['name']` when the name is not found via inheritance.  
> [!WARNING]  
> Forgetting that `__dict__` is per-object leads to the false belief that all attributes are automatically shared.

### Step 2 — Class attributes are entries in the class `__dict__`
Names assigned directly inside the `class` block are inserted into the class dictionary, not into any instance dictionary.  
```python
class C:
    y = 2
print(C.__dict__['y'])   # 2
```
Formally:  
$$ \text{class attr } y \in C.__dict__ \land \forall i \in \text{instances}(C),\; y \notin i.__dict__ $$

### Step 3 — Instance attributes are created by assignment through `self`
Inside methods the identifier `self` refers to the receiving instance; any assignment `self.z = …` mutates that instance’s `__dict__`.  
Formally:  
$$ \text{instance attr } z \text{ is created by } i.__dict__['z'] \leftarrow v $$

### Step 4 — Attribute lookup searches the instance first
When evaluating `obj.name`, Python first consults `obj.__dict__`, then walks the method-resolution order of `type(obj)`.  
Formally:  
$$ \text{value} = obj.__dict__.get(name) \lor lookup(type(obj), name) $$

### Step 5 — Assignment through an instance never affects the class
The statement `obj.name = v` always writes to `obj.__dict__`; it never mutates the class dictionary.  
> [!WARNING]  
> Writing `obj.name = v` when `name` already exists on the class silently hides the class attribute for that object only.

### Step 6 — Class attributes remain visible until shadowed
An instance that has never assigned a name still sees the class attribute through the lookup chain. Deleting the shadowing instance attribute restores visibility of the class attribute.

## 5. Worked examples — every step shown

**Example 1 — Simple shared counter**  
*Given:*  
```python
class Counter:
    total = 0
c1 = Counter()
c2 = Counter()
```
*Find:* value of `c1.total` and `c2.total` after `Counter.total = 5`.  
Step 1: `total` resides in `Counter.__dict__`.  
*Why:* assigned at class-definition time.  
Step 2: No instance has its own `total`.  
*Why:* neither `c1` nor `c2` executed an assignment to `self.total`.  
Step 3: Both lookups therefore reach the class.  
**Answer:** both equal 5.

*Reflection:* The example shows that reading a class attribute through instances works until an instance assignment occurs.

**Example 2 — Accidental shadowing**  
*Given:* same `Counter` class, then `c1.total = 10`.  
*Find:* `Counter.total`, `c1.total`, `c2.total`.  
Step 1: `c1.__dict__['total'] = 10`.  
*Why:* assignment through instance always targets the instance dict.  
Step 2: `c2` still has empty `__dict__`.  
Step 3: `Counter.__dict__` unchanged.  
**Answer:** 5, 10, 5.

*Reflection:* The trap is that the class value appears unchanged while one instance diverges.

**Example 3 — Mutable class attribute**  
*Given:*  
```python
class Registry:
    items = []
r1 = Registry()
r1.items.append(1)
r2 = Registry()
```
*Find:* `r2.items`.  
Step 1: `items` is a list object referenced by the class dict.  
*Why:* the list itself is mutable.  
Step 2: `append` mutates the list in place.  
*Why:* no new binding is created.  
**Answer:** `[1]`.

*Reflection:* Mutation is not the same as assignment; the former affects every observer.

**Example 4 — Using both kinds together**  
*Given:* a class that counts instantiations.  
```python
class Node:
    count = 0
    def __init__(self, value):
        Node.count += 1
        self.value = value
```
*Find:* `Node.count` and `n.value` after `n = Node(42)`.  
Step 1: `Node.count += 1` mutates the class dict.  
*Why:* `Node` is the explicit target.  
Step 2: `self.value = 42` mutates `n.__dict__`.  
*Why:* assignment through `self`.  
**Answer:** count = 1, n.value = 42.

*Reflection:* The pattern separates shared state (count) from per-object state (value).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assigning to `self.name` expecting to change the class | Assignment always targets the instance dict | Use `ClassName.name` when mutation of class state is intended |
| Using a mutable default (list, dict) as class attribute | The same object is shared by all instances  | Use `None` sentinel and create inside `__init__` |
| Checking `if name in obj.__dict__` to test existence | Misses inherited class attributes           | Use `hasattr` or `getattr` with default      |
| Deleting an instance attribute that never existed   | Python raises `AttributeError`              | Guard with `hasattr` before `del`            |
| Expecting `cls.__dict__['x'] = v` to affect instances that already shadow | Shadowing dict entries are independent      | Document that class mutation does not propagate to shadowed names |
| Forgetting that slots remove `__dict__`             | Instance attribute assignment fails         | Keep a mental note of `__slots__` usage      |
| Modifying a class attribute inside a method without `cls` or class name | Accidental creation of instance attribute   | Always write `self.__class__.name` or `cls.name` inside methods |

## 7. The textbook-precise statement

An attribute reference on an instance `i` of class `C` first examines `i.__dict__`; if the name is absent, the search continues through the method-resolution order of `C`. Names bound by assignments directly in the class body reside in `C.__dict__` and are therefore visible to every instance that does not shadow them. Assignment through an instance always mutates the instance’s own `__dict__`. (See: Python Language Reference, version 3.12, §3.2 “The standard type hierarchy” and §4.2 “Attribute references”.)

## 8. Visual — diagram or schematic

```text
Class C
+-------------+
| __dict__    |
|   y: 2      |<--- shared by all instances
+-------------+
        ^
        | lookup if not in instance
        |
Instance i1          Instance i2
+-----------+        +-----------+
| __dict__  |        | __dict__  |
|   x: 1    |        |   x: 99   |
+-----------+        +-----------+
```
Arrows show the lookup path taken when `i1.y` or `i2.y` is read.

## 9. The memory technique

1. **The hook** — picture a factory (the class) that stamps a serial number on every widget it produces; the factory’s own nameplate is the class attribute, each widget’s serial number is an instance attribute.  
2. **What to overlearn** — “instance first, class second”; `self.x = …` never writes to the class.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild the two `__dict__` objects mentally, then apply the lookup rule.

## 10. What this unlocks

Mastery of the two attribute namespaces lets you implement shared configuration, flyweight caches, and correct default values without subtle bugs.  

- Class methods and static methods  
- `__slots__` memory optimisation  
- Metaclasses that inject class attributes  
- Descriptor protocol (properties, cached properties)  
- Registry and singleton patterns that rely on class-level state

## 11. Self-check — five questions, no answers

1. After executing `class A: x=1; a=A(); a.x=2`, what does `A.x` evaluate to?  
2. Why does the following code create one list shared by all instances: `class B: items=[]`?  
3. Write the shortest code that increments a class attribute `count` from inside `__init__`.  
4. Predict the output of `del a.x; print(a.x)` when `x` exists only on the class.  
5. In a class using `__slots__ = ('val',)`, can you still add an extra attribute on an instance? Explain.