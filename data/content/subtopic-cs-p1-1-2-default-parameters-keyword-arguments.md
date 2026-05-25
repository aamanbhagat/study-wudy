## What it is
Default parameters provide a fallback value for a function's parameter if the caller does not supply an argument for it. Keyword arguments allow the caller to pass arguments by explicitly naming the parameter they correspond to, freeing them from the strict left-to-right order of positional arguments.

## Why it matters
This is not a minor syntactic convenience; it is fundamental to creating flexible, readable, and scalable code. In physics and engineering simulations, functions can have dozens of parameters representing physical constants or configuration settings (e.g., gravitational constant, atmospheric drag coefficient, simulation timestep). Providing sensible defaults makes the function easy to use for standard cases, while keyword arguments allow you to selectively override specific parameters for advanced cases without needing to remember their exact order.

## When to study it
You must have a solid understanding of basic Python functions. Specifically, you should know:
1.  How to define a function using `def`.
2.  The difference between a *parameter* (the variable in the function definition) and an *argument* (the value passed in during a function call).
3.  How to use *positional arguments*, where arguments are matched to parameters based on their order.

If these concepts are not clear, review them before proceeding.

## How to study it (step by step)
1.  **Positional Baseline:** Write a function `calculate_force(mass, acceleration)` that returns `mass * acceleration`. Call it with two positional arguments, e.g., `calculate_force(10, 9.81)`.
2.  **Introduce a Default:** Modify the function to `calculate_force(mass, acceleration=9.81)`. The `acceleration` parameter now has a default value. Call it in two ways: `calculate_force(10)` and `calculate_force(10, 1.62)` (simulating Earth and Moon gravity). Observe how the default is used or overridden.
3.  **Introduce Keyword Arguments:** Call your function from step 2 using keyword arguments: `calculate_force(mass=10, acceleration=1.62)`. Now, reverse the order: `calculate_force(acceleration=1.62, mass=10)`. Verify that the result is identical. This demonstrates that keywords free you from position.
4.  **Mix Positional and Keyword:** Try to call the function like this: `calculate_force(10, acceleration=1.62)`. This works. Now try `calculate_force(mass=10, 9.81)`. This will raise a `SyntaxError`. Internalize the rule: *positional arguments must come before keyword arguments*.
5.  **The Mutable Default Trap:** Define this function: `def add_to_list(item, target_list=[]): target_list.append(item); return target_list`. Call it once: `print(add_to_list(1))`. Call it a second time: `print(add_to_list(2))`. The output of the second call is `[1, 2]`, which is unexpected. We will dissect why in the "Key ideas" section.
6.  **Real-World Signature:** Find the documentation for a function in a scientific library, like `scipy.integrate.solve_ivp`. Look at its signature. You will see a mix of positional arguments for the essential inputs (like the function to integrate) and dozens of optional keyword arguments with defaults for controlling the solver's behavior. This is the pattern you will use and encounter constantly.

## Key ideas, with intuition
1.  **Function Call as Assignment:** Think of a function call as a process of assigning the *arguments* you provide to the *parameter* names inside the function's local scope.
    $$
    \text{def my_func(a, b, c): ...} \\
    \text{my_func(10, 20, 30)}
    $$
    This call is conceptually equivalent to performing these assignments inside `my_func`: `a = 10`, `b = 20`, `c = 30`.

2.  **Two Ways to Assign: Position or Name:** Python has two ways to figure out which argument goes to which parameter.
    *   **Positional:** The default method. It's a simple left-to-right mapping. The first argument goes to the first parameter, the second to the second, and so on.
    *   **Keyword:** This is an explicit mapping. `b=20` explicitly says "assign the value `20` to the parameter named `b`," regardless of its position.

3.  **The Rule of Resolution:** To avoid ambiguity, Python enforces a strict order. It first resolves all positional arguments. Then, it looks at the keyword arguments and assigns them. This is why `my_func(10, c=30, b=20)` is valid, but `my_func(a=10, 20, 30)` is not. In the second case, after assigning `a=10`, Python sees the positional argument `20` and doesn't know whether you intended it for `b` or `c`, because you've already broken the positional chain.

4.  **Defaults are Defined ONCE:** This is the most critical and subtle point. A function's default parameter values are created and stored *once*, when the `def` statement is first executed. They are not re-created every time the function is called. If the default value is an immutable object (like a number, string, or tuple), this is fine. But if it's a mutable object (like a list or dictionary), any in-place modification to that object during a function call will persist and be visible in subsequent calls that rely on the default.

## Worked example
Let's model the range of a projectile fired on level ground. The formula is $R = \frac{v_0^2 \sin(2\theta)}{g}$. We'll create a function to calculate this.

**Step 1: Define the function with defaults.**
We need initial velocity $v_0$ and angle $\theta$. The gravitational acceleration $g$ is a physical constant that is often the same, making it a perfect candidate for a default parameter. We'll assume SI units.

```python
import math

def calculate_projectile_range(v0, theta_deg, g=9.81):
    """
    Calculates the range of a projectile on level ground.
    
    Args:
        v0 (float): Initial velocity in m/s.
        theta_deg (float): Launch angle in degrees.
        g (float): Gravitational acceleration in m/s^2. 
                   Defaults to Earth's gravity.
    """
    # Convert angle to radians for math functions
    theta_rad = math.radians(theta_deg)
    
    # Calculate range using the formula
    range_val = (v0**2 * math.sin(2 * theta_rad)) / g
    return range_val

```

