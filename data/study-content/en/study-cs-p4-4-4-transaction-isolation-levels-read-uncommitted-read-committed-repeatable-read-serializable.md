## 1. The one-sentence answer
**Transaction isolation levels are four standard contracts—READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE—that specify exactly which concurrency anomalies a database must prevent between simultaneously executing transactions.**

In a database, multiple transactions often read and write the same rows at the same time. Without rules, one transaction can observe another’s partial work, see a row change value mid-execution, or discover new rows that appear or disappear between its own reads. Each isolation level draws a different line: it promises to block a precise subset of these anomalies while allowing the rest, thereby trading off consistency against concurrency and performance.

The four levels form a strict hierarchy. READ UNCOMMITTED permits every anomaly. Each subsequent level eliminates one more class of anomaly until SERIALIZABLE guarantees behaviour identical to running every transaction one after another. The choice of level therefore determines both the correctness guarantees a programmer can rely on and the locking or snapshot overhead the engine must pay.

> [!NOTE]
> The decisive insight is that “correct” does not always require full serializability; many business operations remain safe under weaker guarantees, and the engine can therefore allow far higher throughput by deliberately permitting a controlled subset of anomalies.

## 2. Why this matters — concrete and current
In high-frequency trading platforms at firms such as Jane Street and Citadel Securities, a market-data feed and an order-matching engine run as concurrent transactions. READ COMMITTED prevents a trader from acting on a quote that was rolled back moments later, while still allowing the engine to accept new orders without waiting for full serializability.

Airline reservation systems at carriers such as Delta and United rely on REPEATABLE READ when a customer’s session locks a seat inventory count for several seconds. The level guarantees that the displayed seat count does not change inside one booking transaction even if another concurrent booking commits, eliminating double-sale risk without forcing every reservation through a single global lock.

E-commerce order-fulfilment pipelines at Amazon and Shopify use SERIALIZABLE for the final debit-and-ship step that both decrements stock and records payment. The guarantee ensures that two simultaneous orders for the last item cannot both succeed, preserving inventory invariants that weaker levels would violate.

Research prototypes of distributed ledgers (for example, the Calvin and TAPIR systems described in OSDI and SOSP papers) expose configurable isolation levels to application developers. The choice directly determines whether a smart-contract execution can observe stale cryptocurrency balances or must pay the cost of full serial ordering across replicas.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| **Transaction**          | All isolation rules are defined relative to the begin–commit/abort boundaries of a transaction. |
| **ACID properties**      | Isolation is one of the four ACID guarantees; the others (atomicity, consistency, durability) interact with it. |
| **Read/write anomalies** | Dirty read, non-repeatable read, phantom read, and write skew are the precise phenomena the levels distinguish. |
| **Locking and snapshots**| Implementation mechanisms (two-phase locking, multiversion concurrency control) realise the guarantees the levels promise. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Interference arises from interleaving
When two transactions execute concurrently, their reads and writes can be interleaved by the scheduler. A transaction may therefore observe data that another transaction has written but not yet committed.

Consider T1 writing a new balance and T2 reading that balance before T1 commits. If T1 later aborts, T2 has seen a value that never existed in the committed database.

Formally, an interleaving is a total order on the operations of a set of transactions that respects each transaction’s internal order.  
$$I = \text{total order on }\bigcup_i\text{ops}(T_i)\text{ s.t. }\forall T_i, \text{ops}(T_i)\text{ appear in program order.}$$

> [!WARNING]
> Treating “concurrent” as merely “fast sequential execution” hides the fact that an abort can erase writes already observed by another transaction.

### Step 2 — Dirty read: seeing uncommitted data
A dirty read occurs when a transaction reads a value written by another transaction that has not yet committed.

T1 writes balance = 100, T2 reads 100, T1 aborts. T2 now holds a balance that was never committed.

A schedule permits dirty reads when it contains an edge \(w_1(x)\dots r_2(x)\) with no commit of T1 between them.

> [!WARNING]
> Allowing dirty reads also permits cascading aborts: aborting T1 forces every dependent transaction to abort as well.

### Step 3 — Non-repeatable and phantom reads
A non-repeatable read occurs when a transaction reads the same row twice and obtains different committed values. A phantom read occurs when a transaction repeats a predicate query and the set of rows satisfying the predicate changes because another transaction inserted or deleted rows.

