## 1. The one-sentence answer
**Von Neumann architecture organises a computer around a single central memory that stores both instructions and data, accessed over one shared bus by a control unit, arithmetic-logic unit, and input/output devices.**

The design places every component on the same address and data pathways. When the processor fetches an instruction it occupies the bus; when it later reads or writes data the same bus is reused. This unification removes the need for separate instruction and data memories yet forces sequential access.

The resulting constraint is immediate: instruction fetch and data movement cannot occur simultaneously. Any program therefore spends cycles waiting for the bus, and the gap between CPU speed and memory speed widens with every technology generation.

> [!NOTE]
> The decisive insight is that one physical pathway must carry two logically distinct streams—code and data—creating an unavoidable serial choke point that later architectures have tried to relieve with caches, Harvard splits, or out-of-order execution.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight computer uses a RAD750 processor built on a classic von Neumann memory map; every image-compression routine and every thruster command competes for the same 3 MB of rad-hard SRAM, forcing careful scheduling of data movement against instruction fetch.

Modern high-performance CPUs such as Intel’s Sapphire Rapids retain the von Neumann logical model while inserting multiple cache levels and multiple memory controllers; the sustained bandwidth delivered to the cores is still governed by the original single-bus abstraction once misses reach DRAM.

Tensor Processing Units at Google’s data centres implement matrix-multiplication arrays that read weights and activations from the same HBM stacks; the compiler must therefore tile computations so that the shared memory channels never become saturated by simultaneous instruction and data traffic.

The RISC-V instruction set, now used in SiFive and Alibaba T-Head cores, encodes both 32-bit instructions and data words in a unified 32- or 64-bit address space; any SoC designer who ignores the resulting bus contention sees IPC drop exactly as von Neumann predicted in 1945.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary addressing        | Memory locations are selected by binary addresses on the shared bus. |
| Register transfer        | Data movement between ALU, registers and memory occurs in discrete clocked transfers. |
| Stored-program concept   | Both instructions and data reside in the same address space, enabling self-modifying code and uniform access. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory holds both code and data
A single addressable store contains numbers that sometimes represent instructions and sometimes represent operands.  
Example: address 0x1000 may contain the value 0xE3A00001 (an ARM mov) or the integer 42; the processor decides which interpretation applies only at fetch time.  
Formally, the memory is a function \( M : \{0,1\}^n \to \{0,1\}^w \) where the same domain supplies both instruction words and data words.  
> [!WARNING] Treating the two uses as separate address spaces collapses the model into Harvard architecture and removes the bottleneck by definition.

### Step 2 — One bus carries addresses and data
A shared address bus and a shared data bus connect the memory to the processor and to I/O.  
Example: to read the next instruction the control unit places the program counter on the address bus; later the same wires carry a load address.  
Formally, at any cycle \( t \) the bus carries either an instruction address or a data address, never both.  
> [!WARNING] Assuming the bus can be “split” without extra hardware reintroduces the very contention the architecture was designed to avoid.

### Step 3 — Control unit sequences fetch and execute
The control unit alternates between fetching the next instruction and executing it; both phases contend for the bus.  
Example: an ADD instruction requires one fetch cycle followed by two operand reads and one write-back.  
Formally, the instruction cycle is the sequence \( \text{Fetch}(PC) \to \text{Decode} \to \text{Execute} \), each memory reference occupying the bus.  
> [!WARNING] Overlapping fetch and execute without additional buses or caches simply lengthens the effective cycle time.

### Step 4 — Arithmetic-logic unit operates only on data brought across the bus
The ALU receives operands that have already traversed the memory bus; results return the same way.  
Formally, if \( \text{ALU}(a,b) = c \), then \( a \), \( b \) and \( c \) each require a distinct bus transaction unless they already reside in registers.  
> [!WARNING] Assuming the ALU can reach memory directly hides the latency that dominates real execution time.

### Step 5 — The bottleneck emerges as throughput limit
Let \( B \) be bus bandwidth in words per second and \( f \) the fraction of references that are instruction fetches. The maximum sustained instruction rate is bounded by \( B / (1+f) \).  
This inequality is the quantitative expression of the von Neumann bottleneck.  
> [!WARNING] Ignoring the factor \( f \) leads to optimistic pipeline-depth calculations that never materialise in silicon.

## 5. Worked examples — every step shown

**Example 1 — Single instruction fetch**  
*Given:* Program counter = 0x2000, instruction word length = 4 bytes, bus width = 32 bits, memory latency = 1 cycle.  
*Find:* Cycles required to fetch one instruction.  
Step 1: Place 0x2000 on address bus. *Why:* The control unit must select the memory location.  
Step 2: Memory drives 32-bit word onto data bus. *Why:* The instruction must travel the shared data path.  
Step 3: Latch word into instruction register, increment PC. *Why:* The architecture now holds the instruction for decode.  
**Answer: 1 cycle.**  
*Reflection:* Even the simplest step already occupies the bus exclusively.

