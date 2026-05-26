## 1. The one-sentence answer
**A static library is an archive that bundles multiple relocatable object files into one file so the linker can copy their machine code directly into a final executable at link time.**

Object files produced by a compiler contain compiled functions and data but remain separate units. An archiver concatenates them into a single .a (Unix) or .lib (Windows) file while preserving symbol tables and relocation information. When a program references a symbol inside the archive, the linker extracts only the needed object modules and embeds their code and data into the executable image.

This produces a self-contained binary that no longer depends on the original object files or the library archive after linking completes. The resulting executable carries every referenced routine from the static library inside its own address space.

> [!NOTE]
> The decisive property is that the library’s code is duplicated into every consumer at build time, trading larger binaries for zero runtime lookup cost and full independence from external files.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover is built with a static-link-only policy so the final binary contains every required routine; no dynamic loader exists on the radiation-hardened processor.

The Linux kernel’s built-in compression routines and early boot code are extracted from static archives (libgcc.a, libzstd.a) during vmlinux construction, guaranteeing that decompression logic is present before any userspace shared objects are available.

Apple’s Metal Performance Shaders framework ships selected math kernels as static libraries for iOS apps; the App Store review process can verify the exact instruction sequences that will execute on-device.

High-frequency trading firms such as Jane Street compile their OCaml and C++ order-matching engines against static versions of numeric libraries so the production binary contains no unresolved symbols that could be hijacked by a malicious shared object at runtime.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Relocatable object file (.o/.obj) | Supplies the raw machine code and symbol table the archiver will package |
| Symbol resolution    | Determines which modules the linker must extract from the archive |
| Linker command line  | Controls archive search order and duplicate-symbol handling |

## 4. Building the idea — from intuition to formalism

### Step 1 — Object files are independent translation units
A compiler emits one relocatable object file per source file; each file contains its own code and data sections plus a symbol table listing defined and referenced names.

Example: compiling `math.c` and `io.c` produces `math.o` and `io.o`. Neither file yet knows the final load addresses of the other.

Formal statement: an object file \(O\) is a tuple \((S, T, R)\) where \(S\) is the symbol table, \(T\) the section table, and \(R\) the relocation table.

> [!WARNING]
> Treating two object files as already merged will hide duplicate-symbol errors that only appear at final link time.

### Step 2 — An archive collects object files without merging them
The archiver simply concatenates whole object files and records an index of the symbols each defines.

Command: `ar rcs libmath.a math.o io.o` writes a new file whose member list is the two object files plus a symbol index.

Formal statement: a static library \(L\) is a sequence of object-file members plus a global symbol index \(I: \text{name} \mapsto \text{member}\).

### Step 3 — The linker treats the archive as a reservoir of candidates
When the linker encounters an unresolved symbol, it consults the archive index, extracts the corresponding member, and adds that member’s symbols to the set of defined names.

Extraction occurs only for referenced members; unreferenced code is omitted.

### Step 4 — Extraction is performed once per archive scan
Most linkers perform a single left-to-right pass over the command line. An archive listed before the objects that need it will not be re-scanned.

### Step 5 — The final executable contains copied sections
After extraction, the linker merges all selected sections, applies relocations, and writes a single executable whose text and data segments now contain the copied library code.

Textbook result: the executable is closed under static resolution; its external-symbol table is empty for every symbol supplied by the archives that were searched.

## 5. Worked examples — every step shown

**Example 1 — Minimal archive creation**
- *Given:* source files `add.c` (defines `add`) and `mul.c` (defines `mul`).
- *Find:* command sequence that produces `libarith.a`.
```
gcc -c add.c mul.c          # produces add.o, mul.o
ar rcs libarith.a add.o mul.o
```
*Why* the first line: each .c must become a separate .o before archiving.  
*Why* the second line: `rcs` replaces/creates the archive and builds the index.  
**`libarith.a` now contains both object files.**

*Reflection:* the archive size is essentially the sum of its members; no deduplication occurs.

**Example 2 — Linking an executable against the archive**
- *Given:* `main.c` calls `add`.
- *Find:* final link command.
```
gcc -c main.c
gcc main.o libarith.a -o prog
```
*Why* `main.o` precedes the archive: the linker must see the undefined symbol `add` before it consults the archive index.  
**`prog` contains the machine code of `add` copied from `libarith.a`.**

*Reflection:* order on the command line encodes dependency direction.

