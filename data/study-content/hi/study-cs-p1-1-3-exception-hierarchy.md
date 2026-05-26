## 1. The one-sentence answer
**Exception hierarchy** is Python’s single-inheritance tree of exception classes with `BaseException` at the root, letting you catch either very specific errors or entire families of related errors through polymorphism.

Python organises every built-in error as a class that inherits from a parent. When you write `except ValueError`, you are really saying “catch this class or any of its descendants.” Because the hierarchy is fixed and documented, the same `try` block can decide at runtime how broadly or narrowly it wants to respond.

The design also separates system-level exits (`SystemExit`, `KeyboardInterrupt`) from normal program errors (`Exception`). This prevents accidental swallowing of shutdown signals when you write the common `except Exception` clause.

> [!NOTE]
> The single most important realisation is that `except` clauses are resolved by the *method resolution order* of the raised object’s class, not by string matching of error names.

## 2. Why this matters — concrete and current
FastAPI uses the hierarchy to let developers register custom handlers for entire branches such as `HTTPException` while still letting `ValidationError` (a Pydantic subclass of `ValueError`) bubble up with its own JSON response.

Pandas catches `ArithmeticError` and its children (`ZeroDivisionError`, `OverflowError`) inside `DataFrame.eval` so that a single wrapper can log the offending expression and column without enumerating every numeric exception.

Airflow’s task runner distinguishes `AirflowException` (recoverable) from `SystemExit` and `KeyboardInterrupt` so that a worker can be terminated cleanly by the scheduler without losing the distinction between a failed DAG run and an intentional shutdown.

PyTorch’s `DataLoader` workers wrap user collate functions and only catch subclasses of `Exception`; this guarantees that `SystemExit` and `KeyboardInterrupt` still terminate the worker process immediately during distributed training.

The CPython interpreter itself relies on the hierarchy when implementing `with` statements: any exception that inherits from `BaseException` triggers `__exit__` cleanup, yet only `Exception` subclasses are considered “normal” errors that context managers may suppress.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python `class` inheritance | Exceptions are ordinary classes; `except` uses `issubclass` checks |
| Basic `try`/`except`     | You must already know how an `except` clause binds a name |
| `raise` statement        | You need to know how an instance travels up the call stack |

If any row above is unfamiliar, pause and master it first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The root of all exceptions
All exceptions descend from one class so the language can treat every error uniformly when unwinding the stack.

```python
raise ValueError("bad")   # ultimately inherits from BaseException
```
Formally:
$$
\text{BaseException} \supset \text{Exception} \supset \dots
$$
> [!WARNING]
> Catching `BaseException` instead of `Exception` will also swallow `SystemExit` and `KeyboardInterrupt`, breaking normal program termination.

### Step 2 — The practical branch: `Exception`
Every error you normally want to handle inherits from `Exception`. This split keeps shutdown signals outside ordinary `except Exception` clauses.

### Step 3 — Mid-level categories
`ArithmeticError`, `LookupError`, `ImportError`, etc. group related failures so one handler can manage an entire family.

### Step 4 — Leaf exceptions
Concrete classes such as `ZeroDivisionError`, `KeyError`, `ModuleNotFoundError` sit at the leaves and carry the most specific information.

### Step 5 — Catching by inheritance
When an exception instance is raised, Python walks the `except` clauses and matches the first clause whose class is a superclass of the raised object’s class.

### Step 6 — User-defined exceptions
You create new leaves or branches by subclassing any existing node; the new class automatically participates in all existing handlers of its ancestors.

### Step 7 — The complete documented tree
The official tree is published in the Python documentation and is part of the language specification; third-party libraries extend it by subclassing the appropriate internal node.

## 5. Worked examples — har step show karo

**Example 1 — Catching a leaf vs its parent**
*Given:* code that may raise `KeyError`.
*Find:* output when we catch only `LookupError`.
```python
try:
    d = {"a": 1}
    print(d["b"])
except LookupError as e:      # catches KeyError because KeyError inherits from LookupError
    print(type(e).__name__)
```
*Why:* `KeyError` is a subclass of `LookupError`, so the `except` clause matches.  
**KeyError**

*Reflection:* The example shows that a broad handler still receives the concrete instance, preserving `__str__` and attributes.

**Example 2 — Order of except clauses matters**
*Given:* the same `KeyError` but with reversed clauses.
```python
try:
    d = {"a": 1}
    print(d["b"])
except Exception:
    print("Exception")
except LookupError:
    print("LookupError")
```
*Why:* Python checks clauses top-down; the first matching class wins.  
**Exception**

