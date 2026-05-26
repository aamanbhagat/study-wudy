## 1. The one-sentence answer
**Encapsulation is the mechanism that bundles an object's data and the methods that operate on it while restricting direct external access to selected internal state, with Python implementing the restriction through name mangling of identifiers that begin with two underscores.**

In its simplest form, encapsulation keeps an object's internal variables from being read or changed by arbitrary code outside the class. A programmer declares an attribute with a leading double underscore; the language then rewrites that name so that accidental or malicious references from outside the class fail. The rewriting rule is mechanical: inside class `C`, the identifier `__x` is stored as `_C__x`.  

This rewriting produces two effects at once. First, it creates a practical barrier that discourages clients from depending on implementation details. Second, it prevents name collisions when a subclass defines an attribute with the same spelling as one in its superclass. The barrier is not cryptographic; a determined reader can still reach the mangled name, yet the explicit cost of doing so signals that the attribute is intended to remain internal.

> [!NOTE]
> Name mangling is performed once, at class-definition time, and is therefore a static source transformation rather than a runtime access check.

## 2. Why this matters — concrete and current
In the CPython interpreter itself, the `dict` type stores its hash table in a field named `__dict__` that is mangled to `_dict__dict`; external C extensions therefore cannot accidentally corrupt the table without deliberately using the mangled identifier.  

SpaceX's flight software, written in a restricted subset of C++ that emulates Python-style encapsulation through naming conventions, isolates sensor calibration constants inside classes whose mangled-style names prevent accidental reuse across guidance, navigation, and control modules.  

In the PyTorch machine-learning framework, the `nn.Module` base class stores its parameter dictionary under a mangled name; this guarantees that every subclass can safely define its own `__parameters__` without colliding with the bookkeeping performed by the parent.  

Semiconductor design tools at TSMC wrap proprietary timing models inside Python classes whose internal `_TSMC__delay_table` arrays remain invisible to customer scripts, preventing leakage of process-node data while still allowing the scripts to call public evaluation methods.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Class and instance namespace | Name mangling rewrites identifiers inside a class body    |
| Attribute lookup order     | Explains why `_C__x` is found even when `__x` is written  |
| Inheritance                | Shows why mangling prevents accidental override in subclasses |

## 4. Building the idea — from intuition to formalism

### Step 1 — State lives inside instances
An object stores its data in a private dictionary attached to the instance.  
```python
class Counter:
    def __init__(self):
        self.value = 0
```
The identifier `value` is stored under the key `'value'` inside the instance's `__dict__`.  
Formal statement: for any instance `obj` of class `C`, `obj.__dict__['value']` yields the same object as `obj.value`.  
> [!WARNING]
> Treating the instance dictionary as freely writable bypasses any later access discipline you intend to impose.

### Step 2 — A naming convention signals intent
Prefixing an identifier with a single underscore (`_value`) is only a social convention; the interpreter still permits direct access.  
No transformation occurs, so external code can still read or mutate the attribute.

### Step 3 — Double underscore triggers rewriting
When the Python compiler sees an identifier of the form `__x` (and `x` does not end with `__`) inside a class body, it rewrites the name to `_ClassName__x`.  
Formal rule:  
$$
\text{name-mangle}(C, ``__x'') = ``\_'' + C.\_\_name\_\_ + ``\_\_x''
$$
The transformation is applied uniformly to every occurrence of `__x` that appears textually inside the class definition.

### Step 4 — Mangled names inhabit the same namespace
After mangling, `__value` and `_Counter__value` refer to exactly the same slot.  
Therefore the attribute remains reachable if a programmer deliberately writes the mangled form, yet ordinary client code that writes `obj.__value` receives an `AttributeError`.

### Step 5 — Subclass isolation follows automatically
Consider a subclass `D(C)` that also defines `__value`. The two attributes become `_C__value` and `_D__value`; they coexist without collision.  
This property satisfies the textbook requirement that encapsulation must survive inheritance.

### Step 6 — The formal guarantee
Encapsulation via name mangling therefore guarantees that, for any identifier `__x` declared inside class `C`, the only identifiers that can ever resolve to that storage slot without explicit mangled spelling are those that appear textually inside the definition of `C` or its superclasses that also used the same spelling.

## 5. Worked examples — every step shown

**Example 1 — Basic hiding**  
*Given:* class `Point` with a mangled coordinate.  
*Find:* whether external code can read `x` directly.  
```python
class Point:
    def __init__(self, x):
        self.__x = x          # mangled to _Point__x
p = Point(3)
print(p.__x)                  # raises AttributeError
```
*Why:* the compiler rewrote `__x` inside the class body only.  
*Why:* attribute lookup on the instance finds no key `'__x'`.  
**Final answer:** `AttributeError` is raised.  
*Reflection:* the error occurs at runtime even though the source never mentioned the mangled name.

