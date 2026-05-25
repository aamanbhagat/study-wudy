## What it is
Raising an exception is the act of deliberately signaling that an error or exceptional condition has occurred in your code using the `raise` keyword. A custom exception is a user-defined error type, created by defining a new class that inherits from Python's built-in `Exception` class, allowing you to create more specific and descriptive error signals.

## Why it matters
In complex systems like flight control software or physics simulations, generic errors are insufficient and dangerous. A custom `NavigationComputerError` is far more informative than a generic `ValueError`. In machine learning, you might raise a `ModelDivergenceError` to signal that a model's training is failing, allowing the system to gracefully stop, save its state, and alert an operator, rather than crashing silently or producing nonsensical results.

## When to study it
You must be comfortable with these prerequisites first. If not, master them and return.
1.  **Basic Python Syntax:** Variables, loops, conditionals.
2.  **Functions:** Defining and calling functions (`def`, `return`).
3.  **Basic `try...except`:** You should already know how to *catch* existing exceptions like `ValueError` or `ZeroDivisionError`.
4.  **Object-Oriented Programming (OOP):** You must understand classes and inheritance (`class MyClass(ParentClass):`). This is non-negotiable for custom exceptions.

## How to study it (step by step)
1.  **Master `raise` with built-ins (15 min):** Open an interpreter. Write a function `calculate_kinetic_energy(mass, velocity)` that calculates $E_k = \frac{1}{2}mv^2$. Add a check: if `mass < 0`, `raise ValueError("Mass cannot be negative.")`. Call it with a negative mass and observe the program halting with your specific message.
2.  **Define your first custom exception (10 min):** Below your function, define a new class: `class NonPhysicalValueError(Exception): pass`. The `pass` keyword means it has no special behavior yet; it just exists as a new type. Inheritance from `Exception` is what makes it a valid exception.
3.  **Refactor to use the custom exception (10 min):** Change your function to `raise NonPhysicalValueError("Mass cannot be negative.")` instead of `ValueError`. Run the code again. Notice how the error type reported in the traceback is now your own custom type. This is a huge leap in code clarity.
4.  **Catch the custom exception (15 min):** Wrap the call to your function in a `try...except` block. Specifically, `except NonPhysicalValueError as e:`. Inside the block, print a user-friendly message, like `print(f"Caught a simulation error: {e}")`. This demonstrates how callers of your code can handle the specific errors you've designed.
5.  **Add context to your exception (20 min):** Modify your custom exception class to store data.
    ```python
    class NonPhysicalValueError(Exception):
        def __init__(self, message, invalid_value):
            super().__init__(message)
            self.invalid_value = invalid_value
    ```
    Now, when you raise it, do so with `raise NonPhysicalValueError("Mass cannot be negative.", invalid_value=mass)`. In your `except` block, you can now access `e.invalid_value` to log the exact data that caused the problem.

## Key ideas, with intuition
1.  **Exceptions are Signals, Not Just Crashes:** Think of `raise` as launching a signal flare. Normal code execution stops and the Python interpreter looks "up" the call stack for someone equipped to handle that specific flare (an `except` block). If no handler is found, the whole program halts. Your job is to launch the *right kind* of flare.
2.  **Specificity Creates Robustness:** Using a generic `Exception` is like yelling "Help!". Using a custom `EngineGimbalRangeError` is like yelling "Actuator on engine three is past its limit!". The second is actionable; the first is just noise. The more specific your exception types, the more precisely you can handle failures.
3.  **Exceptions are Objects:** When you write `class MyError(Exception):`, you are defining a new type of object. When you `raise MyError("...")`, you are creating an *instance* of that object. This is powerful because objects can hold data. You can attach the exact values, timestamps, and context that led to the error directly to the exception object itself, providing a rich "black box" recording of the failure.
4.  **The Inheritance Hierarchy is a Catching Net:**
    $$
    \text{BaseException} \to \text{Exception} \to \text{ValueError} \to \text{MyCustomValueError}
    $$
    When you write `except ValueError:`, you catch `ValueError` and any class that inherits from it (like `MyCustomValueError`, if you defined it that way). When you write `except Exception:`, you cast a wider net, catching almost all standard errors. Be specific in what you catch.

