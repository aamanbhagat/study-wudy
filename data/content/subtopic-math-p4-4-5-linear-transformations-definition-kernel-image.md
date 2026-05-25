## What it is
A linear transformation is a function between two vector spaces that preserves the operations of vector addition and scalar multiplication. In essence, it's a "well-behaved" mapping that doesn't warp the underlying vector space structure; lines remain lines and the origin stays put. It's the vector space equivalent of a simple function like $f(x) = mx$.

## Why it matters
Linear transformations are the verbs of linear algebra. In computer graphics and robotics, they represent rotations, scaling, and shearing. In physics, quantum operators are linear transformations on state spaces, and in aerospace, control systems use them to model the response of an aircraft to pilot input. Understanding them is crucial for solving systems of linear equations, performing data compression (like PCA), and building many machine learning models.

## When to study it
You must have a solid grasp of the following concepts first. Do not proceed if these are not clear.
*   **Vector Spaces:** The definition of a vector space over a field, including the axioms.
*   **Subspaces:** How to identify and prove a subset is a subspace.
*   **Basis and Dimension:** The concepts of linear independence, span, basis, and the dimension of a vector space.
*   **Matrix Operations:** Specifically, matrix-vector multiplication.

## How to study it (step by step)
1.  **Internalize the Definition:** Write down the two defining properties of a linear transformation $T: V \to W$. For any vectors $\vec{u}, \vec{v} \in V$ and any scalar $c$:
    *   Additivity: $T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v})$
    *   Homogeneity: $T(c\vec{u}) = cT(\vec{u})$
    For 15 minutes, test simple functions (e.g., $f(x) = x^2$, $f(\vec{v}) = A\vec{v}$, $f(\vec{v}) = \vec{v} + \vec{b}$) against these two rules to see which are linear.

2.  **Connect to Matrices:** Prove that every matrix multiplication represents a linear transformation. That is, show that $T(\vec{v}) = A\vec{v}$ satisfies the two properties above. This is the most common and concrete type of linear transformation you will encounter.

3.  **Define Kernel and Image:** Write down the set-builder definitions for the kernel (or null space) and image (or range) of a transformation $T: V \to W$.
    *   Kernel: $\text{ker}(T) = \{ \vec{v} \in V \mid T(\vec{v}) = \vec{0}_W \}$
    *   Image: $\text{im}(T) = \{ \vec{w} \in W \mid \vec{w} = T(\vec{v}) \text{ for some } \vec{v} \in V \}$
    For 20 minutes, describe in your own words what these two sets represent. The kernel is "what gets squashed to zero." The image is "what you can get out."

4.  **Compute Kernel and Image:** For a matrix transformation $T(\vec{x}) = A\vec{x}$, recognize that finding the kernel is equivalent to solving the homogeneous system $A\vec{x} = \vec{0}$. Recognize that the image is the span of the columns of $A$ (the column space). Practice finding a basis for the kernel and image of two different $3 \times 3$ matrices.

5.  **Master the Rank-Nullity Theorem:** State the theorem: $\text{dim}(V) = \text{dim}(\text{ker}(T)) + \text{dim}(\text{im}(T))$. The dimension of the kernel is the *nullity*, and the dimension of the image is the *rank*. For the matrices in the previous step, verify that this theorem holds. Understand it as an accounting principle: the dimension of the domain is split between the part that gets squashed (kernel) and the part that makes it to the image.

## Key ideas, with intuition
1.  **Structure Preservation:** The two rules, $T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v})$ and $T(c\vec{u}) = cT(\vec{u})$, are the heart of linearity. The first rule says it doesn't matter if you add vectors before or after the transformation. The second says it doesn't matter if you scale a vector before or after the transformation. This predictable behavior is what makes them so powerful. A grid of parallel lines transforms into another grid of parallel lines.

2.  **The Kernel is the "Squashing" Subspace:** The kernel of $T$ is the set of all input vectors that are mapped to the zero vector in the output space. Think of a projector casting a 2D image from a 3D scene. The entire line of points from the projector's bulb through a single point on the screen all collapse to that one point. The kernel is analogous to the direction of projection—all vectors pointing along that line get "squashed" to the origin. The kernel is always a subspace of the *domain*.
    $$ \text{ker}(T) = \{ \vec{v} \in V \mid T(\vec{v}) = \vec{0}_W \} $$

