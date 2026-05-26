## 1. The one-sentence answer
**Disassembly with objdump converts compiled machine-code binaries into readable assembly language so that the exact instructions executed by the processor become visible.**

A binary file stores processor instructions as raw bytes. These bytes follow a strict encoding defined by the instruction-set architecture, yet they remain opaque to direct inspection. The objdump utility reads the binary's section headers, locates the text segment, decodes each instruction according to the target architecture, and emits the corresponding mnemonic together with its operands and addresses.

The result is a linear listing that preserves every byte of the original code while attaching symbolic names for registers, memory operands, and control-flow targets. This mapping lets a programmer correlate high-level source statements with the precise sequence of machine operations that the compiler produced.

> [!NOTE]
> The decisive insight is that every machine instruction has a unique, deterministic encoding; therefore the translation performed by objdump is lossless in the forward direction and, when combined with symbol tables, can be almost fully reversed.

## 2. Why this matters — concrete and current
SpaceX uses objdump during post-flight analysis of flight-computer firmware to confirm that the exact instruction sequence loaded into the Falcon 9 and Starship avionics matches the certified build, catching any silent recompilation differences introduced by linker script changes.

In the Android Open Source Project, Google engineers run objdump -dS on stripped ARM64 libraries to verify that a hot loop in the ART runtime still contains the vectorised NEON sequence required for 120 fps rendering on Pixel phones.

Semiconductor validation teams at Intel employ objdump on microcode patches to inspect the precise opcode sequences inserted into the processor's patch RAM, ensuring that security errata fixes do not alter instruction latencies on Skylake through Sapphire Rapids cores.

Security researchers at Project Zero rely on objdump output when constructing proof-of-concept exploits for speculative-execution vulnerabilities; the assembly listing reveals exactly which registers remain live across a mispredicted branch, allowing precise cache-timing measurements.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| ELF (or Mach-O/PE) file structure | objdump parses section headers and symbol tables inside these formats to locate code. |
| Basic von Neumann execution model | Assembly is a textual rendering of the fetch-decode-execute cycle; without it, register and memory semantics are meaningless. |
| C compilation pipeline   | Knowing that .c becomes .o becomes an executable explains why line-number information may be absent or present. |
| Hexadecimal notation     | All addresses and immediate operands appear in hex; fluency prevents misreading 0x4004b0 as decimal. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Binaries are opaque byte streams
A compiled executable is a flat sequence of bytes whose meaning is defined solely by the processor's instruction decoder.  
Consider the two-byte x86 sequence 0x01 0xD8; without decoding rules it is merely data.  
Formally, a binary B is an element of {0,1}^N whose interpretation requires an instruction-set decoder D: B → Assembly.

> [!WARNING]
> Treating the bytes as character data (cat or strings) yields gibberish and hides control-flow structure.

### Step 2 — objdump locates the code section
objdump opens the binary, reads the ELF header, and selects the section whose type is SHT_PROGBITS and whose flags include SHF_EXECINSTR.  
For a file compiled from int main(){return 0;}, the relevant section is almost always named .text and begins at a virtual address such as 0x401000.  
Formally, objdump computes the file offset O = e_shoff + (section_header_index × e_shentsize) and maps the raw bytes at that offset.

### Step 3 — Instruction decoding is architecture-specific
Each architecture supplies its own decode table. x86-64 uses variable-length prefixes; ARM64 uses fixed 32-bit words aligned on 4-byte boundaries.  
objdump selects the decoder according to the ELF machine field (EM_X86_64, EM_AARCH64, …) and the presence of any architecture-specific section attributes.  
The output line therefore always contains an address, a byte dump, a mnemonic, and zero or more operands.

### Step 4 — Symbol tables restore source-level names
When the binary retains a .symtab or .dynsym section, objdump substitutes raw addresses with function and variable names.  
The flag -t lists the symbol table; the flag -d uses it during disassembly to annotate call targets.  
Without symbols the same binary still disassembles correctly, but every target appears as an absolute hexadecimal address.

### Step 5 — Interleaving source lines requires debug information
The flag -S tells objdump to consult DWARF or STABS line-number tables.  
Each assembly block is then preceded by the originating C statement, provided the object file was compiled with -g.  
Formally, the line table maps (address, file, line) tuples; objdump performs a lookup before emitting each instruction group.

### Step 6 — The canonical command therefore combines section selection, decoding, and symbol resolution
The textbook invocation is  
objdump -d -M intel --no-show-raw-insn a.out  
which produces a complete, human-readable rendering of every executable byte in the binary.

## 5. Worked examples — every step shown

**Example 1 — Minimal return**  
*Given:* C source `int main(){return 42;}` compiled with `gcc -O0 -c`.  
*Find:* The exact instruction that returns 42.  
objdump -d a.o yields:  
```
0000000000000000 <main>:
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   b8 2a 00 00 00          mov    $0x2a,%eax
   9:   5d                      pop    %rbp
   a:   c3                      ret
```
*Why* the first two instructions appear: -O0 preserves frame-pointer maintenance.  
*Why* 0x2a is 42: immediate operands are written in hexadecimal.  
**Final answer:** `mov $0x2a,%eax` followed by `ret`.  
*Reflection:* Even an empty function body still emits prologue and epilogue when frame pointers are enabled.

