## 1. The one-sentence answer
**Single inheritance lets one class acquire all attributes and methods of exactly one parent class, while method resolution order (MRO) defines the precise linear sequence Python follows when searching for a method or attribute starting from the child.**

A child class declares a single base class in its definition. Every instance of the child therefore possesses the parent’s state and behavior without re-implementing it. When code calls a method on a child instance, Python first checks the child’s own namespace; if the name is absent, it continues the search according to the MRO.

The MRO for a single-inheritance chain is simply the child followed by its parent, then the parent’s parent, and so on, until the implicit root object class. This ordering guarantees deterministic lookup and prevents accidental shadowing.

> [!NOTE]
> The decisive insight is that even a linear chain of single inheritance produces an explicit, inspectable sequence; understanding that sequence removes all ambiguity about which implementation actually runs.

## 2. Why this matters — concrete and current
In the CPython implementation of the pandas library, the DataFrame class inherits from NDFrame; the MRO ensures that DataFrame-specific overrides of __getitem__ are found before NDFrame’s generic version, allowing vectorised column access without duplicating thousands of lines of indexing logic.

NASA’s Jet Propulsion Laboratory uses single-inheritance hierarchies in the F’ flight-software framework; each hardware driver inherits from a common Component base, and the MRO guarantees that the telemetry packet-formatting method defined in Component is reached only after any mission-specific override supplied by the child.

Modern reinforcement-learning libraries such as Stable-Baselines3 define policy networks that inherit from a base nn.Module; the MRO determines whether a custom forward method or PyTorch’s default implementation executes, directly affecting gradient flow during back-propagation on GPUs.

Semiconductor design tools at Synopsys employ Python-based regression suites in which testbench classes inherit from a single VerificationComponent; the MRO guarantees that setup and teardown hooks run in the exact order required by the IEEE 1800.2 standard.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Class and instance namespaces  | Method lookup examines these dictionaries in MRO order    |
| The built-in object class      | Every class ultimately inherits from it; it terminates the MRO |
| Attribute lookup rules         | MRO is simply the ordered application of those rules      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classes define namespaces
A class statement creates a namespace that stores function objects as methods.  
Example:  
```python
class Parent:
    def greet(self): return "hi"
```
The name greet is stored in Parent.__dict__.

Formal statement:  
$$\text{class } C \text{ produces a mapping } C.\_\_dict\_\_ : \text{str} \to \text{object}.$$

> [!WARNING]
> Forgetting that methods are merely stored functions leads to confusion when the same name appears in both parent and child.

### Step 2 — Single inheritance copies the parent namespace into the lookup chain
When class Child(Parent): is executed, Python records Parent as the sole base.  
The child’s instances may access any name present in Parent without redefinition.

Formal statement:  
$$\text{bases}(Child) = (Parent,).$$

### Step 3 — Lookup begins at the instance, then follows the inheritance link
Python’s attribute protocol first searches the instance __dict__, then the class __dict__, then each successive base.

### Step 4 — The search order is materialised as the MRO tuple
Python computes and caches a linear sequence called __mro__ that enumerates every class that will be examined.

Formal statement:  
$$MRO(Child) = (Child, Parent, object).$$

### Step 5 — Method call selects the first matching entry in the MRO
When child_instance.method() is executed, Python walks MRO(Child) and invokes the first function object bound to the name method.

### Step 6 — Textbook statement of single-inheritance MRO
For any class C whose bases list contains exactly one element B,  
$$MRO(C) = (C,) + MRO(B).$$

## 5. Worked examples — every step shown

**Example 1 — Trivial chain**  
*Given:*  
```python
class A: pass
class B(A): pass
```
*Find:* B.__mro__  
Step 1: bases(B) = (A,).  
Step 2: MRO(A) = (A, object).  
Step 3: MRO(B) = (B,) + MRO(A).  
**Result:** (B, A, object)

*Reflection:* The chain is obvious; the exercise verifies that object is always present.

