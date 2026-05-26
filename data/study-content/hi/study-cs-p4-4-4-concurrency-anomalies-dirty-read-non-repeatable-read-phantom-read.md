## 1. The one-sentence answer
**Concurrency anomalies are unwanted side-effects that appear when two or more transactions execute concurrently without proper isolation controls.**

In a database, a transaction is supposed to run as if it were alone on the system. When multiple transactions overlap in time and share data, one transaction can read values that another transaction has not yet committed, can see the same row change its value midway, or can see new rows appear that did not exist at the start of its scan. These three behaviours are called dirty read, non-repeatable read and phantom read respectively.

Aap soch sakte ho ki har transaction ek isolated bubble mein chal rahi hai, lekin agar bubble mein holes hain to dusri transactions ke changes leak ho jaate hain. Yeh holes exactly woh isolation levels hain jo DBMS aapko choose karne deta hai.

> [!NOTE]
> The single most important realisation is that these anomalies are not bugs in your code; they are direct, predictable consequences of relaxing the isolation guarantee in exchange for higher throughput.

## 2. Why this matters — concrete and current
Banking core systems at institutions such as HDFC and JPMorgan Chase must prevent dirty reads so that a funds-transfer transaction never credits an account on the basis of money that is later rolled back.

E-commerce order-processing pipelines at Amazon and Flipkart rely on repeatable-read guarantees when they calculate inventory totals; a non-repeatable read can cause the same SKU to be oversold within the same order batch.

Airline reservation engines (Sabre, Amadeus) use snapshot isolation to avoid phantom reads while multiple travel agents simultaneously search and book seats on the same flight; a newly inserted booking row must not appear inside an already-running availability query.

High-frequency trading platforms at Jane Street and Citadel run thousands of short transactions per second against market-data tables; any of the three anomalies can produce incorrect risk calculations that are later discovered only after monetary loss.

Google Spanner and CockroachDB expose externally consistent snapshots precisely because their designers measured the throughput cost of eliminating phantom reads at planet-scale.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| ACID properties      | You must already know that Isolation is the “I” whose relaxation produces anomalies. |
| Transaction          | You need to recognise a transaction as an atomic sequence of reads and writes.       |
| Schedule / history   | You must be able to write down the interleaved order of operations from two transactions. |
| Commit / rollback    | You must understand that uncommitted changes can be undone.                          |

If any row is missing, pause and read the corresponding section on transactions before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — A transaction is a sequence that must appear atomic
A transaction groups several read and write operations so that either all of them persist or none of them do.  
Example: T1 transfers ₹100 from A to B by reading A, subtracting 100, writing A, then reading B, adding 100 and writing B.  
Formal statement: a transaction \(T_i\) is a partial order of operations \(\{r_i(x), w_i(x), \dots, c_i\}\) where \(c_i\) denotes commit.  
> [!WARNING] Treating each SQL statement as its own transaction silently changes the anomaly surface you are analysing.

### Step 2 — Concurrency means interleaving of operations
When two transactions run at the same time the database merges their operations into one schedule.  
Example schedule: \(r_1(A), r_2(A), w_2(A), c_2, r_1(A)\).  
Formal statement: a schedule \(S\) is a total order that respects the partial order of each individual transaction.

### Step 3 — Dirty read occurs when a transaction reads uncommitted data
If T2 writes a value and T1 reads it before T2 commits, T1 has seen a value that may later disappear.  
Formal statement: there exists \(w_j(x)\) before \(r_i(x)\) and \(c_j\) appears after \(r_i(x)\) in the schedule.  
> [!WARNING] Many novices think “the database will never let me see uncommitted data”; that is only true under repeatable-read or stricter isolation.

### Step 4 — Non-repeatable read occurs when the same row changes value inside one transaction
T1 reads row X, later T2 updates and commits X, then T1 reads X again and obtains a different value.  
Formal statement: \(r_i(x)\) appears twice with a \(w_j(x)c_j\) between them.

### Step 5 — Phantom read occurs when new rows satisfying a predicate appear
T1 scans all rows where balance > 1000; T2 inserts a new qualifying row and commits; T1 repeats the scan and sees an extra row.  
Formal statement: predicate \(P\) evaluated by \(T_i\) returns different cardinalities because of inserts or deletes by another committed transaction.

### Step 6 — Isolation level is the knob that disables each anomaly
Read-uncommitted permits all three; read-committed removes dirty reads; repeatable-read removes non-repeatable reads; serializable removes phantoms as well.

## 5. Worked examples — har step show karo

**Example 1 — Dirty read**  
*Given:* T1 and T2 both access account balance.  
*Find:* Does T1 see an uncommitted update?  
Schedule: \(w_2(A,150), r_1(A), c_2, c_1\).  
Step 1: T2 writes 150 but has not yet committed.  
Step 2: T1 reads the value 150.  
Step 3: Because commit of T2 occurs after the read, the read is dirty.  
**Final answer: dirty read occurs.**  
*Reflection:* The schedule is short yet already demonstrates the exact ordering that produces the anomaly.

