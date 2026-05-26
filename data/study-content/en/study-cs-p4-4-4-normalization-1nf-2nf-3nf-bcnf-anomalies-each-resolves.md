## 1. The one-sentence answer
**Normalization is the process of decomposing a relation into smaller relations that satisfy successively stricter normal forms (1NF, 2NF, 3NF, BCNF) so that insertion, deletion, and update anomalies disappear.**

A relation stores facts. When those facts are packed together incorrectly, changing one fact forces you to change others that should be independent; forgetting any of those forced changes leaves the database inconsistent. Each normal form removes one class of such hidden dependencies.

Start with a table that mixes multiple independent facts in the same row. The first normal form forces every cell to hold a single atomic value. The second normal form then requires that every non-key column depend on the entire primary key, not just part of it. The third normal form further demands that non-key columns depend only on the key and not on other non-key columns. Boyce–Codd normal form strengthens the rule so that every determinant must itself be a candidate key.

> [!NOTE]
> The deepest insight is that anomalies are not random errors; they are the inevitable consequence of a functional dependency that violates the normal-form rule for that relation.

## 2. Why this matters — concrete and current
Airline reservation systems at companies such as United and Delta store flight, aircraft, and crew assignments in a single schema. Without normalization, updating an aircraft’s capacity after a cabin reconfiguration would require touching every future flight record for that tail number, risking missed rows and double-booking errors.

Electronic health record platforms such as Epic maintain patient, diagnosis, and medication tables. A transitive dependency between physician and hospital in an unnormalized table can cause a physician’s hospital affiliation to be deleted when the last patient record is removed, silently losing credential data required for regulatory audits.

Semiconductor supply-chain databases at TSMC track wafer lots, process steps, and equipment calibrations. Partial-key dependencies allow a calibration change on one machine to be recorded under only some process steps, producing inconsistent yield reports that downstream machine-learning models then train on.

Ride-sharing platforms such as Uber keep driver, vehicle, and ride tables. Failure to reach BCNF permits a driver to be associated with two different license numbers in different rows, which surfaces as contradictory background-check results during safety investigations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Functional dependency    | Defines which columns determine which others; anomalies arise exactly when a dependency violates a normal-form rule. |
| Candidate key            | The minimal set of columns that uniquely identify every row; normal forms are stated in terms of keys. |
| Primary key vs. alternate key | Distinguishes the chosen identifier from other possible keys that must still satisfy the same dependency rules. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Atomic values only
A cell must contain a single indivisible value; repeating groups or embedded lists hide separate facts inside one column.  
Consider a table that stores a student identifier and a single column holding the comma-separated list “Math,Physics”. Updating the course list requires string surgery and risks malformed data.  
Formally, a relation *R* is in **1NF** when every attribute domain contains only atomic values:  
$$ \forall t \in R, \forall A \in \text{attr}(R),\; t[A] \text{ is atomic}. $$  
> [!WARNING] Treating a comma-separated string as atomic will later produce partial dependencies that no later normal form can repair.

### Step 2 — Full key dependence
Every non-key attribute must depend on the whole primary key, not on any proper subset.  
A table with key (StudentID, Course) and a column Instructor that depends only on Course repeats the instructor name for every student in that course. Changing the instructor requires updating many rows.  
Formally, *R* is in **2NF** if it is in 1NF and no non-prime attribute is partially dependent on any candidate key:  
$$ \nexists X \subset K,\; A \notin K \text{ such that } X \to A. $$  
> [!WARNING] Detecting only one candidate key while ignoring another can leave a partial dependency on the overlooked key.

### Step 3 — Direct key dependence
No non-key attribute may determine another non-key attribute.  
A table with key EmployeeID, columns Department and DepartmentLocation, allows the location to be transitively determined by Department. Moving a department requires updating every employee row.  
Formally, *R* is in **3NF** if it is in 2NF and for every functional dependency \(X \to A\), either *X* is a superkey or *A* is prime:  
$$ X \to A \implies X \text{ superkey} \lor A \text{ prime}. $$  
> [!WARNING] Allowing a transitive dependency creates deletion anomalies that surface only after the last referencing row is removed.

### Step 4 — Every determinant is a candidate key
Boyce–Codd normal form strengthens 3NF by requiring that every determinant of a non-trivial dependency must itself be a candidate key.  
A table with two overlapping candidate keys (Street,Zip) and (Street,City) where Zip → City can still violate BCNF even though it satisfies 3NF.  
Formally, *R* is in **BCNF** if for every non-trivial functional dependency \(X \to Y\), *X* is a superkey:  
$$ X \to Y \text{ (non-trivial)} \implies X \text{ superkey}. $$  
> [!WARNING] Satisfying 3NF does not guarantee BCNF when overlapping candidate keys exist; the stronger test must be applied explicitly.

## 5. Worked examples — every step shown

