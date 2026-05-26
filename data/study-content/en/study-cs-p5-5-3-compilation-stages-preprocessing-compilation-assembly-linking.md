## 1. The one-sentence answer
**Compilation stages transform human-readable source code into an executable binary through four sequential, irreversible transformations: preprocessing, compilation, assembly, and linking.**

Preprocessing expands macros and includes, producing a single translation unit. Compilation then lowers that unit to architecture-specific assembly text. Assembly converts the text into relocatable object code containing machine instructions and unresolved symbols. Linking finally resolves those symbols across multiple objects and libraries to emit a runnable executable.

Each stage is performed by a distinct tool or pass inside a compiler driver such as GCC or Clang; the driver orchestrates them unless you request an intermediate stop with flags such as `-E`, `-S`, or `-c`.

> [!NOTE]
> The output of each stage is a strictly simpler representation than its input; once lowered, high-level information such as macros or type names is permanently discarded.

## 2. Why this matters — concrete and current
The Linux kernel build system invokes these exact stages millions of times per release; a single `make` run on an x86_64 configuration runs the preprocessor on thousands of `.c` files before any assembly is generated, enabling conditional compilation via Kconfig macros that differ between distributions.

NVIDIA’s CUDA toolchain applies the same pipeline to `.cu` files: `nvcc` first preprocesses with the host C preprocessor, emits PTX assembly for the GPU, assembles it to cubin object code, and finally links both host and device objects into a fat binary consumed by CUDA applications in machine-learning frameworks such as PyTorch.

The European Space Agency’s onboard software for the JUICE mission is compiled with a qualified GCC variant that performs the four stages under strict MISRA rules; any macro expansion error introduced during preprocessing would propagate undetected into the final linked ELF image running on the LEON3 processor.

Apple’s clang-based build of Swift and Objective-C code for iOS apps performs the identical sequence, with the linker `ld64` responsible for both static resolution of Swift metadata and dynamic binding of system frameworks at install time.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Translation unit         | Preprocessing operates on exactly one translation unit    |
| Symbol table             | Linking resolves undefined symbols using symbol tables    |
| Relocation entries       | Object files contain relocations that the linker patches  |
| ELF / Mach-O / PE format | Final executables are stored in one of these binary formats |

## 4. Building the idea — from intuition to formalism

### Step 1 — Source text contains directives that must be eliminated
Plain-English claim: Before any compiler can reason about C or C++ code, textual substitutions and file inclusions must be performed so that the remaining text contains only language tokens.

Concrete example: the line `#include <stdio.h>` is replaced by the literal contents of the header.

Formal statement: the preprocessor produces a single token stream \( T_1 \) from the original source \( S \) and the set of active macro definitions \( M \):
\[
T_1 = \text{Preprocess}(S, M)
\]

> [!WARNING]
> If a macro is defined after its first use, the expansion will be inconsistent across translation units and produce silent ODR violations later.

### Step 2 — Token stream is lowered to architecture-specific assembly
Plain-English claim: The compiler proper maps the token stream onto the instruction set and calling convention of the target CPU.

Concrete example: an `int add(int a, int b) { return a+b; }` becomes `addl %esi, %edi; movl %edi, %eax; ret` on x86-64 System V.

Formal statement: the compiler emits assembly text \( A \) satisfying the semantics of the abstract machine:
\[
A = \text{Compile}(T_1, \text{target})
\]

> [!WARNING]
> Treating assembly as portable leads to immediate build breakage when cross-compiling for ARM versus x86.

### Step 3 — Assembly text becomes relocatable machine code
Plain-English claim: The assembler replaces mnemonics with opcodes and records every reference to external symbols as a relocation entry.

Concrete example: the instruction `call printf` is stored as `e8 00 00 00 00` plus a relocation of type `R_X86_64_PC32` against the symbol `printf`.

Formal statement: the assembler produces an object file \( O \) containing sections, symbols, and relocation list \( R \):
\[
O = \text{Assemble}(A)
\]

> [!WARNING]
> Forgetting that relocations still exist after assembly causes “undefined reference” errors only at link time, not earlier.

### Step 4 — Multiple objects are combined and symbols resolved
Plain-English claim: The linker merges all object files, satisfies every relocation, and writes the final executable or shared library.

Concrete example: references to `printf` from several `.o` files are patched to the single address supplied by `libc.so.6`.

Formal statement: given a set of objects \( \{O_i\} \) and libraries \( L \), the linker yields an executable \( E \):
\[
E = \text{Link}(\{O_i\}, L)
\]

> [!WARNING]
> Static versus dynamic linking decisions made here determine whether the final binary contains copies of library code or only references.

### Step 5 — The driver orchestrates the four stages
The compiler driver (gcc, clang) accepts a single command line and decides which stages to run and which temporary files to keep, giving the illusion of a monolithic compiler while preserving each intermediate representation for inspection.

## 5. Worked examples — every step shown

**Example 1 — Preprocessing only**  
*Given:* file `t.c` containing `#define N 4` followed by `int a[N];`.  
*Find:* the token stream after preprocessing.  
`gcc -E t.c -o t.i`  
- The driver invokes only the preprocessor.  
*Why:* flag `-E` stops after preprocessing.  
- Output `t.i` contains the literal line `int a[4];`.  
*Why:* macro substitution has occurred.  
**`int a[4];`**

