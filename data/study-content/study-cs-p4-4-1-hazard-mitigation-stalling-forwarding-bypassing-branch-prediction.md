## 1. What it is — in plain English

Imagine you're building a car on an assembly line. Each car goes through several stations: first, the frame is built, then the engine is installed, then the doors, then painting, and finally, quality control. This is much faster than building one car completely at a time, because multiple cars are always in different stages of production. This "assembly line" approach is called pipelining in computers.

Now, what if the "engine installation" station needs a specific type of engine, but the "frame building" station hasn't finished preparing the car for that engine yet? The engine station can't do its job; it has to wait. If it waits, all the stations *after* it also have to wait, and the whole line slows down. This "waiting" or "jam" is what we call a **hazard** in a computer's pipeline.

**Hazard mitigation** is simply the set of clever tricks and techniques computers use to deal with these jams and keep the assembly line (the pipeline) moving as smoothly and quickly as possible. We want to avoid waiting, or at least minimize it. The main tricks are: **stalling** (making a station wait), **forwarding/bypassing** (getting the needed part from an earlier station immediately), and **branch prediction** (guessing which path the assembly line will take next).

Think of it like a chef cooking a complex meal. If one dish needs an ingredient from another dish that's not ready yet, the chef might: 1) **Stall**: Pause cooking the current dish until the ingredient is ready. 2) **Forward**: Grab the ingredient as soon as it's partially ready from the other dish, even if it's not completely finished. 3) **Predict**: If there's a choice between two recipes, guess which one the customer will want and start prepping for it early. These are the core ideas behind hazard mitigation in your computer's brain.

## 2. Why it matters — real-world applications

The techniques of hazard mitigation are absolutely fundamental to the performance of almost every modern computer system. Without them, our devices would be dramatically slower.

1.  **High-Performance Computing (HPC) and Scientific Simulations:** Supercomputers used for weather forecasting, climate modeling, nuclear fusion research (like ITER), and drug discovery rely heavily on deeply pipelined processors. When running complex simulations involving trillions of calculations, even a small percentage of pipeline stalls can translate into days or weeks of extra computation time. Efficient hazard mitigation ensures that the computational "assembly line" runs at near-optimal speed, allowing scientists to achieve breakthroughs faster.

2.  **Gaming and Real-time Graphics:** Modern video games demand extremely high frame rates and low latency for a smooth, immersive experience. Graphics Processing Units (GPUs) are massively parallel and highly pipelined. If a GPU's pipeline frequently stalled due to data dependencies or control hazards (e.g., an `if` statement determining which pixels to draw), the frame rate would drop, leading to choppy visuals. Advanced branch prediction and forwarding mechanisms in GPUs are crucial for rendering complex scenes quickly and consistently.

3.  **Machine Learning (ML) and Artificial Intelligence (AI):** Training large neural networks (like those powering ChatGPT or self-driving cars) involves billions of floating-point operations. Modern AI accelerators (e.g., NVIDIA's Tensor Cores, Google's TPUs) are designed with extremely deep pipelines. The efficiency of these pipelines, heavily dependent on minimizing hazards, directly impacts how quickly an AI model can be trained and deployed. Forwarding is particularly critical as the output of one layer often becomes the input for the next immediately.

4.  **Aerospace and Autonomous Systems:** In avionics (aircraft electronics) and autonomous vehicles, real-time decision-making is paramount. Flight control systems, autopilot, and self-driving car algorithms must execute instructions with predictable and minimal latency. A stall in the processor pipeline during a critical maneuver could have catastrophic consequences. Robust hazard mitigation techniques ensure that these systems respond quickly and reliably to environmental changes, even under heavy computational load.

5.  **Everyday Devices (Smartphones, Laptops):** While not as extreme as supercomputers, your smartphone or laptop also benefits immensely. When you open an app, stream a video, or browse the web, the CPU is executing millions of instructions. Without effective hazard mitigation, these common tasks would feel sluggish, battery life would be worse (due to inefficient use of power for stalled operations), and the overall user experience would be severely degraded. It's the silent hero making your daily digital life smooth.

## 3. Prerequisites — what you must know first

Before diving deep into hazard mitigation, you must have a solid understanding of the following concepts:

*   **Instruction Set Architecture (ISA):** The set of instructions a CPU can understand and execute (e.g., ADD, SUB, LW, SW, BEQ). You should know what registers are and how instructions operate on them.
*   **CPU Datapath:** The hardware components within the CPU that are responsible for performing operations (e.g., Program Counter (PC), Instruction Memory, Register File, ALU, Data Memory, Control Unit).
*   **Pipelining:** The technique of overlapping the execution of multiple instructions, breaking down instruction execution into stages (e.g., Instruction Fetch (IF), Instruction Decode (ID), Execute (EX), Memory Access (MEM), Write Back (WB)). This is the *most crucial* prerequisite.
*   **Clock Cycles:** The fundamental time unit for CPU operations. Each stage of the pipeline typically takes one clock cycle.
*   **Assembly Language (basic):** Ability to read and understand simple assembly code snippets (e.g., MIPS or RISC-V), especially how registers are used and modified.
*   **Memory Hierarchy (briefly):** A basic understanding of how caches and main memory work, particularly the concept of load/store operations accessing memory.

## 4. The core idea — step by step

Let's break down the concept of hazards and their mitigation techniques. We'll use a standard 5-stage pipeline as our running example:
1.  **IF (Instruction Fetch):** Fetch the instruction from memory.
2.  **ID (Instruction Decode):** Decode the instruction, read registers.
3.  **EX (Execute):** Perform the ALU operation or calculate memory address.
4.  **MEM (Memory Access):** Access data memory (read for load, write for store).
5.  **WB (Write Back):** Write result back to a register.

### Step 1: Understanding Pipeline Hazards

**Plain-English Statement:** A pipeline hazard is anything that prevents the next instruction in the pipeline from executing in its designated clock cycle. It's like a traffic jam on our assembly line.

**Small Concrete Example:**
Consider these two instructions:
```assembly
ADD R1, R2, R3  // R1 = R2 + R3
SUB R4, R1, R5  // R4 = R1 - R5
```
The `SUB` instruction needs the value of `R1` that is calculated by the `ADD` instruction. In a pipeline, the `ADD` instruction will write its result to `R1` only in its WB stage. If `SUB` tries to read `R1` in its ID stage, `R1` won't have the correct value yet. This is a hazard.

**Formal/Mathematical Version:**
A hazard occurs if an instruction $I_j$ attempts to use a resource or data value that instruction $I_i$ (where $i < j$) has not yet produced or released, and $I_i$ is still in the pipeline.
Hazards are typically classified into three types:
1.  **Structural Hazards:** Occur when two instructions need the same hardware resource at the same time.
    *   Example: A single memory unit used for both instruction fetch (IF) and data access (MEM) in the same clock cycle. If instruction $I_1$ is in MEM stage and $I_2$ is in IF stage, both need memory simultaneously.
