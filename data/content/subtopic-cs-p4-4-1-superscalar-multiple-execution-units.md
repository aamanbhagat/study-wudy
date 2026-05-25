## What it is
A superscalar processor executes more than one instruction per clock cycle. It achieves this by having multiple, redundant execution units within a single CPU core—for example, multiple Arithmetic Logic Units (ALUs) or Floating Point Units (FPUs)—and dispatching multiple instructions to them in parallel. This is a form of instruction-level parallelism (ILP).

## Why it matters
Superscalar design is the foundation of virtually all modern high-performance CPUs, from your laptop to the servers running large-scale physics simulations or training machine learning models. In aerospace, flight control systems and orbital mechanics calculations rely on processors that can execute instructions with minimal latency; superscalar architectures provide this by increasing the number of instructions completed per second, even if the clock speed remains the same. This is how we get faster computers without just making the clock tick faster.

## When to study it
Before tackling this, you must have a solid grasp of single-issue, pipelined processors. Specifically, you need to understand:
1.  **The classic 5-stage RISC pipeline:** Fetch (IF), Decode (ID), Execute (EX), Memory (MEM), Writeback (WB).
2.  **Pipeline Hazards:** Data hazards (RAW, WAR, WAW), control hazards (branches), and structural hazards.
3.  **Performance Metrics:** Clock cycle time, Cycles Per Instruction (CPI), and its reciprocal, Instructions Per Cycle (IPC).

If you cannot draw a pipeline diagram for a simple sequence of instructions and identify data dependencies, review that material first.

## How to study it (step by step)
1.  **Draw a scalar pipeline:** On paper, draw the 5-stage pipeline for a simple scalar (one instruction per stage) processor.
2.  **Draw a superscalar pipeline:** Now, draw a 2-way superscalar pipeline. The IF and ID stages must be "wider" to handle two instructions at once, and the EX stage must split into two parallel execution units (e.g., ALU1, ALU2).
3.  **Analyze for ILP:** Take the following instruction sequence: `ADD R3, R1, R2`; `SUB R6, R4, R5`; `OR R7, R3, R5`. Identify the data dependency (the `OR` depends on the `ADD`).
4.  **Trace execution:** Manually trace this sequence through both your scalar and 2-way superscalar diagrams. Note how the superscalar processor can execute the `ADD` and `SUB` in the same cycle, but must stall the `OR`.
5.  **Calculate Speedup:** For a long sequence of independent instructions, calculate the theoretical IPC for both processors. For a scalar processor, ideal IPC is 1. For an N-way superscalar, ideal IPC is N.
6.  **Consider the bottlenecks:** Brainstorm why the actual IPC is always less than N. List the challenges: fetching N instructions, decoding N instructions, finding N independent instructions, and managing writebacks from N units.

## Key ideas, with intuition
1.  **Parallelism, not just Pipelining:** Pipelining is like an assembly line for making one car; each stage works on a different car. Superscalar is like having multiple, parallel assembly lines. Both increase throughput, but superscalar does so by starting multiple "products" at once.

2.  **Instructions Per Cycle (IPC) > 1:** This is the goal. The fundamental CPU performance equation is:
    $$ T_{exec} = N_{instr} \times CPI \times T_{clk} $$
    Where $T_{exec}$ is total execution time, $N_{instr}$ is the number of instructions, $CPI$ is cycles per instruction, and $T_{clk}$ is the clock period. Superscalar architectures attack the $CPI$ term. By executing $N$ instructions per cycle, the ideal $CPI$ becomes $1/N$. It's more common to use the reciprocal, $IPC = N$.
    $$ IPC = \frac{N_{instr}}{\text{Total Cycles}} $$
    A scalar processor's IPC is at best 1. A superscalar processor's IPC can be greater than 1.

3.  **Dependencies are the Enemy:** The amount of parallelism you can actually use is limited by the code itself. Consider two instructions `i` and `j`, where `j` comes after `i`. A *true data dependency* (Read-After-Write, RAW) exists if `j` reads a value that `i` writes.
    ```
    i: ADD R1, R2, R3  // R1 <- R2 + R3
    j: SUB R4, R1, R5  // R4 <- R1 - R5
    ```
    Instruction `j` cannot be dispatched in the same cycle as `i`, because it needs the result from `i`. The processor's dispatch logic must be smart enough to detect this and only issue independent instructions in parallel.

4.  **Hardware Complexity:** To make this work, the hardware must be much more complex than a simple scalar pipeline. You need:
    *   A wider fetch unit to grab multiple instructions from the cache.
    *   A wider decode unit to decode them all at once.
    *   A sophisticated dispatch unit to check for dependencies and send instructions to available execution units.
    *   More ports on the register file to allow for multiple simultaneous reads and writes.

## Worked example
Let's analyze the execution of four independent instructions on a scalar vs. a 2-way superscalar processor. Assume both have a 5-stage pipeline and each stage takes one cycle.

**Instruction Stream:**
```assembly
I1: ADD R3, R1, R2
I2: SUB R6, R4, R5
I3: AND R8, R7, R1
I4: OR R10, R9, R1
```
There are no data dependencies between these instructions.

**Scalar Processor Execution (IPC ≈ 1):**

| Cycle | IF  | ID  | EX  | MEM | WB  |
| :---- | :-: | :-: | :-: | :-- | :-- |
| 1     | I1  |     |     |     |     |
| 2     | I2  | I1  |     |     |     |
| 3     | I3  | I2  | I1  |     |     |
| 4     | I4  | I3  | I2  | I1  |     |
| 5     |     | I4  | I3  | I2  | I1  |
| 6     |     |     | I4  | I3  | I2  |
| 7     |     |     |     | I4  | I3  |
| 8     |     |     |     |     | I4  |

