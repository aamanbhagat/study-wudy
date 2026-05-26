## 1. The one-sentence answer
**An object file is the compiler’s intermediate product: a binary container that holds machine instructions, data, a symbol table naming every external reference, and relocation entries that record every address the linker must still adjust.**

Compilation stops once the source has become architecture-specific code; the resulting .o (POSIX) or .obj (Windows) file is not yet executable because most addresses remain symbolic. The symbol table records every function and variable that the file defines or needs, while relocation entries mark every instruction or data word whose numeric value depends on a final memory layout. Only when the linker merges multiple object files and assigns concrete addresses do those placeholders become real offsets or absolute locations.

The separation is deliberate. It lets each translation unit be compiled independently, in parallel, and in any order; the linker later resolves the cross-references that no single compiler invocation could know.

> [!NOTE]
> The “aha” is that an object file is deliberately incomplete: its machine code is correct but its addresses are still variables, and the symbol table plus relocation list are the contract that tells the linker exactly which variables must be solved.

## 2. Why this matters — concrete and current
In the Linux kernel build, thousands of .o files produced by GCC or Clang are fed to the kernel linker script; each driver’s symbol table supplies the init and exit routines that the final vmlinux image must place at known offsets for module loading.

LLVM-based toolchains used by Apple’s Xcode and Google’s Android NDK emit Mach-O and ELF object files whose relocation entries allow the same bitcode to be ahead-of-time compiled for arm64 or x86-64 without recompiling the entire application.

High-performance linear-algebra libraries such as OpenBLAS compile each architecture-specific kernel into a separate .o; at link time the relocation table lets the build system pick the AVX-512 variant and patch its call sites into the final shared library.

Modern WebAssembly toolchains (wasm-ld) treat .o files exactly like ELF objects; relocation entries encode the memory indices that must be rewritten when multiple WebAssembly modules are statically linked into a single .wasm binary for edge deployment.

Semiconductor design firms run millions of small C++ translation units through distributed compilers; the symbol tables produced allow incremental linking of verification harnesses that would otherwise take hours if every change forced a full re-link.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| ELF / Mach-O / COFF sections | Object files are sectioned containers; relocation and symbols are stored inside specific sections (.symtab, .rela.text). |
| Assembler output         | The compiler emits assembly; understanding labels versus literals is required before relocation entries make sense. |
| Address space layout     | Linkers assign final virtual addresses; without this notion, “relocation” is meaningless. |
| Two-pass translation     | The compiler’s first pass builds the symbol table; the second pass emits code that may still contain unresolved references. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From source text to raw machine bytes
A compiler translates each function into a sequence of machine instructions whose operands are either constants or placeholders.  
Example: the statement `x = y + 1;` may become `mov eax, [rip + y_offset]; add eax, 1; mov [rip + x_offset], eax`.  
Formally, the emitted text section is a byte string \( T \in \{0,1\}^n \) together with a partial map from instruction offsets to symbolic operands.  
> [!WARNING] Treating every numeric literal in the emitted bytes as already final will later produce an executable that crashes with address faults when the real layout differs.

### Step 2 — Sections partition the file
An object file organises bytes into named sections (.text, .data, .rodata, .bss). Each section carries its own size and alignment constraints.  
The compiler records, for every byte offset inside a section, whether that byte participates in an address computation.  
Formally, an object file is a tuple \( (S, \Sigma, R) \) where \( S \) is the set of sections, \( \Sigma \) the symbol table, and \( R \) the relocation list.

### Step 3 — The symbol table records definitions and references
Every identifier that must be visible across translation units receives an entry: name, section, offset within section, size, and binding (local/global/weak).  
A defined symbol carries a concrete offset; an undefined symbol carries a special “external” marker.  
Formally, \( \Sigma : \text{Name} \to (\text{Section} \times \mathbb{N} \times \text{Binding}) \cup \{\text{UND}\} \).

