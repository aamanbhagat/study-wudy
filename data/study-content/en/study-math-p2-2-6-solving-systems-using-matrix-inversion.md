## 1. The one-sentence answer
**Solving a linear system \(Ax = b\) by matrix inversion means computing \(x = A^{-1}b\) whenever the square coefficient matrix \(A\) possesses an inverse.**

A linear system consists of several equations in several unknowns that must hold simultaneously. When the equations are written in matrix form, the coefficient matrix \(A\) multiplies the vector of unknowns to produce the constant vector \(b\). If \(A\) can be “undone” by another matrix \(A^{-1}\), multiplying both sides on the left by that inverse isolates the unknown vector exactly.

The method therefore replaces elimination or substitution with a single matrix multiplication, provided the inverse exists. The existence condition is equivalent to the determinant of \(A\) being nonzero, which geometrically means the rows (or columns) of \(A\) are linearly independent and span the whole space.

> [!NOTE]
> The inverse does not merely “cancel” \(A\); it encodes the unique linear transformation that reverses the original mapping, so the solution \(x\) is the only vector that \(A\) can send to \(b\).

## 2. Why this matters — concrete and current
In aerospace guidance, the Kalman filter update step for spacecraft attitude estimation solves a 6-by-6 linear system whose coefficient matrix changes at each time step; NASA’s onboard flight software uses matrix inversion routines to obtain the correction vector in real time.

In semiconductor process control, Intel’s lithography overlay correction solves a 4-by-4 system at every exposure site to compensate for wafer distortion; the inverse of the measured distortion matrix supplies the actuator commands that keep feature placement inside 2 nm tolerance.

In machine-learning hardware, Google’s TPU clusters solve batches of small dense linear systems when performing Newton steps inside second-order optimizers for transformer training; the inversion step is fused into the systolic array so that the weight-update latency remains hidden behind matrix-multiplication throughput.

In quantum-circuit simulation, IBM’s Qiskit Aer uses matrix inversion of the 2^n-by-2^n Pauli transfer matrix when computing exact expectation values for variational algorithms on up to 20 qubits, allowing researchers to benchmark noisy hardware results against ideal theory.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix multiplication    | Required to verify \(A A^{-1} = I\) and to compute \(A^{-1}b\) |
| Determinant of a square matrix | Supplies the scalar test that decides whether an inverse exists |
| Identity matrix          | Serves as the target that the product \(A A^{-1}\) must equal |
| Linear independence      | Explains geometrically why some systems have unique solutions |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the system as a single matrix equation
Any collection of linear equations can be compacted by placing the coefficients into a matrix \(A\), the unknowns into a column vector \(x\), and the constants into a column vector \(b\). The equation \(Ax = b\) then stands for the entire system at once.

Concrete example:  
\[
2x + 3y = 5, \quad 4x + 5y = 7
\]  
becomes
\[
A = \begin{pmatrix} 2 & 3 \\ 4 & 5 \end{pmatrix},\quad
x = \begin{pmatrix} x \\ y \end{pmatrix},\quad
b = \begin{pmatrix} 5 \\ 7 \end{pmatrix}.
\]

Formal statement:
\[
Ax = b.
\]

> [!WARNING]
> If the number of equations differs from the number of unknowns, \(A\) is not square and the simple inversion formula cannot be applied.

### Step 2 — Seek an “undo” matrix
To isolate \(x\), the matrix \(A\) must be multiplied on the left by something that restores the identity. That something is the inverse matrix \(A^{-1}\), defined by the property \(A^{-1}A = I\).

Formal statement:
\[
A^{-1}A = AA^{-1} = I.
\]

### Step 3 — Multiply both sides on the left by the inverse
Left-multiplying the original equation by \(A^{-1}\) yields
\[
A^{-1}(Ax) = A^{-1}b.
\]
Associativity lets the parentheses move, producing
\[
(A^{-1}A)x = A^{-1}b \implies Ix = A^{-1}b \implies x = A^{-1}b.
\]

> [!WARNING]
> Multiplication order is mandatory: right-multiplication by \(A^{-1}\) would generally produce a different and incorrect result.

