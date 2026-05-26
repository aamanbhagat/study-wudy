## 1. The one-sentence answer
**Keys are attributes (or sets of attributes) that uniquely identify tuples in a relation or link relations together.**

A key works by enforcing uniqueness so that no two rows can ever be confused with each other. When you have many possible sets of attributes that can serve as unique identifiers, you first find the smallest ones (candidate keys), then pick one of them as the official identifier (primary key). Foreign keys simply copy a primary key value from another table to create a reliable link between rows. Natural keys come from real-world data while surrogate keys are artificially generated; both solve the same uniqueness problem but trade off different practical concerns.

> [!NOTE]
> The single most important realisation is that “key” is not one concept but a hierarchy: every candidate key is a superkey, every primary key is a candidate key, and every foreign key is a copy of some primary key.

## 2. Why this matters — concrete and current
PostgreSQL’s query planner uses the declared primary key to choose index-only scans; without a properly chosen primary key, analytical queries on terabyte-scale tables slow down by 5-10×.  
In banking core systems at HDFC and ICICI, foreign-key constraints between the accounts and transactions tables prevent orphaned transaction rows that would break regulatory audit trails.  
Airline reservation engines (Amadeus and Sabre) rely on surrogate keys for flight legs because natural flight numbers repeat every day; a missing surrogate key once caused duplicate bookings during daylight-saving transitions.  
Google Spanner uses natural keys derived from user IDs for sharding decisions; choosing the wrong natural key forces expensive cross-shard transactions that violate the 99.999 % availability SLA.  
In semiconductor supply-chain databases (TSMC), surrogate UUID keys replace natural part numbers because part numbers are reused across different process nodes, breaking traceability required by ISO 26262.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Relation & tuple     | Keys are defined only inside the formal structure of a relation. |
| Functional dependency| Candidate keys are exactly the minimal sets that functionally determine all other attributes. |
| Uniqueness constraint| Primary-key and unique constraints are how the DBMS physically enforces keys. |

If any of the above three ideas are unclear, pause and revise them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Superkey: any set that guarantees uniqueness
A superkey is any collection of attributes whose values are unique across all tuples.  
Example: in a Student relation with attributes (rollNo, name, email, phone), the set {rollNo, name} is a superkey because roll numbers never repeat.  
Formally, a set K of attributes is a superkey of relation R if, for any two distinct tuples t1 and t2, t1[K] ≠ t2[K].  
> [!WARNING]  
> Treating every superkey as usable leads to redundant storage; you must later reduce them.

### Step 2 — Candidate key: minimal superkey
Remove any unnecessary attribute from a superkey and it should still remain unique; the resulting minimal set is a candidate key.  
Example: {rollNo} alone is a candidate key; {rollNo, name} is not minimal.  
Formally, K is a candidate key if it is a superkey and no proper subset of K is a superkey.

### Step 3 — Primary key: chosen candidate key
From the set of candidate keys the designer picks exactly one to be the primary key; the rest become alternate keys.  
The DBMS creates a clustered index on the primary key by default in most engines.  
Formally, PK(R) denotes the chosen candidate key that will be referenced by foreign keys.

### Step 4 — Foreign key: reference to another primary key
A foreign key is an attribute (or set) in one relation whose values must match the primary key values of another relation (or the same relation).  
Example: deptId in Employee must exist in Department.deptId.  
Formally, FK ⊆ attributes of R2 such that π_FK(R2) ⊆ π_PK(R1).

### Step 5 — Natural vs surrogate keys
A natural key uses attributes that already carry business meaning (email, Aadhaar). A surrogate key is a system-generated identifier (auto-increment integer, UUID) that carries no business semantics.  
Natural keys can change or be reused; surrogate keys never change once assigned.

### Step 6 — Formal closure under the key hierarchy
Every primary key is a candidate key, every candidate key is a superkey, and every foreign key references some primary key. This hierarchy is closed; no other key types exist inside the relational model.

## 5. Worked examples — har step show karo

**Example 1 — Finding superkeys**  
*Given:* Relation R(A,B,C) with FDs A→BC, B→C.  
*Find:* All superkeys.  
Step 1: A determines everything → {A} is a superkey.  
Step 2: AB also determines everything → {A,B} is a superkey.  
Step 3: AC likewise → {A,C} is a superkey.  
Step 4: ABC is trivially a superkey.  
**All superkeys: {A}, {A,B}, {A,C}, {A,B,C}**  
*Reflection:* We listed every superset of the minimal set; later we will discard the non-minimal ones.

**Example 2 — Extracting candidate keys**  
*Given:* Same relation and FDs.  
*Find:* Candidate keys.  
Remove B from {A,B} → still a superkey, so {A,B} is not minimal.  
Remove C from {A,C} → still a superkey.  
Thus only {A} remains minimal.  
**Candidate key: {A}**  
*Reflection:* Minimality check prevents bloated primary-key definitions.

