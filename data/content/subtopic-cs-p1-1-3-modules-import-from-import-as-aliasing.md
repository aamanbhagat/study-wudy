## What it is
A **module** in Python is simply a file containing Python code, like functions and variables, with a `.py` extension. The `import` statement is the mechanism to load code from one module into another, allowing you to reuse code and organize large projects into logical parts. This creates separate **namespaces**, which are like containers that prevent names from conflicting.

## Why it matters
This is the bedrock of all non-trivial software. In rocket science, you won't write the code for matrix multiplication or numerical integration from scratch; you'll `import numpy`. To plot a trajectory or analyze simulation data, you'll `import matplotlib`. In machine learning, entire frameworks like `tensorflow` or `pytorch` are brought into your project with a single `import` line, giving you access to years of expert development.

## When to study it
You must be comfortable with Python's basic syntax. Specifically, you should understand:
1.  **Variables:** Creating and assigning values.
2.  **Functions:** Defining a function with `def` and calling it.
3.  **File I/O:** Knowing how to create, save, and run a `.py` file from your terminal.

If you have not written and run a Python script that defines and calls its own functions, pause and do that first.

## How to study it (step by step)
1.  **Create a module:** Create a directory for this lesson. Inside it, create a file named `physics_const.py`. In this file, define two variables:
    ```python
    # physics_const.py
    G = 6.67430e-11  # Gravitational constant in m^3 kg^-1 s^-2
    C = 299792458    # Speed of light in m/s
    ```
2.  **Use `import`:** Create a second file, `main.py`, in the same directory. To access the constants, import the module and access its contents using dot notation (`module_name.variable_name`).
    ```python
    # main.py
    import physics_const
    
    print(f"The gravitational constant is: {physics_const.G}")
    print(f"The speed of light is: {physics_const.C}")
    ```
    Run `main.py`. Observe how you must prefix `G` and `C` with `physics_const.`. This is the namespace in action.

3.  **Use `from...import`:** Modify `main.py` to import names directly into the current namespace. This removes the need for the prefix.
    ```python
    # main.py
    from physics_const import G
    
    print(f"The gravitational constant is: {G}")
    # The line below will now fail, because C was not imported.
    # print(f"The speed of light is: {physics_const.C}") 
    ```
    Run this. Note the direct access to `G` and the `NameError` if you try to access `C` (or `physics_const.G`).

4.  **Use aliasing with `as`:** Aliasing is used to rename an imported module or object, typically to shorten a long name or avoid a name conflict. Modify `main.py` to import the entire module with a shorter alias.
    ```python
    # main.py
    import physics_const as pc
    
    print(f"G is {pc.G} and C is {pc.C}")
    ```
    This is extremely common. You will always see `import numpy as np` or `import pandas as pd`.

5.  **Use aliasing with `from...import...as`:** You can also rename a specific object you are importing.
    ```python
    # main.py
    from physics_const import G as GRAVITY
    
    print(f"The constant of gravity is: {GRAVITY}")
    ```
    This is useful when the imported name (like `G`) is too generic and might clash with another variable in your script.

## Key ideas, with intuition
1.  **Modules are Toolboxes (Namespaces):** Think of a module as a toolbox with labeled tools inside.
    *   `import toolbox` brings the entire toolbox into your workshop. To use a screwdriver, you must specify `toolbox.screwdriver`. The toolbox itself provides a namespace, keeping its tools separate from yours.

2.  **`from...import` is Unpacking:**
    *   `from toolbox import screwdriver` is like taking only the screwdriver out of the toolbox and placing it on your workbench. Now you can just grab `screwdriver`. This is convenient, but if you already have a tool named `screwdriver` on your bench, you'll have a name collision. The new one replaces the old one.

3.  **`as` is a Nickname Label:**
    *   `import very_long_toolbox_name as vltn` is like putting a short sticky note label "vltn" on the toolbox. It's the same toolbox, just a shorter name to use: `vltn.screwdriver`.
    *   `from toolbox import screwdriver as sd` is like putting a sticky note "sd" on the screwdriver itself after taking it out of the box.

## Worked example
Let's build a simple rocket science calculator. We'll have one module for formulas and a main script to use them.

**Step 1: Create the module file `orbital_mechanics.py`**
This module will contain the formula for orbital velocity. It needs the gravitational constant, which we will also define here.

```python
# orbital_mechanics.py

# A constant specific to this module
G = 6.67430e-11  # m^3 kg^-1 s^-2

def orbital_velocity(mass_central_body, orbital_radius):
    """Calculates the orbital velocity of a satellite."""
    if orbital_radius <= 0:
        return 0
    # We need the sqrt function from Python's built-in math library
    from math import sqrt
    
    velocity = sqrt((G * mass_central_body) / orbital_radius)
    return velocity

```

**Step 2: Create the main script `mission_planner.py`**
This script will use our new module to calculate the orbital velocity for a satellite around Earth.

```python
# mission_planner.py

# Import our custom module and give it a convenient alias
import orbital_mechanics as om

# Define mission-specific parameters
MASS_EARTH = 5.972e24  # kg
ORBIT_ALTITUDE = 408000  # meters (ISS altitude)
RADIUS_EARTH = 6371000  # meters

# Calculate the total orbital radius
total_radius = RADIUS_EARTH + ORBIT_ALTITUDE

# Use the function from our module
iss_velocity = om.orbital_velocity(MASS_EARTH, total_radius)

print(f"Required velocity for ISS orbit: {iss_velocity:.2f} m/s")
```