### Step 4 — Verify that an inverse exists
The inverse exists if and only if \(\det(A) \neq 0\). When the determinant vanishes, the rows are linearly dependent and no matrix can restore the identity.

Formal statement:
\[
A\text{ is invertible} \iff \det(A) \neq 0.
\]

### Step 5 — Compute the inverse explicitly for small matrices
For a 2-by-2 matrix the formula is
\[
A^{-1} = \frac{1}{\det(A)}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
\]
when
\[
A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}.
\]

### Step 6 — State the general solution method
Whenever \(A\) is square and \(\det(A) \neq 0\), the unique solution of \(Ax = b\) is given by the matrix-vector product \(x = A^{-1}b\).

## 5. Worked examples — every step shown

**Example 1 — 2-by-2 system with integer inverse**  
*Given:*  
\[
\begin{cases}
2x + y = 5 \\
3x + 2y = 8
\end{cases}
\]  
*Find:* the solution vector.

Write
\[
A = \begin{pmatrix} 2 & 1 \\ 3 & 2 \end{pmatrix},\quad b = \begin{pmatrix} 5 \\ 8 \end{pmatrix}.
\]
Compute \(\det(A) = 2\cdot2-1\cdot3=1\neq0\).  
\[
A^{-1}=\frac{1}{1}\begin{pmatrix}2&-1\\-3&2\end{pmatrix}=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}.
\]
Then
\[
x=A^{-1}b=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}\begin{pmatrix}5\\8\end{pmatrix}=\begin{pmatrix}10-8\\-15+16\end{pmatrix}=\begin{pmatrix}2\\1\end{pmatrix}.
\]
**Final answer:** \(\mathbf{x}=\begin{pmatrix}2\\1\end{pmatrix}\).  
*Reflection:* The determinant being 1 made the arithmetic trivial; the same steps scale to any invertible 2-by-2 matrix.

**Example 2 — 2-by-2 system requiring a fractional inverse**  
*Given:*  
\[
\begin{cases}
x + 2y = 3 \\
3x + 4y = 5
\end{cases}
\]  
*Find:* the solution.

\[
A=\begin{pmatrix}1&2\\3&4\end{pmatrix},\quad\det(A)=4-6=-2.
\]
\[
A^{-1}=\frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix}=\begin{pmatrix}-2&1\\\frac{3}{2}&-\frac12\end{pmatrix}.
\]
\[
x=A^{-1}b=\begin{pmatrix}-2&1\\\frac32&-\frac12\end{pmatrix}\begin{pmatrix}3\\5\end{pmatrix}=\begin{pmatrix}-6+5\\\frac92-\frac52\end{pmatrix}=\begin{pmatrix}-1\\2\end{pmatrix}.
\]
**Final answer:** \(\mathbf{x}=\begin{pmatrix}-1\\2\end{pmatrix}\).  
*Reflection:* The negative determinant simply changes the sign of every entry in the adjugate; the method itself is unchanged.

**Example 3 — 3-by-3 system**  
*Given:* the system whose coefficient matrix is
\[
A=\begin{pmatrix}1&1&1\\2&1&3\\3&2&6\end{pmatrix},\quad b=\begin{pmatrix}6\\14\\23\end{pmatrix}.
\]
*Find:* \(x\).

\(\det(A)=1(6-6)-1(12-9)+1(4-3)=0-3+1=-2\neq0\).  
The inverse (computed via cofactors) is
\[
A^{-1}=\frac12\begin{pmatrix}-3&-4&2\\3&3&-1\\1&1&-1\end{pmatrix}.
\]
Matrix multiplication yields
\[
x=\begin{pmatrix}1\\2\\3\end{pmatrix}.
\]
**Final answer:** \(\mathbf{x}=\begin{pmatrix}1\\2\\3\end{pmatrix}\).  
*Reflection:* The extra row and column increase bookkeeping but do not alter the logical sequence \(x=A^{-1}b\).

**Example 4 — System that cannot be solved by inversion**  
*Given:*  
\[
A=\begin{pmatrix}1&2\\2&4\end{pmatrix},\quad b=\begin{pmatrix}3\\5\end{pmatrix}.
\]
*Find:* whether inversion works.

