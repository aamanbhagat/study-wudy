## 1. The one-sentence answer
**A composite index is a B-tree (or similar) index built on two or more table columns in a defined order, while a covering index is any index whose leaf nodes already contain every column required by a query so the database engine never touches the base table rows.**

A composite index lets the engine walk a single ordered structure when your WHERE, ORDER BY or JOIN clauses mention multiple columns together. The leftmost column determines the primary sort; each subsequent column is sorted only inside the groups created by the columns to its left. This ordering directly controls which predicates can use the index for range scans versus equality lookups.

A covering index is an optimisation layered on top of any index (single-column or composite). When the SELECT list, WHERE clause and any needed aggregates fit inside the index, the engine performs an “index-only scan.” No row identifiers are followed back to the heap, eliminating random I/O.

> [!NOTE]
> The decisive “aha” is that column order in a composite index is not interchangeable; the leftmost prefix rule decides whether the index can be used at all, while covering removes the final table access that usually dominates query cost.

## 2. Why this matters — concrete and current
In the query layer of Shopify’s checkout pipeline, a composite index on (shop_id, created_at) lets the system retrieve the last 30 days of orders for any merchant with a single range scan; adding the status column to the index turns it into a covering index and removes 4 million random heap fetches per minute during peak sales.

Google’s Spanner uses covering indexes on the primary key plus frequently projected columns (e.g., (user_id, email, last_login)) so that the permission-check service answers “does this user still exist?” without ever reading the base tablet, keeping tail latency under 10 ms at planet scale.

In the ML feature store at Uber, a composite index on (city, feature_name, version) allows the training job to fetch the exact feature vectors needed for a city-specific model while the covering property guarantees that the vector values themselves sit inside the index leaf, cutting training-data scan time by roughly 3×.

Airbus’s A350 health-monitoring ground system stores sensor readings with a composite index on (aircraft_id, timestamp, sensor_type). Covering queries that request only the last 100 readings per sensor avoid touching the 40 TB fact table during real-time diagnostics.

Netflix’s personalised-row cache warming job runs a covering index on (profile_id, row_type, rank) so that the top-50 rows for every profile can be materialised from the index alone, eliminating 92 % of the previous disk I/O during the nightly refresh.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| B-tree index structure     | Composite and covering indexes are almost always implemented as B-trees; you must know how keys are ordered inside leaf and internal nodes. |
| Query execution plan       | You must be able to read EXPLAIN output to see whether the engine actually chose an index-only scan or fell back to a table access. |
| Selectivity & cardinality  | Understanding how many rows survive each predicate tells you whether the leftmost column of a composite index will be selective enough. |
| Heap vs index storage      | Knowing that the base table rows live in a separate structure explains why avoiding heap access (covering) yields such large speed-ups. |

If any row above is unfamiliar, pause and read the single-column B-tree index lesson first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single-column index gives equality or range on one column only
A single-column index orders rows by one attribute. When a query filters on two columns, the engine can use the index for the first column and then apply the second filter in memory or via a separate access.

Example: index on (last_name) helps `WHERE last_name = 'Sharma'` but still scans every matching row for `first_name = 'Amit'`.

Formal statement: given index \(I\) on column \(c_1\), the predicate set \(P\) can exploit \(I\) only when \(P\) contains an equality or range predicate solely on \(c_1\).

> [!WARNING]
> Students often assume any index mentioning the column will help; if the predicate on the indexed column is missing or is an inequality on a non-leading column, the index is ignored.

### Step 2 — Composite index orders by leftmost column first
A composite index on \((c_1, c_2)\) stores keys sorted primarily by \(c_1\), then by \(c_2\) inside each \(c_1\) group. This ordering lets the engine satisfy predicates on \(c_1\) alone or on the prefix \((c_1, c_2)\).

Example: index on (shop_id, created_at) answers both `WHERE shop_id = 42` and `WHERE shop_id = 42 AND created_at > '2024-01-01'`.

