## 1. The one-sentence answer
**The fetch-decode-execute cycle is the fundamental loop inside every CPU that repeatedly brings an instruction from memory, interprets what it means, and carries it out.**

Aap sochiye ek machine jo sirf ek hi cheez baar-baar karti hai: memory se ek instruction uthaana, usko samajhna, aur uske hisaab se kaam karna. Yeh teen actions ek saath milkar ek “cycle” banate hain aur yeh cycle har clock tick par chalti rehti hai jab tak power on hai. Har modern processor — chaahe woh phone ka ARM core ho ya laptop ka Intel CPU — isi loop par chal raha hota hai.

Is cycle ko samajhne se aapko pata chalta hai ki software ka har line ultimately hardware ke andar kaise physical signals ban jaata hai. Jab aap C++ ya Python mein code likhte ho, woh sab end mein isi teen-step process se guzarta hai.

> [!NOTE]
> The single most important insight is that a CPU never “understands” a program the way a human does; it only mechanically repeats the same three micro-operations on whatever binary pattern it finds at the program counter.

## 2. Why this matters — concrete and current
Intel’s latest Raptor Lake cores still implement the same cycle but with micro-op caches and out-of-order schedulers layered on top; every x86 instruction ultimately travels through fetch, decode and execute pipelines.

NASA’s Perseverance rover runs a RAD750 processor whose entire flight software executes via this cycle; a single missed fetch on Mars would have meant mission failure, so radiation-hardened memory and triple-voting registers protect each step.

Apple’s M-series chips use an ARM fetch-decode-execute pipeline whose decode stage can produce up to eight micro-ops per cycle; this width is the main reason Safari feels faster than equivalent Intel laptops on the same clock speed.

Modern ML accelerators such as Google’s TPU still contain small general-purpose fetch-decode-execute controllers that orchestrate the giant matrix units; without the cycle the systolic arrays would have no instructions to follow.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary address       | Every fetch needs a numeric location in memory            |
| Instruction encoding | Decode step only works if bits map to defined operations  |
| Clock signal         | The cycle is synchronised to rising edges of the clock    |
| Program counter      | Keeps track of which instruction to fetch next            |

If any of these four ideas are fuzzy, pause and revisit them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The program counter points to the next instruction
Aap memory ko ek badi array samajhiye jisme har location par ek number (instruction) rakha hai. Program counter (PC) ek register hai jo uss location ka address hold karta hai jise abhi fetch karna hai.

