## 1. The one-sentence answer
**Change of basis** lets you rewrite the coordinates of any vector when you switch from one basis of the vector space to another via an invertible linear transformation called the change-of-basis matrix.

Aap already jaante hain ki ek vector space mein ek fixed basis choose karne ke baad har vector ko numbers ki list (coordinates) mein likh sakte hain. Jab aap basis badalte hain, toh woh numbers bhi badal jaate hain, lekin vector khud same rehta hai. Iska matlab yeh hai ki coordinates sirf representation hain, aur change-of-basis matrix aapko purani representation se nayi representation mein le jaati hai bina vector ko chhue.

Aapko yeh samajhna zaroori hai kyunki almost har advanced linear-algebra tool (eigenvectors, diagonalisation, SVD, least-squares) ek suitable basis choose karne par depend karta hai. Jab aap basis change karte hain, matrix representation bhi change hoti hai, lekin uska intrinsic behaviour (trace, determinant, eigenvalues) same rehta hai.

> [!NOTE]
> The single most important “aha” moment is this: the change-of-basis matrix P satisfies [v]_new = P^{-1}[v]_old. P itself is built simply by writing the old basis vectors in the new coordinates; once you have P, every coordinate conversion becomes one matrix multiplication and one inversion.

## 2. Why this matters — concrete and current
In aerospace navigation, the same position vector of a satellite is expressed in the Earth-centred inertial frame for orbital mechanics and in the body-fixed frame for attitude control; SpaceX’s guidance software switches between these two bases thousands of times per second using exactly the change-of-basis matrix.

In modern computer graphics, every vertex of a 3-D model is stored once in object space; when the model is placed in a scene, the GPU multiplies its coordinate vector by the model-to-world change-of-basis matrix before lighting calculations begin.

In quantum information, a qubit state vector written in the computational basis {|0\rangle, |1\rangle} must be rewritten in the Hadamard basis when a quantum circuit applies H gates; the 2-by-2 Hadamard matrix is literally the change-of-basis matrix between these two orthonormal bases.

Semiconductor device physicists rotate the coordinate system of the crystal lattice to align with the principal axes of the effective-mass tensor; the resulting diagonal matrix of eigenvalues is obtained only after the proper change-of-basis transformation.

Machine-learning libraries such as PyTorch and JAX keep tensors in the default “feature” basis; when researchers switch to a principal-component basis for dimensionality reduction, they explicitly compute and cache the change-of-basis matrix so that every forward pass remains a cheap matrix-vector product.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Basis of a vector space  | You must know what a basis is before you can change from one to another.             |
| Coordinates with respect to a basis | The entire topic is about how these numbers transform.                               |
| Invertible matrix        | The change-of-basis matrix is always invertible; its inverse performs the reverse conversion. |
| Matrix multiplication    | Coordinate conversion is performed by multiplying the old coordinate vector by P^{-1}. |

If any of these four items feels shaky, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Two different “rulers” for the same arrow
Plain Hinglish claim: Ek hi vector ko do alag bases mein alag numbers se likha ja sakta hai; dono lists sirf alag “rulers” hain.

Concrete example: Consider R^2 with the standard basis E = {e1, e2} and the new basis B = {(1,1), (1,−1)}. The vector v = (2,0) has coordinates [v]_E = (2,0). In basis B the same v is written as (1,1), so [v]_B = (1,1).

Formal statement: Let V be a vector space, let E and B be two ordered bases. Then there exists a unique invertible matrix P (the change-of-basis matrix from E to B) such that for every v,
$$[v]_B = P^{-1}[v]_E.$$

> [!WARNING]
> If you forget that the inverse appears on the right-hand side, every later calculation will be off by a factor of P versus P^{-1}.

### Step 2 — Building the change-of-basis matrix P
Plain Hinglish claim: P ke columns mein aap purani basis ke vectors ko nayi basis ke coordinates mein likh dete hain.

Concrete example: Using the same bases above, e1 = ½(1,1) + ½(1,−1), therefore the first column of P is (½,½). Similarly the second column is (½,−½). Hence
$$P = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix}.$$

Formal statement: If E = {e1,…,en} and B = {b1,…,bn}, then the j-th column of P is [ej]_B.

> [!WARNING]
> Students often place the new basis vectors in the columns instead of the old ones; the resulting matrix is actually P^{-1}.

### Step 3 — Converting coordinates in either direction
Plain Hinglish claim: Ek baar P mil jaaye to [v]_B = P^{-1}[v]_E aur [v]_E = P[v]_B dono formulas turant available ho jaate hain.

Formal statement: Because P is invertible, the two conversion formulas are
$$[v]_B = P^{-1}[v]_E, \qquad [v]_E = P[v]_B.$$

### Step 4 — Matrix of a linear operator changes as well
Plain Hinglish claim: Jab aap basis change karte hain, toh kisi linear map T ka matrix bhi badal jaata hai; naya matrix P^{-1}AP hota hai.

Formal statement: Let A be the matrix of T with respect to E. Then the matrix of T with respect to B is
$$[T]_B = P^{-1} A P.$$

### Step 5 — Similarity and invariants
Plain Hinglish claim: P^{-1}AP ko A ke similar matrix kehte hain; isliye trace, determinant, eigenvalues jaise quantities dono matrices mein same rehte hain.

Formal statement: Similar matrices represent the same linear operator in different bases; therefore they share the same characteristic polynomial, minimal polynomial, trace, determinant and eigenvalues.

## 5. Worked examples — har step show karo

