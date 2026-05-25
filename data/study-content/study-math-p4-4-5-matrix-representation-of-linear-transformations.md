## 1. What it is — in plain English

Imagine you have a machine that takes a point in space (like an address on a map) and moves it to a new location. This machine might rotate the point, stretch it, or simply shift it. In mathematics, we call such a machine a "transformation."

Now, imagine this machine is very specific: it only moves points in a "straightforward" way. This means it doesn't bend lines into curves, and it always keeps the origin (the point (0,0,0)) fixed. These special, well-behaved transformations are called "linear transformations."

A "matrix representation" is simply a concise recipe or instruction manual for one of these linear transformation machines. Instead of describing the movement in words or complex equations, we write down a grid of numbers (a matrix) that perfectly captures how the machine works. When you want to transform a point, you just follow a specific multiplication rule with this matrix and your point's coordinates.

So, in essence, a matrix is just a numerical shorthand for a linear transformation. It's a way to turn an abstract idea of "moving things around" into a concrete, calculable form that computers (and humans!) can easily work with.

## 2. Why it matters — real-world applications

The matrix representation of linear transformations is not just an abstract mathematical concept; it's a fundamental tool with widespread applications across science, engineering, and technology.

1.  **Computer Graphics and Animation (e.g., Pixar, NVIDIA):** Every time you see a 3D object rotate, scale, or translate on a screen, linear transformations are at work. A 3D model is a collection of points (vertices). To rotate the model, a graphics card applies a rotation matrix to every vertex. To zoom in, a scaling matrix is used. Even complex operations like perspective projection (making distant objects appear smaller) are often handled by matrices (specifically, projection matrices within a larger transformation pipeline). Companies like Pixar use these transformations extensively to animate characters and environments, while NVIDIA designs hardware (GPUs) optimized to perform these matrix operations at incredibly high speeds.

2.  **Robotics and Autonomous Systems (e.g., Boston Dynamics, self-driving cars):** Robots need to understand their own movements and the positions of objects in their environment. This involves numerous coordinate transformations. For instance, a robot arm's movement from its base to its gripper tip is described by a chain of transformations (rotations and translations) between each joint's coordinate system. Matrix representations allow engineers to precisely calculate the robot's end-effector position and orientation, plan collision-free paths, and interpret sensor data from cameras or LiDAR, transforming it from the sensor's frame of reference to the robot's or the world's frame.

3.  **Machine Learning and Data Science (e.g., Google's AI, financial modeling):** Many algorithms in machine learning rely heavily on linear algebra. In neural networks, each "layer" often performs a linear transformation (matrix multiplication) on its input data, followed by a non-linear activation. Techniques like Principal Component Analysis (PCA), used for dimensionality reduction, involve finding a transformation matrix that projects high-dimensional data onto a lower-dimensional subspace while preserving as much variance as possible. This is crucial for processing large datasets, identifying patterns, and building efficient predictive models, from image recognition to financial forecasting.

4.  **Physics and Engineering (e.g., Aerospace, Quantum Mechanics):** In physics, transformations are used to describe how physical quantities change under different conditions or in different reference frames. For example, in continuum mechanics, the stress and strain experienced by materials (like an airplane wing) are represented by tensors, which are essentially multi-dimensional matrices. Linear transformations are used to analyze how these stresses and strains change when viewed from different orientations. In quantum mechanics, the evolution of a quantum system is governed by linear operators, which are often represented by matrices, particularly in finite-dimensional Hilbert spaces.

## 3. Prerequisites — what you must know first

Before diving deep into matrix representations, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, it's highly recommended to pause and review them first.

*   **Vectors:**
    *   **Definition:** An ordered list of numbers (e.g., $(x,y)$ or $(x,y,z)$) representing a quantity with both magnitude and direction.
    *   **Vector Addition:** How to add two vectors component-wise.
    *   **Scalar Multiplication:** How to multiply a vector by a single number (scalar), scaling its magnitude.
*   **Vector Spaces:**
    *   **Definition:** A set of vectors that satisfies certain axioms (closure under addition and scalar multiplication, existence of zero vector, etc.). Think of $\mathbb{R}^2$ (the plane) or $\mathbb{R}^3$ (3D space) as common examples.
    *   **Basis:** A set of linearly independent vectors that span the entire vector space. Any vector in the space can be uniquely written as a linear combination of these basis vectors.
    *   **Dimension:** The number of vectors in any basis for a given vector space.
*   **Linear Independence:** A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others.
*   **Span:** The set of all possible linear combinations of a given set of vectors.
*   **Linear Transformations:**
    *   **Definition:** A function $T: V \to W$ between two vector spaces $V$ and $W$ that preserves vector addition and scalar multiplication. That is, for any vectors $\mathbf{u}, \mathbf{v} \in V$ and any scalar $c$:
        1.  $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ (Additivity)
        2.  $T(c\mathbf{u}) = cT(\mathbf{u})$ (Homogeneity)
    *   **Examples:** Common linear transformations include rotations, reflections, scalings, and projections through the origin.
*   **Matrix Multiplication:** How to multiply a matrix by a vector, and how to multiply two matrices together. You should be comfortable with the "row-column" rule.
*   **Identity Matrix:** A square matrix with ones on the main diagonal and zeros elsewhere, which leaves vectors unchanged upon multiplication.

## 4. The core idea — step by step

Let's build the concept of matrix representation from the ground up, focusing on intuition first, then formalizing it. We'll primarily consider transformations between $\mathbb{R}^n$ and $\mathbb{R}^m$ using the standard basis, as this is the most common starting point.

### Step 1: The essence of a linear transformation

*   **Plain English:** A linear transformation is a special kind of function that moves vectors around in a "straight" and "proportional" way. It never bends lines into curves, and it always sends the zero vector to the zero vector. It's like stretching, rotating, or reflecting the entire space uniformly.

*   **Small concrete example:** Consider a transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ that doubles the x-coordinate and leaves the y-coordinate unchanged. So, $T(x,y) = (2x, y)$.
    *   Let's check additivity: $T((x_1, y_1) + (x_2, y_2)) = T(x_1+x_2, y_1+y_2) = (2(x_1+x_2), y_1+y_2) = (2x_1+2x_2, y_1+y_2)$.
        Also, $T(x_1, y_1) + T(x_2, y_2) = (2x_1, y_1) + (2x_2, y_2) = (2x_1+2x_2, y_1+y_2)$. They match!
    *   Let's check homogeneity: $T(c(x,y)) = T(cx, cy) = (2(cx), cy) = (2cx, cy)$.
        Also, $cT(x,y) = c(2x, y) = (c(2x), c(y)) = (2cx, cy)$. They match!
    *   This transformation is indeed linear. It takes a vector like $(1,3)$ to $(2,3)$, and $(2,5)$ to $(4,5)$.

*   **Formal/mathematical version:** A function $T: V \to W$ is a linear transformation if for all $\mathbf{u}, \mathbf{v} \in V$ and all scalars $c$:
    1.  $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$
    2.  $T(c\mathbf{u}) = cT(\mathbf{u})$

*   **What could go wrong:** Students often confuse linear transformations with affine transformations. An affine transformation is a linear transformation followed by a translation (a shift). For example, $T(x,y) = (x+1, y)$ is *not* linear because $T(0,0) = (1,0) \neq (0,0)$. A linear transformation *must* map the zero vector to the zero vector.

### Step 2: The power of a basis

*   **Plain English:** In any vector space, a basis is like a fundamental set of building blocks. If you have a basis, you can construct *any* vector in that space by simply scaling and adding these building blocks. For instance, in 2D space, the standard basis vectors are $(1,0)$ and $(0,1)$. Any vector $(x,y)$ can be built as $x \cdot (1,0) + y \cdot (0,1)$.

*   **Small concrete example:** In $\mathbb{R}^2$, the standard basis vectors are $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$. Any vector $\mathbf{v} = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$ can be written as $3\begin{pmatrix} 1 \\ 0 \end{pmatrix} + 5\begin{pmatrix} 0 \\ 1 \end{pmatrix}$. The numbers $3$ and $5$ are called the coordinates of $\mathbf{v}$ with respect to the standard basis.

*   **Formal/mathematical version:** If $B = \{\mathbf{b}_1, \mathbf{b}_2, \dots, \mathbf{b}_n\}$ is a basis for a vector space $V$, then for any vector $\mathbf{v} \in V$, there exist unique scalars $c_1, c_2, \dots, c_n$ such that:
    $$ \mathbf{v} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \dots + c_n\mathbf{b}_n $$
    The column vector $[\mathbf{v}]_B = \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix}$ is the coordinate vector of $\mathbf{v}$ relative to the basis $B$.

