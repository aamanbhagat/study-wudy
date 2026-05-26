## 1. The one-sentence answer
**Concurrency anomalies are violations of isolation that occur when one transaction reads or writes data affected by another transaction that has not yet committed or has committed after the first read.**

In a database, multiple transactions often execute at the same time and interleave their operations on shared data. Without sufficient isolation, a transaction can observe intermediate or inconsistent states produced by another transaction. The three classic anomalies capture distinct ways this inconsistency appears: a transaction may read values that were never meant to be permanent, may see different values on repeated reads of the same item, or may see a changing set of rows that match a predicate.

These anomalies arise directly from the tension between concurrency (for performance) and correctness (for the ACID guarantee of isolation). They are not bugs in the data itself but predictable consequences of allowing one transaction’s uncommitted or newly committed changes to become visible to another.

> [!NOTE]
> The anomalies are not independent; each corresponds to a specific relaxation of the serializability requirement, and preventing one does not automatically prevent the others.

## 2. Why this matters — concrete and current
In high-frequency trading platforms at firms such as Jane Street and Citadel, order-matching engines rely on snapshot isolation to avoid non-repeatable reads when a single order book is updated by thousands of traders per second; a phantom read would allow a trader to see an inconsistent set of open orders and submit an invalid arbitrage.

Airline reservation systems at companies such as Amadeus and Sabre must prevent dirty reads during seat assignment; an uncommitted booking that later rolls back would otherwise let two passengers be assigned the same seat, violating regulatory safety requirements.

Modern distributed databases such as CockroachDB and TiDB implement strict serializability precisely to eliminate all three anomalies across shards; their 2023 papers show that even a single phantom read in a multi-region inventory ledger can produce negative stock counts that cascade into lost revenue and audit failures.

Semiconductor fabrication plants using real-time process-control databases (e.g., those supplied by Applied Materials) treat a non-repeatable read of wafer yield statistics as a critical fault; an engineer adjusting etch parameters on stale data can scrap an entire lot worth millions of dollars.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| ACID properties          | Isolation is the “I” that these anomalies violate |
| Transaction              | Atomic unit whose operations must appear indivisible |
| Schedule / history       | Formal interleaving of read and write operations |
| Commit / abort           | Determines whether a change is permanent or discarded |
| Row vs. predicate        | Distinguishes non-repeatable read from phantom read |

## 4. Building the idea — from intuition to formalism

### Step 1 — Transactions produce tentative writes
A transaction may write a value that it later discards on abort. Until commit, that value is not part of any consistent database state.  
Example: T1 writes X = 5, then aborts.  
Formal statement: a write w1(X) belongs to the committed projection only after c1 occurs.  
> [!WARNING] Treating every write as immediately durable will make you accept dirty reads as correct.

### Step 2 — Dirty read: observing an uncommitted write
Another transaction T2 may read the value written by T1 before T1 commits.  
Example: T1 writes X = 5; T2 reads X = 5; T1 aborts. T2 has seen a value that never existed.  
Formal statement: r2(X) occurs after w1(X) but before c1 (or a1).  
> [!WARNING] Confusing “read after write” with “read after commit” hides the durability violation.

### Step 3 — Non-repeatable read: repeated read of the same item yields different committed values
T2 reads X, then later reads X again and obtains a different committed value because T1 committed an update in between.  
Example: T2 reads X = 10; T1 writes X = 20 and commits; T2 reads X = 20.  
Formal statement: r2(X) … c1 … r2(X) with distinct values and both reads in the same transaction.  
> [!WARNING] Allowing the second read to see the first read’s own write does not protect against another transaction’s committed update.

### Step 4 — Phantom read: repeated predicate evaluation yields different sets of rows
T2 evaluates a predicate (e.g., “all accounts with balance > 1000”) twice and obtains different cardinalities because T1 inserted or deleted a qualifying row and committed.  
Example: T2 counts rows where balance > 1000 and gets 3; T1 inserts a new row with balance 2000 and commits; T2 counts 4.  
Formal statement: r2(P) … c1 … r2(P) where the sets satisfying predicate P differ.  
> [!WARNING] Row-level locking alone cannot prevent phantoms; predicate or range locks are required.

### Step 5 — Isolation levels as successive restrictions on anomalies
Read Uncommitted permits all three; Read Committed eliminates dirty reads; Repeatable Read eliminates non-repeatable reads; Serializable eliminates phantoms as well.  
Formal statement: an isolation level corresponds to the largest set of schedules that avoid a given subset of anomalies.  
> [!WARNING] Vendor-specific names (e.g., “Snapshot”) can mask which anomalies remain possible.

### Step 6 — Serializability as the gold standard
A schedule is conflict-serializable if it is conflict-equivalent to some serial schedule; absence of all three anomalies is necessary but not always sufficient for conflict serializability.  
Formal statement: schedule S is conflict-serializable iff its precedence graph is acyclic (Silberschatz et al., Database System Concepts, 7e, §16.4).  
> [!WARNING] Preventing anomalies via locking can still allow non-conflict serializable schedules if write skew occurs.

## 5. Worked examples — every step shown

**Example 1 — Dirty read**  
*Given:* T1: w(X,5), a1; T2: r(X).  
*Find:* Does T2 observe a dirty read?  
T1 performs w1(X,5).  
*Why:* The write occurs inside T1.  
T1 performs a1 before c1.  
*Why:* The transaction aborts, discarding the write.  
T2 performs r2(X) after w1(X,5) but before a1.  
*Why:* The read therefore sees a value never committed.  
**T2 observes a dirty read.**

