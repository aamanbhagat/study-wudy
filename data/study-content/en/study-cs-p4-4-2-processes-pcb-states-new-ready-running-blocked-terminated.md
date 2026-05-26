## 1. The one-sentence answer
**A process is a program in execution whose complete runtime context is stored in a Process Control Block (PCB) that records one of five mutually exclusive states: new, ready, running, blocked, or terminated.**

The operating system never runs source code directly. It first creates a process object that owns memory, open files, CPU registers, and a program counter. That object is described by a single data structure—the PCB—so the kernel can suspend the process, resume it later, or terminate it without losing its identity.

States exist because the CPU is a scarce shared resource. A process that is computing occupies the CPU (running). One that is waiting for I/O or a signal yields the CPU (blocked). One that is prepared to compute but lacks the CPU sits in a queue (ready). These distinctions let the scheduler decide which process receives the next time slice.

> [!NOTE]
> The PCB is the sole authoritative record; the hardware registers themselves are merely a transient copy that the kernel must save on every context switch.

## 2. Why this matters — concrete and current
Linux’s Completely Fair Scheduler (CFS) in the kernel (kernel/sched/fair.c) walks the ready queue of task_struct PCBs every few milliseconds to decide which thread runs next; incorrect state tracking produces starvation visible in production workloads at Google and Meta.

SpaceX’s flight software on the Falcon 9 uses a real-time executive that maintains separate PCBs for guidance, telemetry, and engine control tasks; a blocked state on a sensor read must not prevent a running guidance task from meeting its 10 ms deadline.

NVIDIA’s CUDA driver creates host-side processes whose PCBs track GPU context; when a CUDA kernel blocks on memory transfer, the driver moves the PCB from running to blocked so the CPU scheduler can run another application while the GPU DMA engine finishes.

Android’s ActivityManagerService records each app in a PCB-like structure (ProcessRecord) whose state transitions from ready to running to blocked (on binder IPC) determine whether the Low Memory Killer may reclaim its memory.

Intel’s Thread Director on Alder Lake inspects per-thread PCBs to migrate a running process between P-cores and E-cores; a misclassified blocked state wastes power on an idle core.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Program vs. process       | Distinguishes static code from an active execution image  |
| Context switch            | Explains why the PCB must capture registers and PC        |
| Kernel vs. user mode      | Determines which code is allowed to read or write a PCB   |
| Queue data structure      | Implements the ready and blocked lists                    |

## 4. Building the idea — from intuition to formalism

### Step 1 — A program becomes a process
When the loader maps an executable into memory and the kernel allocates a PCB, the new process exists but has never executed.  
Example: typing `./a.out` causes the shell to issue `execve`; the kernel creates a PCB with state = new and PID = next available integer.  
Formal statement:  
$$ \text{PCB}.\text{state} \leftarrow \text{new} \quad \text{upon successful creation} $$  
> [!WARNING] Treating the program file itself as the process leads to the error that two simultaneous runs share the same address space.

### Step 2 — Admission to the ready queue
The process is now eligible for the CPU but awaits selection.  
Example: after fork() the child PCB is moved from new to ready and enqueued.  
Formal statement:  
$$ \text{readyQueue}.\text{enqueue}(\text{PCB}) \quad \text{when state transitions new} \to \text{ready} $$  
> [!WARNING] Forgetting to enqueue leaves the process permanently invisible to the scheduler.

### Step 3 — Dispatch to running state
The scheduler dequeues a PCB and restores its registers; the CPU now executes that process.  
Example: timer interrupt ends the previous quantum; the next PCB’s state becomes running and its PC is loaded into the instruction pointer.  
Formal statement:  
$$ \text{PCB}.\text{state} \leftarrow \text{running},\quad \text{CPU}.\text{PC} \leftarrow \text{PCB}.\text{PC} $$  
> [!WARNING] Allowing two PCBs to be marked running simultaneously violates mutual exclusion and corrupts shared kernel data.

### Step 4 — Voluntary or involuntary yield to blocked
A running process that issues a blocking system call (read, wait, sleep) or suffers a page fault moves to blocked.  
Example: `read(fd, buf, n)` blocks; the PCB state changes to blocked and is moved to the I/O wait queue.  
Formal statement:  
$$ \text{PCB}.\text{state} \leftarrow \text{blocked} \quad \text{iff process awaits external event} $$  
> [!WARNING] Confusing blocked with ready causes busy-waiting and wastes CPU cycles.

### Step 5 — Wake-up returns the process to ready
When the awaited event completes (DMA done, signal arrives), the PCB is moved back to ready.  
Example: disk interrupt handler finds the waiting PCB and calls `wakeup(PCB)`.  
Formal statement:  
$$ \text{blockedQueue}.\text{remove}(\text{PCB});\quad \text{readyQueue}.\text{enqueue}(\text{PCB});\quad \text{PCB}.\text{state} \leftarrow \text{ready} $$  
> [!WARNING] Failing to remove the PCB from the blocked queue creates duplicate entries and nondeterministic scheduling.

