## 1. What it is — in plain English

Imagine a database as a giant, shared ledger where many people (or computer programs, which we call "transactions") are trying to read and write information at the same time. For example, multiple customers might be trying to buy the last concert ticket, or several bank tellers might be updating different parts of a customer's account.

When these transactions happen simultaneously, things can sometimes get messy. A "concurrency anomaly" is like a glitch or a mix-up that happens because these simultaneous operations aren't perfectly coordinated. It's an unexpected and undesirable outcome that occurs when the database doesn't manage these concurrent activities carefully enough.

These anomalies are problems of "isolation." Ideally, each transaction should feel like it's the only one operating on the database, completely isolated from all others. But if this isolation isn't strong enough, one transaction can "see" or "affect" another transaction's work in a way that leads to incorrect data or strange results.

We'll focus on three specific types of these mix-ups: a "dirty read" (reading something that later vanishes), a "non-repeatable read" (reading the same thing twice but getting different answers), and a "phantom read" (asking the same question twice and getting a different number of answers). These are like different ways the shared ledger can get confused when many people are writing in it at once.

## 2. Why it matters — real-world applications

Concurrency anomalies are not just theoretical problems; they have significant implications for the reliability and correctness of real-world systems across many industries.

1.  **Financial Systems (Banking & Stock Trading):** Imagine two ATMs simultaneously trying to process withdrawals from the same account. If not properly handled, a "dirty read" could occur where one ATM reads an account balance that's about to be rolled back by another failed transaction, leading to an incorrect withdrawal or an overdrawn account that isn't immediately detected. In stock trading, a "non-repeatable read" could mean a trader sees a stock price, makes a decision, but by the time they re-check, the price has changed due to another trade, leading to a suboptimal or lost opportunity. The integrity of financial data is paramount, and these anomalies directly threaten it.

2.  **E-commerce and Inventory Management:** Consider an online store selling limited-edition products. If multiple customers try to buy the last item simultaneously, a "phantom read" could occur. One transaction might check for available stock (e.g., `COUNT(*) WHERE item_id = X AND status = 'available'`), find one item, and proceed to checkout. Meanwhile, another transaction might insert a new 'available' item (perhaps a restock) or delete the last one (another customer got it). When the first transaction re-checks, the count is different, potentially leading to overselling (if an item was deleted) or displaying incorrect availability. This directly impacts customer satisfaction and business reputation.

3.  **Airline and Hotel Reservation Systems:** When booking flights or hotel rooms, "non-repeatable reads" can be critical. A user might query for available seats on a flight, see 3 seats, proceed to fill out their details, and then upon final confirmation, the system re-checks and finds only 1 seat left because two other users booked in the interim. This necessitates error messages and re-selection, frustrating the user. More severely, without proper concurrency control, a "dirty read" could lead to a double-booking if one transaction temporarily marks a seat as taken, another sees it as taken, but the first transaction then fails and releases the seat without the second transaction ever knowing.

4.  **Scientific Data Processing and Machine Learning:** In large-scale scientific simulations or machine learning model training, multiple processes might be updating shared datasets or model parameters. For instance, in a distributed machine learning setup, several workers might be updating a central parameter server. If one worker reads a parameter value (e.g., a learning rate) that another worker has just updated but hasn't yet committed (a "dirty read"), it could base its calculations on an ephemeral value. This can lead to model divergence, incorrect training, or irreproducible results, impacting the scientific validity of the research. Ensuring data consistency is crucial for the reliability of these complex computational tasks.

## 3. Prerequisites — what you must know first

To fully grasp concurrency anomalies, you should have a solid understanding of the following fundamental database concepts:

*   **Database:** A structured collection of data, typically stored and accessed electronically from a computer system.
*   **Relational Database:** A type of database that stores and provides access to data points that are related to one another. Data is organized into tables (relations), which consist of rows (records) and columns (attributes).
*   **Table, Row, Column:** The basic building blocks of a relational database. A table holds data, a row represents a single record, and a column represents an attribute of that record.
*   **Transaction:** A single logical unit of work performed on a database. It's a sequence of operations (reads, writes, updates, deletes) that are treated as a single, indivisible operation.
*   **ACID Properties:** A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee reliable processing of database transactions.
    *   **Atomicity:** All operations within a transaction either complete successfully (commit) or none do (rollback).
    *   **Consistency:** A transaction brings the database from one valid state to another.
    *   **Isolation:** Concurrent transactions appear to execute in isolation from each other. This is the property directly related to concurrency anomalies.
    *   **Durability:** Once a transaction is committed, its changes are permanent and survive system failures.
