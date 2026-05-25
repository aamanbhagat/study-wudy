## What it is
Concurrency control is the mechanism a database uses to manage simultaneous operations by multiple users or processes, ensuring data integrity. Pessimistic concurrency control assumes conflicts are likely and prevents them by locking data records before a transaction accesses them. Optimistic concurrency control assumes conflicts are rare, allows transactions to proceed without locks, and checks for conflicts only at the commit stage.

## Why it matters
This is not an abstract database concept; it's fundamental to any system where multiple agents act on shared state. In aerospace, the flight control systems of a multi-engine rocket receive simultaneous telemetry from dozens of sensors; the database storing this state must handle these concurrent writes without corruption. In distributed machine learning, multiple GPUs update a shared set of model weights; choosing the right concurrency model (e.g., optimistic updates with periodic synchronization) is critical for training speed and convergence.

## When to study it
You must understand the concept of a database **transaction** and the **ACID** properties (Atomicity, Consistency, Isolation, Durability). Concurrency control is the primary mechanism for enforcing the **Isolation** property. If you cannot define what a transaction is and why isolation is necessary to prevent data anomalies like dirty reads or lost updates, review that material first.

## How to study it (step by step)
1.  **Define Conflict:** A conflict occurs when at least one of two concurrent transactions writes to the same data item. Write down the three types of conflicts: Read-Write (RW), Write-Read (WR), and Write-Write (WW). Why is Read-Read (RR) not a conflict?
2.  **Model Pessimistic Control:** Take a simple variable $X=100$. Write out the sequence of operations for two transactions, T1 and T2, that both want to subtract 10 from $X$. Use explicit `LOCK(X)` and `UNLOCK(X)` operations. Trace the execution to show how T2 is forced to wait, ensuring the final result is $X=80$.
3.  **Model Optimistic Control:** Use the same scenario as above, but now give $X$ a version number, say $X_{v}=1$. T1 reads $X=100, X_{v}=1$. T2 also reads $X=100, X_{v}=1$. T1 calculates its result and successfully commits by writing $X=90$ and incrementing the version to $X_{v}=2$. When T2 tries to commit its result, it checks if the version is still 1. It is not. The commit fails, and T2 must abort and retry.
4.  **Analyze the Trade-offs:** Create a 2x2 table. Rows: High Contention, Low Contention. Columns: Pessimistic, Optimistic. In each cell, describe the performance characteristic (e.g., "High Contention / Pessimistic: High lock overhead, but prevents costly rollbacks"). This forces you to think about the costs.
5.  **Code a Toy Example:** Implement a simple bank account object in Python. Use a thread lock to simulate pessimistic control. Then, remove the lock and add a version integer attribute to simulate optimistic control, raising an exception on a version mismatch during the "commit" (the final write). This will make the abstract concepts concrete.

## Key ideas, with intuition
1.  **The Core Problem: Lost Updates.** The fundamental issue is a race condition. If Transaction A reads a value, Transaction B reads the same value, A writes a new value, and then B writes a new value, A's update is lost.
    $$
    T_A: \text{read}(X=10) \rightarrow \text{compute}(X=10+5) \rightarrow \text{write}(X=15)
    $$
    $$
    T_B: \text{read}(X=10) \rightarrow \text{compute}(X=10-2) \rightarrow \text{write}(X=8)
    $$
    If B's write happens last, the result is $X=8$. A's addition of 5 is gone. Concurrency control exists to prevent this.

2.  **Pessimistic: "Ask for Permission."** This philosophy assumes conflict is the default. Before you touch anything, you must acquire an exclusive lock. Think of it as a talking stick in a meeting: only the person holding the stick can speak. It's safe and predictable, but if nobody else wanted to speak anyway, the process of passing the stick around was pure overhead. The cost is paid upfront, on every transaction, regardless of whether a conflict would have occurred.

3.  **Optimistic: "Ask for Forgiveness."** This philosophy assumes conflict is rare. Everyone talks at once. Before you consider your point final (commit), you quickly check if what you said is still relevant and based on the same premises as when you started. If someone else said something that invalidates your point (changed the data you read), you must retract your statement (rollback) and try again. The cost is paid only when a conflict actually happens. This is often implemented with versioning, called Optimistic Concurrency Control (OCC) or Multi-Version Concurrency Control (MVCC).

