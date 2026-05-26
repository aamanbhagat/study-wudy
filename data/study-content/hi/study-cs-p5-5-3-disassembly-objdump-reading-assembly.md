## 1. The one-sentence answer
**Disassembly using objdump extracts human-readable assembly instructions from a compiled binary so you can inspect exactly what the processor will execute.**

A binary file contains machine code in raw bytes. When you run `objdump -d` on an ELF or PE executable, the tool parses sections, locates the text segment, decodes each instruction according to the target ISA, and prints the address, opcode bytes, mnemonic, and operands. This mapping lets you correlate high-level source statements with the concrete register operations, memory accesses, and control-flow decisions that actually occur at runtime.

The same binary can be produced by different compilers or optimisation levels, so the assembly you read is never unique; it is simply the concrete artefact that the toolchain emitted.

> [!NOTE]
> The single most important realisation is that every C or C++ line expands to a sequence of assembly instructions whose side-effects on registers and memory you can predict exactly once you master the calling convention and ABI of the platform.

## 2. Why this matters — concrete and current
When a performance-critical loop in a machine-learning inference engine runs 15 % slower than the theoretical peak on an AWS Graviton3 instance, engineers at Amazon routinely run `objdump -d --no-show-raw-insn` on the hot `.text` section to count fused multiply-add instructions and verify that the compiler emitted the expected NEON or SVE vectorisation.

In semiconductor bring-up, the first silicon of a new RISC-V core at SiFive is validated by feeding known binaries through `objdump` and comparing the decoded instruction stream against the RTL simulation trace; any mismatch immediately flags an encoding bug in the decoder hardware.

Security researchers at Project Zero used `objdump` output to locate the precise gadget sequence that turned the Spectre-BTB variant into a working cross-process leak on Intel CPUs; the paper reproduces the exact assembly bytes that the attacker must locate inside `libcrypto.so`.

When a satellite flight-software team at ISRO links a new attitude-control module, they run `objdump -t` on the final image to confirm that no unexpected global symbols remain in the load address map before the binary is signed and uploaded to the spacecraft.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| ELF/PE file format   | Tells you where the `.text` section lives and how symbols are stored |
| Calling convention   | Explains which registers hold arguments and who saves callee-saved registers |
| Basic CPU registers  | Lets you track data movement without guessing             |
| Hexadecimal notation | All addresses and immediates appear in hex in objdump output |

If any row above is unfamiliar, pause and read the corresponding short primer before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the executable code section
A compiled binary is a container; the actual instructions live inside one or more sections marked “executable”.  
Example: after compiling `int add(int a,int b){return a+b;}` with `gcc -c`, the resulting `add.o` contains a `.text` section whose size you can see with `readelf -S`.  
Formally, the ELF header field `e_shnum` and the section header table give the offset and size of every section whose `sh_flags` contain `SHF_EXECINSTR`.  
> [!WARNING] If you feed a stripped binary to objdump without `-M intel` or the correct `--target`, the decoder silently produces wrong mnemonics.

### Step 2 — Map virtual addresses to file offsets
Each section header stores `sh_addr` (virtual) and `sh_offset` (file). objdump subtracts the difference to translate a program-counter value into a byte index inside the file.  
Example: `sh_addr = 0x400000`, `sh_offset = 0x1000` means PC 0x400123 corresponds to file byte 0x1123.  
Formal statement:  
$$ \text{file_offset} = \text{sh_offset} + (\text{PC} - \text{sh_addr}) $$

### Step 3 — Decode instruction bytes according to ISA
Starting at the computed offset, objdump reads the variable-length (x86) or fixed-length (ARM/RISC-V) opcode bytes and matches them against the architecture’s instruction encoding tables.  
Example: bytes `55 48 89 e5` decode to `push rbp; mov rbp,rsp` on x86-64.  
Formal: given byte stream \( b_0 b_1 \dots b_n \), there exists a unique decoding function \( D_{\text{ISA}} \) such that  
$$ D_{\text{ISA}}(b_0 \dots b_n) = (\text{mnemonic}, \text{operands}) $$

### Step 4 — Annotate with symbol names via the symbol table
If the binary is not stripped, objdump consults `.symtab` or `.dynsym` to replace raw addresses with function or variable names.  
Example: call to address 0x401030 becomes `callq <printf@plt>`.  
> [!WARNING] A stripped binary loses this mapping; you must keep a separate debug file or use `addr2line` with the original ELF.

### Step 5 — Reconstruct control-flow graph from branch targets
By scanning for `jmp`, `call`, `ret`, and conditional jumps, you can build basic blocks and edges. This graph is required for any subsequent static analysis.  
Formal: a basic block is a maximal straight-line sequence of instructions that ends with a branch or the next instruction is a branch target.

## 5. Worked examples — har step show karo

