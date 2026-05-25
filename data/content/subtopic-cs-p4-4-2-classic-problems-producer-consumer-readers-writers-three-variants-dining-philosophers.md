## What it is
The "classic problems" of concurrency are a set of canonical thought experiments used to model and solve common challenges in concurrent programming. They serve as abstract blueprints for managing shared resources among multiple threads or processes, testing the correctness and efficiency of synchronization primitives like semaphores and mutexes. These problems are not just academic; they represent real-world resource allocation conflicts.

## Why it matters
These patterns appear constantly in high-performance systems. The Producer-Consumer model is the backbone of data streaming pipelines in machine learning (e.g., loading data from disk while the GPU trains) and telemetry processing in aerospace (e.g., a sensor produces data that a flight computer consumes). Readers-Writers is fundamental to database design, where many clients can read data simultaneously but writing requires exclusive access. Dining Philosophers is the classic model for deadlock, a catastrophic failure mode in any complex system, from a Mars rover's flight software to a distributed physics simulation.

## When to study it
Before tackling these problems, you must have a solid grasp of the following. If you are not confident with these, pause and review them first.
*   **Concurrency basics:** Processes vs. threads, context switching, race conditions.
*   **Critical Sections:** The concept of a code segment that accesses a shared resource and must not be concurrently executed by more than one thread.
*   **Synchronization Primitives:**
    *   **Mutexes (Mutual Exclusion locks):** How they provide exclusive access.
    *   **Semaphores:** Both binary (like a mutex) and counting semaphores. You must understand the atomic operations `wait()` (or `P`) and `signal()` (or `V`).
    *   **Condition Variables:** How they allow threads to wait for a specific condition to become true.

