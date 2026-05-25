## What it is
Address Sanitizer (ASan) is a runtime memory error detector built into modern compilers like GCC and Clang. It works by "instrumenting" your code during compilation, adding extra checks that are executed when your program runs. These checks catch memory errors like buffer overflows, use-after-free, and memory leaks the moment they happen.

## Why it matters
In high-reliability systems, silent memory corruption is catastrophic. In aerospace, a buffer overflow in flight control software could corrupt guidance data, leading to mission failure. In physics simulations, a subtle overflow could poison terabytes of data, invalidating years of research. ASan provides a strong guarantee that your program's memory behavior is correct, which is non-negotiable for building safe and reliable scientific and engineering systems.

## When to study it
You are ready for this topic. The prerequisites are a solid understanding of C/C++ memory models (stack, heap, globals), pointer arithmetic, and experience using a command-line compiler (GCC/Clang) with flags. You should already know what a buffer overflow is in theory; this lesson is about how to detect it in practice.

## How to study it (step by step)
1.  **Create a bug.** Write a C program named `overflow.c` with a deliberate stack buffer overflow. Make it simple: declare an array of size 10 and write to the 11th element (`arr[10]`).
2.  **Observe the native behavior.** Compile and run it without any special flags: `gcc -g overflow.c -o overflow_native`. Run `./overflow_native`. It might crash with a "segmentation fault," or it might appear to work correctly. Note this ambiguity—this is why such bugs are dangerous.
3.  **Compile with ASan.** Recompile the exact same source file, but add the `-fsanitize=address` flag: `gcc -g -fsanitize=address overflow.c -o overflow_asan`. The `-g` flag adds debugging symbols, which makes ASan's output much more useful.
4.  **Analyze the report.** Run the instrumented version: `./overflow_asan`. You will get a detailed, colored report. Do not be intimidated. Read it carefully and identify: the exact error type (e.g., `stack-buffer-overflow`), the file and line number (`overflow.c:X`), and the memory map showing the address of your array and the "redzone" it overflowed into.
5.  **Repeat for the heap.** Write a new program, `heap_overflow.c`, that allocates memory with `malloc`, writes past the end of the allocated block, and then `free`s it.
6.  **Compile and analyze again.** Repeat steps 3 and 4 for the heap example. Notice how the ASan report now says `heap-buffer-overflow` and provides a stack trace for both the allocation (`malloc`) and the invalid access. This is incredibly powerful for debugging.

## Key ideas, with intuition
1.  **Instrumentation:** The compiler is your agent. When you use `-fsanitize=address`, you authorize the compiler to inject extra code into your program. Before every memory access (read or write), this injected code performs a check. This is not a static analysis of the source; it is a dynamic check that happens at runtime.

2.  **Shadow Memory:** This is the core mechanism. ASan reserves a large region of virtual address space for its own bookkeeping, called shadow memory. Every 8 bytes of your application's memory corresponds to 1 byte in the shadow memory. This shadow byte acts as a descriptor, storing the state of the corresponding 8-byte application region.
    $$
    \text{shadow\_addr} = (\text{app\_addr} \gg 3) + \text{offset}
    $$
    The check before an application memory access at `app_addr` is simple: go to the `shadow_addr`, read the shadow byte, and see if it permits the access.

3.  **Redzones:** To catch overflows, ASan surrounds your variables (on the stack, heap, or in globals) with "poisoned" memory called redzones. These redzones are marked as inaccessible in the shadow memory. When you allocate an array of 10 integers, ASan might actually reserve space for 10 integers *plus* redzones on either side. If your code steps out of bounds, it steps into a redzone, the shadow memory check fails, and ASan reports the error.

## Worked example
Here is a program with a classic off-by-one stack buffer overflow.

**Code (`example.c`):**
```c
#include <stdio.h>

int main() {
    int arr[10];
    // A classic off-by-one error. Valid indices are 0-9.
    arr[10] = 123; 
    printf("Wrote to arr[10]\n");
    return 0;
}
```

**Step 1: Compile with ASan and debug symbols.**
```bash
gcc -g -fsanitize=address example.c -o example_asan
```
This command tells GCC to compile `example.c`, include debug information (`-g`), and instrument the code with Address Sanitizer (`-fsanitize=address`), creating an executable named `example_asan`.

**Step 2: Run the executable.**
```bash
./example_asan
```

