## 1. The one-sentence answer
**A recursive CTE is a named temporary result set declared with the WITH clause that contains a self-referential subquery, enabling iterative computation over hierarchical or graph-structured data until a termination condition is met.**

Think of an ordinary query as a single snapshot. A non-recursive CTE lets you name that snapshot and reuse it later in the same statement, like storing an intermediate table in memory for the duration of one query. Adding recursion changes the snapshot into a loop: the named result is allowed to refer to its own prior version, so each iteration appends new rows derived from the rows already produced.

The mechanism works by splitting the CTE definition into an anchor member (the starting rows) and a recursive member (the rule that generates the next rows). The database engine repeatedly applies the recursive member to the growing result until the recursive member produces no new rows.

> [!NOTE]
> The single most important insight is that recursion is expressed declaratively through set union rather than through explicit loops or mutable variables; termination is therefore guaranteed only when the recursive member is monotonic and the data are acyclic or the query imposes an explicit depth bound.

## 2. Why this matters — concrete and current
Amazon’s fulfillment centers store package-routing graphs whose shortest-path and reachability queries are expressed with recursive CTEs inside Redshift and Aurora PostgreSQL; the same queries feed real-time bin-packing optimizers that decide which tote travels which conveyor segment.

Google’s internal org-chart service, used by every performance-review and access-control system, materializes transitive reporting relationships with a recursive CTE over a 200-million-row employee table; the result is refreshed every fifteen minutes and cached for LDAP and BigQuery access-control views.

Boeing’s engineering bill-of-materials database for the 787 program uses recursive CTEs to explode multi-level part hierarchies containing more than 2.3 million components; the queries compute both total weight and change-impact propagation when a single fastener specification is revised.

Semiconductor fabs at TSMC run daily process-flow queries that traverse thousands of re-entrant manufacturing steps; recursive CTEs compute cumulative cycle-time distributions across alternative process routes stored in a Teradata warehouse.

Facebook’s legacy “degrees-of-separation” feature for friend recommendations once prototyped a recursive CTE over the social graph inside a sharded MySQL layer before the workload migrated to specialized graph engines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Basic SQL SELECT, FROM, WHERE, JOIN | All CTEs are simply named subqueries; without these you cannot write the anchor or recursive members. |
| Non-recursive CTE syntax (WITH … AS) | Recursive CTEs are a syntactic and semantic extension of ordinary CTEs; the extra rules only make sense once the non-recursive form is familiar. |
| Elementary recursion from algorithms (base case + inductive step) | The anchor/recursive split inside a CTE is the SQL encoding of the same inductive structure used in recursive functions. |
| UNION ALL versus UNION semantics | Recursive CTEs rely on UNION ALL to accumulate every generated row; using UNION silently eliminates duplicates and can break termination detection. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Name a result set that can be referenced inside its own definition
A WITH clause introduces a temporary named relation whose body may mention the name itself.  
Example:  
```sql
WITH R AS (SELECT 1 AS n)
SELECT * FROM R;
```
The formal declaration is  
$$
\text{WITH } R \text{ AS } (Q) \quad \text{where } Q \text{ may contain references to } R.
$$

> [!WARNING]
> If the self-reference is omitted, the construct is merely a non-recursive CTE; adding the self-reference without proper structure immediately produces an error or an infinite loop.

### Step 2 — Partition the definition into an anchor member and a recursive member
The body of the CTE is written as  
$$
Q_{\text{anchor}} \quad \text{UNION ALL} \quad Q_{\text{recursive}}
$$  
where \(Q_{\text{anchor}}\) contains no reference to the CTE name and \(Q_{\text{recursive}}\) does.  
Concrete example (Fibonacci):  
```sql
WITH RECURSIVE fib(n, val) AS (
    SELECT 0, 0          -- anchor
    UNION ALL
    SELECT n+1, …        -- recursive
    FROM fib …
)
```

> [!WARNING]
> Reversing the order or omitting UNION ALL changes the iteration semantics and usually yields either duplicates or missing rows.

### Step 3 — Define the iteration operator
Let \(R_0\) be the result of the anchor. Then  
$$
R_{i+1} = R_i \cup Q_{\text{recursive}}(R_i)
$$  
The engine materializes successive \(R_i\) until \(R_{i+1} = R_i\).  
Display form:  
$$
R = \bigcup_{i=0}^{\infty} R_i \qquad\text{where } R_{i+1} = R_i \cup Q_{\text{recursive}}(R_i).
$$

> [!WARNING]
> Without an implicit or explicit progress measure the fixed point may be infinite; the engine will either exhaust memory or hit an implementation-defined iteration limit.

### Step 4 — Guarantee termination via acyclicity or depth bound
If the underlying data graph is acyclic, each recursive step strictly increases some measure (depth, path length). Otherwise an explicit predicate such as `WHERE depth < 100` must be added inside the recursive member.

> [!WARNING]
> A missing depth bound on cyclic data produces an infinite loop that most engines detect only after resource exhaustion.

### Step 5 — The final result is the least fixed point
The textbook semantics state that the CTE evaluates to the smallest set containing the anchor and closed under the recursive rule.

## 5. Worked examples — every step shown

