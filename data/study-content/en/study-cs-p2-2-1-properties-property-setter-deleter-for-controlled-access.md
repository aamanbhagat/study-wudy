## 1. The one-sentence answer
**Properties intercept direct attribute access in Python objects by routing gets, sets, and deletes through user-defined methods while preserving the attribute syntax.**

Direct attribute assignment such as `obj.x = 5` stores the value in the instance dictionary with no opportunity for validation or side effects. Replacing the plain attribute with a property keeps the same syntax for client code yet executes custom logic on every access. The mechanism relies on descriptors: the `@property` decorator installs a descriptor object whose `__get__`, `__set__`, and `__delete__` methods are invoked automatically by the attribute lookup machinery.

This separation lets a class evolve its internal representation without breaking existing callers. A temperature attribute that once stored Celsius can later compute Fahrenheit on the fly; callers continue to write `t.celsius = 100`.

> [!NOTE]
> The decisive insight is that `@property` does not change how client code writes attribute expressions; it only changes what happens inside the class when those expressions are evaluated.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory uses properties inside the `astropy` library to enforce physical-unit consistency on coordinate objects; an invalid assignment raises immediately rather than propagating through downstream orbital calculations.

In machine-learning pipelines at Google, TensorFlow’s `tf.keras` layers expose `trainable_weights` as a read-only property; the setter is deliberately omitted so that accidental mutation of the weight list cannot corrupt gradient tapes.

Semiconductor design tools at Intel wrap register bit-fields behind properties; the setter performs bounds checking and side-band writes to simulation hardware, preventing silent corruption of RTL models that would otherwise require hours of debug.

The Python standard library’s `pathlib.Path` class implements `suffix` as a property whose setter rewrites the final path component; this single design choice eliminated thousands of string-manipulation bugs across the ecosystem.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Instance `__dict__`      | Properties coexist with or replace entries in this mapping |
| Descriptor protocol      | `__get__`, `__set__`, `__delete__` are the hooks properties implement |
| Decorator syntax         | `@property` is syntactic sugar for `x = property(x)`      |
| Name mangling (optional) | Explains why private backing fields use leading underscores |

## 4. Building the idea — from intuition to formalism

### Step 1 — Direct attribute access stores values blindly
Plain assignment places any object into the instance dictionary without inspection.  
```python
obj.x = "anything"
```
The formal effect is simply  
$$
\texttt{obj.__dict__['x']} \leftarrow v
$$
for any value \(v\).

> [!WARNING]
> Later code that assumes \(v\) satisfies an invariant will fail silently when that assumption is violated.

### Step 2 — Explicit getter and setter methods restore control
A pair of methods `get_x` and `set_x` can enforce rules, yet they change the call site from attribute syntax to method syntax.

### Step 3 — The `@property` decorator installs a descriptor for reads
Decorating a method with `@property` replaces the function in the class dictionary with a `property` object whose `__get__` delegates back to the original function.  
Client code `obj.x` now executes the method automatically.

### Step 4 — The `.setter` decorator registers a write handler
Applying `@x.setter` on a second method augments the same `property` object so that `obj.x = v` invokes the new method instead of storing directly into `__dict__`.

### Step 5 — The `.deleter` decorator completes the triad
`@x.deleter` supplies the handler for `del obj.x`, allowing cleanup logic or prohibition of deletion.

### Step 6 — The three-protocol surface is exactly the descriptor protocol
A `property` instance satisfies  
$$
\texttt{p.__get__(obj, type)} \quad
\texttt{p.__set__(obj, value)} \quad
\texttt{p.__delete__(obj)}
$$
which the interpreter invokes on every attribute operation when the name resolves to that descriptor.

### Step 7 — The textbook statement
When a class attribute is a `property` instance, attribute access on instances is mediated by the descriptor protocol rather than by direct dictionary lookup.

## 5. Worked examples — every step shown

**Example 1 — Minimal read-only property**  
*Given:* a class that must expose a computed radius.  
*Find:* correct definition and access.  

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius          # backing field
    @property
    def radius(self):
        return self._radius