*Reflection:* Placing a superclass before a subclass silently hides more specific handlers.

**Example 3 — Raising a custom exception**
*Given:* need a domain-specific error that should be caught by any `ValueError` handler.
```python
class NegativeBalanceError(ValueError):
    pass

try:
    raise NegativeBalanceError("Balance cannot be negative")
except ValueError as e:
    print("Caught as ValueError")
```
*Why:* `NegativeBalanceError` inherits from `ValueError`, satisfying the `issubclass` test inside the interpreter.  
**Caught as ValueError**

*Reflection:* Custom exceptions become first-class citizens of the hierarchy without extra registration.

**Example 4 — Distinguishing system exits**
*Given:* code that must never swallow `KeyboardInterrupt`.
```python
try:
    # long computation
    pass
except Exception:
    print("Normal error")
# KeyboardInterrupt still propagates here
```
*Why:* `KeyboardInterrupt` inherits from `BaseException` but not from `Exception`, so the clause is bypassed.  
**No output for Ctrl-C**

*Reflection:* The hierarchy deliberately protects process-control signals.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Writing `except Exception` at the top of a module | Desire to “never crash”                             | Let unexpected exceptions propagate; log at the top level only |
| Catching `BaseException`          | Copy-paste from old code or over-cautiousness       | Replace with `except Exception` unless you truly need shutdown handling |
| Placing a broad `except` before a narrow one | Top-down matching order                             | Order clauses from most specific to most general     |
| Forgetting that custom exceptions must inherit from `Exception` | Subclassing `BaseException` by mistake              | Always inherit from `Exception` or one of its descendants |
| Checking `type(e) == ValueError` instead of `isinstance` | Old Java habits                                     | Use `isinstance(e, ValueError)` so subclasses are recognised |
| Swallowing `KeyboardInterrupt` in a worker thread | Treating all exceptions identically                 | Never catch `BaseException` in threads or loops that must remain terminable |

## 7. The textbook-precise statement
In Python, every exception is an instance of a class that inherits, directly or indirectly, from `BaseException`. The `try` statement evaluates each `except` clause in textual order; the first clause whose exception class is the raised object’s class or a base class of it is selected (Python Language Reference, §8.3–8.4). Only instances of `Exception` (and its descendants) are considered “normal” errors; `SystemExit`, `KeyboardInterrupt`, and `GeneratorExit` inherit directly from `BaseException` and are deliberately excluded from the common `except Exception` idiom. The built-in hierarchy is immutable and documented in the “Exception Hierarchy” section of the Python Standard Library reference.

## 8. Visual — diagram or schematic
```
BaseException
├── SystemExit
├── KeyboardInterrupt
├── GeneratorExit
└── Exception
    ├── StopIteration
    ├── ArithmeticError
    │   ├── ZeroDivisionError
    │   └── OverflowError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    ├── ImportError
    │   └── ModuleNotFoundError
    └── ValueError
        └── (your custom subclasses)
```

## 9. The memory technique
1. **The hook** — Picture a family tree where `Exception` is the sensible parent everyone invites to dinner, while `BaseException` is the reclusive grandparent living in the attic; you only knock on the attic door when you truly need to shut the house down.
2. **What to overlearn** — `except Exception` catches almost everything you care about; `except BaseException` catches everything including shutdown signals; `except:` (bare) is identical to `except BaseException`.
3. **Spaced-repetition schedule** — Review the ASCII tree after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the tree, remember that Python simply walks up the MRO (`__mro__`) of the raised instance and picks the first matching `except` class it finds.

## 10. What this unlocks
You can now design error-handling layers that are both safe and informative, which is required for the next topics: context managers (`__exit__` receives the exception triple), custom exception chaining with `raise ... from`, and writing robust test suites that assert specific exception types.

- Writing libraries that expose a clean exception API
- Implementing retry logic that distinguishes transient from fatal errors
- Using `except*` (Python 3.11+) for concurrent exception groups

## 11. Self-check — five questions, no answers
1. What single line of code would accidentally turn `Ctrl-C` into a silent no-op?
2. If you define `class MyError(LookupError): pass`, which existing handlers will catch it?
3. Why does the order of `except` clauses matter even when the raised exception is a leaf class?
4. In a long-running server, should you ever write `except BaseException` around your request handler? Give one concrete consequence.
5. A function raises `ModuleNotFoundError`. Which two different `except` clauses (different classes) would both match it?