## 1. What it is — in plain English

Imagine you're running a busy kitchen, preparing several dishes at once. To speed things up, you break down each dish into smaller steps: chopping vegetables, boiling water, frying ingredients, and so on. You try to overlap these steps, so while one dish's vegetables are chopping, another dish's water is boiling. This is like a CPU pipeline, where different parts of different instructions are being worked on simultaneously.

Now, imagine a problem arises. What if two dishes both need the only frying pan at the exact same moment? Or what if you need to chop onions for dish B, but the cutting board is still being used for dish A's tomatoes? Or even trickier, what if you've started preparing a fancy dessert, but then suddenly your customer changes their mind and wants a simple fruit salad instead, meaning you've wasted time on the wrong dessert?

These are "pipeline hazards." They are situations where the smooth, overlapping flow of instructions in a CPU pipeline gets interrupted. Something prevents the next instruction from moving forward as planned, forcing the CPU to pause, wait, or even discard work it's already started. These interruptions slow down the CPU, making it less efficient than it could be if everything ran perfectly.

## 2. Why it matters — real-world applications

Pipeline hazards are fundamental to understanding how modern processors achieve their incredible speed and how engineers design them. Dealing with these hazards is not just an academic exercise; it's central to performance in almost every computing domain:

1.  **High-Performance Computing (HPC) and Scientific Simulations:** In fields like aerospace engineering (e.g., simulating airflow over a wing using Computational Fluid Dynamics), climate modeling, or quantum physics simulations, supercomputers execute billions of instructions per second. Even tiny inefficiencies caused by pipeline stalls can translate into hours or days of extra computation time, directly impacting research progress and design cycles. Optimizing for minimal hazards is critical for maximizing the throughput of these expensive machines.
2.  **Modern CPU Design (Intel, AMD, ARM):** Every processor in your laptop, smartphone, and server rack is heavily pipelined. Companies like Intel, AMD, and ARM invest billions in designing complex hazard detection and resolution logic. Techniques like branch prediction, data forwarding, and out-of-order execution are all sophisticated mechanisms developed to mitigate pipeline hazards, ensuring that your everyday applications run smoothly and quickly. Without effective hazard handling, even a simple web browser would feel sluggish.
3.  **Machine Learning and AI Accelerators (GPUs, TPUs):** Graphics Processing Units (GPUs) and Google's Tensor Processing Units (TPUs) are designed for highly parallel computations, especially the matrix multiplications common in deep learning. While their pipelines are often simpler and more specialized than general-purpose CPUs, ensuring data flows efficiently through their many processing cores without stalls is paramount. A data hazard in a GPU's pipeline can significantly bottleneck the training time of a large neural network, directly affecting the pace of AI innovation.
4.  **Real-time Embedded Systems:** In applications like automotive control units, medical devices, or industrial automation, predictable and timely execution is crucial. Pipeline hazards, especially control hazards, can introduce unpredictable delays. Engineers designing these systems must carefully analyze and often simplify pipeline designs or employ specific hazard avoidance strategies to guarantee that critical tasks meet their deadlines, preventing potentially catastrophic failures.

## 3. Prerequisites — what you must know first

Before diving deep into pipeline hazards, ensure you have a solid grasp of these foundational concepts:

*   **Instruction Set Architecture (ISA):** The set of instructions (e.g., ADD, SUB, LW, SW, BEQ) that a specific CPU can understand and execute, including register usage and memory addressing modes.
*   **CPU Datapath:** The functional units (like the ALU, registers, memory unit, program counter) and the buses connecting them, which together perform instruction execution.
*   **Pipelining:** The technique of breaking down the execution of an instruction into a series of smaller, independent stages (e.g., Instruction Fetch, Instruction Decode, Execute, Memory Access, Write Back) and overlapping the execution of multiple instructions across these stages.
*   **Clock Cycle:** The basic unit of time in a synchronous digital circuit, representing one tick of the CPU's internal clock. All pipeline stages ideally complete their work within one clock cycle.
*   **Registers:** Small, fast storage locations within the CPU (e.g., R0-R31 in MIPS, AX, BX, CX, DX in x86) used to hold data and instruction addresses during processing.
*   **Memory Hierarchy:** The organization of memory into different levels (registers, cache, main memory, disk) with varying speeds and capacities, and how the CPU interacts with them.
*   **Control Unit:** The part of the CPU responsible for orchestrating the datapath, generating control signals to direct data flow and operations based on the current instruction.
*   **Instruction Format:** How instructions are encoded in binary, specifying opcode, register operands, immediate values, etc.

## 4. The core idea — step by step

Pipeline hazards are essentially conflicts or dependencies that disrupt the smooth, single-cycle flow of instructions through a pipeline. Let's break down the core ideas.

### Step 1: The Ideal Pipeline

*   **Plain English:** Imagine a perfect world where every instruction is completely independent of the ones before it and never needs the same piece of hardware at the same time as another. In this ideal scenario, once an instruction enters the pipeline, a new instruction can start every single clock cycle, and one instruction finishes every single clock cycle. It's like an assembly line where every station is always busy and nothing ever jams.
*   **Small concrete example:** Consider a 5-stage pipeline (IF: Instruction Fetch, ID: Instruction Decode, EX: Execute, MEM: Memory Access, WB: Write Back).
    *   Clock Cycle 1: Instruction 1 (I1) is in IF.
    *   Clock Cycle 2: I1 in ID, I2 in IF.
    *   Clock Cycle 3: I1 in EX, I2 in ID, I3 in IF.
    *   ...and so on. After the initial "fill-up" of the pipeline, one instruction completes every cycle.
*   **The formal/mathematical version:** In an ideal pipeline, the Cycles Per Instruction (CPI) is 1. This means, on average, one instruction completes execution every clock cycle.
    $$
    \text{CPI}_{\text{ideal}} = 1
    $$
*   **What could go wrong:** This ideal CPI is rarely achieved in real-world processors because instructions *do* depend on each other, and hardware resources *are* limited.

### Step 2: What is a Hazard?

