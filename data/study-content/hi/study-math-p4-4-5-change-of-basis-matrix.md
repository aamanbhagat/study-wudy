## 1. The one-sentence answer
**A change of basis matrix** is the unique matrix \(P\) that converts coordinate vectors of any vector \(v\) from one ordered basis to another: \([v]_C = P[v]_B\).

Iska matlab yeh hai ki jab aap ek vector space mein do alag bases use kar rahe hain, to coordinates ko ek basis se doosre mein badalne ke liye sirf ek matrix multiply karna padta hai. Yeh matrix columns mein naye basis vectors ke purane basis coordinates store karti hai. Isse linear transformations aur equations ko convenient bases mein solve karna asaan ho jata hai bina underlying space badle.

Aap soch sakte hain ki basis change karna jaise coordinate system rotate ya stretch karna hai, lekin actual vectors same rehte hain.

> [!NOTE]
> The single most important insight is that the change of basis matrix itself is expressed in the old basis; once built, it works for every vector in the space without needing to touch the vectors again.

## 2. Why this matters — concrete and current
In aerospace guidance systems at NASA’s Johnson Space Center, engineers switch between Earth-centered inertial frames and body-fixed frames on spacecraft; the change of basis matrix converts velocity vectors between these frames in real time for trajectory corrections.

In computer graphics pipelines at NVIDIA, vertex shaders convert model-space coordinates to world-space, view-space, and clip-space using successive change of basis matrices; this is how a single 3-D model appears correctly on screen regardless of camera movement.

In quantum computing research at IBM Quantum, the transition between computational basis and the eigenbasis of a Hamiltonian is performed via change of basis matrices so that time-evolution operators become diagonal and therefore trivial to exponentiate.

In semiconductor device simulation at TSMC, stress tensors inside strained silicon transistors are rotated from crystal axes to device axes using 3-by-3 change of basis matrices; this directly affects predicted carrier mobility and therefore chip performance models.

In robotics at Boston Dynamics, joint-angle sensors report data in local link frames that must be transformed into a common inertial frame; the change of basis matrices are recomputed at each time step from forward kinematics.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordered basis            | Coordinates are meaningless without a fixed order of basis vectors |
| Coordinate vector \([v]_B\) | The matrix acts on these column vectors, not on abstract vectors |
| Linear independence      | Guarantees that every vector has unique coordinates in each basis |
| Matrix multiplication    | The conversion operation is exactly one matrix-vector product |
| Invertibility            | The inverse matrix performs the reverse change of basis   |

If any row above is unfamiliar, pause and review the corresponding definition before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Coordinates live relative to a basis
Coordinates of a vector are simply the weights you must give each basis vector to recover the original vector.  
Take \(\mathbb{R}^2\) with standard basis \(E = \{e_1, e_2\}\) and new basis \(B = \{b_1 = (2,1), b_2 = (1,3)\}\). The vector \(v = (5,7)\) has coordinates \([v]_E = \begin{pmatrix}5\\7\end{pmatrix}\).  
Formally, if \(B = \{b_1,\dots,b_n\}\) then \([v]_B = (c_1,\dots,c_n)^T\) satisfies \(v = c_1 b_1 + \dots + c_n b_n\).

> [!WARNING]
> Treating coordinates as intrinsic properties of the vector (instead of relative to a basis) will make every later matrix equation appear inconsistent.

### Step 2 — Express new basis vectors in the old coordinates
Write each vector of the new basis \(B\) as a linear combination of the old basis \(E\). These coefficient columns become the matrix \(P_{B\leftarrow E}\).  
In the example above, \(b_1 = 2e_1 + 1e_2\) and \(b_2 = 1e_1 + 3e_2\), so  
\[P = \begin{pmatrix}2 & 1 \\ 1 & 3\end{pmatrix}.\]

### Step 3 — The matrix multiplies old coordinates to give new coordinates
Any vector \(v = P [v]_B\) when written in the old basis. Therefore multiplying both sides on the left by \(P^{-1}\) yields the conversion formula  
\[[v]_E = P [v]_B \quad \Rightarrow \quad [v]_B = P^{-1}[v]_E.\]

### Step 4 — General bases \(B\) and \(C\)
Let \(P\) be the matrix whose columns are the \(B\)-basis vectors written in \(C\)-coordinates. Then the same algebra produces  
\[[v]_C = P [v]_B.\]  
The matrix is denoted \(P_{B\to C}\).

