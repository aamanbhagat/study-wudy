## 1. The one-sentence answer
**An RTOS coordinates multiple independent tasks through a scheduler that applies priority rules and preemption, saving and restoring CPU state during every context switch so that timing guarantees remain intact.**

A task is simply a function with its own stack and state that the RTOS treats as an independent unit of work. The scheduler repeatedly chooses which ready task should run next; when a higher-priority task becomes ready while a lower-priority task is executing, the scheduler performs preemption. Preemption is possible only because the RTOS can stop the current task, save every register and the program counter into a data structure called the task control block, load the new task’s saved registers, and resume execution—operations collectively called a context switch.

These mechanisms together convert an ordinary microcontroller into a deterministic real-time engine. Without them, a single long-running function could block time-critical responses indefinitely.

> [!NOTE]
> The single deepest insight is that the context switch is not free; every microsecond spent saving and restoring state is time the CPU is not doing useful work, so RTOS designers minimise what must be saved while still guaranteeing correctness.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover runs VxWorks on its RAD750 processor; the scheduler must guarantee that the entry-descent-landing task set meets hard deadlines even while lower-priority science tasks continue.

Tesla’s Autopilot hardware uses a custom RTOS on its HW3 and HW4 chips; preemption ensures that the vision pipeline task can interrupt planning tasks when a new camera frame arrives, keeping reaction latency under 10 ms.

STMicroelectronics ships FreeRTOS as the default kernel for STM32H7 motor-control examples; the scheduler’s priority-based preemption lets the current-loop task run at 20 kHz while the CAN-communication task runs only when the loop is idle.

Infineon’s AURIX TC3xx microcontrollers in automotive ECUs rely on the AUTOSAR OS scheduler; context-switch overhead is budgeted so that the 100 µs airbag-deployment task is never delayed by more than one context switch.

Google’s TensorFlow Lite Micro on Cortex-M devices uses CMSIS-RTOS2; the scheduler’s preemption model lets the inference task yield to a higher-priority sensor-sampling task without corrupting the neural-network state.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| CPU registers & stack| Context switch must copy exactly these values; without understanding them you cannot see why a switch is expensive. |
| Interrupt handling   | Most schedulers are entered from a timer or software interrupt; you must know how interrupts differ from normal function calls. |
| Priority & deadlock  | Scheduler decisions rest on fixed or dynamic priorities; missing this leads to priority inversion bugs. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A task is an independent execution context
A task is a C function plus its private stack and a small control block that records whether it is ready, running, or blocked.  
Example: `void SensorTask(void *arg)` with its own 512-byte stack.  
Formally, a task \(T_i\) is the tuple \((C_i, T_i, D_i, P_i)\) where \(C_i\) is worst-case execution time, \(T_i\) is period, \(D_i\) is deadline, and \(P_i\) is priority.  
> [!WARNING] Treating a task as “just another function” hides the fact that two tasks can be paused and resumed at arbitrary instructions; any shared data therefore needs protection.

### Step 2 — The scheduler selects the next ready task
At every scheduling point the scheduler scans the ready list and picks the highest-priority task.  
Example: tasks A (prio 3), B (prio 5), C (prio 4) are ready; scheduler always chooses B.  
Formally, the scheduler implements a mapping \(S: 2^{\{T_i\}} \to T_j\) where \(T_j\) has the maximum priority among ready tasks.  
> [!WARNING] If priorities are not unique or not declared correctly, the scheduler may silently starve a lower-priority task forever.

### Step 3 — Preemption occurs when a higher-priority task becomes ready
While a low-priority task runs, an interrupt or another task may make a high-priority task ready; the scheduler then forces an immediate switch.  
Example: motor-control task (prio 10) is released by a PWM timer while the logging task (prio 2) is running.  
Formally, preemption is allowed iff \(P_{\text{new}} > P_{\text{current}}\) at a scheduling point.  
> [!WARNING] Forgetting that preemption can happen inside an interrupt service routine leads to unbounded latency.

### Step 4 — Context switch saves and restores machine state
The RTOS copies the current CPU registers, program counter, and stack pointer into the running task’s control block, then loads the new task’s values.  
Example: Cortex-M ` PendSV` handler pushes R4–R11, LR, PC, xPSR onto the task stack and updates the PSP.  
Formally, a context switch is the atomic sequence \(\text{save}(TCB_{\text{old}}), \text{load}(TCB_{\text{new}})\).  
> [!WARNING] Missing even one callee-saved register produces silent data corruption after the switch.

### Step 5 — Tick interrupt drives periodic scheduling decisions
A hardware timer fires every system tick (commonly 1 ms); the tick handler may unblock delayed tasks and invoke the scheduler.  
Formally, at each tick \(t = k \cdot \Delta\), the set of ready tasks is recomputed.  
> [!WARNING] Choosing too large a tick interval increases response-time jitter; too small wastes CPU on tick overhead.

### Step 6 — Schedulability test gives the timing guarantee
Rate-monotonic or earliest-deadline-first analysis tells you whether the chosen task set will always meet deadlines under preemptive scheduling.  
Formally, for rate-monotonic scheduling the Liu–Layland bound states \(\sum (C_i / T_i) \le n(2^{1/n}-1)\).  
> [!WARNING] Passing the utilisation test is necessary but not sufficient once blocking and context-switch overhead are considered.

## 5. Worked examples — har step show karo

