## 1. The one-sentence answer
**The relational model organises data into tables (relations) where each row is a tuple, each column is an attribute drawn from a domain, and NULL represents the absence of a value.**

A table is the fundamental unit. Every table has a fixed set of columns that define what kind of data can live in that table. Each row holds one concrete instance of those columns. Because the model is set-based, duplicate rows are not allowed unless you explicitly define a multiset view later.

NULL is not zero, not empty string, and not false. It simply means the value is missing or inapplicable for that particular row. This single rule forces every operation (selection, projection, join) to handle three-valued logic instead of ordinary Boolean logic.

> [!NOTE]
> The deepest insight is that the entire model rests on one mathematical object: a relation is a subset of the Cartesian product of its attribute domains. Everything else (keys, constraints, NULL handling) is derived from this definition.

## 2. Why this matters — concrete and current
PostgreSQL powers financial transaction ledgers at Stripe; every payment record is stored as a row whose “refunded_at” column is NULL until a refund occurs, allowing the system to distinguish “not yet refunded” from “refund timestamp zero”.

Google Spanner uses the relational model with true-time timestamps to keep globally distributed banking and advertising ledgers consistent; columns carry typed domains while NULLs represent optional regulatory fields that differ by jurisdiction.

SpaceX telemetry pipelines store rocket sensor readings in TimescaleDB; a pressure sensor column may legitimately be NULL during pre-flight checkout, and queries must filter these rows without treating NULL as a numeric zero that would corrupt statistical models.

Semiconductor fabs at TSMC log process parameters in relational tables inside their manufacturing execution systems; a “lot_completion_time” column is NULL for wafers still in the cleanroom, enabling real-time dashboards to separate finished lots from in-flight ones.

Apple’s HealthKit stores user metrics in an on-device SQLite relational store; the “blood_pressure_systolic” column is NULL when a user records only heart rate, and aggregate analytics must correctly ignore these rows rather than impute zero.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Set                  | A relation is literally a set of tuples; duplicate rows are forbidden by definition. |
| Cartesian product    | The schema of a table is the Cartesian product of column domains; each row is one element of that product. |
| Three-valued logic   | NULL forces every comparison to evaluate to true, false, or unknown. |
| Domain / type        | Each column is restricted to a declared domain; NULL is outside every domain. |

If any of these four ideas are shaky, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A table is a named set of rows
A table simply groups facts that share the same structure. Imagine listing every student in a class; each student occupies one line and every line contains the same pieces of information (roll number, name, grade).

Example: a “Students” table with three rows.

Formal statement: A relation \(R\) over attributes \(A_1, \dots, A_n\) is a finite set of tuples \(\{(t_1, \dots, t_n)\}\) where each \(t_i\) belongs to the domain of \(A_i\).

> [!WARNING]
> Treating a table as a list instead of a set immediately breaks uniqueness guarantees and later produces wrong join cardinalities.

### Step 2 — Rows are tuples, not records
Each row is an ordered tuple whose position corresponds to a column. Order of rows themselves carries no meaning; only the values matter.

Example: (101, "Asha", 9.2) is one tuple in the Students relation.

Formal statement: \( t \in R \) where \( t \) is an element of \( \text{dom}(A_1) \times \dots \times \text{dom}(A_n) \).

> [!WARNING]
> Assuming “first row” or “last row” has special status will fail on any real engine that may physically reorder pages.

### Step 3 — Columns are attributes with fixed domains
Every column has a name and a data type (domain). The domain defines the legal values; the name gives semantic meaning.

Example: column “grade” has domain REAL and may only contain numbers between 0.0 and 10.0.

Formal statement: Attribute \(A_i\) is a pair \((\text{name}_i, D_i)\) where \(D_i\) is the domain.

> [!WARNING]
> Mixing values from different domains in one column (storing both CGPA and semester numbers in the same numeric column) violates domain integrity and produces nonsensical aggregates.

### Step 4 — NULL is a marker outside every domain
NULL is not a value in any domain. It signals that no value from the domain has been supplied for that cell.

Example: a student who has not yet received a grade has NULL in the grade column.

Formal statement: For any attribute \(A_i\), the cell value may be an element of \(D_i\) or the special symbol NULL \(\notin D_i\).

> [!WARNING]
> Comparing NULL with any value using ordinary equality always yields unknown, never true or false; forgetting this produces missing rows in results.

### Step 5 — Primary keys guarantee tuple uniqueness
A subset of columns whose values uniquely identify each tuple is declared the primary key. NULL is forbidden inside primary-key columns.

Formal statement: A set \(K \subseteq \{A_1, \dots, A_n\}\) is a candidate key if the projection \(\pi_K(R)\) is injective.

> [!WARNING]
> Allowing NULL in a primary-key column destroys uniqueness and makes joins unreliable.

### Step 6 — Three-valued logic governs all predicates
Any predicate involving NULL evaluates to true, false, or unknown. Only rows that evaluate to true are returned by a selection.

Formal statement: The result of a selection \(\sigma_p(R)\) contains exactly those tuples for which predicate \(p\) evaluates to true.

> [!WARNING]
> Writing “WHERE grade = NULL” never returns rows; you must use “IS NULL”.

## 5. Worked examples — har step show karo

