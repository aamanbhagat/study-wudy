## 1. The one-sentence answer
**Branch prediction is the hardware mechanism that guesses the outcome and target of conditional control-flow instructions so the pipeline can continue fetching without stalls.**

A processor pipeline must decide which instruction to fetch next before it knows whether a branch will be taken. When the guess is correct, execution proceeds at full speed; when wrong, the pipeline is flushed and work is discarded. Static predictors make a fixed guess using only the instruction itself, while dynamic predictors maintain small tables of recent branch history to improve accuracy over time.

The 2-bit predictor is the simplest dynamic scheme that resists single mispredictions, and the Branch Target Buffer (BTB) supplies the predicted destination address in the same cycle the branch is fetched.

> [!NOTE]
> The decisive insight is that even a simple history-based guess is correct 85–95 % of the time in real programs, turning an otherwise frequent pipeline flush into a rare event.

## 2. Why this matters — concrete and current
Modern out-of-order cores in Apple M-series and Intel Core processors rely on multi-level branch predictors whose accuracy directly determines instructions per cycle; a 1 % drop in accuracy can cost several percent in SPEC CPU scores.

In safety-critical flight-control software running on ARM Cortex-R processors, static “always-not-taken” prediction is mandated by DO-254 so that worst-case execution time remains deterministic.

Google’s TPU v4 clusters use aggressive dynamic predictors inside each TensorCore to keep matrix-multiply pipelines fed when control flow inside sparse neural-network kernels is data-dependent.

The Spectre family of attacks demonstrated that speculative execution driven by branch prediction leaves observable micro-architectural state; every subsequent CPU design from AMD Zen 2 onward added predictor isolation modes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 5-stage pipeline         | Explains why a branch creates a multi-cycle bubble        |
| Program counter (PC)     | The address used both to index predictors and fetch targets |
| Finite-state machine     | The 2-bit counter is literally a 4-state FSM              |
| Locality of reference    | Justifies why a small table of recent branches works      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Branches create uncertainty in the fetch stage
A conditional branch cannot be resolved until the ALU computes the condition, yet the next PC must be known immediately. Without prediction the pipeline stalls for the resolution latency.

Concrete example: the instruction `beq x1, x2, Label` reaches the fetch stage; the hardware does not yet know whether the next fetch should be `PC+4` or `Label`.

Formal statement:  
$$
\text{NextPC} = \text{PC}+4 \quad \text{or} \quad \text{target},
$$
chosen by a predicate that is not yet evaluated.

> [!WARNING]
> Treating the branch as “always stall” underestimates the cost; real pipelines already overlap resolution with later stages, so any misprediction still incurs a full flush.

### Step 2 — Static prediction removes the stall with a compile-time or opcode rule
The simplest rule is “predict not taken”: fetch the sequential successor and annul later if the branch is actually taken.

Formal rule:  
$$
\text{Prediction} = \text{not taken}.
$$

> [!WARNING]
> Using a single static rule for every branch ignores the fact that loop-closing branches are taken far more often than 50 %.

### Step 3 — Adding one bit of history yields a dynamic predictor
A single-bit saturating counter per branch flips its prediction after every misprediction. The counter resides in a table indexed by the branch’s PC.

State transition: taken increments toward 1, not-taken decrements toward 0.

### Step 4 — Two bits provide hysteresis
A 2-bit saturating counter stays in the strong states (strongly taken / strongly not taken) after a single misprediction, changing prediction only after two consecutive errors in the opposite direction.

State diagram (four states):  
00 (strongly NT) → 01 (weakly NT) → 11 (weakly T) → 10 (strongly T) and back.

Formal update:  
$$
\text{state} \leftarrow \text{clip}(\text{state} + 2\cdot\text{outcome}-1, 0, 3).
$$

> [!WARNING]
> Forgetting to clip produces an illegal fifth state and breaks the predictor on hardware.

### Step 5 — The Branch Target Buffer supplies the destination address
Because the target address is not encoded in the branch instruction until decode, a small cache (BTB) stores the last-seen target for each branch PC. On a hit the fetch stage can immediately jump to the predicted target.

### Step 6 — Combining direction predictor and BTB
At fetch time the PC indexes both the 2-bit table (direction) and the BTB (target). The predicted next PC is therefore  
$$
\text{NextPC} = \begin{cases}
\text{BTB[PC].target} & \text{if direction predicts taken}\\
\text{PC}+4 & \text{otherwise.}
\end{cases}
$$

This is the textbook formulation used in Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §C.2.

## 5. Worked examples — every step shown

**Example 1 — Single misprediction on a 2-bit counter**  
*Given:* Counter currently at “strongly taken” (10).  
*Find:* State after one not-taken outcome.  

- Read current state 10. *Why:* hardware must examine the saturating counter.  
- Outcome = 0 (not taken). *Why:* the branch resolved the opposite way.  
- New state = max(10 − 1, 00) = 01. *Why:* the counter moves one step toward not-taken but does not yet change prediction.  

**01 (weakly taken)**

*Reflection:* The hysteresis property kept the prediction “taken” despite one error; a 1-bit predictor would have flipped immediately.

