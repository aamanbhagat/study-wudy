## What it is
Locking is a concurrency control mechanism used by database management systems (DBMS) to prevent multiple transactions from interfering with each other. A shared (S) lock allows multiple transactions to read a resource concurrently, an exclusive (X) lock grants one transaction exclusive write access, and an intent lock signals the intention to acquire a finer-grained lock (like a row lock) within a coarser-grained resource (like a table).

## Why it matters
This is the fundamental mechanism that makes multi-user systems work without corrupting data. In aerospace, a flight control system might have multiple processes reading sensor data (requiring S locks) while a logging process writes flight parameters (requiring an X lock), ensuring the readers never see a half-written, invalid state. In machine learning, distributed training jobs might read from a shared feature store; locking ensures that one job doesn't read features while another is in the middle of updating them, which would corrupt the training batch and degrade model accuracy.

## When to study it
You should have a solid grasp of the ACID properties of transactions, particularly **Isolation**. You must also understand the concept of a **race condition** from operating systems or concurrent programming. Without understanding *why* concurrent access is dangerous, the solutions provided by locking will seem arbitrary.

## How to study it (step by step)
1.  **The Two-Reader Problem:** Imagine two transactions, $T_1$ and $T_2$, both needing to read the balance of an account. Is there any danger if they both read at the exact same time? Reason through this to understand why shared access is generally safe. This is the motivation for the **Shared (S) Lock**.
2.  **The Read-Write Problem:** Now, $T_1$ wants to read the balance while $T_2$ wants to deposit money (read, modify, write). Walk through the sequence of operations if they interleave. You'll see a "dirty read" or "non-repeatable read" anomaly. This motivates the **Exclusive (X) Lock**.
3.  **Build the S/X Compatibility Matrix:** Based on steps 1 and 2, create a 2x2 matrix with S and X as rows and columns. For each cell $(L_1, L_2)$, answer the question: "If transaction $T_1$ holds lock $L_1$ on a resource, can the DBMS grant lock $L_2$ on the same resource to transaction $T_2$?" Mark it Yes or No.
4.  **The Granularity Problem:** Imagine $T_1$ wants to update a single row in a 1-billion-row table. It acquires an X lock on that row. Now, $T_2$ wants to run an aggregate query that reads the *entire table*. How does the DBMS know not to grant $T_2$ a shared lock on the table, which would conflict with $T_1$'s row lock? Checking a billion row locks is infeasible. This motivates **Intent Locks**.
5.  **Define IS and IX:** Define an Intent Shared (IS) lock as "I intend to acquire S locks on descendants" and an Intent Exclusive (IX) lock as "I intend to acquire X locks on descendants". Reason about their compatibility. Can two transactions both hold IX locks on a table? Yes, as long as they plan to lock different rows.
6.  **Build the Full Matrix:** Extend your compatibility matrix to include S, X, IS, IX, and SIX (Shared with Intent Exclusive). Derive each entry from first principles based on the lock definitions. For example, to check (S, IX), ask: "Can $T_1$ hold a shared lock on the table while $T_2$ intends to get an exclusive lock on a row within it?" No, because $T_1$'s read of the whole table would conflict with $T_2$'s eventual write.

## Key ideas, with intuition
1.  **Concurrency vs. Consistency Trade-off:** The core tension. Allowing more transactions to run concurrently (high concurrency) increases the risk of data corruption (low consistency). Locks are the primary tool for dialing this trade-off: stricter locks (like X) reduce concurrency but guarantee consistency, while weaker locks (like S) improve concurrency for read-only workloads.
2.  **Lock Compatibility Matrix:** This is the formal rulebook for the lock manager. It's not arbitrary; it's derived directly from the semantics of the lock types. The central idea is that two locks, $L_1$ and $L_2$, are compatible if two transactions holding them on the same resource cannot perform actions that violate isolation.

    $$
    \text{Compatibility Matrix}
    $$

