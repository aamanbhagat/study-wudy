## 1. The one-sentence answer
**A decorator is a callable that accepts a function, augments or replaces its behaviour, and returns a new callable that is usually assigned back to the original name.**

Python treats functions as first-class objects, so any callable can be passed around exactly like an integer or a list. When you write `@decorator` above a function definition, Python simply passes the freshly created function object to the decorator and rebinds the name to whatever the decorator returns. This mechanism lets you inject logging, timing, authentication, or caching without touching the body of the original function.

The `@` syntax is pure syntactic sugar; the expression `func = decorator(func)` produces identical bytecode. The `wraps` helper from `functools` exists solely to copy `__name__`, `__doc__`, and `__module__` from the wrapped function onto the wrapper so introspection tools still see the original identity.

> [!NOTE]
> The single most important “aha” is that a decorator does not modify the function object it receives; it produces a brand-new function object that usually closes over the original.

## 2. Why this matters — concrete and current
FastAPI uses decorators (`@app.get("/")`) to register route handlers and automatically generate OpenAPI schemas; every production endpoint you write is wrapped at import time.

PyTorch’s `@torch.jit.script` decorator converts eager Python functions into TorchScript graphs that can be serialized and executed on mobile or C++ runtimes without the Python interpreter.

The `pytest` testing framework applies `@pytest.fixture` and `@pytest.mark.parametrize` decorators to inject test data and alter test collection; millions of CI pipelines rely on this metaprogramming every day.

Django’s `@login_required` and `@permission_required` decorators enforce authentication on view functions before any business logic runs, forming the security layer of virtually every Django deployment at companies such as Instagram and Mozilla.

Numba’s `@jit` decorator compiles selected NumPy-heavy loops to LLVM machine code at runtime, delivering C-level speed while keeping the source in pure Python; this pattern is used in financial pricing engines and scientific simulations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Functions as first-class objects | Decorators receive and return function objects            |
| Nested functions & closures | The wrapper must remember the original function           |
| `*args, **kwargs`        | A general decorator must forward every possible argument  |
| `functools.wraps`        | Preserves metadata so debuggers and help() still work     |

If any row above feels shaky, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Functions are values
A function name is merely a variable that holds a reference to a function object. You can assign that reference to another name or pass it as an argument.
```python
def greet(name):
    return f"Hello {name}"

alias = greet
print(alias("Ada"))   # Hello Ada
```
This works because the `def` statement binds the name `greet` to the compiled code object; nothing prevents additional bindings.

> [!WARNING]
> If you later reassign `greet = 42`, the original function object is no longer reachable through that name; any decorator that assumed the name would stay bound will break.

### Step 2 — A decorator is a higher-order function
A decorator is any callable that accepts a function and returns a callable. The simplest decorator returns the identical object it received.
```python
def identity(f):
    return f
```
Applying it changes nothing observable.

### Step 3 — The wrapper adds behaviour
Most decorators return a new function that calls the original and does extra work.
```python
def timer(f):
    def wrapper(*args, **kwargs):
        import time
        start = time.perf_counter()
        result = f(*args, **kwargs)
        print(f"{f.__name__} took {time.perf_counter()-start:.4f}s")
        return result
    return wrapper
```
The inner `wrapper` closes over `f`, so the original function remains accessible after `timer` returns.

### Step 4 — The @ syntax desugars to assignment
```python
@timer
def compute(n):
    return sum(range(n))
```
is exactly equivalent to
```python
def compute(n):
    return sum(range(n))
compute = timer(compute)
```
Both produce the same bytecode.

### Step 5 — Metadata loss and the wraps remedy
Without intervention the wrapper’s `__name__` becomes `"wrapper"`. `functools.wraps` copies the original attributes.
```python
from functools import wraps

def timer(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        ...
    return wrapper
```
After decoration `compute.__name__` still equals `"compute"`.

### Step 6 — Stacking decorators
Decorators are applied bottom-up; the topmost decorator sees the result of the one below it.
```python
@A
@B
def f(): ...
```
is `f = A(B(f))`.

