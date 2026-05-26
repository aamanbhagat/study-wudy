## 1. The one-sentence answer
**Machine code is the binary sequence that a CPU fetches and executes directly; assembly language is its human-readable mnemonic form that an assembler translates one-to-one into that binary.**

At the lowest level a processor never sees text, variables, or loops. It receives a stream of bits that encode an operation code and operand addresses. Each such bit pattern causes the control unit to open or close specific data paths inside the arithmetic-logic unit for one clock cycle.  

Assembly replaces those opaque bit patterns with short names—MOV, ADD, JMP—so a programmer can write and read the same sequence without memorising hexadecimal values. The mapping remains strictly one instruction to one machine word; no optimisation or abstraction occurs during assembly.  

The CPU therefore runs only machine code. Assembly exists solely to make that code writable by humans.

> [!NOTE]
> The executable file that an operating system loads contains only machine code; every symbol and label from the assembly source has already been discarded by the assembler.

## 2. Why this matters — concrete and current
Intel’s x86-64 processors still execute the same variable-length machine-code format introduced in 1978; every Windows, Linux, and macOS binary ultimately reduces to those opcodes.  

NASA’s flight software for the Perseverance rover is compiled to PowerPC machine code that runs without an operating system; a single incorrect opcode can trigger a hardware reset 200 million kilometres from Earth.  

Google’s TensorFlow Lite runtime emits hand-tuned ARM NEON assembly for matrix multiplications on mobile NPUs, shaving milliseconds off inference latency in production Pixel phones.  

Security researchers use tools such as Ghidra to lift stripped machine code back into assembly, revealing vulnerabilities that source-level analysis cannot detect.  

Modern JIT compilers in JavaScript engines (V8, SpiderMonkey) emit fresh x86-64 or ARM64 machine code at runtime, turning hot loops into directly executable instruction streams measured in tens of nanoseconds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary representation    | Machine instructions are literal bit strings interpreted by hardware. |
| CPU fetch–decode–execute cycle | Explains why only machine code, not source text, can drive the processor. |
| Memory addressing        | Operands in machine code are numeric addresses or register numbers. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From gates to a control signal
A handful of logic gates can decode a bit pattern into an enable line that opens an ALU path.  
Example: the 4-bit pattern 0001 opens the adder.  
Formally, the decoder implements the Boolean function  
\[
\text{ADD_enable} = \neg b_3 \land \neg b_2 \land \neg b_1 \land b_0.
\]
> [!WARNING]
> Treating the bit pattern as “just a number” hides the fact that it directly wires the datapath; misreading one bit routes data to the wrong functional unit.

### Step 2 — Grouping signals into an opcode
Multiple control lines are packed into a single field called the opcode.  
Example: opcode 0x01 selects addition, 0x02 selects subtraction.  
The opcode is the first field fetched from memory each cycle.

### Step 3 — Adding operand specifiers
An instruction word appends bits that name registers or memory locations.  
Example: 0x01 0x03 0x04 means “add register 3 to register 4.”  
The full machine instruction is therefore an opcode plus zero or more operand fields.

### Step 4 — Replacing bits with mnemonics
Assembly language supplies a symbolic name for each opcode and allows register names instead of numbers.  
Example: `ADD R3, R4` assembles to the bit string above.

### Step 5 — One-to-one translation
The assembler performs a trivial table lookup; each assembly line yields exactly one machine word (or a fixed sequence for pseudo-instructions).  
No semantic analysis occurs.

### Step 6 — The executable image
After assembly the resulting binary is placed at a load address; the CPU’s program counter simply walks through these words at runtime.

## 5. Worked examples — every step shown

**Example 1 — Single addition on a toy ISA**  
*Given:* registers R0–R3, opcode 0x01 = ADD.  
*Find:* machine code for “add R1 to R2, result in R3.”  
Step 1: choose opcode → 0x01.  
*Why:* matches the ADD definition.  
Step 2: encode destination R3 (11₂), source R1 (01₂), source R2 (10₂).  
*Why:* operand fields follow opcode in this ISA.  
Step 3: concatenate → 0x01 0x03 0x01 0x02.  
**0x01030102**  

*Reflection:* The encoding order is arbitrary but fixed by the ISA manual; swapping fields produces a different, usually illegal, instruction.

**Example 2 — Memory load**  
*Given:* opcode 0x03 = LOAD, 32-bit address.  
*Find:* load 0x1000 into R0.  
Step 1: opcode 0x03.  
Step 2: register field 0x00.  
Step 3: address bytes 00 00 10 00.  
**0x030000001000**  