*   **Concurrency Control:** The set of techniques used to manage simultaneous operations on a database, ensuring data integrity and consistency.
*   **Database State:** The collection of all data values in the database at a particular point in time.
*   **SQL (Structured Query Language):** The standard language for managing and manipulating relational databases. Specifically, familiarity with `SELECT`, `UPDATE`, `INSERT`, and `DELETE` statements is helpful.
*   **Commit/Rollback:** `COMMIT` makes all changes within a transaction permanent. `ROLLBACK` undoes all changes made by a transaction since it began.

## 4. The core idea — step by step

The core idea behind concurrency anomalies is a violation of the **Isolation** property of ACID. When transactions are not perfectly isolated, their interleaved execution can lead to incorrect or unexpected results. Let's break down the three primary anomalies.

### Step 1: Understanding Transactions and Interleaving

*   **Plain English Statement:** A transaction is like a single, complete mission you give to the database, like "transfer $100 from account A to account B." When many such missions happen at the same time, their individual steps (reading account A, writing to account A, reading account B, writing to account B) can get mixed up or "interleaved."
*   **Small Concrete Example:** Imagine two people, Alice and Bob, both trying to update their status on a social media platform.
    *   Alice's transaction ($T_A$): Read current status, change status to "eating lunch", save new status.
    *   Bob's transaction ($T_B$): Read current status, change status to "working hard", save new status.
    If these steps happen one after another, it's fine. But if they interleave, say Alice reads, then Bob reads, then Alice writes, then Bob writes, who wins?
*   **Formal/Mathematical Version:** A transaction $T_i$ is a sequence of operations $O_{i,1}, O_{i,2}, \dots, O_{i,k}$, where each $O_{i,j}$ is either a read $R_i(X)$ or a write $W_i(X)$ on a data item $X$. Concurrency occurs when operations from multiple transactions are interleaved in time. For example, $R_1(A), R_2(B), W_1(A), W_2(B)$.
*   **What could go wrong:** Without proper control, the final state of the database might depend on the exact order of interleaved operations, leading to non-deterministic and potentially incorrect results. This is precisely what isolation aims to prevent.

### Step 2: The Dirty Read (Uncommitted Dependency)

*   **Plain English Statement:** This happens when one transaction reads data that has been changed by another transaction, but that second transaction hasn't officially "saved" (committed) its changes yet. If the second transaction then decides to undo its changes (rollback), the data read by the first transaction was never truly valid. It's like reading a draft document that gets thrown away before it's finalized.
*   **Small Concrete Example:**
    1.  A bank account `Balance` has $100.
    2.  Transaction $T_1$ starts: `UPDATE Balance SET amount = amount - 50` (new balance is $50$). This change is *not yet committed*.
    3.  Transaction $T_2$ starts: `SELECT amount FROM Balance` (reads $50$).
    4.  Transaction $T_1$ encounters an error (e.g., network failure) and *rolls back* its change. The `Balance` is restored to $100$.
    5.  Transaction $T_2$ now has $50$ in its memory, but the actual balance is $100$. $T_2$ has read "dirty" data.
*   **Formal/Mathematical Version:** A dirty read occurs if transaction $T_1$ performs $W_1(X)$, and subsequently transaction $T_2$ performs $R_2(X)$ before $T_1$ has either committed or aborted. If $T_1$ then aborts, $T_2$ has read data that was never made permanent in the database.
    $$
    \text{Schedule: } \dots, W_1(X), \dots, R_2(X), \dots, \text{Abort}_1, \dots
    $$
*   **What could go wrong:** $T_2$ might make critical decisions or perform calculations based on this invalid data. For instance, if $T_2$ was checking if a customer has enough funds, it might wrongly deny a legitimate transaction because it saw a temporary, lower balance that was later undone.

### Step 3: The Non-Repeatable Read

*   **Plain English Statement:** This anomaly occurs when a transaction reads the same piece of data multiple times, but gets a different value each time. This happens because another transaction changed that specific piece of data in between the first transaction's reads and committed its change. It's like looking at a sign, looking away, and when you look back, someone has changed the words on the sign.
*   **Small Concrete Example:**
    1.  A product `ItemA` has `stock = 10`.
    2.  Transaction $T_1$ starts: `SELECT stock FROM ItemA` (reads $10$).
    3.  Transaction $T_2$ starts: `UPDATE ItemA SET stock = stock - 1` (new stock is $9$). $T_2$ then *commits*.
    4.  Transaction $T_1$ continues: `SELECT stock FROM ItemA` again (reads $9$).
    5.  $T_1$ now has seen two different values ($10$ and $9$) for the same data item within its own execution. This is a non-repeatable read.
*   **Formal/Mathematical Version:** A non-repeatable read occurs if transaction $T_1$ performs $R_1(X)$, and subsequently transaction $T_2$ performs $W_2(X)$ and commits, and then $T_1$ performs $R_1(X)$ again, obtaining a different value for $X$.
    $$
    \text{Schedule: } \dots, R_1(X), \dots, W_2(X), \text{Commit}_2, \dots, R_1(X)_{\text{new}}, \dots
    $$
