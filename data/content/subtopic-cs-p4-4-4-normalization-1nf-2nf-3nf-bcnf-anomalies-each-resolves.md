## What it is
Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms. The goal is to minimize data redundancy and eliminate undesirable characteristics like insertion, update, and deletion anomalies, thereby improving data integrity. Each normal form represents an increasingly strict set of rules for the database schema.

## Why it matters
In aerospace, telemetry data from a launch vehicle is streamed to ground systems in massive volumes. A non-normalized database might store `(Timestamp, SensorID, SensorValue, SensorType, StageID, StageManufacturer)`. If a manufacturer changes its name, you would have to update millions of rows, risking an update anomaly that could corrupt mission-critical data. Normalization ensures you change the manufacturer's name in exactly one place, guaranteeing consistency for post-flight analysis and feeding reliable data into machine learning models for predictive maintenance.

## When to study it
You must have a solid grasp of fundamental relational database concepts before tackling normalization. Specifically, be comfortable with:
- **Relations (Tables)**, **Tuples (Rows)**, and **Attributes (Columns)**.
- **Keys**: Superkeys, Candidate Keys, Primary Keys, and Foreign Keys.
- **Functional Dependencies**: The concept that the value of one set of attributes determines the value of another set of attributes. If you are not 100% confident with functional dependencies, stop and master that first. It is the bedrock of normalization.

## How to study it (step by step)
1.  **Master Anomalies (20 min)**: Write down your own clear, simple examples of an Insertion, Update, and Deletion anomaly. Use a non-technical domain like a music library or a course schedule. Do not proceed until you can explain why "redundancy" is the root cause of all three.
2.  **Define Keys from FDs (30 min)**: Take a set of attributes $R = \{A, B, C, D\}$ and a set of functional dependencies $F = \{A \to B, BC \to D\}$. From these first principles, derive all candidate keys for the relation. This skill is non-negotiable.
3.  **Process 1NF and 2NF (30 min)**: Find a sample unnormalized table. Normalize it to 1NF, then 2NF. For the 2NF step, explicitly state the partial dependencies you found and how your decomposition eliminated them.
4.  **Process 3NF and BCNF (30 min)**: Take your 2NF tables from the previous step. Normalize them to 3NF. For each, identify the transitive dependencies you eliminated. Then, check if the result is in BCNF. If not, perform the final decomposition and articulate why BCNF was necessary.
5.  **Synthesize (15 min)**: Draw a diagram that shows the progression: Unnormalized -> 1NF -> 2NF -> 3NF -> BCNF. At each arrow, write the specific type of dependency being removed (e.g., "Remove partial dependencies").

## Key ideas, with intuition
The entire process is about ensuring that every fact in your database is stored in exactly one place. The tool for enforcing this is the **functional dependency (FD)**.

