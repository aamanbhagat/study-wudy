## 1. The one-sentence answer
**A 5-stage pipeline divides the execution of every instruction into five sequential hardware stages—Instruction Fetch, Instruction Decode, Execute, Memory Access, and Write Back—so that multiple instructions can overlap in time while each still advances through exactly those five operations.**

In a non-pipelined processor an instruction must finish completely before the next one begins; the entire datapath idles while any single stage works. The pipeline inserts a set of pipeline registers after each stage, allowing the next instruction to enter the first stage as soon as the previous instruction has moved forward. Because the stages are balanced to roughly equal latency, the clock period can be set to the longest single stage rather than the sum of all stages, yielding throughput approaching one instruction per cycle once the pipe is full.

The five stages are not arbitrary; they mirror the natural dataflow of a RISC instruction: read the instruction from memory, examine its fields and read registers, perform the arithmetic or address calculation, access data memory if needed, and finally store the result back into the register file. Every instruction traverses all five stages even when some stages perform no useful work, guaranteeing that hazards and forwarding paths can be analyzed uniformly.

> [!NOTE]
> The pipeline does not reduce the latency of any individual instruction; it increases the rate at which instructions complete by keeping every stage busy on a different instruction each cycle.

## 2. Why this matters — concrete and current
Modern server CPUs from Intel and AMD use superscalar extensions of the classic five-stage pipeline; each core still contains the same IF–ID–EX–MEM–WB skeleton, now replicated and augmented with out-of-order schedulers. The ARM Cortex-A series that powers most smartphones and Apple’s M-series chips likewise retain a five-stage integer pipeline as the foundation for their in-order cores, allowing power-efficient scheduling of mobile workloads.

Spacecraft flight computers such as the RAD750 used on Mars rovers implement a five-stage pipeline with radiation-hardened pipeline registers; mission software timing analysis depends on knowing exactly how many cycles each instruction spends in each stage under single-event upset conditions.

In machine-learning accelerators such as Google’s TPU v4, the matrix-multiplication units are themselves pipelined with five explicit stages so that systolic data movement stays synchronized with the instruction pipeline of the scalar control cores.

Semiconductor design teams at TSMC and Samsung use cycle-accurate models of five-stage pipelines when performing power and thermal analysis of new process nodes; the activity factor of each pipeline stage directly determines dynamic power and electromigration lifetime.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Register file            | Supplies operands in ID and receives results in WB; pipeline must preserve read/write ordering. |
| ALU and address adder    | Implements the arithmetic performed in EX; latency of this unit sets the clock period. |
| Separate instruction and data memories (Harvard) | Allows IF and MEM to occur simultaneously without structural conflict. |
| Pipeline registers       | Hold intermediate values between stages; their presence is what enables overlap.     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Sequential execution baseline
A single instruction must read its bits, compute, and write results before the next instruction may begin.  
Example: the instruction `add x1, x2, x3` occupies the entire datapath for five clock cycles.  
Formally, total time for *n* instructions is  
$$T_{\text{seq}} = n \times (t_{\text{IF}} + t_{\text{ID}} + t_{\text{EX}} + t_{\text{MEM}} + t_{\text{WB}}).$$  
> [!WARNING]
> Treating the processor as a single black box hides the fact that the five sub-operations have very different hardware requirements and could run concurrently.

### Step 2 — Overlap via stage isolation
Inserting a register after each logical operation freezes the result of one stage so the next instruction can begin the preceding stage in the same cycle.  
Example: while instruction *i*+1 is fetched, instruction *i* is already being decoded.  
The pipeline depth *k*=5 yields a theoretical speedup of nearly 5 once steady state is reached.

### Step 3 — Stage 1: Instruction Fetch (IF)
The program counter supplies an address to the instruction memory; the fetched word and the incremented PC are written into the IF/ID pipeline register.  
Formal action:  
$$\text{IR} \leftarrow \text{Mem[PC]}, \quad \text{PC} \leftarrow \text{PC}+4.$$  
> [!WARNING]
> Forgetting that the PC update occurs in IF leads to incorrect branch-target calculations later.

### Step 4 — Stage 2: Instruction Decode / Register Fetch (ID)
The instruction bits are split into opcode, register specifiers, and immediates. Two reads from the register file occur in parallel.  
All control signals for later stages are generated combinatorially from the opcode.  
The values read and the PC are latched into ID/EX.

### Step 5 — Stage 3: Execute / Address Calculation (EX)
The ALU performs either an arithmetic operation on the two register values or an address computation for loads, stores, and branches.  
Results and possible branch outcome are written into EX/MEM.

### Step 6 — Stage 4: Memory Access (MEM)
Only load and store instructions use this stage; others simply forward their EX result. Data memory is read or written using the address computed in EX.  
Result and loaded data move into MEM/WB.

### Step 7 — Stage 5: Write Back (WB)
The result—either the ALU output or the value read from memory—is written into the destination register specified by the instruction.  
This completes the instruction.

### Step 8 — Textbook pipeline diagram and timing
The five stages connected by four pipeline registers produce a throughput of one instruction per cycle after the initial five-cycle fill. The formal latency of any single instruction remains five cycles; only the initiation interval drops to one cycle.

