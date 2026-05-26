## 1. The one-sentence answer
**Operator overloading through dunder methods lets you teach Python’s built-in operators how to work with objects of your own classes.**

Dunder methods are special methods whose names begin and end with double underscores. When you write `a + b`, Python actually looks for `a.__add__(b)`. By defining these methods inside a class you decide exactly what addition, equality, ordering or string conversion should mean for that class.

The same mechanism applies to `__eq__` for `==`, `__lt__` for `<`, `__len__` for `len()`, `__str__` and `__repr__` for printing, and `__hash__` for using objects inside sets or dictionaries. Without these methods your objects only support the default behaviour inherited from `object`.

> [!NOTE]
> The single most important realisation is that operators are just syntactic sugar; every operator call is ultimately a method call whose name you can override.

## 2. Why this matters — concrete and current
NumPy’s `ndarray` class implements `__add__`, `__mul__`, `__eq__` and many others so that `arr1 + arr2` runs compiled C loops instead of Python loops; this design choice powers the entire scientific Python stack used at CERN, NASA JPL and every major ML lab.

In the game engine Godot, the `Vector2` and `Vector3` classes overload `__add__`, `__mul__` and `__eq__` so that game-physics code reads like ordinary vector algebra; the same pattern appears in Unity’s C# maths library and in Apple’s SIMD framework.

The Python standard library’s `pathlib.Path` class defines `__truediv__` so that `Path("/home") / "user"` produces a new path object; this small overloading decision removed thousands of string-concatenation bugs across the ecosystem.

Pandas `DataFrame` and `Series` objects rely on `__getitem__`, `__setitem__` and rich comparison dunders to give users the familiar `df[df.age > 30]` syntax; the same overloaded operators are used inside scikit-learn pipelines and inside production feature stores at companies such as Uber and Airbnb.

Django’s ORM uses `__eq__`, `__lt__` and `__hash__` on its `Model` and `QuerySet` classes so that queryset comparisons and set operations remain consistent with Python’s data-model expectations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python class syntax  | You must be able to write `class MyType:` and define methods inside it. |
| `self` and instance attributes | Dunder methods almost always receive `self` and operate on the object’s own data. |
| Basic operator precedence | You need to know that `a + b * c` is evaluated as `a + (b * c)` before you overload the operators. |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Python already calls methods for every operator
When you write `x + y`, the interpreter rewrites it as `type(x).__add__(x, y)`.  
Concrete example: `3 + 4` is executed as `int.__add__(3, 4)`.  
Formal statement:  
$$x \oplus y \;\equiv\; \texttt{type}(x).\texttt{\_\_}\oplus\texttt{\_\_}(x,y)$$  
> [!WARNING]  
> If the left operand does not implement the method, Python tries the reflected method on the right operand; forgetting this rule produces surprising “unsupported operand” errors.

### Step 2 — Define `__add__` to give meaning to `+`
Inside your class write `def __add__(self, other): …`. Return a new instance that represents the sum.  
Example: a 2-D `Vector` class.  
Formal contract: `__add__` must accept an `other` of compatible type and return an object of the same type (or raise `TypeError`).

### Step 3 — Implement `__eq__` for value equality
`def __eq__(self, other): return self.x == other.x and self.y == other.y`.  
This replaces the default identity comparison.

### Step 4 — Add ordering with `__lt__`
`def __lt__(self, other): return (self.x, self.y) < (other.x, other.y)`.  
Once `__lt__` exists, Python can synthesise the other three ordering operators via the `@functools.total_ordering` decorator.

### Step 5 — Support `len()` with `__len__`
Return an integer that represents the “size” of the object, e.g., number of elements in a custom list wrapper.

### Step 6 — Control printing with `__str__` and `__repr__`
`__str__` should be human-readable; `__repr__` must be unambiguous and, when possible, a valid Python expression that recreates the object.

### Step 7 — Decide hashability with `__hash__`
If a class defines `__eq__`, it must also define `__hash__` (or explicitly set `__hash__ = None`) to keep the object usable in sets and as dictionary keys. The invariant is:  
$$a = b \implies \texttt{hash}(a) = \texttt{hash}(b)$$

### Step 8 — Textbook-grade statement
A class may overload any operator by implementing the corresponding dunder method; the method receives `self` and the other operand, must return an appropriate value or `NotImplemented`, and must obey the algebraic contracts expected by the language (commutativity is not automatic, reflexivity of equality must be preserved, etc.).

## 5. Worked examples — har step show karo

**Example 1 — Minimal Vector addition**  
*Given:*  
```python
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
```
*Find:* Make `v1 + v2` return a new `Vector`.  
Step 1: add the method  
```python
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
```  
*Why:* The body computes component-wise sum and returns a fresh instance so the original objects stay unchanged.  
**Final answer**  
```python
v = Vector(1, 2) + Vector(3, 4)   # Vector(4, 6)
```

