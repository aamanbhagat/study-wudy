## 1. The one-sentence answer
**An abstract base class (ABC) is a class that cannot be instantiated and exists solely to declare a required interface that all concrete subclasses must implement.**

An abstract base class solves the problem of ensuring that every subclass supplies certain methods. Without it, a developer can inherit from a parent and simply omit a critical method; the omission is discovered only later, at runtime, when the missing method is called. The ABC mechanism moves that discovery to class-definition time by marking selected methods as abstract.

In Python the mechanism lives in the `abc` module. A class inherits from `ABC` (or registers itself via `ABCMeta`) and decorates one or more methods with `@abstractmethod`. The interpreter then refuses to create instances of any subclass that has not overridden every abstract method.

> [!NOTE]
> The decisive insight is that `@abstractmethod` turns a missing method from a runtime `AttributeError` into an immediate `TypeError` at the moment the incomplete subclass is defined.

## 2. Why this matters — concrete and current
In scikit-learn every estimator must implement `fit` and `predict`. The library’s `BaseEstimator` and `ClassifierMixin` inherit from `ABC`; any custom model that forgets `fit` raises `TypeError` the instant the class body is executed, long before any cross-validation loop runs.

Django’s ORM declares `Model` as an abstract base containing abstract methods for database operations. Third-party database backends (PostgreSQL, MySQL, SQLite) must supply concrete implementations; the framework detects missing methods at import time rather than during a production migration.

In semiconductor design tools written in Python, an abstract `Device` base class forces every technology node (7 nm, 5 nm, 3 nm) to provide `extract_parasitics` and `power_analysis`. Missing either method aborts the build script before expensive netlist generation begins.

Aerospace simulation frameworks such as NASA’s OpenMDAO define an abstract `Component` whose `compute` method must be overridden. Subclasses representing different physical disciplines are therefore guaranteed to expose the exact interface the Newton solver expects.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class and inheritance| ABCs are classes that participate in the same inheritance graph |
| Method resolution order | Determines which implementation of an abstract method is actually used |
| `type` and metaclasses | `ABCMeta` is the metaclass that enforces the abstract contract at class creation time |

## 4. Building the idea — from intuition to formalism

### Step 1 — A concrete class may be incomplete
A normal subclass can omit any method it does not need.  
```python
class Animal:
    def speak(self): ...
class Cat(Animal):
    pass
c = Cat()          # succeeds
c.speak()          # AttributeError only now
```
Formally, Python records no obligation on `Cat`:
$$
\text{interface}(Cat) \supseteq \emptyset
$$
> [!WARNING]
> If you assume the parent’s methods are automatically required, you will ship classes that crash only in production.

### Step 2 — Mark a method as required
Decorating a method with `@abstractmethod` tells the metaclass that the method must be overridden.
```python
from abc import ABC, abstractmethod
class Animal(ABC):
    @abstractmethod
    def speak(self): ...
```
The formal statement now becomes
$$
\text{interface}(Animal) \supseteq \{\text{speak}\}
$$

### Step 3 — The metaclass records the obligation
`ABCMeta` maintains a set `__abstractmethods__`. While the set is non-empty, the class remains uninstantiable.

### Step 4 — Subclassing removes the obligation
Providing a concrete definition removes the method name from `__abstractmethods__`:
```python
class Cat(Animal):
    def speak(self): return "meow"
```
Now
$$
\text{interface}(Cat) \supseteq \{\text{speak}\} \quad \text{and} \quad |\text{__abstractmethods__}|=0
$$

### Step 5 — Instantiation is gated by the empty-set condition
Python’s `type.__call__` checks the set before allocating memory; a non-empty set raises `TypeError`.

### Step 6 — Registration allows retroactive compliance
A class that cannot inherit from the ABC may still be registered:
```python
Animal.register(Cat)
```
This adds the class to the ABC’s virtual-subclass registry without altering its MRO.

### Step 7 — The textbook statement
A class `C` is concrete with respect to ABC `A` if and only if every abstract method declared in `A` (directly or via inheritance) has a concrete implementation in `C` or in one of its bases that precedes `A` in the MRO.

## 5. Worked examples — every step shown

**Example 1 — Minimal ABC**  
*Given:* an abstract `Shape`.  
*Find:* whether `Circle` can be instantiated.  
```python
from abc import ABC, abstractmethod
class Shape(ABC):
    @abstractmethod
    def area(self): ...
class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14*self.r**2
c = Circle(2)
```
*Why* the first line succeeds: `Shape` inherits from `ABC`.  
*Why* `Circle` may be instantiated: its `__abstractmethods__` set is empty after `area` is defined.  
**Circle(2) succeeds**