### Step 6 — Termination releases all resources
A process that executes exit() or receives a fatal signal transitions to terminated; its PCB is eventually reclaimed.  
Example: `return 0;` in main triggers `do_exit`; state becomes terminated and the PCB is marked for deletion after parent reaps it.  
Formal statement:  
$$ \text{PCB}.\text{state} \leftarrow \text{terminated};\quad \text{release}(\text{PCB}.\text{addressSpace}) $$  
The textbook definition follows directly from these six transitions.

## 5. Worked examples — every step shown

**Example 1 — Simple creation**  
*Given:* Shell issues execve("/bin/ls").  
*Find:* Initial PCB state.  
1. Kernel allocates PCB → state = new (Why: definition of creation).  
2. Address space mapped → state remains new.  
3. Enqueued → state = ready.  
**ready**  
*Reflection:* The new state is instantaneous; most diagrams omit it because it is never scheduled.

**Example 2 — Blocking read**  
*Given:* Running process calls read on empty pipe.  
*Find:* State sequence.  
1. System call traps → kernel saves registers into PCB.  
2. No data present → state = blocked.  
3. Process removed from CPU.  
**blocked**  
*Reflection:* The PCB now holds the saved registers; the CPU is free for another process.

**Example 3 — Interrupt wake-up**  
*Given:* Disk DMA completes for the blocked process.  
*Find:* New state.  
1. Interrupt handler locates PCB on blocked queue.  
2. Moves PCB to ready queue.  
3. State = ready.  
**ready**  
*Reflection:* Wake-up never places a process directly into running; that decision belongs to the scheduler.

**Example 4 — Parent reaps child**  
*Given:* Child has terminated; parent calls waitpid.  
*Find:* Final PCB fate.  
1. Child state already terminated.  
2. Parent collects exit status.  
3. Kernel frees PCB and PID.  
**PCB deallocated**  
*Reflection:* Termination is distinct from deallocation; zombie processes exist precisely because these two steps can be separated.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Believing “running” means “on CPU” forever | Confuses logical state with physical core   | Remember state is a software label; hardware may be interrupted at any moment |
| Marking a process blocked while it still holds the CPU | Forgetting that block decision is made inside the kernel | Trace every blocking call through the system-call path |
| Reusing a PID before the PCB is freed | Race between termination and reaping        | Implement proper wait() semantics            |
| Assuming ready queue is FIFO      | Modern schedulers are priority-based        | Inspect the actual scheduler (CFS, O(1), etc.) |
| Storing only the program counter in the PCB | Omits register file, page table base, open files | Enumerate every piece of context the hardware uses |
| Treating terminated as “still exists” | Zombie processes remain visible to parent   | Distinguish state terminated from PCB deallocation |
| Allowing user code to read another process’s PCB | Missing kernel-mode check                   | Verify every PCB access occurs only in kernel mode |

## 7. The textbook-precise statement
A process is an instance of a program in execution. Its complete execution context is recorded in a process control block (PCB) whose state field takes one of the values {new, ready, running, blocked, terminated}. The PCB contains at minimum: process identifier, parent identifier, program counter, CPU registers, memory-management information, list of open files, and accounting data. State transitions are performed exclusively by the kernel and obey the transition rules given in Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §3.2–3.3.

## 8. Visual — diagram or schematic
```text
                  new
                   │
                   ▼
                ready ◄────────────── blocked
                 │  ▲                    ▲
                 │  │                    │
                 ▼  │                    │
               running ──────────────────┘
                 │
                 ▼
             terminated
```
Label key: solid arrows are allowed transitions; the scheduler alone decides ready → running; external events decide blocked → ready; exit decides any state → terminated.

## 9. The memory technique
1. **The hook** — Picture five runners on a track: one just entered the stadium (new), one waiting at the starting line (ready), one sprinting (running), one sitting on the bench catching breath (blocked), and one who finished and left (terminated).  
2. **What to overlearn** — The five state names in order and the fact that only the kernel writes the PCB state field.  
3. **Spaced-repetition schedule** — Review the diagram at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “Where must the next instruction come from after a context switch?” → registers saved in PCB; “Why can it not execute now?” → state = blocked or ready.

## 10. What this unlocks
Process states and the PCB are the foundation for CPU scheduling, inter-process communication, virtual memory, and deadlock detection.  
- Multilevel feedback queue schedulers examine the ready state.  
- Semaphores and condition variables manipulate the blocked state.  
- Copy-on-write fork duplicates PCBs while sharing address spaces.  
- Thread libraries extend the same state model to lightweight entities inside a single PCB.

## 11. Self-check — five questions, no answers
1. A process issues a non-blocking I/O request that immediately returns EAGAIN. Which state transition, if any, occurs?  
2. Two processes simultaneously attempt to write the same PCB field. Which protection mechanism prevents corruption?  
3. Draw the state diagram and label every arrow with the entity (scheduler, interrupt handler, exit syscall) that may fire it.  
4. Why can a terminated process still occupy memory even though its state says it will never run again?  
5. In a system with only one CPU, is it possible for two PCBs to be marked running at the same instant? Under what precise condition would this constitute a kernel bug?