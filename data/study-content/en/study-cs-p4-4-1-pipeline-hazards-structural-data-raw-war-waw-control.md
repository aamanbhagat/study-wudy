## 1. The one-sentence answer
**Pipeline hazards are situations in which the next instruction cannot execute in its scheduled clock cycle because of a resource conflict, data dependence, or control-flow uncertainty.**

In a pipelined processor, multiple instructions occupy different stages simultaneously. When one instruction needs a result or resource still held by an earlier instruction, the pipeline must stall or reroute work. The three classic categories capture every such collision: structural (two instructions want the same hardware at once), data (one instruction reads or writes a register or memory location before another has finished), and control (a branch changes which instructions should have been fetched).

The key insight is that hazards are not bugs in the program; they are consequences of overlapping independent operations in hardware. Modern pipelines therefore insert stalls, forwarding paths, or prediction mechanisms to keep the overlap profitable.

> [!NOTE]
> The single most important realization is that every hazard ultimately forces either a stall or extra hardware; there is no free lunch once instructions are overlapped.

## 2. Why this matters — concrete and current
ARM’s Cortex-A78 cores in Apple’s M-series chips use aggressive forwarding and branch prediction precisely because data and control hazards dominate the cycle budget in out-of-order superscalar designs; a single missed RAW stall costs 4–8 cycles on the critical path of matrix-multiplication kernels inside CoreML.

In NVIDIA’s Ampere GPU SMs, structural hazards on the shared memory banks are resolved by a two-level warp scheduler; the same scheduler also hides control hazards from divergent branches, directly affecting the 2× throughput gain reported for cuBLAS 11.0 on A100 versus V100.

Intel’s Sunny Cove microarchitecture introduced a second load port and an enlarged scheduler window to reduce WAR and WAW stalls that previously limited SPECint 2017 scores; the change is documented in the 2019 ISSCC paper and is visible in the 18 % IPC uplift over Skylake.

Spacecraft flight computers such as the RAD750 used on Perseverance still rely on simple five-stage pipelines; a single undetected control hazard on a branch guarding a thruster command can produce a 20 ms timing slip, which is why the software team inserts explicit NOPs after every taken branch.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Five-stage MIPS pipeline | Supplies the concrete stages (IF, ID, EX, MEM, WB) in which hazards appear. |
| Register file semantics  | Defines when a write becomes visible to a later read. |
| Basic branch instruction | Introduces the control-flow uncertainty that creates control hazards. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two instructions cannot occupy the same resource
A pipeline stage is a hardware resource that can normally serve only one instruction per cycle. When two instructions both require the memory port in the same cycle, a structural hazard occurs.

Example: instruction `lw $8, 0($9)` needs the memory in MEM while `sw $10, 4($11)` also needs memory in MEM.

Formal statement: if instructions \(i\) and \(j\) (with \(i\) before \(j\)) both request functional unit \(U\) at cycle \(c\), then a structural hazard exists.

> [!WARNING]
> Treating the register file as two separate ports (read and write) hides the fact that a single-ported memory still produces a structural hazard on load/store pairs.

### Step 2 — RAW is the only data hazard that can produce a wrong answer without forwarding
A later instruction reads a value before an earlier instruction has written it. The read sees stale data.

Example: `add $8, $9, $10` followed by `sub $11, $8, $12`.

Formal statement: a read-after-write (RAW) dependence exists from instruction \(i\) to \(j\) when \(j\) reads a register written by \(i\) and the read occurs before the write reaches the register file.

> [!WARNING]
> Students often label every dependence RAW; only the direction “read before write completes” creates the correctness problem.

### Step 3 — WAR and WAW are name dependences that matter only with out-of-order execution
WAR occurs when a write follows a read of the same location; WAW occurs when two writes target the same location. In an in-order pipeline both are automatically satisfied by the program order of writes.

Formal statement: a write-after-read (WAR) or write-after-write (WAW) dependence is an anti- or output dependence that can be removed by register renaming.

### Step 4 — Control hazards arise because the fetch stage does not yet know the branch outcome
The pipeline fetches the next instruction before the branch condition is evaluated, so the wrong path may be fetched.

Example: `beq $8, $9, Label` followed by the instruction at PC+4; if the branch is taken, those fetched instructions must be discarded.

Formal statement: a control hazard exists whenever the target address or direction of a branch is not known until after the branch has been fetched.

### Step 5 — Stalls, forwarding, and prediction are the three canonical remedies
Stalls insert bubbles; forwarding bypasses the register file; prediction guesses the branch direction and repairs mistakes later.

Formal statement: any hazard is resolved by either (a) delaying the dependent instruction until the dependence is satisfied or (b) providing an alternative path that supplies the correct value or instruction.

### Step 6 — The textbook classification
Hazards are partitioned into structural, data (RAW/WAR/WAW), and control; each category maps to a distinct hardware mechanism.

## 5. Worked examples — every step shown

**Example 1 — Structural hazard on memory**
- *Given:* `lw $8, 0($9)` in MEM stage and `sw $10, 4($11)` also entering MEM in the same cycle.
- *Find:* cycle in which stall must be inserted.
- Cycle 4: `lw` occupies MEM.
- Cycle 4: `sw` also requests MEM → conflict detected.
- Hardware inserts one stall bubble before `sw`.
- **Final answer: stall inserted before `sw`; execution resumes in cycle 5.**
- *Reflection:* The conflict is purely resource-based; no data value is involved.

