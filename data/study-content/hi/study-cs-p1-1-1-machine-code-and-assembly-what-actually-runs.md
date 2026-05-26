## 1. The one-sentence answer
**Machine code is the exact sequence of binary instructions that the CPU executes directly, while assembly is its human-readable symbolic representation that an assembler converts into that binary.**

Machine code consists of raw opcodes and operands stored as bytes in memory. The CPU fetches each byte, decodes it according to its instruction-set architecture, and performs the corresponding operation on registers or memory locations. Assembly language replaces those numeric opcodes with mnemonics such as MOV or ADD, and replaces memory addresses with symbolic labels, yet it still maps one-to-one with the final machine code.

A compiler or interpreter ultimately produces this machine code; high-level statements disappear once the program is assembled and linked. The CPU never sees source code or even assembly; it only ever sees the binary stream.

> [!NOTE]
> The deepest insight is that every abstraction you enjoy in Python or C eventually collapses to a single, deterministic sequence of these binary instructions that the hardware can execute without any further translation.

## 2. Why this matters — concrete and current
Modern x86-64 processors in every Intel and AMD laptop still execute the same variable-length CISC machine code that Intel defined in 1978, only extended with new opcodes; this backward compatibility lets Windows and Linux binaries from the 1990s run unchanged today. ARM-based Apple silicon Macs translate AArch64 machine code through a hardware decoder that feeds a massive out-of-order execution engine; every iPhone app is ultimately a stream of these 32-bit ARM instructions. NVIDIA CUDA kernels are compiled to PTX, then to native GPU machine code (SASS) that the streaming multiprocessors fetch directly; the performance difference between a naïve PTX schedule and a hand-tuned SASS schedule can exceed 30 percent on matrix-multiplication workloads. The Linux kernel’s eBPF verifier rewrites user-supplied bytecode into safe kernel machine code at load time, allowing cloud providers to run untrusted network filters inside the same address space as the kernel without context-switch overhead. The Mars 2020 Perseverance rover’s flight software was cross-compiled to SPARC V8 machine code for the RAD750 processor; every actuator command on the surface of Mars is therefore a literal sequence of SPARC instructions stored in radiation-hardened SRAM.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary representation | Machine code is literally sequences of bits; you must read and write numbers in base 2 and base 16 fluently. |
| CPU fetch-decode-execute cycle | Assembly instructions exist only to drive this cycle; without it, register and memory semantics remain abstract. |
| Memory addressing modes | Assembly operands use immediate, register, direct, and indirect modes; these directly affect which machine-code bytes are emitted. |

If any row is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — CPU only understands its own instruction set
A CPU contains a decoder that recognises only a fixed repertoire of bit patterns. Any pattern outside that repertoire is either ignored or raises a hardware exception.  
Example: the byte 0x90 on x86-64 means “do nothing”; the byte 0xFF by itself is not a valid instruction and triggers an illegal-instruction fault.  
Formal statement: Let \(I\) be the instruction-set architecture. The decoder implements a surjective function \(D: \{0,1\}^n \to I \cup \{\text{invalid}\}\).  
> [!WARNING]
> Treating every byte sequence as valid code will produce nondeterministic behaviour once the decoder hits an illegal pattern.

### Step 2 — Opcodes and operands occupy fixed or variable-length fields
Each instruction is a bit string whose first few bits form the opcode that selects the operation; remaining bits encode registers, immediates, or addressing modes.  
Example: ARM64’s ADD instruction uses bits [31:24] for the opcode 0x91, bits [23:16] and [9:5] for registers.  
Formal statement: An instruction word \(w\) is partitioned as \(w = o \Vert r_s \Vert r_d \Vert imm\), where \(o\) is the opcode.  
> [!WARNING]
> Miscalculating field widths produces a completely different opcode, so the CPU executes an unintended operation.

### Step 3 — Assembly replaces numeric opcodes with mnemonics
An assembler performs a simple table lookup: the token ADD maps to the correct opcode bits. The programmer never writes the binary.  
Example: `ADD x0, x1, x2` becomes the 32-bit word 0x8B020020 on ARM64.  
Formal statement: The assembler is a function \(A: \text{mnemonic} \times \text{operands} \to \{0,1\}^n\).  
> [!WARNING]
> Assuming one mnemonic always produces the same binary across architectures is false; the mapping is architecture-specific.

### Step 4 — Labels become addresses after assembly
Symbolic labels are collected in a symbol table and replaced by numeric addresses or offsets in a second pass.  
Example: the label `loop:` at address 0x1000 turns a branch `B loop` into the machine-code offset that encodes –4 bytes.  
Formal statement: After symbol resolution, every operand that was a label \(L\) is replaced by its final relocated address \(addr(L)\).  
> [!WARNING]
> Forgetting that labels are resolved at assembly time leads to “undefined symbol” linker errors later.

### Step 5 — The final binary is position-independent or relocated by the loader
The operating-system loader may add a base address to every absolute address inside the binary before execution begins.  
Formal statement: If the binary was linked at base \(B\), the loader computes the final address \(B + r\) for each relocation entry \(r\).  
> [!WARNING]
> Hard-coding absolute addresses inside assembly breaks relocation and crashes when the binary is loaded at a different base.

### Step 6 — Execution is a repeated fetch of these machine-code bytes
The program counter (PC) holds the address of the next instruction. After each execution the PC is updated by the instruction length or by an explicit branch target.  
Formal statement: \(PC_{t+1} = PC_t + |I_t|\) or \(PC_{t+1} = target\) when a branch is taken.  
> [!WARNING]
> Overwriting the memory that the PC points to (self-modifying code) invalidates any assumptions about instruction layout.

