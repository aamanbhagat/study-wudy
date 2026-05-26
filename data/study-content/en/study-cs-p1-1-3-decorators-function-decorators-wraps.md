## 1. The one-sentence answer
**A Python function decorator is a higher-order function that accepts another function as input and returns a new function that extends or modifies the original’s behaviour, invoked via the `@` syntax.**

Functions in Python are first-class objects that can be passed around exactly like integers or strings. A decorator therefore simply receives the original function, typically defines an inner wrapper that adds new logic before or after calling the original, and returns that wrapper. The `@` symbol is syntactic sugar that automatically replaces the original name with the result of the decorator call, so the calling code never changes. The `functools.wraps` helper copies metadata such as `__name__` and `__doc__` from the original function onto the wrapper so introspection tools continue to work.

> [!NOTE]
> The single most important insight is that the decorator does not alter the source code of the decorated function; it only wraps it at definition time, preserving the original object while substituting a new callable under the same name.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory uses decorators inside the `pytest` test harness that runs verification suites for Mars rover flight software; timing and logging decorators wrap every hardware-interface test so that execution traces can be replayed after a mission anomaly.

In machine-learning training loops at DeepMind, the `tf.function` decorator (built on Python’s decorator machinery) converts eager-mode TensorFlow graphs into static graphs, yielding the 10–100× speed-ups required for AlphaFold-scale protein-folding workloads.

FastAPI, the web framework adopted by Microsoft’s Azure Functions team, relies on route decorators (`@app.get("/predict")`) to register endpoint handlers and automatically generate OpenAPI schemas; every production inference service at scale therefore depends on correct decorator semantics.

The `lru_cache` decorator from the standard library is applied inside LLVM’s Python bindings to memoise expensive target-triple computations, directly affecting compile times for every new silicon tape-out at companies such as Apple and AMD.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Functions are first-class objects | Decorators must accept a function as an argument and return a function. |
| Nested functions & closures | The wrapper must remember the original function after the decorator has finished executing. |
| `*args` and `**kwargs`   | A general decorator must forward any argument signature the original function accepts. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Functions are values
A function name is merely a variable that holds a callable object; the object itself can be stored in another variable or passed as an argument.

```python
def greet(name):
    return f"Hello, {name}"

alias = greet          # no parentheses: we copy the function object
print(alias("Ada"))    # Hello, Ada
```

$$f : \text{str} \to \text{str},\qquad \text{alias} \equiv f$$

> [!WARNING]
> Writing `alias = greet()` would call the function immediately and store its return value, destroying the ability to decorate.

### Step 2 — Higher-order functions
A function that accepts or returns another function is called a higher-order function; decorators are exactly such functions.

```python
def make_upper(func):
    def wrapper(name):
        return func(name).upper()
    return wrapper
```

$$D(f) = w,\qquad w(x) = f(x).\text{upper}()$$

### Step 3 — Manual decoration
Apply the higher-order function explicitly by re-binding the name.

```python
greet = make_upper(greet)
print(greet("Ada"))   # HELLO, ADA
```

### Step 4 — The `@` syntax
The `@` symbol performs the same re-binding automatically at definition time.

```python
@make_upper
def greet(name):
    return f"Hello, {name}"
```

### Step 5 — Metadata preservation
Without intervention the wrapper hides the original function’s identity.

```python
print(greet.__name__)   # "wrapper"
```

`functools.wraps` copies `__name__`, `__doc__`, `__module__`, and the original signature.

```python
from functools import wraps

def make_upper(func):
    @wraps(func)
    def wrapper(name):
        return func(name).upper()
    return wrapper
```

### Step 6 — Formal statement
A decorator is any callable \(D\) such that
$$D : (A \to B) \to (A \to B).$$
When the decorated function is later invoked with arguments \(\mathbf{x}\), the observable behaviour is \(D(f)(\mathbf{x})\).

## 5. Worked examples — every step shown

**Example 1 — Identity decorator**

*Given:*  
```python
def identity(f):
    return f
```

*Find:* the effect of `@identity`.

- `def f(): …` creates function object \(f_0\).
- `@identity` executes `f = identity(f_0)`.
- Because `identity` returns its argument unchanged, `f` still refers to \(f_0\).

**`f` is unchanged.**  
*Reflection:* The example isolates the mechanics of name rebinding before any wrapper logic appears.

**Example 2 — Timing decorator**

*Given:* a slow function.  
*Find:* wall-clock time.

```python
import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        result = func(*args, **kwargs)      # call original
        dt = time.perf_counter() - t0
        print(f"{func.__name__} took {dt:.6f}s")
        return result
    return wrapper

@timer
def compute(n):
    return sum(range(n))
```