*   **Plain English:** A hazard is any situation that prevents the next instruction in the sequence from executing in its designated pipeline stage during its designated clock cycle. It's a roadblock in the assembly line that forces the entire line (or parts of it) to pause, or even to backtrack and discard work. This pause is called a "stall" or "bubble" in the pipeline.
*   **Small concrete example:** If Instruction 2 needs a result from Instruction 1, but Instruction 1 hasn't produced it yet, Instruction 2 must wait. This wait is a hazard.
*   **The formal/mathematical version:** A pipeline hazard increases the actual CPI beyond the ideal 1.
    $$
    \text{CPI}_{\text{actual}} = \text{CPI}_{\text{ideal}} + \text{stall\_cycles\_per\_instruction} = 1 + \text{stall\_cycles\_per\_instruction}
    $$
    Where $\text{stall\_cycles\_per\_instruction}$ represents the average number of clock cycles lost to hazards for each instruction executed.
*   **What could go wrong:** Increased CPI means lower performance (more clock cycles to complete the same amount of work), which directly translates to a slower processor.

### Step 3: Structural Hazards

*   **Plain English:** This type of hazard occurs when two or more instructions simultaneously try to use the *same piece of hardware* that is only available once per clock cycle. It's like two different dishes needing the single oven at the exact same time. The CPU only has one of a certain component (e.g., a single memory port, a single ALU), and if two instructions need it in the same clock cycle, one has to wait.
*   **Small concrete example:** Consider a simple 5-stage pipeline where the `MEM` stage accesses data memory and the `IF` stage accesses instruction memory. If the CPU has *only one unified memory unit* for both instructions and data, then an instruction in `MEM` (e.g., `LW` or `SW`) will conflict with an instruction in `IF` (fetching the next instruction) trying to access memory in the same clock cycle. The `IF` stage would have to stall.
*   **The formal/mathematical version:** A structural hazard exists if for two instructions $I_i$ and $I_j$ (where $i \neq j$), and two pipeline stages $S_k$ and $S_l$ (where $S_k$ and $S_l$ occur in the same clock cycle for $I_i$ and $I_j$ respectively), they both require access to the same hardware resource $R$, and $|R|$ (the number of available units of resource $R$) is less than 2.
    $$
    \exists I_i, I_j, S_k, S_l, R \quad \text{such that} \quad (\text{time}(I_i, S_k) = \text{time}(I_j, S_l)) \land (\text{resource\_needed}(I_i, S_k) = R) \land (\text{resource\_needed}(I_j, S_l) = R) \land (|R| < 2)
    $$
*   **What could go wrong:** The pipeline stalls, inserting "bubbles" (empty cycles) until the required resource becomes free. This increases CPI.

### Step 4: Data Hazards (RAW - Read After Write)

*   **Plain English:** This is the most common type of data hazard. It happens when an instruction needs to *read* a piece of data (from a register, for example) that a *previous* instruction is supposed to *write*, but the previous instruction hasn't finished writing it yet. It's like trying to use the result of a calculation before the calculation is even done.
*   **Small concrete example:**
    ```assembly
    ADD R1, R2, R3   // Instruction 1: R1 = R2 + R3
    SUB R4, R1, R5   // Instruction 2: R4 = R1 - R5
    ```
    Instruction 2 needs the value of `R1`. But Instruction 1 writes to `R1` in its `WB` (Write Back) stage. If Instruction 2 tries to read `R1` in its `ID` (Instruction Decode) stage, `R1` still holds the *old* value, not the one computed by `ADD`. This is a RAW hazard.
*   **The formal/mathematical version:** A Read After Write (RAW) hazard occurs when instruction $I_j$ attempts to read a source operand before instruction $I_i$ (which precedes $I_j$ in program order) writes to that same operand.
    $$
    W(R_x)_i \rightarrow R(R_x)_j \quad \text{and} \quad \text{time}(R(R_x)_j) < \text{time}(W(R_x)_i)
    $$
    Where $W(R_x)_i$ denotes instruction $I_i$ writing to register $R_x$, and $R(R_x)_j$ denotes instruction $I_j$ reading from $R_x$. The "time" refers to the clock cycle in which the operation occurs.
*   **What could go wrong:** If not handled, Instruction 2 would read the wrong (stale) value of `R1`, leading to incorrect program results. The common solution is to stall Instruction 2 until `R1` is written, or even better, use a technique called "forwarding" (also known as "bypassing") to send the result directly from the `EX` or `MEM` stage of Instruction 1 to the `EX` stage of Instruction 2.

### Step 5: Data Hazards (WAR - Write After Read, WAW - Write After Write)

*   **Plain English:** These are less common in simple in-order pipelines but become very important in advanced processors that execute instructions out of order.
    *   **WAR (Write After Read):** An instruction tries to *write* to a register *before* an *earlier* instruction has finished *reading* from it. This can only happen if instructions are reordered.
    *   **WAW (Write After Write):** An instruction tries to *write* to a register *before* an *earlier* instruction that also writes to that register has finished. Again, this is primarily an issue with out-of-order execution or pipelines with varying stage latencies.
*   **Small concrete example:**
    ```assembly
    I1: SUB R4, R1, R5   // Reads R1, Writes R4
    I2: ADD R1, R2, R3   // Writes R1
    I3: MUL R1, R6, R7   // Writes R1
    ```
    *   **WAR (I2 and I1):** If I2 (`ADD R1, R2, R3`) somehow finishes its write to R1 *before* I1 (`SUB R4, R1, R5`) finishes its read of R1 (e.g., if I2 is much faster and executes out of order), I1 would read the *new* R1 value, which is incorrect.
    *   **WAW (I3 and I2):** If I3 (`MUL R1, R6, R7`) finishes its write to R1 *before* I2 (`ADD R1, R2, R3`) finishes its write to R1 (again, due to out-of-order execution or different execution times), the final value in R1 would be the result of I3, then I2, instead of the correct order I2 then I3.
*   **The formal/mathematical version:**
    *   **WAR (Write After Read):** Instruction $I_j$ attempts to write to an operand before instruction $I_i$ (which precedes $I_j$ in program order) reads from that same operand.
        $$
        R(R_x)_i \rightarrow W(R_x)_j \quad \text{and} \quad \text{time}(W(R_x)_j) < \text{time}(R(R_x)_i)
        $$
    *   **WAW (Write After Write):** Instruction $I_j$ attempts to write to an operand before instruction $I_i$ (which precedes $I_j$ in program order) writes to that same operand.
        $$
        W(R_x)_i \rightarrow W(R_x)_j \quad \text{and} \quad \text{time}(W(R_x)_j) < \text{time}(W(R_x)_i)
        $$
*   **What could go wrong:** Both WAR and WAW hazards can lead to incorrect program results. They are typically resolved in advanced processors using techniques like **register renaming**, which provides multiple physical registers for a single architectural register, effectively eliminating these false dependencies.