| Held \ Requested | IS | IX | S | SIX | X |
| :--- | :-: | :-: | :-: | :-: | :-: |
| **IS** | Yes | Yes | Yes | Yes | No |
| **IX** | Yes | Yes | No | No | No |
| **S** | Yes | No | Yes | No | No |
| **SIX**| Yes | No | No | No | No |
| **X** | No | No | No | No | No |

3.  **Lock Granularity Hierarchy:** Databases manage resources at different granularities: the entire database, tables, pages (blocks on disk), and rows. A lock on a higher-level object (e.g., a table) implicitly locks all its children (all its rows). This is efficient but reduces concurrency.
4.  **Intent Locks are "Signs on the Door":** An intent lock on a table doesn't actually lock the table from being read. It's a signal placed at a high level of the hierarchy to prevent catastrophic low-level conflicts efficiently. An IX lock on a table is like putting a sign on a library room door that says, "Caution: Someone inside is writing in a book." This prevents a librarian from trying to lock the whole room for cleaning (an S or X lock on the table) without having to check every single person at every desk.

## Worked example
**Scenario:** We have a table `Flights` with columns `FlightID`, `Status`.
*   **Transaction $T_1$**: Update the status of flight 101 to 'Delayed'. `UPDATE Flights SET Status = 'Delayed' WHERE FlightID = 101;`
*   **Transaction $T_2$**: Read the status of all flights. `SELECT * FROM Flights;`

**Step-by-step lock acquisition:**

1.  **$T_1$ starts:** To update a single row, $T_1$ must signal its intent at the table level first.
    *   $T_1$ requests an **Intent Exclusive (IX)** lock on the `Flights` table.
    *   Lock Manager: The table is unlocked. **Grant IX lock on `Flights` to $T_1$.**
2.  **$T_1$ proceeds:** Now $T_1$ finds the specific row for `FlightID = 101`.
    *   $T_1$ requests an **Exclusive (X)** lock on the row where `FlightID = 101`.
    *   Lock Manager: The row is unlocked. **Grant X lock on row `101` to $T_1$.**
3.  **$T_2$ starts concurrently:** $T_2$ wants to read the entire table.
    *   $T_2$ requests a **Shared (S)** lock on the `Flights` table.
    *   Lock Manager: Checks for conflicting locks on `Flights`. It sees $T_1$ holds an **IX** lock.
    *   Consulting the compatibility matrix, the entry for (Held=IX, Requested=S) is **No**.
    *   Lock Manager: **Block $T_2$.** $T_2$ must wait.
4.  **$T_1$ finishes:** $T_1$ performs the update and commits.
    *   Upon commit, $T_1$ releases all its locks: the **X** lock on row `101` and the **IX** lock on table `Flights`.
5.  **$T_2$ resumes:** The Lock Manager sees that the conflicting IX lock on `Flights` is gone.
    *   Lock Manager: **Grant S lock on `Flights` to $T_2$.**
    *   $T_2$ can now execute its `SELECT` query and is guaranteed to see the new 'Delayed' status for flight 101.

**Reflection:** The intent lock (IX) on the table placed by $T_1$ was crucial. It acted as a high-level signal that prevented $T_2$ from acquiring a table-level shared lock, which would have conflicted with $T_1$'s row-level write, all without the lock manager needing to scan every row for locks.

## Diagrams
**Lock Granularity Hierarchy**
```text
      Database
          |
      +---+---+
      |       |
    Table A  Table B
      |
    +---+---+
    |       |
  Page 1   Page 2
    |
  +---+---+
  |       |
Row 1   Row 2
```

