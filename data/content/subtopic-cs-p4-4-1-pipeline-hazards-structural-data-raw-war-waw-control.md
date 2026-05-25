## What it is
Pipeline hazards are conditions in a processor's instruction pipeline that prevent the next instruction from executing in its designated clock cycle. They are fundamentally "traffic jams" in the CPU's assembly line, caused by resource conflicts, data dependencies, or changes in program flow. These jams force the pipeline to stall (insert bubbles) or flush, degrading performance.

## Why it matters
Maximizing instruction throughput is the core of high-performance computing. In aerospace, real-time flight control systems depend on predictable instruction execution times, which hazards disrupt. In physics simulations and machine learning, which are computationally bound, a stalled pipeline is wasted energy and time, directly increasing the cost and duration of complex calculations like fluid dynamics simulations or training a neural network.

## When to study it
You must have a solid, working knowledge of the classic 5-stage RISC pipeline: Instruction Fetch (IF), Instruction Decode (ID), Execute (EX), Memory Access (MEM), and Write Back (WB). You should be able to trace multiple, independent instructions through this pipeline on a cycle-by-cycle basis. If you cannot draw a pipeline timing diagram from memory, review that topic first.

## How to study it (step by step)
1.  **Diagram the Ideal:** Take three independent instructions (e.g., `ADD R1, R2, R3`; `SUB R4, R5, R6`; `OR R7, R8, R9`). Draw the 5-stage pipeline timing diagram, showing how a new instruction enters the pipeline every clock cycle without issue. This is your baseline.
2.  **Introduce a Data Hazard:** Now, use the sequence: `ADD R1, R2, R3` followed by `SUB R4, R1, R5`. Redraw the timing diagram. Pinpoint the exact cycle where the `SUB` instruction is in the ID stage and needs the value of `R1`, but the `ADD` instruction has not yet reached the WB stage to write it. This is a Read-After-Write (RAW) hazard.
3.  **Solve with Stalls:** Calculate how many "no-operation" cycles (bubbles) you must insert into the pipeline after the `ADD` to ensure `SUB` reads `R1` only after it has been written. Redraw the diagram with these stalls.
4.  **Solve with Forwarding:** Now, add "forwarding paths" (or bypassing) to your conceptual hardware. Draw arrows from the output of the `ADD`'s EX stage back to the input of the `SUB`'s EX stage, and from the MEM stage as well. Redraw the diagram showing how this hardware resolves the hazard without any stalls.
5.  **Introduce a Load-Use Hazard:** Analyze the sequence `LW R1, 0(R2)` followed by `ADD R3, R1, R4`. Diagram this with full forwarding. You will discover that even with forwarding, the data from memory is not available until the end of the MEM stage. This forces a one-cycle stall. This is a critical edge case.
6.  **Diagram a Control Hazard:** Use an instruction like `BEQ R1, R2, Target`. The pipeline fetches the instruction at `PC+4` before the branch condition (`R1 == R2`) is evaluated in the EX stage. Draw the pipeline diagram showing these incorrectly fetched instructions. Then, show how they must be "flushed" (converted to bubbles) if the branch is taken, representing the branch misprediction penalty.

## Key ideas, with intuition
1.  **Hazards are Timing Problems:** The core issue is that a pipelined architecture overlaps instructions that are supposed to execute sequentially. A hazard occurs when this overlap violates the original program's logic, forcing an instruction to wait for a result that isn't ready *at the right time*.
2.  **Structural Hazards: Resource Scarcity.** This is the simplest hazard. Two different pipeline stages need the same piece of hardware in the same clock cycle. The classic example is a single, unified memory unit. In cycle 4, one instruction is in the MEM stage (accessing data), while another is in the IF stage (fetching an instruction). If they both need the same memory port, one must wait.
    $$ \text{Stage}_i(\text{Inst}_A) \text{ and Stage}_j(\text{Inst}_B) \text{ need Resource}_k \text{ at time } t $$