### Step 6: Control Hazards (Branch Hazards)

*   **Plain English:** This hazard occurs when the pipeline doesn't know which instruction to fetch next because a "branch" instruction (like an `if` statement, `for` loop, or function call) is in the pipeline. The CPU needs to know if the branch will be taken (jump to a new address) or not taken (continue to the next sequential instruction). Until the branch instruction is executed and its condition evaluated, the CPU doesn't know the correct "next instruction" to fetch, potentially fetching instructions from the wrong path.
*   **Small concrete example:**
    ```assembly
    I1: BEQ R1, R2, Label // Branch if R1 == R2
    I2: ADD R3, R4, R5    // This is the instruction after BEQ (not taken path)
    ...
    Label: SUB R6, R7, R8  // This is the target of the branch (taken path)
    ```
    The `BEQ` instruction is fetched in `CC1` (Clock Cycle 1). It only evaluates its condition in the `EX` stage (e.g., `CC3`). Meanwhile, the pipeline has already fetched `I2` in `CC2` and `I3` in `CC3`, assuming the branch is *not taken*. If, in `CC3`, the `BEQ` evaluates to true (branch *is* taken), then `I2` and `I3` were fetched incorrectly and must be discarded ("flushed") from the pipeline. The pipeline then fetches `SUB R6, R7, R8` from the `Label` address.
*   **The formal/mathematical version:** A control hazard exists if the Program Counter (PC) value for the next instruction fetch depends on the outcome of an instruction currently in the pipeline, and that outcome is not yet determined when the next instruction needs to be fetched. The cost of a control hazard is the number of cycles wasted due to fetching incorrect instructions.
    $$
    \text{Stall\_cycles}_{\text{control}} = \text{Branch\_frequency} \times \text{Misprediction\_rate} \times \text{Penalty\_cycles}
    $$
    Where $\text{Branch\_frequency}$ is the percentage of instructions that are branches, $\text{Misprediction\_rate}$ is how often the CPU guesses the wrong path, and $\text{Penalty\_cycles}$ is how many cycles are lost when a misprediction occurs.
*   **What could go wrong:** Wasted work and pipeline stalls. The CPU has to "flush" (clear) the incorrectly fetched instructions and then restart fetching from the correct target address. This can lead to significant performance loss, especially in programs with many unpredictable branches. This is why **branch prediction** (guessing the outcome of a branch) is a critical optimization technique.

## 5. Worked examples — multiple, with every step shown

We'll use a standard 5-stage MIPS pipeline for these examples: IF (Instruction Fetch), ID (Instruction Decode/Register Read), EX (Execute), MEM (Memory Access), WB (Write Back).

### Example 1: Structural Hazard (Single Memory Port)

**Problem:** Consider a 5-stage pipeline with a *single, unified memory unit* for both instruction fetches and data loads/stores. Trace the execution of the following two instructions and identify any structural hazards.

```assembly
I1: LW R1, 0(R2)   // Load Word: R1 = Memory[R2 + 0]
I2: ADD R3, R4, R5 // Add: R3 = R4 + R5
```

**Given:**
*   5-stage pipeline: IF, ID, EX, MEM, WB.
*   Single, unified memory unit for both instruction memory and data memory.
*   Instructions are fetched in IF, data access occurs in MEM.

**What we want:** Identify when and where a structural hazard occurs and how it might be resolved.

**Solution:**

Let's trace the instructions through the pipeline cycle by cycle.

*   **Clock Cycle 1:**
    *   I1: `LW R1, 0(R2)` is in **IF** stage.
        *   *Explanation:* I1 is fetched from memory. This uses the single memory unit.
*   **Clock Cycle 2:**
    *   I1: `LW R1, 0(R2)` is in **ID** stage.
    *   I2: `ADD R3, R4, R5` is in **IF** stage.
        *   *Explanation:* I1 moves to ID. I2 attempts to fetch from memory.
        *   **Hazard Identification:** At this point, I1 (in ID) does not need the memory unit. However, I2 (in IF) *does* need the memory unit. No conflict *yet* because I1 doesn't need memory in ID.
*   **Clock Cycle 3:**
    *   I1: `LW R1, 0(R2)` is in **EX** stage.
    *   I2: `ADD R3, R4, R5` is in **ID** stage.
        *   *Explanation:* I1 moves to EX. I2 moves to ID. Still no memory conflict.
*   **Clock Cycle 4:**
    *   I1: `LW R1, 0(R2)` is in **MEM** stage.
        *   *Explanation:* I1 needs to access data memory to load the word into R1. This uses the single memory unit.
    *   I2: `ADD R3, R4, R5` is in **EX** stage.
        *   *Explanation:* I2 moves to EX.
    *   I3 (next instruction): Attempts to enter **IF** stage.
        *   *Explanation:* A new instruction (I3) would normally be fetched. This would also require the single memory unit.
        *   **Hazard Identification:** **Structural Hazard!** I1 is in its MEM stage, requiring the memory unit for data access. I3 (which would normally be fetched in this cycle) is in its IF stage, requiring the *same* memory unit for instruction fetch. Since there is only one unified memory unit, both cannot use it simultaneously.
*   **Resolution:** The pipeline must stall. The IF stage (and thus I3) must wait until the memory unit is free. I1's MEM stage will complete, freeing the memory unit for the next cycle.
    *   **Clock Cycle 4 (Stalled):**
        *   I1: `LW R1, 0(R2)` in **MEM** stage. (Uses memory)
        *   I2: `ADD R3, R4, R5` in **EX** stage.
        *   IF stage: **Stalled (bubble inserted).** I3 cannot be fetched.
*   **Clock Cycle 5:**
    *   I1: `LW R1, 0(R2)` in **WB** stage.
    *   I2: `ADD R3, R4, R5` in **MEM** stage.
    *   I3: `(next instruction)` is in **IF** stage.
        *   *Explanation:* I1 finishes its MEM stage, making the memory unit available. I3 can now be fetched. I2 proceeds to MEM.
*   **Conclusion:** A structural hazard occurs in Clock Cycle 4 when I1 (MEM stage) and I3 (IF stage) both require the single unified memory unit. This causes a 1-cycle stall for the IF stage.

**Reflection:** This example highlights how a shared resource can cause stalls. The solution is typically to duplicate the resource (e.g., separate instruction and data caches/memories, known as a Harvard architecture) or to schedule access carefully, often leading to performance degradation.

---

### Example 2: Data Hazard (RAW) - No Forwarding

