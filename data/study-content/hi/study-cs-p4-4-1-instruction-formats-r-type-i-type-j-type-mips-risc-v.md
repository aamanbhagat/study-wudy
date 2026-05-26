## 1. The one-sentence answer
**Instruction formats define the fixed bit-field layouts that turn every assembly instruction into a 32-bit machine word; MIPS and RISC-V use three canonical layouts—R-type, I-type and J-type—each optimised for a different class of operations.**

R-type packs three register numbers plus an opcode and function code so that arithmetic and logical operations stay entirely inside the register file. I-type replaces one register field with a 16-bit immediate constant, letting loads, stores and branches carry small constants without an extra instruction. J-type collapses the remaining bits into a 26-bit jump target so control-flow changes can reach a larger address range in a single word.

The key design choice is that every format keeps the opcode in the same six bits; the control unit therefore decodes the instruction class in the first pipeline stage before it knows the exact operation.

> [!NOTE]
> The “aha” moment is realising that the three formats are not arbitrary; they are the minimal set that lets the datapath reuse the same register-file ports and ALU for almost every instruction while still supporting immediates and long jumps.

## 2. Why this matters — concrete and current
Apple’s M-series chips still decode a RISC-style fixed-length instruction set whose encoding decisions trace directly back to the R/I separation first popularised by MIPS. Modern high-performance cores in these chips use the same early opcode inspection trick to steer instructions to different execution units within one cycle.

RISC-V’s open-source cores (SiFive, CHIPS Alliance) expose the exact same three-format skeleton; every open-source compiler and assembler therefore emits only these layouts, making the instruction decoder a few hundred gates instead of thousands.

NASA’s flight computers on recent Mars rovers run a MIPS-derived ISA; the radiation-hardened processor relies on the predictable 32-bit alignment of R-, I- and J-type words so that single-event upset detection can be performed with simple parity checks on fixed bit fields.

Google’s TensorFlow Lite Micro runtime targets RISC-V embedded cores; the code generator deliberately keeps all hot loops in I-type load/store sequences because the 16-bit immediate field matches the small tensor offsets typical in quantized networks.

Qualcomm’s Hexagon DSP inside Snapdragon modems uses a RISC-V-compatible subset; the vector load instructions are encoded as I-type so the immediate can specify byte offsets inside cache-line-sized vector registers without needing a separate address-calculation instruction.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| 32-bit word and bit fields | Every format is exactly 32 bits; you must be comfortable slicing and concatenating fields. |
| Register file with two read ports and one write port | R-type and I-type both read rs and rt; understanding port limits explains why rd is written in the same cycle. |
| Sign-extension of immediates | I-type immediates are sign-extended; without this you cannot correctly compute addresses or branch targets. |
| Program counter and byte addressing | J-type and branch offsets are word-aligned; you must know why the two least-significant bits are implicitly zero. |

If any row above is unfamiliar, pause and review the corresponding concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the opcode field
All MIPS and RISC-V instructions begin with a 6-bit opcode that tells the decoder which of the three formats to expect.  
Example: the instruction `add $t0,$t1,$t2` begins with opcode 000000.  
Formal statement:  
$$ \text{opcode} = \text{IR}[31:26] $$  
> [!WARNING]  
> Treating any later field as opcode will make the control unit route the instruction to the wrong datapath, silently executing the wrong operation.

### Step 2 — R-type: three registers and a funct code
When opcode = 000000 the remaining bits split into rs, rt, rd, shamt and funct.  
Example: `add $t0,$t1,$t2` uses rs=01001, rt=01010, rd=01000, funct=100000.  
Formal layout:  
$$ \text{R-type} = \underbrace{\text{opcode}}_{6}\ \underbrace{\text{rs}}_{5}\ \underbrace{\text{rt}}_{5}\ \underbrace{\text{rd}}_{5}\ \underbrace{\text{shamt}}_{5}\ \underbrace{\text{funct}}_{6} $$  
> [!WARNING]  
> Forgetting that rd is the destination (not rt) produces a write to the wrong register and corrupts later computations.

### Step 3 — I-type: replace rd with a 16-bit immediate
When the operation needs a constant (addi, lw, sw, beq), the format re-uses the same opcode and rs/rt fields but substitutes a 16-bit immediate for rd+shamt.  
Example: `addi $t0,$t1,5` has opcode 001000, rs=01001, rt=01000, immediate=0000000000000101.  
Formal layout:  
$$ \text{I-type} = \underbrace{\text{opcode}}_{6}\ \underbrace{\text{rs}}_{5}\ \underbrace{\text{rt}}_{5}\ \underbrace{\text{imm}}_{16} $$  
> [!WARNING]  
> The immediate must be sign-extended; treating it as unsigned produces incorrect negative offsets for loads and branches.

### Step 4 — J-type: 26-bit jump target
When opcode = 000010 (j) or 000011 (jal) the remaining 26 bits become a word-aligned target address.  
Example: `j 0x00400000` places 0x0100000 in the address field.  
Formal layout:  
$$ \text{J-type} = \underbrace{\text{opcode}}_{6}\ \underbrace{\text{address}}_{26} $$  
> [!WARNING]  
> The address is shifted left by two bits before being written into the PC; omitting the shift lands the program on an unaligned instruction and usually triggers an exception.

### Step 5 — RISC-V variant note
RISC-V keeps the same opcode-in-first-six-bits rule but merges J-type functionality into a U-type format for auipc and a J-type for jal; the underlying principle of early opcode inspection remains identical.

