## 1. The one-sentence answer
**Matrix multiplication is the operation that composes linear transformations by taking the dot product of each row of the first matrix with each column of the second.**

Two matrices \(A\) and \(B\) can be multiplied only when the number of columns of \(A\) equals the number of rows of \(B\). The entry in row \(i\) and column \(j\) of the product is formed by pairing the \(i\)-th row of \(A\) with the \(j\)-th column of \(B\) and summing the products of corresponding entries. This rule encodes the successive application of the two transformations.

The same rule immediately produces two structural facts. The product \(ABC\) can be computed as \((AB)C\) or as \(A(BC)\) with identical results; the grouping does not matter. Yet the order cannot be swapped in general: \(AB\) and \(BA\) are usually different matrices, and one may even be defined while the other is not.

> [!NOTE]
> The single source of both associativity and non-commutativity is the same mechanical rule: each entry of the product is a sum of products along a matching row-column pair. Changing the order of the pair changes which vectors are dotted together.

## 2. Why this matters — concrete and current
In computer graphics pipelines at NVIDIA and AMD, a 4-by-4 matrix encodes a rigid motion of a 3-D scene; successive matrices for rotation, translation, and projection are multiplied in a fixed order so that each vertex is transformed exactly once per frame.

Inside every modern neural-network training run at Google and OpenAI, the forward pass of a dense layer is precisely the multiplication of an activation matrix by a weight matrix; the backward pass re-uses the same multiplication in transposed form, which is why frameworks store both \(AB\) and \(B^\top A^\top\).

In quantum-circuit simulation at IBM and Rigetti, the overall unitary operator on \(n\) qubits is obtained by multiplying 2-by-2 and 4-by-4 gate matrices; non-commutativity of those gates is exactly why two different gate sequences produce different measurement statistics.

Semiconductor place-and-route tools at TSMC and Intel solve large sparse linear systems whose coefficient matrices arise from finite-element discretizations; the matrices are multiplied during Schur-complement elimination, and the order of multiplication determines fill-in and therefore runtime.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Row and column vectors | The definition of matrix multiplication is built from dot products of these vectors. |
| Dot product          | Every scalar entry of the product matrix is a single dot product. |
| Function composition | Matrix multiplication is the algebraic counterpart of composing linear maps. |
| Equality of dimensions | The product \(AB\) exists only when the inner dimensions match. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rows act on columns
A matrix stores a collection of linear forms. The product of two matrices therefore pairs each linear form of the first matrix with each input direction of the second.

Consider the 1-by-2 row \([2, 3]\) and the 2-by-1 column \(\begin{pmatrix} 4 \\ 5 \end{pmatrix}\). Their pairing yields the single number \(2\cdot4 + 3\cdot5 = 23\).

Formally, if \(A\) is \(m\times n\) and \(B\) is \(n\times p\), the \((i,j)\)-entry of \(AB\) is
\[
(AB)_{ij} = \sum_{k=1}^n A_{ik} B_{kj}.
\]

> [!WARNING]
> If the inner dimensions differ, the sum is undefined; attempting the product anyway produces a dimension mismatch that silently corrupts later calculations.

### Step 2 — The product matrix assembles all pairings
The full product matrix simply records every possible row-column pairing.

For
\[
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix},\qquad
B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix},
\]
the first row of \(AB\) is obtained by dotting the first row of \(A\) with both columns of \(B\).

The resulting matrix is therefore
\[
AB = \begin{pmatrix} 1\cdot5+2\cdot7 & 1\cdot6+2\cdot8 \\ 3\cdot5+4\cdot7 & 3\cdot6+4\cdot8 \end{pmatrix} = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}.
\]

### Step 3 — Composition of maps supplies the associative law
If \(A\) maps \(\mathbb{R}^p\) to \(\mathbb{R}^m\) and \(B\) maps \(\mathbb{R}^n\) to \(\mathbb{R}^p\), then \(AB\) maps \(\mathbb{R}^n\) to \(\mathbb{R}^m\). Applying a third map \(C\) yields the chain rule identity \((AB)C = A(BC)\).