**Step 3: Run and Reflect**
Execute `python mission_planner.py`. The output should be `Required velocity for ISS orbit: 7668.88 m/s`.

*   **Why `import orbital_mechanics as om`?** We imported the whole module because we might want to use other things from it later. We used `as om` because the full name is long to type repeatedly. The call `om.orbital_velocity(...)` is explicit and clear about where the function comes from.
*   **Why `from math import sqrt` inside the function?** This is a stylistic choice. It limits the scope of `sqrt` to just that function. It also avoids polluting the module's top-level namespace. The name `sqrt` is unambiguous and universally understood, making it a safe candidate for `from...import`.

## Diagrams

Here is a diagram of the namespace created by `import orbital_mechanics as om`:

```text
+--------------------------------+
| Namespace: mission_planner.py  |
|--------------------------------|
| MASS_EARTH = 5.972e24          |
| ORBIT_ALTITUDE = 408000        |
| RADIUS_EARTH = 6371000         |
| total_radius = ...             |
| iss_velocity = ...             |
|                                |
| om  -------------------------->+--------------------------------+
+--------------------------------+ | Namespace: orbital_mechanics   |
                                 |--------------------------------|
                                 | G = 6.674...                   |
                                 | orbital_velocity = <function>  |
                                 +--------------------------------+
```

Here is how the namespace would look if we had used `from orbital_mechanics import orbital_velocity`:

```text
+--------------------------------+
| Namespace: mission_planner.py  |
|--------------------------------|
| MASS_EARTH = 5.972e24          |
| ORBIT_ALTITUDE = 408000        |
| RADIUS_EARTH = 6371000         |
| total_radius = ...             |
| iss_velocity = ...             |
|                                |
| orbital_velocity = <function>  |  <-- Copied directly from the module
+--------------------------------+
```

## Memory technique — remember this forever
1.  **The Library Analogy:**
    *   `import library`: You check out the entire "Physics" section of the library. To read a book, you must go to that section first: `Physics.GeneralRelativity`.
    *   `from library import book`: You go to the "Physics" section and check out just the `GeneralRelativity` book. You can now read `GeneralRelativity` directly at your desk.
    *   `import library as lib`: You check out the "Physics" section but put a short "PHY" sticker on it for convenience. You still access books via `PHY.GeneralRelativity`.

2.  **Must Overlearn:** Memorize these three patterns. They cover 99% of use cases.
    *   `import numpy as np` (Import a whole library with a standard alias)
    *   `from math import sqrt, pi` (Import a few, common items from a module)
    *   `import my_project.utils` (Import your own code)

3.  **Spaced Repetition Schedule:**
    *   Day 1: Reread this lesson. Do the self-check questions.
    *   Day 3: Write a new module and a script that imports it from scratch.
    *   Day 7: Explain the difference between `import x` and `from x import y` to a rubber duck or a friend.
    *   Day 16: Refactor an old script of yours to use a separate module for its functions.
    *   Day 35: Find a simple script on GitHub and identify the three main import patterns.

4.  **First Principles Pathway:** If you ever forget, you can rebuild the concept from nothing.
    *   Create `file_a.py` with `my_variable = 100`.
    *   Create `file_b.py` with `print(my_variable)`. Run it. It fails (`NameError`).
    *   Add `import file_a` to `file_b.py`. Run it. It still fails.
    *   Change the print to `print(file_a.my_variable)`. Run it. It works. You have just re-derived the concept of namespaces.

## Common mistakes
1.  **Circular Imports:** `a.py` imports `b.py`, and `b.py` imports `a.py`. This creates an infinite loop that Python will halt with an `ImportError`. The solution is to refactor your code so the dependency is one-way.
2.  **Shadowing a Standard Library:** Naming your file `math.py` or `os.py`. When your code later executes `import math`, Python might find your file first and import it instead of the built-in module, causing bizarre errors. Never name your files after standard library modules.
3.  **`from module import *`:** This imports all names from the module into your current namespace. It seems convenient but is terrible practice because it makes it impossible to know where a variable or function came from, leading to "magic" names and hard-to-debug code. Avoid it.
4.  **Forgetting the Path:** If `my_module.py` is in a subdirectory `utils/`, you cannot just `import my_module`. You must either handle the Python path or use relative imports (a more advanced topic). For now, keep your files in the same directory.

## Self-check
1.  Create a file `conversions.py`. Inside, write two functions: `celsius_to_kelvin(c)` and `kelvin_to_celsius(k)`. In a second file, `temperature_check.py`, import the entire `conversions` module and use it to print the value of 100°C in Kelvin.
2.  Modify `temperature_check.py` so that it only imports the `celsius_to_kelvin` function. Furthermore, inside your script, rename it to `C_to_K` using aliasing. Use this new name to perform the same calculation.
3.  Imagine you have a file `rocket.py` that defines a class `Rocket`. You also have a file `engine.py` that defines a class `Engine`. The `Rocket` class needs to use an `Engine` object. In a final script `launch.py`, you need to build a `Rocket`. What `import` statements would you write in `rocket.py` and `launch.py` to make this work?