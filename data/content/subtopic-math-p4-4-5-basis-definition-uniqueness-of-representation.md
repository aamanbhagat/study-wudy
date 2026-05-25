## What it is
A basis of a vector space is a minimal set of vectors that "builds" the entire space. Formally, it is a set of vectors that is both linearly independent (no vector in the set is a redundant combination of the others) and spans the space (every vector in the space can be written as a combination of the basis vectors). Think of it as the set of fundamental directions from which you can reach any point in the space.

## Why it matters
A basis provides a coordinate system for a vector space. This is fundamental to representing data and physical states. In machine learning, Principal Component Analysis (PCA) finds a new basis that best represents the variance in data, enabling compression and feature extraction. In physics and aerospace, we describe motion, fields, and quantum states relative to a chosen basis (e.g., Cartesian coordinates, or the energy eigenstates of a Hamiltonian), and changing basis is a core operation for solving complex problems.

## When to study it
You must have a solid understanding of these prerequisite concepts:
1.  **Vector Spaces**: The definition of a vector space $V$ over a field $\mathbb{F}$, including the axioms of vector addition and scalar multiplication.
2.  **Linear Combinations & Span**: What it means to form a linear combination of vectors, and the definition of the span of a set of vectors, $\text{span}\{v_1, \dots, v_n\}$.
3.  **Linear Independence**: The definition of linear independence and dependence. You should be able to test a set of vectors for linear independence.

If you are not confident with these three topics, pause and review them. The concept of a basis rests entirely upon them.

## How to study it (step by step)
1.  **Memorize the Definition**: Write down the two-part definition of a basis from memory. A set of vectors $\mathcal{B} = \{v_1, \dots, v_n\}$ is a basis for a vector space $V$ if and only if: (1) $\mathcal{B}$ is linearly independent, and (2) $\text{span}(\mathcal{B}) = V$. Do not proceed until this is second nature.
2.  **Connect to $\mathbb{R}^2$**: Consider the standard basis vectors $\hat{\imath} = (1, 0)$ and $\hat{\jmath} = (0, 1)$. Verbally explain to yourself why this set is linearly independent and why it spans all of $\mathbb{R}^2$. Then, consider a non-standard set like $\{(1, 1), (1, -1)\}$ and prove it is also a basis for $\mathbb{R}^2$.
3.  **Derive Uniqueness**: Take the definition of a basis $\mathcal{B} = \{v_1, \dots, v_n\}$ for a space $V$. Assume a vector $v \in V$ has two different representations: $v = c_1v_1 + \dots + c_nv_n$ and $v = d_1v_1 + \dots + d_nv_n$. Subtract one equation from the other and use the definition of linear independence to prove that $c_i = d_i$ for all $i$. This is the core proof of uniqueness.
4.  **Work with Failure Cases**: Take a set of vectors that is *not* a basis and identify why. For example, in $\mathbb{R}^3$, analyze why $\{(1,0,0), (0,1,0)\}$ fails (doesn't span) and why $\{(1,0,0), (0,1,0), (1,1,0)\}$ fails (linearly dependent).
5.  **Solve a "Find the Coordinates" Problem**: Given a basis $\mathcal{B}$ and a vector $v$, find the unique scalars (the "coordinates") that represent $v$ in that basis. This turns the abstract definition into a concrete computational skill.

## Key ideas, with intuition
1.  **Spanning: Enough to Reach Everywhere.** The spanning property, $\text{span}(\mathcal{B}) = V$, ensures that there are *enough* vectors in the basis to build every single vector in the space. There are no unreachable points. It's about coverage.
2.  **Linear Independence: No Redundancy.** The linear independence property ensures that there are *no extra* vectors in the basis. Every vector in the basis provides a new, unique direction that cannot be created by the others. It's about efficiency. A basis is a "Goldilocks" set: not too small (it wouldn't span), not too large (it would be linearly dependent), but just right.
3.  **Basis = Coordinate System.** The combination of these two properties is powerful. Spanning guarantees that every vector $v$ *has* a representation. Linear independence guarantees that this representation is *unique*. This unique set of scalar coefficients is the "address" or "coordinates" of the vector $v$ with respect to that basis.
    $$
    \forall v \in V, \exists! \, c_1, \dots, c_n \in \mathbb{F} \text{ such that } v = c_1v_1 + \dots + c_nv_n
    $$
    The symbol $\exists!$ means "there exists a unique".

## Worked example
Let $V = \mathbb{R}^2$. Consider the set of vectors $\mathcal{B} = \{v_1, v_2\}$ where $v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $v_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$. Let's show this is a basis for $\mathbb{R}^2$ and find the unique representation of the vector $u = \begin{pmatrix} 7 \\ 1 \end{pmatrix}$ in this basis.

**Step 1: Check for Linear Independence.**
We need to show that the only solution to $c_1v_1 + c_2v_2 = \mathbf{0}$ is $c_1 = c_2 = 0$.
$$
c_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
This gives a system of linear equations:
1.  $c_1 + c_2 = 0$
2.  $c_1 - c_2 = 0$

Adding (1) and (2) gives $2c_1 = 0 \implies c_1 = 0$. Substituting back into (1) gives $0 + c_2 = 0 \implies c_2 = 0$. Since the only solution is the trivial solution, the set $\mathcal{B}$ is linearly independent.

**Step 2: Check for Spanning.**
We need to show that for any arbitrary vector $\begin{pmatrix} a \\ b \end{pmatrix} \in \mathbb{R}^2$, we can find scalars $c_1, c_2$ such that:
$$
c_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} = \begin{pmatrix} a \\ b \end{pmatrix}
$$
This gives the system:
1.  $c_1 + c_2 = a$
2.  $c_1 - c_2 = b$

