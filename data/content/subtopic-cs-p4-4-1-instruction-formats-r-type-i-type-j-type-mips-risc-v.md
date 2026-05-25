## What it is
An instruction format is the blueprint for a single CPU command, defining how a 32-bit (or 64-bit) binary word is structured into distinct fields. These fields tell the processor what operation to perform (the opcode) and what data to use (the operands), such as registers or constant values. The R-type, I-type, and J-type formats are three fundamental blueprints used in RISC architectures like MIPS and RISC-V.

## Why it matters
This is the direct interface between software and hardware. Compilers translate your high-level code (C++, Python) into these binary instruction formats, which is what the CPU actually executes. Understanding these formats is critical for performance engineering in physics simulations or machine learning, as it allows you to reason about code size, cache efficiency, and pipeline behavior, which directly impact the speed of complex calculations on GPUs or specialized accelerators.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Binary and Hexadecimal Representations:** You must be fluent in converting between decimal, binary, and hex.
2.  **Two's Complement:** Understand how signed integers are represented in binary.
3.  **Basic CPU Organization:** Know the roles of the Program Counter (PC), registers, the Arithmetic Logic Unit (ALU), and memory.
4.  **The Fetch-Decode-Execute Cycle:** Understand this fundamental process of CPU operation.

If any of these are weak, review them first. We are building directly on that foundation.

## How to study it (step by step)
1.  **Pose the core problem:** Start with a simple C statement: `int a, b, c; a = b + c;`. Ask yourself: "How can I represent this as a 32-bit number that a machine can understand?" This forces the need for a structured format.
2.  **Derive R-type from first principles:** For `a = b + c`, let's say `a`, `b`, `c` are in registers `$t0`, `$s1`, `$s2` respectively. The assembly is `add $t0, $s1, $s2`. We need to encode: the operation (`add`), a destination register (`$t0`), and two source registers (`$s1`, `$s2`). Map these needs to fields: `opcode`, `funct`, `rd`, `rs`, `rt`. This naturally leads to the R-type (Register-type) format.
3.  **Derive I-type from a new problem:** Now consider `a = b + 5;`. The assembly is `addi $t0, $s1, 5`. We now need to encode an operation (`addi`), one source register (`$s1`), a destination register (`$t0`), and a constant value (`5`). The R-type format has no space for a constant. This forces the creation of the I-type (Immediate-type) format, which repurposes some fields to hold this immediate value.
4.  **Derive J-type from control flow:** Consider a `goto loop;` statement. The assembly is `j loop`. Here we only need to encode the operation (`j`) and the target address (`loop`). To maximize the size of the address we can jump to, we dedicate almost all the bits to the address, creating the J-type (Jump-type) format.
5.  **Encode one of each:** Find a MIPS reference sheet online (with opcodes and register numbers). Manually encode one simple instruction of each type into its 32-bit binary representation, then convert to hex. For example: `add $t0, $t1, $t2` (R-type), `ori $t0, $t1, 0xFF` (I-type), and a simple `j` instruction.
6.  **Verify with a tool:** Use an online MIPS assembler/disassembler. Input the assembly instruction you encoded and check if it produces the same hex value you calculated. Then, input your hex value and see if it decodes back to the correct instruction. This provides immediate, concrete feedback.

## Key ideas, with intuition
1.  **Instructions are just numbers:** A CPU doesn't "read" text like `add`. It reads a binary number, and the specific pattern of bits triggers specific electronic circuits. The instruction format is the agreed-upon codebook for these patterns.
2.  **The Opcode is the map:** The first 6 bits (the opcode) are the most important. The CPU's control unit looks at these bits *first* to decide which format (R, I, or J) the rest of the 32 bits follow. It's like the first byte of a file telling you if it's a PDF, JPG, or ZIP; it determines how you interpret everything else.
    $$ \text{Instruction} = \underbrace{Opcode}_{\text{What format is this?}} \underbrace{\text{Operands}}_{\text{Data for the operation}} $$
3.  **Format follows function:** The three formats exist because of a fundamental trade-off in a fixed 32-bit instruction length. You can't have everything at once.
    *   **R-type (Register):** For when all your operands are in registers. It provides fields for three separate registers. It's for pure computation.
    *   **I-type (Immediate):** For when one operand is a small constant (an "immediate" value). It sacrifices one register field to create space for this constant. It's for computation with constants, loading data from memory (`lw $t0, 16($s0)`), and conditional branching.
    *   **J-type (Jump):** For when you need to change the Program Counter by a large amount (an unconditional jump). It sacrifices almost everything to create a large field for the target address.

## Worked example
Let's encode the MIPS assembly instruction `add $t1, $s1, $s2` into a 32-bit hexadecimal number.

**1. Identify the Instruction Type and Format:**
*   The `add` instruction operates on three registers. This is a classic R-type instruction.
*   The R-type format is: `opcode (6) | rs (5) | rt (5) | rd (5) | shamt (5) | funct (6)`
    *   The numbers in parentheses are the bit-widths of each field.

**2. Look up Opcode and Funct codes:**
*   From a MIPS reference sheet, all R-type instructions have an `opcode` of 0.
*   The specific `add` operation is defined by the `funct` field, which is `100000` in binary (or 32 in decimal).