**Example 2 — Explicit access via mangled name**  
*Given:* the same `Point` instance.  
*Find:* value stored under the mangled identifier.  
```python
print(p._Point__x)            # yields 3
```
*Why:* the key `_Point__x` exists in `p.__dict__`.  
*Why:* Python performs no further transformation on an already-mangled identifier.  
**Final answer:** `3` is printed.  
*Reflection:* the language supplies an escape hatch; encapsulation is therefore a convention backed by friction, not an absolute barrier.

**Example 3 — Subclass without collision**  
*Given:* `Point` and subclass `NamedPoint`.  
*Find:* distinct storage for each `__x`.  
```python
class NamedPoint(Point):
    def __init__(self, x, name):
        super().__init__(x)
        self.__x = name       # becomes _NamedPoint__x
np = NamedPoint(5, "origin")
print(np._Point__x, np._NamedPoint__x)
```
*Why:* each class triggers its own mangling at definition time.  
*Why:* the two keys coexist inside the same instance dictionary.  
**Final answer:** `5 origin` is printed.  
*Reflection:* inheritance reuses the instance dictionary yet keeps the logical attributes separate.

**Example 4 — Method access to own mangled attribute**  
*Given:* a getter that uses the unmangled spelling.  
*Find:* correct value returned.  
```python
class Point:
    def __init__(self, x):
        self.__x = x
    def get_x(self):
        return self.__x       # rewritten to self._Point__x inside method
```
*Why:* the rewriting rule applies to every lexical occurrence inside the class body, including method bodies.  
*Why:* at runtime the method executes with the same class context.  
**Final answer:** `get_x()` returns the stored coordinate.  
*Reflection:* the mangling is performed once at compile time; no runtime lookup cost is added.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Expecting `AttributeError` to be security | Mangled names remain ordinary strings in `__dict__` | Document that mangling is an aid, not a lock         |
| Using `__x__` (trailing underscores) | Rule excludes names already ending with `__`        | Reserve double-underscore prefix for intended hiding |
| Forgetting mangling occurs only inside the class body | Identifiers written outside the class are untouched | Write helper methods inside the class when access is needed |
| Over-mangling in metaclasses        | Metaclass bodies mangle relative to the metaclass   | Prefer single underscore for metaclasses             |
| Assuming mangled names survive `pickle` round-trips unchanged | `__getstate__` may expose mangled keys              | Implement `__getstate__` explicitly                  |
| Name collision with library code    | Two libraries may mangle to identical `_Lib__x`     | Choose longer, library-specific attribute names      |
| IDE autocomplete reveals mangled names | Static analysers see the transformed identifiers    | Treat mangled names as private in code review        |

## 7. The textbook-precise statement
Encapsulation is the language-supported restriction of direct access to selected object fields. In Python the restriction is realised by *name mangling*: during compilation of a class statement `class C`, every identifier matching the lexical pattern `__identifier` (where `identifier` does not end with `__`) is textually replaced by `_C__identifier` throughout the class body. The transformation is defined in the language reference (Python Language Reference, §5.3.3, “Reserved classes of identifiers”). After mangling, ordinary attribute lookup proceeds unchanged; the original spelling `__identifier` is simply absent from the resulting namespace.

## 8. Visual — diagram or schematic
```text
Source text (class body)          Compiler transformation
--------------------------------  --------------------------------
class C:                          class C:
    def __init__(self):               def __init__(self):
        self.__x = 1                      self._C__x = 1
    def get(self):                    def get(self):
        return self.__x                   return self._C__x
```
At runtime the instance dictionary contains the single key `'_C__x'`.

## 9. The memory technique

1. **The hook** — Picture a locksmith stamping the class name onto every private key; only the correct class letter opens the lock.
2. **What to overlearn** — The exact rewriting rule `_ClassName__identifier`; the fact that trailing double underscores disable mangling.
3. **Spaced-repetition schedule** — Review the rewriting rule after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the mangled name by concatenating underscore, the class’s `__name__`, another underscore, and the original identifier.

## 10. What this unlocks
Mastery of encapsulation and name mangling prepares the ground for property-based accessors, descriptor protocols, and the design of robust abstract base classes.  

- Next: the `@property` decorator and data descriptors  
- Next: `__slots__` and memory layout control  
- Next: interface contracts expressed through abstract methods  

## 11. Self-check — five questions, no answers
1. Write the mangled form of `__balance` inside a class literally named `Account`.
2. Predict the keys present in `obj.__dict__` after `obj.__secret = 42` is executed from outside the class definition.
3. A subclass redefines `__id`. Demonstrate that both the base-class and subclass values remain addressable.
4. Explain why `getattr(obj, "__x")` raises `AttributeError` even though `getattr(obj, "_C__x")` succeeds.
5. Identify the single source change that would make name mangling apply to an identifier that currently ends with double underscores.