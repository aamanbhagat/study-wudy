## 1. The one-sentence answer
**Instruction formats partition the fixed-width instruction word into distinct fields that encode opcode, registers, immediates, and jump targets, allowing a single decoder to route data to the ALU, memory, or program counter.**

In a processor the instruction is nothing more than a 32-bit pattern. The hardware must decide within one cycle which bits name the operation, which bits name source registers, and which bits supply a constant or a branch offset. The three MIPS formats solve this partition problem by fixing the opcode in the same six bits of every instruction while varying the meaning and width of the remaining bits according to the instruction class.

R-type instructions perform register-to-register arithmetic; every operand is a register, so five-bit fields suffice for three registers plus a shift amount. I-type instructions need a 16-bit constant for immediates, loads, stores, or branches, so they sacrifice one register field to make room. J-type instructions need a 26-bit target address for jumps, so they keep only the opcode and repurpose the rest of the word.

> [!NOTE]
> The opcode field is deliberately placed in the same position across all formats; this single design choice lets the control unit begin decoding before it knows which format the instruction uses.

## 2. Why this matters — concrete and current
Modern RISC-V cores inside SiFive chips and the Alibaba T-Head XuanTie series still employ the same three-format discipline (plus a compressed 16-bit extension) so that a single 32-bit decoder can feed both the integer pipeline and the floating-point unit without format-specific steering logic in the front end.

NASA’s High-Performance Spaceflight Computing processor, derived from the RISC-V Rocket core, relies on these fixed formats to guarantee deterministic timing for radiation-hardened execution; any variable-length encoding would complicate the timing analysis required for DO-254 certification.

Apple’s M-series CPUs contain a custom RISC-like front-end that ingests ARM instructions but internally cracks them into fixed-field micro-operations; the same field-extraction hardware principles that MIPS introduced in 1985 are reused inside the decoder to achieve single-cycle issue of up to eight instructions.

Google’s TPU v4 implements a VLIW-like instruction word whose sub-fields are directly analogous to MIPS R-type and I-type fields; the systolic-array control logic reads register specifiers and immediates in the same positions every cycle, allowing the compiler to schedule matrix-multiply operations without runtime format checks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Binary encoding of integers | Register numbers and immediates are literal bit fields inside the instruction word. |
| Two’s-complement arithmetic | Sign extension of 16-bit immediates and branch offsets must be performed correctly. |
| Word-aligned memory        | Jump and branch targets are word addresses; the low two bits are implicitly zero.   |
| Control-unit datapath      | The same opcode bits must steer multiplexers for ALU, memory, and PC update.        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every instruction is a 32-bit word
A processor fetches one word per cycle. The only way to interpret that word is to divide it into named fields whose widths are known at design time.

Consider the bit pattern 0x022A4020. Splitting it as six fields immediately yields an add instruction.

$$ \text{Instruction} = \underbrace{000000}_{6} \underbrace{10001}_{5} \underbrace{01010}_{5} \underbrace{01000}_{5} \underbrace{00000}_{5} \underbrace{100000}_{6} $$

> [!WARNING]
> Treating the entire 32 bits as a single integer destroys the semantic meaning of each field.

### Step 2 — Opcode occupies the same six bits in every format
Bits 31–26 are defined as the primary opcode. Hardware examines these bits first.

### Step 3 — R-type uses three register fields and a function code
When opcode = 0, the instruction is R-type. The remaining bits are rs, rt, rd, shamt, and funct.

$$ \text{R-type} = \text{opcode}(6)\;|\;\text{rs}(5)\;|\;\text{rt}(5)\;|\;\text{rd}(5)\;|\;\text{shamt}(5)\;|\;\text{funct}(6) $$

### Step 4 — I-type reallocates 16 bits for an immediate value
When the opcode is nonzero and not 2 or 3, the instruction is I-type. The last 16 bits become a signed constant.

$$ \text{I-type} = \text{opcode}(6)\;|\;\text{rs}(5)\;|\;\text{rt}(5)\;|\;\text{imm}(16) $$

### Step 5 — J-type uses a 26-bit target address
Opcodes 2 and 3 are jumps. The remaining 26 bits supply a word address shifted left by two.

$$ \text{J-type} = \text{opcode}(6)\;|\;\text{target}(26) $$

### Step 6 — The three formats together cover all required operations
Register arithmetic, memory access with offsets, conditional branches, and unconditional jumps are all expressible without variable-length encoding.

## 5. Worked examples — every step shown

**Example 1 — Decode an R-type add**
- *Given:* 0x022A4020
- *Find:* assembly form
1. Extract opcode = bits 31–26 → 0. *Why:* opcode field is always bits 31–26.
2. Because opcode = 0, treat as R-type. *Why:* convention reserves opcode 0 for R-type.
3. rs = bits 25–21 → 17, rt = bits 20–16 → 10, rd = bits 15–11 → 8, funct = bits 5–0 → 32. *Why:* field positions are fixed by the R-type layout.
**add $8, $17, $10**

