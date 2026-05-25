## What it is
Multi-Version Concurrency Control (MVCC) is a database mechanism for managing simultaneous access to data. Instead of using locks to prevent users from modifying data that others are reading, MVCC maintains multiple versions of data items. When a transaction starts, it's given a "snapshot" of the database at that instant, ensuring it sees a consistent view, unaffected by concurrent updates.

## Why it matters
MVCC is the core technology behind the high performance of modern databases like PostgreSQL and Oracle, which are used everywhere. In aerospace, a telemetry database for a rocket launch ingests thousands of data points per second while engineers query that same data in real-time; MVCC allows these reads and writes to happen simultaneously without blocking. In high-frequency trading or large-scale physics experiments (like at CERN), this non-blocking behavior is not just a performance boost, it's a fundamental requirement.

## When to study it
Before tackling MVCC, you must have a solid grasp of fundamental database concepts. Specifically, you need to understand:
1.  **Transactions:** The concept of an atomic, consistent, isolated, and durable (ACID) unit of work.
2.  **Concurrency Problems:** You must understand what can go wrong without concurrency control, namely lost updates, dirty reads, and non-repeatable reads.
3.  **Locking:** You should understand how basic locking mechanisms, particularly Strict Two-Phase Locking (S2PL), work to solve these problems, and critically, understand their performance limitations (e.g., readers blocking writers).

If you are not comfortable explaining these three topics from first principles, pause and review them.

## How to study it (step by step)
1.  **Revisit the problem:** Draw a timeline for two transactions, T1 (read-only) and T2 (write). Using a simple locking model (S2PL), show how T2 acquiring a write lock on a row forces T1 to wait, even if T1 only wants to read the *old* value. This is the performance bottleneck MVCC solves.
2.  **Internalize the slogan:** Repeat this until it's second nature: "In MVCC, readers don't block writers, and writers don't block readers." Ask yourself *how* this is possible. The only logical answer is that the reader must not be looking at the same piece of memory the writer is changing. This leads directly to the idea of versions.
3.  **Model a versioned row:** Imagine a database row is not just `(data)` but a tuple `(data, T_create, T_delete)`, where `T_create` is the ID of the transaction that created this version, and `T_delete` is the ID of the transaction that marked it for deletion. Initially, `T_delete` is `NULL`.
4.  **Trace a simple read/write:** Use the model from step 3. Transaction T1 (ID=100) starts. Transaction T2 (ID=101) starts, updates the row, and commits. Now, T1 goes to read the row. Which version should it see? Devise a simple "visibility rule" based on transaction IDs.
5.  **Compare and contrast:** Create a two-column table comparing S2PL and MVCC. List pros and cons for each. Consider: read/write concurrency, storage overhead, complexity of implementation, and potential for new types of anomalies.

## Key ideas, with intuition
1.  **Snapshots, Not Locks:** The foundational idea is to give each transaction a personal, unchanging view of the database. When a transaction $T_i$ begins, it is assigned a transaction ID, $T_{id_i}$. Conceptually, it takes a "snapshot" of the database at that moment. All subsequent reads by $T_i$ will be served from this snapshot, making them immune to changes from other concurrent transactions. This provides the 'I' (Isolation) in ACID.

2.  **Versioning, Not Overwriting:** To enable snapshots, the database never overwrites data in place. When a row is updated, the old version is preserved and a new version is created. Each version is tagged with information about which transaction created it and, eventually, which transaction deleted it.
    $$
    \text{UPDATE row } R \implies \text{Mark old version } R_{old} \text{ as deleted; Insert new version } R_{new}
    $$

3.  **The Visibility Rule:** This is the logic that determines what a transaction can "see". For a transaction $T_i$ to see a specific row version $V$, two conditions must be met:
    *   The transaction that created $V$, let's call it $T_{create}$, must have committed *before* $T_i$ started.
    *   The version $V$ must not have been deleted by any other transaction $T_{delete}$ that also committed *before* $T_i$ started.
    This ensures that $T_i$ only sees a consistent state from its past, never the "work-in-progress" of concurrent transactions.

4.  **Garbage Collection ("Vacuuming"):** A system that only creates new versions would run out of storage. A background process, often called a vacuum, must periodically scan the database and permanently remove old versions that are no longer visible to *any* active or future transaction. This is the cost of high concurrency.

## Worked example
Let's trace a simple bank balance update. The `accounts` table has one row for Alice with a balance of $100. Each version stores `(data, created_by_TID, deleted_by_TID)`.

**Initial State:**
*   Transaction `T0` (from long ago) created the account.
*   Row version `v1`: `(Alice, $100, T0, NULL)`

**Timeline:**
1.  `T1 (TID=10)` starts. It plans to read Alice's balance. Its snapshot is based on the database state at time `10`.
2.  `T2 (TID=11)` starts. It will deposit $50 into Alice's account.
3.  `T2 executes UPDATE`: It reads `v1`, calculates the new balance, and performs its write. The database does not overwrite `v1`.
    *   It marks `v1` as deleted by its own transaction ID: `v1` becomes `(Alice, $100, T0, 11)`.
    *   It creates a new version `v2`: `(Alice, $150, 11, NULL)`.
    *   Note: `T2` has not yet committed. These changes are pending.
