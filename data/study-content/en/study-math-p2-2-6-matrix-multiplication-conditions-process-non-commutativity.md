## 1. The one-sentence answer
**Matrix multiplication combines two matrices \(A\) and \(B\) into a third matrix \(C = AB\) only when the number of columns of \(A\) equals the number of rows of \(B\), by taking every row of \(A\) and computing its dot product with every column of \(B\).**

This operation encodes the composition of linear maps. Each entry \(c_{ij}\) records how the \(i\)-th row of the first matrix weights the \(j\)-th column of the second. The resulting matrix has as many rows as \(A\) and as many columns as \(B\).

The same numerical entries arranged differently usually produce a different product, so order is fixed. Multiplication is therefore defined only under a strict size constraint and is almost never interchangeable.

> [!NOTE]
> The single most important insight is that matrix multiplication is not repeated scalar multiplication; it is a systematic collection of dot products that records how one set of linear combinations acts on another.

## 2. Why this matters — concrete and current
In computer graphics pipelines at NVIDIA and AMD, 4-by-4 transformation matrices are multiplied to chain rotations, translations, and projections that move millions of vertices per frame; reversing the multiplication order inverts the intended camera motion.

Modern neural-network frameworks such as PyTorch and TensorFlow represent layers as weight matrices whose successive products compute forward passes; a single forward pass through a 100-layer transformer performs thousands of such multiplications whose non-commutativity forces careful ordering of attention and feed-forward blocks.

In quantum mechanics, operators on finite-dimensional Hilbert spaces are represented by matrices; the product \(AB\) corresponds to applying operator \(B\) then operator \(A\), and the fact that \(AB \neq BA\) encodes the Heisenberg uncertainty principle for position and momentum observables.

