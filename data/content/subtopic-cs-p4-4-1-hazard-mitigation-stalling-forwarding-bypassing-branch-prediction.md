## What it is
In a pipelined processor, a **hazard** is a situation that prevents the next instruction in the instruction stream from executing during its designated clock cycle. **Hazard mitigation** refers to the techniques used to resolve these conflicts and keep the pipeline flowing, primarily **stalling** (pausing the pipeline), **forwarding** (creating data shortcuts), and **branch prediction** (guessing the outcome of conditional operations). These techniques are essential for realizing the performance gains of pipelining.

## Why it matters
High-performance computing, from supercomputers simulating galaxy formation to the GPU in your laptop training a neural network, depends on executing billions of instructions per second. Hazards are the fundamental bottleneck; mitigating them effectively is the difference between a processor achieving its theoretical peak performance and being perpetually stuck in traffic. In aerospace, flight control systems require deterministic, low-latency execution, making predictable hazard handling a matter of safety, not just speed.

## When to study it
Before tackling this, you must have a solid grasp of instruction set architectures (like MIPS or RISC-V) and, most importantly, the concept of a **5-stage RISC pipeline**:
1.  **IF** (Instruction Fetch)
2.  **ID** (Instruction Decode & Register Fetch)
3.  **EX** (Execute / Address Calculation)
4.  **MEM** (Memory Access)
5.  **WB** (Write Back)

You should also be able to identify the three types of data dependencies: Read-After-Write (RAW), Write-After-Read (WAR), and Write-After-Write (WAW). This lesson focuses on mitigating hazards arising from RAW dependencies (data hazards) and from branch instructions (control hazards).

## How to study it (step by step)
1.  **Draw the baseline.** Take two independent instructions, like `add $t0, $t1, $t2` followed by `add $t5, $t6, $t7`. Draw the 5-stage pipeline diagram, showing them executing without any issues, one starting each clock cycle. This is your ideal state.
2.  **Introduce a data hazard.** Now, change the second instruction to `add $t5, $t0, $t7`. This creates a Read-After-Write (RAW) dependency on register `$t0`. Draw the pipeline diagram again. Pinpoint the exact clock cycle where the second instruction's ID/EX stage needs the value of `$t0` and show where the first instruction's WB stage produces it. You've now visualized the hazard.
3.  **Solve with stalling.** Redraw the diagram from step 2. This time, insert "bubbles" (`nop` operations) into the pipeline for the second instruction after it's fetched, delaying it until the first instruction has completed its WB stage. Count the number of wasted clock cycles (the stall penalty).
4.  **Solve with forwarding.** Go back to the hazard diagram from step 2. Instead of stalling, draw a new path (an arrow) from the output of the first instruction's EX stage directly to the input of the second instruction's EX stage. This is a forwarding path. Observe how the stall is completely eliminated.
5.  **Introduce a control hazard.** Consider the sequence `beq $t0, $t1, L1` (branch if equal) followed by `add $t2, $t3, $t4`. The processor doesn't know whether to fetch the `add` instruction or the instruction at label `L1` until the `beq` is resolved in its EX stage. Draw the pipeline and see the 1-2 cycle delay this causes.
6.  **Solve with prediction.** Assume a simple "predict not-taken" strategy. The processor fetches the `add` instruction immediately after the `beq`. If the branch is indeed not taken, you've saved cycles. If it is taken, you must "flush" the incorrectly fetched `add` instruction from the pipeline (turn it into a `nop`) and restart fetch from `L1`. Calculate the performance penalty for a misprediction.

## Key ideas, with intuition
1.  **Hazards are Timing Problems.** The core issue is that a pipelined architecture overlaps instructions. A hazard occurs when an instruction `j` needs a result from a previous instruction `i`, but the pipeline's overlap means `j` reaches its "need" stage before `i` reaches its "produce" stage.
    $$
    \text{Hazard if: (Time instruction } j \text{ reads operand) < (Time instruction } i \text{ writes result)}
    $$
2.  **Stalling: The Brute-Force Stop.** Stalling is the simplest solution. The hardware detects a hazard and injects `nop` (no-operation) instructions, often called "bubbles," into the pipeline. This effectively freezes the earlier pipeline stages (like IF and ID) while allowing the later stages (EX, MEM, WB) for the older instruction to complete. It's safe but inefficient, like stopping all traffic at an intersection until one car passes.