**Example 1 — Simple 2-D conversion**
*Given:* Bases E = {e1,e2}, B = {(1,1),(−1,1)} and vector v whose E-coordinates are (3,1).
*Find:* [v]_B.
Step 1: Form P whose columns are E-vectors written in B-coordinates:
$$P = \begin{pmatrix} 1/2 & -1/2 \\ 1/2 & 1/2 \end{pmatrix}.$$
*Why:* Each column is obtained by solving the linear combination that yields e_j.
Step 2: Compute P^{-1} = \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix}.
*Why:* Direct 2-by-2 inversion formula.
Step 3: [v]_B = P^{-1}(3,1)^T = (4,−2)^T.
**Final answer**
(4,−2)

*Reflection:* The numbers changed, yet v itself stayed fixed; the example shows that only the coordinate list is basis-dependent.

**Example 2 — Recovering old coordinates**
*Given:* Same P as above and [v]_B = (1,3).
*Find:* [v]_E.
[v]_E = P(1,3)^T = ( −1,2 )^T.
**Final answer**
(−1,2)

*Reflection:* Using P instead of P^{-1} reverses the direction correctly.

**Example 3 — Operator matrix under change of basis**
*Given:* T(x,y) = (x+y,y) with matrix A = [[1,1],[0,1]] w.r.t. E. Use the same P.
*Find:* [T]_B.
[T]_B = P^{-1}AP = [[2,0],[−1,0]].
**Final answer**
[[2,0],[−1,0]]

*Reflection:* Eigenvalues remain 1 and 1, confirming similarity invariance.

**Example 4 — Three-dimensional case**
*Given:* Standard basis E and new basis B = {(1,1,0),(1,0,1),(0,1,1)} in R^3; v = (1,2,3)_E.
*Find:* [v]_B.
P = [[1/2,1/2,0],[1/2,0,1/2],[0,1/2,1/2]], P^{-1} = [[1,1,−1],[1,−1,1],[−1,1,1]].
[v]_B = P^{-1}(1,2,3)^T = (−4,6,2)^T.
**Final answer**
(−4,6,2)

*Reflection:* The same three-step recipe scales without change to any finite dimension.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Placing new basis vectors in columns of P | Confusion between “from” and “to” bases | Always write the *old* basis vectors expressed in the *new* coordinates. |
| Forgetting the inverse when going from E to B | Memorising the formula backwards | Write both formulas side-by-side on your cheat sheet: [v]_B = P^{-1}[v]_E. |
| Computing P but never checking P^{-1}P = I | Arithmetic error in inversion | Multiply P by the computed inverse before using it. |
| Assuming the change-of-basis matrix is orthogonal | Over-generalising from orthonormal bases | Remember P is merely invertible; only orthonormal changes give P^T P = I. |
| Mixing row and column vectors | Notation inconsistency | Decide once: coordinates are always column vectors. |
| Forgetting that [T]_B = P^{-1}AP (not PAP^{-1}) | Reversing the conjugation order | Derive the relation once from T(v) expressed in both bases. |
| Treating coordinates as intrinsic properties of the vector | Deep conceptual mix-up | Repeat aloud: “coordinates are not the vector.” |

## 7. The textbook-precise statement
Let V be a finite-dimensional vector space over F, let β = {v1,…,vn} and γ = {w1,…,wn} be ordered bases of V, and let P be the matrix whose j-th column is [vj]_γ. Then P is invertible and, for every v ∈ V,
$$[v]_γ = P^{-1}[v]_β.$$
Moreover, if T ∈ L(V) and A = [T]_β, then [T]_γ = P^{-1}AP. (Axler, *Linear Algebra Done Right*, 3e, §3.B, Theorem 3.60 and Corollary 3.61.)

## 8. Visual — diagram or schematic
```
          e2
           ^
           |     v = 3e1 + 1e2
           |    *
           |   /  
           |  /   
    e1 ----+-------->
           |
    b2 = (1,-1)   b1 = (1,1)
```
The diagram shows the standard basis vectors e1, e2 and the new basis vectors b1, b2. The same arrow v is drawn once; its length and direction never change, only the numbers that describe it relative to each pair of axes.

## 9. The memory technique
1. **The hook** — Imagine two different transparent rulers lying on the same table; the arrow (vector) stays still while you slide one ruler away and put the other in its place; the numbers you read change, but the arrow does not.
2. **What to overlearn** — The single formula [v]_new = P^{-1}[v]_old together with the sentence “columns of P are the old basis vectors written in the new coordinates.”
3. **Spaced-repetition schedule** — Review the formula and the ruler image after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If you forget the formula, start from the definition: express each old basis vector as a linear combination of the new ones; the coefficient matrix is P; invert it to obtain the coordinate conversion.

## 10. What this unlocks
Mastering change of basis lets you move freely among matrix representations of the same linear operator, which is the gateway to diagonalisation, Jordan form, singular-value decomposition and the spectral theorem.

- Diagonalisation of matrices
- Jordan canonical form
- Orthogonal diagonalisation for symmetric operators
- Principal-component analysis in data science
- Normal modes in classical mechanics
- Representation theory of finite groups

## 11. Self-check — five questions, no answers
1. Given bases E and B in R^2 and vector v with [v]_E = (4,−1), compute [v]_B when P (E-to-B) equals [[2,1],[1,1]].
2. Show that if B is obtained from E by an orthogonal change, then P^{-1} = P^T.
3. A linear operator T has matrix A w.r.t. E. Write the matrix of T w.r.t. B in terms of A and P.
4. Explain why trace(A) equals trace(P^{-1}AP) without computing any matrix product.
5. Construct a concrete 3-by-3 example where the change-of-basis matrix P is not orthogonal and verify that eigenvalues remain unchanged.