Both anomalies require that the first read saw a committed state and the second read saw a later committed state.

Formally, a schedule contains a non-repeatable read on item \(x\) if \(r_i(x)\dots c_j\dots r_i(x)\) appears with \(c_j\) between the two reads of \(T_i\).

> [!WARNING]
> Snapshot isolation eliminates non-repeatable reads on existing rows but still permits phantoms unless additional predicate locking is used.

### Step 4 — Write skew and serialisation anomalies
Write skew arises when two transactions each read a predicate, decide on disjoint updates, and both commit, producing a final state that no serial execution could have produced.

Classic example: two doctors each read that on-call coverage is adequate, then both remove themselves from the roster, leaving zero coverage.

The schedule is not serialisable when its conflict graph contains a cycle.

> [!WARNING]
> REPEATABLE READ usually blocks write skew only when row locks are taken; predicate-based write skew still requires SERIALIZABLE.

### Step 5 — The four ANSI levels eliminate successive anomalies
The SQL standard defines four isolation levels by the anomalies they must prevent:

- READ UNCOMMITTED permits dirty reads.
- READ COMMITTED forbids dirty reads but allows non-repeatable and phantom reads.
- REPEATABLE READ forbids dirty and non-repeatable reads but allows phantoms.
- SERIALIZABLE forbids all anomalies, guaranteeing conflict or view serialisability.

The progression corresponds to successively stronger constraints on the allowed schedules.

### Step 6 — Formal statement of isolation levels
A level \(L\) is defined by the set of forbidden anomalies \(A_L\). A schedule is valid under \(L\) iff it contains none of the anomalies in \(A_L\).

For SERIALIZABLE, the schedule must be conflict-equivalent to some serial schedule: its precedence graph must be acyclic.

## 5. Worked examples — every step shown

**Example 1 — Dirty read under READ UNCOMMITTED**  
*Given:* T1 writes balance = 200 then aborts; T2 reads balance.  
*Find:* Does READ UNCOMMITTED allow T2 to observe 200?  
Step 1: T1 executes write(balance,200). *Why*: write is buffered until commit.  
Step 2: T2 executes read(balance) and obtains 200. *Why*: READ UNCOMMITTED places no read lock and does not wait for commit.  
Step 3: T1 aborts and restores previous value. *Why*: atomicity requires rollback.  
**200**  
*Reflection*: The example shows that even a single write–read pair can expose uncommitted state when no isolation contract forbids it.

**Example 2 — Non-repeatable read under READ COMMITTED**  
*Given:* T1 reads balance twice; T2 updates and commits between the reads.  
*Find:* Can the two reads return different values?  
Step 1: T1 reads committed balance = 100. *Why*: READ COMMITTED only guarantees that reads see committed data.  
Step 2: T2 writes balance = 150 and commits. *Why*: write is now visible.  
Step 3: T1 reads balance again and obtains 150. *Why*: no lock protects the row across T1’s duration.  
**Different values observed**  
*Reflection*: The second read sees a later committed snapshot; this is exactly the anomaly READ COMMITTED still permits.

**Example 3 — Phantom prevented by REPEATABLE READ**  
*Given:* T1 counts rows where account_type = 'savings'; T2 inserts a new savings row and commits.  
*Find:* Does REPEATABLE READ guarantee the same count for T1?  
Step 1: T1 executes SELECT COUNT(*) … and obtains 42. *Why*: snapshot or range lock taken at first read.  
Step 2: T2 inserts a new row satisfying the predicate and commits. *Why*: insertion is outside T1’s locked range under REPEATABLE READ.  
Step 3: T1 repeats the count and still obtains 42. *Why*: the level’s guarantee blocks non-repeatable predicate results.  
**Count remains 42**  
*Reflection*: The example distinguishes phantom protection from mere row-value protection.