Formal statement: an index on the sequence \((c_1, \dots, c_k)\) can be used for a conjunction of predicates if the predicates form a prefix of that sequence.

> [!WARNING]
> Reversing the column order (created_at, shop_id) destroys the ability to answer the shop_id-only predicate efficiently.

### Step 3 — Index-only scan when all referenced columns are inside the index
If every column mentioned in SELECT, WHERE, JOIN or ORDER BY already exists in the index leaf, the engine never follows the row identifier (RID) back to the heap page.

Example: index on (shop_id, created_at, status) makes `SELECT status FROM orders WHERE shop_id = 42 AND created_at > …` a pure index scan.

Formal statement: let \(Q\) be the set of columns referenced by a query. If \(Q \subseteq\) columns of index \(I\), then the access path is an index-only scan.

> [!WARNING]
> Adding an extra column that is never used in the query bloats the index and slows down writes; covering must be deliberate.

### Step 4 — Leftmost-prefix rule formalised
For an index on \((c_1, c_2, c_3)\), the usable predicates are exactly those that supply equality conditions on a prefix of length \(m\) (0 ≤ m ≤ 3) optionally followed by a range on column \(c_{m+1}\).

Formal statement: predicate set \(P\) matches prefix length \(m\) iff \(P\) contains equality predicates on \(c_1 \dots c_m\) and at most one range predicate on \(c_{m+1}\).

### Step 5 — Cost model
Cost of composite index lookup ≈ height of B-tree + number of leaf pages scanned. When the index covers, the second term replaces the far more expensive heap I/O term.

## 5. Worked examples — har step show karo

**Example 1 — Basic composite lookup**  
*Given:* table `orders(shop_id int, created_at timestamp, amount numeric)` with composite index `(shop_id, created_at)`.  
*Find:* rows for shop 7 after 2024-06-01.  
Step 1: engine locates first key where shop_id = 7 (root-to-leaf traversal).  
Step 2: scans leaf pages while shop_id remains 7 and created_at ≥ 2024-06-01.  
*Why:* leftmost column equality allows a contiguous range scan.  
**Final answer:** index range scan on `(shop_id, created_at)` returns the qualifying rows.

*Reflection:* the example is simple yet shows why column order matters; swapping columns would force a full index scan.

**Example 2 — Covering query**  
*Given:* same index plus column `status`. Query `SELECT status FROM orders WHERE shop_id = 7`.  
*Find:* whether a table access occurs.  
Step 1: check that SELECT and WHERE columns are subset of index → yes.  
Step 2: engine reports “Index Only Scan”.  
*Why:* no heap fetch needed.  
**Final answer:** Index Only Scan on `(shop_id, created_at)` (covering).

*Reflection:* adding status to the index would also cover more queries but increases write amplification.

**Example 3 — Partial prefix match**  
*Given:* index `(a, b, c)`. Query `WHERE a = 1 AND c = 3`.  
*Find:* usable prefix length.  
Step 1: equality on a → prefix length 1.  
Step 2: predicate on c is not on the next column b → engine uses index for a only.  
*Why:* leftmost-prefix rule stops at the first missing column.  
**Final answer:** index scan on a, then filter c in memory.

*Reflection:* students often expect the index to help with any column; the gap in the prefix defeats that hope.

**Example 4 — ORDER BY with composite index**  
*Given:* index `(shop_id, created_at)`. Query `… ORDER BY shop_id, created_at DESC`.  
*Find:* whether index can satisfy ORDER BY.  
Step 1: index provides ascending order on both columns.  
Step 2: DESC on second column requires a backward scan or separate sort.  
*Why:* B-tree stores one physical order; direction must match or be reversed explicitly.  
**Final answer:** index can be used but may need a final sort if directions differ.

