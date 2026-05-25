## What it is
Branch prediction is a technique used in modern microprocessors to guess the outcome of a conditional branch instruction (e.g., an `if` statement) before it is actually executed. This allows the processor's instruction pipeline to continue fetching and processing subsequent instructions without waiting, avoiding a costly stall. The goal is to keep the pipeline full and the processor busy.

## Why it matters
High-performance computing relies on keeping processor pipelines full. In physics simulations (e.g., fluid dynamics for rocket nozzles) or training large neural networks, loops and conditional checks are ubiquitous. A mispredicted branch can stall the pipeline for dozens of cycles, flushing partially executed work; accurate branch prediction directly translates to faster simulation and training times, reducing a multi-day computation to hours.

## When to study it
You must have a solid understanding of CPU pipelining, specifically the concepts of instruction stages (Fetch, Decode, Execute, etc.) and pipeline hazards (data, structural, and especially control hazards). You should also be familiar with basic assembly language, particularly control flow instructions like `BEQ` (Branch if Equal) or `JMP` (Jump). Without understanding why a pipeline stalls on a branch, the motivation for predicting them is unclear.

## How to study it (step by step)
1.  **Calculate the Penalty:** Start by calculating the performance cost of a branch. Given a 5-stage pipeline, what is the cycle penalty for a control hazard if we do nothing? Now, what if we stall until the branch is resolved in the Execute stage? This grounds the problem in performance numbers.
2.  **Implement Static Prediction:** Write a simple rule: "always predict not-taken." Trace a short `for` loop with this rule. Count the number of correct and incorrect predictions. Now try "always predict taken." See how the accuracy changes.
3.  **Model a 1-bit Predictor:** Draw the 2-state finite state machine for a 1-bit predictor (a single flip-flop). States are "Predict Taken" and "Predict Not-Taken". Trace the same `for` loop. Note its weakness: it mispredicts twice on every loop (the last iteration and the first iteration of the next pass).
4.  **Model a 2-bit Predictor:** Draw the 4-state finite state machine for a 2-bit saturating counter. Label the states (Strongly Not-Taken, Weakly Not-Taken, Weakly Taken, Strongly Taken). Trace the same `for` loop again. Observe how the "hysteresis" of two bits allows it to correctly predict all but the final iteration.
5.  **Integrate the BTB:** Now consider *where* the branch goes. Draw a block diagram showing the Program Counter (PC) accessing both the instruction cache and a Branch Target Buffer (BTB). The BTB stores the *target address* of previously seen branches. This answers "where to jump," while the 2-bit predictor answers "if we jump."
6.  **Analyze Performance:** Given a branch predictor accuracy (e.g., 95%) and a misprediction penalty (e.g., 12 cycles), calculate the average number of cycles per instruction (CPI). Compare the CPI of a pipelined machine with and without branch prediction.

## Key ideas, with intuition
1.  **The Problem is the Pipeline Bubble:** A pipeline is like an assembly line for instructions. A conditional branch is a fork in the road. If we don't know which path to take, the entire assembly line has to stop and wait. This wait is a "bubble" or "stall" that kills performance. Branch prediction is about making an educated guess to keep the line moving, and only stopping if the guess was wrong.

2.  **Static vs. Dynamic: Rules vs. History:**
    *   **Static prediction** uses fixed rules that are compiled into the program. A simple rule is "predict backward branches as taken, forward branches as not-taken." This works well for loops (backward branch at the end) and error checks (`if (error) ...`, a forward branch that is rarely taken). It's simple but inflexible.
    *   **Dynamic prediction** uses hardware to remember the history of recent branches at runtime. It assumes that past behavior is a good predictor of future behavior. This is far more effective for complex patterns.

