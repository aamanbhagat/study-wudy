## 1. The one-sentence answer
**In Python, `self` is the conventional name for the first parameter of every instance method; the interpreter automatically binds the calling object to this parameter at runtime.**

When you write `obj.method(arg)`, Python rewrites the call as `Class.method(obj, arg)` before executing the function body. The name `self` is not a keyword; any identifier works, yet the language and community have standardized on it so that every reader immediately recognizes the instance reference. This binding happens after the method is looked up on the class, which guarantees that the same function object can serve every instance without storing a separate copy inside each object.

The mechanism rests on descriptors: functions stored in a class dictionary are descriptor objects whose `__get__` method returns a bound method when accessed through an instance. The bound method closes over the instance and supplies it as the first argument when the callable is invoked.

> [!NOTE]
> The single most important realization is that `self` receives its value from the call site, not from any lexical scope inside the class definition; the parameter is ordinary and can be renamed, yet the automatic insertion of the instance is what makes methods behave as methods rather than plain functions.

## 2. Why this matters — concrete and current
In the Django web framework, every model class inherits from `django.db.models.Model`. When an instance method such as `save()` executes, Django relies on the automatic `self` binding to locate the primary-key value and the database connection that belongs to that exact row; without it, the ORM could not map an in-memory object to a specific SQL UPDATE statement.

Inside PyTorch, the `nn.Module` base class stores sub-modules and parameters in an instance dictionary. The `forward` method receives `self` so that it can traverse `self.children()` and execute the computation graph on the precise set of tensors that were registered during `__init__`. This pattern appears in every published research model from ResNet to Transformer implementations.

The CPython interpreter itself uses the identical mechanism when extension types expose methods. The `tp_methods` slot contains C function pointers that expect the instance pointer as the first argument; the Python-level `self` parameter is the direct analogue that allows pure-Python classes to interoperate seamlessly with the C API.

Semiconductor design tools written in Python, such as those used at TSMC for process-control scripts, define device classes whose methods must mutate per-instance state (voltage, temperature, yield statistics). The automatic `self` insertion lets engineers write `device.calibrate()` without ever passing the device handle explicitly, reducing both boilerplate and the chance of passing the wrong handle.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python function definition syntax | `def` statements create ordinary function objects that become methods only when stored inside a class. |
| Attribute lookup on instances | The dot operator triggers descriptor protocol that supplies the instance. |
| Distinction between class and instance | Methods live on the class; data lives on the instance.    |

## 4. Building the idea — from intuition to formalism

### Step 1 — A plain function becomes a method only when placed in a class
A function defined at module level receives every argument explicitly. Placing the identical function inside a class does not change the function object; it merely changes how the function is retrieved.

Example:
```python
def greet(x, name):
    return f"Hello, {name} from {x}"
class Greeter:
    hello = greet
```
Formal statement: if \(f\) is a function object stored in the class dictionary under key \(m\), then `instance.m` returns a bound method whose underlying function is still \(f\).

> [!WARNING]
> Treating the function as already “knowing” its instance leads to the false belief that `self` is injected at definition time rather than at call time.

### Step 2 — The descriptor protocol supplies the instance
Function objects implement `__get__`. When attribute lookup `obj.attr` finds a function in the class, `__get__` is invoked with the instance and returns a bound method.

Formal statement: \(\text{bound} = \text{func.__get__}(instance, owner)\).

> [!WARNING]
> Forgetting that `__get__` is called on the class attribute (not on the instance) produces confusion when the same method is accessed via the class versus via an instance.

### Step 3 — The bound method remembers the instance
The object returned by `__get__` stores a reference to the original instance. When the bound method is later called with additional arguments, the stored instance is prepended.

Formal statement: \(\text{bound}(a_1,\dots,a_n) \equiv \text{func}(instance, a_1,\dots,a_n)\).

> [!WARNING]
> Assuming that `self` is a local variable created inside the method body breaks when the method is extracted and called later as an unbound function.

### Step 4 — The name `self` is chosen by convention only
Nothing in the language enforces the spelling. The first parameter after binding receives whatever name appears in the `def` line.

Formal statement: the identifier occupying the first formal-parameter position is an ordinary local variable whose value is supplied by the descriptor machinery.

> [!WARNING]
> Using a different name in a subclass while the superclass still refers to `self` produces `NameError` or silent use of a global.

### Step 5 — `__init__` receives `self` exactly like any other method
The constructor is not special with respect to argument binding; Python first creates an empty instance and then calls `type.__call__`, which ultimately invokes `__init__(instance, …)`.

Formal statement: after allocation, `__init__.__get__(instance, cls)(*args)` is executed.

> [!WARNING]
> Returning a value other than `None` from `__init__` is allowed by the binding rule yet violates the language contract and is ignored by `type.__call__`.

### Step 6 — The textbook rule
When the attribute lookup `instance.name` yields a function defined in a class, Python automatically inserts `instance` as the first argument of any subsequent call to that function.

## 5. Worked examples — every step shown

**Example 1 — Minimal binding**
- *Given:*  
  ```python
  class C:
      def meth(self, x):
          return self, x
  obj = C()
  ```
- *Find:* value of `obj.meth(3)`.
- Step 1: `C.meth` is a function object.  
  *Why:* it was created by the `def` statement inside the class body.  
- Step 2: `obj.meth` invokes `function.__get__(obj, C)`, producing a bound method.  
  *Why:* the descriptor protocol is triggered by the dot operator.  
