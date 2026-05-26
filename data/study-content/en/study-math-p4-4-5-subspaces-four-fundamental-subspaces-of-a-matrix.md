## 1. The one-sentence answer
**The four fundamental subspaces of an \(m \times n\) matrix \(A\) are its column space \(C(A)\), row space \(C(A^T)\), nullspace \(N(A)\), and left nullspace \(N(A^T)\).**

These four subspaces partition the geometry of the linear map defined by \(A\). The column space tells you every possible output vector you can reach; the nullspace tells you every input that maps to zero. The row space and left nullspace play the symmetric roles after transposing \(A\). Their dimensions are linked by a single number—the rank of \(A\)—and two of them are always orthogonal complements of the other two.

In plain terms, once you know these four subspaces you know everything about the equation \(Ax = b\): whether solutions exist, how many there are, and how to find the smallest-norm solution. No other collection of objects attached to \(A\) gives this complete picture with so little data.

> [!NOTE]
> The rank-nullity theorem and the orthogonality relations together imply that the four subspaces are completely determined by any two of them that are not a complementary pair; the other two are forced.

## 2. Why this matters — concrete and current
In Google’s PageRank algorithm the Google matrix is a sparse stochastic matrix whose column space and nullspace determine the steady-state distribution of the random surfer; the left nullspace supplies the stationary probability vector that ranks every web page.

NASA’s Kepler telescope pipeline solves massive least-squares problems whose design matrices have column spaces that must be projected onto the orthogonal complement of the left nullspace to remove systematic instrumental drift before exoplanet signals can be detected.

Modern transformer models in large language systems compute attention scores via matrix multiplications; the row space of each attention matrix encodes the linear dependencies among token embeddings, while its nullspace identifies directions that can be pruned without changing the model’s output distribution.

In semiconductor layout extraction, the nodal admittance matrix of a circuit has a nullspace whose dimension equals the number of independent floating nodes; identifying this nullspace before simulation prevents singular-matrix errors that would otherwise halt SPICE convergence on chips with billions of transistors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector space axioms      | Subspaces are subsets closed under the same operations    |
| Linear independence      | Basis extraction from column or row spaces                |
| Span                       | Definition of column and row spaces                       |
| Matrix transpose         | Row space of \(A\) is column space of \(A^T\)             |
| Orthogonality            | Nullspace of \(A\) is orthogonal complement of row space  |

## 4. Building the idea — from intuition to formalism

### Step 1 — A subspace is a self-contained flat through the origin
Any set closed under addition and scalar multiplication stays inside itself and therefore behaves like a vector space on its own.  
Take the set of all vectors \((x,y,0)\) in \(\mathbb{R}^3\). Adding two such vectors or scaling one still yields a third vector whose third coordinate is zero, so the set never leaves the \(xy\)-plane.  
Formally, a nonempty subset \(V\subseteq\mathbb{R}^n\) is a **subspace** if  
\[
u,v\in V,\quad\alpha,\beta\in\mathbb{R}\implies\alpha u+\beta v\in V.
\]

> [!WARNING]
> Forgetting that the zero vector must belong to every subspace leads to treating lines that miss the origin as subspaces.

### Step 2 — The column space collects every reachable output
Multiply \(A\) on the right by every possible vector \(x\in\mathbb{R}^n\). The set of all results \(Ax\) is the column space.  
For  
\[
A=\begin{pmatrix}1&2\\3&4\end{pmatrix},
\]  
every linear combination of the columns \((1,3)^T\) and \((2,4)^T\) lies in \(C(A)\).  
\[
C(A)=\{Ax:x\in\mathbb{R}^n\}=\operatorname{span}\{\text{columns of }A\}.
\]

### Step 3 — The nullspace collects every input that disappears
The nullspace is the set of all vectors that \(A\) maps to zero.  
Continuing the same matrix, solve \(Ax=0\):  
\[
N(A)=\operatorname{span}\{(2,-1)^T\}.
\]  
\[
N(A)=\{x\in\mathbb{R}^n:Ax=0\}.
\]

### Step 4 — Row space and left nullspace appear after transposition
Replace \(A\) by \(A^T\). Its column space is the row space of \(A\), and its nullspace is the left nullspace of \(A\).  
\[
C(A^T)=\text{row space of }A,\qquad N(A^T)=\text{left nullspace of }A.
\]