**Example 3 — Selective extraction**
- *Given:* `libarith.a` also contains an unused `div.o`.
- *Find:* size of `prog` after linking only `main.o` against the archive.
Only `add.o` is extracted; `div.o` remains inside the archive and does not appear in `prog`.

*Reflection:* dead-code elimination at link time is automatic for static libraries.

**Example 4 — Duplicate symbol across archive and object**
- *Given:* `main.o` defines its own `add` and also references the archive’s `add`.
- *Find:* linker behaviour.
The linker uses the first definition encountered; the archive’s `add` is ignored.

*Reflection:* static libraries do not provide “strong” override semantics; explicit object files always win.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Archive listed before the objects that need it | Single-pass linkers do not revisit earlier archives | Place archives after the objects that reference them |
| Forgetting to run `ranlib` on hand-built archives | Some older linkers rely on an explicit symbol index | Always run `ranlib lib.a` or use `ar s` |
| Including the same archive twice to “fix” order | Creates duplicate-symbol errors on second extraction | Re-order the command line instead |
| Expecting unreferenced code to be removed when whole-archive linking is enabled | `--whole-archive` forces every member in | Use only when every member is genuinely required |
| Mixing .a and .so files with the same base name | Linker may silently choose the shared object | Explicitly write `libfoo.a` or use `-l:libfoo.a` |
| Windows .lib files that are import libraries instead of static | Same extension used for two different formats | Inspect file header or use `dumpbin /headers` |
| Assuming C++ name mangling is preserved across compilers | Different compilers produce incompatible mangled names | Compile the entire static library and its consumers with the same toolchain |

## 7. The textbook-precise statement
A static library is a file \(L\) whose format is an archive of ELF (or COFF) object files together with a symbol index. The linker’s archive-resolution algorithm, given a set of unresolved symbols \(U\) and a library \(L\), repeatedly selects a member \(M \in L\) such that \(M\) defines at least one symbol in \(U\), adds \(M\) to the set of included modules, removes the symbols defined by \(M\) from \(U\), and repeats until a fixed point. The process is defined in IEEE Std 1003.1-2017 (POSIX) under the description of `ar` and in Microsoft’s PE/COFF specification §8 for `.lib` files. (See also: Levine, *Linkers and Loaders*, 2000, §5.3.)

## 8. Visual — diagram or schematic
```text
main.o          libarith.a
+---------+     +---------------------+
| U: add  |     | Member add.o        |
| D: main |     |   D: add            |
+---------+     | Member mul.o        |
                |   D: mul            |
                +---------------------+
                      |
                      v
                Linker extracts only add.o
                      |
                      v
                prog (executable)
                +---------------------+
                | main code + add code|
                +---------------------+
```
The diagram shows that only the referenced member travels from the archive into the final executable.

## 9. The memory technique
1. **The hook** — picture a librarian who tears pages out of books and glues them into your notebook only when you ask for a fact; the notebook grows, the library stays intact.
2. **What to overlearn** — `ar rcs libname.a *.o`, the single-pass left-to-right archive search rule, and the fact that code is copied, not referenced.
3. **Spaced-repetition schedule** — review the archive-creation command after 1 day, the linker ordering rule after 3 days, the extraction semantics after 7 days, the Windows .lib distinction after 16 days, and the entire section after 35 days.
4. **First-principles fallback** — rebuild the mental model by starting from a lone .o file, asking what must be added to let the linker locate symbols without scanning every file again, then arriving at the indexed archive.

## 10. What this unlocks
Mastery of static libraries lets you control binary size, eliminate runtime dependencies, and satisfy air-gapped or embedded deployment constraints. It is the direct prerequisite for understanding dynamic libraries, link-time optimisation (LTO), whole-archive semantics, and the construction of language runtime libraries such as `libc.a`.

- Next: dynamic linking and position-independent code
- Next: link-time optimisation and section garbage collection
- Next: building redistributable SDKs with both .a and .so variants

## 11. Self-check — five questions, no answers
1. Write the exact `ar` command that creates `libvec.a` from `vec.o` and `mat.o` while replacing any existing archive of the same name.
2. A program links `main.o` against `libmath.a` then against `libio.a`. If `main.o` references a symbol defined in both archives, which definition is taken?
3. Explain why placing `-lm` before `main.o` on the GCC command line can produce an “undefined reference” error even though the math library contains the needed symbol.
4. On Windows, how can you distinguish a static `.lib` from an import `.lib` without examining the files that were used to build them?
5. A static library contains 200 object files, only three of which are referenced. After linking, how many of those 200 object files appear in the final executable, and why?