*Reflection:* The example isolates textual expansion; any syntax error would still be invisible until later stages.

**Example 2 — Stop at assembly**  
*Given:* the same `t.c`.  
*Find:* the generated assembly.  
`gcc -S t.c -o t.s`  
- Preprocessing and compilation both run.  
*Why:* `-S` requests assembly output.  
- The resulting `t.s` contains `.data` and `.long 4` or equivalent.  
*Why:* the compiler has chosen storage for the array.  
**`.long 4` inside the data section**

*Reflection:* Assembly reveals register allocation and calling-convention choices that are invisible in source.

**Example 3 — Produce object file**  
*Given:* `t.s`.  
*Find:* the object file.  
`as t.s -o t.o` (or `gcc -c t.c`)  
- Assembly runs.  
*Why:* `-c` stops after assembly.  
- `t.o` now contains a symbol table entry for `a` and relocation records if any.  
*Why:* the assembler has emitted machine code.  
**ELF object with `SHT_PROGBITS` and `SHT_SYMTAB`**

*Reflection:* Object files are the first binary artefacts; they still contain unresolved symbols.

**Example 4 — Full link to executable**  
*Given:* `t.o` and the C runtime.  
*Find:* runnable binary.  
`gcc t.o -o t`  
- Linking occurs.  
*Why:* no stop flag remains.  
- The resulting `t` contains the resolved address of `main` and the entry point `_start`.  
*Why:* the linker supplied the C runtime and performed all relocations.  
**Executable ELF with program header table**

*Reflection:* Only at this final stage can the operating-system loader map the file into memory and begin execution.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                              |
|-----------------------------------|-----------------------------------------------------|----------------------------------------------|
| Macro side-effects in `#if`       | Preprocessor evaluates expressions textually        | Never place increment operators inside macros |
| Assuming `.o` files are portable  | Object code embeds target-specific relocations      | Always rebuild when changing architecture    |
| Missing `-l` order on command line| Linker processes libraries strictly left-to-right   | Place libraries after the objects that need them |
| Preprocessing hidden by IDE       | IDE runs the driver with default flags silently     | Add `VERBOSE=1` or examine the build log     |
| Mixing `.c` and `.cpp` in one link| Name mangling differs between C and C++             | Use `extern "C"` or compile everything as C++ |
| Forgetting `-fPIC` for shared libs| Absolute relocations cannot be relocated at load    | Compile position-independent code for `.so`  |
| Header guard collisions           | Two headers define the same macro guard             | Use `#pragma once` or unique guard names     |

## 7. The textbook-precise statement
A conforming implementation shall translate a C source file through the eight phases of translation defined in ISO/IEC 9899:2018 §5.1.1.2. Phases 1–3 constitute preprocessing and produce a translation unit; phase 4 performs macro expansion; phase 7 maps the resulting tokens to an abstract machine and emits assembly; phase 8 assembles and links the resulting object files into a program image. The same pipeline is described for C++ in ISO/IEC 14882:2020 §5.2.

## 8. Visual — diagram or schematic
```
Source files (.c, .cpp)
        │
        ▼  cpp / clang -E
Preprocessed (.i)
        │
        ▼  cc1 / clang -S
Assembly (.s)
        │
        ▼  as / clang -c
Object files (.o)  ───┐
                      │
Libraries (.a, .so) ──┼──► ld / lld
                      │
                      ▼
                 Executable / Shared object
```

## 9. The memory technique
**The hook** — Picture a factory assembly line where raw metal (source) is first cleaned and cut (preprocess), then shaped into parts (compile to assembly), stamped into components (assemble), and finally bolted together on the chassis (link).

**What to overlearn** — The four flags `-E`, `-S`, `-c`, and the implicit final link; the fact that each stage’s output is the next stage’s input.

**Spaced-repetition schedule** — Review the pipeline at 1 day, 3 days, 7 days, 16 days, 35 days by compiling a small program with each flag in turn.

**First-principles fallback** — Re-derive the pipeline by asking: “What must be removed before tokens can be parsed?” (macros), “What must be produced before the CPU can execute?” (machine code with resolved addresses).

## 10. What this unlocks
Understanding the four stages lets you diagnose build failures at the precise point they occur and exploit intermediate artefacts for optimisation, binary analysis, or cross-language interoperability.

- Next: static versus dynamic linking and the role of the dynamic linker `ld.so`
- Next: position-independent code and the global offset table
- Next: link-time optimisation (LTO) that operates across the assembly-to-object boundary
- Next: build-system generators (Make, CMake, Bazel) that orchestrate these stages at scale

## 11. Self-check — five questions, no answers
1. Which single command-line flag to `gcc` produces only the output of the preprocessor?

2. After the assembly stage, which data structure inside the `.o` file records every reference that still needs an address?

3. Why does changing the order of libraries on the final `gcc` command line sometimes turn an “undefined reference” error on or off?

4. A macro defined with `#define SQR(x) x*x` is used as `SQR(a+b)`. At which stage does the resulting expression become incorrect, and what is the expanded form?

5. When cross-compiling an ARM binary on an x86 host, at which stage does the host’s own instruction set become irrelevant?