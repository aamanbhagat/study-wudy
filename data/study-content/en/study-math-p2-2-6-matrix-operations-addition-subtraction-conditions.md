## 1. The one-sentence answer
**Two matrices may be added or subtracted if and only if they possess identical dimensions, with the operation performed element-wise on corresponding entries.**

Matrices behave like grids of numbers. When two grids have the same number of rows and the same number of columns, each pair of numbers that occupy the same position can be combined by ordinary arithmetic. The result is a new grid of the same size. If the grids differ in even one row or column count, no such pairing exists and the operation is undefined.

This rule follows directly from the requirement that every entry in the output must be produced by a unique, well-defined calculation. No entry can be left without a partner, and no partner can be invented.

> [!NOTE]
> The single decisive condition is equality of shape: same rows, same columns. Everything else (signs, magnitudes, variable entries) is irrelevant to whether addition or subtraction is permitted.

## 2. Why this matters — concrete and current
In computer graphics pipelines at NVIDIA and AMD, vertex position matrices are added to offset matrices only after both have been confirmed to be 4-by-4; mismatched sizes trigger immediate rejection in the shader compiler.

Climate models at NASA’s Goddard Institute combine temperature anomaly grids from satellite and ground-station sources; each grid must be identically dimensioned (latitude by longitude bins) before element-wise addition produces the merged dataset used in IPCC reports.

In convolutional neural networks trained by PyTorch and TensorFlow, bias tensors are added to feature maps only when their shapes broadcast identically; automatic shape-checking routines enforce the rule before any floating-point arithmetic occurs.

Semiconductor mask-alignment software at ASML adds overlay-error matrices measured at different process steps; the matrices are required to share the exact die-by-die layout before subtraction yields the residual correction map.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ordered pair (m, n)  | Defines the size of an m-by-n matrix                      |
| Element indexing     | Identifies which two numbers occupy “the same position”   |
| Equality of numbers  | Supplies the arithmetic that occurs once positions match  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Grids must line up
Think of two rectangular arrays of numbers. Addition or subtraction pairs each number from the first array with exactly one number from the second. This pairing is possible only when the arrays occupy identical space.

Example: the 2-by-2 grids  
\[
\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}
\quad\text{and}\quad
\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}
\]  
line up perfectly; each entry has a counterpart.

Formally, two matrices A and B are candidates for addition only when the number of rows of A equals the number of rows of B and the number of columns of A equals the number of columns of B.

> [!WARNING]
> If you compare only the total number of entries instead of rows and columns separately, you will accept 2-by-3 and 3-by-2 matrices as “the same size,” which they are not.

### Step 2 — Dimensions are ordered pairs
The dimension of a matrix is written (m, n), where m counts rows and n counts columns. Two matrices share the same dimension precisely when their ordered pairs are identical.

### Step 3 — Correspondence is positional
Once dimensions match, the entry in row i, column j of the first matrix corresponds to the entry in row i, column j of the second matrix. No other pairing is allowed.

### Step 4 — Element-wise addition
The sum C = A + B is defined by  
\[
c_{ij} = a_{ij} + b_{ij}
\]  
for every i = 1 … m and j = 1 … n.

### Step 5 — Element-wise subtraction
Subtraction follows identically:  
\[
c_{ij} = a_{ij} - b_{ij}.
\]

### Step 6 — The operation is undefined otherwise
If the dimensions differ, at least one index pair (i, j) lacks a counterpart. In that case the symbols A + B and A − B have no meaning in matrix arithmetic.

### Step 7 — The formal statement
Let A = (a_{ij}) and B = (b_{ij}) be matrices. Then A + B (respectively A − B) exists if and only if A and B are both m-by-n; the resulting matrix C is also m-by-n and satisfies the element-wise rule above.

## 5. Worked examples — every step shown

**Example 1 — Simple 2-by-2 addition**  
*Given:*  
\[
A = \begin{bmatrix} 3 & -1 \\ 0 & 5 \end{bmatrix},\quad
B = \begin{bmatrix} 2 & 4 \\ -7 & 1 \end{bmatrix}.
\]  
*Find:* A + B.  

Step 1: Verify dimensions. Both are 2-by-2.  
*Why:* The ordered pairs (2,2) and (2,2) are equal.  

Step 2: Compute each entry.  
\[
c_{11}=3+2=5,\quad c_{12}=-1+4=3,
\]  
\[
c_{21}=0+(-7)=-7,\quad c_{22}=5+1=6.
\]  
*Why:* Each pair occupies the same row-column location.  

**Answer**  
\[
\begin{bmatrix} 5 & 3 \\ -7 & 6 \end{bmatrix}.
\]

*Reflection:* The example is straightforward; the only possible error is an arithmetic slip, not a dimensional one.

**Example 2 — Column-vector subtraction**  
*Given:*  
\[
\mathbf{u}=\begin{bmatrix}4\\-2\\1\end{bmatrix},\quad
\mathbf{v}=\begin{bmatrix}0\\3\\-5\end{bmatrix}.
\]  
*Find:* u − v.  

