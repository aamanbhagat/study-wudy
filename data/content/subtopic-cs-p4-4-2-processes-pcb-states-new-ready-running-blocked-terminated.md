## What it is
A **process** is an instance of a computer program that is being executed. The operating system (OS) manages all processes using a data structure called the **Process Control Block (PCB)**, which stores the process's state and context. The primary states a process can be in are: New, Ready, Running, Blocked (or Waiting), and Terminated.

## Why it matters
This is the fundamental abstraction for concurrency in all modern computing. In aerospace, a flight control computer runs dozens of concurrent processes for navigation, sensor data fusion, and actuator control; the OS must schedule them precisely to meet hard real-time deadlines. In machine learning, data loading, preprocessing, and model training can be separate processes, where the data loader might be *blocked* on disk I/O while the trainer is *running* on the GPU, maximizing hardware utilization.

## When to study it
You should understand basic computer architecture: the roles of the CPU, memory (RAM), and CPU registers (especially the Program Counter and Stack Pointer). You should also be familiar with basic data structures, specifically C-style `structs` or records, as the PCB is simply a kernel-level `struct`. Without this foundation, the purpose of saving register values in a PCB will be unclear.

## How to study it (step by step)
1.  **Program vs. Process Distinction:** Write down a formal definition for "program" (a passive set of instructions on disk, e.g., `a.out`) and "process" (an active entity with a program counter, memory space, etc.). Create an analogy; a common one is a recipe (program) versus the act of cooking (process).
2.  **Deconstruct the PCB:** Find a diagram of a standard PCB online (e.g., for Linux's `task_struct`). List its key fields: Process ID, State, Program Counter, CPU Registers, Memory Limits, Open Files. For each field, write one sentence explaining *why* the OS needs to save this specific piece of information.
3.  **Draw the State Diagram:** Close your book and draw the five-state process model from memory. Use boxes for states (New, Ready, Running, Blocked, Terminated) and arrows for transitions. Label each arrow with the event that causes the transition (e.g., "Scheduler dispatch," "I/O request").
4.  **Trace a Process:** Imagine a simple program: `read_data()`, `compute()`, `write_results()`. Write down the sequence of states it would go through, and the event that triggers each transition. For example: New -> Ready (Admitted) -> Running (Scheduled) -> Blocked (I/O request for `read_data`) -> Ready (I/O complete) -> ...
5.  **Code it (Optional but recommended):** In C, use the `fork()` system call to create a new process. Use a command like `ps -p <PID> -o state,command` in your terminal to observe the state of the parent and child processes. Notice how they are both in a 'Running' or 'Sleeping' (a form of Blocked) state.

## Key ideas, with intuition
1.  **The PCB is the Process's "Save File".** Imagine you're playing a video game and need to stop. You hit "Save." The game saves your character's position, inventory, and current quest status to a file. The PCB is exactly that for a process. When the OS decides to stop one process (e.g., its time slice is up) and run another, it saves all of the first process's context (CPU register values, program counter, etc.) into its PCB. This allows the process to be paused and resumed later without any loss of information, as if it had never been interrupted.

2.  **States are Queues.** The OS doesn't just think about one process's state; it manages queues of processes in the same state. There is a "Ready Queue" containing the PCBs of all processes that are ready to run. There might be multiple "Blocked Queues," one for each event processes are waiting on (e.g., one queue for processes waiting on disk I/O, another for network I/O). The scheduler's main job is to pick a process from the Ready Queue to move to the CPU.

3.  **Ready vs. Blocked is the Crucial Distinction.** This is the most common point of confusion.
    *   A process is in the **Ready** state if it has everything it needs to proceed *except* the CPU. It is waiting for its turn on the processor.
    *   A process is in the **Blocked** state if it is waiting for some external event to occur (like a disk read to complete or a network packet to arrive). Even if the CPU were free, a blocked process could not run because it is missing something else it requires.
    Let $P$ be a process. Let $R_{CPU}$ be the CPU resource and $R_{ext}$ be some external resource (e.g., I/O).
    $$
    \text{State}(P) = \begin{cases}
    \text{Running} & \text{if } P \text{ has } R_{CPU} \\
    \text{Ready} & \text{if } P \text{ wants } R_{CPU} \text{ and has all } R_{ext} \\
    \text{Blocked} & \text{if } P \text{ wants } R_{ext}
    \end{cases}
    $$

## Worked example
Let's trace a process `P` that executes a program to calculate the average of numbers from a file `data.txt` and print the result. The system has one CPU.

1.  **Start:** The user executes the program. The OS creates process `P`.
    *   **State:** New -> Ready
    *   **Reason:** The OS has created a PCB for `P` and loaded its code into memory. It is now admitted into the pool of runnable processes and placed in the Ready Queue.

2.  **Scheduler Dispatch:** The OS scheduler decides it's `P`'s turn.
    *   **State:** Ready -> Running
    *   **Reason:** The scheduler selects `P` from the Ready Queue, loads its context from the PCB into the CPU registers, and sets the Program Counter to `P`'s next instruction.

3.  **I/O Request:** The first instruction in `P` is to read `data.txt`. `P` makes a system call to the OS to read the file.
    *   **State:** Running -> Blocked
    *   **Reason:** Reading from a disk is slow. `P` cannot proceed until the data is available. The OS moves `P` to a Blocked Queue associated with disk I/O and schedules another process from the Ready Queue to run on the CPU.

4.  **I/O Completion:** The disk controller finishes reading the file and signals the CPU with an interrupt. The OS handles the interrupt.
    *   **State:** Blocked -> Ready
    *   **Reason:** The event `P` was waiting for has occurred. `P` now has the data it needs and can proceed, but it must wait for the CPU to become available again. The OS moves `P`'s PCB from the Blocked Queue to the Ready Queue.

5.  **Scheduler Dispatch:** Eventually, the scheduler picks `P` again.
    *   **State:** Ready -> Running
    *   **Reason:** Same as step 2. `P` resumes execution, now performing the calculation of the average on the data it has in memory.

6.  **Termination:** `P` finishes its calculation, prints the result, and executes an `exit` system call.
    *   **State:** Running -> Terminated
    *   **Reason:** The process has completed its task. The OS will now deallocate all resources held by `P` (memory, files, etc.) and remove its PCB.

**Reflection:** Each state transition was triggered by a specific, well-defined event: admission by the OS, a scheduler decision, a process's own request for I/O, an external hardware interrupt, or the process's completion. The PCB was essential at each step to save and restore the process's context.

## Diagrams
Here is the canonical five-state process model.

```text
               +-----------------+
               |       New       |
               +-----------------+
                       |
                       | Admitted
                       V
+----------------+<--+-----------------+<--+
|     Ready      |   |     Running     |   | Scheduler Dispatch
+----------------+-->+-----------------+-->+
       ^             |           |         | Timeout / Interrupt
       |             | I/O or    |         |
       |             | Event     |         |
       | I/O or      | Wait      | Exit    |
       | Event       V           V         V
       | Completion +-----------------+   +-----------------+
       +----------- |     Blocked     |   |   Terminated    |
                    +-----------------+   +-----------------+
```

## Memory technique — remember this forever
1.  **The Restaurant Analogy:**
    *   **Process:** A customer ordering a meal.
    *   **OS:** The restaurant manager.
    *   **PCB:** The manager's clipboard for that customer, tracking their order, what course they're on, any allergies, etc.
    *   **New:** A customer arrives and waits to be seated.
    *   **Ready:** The customer is seated at a table with a menu, ready to order, but waiting for the waiter (the CPU). There can be many ready customers.
    *   **Running:** The waiter (CPU) is at the table, taking the order. Only one customer per waiter at a time.
    *   **Blocked:** The customer has ordered and is waiting for their food to be cooked (I/O operation). They can't do anything else until the food arrives. They are not waiting for the waiter (CPU).
    *   **Terminated:** The customer has paid the bill and left.

2.  **Must-Memorize Facts:**
    *   **Process Definition:** A program in execution.
    *   **PCB Definition:** The data structure used by the OS to manage a process.
    *   **The State Diagram:** You must be able to draw the 5-state diagram with all transitions and labels from scratch.

3.  **Spaced Repetition:** Review the state diagram and the restaurant analogy at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, draw the diagram from pure memory before checking your work.

4.  **First Principles Derivation:** If you forget the states, rebuild them logically. A process must be created (**New**) and must end (**Terminated**). To do work, it needs the CPU (**Running**). If the CPU is busy, but the process is able to work, it must be waiting for the CPU (**Ready**). If it's waiting for something else (like a file), it can't use the CPU even if it were free, so it must be in a different waiting state (**Blocked**). These five states are the logical consequences of managing a resource (CPU) and handling external events.

## Common mistakes
1.  **Confusing Ready and Blocked:** The most common error. A process in the Ready state is waiting *only* for the CPU. A process in the Blocked state is waiting for something else entirely (e.g., I/O, a timer, a network packet). A blocked process is *not* a candidate for scheduling.
2.  **Thinking the Scheduler moves processes from Blocked to Running:** The scheduler only ever moves processes from Ready to Running. An external event (like an I/O interrupt) moves a process from Blocked to Ready. The scheduler then decides when (or if) to run it.
3.  **Assuming 1 Process = 1 Core:** On a single-core CPU, only one process is ever in the Running state at any given microsecond. The OS creates the illusion of parallelism by switching between processes in the Ready queue extremely quickly (this is called context switching). On a multi-core system, you can have N processes in the Running state, where N is the number of cores.

## Self-check
1.  What is the key difference between the information stored in a program on disk and the information stored in its corresponding process's PCB?
2.  A process makes a system call to read from the network. Immediately after the call is made, what state transition occurs? What event will cause the next transition, and what state will it transition to?
3.  Consider a system with a single CPU. Is it possible to have 10 processes in the Ready queue and 10 processes in the Blocked queue simultaneously? Is it possible to have 10 processes in the Running state simultaneously? Explain your reasoning for each case.