**Step 3: Analyze the ASan report.**
The program will halt and print a detailed report. The key parts are:
```text
==12345==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc... at pc 0x5555... bp 0x7ffc... sp 0x7ffc...
WRITE of size 4 at 0x7ffc... thread T0
    #0 0x5555... in main /path/to/your/project/example.c:6
    ...

Address 0x7ffc... is located in stack of thread T0 at offset 40 in frame
    #0 0x5555... in main /path/to/your/project/example.c:3

This frame has 1 object(s):
  [32, 72) 'arr' <== Memory access at offset 40 is inside this variable
```
*   **Reflection:**
    *   The first line immediately tells us the error: `stack-buffer-overflow`. Without ASan, we might have gotten a silent corruption or a generic segfault.
    *   The stack trace (`#0 ... in main ... example.c:6`) points to the exact line of code (`arr[10] = 123;`) that performed the illegal write.
    *   The memory layout information shows that the variable `arr` was allocated on the stack. The report indicates the memory access was at an offset of 40 bytes from the start of the frame, which is exactly where the 11th integer (`10 * sizeof(int)`) would be, just past the end of the 40-byte `arr` buffer. ASan placed a redzone there, which our code illegally accessed.

## Diagrams
Here is how application memory maps to shadow memory. A single shadow byte covers an 8-byte aligned region in your application.

```text
Application Memory (Addresses increase --->)
+--------+--------+--------+--------+--------+ ...
| 8 bytes| 8 bytes| 8 bytes| 8 bytes| 8 bytes|
+--------+--------+--------+--------+--------+ ...
    |        |        |
    |        |        +---------------------------------+
    |        |                                          |
    v        v                                          v
+---+    +---+                                      +---+
| S |    | S |    . . .                             | S |  <- Shadow Memory
+---+    +---+                                      +---+    (1 byte per 8 app bytes)

S = Shadow Byte (describes state of the 8 bytes above it)
```

Here is a stack variable with redzones.

```text
Higher Memory Addresses
^
|
+---------------------+
| Other stack data    |
+---------------------+
|      Redzone        | <-- Poisoned, marked in shadow memory
+---------------------+
|                     |
|      arr[0..9]      | <-- Your 40-byte buffer, marked as accessible
|                     |
+---------------------+
|      Redzone        | <-- Poisoned, marked in shadow memory
+---------------------+
| Other stack data    |
|
v
Lower Memory Addresses
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "The Shadow Guard." Imagine every variable you declare has a silent, invisible guard standing next to it (the redzone). This guard lives in a parallel "shadow" world (the shadow memory). If your code tries to write past the variable's boundary, it hits the guard. The guard instantly blows a whistle, stops your program, and files a detailed report on exactly what you did wrong.

2.  **Overlearn this command:**
    ```bash
    compiler -g -fsanitize=address my_program.c -o my_program
    ```
    (Where `compiler` is `gcc` or `clang`). This is the key that activates the Shadow Guard.

3.  **Spaced Repetition Schedule:** Compile and run a buggy program with ASan today. Then review the process and the report output in 1 day, 3 days, 7 days, 16 days, and 35 days. The physical act of typing the command and reading the report builds the memory.

4.  **First Principles Pathway:** If you forget the details, rebuild from this:
    *   Memory errors are bad. How can we detect them?
    *   We can't know at compile time where all pointers will point. So, we must check at *runtime*.
    *   A runtime check means adding extra code. This is called *instrumentation*.
    *   What does the code check? It checks if the memory address is "valid".
    *   How do we know if it's valid? We need a map. This is the *shadow memory*.
    *   How does the map detect overflows? By creating invalid buffer zones (*redzones*) around valid memory and marking them as "invalid" on the map.

## Common mistakes
1.  **Shipping with ASan:** ASan typically adds a ~2x performance overhead and increases memory usage. It is a debugging and testing tool, not for production builds. Use build configurations (e.g., in a Makefile or CMakeLists.txt) to enable it only for debug builds.
2.  **Forgetting `-g`:** Compiling with `-fsanitize=address` but without `-g` (debug symbols) will still detect the error, but the report will be much less useful, often showing memory addresses instead of file names and line numbers.
3.  **Ignoring the full report:** Students often see "stack-buffer-overflow" and immediately look at their code. The full ASan report, especially for heap errors, contains a second stack trace showing where the memory was *allocated*. This is often more important for finding the bug's root cause than knowing where it crashed.
4.  **Mixing Sanitized and Unsanitized Libraries:** If your executable is compiled with ASan but it links against a pre-compiled library that was not, ASan may not be able to detect errors that occur inside that library's code. For best results, all code should be compiled with the same sanitizer settings.

## Self-check
1.  You have a `Makefile` with `CFLAGS = -O2 -Wall`. How would you modify it to have a `make debug` command that builds with ASan enabled and a `make release` command that builds without it?
2.  An ASan report shows a `heap-use-after-free` error. It gives you a stack trace for the illegal access (the "use") and a stack trace for when the memory was deallocated (the "free"). Which stack trace is likely more useful for finding the logic error in your program, and why?
3.  ASan's shadow memory maps 8 application bytes to 1 shadow byte. A shadow byte value of `0` means all 8 bytes are accessible. A positive value `k` (from 1 to 7) means the first `k` bytes are accessible, and the rest are not. Negative values are used for different kinds of redzones (stack, heap, global). Why is this "1 to 7" scheme useful for detecting overflows into the middle of an 8-byte variable type, like a `double`?