### Step 5 — The matrix is unique and invertible
Because both bases are ordered and linearly independent, the map sending \([v]_B\) to \([v]_C\) is a linear isomorphism; its matrix representation is therefore unique and invertible, with inverse \(P_{C\to B}\).

## 5. Worked examples — har step show karo

**Example 1 — Standard to non-standard basis in \(\mathbb{R}^2\)**
- *Given:* \(B = \{(2,1),(1,3)\}\), \(v = (5,7)\) with coordinates in standard basis \(E\).
- *Find:* \([v]_B\).
- Compute \(P = \begin{pmatrix}2&1\\1&3\end{pmatrix}\).  
  Solve \(P c = \begin{pmatrix}5\\7\end{pmatrix}\).  
  Row-reduce augmented matrix \(\begin{pmatrix}2&1&|&5\\1&3&|&7\end{pmatrix}\).  
  Swap rows: \(\begin{pmatrix}1&3&|&7\\2&1&|&5\end{pmatrix}\).  
  Subtract 2 times row 1 from row 2: \(\begin{pmatrix}1&3&|&7\\0&-5&|&-9\end{pmatrix}\).  
  Divide row 2 by −5: \(\begin{pmatrix}1&3&|&7\\0&1&|&9/5\end{pmatrix}\).  
  Subtract 3 times row 2 from row 1: \(c = \begin{pmatrix}2/5\\9/5\end{pmatrix}\).  
*Why* each step: we are simply solving the defining equation \(v = P c\).

**Final answer**  
\[[v]_B = \begin{pmatrix}2/5\\9/5\end{pmatrix}\]

*Reflection*: The numbers are fractions because \(B\) is not orthonormal; the same procedure works for any invertible \(P\).

**Example 2 — Reverse direction using the inverse**
- *Given:* Same \(P\) and same \(v\), now start from \([v]_B\).
- *Find:* \([v]_E\).
- Compute \(P^{-1} = \frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}\).  
  Multiply: \(P^{-1}\begin{pmatrix}2/5\\9/5\end{pmatrix} = \begin{pmatrix}5\\7\end{pmatrix}\).  
*Why*: inverse undoes the change, recovering original coordinates.

**Final answer**  
\[[v]_E = \begin{pmatrix}5\\7\end{pmatrix}\]

*Reflection*: Always verify \(P P^{-1} = I\) numerically before trusting further calculations.

**Example 3 — Two non-standard bases in \(\mathbb{R}^3\)**
- *Given:* \(B = \{(1,0,0),(1,1,0),(1,1,1)\}\), \(C = \{(1,1,1),(0,1,1),(0,0,1)\}\), vector whose \(B\)-coordinates are \((1,2,3)^T\).
- *Find:* \(C\)-coordinates.
- Form \(P_{B\to C}\) by writing each \(B\)-vector in \(C\)-coordinates (solve three small systems). Result:  
  \[P = \begin{pmatrix}1&0&0\\-1&1&0\\0&-1&1\end{pmatrix}.\]  
  Then \([v]_C = P\begin{pmatrix}1\\2\\3\end{pmatrix} = \begin{pmatrix}1\\1\\1\end{pmatrix}\).

**Final answer**  
\[[v]_C = \begin{pmatrix}1\\1\\1\end{pmatrix}\]

*Reflection*: The upper-triangular shape of \(P\) made arithmetic trivial; many textbook bases are deliberately chosen this way.

**Example 4 — Linear operator diagonalised by change of basis**
- *Given:* Matrix \(A = \begin{pmatrix}4&-2\\1&1\end{pmatrix}\) with eigenbasis \(B = \{ (2,1), (1,2) \}\).
- *Find:* Matrix of the same operator in the eigenbasis.
- Form \(P\) whose columns are eigenvectors: \(P = \begin{pmatrix}2&1\\1&2\end{pmatrix}\).  
  Compute \(P^{-1}AP = \begin{pmatrix}2&0\\0&3\end{pmatrix}\).  
*Why*: eigenvectors become standard basis vectors after the change, so the operator becomes diagonal.

**Final answer**  
\[\begin{pmatrix}2&0\\0&3\end{pmatrix}\]