3.  **The 2-Bit Predictor Adds Hysteresis:** A 1-bit predictor is too jumpy. Imagine a loop that runs 100 times. It's taken 99 times, then not-taken once. A 1-bit predictor will mispredict the last iteration (it predicted 'Taken'), flipping its state to 'Not-Taken'. On the *next* pass through the loop, it will mispredict the *first* iteration because it's still in the 'Not-Taken' state. That's two mispredictions per loop execution. A 2-bit predictor requires being wrong *twice* to change its mind from "Strongly Taken" to "Weakly Not-Taken". This "stickiness" or "hysteresis" means it only mispredicts the single final iteration of the loop.

    The state machine for a 2-bit predictor is described by a saturating counter. Let's represent the states as:
    *   `00`: Strongly Not-Taken
    *   `01`: Weakly Not-Taken
    *   `10`: Weakly Taken
    *   `11`: Strongly Taken

    The prediction is based on the most significant bit (MSB): if MSB is 1, predict Taken; if 0, predict Not-Taken.
    $$
    \text{New State} =
    \begin{cases}
    \min(\text{Current State} + 1, 3) & \text{if branch was actually Taken} \\
    \max(\text{Current State} - 1, 0) & \text{if branch was actually Not-Taken}
    \end{cases}
    $$
    Where states are the integers 0, 1, 2, 3 corresponding to `00`, `01`, `10`, `11`.

4.  **BTB tells you WHERE, Predictor tells you IF:** These are two separate but related components.
    *   **Branch Predictor:** A table of 2-bit counters, indexed by the branch instruction's address. It answers the question: "Is this branch likely to be taken?"
    *   **Branch Target Buffer (BTB):** A small cache, indexed by the branch instruction's address. It stores the *destination address* of the branch. It answers the question: "If this branch is taken, where do we go?"
    You need both for a taken branch: the predictor says "yes, jump" and the BTB provides the address to jump to. This allows the CPU to start fetching from the target address immediately.

## Worked example
Let's trace a branch instruction at the end of a loop that executes 3 times. We'll use a 2-bit saturating counter for dynamic prediction, initialized to state `01` (Weakly Not-Taken).

**Code:** A branch instruction `BNE R1, R0, LOOP_START` (Branch if Not Equal) at address `0x40`. The loop counter is in `R1`, initialized to 3. It decrements each iteration. The branch is taken as long as `R1 != 0`.

| Iteration | R1 Value (at branch) | Actual Outcome | Initial State | Prediction (MSB) | Correct? | Final State |
| :-------- | :------------------- | :------------- | :------------ | :--------------- | :------- | :---------- |
| 1         | 3                    | **Taken**      | `01` (WNT)    | Not-Taken (0)    | **No**   | `10` (WT)   |
| 2         | 2                    | **Taken**      | `10` (WT)     | Taken (1)        | Yes      | `11` (ST)   |
| 3         | 1                    | **Taken**      | `11` (ST)     | Taken (1)        | Yes      | `11` (ST)   |
| 4 (exit)  | 0                    | **Not-Taken**  | `11` (ST)     | Taken (1)        | **No**   | `10` (WT)   |

**Reflection:**
1.  **Initial State:** The predictor starts at `01` (Weakly Not-Taken) and makes its first prediction based on the MSB, which is 0. This prediction is wrong, as the loop's first branch is taken.
2.  **Learning:** After the first misprediction, the state increments from `01` to `10` (Weakly Taken). The next prediction is now 'Taken', which is correct for the second iteration. The state is reinforced, incrementing to `11` (Strongly Taken).
3.  **Saturation:** For the third iteration, the state is already `11`. The branch is taken again, and the counter tries to increment but is saturated, so it stays at `11`. The prediction is correct.
4.  **Final Misprediction:** On the final check, the branch is not taken. The prediction is 'Taken' (from state `11`), which is wrong. The state decrements to `10`.

The 2-bit predictor resulted in 2 mispredictions for 4 total branches (50% accuracy in this tiny example). For a loop of 100 iterations, it would have 2 mispredictions out of 101 branches (~98% accuracy), demonstrating its effectiveness.

## Diagrams
A 2-bit saturating counter state machine:

```text
       (Taken)
      <------->
(00) <---- (01) <---- (10) <---- (11)
 SN     WN      WT      ST
  -----> -----> -----> ----->
      (Not-Taken)

States:
00: Strongly Not-Taken
01: Weakly Not-Taken
10: Weakly Taken
11: Strongly Taken

Prediction:
If state is 00 or 01 (MSB=0), predict Not-Taken.
If state is 10 or 11 (MSB=1), predict Taken.

Transitions:
Arrow to the right: Actual outcome was Not-Taken (decrement, saturating at 00).
Arrow to the left: Actual outcome was Taken (increment, saturating at 11).
```

