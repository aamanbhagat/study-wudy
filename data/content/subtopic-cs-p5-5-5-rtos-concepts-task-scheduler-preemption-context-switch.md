## What it is
A Real-Time Operating System (RTOS) manages a computer's resources to ensure that time-critical operations execute within guaranteed deadlines. Its core components are **tasks** (independent threads of execution), a **scheduler** (the policy-maker that decides which task runs), **preemption** (the mechanism to enforce the scheduler's decisions by forcibly stopping one task for another), and the **context switch** (the low-level process of saving one task's state and loading another's). These concepts work together to provide deterministic, predictable timing behavior, which is absent in general-purpose operating systems like Windows or macOS.

## Why it matters
These concepts are the bedrock of systems where failure is not an option. In aerospace, the flight control computer of a rocket or aircraft uses an RTOS to guarantee that sensor readings, guidance calculations, and actuator commands happen on a strict schedule; a missed deadline could be catastrophic. In physics, particle accelerators and fusion reactors use RTOSes to synchronize thousands of sensors, magnets, and diagnostic tools with microsecond precision.

## When to study it
Before tackling this, you must have a solid grasp of these prerequisites:
1.  **C Programming:** Specifically pointers, function pointers, and structs. You need to understand how to manipulate memory directly.
2.  **Computer Architecture:** You must know what the Program Counter (PC), Stack Pointer (SP), and general-purpose CPU registers are. Understand the concept of the call stack.
3.  **Basic OS Theory:** You should already know the difference between a process and a thread, and what a scheduler does in a non-real-time OS like Linux.

If you are not comfortable with these, pause and review them. We are moving from abstract OS theory to the specific, low-level implementation details that make real-time guarantees possible.

## How to study it (step by step)
1.  **Draw the Task State Diagram:** On paper, draw a diagram with three circles labeled "Ready", "Running", and "Blocked". Draw arrows between them representing events like "Scheduler dispatches task", "Task waits for I/O", "I/O completes", and "Higher-priority task becomes ready". This visualizes the lifecycle of a single task.
2.  **Simulate a Scheduler:** Create a table with columns: Time, Task Ready, Running Task, Event. Use three tasks: T1 (High Prio), T2 (Med Prio), T3 (Low Prio). Start with T3 running. At Time=5, an interrupt makes T1 ready. Walk through the steps: interrupt occurs, T3 is preempted, context switch saves T3's state, context switch loads T1's state, T1 runs.
3.  **Deconstruct a Context Switch:** Write down the list of CPU registers for a simple architecture (e.g., ARM Cortex-M: R0-R12, SP, LR, PC, PSR). Verbally explain what the RTOS must do to save the "context" of Task A: push all these registers onto Task A's stack, save the new stack pointer value to Task A's control block. Then, explain the reverse process for restoring Task B.
4.  **Code a "Toy" Scheduler:** In C, define a `struct TCB` (Task Control Block) containing a stack pointer and a pointer to the next task. Create an array of three TCBs. Write a simple function `scheduler()` that just round-robins through the array, changing a global `current_task` pointer. This is not a real RTOS, but it builds the core mental model of the scheduler's data structures.
5.  **Compare Preemptive vs. Cooperative:** Draw two timelines from t=0 to t=100. On the first (cooperative), show a low-priority task running a long loop. A high-priority event occurs at t=10, but the high-priority task can't run until the low-priority task explicitly `yield()`s at t=80. On the second timeline (preemptive), show the high-priority task immediately preempting the low-priority task at t=10.