**Example 2 — RAW hazard with forwarding**
- *Given:* `add $8, $9, $10` produces result at end of EX; `sub $11, $8, $12` needs $8 at start of EX.
- *Find:* minimum stall cycles with forwarding.
- Without forwarding: `sub` must wait until after WB of `add` → 2 stalls.
- Forwarding path from EX/MEM pipeline register to ALU input removes both stalls.
- **Final answer: 0 stalls required.**
- *Reflection:* Forwarding works only when the producing instruction has already computed the value.

**Example 3 — WAR hazard exposed by out-of-order write**
- *Given:* `lw $8, 0($9)` followed by `add $9, $10, $11` (writes $9) in an out-of-order core.
- *Find:* dependence type.
- The `add` must not overwrite $9 before the `lw` has read the old value.
- Register renaming allocates a new physical register for the `add` write.
- **Final answer: WAR dependence eliminated by renaming.**
- *Reflection:* In-order pipelines never need to handle WAR explicitly.

**Example 4 — Control hazard with 2-cycle penalty**
- *Given:* 5-stage pipeline, branch condition known at end of EX, no prediction.
- *Find:* number of flushed instructions on a taken branch.
- Instruction after branch fetched in IF while branch is in ID.
- Two more instructions fetched while branch is in EX.
- Both must be discarded.
- **Final answer: 2 instructions flushed; penalty = 2 cycles.**
- *Reflection:* The penalty equals the number of instructions fetched before the branch outcome is known.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Labeling every register dependence RAW | Students forget that only the read-before-write direction creates a true data hazard | Draw the arrow from producer to consumer and check the direction of data flow |
| Assuming forwarding removes all data hazards | Forwarding cannot help when the dependent instruction needs the value before it is computed | Check the pipeline stage that produces the value versus the stage that consumes it |
| Treating structural hazards as data hazards | Both cause stalls, so the distinction feels academic | Ask “is the conflict on a register value or on a hardware unit?” |
| Forgetting that WAW exists only with out-of-order completion | In-order pipelines write registers in program order | Verify whether the pipeline can reorder writes before classifying the hazard |
| Believing branch prediction eliminates control hazards | Prediction still incurs a recovery cost on mispredictions | Count the flush penalty on both correct and incorrect predictions |
| Ignoring memory as a source of structural hazards | Register-file examples dominate textbooks | Draw a load and a store that both reach MEM in the same cycle |
| Confusing stall insertion with pipeline flush | Stalls preserve fetched instructions; flushes discard them | Ask whether the pipeline state must be preserved or discarded |

## 7. The textbook-precise statement
In a pipelined processor, a hazard occurs when the pipeline cannot advance an instruction to the next stage in the cycle dictated by static scheduling. Hazards are classified as structural (resource collision), data (RAW, WAR, or WAW dependence violation), or control (uncertain branch direction or target). Patterson and Hennessy, *Computer Organization and Design*, 5e, §4.8 states: “The pipeline must be stalled or the hazard must be otherwise resolved whenever two instructions in the pipeline require the same hardware resource, when an instruction depends on a result still in the pipeline, or when a branch changes the instruction stream.”

## 8. Visual — diagram or schematic
```text
Cycle:  1   2   3   4   5   6
add $8,$9,$10   IF  ID  EX  MEM WB
sub $11,$8,$12      IF  ID  EX  MEM WB
                 ^--RAW-->  stall or forward here
```
The diagram shows the classic RAW hazard between the first instruction’s WB and the second instruction’s EX; a forwarding path from EX/MEM to the ALU input removes the stall.

## 9. The memory technique
1. **The hook** — Picture a three-lane highway where a slow truck (RAW) blocks the fast lane; you either wait (stall) or build an overpass (forwarding).
2. **What to overlearn** — RAW is the only data hazard that can produce incorrect results; WAR/WAW are name dependences solved by renaming; control hazards cost the depth of the branch-resolution stage.
3. **Spaced-repetition schedule** — Review the three hazard categories at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive every hazard by walking two instructions through the five stages and checking for simultaneous resource requests or unmet data dependences.

## 10. What this unlocks
Mastery of pipeline hazards is the prerequisite for understanding out-of-order execution, scoreboarding, Tomasulo’s algorithm, and precise exception handling. It directly enables the study of superscalar issue logic, memory disambiguation, and branch-predictor design.

- Scoreboarding and Tomasulo’s algorithm
- Register renaming and the reorder buffer
- Speculative execution and recovery
- Cache-coherence interactions with memory hazards

## 11. Self-check — five questions, no answers
1. In a five-stage pipeline without forwarding, how many stall cycles does a RAW dependence between an ALU result and the next instruction’s ALU operand require?
2. Which hazard type is completely eliminated by a compiler that inserts independent instructions between a load and its use?
3. A processor with a two-cycle branch resolution and perfect prediction still incurs a two-cycle penalty on which events?
4. Draw the pipeline diagram for `lw` followed immediately by `sw` to the same address and mark every cycle that contains a structural hazard.
5. In an out-of-order core, a WAW dependence on register $5 between two arithmetic instructions is detected; what single microarchitectural structure removes the need to stall the second writer?