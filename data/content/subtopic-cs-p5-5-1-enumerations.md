## What it is
An enumeration, declared with the `enum` keyword in C, is a user-defined data type that consists of a set of named integer constants. It allows you to assign descriptive names to integral values, making code more readable and self-documenting by replacing arbitrary "magic numbers" with meaningful identifiers.

## Why it matters
Enumerations are fundamental for managing states in complex systems. In aerospace, a flight controller for a rocket has distinct states: `PRE_FLIGHT`, `IGNITION`, `LIFTOFF`, `MAX_Q`, `MECO` (Main Engine Cutoff), etc. Using an `enum` to represent these states makes the control logic vastly more robust and understandable than using raw integers like 0, 1, 2. In physics simulations, you might use enums to select between numerical integration schemes (`EULER`, `VERLET`, `RK4`), preventing errors and clarifying the code's intent.

## When to study it
You should be comfortable with fundamental C concepts before tackling enumerations. Specifically, you must understand:
- Basic data types, especially `int`.
- Variable declaration and initialization.
- The `#define` preprocessor directive, as enums are a more powerful alternative.
- `switch` statements, which are frequently used to handle different enum values.

If you are not solid on these, review them first.

## How to study it (step by step)
1.  **Identify the problem:** Write a small program that controls a traffic light using integer codes: `0` for red, `1` for yellow, `2` for green. Use a `switch` statement. Notice how `case 0:` tells you nothing without a comment. This is the "magic number" problem.
2.  **Use the old tool:** Replace the magic numbers with `#define` directives (e.g., `#define RED 0`). This is an improvement but has drawbacks: the defined constants have no logical grouping and are not a distinct type.
3.  **Introduce `enum`:** Rewrite the program using an `enum` for the traffic light states. Declare `enum light_state {RED, YELLOW, GREEN};`. Notice how the code is now self-documenting and the compiler sees `light_state` as a specific (though integer-compatible) type.
4.  **Manipulate underlying values:** Create a new `enum` for sensor statuses. By default, the first member is 0. Explicitly set a value, e.g., `enum sensor_status {OK=0, TIMEOUT=5, ERROR=-1, OFFLINE};`. Print the values of each member to understand how the compiler assigns subsequent values (e.g., `OFFLINE` will be `-1 + 1 = 0`).
5.  **Pass enums to functions:** Write a function `void print_status(enum sensor_status s);` that takes an enum value as an argument. This enforces better type-checking than passing a raw `int` and signals the function's purpose clearly.
6.  **Explore scope:** Define an `enum` inside a function versus outside (at the global scope). Understand that the type name and the enumerator names have scope, just like variables.

## Key ideas, with intuition
1.  **Symbols, Not Numbers:** The primary purpose of an `enum` is to replace opaque numbers with meaningful symbols. When you see `current_state = LIFTOFF;`, the intent is immediately clear. When you see `current_state = 2;`, you have to look up what `2` means. The `enum` creates a direct map from a human-readable name to a machine-efficient integer.

2.  **Automatic & Explicit Numbering:** The compiler handles the tedious work of assigning unique integer values. By default, it performs a simple count starting from zero.
    $$
    \text{enum engine\_state} \{\text{OFF, IGNITION, BURN}\}; \implies \text{OFF}=0, \text{IGNITION}=1, \text{BURN}=2
    $$
    You can override this for specific cases, and the compiler will resume counting from your last explicit assignment. This is useful for mapping to hardware registers or network protocols that use specific numeric codes.
    $$
    \text{enum error\_codes} \{\text{OK}=0, \text{WARN}=10, \text{ERR}, \text{FATAL}\}; \implies \text{OK}=0, \text{WARN}=10, \text{ERR}=11, \text{FATAL}=12
    $$

3.  **A New Type:** An `enum` doesn't just create constants; it creates a new type. Declaring a variable `enum engine_state state;` tells other programmers (and the compiler) that `state` should only hold values from the `engine_state` enumeration. While C's type system will still treat it like an `int` under the hood, this declaration of intent is crucial for writing maintainable and less error-prone systems code.

## Worked example
We will model a simple state machine for a satellite's solar panel deployment sequence. The states are `STOWED`, `DEPLOYING`, and `TRACKING_SUN`. The system can receive a `DEPLOY` command or a `DEPLOYMENT_COMPLETE` signal.