### Step 5 — Rank-nullity fixes the dimensions
The dimension of the column space (the rank \(r\)) plus the dimension of the nullspace equals the number of columns:  
\[
\dim C(A)+\dim N(A)=n.
\]  
The same rank appears for the row space, so  
\[
\dim C(A^T)=r\qquad\text{and}\qquad\dim N(A^T)=m-r.
\]

### Step 6 — Orthogonality pairs the subspaces
Every vector in \(N(A)\) is orthogonal to every vector in \(C(A^T)\), and every vector in \(N(A^T)\) is orthogonal to every vector in \(C(A)\). These two pairs are complementary orthogonal decompositions of \(\mathbb{R}^n\) and \(\mathbb{R}^m\) respectively.

### Step 7 — The four subspaces are therefore exhaustive
Taken together, the two orthogonal decompositions  
\[
\mathbb{R}^n=C(A^T)\oplus N(A),\qquad\mathbb{R}^m=C(A)\oplus N(A^T)
\]  
contain every vector that can interact with \(A\).

## 5. Worked examples — every step shown

**Example 1 — Tiny matrix, all four subspaces**  
*Given:*  
\[
A=\begin{pmatrix}1&2\\3&6\end{pmatrix}.
\]  
*Find:* the four fundamental subspaces and their dimensions.  

The columns are multiples, so  
\[
C(A)=\operatorname{span}\{(1,3)^T\},\qquad\dim C(A)=1.
\]  
*Why:* second column equals twice the first.  

Solve \(Ax=0\):  
\[
x_1+2x_2=0\implies N(A)=\operatorname{span}\{(2,-1)^T\},\qquad\dim N(A)=1.
\]  
*Why:* rank-nullity gives \(1+1=2\).  

Row space:  
\[
C(A^T)=\operatorname{span}\{(1,3)^T\},\qquad\dim=1.
\]  
Left nullspace:  
\[
N(A^T)=\operatorname{span}\{(-3,1)^T\},\qquad\dim=1.
\]  
**Final answer**  
\[
C(A)=\operatorname{span}\{(1,3)^T\},\ 
N(A)=\operatorname{span}\{(2,-1)^T\},\ 
C(A^T)=\operatorname{span}\{(1,3)^T\},\ 
N(A^T)=\operatorname{span}\{(-3,1)^T\}.
\]

*Reflection:* The column and row spaces coincide numerically because the matrix is rank-1; the orthogonality \((2,-1)\cdot(1,3)=0\) is immediate.

**Example 2 — Full column rank**  
*Given:* \(A=\begin{pmatrix}1&0\\0&1\\0&0\end{pmatrix}\).  
*Find:* dimensions.  

\(C(A)=\mathbb{R}^2\) inside \(\mathbb{R}^3\), rank 2.  
\(N(A)=\{0\}\), dimension 0.  
\(C(A^T)=\mathbb{R}^2\), \(N(A^T)=\operatorname{span}\{(0,0,1)^T\}\).  
**Final answer**  
Dimensions: 2, 0, 2, 1.

*Reflection:* When columns are independent the nullspace collapses to zero, forcing the left nullspace dimension to be \(m-r\).

**Example 3 — Inconsistent system via left nullspace**  
*Given:* \(A=\begin{pmatrix}1&2\\3&4\\5&6\end{pmatrix}\), \(b=(1,1,2)^T\).  
*Find:* whether \(b\in C(A)\).  

Row-reduce \(A^T\): left null vector \(y=(-1,2,-1)^T\) satisfies \(y^TA=0\) but \(y^Tb=-1\neq0\).  
**Final answer**  
\(b\notin C(A)\).

*Reflection:* The left nullspace test is decisive even before computing the rank.

**Example 4 — Orthogonal decomposition**  
*Given:* the same \(A\) as Example 1 and vector \(v=(3,1)^T\in\mathbb{R}^2\).  
*Find:* projection onto \(C(A)\) and component in \(N(A^T)\).  

\(C(A)=\operatorname{span}\{(1,3)^T\}\).  
Projection:  
\[
\operatorname{proj}=\frac{v\cdot(1,3)}{(1,3)\cdot(1,3)}(1,3)^T=\frac{6}{10}(1,3)^T.
\]  
Remainder lies in \(N(A^T)\).  
**Final answer**  
\[
\frac{3}{5}(1,3)^T+(9/5,-8/5)^T.
\]

