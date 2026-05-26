## 1. The one-sentence answer
**Memory addressing modes define the rules by which a processor computes the effective address of an operand from the bits of an instruction.**

In the simplest case the operand value travels inside the instruction itself; in every other case the instruction supplies only a partial description and the hardware must combine that description with register contents or memory contents to locate the real data. The choice of mode therefore controls both the size of the instruction and the flexibility with which a program can reach data that lives in registers or in arbitrarily distant memory locations.

Different modes trade off encoding density against runtime calculation cost. Immediate and register modes require no memory reference beyond the fetch of the instruction; direct, indirect and indexed modes add one or more memory accesses whose latency the pipeline must hide.

> [!NOTE]
> The effective address is never the same as the instruction address; confusing the two produces the single most common off-by-one error when students first simulate address-generation logic.

## 2. Why this matters — concrete and current
Modern ARMv8 cores in Apple M-series SoCs use immediate and register modes for the overwhelming majority of ALU operations inside the Firestorm and Avalanche execution units, allowing the scheduler to issue six instructions per cycle without cache traffic.

NVIDIA’s Hopper tensor cores rely on indexed addressing with a 64-bit base register plus a scaled index to stride through the massively tiled matrices that cuBLAS feeds to the tensor pipelines; a single mis-scaled index can destroy tile reuse and drop sustained throughput by more than 30 %.

RISC-V’s “Zba” bit-manipulation extension and the Linux kernel’s `copy_to_user` routines combine indexed and indirect modes to perform bounds-checked memory copies in a single addressing-mode calculation, eliminating an extra compare-and-branch in the hot path of every system call.

Intel’s Alder Lake performance cores still implement the legacy x86 direct and indirect modes for string instructions (`MOVS`, `CMPS`) so that micro-coded legacy BIOS and hypervisor code continue to run without recompilation; the extra address-generation unit required for these modes occupies silicon that could otherwise have been turned into another execution port.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Distinction between register and memory                           | Every addressing mode ultimately produces either a register number or a memory address. |
| Binary instruction encoding (opcode + fields)                     | The bits that survive after the opcode are exactly what each mode interprets.        |
| Effective address versus operand value                            | The mode decides whether the bits are the value or a pointer to the value.           |

## 4. Building the idea — from intuition to formalism

### Step 1 — The instruction supplies the operand directly
When the operand is known at compile time and fits inside the instruction word, the hardware simply extracts those bits and forwards them to the ALU. No further memory access occurs.

Example: the constant 42 appears inside an `ADD` instruction.

Formal statement:
$$
\text{EA} = \text{none},\quad \text{operand} = \text{immediate field}
$$

> [!WARNING]
> Treating an immediate as a memory address produces an illegal access to the low part of the address space.

### Step 2 — The operand already lives in a register
The instruction encodes only a register number; the register file supplies the value in the same cycle the instruction is decoded.

Formal statement:
$$
\text{EA} = \text{none},\quad \text{operand} = R[r]
$$

### Step 3 — The instruction contains the full memory address
The address bits are taken verbatim from the instruction and sent to the memory system. This is the classic “direct” mode.

Formal statement:
$$
\text{EA} = \text{address field}
$$

### Step 4 — The instruction points to a memory word that holds the address
An extra memory read is required to obtain the real address. This indirection allows the target address to be computed or loaded at runtime.

Formal statement:
$$
\text{EA} = M[\text{address field}]
$$

### Step 5 — The final address is the sum of a base and an index
A register supplies a dynamic offset that is added to either an immediate base or another register. The addition occurs in the address-generation unit before the memory request is issued.

Formal statement:
$$
\text{EA} = R[r_{\text{base}}] + R[r_{\text{index}}]\times s + d
$$
where \(s\) is a scale factor (commonly 1, 2, 4 or 8) and \(d\) is a displacement.

## 5. Worked examples — every step shown

**Example 1 — Immediate mode**  
*Given:* Instruction `ADD R3, #7` (immediate 7).  
*Find:* operand supplied to the ALU.  

- Extract the 8-bit immediate field → 00000111₂.  
  *Why:* immediate mode places the literal in the instruction itself.  
- Zero-extend or sign-extend according to ISA rules → 7₁₀.  
  *Why:* the ISA defines extension so the value is correctly interpreted.  
**7**

*Reflection:* No address calculation occurs; the only possible error is misinterpreting the sign bit.

**Example 2 — Register mode**  
*Given:* `MUL R1, R2, R3`.  
*Find:* operands for the multiplier.  

- Decode register specifiers 2 and 3.  
  *Why:* register mode supplies only register numbers.  
- Read register file ports simultaneously.  
  *Why:* register file is multi-ported.  
**R2 and R3 contents**