## 5. Worked examples — har step show karo

**Example 1 — Encode an R-type add**  
*Given:* `add $s0, $s1, $s2` (registers 16, 17, 18).  
*Find:* 32-bit machine word.  
Step 1: opcode = 000000.  
Step 2: rs = 10001, rt = 10010, rd = 10000, shamt = 00000, funct = 100000.  
Step 3: Concatenate → 00000010001100101000000000100000.  
*Why* each field was placed: opcode first for decoder, rs and rt for register-file read ports, rd for write port, funct to select ALU add.  
**00000010001100101000000000100000**

*Reflection:* The example is simple yet forces correct ordering of rd versus rt.

**Example 2 — Encode an I-type addi**  
*Given:* `addi $t0, $t1, -3`.  
*Find:* machine word.  
Step 1: opcode = 001000.  
Step 2: rs = 01001, rt = 01000.  
Step 3: imm = 1111111111111101 (sign-extended −3).  
**00100001001010001111111111111101**

*Reflection:* Sign-extension of the immediate is the only non-obvious step.

**Example 3 — Encode a branch**  
*Given:* `beq $t0, $t1, label` at PC = 0x00400000, label at 0x00400008.  
*Find:* offset.  
Offset = (0x00400008 − 0x00400004) >> 2 = 1.  
Machine word: opcode 000100, rs 01000, rt 01001, imm 0000000000000001.  
**00010001000010010000000000000001**

*Reflection:* The PC+4 rule and word alignment must both be applied.

**Example 4 — Decode a J-type word**  
*Given:* 0x08000004.  
*Find:* target address.  
Step 1: opcode = 000010 → J-type.  
Step 2: address = 0x0000004.  
Step 3: target = (PC+4)[31:28] || (address << 2) = 0x10000010.  
**0x10000010**

*Reflection:* The upper four bits come from the current PC, a frequent source of confusion.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Writing to rt instead of rd in R-type | Students copy assembly order literally              | Always draw the three register boxes before writing bits |
| Forgetting sign-extension of I-type immediate | Immediate looks positive in the bit pattern         | Mentally extend the sign bit before any arithmetic   |
| Shifting J-type address by 2 bits incorrectly | Confusing byte vs word addressing                   | Remember the two trailing zeros are implicit         |
| Using the same register number for rs and rd | Overlooking that R-type needs three distinct ports  | Check that rd ≠ rs and rd ≠ rt before encoding       |
| Treating branch offset as absolute address | Mixing J-type and I-type address calculation        | Always compute relative to PC+4                      |
| Ignoring funct field in R-type    | Assuming opcode alone determines the operation      | Verify funct bits match the required ALU operation   |
| Mis-aligning 26-bit J address     | Forgetting to concatenate PC[31:28]                 | Draw the four-bit prefix explicitly                  |

## 7. The textbook-precise statement
Patterson and Hennessy, *Computer Organization and Design*, 5e, §2.5: “Every MIPS instruction is 32 bits long and begins with a 6-bit opcode field. Three instruction formats exist: R-type (register), I-type (immediate), and J-type (jump). The R-type format contains a 5-bit rs field, a 5-bit rt field, a 5-bit rd field, a 5-bit shamt field and a 6-bit funct field. The I-type format replaces the rd and shamt fields with a 16-bit signed immediate. The J-type format replaces the remaining 26 bits with a word-aligned target address. All formats share the property that the opcode occupies bits 31–26, enabling single-cycle format identification.”

## 8. Visual — diagram or schematic
```
31          26 25     21 20     16 15     11 10      6 5        0
+-------------+---------+---------+---------+---------+----------+
|   opcode    |   rs    |   rt    |   rd    |  shamt  |  funct   |  R-type
+-------------+---------+---------+---------+---------+----------+
|   opcode    |   rs    |   rt    |          immediate           |  I-type
+-------------+---------+---------+------------------------------+
|   opcode    |                 address (26 bits)                |  J-type
+-------------+--------------------------------------------------+
```

## 9. The memory technique
1. **The hook** — Picture three train carriages: the first six seats are always the “opcode conductor”; the R carriage has three passenger windows (rs,rt,rd), the I carriage replaces the last window with a long bench (immediate), and the J carriage removes all windows and puts one long luggage rack (26-bit address).  
2. **What to overlearn** — opcode always bits 31-26; R-type funct selects ALU op; I-type immediate is sign-extended; J-type address is shifted left by 2.  
3. **Spaced-repetition schedule** — Review the three bit diagrams after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — If you forget a layout, start from the datapath needs: three registers → R-type; constant → I-type; long jump → J-type.

## 10. What this unlocks
Mastery of these formats lets you read raw memory dumps, write tiny assemblers, understand pipeline hazard detection, and design your own RISC-V extensions.  
- Next topics: pipeline stages, hazard detection unit, control signals for each format.  
- Later techniques: superscalar issue logic that routes instructions by format in a single cycle.  
- Practical skill: writing a minimal linker that only has to handle R/I/J relocation types.

## 11. Self-check — five questions, no answers
1. Encode `sub $t3,$t4,$t5` into a 32-bit word and state which format is used.  
2. A branch instruction contains the immediate 0xFFFC; what is the signed byte offset?  
3. Given the word 0x0C00000C, is it R-, I- or J-type and what is the jump target assuming PC = 0x10000000?  
4. Why does the R-type format contain a shamt field that I-type does not?  
5. If the funct field of an R-type instruction is accidentally zero, which instruction will the ALU most likely execute and why?