**Example 3 — Declaring primary and foreign keys**  
*Given:*  
Employee(empId, deptId, name)  
Department(deptId, dname)  
*Find:* Proper key declarations.  
empId is the only candidate key → PRIMARY KEY (empId).  
deptId in Employee references Department → FOREIGN KEY (deptId) REFERENCES Department(deptId).  
**Primary key = empId; foreign key = deptId**  
*Reflection:* The foreign-key column must have exactly the same domain and cardinality as the referenced primary key.

**Example 4 — Natural versus surrogate choice**  
*Given:* User table that must store email and phone.  
Option A (natural): PRIMARY KEY (email)  
Option B (surrogate): PRIMARY KEY (user_uuid) with UNIQUE(email).  
If a user changes email, Option A forces cascading updates across every referencing table; Option B needs only one row update.  
**Surrogate key wins on stability**  
*Reflection:* Choose surrogate when the natural attribute can change or be reused.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using a non-minimal superkey as primary key | Designer stops at the first unique set found | Always verify that removing any attribute breaks uniqueness |
| Declaring composite primary key when a single attribute suffices | Over-eagerness to include “extra” business fields | Run the candidate-key minimality test first |
| Forgetting that foreign keys must reference the primary key, not any candidate key | Confusion between candidate and primary | Always write REFERENCES Table(PK_column)     |
| Choosing mutable natural keys (email, username) | Business semantics feel intuitive           | Add a surrogate key whenever the attribute can change |
| Creating multiple primary keys in one table | Misunderstanding that only one candidate can be primary | Remember: exactly one primary key per relation |
| NULLs allowed in primary-key columns | Default column definition copied from elsewhere | Explicitly add NOT NULL when declaring primary key |
| Surrogate key without a unique constraint on the natural candidate | Performance thought to be enough            | Keep a separate UNIQUE constraint on the natural candidate |

## 7. The textbook-precise statement
A superkey of a relation schema R is a set of attributes K ⊆ R such that the functional dependency K → R holds. A candidate key is a superkey that contains no proper subset that is itself a superkey. A primary key is a designated candidate key. A foreign key in a relation schema R2 is a set of attributes FK such that FK → R1 holds in some relation schema R1 and the referential integrity constraint π_FK(R2) ⊆ π_PK(R1) is enforced. Natural keys are candidate keys drawn from attributes whose values carry domain semantics; surrogate keys are system-generated identifiers with no domain semantics. (Silberschatz, Korth, Sudarshan, Database System Concepts, 7e, §7.2–7.4)

## 8. Visual — diagram or schematic
```
Table: Student
+---------+-----------+--------+
| rollNo* | name      | email  |
+---------+-----------+--------+
| 101     | Aarav     | a@iit  |
| 102     | Priya     | p@iit  |
+---------+-----------+--------+
          ↑ PK (natural)

Table: Enrollment
+---------+---------+--------+
| enrId** | rollNo  | course |
+---------+---------+--------+
| 5001    | 101     | CS101  |
| 5002    | 102     | CS101  |
+---------+---------+--------+
          ↑ PK (surrogate)   ↑ FK → Student.rollNo
```
* = natural primary key, ** = surrogate primary key

## 9. The memory technique
1. **The hook** — Imagine a castle: the superkey is the entire fortress wall, the candidate key is the smallest gate that still keeps invaders out, the primary key is the single gate the king chooses to lock every night, and the foreign key is a messenger carrying the king’s seal to another castle.  
2. **What to overlearn** — Candidate key = minimal superkey; exactly one primary key per relation; foreign key always references a primary key.  
3. **Spaced-repetition schedule** — Review definitions after 1 day, redraw the hierarchy after 3 days, solve two new FD problems after 7 days, design a schema with natural/surrogate choice after 16 days, and audit a production schema after 35 days.  
4. **First-principles fallback** — If you forget the terms, ask only two questions: “Which attribute sets guarantee uniqueness?” and “Which of those sets is smallest?” The answers directly give superkeys and candidate keys.

## 10. What this unlocks
You can now design normalised schemas, write correct JOIN conditions, and reason about index choices.  
- Next topics that rest directly on keys: Boyce-Codd Normal Form, referential integrity enforcement, query optimisation using index intersections, and distributed key-range partitioning in systems such as CockroachDB.

## 11. Self-check — five questions, no answers
1. Given R(A,B,C) with A→B and B→C, list all candidate keys.  
2. In a table that already has a single-attribute candidate key, why might a designer still introduce a surrogate primary key?  
3. A foreign key column is declared without NOT NULL; what anomaly can occur?  
4. Show that {email, phone} can never be a candidate key if email alone is already unique.  
5. Detect the trap: a developer marks two columns as PRIMARY KEY in the same CREATE TABLE statement—what will the DBMS actually do?