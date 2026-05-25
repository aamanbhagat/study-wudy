## What it is
Thread synchronization is the coordination of multiple threads to ensure they safely access shared resources, like a block of memory. The need arises because if multiple threads modify the same memory location concurrently without coordination, the final result can be incorrect due to the unpredictable order of their operations—a problem known as a **race condition**.

## Why it matters
This is not an academic corner case; it is a fundamental challenge in all parallel computing.
*   **Aerospace:** In a flight control system, one thread might read sensor data (e.g., airspeed) while another adjusts control surfaces. If the control thread reads a partially updated, nonsensical value (a "torn read"), the result could be catastrophic.
*   **Physics & ML:** In large-scale simulations or neural network training, multiple threads update a shared state (e.g., particle positions in an N-body simulation, or weight matrices in a model). A race condition leads to corrupted data, invalidating the entire computation, wasting millions of CPU-hours.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
1.  **Processes vs. Threads:** You must understand that threads within a single process share the same memory space (heap, global variables), whereas processes have isolated memory.
2.  **CPU Scheduling:** You need to know that a thread can be preempted by the operating system scheduler at *any time*, between any two machine instructions.
3.  **Compilation & Assembly:** You must understand that a single line of high-level code (e.g., `x = x + 1;`) is not a single, indivisible CPU operation. It compiles down to multiple machine instructions (e.g., load, increment, store).

## How to study it (step by step)
1.  **Write a broken program.** In a language like C or Python, create a global variable `counter = 0`. Start two threads. Have each thread run a loop that increments `counter` 1,000,000 times. Print the final value of `counter`. You'll expect 2,000,000, but you will almost certainly get a different, smaller number. This makes the problem tangible.
2.  **Disassemble the critical instruction.** Use a compiler explorer tool (like `godbolt.org`) or a local disassembler (`objdump` on Linux) on the code `counter++`. You will see it translates to three key machine instructions:
    *   `mov rax, [counter]` (Load the value from memory into a register)
    *   `inc rax` (Increment the value in the register)
    *   `mov [counter], rax` (Store the new value from the register back to memory)
3.  **Trace the race.** On paper, create two columns, one for Thread 1 (T1) and one for Thread 2 (T2). Assume `counter` starts at 0. Manually trace the machine instructions from step 2, but force a context switch at the worst possible moment: after T1 loads the value but before it stores it. This will reveal exactly how an update is "lost."
4.  **Define the "Critical Section".** The critical section is the block of code that accesses the shared resource. In our example, it's the single line `counter++`. The core problem is ensuring that only one thread can be executing inside its critical section at any given time. This property is called **mutual exclusion**.
5.  **Define the requirements for a solution.** A correct synchronization mechanism must satisfy three properties:
    *   **Mutual Exclusion:** If one thread is in its critical section, no other threads can be in their critical sections.
    *   **Progress:** If no thread is in its critical section and some threads want to enter, only those threads not in their remainder sections can participate in the decision of which will enter next, and this selection cannot be postponed indefinitely.
    *   **Bounded Waiting:** There must be a limit on the number of times other threads are allowed to enter their critical sections after a thread has made a request to enter its critical section and before that request is granted. This prevents starvation.