*Reflection:* Latency equals register-file access time only.

**Example 3 — Direct mode**  
*Given:* `LOAD R4, 0x1000`.  
*Find:* memory address.  

- Take the 16-bit address field 0x1000.  
  *Why:* direct mode uses the field verbatim.  
- Issue read request to address 0x1000.  
  *Why:* effective address equals the literal field.  
**0x1000**

*Reflection:* Instruction length grows with address width.

**Example 4 — Indexed mode**  
*Given:* `LOAD R5, [R6 + R7<<2 + 8]`.  
*Find:* effective address.  

- Read R6 = 0x2000, R7 = 0x0005.  
  *Why:* base and index registers supply runtime values.  
- Compute 0x2000 + (0x0005 × 4) + 8 = 0x2000 + 0x0014 + 8 = 0x201C.  
  *Why:* scale and displacement are fixed by the instruction encoding.  
**0x201C**

*Reflection:* One address-generation addition is hidden behind the memory pipeline stage.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Confusing immediate with direct   | Both appear as a literal in the instruction         | Check whether the bits are data or an address        |
| Forgetting the extra memory read in indirect mode | Students assume one memory reference total         | Count memory accesses per mode explicitly            |
| Scale factor omitted in indexed addressing | Assembly syntax hides the shift                     | Always write the scale in the effective-address formula |
| Sign-extension error on negative displacements | Displacement field is signed but treated as unsigned | Apply the ISA’s defined extension rule first         |
| Using PC-relative as “direct”     | Modern ISAs default to PC-relative for branches     | Distinguish PC-relative from absolute direct mode    |
| Register-indirect written as “register mode” | Both use a register number in the encoding          | Ask whether the register holds data or an address    |
| Overlooking alignment requirements | Indexed addresses may be unaligned                  | Verify the final EA satisfies the data-type alignment |

## 7. The textbook-precise statement
An addressing mode is a rule that maps the address-specifier fields of an instruction to an effective address EA or directly to an operand value. Formally, for each mode \(m\) there exists a function \(f_m\) such that
\[
\text{operand} = 
\begin{cases}
f_m(\text{instruction bits}, R, M) & \text{if } m \text{ yields a value}, \\
M[f_m(\text{instruction bits}, R)] & \text{if } m \text{ yields an address}.
\end{cases}
\]
See Patterson & Hennessy, *Computer Organization and Design*, 5e, §2.4, “Addressing Modes.”

## 8. Visual — diagram or schematic
```text
Instruction bits
+----------------+--------+--------+--------+
| opcode         | Rbase  | Rindex | disp   |
+----------------+--------+--------+--------+
                 |        |        |
                 v        v        v
             Register   Register   Sign-extend
             file       file
                 |        |        |
                 +---+----+        |
                     |             |
                     v             v
                 Barrel shifter    |
                     |             |
                     +------+------+
                            |
                            v
                    Adder (EA logic)
                            |
                            v
                    Effective Address
                            |
                            v
                         Memory
```
Labelled paths: base register, scaled index, displacement, final EA.

## 9. The memory technique

**The hook**  
Picture five doors labelled “Immediate,” “Register,” “Direct,” “Indirect,” and “Indexed.” Immediate hands you the number on the door; Register points to a pigeonhole in a cabinet; Direct gives the street number on the door; Indirect makes you open the door to find another address; Indexed adds the number on your shoe (the index register) to the door number.

**What to overlearn**  
- Immediate & register modes never touch memory for the operand.  
- Indirect mode adds exactly one extra memory reference.  
- Indexed mode always contains an adder in the address path.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the effective-address formula by asking: “Where is the next piece of information needed to locate the operand?” and follow the chain of registers or memory words until the datum itself appears.

## 10. What this unlocks
Mastery of these five modes lets you read any assembly listing, predict cache traffic, and choose the cheapest encoding for a given data-access pattern. The immediate next concepts that rest on this foundation are: PC-relative addressing, base-plus-offset stack-frame access, scaled-index addressing for arrays of structures, and the virtual-to-physical translation that occurs after the effective address has been computed.

## 11. Self-check — five questions, no answers
1. Write the effective-address expression for the x86 instruction `MOV EAX, [EBX + 4*ECX + 0x10]` and state which mode it uses.  
2. In a 32-bit RISC ISA limited to 16-bit immediates, how would you load the 32-bit constant 0xDEADBEEF using only immediate and register modes?  
3. Why does indirect addressing usually increase instruction latency even when the target address is already in the cache?  
4. A compiler emits an indexed load with scale factor 8. What data type is almost certainly being accessed?  
5. Identify the addressing-mode error in the following claim: “Direct mode is identical to immediate mode except the bits are treated as an address instead of a value.”