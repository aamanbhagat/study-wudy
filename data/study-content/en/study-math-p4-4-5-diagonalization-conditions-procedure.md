## 1. The one-sentence answer
**A square matrix \(A\) is diagonalizable precisely when it possesses a full set of linearly independent eigenvectors, allowing \(A = PDP^{-1}\) with \(D\) diagonal.**

An \(n \times n\) matrix acts on \(\mathbb{R}^n\) by stretching or shearing vectors. When a basis exists whose vectors are each merely scaled (no shearing between them), the action becomes multiplication by a diagonal matrix in those coordinates. The change-of-basis matrix \(P\) assembles those eigenvectors as columns; the diagonal entries of \(D\) are the corresponding eigenvalues. If fewer than \(n\) independent eigenvectors exist, no such basis is available and the matrix cannot be diagonalized.

The algebraic condition is therefore geometric: the sum of the dimensions of the eigenspaces must equal \(n\). Distinct eigenvalues automatically supply independent eigenvectors, but repeated eigenvalues require separate verification that their geometric multiplicity reaches the algebraic multiplicity.

> [!NOTE]
> The eigenvectors must span the whole space; merely having \(n\) eigenvalues (counting multiplicity) is never enough.

## 2. Why this matters — concrete and current
In structural engineering, finite-element models of aircraft wings produce large stiffness matrices that are diagonalized to extract natural frequencies; Airbus and Boeing use the resulting modal matrices to predict flutter boundaries before wind-tunnel tests.

Principal-component analysis in machine-learning pipelines at Google and Meta diagonalizes covariance matrices of user data to obtain orthogonal feature axes, reducing dimensionality while preserving variance for recommendation systems.

Quantum mechanics simulators at IBM and Rigetti diagonalize Hamiltonians of qubit arrays to obtain energy eigenvalues; the procedure yields the time-evolution operator in the energy basis, enabling pulse-sequence design for gate operations.

Vibration analysis of semiconductor lithography stages at ASML diagonalizes mass and stiffness matrices to decouple translational and rotational modes, allowing real-time active damping at nanometer precision.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Eigenvalue equation      | Supplies the scaling factors that become diagonal entries |
| Linear independence      | Guarantees that eigenvectors form a basis                 |
| Invertibility of \(P\)   | Ensures the change-of-basis matrix has an inverse         |
| Characteristic polynomial| Locates all eigenvalues (roots)                           |
| Algebraic vs. geometric multiplicity | Distinguishes when repeated eigenvalues still permit a full eigenbasis |

## 4. Building the idea — from intuition to formalism

### Step 1 — Eigenvectors are invariant lines
A nonzero vector \(v\) satisfies \(Av = \lambda v\) if and only if \(A\) merely scales its length without rotating it away from its own direction.  
Example: \(A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}\), \(v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}\) gives \(Av = 2v\).  
Formally: \(Av = \lambda v\) with \(v \neq 0\).

> [!WARNING]
> The zero vector satisfies the equation for every \(\lambda\) but supplies no direction and cannot be part of a basis.

### Step 2 — Collecting eigenvectors into a matrix
Place \(k\) eigenvectors as columns of \(P\). Then \(AP = PD'\) where \(D'\) is the diagonal matrix of the corresponding eigenvalues, provided all eigenvectors share the same eigenvalue count.  
Formally: if \(Av_i = \lambda_i v_i\) for \(i=1,\dots,k\), then \(AP = PD\) with \(D = \operatorname{diag}(\lambda_1,\dots,\lambda_k)\).

> [!WARNING]
> If the chosen eigenvectors are linearly dependent, \(P\) is singular and cannot be inverted later.

### Step 3 — Reaching the full space
When exactly \(n\) linearly independent eigenvectors exist for an \(n \times n\) matrix, they form a basis of \(\mathbb{R}^n\). In that basis the matrix representation of the linear map is diagonal.

### Step 4 — Change-of-basis formula
Any vector \(x\) satisfies \(x = Py\) where \(y\) holds the coordinates of \(x\) with respect to the eigenvector basis. Substituting yields \(A(Py) = PDy\), hence \(P^{-1}AP = D\).

### Step 5 — The diagonalization equation
Rearrangement produces the textbook relation \(A = PDP^{-1}\). The matrix \(A\) is therefore similar to the diagonal matrix \(D\).

### Step 6 — Necessary and sufficient condition
\(A\) is diagonalizable if and only if the sum of the geometric multiplicities of all eigenvalues equals \(n\). When all eigenvalues are distinct this condition holds automatically.

## 5. Worked examples — every step shown

**Example 1 — Distinct eigenvalues**  
*Given:* \(A = \begin{pmatrix} 4 & -2 \\ 1 & 1 \end{pmatrix}\).  
*Find:* diagonalization if it exists.  

Compute \(\det(A - \lambda I) = (4-\lambda)(1-\lambda) + 2 = \lambda^2 - 5\lambda + 6\).  
*Why:* Characteristic polynomial locates eigenvalues.  

Roots: \(\lambda = 2,3\).  
*Why:* Factorization of quadratic.  

For \(\lambda=2\): \((A-2I)v=0\) yields \(v_1 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}\).  
*Why:* Null-space computation.  

For \(\lambda=3\): \(v_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}\).  
*Why:* Same procedure.  

Two independent eigenvectors, so \(P = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}\), \(D = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}\).  
Verify \(P^{-1}AP = D\).  
**Final answer**  
\[ A = PDP^{-1} \]  
*Reflection:* Distinct eigenvalues guaranteed independence; the arithmetic is routine once eigenvectors are found.

