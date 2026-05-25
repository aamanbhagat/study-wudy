## What it is
MISRA C is a set of software development guidelines for the C programming language, not a different version of C. It defines a subset of the language, restricting or forbidding constructs known to be ambiguous, insecure, or prone to creating undefined behavior. The goal is to produce highly reliable, predictable, and portable code for safety-critical embedded systems.

## Why it matters
In aerospace and rocketry, software failure is not an option. The flight control system of a launch vehicle, the guidance system of a satellite, or the avionics of a fly-by-wire aircraft all run on embedded software where a single pointer error or integer overflow could lead to catastrophic failure. Adhering to standards like MISRA C is often a mandatory requirement for software to be certified as "flight-qualified" by bodies like the FAA or ESA.

## When to study it
Before tackling MISRA C, you must have a deep and precise understanding of the C language itself, specifically:
*   **Pointer Arithmetic and Memory Models:** You must know exactly what pointers are, how they relate to memory addresses, and the rules governing their manipulation.
*   **Integer Promotion and Type Conversion Rules:** You must understand C's implicit type rules, including how `char` and `short` are promoted to `int` in expressions and the dangers of mixing signed and unsigned types.
*   **Undefined, Unspecified, and Implementation-Defined Behavior:** You must know the difference and be able to identify code constructs that fall into these categories.
*   **Compiler and Linker Operation:** A basic mental model of how source code becomes an executable binary is necessary to understand rules about linkage and translation units.

If you are not confident in these areas, pause and review them. Applying MISRA C without this foundation is like trying to apply advanced grammar rules without knowing the alphabet.

## How to study it (step by step)
1.  **Internalize the Philosophy:** Don't just read rules; understand the *why*. Read the introduction to the MISRA C:2012 standard. The core philosophy is to trade language flexibility for predictability and safety.
2.  **Focus on a Single Category:** Pick one rule category, such as "Expressions" (Chapter 13 in MISRA C:2012). Read through the 5-6 rules in that section. For each one, write a one-sentence summary of the vulnerability it prevents.
3.  **Find Non-Compliant Code:** Search for a small, simple C program online (e.g., a basic calculator or string utility). Identify at least three violations of the rules you just studied.
4.  **Refactor for Compliance:** Rewrite the non-compliant code from the previous step. Your goal is not just to make it work, but to make it *provably correct* and explicit. Add comments explaining *why* the changes were made to satisfy a specific rule.
5.  **Use a Static Analyzer:** Install and configure a static analysis tool like `cppcheck` with the MISRA addon, or use a professional tool if available. Run it on your original and refactored code. Analyze the report to see what the tool caught and if your fixes were correct.
6.  **Write from Scratch:** Write a small, self-contained module (e.g., a function to compute a Cyclic Redundancy Check, CRC) from a blank file, adhering strictly to the MISRA rules you've learned. This is harder than refactoring and builds better habits.

## Key ideas, with intuition
1.  **Principle of No Surprises:** The fundamental goal is to eliminate ambiguity. Standard C allows the compiler to make many choices (e.g., the evaluation order of function arguments). MISRA C says: if a line of code could be interpreted in more than one way by different compilers, it is illegal. The behavior must be unique and deterministic.
2.  **Explicitness over Implicitness:** C performs many actions implicitly, like promoting a `char` to an `int` during an arithmetic operation. This can hide bugs, especially with signedness and overflow. MISRA forces you to make these conversions explicit with casts, making the programmer's intent clear to both the compiler and the human reviewer.
    $$
    \text{Implicit (Bad): } \texttt{uint8\_t a = 200; uint8\_t b = 100; uint16\_t c = a + b;} \\
    \text{Explicit (Good): } \texttt{uint16\_t c = (uint16\_t)a + (uint16\_t)b;}
    $$
    In the first case, `a` and `b` are promoted to `signed int`, added, and the result might be truncated back to `uint16_t`. This is complex. The second case is unambiguous: cast both to `uint16_t` *before* the addition.
3.  **Decidability and Static Analysis:** The rules are designed to be checkable by automated tools (static analyzers). Features that are difficult to analyze statically, like unrestricted use of pointers, recursion, or dynamic memory allocation (`malloc`), are forbidden. This ensures that a tool can help prove the code's correctness without having to execute it. If you can't prove it's safe without running it, it's not safe enough.

## Worked example
Let's analyze a common piece of non-compliant code and fix it.

**The Task:** A function `process_sensor` takes a sensor reading. If the reading is non-zero, it updates a global counter and returns `true`.

**Non-Compliant Code:**
```c
#include <stdbool.h>
#include <stdint.h>

uint32_t g_update_counter = 0;

/* Non-compliant function */
bool process_sensor(uint16_t sensor_val)
{
    if (sensor_val) /* Violation: Boolean context requires _Bool type */
    {
        /* Violation: Side effect in expression with other operators */
        return g_update_counter++ < 1000;
    }
    return false;
}
```

