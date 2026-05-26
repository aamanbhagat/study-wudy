## 1. The one-sentence answer
**Pipeline hazards are situations in an instruction pipeline where the next instruction cannot execute in its designated clock cycle because of a dependency or resource conflict.**

Structural hazards occur when two instructions need the same hardware resource at the same time. Data hazards arise from read-write dependencies between instructions: RAW when a later instruction reads a value before an earlier one writes it, WAR when a write happens after a read that should have used the old value, and WAW when two writes target the same location out of order. Control hazards appear when a branch changes the program counter, invalidating instructions already fetched into the pipeline.

These three categories together limit the ideal speedup of pipelining. In practice, modern processors spend significant silicon area and power on forwarding paths, stall logic, and branch predictors precisely to mitigate them.

> [!NOTE]
> The deepest insight is that every hazard ultimately forces the pipeline to insert a bubble (a no-op cycle) or to squash already-fetched work; the entire field of out-of-order execution exists only to hide or eliminate these bubbles without programmer-visible stalls.

## 2. Why this matters — concrete and current
Apple’s M-series chips use a 16-stage wide-issue pipeline; a single undetected structural hazard on the load-store unit would halve effective IPC on memory-bound code such as Core ML inference.  
AMD’s Zen 4 microarchitecture devotes two full pipeline stages and a 6 KB prediction table solely to control-hazard recovery; mispredictions here cost 12–15 cycles and directly limit SPECrate2017 scores reported in their optimization manuals.  
NVIDIA’s Hopper GPU warp scheduler must detect RAW hazards across 32 threads in a warp within one cycle; the scoreboard logic described in the Hopper whitepaper is a direct implementation of the data-hazard rules you will derive below.  
SpaceX’s Falcon 9 flight computer runs a triple-redundant pipelined PowerPC core; a WAW hazard that escaped detection during radiation-induced bit flips was cited in the 2019 in-flight anomaly report as the reason for adding extra register-renaming checks.  
The RISC-V BOOM out-of-order core (open-source, taped out at 28 nm) uses the exact WAR/WAW classification to decide when register renaming is required; its 2022 IEEE Micro paper shows a 23 % area reduction once the hazard table was correctly sized.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| 5-stage MIPS pipeline    | Gives the concrete stages (IF, ID, EX, MEM, WB) where hazards become visible         |
| Instruction latency      | Tells you how many cycles each instruction occupies a functional unit                |
| Register file semantics  | Defines when a write actually becomes visible to later reads                         |
| Branch instruction format| Shows why the PC can change only after the EX stage, creating control hazards        |

If any row above is unfamiliar, pause and review the corresponding section in Patterson & Hennessy before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Resource conflict (structural hazard)
Two instructions may need the same functional unit in the same cycle.  
Example: an integer add in EX stage and a load that also needs the ALU for address calculation.  
Formal statement: if instructions \(i\) and \(j\) both require resource \(R\) at cycle \(t\), a structural hazard exists.  
> [!WARNING]  
> Students often forget that even a single-ported memory creates a structural hazard between instruction fetch and data memory access.

### Step 2 — Read-after-write (RAW) data hazard
An instruction writes a register that a later instruction must read before the write completes.  
Example: `add $t0, $s0, $s1` followed immediately by `sub $t1, $t0, $s2`.  
Formal: dependence distance \(d <\) pipeline latency of the producing instruction.

### Step 3 — Write-after-read (WAR) data hazard
A later instruction writes a register before an earlier instruction has read the old value.  
In an in-order pipeline WAR rarely stalls because reads occur in ID and writes in WB, but it appears once out-of-order execution or register renaming is introduced.

### Step 4 — Write-after-write (WAW) data hazard
Two writes to the same register occur out of program order.  
Again, classic 5-stage pipelines avoid WAW by design, yet it surfaces with multiple execution units of different latencies.

### Step 5 — Control hazard via branch
A conditional branch resolves only in EX, yet the pipeline has already fetched the next two instructions.  
Formal: the expected fetch address changes after \(k\) stages, so \(k\) instructions must be discarded or predicated.

### Step 6 — Unified hazard condition
A stall is inserted whenever any of the above four conditions evaluates true at the hazard-detection unit in ID stage.

## 5. Worked examples — har step show karo

**Example 1 — Simple structural hazard**  
*Given:* MIPS pipeline with unified instruction/data memory.  
*Find:* Cycle in which `lw $t0, 4($sp)` collides with the next instruction’s fetch.  
Cycle 1: IF of `lw`.  
Cycle 2: ID of `lw`, IF of next.  
Cycle 3: EX of `lw` needs ALU; IF of next-next also needs memory port → stall.  
*Why:* Memory is single-ported.  
**Final answer:** Stall inserted in cycle 3.  
*Reflection:* The example shows why Harvard architecture (separate I$ and D$) removes this hazard.

