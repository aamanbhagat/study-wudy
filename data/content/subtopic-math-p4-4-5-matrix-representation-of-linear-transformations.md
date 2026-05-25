## What it is
A matrix representation of a linear transformation is a way to encode a geometric operation (like a rotation, shear, or projection) into a rectangular array of numbers. This matrix allows us to replace the abstract application of a function, $T(\mathbf{v})$, with the concrete arithmetic of matrix-vector multiplication, $A\mathbf{x}$. The key is that the matrix $A$ is constructed based on a chosen basis for the input and output vector spaces.

## Why it matters
This concept is the bridge between abstract linear algebra and computation. In computer graphics and robotics, sequences of rotations and translations are encoded as matrix multiplications to manipulate 3D models. In machine learning, a neural network layer is fundamentally a linear transformation (represented by a weight matrix) followed by a non-linear activation, making this the core computational unit. In physics, quantum operators describing observables like spin or momentum are represented as matrices acting on state vectors.

## When to study it
You must be comfortable with the following concepts before proceeding. If any are weak, review them first.
1.  **Vector Spaces:** Understand the definition, including axioms for vector addition and scalar multiplication.
2.  **Basis and Coordinates:** Know what a basis is, and how to express any vector as a unique linear combination of basis vectors (i.e., find its coordinates).
3.  **Linear Transformations:** Understand the definition of a linear transformation $T: V \to W$, specifically the properties $T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ and $T(c\mathbf{v}) = cT(\mathbf{v})$.
4.  **Matrix-Vector Multiplication:** Be fluent with the mechanics of multiplying a matrix by a column vector.

## How to study it (step by step)
1.  **Revisit Linearity.** Write down the two properties of a linear transformation. Convince yourself that if you know where a transformation sends the basis vectors, say $\mathbf{e}_1$ and $\mathbf{e}_2$, you can find where it sends *any* vector $\mathbf{v} = c_1\mathbf{e}_1 + c_2\mathbf{e}_2$ by using those properties.
2.  **Derive the Standard Matrix.** Let $T: \mathbb{R}^n \to \mathbb{R}^m$ be a linear transformation. Take an arbitrary vector $\mathbf{x} \in \mathbb{R}^n$ and write it in terms of the standard basis: $\mathbf{x} = x_1\mathbf{e}_1 + x_2\mathbf{e}_2 + \dots + x_n\mathbf{e}_n$. Apply $T$ to $\mathbf{x}$ and use linearity to show that $T(\mathbf{x}) = x_1T(\mathbf{e}_1) + x_2T(\mathbf{e}_2) + \dots + x_nT(\mathbf{e}_n)$. Recognize this as the matrix-vector product $[T(\mathbf{e}_1) \ | \ T(\mathbf{e}_2) \ | \ \dots \ | \ T(\mathbf{e}_n)] \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}$. This proves *why* the columns of the matrix are the images of the basis vectors.
3.  **Compute a 2D Example.** Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be the transformation that reflects vectors across the y-axis. Find $T(\mathbf{e}_1) = T(1,0)$ and $T(\mathbf{e}_2) = T(0,1)$. Use these resulting vectors as the columns to build the matrix $A$. Test it on a vector like $\mathbf{v} = (2,3)$. Does $A\mathbf{v}$ give the correct reflected vector $(-2,3)$?
4.  **Generalize to Arbitrary Bases.** Now consider $T: V \to W$. Let $\mathcal{B} = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ be a basis for $V$ and $\mathcal{C} = \{\mathbf{c}_1, \dots, \mathbf{c}_m\}$ be a basis for $W$. The matrix of $T$ relative to these bases, denoted $[T]_{\mathcal{B}}^{\mathcal{C}}$, is constructed by finding where $T$ sends each basis vector from $\mathcal{B}$, and then finding the coordinates of the resulting vector in the basis $\mathcal{C}$. The $j$-th column of the matrix is $[T(\mathbf{b}_j)]_{\mathcal{C}}$.
5.  **Work a Non-Standard Example.** Let $D: \mathbb{P}_2 \to \mathbb{P}_1$ be the differentiation operator, where $\mathbb{P}_k$ is the space of polynomials of degree at most $k$. Use the basis $\mathcal{B} = \{1, t, t^2\}$ for $\mathbb{P}_2$ and $\mathcal{C} = \{1, t\}$ for $\mathbb{P}_1$. Find the matrix of $D$ by differentiating each basis vector in $\mathcal{B}$ and finding its coordinates in $\mathcal{C}$.

