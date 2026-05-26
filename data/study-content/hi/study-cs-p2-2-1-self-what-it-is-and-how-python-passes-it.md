## 1. The one-sentence answer
**Self is simply the conventional name given to the first parameter of every instance method in Python; the interpreter automatically binds the calling object to this parameter at runtime.**

When you write `obj.method(arg)`, Python rewrites the call behind the scenes as `Class.method(obj, arg)`. The name `self` is not a keyword; it is a strong convention that every Python programmer follows so that the binding remains obvious. Because the binding happens at call time rather than definition time, the same function object can be used by many instances, each receiving its own reference through the first slot.

This mechanism is how Python achieves the “object-oriented” illusion without hidden global state. Every attribute lookup that begins with `self.` resolves against the concrete instance that was passed in, giving each object its own identity and mutable state.

> [!NOTE]
> The single most important realisation is that `self` is not “the object talking about itself”; it is the object being handed to the method by the interpreter. Once you see the explicit `Class.method(instance, ...)` form, every later OOP feature (inheritance, descriptors, metaclasses) becomes mechanical rather than magical.

## 2. Why this matters — concrete and current
In the CPython implementation used by PyTorch, every tensor method receives the tensor instance as `self`; the C-level tensor object is then mutated or returned without any extra lookup table.  

Django’s ORM builds model instances at query time; when you later call `instance.save()`, the `save` method receives that exact row-backed object through `self`, allowing it to decide whether to issue an `INSERT` or an `UPDATE` based on the primary-key value stored inside the instance.  

In the game engine Godot’s Python bindings, every node script method is called with the node itself as `self`; this lets a single script file control thousands of instantiated nodes, each carrying its own position and child list.  

NumPy’s `__array_ufunc__` protocol passes the array as `self` so that ufunc dispatch can decide whether to fall back to the Python method or to a compiled loop, which is why `np.sin(my_array)` works without the user ever writing an explicit loop.  

The same binding rule powers the descriptor protocol inside Python’s own `property` and `classmethod` machinery; without automatic `self` insertion, descriptors would need an entirely different calling convention.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Function vs method   | Distinguishes bare functions from functions stored on a class |
| Instance vs class    | Clarifies that each object carries its own `__dict__`     |
| Python’s call syntax | Explains how `obj.m()` is rewritten before the function runs |

If any row is unfamiliar, pause and read the corresponding section on functions and classes first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A bare function becomes a method only when stored on a class
A plain function defined inside a class body is still just a function; nothing special happens at definition time.  
```python
class C:
    def f(x):          # still a normal function
        return x
```
When the name `f` is looked up on the class, Python returns a plain function object. Only the act of accessing it through an instance later triggers the binding.

> [!WARNING]
> Treating the first parameter as optional at definition time will later produce `TypeError: f() takes 1 positional argument but 2 were given` the moment you call it on an instance.

### Step 2 — Attribute lookup on an instance inserts the instance automatically
When you write `obj.f`, Python first finds the function in the class, then wraps it in a bound-method object that already knows `obj`. The bound method is what finally receives the remaining arguments.

### Step 3 — Explicit form reveals the hidden argument
The call `obj.f(3)` is exactly equivalent to `C.f(obj, 3)`. Demonstrating both forms side-by-side removes any remaining ambiguity.

### Step 4 — The name `self` is only a convention, not syntax
Nothing prevents you from writing `def f(me, x):`; the interpreter never inspects the parameter name. The convention exists solely for readability and for tools that generate documentation.

### Step 5 — Binding occurs at call time, not at definition time
Because binding is performed on every attribute access, the same function object can serve every instance that will ever be created, each time receiving a fresh reference through the first parameter.

### Step 6 — Textbook-grade statement
When the attribute lookup `type(instance).__dict__[name]` yields a function, Python returns a bound method whose `im_func` is the original function and whose `im_self` is the instance; subsequent invocation then executes `im_func(im_self, *args, **kwargs)`.

## 5. Worked examples — har step show karo

**Example 1 — Minimal explicit call**  
*Given:*  
```python
class Point:
    def reset(p):
        p.x = 0
        p.y = 0
p = Point()
```
*Find:* the exact call that sets coordinates to zero.  
`Point.reset(p)` is executed directly.  
*Why:* we bypass the instance lookup so the binding rule is visible.  
**Final answer**  
`p.x == 0 and p.y == 0`

*Reflection:* the example is trivial yet proves that no magic occurs beyond ordinary argument passing.

**Example 2 — Conventional `self`**  
*Given:* the same class rewritten with the conventional name.  
*Find:* output of `p.reset()`.  
Python rewrites the call to `Point.reset(p)`; the rest is identical.  
*Why:* demonstrates that only the spelling changed, not the semantics.  
**Final answer**  
Coordinates become zero exactly as before.