**Problem:** Trace the execution of the following instruction sequence in a 5-stage pipeline *without any forwarding (bypassing)*. Identify any RAW data hazards and determine the number of stall cycles required.

```assembly
I1: ADD R1, R2, R3   // R1 = R2 + R3
I2: SUB R4, R1, R5   // R4 = R1 - R5
I3: AND R6, R1, R7   // R6 = R1 & R7
```

**Given:**
*   5-stage pipeline: IF, ID, EX, MEM, WB.
*   No forwarding hardware.
*   Register read occurs at the end of ID, register write occurs at the end of WB.

**What we want:** Identify RAW hazards and calculate stalls.

**Solution:**

Let's trace the instructions:

*   **Clock Cycle 1:**
    *   I1: `ADD R1, R2, R3` in **IF**.
*   **Clock Cycle 2:**
    *   I1: `ADD R1, R2, R3` in **ID**.
    *   I2: `SUB R4, R1, R5` in **IF**.
*   **Clock Cycle 3:**
    *   I1: `ADD R1, R2, R3` in **EX**. (R1 value computed here)
    *   I2: `SUB R4, R1, R5` in **ID**.
        *   *Explanation:* I2 needs to read `R1` at the end of its ID stage. I1 writes `R1` at the end of its WB stage.
        *   **Hazard Identification:** I2 needs `R1` now, but I1 won't write `R1` until the end of Clock Cycle 5 (I1's WB stage). This is a RAW hazard. I2 *must* wait.
*   **Resolution for I2:** I2 must stall until I1 writes `R1`. I1 writes `R1` at the end of CC5. So, I2 can read `R1` starting from CC6. This means I2 stalls for 3 cycles (CC3, CC4, CC5).
    *   **Clock Cycle 3 (Stalled):**
        *   I1: `ADD R1, R2, R3` in **EX**.
        *   I2: `SUB R4, R1, R5` in **ID**. **Stalled.** (Bubble inserted into EX, MEM, WB for I2)
        *   I3: `AND R6, R1, R7` in **IF**.
