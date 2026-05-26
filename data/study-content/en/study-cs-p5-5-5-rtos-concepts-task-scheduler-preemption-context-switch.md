## 1. The one-sentence answer
**An RTOS decomposes a real-time program into independent tasks whose execution is orchestrated by a scheduler that can preempt a running task and perform a context switch to preserve its CPU state.**

A task is simply a unit of concurrent work with its own stack and priority. The scheduler repeatedly chooses the highest-priority ready task according to a policy such as fixed-priority or earliest-deadline-first. When a higher-priority task becomes ready while a lower-priority task is executing, the scheduler interrupts the current task—this is preemption. Because the CPU registers and program counter must be saved for the interrupted task and restored for the new one, the kernel performs a context switch.

The entire mechanism exists so that timing constraints can be guaranteed even when many activities compete for the same processor.

> [!NOTE]
> The decisive insight is that preemption plus context switch together turn an ordinary CPU into a virtual set of independent processors, each appearing to run continuously from the task’s perspective.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover runs the VxWorks RTOS; its scheduler must guarantee that the mobility task meets 20 ms deadlines while lower-priority science tasks run in the background.

Tesla’s Autopilot hardware uses an AUTOSAR-compliant RTOS on multiple Infineon Aurix cores; preemption ensures that the 100 µs steering-control loop is never delayed by vision or logging tasks.

The Boeing 787 flight-control computers employ the DEOS RTOS with strict priority-preemptive scheduling; a context switch must complete in under 3 µs to satisfy DO-178C Level A certification.

Modern pacemakers from Medtronic run a small preemptive RTOS so that the pacing task can interrupt telemetry or battery-monitoring tasks within 1 ms of a sensed arrhythmia.

Google’s TensorFlow Lite Micro deployments on Cortex-M microcontrollers often incorporate a minimal RTOS scheduler to let inference coexist with sensor sampling without missing sample deadlines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| CPU registers and stack pointer | Context switch must save and restore exactly these values |
| Interrupt handling       | Preemption is usually triggered by a timer or external interrupt |
| Priority and ready queue | Scheduler decisions rest on these data structures         |

## 4. Building the idea — from intuition to formalism

### Step 1 — A task is an independent execution context
A task is a sequential program that owns its own stack and can be started, blocked, or resumed independently of other tasks.  
Consider two tasks on a Cortex-M: Task A blinks an LED every 500 ms; Task B reads a sensor every 10 ms. Each has its own stack pointer and local variables.  
Formally, a task \(T_i\) is the triple \((P_i, S_i, C_i)\) where \(P_i\) is the program counter, \(S_i\) the stack pointer, and \(C_i\) the remaining CPU register set.  
> [!WARNING]  
> Treating a task as “just a function” omits the stack; two tasks calling the same function will corrupt each other’s call frames.

### Step 2 — The scheduler selects the next task
At every scheduling point the scheduler examines the set of ready tasks and picks one according to a policy.  
With three tasks of priorities 3 (highest), 2, and 1, only the priority-3 task runs while it remains ready.  
Let \(\mathcal{R}(t)\) be the set of ready tasks at time \(t\); the scheduler implements a total order \(\succ\) and selects \(\arg\max_{T_i\in\mathcal{R}(t)} T_i\).  
> [!WARNING]  
> Assuming the scheduler always runs “the oldest” task produces starvation when a continuous high-priority stream exists.

### Step 3 — Preemption forces an involuntary switch
When a higher-priority task becomes ready while a lower-priority task executes, the scheduler may suspend the current task immediately.  
A timer interrupt fires at 1 kHz; the interrupt handler marks a priority-3 task ready, and the scheduler decides to stop the priority-1 task.  
Preemption occurs at time \(t\) if \(\exists T_h, T_l\) such that \(T_h \succ T_l\), \(T_h\) enters \(\mathcal{R}(t)\), and \(T_l\) is currently executing.  
> [!WARNING]  
> Confusing preemption with cooperative yielding leads to missed deadlines when a low-priority task never yields.

### Step 4 — Context switch preserves state
The kernel saves the current task’s registers onto its stack, updates the task-control block, loads the new task’s registers, and jumps to its program counter.  
On ARM Cortex-M the PendSV handler pushes {r4–r11}, switches PSP, then pops the new set.  
The context-switch latency \(\delta\) satisfies \(\delta \ge t_{\text{save}} + t_{\text{restore}}\) where both terms are deterministic on a given architecture.  
> [!WARNING]  
> Forgetting to disable interrupts during the switch window allows nested switches that corrupt the task-control block.

### Step 5 — The integrated RTOS scheduling invariant
Combining the above yields the textbook statement: an RTOS maintains the invariant that at every instant the processor executes the highest-priority ready task, with bounded context-switch overhead.  
This is the precise claim found in standard references.

## 5. Worked examples — every step shown

**Example 1 — Two tasks, one preemption**  
*Given:* Task H (priority 2) and Task L (priority 1); L is running when H is released.  
*Find:* Sequence of scheduler actions.  
1. Timer interrupt marks H ready. *Why:* hardware event changes ready set.  
2. Scheduler compares priorities: \(2 \succ 1\). *Why:* policy selects maximum.  
3. Save L’s registers, load H’s registers. *Why:* context switch realises the decision.  
**Final answer:** L is preempted; H runs until it blocks.  