*   **What could go wrong:** Students might forget that a basis must be both linearly independent *and* span the entire space. If it's not linearly independent, the coefficients $c_i$ won't be unique. If it doesn't span the space, not all vectors can be represented.

### Step 3: How a linear transformation acts on basis vectors

*   **Plain English:** This is the crucial insight! Because a linear transformation is "straight" and "proportional," if you know where it sends each of your basic building blocks (the basis vectors), you can figure out where it sends *any* other vector. You just apply the transformation to the building blocks, and then re-assemble the target vector using the same scaling factors.

*   **Small concrete example:** Let's use our transformation $T(x,y) = (2x, y)$ from Step 1.
    *   What does $T$ do to the first standard basis vector $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$?
        $T(\mathbf{e}_1) = T(1,0) = (2(1), 0) = (2,0) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$.
    *   What does $T$ do to the second standard basis vector $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$?
        $T(\mathbf{e}_2) = T(0,1) = (2(0), 1) = (0,1) = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
    *   Now, let's take an arbitrary vector, say $\mathbf{v} = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$. We know $\mathbf{v} = 3\mathbf{e}_1 + 5\mathbf{e}_2$.
    *   Because $T$ is linear, we can write:
        $T(\mathbf{v}) = T(3\mathbf{e}_1 + 5\mathbf{e}_2) = 3T(\mathbf{e}_1) + 5T(\mathbf{e}_2)$.
    *   Substituting the transformed basis vectors:
        $T(\mathbf{v}) = 3\begin{pmatrix} 2 \\ 0 \end{pmatrix} + 5\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 6 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 5 \end{pmatrix} = \begin{pmatrix} 6 \\ 5 \end{pmatrix}$.
    *   Let's check this against the original rule: $T(3,5) = (2(3), 5) = (6,5)$. It matches perfectly!

*   **Formal/mathematical version:** Let $T: V \to W$ be a linear transformation. Let $B = \{\mathbf{b}_1, \mathbf{b}_2, \dots, \mathbf{b}_n\}$ be a basis for $V$. For any vector $\mathbf{v} \in V$, we can write $\mathbf{v} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \dots + c_n\mathbf{b}_n$.
    Then, by the linearity properties of $T$:
    $$ T(\mathbf{v}) = T(c_1\mathbf{b}_1 + \dots + c_n\mathbf{b}_n) = c_1T(\mathbf{b}_1) + \dots + c_n T(\mathbf{b}_n) $$
    This equation shows that $T(\mathbf{v})$ is completely determined by the images of the basis vectors $T(\mathbf{b}_1), \dots, T(\mathbf{b}_n)$ and the coordinates $c_1, \dots, c_n$ of $\mathbf{v}$.

*   **What could go wrong:** A common mistake is to apply the transformation to the coefficients $c_i$ instead of the basis vectors $\mathbf{b}_i$. Remember, $T$ operates on vectors, not on scalars.

### Step 4: Constructing the matrix

