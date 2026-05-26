## 1. The one-sentence answer
**SQL DDL statements CREATE, ALTER, DROP, and TRUNCATE define, modify, and remove database objects such as tables, indexes, and schemas at the structural level.**

These commands operate on the *schema* rather than on rows of data. CREATE establishes new objects with explicit column definitions and constraints. ALTER changes an existing object’s definition after it has been created. DROP removes the object entirely, while TRUNCATE empties all rows without deleting the object definition itself.

The distinction matters because DDL statements are typically executed once during design or migration phases and often trigger implicit commits in many database systems, making their effects permanent and non-transactional in the usual sense.

> [!NOTE]
> The single most important insight is that these four statements change *metadata*, not *data*; once executed they redefine what the database engine believes the table or index looks like, and subsequent DML operations must obey the new definition.

## 2. Why this matters — concrete and current
SpaceX uses DDL statements inside its telemetry ingestion pipeline to add new sensor columns to vehicle tables during flight-test campaigns without rebuilding the entire warehouse.  

Semiconductor foundries such as TSMC store process-control data in PostgreSQL clusters; ALTER TABLE statements are applied during process-node transitions to widen numeric columns from 32-bit to 64-bit precision while preserving existing rows.  

Machine-learning feature stores at companies such as Uber rely on CREATE TABLE … PARTITION BY statements to enforce time-based partitioning policies that keep training-set queries within SLA bounds.  

The SQLite team documented the addition of STRICT tables via CREATE TABLE in version 3.37; this change eliminated an entire class of type-affinity bugs that had affected embedded aerospace and medical devices.  

Google’s Spanner DDL dialect supports online schema changes through ALTER TABLE statements that run concurrently with production traffic, a technique described in the 2017 OSDI paper on Spanner’s schema-change protocol.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Relational table         | Every DDL statement ultimately produces or modifies a table or index whose rows obey a declared schema. |
| Column data type         | CREATE and ALTER require explicit type declarations; mismatches produce runtime errors later. |
| Constraint               | PRIMARY KEY, FOREIGN KEY, NOT NULL, and CHECK are declared inside CREATE or added via ALTER. |
| Transaction semantics    | Many engines treat DDL as auto-commit; understanding this prevents lost work when mixing DDL and DML. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Objects must be declared before they can be used
A database cannot store rows until it knows the names and types of the columns.  
Example: writing `CREATE TABLE sensors (id INTEGER, value REAL);` tells the engine to allocate catalog entries for a table named sensors.  
Formally:  
$$ \text{CREATE TABLE } T (C_1 \, D_1, \dots, C_n \, D_n) $$  
allocates a new relation symbol \(T\) whose attribute domains are given by the \(D_i\).  

> [!WARNING]
> Omitting a column in the declaration means the column can never receive data later without an explicit ALTER.

### Step 2 — Existing declarations can be extended or tightened
Once an object exists, its definition may need to evolve.  
Example: `ALTER TABLE sensors ADD COLUMN ts TIMESTAMP;` extends the schema.  
Formally the operation is a schema morphism  
$$ \sigma' = \sigma \cup \{C_{n+1} : D_{n+1}\} $$  
that must preserve existing data when the added column is nullable.

> [!WARNING]
> Adding a NOT NULL column without a DEFAULT value will fail on any table that already contains rows.

### Step 3 — Removal can target either the container or its contents
Two distinct removal granularities exist: discarding the definition (DROP) versus discarding only the rows (TRUNCATE).  
Example: `DROP TABLE sensors;` deletes both data and metadata; `TRUNCATE TABLE sensors;` deletes only rows.  
Formally:  
$$ \text{DROP TABLE } T \quad \text{removes } T \text{ from the catalog} $$  
while  
$$ \text{TRUNCATE TABLE } T \quad \text{sets } |T| = 0 \text{ but retains the schema of } T. $$

> [!WARNING]
> TRUNCATE is usually non-transactional and cannot be rolled back; confusing it with DELETE loses the ability to recover data via ROLLBACK.

### Step 4 — Constraints are part of the schema definition
Column and table constraints are declared inside CREATE or added later with ALTER.  
Example: `ALTER TABLE sensors ADD CONSTRAINT pk PRIMARY KEY (id);` attaches an index-backed uniqueness rule.  
The resulting schema is a pair \( (R, \Gamma) \) where \( \Gamma \) is the set of integrity constraints.

> [!WARNING]
> Adding a PRIMARY KEY to a table that already contains duplicate values will abort the ALTER statement.

### Step 5 — The catalog is the single source of truth
All four statements ultimately update the system catalog tables. Subsequent queries consult these catalog entries to validate column references and type compatibility. This closes the loop from declaration to enforcement.

## 5. Worked examples — every step shown

**Example 1 — Minimal table creation**  
*Given:* An empty database.  
*Find:* Create a table to store integer identifiers and floating-point measurements.  
Step 1: Write the CREATE statement.  
*Why*: The engine must receive both name and typed columns.  
Step 2: Execute `CREATE TABLE readings (id INT, val DOUBLE);`.  
*Why*: INT and DOUBLE are primitive domains recognized by the catalog.  
**Final answer**  
```sql
CREATE TABLE readings (id INT, val DOUBLE);
```

**Example 2 — Adding a timestamp column**  
*Given:* Table `readings` already exists with two columns.  
*Find:* Record when each measurement occurred.  
Step 1: Use ALTER TABLE … ADD COLUMN.  
*Why*: The table object already occupies a catalog entry.  
Step 2: Execute `ALTER TABLE readings ADD COLUMN measured_at TIMESTAMP;`.  
*Why*: TIMESTAMP is a recognized domain; the column is nullable by default.  
**Final answer**  
```sql
ALTER TABLE readings ADD COLUMN measured_at TIMESTAMP;
```