## 5. Worked examples — every step shown

**Example 1 — Single add instruction flow**  
*Given:* `add x3, x1, x2` at address 0x100.  
*Find:* state of each pipeline register after cycle 3.  
Cycle 1 (IF): IR = instruction bits, PC = 0x104 → IF/ID.  
Cycle 2 (ID): rs1=x1, rs2=x2 read; control = ALU add → ID/EX.  
Cycle 3 (EX): ALU result = x1+x2 → EX/MEM.  
*Why* each move follows the stage definition above.  
**Final answer:** After cycle 3 the add result sits in EX/MEM; the instruction has not yet written x3.

**Example 2 — Two consecutive adds**  
*Given:* `add x3,x1,x2` followed by `add x4,x3,x5`.  
*Find:* forwarding path required.  
Cycle 3: first add produces result in EX/MEM.  
Cycle 4: second add needs x3 in ID/EX; value is forwarded from EX/MEM ALU output.  
**Final answer:** Forwarding multiplexer selects EX/MEM result for rs1 of second instruction.

**Example 3 — Load followed by dependent add**  
*Given:* `lw x3,0(x1)` then `add x4,x3,x2`.  
*Find:* stall or forwarding decision.  
Load data arrives only at end of MEM (cycle 4). Add needs it in EX (cycle 4). One-cycle stall is inserted.  
**Final answer:** Pipeline inserts nop; add executes in cycle 5.

**Example 4 — Pipeline speedup calculation**  
*Given:* 100 instructions, each stage 200 ps, no hazards.  
*Find:* time and speedup versus non-pipelined.  
Non-pipelined: \(100 \times 1000\) ps = 100 ns.  
Pipelined: \(5 \times 200 + 99 \times 200\) ps = 20.8 ns.  
Speedup = 4.81.  
**Final answer:** 20.8 ns, speedup ≈ 4.81.

*Reflection:* The last two examples show that data hazards, not the pipeline itself, limit realized speedup.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming every instruction uses all five stages usefully | Loads/stores need MEM; ALU ops do not               | Track per-instruction activity with a usage table    |
| Forgetting PC update occurs in IF   | PC increment is drawn inside the IF box             | Always draw the PC adder inside the IF stage         |
| Ignoring that WB occurs at the end of the cycle | Register file write collides with ID read           | Use the standard “write in first half, read in second half” rule |
| Treating branch resolution as occurring in ID | Control hazard latency is miscalculated             | Place branch decision in EX and count correct delay slots |
| Assuming balanced stage delays      | ALU may be slower than IF                           | Insert explicit balance registers or accept bubbles  |
| Overlooking that stores write memory in MEM | Data forwarding paths miss store-data operand       | Add a separate store-data pipeline register field    |
| Counting pipeline registers as adding latency | Registers add setup time, not logic depth           | Include register clk-to-q and setup in critical-path analysis |

## 7. The textbook-precise statement
In a classic RISC five-stage pipeline the datapath is partitioned into the stages IF, ID, EX, MEM, and WB separated by edge-triggered pipeline registers. Every instruction traverses the stages in order; structural, data, and control hazards are resolved by stalls or forwarding. (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §C.1–C.3.)

## 8. Visual — diagram or schematic
```text
       IF        ID        EX        MEM       WB
PC ─► [IMem] ─► [RegFile] ─► [ALU] ─► [DMem] ─► [Write]
       ▲         ▲         ▲         ▲         │
       │         │         │         │         ▼
     PC+4     rs1/rs2   result    load data   reg
       │         │         │         │
     IF/ID     ID/EX     EX/MEM    MEM/WB   (back to RegFile)
```
Each box is a stage; vertical arrows show values latched into the named pipeline register at the clock edge.

## 9. The memory technique
1. **The hook** — Picture five workers standing in a row on an assembly line; each worker performs only one task and hands the partially built widget to the next person every second.
2. **What to overlearn** — The exact five stage names in order: IF, ID, EX, MEM, WB; the fact that latency stays five cycles while throughput approaches one instruction per cycle.
3. **Spaced-repetition schedule** — Review the stage order and one hazard example at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the pipeline by listing the five irreducible operations any instruction must perform and inserting a register after each.

## 10. What this unlocks
Mastery of the five-stage pipeline is the prerequisite for understanding data and control hazards, forwarding logic, branch prediction, and the transition to superscalar and out-of-order execution.  
- Scoreboarding and Tomasulo’s algorithm  
- Precise exception handling via reorder buffers  
- Pipeline scheduling in compilers  
- Performance modeling with CPI equations

## 11. Self-check — five questions, no answers
1. In which stage is the destination register number first known?  
2. Why must the register file support an internal write-then-read bypass for the same cycle?  
3. An instruction spends four cycles in the pipeline before it reaches MEM; how many instructions are ahead of it?  
4. If the EX stage delay is 250 ps and all others 200 ps, what is the new clock period and why?  
5. A load is followed immediately by an add that uses the loaded value. Exactly how many stall cycles are required before forwarding can supply the data?