**3. Identify Register Numbers:**
*   MIPS registers have standard numbers.
    *   `$s1` (source) is register 17, or `10001` in binary. This goes into the `rs` field.
    *   `$s2` (source) is register 18, or `10010` in binary. This goes into the `rt` field.
    *   `$t1` (destination) is register 9, or `01001` in binary. This goes into the `rd` field.

**4. Handle the Shift Amount (`shamt`):**
*   The `shamt` field is for shift instructions. Since `add` is not a shift, this field is `00000`.

**5. Assemble the Binary Instruction:**
*   We concatenate the fields in the correct order:
    `opcode | rs    | rt    | rd    | shamt | funct`
    `000000 | 10001 | 10010 | 01001 | 00000 | 100000`

**6. Group and Convert to Hexadecimal:**
*   Group the 32 bits into 8 groups of 4:
    `0000 | 0010 | 0011 | 0010 | 0100 | 1000 | 0010 | 0000`
*   Convert each 4-bit group to its hex equivalent:
    `0` `2` `3` `2` `4` `8` `2` `0`
*   The final result is `$0x02324820`.

**Reflection:** Each step was a direct translation from the symbolic assembly language to the machine's numerical language. We identified the *type* of operation to pick the correct blueprint (R-type), then filled in each field by looking up standard codes and register numbers, resulting in the final 32-bit word.

## Diagrams
```text
31                                                             0
+--------+--------+--------+--------+--------+--------+--------+--------+
|        |        |        |        |        |        |        |        |
+--------+--------+--------+--------+--------+--------+--------+--------+
<------------------------------ 32 bits ------------------------------>

R-type: [ op: 6 | rs: 5 | rt: 5 | rd: 5 | shamt: 5 | funct: 6 ]
          ^       ^       ^       ^         ^          ^
          |       |       |       |         |          +-- Function code (distinguishes R-types)
          |       |       |       |         +------------- Shift amount
          |       |       |       +----------------------- Destination register
          |       |       +------------------------------- Source register 2
          |       +--------------------------------------- Source register 1
          +----------------------------------------------- Opcode (0 for R-type)

I-type: [ op: 6 | rs: 5 | rt: 5 |         immediate: 16         ]
          ^       ^       ^       ^
          |       |       |       +--------------------------- Constant or address offset
          |       |       +----------------------------------- Source/Dest register
          |       +------------------------------------------- Base register
          +--------------------------------------------------- Opcode (e.g., addi, lw, beq)

J-type: [ op: 6 |                  address: 26                 ]
          ^       ^
          |       +------------------------------------------- Jump target address
          +--------------------------------------------------- Opcode (e.g., j, jal)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "RIJ" -> **R**egisters, **I**mmediates, **J**umps. The name of the format tells you its primary operand type.
    *   **R**-type is for operations between **R**egisters.
    *   **I**-type is for operations with an **I**mmediate value (a constant).
    *   **J**-type is for **J**umps to a new address.
2.  **Facts to overlearn:** The exact field layouts. Burn these into memory.
    *   R-type: `op | rs | rt | rd | shamt | funct`
    *   I-type: `op | rs | rt | immediate`
    *   J-type: `op | address`
3.  **Spaced Repetition Schedule:** Review these formats and re-derive the `add` example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not skip a session.
4.  **First Principles Pathway:** If you forget the layouts, re-derive them from necessity.
    *   To add three registers (`add rd, rs, rt`), what do I need to specify? The operation itself (`add`), and three registers. This requires at least 4 fields, leading to the R-type structure.
    *   To add a register and a constant (`addi rt, rs, 100`), I need to specify the op, two registers, and a constant. A 32-bit word can't fit all that. The compromise is to combine the destination register with one of the source fields, freeing up space for the constant. This leads to the I-type structure.
    *   To jump (`j target`), I need the op and the target address. To maximize jump distance, I must give the address field as many bits as possible. This leads to the J-type structure.

## Common mistakes
1.  **Mixing up `rs`, `rt`, and `rd`:** In R-type instructions, the order is source (`rs`), source (`rt`), then destination (`rd`). In I-type instructions (like `addi rt, rs, imm`), the destination is `rt`. Pay close attention to the instruction's definition.
2.  **Forgetting the `funct` field:** Students often see the `opcode` is 0 for R-type and think that's the whole story. The control unit uses *both* the `opcode` and the `funct` code to determine the specific ALU operation for R-type instructions.
3.  **Miscalculating addresses:** The immediate in a J-type instruction is a *word* address, not a byte address. The CPU multiplies this value by 4 internally to get the final byte address. Forgetting this 4x factor is a common error in calculating jump targets.
4.  **Sign-extension for I-type:** The 16-bit immediate in I-type instructions is sign-extended to 32 bits before being used by the ALU. This means if the immediate value is negative (its most significant bit is 1), it will be correctly handled as a negative number. Forgetting this can lead to bugs with negative offsets or constants.

## Self-check
1.  Encode the MIPS instruction `sub $t5, $t6, $t7`. You will need to look up the `funct` code for `sub` and the register numbers for `$t5`, `$t6`, `$t7`.
2.  The instruction `lw $t0, 32($s0)` loads a word from memory. The address is calculated by `Reg[$s0] + 32`. This is an I-type instruction. Given that the opcode for `lw` is 35 (decimal), encode this instruction into hex.
3.  A MIPS processor fetches the instruction `0x20A5FFFF`. What is the assembly instruction? (Hint: First, convert to binary, identify the opcode, determine the format, and then decode each field).