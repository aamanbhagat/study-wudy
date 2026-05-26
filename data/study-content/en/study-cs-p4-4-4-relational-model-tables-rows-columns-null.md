## 1. The one-sentence answer
**The relational model stores data in tables whose columns are named attributes, whose rows are distinct tuples drawn from the Cartesian product of attribute domains, and whose cells may contain the special marker NULL to denote missing information.**

A table is not merely a grid. It is a mathematical relation: a set of tuples, each tuple supplying one value for every attribute. Because relations are sets, duplicate rows are forbidden and row order is irrelevant. Columns carry both a name and a domain (the set of permissible values), so the meaning of any entry is fixed by its column rather than by its position.

NULL is not a value. It is a marker outside every domain that signals the absence of a value. Any comparison or arithmetic operation involving NULL yields an unknown result rather than true, false, or a number.

> [!NOTE]
> The decisive insight is that a table is a set of tuples, not a list or a matrix; once this set-theoretic character is grasped, every rule about uniqueness, ordering, and NULL follows directly.

## 2. Why this matters — concrete and current
PostgreSQL powers the metadata catalog of the Large Hadron Collider at CERN; every detector calibration record is stored in relations whose columns record sensor identifiers, timestamps, and voltage readings that may legitimately be NULL when a channel is offline.

Airline reservation systems at Amadeus and Sabre keep seat-inventory tables whose rows represent flight segments; the seat-assignment column is NULL until a passenger selects a seat, allowing the same relation to serve both inventory queries and boarding-pass generation without schema changes.

TensorFlow Extended (TFX) pipelines at Google rely on relational tables inside BigQuery to track training-example metadata; the “label” column is NULL for unlabeled examples that later receive weak-supervision scores, enabling the same table to feed both supervised and semi-supervised training jobs.

Semiconductor foundries such as TSMC store wafer-test results in Oracle databases; each die record contains columns for measured leakage current, and the failure-code column is NULL for dies that passed all tests, permitting simple aggregate queries that compute yield without separate “good-die” tables.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Set                  | Relations are sets; duplicate rows are therefore impossible by definition. |
| Cartesian product    | The universe of possible rows is the product of column domains. |
| Partial function     | NULL corresponds to a partial rather than total mapping from rows to values. |
| Three-valued logic   | Predicates evaluated against NULL produce true, false, or unknown. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Data live in named columns with fixed domains
A column is an attribute: a name paired with a domain (the set of legal values).  
Example: attribute `age` with domain ℕ (non-negative integers).  
Formally an attribute is a pair (A, D) where A is a name and D is a set.  
> [!WARNING] Treating two columns with the same name but different domains as interchangeable silently corrupts every subsequent query.

### Step 2 — A row is a tuple that supplies one value per attribute
A tuple t over attributes {A₁ … Aₙ} is a function t : {A₁ … Aₙ} → ⋃ Dᵢ such that t(Aᵢ) ∈ Dᵢ.  
Concrete example: (name: "Ada", age: 36).  
The set of all such tuples is the Cartesian product D₁ × … × Dₙ.

### Step 3 — A table is a relation: a set of such tuples
A relation R is any subset of the Cartesian product. Because it is a set, both duplicate tuples and row ordering are excluded.  
Display math:  
$$R \subseteq D_1 \times D_2 \times \cdots \times D_n$$

### Step 4 — Missing information is marked by NULL, outside every domain
NULL ∉ Dᵢ for any domain Dᵢ. Therefore a cell containing NULL does not violate the tuple definition; it simply records that no element of Dᵢ was supplied.  
Any operation f(NULL) is defined to return unknown rather than a domain element.

### Step 5 — The relational model is completely characterized by the above four notions
A database schema is a finite set of relation names each paired with a fixed attribute list; an instance is a function that maps each relation name to a relation (set of tuples) over the declared attributes. This is the textbook definition given by Codd (1970) and later formalized in database textbooks.

## 5. Worked examples — every step shown

**Example 1 — Declaring a minimal relation**  
*Given:* Attributes (id : ℕ, name : String).  
*Find:* The relation containing one tuple.  
Step 1: Form the Cartesian product ℕ × String.  
*Why:* This enumerates every possible row.  
Step 2: Choose the subset {(7, "Grace")}.  
*Why:* Subset construction yields a relation.  
**{(7, "Grace")}**

*Reflection:* The example is trivial yet already shows that row order and column position are irrelevant; only the mapping from attribute to value matters.

