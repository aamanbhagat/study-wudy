## What it is
The Don't Repeat Yourself (DRY) principle states that every piece of knowledge within a system should have a single, unambiguous, authoritative representation. This is often simplified to "don't write the same code twice," but its true scope includes data schemas, configuration, and documentation. The opposite is WET: "Write Everything Twice" or "We Enjoy Typing."

## Why it matters
In complex systems, repeated logic is a primary source of bugs. If a physical constant, like the gravitational constant $G$, is hard-coded in ten different places in a simulation, updating it requires finding all ten instances. Missing even one introduces a subtle, catastrophic inconsistency. In aerospace flight control software or high-frequency trading algorithms, such an error could lead to total system failure.

## When to study it
You are ready. The prerequisites are a solid understanding of basic programming constructs:
- **Functions:** How to define and call them.
- **Variables & Constants:** How to store data and give it a name.
- **Control Flow:** Basic `if/else` logic and loops.

You have these from Phase 1. We are now concerned with *how to organize* these constructs effectively, which is the essence of design principles.

## How to study it (step by step)
1.  **Identify Repetition.** Find a simple script you've written before. Read through it line by line with the sole purpose of finding two or more sections of code that look identical or perform the exact same logical task.
2.  **Abstract with a Function.** Take the first piece of repeated code you found. Encapsulate it in a function. Give the function a name that clearly describes the *knowledge* it represents (e.g., `calculate_orbital_velocity` instead of `do_calculation`).
3.  **Replace and Parameterize.** Replace all instances of the repeated code with a call to your new function. If the repeated blocks were slightly different (e.g., used different variable values), make those values parameters to your function.
4.  **Hunt for "Magic Numbers".** Scan your code again, this time for raw numbers or strings used in multiple places. A number like `9.80665` (standard gravity) appearing in several equations is a violation of DRY. Replace it with a named constant, e.g., `STANDARD_GRAVITY_M_S2`. This gives the knowledge a single source of truth.
5.  **Reflect on the Change.** Articulate precisely why the new version is better. It's not just shorter; it's more maintainable and less error-prone. If you needed to update the logic or the constant, you would now only need to change it in one place.

## Key ideas, with intuition
1.  **Single Source of Truth (SSoT).** This is the core concept. Imagine you have two clocks. If they ever disagree, you don't know the real time. If you have only one clock, you have a single source of truth. In code, every piece of logic (e.g., how to calculate a trajectory burn) or data (e.g., the specific impulse of an engine) should exist as code in exactly one place.

2.  **Abstraction is the Tool.** Abstraction is the mechanism by which we achieve DRY. When we create a function `calculate_escape_velocity(mass, radius)`, we are abstracting away the details of the formula $v_e = \sqrt{2GM/r}$. We have captured this piece of physics knowledge, given it a name, and can now reuse it without repeating the formula.

3.  **Duplication Creates Implicit Coupling.** When you copy and paste code, you create a hidden, non-obvious relationship between the original and the copy. If the business logic changes, these two separate pieces of code must be changed together. This is a fragile state; developers inevitably forget to update one of the copies, leading to bugs. DRY eliminates this dangerous coupling by creating an explicit dependency on a single, shared abstraction.

## Worked example
Let's model a simple physics scenario: calculating the kinetic energy of two different spacecraft.

**WET Version (Violates DRY):**

```python
# --- Spacecraft 1: Orion ---
orion_mass_kg = 25848
orion_velocity_ms = 11000  # Approx. trans-lunar injection speed
# Calculate kinetic energy
orion_ke_joules = 0.5 * orion_mass_kg * orion_velocity_ms**2
print(f"Orion KE: {orion_ke_joules} J")

# --- Spacecraft 2: Starliner ---
starliner_mass_kg = 13000
starliner_velocity_ms = 7800 # Approx. LEO orbital speed
# Calculate kinetic energy AGAIN
starliner_ke_joules = 0.5 * starliner_mass_kg * starliner_velocity_ms**2
print(f"Starliner KE: {starliner_ke_joules} J")
```

The formula for kinetic energy, $K = \frac{1}{2}mv^2$, is a piece of knowledge. In the code above, this knowledge is repeated. If we later decided to use a more precise relativistic formula, we would have to change it in two places.

**DRY Version (Refactored):**

```python
def calculate_kinetic_energy(mass_kg, velocity_ms):
    """Calculates kinetic energy given mass and velocity."""
    # This formula is now the Single Source of Truth for kinetic energy.
    return 0.5 * mass_kg * velocity_ms**2

# --- Spacecraft 1: Orion ---
orion_mass_kg = 25848
orion_velocity_ms = 11000
orion_ke_joules = calculate_kinetic_energy(orion_mass_kg, orion_velocity_ms)
print(f"Orion KE: {orion_ke_joules} J")

# --- Spacecraft 2: Starliner ---
starliner_mass_kg = 13000
starliner_velocity_ms = 7800
starliner_ke_joules = calculate_kinetic_energy(starliner_mass_kg, starliner_velocity_ms)
print(f"Starliner KE: {starliner_ke_joules} J")
```