**Example 2 — Equality and hash together**  
*Given:* the same `Vector`.  
*Find:* Make `v1 == v2` compare values and allow vectors inside a `set`.  
Step 1: define equality  
```python
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
```  
Step 2: define hash consistently  
```python
    def __hash__(self):
        return hash((self.x, self.y))
```  
*Why:* Equal objects must produce equal hashes; using a tuple of coordinates satisfies the contract.  
**Final answer**  
```python
s = {Vector(1, 2), Vector(1, 2)}   # set contains only one element
```

**Example 3 — Ordering with `__lt__`**  
*Given:* `Vector` with `__eq__` already present.  
*Find:* `v1 < v2` should compare lexicographically.  
```python
    def __lt__(self, other):
        return (self.x, self.y) < (other.x, other.y)
```  
**Final answer**  
```python
Vector(1, 0) < Vector(1, 1)   # True
```

**Example 4 — `__len__`, `__str__`, `__repr__`**  
*Given:* a `Bag` that stores items in a list.  
```python
class Bag:
    def __init__(self, items):
        self.items = list(items)
    def __len__(self):
        return len(self.items)
    def __str__(self):
        return f"Bag({len(self)} items)"
    def __repr__(self):
        return f"Bag({self.items!r})"
```  
**Final answer**  
```python
b = Bag([1, 2, 3])
len(b)      # 3
print(b)    # Bag(3 items)
repr(b)     # Bag([1, 2, 3])
```

*Reflection:* Each example isolates one dunder so the mapping from operator to method stays obvious; the same pattern generalises to any new operator you need.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Implementing `__eq__` but leaving `__hash__` at its default | Students forget that equality changes the hash contract | Always write `__hash__ = None` when the object is mutable or implement a consistent `__hash__` |
| Returning `None` from `__add__` instead of a new object | Intuitive mistake of thinking “modify in place” | Always `return` a fresh instance; never mutate `self` unless the operator is explicitly in-place (`__iadd__`) |
| Using `is` inside `__eq__` for value objects | Confusion between identity and equality | Compare actual attributes, never object identity, unless you truly want identity semantics |
| Forgetting to handle `NotImplemented` when types differ | Overloaded method assumes the other operand is always the same class | Return `NotImplemented` instead of raising `TypeError` so Python can try the reflected operator |
| Defining `__str__` but not `__repr__` | Belief that one printing method is enough | Always implement `__repr__`; `__str__` falls back to `__repr__` automatically |
| Breaking symmetry of `__lt__` and `__gt__` | Writing only one ordering method | Use `@functools.total_ordering` or implement the full rich-comparison set |
| Hashing a mutable attribute | Changing the object after it enters a set or dict | Make sure hashed fields are immutable or document that mutation invalidates hash-based containers |

## 7. The textbook-precise statement
“A user-defined class can intercept any of Python’s operators by defining a method whose name is of the form `__op__`. The interpreter translates an expression `x op y` into the method call `type(x).__op__(x, y)` (or the reflected method on `y` when appropriate). The method must return a value of the expected type or the singleton `NotImplemented`; it must also satisfy the usual mathematical identities required by the operator (e.g., `a == a` for equality, transitivity of `<`).” — Ramalho, *Fluent Python*, 2nd ed., Chapter 13, “Operator Overloading”.

## 8. Visual — diagram or schematic
```
          user code
              |
              v
   a + b   -->  type(a).__add__(a, b)
              |
       +------+------+
       |             |
   returns        returns
   result      NotImplemented
       |             |
       v             v
   done      try type(b).__radd__(b, a)
```

## 9. The memory technique

1. **The hook** — Picture each dunder method as a tiny wizard living inside the class; when Python shouts “add!”, the `__add__` wizard wakes up and performs the spell.  
2. **What to overlearn** — The seven method names listed in the title, the fact that `a == b` calls `__eq__`, and the invariant “equal objects must share the same hash”.  
3. **Spaced-repetition schedule** — Review the seven names after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — If you forget a name, write the operator on paper, replace the symbol with the word “dunder”, wrap it in double underscores, and you will reconstruct the method name.

## 10. What this unlocks
Once you master dunder methods you can create domain-specific types that feel native to Python—matrices that multiply with `*`, quantities with units that refuse to add metres to seconds, and immutable value objects that behave correctly inside sets and dictionaries.  

- Next topics: dataclasses and `attrs` (they generate many dunders for you)  
- Context managers (`__enter__`, `__exit__`)  
- Descriptor protocol (`__get__`, `__set__`)  
- Abstract base classes that declare which dunders a type must implement

## 11. Self-check — five questions, no answers
1. Write a `Duration` class that supports `d1 + d2` and `d1 == d2` while keeping objects immutable.  
2. What happens if you implement `__eq__` but set `__hash__ = None` and then try to put an instance into a `set`?  
3. Why does `Vector(1, 2) + 5` raise `TypeError` even after you defined `__add__`?  
4. Show the exact method call that Python performs for the expression `len(my_bag)`.  
5. A colleague’s class defines `__lt__` but comparisons `a <= b` still raise `TypeError`. Identify the missing piece.