2.  **Data Hazards:** Occur when an instruction depends on the result of a previous instruction that has not yet completed its execution. These are the most common.
    *   Types:
        *   **RAW (Read After Write):** An instruction tries to read a register *before* a preceding instruction has written to it. (Our `ADD`/`SUB` example above). This is the most common type of data hazard.
        *   **WAW (Write After Write):** An instruction tries to write to a register *before* a preceding instruction has written to it. Less common in simple pipelines, more relevant in out-of-order execution.
        *   **WAR (Write After Read):** An instruction tries to write to a register *before* a preceding instruction has read from it. Also less common in simple pipelines.
3.  **Control Hazards (Branch Hazards):** Occur when the pipeline makes a decision about which instruction to fetch next (e.g., a branch instruction) and that decision turns out to be wrong or takes too long to resolve.
    *   Example: A `BEQ` (Branch if Equal) instruction. The CPU doesn't know whether to fetch the next sequential instruction or an instruction from the branch target until the `BEQ` instruction's EX stage determines if the condition is true.

**What Could Go Wrong:** Not correctly identifying all dependencies between instructions, leading to incorrect program execution or silent bugs.

### Step 2: Stalling (Pipeline Bubbles or Interlocks)

**Plain-English Statement:** When a hazard is detected, the simplest way to fix it is to pause the instruction that's causing the problem and all instructions behind it. We insert "bubble" or "no-op" (no operation) instructions into the pipeline to create delays until the necessary data or resource is ready.

**Small Concrete Example:**
Using our `ADD`/`SUB` example:
```assembly
ADD R1, R2, R3  // I1: R1 = R2 + R3
SUB R4, R1, R5  // I2: R4 = R1 - R5
```
Without stalling, I2 would try to read R1 in its ID stage, while I1 is still in EX. R1 is only written by I1 in its WB stage.
To fix this with stalling:
*   I1: IF -> ID -> EX -> MEM -> WB (R1 updated)
*   I2 (needs R1): IF -> ID (detects hazard) -> **STALL** -> **STALL** -> **STALL** -> ID (R1 now available) -> EX -> MEM -> WB
The instructions after I2 also stall. This effectively adds empty cycles, slowing down the pipeline.

**Formal/Mathematical Version:**
To resolve a RAW data hazard between $I_i$ and $I_j$ where $I_j$ depends on the result of $I_i$, if $I_i$ writes to register $R_d$ in its WB stage (cycle $C_{WB,i}$) and $I_j$ reads $R_d$ in its ID stage (cycle $C_{ID,j}$), a stall is inserted if $C_{ID,j} < C_{WB,i}$. The number of stall cycles, $N_{stall}$, is calculated to ensure $C'_{ID,j} \ge C_{WB,i}$.
For a 5-stage pipeline, if $I_i$ is in EX and $I_j$ is in ID, $I_j$ needs the result of $I_i$ which will be ready 3 cycles later (MEM, WB). So, $I_j$ needs to stall for 2 cycles to wait for $I_i$ to finish WB. More precisely, $I_j$ needs $R_d$ at the *end* of its ID stage, which is the *start* of its EX stage. $I_i$ produces $R_d$ at the *end* of its WB stage.
In a typical 5-stage pipeline:
- `ADD R1, R2, R3` (I1) writes to R1 at the end of WB stage.
- `SUB R4, R1, R5` (I2) reads R1 at the end of ID stage (to be used in EX).
If I1 is in EX, I2 is in ID. I1 will write R1 in (current cycle + 2) (MEM, WB). I2 needs R1 in (current cycle + 0) (ID). So, I2 must stall for 2 cycles.
This can be expressed as an increase in CPI (Cycles Per Instruction). If $N_{hazards}$ is the number of hazards and $N_{stalls}$ is the average stalls per hazard, then $CPI = CPI_{ideal} + \frac{\sum N_{stalls}}{N_{instructions}}$.

**What Could Go Wrong:** Stalling too much or too little. Too much leads to unnecessary performance loss. Too little leads to incorrect results. Stalling is effective but computationally expensive.

### Step 3: Forwarding (Bypassing)

**Plain-English Statement:** Instead of waiting for the result of an instruction to be written all the way back to the register file, we can "snoop" on the result as soon as it's computed in an earlier pipeline stage and immediately "forward" it to the instruction that needs it. It's like the engine station getting a partially built frame directly from the frame station, rather than waiting for it to go through all the intermediate steps.

**Small Concrete Example:**
Again, `ADD R1, R2, R3` (I1) and `SUB R4, R1, R5` (I2).
*   I1: IF -> ID -> EX (R1 computed here) -> MEM -> WB
*   I2: IF -> ID (needs R1) -> EX
When I1 is in its EX stage, the result for R1 is *already computed* by the ALU. Instead of waiting for it to go through MEM and WB stages to be written into the register file, we can directly "forward" this computed value from the output of I1's EX stage to the input of I2's EX stage. This avoids most stalls.

**Formal/Mathematical Version:**
Forwarding paths are added from the output of the EX/MEM register and MEM/WB register to the input of the EX stage.
A data hazard is detected if an instruction $I_j$ needs a register $R_s$ (source) that is being written by $I_i$ (destination $R_d$), and $R_s = R_d$.
Forwarding logic checks:
1.  Is the register written by the instruction in EX/MEM stage (e.g., $R_{EX/MEM.Rd}$) needed by the current instruction $I_j$ in EX stage (e.g., $R_{ID.Rs1}$ or $R_{ID.Rs2}$)? If yes, forward from EX/MEM.
2.  Is the register written by the instruction in MEM/WB stage (e.g., $R_{MEM/WB.Rd}$) needed by $I_j$? If yes, forward from MEM/WB.
This allows the value to be available in time for the EX stage of $I_j$.
There are still cases where forwarding can't completely eliminate stalls, particularly with `LW` (Load Word) instructions. A `LW` instruction reads data from memory in its MEM stage. If the very next instruction needs that loaded data, it will still have to stall for one cycle because the data is not available until the *end* of the MEM stage, which is too late for the *start* of the next instruction's EX stage. This is known as a **load-use hazard**.

$$ \text{Forwarding Condition (simplified for EX/MEM to EX):} \\ \text{IF } (EX/MEM.RegWrite \text{ AND } (EX/MEM.RegisterRd \neq 0) \text{ AND } (EX/MEM.RegisterRd = ID.RegisterRs1)) \\ \text{THEN } ALU\_src1 = \text{Forwarded\_Value\_from\_EX/MEM} $$
Similar conditions apply for $ID.RegisterRs2$ and for forwarding from the MEM/WB stage.

**What Could Go Wrong:** Incorrectly identifying which value to forward (e.g., forwarding an old value), or not handling the specific `LW` hazard correctly, which still requires a single stall.

