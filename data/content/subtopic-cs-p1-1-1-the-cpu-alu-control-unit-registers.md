## What it is
The Central Processing Unit (CPU) is the primary component of a computer that executes instructions. It contains three critical sub-components: the Arithmetic Logic Unit (ALU), which performs calculations; the Control Unit (CU), which directs the flow of operations; and Registers, which are small, extremely fast storage locations for data the CPU is actively working on.

## Why it matters
Understanding this internal structure is fundamental to performance engineering. In aerospace, simulating airflow over a rocket wing involves trillions of floating-point operations; the speed of the ALU and the efficiency of the CU in feeding it data from registers determine how fast these simulations run. In machine learning, training a neural network is largely a series of massive matrix multiplications, an operation directly handled by the ALU, making CPU architecture a key factor in training time.

## When to study it
You must understand two concepts before this one:
1.  **Binary Number Representation:** How integers are represented using bits (0s and 1s).
2.  **Basic Logic Gates:** The function of AND, OR, NOT, and XOR gates.

If you are not solid on these, pause and review them. We will build the ALU directly from these ideas.

## How to study it (step by step)
1.  **Review Binary Addition:** On paper, add two 4-bit binary numbers, e.g., $0110_2$ (6) + $0111_2$ (7). Pay close attention to the "carry" bit you generate in each column. This physical process is exactly what the ALU hardware mimics.
2.  **Model a 1-bit Adder:** Draw a circuit diagram for a "full adder" using only AND, OR, and XOR gates. A full adder takes three inputs (bit A, bit B, and a Carry-In bit) and produces two outputs (a Sum bit and a Carry-Out bit). This is the fundamental building block of the ALU.
3.  **Chain the Adders:** Imagine connecting four of these 1-bit full adders in a chain. The Carry-Out from the first adder becomes the Carry-In for the second, and so on. You have just designed a 4-bit "ripple-carry adder," a simple version of the addition circuit inside an ALU.
4.  **Trace an Instruction:** Write down a simple, hypothetical instruction: `LOAD R1, 1010`. This means "load the binary value 1010 into Register 1". Now, write a second instruction: `ADD R2, R1, 0011`. This means "add the value in Register 1 to the binary value 0011 and store the result in Register 2".
5.  **Role-play the CPU:** Act out the previous step. The Control Unit fetches `LOAD`, decodes it, and places `1010` into the box you've drawn for `R1`. Then, the CU fetches `ADD`, decodes it, sends the value from `R1` and the value `0011` to the ALU's inputs, commands the ALU to perform addition, and directs the ALU's output into the box for `R2`. This clarifies the distinct roles.

## Key ideas, with intuition
1.  **The CPU is a Clockwork Machine:** The CPU does not "think." It blindly executes a cycle over and over at a pace set by an internal clock. This is the **Fetch-Decode-Execute cycle**.
    *   **Fetch:** The Control Unit fetches the next instruction from memory.
    *   **Decode:** The Control Unit looks at the instruction (which is just a binary number) and figures out what it means (e.g., `0001` might mean `ADD`). It then activates the necessary circuits.
    *   **Execute:** The instruction is carried out. This might involve the ALU doing math, data being moved between registers, or other components.
2.  **Division of Labor is Everything:** The CPU's components are highly specialized.
    *   **Control Unit (The Manager):** Reads the program's instructions and issues commands. It doesn't do the work itself; it directs traffic. It's the chef reading the recipe.
    *   **ALU (The Calculator):** A collection of digital circuits designed to perform arithmetic (add, subtract) and logic (AND, OR, NOT) operations. It only does what the CU tells it to do. It's the food processor that chops and mixes.
    *   **Registers (The Scratchpad):** Tiny, lightning-fast memory locations directly on the CPU chip. They hold the immediate inputs and outputs for the ALU. They are the small bowls on the countertop holding the ingredients you're using *right now*.
3.  **Memory is a Hierarchy:** Not all memory is equal. The closer it is to the ALU, the faster it must be.
    $$ \text{Registers (fastest, smallest)} \rightarrow \text{Cache} \rightarrow \text{RAM} \rightarrow \text{Storage (slowest, largest)} $$
    Moving data between these levels is a major bottleneck. The entire purpose of registers is to keep the ALU fed with data at the speed it can compute, without waiting for the much slower RAM.

## Worked example
Let's trace the execution of a hypothetical instruction: `ADD R3, R1, R2`. This instruction means: "Take the value in Register 1, add it to the value in Register 2, and store the final result in Register 3."

Assume before the instruction begins:
- Register 1 (`R1`) contains the value $0101_2$ (5).
- Register 2 (`R2`) contains the value $0011_2$ (3).
- The Program Counter (a special register in the CU) points to the memory address containing the binary code for `ADD R3, R1, R2`.

**Step 1: Fetch**
The Control Unit looks at the Program Counter's address. It sends a signal to main memory (RAM) to retrieve the instruction stored at that location. The instruction, as a binary string, is loaded into the Instruction Register within the CU. The Program Counter is then automatically incremented to point to the *next* instruction.