## Worked example
Let's model a function that calculates the change in velocity ($\Delta v$) for a rocket stage using the Tsiolkovsky rocket equation: $\Delta v = v_e \ln(\frac{m_0}{m_f})$, where $v_e$ is the effective exhaust velocity, $m_0$ is the initial mass, and $m_f$ is the final mass.

**Problem:** The ratio $\frac{m_0}{m_f}$ must be greater than 1 (since fuel is expended), and both masses must be positive. We need to enforce these physical constraints.

**Solution:**

```python
import math

# 1. Define custom exceptions to represent specific physical impossibilities.
class MassRatioError(Exception):
    """Raised when the initial mass is not greater than the final mass."""
    def __init__(self, m0, mf):
        self.m0 = m0
        self.mf = mf
        message = f"Invalid mass ratio: initial mass m0 ({m0} kg) must be > final mass mf ({mf} kg)."
        super().__init__(message)

class NegativeMassError(Exception):
    """Raised when a negative mass is provided."""
    pass # No extra data needed, the message is enough.

# 2. Define the core function that performs the calculation and raises errors.
def calculate_delta_v(exhaust_velocity_m_s, initial_mass_kg, final_mass_kg):
    """Calculates delta-v, raising errors for non-physical inputs."""
    if initial_mass_kg < 0 or final_mass_kg < 0:
        raise NegativeMassError("Mass values cannot be negative.")
    
    if initial_mass_kg <= final_mass_kg:
        raise MassRatioError(m0=initial_mass_kg, mf=final_mass_kg)
        
    mass_ratio = initial_mass_kg / final_mass_kg
    delta_v = exhaust_velocity_m_s * math.log(mass_ratio)
    return delta_v

# 3. Use a try/except block to call the function and handle potential errors gracefully.
if __name__ == "__main__":
    # A valid case
    try:
        dv = calculate_delta_v(exhaust_velocity_m_s=4500, initial_mass_kg=20000, final_mass_kg=5000)
        print(f"Calculated Delta-V: {dv:.2f} m/s")
    except (MassRatioError, NegativeMassError) as e:
        print(f"Error in calculation: {e}")

    # An invalid case
    print("\n--- Testing error handling ---")
    try:
        # This will fail because m0 <= mf
        dv = calculate_delta_v(exhaust_velocity_m_s=4500, initial_mass_kg=5000, final_mass_kg=20000)
        print(f"Calculated Delta-V: {dv:.2f} m/s")
    except MassRatioError as e:
        print(f"Caught a specific mass ratio error.")
        print(f"Details: {e}")
        print(f"Offending values were m0={e.m0}, mf={e.mf}")
    except NegativeMassError as e:
        print(f"Caught a negative mass error: {e}")

```

**Reflection:**
-   **Step 1 (Defining Exceptions):** We created two distinct error *types*. `MassRatioError` is more complex because it's useful to know *both* invalid values, so we store them as attributes. This makes debugging far easier.
-   **Step 2 (Raising Exceptions):** The function acts as a "guardian" of physical laws. Before performing the calculation, it validates its inputs. The `raise` statements transfer control immediately, preventing the `math.log` function from receiving an invalid argument (e.g., $\ln(x)$ where $x \le 0$).
-   **Step 3 (Catching Exceptions):** The calling code anticipates these specific failures. It uses an `except MassRatioError as e:` block to run special code only for that failure mode, where it can inspect the `e.m0` and `e.mf` attributes we thoughtfully added. This is robust error handling.

## Diagrams

**Program Flow with `raise`**

