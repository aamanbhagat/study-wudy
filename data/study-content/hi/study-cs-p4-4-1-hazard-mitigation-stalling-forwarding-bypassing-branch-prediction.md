## 1. The one-sentence answer
**Hazard mitigation in pipelined processors uses stalling, forwarding (bypassing), and branch prediction to keep the pipeline flowing despite data, structural, and control dependencies.**

Pipelining breaks instruction execution into stages such as IF, ID, EX, MEM and WB so multiple instructions can overlap. When one instruction needs a result that a prior instruction has not yet written back, a data hazard appears. A branch instruction whose outcome is unknown until late in the pipeline creates a control hazard. Structural hazards arise when two instructions need the same hardware resource at the same time.

Stalling inserts bubbles (no-ops) to wait for the required value. Forwarding routes the ALU result or memory value directly from an earlier pipeline register to a later stage before the value reaches the register file. Branch prediction guesses the outcome of a conditional branch so the front end can continue fetching; a wrong guess flushes the wrong-path instructions.

> [!NOTE]
> The deepest insight is that forwarding plus accurate branch prediction together remove most stalls without changing the sequential semantics the programmer sees.

## 2. Why this matters — concrete and current
Intel’s Sunny Cove and later cores rely on aggressive forwarding networks across six ALU ports and a TAGE-style branch predictor that achieves >95 % accuracy on server workloads; without these mechanisms the effective IPC would drop below 1.5 on typical integer code.

ARM’s Neoverse V2 cores inside AWS Graviton 4 instances use register-renaming together with forwarding from the writeback bus to hide the four-cycle load-use latency; this choice directly improves throughput for cloud micro-services that spend 30 % of cycles on pointer chasing.

NVIDIA’s Hopper SMs implement a simplified forwarding network inside each warp scheduler so that dependent FP32 FMA instructions can issue back-to-back; the same logic also predicts divergent branches at the warp level, keeping 32-wide execution units utilized.

The RISC-V BOOM out-of-order core, taped out at UC Berkeley, uses a gshare predictor plus a replay queue that selectively replays only the dependent instructions after a misprediction; silicon measurements show a 12 % IPC gain over the stall-on-branch baseline.

SpaceX’s Merlin flight computers run a dual-issue in-order pipeline whose branch predictor was tuned on actual Falcon 9 telemetry; a single mispredicted branch in the thrust-vector loop costs 18 cycles, so the predictor tables were sized to keep misprediction rates under 3 %.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Classic 5-stage pipeline       | All hazard timing is defined relative to IF–ID–EX–MEM–WB  |
| Pipeline registers             | Forwarding paths read from EX/MEM and MEM/WB registers    |
| Instruction latency            | Load-use distance and branch resolution latency set stall counts |
| Register file semantics        | You must preserve the illusion of sequential writeback    |

If you have not yet drawn the timing diagram of a 5-stage pipeline with and without hazards, pause and do that first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the three classes of hazard
A data hazard occurs when instruction i writes a register that instruction i+k reads before the write completes. A structural hazard occurs when two instructions need the same resource (for example, memory port) in the same cycle. A control hazard occurs when the next fetch address depends on a branch still inside the pipeline.

Example: `add x1, x2, x3` followed immediately by `sub x4, x1, x5` produces a read-after-write (RAW) data hazard on x1.

Formal statement: Let \(W_i\) be the cycle when instruction i writes its destination register. A RAW hazard exists between i and j if \(j\) reads the register and the read occurs in cycle \(c < W_i\).

> [!WARNING]
> If you label a load-use pair as a structural hazard you will choose the wrong mitigation and your pipeline will deadlock.

### Step 2 — Insert stalls to enforce dependence
When a hazard is detected, the pipeline control inserts a stall by disabling the PC and the IF/ID register for one or more cycles while the dependent instruction waits in the ID stage.

Example: the sub above stalls for one cycle so that the add’s result is written in WB before the sub enters EX.

