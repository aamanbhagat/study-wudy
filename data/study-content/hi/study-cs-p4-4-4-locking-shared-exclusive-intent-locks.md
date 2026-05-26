## 1. The one-sentence answer
**Locking in databases uses shared, exclusive, and intent locks to control concurrent access so that multiple transactions can safely read or modify data without producing inconsistent results.**

Shared locks allow many transactions to read the same item simultaneously. Exclusive locks give one transaction sole write permission and block everyone else. Intent locks sit one level above in a hierarchy (table before row) and announce in advance what kind of lock a transaction plans to acquire lower down; this prevents expensive full-table scans when checking compatibility. The combination lets the DBMS grant or refuse locks quickly while still guaranteeing serializability.

> [!NOTE]
> The key insight is that intent locks turn an O(n) compatibility check across thousands of rows into an O(1) check at the table or page level.

## 2. Why this matters — concrete and current
PostgreSQL’s MVCC layer still acquires shared and exclusive locks on tuples and uses intent locks on pages and relations before any row-level operation; without them, concurrent VACUUM and UPDATE statements would corrupt visibility maps on terabyte-scale tables at companies such as Instagram.

Google Spanner relies on intent-style hierarchical locking across its Paxos groups so that a cross-datacenter write transaction can declare its intent on a directory before acquiring fine-grained locks; this design appears in the 2012 OSDI paper and still underpins Cloud Spanner’s external consistency guarantee.

Oracle’s Automatic Data Optimization feature uses intent exclusive locks on partitions before deciding which ones to compress; the same mechanism prevents two compression jobs from racing on the same 100 TB fact table at large retail customers.

SQLite’s write-ahead log employs a single exclusive lock on the entire database file, but its shared-memory locking protocol uses intent shared locks on individual pages so that read-only connections never block each other—an approach copied by many embedded systems in aerospace telemetry recorders.

Microsoft SQL Server’s lock manager escalates row-level intent exclusive locks to page or table level once a threshold is crossed; this exact behaviour is documented in the 2022 “Lock Escalation” whitepaper and directly affects throughput of high-frequency trading order-matching engines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Transaction ACID properties | Explains why inconsistent reads must be prevented         |
| Two-phase locking (2PL)     | Provides the protocol that shared/exclusive locks obey    |
| Lock compatibility matrix   | Defines which lock modes can be granted together          |
| Granularity hierarchy       | Shows why intent locks exist at table/page levels         |

If any row is missing, pause and read the corresponding section on transactions and 2PL first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Reading needs sharing, writing needs exclusion
A transaction that only reads an item can safely share it with other readers. A transaction that writes must be the only one touching the item.  
Example: two SELECT statements on the same bank balance can run together; an UPDATE must wait until both finish.  
Formally, let \(L_T(i)\) be the lock held by transaction \(T\) on item \(i\). Then \(L_T(i) = S\) permits multiple \(T\), while \(L_T(i) = X\) permits only one.  
> [!WARNING]
> Treating every access as exclusive destroys concurrency; many students over-lock and create deadlocks immediately.

### Step 2 — Compatibility matrix decides granting
The engine consults a static matrix before granting a new lock request.  
Shared is compatible with shared; everything else conflicts with exclusive.  
The matrix is usually drawn as:

```
      S   X   IS  IX  SIX
S     ✓   ✗   ✓   ✗   ✗
X     ✗   ✗   ✗   ✗   ✗
IS    ✓   ✗   ✓   ✓   ✓
IX    ✗   ✗   ✓   ✓   ✗
SIX   ✗   ✗   ✓   ✗   ✗
```

### Step 3 — Hierarchy forces coarse-grained announcements
When a transaction wants a row lock, it must first declare intent at the table level. Without this rule a table-level exclusive lock could be granted while a row-level shared lock already exists.  
Example: before acquiring an X lock on row 42 of table Accounts, the transaction must hold IX on Accounts.  
Formally: for every ancestor \(a\) of item \(i\), if \(L_T(i) \in \{S,X\}\) then \(L_T(a) \in \{IS,IX,SIX\}\).

### Step 4 — Intent shared (IS) and intent exclusive (IX) modes
IS announces future S locks below; IX announces future X locks below.  
IS is compatible with IS and IX; IX is compatible only with IS and IX.  
This keeps the compatibility check at the table level O(1).

### Step 5 — Shared-intent-exclusive (SIX) mode
SIX = S + IX. A transaction holding SIX can read the entire table (S) while also updating selected rows (IX).  
Used by query optimizers that first scan a table and later modify a few rows.