```
- Store the value under a private name so the property itself does not collide.  
- The decorator replaces `radius` in `Circle.__dict__` with a `property` object.  
- `c = Circle(3); print(c.radius)` executes `property.__get__`, which calls the decorated function.  

**Final answer**  
`c.radius` returns 3 and cannot be assigned.

*Reflection:* The private backing field is the only new convention; everything else follows from descriptor lookup.

**Example 2 — Adding validation on write**  
*Given:* temperature must stay above -273.15 °C.  
*Find:* a property that rejects invalid assignments.

```python
class Celsius:
    def __init__(self, t):
        self._temp = t
    @property
    def temp(self):
        return self._temp
    @temp.setter
    def temp(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._temp = value
```
- The setter is discovered via the name `temp` on the existing property object.  
- Assignment `c.temp = -300` now routes through the validation before any storage occurs.  

**Final answer**  
Invalid assignments raise `ValueError`; valid ones update `_temp`.

*Reflection:* The same name `temp` appears in three places; Python matches them by decorator stacking.

**Example 3 — Computed property with no backing field**  
*Given:* a rectangle that stores width and height yet exposes area.  
*Find:* a read-only derived attribute.

```python
class Rectangle:
    def __init__(self, w, h):
        self.width, self.height = w, h
    @property
    def area(self):
        return self.width * self.height
```
- No setter is defined, so assignment raises `AttributeError`.  
- Each read recomputes the product, guaranteeing freshness.

**Final answer**  
`r.area` always equals `width * height` even after mutation of the sides.

*Reflection:* Omitting the setter is sufficient to make the attribute read-only.

**Example 4 — Full getter/setter/deleter with logging**  
*Given:* a resource handle that must log acquisition and release.  
*Find:* a property controlling a private file object.

```python
import os
class LogFile:
    def __init__(self, name):
        self._name = name
        self._file = None
    @property
    def file(self):
        if self._file is None:
            self._file = open(self._name, "a")
        return self._file
    @file.setter
    def file(self, f):
        if self._file:
            self._file.close()
        self._file = f
    @file.deleter
    def file(self):
        if self._file:
            self._file.close()
        self._file = None
        os.remove(self._name)
```
- Each protocol is attached to the same descriptor.  
- `del obj.file` both closes and deletes the underlying file.

**Final answer**  
All three operations (get, set, delete) execute the supplied side effects.

*Reflection:* The pattern scales to any resource whose lifetime must be coupled to attribute syntax.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using the same name for backing field and property | Direct `__dict__` write bypasses the descriptor | Always prefix backing fields with `_`        |
| Defining setter before the property | Name lookup fails at decoration time        | Stack `@property` first, then `@name.setter` |
| Forgetting that properties are class attributes | Instance assignment shadows the descriptor  | Keep property definitions at class level     |
| Returning a new object from getter each time | Breaks identity and caching expectations    | Cache the computed value or document the cost|
| Overriding `__getattr__` instead of using properties | `__getattr__` only runs on missing names    | Prefer explicit properties for known attributes |
| Deleting an attribute that has no deleter | Python raises `AttributeError` unexpectedly | Always provide a deleter if deletion must be controlled |
| Assuming properties are thread-safe | No locking is inserted by the descriptor    | Add explicit locks when shared mutable state exists |

## 7. The textbook-precise statement
A *property* is an instance of the built-in `property` class (or any descriptor whose `__set_name__` has been called) placed in a class dictionary. For an instance `obj` of class `C`, the expression `obj.name` is evaluated by  
1. locating the class attribute `C.name`,  
2. if it defines `__get__`, invoking `type(C.name).__get__(C.name, obj, C)`.  

The same protocol applies symmetrically for assignment and deletion (Python Language Reference, version 3.12, §3.3.2.2 “Implementing Descriptors”). When no setter is supplied, assignment raises `AttributeError`.

## 8. Visual — diagram or schematic
```text
Client code
   obj.radius = 5
        │
        ▼
Interpreter attribute machinery
   1. Look up 'radius' in type(obj).__dict__
   2. Found: <property object at 0x...>
   3. Call prop.__set__(obj, 5)
        │
        ▼
@property instance
   __set__ ──► validation + self._radius = 5
   __get__ ──► return self._radius
   __delete__ ──► cleanup
```
The diagram shows the three entry points of a single descriptor object.

## 9. The memory technique

1. **The hook** — Picture a security checkpoint: the attribute name is the gate, the property methods are the guards that inspect every traveller.  
2. **What to overlearn** — The three decorator forms `@property`, `@name.setter`, `@name.deleter` and the rule that the backing field must differ in spelling.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by writing an ordinary getter/setter pair, then mechanically wrap the getter with `@property` and rename the setter with `@name.setter`.

## 10. What this unlocks
Properties are the foundation of Python’s descriptor protocol and therefore of many advanced mechanisms: `dataclasses.field`, ORM column descriptors in SQLAlchemy, and the managed-attribute machinery in GUI toolkits.

- Next: custom descriptors and `__set_name__`  
- `functools.cached_property`  
- Data classes with validation  
- Attribute interception via `__getattribute__`

## 11. Self-check — five questions, no answers
1. Write the shortest class that makes `obj.x = -1` raise an exception while still allowing `print(obj.x)`.  
2. What happens to `obj.__dict__['x']` after `obj.x = 3` when `x` is a property that stores under `_x`?  
3. Can a property be inherited? Demonstrate with a two-line subclass example.  
4. Identify the bug: a property getter that returns a freshly constructed list on every call.  
5. Convert the following pair of methods into an equivalent property definition without changing any call site:  
   `def get_balance(self): …` and `def set_balance(self, v): …`.