```text
      Normal Execution Flow
              |
              V
+---------------------------+
| def my_function(x):       |
|   if x < 0:               |
|     raise ValueError() ---+------> Jumps out of the function immediately
|   ...                     |
+---------------------------+
              | (if x >= 0)
              V
      Continues normally


+---------------------------+
| try:                      |
|   my_function(-5)         |
| except ValueError: <------+------ Catches the raised exception
|   print("Handled!")       |
+---------------------------+
              |
              V
      Execution continues after the try/except block
```

**Exception Class Hierarchy**

```text
        +-----------------+
        | BaseException   |  (Root of all exceptions)
        +-----------------+
                ^
                | (inherits from)
        +-----------------+
        |   Exception     |  (Root of all non-system-exiting errors)
        +-----------------+
                ^
                |
+--------------------+------------------+
|                    |                  |
V                    V                  V
+--------------+  +----------------+  +--------------------+
| ValueError   |  | TypeError      |  | ... (other built-ins)
+--------------+  +----------------+  +--------------------+
      ^
      |
+--------------------+
| MyCustomValueError | (Your custom error can inherit from a specific built-in)
+--------------------+
```

## Memory technique — remember this forever
1.  **The Story: The "Chain of Command" Abort.**
    Imagine a sensor on a rocket engine (`function_A`). It detects a critical failure (e.g., `pressure < threshold`). The sensor's code doesn't know how to abort the launch; its only job is to signal the problem. It does this by `raise`-ing a `FuelPumpPressureLowError`.
    This "alarm" travels up the chain of command to the function that called it, the engine controller (`function_B`). The engine controller might not know how to abort either, so the exception keeps traveling up.
    Finally, it reaches the main launch sequencer (`main` loop). The sequencer has a `try...except FuelPumpPressureLowError:` block. This is the mission controller who *does* know what to do. It catches the specific signal and initiates the abort sequence. If the signal was a generic `Exception`, the controller might not know whether to abort or just log a warning. **`raise` is the subordinate reporting a specific problem up the chain.**

2.  **Must Overlearn:**
    *   To signal an error: `raise ExceptionClassName("A clear message about what went wrong.")`
    *   To define a new error type: `class MySpecificError(Exception): pass`

3.  **Spaced Repetition Schedule:**
    Review this entire lesson and rewrite the worked example from memory at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:**
    If you forget everything, start here: An error is an exceptional state. In Python, we represent states with objects. So, an error must be an object. To create a new *type* of object, we define a `class`. To make sure Python knows this class represents an error, it must inherit from the base `Exception` class. The `raise` keyword is simply the special instruction to the interpreter: "Stop normal flow, and start carrying this error object up the call stack until you find a matching `except` block."

## Common mistakes
1.  **Catching `Exception` too broadly:** Writing `except Exception:` is lazy and dangerous. It will catch `ValueError`, `TypeError`, and your own custom errors, hiding bugs you didn't anticipate. Always catch the most specific exception you expect.
2.  **Raising a generic `Exception`:** Don't write `raise Exception("Something bad happened")`. The whole point of custom exceptions is to be specific. Create and raise `InvalidInputError` or `SensorTimeoutError` instead.
3.  **Forgetting to inherit from `Exception`:** If you write `class MyError: pass`, it's just a regular class. `raise MyError()` will cause a `TypeError` because you can only raise objects that inherit from `BaseException`.
4.  **Suppressing exceptions without logging:** An empty `except` block (`except MyError: pass`) swallows the error silently. The program continues as if nothing happened, which can lead to corrupt data or undefined behavior later on. At a minimum, log the error.

## Self-check
1.  Write a function `set_thruster_angle(angle_degrees)` that takes an angle. If the angle is not between -15 and +15 degrees, `raise` a `ValueError` with an appropriate message.
2.  Create a custom exception class named `ThrusterRangeError` that inherits from `ValueError`. Modify your function from question 1 to `raise` this new exception instead.
3.  Modify your `ThrusterRangeError` class to accept and store the out-of-range angle that was attempted. Write a `try...except` block that calls your function with an invalid angle (e.g., 20 degrees), catches the `ThrusterRangeError`, and prints a message like: "Error: Commanded angle of 20 degrees is outside the operational range of +/-15 degrees."