## Key ideas, with intuition
1.  **Race Condition:** The final state of the shared memory depends on the unpredictable, non-deterministic timing of thread execution. The threads are "racing" to access the memory. Your goal is to eliminate this non-determinism for critical sections.
2.  **Atomicity:** An operation is **atomic** if it completes entirely or not at all, appearing as a single, indivisible instruction to the rest of the system. `counter++` is not atomic at the hardware level. Synchronization primitives (like mutexes, which you'll learn about next) are tools to create *logical* atomicity for a block of code.
3.  **The Read-Modify-Write Pattern:** This is the most common source of race conditions. A thread reads a value from shared memory, modifies it in a CPU register (which is private to the thread), and then writes it back. The problem is the time gap between the read and the write, where another thread can intervene.
    $$
    \text{T1 Reads } V \rightarrow \text{T1 Modifies } V \text{ to } V' \rightarrow (\text{Context Switch! T2 does its own R-M-W}) \rightarrow \text{T1 Writes } V'
    $$
    If T2 executes fully in that gap, T1's write will be based on stale data, overwriting T2's work.

## Worked example
**Problem:** Two threads, T1 and T2, execute the operation `balance--` on a shared integer `balance` initialized to 100. The expected final value is 98. Show a specific interleaving of machine instructions that results in a final value of 99.

**Solution:**

First, we represent `balance--` as a sequence of three machine-level operations:
*   `LOAD reg, balance`
*   `DEC reg`
*   `STORE reg, balance`

Now, let's trace an execution where `reg1` is T1's register and `reg2` is T2's register.

| Step | Thread 1 (T1) Execution         | Thread 2 (T2) Execution         | `balance` (memory) | `reg1` | `reg2` |
| :--- | :------------------------------ | :------------------------------ | :----------------- | :----- | :----- |
| 1    | `LOAD reg1, balance`            |                                 | 100                | 100    | ?      |
| 2    |                                 | `LOAD reg2, balance`            | 100                | 100    | 100    |
| 3    |                                 | `DEC reg2`                      | 100                | 100    | 99     |
| 4    |                                 | `STORE reg2, balance`           | 99                 | 100    | 99     |
| 5    | `DEC reg1`                      |                                 | 99                 | 99     | 99     |
| 6    | `STORE reg1, balance`           |                                 | 99                 | 99     | 99     |

**Reflection:**
*   Step 1: T1 loads the value 100 into its private register.
*   Step 2: Before T1 can do anything else, the OS scheduler preempts it and runs T2. T2 also loads the value 100 from memory. At this point, both threads are working with the same stale data.
*   Steps 3-4: T2 decrements its local copy to 99 and successfully stores it back into memory. `balance` is now 99.
*   Steps 5-6: The OS switches back to T1. T1 was interrupted after its `LOAD`, so it now continues from there. It decrements its register value (which is still 100) to 99 and stores that back to memory. This final store overwrites the correct value with an incorrect one. One decrement operation was completely lost.

## Diagrams

A timeline view of the worked example:
```text
      Thread 1                     Thread 2                   Shared Memory
         |                            |                         balance = 100
         |                            |
LOAD reg1, balance  (reg1=100)        |
         |                            |
         +--- CONTEXT SWITCH -------->|
         |                            |
         |                      LOAD reg2, balance  (reg2=100)
         |                            |
         |                      DEC reg2            (reg2=99)
         |                            |
         |                      STORE reg2, balance
         |                            |                         balance = 99
         |<--- CONTEXT SWITCH --------+
         |                            |
DEC reg1            (reg1=99)         |
         |                            |
STORE reg1, balance                   |
         |                            |                         balance = 99
         V                            V
```

Memory model for two threads in one process:
```text
+-------------------------------------------------+
| Process Memory Space                            |
|                                                 |
|   +-----------------------------------------+   |
|   |          Shared Memory (Heap)           |   |
|   |                                         |   |
|   |         int balance = 100;              |   |
|   +-----------------------------------------+   |
|                                                 |
|   +-----------------+   +-----------------+     |
|   | Thread 1 Stack  |   | Thread 2 Stack  |     |
|   | (local vars)    |   | (local vars)    |     |
|   +-----------------+   +-----------------+     |
|                                                 |
|   [ CPU Registers T1 ]    [ CPU Registers T2 ]  | <--- Private to each thread
+-------------------------------------------------+
```

## Memory technique — remember this forever
1.  **Analogy:** The "Two People Editing One Google Doc" story. You and a collaborator are both told to "delete the last sentence." You both highlight the same last sentence and press delete. The document server receives two "delete" commands for the same text. The result is correct. Now, imagine you are told to "add your name at the end." You read the document, type your name at the end of what you see, and save. Your collaborator does the same thing *at the same time*. Whoever saves last overwrites the other's work. The first case (delete) is often an atomic operation on the server; the second (read, append, write) is not. **Your job is to put a lock on the document before you start typing.**
2.  **Must-know fact:**
    *   **The Problem:** A high-level instruction like `x++` is not atomic. It is a `read-modify-write` sequence.
    *   **The Cause:** A context switch can occur between the `read` and the `write`, leading to a race condition.
3.  **Spaced Repetition Schedule:** Review this entire lesson at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days
4.  **First Principles Pathway:** If you forget everything, rebuild it from here:
    *   A process has multiple threads.
    *   Threads share memory.
    *   The OS scheduler can pause a thread at any time.
    *   A single line of C code is multiple machine instructions.
    *   Therefore, a thread can be paused *in the middle* of a C statement.
    *   Trace the `LOAD`, `INC`, `STORE` sequence with a context switch in the middle. The error will become obvious.

## Common mistakes
1.  **The `x++` Fallacy:** Assuming that simple-looking operations are atomic. They are not unless the hardware or language explicitly guarantees it. Always assume non-atomicity.
2.  **Ignoring "Heisenbugs":** Thinking a race condition is fixed because you can't reproduce it. Race conditions are timing-dependent. Adding `printf` statements to debug can change the timing and make the bug disappear, only for it to reappear later.
3.  **Thinking Reads are Safe:** Assuming only writes need protection. If a writer thread is updating a multi-byte structure (e.g., a 64-bit number on a 32-bit machine), a reader thread could be context-switched in after the first 32 bits are written but before the second. The reader sees a "torn read"—a garbage value that is half old, half new.
4.  **Protecting the Wrong Thing:** Incorrectly identifying the critical section. Forgetting to protect one access to a shared variable, or protecting a variable that is actually local to the thread (which is harmless but hurts performance).

## Self-check
1.  A program uses two threads to process a queue. Thread 1 adds items (`enqueue`) and Thread 2 removes them (`dequeue`). The queue is implemented with an array and a shared integer variable `count` representing the number of items. Identify the shared resource(s) and the critical section(s) in the `enqueue` and `dequeue` functions.
2.  Consider two threads executing concurrently on shared variables `x` and `y`, both initialized to 0.
    *   Thread 1: `x = 1; y = x + 1;`
    *   Thread 2: `y = 1; x = y + 1;`
    What are all the possible final pairs of values for `(x, y)`? Explain the interleaving that leads to each outcome.
3.  A banking application has a `transfer` function that moves money from account A to account B. It is implemented as `A.balance -= amount; B.balance += amount;`. Another thread is responsible for calculating the total assets of the bank by summing the balances of all accounts. Explain how a race condition could cause the asset-calculating thread to report an incorrect total. What is the critical section here?