## 5. Worked examples — har step show karo

**Example 1 — Minimal x86-64 no-op**  
*Given:* The single-byte instruction that does nothing.  
*Find:* Its machine code and the corresponding assembly.  
Step 1: Opcode table shows NOP = 0x90.  
Step 2: Because the instruction has no operands, the byte is emitted as-is.  
**0x90**  
*Reflection:* This example is trivial yet demonstrates the one-to-one mapping; every subsequent instruction follows the same opcode-lookup rule.

**Example 2 — ARM64 register move**  
*Given:* Copy the value in register x1 into x0.  
*Find:* The 32-bit machine code.  
Step 1: MOV is an alias for ORR with the zero register.  
Step 2: ORR opcode = 0xAA0003E0, Rd = 0, Rm = 1, Rn = 31.  
Step 3: Assemble fields: 0xAA0103E0.  
**0xAA0103E0**  
*Reflection:* Even “simple” moves expand to a different underlying opcode; reading the architecture manual is mandatory.

**Example 3 — Adding an immediate on x86-64**  
*Given:* Add 42 to the 32-bit register eax.  
*Find:* The complete byte sequence.  
Step 1: Opcode for ADD immediate to eax is 0x05.  
Step 2: Immediate 42 is little-endian 0x2A000000.  
Step 3: Emit 0x05 followed by the four bytes.  
**05 2A 00 00 00**  
*Reflection:* Variable-length encoding appears; the same operation on a different register would use an entirely different prefix byte.

**Example 4 — Forward branch with label**  
*Given:*  
```
loop: ADD x0, x0, #1
      CMP x0, #10
      B.NE loop
```  
*Find:* The assembled machine code assuming the first instruction is at address 0x0000.  
Step 1: ADD encodes to 0x91000400.  
Step 2: CMP encodes to 0xF1002940 (immediate 10).  
Step 3: B.NE offset is –8 bytes → two’s-complement 0xF7FFFFE0 in the branch field.  
Step 4: Final 12-byte sequence: 91000400 F1002940 54FFFFE1.  
**91000400 F1002940 54FFFFE1**  
*Reflection:* The assembler must compute the signed offset after label resolution; changing the distance between instructions immediately alters the branch encoding.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Assuming all instructions are 4 bytes | RISC architectures feel uniform; x86 is not | Always consult the encoding table for the target ISA |
| Writing literal addresses instead of labels | Forgetting the loader can relocate the binary | Use labels and let the assembler emit relocations |
| Ignoring endianness when embedding immediates | Multi-byte constants are stored LSB-first on x86 | Use the assembler’s immediate syntax instead of hand-coding bytes |
| Treating registers as interchangeable across ISAs | x86 eax is not the same as ARM x0 | Keep separate mental models per architecture |
| Forgetting that assembler passes resolve symbols | One-pass assemblers cannot resolve forward references | Use a two-pass assembler or declare labels before use |
| Overwriting code pages at runtime | Modern systems mark code read-only | Use explicit mprotect or JIT APIs if self-modification is required |

## 7. The textbook-precise statement
Patterson and Hennessy, *Computer Organization and Design*, 5e, §2.4: “The assembler translates symbolic assembly language into binary machine language. Each assembly-language instruction corresponds to exactly one machine-language instruction. The assembler resolves symbolic addresses and produces an object file that the linker combines with other object files and library routines to create an executable file.”

## 8. Visual — diagram or schematic
```
Memory (byte address)
0x0000:  91 00 04 00   ; ADD x0, x0, #1
0x0004:  F1 00 29 40   ; CMP x0, #10
0x0008:  54 FF FF E1   ; B.NE 0x0000
            ^
            |
         PC points here on each fetch
CPU: fetch 4 bytes → decode opcode → read x0 → compute → write result
```

## 9. The memory technique
1. **The hook** — Picture the CPU as a very fast but illiterate worker who can only read tiny slips of paper containing numbers; assembly is you writing the same numbers using short nicknames so you do not go insane.  
2. **What to overlearn** — Every architecture has a canonical NOP (0x90 on x86, 0xD503201F on ARM64) and the fact that labels disappear before the CPU ever runs.  
3. **Spaced-repetition schedule** — Review the opcode table after 1 day, write a five-instruction loop from memory after 3 days, hand-assemble a branch after 7 days, and explain relocation to someone else after 35 days.  
4. **First-principles fallback** — If you forget an encoding, start from the architecture manual’s instruction-format diagram, locate the opcode field, then fill register and immediate fields left to right.

## 10. What this unlocks
Understanding machine code and assembly removes the last layer of magic between source code and silicon. You can now read compiler output, hand-optimise hot loops, write tiny OS kernels, and debug segfaults by inspecting the exact bytes the CPU tried to execute.

- Next topics: calling conventions and the stack frame  
- Linker and loader mechanics  
- JIT compilation and dynamic code generation  
- SIMD instruction sets (AVX-512, NEON)  

## 11. Self-check — five questions, no answers
1. Convert the ARM64 instruction 0xAA0103E0 back into its assembly mnemonic and registers.  
2. Why does the same logical “add immediate” operation produce different byte lengths on x86-64 versus ARM64?  
3. A label appears after its first use in the source; which pass of the assembler must handle it?  
4. If you change the distance between a branch and its target label by four bytes, which bits in the final machine code are guaranteed to change?  
5. Name one concrete security mechanism that would break if a program were allowed to execute bytes it had just written into a data page.