**Reflection:**
1.  **Encapsulation:** We identified the repeated knowledge (the formula for KE).
2.  **Abstraction:** We created a function `calculate_kinetic_energy` to represent this knowledge. The function name itself documents the intent.
3.  **Replacement:** We replaced the raw calculations with calls to our new function. Now, if the definition of kinetic energy needs to change for our simulation, we only have one place to edit. The code is now more robust and easier to understand.

## Diagrams
Here is a diagram showing the flow of logic before and after applying DRY.

**Before DRY (WET):** The main program holds two separate, identical copies of the calculation logic. A change to the "KE formula" requires editing two places.

```text
               +----------------+
               | Main Program   |
               +----------------+
               /                \
              /                  \
             v                    v
+--------------------------+    +--------------------------+
| Logic block for Orion    |    | Logic block for Starliner|
|                          |    |                          |
| KE = 0.5 * m * v**2      |    | KE = 0.5 * m * v**2      | <--- Duplicated Knowledge
+--------------------------+    +--------------------------+
```

**After DRY:** The main program calls a single, authoritative function. A change to the KE formula requires editing only one place.

```text
               +----------------+
               | Main Program   |
               +----------------+
               /                \
              /                  \
             v                    v
+--------------------------+    +--------------------------+
| Call KE function(Orion)  |    | Call KE function(Starliner)|
+--------------------------+    +--------------------------+
              \                  /
               \                /
                v              v
            +--------------------------+
            | Function: calc_KE(m, v)  |
            |                          |
            | return 0.5 * m * v**2    | <--- Single Source of Truth
            +--------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a blueprint for a rocket engine. If the engineering team keeps two separate "master" blueprints, and an update to a turbine blade dimension is only made on one, you're going to have an explosion on the launchpad. The principle is: **One component, one blueprint.** This is the Single Source of Truth. Any change happens on the master blueprint, and all manufactured parts are built from it.

2.  **Facts to Overlearn:**
    -   "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."
    -   DRY is about knowledge, not just text.
    -   Achieve DRY through abstraction (functions, classes, constants).

3.  **Spaced Repetition Schedule:** Review this lesson and your notes at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the details, rebuild from this question: "If I need to change this piece of logic or data, how many places in my code do I have to touch?" If the answer is greater than one, you have violated DRY. The solution is always to consolidate that knowledge into a single place and have all other places refer to it.

## Common mistakes
1.  **Premature Abstraction.** Seeing two pieces of code that look similar and immediately abstracting them, when they actually represent different concepts that just happen to look the same *right now*. For example, a validation rule that a pilot's age must be `< 65` and a loan's term must be `< 65` years. These numbers are the same by coincidence. Combining them into a `MAX_VALUE = 65` constant would be a mistake, as they will almost certainly change independently. Wait until you see the third repetition before abstracting (the "Rule of Three").
2.  **Forgetting Data.** Focusing only on repeated code and ignoring repeated data structures. If you have multiple places in your code that expect a "user" to be a dictionary with keys `{"firstName", "lastName", "email"}`, that structure is a piece of knowledge. It should be defined once, perhaps as a `User` class or a formal schema.
3.  **Vagrant Abstractions.** Creating an abstraction (like a function or class) that is so generic it becomes meaningless. A function called `process_data(data)` is a poor abstraction. A function called `validate_telemetry_packet(packet)` is a good one. Be specific.

## Self-check
1.  The following snippet calculates the area of two different circular fields. How would you refactor it to be DRY?
    ```python
    pi = 3.14159
    radius1 = 10.0 # meters
    area1 = pi * radius1 * radius1

    radius2 = 25.0 # meters
    area2 = 3.14159 * radius2 * radius2 # Note the hardcoded pi
    ```
2.  Consider two classes, `Rocket` and `Automobile`. Both have `mass` and `velocity` properties, and a method `get_kinetic_energy()`. Is this a violation of DRY? Should they inherit from a common `MovingObject` base class? Justify your answer by considering future changes to each class.
3.  You are given a configuration file for a physics simulation that looks like this:
    ```json
    {
      "simulation_A": {
        "integrator": "RK4",
        "time_step": 0.01,
        "gravity": 9.81,
        "output_path": "/data/sim_a/"
      },
      "simulation_B": {
        "integrator": "RK4",
        "time_step": 0.005,
        "gravity": 9.81,
        "output_path": "/data/sim_b/"
      }
    }
    ```
    Identify at least two violations of the DRY principle in this data. How might you restructure this configuration to fix them?