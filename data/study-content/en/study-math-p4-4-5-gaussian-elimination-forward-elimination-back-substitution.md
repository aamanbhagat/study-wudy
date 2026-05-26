## 1. The one-sentence answer
**Gaussian elimination converts a linear system into an equivalent upper-triangular system by forward elimination, after which back substitution recovers the unique solution when it exists.**

A system of linear equations is represented by an augmented matrix whose rows encode the coefficients and right-hand side. Forward elimination subtracts multiples of one row from those below it, systematically driving all entries below the main diagonal to zero. The resulting matrix is in row echelon form, so each equation contains one fewer unknown than the equation above it.

Back substitution then begins with the last equation, which now isolates a single variable, and substitutes that value upward to determine the remaining variables. The process works because each elementary row operation preserves the solution set.

> [!NOTE]
> The decisive insight is that the same sequence of row operations that triangularizes the coefficient matrix can be applied simultaneously to the right-hand side, turning an opaque coupled system into a chain of explicit substitutions.

## 2. Why this matters — concrete and current
NASA’s Artemis program solves trajectory-correction problems whose linear systems arise from linearized orbital dynamics; Gaussian elimination on 10,000-by-10,000 sparse matrices supplies the delta-v commands uploaded to the Orion spacecraft each day.

In semiconductor process simulation, Synopsys TCAD tools assemble Poisson and drift-diffusion equations on unstructured meshes containing millions of nodes; forward elimination with partial pivoting followed by back substitution yields the electrostatic potential used to predict transistor leakage currents before fabrication.

Modern transformer training at Google and OpenAI repeatedly solves large least-squares subproblems when computing attention gradients or updating embedding layers; the underlying normal equations are handled by blocked Gaussian elimination inside cuBLAS and MKL libraries, delivering the matrix factorizations that make a single pre-training run feasible on thousands of GPUs.

Seismic imaging at Shell and Schlumberger inverts acoustic wave equations on 3-D grids with billions of unknowns; the resulting sparse linear systems are reduced to upper-triangular form by domain-decomposition variants of Gaussian elimination, enabling real-time reservoir updates during drilling operations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix row operations    | Forward elimination consists exactly of these operations. |
| Augmented matrix         | It encodes the entire system so that elimination acts uniformly on coefficients and constants. |
| Triangular systems       | Back substitution is defined only for upper- or lower-triangular coefficient matrices. |
| Pivot (leading nonzero entry) | Its location determines which variable is eliminated next and whether division is safe. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent the system by its augmented matrix
Any collection of linear equations can be written compactly by placing coefficients to the left of a vertical bar and constants to the right.  
Example:  
\[
2x + y = 5,\qquad x - 3y = -4
\]  
becomes the single matrix
\[
\begin{bmatrix} 2 & 1 & | & 5 \\ 1 & -3 & | & -4 \end{bmatrix}.
\]
Formally, the system \(Ax=b\) is replaced by the augmented matrix \([A|b]\).

> [!WARNING]
> Treating the right-hand side as a separate column instead of adjoining it loses the guarantee that the same operations are applied to both sides.

### Step 2 — Choose the first pivot and eliminate below it
Locate the first nonzero entry in the first column (the pivot) and subtract suitable multiples of the pivot row from every row beneath it.  
For the matrix above, the multiplier for row 2 is \(1/2\); subtracting \((1/2)\) times row 1 yields a zero in position (2,1).

### Step 3 — Proceed column by column
Repeat the elimination on the submatrix obtained by deleting the first row and column. Each new pivot lies one position to the right and one row down, producing the row-echelon pattern.

### Step 4 — Record the multipliers
The factor used to zero each entry is stored; these multipliers later constitute the strictly lower-triangular factor \(L\) in the LU factorization, although that interpretation is not required for solving a single system.

### Step 5 — Reach row-echelon form
After forward elimination the matrix satisfies: all entries below each pivot are zero, and each pivot lies strictly to the right of the pivot above it.

### Step 6 — Back-substitute from the bottom
Starting with the last nonzero row, solve for its single remaining unknown. Substitute that value into the equation above, and continue upward until every variable is known.

### Step 7 — The textbook statement
When \(A\) is square and nonsingular, forward elimination with row interchanges (if needed) produces a unique upper-triangular matrix \(U\) such that \(PA=LU\), after which \(Ux=c\) is solved by back substitution for the transformed right-hand side \(c\).

## 5. Worked examples — every step shown

**Example 1 — Two-by-two system**  
*Given:*  
\[
\begin{bmatrix} 2 & 1 & | & 5 \\ 1 & -3 & | & -4 \end{bmatrix}.
\]  
*Find:* the solution \((x,y)\).  

Swap rows to obtain a larger pivot (optional but shown for completeness):  
\[
\begin{bmatrix} 1 & -3 & | & -4 \\ 2 & 1 & | & 5 \end{bmatrix}.
\]  
*Why:* A larger pivot improves numerical stability.  

Subtract 2 times row 1 from row 2:  
\[
\begin{bmatrix} 1 & -3 & | & -4 \\ 0 & 7 & | & 13 \end{bmatrix}.
\]  
*Why:* The multiplier 2 zeros the (2,1) entry.  

Back-substitute: \(7y=13\) gives \(y=13/7\).  
Substitute into first equation: \(x-3(13/7)=-4\) gives \(x= -4 + 39/7 = 11/7\).  

**\( (x,y) = (11/7,13/7) \)**

*Reflection:* The only arithmetic was one division and two substitutions; the same pattern scales unchanged to larger matrices.

