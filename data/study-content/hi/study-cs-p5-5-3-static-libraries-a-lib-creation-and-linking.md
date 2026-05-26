## 1. The one-sentence answer

**A static library is an archive file (.a on Unix, .lib on Windows) that bundles multiple compiled object files so the linker can copy only the needed code into your final executable at build time.**

Static libraries solve the problem of code reuse without shipping separate files at runtime. When you compile source into .o files and then pack them with the archiver, the resulting .a file acts like a sealed box of pre-baked machine code. During the final link step the linker opens that box, extracts only the object files that satisfy unresolved symbols, and embeds their contents directly into the executable. This produces a self-contained binary whose size grows by the exact amount of code it actually uses.

The key mechanical difference from a shared library is that nothing is left behind for dynamic loading; everything required lives inside the executable from the moment the linker finishes.

> [!NOTE]
> The single most important insight is that the linker performs dead-code elimination at the granularity of entire object files inside the archive, not at the level of individual functions; therefore the way you group functions into .o files directly controls final binary size.

## 2. Why this matters — concrete and current

In the Linux kernel build system, thousands of device-driver object files are archived into per-subsystem .a files (for example drivers/net/ethernet.a) before the final vmlinux link; this lets the build avoid recompiling unchanged subsystems while still producing a single statically-linked kernel image used in embedded routers and spacecraft flight software.

Google’s internal monolithic C++ servers at scale link more than 100 000 object files; they keep frequently used utility code in large static libraries so that every new binary reuses the identical, already-tested machine code without paying repeated link-time cost for symbol resolution.

The Rust standard library for no-std targets (microcontrollers, WebAssembly) ships as a collection of .rlib static archives; the linker pulls in only the panic handler and allocator bits an application actually references, keeping firmware images under 10 KiB.

Semiconductor vendors such as STMicroelectronics distribute their HAL peripheral drivers exclusively as pre-built .a static libraries for Cortex-M cores; firmware engineers link these once at build time, guaranteeing that the exact same driver code is present in every production binary shipped on automotive ECUs.

Apple’s Metal shader compiler toolchain archives pre-compiled GPU kernel objects into static libraries so that an iOS app binary contains the GPU code directly, eliminating any runtime shader compilation step on the device.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Object file (.o / .obj)  | The atomic unit the archiver packs; you must know it contains machine code plus a symbol table. |
| Symbol table & relocation entries | The linker reads these to decide which object files to extract from the archive.     |
| Linker command line (ld / link.exe) | You must know the order of archives versus object files because it affects resolution. |
| Compilation model (compile vs link phases) | Static libraries are produced after compilation but before the final executable link. |

If any row above is unfamiliar, pause and read the corresponding section on object-file format and the linker before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Object files are the raw material
A compiler turns each .c file into one .o file that contains machine instructions plus a list of defined and undefined symbols.  
Example: compiling utils.c produces utils.o whose symbol table lists `int add(int,int)` as defined and `printf` as undefined.  
Formal statement: an object file \(O\) is a pair \((C, S)\) where \(C\) is the code section and \(S\) is the symbol table.  
> [!WARNING] If two functions that are never used together live in the same .o, the linker may still pull both into the final binary because extraction happens per object file.

### Step 2 — The archiver concatenates object files into an indexable container
The `ar` utility writes a header, then appends each .o file, and finally builds a symbol index mapping every defined symbol to its containing object file.  
Example: `ar rcs libmath.a add.o mul.o` creates libmath.a whose index records that `add` lives in add.o.  
Formal statement: a static library \(L\) is a sequence of object files together with an optional symbol map \(M: \text{symbol} \to \text{object index}\).

### Step 3 — The linker opens archives only when it has unresolved symbols
When the linker encounters an archive on the command line it scans the index, extracts every object file that resolves at least one currently unresolved symbol, and repeats until no new symbols appear.  
Example: if your main.o references `add`, the linker pulls add.o from libmath.a but ignores mul.o unless `mul` is also referenced.  
Formal statement: extraction is the fixed-point iteration \(U_{n+1} = U_n \cup \{o \in L \mid S(o) \cap U_n \neq \emptyset\}\) where \(U\) is the set of unresolved symbols.

### Step 4 — Order on the command line matters
Archives are processed left-to-right; an archive that appears too early may be ignored because the symbols it could satisfy have not yet been seen.  
Example: `gcc main.o -lmath utils.o` may fail to find symbols defined in utils.o that libmath.a needs.  
Formal statement: the linker’s archive list is a sequence processed in order; each archive is examined only once unless the `--start-group` / `--end-group` construct is used.

### Step 5 — All extracted code is copied verbatim into the executable
After extraction the linker performs relocation and writes the resulting code and data sections into the final ELF/PE binary; no archive metadata survives.  
Example: the size of the .text section in the executable grows by exactly the size of the extracted .o files.  
Formal statement: the final executable \(E\) satisfies \(E.\text{sections} = \bigcup_{o \in \text{extracted}} o.\text{sections}\).

### Step 6 — Static versus dynamic linkage is a build-time versus run-time decision
Because the code is already inside the executable, the runtime loader never opens the .a file; this eliminates runtime dependencies but increases binary size.  
Formal statement: for a static library the mapping from symbol to address is resolved entirely by the static linker.

## 5. Worked examples — har step show karo

