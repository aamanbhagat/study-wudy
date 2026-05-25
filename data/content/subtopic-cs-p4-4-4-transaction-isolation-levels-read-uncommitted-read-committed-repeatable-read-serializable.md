## What it is
Transaction isolation levels are rules that define the degree to which one transaction must be isolated from the data modifications made by other, concurrently running transactions. They are a fundamental concept in database concurrency control, managing the trade-off between data consistency and system performance. Essentially, they dictate what a transaction can "see" of other transactions' work-in-progress.

## Why it matters
In aerospace, a flight control system's database cannot tolerate inconsistent data; a sensor reading being updated by one process must be read consistently by another, making `SERIALIZABLE` isolation critical. In machine learning, training a model on a live database requires at least `REPEATABLE READ` to ensure the training data snapshot is stable throughout the epoch, preventing the model from learning from transient, inconsistent states. High-energy physics experiments generate petabytes of data analyzed by hundreds of concurrent queries; managing isolation levels prevents one physicist's analytical query from corrupting the results of another's.

## When to study it
Before tackling this, you must have a solid grasp of database transactions and the ACID properties (Atomicity, Consistency, Isolation, Durability). Specifically, you need to understand what `BEGIN TRANSACTION`, `COMMIT`, and `ROLLBACK` do. A working knowledge of basic SQL (`SELECT`, `UPDATE`, `INSERT`) is also essential to understand the examples.

