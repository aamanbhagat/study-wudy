## 1. What it is — in plain English

Imagine you're working on a shared document, like a Google Doc, with several other people. Sometimes, someone types something, but then they realize it's a mistake and delete it before saving. Now, what if you were able to see that mistake *before* they deleted it? That's generally not a good thing, right? You want to see only the final, correct version.

In the world of databases, "transaction isolation levels" are like the rules for how much of other people's "unfinished work" (called "transactions") you're allowed to see while you're doing your own work. A "transaction" is just a series of database operations (like reading or writing data) that are treated as a single, indivisible unit. It either all succeeds, or it all fails and gets undone.

These rules are crucial because multiple people (or programs) often try to read and write the same pieces of data at the same time. Without proper isolation, one person's work could mess up another's, leading to incorrect results, lost updates, or even corrupted data. Isolation levels dictate how strictly a database separates the operations of concurrent transactions.

There's a spectrum of these rules, from very relaxed (you see almost everything, even mistakes) to very strict (you only see perfectly finished and correct work). Each level offers a different balance between data consistency (making sure data is always correct) and performance (how fast the database can process many tasks at once).

## 2. Why it matters — real-world applications

Transaction isolation levels are fundamental to the reliability and correctness of virtually all modern data systems. Without them, concurrent operations would quickly lead to chaos and data corruption.

1.  **Financial Systems (Banking, Stock Trading):** Imagine a bank account. If two people try to withdraw money from the same account simultaneously, or if a transfer is happening while another transaction is checking the balance, the isolation level ensures that the final balance is correct. For instance, if you're transferring $1000 from Account A to Account B, the database must ensure that either both the debit from A and the credit to B happen, or neither does. A `SERIALIZABLE` isolation level is often preferred here to ensure no anomalies, preventing scenarios like "double spending" or incorrect balance reporting, which could lead to massive financial losses and regulatory penalties.
2.  **E-commerce Platforms (Amazon, eBay):** When a customer purchases an item, the system needs to decrement the item's stock count and record the order. If multiple customers try to buy the last item at the same time, isolation levels prevent two customers from successfully buying the "last" item, leading to an oversell. `READ COMMITTED` or `REPEATABLE READ` might be used for general operations, while `SERIALIZABLE` might be employed for critical stock updates or order finalization to guarantee atomicity and consistency, especially for high-demand products.
3.  **Airline Reservation Systems (e.g., Sabre, Amadeus):** When booking a flight, a seat is temporarily reserved, and then either confirmed or released. If two agents try to book the same seat, the isolation level ensures that only one succeeds. This prevents overbooking of seats, which would cause significant customer dissatisfaction and operational headaches. A `REPEATABLE READ` or `SERIALIZABLE` level would be critical to ensure that once a seat is shown as available and selected, it remains available for that specific transaction until the booking is finalized or cancelled.
4.  **Scientific Data Processing (Large Hadron Collider data analysis, Climate Modeling):** In scenarios where multiple researchers or automated scripts are simultaneously analyzing or updating large datasets, isolation levels prevent one analysis from being skewed by incomplete or temporary changes made by another. For example, if a machine learning model is being trained on a dataset while another process is cleaning or augmenting that same data, appropriate isolation ensures the training process uses a consistent snapshot of the data, preventing the model from learning from transient, incorrect, or incomplete states. `READ COMMITTED` might be sufficient for general analysis, but `REPEATABLE READ` or `SERIALIZABLE` could be vital for ensuring the integrity of a specific training run or simulation.

## 3. Prerequisites — what you must know first

Before diving deep into transaction isolation levels, you should have a solid understanding of these fundamental database concepts:

*   **Database:** A structured collection of data, typically stored electronically in a computer system.
*   **Relational Database Management System (RDBMS):** A type of database system that stores and provides access to data points that are related to one another. Examples include MySQL, PostgreSQL, SQL Server, Oracle.
*   **Transaction:** A single logical unit of work performed on a database; it's a sequence of operations that is treated as an indivisible whole.
*   **ACID Properties:** A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee that database transactions are processed reliably.
    *   **Atomicity:** All operations within a transaction either complete successfully or none of them do.
    *   **Consistency:** A transaction brings the database from one valid state to another, maintaining all defined rules and constraints.
    *   **Isolation:** The effect of concurrently executing transactions is the same as if they were executed serially (one after another). This lesson is entirely about this property.
    *   **Durability:** Once a transaction has been committed, it will remain committed even in the event of power loss, crashes, or errors.
*   **Concurrency:** The ability of a database system to handle multiple transactions or operations at the same time.
*   **Commit:** The operation that makes all changes performed by a transaction permanent in the database.
*   **Rollback/Abort:** The operation that undoes all changes performed by a transaction, returning the database to its state before the transaction began.
*   **Locking:** A mechanism used by database systems to control concurrent access to data, preventing multiple transactions from modifying the same data simultaneously.
*   **Shared Lock (Read Lock):** Allows multiple transactions to read the same data concurrently.
*   **Exclusive Lock (Write Lock):** Prevents any other transaction from reading or writing the data while it's held.

## 4. The core idea — step by step

The core idea of transaction isolation levels is to define *what kinds of anomalies* (undesirable interactions between concurrent transactions) a transaction can tolerate. The ANSI SQL standard defines three main types of anomalies that different isolation levels aim to prevent. Let's walk through them and then see how each isolation level tackles them.

### Step 1: Understanding Concurrency Anomalies

Before we can understand isolation levels, we must understand the problems they solve. These are called "concurrency anomalies."