**Example 3 — Removing all rows while keeping the schema**  
*Given:* Table `readings` contains millions of historical rows.  
*Find:* Empty the table for a fresh test run without dropping indexes or constraints.  
Step 1: Choose TRUNCATE over DELETE.  
*Why*: TRUNCATE resets storage allocation in a single operation.  
Step 2: Execute `TRUNCATE TABLE readings;`.  
*Why*: The schema remains in the catalog; only row data is discarded.  
**Final answer**  
```sql
TRUNCATE TABLE readings;
```

**Example 4 — Complete replacement of a table definition**  
*Given:* An obsolete table `readings` whose column types no longer match new requirements.  
*Find:* Replace it with a stricter definition that includes a primary key and partitioning.  
Step 1: Drop the old object.  
*Why*: ALTER cannot change fundamental structural properties such as partitioning keys in one step.  
Step 2: Execute `DROP TABLE readings;`.  
*Why*: The catalog entry is removed.  
Step 3: Re-issue a richer CREATE TABLE.  
*Why*: The new statement supplies the desired constraints and partitioning clause.  
**Final answer**  
```sql
DROP TABLE readings;
CREATE TABLE readings (
  id INT PRIMARY KEY,
  val DOUBLE NOT NULL,
  measured_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (measured_at);
```

*Reflection*: The sequence illustrates that DROP is the only safe route when the structural contract itself must change.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using TRUNCATE inside a transaction expecting rollback | Many engines treat TRUNCATE as DDL and auto-commit | Check vendor documentation; prefer DELETE when transactional semantics are required |
| Adding NOT NULL without DEFAULT to a populated table | The engine cannot satisfy the constraint for existing rows | Supply a DEFAULT or make the column nullable first, then tighten later |
| Forgetting that DROP removes dependent objects | Foreign-key references or views may still point to the dropped table | Use DROP … CASCADE explicitly or inspect dependencies first |
| Assuming column order can be changed with simple ALTER | Most SQL implementations store columns in creation order | Recreate the table or use vendor-specific syntax such as ALTER TABLE … ALTER COLUMN … FIRST |
| Running CREATE without checking for existence | Duplicate object names violate catalog uniqueness | Use CREATE TABLE IF NOT EXISTS or conditional scripting |
| Altering a column type that narrows domain | Existing values may exceed the new type’s range | Perform the change in a maintenance window after validating data ranges |
| Omitting constraint names | Later ALTER or DROP CONSTRAINT statements become ambiguous | Always name constraints at creation time |

## 7. The textbook-precise statement
A DDL statement is an expression in the *data definition language* subset of SQL that either (a) introduces a new schema object into the catalog, (b) modifies the definition of an existing catalog object, or (c) removes a catalog object. The SQL standard (ISO/IEC 9075-2:2023, §11) defines the four statements as follows:

- `<table definition>` ::= CREATE TABLE `<table name>` `<table element list>`
- `<alter table statement>` ::= ALTER TABLE `<table name>` `<alter table action>`
- `<drop table statement>` ::= DROP TABLE `<table name>` [ CASCADE | RESTRICT ]
- `<truncate table statement>` ::= TRUNCATE TABLE `<table name>`

These operations update the *information schema* and are outside the scope of the transaction management statements except where the implementation explicitly supports transactional DDL. Reference: Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §4.2–4.4.

## 8. Visual — diagram or schematic
```text
Catalog (system tables)
+------------------+     CREATE TABLE     +------------------+
| TABLES           | -------------------> | readings         |
| (table_name, ...) |                    | (id, val, ...)   |
+------------------+                     +------------------+
         |                                        |
         | ALTER TABLE ADD COLUMN                 | TRUNCATE
         v                                        v
+------------------+                     +------------------+
| COLUMNS          |                     | readings         |
| (col_name, type) |                     | (empty rows)     |
+------------------+                     +------------------+
         |                                        |
         | DROP TABLE                             |
         v                                        |
+------------------+                              |
| (object removed) | <-----------------------------+
+------------------+
```

## 9. The memory technique
**The hook** — Picture a carpenter’s workbench: CREATE lays out the bench and marks the slots, ALTER adds a new vise, TRUNCATE sweeps the shavings away but leaves the bench, and DROP burns the bench completely.  

**What to overlearn**  
1. CREATE introduces metadata.  
2. TRUNCATE empties rows only; DROP removes metadata.  
3. Most engines auto-commit DDL.  

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  

**First-principles fallback** — Re-derive from the catalog: any statement that writes to the system tables describing tables or columns is DDL.

## 10. What this unlocks
Mastery of these four statements lets you design evolving schemas that survive production migrations and enables the next layer of database programming: indexing strategies, view materialization, and constraint enforcement.  

- Indexing and constraint maintenance  
- Partitioning and sharding schemes  
- Online schema-change protocols  
- Database migration frameworks (Flyway, Liquibase)  
- Query optimization statistics collection  

## 11. Self-check — five questions, no answers
1. Write the minimal CREATE TABLE statement that defines a table with a composite primary key on two integer columns.  
2. A table already contains 10 000 rows; which single ALTER statement safely adds a non-nullable column that defaults to the current timestamp?  
3. Explain why `TRUNCATE TABLE t;` followed by `ROLLBACK;` may still leave table `t` empty.  
4. A foreign-key constraint references table `parent`. What happens when you execute `DROP TABLE parent;` without CASCADE?  
5. Design a sequence of DDL statements that replaces an existing table’s single-column primary key with a two-column composite key while preserving all existing non-key data.