**Example 2 — Non-repeatable read**  
*Given:* T1 reads the same cell twice.  
*Find:* Value changes between the two reads.  
Schedule: \(r_1(A), w_2(A,200), c_2, r_1(A)\).  
Step 1: First read returns original value.  
Step 2: T2 updates and commits.  
Step 3: Second read returns new value.  
**Final answer: non-repeatable read.**  
*Reflection:* The same logical read appears twice inside one transaction, violating repeatability.

**Example 3 — Phantom read**  
*Given:* T1 counts rows satisfying balance > 1000.  
*Find:* Count changes after another transaction inserts.  
Schedule: \(r_1(\sigma_{>1000}), w_2(\text{insert new row}), c_2, r_1(\sigma_{>1000})\).  
Step 1: First scan returns 5 rows.  
Step 2: T2 inserts a sixth qualifying row.  
Step 3: Second scan returns 6 rows.  
**Final answer: phantom read.**  
*Reflection:* The predicate, not a single row, is the source of the inconsistency.

**Example 4 — Mixed anomalies under read-committed**  
*Given:* Same schedule as Example 3 but isolation level set to read-committed.  
*Find:* Which anomalies survive?  
Read-committed blocks dirty reads, yet the phantom still occurs because the second scan re-evaluates the predicate after the insert commit.  
**Final answer: phantom read remains.**  
*Reflection:* Choosing an isolation level is equivalent to selecting which subset of anomalies you are willing to tolerate.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming every SELECT is repeatable | Default isolation in many DBMS is read-committed   | Explicitly set isolation level or use SELECT … FOR SHARE |
| Forgetting that phantoms involve predicates | Students think only about single-row updates       | Always write the WHERE clause when analysing scans   |
| Using autocommit mode while testing | Each statement becomes its own transaction         | Wrap test statements in explicit BEGIN … COMMIT      |
| Ignoring index-only scans         | Phantom detection may be missed if only index is read | Force a table scan or use serializable isolation     |
| Believing snapshot isolation eliminates all anomalies | Write skew can still appear                        | Use true serializable or add explicit locking        |
| Mixing different isolation levels inside one application | Connection pool hands out connections with varying settings | Centralise session configuration at startup          |

## 7. The textbook-precise statement
A schedule is said to be dirty-read-free if, for every read \(r_i(x)\) of a data item \(x\), the transaction \(T_j\) that wrote the value satisfies \(c_j <_{S} r_i(x)\). A schedule avoids non-repeatable reads if, whenever \(r_i(x)\) and a later \(r_i(x)\) both appear in the same transaction, no write \(w_j(x)c_j\) lies between them. A schedule avoids phantoms if, for every predicate \(P\), the set of tuples satisfying \(P\) read by a transaction remains unchanged by inserts or deletes of any other committed transaction. These definitions appear in Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §16.4.

## 8. Visual — diagram or schematic
```text
Time ─────────────────────────────────────────────▶
T1:  r(A)          r(A)               c1
T2:       w(A=200)      c2
T3:                 insert(row) c3
Dirty:   ▲ (uncommitted)
Non-repeat:     ▲ (value changed)
Phantom:                 ▲ (new row appears)
```

## 9. The memory technique
1. **The hook** — Picture three leaking buckets: the first leaks before the tap is closed (dirty), the second changes colour while you watch (non-repeatable), the third sprouts new buckets you never counted (phantom).
2. **What to overlearn** — Read-uncommitted permits all three; read-committed stops only dirty; repeatable-read stops dirty + non-repeatable; serializable stops all three.
3. **Spaced-repetition schedule** — Review the three definitions after 1 day, again after 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If you forget the names, reconstruct by asking: “Can I read uncommitted data? Can the same row change value? Can new rows satisfying my predicate appear?”

## 10. What this unlocks
Mastering these anomalies lets you reason correctly about every higher-level concurrency control mechanism.

- Choosing the correct isolation level for each workload
- Implementing optimistic and pessimistic locking
- Designing conflict-serializable schedules
- Using snapshot isolation and multiversion concurrency control (MVCC)
- Writing correct application-level retry logic for serialization failures

## 11. Self-check — five questions, no answers
1. In a schedule containing \(w_2(x), r_1(x), c_2\), which anomaly is present if T1 later commits?
2. Write a two-transaction schedule that produces a phantom read but never a dirty read.
3. Under which ANSI isolation level does the following schedule become legal: \(r_1(\sigma_P), w_2(\text{insert satisfying }P), c_2, r_1(\sigma_P)\)?
4. A banking application must never credit an account on rolled-back funds yet can tolerate a recount of total balance within one reporting transaction. Which minimal isolation level satisfies both constraints?
5. Explain why snapshot isolation still permits write skew even though it eliminates the three classic anomalies listed above.