Both are 3-by-1. Subtract corresponding entries:  
\[
4-0=4,\quad -2-3=-5,\quad 1-(-5)=6.
\]  
**Answer**  
\[
\begin{bmatrix}4\\-5\\6\end{bmatrix}.
\]

*Reflection:* Vectors are matrices; the same dimension test applies.

**Example 3 — Incompatible dimensions**  
*Given:*  
\[
P=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix}\quad(2\times3),\quad
Q=\begin{bmatrix}7&8\\9&10\end{bmatrix}\quad(2\times2).
\]  
*Find:* P + Q.  

Dimensions (2,3) ≠ (2,2). No element-wise pairing exists for the third column.  
**Answer**  
The expression P + Q is undefined.

*Reflection:* The trap is attempting arithmetic before checking shape; the refusal to compute is the correct mathematical response.

**Example 4 — Symbolic entries**  
*Given:*  
\[
A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\quad
B=\begin{bmatrix}e&f\\g&h\end{bmatrix}.
\]  
*Find:* A − B.  

Both 2-by-2. Subtract:  
\[
\begin{bmatrix}a-e & b-f\\c-g & d-h\end{bmatrix}.
\]  
**Answer**  
\[
\begin{bmatrix}a-e & b-f\\c-g & d-h\end{bmatrix}.
\]

*Reflection:* Variables do not alter the dimension requirement.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Checking only total entries       | Confuses area with shape                    | Always compare ordered pairs (m,n)           |
| Adding a row vector to a column vector | Treating 1-by-n and n-by-1 as “the same” | Write dimensions explicitly before operating |
| Forgetting that result inherits size | Assuming size can change                    | State the output dimension immediately after verification |
| Index reversal (row↔column)       | Misreading matrix notation                  | Label every matrix with its (rows, columns)  |
| Performing operation on scalars inside matrices without checking outer shape | Focusing on entries too early               | Enforce dimension test as the first step     |
| Treating zero matrices of different sizes as interchangeable | Over-generalising the zero concept          | Verify size even when entries look “empty”   |
| Assuming commutativity rescues a mismatch | Believing order can fix shape               | Re-state: mismatch renders both A+B and B+A undefined |

## 7. The textbook-precise statement
Let A = [a_{ij}] and B = [b_{ij}] be matrices over a field F. The sum A + B is defined if and only if there exist positive integers m, n such that A and B are both m × n matrices; in that case C = A + B is the unique m × n matrix satisfying c_{ij} = a_{ij} + b_{ij} for all 1 ≤ i ≤ m, 1 ≤ j ≤ n. The difference A − B is defined analogously. (Anton, *Elementary Linear Algebra*, 12e, §1.2)

## 8. Visual — diagram or schematic
```text
Matrix A (2×3)          Matrix B (2×3)          Sum C = A + B (2×3)
┌─────┬─────┬─────┐     ┌─────┬─────┬─────┐     ┌─────┬─────┬─────┐
│ a11 │ a12 │ a13 │  +  │ b11 │ b12 │ b13 │  =  │a11+b11│a12+b12│a13+b13│
├─────┼─────┼─────┤     ├─────┼─────┼─────┤     ├─────┼─────┼─────┤
│ a21 │ a22 │ a23 │     │ b21 │ b22 │ b23 │     │a21+b21│a22+b22│a23+b23│
└─────┴─────┴─────┘     └─────┴─────┴─────┘     └─────┴─────┴─────┘
          ↑                         ↑                       ↑
     identical row count      identical column count   result same size
```
Each vertical pair of boxes represents a single element-wise addition.

## 9. The memory technique
1. **The hook** — Picture two military squads standing in rectangular formation; they can merge only when they have the same number of ranks and files.
2. **What to overlearn** — “Same (m, n) ⇒ element-wise operation permitted; otherwise undefined.”
3. **Spaced-repetition schedule** — Review the dimension test at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking: “Does every entry in the output possess exactly one partner from each input matrix?”

## 10. What this unlocks
Mastery of addition and subtraction under the dimension condition is the gateway to every subsequent matrix operation that preserves or combines linear structure.  

- Matrix multiplication (requires matching inner dimensions)  
- Linear combinations and span  
- Matrix inverses and elementary row operations  
- Determinants via cofactor expansion  
- Eigenvalue problems and diagonalisation  
- Kronecker sums used in Kronecker-product differential equations  

## 11. Self-check — five questions, no answers
1. Two matrices are given: one 4-by-1 and one 1-by-4. Are they eligible for addition?  
2. Compute  
\[
\begin{bmatrix} 2 & -3 \\ 0 & 7 \end{bmatrix}
-
\begin{bmatrix} 1 & 4 \\ -2 & 5 \end{bmatrix}
\]  
or state that the expression is undefined.  
3. A matrix M is 5-by-3. What must be the dimensions of N if M + N is to exist?  
4. Explain why the zero matrix of size 2-by-2 can be subtracted from any 2-by-2 matrix, yet the zero matrix of size 3-by-3 cannot.  
5. Suppose A and B are both m-by-n. Prove that A + B = B + A without performing any arithmetic on the entries themselves.