**Example 2 — Repeated eigenvalue, diagonalizable**  
*Given:* \(A = \begin{pmatrix} 3 & 1 \\ 0 & 3 \end{pmatrix}\).  
*Find:* Check diagonalizability.  

Characteristic polynomial \((\lambda-3)^2\). Algebraic multiplicity 2.  
Solve \((A-3I)v=0\): row reduces to a single independent equation, yielding two independent vectors \(v_1=\begin{pmatrix}1\\0\end{pmatrix}\), \(v_2=\begin{pmatrix}0\\1\end{pmatrix}\). Geometric multiplicity equals 2.  
Thus \(P=I\), \(D=3I\).  
**Final answer**  
\[ A = 3I \]  
*Reflection:* The eigenspace filled the plane even though the eigenvalue repeated.

**Example 3 — Repeated eigenvalue, not diagonalizable**  
*Given:* \(A = \begin{pmatrix} 3 & 1 \\ 0 & 3 \end{pmatrix}\) but replace the off-diagonal with a Jordan block structure (already shown). Geometric multiplicity is only 1.  
Only one independent eigenvector exists.  
**Final answer**  
Not diagonalizable.  
*Reflection:* Algebraic multiplicity exceeded geometric multiplicity; the matrix remains defective.

**Example 4 — 3×3 matrix**  
*Given:* \(A = \begin{pmatrix} 2 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}\).  
Eigenvalues 2 (alg. mult. 2), 3 (alg. mult. 1). For \(\lambda=2\) the eigenspace yields only one independent vector. Not diagonalizable.  
**Final answer**  
Not diagonalizable.  
*Reflection:* The 2-block is a classic Jordan block; the third direction decouples cleanly but cannot rescue the deficiency.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming distinct eigenvalues are required | Most textbook examples use them, creating the impression they are mandatory | Always compute geometric multiplicity even when eigenvalues repeat |
| Forgetting to verify linear independence of eigenvectors | Students collect eigenvectors without checking the determinant of \(P\) | Compute \(\det P\) or row-reduce the matrix of eigenvectors |
| Confusing algebraic and geometric multiplicity | Both are denoted with similar symbols in some notes | Write “alg. mult.” and “geo. mult.” explicitly in every calculation |
| Using complex eigenvectors for real matrices without justification | Characteristic polynomial may have complex roots | Check whether the problem statement demands a real basis |
| Inverting a singular \(P\) | Eigenvectors chosen from the same line | Test rank of \(P\) before inversion |
| Stopping after finding eigenvalues | The diagonalization procedure is incomplete without \(P\) | Always produce both \(P\) and \(D\) when claiming diagonalizability |
| Treating the zero vector as an eigenvector | It satisfies the equation formally | Explicitly discard the zero solution when solving \((A-\lambda I)v=0\) |

## 7. The textbook-precise statement
Let \(A\) be an \(n \times n\) matrix over \(\mathbb{R}\) or \(\mathbb{C}\). Then \(A\) is diagonalizable if and only if there exist an invertible matrix \(P\) and a diagonal matrix \(D\) such that \(A = PDP^{-1}\). Equivalently, the minimal polynomial of \(A\) splits into distinct linear factors, or the sum of the dimensions of the eigenspaces equals \(n\). (Axler, *Linear Algebra Done Right*, 3e, Theorem 5.21; Friedberg, Insel, Spence, *Linear Algebra*, 5e, §5.2.)

## 8. Visual — diagram or schematic
```
          Standard basis               Eigenvector basis
     e1 ──────► A(e1)             v1 ──────► λ1 v1
     e2 ──────► A(e2)             v2 ──────► λ2 v2
          P                D               P⁻¹
     x ──► y = P⁻¹x ──► Dy ──► A x = P(Dy)
```
The left arrow applies the change-of-basis \(P^{-1}\), the middle arrow scales each coordinate independently, and the right arrow returns to standard coordinates.

## 9. The memory technique
1. **The hook** — Picture a diagonal matrix as a set of independent rubber bands, each stretching only along its own eigenvector axis; \(P\) is the “handle” that aligns those axes with the coordinate frame.  
2. **What to overlearn** — \(A = PDP^{-1}\) with \(D\) diagonal; geometric multiplicity test; distinct eigenvalues imply diagonalizability.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive \(AP = PD\) from the eigenvalue definition, then left-multiply by \(P^{-1}\).

## 10. What this unlocks
Diagonalization supplies the spectral theorem for symmetric matrices, the solution of systems of linear ODEs via matrix exponentials, the Jordan canonical form for defective matrices, and the singular-value decomposition.  
- Symmetric matrices are orthogonally diagonalizable.  
- Markov chains reach steady state by diagonalizing the transition matrix.  
- Quadratic forms are classified by the signs of eigenvalues after diagonalization.

## 11. Self-check — five questions, no answers
1. For a \(2\times2\) matrix with repeated eigenvalue 4, give an explicit example where geometric multiplicity is 1 and another where it is 2.  
2. Prove that any matrix with three distinct eigenvalues in \(\mathbb{R}^3\) is diagonalizable.  
3. Compute \(P^{-1}AP\) for the matrix in Example 2 and verify the result is diagonal.  
4. A student claims “if \(\det(A-\lambda I)=0\) has \(n\) roots then \(A\) is diagonalizable.” Identify the flaw.  
5. Construct a \(3\times3\) real matrix whose characteristic polynomial is \((\lambda-1)^2(\lambda-2)\) yet which fails to be diagonalizable; justify your construction.