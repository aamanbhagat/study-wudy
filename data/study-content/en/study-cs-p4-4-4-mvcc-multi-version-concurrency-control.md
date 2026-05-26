## 1. The one-sentence answer
**MVCC maintains multiple timestamped versions of each data item so that concurrent transactions can read consistent snapshots without acquiring read locks.**

A transaction writes a new version rather than overwriting the old one. Each version carries the identifier of the transaction that created it and the commit timestamp. A reader selects the newest version whose creation timestamp is visible to its own snapshot, which is fixed at the start of the read.

Because writers never block readers and readers never block writers, throughput rises under read-heavy workloads. The database later reclaims versions that no longer have any active transaction that could possibly see them.

> [!NOTE]
> The decisive insight is that consistency is achieved by *selection among immutable versions* rather than by mutual exclusion on a single mutable value.

## 2. Why this matters — concrete and current
PostgreSQL has used MVCC since version 6.5; every `SELECT` reads from a snapshot defined by the transaction’s `xmin` and `xmax` visibility rules, allowing thousands of analytical queries to run against an OLTP table without blocking inserts.

Google Spanner assigns each write a globally synchronized timestamp via TrueTime and stores multiple versions per key; this design supports external consistency across data centers while still permitting non-blocking reads inside each Paxos group.

Oracle’s undo segments keep prior row versions so that long-running reports can execute under consistent-read mode even while high-frequency trading engines update the same rows millions of times per minute.

Modern key-value stores such as TiKV and CockroachDB layer MVCC on top of Raft to give snapshot isolation to machine-learning feature stores that must serve both model-training batch jobs and low-latency online feature lookups from the same table.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| ACID transactions        | MVCC is one concrete mechanism that implements the I and C properties under concurrency. |
| Transaction isolation levels | Snapshot isolation, the level MVCC naturally provides, must be compared with serializability and repeatable read. |
| Logical timestamps       | Version ordering and visibility decisions rest on monotonically increasing counters or wall-clock timestamps. |
| Write-ahead logging      | Old versions are retained until the log guarantees they are no longer needed for recovery or active readers. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace in-place updates with append-only versions
A single mutable row forces every reader to wait for the writer to finish. Instead, each write creates a brand-new physical record carrying the transaction identifier that produced it.

Example: row `balance=100` is updated by T2. The old tuple `(100, T1, 10)` remains; a new tuple `(110, T2, 11)` is appended.

Formally, a data item is now a sequence of versions  
$$
v_1, v_2, \dots, v_k
$$  
where each \(v_i\) is a triple \((value, creator\_tx, commit\_ts)\).

> [!WARNING]
> Treating the newest version as “the” value re-introduces the original locking problem; visibility must be computed from timestamps, never from physical position.

### Step 2 — Assign each transaction a snapshot timestamp
At the moment a transaction begins, it records the current commit timestamp \(t_s\). All reads inside that transaction ignore versions whose commit timestamp exceeds \(t_s\).

### Step 3 — Define visibility with a three-rule predicate
A version \(v\) created by transaction \(T_c\) is visible to transaction \(T_r\) with snapshot \(t_s\) when  
$$
commit\_ts(v) \le t_s \land T_c \text{ committed before } T_r \text{ started} \land T_c \text{ is not aborted}.
$$

### Step 4 — Writers create new versions without overwriting
An update by \(T_w\) inserts a fresh version whose creator field is \(T_w\) and whose commit timestamp is filled only after \(T_w\) commits.

### Step 5 — Reclaim versions whose visibility horizon has passed
A version may be deleted once every active transaction has a snapshot timestamp strictly greater than its commit timestamp and no earlier snapshot can legally observe it.

## 5. Worked examples — every step shown

**Example 1 — Two readers see different committed states**  
*Given:* T1 commits at ts=10 writing balance=100. T2 starts at ts=15 and writes balance=110. T3 starts at ts=12.  
*Find:* Which version does T3 read?  
Step 1: T3 records snapshot ts=12.  
*Why* — Snapshot is fixed at start.  
Step 2: Only versions with commit_ts ≤ 12 are candidates.  
*Why* — Visibility rule 1.  
Step 3: T2’s version has commit_ts=15 > 12, so it is invisible.  
*Why* — Direct comparison.  
**100**  

*Reflection:* The example shows that a reader never sees partial effects of a later writer even though the writer never blocked the reader.

**Example 2 — Writer–reader non-blocking**  
*Given:* T4 updates a row while T5 is scanning the table.  
*Find:* Does T5 ever wait?  
Step 1: T5’s snapshot is already fixed.  
*Why* — Snapshot rule.  
Step 2: T4 appends a new version; old version remains.  
*Why* — Append-only update.  
Step 3: T5 continues reading the old version.  
*Why* — Visibility predicate ignores T4’s newer version.  
**No wait occurs.**  