```c
#include <stdio.h>

// 1. Define the enumeration for the states.
// This creates the type 'enum panel_state' and the constants.
typedef enum {
    STOWED,          // Default value is 0
    DEPLOYING,       // Default value is 1
    TRACKING_SUN     // Default value is 2
} panel_state;

// 2. Define the enumeration for possible events/inputs.
typedef enum {
    CMD_DEPLOY,
    SIG_DEPLOYMENT_COMPLETE
} panel_event;

// 3. A function to transition between states.
// It takes the current state and an event, and returns the new state.
panel_state handle_event(panel_state current, panel_event event) {
    printf("Current state: %d, Event: %d -> ", current, event);
    switch (current) {
        case STOWED:
            if (event == CMD_DEPLOY) {
                return DEPLOYING;
            }
            break;
        case DEPLOYING:
            if (event == SIG_DEPLOYMENT_COMPLETE) {
                return TRACKING_SUN;
            }
            break;
        case TRACKING_SUN:
            // No transitions out of this state in this simple model.
            break;
    }
    return current; // If no valid transition, stay in the current state.
}

int main() {
    panel_state state = STOWED;

    // Simulate receiving a sequence of events
    state = handle_event(state, SIG_DEPLOYMENT_COMPLETE); // Invalid event for STOWED
    printf("New state: %d\n", state);

    state = handle_event(state, CMD_DEPLOY); // Valid event
    printf("New state: %d\n", state);

    state = handle_event(state, SIG_DEPLOYMENT_COMPLETE); // Valid event
    printf("New state: %d\n", state);

    return 0;
}
```
**Reflection:**
- **Step 1 & 2:** Defining `panel_state` and `panel_event` with `enum` and `typedef` creates clear, readable types. We immediately know what kind of values are valid for a state or an event.
- **Step 3:** The `switch` statement is the logic core. Using `case STOWED:` instead of `case 0:` makes the logic transparent. We are switching on the *meaning* of the state, not its underlying integer value.
- **`main` function:** The simulation logic is easy to follow. `state = handle_event(state, CMD_DEPLOY);` reads like a plain-English description of the system's behavior. The integer values are an implementation detail we can safely ignore.

## Diagrams
This ASCII diagram illustrates the state transitions from the worked example. States are nodes, and events are labeled arrows (transitions).

```text
                 (CMD_DEPLOY)
           +---------------------+
           |                     |
           v                     |
+--------+       +-----------+       +----------------+
| STOWED |------>| DEPLOYING |------>|  TRACKING_SUN  |
+--------+       +-----------+       +----------------+
                      ^
                      |
        (SIG_DEPLOYMENT_COMPLETE)

```
This diagram shows the mapping from the `panel_state` enumerator names to their implicit integer values in memory.

```text
Enumerator Name    Underlying Integer Value
+--------------+   +------------------------+
|    STOWED    |-->|           0            |
+--------------+   +------------------------+
|   DEPLOYING  |-->|           1            |
+--------------+   +------------------------+
| TRACKING_SUN |-->|           2            |
+--------------+   +------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of an `enum` as an **"Enumerated Numbering"** system. You provide a list of names, and the compiler provides the numbering.
2.  **Must Overlearn:**
    ```c
    // Default numbering from 0
    enum Name { MEMBER_0, MEMBER_1, MEMBER_2 };
    
    // Explicit numbering
    enum Name { MEMBER_A = 10, MEMBER_B, MEMBER_C = 20 }; // B will be 11
    ```
3.  **Spaced Repetition Schedule:** Review this concept and re-do the worked example at **1 day, 3 days, 7 days, 16 days, and 35 days**.
4.  **First Principles Pathway:** If you forget the `enum` syntax, remember the problem it solves: replacing magic numbers (`0`, `1`, `2`, ...) with names. You can always revert to using `#define RED 0` or `const int RED = 0;`. The `enum` is simply the C language's formal, type-safe way to group these related constants together. It bundles a set of `const int`s into a single named type.

## Common mistakes
1.  **Printing an enum as a string:** `printf("%s", STOWED);` will not work and likely crash your program. Enums are integers. You must print them with `%d` or use a `switch` statement or an array of strings to map their value back to a human-readable name.
2.  **Forgetting the semicolon:** The `enum` definition is a declaration statement and must end with a semicolon: `enum state {A, B, C};` <-- don't forget this.
3.  **Assuming enum members are scoped to the enum type:** In C (unlike C++), enumerator names are placed in the same scope as the `enum` itself. You cannot have two different enums in the same scope with members of the same name.
    ```c
    // ERROR in C: 'RED' is redefined.
    enum traffic_light { RED, YELLOW, GREEN };
    enum alert_level { GREEN, AMBER, RED }; 
    ```
4.  **Accidental value collision:** When explicitly setting values, it's possible to make two members have the same value: `enum status {OK=0, GOOD=0, ERROR=-1};`. This is legal C but is almost always a logical error.

## Self-check
1.  Define an `enum` to represent the seven days of the week, starting with `SUNDAY`. What is the underlying integer value of `THURSDAY`?
2.  Create an `enum` for the primary colors `RED`, `GREEN`, and `BLUE`. Assign them the values `1`, `2`, and `4` respectively, to represent bit flags. Write a function that takes an `int` and checks if the `BLUE` flag is set.
3.  Define two separate `enum` types, `vehicle_type` (`CAR`, `TRUCK`, `BOAT`) and `propulsion_type` (`INTERNAL_COMBUSTION`, `ELECTRIC`, `SAIL`). Can you legally compare a variable of type `vehicle_type` with a variable of type `propulsion_type` (e.g., `if (my_vehicle == my_propulsion)`)? Explain why this will or will not compile, and whether it's a good idea.