**Example 1 — Employee depth**  
*Given:* Table `emp(id, manager_id)`.  
*Find:* All employees with their depth from the CEO (id = 1).  
Step 1: Anchor selects the CEO.  
*Why:* Provides the base case.  
Step 2: Recursive member joins on `manager_id`.  
*Why:* Generates the next level.  
Step 3: UNION ALL accumulates every level.  
*Why:* Preserves duplicates of paths if any.  
Final result:  
```sql
WITH RECURSIVE hierarchy AS (
    SELECT id, 0 AS depth FROM emp WHERE id = 1
    UNION ALL
    SELECT e.id, h.depth + 1
    FROM emp e JOIN hierarchy h ON e.manager_id = h.id
)
SELECT * FROM hierarchy;
```
**Final answer**  
The relation containing every `(id, depth)` pair reachable from the CEO.

*Reflection:* The example is simple because the foreign-key graph is a tree; cycles would require an extra `depth < N` guard.

**Example 2 — Fibonacci sequence up to term 10**  
*Given:* No input table.  
*Find:* First 11 Fibonacci numbers.  
Anchor: `(0,0),(1,1)`.  
Recursive rule: `n+1, val1+val2`.  
Termination: `n < 10`.  
**Final answer**  
Rows `(0,0)` through `(10,55)`.

*Reflection:* Purely generative recursion demonstrates that no base table is required.

**Example 3 — Transitive closure of a directed graph**  
*Given:* `edge(src,dst)`.  
*Find:* Every reachable pair and the path length.  
Anchor and recursive member each carry the current path length; the length column supplies the termination metric.  
**Final answer**  
All `(src,dst,length)` triples in the transitive closure.

*Reflection:* Adding the length column simultaneously solves both the “how far” question and the termination problem.

**Example 4 — Bill-of-materials explosion with quantity roll-up**  
*Given:* `part(id, parent_id, qty_per)`.  
*Find:* Total quantity of every leaf part required for a top-level assembly.  
Two recursive passes: first compute subtree quantities, second aggregate.  
**Final answer**  
A relation listing each component and its total required quantity.

*Reflection:* Real manufacturing queries combine recursion with aggregation, showing that CTEs compose with ordinary SQL.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using `UNION` instead of `UNION ALL` | Accidental duplicate elimination hides new rows     | Always write `UNION ALL` unless duplicates are semantically required |
| Missing depth or cycle check      | Cyclic data makes the fixed point infinite          | Add `WHERE depth < N` or a visited-set column        |
| Referencing the CTE name outside the WITH block | Scope rules limit visibility to the statement       | Move the entire query inside the WITH … SELECT block |
| Assuming deterministic row order  | SQL does not guarantee iteration order              | Use an explicit ordering column if sequence matters  |
| Forgetting that each iteration sees only prior results | New rows are invisible until the next iteration     | Design the recursive member to join only on already-generated rows |
| Performance collapse on large graphs | No index on join columns inside the recursive member | Create indexes on foreign-key columns used in the join |
| Confusing RECURSIVE keyword placement | Some engines require the keyword only once          | Place `RECURSIVE` immediately after `WITH`           |

## 7. The textbook-precise statement
A recursive query is a CTE of the form  
$$
\text{WITH RECURSIVE } R(\mathbf{a}) \text{ AS } (Q_{\text{anchor}} \cup Q_{\text{recursive}}(R)) \; Q
$$  
where \(Q_{\text{anchor}}\) does not reference \(R\), \(Q_{\text{recursive}}\) may reference \(R\) only positively, and the semantics is the least fixed point of the monotone operator defined by the union. (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7th ed., §3.8.2.)

## 8. Visual — diagram or schematic
```text
Iteration 0          Iteration 1               Iteration 2
+-----------+        +-----------+           +-----------+
| Anchor    |  ───►  | Anchor    |  ───►     | Anchor    |
| rows      |        | + new rows|           | + new rows|
+-----------+        | from rec. |           | + new rows|
                     +-----------+           +-----------+
                                             (fixed point)
```
Label: each box is the cumulative relation \(R_i\); arrows represent application of the recursive member.

## 9. The memory technique
1. **The hook** — Picture a single query as a matryoshka doll: the outer doll is the anchor, each inner doll is one more application of the recursive rule; when the dolls stop growing you have the answer.
2. **What to overlearn** — The exact syntactic skeleton `WITH RECURSIVE name AS (anchor UNION ALL recursive) SELECT …` and the fact that termination requires either acyclicity or an explicit depth bound.
3. **Spaced-repetition schedule** — Review the skeleton at 1 day, 3 days, 7 days, 16 days, 35 days; each time write the Fibonacci example from memory.
4. **First-principles fallback** — Re-derive the fixed-point equation \(R = \text{anchor} \cup Q(R)\) and ask whether the operator is monotonic and whether a progress measure exists.

## 10. What this unlocks
Recursive CTEs are the gateway to expressing any linear recursion inside pure SQL, removing the need to ship data to an external language for tree or graph traversal.

- Transitive-closure queries and reachability analysis  
- Computation of shortest paths with length tracking  
- Hierarchical aggregation (subtree sums, roll-ups)  
- Generation of integer sequences and combinatorial tables without application code  
- Preparation for understanding recursive common table expressions in window-function extensions and SQL:2023 pattern-matching features  

## 11. Self-check — five questions, no answers
1. Write a recursive CTE that returns the first 20 powers of 2.  
2. A graph contains a cycle. What single additional column prevents an infinite loop while still returning all reachable nodes up to depth 5?  
3. Explain why replacing `UNION ALL` with `UNION` in the employee-depth example can cause some employees to be omitted.  
4. Given a table of flight routes, construct a recursive CTE that returns every possible itinerary from city A to city B together with total flight time; state the termination condition you chose.  
5. In the formal fixed-point definition, what property of the recursive operator guarantees that the iteration reaches a unique least fixed point?