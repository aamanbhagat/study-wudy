## What it is
Disassembly is the process of translating machine code—the raw binary instructions a CPU executes—back into a human-readable format called assembly language. A tool like `objdump` is a disassembler; it reads an executable file, which contains machine code, and "dumps" its contents, including the corresponding assembly instructions.

## Why it matters
This is your microscope for viewing what the compiler *actually* did to your code. For high-performance computing in physics simulations, you can identify compiler-missed optimizations or CPU cache inefficiencies. In aerospace or robotics, debugging low-level embedded code or understanding the precise timing of operations often requires reading the assembly generated for a specific microcontroller.

## When to study it
Before proceeding, you must understand the compilation pipeline (C source -> preprocessor -> compiler -> assembler -> linker). You also need a working mental model of basic computer architecture, specifically the concepts of a CPU, registers (as fast, on-chip storage), and memory (the stack). Familiarity with a compiled language like C is non-negotiable.

## How to study it (step by step)
1.  **Create a minimal C program.** Save the following as `simple.c`:
    ```c
    int main() {
        int a = 5;
        int b = 10;
        int c = a + b;
        return c;
    }
    ```
2.  **Compile the program.** Use GCC, but tell it to stop after compiling and assembling, and to keep debugging symbols to make the output readable.
    ```bash
    gcc -g -c simple.c -o simple.o
    ```
    This creates an object file `simple.o`, which contains the machine code for your program but isn't yet a full executable.
3.  **Run `objdump`.** Use the `-d` flag to disassemble and `-S` to interleave the original C source code (which works because we used the `-g` flag during compilation).
    ```bash
    objdump -dS simple.o
    ```
4.  **Analyze the output for `main`.** Find the `<main>:` label. Read the assembly instructions one by one. Notice how `int a = 5;` might translate to something like `movl $0x5, -0xc(%rbp)`.
5.  **Identify the core logic.** Look for the `add` instruction. See how the values for `a` and `b` are moved from memory into registers, added together, and then the result is moved back into memory for `c`.
6.  **Trace the return value.** Find the final `mov` instruction before the `ret`. On the x86-64 architecture, the return value of a function is, by convention, placed in the `%eax` register. You will see the value of `c` being moved into `%eax`.
7.  **Modify and repeat.** Change the C code to use subtraction or multiplication. Re-compile and re-disassemble. Observe how only one instruction (`add` -> `sub` or `imul`) changes, reinforcing the mapping between C operators and assembly opcodes.

## Key ideas, with intuition
1.  **Reversing the Flow:** Compilation goes from human-readable source code to machine-executable binary. Disassembly is the reverse process. It's like translating a final dish back into its recipe; you can see the ingredients (`mov`, `add`) but lose the chef's original comments and variable names (unless you have debug symbols).
2.  **CPU as a Simple Calculator:** At its core, a CPU just performs simple operations on data stored in a small number of super-fast memory locations called registers. Assembly language is the set of commands to control this calculator, like `mov` (move data), `add` (add data), and `jmp` (jump to a different instruction).
3.  **Instruction Anatomy:** An assembly instruction has two main parts: the **opcode** (the command, e.g., `mov`) and the **operands** (the data to work on, e.g., `%eax`, `$0x5`).
    $$
    \underbrace{\text{movl}}_{\text{opcode}} \quad \underbrace{\$0x5, -0x4(\%rbp)}_{\text{operands}}
    $$
    This says "move the literal value 5 into the memory location 4 bytes below the base pointer."
4.  **AT&T vs. Intel Syntax:** `objdump` defaults to AT&T syntax. The key difference from the Intel syntax you may see elsewhere is the order of operands:
    *   **AT&T:** `opcode source, destination`
    *   **Intel:** `opcode destination, source`
    Also, AT&T syntax prefixes registers with `%` and literal values with `$`. Just be consistent.

## Worked example
Let's analyze a simple function.

**C Code (`math.c`):**
```c
int add_forty_two(int x) {
    return x + 42;
}
```

**Compilation and Disassembly:**
```bash
# Compile the C code into an object file with debug symbols
gcc -g -c math.c -o math.o

# Disassemble the object file
objdump -dS math.o
```

**`objdump` Output (annotated):**
```assembly
0000000000000000 <add_forty_two>:
int add_forty_two(int x) {
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   89 7d fc                mov    %edi,-0x4(%rbp)
    return x + 42;
   7:   8b 45 fc                mov    -0x4(%rbp),%eax
   a:   83 c0 2a                add    $0x2a,%eax
   d:   c9                      leave
   e:   c3                      ret
}
```

