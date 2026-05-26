## 1. The one-sentence answer
**Dynamic (shared) libraries are separately compiled modules of machine code that an executable discovers and binds to only when the program starts or on explicit request, rather than embedding copies at build time.**

Static linking copies every referenced function into the final binary at link time. Dynamic linking instead records only a list of needed symbols and a reference to an external file; the operating-system loader maps that file into the process address space and patches the call sites before the first instruction runs. Because the same physical pages can be shared across many processes, memory and disk usage drop sharply once more than one program uses the same library. Position-independent code removes any absolute addresses from the library itself, so the loader can map the identical file at a different virtual address in every process without rewriting the file on disk.

The decisive engineering consequence is that a bug fix or performance improvement inside a shared library is visible to every program that uses it the moment the library is replaced—no recompilation of the clients is required.

> [!NOTE]
> The single deepest insight is that the loader, not the compiler, performs the final relocation; therefore every symbol reference that crosses a library boundary must be expressed in a form the loader can still adjust at runtime.

## 2. Why this matters — concrete and current
The Linux C library (glibc) is delivered exclusively as shared objects (`libc.so.6`). Every dynamically linked binary on a typical distribution therefore shares a single copy of the standard-library implementation in both RAM and on disk; the same binary image is mapped read-only into thousands of processes simultaneously.

Modern game engines (Unreal, Unity) ship the bulk of their runtime as DLLs on Windows and `.so` files on Linux. This design lets studios push hot-fix patches to rendering or physics code without redistributing gigabytes of executable data and without requiring players to reinstall the entire title.

High-performance linear-algebra kernels such as OpenBLAS and Intel MKL are distributed as shared libraries precisely so that a single optimized binary can serve NumPy, MATLAB, and compiled Fortran programs at the same time; the choice of which implementation to load can even be changed at runtime via `LD_PRELOAD` or the `MKL_DYNAMIC` environment variable.

Browser sandboxing and plugin architectures (Chromium’s Pepper, Adobe Acrobat plug-ins) rely on dynamic loading of `.dll`/`.so` modules into a restricted address space; the loader’s ability to map the same file at an arbitrary base address is what makes address-space layout randomization (ASLR) effective against return-oriented-programming attacks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Object files and symbol tables | The linker must know which symbols are defined inside a library versus which must be supplied later. |
| Virtual memory and page mapping | The loader uses the MMU to place the same physical pages at different virtual addresses in different processes. |
| Relocation records       | Dynamic linking is simply deferred relocation performed by the loader instead of the static linker. |
| Calling convention and ABI | The library and its clients must agree on stack layout and register usage or the call will corrupt state at runtime. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Static linking copies everything
When you invoke the linker with a static archive, every referenced `.o` file is copied verbatim into the output executable. The resulting binary contains complete copies of every function it will ever call.

Example: `gcc main.o -lmath -static` produces an executable whose text segment already contains the entire implementation of `sin`, `cos`, etc.

Formally the link-time operation is a simple concatenation plus symbol substitution:
$$
\text{Exec} = \text{main.o} \oplus \text{libmath.a}
$$
where \(\oplus\) denotes symbol resolution and relocation.

> [!WARNING]
> If two programs both statically link the same 2 MiB library, the system holds two identical 2 MiB copies in RAM; any security patch requires rebuilding every program.

### Step 2 — Shared objects remain separate files
A shared object (`.so` or `.dll`) is an ELF (or PE) file whose sections are marked `SHF_ALLOC|SHF_EXECINSTR` but are not yet bound to any particular base address. The static linker records only the *name* of the needed library and the symbols it expects to import.

### Step 3 — The loader performs the final mapping
At process start the kernel maps the executable, then the dynamic linker (`ld-linux.so.2` or `ntdll.dll`) reads the `DT_NEEDED` entries, opens each shared object, maps its segments, and writes the concrete addresses into the Global Offset Table (GOT) and Procedure Linkage Table (PLT).

### Step 4 — PIC removes absolute addresses from the library
Position-independent code never embeds a fixed virtual address. Function calls go through the PLT; data references go through the GOT. Both tables are writable per process, so each process can hold its own resolved addresses while the underlying code pages remain shared and read-only.

### Step 5 — Symbol resolution can be lazy
The first call to a function whose PLT entry is still zero triggers a trampoline into the resolver. The resolver writes the real address into the GOT and jumps there; subsequent calls incur only the cost of an indirect jump.

### Step 6 — The textbook formulation
A shared library compiled with `-fPIC` is a position-independent ELF object whose dynamic symbol table and relocation sections allow the runtime loader to bind it at an arbitrary base address without modifying the library file itself.

## 5. Worked examples — every step shown

**Example 1 — Minimal shared library**
*Given:* source file `lib.c` containing `int add(int a,int b){return a+b;}`  
*Find:* commands to produce `libadd.so` and a client that uses it at runtime.  
Compile:
```
gcc -fPIC -c lib.c -o lib.o
```
*Why:* `-fPIC` emits code that references symbols only through the GOT/PLT.  
Link:
```
gcc -shared -o libadd.so lib.o
```
*Why:* the `-shared` flag tells the linker to produce a dynamic shared object rather than an executable.  
Client:
```
gcc main.c -L. -ladd -Wl,-rpath,. -o main
```
*Why:* `-rpath` embeds a search path so the loader finds `libadd.so` at runtime.  
**Final answer:** `main` runs and calls the version of `add` that lives in `libadd.so`.