Semiconductor design tools at TSMC and Intel solve large systems of linear equations that arise from discretised Maxwell equations; the underlying sparse matrices are multiplied during preconditioner construction, and dimension mismatch or order errors produce singular or physically meaningless Jacobians.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Row and column vectors   | The dot product between a row of \(A\) and a column of \(B\) is the atomic operation that fills each entry of the product. |
| Matrix dimensions        | The test “columns of first = rows of second” is the only gate that decides whether the product exists. |
| Dot product of vectors   | Every scalar entry \(c_{ij}\) is literally \(\mathbf{a}_i \cdot \mathbf{b}_j\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Size compatibility is mandatory
A matrix \(A\) of shape \(m \times n\) can be multiplied on the right only by a matrix \(B\) of shape \(n \times p\). The inner dimensions must match; otherwise the collection of dot products cannot be formed.

**Example.**  
\(A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\) (2×2) and \(B = \begin{pmatrix} 5 \\ 6 \end{pmatrix}\) (2×1) are compatible.  
\(A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\) and \(C = \begin{pmatrix} 5 & 6 \end{pmatrix}\) (1×2) are not.

Formally:  
$$AB\text{ is defined}\iff n_A=n_B.$$

> [!WARNING]
> Treating “compatible” as a soft suggestion and forcing multiplication anyway produces dimension errors that silently corrupt later calculations.

### Step 2 — Each entry is a dot product
The entry in row \(i\), column \(j\) of the product is the dot product of row \(i\) of \(A\) with column \(j\) of \(B\).

**Example.**  
Row 1 of \(A = (1,2)\), column 1 of \(B = (5,6)^\top\); their dot product is \(1\cdot5+2\cdot6=17\).

Formally:  
$$c_{ij}=\sum_{k=1}^n a_{ik}b_{kj}.$$

> [!WARNING]
> Reversing the order inside the sum (using columns of \(A\) and rows of \(B\)) yields an entirely different matrix that is not \(AB\).

### Step 3 — The product matrix inherits outer dimensions
The resulting matrix \(C\) has \(m\) rows and \(p\) columns. Its shape is completely determined before any arithmetic is performed.

Formally:  
$$A_{m\times n}B_{n\times p}=C_{m\times p}.$$

### Step 4 — Order matters (non-commutativity)
Even when both \(AB\) and \(BA\) exist, the two products are generally unequal because the sets of dot products differ.

**Example.**  
Let \(A=\begin{pmatrix}0&1\\0&0\end{pmatrix}\), \(B=\begin{pmatrix}0&0\\1&0\end{pmatrix}\). Then \(AB=I_2\) while \(BA=0\).

Formally:  
$$AB\neq BA\text{ in general.}$$

### Step 5 — Formal definition
Let \(A=(a_{ik})\) be \(m\times n\) and \(B=(b_{kj})\) be \(n\times p\). Their product \(C=AB\) is the unique \(m\times p\) matrix whose entries satisfy
$$c_{ij}=\sum_{k=1}^n a_{ik}b_{kj},\qquad 1\le i\le m,\ 1\le j\le p.$$

This is the textbook statement reached after the preceding four steps.

## 5. Worked examples — every step shown

**Example 1 — Square matrices of order 2**  
*Given:*  
$$A=\begin{pmatrix}1&2\\3&4\end{pmatrix},\quad B=\begin{pmatrix}5&6\\7&8\end{pmatrix}.$$  
*Find:* \(AB\).

Step 1: Check dimensions — both 2×2, compatible.  
*Why:* inner dimensions equal.  

Step 2: \(c_{11}=1\cdot5+2\cdot7=19\).  
*Why:* dot product of row 1 of \(A\) with column 1 of \(B\).

Step 3: \(c_{12}=1\cdot6+2\cdot8=22\).  
Step 4: \(c_{21}=3\cdot5+4\cdot7=43\).  
Step 5: \(c_{22}=3\cdot6+4\cdot8=50\).

**Answer**  
$$\begin{pmatrix}19&22\\43&50\end{pmatrix}.$$

*Reflection:* The calculation is a direct transcription of the summation formula; the only possible slip is reading the wrong row or column.

**Example 2 — Non-square product**  
*Given:*  
$$A=\begin{pmatrix}1&0&2\\-1&3&1\end{pmatrix}\ (2\times3),\quad B=\begin{pmatrix}4\\5\\6\end{pmatrix}\ (3\times1).$$  
*Find:* \(AB\).

Step 1: 3=3, compatible; result 2×1.  
Step 2: first entry \(1\cdot4+0\cdot5+2\cdot6=16\).  
Step 3: second entry \(-1\cdot4+3\cdot5+1\cdot6=17\).

**Answer**  
$$\begin{pmatrix}16\\17\end{pmatrix}.$$

*Reflection:* Shape prediction before arithmetic prevents later dimension mismatches.

**Example 3 — Order reversal**  
*Given:* the same \(A\) and \(B\) of Example 1. Compute \(BA\).

Step 1: dimensions still allow it.  
Step 2: \(b_{11}a_{11}+b_{12}a_{21}=5\cdot1+6\cdot3=23\) (different from 19).  
Continuing yields  
**Answer**  
$$\begin{pmatrix}23&34\\31&46\end{pmatrix}\neq AB.$$

*Reflection:* Non-commutativity is visible in the very first entry.

**Example 4 — Product that fails to exist**  
*Given:* \(A\) 2×3 and \(C\) 2×2.  
Attempt \(AC\): inner dimensions 3≠2, undefined.  
**Answer**  
No matrix exists.

*Reflection:* The compatibility test is decisive; any further calculation is meaningless.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Multiplying when inner sizes differ | Habit of scalar multiplication without checks | Write the shapes \(m\times n\) and \(n\times p\) explicitly before starting |
| Using columns of \(A\) instead of rows | Visual confusion between row and column vectors | Always label “row \(i\) of left matrix” before dotting |
| Assuming \(AB=BA\)          | Experience with commutative scalars         | Compute both products on a 2×2 pair at least once    |
| Forgetting that result shape is outer dimensions | Rushing to arithmetic                       | State “result is \(m\times p\)” aloud before any sums |
| Off-by-one indexing in summation | Programming background with 0-based arrays  | Keep 1-based mathematical indices consistent         |
| Treating the zero matrix as an absorber only on one side | Over-generalising from scalars              | Verify \(A0=0A=0\) explicitly for rectangular cases  |
| Copying entries from the wrong matrix | Fatigue during long calculations            | Use a finger or cursor to track the current row/column |

## 7. The textbook-precise statement
Let \(A=(a_{ik})\) be an \(m\times n\) matrix and \(B=(b_{kj})\) an \(n\times p\) matrix over a field \(F\). Their product \(C=AB\) is the \(m\times p\) matrix defined by
$$c_{ij}=\sum_{k=1}^n a_{ik}b_{kj}\quad\text{for all }1\le i\le m,\ 1\le j\le p.$$
The product exists if and only if the inner dimensions are equal. In general \(AB\neq BA\) even when both products exist. (See Lay, *Linear Algebra and Its Applications*, 6e, §2.1, Definition of Matrix Multiplication.)

## 8. Visual — diagram or schematic
```text
          B
     col1 col2
     ↓    ↓
A → [a11 a12] · [b11] = c11   (row1·col1)
    [a21 a22]   [b21]   c21   (row2·col1)

Result C has shape (rows of A) × (cols of B)
```
Labelled arrows show that each entry of \(C\) is formed by one horizontal row vector from \(A\) meeting one vertical column vector from \(B\).

## 9. The memory technique

**The hook**  
Picture a row of soldiers (row of \(A\)) marching straight into a column of soldiers (column of \(B\)); each pair shakes hands and adds the product to a single box in the result grid.

**What to overlearn**  
1. Compatibility rule: columns of left = rows of right.  
2. Entry formula: \(c_{ij}=\sum a_{ik}b_{kj}\).  
3. Consequence: \(AB\neq BA\) in general.

**Spaced-repetition schedule**  
Review the compatibility rule at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If the formula is forgotten, return to the definition of a linear map: the \(j\)-th column of \(AB\) must equal \(A\) times the \(j\)-th column of \(B\). Rebuild the summation from that single requirement.

## 10. What this unlocks
Matrix multiplication is the algebraic engine behind every subsequent operation on matrices.  

- Matrix inverses are defined via the equation \(AA^{-1}=I\), which uses multiplication.  
- Determinants satisfy the product rule \(\det(AB)=\det(A)\det(B)\).  
- Eigenvalue problems and diagonalisation rest on the equation \(AP=PD\), again a matrix product.  
- Systems of linear equations are compactly written \(Ax=b\) and solved by matrix factorisations whose correctness depends on associative multiplication.

## 11. Self-check — five questions, no answers
1. Two matrices are given: \(A\) is 3×4 and \(B\) is 4×2. What is the shape of \(AB\)? What about \(BA\)?

2. Compute the (2,3) entry of the product  
   $$A=\begin{pmatrix}1&0&-1\\2&3&4\end{pmatrix},\quad B=\begin{pmatrix}5&6\\7&8\\9&10\end{pmatrix}$$  
   without writing the entire matrix.

3. Give a concrete pair of 2×2 matrices for which \(AB=BA\) and another pair for which \(AB\neq BA\).

4. A student claims that if \(A\) is 2×3 and \(B\) is 3×2 then both \(AB\) and \(BA\) exist and must be equal. Identify the error.

5. Using only the definition, prove that the product of an \(m\times n\) matrix with the \(n\times1\) column vector \(\mathbf{e}_1=(1,0,\dots,0)^\top\) simply returns the first column of the matrix.