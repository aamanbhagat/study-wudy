## What it is
Pipelining is a technique in CPU design where multiple instructions are overlapped in execution, much like an assembly line. The 5-stage pipeline is the classic model that breaks down the processing of a single instruction into five distinct, sequential steps: Fetch, Decode, Execute, Memory access, and Write back. By having different instructions in different stages simultaneously, the processor can achieve a much higher instruction throughput.

## Why it matters
Pipelining is the fundamental principle behind the performance of virtually all modern processors. In aerospace, flight control systems require deterministic, high-throughput computation to react in real-time. In physics simulations and machine learning, processing vast datasets and performing trillions of floating-point operations would be infeasible without the instruction-level parallelism that pipelining provides. Understanding this concept is the first step to understanding how modern high-performance computing works.

## When to study it
Before tackling this, you must have a solid grasp of the non-pipelined, single-cycle processor datapath. Specifically, you should understand:
1.  The Von Neumann architecture (stored-program computer).
2.  The basic instruction cycle: Fetch, Decode, Execute.
3.  The roles of key hardware components: Program Counter (PC), Instruction Memory, Register File, Arithmetic Logic Unit (ALU), and Data Memory.
4.  The difference between instruction types like R-type (register-register), I-type (immediate), and memory-access (load/store).

If these concepts are not clear, review them first. Pipelining is an optimization of this base architecture; you cannot optimize what you do not understand.

## How to study it (step by step)
1.  **Review the Single-Cycle Datapath:** Draw the datapath for a single-cycle MIPS-like processor. Calculate the clock period: it's determined by the longest possible path, typically a `load` instruction. Internalize why this is inefficient—every simple instruction, like `add`, is forced to take as long as the slowest one.
2.  **Partition the Datapath:** Take your single-cycle datapath diagram and draw vertical lines separating it into the five logical stages. You are physically inserting "pipeline registers" between these stages. Understand that these registers hold the state of an instruction as it moves from one stage to the next.
3.  **Trace a Single R-type Instruction:** Follow an instruction like `add $t0, $t1, $t2` through the five stages. At each stage, write down exactly what is happening. For example, in the Decode stage, the values from registers `$t1` and `$t2` are fetched. In the Execute stage, the ALU adds them.
4.  **Trace a `load` Instruction:** Now, trace `lw $t0, 32($s0)`. Note which stages are used differently. The ALU is used for address calculation in the EX stage, the Data Memory is read in the MEM stage, and the result is written to the register file in the WB stage. This shows how the hardware is generalized.
5.  **Draw a Time-Space Diagram:** This is the crucial visualization. Draw a table with clock cycles on the x-axis and instructions on the y-axis. Fill in the cells with the pipeline stage (F, D, E, M, W). Observe the staggered, overlapping pattern.
6.  **Calculate Ideal Speedup:** Derive the performance gain. Let $\tau$ be the time for one stage (assuming balanced stages). In a non-pipelined machine, one instruction takes $k\tau$ time for a $k$-stage pipeline. In a pipelined machine, after an initial fill-up period, one instruction completes every $\tau$ time. For $n$ instructions, the speedup $S$ approaches $k$ as $n \to \infty$.
    $$ S = \frac{\text{Time}_{\text{non-pipelined}}}{\text{Time}_{\text{pipelined}}} = \frac{n \times (k\tau)}{(k+n-1)\tau} \approx \frac{n k \tau}{n \tau} = k $$

## Key ideas, with intuition
1.  **The Assembly Line Analogy:** This is the most powerful intuition. A car factory does not build one car from start to finish before starting the next. It has stations: chassis, engine, paint, etc. While one car is being painted, the next car is having its engine installed. The factory's output (throughput) is one car per the time of the slowest station, not the total time to build one car. The pipeline stages are the stations.
2.  **Throughput, not Latency:** Pipelining does *not* reduce the time it takes for a single instruction to complete (its latency). In fact, due to the overhead of the pipeline registers, latency slightly increases. Its power comes from increasing the number of instructions completed per unit of time (throughput).
3.  **The Five Stages (IF, ID, EX, MEM, WB):**
    *   **IF (Instruction Fetch):** Get the next instruction from memory, using the address in the Program Counter (PC). Increment the PC.
    *   **ID (Instruction Decode):** Decode the instruction's opcode to see what it is. Fetch any required values from the register file.
    *   **EX (Execute):** The ALU performs the operation. For an `add`, it adds two numbers. For a `load`, it calculates the memory address by adding the offset to the base register value.
    *   **MEM (Memory Access):** If the instruction is a `load` or `store`, the processor reads from or writes to data memory. Other instructions, like `add`, do nothing in this stage.
    *   **WB (Write Back):** The result of the operation (from the ALU in EX or from memory in MEM) is written back into the destination register in the register file.
4.  **Pipeline Registers are Essential:** Between each stage is a block of registers (e.g., IF/ID, ID/EX, EX/MEM, MEM/WB). At the end of each clock cycle, everything computed in a stage is saved to the next pipeline register. This isolates the stages from each other, allowing stage $i$ to work on instruction $n$ while stage $i+1$ works on instruction $n-1$. They are the conveyor belt between stations.

## Worked example
Let's trace three independent instructions through a 5-stage pipeline where each stage takes one clock cycle.
Instructions:
1. `add $r3, $r1, $r2`
2. `sub $r5, $r3, $r4`  *(Note: For this example, we assume no data hazard handling. We will cover that later.)*
3. `and $r6, $r7, $r8`

