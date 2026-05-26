## 1. The one-sentence answer
**Branch prediction** decides which instruction to fetch after a conditional branch before the condition is resolved, so the pipeline does not stall.

Static prediction uses a fixed rule decided at compile time or by simple hardware heuristics. Dynamic prediction adapts at runtime using history stored in small tables. The 2-bit predictor keeps a saturating counter per branch to remember recent behaviour, while the Branch Target Buffer (BTB) caches both the prediction and the target address so the fetch stage can immediately jump.

The core idea is that modern pipelines are deep; even a 5-cycle misprediction penalty destroys IPC, therefore accurate early guesses are worth dedicated silicon.

> [!NOTE]
> The single biggest performance lever in out-of-order cores is not wider issue but fewer mispredictions; every extra percent of accuracy directly multiplies effective pipeline width.

## 2. Why this matters — concrete and current
Intel’s Sunny Cove and later cores use a TAGE-SC-L predictor (a sophisticated descendant of 2-bit tables plus BTB) that delivers >95 % accuracy on SPEC; each misprediction still costs 15–20 cycles, so the predictor is one of the largest and most power-hungry structures in the front-end.

Apple’s M1/M2 Firestorm cores combine a large BTB with a neural-inspired predictor; the design choice lets them sustain 8-wide fetch even on irregular control flow found in JavaScript JITs and database engines.

Spacecraft flight software on NASA’s Perseverance rover runs on a RAD750 processor whose static branch predictor was deliberately chosen because radiation-hardened dynamic tables were too expensive; mission logs show the compiler had to insert explicit hints to keep real-time loops under deadline.

Google’s TPU v4 clusters rely on dynamic branch prediction inside the scalar control cores that orchestrate the systolic arrays; a single mispredicted loop exit can idle thousands of MXU lanes for dozens of cycles, directly affecting training step time.

ARM’s Cortex-X2 implements a 2-bit predictor augmented with a 64 K-entry BTB; the same microarchitecture powers both flagship phones and automotive ADAS chips, showing how the same predictor IP scales across power envelopes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| 5-stage pipeline         | You must see why a branch stalls fetch, decode, and possibly execute stages.         |
| Control hazard           | Branch prediction is the standard solution to the control hazard created by branches. |
| Saturating counter       | The 2-bit predictor is literally a 2-bit saturating counter; you need to understand its state transitions. |
| Set-associative cache    | BTB is a small cache; tag, index, and replacement logic are identical to caches.     |

If any row is unfamiliar, pause and read the corresponding section on pipelines or caches first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The cost of a branch
A conditional branch cannot know its direction until the condition is computed, yet the fetch unit must request the next instruction every cycle. Without prediction the pipeline inserts bubbles equal to the number of stages before the condition is ready.

Example: in a 5-stage pipeline an unresolved branch at the end of decode forces three stall cycles.

Formal statement: let \(M\) be misprediction penalty in cycles; expected CPI contribution is \(f_b \times (1 - A) \times M\), where \(f_b\) is branch frequency and \(A\) is prediction accuracy.

> [!WARNING]
> If you forget that the penalty is paid only on mispredictions, you will over-estimate the benefit of any predictor.

### Step 2 — Static prediction
Static schemes decide direction once, either by compiler opcode annotation or by a simple hardware rule such as “predict taken for backward branches”.

Example: a loop-closing branch is predicted taken; a forward error-check branch is predicted not taken.

Formal rule (classic): \(\text{predict taken if target} < \text{PC}\).

### Step 3 — Dynamic 1-bit predictor
A single bit per branch remembers the last outcome. After the branch resolves, the bit is updated.

State transition: 0 (not-taken) \(\leftrightarrow\) 1 (taken).

### Step 4 — 2-bit saturating counter
Two bits give four states: strongly not-taken (00), weakly not-taken (01), weakly taken (10), strongly taken (11). The counter increments on taken, decrements on not-taken, saturating at the extremes.

Formal update:
\[
c_{t+1} = \begin{cases}
\min(c_t + 1, 3) & \text{if outcome = taken}\\
\max(c_t - 1, 0) & \text{if outcome = not-taken}
\end{cases}
\]

### Step 5 — Branch Target Buffer
BTB is a cache indexed by PC that stores the predicted target address and the 2-bit counter. On a hit the fetch stage can redirect immediately, hiding the taken-branch penalty.

Formal lookup: \(\text{BTB}[PC \bmod 2^k] \rightarrow (\text{tag}, \text{target}, \text{counter})\).

### Step 6 — Combining prediction with BTB
Prediction (direction) and target address are orthogonal; a BTB hit with a “not-taken” counter still fetches sequential code. Only a taken prediction uses the stored target.

### Step 7 — Textbook-grade statement
A branch predictor \(P\) together with a BTB \(B\) produces a prediction \((\text{dir}, \text{target})\) for every fetch-group PC. The pipeline accepts the prediction and later verifies it at branch resolution. On mismatch the pipeline is flushed and the correct path is fetched; both \(P\) and \(B\) are updated with the resolved outcome.

## 5. Worked examples — har step show karo

