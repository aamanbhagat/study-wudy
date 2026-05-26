## 1. The one-sentence answer
**Raising exceptions in Python lets you deliberately stop normal execution and signal that something has gone wrong by using the `raise` keyword, and you can create your own exception types by subclassing built-in exception classes.**

When a function encounters an invalid state that it cannot handle locally, it raises an exception object so that the caller or an outer scope can decide what to do. This keeps error-handling logic separate from the main algorithm and makes the contract of each function explicit. Without `raise`, every function would have to return special error codes that callers must constantly check, which quickly becomes fragile and verbose.

A custom exception class is simply a new class that inherits from `Exception` (or one of its subclasses). Once defined, it behaves exactly like any built-in exception: it can carry a message, be caught by `except`, and can be raised with `raise MyError(...)`.

> [!NOTE]
> The deepest insight is that exceptions are not just “errors”; they are first-class control-flow objects that let you separate the happy path from every possible unhappy path without polluting return values.

## 2. Why this matters — concrete and current
In the Django web framework, view functions raise `Http404` (a custom exception) when a requested object does not exist; the framework’s middleware catches it and returns a proper 404 response instead of letting the view crash.

TensorFlow’s `tf.debugging.assert_*` helpers internally raise `InvalidArgumentError` (subclass of `Exception`) when tensor shapes or dtypes violate documented contracts, allowing training scripts to fail fast rather than produce silent numerical garbage.

In semiconductor design tools written in Python (for example, those used at TSMC for mask-layout verification), custom exceptions such as `DRCViolation` are raised when design-rule checks fail; each exception instance stores the exact polygon coordinates so the GUI can highlight the offending geometry.

NASA’s open-source Python libraries for spacecraft trajectory planning raise `PropagationError` when numerical integrators detect that a requested time step would violate conservation laws, ensuring that downstream Monte-Carlo simulations never proceed with corrupted state vectors.

The Python standard library’s `json` module raises `json.JSONDecodeError` (subclass of `ValueError`) on malformed input; every production service that accepts JSON therefore inherits a well-typed, catchable signal instead of having to parse raw strings.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| `try` / `except` blocks  | You must already know how to catch exceptions before you deliberately create them. |
| Class inheritance        | Custom exceptions are created by subclassing `Exception`. |
| Function contracts       | Understanding what a function promises helps decide when to raise. |
| Object instantiation     | `raise` accepts an instance, so you need to know how to build objects with arguments. |

If any row above is unfamiliar, pause and study that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Python already has a signalling mechanism
Python functions can stop and hand control to an outer scope by raising an exception object.  
Example: `int("abc")` stops and raises `ValueError`.  
Formal statement: an expression `raise E` where `E` is an instance of `BaseException` transfers control to the nearest matching `except` clause or terminates the program.  
> [!WARNING]
> Treating the exception as a normal return value (for example, storing it in a variable and ignoring it) defeats the entire mechanism and leaves the program in an inconsistent state.

### Step 2 — The `raise` statement creates the signal
You write `raise SomeException(...)` at the exact line where the contract is violated.  
Example: inside a square-root function, `if x < 0: raise ValueError("negative input")`.  
Formal: `raise` accepts either a class (which is implicitly instantiated) or an instance.  
> [!WARNING]
> Writing `raise ValueError` without parentheses creates a reference to the class, not an instance; the traceback becomes confusing.

### Step 3 — Every exception carries optional payload
The arguments passed to the exception constructor become the `.args` tuple and are rendered in the traceback.  
Example: `raise TypeError("expected int, got", type(x))`.  
Formal: `Exception.__str__` joins the arguments with a space when more than one is supplied.  
> [!WARNING]
> Overloading the message with mutable objects can produce confusing output if those objects later change.