Formal: stall signal = \(hazard_{RAW} \lor hazard_{control}\). The stall length equals the number of cycles until the producing instruction reaches the forwarding source.

> [!WARNING]
> Over-stalling on every hazard destroys the benefit of pipelining; always check whether forwarding can eliminate the stall first.

### Step 3 — Add forwarding paths (bypassing)
Instead of waiting for WB, route the ALU output or loaded value from the EX/MEM or MEM/WB pipeline register directly to the ALU input multiplexers.

Example: the add result is available at the end of its EX stage; the forwarding mux selects this value for the sub’s EX stage in the next cycle, eliminating the stall.

Formal: forward condition from EX/MEM to EX is  
\[
\text{ForwardA} = (EX/MEM.Rd = ID/EX.Rs1) \land (EX/MEM.Rd \neq 0)
\]

> [!WARNING]
> Forwarding from a load instruction still requires one stall because data memory output appears only at the end of MEM; this is the classic load-use hazard.

### Step 4 — Detect control hazards at ID stage
A branch resolves in the EX or MEM stage, yet the fetch of the next instruction has already occurred. The pipeline must either stall until the branch outcome is known or predict the outcome.

Example: `beq x1, x2, Label` followed by three instructions on the fall-through path; if the branch is taken, those three instructions must be flushed.

Formal: misprediction penalty = number of instructions fetched after the branch until its outcome is known.

### Step 5 — Introduce static and dynamic branch prediction
Static prediction always guesses “not taken” or uses a direction hint encoded in the instruction. Dynamic prediction stores per-branch history in a table indexed by PC; a 2-bit saturating counter predicts the more frequent direction.

Example: a 2-bit predictor in state “strongly taken” predicts taken; after two consecutive not-taken outcomes it moves to “weakly not-taken”.

Formal: prediction accuracy \(A = \frac{\text{correct predictions}}{\text{total branches}}\). Misprediction rate = \(1-A\).

### Step 6 — Combine all three techniques
Modern pipelines first attempt forwarding; if forwarding cannot satisfy the dependence they stall; branches are predicted so that control hazards rarely cause stalls. The net CPI is therefore close to the ideal pipeline depth divided by issue width.

Textbook-grade statement appears in section 7.

## 5. Worked examples — har step show karo

**Example 1 — Simple forwarding**
*Given:*  
```
add x1, x2, x3
sub x4, x1, x5
```
*Find:* number of stalls after forwarding is added.

Cycle 3: add finishes EX, result sits in EX/MEM.  
Cycle 4: sub enters EX; forwarding mux selects EX/MEM value for Rs1.  
No stall occurs.  
**Final answer: 0 stalls**

*Reflection:* Forwarding removes the RAW stall when the producing instruction is an ALU operation.

**Example 2 — Load-use hazard**
*Given:*  
```
lw x1, 0(x2)
sub x4, x1, x5
```
*Find:* stalls required even with forwarding.

lw produces data only at end of MEM (cycle 4). sub needs it at beginning of EX (cycle 4). One stall bubble is inserted.  
**Final answer: 1 stall**

*Reflection:* Memory latency forces a stall that forwarding alone cannot eliminate.

**Example 3 — Branch misprediction flush**
*Given:* a 2-bit predictor predicts “taken” but branch resolves “not taken”. Three instructions fetched after branch.

All three wrong-path instructions plus the branch itself are flushed.  
**Final answer: 4-cycle penalty**

*Reflection:* Penalty equals the number of pipeline stages between fetch and branch resolution.

**Example 4 — Combined forwarding and prediction**
*Given:* a load followed by a dependent branch that the predictor guesses correctly.

Load still forces one stall; the correctly predicted branch adds zero extra stalls.  
**Final answer: 1 stall total**