### Step 4 — Relocation entries annotate address holes
For each instruction or data word whose value depends on a symbol’s final address, the object file stores a relocation entry: offset inside section, symbol index, relocation type (absolute, PC-relative, GOT, …), and addend.  
The type tells the linker which arithmetic to perform once the symbol’s address \( A \) is known: e.g., \( \text{value} = A + \text{addend} \) or \( \text{value} = A - P + \text{addend} \).  
Formally, a relocation is the 4-tuple \( (s, o, t, a) \).

### Step 5 — The linker resolves symbols and applies relocations
The linker merges sections of the same name, assigns each section a base address, computes every symbol’s final address, then walks the relocation list and patches the corresponding bytes.  
Only after this step are all relocation entries discarded; the resulting executable or shared object contains no symbolic addresses.

### Step 6 — The finished contract
An object file therefore exports exactly the information required for independent compilation and later composition: machine code, data, names, and the arithmetic rules that turn names into addresses.

## 5. Worked examples — every step shown

**Example 1 — Single external reference**  
*Given:* C source `extern int y; int x = y + 1;` compiled to x86-64 ELF.  
*Find:* symbol table and relocation entries.  
Compiler emits in .data the 4-byte word `00 00 00 00` and records relocation R1 at offset 0 of type R_X86_64_32 against symbol y with addend 1.  
Symbol table contains: `x` (global, .data, offset 0, size 4), `y` (global, UND).  
*Why* the relocation type is R_X86_64_32: the target is a 32-bit absolute address.  
**Final answer**  
Symbol table: {x: (data,0,GLOB,4), y: UND}; Relocations: {(data,0,R_X86_64_32,y,1)}.

**Example 2 — PC-relative call**  
*Given:* `void f(); void g(){f();}`.  
*Find:* relocation for the call instruction.  
The emitted `call` opcode is followed by a 32-bit displacement field initialised to zero. Relocation R2 at offset of that field, type R_X86_64_PC32, symbol f, addend −4 (the size of the instruction prefix).  
*Why* the addend is −4: the PC at the relocation site already points four bytes past the opcode; the linker must subtract that bias.  
**Final answer**  
Relocation: {(text, call_site+1, R_X86_64_PC32, f, −4)}.

**Example 3 — Multiple sections**  
*Given:* a file defining a global in .data and a function in .text that references it.  
*Find:* how offsets interact.  
Symbol table lists the data symbol at offset 12 inside .data; the text relocation points at an instruction offset 7 inside .text and requests the absolute address of that symbol.  
*Why* section identity matters: the linker concatenates all .data sections first, then computes the final address as base_of_merged_data + 12.  
**Final answer**  
Merged address computation: \( A = \text{base}_\text{data} + 12 \).

**Example 4 — Weak symbol override**  
*Given:* two object files both define `weak int debug_flag = 0;`.  
*Find:* which definition survives.  
Both symbol-table entries are marked STB_WEAK. The linker selects the first non-weak definition or, if none exists, the first weak one, then rewrites all relocation sites that pointed to either copy.  
*Why* the mechanism exists: it permits default values that can be overridden by a strong definition supplied later.  
**Final answer**  
Chosen address is taken from the surviving strong (or first weak) symbol; all relocation entries are patched to that single address.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming every address in a .o file is already final | Novices run `objdump -d` and see numeric immediates that look absolute | Always inspect the relocation section (`readelf -r`) before trusting any address. |
| Confusing symbol value with symbol address | The value field stores the offset inside its section, not the eventual virtual address | Remember: value + section base = final address; the linker supplies the base. |
| Forgetting that .bss symbols occupy no file bytes | Zero-initialised data lives only in the section header | Check `sh_type == SHT_NOBITS` for .bss; space is allocated only at load time. |
| Overwriting a relocation entry manually | Hand-patching bytes destroys the relocation record the linker still needs | Never edit an object file with a hex editor; recompile or use the linker. |
| Ignoring relocation overflow | A 32-bit relocation cannot hold a 64-bit address difference on some ABIs | Choose the correct relocation type (R_X86_64_64 vs R_X86_64_32) or compile with `-fPIC`. |
| Treating weak and common symbols identically | Common symbols are a legacy Fortran artefact merged by size, not by name alone | Use `nm` to distinguish `C` (common) from `V`/`W` (weak) entries. |
| Forgetting alignment constraints | A symbol may be placed at an offset that violates the section’s required alignment | Always honour `sh_addralign` when computing final addresses manually. |