*   **What could go wrong:** If $T_1$ is trying to perform a complex calculation or generate a report that requires consistent data, seeing different values for the same item can lead to incorrect results or logical errors within $T_1$. For example, if $T_1$ was trying to verify an inventory count, seeing $10$ then $9$ would make its internal logic inconsistent.

### Step 4: The Phantom Read

*   **Plain English Statement:** This is similar to a non-repeatable read, but instead of seeing a *different value for an existing row*, a transaction sees a *different set of rows* when it executes the same query twice. This happens because another transaction inserted or deleted rows that match the query's criteria in between the first transaction's two identical queries. It's like asking "How many red cars are in the parking lot?" twice, and the second time you get a different number because someone drove a red car in or out.
*   **Small Concrete Example:**
    1.  A `Customers` table contains three customers in `City = 'New York'`.
    2.  Transaction $T_1$ starts: `SELECT COUNT(*) FROM Customers WHERE City = 'New York'` (returns $3$).
    3.  Transaction $T_2$ starts: `INSERT INTO Customers (name, City) VALUES ('Eve', 'New York')`. $T_2$ then *commits*.
    4.  Transaction $T_1$ continues: `SELECT COUNT(*) FROM Customers WHERE City = 'New York'` again (returns $4$).
    5.  $T_1$ has now seen a "phantom" row appear (or disappear, if $T_2$ had deleted a row).
*   **Formal/Mathematical Version:** A phantom read occurs if transaction $T_1$ executes a query $Q_1$ returning a set of rows $S_1$. Subsequently, transaction $T_2$ inserts or deletes rows that satisfy the conditions of $Q_1$, and commits. Then $T_1$ executes $Q_1$ again, returning a set $S_2$, where $S_1 \neq S_2$ due to the presence of new rows or absence of previously existing rows that satisfy the query's predicate.
    $$
    \text{Schedule: } \dots, Q_1(\text{condition}) \to S_1, \dots, \text{Insert/Delete}_2(\text{matching row}), \text{Commit}_2, \dots, Q_1(\text{condition}) \to S_2 (\text{where } S_1 \neq S_2), \dots
    $$
*   **What could go wrong:** This anomaly primarily affects queries that operate on sets of data, such as aggregate functions (`COUNT`, `SUM`, `AVG`) or queries that fetch all matching rows. If $T_1$ is calculating a total or iterating through a list of items, the sudden appearance or disappearance of rows can lead to incorrect totals, missed processing of items, or logical inconsistencies.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding of these concurrency anomalies.

### Example 1: Dirty Read (Easy)

**Problem Statement:** Two transactions, $T_1$ and $T_2$, are operating on a bank account balance. $T_1$ attempts to deduct funds, but then fails. $T_2$ reads the balance while $T_1$'s changes are uncommitted. Demonstrate how a dirty read occurs.

**Given:**
*   A database table `Accounts` with a single row: `(account_id: 'A101', balance: 1000)`.
*   Transaction $T_1$ intends to withdraw 200 from 'A101'.
*   Transaction $T_2$ intends to read the balance of 'A101'.

**What we want:** Show the sequence of operations that leads to a dirty read.

**Steps:**

1.  **Initial State:**
    $$
    \text{Accounts: } \{(\text{account\_id: 'A101', balance: 1000})\}
    $$
    *Explanation:* The account 'A101' starts with a balance of 1000.

2.  **$T_1$ begins and updates the balance:**
    $$
    T_1: \text{BEGIN TRANSACTION;} \\
    T_1: \text{UPDATE Accounts SET balance = balance - 200 WHERE account\_id = 'A101';}
    $$
    *Explanation:* $T_1$ starts a transaction and updates the balance for 'A101'. The balance in the database is now temporarily 800, but this change is *uncommitted*.

3.  **$T_2$ reads the uncommitted balance:**
    $$
    T_2: \text{BEGIN TRANSACTION;} \\
    T_2: \text{SELECT balance FROM Accounts WHERE account\_id = 'A101';} \quad (\text{reads } 800)
    $$
    *Explanation:* $T_2$ starts its transaction and reads the balance. It sees the value 800, which was written by $T_1$ but not yet committed.

4.  **$T_1$ encounters an error and rolls back:**
    $$
    T_1: \text{ROLLBACK;}
    $$
    *Explanation:* Due to some error (e.g., system crash, constraint violation), $T_1$ cannot complete successfully and rolls back. All its changes are undone. The balance for 'A101' reverts to its original value of 1000.

5.  **$T_2$ now holds dirty data:**
    *Explanation:* $T_2$ still holds the value 800 in its local memory or for subsequent operations. However, the actual database balance for 'A101' is 1000. $T_2$ has performed a dirty read.

