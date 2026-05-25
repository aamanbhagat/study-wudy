## What it is
The compilation pipeline is the multi-stage process that a toolchain uses to transform human-readable source code into a machine-executable program. The four canonical stages are **Preprocessing** (text substitution), **Compilation** (source to assembly), **Assembly** (assembly to machine code), and **Linking** (combining machine code modules). Each stage takes the output of the previous one as its input, progressively lowering the level of abstraction.

## Why it matters
In high-performance computing for physics simulations or rocket guidance, you will directly manipulate these stages for optimization. For example, you might inspect the assembly output (`-S`) to ensure the compiler vectorized a critical loop, or you might control the linking process to use custom, highly-optimized math libraries (`-L`, `-l`). Understanding this process is also non-negotiable for debugging errors, especially linker errors like "undefined reference," which are common in large, multi-file scientific codebases.

## When to study it
Before tackling this, you must have a solid grasp of a compiled language like C or C++, including the difference between declaration and definition. You should also understand the basics of computer architecture (what a CPU register is, what machine instructions are) and be comfortable using a command-line compiler like `gcc` or `clang` for simple, single-file programs. If you don't know what `gcc main.c -o main` does, review that first.

## How to study it (step by step)
1.  **Create a multi-file project.** Write three files. `main.c`, `math_util.c`, and `math_util.h`. In `math_util.h`, declare a function `int add(int a, int b);`. In `math_util.c`, define that function. In `main.c`, `#include` both `<stdio.h>` and `"math_util.h"` and call `add()`.
2.  **Isolate the Preprocessor.** Run the command `gcc -E main.c -o main.i`. Open the output file `main.i`. Observe how the `#include` directives were replaced by the literal contents of the header files. If you added a `#define PI 3.14`, notice how it has been textually substituted.
3.  **Isolate the Compiler.** Take the preprocessed output and generate assembly. Run `gcc -S main.i -o main.s`. Open `main.s` and examine the assembly code. You won't understand it all, but you should be able to spot labels corresponding to your function names and instructions like `call` for your `add()` function call.
4.  **Isolate the Assembler.** Generate an object file, which contains machine code. Run `gcc -c main.s -o main.o`. This file is binary and not human-readable. Use a tool to inspect its contents: `nm main.o`. Note the symbols listed; you'll see `main` is defined (`T` for text/code section) but `add` is undefined (`U`).
5.  **Perform the final Link.** First, create the object file for your other source file: `gcc -c math_util.c -o math_util.o`. Now, use the linker to combine the two object files into a final executable: `gcc main.o math_util.o -o my_program`.
6.  **Verify.** Run `./my_program` and see that it works. Now, run `nm my_program` and observe that the symbol `add` is no longer undefined; the linker has resolved its address.

## Key ideas, with intuition
1.  **Translation, Not Interpretation.** The compilation pipeline is a series of translators. Each stage speaks a "language" of a lower abstraction level than the previous one. The goal is to translate your abstract C++ or C logic into the only language the CPU truly understands: sequences of 1s and 0s representing specific instructions.
    $$ \text{Source Code (.c)} \xrightarrow{\text{Preproc.}} \text{Expanded Source (.i)} \xrightarrow{\text{Compiler}} \text{Assembly (.s)} \xrightarrow{\text{Assembler}} \text{Object Code (.o)} \xrightarrow{\text{Linker}} \text{Executable} $$
2.  **The Symbol Table: A Program's Address Book.** Every object file (`.o`) contains a symbol table. This table lists the "names" (functions, global variables) the file offers to other files (defines) and the names it needs from other files (uses). The assembler creates this table; the linker's primary job is to match every "use" in one file with a "define" in another, resolving their memory addresses. An "undefined reference" error is the linker telling you it couldn't find an entry in any address book for a name you tried to call.
3.  **Separation of Concerns enables speed.** Why not just go from `.c` to executable in one step? By creating intermediate object files (`.o`), we can recompile only the files that have changed. For a 10-million-line rocket guidance system, changing one line and recompiling only one `.c` file and then re-linking is seconds of work. Recompiling all 10 million lines would take hours. This is the foundation of how build systems like `make` work.

## Worked example
Let's use the files from the "How to study it" section.

**`math_util.h`:**
```c
#ifndef MATH_UTIL_H
#define MATH_UTIL_H

int add(int a, int b);

#endif
```

**`math_util.c`:**
```c
#include "math_util.h"

int add(int a, int b) {
    return a + b;
}
```

**`main.c`:**
```c
#include <stdio.h>
#include "math_util.h"

#define GREETING "The result is: "

int main() {
    int result = add(5, 3);
    printf("%s%d\n", GREETING, result);
    return 0;
}
```

**Step 1: Preprocessing `main.c`**
Command: `gcc -E main.c -o main.i`
The file `main.i` will be very long, because the entire contents of `<stdio.h>` have been pasted in. At the bottom, you will see our code transformed:
```c
// ... hundreds of lines from stdio.h ...
// ... contents of math_util.h ...

int main() {
    int result = add(5, 3);
    printf("%s%d\n", "The result is: ", result); // Note the substitution
    return 0;
}
```
*Reflection: The preprocessor performed simple text-based operations, expanding includes and replacing macros. It has no knowledge of C syntax.*