*   **Plain English:** Since the images of the basis vectors ($T(\mathbf{e}_1), T(\mathbf{e}_2)$, etc.) determine everything, we can just collect these transformed basis vectors into a single grid of numbers. Each transformed basis vector becomes a *column* in our matrix. This matrix is our "recipe book" for the linear transformation.

*   **Small concrete example:** Using our example $T(x,y) = (2x, y)$:
    *   We found $T(\mathbf{e}_1) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$.
    *   We found $T(\mathbf{e}_2) = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
    *   To form the matrix $A$, we simply place these transformed vectors as columns:
        $$ A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix} $$
    *   This is the matrix representation of the transformation $T$ with respect to the standard basis.

*   **Formal/mathematical version:** Let $T: \mathbb{R}^n \to \mathbb{R}^m$ be a linear transformation. Let $E = \{\mathbf{e}_1, \dots, \mathbf{e}_n\}$ be the standard basis for $\mathbb{R}^n$. The matrix $A$ for $T$ (with respect to the standard bases in both domain and codomain) is an $m \times n$ matrix whose $j$-th column is the vector $T(\mathbf{e}_j)$.
    $$ A = \begin{pmatrix} | & | & & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) & \dots & T(\mathbf{e}_n) \\ | & | & & | \end{pmatrix} $$
    More generally, if $B = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ is a basis for $V$ and $C = \{\mathbf{c}_1, \dots, \mathbf{c}_m\}$ is a basis for $W$, then the matrix $[T]_{C \leftarrow B}$ has its $j$-th column equal to the coordinate vector $[T(\mathbf{b}_j)]_C$.

*   **What could go wrong:** The most common mistake here is putting the transformed basis vectors as *rows* instead of *columns*. Always remember: **columns are transformed basis vectors.** Another trap is forgetting that the basis matters; if you use a non-standard basis, the matrix will be different.

### Step 5: Applying the matrix

*   **Plain English:** Once you have the matrix, transforming any vector is as simple as performing matrix-vector multiplication. The matrix "does" the transformation for you.

*   **Small concrete example:** We have the matrix $A = \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix}$ for $T(x,y) = (2x, y)$.
    Let's transform the vector $\mathbf{v} = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$ using this matrix.
    $$ A\mathbf{v} = \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ 5 \end{pmatrix} = \begin{pmatrix} (2)(3) + (0)(5) \\ (0)(3) + (1)(5) \end{pmatrix} = \begin{pmatrix} 6 \\ 5 \end{pmatrix} $$
    This result matches what we got in Step 3 by directly applying the definition of $T$.

*   **Formal/mathematical version:** If $A$ is the matrix representation of a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ (with respect to the standard bases), then for any vector $\mathbf{v} \in \mathbb{R}^n$:
    $$ T(\mathbf{v}) = A\mathbf{v} $$
    More generally, if $[T]_{C \leftarrow B}$ is the matrix representation of $T: V \to W$ with respect to bases $B$ and $C$, then for any $\mathbf{v} \in V$:
    $$ [T(\mathbf{v})]_C = [T]_{C \leftarrow B} [\mathbf{v}]_B $$
    This means that transforming a vector $\mathbf{v}$ in $V$ is equivalent to first finding its coordinates $[\mathbf{v}]_B$ in the basis $B$, then multiplying this coordinate vector by the matrix $[T]_{C \leftarrow B}$, and the result will be the coordinates $[T(\mathbf{v})]_C$ of the transformed vector in the basis $C$.

*   **What could go wrong:** Incorrectly performing matrix multiplication is a very common error. Double-check your arithmetic! Also, remember that the dimensions must match: an $m \times n$ matrix can only multiply an $n \times 1$ column vector. The result will be an $m \times 1$ column vector.

## 5. Worked examples — multiple, with every step shown

### Example 1: Scaling in $\mathbb{R}^2$

**Problem:** Find the matrix representation of the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ that scales the $x$-coordinate by a factor of 3 and the $y$-coordinate by a factor of 2. Then, use this matrix to transform the vector $\mathbf{v} = \begin{pmatrix} 4 \\ -1 \end{pmatrix}$.

**Given:**
*   Transformation $T(x,y) = (3x, 2y)$.
*   Vector $\mathbf{v} = \begin{pmatrix} 4 \\ -1 \end{pmatrix}$.

**What we want:**
*   The $2 \times 2$ matrix $A$ representing $T$.
*   The transformed vector $T(\mathbf{v})$ using matrix multiplication.

**Step-by-step solution:**

1.  **Identify the standard basis vectors for $\mathbb{R}^2$**:
    $$ \mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \quad \text{and} \quad \mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} $$
    *Explanation:* These are the fundamental building blocks of $\mathbb{R}^2$. We need to see where the transformation sends them.

2.  **Apply the transformation $T$ to each standard basis vector**:
    *   For $\mathbf{e}_1$:
        $$ T(\mathbf{e}_1) = T(1,0) = (3 \cdot 1, 2 \cdot 0) = (3,0) = \begin{pmatrix} 3 \\ 0 \end{pmatrix} $$
        *Explanation:* We substitute $x=1$ and $y=0$ into the rule $T(x,y) = (3x, 2y)$.
    *   For $\mathbf{e}_2$:
        $$ T(\mathbf{e}_2) = T(0,1) = (3 \cdot 0, 2 \cdot 1) = (0,2) = \begin{pmatrix} 0 \\ 2 \end{pmatrix} $$
        *Explanation:* We substitute $x=0$ and $y=1$ into the rule $T(x,y) = (3x, 2y)$.

3.  **Construct the matrix $A$ by placing the transformed basis vectors as columns**:
    $$ A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{pmatrix} = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix} $$
    *Explanation:* The first column of $A$ is $T(\mathbf{e}_1)$, and the second column is $T(\mathbf{e}_2)$. This is the definition of the matrix representation for $T$ with respect to the standard basis.

