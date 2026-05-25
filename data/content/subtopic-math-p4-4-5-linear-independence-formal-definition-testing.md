## What it is
A set of vectors is **linearly independent** if no vector in the set can be expressed as a linear combination of the others. This means each vector contributes a unique, non-redundant direction to the set's span. If a vector *can* be written as a combination of others, the set is **linearly dependent**.

## Why it matters
Linear independence is the foundation for the concept of a **basis**, which provides a minimal set of building blocks for a vector space. In machine learning, Principal Component Analysis (PCA) finds a new basis of linearly independent vectors (principal components) to represent data with less redundancy. In physics and engineering, identifying linearly independent modes of vibration is crucial for analyzing the stability of structures like bridges or rocket fuselages.

## When to study it
You must have a firm grasp of these prerequisite concepts. If any are weak, review them first.
*   **Vectors and Vector Spaces:** The definition of a vector and the axioms of a vector space.
*   **Linear Combinations:** The concept of scaling and adding vectors, i.e., forming $c_1\vec{v}_1 + c_2\vec{v}_2 + \dots$.
*   **Span:** The set of all possible linear combinations of a set of vectors.
*   **Systems of Linear Equations:** How to set up and solve them, particularly using matrices (Gaussian elimination).

## How to study it (step by step)
1.  **Intuition first (15 min):** Take two vectors in $\mathbb{R}^2$, $\vec{u} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\vec{v} = \begin{pmatrix} 2 \\ 2 \end{pmatrix}$. Can you write $\vec{v}$ as a multiple of $\vec{u}$? Yes, $\vec{v} = 2\vec{u}$. They are dependent. Now take $\vec{w} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. Can you write $\vec{w}$ as a multiple of $\vec{u}$? No. They are independent. Generalize this idea to three vectors in $\mathbb{R}^3$: can you write one as a weighted sum of the other two?
2.  **Derive the formal test (10 min):** Start with the intuitive idea of dependence: $\vec{v}_k = c_1\vec{v}_1 + \dots + c_{k-1}\vec{v}_{k-1} + c_{k+1}\vec{v}_{k+1} + \dots + c_n\vec{v}_n$. Move $\vec{v}_k$ to the other side of the equation. What do you get? You get a linear combination of all the vectors that equals the zero vector, where at least one coefficient (the $-1$ for $\vec{v}_k$) is non-zero. This is the seed of the formal definition.
3.  **Master the formal definition (15 min):** A set of vectors $\{\vec{v}_1, \dots, \vec{v}_n\}$ is linearly independent if the only solution to the equation $c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_n\vec{v}_n = \vec{0}$ is the **trivial solution**, where $c_1 = c_2 = \dots = c_n = 0$. If any non-zero solution for the coefficients exists, the set is linearly dependent.
4.  **Connect the test to matrices (20 min):** Write the vector equation from step 3 as a system of linear equations. Then, write that system as an augmented matrix $[A|\vec{0}]$, where the columns of $A$ are your vectors. The question "is there only a trivial solution?" becomes "does this homogeneous system have a unique solution?"
5.  **Solve problems (30 min):** Work through three problems: one with two vectors in $\mathbb{R}^2$, one with three vectors in $\mathbb{R}^3$, and one with four vectors in $\mathbb{R}^3$. For the third problem, you should be able to reason about the outcome before even starting the calculation.

## Key ideas, with intuition
1.  **Redundancy is Dependence.** Think of each vector as providing information. If a vector can be built from others, it provides no new information. It's redundant. Linearly independent vectors are all essential; remove one, and the span shrinks.

2.  **The Quest for the Zero Vector.** The formal test is all about how you can make the zero vector.
    $$c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_n\vec{v}_n = \vec{0}$$
    You can *always* make the zero vector by choosing all coefficients to be zero (the "trivial" way). Linear independence means this is the *only* way. If you can find a clever, non-trivial combination of vectors that cancel each other out to land on the origin, they are dependent.

