## 1. The one-sentence answer
**Finding eigenspaces** means computing the full subspace of vectors that a linear operator scales by a fixed eigenvalue, which is exactly the null space of \(A - \lambda I\).

Aap already know that an eigenvector satisfies \(Av = \lambda v\). The eigenspace for that \(\lambda\) collects every such vector together with the zero vector, so it forms a subspace. Once you fix \(\lambda\), you simply solve the homogeneous system \((A - \lambda I)x = 0\); the solution set is the eigenspace. This single idea connects the algebraic definition of eigenvalues to the geometric picture of invariant directions.

The deepest point is that the dimension of the eigenspace (its geometric multiplicity) can be smaller than the algebraic multiplicity of \(\lambda\), and that gap controls whether \(A\) is diagonalizable.

> [!NOTE]
> The eigenspace is not just “the eigenvectors”; it is the entire kernel, so its dimension tells you immediately how many independent eigenvectors you actually possess for that eigenvalue.

## 2. Why this matters — concrete and current
In structural engineering, NASA’s finite-element models of rocket boosters use eigenspaces of the stiffness matrix to locate the lowest-frequency vibration modes; missing even one mode has led to resonance failures in past prototypes.

Google’s PageRank algorithm treats the web graph as a giant stochastic matrix whose dominant eigenspace (the Perron vector) determines the steady-state ranking; the entire ranking pipeline collapses if that one-dimensional eigenspace is computed incorrectly.

In quantum computing, the instantaneous eigenstates of a time-dependent Hamiltonian are tracked by following the eigenspaces of the discretized operator; IBM’s 127-qubit Eagle processor calibration routines explicitly diagonalize small blocks to keep leakage out of the computational subspace.

Semiconductor firms such as TSMC solve the eigenvalue problem for the Hessian of the electron-density functional inside each DFT iteration; the eigenspace corresponding to the lowest eigenvalues gives the occupied orbitals that determine band gaps of 3 nm chips.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Null space / kernel  | Eigenspace = \(\ker(A - \lambda I)\)                      |
| Row reduction        | You must solve \((A - \lambda I)x = 0\) by hand or code   |
| Basis and dimension  | You report the eigenspace by giving a basis and its size  |
| Characteristic polynomial | Supplies the candidate values of \(\lambda\)         |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the defining equation
An eigenvector satisfies \(Av = \lambda v\). Rearrange to \((A - \lambda I)v = 0\). The set of all solutions \(v\) is precisely the eigenspace \(E_\lambda\).

Concrete example: take \(A = \begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}\). For \(\lambda = 2\) you obtain \((A-2I) = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}\). Solving gives vectors of the form \(t\begin{pmatrix} 1 \\ 0 \end{pmatrix}\).

Formal statement:  
\[E_\lambda := \{v \in \mathbb{R}^n \mid (A - \lambda I)v = 0\} = \ker(A - \lambda I).\]

> [!WARNING]
> If you forget the zero vector, you lose the subspace property and later dimension counts will be off by one.

### Step 2 — Compute the matrix \(A - \lambda I\)
Subtract \(\lambda\) from every diagonal entry. Keep the rest unchanged. This matrix must be singular, which is already guaranteed once \(\lambda\) is an eigenvalue.

### Step 3 — Row-reduce to find the kernel
Perform Gaussian elimination on \(A - \lambda I\). Read off free variables and express pivot variables in terms of them. The resulting parametric vector is a basis for \(E_\lambda\).

### Step 4 — Verify linear independence and spanning
The vectors you obtain from the free-variable assignments are automatically linearly independent (each corresponds to a distinct free variable set to 1). They span the kernel by construction of row reduction.

### Step 5 — Record dimension and geometric multiplicity
Count the number of free variables; that is \(\dim E_\lambda\). Compare with algebraic multiplicity from the characteristic polynomial. Equality for every \(\lambda\) is necessary and sufficient for diagonalizability.

## 5. Worked examples — har step show karo

**Example 1 — 2-by-2 matrix with distinct eigenvalues**  
*Given:* \(A = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}\).  
*Find:* Eigenspaces for both eigenvalues.  

Row-reduce \(A-3I = \begin{pmatrix} 0 & 1 \\ 0 & -1 \end{pmatrix}\) → basis \(\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix} \}\).  
Row-reduce \(A-2I = \begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix}\) → basis \(\{ \begin{pmatrix} -1 \\ 1 \end{pmatrix} \}\).  

*Why:* Each kernel is one-dimensional because each eigenvalue has algebraic multiplicity one.  
**Final answer**  
\(E_3 = \operatorname{span}\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix} \}\), \(E_2 = \operatorname{span}\{ \begin{pmatrix} -1 \\ 1 \end{pmatrix} \}\).  

*Reflection:* Distinct eigenvalues automatically give independent eigenvectors; the example is simple yet shows the full pipeline.