**Final Answer:**
The dirty read occurred when $T_2$ read the balance as 800, which was an uncommitted change by $T_1$. When $T_1$ rolled back, the true balance reverted to 1000, making $T_2$'s read value incorrect and "dirty."

**Reflection:** This example highlights how reading uncommitted changes can lead to inconsistent views of data. If $T_2$ were to, for example, then display this balance to a user or make a decision based on it, it would be operating on incorrect information.

---

### Example 2: Non-Repeatable Read (Medium)

**Problem Statement:** Two transactions, $T_1$ and $T_2$, are operating on a product's inventory count. $T_1$ reads the inventory, and then $T_2$ updates and commits a change to that same inventory. Demonstrate how $T_1$ experiences a non-repeatable read.

**Given:**
*   A database table `Products` with a single row: `(product_id: 'P001', stock: 50)`.
*   Transaction $T_1$ intends to check the stock twice for consistency.
*   Transaction $T_2$ intends to sell 5 units of 'P001'.

**What we want:** Show the sequence of operations that leads to a non-repeatable read for $T_1$.

**Steps:**

1.  **Initial State:**
    $$
    \text{Products: } \{(\text{product\_id: 'P001', stock: 50})\}
    $$
    *Explanation:* Product 'P001' starts with a stock of 50 units.

2.  **$T_1$ begins and reads the stock for the first time:**
    $$
    T_1: \text{BEGIN TRANSACTION;} \\
    T_1: \text{SELECT stock FROM Products WHERE product\_id = 'P001';} \quad (\text{reads } 50)
    $$
    *Explanation:* $T_1$ starts its transaction and reads the current stock of 'P001', which is 50.

3.  **$T_2$ begins, updates the stock, and commits:**
    $$
    T_2: \text{BEGIN TRANSACTION;} \\
    T_2: \text{UPDATE Products SET stock = stock - 5 WHERE product\_id = 'P001';} \\
    T_2: \text{COMMIT;}
    $$
    *Explanation:* $T_2$ starts, reduces the stock by 5 units (now 45), and then commits its changes. This change is now permanent in the database.

4.  **$T_1$ reads the stock for the second time:**
    $$
    T_1: \text{SELECT stock FROM Products WHERE product\_id = 'P001';} \quad (\text{reads } 45)
    $$
    *Explanation:* Still within its transaction, $T_1$ reads the stock of 'P001' again. This time, it sees the value 45, which was committed by $T_2$.

5.  **$T_1$ completes (e.g., commits):**
    $$
    T_1: \text{COMMIT;}
    $$
    *Explanation:* $T_1$ completes its operations. It has observed two different values for the same data item within its single transaction.

**Final Answer:**
The non-repeatable read occurred for $T_1$ because its first read of `stock` was 50, but its second read of the *same* `stock` value returned 45, due to $T_2$'s committed update in between.

**Reflection:** If $T_1$ was, for example, calculating a discount based on the initial stock level and then verifying the final stock before applying the discount, this anomaly would lead to an inconsistent state or an incorrect calculation within $T_1$. The transaction's internal logic might be broken by the changing data.

---

### Example 3: Phantom Read (Medium - Insert)

**Problem Statement:** Two transactions, $T_1$ and $T_2$, are operating on a list of customer orders. $T_1$ counts the number of orders for a specific product category. While $T_1$ is still active, $T_2$ inserts a new order that matches $T_1$'s criteria and commits. Demonstrate how $T_1$ experiences a phantom read.

**Given:**
*   A database table `Orders` with initial data:
    $$
    \{
    (\text{order\_id: 1, product\_category: 'Electronics', amount: 100}), \\
    (\text{order\_id: 2, product\_category: 'Books', amount: 50}), \\
    (\text{order\_id: 3, product\_category: 'Electronics', amount: 200})
    \}
    $$
*   Transaction $T_1$ intends to count all 'Electronics' orders twice.
*   Transaction $T_2$ intends to add a new 'Electronics' order.

**What we want:** Show the sequence of operations that leads to a phantom read for $T_1$.

**Steps:**

1.  **Initial State:**
    $$
    \text{Orders: } \{
    (\text{id: 1, category: 'Electronics', amt: 100}), \\
    (\text{id: 2, category: 'Books', amt: 50}), \\
    (\text{id: 3, category: 'Electronics', amt: 200})
    \}
    $$
    *Explanation:* There are 2 'Electronics' orders initially.

2.  **$T_1$ begins and counts 'Electronics' orders for the first time:**
    $$
    T_1: \text{BEGIN TRANSACTION;} \\
    T_1: \text{SELECT COUNT(*) FROM Orders WHERE product\_category = 'Electronics';} \quad (\text{returns } 2)
    $$
    *Explanation:* $T_1$ starts and counts 2 orders in the 'Electronics' category.

