## 1. The one-sentence answer

**Object files (.o or .obj) are the compiler’s intermediate product: machine code plus metadata that records every symbol the file defines and every location that still needs its final address.**

When you run `gcc -c foo.c`, the compiler turns C into assembly, assembles it into binary instructions, and packages the result with two critical tables: the **symbol table** (names, sizes, and binding of functions and variables) and the **relocation entries** (offsets inside the code or data that the linker must patch once it knows the final addresses). Without these tables the linker would have no idea how to combine multiple `.o` files into an executable.

The symbol table answers “what does this file expose and what does it still need?” while relocation entries answer “where exactly must the addresses be written later?” Together they let the build system keep compilation units independent until the final link step.

> [!NOTE]
> The deepest insight is that an object file is deliberately incomplete: it contains correct machine instructions whose numeric addresses are still placeholders, allowing the same `.o` file to be placed at any load address without recompilation.

## 2. Why this matters — concrete and current

In the Linux kernel build system, thousands of `.o` files are produced from individual subsystems (scheduler, networking, drivers). The final `vmlinux` link step uses relocation entries to stitch every function call across subsystems into a single contiguous address space; a single incorrect relocation produces a non-bootable kernel that has shipped in early release candidates.

LLVM-based toolchains inside Apple’s Xcode produce `.o` files for every Swift or C++ translation unit in an iOS app. The subsequent `ld` invocation resolves relocation entries for both the app binary and the dynamic linker cache, directly affecting launch time and binary size of every App Store submission.

NVIDIA’s CUDA compiler (`nvcc`) emits device `.o` files containing GPU symbols and relocation records. These records are later consumed by the CUDA fatbinary linker to place kernels at the correct offsets inside the ELF sections that the driver loads onto the GPU.

Google’s Bazel build system caches every `.o` file produced by a C++ target. Because the symbol table and relocation entries are deterministic for a given set of inputs, Bazel can safely reuse the cached object file across machines without re-running the compiler, cutting build times for the entire Chrome codebase by more than half.

In safety-critical automotive software compiled with Green Hills or IAR toolchains, relocation entries are statically validated against memory maps required by ISO 26262. Any unresolved relocation at link time becomes a compile-time error rather than a runtime crash.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| ELF / COFF file format   | Object files are stored inside these container formats; you must know section headers to locate symbol tables and relocation sections. |
| Assembler and linker roles | The compiler emits assembly; the assembler creates the `.o`; the linker consumes it—understanding the hand-off clarifies why relocation is deferred. |
| Symbol binding (global, local, weak) | Determines whether a symbol must be resolved by the linker or may be overridden later. |
| Virtual memory and load addresses | Relocation entries exist because the final load address is unknown at compile time. |

If any row above is unfamiliar, pause and read the corresponding section on ELF sections and the classic three-stage compiler pipeline before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — From source to raw machine code
A compiler first emits instructions that assume the current translation unit lives at address zero. The resulting bytes are correct except for any address that refers outside the current unit.

Example: the call `bar()` inside `foo.c` becomes the opcode `e8 00 00 00 00` (relative call to offset 0).  
Formal statement: the assembler produces a byte stream \( B \) together with a list of offsets \( R = \{r_1, r_2, \dots\} \) that must later be overwritten.  
> [!WARNING] Treating the zero offset as “already resolved” will produce a call that always targets address zero, crashing the program at runtime.

### Step 2 — Recording defined symbols
Every function or global variable that the file exports is entered into the symbol table with its offset inside the code or data section, its size, and its binding.

Example: `int global_x = 42;` yields a symbol `global_x` at section `.data+0x0`, size 4, binding `GLOBAL`.  
Formal: symbol table \( S = \{(name, section, value, size, binding)\} \).

### Step 3 — Recording undefined symbols
Symbols referenced but not defined inside the file are also recorded, marked `UNDEFINED`. The linker will search other object files for matching definitions.

Example: the call to `bar()` adds an undefined symbol `bar` of type `FUNC`.

### Step 4 — Creating relocation entries
For each instruction or datum whose final address depends on the link-time layout, the assembler emits a relocation entry containing the offset inside the section, the symbol it refers to, and the relocation type (absolute, PC-relative, etc.).

Formal: relocation entry \( r = (offset, symbol, type, addend) \).

### Step 5 — Linker applies relocations
The linker assigns each input section a final virtual address, looks up every symbol’s final address, then walks the relocation list and patches the bytes according to the relocation type and addend.

Formal: for each \( r \), compute \( A = address(symbol) + addend \), then write \( A \) into \( B[offset] \) using the encoding required by \( type \).

### Step 6 — Resulting executable sections
After all relocations are applied, the output file contains fully resolved machine code and data with no remaining relocation entries (except those intentionally left for dynamic linking).

## 5. Worked examples — har step show karo

**Example 1 — Single relocation for a function call**  
*Given:* `foo.c` contains `void foo() { bar(); }` compiled with `gcc -c -O0`.  
*Find:* relocation entry produced by the assembler.  
Step 1: compiler emits `call bar` → `e8 00 00 00 00`.  
Step 2: assembler records symbol `bar` as undefined.  
Step 3: relocation entry written at offset 1 inside `.text`, type `R_X86_64_PC32`, symbol `bar`, addend `-4`.  
*Why* each move: the `-4` compensates for the fact that the relocation offset points after the opcode byte.  
**Final answer**  
`Relocation {offset:1, sym:bar, type:R_X86_64_PC32, addend:-4}`