**Example 1 — Simple 2-bit state transition**
*Given:* counter = 01 (weakly not-taken), outcome = taken.  
*Find:* next state.  
Step 1: 01 + 1 = 10.  
*Why:* increment moves from weakly not-taken to weakly taken.  
**Final answer: 10**

*Reflection:* the saturating behaviour prevents one outlier from flipping a strong prediction.

**Example 2 — Two consecutive branches**
*Given:* same branch twice, outcomes taken then not-taken, initial state 11.  
*Find:* final state.  
Step 1: 11 → taken → stays 11.  
Step 2: 11 → not-taken → 10.  
*Why:* strong state resists first change, then weakens.  
**Final answer: 10**

*Reflection:* shows hysteresis that gives 2-bit predictors their edge over 1-bit.

**Example 3 — BTB hit with taken prediction**
*Given:* BTB indexed by 0x4000 contains tag match, counter = 11, target = 0x4100.  
*Find:* next fetch address.  
Step 1: counter ≥ 2 → predict taken.  
Step 2: redirect fetch to 0x4100.  
*Why:* BTB supplies both direction and target in one cycle.  
**Final answer: fetch 0x4100**

*Reflection:* without the stored target the processor would still need an extra cycle to compute the target.

**Example 4 — Misprediction recovery**
*Given:* prediction taken to 0x4100, actual outcome not-taken, next sequential = 0x4004.  
*Find:* actions.  
Step 1: squash instructions fetched from 0x4100.  
Step 2: update counter 11 → 10.  
Step 3: fetch 0x4004.  
*Why:* both history and pipeline must be repaired.  
**Final answer: pipeline flushed, counter = 10**

*Reflection:* the cost is paid exactly when the saturating counter finally changes its mind.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating 2-bit counter as simple history | Students think it stores last two outcomes          | Remember it is a saturating value, not a shift register |
| Forgetting BTB tag aliasing       | Different branches map to same entry                | Always check the tag before trusting target          |
| Assuming static prediction is obsolete | Modern compilers still emit hints                   | Measure both static and dynamic accuracy on your binary |
| Ignoring cold-table penalty       | First execution of a branch has no history          | Use compiler profile-guided optimisation or static hints |
| Confusing direction prediction with target prediction | They are stored separately                          | Draw two boxes: one for counter, one for target      |
| Under-estimating misprediction penalty | Pipeline depth varies by core                       | Look up the actual front-end pipeline length         |
| Updating predictor before commit  | Speculative updates can corrupt state               | Update only after branch resolves or use checkpoint  |

## 7. The textbook-precise statement
In *Computer Architecture: A Quantitative Approach*, 6th ed., §C.2, Hennessy & Patterson define a correlating predictor and a Branch Target Buffer as follows:

A \(k\)-bit saturating counter predictor maintains a table \(P\) of \(2^m\) counters. For a branch at address \(PC\), index \(i = PC \bmod 2^m\). The prediction is “taken” iff \(P[i] \ge 2^{k-1}\). After resolution the counter is updated by the saturating rule above. A BTB is a set-associative cache whose each entry holds a valid bit, tag, target address, and the \(k\)-bit counter. On a BTB hit the processor uses the stored target when the counter predicts taken; on a miss or not-taken prediction the sequential path is followed. All updates occur non-speculatively after the branch commits.

## 8. Visual — diagram or schematic
```
          PC
           |
           v
     +-----------+     tag match?
     |   BTB     | --> yes --> (target, 2-bit counter)
     |  (cache)  |     no  --> sequential PC
     +-----------+
           |
           v
     2-bit FSM
  00 01 10 11
  NT WT T  ST
```
Each state transitions right on taken, left on not-taken; saturates at ends. BTB supplies target only when state is 10 or 11.

## 9. The memory technique

**The hook**  
Imagine a traffic light at a familiar intersection that remembers the last two times you approached: if both times the road was clear it stays green (strongly taken); one change only moves it to yellow (weak).

**What to overlearn**  
- 2-bit states: 00/01 = predict NT, 10/11 = predict T.  
- Update is saturating add/subtract by 1.  
- BTB hit + taken prediction gives target in same cycle.

**Spaced-repetition schedule**  
Review the state diagram after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If you forget the encoding, redraw the four states as a line, label the middle threshold between 01 and 10, and remember that taken always moves right.

## 10. What this unlocks
Accurate branch prediction is a prerequisite for deeper pipelines, wider fetch, and speculative scheduling.

- You can now study tournament predictors and TAGE.  
- You can reason about return-address stacks and indirect-branch predictors.  
- You can evaluate the front-end cost of new ISAs that add more conditional branches.  
- You can profile real binaries to decide whether static hints are still profitable.

## 11. Self-check — five questions, no answers
1. A branch shows outcomes T, T, NT, T. Starting from state 01, what is the final state after these four updates?  
2. Why does a BTB need a tag even though it is indexed by PC bits?  
3. In a 10-stage pipeline, a 2 % misprediction rate on 20 % branches costs how many extra cycles per instruction?  
4. Which of the following can a 2-bit predictor never capture: a repeating pattern of length 3, or a pattern of length 2?  
5. If two branches alias in the BTB and one is always taken while the other is never taken, what steady-state accuracy can you expect for each?