*Reflection:* students often believe the word `self` carries special status; this example isolates the spelling from the mechanism.

**Example 3 — Two instances, one method object**  
*Given:*  
```python
p1, p2 = Point(), Point()
print(Point.reset is p1.reset.__func__)
```
*Find:* the printed value.  
Both lookups return the identical function object stored in the class dict.  
*Why:* proves that binding creates a fresh wrapper each time but never duplicates the underlying code.  
**Final answer**  
`True`

*Reflection:* memory is saved because the function lives only once.

**Example 4 — Forgetting `self` in a longer signature**  
*Given:*  
```python
class Bad:
    def move(self, dx, dy):
        self.x += dx
b = Bad()
b.move(1, 2)          # works
Bad.move(b, 1)        # missing dy
```
*Find:* the exception raised by the second call.  
`TypeError: move() missing 1 required positional argument: 'dy'`.  
*Why:* the explicit form still demands every declared parameter after the instance.  
**Final answer**  
`TypeError`

*Reflection:* the trap appears only when mixing implicit and explicit styles.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Omitting `self` in def            | Habit from other languages                  | Always write the first parameter explicitly  |
| Calling `self.method` inside `__init__` before super | MRO not yet established                     | Call `super().__init__()` first              |
| Storing a method in a variable then calling it later | Bound method keeps a reference to the original instance | Keep the instance alive or use `functools.partial` |
| Using `self` as a variable name elsewhere | Shadowing the parameter                     | Reserve `self` exclusively for the first parameter |
| Forgetting that `classmethod` receives the class, not the instance | Confusing `cls` with `self`                 | Use `@classmethod` and name the first parameter `cls` |
| Deleting an instance while a bound method is still referenced | Weak reference not taken                    | Use `weakref` when caching bound methods     |
| Overriding `__getattribute__` and breaking method lookup | Infinite recursion or lost binding          | Never override `__getattribute__` lightly    |

## 7. The textbook-precise statement
In Python, a function defined inside a class body is stored in the class dictionary as an ordinary function. When attribute lookup of the form `instance.name` finds such a function, the language returns a new bound-method object whose `.__func__` attribute holds the original function and whose `.__self__` attribute holds the instance. Invocation of the bound method with arguments `args` then executes `func(instance, *args)`. This rule is stated formally in the Python Language Reference, version 3.12, §3.3.2.1 (“Instance Methods”) and is implemented in CPython’s `Objects/classobject.c` (`method_new` and `method_call`).

## 8. Visual — diagram or schematic
```text
Class C
+-------------+
| __dict__    |
|   f -> func |------->  function object
+-------------+            (code, defaults, …)
          ^
          |   lookup
Instance obj
+-------------+
| __dict__    |
|   ...       |
+-------------+
          |
          |  obj.f   produces
          v
   bound_method
   .__self__ = obj
   .__func__ = func
          |
          |  bound_method(3)
          v
   func(obj, 3)   <-- actual execution
```

## 9. The memory technique
1. **The hook** — picture a receptionist handing a visitor’s coat (the instance) to the coat-check clerk (the method) before any work begins; the clerk never walks into the cloakroom unaccompanied.  
2. **What to overlearn** — every instance method must declare at least one parameter; the first parameter always receives the instance; the name is conventionally `self`.  
3. **Spaced-repetition schedule** — review the explicit rewrite `Class.method(obj, …)` after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — if you forget the rule, write the call both ways (`obj.m()` and `Class.m(obj)`) and compare results; the two forms must be identical.

## 10. What this unlocks
Understanding `self` binding is the prerequisite for descriptors, properties, metaclasses, and the descriptor protocol used by `staticmethod` and `classmethod`. It also explains why `super()` works, why `__slots__` interacts with instance dictionaries, and how multiple inheritance resolves method calls without duplicating code.

- Next topics that rest directly on this mechanism: inheritance and method resolution order, descriptors and the `@property` decorator, metaclasses and `__new__`, slots versus `__dict__`.

## 11. Self-check — five questions, no answers
1. Write the exact expression that Python executes when you type `p = Point(3,4); p.distance_to_origin()`.  
2. A function defined at module level is later assigned to a class attribute. Does it receive an automatic first argument when called through an instance?  
3. Predict the output of `type(p.reset)` where `p` is an instance of `Point`.  
4. What single change turns a method back into a plain function that can be called without an instance?  
5. Construct a minimal counter-example that demonstrates a `TypeError` caused solely by an incorrect assumption about when `self` is inserted.