### Step 4 — Custom exceptions are ordinary subclasses
Define `class MyError(Exception): pass`. The new class inherits all behaviour of `Exception`.  
Example: `class NegativeBalanceError(Exception): pass`.  
Formal: the inheritance chain must ultimately reach `BaseException`; otherwise `except Exception` will not catch it.  
> [!WARNING]
> Inheriting from `object` instead of `Exception` makes the class uncatchable by normal handlers.

### Step 5 — Raising a custom exception follows the same syntax
`raise NegativeBalanceError("account overdrawn", balance)` works exactly like built-in exceptions.  
Formal: the custom class’s `__init__` may be overridden to store extra attributes (for example, `self.balance = balance`).  
> [!WARNING]
> Forgetting to call `super().__init__()` can break pickling and logging of the exception.

### Step 6 — The exception hierarchy controls catch granularity
Catch `NegativeBalanceError` specifically, or catch the broader `ValueError` if you also want to handle other value problems.  
Formal: method-resolution order determines which `except` clause matches first.  
> [!WARNING]
> Catching `Exception` too high in the hierarchy can silently swallow system-exiting exceptions such as `KeyboardInterrupt`.

### Step 7 — Raising is the dual of catching
Where `except` receives an exception object, `raise` supplies one; together they form an explicit error channel orthogonal to the normal return channel.  
Formal: the interpreter maintains a stack of exception handlers; `raise` unwinds that stack until a match is found.  
> [!WARNING]
> Re-raising inside an `except` block without `raise` (i.e., bare `raise`) is safe only when you are inside an active exception context; otherwise it raises `RuntimeError`.

## 5. Worked examples — har step show karo

**Example 1 — Simple raise inside a function**  
*Given:* a function that must receive a positive integer.  
*Find:* raise `ValueError` when the argument is negative.  
```python
def set_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")
    return age
```
*Why* the `if` check: it is the precise location where the contract is violated.  
*Why* `raise ValueError(...)`: it creates an instance carrying a human-readable message.  
**Final answer**  
```python
set_age(-3)  # raises ValueError: age cannot be negative
```

*Reflection:* the example isolates the decision to raise from any surrounding try/except, making the contract explicit.

**Example 2 — Custom exception with extra attribute**  
*Given:* a bank-account class.  
*Find:* define and raise `NegativeBalanceError` that also stores the offending balance.  
```python
class NegativeBalanceError(Exception):
    def __init__(self, balance):
        super().__init__(f"balance {balance} is negative")
        self.balance = balance

def withdraw(amount, balance):
    new_balance = balance - amount
    if new_balance < 0:
        raise NegativeBalanceError(new_balance)
    return new_balance
```
*Why* `super().__init__`: ensures the message appears in tracebacks and is picklable.  
*Why* `self.balance = balance`: callers can inspect the exact numeric value without parsing the message string.  
**Final answer**  
```python
withdraw(100, 30)  # raises NegativeBalanceError with .balance == -70
```

*Reflection:* storing domain data inside the exception turns it into a rich error object rather than a plain string.

**Example 3 — Raising from inside another exception handler**  
*Given:* a JSON-parsing helper that wants to produce a domain-specific error.  
*Find:* wrap `json.JSONDecodeError` into a custom `ConfigError`.  
```python
import json
class ConfigError(Exception): pass

def load_config(text):
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise ConfigError("invalid config syntax") from e
```
*Why* `from e`: preserves the original traceback chain for debugging.  
**Final answer**  
`load_config("{")` raises `ConfigError` whose `__cause__` points to the original `JSONDecodeError`.

*Reflection:* chaining prevents loss of root-cause information when translating between abstraction layers.

**Example 4 — Raising inside a property setter**  
*Given:* a class that must keep temperature above absolute zero.  
*Find:* raise a custom exception from a setter.  
```python
class Temperature:
    def __init__(self):
        self._celsius = 0
    @property
    def celsius(self): return self._celsius
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value
```
*Why* the check lives in the setter: the invariant must be enforced at every mutation point.  
**Final answer**  
`t = Temperature(); t.celsius = -300` raises `ValueError`.

