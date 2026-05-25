## What it is
A query plan is the sequence of steps a database management system (DBMS) decides to use to execute a SQL query. The `EXPLAIN` command reveals this plan, which is structured as a tree of operations, and includes the planner's *cost estimation*—an abstract, unitless number representing the predicted resource usage (CPU and I/O) for each step and for the query as a whole.

## Why it matters
In scientific computing, you will work with massive datasets—telemetry from a launch vehicle, astronomical survey data, or simulation outputs. A naive query that takes 10 hours on a petabyte-scale dataset can often be rewritten to run in 10 seconds by understanding and optimizing its query plan. This skill is the dividing line between interactive data analysis and multi-day batch jobs; it is fundamental to building performant data-intensive applications.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **SQL:** `SELECT`, `FROM`, `WHERE`, `JOIN` (specifically `INNER` and `LEFT`), `GROUP BY`, `ORDER BY`.
2.  **Relational Algebra:** The formal operations that underpin SQL, especially Selection ($\sigma$), Projection ($\pi$), and Natural Join ($\bowtie$).
3.  **Core Data Structures:** How B-Trees work (the basis for standard indexes) and the principles of Hash Tables (the basis for hash joins).

If any of these are weak, review them first. The query planner's choices are direct applications of these concepts.

## How to study it (step by step)
1.  **Setup:** Create two simple tables, `scientists` (`id` PK, `name`, `field`) and `discoveries` (`id` PK, `scientist_id` FK, `description`, `year`). Populate `scientists` with 10,000 rows and `discoveries` with 1,000,000 rows. Make sure `scientist_id` in `discoveries` is *not* indexed initially.
2.  **Baseline Scan:** Run `EXPLAIN SELECT * FROM discoveries WHERE year = 1957;`. Observe the plan. It will likely be a "Sequential Scan". Note the cost.
3.  **Index Scan:** Create an index on the `year` column: `CREATE INDEX idx_discoveries_year ON discoveries(year);`. Run the *exact same* `EXPLAIN` command from step 2. Compare the new plan ("Index Scan" or "Bitmap Heap Scan") and its cost to the baseline. Why did it change?
4.  **The Join:** Run `EXPLAIN SELECT s.name, d.description FROM scientists s JOIN discoveries d ON s.id = d.scientist_id WHERE s.name = 'Feynman';`. Observe the join algorithm (likely a "Nested Loop") and the order of operations. Note the total cost.
5.  **Force a Bad Plan:** Now, find a scientist who has made many discoveries. Re-run the query from step 4 for them. The cost will be high. Create an index on `discoveries(scientist_id)`. Re-run the `EXPLAIN`. The planner should now switch to a more efficient plan, possibly still a Nested Loop but using the index, or maybe a Hash Join.
6.  **Analyze the Statistics:** Run the command `ANALYZE discoveries;`. This updates the database's internal statistics about the table's data distribution. Re-run the `EXPLAIN` from step 5. Did the cost estimate or the plan itself change? This demonstrates the planner's reliance on accurate statistics.

## Key ideas, with intuition
1.  **Plans are Execution Trees, Read from Leaves to Root:** A query plan is a tree where data flows upwards. The leaves are data access methods (e.g., scanning a table or an index). Intermediate nodes are operations like joins, sorts, or aggregations. The root is the final result set. You always read a plan from the most indented operations (the leaves) outwards to the top-level operation (the root).