3.  **Data Hazards: Incorrect Data Flow.** These arise from data dependencies between instructions.
    *   **Read-After-Write (RAW):** The most common and intuitive hazard. An instruction tries to read a register before a preceding instruction has written its result to it. This is a "true" dependency.
        `I1: ADD R1, R2, R3`
        `I2: SUB R4, R1, R5`  // I2 needs the result of I1.
    *   **Write-After-Read (WAR):** An instruction tries to write to a register before a preceding instruction has read its *original* value. This is an "anti-dependence" and doesn't cause stalls in simple in-order pipelines but is a major issue for out-of-order execution.
        `I1: ADD R3, R1, R2`  // I1 needs the old value of R1.
        `I2: SUB R1, R4, R5`  // I2 wants to overwrite R1. I2 cannot proceed until I1 has finished reading the old R1.
    *   **Write-After-Write (WAW):** An instruction tries to write to a register before a preceding instruction has written to it. An "output dependence." Again, mainly an issue for out-of-order execution where instructions might complete in a different order than they were fetched.
        `I1: MUL R1, R2, R3` // Slow instruction
        `I2: ADD R1, R4, R5` // Fast instruction. I2 might finish first, but we need I1's result to be the final one in R1.
4.  **Control Hazards: Wrong Path.** These arise from branch, jump, and call instructions. The pipeline doesn't know which instruction to fetch next until the branch condition is evaluated late in the pipeline (e.g., in the EX stage). In the meantime, it fetches instructions sequentially, assuming the branch is not taken. If the branch *is* taken, the incorrectly fetched instructions must be discarded.
    $$ \text{Penalty} = (\text{Branch Resolution Stage} - 1) \times \text{Cycles} $$

## Worked example
We will analyze a classic **load-use RAW data hazard**.

**Instructions:**
1.  `LW R1, 0(R10)`  // Load word from memory address in R10 into R1
2.  `ADD R2, R1, R3`   // Add contents of R1 and R3, store in R2

**Assumptions:**
*   A standard 5-stage RISC pipeline (IF, ID, EX, MEM, WB).
*   Full forwarding hardware is present. This means the result from the EX/MEM and MEM/WB pipeline registers can be fed directly back into the ALU input for the next instruction.

**Step-by-step analysis:**

1.  **Cycle 1:** The `LW` instruction is fetched (IF).
2.  **Cycle 2:** `LW` moves to ID. `ADD` is fetched (IF).
3.  **Cycle 3:** `LW` moves to EX (calculates memory address). `ADD` moves to ID. The `ADD` instruction decodes and sees it needs `R1`. The pipeline's hazard detection unit sees that `R1` is the destination of the in-flight `LW` instruction. A dependency exists.
4.  **Cycle 4:** `LW` moves to MEM (reads data from memory). The `ADD` instruction needs the value of `R1` for its EX stage. Can we forward it? The data for `R1` is only available from memory at the *end* of the MEM stage. It is not available at the beginning of cycle 4 for the `ADD`'s EX stage. Forwarding from the EX stage of `LW` is useless; that only provides the *address*, not the *data*.
5.  **The Stall:** Because the data is not ready, the hazard detection unit must stall the `ADD` instruction for one cycle. It inserts a "bubble" into the pipeline. The `ADD` stays in the ID stage, and the `LW` proceeds to MEM.
6.  **Cycle 5:** `LW` moves to WB. The data it fetched from memory in the previous cycle is now in the MEM/WB pipeline register. The forwarding unit can now grab this value and send it directly to the input of the ALU for the `ADD` instruction, which is now allowed to enter its EX stage.
7.  **Conclusion:** The sequence requires one stall cycle.

**Reflection:**
*   The stall was necessary because the required data was generated in the MEM stage, which is too late to be used by the next instruction's EX stage without a delay.
*   Forwarding was still useful; without it, we would have had to wait until the `LW` completed its WB stage (Cycle 5) before the `ADD` could even start its EX stage, resulting in a 2-cycle stall. Forwarding saved one cycle.

## Diagrams
A pipeline timing diagram for the worked load-use hazard example, showing the required stall. A `*` indicates a stall (bubble).

```text
Clock Cycle ->   1    2    3      4      5    6    7
------------------------------------------------------
LW R1, 0(R10)   IF   ID   EX     MEM    WB
ADD R2, R1, R3       IF   ID   *STALL*  EX   MEM  WB

Data Dependency:
LW R1, ...      `-----.
                     |
