## 1. The one-sentence answer
**Dynamic/shared libraries let multiple programs share the same compiled code at runtime through dynamic linking, with Position Independent Code (PIC) ensuring the library can load at any memory address without relocation.**

Dynamic linking happens when the operating system loader maps a `.so` (Linux) or `.dll` (Windows) file into a process’s address space only when the program actually runs. The linker records only the names of required symbols at build time; the real addresses are resolved by the dynamic linker (`ld-linux.so` or `ntdll.dll`) at load time. PIC removes absolute address references from the generated machine code so the same physical pages of the library can be shared across dozens of processes.

This design saves RAM and allows security updates to a library without recompiling every dependent binary. The cost is a small per-call overhead from the Procedure Linkage Table (PLT) and Global Offset Table (GOT) indirections.

> [!NOTE]
> The single deepest insight is that PIC turns every memory reference that would have been absolute into an offset from the instruction pointer or a table entry, letting the kernel map one copy of the library text segment at different virtual addresses for every process.

## 2. Why this matters — concrete and current
In the Linux kernel build system, every loadable kernel module (`.ko`) is compiled as PIC and linked against `vmlinux` symbols so that the same module binary works on systems with different KASLR offsets.  
CUDA’s `libcudart.so` is dynamically linked by PyTorch and TensorFlow; when NVIDIA releases a new driver, existing Python wheels continue to work because only the shared library is replaced.  
Chromium’s sandbox uses separate `.so` files for each renderer process; PIC lets the same code pages be mapped read-only and executable across thousands of sandboxed processes, directly reducing per-tab memory.  
Android’s ART runtime loads every app’s native libraries through `libart.so` and the linker namespace mechanism; without PIC the system could not share the zygote’s pre-linked address space across all apps.  
High-energy physics experiments at CERN (ROOT framework) ship analysis code as shared libraries that physicists load into ROOT sessions years after the original build; dynamic linking guarantees that a single updated `libMathCore.so` fixes numerical routines for every analysis binary.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Virtual memory & paging  | Explains why one physical copy of a library text can appear at different addresses   |
| ELF file format          | Contains `.dynsym`, `.rela.dyn`, `.got` and `.plt` sections that the dynamic linker reads |
| Relocation entries       | The mechanism that records which addresses must be patched at load time              |
| Symbol resolution        | Distinguishes between compile-time symbols and runtime addresses                     |
| Compiler driver flags    | `-fPIC`, `-shared`, `-Wl,-soname` control whether code is position-independent       |

If any row above is unfamiliar, pause and read the corresponding section on virtual memory and ELF before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Absolute versus relative addressing
When code is compiled without PIC, the assembler emits instructions that contain the final virtual address of data or functions. At load time the dynamic linker must rewrite every such instruction—an operation impossible when the same text pages are shared read-only across processes.

Example: the instruction `mov rax, [0x402010]` hard-codes the address of a global variable.  
Formal statement: an absolute reference is any instruction encoding an address \(A\) such that the correct value after loading at base \(B\) is \(A + B\).

> [!WARNING]
> If you forget to pass `-fPIC`, the linker will still produce a shared object but every process that loads it will receive its own private copy of the text segment, destroying sharing.

### Step 2 — Introducing the Global Offset Table (GOT)
PIC replaces every absolute data reference with an indirect load through a per-process table called the GOT. The compiler emits `mov rax, [rip + offset_to_GOT_entry]`; only the GOT entry itself is written by the dynamic linker.

### Step 3 — The Procedure Linkage Table (PLT) for functions
Function calls are routed through a small stub in the PLT. The first call jumps to the dynamic linker, which resolves the real address, writes it into the corresponding GOT slot, and thereafter all calls go directly to the resolved function.

### Step 4 — Position-independent code generation rules
Any instruction that would produce an absolute address is replaced by an IP-relative or GOT-relative form. On x86-64 this is automatic when `-fPIC` is used; on some architectures extra registers are reserved for the GOT pointer.

### Step 5 — Dynamic linker operation at program startup
The kernel maps the executable and its direct dependencies. Control then passes to the dynamic linker (`ld.so`), which walks the dependency graph, maps each shared object at an available address, performs all `R_*_RELATIVE` and `R_*_GLOB_DAT` relocations, and finally transfers control to the program entry point.

### Step 6 — Formal definition of a shared library
A shared library is an ELF file whose `e_type` is `ET_DYN`, whose program headers include a `PT_DYNAMIC` segment, and whose section headers contain at least `.dynsym`, `.dynstr`, `.hash` (or `.gnu.hash`), `.rela.dyn` and `.rela.plt`.

## 5. Worked examples

**Example 1 — Minimal PIC data reference**  
*Given:* C source `int g = 42; int get() { return g; }` compiled with `gcc -fPIC -shared -o libex.so`.  
*Find:* the assembly form of `get`.  
1. Compiler sees a global; emits `mov eax, [rip + 0x2008]` instead of an absolute address.  
2. The offset `0x2008` points inside the GOT of the shared object.  
3. At load time `ld.so` writes the true address of `g` into that GOT slot.  
**Final answer**  
```asm
get:
    mov eax, [rip + 0x2008]
    ret
```
*Reflection:* the example shows how a single IP-relative load removes any absolute address from the text segment.