3.  **$T_2$ begins, inserts a new order, and commits:**
    $$
    T_2: \text{BEGIN TRANSACTION;} \\
    T_2: \text{INSERT INTO Orders (order\_id, product\_category, amount) VALUES (4, 'Electronics', 150);} \\
    T_2: \text{COMMIT;}
    $$
    *Explanation:* $T_2$ inserts a new order (ID 4) into the 'Electronics' category and commits. The database now permanently has 3 'Electronics' orders.

4.  **$T_1$ counts 'Electronics' orders for the second time:**
    $$
    T_1: \text{SELECT COUNT(*) FROM Orders WHERE product\_category = 'Electronics';} \quad (\text{returns } 3)
    $$
    *Explanation:* Still within its transaction, $T_1$ repeats the same count query. This time, it sees 3 orders because $T_2$'s new order matches the criteria.

5.  **$T_1$ completes (e.g., commits):**
    $$
    T_1: \text{COMMIT;}
    $$
    *Explanation:* $T_1$ finishes, having seen a different count of rows for the same query.

**Final Answer:**
The phantom read occurred for $T_1$ because its first `COUNT(*)` query returned 2, but its second identical query returned 3, due to $T_2$'s committed `INSERT` operation introducing a new "phantom" row that matched the query's predicate.

**Reflection:** This example demonstrates that phantom reads affect queries on *sets* of data. If $T_1$ was, for instance, trying to calculate the total revenue for 'Electronics' and based its loop on the initial count, it would miss processing the new order. It's not just about a single value changing, but the *existence* of data changing.

---

### Example 4: Phantom Read (Hard - Delete)

**Problem Statement:** Two transactions, $T_1$ and $T_2$, are managing a list of active users. $T_1$ performs a query to list all active users. While $T_1$ is still active, $T_2$ deletes an active user and commits. Demonstrate how $T_1$ experiences a phantom read.

**Given:**
*   A database table `Users` with initial data:
    $$
    \{
    (\text{user\_id: 'U1', status: 'active'}), \\
    (\text{user\_id: 'U2', status: 'active'}), \\
    (\text{user\_id: 'U3', status: 'inactive'})
    \}
    $$
*   Transaction $T_1$ intends to fetch all 'active' users twice.
*   Transaction $T_2$ intends to deactivate user 'U2' (effectively deleting from 'active' set).

**What we want:** Show the sequence of operations that leads to a phantom read for $T_1$.

**Steps:**

1.  **Initial State:**
    $$
    \text{Users: } \{
    (\text{id: 'U1', status: 'active'}), \\
    (\text{id: 'U2', status: 'active'}), \\
    (\text{id: 'U3', status: 'inactive'})
    \}
    $$
    *Explanation:* There are 2 'active' users initially.

2.  **$T_1$ begins and fetches 'active' users for the first time:**
    $$
    T_1: \text{BEGIN TRANSACTION;} \\
    T_1: \text{SELECT user\_id FROM Users WHERE status = 'active';} \quad (\text{returns } \{\text{'U1', 'U2'}\})
    $$
    *Explanation:* $T_1$ starts and retrieves the user IDs of all active users. It sees 'U1' and 'U2'.

3.  **$T_2$ begins, updates a user's status (effectively "deleting" from the active set), and commits:**
    $$
    T_2: \text{BEGIN TRANSACTION;} \\
    T_2: \text{UPDATE Users SET status = 'inactive' WHERE user\_id = 'U2';} \\
    T_2: \text{COMMIT;}
    $$
    *Explanation:* $T_2$ changes 'U2''s status to 'inactive' and commits. This means 'U2' no longer satisfies the 'active' condition. The database now only has 'U1' as an 'active' user.

4.  **$T_1$ fetches 'active' users for the second time:**
    $$
    T_1: \text{SELECT user\_id FROM Users WHERE status = 'active';} \quad (\text{returns } \{\text{'U1'}\})
    $$
    *Explanation:* Still within its transaction, $T_1$ repeats the same query. This time, it only sees 'U1' because 'U2' was "deleted" from the set of active users by $T_2$'s committed update.

5.  **$T_1$ completes (e.g., commits):**
    $$
    T_1: \text{COMMIT;}
    $$
    *Explanation:* $T_1$ finishes, having seen a different set of rows for the same query.

**Final Answer:**
The phantom read occurred for $T_1$ because its first `SELECT` query returned the set {'U1', 'U2'}, but its second identical query returned the set {'U1'}, due to $T_2$'s committed `UPDATE` operation effectively "deleting" 'U2' from the set of rows matching the query's predicate.