4.  **The Deciding Factor is Contention.** The choice is not about which is "better" in a vacuum, but which is better for a specific workload.
    *   **High Contention** (many transactions competing for the same data): Pessimistic wins. The cost of frequent rollbacks and retries in an optimistic system would be far greater than the upfront cost of locking.
    *   **Low Contention** (transactions mostly work on different data): Optimistic wins. Most transactions commit on the first try. Avoiding the overhead of acquiring and releasing locks for every single transaction leads to much higher throughput.

## Worked example
**Scenario:** Two users, Alice and Bob, are trying to buy the last ticket for a Mars launch, priced at $100. The `tickets` table has one row: `(ticket_id: 1, quantity: 1, version: 1)`. Alice and Bob both have sufficient funds.

**Pessimistic Approach (Two-Phase Locking):**

1.  **Alice's Transaction (T1) Starts:** `BEGIN TRANSACTION;`
2.  **T1 acquires lock:** T1 executes `SELECT * FROM tickets WHERE ticket_id = 1 FOR UPDATE;`. The database places an exclusive write lock on this row.
3.  **Bob's Transaction (T2) Starts:** `BEGIN TRANSACTION;`
4.  **T2 attempts to lock:** T2 executes `SELECT * FROM tickets WHERE ticket_id = 1 FOR UPDATE;`. It cannot acquire the lock because T1 holds it. T2's session **blocks** (waits).
5.  **T1 processes:** Alice's application sees `quantity = 1`. It proceeds with the purchase logic.
6.  **T1 commits:** T1 executes `UPDATE tickets SET quantity = 0 WHERE ticket_id = 1;` and then `COMMIT;`. The lock on the row is released.
7.  **T2 unblocks:** T2 can now acquire the lock and its `SELECT` statement completes. It reads `quantity = 0`.
8.  **T2 processes:** Bob's application sees there are no tickets left and informs him the ticket is sold out. T2 executes `ROLLBACK;`.

**Reflection:** The lock forced a serial execution for the critical section. Bob had to wait, but the data remained consistent. The "first-come, first-served" logic was correctly enforced by the locking mechanism.

**Optimistic Approach (MVCC with Versioning):**

1.  **Alice's Transaction (T1) Starts:** Her application code reads the row: `SELECT quantity, version FROM tickets WHERE ticket_id = 1;`. It receives `(quantity: 1, version: 1)`.
2.  **Bob's Transaction (T2) Starts:** His application code also reads the row: `SELECT quantity, version FROM tickets WHERE ticket_id = 1;`. It also receives `(quantity: 1, version: 1)`.
3.  **T1 processes:** Alice's application sees `quantity = 1` and proceeds. It calculates the new state.
4.  **T1 attempts to commit:** It executes `UPDATE tickets SET quantity = 0, version = 2 WHERE ticket_id = 1 AND version = 1;`. The database checks the `WHERE` clause: the current `version` is indeed 1. The update succeeds, and the database reports 1 row affected. Alice gets the ticket.
5.  **T2 processes:** Bob's application sees `quantity = 1` and also proceeds. It calculates its new state.
6.  **T2 attempts to commit:** It executes `UPDATE tickets SET quantity = 0, version = 2 WHERE ticket_id = 1 AND version = 1;`. The database checks the `WHERE` clause: the current `version` is now 2, not 1. The condition `version = 1` is false. The update fails, and the database reports 0 rows affected.
7.  **T2 handles failure:** Bob's application code sees that 0 rows were affected. It interprets this as a concurrency conflict, aborts the transaction, and informs Bob to retry.

**Reflection:** No waiting occurred. Both transactions worked in parallel. The conflict was detected at the very end using the `version` number. The `UPDATE` statement became an atomic "test-and-set" operation, which is the core of this optimistic method.

## Diagrams
Here are timelines for the two scenarios.

**Pessimistic Locking:**
```text
Time | Alice's Transaction (T1)       | Bob's Transaction (T2)         | Row State (qty)
-----+--------------------------------+--------------------------------+-----------------
  1  | BEGIN                          |                                | 1
  2  | SELECT...FOR UPDATE (lock acq) | BEGIN                          | 1 (locked by T1)
  3  | (processing...)                | SELECT...FOR UPDATE (waits...) | 1 (locked by T1)
  4  | (processing...)                | (waiting for lock...)          | 1 (locked by T1)
  5  | UPDATE tickets SET qty=0       | (waiting for lock...)          | 0 (locked by T1)
  6  | COMMIT (lock released)         |                                | 0
  7  |                                | (lock acquired, reads data)    | 0
  8  |                                | (sees qty=0, aborts)           | 0
  9  |                                | ROLLBACK                       | 0
```

