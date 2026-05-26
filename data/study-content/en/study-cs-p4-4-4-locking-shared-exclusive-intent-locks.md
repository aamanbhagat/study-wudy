## 1. The one-sentence answer
**Locking with shared, exclusive, and intent modes coordinates concurrent access so that multiple readers may proceed together while writers obtain sole control, with intent locks announcing coarser-grained intentions to avoid exhaustive subtree searches.**

Shared locks permit concurrent reads because reads do not change values. Exclusive locks block every other lock because a write must be the sole mutator. When data is organized in hierarchies (tables containing pages containing rows), a transaction must declare its intention at each ancestor level; otherwise the lock manager would have to examine every descendant before deciding compatibility. Intent locks therefore act as compact announcements rather than full subtree locks.

This design keeps the lock table small and the compatibility checks fast. Without intent locks, fine-grained row locking would force the system either to lock entire tables or to walk every child node on every request.

> [!NOTE]
> The decisive insight is that intent locks do not themselves grant data access; they only certify that a finer-grained lock of a stated type will be requested below, turning an O(n) subtree scan into an O(1) table lookup.

## 2. Why this matters — concrete and current
PostgreSQL’s MVCC layer still acquires row-level shared and exclusive locks when a transaction issues SELECT FOR SHARE or SELECT FOR UPDATE; intent locks on the containing pages keep the lock manager tractable even when millions of rows are touched.

Google Spanner uses hierarchical locking with intent modes across tablet, directory, and row ranges to support externally consistent reads while allowing cross-datacenter writes; the intent declarations let the lock table remain modest despite thousands of tablets per server.

Microsoft SQL Server’s lock manager records intent shared and intent exclusive locks at the table and page levels before acquiring row locks; this enables partition-level operations in Always On availability groups without scanning every row lock entry during deadlock detection.

Amazon Aurora’s storage engine records intent locks on 10 GB data blocks before taking page latches; the scheme lets thousands of read replicas coexist with a single writer while still detecting conflicts in sub-millisecond time.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Transaction & ACID       | Locks exist only to preserve atomicity and isolation across concurrent transactions. |
| Lock compatibility matrix | Determines whether two lock requests can be granted simultaneously. |
| Lock granularity         | Explains why intent locks appear: coarser objects contain finer ones. |
| Two-phase locking        | Provides the protocol context in which these lock modes are acquired and released. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mutual exclusion for writes
A write must be the only operation that observes or changes a data item; otherwise two writes can interleave and produce non-serializable results.  
Example: two transfers both reading balance 100 and writing 50 leave the account at 50 instead of 0.  
Formally, an exclusive lock X on datum d satisfies: if Tᵢ holds X(d) then no other Tⱼ may hold any lock on d.  
> [!WARNING] Treating a write as a read-plus-write without an exclusive lock allows lost-update anomalies.

### Step 2 — Concurrent reads are safe
Reads never modify state, so any number of transactions may read the same value simultaneously.  
Example: ten reporting queries may all hold shared locks on the same sales table.  
Formally, a shared lock S on d satisfies: any number of transactions may hold S(d) concurrently.  
> [!WARNING] Using an exclusive lock for every read destroys read scalability.

### Step 3 — Compatibility rules
Two locks are compatible if and only if their joint presence never violates the above two invariants. The resulting matrix is:

$$
\begin{array}{c|cc}
 & \text{S} & \text{X} \\
\hline
\text{S} & \text{yes} & \text{no} \\
\text{X} & \text{no} & \text{no}
\end{array}
$$

> [!WARNING] Memorizing only the diagonal entries leads to incorrect granting of S after an X request is already waiting.

### Step 4 — Hierarchical granularity
Data items form trees (tables → pages → rows). A lock on a node implicitly affects descendants; checking every descendant on every request is prohibitive.  
Example: locking a 10-million-row table requires a compact signal at the table level.  
Formally, a lock on ancestor a must be compatible with every lock already held on any descendant of a.

### Step 5 — Intent declarations
An intent lock on an ancestor announces the mode of a future finer-grained lock. Intent shared (IS) announces a future S; intent exclusive (IX) announces a future X; shared-intent-exclusive (SIX) announces both.  
> [!WARNING] Omitting the intent lock allows a later conflicting lock on a sibling subtree to be granted erroneously.

### Step 6 — Full compatibility matrix with intent modes
The textbook matrix (Silberschatz et al., Database System Concepts, 7e, Fig. 18.5) augments the basic table with IS, IX, and SIX rows and columns. A transaction may hold at most one lock mode per data item; the matrix decides grantability in constant time.

### Step 7 — Textbook statement of the mechanism
A lock manager grants a requested lock on node n only when (a) the requested mode is compatible with every lock already held on n and (b) every ancestor of n already carries an appropriate intent lock of the requesting transaction.

## 5. Worked examples — every step shown