*Reflection:* placing `raise` inside a descriptor or property centralises the validation rule.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Inheriting custom exception from `object` | Forgetting Python’s exception hierarchy       | Always inherit from `Exception` or a subclass        |
| Bare `raise` outside an except block | Misunderstanding the implicit exception context | Use only inside `except` or supply an explicit instance |
| Catching `Exception` at the top level of a worker thread | Swallows `SystemExit` and `KeyboardInterrupt` | Catch only the specific exceptions you can handle    |
| Passing mutable objects as exception arguments | Later mutation changes the recorded message   | Pass only immutable values or copies                 |
| Using `raise SomeException` without parentheses | Confusing class object with instance          | Always write `raise SomeException(...)`              |
| Overriding `__init__` without calling `super().__init__` | Breaks `__str__`, pickling and logging        | Always call `super().__init__(*args)`                |
| Raising strings (Python 2 habit)  | Old code pattern still seen in legacy projects| Never raise non-exception objects                    |

## 7. The textbook-precise statement
From the Python Language Reference (v3.12), §5.4 “The raise statement”:

> raise_stmt ::=  "raise" [expression ["from" expression]]
>
> If no expressions are present, `raise` re-raises the last active exception. Otherwise the first expression must evaluate to an instance of `BaseException` or a subclass. The optional `from` clause sets `__cause__` and suppresses `__context__`. A custom exception is any class that inherits from `BaseException`; by convention user-defined exceptions inherit from `Exception`.

## 8. Visual — diagram or schematic
```text
BaseException
├── SystemExit
├── KeyboardInterrupt
└── Exception
    ├── ValueError
    │   └── NegativeBalanceError   <-- your custom class
    ├── TypeError
    └── ... (other built-ins)
```
The tree shows that only classes under `Exception` are caught by a typical `except Exception` clause; `NegativeBalanceError` is placed directly under `ValueError` so it can be caught either specifically or as part of any value error.

## 9. The memory technique

1. **The hook** — picture a fire alarm (the `raise` statement) mounted on the wall of a function; when the room gets too hot (bad data), the alarm object flies out the door to the nearest handler that knows how to evacuate the building.

2. **What to overlearn** — (a) always inherit custom exceptions from `Exception`; (b) `raise` accepts either a class or an instance; (c) use `raise ... from e` when translating exceptions.

3. **Spaced-repetition schedule** — review the fire-alarm image after 1 day, 3 days, 7 days, 16 days, and 35 days while writing one new custom exception each time.

4. **First-principles fallback** — if you forget the syntax, remember that an exception is simply an object that travels up the call stack; therefore you need an object (`raise X(...)`) whose class sits in the exception hierarchy (`class X(Exception)`).

## 10. What this unlocks
Once you can raise and define exceptions you can implement robust context managers, design domain-specific error hierarchies for libraries, and integrate cleanly with logging and testing frameworks.

- Context-manager `__exit__` methods that decide whether to suppress an exception.
- Custom warnings via `Warning` (a sibling of `Exception`).
- Structured error payloads for API response serializers (FastAPI, Pydantic).
- Precise test assertions with `pytest.raises(MyError)`.

## 11. Self-check — five questions, no answers
1. Write a one-line `raise` statement that creates a `TypeError` whose message contains both the expected and the actual type.
2. Define a custom exception `TimeoutError` that stores both a `timeout` value and a `resource` string; show its `__init__` and a sample `raise`.
3. In a function that opens two files, demonstrate how to raise a custom `DualFileError` while still preserving the original `OSError` that occurred on the second file.
4. A colleague wrote `class MyError(object): pass`. What single change makes `MyError` catchable by `except Exception`?
5. Explain why `raise ValueError` (without parentheses) produces a different traceback from `raise ValueError("bad")`, and what runtime error appears if the bare class is raised outside any exception context.