**Lock Compatibility Matrix (Simplified S/X)**
```text
            T2 Requests
            +-------+-------+
            |   S   |   X   |
+-------+---+-------+-------+
| T1    | S |  Yes  |  No   |
| Holds +---+-------+-------+
|       | X |  No   |  No   |
+-------+---+-------+-------+
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** The **"Office Building Analogy"**.
    *   The building is the **Database**. Floors are **Tables**. Offices are **Rows**.
    *   **Shared Lock (S):** You want to read a report in an office. You put a "Reading" sign on the office door. Multiple people can put "Reading" signs and be inside together.
    *   **Exclusive Lock (X):** You need to re-organize an office. You put a "Do Not Enter - Re-organizing" sign on the door. Nobody else can enter for any reason.
    *   **Intent Lock (IS/IX):** Before going to an office, you go to the **Floor Directory** in the lobby.
        *   **IS Lock:** You put a sticky note by the floor number saying, "Someone is just reading on this floor." This lets the janitor know not to lock the whole floor for waxing (a table X lock).
        *   **IX Lock:** You put a sticky note saying, "Someone is re-organizing an office on this floor." This also stops the janitor, but it's a stronger warning.
    *   The key is: you check the **Floor Directory (table locks)** before you take the elevator. It's much faster than walking the whole floor and checking every office door (row locks).

2.  **Must-Overlearn Facts:**
    *   **S (Shared):** Multiple readers allowed.
    *   **X (Exclusive):** One writer allowed, no readers.
    *   **Intent Locks (IS/IX):** Signal intent on an ancestor *before* locking a descendant. They only conflict with coarse-grained locks (S/X) on that ancestor, not with other intent locks.

3.  **Spaced Repetition Schedule:** Review the compatibility matrix and the office analogy at: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, try to re-draw the matrix from memory before checking.

4.  **First Principles Pathway:** If you forget the compatibility matrix, re-derive it. For any pair of locks $(L_{held}, L_{req})$, ask: "Can the actions permitted by $L_{held}$ on a resource (or its children) peacefully coexist with the actions permitted by $L_{req}$ on that same resource (or its children)?"
    *   Example: Why is (Held=S, Requested=IX) a conflict?
    *   $T_1$ holds an S lock on the table. This means $T_1$ can read *any* row in the table at any time.
    *   $T_2$ requests an IX lock on the table. This means $T_2$ wants to acquire an X lock on some row *within* the table later.
    *   If we grant the IX lock, $T_2$ might then lock and modify a row. But $T_1$ assumes it can read the whole table consistently. This is a conflict. Therefore, the request must be denied.

## Common mistakes
1.  **Confusing IS/IX with S/X.** An IS lock on a table does *not* mean the transaction can read the table. It only means the transaction *intends* to acquire S locks on rows *within* the table.
2.  **Thinking IX and IX conflict.** Two transactions can both hold IX locks on the same table. This just means both intend to modify rows within that table. As long as they target different rows, there is no conflict.
3.  **Ignoring lock escalation.** In many systems, if a single transaction acquires too many fine-grained locks (e.g., thousands of row locks), the DBMS will automatically "escalate" them to a single coarse-grained lock (e.g., one table lock) to save memory. This is a performance trade-off that can cause unexpected blocking.
4.  **Forgetting locks apply to one resource.** The compatibility matrix is always about two transactions requesting locks on the *exact same resource*. $T_1$ holding an X lock on row A has no bearing on $T_2$ requesting an X lock on row B.

## Self-check
1.  Transaction $T_1$ holds a shared (S) lock on a row. Can transaction $T_2$ acquire a shared (S) lock on that same row? Can it acquire an exclusive (X) lock?
2.  Transaction $T_1$ wants to count the number of rows in the `Employees` table. Transaction $T_2$ wants to change the `LastName` of a single employee. Describe the full sequence of lock types ($S, X, IS, IX$) that $T_1$ and $T_2$ would request on the table and on the rows, and explain which transaction would be blocked and why.
3.  A transaction holds a Shared with Intent Exclusive (SIX) lock on a table. What two things does this lock signify? Based on its meaning, explain why a request for an IX lock on the same table by another transaction would be denied.