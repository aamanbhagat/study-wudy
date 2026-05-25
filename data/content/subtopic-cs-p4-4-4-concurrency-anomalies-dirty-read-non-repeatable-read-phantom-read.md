## What it is
Concurrency anomalies are database integrity problems that occur when multiple transactions run simultaneously and their operations interleave in a way that produces an incorrect or inconsistent state. These anomalies—specifically dirty reads, non-repeatable reads, and phantom reads—represent failures of transaction isolation, where one transaction's actions improperly affect another's.

## Why it matters
In aerospace, these anomalies are catastrophic. Imagine a rocket's guidance system (Transaction 1) reading its target coordinates, while a ground control update (Transaction 2) is in progress. A **dirty read** could cause the guidance system to read a partially-written, invalid coordinate that is later rolled back, sending the vehicle off-course. In high-frequency data analysis for physics experiments like the LHC, a **phantom read** could cause a statistical analysis job to miscount the number of particle collision events meeting a certain energy threshold because another process was still inserting new event data, invalidating the entire scientific result.

## When to study it
You must have a firm grasp of the basics of relational databases and transactions first. Specifically, be comfortable with:
1.  **Basic SQL:** `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
2.  **Transaction Control Language:** `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`.
3.  **The ACID properties:** You must understand Atomicity, Consistency, Isolation, and Durability as the foundational contract of a transaction. These anomalies are direct violations of the "I" for Isolation. If you are not solid on ACID, stop and study that first.

## How to study it (step by step)
1.  **Setup:** Create a simple table in any SQL database (PostgreSQL, MySQL, etc.).
    ```sql
    CREATE TABLE inventory (
      item_id INT PRIMARY KEY,
      quantity INT
    );
    INSERT INTO inventory VALUES (101, 20);
    ```
2.  **Simulate a Dirty Read:** Open two separate terminal connections to your database, representing Transaction A (T_A) and Transaction B (T_B).
    -   In T_A: `BEGIN; UPDATE inventory SET quantity = 15 WHERE item_id = 101;` (Do NOT commit).
    -   In T_B: `BEGIN; SELECT quantity FROM inventory WHERE item_id = 101; COMMIT;` (You will see `15`).
    -   In T_A: `ROLLBACK;`
    -   Reflect: T_B read the value `15`, which never officially existed in the database. It read "dirty" data.
3.  **Simulate a Non-Repeatable Read:** Reset the table (`UPDATE inventory SET quantity = 20 WHERE item_id = 101;`).
    -   In T_A: `BEGIN; SELECT quantity FROM inventory WHERE item_id = 101;` (You see `20`).
    -   In T_B: `BEGIN; UPDATE inventory SET quantity = 10 WHERE item_id = 101; COMMIT;`
    -   In T_A: `SELECT quantity FROM inventory WHERE item_id = 101;` (Now you see `10`).
    -   Reflect: Within the same transaction (T_A), repeating the same read yielded a different result. The read was not repeatable.
4.  **Simulate a Phantom Read:**
    -   In T_A: `BEGIN; SELECT COUNT(*) FROM inventory WHERE quantity > 5;` (You see `1`).
    -   In T_B: `BEGIN; INSERT INTO inventory VALUES (102, 30); COMMIT;`
    -   In T_A: `SELECT COUNT(*) FROM inventory WHERE quantity > 5;` (Now you see `2`).
    -   Reflect: A new "phantom" row appeared that matched your query criteria, changing the result of the aggregate query.
5.  **Connect to Theory:** Read your database's documentation on SQL Isolation Levels (`READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`). For each level, identify which of the three anomalies it prevents. For example, `READ COMMITTED` prevents dirty reads but allows non-repeatable reads.

## Key ideas, with intuition
1.  **Isolation is a spectrum, not a switch.** The "I" in ACID promises that transactions won't interfere with each other. In practice, enforcing perfect isolation is slow. Most databases offer different "isolation levels" which trade perfect consistency for higher performance, allowing some anomalies to occur.
2.  **Dirty Read: Reading a rough draft.** A dirty read is consuming data from another transaction that has **not yet committed**. It's like reading a colleague's report over their shoulder while they are still typing. They might delete the entire paragraph you just read (`ROLLBACK`), and now your understanding is based on data that never officially existed.
    $$ \text{T1: Write(X)} \rightarrow \text{T2: Read(X)} \rightarrow \text{T1: Abort} $$
3.  **Non-Repeatable Read: A value changes under your feet.** You read a value from a row. Another transaction then `UPDATE`s that *exact same row* and `COMMIT`s. When you read the row again within your original transaction, the value is different. The identity of the row is the same, but its contents have changed.
    $$ \text{T1: Read(X)} \rightarrow \text{T2: Write(X)} \rightarrow \text{T2: Commit} \rightarrow \text{T1: Read(X)} \quad (\text{Value is different}) $$
4.  **Phantom Read: A row appears out of thin air.** You run a query that returns a *set of rows* based on a condition (e.g., `WHERE balance > 1000`). Another transaction then `INSERT`s a new row that satisfies your condition and `COMMIT`s. When you re-run your query, a new "phantom" row appears in the result set that wasn't there before. This is different from a non-repeatable read because it's not about a value changing, but about the *existence* of a row changing.

## Worked example
Let's model a non-repeatable read for a spacecraft's thruster calibration.

**Table:** `Thrusters`
| thruster_id | pressure_psi | status |
|-------------|--------------|--------|
| 7           | 3000         | nominal|

**Goal:** Transaction T1 runs a two-step check: first, verify pressure is nominal, then, if so, arm the thruster. Transaction T2 is a diagnostic that flags thrusters with low pressure.

**Timeline:**

1.  **T1 (Calibration):** `BEGIN TRANSACTION;`
2.  **T1 (Calibration):** `SELECT pressure_psi FROM Thrusters WHERE thruster_id = 7;`
    -   Result: `3000`. The check passes. T1 proceeds with other logic.
3.  **T2 (Diagnostic):** `BEGIN TRANSACTION;`
4.  **T2 (Diagnostic):** `UPDATE Thrusters SET pressure_psi = 2500, status = 'low_pressure' WHERE thruster_id = 7;`
5.  **T2 (Diagnostic):** `COMMIT;`
    -   The change is now permanent and visible to other transactions.
6.  **T1 (Calibration):** `...continuing logic...` Now, as a final safety check before arming, it re-reads the pressure: `SELECT pressure_psi FROM Thrusters WHERE thruster_id = 7;`
    -   Result: `2500`. The value has changed since the first read.
7.  **T1 (Calibration):** The calibration logic is now in an inconsistent state. It passed the first check with `3000` but now sees `2500`. It might abort, or worse, proceed based on the old data. `ROLLBACK;`

**Reflection:**
- **Step 2:** T1 established an initial fact: pressure is 3000.
- **Step 5:** T2 committed a change, making a new fact visible to the whole database.
- **Step 6:** T1's second read broke its consistent view of the world. The same query yielded a different result, making the read "non-repeatable". This demonstrates why a transaction needs a stable, isolated snapshot of the data to execute correctly.

## Diagrams
Here is a timeline diagram illustrating the difference between a Non-Repeatable Read and a Phantom Read. Time flows downwards.

```text
       Transaction 1                      Transaction 2