*Reflection*: This is the essential step behind diagonalisation; every later spectral theorem rests on exactly this construction.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting that columns of \(P\) must be written in the *old* basis | Students visualise the new basis geometrically but write numbers in the new coordinates | Always solve \(b_i = \sum p_{ji} c_j\) using the coordinate definition before assembling \(P\) |
| Using row vectors instead of column vectors | Old habit from high-school notation | Consistently treat \([v]_B\) as an \(n\times 1\) matrix |
| Assuming \(P\) is orthogonal when bases are not orthonormal | Confusion with rotation matrices | Check \(P^TP = I\) only when inner-product is preserved |
| Inverting the wrong matrix (\(P\) instead of \(P^{-1}\)) | Direction of change is easy to reverse mentally | Label every matrix explicitly as \(P_{B\to C}\) before inverting |
| Applying the matrix to the wrong coordinate vector | Mixing \([v]_B\) and \([v]_C\) in the same equation | Write the basis subscript on every coordinate vector until the calculation ends |
| Treating change-of-basis matrices as transformation matrices of linear maps | Both are represented by matrices, yet they act on different objects | Keep the distinction: change-of-basis acts on coordinates; linear maps act on vectors |
| Using an unordered set as a basis | Coordinates require order | Always write bases as ordered tuples or lists |

## 7. The textbook-precise statement
Let \(V\) be an \(n\)-dimensional vector space over \(\mathbb{F}\). Let \(B = (b_1,\dots,b_n)\) and \(C = (c_1,\dots,c_n)\) be ordered bases of \(V\). Define the matrix \(P_{B\to C}\) to be the unique matrix whose \(j\)-th column is the coordinate vector \([b_j]_C\). Then for every \(v\in V\),
\[
[v]_C = P_{B\to C}[v]_B.
\]
The matrix \(P_{B\to C}\) is invertible and its inverse satisfies \(P_{C\to B} = P_{B\to C}^{-1}\). (Axler, *Linear Algebra Done Right*, 3e, §3.C, Theorem 3.58.)

## 8. Visual — diagram or schematic
```text
Old basis E          New basis B          Coordinates of v
e2 (0,1)              b2 (1,3)            [v]_E = (5,7)
 ^                     ^
 |                     |
 +-----> e1 (1,0)      +-----> b1 (2,1)   [v]_B = P^{-1}(5,7)
          P columns = coordinates of b1,b2 in E
```
The arrow labelled \(P\) shows how the two coordinate columns of \(B\) (expressed in \(E\)) become the matrix that converts any \([v]_E\) into \([v]_B\).

## 9. The memory technique
1. **The hook** — Picture two transparent sheets of graph paper lying on top of each other; the change-of-basis matrix is the single sheet of numbers that tells you how to read any dot marked on the bottom sheet using the top sheet’s grid lines.
2. **What to overlearn** — \(P\) is built from new-basis vectors written in old coordinates; \([v]_{\text{new}} = P^{-1}[v]_{\text{old}}\); \(P\) is always square and invertible.
3. **Spaced-repetition schedule** — Review the definition and one numerical example after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If the formula is forgotten, start from the definition \(v = \sum c_i b_i\) and solve the resulting linear system; the coefficient matrix is exactly \(P\).

## 10. What this unlocks
Mastery of change of basis is the gateway to diagonalisation, Jordan form, singular-value decomposition, and the spectral theorem for self-adjoint operators.

- Diagonalisation of matrices via eigenbases
- Similarity transformations and invariant subspaces
- Principal-component analysis in machine-learning pipelines
- Fourier and wavelet transforms viewed as basis changes
- Representation theory of finite groups

## 11. Self-check — five questions, no answers
1. Given two bases whose change-of-basis matrix is upper-triangular with 1’s on the diagonal, what can you conclude about the two coordinate systems?
2. Compute the change-of-basis matrix from the basis \(\{(1,1),(1,-1)\}\) to the standard basis and verify that its determinant equals the area of the parallelogram spanned by the new vectors.
3. A student obtains \(P^{-1}\) when the correct answer is \(P\). Which single conceptual reversal most likely caused the error?
4. Show that if \(B\) and \(C\) are orthonormal bases then \(P_{B\to C}\) is an orthogonal matrix.
5. In \(\mathbb{R}^3\), let \(B\) be the standard basis and \(C\) the basis obtained by rotating 30 degrees about the z-axis. Write the explicit 3-by-3 change-of-basis matrix and confirm that it preserves lengths.