It takes 8 cycles to complete 4 instructions. The IPC is $4/8 = 0.5$. (Note: After the pipeline is full, it completes one instruction per cycle, so for a long stream, IPC approaches 1).

**2-Way Superscalar Processor Execution (IPC ≈ 2):**

This processor can fetch, decode, and execute two instructions per cycle.

| Cycle | IF       | ID       | EX       | MEM      | WB       |
| :---- | :------: | :------: | :------: | :------: | :------: |
| 1     | I1, I2   |          |          |          |          |
| 2     | I3, I4   | I1, I2   |          |          |          |
| 3     |          | I3, I4   | I1, I2   |          |          |
| 4     |          |          | I3, I4   | I1, I2   |          |
| 5     |          |          |          | I3, I4   | I1, I2   |
| 6     |          |          |          |          | I3, I4   |

It takes 6 cycles to complete 4 instructions. The IPC is $4/6 \approx 0.67$. For a long stream of independent instructions, the IPC would approach 2.

**Reflection:**
*   **Step 1:** We grouped instructions into pairs (I1/I2, I3/I4) because the processor is 2-way.
*   **Step 2:** Each pair moves through the pipeline stages together.
*   **Step 3:** The key insight is that the EX, MEM, and WB stages for I1 and I2 happen *in parallel* during cycles 3, 4, and 5, because there are two ALUs, two memory access paths (conceptually), and sufficient register file ports.
*   **Result:** The superscalar processor finished the job in 6 cycles vs. the scalar's 8, a speedup of $8/6 \approx 1.33x$. The speedup is not 2x for this short example because of the time to fill and drain the pipeline.

## Diagrams
A conceptual comparison of the Execute stage.

**Scalar Processor:**
```text
                  +-----+
Instruction ----> | EX  | ---->
                  +-----+
```

**2-Way Superscalar Processor:**
```text
                  +-------+
Instruction 1 ----> | EX 1  | ---->
                  +-------+
Instruction 2 ----> | EX 2  | ---->
                  +-------+
```

Pipeline timing diagram (Gantt chart view of the worked example):
```text
Scalar:
I1: | IF | ID | EX | MEM| WB |
I2:      | IF | ID | EX | MEM| WB |
I3:           | IF | ID | EX | MEM| WB |
I4:                | IF | ID | EX | MEM| WB |
    <------------------------------------------>
    Cycle 1                                  Cycle 8

2-Way Superscalar:
I1: | IF | ID | EX | MEM| WB |
I2: | IF | ID | EX | MEM| WB |
I3:      | IF | ID | EX | MEM| WB |
I4:      | IF | ID | EX | MEM| WB |
    <---------------------------------->
    Cycle 1                        Cycle 6
```

## Memory technique — remember this forever
1.  **Analogy:** Think of a **supermarket with multiple checkout lanes**.
    *   A **scalar** processor is a store with only **one lane open**. No matter how fast the cashier is (clock speed), you can only check out one customer at a time. Throughput is limited.
    *   A **superscalar** processor is a store that **opens multiple lanes**. The "dispatch logic" is the manager directing people to available cashiers. Now you can check out multiple customers at once (higher IPC).
    *   **Data dependencies** are a family where the child can't pay until the parent gives them money—the child's checkout has to wait for the parent's to finish.

2.  **Formulas to Overlearn:**
    *   Goal: $IPC > 1$ (Instructions Per Cycle)
    *   Performance Equation: $T_{exec} = N_{instr} \times CPI \times T_{clk}$ (Superscalar attacks CPI).

3.  **Spaced Repetition Schedule:** Review this material and re-derive the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, start with a simple 5-stage pipeline. Ask: "How can I complete more than one instruction per cycle?" The only way is to do one or more stages for multiple instructions simultaneously. The most obvious candidate is the Execute stage. If you add a second ALU, you can execute two independent `ADD` instructions at once. This forces the preceding Fetch/Decode stages to become wider to supply two instructions, and the subsequent stages to handle two results. This chain of reasoning reconstructs the entire concept.

## Common mistakes
1.  **Confusing Superscalar with Multicore:** Superscalar is multiple execution units *inside one core* to exploit instruction-level parallelism. Multicore is multiple independent cores *on one chip* to exploit thread-level parallelism. They are not the same.
2.  **Expecting Linear Speedup:** A 4-way superscalar processor is almost never 4x faster than a scalar one. The speedup is limited by the amount of ILP in the actual program code and the overhead of managing dependencies.
3.  **Forgetting about the Front-End:** Students often focus on the multiple execution units but forget that the fetch and decode stages must also be "superscalar." You can't feed two ALUs if you can only fetch and decode one instruction per cycle. This "front-end" of the pipeline is a major design challenge.

## Self-check
1.  What is the key difference between parallelism achieved through pipelining and parallelism achieved through a superscalar architecture?
2.  Consider a 2-way superscalar processor. Given the instruction sequence: `LW R3, 0(R1)`; `ADD R4, R3, R2`; `SUB R5, R6, R7`. Draw a pipeline timing diagram (Gantt chart style) showing its execution. What is the IPC for this short sequence?
3.  Why does the performance benefit of making a processor wider (e.g., going from 4-way to 8-way superscalar) diminish for typical desktop applications? What kind of workload *would* benefit greatly from a very wide architecture?