4.  `T1 executes SELECT`: It needs to read Alice's balance. It applies the visibility rule from its snapshot time (`10`).
    *   It examines `v1`: `created_by_T0` (committed before `T1` started), `deleted_by_T11`. Since `T11` has not committed, the deletion is not visible to `T1`. `v1` is visible.
    *   It examines `v2`: `created_by_T11`. Since `T11` had not even started when `T1` took its snapshot, `v2` is invisible to `T1`.
    *   **Result: `T1` reads the balance as $100.**
5.  `T2 commits.` Its changes (`v1`'s deletion, `v2`'s creation) are now permanent.
6.  `T3 (TID=12)` starts and reads Alice's balance.
    *   It examines `v1`: `created_by_T0` (committed), `deleted_by_T11` (also committed, and `T11` committed before `T12` started). So, `v1` is invisible to `T3`.
    *   It examines `v2`: `created_by_T11` (committed before `T12` started), `deleted_by_NULL`. So, `v2` is visible.
    *   **Result: `T3` reads the balance as $150.**

**Reflection:** `T1` was completely isolated from `T2`'s uncommitted work. `T1`'s read did not block `T2`'s write, and `T2`'s write did not block `T1`'s read. This is the power of MVCC.

## Diagrams
Here is an ASCII diagram showing the version chain for Alice's account from the worked example. `v1` and `v2` are versions of the same logical row.

```text
Time --->
----------------------------------------------------------------------
T1 (ID=10) starts
            T2 (ID=11) starts
                        T2 writes (creates v2, marks v1 deleted)
                                    T1 reads (sees v1)
                                                T2 commits
                                                            T3 (ID=12) starts
                                                                        T3 reads (sees v2)
----------------------------------------------------------------------

Database state for Alice's account:

Initially:
v1: (Alice, $100, T0, NULL) <--- HEAD

After T2's write:
v2: (Alice, $150, 11, NULL) <--- HEAD
 |
 +---> v1: (Alice, $100, T0, 11)

T1's snapshot (at ID=10) can only see committed versions before 10. It sees v1.
T3's snapshot (at ID=12) sees all committed versions before 12. It sees v2, as v1 was deleted by the committed T11.
```

## Memory technique — remember this forever
1.  **The Story:** Think of MVCC as the **"Library of Alexandria for Data"**. When you (a transaction) enter, the librarian gives you a specific edition of the history books (your snapshot). You can read this edition peacefully. Meanwhile, other scribes (other transactions) are furiously writing new editions, but they do it on new scrolls. They never erase the text in your book. When they're done, their new edition is placed on the shelf. The next person to enter the library gets the newest, approved edition. Eventually, a janitor (the vacuum) comes and burns the very old, unread editions that nobody will ever need again.

2.  **Must Overlearn:**
    *   "Readers don't block writers, and writers don't block readers."
    *   The Visibility Rule: A transaction $T_i$ sees a row version if it was created by a transaction that **committed before $T_i$ started**, and not deleted by one that also **committed before $T_i$ started**.

3.  **Spaced Repetition Schedule:** Review this concept at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Spend 5 minutes on each review, re-deriving the worked example from memory.

4.  **First Principles Pathway:** If you forget everything, start here:
    *   Problem: We need concurrency. Locking is slow. Reads block writes.
    *   Question: How can a read happen while a write is in progress?
    *   Answer: They must be looking at different things. The reader must see the *old* data.
    *   Implication: The old data must still exist. We can't overwrite. This leads to versioning.
    *   Next Question: If there are multiple versions, which one do I read?
    *   Answer: The one that was "current" when my transaction began. This leads to snapshots and the visibility rule.

## Common mistakes
1.  **Assuming MVCC means "no locks ever":** This is false. While readers don't need locks, two transactions trying to *write* to the same row at the same time still present a conflict. A short-lived write lock is typically taken to serialize the writers and prevent a lost update on the latest version.
2.  **Forgetting Garbage Collection:** Students often grasp the versioning idea but forget that the old versions must be cleaned up. Without an efficient vacuuming/garbage collection process, an MVCC database would grow in storage indefinitely.
3.  **Equating MVCC with Serializability:** MVCC is a *mechanism* that enables an isolation level called "Snapshot Isolation". This level is not truly serializable by default; it is susceptible to subtle anomalies like "write skew". Achieving full serializability with MVCC requires additional checks (this is called Serializable Snapshot Isolation, or SSI).

## Self-check
1.  A row has a value of `42`. Transaction `T100` starts. Then, transaction `T101` starts, updates the value to `43`, and commits. Finally, `T100` reads the value. What does `T100` see and why?
2.  Consider a constraint that for two accounts, `x` and `y`, the sum `x+y` must always be non-negative. `x=50`, `y=50`. Transaction `T1` reads `x` and `y`, sees the sum is `100`, and decides to withdraw `60` from `x`. Concurrently, `T2` reads `x` and `y`, sees the sum is `100`, and decides to withdraw `60` from `y`. If both commit, what is the final state of `x` and `y`? Does this state violate the constraint? Why did a standard MVCC (Snapshot Isolation) system allow this?
3.  How does the "vacuum" process in an MVCC database decide which row versions are safe to permanently delete? What specific information must it track about active transactions?