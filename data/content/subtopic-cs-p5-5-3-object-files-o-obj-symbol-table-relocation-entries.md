## What it is
An object file (`.o` on Unix-like systems, `.obj` on Windows) is the intermediate output of a compiler. It contains translated machine code and data from a source file, but it is not yet a complete, executable program. It's a modular building block, holding the compiled code alongside metadata—specifically a symbol table and relocation entries—that a linker needs to connect it with other object files to create a final executable.

## Why it matters
Object files are the foundation of modular programming and efficient builds in high-performance computing. In aerospace, the flight control software for a rocket is built from thousands of source files; recompiling everything for a one-line change is infeasible. Separate compilation into object files means only the changed module is recompiled, and the linker quickly re-links the system, a process that can reduce build times from hours to seconds. Similarly, when you link a physics simulation against a high-performance math library like BLAS or LAPACK, you are linking your own object files with the pre-compiled object files of that library.

## When to study it
Before tackling this, you must have a solid grasp of the following. If not, master them first.
*   **The Compilation Pipeline:** You should know the sequence: Preprocessor -> Compiler -> Assembler -> Linker. Object files are the output of the assembler and the input to the linker.
*   **C/C++ Fundamentals:** Understand the difference between a function *declaration* (prototype) and a *definition* (implementation). Be comfortable with global variables and the `extern` keyword.
*   **Basic Assembly/Machine Code Concepts:** You don't need to be fluent, but you must understand that a CPU executes a sequence of binary instructions, and that instructions like `call` or `mov` often need memory addresses as operands.

## How to study it (step by step)
1.  **Create a multi-file project.** Write two C files.
    *   `vec_ops.c`: Define a function `double dot_product(double* v1, double* v2, int len)` and a global variable `const int VEC_DIM = 3;`.
    *   `main.c`: In `main()`, declare the function `extern double dot_product(...)` and the variable `extern const int VEC_DIM;`, then call the function and use the variable.
2.  **Compile, don't link.** Use your compiler to create object files only. This isolates the stage we care about.
    ```bash
    gcc -c main.c -o main.o
    gcc -c vec_ops.c -o vec_ops.o
    ```
3.  **Inspect the "needs" list.** Use the `nm` utility to view the symbol table of the object file that *uses* the external code.
    ```bash
    nm main.o
    ```
    Identify the symbols `dot_product` and `VEC_DIM`. Note their status is `U`, for "Undefined". `main.o` is stating its dependencies.
4.  **Inspect the "provides" list.** Now, inspect the other object file.
    ```bash
    nm vec_ops.o
    ```
    Note that `dot_product` is marked `T` (defined in the Text/code section) and `VEC_DIM` is marked `R` or `D` (defined in a read-only Data section). This file *provides* those symbols.
5.  **Find the "fill-in-the-blanks" instructions.** Use `objdump` to see the relocation entries.
    ```bash
    objdump -r main.o
    ```
    This output explicitly tells you: "At memory offset `X`, I have a placeholder for the address of `dot_product`. Linker, please patch it." It will show a similar entry for `VEC_DIM`.
6.  **Close the loop.** Link the two object files into a final executable and run it to confirm the linker did its job.
    ```bash
    gcc main.o vec_ops.o -o vector_calc
    ./vector_calc
    ```

## Key ideas, with intuition
1.  **Object Files are Incomplete Blueprints.** An object file is like a schematic for one part of a machine, say, the engine. It has all the components of the engine (`.text` and `.data` sections), but the connection points for fuel lines and electrical wiring are just labeled sockets (`relocation entries`). It can't run on its own. The linker is the master mechanic who connects the engine, transmission (`other.o`), and chassis (`libc.a`) using the master blueprint.

2.  **The Symbol Table is a Public Ledger.** Every object file maintains a list of all its global symbols (functions and variables). For each symbol, the table records two key things:
    *   **Am I defining this or do I need it?** If defined, the table stores its address within the object file. If needed, it's marked as `UNDEFINED`.
    *   **Who can see it?** Symbols can be local (`static`) or global. The symbol table only lists the global ones for other files to see.