**Example 1 — Single-row read**  
*Given:* Transaction T1 issues SELECT * FROM accounts WHERE id=42.  
*Find:* Required lock sequence.  
T1 requests IS on table accounts (*Why*: announces finer intent).  
T1 requests IS on page P containing row 42 (*Why*: hierarchy rule).  
T1 requests S on row 42 (*Why*: read requires shared lock).  
**Final answer: IS(table) + IS(page) + S(row).**

*Reflection*: The three-level chain is required even for a single row; omitting any level violates the hierarchy invariant.

**Example 2 — Two concurrent readers**  
*Given:* T1 and T2 both request S on the same row.  
*Find:* Are both granted?  
Compatibility matrix entry (S,S) = yes. Both requests succeed.  
**Final answer: both granted.**

*Reflection*: Shared mode is the only mode that is self-compatible.

**Example 3 — Reader and writer conflict**  
*Given:* T1 holds S on row r; T2 requests X on r.  
*Find:* Outcome.  
Matrix entry (S,X) = no. T2 waits.  
**Final answer: T2 waits.**

*Reflection*: The wait is the mechanism that enforces serializability.

**Example 4 — Intent escalation**  
*Given:* T1 already holds IX on table and IX on page; now requests X on row r.  
*Find:* Is the request granted?  
All ancestors already carry the required intent; matrix (IX,X) at row level permits it.  
**Final answer: granted.**

*Reflection*: The prior intent locks make the final check O(1).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Requesting X without first acquiring IX on ancestors | Programmer thinks only the target row matters | Always walk the tree from root, acquiring intent locks first |
| Treating SIX as “stronger than IX” | SIX is a combination, not a superset | Remember SIX = S + IX; it conflicts with other IX holders |
| Releasing an intent lock before its child locks | Early release violates two-phase locking | Release in reverse acquisition order only at commit/abort |
| Assuming IS is compatible with X at the same level | Matrix row IS vs column X is false | Consult the full 6×6 matrix every time |
| Forgetting that a waiting lock still blocks intent grants | Queue order matters | Check both held locks and waiting locks |
| Using table-level S when only a few rows are needed | Over-locking for simplicity | Escalate only after measuring contention |
| Ignoring deadlock detection on intent chains | Cycles can form across hierarchy levels | Run wait-for-graph checks including intent nodes |

## 7. The textbook-precise statement
A database system supports a lock-compatibility function mode(Q₁,Q₂) that returns true iff a transaction requesting mode Q₂ may be granted a lock on an item already locked in mode Q₁ by another transaction. The supported modes are {S, X, IS, IX, SIX}. A lock request on node n by transaction T is granted only when, for every ancestor a of n, T already holds an intent lock on a whose mode is compatible with the requested mode on n, and mode(Q,T.n) returns true for every lock currently held on n (Silberschatz, Korth, Sudarshan, Database System Concepts, 7e, §18.4).

## 8. Visual — diagram or schematic
```text
Table (root)
├── IS / IX / SIX          ← intent announcement only
│   Page P
│   ├── IS / IX            ← intent announcement only
│   │   Row r1  (S or X)   ← actual data lock
│   │   Row r2  (S or X)
│   Page Q …
```
Labels: arrows point from coarser to finer granularity; each node stores only its own lock mode and a pointer to its parent.

## 9. The memory technique
**The hook** — Picture a building: shared locks are many people reading the lobby directory; exclusive locks are one person inside a private office with the door locked; intent locks are the signs posted on the building and floor doors saying “someone inside is reading/writing.”

**What to overlearn** — The six-mode compatibility matrix and the rule “intent locks never grant data access, only permission to request finer locks.”

**Spaced-repetition schedule** — Review matrix at 1 day, 3 days, 7 days, 16 days, 35 days; after each interval reconstruct the matrix from the two invariants (read concurrency, write exclusion).

**First-principles fallback** — Re-derive the matrix by asking, for every pair of modes, whether simultaneous possession can ever produce a non-serializable schedule.

## 10. What this unlocks
Intent locking is the foundation for multi-granularity locking, predicate locking, and the lock-manager implementations inside every major RDBMS.  

- Next: strict two-phase locking and deadlock detection via wait-for graphs.  
- Next: index locking protocols (key-range locking).  
- Next: distributed locking in systems such as Spanner and Percolator.  
- Next: snapshot isolation and its lock-free variants.

## 11. Self-check — five questions, no answers
1. Draw the complete 6×6 compatibility matrix for {S, X, IS, IX, SIX} and mark every “no” entry with the invariant it violates.

2. A transaction holds SIX on a table and IX on a page. Which additional lock on a row inside that page is legal?

3. Show the exact sequence of lock requests required to delete a single row while obeying the hierarchy rule.

4. Two transactions each hold IS on the same table and then request X on different rows. Is deadlock possible? Why or why not?

5. A new lock mode “SIX+” is proposed that is compatible with S but not with IX. Does adding it preserve the original two invariants? Demonstrate with a counter-example schedule if it does not.