*   **Clock Cycle 4 (Stalled):**
    *   I1: `ADD R1, R2, R3` in **MEM**.
    *   I2: `SUB R4, R1, R5` in **ID**. **Stalled.**
    *   I3: `AND R6, R1, R7` in **IF**.
        *   *Explanation:* I3 also needs `R1`. It will face the same RAW hazard as I2. I3 needs `R1` at the end of its ID stage (which would be CC5 if not for I2's stall).
*   **Clock Cycle 5 (Stalled):**
    *   I1: `ADD R1, R2, R3` in **WB**. (R1 written here at end of cycle)
    *   I2: `SUB R4, R1, R5` in **ID**. **Stalled.**
    *   I3: `AND R6, R1, R7` in **IF**.
*   **Clock Cycle 6:**
    *   I1: **Finished.**
    *   I2: `SUB R4, R1, R5` in **EX**. (Reads correct R1 value from register file)
    *   I3: `AND R6, R1, R7` in **ID**.
        *   *Explanation:* I1 has written R1. I2 can now proceed to EX. I3 can now proceed to ID and read the correct R1.
*   **Clock Cycle 7:**
    *   I2: `SUB R4, R1, R5` in **MEM**.
    *   I3: `AND R6, R1, R7` in **EX**.
*   **Clock Cycle 8:**
    *   I2: `SUB R4, R1, R5` in **WB**. (R4 written)
    *   I3: `AND R6, R1, R7` in **MEM**.
*   **Clock Cycle 9:**
    *   I3: `AND R6, R1, R7` in **WB**. (R6 written)

**Total Stalls:**
*   I2 stalled for 3 cycles (CC3, CC4, CC5).
*   I3 stalled for 2 cycles (CC4, CC5, because it was waiting behind I2, but also for I1's R1).
*   The pipeline essentially stalled for 3 cycles for the first dependent instruction.

**Conclusion:**
A RAW hazard exists between I1 and I2, and I1 and I3. Without forwarding, I2 stalls for 3 cycles. I3 also stalls for 3 cycles (it enters IF in CC3, would be in ID in CC4, but then has to wait for R1 until CC6, so it stalls for CC4, CC5). The total execution time for these 3 instructions is 9 cycles.

**Reflection:** This example demonstrates the severe performance penalty of RAW hazards without forwarding. Instructions are often dependent on immediate predecessors, leading to many stalls.

---

### Example 3: Data Hazard (RAW) - With Forwarding

**Problem:** Trace the execution of the same instruction sequence as Example 2, but now assume the 5-stage pipeline *supports full data forwarding (bypassing)* from the EX and MEM stages back to the EX stage. Identify any RAW data hazards and determine the number of stall cycles.

```assembly
I1: ADD R1, R2, R3   // R1 = R2 + R3
I2: SUB R4, R1, R5   // R4 = R1 - R5
I3: AND R6, R1, R7   // R6 = R1 & R7
I4: LW R8, 0(R1)     // R8 = Memory[R1 + 0]
```

**Given:**
*   5-stage pipeline: IF, ID, EX, MEM, WB.
*   Full data forwarding: Results from EX and MEM stages can be forwarded to the EX stage of a dependent instruction.
*   Register read occurs at the end of ID, register write occurs at the end of WB.

**What we want:** Identify RAW hazards and calculate stalls with forwarding.

**Solution:**

Let's trace the instructions:

*   **Clock Cycle 1:**
    *   I1: `ADD R1, R2, R3` in **IF**.
*   **Clock Cycle 2:**
    *   I1: `ADD R1, R2, R3` in **ID**.
    *   I2: `SUB R4, R1, R5` in **IF**.
*   **Clock Cycle 3:**
    *   I1: `ADD R1, R2, R3` in **EX**. (R1 value computed here)
    *   I2: `SUB R4, R1, R5` in **ID**.
        *   *Explanation:* I2 needs `R1` for its EX stage (which would be CC4). I1 computes `R1` in its EX stage (CC3).
        *   **Hazard Resolution (Forwarding):** The result of I1's `ADD` operation (the new value for `R1`) is available at the *end* of I1's EX stage (CC3). This value can be directly forwarded to I2's EX stage, where I2 needs it to perform the `SUB` operation in CC4. No stall needed between I1 and I2.
    *   I3: `AND R6, R1, R7` in **IF**.
*   **Clock Cycle 4:**
    *   I1: `ADD R1, R2, R3` in **MEM**.
    *   I2: `SUB R4, R1, R5` in **EX**. (Reads forwarded R1 value from I1's EX stage)
    *   I3: `AND R6, R1, R7` in **ID**.
        *   *Explanation:* I3 needs `R1` for its EX stage (which would be CC5). I1's `R1` value is now in I1's MEM stage.
        *   **Hazard Resolution (Forwarding):** The result of I1's `ADD` is available from I1's MEM stage (end of CC4). This can be forwarded to I3's EX stage for CC5. No stall needed between I1 and I3.
    *   I4: `LW R8, 0(R1)` in **IF**.
*   **Clock Cycle 5:**
    *   I1: `ADD R1, R2, R3` in **WB**. (R1 written to register file)
    *   I2: `SUB R4, R1, R5` in **MEM**.
    *   I3: `AND R6, R1, R7` in **EX**. (Reads forwarded R1 value from I1's MEM stage)
    *   I4: `LW R8, 0(R1)` in **ID**.
        *   *Explanation:* I4 needs `R1` for its EX stage (to calculate memory address). I1 wrote R1 in CC5 (end of cycle).
        *   **Hazard Identification:** I4 needs `R1` in its EX stage (CC6). I1 writes `R1` in its WB stage (end of CC5). The `LW` instruction needs the value of `R1` *at the beginning* of its EX stage to compute the memory address. The value is only available *after* I1's WB stage. This is a load-use hazard, a specific type of RAW hazard that forwarding alone cannot fully resolve in a single cycle.
*   **Resolution for I4:** I4 must stall for 1 cycle. The value of `R1` is written to the register file at the end of CC5. I4 needs to read it at the beginning of its EX stage (CC6). If it proceeds without stall, it would read the old value. A 1-cycle stall is needed for I4 to wait for I1's WB stage to complete and then read from the register file.
    *   **Clock Cycle 6 (Stalled):**
        *   I1: **Finished.**
        *   I2: `SUB R4, R1, R5` in **WB**.
        *   I3: `AND R6, R1, R7` in **MEM**.
        *   I4: `LW R8, 0(R1)` in **ID**. **Stalled.** (Bubble inserted into EX for I4)
*   **Clock Cycle 7:**
    *   I2: **Finished.**
    *   I3: `AND R6, R1, R7` in **WB**.
    *   I4: `LW R8, 0(R1)` in **EX**. (Reads correct R1 value from register file)
*   **Clock Cycle 8:**
    *   I3: **Finished.**
    *   I4: `LW R8, 0(R1)` in **MEM**.
*   **Clock Cycle 9:**
    *   I4: `LW R8, 0(R1)` in **WB**.

**Total Stalls:**
*   I2: 0 stalls
*   I3: 0 stalls
*   I4: 1 stall (due to load-use hazard)

**Conclusion:**
With forwarding, the RAW hazards between I1 and I2, and I1 and I3 are completely resolved, resulting in 0 stalls for those dependencies. However, a load-use hazard between I1 and I4 still requires a 1-cycle stall because the data from a `LW` instruction is only available *after* its MEM stage, which is too late for the immediately following instruction's EX stage. The total execution time for these 4 instructions is 9 cycles.

**Reflection:** Forwarding dramatically improves performance by eliminating most RAW stalls. However, `LW` instructions are special: their data isn't available until the MEM stage completes. If an instruction immediately following a `LW` needs the loaded value, a 1-cycle stall (or "load-use interlock") is still often necessary.

---

### Example 4: Control Hazard (Branch Instruction)

**Problem:** Trace the execution of the following code snippet in a 5-stage pipeline. Assume a simple "always predict not taken" branch prediction strategy and that a misprediction incurs a 2-cycle flush penalty (IF and ID stages are flushed).

```assembly
I1: ADD R1, R2, R3
I2: BEQ R1, R0, Label // Branch if R1 == R0 (assume R1 is NOT 0 after I1)
I3: SUB R4, R5, R6    // Instruction after branch (not taken path)
I4: AND R7, R8, R9
...
Label:
I5: OR R10, R11, R12 // Target of branch (taken path)
```

**Given:**
*   5-stage pipeline: IF, ID, EX, MEM, WB.
*   Branch condition evaluated in EX stage.
*   "Always predict not taken" strategy.
*   Misprediction penalty: 2 cycles (IF, ID stages flushed).
*   Assume `R1` is NOT equal to `R0` after `I1` executes, so the `BEQ` is *not taken*.

**What we want:** Identify the control hazard, trace its resolution, and calculate the total cycles.

**Solution:**

Let's trace the instructions:

*   **Clock Cycle 1:**
    *   I1: `ADD R1, R2, R3` in **IF**.
*   **Clock Cycle 2:**
    *   I1: `ADD R1, R2, R3` in **ID**.
    *   I2: `BEQ R1, R0, Label` in **IF**.
*   **Clock Cycle 3:**
    *   I1: `ADD R1, R2, R3` in **EX**.
    *   I2: `BEQ R1, R0, Label` in **ID**.
    *   I3: `SUB R4, R5, R6` in **IF**.
        *   *Explanation:* `BEQ` (I2) is in ID. The pipeline predicts "not taken" and fetches I3.
*   **Clock Cycle 4:**
    *   I1: `ADD R1, R2, R3` in **MEM**.
    *   I2: `BEQ R1, R0, Label` in **EX**.
        *   *Explanation:* I2 evaluates the branch condition (`R1 == R0`). We assumed `R1 != R0`, so the branch is **NOT TAKEN**.
        *   **Hazard Identification:** The prediction ("not taken") was **CORRECT**. No misprediction occurred.
    *   I3: `SUB R4, R5, R6` in **ID**.
    *   I4: `AND R7, R8, R9` in **IF**.
*   **Clock Cycle 5:**
    *   I1: `ADD R1, R2, R3` in **WB**.
    *   I2: `BEQ R1, R0, Label` in **MEM**.
    *   I3: `SUB R4, R5, R6` in **EX**.
    *   I4: `AND R7, R8, R9` in **ID**.
*   **Clock Cycle 6:**
    *   I2: `BEQ R1, R0, Label` in **WB**.
    *   I3: `SUB R4, R5, R6` in **MEM**.
    *   I4: `AND R7, R8, R9` in **EX**.

**Now, let's re-run with a misprediction scenario:** Assume `R1` *is* equal to `R0` after `I1` executes, so the `BEQ` *is taken*.

*   **Clock Cycle 1:**
    *   I1: `ADD R1, R2, R3` in **IF**.
*   **Clock Cycle 2:**
    *   I1: `ADD R1, R2, R3` in **ID**.
    *   I2: `BEQ R1, R0, Label` in **IF**.
*   **Clock Cycle 3:**
    *   I1: `ADD R1, R2, R3` in **EX**.
    *   I2: `BEQ R1, R0, Label` in **ID**.
    *   I3: `SUB R4, R5, R6` in **IF**.
        *   *Explanation:* `BEQ` (I2) is in ID. The pipeline predicts "not taken" and fetches I3.
*   **Clock Cycle 4:**
    *   I1: `ADD R1, R2, R3` in **MEM**.
    *   I2: `BEQ R1, R0, Label` in **EX**.
        *   *Explanation:* I2 evaluates the branch condition (`R1 == R0`). We assumed `R1 == R0`, so the branch is **TAKEN**.
        *   **Hazard Identification:** The prediction ("not taken") was **INCORRECT**. This is a control hazard / branch misprediction.
        *   **Resolution:** Instructions I3 and I4 (and any subsequent fetched instructions) were fetched down the wrong path. They must be flushed (discarded) from the pipeline. The PC must be updated to `Label`, and fetching restarts from there.
    *   I3: `SUB R4, R5, R6` in **ID**. **FLUSHED.**
    *   I4: `AND R7, R8, R9` in **IF**. **FLUSHED.**
*   **Clock Cycle 5 (after flush):**
    *   I1: `ADD R1, R2, R3` in **WB**.
    *   I2: `BEQ R1, R0, Label` in **MEM**.
    *   Pipeline stages IF and ID are now empty (bubbles).
    *   I5: `OR R10, R11, R12` is fetched from `Label` address in **IF**.
*   **Clock Cycle 6:**
    *   I2: `BEQ R1, R0, Label` in **WB**.
    *   I5: `OR R10, R11, R12` in **ID**.
*   **Clock Cycle 7:**
    *   I5: `OR R10, R11, R12` in **EX**.

**Total Stalls (Misprediction Scenario):**
*   I3 and I4 were flushed. The cycles they would have occupied (CC4: I3 in ID, I4 in IF; CC5: I3 in EX, I4 in ID) are wasted. This results in 2 cycles of penalty (or 2 bubbles inserted).
*   I5 starts fetching in CC5, instead of CC3 if there was no branch.

**Conclusion:**
When the branch prediction is correct ("not taken"), there are 0 stalls. When the prediction is incorrect ("taken" but predicted "not taken"), a control hazard occurs. Instructions I3 and I4 are flushed, and fetching restarts from the branch target. This incurs a 2-cycle penalty, meaning 2 cycles are wasted due to the misprediction.

**Reflection:** Control hazards are tricky because they introduce uncertainty. Branch prediction attempts to guess the future, but mispredictions are costly. The penalty depends on how deep the pipeline is and how many stages need to be flushed. More sophisticated branch predictors aim to reduce the misprediction rate, which is a key factor in modern CPU performance.

---

## 6. Common mistakes and traps

1.  **Confusing RAW with WAR/WAW:** Students often correctly identify RAW hazards but struggle to distinguish them from WAR and WAW. Remember:
    *   **RAW (Read After Write):** *True data dependency*. An instruction needs a value that a *previous* instruction hasn't produced yet. This must always be preserved for correctness.
    *   **WAR (Write After Read):** *Anti-dependency*. An instruction wants to *write* to a register that a *previous* instruction still needs to *read*. Only a problem with out-of-order execution.
    *   **WAW (Write After Write):** *Output dependency*. An instruction wants to *write* to a register that a *previous* instruction also writes to. Only a problem with out-of-order execution or varying write-back times.
    The key difference is that WAR and WAW are "false dependencies" that can be eliminated through techniques like register renaming, whereas RAW is a fundamental data flow requirement.

2.  **Forgetting that forwarding only solves *some* RAW hazards:** Forwarding (bypassing) is a powerful technique, but it's not a magic bullet. It typically works when the data is available from an earlier stage (EX or MEM) to the EX stage of the dependent instruction. However, a "load-use" hazard (where a `LW` instruction is immediately followed by an instruction that uses the loaded value) still often requires a 1-cycle stall because the data from memory only becomes available *after* the MEM stage, which is too late for the immediately following instruction's EX stage.

3.  **Underestimating the cost of control hazards:** Students sometimes focus too much on data hazards. However, branch mispredictions can be extremely costly, especially in deep pipelines. Flushing a 10-stage pipeline can waste 9 cycles! Modern CPUs dedicate significant hardware to sophisticated branch prediction units precisely because the performance impact is so high.

4.  **Assuming all pipelines are 5-stage in-order:** While the 5-stage MIPS pipeline is a great pedagogical tool, real-world pipelines are much deeper (10-30+ stages), more complex (superscalar, out-of-order), and have varying stage latencies. This complexity exacerbates hazards and requires more advanced solutions. Don't let the simplicity of the MIPS model limit your understanding of real-world challenges.

5.  **Not considering memory access conflicts as structural:** A common structural hazard is when the instruction fetch unit and the data memory access unit (for `LW`/`SW` instructions) compete for a single, unified memory port. This is a structural hazard, not a data hazard, as it's about resource contention, not data dependency.

6.  **Incorrectly calculating stall cycles:** When tracing pipeline execution, carefully count the bubbles (stalled cycles) inserted. Each bubble represents a lost clock cycle for that instruction and subsequent instructions trying to enter that stage. Ensure you account for how stalls propagate down the pipeline.

## 7. Textbook-precise explanation

Pipeline hazards are conditions in an instruction pipeline that prevent the next instruction in the instruction stream from executing during its designated clock cycle. These hazards necessitate stalling the pipeline, inserting "bubbles" or "no-ops" (no-operations), thereby increasing the effective Cycles Per Instruction (CPI) and reducing overall processor performance.

Formally, hazards are categorized into three primary types:

1.  **Structural Hazards:**
    A structural hazard occurs when two or more instructions in different stages of the pipeline require the same hardware resource simultaneously, and that resource is not duplicated to handle concurrent requests.
    *   **Definition:** A resource conflict where a required hardware resource is unavailable when needed by an instruction in a particular pipeline stage.
    *   **Example:** A single memory port used for both instruction fetches (IF stage) and data loads/stores (MEM stage) in a unified memory architecture (von Neumann architecture). If an `LW` instruction is in its MEM stage, attempting to access data memory, and a subsequent instruction is in its IF stage, attempting to fetch an instruction from the same memory, a structural hazard arises.
    *   **Resolution:**
        *   **Resource Duplication:** Providing separate instruction and data caches/memories (Harvard architecture) or multiple ALUs.
        *   **Pipelining Resources:** Breaking down a resource's access into multiple stages.
        *   **Stalling:** Inserting bubbles into the pipeline until the resource becomes free.

2.  **Data Hazards:**
    Data hazards arise when an instruction depends on the result of a previous instruction that is still in the pipeline and has not yet produced the required data. These are dependencies on register values.
    *   **Definition:** A situation where a subsequent instruction tries to use data that has not yet been written by an earlier instruction, or where the order of writes/reads to a register is violated.
    *   **Types:**
        *   **Read After Write (RAW) Hazard (True Data Dependency):** Instruction $I_j$ attempts to read a source operand before instruction $I_i$ (which precedes $I_j$ in program order) writes to that same operand. This is a true data dependency and must be preserved for correct program execution.
            $$
            I_i: \dots \to W(R_x) \\
            I_j: R(R_x) \to \dots \\
            \text{Hazard if } \text{time}(R(R_x)_j) < \text{time}(W(R_x)_i)
            $$
        *   **Write After Read (WAR) Hazard (Anti-Dependency):** Instruction $I_j$ attempts to write to a destination operand before instruction $I_i$ (which precedes $I_j$ in program order) reads from that same operand. This is a "false" dependency, typically only an issue in out-of-order execution.
            $$
            I_i: R(R_x) \to \dots \\
            I_j: \dots \to W(R_x) \\
            \text{Hazard if } \text{time}(W(R_x)_j) < \text{time}(R(R_x)_i)
            $$
        *   **Write After Write (WAW) Hazard (Output Dependency):** Instruction $I_j$ attempts to write to a destination operand before instruction $I_i$ (which precedes $I_j$ in program order) writes to that same operand. This is also a "false" dependency, primarily an issue in out-of-order execution or pipelines with varying write-back times.
            $$
            I_i: \dots \to W(R_x) \\
            I_j: \dots \to W(R_x) \\
            \text{Hazard if } \text{time}(W(R_x)_j) < \text{time}(W(R_x)_i)
            $$
    *   **Resolution:**
        *   **Stalling (Pipeline Interlock):** Inserting bubbles until the data is available.
        *   **Data Forwarding/Bypassing:** Sending the result directly from the pipeline stage where it is computed (e.g., EX or MEM) to the EX stage of the dependent instruction, rather than waiting for it to be written back to the register file (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §3.2).
        *   **Compiler Scheduling:** Reordering instructions at compile time to minimize dependencies.
        *   **Register Renaming:** For WAR and WAW hazards, allocating new physical registers for architectural registers to eliminate false dependencies, commonly used in out-of-order processors.

3.  **Control Hazards (Branch Hazards):**
    Control hazards occur when the pipeline cannot determine the address of the next instruction to fetch because a branch, jump, or call instruction's outcome is not yet known.
    *   **Definition:** A situation where the decision to fetch the next instruction depends on the result of a preceding instruction that is still in the pipeline, typically a conditional branch.
    *   **Example:** A `BEQ` instruction is fetched. The pipeline must decide whether to fetch the instruction immediately following the `BEQ` (branch not taken) or the instruction at the branch target address (branch taken). If this decision is made in the EX stage, subsequent instructions might be speculatively fetched from the wrong path.
    *   **Resolution:**
        *   **Stalling:** Insert bubbles until the branch outcome is known. This is simple but highly inefficient.
        *   **Predict Not Taken:** Always assume the branch is not taken and fetch sequentially. If wrong, flush the pipeline.
        *   **Predict Taken:** Always assume the branch is taken and fetch from the target. If wrong, flush.
        *   **Branch Prediction:** Using hardware predictors (e.g., branch history tables, two-bit predictors, perceptron predictors) to guess the branch outcome and target address. If the prediction is correct, no stall. If incorrect, a misprediction penalty (pipeline flush) is incurred. (Culler, Singh, & Gupta, *Parallel Computer Architecture: A Hardware/Software Approach*, §2.4.2).
        *   **Delayed Branch:** A compiler technique where an instruction independent of the branch outcome is placed immediately after the branch, filling the branch delay slot. This instruction is always executed, regardless of the branch outcome.

Understanding and mitigating these hazards is crucial for designing high-performance processors, as they directly impact the achievable CPI and thus the overall execution time of a program.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a 5-stage pipeline with a RAW data hazard and how forwarding resolves it:

```text
Pipeline Stages: IF | ID | EX | MEM | WB

Scenario: RAW Data Hazard (ADD followed by SUB)

Instructions:
I1: ADD R1, R2, R3  (R1 = R2 + R3)
I2: SUB R4, R1, R5  (R4 = R1 - R5)

Without Forwarding (Stall):

Clock Cycle: 1   2   3   4   5   6   7   8
--------------------------------------------------
I1 (ADD R1): IF  ID  EX  MEM WB
I2 (SUB R4):     IF  ID  ID  ID  ID  EX  MEM WB
                     ^   ^   ^   ^
                     |   |   |   |
                     |   |   |   +--- I2 needs R1 here, but I1 writes R1 at end of CC5.
                     |   |   +------- I2 stalls
                     |   +----------- I2 stalls
                     +--------------- I2 stalls
                     (3 stall cycles for I2)

With Forwarding (Bypass):

Clock Cycle: 1   2   3   4   5   6   7
--------------------------------------------------
I1 (ADD R1): IF  ID  EX  MEM WB
I2 (SUB R4):     IF  ID  EX  MEM WB
                     ^   ^
                     |   |
                     |   +--- I2 needs R1 in EX (CC4).
                     +------- I1 computes R1 in EX (CC3).
                             Forwarding path from I1's EX to I2's EX.
                             (0 stall cycles for I2)

Diagram explanation:
- Each row represents an instruction, each column a clock cycle.
- "IF", "ID", "EX", "MEM", "WB" denote the pipeline stages.
- In the "Without Forwarding" case, I2 needs R1 in CC3 (ID stage, to prepare for EX). But I1 writes R1 only at the end of CC5 (WB stage). I2 must stall for 3 cycles (CC3, CC4, CC5) before it can proceed to EX in CC6, reading the value from the register file.
- In the "With Forwarding" case, I1 computes the value for R1 during its EX stage in CC3. This value is immediately "forwarded" (bypassed) to I2's EX stage, where I2 needs it in CC4. This allows I2 to proceed without stalling. The arrow indicates this data path.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of a busy highway (the pipeline).
    *   **S**tructural Hazard: A lane closure ahead (a shared resource is blocked). **S**top.
    *   **D**ata Hazard: You need to merge, but the car in front hasn't signaled yet (a value isn't ready). **D**elay.
        *   RAW: You need to read the sign on the truck ahead, but it's still being painted.
        *   WAR/WAW: Less common on a simple highway, more like advanced traffic control reordering.
    *   **C**ontrol Hazard: You reach a fork in the road, but the GPS hasn't decided which way to go (a branch decision is pending). **C**onfuse and **C**orrect.
    So, "SDC: Stop, Delay, Confuse/Correct."

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **CPI (Cycles Per Instruction):** $\text{CPI}_{\text{actual}} = \text{CPI}_{\text{ideal}} + \text{stall\_cycles\_per\_instruction}$. Hazards increase CPI, reducing performance.
    *   **RAW vs. WAR/WAW:** RAW is a *true dependency* needing value preservation; WAR/WAW are *false dependencies* (anti/output) resolvable by register renaming in out-of-order execution.
    *   **Forwarding's Limitation:** Forwarding resolves *most* RAW hazards, but a **load-use hazard** (instruction immediately following a `LW` uses the loaded value) typically still requires a 1-cycle stall.

3.  **Spaced-repetition schedule:**
    *   Review this lesson: 1 day after initial study.
    *   Review again: 3 days after the first review.
    *   Review again: 7 days after the second review.
    *   Review again: 16 days after the third review.
    *   Final review: 35 days after the fourth review.
    Focus on drawing pipeline diagrams and explaining each hazard type and its resolution without notes during reviews.

4.  **First-principles re-derivation pathway:**
    If you forget the details, always start by drawing a simple 5-stage pipeline for a few instructions.
    1.  **Draw the pipeline stages:** IF | ID | EX | MEM | WB.
    2.  **Trace instructions:** Write out instructions (I1, I2, I3...) and manually place them in stages cycle by cycle.
    3.  **Identify resource conflicts:** Look for any two instructions needing the *same stage's hardware* in the *same clock cycle*. This is a **structural hazard**.
    4.  **Identify data dependencies:** For each instruction, list the registers it reads and writes. Then, for a given instruction (say, I_k), check if any preceding instruction (I_j, where j < k) writes to a register that I_k reads (RAW), or if I_j reads a register that I_k writes (WAR), or if I_j writes a register that I_k writes (WAW).
    5.  **Check timing for data dependencies:**
        *   **RAW:** Does I_k try to read before I_j has finished writing? If so, a RAW hazard exists.
        *   **WAR/WAW:** These are primarily concerns for out-of-order execution. In a simple in-order pipeline, they are usually handled implicitly by the strict ordering.
    6.  **Identify control flow changes:** Look for `BEQ`, `JUMP`, `CALL` instructions. When such an instruction is in ID or EX, what instruction is being fetched? What if the branch goes the other way? This is a **control hazard**.
    7.  **Apply resolution strategies:**
        *   **Structural:** Insert a bubble (stall) until the resource is free.
        *   **RAW:** If no forwarding, stall until WB. If forwarding, can the result be sent from EX or MEM to the dependent instruction's EX stage? If a `LW` is involved, remember the 1-cycle load-use stall.
        *   **Control:** What's the prediction strategy? If mispredicted, how many stages need to be flushed?

This systematic approach will allow you to re-derive the behavior and consequences of any pipeline hazard.

## 10. Connections — what this leads to

Understanding pipeline hazards is not just an isolated topic; it's a foundational concept that unlocks many advanced topics in computer architecture and performance optimization:

1.  **Out-of-Order Execution (OoOE):** The most direct consequence. To mitigate stalls from data hazards (especially WAR/WAW) and structural hazards, modern CPUs don't always execute instructions in program order. They reorder instructions, execute them when their operands are ready, and then commit results in program order. Hazards are the *reason* OoOE exists.
2.  **Branch Prediction:** Control hazards are so costly that sophisticated hardware (branch predictors) are integrated into CPUs to guess the outcome of branches. This topic delves into various prediction algorithms (e.g., branch history tables, two-bit predictors, gshare, perceptron predictors) and their accuracy.
3.  **Register Renaming:** This technique is essential for resolving WAR and WAW hazards in out-of-order execution. It eliminates false data dependencies by mapping architectural registers to a larger pool of physical registers, allowing instructions that write to the same architectural register to proceed concurrently.
4.  **Superscalar and VLIW Architectures:** These architectures aim to execute multiple instructions *per clock cycle*. This dramatically increases the potential for all types of hazards, requiring even more advanced hazard detection and resolution logic, or careful instruction scheduling by the compiler (VLIW).
5.  **Memory Consistency Models:** In multi-core processors, the way different cores see memory updates can be affected by how instructions are reordered and hazards are resolved within each core's pipeline. Understanding pipeline hazards is a prerequisite for grasping why complex memory consistency models (e.g., sequential consistency, relaxed consistency) are necessary.
6.  **Cache Coherence:** When multiple cores have caches, ensuring that all cores see a consistent view of shared memory (cache coherence) becomes critical. Pipeline hazards interact with cache behavior, particularly with load/store operations and potential stalls due to cache misses or coherence protocol messages.
7.  **Compiler Optimizations:** Compilers play a crucial role in mitigating hazards by reordering instructions (instruction scheduling) to minimize dependencies and fill pipeline bubbles. Understanding hazards helps compiler writers produce more efficient machine code.
8.  **Speculative Execution:** To overcome control hazards, modern CPUs often execute instructions down a predicted path *before* the branch outcome is known. If the prediction is wrong, the speculative work is discarded. This technique is deeply intertwined with branch prediction and out-of-order execution.
9.  **Security Vulnerabilities (e.g., Spectre, Meltdown):** Believe it or not, sophisticated attacks like Spectre and Meltdown exploit the very mechanisms (speculative execution, out-of-order execution, branch prediction) designed to mitigate pipeline hazards. Understanding how these mechanisms work at a deep level is crucial for comprehending these vulnerabilities.

## 11. Self-check questions

1.  Describe, in your own words, the fundamental difference between a structural hazard and a data hazard. Provide a simple example for each that clearly illustrates this distinction.
2.  Consider the following MIPS instruction sequence in a