*Reflection:* Prediction hides control hazards; forwarding hides most data hazards; only load-use and mispredictions remain visible.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting load-use stall         | Student assumes forwarding always removes stalls    | Check whether producing instruction is a load        |
| Forwarding from x0                | Hardware still forwards when Rd = 0                 | Add explicit “Rd ≠ 0” check in forwarding logic      |
| Using stale branch history        | Predictor table not updated on misprediction        | Update predictor in commit stage, not fetch          |
| Ignoring WAW hazards in deeper pipelines | Later write reaches WB before earlier one     | Rely on register renaming in out-of-order cores      |
| Predicting every branch taken     | Simple static heuristic fails on backward branches  | Use at least a 2-bit dynamic predictor               |
| Drawing forwarding arrows to ID   | ALU inputs are read in EX, not ID                   | Always draw arrows to the EX-stage muxes             |
| Counting flush penalty from IF    | Penalty starts after fetch of the branch itself     | Count only instructions fetched after the branch     |

## 7. The textbook-precise statement
In a 5-stage pipeline the data-hazard forwarding conditions are exactly those given in Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §C.3:

\[
\begin{align*}
\text{ForwardA} &= (EX/MEM.RegWrite \land (EX/MEM.Rd \neq 0) \land (EX/MEM.Rd = ID/EX.Rs1)) \\
&\lor (MEM/WB.RegWrite \land (MEM/WB.Rd \neq 0) \land (MEM/WB.Rd = ID/EX.Rs1))
\end{align*}
\]

Control-hazard handling via dynamic prediction with a 2-bit saturating counter per branch is described in §C.4; the misprediction penalty equals the number of instructions fetched after the branch until the branch condition is resolved.

## 8. Visual — diagram or schematic
```
Pipeline stages:   IF   ID   EX   MEM   WB
                   |    |    |     |     |
add x1,x2,x3  --> [IF]->[ID]->[EX]-->[MEM]->[WB]
sub x4,x1,x5       stall?  |     ^forward from EX/MEM
                   |       |     |
beq  x1,x2,Lbl     predict taken |
                   |             |
next instrs        flush on mispred
```
Arrows show forwarding path from EX/MEM.ALUOut directly into the EX-stage ALU mux. The branch predictor sits in the IF stage and supplies the predicted PC.

## 9. The memory technique

1. **The hook** — Picture a relay race where the baton (register value) is handed over mid-stride (forwarding) instead of waiting at the finish line (WB); the coach (branch predictor) shouts the next runner’s lane before the current runner even crosses the line.
2. **What to overlearn** — ForwardA and ForwardB equations above; load-use always needs one stall; 2-bit predictor state machine.
3. **Spaced-repetition schedule** — Review the forwarding equations after 1 day, 3 days, 7 days, 16 days and 35 days; redraw the pipeline timing diagram each time.
4. **First-principles fallback** — Start from the pipeline registers that hold the result, ask “when is the value first available?”, then ask “when does the consumer need it?”, and insert a stall or a forwarding mux accordingly.

## 10. What this unlocks
Once you master hazard mitigation you can reason about deeper pipelines, superscalar issue, out-of-order execution, and speculative execution. The same ideas appear in:

- Scoreboarding and Tomasulo’s algorithm
- Register renaming to eliminate WAW/WAR hazards
- Speculative scheduling and replay in modern cores
- GPU warp scheduling and divergence handling
- High-level synthesis tools that insert stalls automatically

## 11. Self-check — five questions, no answers
1. In a 5-stage pipeline, how many stall cycles does a load followed immediately by a dependent ALU instruction require after forwarding is added?
2. Draw the forwarding path required when an ALU result is needed by the very next instruction’s second source operand.
3. A 2-bit predictor is in state “weakly taken”. The branch is taken once, then not taken twice. What is the final state and the prediction for the fourth encounter?
4. Why does forwarding from the MEM/WB register still require a check that Rd ≠ 0?
5. A processor fetches five instructions after a branch that resolves in MEM. If the predictor is wrong, what is the misprediction penalty in cycles?