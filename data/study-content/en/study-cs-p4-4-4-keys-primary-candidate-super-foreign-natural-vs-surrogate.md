## 1. The one-sentence answer
**Keys are designated sets of attributes that guarantee uniqueness of rows and establish referential links between tables.**

A relation is a set of tuples; without some mechanism to distinguish one tuple from another, the set loses its mathematical identity and practical utility. Keys supply that mechanism by constraining which combinations of attribute values may repeat. The hierarchy of key types—superkey, candidate, primary—arises directly from the twin requirements of uniqueness and minimality, while foreign keys extend the same idea across relations.

Natural keys reuse attributes that already carry meaning in the domain; surrogate keys introduce new, meaningless identifiers solely for identification. The choice between them is not theoretical but operational: it affects storage, indexing, and long-term stability of the schema.

> [!NOTE]
> The decisive insight is that every candidate key is already a superkey; the distinction is only that no proper subset of a candidate key remains a superkey.

## 2. Why this matters — concrete and current
PostgreSQL’s internal catalog tables use surrogate primary keys (oid and relfilenode) so that system metadata remains stable even when user-defined natural keys change during schema evolution.  

Amazon’s order-processing pipeline relies on foreign-key constraints between the Orders and OrderItems tables to guarantee that every line item references an existing order; the same constraints enable the ACID guarantees required for financial reconciliation.  

In the LHCb experiment at CERN, the event store uses surrogate keys generated from run number plus event number because the natural physics attributes (momentum vectors, detector hits) are neither unique nor immutable across reconstruction passes.  

Airline reservation systems at Amadeus enforce candidate-key constraints on (flight_number, departure_date, seat) so that seat maps remain consistent when multiple booking channels attempt concurrent updates.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Relation, tuple, attribute | Keys are defined on attributes of relations               |
| Set semantics    | Uniqueness is a set property; duplicates are disallowed   |
| Referential integrity | Foreign keys express constraints between two relations    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Uniqueness inside a single relation
A relation is a set; two tuples that agree on every attribute are the same tuple. Therefore any attribute combination that never repeats across distinct tuples can serve as an identifier.

Consider a table of students with attributes (student_id, email, name). The combination (student_id, email) never repeats.

Formally, let \( R \) be a relation schema and \( r(R) \) an instance. A set of attributes \( K \subseteq R \) is a **superkey** if, for any two distinct tuples \( t_1, t_2 \in r(R) \),
\[
t_1[K] \neq t_2[K].
\]

> [!WARNING]
> Treating any unique-looking column as automatically minimal leads to redundant indexes and update anomalies later.

### Step 2 — Minimality yields candidate keys
A superkey may contain superfluous attributes. Removing any unnecessary attribute while preserving uniqueness produces a smaller superkey.

In the same student table, both (student_id) and (email) separately satisfy uniqueness; therefore each is minimal.