3.  **Geometric Meaning.**
    *   Two vectors are linearly dependent if they are **collinear** (lie on the same line through the origin).
    *   Three vectors are linearly dependent if they are **coplanar** (lie on the same plane through the origin).
    *   In general, a set of $n$ vectors in $\mathbb{R}^m$ is linearly dependent if they all lie within a subspace of dimension less than $n$.

4.  **The Matrix Connection.** Testing for linear independence of a set of column vectors $\{\vec{v}_1, \dots, \vec{v}_n\}$ is equivalent to analyzing the homogeneous system of equations $A\vec{x} = \vec{0}$, where $A = [\vec{v}_1 \ \vec{v}_2 \ \dots \ \vec{v}_n]$ and $\vec{x} = [c_1 \ \dots \ c_n]^T$.
    *   **Independent** $\iff$ $A\vec{x} = \vec{0}$ has only the trivial solution $\vec{x} = \vec{0}$.
    *   **Dependent** $\iff$ $A\vec{x} = \vec{0}$ has non-trivial solutions.
    For a square matrix $A$, this is equivalent to checking if $\det(A) \neq 0$.

## Worked example
**Question:** Determine if the vectors $\vec{v}_1 = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$, $\vec{v}_2 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix}$, and $\vec{v}_3 = \begin{pmatrix} 2 \\ 0 \\ -2 \end{pmatrix}$ are linearly independent.

**Step 1: Set up the vector equation.**
We are looking for solutions to $c_1\vec{v}_1 + c_2\vec{v}_2 + c_3\vec{v}_3 = \vec{0}$.
$$c_1\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} + c_2\begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} + c_3\begin{pmatrix} 2 \\ 0 \\ -2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
*Reflection: This step directly applies the formal definition. We are testing if a non-trivial set of coefficients $\{c_1, c_2, c_3\}$ exists.*

**Step 2: Convert to a system of linear equations.**
This vector equation is equivalent to a system of three equations, one for each component:
$$
\begin{cases}
1c_1 + 0c_2 + 2c_3 = 0 \\
2c_1 + 1c_2 + 0c_3 = 0 \\
3c_1 + 2c_2 - 2c_3 = 0
\end{cases}
$$
*Reflection: This translates the vector problem into a more familiar algebraic form.*

**Step 3: Solve the system using an augmented matrix.**
The system can be written as $[A|\vec{0}]$:
$$
\left[
\begin{array}{ccc|c}
1 & 0 & 2 & 0 \\
2 & 1 & 0 & 0 \\
3 & 2 & -2 & 0
\end{array}
\right]
$$
Now, perform Gaussian elimination to reach row-echelon form.
$R_2 \to R_2 - 2R_1$
$R_3 \to R_3 - 3R_1$
$$
\left[
\begin{array}{ccc|c}
1 & 0 & 2 & 0 \\
0 & 1 & -4 & 0 \\
0 & 2 & -8 & 0
\end{array}
\right]
$$
$R_3 \to R_3 - 2R_2$
$$
\left[
\begin{array}{ccc|c}
1 & 0 & 2 & 0 \\
0 & 1 & -4 & 0 \\
0 & 0 & 0 & 0
\end{array}
\right]
$$
*Reflection: Row reduction is a systematic algorithm for solving the system. The goal is to determine if there is a unique solution or infinitely many.*

**Step 4: Interpret the result.**
The final matrix corresponds to the system:
$$
\begin{cases}
c_1 + 2c_3 = 0 \\
c_2 - 4c_3 = 0 \\
0 = 0
\end{cases}
$$
The equation $0=0$ is redundant. We have a free variable. Let $c_3 = t$.
Then $c_2 = 4t$ and $c_1 = -2t$.
The solution is of the form $\begin{pmatrix} c_1 \\ c_2 \\ c_3 \end{pmatrix} = t \begin{pmatrix} -2 \\ 4 \\ 1 \end{pmatrix}$ for any scalar $t$.

Since we can choose any non-zero $t$ (e.g., $t=1$) to get a non-trivial solution ($c_1=-2, c_2=4, c_3=1$), the system has non-trivial solutions.