## Key ideas, with intuition
1.  **Task: An Independent Execution Path.** A task is essentially a function that thinks it has the entire CPU to itself. The RTOS creates this illusion. Each task has its own stack to store local variables and function call history, and a "Task Control Block" (TCB) where the RTOS stores the task's state (like its saved registers) when it's not running.
2.  **Scheduler: The Decider.** The scheduler is the core logic of the RTOS. Its only job is to look at the list of all tasks that are ready to run and pick one to place on the CPU. The most common policy in an RTOS is strict priority-based scheduling: if a high-priority task is ready, it *will* run, period.
3.  **Preemption: The Enforcer.** Preemption is what gives the scheduler its power. When a hardware interrupt (like a timer tick or a sensor signaling data is ready) occurs, the CPU automatically stops the current task and runs an Interrupt Service Routine (ISR). The ISR can make a higher-priority task ready. Before returning to the interrupted low-priority task, the RTOS checks: "Is there now a higher-priority task ready to run?" If yes, it *preempts* the lower-priority one and switches to the new, more important task. It doesn't ask for permission.
4.  **Context Switch: The Mechanism.** This is the physical act of changing which task is running. It's pure mechanical overhead. The RTOS saves the complete CPU state (all registers, program counter, status flags) of the outgoing task onto its stack. Then, it loads the previously saved state of the incoming task from *its* stack into the CPU registers. The final step is loading the new task's program counter, at which point the CPU begins executing the new task's code as if it had never been stopped.

Let $C$ be the context of a task, which is the set of all CPU registers $\{R_0, R_1, ..., R_n, PC, SP, ...\}$. A context switch from task $T_A$ to $T_B$ is the function:
$$ \text{ContextSwitch}(T_A, T_B) = \{ \text{save}(C_{CPU}, \text{stack}_A); \text{load}(C_{CPU}, \text{stack}_B) \} $$
This operation is the fundamental source of overhead in a multitasking system. Minimizing its duration, $t_{switch}$, is critical for performance.

## Worked example
**Scenario:** A flight controller has three tasks:
*   `T_NAV` (Priority 1, Lowest): Calculates the long-term flight path. Execution time: 10ms.
*   `T_ATT` (Priority 2, Medium): Adjusts attitude control surfaces (ailerons, etc.). Execution time: 4ms.
*   `T_IMU` (Priority 3, Highest): Reads data from the Inertial Measurement Unit. Execution time: 1ms.

**Timeline:**
*   **t=0ms:** System starts. `T_NAV` is the only ready task. The scheduler runs `T_NAV`.
*   **t=3ms:** A timer interrupt fires, indicating it's time to run the attitude control loop. The ISR makes `T_ATT` ready.
*   **Step 1: Preemption Check.** The scheduler runs. It sees `T_ATT` (Prio 2) is ready and `T_NAV` (Prio 1) is running. Since $2 > 1$, a preemption is necessary.
*   **Step 2: Context Switch Out.** The RTOS saves `T_NAV`'s context (program counter, registers) to its stack. `T_NAV` is now in the "Ready" state, paused at 3ms of its 10ms execution.
*   **Step 3: Context Switch In.** The RTOS loads `T_ATT`'s context. `T_ATT` is moved to the "Running" state.
*   **t=3ms to t=7ms:** `T_ATT` runs for its full 4ms execution time.
*   **t=7ms:** `T_ATT` completes its work and goes into a "Blocked" state, waiting for its next timer.
*   **Step 4: Scheduler Runs Again.** The scheduler sees that `T_IMU` is not ready, and `T_ATT` is blocked. The highest priority ready task is now `T_NAV` (Prio 1).
*   **Step 5: Context Switch Back.** The RTOS loads `T_NAV`'s context from its stack. `T_NAV` resumes exactly where it left off.
*   **t=7ms to t=14ms:** `T_NAV` runs for its remaining 7ms.

**Reflection:** The key was the preemption at t=3ms. The scheduler didn't wait for `T_NAV` to finish. It immediately and deterministically switched to the higher-priority `T_ATT` the moment it became ready, ensuring the time-critical attitude control was prioritized over the less critical navigation calculation.

## Diagrams
**Task State Diagram**

```text
                 Scheduler dispatches task
            +--------------------------------------+
            |                                      |
            |                                      |
            v         Higher-priority task         |
      +-----------+       becomes ready        +---------+
----->|   Ready   |--------------------------->| Running |
      +-----------+  (Preemption by scheduler)  +---------+
            ^                                      |
            |                                      | Task requests I/O,
            | Event occurs (e.g., I/O done)        | waits for resource
            |                                      |
            |                                      v
            |                                +-----------+
            +--------------------------------|  Blocked  |
                                             +-----------+
```