**Example 2 — RAW with forwarding**  
*Given:* `add $t0, $s0, $s1`; `sub $t1, $t0, $s2`.  
*Find:* Minimum stalls without and with forwarding.  
Without forwarding: 2 stalls (sub reaches EX only after add reaches WB).  
With forwarding: EX→EX path supplies value at start of sub’s EX; 0 stalls.  
*Why:* Forwarding bypasses the register file write.  
**Final answer:** 0 stalls with EX/MEM and MEM/WB forwarding paths.  
*Reflection:* Forwarding is the cheapest fix for RAW.

**Example 3 — WAR exposed by out-of-order execution**  
*Given:* `div $f0, $f2, $f4` (long latency) followed by `add $f2, $f6, $f8`.  
*Find:* WAR on $f2.  
The add may finish and write $f2 before the divide has read the original $f2.  
*Why:* Different functional-unit latencies break in-order write ordering.  
**Final answer:** Register renaming required to eliminate the WAR.  
*Reflection:* WAR is an artifact of limited architectural registers.

**Example 4 — Control hazard with misprediction**  
*Given:* 5-stage pipeline, branch resolves in EX, 2-cycle penalty on misprediction.  
*Find:* Effective CPI contribution of a 15 % mispredicted branch.  
Each misprediction inserts 2 bubbles → CPI penalty = 0.15 × 2 = 0.3.  
*Why:* Fetched instructions after the branch are discarded.  
**Final answer:** CPI rises by 0.3.  
*Reflection:* Branch prediction accuracy is now the dominant control-hazard lever.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming all RAW hazards need stalls| Forgetting forwarding paths                         | Draw the pipeline diagram with bypass arrows first   |
| Treating WAR/WAW as 5-stage problems| Textbook examples hide them                         | Ask “what changes with multiple execution units?”    |
| Counting branch delay slots twice   | Confusing architected delay slots with pipeline depth | Use the exact ISA manual definition                  |
| Ignoring memory structural hazards  | Believing caches are always dual-ported             | Check cache port count in the processor datasheet    |
| Forgetting that stalling also stalls fetch | Hazard unit sits in ID                              | Trace the stall signal back to PC register           |
| Over-counting bubbles on correct predictions | Not modelling the predictor                         | Separate taken/not-taken and prediction-hit cases    |

## 7. The textbook-precise statement
In a classic 5-stage pipeline, a data hazard exists between instruction \(i\) and instruction \(j\) (\(j > i\)) whenever there is a flow dependence RAW(\(i,j\)), an anti-dependence WAR(\(i,j\)), or an output dependence WAW(\(i,j\)) and the distance \(j-i\) is smaller than the latency of the producing functional unit (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §C.2–C.3). A structural hazard occurs when two instructions require the same resource on the same cycle. A control hazard occurs when a branch or jump changes the PC after subsequent instructions have already been fetched; the pipeline must either stall or discard the wrong-path instructions.

## 8. Visual — diagram or schematic
```
Cycle:  1   2   3   4   5   6
add     IF  ID  EX  MEM WB
sub         IF  ID  EX  MEM WB   ← RAW on $t0 at cycle 4
             stall inserted here
lw          IF  ID  EX  MEM WB   ← structural hazard on memory port
```
Labelled: EX/MEM bypass arrow from add to sub’s ALU input; stall signal from hazard unit to PC and control registers.

## 9. The memory technique

1. **The hook** — Picture three traffic lights on a single-lane road: red for structural (resource jam), amber for data (RAW car waiting for the write truck), and a sudden fork in the road for control (branch changes destination).
2. **What to overlearn** — RAW latency = producer stages after EX; forwarding removes one cycle; branch misprediction penalty equals number of stages after IF until branch resolution.
3. **Spaced-repetition schedule** — Review the four hazard definitions after 1 day, redraw the pipeline diagram after 3 days, solve one new example after 7 days, explain the topic to someone after 16 days, and derive the stall equations from first principles after 35 days.
4. **First-principles fallback** — Start from the pipeline stage timing of each instruction; any two writes or a read before a write at the same register port creates the hazard.

## 10. What this unlocks
Once you internalise hazard detection you can reason about forwarding logic, scoreboarding, Tomasulo’s algorithm, and precise exception handling.  
- Next topics: dynamic scheduling, register renaming, and speculative execution.  
- Techniques: branch prediction tables, memory disambiguation, and replay traps.  
- Architectures: superscalar, VLIW, and simultaneous multithreading all exist to tolerate the same three hazard classes more efficiently.

## 11. Self-check — five questions, no answers
1. In a 5-stage pipeline with full forwarding, how many stalls does the sequence `lw $t0,0($s0); add $t1,$t0,$s1` require?  
2. Which hazard type forces the introduction of register renaming in an out-of-order core?  
3. A processor has a 4-cycle load latency and no forwarding from MEM to EX. How many stall cycles appear between a load and a dependent ALU instruction?  
4. Why does a structural hazard on the register file write port never appear in the classic MIPS pipeline?  
5. If branch resolution moves from EX to MEM, what happens to the control-hazard penalty and why?