**Reflection:** This example demonstrates that phantom reads aren't just about `INSERT` operations; `DELETE` (or updates that change a row's eligibility for a query) can also cause them. The key is that the *set of rows* returned by a predicate-based query changes between two identical executions within the same transaction. This can be particularly tricky if $T_1$ was, for example, iterating through the list of active users for some processing, and a user suddenly disappears from its list.

## 6. Common mistakes and traps

1.  **Confusing Dirty Read with Non-Repeatable Read:** Students often mix these two up. The key difference is the *commitment status* of the interfering transaction. A **dirty read** involves reading data from an *uncommitted* transaction that later rolls back. A **non-repeatable read** involves reading data that was *committed* by another transaction in between reads.
2.  **Confusing Non-Repeatable Read with Phantom Read:** Both involve seeing different data on a re-read within a transaction. However, a **non-repeatable read** is about a *single row's attribute value changing*. A **phantom read** is about the *set of rows returned by a query changing* (due to insertions or deletions of rows matching the query's criteria). It's the difference between "the stock count for Item A changed" (non-repeatable) and "the number of items in category B changed" (phantom).
3.  **Forgetting the Role of `COMMIT`/`ROLLBACK`:** An anomaly doesn't fully manifest until the interfering transaction either commits (for non-repeatable and phantom reads) or rolls back (for dirty reads). Simply performing a write operation by another transaction isn't enough; its final outcome dictates the anomaly.
4.  **Assuming Isolation Levels Prevent All Anomalies:** Students might think that setting *any* isolation level will magically make all concurrency problems disappear. This is incorrect. Different isolation levels prevent different sets of anomalies. For example, `READ COMMITTED` prevents dirty reads but allows non-repeatable and phantom reads.
5.  **Overlooking the "Predicate" Aspect of Phantom Reads:** Phantom reads are specifically about queries with `WHERE` clauses (predicates) that define a set of rows. If a row is inserted or deleted that *satisfies* that predicate, it causes a phantom read. It's not just about any row being inserted or deleted, but one that affects the result set of the specific query.
6.  **Focusing Only on `INSERT`/`DELETE` for Phantom Reads:** While `INSERT` and `DELETE` are classic examples, an `UPDATE` operation can also cause a phantom read if it changes a row's attributes such that it now *satisfies* a query's predicate (making it "appear") or no longer satisfies it (making it "disappear").

## 7. Textbook-precise explanation

Concurrency anomalies arise from insufficient isolation between concurrently executing transactions. The SQL standard defines four isolation levels, each preventing a specific subset of these anomalies. Understanding these anomalies is critical for choosing the appropriate isolation level for a given application's consistency requirements.

Let $T_i$ and $T_j$ be two distinct transactions.

1.  **Dirty Read (P1: Read Uncommitted Data):**
    A dirty read occurs when $T_i$ reads a data item $X$ that has been written by $T_j$, where $T_j$ has not yet committed. If $T_j$ subsequently aborts, $T_i$ will have read data that was never made permanent in the database. This violates the atomicity and consistency properties if $T_i$ then commits based on this invalid data.
    Formally, a schedule exhibits a dirty read if there exists a sequence of operations:
    $$
    \dots, W_j(X), \dots, R_i(X), \dots, \text{Abort}_j, \dots
    $$
    *Prevention:* This anomaly is prevented by the `READ COMMITTED` isolation level and higher (e.g., `REPEATABLE READ`, `SERIALIZABLE`). The `READ UNCOMMITTED` isolation level explicitly allows dirty reads.

2.  **Non-Repeatable Read (P2: Non-Repeatable Read):**
    A non-repeatable read occurs when $T_i$ reads a data item $X$, and then $T_j$ updates $X$ and commits. Subsequently, $T_i$ attempts to read $X$ again and obtains a different value. This violates the isolation property, as $T_i$'s view of the data is inconsistent within its own execution.
    Formally, a schedule exhibits a non-repeatable read if there exists a sequence of operations:
    $$
    \dots, R_i(X), \dots, W_j(X), \text{Commit}_j, \dots, R_i(X)_{\text{new}}, \dots
    $$
    *Prevention:* This anomaly is prevented by the `REPEATABLE READ` isolation level and higher (e.g., `SERIALIZABLE`). The `READ UNCOMMITTED` and `READ COMMITTED` isolation levels allow non-repeatable reads.

