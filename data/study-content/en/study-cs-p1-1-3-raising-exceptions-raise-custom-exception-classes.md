## 1. The one-sentence answer
**Raising exceptions in Python is the explicit transfer of control to an error-handling path by instantiating and throwing an object that derives from BaseException.**

An exception is an object that carries information about an abnormal condition. When you execute the statement `raise SomeException(...)`, Python immediately stops normal execution, walks up the call stack looking for a matching `except` clause, and—if none is found—terminates the program with a traceback. The object you raise can be an instance of any built-in exception or of a class you define yourself.

Custom exception classes exist so that different parts of a program can signal domain-specific failures without overloading the meaning of the built-in types. By inheriting from `Exception` (or a more specific subclass), your new class automatically participates in the existing exception-matching machinery while carrying whatever extra attributes your application needs.

> [!NOTE]
> The decisive insight is that `raise` does not “print an error”; it unwinds the stack and searches for a handler, turning an otherwise invisible contract violation into a first-class, catchable value.

## 2. Why this matters — concrete and current
SpaceX’s flight software uses custom exception hierarchies to distinguish between recoverable sensor glitches and mission-ending guidance failures; a single unhandled exception aborts the entire booster return-to-launch-site sequence.  

In the JAX automatic-differentiation library, numerical errors such as NaN gradients are raised as `FloatingPointError` subclasses so that downstream training loops can decide whether to retry with a smaller learning rate or to terminate the experiment.  

Semiconductor design tools at TSMC wrap each step of the place-and-route pipeline in domain-specific exceptions (`DRCViolation`, `TimingViolation`) so that a single script can aggregate thousands of rule violations and produce a machine-readable report rather than halting on the first failure.  

The CPython interpreter itself raises `RecursionError` when the C stack approaches its limit; this explicit exception prevents silent stack overflows that historically produced security vulnerabilities in network protocol parsers.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| `try`/`except` statement | You must already know how an exception is caught before you can understand why raising one is useful. |
| Class inheritance | Custom exceptions are created by subclassing; the lookup rules for `except` clauses rely on the inheritance graph. |
| Object instantiation | `raise` accepts either a class or an instance; you must be comfortable writing `MyError("msg")`. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An exception is a value, not a print statement
Python already interrupts normal control flow when something goes wrong (division by zero, missing key, etc.). The `raise` statement lets the programmer create that same interruption on purpose.

```python
if denominator == 0:
    raise ZeroDivisionError("denominator must be non-zero")
```
The expression after `raise` must evaluate to an instance of `BaseException` (or a subclass). Execution never continues past this line.

> [!WARNING]
> Writing `raise "message"` passes a string, which is not an exception instance; Python raises `TypeError` instead of the intended error.

### Step 2 — The inheritance test decides which handler runs
When an exception is raised, Python walks the stack and checks each `except` clause with the expression `isinstance(raised_object, caught_type)`. Because of inheritance, a handler for `Exception` will also catch `ValueError`.

### Step 3 — `raise` without an argument re-raises the current exception
Inside an `except` block the bare statement `raise` re-raises the active exception, preserving its original traceback. This is the only situation in which `raise` may appear without an argument.

### Step 4 — Defining a custom exception
Create a new class that inherits from `Exception` (or a more specific built-in). The class body may be empty; the inherited machinery is sufficient.

```python
class InsufficientFundsError(Exception):
    pass
```
The new class is now a valid operand for `raise` and for `except` clauses.

### Step 5 — Attaching domain data
Store extra information by calling the base-class constructor or by setting instance attributes.

```python
raise InsufficientFundsError("balance=120, required=200")
```
or

```python
err = InsufficientFundsError()
err.balance = 120
raise err
```

### Step 6 — The formal statement
Let `E` be any subclass of `BaseException`. The evaluation of `raise E(args)` creates an instance `e = E(args)`, sets `e.__traceback__` to the current frame, and initiates the exception-propagation algorithm defined in the Python language reference (PEP 3134).

## 5. Worked examples — every step shown

**Example 1 — Simple guard**
*Given:* A function that must reject negative radii.  
*Find:* Raise `ValueError` with a clear message.

```python
def circle_area(r):
    if r < 0:
        raise ValueError("radius must be non-negative")
    return 3.14159 * r * r
```
*Why:* The `if` test detects the contract violation.  
*Why:* `raise` constructs the exception object and begins stack unwinding.  
**`ValueError: radius must be non-negative`**

*Reflection:* The example shows the minimal pattern; the message becomes the `args` tuple stored inside the exception instance.

**Example 2 — Re-raise after cleanup**
*Given:* Code that must close a file even when an error occurs.  
*Find:* Use bare `raise`.

```python
f = open("data.txt")
try:
    process(f)
except:
    f.close()
    raise          # re-raises the original exception
```
*Why:* The bare `raise` inside `except` re-uses the active exception object.  
*Why:* The original traceback is preserved, so the caller sees the true origin.  
**Original traceback is emitted after the file is closed.**