## Key ideas, with intuition
1.  **A linear transformation is fully determined by its action on a basis.** Imagine a flexible grid. If you know how the two primary grid vectors ($\mathbf{e}_1$ and $\mathbf{e}_2$) are stretched, sheared, or rotated, you automatically know how the entire grid deforms. The transformation of any other vector is just a scaled combination of how those basis vectors transformed.
2.  **The columns of the matrix are the images of the domain's basis vectors, expressed in the codomain's basis.** This is the central, constructive idea. The matrix is a lookup table. The first column tells you exactly where the first basis vector lands. The second column tells you where the second basis vector lands, and so on.
    $$
    A = \begin{bmatrix} | & | & & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) & \dots & T(\mathbf{e}_n) \\ | & | & & | \end{bmatrix}
    $$
3.  **Matrix multiplication is the implementation of the transformation.** The abstract idea $T(\mathbf{x})$ is a function call. The concrete calculation $A\mathbf{x}$ is the arithmetic that produces the output vector. This is why we do it: to turn abstract geometric functions into something a computer can execute with floating-point operations.

## Worked example
Let's find the standard matrix for the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ that projects any vector orthogonally onto the line $y = \frac{1}{2}x$.

**Step 1: Identify the domain, codomain, and standard basis.**
The domain and codomain are both $\mathbb{R}^2$. The standard basis for the domain is $\mathcal{E} = \{\mathbf{e}_1, \mathbf{e}_2\}$, where $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.

**Step 2: Find the image of each basis vector under the transformation.**
The formula for projecting a vector $\mathbf{u}$ onto a vector $\mathbf{a}$ is $\text{proj}_{\mathbf{a}}\mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{a}}{\|\mathbf{a}\|^2}\mathbf{a}$. The line $y = \frac{1}{2}x$ is spanned by the direction vector $\mathbf{a} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

*   **Find $T(\mathbf{e}_1)$:** Project $\mathbf{e}_1$ onto $\mathbf{a}$.
    $$
    T(\mathbf{e}_1) = \text{proj}_{\mathbf{a}}\mathbf{e}_1 = \frac{\begin{pmatrix} 1 \\ 0 \end{pmatrix} \cdot \begin{pmatrix} 2 \\ 1 \end{pmatrix}}{\left\|\begin{pmatrix} 2 \\ 1 \end{pmatrix}\right\|^2} \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \frac{1(2) + 0(1)}{2^2 + 1^2} \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \frac{2}{5} \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 4/5 \\ 2/5 \end{pmatrix}
    $$
*   **Find $T(\mathbf{e}_2)$:** Project $\mathbf{e}_2$ onto $\mathbf{a}$.
    $$
    T(\mathbf{e}_2) = \text{proj}_{\mathbf{a}}\mathbf{e}_2 = \frac{\begin{pmatrix} 0 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 2 \\ 1 \end{pmatrix}}{\left\|\begin{pmatrix} 2 \\ 1 \end{pmatrix}\right\|^2} \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \frac{0(2) + 1(1)}{5} \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \frac{1}{5} \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 2/5 \\ 1/5 \end{pmatrix}
    $$

**Step 3: Construct the matrix using the results as columns.**
The matrix $A$ has $T(\mathbf{e}_1)$ as its first column and $T(\mathbf{e}_2)$ as its second column.
$$
A = [T(\mathbf{e}_1) \ | \ T(\mathbf{e}_2)] = \begin{pmatrix} 4/5 & 2/5 \\ 2/5 & 1/5 \end{pmatrix}
$$

**Reflection:**
Step 1 established our frame of reference (the standard basis). Step 2 performed the core task: finding out where this specific transformation sends those reference vectors. This required a geometric formula from earlier vector mathematics. Step 3 was the direct application of the main theorem: the images of the basis vectors *are* the columns of the matrix. The resulting matrix $A$ now fully encodes the projection; multiplying any vector $\mathbf{v} \in \mathbb{R}^2$ by $A$ will give its projection onto the line $y=\frac{1}{2}x$.

## Diagrams
Here is a diagram showing how the standard basis vectors in $\mathbb{R}^2$ are mapped by a generic linear transformation $T$. The entire grid of space deforms according to how these two vectors are transformed.