\(\det(A)=4-4=0\), so \(A\) has no inverse. The rows are scalar multiples; the equations are inconsistent or dependent. Inversion is impossible.  
**Final answer:** No solution via inversion.  
*Reflection:* Always compute the determinant first; a zero value immediately rules out the method.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Multiplying \(b\) on the right    | Habit from scalar algebra where order is irrelevant | Always write \(A^{-1}b\) and verify left multiplication |
| Forgetting to check \(\det(A)\)   | Eagerness to reach the answer                       | Compute determinant before constructing the inverse  |
| Using the 2-by-2 formula on larger matrices | Pattern-matching without checking size         | Verify matrix order before applying any shortcut     |
| Confusing row and column vectors  | Notation ambiguity in different texts               | Adopt consistent column-vector convention            |
| Arithmetic sign errors in cofactors | Multiple minus signs in the adjugate formula   | Recalculate each cofactor with a separate sign check |
| Assuming every square matrix is invertible | Over-generalization from scalar division     | State the hypothesis \(\det(A)\neq0\) explicitly     |
| Numerical instability with floating-point entries | Condition number ignored                        | Examine \(\lvert\det(A)\rvert\) relative to matrix norm |

## 7. The textbook-precise statement
Let \(A\) be an \(n\times n\) matrix with real entries. If \(\det(A)\neq0\), then there exists a unique matrix \(A^{-1}\) such that \(AA^{-1}=A^{-1}A=I_n\). For any column vector \(b\in\mathbb{R}^n\) the equation \(Ax=b\) possesses the unique solution \(x=A^{-1}b\). (David C. Lay, *Linear Algebra and Its Applications*, 6th ed., §2.2, Theorem 5.)

## 8. Visual — diagram or schematic
```text
          b                  A^{-1}               x
     [ b1 ]              [         ]          [ x1 ]
     [ b2 ]     --->     [   A^{-1} ]   --->  [ x2 ]
     [ .. ]              [         ]          [ .. ]
     [ bn ]              [         ]          [ xn ]

     Matrix-vector product:  x = A^{-1} * b
     (left multiplication only)
```
The diagram shows the constant vector entering on the left, the inverse matrix acting as a linear operator, and the solution vector emerging on the right. The arrow labels emphasize that multiplication occurs on the left.

## 9. The memory technique
1. **The hook** — Picture the inverse matrix as a pair of “undo” hands that reach backward through the original transformation and pull the unknown vector out of the constant vector.
2. **What to overlearn** — The definition \(A^{-1}A=I\), the solution formula \(x=A^{-1}b\), and the test \(\det(A)\neq0\).
3. **Spaced-repetition schedule** — Review the three facts above at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.
4. **First-principles fallback** — Re-derive the solution by starting from \(Ax=b\), left-multiplying by a matrix that produces the identity, and naming that matrix \(A^{-1}\).

## 10. What this unlocks
Matrix inversion supplies the conceptual bridge to the broader theory of linear operators and to numerical linear algebra. It directly precedes discussions of LU factorization, condition numbers, iterative methods, and the Moore–Penrose pseudoinverse for non-square or singular systems.

- Eigenvalue problems and diagonalization
- Least-squares solutions via the normal equations
- Markov chains and steady-state vectors
- Control-theory state-transition matrices

## 11. Self-check — five questions, no answers
1. Solve the system whose coefficient matrix is \(\begin{pmatrix}4&1\\2&3\end{pmatrix}\) and whose constant vector is \(\begin{pmatrix}5\\5\end{pmatrix}\) by first computing the inverse.

2. For which values of \(k\) does the matrix \(\begin{pmatrix}1&k\\k&1\end{pmatrix}\) fail to be invertible, and what does that imply for the corresponding linear system?

3. A student computes \(bA^{-1}\) instead of \(A^{-1}b\). Under what precise condition would the two expressions coincide?

4. Explain in geometric language why a zero determinant guarantees that inversion cannot recover a unique solution vector.

5. Given an arbitrary 3-by-3 matrix \(A\) with \(\det(A)=2\), how many arithmetic operations (multiplications and divisions) are required to obtain \(A^{-1}b\) once \(A^{-1}\) has already been formed?