ADD R2, R1, ...      Need R1 here (start of EX)

Forwarding Path:
LW R1, ...           MEM stage output `------> ALU input for ADD's EX stage
                     (available end of C4)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a chaotic kitchen (the CPU pipeline).
    *   **Structural:** Two chefs (IF, MEM stages) need the *one* special oven (memory unit) at the same time. One has to wait.
    *   **Data (RAW):** Chef A is making a sauce (`ADD R1,...`). Chef B needs that sauce for their dish (`SUB ...,R1,...`). Chef B keeps bugging Chef A: "Is it done yet? Is it done yet?" This is a Read-After-Write hazard. The solution is for Chef A to give Chef B a little taste as soon as it's ready (forwarding), instead of waiting to put the whole bowl away (Write Back).
    *   **Control:** The head chef (branch instruction) shouts, "Wait! We're making soup instead of salad!" But the line cooks (fetch stages) have already started chopping lettuce. They have to throw it all out (flush the pipeline) and grab tomatoes. This is a control hazard.
2.  **Must Overlearn:**
    *   **RAW (Read-After-Write):** `I_j` reads a source written by `I_i`. True dependence. The most common cause of stalls.
    *   **Load-Use Hazard Stall:** A load instruction followed immediately by an instruction that uses the loaded value requires one stall cycle even with full forwarding in a 5-stage pipeline.
    *   **Branch Misprediction Penalty:** The number of instructions incorrectly fetched and flushed after a branch is taken. In a 5-stage pipeline where the branch is resolved in EX, the penalty is 2 cycles (the instructions in IF and ID are flushed).
3.  **Spaced Repetition Schedule:** Review your diagrams and these key ideas in 1 day, 3 days, 7 days, 16 days, and 35 days. Actively redraw the diagrams from scratch each time.
4.  **First Principles Pathway:** If you forget everything, draw the 5-stage pipeline grid (instructions vs. time). Take two simple, dependent instructions. Manually move each instruction through one stage per cycle. When you reach the second instruction's Decode/Execute stage, ask: "Is the data this instruction needs available *right now*?" If the instruction that produces the data is still further down the pipeline, you have found a hazard. The number of cycles you must wait is the stall.

## Common mistakes
1.  **Believing Forwarding Solves Everything:** Students often forget the load-use hazard. Forwarding can't get data that doesn't exist yet. Data from memory is not available until the end of the MEM stage.
2.  **Miscalculating Branch Penalty:** Forgetting to count the number of "in-flight" instructions that come after a branch but before it is resolved. If a branch is resolved in stage `k`, there are `k-1` instructions following it that must be flushed on a mispredict.
3.  **Confusing WAR/WAW with RAW:** WAR and WAW dependencies do not cause stalls in a simple, in-order pipeline because reads always happen early (ID) and writes happen late (WB), preserving the correct order. They are "name dependencies," not true dependencies, and become a problem only when execution order is changed (out-of-order processors), where they are solved by register renaming.
4.  **Assuming Stalls are Bad Design:** Stalls are not a design flaw; they are a necessary complexity to handle dependencies that the hardware cannot resolve at full speed. The goal of a good design is to minimize them, not pretend they don't exist.

## Self-check
1.  Identify all the potential data hazards (RAW, WAR, WAW) in the following code sequence. Which ones would cause a stall in a standard 5-stage in-order pipeline?
    ```assembly
    I1: ADD R1, R2, R3
    I2: SUB R2, R1, R4
    I3: LW  R5, 0(R1)
    I4: OR  R1, R5, R6
    ```
2.  A processor has a 7-stage pipeline (IF1, IF2, ID, EX, MEM1, MEM2, WB). Data from a load is available after MEM2. Branch outcomes are determined at the end of the EX stage. Forwarding is fully implemented.
    *   What is the stall (in cycles) for a load-use hazard?
    *   What is the branch misprediction penalty (in cycles)?
3.  How could a compiler help mitigate hazards? Provide one specific example for a data hazard and one for a control hazard.