**Example 2 — Inserting a row with NULL**  
*Given:* The relation above plus a new tuple with missing name.  
*Find:* The new relation.  
Step 1: NULL ∉ String, so the tuple is (8, NULL).  
*Why:* The marker lies outside the domain.  
Step 2: Union the singleton with the prior relation.  
*Why:* Union preserves the set property.  
**{(7, "Grace"), (8, NULL)}**

*Reflection:* The second tuple is still a valid member of the relation; NULL does not break the tuple-function definition.

**Example 3 — Evaluating a predicate involving NULL**  
*Given:* Row (8, NULL) and predicate age > 30.  
*Find:* Truth value.  
Step 1: age column yields NULL.  
*Why:* The column value is the marker.  
Step 2: NULL > 30 is unknown.  
*Why:* Three-valued logic rule.  
**unknown**

*Reflection:* The result is neither true nor false; any surrounding WHERE clause therefore excludes the row.

**Example 4 — Detecting duplicate-tuple violation**  
*Given:* Attempt to add (7, "Grace") again.  
*Find:* Resulting structure.  
Step 1: The candidate set would contain two identical tuples.  
*Why:* Sets do not contain duplicates.  
Step 2: The insertion is rejected by the model.  
**Relation unchanged**

*Reflection:* The rejection is not an implementation detail; it follows directly from the definition of relation as set.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating NULL as zero or empty string | Familiarity with imperative languages       | Always test with IS NULL / IS NOT NULL               |
| Assuming row order is preserved     | Spreadsheets and CSV files preserve order   | Never write queries that rely on physical position   |
| Allowing duplicate rows             | Thinking “table = list of records”          | Enforce candidate keys or accept that duplicates are forbidden by definition |
| Comparing two NULLs with =          | Expecting NULL = NULL to be true            | Remember unknown = unknown yields unknown            |
| Using NULL in primary-key columns   | Forgetting keys must be total functions     | Declare primary-key columns NOT NULL                 |
| Forgetting three-valued logic in aggregates | COUNT(*) versus COUNT(column) differ        | Explicitly decide whether NULLs should be excluded   |
| Renaming columns without updating queries | Attribute names are part of the schema      | Treat attribute names as first-class and version them |

## 7. The textbook-precise statement
A relation schema R(A₁ : D₁, …, Aₙ : Dₙ) defines a relation name R together with a list of attributes. An instance of R is any finite set of tuples  
$$t : \{A_1,\dots,A_n\} \to \bigcup_i D_i \quad\text{with}\quad t(A_i)\in D_i \text{ or } t(A_i)=\text{NULL}.$$  
Two tuples are identical only when they agree on every attribute (NULL matches only NULL for identity). The relational model therefore consists exactly of relation schemas and their set-valued instances. (Silberschatz, Korth & Sudarshan, *Database System Concepts*, 7e, §2.2–2.3.)

## 8. Visual — diagram or schematic
```text
Relation R
+------+----------+--------+
| id   | name     | dept   |
+------+----------+--------+
| 101  | Turing   | NULL   |   ← tuple t1
| 102  | Hopper   | CS     |   ← tuple t2
+------+----------+--------+
Attributes: id:ℕ, name:String, dept:String∪{NULL}
Cardinality = 2 (number of tuples)
Arity     = 3 (number of attributes)
Note: row order and column order are not part of the relation.
```

## 9. The memory technique
1. **The hook** — Picture a perfectly rectangular spreadsheet that has been frozen in liquid nitrogen: the cells still exist, but any blank cell is marked with a glowing “?” that refuses to participate in arithmetic or equality.
2. **What to overlearn** — (a) Relation = set of tuples; (b) NULL ∉ any domain; (c) duplicate rows are impossible.
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from “a table is a subset of a Cartesian product” and re-introduce NULL as an extra symbol outside every domain.

## 10. What this unlocks
Mastery of tables, rows, columns, and NULL supplies the semantic foundation for SQL, relational algebra, functional dependencies, normalization, query optimization, and transaction isolation levels.

- SQL SELECT, INSERT, UPDATE, DELETE semantics
- Relational algebra operators (selection, projection, join, union)
- Boyce–Codd and third normal forms
- ACID transaction properties that rely on tuple identity
- NULL propagation rules inside aggregate functions and window functions

## 11. Self-check — five questions, no answers
1. Can a relation contain two identical tuples that differ only in the placement of NULL?  
2. What is the result of the comparison NULL = NULL inside a WHERE clause?  
3. Why does the relational model forbid duplicate rows even when no primary key is declared?  
4. A column domain is declared INTEGER. Is the integer 0 allowed in that column? Is NULL allowed? Explain the difference.  
5. Given relation R(A,B) with tuples (1, NULL) and (1, NULL), how many tuples exist after the attempted insertion of a third identical row?