## 1. The one-sentence answer
**C compilation transforms human-written source code into an executable binary through four sequential stages: preprocessing, compilation, assembly, and linking.**

The preprocessor expands macros, includes header files, and removes comments, producing a single translation unit. The compiler then converts that expanded C code into architecture-specific assembly language. The assembler translates the assembly into relocatable object code containing machine instructions and symbol tables. Finally, the linker resolves external references across object files and libraries to produce a complete executable.

Each stage is a distinct program invoked by the driver (typically `cc` or `gcc`), and each can be run independently for inspection or debugging. The pipeline is deterministic once flags and environment variables are fixed.

> [!NOTE]
> The preprocessor operates only on text; no type checking or code generation occurs until the compiler stage. Mistaking textual substitution for semantic transformation is the root of most early C errors.

## 2. Why this matters — concrete and current
NASA’s Core Flight System, used on the Mars Perseverance rover and the James Webb Space Telescope, is written in C and compiled with GCC under strict MISRA rules; a single mis-linked object file would have prevented the flight software from booting.

Modern machine-learning frameworks such as PyTorch and TensorFlow ship CPU kernels written in C that are compiled once per target architecture; the linker’s ability to dead-strip unused symbols directly determines binary size on mobile devices.

Semiconductor vendors (Intel, ARM, RISC-V) publish reference C implementations of their intrinsics; the assembler stage must emit the exact vector instructions specified in the ISA manual, or performance drops by orders of magnitude.

The Linux kernel build system invokes the same four-stage pipeline millions of times per day across thousands of configurations; any change in preprocessor macro expansion or linker script alters the resulting vmlinux image that boots on billions of devices.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Textual substitution     | Preprocessor macros replace tokens before any syntax analysis |
| Symbol table             | Compiler and linker both record and resolve names and addresses |
| Relocation records       | Assembler emits placeholders that the linker must patch |
| Object-file format (ELF) | Defines sections, symbols, and relocation entries understood by the linker |

## 4. Building the idea — from intuition to formalism

### Step 1 — Source text exists only for humans
Plain-English claim: The compiler never sees the file you wrote; it sees only the text after preprocessing.

Concrete example: A file containing `#define N 100` followed by `int a[N];` becomes `int a[100];` before the compiler reads it.

Formal statement: Let \( S \) be the raw source. The preprocessor produces \( P(S) \) where every macro invocation and `#include` directive has been expanded.

> [!WARNING]
> If a macro expands to unbalanced parentheses, the compiler will report a syntax error on a line that no longer exists in your original file.

### Step 2 — Compilation produces architecture-specific assembly
Plain-English claim: The compiler maps C’s abstract machine onto the target CPU’s instruction set.

Concrete example: `a = b + 1;` on x86-64 may become `mov eax, [b]; inc eax; mov [a], eax`.

Formal statement: The compiler implements a function \( C: P(S) \to A \), where \( A \) is a sequence of assembly statements for the chosen ISA.

> [!WARNING]
> Treating assembly output as portable across compilers will break when optimisation levels or target triples differ.

### Step 3 — Assembly emits relocatable machine code
Plain-English claim: The assembler converts mnemonics into bytes and records which addresses are still unknown.

Concrete example: The instruction `call foo` becomes the opcode `0xE8` followed by a four-byte placeholder; the placeholder’s relocation entry says “add address of symbol foo here”.

Formal statement: The assembler yields an object file \( O \) containing code section \( C_O \), data section \( D_O \), symbol table \( Sym_O \), and relocation table \( Rel_O \).

> [!WARNING]
> Forgetting that assembly is a one-to-one mapping leads to attempts to “edit” object files with a text editor.

### Step 4 — Linking resolves symbols across units
Plain-English claim: The linker merges multiple object files, assigns final addresses, and patches every relocation.

Concrete example: Object file A references `printf`; the linker finds its definition in `libc.a`, copies the required code, and replaces the call-site placeholder with the actual address.

Formal statement: The linker computes a mapping \( L: \bigcup_i O_i \to E \) that produces a single executable \( E \) whose entry point and external symbols are fully resolved.

> [!WARNING]
> Duplicate strong symbols across object files produce undefined behaviour; the linker may silently choose one.

### Step 5 — The driver orchestrates the pipeline
Plain-English claim: `gcc` is not a single program; it spawns `cpp`, `cc1`, `as`, and `ld` (or their equivalents) and passes temporary files between them.

Formal statement: The compilation driver realises the composition \( E = L(A(C(P(S)))) \).

## 5. Worked examples — every step shown

**Example 1 — Single-file program**  
*Given:* `int main(void){return 0;}` saved as `t.c`.  
*Find:* The four intermediate files.  
`gcc -save-temps t.c` produces `t.i` (preprocessed), `t.s` (assembly), `t.o` (object), and `a.out` (executable).  
*Why* each flag keeps the temporary file instead of deleting it.  
**a.out**