3.  **Phantom Read (P3: Phantom):**
    A phantom read occurs when $T_i$ executes a query that retrieves a set of rows based on a search condition (predicate). Then, $T_j$ inserts or deletes one or more rows that satisfy the same search condition and commits. Subsequently, $T_i$ re-executes the *same* query and obtains a different set of rows (either more or fewer). This is distinct from a non-repeatable read because it involves changes to the *set of rows* returned by a predicate, rather than changes to the values within existing rows.
    Formally, a schedule exhibits a phantom read if there exists a sequence of operations:
    $$
    \dots, Q_i(P) \to S_1, \dots, (\text{Insert/Delete}_j(\text{row } r \text{ where } P(r) \text{ is true})), \text{Commit}_j, \dots, Q_i(P) \to S_2 (\text{where } S_1 \neq S_2), \dots
    $$
    where $Q_i(P)$ denotes a query by $T_i$ using predicate $P$, and $S_1, S_2$ are the sets of rows returned.
    *Prevention:* This anomaly is prevented only by the `SERIALIZABLE` isolation level. The `READ UNCOMMITTED`, `READ COMMITTED`, and `REPEATABLE READ` isolation levels allow phantom reads.

These definitions are consistent with standard database textbooks, such as "Database System Concepts" by Silberschatz, Korth, and Sudarshan (8th ed., Chapter 15, "Concurrency Control") and "Fundamentals of Database Systems" by Elmasri and Navathe (7th ed., Chapter 18, "Transaction Processing Concepts").

## 8. ASCII diagrams

Here are ASCII diagrams illustrating the timeline of operations for each anomaly. Time flows from top to bottom. $T_1$ and $T_2$ represent concurrent transactions. $R(X)$ denotes reading data item $X$, $W(X)$ denotes writing data item $X$. $Q(\text{pred})$ denotes a query based on a predicate. `Commit` and `Abort` indicate the transaction's termination.

### Dirty Read (Uncommitted Dependency)

```text
Time
 |
 |  T1: BEGIN TRANSACTION
 |  T1: W(X)  (e.g., balance = 800)
 |    \
 |     \ T2: BEGIN TRANSACTION
 |      \ T2: R(X) (reads 800, which is uncommitted)
 |       /
 |      /
 |  T1: ABORT (X reverts to original value, e.g., 1000)
 |
 |  T2 now holds 'dirty' data (800)
 |  which is inconsistent with the final database state (1000).
 |  T2: (continues with incorrect data, or commits)
 |
 V
```

### Non-Repeatable Read

```text
Time
 |
 |  T1: BEGIN TRANSACTION
 |  T1: R(X)  (e.g., stock = 50)
 |    \
 |     \ T2: BEGIN TRANSACTION
 |      \ T2: W(X) (e.g., stock = 45)
 |       \ T2: COMMIT
 |       /
 |      /
 |  T1: R(X)  (reads 45, a different value)
 |
 |  T1 has seen X=50, then X=45 within its own transaction.
 |  T1: COMMIT
 |
 V
```

### Phantom Read

