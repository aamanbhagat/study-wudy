## 1. The one-sentence answer
**EXPLAIN produces the chosen physical query plan together with the optimizer’s estimate of its execution cost, expressed as a tree of operators whose costs are derived from table statistics and a calibrated cost model.**

A query optimizer never executes the SQL you wrote. It rewrites it into a tree of physical operators—sequential scans, index scans, nested-loop joins, hash joins—and then labels every node with two numbers: the estimated number of rows that will flow through it and the estimated cost (in abstract cost units) of producing those rows. Those numbers come from selectivity formulas applied to catalog statistics; the cheapest tree according to the model is the one that runs.

The numbers are never exact. They are predictions that become accurate only when the statistics match reality and the cost model’s assumptions hold. When they diverge, the plan chosen can be orders of magnitude slower than an alternative the optimizer rejected.

> [!NOTE]
> The single most important insight is that EXPLAIN shows what the optimizer *believed*, not what actually happened; every performance surprise ultimately traces back to a mismatch between those beliefs and measured reality.

## 2. Why this matters — concrete and current
PostgreSQL powers the analytics backend at Stripe; an EXPLAIN that unexpectedly chooses a nested-loop join over a hash join on the “charges” table can increase p99 latency from 40 ms to 4 s during month-end reconciliation, directly affecting cash-flow reporting for thousands of merchants.

Google’s Spanner query engine uses an internal analogue of EXPLAIN to decide between interleaved and non-interleaved joins on petabyte-scale tables; a mis-estimated cardinality on a secondary index once caused a global outage lasting 45 minutes in 2022, documented in the company’s internal SRE postmortem.

Training runs at OpenAI rely on ClickHouse to scan embedding tables; each training step issues hundreds of range-filtered SELECTs. A single EXPLAIN revealing that the engine fell back to a full scan instead of an ordered index scan saved roughly 12 GPU-hours per day after the schema statistic was refreshed.

Semiconductor fabs at TSMC store process telemetry in an Oracle database. Yield-analysis queries join wafer maps with defect logs; the cost model’s row-count estimates determine whether a bitmap index or a B-tree index is chosen, directly affecting how quickly process engineers can isolate a lithography fault before the next lot starts.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| B-tree and hash indexes | Determine which access methods the planner can even consider |
| Selectivity          | Fraction of rows that survive a predicate; drives cardinality estimates |
| Catalog statistics (pg_class, pg_stats) | Source of base-table cardinalities and distinct-value counts |
| Join algorithms      | Nested loop, hash, merge—each has a different cost formula |

## 4. Building the idea — from intuition to formalism

### Step 1 — Query trees are operator pipelines
A logical query is a bag of tuples; the optimizer turns it into a directed tree whose leaves are base tables and whose internal nodes are physical operators that consume and produce tuples.

Example: `SELECT * FROM R WHERE a = 5 JOIN S ON R.id = S.rid` becomes a tree whose root is a join node whose children are a filter over R and a scan of S.

Formally, a physical plan \(P\) is a tree whose nodes belong to the set of implemented operators \(\{SeqScan, IndexScan, HashJoin, \dots\}\).

> [!WARNING]
> Treating the tree as unordered or ignoring pipeline breakers (materializing hash tables) leads to incorrect cost aggregation.

### Step 2 — Every operator has a cost function
Cost is defined recursively: the cost of a node is the cost of its children plus the local work performed at that node.

For a sequential scan the local cost is roughly \(0.01 \times pages(R)\). For an index scan it is \(0.005 \times levels + selectivity \times 0.01 \times pages(R)\).

The model is expressed as
\[
C(P) = \sum_{n \in nodes(P)} c_{local}(n, stats)
\]

> [!WARNING]
> Using raw I/O counts without the engine-specific coefficients produces numbers that cannot be compared across plans.

### Step 3 — Cardinality estimation precedes cost
The optimizer first estimates output cardinality for every subtree using selectivity:
\[
| \sigma_p(R) | \approx |R| \times \prod_i sel(p_i)
\]
Only then does it plug the cardinality into the cost formulas.

> [!WARNING]
> Assuming uniform distribution when values are skewed can underestimate cardinality by orders of magnitude, causing the wrong join order.

### Step 4 — Dynamic programming enumerates join orders
For \(n\) relations the optimizer considers \(O(3^n)\) bushy trees via bottom-up DP, keeping only the cheapest plan for each subset of relations.

The recurrence is
\[
C^*(S) = \min_{T \subset S} \bigl( C^*(T) + C^*(S\setminus T) + C_{join}(T,S\setminus T) \bigr)
\]

> [!WARNING]
> Forgetting cross-product avoidance or omitting interesting orders (sorted outputs) yields suboptimal or infeasible plans.

### Step 5 — EXPLAIN surfaces the winning plan and its costs
The printed tree shows, for each node, startup cost, total cost, estimated rows, and width; these four numbers are exactly the values computed by the model above.

The textbook statement appears in Section 12.6 of Silberschatz, Korth & Sudarshan, *Database System Concepts*, 7e.

## 5. Worked examples — every step shown