```text
       y                                     y
       ^                                     ^
       |                                     |
       |     e2=(0,1)                        |         T(e2)
       |       /                             |       /
       *----->e1=(1,0) --x                   *----->T(e1) --x
      /                                     /
     /                                     /

     (Before Transformation)               (After Transformation T)
     Standard Grid                         Deformed Grid
```

The key insight is that the vectors $T(\mathbf{e}_1)$ and $T(\mathbf{e}_2)$ define the new "grid lines" for the transformed space. Any vector $\mathbf{v} = x\mathbf{e}_1 + y\mathbf{e}_2$ gets mapped to $T(\mathbf{v}) = xT(\mathbf{e}_1) + yT(\mathbf{e}_2)$, which is easy to find on the new grid.

## Memory technique — remember this forever
1.  **The Story:** Imagine you're giving instructions to a robot arm that can only understand two commands: "Go to location A" and "Go to location B". Your basis vectors, $\mathbf{e}_1$ and $\mathbf{e}_2$, are your fundamental instructions. A linear transformation is a "re-programming" of the robot. To re-program it, you just need to tell it the *new* locations for A and B. These new locations are $T(\mathbf{e}_1)$ and $T(\mathbf{e}_2)$. You write these new coordinates down in a list. That list is your matrix. The first column is the new location A, the second column is the new location B.

2.  **Must Overlearn:**
    *   The matrix $A$ for a linear transformation $T$ with respect to the standard basis is:
        $$A = \begin{bmatrix} | & | & & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) & \dots & T(\mathbf{e}_n) \\ | & | & & | \end{bmatrix}$$
    *   The action of the transformation is matrix multiplication:
        $$T(\mathbf{x}) = A\mathbf{x}$$

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the main formula at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with a vector $\mathbf{x}$ in the domain $\mathbb{R}^n$.
    *   Write it as a linear combination of standard basis vectors: $\mathbf{x} = x_1\mathbf{e}_1 + x_2\mathbf{e}_2 + \dots + x_n\mathbf{e}_n$.
    *   Apply the transformation $T$: $T(\mathbf{x}) = T(x_1\mathbf{e}_1 + \dots + x_n\mathbf{e}_n)$.
    *   Use the definition of linearity: $T(\mathbf{x}) = x_1T(\mathbf{e}_1) + x_2T(\mathbf{e}_2) + \dots + x_nT(\mathbf{e}_n)$.
    *   Recognize that this last expression is the definition of a matrix-vector product. The vectors are $T(\mathbf{e}_i)$ and the scalars are the components of $\mathbf{x}$. This forces the matrix to be $A = [T(\mathbf{e}_1) \ \dots \ T(\mathbf{e}_n)]$. You cannot get this wrong if you follow these steps.

## Common mistakes
1.  **Putting Transformed Vectors in Rows.** The images of the basis vectors, $T(\mathbf{e}_i)$, are column vectors. They form the *columns* of the matrix, not the rows.
2.  **Forgetting Basis Dependence.** The matrix for a given transformation is not unique; it depends entirely on the choice of basis for the domain and codomain. The "standard matrix" is just the one corresponding to the standard bases.
3.  **Confusing the Transformation and the Matrix.** $T$ is the abstract function (the geometric idea, like "rotation"). $A$ is its representation in a specific coordinate system. They are not the same thing, although we often use them interchangeably once a basis is fixed.

## Self-check
1.  Let $T: \mathbb{R}^3 \to \mathbb{R}^2$ be a linear transformation defined by $T(x, y, z) = (x - 2y, z + y)$. Find the standard matrix representation of $T$.
2.  Let $R_\theta: \mathbb{R}^2 \to \mathbb{R}^2$ be the linear transformation that rotates a vector counter-clockwise by an angle $\theta$. Find its standard matrix representation by determining where it sends $\mathbf{e}_1$ and $\mathbf{e}_2$.
3.  Let $V$ be the vector space of $2 \times 2$ symmetric matrices. Let $T: V \to \mathbb{P}_2$ be a linear transformation defined by $T\left(\begin{pmatrix} a & b \\ b & c \end{pmatrix}\right) = (a+c)t^2 + bt + a$. Find the matrix for $T$ with respect to the basis $\mathcal{B} = \left\{\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}\right\}$ for $V$ and the standard basis $\mathcal{C} = \{1, t, t^2\}$ for $\mathbb{P}_2$.