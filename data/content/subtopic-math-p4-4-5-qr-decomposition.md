## What it is
The QR decomposition, or factorization, of a matrix $A$ is its representation as a product of two other matrices: $A = QR$. Here, $Q$ is an orthogonal matrix (its columns are orthonormal vectors, meaning they are mutually perpendicular and have a length of 1), and $R$ is an upper triangular matrix.

## Why it matters
QR decomposition is a workhorse of numerical linear algebra, prized for its numerical stability. It is the core of the QR algorithm, one of the most effective methods for calculating the eigenvalues and eigenvectors of a matrix, which is fundamental in physics for finding principal axes of rotation or solving Schrödinger's equation. In machine learning and statistics, it's used to solve linear least squares problems, which underpin all forms of linear regression.

## When to study it
You must be fluent with the following concepts before tackling this. If not, master them first.
*   **Vector dot products:** specifically, the geometric interpretation of projection ($ \text{proj}_{\mathbf{v}}(\mathbf{u}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{v}\|^2}\mathbf{v} $).
*   **Linear independence** and the concept of a **basis**.
*   **The Gram-Schmidt process:** This is the constructive algorithm that QR decomposition is built upon. You must understand how to take a set of linearly independent vectors and generate an orthonormal basis from them.
*   **Properties of matrices:** Orthogonal matrices ($Q^TQ = I$) and upper triangular matrices (all entries below the main diagonal are zero).

## How to study it (step by step)
1.  **Re-derive Gram-Schmidt.** Start with three linearly independent vectors $\mathbf{a}_1, \mathbf{a}_2, \mathbf{a}_3$ in $\mathbb{R}^3$. Manually apply the Gram-Schmidt process to produce an orthonormal set $\mathbf{q}_1, \mathbf{q}_2, \mathbf{q}_3$. Do not skip the normalization step.
2.  **Express the old basis in terms of the new.** Rearrange the Gram-Schmidt equations. For example, the first step is $\mathbf{q}_1 = \frac{\mathbf{a}_1}{\|\mathbf{a}_1\|}$. This means $\mathbf{a}_1 = \|\mathbf{a}_1\| \mathbf{q}_1$. The second step is $\mathbf{u}_2 = \mathbf{a}_2 - (\mathbf{a}_2 \cdot \mathbf{q}_1)\mathbf{q}_1$, which leads to $\mathbf{a}_2 = (\mathbf{a}_2 \cdot \mathbf{q}_1)\mathbf{q}_1 + \|\mathbf{u}_2\|\mathbf{q}_2$. Notice how each $\mathbf{a}_k$ is a linear combination of only $\mathbf{q}_1, \dots, \mathbf{q}_k$.
3.  **Write this relationship in matrix form.** Let $A$ be the matrix whose columns are $[\mathbf{a}_1 | \mathbf{a}_2 | \mathbf{a}_3]$ and $Q$ be the matrix whose columns are $[\mathbf{q}_1 | \mathbf{q}_2 | \mathbf{q}_3]$. The relationships from the previous step define a matrix $R$ such that $A=QR$. Deduce that $R$ must be upper triangular.
4.  **Discover the shortcut for R.** Start with $A=QR$. Left-multiply by $Q^T$. Since $Q$ is orthogonal, $Q^TQ=I$. This gives the simple and powerful result $R = Q^TA$. This is how $R$ is computed in practice.
5.  **Solve a system of equations.** Take a system $A\mathbf{x} = \mathbf{b}$. Substitute $A=QR$ to get $QR\mathbf{x} = \mathbf{b}$. Left-multiply by $Q^T$ to get $R\mathbf{x} = Q^T\mathbf{b}$. Since $R$ is upper triangular, this system is trivial to solve using back substitution without computing a matrix inverse. Work through a $2 \times 2$ example.

## Key ideas, with intuition
1.  **Orthogonalization as "straightening" a basis.** Think of the columns of $A$ as a basis for some vector space. This basis might be "skewed"—the vectors are not perpendicular. The Gram-Schmidt process, and thus QR decomposition, takes this skewed basis and produces a perfectly "straightened" orthonormal basis, whose vectors form the columns of $Q$.
    $$
    A = [\mathbf{a}_1 | \mathbf{a}_2 | \dots | \mathbf{a}_n] \quad \xrightarrow{\text{Gram-Schmidt}} \quad Q = [\mathbf{q}_1 | \mathbf{q}_2 | \dots | \mathbf{q}_n]
    $$