4.  **Use the matrix $A$ to transform the vector $\mathbf{v}$**:
    $$ T(\mathbf{v}) = A\mathbf{v} = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 4 \\ -1 \end{pmatrix} $$
    *Explanation:* Now that we have the matrix, we can find the image of any vector by performing matrix-vector multiplication.

5.  **Perform the matrix multiplication**:
    $$ A\mathbf{v} = \begin{pmatrix} (3)(4) + (0)(-1) \\ (0)(4) + (2)(-1) \end{pmatrix} = \begin{pmatrix} 12 + 0 \\ 0 - 2 \end{pmatrix} = \begin{pmatrix} 12 \\ -2 \end{pmatrix} $$
    *Explanation:* Multiply the first row of $A$ by the column vector $\mathbf{v}$ to get the first component of the result. Multiply the second row of $A$ by the column vector $\mathbf{v}$ to get the second component.

**Final Answer:**
The matrix representation of $T$ is $\boxed{\begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}}$.
The transformed vector is $\boxed{\begin{pmatrix} 12 \\ -2 \end{pmatrix}}$.

**Reflection:** This example was straightforward because the transformation directly scaled the standard basis vectors along their axes. The resulting matrix is a diagonal matrix, which is typical for pure scaling transformations.

---

### Example 2: Rotation in $\mathbb{R}^2$

**Problem:** Find the matrix representation of the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ that rotates vectors counter-clockwise by an angle of $\theta = 90^\circ$ (or $\frac{\pi}{2}$ radians). Then, use this matrix to transform the vector $\mathbf{v} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

**Given:**
*   Transformation $T$ is a counter-clockwise rotation by $\theta = 90^\circ$.
*   Vector $\mathbf{v} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

**What we want:**
*   The $2 \times 2$ matrix $A$ representing $T$.
*   The transformed vector $T(\mathbf{v})$ using matrix multiplication.

**Step-by-step solution:**

1.  **Identify the standard basis vectors for $\mathbb{R}^2$**:
    $$ \mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \quad \text{and} \quad \mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} $$
    *Explanation:* We need to see where these fundamental vectors go after rotation.

2.  **Apply the transformation $T$ to each standard basis vector**:
    *   For $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$:
        Rotating $(1,0)$ counter-clockwise by $90^\circ$ moves it to the positive $y$-axis.
        $$ T(\mathbf{e}_1) = \begin{pmatrix} 0 \\ 1 \end{pmatrix} $$
        *Explanation:* Visually, if you start at $(1,0)$ on the x-axis and rotate $90^\circ$ counter-clockwise, you end up at $(0,1)$ on the y-axis.
    *   For $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$:
        Rotating $(0,1)$ counter-clockwise by $90^\circ$ moves it to the negative $x$-axis.
        $$ T(\mathbf{e}_2) = \begin{pmatrix} -1 \\ 0 \end{pmatrix} $$
        *Explanation:* Visually, if you start at $(0,1)$ on the y-axis and rotate $90^\circ$ counter-clockwise, you end up at $(-1,0)$ on the x-axis.

3.  **Construct the matrix $A$ by placing the transformed basis vectors as columns**:
    $$ A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} $$
    *Explanation:* The first column is the image of $\mathbf{e}_1$, and the second column is the image of $\mathbf{e}_2$.

4.  **Use the matrix $A$ to transform the vector $\mathbf{v}$**:
    $$ T(\mathbf{v}) = A\mathbf{v} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix} $$
    *Explanation:* We apply the rotation matrix to the given vector $\mathbf{v}$.

5.  **Perform the matrix multiplication**:
    $$ A\mathbf{v} = \begin{pmatrix} (0)(1) + (-1)(0) \\ (1)(1) + (0)(0) \end{pmatrix} = \begin{pmatrix} 0 + 0 \\ 1 + 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix} $$
    *Explanation:* Standard matrix-vector multiplication.

**Final Answer:**
The matrix representation of $T$ (90-degree counter-clockwise rotation) is $\boxed{\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}}$.
The transformed vector is $\boxed{\begin{pmatrix} 0 \\ 1 \end{pmatrix}}$.

**Reflection:** This example demonstrates how geometric transformations like rotations can be elegantly captured by matrices. The result for $\mathbf{v}=(1,0)$ makes sense: rotating $(1,0)$ by $90^\circ$ counter-clockwise should indeed yield $(0,1)$. (For a general rotation by $\theta$, the matrix is $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$. Plugging in $\theta = 90^\circ$ gives $\cos(90^\circ)=0$ and $\sin(90^\circ)=1$, yielding the same matrix).

---

### Example 3: Projection from $\mathbb{R}^3$ to $\mathbb{R}^2$

**Problem:** Find the matrix representation of the linear transformation $T: \mathbb{R}^3 \to \mathbb{R}^2$ that projects a 3D vector $(x,y,z)$ onto the $xy$-plane by simply dropping the $z$-coordinate. Then, use this matrix to transform the vector $\mathbf{v} = \begin{pmatrix} 5 \\ -2 \\ 7 \end{pmatrix}$.

**Given:**
*   Transformation $T(x,y,z) = (x,y)$.
*   Vector $\mathbf{v} = \begin{pmatrix} 5 \\ -2 \\ 7 \end{pmatrix}$.

**What we want:**
*   The $2 \times 3$ matrix $A$ representing $T$.
*   The transformed vector $T(\mathbf{v})$ using matrix multiplication.

**Step-by-step solution:**

1.  **Identify the standard basis vectors for $\mathbb{R}^3$**:
    $$ \mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \quad \mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}, \quad \text{and} \quad \mathbf{e}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} $$
    *Explanation:* We are transforming from $\mathbb{R}^3$, so we need its three standard basis vectors.