```text
Time
 |
 |  T1: BEGIN TRANSACTION
 |  T1: Q(predicate) -> Set S1 (e.g., COUNT(*) WHERE city='NY' -> 2)
 |    \
 |     \ T2: BEGIN TRANSACTION
 |      \ T2: INSERT row_matching_predicate (e.g., new customer in NY)
 |       \ T2: COMMIT
 |       /
 |      /
 |  T1: Q(predicate) -> Set S2 (e.g., COUNT(*) WHERE city='NY' -> 3)
 |
 |  T1 has seen a different set of rows for the same query.
 |  T1: COMMIT
 |
 V
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **D**irty **R**ead: Imagine reading a "dirty" magazine or newspaper – it's full of temporary, unreliable stuff that might be retracted later. Or, think of a chef tasting a dish that's "dirty" (not yet finished) and then the chef throws it out. You tasted something that never truly existed.
    *   **N**on-**R**epeatable **R**ead: Think of a news headline that keeps changing. You read it, then someone updates it, and when you look again, it's different. You can't "repeat" your read and get the same result. It's about a *single fact* changing.
    *   **P**hantom **R**ead: Imagine a "phantom" ghost appearing or disappearing. You count the number of people in a room, turn around, and when you count again, there's an extra person (a phantom!) or one has vanished. It's about the *number of things* (rows) changing, not the things themselves.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Dirty Read:** Read uncommitted data $\rightarrow$ Interfering transaction *aborts*.
    *   **Non-Repeatable Read:** Read same data item twice $\rightarrow$ Different value $\rightarrow$ Interfering transaction *commits* a change to that item.
    *   **Phantom Read:** Query same predicate twice $\rightarrow$ Different *set of rows* $\rightarrow$ Interfering transaction *commits* an `INSERT`/`DELETE` (or update changing predicate eligibility).

3.  **Spaced-Repetition Schedule:**
    *   Review these definitions and examples:
        *   **1 day** after initially learning.
        *   **3 days** after the first review.
        *   **7 days** after the second review.
        *   **16 days** after the third review.
        *   **35 days** after the fourth review.
    *   For each review, try to explain each anomaly in your own words and draw its timeline diagram from memory.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the specifics of an anomaly, start from the foundational concept of **Isolation** (one of the ACID properties).
    1.  **What is a transaction?** A logical unit of work.
    2.  **What does Isolation promise?** That concurrent transactions appear to execute independently, as if in serial order.
    3.  **What would violate this promise?**
        *   If Transaction A sees something from Transaction B that isn't final (B hasn't committed). What if B then *undoes* its work? A's view was wrong. $\rightarrow$ **Dirty Read.**
        *   If Transaction A reads a piece of data, and then B changes that *same piece of data* and makes it permanent, and A reads it again. A's view of that single piece of data changed within its own logical unit of work. $\rightarrow$ **Non-Repeatable Read.**
        *   If Transaction A asks for a *list of things* (e.g., "all items matching X"), and then B adds or removes something from that list permanently, and A asks for the list again. A's view of the *collection* of data changed. $\rightarrow$ **Phantom Read.**
    By thinking about how the promise of isolation can be broken in different ways, you can reconstruct the definitions of these anomalies.

## 10. Connections — what this leads to

Understanding concurrency anomalies is not an end in itself; it's a foundational concept that unlocks many advanced topics in database systems and distributed computing.

1.  **Isolation Levels (SQL Standard):** The most direct consequence of these anomalies is the concept of SQL Isolation Levels: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, and `SERIALIZABLE`. Each level is designed to prevent a specific set of these anomalies, with `SERIALIZABLE` being the strongest (preventing all three) and `READ UNCOMMITTED` being the weakest (allowing all three). Choosing the right isolation level is a critical design decision, balancing consistency requirements with performance needs.

2.  **Concurrency Control Mechanisms:** These anomalies highlight the need for sophisticated mechanisms to manage concurrent access. This leads to the study of:
    *   **Locking:** Shared (read) locks and exclusive (write) locks are fundamental to preventing these anomalies. Different locking protocols (e.g., Two-Phase Locking - 2PL) implement the various isolation levels.
    *   **Multi-Version Concurrency Control (MVCC):** Used by many modern databases (e.g., PostgreSQL, Oracle, SQL Server Snapshot Isolation), MVCC allows readers to access older consistent versions of data, avoiding reader-writer conflicts and thus preventing dirty reads and non-repeatable reads without using locks on read operations.
    *   **Timestamp Ordering:** Another approach where transactions are assigned timestamps, and operations are ordered based on these.
    *   **Optimistic Concurrency Control:** Transactions proceed without locks and only check for conflicts at commit time.

3.  **Distributed Databases and Data Consistency:** In distributed systems, where data is replicated across multiple nodes, preventing these anomalies becomes significantly more complex. Concepts like eventual consistency, strong consistency, and the CAP theorem (Consistency, Availability, Partition Tolerance) directly relate to the challenges of maintaining data integrity in the face of network partitions and concurrency. Anomalies like dirty reads can be particularly problematic in systems with weak consistency models.

4.  **Database Design and Performance Tuning:** Understanding these anomalies helps database designers and developers write more efficient and correct applications. For instance, knowing that phantom reads can occur might lead to specific indexing strategies or the restructuring of queries to minimize the impact of concurrent insertions/deletions. Overly strict isolation levels (like `SERIALIZABLE`) can hurt performance, so choosing the weakest acceptable level is crucial.

5.  **Transaction Management in ORMs and Application Frameworks:** Object-Relational Mappers (ORMs) and web frameworks often provide abstractions for transaction management. A deep understanding of concurrency anomalies helps developers correctly configure these tools and debug issues related to data integrity that might arise from default isolation settings.

6.  **Real-time Data Processing and Stream Analytics:** In systems that process high volumes of data in real-time, ensuring consistency across rapidly changing datasets is a major challenge. Anomalies can lead to incorrect aggregations or faulty insights derived from streaming data.

## 11. Self-check questions

1.  Describe a scenario involving an online auction where a dirty read could potentially cause a bidder to believe they won an item, only for that belief to be invalidated.
2.  Explain the fundamental difference between a non-repeatable read and a phantom read. Provide a simple example for each, using a `Books` table with `title` and `author` columns.
3.  A banking application uses the `READ COMMITTED` isolation level. Can a transaction in this application experience a non-repeatable read? Justify your answer with a sequence of operations.
4.  Consider a database table `Employees` with columns `employee_id`, `name`, and `department`. Transaction $T_A$ executes `SELECT COUNT(*) FROM Employees WHERE department = 'Sales';`. Immediately after, Transaction $T_B$ updates an employee's department from 'Marketing' to 'Sales' and commits. If $T_A$ then re-executes the same `COUNT(*)` query, what anomaly might occur? How would this differ if $T_B$ instead *deleted* an employee from the 'Sales' department?
5.  Why is the `SERIALIZABLE` isolation level considered the "gold standard" for preventing concurrency anomalies, and what are the typical tradeoffs associated with using it in a high-concurrency environment?