## 1. The one-sentence answer
**Transaction isolation levels define the degree to which one transaction must be isolated from the effects of other concurrent transactions in a database.**

These levels exist because real systems allow multiple transactions to run at the same time for performance, yet they must still protect data correctness. The four standard SQL levels—READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE—form a hierarchy that trades off between stronger consistency guarantees and higher concurrency.

At the weakest level a transaction can read data that another transaction has not yet committed; at the strongest level the database guarantees behaviour identical to running every transaction one after another. The choice of level therefore directly controls which anomalies (dirty read, non-repeatable read, phantom read) are still possible.

> [!NOTE]
> The single most important insight is that isolation is not a single switch; each successively stronger level simply adds one more rule that the database must enforce, and each added rule costs extra locking or validation work.

## 2. Why this matters — concrete and current
Banking core systems at institutions such as HDFC and JPMorgan use REPEATABLE READ or SERIALIZABLE when transferring funds so that the same account balance is seen consistently inside one transaction even if market feeds update the same row.

Airline reservation platforms (Amadeus, Sabre) run thousands of seat-booking transactions per second; they choose READ COMMITTED for most read-only availability checks and escalate to SERIALIZABLE only for the final seat-assignment step to eliminate phantom reads of newly inserted rows.

High-frequency trading engines at firms like Jane Street rely on SERIALIZABLE isolation inside their order-matching database so that two competing algorithms never both believe they have executed against the same order book snapshot.

Modern cloud databases such as Amazon Aurora and Google Spanner expose tunable isolation so that ML feature-store writers can use READ COMMITTED for high-throughput ingestion while downstream training jobs request REPEATABLE READ to obtain a stable snapshot of feature values across millions of rows.

Semiconductor fabrication MES systems (Applied Materials, ASML) record process telemetry from hundreds of concurrent equipment controllers; they use REPEATABLE READ to guarantee that a single lot-tracking transaction sees the same set of measurement rows even while new sensor data arrives.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| ACID properties          | Isolation is the “I” in ACID; the other three properties interact with isolation choices. |
| Read/write locks         | Every isolation level is implemented by acquiring or releasing locks at different moments. |
| Dirty / non-repeatable / phantom anomalies | These three phenomena are exactly what the levels are designed to prevent or allow. |
| Snapshot isolation       | Many engines implement REPEATABLE READ via snapshots; understanding MVCC helps later. |

If any row above is unfamiliar, pause and read the corresponding section on ACID and locking before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Observe the problem of concurrent reads
When two transactions run at the same time, one may read a value that the other is still changing.  
Example: T1 reads balance = 100; T2 then subtracts 50 and commits; T1 reads again and now sees 50.  
Formally, a schedule permits a dirty read if a transaction reads a value written by another uncommitted transaction:  
$$ \exists T_i, T_j, x : w_j(x) \prec r_i(x) \land \neg commit_j \prec r_i(x) $$  
> [!WARNING] If you forget that the writer may still abort, you will underestimate how many anomalies can appear.

### Step 2 — Eliminate dirty reads (READ COMMITTED)
The database now holds a write lock until commit, so a reader never sees uncommitted data.  
Example: T2 cannot let T1 read the new balance until T2 commits.  
Formal rule: every read must see only committed writes.  
> [!WARNING] This level still allows the same transaction to read different values on successive reads of the same row.

### Step 3 — Prevent non-repeatable reads (REPEATABLE READ)
The database now keeps read locks until the transaction ends, or uses a snapshot taken at the first read.  
Example: T1 reads balance twice; even if T2 commits an update in between, T1 continues to see the original value.  
Formal guarantee:  
$$ \forall x, r_i(x) \text{ appears at most once per distinct value of } x \text{ inside } T_i $$  
> [!WARNING] Phantom reads of newly inserted rows that match a previous predicate are still possible.

### Step 4 — Eliminate phantoms (SERIALIZABLE)
The scheduler ensures the concurrent schedule is equivalent to some serial order of the same transactions.  
Example: T1 reads all rows where account_type = 'savings'; T2 inserts a new savings row; under SERIALIZABLE T2 must wait or T1 must be re-executed.  
Formal statement: the committed schedule must be conflict-serializable (its precedence graph must be acyclic).  
> [!WARNING] Most engines pay the cost of this guarantee either by range locks or by aborting transactions that would violate serializability.

### Step 5 — Map levels to anomaly table
The four levels correspond exactly to the cumulative removal of the three anomalies plus one extra (serializability). This mapping is the textbook definition used by every SQL standard implementation.

## 5. Worked examples — har step show karo

**Example 1 — Dirty read under READ UNCOMMITTED**  
*Given:* T1 begins, writes balance = 200 but does not commit; T2 runs at READ UNCOMMITTED and reads the same row.  
*Find:* Can T2 see 200?  
Step 1: T1 acquires no commit-time lock yet.  
Step 2: T2 issues SELECT without waiting.  
Step 3: T2 receives the uncommitted value.  
*Why* each step: because the isolation level explicitly permits reading uncommitted data.  
**Final answer: T2 sees the dirty value 200.**