**Example 2 — Repeated eigenvalue, full eigenspace**  
*Given:* Identity matrix \(I_2\).  
*Find:* Eigenspace for \(\lambda=1\).  

\(I-1\cdot I = 0\), kernel is all of \(\mathbb{R}^2\). Basis: standard basis.  
**Final answer**  
\(E_1 = \mathbb{R}^2\), dimension 2.  

*Reflection:* Algebraic and geometric multiplicities match; matrix is diagonal (already is).

**Example 3 — Defective case**  
*Given:* \(A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}\).  
*Find:* Eigenspace for \(\lambda=1\).  

\(A-I = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}\). Only one free variable, basis \(\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix} \}\).  
**Final answer**  
\(\dim E_1 = 1 < 2\) (algebraic multiplicity).  

*Reflection:* Classic Jordan block; not diagonalizable.

**Example 4 — 3-by-3 matrix**  
*Given:* \(A = \begin{pmatrix} 2 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}\).  
*Find:* All eigenspaces.  

For \(\lambda=2\): kernel dimension 2, basis \(\{ \begin{pmatrix}1\\0\\0\end{pmatrix},\begin{pmatrix}0\\1\\0\end{pmatrix} \}\).  
For \(\lambda=3\): kernel dimension 1, basis \(\{ \begin{pmatrix}0\\0\\1\end{pmatrix} \}\).  
**Final answer**  
\(E_2 = \operatorname{span}\{e_1,e_2\}\), \(E_3 = \operatorname{span}\{e_3\}\).  

*Reflection:* Two distinct eigenvalues, one repeated with full geometric multiplicity, hence diagonalizable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using the wrong \(\lambda\)       | Characteristic polynomial misread           | Double-check every root before subtracting   |
| Reporting only eigenvectors, not the space | Forgetting zero vector and closure          | Always write “span of …”                     |
| Confusing algebraic and geometric multiplicity | Never comparing dimensions                  | Compute both and state the comparison        |
| Row-reducing \(A\) instead of \(A-\lambda I\) | Mechanical habit                            | Write the matrix explicitly each time        |
| Claiming diagonalizability without checking all eigenvalues | Over-generalizing from one \(\lambda\)      | Verify every eigenvalue separately           |
| Arithmetic error in \(\lambda\) extraction | High-degree characteristic polynomial       | Use computer algebra for degree >3           |
| Assuming every matrix has a full set of eigenvectors | Jordan-form intuition missing               | Always compute geometric multiplicity        |

## 7. The textbook-precise statement
Let \(V\) be a finite-dimensional vector space over \(\mathbb{F}\) and let \(T:V\to V\) be linear. For \(\lambda\in\mathbb{F}\), the \(\lambda\)-eigenspace of \(T\) is the subspace  
\[E_\lambda(T) := \ker(T - \lambda\operatorname{id}_V).\]  
If \(A\) is the matrix of \(T\) with respect to some basis, then \(E_\lambda(T)\) is identical to the null space of the matrix \(A - \lambda I\). The dimension of \(E_\lambda(T)\) is called the geometric multiplicity of \(\lambda\). (Axler, *Linear Algebra Done Right*, 3e, §5.4)

## 8. Visual — diagram or schematic
```text
A - λI
[ * * * ]  →  row reduce  →  [ 1 * 0 | 0 ]   free var x3
[ * * * ]                   [ 0 1 0 | 0 ]   free var x2
[ * * * ]                   [ 0 0 0 | 0 ]
Kernel basis vectors:
v1 = (-*, 0, 1), v2 = (0, -*, 0)   → span{v1,v2} = E_λ
```

## 9. The memory technique

1. **The hook** — Picture a rubber sheet stretched by factor \(\lambda\) along certain directions; the whole sheet that moves uniformly is the eigenspace.
2. **What to overlearn** — \(E_\lambda = \ker(A-\lambda I)\); dimension equals number of free variables after row reduction.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the formula, return to \(Av=\lambda v\), move everything to one side, and recognize the kernel.

## 10. What this unlocks
You can now decide diagonalizability, compute the Jordan canonical form, and understand invariant subspaces.

- Spectral theorem for symmetric matrices
- Generalized eigenspaces and Jordan chains
- Markov-chain steady-state analysis
- Principal-component analysis in data science

## 11. Self-check — five questions, no answers
1. For a 3-by-3 matrix whose characteristic polynomial is \((\lambda-2)^2(\lambda-5)\), what are the possible dimensions of \(E_2\)?
2. Compute the eigenspace of \(\begin{pmatrix}0&-1\\1&0\end{pmatrix}\) for eigenvalue \(i\).
3. A student claims \(E_\lambda\) is never the zero subspace. Is the claim true?
4. Show that if \(\dim E_\lambda = n\) then \(A = \lambda I\).
5. Given that algebraic multiplicity of \(\lambda\) is 4 but \(\dim E_\lambda = 2\), what can you conclude about diagonalizability?