1.  **Functional Dependency ($X \to Y$)**: The core idea. A set of attributes $X$ functionally determines a set of attributes $Y$ if, for any given value of $X$, the value of $Y$ is uniquely determined.
    *   **Intuition**: In a table of US citizens, `{SocialSecurityNumber} \to \{Name, DateOfBirth\}$. Given a specific SSN, there is only one possible name and DOB associated with it. The determinant is on the left ($X$), the dependent is on the right ($Y$).

2.  **Anomalies**: These are the problems caused by data redundancy.
    *   **Insertion Anomaly**: You cannot add a new fact without adding an unrelated fact. E.g., You can't add a new employee and their pay rate until they are assigned to a project, if all three are in the same table.
    *   **Deletion Anomaly**: Deleting one fact unintentionally deletes another. E.g., If you delete the only employee on a project, you might lose the project's information entirely.
    *   **Update Anomaly**: Changing a fact requires changing it in multiple places, risking inconsistency. E.g., An employee changes their name, and you miss updating one of the several rows they appear in.

3.  **The Normal Forms (A Progression of Rules)**:
    *   **First Normal Form (1NF)**: All attribute values must be atomic. This means no lists or sets within a single cell. It's the price of entry for being a relational database.
        *   *Anomaly Resolved*: Eliminates complex, multi-valued attributes that are difficult to query and manage.
    *   **Second Normal Form (2NF)**: Must be in 1NF, and every non-prime attribute must be fully functionally dependent on every candidate key. A non-prime attribute is one that is not part of any candidate key.
        *   *Anomaly Resolved*: Eliminates **partial dependencies**. This resolves insertion and deletion anomalies related to facts that only depend on part of a composite primary key.
    *   **Third Normal Form (3NF)**: Must be in 2NF, and there are no transitive dependencies. A transitive dependency is when $A \to B$ and $B \to C$, so a non-key attribute $C$ depends on another non-key attribute $B$, rather than directly on the key $A$.
        *   *Anomaly Resolved*: Eliminates **transitive dependencies**. This resolves update and deletion anomalies where changing a non-key attribute might require many updates or deleting a row might lose a fact about another non-key attribute.
    *   **Boyce-Codd Normal Form (BCNF)**: A stricter version of 3NF. A relation is in BCNF if for every non-trivial functional dependency $X \to Y$, $X$ is a superkey.
        *   *Anomaly Resolved*: Resolves anomalies that can still exist in 3NF when a relation has multiple overlapping candidate keys. It ensures that every determinant is a candidate key (or superkey).

## Worked example
Consider a table tracking which engineers are assigned to which NASA projects.

**Initial Table (Unnormalized):**
`ProjectAssignments`
| ProjID | EmpID | ProjName | EmpName | EmpDept | DeptHead | Hours |
|---|---|---|---|---|---|---|
| P101 | E56 | Europa Clipper | A. Turing | Cryogenics | R. Feynman | 250 |
| P101 | E72 | Europa Clipper | G. Hopper | Software | C. Babbage | 400 |
| P203 | E56 | Mars Rover | A. Turing | Cryogenics | R. Feynman | 300 |

**Step 1: Identify Functional Dependencies (FDs)**
From the problem domain, we know:
- $\{ProjID\} \to \{ProjName\}$
- $\{EmpID\} \to \{EmpName, EmpDept\}$
- $\{EmpDept\} \to \{DeptHead\}$
- $\{ProjID, EmpID\} \to \{Hours\}$

**Step 2: Find Candidate Keys**
The only attribute set that determines all other attributes is $\{ProjID, EmpID\}$.
So, the primary key is $\{ProjID, EmpID\}$.
Non-prime attributes are: $\{ProjName, EmpName, EmpDept, DeptHead, Hours\}$.

**Step 3: Normalize to 2NF (Eliminate Partial Dependencies)**
A partial dependency exists if a non-prime attribute depends on only *part* of the primary key.
- $\{ProjID\} \to \{ProjName\}$ is a partial dependency. `ProjName` depends only on `ProjID`, not the full key.
- $\{EmpID\} \to \{EmpName, EmpDept\}$ is a partial dependency. `EmpName` and `EmpDept` depend only on `EmpID`.

To resolve this, we decompose the table. We create new tables for each partial dependency and leave the fully dependent attributes in the original.
- **`Assignments` (PK: {ProjID, EmpID})**: `Hours` remains, as it depends on the full key.
- **`Projects` (PK: {ProjID})**: `ProjName` moves here.
- **`Employees` (PK: {EmpID})**: `EmpName`, `EmpDept` move here.

Our schema is now:
- `Assignments(ProjID, EmpID, Hours)`
- `Projects(ProjID, ProjName)`
- `Employees(EmpID, EmpName, EmpDept)`

All these tables are in 2NF. We have eliminated the anomaly where we couldn't add a new project until an employee was assigned to it.

**Step 4: Normalize to 3NF (Eliminate Transitive Dependencies)**
A transitive dependency is a non-key attribute depending on another non-key attribute.
In the `Employees` table, we have PK $\{EmpID\}$. We know $\{EmpID\} \to \{EmpDept\}$ and $\{EmpDept\} \to \{DeptHead\}$.
This is a transitive dependency: `DeptHead` depends on `EmpDept`, which in turn depends on the key `EmpID`.

To resolve this, we decompose `Employees`:
- **`EmployeeDepts` (PK: {EmpID})**: `EmpName`, `EmpDept` (FK to Departments)
- **`Departments` (PK: {EmpDept})**: `DeptHead`

Our final 3NF schema is:
- `Assignments(ProjID, EmpID, Hours)`
- `Projects(ProjID, ProjName)`
- `EmployeeDepts(EmpID, EmpName, EmpDept)`
- `Departments(DeptHead, EmpDept)`

This resolves the anomaly where changing a department head's name (e.g., R. Feynman retires) would require updating the row for every employee in that department. Now it's a single change in the `Departments` table.

**Step 5: Check for BCNF**
For a table to be in BCNF, for every FD $X \to Y$, $X$ must be a superkey.
- `Assignments`: The only FD is $\{ProjID, EmpID\} \to \{Hours\}$. The determinant $\{ProjID, EmpID\}$ is the primary key, so it's a superkey. OK.
- `Projects`: The only FD is $\{ProjID\} \to \{ProjName\}$. The determinant $\{ProjID\}$ is the primary key. OK.
- `EmployeeDepts`: The only FD is $\{EmpID\} \to \{EmpName, EmpDept\}$. The determinant $\{EmpID\}$ is the primary key. OK.
- `Departments`: The only FD is $\{EmpDept\} \to \{DeptHead\}$. The determinant $\{EmpDept\}$ is the primary key. OK.

In this case, our 3NF schema is also in BCNF.

## Diagrams
```text
[Initial Messy Table: ProjectAssignments]
(ProjID, EmpID, ProjName, EmpName, EmpDept, DeptHead, Hours)
       |
       |  Resolve Partial Dependencies (ProjID->ProjName, EmpID->EmpName,EmpDept)
       v