**Step 2: Compiling `main.i` to Assembly**
Command: `gcc -S main.i -o main.s`
The file `main.s` contains architecture-specific assembly. A snippet might look like this (Intel syntax):
```asm
.LC0:
    .string "The result is: %d\n"
main:
    ; ... function setup ...
    movl    $3, %esi       ; Move 3 into a register for the 2nd arg
    movl    $5, %edi       ; Move 5 into a register for the 1st arg
    call    add            ; Call the 'add' function
    ; ... more instructions for printf ...
```
*Reflection: The compiler has translated C logic into a sequence of low-level CPU instructions. It assumes a function named `add` exists but doesn't know where it is.*

**Step 3: Assembling `main.s` and `math_util.c`**
Commands:
`gcc -c main.s -o main.o`
`gcc -c math_util.c -o math_util.o`
These produce binary object files. Let's inspect `main.o`'s symbols:
`nm main.o`
```
                 U add
0000000000000000 T main
                 U printf
```
*Reflection: The assembler has converted assembly mnemonics into machine code. The symbol table (`nm` output) clearly shows `main` is defined here (`T`), but `add` and `printf` are undefined (`U`), meaning this object file *uses* them but does not *provide* them.*

**Step 4: Linking everything**
Command: `gcc main.o math_util.o -o my_program`
The linker takes `main.o` and `math_util.o`, sees that `main.o` needs `add`, and finds it in `math_util.o`. It also finds `printf` in the C standard library (which is linked by default) and combines them all, calculating the final memory addresses for everything.
The result is a single executable file, `my_program`.

## Diagrams
```text
      Source Code       Intermediate Files     Tool
      -----------       ------------------     ----

      main.c, math_util.h
           |
           |
           V
+--------------------+
|    Preprocessor    |
+--------------------+
           |
           V
        main.i  (Expanded C code)
           |
           |
           V
+--------------------+
|      Compiler      |
+--------------------+
           |
           V
        main.s  (Assembly code)
           |
           |
           V
+--------------------+
|      Assembler     |
+--------------------+
           |
           V
        main.o  (Relocatable Machine Code)  <--+
           |                                   | (math_util.o, libc.a, etc.)
           |                                   |
           V                                   |
+--------------------+                         |
|       Linker       |-------------------------+
+--------------------+
           |
           V
      my_program (Executable Machine Code)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**P**apa **C**an't **A**lways **L**ink" -> **P**reprocessing, **C**ompilation, **A**ssembly, **L**inking.
2.  **Facts to overlearn:**
    *   **Preprocessor:** Input `.c`, Output `.i`. Job: text substitution (`#include`, `#define`).
    *   **Compiler:** Input `.i`, Output `.s`. Job: C to Assembly.
    *   **Assembler:** Input `.s`, Output `.o`. Job: Assembly to Machine Code + Symbol Table.
    *   **Linker:** Input `.o`/`.a`/`.so`, Output executable. Job: Resolve symbols across files.
3.  **Spaced Repetition:** Review these stages and their inputs/outputs right now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Quiz yourself by drawing the diagram from memory.
4.  **First Principles Pathway:** If you forget, remember the command `gcc -v my_program.c`. The `-v` (verbose) flag forces `gcc` to print out the exact sequence of internal commands it runs for each stage. You can literally see it call the preprocessor (`cc1`), assembler (`as`), and linker (`collect2` or `ld`) and the intermediate files it creates in `/tmp`. You can always reconstruct the process from this command.

## Common mistakes
1.  **Confusing Compiler vs. Linker Errors.** A "syntax error" or "undeclared variable" is a *compiler* error; the C code itself is invalid. An "undefined reference to `_foo`" is a *linker* error; the C code was syntactically valid, but the linker couldn't find the machine code for `foo` in any of the provided object files or libraries.
2.  **Header vs. Source File Confusion.** Putting function *definitions* (the code with `{...}`) in a header file. This causes the same function to be defined in every object file that includes the header, leading to a "multiple definition" linker error. Headers are for *declarations* (prototypes), sources are for *definitions*.
3.  **Forgetting to Link a `.o` file.** Writing `gcc main.c -o my_program` when `main.c` calls a function from `math_util.c`. You will get an "undefined reference" because you never told the linker about `math_util.o`. The correct command is `gcc main.c math_util.c -o my_program`.

## Self-check
1.  What is the file extension of the direct output of the C compiler stage (not the preprocessor or assembler)?
2.  You have `main.c` which calls a function `calculate()`. You have two library files, `lib_fast.a` and `lib_accurate.a`, both of which contain a definition for `calculate()`. What happens when you run `gcc main.c lib_fast.a lib_accurate.a`? At which stage does this issue manifest?
3.  How could you use the compilation pipeline tools to create a single file containing all your project's C code (after macro expansion and includes) but *before* it is turned into assembly, and why might this be useful for debugging?