## 1. The one-sentence answer
**Instance methods, class methods, and static methods are three distinct callable descriptors attached to a Python class that differ solely in the implicit first argument they receive at call time.**

An ordinary function defined inside a class becomes an instance method because the descriptor protocol automatically inserts the instance as the first argument, conventionally named `self`. This gives the method direct access to per-object state.  

A method decorated with `@classmethod` receives the class itself as the first argument, conventionally named `cls`. The call can therefore originate from either the class or any instance, yet the method never sees an individual object.  

A method decorated with `@staticmethod` receives no implicit first argument at all. It behaves exactly like a namespaced function whose only connection to the class is lexical.  

> [!NOTE]
> The distinction is not about what the method *does* but about what Python *binds* before the body executes; once you see the binding, every usage rule follows mechanically.

## 2. Why this matters — concrete and current
In the CPython implementation of `enum.Enum`, `@classmethod` factories such as `_missing_` are invoked on the enum class itself to synthesise new members at import time; without the class argument the factory could not register the new member on the correct enumeration type.  

PyTorch’s `torch.nn.Module` uses `@staticmethod` for device-agnostic helper routines such as `_check_input_dim`; these helpers must be callable on both the class and instances yet must never accidentally capture an instance’s parameter buffers.  

Django’s ORM defines `QuerySet.as_manager` as a `@classmethod` so that custom managers can be attached to the model class without requiring an instance, allowing `Model.objects` to remain a class-level object throughout the request–response cycle.  

In semiconductor design verification, the `cocotb` framework attaches `@staticmethod` monitors to `dut` classes; the monitors run without an instance context, eliminating the risk of leaking per-testbench state across thousands of parallel simulations on AWS EC2 F1 instances.  

Google’s JAX library exposes `jax.jit` as a `@staticmethod`-style transformation on `jax.Array` so that the same compiled kernel can be applied to both traced arrays and concrete values without ever materialising an implicit `self`.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python function definition and argument binding | Establishes the baseline before any descriptor intervenes |
| Decorator syntax (`@`)   | The mechanism that replaces the function with a descriptor object |
| Basic class statement    | The namespace in which these three descriptors are stored |
| Attribute lookup rules   | Explains why `obj.method` and `Class.method` produce different bound objects |

## 4. Building the idea — from intuition to formalism

### Step 1 — Ordinary function inside a class
A function defined in a class body is stored as a plain function object. When the attribute is read through an instance, the descriptor protocol wraps it so the instance becomes the first argument.  
```python
class C:
    def f(self): ...
```
Formally, the descriptor’s `__get__` returns a bound method whose `im_func` is the original function and whose `im_self` is the instance.  
> [!WARNING]
> If you call `C.f()` without an instance you receive a TypeError because no implicit argument is supplied.

### Step 2 — The `@classmethod` descriptor
`classmethod` is a non-data descriptor whose `__get__` returns a bound method whose `im_self` is the class rather than the instance.  
```python
class C:
    @classmethod
    def g(cls): ...
```
The call `C.g()` or `c.g()` both pass `C` as the first argument.  
> [!WARNING]
> Using `self` instead of `cls` inside the body does not raise an error; it silently receives the class object, leading to subtle attribute-name collisions later.

### Step 3 — The `@staticmethod` descriptor
`staticmethod` is a descriptor that returns the underlying function unchanged, performing no argument insertion.  
```python
class C:
    @staticmethod
    def h(): ...
```
Both `C.h()` and `c.h()` receive zero implicit arguments.  
> [!WARNING]
> Because no binding occurs, any attempt to rely on `self` or `cls` inside the body produces a NameError at runtime.

### Step 4 — Descriptor precedence and inheritance
All three descriptors are looked up on the class. Subclasses inherit the descriptors; each subclass therefore receives its own class object when a `@classmethod` is invoked through the subclass.  
> [!WARNING]
> Overriding a `@classmethod` in a subclass without re-applying the decorator replaces the descriptor with a plain function, breaking class-level calls.

### Step 5 — Textbook statement
A method declared without decorators is an **instance method**; one wrapped by `classmethod` is a **class method**; one wrapped by `staticmethod` is a **static method**. Their binding behaviour is completely determined by the descriptor returned by `__get__` on attribute access.

## 5. Worked examples — every step shown

**Example 1 — Minimal differentiation**  
*Given:*  
```python
class Demo:
    def inst(self): return "inst"
    @classmethod
    def cls_(cls): return "cls"
    @staticmethod
    def stat(): return "stat"
```
*Find:* the three return values when called via an instance.  
Step 1: `d = Demo()` — create instance. *Why:* need an object to trigger descriptors.  
Step 2: `d.inst()` inserts `d` as `self`. *Why:* default descriptor behaviour.  
Step 3: `d.cls_()` inserts `Demo` as `cls`. *Why:* `classmethod.__get__` supplies the class.  
Step 4: `d.stat()` supplies nothing. *Why:* `staticmethod.__get__` returns the raw function.  
**"inst", "cls", "stat"**

*Reflection:* The example isolates binding; nothing else can explain why three syntactically similar definitions produce three different argument lists.