2.  **Cost is a Relative, Unitless Measure of Work:** The planner's "cost" is not time. It's an arbitrary unit combining CPU and I/O operations. A typical cost model might look like:
    $$ \text{Total Cost} = (\#\ \text{pages read sequentially} \times C_{seqIO}) + (\#\ \text{pages read randomly} \times C_{randIO}) + (\#\ \text{rows processed} \times C_{cpu}) $$
    The planner's sole job is to find the valid execution tree with the lowest possible `Total Cost` at its root. You only use cost to compare plan A against plan B for the *same query*.

3.  **Cardinality Estimation Drives Everything:** The most critical input to the cost formula is the estimated number of rows (`# rows processed`) that will flow out of each node. The planner estimates this using stored statistics about the data (histograms, most common values, etc.). A bad cardinality estimate is the most common reason for a bad query plan. `EXPLAIN (ANALYZE, BUFFERS)` will show you both the *estimated* rows and the *actual* rows, revealing any discrepancies.

4.  **The Big Three Join Algorithms:**
    *   **Nested Loop Join:** The simplest. For each row in the outer table, scan the entire inner table. Cost is roughly $O(\text{Rows}_{outer} \times \text{Rows}_{inner})$. Terrible, unless the inner loop can use an index, making it $O(\text{Rows}_{outer} \times \log(\text{Rows}_{inner}))$.
    *   **Hash Join:** Build a hash table on the smaller table's join key. Then, stream the larger table, probing the hash table for each row. Cost is $O(\text{Rows}_{outer} + \text{Rows}_{inner})$. Excellent for equality joins, but requires memory for the hash table.
    *   **Merge Join:** If both tables are already sorted on the join key, you can simply walk through them in lock-step. Cost is $O(\text{Rows}_{outer} + \text{Rows}_{inner})$. Requires pre-sorted input, so it often involves explicit Sort nodes in the plan, which are expensive.

## Worked example
Let's use the tables from the "How to study it" section.

**Query:**
```sql
EXPLAIN SELECT s.name, d.description
FROM scientists s
JOIN discoveries d ON s.id = d.scientist_id
WHERE s.name = 'Turing';
```

**Scenario 1: No index on `discoveries.scientist_id`**

The planner might produce this plan (PostgreSQL syntax):
```
-> Nested Loop  (cost=0.29..24406.33 rows=100 width=45)
   -> Index Scan using scientists_pkey on scientists s  (cost=0.29..8.31 rows=1 width=37)
         Index Cond: (name = 'Turing')
   -> Seq Scan on discoveries d  (cost=0.00..24398.00 rows=1000000 width=24)
         Filter: (scientist_id = s.id)
```

**Step-by-step breakdown:**
1.  **Innermost Operation (Leaf):** `Index Scan using scientists_pkey on scientists s`. The planner starts with the `scientists` table. It uses the primary key index to efficiently find the row where `name = 'Turing'`. It estimates it will find `rows=1`. This is the "outer" side of the join. The cost is very low (`0.29..8.31`).
2.  **Other Leaf Operation:** `Seq Scan on discoveries d`. For the *one* row found in the step above, the planner must find matching rows in `discoveries`. With no index on `scientist_id`, its only option is a Sequential Scan—reading the entire 1,000,000-row table from disk. It filters these rows for `scientist_id = s.id`. The cost is enormous (`0.00..24398.00`).
3.  **Root Operation:** `Nested Loop`. This node takes the one row from the `scientists` scan and executes the `discoveries` scan for it. The total cost (`..24406.33`) is essentially the sum of its children's costs.

**Reflection:** This plan is inefficient because for every scientist found (here, just one), it must perform a full, expensive scan of the `discoveries` table. The high cost of the `Seq Scan` is the bottleneck.

**Scenario 2: With an index on `discoveries.scientist_id`**

After `CREATE INDEX idx_discoveries_scientist_id ON discoveries(scientist_id);`, the plan changes:
```
-> Nested Loop  (cost=0.72..13.84 rows=100 width=45)
   -> Index Scan using scientists_pkey on scientists s  (cost=0.29..8.31 rows=1 width=37)
         Index Cond: (name = 'Turing')
   -> Index Scan using idx_discoveries_scientist_id on discoveries d  (cost=0.43..5.51 rows=100 width=24)
         Index Cond: (scientist_id = s.id)
```

**Reflection:** The `Seq Scan` has been replaced by an `Index Scan`. Instead of reading the whole table, the database can now use the new index to look up discoveries for Turing's ID directly. The cost of this step drops from ~24400 to ~5.5, and the total query cost plummets from ~24406 to ~13.84. This demonstrates how a single index, chosen correctly based on the query's join and filter conditions, can change the plan and improve performance by orders of magnitude.

## Diagrams
A query plan is a tree. Data flows up from the leaves (access methods) to the root (final output).

**Plan 1: Inefficient Nested Loop with Sequential Scan**
```text
                  [Nested Loop Join]
                  (s.id = d.scientist_id)
                        /       \
                       /         \
        [Index Scan]              [Seq Scan]
        (on scientists)           (on discoveries)
        (filter: name='Turing')
```

**Plan 2: Efficient Nested Loop with Index Scan**
```text
                  [Nested Loop Join]
                  (s.id = d.scientist_id)
                        /       \
                       /         \
        [Index Scan]              [Index Scan]
        (on scientists)           (on discoveries)
        (filter: name='Turing')   (filter: s.id)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**C**ardinality **A**ffects **P**lan **T**rees" (CAPT). The planner's **C**ardinality estimate is the most critical number. It **A**ffects which **P**lan the optimizer chooses. The plan is always a **T**ree. When you see a bad plan, shout "CAPT!" and check the row estimates.

2.  **Must-Overlearn Facts:**
    *   Plan structure: `Node Type (cost=startup..total rows=N width=W)`. Know what each part means. `cost` is for comparison, `rows` is the key estimate.
    *   The goal: Find the plan with the minimum total cost at the root.
    *   The cause of bad plans: Incorrect cardinality estimates, usually due to stale statistics or complex predicates the planner can't understand.

3.  **Spaced Repetition Schedule:** Review your notes and re-run the `EXPLAIN` examples from the "How to study it" section on these days: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:** If you forget everything, rebuild from this: A database can only do a few things physically: read a whole table, look up a value in an index, compare two values, sort a list of rows, and put rows in a hash table. A query plan is just a recipe combining these basic actions. The "cost" is a simple linear model of disk I/O and CPU work for each action ($Cost = w_{io} \times N_{io} + w_{cpu} \times N_{cpu}$). The planner explores different combinations of actions and picks the recipe with the lowest predicted cost.

## Common mistakes
1.  **Fixating on Cost Instead of Cardinality:** A high cost is a symptom. The disease is often a wildly inaccurate row estimate. If the planner thinks a step will return 1 row but it actually returns 1,000,000, every subsequent step's cost will be wrong, leading to a terrible plan. Always check `rows=` first.
2.  **Assuming an Index is a Silver Bullet:** Using an index to fetch 50% of a table's rows is often *slower* than a sequential scan. An index lookup involves random I/O (jumping around the disk), while a sequential scan is linear, which disks are highly optimized for. The planner knows this and will correctly choose a `Seq Scan` when the selectivity is low.
3.  **Ignoring the `ANALYZE` command:** The planner is only as smart as its statistics. If you bulk-load or heavily modify a table, its statistics become stale. The planner will then operate on false assumptions. Running `ANALYZE` (or having an auto-vacuum daemon do it) is critical for performance.
4.  **Reading the Plan from Top to Bottom:** A query plan is not a sequential script. It's a tree that must be read from the leaves (the most indented lines) up to the root. The first thing that happens is data access at the leaves.

## Self-check
1.  You run `EXPLAIN SELECT * FROM rocket_telemetry WHERE timestamp > '2023-10-26 10:00:00' AND timestamp < '2023-10-26 10:00:01';`. The table is 10TB. What single data structure would you ensure exists on this table to make this query fast, and what two words would you look for in the `EXPLAIN` output to confirm it's being used?
2.  A colleague shows you a query plan joining `parts` and `suppliers`. You see a `Hash Join` node. What does this tell you about the join condition in the SQL query? What resource might this query consume a lot of, besides CPU and I/O?
3.  You run `EXPLAIN (ANALYZE)` on a query. One of the lines reads: `-> Filter (cost=0.00..1500.00 rows=1 loops=1) (actual time=0.01..250.00 rows=500000 loops=1)`. What is the most significant piece of information in this line, and what does it tell you about the planner's performance?