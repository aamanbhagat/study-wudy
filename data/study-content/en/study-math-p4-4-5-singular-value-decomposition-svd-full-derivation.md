## 1. The one-sentence answer
**Singular Value Decomposition states that every real matrix \(A\) factors as \(A = U\Sigma V^T\), where \(U\) and \(V\) are orthogonal and \(\Sigma\) is diagonal with non-negative entries.**

Any matrix maps the unit sphere to an ellipsoid; the SVD isolates the directions of stretching and the amounts of stretch. The columns of \(V\) are the input directions that remain orthogonal after the map, the diagonal entries of \(\Sigma\) are the stretch factors, and the columns of \(U\) are the resulting output directions. The construction works even when \(A\) is rectangular or rank-deficient because the orthogonal matrices absorb the mismatch in dimensions and the zero singular values mark the kernel.

The same factorization simultaneously diagonalizes the two symmetric matrices \(A^TA\) and \(AA^T\), converting a non-symmetric rectangular problem into two symmetric eigenvalue problems that are already solved by the spectral theorem.

> [!NOTE]
> The singular values are the square roots of the eigenvalues of \(A^TA\) (or \(AA^T\)); once those eigenvalues and eigenvectors are known, \(U\) is obtained by a single matrix–vector scaling, never by a second independent diagonalization.

## 2. Why this matters — concrete and current
In the Netflix Prize competition, matrix completion via truncated SVD produced the winning entries that predicted user ratings from a sparse 480 000-by-18 000 matrix; the same low-rank SVD step is now the core of every production recommender system at Spotify and YouTube.

NASA’s Kepler mission pipeline removes stellar variability from light curves by projecting the time-series matrix onto its top 50 right singular vectors, a step that reduced false-positive planet detections by more than 30 % in the final data release.

Modern semiconductor lithography simulators at ASML solve Maxwell’s equations on 10 000-by-10 000 scattering matrices; the SVD supplies the dominant modes that are retained in model-order reduction, cutting simulation time from days to minutes while preserving sub-nanometer accuracy.

In cryo-electron microscopy, the RELION software package assembles three-dimensional density maps from millions of two-dimensional particle images by computing the SVD of the covariance matrix of the aligned images; the leading singular vectors become the principal components used for classification.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Eigenvalues and eigenvectors of symmetric matrices | \(A^TA\) is symmetric; its spectral theorem supplies the orthogonal matrix \(V\) and the squared singular values. |
| Orthogonal matrices and the fact that \(Q^TQ=I\) | Both \(U\) and \(V\) must preserve lengths and angles; the relation \(U^TU=I\) converts the factorization into an eigenvalue equation. |
| Positive-semidefinite quadratic forms | Guarantees that eigenvalues of \(A^TA\) are non-negative, so singular values are real. |
| Rank-nullity and column space dimension | Determines how many zero singular values appear and how the dimensions of \(U\) and \(V\) relate to the rank. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The image of the unit sphere is an ellipsoid
Any linear map \(A:\mathbb{R}^n\to\mathbb{R}^m\) sends the unit sphere to an ellipsoid (possibly degenerate). The SVD isolates the principal axes of that ellipsoid.

### Step 2 — Form the symmetric matrix \(A^TA\)
The squared lengths \(\|Ax\|^2=x^TA^TAx\) are governed by the symmetric positive-semidefinite matrix \(A^TA\). Its eigenvalues are therefore real and non-negative.

### Step 3 — Spectral theorem on \(A^TA\)
Let \(A^TA=V\Lambda V^T\) where \(V\) is orthogonal and \(\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)\) with \(\lambda_i\ge0\). Define \(\sigma_i=\sqrt{\lambda_i}\). The columns of \(V\) are the desired right singular vectors.

### Step 4 — Recover the left singular vectors
For each \(\sigma_i>0\) set \(u_i=A v_i/\sigma_i\). The resulting vectors are orthonormal because
\[
u_i^Tu_j=\frac{v_i^TA^TAv_j}{\sigma_i\sigma_j}=\frac{\lambda_j}{\sigma_i\sigma_j}\delta_{ij}=\delta_{ij}.
\]
Extend the set \(\{u_i\}\) to a full orthonormal basis of \(\mathbb{R}^m\) if \(m>n\) or if some \(\sigma_i=0\).

### Step 5 — Assemble the diagonal factor
Place the numbers \(\sigma_1\ge\sigma_2\ge\dots\ge\sigma_r>0\) on the main diagonal of an \(m\times n\) matrix \(\Sigma\) and fill the rest with zeros. Then \(AV=U\Sigma\) holds by construction, which rearranges to the SVD \(A=U\Sigma V^T\).