### Step 4 — Order of application produces non-commutativity
The map \(AB\) means “apply \(B\) first, then \(A\)”. The map \(BA\) means the opposite sequence. These sequences differ unless the two maps happen to commute.

A concrete counter-example is
\[
A = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix},\qquad
B = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}.
\]
Direct calculation shows \(AB \neq BA\).

### Step 5 — The textbook statement
Matrix multiplication on compatible matrices is associative and, in general, non-commutative.

## 5. Worked examples — every step shown

**Example 1 — Scalar case reduces to ordinary multiplication**  
*Given:* \(A = (3)\), \(B = (4)\).  
*Find:* \(AB\).  
Step 1: The single entry is the dot product of the single row and single column.  
\[
(AB)_{11} = 3\cdot4 = 12.
\]  
*Why:* The summation contains only one term.  
**12**

*Reflection:* The definition collapses exactly to the field multiplication when matrices are 1-by-1.

**Example 2 — Row vector times column vector**  
*Given:* \(u = [1,2,3]\), \(v = \begin{pmatrix}4\\5\\6\end{pmatrix}\).  
*Find:* \(uv\).  
Step 1: Form the single dot product.  
\[
uv = 1\cdot4 + 2\cdot5 + 3\cdot6 = 32.
\]  
*Why:* The summation index runs over the common length 3.  
**32**

*Reflection:* The result is a 1-by-1 matrix, i.e., a scalar.

**Example 3 — Two rectangular matrices**  
*Given:*  
\[
A = \begin{pmatrix} 1 & 0 \\ 2 & 3 \end{pmatrix},\qquad
B = \begin{pmatrix} 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}.
\]  
*Find:* \(AB\).  
Step 1: Check dimensions: \(2\times2\) times \(2\times3\) yields \(2\times3\).  
Step 2: Compute each of the six entries by the row-column rule.  
\[
(AB)_{11} = 1\cdot4 + 0\cdot7 = 4,
\]  
\[
(AB)_{12} = 1\cdot5 + 0\cdot8 = 5,
\]  
\[
(AB)_{13} = 1\cdot6 + 0\cdot9 = 6,
\]  
\[
(AB)_{21} = 2\cdot4 + 3\cdot7 = 29,
\]  
\[
(AB)_{22} = 2\cdot5 + 3\cdot8 = 34,
\]  
\[
(AB)_{23} = 2\cdot6 + 3\cdot9 = 39.
\]  
*Why:* Each summation uses the inner dimension 2.  
**\[
AB = \begin{pmatrix} 4 & 5 & 6 \\ 29 & 34 & 39 \end{pmatrix}
\]**

*Reflection:* The inner dimension disappears; only the outer dimensions remain.

**Example 4 — Associativity check**  
*Given:* The three matrices  
\[
A = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix},\quad
B = \begin{pmatrix} 3 & 4 \\ 5 & 6 \end{pmatrix},\quad
C = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}.
\]  
*Find:* Both \((AB)C\) and \(A(BC)\).  
Step 1: Compute \(AB = \begin{pmatrix} 3 & 4 \\ 10 & 12 \end{pmatrix}\).  
Step 2: Multiply on the right by \(C\):  
\[
(AB)C = \begin{pmatrix} 4 & 3 \\ 12 & 10 \end{pmatrix}.
\]  
Step 3: Compute \(BC = \begin{pmatrix} 4 & 3 \\ 6 & 5 \end{pmatrix}\).  
Step 4: Multiply on the left by \(A\):  
\[
A(BC) = \begin{pmatrix} 4 & 3 \\ 12 & 10 \end{pmatrix}.
\]  
*Why:* Both groupings execute the same three pairwise products for each entry.  
**Both products equal \(\begin{pmatrix}4&3\\12&10\end{pmatrix}\).**