*Reflection:* The example isolates the single required method; any additional concrete methods would not affect the outcome.

**Example 2 — Missing method**  
*Given:* the same `Shape`.  
*Find:* result of defining `Square` without `area`.  
```python
class Square(Shape):
    def __init__(self, s): self.s = s
s = Square(3)   # TypeError
```
*Why* the error occurs: `Square` never removed `"area"` from the abstract set.  
**TypeError: Can't instantiate abstract class Square with abstract method area**

*Reflection:* The error appears at the call site of the constructor, not later.

**Example 3 — Multiple abstract methods**  
*Given:* `Drawable` requiring both `draw` and `serialize`.  
A subclass supplying only `draw` remains abstract.

**Example 4 — Virtual subclass via register**  
*Given:* an existing `LegacyCircle` that implements `area` but does not inherit from `Shape`.  
After `Shape.register(LegacyCircle)`, `isinstance(LegacyCircle(), Shape)` returns `True` even though no inheritance link exists.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to inherit from `ABC` | The `@abstractmethod` decorator alone does not register the metaclass | Always write `class X(ABC):` or `metaclass=ABCMeta` |
| Placing `@abstractmethod` on a property setter only | The decorator must be the outermost on the abstract definition | Decorate the abstract property itself, then add concrete setter |
| Assuming `super().abstract_method()` is required | Abstract methods need not be called; they only declare an interface | Call super only when an actual cooperative implementation exists |
| Using `@abstractmethod` inside a concrete class | The decorator has no effect unless the class ultimately inherits from `ABC` | Move the abstract method to an ABC base |
| Checking `hasattr(obj, 'method')` instead of `isinstance(obj, ABC)` | Registration and virtual inheritance are invisible to `hasattr` | Use `isinstance` or `issubclass` for interface checks |
| Defining `__init__` in an ABC and expecting subclasses to call it | Abstract classes are never instantiated, so `__init__` may be omitted | Provide `__init__` only when the ABC holds shared state |
| Mixing `@abstractmethod` with `__slots__` incorrectly | Slots interact with the metaclass; abstract slots must be declared carefully | Declare slots in the concrete leaf class |

## 7. The textbook-precise statement
A class `C` is an abstract base class if `isinstance(C, ABCMeta)` and the set `C.__abstractmethods__` is non-empty. A concrete subclass `D` of `C` satisfies
$$
\forall m \in C.\_\_abstractmethods\_\_,\; m\text{ is implemented in }D\text{ or an ancestor of }D\text{ that precedes }C\text{ in }D\text{'s MRO}.
$$
Instantiation of any class whose `__abstractmethods__` is non-empty raises `TypeError`. (See Python documentation, “abc — Abstract Base Classes”, and Ramalho, *Fluent Python*, 2e, Chapter 13.)

## 8. Visual — diagram or schematic
```text
          ABC (metaclass=ABCMeta)
               |
        +------+------+
        |             |
   Animal(ABC)     Shape(ABC)
   speak()*        area()*
        |             |
      Cat          Circle
     speak()       area()
```
`*` marks abstract methods. Solid arrows denote inheritance. Only leaves without asterisks are instantiable.

## 9. The memory technique
1. **The hook** — Picture a building blueprint stamped “ABSTRACT — DO NOT BUILD” until every required room (method) has been drawn by a concrete architect.
2. **What to overlearn** — `@abstractmethod` must appear inside a subclass of `ABC`; the resulting `__abstractmethods__` set must be empty before `()` succeeds.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing a plain class, omitting a method, then observing the late `AttributeError`; insert `ABC` and the decorator to move the error earlier.

## 10. What this unlocks
Abstract base classes give you enforceable interfaces, which are prerequisites for mixin composition, structural subtyping via `Protocol`, and reliable plugin architectures.

- Mixin classes that combine multiple ABCs
- `collections.abc` container interfaces (`Iterable`, `Mapping`, …)
- Static type checkers that treat ABCs as structural contracts
- Plugin registries that accept any registered virtual subclass

## 11. Self-check — five questions, no answers
1. What single line of code turns a normal method into a requirement that prevents instantiation?
2. If a subclass overrides an abstract method with another abstract method, is the subclass concrete?
3. Why does `isinstance(x, ABC)` return `True` for an object whose class never inherited from `ABC`?
4. Show the exact `TypeError` message produced when attempting to instantiate a class that still lists two abstract methods.
5. A developer places `@abstractmethod` above a concrete implementation inside a non-ABC class. At what moment, if any, does Python complain?