### Step 6 — Uniqueness of singular values
The singular values are uniquely determined as the square roots of the eigenvalues of \(A^TA\) ordered decreasingly; the orthogonal matrices \(U\) and \(V\) are unique up to sign choices in degenerate subspaces.

> [!WARNING]
> If any \(\sigma_i\) is set to a negative number, the product \(U\Sigma V^T\) will have incorrect singular values; the spectral theorem forces non-negativity, so the sign must be absorbed into the corresponding column of \(U\) or \(V\).

## 5. Worked examples — every step shown

**Example 1 — 2-by-2 full-rank matrix**  
*Given:*  
\[
A=\begin{pmatrix}3&0\\0&1\end{pmatrix}.
\]  
*Find:* SVD.  

Compute \(A^TA=\operatorname{diag}(9,1)\). Eigenvalues \(\lambda_1=9\), \(\lambda_2=1\), so \(\sigma_1=3\), \(\sigma_2=1\).  
Eigenvectors of \(A^TA\) are already the standard basis: \(V=I\).  
Then \(u_1=Av_1/3=(1,0)^T\) and \(u_2=Av_2/1=(0,1)^T\), hence \(U=I\).  
Thus  
\[
A=U\Sigma V^T=\begin{pmatrix}3&0\\0&1\end{pmatrix}.
\]  
**Final answer**  
\[
U=I,\quad\Sigma=\operatorname{diag}(3,1),\quad V=I.
\]  
*Reflection:* The matrix was already diagonal; SVD recovered the absolute values on the diagonal and absorbed signs into the orthogonal factors.

**Example 2 — Non-square matrix**  
*Given:*  
\[
A=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix}\in\mathbb{R}^{3\times2}.
\]  
*Find:* SVD.  

\(A^TA=\operatorname{diag}(1,4)\). Eigenvalues 4 and 1 give \(\sigma_1=2\), \(\sigma_2=1\).  
\(V=I_2\).  
\(u_1=Av_1/2=(0,1,0)^T\), \(u_2=Av_2/1=(1,0,0)^T\). Extend by \(u_3=(0,0,1)^T\).  
\[
\Sigma=\begin{pmatrix}2&0\\0&1\\0&0\end{pmatrix}.
\]  
**Final answer**  
\[
U=\begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix},\quad\Sigma=\begin{pmatrix}2&0\\0&1\\0&0\end{pmatrix},\quad V=I_2.
\]

**Example 3 — Rank-deficient square matrix**  
*Given:*  
\[
A=\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]  
*Find:* SVD.  

\(A^TA=\begin{pmatrix}2&2\\2&2\end{pmatrix}\). Eigenvalues: 4 and 0.  
\(\sigma_1=2\), \(\sigma_2=0\).  
Normalized eigenvector for 4: \(v_1=(1/\sqrt{2},1/\sqrt{2})^T\); for 0: \(v_2=(1/\sqrt{2},-1/\sqrt{2})^T\).  
\(u_1=Av_1/2=(1/\sqrt{2},1/\sqrt{2})^T\). The second singular value is zero, so no second column of \(U\) is generated from \(A\). Extend arbitrarily.  
**Final answer**  
\[
U=\begin{pmatrix}1/\sqrt{2}&-1/\sqrt{2}\\1/\sqrt{2}&1/\sqrt{2}\end{pmatrix},\quad\Sigma=\operatorname{diag}(2,0),\quad V=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
\]

**Example 4 — General 2-by-3 matrix**  
*Given:*  
\[
A=\begin{pmatrix}1&2&3\\0&1&1\end{pmatrix}.
\]  
*Find:* SVD (numerical values rounded to three decimals).  

\(A^TA=\begin{pmatrix}1&2&3\\2&5&7\\3&7&10\end{pmatrix}\).  
Characteristic polynomial yields eigenvalues 15.309, 0.691, 0.  
\(\sigma_1\approx3.913\), \(\sigma_2\approx0.831\), \(\sigma_3=0\).  
Corresponding normalized eigenvectors give the columns of \(V\). Scaling \(Av_i/\sigma_i\) produces the first two columns of \(U\in\mathbb{R}^{2\times2}\).  
**Final answer** (rounded)  
\[
U\approx\begin{pmatrix}-0.426&-0.905\\-0.905&0.426\end{pmatrix},\quad
\Sigma\approx\begin{pmatrix}3.913&0&0\\0&0.831&0\end{pmatrix},\quad
V\approx\begin{pmatrix}-0.109&-0.800&-0.591\\-0.494&-0.450&0.743\\-0.862&0.398&-0.312\end{pmatrix}.
\]