**MISRA C Violations:**
1.  **Rule 14.4:** The controlling expression of an `if` statement shall have type `_Bool`. Here, `sensor_val` is a `uint16_t`, which is being used as a boolean.
2.  **Rule 13.2:** The value of an expression and its persistent side effects shall be the same under all permitted evaluation orders. The expression `g_update_counter++ < 1000` combines a side effect (`++`) with another operator (`<`). This is forbidden to prevent ambiguity.
3.  **Rule 8.4:** A compatible declaration shall be visible when an object or function with external linkage is defined. The function `process_sensor` should have a forward declaration in a header file. (We'll fix the logic here for brevity).

**Compliant Refactoring:**
```c
#include <stdbool.h>
#include <stdint.h>

uint32_t g_update_counter = 0U; /* Use 'U' suffix for unsigned constants */

/* Compliant function */
bool process_sensor(uint16_t sensor_val)
{
    bool status = false; /* Always initialize variables */

    /* Rule 14.4 fix: Explicitly compare to zero */
    if (sensor_val != 0U)
    {
        /* Rule 13.2 fix: Separate side effect from the comparison */
        if (g_update_counter < 1000U)
        {
            status = true;
        }
        g_update_counter++; /* Side effect is now a standalone statement */
    }

    return status;
}
```

**Reflection:**
*   The first fix (`sensor_val != 0U`) makes the boolean check explicit and removes any ambiguity about how a non-`_Bool` type is interpreted.
*   The second fix separates the increment of `g_update_counter` from the comparison. The code is now longer, but its sequence of operations is undeniable and has no hidden order-of-evaluation dependencies.
*   Initializing `status` at declaration prevents it from holding an indeterminate value if the `if` condition is false.

## Diagrams
This diagram illustrates the core philosophy. Standard C contains regions of undefined behavior. MISRA C defines a smaller, safer subset within the well-defined parts of the language.

```text
+-------------------------------------------------------------+
| The C Language Standard                                     |
|                                                             |
| +-------------------------+      +------------------------+ |
| | Well-Defined Behavior   |      | Undefined Behavior     | |
| |                         |      | (e.g., dereferencing   | |
| | +---------------------+ |      | a NULL pointer, signed | |
| | |   MISRA C Subset    | |      | integer overflow)      | |
| | |                     | |      |                        | |
| | |  - No ambiguity     | |      |                        | |
| | |  - Statically       | |      +------------------------+ |
| | |    analyzable       | |                                 |
| | |  - Explicit         | |      +------------------------+ |
| | |                     | |      | Implementation-Defined | |
| | +---------------------+ |      | (e.g., sizeof(int))    | |
| |                         |      +------------------------+ |
| +-------------------------+                                 |
|                                                             |
+-------------------------------------------------------------+

      ^
      |
      SAFE ZONE (Your code must live here)
```

## Memory technique — remember this forever
1.  **Mnemonic:** **PRECISE**
    *   **P**redictable: No undefined behavior.
    *   **R**estricted: Forbid dangerous language features.
    *   **E**xplicit: No implicit type conversions.
    *   **C**onsistent: Enforce a single, clear style.
    *   **I**ntentional: Code must clearly show what the programmer meant.
    *   **S**tatic: Must be verifiable by static analysis tools.
    *   **E**ssential: For safety-critical systems.

2.  **Must-Know Rules (Paraphrased for memory, but learn the exact wording later):**
    *   **No side effects in expressions:** Don't mix `++`, `--`, or `=` with other operators in the same expression. (e.g., `x = i++;` is forbidden).
    *   **All `if`/`for`/`while` conditions must be type `_Bool`:** Don't use integers as booleans. Be explicit: `if (x != 0)` not `if (x)`.
    *   **No dynamic memory allocation:** `malloc`, `calloc`, `realloc`, and `free` are forbidden. All memory must be allocated statically.

3.  **Spaced Repetition Schedule:**
    *   Review the **PRECISE** mnemonic and the three key rules tomorrow (1 day).
    *   Review them again in 3 days.
    *   Review again in 7 days.
    *   Review again in 16 days.
    *   Review again in 35 days.

4.  **First Principles Pathway:** If you forget a specific MISRA rule, ask yourself this question: "**Could a conforming C compiler, in a maximally perverse but technically legal way, misinterpret my intent or produce a different result from what I expect?**" If the answer is yes, the construct is probably forbidden by MISRA. The entire standard is derived from this single adversarial principle.

## Common mistakes
1.  **Implicit Integer Promotion:** Writing `uint8_t a = 200; uint8_t b = 200; uint16_t c = a + b;` and not realizing that `a` and `b` are promoted to `signed int` before the addition, which can overflow on a 16-bit `int` system before the result is assigned to `c`. The compliant way is `uint16_t c = (uint16_t)a + (uint16_t)b;`.
2.  **Using `char` for numeric data:** The `char` type can be signed or unsigned by default (implementation-defined). Using it for small numbers is a portability trap. MISRA requires you to use `uint8_t` or `int8_t` for 8-bit numeric data.
3.  **Assignment in `if` statements:** Writing `if (x = y)` when you meant `if (x == y)`. MISRA C Rule 14.4 (and others) effectively prevents this common typo by enforcing boolean types and disallowing assignments in such sub-expressions.
4.  **Ignoring Pointer Arithmetic Rules:** Assuming pointer arithmetic is always safe. MISRA heavily restricts it to arrays, forbidding you from pointing outside the bounds of an object, even if you don't dereference the pointer.

## Self-check
1.  Why does MISRA C forbid recursion in safety-critical systems? What specific, verifiable resource does recursion consume that static allocation does not?
2.  The C expression `(x << 4) + x` is a common, fast way to compute `x * 17`. Identify at least two potential MISRA C violations in this expression, assuming `x` is a `uint8_t`.
3.  You are writing a driver for a sensor that can return a status code. A value of `0` means success, any positive value is a warning code, and any negative value is an error code. Your function signature is `int16_t get_sensor_status(void);`. How would you write the calling code to check for success, warning, or error in a fully MISRA C-compliant way? Provide the code structure.