*Reflection:* The absence of read locks is the direct consequence of keeping the prior version.

**Example 3 — Version chain and garbage collection**  
*Given:* Versions at ts 5, 12, 18. Oldest active snapshot is 20.  
*Find:* Which versions survive?  
Step 1: Any version whose commit_ts < 20 may be examined by the oldest snapshot.  
*Why* — Visibility horizon.  
Step 2: All three versions remain.  
*Why* — 18 < 20.  
**All versions retained.**  

*Reflection:* Garbage collection is driven by the minimum active snapshot, not by wall-clock time.

**Example 4 — Write skew under snapshot isolation**  
*Given:* Two rows X=1, Y=1. T6 reads X, writes Y=2. T7 reads Y, writes X=2. Both commit under MVCC.  
*Find:* Final state and isolation anomaly.  
Step 1: Both transactions see the original versions.  
*Why* — Snapshots taken before either commit.  
Step 2: Both writes succeed because each writes a different item.  
*Why* — No write-write conflict detected.  
Step 3: Result (X=2, Y=2) violates the constraint X+Y=2.  
*Why* — Snapshot isolation permits write skew.  
**Write skew anomaly occurs.**  

*Reflection:* MVCC supplies snapshot isolation; serializability requires additional mechanisms such as predicate locking or SSI.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming newest version is always visible | Physical layout suggests recency equals truth       | Always apply the three-rule visibility predicate     |
| Forgetting that aborted transactions leave versions | Cleanup is lazy                                     | Track commit/abort status in the version header      |
| Believing MVCC gives serializability | Snapshot isolation is the default level             | Add SSI or explicit locks when full serializability is required |
| Underestimating version-storage growth | Long-running queries pin old versions               | Monitor xmin horizon and kill or split long queries  |
| Ignoring index maintenance        | Each version needs index entries                    | Use versioned index structures or delete-mark bits   |
| Confusing commit timestamp with wall-clock time | Clock skew across nodes                             | Use logical or synchronized timestamps (TrueTime)    |
| Overlooking vacuum/GC cost        | Reclamation looks free                              | Budget background CPU and I/O for version cleanup    |

## 7. The textbook-precise statement
A database implements multi-version concurrency control when each write produces a new version of the modified item, each version is stamped with the commit timestamp of its creator transaction, and a read operation by transaction \(T\) with start timestamp \(t_s\) returns the version \(v\) of item \(x\) satisfying  
$$
v = \arg\max_{v' \text{ of } x} \{ commit\_ts(v') \mid commit\_ts(v') \le t_s \land creator(v') \text{ committed} \}.
$$  
Ramakrishnan and Gehrke, *Database Management Systems*, 3e, §16.5.

## 8. Visual — diagram or schematic
```text
Time →
T1: write X → v1 (ts=5) ──────────────► committed
T2:          write X → v2 (ts=12) ────► committed
T3: snapshot ts=10          read X → v1
T4: snapshot ts=15          read X → v2
T5: snapshot ts=20          read X → v2
GC horizon (min active snapshot) = 10 → v1 still needed
```

## 9. The memory technique
1. **The hook** — Picture a library where every edit creates a new edition of the book instead of erasing the old page; each patron checks out the latest edition that existed when they entered the building.
2. **What to overlearn** — The three-rule visibility predicate and the fact that the minimum active snapshot timestamp governs garbage collection.
3. **Spaced-repetition schedule** — Review the visibility predicate at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the single-lock problem: ask what happens to a reader when a writer holds an exclusive lock, then replace the lock with an extra version and a timestamp comparison.

## 10. What this unlocks
MVCC is the foundation for snapshot isolation, optimistic concurrency control, and time-travel queries. It directly enables the next topics of Serializable Snapshot Isolation (SSI), multi-version indexes, and distributed timestamp oracles used in NewSQL systems.

- Serializable Snapshot Isolation
- Multi-version B-trees and LSM-tree compaction
- Distributed snapshot reads in Spanner and TiDB
- Time-travel and AS OF queries

## 11. Self-check — five questions, no answers
1. A transaction with snapshot timestamp 42 reads a row whose only committed version has commit timestamp 55. What value does it see?
2. Under MVCC, can two transactions simultaneously hold write locks on the same logical row? Explain.
3. Why does a long-running query prevent vacuum from reclaiming any versions created before its start?
4. Show a schedule of four transactions that produces write skew under MVCC snapshot isolation but would be rejected under strict two-phase locking.
5. In a distributed MVCC system using loosely synchronized clocks, what single change restores external consistency?