**Example 1 — Minimal library creation**  
*Given:* two source files `add.c` and `mul.c` each containing one function.  
*Find:* produce `libmath.a` and link it with `main.c`.  
```
gcc -c add.c mul.c          # produces add.o mul.o
ar rcs libmath.a add.o mul.o
gcc main.c libmath.a -o prog
```
*Why* first line: separate compilation yields the object files the archiver needs.  
*Why* second line: `rcs` replaces/creates, adds, and builds the index.  
*Why* third line: the archive appears after the object that needs its symbols.  
**Final answer:** executable `prog` contains the machine code of `add` and `mul`.

*Reflection:* the example is simple yet demonstrates the exact three-phase pipeline (compile, archive, link) that every larger build follows.

**Example 2 — Selective extraction**  
*Given:* libmath.a contains add.o and mul.o; main.c calls only `add`.  
*Find:* size contribution of the library.  
After linking, `readelf -s prog` shows only the symbols from add.o.  
*Why* this works: the linker’s fixed-point extraction never saw a reference to `mul`, so mul.o stayed in the archive.  
**Final answer:** binary size increased by size of add.o only.

*Reflection:* grouping unrelated functions into separate .o files is the only way to obtain function-granularity dead-code elimination with static archives.

**Example 3 — Wrong archive order**  
*Given:* `gcc main.o -lmath helper.o` where helper.o defines a symbol required by code inside libmath.a.  
*Find:* link error.  
The linker processes libmath.a before helper.o is seen, so the needed symbol is never resolved.  
**Final answer:** undefined reference.  

*Reflection:* archive placement after every object that could generate new unresolved symbols is mandatory.

**Example 4 — Using ranlib explicitly**  
*Given:* an archive created without the `s` option.  
*Find:* restore the symbol index.  
```
ar rc libmath.a add.o mul.o
ranlib libmath.a
```
*Why* ranlib: it writes the index table that older linkers rely on for fast lookup.  
**Final answer:** libmath.a now contains a valid `__.SYMDEF` member.

*Reflection:* modern `ar rcs` hides this step, but understanding the index clarifies why linking speed improves dramatically once the index exists.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Putting every function in its own .c file | Each .o becomes an archive member; link time explodes | Group related functions that are usually used together |
| Archive appears before the objects that need it | Linker scans archive only once                    | Place `-l` options after all user .o files           |
| Forgetting `ranlib` on very old toolchains | Index missing; slow or failed symbol lookup         | Always use `ar rcs` or run `ranlib` afterwards       |
| Assuming static library shrinks binary    | All referenced object files are copied verbatim     | Measure with `size` before/after; remove unused code at source level |
| Mixing .a and .so of same name on command line | Linker silently chooses one based on order          | Be explicit: use `-l:libfoo.a` when you need static  |
| Circular dependencies between archives    | Fixed-point extraction terminates too early         | Merge the archives or use `--start-group`            |
| Debug symbols missing from final binary   | Original .o files were compiled without `-g`        | Recompile object files with debug flags before archiving |

## 7. The textbook-precise statement

A static library is an archive file conforming to the ar(1) format whose members are relocatable object files. The linker, when presented with such an archive after a set of object files on its command line, repeatedly extracts members whose symbol tables contain definitions for symbols that remain unresolved, until a fixed point is reached. Extraction is performed at member granularity; the resulting code and data sections are then relocated and emitted into the output executable exactly as if those members had been named individually. (See IEEE Std 1003.1-2017, ar — create and maintain library archives; also GNU ld manual §3.3 “Archive Files”.)

## 8. Visual — diagram or schematic

```text
main.o          libmath.a
+-----------+   +-----------------------------+
| U: add    |   | index: add -> add.o         |
| D: main   |   |         mul -> mul.o        |
+-----------+   | member: add.o  (code+syms)  |
                | member: mul.o  (code+syms)  |
                +-----------------------------+
                      |
                      v   (linker extracts only add.o)
                +-----------+
                | final exe |
                | contains  |
                | main+add  |
                +-----------+
```

## 9. The memory technique

**The hook**  
Picture a glass jar labelled “.a” sitting on the linker’s workbench; every time the linker finds a missing puzzle piece (symbol) it reaches into the jar, pulls out the exact object-file shard that contains that piece, and glues it into the growing executable picture.

**What to overlearn**  
- Command: `ar rcs libname.a *.o`  
- Link order rule: user objects first, archives last  
- Extraction granularity: whole .o files, never individual functions

**Spaced-repetition schedule**  
Review the three commands and the order rule after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget the command, remember the pipeline: compile → archive members → linker fixed-point extraction → relocation into executable.

## 10. What this unlocks

Understanding static archives is the foundation for reading any build-system recipe (Make, CMake, Bazel) that produces or consumes `.a` files, and it directly precedes the study of shared libraries, position-independent code, and link-time optimization.

- Next: dynamic linking and `.so`/`.dll` creation  
- Next: whole-program link-time optimization (`-flto`)  
- Next: thin archives and LLVM bitcode archives  
- Next: static linking in cross-compilation toolchains for embedded targets

## 11. Self-check — five questions, no answers

1. Why does changing the grouping of functions among .c files change the final executable size even when the same functions are referenced?  
2. Write the exact sequence of commands to turn `foo.c` and `bar.c` into `libfb.a` and link it with `main.c` so that only referenced object files are pulled in.  
3. What single linker flag or command-line rearrangement would you try first when you see “undefined reference” but you are certain the symbol exists inside a listed archive?  
4. A 500 KiB static library increases your binary by only 30 KiB. Explain the mechanism and the condition under which this occurs.  
5. In a circular dependency between `libA.a` and `libB.a`, which two linker options allow successful resolution, and what performance cost do they introduce?