**Example 2 — Overriding method**  
*Given:*  
```python
class A:
    def f(self): return "A"
class B(A):
    def f(self): return "B"
```
*Find:* which f runs for B().f().  
Step 1: MRO(B) = (B, A, object).  
Step 2: First entry containing f is B.  
**Result:** "B"

*Reflection:* The child entry shadows the parent because it appears earlier in the MRO.

**Example 3 — Inherited but not overridden**  
*Given:* the same A, and class C(A): pass.  
*Find:* C().f().  
MRO(C) places A before object; A.f is therefore selected.  
**Result:** "A"

*Reflection:* Absence of an override simply continues the walk.

**Example 4 — Inspecting MRO at runtime**  
*Given:* classes A and B above.  
*Find:* B.__mro__ via code.  
```python
print(B.__mro__)
```
Python returns the cached tuple computed at class creation time.  
**Result:** (B, A, object)

*Reflection:* MRO is materialised once; repeated lookups incur no recomputation cost.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming MRO equals source order  | Newcomers read left-to-right in the class line      | Always read cls.__mro__ after definition             |
| Forgetting object is last         | Implicit inheritance is invisible in source         | Print MRO of any class to see the terminal object    |
| Shadowing built-ins unintentionally | Defining a method named list or dict in a base     | Use __ prefixes or explicit module aliases           |
| Expecting MRO to change at runtime| MRO is frozen at class creation                     | Re-create the subclass if dynamic bases are required |
| Confusing inheritance with composition | Both reuse code but only inheritance uses MRO     | Draw an “is-a” versus “has-a” diagram before coding  |
| Overriding __getattribute__       | Alters the entire lookup machinery                  | Prefer __getattr__ for fallback logic                |
| Multiple inheritance appearing later | Single-inheritance code later mixed with MI       | Keep every hierarchy single-inheritance until MI is deliberately introduced |

## 7. The textbook-precise statement
Let C be a class whose __bases__ tuple contains exactly one element B. The method resolution order of C is the tuple  
$$MRO(C) = (C) \mathbin{+\kern-2pt} MRO(B),$$  
with the base case MRO(object) = (object,). The resulting sequence is the unique linear extension of the inheritance relation that Python’s attribute lookup traverses. (See Python Language Reference, version 3.12, §3.3.2 “Method resolution order”.)

## 8. Visual — diagram or schematic
```text
Instance i
   │
   ▼ lookup
Class B ──▶ B.__dict__
   │
   ▼
Class A ──▶ A.__dict__
   │
   ▼
Class object ──▶ object.__dict__
```
Each downward arrow represents the next class examined when a name is absent from the current namespace.

## 9. The memory technique
1. **The hook** — Picture a single-file family tree: you stand at the top, your parent below, grandparent further down; the MRO is the straight line you walk when looking for a family recipe.  
2. **What to overlearn** — MRO(C) = (C,) + MRO(B) when C inherits only from B; the tuple always ends with object.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by listing each class’s own __dict__, then concatenating them in parent order until object is reached.

## 10. What this unlocks
Single-inheritance MRO is the foundation for controlled code reuse and the prerequisite for understanding cooperative multiple inheritance via super().

- Multiple inheritance and C3 linearisation  
- Cooperative method calls with super()  
- Abstract base classes and virtual subclass registration  
- Metaclass __mro_entries__ hooks  
- Mixin design patterns used in Django and SQLAlchemy

## 11. Self-check — five questions, no answers
1. Write the exact MRO tuple for class D(C, B) where C inherits from A and B inherits from A.  
2. Predict the output of D().common() when both B and C define common; then verify with code.  
3. Explain why inserting a new method into A after B and C are defined still affects instances of D.  
4. Identify the single line that would break the single-inheritance assumption in an existing hierarchy.  
5. Given an unknown class X, describe the shortest Python expression that reveals whether X uses single or multiple inheritance.