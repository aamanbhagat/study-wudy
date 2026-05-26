## 1. The one-sentence answer
**Pivot positions are the column locations of the leading nonzero entries (pivots) in the row echelon form of a matrix; the variables corresponding to those columns are basic variables, while all remaining variables are free variables that parametrize the solution set.**

Row reduction of an augmented matrix to echelon form reveals a staircase pattern of pivots. Each pivot fixes one variable in terms of the variables to its right. Columns without pivots leave those variables unconstrained, so they range freely over the scalars. The distinction therefore partitions the variables into those that are determined and those that are arbitrary.

This partition decides existence and uniqueness at once: a pivot in the last column of the augmented matrix signals inconsistency, while the absence of free variables signals a unique solution. The number of free variables equals the dimension of the solution space when solutions exist.

> [!NOTE]
> The locations of the pivots are intrinsic to the column space; they do not depend on which sequence of elementary row operations is chosen, only on the final echelon form.

## 2. Why this matters — concrete and current
In NASA’s trajectory optimization for the Artemis missions, the linear system that enforces fuel and thrust constraints is row-reduced once per planning cycle; pivot columns identify which thruster firings are rigidly determined while free variables correspond to adjustable coast times that mission designers vary to minimize total propellant.

Modern transformer models in large language systems contain attention matrices whose rank is diagnosed by counting pivot positions after Gaussian elimination; free-variable counts directly give the dimension of the null space used in pruning redundant attention heads, a technique employed by the DeepMind PaLM team to reduce inference cost by 18 percent.

Semiconductor foundries such as TSMC solve Poisson equations on discretized device grids via sparse linear systems; pivot positions mark the nodes whose potentials are fixed by boundary conditions, while free variables label interior mesh points whose voltages are solved parametrically during process variation analysis.

In quantum error-correction decoding for superconducting qubits at Google Quantum AI, the parity-check matrix is placed in standard form; pivot columns correspond to correctable errors that are uniquely identified, and free variables index the logical operators that commute with all stabilizers, guiding real-time decoder hardware design.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Elementary row operations | Produce the echelon form in which pivots become visible |
| Row echelon form         | Defines the staircase pattern whose leading entries locate the pivots |
| Consistent linear system | Determines whether a pivot appears in the augmented column |
| Column index             | Labels each variable so that pivot columns identify basic variables |

## 4. Building the idea — from intuition to formalism

### Step 1 — The staircase pattern after elimination
Row reduction replaces a general matrix with an upper-triangular staircase whose first nonzero entry in each nonzero row sits strictly to the right of the entry above it.  
Consider the matrix
\[
\begin{bmatrix}
1 & 2 & 3 \\
2 & 4 & 6 \\
0 & 1 & 1
\end{bmatrix}
\]
which reduces to
\[
\begin{bmatrix}
1 & 2 & 3 \\
0 & 0 & 0 \\
0 & 1 & 1
\end{bmatrix}
\]
after one swap and one subtraction.  
A pivot position is any column index \(j\) that contains the leading nonzero entry of some row.  
If you forget that zero rows are ignored, you will overcount the number of pivots.

### Step 2 — Labelling basic versus free variables
Each pivot column is associated with a basic variable; every non-pivot column is associated with a free variable.  
In the reduced matrix above the pivots sit in columns 1 and 2, so \(x_1\) and \(x_2\) are basic while \(x_3\) is free.  
Formally, if the pivot columns are \(J = \{j_1,\dots,j_r\}\), then the basic variables are \(\{x_j : j\in J\}\) and the free variables are the remainder.

### Step 3 — Back-substitution expresses basic variables in terms of free ones
Starting from the bottom nonzero row and moving upward, each basic variable is written as a linear combination of the free variables that appear to its right.  
The resulting parametric vector is the general solution when the system is consistent.

### Step 4 — Consistency test via the augmented column
If a pivot appears in the last (augmented) column, the corresponding equation reads \(0 = c\) with \(c\neq 0\), proving inconsistency.  
Otherwise every pivot lies inside the coefficient block and solutions exist.

### Step 5 — The pivot theorem
The number of pivots equals the rank of the matrix; the number of free variables equals \(n - \operatorname{rank}(A)\), where \(n\) is the number of columns. This is the precise statement found in standard texts.

## 5. Worked examples — every step shown

**Example 1 — Single free variable**  
*Given:* Solve
\[
\begin{bmatrix}
1 & 2 & 3 \\
2 & 4 & 6
\end{bmatrix}
\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}
=
\begin{bmatrix}5\\10\end{bmatrix}.
\]  
*Find:* The general solution.  

Row-reduce the augmented matrix:
\[
\begin{bmatrix}
1 & 2 & 3 & | & 5 \\
2 & 4 & 6 & | & 10
\end{bmatrix}
\to
\begin{bmatrix}
1 & 2 & 3 & | & 5 \\
0 & 0 & 0 & | & 0
\end{bmatrix}.
\]  
*Why:* Subtract twice row 1 from row 2.  