We will use a time-space diagram. `IF`=Fetch, `ID`=Decode, `EX`=Execute, `MEM`=Memory, `WB`=Write Back.

| Clock Cycle | 1    | 2    | 3    | 4    | 5    | 6    | 7    |
|-------------|------|------|------|------|------|------|------|
| `add`       | IF   | ID   | EX   | MEM  | WB   |      |      |
| `sub`       |      | IF   | ID   | EX   | MEM  | WB   |      |
| `and`       |      |      | IF   | ID   | EX   | MEM  | WB   |

**Step-by-step analysis:**
*   **Cycle 1:** The `add` instruction is fetched (IF).
*   **Cycle 2:** The `add` instruction moves to Decode (ID). The `sub` instruction is fetched (IF).
*   **Cycle 3:** The `add` moves to Execute (EX). The `sub` moves to Decode (ID). The `and` is fetched (IF). The pipeline is now full.
*   **Cycle 4:** `add` -> MEM, `sub` -> EX, `and` -> ID.
*   **Cycle 5:** The `add` instruction completes by writing its result back (WB). `sub` -> MEM, `and` -> EX.
*   **Cycle 6:** The `sub` instruction completes (WB). `and` -> MEM.
*   **Cycle 7:** The `and` instruction completes (WB).

**Reflection:**
*   **Total Time:** It took 7 clock cycles to complete 3 instructions.
*   **Comparison:** A non-pipelined, single-cycle machine where each instruction takes 5 cycles would have taken $3 \times 5 = 15$ cycles. A multi-cycle (but non-pipelined) machine would also take 15 cycles.
*   **Throughput:** After the pipeline filled up (at cycle 5), an instruction finished on every single clock cycle. This demonstrates the increase in throughput. The time to execute $n$ instructions in a $k$-stage pipeline is $(k+n-1)$ cycles. Here, $(5+3-1) = 7$.

## Diagrams
A simplified block diagram of the 5-stage pipeline datapath:

```text
             +------+   +-------+   +------+   +-----+   +----+
Instruction -> |  IF  |-->| IF/ID |-->|  ID  |-->|ID/EX|-->| EX |--> ...
Memory       +------+   | Regs  |   | Regs |   |Regs |   +----+
   ^                    +-------+   | File |   +-----+
   |                                +------+
   |
  PC
```
...continuing the datapath:
```text
 ... -->| EX |-->| EX/MEM |-->| MEM |-->|MEM/WB|-->| WB |
        +----+   |  Regs  |   +-----+   | Regs |   +----+
                 +--------+   |Data |   +------+     ^
                              |Mem  |                |
                              +-----+                |
                                               (to Reg File)
```

A time-space diagram showing instruction overlap:

```text
Clock Cycle ->
      1    2    3    4    5    6    7
I_1   IF   ID   EX   MEM  WB
I_2        IF   ID   EX   MEM  WB
I_3             IF   ID   EX   MEM  WB
I_4                  IF   ID   EX   MEM  WB
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**F**risky **D**ogs **E**at **M**ore **W**ings" for the 5 stages: **F**etch, **D**ecode, **E**xecute, **M**emory, **W**rite back. Visualize a hyperactive dog happily devouring chicken wings.
2.  **Formulas/Facts to Overlearn:**
    *   The 5 stages in order: **IF, ID, EX, MEM, WB**. Know what each one does.
    *   Ideal pipeline speedup for a $k$-stage pipeline is $k$.
    *   Time to execute $n$ instructions in a $k$-stage pipeline is $(k+n-1)$ clock cycles (assuming no stalls).
3.  **Spaced Repetition Schedule:** Review these facts and the assembly line analogy at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively redraw the time-space diagram from memory each time.
4.  **First Principles Pathway:** If you forget everything, rebuild it from the ground up. An instruction must be:
    *   Brought from memory (Fetch).
    *   Understood by the processor (Decode).
    *   Acted upon (Execute).
    *   It might need to access data memory (Memory).
    *   Finally, its result must be stored (Write Back).
    These are the logical, non-negotiable steps. Pipelining just overlaps them.

## Common mistakes
1.  **Confusing Latency and Throughput:** Believing that pipelining makes a single instruction run faster. It does not. It increases the number of instructions finished per second.
2.  **Forgetting Pipeline Registers:** Thinking of the stages as just abstract concepts. They are physically separated by registers that latch the data at each clock edge. Without these registers, the values from different instructions would collide and corrupt each other. The registers are the "walls" between the assembly line stations.
3.  **Ignoring Hazards:** The worked example assumed no dependencies. In reality, if instruction 2 needs the result from instruction 1, the pipeline must be "stalled" (paused). Assuming ideal speedup in all cases is wrong; this is just the theoretical maximum.

## Self-check
1.  An instruction `sw $t0, 16($s1)` (store word) writes a value to memory. In which of the five stages does the memory write actually occur?
2.  A processor with a 5-stage pipeline executes 100 instructions. Assuming no hazards or stalls, and the first instruction enters the pipeline at cycle 1, at which clock cycle does the final instruction complete its Write Back stage?
3.  Consider these two sequential instructions:
    `add $t0, $t1, $t2`
    `sub $t3, $t0, $t4`
    The `sub` instruction needs the value of `$t0` which is produced by the `add`. Following the pipeline diagram, in which clock cycle is the result of the `add` written back to the register file? In which clock cycle does the `sub` instruction need to *read* the value of `$t0` from the register file? What problem does this create?