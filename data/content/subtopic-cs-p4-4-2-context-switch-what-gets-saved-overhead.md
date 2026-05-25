## What it is
A context switch is the process, managed by the operating system's kernel, of saving the complete state of a currently running process (or thread) and restoring the complete state of another process so that it can resume execution. This mechanism allows a single CPU to handle multiple processes concurrently by rapidly switching between them. The "context" is the minimal set of data required to perfectly restart the process from where it was interrupted.

## Why it matters
This concept is the bedrock of modern multitasking operating systems. In aerospace, real-time operating systems (RTOS) for flight control or satellite management depend on predictable, low-latency context switches to guarantee that critical tasks meet their deadlines. In high-performance computing for physics simulations or machine learning, high context switch overhead can cripple performance, as the CPU spends more time switching and less time doing useful computation ($T_{useful}$).

## When to study it
You must have a solid grasp of these prerequisites first. If you don't, pause and review them.
1.  **Process vs. Thread:** Understand that a process has its own address space, while threads within a process share an address space.
2.  **Process States:** Be able to draw and explain the state diagram (New, Ready, Running, Waiting, Terminated). A context switch is the transition mechanism between these states.
3.  **Kernel and User Mode:** Understand the distinction between privileged kernel mode and unprivileged user mode, and the role of system calls and interrupts in transitioning between them.
4.  **Basic CPU Architecture:** Know the function of the Program Counter (PC), Stack Pointer (SP), and general-purpose registers.

## How to study it (step by step)
1.  **List the "Context":** Take a piece of paper. Without looking it up, try to list every piece of information you would need to save to perfectly pause a running C program and resume it later. Think about what the CPU is actively using. Then, check your list against the contents of a Process Control Block (PCB).
2.  **Trace the Trigger:** Draw the timeline of a process P1 running. An event occurs (e.g., a timer interrupt). Trace the exact sequence: (1) Hardware trap into kernel mode. (2) Kernel interrupt handler begins. (3) Kernel decides a switch is needed. This clarifies that the process itself does not decide to switch; the kernel does in response to an event.
3.  **Trace the Switch:** Now, continue the timeline. Detail the kernel's actions: (a) Save P1's registers, PC, etc., into its PCB. (b) Update P1's state in the PCB (e.g., Running -> Ready). (c) Choose a new process, P2, to run (this is the scheduler's job). (d) Load P2's context from its PCB into the CPU registers. (e) Update P2's state (Ready -> Running). (f) Return from interrupt, which places the PC from P2's context into the CPU, resuming P2.
4.  **Quantify the Overhead:** Research typical context switch times (they are on the order of microseconds). Identify the two main sources of cost:
    *   **Direct Cost:** The CPU time spent by the kernel executing the save/load instructions.
    *   **Indirect Cost:** The performance degradation due to cache invalidation. When P2 starts, the CPU cache is full of P1's data ("polluted"), leading to a spike in slow cache misses until P2's working set is loaded into the cache. This indirect cost is often much larger than the direct cost.
5.  **Compare Process vs. Thread Switch:** Create a two-column table. In the "Process Switch" column, list everything that gets saved/restored. In the "Thread Switch" column, do the same. Identify the key difference: memory management information (like page table pointers) does not need to be changed for a thread switch, as threads share the same address space. This is why thread switches are significantly faster.

## Key ideas, with intuition
1.  **The Process Control Block (PCB) is the process's "save file".** Imagine you are playing a video game and need to stop. You hit "Save Game". The game saves your location, inventory, health, etc., to a file. The PCB is exactly that for a process. It stores the CPU register values, program counter, stack pointer, memory map, open files, and priority, allowing the OS to restore it perfectly.
2.  **The switch is involuntary and transparent.** From the process's perspective, it was running, and then suddenly it is running again, with no awareness of the time gap or that other processes ran. This illusion is maintained by the kernel, which acts as a master controller, responding to external events like timer interrupts or I/O completion.
3.  **Overhead is the price of concurrency.** A context switch is pure overhead; no user code is executed during the switch. The total time a system runs is $T_{total} = \sum T_{process\_execution} + \sum T_{switch\_overhead}$. The fundamental trade-off in scheduler design is balancing responsiveness (short time slices, more switches) against efficiency (long time slices, fewer switches).
4.  **Cache & TLB Pollution is the hidden killer.** The CPU keeps frequently used data in a small, fast cache. The Translation Lookaside Buffer (TLB) caches virtual-to-physical address translations. When the OS switches to a new process, the data in the cache and TLB is likely useless for the new process. The new process will run slowly at first as it fetches everything from slow main memory, a phenomenon known as a "cold cache".

## Worked example
Let's trace a context switch from Process P1 to Process P2, triggered by a timer interrupt.

**Initial State:**
*   P1 is in the `Running` state.
*   CPU is in `user mode`.
*   Program Counter (PC) points to address `0x400500`, which contains the instruction `ADD R1, R2`.
*   Register `R1` = 5, `R2` = 10.

**Step-by-Step Execution:**
1.  **Instruction Execution:** The CPU executes `ADD R1, R2`. The value of `R1` becomes 15. The PC is automatically incremented to `0x400504`, the address of the next instruction.
2.  **Timer Interrupt:** Before the next instruction can be fetched, the hardware timer fires an interrupt.
3.  **Mode Switch (Trap):** The CPU hardware automatically performs several actions:
    *   It saves the current PC (`0x400504`) and status register onto the kernel stack.
    *   It switches from `user mode` to `kernel mode`.
    *   It jumps to a predefined memory location containing the kernel's interrupt handler code.