### Step 4: Branch Prediction

**Plain-English Statement:** Branch instructions (like `if` statements or loops) create a problem because the CPU doesn't know which instruction to fetch next until the branch condition is evaluated. This evaluation happens relatively late in the pipeline (usually EX stage). If the CPU waits, the pipeline will be empty for several cycles. Branch prediction is about guessing which way the branch will go (taken or not taken) and fetching instructions based on that guess. If the guess is right, the pipeline keeps flowing. If it's wrong, we have to throw away the wrongly fetched instructions and start over.

**Small Concrete Example:**
```assembly
    BEQ R1, R2, Target // If R1 == R2, branch to Target
    ADD R3, R4, R5     // I_sequential
Target:
    SUB R6, R7, R8     // I_target
```
When `BEQ` is fetched, the CPU doesn't know if `R1 == R2`. It might guess "not taken" and fetch `ADD`. If `R1 == R2` turns out to be true, the `ADD` instruction (and any instructions fetched after it) must be "flushed" or "squashed" from the pipeline, and `SUB` must be fetched instead. This "flush" is the penalty for a misprediction.

**Formal/Mathematical Version:**
The penalty for a branch misprediction is the number of cycles it takes to detect the misprediction and fetch the correct instruction. In a 5-stage pipeline, if the branch condition is resolved in the EX stage, and the PC is updated in IF, then 3 instructions (the branch itself, and 2 instructions fetched after it) might be in the pipeline before the misprediction is detected. The instructions in IF, ID, EX stages are flushed. The new PC is then fetched. This typically incurs a penalty of 2-3 cycles.
$$ \text{Branch Penalty} = (\text{Cycles to resolve branch}) - 1 $$
For a 5-stage pipeline, if branch resolution is in EX, the penalty is $EX - IF = 3 - 1 = 2$ cycles (the instruction in IF, ID stages are flushed, and the EX stage instruction is the branch itself). Or, more commonly, it's the number of stages *after* IF where the branch outcome is determined. If EX determines it, then IF, ID, EX are occupied. The correct instruction is fetched after EX. So, 2 instructions are fetched wrongly.
Types of Branch Prediction:
1.  **Static Prediction:** Predicts based on fixed rules (e.g., always predict not taken, always predict taken for backward branches (loops)). Simple, but not very accurate.
2.  **Dynamic Prediction:** Predicts based on the past behavior of the branch. Uses hardware structures like:
    *   **Branch Prediction Buffer (BPB) / Branch History Table (BHT):** Stores recent outcomes of branches (taken/not taken).
    *   **Two-bit Predictor:** A common dynamic predictor that uses a 2-bit state machine (e.g., Strongly Taken, Weakly Taken, Weakly Not Taken, Strongly Not Taken) to make predictions, providing hysteresis to avoid rapid changes in prediction.
    *   **Branch Target Buffer (BTB):** Stores the target address of a branch, allowing the next instruction to be fetched even before the branch is fully decoded.

$$ \text{Effective CPI} = CPI_{ideal} + (\text{Branch Frequency} \times \text{Misprediction Rate} \times \text{Branch Penalty}) $$

**What Could Go Wrong:** A high misprediction rate can severely degrade performance, making pipelining less effective than expected, sometimes even worse than a non-pipelined approach for highly unpredictable code.

### Step 5: Combining Mitigation Techniques

**Plain-English Statement:** Modern CPUs use a combination of all these techniques. They have sophisticated forwarding paths, and they use highly accurate dynamic branch predictors. Stalling is a last resort, typically used only for complex scenarios that forwarding can't handle (like load-use hazards) or when a branch prediction turns out to be wrong.

**Small Concrete Example:**
Consider this sequence:
```assembly
LW  R1, 0(R2)   // I1: R1 = Mem[R2+0]
ADD R3, R1, R4  // I2: R3 = R1 + R4
SUB R5, R3, R6  // I3: R5 = R3 - R6
```
1.  **I1 (LW):** Fetches data in MEM stage.
2.  **I2 (ADD):** Needs R1.
    *   Without forwarding: Stalls until I1 writes R1 in WB.
    *   With forwarding: I1 produces R1 in MEM stage. I2 needs R1 in EX stage. There's still a 1-cycle stall (load-use hazard) because R1 is ready *after* I2's ID stage but *before* I2's EX stage. The data from MEM is forwarded to I2's EX stage, but I2's EX stage needs it at the *start* of the cycle, and I1's MEM stage only *produces* it at the *end* of the previous cycle. So, I2 needs to wait one cycle.
3.  **I3 (SUB):** Needs R3.
    *   I2 computes R3 in its EX stage. This value can be directly forwarded from I2's EX/MEM register to I3's EX stage input. No stall needed here.

**Formal/Mathematical Version:**
The control logic for a pipelined CPU becomes complex, combining hazard detection units (for data and structural hazards), forwarding units, and branch prediction units.
The hazard detection unit monitors source and destination registers of instructions in various pipeline stages. If a RAW hazard is detected that cannot be resolved by forwarding (e.g., a load-use hazard), it asserts a stall signal.
The forwarding unit determines if any data can be bypassed from later stages (EX/MEM or MEM/WB) to the EX stage inputs.
The branch prediction unit predicts the outcome and target of branches. If a misprediction occurs, the pipeline controller flushes incorrect instructions and restarts fetching from the correct target.

$$ \text{Overall CPI} = CPI_{ideal} + \sum (\text{stalls due to load-use}) + \sum (\text{branch misprediction penalties}) $$
This formula shows that even with forwarding and branch prediction, some performance penalties remain. The goal is to minimize these.

**What Could Go Wrong:** The complexity of combining these techniques can introduce subtle bugs in the control logic, leading to incorrect program execution under specific instruction sequences. Thorough testing and formal verification are crucial in CPU design.

## 5. Worked examples — multiple, with every step shown

We'll use a 5-stage MIPS-like pipeline (IF, ID, EX, MEM, WB) and assume a single-cycle latency for each stage. We'll show pipeline stages with `I_x, Stage_y` notation.

### Example 1: Simple Data Hazard (RAW) requiring Stall

**Problem:** Show the pipeline execution for the following sequence, assuming no forwarding. Identify the hazard and the necessary stalls.
```assembly
I1: ADD R1, R2, R3   // R1 = R2 + R3
I2: SUB R4, R1, R5   // R4 = R1 - R5
```
**Given:** 5-stage pipeline (IF, ID, EX, MEM, WB), no forwarding.
**Want:** Pipeline diagram showing instruction flow and stalls.

**Solution:**

*   **Step 1: Identify dependencies.**
    *   Instruction I2 (`SUB`) needs the value of `R1`.
    *   Instruction I1 (`ADD`) writes to `R1`.
    *   This is a RAW (Read After Write) data dependency.