2.  **Apply the transformation $T$ to each standard basis vector**:
    *   For $\mathbf{e}_1$:
        $$ T(\mathbf{e}_1) = T(1,0,0) = (1,0) = \begin{pmatrix} 1 \\ 0 \end{pmatrix} $$
        *Explanation:* The rule $T(x,y,z)=(x,y)$ means we take the first two components.
    *   For $\mathbf{e}_2$:
        $$ T(\mathbf{e}_2) = T(0,1,0) = (0,1) = \begin{pmatrix} 0 \\ 1 \end{pmatrix} $$
        *Explanation:* Same rule, applied to $\mathbf{e}_2$.
    *   For $\mathbf{e}_3$:
        $$ T(\mathbf{e}_3) = T(0,0,1) = (0,0) = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
        *Explanation:* The $z$-coordinate (which is 1 here) is dropped, resulting in the zero vector in $\mathbb{R}^2$.

3.  **Construct the matrix $A$ by placing the transformed basis vectors as columns**:
    Since $T: \mathbb{R}^3 \to \mathbb{R}^2$, the matrix $A$ will be $2 \times 3$ (rows for codomain dimension, columns for domain dimension).
    $$ A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) & T(\mathbf{e}_3) \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix} $$
    *Explanation:* Each column of $A$ is one of the transformed basis vectors, maintaining their order.

4.  **Use the matrix $A$ to transform the vector $\mathbf{v}$**:
    $$ T(\mathbf{v}) = A\mathbf{v} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix} \begin{pmatrix} 5 \\ -2 \\ 7 \end{pmatrix} $$
    *Explanation:* We multiply the $2 \times 3$ matrix by the $3 \times 1$ vector. The result will be a $2 \times 1$ vector.

5.  **Perform the matrix multiplication**:
    $$ A\mathbf{v} = \begin{pmatrix} (1)(5) + (0)(-2) + (0)(7) \\ (0)(5) + (1)(-2) + (0)(7) \end{pmatrix} = \begin{pmatrix} 5 + 0 + 0 \\ 0 - 2 + 0 \end{pmatrix} = \begin{pmatrix} 5 \\ -2 \end{pmatrix} $$
    *Explanation:* Each component of the output vector is the dot product of a row of $A$ with the vector $\mathbf{v}$.

**Final Answer:**
The matrix representation of $T$ is $\boxed{\begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}}$.
The transformed vector is $\boxed{\begin{pmatrix} 5 \\ -2 \end{pmatrix}}$.

**Reflection:** This example shows that matrices can represent transformations between spaces of different dimensions. The resulting matrix is a common form for projection matrices, effectively "discarding" dimensions. The outcome for $\mathbf{v}$ is exactly what we'd expect: dropping the $z$-coordinate from $(5,-2,7)$ yields $(5,-2)$.

---

### Example 4: Transformation with a non-standard basis (Advanced)

**Problem:** Let $B = \{\mathbf{b}_1, \mathbf{b}_2\}$ be a basis for $\mathbb{R}^2$, where $\mathbf{b}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\mathbf{b}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$. Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be a linear transformation such that $T(\mathbf{b}_1) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$ and $T(\mathbf{b}_2) = \begin{pmatrix} 0 \\ 4 \end{pmatrix}$. Find the matrix representation of $T$ with respect to the standard basis $E = \{\mathbf{e}_1, \mathbf{e}_2\}$ for both the domain and codomain. Then, use this matrix to transform the vector $\mathbf{v} = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$.

**Given:**
*   Basis $B = \{\mathbf{b}_1, \mathbf{b}_2\}$ where $\mathbf{b}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\mathbf{b}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.
*   Transformation images of basis vectors: $T(\mathbf{b}_1) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$ and $T(\mathbf{b}_2) = \begin{pmatrix} 0 \\ 4 \end{pmatrix}$.
*   Vector $\mathbf{v} = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$.

**What we want:**
*   The matrix $A$ representing $T$ with respect to the standard basis (i.e., $A = [T]_{E \leftarrow E}$).
*   The transformed vector $T(\mathbf{v})$ using matrix multiplication.

**Step-by-step solution:**

1.  **Understand what the matrix $A = [T]_{E \leftarrow E}$ means**:
    This matrix has columns $T(\mathbf{e}_1)$ and $T(\mathbf{e}_2)$, where $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ are the standard basis vectors.
    *Explanation:* The problem asks for the standard matrix, so we need to find where $T$ sends the *standard* basis vectors, not the given basis $B$.

2.  **Express the standard basis vectors in terms of the given basis $B$**:
    We need to find $c_1, c_2$ such that $\mathbf{e}_1 = c_1\mathbf{b}_1 + c_2\mathbf{b}_2$, and similarly for $\mathbf{e}_2$.
    *   For $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$:
        $$ \begin{pmatrix} 1 \\ 0 \end{pmatrix} = c_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} \implies \begin{cases} c_1 + c_2 = 1 \\ c_1 - c_2 = 0 \end{cases} $$
        Adding the two equations: $2c_1 = 1 \implies c_1 = 1/2$.
        Substituting $c_1 = 1/2$ into $c_1 - c_2 = 0 \implies 1/2 - c_2 = 0 \implies c_2 = 1/2$.
        So, $\mathbf{e}_1 = \frac{1}{2}\mathbf{b}_1 + \frac{1}{2}\mathbf{b}_2$.
        *Explanation:* We are essentially finding the coordinates of $\mathbf{e}_1$ with respect to basis $B$.
    *   For $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$:
        $$ \begin{pmatrix} 0 \\ 1 \end{pmatrix} = d_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + d_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} \implies \begin{cases} d_1 + d_2 = 0 \\ d_1 - d_2 = 1 \end{cases} $$
        Adding the two equations: $2d_1 = 1 \implies d_1 = 1/2$.
        Substituting $d_1 = 1/2$ into $d_1 + d_2 = 0 \implies 1/2 + d_2 = 0 \implies d_2 = -1/2$.
        So, $\mathbf{e}_2 = \frac{1}{2}\mathbf{b}_1 - \frac{1}{2}\mathbf{b}_2$.
        *Explanation:* Similarly, finding the coordinates of $\mathbf{e}_2$ with respect to basis $B$.