**Example 2 — First PLT call**  
*Given:* call to `printf` from a PIC binary.  
*Find:* the sequence of the first versus subsequent calls.  
1. Call lands on `printf@plt`.  
2. PLT stub jumps through GOT slot that initially points back to the PLT itself.  
3. Dynamic linker resolves `printf`, patches the GOT, and jumps to the real function.  
**Final answer**  
Subsequent calls bypass the resolver entirely.  
*Reflection:* lazy binding trades one-time cost for faster startup.

**Example 3 — Building a shared library**  
*Given:* two files `a.c` and `b.c`.  
*Find:* correct compiler and linker flags.  
1. `gcc -fPIC -c a.c b.c` produces position-independent objects.  
2. `gcc -shared -Wl,-soname,libab.so.1 -o libab.so.1.0 a.o b.o` creates the library.  
**Final answer**  
`libab.so.1.0` is the real file; `libab.so` and `libab.so.1` are symlinks.  
*Reflection:* soname encodes the ABI version so the dynamic linker can refuse incompatible upgrades.

**Example 4 — Relocation count**  
*Given:* `readelf -r libex.so | wc -l`.  
*Find:* why the number is small when compiled with `-fPIC`.  
Only GOT and PLT relocations remain; all intra-module references are already IP-relative.  
**Final answer**  
Typical relocation count drops from hundreds to fewer than ten.  
*Reflection:* fewer relocations means faster startup and better page sharing.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting `-fPIC`                | Default code model uses absolute addresses          | Always pass `-fPIC` when building `.so` or `.dll`    |
| Text relocations in final binary  | Linker allowed `TEXTREL` because objects lacked PIC | Add `-z text` to linker flags to make it an error    |
| Hard-coded `/usr/lib` paths       | Build machine paths leak into binaries              | Use `-Wl,-rpath,'$ORIGIN'` or rely on system ld cache|
| Missing soname                    | Library installed without ABI versioning            | Always supply `-Wl,-soname,libname.so.X`             |
| Circular dependencies             | Two libraries each require symbols from the other   | Break cycles or use `LD_PRELOAD` carefully           |
| Symbol visibility explosion       | All symbols exported by default                     | Use `-fvisibility=hidden` and explicit `EXPORT` macros|
| Mixing PIC and non-PIC objects    | Some third-party archives were built without PIC    | Rebuild dependencies or accept private text copies   |

## 7. The textbook-precise statement
A position-independent shared object is an ELF `ET_DYN` file whose every absolute address reference has been replaced by a PC-relative or GOT-relative form, so that the file may be mapped at an arbitrary base address \(B\) and all intra-object references remain correct after the dynamic linker has performed only relative relocations of the form \(R\_X86\_64\_RELATIVE\). The dynamic linker must resolve undefined symbols listed in the `.dynsym` table using the GOT/PLT mechanism described in the System V ABI, Edition 4.1, §3-9 (TIS Committee, 1997).

## 8. Visual — diagram or schematic
```
Process Address Space
0x00007f0000000000
+------------------+   shared text pages (read-only, PIC)
| libex.so .text   |   <-- mapped at different virtual address
| (no absolute     |       for every process
|  addresses)      |
+------------------+
0x00007f0000200000
| libex.so .got    |   per-process writable
| (resolved addrs) |
+------------------+
```

## 9. The memory technique
1. **The hook** — picture every shared library as a transparent plastic sheet that can be slid to any position on an overhead projector; only the clear plastic (code) is shared, while each student has their own tiny sticky note (GOT) that records where the sheet currently sits.
2. **What to overlearn** — `-fPIC` produces position-independent code; every external data access goes through the GOT; every external call goes through the PLT on first use.
3. **Spaced-repetition schedule** — review the GOT/PLT mechanism after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — if you forget the tables, remember that any absolute address must be removed from the read-only text; therefore every external reference must be stored in a writable table that the dynamic linker can patch once per process.

## 10. What this unlocks
Mastery of dynamic libraries directly enables understanding of plugin architectures, language runtimes (JVM, Python C extensions), hot-patching, and address-space layout randomization (ASLR).  
- Next topics: static vs dynamic PIE executables, symbol versioning, `dlopen`/`dlsym`, lazy binding control via `LD_BIND_NOW`, and link-time optimization across shared objects.

## 11. Self-check — five questions, no answers
1. Why does compiling without `-fPIC` break text sharing across processes?  
2. Show the exact instruction sequence for a first-time PLT call versus a subsequent call.  
3. What ELF sections must be present for a file to be a valid shared library?  
4. A third-party `.a` archive contains absolute relocations; what single linker flag will turn the resulting shared object into a hard error?  
5. Given two libraries A and B that each export a symbol named `foo`, which `foo` is chosen when an executable links against both, and why?