*   **Step 2: Determine when `R1` is written by I1.**
    *   I1 writes to `R1` in its WB stage.

*   **Step 3: Determine when `R1` is read by I2.**
    *   I2 reads `R1` in its ID stage (to be used in EX).

*   **Step 4: Analyze timing without stalls/forwarding.**
    | Cycle | C1  | C2  | C3  | C4  | C5  | C6  | C7  |
    | :---- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
    | I1    | IF  | ID  | EX  | MEM | WB  |     |     |
    | I2    |     | IF  | ID  | EX  | MEM | WB  |     |

    *   In C3, I1 is in EX, I2 is in ID.
    *   I2 in ID tries to read `R1`.
    *   `R1` will be written by I1 only at the end of C5 (I1's WB stage).
    *   Therefore, in C3, I2 will read an incorrect (stale) value of `R1`. This is a hazard.

*   **Step 5: Insert stalls.**
    *   I2 needs `R1` at the start of its EX stage (end of ID).
    *   I1 writes `R1` at the end of its WB stage.
    *   From the point I2 is in ID (C3), I1 will finish WB in C5.
    *   So, I2 needs to wait for C3, C4, C5 to pass before it can proceed to EX.
    *   This means I2 needs to stall for 2 cycles in its ID stage.

*   **Step 6: Construct the pipeline diagram with stalls.**

    ```text
    Cycle:  1   2   3   4   5   6   7   8
    --------------------------------------------------
    I1: ADD R1, R2, R3    IF  ID  EX  MEM WB
    I2: SUB R4, R1, R5        IF  ID  ST  ST  ID  EX  MEM WB
    ```

    *   **C1:** I1 fetches.
    *   **C2:** I1 decodes, I2 fetches.
    *   **C3:** I1 executes, I2 decodes. **Hazard detected:** I2 needs R1, but I1 hasn't written it yet. I2 must stall.
    *   **C4:** I1 memory access, I2 stalls.
    *   **C5:** I1 writes back R1. R1 is now updated in the register file. I2 is still stalled.
    *   **C6:** I1 is done. I2 can now proceed from its ID stage, reading the correct R1. I2 executes.
    *   **C7:** I2 memory access.
    *   **C8:** I2 writes back.

    The pipeline diagram clearly shows the two stall cycles (ST) for I2.

*   **Final Answer:**
    ```text
    Cycle:  1   2   3   4   5   6   7   8
    --------------------------------------------------
    I1: ADD R1, R2, R3    IF  ID  EX  MEM WB
    I2: SUB R4, R1, R5        IF  ID  ST  ST  ID  EX  MEM WB
    ```
    The `SUB` instruction stalls for 2 cycles.

*   **Reflection:** This example highlights the fundamental problem of data hazards without any mitigation. The `ID` stage of `I2` must wait for the `WB` stage of `I1`. The trickiness lies in correctly counting the number of stall cycles required, which depends on the pipeline depth and when the result is produced vs. when it's needed.

### Example 2: Data Hazard (RAW) resolved by Forwarding

**Problem:** Show the pipeline execution for the same sequence as Example 1, but now assuming full forwarding paths are implemented. Identify if any stalls are still needed.
```assembly
I1: ADD R1, R2, R3   // R1 = R2 + R3
I2: SUB R4, R1, R5   // R4 = R1 - R5
```
**Given:** 5-stage pipeline, full forwarding (from EX/MEM and MEM/WB registers to EX stage inputs).
**Want:** Pipeline diagram showing instruction flow and any remaining stalls.

**Solution:**

*   **Step 1: Identify dependencies.**
    *   Same as before: I2 needs `R1`, which I1 writes. RAW dependency.

*   **Step 2: Determine when `R1` is computed by I1.**
    *   I1 computes `R1` at the end of its EX stage. This value is then available in the EX/MEM register.

*   **Step 3: Determine when `R1` is needed by I2.**
    *   I2 needs `R1` at the start of its EX stage.

*   **Step 4: Analyze timing with forwarding.**
    | Cycle | C1  | C2  | C3  | C4  | C5  | C6  |
    | :---- | :-- | :-- | :-- | :-- | :-- | :-- |
    | I1    | IF  | ID  | EX  | MEM | WB  |     |
    | I2    |     | IF  | ID  | EX  | MEM | WB  |

    *   In C3: I1 is in EX, I2 is in ID.
    *   I1 computes `R1` at the end of C3.
    *   I2 needs `R1` at the start of its EX stage, which is C4.
    *   The value of `R1` from I1's EX stage (computed C3) is available in the EX/MEM register at the start of C4.
    *   This value can be forwarded directly from the EX/MEM register to the input of I2's EX stage.
    *   No stall is needed.

*   **Step 5: Construct the pipeline diagram.**

    ```text
    Cycle:  1   2   3   4   5   6
    --------------------------------------------------
    I1: ADD R1, R2, R3    IF  ID  EX  MEM WB
    I2: SUB R4, R1, R5        IF  ID  EX  MEM WB
    ```

    *   **C1:** I1 fetches.
    *   **C2:** I1 decodes, I2 fetches.
    *   **C3:** I1 executes (computes R1). I2 decodes (reads R1, but the value is stale).
    *   **C4:** I1 memory access. I2 executes. At the start of C4, the value of R1 from I1's EX stage (computed in C3) is forwarded to I2's EX stage. I2 uses this forwarded value.
    *   **C5:** I1 writes back R1. I2 memory access.
    *   **C6:** I2 writes back.

*   **Final Answer:**
    ```text
    Cycle:  1   2   3   4   5   6
    --------------------------------------------------
    I1: ADD R1, R2, R3    IF  ID  EX  MEM WB
    I2: SUB R4, R1, R5        IF  ID  EX  MEM WB
    ```
    No stalls are needed due to forwarding.

*   **Reflection:** This clearly demonstrates the power of forwarding. By making the computed value available earlier, we eliminate the stalls that would otherwise cripple performance. This is why forwarding is a cornerstone of modern pipeline design.

### Example 3: Load-Use Hazard with Forwarding

**Problem:** Show the pipeline execution for the following sequence, assuming full forwarding. Identify any remaining hazards and necessary stalls.
```assembly
I1: LW  R1, 0(R2)   // R1 = Mem[R2+0]
I2: ADD R3, R1, R4  // R3 = R1 + R4
```
**Given:** 5-stage pipeline, full forwarding.
**Want:** Pipeline diagram showing instruction flow and any remaining stalls.

**Solution:**

*   **Step 1: Identify dependencies.**
    *   Instruction I2 (`ADD`) needs the value of `R1`.
    *   Instruction I1 (`LW`) writes to `R1`.
    *   This is a RAW data dependency.

*   **Step 2: Determine when `R1` is produced by I1.**
    *   I1 (`LW`) reads data from memory in its MEM stage. The value of `R1` is available at the *end* of I1's MEM stage. This value is then available in the MEM/WB register.

*   **Step 3: Determine when `R1` is needed by I2.**
    *   I2 needs `R1` at the start of its EX stage.

*   **Step 4: Analyze timing with forwarding.**
    | Cycle | C1  | C2  | C3  | C4  | C5  | C6  |
    | :---- | :-- | :-- | :-- | :-- | :-- | :-- |
    | I1    | IF  | ID  | EX  | MEM | WB  |     |
    | I2    |     | IF  | ID  | EX  | MEM | WB  |

    *   In C3: I1 is in EX, I2 is in ID.
    *   In C4: I1 is in MEM (reads R1 from memory). I2 is in EX (needs R1).
    *   The value of `R1` from I1 is only available at the *end* of C4 (I1's MEM stage).
    *   I2 needs `R1` at the *start* of C4 for its EX stage.
    *   Since the data is not ready at the *start* of C4, forwarding from MEM/WB (which would contain the value from I1's MEM stage) is too late for I2's EX stage in C4.
    *   Therefore, I2 must stall for one cycle.

*   **Step 5: Insert stalls and construct the pipeline diagram.**
    *   I2 will stall for 1 cycle in its ID stage. After the stall, the value from I1's MEM stage (now in MEM/WB register) can be forwarded to I2's EX stage.

    ```text
    Cycle:  1   2   3   4   5   6   7
    --------------------------------------------------
    I1: LW  R1, 0(R2)     IF  ID  EX  MEM WB
    I2: ADD R3, R1, R4        IF  ID  ST  EX  MEM WB
    ```

    *   **C1:** I1 fetches.
    *   **C2:** I1 decodes, I2 fetches.
    *   **C3:** I1 executes, I2 decodes. **Hazard detected:** I2 needs R1 for EX in C4, but I1 will only produce it at the end of C4 (MEM stage). I2 must stall.
    *   **C4:** I1 memory access (R1 value available at end of C4). I2 stalls.
    *   **C5:** I1 writes back R1. I2 executes. At the start of C5, the value of R1 from I1's MEM stage (now in MEM/WB register) is forwarded to I2's EX stage. I2 uses this forwarded value.
    *   **C6:** I2 memory access.
    *   **C7:** I2 writes back.

*   **Final Answer:**
    ```text
    Cycle:  1   2   3   4   5   6   7
    --------------------------------------------------
    I1: LW  R1, 0(R2)     IF  ID  EX  MEM WB
    I2: ADD R3, R1, R4        IF  ID  ST  EX  MEM WB
    ```
    The `ADD` instruction stalls for 1 cycle due to a load-use hazard, even with forwarding.

*   **Reflection:** This example demonstrates the **load-use hazard**, a classic scenario where forwarding alone cannot completely eliminate a stall. The data from memory simply isn't available early enough for the very next instruction. This is a common performance bottleneck in pipelined processors and often a focus for compiler optimizations (e.g., reordering instructions to put independent instructions between `LW` and its dependent instructions).

### Example 4: Branch Misprediction Penalty

**Problem:** Consider a 5-stage pipeline with a "always predict not taken" static branch predictor. Show the pipeline execution when a `BEQ` instruction is encountered, and the branch is *taken*. Calculate the branch penalty.
```assembly
I1: SUB R1, R2, R3
I2: BEQ R1, R0, Target  // Assume R1 == R0, so branch is TAKEN
I3: ADD R4, R5, R6      // Sequential instruction (predicted not taken)
I4: AND R7, R8, R9      // Sequential instruction (predicted not taken)
...
Target:
I_T1: OR R10, R11, R12  // First instruction at branch target
```
**Given:** 5-stage pipeline, "always predict not taken" static branch predictor. Branch condition resolved in EX stage.
**Want:** Pipeline diagram showing misprediction and flush, and the branch penalty.

**Solution:**

*   **Step 1: Understand the prediction strategy.**
    *   "Always predict not taken" means when `I2: BEQ` is fetched, the CPU assumes the branch will *not* be taken and continues fetching `I3: ADD` and `I4: AND` sequentially.

*   **Step 2: Determine when the branch outcome is resolved.**
    *   The `BEQ` instruction resolves its condition (`R1 == R0`) in its EX stage.

*   **Step 3: Analyze pipeline flow with prediction.**
    | Cycle | C1  | C2  | C3  | C4  | C5  | C6  | C7  | C8  |
    | :---- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
    | I1    | IF  | ID  | EX  | MEM | WB  |     |     |     |
    | I2    |     | IF  | ID  | EX  | MEM | WB  |     |     |
    | I3    |     |     | IF  | ID  | EX  | MEM | WB  |     |
    | I4    |     |     |     | IF  | ID  | EX  | MEM | WB  |

    *   **C1:** I1 fetches.
    *   **C2:** I1 decodes, I2 fetches.
    *   **C3:** I1 executes, I2 decodes. I3 fetches (predicted not taken).
    *   **C4:** I1 memory, I2 executes. **Branch outcome determined here: TAKEN.** I3 decodes, I4 fetches (predicted not taken).
        *   At the end of C4, the CPU realizes the prediction ("not taken") was wrong. The branch was actually TAKEN.
        *   Instructions I3 and I4 (currently in ID and IF stages, respectively) were fetched incorrectly. They must be flushed.
        *   The correct target address (`Target`) must now be fetched.
    *   **C5:** Pipeline flush. I3 (ID) and I4 (IF) are squashed. The PC is set to `Target`. `I_T1` (OR) is fetched from `Target`.
    *   **C6:** `I_T1` decodes.
    *   **C7:** `I_T1` executes.

*   **Step 4: Construct the pipeline diagram with flush.**

    ```text
    Cycle:  1   2   3   4   5   6   7   8   9
    -----------------------------------------------------------------------
    I1: SUB R1, R2, R3    IF  ID  EX  MEM WB
    I2: BEQ R1, R0, Target    IF  ID  EX  FLUSH FLUSH FLUSH MEM WB
    I3: ADD R4, R5, R6            IF  ID  FLUSH FLUSH
    I4: AND R7, R8, R9                IF  FLUSH
    I_T1: OR R10, R11, R12                      IF  ID  EX  MEM WB
    ```

    *   **C1-C3:** Normal execution, I3 is fetched.
    *   **C4:** I2 (BEQ) is in EX. It determines `R1 == R0` is TRUE, so the branch is TAKEN.
        *   The prediction "not taken" was wrong.
        *   I3 (in ID) and I4 (in IF) were fetched incorrectly.
    *   **C5:** The pipeline is flushed. I3 and I4 are discarded. The PC is set to `Target`. `I_T1` is fetched.
    *   **C6:** `I_T1` decodes.
    *   **C7:** `I_T1` executes.

*   **Step 5: Calculate Branch Penalty.**
    *   The `BEQ` instruction (I2) completes its EX stage in C4.
    *   The correct instruction (`I_T1`) is fetched in C5.
    *   Without the misprediction, `I_T1` would have been fetched in C3 (if the branch was known to be taken immediately after I2's IF stage).
    *   The effective start of `I_T1` is C5. The ideal start would be C3.
    *   Penalty = (Actual fetch cycle of target) - (Ideal fetch cycle of target)
    *   Penalty = C5 - C3 = 2 cycles.
    *   Alternatively, the instructions I3 and I4 were fetched and then flushed. That's 2 instructions.
    *   The branch penalty is the number of cycles lost due to the misprediction before the correct instruction can enter the pipeline. Here, I3 and I4 were flushed, and I_T1 starts 2 cycles later than it ideally could have.

*   **Final Answer:**
    ```text
    Cycle:  1   2   3   4   5   6   7   8   9
    -----------------------------------------------------------------------
    I1: SUB R1, R2, R3    IF  ID  EX  MEM WB
    I2: BEQ R1, R0, Target    IF  ID  EX  FLUSH FLUSH FLUSH MEM WB
    I3: ADD R4, R5, R6            IF  ID  FLUSH FLUSH
    I4: AND R7, R8, R9                IF  FLUSH
    I_T1: OR R10, R11, R12                      IF  ID  EX  MEM WB
    ```
    The branch misprediction incurs a penalty of **2 cycles**. Instructions I3 and I4 are flushed.

*   **Reflection:** This example illustrates the cost of a branch misprediction. The "FLUSH" indicates cycles where the pipeline is actively discarding incorrect work. The penalty is the difference between the actual completion time of the target instruction and its ideal completion time if the branch was perfectly predicted. The key is to understand *when* the misprediction is detected and *how many* instructions are in flight that need to be flushed.

### Example 5: Combined Hazards

**Problem:** Show the pipeline execution for the following sequence, assuming full forwarding and an "always predict not taken" branch predictor. The branch is taken.
```assembly
I1: LW  R1, 0(R2)     // R1 = Mem[R2+0]
I2: ADD R3, R1, R4    // R3 = R1 + R4
I3: SUB R5, R3, R6    // R5 = R3 - R6
I4: BEQ R5, R0, Target // Assume R5 == R0, so branch is TAKEN
I5: AND R7, R8, R9     // Sequential instruction (predicted not taken)
...
Target:
I_T1: OR R10, R11, R12 // First instruction at branch target
```
**Given:** 5-stage pipeline, full forwarding, "always predict not taken" branch predictor. Branch condition resolved in EX stage.
**Want:** Pipeline diagram showing all hazards, stalls, forwarding, and flushes.

**Solution:**

*   **Step 1: Identify all dependencies and potential hazards.**
    *   **I1 (LW) -> I2 (ADD):** I2 needs R1 (from I1). This is a load-use hazard. Requires 1 stall even with forwarding.
    *   **I2 (ADD) -> I3 (SUB):** I3 needs R3 (from I2). This can be resolved by forwarding from I2's EX/MEM register. No stall.
    *   **I3 (SUB) -> I4 (BEQ):** I4 needs R5 (from I3). This can be resolved by forwarding from I3's EX/MEM register. No stall.
    *   **I4 (BEQ):** Branch instruction. Predict "not taken", but it's actually TAKEN. This will cause a misprediction penalty.

*   **Step 2: Construct the pipeline diagram cycle by cycle, applying mitigation.**

    ```text
    Cycle:  1   2   3   4   5   6   7   8   9   10  11
    -------------------------------------------------------------------------------
    I1: LW R1, 0(R2)      IF  ID  EX  MEM WB
    I2: ADD R3, R1, R4        IF  ID  ST  EX  MEM WB
    I3: SUB R5, R3, R6            IF  ID  EX  MEM WB
    I4: BEQ R5, R0, Target            IF  ID  EX  FLUSH FLUSH FLUSH MEM WB
    I5: AND R7, R8, R9                    IF  ID  FLUSH
    I_T1: OR R10, R11, R12                          IF  ID  EX  MEM WB
    ```

    *   **C1:** I1 fetches.
    *   **C2:** I1 decodes, I2 fetches.
    *   **C3:** I1 executes, I2 decodes.
        *   **Hazard detected:** I2 needs R1 for its EX stage (C4), but I1 (LW) will only produce R1 at the end of its MEM stage (C4). This is a load-use hazard. I2 must stall.
    *   **C4:** I1 memory access (R1 available end of C4). I2 stalls. I3 fetches.
    *   **C5:** I1 writes back R1. I2 executes (R1 forwarded from I1's MEM/WB register). I3 decodes. I4 fetches (predicted not taken).
        *   **Forwarding:** R1 from I1's MEM/WB (from C4) is forwarded to I2's EX stage.
    *   **C6:** I2 memory access (R3 available end of C6). I3 executes. I4 decodes. I5 fetches (predicted not taken).
        *   **Forwarding:** R3 from I2's EX/MEM (from C5) is forwarded to I3's EX stage.
    *   **C7:** I2 writes back R3. I3 memory access (R5 available end of C7). I4 executes.
        *   **Branch Outcome:** I4 (BEQ) in EX determines `R5 == R0` is TRUE. Branch is TAKEN.
        *   **Misprediction detected:** Prediction "not taken" was wrong. I5 (in IF) needs to be flushed.
        *   **Forwarding:** R5 from I3's EX/MEM (from C6) is forwarded to I4's EX stage.
    *   **C8:** Pipeline flush. I5 is squashed. PC set to `Target`. `I_T1` is fetched.
    *   **C9:** I4 memory access (I4 still finishes its own stages). `I_T1` decodes.
    *   **C10:** I4 writes back. `I_T1` executes.
    *   **C11:** `I_T1` memory access.

*   **Final Answer:**
    ```text
    Cycle:  1   2   3   4   5   6   7   8   9   10  11
    -------------------------------------------------------------------------------
    I1: LW R1, 0(R2)      IF  ID  EX  MEM WB
    I2: ADD R3, R1, R4        IF  ID  ST  EX  MEM WB
    I3: SUB R5, R3, R6            IF  ID  EX  MEM WB
    I4: BEQ R5, R0, Target            IF  ID  EX  FLUSH FLUSH FLUSH MEM WB
    I5: AND R7, R8, R9                    IF  ID  FLUSH
    I_T1: OR R10, R11, R12                          IF  ID  EX  MEM WB
    ```
    This sequence incurs:
    *   **1 stall cycle** for I2 due to the load-use hazard from I1.
    *   **Forwarding** effectively resolves the RAW hazards between I2-I3 and I3-I4.
    *   **1 cycle flush** for I5 due to the branch misprediction. The penalty for I4's misprediction is 1 cycle (I5 was fetched and flushed). The target instruction `I_T1` is fetched 1 cycle later than it would have been if perfectly predicted.

*   **Reflection:** This example demonstrates how multiple hazard types can interact. The load-use hazard still requires a stall. Forwarding handles subsequent data hazards. Finally, the branch misprediction causes a flush, overriding the predicted path. The total performance impact is the sum of stalls and misprediction penalties. This level of analysis is crucial for understanding real-world CPU performance.

## 6. Common mistakes and traps

1.  **Confusing Hazard Types:** Students often mix up structural, data, and control hazards. Remember: Structural = resource conflict, Data = data dependency, Control = branch/jump uncertainty.
2.  **Incorrectly Counting Stall Cycles for Data Hazards:** Forgetting that forwarding can resolve *most* data hazards, but not *all* (especially the load-use hazard). Also, miscalculating how many cycles an instruction needs to stall to get the data, based on when it's produced vs. when it's needed.
3.  **Ignoring the Load-Use Hazard:** This is a very common trap. Even with full forwarding, a `LW` instruction followed immediately by an instruction that uses its result will almost always incur a 1-cycle stall because the data from memory is not available until the very end of the MEM stage, which is too late for the EX stage of the *next* instruction.
4.  **Miscalculating Branch Penalty:** Forgetting which stages are flushed or miscounting the number of cycles lost. The penalty is not just the number of instructions flushed, but the number of cycles the pipeline is idle or performing useless work before the correct instruction can enter the pipeline.
5.  **Assuming Perfect Forwarding/Prediction:** While ideal scenarios are good for learning, real-world systems have limitations. Not all data can be forwarded (e.g., from memory), and branch predictors are never 100% accurate.
6.  **Overlooking Register 0 (R0/X0):** In ISAs like MIPS or RISC-V, register `R0` (or `X0`) is hardwired to zero and cannot be written. This means it can never be the target of a write operation, and thus never cause a RAW hazard as a destination register. However, it can be a source register for any instruction.

## 7. Textbook-precise explanation

In the context of deeply pipelined processors, **pipeline hazards** represent conditions that prevent the next instruction in the instruction stream from executing in its designated clock cycle. These hazards necessitate the introduction of delays, thereby reducing the ideal Cycles Per Instruction (CPI) of 1.

There are three primary categories of pipeline hazards:

1.  **Structural Hazards:** These arise when two or more instructions in different pipeline stages simultaneously require the same hardware resource. For instance, a single memory port might be contended by an instruction in the Instruction Fetch (IF) stage and another in the Memory Access (MEM) stage. Mitigation often involves duplicating resources (e.g., separate instruction and data caches, known as Harvard architecture) or implementing arbitration logic with subsequent stalling.

2.  **Data Hazards:** Occur when an instruction depends on the result of a prior instruction that has not yet completed its execution and written its result back to the register file.
    *   **RAW (Read After Write):** An instruction $I_j$ attempts to read a register before an earlier instruction $I_i$ has written to it. This is the most prevalent type.
    *   **WAW (Write After Write):** An instruction $I_j$ attempts to write to a register before an earlier instruction $I_i$ has written to it. This is primarily a concern in pipelines that allow out-of-order writes.
    *   **WAR (Write After Read):** An instruction $I_j$ attempts to write to a register before an earlier instruction $I_i$ has read from it. Also mostly relevant in out-of-order pipelines.

    **Stalling (Pipeline Interlock/Bubble):** The simplest mitigation for data hazards is to pause the pipeline. When a hazard detection unit identifies a dependency where the required data is not yet available, it inserts "bubbles" or No-Op (No Operation) instructions into the pipeline. This effectively delays the dependent instruction and all subsequent instructions until the data becomes available. For a 5-stage pipeline, a RAW hazard between an ALU instruction $I_i$ (writing in WB) and $I_j$ (reading in ID) would typically require two stall cycles.

    **Forwarding (Bypassing):** A more sophisticated and common technique, forwarding, involves creating direct data paths between pipeline registers (e.g., EX/MEM, MEM/WB) and the input of the Execute (EX) stage. If an instruction $I_j$ requires a result produced by an earlier instruction $I_i$, and $I_i$'s result is available in a pipeline register before it reaches the register file, the value is "forwarded" directly to $I_j$'s EX stage. This significantly reduces or eliminates stalls for most RAW hazards. A notable exception is the **load-use hazard**, where an instruction immediately following a Load Word (`LW`) instruction attempts to use the loaded data. Since the data is only available at the end of the `LW`'s MEM stage, it is too late for the dependent instruction's EX stage in the very next cycle, thus requiring a single stall cycle even with full forwarding.

3.  **Control Hazards (Branch Hazards):** These occur due to the uncertainty of control flow changes introduced by branch, jump, or call instructions. The decision of which instruction to fetch next (sequential address or target address) is typically resolved in a later pipeline stage (e.g., ID or EX). If the pipeline waits for this resolution, several cycles are wasted.

    **Branch Prediction:** To mitigate control hazards, processors employ branch prediction, where the CPU guesses the outcome of a branch (taken or not taken) and the target address, and then speculatively fetches instructions based on this guess.
    *   **Static Branch Prediction:** Predicts based on fixed rules (e.g., always predict not taken, or predict backward branches as taken for loops).
    *   **Dynamic Branch Prediction:** Utilizes hardware structures to record past branch outcomes and predict future behavior. Common components include:
        *   **Branch Prediction Buffer (BPB) / Branch History Table (BHT):** A cache storing recent branch addresses and their outcomes (e.g., 1-bit or 2-bit predictors). A 2-bit predictor provides hysteresis, requiring two mispredictions to change a prediction state.
        *   **Branch Target Buffer (BTB):** A cache that stores the target address of taken branches, allowing the PC to be updated to the predicted target address even before the branch instruction is fully decoded.
    If a prediction is correct, the pipeline continues without interruption. If a **misprediction** occurs, the speculatively fetched instructions must be "flushed" or "squashed" from the pipeline, and the correct instruction stream must be fetched, incurring a **branch penalty** (typically 1-3 cycles for a 5-stage pipeline, depending on where the branch is resolved). The effective CPI is increased by the product of branch frequency, misprediction rate, and branch penalty.

These mitigation techniques are synergistically combined in modern microarchitectures to maximize pipeline throughput, as discussed in detail in "Computer Architecture: A Quantitative Approach" by Hennessy and Patterson.

## 8. ASCII diagrams

Here's a diagram illustrating a 5-stage pipeline with a data hazard and how forwarding and stalling resolve it.

```text
                                  +---------------------+
                                  | Register File       |
                                  | (R0-R31)            |
                                  +---------------------+
                                        ^   ^
                                        |   |
                                        |   | (Read Reg1, Reg2)
                                        |   |
                                        |   |
                                        |   |
                                        V   V
                                +---------------------+
                                | IF  | ID  | EX  | MEM | WB  |
                                +---------------------+
                                  ^     |     ^     |     ^
                                  |     |     |     |     |
                                  |     |     |     |     |
                                  |     |     |     |     |
                                  |     |     |     |     |
                                  |     |     |     |     |
                                  |     |     |     |     |
                                  |     V     |     V     |
                                  |  Instruction  |  ALU  |  Data   |  Write  |
                                  |  Fetch        |  Decode |  Execute |  Memory |  Back   |
                                  +-------------------------------------------------------+
                                  |  PC -> Mem[PC]  | Regs, Ctl | ALU op  | Mem R/W | Reg Write |
                                  +-------------------------------------------------------+
                                          ^     ^
                                          |     |
                                          |     |
                                          |     |
                                          |     |
                                          |     |
                                          |     |
                                          V     V
                                  +-----------------+
                                  | Hazard Detection|
                                  | & Forwarding Unit|
                                  +-----------------+
                                          |     ^
                                          |     |  (Stall/Flush Signals)
                                          V     |
                                     +-----------------+
                                     | Pipeline Control|
                                     +-----------------+


Pipeline Execution Example: LW R1, 0(R2) then ADD R3, R1, R4
(Load-Use Hazard with Forwarding)

Cycle:  1   2   3   4   5   6   7
--------------------------------------------------
I1: LW  R1, 0(R2)     IF  ID  EX  MEM WB
I2: ADD R3, R1, R4        IF  ID  ST  EX  MEM WB
--------------------------------------------------

Explanation of the diagram and example:

1.  **Pipeline Stages:** The horizontal bar represents the 5 pipeline stages (IF, ID, EX, MEM, WB). Each stage performs a specific task for an instruction.
2.  **Resource Flow:**
    *   `Register File`: Stores general-purpose registers. Instructions read from it in ID and write to it in WB.
    *   `Hazard Detection & Forwarding Unit`: This is the brain for hazard mitigation. It monitors instructions in various stages, detects dependencies, and determines if forwarding is possible or if a stall is needed.
    *   `Pipeline Control`: Receives signals from the Hazard Detection Unit to insert stalls (bubbles) or flush instructions.
3.  **Forwarding Paths (not explicitly drawn as lines, but conceptually present):**
    *   The output of the `EX` stage (result of ALU operation) can be forwarded to the `EX` stage inputs of subsequent instructions.
    *   The output of the `MEM` stage (data read from memory for `LW` instructions) can be forwarded to the `EX` stage inputs.
    *   These forwarding paths allow data to "bypass" the register file write-back, making it available earlier.

**Example Walkthrough (Load-Use Hazard):**

*   **I1 (LW R1, 0(R2)):**
    *   C1: IF (fetches LW)
    *   C2: ID (decodes LW, reads R2)
    *   C3: EX (calculates memory address R2+0)
    *   C4: MEM (reads data from memory into R1. R1's value is available at the *end* of C4)
    *   C5: WB (writes R1 to Register File)

*   **I2 (ADD R3, R1, R4):**
    *   C2: IF (fetches ADD)
    *   C3: ID (decodes ADD, needs R1 and R4)
        *   **Hazard Detection:** The Hazard Detection Unit sees that I2 needs R1, which I1 is writing.
        *   **Problem:** I2 needs R1 at the *start* of its EX stage (C4). I1 will only have R1 ready at the *end* of its MEM stage (C4). Forwarding from I1's MEM stage to I2's EX stage is one cycle too late.
        *   **Action:** The Pipeline Control inserts a stall.
    *   C4: **STALL** (I2 is held in ID, I1 progresses to MEM)
    *   C5: EX (I2 executes). Now, at the *start* of C5, the value of R1 from I1's MEM stage (which completed at the end of C4) is available in the MEM/WB pipeline register. This value is **forwarded** to I2's EX stage inputs. I2 uses this forwarded value to compute R3.
    *   C6: MEM
    *   C7: WB

This diagram illustrates that even with forwarding, a single stall is necessary for the load-use hazard, as the memory access latency delays data availability.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a busy highway (the pipeline).
    *   **S**talling: A car (instruction) stops dead, holding up traffic behind it. (Visual: A car with a flat tire, causing a jam).
    *   **F**orwarding/Bypassing: Instead of waiting for a delivery truck (result) to go all the way to its depot (register file) and back, a drone (forwarding path) grabs the package (data) directly from the truck and delivers it to the waiting car. (Visual: A drone flying a package from one car to another on the highway).
    *   **B**ranch Prediction: At a fork in the road, the driver (CPU) guesses which way to go and takes it. If wrong, they have to turn around and take the other path, wasting time. (Visual: A car taking a wrong turn, then having to make a U-turn).
    **Mnemonic:** "SFB" - **S**talling, **F**orwarding, **B**ranch Prediction. These are the three main tools in the architect's toolbox for pipeline hazards.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Hazard Types:** Structural (resource), Data (dependency), Control (branch).
    *   **Load-Use Hazard:** Even with full forwarding, a `LW` followed immediately by an instruction using its result typically incurs a 1-cycle stall. This is a critical exception to forwarding's effectiveness.
    *   **CPI Impact:** $CPI_{actual} = CPI_{ideal} + \sum (\text{stalls per instruction}) + \sum (\text{branch misprediction penalties per instruction})$. This formula quantifies the performance cost of hazards.

3.  **Spaced-Repetition Schedule:**
    *   **Today:** Review this lesson thoroughly, ensure understanding of all examples.
    *   **1 Day:** Re-read the "Core Idea" and "Common Mistakes" sections. Redraw the ASCII diagram from memory.
    *   **3 Days:** Work through one new example problem combining all three techniques. Explain the solutions aloud.
    *   **7 Days:** Write a short summary of each mitigation technique in your own words, without referring to notes.
    *   **16 Days:** Attempt a harder problem, perhaps with a different pipeline depth or more complex instruction sequence.
    *   **35 Days:** Explain hazard mitigation to an imaginary peer, focusing on the "why" and "how" for each technique.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the details, rebuild from first principles:
    1.  **Start with Pipelining:** Imagine a simple 5-stage pipeline (IF, ID, EX, MEM, WB). What's the ideal CPI? (1 cycle per instruction).
    2.  **Introduce Dependencies:** Write two simple instructions where the second needs the result of the first (e.g., `ADD R1, R2, R3; SUB R4, R1, R5`).
    3.  **Identify the Problem (Hazard):** Trace these instructions through the pipeline. When does the first instruction produce its result? (End of WB). When does the second instruction need it? (Start of EX). Clearly, the data isn't ready. This is a **Data Hazard**.
    4.  **Derive Stalling:** What's the simplest fix? Just wait! How many cycles? Count the difference between when it's needed and when it's ready. This leads to **Stalling**.
    5.  **Derive Forwarding:** Waiting is slow. Can we get the data earlier? Where is the data *first* available? (End of EX stage). Can we send it directly to the next instruction's EX stage? Yes, with bypass paths. This leads to **