+----------------------+--------------------+-----------------------------+
|                      |                    |                             |
v                      v                    v                             v
[Assignments (2NF)]    [Projects (2NF)]     [Employees (2NF)]
(ProjID, EmpID, Hours) (ProjID, ProjName)    (EmpID, EmpName, EmpDept, DeptHead)
                                                  |
                                                  | Resolve Transitive Dependency (EmpDept->DeptHead)
                                                  v
                                          +---------------------+---------------------+
                                          |                     |
                                          v                     v
                                          [EmployeeDepts (3NF)] [Departments (3NF)]
                                          (EmpID, EmpName, EmpDept) (EmpDept, DeptHead)
```

## Memory technique — remember this forever
1.  **Mnemonic**: "Every non-key attribute must depend on **the key** (1NF), **the whole key** (2NF), and **nothing but the key** (3NF)."
    - **The Key**: Attributes are atomic and there's a primary key.
    - **The Whole Key**: No partial dependencies.
    - **Nothing But the Key**: No transitive dependencies.
    - **BCNF** is the strict enforcer, demanding that *any* attribute determining another must be a superkey.

2.  **Overlearn These Facts**:
    - **2NF**: No partial dependencies.
    - **3NF**: 2NF and no transitive dependencies.
    - **BCNF**: For every non-trivial $X \to Y$, $X$ must be a superkey.

3.  **Spaced Repetition Schedule**: Review the definitions and your worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, try to re-derive the final schema from the initial messy table without looking.

4.  **First Principles Pathway**: If you forget everything, rebuild from here:
    - What is a functional dependency ($X \to Y$)? It means $X$ uniquely determines $Y$.
    - What is a key? A minimal set of attributes that functionally determines all other attributes in the relation.
    - Anomalies are caused by redundancy. How can I arrange the FDs into tables such that each "fact" (each FD) is represented exactly once? This line of questioning will lead you to decompose tables to isolate partial and transitive dependencies.

## Common mistakes
1.  **Stopping at 3NF**: Many students assume 3NF is the end. Always check for BCNF. A relation can be in 3NF but not BCNF if there are multiple overlapping candidate keys and a dependency where the determinant is not a superkey.
2.  **Incorrectly Identifying FDs**: The entire process hinges on correctly identifying all functional dependencies from the problem's constraints. If you miss one or invent one, your entire normalization will be wrong.
3.  **Over-Normalization**: Normalizing to the highest form isn't always the best practical choice. For performance-critical applications (like real-time data analysis), denormalization is sometimes used intentionally to reduce the number of expensive JOIN operations. Don't mistake the academic ideal for a universal law.

## Self-check
1.  A relation `R(A, B, C, D)` has the FDs: $\{AB \to C, A \to D\}$. The primary key is $\{A, B\}$. Is this relation in 2NF? Why or why not? If not, normalize it.
2.  A relation `R(BookID, AuthorID, AuthorNationality)` has the FDs: $\{BookID \to AuthorID\}$ and $\{AuthorID \to AuthorNationality\}$. Is this relation in 3NF? Why or why not? If not, decompose it into a 3NF schema.
3.  A relation `R(Student, Course, Instructor)` has two candidate keys: $\{Student, Course\}$ and $\{Student, Instructor\}$. It also has the FD $\{Instructor \to Course\}$. Is this relation in BCNF? Why or why not?