- `*args, **kwargs` capture any call signature.
- `func(*args, **kwargs)` forwards the call.
- `wraps` keeps `__name__ == "compute"`.

**`compute(10_000_000)` prints timing and returns the sum.**  
*Reflection:* Argument forwarding is the key generalisation that makes the decorator reusable.

**Example 3 — Decorator factory (with argument)**

*Given:* need to choose logging level at decoration time.  
*Find:* a decorator that accepts a parameter.

```python
def log(level):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(f"[{level}] calling {func.__name__}")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@log("DEBUG")
def work():
    return 42
```

- `log("DEBUG")` returns the inner `decorator`.
- `decorator` is then applied exactly as in Step 4.

**`work()` prints `[DEBUG] calling work` then returns 42.**  
*Reflection:* Two levels of nesting separate configuration from decoration.

**Example 4 — Stacked decorators**

*Given:* both timing and logging required.  
*Find:* order of application.

```python
@timer
@log("INFO")
def query():
    return "data"
```

- Innermost `@log("INFO")` produces a wrapped function \(w_1\).
- `@timer` then wraps \(w_1\), producing \(w_2\).
- Execution order: timer → log → original.

**`query()` prints timing line and `[INFO] calling query`.**  
*Reflection:* Decorators are applied bottom-up; the topmost decorator sees the result of all lower ones.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Losing `__doc__` and `__name__`   | Wrapper function object is newly created      | Always apply `@wraps(func)` inside every decorator |
| Forgetting `*args, **kwargs`      | Author assumes a fixed signature              | Use the catch-all form in every wrapper      |
| Calling the function at decoration time | Parentheses accidentally added (`@timer()`) | Remember `@` receives the function, never its result |
| Stacking order surprises          | Execution flows top-down at runtime           | Draw the wrapper onion; test with print statements |
| Decorating methods without `self` | Wrapper signature omits the implicit first argument | Accept `*args` so `self` is captured automatically |
| Recursive decoration memory leaks | Closure holds reference to original forever   | Use weakref when the original must be allowed to die |
| Class decorators vs function decorators confusion | Same `@` syntax used on classes               | Distinguish by checking whether the argument is a function or a type |

## 7. The textbook-precise statement
A decorator is a callable object \(d\) for which there exists a callable \(f\) such that \(d(f)\) is also callable. When the statement
```python
@ d
def f(...): ...
```
is executed, the name `f` is bound to the object \(d(f_0)\) where \(f_0\) is the function object created by the `def` statement. If \(d\) is parameterised, an outer callable first returns the actual decorator. (Ramalho, *Fluent Python*, 2e, §7.1–7.2; Python Documentation, “Function Definitions”, §7.7.)

## 8. Visual — diagram or schematic

```text
Source code                Runtime objects
-------------              ----------------
def original():            original ──┐
    ...                               │
                                      ▼
@decorator                 decorator(original) ──► wrapper
def original():                       ▲
    ...                               │
                                      │  (later call)
                                      ▼
                               caller sees only "original"
                               but executes wrapper code
```

## 9. The memory technique

**The hook**  
Picture the `@` symbol as a gift bow that wraps the function; the bow (decorator) adds ribbon (new behaviour) without changing the present inside.

**What to overlearn**  
1. `@wraps` must appear in every production decorator.  
2. `*args, **kwargs` is the universal forwarding idiom.  
3. Decorators execute once, at def time; wrappers execute on every call.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by writing the three-line manual version  
`f = decorator(f)`  
then replace the assignment with the `@` line.

## 10. What this unlocks
Decorators are the gateway to Python’s richer metaprogramming facilities.

- Class decorators and metaclasses for automatic registration  
- `property`, `staticmethod`, `classmethod` as built-in descriptors  
- Context-manager protocol (`__enter__`/`__exit__`) and `contextlib`  
- Dependency-injection frameworks used in FastAPI and pytest fixtures  
- Memoisation, retry logic, and authentication layers in production services  

## 11. Self-check — five questions, no answers
1. Write the shortest decorator that does nothing except return the original function unchanged.  
2. Predict the output of `print(f.__name__)` both with and without `@wraps`.  
3. A decorator factory `retry(times)` must accept an integer. Show the exact nesting of three functions required.  
4. Two decorators `@A` and `@B` are stacked on `f`. In what order do the wrapper bodies execute when `f()` is called?  
5. Identify the bug: a decorator defined inside a loop captures the loop variable instead of its value at decoration time.