*Reflection:* The example isolates the single decision point; the same logic scales to dozens of tasks.

**Example 2 — Context-switch cost calculation**  
*Given:* 12 registers to save/restore, each load/store costs 1 cycle, clock 80 MHz.  
*Find:* Minimum switch time.  
1. Save cost = \(12 \times 1 = 12\) cycles. *Why:* each register is written to stack.  
2. Restore cost = 12 cycles. *Why:* symmetric operation.  
3. \(\delta = 24 / 80 \times 10^6 = 300\) ns. *Why:* converts cycles to wall time.  
**Final answer:** \(\delta \ge 300\) ns.

*Reflection:* Real switches also include cache and pipeline effects; the calculation gives the theoretical lower bound.

**Example 3 — Starvation under fixed priority**  
*Given:* Continuous stream of priority-3 tasks and one priority-1 task.  
*Find:* Does the priority-1 task ever execute?  
Reasoning shows the ready set always contains a higher-priority task, so the scheduler never selects priority 1.  
**Final answer:** The low-priority task starves.

*Reflection:* Demonstrates why rate-monotonic or EDF policies are sometimes required.

**Example 4 — Nested preemption timing**  
*Given:* Task M (priority 2) preempts L; while M runs, Task H (priority 3) arrives.  
*Find:* Final execution order after both releases.  
1. M runs.  
2. H preempts M.  
3. H finishes; M resumes.  
4. M finishes; L resumes.  
**Final answer:** Execution order H → M → L.

*Reflection:* Shows that preemption is transitive and that the stack of preempted tasks is strictly priority-ordered.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming context switch is free   | Modern CPUs hide register pressure          | Measure switch latency on target hardware    |
| Treating priorities as absolute   | Priority inversion hides the real urgency   | Apply priority inheritance or ceiling        |
| Forgetting to mark a task ready inside an ISR | ISR runs outside the scheduler              | Always use kernel primitives to wake tasks   |
| Using cooperative yield for hard deadlines | A single infinite loop breaks the schedule  | Enable preemption or watchdog the loop       |
| Ignoring stack size per task      | Overflow corrupts adjacent memory           | Statically analyse worst-case stack depth    |
| Believing “highest priority always wins” without atomic ready-set update | Race between interrupt and scheduler        | Protect ready queue with interrupt masking   |
| Confusing scheduler policy with mechanism | Policy (EDF) can be implemented on the same mechanism (preemption) | Separate policy code from context-switch code |

## 7. The textbook-precise statement
A real-time operating system is a scheduler that, given a set of tasks \(\{T_i\}\) each characterised by release time \(r_i\), worst-case execution time \(C_i\), relative deadline \(D_i\), and priority \(\pi_i\), maintains the invariant that the processor is always executing the highest-priority ready task and that every context switch completes in bounded time \(\delta\). (Liu, *Real-Time Systems*, 2000, §6.2).

## 8. Visual — diagram or schematic
```text
Time axis ─────────────────────────────────────────────▶
Task H (P=3)   |---run---|         |---run---|
Task M (P=2)           |---run---|           |---run---|
Task L (P=1) |-------------------|                 |---run---|
             ↑         ↑         ↑                 ↑
           H released  M released H released     L resumes
```
Vertical arrows mark preemption points; the scheduler always selects the uppermost ready segment.

## 9. The memory technique
1. **The hook** — Picture a railway switchman who can instantly swap entire trains (tasks) onto the single track (CPU) while preserving every passenger’s seat (registers).  
2. **What to overlearn** — The four-word sequence “task, scheduler, preemption, context switch” and the inequality \(\pi_h > \pi_l \implies T_h\) eventually runs.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the definition of a task as \((P,S,C)\) and the scheduler maximisation operator.

## 10. What this unlocks
Mastery of these four concepts lets you analyse and implement priority-inversion avoidance, deadline-monotonic scheduling, and inter-task communication primitives.  
- Next: priority inheritance protocol  
- Next: rate-monotonic analysis and response-time tests  
- Next: semaphore and message-queue blocking semantics  
- Next: tickless idle and power-aware scheduling

## 11. Self-check — five questions, no answers
1. A 3-task system has priorities 1, 2, 3. Task 1 is running when both Task 2 and Task 3 become ready simultaneously. Which task executes immediately after the scheduler runs?  
2. On an architecture whose context-switch cost is 200 ns, a 1 kHz timer tick is used. What fraction of CPU time is lost to switching if every tick causes a switch?  
3. Explain why a task that disables interrupts for 10 ms can cause a 1 ms deadline to be missed even though its own priority is low.  
4. A system uses cooperative scheduling. A low-priority task enters an infinite loop that never yields. What happens to all higher-priority tasks?  
5. Two tasks share a data structure. Task H is released while Task L holds a mutex. Draw the timeline showing the exact moment the context switch back to L occurs after H releases the mutex.