3.  **Apply the linear transformation $T$ to $\mathbf{e}_1$ and $\mathbf{e}_2$**:
    *   Using linearity for $T(\mathbf{e}_1)$:
        $$ T(\mathbf{e}_1) = T\left(\frac{1}{2}\mathbf{b}_1 + \frac{1}{2}\mathbf{b}_2\right) = \frac{1}{2}T(\mathbf{b}_1) + \frac{1}{2}T(\mathbf{b}_2) $$
        Substitute the given values for $T(\mathbf{b}_1)$ and $T(\mathbf{b}_2)$:
        $$ T(\mathbf{e}_1) = \frac{1}{2}\begin{pmatrix} 2 \\ 0 \end{pmatrix} + \frac{1}{2}\begin{pmatrix} 0 \\ 4 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 2 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \end{pmatrix} $$
        *Explanation:* Since $T$ is linear, we can "distribute" it over the linear combination of basis vectors.
    *   Using linearity for $T(\mathbf{e}_2)$:
        $$ T(\mathbf{e}_2) = T\left(\frac{1}{2}\mathbf{b}_1 - \frac{1}{2}\mathbf{b}_2\right) = \frac{1}{2}T(\mathbf{b}_1) - \frac{1}{2}T(\mathbf{b}_2) $$
        Substitute the given values for $T(\mathbf{b}_1)$ and $T(\mathbf{b}_2)$:
        $$ T(\mathbf{e}_2) = \frac{1}{2}\begin{pmatrix} 2 \\ 0 \end{pmatrix} - \frac{1}{2}\begin{pmatrix} 0 \\ 4 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} - \begin{pmatrix} 0 \\ 2 \end{pmatrix} = \begin{pmatrix} 1 \\ -2 \end{pmatrix} $$
        *Explanation:* Same principle of linearity applies.

4.  **Construct the standard matrix $A$**:
    $$ A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 2 & -2 \end{pmatrix} $$
    *Explanation:* The columns of the standard matrix are the images of the standard basis vectors under the transformation.

5.  **Use the matrix $A$ to transform the vector $\mathbf{v} = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$**:
    $$ T(\mathbf{v}) = A\mathbf{v} = \begin{pmatrix} 1 & 1 \\ 2 & -2 \end{pmatrix} \begin{pmatrix} 2 \\ 0 \end{pmatrix} $$
    *Explanation:* Now we have the standard matrix, we can apply it to any vector in $\mathbb{R}^2$.

6.  **Perform the matrix multiplication**:
    $$ A\mathbf{v} = \begin{pmatrix} (1)(2) + (1)(0) \\ (2)(2) + (-2)(0) \end{pmatrix} = \begin{pmatrix} 2 + 0 \\ 4 + 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 4 \end{pmatrix} $$
    *Explanation:* Standard matrix-vector multiplication.

**Final Answer:**
The matrix representation of $T$ with respect to the standard basis is $\boxed{\begin{pmatrix} 1 & 1 \\ 2 & -2 \end{pmatrix}}$.
The transformed vector is $\boxed{\begin{pmatrix} 2 \\ 4 \end{pmatrix}}$.

**Reflection:** This example was harder because the transformation was defined based on a *non-standard* basis, but we were asked for the *standard* matrix. The key was to express the standard basis vectors as linear combinations of the given basis vectors, then use the linearity of $T$ to find their images. This highlights the importance of understanding how transformations interact with different bases.

## 6. Common mistakes and traps

1.  **Confusing rows and columns when constructing the matrix:** The images of the basis vectors always form the *columns* of the transformation matrix, not the rows. This is a very common error.
    *   *Why it happens:* Students might intuitively think of rows corresponding to input dimensions or simply forget the convention.
2.  **Forgetting the linearity conditions:** Assuming a transformation is linear when it isn't. For example, $T(x,y) = (x+1, y)$ is not linear because $T(0,0) \neq (0,0)$. $T(x,y) = (x^2, y)$ is not linear because $T(c\mathbf{v}) \neq cT(\mathbf{v})$.
    *   *Why it happens:* A superficial understanding of "linear" might lead students to think any simple algebraic expression is linear.
3.  **Not accounting for different bases in domain/codomain:** If the problem specifies a non-standard basis for the input space, or if the output vectors are expressed in a non-standard basis, you must perform a change of basis. The standard matrix assumes the standard basis for both.
    *   *Why it happens:* Students often default to the standard basis without realizing the problem implies or requires a different one, especially when dealing with $[T]_{C \leftarrow B}$ notation.
4.  **Incorrect matrix multiplication:** Simple arithmetic errors or misremembering the rules for matrix-vector or matrix-matrix multiplication.
    *   *Why it happens:* Carelessness or lack of practice. Matrix multiplication is fundamental; mistakes here cascade.
5.  **Mixing up the order of transformations:** If you have two transformations $T_1$ and $T_2$, applying $T_1$ then $T_2$ corresponds to matrix multiplication $A_2 A_1$ (where $A_1$ is the matrix for $T_1$ and $A_2$ for $T_2$). The order matters!
    *   *Why it happens:* Matrix multiplication is not commutative, so $A_1A_2 \neq A_2A_1$ in general. Students might assume the order of writing matches the order of application.
6.  **Misinterpreting the dimensions of the matrix:** An $m \times n$ matrix represents a transformation from $\mathbb{R}^n$ to $\mathbb{R}^m$. The number of columns ($n$) must match the dimension of the domain space, and the number of rows ($m$) must match the dimension of the codomain space.
    *   *Why it happens:* Confusing "rows by columns" with "domain by codomain" dimensions.

## 7. Textbook-precise explanation

Let $V$ and $W$ be finite-dimensional vector spaces over a field $\mathbb{F}$. Let $T: V \to W$ be a linear transformation.