**Preemptive Scheduling Timeline**

```text
TIME: 0ms      3ms      7ms           14ms
      |--------|--------|-------------|------>
CPU   | T_NAV  | T_ATT  |    T_NAV    | IDLE
      | (P=1)  | (P=2)  |    (P=1)    |
      +--------+--------+-------------+------>

T_IMU (P=3) --- Ready ---------------------------->
T_ATT (P=2) --- Ready -- RUNNING -- Blocked ------>
T_NAV (P=1) --- RUNNING- Ready --- RUNNING - Done >

EVENT:         ^
               |
               Timer IRQ, T_ATT becomes Ready.
               T_NAV is preempted.
```

## Memory technique — remember this forever
1.  **The Emergency Room Analogy:**
    *   **CPU:** The single, high-tech operating room.
    *   **Tasks:** Patients with different ailments (broken arm, chest pains, sniffles).
    *   **Priority:** The triage level. Chest pains (high priority) are more urgent than a broken arm (medium), which is more urgent than sniffles (low).
    *   **Scheduler:** The no-nonsense triage nurse who decides who gets the operating room *right now*.
    *   **Preemption:** The nurse bursting into the OR where a doctor is setting a broken arm, saying "Stop! A heart attack just came in. We need this room NOW."
    *   **Context Switch:** The frantic but precise process of wheeling the broken-arm patient out, sterilizing the room, and wheeling the heart-attack patient in with their charts and equipment. It's necessary, but it takes time away from actual treatment.

2.  **Facts to Overlearn:**
    *   **Task:** A function with its own private stack.
    *   **Scheduler:** Decides which ready task runs next based on a fixed policy (usually priority).
    *   **Preemption:** A higher-priority task can and will interrupt a lower-priority task.

3.  **Spaced Repetition Schedule:**
    *   Review this entire sheet in: **1 day, 3 days, 7 days, 16 days, 35 days.**
    *   During each review, redraw the state diagram and the timeline from memory.

4.  **First Principles Pathway:**
    *   If you forget everything, start here: I have one CPU but many jobs to do. Some jobs are more important than others and have deadlines.
    *   How do I manage this? I need a list of jobs (tasks). I need a policy to choose which job to run (scheduler/priority). I need a way to enforce my choice, even if a less important job is already running (preemption). I need a mechanism to swap between jobs (context switch).

## Common mistakes
1.  **Confusing "Blocked" and "Ready":** A "Ready" task has everything it needs to run; it's just waiting for the CPU to become available. A "Blocked" task is waiting for something else entirely, like a timer to expire or for data to arrive from a sensor. A blocked task cannot be scheduled, even if it's the highest priority.
2.  **Ignoring Context Switch Overhead:** In a system with thousands of context switches per second, the time spent switching (e.g., 5-10 microseconds per switch) can add up to significant CPU waste. High-frequency task switching is not "free".
3.  **Stack Overflow:** Each task has its own stack, which is a fixed-size block of memory. If a task uses deep function calls or large local variables, it can exceed its allocated stack size, corrupting the memory of an adjacent task. This is one of the hardest bugs to find in an embedded system.
4.  **Assuming Priority Solves Everything:** A high-priority task can become stuck waiting for a resource (like a data bus) locked by a low-priority task. This is called *priority inversion* and requires special mechanisms like mutexes with priority inheritance to solve.

## Self-check
1.  What is the key difference between a task in the 'Ready' state and a task in the 'Blocked' state, from the scheduler's perspective?
2.  An RTOS is running Task A (priority 5). A timer interrupt occurs. The Interrupt Service Routine (ISR) performs an action that makes Task B (priority 10) ready to run. Describe, in order, the sequence of main events that happen from the moment the ISR completes to the moment Task B's first instruction is executed.
3.  A system has a high-priority task `T_H` that runs every 10ms for 3ms, and a low-priority task `T_L` that needs to run for 20ms. If `T_L` starts at t=0, at what time will it complete its 20ms of work? Assume `T_H` becomes ready at t=0, t=10, t=20, etc. and context switch time is zero.