A superkey \( K \) is a **candidate key** when no proper subset \( K' \subset K \) is still a superkey.

### Step 3 — Selecting one candidate key as primary
Among all candidate keys the designer designates exactly one as the **primary key**. The choice is guided by stability, brevity, and indexing cost rather than by any formal property.

### Step 4 — Linking relations with foreign keys
A **foreign key** is a set of attributes in one relation whose values must match the primary-key values of another relation (or be null under specified conditions).

Formally, given relations \( R_1 \) and \( R_2 \) with primary key \( PK_2 \) of \( R_2 \), \( FK \subseteq R_1 \) is a foreign key if
\[
\pi_{FK}(r(R_1)) \subseteq \pi_{PK_2}(r(R_2)).
\]

### Step 5 — Natural versus surrogate keys
A **natural key** comprises attributes whose values carry domain meaning (ISBN, email). A **surrogate key** is an artificial identifier (auto-increment integer, UUID) possessing no domain semantics.

### Step 6 — The complete hierarchy
Every primary key is a candidate key; every candidate key is a superkey; every foreign key references some primary key. Natural and surrogate are orthogonal labels describing provenance, not formal type.

## 5. Worked examples — every step shown

**Example 1 — Single candidate key**  
*Given:* Relation Students(stu_id, email, name) with data rows (1, a@x.edu, Alice), (2, b@x.edu, Bob).  
*Find:* All superkeys and candidate keys.  
- Test {stu_id}: distinct values → superkey. *Why:* no two rows share the value.  
- Test {email}: distinct values → superkey. *Why:* same test.  
- Test {stu_id, email}: still unique but contains proper subsets that are unique → not minimal. *Why:* minimality fails.  
- Candidate keys: {stu_id}, {email}.  
**{stu_id} and {email}**

*Reflection:* The example is simple because only one column repeats the uniqueness test; real tables usually require checking subsets.

**Example 2 — Composite key**  
*Given:* Enrollments(course, semester, student_id, grade).  
*Find:* Candidate keys.  
- {course, semester, student_id} is unique.  
- Removing semester yields duplicates across semesters → not minimal.  
- No smaller subset works.  
**{course, semester, student_id}**

*Reflection:* Composite keys arise when single attributes are insufficient; the minimality check must examine every proper subset.

**Example 3 — Foreign-key enforcement**  
*Given:* Students(stu_id PK), Enrollments(stu_id FK → Students).  
*Find:* Whether the foreign-key constraint holds for rows (101) in Enrollments and (101, …) in Students.  
- Projection on FK contains 101.  
- Projection on PK contains 101.  
- Subset relation holds.  
**Constraint satisfied**

*Reflection:* The subset test is the only formal requirement; referential integrity is simply that test applied at every modification.

**Example 4 — Natural vs surrogate choice**  
*Given:* Books(isbn, title, author_id) versus Books(book_id, isbn, title, author_id).  
*Find:* Primary-key decision.  
- isbn is stable and unique → natural candidate.  
- Adding surrogate book_id decouples physical row identity from domain key.  
**Either choice is valid; surrogate reduces cascading updates when isbn ever changes**

*Reflection:* The decision is cost-based, not correctness-based.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Declaring a non-minimal superkey as primary | Designer stops at first unique combination | Enumerate all candidate keys before choosing |
| Using mutable natural keys as primary | Domain values change (email, SSN)           | Introduce surrogate when mutability is likely |
| Forgetting that NULLs break uniqueness | SQL allows multiple NULLs in unique indexes | Decide NULL policy before declaring keys     |
| Circular foreign-key references   | Two tables each reference the other’s PK    | Break cycle with an associative table        |
| Composite foreign keys missing columns | Partial matching allowed by mistake         | Always reference the entire primary-key list |
| Treating surrogate keys as automatically better | Over-generalisation from one project        | Measure index size and join cost first       |
| Ignoring candidate keys other than primary | Only primary key receives declarative support | Document all candidate keys for future indexes |

## 7. The textbook-precise statement
Let \( R \) be a relation schema. A set of attributes \( K \subseteq R \) is a superkey for \( R \) if, in every legal instance \( r(R) \), \( K \rightarrow R \). \( K \) is a candidate key if it is a superkey and no proper subset is a superkey. A primary key is a designated candidate key. A foreign key \( FK \) in \( R_1 \) referencing primary key \( PK \) of \( R_2 \) satisfies the inclusion dependency \( FK \subseteq PK \). (Silberschatz, Korth & Sudarshan, *Database System Concepts*, 7e, §2.4–2.5.)

## 8. Visual — diagram or schematic
```text
Relation R1                  Relation R2
+-------------+             +-------------+
| stu_id (PK) |-------------<| stu_id (FK)|
| email (CK)  |             | course (PK)|
| name        |             | semester(PK)|
+-------------+             | grade       |
                            +-------------+
Legend: PK = primary, CK = candidate, FK = foreign
Arrows show referential direction.
```

## 9. The memory technique
**The hook** — Picture a castle: the superkey is the entire moat; the candidate key is the narrowest drawbridge that still prevents invaders; the primary key is the drawbridge the king orders everyone to use.

**What to overlearn** — Candidate key = minimal superkey; primary key = chosen candidate; foreign key = value must exist in referenced primary key.

**Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive from set semantics: uniqueness means no two distinct tuples agree on the key attributes; minimality means removing any attribute allows collisions.

## 10. What this unlocks
Mastery of keys is the prerequisite for normalisation, query optimisation, and transaction isolation.  

- Functional dependencies and normal forms rest on candidate-key identification.  
- Join algorithms exploit primary/foreign-key relationships for efficient hash or merge joins.  
- Concurrency control uses key uniqueness to detect write-write conflicts.  
- View updatability rules reference key presence.

## 11. Self-check — five questions, no answers
1. Given attributes A,B,C and the fact that {A,B} and {A,C} are both candidate keys, list every superkey.  
2. In a relation with 10 000 rows, a column contains 10 000 distinct non-null values. Must it be a candidate key?  
3. Two tables each declare a foreign key referencing the other’s primary key. What anomaly can occur on deletion?  
4. Why can a surrogate key never be a natural key by definition?  
5. A designer chooses (email, phone) as primary key for Customers. Name two concrete maintenance problems that may appear within five years.