### Step 6 — Lock escalation and release rules
When the number of row locks exceeds a threshold, the engine converts many IX locks into a single table-level X lock. All locks are released only at the end of the transaction (strict 2PL).

### Step 7 — Textbook-grade statement
A lock manager maintains, for every data item and its ancestors, a set of granted and waiting lock requests. A new request is granted if and only if it is compatible with every already-granted lock on the same item or ancestor; otherwise it waits. Intent locks make the ancestor checks sufficient to guarantee that no conflicting fine-grained lock exists.

## 5. Worked examples — har step show karo

**Example 1 — Two readers**  
*Given:* T1 requests S on row r1; T2 requests S on r1.  
*Find:* Can both be granted?  
Step 1: check matrix → S compatible with S.  
Step 2: grant both.  
**Both granted.**  
*Why*: No writer exists, so sharing is safe.

**Example 2 — Reader then writer**  
*Given:* T1 holds S on r1; T2 requests X on r1.  
*Find:* Outcome?  
Matrix shows X conflicts with S → T2 waits.  
**T2 waits.**  
*Why*: Writer must see a consistent snapshot after all readers finish.

**Example 3 — Intent escalation**  
*Given:* T1 already holds IX on table Accounts; T2 requests X on Accounts.  
*Find:* Can X be granted?  
IX conflicts with X → T2 waits.  
**T2 waits.**  
*Why*: The existing IX signals that some row may be written; table-level X would violate that promise.

**Example 4 — SIX usage**  
*Given:* T1 holds SIX on table Orders and wants to update one row.  
*Find:* Additional lock needed?  
SIX already contains IX, so row-level X can be granted directly.  
**Row X granted.**  
*Why*: SIX pre-declared the mixed read/write intention, avoiding an extra table lock request.

*Reflection*: Each example isolates exactly one compatibility rule; together they cover the entire matrix.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting intent lock on ancestor| Student thinks only row locks matter        | Always acquire IS/IX before any row request  |
| Treating SIX as simple S          | Confusing SIX with plain shared             | Remember SIX = S + IX; it blocks other IX    |
| Ignoring lock escalation threshold| Assuming row locks stay forever             | Check DBMS config (e.g., 5000 locks)         |
| Releasing locks early             | Misremembering strict 2PL                   | Release only after commit/abort              |
| Deadlock from upgrade             | Requesting X while still holding S          | Use update locks (U) or always request X first|
| Checking compatibility bottom-up  | Expensive scan of every row                 | Rely on intent locks at higher granularity   |

## 7. The textbook-precise statement
From Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §16.3:  
“Let L be the lock-compatibility function. A mode \(m_1\) is compatible with mode \(m_2\) iff \(L(m_1,m_2)=\text{true}\). For every data item \(x\) and ancestor \(y\) of \(x\), if a transaction \(T_i\) holds a lock of mode \(m\) on \(x\) then \(T_i\) must also hold an intention lock of appropriate mode on \(y\). A request for lock mode \(m\) on \(x\) is granted only when it is compatible with all granted locks on \(x\) and on every ancestor of \(x\).”

## 8. Visual — diagram or schematic
```
Table Accounts
├── IX (T1)
│   └── Row 42 ─ X (T1)
└── IS (T2)
    └── Row 17 ─ S (T2)
```
T1’s IX at table level blocks any table-level X from T3.  
T2’s IS allows other readers but not writers on the same table.

## 9. The memory technique
1. **The hook** — Picture a librarian (intent lock) standing at the door of a reading room (table) and shouting “I have readers inside” or “I have writers inside” before anyone enters.  
2. **What to overlearn** — The five-mode compatibility matrix and the rule “ancestor intent before descendant lock”.  
3. **Spaced-repetition schedule** — Review matrix after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “Who must be blocked if I write?” then place the strongest lock that satisfies that requirement at each hierarchy level.

## 10. What this unlocks
Once you master these lock modes you can reason about deadlock detection, lock escalation policies, and snapshot isolation implementations.  
- Next topics: deadlock prevention via wait-for graphs, multi-version concurrency control (MVCC), predicate locking for phantom protection, and ARIES recovery that must respect lock tables during restart.

## 11. Self-check — five questions, no answers
1. Can two transactions simultaneously hold IX on the same table?  
2. A transaction already holds S on a row; which additional table-level lock must it hold?  
3. Draw the compatibility matrix cell for SIX vs IX.  
4. Why does releasing an S lock before commit violate strict 2PL?  
5. In a three-level hierarchy (table-page-row), list the exact locks a transaction must acquire before writing a single row.