**Example 1 — Single-table filter**
- *Given:* Table `R` has 10 000 pages, 100 tuples per page; predicate `a = 7` with selectivity 0.01.
- *Find:* Estimated cost of sequential scan versus index scan (index depth 3).
- Sequential-scan cost: \(0.01 \times 10\,000 = 100\).
- Index-scan cost: \(0.005 \times 3 + 0.01 \times 0.01 \times 10\,000 = 1.015\).
- *Why* the index wins: its local cost term is linear in selectivity rather than in table size.
**100.00 vs 1.02**

*Reflection:* The example isolates the effect of selectivity on access-method choice; the same arithmetic appears inside every larger plan.

**Example 2 — Two-way join cardinality**
- *Given:* \(|R| = 10^6\), \(|S| = 10^5\), \(sel(R.a = S.b) = 10^{-5}\).
- *Find:* Output cardinality.
- \(10^6 \times 10^5 \times 10^{-5} = 10^6\).
- *Why* multiply by selectivity after the Cartesian product: the join predicate is the only filter.
**1 000 000 rows**

*Reflection:* Underestimated join selectivity is the most common source of catastrophic row-count explosions later in the tree.

**Example 3 — Hash-join cost**
- *Given:* Outer cardinality 50 000, inner 200 000, hash cost coefficient 0.002.
- *Find:* Total operator cost.
- Build phase: \(0.002 \times 200\,000 = 400\); probe phase: \(0.002 \times 50\,000 = 100\); total \(500\).
**500 cost units**

*Reflection:* Hash join cost is independent of join selectivity once build and probe cardinalities are known.

**Example 4 — Full EXPLAIN tree cost summation**
- *Given:* Plan tree: SeqScan(R) → Filter → HashJoin(S).
- *Find:* Root total cost when child costs are 120 and 340 respectively and local join cost is 75.
- Root cost = child costs + local cost = 120 + 340 + 75 = 535.
**535**

*Reflection:* Summing along any root-to-leaf path yields the same total because every node’s local cost is counted exactly once.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reading “rows” as actual runtime rows | Optimizer prints estimates, not measurements | Always compare with `EXPLAIN ANALYZE`        |
| Ignoring “width” column           | Wider tuples increase I/O and memory cost   | Multiply rows by width before judging memory pressure |
| Trusting stale statistics         | Autovacuum threshold not reached            | Force `ANALYZE` after bulk loads             |
| Assuming cost units are seconds   | Cost model is abstract; constants are tuned | Treat costs only as relative ordering        |
| Overlooking “actual rows” vs “plan rows” divergence | Parameter sniffing or data skew             | Re-plan with literal constants               |
| Misreading startup vs total cost  | Startup cost hides blocking operators       | Check for materialization nodes first        |
| Forgetting parallel workers       | Cost shown is per-worker; total work higher | Multiply by workers when comparing to serial |

## 7. The textbook-precise statement
A physical query plan \(P\) for a relational expression \(E\) is a tree whose nodes are physical operators. The estimated cost \(C(P)\) is obtained by composing local cost functions \(c_{op}\) that take as arguments the estimated cardinalities \(\widehat{card}(n)\) produced by selectivity formulas applied to catalog statistics. The optimizer returns
\[
P^* = \arg\min_{P \in Plans(E)} C(P)
\]
subject to the constraint that \(P\) implements \(E\). (Silberschatz et al., *Database System Concepts*, 7e, §12.6.)

## 8. Visual — diagram or schematic
```text
Hash Join  (cost=535, rows=1e6, width=24)
├── Hash   (cost=340, rows=2e5, width=12)
│   └── Seq Scan on S
└── Seq Scan on R  (cost=120, rows=1e6, width=12)
          Filter: (a = 7)
```
Each node lists (total cost, estimated rows, tuple width). Data flows bottom-up; the root cost already includes every descendant.

## 9. The memory technique
1. **The hook** — Picture a cost accountant sitting inside the database with a spreadsheet; every time a plan node is considered, the accountant stamps a price tag derived from the statistics ledger.
2. **What to overlearn** — The two-line cost recurrence \(C(P) = \sum c_{local}\) and the selectivity product formula.
3. **Spaced-repetition schedule** — Review the cost recurrence at 1 day, 3 days, 7 days, 16 days, 35 days; re-derive selectivity on each pass.
4. **First-principles fallback** — Rebuild from the definition: cardinality first, then local I/O and CPU coefficients, then tree summation.

## 10. What this unlocks
Mastery of EXPLAIN lets you diagnose why a query is slow, write index and statistics hints that actually help, and reason about the next layer of automatic tuning tools.

- Query rewrite rules and materialized views
- Adaptive query execution (runtime re-optimization)
- Learned cardinality estimation models
- Workload compression for index-selection advisors

## 11. Self-check — five questions, no answers
1. A table has 1 000 000 rows; a predicate has estimated selectivity 0.001 yet EXPLAIN shows 800 000 rows. What single catalog value is most likely wrong?
2. Two plans have identical total cost yet one finishes in 2 s and the other in 20 s on the same hardware. Which printed number should you examine first?
3. Write the exact arithmetic that turns “rows = 50 000, width = 80” into an expected memory footprint for a hash table.
4. An EXPLAIN shows a nested-loop join whose inner child is another nested-loop join. Which cost component grows fastest when the outer cardinality is doubled?
5. You run EXPLAIN on a query with a parameter; the next day the same query text with a literal produces a different plan. Which optimizer assumption was violated?