How the predictor and BTB work together in the Fetch stage:

```text
                     +-----------------+
Current PC --------->| Instruction     |
(Program Counter)    | Cache / Memory  |
                     +-----------------+
        |            +-----------------+
        |----------->| Branch Target   |---> Predicted PC (if branch taken)
        |            | Buffer (BTB)    |
        |            +-----------------+
        |            +-----------------+
        '----------->| Branch Predictor|---> Prediction (Taken/Not-Taken)
                     | (e.g., 2-bit   |
                     |  counters)      |
                     +-----------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of the 2-bit predictor as a **"Stubborn Weather Forecaster."**
    *   `11` (Strongly Taken): "I'm certain it will rain." If it's sunny once (Not-Taken), they downgrade to "I think it will rain" (`10`). They don't immediately predict sun.
    *   `10` (Weakly Taken): "I think it will rain." If it's sunny again (Not-Taken), they downgrade to "I think it will be sunny" (`01`).
    *   `01` (Weakly Not-Taken): "I think it will be sunny."
    *   `00` (Strongly Not-Taken): "I'm certain it will be sunny."
    It takes two consecutive wrong forecasts to make them completely change their prediction from "certain rain" to "thinking sun." This stubbornness (hysteresis) is what makes it effective.

2.  **Must-Overlearn Facts:**
    *   Prediction is based on the Most Significant Bit (MSB) of the 2-bit counter. `0x` -> Predict Not-Taken. `1x` -> Predict Taken.
    *   Update rule: Increment on Taken, Decrement on Not-Taken. The counter *saturates* at `11` (binary 3) and `00` (binary 0).
    *   BTB stores the *target address*, Predictor stores the *direction*.

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (1 day).
    *   Review again in 3 days.
    *   Review again in 7 days.
    *   Review again in 16 days.
    *   Review again in 35 days.
    During each review, redraw the state machine from memory and trace the 3-iteration loop example.

4.  **First Principles Pathway:** If you forget the details, rebuild from this:
    *   **Why?** Pipelines need to stay full. Branches create uncertainty (a control hazard).
    *   **What's the simplest solution?** Guess.
    *   **What's a better guess?** Use history. The simplest history is the last outcome (1-bit predictor).
    *   **What's the problem with that?** It flips too easily on the last iteration of a loop, causing two mispredictions.
    *   **How to fix that?** Add memory/hysteresis. Require two consecutive wrong outcomes to flip the strong prediction. This leads directly to the 2-bit saturating counter.

## Common mistakes
1.  **Confusing the Predictor and the BTB:** Students often merge these. Remember: the predictor says *if*, the BTB says *where*. A misprediction can happen if the predictor is wrong (guessed Taken but was Not-Taken) OR if the BTB has the wrong target address.
2.  **Misinterpreting the 2-bit States:** A common error is thinking state `10` (Weakly Taken) means the last branch was not taken. No, it means the predictor's confidence was reduced. The state represents confidence/history, not just the single last outcome.
3.  **Incorrectly Updating the Counter:** Forgetting that the counter saturates. If the state is `11` and the branch is taken again, the state remains `11`, it does not wrap around to `00`.
4.  **Off-by-One in Loop Tracing:** Carefully count the number of branch executions. A loop that runs `N` times has its conditional branch evaluated `N+1` times (N times it's taken to continue the loop, and one final time it's not-taken to exit).

## Self-check
1.  A program contains a loop that executes 200 times. Using a 2-bit saturating counter predictor initialized to `10` (Weakly Taken), how many mispredictions will occur for the duration of this loop's execution?
2.  Describe a code pattern (other than a simple `for` loop) where a "predict backward branch taken, forward branch not-taken" static prediction scheme would be highly effective. Describe a pattern where it would perform poorly.
3.  You are designing a processor. You can either have a simple predictor with a 1-cycle misprediction penalty or a very complex, more accurate predictor with a 5-cycle penalty. What is the maximum misprediction rate the complex predictor can have to be, on average, better than the simple predictor which has a fixed 10% misprediction rate? Derive the inequality.