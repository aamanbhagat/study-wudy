## 1. The one-sentence answer
**Stored procedures, triggers, and functions are named blocks of SQL code stored inside the database that execute on demand or on events, moving logic from application code into the engine itself.**

They exist because repeated ad-hoc queries waste network round-trips and allow inconsistent business rules. A stored procedure bundles a sequence of statements into a single callable unit that the database parses and caches once. A trigger attaches that same logic to an implicit event such as an INSERT so the database runs it automatically. A function is a variant that returns a single value and therefore can appear inside SELECT lists or WHERE clauses.

The distinction matters for performance and correctness. Procedures and triggers reduce client-server chatter and enforce rules even when multiple applications touch the same tables. Functions give query writers reusable expressions without side effects when written properly.

> [!NOTE]
> The decisive advantage is not syntax; it is that the database can optimize, secure, and audit the logic in one place rather than in every client.

## 2. Why this matters — concrete and current
Payment processors such as Stripe run stored procedures inside PostgreSQL to atomically debit one account and credit another while writing an immutable ledger row; any failure rolls back the entire procedure so double-spend is impossible.

E-commerce platforms built on SQL Server attach triggers to inventory tables so that every order insert automatically decrements stock and, when quantity reaches zero, fires a second trigger that inserts a replenishment request into a warehouse queue.

Machine-learning feature stores at companies such as Uber rely on database functions that compute time-window aggregates directly inside the query planner, eliminating the need to export millions of rows to Spark for every training batch.

Audit and compliance systems mandated by regulations such as SOX store triggers on every financial table; the trigger writes an immutable copy of the old row plus the acting user and timestamp into a separate schema that application developers cannot modify.

Semiconductor supply-chain databases at TSMC use functions to calculate rolling yield statistics; the function is referenced inside materialised views that refresh every hour, giving engineers a single source of truth without duplicating aggregation logic.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Basic SQL (SELECT, INSERT, UPDATE, DELETE) | Every procedure, trigger, and function is built from these statements. |
| Transaction semantics (ACID, COMMIT/ROLLBACK) | Procedures and triggers run inside transactions; you must understand atomicity to avoid partial updates. |
| Table and column metadata | Triggers reference OLD and NEW row images; functions often need schema-qualified names. |
| Client-server round-trip cost | The primary motivation for moving logic into the database. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Encapsulate a sequence of statements
A stored procedure is simply a named, persistent sequence of SQL statements that the server stores and later executes as a unit.  
Example: a procedure that transfers money between two accounts.  
Formal statement:  
$$ \text{CREATE PROCEDURE } P(\text{params}) \text{ AS } \langle\text{stmt}_1;\dots;\text{stmt}_n\rangle $$  
> [!WARNING]
> If you treat the procedure as a mere macro that the client expands, you will still pay a round-trip for every internal statement instead of one call.

### Step 2 — Bind execution to an event
A trigger is a procedure whose invocation is implicit on a data-manipulation event.  
Example: after every INSERT into Orders, update total_sales.  
Formal statement:  
$$ \text{CREATE TRIGGER } T \text{ AFTER INSERT ON } R \text{ FOR EACH ROW EXECUTE } P $$  
> [!WARNING]
> Forgetting the FOR EACH ROW clause turns the trigger into a statement-level one that fires only once per statement, silently breaking row-by-row invariants.

### Step 3 — Return a value instead of side-effects
A function is a stored routine that must return exactly one value and is therefore legal inside queries.  
Example: a function that computes discounted price.  
Formal statement:  
$$ \text{CREATE FUNCTION } F(\text{params}) \text{ RETURNS } \tau \text{ AS } \langle\text{body returning value of type }\tau\rangle $$  
> [!WARNING]
> Declaring a function with side-effects (INSERT inside it) violates the optimizer’s assumption of purity and can produce non-deterministic query plans.

### Step 4 — Parameter modes and visibility
Procedures accept IN, OUT, and INOUT parameters; functions accept only IN. Both can read and write tables visible in the current transaction.  
Formal statement: parameter mode appears in the signature, e.g.,  
$$ P(\text{IN } a\ \text{INTEGER}, \text{OUT } b\ \text{INTEGER}) $$  
> [!WARNING]
> Using OUT parameters in a function (illegal in most engines) leads to syntax errors that only appear at runtime.

### Step 5 — Execution context and privileges
The routine executes with the privileges of its definer or its invoker, chosen at creation time.  
Formal statement:  
$$ \text{CREATE PROCEDURE … SQL SECURITY DEFINER} $$  
> [!WARNING]
> Choosing DEFINER without auditing the definer’s grants creates privilege-escalation paths that application-level checks cannot see.

### Step 6 — The unified model
All three constructs are catalog objects of type ROUTINE; triggers are additionally linked to an event and a subject table. The engine stores their source, compiled plan, and dependency graph in the system catalog.

## 5. Worked examples — every step shown

**Example 1 — Trivial procedure**  
*Given:* Table Accounts(id, balance).  
*Find:* Procedure to credit an account.  
Step 1: CREATE PROCEDURE credit(acc INT, amt NUMERIC) AS $$ UPDATE Accounts SET balance = balance + amt WHERE id = acc; $$  
*Why:* The body is stored verbatim.  
Step 2: CALL credit(42, 100.00);  
*Why:* Single network call executes the cached plan.  
**Final answer**  
The procedure is now a first-class catalog object callable by any client with EXECUTE privilege.

