## 1. The one-sentence answer

**Instance attributes belong to each individual object while class attributes belong to the class itself and are shared by all objects.**

Iska matlab yeh hai ki jab aap ek class define karte ho aur usme koi variable likhte ho, toh woh variable do alag tareeqon se behave kar sakta hai. Agar woh variable har object ke liye alag-alag value store karta hai, toh woh instance attribute hai. Agar woh value sab objects mein ek hi hoti hai, toh woh class attribute hai.

Aap soch sakte ho ki class ek blueprint hai aur har object us blueprint se bana ek alag ghar hai. Ghar ke andar jo cheezein sirf us ghar ki hain (jaise us ghar ka colour), woh instance attributes hain. Blueprint par jo likha hai ki “saare ghar ek hi company se banenge”, woh class attribute hai.

> [!NOTE]
> Sabse badi aha moment yeh hai ki ek hi naam ka attribute dono jagah exist kar sakta hai; Python pehle instance namespace dekhta hai, phir class namespace. Yeh lookup rule samajhna baaki OOP concepts ki foundation hai.

## 2. Why this matters — concrete and current

In Django ORM, model fields defined at class level become class attributes that every model instance shares until an instance overrides them; this design lets Django generate database schemas once while allowing per-row data.

In PyTorch, `nn.Module` uses class attributes for `training` flag and buffers; each layer instance can override these without affecting other layers, enabling different training states inside the same model graph.

In semiconductor simulation tools written in Python (e.g., PySpice), device parameters such as default temperature are stored as class attributes so that thousands of transistor instances inherit the same process-corner values unless an engineer explicitly changes one instance.

In reinforcement-learning libraries like Stable-Baselines3, the `BaseAlgorithm` class keeps shared hyperparameters (learning rate schedule, device) as class attributes; each environment instance stores its own observation buffer as instance attributes, preventing accidental sharing of rollout data across parallel workers.

In game engines such as Godot’s Python bindings, a `Node` subclass keeps a class-level `process_priority` counter while each instantiated node records its own position and velocity as instance attributes; this separation allows efficient batch updates without duplicating static data.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python class syntax  | You must be able to write `class` and `__init__`          |
| Object instantiation | You need to create objects with `obj = Class()`           |
| Namespace            | Understanding that names live in dictionaries helps later |
| Reference vs value   | Explains why mutable class attributes cause surprises     |

Agar aap inme se koi bhi weak feel karte ho, toh pehle basic Python objects aur dictionaries revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Classes create two namespaces
Jab Python ek class statement execute karta hai, woh ek class namespace banaata hai. Har object banne par ek alag instance namespace banta hai.

Example:
```python
class Demo:
    x = 10          # class namespace
```
Yahan `Demo.x` class namespace mein rehta hai.

Formal statement:
Let \(C\) be a class; its namespace is the dictionary \(C.\_\_dict\_\). Each instance \(i\) has its own dictionary \(i.\_\_dict\_\).

> [!WARNING]
> Agar aap class namespace ko instance namespace samajh kar directly modify karoge, toh unexpectedly saare objects affect ho sakte hain.

### Step 2 — Instance attributes live only in the instance dictionary
`__init__` ke andar `self.attr = value` likhna instance dictionary mein entry daalta hai.

Example:
```python
d1 = Demo()
d1.y = 20
print(d1.__dict__)   # {'y': 20}
```
`y` sirf `d1` ke paas hai.

Formal:
Instance attribute assignment is \(i.\_\_dict\_\)[name] = value.

### Step 3 — Attribute lookup order
Python pehle instance dictionary dekhta hai, phir class dictionary.

Formal lookup rule:
\[
\text{value} = i.\_\_dict\_\text{[name]} \quad\text{if exists, else}\quad C.\_\_dict\_\text{[name]}
\]

### Step 4 — Class attributes are visible to all instances
Koi bhi instance `self.class_attr` likhe toh woh class namespace se value le sakta hai jab tak uska apna instance attribute na ho.

### Step 5 — Assignment always creates or updates instance attribute
`self.class_attr = new_value` likhne par Python instance dictionary mein entry daal deta hai; class dictionary untouched rehti hai.

Formal:
Assignment is never delegated to the class; it always mutates \(i.\_\_dict\_\).

### Step 6 — Mutable class attributes require caution
Agar class attribute ek list ya dict hai, toh `self.mutable.append(x)` instance dictionary ko touch nahi karta, balki shared object ko mutate karta hai.

### Step 7 — Textbook-grade definition
An instance attribute is a name-value pair stored in an instance’s own `__dict__`. A class attribute is a name-value pair stored in the class’s `__dict__` and inherited by instances via the attribute lookup chain unless shadowed.

## 5. Worked examples — har step show karo