*Reflection:* The zero singular value signals that the three columns lie in a two-dimensional subspace; the SVD automatically detects the column rank.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Taking square roots of negative eigenvalues | Forgetting that \(A^TA\) is only guaranteed positive-semidefinite, not that its eigenvalues have already been verified non-negative. | Compute the characteristic polynomial and confirm all roots are non-negative before taking square roots. |
| Using the same eigenvectors for \(U\) and \(V\) | Confusing the two different eigenproblems \(A^TA\) and \(AA^T\). | Always compute \(u_i=Av_i/\sigma_i\) separately; never copy columns of \(V\). |
| Ordering singular values ascending | Habit from eigenvalue routines that sometimes return ascending order. | Explicitly sort \(\sigma_i\) in decreasing order after extraction. |
| Forgetting to extend \(U\) when \(m>n\) | Assuming \(\Sigma\) is square. | Count the difference \(m-n\) and append an orthonormal basis of the orthogonal complement. |
| Sign ambiguity in singular vectors | Both \(+v_i\) and \(-v_i\) are valid eigenvectors. | Choose the sign so that the first nonzero entry of each singular vector is positive; keep the choice consistent across \(U\) and \(V\). |
| Treating zero singular values as producing nonzero \(u_i\) | Division by \(\sigma_i=0\). | Skip the scaling step when \(\sigma_i=0\); the corresponding right singular vector spans the kernel. |
| Numerical loss of orthogonality | Floating-point accumulation when \(A\) is ill-conditioned. | Re-orthogonalize the computed \(U\) and \(V\) via QR or Gram–Schmidt after the basic construction. |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{m\times n}\). There exist orthogonal matrices \(U\in\mathbb{R}^{m\times m}\) and \(V\in\mathbb{R}^{n\times n}\) and a diagonal matrix \(\Sigma\in\mathbb{R}^{m\times n}\) whose diagonal entries satisfy \(\sigma_1\ge\sigma_2\ge\dots\ge\sigma_r\ge0\) (with \(r=\min(m,n)\)) such that
\[
A=U\Sigma V^T.
\]
The numbers \(\sigma_i\) are called the singular values of \(A\). This is Theorem 2.5.1 in Golub & Van Loan, *Matrix Computations*, 4th ed.

## 8. Visual — diagram or schematic
```text
          v1       v2
           \       /
            \     /
             \   /
   unit -----> ellipsoid
   circle     (axes σ1, σ2)
             /   \
            /     \
           /       \
          u1       u2
```
The unit circle in the domain (spanned by right singular vectors \(v_i\)) is mapped by \(A\) to an ellipse whose semi-axes lie along the left singular vectors \(u_i\) and have lengths exactly the singular values \(\sigma_i\).

## 9. The memory technique

1. **The hook** — Picture a sphere being stretched into an ellipsoid by a rubber sheet; the SVD labels the three perpendicular stretch directions and the three stretch amounts.  
2. **What to overlearn** — \(\sigma_i=\sqrt{\lambda_i(A^TA)}\), \(AV=U\Sigma\), and the ordering \(\sigma_1\ge\sigma_2\ge\dots\).  
3. **Spaced-repetition schedule** — Review the definition and the construction of \(U\) at 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Start from the quadratic form \(x^TA^TAx\), invoke the spectral theorem, then rescale the images \(Av_i\).

## 10. What this unlocks
SVD supplies the optimal low-rank approximation (Eckart–Young–Mirsky theorem), the Moore–Penrose pseudoinverse, the numerical rank, and the condition number. It is the engine behind principal component analysis, latent semantic analysis, total least squares, and the computation of the matrix exponential via the Schur decomposition. Subsequent topics that rest directly on it include the CS decomposition, the generalized SVD, and randomized numerical linear algebra.

## 11. Self-check — five questions, no answers
1. Compute the SVD of the matrix \(\begin{pmatrix}0&1\\0&0\end{pmatrix}\) by hand and verify that the product \(U\Sigma V^T\) recovers \(A\).  
2. Prove that the number of positive singular values equals the rank of \(A\).  
3. Show that \(\|A\|_2=\sigma_1\) and \(\|A\|_F^2=\sum\sigma_i^2\).  
4. If \(A\) is symmetric, how are its singular values related to its eigenvalues? Construct a counter-example where they differ.  
5. Suppose two different SVDs \(A=U_1\Sigma V_1^T=U_2\Sigma V_2^T\) exist; characterize the freedom in the choice of \(U_i\) and \(V_i\) when a singular value has multiplicity greater than one.