*Reflection:* This pattern separates resource management from error policy.

**Example 3 — Custom exception with attributes**
*Given:* A bank transfer that must report both accounts involved.  
*Find:* Define and raise a custom class carrying two account numbers.

```python
class TransferError(Exception):
    def __init__(self, from_acct, to_acct, msg):
        super().__init__(msg)
        self.from_acct = from_acct
        self.to_acct = to_acct

raise TransferError("A-100", "B-200", "daily limit exceeded")
```
*Why:* `super().__init__` stores the message in the standard `args`.  
*Why:* Extra attributes survive the inheritance chain and are available to handlers.  
**`TransferError('daily limit exceeded')` with `.from_acct == "A-100"`.**

*Reflection:* Adding data turns the exception into a rich diagnostic object rather than a mere signal.

**Example 4 — Layered exception translation**
*Given:* Low-level socket code that may raise `OSError`; the API layer wants to expose only `NetworkError`.  
*Find:* Catch, wrap, and raise a custom exception while chaining.

```python
class NetworkError(Exception):
    pass

try:
    sock.connect(addr)
except OSError as e:
    raise NetworkError("cannot reach peer") from e
```
*Why:* `from e` sets `__cause__`, enabling `traceback.print_exception` to show both exceptions.  
*Why:* Callers of the high-level API never need to know about sockets.  
**`NetworkError` with chained `__cause__` pointing to the original `OSError`.**

*Reflection:* Exception chaining decouples abstraction layers without losing diagnostic information.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Raising a string or other non-exception | Beginners treat `raise` like `print`. | Always raise an instance of a `BaseException` subclass. |
| Catching `Exception` too broadly in library code | Convenience masks bugs that should propagate. | Catch only the specific exceptions you can meaningfully handle; let others escape. |
| Forgetting to call `super().__init__` in a custom exception | The `args` tuple stays empty; `str(e)` yields nothing useful. | Always invoke the base constructor with the message. |
| Using `raise Exception` as a generic signal | Loses all semantic information; every handler must inspect `args`. | Create a distinct subclass for each distinct failure mode. |
| Modifying `sys.exc_info()` manually | Obsolete pattern that breaks exception chaining. | Use the `raise ... from` syntax instead. |
| Defining custom exceptions at module level but importing them inside functions | Circular-import surprises when the exception is raised before the import completes. | Import custom exceptions at the top of the file. |
| Raising inside `__del__` or weakref callbacks | The interpreter may be in an inconsistent state; the exception is printed to stderr and ignored. | Never raise from finalizers; log instead. |

## 7. The textbook-precise statement
An exception is raised by evaluating `raise [expression]`, where the optional expression evaluates to an instance of `BaseException`. If the expression is omitted, the current exception in `sys.exc_info()` is re-raised. The propagation algorithm is defined in the Python Language Reference, version 3.12, §4.2: “Exceptions.” Custom exception types are introduced by subclassing any built-in exception class; they inherit the matching behaviour used by `except` clauses (see also “Built-in Exceptions,” §5.1 of the same reference).

## 8. Visual — diagram or schematic
```text
Call stack
┌──────────────────────┐
│ main()               │
│   try:               │
│     transfer(...)    │   <-- exception propagates here
├──────────────────────┤
│ transfer()           │
│   if overdrawn:      │
│     raise InsufficientFundsError
├──────────────────────┤
│ withdraw()           │   <-- raise originates here
└──────────────────────┘
          │
          ▼
Exception handler lookup (isinstance check)
```

## 9. The memory technique
1. **The hook** — Picture a relay baton: normal code runs with the baton; `raise` throws the baton upward until someone catches it or the race ends.  
2. **What to overlearn** — (a) `raise` requires a `BaseException` instance; (b) custom exceptions inherit from `Exception`; (c) bare `raise` inside `except` re-raises the active exception.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “What must happen for control to leave this function abnormally and still allow the caller to decide what to do?” The answer is an object that travels up the stack and is tested by type.

## 10. What this unlocks
Mastery of explicit raising and custom exceptions is required before you can write robust context managers, design plugin architectures that report failures cleanly, or implement retry loops that distinguish transient from permanent errors. The next topics that depend directly on this material are `with` statements and the context-manager protocol, exception chaining with `raise ... from`, and the design of domain-specific error taxonomies used in large codebases.

## 11. Self-check — five questions, no answers
1. Write the shortest statement that raises a `ValueError` whose string representation is exactly `"negative index"`.  
2. A function catches `OSError`, performs cleanup, then must let the original exception continue propagating. Show the required syntax.  
3. Define a custom exception `ParseError` that stores both a line number and a message. Demonstrate raising it with concrete values.  
4. Explain why `except Exception:` at the top level of a long-running server can hide bugs that would otherwise be caught during testing.  
5. Given the inheritance `class MyError(ValueError): pass`, determine which of the following handlers will catch an instance of `MyError`: `except ValueError:`, `except Exception:`, `except TypeError:`.