*Reflection:* The equality holds even though \(B\) and \(C\) do not commute.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Swapping order of multiplication  | Habit from scalar arithmetic                        | Always write the left matrix first; verify dimensions before computing. |
| Ignoring dimension check          | Visual similarity of matrices                       | Write the shapes \(m\times n\) and \(n\times p\) explicitly each time. |
| Treating \(AB=0\) as implying \(A=0\) or \(B=0\) | Zero divisors exist in matrix rings          | Keep counter-examples such as \(\begin{pmatrix}0&1\\0&0\end{pmatrix}\) ready. |
| Forgetting that \(A^2\) means \(AA\) | Notation overload                                   | Expand \(A^2\) immediately when first encountered.   |
| Assuming \(AB=BA\) for diagonal matrices | True only when they share eigenvectors     | Check the off-diagonal entries after multiplication. |
| Mis-indexing the summation        | Confusion between row and column indices            | Label every summation index \(k\) and verify it runs over the shared dimension. |
| Computing \(BA\) when only \(AB\) is defined | Overlooking rectangular shapes               | Write the product symbol only after confirming inner dimensions match. |

## 7. The textbook-precise statement
Let \(F\) be a field. If \(A\in M_{m,n}(F)\) and \(B\in M_{n,p}(F)\), the **product** \(AB\in M_{m,p}(F)\) is the matrix whose \((i,j)\)-entry is
\[
(AB)_{ij}=\sum_{k=1}^n A_{ik}B_{kj}.
\]
Matrix multiplication is associative: \((AB)C=A(BC)\) whenever the products are defined. It is not commutative: there exist matrices for which \(AB\neq BA\). (See Axler, *Linear Algebra Done Right*, 3e, §3.4.)

## 8. Visual — diagram or schematic
```text
          B
     ┌───────────┐
     │ b11 b12   │
A    │ b21 b22   │   =   AB
┌───┐│ b31 b32   │   ┌─────────────┐
│a11││           │   │ a11·col1(B) │
│a12││           │   │ a12·col2(B) │
│a13│└───────────┘   └─────────────┘
└───┘
Row i of A  dotted with  column j of B  →  entry (i,j) of AB
```
The diagram shows that each entry of the product is assembled from exactly one row of the left factor and one column of the right factor.

## 9. The memory technique
1. **The hook** — Picture two trains passing at right angles: the first train’s passengers (rows) shake hands with the second train’s passengers (columns). The total handshakes form the new timetable (product matrix).  
2. **What to overlearn** — The dimension rule “\(m\times n\) times \(n\times p\) yields \(m\times p\)”; the summation formula for \((AB)_{ij}\); the explicit 2-by-2 counter-example showing \(AB\neq BA\).  
3. **Spaced-repetition schedule** — Review the dimension rule after 1 day, recompute the 2-by-2 counter-example after 3 days, prove associativity from the summation definition after 7 days, and derive a non-commuting triple after 16 and 35 days.  
4. **First-principles fallback** — Return to the definition of linear maps: matrix multiplication is function composition; composition is always associative and rarely commutative.

## 10. What this unlocks
Matrix multiplication supplies the algebraic engine for every subsequent construction in linear algebra.  
- Matrix inverses are defined via the two-sided identity \(A^{-1}A=AA^{-1}=I\).  
- Determinants satisfy the multiplicative property \(\det(AB)=\det(A)\det(B)\).  
- Change-of-basis formulas, similarity, Jordan form, and the spectral theorem all rely on products of matrices.  
- In applied fields the same operation yields the Kalman filter update, the FFT butterfly, and back-propagation in deep networks.

## 11. Self-check — five questions, no answers
1. Compute the product of \(\begin{pmatrix}1&2\\3&4\end{pmatrix}\) and \(\begin{pmatrix}0&1\\1&0\end{pmatrix}\).  
2. Find two 2-by-2 matrices \(A\) and \(B\) such that \(AB=0\) but neither \(A\) nor \(B\) is the zero matrix.  
3. Prove that \((AB)^\top=B^\top A^\top\) directly from the summation definition.  
4. Give an example of three matrices \(A,B,C\) for which \(AB=AC\) yet \(B\neq C\).  
5. Determine whether the set of all 3-by-3 matrices over \(\mathbb{R}\) forms a commutative ring under matrix addition and multiplication.