3.  **Relocation is a "Post-it Note for the Linker".** When the compiler generates machine code for `main.c`, it encounters a call to `dot_product`. It doesn't know the final memory address of that function. So, it generates a `call` instruction with a placeholder address (often 0) and creates a relocation entry. This entry is a metadata "Post-it note" that says:
    > **To the Linker:** When you lay out all the object files in memory and figure out the final address of `dot_product`, come back to *this exact spot* in my machine code (at offset `0x...`) and patch in the correct address.

    The final address $A_{final}$ is calculated by the linker based on the base address of the section $A_{base}$ and the symbol's offset within its own object file $A_{offset}$.
    $$ A_{final} = A_{base} + A_{offset} $$
    The relocation entry ensures this calculation is performed and the result is written into the machine code.

## Worked example
Let's model a simple rocket guidance system.

**File 1: `nav.c`**
```c
// Provides navigation calculations
double PI = 3.14159;

double to_radians(double degrees) {
    return degrees * (PI / 180.0);
}
```

**File 2: `main.c`**
```c
#include <stdio.h>

// Declare symbols defined elsewhere
extern double PI;
extern double to_radians(double degrees);

int main() {
    double angle_deg = 45.0;
    double angle_rad = to_radians(angle_deg);
    printf("Pi is ~%.2f\n", PI);
    printf("%.2f degrees is %.2f radians.\n", angle_deg, angle_rad);
    return 0;
}
```

**Step 1: Compile `main.c` to `main.o`**
```bash
gcc -c main.c -o main.o
```
This succeeds because the compiler assumes the `extern` symbols will be found later by the linker.

**Step 2: Inspect `main.o`'s symbol table**
```bash
nm main.o
```
Output will be similar to this (details vary by architecture):
```
                 U PI
                 U to_radians
0000000000000000 T main
                 U printf
```
*   `main` is `T` (Text), as it's defined here.
*   `PI`, `to_radians`, and the library function `printf` are `U` (Undefined). `main.o` is documenting its needs.

**Step 3: Inspect `main.o`'s relocation entries**
```bash
objdump -r main.o
```
Output will show entries telling the linker where to patch the addresses of `PI` and `to_radians` inside the machine code for the `main` function. For example:
```
RELOCATION RECORDS FOR [.text]:
OFFSET           TYPE              VALUE
0000000000000018 R_X86_64_PC32     to_radians-0x4
0000000000000025 R_X86_64_PC32     PI-0x4
...
```
This says: at offset `0x18` inside the `.text` section, a 32-bit PC-relative address needs to be calculated for `to_radians`.

**Step 4: Compile and inspect `nav.o`**
```bash
gcc -c nav.c -o nav.o
nm nav.o
```
Output:
```
0000000000000000 D PI
0000000000000000 T to_radians
```
*   `PI` is `D` (Data), defined and initialized here.
*   `to_radians` is `T` (Text), defined here. `nav.o` provides these symbols.

**Step 5: Link everything**
```bash
gcc main.o nav.o -o rocket_nav
```
The linker resolves the `U` symbols in `main.o` using the `D` and `T` symbols from `nav.o`. It reads the relocation entries in `main.o`, calculates the final addresses, and patches the machine code. The executable `rocket_nav` is now a complete, self-contained program.

*Reflection:* Each step is deterministic. The compiler translates C to machine code but leaves blanks for things it can't know. It records what it needs (`U` symbols) and where it needs them (`relocation entries`). Another object file provides the definitions. The linker is the deterministic process that connects the "needs" to the "provides".

## Diagrams
**1. Compilation and Linking Flow**
```text
               +--------------+
main.c  -----> |   Compiler   | ----> main.o
               | (gcc -c)     |       (Symbol Table: 'to_radians' is U)
               +--------------+       (Relocations for 'to_radians')
                                                  |
                                                  V
               +--------------+               +--------+               +-------------+
nav.c   -----> |   Compiler   | ----> nav.o -->| Linker |--> rocket_nav | Executable  |
               | (gcc -c)     |       (Symbol  | (gcc)  |               +-------------+
               +--------------+        Table:  +--------+
                                     'to_radians' is T) |
                                                  ^
                                                  |
                                             libc.a (for printf)
```