3.  **The Image is the "Output" Subspace:** The image of $T$ is the set of all possible output vectors. It's everything you can "reach" in the codomain by applying the transformation to vectors from the domain. In the projector analogy, the image is the 2D movie being projected on the screen. It doesn't fill the entire 3D room (the codomain), but it forms a perfectly valid 2D subspace within it. The image is always a subspace of the *codomain*.
    $$ \text{im}(T) = \text{span}(\text{columns of } A) $$

4.  **The Rank-Nullity Theorem is a Conservation Law:** This theorem is the most important result connecting these ideas. It states that the dimension of the input space is equal to the sum of the dimensions of the kernel and the image.
    $$ \underbrace{\text{dim}(V)}_{\text{Dimension of Domain}} = \underbrace{\text{dim}(\text{ker}(T))}_{\text{Nullity}} + \underbrace{\text{dim}(\text{im}(T))}_{\text{Rank}} $$
    This means that for a fixed domain dimension, if you make the kernel larger (squash more of the space to zero), the image must become smaller, and vice-versa. You can't create or destroy dimensions; you can only partition them between the kernel and the image.

## Worked example
Let's analyze the linear transformation $T: \mathbb{R}^3 \to \mathbb{R}^2$ defined by the matrix $A = \begin{pmatrix} 1 & 0 & -2 \\ 0 & 1 & 3 \end{pmatrix}$.

**Step 1: Find the Kernel of T**
The kernel is the set of all vectors $\vec{x} = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}$ such that $A\vec{x} = \vec{0}$. This means we solve the system:
$$
\begin{pmatrix} 1 & 0 & -2 \\ 0 & 1 & 3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
The matrix is already in reduced row echelon form. The equations are $x_1 - 2x_3 = 0$ and $x_2 + 3x_3 = 0$.
The variable $x_3$ is a free variable. Let $x_3 = t$.
Then $x_1 = 2t$ and $x_2 = -3t$.
The solution vector is $\vec{x} = \begin{pmatrix} 2t \\ -3t \\ t \end{pmatrix} = t \begin{pmatrix} 2 \\ -3 \\ 1 \end{pmatrix}$.
The kernel is the set of all scalar multiples of this vector.
$$ \text{ker}(T) = \text{span}\left\{ \begin{pmatrix} 2 \\ -3 \\ 1 \end{pmatrix} \right\} $$
A basis for the kernel is $\left\{ \begin{pmatrix} 2 \\ -3 \\ 1 \end{pmatrix} \right\}$. The dimension of the kernel (the nullity) is $\text{dim}(\text{ker}(T)) = 1$.
*Reflection: This step was about solving a homogeneous system of equations. The kernel is the solution space.*

**Step 2: Find the Image of T**
The image is the span of the columns of $A$.
$$ \text{im}(T) = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix}, \begin{pmatrix} -2 \\ 3 \end{pmatrix} \right\} $$
We need to find a basis for this span. The first two vectors, $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$, are the standard basis vectors for $\mathbb{R}^2$. They are clearly linearly independent and they span all of $\mathbb{R}^2$. The third vector is a linear combination of the first two: $\begin{pmatrix} -2 \\ 3 \end{pmatrix} = -2\begin{pmatrix} 1 \\ 0 \end{pmatrix} + 3\begin{pmatrix} 0 \\ 1 \end{pmatrix}$. So, it's redundant.
A basis for the image is $\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$.
The image is the entire codomain, $\text{im}(T) = \mathbb{R}^2$. The dimension of the image (the rank) is $\text{dim}(\text{im}(T)) = 2$.
*Reflection: This step was about finding the column space of the matrix. The pivot columns of the RREF form a basis for the column space.*

**Step 3: Verify the Rank-Nullity Theorem**
The domain is $V = \mathbb{R}^3$, so $\text{dim}(V) = 3$.
We found $\text{dim}(\text{ker}(T)) = 1$ and $\text{dim}(\text{im}(T)) = 2$.
$$ \text{dim}(V) = \text{dim}(\text{ker}(T)) + \text{dim}(\text{im}(T)) $$
$$ 3 = 1 + 2 $$
The theorem holds.
*Reflection: This confirms our calculations are consistent. The 3 dimensions of the input space are partitioned into 1 dimension that gets squashed to zero and 2 dimensions that form the output image.*

## Diagrams
A map from a domain $V$ to a codomain $W$.

