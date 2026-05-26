## 1. The one-sentence answer
**Hazard mitigation in a pipelined processor consists of the hardware and control mechanisms that detect pipeline hazards and insert stalls, forward results, or predict control flow to keep the pipeline flowing correctly.**

A pipeline divides instruction execution into stages so that multiple instructions overlap. When one instruction needs a result that a prior instruction has not yet written back, or when a branch changes the fetch address, the overlap breaks. Mitigation restores correctness without discarding the performance gain of pipelining.

Data hazards arise from read-after-write dependences; control hazards arise from conditional branches. Forwarding routes an ALU result directly to a dependent ALU input before the result reaches the register file. Stalling inserts bubbles when forwarding cannot resolve the dependence in time. Branch prediction guesses the outcome and the target so that the pipeline continues fetching useful work; a misprediction later flushes the wrong-path instructions.

> [!NOTE]
> Forwarding eliminates most data hazards without stalls, but every pipeline still requires a hazard-detection unit that forces a stall on a load-use dependence; branch prediction is the dominant technique for control hazards because the cost of a misprediction flush is now the dominant limiter of single-thread IPC.

## 2. Why this matters — concrete and current
Modern out-of-order cores in Intel’s Sapphire Rapids and AMD’s Zen 4 still contain forwarding networks and sophisticated hazard-detection logic between the scheduler and execution units; without them, load-use penalties would rise from one cycle to four or five, directly reducing SPEC CPU scores by 15–20 %.

Apple’s M-series chips use aggressive branch predictors with 10 000+ entries and perceptron-style history; the predictors allow the wide frontend to sustain six to eight instructions per cycle on typical integer code, which is essential for the energy-efficient performance that lets a MacBook Air run sustained compilation workloads without throttling.

In safety-critical aerospace flight-control computers such as those on Boeing 787 and Airbus A350, the pipeline must guarantee deterministic timing even on mispredicted branches; designers therefore combine stall logic with lock-step cores that compare results every cycle, ensuring that any hazard-induced replay does not violate the worst-case execution-time bounds required by DO-178C certification.

Google’s TPU v4 and NVIDIA’s Hopper H100 both employ software-visible scoreboard-style hazard detection for their matrix pipelines; the same forwarding and stall mechanisms that were once taught only for five-stage RISC pipelines now appear inside the systolic arrays that train large language models, directly affecting the tokens-per-second delivered to ChatGPT-scale workloads.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Five-stage RISC pipeline       | Provides the concrete stages (IF, ID, EX, MEM, WB) in which hazards are defined     |
| Register file read/write ports | Explains why a value written in WB is not visible to a dependent instruction in ID until the next cycle |
| ALU latency of one cycle       | Determines whether forwarding can supply a result in the same cycle or requires a stall |
| Branch instruction semantics   | Defines the control hazard that occurs when the new PC is not known until late in the pipeline |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pipeline overlap creates simultaneous read and write of the same register
Two instructions can be in the pipeline at the same time such that the second reads a register before the first has written it.  
Example: `add x1, x2, x3` followed immediately by `sub x4, x1, x5`. The `sub` reaches the ID stage and reads x1 while `add` is still in EX.  
Formally, a read-after-write (RAW) hazard exists when instruction *i* writes register *r* at cycle *c* and instruction *j* reads *r* at cycle *c* − *k* where *k* < pipeline writeback latency.  
> [!WARNING]
> Treating the register file as instantly updated leads to silently incorrect results; the read in ID must be compared against all earlier writes still in flight.

### Step 2 — Forwarding bypasses the register file writeback
The ALU result produced at the end of EX can be routed directly to the ALU input multiplexors of a later instruction still in EX.  
In the example above, the result of `add` is forwarded from the EX/MEM pipeline register to the ALU input of `sub` in the same cycle it would have been written.  
The forwarding condition is  
$$
\text{ForwardA} = (EX/MEM.\text{Rd} = ID/EX.\text{Rs1}) \land (EX/MEM.\text{Rd} \neq 0)
$$
with an analogous equation for ForwardB.  
> [!WARNING]
> Forgetting to exclude register 0 produces an incorrect zero operand when x0 is the destination.

### Step 3 — Load-use dependence cannot be resolved by forwarding alone
A load produces its result at the end of MEM, one cycle later than an ALU operation. The dependent instruction therefore needs the value before it has left MEM.  
Hence a stall must be inserted between the load and its consumer.  
The stall condition is  
$$
\text{stall} = \text{ID/EX.MemRead} \land ((ID/EX.\text{Rd} = IF/ID.\text{Rs1}) \lor (ID/EX.\text{Rd} = IF/ID.\text{Rs2}))
$$

### Step 4 — Control hazard appears when the branch target is unknown until MEM
A conditional branch decides the new PC only after the comparison in EX and the target calculation. Subsequent instructions fetched in the meantime are on the wrong path if the prediction was incorrect.  
The pipeline therefore either stalls until the branch resolves or predicts the outcome and later flushes on misprediction.

### Step 5 — Branch prediction replaces stalls with speculative execution
A predictor indexed by the branch PC supplies both a direction bit and a target address. The pipeline fetches and executes along the predicted path. On misprediction the pipeline is flushed and fetching restarts at the correct address.  
The cost of a misprediction is the number of instructions fetched between prediction and resolution; modern pipelines therefore deepen the predictor or add a second, faster predictor for the BTB.

### Step 6 — The complete hazard unit integrates detection, forwarding, and prediction
A single control block examines pipeline registers every cycle, asserts forwarding multiplexor selects, asserts stall signals, and supplies the predicted PC to the fetch stage. Correctness is guaranteed because every instruction either receives the correct operands or is squashed before it commits state.