**Example 1 — 1NF violation**  
*Given:* Relation Enroll(Student, Courses) with row (101, "Math,Physics").  
*Find:* Convert to 1NF.  
Split the multivalued attribute: create Enroll1(Student, Course) with rows (101,Math), (101,Physics).  
*Why* — each cell now holds one atomic value.  
**Result:** Relation is in 1NF.

*Reflection* — The original column mixed independent facts; separating them is the only mechanical fix.

**Example 2 — 2NF violation**  
*Given:* Enroll(StudentID, Course, Instructor) with FD Course → Instructor.  
*Find:* Reach 2NF.  
Decompose into CourseInstructor(Course, Instructor) and StudentCourse(StudentID, Course).  
*Why* — Instructor now depends only on the whole key of its own relation.  
**Result:** Both relations are in 2NF.

*Reflection* — Partial dependency was invisible until the key was examined; decomposition removes it.

**Example 3 — 3NF violation**  
*Given:* Employee(EmpID, Dept, DeptLoc) with Dept → DeptLoc.  
*Find:* Reach 3NF.  
Decompose into EmployeeDept(EmpID, Dept) and DeptLoc(Dept, DeptLoc).  
*Why* — DeptLoc no longer depends transitively on EmpID.  
**Result:** Both relations are in 3NF.

*Reflection* — The transitive arrow Dept → DeptLoc was the precise source of the update anomaly.

**Example 4 — BCNF violation**  
*Given:* Bank(Branch, Customer, Banker) with Banker → Branch and two candidate keys.  
*Find:* Reach BCNF.  
Decompose into BankerBranch(Banker, Branch) and CustomerBanker(Customer, Banker).  
*Why* — Banker is now a key in its own relation.  
**Result:** Both relations are in BCNF.

*Reflection* — Overlapping candidate keys required the stricter BCNF test; 3NF alone was insufficient.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating a surrogate key as eliminating all anomalies | Surrogate keys do not remove functional dependencies among other columns | Always test the original candidate keys      |
| Stopping at 3NF when BCNF is required | Overlapping candidate keys create BCNF violations invisible in 3NF | Run the BCNF test on every determinant       |
| Keeping derived attributes in the same table | Derived columns create transitive dependencies | Move derived data to its own relation or view |
| Assuming 1NF is automatic in SQL | Modern SQL allows JSON or array columns     | Explicitly forbid multivalued columns in schema review |
| Ignoring alternate keys           | Designer examines only the primary key      | Enumerate all candidate keys before decomposition |
| Decomposing without preserving dependencies | Lossless-join is not guaranteed             | Verify that the decomposition is dependency-preserving |
| Updating the original table after normalization | Old application code still writes to it     | Introduce views or triggers during transition |

## 7. The textbook-precise statement
A relation schema *R* is in BCNF if and only if for every non-trivial functional dependency \(X \to Y\) that holds on *R*, *X* is a superkey of *R*. The same relation is in 3NF if, for every such dependency, either *X* is a superkey or each attribute in *Y* is prime. (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §7.3–7.4.)

## 8. Visual — diagram or schematic
```text
Unnormalized (1NF violation)
+---------+------------------+
| Student | Courses          |
+---------+------------------+
| 101     | Math,Physics     |
+---------+------------------+

After 1NF split
+---------+--------+
| Student | Course |
+---------+--------+
| 101     | Math   |
| 101     | Physics|
+---------+--------+
```
The diagram shows the single multivalued cell becoming two atomic rows.

## 9. The memory technique
1. **The hook** — Picture each normal form as a stricter bouncer at a club: 1NF checks ID cards are single pieces of paper, 2NF checks the whole group arrived together, 3NF checks no one is vouching for a friend, BCNF checks the bouncer only listens to the actual guest list.
2. **What to overlearn** — Definition of BCNF; the three classic anomalies (insertion, deletion, update); the rule “every determinant must be a candidate key.”
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive each normal form by asking “which functional dependency would let one fact change force another unrelated fact to change?”

## 10. What this unlocks
Mastery of these normal forms lets you design schemas that remain consistent under concurrent updates and simplifies query logic by removing hidden redundancy.  

- 4NF and 5NF for multivalued and join dependencies  
- Denormalization trade-offs in data-warehouse star schemas  
- Query optimization statistics that assume normalized base tables  
- Transaction isolation anomalies that disappear once redundancy is removed  

## 11. Self-check — five questions, no answers
1. Given the relation R(A,B,C) with FDs A→B and B→C, list every anomaly that appears before normalization.  
2. Convert the following schema to 3NF while preserving all functional dependencies: Orders(OrderID, CustomerID, CustomerCity, ProductID).  
3. A relation satisfies 3NF yet still exhibits an update anomaly. Construct a minimal concrete example and identify the violated condition.  
4. Prove that every BCNF relation is also in 3NF, and show why the converse fails when candidate keys overlap.  
5. A designer adds a surrogate key to a relation that is not in BCNF. Does the surrogate key place the relation in BCNF? Explain with a counter-example.