Let $B = \{\mathbf{b}_1, \mathbf{b}_2, \dots, \mathbf{b}_n\}$ be an ordered basis for $V$, and let $C = \{\mathbf{c}_1, \mathbf{c}_2, \dots, \mathbf{c}_m\}$ be an ordered basis for $W$.

For each basis vector $\mathbf{b}_j \in B$, its image under $T$, denoted $T(\mathbf{b}_j)$, is a vector in $W$. Since $C$ is a basis for $W$, $T(\mathbf{b}_j)$ can be uniquely expressed as a linear combination of the basis vectors in $C$:

$$ T(\mathbf{b}_j) = a_{1j}\mathbf{c}_1 + a_{2j}\mathbf{c}_2 + \dots + a_{mj}\mathbf{c}_m $$

The scalars $a_{1j}, a_{2j}, \dots, a_{mj}$ are the coordinates of $T(\mathbf{b}_j)$ with respect to the basis $C$. We can write this coordinate vector as $[T(\mathbf{b}_j)]_C = \begin{pmatrix} a_{1j} \\ a_{2j} \\ \vdots \\ a_{mj} \end{pmatrix}$.

The **matrix representation of the linear transformation $T$ with respect to the bases $B$ and $C$**, denoted by $[T]_{C \leftarrow B}$, is the $m \times n$ matrix whose $j$-th column is the coordinate vector $[T(\mathbf{b}_j)]_C$.

$$ [T]_{C \leftarrow B} = \begin{pmatrix}
    a_{11} & a_{12} & \dots & a_{1n} \\
    a_{21} & a_{22} & \dots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{m1} & a_{m2} & \dots & a_{mn}
\end{pmatrix} $$

This matrix establishes a fundamental relationship between the coordinate vectors of a vector and its image under $T$. For any vector $\mathbf{v} \in V$, let $[\mathbf{v}]_B = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$ be its coordinate vector with respect to basis $B$. Then, the coordinate vector of its image $T(\mathbf{v})$ with respect to basis $C$, denoted $[T(\mathbf{v})]_C$, is given by the matrix-vector product:

$$ [T(\mathbf{v})]_C = [T]_{C \leftarrow B} [\mathbf{v}]_B $$

This equation is central to the theory of linear transformations and their matrix representations. It effectively translates the abstract action of $T$ on vectors into a concrete matrix multiplication on their coordinate representations.

**Special Case: Standard Bases**
If $V = \mathbb{R}^n$ and $W = \mathbb{R}^m$, and $B$ and $C$ are the standard bases for $\mathbb{R}^n$ and $\mathbb{R}^m$ respectively (i.e., $B = \{\mathbf{e}_1, \dots, \mathbf{e}_n\}$ and $C = \{\mathbf{e}_1, \dots, \mathbf{e}_m\}$), then the coordinate vector of any vector is simply the vector itself. In this case, the matrix $[T]_{C \leftarrow B}$ is commonly denoted just as $A$, and its columns are simply $T(\mathbf{e}_1), T(\mathbf{e}_2), \dots, T(\mathbf{e}_n)$. The relationship simplifies to $T(\mathbf{v}) = A\mathbf{v}$.

**Citations:**
*   Lay, David C., Lay, Steven R., & McDonald, Judi J. (2020). *Linear Algebra and Its Applications* (6th ed.). Pearson. (Refer to Chapter 4, Section 4.3 or 4.7 for detailed discussion).
*   Strang, Gilbert. (2016). *Introduction to Linear Algebra* (5th ed.). Wellesley-Cambridge Press. (Refer to Chapter 2, Section 2.6 or Chapter 7 for transformations and basis changes).

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the core idea: how a linear transformation $T$ maps basis vectors, and how any vector $\mathbf{v}$ is transformed by using the images of these basis vectors.

```text
       Vector Space V (Domain)                     Vector Space W (Codomain)

       Basis B = {b1, b2}                          Basis C = {c1, c2, c3}
       (Assume dim(V)=2, dim(W)=3)

       b1 = (1,0)  <-- Standard Basis in R^2
       b2 = (0,1)

       Any vector v in V:
       v = x*b1 + y*b2
       (e.g., v = 2*b1 + 3*b2)

       +-------------------------------------------------------------+
       |                                                             |
       |  Linear Transformation T: V -> W                            |
       |                                                             |
       +-------------------------------------------------------------+
             |                                              |
             |  T(b1) = a11*c1 + a21*c2 + a31*c3            |
             +---------------------------------------------> T(b1) in W
             |                                              |
             |  T(b2) = a12*c1 + a22*c2 + a32*c3            |
             +---------------------------------------------> T(b2) in W
             |                                              |
             v                                              v

       To find T(v):
       T(v) = T(x*b1 + y*b2)
            = x*T(b1) + y*T(b2)  <-- By linearity!
            = x*(a11*c1 + a21*c2 + a31*c3) + y*(a12*c1 + a22*c2 + a32*c3)

       This structure is captured by the matrix [T]_C<-B:

       [T]_C<-B = ( [T(b1)]_C  |  [T(b2)]_C )
                = ( a11  a12 )
                  ( a21  a22 )
                  ( a31  a32 )

       And the transformation of coordinates:
       [T(v)]_C = [T]_C<-B * [v]_B

       Where:
       [v]_B    = ( x )  <-- Coordinates of v in basis B
                  ( y )

       [T(v)]_C = ( a11*x + a12*y )  <-- Coordinates of T(v) in basis C
                  ( a21*x + a22*y )
                  ( a31*x + a32*y )
```