**Step 2: Call using only positional arguments (standard Earth case).**
Here, we provide `v0` and `theta_deg`. The function uses its pre-defined default for `g`.

```python
# A projectile fired at 100 m/s at a 45-degree angle on Earth
earth_range = calculate_projectile_range(100, 45)
print(f"Range on Earth: {earth_range:.2f} meters")
# Output: Range on Earth: 1019.37 meters
```
*Reflection:* This works because `100` is assigned positionally to `v0`, `45` is assigned positionally to `theta_deg`, and `g` is left unassigned by the call, so it takes its default value of `9.81`.

**Step 3: Call using keyword arguments to override the default (lunar case).**
Now, we want to simulate the same launch on the Moon, where $g \approx 1.62 \, \text{m/s}^2$.

```python
# Same launch, but on the Moon
moon_range = calculate_projectile_range(v0=100, theta_deg=45, g=1.62)
print(f"Range on Moon: {moon_range:.2f} meters")
# Output: Range on Moon: 6172.84 meters
```
*Reflection:* By using `g=1.62`, we explicitly told the function to assign `1.62` to the parameter `g`, overriding the default. Using keywords for `v0` and `theta_deg` improves readability, even though we could have passed them positionally.

## Diagrams
Here is a diagram showing how arguments map to parameters.

**Case 1: Positional Arguments**
The call `my_func(10, "hello")` maps to the definition `def my_func(num, msg):`

```text
Function Call             Function Definition
  my_func( 10  , "hello" )      def my_func(num, msg):
           |         |
           +---------+-----> num = 10
                     |
                     +-----> msg = "hello"
```

**Case 2: Keyword Arguments**
The call `my_func(msg="hello", num=10)` maps to the same definition.

```text
Function Call             Function Definition
my_func(msg="hello", num=10)    def my_func(num, msg):
           |         |
           |         +-----> num = 10
           |
           +---------------> msg = "hello"
```
Notice how the keyword "label" directs the value to the correct parameter, irrespective of position.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Imagine a pilot's pre-flight checklist.
    *   **Positional arguments** are the critical items you *must* check in order: `(flaps, landing_gear, fuel)`. Messing up the order is catastrophic.
    *   **Keyword arguments** are settings on the flight computer: `destination="JFK"`, `cruise_altitude=35000`. You can set them in any order, as long as you name them correctly.
    *   **Default parameters** are the standard settings the computer already has: `cabin_pressure=12.5`. You only need to touch it if you're flying an unusual mission.

2.  **Formulas to Overlearn:**
    *   Function definition order: `def func(pos_params, params_with_defaults):`
    *   Function call order: `func(pos_args, keyword_args)`
    *   The trap: `def bad_func(items=[]): # DANGER: mutable default`

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: 1 day, 3 days, 7 days, 16 days, 35 days.
    *   In each review, rewrite the `calculate_projectile_range` function from memory and test it.

4.  **First Principles Pathway:** If you forget the rules, remember the fundamental task: **binding values to names.** Python must have an unambiguous way to do this.
    *   It first handles the "easy" cases: positional arguments, which are unambiguous by their very nature (first to first, second to second).
    *   Then, it handles the "explicit" cases: keyword arguments, which are unambiguous because you've provided the name.
    *   This logic naturally leads to the "positional before keyword" rule. Trying to do it the other way (`keyword_arg, positional_arg`) would create ambiguity about which position the second argument should fill.

## Common mistakes
1.  **Positional argument after keyword argument:** `my_func(name="Alice", 30)`. This is a `SyntaxError`. Once you start using keywords, all subsequent arguments must also be keywords.
2.  **Non-default parameter after default parameter:** `def my_func(a=1, b):`. This is a `SyntaxError`. All parameters with default values must come after all parameters without them. The logic is: if a value is required (no default), you must be able to pass it positionally, which requires it to be on the left.
3.  **The Mutable Default Argument Trap:** Using a list or dictionary as a default value and modifying it inside the function. The modification will persist across calls. The correct pattern is:
    ```python
    def good_func(items=None):
        if items is None:
            items = []
        items.append("something")
        # ...
    ```

## Self-check
1.  Write a function `power(base, exponent)` that calculates $base^{exponent}$. Then, modify it so that `exponent` defaults to `2`. Call it to calculate $3^2$ and $3^3$.
2.  Consider the function `def configure_rocket(stages, payload_kg, engine_type="Raptor"): ...`. Which of the following calls are valid and which are invalid? Explain why for each invalid one.
    *   `configure_rocket(3, 500)`
    *   `configure_rocket(payload_kg=500, stages=3)`
    *   `configure_rocket(3, engine_type="Merlin", 500)`
    *   `configure_rocket(payload_kg=500, 3)`
3.  A simulation function for orbital mechanics is defined as `propagate_orbit(state_vector, duration, dt=0.1, mu=3.986e14)`. `state_vector` is a list `[x, y, z, vx, vy, vz]`. `mu` is the standard gravitational parameter. Explain why `dt` and `mu` are excellent candidates for default parameters, and why `state_vector` and `duration` are not.