#### ### Anomaly 1: Dirty Read (P1: Read Uncommitted Data)

*   **Plain-English Statement:** Imagine someone is writing a sentence on a whiteboard, but they haven't finished it or decided if it's correct yet. If you read that half-finished sentence and use it as fact, that's a dirty read. You're reading data that hasn't been "committed" (finalized) by another transaction.
*   **Small Concrete Example:**
    1.  Transaction A starts.
    2.  Transaction A updates a bank account balance from $100 to $50 (but hasn't committed yet).
    3.  Transaction B reads the balance as $50.
    4.  Transaction A then encounters an error and rolls back its change, so the balance reverts to $100.
    5.  Transaction B now has an incorrect balance of $50, which was never actually valid.
*   **Formal/Mathematical Version:**
    Let $T_1$ and $T_2$ be two transactions. A dirty read occurs if $T_2$ reads a data item $X$ that has been written by $T_1$, and then $T_1$ aborts.
    $$ W_1(X) \dots R_2(X) \dots A_1 $$
    Where $W_1(X)$ is $T_1$ writing $X$, $R_2(X)$ is $T_2$ reading $X$, and $A_1$ is $T_1$ aborting.
*   **What could go wrong:** Your program could make decisions based on data that is temporary and will soon be undone, leading to incorrect calculations or actions.

#### ### Anomaly 2: Non-Repeatable Read (P2: Read Committed Data Twice, Get Different Values)

*   **Plain-English Statement:** You read a specific piece of information (like a price tag) at the beginning of your shopping trip. Later, you look at the *exact same* price tag again, and it has changed because someone else updated it and *finalized* that change while you were still shopping.
*   **Small Concrete Example:**
    1.  Transaction A starts.
    2.  Transaction A reads a product price as $10.
    3.  Transaction B starts.
    4.  Transaction B updates the product price to $12 and commits.
    5.  Transaction A reads the *same* product price again, and now it sees $12.
    6.  Transaction A now has two different values for the same data item within its own execution.
*   **Formal/Mathematical Version:**
    Let $T_1$ and $T_2$ be two transactions. A non-repeatable read occurs if $T_1$ reads a data item $X$, then $T_2$ updates $X$ and commits, and then $T_1$ reads $X$ again and gets a different value.
    $$ R_1(X) \dots W_2(X) \dots C_2 \dots R_1(X) $$
    Where $R_1(X)$ is $T_1$ reading $X$, $W_2(X)$ is $T_2$ writing $X$, and $C_2$ is $T_2$ committing.
*   **What could go wrong:** Your transaction might perform calculations based on inconsistent data. For instance, if you're summing up items and the price of an item changes mid-summation, your total will be wrong.

#### ### Anomaly 3: Phantom Read (P3: Re-read a Query, Get Different Set of Rows)

*   **Plain-English Statement:** You count how many blue cars are in a parking lot. While you're still counting or doing other things, a new blue car drives in and parks. If you count again using the *same criteria* (all blue cars), you'll find a different *number* of blue cars. It's not that a specific car changed color; it's that new cars appeared (or disappeared) that match your search.
*   **Small Concrete Example:**
    1.  Transaction A starts.
    2.  Transaction A queries all employees in the "Sales" department and finds 5 employees.
    3.  Transaction B starts.
    4.  Transaction B inserts a new employee into the "Sales" department and commits.
    5.  Transaction A queries all employees in the "Sales" department *again*, using the exact same query, and now finds 6 employees.
*   **Formal/Mathematical Version:**
    Let $T_1$ and $T_2$ be two transactions. A phantom read occurs if $T_1$ executes a query that returns a set of rows $S_1$, then $T_2$ inserts or deletes rows that satisfy $T_1$'s query condition and commits, and then $T_1$ re-executes the same query and obtains a different set of rows $S_2$.
    $$ Q_1(P) \dots I_2(R) \dots C_2 \dots Q_1(P) $$
    Where $Q_1(P)$ is $T_1$ querying for rows satisfying predicate $P$, $I_2(R)$ is $T_2$ inserting row $R$ (which satisfies $P$), and $C_2$ is $T_2$ committing.
*   **What could go wrong:** Aggregate functions (like `COUNT`, `SUM`, `AVG`) could produce inconsistent results if new rows appear or disappear mid-transaction. Business logic that assumes a stable set of data for a given query could break.

### Step 2: The Four Standard Isolation Levels

The ANSI SQL standard defines four isolation levels, each preventing a specific set of these anomalies. They form a hierarchy, with each higher level providing stronger isolation (preventing more anomalies) but potentially incurring a performance cost due to increased locking or overhead.

#### ### Isolation Level 1: READ UNCOMMITTED

*   **Plain-English Statement:** This is the most relaxed level, like having no rules at all on the shared whiteboard. You can see *everything* written by others, even if they're still working on it and haven't decided to keep it.
*   **What it means:** A transaction running at this level can read data that has been modified by other transactions but not yet committed.
*   **Anomalies Prevented:** None of the standard anomalies. It *allows* dirty reads, non-repeatable reads, and phantom reads.
*   **Formal/Mathematical Version:**
    This level does not prevent any of the standard anomalies $P1$, $P2$, or $P3$.
    $$ \text{Allows } P1, P2, P3 $$
*   **What could go wrong:** Highly inconsistent data. You might read data that is later rolled back, leading to completely incorrect results. This is rarely used unless performance is absolutely critical and data accuracy can be sacrificed (e.g., rough statistical estimates).

#### ### Isolation Level 2: READ COMMITTED

*   **Plain-English Statement:** You can only see what others have *finished* writing and saved. You won't see their half-finished thoughts or mistakes that they erased *before* saving. However, if they save something, and then later change it and save again, you might see the first version, and then later the second version if you look again.
*   **What it means:** A transaction running at this level can only read data that has been committed by other transactions. It prevents dirty reads. However, if the transaction reads the same data item multiple times, it might see different values if another transaction commits changes to that item in between the reads.
*   **Anomalies Prevented:** Dirty Reads ($P1$). It *allows* non-repeatable reads ($P2$) and phantom reads ($P3$).
*   **Formal/Mathematical Version:**
    This level prevents $P1$ (Dirty Reads).
    $$ \neg P1 \land P2 \land P3 $$
    (Not $P1$ AND $P2$ AND $P3$)
    Achieved by holding shared locks only for the duration of the read operation, releasing them immediately. Exclusive locks are held until commit/rollback.
*   **What could go wrong:** Inconsistent results for calculations or reports that require a consistent view of data over time, as the same row might appear with different values within a single transaction.

#### ### Isolation Level 3: REPEATABLE READ

*   **Plain-English Statement:** Once you've read a specific piece of information (like a price tag), it's "frozen" for you. If you look at that *exact same* price tag again later, you'll see the *same* value you saw the first time, even if someone else updated and saved a new price. However, if you're counting blue cars, new blue cars *can* still appear.
*   **What it means:** A transaction running at this level guarantees that if it reads a specific data item multiple times, it will always get the same value. It prevents dirty reads and non-repeatable reads. However, if it performs a query that returns a set of rows, and another transaction inserts new rows (phantoms) that match the query criteria and commits, the current transaction might see these new rows if it re-executes the query.
*   **Anomalies Prevented:** Dirty Reads ($P1$) and Non-Repeatable Reads ($P2$). It *allows* phantom reads ($P3$) according to the ANSI SQL standard. (Note: Some databases, like MySQL's InnoDB, implement `REPEATABLE READ` in a way that *also* prevents phantom reads using next-key locking, making it effectively `SERIALIZABLE` for many common cases, but this is a deviation from the strict ANSI definition).
*   **Formal/Mathematical Version:**
    This level prevents $P1$ and $P2$.
    $$ \neg P1 \land \neg P2 \land P3 $$
    Achieved by holding shared (read) locks on all data items read by the transaction until the transaction commits or rolls back. Exclusive locks are also held until commit/rollback.
*   **What could go wrong:** While individual rows are stable, queries that operate on sets of rows might yield inconsistent results if new rows appear or disappear that match the query criteria.

#### ### Isolation Level 4: SERIALIZABLE

*   **Plain-English Statement:** This is the strictest level. It's like everyone takes turns using the whiteboard. While it's your turn, no one else can even look at it, let alone write on it. Once you're done, the next person gets a completely fresh and consistent view. It guarantees that if multiple transactions run at the same time, the end result is exactly the same as if they had run one after another in some sequential order.
*   **What it means:** This is the highest isolation level. It guarantees that concurrent transactions behave as if they were executed serially. It prevents dirty reads, non-repeatable reads, and phantom reads. The database ensures that no transaction can interfere with another, providing complete data consistency.
*   **Anomalies Prevented:** Dirty Reads ($P1$), Non-Repeatable Reads ($P2$), and Phantom Reads ($P3$).
*   **Formal/Mathematical Version:**
    This level prevents $P1$, $P2$, and $P3$.
    $$ \neg P1 \land \neg P2 \land \neg P3 $$
    Achieved typically through strict two-phase locking (2PL) or optimistic concurrency control, often involving range locks (predicate locks) to prevent phantoms. All locks (shared and exclusive) are held until commit/rollback.
*   **What could go wrong:** This level offers the highest data integrity but often comes with the lowest concurrency and highest performance overhead. Transactions might wait longer for locks, leading to lower throughput. Deadlocks are also more common.

### Summary Table of Anomalies Prevented:

| Isolation Level     | Dirty Read (P1) | Non-Repeatable Read (P2) | Phantom Read (P3) |
| :------------------ | :-------------- | :----------------------- | :---------------- |
| READ UNCOMMITTED    | Allowed         | Allowed                  | Allowed           |
| READ COMMITTED      | Prevented       | Allowed                  | Allowed           |
| REPEATABLE READ     | Prevented       | Prevented                | Allowed (ANSI)    |
| SERIALIZABLE        | Prevented       | Prevented                | Prevented         |

## 5. Worked examples — multiple, with every step shown

Let's illustrate these isolation levels and their effects with concrete examples using a simple `Accounts` table:

```sql
CREATE TABLE Accounts (
    account_id INT PRIMARY KEY,
    balance DECIMAL(10, 2)
);

INSERT INTO Accounts (account_id, balance) VALUES (101, 1000.00);
INSERT INTO Accounts (account_id, balance) VALUES (102, 500.00);
INSERT INTO Accounts (account_id, balance) VALUES (201, 200.00);
```

### Example 1: Demonstrating a Dirty Read (READ UNCOMMITTED)

**Problem Statement:** Show how a dirty read can occur when two transactions interact at the `READ UNCOMMITTED` isolation level.

**Given:**
*   `Accounts` table with `account_id = 101`, `balance = 1000.00`.
*   Two concurrent transactions, `T1` and `T2`.
*   Both transactions operate at `READ UNCOMMITTED` isolation level.

**We want:** To show `T2` reading a value written by `T1` before `T1` commits, and `T1` subsequently rolling back.

**Steps:**

1.  **Initial State:**
    $$ \text{Accounts.balance for id 101} = 1000.00 $$
    *Explanation:* This is the starting balance for account 101.

2.  **Transaction T1 starts and updates balance:**
    ```sql
    -- T1
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 200.00 WHERE account_id = 101;
    -- Balance is now 800.00 in T1's view, but not yet committed.
    ```
    *Explanation:* T1 begins a transaction and attempts to withdraw $200 from account 101. The balance is locally updated to $800.00$. This change is *uncommitted*.

3.  **Transaction T2 reads the uncommitted balance:**
    ```sql
    -- T2
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    BEGIN TRANSACTION;
    SELECT balance FROM Accounts WHERE account_id = 101;
    -- T2 reads 800.00
    ```
    *Explanation:* Because T2 is at `READ UNCOMMITTED`, it can see the changes made by T1 even though T1 hasn't committed them. T2 reads the balance as $800.00$.

4.  **Transaction T1 rolls back:**
    ```sql
    -- T1
    ROLLBACK;
    -- The balance for account 101 reverts to 1000.00
    ```
    *Explanation:* T1 encounters an error or decides to cancel its operation. It rolls back, undoing its update. The actual balance in the database is now $1000.00$.

5.  **Transaction T2 commits (or continues with incorrect data):**
    ```sql
    -- T2
    -- T2 might now perform calculations based on the 800.00 balance.
    -- If T2 now tries to commit, it has acted on incorrect information.
    COMMIT;
    ```
    *Explanation:* T2 has committed or used the $800.00$ balance, which was never a valid, committed state. This is the "dirty read."

**Final Answer:**
The dirty read occurred when **T2 read `800.00`** for `account_id = 101` in Step 3, even though the final, committed balance for that account remained `1000.00` after T1's rollback. T2 acted upon temporary, incorrect data.

**Reflection:** This example highlights the danger of `READ UNCOMMITTED`. While it offers maximum concurrency (no waiting for locks), it sacrifices data integrity significantly. T2's view of the world was fundamentally wrong.

### Example 2: Preventing Dirty Reads, Allowing Non-Repeatable Reads (READ COMMITTED)

**Problem Statement:** Show how `READ COMMITTED` prevents dirty reads but still allows non-repeatable reads.

**Given:**
*   `Accounts` table with `account_id = 101`, `balance = 1000.00`.
*   Two concurrent transactions, `T1` and `T2`.
*   Both transactions operate at `READ COMMITTED` isolation level.

**We want:**
1.  To show `T2` *not* reading an uncommitted value from `T1`.
2.  To show `T2` reading the same data item twice and getting different values after `T1` commits an update.

**Steps:**

1.  **Initial State:**
    $$ \text{Accounts.balance for id 101} = 1000.00 $$
    *Explanation:* Starting balance.

2.  **Transaction T1 starts and updates balance:**
    ```sql
    -- T1
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 200.00 WHERE account_id = 101;
    -- Balance is now 800.00 in T1's view, but not yet committed.
    ```
    *Explanation:* T1 updates the balance to $800.00$. This change is uncommitted.

3.  **Transaction T2 attempts to read (will wait or read old value):**
    ```sql
    -- T2
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRANSACTION;
    SELECT balance FROM Accounts WHERE account_id = 101;
    -- T2 reads 1000.00 (the last committed value)
    ```
    *Explanation:* At `READ COMMITTED`, T2 *cannot* see T1's uncommitted change. It reads the last *committed* value, which is $1000.00$. This prevents the dirty read.

4.  **Transaction T1 commits its update:**
    ```sql
    -- T1
    COMMIT;
    -- The balance for account 101 is now permanently 800.00
    ```
    *Explanation:* T1 successfully commits its transaction. The database's official balance for account 101 is now $800.00$.

5.  **Transaction T2 reads the balance again:**
    ```sql
    -- T2
    SELECT balance FROM Accounts WHERE account_id = 101;
    -- T2 now reads 800.00
    ```
    *Explanation:* T2 performs another read. Since T1 has now committed its change, T2 sees the new, committed value of $800.00$.

6.  **Transaction T2 commits:**
    ```sql
    -- T2
    COMMIT;
    ```
    *Explanation:* T2 finishes its work.

**Final Answer:**
1.  **Dirty Read Prevention:** When T2 first read the balance in Step 3, it correctly read `1000.00`, preventing a dirty read of T1's uncommitted `800.00`.
2.  **Non-Repeatable Read Occurrence:** T2 read `1000.00` in Step 3 and then `800.00` in Step 5 for the *same* data item within its own transaction. This demonstrates a **non-repeatable read**.

**Reflection:** `READ COMMITTED` is a very common default isolation level. It balances consistency (no dirty data) with concurrency. However, it means a transaction might not have a perfectly stable view of the data if other transactions are actively committing changes to the same rows.

### Example 3: Preventing Non-Repeatable Reads, Allowing Phantom Reads (REPEATABLE READ)

**Problem Statement:** Show how `REPEATABLE READ` prevents non-repeatable reads but can still allow phantom reads (according to ANSI SQL standard).

**Given:**
*   `Accounts` table with `account_id = 101`, `balance = 1000.00`.
*   `Accounts` table also has `account_id = 201`, `balance = 200.00`.
*   Two concurrent transactions, `T1` and `T2`.
*   Both transactions operate at `REPEATABLE READ` isolation level.

**We want:**
1.  To show `T2` always reading the same value for an already-read row, even if `T1` commits an update.
2.  To show `T2` seeing new rows (phantoms) inserted by `T1` if `T2` re-executes a range query.

**Steps:**

1.  **Initial State:**
    $$ \text{Accounts.balance for id 101} = 1000.00 $$
    $$ \text{Accounts.balance for id 201} = 200.00 $$
    *Explanation:* Starting balances for two accounts.

2.  **Transaction T2 starts and reads data:**
    ```sql
    -- T2
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    BEGIN TRANSACTION;
    SELECT balance FROM Accounts WHERE account_id = 101;
    -- T2 reads 1000.00
    SELECT COUNT(*) FROM Accounts WHERE balance > 0;
    -- T2 reads 2 (accounts 101, 201)
    ```
    *Explanation:* T2 reads the balance of account 101 and counts all accounts with a positive balance. It holds a shared lock on row 101 and potentially a snapshot of the table for the count.

3.  **Transaction T1 starts, updates, and inserts data:**
    ```sql
    -- T1
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 100.00 WHERE account_id = 101;
    -- Balance for 101 is 900.00 in T1's view.
    INSERT INTO Accounts (account_id, balance) VALUES (301, 150.00);
    -- A new account 301 is inserted.
    COMMIT;
    -- All changes by T1 are now permanent.
    ```
    *Explanation:* T1 updates account 101 and inserts a new account 301. It then commits these changes. The actual balance for 101 is now $900.00$, and account 301 exists.

4.  **Transaction T2 reads the specific data item again:**
    ```sql
    -- T2
    SELECT balance FROM Accounts WHERE account_id = 101;
    -- T2 still reads 1000.00 (the value it initially saw)
    ```
    *Explanation:* Even though T1 committed an update to account 101, T2 (at `REPEATABLE READ`) still sees the original value of $1000.00$. This prevents the non-repeatable read.

5.  **Transaction T2 re-executes the range query:**
    ```sql
    -- T2
    SELECT COUNT(*) FROM Accounts WHERE balance > 0;
    -- T2 now reads 3 (accounts 101, 201, 301)
    ```
    *Explanation:* T2 re-executes the count query. Because `REPEATABLE READ` typically does not lock the "range" of possible rows (only existing rows), T2 sees the newly inserted account 301. This is a phantom read.

6.  **Transaction T2 commits:**
    ```sql
    -- T2
    COMMIT;
    ```
    *Explanation:* T2 finishes its work.

**Final Answer:**
1.  **Non-Repeatable Read Prevention:** T2 read `1000.00` for `account_id = 101` in Step 2 and again in Step 4, even after T1 committed an update. This confirms that **non-repeatable reads are prevented**.
2.  **Phantom Read Occurrence:** T2 counted 2 accounts in Step 2, and then 3 accounts in Step 5 for the *same query*. This demonstrates a **phantom read**.

**Reflection:** `REPEATABLE READ` is stronger than `READ COMMITTED` by ensuring that a transaction sees the same values for *rows it has already read*. However, it doesn't prevent new rows from appearing (or existing ones disappearing) that match a query's criteria, which can still lead to inconsistent aggregate results or logical errors if the application assumes a fixed set of rows.

### Example 4: Preventing All Anomalies (SERIALIZABLE)

**Problem Statement:** Show how `SERIALIZABLE` prevents dirty reads, non-repeatable reads, and phantom reads.

**Given:**
*   `Accounts` table with `account_id = 101`, `balance = 1000.00`.
*   `Accounts` table also has `account_id = 201`, `balance = 200.00`.
*   Two concurrent transactions, `T1` and `T2`.
*   Both transactions operate at `SERIALIZABLE` isolation level.

**We want:** To show `T2` maintaining a completely consistent view of the data, unaffected by T1's committed updates or inserts.

**Steps:**

1.  **Initial State:**
    $$ \text{Accounts.balance for id 101} = 1000.00 $$
    $$ \text{Accounts.balance for id 201} = 200.00 $$
    *Explanation:* Starting balances.

2.  **Transaction T2 starts and reads data:**
    ```sql
    -- T2
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    BEGIN TRANSACTION;
    SELECT balance FROM Accounts WHERE account_id = 101;
    -- T2 reads 1000.00
    SELECT COUNT(*) FROM Accounts WHERE balance > 0;
    -- T2 reads 2 (accounts 101, 201)
    ```
    *Explanation:* T2 reads the balance of account 101 and counts all positive balance accounts. At `SERIALIZABLE`, the database typically acquires shared locks on the specific row (101) and *range locks* (or predicate locks) on the `balance > 0` condition to prevent any other transaction from modifying or inserting data that would change T2's query results.

3.  **Transaction T1 starts, attempts to update and insert data:**
    ```sql
    -- T1
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 100.00 WHERE account_id = 101;
    -- T1 will likely block here, waiting for T2's lock on account 101 to be released.
    -- If T1 attempts to INSERT INTO Accounts (account_id, balance) VALUES (301, 150.00);
    -- T1 will also block here if T2 holds a range lock on the 'balance > 0' condition.
    ```
    *Explanation:* Because T2 holds locks (including potentially range locks) that protect its consistent view, T1's attempts to update account 101 or insert a new account (301, which would satisfy `balance > 0`) will be blocked. T1 must wait for T2 to commit or rollback.

4.  **Transaction T2 commits:**
    ```sql
    -- T2
    COMMIT;
    -- T2 releases all its locks.
    ```
    *Explanation:* T2 successfully commits. All its shared and range locks are released.

5.  **Transaction T1 can now proceed and commit:**
    ```sql
    -- T1 (after T2 commits)
    UPDATE Accounts SET balance = balance - 100.00 WHERE account_id = 101;
    -- Balance for 101 is 900.00.
    INSERT INTO Accounts (account_id, balance) VALUES (301, 150.00);
    -- Account 301 is inserted.
    COMMIT;
    -- All changes by T1 are now permanent.
    ```
    *Explanation:* Once T2 commits, T1's operations can proceed. T1 updates account 101 to $900.00$ and inserts account 301, then commits.

6.  **Let's imagine T2 needed to read again *after* T1 committed (which would technically be a new transaction, or a re-run of T2 after it committed):**
    If T2 were to run again *after* T1 committed, it would see the new state. But *within* its original `SERIALIZABLE` transaction, its view was completely stable.

**Final Answer:**
1.  **Dirty Read Prevention:** Not explicitly shown here, but T1's updates would not be visible to T2 until T1 commits, and T1 was blocked by T2.
2.  **Non-Repeatable Read Prevention:** T2 read `1000.00` for `account_id = 101` in Step 2. If T2 had attempted to read it again before committing, it would still see `1000.00` because T1 was blocked from committing its update.
3.  **Phantom Read Prevention:** T2 counted 2 accounts in Step 2. T1's attempt to insert a new account (301) was blocked until T2 completed. Therefore, if T2 had re-executed the count query *within its transaction*, it would still count 2. This confirms that **all anomalies are prevented**.

**Reflection:** `SERIALIZABLE` provides the strongest guarantee of data consistency. The database ensures that transactions effectively run one after another, even if they are interleaved. This comes at the cost of reduced concurrency, as transactions may block each other more frequently, potentially impacting performance. It's used when absolute data integrity is paramount, such as in financial audits or critical inventory systems.

## 6. Common mistakes and traps

1.  **Confusing `REPEATABLE READ` with preventing Phantom Reads:** Many students incorrectly assume `REPEATABLE READ` prevents phantom reads. While some database implementations (like MySQL's InnoDB) extend `REPEATABLE READ` to prevent phantoms, the ANSI SQL standard explicitly states that `REPEATABLE READ` *allows* phantom reads. This distinction is crucial for understanding the theoretical guarantees.
2.  **Assuming higher isolation is always better:** While `SERIALIZABLE` offers the highest data integrity, it comes with significant performance overhead due to increased locking and reduced concurrency. Using it unnecessarily can cripple an application's performance.
3.  **Not understanding the performance implications:** Each jump in isolation level (e.g., from `READ COMMITTED` to `REPEATABLE READ`) typically involves more aggressive locking or snapshotting, which can lead to increased contention, longer transaction times, and more deadlocks.
4.  **Ignoring database-specific implementations:** Different RDBMS (PostgreSQL, MySQL, SQL Server, Oracle) might implement isolation levels with slight variations or offer additional levels. Relying solely on the generic ANSI SQL definitions without understanding the specific database's behavior can lead to unexpected issues.
5.  **Misinterpreting "consistent view":** A "consistent view" within a transaction doesn't necessarily mean the data is the absolute latest global state. It means the data is consistent *with respect to the rules of the chosen isolation level* and will not change unexpectedly in ways that violate those rules.
6.  **Forgetting that `READ UNCOMMITTED` is almost always a bad idea:** While it exists and offers maximum concurrency, the risk of reading incorrect, transient data is so high that it's rarely suitable for anything other than very specific, non-critical reporting where approximate data is acceptable.

## 7. Textbook-precise explanation

Transaction isolation levels define the degree to which the operations of one transaction are visible to other concurrent transactions. The ANSI/ISO SQL standard (SQL-92) defines four isolation levels, characterized by the types of concurrency anomalies they permit or prevent. These anomalies are formally defined as follows:

Let $T_i$ and $T_j$ denote distinct transactions. Let $R_i(X)$ denote a read operation by $T_i$ on data item $X$, and $W_i(X)$ denote a write operation by $T_i$ on data item $X$. $C_i$ denotes the commit operation of $T_i$, and $A_i$ denotes the abort (rollback) operation of $T_i$.

1.  **P1 (Dirty Read / Read Uncommitted Data):** A transaction $T_i$ performs $W_i(X)$, and then $T_j$ performs $R_j(X)$. Subsequently, $T_i$ aborts ($A_i$). In this scenario, $T_j$ has read a value of $X$ that was never committed to the database.
    $$ W_i(X) \dots R_j(X) \dots A_i $$

2.  **P2 (Non-Repeatable Read):** A transaction $T_i$ performs $R_i(X)$. Subsequently, another transaction $T_j$ performs $W_j(X)$ and commits ($C_j$). Then, $T_i$ performs $R_i(X)$ again, obtaining a different value for $X$.
    $$ R_i(X) \dots W_j(X) \dots C_j \dots R_i(X) $$

3.  **P3 (Phantom Read):** A transaction $T_i$ executes a query that retrieves a set of rows $S_1$ based on a predicate $P$. Subsequently, another transaction $T_j$ inserts or deletes one or more rows (or updates columns that affect their inclusion in $P$) such that these changes satisfy the predicate $P$, and $T_j$ commits ($C_j$). When $T_i$ re-executes the *same query* with predicate $P$, it retrieves a different set of rows $S_2$ ($S_1 \neq S_2$).
    $$ Q_i(P) \dots I_j(R_k) \dots C_j \dots Q_i(P) $$
    where $Q_i(P)$ is $T_i$'s query on predicate $P$, and $I_j(R_k)$ is $T_j$'s insertion of row $R_k$ which satisfies $P$.

The four standard isolation levels are defined by the anomalies they permit or prevent:

*   **READ UNCOMMITTED:** Permits $P1$, $P2$, and $P3$. It offers the lowest level of isolation and highest concurrency.
    $$ \text{Permits } P1, P2, P3 $$
*   **READ COMMITTED:** Prevents $P1$ (Dirty Reads). Permits $P2$ and $P3$. This is often the default isolation level in many commercial database systems (e.g., Oracle, SQL Server, PostgreSQL). It typically achieves this by acquiring a short-duration shared lock on a data item for the duration of the read operation, releasing it immediately, while exclusive locks for writes are held until transaction commit.
    $$ \neg P1 \land P2 \land P3 $$
*   **REPEATABLE READ:** Prevents $P1$ and $P2$ (Dirty Reads and Non-Repeatable Reads). Permits $P3$ (Phantom Reads). It typically achieves this by holding shared locks on all data items read by the transaction until the transaction commits or aborts. Exclusive locks for writes are also held until commit/abort.
    $$ \neg P1 \land \neg P2 \land P3 $$
*   **SERIALIZABLE:** Prevents $P1$, $P2$, and $P3$ (all standard anomalies). This is the highest level of isolation, guaranteeing that the execution of concurrent transactions is equivalent to some serial execution of those transactions. It is typically implemented using strict two-phase locking (2PL) with predicate locking or index-range locking to prevent phantom reads, or via optimistic concurrency control mechanisms.
    $$ \neg P1 \land \neg P2 \land \neg P3 $$

For a more detailed and rigorous treatment, consult "Database Systems: The Complete Book" by Garcia-Molina, Ullman, and Widom, particularly Chapter 18 on "Concurrency Control," or "Fundamentals of Database Systems" by Elmasri and Navathe, Chapter 20 on "Concurrency Control Techniques."

## 8. ASCII diagrams

Let's visualize the interaction of two transactions, T1 and T2, over time, demonstrating a Non-Repeatable Read under `READ COMMITTED` isolation.

```text
Time -->
           T1 (READ COMMITTED)                    T2 (READ COMMITTED)
---------------------------------------------------------------------------------------
t=0        BEGIN TRANSACTION;
           UPDATE Accounts SET balance = 800 WHERE id = 101;
           -- T1's balance for 101 is 800 (uncommitted)

t=1                                               BEGIN TRANSACTION;
                                                  SELECT balance FROM Accounts WHERE id = 101;
                                                  -- T2 reads 1000 (last committed value)
                                                  -- T2 holds no lock on this value after read

t=2        COMMIT;
           -- T1's change (balance = 800) is now permanent and visible to others

t=3                                               SELECT balance FROM Accounts WHERE id = 101;
                                                  -- T2 reads 800 (newly committed value)
                                                  -- **NON-REPEATABLE READ OCCURS IN T2**

t=4                                               COMMIT;
---------------------------------------------------------------------------------------
```

**Description of the Diagram:**

*   The horizontal axis represents time, progressing from left to right.
*   The vertical columns represent two concurrent transactions, T1 and T2.
*   Each row `t=X` denotes a point in time where an action occurs.
*   At `t=0`, T1 starts and updates account 101's balance from 1000 to 800. This change is *uncommitted*.
*   At `t=1`, T2 starts and reads account 101's balance. Because both are at `READ COMMITTED`, T2 *does not* see T1's uncommitted change and reads the last *committed* value, which is 1000. T2 releases its shared lock on this row immediately after reading.
*   At `t=2`, T1 commits its transaction, making the balance of 800 permanent.
*   At `t=3`, T2 reads account 101's balance *again*. Since T1 has now committed, T2 sees the new, committed value of 800. This is a Non-Repeatable Read for T2, as it read the same data item twice within its transaction and got different values.
*   At `t=4`, T2 commits.

This diagram clearly shows how `READ COMMITTED` prevents a dirty read (T2 didn't see 800 at `t=1` when it was uncommitted) but allows a non-repeatable read (T2 saw 1000 at `t=1` and 800 at `t=3`).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of a **"DIRTY PHANTOM REPEATING"** a **"COMMITTED"** crime, but eventually getting **"SERIALIZED"**.
    *   **DIRTY** (Read Uncommitted): Allows Dirty Reads (and others). The "dirtiest" level.
    *   **COMMITTED**: Prevents Dirty Reads. Only sees what's "committed."
    *   **REPEATING** (Repeatable Read): Prevents Non-Repeatable Reads. Ensures data *you've already seen* doesn't "repeat" differently.
    *   **PHANTOM** (Phantom Read): The one anomaly Repeatable Read *still allows* (ANSI definition).
    *   **SERIALIZED** (Serializable): Prevents *all* anomalies, including Phantoms. It's the "cleanest" and most "orderly" level, like transactions run in a perfect serial order.

    Visualize a dirty ghost ("Dirty Phantom") trying to re-read a crime scene ("Repeating") after it was committed, but then a very strict police officer ("Serializable") comes in and makes sure everything is perfectly in order.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Hierarchy of Anomalies Prevented:** `READ UNCOMMITTED` < `READ COMMITTED` < `REPEATABLE READ` < `SERIALIZABLE`. Each level prevents the anomalies of the previous level, plus one more (except `READ UNCOMMITTED` which prevents nothing).
    *   **Key Anomaly per Level (what it *first* prevents):**
        *   `READ COMMITTED`: Prevents **Dirty Reads**.
        *   `REPEATABLE READ`: Prevents **Non-Repeatable Reads** (in addition to Dirty Reads).
        *   `SERIALIZABLE`: Prevents **Phantom Reads** (in addition to the others).
    *   **The ANSI SQL Standard Chart:**
        | Level             | Dirty Read | Non-Repeatable Read | Phantom Read |
        | :---------------- | :--------- | :------------------ | :----------- |
        | READ UNCOMMITTED  | Allowed    | Allowed             | Allowed      |
        | READ COMMITTED    | Prevented  | Allowed             | Allowed      |
        | REPEATABLE READ   | Prevented  | Prevented           | Allowed      |
        | SERIALIZABLE      | Prevented  | Prevented           | Prevented    |

3.  **Spaced-Repetition Schedule:**
    *   Review at **1 day**: Re-read the anomaly definitions and the table. Try to explain each level in your own words.
    *   Review at **3 days**: Draw the ASCII diagram from memory, explaining the non-repeatable read. Try to construct an example for a phantom read.
    *   Review at **7 days**: Explain the trade-offs (consistency vs. performance) for each level. What are real-world scenarios for each?
    *   Review at **16 days**: Write down the formal definitions ($P1, P2, P3$) and map them to the isolation levels.
    *   Review at **35 days**: Revisit all concepts, focusing on common mistakes and database-specific variations (e.g., MySQL's InnoDB `REPEATABLE READ`).

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact definitions or what each level prevents, start from the basics of concurrent transactions:
    1.  **What happens if transactions *don't* isolate at all?** You'd see temporary changes, changes to things you just read, and new things appearing. This leads directly to defining the three anomalies:
        *   **Dirty Read:** Seeing someone's uncommitted work.
        *   **Non-Repeatable Read:** Seeing a committed change to something you already read.
        *   **Phantom Read:** Seeing new rows appear that match your query criteria.
    2.  **How do you fix a Dirty Read?** Don't let anyone see uncommitted data. This leads to `READ COMMITTED`.
    3.  **How do you fix a Non-Repeatable Read (given you already fix Dirty Reads)?** Once you read a specific piece of data, "freeze" its value for your transaction. This leads to `REPEATABLE READ`.
    4.  **How do you fix a Phantom Read (given you already fix Non-Repeatable Reads)?** "Freeze" not just specific data items, but also the *set* of data items that match a query. This means preventing inserts/deletes that would affect your query results. This leads to `SERIALIZABLE`.
    This pathway allows you to rebuild the hierarchy and the guarantees of each level by considering the problems they solve in increasing order of complexity.

## 10. Connections — what this leads to

Understanding transaction isolation levels is crucial because it forms the bedrock for several advanced topics in database systems and distributed computing:

*   **Concurrency Control Mechanisms:** Isolation levels are implemented using various concurrency control techniques like Two-Phase Locking (2PL), Multi-Version Concurrency Control (MVCC), optimistic concurrency control, and timestamp ordering. A deep dive into these mechanisms reveals how the database physically enforces the logical guarantees of each isolation level.
*   **Distributed Transactions:** In systems where data is spread across multiple databases or nodes, ensuring ACID properties (especially Isolation) becomes significantly more complex. Concepts like Two-Phase Commit (2PC) or distributed consensus protocols (e.g., Paxos, Raft) are used to maintain isolation across a distributed system.
*   **CAP Theorem and Consistency Models:** Isolation levels directly relate to the "Consistency" aspect of the CAP theorem. In distributed systems, you often have to choose between strong consistency (like `SERIALIZABLE`) and availability/partition tolerance. This leads to exploring weaker consistency models (e.g., eventual consistency, causal consistency) used in NoSQL databases and large-scale distributed systems.
*   **Database Performance Tuning:** Choosing the correct isolation level is a major factor in database performance. Understanding the trade-offs helps in identifying bottlenecks, optimizing queries, and designing schemas that minimize contention. It informs decisions about when to use stronger isolation (for critical data integrity) versus weaker isolation (for higher throughput).
*   **Application Design for Data Integrity:** Developers must design their applications with the chosen isolation level in mind. If using a weaker level like `READ COMMITTED`, the application logic might need to handle potential non-repeatable reads or phantoms explicitly (e.g., re-checking conditions, defensive programming).
*   **Optimistic vs. Pessimistic Concurrency:** Isolation levels are often implemented using either pessimistic (locking data to prevent conflicts) or optimistic (allowing conflicts and resolving them at commit time) concurrency control. This topic explores the pros and cons of each approach in different scenarios.

## 11. Self-check questions

1.  A database transaction is running at `READ COMMITTED` isolation. Transaction A updates a row, but before it commits, Transaction B reads that same row. What value will Transaction B see for the row, and why?
2.  Explain the difference between a "Non-Repeatable Read" and a "Phantom Read." Provide a simple scenario for each that clearly demonstrates the distinction.
3.  You are designing a system for managing highly sensitive financial transactions where absolute data integrity is paramount, even at the cost of some performance. Which SQL standard isolation level would you recommend, and what specific anomaly (P1, P2, P3) does it prevent that the next lower level does not?
4.  Consider an application that generates daily sales reports by summing up all sales records for the day. If this report is generated while new sales records are actively being inserted into the database, what isolation level would be necessary to guarantee that the sum represents a perfectly consistent snapshot of the day's sales without missing any new sales or double-counting? Justify your answer.
5.  A developer argues that using `READ UNCOMMITTED` is fine for their analytics dashboard because "it's just a report, not critical data." Under what specific circumstances might this decision be acceptable, and what are the significant risks they are taking?