**Example 2 — Factory via class method**  
*Given:* a class that must count its instances.  
*Find:* a `@classmethod` alternative constructor.  
Step 1: `class Counter: _total = 0`. *Why:* class state lives on the class.  
Step 2: `@classmethod def from_string(cls, s):`. *Why:* we need the class to call `__new__`.  
Step 3: `obj = cls(); cls._total += 1; return obj`. *Why:* `cls` guarantees the correct subclass is instantiated.  
**Counter.from_string("x") increments Counter._total**

*Reflection:* Using `cls` instead of hard-coding `Counter` makes the factory safe under inheritance.

**Example 3 — Utility that must not touch state**  
*Given:* temperature conversion that belongs logically to a `Temp` class yet never needs data.  
*Find:* correct decorator.  
Step 1: `@staticmethod def c_to_f(c): return c*9/5+32`. *Why:* no `self` or `cls` is required.  
Step 2: Call as `Temp.c_to_f(0)`. *Why:* staticmethod allows class-level call without instance creation.  
**32.0**

*Reflection:* The method could live outside the class; the decorator merely provides namespacing.

**Example 4 — Inheritance interaction**  
*Given:* subclass overrides a class method.  
*Find:* which class object is received.  
Step 1: `class Base: @classmethod def who(cls): return cls.__name__`.  
Step 2: `class Sub(Base): pass`.  
Step 3: `Sub.who()` returns `"Sub"`. *Why:* descriptor lookup on `Sub` supplies `Sub` as `cls`.  
**"Sub"**

*Reflection:* The binding follows the actual class used for the lookup, not the class that originally defined the method.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting `self` in an instance method | Python still inserts the argument; signature mismatch | Always write the first parameter explicitly |
| Naming the class-method argument `self` | Works but hides the fact that a class is received | Consistently use `cls` for class methods     |
| Calling a static method with an instance and expecting state | No binding occurs, so instance attributes are invisible | Reserve `@staticmethod` for pure functions   |
| Overriding a `@classmethod` without re-decorating | The subclass stores a plain function        | Re-apply `@classmethod` in every override    |
| Using `@staticmethod` for methods that later need class data | Changing decorator later breaks all call sites | Start with `@classmethod` if any future use of `cls` is conceivable |
| Assuming `@classmethod` can modify instance `__dict__` | Only the class is supplied                  | Access `cls.__dict__` or iterate instances explicitly |
| Shadowing a method name with a same-named static variable | Attribute lookup finds the variable first   | Keep method and data names in separate namespaces |

## 7. The textbook-precise statement
In Python, a function object placed directly inside a class body is stored as a descriptor whose `__get__` returns a bound method that inserts the instance as the first positional argument (instance method). The `classmethod` type is a descriptor whose `__get__` returns a bound method that inserts the class of the instance (or the class itself) as the first argument. The `staticmethod` type is a descriptor whose `__get__` returns the original function unchanged. These behaviours are defined in the CPython implementation of `Objects/funcobject.c` and `Objects/descrobject.c` and are documented in the language reference under “Instance methods” and “Functions and methods”.

## 8. Visual — diagram or schematic
```text
Class Demo
+---------------------------+
| __dict__                  |
|   inst  -> function       |  --(descriptor)--> bound method(self)
|   cls_  -> classmethod    |  --(descriptor)--> bound method(cls)
|   stat  -> staticmethod   |  --(descriptor)--> raw function
+---------------------------+
Lookup path:
Demo.inst   -> Demo.__dict__['inst'].__get__(None, Demo)
demo.inst   -> Demo.__dict__['inst'].__get__(demo, Demo)
```
The diagram shows that only the descriptor object decides whether an argument is inserted and what that argument is.

## 9. The memory technique
1. **The hook** — Picture three doors on a single class-shaped building: the Instance door hands you a person (`self`), the Class door hands you the building blueprint (`cls`), and the Static door hands you nothing—just a toolbox.  
2. **What to overlearn** — `@classmethod` always receives the class; `@staticmethod` receives nothing; only an undecorated method receives the instance.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “What object, if any, must Python supply before my first line executes?”

## 10. What this unlocks
Mastery of the three method types is the prerequisite for writing clean factories, alternative constructors, and stateless utilities that survive inheritance and metaclass intervention.  

- Polymorphic class factories in abstract base classes  
- Custom descriptors and `__get__` overrides  
- Metaclass `__prepare__` and `__new__` patterns  
- Django model managers and SQLAlchemy hybrid properties  
- Registration decorators in plugin architectures  

## 11. Self-check — five questions, no answers
1. What single line of code demonstrates that `C.m` and `c.m` are not the same object when `m` is an instance method?  
2. A subclass overrides a `@classmethod` but omits the decorator; predict the runtime error when the method is called on the subclass.  
3. Write the shortest decorator that turns any method into a static method without using `@staticmethod`.  
4. In a class containing one instance method, one class method, and one static method, which of the three can safely be moved outside the class without changing observable behaviour?  
5. Given `class A: @classmethod def f(cls): return cls(); class B(A): pass`, what is the exact type of the object returned by `B.f()`?