Concrete example: PC = 0x1000 par hai. Memory[0x1000] par value 0xE3A00005 (MOV R0, #5) rakhi hai.

Formal statement:  
$$
\text{PC} \leftarrow \text{address of next instruction}
$$

> [!WARNING]
> Agar PC galat address par point kare (segmentation fault ya buffer overflow), fetch step corrupted data laayega aur pura cycle crash ho jaayega.

### Step 2 — Fetch reads the instruction word from memory
Control unit PC ki value ko address bus par daalti hai, memory data bus par instruction word return karti hai, aur woh word Instruction Register (IR) mein store ho jaata hai. PC ko turant badha diya jaata hai taaki agla cycle sahi jagah se shuru ho.

Formal statement:  
$$
\text{IR} \leftarrow \text{Mem[PC]}, \quad \text{PC} \leftarrow \text{PC} + 4 \quad (\text{for 32-bit ISA})
$$

### Step 3 — Decode examines the bit fields of the instruction
Decode logic IR ke opcode bits ko dekhti hai aur decide karti hai ki kaunsa functional unit (ALU, load-store, branch) activate hoga. Register numbers aur immediate values bhi nikaale jaate hain.

Formal statement:  
$$
\text{opcode} = \text{IR}[31:26], \quad \text{rs} = \text{IR}[25:21], \quad \dots
$$

> [!WARNING]
> Illegal opcode decode stage ko invalid control signals de sakta hai; modern CPUs is case mein “undefined instruction” exception throw karte hain.

### Step 4 — Execute performs the actual operation
ALU, memory unit ya branch unit instruction ke hisaab se kaam karta hai. Result register mein likha jaata hai ya memory update hoti hai.

Formal statement:  
$$
\text{result} = \text{ALU}(\text{rs}, \text{rt}) \quad \text{or} \quad \text{Mem[addr]} \leftarrow \text{rt}
$$

### Step 5 — Write-back and loop back to fetch
Result ko destination register mein likha jaata hai (agar applicable ho). Control unit phir Step 1 par wapas jaati hai with the new PC value.

Formal statement:  
$$
\text{Reg[rd]} \leftarrow \text{result}, \quad \text{goto Step 1}
$$

## 5. Worked examples — har step show karo

**Example 1 — Single ADD instruction**  
*Given:* PC = 0x0004, Mem[0x0004] = 0x00430820 (add $t0, $v0, $v1)  
*Find:* state after one full cycle  

Fetch: IR ← 0x00430820, PC ← 0x0008  
Decode: opcode = 0x00, rs = 2, rt = 3, rd = 8, funct = 0x20  
Execute: ALU(2,3) → 5  
Write-back: Reg[8] ← 5  
**Final answer**  
PC = 0x0008, Reg[8] = 5  

*Reflection:* The example is simple because no memory or branch is involved; the same three micro-steps still occur.

**Example 2 — Load word with offset**  
*Given:* PC = 0x1000, instruction 0x8C0A0004 (lw $t2, 4($zero))  
Fetch, decode, then execute calculates address 0 + 4 and reads memory.  
**Final answer**  
Reg[10] holds value from Mem[4], PC = 0x1004  

*Reflection:* Address calculation happens inside the execute stage; students often forget that the offset is added before the memory access.

**Example 3 — Conditional branch taken**  
*Given:* beq $t0, $t1, offset = 8, both registers equal.  
Execute stage compares registers, finds equal, adds 8 to PC.  
**Final answer**  
PC becomes old PC + 4 + 8  

*Reflection:* Branch changes the PC before the next fetch; forgetting the “+4” offset is a common mistake.

**Example 4 — Pipeline hazard illustration (advanced)**  
*Given:* Two back-to-back dependent instructions in a 5-stage pipeline.  
Decode of second instruction stalls until write-back of first completes.  
**Final answer**  
One stall cycle inserted; effective CPI rises from 1 to 1.2 for that pair.  

*Reflection:* The basic cycle is unchanged; hardware merely inserts extra idle cycles between the logical steps.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting PC increment           | Students think fetch only reads memory              | Always write “PC ← PC + 4” immediately after fetch   |
| Confusing opcode with funct field | Both are bit fields but serve different roles       | Draw the MIPS instruction format once and label      |
| Assuming every instruction writes a register | Store and branch instructions do not                | Check the “RegWrite” control signal per instruction  |
| Ignoring exception entry          | PC must jump to handler address on fault            | Add an extra mux before PC that can select handler   |
| Thinking decode is free           | Variable-length ISAs need complex decoders          | Remember x86 decode stage can take multiple cycles   |
| Mixing logical and physical addresses | Modern CPUs translate addresses after fetch       | Keep MMU between cache and memory in your diagram    |

## 7. The textbook-precise statement
In Patterson & Hennessy, *Computer Organization and Design*, 5e, §4.3, the MIPS instruction execution is defined as a five-step sequence (IF, ID, EX, MEM, WB) governed by the finite-state machine whose next-state function is:

$$
\text{NextState} = f(\text{CurrentState}, \text{opcode}, \text{funct}, \text{Zero})
$$

All control signals are derived combinatorially from the opcode and funct fields; the architecture guarantees that every instruction completes exactly one iteration of the fetch-decode-execute loop before the program counter is updated for the subsequent iteration.

## 8. Visual — diagram or schematic
```
          +-----------+
          |   Clock   |
          +-----------+
               |
               v
+-----+    +--------+    +--------+    +--------+
| PC  |--->| Memory |--->| Decode |--->| Execute|
+-----+    | (Fetch)|    | Logic  |    |  Unit  |
   ^       +--------+    +--------+    +--------+
   |            |             |             |
   +------------+-------------+-------------+
                Write-back / PC update
```

## 9. The memory technique

1. **The hook** — Picture a librarian (fetch) who grabs a book, a translator (decode) who reads the title, and a worker (execute) who performs the task written inside; the librarian then walks to the next shelf.
2. **What to overlearn** — PC ← PC + 4 after every fetch; opcode is always the highest bits; branch changes PC inside the execute stage.
3. **Spaced-repetition schedule** — Review the five steps after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the control signals, redraw the datapath and ask “where must data travel after each arrow?”; the cycle reappears automatically.

## 10. What this unlocks
Once the fetch-decode-execute cycle is solid, you can understand pipelining, superscalar issue, branch prediction, and even GPU warps, because every one of them is simply an optimisation layered on top of the same three steps.

- Instruction pipelining (next major topic)
- Hazard detection and forwarding
- Micro-op fusion in x86
- Out-of-order execution windows

## 11. Self-check — five questions, no answers
1. If PC holds 0x2000 and the instruction at that address is 4 bytes, what value does PC hold after the fetch step?
2. In a 32-bit MIPS instruction, which bits determine whether the execute stage will use the ALU or the memory unit?
3. Why does a store instruction still perform a fetch and decode even though it never writes a register?
4. What happens to the cycle when an illegal opcode reaches the decode stage?
5. Draw the simplest datapath that can implement the five-step sequence and label every bus that carries data between fetch and execute.