**Conclusion:** The vectors are **linearly dependent**. For example, $-2\vec{v}_1 + 4\vec{v}_2 + \vec{v}_3 = \vec{0}$, which can be rearranged to $\vec{v}_3 = 2\vec{v}_1 - 4\vec{v}_2$.

## Diagrams
Linearly Dependent (Collinear) Vectors in $\mathbb{R}^2$
```text
      ^ y
      |
      |     /
      |    /
      |   / v = 2u
      |  *
      | /
      |/ u
      *
------*-----------> x
      |
```

Linearly Independent Vectors in $\mathbb{R}^2$
```text
      ^ y
      |
      |     / w
      |    *
      |
      |
      |   * u
      |  /
------*-----------> x
      |
```

## Memory technique — remember this forever
1.  **The "Independent Team" Analogy:** Imagine your vectors are team members working on a project. The "zero vector" is the outcome of "zero net effect." A team is **linearly independent** if the only way to achieve zero net effect is for every single member to do zero work (the trivial solution). A team is **linearly dependent** if some members can work in opposing ways to cancel each other out, achieving zero net effect even with non-zero effort (a non-trivial solution). One member's contribution is redundant.

2.  **Must Overlearn:**
    The set $\{\vec{v}_1, \dots, \vec{v}_n\}$ is **linearly independent** if and only if the vector equation
    $$c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_n\vec{v}_n = \vec{0}$$
    has **only the trivial solution** $c_1 = c_2 = \dots = c_n = 0$.

3.  **Spaced Repetition Schedule:** Review this concept and solve one test problem at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start here:
    "What does it mean for vectors to be redundant?"
    It means one vector, say $\vec{v}_k$, can be made from the others: $\vec{v}_k = \sum_{i \neq k} a_i \vec{v}_i$.
    Rearrange this equation: $\sum_{i \neq k} a_i \vec{v}_i - \vec{v}_k = \vec{0}$.
    This is a linear combination of all the vectors that equals $\vec{0}$. Crucially, the coefficient of $\vec{v}_k$ is $-1$, which is not zero.
    Therefore, you have found a non-trivial solution to the equation $\sum c_i \vec{v}_i = \vec{0}$. This rebuilds the entire formal test from the intuitive idea of redundancy.

## Common mistakes
1.  **Confusing Independence with Orthogonality.** Orthogonal (perpendicular) vectors are always linearly independent (unless one is the zero vector), but linearly independent vectors are not necessarily orthogonal. The vectors in the ASCII diagram for independence are not orthogonal, but are independent.
2.  **Assuming `n` vectors in `R^n` are always independent.** A set of $n$ vectors in $\mathbb{R}^n$ *might* be linearly independent (in which case they form a basis), but they could also be dependent. You must always test.
3.  **Forgetting the Zero Vector.** Any set of vectors that includes the zero vector is **always** linearly dependent. Proof: if $\vec{v}_1 = \vec{0}$, then $1\cdot\vec{v}_1 + 0\cdot\vec{v}_2 + \dots + 0\cdot\vec{v}_n = \vec{0}$. This is a non-trivial solution (the first coefficient is 1), so the set is dependent.
4.  **Stopping at Row-Echelon Form.** Finding the row-echelon form of the matrix is not the end. You must correctly interpret it to determine if there are free variables, which signals the existence of non-trivial solutions and thus linear dependence.

## Self-check
Do not solve these now. Use them to test your recall tomorrow and at each spaced repetition interval.

1.  Are the vectors $\vec{u} = \begin{pmatrix} -1 \\ 3 \end{pmatrix}$ and $\vec{v} = \begin{pmatrix} 2 \\ -6 \end{pmatrix}$ in $\mathbb{R}^2$ linearly independent?
2.  Test the following set for linear independence in $\mathbb{R}^3$:
    $$ S = \left\{ \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \right\} $$
3.  Can a set of four vectors in $\mathbb{R}^3$ be linearly independent? Explain your reasoning without performing any calculations.