## 7. The textbook-precise statement
An object file \( F \) is a tuple \( (H, S, \Sigma, R) \) where \( H \) is the ELF (or Mach-O/COFF) header, \( S = \{s_1,\dots,s_k\} \) a set of sections each characterised by name, type, flags, size, and alignment, \( \Sigma \) is a symbol table mapping identifiers to tuples \( (\text{section index}, \text{value}, \text{size}, \text{binding}, \text{visibility}) \), and \( R \) is a list of relocation entries each of the form \( (r_\text{offset}, r_\text{symbol}, r_\text{type}, r_\text{addend}) \). The semantics of each relocation type are defined by the processor-specific ABI; applying relocation \( r \) after the linker has assigned base address \( B_s \) to section \( s \) yields the patched value \( v = f_{r_\text{type}}(B_s + \sigma(r_\text{symbol}), r_\text{addend}, P) \) where \( P \) is the relocation site’s own address. (See System V ABI, Edition 4.1, §4.4 “Relocation” and ELF-64 Object File Format, version 1.5, §6.)

## 8. Visual — diagram or schematic
```text
Object file layout (simplified ELF view)
+--------------------+
| ELF Header         |  points to section header table
+--------------------+
| .text              |  machine code bytes
|   [reloc holes]    |
+--------------------+
| .data              |  initialised data
+--------------------+
| .symtab            |  symbol table (name, value, section, binding)
|  0: main  .text 0  |
|  1: printf UND     |
+--------------------+
| .rela.text         |  relocation entries
|  off=0x07 sym=1    |  (call site, symbol printf, type PC32, addend=-4)
|  off=0x1c sym=2    |
+--------------------+
| Section Hdr Table  |
+--------------------+
```
The diagram shows that relocation entries live in their own section and point both into the code and into the symbol table.

## 9. The memory technique
1. **The hook** — Picture a shipping crate whose contents are already packed but whose destination labels are still blank sticky notes; the symbol table is the packing list, relocation entries are the blank labels, and the linker is the customs clerk who fills them in.
2. **What to overlearn** — (a) relocation type encodes the arithmetic, (b) symbol value is section-relative, (c) .rela sections are consumed and discarded by the linker.
3. **Spaced-repetition schedule** — Review the five-tuple definition of a relocation entry at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the fact that each translation unit is compiled without knowledge of any other unit’s layout; therefore every cross-unit address must be recorded symbolically and solved later.

## 10. What this unlocks
Mastery of object-file structure is the prerequisite for understanding link-time optimisation, dynamic shared objects, position-independent code, and whole-program analysis.  

- Linker scripts and section placement  
- Dynamic linking and the Global Offset Table (GOT)  
- Link-time optimisation (LTO) bitcode sections  
- Position-independent executables (PIE)  
- Binary rewriting tools such as Egalito or BOLT  

## 11. Self-check — five questions, no answers
1. Given an ELF object file whose .text section contains a `call` instruction whose 32-bit displacement is 0x00000000 and whose relocation entry is `(offset=1, sym=printf, type=R_X86_64_PC32, addend=-4)`, what is the displacement after linking when `printf` resolves to address 0x4010a0 and the call site itself is placed at 0x4006b0?  
2. Why does a symbol whose `st_shndx` field equals `SHN_UNDEF` never occupy space in any section of the final executable?  
3. A relocation of type `R_X86_64_32S` overflows when the target address lies outside the signed 32-bit range relative to the image base; name the compiler flag that prevents generation of such relocations.  
4. Two object files each define a weak symbol `foo` of size 4 in .bss; after linking, how many distinct copies of `foo` exist in the output image and why?  
5. If you hand-edit a byte inside .text that is covered by a relocation entry, which subsequent linker operation is guaranteed to produce an incorrect executable?