3.  **Forwarding/Bypassing: An Intelligent Shortcut.** Why wait for data to be formally written back to the register file in the WB stage? The result is often available earlier, for instance, at the end of the EX stage (from the ALU) or the MEM stage (from the data memory). Forwarding hardware adds special data paths (multiplexers) to route these fresh results *directly* back to the inputs of the EX stage for subsequent instructions that need them, bypassing the register file.

4.  **Branch Prediction: A Calculated Gamble.** Control hazards arise from branches. We don't know the branch target address (or even if we'll branch at all) until the EX stage. Instead of waiting, the CPU *predicts* the outcome. A simple static prediction is "always predict not-taken" and continue fetching sequentially. A dynamic predictor uses a small memory (a Branch Target Buffer) to remember the outcomes of recent branches and make a more educated guess. If the guess is right, there's no penalty. If it's wrong, the pipeline must be flushed, and the work done on the wrong path is discarded, incurring a **branch misprediction penalty**.

## Worked example
Let's analyze a Read-After-Write (RAW) data hazard and solve it with forwarding.

**Code:**
```assembly
I1: add $s0, $t0, $t1   # $s0 = $t0 + $t1
I2: sub $t2, $s0, $t3   # $t2 = $s0 - $t3
```
Instruction `I2` needs the value of `$s0`, which `I1` produces.

**Scenario 1: No Forwarding (Stalls required)**

The value of `$s0` is written to the register file in cycle 5 (WB stage of `I1`). `I2` needs this value at the beginning of cycle 4 (its EX stage). This is impossible; the data isn't ready. The hardware must stall `I2` for two cycles.

```text
Clock Cycle ->   1    2    3    4    5    6    7
I1: add $s0...   IF   ID   EX   MEM  WB
I2: sub $t2...        IF   ID  (stall)(stall) EX   MEM  WB
                                 ^
                                 |
                                 Hazard Detected: $s0 not ready for I2's EX stage.
```
This sequence takes 7 cycles. The ideal would be 6. We lost 1 cycle to stalls (the pipeline is stalled for one cycle, which delays I2 by two stages relative to I1).

**Scenario 2: With Forwarding**

The result of `I1`'s `add` operation is available at the *end* of its EX stage (end of cycle 3). We can add hardware to forward this result directly from the ALU output of `I1` to the ALU input for `I2`.

```text
Clock Cycle ->   1    2    3    4    5    6
I1: add $s0...   IF   ID   EX   MEM  WB
I2: sub $t2...        IF   ID   EX   MEM  WB
                              ^----| Forwarding Path (EX -> EX)
```
*   **Step 1 (Cycle 3):** `I1` is in its EX stage. It calculates `$t0 + $t1`. At the end of this cycle, the result exists inside the pipeline in a register between the EX and MEM stages.
*   **Step 2 (Cycle 4):** `I2` enters its EX stage. The forwarding logic detects that `I2` needs `$s0` and that the result for `$s0` is available from the EX/MEM pipeline register of the previous instruction.
*   **Step 3 (Cycle 4):** A multiplexer at the input of the ALU selects the forwarded value from `I1` instead of the (stale) value of `$s0` read from the register file back in cycle 3. The hazard is resolved with zero stalls.

This sequence takes 6 cycles, achieving ideal throughput.

## Diagrams
Here is a diagram showing the data paths for the worked example. The first shows the problem, the second shows the forwarding solution.

**1. Data Hazard without Forwarding**

The value for `$s0` is only available in the register file *after* cycle 5, but `I2` needs it for its EX stage in cycle 4.

```text
Pipeline Stages:
       | c1 | c2 | c3 | c4 | c5 | c6 | c7 |
I1:add | IF | ID | EX |MEM | WB |    |    |   (produces $s0 here)
       |    |    |    |    |    |    |    |
I2:sub |    | IF | ID | .. | .. | EX |MEM | WB
       |    |    |    |    ^---- Needs $s0 here. Too late!
```

**2. Forwarding Path (EX-to-EX)**

A new hardware path is added to send the result from the end of `I1`'s EX stage directly to the beginning of `I2`'s EX stage.

```text
Pipeline Stages:
       | c1 | c2 | c3 | c4 | c5 | c6 |
I1:add | IF | ID | EX |MEM | WB |    |
       |    |    |  | |    |    |    |
       |    |    |  v |    |    |    | Forwarding Path
       |    |    |  | |    |    |    |
I2:sub |    | IF | ID | EX |MEM | WB |
       |    |    |    ^---- Needs $s0, gets it just in time.
```