**Example 2 — Load-add-store sequence**  
*Given:* ADD R1, [0x3000] on a von Neumann machine with no cache.  
*Find:* Bus transactions required.  
Step 1: Fetch instruction (bus used).  
Step 2: Read operand from 0x3000 (bus used).  
Step 3: Write result back if destination is memory (bus used).  
**Answer: 3 separate bus transactions.**  
*Reflection:* The single bus forces serialisation even when the ALU could compute in parallel.

**Example 3 — Bottleneck calculation**  
*Given:* DRAM bandwidth = 25 GB/s, average instruction size = 4 B, 40 % of references are data accesses.  
*Find:* Theoretical maximum instructions per second.  
Step 1: Total references per instruction = 1 + 0.4 = 1.4.  
Step 2: Words per second available = 25e9 / 4 = 6.25e9.  
Step 3: IPS = 6.25e9 / 1.4 ≈ 4.46e9.  
**Answer: 4.46 billion instructions per second.**  
*Reflection:* Real cores exceed this only by inserting caches that reduce effective \( f \).

**Example 4 — Self-modifying code**  
*Given:* Instruction at 0x100 writes a new opcode into 0x104.  
*Find:* Consequence for subsequent fetch.  
Step 1: Execute write; bus carries data address 0x104.  
Step 2: Next fetch uses the same bus to read the newly written value.  
**Answer: The modification is visible on the next fetch because both operations share the single address space.**  
*Reflection:* The architecture permits the program to alter its own instructions precisely because code and data occupy one memory.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming instruction and data fetches can overlap without caches | The shared-bus diagram is drawn once and then forgotten | Redraw the bus arrows for every memory reference in a pipeline diagram |
| Treating registers as part of the von Neumann bottleneck | Registers sit inside the CPU and never use the external bus | Count only external memory transactions when applying the \( B/(1+f) \) bound |
| Confusing Harvard and von Neumann after adding split caches | Caches are an optimisation layered on top of the logical model | Keep the logical address space unified even when physical buses are duplicated |
| Ignoring I/O DMA traffic | DMA controllers also master the same bus | Include DMA bandwidth in the total demand when sizing memory channels |
| Believing wider buses remove the bottleneck | Wider buses increase \( B \) but do not change the serial fetch-execute discipline | Recalculate the bound after each width increase; the ratio \( 1+f \) remains |
| Expecting self-modifying code to run at full speed | Writes and subsequent fetches contend on the identical bus | Profile such code and observe the stall cycles directly |
| Scaling clock frequency without memory improvement | CPU frequency rises while memory latency stays constant | Apply Little’s law to the memory queue to predict CPI growth |

## 7. The textbook-precise statement
A von Neumann machine consists of a processing unit containing an arithmetic-logic unit and a control unit, a single main memory storing both instructions and data, and input/output devices, all interconnected by a single address bus and a single data bus. At most one memory reference occurs per bus cycle. The architecture therefore obeys the throughput bound derived in Step 5. (Patterson & Hennessy, *Computer Organization and Design*, 5e, §1.3 and §5.1.)

## 8. Visual — diagram or schematic
```text
          ┌──────────────────────────────┐
          │          Main Memory         │
          │  Instructions & Data         │
          └──────────────┬───────────────┘
                         │ Address Bus (A)
                         │ Data Bus (D)
          ┌──────────────┴───────────────┐
          │        Control Unit          │
          │  PC → MAR → Memory → MDR     │
          └──────────────┬───────────────┘
                         │
          ┌──────────────┴───────────────┐
          │     Arithmetic-Logic Unit    │
          │  Registers, ALU, Status      │
          └──────────────┬───────────────┘
                         │
          ┌──────────────┴───────────────┐
          │        I/O Controllers       │
          └──────────────────────────────┘
```
All blocks share the same pair of buses; only one transaction is active at any instant.

## 9. The memory technique
**The hook** — Picture a single narrow bridge that both the librarian (instructions) and the readers (data) must cross; traffic jams are inevitable.

**What to overlearn** — The formula \( \text{IPS}_\text{max} = B / (1+f) \); the fact that code and data share one address space; the names of the five classic blocks (memory, ALU, CU, input, output).

**Spaced-repetition schedule** — Review the bound and the diagram at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the bound by counting memory references per instruction and dividing available bus bandwidth.

## 10. What this unlocks
Understanding the von Neumann bottleneck explains why every subsequent performance technique—caches, pipelining, superscalar issue, non-blocking loads, and eventually domain-specific accelerators—exists.

- Cache hierarchies (next lesson)  
- Harvard and modified Harvard variants  
- Out-of-order execution and register renaming  
- Memory consistency models  
- DMA and bus arbitration protocols  

## 11. Self-check — five questions, no answers
1. A processor issues one instruction fetch and one data load every cycle. If bus bandwidth is 16 GB/s and average reference size is 8 B, what is the theoretical instruction throughput?

2. Why does increasing register-file size mitigate but not eliminate the von Neumann bottleneck?

3. Draw the bus activity timeline for the two-instruction sequence “LOAD R1, [X]; STORE [Y], R1” on a machine with a single shared bus.

4. A program modifies the opcode of its next instruction. Which bus transaction occurs first—the write or the subsequent fetch—and why?

5. In a system containing both a CPU and a DMA engine, give one concrete scenario in which the von Neumann bottleneck becomes worse than the simple \( B/(1+f) \) prediction.