### Step 7 — Formal statement
Let \( f \) be a function object. A decorator \( D \) is a mapping \( D : \text{function} \to \text{function} \). The expression
\[
f' = D(f)
\]
binds the name \( f \) to \( f' \). When \( D \) uses `wraps`, the equality
\[
f'.__name__ = f.__name__
\]
holds after decoration.

## 5. Worked examples — har step show karo

**Example 1 — Identity decorator**
*Given:* an ordinary function `square`.
*Find:* the effect of applying an identity decorator.
```python
def identity(f):
    return f

def square(x):
    return x * x

square = identity(square)
print(square(3))          # 9
print(square.__name__)    # square
```
*Why:* we simply rebound the same object; metadata is untouched.

**Example 2 — Logging decorator**
*Given:* `add(a, b)`.
*Find:* a decorator that prints arguments and result.
```python
from functools import wraps

def log(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print(f"Calling {f.__name__} with {args}, {kwargs}")
        result = f(*args, **kwargs)
        print(f"{f.__name__} returned {result}")
        return result
    return wrapper

@log
def add(a, b):
    return a + b

add(2, 3)
```
*Why:* `*args, **kwargs` forward every call signature; `wraps` keeps the original name.

**Example 3 — Timing with wraps**
*Given:* a slow function.
*Find:* execution time printed after each call while preserving `__doc__`.
```python
import time
from functools import wraps

def timer(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        out = f(*args, **kwargs)
        print(f"Elapsed: {time.perf_counter()-t0:.6f}s")
        return out
    return wrapper

@timer
def slow(n):
    """Sleep n seconds."""
    time.sleep(n)
    return n

print(slow.__doc__)   # Sleep n seconds.
```
*Why:* without `wraps` the docstring would have vanished.

**Example 4 — Stacked decorators**
*Given:* two decorators `double` and `square`.
*Find:* the final value after `@double @square`.
```python
def double(f):
    def w(x): return f(x) * 2
    return w

def square(f):
    def w(x): return f(x) ** 2
    return w

@double
@square
def inc(x): return x + 1

print(inc(3))   # 32   because double(square(inc))(3) = 2*(4**2)
```
*Why:* evaluation order is bottom-up; each wrapper adds one transformation.

*Reflection:* stacking shows that decorators compose like ordinary functions; order matters and must be read from bottom to top.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Losing `__name__` and `__doc__` | Wrapper function has its own metadata      | Always apply `@wraps(f)` inside the decorator |
| Forgetting `*args, **kwargs` | Wrapper only accepts the parameters of the example | Use the catch-all signature in every wrapper |
| Calling the original function at decoration time | Misunderstanding that `@` runs at import time | Keep heavy work inside the returned wrapper   |
| Stacking order confusion    | Reading top-to-bottom instead of bottom-up | Draw the call stack or add print statements   |
| Mutable default arguments inside wrapper | Closure captures the same mutable object on every call | Use `None` sentinel and create inside wrapper |
| Decorating methods without `self` handling | Wrapper signature hides the implicit self   | Accept `*args` so the first positional arg becomes self |

## 7. The textbook-precise statement
A decorator is a callable \( D \) such that if \( f \) is a function object then \( D(f) \) is also a function object. The Python language reference states (Python Language Reference, §7.2, “Function definitions”):

> If one or more decorators are present, they are evaluated from bottom to top; the result of each decorator is passed to the next, and the final result is bound to the function name.

When `functools.wraps(wrapped)` is used, the wrapper receives the attributes `__module__`, `__name__`, `__qualname__`, `__doc__`, `__annotations__`, and `__dict__` copied from `wrapped` (Python documentation, `functools` module, CPython 3.12).

## 8. Visual — diagram or schematic
```
call site
   │
   ▼
wrapper(*args, **kwargs)     <-- returned by decorator
   │
   ├──> logging / timing
   │
   ▼
original_function(*args, **kwargs)
   │
   ▼
return value  ──► propagated back through wrapper
```

## 9. The memory technique
1. **The hook** — imagine a bouncer (decorator) standing at the door of a club (original function); every guest is inspected, logged, then allowed inside; the bouncer’s face is covered by a mask (`wraps`) that still shows the club’s real name.
2. **What to overlearn** — always write `@wraps(f)` on the inner wrapper; always accept `*args, **kwargs`.
3. **Spaced-repetition schedule** — review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the syntax, start from the desugared form `name = decorator(name)` and rebuild the nested function that closes over the original.

## 10. What this unlocks
Decorators are the foundation of Python’s metaprogramming toolkit. They directly enable:
- class decorators and metaclasses
- property, staticmethod, classmethod
- contextlib’s `@contextmanager`
- registration patterns used in plugin architectures
- dependency-injection frameworks such as FastAPI and Flask

## 11. Self-check — five questions, no answers
1. Write a decorator `@once` that executes the wrapped function only on the first call and returns `None` thereafter.
2. Explain why `help()` on a decorated function shows the original docstring only when `wraps` is used.
3. Predict the output of stacking `@timer @log` versus `@log @timer` on a function that sleeps one second; justify the order.
4. Identify the bug in the following code and fix it:
   ```python
   def memoize(f):
       cache = {}
       def w(x):
           if x not in cache:
               cache[x] = f(x)
           return cache[x]
       return w
   ```
5. Implement a decorator `@retry(times=3)` that re-invokes the wrapped function up to `times` times if it raises an exception.