```text
       V (Domain, e.g., R^3)               W (Codomain, e.g., R^2)
     +-------------------------+           +----------------------+
     |                         |           |                      |
     |         •               |           |                      |
     |          \              |           |                      |
     |       _ _ _\ _ _ _      |   T(v)    |         • T(v)       |
     |      /     • v    \     | --------> |                      |
     |     /             |     |           |                      |
     |    /              |     |           |    Image(T)          |
     |   • 0_V           |     |           | <==============>     |
     |  /                |           |    (a subspace)      |
     | /                 |           |                      |
     |/ Kernel(T)        |           |         • 0_W          |
     |(a line subspace)   |           |                      |
     |                         |           |                      |
     +-------------------------+           +----------------------+
```
This diagram shows that the entire kernel in the domain $V$ (represented as a line through the origin) gets mapped to the single zero vector $\vec{0}_W$ in the codomain $W$. A generic vector $\vec{v}$ in $V$ gets mapped to a vector $T(\vec{v})$ inside the image of $T$, which is a subspace of $W$.

## Memory technique — remember this forever
1.  **The Story:** Imagine a factory (the transformation $T$). The raw materials are vectors from the domain $V$. The factory processes them into products, which are vectors in the codomain $W$.
    *   **The Image** is the set of all possible products you can make. It's the factory's "product catalog."
    *   **The Kernel** is the set of all raw materials that produce *nothing*—they just turn into a puff of smoke (the zero vector). It's the "waste" or "null" input.
    *   **Rank-Nullity:** The total dimension of your raw material warehouse (`dim(V)`) is accounted for by the dimension of the materials that become waste (`nullity`) and the dimension of the materials that become useful products (`rank`).

2.  **Must-Know Formulas:**
    *   Linearity: $T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v})$ and $T(c\vec{u}) = cT(\vec{u})$
    *   Definitions: $\text{ker}(T) = \{ \vec{v} \in V \mid T(\vec{v}) = \vec{0}_W \}$ and $\text{im}(T) = \{ T(\vec{v}) \mid \vec{v} \in V \}$
    *   Rank-Nullity: $\text{dim}(V) = \text{dim}(\text{ker}(T)) + \text{dim}(\text{im}(T))$

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from scratch at **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   A transformation is a function. What makes it *linear*? It must play nice with the two vector space operations: addition and scalar multiplication. Write down those two rules.
    *   For a matrix $A$, what is the kernel? It's the stuff that goes to zero. So, solve $A\vec{x} = \vec{0}$.
    *   What is the image? It's all possible outputs. An output is $A\vec{x}$. Write $A\vec{x}$ as a linear combination of the columns of $A$. This shows the image is the column space.

## Common mistakes
1.  **Confusing Image and Codomain.** The image is a *subspace* of the codomain. For the transformation $T: \mathbb{R}^3 \to \mathbb{R}^3$ that projects every vector onto the xy-plane, the codomain is $\mathbb{R}^3$ but the image is just the 2D xy-plane. They are not the same unless the transformation is surjective (onto).
2.  **Stating Dimensions Instead of Sets.** The question "What is the kernel?" asks for a set of vectors (e.g., a basis or a span), not a number. "What is the nullity?" asks for the number. Be precise.
3.  **Assuming $T(\vec{v}) = \vec{v} + \vec{b}$ is linear.** A transformation that adds a constant vector $\vec{b}$ (for $\vec{b} \neq \vec{0}$) is an *affine* transformation, not a linear one. It fails the test because $T(\vec{0}) = \vec{b} \neq \vec{0}$, which is a necessary condition for linearity.
4.  **Incorrectly Identifying the Image.** The image is the span of the *original columns* of the matrix $A$, not the columns of its row-reduced form. Use the pivot columns of the row-reduced form to identify which original columns form a basis.

## Self-check
1.  Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be the transformation that reflects a vector across the line $y=x$. Is $T$ linear? Justify your answer using the two defining properties.
2.  Let $T: \mathbb{R}^4 \to \mathbb{R}^3$ be defined by the matrix $A = \begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & -1 \\ 0 & 0 & 0 & 0 \end{pmatrix}$. Find a basis for the kernel of $T$ and a basis for the image of $T$. State the rank and nullity.
3.  Suppose $T: \mathbb{R}^5 \to \mathbb{R}^3$ is a linear transformation. What is the maximum possible rank of $T$? What is the minimum possible dimension of the kernel of $T$? Can $T$ be injective (one-to-one)? Explain using the Rank-Nullity theorem.