- Step 3: the bound method is called with argument `3`.  
  *Why:* the stored instance is prepended, yielding the call `meth(obj, 3)`.  
**Result:**  
**(<__main__.C object …>, 3)**

*Reflection:* The example isolates the binding step; the same pattern scales to any number of arguments.

**Example 2 — Renaming `self`**
- *Given:* the class above, plus `obj.meth2 = C.meth.__get__(obj, C)`.
- *Find:* result of `obj.meth2(7)`.
- Step 1: `meth2` is still bound to the same `obj`.  
  *Why:* `__get__` closed over `obj` at extraction time.  
**Result:**  
**(<__main__.C object …>, 7)**

*Reflection:* Demonstrates that the parameter name inside the function is irrelevant to the binding mechanism.

**Example 3 — Inheritance chain**
- *Given:*  
  ```python
  class Base:
      def show(self):
          return type(self).__name__
  class Derived(Base):
      pass
  d = Derived()
  ```
- *Find:* `d.show()`.
- Step 1: `Derived.__mro__` places `Base` after `Derived`.  
  *Why:* method resolution order determines where the function is found.  
- Step 2: lookup yields `Base.show`; `__get__` still receives `d`.  
  *Why:* the owner passed to `__get__` is the class on which the lookup began.  
**Result:**  
**'Derived'**

*Reflection:* The instance, not the class that defined the method, determines the value of `self`.

**Example 4 — Storing a method reference**
- *Given:* `f = obj.meth`; later `f(5)`.
- *Find:* result.
- Step 1: `f` holds the bound method created in Step 2 of Example 1.  
  *Why:* the closure created by `__get__` survives the attribute access.  
**Result:**  
**(<__main__.C object …>, 5)**

*Reflection:* Shows that the binding is not re-evaluated at the final call site.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting `self` in the `def` line | The programmer thinks of the method as a global function. | Always write the first parameter explicitly; let the linter flag missing arguments. |
| Calling `Class.method(instance, …)` with an instance of the wrong class | The binding rule still applies, yet the method may assume attributes that do not exist. | Use `isinstance` guards inside the method or rely on duck typing with clear documentation. |
| Assigning a function to an instance instead of the class | The function becomes an ordinary attribute; no descriptor is consulted. | Define methods inside the class body or use `@classmethod`/`staticmethod` when appropriate. |
| Using `self` before the instance is fully initialized in `__init__` | Attribute lookup occurs before all attributes are set. | Perform all attribute assignments before any method calls that rely on them. |
| Shadowing `self` with a local variable of the same name | Python treats the local name as shadowing the parameter. | Never reuse the identifier `self` for any other purpose inside a method. |
| Expecting `self` to be rebound when the method is called via `super()` | `super()` returns a proxy that still supplies the original instance. | Remember that `super()` only changes the starting point of the method search, not the value of `self`. |
| Deleting the method from the class after instances have been created | Existing bound methods retain their closed-over instance. | Treat methods as immutable once instances exist; prefer composition for dynamic behavior. |

## 7. The textbook-precise statement
A function object placed in a class dictionary acts as a non-data descriptor. When the attribute is retrieved through an instance, the descriptor’s `__get__` method is invoked with that instance; the returned bound method, when called, prepends the instance to the argument tuple before transferring control to the underlying function. (Ramalho, *Fluent Python*, 2e, §9.5 “Descriptors” and CPython source `Objects/funcobject.c`.)

## 8. Visual — diagram or schematic
```text
Class Dict
┌────────────────────┐
│ meth  →  <function>│   (implements __get__)
└────────────────────┘
          │
          │  obj.meth
          ▼
Bound Method
┌────────────────────┐
│ __self__ = obj     │
│ __func__ = meth    │
└────────────────────┘
          │
          │  bound(3)
          ▼
meth(obj, 3)   ← actual function call
```

## 9. The memory technique
1. **The hook** — Picture a courier who always writes the recipient’s address on the envelope before handing it to the delivery truck; the address (`self`) is supplied by the sender’s hand-off, not written inside the letter.
2. **What to overlearn** — (a) `obj.meth(arg)` is rewritten as `Class.meth(obj, arg)`; (b) the first formal parameter receives the instance; (c) the name `self` is arbitrary.
3. **Spaced-repetition schedule** — Review the rewrite rule after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive by writing a zero-argument function, storing it in a class, retrieving it via an instance, and inspecting the `__self__` attribute of the resulting bound method.

## 10. What this unlocks
Mastery of `self` binding is the prerequisite for understanding Python’s descriptor protocol, metaclasses, and the difference between instance, class, and static methods. It also enables correct use of `__getattr__`, properties, and decorators that wrap methods while preserving the implicit instance argument.

- Next: `__new__` versus `__init__`
- Next: `@classmethod` and `@staticmethod`
- Next: Implementing descriptors and the property built-in

## 11. Self-check — five questions, no answers
1. Write the shortest class whose instances, when their sole method is called, return the integer 42 without ever mentioning the literal 42 inside that method.
2. Predict the output of `type(C.meth)` versus `type(obj.meth)` for a simple class `C` and instance `obj`.
3. A programmer writes `def __init__(self): return self`. What value does `C()` actually return, and why?
4. Demonstrate a one-line assignment that moves a method from one instance to another so that calling the moved method still mutates the original instance’s state.
5. Construct a minimal counter-example showing that deleting an attribute from an instance does not affect the method resolution that supplies `self`.