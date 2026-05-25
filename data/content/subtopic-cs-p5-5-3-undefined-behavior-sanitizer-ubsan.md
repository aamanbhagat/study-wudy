## What it is
The Undefined Behavior Sanitizer (UBSan) is a runtime detector for undefined behavior in C/C++ code. It is not a static analyzer; instead, it is a compiler feature that adds checks to your compiled program to catch undefined operations (like signed integer overflow or division by zero) as they happen during execution. When a check fails, UBSan prints a detailed error report and terminates the program.

## Why it matters
Undefined behavior (UB) is a primary source of catastrophic, non-deterministic bugs in scientific and systems programming. In aerospace, a signed integer overflow in a navigation calculation could lead to incorrect thrust vectors, causing mission failure. In a large-scale physics simulation, a single floating-point exception or out-of-bounds read could silently corrupt terabytes of data, invalidating months of computation. UBSan makes these silent, latent bugs loud and immediately obvious during testing.

## When to study it
Before studying UBSan, you must have a solid grasp of the following prerequisites. If you are not confident in these, pause and review them first.
1.  **The C++ Abstract Machine & The "As-If" Rule**: You must understand that the C++ standard defines the behavior of an abstract machine, and compilers are free to generate any code they wish, as long as the observable behavior is "as-if" it were run on that machine.
2.  **Definition of Undefined Behavior**: You must know what UB is and be able to name at least five distinct examples (e.g., signed integer overflow, dereferencing a null pointer, shifting by $\ge$ the bit-width of the type, reading an uninitialized variable, out-of-bounds array access).
3.  **Compiler Toolchains**: You must be proficient at compiling C++ code from the command line using `g++` or `clang`, including the use of compiler flags (e.g., `-O2`, `-g`, `-Wall`).

## How to study it (step by step)
1.  **Trigger a silent failure.** Write a C++ program that computes $20!$ (the factorial of 20) using a `long long`. Compile it normally (`g++ factorial.cpp -o factorial`) and run it. The result will be incorrect due to signed integer overflow, but the program will not crash or warn you.
2.  **Enable UBSan.** Recompile the same program with UBSan enabled: `g++ -fsanitize=undefined -g factorial.cpp -o factorial_san`. The `-g` flag adds debug symbols, which gives UBSan more information for its reports. Run `./factorial_san` and analyze the runtime error message. Note the file, line number, and the exact type of UB.
3.  **Explore specific checks.** Consult the GCC or Clang documentation for UBSan. Write three new, minimal programs that each trigger a different type of UB: an invalid shift (e.g., `1 << -1`), a division by zero, and an out-of-bounds array access. Compile and run each with UBSan to see the distinct error reports.
4.  **Integrate into a build system.** Create a simple project with a `Makefile`. Define `CXXFLAGS = -std=c++17 -Wall -Wextra -g`. Add `-fsanitize=undefined` to your `CXXFLAGS` variable. This simulates how you would enable sanitizers in a real-world project.
5.  **Understand the performance cost.** Write a program that performs a computationally intensive task, like multiplying two large matrices. Use the `time` command to measure its execution time. Now, compile it with UBSan and run `time` again. Observe the performance penalty; this clarifies why sanitizers are primarily for testing and debugging, not release builds.

## Key ideas, with intuition
1.  **The Compiler's Contract**: The C++ standard is a contract between you and the compiler. You promise to never write code that invokes UB. In exchange, the compiler is allowed to perform aggressive optimizations, assuming you kept your promise. For example, if you write `x+1 > x`, the compiler can assume this is always true for signed integers and optimize away code based on that assumption. If `x` is `INT_MAX`, you break the contract, `x+1` overflows, and the assumption is violated, leading to bizarre program behavior.
2.  **Instrumentation, Not Divination**: UBSan is not magic. The compiler injects explicit checks into your binary code. An operation like `c = a / b` becomes, conceptually:
    $$
    \text{if } (b == 0 \lor (a == \text{INT\_MIN} \land b == -1)) \{ \text{ubsan\_report\_error(...);} \} \\
    c = a / b;
    $$
    This instrumentation is what catches the UB at the moment it occurs. It's a concrete mechanism, not a theoretical analysis.
3.  **Making Bugs Deterministic**: The most dangerous feature of UB is its non-determinism. A signed overflow might cause a crash on your machine, work silently on your colleague's machine, and format the hard drive on the production server. UBSan makes failure deterministic: if the line of code that contains UB is executed, UBSan will reliably report it, every single time, on every machine.

## Worked example
Let's analyze a subtle bug involving integer promotion and bit shifting.

**The Code (`shift.cpp`):**
```cpp
#include <iostream>
#include <cstdint>

int main() {
    // We want to create a bitmask for the 31st bit.
    // A common but incorrect way is to shift the integer 1.
    uint64_t mask = 1 << 31; 
    
    // On many systems, `int` is 32 bits. Shifting a 32-bit signed `1`
    // by 31 positions overflows the signed integer type, which is UB.
    // The literal `1` has type `int`.
    
    std::cout << "Mask: " << mask << std::endl;
    return 0;
}
```

**Step 1: Compile and run normally.**
```bash
$ g++ -std=c++17 -O2 shift.cpp -o shift
$ ./shift
Mask: 9223372036854775808 
```
The output is `-2^31` interpreted as an unsigned 64-bit integer, which is `2^63 + 2^31`. This is clearly not the intended mask of `2^31`. The program gave a wrong answer silently.