## 5. Worked examples — every step shown

**Example 1 — Simple ALU-ALU forwarding**  
*Given:* `add x1, x2, x3`; `sub x4, x1, x5` in consecutive positions.  
*Find:* forwarding control signals.  
Cycle 3: `add` in EX, `sub` in ID.  
Register comparison: EX/MEM.Rd = 1, ID/EX.Rs1 = 1 → ForwardA = 1.  
Cycle 4: result of `add` is selected at ALU input.  
**ForwardA asserted, no stall.**  
*Reflection:* The dependence distance equals the forwarding latency, so no stall occurs.

**Example 2 — Load-use stall**  
*Given:* `ld x1, 0(x2)`; `add x3, x1, x4`.  
*Find:* stall insertion.  
Cycle 3: load in EX, add in ID.  
MemRead = true and Rd matches Rs1 → stall asserted.  
Bubble inserted; add re-reads registers in the next cycle when load data is in MEM/WB.  
**One stall cycle required.**  
*Reflection:* Forwarding from MEM/WB can supply the value, but the consumer must wait one cycle for the memory data to appear.

**Example 3 — Branch with correct prediction**  
*Given:* `beq x1, x2, L` followed by useful instructions; predictor says “taken”.  
*Find:* pipeline behavior.  
Fetch continues at L; when branch resolves, outcome matches prediction → no flush.  
**Zero penalty on correct prediction.**

**Example 4 — Mispredicted branch flush**  
*Given:* same branch, predictor says “not taken”, actual outcome “taken”.  
*Find:* recovery actions.  
Two instructions fetched after the branch are squashed; PC is reloaded with L; pipeline refills.  
**Flush cost equals pipeline depth from fetch to branch resolution.**

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming forwarding works for load-use | Students forget load data arrives one cycle later than ALU results | Always test the MemRead bit in the hazard equation |
| Ignoring x0 in forwarding equations | Register 0 is hard-wired to zero; forwarding a non-zero value corrupts it | Add explicit “Rd ≠ 0” guard in every forwarding condition |
| Treating all branches as resolved in EX | Some ISAs compute targets in MEM; mis-timing the flush window | Verify the exact stage that produces the new PC for each branch type |
| Forgetting to squash speculative stores | A mispredicted branch may have already written memory | Use a store buffer that does not commit until the branch is resolved |
| Over-predicting “always taken” for forward branches | Static prediction bias mismatches dynamic behavior | Combine static hints with a dynamic predictor table |
| Neglecting WAR/WAW hazards in out-of-order pipelines | In-order pipelines naturally avoid them; OoO requires renaming | Remember that scoreboards or Tomasulo’s algorithm are extensions of the same hazard logic |
| Assuming perfect branch prediction | Real predictors have 2–5 % misprediction rate on integer code | Account for the flush penalty in IPC calculations |

## 7. The textbook-precise statement
In a five-stage pipeline, a data hazard between instruction *i* writing register *r* and instruction *j* reading *r* is resolved without stalls if and only if the result can be forwarded from the EX/MEM or MEM/WB pipeline register to the ALU inputs before *j* enters EX; otherwise a stall must be inserted in the ID stage. Control hazards are mitigated by predicting the branch direction and target; on misprediction the pipeline is flushed and fetching resumes at the correct address (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §C.2–C.3).

## 8. Visual — diagram or schematic
```text
IF      ID      EX      MEM     WB
[Fetch] [Decode][ALU]   [Mem]   [WB]
           ^       ^       ^
           |       |       |
        Rs1/Rs2  ALUin   MemData
           |       |       |
        +--+-------+-------+
        |   Forwarding muxes |
        +--------------------+
Hazard unit monitors: EX/MEM.Rd, MEM/WB.Rd, ID/EX.Rs*, MemRead
Branch predictor supplies predicted PC to IF; flush mux clears pipeline on mispredict
```

## 9. The memory technique
1. **The hook** — Picture a relay race where the baton (result) is handed directly from one runner’s hand to the next (forwarding) instead of being placed in a bucket (register file); when the baton has not yet been handed (load), the next runner must wait one stride (stall).
2. **What to overlearn** — The exact stall equation for load-use; the two forwarding conditions (EX/MEM and MEM/WB); the fact that branch misprediction cost equals the number of instructions fetched after the branch.
3. **Spaced-repetition schedule** — Review the stall equation at 1 day, 3 days, 7 days, 16 days, 35 days; redraw the forwarding diagram at each interval.
4. **First-principles fallback** — Start from the pipeline timing diagram, locate the cycle in which each operand is needed versus produced, and insert either a forwarding path or a stall bubble.

## 10. What this unlocks
Mastery of hazard mitigation is the prerequisite for understanding out-of-order execution, register renaming, and speculative execution in superscalar processors. It directly enables the next topics of scoreboarding, Tomasulo’s algorithm, reorder buffers, and precise exception handling.

- Scoreboard and Tomasulo dynamic scheduling
- Reorder buffer and precise interrupts
- Advanced branch predictors (gshare, TAGE)
- Memory disambiguation and store-to-load forwarding

## 11. Self-check — five questions, no answers
1. In a five-stage pipeline, how many stall cycles are required for the sequence `ld x1,0(x2)`; `add x3,x1,x4`; `sub x5,x3,x6`?
2. Write the Boolean condition that asserts ForwardB from the MEM/WB stage.
3. A branch predictor achieves 95 % accuracy on a pipeline whose misprediction penalty is 15 cycles. What is the average branch penalty?
4. Why does forwarding from MEM/WB to the ALU inputs require an additional multiplexor select line compared with EX/MEM forwarding?
5. In an out-of-order core, which hazard types are eliminated by register renaming and which still require explicit stall logic?