*Reflection:* The only non-obvious step is the `-rpath` linker option; omitting it forces the user to set `LD_LIBRARY_PATH`.

**Example 2 — Inspecting the PLT/GOT**
*Given:* the binary from Example 1.  
*Find:* the address of the first PLT stub.  
Run:
```
readelf -S main | grep plt
```
*Why:* reveals the `.plt` and `.got.plt` sections.  
Disassemble:
```
objdump -d -j .plt main
```
*Why:* shows the indirect jump through the GOT slot that the resolver will later patch.

**Example 3 — dlopen at runtime**
*Given:* `libadd.so` already built.  
*Find:* code that loads the library on demand.  
```
void *h = dlopen("./libadd.so", RTLD_LAZY);
int (*f)(int,int) = dlsym(h, "add");
```
*Why:* `RTLD_LAZY` defers resolution until the first call, exactly as the PLT mechanism does.

**Example 4 — Non-PIC failure**
*Given:* same source compiled without `-fPIC`.  
*Find:* what the loader reports.  
Attempting to link with `-shared` produces the warning “relocation R_X86_64_32 against … can not be used when making a shared object”. The loader would have to rewrite the text segment at every mapping, destroying sharing.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting `-fPIC` on a library | Absolute relocations remain in the object file | Always pass `-fPIC` (or `-fPIE` for executables) when the target is a shared object |
| Hard-coded `LD_LIBRARY_PATH` in production | Breaks when the same binary is installed system-wide | Use `rpath` with `$ORIGIN` or install libraries in standard paths |
| Circular dependencies between libraries | The loader cannot decide initialization order | Break cycles by introducing a thin “core” library or using explicit `dlopen` ordering |
| Missing `DT_RUNPATH` on setuid binaries | The loader silently ignores `LD_LIBRARY_PATH` for security | Rely on `rpath` recorded at link time |
| Exporting every symbol by default | Increases attack surface and slows startup | Use version scripts or `__attribute__((visibility("hidden")))` |
| Mixing C and C++ ABIs across library boundaries | Name mangling and exception handling differ | Explicitly declare `extern "C"` for the public API |
| Static linking a library that itself depends on a shared object | Produces duplicate copies of the shared object’s globals | Never mix static and dynamic versions of the same library |

## 7. The textbook-precise statement
A position-independent shared object is an ELF file whose segments contain only `R_X86_64_RELATIVE`, `R_X86_64_GLOB_DAT` and `R_X86_64_JUMP_SLOT` relocations (or their architecture equivalents). The dynamic linker, whose entry point is recorded in the `PT_INTERP` segment of the executable, maps each `DT_NEEDED` library at an arbitrary base address `B`, applies the relocations relative to `B`, and transfers control to the executable’s entry point. (Levine, *Linkers and Loaders*, 2000, §8.3; `ELF-64` specification v1.5, §3.3.)

## 8. Visual — diagram or schematic
```text
Process address space
0x00007f00_00000000  ┌────────────────────┐
                     │  libc.so.6 (text)  │  ← mapped read-only, shared
                     │  (PIC, base 0)     │
0x00007f00_0023a000  ├────────────────────┤
                     │  libc.so.6 (GOT)   │  ← private, per-process
                     └────────────────────┘
0x00005555_40000000  ┌────────────────────┐
                     │  myprog (text)     │
                     │  PLT stubs         │
0x00005555_40001200  │  GOT entries       │  ← patched by loader
                     └────────────────────┘
```
The same `libc.so.6` file is mapped at different base addresses in different processes; only the GOT/PLT pages are private.

## 9. The memory technique
1. **The hook** — picture the shared library as a transparent stamp that the loader can press anywhere on the page; the stamp itself never changes, only the ink (the GOT) left on each process’s desk.
2. **What to overlearn** — the three flags that must appear together: `-fPIC`, `-shared`, and an `rpath` containing `$ORIGIN`.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from the observation that absolute addresses break sharing; derive the necessity of an indirection table (GOT/PLT) and the requirement that the compiler emit only relative or register-based addressing.

## 10. What this unlocks
Mastery of dynamic libraries is the prerequisite for understanding plugin systems, hot-code reloading, ABI versioning, and the implementation of just-in-time compilers that emit code into shared memory regions.

- Next: symbol versioning (`.symver`, `DT_VERSYM`)
- Next: lazy binding and `LD_DEBUG`
- Next: building language runtimes that expose C ABI shared objects (CPython extensions, Rust `cdylib`)

## 11. Self-check — five questions, no answers
1. Why does a non-PIC shared library force the loader to make the text segment writable?
2. In a core dump of a running process, how can you distinguish a PLT-resolved call from a direct call inside the same binary?
3. What single linker flag guarantees that a library can be placed at a randomized address by ASLR without breaking any internal references?
4. A program links against `libfoo.so.1` at build time yet the running system only supplies `libfoo.so.2`. Which mechanism decides whether the program is allowed to start, and where is that decision recorded?
5. Construct the shortest sequence of commands that produces a shared library exporting only the symbol `compute` while hiding every helper function defined in the same translation unit.