**Description for Redrawing:**
Imagine two distinct vector spaces, V and W.
1.  **Left Side (Vector Space V - Domain):** Draw a coordinate system. Mark two basis vectors, $\mathbf{b}_1$ and $\mathbf{b}_2$. Illustrate an arbitrary vector $\mathbf{v}$ as a linear combination of $\mathbf{b}_1$ and $\mathbf{b}_2$ (e.g., $\mathbf{v}$ points somewhere in the plane spanned by $\mathbf{b}_1, \mathbf{b}_2$). Label the coordinates of $\mathbf{v}$ with respect to $B$ as $[\mathbf{v}]_B = (x,y)^T$.
2.  **Right Side (Vector Space W - Codomain):** Draw another coordinate system (potentially of a different dimension, e.g., 3D if V is 2D). Mark three basis vectors, $\mathbf{c}_1, \mathbf{c}_2, \mathbf{c}_3$.
3.  **Transformation Arrows:** Draw arrows representing the linear transformation $T$:
    *   An arrow from $\mathbf{b}_1$ in $V$ to $T(\mathbf{b}_1)$ in $W$.
    *   An arrow from $\mathbf{b}_2$ in $V$ to $T(\mathbf{b}_2)$ in $W$.
    *   Illustrate $T(\mathbf{b}_1)$ and $T(\mathbf{b}_2)$ as linear combinations of $\mathbf{c}_1, \mathbf{c}_2, \mathbf{c}_3$.
4.  **The Resulting Vector:** Show how $T(\mathbf{v})$ is formed in $W$ by taking the same linear combination of $T(\mathbf{b}_1)$ and $T(\mathbf{b}_2)$ as $\mathbf{v}$ was of $\mathbf{b}_1$ and $\mathbf{b}_2$. So, $T(\mathbf{v}) = x T(\mathbf{b}_1) + y T(\mathbf{b}_2)$.
5.  **Matrix Connection:** Below this, show the matrix $[T]_{C \leftarrow B}$ being formed by stacking the coordinate vectors $[T(\mathbf{b}_1)]_C$ and $[T(\mathbf{b}_2)]_C$ as its columns. Emphasize the relationship $[T(\mathbf{v})]_C = [T]_{C \leftarrow B} [\mathbf{v}]_B$.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"Columns Are Transformed Basis Vectors" (CATBV):** This is the single most important rule for constructing the matrix of a linear transformation with respect to the standard basis. Visualize the basis vectors being "fed" into the transformation, and their "output" vectors lining up side-by-side to form the columns of the matrix.
    *   **The "Machine" Analogy:** Think of the matrix as a machine. You feed in the standard basis vectors one by one, and the machine spits out their transformed versions. You then collect these outputs and arrange them as the columns of your machine's "blueprint" (the matrix).

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   **The definition of matrix representation (CATBV):** The $j$-th column of the matrix $A$ (representing $T$ with respect to standard bases) is $T(\mathbf{e}_j)$.
        $$ A = \begin{pmatrix} | & | & & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) & \dots & T(\mathbf{e}_n) \\ | & | & & | \end{pmatrix} $$
    *   **The application rule:** $T(\mathbf{v}) = A\mathbf{v}$ (for standard bases). More generally, $[T(\mathbf{v})]_C = [T]_{C \leftarrow B} [\mathbf{v}]_B$.
    *   **The linearity conditions:** $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ and $T(c\mathbf{u}) = cT(\mathbf{u})$. These are the bedrock.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, work through all examples, and try the self-check questions.
    *   **Day 3:** Re-read "The core idea" and "Memory technique" sections. Try to re-derive the matrix for a simple rotation or scaling.
    *   **Day 7:** Attempt a more complex problem, perhaps involving a non-standard basis. Focus on recalling the CATBV rule and the general formula $[T(\mathbf{v})]_C = [T]_{C \leftarrow B} [\mathbf{v}]_B$.
    *   **Day 16:** Explain the concept of matrix representation to an imaginary friend or rubber duck. Try to articulate why it matters.
    *   **Day 35:** Review your notes. Can you derive the full concept from first principles? Can you connect it to other linear algebra topics?

4.  **The First-Principles Re-derivation Pathway:**
    If you ever forget how to construct the matrix, you can always rebuild it from these foundational ideas:
    1.  **Start with an arbitrary vector $\mathbf{v}$** in your domain vector space $V$.
    2.  **Express $\mathbf{v}$ as a linear combination of basis vectors:** Let $B = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ be the basis for $V$. Then $\mathbf{v} = c_1\mathbf{b}_1 + \dots + c_n\mathbf{b}_n$.
    3.  **Apply the linear transformation $T$ to $\mathbf{v}$:** By the linearity properties ($T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ and $T(c\mathbf{u}) = cT(\mathbf{u})$), we have $T(\mathbf{v}) = T(c_1\mathbf{b}_1 + \dots + c_n\mathbf{b}_n) = c_1T(\mathbf{b}_1) + \dots + c_n T(\mathbf{b}_n)$.
    4.  **Express each $T(\mathbf{b}_j)$ in terms of the codomain basis:** Let $C = \{\mathbf{c}_1, \dots, \mathbf{c}_m\}$ be the basis for $W$. Each $T(\mathbf{b}_j)$ is a vector in $W$, so it can be written as $T(\mathbf{b}_j) = a_{1j}\mathbf{c}_1 + \dots + a_{mj}\mathbf{c}_m$.
    5.  **Substitute and collect terms:** Substitute these expressions back into the equation for $T(\mathbf{v})$. You'll get $T(\mathbf{v}) = c_1(a_{11}\mathbf{c}_1 + \dots) + c_2(a_{12}\mathbf{c}_1 + \dots) + \dots$. Collect the coefficients for each $\mathbf{c}_i$.
    6.  **Recognize the matrix product:** You'll see that the coefficients of $\mathbf{c}_1, \dots, \mathbf{c}_m$ in the expression for $T(\mathbf{v})$ are precisely what you get from multiplying the matrix whose columns are the coordinate vectors of $T(\mathbf{b}_j)$ by the column vector of $c_j$. This re-derivation reinforces the formula $[T(\mathbf{v})