**2. Object File Structure**
```text
            main.o
+--------------------------------+
|         ELF Header             |
+--------------------------------+
| .text (Machine Code)           | -> Contains the compiled code for main().
|   ...                          |
|   call 0x0000   <-- Placeholder| --+
|   ...                          |   |
+--------------------------------+   |
| .data (Initialized Data)       |   |
+--------------------------------+   |
| .bss (Uninitialized Data)      |   |
+--------------------------------+   |
|      Symbol Table              |   |
| +-----------------+------+   |   |
| | NAME            | ADDR |   |   |
| +-----------------+------+   |   |
| | main            | 0x00 |   |   |
| | printf          | UND  |   |   |
| | to_radians      | UND  | <-+---+---- References symbol by name
+--------------------------------+   |
|    Relocation Table (.rel.text)|   |
| +----------------------------+ |   |
| | OFFSET | TYPE   | SYMBOL  | |   |
| +----------------------------+ |   |
| | 0x18   | PC32   | to_rad..| | --+ Points to the placeholder in .text
+--------------------------------+
```

## Memory technique — remember this forever
1.  **The Story: The Inter-Office Memo.**
    An object file is like a memo written by an engineer in one department (`main.c`). The memo says: "To complete my part of the project, I need the final specification for the '`guidance_module`' from the Propulsion department (`guidance.c`). Please insert the spec number at blank space ___ on my schematic."
    *   **Symbol Table:** The `To:` and `From:` fields of the memo. It lists who the memo is for (`U` symbols) and who it's from (`T` symbols).
    *   **Relocation Entry:** The sentence "insert the spec number at blank space ___". It's a precise instruction on *what* is needed (`guidance_module`) and *where* to put it.
    *   **Linker:** The office manager who collects all the memos, looks up the final spec numbers, and fills in the blanks before sending the complete project plan to manufacturing.

2.  **Must Overlearn:**
    *   **Symbol Table:** Maps names to information. `U` = Undefined (I need this). `T`/`D` = Text/Data (I define this).
    *   **Relocation Entry:** `(offset, type, symbol)`. "At `offset`, patch in the address of `symbol` using rule `type`."

3.  **Spaced Repetition Schedule:**
    *   Review this material in 1 day.
    *   Then in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Final lock-in review in 35 days.

4.  **First Principles Pathway:**
    If you forget the details, rebuild it from this question: *How can code in `fileA.c` call a function in `fileB.c` if they are compiled independently?*
    *   The compiler working on `fileA.c` has never seen `fileB.c`. It cannot know the function's address.
    *   Therefore, it must leave a placeholder in the machine code.
    *   It must also leave a note for a later program (the linker) explaining which placeholder corresponds to which function name.
    *   This "note" is the **relocation entry**. The list of function names is the **symbol table**. The file containing the code and these notes is the **object file**.

## Common mistakes
1.  **Getting an "undefined reference to `symbol`" error.** This is a *linker* error, not a compiler error. It means you declared a function or variable (e.g., `extern int foo();`) and used it, but you forgot to pass the `.o` file or library that *defines* `foo` to the linker.
2.  **Getting a "multiple definition of `symbol`" error.** Also a linker error. This happens when two or more of the `.o` files you're linking provide a global definition for the same symbol. This is commonly caused by defining a function or global variable in a `.h` header file instead of just declaring it.
3.  **Confusing `static` C functions with static linking.** A `static` function in C has internal linkage, meaning its symbol is not made visible in the object file's global symbol table. It cannot be called from other object files. This is a language feature, distinct from the concept of static vs. dynamic linking of libraries.

## Self-check
1.  You have `physics.c` which defines a function `simulate()`. You also have `main.c` which calls `simulate()`. You compile *only* `physics.c` into `physics.o`. What is the status of the symbol `simulate` in `physics.o`'s symbol table? What would its status be in `main.o`'s symbol table?
2.  Imagine an embedded system with no operating system (bare metal). The final program must be placed at a specific physical memory address, say `0x80000000`. How does the linker use the relocation entries and a "linker script" (which specifies the start address) to generate the final, correct machine code for this absolute memory layout?
3.  A "Position-Independent Code" (PIC) object file is used for creating shared libraries (`.so`). Instead of relocation entries that ask for absolute addresses, its entries ask for addresses relative to a Global Offset Table (GOT). Why is this indirect, relative addressing scheme necessary for a library that might be loaded at a different memory address every time a program runs?