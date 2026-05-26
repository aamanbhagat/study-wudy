## 1. The one-sentence answer
**LU decomposition factors a square matrix \(A\) into a lower-triangular matrix \(L\) and an upper-triangular matrix \(U\) such that \(A=LU\).**

Yeh factorisation Gaussian elimination ko ek reusable form mein store karti hai. Jab aap ek hi matrix ke saath multiple right-hand sides solve karte ho, toh har baar elimination repeat karne ki zarurat nahi padti. \(L\) aur \(U\) alag-alag store karke aap forward substitution phir back substitution chala sakte ho.

Iska core idea yeh hai ki row operations ko multipliers ke roop mein neeche record kar liya jaaye instead of unhe matrix mein hi apply karne ke. Isse decomposition ek baar ki jaati hai aur reuse hoti hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki LU actually Gaussian elimination ka by-product hai — jab aap elimination karte ho toh wohi numbers jo aap subtract karne ke liye use karte ho, woh \(L\) ke off-diagonal entries ban jaate hain.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center uses dense LU factorisations inside FUN3D CFD solver for steady-state aerodynamics of next-generation aircraft; a single 3-D mesh can produce matrices of order \(10^7\) that must be factored repeatedly during Newton-Krylov iterations.

In modern recommender systems at Netflix, the alternating-least-squares algorithm repeatedly solves millions of independent small linear systems; each system is factored once with LU and then reused for hundreds of right-hand sides per user batch.

Semiconductor TCAD tools such as Synopsys Sentaurus solve drift-diffusion equations on unstructured meshes; the resulting non-symmetric Jacobians are factored with partial-pivoted LU inside the Newton loop that converges device operating points at each bias voltage.

Inside Google’s TensorFlow linear-algebra kernels, the CPU path for `tf.linalg.solve` dispatches to OpenBLAS or MKL’s LU routines when the batch size is moderate, because the factorisation cost is amortised across the batch dimension.

Fundamental-physics lattice QCD codes (e.g., MILC collaboration) factor sparse Wilson-Dirac operators with domain-decomposition LU preconditioners; each subdomain solve uses a dense LU kernel whose stability directly controls the acceptance rate of the Monte-Carlo chain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Row echelon form         | LU is exactly the record of multipliers used to reach row echelon form.              |
| Forward & back substitution | Once \(A=LU\) is known, solving \(Ax=b\) reduces to two triangular solves.         |
| Matrix multiplication    | Verifying \(LU=A\) and understanding why the product of triangular matrices works.   |
| Partial pivoting         | Without row swaps the factorisation can be unstable or may not exist.                |

Agar aapko row echelon form ya triangular solves yaad nahi, toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Elimination leaves multipliers behind
Jab aap Gaussian elimination chalate ho, har row operation mein jo scalar aap use karte ho woh ek “multiplier” hota hai. Agar aap us multiplier ko mat bhoolo aur usko ek alag matrix mein likh do, toh woh matrix \(L\) ban jaati hai.

Example: 2×2 matrix
\[
A=\begin{pmatrix}2&1\\4&3\end{pmatrix}.
\]
Pehli row se doosri row ko 2 guna karke subtract karte hain; multiplier = 2. Agar isko \(L\) mein store karein toh
\[
L=\begin{pmatrix}1&0\\2&1\end{pmatrix},\qquad
U=\begin{pmatrix}2&1\\0&1\end{pmatrix}.
\]

Formal statement: \(A=LU\) jahaan \(L\) strictly lower-triangular part mein multipliers rakhta hai aur diagonal pe 1s, \(U\) upper-triangular result hai.

> [!WARNING]
> Agar aap multiplier ko galat sign se store karoge (plus ki jagah minus), toh \(LU\) product \(A\) ke barabar nahi aayega.

### Step 2 — Multipliers occupy the strict lower triangle
Har elimination step \(k\) ke liye, multipliers \(l_{ik}=a_{ik}^{(k)}/a_{kk}^{(k)}\) ( \(i>k\) ) ko \(L\) ke \((i,k)\) position mein daal dete hain. Yeh step automatically \(L\) ko unit lower-triangular bana deta hai.

### Step 3 — \(U\) is the final upper-triangular matrix
Jab saare elimination steps khatam ho jaayein, jo matrix bachti hai woh \(U\) hai. Isliye \(U\) ke entries original matrix ke transformed values hain.

### Step 4 — Existence without pivoting
Agar har leading principal minor nonzero hai, tabhi LU factorisation pivoting ke bina exist karti hai. Yeh condition Schur complement ke nonzero diagonal entries se linked hai.

### Step 5 — Partial pivoting for stability
Har column \(k\) mein sabse badi entry ko pivot position pe swap karo. Isse \(L\) ab permutation matrix \(P\) ke saath \(PA=LU\) ban jaata hai. Numerical stability ke liye yeh almost mandatory hai.

### Step 6 — The full statement with permutation
For any nonsingular \(A\) there exists a permutation matrix \(P\), unit lower-triangular \(L\) aur upper-triangular \(U\) such that \(PA=LU\). Yeh statement Trefethen & Bau, Lecture 20 mein rigorously proved hai.

## 5. Worked examples — har step show karo

**Example 1 — 2×2 matrix, no pivoting**  
*Given:*  
\[
A=\begin{pmatrix}2&1\\8&7\end{pmatrix}.
\]  
*Find:* \(LU\) factors.  

Pehla column: multiplier \(l_{21}=8/2=4\).  
Doosri row se 4×pe<|eos|>