2.  **$R$ records the recipe for reconstruction.** The matrix $R$ is the "recipe" that tells you how to get the original skewed vectors ($\mathbf{a}_j$) back from the new, straight ones ($\mathbf{q}_i$). The equation $\mathbf{a}_j = \sum_{i=1}^{j} r_{ij} \mathbf{q}_i$ shows that the $j$-th column of $A$ is a combination of the first $j$ columns of $Q$. This dependency structure is precisely why $R$ is upper triangular.
    $$
    \begin{pmatrix} | & | & & | \\ \mathbf{a}_1 & \mathbf{a}_2 & \dots & \mathbf{a}_n \\ | & | & & | \end{pmatrix} = \begin{pmatrix} | & | & & | \\ \mathbf{q}_1 & \mathbf{q}_2 & \dots & \mathbf{q}_n \\ | & | & & | \end{pmatrix} \begin{pmatrix} r_{11} & r_{12} & \dots & r_{1n} \\ 0 & r_{22} & \dots & r_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & r_{nn} \end{pmatrix}
    $$
3.  **Separating rotation from scaling/shearing.** An orthogonal matrix $Q$ represents a pure rotation or reflection; it preserves lengths and angles. An upper triangular matrix $R$ represents a scaling along axes and a series of shears. QR decomposition thus splits a general linear transformation $A$ into a pure rotation/reflection ($Q$) followed by a scaling/shearing ($R$).

## Worked example
Let's find the QR decomposition of $A = \begin{pmatrix} 1 & 2 \\ 1 & 1 \end{pmatrix}$.

**Step 1: Identify the column vectors.**
The columns of $A$ are $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\mathbf{a}_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

**Step 2: Apply the Gram-Schmidt process to find the columns of Q.**
First, find $\mathbf{q}_1$.
$$
\mathbf{u}_1 = \mathbf{a}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}
$$
$$
\|\mathbf{u}_1\| = \sqrt{1^2 + 1^2} = \sqrt{2}
$$
$$
\mathbf{q}_1 = \frac{\mathbf{u}_1}{\|\mathbf{u}_1\|} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix}
$$
Next, find $\mathbf{q}_2$.
$$
\text{proj}_{\mathbf{q}_1}(\mathbf{a}_2) = (\mathbf{a}_2 \cdot \mathbf{q}_1)\mathbf{q}_1 = \left( \begin{pmatrix} 2 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} \right) \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} = \frac{3}{\sqrt{2}} \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \end{pmatrix} = \begin{pmatrix} 3/2 \\ 3/2 \end{pmatrix}
$$
$$
\mathbf{u}_2 = \mathbf{a}_2 - \text{proj}_{\mathbf{q}_1}(\mathbf{a}_2) = \begin{pmatrix} 2 \\ 1 \end{pmatrix} - \begin{pmatrix} 3/2 \\ 3/2 \end{pmatrix} = \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix}
$$
$$
\|\mathbf{u}_2\| = \sqrt{(1/2)^2 + (-1/2)^2} = \sqrt{1/4 + 1/4} = \sqrt{1/2} = \frac{1}{\sqrt{2}}
$$
$$
\mathbf{q}_2 = \frac{\mathbf{u}_2}{\|\mathbf{u}_2\|} = \sqrt{2} \begin{pmatrix} 1/2 \\ -1/2 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{2} \\ -1/\sqrt{2} \end{pmatrix}
$$
So, we have our orthogonal matrix $Q$:
$$
Q = [\mathbf{q}_1 | \mathbf{q}_2] = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix}
$$

**Step 3: Calculate R using the shortcut R = Q<sup>T</sup>A.**
$$
Q^T = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix}
$$
$$
R = Q^T A = \begin{pmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{pmatrix} \begin{pmatrix} 1 & 2 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} \frac{1+1}{\sqrt{2}} & \frac{2+1}{\sqrt{2}} \\ \frac{1-1}{\sqrt{2}} & \frac{2-1}{\sqrt{2}} \end{pmatrix} = \begin{pmatrix} 2/\sqrt{2} & 3/\sqrt{2} \\ 0 & 1/\sqrt{2} \end{pmatrix}
$$
This is an upper triangular matrix, as expected.

**Step 4: Reflection.**
The Gram-Schmidt process (Step 2) gave us an orthonormal basis $Q$ from the original basis $A$. This was the hard part. The calculation of $R$ (Step 3) was then a straightforward matrix multiplication. This shortcut $R=Q^TA$ works because the columns of $Q$ are orthonormal, making $Q^T$ the inverse of $Q$.

## Diagrams
Here is a geometric interpretation of the Gram-Schmidt process, which is the heart of QR. Imagine vectors $\mathbf{a}_1$ and $\mathbf{a}_2$ in the x-y plane.