Pivot in column 1 only, so \(x_2\) and \(x_3\) are free.  
Back-substitute: \(x_1 = 5 - 2x_2 - 3x_3\).  
Let \(x_2 = s\), \(x_3 = t\).  
**Final answer**  
\[
\mathbf{x} = 
\begin{bmatrix}5\\0\\0\end{bmatrix}
+
s
\begin{bmatrix}-2\\1\\0\end{bmatrix}
+
t
\begin{bmatrix}-3\\0\\1\end{bmatrix}.
\]

*Reflection:* The zero row signals dependence; two free parameters appear because rank is 1.

**Example 2 — Inconsistent system**  
*Given:* The same coefficient matrix with right-hand side \(\begin{bmatrix}5\\11\end{bmatrix}\).  
After identical reduction a pivot appears in the augmented column, proving no solution.

**Example 3 — Unique solution**  
*Given:* A \(3\times 3\) identity matrix on the left.  
Three pivots occupy all columns; zero free variables; solution is the unique vector equal to the right-hand side.

**Example 4 — Two free variables, rank 2**  
*Given:* A \(2\times 5\) matrix whose echelon form has pivots in columns 1 and 3.  
Three free variables remain; the solution space is three-dimensional.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Counting a leading zero as a pivot | Misreading the definition of “leading nonzero entry” | Scan each row from the left until the first nonzero appears |
| Treating the augmented column as a variable column | Forgetting that consistency is checked separately | Mark the vertical bar clearly before counting pivots |
| Assuming every column has a pivot | Overlooking rank deficiency | Count pivots after reduction, never before |
| Swapping variables instead of columns | Confusing row operations with column operations | Keep variable labels fixed; only reorder rows |
| Declaring inconsistency when a free variable column is empty | Confusing absence of pivot with inconsistency | Inconsistency requires a pivot in the augmented column only |
| Forgetting that row swaps preserve pivot positions | Believing operation sequence changes intrinsic rank | Remember row swaps merely relocate the same pivots |
| Identifying free variables by row index rather than column index | Mixing row and column notions | Always read column indices of the pivots |

## 7. The textbook-precise statement
Let \(A\) be an \(m\times n\) matrix. A **pivot position** of \(A\) is any entry that becomes a leading 1 after row reduction to echelon form. The corresponding column is a **pivot column**. The variables associated with pivot columns are **basic variables**; all others are **free variables**.  

Theorem (Existence and Uniqueness). The equation \(Ax=b\) is consistent if and only if \(b\) lies in the column space of \(A\), equivalently, if the augmented matrix \([A|b]\) has no pivot in its last column. When consistent, the solution set contains exactly \(n-r\) free variables, where \(r=\operatorname{rank}(A)\). (Strang, *Introduction to Linear Algebra*, 5e, §2.2 and §3.2.)

## 8. Visual — diagram or schematic
```text
Row echelon form of a 3×5 augmented matrix
Row 1:  1  *  *  *  |  *
        ↑ pivot col 1
Row 2:  0  0  1  *  |  *
                 ↑ pivot col 3
Row 3:  0  0  0  0  |  0   (zero row, ignored)

Pivot columns: 1 and 3  → basic variables x₁, x₃
Free columns:   2,4,5   → free variables x₂,x₄,x₅
```
The diagram shows the staircase; asterisks denote arbitrary entries that do not affect pivot locations.

## 9. The memory technique
**The hook** — Imagine a staircase whose steps are the pivots; any column without a step is a “free corridor” through which variables may wander.  
**What to overlearn** — (i) Pivot count = rank; (ii) number of free variables = n − rank; (iii) inconsistency ⇔ pivot in augmented column.  
**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive by performing Gaussian elimination on a generic 3×4 matrix and counting the leading nonzeros that appear.

## 10. What this unlocks
Pivot positions and free variables supply the precise language for describing the four fundamental subspaces, the rank-nullity theorem, and the structure of linear transformations. They are required before one can discuss eigenvalues, least-squares projections, or the singular-value decomposition.

- Dimension of the null space  
- Basis extraction from pivot and free columns  
- Rank-nullity theorem  
- Linear independence tests  

## 11. Self-check — five questions, no answers
1. Reduce the matrix \(\begin{bmatrix}1&3&1\\2&6&2\\0&0&1\end{bmatrix}\) and list its pivot columns.  
2. For a consistent system with five variables and rank three, how many free variables appear?  
3. Construct an augmented matrix whose row reduction produces a pivot in the last column; state the conclusion.  
4. In the general solution obtained after back-substitution, which entries of the particular solution vector are necessarily zero?  
5. Suppose two different sequences of row operations yield different echelon forms of the same matrix; must the sets of pivot columns coincide?