*Reflection:* The anomaly is created solely by the timing of the read relative to abort; no predicate or repeated access is involved.

**Example 2 — Non-repeatable read**  
*Given:* T1: w(X,20), c1; T2: r(X), r(X).  
*Find:* Does T2 see a non-repeatable read?  
T2 reads X and obtains 10.  
*Why:* Initial committed value is 10.  
T1 writes X = 20 and commits between the two reads of T2.  
*Why:* The commit makes the new value durable and visible.  
T2’s second read obtains 20.  
*Why:* Same item, different committed value.  
**T2 experiences a non-repeatable read.**

*Reflection:* The second read must be of the identical data item; a different item would not trigger this anomaly.

**Example 3 — Phantom read**  
*Given:* T1 inserts row R with balance = 2000 and commits; T2 evaluates “balance > 1000” twice.  
*Find:* Phantom?  
T2’s first count returns 3 rows.  
*Why:* Predicate evaluated on current committed state.  
T1 inserts R and commits.  
*Why:* The new row satisfies the predicate.  
T2’s second count returns 4 rows.  
*Why:* The set of rows satisfying the predicate changed.  
**T2 experiences a phantom read.**

*Reflection:* The anomaly is detected only when the same predicate, not the same physical rows, is re-evaluated.

**Example 4 — Mixed anomalies under Read Committed**  
*Given:* Schedule mixing dirty, non-repeatable, and phantom possibilities.  
*Find:* Which anomalies remain possible?  
Read Committed forbids any read before the writer commits.  
*Why:* Dirty reads are eliminated.  
The same item may still be updated by a committed transaction between two reads.  
*Why:* Non-repeatable reads remain.  
A committed insert can still change a predicate result.  
*Why:* Phantoms remain.  
**Only dirty reads are prevented.**

*Reflection:* Isolation-level names are defined by the anomalies they still allow, not by what they guarantee beyond the minimum.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming row locks eliminate phantoms | Row locks protect individual tuples but not the predicate space | Use predicate locking or index-range locks |
| Equating “repeatable read” with serializability | Repeatable Read still permits write skew | Request Serializable or use application-level checks |
| Believing snapshot isolation removes all anomalies | Snapshot prevents non-repeatable reads but allows write skew | Test explicitly for write skew patterns |
| Ignoring that SELECT … FOR UPDATE still allows phantoms on inserts | FOR UPDATE locks existing rows only | Combine with gap locks or use Serializable |
| Confusing “committed” with “visible to all” | Visibility rules depend on isolation level, not merely commit | Read the engine’s visibility documentation |
| Using Read Uncommitted for analytics “to improve speed” | Any abort in the writer instantly corrupts aggregates | Never use Read Uncommitted outside debugging |
| Forgetting that aborts can cascade | A dirty read may later force the reader to abort | Prefer optimistic or multi-version schemes that avoid dirty reads |

## 7. The textbook-precise statement
An anomaly occurs in a schedule S when a transaction Ti reads or writes a data item (or predicate) whose value or membership was produced by an uncommitted or subsequently committed transaction Tj (j ≠ i). The three canonical anomalies are:  
- Dirty read: ∃ r_i(x) after w_j(x) and before c_j.  
- Non-repeatable read: ∃ r_i(x) … c_j … r_i(x) with distinct values.  
- Phantom read: ∃ r_i(P) … c_j … r_i(P) with differing result sets.  

A DBMS isolation level is characterized by the subset of these anomalies it permits (Silberschatz, Korth, Sudarshan, Database System Concepts, 7e, §16.3–16.6).

## 8. Visual — diagram or schematic
```text
Time ─────────────────────────────────────────────▶
T1:  w(X,5) ---------------- a1
T2:          r(X)          (dirty read)
T3:               r(X)  r(X)          (non-repeatable)
T4:                    r(P)       r(P)  (phantom)
```
Legend: solid vertical lines mark commit points; dashed lines mark aborts. Each read arrow crosses a write or commit boundary that produces the anomaly.

## 9. The memory technique
1. **The hook** — Picture a kitchen: “Dirty dishes” (unwashed = uncommitted), “same plate changed while you look away” (non-repeatable), “new plates appearing on the table” (phantom).  
2. **What to overlearn** — Dirty = before commit; Non-repeatable = same row, different value; Phantom = same predicate, different set.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the definition of commit: any read that can see a state that is not yet (or no longer) committed is anomalous.

## 10. What this unlocks
Mastery of these anomalies lets you select and justify isolation levels, design compensating application logic for weaker levels, and understand why modern MVCC engines still expose write skew.  
- Next: Snapshot isolation and write skew  
- Serializable snapshot isolation (SSI)  
- Predicate locking and index concurrency control  
- Multi-version concurrency control (MVCC) internals  
- Isolation-level testing frameworks (e.g., Hermitage)

## 11. Self-check — five questions, no answers
1. In a schedule where T1 writes X then aborts and T2 reads X before the abort, which anomaly occurs and why is it not a non-repeatable read?  
2. Under Repeatable Read, construct a schedule that still exhibits a phantom read.  
3. Why does SELECT … FOR UPDATE fail to prevent a phantom insert on a range?  
4. A bank runs two concurrent transfers that together should keep total balance constant; under which anomaly can the total temporarily appear negative to an auditor?  
5. Given a precedence graph containing the edge r2(X) ← w1(X), which anomaly is present and which isolation level would remove that edge?