## How to study it (step by step)
1.  **Master the Primitives:** Write a trivial program using a mutex to protect a simple counter incremented by two threads. Then, rewrite it using a binary semaphore to solidify that they can be used for the same purpose (mutual exclusion).
2.  **Implement Producer-Consumer:** Code the bounded-buffer solution using three semaphores: one for mutual exclusion (`mutex`), one for counting empty slots (`empty`), and one for counting full slots (`full`). Start with one producer and one consumer.
3.  **Analyze Readers-Writers:** Draw a state table for the first variant (readers' preference). What happens when a writer arrives while readers are active? What happens when a reader arrives while a writer is waiting? Code this variant, paying close attention to the `read_count` variable and its protection.
4.  **Implement Writers' Preference:** Modify your Readers-Writers solution to prioritize writers. This requires additional semaphores to control access for incoming readers when a writer is waiting. This forces you to think about fairness and starvation.
5.  **Induce Deadlock:** Implement the Dining Philosophers problem naively. Create five threads (philosophers) and five mutexes (chopsticks). Have each philosopher grab their left chopstick, then their right. Run it. Observe the deadlock.
6.  **Fix Deadlock:** Implement a deadlock-free solution. The simplest is resource hierarchy: number the chopsticks 1 to 5, and enforce a rule that every philosopher must pick up the lower-numbered chopstick first. This breaks the circular wait condition required for deadlock.

## Key ideas, with intuition
1.  **Synchronization vs. Mutual Exclusion:** Mutual exclusion is about ensuring only one thread can access a resource at a time (e.g., only one writer can modify a file). Synchronization is a broader concept about coordinating the execution of multiple threads (e.g., a consumer must wait until a producer has actually produced something). The Producer-Consumer problem requires both: a mutex for the buffer access *and* semaphores to coordinate the producer and consumer.
2.  **Counting Semaphores as Resource Counters:** A counting semaphore is a powerful tool for managing a pool of `N` identical resources. In the Producer-Consumer problem, the `empty` semaphore counts the number of available slots in the buffer, and the `full` semaphore counts the number of items ready for consumption. A thread "consumes" an empty slot by calling `wait(empty)` and "produces" a full slot by calling `signal(full)`.
3.  **Starvation:** This is the key pathology explored by the Readers-Writers variants. In the readers' preference solution, a steady stream of incoming readers can cause a writer to wait indefinitely. This is called starvation. It's not deadlock (the system is still making progress—readers are reading), but it's a serious fairness problem. The writers' preference solution solves this at the cost of potentially starving readers.
4.  **Symmetry Breaking:** Deadlock often arises from symmetry. In the Dining Philosophers problem, if all philosophers execute the exact same logic ("pick up left, then right"), they can all pick up their left chopstick simultaneously and wait forever for the right one. The deadlock is broken by introducing an asymmetry. Forcing one philosopher to pick up right then left, or forcing all to pick up the lower-indexed chopstick first, breaks the circular dependency.

## Worked example
We will solve the **Producer-Consumer** problem with a bounded buffer of size $N$.

**Problem:** A producer thread generates data and places it into a shared buffer. A consumer thread removes data from the buffer and processes it. We must ensure the producer doesn't add to a full buffer and the consumer doesn't remove from an empty buffer.

**Solution using Semaphores:**

1.  **Shared Data:**
    *   A buffer (e.g., an array) of size $N$.
    *   `in`, `out` indices to track the next free slot and the next filled slot.

2.  **Synchronization Primitives:**
    *   `mutex`: A binary semaphore, initialized to 1. Provides mutual exclusion for accessing the buffer itself.
    *   `empty`: A counting semaphore, initialized to $N$. Counts the number of empty slots in the buffer.
    *   `full`: A counting semaphore, initialized to 0. Counts the number of full slots in the buffer.

**Pseudocode:**

```c
// Initialization
int buffer[N];
int in = 0, out = 0;
semaphore mutex = 1;
semaphore empty = N;
semaphore full = 0;

// Producer Thread
void producer() {
    while (true) {
        item = produce_item();      // Produce data
        wait(empty);                // 1. Wait for an empty slot
        wait(mutex);                // 2. Acquire lock for buffer access
        buffer[in] = item;          // 3. Place item in buffer
        in = (in + 1) % N;
        signal(mutex);              // 4. Release lock
        signal(full);               // 5. Signal that a slot is now full
    }
}

// Consumer Thread
void consumer() {
    while (true) {
        wait(full);                 // 1. Wait for a full slot
        wait(mutex);                // 2. Acquire lock for buffer access
        item = buffer[out];         // 3. Remove item from buffer
        out = (out + 1) % N;
        signal(mutex);              // 4. Release lock
        signal(empty);              // 5. Signal that a slot is now empty
        consume_item(item);         // Process data
    }
}
```

**Reflection on why it works:**
*   **Step 1 (Producer):** `wait(empty)` decrements the `empty` count. If it was 0, the producer blocks, preventing overflow. This is a *synchronization* step.
*   **Step 2 (Producer):** `wait(mutex)` ensures only one thread (producer or consumer) can manipulate the buffer and indices at a time. This is *mutual exclusion*.
*   **Steps 3 & 4 (Producer):** The critical section is performed, and the lock is released.
*   **Step 5 (Producer):** `signal(full)` increments the `full` count, potentially waking up a consumer that was blocked on an empty buffer. This is a *synchronization* step.
*   The consumer's logic is perfectly symmetric. `wait(full)` blocks if the buffer is empty, and `signal(empty)` wakes a waiting producer. The order of the `wait` calls is critical. If the producer called `wait(mutex)` before `wait(empty)`, it could acquire the lock, find the buffer full, and block while holding the lock, leading to deadlock because the consumer could never acquire the lock to empty the buffer.

## Diagrams
Producer-Consumer with a Bounded Buffer:

```text
               +--------------------------------------+
               |             Shared Buffer            |
               | +---+---+---+---+---+---+---+---+    |
Producer ----> | | F | F | F | E | E | E | E | E |    |----> Consumer
               | +---+---+---+---+---+---+---+---+    |
               |     ^           ^                    |
               |    out         in                    |
               +--------------------------------------+
                 |                                  |
                 V                                  V
            wait(full)                         wait(empty)
            signal(empty)                      signal(full)
```
*   `F` = Full slot, `E` = Empty slot
*   Producer adds at `in`, Consumer removes from `out`.

Dining Philosophers:

```text
              P0
          /-------\
       C0         C4
      /             \
    P4               P1
     |               |
    C3               C1
      \             /
       P3---------P2
            C2
```
*   `P` = Philosopher, `C` = Chopstick
*   Each philosopher `Pi` needs chopsticks `Ci` and `C(i+1)%5`.

## Memory technique — remember this forever
1.  **The Story:** Imagine a chaotic cafeteria.
    *   The **Producer-Consumer** is the kitchen staff (producers) putting food on a buffet line (bounded buffer) for guests (consumers). You need a bouncer (`mutex`) at the buffet line, a counter for empty plates (`empty`), and a counter for full plates (`full`).
    *   The **Readers-Writers** are a group of people at a library table with one central textbook. Many people can read it at once (readers), but if someone wants to write in it (a writer), they need exclusive access. The conflict is managing the queue to be fair to both readers and writers.
    *   The **Dining Philosophers** are five professors at a round table who only think or eat. They need two chopsticks to eat spaghetti, but there are only five chopsticks, one between each pair. This is the classic setup for resource-acquisition deadlock.

2.  **Must Overlearn:**
    *   **Producer-Consumer Semaphores:**
        *   `mutex = 1` (for mutual exclusion)
        *   `empty = N` (counts empty buffer slots)
        *   `full = 0` (counts filled buffer slots)
    *   **Deadlock Conditions (all four must hold):**
        1.  Mutual Exclusion
        2.  Hold and Wait
        3.  No Preemption
        4.  Circular Wait
    *   **Readers-Writers Core Logic:** The `read_count` variable. The first reader in locks the resource for writing; the last reader out unlocks it. All readers must increment/decrement this counter inside a mutex.

3.  **Spaced Repetition:** Review these problems and your implementations at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not just read; re-implement one of them from scratch at each interval.

4.  **First Principles Pathway:** If you forget a solution, rebuild it from the definitions. What am I trying to protect? A shared resource (`->` use a `mutex`). Are threads waiting for a condition (e.g., buffer not empty)? (`->` use a semaphore or condition variable). What value should it have? Think about what the count represents. For Dining Philosophers, list the four deadlock conditions and ask, "How can my code break one of these?" Breaking Circular Wait is usually the easiest.

## Common mistakes
1.  **Incorrect Semaphore Initialization:** Initializing `full` to $N$ and `empty` to $0$. This will cause the consumer to run first, find nothing, and block forever. Remember: `full` counts what's *in* the buffer (starts at 0), `empty` counts what's *not* (starts at N).
2.  **Wrong `wait()` Order:** In Producer-Consumer, calling `wait(mutex)` before `wait(empty)`. If the buffer is full, the producer will acquire the lock and *then* block on `empty`. Now the consumer can't get the lock to free up a space, causing deadlock. Always lock just before the critical section, not before the synchronization check.
3.  **Race Condition on `read_count`:** In Readers-Writers, failing to protect the `read_count` variable itself with a mutex. Two readers could try to increment it simultaneously (`read_count++` is not atomic), leading to an incorrect count and failure to lock/unlock the main resource correctly.
4.  **Solving Dining Philosophers by Starving Someone:** A "solution" where one philosopher is simply never allowed to eat (e.g., a central arbiter always denies their request) is not a correct solution. The goal is to be deadlock-free *and* (ideally) starvation-free.

## Self-check
1.  **Easy:** Your Producer-Consumer code works for one producer and one consumer. What, if anything, needs to change for it to work correctly with $M$ producers and $K$ consumers?
2.  **Medium:** Implement the third variant of the Readers-Writers problem, which aims to be fair and avoid starvation for both parties. One common solution involves using a queue. When a writer finishes, it can signal the next waiting thread (reader or writer) from the queue. How would you implement this?
3.  **Hard:** A proposed solution to the Dining Philosophers problem is to allow a philosopher to pick up both chopsticks simultaneously, but only if both are available (an atomic "grab-both-or-neither" operation). How could you implement this atomic operation using a mutex and condition variables? Prove that this solution is deadlock-free.