**Example 2 — Decode an I-type addi**
- *Given:* 0x22300005
- *Find:* assembly form
1. opcode = 8 → addi. *Why:* opcode 8 is defined as add-immediate.
2. rs = 17, rt = 16, imm = 5 (sign-extended). *Why:* I-type places the constant in bits 15–0.
**addi $16, $17, 5**

**Example 3 — Decode a branch**
- *Given:* 0x12280003
- *Find:* assembly form and target calculation
1. opcode = 4 → beq. *Why:* opcode 4 is branch-equal.
2. rs = 9, rt = 8, imm = 3. *Why:* immediate is treated as a signed word offset.
3. Target = PC + 4 + (3 ≪ 2). *Why:* branch offset is shifted left two bits to form a byte offset.
**beq $9, $8, +12**

**Example 4 — Encode a jump**
- *Given:* jump to address 0x00400000 (word address 0x00100000)
- *Find:* 32-bit encoding
1. opcode = 2. *Why:* opcode 2 is j.
2. target = 0x00100000 (26 bits). *Why:* J-type uses bits 25–0 for the shifted word address.
3. Instruction = 0x08001000.
**0x08001000**

*Reflection:* The last example shows that address truncation to 26 bits is a deliberate architectural limit, not an encoding error.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Sign-extending the wrong field      | Confusing the 16-bit immediate with an unsigned constant | Always sign-extend I-type immediates unless opcode explicitly indicates zero-extension |
| Forgetting the left-shift on branches | Treating the immediate as a byte offset             | Remember PC-relative offset is always shifted left two bits |
| Using funct field when opcode ≠ 0   | Assuming every instruction has a funct sub-opcode   | Check opcode first; funct is valid only for R-type   |
| Overlapping register numbers        | Reading rs and rt from the same bit positions in J-type | J-type has no rs/rt fields; ignore those bits        |
| Miscalculating jump target range    | Ignoring that target is a 28-bit byte address       | Reconstruct full 32-bit target as (PC[31:28] ∥ target ∥ 00) |
| Treating shamt as signed            | Applying sign extension to the shift-amount field   | shamt is always unsigned                           |
| Confusing RISC-V compressed formats | Assuming every instruction is 32 bits               | Verify instruction length from the lowest two bits before field extraction |

## 7. The textbook-precise statement
MIPS instructions are partitioned into three fixed formats. An instruction word \(I\) is interpreted as follows (Patterson & Hennessy, *Computer Organization and Design*, 5e, §2.5):

- If \(I[31:26] = 0\), then \(I\) is R-type:  
  \( \text{ALU operation} = \text{funct}(I[5:0]) \), registers \( rs = I[25:21] \), \( rt = I[20:16] \), \( rd = I[15:11] \).

- If \(I[31:26] \in \{0x02,0x03\}\), then \(I\) is J-type:  
  next PC = \(\{PC[31:28], I[25:0], 2'b00\}\).

- Otherwise \(I\) is I-type:  
  operation determined by opcode, with signed immediate \(I[15:0]\) sign-extended to 32 bits.

## 8. Visual — diagram or schematic

```text
Bit 31          26 25          21 20          16 15          11 10           6 5            0
+---------------+---------------+---------------+---------------+---------------+---------------+
|   opcode (6)  |     rs (5)    |     rt (5)    |     rd (5)    |   shamt (5)   |   funct (6)   |  R-type
+---------------+---------------+---------------+---------------+---------------+---------------+
|   opcode (6)  |     rs (5)    |     rt (5)    |            immediate (16)                     |  I-type
+---------------+---------------+---------------+-----------------------------------------------+
|   opcode (6)  |                       target address (26)                                     |  J-type
+---------------+-------------------------------------------------------------------------------+
```

## 9. The memory technique

**The hook** — Picture three train cars on the same track: the engine (opcode) is identical on every car, but the cargo layout changes. R-type carries three small crates (registers), I-type carries one large crate (immediate), J-type carries one very long crate (address).

**What to overlearn**  
- Opcode always bits 31–26.  
- R-type funct in bits 5–0 when opcode = 0.  
- I-type immediate is always sign-extended.

**Spaced-repetition schedule** — Review formats at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback** — Redraw the 32-bit word, place the opcode at the left, then allocate the largest remaining contiguous field to the datum (register number or constant) that the instruction class most needs.

## 10. What this unlocks
Mastery of the three formats lets you read raw machine code, write a disassembler, and design a single-cycle control unit. The same skill transfers directly to:

- Implementing the decode stage of a RISC-V pipeline
- Writing an assembler that emits correct immediates and jump targets
- Understanding why RISC-V later added the U-type and B-type formats as strict generalizations of I-type and J-type
- Analyzing worst-case instruction throughput in superscalar processors

## 11. Self-check — five questions, no answers
1. Given the 32-bit word 0x01095020, identify the instruction format and write the corresponding MIPS assembly line.
2. A branch instruction contains the 16-bit field 0xFFFE. Compute the byte offset from the current PC+4.
3. Why can a J-type instruction not reach every 32-bit address in a 4 GiB space?
4. An instruction has opcode 0 and funct = 0x20. Which registers are read and which register is written?
5. If the hardware mistakenly treated an I-type immediate as unsigned, which common idiom (addi with a negative constant) would break and why?