**Example 4 — Serialisation anomaly under REPEATABLE READ**  
*Given:* Two transactions each read on-call count = 2, then each deletes its own on-call row.  
*Find:* Can both commit under REPEATABLE READ yet produce an invalid state?  
Step 1: Both read the same predicate result. *Why*: REPEATABLE READ only locks existing rows read.  
Step 2: Each deletes its own row. *Why*: writes do not conflict on the read set.  
Step 3: Both commit; final count = 0. *Why*: no cycle detection performed.  
**Write-skew anomaly accepted**  
*Reflection*: Only SERIALIZABLE forces the engine to detect the cyclic dependency and abort one transaction.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming REPEATABLE READ prevents all write skew | Many engines implement it with row locks only | Test with the exact predicate-write pattern or choose SERIALIZABLE |
| Believing READ COMMITTED never sees uncommitted data | The level only guarantees committed reads, not repeatable ones | Use explicit snapshots when a consistent view across multiple statements is required |
| Forgetting that SERIALIZABLE can still abort | True serialisability may require aborts on conflict | Design transactions to be short or retryable |
| Using the default level of the driver without checking | JDBC defaults to READ COMMITTED; application silently weakens guarantees | Set isolation level explicitly in connection or transaction begin |
| Ignoring phantom reads when using range queries | Index scans without predicate locks allow new rows | Choose REPEATABLE READ or SERIALIZABLE, or add explicit locking |
| Expecting snapshot isolation to equal SERIALIZABLE | Snapshot isolation permits write skew | Verify with the “doctors on call” test case |
| Mixing isolation levels inside one application | Different modules see different anomaly sets | Standardise on one level or document per-module contracts |

## 7. The textbook-precise statement
In Database System Concepts, 7th edition (Silberschatz, Korth, Sudarshan), §16.5–16.6, an isolation level \(L\) is defined by the set of forbidden phenomena: dirty read, fuzzy read (non-repeatable read), and phantom read. SERIALIZABLE is additionally defined as conflict serialisability: a schedule \(S\) is serialisable if its precedence graph \(G = (T, E)\) where \((T_i,T_j)\in E\) whenever an operation of \(T_i\) precedes and conflicts with an operation of \(T_j\) is acyclic. The four ANSI levels correspond exactly to the subsets of phenomena they prohibit, with the engine required to produce only schedules free of those phenomena.

## 8. Visual — diagram or schematic
```text
Anomaly          READ UNCOMMITTED   READ COMMITTED   REPEATABLE READ   SERIALIZABLE
Dirty read            allowed          forbidden        forbidden        forbidden
Non-repeatable        allowed          allowed          forbidden        forbidden
Phantom read          allowed          allowed          allowed          forbidden
Write skew            allowed          allowed          allowed*         forbidden
```
*Some engines block write skew under REPEATABLE READ via gap locks; others do not.

## 9. The memory technique
1. **The hook** — Picture four nested fortress walls. The outermost wall (READ UNCOMMITTED) lets any scout walk straight in. Each inner wall removes one more type of intruder (dirty footprints, changing numbers, appearing ghosts) until the innermost vault (SERIALIZABLE) admits only one visitor at a time.
2. **What to overlearn** — The exact mapping of each level to the three classic anomalies plus write skew; the sentence “SERIALIZABLE = acyclic conflict graph.”
3. **Spaced-repetition schedule** — Review the anomaly table at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by listing every operation pair that can produce each anomaly, then ask which level must block that pair.

## 10. What this unlocks
Mastery of isolation levels is the prerequisite for reasoning about correctness in any system that uses optimistic or pessimistic concurrency control. It directly enables the study of snapshot isolation, serialisable snapshot isolation, and distributed concurrency control protocols such as two-phase commit with strict ordering.

- Next: Snapshot isolation and its anomalies
- Next: Conflict serialisability and precedence graphs
- Next: Distributed transaction protocols (Calvin, Spanner)
- Next: Application-level compensation patterns when weaker isolation is chosen

## 11. Self-check — five questions, no answers
1. Name the weakest isolation level that prevents a transaction from reading a balance that was written by a still-active transfer.
2. A schedule contains the operations r1(x) w2(x) c2 r1(x). Which isolation level(s) forbid this schedule?
3. Under REPEATABLE READ, can two concurrent transactions both successfully delete the last two rows of a table when each checks that at least two rows remain?
4. Draw the precedence graph for a schedule that exhibits write skew and state whether it is serialisable.
5. A banking application must guarantee that the sum of two account balances never goes negative across a transfer. Which isolation level is the weakest that still prevents the anomaly, and why might SERIALIZABLE be overkill?