**Optimistic Versioning:**
```text
Time | Alice's Transaction (T1)       | Bob's Transaction (T2)         | Row State (qty, ver)
-----+--------------------------------+--------------------------------+----------------------
  1  | BEGIN                          |                                | (1, 1)
  2  | SELECT (reads ver=1)           | BEGIN                          | (1, 1)
  3  | (processing...)                | SELECT (reads ver=1)           | (1, 1)
  4  | (processing...)                | (processing...)                | (1, 1)
  5  | UPDATE...WHERE ver=1 (success) | (processing...)                | (0, 2)
  6  | COMMIT                         | (processing...)                | (0, 2)
  7  |                                | UPDATE...WHERE ver=1 (fails)   | (0, 2)
  8  |                                | (detects failure, must retry)  | (0, 2)
  9  |                                | ROLLBACK                       | (0, 2)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Pessimistic:** A **P**aranoid **P**arking attendant. Before letting you enter a parking spot, they put cones around it (`LOCK`), force everyone else to wait, let you park (`WRITE`), and only then remove the cones (`UNLOCK`). It's slow but guarantees no collisions.
    *   **Optimistic:** A concert with **O**pen seating. Everyone rushes to grab a seat (`READ`). Just before the show starts, an usher checks tickets (`VALIDATE`). If two people claim the same seat, one is told to go find another (`ROLLBACK`). It's fast if the venue is mostly empty, chaotic if it's full.

2.  **Facts to overlearn:**
    *   Pessimistic: `LOCK -> READ -> COMPUTE -> WRITE -> UNLOCK`. **Cost is paid upfront.** Best for **high-contention** workloads.
    *   Optimistic: `READ(data, version) -> COMPUTE -> COMMIT(write data IF version is unchanged)`. **Cost is paid on conflict.** Best for **low-contention** workloads.

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (1 day).
    *   Then in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Then in 35 days.
    At each review, try to re-derive the timeline diagrams from memory.

4.  **First Principles Pathway:**
    If you forget everything, start with the "lost update" problem. How can you prevent it?
    *   **Path 1 (Prevention):** Stop the second transaction from even starting its work on the data until the first is done. This logically leads you to a mechanism that enforces waiting. That mechanism is a **lock**. This is the pessimistic path.
    *   **Path 2 (Detection):** Let them both work in parallel, but create a rule so that only one can "win" at the end. How do you detect that a conflict occurred? The data must have changed between the read and the attempted write. This leads you to needing a way to track changes. That mechanism is a **version number** or timestamp. This is the optimistic path.

## Common mistakes
1.  **Ignoring Lock Overhead:** Students assume pessimistic locking is "free" until a conflict happens. Acquiring, managing, and releasing locks consumes CPU and memory, adding latency to *every single transaction*, even uncontended ones.
2.  **Forgetting Deadlocks:** A classic trap in pessimistic systems. T1 locks resource A and waits for B. T2 locks resource B and waits for A. Both transactions will wait forever. Optimistic systems are generally immune to deadlocks (though they can suffer from "livelock" or starvation if a transaction repeatedly fails its validation).
3.  **Underestimating Rollback Cost:** In optimistic systems, a "rollback" isn't just a simple reset. If a transaction has done a significant amount of computation, aborting and re-doing all that work can be extremely expensive. This is especially true for long-running transactions.
4.  **The "One Size Fits All" Fallacy:** Choosing one strategy for an entire system without analyzing the specific workload. A high-traffic inventory table needs a different strategy than a rarely-updated user settings table.

## Self-check
1.  A social media application has a "like" button. Billions of users might "like" different posts simultaneously, but it's rare for two users to like the exact same post at the exact same millisecond. Which concurrency control strategy is more appropriate for the `likes` table, and why?
2.  Explain how a deadlock can occur using two transactions and two data rows (A and B) under a pessimistic locking scheme. How might a database system detect and resolve this situation?
3.  Imagine an optimistic system where a long, complex analytics query (T-long) runs for 30 minutes, reading a thousand records. During this time, many short transactions (T-short) each modify one of the records that T-long has read. What is likely to happen when T-long tries to commit? What is the name for this problem, and how might you mitigate it?