*Reflection:* The addend adjustment is a common source of off-by-one errors when students implement their own linker.

**Example 2 — Absolute data reference**  
*Given:* `extern int g; int* p = &g;`  
*Find:* relocation type and how the linker resolves it.  
The compiler emits an 8-byte pointer initialised to zero.  
Relocation: `R_X86_64_64` at offset 0 inside `.data`, symbol `g`, addend `0`.  
Linker replaces the eight zero bytes with the final address of `g`.  
**Final answer**  
Pointer bytes become the little-endian encoding of `&g`.

*Reflection:* Absolute relocations produce position-dependent code; they are the reason PIE (position-independent executable) requires different relocation types.

**Example 3 — Multiple files, multiple symbols**  
*Given:* `a.o` defines `foo`, references `bar`; `b.o` defines `bar`, references `foo`.  
*Find:* final addresses after linking at base `0x400000`.  
Linker places `.text` of `a.o` at `0x400000`, `.text` of `b.o` at `0x400010` (example sizes).  
Each relocation is patched using the newly assigned addresses.  
**Final answer**  
`call bar` inside `a.o` is patched to `e8 0a 00 00 00`.

*Reflection:* The order of object files on the linker command line determines section placement and therefore the numeric values written by relocation.

**Example 4 — Weak symbol override**  
*Given:* `a.o` defines weak symbol `debug_log`; `b.o` defines strong symbol `debug_log`.  
*Find:* which definition survives.  
Linker prefers the strong symbol when applying relocations that refer to `debug_log`.  
**Final answer**  
All relocation sites receive the address of the strong definition from `b.o`.

*Reflection:* Weak symbols allow libraries to supply default implementations that user code can silently replace without changing any source.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting `-fPIC`                | Students compile shared-library code without it     | Always pass `-fPIC` when building `.so` targets      |
| Treating relocation offset as absolute address | Misreading ELF relocation sections                  | Remember offset is relative to the section start     |
| Ignoring addend field             | Documentation often hides the addend in diagrams    | Always print `readelf -r` output and verify addend   |
| Duplicate strong symbols          | Multiple `.o` files define the same global          | Use `nm --defined-only` before linking               |
| Mixing 32-bit and 64-bit relocations | Toolchain defaults differ across platforms          | Explicitly set `-m32` or `-m64` consistently         |
| Assuming every symbol must be resolved at static link time | Dynamic libraries defer resolution                  | Distinguish `R_*_JUMP_SLOT` from static relocations  |
| Overwriting the wrong section     | Relocation offset applied to `.text` instead of `.data` | Double-check section index stored in relocation entry |

## 7. The textbook-precise statement

In “Computer Systems: A Programmer’s Perspective,” 3e, §7.4, Bryant & O’Hallaron define an object file as “a byte sequence that encodes machine code and data together with symbol and relocation information sufficient for the linker to combine it with other object files.” Formally, an ELF relocatable object file contains a symbol table `.symtab` whose entries are tuples `(name, value, size, type, binding, section)` and a relocation section `.rela.text` whose entries are tuples `(offset, symbol, type, addend)`. The linker assigns each input section a final address \( A_s \), computes each symbol’s final address \( A_{sym} = A_s + value \), then for every relocation entry writes the value \( A_{sym} + addend \) into the target section at the given offset using the encoding dictated by the relocation type.

## 8. Visual — diagram or schematic

```text
foo.o
+-------------+  .text section
| 0x00: push %rbp          |
| 0x01: call bar   <------ relocation at 0x02 (R_X86_64_PC32, bar, -4)
| ...                    |
+-------------+
Symbol table
  bar  UND  FUNC
  foo  .text  FUNC   value=0
Relocation table
  offset=0x02  sym=bar  type=PC32  addend=-4
```

## 9. The memory technique

1. **The hook** — Picture a half-assembled Lego spaceship: the hull pieces (machine code) are already snapped together, but the engine pods still have empty sockets labelled “attach engine here” (relocation entries) and an inventory list of which engines belong where (symbol table).

2. **What to overlearn** — Relocation entry = (offset, symbol, type, addend); symbol table entry always contains binding and section index.

3. **Spaced-repetition schedule** — Review the four-field relocation tuple after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback** — If you forget the fields, rebuild from the question “What four pieces of information does the linker need to patch a single instruction?”

## 10. What this unlocks

Understanding object files lets you reason about link-time optimisation, whole-program analysis, and dynamic loading.  

- Link-time optimisation (LTO) works by preserving an intermediate representation alongside the usual symbol and relocation data.  
- Dynamic shared objects (.so) keep relocation entries of type `R_*_JUMP_SLOT` for lazy binding.  
- Position-independent code (PIC) changes the relocation types emitted by the assembler.  
- Stripping debug symbols removes `.symtab` but never the relocation sections required for correctness.

## 11. Self-check — five questions, no answers

1. What single field in a relocation entry tells the linker whether to perform PC-relative or absolute patching?  
2. Why does an object file compiled without `-fPIC` contain relocation entries that prevent it from being loaded at an arbitrary address?  
3. If two strong symbols of the same name appear in different `.o` files, which rule decides which address the linker writes into every referencing relocation site?  
4. Given `readelf -r` output showing a relocation of type `R_X86_64_32S` against an undefined symbol, what will happen at link time if that symbol is never defined?  
5. How does the presence of a weak symbol in the symbol table change the linker’s behaviour compared with a global symbol when multiple definitions exist?