**Example 1 — Minimal function**  
*Given:* C source `int inc(int x){return x+1;}` compiled with `gcc -O0 -c`.  
*Find:* assembly for the function body.  
objdump -d -M intel shows:  
```
0000000000000000 <inc>:
   0:   55                      push   rbp
   1:   48 89 e5                mov    rbp,rsp
   4:   89 7d fc                mov    DWORD PTR [rbp-0x4],edi
   7:   8b 45 fc                mov    eax,DWORD PTR [rbp-0x4]
   a:   83 c0 01                add    eax,0x1
   d:   5d                      pop    rbp
   e:   c3                      ret
```
*Why* each line: first two lines establish the frame, next two move the argument from `edi` into a stack slot, the add performs the increment, and the final two restore the frame.  
**Final answer**  
`inc` returns its argument incremented by one using the System V AMD64 ABI.

**Example 2 — Tail-call optimisation**  
*Given:* `int f(int x){return g(x+1);}` at `-O2`.  
*Find:* whether a `call` remains.  
After optimisation the generated code contains only a `jmp` to `g`, not a `call`.  
*Reflection*  
Tail-call elimination removes the return address push, which is why the stack depth stays constant.

**Example 3 — Position-independent code (PIC)**  
*Given:* shared library compiled with `-fPIC`.  
*Find:* how a global variable is accessed.  
objdump shows `mov rax, QWORD PTR [rip+0x2f3a]`.  
*Why* the RIP-relative addressing: the offset is calculated at link time so the library can be loaded at any base address.

**Example 4 — Inline assembly mixed with compiler output**  
*Given:* C code containing `__asm__ volatile("mfence")`.  
*Find:* exact placement.  
objdump places the byte `0f ae f0` (mfence) between two compiler-generated loads, confirming the memory barrier is not reordered.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reading stripped binaries         | Symbol table discarded by `strip`           | Keep unstripped ELF or use separate debug file |
| Ignoring calling convention       | Registers chosen by compiler, not by source | Memorise System V / Microsoft ABI tables     |
| Assuming one-to-one source mapping| Optimiser reorders and inlines              | Compile with `-fno-inline -Og` first         |
| Wrong ISA flag                    | objdump defaults to host architecture       | Always pass `-m` or `--target`               |
| Forgetting PLT/GOT indirection    | External calls go through lazy-binding stub | Look for `@plt` suffix                       |
| Confusing virtual and file offsets| `sh_addr` ≠ file position                   | Use `objdump -F` or compute offset manually  |
| Overlooking data embedded in .text| Jump tables and constants live in code      | Scan for non-instruction bytes after `ret`   |

## 7. The textbook-precise statement
In “Computer Systems: A Programmer’s Perspective”, 3e, §3.2, Bryant & O’Hallaron define disassembly as the process of recovering an assembly-language representation from an object-code file: given an object file \( F \) whose text section contains the byte sequence \( B = b_1 b_2 \dots b_n \), a disassembler produces the sequence of instructions \( I_1, I_2, \dots, I_k \) such that the concatenation of their encodings equals \( B \), respecting the instruction-set architecture’s variable-length encoding rules and the relocation information stored in the file’s symbol and relocation tables.

## 8. Visual — diagram or schematic
```
Virtual address space
0x401000 ┌────────────────────┐
         │  .text             │
0x401020 │  inc:              │
         │   push rbp         │
         │   mov  rbp,rsp     │
0x40102e │   ret              │
         └────────────────────┘
File offset = sh_offset + (VA - sh_addr)
```

## 9. The memory technique

1. **The hook** — Picture objdump as a translator that turns the secret machine language of the CPU back into the assembly notebook you can read on the bus.
2. **What to overlearn** — The five registers that hold the first six integer arguments on x86-64 (rdi, rsi, rdx, rcx, r8, r9) and the fact that `ret` pops the return address from `rsp`.
3. **Spaced-repetition schedule** — Review the register list after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget a register, re-derive it by writing a trivial C function that takes six arguments and examining the first six `mov` instructions that copy them from the incoming registers.

## 10. What this unlocks
Once you can read objdump output you can perform binary-level performance analysis, write reliable binary patches, verify compiler correctness, and locate ROP gadgets for security research. The immediate next topics are static analysis with angr or Ghidra, link-time optimisation (LTO) debugging, and generation of position-independent executables.

## 11. Self-check — five questions, no answers
1. What single command-line flag forces objdump to show Intel syntax on an x86-64 binary?  
2. Given a stripped binary whose entry point is 0x401000, how do you locate the first instruction byte inside the file?  
3. Why does a PIC shared library use RIP-relative addressing for global data?  
4. In the assembly of a function compiled at `-O2`, you see a `jmp` instead of a `call` followed by `ret`. What optimisation occurred?  
5. A student runs `objdump -d` on a RISC-V ELF but sees x86 instructions. Identify the mistake and the minimal correction.