*Reflection:* The simplest case reveals every artefact; most developers never inspect them.

**Example 2 — Macro side-effect**  
*Given:* `#define SQR(x) x*x` and `int y = SQR(a+b);`.  
*Find:* Expanded form.  
Preprocessor yields `int y = a+b*a+b;`.  
*Why* operator precedence changes the meaning.  
**int y = a + b * a + b;**

*Reflection:* Textual substitution has no notion of C expressions.

**Example 3 — Separate compilation**  
*Given:* `foo.c` defines `int foo(void){return 42;}` and `main.c` declares `extern int foo(void);`.  
*Find:* Linker action.  
`gcc -c foo.c` and `gcc -c main.c` produce two `.o` files; `gcc main.o foo.o` links them.  
*Why* the symbol `foo` moves from `Sym_foo.o` into the final executable.  
**a.out executes and returns 42**

*Reflection:* Each `.o` is incomplete until the linker merges symbol tables.

**Example 4 — Linker script and section placement**  
*Given:* A custom linker script placing `.text` at address `0x1000`.  
*Find:* Final load address of `main`.  
Assembler emits relocation for the entry point; linker applies the script and writes `0x1000` into the ELF header.  
*Why* the script overrides default layout.  
**Entry point = 0x1000**

*Reflection:* Physical memory layout is decided only at link time.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Macro argument evaluated multiple times | Preprocessor performs pure token substitution | Wrap macro bodies in parentheses and avoid side-effects in arguments |
| Missing prototype causes implicit `int` | Old C rules still accepted by some compilers | Compile with `-Wall -Werror` or C99+ |
| Object file contains undefined symbols | Declaration without definition in any unit | Use `nm` or `readelf -s` before linking |
| Link order affects resolution | Linker processes archives left-to-right | Place libraries after the objects that need them |
| Preprocessor `#include` cycles | Header guards omitted | Always use `#ifndef` guards or `#pragma once` |
| Assembly syntax differs between `as` and `gcc` | AT&T vs Intel syntax | Explicitly select syntax with `.intel_syntax` or compiler flags |
| Stripped symbols break debuggers | Linker removes them by default in release builds | Keep a separate debug build or use `objcopy --only-keep-debug` |

## 7. The textbook-precise statement
The C translation process is defined by ISO/IEC 9899:2018 §5.1.1 as a sequence of eight conceptual phases. Phases 1–3 constitute preprocessing, phase 4 produces the translation unit, phase 5 maps characters to the execution character set, phase 6 concatenates adjacent string literals, phase 7 performs compilation and assembly, and phase 8 performs linking. The resulting program image must satisfy the requirements of the relevant object-file format (ELF, COFF, Mach-O). See Harbison & Steele, *C: A Reference Manual*, 5e, §3.1–3.8 for the exact phase descriptions.

## 8. Visual — diagram or schematic
```text
source.c
   │
   ▼  cpp (phase 1-4)
source.i
   │
   ▼  cc1 (phase 7)
source.s
   │
   ▼  as
source.o  ───┐
             │
libc.a ──────┼──► ld (phase 8)
other.o ─────┘
   │
   ▼
a.out / executable
```

## 9. The memory technique

**The hook**  
Picture a medieval scribe (preprocessor) copying and expanding a manuscript, a translator (compiler) turning Latin into the local dialect, a typesetter (assembler) locking type into plates, and a bookbinder (linker) assembling multiple signatures into one volume.

**What to overlearn**  
1. Preprocessor output is still text.  
2. Each `.o` file is relocatable until the final link.  
3. Linker resolution order is left-to-right for archives.

**Spaced-repetition schedule**  
Review the four-stage pipeline at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
Re-derive the pipeline by asking: “What must be done to text before a CPU can execute it?” The answer yields preprocessing, translation to machine code, relocation, and symbol resolution in that order.

## 10. What this unlocks
Mastery of the compilation pipeline lets you read compiler diagnostics, control binary size and layout, and debug link-time errors that no amount of source-level reasoning can solve.

- Next: static vs dynamic linking and the GOT/PLT mechanism  
- Next: link-time optimisation (`-flto`) and whole-program analysis  
- Next: build systems (Make, CMake) that orchestrate these stages across thousands of files

## 11. Self-check — five questions, no answers
1. What single textual change in a header file can cause every translation unit that includes it to be recompiled even though no semantics changed?  
2. Why does the compiler emit a relocation entry for a function call but not for a `static` function defined in the same file?  
3. Given two object files both defining a strong symbol named `bar`, which definition survives and why?  
4. Construct a macro whose expansion produces different behaviour when compiled at `-O0` versus `-O2`.  
5. After running `gcc -c foo.c`, the resulting `foo.o` still contains the string “printf”. At which later stage does that string disappear, and under what condition?