Adding the two equations gives $2c_1 = a+b \implies c_1 = \frac{a+b}{2}$. Subtracting the second from the first gives $2c_2 = a-b \implies c_2 = \frac{a-b}{2}$. Since we can find a solution for $c_1, c_2$ for any $a, b$, the set spans $\mathbb{R}^2$.
Since $\mathcal{B}$ is linearly independent and spans $\mathbb{R}^2$, it is a basis for $\mathbb{R}^2$.

**Step 3: Find the unique representation of $u = \begin{pmatrix} 7 \\ 1 \end{pmatrix}$.**
We need to find the unique scalars $c_1, c_2$ such that $c_1v_1 + c_2v_2 = u$. We just derived the general formulas for these scalars. Here, $a=7$ and $b=1$.
$$
c_1 = \frac{7+1}{2} = 4
$$
$$
c_2 = \frac{7-1}{2} = 3
$$
So, the unique representation is $u = 4v_1 + 3v_2$. The coordinates of $u$ in the basis $\mathcal{B}$ are $(4, 3)$.

**Reflection:** The linear independence check in Step 1 ensured that the system of equations for the coordinates would have at most one solution. The spanning check in Step 2 ensured it would have at least one solution. Together, they guarantee exactly one solution, which we found in Step 3.

## Diagrams
A standard basis and a non-orthogonal basis for $\mathbb{R}^2$.

```text
Standard Basis { (1,0), (0,1) }

      ^ y (j)
      |
      |
      |
(0,1) +-----
      |     |
      |     |
------+-----> x (i)
    (0,0) (1,0)

-------------------------------------

Non-Orthogonal Basis { (1,1), (1,-1) }

      ^ y
      |
      |   v1=(1,1)
      |  /
      | /
------+-----> x
     /|
    / |
   /  | v2=(1,-1)
      |
```
The diagrams show that a basis is just a set of vectors that provides a grid for the space. The grid does not need to be rectangular (orthogonal). Any vector, like $(7,1)$, can be found by taking 4 steps in the $v_1$ direction and 3 steps in the $v_2$ direction.

## Memory technique — remember this forever
1.  **Mnemonic:** A **B**asis is the set of **B**are-bones **B**uilding **B**locks for a vector space. It has just enough vectors to **B**uild everything, with no **B**loat (redundancy).
2.  **Must Overlearn:**
    *   **Definition of Basis:** A set $\mathcal{B}$ is a basis for vector space $V$ if:
        1.  $\mathcal{B}$ is linearly independent.
        2.  $\text{span}(\mathcal{B}) = V$.
    *   **Uniqueness Theorem:** For a basis $\mathcal{B} = \{v_1, \dots, v_n\}$ of $V$, every vector $v \in V$ has a *unique* representation $v = c_1v_1 + \dots + c_nv_n$.
3.  **Spaced Repetition Schedule:** Review this entire mini-lesson at these intervals:
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 1 week (7 days)
    *   In ~2 weeks (16 days)
    *   In ~1 month (35 days)
4.  **First Principles Pathway:** If you forget the uniqueness theorem, re-derive it.
    *   Assume two representations for a vector $v$: $\sum c_i v_i$ and $\sum d_i v_i$.
    *   Set them equal: $\sum c_i v_i = \sum d_i v_i$.
    *   Rearrange: $\sum (c_i - d_i) v_i = \mathbf{0}$.
    *   Invoke the definition of linear independence for the basis vectors $\{v_i\}$. This forces $(c_i - d_i) = 0$ for all $i$.
    *   Conclude $c_i = d_i$. The representation is unique.

## Common mistakes
1.  **Confusing Spanning Set with Basis:** A spanning set can be linearly dependent. A basis is a *minimal* spanning set. For example, in $\mathbb{R}^2$, $\{(1,0), (0,1), (1,1)\}$ is a spanning set, but not a basis because it's linearly dependent.
2.  **Assuming Orthogonality:** Students often internalize the standard basis ($\hat{\imath}, \hat{\jmath}, \hat{k}$) and assume all basis vectors must be perpendicular. As the worked example shows, this is false. A basis can consist of vectors at any angle, as long as they are not collinear (in $\mathbb{R}^2$) or coplanar (in $\mathbb{R}^3$), etc.
3.  **Thinking a Vector Space has only one Basis:** A vector space has infinitely many possible bases. The standard basis in $\mathbb{R}^n$ is just the most convenient one. The choice of basis is a choice of coordinate system.
4.  **Incorrectly Setting up the System:** When finding coordinates, remember that the basis vectors are the columns of the matrix in the system $A\mathbf{c} = \mathbf{v}$. The unknowns are the coefficients $\mathbf{c}$.

## Self-check
1.  Is the set $\left\{ \begin{pmatrix} 2 \\ 3 \end{pmatrix}, \begin{pmatrix} -4 \\ -6 \end{pmatrix} \right\}$ a basis for $\mathbb{R}^2$? Why or why not?
2.  The set $\mathcal{B} = \left\{ \begin{pmatrix} 3 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 2 \end{pmatrix} \right\}$ is a basis for $\mathbb{R}^2$. Find the coordinates of the vector $v = \begin{pmatrix} 5 \\ -4 \end{pmatrix}$ with respect to the basis $\mathcal{B}$.
3.  Consider the vector space $P_2$ of polynomials of degree at most 2. Prove that the set $\{1, 1+x, 1+x+x^2\}$ is a basis for $P_2$. What are the coordinates of the polynomial $p(x) = 3x^2 - 2x + 5$ in this basis?