## How to study it (step by step)
1.  **Define the enemy.** First, internalize the three primary concurrency "phenomena" that isolation levels are designed to prevent. Write a precise one-sentence definition for each: Dirty Read, Non-Repeatable Read, and Phantom Read.
2.  **Create the master table.** Draw a 4x3 table. The rows are the four isolation levels (from least to most strict: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`). The columns are the three phenomena. Fill in the table, marking whether each level *allows* or *prevents* each phenomenon. This table is the ground truth.
3.  **Code the phenomena.** For each phenomenon, write a minimal SQL script involving two concurrent transactions (T1, T2) that demonstrates the problem. For example, for a Dirty Read, T1 updates a row but doesn't commit. T2 reads the row. T1 then rolls back. T2 now holds data that never officially existed.
4.  **Code the solutions.** Take the scripts from step 3. Now, set the isolation level to the first level that *prevents* the phenomenon and re-run the scenario. Observe how the database's behavior changes (e.g., T2's `SELECT` statement now blocks until T1 commits).
5.  **Connect to implementation.** Research the locking mechanism your favorite database (e.g., PostgreSQL) uses for each level. For instance, `READ COMMITTED` often uses short-lived read locks, while `REPEATABLE READ` might use longer-lived locks or a snapshot-based mechanism (MVCC). This connects the abstract rule to the concrete implementation.
6.  **Analyze the trade-off.** For each level, write down the performance implication. `READ UNCOMMITTED` is fastest (fewest locks), while `SERIALIZABLE` is slowest (most locks or strict ordering). This solidifies your understanding of the consistency-vs-performance trade-off.

## Key ideas, with intuition
1.  **Isolation as a Spectrum:** The "I" in ACID, Isolation, is not a binary switch. It's a dial you can turn. The four standard levels are just well-defined points on this spectrum, each offering a different balance between consistency guarantees and the performance cost of achieving them.

2.  **The Three Read Phenomena (The Problems):**
    *   **P1: Dirty Read:** You read data from another transaction that has **not yet committed**. It's "dirty" because that transaction might `ROLLBACK`, meaning you've read data that is retroactively declared to have never existed. Think of it as reading a draft of a document that the author then deletes entirely.
    *   **P2: Non-Repeatable Read:** You read a row. Later, in the **same transaction**, you read the *exact same row* and get a different value. This happens because another transaction `UPDATE`d the row and `COMMIT`ted in between your two reads. Your read is "non-repeatable" because the data changed under your feet.
    *   **P3: Phantom Read:** You run a query with a `WHERE` clause (e.g., `SELECT COUNT(*) FROM rockets WHERE status = 'ready'`). Later, in the **same transaction**, you run the *exact same query* and get a different number of rows. This happens because another transaction `INSERT`ed a new row that matches your `WHERE` clause and `COMMIT`ted. The new row is a "phantom."

3.  **The Four Isolation Levels (The Solutions):** Think of them as increasingly strict security guards for your data.
    *   `READ UNCOMMITTED`: No guards. Anyone can see anything at any time. (Prevents nothing).
    *   `READ COMMITTED`: A guard that only lets you see doors that are fully closed and locked (`COMMIT`ted data). It prevents Dirty Reads. This is a very common default level.
    *   `REPEATABLE READ`: A stricter guard. Once you start reading, it takes a "snapshot" of the world. It ensures that any specific data you've already seen won't change for the duration of your transaction. It prevents Dirty Reads and Non-Repeatable Reads.
    *   `SERIALIZABLE`: The ultimate guard. It makes concurrent transactions behave as if they were run one after another ("serially"). It prevents all three phenomena, providing the strongest guarantee of consistency.

## Worked example
Let's demonstrate a **Non-Repeatable Read** and how `REPEATABLE READ` prevents it.
Consider a table `accounts` with `(account_id, balance)`. Account 101 has a balance of $500.

**Scenario:** We want to read the balance, do some complex processing, and then read it again to ensure it hasn't changed.

**Isolation Level: `READ COMMITTED` (the default in many DBs)**

| Time | Transaction 1 (Our Reporting Job) | Transaction 2 (ATM Withdrawal) | Data State (Account 101) |
| :--- | :--- | :--- | :--- |
| 1 | `BEGIN;` | | $500 |
| 2 | `SELECT balance FROM accounts WHERE account_id = 101;` **(Returns $500)** | | $500 |
| 3 | | `BEGIN;` | $500 |
| 4 | | `UPDATE accounts SET balance = 400 WHERE account_id = 101;` | $400 (uncommitted) |
| 5 | | `COMMIT;` | $400 (committed) |
| 6 | `SELECT balance FROM accounts WHERE account_id = 101;` **(Returns $400)** | | $400 |
| 7 | `COMMIT;` | | $400 |

**Reflection:** In step 6, T1's second read saw a different value ($400) than its first read ($500). The read was not repeatable. This happened because `READ COMMITTED` only guarantees you won't see *uncommitted* data; it makes no promises about data changing mid-transaction if another transaction commits.

**Now, let's fix it with `REPEATABLE READ`.**

| Time | Transaction 1 (Our Reporting Job) | Transaction 2 (ATM Withdrawal) | Data State (Account 101) |
| :--- | :--- | :--- | :--- |
| 1 | `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;` | | $500 |
| 2 | `BEGIN;` | | $500 |
| 3 | `SELECT balance FROM accounts WHERE account_id = 101;` **(Returns $500)** | | $500 |
| 4 | | `BEGIN;` | $500 |
| 5 | | `UPDATE accounts SET balance = 400 WHERE account_id = 101;` | (This statement will likely block until T1 finishes) |
| 6 | `SELECT balance FROM accounts WHERE account_id = 101;` **(Returns $500)** | | $500 (from T1's perspective) |
| 7 | `COMMIT;` | | (T2's UPDATE can now proceed) |

**Reflection:** T1 set its isolation level to `REPEATABLE READ`. When it first read the row in step 3, the database effectively took a snapshot or placed a long-term lock. Even though T2 committed a change, T1's view of the database remained consistent for its entire duration. The second `SELECT` in step 6 returned the same value as the first, preventing the non-repeatable read.

## Diagrams
Here is a table summarizing the relationship. This is the single most important diagram to memorize.

```text
+--------------------+-----------------+-------------------------+-----------------+
| Isolation Level    | Dirty Read (P1) | Non-Repeatable Read (P2)| Phantom Read (P3)|
+--------------------+-----------------+-------------------------+-----------------+
| READ UNCOMMITTED   | Allowed         | Allowed                 | Allowed         |
| READ COMMITTED     | PREVENTED       | Allowed                 | Allowed         |
| REPEATABLE READ    | PREVENTED       | PREVENTED               | Allowed         |
| SERIALIZABLE       | PREVENTED       | PREVENTED               | PREVENTED       |
+--------------------+-----------------+-------------------------+-----------------+
```

Timeline of a Non-Repeatable Read under `READ COMMITTED`:

```text
Transaction 1                                      Transaction 2
     |
BEGIN
     |
SELECT balance (sees $500)
     |                                             BEGIN
     |                                                  |
     |                                             UPDATE balance to $400
     |                                                  |
     |                                             COMMIT
     |
SELECT balance (sees $400) <-- Anomaly!
     |
COMMIT
     |
```

## Memory technique — remember this forever
1.  **Mnemonic:** "You **C**an't **R**epeat **S**illy **P**henomena."
    *   The order of the levels is **C**ommitted, **R**epeatable, **S**erializable. (We ignore `UNCOMMITTED` as it's rarely used).
    *   The order of phenomena they prevent is **D**irty, **N**on-repeatable, **P**hantom.
    *   Think: `READ COMMITTED` fixes the first, most obvious problem. `REPEATABLE READ` fixes the next one. `SERIALIZABLE` fixes them all.

2.  **Overlearn this fact:** The table in the Diagrams section. Burn it into your memory. It is the definitive summary of the ANSI SQL standard isolation levels.

3.  **Spaced Repetition Schedule:**
    *   Review the table and the three phenomena definitions in **1 day**.
    *   Redraw the table from memory in **3 days**.
    *   Explain the difference between a non-repeatable read and a phantom read to an imaginary colleague in **7 days**.
    *   Write the SQL for the worked example from memory in **16 days**.
    *   Explain the performance vs. consistency trade-off for all four levels in **35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild it from the phenomena.
    *   Start with the idea of two transactions, T1 and T2. What can go wrong?
    *   T2 could see T1's uncommitted work. That's a **Dirty Read**. The first fix is to only allow reading committed data -> `READ COMMITTED`.
    *   Okay, but what if T1 reads something, T2 commits a change, and T1 reads again? T1 sees inconsistent data within its own lifetime. That's a **Non-Repeatable Read**. The fix is to make sure reads are repeatable -> `REPEATABLE READ`.
    *   Okay, but what if T1 reads a *set* of rows, T2 commits an `INSERT`, and T1 reads the set again? A new "phantom" row appears. That's a **Phantom Read**. The fix is to make the whole session behave as if it's the only one -> `SERIALIZABLE`.

## Common mistakes
1.  **Confusing Non-Repeatable Reads and Phantom Reads.** A non-repeatable read is when a row you've already read is `UPDATE`d. A phantom read is when a *new row* is `INSERT`ed that matches your `WHERE` clause. One is an update, the other is an insert.
2.  **Thinking `SERIALIZABLE` is always best.** It provides the strongest guarantees, but it can cripple performance by reducing concurrency to near zero. The correct level is the *lowest* one that meets the business requirements for a given transaction.
3.  **Forgetting the default.** Different database systems have different default isolation levels (PostgreSQL and SQL Server default to `READ COMMITTED`, while MySQL's InnoDB defaults to `REPEATABLE READ`). Assuming the default is appropriate without checking can lead to subtle bugs.
4.  **Mixing up "allowed" vs. "prevented".** Students often flip the logic. Remember, the names get more restrictive as you go down the list. `REPEATABLE READ` *prevents* non-repeatable reads.

## Self-check
1.  An analytics query is calculating the average salary of all employees in 'Dept A'. While it is running, a separate transaction gives one employee in 'Dept A' a raise and commits. Under `READ COMMITTED` isolation, is it possible for the final average calculated by the analytics query to be incorrect? Why or why not?
2.  You are designing a booking system for a space shuttle with exactly 10 seats. Multiple agents book seats concurrently. A common workflow is: 1. Check the number of available seats. 2. If seats > 0, book a seat. This must be atomic. Which is the *minimum* isolation level required to prevent two agents from both seeing "1 seat left" and both successfully booking it, resulting in 11 bookings for 10 seats? Justify your choice by naming the specific read phenomenon you are preventing.
3.  Explain why `REPEATABLE READ` is insufficient to solve the booking problem in question 2. Construct a specific timeline of two transactions that demonstrates how the anomaly could still occur under `REPEATABLE READ`.