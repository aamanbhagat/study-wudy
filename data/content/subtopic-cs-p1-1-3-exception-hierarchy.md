## What it is
The exception hierarchy in Python is a tree-like structure of built-in error classes. More general errors serve as "parents" (base classes) for more specific errors, which are their "children" (subclasses). This inheritance relationship means a `ValueError` *is an* `Exception`, just as a square *is a* rectangle.

## Why it matters
In complex systems like flight control software or physics simulations, different errors require different responses. A `FileNotFoundError` when loading a mission profile is a critical failure, while a `ValueError` from a sensor reading might be handled by using the last known value and flagging the sensor for maintenance. The hierarchy allows you to write code that precisely catches and handles specific categories of failures without accidentally catching and silencing unrelated bugs.

## When to study it
You should be comfortable with these prerequisites first:
1.  **Basic `try...except` blocks:** You must know how to catch a single, specific exception like `ValueError`.
2.  **Object-Oriented Programming (OOP) basics:** You must understand what classes are and, crucially, the concept of **inheritance**. Without understanding that a child class inherits the properties of a parent class, the term "hierarchy" will be meaningless.

If you are not solid on class inheritance, pause and review that topic first.

## How to study it (step by step)
1.  **Inspect the tree:** Open a Python interpreter. Import a module that isn't installed (`import no_such_module`). The `ModuleNotFoundError` you get is a specific error. Now, inspect its lineage with `help(ModuleNotFoundError)`. Notice its "Method Resolution Order" shows it inherits from `ImportError`, which inherits from `Exception`, which inherits from `BaseException`.
2.  **Verify relationships programmatically:** Use the `issubclass()` built-in function to confirm the hierarchy. In an interpreter, run `issubclass(ValueError, Exception)` (will be `True`) and `issubclass(Exception, ValueError)` (will be `False`). Test this for `KeyError` and `LookupError` as well.
3.  **Write ordered `except` blocks:** Write a function that can raise a `ValueError`. In your `try` block, call it. Write two `except` blocks: first `except ValueError:`, then `except Exception:`. Trigger the error and see the specific block run.
4.  **Reverse the order (and see it break):** Now, swap the `except` blocks from the previous step. Put `except Exception:` *before* `except ValueError:`. Run the code again. Observe that the general `Exception` block runs, and the specific `ValueError` block is never reached. This demonstrates why order is critical.
5.  **Create your own exception:** Define a custom exception for a specific domain, like a physics simulation.
    ```python
    class SingularityError(Exception):
        """Raised when a calculation approaches a singularity."""
        pass
    ```
    Write a function that `raise SingularityError("Division by zero at event horizon.")` and catch it specifically. This solidifies your understanding of exceptions as regular classes.

## Key ideas, with intuition
1.  **Inheritance creates an "is-a" relationship:** The core idea is that a specific error *is a* type of a more general error. A `ZeroDivisionError` is a type of `ArithmeticError`, which in turn is a type of `Exception`. This is the same "is-a" logic from standard object-oriented design.
2.  **Catching a parent also catches the children:** When you write `except ArithmeticError:`, you are setting a net that will catch `ZeroDivisionError`, `OverflowError`, and `FloatingPointError` because they all inherit from `ArithmeticError`.
    $$
    \text{If } E_{child} \text{ is a subclass of } E_{parent}, \text{ then an } \texttt{except } E_{parent}\texttt{:} \text{ block will catch an instance of } E_{child}.
    $$
3.  **The interpreter checks `except` blocks sequentially:** Python looks at your `except` blocks from top to bottom. It executes the *first one* that matches the raised exception. This is why a general `except Exception:` will "shadow" and prevent a more specific, later block like `except ValueError:` from ever running. Always order `except` blocks from most specific to most general.
4.  **`BaseException` is the root of everything:** All exceptions, including things you usually shouldn't catch like `SystemExit` (from `sys.exit()`) or `KeyboardInterrupt` (from Ctrl+C), inherit from `BaseException`. For application-level errors, you should almost always catch subclasses of `Exception`, not `BaseException`, to avoid interfering with the basic operation of the interpreter.

## Worked example
Let's write a function to calculate the kinetic energy $K = \frac{1}{2}mv^2$, but with robust error handling.