**Example 1 — Simple table definition**
- *Given:* Create a table of employees with id, name, and salary.
- *Find:* The relational definition.
- Step 1: Declare columns and domains → id INTEGER NOT NULL, name TEXT NOT NULL, salary NUMERIC.
- Step 2: Choose primary key → id.
- Step 3: Insert first row → (1, 'Ravi', 60000).
- *Why* we declared domains first: the engine can reject any later attempt to store a string in salary.
**Final answer:** Relation Employees with schema (id: INTEGER, name: TEXT, salary: NUMERIC) and key {id}.

*Reflection:* This example is simple yet already encodes domain integrity and uniqueness; both will matter in every later join.

**Example 2 — Inserting a row with NULL**
- *Given:* Same Employees table.
- *Find:* Insert a contractor whose salary is unknown.
- Step 1: INSERT INTO Employees VALUES (2, 'Meera', NULL).
- Step 2: The engine accepts the row because salary permits NULL.
- *Why* NULL is allowed here: salary is not part of the primary key.
**Final answer:** Row (2, 'Meera', NULL) now exists.

*Reflection:* Students often expect the row to be rejected; the key point is that only primary-key columns forbid NULL.

**Example 3 — Query that filters NULL**
- *Given:* Employees table with one NULL salary.
- *Find:* All employees whose salary is at least 50000.
- Step 1: SELECT * FROM Employees WHERE salary >= 50000.
- Step 2: The row with NULL is excluded because the predicate evaluates to unknown.
- *Why* the row disappears: three-valued logic discards unknown results.
**Final answer:** Only rows with concrete salaries ≥ 50000 are returned.

*Reflection:* This is the classic trap; many beginners write “!= NULL” expecting the opposite behaviour.

**Example 4 — Join involving NULL**
- *Given:* Employees and Projects tables; project manager_id may be NULL.
- *Find:* All projects and their manager names.
- Step 1: SELECT p.name, e.name FROM Projects p LEFT JOIN Employees e ON p.manager_id = e.id.
- Step 2: Projects whose manager_id is NULL still appear, but manager name is NULL.
- *Why* LEFT JOIN is required: an inner join would silently drop those projects.
**Final answer:** Result contains every project; manager name is NULL exactly when manager_id was NULL.

*Reflection:* The example shows how NULL propagates through outer joins and forces explicit handling in reporting queries.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using = NULL instead of IS NULL   | Habit from two-valued Boolean thinking      | Always write IS NULL / IS NOT NULL           |
| Declaring a primary key that allows NULL | Misunderstanding that keys must be unique and known | Add NOT NULL constraint on every PK column   |
| Treating NULL as zero in aggregates | Assuming missing numeric data equals zero   | Use COUNT, SUM, AVG with explicit NULL handling or COALESCE |
| Assuming row order is stable      | Thinking of tables as files or spreadsheets | Never rely on physical order; always sort explicitly |
| Storing two different meanings in one column with NULL | Trying to encode “not applicable” and “unknown” together | Split into separate columns or add a status column |
| Forgetting that UNIQUE constraints allow multiple NULLs | Believing NULL equals NULL                  | Add a partial unique index or use a sentinel value when needed |
| Joining on columns that may contain NULL | Expecting NULL = NULL to match              | Use COALESCE or explicit IS NULL predicates in join conditions |

## 7. The textbook-precise statement
A relation schema \(R(A_1, \dots, A_n)\) consists of a relation name \(R\) and a list of attributes \(A_i\). Each attribute \(A_i\) is associated with a domain \(\text{dom}(A_i)\). A relation instance \(r(R)\) is a finite set of tuples where each tuple \(t\) maps every attribute \(A_i\) to a value in \(\text{dom}(A_i) \cup \{\text{NULL}\}\), with the restriction that no attribute in a designated primary key may receive NULL. Two tuples are identical if and only if they agree on every attribute value, treating NULL as equal to NULL only for identity testing inside the set definition. (Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §5.1–5.2)

## 8. Visual — diagram or schematic
```text
Employees
+----+--------+--------+
| id | name   | salary |
+----+--------+--------+
|  1 | Ravi   |  60000 |
|  2 | Meera  |   NULL |   ← NULL is not zero, not blank
+----+--------+--------+
Primary key: {id}
Domain of salary: NUMERIC ∪ {NULL}
```

## 9. The memory technique
1. **The hook** — Picture an empty chair at a dinner table labelled “NULL”; the chair is physically present but no person sits there.
2. **What to overlearn** — (a) NULL ≠ any value including another NULL, (b) primary keys forbid NULL, (c) three-valued logic discards unknown results.
3. **Spaced-repetition schedule** — Review the three facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive from the Cartesian-product definition: if a cell is not in any domain, it cannot participate in equality; therefore every comparison yields unknown.

## 10. What this unlocks
Once you internalise tables, rows, columns and NULL you can move directly to normalisation, query optimisation, and transaction semantics without hidden assumptions.

- Normalisation (1NF–BCNF) rests on functional dependencies between columns.
- SQL join algorithms (hash, merge, nested-loop) all treat NULL specially.
- ACID transactions rely on constraint checking that must handle NULL correctly.
- Window functions and analytic queries inherit three-valued logic from the base model.

## 11. Self-check — five questions, no answers
1. Write the relational algebra expression that returns every employee whose salary is not NULL and is greater than 50000.
2. A table has columns (a, b) with primary key {a}. Can you insert two rows where a = 5 and b = NULL? Explain.
3. In a LEFT OUTER JOIN, under what exact condition does the right-hand side produce all-NULL values?
4. Why does COUNT(*) return a different number from COUNT(salary) when salary contains NULLs?
5. Suppose you change the domain of a column from INTEGER to TEXT. Which existing NULLs remain valid and why?