**Example 2 — Loop branch that is taken 100 times then exits**  
*Given:* 2-bit counter starts at 00.  
*Find:* Final state after 100 taken outcomes followed by one not-taken.  

- After first taken: 01.  
- After second taken: 11.  
- After third taken: 10.  
- All subsequent taken keep it at 10.  
- Final not-taken moves it to 01.  

**01**

*Reflection:* The strong state protected the predictor from the single exit misprediction.

**Example 3 — BTB lookup**  
*Given:* Branch PC = 0x4000, BTB contains entry (0x4000 → 0x4120, valid). Direction predictor says taken.  
*Find:* Next PC.  

- BTB hit returns target 0x4120. *Why:* target address is supplied without waiting for decode.  
- Direction = taken, therefore NextPC = 0x4120.  

**0x4120**

*Reflection:* The BTB decouples target computation from the direction decision.

**Example 4 — Combined misprediction recovery**  
*Given:* 2-bit counter = 10, BTB target = 0x5000. Actual branch resolves not-taken to 0x4004.  
*Find:* Actions taken by the pipeline.  

- Direction mispredicted. *Why:* 2-bit counter moves to 01.  
- BTB target discarded. *Why:* wrong-path instructions are flushed.  
- Correct PC = 0x4004 is written back to the fetch stage.  

**Pipeline flush; counter now 01**

*Reflection:* Both direction and target must be repaired; the BTB is usually not updated on a misprediction so that a future correct target is not overwritten.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Assuming every branch benefits from dynamic prediction | Loops and if-statements have different biases | Profile-guided static hints for unpredictable branches |
| Indexing the predictor only with the branch PC | Aliasing between unrelated branches           | Use gshare or TAGE indexing with global history |
| Updating the 2-bit counter on every fetch | Speculative updates pollute history           | Use a speculative copy and commit only on resolution |
| Forgetting BTB misses              | Target not known until execute                | Provide a small “return address stack” for calls |
| Treating “strongly” states as permanent | Program phase changes                         | Add a reset or tournament selector           |
| Ignoring BTB replacement policy    | Conflict misses evict hot branches            | Use LRU or pseudo-LRU on the BTB             |
| Predicting through indirect jumps with a simple BTB | Multiple targets per site                     | Add a cascaded indirect predictor            |

## 7. The textbook-precise statement
A **branch direction predictor** maps each branch instruction address to a 2-bit saturating counter whose most-significant bit supplies the prediction. A **Branch Target Buffer** is a set-associative cache that maps branch instruction addresses to previously observed target addresses. On a fetch of address \(A\), the predicted next address is  
$$
\text{NextPC}(A) = 
\begin{cases}
\text{BTB}[A].\text{target} & \text{if } P(A)=\text{taken}\\
A+4 & \text{otherwise}
\end{cases}
$$  
where \(P(A)\) is the MSB of the 2-bit counter indexed by \(A\). Both structures are updated after the branch resolves; the BTB is updated only on taken branches. (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, Appendix C.2.)

## 8. Visual — diagram or schematic
```text
          PC
           │
           ▼
   ┌───────────────┐
   │ 2-bit Table   │  (direction)
   │ 00 01 10 11   │
   └───────┬───────┘
           │ MSB
           ▼
   ┌───────────────┐
   │     BTB       │  (target)
   │ PC → target   │
   └───────┬───────┘
           │
           ▼
   Predicted NextPC = (taken ? BTB.target : PC+4)
```
The diagram shows the two parallel lookups performed in the fetch stage; the direction bit selects whether the BTB target or the sequential PC is used.

## 9. The memory technique

1. **The hook** — Picture a traffic light at an intersection that stays green after two cars have gone through; it needs two red cars in a row before it flips. That is exactly the 2-bit counter.

2. **What to overlearn** — The four states and their transitions; the fact that the BTB supplies the target while the 2-bit table supplies only direction.

3. **Spaced-repetition schedule** — Review the state machine at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive the next-PC equation from the pipeline diagram: the fetch stage has only the current PC and must produce the next PC in one cycle; therefore any information required must come from a table indexed by that PC.

## 10. What this unlocks
Accurate branch prediction is the foundation for deeper speculation techniques such as Tomasulo’s algorithm, superscalar fetch, and value prediction. It also directly precedes the study of side-channel attacks that exploit predictor state.

- Tournament and TAGE predictors  
- Return-address stacks  
- Speculative scheduling and replay  
- Control-flow integrity hardware (CET, BTI)

## 11. Self-check — five questions, no answers
1. A 2-bit counter sits at “strongly not taken.” After one taken outcome, what is its new state and does the prediction change?

2. Why does a BTB miss not necessarily cause a pipeline stall even when the branch is predicted taken?

3. Draw the state diagram of a 2-bit predictor and label the arcs with the outcome that causes each transition.

4. Two branches at addresses 0x1000 and 0x2000 map to the same 2-bit counter entry. Describe a sequence that produces repeated mispredictions due to aliasing.

5. In a processor with a 2-bit predictor and a BTB, a branch is fetched, predicted taken, yet the BTB contains no entry for it. What is the next PC and what happens on resolution if the branch is actually taken?