```python
def calculate_kinetic_energy(mass, velocity):
    """Calculates kinetic energy, handling specific input errors."""
    if not isinstance(mass, (int, float)) or not isinstance(velocity, (int, float)):
        # The types are wrong. This is a fundamental programming error.
        raise TypeError("Mass and velocity must be numeric.")
    if mass < 0:
        # The value is invalid for the physical domain.
        raise ValueError("Mass cannot be negative.")
    
    return 0.5 * mass * velocity**2

# --- Main execution ---
test_cases = [
    (10, 20),       # Valid
    (-5, 20),       # Invalid value
    ("10kg", 20),   # Invalid type
    (10, "fast")    # Invalid type
]

for m, v in test_cases:
    try:
        ke = calculate_kinetic_energy(m, v)
        print(f"Input: ({m}, {v}). Kinetic Energy: {ke:.2f} J")
    except ValueError as e:
        # Handle domain-specific value errors.
        print(f"Input: ({m}, {v}). FAILED: Invalid physical value. {e}")
    except TypeError as e:
        # Handle programmer errors (wrong data types).
        print(f"Input: ({m}, {v}). FAILED: Invalid data type. {e}")
    except Exception as e:
        # A catch-all for anything else we didn't anticipate.
        print(f"Input: ({m}, {v}). FAILED: An unexpected error occurred: {type(e).__name__}")

```
**Output:**
```
Input: (10, 20). Kinetic Energy: 2000.00 J
Input: (-5, 20). FAILED: Invalid physical value. Mass cannot be negative.
Input: ('10kg', 20). FAILED: Invalid data type. Mass and velocity must be numeric.
Input: (10, 'fast'). FAILED: Invalid data type. Mass and velocity must be numeric.
```
**Reflection:**
-   The `try` block attempts the core logic.
-   The `except ValueError` is triggered specifically by `mass < 0`, allowing a tailored response about physical constraints.
-   The `except TypeError` is triggered by non-numeric inputs, allowing a different response about data format.
-   If we had put `except Exception` first, it would have caught *all* the errors, and we would have lost the ability to distinguish between a bad value and a bad type. The specificity of the hierarchy, combined with correct ordering, enables this precise control.

## Diagrams
Here is a simplified view of the Python exception hierarchy. Think of it as a family tree where the lines denote inheritance ("is a child of").

```text
                 BaseException
                      |
      +---------------+---------------+
      |               |               |
SystemExit      KeyboardInterrupt   Exception
                                        |
                  +---------------------+------------------+
                  |                     |                  |
            ArithmeticError        LookupError        ValueError
                  |                     |
      +-----------+---------+     +-----+------+
      |           |         |     |            |
ZeroDivisionError |   OverflowError IndexError   KeyError
                  |
          FloatingPointError
```

## Memory technique — remember this forever
1.  **The "Hospital Triage" Story:** Think of your `try...except` block as a hospital emergency room. A patient (the exception) comes in. The first nurse they see is the first `except` block.
    -   `except CardiacArrestError:` is the cardiac specialist. They handle only that one, critical thing.
    -   `except BrokenBoneError:` is the orthopedist. They handle bone issues.
    -   `except Exception:` is the General Practitioner at the end of the hall. They'll see anyone the specialists didn't grab.
    If you put the GP at the front door (`except Exception:` first), they would grab every patient, and the cardiac specialist would never see the heart attack victim. **Triage from most specific to most general.**

2.  **Must overlearn:**
    -   `except SpecificError:` must come before `except GeneralError:`.
    -   To create a custom error: `class MyCustomError(Exception): pass`.
    -   Catch `Exception`, not `BaseException`, for application logic.

3.  **Spaced Repetition Schedule:**
    -   Review this material in: 1 day, 3 days, 7 days, 16 days, 35 days.
    -   In each review, rewrite the "Hospital Triage" story in your own words and re-draw the ASCII hierarchy diagram from memory.

4.  **First Principles Pathway:** If you forget the hierarchy, you can always rebuild it directly from the source of truth: the Python interpreter. For any exception type, find its parents using the Method Resolution Order (`__mro__`) attribute.
    ```python
    >>> KeyError.__mro__
    (<class 'KeyError'>, <class 'LookupError'>, <class 'Exception'>, <class 'BaseException'>, <class 'object'>)
    ```
    This tuple tells you the exact inheritance chain: `KeyError` -> `LookupError` -> `Exception` -> `BaseException`.

## Common mistakes
1.  **Overly broad `except` clauses:** Writing `except Exception:` (or the even worse bare `except:`) to catch all errors. This is dangerous because it will catch and hide unexpected bugs (`TypeError`, `NameError`) that you *should* know about, making your code silently fail or produce incorrect results. It's like disabling a fire alarm because it's noisy.
2.  **Incorrect `except` order:** As shown above, placing `except GeneralError:` before `except SpecificError:` makes the specific block unreachable. This is a common logical error.
3.  **Swallowing exceptions:** Catching an exception and then doing nothing with it (`pass`). Unless you have an explicit and well-justified reason for ignoring an error, you should at least log it or signal the failure to the calling code.

## Self-check
1.  Without running code, what is the relationship between `IndexError` and `LookupError`? Which `except` block should come first if you wanted to catch both specifically?
2.  Write a program that reads numbers from a file, one per line, and calculates their sum. It must handle three distinct situations: the file not existing (`FileNotFoundError`), a line in the file not being a valid number (`ValueError`), and any other I/O related issue (`IOError`). Ensure each case prints a unique, informative message.
3.  Define a custom exception hierarchy for a simple physics engine. Start with a base `PhysicsError(Exception)`. Create two subclasses: `UnstableSimulationError(PhysicsError)` and `CollisionError(PhysicsError)`. Write a dummy `run_simulation` function that, based on its inputs, can raise any of these three exceptions. Your main code block should catch `UnstableSimulationError` and print "Warning: Simulation is unstable, reducing timestep.", catch `CollisionError` and print "Error: Collision detected, halting.", and catch the base `PhysicsError` for any other physics-related problems.