4.  **Kernel Handler Runs:** The OS's interrupt handling code begins to execute. It determines the cause was the timer. The scheduler is invoked.
5.  **Save P1's Context:** The scheduler decides to switch processes. The kernel executes code to save P1's state into its PCB (let's call it `PCB1`):
    *   `PCB1.PC = 0x400504`
    *   `PCB1.R1 = 15`, `PCB1.R2 = 10`, ... (all other registers are saved)
    *   `PCB1.StackPointer = ...` (current value of SP)
    *   `PCB1.State = Ready`
6.  **Load P2's Context:** The scheduler chooses P2 to run next. The kernel executes code to load P2's state from `PCB2`:
    *   CPU registers are loaded with values from `PCB2` (e.g., `R1 = PCB2.R1`, `R2 = PCB2.R2`, ...).
    *   The Stack Pointer is restored from `PCB2.StackPointer`.
    *   `PCB2.State` is updated to `Running`.
7.  **Return from Interrupt:** The kernel executes a special `RTI` (Return From Interrupt) instruction. This instruction:
    *   Restores the PC and status register from the kernel stack. Critically, the PC value loaded is the one saved in `PCB2`, say `0x801A00`.
    *   Switches the CPU back from `kernel mode` to `user mode`.
8.  **P2 Resumes:** The CPU is now executing in user mode, running P2's code, starting from address `0x801A00`, as if it was never interrupted.

**Reflection:** Each step is precise and atomic. The hardware handles the initial mode switch (trap), and the kernel software handles the meticulous saving and restoring of the full process state. This division of labor ensures the switch is both fast and robust.

## Diagrams
Here is a timeline of a context switch:

```text
Time
 |
 |  Process P1 (User Mode)
 |    ... executes ...
 |    ... instruction ...
 |
 +------------------------> Timer Interrupt Occurs
 |
 |  OS Kernel (Kernel Mode)
 |    |
 |    +--> Trap to kernel
 |    |
 |    +--> Save state of P1 to its PCB
 |    |
 |    +--> Scheduler runs, chooses P2
 |    |
 |    +--> Load state of P2 from its PCB
 |    |
 |    +--> Return from interrupt
 |
 +------------------------> P2 resumes execution
 |
 |  Process P2 (User Mode)
 |    ... executes ...
 |
 V
```

And the structure of a Process Control Block (PCB):

```text
+-----------------------------+
|      Process State          | (e.g., Ready, Running)
+-----------------------------+
|      Process ID (PID)       |
+-----------------------------+
|      Program Counter (PC)   |
+-----------------------------+
|      CPU Registers          | (R1, R2, ..., SP)
+-----------------------------+
|   Memory Management Info    | (Page table base register, etc)
+-----------------------------+
|   Accounting Information    | (CPU time used)
+-----------------------------+
|   I/O Status Information    | (List of open files)
+-----------------------------+
|             ...             |
+-----------------------------+
```

## Memory technique — remember this forever
1.  **The Mnemonic Story: "The Chess Grandmaster"**
    Imagine a chess grandmaster playing 20 games simultaneously (multitasking). She walks from board to board. When she arrives at a board (a process), she can't just make a random move. She must instantly recall the entire state of *that specific game*: the position of every piece, her long-term strategy, her opponent's last move. This "mental state" is the **context**. The time she spends pausing, walking to the next board, and loading its state into her mind is the **context switch overhead**. Her brain is the CPU, the OS is the tournament organizer telling her which board to move to next.

2.  **Must Overlearn Facts:**
    *   **What is saved (The Context):** PC, CPU Registers, Process State, Memory Management Info.
    *   **Why it's slow (The Overhead):** Direct cost (saving/loading registers) + Indirect cost (cache and TLB misses).

3.  **Spaced Repetition Schedule:**
    Review this entire mini-lesson at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders now.

4.  **First Principles Pathway:**
    If you forget the details, rebuild it from this question: "If I have to stop a program right now and restart it on an identical but blank CPU, what is the absolute minimum set of data I need to copy from the old CPU to the new one?"
    *   You need to know what instruction to run next -> **Program Counter**.
    *   That instruction uses variables stored in registers -> **CPU Registers**.
    *   It needs to access its memory and stack -> **Memory Management Info & Stack Pointer**.
    *   The OS needs to know if it was running or waiting for I/O -> **Process State**.
    You have just re-derived the core contents of the PCB.

## Common mistakes
1.  **Confusing Context Switch with Mode Switch:** A system call causes a mode switch (user -> kernel) so the OS can perform a service. If the service is quick, the OS performs a mode switch back (kernel -> user) to the *same process*. A context switch only happens if the OS decides to run a *different* process, and it *includes* two mode switches as part of its operation.
2.  **Ignoring Indirect Costs:** Stating that context switch overhead is just the time to save and load registers. This is incorrect. The performance hit from cache pollution is often an order of magnitude larger and is the dominant factor in real-world systems.
3.  **Assuming All Switches are Equal:** A context switch between threads of the same process is much faster than between two separate processes. Why? Because they share the same address space, so the most expensive part—invalidating the TLB and changing memory management registers—is skipped.

## Self-check
1.  What specific hardware event initiates the context switch process, and what is the first action the CPU hardware takes automatically in response?
2.  Process A is compute-bound and its working set fits entirely in the L1 cache. Process B is I/O-bound and constantly reading different small files from disk. Which of these two processes, when switched *to*, is likely to cause a more significant initial performance drop for the system and why? (Hint: Think about cache contents).
3.  You are designing an RTOS for a rocket's guidance system. You can have a long time slice (e.g., 100ms) or a very short one (e.g., 1ms). A short time slice provides better responsiveness to new sensor data, but what is the direct trade-off in terms of system performance? Use the concept of overhead percentage in your explanation.