*Reflection:* covering plus ordering is powerful only when the index definition matches both the filter prefix and the exact sort direction.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Creating composite index with low-selectivity column first | Students copy column order from table definition | Always put highest-selectivity equality column leftmost |
| Assuming every composite index is automatically covering | Forgetting that SELECT list columns must also be present | Explicitly list every column the query touches and verify inclusion |
| Adding every queried column to the index “just in case” | Index bloat and slower writes | Measure write throughput before and after; keep covering indexes narrow |
| Ignoring NULL handling in composite indexes | NULLs sort first or last depending on engine; range predicates break | Test with realistic NULL distribution or add NOT NULL constraints |
| Using composite index for range on first column + equality on second | Violates leftmost-prefix rule | Re-order columns so equality columns precede ranges |
| Forgetting INCLUDE clause in PostgreSQL/SQL Server | Non-key columns are not stored in the index tree | Use INCLUDE (col) syntax to cover without enlarging the key |

## 7. The textbook-precise statement
A composite index on an ordered sequence of columns \(C = (c_1, c_2, \dots, c_k)\) is a secondary access path whose keys are lexicographically ordered first by \(c_1\), then by \(c_2\) inside each group formed by \(c_1\), and so on. An index-only scan (covering index) occurs for a query \(Q\) when the set of columns referenced by \(Q\) is a subset of the columns stored in the index. The leftmost-prefix rule states that the index can be used for a conjunction of predicates if and only if the predicates supply equality conditions on a proper prefix of \(C\) optionally followed by a single range condition on the next column. (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §12.4 and §13.3.)

## 8. Visual — diagram or schematic
```
B-tree leaf page (composite index on (shop_id, created_at))
+------------+------------------+------------------+
| Key        | RowID / Payload  | Next leaf ptr    |
+------------+------------------+------------------+
| 7, 2024-05 | RID 0xA001       | -> next page     |
| 7, 2024-06 | RID 0xA010       |                  |
| 7, 2024-06 | RID 0xA011       |                  |
| 8, 2024-01 | RID 0xB002       |                  |
+------------+------------------+------------------+
All rows with shop_id = 7 lie in one contiguous segment.
```

## 9. The memory technique
1. **The hook** — picture a multi-drawer filing cabinet: the first drawer label is shop_id; inside each drawer the folders are sorted by date. You can pull an entire drawer (composite) or just read the labels without opening any folder (covering).

2. **What to overlearn** — leftmost-prefix rule, index-only scan condition, cost = height + leaf pages (no heap I/O when covering).

3. **Spaced-repetition schedule** — review the leftmost-prefix rule after 1 day, 3 days, 7 days, 16 days and 35 days; each time write one SQL query that succeeds or fails because of the rule.

4. **First-principles fallback** — redraw the B-tree leaf segment for the given column list, mark which predicates can be applied while walking that segment, then decide whether the SELECT columns are already present.

## 10. What this unlocks
Composite and covering indexes are the foundation for advanced physical design: you can now reason about multi-column sort-merge joins, index intersection, and partial indexes.

- Bitmap index intersection in data warehouses
- Covering indexes for JSON projection push-down in PostgreSQL
- Index-based GROUP BY elimination in modern optimisers
- Automatic index recommendation engines (e.g., Microsoft’s Database Tuning Advisor)

## 11. Self-check — five questions, no answers
1. Given an index on (a, b, c), which of the following predicates can use the index: `a = 5 AND b > 10`, `b = 3 AND a = 5`, or `a > 5 AND b = 3`?

2. Write the exact index definition (including INCLUDE if needed) that would turn the query `SELECT email FROM users WHERE org_id = 42 ORDER BY created_at` into a pure index-only scan.

3. A table has 10 million rows. An index on (low_selectivity_flag, high_selectivity_id) is created. Roughly how many leaf pages will be examined for the predicate `low_selectivity_flag = true`?

4. Explain why adding a covering column that is updated on every transaction can increase overall system latency even though reads become faster.

5. In an EXPLAIN ANALYZE output you see “Index Scan using idx on orders” followed by “Heap Fetches: 18432”. What does the non-zero heap-fetches number tell you about the current index definition?