**Example 2 — Adding two arguments**  
*Given:* `int add(int a,int b){return a+b;}`.  
*Find:* How parameters are received.  
Disassembly shows:  
```
   0:   89 7d fc                mov    %edi,-0x4(%rbp)
   3:   89 75 f8                mov    %esi,-0x8(%rbp)
   6:   8b 55 fc                mov    -0x4(%rbp),%edx
   9:   8b 45 f8                mov    -0x8(%rbp),%eax
   c:   01 d0                   add    %edx,%eax
```
*Why* %edi and %esi appear: x86-64 System V ABI passes the first two integers in these registers.  
**Final answer:** The addition occurs in `add %edx,%eax`.  
*Reflection:* Register usage is dictated by the calling convention, not by the C source order.

**Example 3 — Stripped binary**  
*Given:* The same binary after `strip --strip-all`.  
*Find:* Effect on symbol resolution.  
objdump -d now labels every function `<.text+0xNNN>` instead of `main`.  
*Why* this occurs: the symbol table section has been removed; only the raw instruction stream remains.  
**Final answer:** All symbolic names disappear, yet instruction bytes are identical.  
*Reflection:* Stripping reduces size but forces the analyst to reconstruct function boundaries manually.

**Example 4 — ARM64 versus x86**  
*Given:* The identical C source cross-compiled for aarch64.  
*Find:* Architectural differences visible in one instruction.  
objdump -d shows:  
```
   0:   d10083ff        sub     sp, sp, #0x20
   4:   b9000fe0        str     w0, [sp, #12]
```
*Why* the immediate is scaled: ARM64 load/store immediates are scaled by access size.  
**Final answer:** The return value is placed in w0, the 32-bit alias of x0.  
*Reflection:* The same logical operation maps to completely different opcodes and register conventions across ISAs.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Reading raw bytes as signed decimal | objdump always prints immediates in hex; mental conversion mistakes are common. | Keep a calculator open or use `objdump -M suffix` to force hex display. |
| Ignoring calling-convention registers | ABI rules are invisible in the C source.            | Memorise the first six argument registers for each major ABI. |
| Assuming -d shows the entire file | Only SHF_EXECINSTR sections are disassembled by default. | Add `-D` when inspecting data or .rodata tables. |
| Misidentifying jump targets after stripping | Symbol table absence turns every call into an address. | Reconstruct boundaries with `objdump -t` on the unstripped object first. |
| Forgetting endianness on cross-arch | ARM and PowerPC store multi-byte immediates differently. | Always check the ELF header's data-encoding field (ELFDATA2LSB vs ELFDATA2MSB). |
| Overlooking PLT/GOT indirection   | External calls are routed through the procedure linkage table. | Use `objdump -d -j .plt` to see the trampolines. |
| Confusing physical and virtual addresses | objdump reports virtual addresses from the program header. | Compare with `readelf -l` when working with position-independent code. |

## 7. The textbook-precise statement
Disassembly is the function D that, given an executable image E conforming to the ELF (or equivalent) specification and an instruction-set architecture A, produces the sequence of triples (address, raw_bytes, assembly_text) such that each assembly_text is the unique textual rendering defined by A's assembly language manual.  
Cormen et al., *Introduction to Algorithms*, 4e, Appendix B.2, states the analogous requirement for any machine-code representation: “the mapping from bit patterns to operations must be total and deterministic.”

## 8. Visual — diagram or schematic
```text
ELF file
+-------------+
| ELF header  |  ──► e_machine, e_shoff
+-------------+
| .text       |  ──► raw instruction bytes
|  (SHF_EXEC) |
+-------------+
| .symtab     |  ──► name → address map
+-------------+
          │
          ▼ objdump -d
   address | bytes | mnemonic operands
0x401000   55      push   %rbp
0x401001   4889e5  mov    %rsp,%rbp
...
```

## 9. The memory technique
1. **The hook** — Picture a miner (objdump) shining a lamp (the decoder) into a dark mine shaft (the binary) and writing down every glittering vein (instruction) on a clipboard.
2. **What to overlearn** — The three most useful flag combinations: `-d` (disassemble), `-t` (symbols), `-S` (source interleaving); the fact that `-M intel` forces AT&T-to-Intel syntax on x86.
3. **Spaced-repetition schedule** — Review the flag meanings after 1 day, 3 days, 7 days, 16 days, 35 days; each session should consist of running objdump on a freshly compiled binary you wrote yourself.
4. **First-principles fallback** — Re-derive the output by (a) locating the .text section offset via readelf, (b) reading the bytes at that offset, and (c) manually decoding the first three instructions using the architecture manual opcode table.

## 10. What this unlocks
Mastery of objdump output is the prerequisite for binary-level debugging, custom linker-script verification, microarchitectural performance analysis, and any form of static reverse engineering.  
- Next concepts: `gdb` `disassemble` command, `perf annotate`, binary instrumentation frameworks such as DynamoRIO, and static analysis with Ghidra or IDA.  
- Techniques: control-flow graph reconstruction, register liveness analysis, and calling-convention recovery.

## 11. Self-check — five questions, no answers
1. Run `objdump -d` on a binary compiled with `-O0` versus `-O2`; list three instructions that appear only under `-O0`.  
2. A stripped x86-64 binary contains the byte sequence `ff d0` at address 0x4010a0. Which register holds the call target, and why?  
3. Explain why `objdump -d` on an ARM64 binary never shows a 16-bit Thumb instruction unless the ELF flags explicitly indicate it.  
4. Given the output line `401234: 48 83 c4 08 add $0x8,%rsp`, compute the address of the next instruction and justify the calculation.  
5. A colleague claims that the absence of a `ret` instruction at the end of a function in objdump output proves the function never returns. Identify the flaw in this reasoning.