**Example 2 — Non-repeatable read under READ COMMITTED**  
*Given:* T1 reads balance = 100 at READ COMMITTED; T2 updates and commits balance = 50; T1 reads again.  
*Find:* Value seen on second read.  
Step 1: T1 releases its short-duration read lock after first SELECT.  
Step 2: T2 acquires write lock, updates, commits.  
Step 3: T1 re-acquires read lock and sees new committed value.  
*Why* each step: READ COMMITTED only guarantees committed data, not repeatable values.  
**Final answer: T1 sees 50 on second read.**

**Example 3 — Phantom read under REPEATABLE READ**  
*Given:* T1 counts savings accounts (returns 10) at REPEATABLE READ; T2 inserts an 11th savings account and commits; T1 repeats the count.  
*Find:* Second count value.  
Step 1: T1 holds row locks but not predicate lock.  
Step 2: T2 inserts a new row that satisfies the predicate.  
Step 3: T1’s second query sees the new row because phantoms are not prevented.  
*Why* each step: REPEATABLE READ protects existing rows, not future inserts.  
**Final answer: T1 sees count = 11.**

**Example 4 — Full serializability**  
*Given:* Same schedule as Example 3 but both transactions declared SERIALIZABLE.  
*Find:* Outcome.  
Step 1: Scheduler builds precedence graph.  
Step 2: Edge T2 → T1 appears because of the phantom conflict.  
Step 3: To keep graph acyclic, T2 is blocked until T1 commits or T1 is aborted and retried.  
*Why* each step: serializability requires conflict-equivalence to a serial schedule.  
**Final answer: one transaction waits or aborts; no anomaly occurs.**

*Reflection:* The progression shows how each extra rule removes exactly one more anomaly while increasing the chance of blocking or aborts.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming REPEATABLE READ prevents phantoms | Many developers confuse row locks with predicate locks | Explicitly test with concurrent INSERT statements    |
| Using SERIALIZABLE everywhere     | Over-estimate of correctness requirement            | Profile first; start at READ COMMITTED then escalate |
| Forgetting that READ UNCOMMITTED allows dirty writes | ANSI SQL still permits them at this level           | Never use READ UNCOMMITTED for financial data        |
| Believing snapshot isolation equals SERIALIZABLE | Snapshot prevents some but not all write skews      | Check for write-skew anomalies separately            |
| Ignoring lock escalation cost     | SERIALIZABLE often escalates to table locks         | Monitor lock waits and tune index selectivity        |
| Mixing isolation levels inside one application | Different modules choose different defaults         | Centralise transaction configuration in one layer    |

## 7. The textbook-precise statement
A transaction schedule is conflict-serializable if and only if its precedence (serialization) graph is acyclic. The four isolation levels defined in SQL:1992 are characterised by the anomalies they permit: READ UNCOMMITTED permits dirty reads; READ COMMITTED additionally forbids dirty reads; REPEATABLE READ additionally forbids non-repeatable reads; SERIALIZABLE additionally forbids phantoms and guarantees conflict serializability. (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7th ed., §16.4–16.6.)

## 8. Visual — diagram or schematic
```
T1                  T2
--                  --
R(x)                
                    W(x)          // dirty if UNCOMMITTED
R(x) again          // non-repeatable if only COMMITTED
                    Commit
C(x)                // phantom possible here under REPEATABLE READ
```
Horizontal arrows show time; vertical dashed lines indicate where each anomaly can first appear.

## 9. The memory technique

**The hook** — Picture four nested fortress walls; each stronger isolation level adds one more wall that an outsider transaction cannot cross.

**What to overlearn** — The exact mapping: UNCOMMITTED (all three anomalies), COMMITTED (no dirty), REPEATABLE (no dirty + no non-repeatable), SERIALIZABLE (no anomalies + serializable).

**Spaced-repetition schedule** — Review the anomaly table after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — If you forget a level name, rebuild by asking: “Which single anomaly must still be possible at this strength?” and walk upward from dirty read.

## 10. What this unlocks
Once you control isolation levels you can safely design concurrent algorithms that touch shared state without data corruption.

- Snapshot isolation and MVCC implementations become understandable.
- Write-skew detection and predicate locking techniques follow directly.
- Optimistic concurrency control papers (e.g., Kung & Robinson 1981) become readable.
- You can tune production databases for both correctness and throughput.

## 11. Self-check — five questions, no answers
1. Which isolation level permits a transaction to read a row that another transaction later rolls back?
2. In a banking transfer, which anomaly would corrupt the total balance if it occurred?
3. Draw the precedence graph for two transactions where T1 reads a row that T2 later inserts; at which level does the scheduler have to intervene?
4. A developer sets REPEATABLE READ yet still observes a new row appearing on the second SELECT … WHERE. Explain why.
5. Given a workload that is 95 % read-only and 5 % updates, argue whether SERIALIZABLE or READ COMMITTED yields higher throughput and why.