**Example 1 — Single task creation**  
*Given:* FreeRTOS `xTaskCreate(SensorTask, "Sensor", 128, NULL, 2, &h)`  
*Find:* Minimum stack size that avoids overflow.  
Step 1: each automatic variable and call frame consumes stack bytes.  
Step 2: add 10 % safety margin.  
Step 3: round up to next multiple of 4 for alignment.  
**128 words**  
*Reflection:* The example forces you to quantify stack usage before runtime; the same arithmetic appears in every task you will ever create.

**Example 2 — Priority ordering**  
*Given:* Task A (C=2 ms, T=10 ms, P=1), Task B (C=3 ms, T=20 ms, P=2).  
*Find:* Which task runs first after both become ready at t=0.  
Step 1: compare priorities.  
Step 2: B has higher numeric priority.  
Step 3: scheduler therefore selects B.  
**Task B executes first**  
*Reflection:* Priority numbers are arbitrary but their relative order is absolute; swapping the numbers would invert the schedule.

**Example 3 — Preemption latency calculation**  
*Given:* Low-priority task holding CPU, high-priority task released by GPIO interrupt.  
*Find:* Worst-case latency until high-priority task starts.  
Step 1: finish current instruction (≤4 cycles).  
Step 2: enter interrupt handler (12 cycles).  
Step 3: context switch (62 cycles on Cortex-M4).  
Step 4: scheduler decides (variable).  
**≤78 cycles**  
*Reflection:* Every extra cycle in the handler directly adds to the latency budget you must prove.

**Example 4 — Context-switch overhead in utilisation**  
*Given:* 5 tasks, each context switch costs 20 µs, tick = 1 ms.  
*Find:* Additional utilisation caused by switches.  
Step 1: maximum switches per tick = 5.  
Step 2: total switch time = 100 µs.  
Step 3: divide by tick = 0.1.  
**10 % extra utilisation**  
*Reflection:* Overhead is not free; it must be subtracted from the Liu–Layland bound before you claim the system is schedulable.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using the same priority for every task | Default examples set all priorities equal           | Assign distinct priorities based on deadline monotonic order |
| Forgetting to yield inside an ISR | ISR runs with interrupts disabled; no automatic reschedule | Call `portYIELD_FROM_ISR` when a higher task is woken |
| Stack overflow at runtime   | Compile-time stack estimate ignored dynamic calls   | Enable stack-overflow hook and size stacks with 50 % margin |
| Priority inversion          | Low-priority task holds mutex needed by high-priority task | Use priority inheritance or priority ceiling protocol |
| Measuring only average latency | Ignores worst-case preemption paths                 | Always compute worst-case response time including context-switch cost |
| Tick too fast               | Developer copies 100 µs tick from an example        | Measure tick overhead; keep it <5 % of CPU budget    |
| Shared global variables without protection | “It worked in the debugger”                         | Protect every shared object with mutex or disable interrupts |

## 7. The textbook-precise statement
A real-time operating system provides a fixed or dynamic set of tasks \(\{T_1,\dots,T_n\}\). Each task \(T_i\) is characterised by a tuple \((C_i,T_i,D_i,P_i)\). The preemptive priority scheduler selects at every scheduling instant the ready task with the highest priority. A context switch occurs when the selected task differs from the currently executing task; its cost is bounded by a constant \(\sigma\). The system is schedulable under rate-monotonic assignment if \(\sum_{i=1}^n C_i/T_i \le n(2^{1/n}-1)\) and blocking time plus \(\sigma\) are included in the response-time equations (Liu, *Real-Time Systems*, 1e, §3.4).

## 8. Visual — diagram or schematic
```
CPU time line (1 ms tick)
| LowPrio Task A          | HighPrio Task B | A resumes |
0ms                       0.3ms           0.8ms
   ^tick          ^GPIO ISR wakes B
   context switch          context switch
```
Labelled points: tick interrupt at 0 ms, preemption at 0.3 ms, second context switch at 0.8 ms.

## 9. The memory technique
1. **The hook** — Picture a strict traffic cop (scheduler) who can yank a slow car (low-priority task) off the road the instant an ambulance (high-priority task) appears; the cop writes the slow car’s exact dashboard state (registers) on a clipboard (TCB) before letting the ambulance pass.
2. **What to overlearn** — The three numbers: context-switch cost \(\sigma\), tick interval \(\Delta t\), and the Liu–Layland utilisation bound for your task count.
3. **Spaced-repetition schedule** — Review the hook image after 1 day, redraw the utilisation bound after 3 days, calculate a fresh preemption latency after 7 days, and re-derive the context-switch sequence after 16 and 35 days.
4. **First-principles fallback** — If you forget the bound, start from “CPU time is finite, each task needs \(C_i\) every \(T_i\), therefore total demand cannot exceed 1”; add the measured \(\sigma\) per switch and you recover the test.

## 10. What this unlocks
Mastering these four concepts lets you move to response-time analysis, priority-inheritance protocols, and multiprocessor scheduling without conceptual gaps.

- Earliest-deadline-first scheduling
- Stack-resource policy for deadlock avoidance
- Schedulability under multicore global scheduling
- Integration with time-triggered architectures

## 11. Self-check — five questions, no answers
1. A task with period 5 ms and execution time 2 ms runs alone; what is its utilisation?  
2. Two tasks share a mutex; the low-priority task holds it when the high-priority task becomes ready—what term describes the resulting delay?  
3. On Cortex-M, which instruction sequence is responsible for the majority of context-switch cycles?  
4. If you raise the tick frequency from 1 kHz to 10 kHz, does the schedulability bound become tighter or looser?  
5. A newly created task has the same priority as an existing task; which task runs first after the next tick, and why?