**Example 1 — Simple separation**
*Given:*  
```python
class Counter:
    total = 0
```
*Find:* value of `c1.total` and `c2.total` after creating two instances.  
Step 1: `c1 = Counter()` creates empty instance dict.  
Step 2: `c2 = Counter()` creates another empty instance dict.  
Step 3: Both lookups fall through to class dict → 0.  
**Final answer**  
Both print 0.

*Reflection:* Yeh example dikhata hai ki class attribute default value deta hai bina har instance mein copy kiye.

**Example 2 — Overriding per instance**
*Given:* same `Counter` class.  
*Find:* effect of `c1.total = 5`.  
Step 1: Assignment writes to `c1.__dict__['total'] = 5`.  
Step 2: `c1.total` now reads from instance dict → 5.  
Step 3: `c2.total` still reads from class dict → 0.  
**Final answer**  
`c1.total == 5`, `c2.total == 0`.

*Reflection:* Assignment creates a shadow; class value remains safe.

**Example 3 — Mutable trap**
*Given:*  
```python
class Bag:
    items = []
```
*Find:* result of `b1.items.append(1); b2.items`.  
Step 1: `append` mutates the single list object.  
Step 2: Both `b1.items` and `b2.items` point to same list.  
**Final answer**  
`b2.items == [1]`.

*Reflection:* Mutable shared state is the classic source of bugs.

**Example 4 — Proper per-instance mutable**
*Given:*  
```python
class Bag:
    def __init__(self):
        self.items = []
```
*Find:* behaviour after same append sequence.  
Step 1: `__init__` creates separate list in each instance dict.  
Step 2: Append affects only that list.  
**Final answer**  
`b2.items == []`.

*Reflection:* Always initialise mutable data inside `__init__` when each object needs its own copy.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Modifying mutable class attribute | `append` does not trigger instance assignment | Always create mutable containers in `__init__` |
| Expecting class attribute to update | Assignment always writes to instance dict   | Use class methods or `@classmethod` for shared state |
| Forgetting lookup order           | New learners assume all names are equal     | Print `obj.__dict__` and `Class.__dict__`    |
| Using `self.__class__.attr` wrongly | Confusion between two namespaces            | Prefer explicit `ClassName.attr` when class data needed |
| Deleting instance attribute       | `del self.attr` only removes from instance  | Understand that class value becomes visible again |
| Inheritance surprises             | Subclass may override class attribute       | Use `_private` naming or descriptors         |
| Default argument mutable          | Same mechanism as class attributes          | Never use mutable defaults in functions      |

## 7. The textbook-precise statement

An instance attribute is a binding stored in the instance dictionary (`__dict__`) of a concrete object. A class attribute is a binding stored in the class dictionary. Attribute reference `obj.name` succeeds if `name` is present in `obj.__dict__`; otherwise the search continues in `type(obj).__dict__` and its bases (Python Language Reference, §3.2 and §4.2.2, CPython 3.12). Assignment `obj.name = value` always stores the binding in `obj.__dict__`, never in the class dictionary unless the class defines a data descriptor.

## 8. Visual — diagram or schematic

```
Class Counter
+---------------------+
| __dict__            |
|   'total': 0        |  <-- class attribute
+---------------------+
          |
          | inherited by
          v
Instance c1               Instance c2
+---------------+         +---------------+
| __dict__      |         | __dict__      |
|  'total': 5   |         |   (empty)     |
+---------------+         +---------------+
```
c1 has its own `total`; c2 still sees the class value.

## 9. The memory technique

1. **The hook**  
   Imagine a company stamp (class attribute) on every employee file. Each employee can staple their own note (instance attribute) on top; the stamp underneath stays unless the note covers it.

2. **What to overlearn**  
   - Assignment always writes to instance `__dict__`.  
   - Lookup: instance first, then class.  
   - Mutable class attributes are shared by default.

3. **Spaced-repetition schedule**  
   Review after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Jab rule yaad na aaye, dono `__dict__` print karo aur manually dekho kaunsa dictionary pehle check hoti hai.

## 10. What this unlocks

Yeh distinction aapko descriptors, properties, metaclasses aur data classes samajhne ke liye taiyaar karti hai.

- Next: writing your own descriptors (`__get__`, `__set__`)
- `@classmethod` aur `@staticmethod` correctly use karna
- Memory-efficient dataclasses aur slots
- Avoiding subtle bugs in concurrent or ML training code

## 11. Self-check — five questions, no answers

1. Agar `class A: x = []` hai aur do objects `a1, a2` banaye, toh `a1.x is a2.x` kya hoga?
2. `self.x = 5` likhne ke baad `A.__dict__['x']` mein kya change hota hai?
3. Ek class attribute ko bina kisi instance ke directly kaise update kar sakte hain?
4. Agar ek subclass `B(A)` mein `x = 99` likha ho, toh `B` ke instances `A` ke class attribute ko dekh paayenge?
5. Neeche diye code mein final value kya hogi aur kyun?  
   ```python
   class T: vals = {}
   t1 = T(); t2 = T()
   t1.vals['a'] = 1
   print(t2.vals)
   ```