**Step-by-step breakdown:**
1.  **`push %rbp` and `mov %rsp, %rbp`**: This is the "function prologue." It saves the old base pointer (`%rbp`) and sets up a new stack frame for this function. This is standard boilerplate for managing function calls.
2.  **`mov %edi, -0x4(%rbp)`**: The System V AMD64 ABI (the calling convention on Linux) dictates that the first integer argument to a function is passed in the `%rdi` register (or `%edi` for a 32-bit integer). This instruction moves the value of the argument `x` from the `%edi` register to a spot on the stack (`-0x4(%rbp)`), 4 bytes below the base pointer.
3.  **`mov -0x4(%rbp), %eax`**: This is the start of the actual logic. It moves the value of `x` from its spot on the stack back into a register, `%eax`. The `%eax` register is often used as an "accumulator" for calculations.
4.  **`add $0x2a, %eax`**: This is the core operation. It adds the literal value `$0x2a` (which is hex for 42) to the value currently in the `%eax` register. The result is stored back into `%eax`.
5.  **`leave` and `ret`**: This is the "function epilogue." `leave` restores the previous stack frame, and `ret` (return) pops the return address off the stack and jumps back to where the function was called. The return value is, by convention, left in the `%eax` register for the calling function to use.

**Reflection:** Each line of assembly performs one tiny, explicit action. The C code `return x + 42;` was translated by the compiler into a sequence of moving data from the argument register to the stack, then to a calculation register, performing the addition, and finally executing the return sequence, leaving the result in the conventional return register.

## Diagrams
**Compilation vs. Disassembly Flow:**
```text
                  +-------------+       +-----------+
C Source Code --> |  Compiler   | ----> | Assembler | --+
(e.g., main.c)    | (gcc -S)    |       | (as)      |   |
                  +-------------+       +-----------+   |
                        |                               |
                        v                               v
                  +-------------+       +---------------+
Assembly Code --> |             |       |  Object Code  |
(e.g., main.s)    |             | <---- | (e.g., main.o)|
                  +-------------+       +---------------+
                        ^                       |
                        |                       |
                  +-------------+               |
Disassembly <---- |  objdump -d | <-------------+
                  +-------------+
```

**Key x86-64 Registers (System V ABI):**
```text
CPU Registers:
+----------+-----------------------------------+
|  Name    |              Purpose              |
+----------+-----------------------------------+
|  RAX     | Return value                      |
|  RDI     | 1st argument to function          |
|  RSI     | 2nd argument to function          |
|  RDX     | 3rd argument to function          |
|  RCX     | 4th argument to function          |
|  ...     | ...                               |
|  RSP     | Stack Pointer (points to top)     |
|  RBP     | Base Pointer (for current frame)  |
|  RIP     | Instruction Pointer (next to run) |
+----------+-----------------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a master chef (the CPU) who has a tiny, pristine workbench (the registers) and a massive pantry (RAM). The assembly code is the recipe. `mov %rdi, -0x4(%rbp)` is "Take the first ingredient handed to you and put it on a specific shelf in the pantry." `add $0x2a, %eax` is "Take the item from the main mixing bowl (`%eax`), add 42 grams of sugar (`$0x2a`), and put the result back in the bowl." `objdump` is like finding a finished cake and using a chemistry set to figure out the recipe.

2.  **Must Overlearn:**
    *   `mov source, destination` (AT&T syntax): Move data.
    *   Calling Convention (x86-64 Linux/macOS):
        *   Return value: `%rax`
        *   Arguments: `%rdi`, `%rsi`, `%rdx`, `%rcx`, `%r8`, `%r9`
    *   `ret`: Return from function.

3.  **Spaced Repetition:** Review these key ideas and the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, re-do the `objdump` command from scratch on a simple C file.

4.  **First Principles Pathway:** If you forget everything, remember this: a program is just a sequence of instructions that manipulate data. To understand any instruction, write the simplest possible C program that *must* use that operation (e.g., for `add`, write `a + b`). Compile it (`gcc -S file.c`) to see the assembly, then find the one line that changed. This is your Rosetta Stone.

## Common mistakes
1.  **Mixing up Source & Destination:** In `objdump`'s default AT&T syntax, the destination is *last*. `mov %rax, %rbx` moves the content of `rax` into `rbx`. Many online resources use Intel syntax (`mov rbx, rax`), which has the opposite order. Be aware of which you are reading.
2.  **Ignoring Instruction Suffixes:** `movb`, `movw`, `movl`, `movq` are not the same. The suffix indicates the size of the data being moved: **b**yte (8-bit), **w**ord (16-bit), **l**ong (32-bit), or **q**uad (64-bit). Using the wrong one can lead to data truncation or reading garbage from adjacent memory.
3.  **Assuming Optimization is Off:** When you compile with optimizations (`-O2`, `-O3`), the compiler will aggressively reorder, inline, and transform your code. The resulting assembly may bear little resemblance to the structure of your original C source. Always start analyzing with optimizations off (`-O0` or default) to build a clear mapping.

## Self-check
1.  You have a C program compiled into an executable file named `rocket_guidance`. What is the exact `objdump` command to view its disassembled code, interleaved with the original C source if debug symbols are present?
2.  A function `calculate_thrust(long fuel, long oxidizer)` is called. In which two registers will the `fuel` and `oxidizer` arguments be passed, according to the standard x86-64 Linux calling convention? Where will the function's `long` result be stored before it returns?
3.  Look at the following assembly snippet. Write a single line of C code that would most likely produce it.
    ```assembly
    mov    -0x8(%rbp), %eax
    imul   -0x4(%rbp), %eax
    mov    %eax, -0xc(%rbp)
    ```