**Example 2 — Three equations, integer data**  
*Given:*  
\[
\begin{bmatrix} 1 & 2 & 3 & | & 6 \\ 2 & 5 & 6 & | & 13 \\ 3 & 6 & 8 & | & 17 \end{bmatrix}.
\]  
*Find:* solution.  

Eliminate column 1: row 2 ← row 2 − 2·row 1, row 3 ← row 3 − 3·row 1  
\[
\begin{bmatrix} 1 & 2 & 3 & | & 6 \\ 0 & 1 & 0 & | & 1 \\ 0 & 0 & -1 & | & -1 \end{bmatrix}.
\]  
*Why:* Each multiplier equals the entry to be zeroed divided by the pivot.  

Back-substitute: \(−z=−1\) ⇒ \(z=1\);  
\(y=1\);  
\(x+2y+3z=6\) ⇒ \(x=1\).  

**\( (x,y,z)=(1,1,1) \)**

*Reflection:* The second pivot happened to be 1, eliminating extra fractions.

**Example 3 — Need for row interchange**  
*Given:* pivot position contains zero.  
\[
\begin{bmatrix} 0 & 1 & | & 2 \\ 3 & 4 & | & 5 \end{bmatrix}.
\]  
Swap rows first, then proceed; solution is \((x,y)=(-1,2)\).

**Example 4 — Upper-triangular back substitution only**  
*Given:* already triangular matrix  
\[
\begin{bmatrix} 2 & 1 & 3 & | & 9 \\ 0 & 4 & 5 & | & 10 \\ 0 & 0 & 6 & | & 12 \end{bmatrix}.
\]  
Back substitution yields \(z=2\), \(y=0\), \(x=3\).

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to scale the right-hand side | Treating b as immutable data                | Always operate on the entire augmented matrix        |
| Using a zero pivot without swapping | Assuming the (k,k) entry is automatically nonzero | Check and interchange rows before division           |
| Arithmetic error in multiplier | Computing “entry/pivot” under time pressure | Write the multiplier explicitly before subtracting   |
| Losing track of row indices after swaps | Multiple interchanges scramble bookkeeping  | Record the permutation matrix P from the start       |
| Stopping at echelon form without back-substituting | Believing triangular form already solves the system | Always continue to the upward substitution phase     |
| Ignoring growth of intermediate entries | Large multipliers amplify rounding error    | Monitor pivot size or switch to partial pivoting     |
| Applying elimination to a singular matrix without detection | Zero pivot appears and is not recognized    | Halt and report “no unique solution” when a zero column segment is encountered |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{n\times n}\) be nonsingular. There exists a permutation matrix \(P\), a unit lower-triangular matrix \(L\), and an upper-triangular matrix \(U\) such that \(PA=LU\). The system \(Ax=b\) is solved by first forming \(c=Pb\), then solving \(Lc=b'\) by forward substitution (if \(L\) is needed) and finally solving \(Ux=c\) by back substitution. (Strang, *Introduction to Linear Algebra*, 5e, §2.2 and §2.3.)

## 8. Visual — diagram or schematic
```text
Row 1:  *  *  *  * | *
Row 2:  0  *  *  * | *
Row 3:  0  0  *  * | *
Row 4:  0  0  0  * | *

          ↑ forward elimination direction
          ↓ back-substitution direction
```
Each asterisk denotes a generally nonzero entry; zeros below the diagonal are created left-to-right, top-to-bottom, then variables are recovered right-to-left, bottom-to-top.

## 9. The memory technique
1. **The hook** — Picture a staircase: forward elimination sweeps down each step, clearing everything beneath the tread; back substitution walks back up the same staircase, reading one new variable per tread.  
2. **What to overlearn** — The multiplier formula \(m_{ik}=a_{ik}^{(k)}/a_{kk}^{(k)}\) and the rule “never divide by a zero pivot.”  
3. **Spaced-repetition schedule** — Review the two-by-two algorithm after 1 day, a three-by-three singular case after 3 days, a partial-pivoting example after 7 days, an LU interpretation after 16 days, and a large sparse application after 35 days.  
4. **First-principles fallback** — Re-derive the elimination step from the requirement that the new row-2 minus \(m\) times row-1 must have a zero in column 1; the algebra forces \(m\) to be the ratio of the two entries.

## 10. What this unlocks
Gaussian elimination is the algorithmic foundation for LU factorization, QR factorization via Householder reflections, and all sparse direct solvers used in computational science.  

- Next: LU factorization and its use in multiple-right-hand-side problems.  
- Next: Condition-number estimation via the factored form.  
- Next: Iterative refinement and preconditioning for large sparse systems.  
- Next: The link to determinant computation and matrix inversion.

## 11. Self-check — five questions, no answers
1. Perform forward elimination on the augmented matrix of  
   \(x+y+z=6\), \(2x+3y+4z=20\), \(3x+6y+10z=35\) and state the resulting upper-triangular system.  
2. A 3-by-3 matrix has a zero in position (2,2) after the first elimination step. What must be true for the algorithm to continue without pivoting?  
3. Why does swapping two rows before elimination change the sign of the determinant of the coefficient matrix?  
4. In floating-point arithmetic with three decimal digits, which pivot choice for the matrix \(\begin{bmatrix}0.001&1\\1&1\end{bmatrix}\) produces a large relative error, and why?  
5. Given only the final upper-triangular matrix \(U\) and the vector of multipliers used during elimination, reconstruct the original matrix \(A\) (assume no row interchanges).