## 1. The one-sentence answer
**The exception hierarchy is Python’s inheritance tree of classes rooted at BaseException that organises every runtime error so a single except clause can match an entire family of related conditions.**

Python represents every abnormal situation as an instance of a class. These classes form a single-inheritance tree. When an error occurs, Python instantiates the appropriate leaf class and walks the tree upward; an except clause succeeds if the raised class is the named class or any of its descendants. The tree therefore turns a syntactic pattern into a semantic grouping mechanism.

Two branches matter immediately. Most ordinary errors descend through Exception. A small set of interpreter-level terminations—SystemExit, KeyboardInterrupt, GeneratorExit—descend directly from BaseException and bypass Exception. This split prevents an overly broad except Exception from accidentally swallowing a deliberate program exit.

> [!NOTE]
> Catching Exception catches almost everything you usually want to recover from; catching BaseException catches everything, including the signals that should normally terminate the program.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software, written in a mix of C and Python test harnesses, uses the hierarchy to let low-level sensor faults be caught by a single handler while still allowing KeyboardInterrupt during ground testing to remain uncaught.

In large-scale machine-learning training at Google, TensorFlow’s tf.errors module registers custom exceptions that inherit from Exception; a generic training-loop except Exception can therefore retry on any transient hardware fault without catching SystemExit sent by the job scheduler.

Semiconductor foundries such as TSMC run Python-based equipment-control scripts on clean-room hosts; the hierarchy lets a single except block around a wafer-handler routine treat every subclass of OSError uniformly while still letting GeneratorExit propagate when a generator-based logging coroutine is closed.

The Python standard library’s asyncio event loop raises CancelledError (a subclass of BaseException since Python 3.8) so that task-cancellation logic cannot be accidentally swallowed by a broad except Exception inside user coroutines.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python class inheritance | Determines which except clauses match a raised instance   |
| The raise and except statements | The only language constructs that interact with the tree  |
| Distinction between BaseException and Exception | Prevents accidental suppression of interpreter shutdowns  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Errors are ordinary objects
Any object can be raised. Python therefore stores error information in instances of classes rather than in special primitive values.

```python
raise ValueError("negative radius")
```
The call constructs an instance of ValueError and begins the search for a matching handler.

> [!WARNING]
> Treating exceptions as a separate language primitive instead of objects hides the fact that they obey ordinary inheritance rules.

### Step 2 — Matching uses the “is instance” test
An except clause matches when the raised object is an instance of the named class or any subclass.

```python
try:
    1 / 0
except ArithmeticError:
    print("caught")
```
ZeroDivisionError inherits from ArithmeticError, so the clause succeeds.

### Step 3 — The root split
BaseException is the ultimate ancestor. Exception is its direct subclass and the parent of all recoverable errors.

```python
BaseException
├── Exception
│   ├── ArithmeticError
│   └── ...
├── SystemExit
├── KeyboardInterrupt
└── GeneratorExit
```

### Step 4 — Grouping by shared parent
Because LookupError is the parent of both IndexError and KeyError, one handler can treat every failed lookup identically.

### Step 5 — Textbook statement
Every built-in and user-defined exception must inherit from BaseException. Handlers match according to the instance-of relation along the inheritance chain.

## 5. Worked examples — every step shown

**Example 1 — Single-level catch**  
*Given:* ZeroDivisionError raised inside a try.  
*Find:* Which except clause matches.  
- Raise ZeroDivisionError(). *Why:* the statement constructs the leaf instance.  
- Python tests `isinstance(raised, ZeroDivisionError)`. *Why:* exact match.  
- Then tests `isinstance(raised, ArithmeticError)`. *Why:* inheritance walk.  
**ZeroDivisionError is caught by except ArithmeticError.**

**Example 2 — SystemExit bypass**  
*Given:* sys.exit() called inside a broad handler.  
*Find:* Whether the handler runs.  
- sys.exit raises SystemExit. *Why:* documented behaviour.  
- except Exception does not match. *Why:* SystemExit is not a descendant of Exception.  
**Program terminates without executing the handler body.**

**Example 3 — Custom hierarchy**  
*Given:* User class MyError(Exception) and MyNetworkError(MyError).  
*Find:* Handler that catches both.  
- Define the two classes. *Why:* explicit inheritance from Exception.  
- Raise MyNetworkError. *Why:* creates instance of the leaf.  
- except MyError matches. *Why:* subclass test succeeds.  
**Both custom errors are caught by the single parent handler.**

**Example 4 — GeneratorExit propagation**  
*Given:* A generator that catches Exception.  
*Find:* Effect of close().  
- g.close() raises GeneratorExit inside the generator. *Why:* documented protocol.  
- except Exception does not match. *Why:* GeneratorExit inherits directly from BaseException.  
- Generator terminates. *Why:* uncaught GeneratorExit forces termination.  
**The broad handler cannot suppress forced generator shutdown.**

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| except Exception catches SystemExit | Programmer forgets the root split           | Catch BaseException only when you truly must |
| Catching BaseException in a server loop | Desire to “never crash”                     | Let SystemExit and KeyboardInterrupt escape  |
| Defining custom exceptions from object | Old habit from other languages              | Always inherit from Exception (or a subclass)|
| Overly deep custom hierarchy      | Attempt to mirror every possible error      | Keep depth ≤ 3; prefer existing groupings    |
| Masking KeyboardInterrupt in threads | Using bare except in worker code            | Re-raise BaseException after logging         |
| Assuming all built-ins inherit from Exception | Surface inspection of help(Exception)       | Check the explicit tree in the documentation |
| Using except: without a type      | Syntactic convenience                       | Replace with except BaseException            |

## 7. The textbook-precise statement
From the Python Language Reference, §4.3 (Exceptions):

> Exceptions are a means of breaking the normal flow of control of a code block in order to handle errors or other exceptional conditions. An exception is an instance of a class that inherits from BaseException. A clause of the form “except E” matches an exception instance x if E is x’s class or a base class of x’s class, with the exception that SystemExit, KeyboardInterrupt and GeneratorExit are not considered subclasses of Exception.

## 8. Visual — diagram or schematic
```text
BaseException
│
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
    ├── OSError
    │   └── ...
    └── ... (many others)
```
Each edge represents “is a subclass of”. An except clause naming any node matches any node in its subtree.

## 9. The memory technique
1. **The hook** — Picture a family tree where BaseException is the great-grandparent; only the three “exit” children sit at the same level as the huge Exception branch that contains every everyday error.
2. **What to overlearn** — BaseException → Exception split; every custom exception inherits from Exception.
3. **Spaced-repetition schedule** — Review the ASCII tree at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking “which errors must never be swallowed?” → those three classes must sit outside Exception.

## 10. What this unlocks
Mastery of the hierarchy lets you write precise recovery logic, design libraries that expose grouped error types, and avoid the classic “bare except” anti-pattern.

- Next: contextlib.suppress and the with statement for exception translation  
- Custom exception design for domain libraries  
- asyncio task cancellation and concurrent.futures exception wrapping  
- Logging of exception chains with __cause__ and __context__

## 11. Self-check — five questions, no answers
1. Which single except clause catches both IndexError and KeyError?  
2. What happens to a KeyboardInterrupt raised inside a block guarded only by except Exception?  
3. Write the shortest class definition that lets a user-defined error be caught by except Exception.  
4. Why does the asyncio library raise CancelledError from BaseException rather than Exception?  
5. A library defines FileParsingError(Exception) and JSONParsingError(FileParsingError). Which handler catches a raised JSONParsingError?