───────── NON-REPEATABLE READ (A single row's VALUE changes) ─────────
Time |
  ↓  |  BEGIN;
     |  SELECT salary FROM employees
     |  WHERE id = 42;
     |  -- Returns 50000
     |                                    BEGIN;
     |                                    UPDATE employees
     |                                    SET salary = 60000
     |                                    WHERE id = 42;
     |                                    COMMIT;
     |  SELECT salary FROM employees
     |  WHERE id = 42;
     |  -- Returns 60000. The value changed.
     |  -- This is a non-repeatable read.
     |  COMMIT;

─────────── PHANTOM READ (The SET of rows changes) ──────────────
Time |
  ↓  |  BEGIN;
     |  SELECT COUNT(*) FROM employees
     |  WHERE department = 'Sales';
     |  -- Returns 10
     |                                    BEGIN;
     |                                    INSERT INTO employees
     |                                    (id, department, salary)
     |                                    VALUES (99, 'Sales', 45000);
     |                                    COMMIT;
     |  SELECT COUNT(*) FROM employees
     |  WHERE department = 'Sales';
     |  -- Returns 11. A "phantom" row appeared.
     |  COMMIT;
```

## Memory technique — remember this forever
1.  **The Spy Analogy:** You are a spy (a transaction) inside a library (the database).
    -   **Dirty Read:** You read a page from a book that an agent is currently writing *in pencil*. After you leave, the agent erases it (`ROLLBACK`). Your intel is based on something that never officially existed. It's "dirty".
    -   **Non-Repeatable Read:** You read a page in a book. You turn around, and another agent slips in, erases a sentence, and rewrites it *in ink* (`COMMIT`). When you look back, the page's content has changed. You cannot "repeat" your first read.
    -   **Phantom Read:** You count the number of books on a shelf. You turn around, and another agent adds a new book (`COMMIT`). When you count again, your number is off. A "phantom" book has appeared.

2.  **Facts to Overlearn:**
    -   **Dirty Read:** Reading uncommitted data.
    -   **Non-Repeatable Read:** The same `SELECT` on a single row yields different values within one transaction.
    -   **Phantom Read:** A `SELECT` with a `WHERE` clause returns a different *set of rows* within one transaction.

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Actively try to regenerate the spy analogy and the ASCII diagram from memory.

4.  **First Principles Pathway:** If you forget, start from the "I" in ACID: Isolation. The goal is to pretend transactions run one-at-a-time (serially). How can this illusion be broken?
    -   Can T2 see T1's work before T1 is done? Yes -> Dirty Read.
    -   If T1 reads something, can T2 change it before T1 is done? Yes -> Non-Repeatable Read.
    -   If T1 reads a *group* of things, can T2 add to that group before T1 is done? Yes -> Phantom Read.

## Common mistakes
1.  **Confusing Non-Repeatable and Phantom Reads:** This is the most common error. Remember: Non-repeatable is about the *values* within a row changing. Phantom is about the *set of rows itself* changing. An `UPDATE` causes a non-repeatable read; an `INSERT` or `DELETE` causes a phantom read.
2.  **Thinking Anomalies Are Always Bugs:** They are not. They are a documented trade-off. Choosing a lower isolation level (e.g., `READ COMMITTED`) that allows non-repeatable reads is a conscious engineering decision to gain performance at the cost of consistency.
3.  **Ignoring the `COMMIT`:** The danger of a dirty read is realized when the first transaction `ROLLBACK`s. The danger of non-repeatable and phantom reads is realized because the second transaction `COMMIT`s its changes, making them visible. The `COMMIT` is the key action that makes the change permanent and affects other transactions.

## Self-check
1.  An airline booking system has two concurrent transactions. T1 checks if a seat is available. T2 attempts to book that same seat. Describe the sequence of operations that would constitute a non-repeatable read for T1.
2.  You are designing a system that generates a daily report of all financial transactions over $10,000. This report must be perfectly consistent as of the start of the report generation. While your report query is running, other processes are inserting new transactions into the database. Which concurrency anomaly is the primary threat to your report's accuracy, and why?
3.  The `SERIALIZABLE` isolation level prevents all three anomalies. It often does this using a technique called two-phase locking (2PL). From first principles, why would simply locking any row that is read for the entire duration of a transaction prevent both dirty reads and non-repeatable reads? How might this approach fail to prevent phantom reads, and what additional type of lock (a "predicate lock") would be needed?