## Memory technique — remember this forever
1.  **The Story: The Relay Race**
    *   **Pipelining** is a relay race. Each runner (pipeline stage) does their part and passes the baton (instruction) to the next.
    *   A **Data Hazard** is when the next runner needs a specific baton (a data result) that the previous runner hasn't finished preparing yet.
    *   **Stalling** is the entire team stopping and waiting. Inefficient.
    *   **Forwarding** is the runner, seeing his teammate is about to finish, running alongside him for the last few steps to grab the baton mid-stride instead of waiting at the formal handoff zone (the register file).
    *   A **Control Hazard (Branch)** is a fork in the track. **Branch Prediction** is betting on which path the race will take. If you guess wrong, the team has to run back to the fork and start down the other path (**pipeline flush**).

2.  **Formulas/Facts to Overlearn:**
    *   **RAW Hazard:** Instruction `j` reads a register after instruction `i` writes to it. This is the only true data dependency that requires forwarding or stalling.
    .
    *   **Load-Use Hazard:** `lw $t0, 0($t1)` followed by `add $t2, $t0, $t0`. Forwarding from MEM-to-EX is possible, but it still requires a 1-cycle stall because the loaded data is not available until the end of the MEM stage, and the `add` needs it at the start of its EX stage. Forwarding can't time-travel.
    .
    *   **Branch Mispredict Penalty:** The number of stages between instruction fetch (IF) and branch resolution (typically EX or MEM). For a 5-stage pipe resolving in EX, the penalty is 2 cycles (the two instructions fetched on the wrong path must be flushed).

3.  **Spaced Repetition Schedule:**
    *   Review these concepts tomorrow (1 day).
    *   Review again in 3 days.
    *   Review in one week (7 days).
    *   Review in two more weeks (16 days).
    *   Review in a month (35 days).

4.  **First Principles Pathway:**
    If you forget everything, draw the 5-stage pipeline (IF, ID, EX, MEM, WB) horizontally. Write two dependent instructions vertically. Trace them through the pipeline, one cycle at a time. You will physically see the "collision" where one instruction in an early stage (like ID/EX) needs a value from another instruction still in a later stage (like EX/MEM/WB). This visual conflict *is* the hazard. From there, you can reason: "What if I just wait?" (stalling) or "What if I could build a wire from this stage's output to that stage's input?" (forwarding).

## Common mistakes
1.  **Thinking Forwarding Solves Everything.** The classic mistake is forgetting the load-use hazard. Data from a `load` instruction is only available after the MEM stage. If the next instruction needs it in its EX stage, even with forwarding, a one-cycle stall is unavoidable.
2.  **Misidentifying the Hazard Type.** Confusing structural hazards (two instructions trying to use the same hardware, e.g., memory port, at the same time) with data hazards. Forwarding solves RAW data hazards, not structural ones.
3.  **Incorrectly Calculating Branch Penalty.** Students often count the number of "wrong path" instructions in the pipeline and call that the penalty. The penalty is the number of cycles lost. If a branch is resolved in the EX stage (cycle 3), the instructions fetched in cycles 2 and 3 are on the wrong path. The pipeline is flushed and fetch restarts in cycle 4, so 2 cycles are lost.
4.  **Forwarding Backwards in Time.** Drawing a forwarding path from an earlier instruction's MEM stage to a later instruction's EX stage is fine. Drawing a path from an instruction's EX stage to its own ID stage is not. Data flows forward through the pipeline with the instruction.

## Self-check
1.  Given the sequence `sub $t2, $t0, $t1`, `and $t3, $t2, $t0`, `or $t4, $t2, $t1`, identify all RAW data hazards. How many stall cycles would be needed without any forwarding?
2.  Consider a `lw $t0, 0($a0)` instruction followed immediately by a `sw $t0, 4($a0)`. Draw the 5-stage pipeline diagram assuming full forwarding capabilities are present. How many stall cycles, if any, are required? Justify your answer by referring to the specific pipeline stages where the data is produced and consumed.
3.  A processor has a 10-stage pipeline. Branch outcomes are determined in stage 6. The processor uses a dynamic branch predictor with 95% accuracy. For every 100 instructions, 20 are branches. Calculate the average number of cycles per instruction (CPI) lost due to branch mispredictions. The ideal CPI is 1.