*Reflection:* Address size immediately determines instruction length; 64-bit ISAs need wider fields.

**Example 3 — Branch instruction**  
*Given:* opcode 0x07 = JMP, 16-bit offset.  
*Find:* jump forward 8 bytes.  
**0x070008**  

*Reflection:* Relative offsets keep code position-independent until linking.

**Example 4 — Assembling a three-instruction fragment**  
*Given:*  
MOV R0, #5  
ADD R0, R0, #1  
STR R0, [R1]  
*Find:* resulting machine code (toy 8-bit opcodes).  
MOV → 0x10, ADD → 0x01, STR → 0x20.  
**0x1005 0x010101 0x2001**  

*Reflection:* Labels and symbols are resolved only at assembly time; the final binary contains none.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming assembly is portable | Different ISAs define incompatible opcodes and register files. | Always target one concrete ISA when writing or reading assembly. |
| Confusing macro assemblers with compilers | Macros can generate multiple instructions; true assembly remains 1:1. | Check the manual: if a line expands to several words it is a macro. |
| Ignoring endianness of instruction encoding | Some ISAs store multi-byte immediates in little-endian order. | Read the ISA reference on instruction fetch order. |
| Treating PC-relative offsets as absolute | Branch targets are calculated from current PC, not from zero. | Add the offset to the address of the next instruction. |
| Forgetting that immediates have limited width | A 12-bit immediate cannot hold 0x1000 on many RISC machines. | Use load-from-literal-pool patterns when values exceed the field. |
| Reading disassembler output as original source | Optimising compilers reorder and rename registers; the assembly is not the input. | Recompile with -S or use debug info to map back to source lines. |
| Assuming all instructions are the same length | x86 allows 1- to 15-byte encodings. | Parse prefix bytes before assuming operand boundaries. |

## 7. The textbook-precise statement
Machine code is the binary representation of processor instructions defined by an instruction-set architecture (ISA). Each instruction is an opcode possibly followed by operand specifiers; the processor’s control unit decodes the opcode into a set of micro-operations executed in a single cycle or pipeline stage. Assembly language is a symbolic, human-readable notation that stands in one-to-one correspondence with machine-code bit patterns; an assembler performs a context-free translation from mnemonics and symbolic addresses to the binary image. (Patterson & Hennessy, *Computer Organization and Design*, 5e, §2.4–2.5.)

## 8. Visual — diagram or schematic

```text
Memory
+------------+
| 0x00: 01 03|  ← opcode ADD, dst R3
| 0x02: 01 02|  ← src R1, src R2
+------------+
          ↑ fetch
CPU
PC → 0x00 ──decode──► control lines ──► ALU add
          ↑
       execute
```

The diagram shows the program counter addressing memory, the fetched bytes entering the decoder, and the resulting control signals steering the ALU.

## 9. The memory technique

1. **The hook** — Picture a tiny factory where each arriving binary slip (machine code) is read by a foreman who immediately throws specific levers; the assembly sheet is merely the foreman’s handwritten cheat-notes using readable names for each slip.  
2. **What to overlearn** — (a) opcode = first field that selects the operation, (b) one assembly line → one machine instruction, (c) the binary image is what the loader places in memory.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the fetch–decode–execute cycle: whatever bits are fetched must be the only thing that can legally drive the control unit.

## 10. What this unlocks
Understanding that only machine code executes lets you reason about performance, security, and correctness at the level the hardware actually implements.  

- Next: instruction-set architecture design and RISC vs CISC trade-offs.  
- Register allocation and instruction scheduling inside compilers.  
- Binary instrumentation, dynamic translation, and sandboxing.  
- Operating-system context-switch mechanics that save and restore machine state.  
- Reverse-engineering and exploit development that operate directly on binaries.

## 11. Self-check — five questions, no answers
1. Write the machine-code byte sequence for the assembly line `ADD R2, R3, R4` on an ISA whose ADD opcode is 0x05 and whose three-register format places the destination first.  
2. A disassembler shows the byte 0x75 at address 0x0042. If the ISA defines 0x75 as a conditional jump with an 8-bit signed offset, what is the target address when the offset byte that follows is 0xFC?  
3. Explain why the same source-level statement `x = y + 1` can produce different machine-code sequences on x86-64 versus ARM64 even when both compilers are asked for maximum optimisation.  
4. Identify the hidden assumption in the claim “my assembly program will run unchanged on any processor that supports the same operating system.”  
5. A 32-bit RISC processor fetches four bytes at a time. If the program counter holds 0x1003, what concrete problem occurs on the next fetch, and which hardware mechanism usually prevents it?