```text
       y
       ^
       |
       |    a2
       |   /
       |  /
       | /
       |/
       +----->  a1
       |
       |
       +-------------------> x
```
First, we normalize $\mathbf{a}_1$ to get $\mathbf{q}_1$. It points in the same direction.

```text
       y
       ^
       |
       |    a2
       |   /
       |  /
       | /
       * q1
       +-----> x
```
Next, we find the component of $\mathbf{a}_2$ that is orthogonal to $\mathbf{q}_1$. We do this by subtracting the projection of $\mathbf{a}_2$ onto $\mathbf{q}_1$. The resulting vector, $\mathbf{u}_2$, is then normalized to get $\mathbf{q}_2$.

```text
       y
       ^
       |    a2
       |   /
       |  /|
       | / | u2 = a2 - proj(a2)
       |/  |
   q2 <--*--+-----> q1
       |  /
       | / proj(a2) on q1
       |/
       +-------------------> x
```
The final result is an orthonormal basis $\{\mathbf{q}_1, \mathbf{q}_2\}$. The matrix $Q$ contains these vectors, and $R$ contains the scalar values ($\|\mathbf{u}_1\|$, $\mathbf{a}_2 \cdot \mathbf{q}_1$, $\|\mathbf{u}_2\|$, etc.) that relate this new basis back to the original.

## Memory technique — remember this forever
1.  **Mnemonic:** Think of QR as "**Q**uietly **R**earrange". You take a messy matrix $A$ and *quietly rearrange* it into a "nice" part and a "simple" part. The nice part is the **Q**ueen ($Q$), an orthogonal matrix representing pure rotation. The simple part is the **R**oadmap ($R$), an upper-triangular matrix that's easy to work with. The Queen does the elegant rotation, the Roadmap gives the simple steps.

2.  **Must-know formulas:**
    *   $A = QR$ (The definition)
    *   $Q^T Q = I$ (The property of Q)
    *   $R = Q^T A$ (The practical calculation)

3.  **Spaced repetition schedule:** Review this topic by re-deriving the key ideas and solving a new problem on days: 1, 3, 7, 16, 35.

4.  **First principles pathway:** If you forget everything, remember this: **QR is just Gram-Schmidt in matrix form.**
    *   Write down the equations for the Gram-Schmidt process on the columns of $A$, called $\mathbf{a}_1, \mathbf{a}_2, \dots$.
    *   $\mathbf{u}_1 = \mathbf{a}_1 \implies \mathbf{q}_1 = \mathbf{u}_1/\|\mathbf{u}_1\|$
    *   $\mathbf{u}_2 = \mathbf{a}_2 - (\mathbf{a}_2 \cdot \mathbf{q}_1)\mathbf{q}_1 \implies \mathbf{q}_2 = \mathbf{u}_2/\|\mathbf{u}_2\|$
    *   ...and so on.
    *   Now, just solve for the $\mathbf{a}_i$ vectors in terms of the $\mathbf{q}_i$ vectors. You will see that $\mathbf{a}_1$ is a multiple of $\mathbf{q}_1$. $\mathbf{a}_2$ is a combination of $\mathbf{q}_1$ and $\mathbf{q}_2$. This pattern *is* the upper-triangular structure of $R$. You can always rebuild it from there.

## Common mistakes
*   **Forgetting to normalize:** Students often find an *orthogonal* basis (the $\mathbf{u}_i$ vectors) but forget to divide by their magnitudes to get an *orthonormal* basis (the $\mathbf{q}_i$ vectors). This means $Q^T Q \neq I$, and the shortcut $R=Q^TA$ will fail.
*   **Computational errors in Gram-Schmidt:** The projection formula involves many dot products and subtractions. A single arithmetic slip will cascade through the entire calculation. Be methodical.
*   **Assuming $A$ must be square:** QR decomposition works perfectly fine for rectangular matrices where the number of rows is greater than or equal to the number of columns ($m \ge n$), provided the columns are linearly independent. In this case, $Q$ will be $m \times n$ and $R$ will be $n \times n$.
*   **Mixing up $Q$ and $Q^T$:** Remember that for real matrices, the transpose is the inverse for an orthogonal matrix. $A=QR \implies Q^TA = Q^TQR = IR = R$. Don't accidentally calculate $R=QA^T$.

## Self-check
1.  Find the QR decomposition of $A = \begin{pmatrix} 0 & 3 \\ 2 & 0 \end{pmatrix}$. (Hint: the columns are already orthogonal).
2.  Find the QR decomposition of the rectangular matrix $A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix}$.
3.  Suppose you have the QR decomposition for a matrix $A$. How does the determinant of $A$ relate to the determinants of $Q$ and $R$? What does this tell you about the geometric interpretation of the determinant of $A$?