*Reflection:* The decomposition realises the direct sum \(\mathbb{R}^2=C(A)\oplus N(A^T)\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing \(N(A)\) with \(N(A^T)\) | Both are called “nullspaces” | Always attach the matrix or its transpose explicitly |
| Thinking row space lives in \(\mathbb{R}^m\) | Rows have length \(n\) | Remember rows are vectors in the domain \(\mathbb{R}^n\) |
| Assuming rank equals number of pivots after forgetting to transpose | Row reduction on \(A\) gives column rank only | Compute rank of \(A^T\) or count nonzero rows after reduction |
| Believing every matrix has trivial left nullspace | Square invertible case is over-generalised | Check \(m>r\); left nullity is \(m-r\) |
| Treating the zero subspace as having no basis | Empty set is not a basis | Adopt the convention that \(\dim\{0\}=0\) with empty basis |
| Forgetting that orthogonality is with respect to the standard dot product | Other inner products appear later | Verify \(y^TA=0\) implies \(y\perp\) every column of \(A^T\) |
| Mixing column space of \(A\) with column space of \(A^T\) | Notation \(C(A)\) versus \(C(A^T)\) looks similar | Draw the two ambient spaces \(\mathbb{R}^m\) and \(\mathbb{R}^n\) side by side |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{m\times n}\) have rank \(r\). The four fundamental subspaces are  
\[
C(A)=\operatorname{range}(A)\subseteq\mathbb{R}^m,\quad
N(A)=\ker(A)\subseteq\mathbb{R}^n,\quad
C(A^T)=\operatorname{range}(A^T)\subseteq\mathbb{R}^n,\quad
N(A^T)=\ker(A^T)\subseteq\mathbb{R}^m.
\]  
They satisfy the orthogonal direct-sum decompositions  
\[
\mathbb{R}^n=C(A^T)\oplus N(A),\qquad\mathbb{R}^m=C(A)\oplus N(A^T)
\]  
and the dimension relations  
\[
\dim C(A)=\dim C(A^T)=r,\qquad\dim N(A)=n-r,\qquad\dim N(A^T)=m-r.
\]  
(See Strang, *Linear Algebra and Its Applications*, 4e, §3.6.)

## 8. Visual — diagram or schematic
```text
R^n ------------------> R^m
 |                       |
 |  C(A^T)               |  C(A)
 |  (row space)          |  (col space)
 |                       |
 v                       v
N(A)                N(A^T)
(nullspace)         (left nullspace)

Horizontal arrows: action of A
Vertical arrows: orthogonal complements
Dimensions: dim C(A) = r, dim N(A) = n-r, etc.
```

## 9. The memory technique
**The hook**  
Picture a rectangular window: light comes in through the columns (column space) and exits through the rows (row space); whatever light is absorbed is the nullspace, and whatever is reflected back is the left nullspace.

**What to overlearn**  
- Rank-nullity: \(\dim C(A)+\dim N(A)=n\)  
- Orthogonality: \(N(A)\perp C(A^T)\) and \(N(A^T)\perp C(A)\)  
- Dimension quartet: \(r\), \(n-r\), \(r\), \(m-r\)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the definitions \(Ax=0\) and \(y^TA=0\), compute bases by row reduction, then verify the four orthogonality inner products and the two dimension equations.

## 10. What this unlocks
Mastery of the four subspaces lets you move immediately to the fundamental theorem of linear algebra, the singular-value decomposition, the Moore-Penrose pseudoinverse, and the geometry of least-squares.  

- QR factorisation and orthogonal projections  
- SVD and principal-component analysis  
- Condition numbers and numerical rank  
- Graph Laplacians and spectral clustering  
- Control theory controllability and observability subspaces

## 11. Self-check — five questions, no answers
1. For a \(5\times 3\) matrix of rank 2, list the four dimensions without computing any entries.  
2. Construct a concrete \(3\times 3\) matrix whose left nullspace is one-dimensional and whose row space is the plane \(x+y+z=0\).  
3. Prove that if \(N(A)=\{0\}\) then \(C(A^T)=\mathbb{R}^n\).  
4. Given \(A\) whose columns are \((1,0,0)^T\) and \((0,1,0)^T\), find a vector in \(N(A^T)\) that is not in \(N(A)\).  
5. Show that the orthogonal complement of \(C(A)\) inside \(\mathbb{R}^m\) is exactly \(N(A^T)\).