**Step 2: Decode**
The Control Unit's circuitry analyzes the instruction's binary pattern. It identifies:
- The operation code (opcode) for `ADD`.
- The addresses of the source registers: `R1` and `R2`.
- The address of the destination register: `R3`.

**Step 3: Execute**
Based on the decoded instruction, the CU orchestrates the following micro-operations:
1.  It opens a path from `R1` to the first input of the ALU. The value $0101_2$ flows into the ALU.
2.  It opens a path from `R2` to the second input of the ALU. The value $0011_2$ flows into the ALU.
3.  It sends a control signal to the ALU that activates the addition circuitry.
4.  The ALU performs the binary addition:
    ```
      0101
    + 0011
    ------
      1000
    ```
5.  The ALU outputs the result, $1000_2$ (8).
6.  The CU opens a path from the ALU's output to the input of `R3`. The value $1000_2$ is written into `R3`, overwriting its previous contents.

**Reflection:** Each step is a distinct, physical event. The CU acts as a switchboard operator, connecting components and issuing commands. The ALU is a "dumb" calculator that only activates when told. The registers are simple storage cells that hold values. The cycle then repeats for the next instruction.

## Diagrams
A high-level view of the core CPU components and their interaction with main memory (RAM).

```text
+-----------------------------------------------------------------+
|                        CPU                                      |
|                                                                 |
|   +-----------------------+         +------------------------+  |
|   |    Control Unit (CU)  | ------->| Arithmetic Logic Unit  |  |
|   |                       |         |         (ALU)          |  |
|   | - Fetches from RAM    |<------->|                        |  |
|   | - Decodes Instruction |         | - Add, Subtract        |  |
|   | - Directs Data Flow   |         | - AND, OR, NOT         |  |
|   +-----------------------+         +------------------------+  |
|             ^                                   ^               |
|             | Control Signals                   | Data          |
|             v                                   v               |
|   +----------------------------------------------------------+  |
|   |                        Registers                         |  |
|   |  [ R0 ] [ R1 ] [ R2 ] [ R3 ] ... [ Program Counter ] ...  |  |
|   +----------------------------------------------------------+  |
|                                                                 |
+-----------------------------------------------------------------+
      ^                   |
      | Data Bus          | Address Bus
      v                   |
+-----------------------------------------------------------------+
|                        Main Memory (RAM)                        |
|                                                                 |
+-----------------------------------------------------------------+
```

## Memory technique — remember this forever
1.  **The Story: The CPU Chef.**
    *   The **Control Unit** is the **Chef**. The Chef reads the recipe (the program/instructions).
    *   The **ALU** is the **Food Processor**. It does the actual work—chopping, mixing, blending (adding, multiplying, comparing)—but only when the Chef turns it on and gives it ingredients.
    *   The **Registers** are the small **Mise en Place Bowls** on the counter. They hold the exact ingredients (data) you need for the current step of the recipe. They are small and right at hand for speed. RAM is the pantry you have to walk to.

2.  **Must Overlearn:**
    *   CPU = Control Unit (directs) + ALU (calculates) + Registers (stores).
    *   The core process is the **Fetch-Decode-Execute** cycle.
    *   **Memory Hierarchy:** Registers > Cache > RAM. Speed decreases, size increases.

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (Day 1).
    *   Review in 3 days.
    *   Review in 7 days.
    *   Review in 16 days.
    *   Review in 35 days.

4.  **First Principles Derivation:**
    If you forget the components, ask: "To execute `C = A + B`, what is the absolute minimum I need?"
    *   I need something to *perform* the addition. That's the **ALU**.
    *   I need a place to *hold* A, B, and C temporarily while I work. Those are the **Registers**.
    *   I need something to *understand* the instruction "add A and B and put it in C" and to manage the process of moving data from the registers to the ALU and back. That's the **Control Unit**.

## Common mistakes
1.  **Confusing Registers and RAM.** Mistake: "The CPU gets the data from RAM, adds it, and puts it back in RAM." Correction: The CPU loads data from RAM into registers *first*, performs operations on the registers, and only writes the final result back to RAM when necessary. The ALU cannot operate on RAM directly.
2.  **Thinking the ALU is "smart."** Mistake: "The ALU reads the instruction and decides to add." Correction: The ALU is a collection of circuits. The Control Unit decodes the instruction and sends a simple electrical signal (e.g., "turn on the adder circuit") to the ALU. The ALU has no intelligence.
3.  **Blurring the CU and ALU.** Mistake: "The Control Unit executes the addition." Correction: The Control Unit *manages* or *orchestrates* the execution. The ALU is the component that *performs* the arithmetic/logic operation.

## Self-check
1.  What physical constraints lead to the memory hierarchy (i.e., why can't we just make all of our memory as fast as registers)?
2.  An instruction `CMP R1, R2` compares the values in two registers. This operation doesn't produce a numerical result to be stored, but rather sets status flags (like a Zero Flag if the values are equal). Which CPU component would be responsible for setting these flags? Which component would later use these flags to make a decision (e.g., for a conditional jump)?
3.  Imagine a simple CPU where an instruction is 8 bits long. The first 3 bits represent the opcode (the command). The remaining 5 bits represent a register address. How many distinct operations can this CPU perform? How many registers can it have? What is the fundamental trade-off illustrated by this design?