**Example 2 — Audit trigger**  
*Given:* Table Employees and audit table Employee_audit.  
*Find:* Trigger that logs salary changes.  
Step 1: CREATE TRIGGER trg_salary AFTER UPDATE ON Employees FOR EACH ROW  
WHEN (OLD.salary <> NEW.salary)  
INSERT INTO Employee_audit VALUES (OLD.id, OLD.salary, NEW.salary, CURRENT_USER, now());  
*Why:* The WHEN clause prunes unnecessary firings.  
**Final answer**  
Every salary update now writes an immutable row regardless of which application performed the change.

**Example 3 — Scalar function inside SELECT**  
*Given:* Table Orders(order_id, amount, tax_rate).  
*Find:* Net amount after tax.  
Step 1: CREATE FUNCTION net(amount NUMERIC, rate NUMERIC) RETURNS NUMERIC AS $$ SELECT amount * (1 + rate); $$  
Step 2: SELECT order_id, net(amount, tax_rate) FROM Orders;  
*Why:* The function is inlined or cached by the planner.  
**Final answer**  
The query returns computed net values without client-side arithmetic.

**Example 4 — Procedure with transaction and error handling**  
*Given:* Two accounts and a transfer amount.  
*Find:* Safe transfer or full rollback.  
Step 1: BEGIN;  
Step 2: UPDATE … debit …;  
Step 3: UPDATE … credit …;  
Step 4: IF error THEN ROLLBACK; ELSE COMMIT;  
*Why:* The entire procedure participates in one transaction context.  
**Final answer**  
Either both updates succeed or neither does, even if the client crashes after the CALL.

*Reflection:* The last example shows that control-flow and transaction boundaries are the true source of complexity; syntax is secondary.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Trigger recursion | Trigger on table T fires an UPDATE on T, re-firing itself | Use recursive trigger flags or move logic to a separate table |
| N+1 query explosion inside a loop in a procedure | Developer writes a cursor over rows and issues one query per row | Replace with set-based statements or temporary tables |
| Function marked IMMUTABLE yet reads a table | Optimizer caches results incorrectly | Mark only pure mathematical functions IMMUTABLE |
| Privilege creep via DEFINER routines | Routine created by superuser remains executable after grants revoked | Audit definer ownership and prefer INVOKER when possible |
| Hidden plan cache bloat | Thousands of procedures created with literal values instead of parameters | Always use parameter markers |
| Statement-level vs row-level confusion | Default is statement-level in some engines | Explicitly write FOR EACH ROW when row images are required |
| Deadlock between trigger and application transaction | Trigger acquires locks after application has started its own | Keep trigger bodies short and document lock order |

## 7. The textbook-precise statement
A stored routine is a schema object whose definition is a pair (signature, body) stored in the INFORMATION_SCHEMA.ROUTINES view. Execution replaces the call with the body under the chosen security context and within the current transaction. A trigger is a routine additionally associated with a triggering event (INSERT|UPDATE|DELETE), a subject table, and an activation time (BEFORE|AFTER|INSTEAD OF). Functions are routines whose return clause is non-void and whose invocation is expression-legal. See Elmasri & Navathe, *Fundamentals of Database Systems*, 7e, §10.4–10.5.

## 8. Visual — diagram or schematic
```text
Client
  |
  v  CALL proc(42)
Database Engine
  |
  +-- Parser --+
  |            |
  v            v
Catalog lookup  Plan cache hit?
  |                 |
  +-----------------+
            |
            v
   Execute body (inside tx)
            |
      +-----+-----+
      |           |
   Trigger?     Function?
      |           |
      v           v
   Event queue   Return value
```

## 9. The memory technique

1. **The hook** — Picture a factory: procedures are the scheduled machines you press a button to start, triggers are the emergency stop switches wired to conveyor belts, and functions are the calibrated gauges you can read inside any report.

2. **What to overlearn** — The three creation keywords (CREATE PROCEDURE, CREATE TRIGGER, CREATE FUNCTION), the OLD/NEW pseudorecords, and that only functions may appear in SELECT expressions.

3. **Spaced-repetition schedule** — Review syntax at 1 day, write one trigger from memory at 3 days, refactor a procedure into a function at 7 days, explain security contexts at 16 days, and design a full audit system at 35 days.

4. **First-principles fallback** — Start from “I need the database to guarantee this rule even if the client is compromised,” then decide whether the rule runs on explicit call (procedure), on data change (trigger), or inside a query (function).

## 10. What this unlocks
Mastery of these constructs lets you push consistency, auditing, and performance logic into the storage layer, which in turn simplifies application code and reduces attack surface.

- Materialised views and incremental refresh logic
- Row-level security policies that call functions
- Event-driven architectures using LISTEN/NOTIFY together with triggers
- Zero-trust database designs where applications receive only EXECUTE grants

## 11. Self-check — five questions, no answers
1. Write the shortest stored procedure that inserts a row into table Log and returns the generated primary-key value via an OUT parameter.

2. A trigger on table T updates table U; a trigger on U updates table T. What single clause prevents infinite recursion, and where does it belong?

3. Explain why marking a function that reads from a table as IMMUTABLE can produce wrong answers after the table changes.

4. Convert a cursor-based procedure that processes one order at a time into an equivalent set-based statement; state the performance difference in big-O terms.

5. Design a trigger-based audit system that records both the full old row and the exact SQL statement that caused the change, while preventing any user from truncating the audit table.