**Step 2: Compile and run with UBSan.**
```bash
$ g++ -std=c++17 -fsanitize=undefined -g shift.cpp -o shift_san
$ ./shift_san
shift.cpp:6:22: runtime error: left shift of 1 by 31 places cannot be represented in type 'int'
SUMMARY: UndefinedBehaviorSanitizer: undefined-behavior shift.cpp:6:22 in 
```

**Step 3: Reflection.**
*   The normal compilation produced a binary that ran without complaint but produced garbage data. This is the most dangerous kind of bug.
*   UBSan identified the exact problem (`left shift ... cannot be represented in type 'int'`), the location (`shift.cpp:6:22`), and the cause. The literal `1` is of type `int`. On a system with 32-bit integers, the value `1 << 31` is $-2^{31}$, which overflows the positive range of a signed `int`. This is UB.
*   The fix is to ensure the value being shifted has a type large enough to hold the result: `uint64_t mask = 1ULL << 31;`. The `ULL` suffix makes the literal `1` an `unsigned long long`, and the shift operation is now well-defined. UBSan forced us to be explicit about our types, fixing the latent bug.

## Diagrams
This diagram shows the conceptual difference in the build and execution pipeline when using a sanitizer.

```text
Pipeline without Sanitizer:
+------------+      +-----------------+      +-------------+      +------------------+
| source.cpp |----->| g++             |----->| executable  |----->| (Execution)      |
+------------+      +-----------------+      +-------------+      |                  |
                                                                  | -> Correct output|
                                                                  | -> Crash         |
                                                                  | -> Wrong output  |
                                                                  +------------------+

Pipeline with UBSan:
+------------+      +-----------------+      +--------------------+      +------------------+
| source.cpp |----->| g++ -fsanitize  |----->| Instrumented Exec. |----->| (Execution)      |
+------------+      +-----------------+      +--------------------+      |                  |
                                             (Contains extra checks)     | -> UB Detected?  |
                                                                         |        |         |
                                                                         |       YES        |
                                                                         |        |         |
                                                                         v        v         |
                                                                 +------------------+    NO
                                                                 | UBSan Runtime    |     |
                                                                 | Reports Error    |     |
                                                                 +------------------+     |
                                                                                          |
                                                                 +------------------+     |
                                                                 | Correct output   |<----+
                                                                 +------------------+
```

## Memory technique — remember this forever
1.  **The Story**: Imagine your program is a rocket launch sequence. Undefined Behavior is like a tiny, unnoticed crack in a fuel line. It might do nothing, or it might cause a catastrophic explosion mid-flight. UBSan is the **U**ltra-**B**ureaucratic **S**afety **A**uditor from **N**ASA who inspects every single component *during the launch itself* with a high-speed camera. The moment the crack appears, they hit the big red abort button and print a 500-page report on exactly which molecule failed. It adds overhead, but it prevents disaster. **UBSan == UB Safety Audit @ Runtime**.

2.  **Must Overlearn Facts**:
    *   **Compiler Flag**: `g++ -fsanitize=undefined -g my_code.cpp`
    *   **Mechanism**: Runtime instrumentation, not static analysis.
    *   **Purpose**: To detect and report undefined behavior during a specific program execution.

3.  **Spaced Repetition Schedule**:
    *   Review this entire lesson in **1 day**.
    *   Focus on the Worked Example in **3 days**.
    *   Redraw the diagram from memory in **7 days**.
    *   Explain the "Compiler's Contract" to an imaginary student in **16 days**.
    *   Write a new program that triggers three types of UB in **35 days**.

4.  **First Principles Pathway**: If you forget the details, rebuild it. The C++ standard omits defining certain behaviors to give compilers optimization freedom. This creates a class of bugs (UB) that are silent and unpredictable. How can you find them? You can't always prove their absence statically. Therefore, you must check for them as the code runs. This requires adding extra checks (`if` statements) to the compiled code around risky operations. `-fsanitize=undefined` is simply the instruction to the compiler to add those checks for you.

## Common mistakes
1.  **Confusing Sanitizers**: Students often mix up UBSan, AddressSanitizer (ASan), and ThreadSanitizer (TSan). Remember: **UBSan** for language rules (overflow, shifts), **ASan** for memory rules (out-of-bounds, use-after-free), **TSan** for threading rules (data races).
2.  **Shipping Sanitized Binaries**: The performance overhead of UBSan can be significant (20-50% or more). It is a debugging tool. Do not ship production code compiled with it unless you have explicitly measured the overhead and deemed it acceptable for your use case.
3.  **Relying on it 100%**: UBSan is powerful but does not catch every possible form of UB. For example, it typically does not detect UB that arises from violating aliasing rules (`-fstrict-aliasing`). It is a tool, not a proof of correctness.
4.  **Ignoring the Reports**: If UBSan reports an error, it is **always** a real bug. It is not a "warning" or a "potential" issue. It means that on that execution path, your program definitively invoked undefined behavior. Fix it immediately.

## Self-check
1.  A C++ function takes a `signed int*` pointer as an argument. Inside the function, you cast this pointer to `float*` and read a value from it. Will UBSan always detect this? Why or why not? What is the name for this class of UB?
2.  You are working on a physics simulation that uses a 3rd-party linear algebra library. When you enable UBSan, it reports a signed integer overflow inside a function in the pre-compiled library (`.so` or `.a` file). Your own code is not in the stack trace. Can you fix this just by changing compiler flags for your own code? What are your options?
3.  Consider the expression `i * i / i`. A static analyzer might warn that if `i` is zero, this is a division by zero. How would UBSan's approach to finding this bug differ from the static analyzer's? Describe an input for which UBSan would *not* report an error, even though the potential for an error exists in the code.