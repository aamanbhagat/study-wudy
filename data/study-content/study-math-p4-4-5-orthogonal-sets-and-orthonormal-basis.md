## 1. What it is — in plain English

Imagine you're building something with LEGOs. You want the blocks to fit together perfectly, without any awkward angles or overlaps. In mathematics, when we talk about "orthogonal sets," we're essentially talking about a collection of "building blocks" (which we call vectors) that are all perfectly "perpendicular" to each other.

Think about the corners of a room: the floor meets one wall, and that wall meets another, all at perfect right angles. If you draw lines along these edges from the corner, those lines represent vectors that are orthogonal to each other. They point in completely different, independent directions.

An "orthogonal set" is just a group of these vectors where *every single pair* of vectors in the group is perpendicular. Now, if we take these perpendicular vectors and also make sure that each one has a "standard length" – a length of exactly one unit – then we call it an "orthonormal set." It's like having those perfect LEGO blocks, but also ensuring each block is a standard size, say, one inch long.

Finally, when such a set of perfectly perpendicular, unit-length vectors is powerful enough to "build" or describe any other vector in a particular space (meaning they form a "basis"), we call it an "orthonormal basis." It's the most convenient and well-behaved set of building blocks you could ask for.

## 2. Why it matters — real-world applications

Orthogonal sets and orthonormal bases are not just abstract mathematical concepts; they are fundamental tools that underpin countless technologies and scientific advancements. Their power comes from simplifying complex problems by breaking them down into independent components.

1.  **Signal Processing and Data Compression (e.g., JPEG, MP3, 5G Communications):** When your phone plays an MP3, or you view a JPEG image, orthogonal sets are at work. Signals (like sound waves or image data) are incredibly complex. Orthogonal functions (like sines and cosines in Fourier analysis, or wavelets) form an orthonormal basis for function spaces. By projecting a complex signal onto these orthogonal components, we can represent it as a sum of simpler, independent parts. This allows for efficient compression (discarding less important components) and reconstruction, which is critical for storing and transmitting vast amounts of multimedia data. In 5G, orthogonal frequency-division multiplexing (OFDM) uses orthogonal subcarriers to transmit data efficiently without interference.

2.  **Machine Learning and Data Science (e.g., Principal Component Analysis - PCA):** In fields like genomics, finance, or image recognition, datasets often have hundreds or thousands of features (dimensions). PCA is a dimensionality reduction technique that finds new axes (principal components) along which the data varies the most. These principal components are always orthogonal to each other, forming an orthogonal basis. By projecting the high-dimensional data onto a smaller set of these orthogonal principal components, we can reduce noise, visualize complex data, and train machine learning models more efficiently, all while preserving the most important information.

3.  **Physics and Engineering (Quantum Mechanics, Structural Analysis, Robotics):**
    *   **Quantum Mechanics:** The possible states of a quantum system (like an electron's energy levels) are often described by eigenvectors of certain operators. These eigenvectors are frequently orthogonal, especially for Hermitian operators (which represent physical observables). This orthogonality ensures that different quantum states are distinct and can be measured independently, simplifying the mathematical framework of quantum theory.
    *   **Structural Analysis:** When analyzing vibrations in structures (bridges, buildings, aircraft wings), engineers often decompose complex oscillatory motions into "normal modes." These normal modes are orthogonal to each other, meaning they vibrate independently. This simplifies the analysis of how a structure responds to forces and helps in designing robust systems.
    *   **Robotics and Computer Graphics:** Orthonormal bases are essential for representing orientations and performing rotations in 3D space. Rotation matrices, which transform coordinates without stretching or shearing, are orthogonal matrices. Their columns (and rows) form orthonormal bases, making them ideal for precise control of robot arms or rendering realistic 3D scenes in games and simulations.

## 3. Prerequisites — what you must know first

Before diving deep into orthogonal sets and orthonormal bases, ensure you have a solid grasp of these foundational Linear Algebra concepts:

*   **Vectors:** An understanding of what a vector is (a quantity with magnitude and direction), how to represent it (e.g., as a column matrix or an arrow), and its components in $\mathbb{R}^n$.
*   **Vector Addition and Scalar Multiplication:** How to add two vectors and how to multiply a vector by a scalar, both geometrically and component-wise.
*   **Dot Product (Inner Product):** The definition of the dot product $\mathbf{u} \cdot \mathbf{v}$ for vectors in $\mathbb{R}^n$, its properties (commutative, distributive), and its geometric interpretation (related to the angle between vectors and projections).
*   **Vector Magnitude (Norm):** How to calculate the length or magnitude of a vector, denoted $||\mathbf{u}||$, derived from the dot product ($||\mathbf{u}|| = \sqrt{\mathbf{u} \cdot \mathbf{u}}$).
*   **Linear Independence:** The concept that a set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others.
*   **Span:** The set of all possible linear combinations of a given set of vectors, forming a subspace.
*   **Basis:** A set of vectors that is linearly independent and spans a given vector space (or subspace). This means they are the minimal set of "building blocks" needed to describe every vector in that space.
*   **Vector Space and Subspace:** The definitions and properties of vector spaces and their subsets that are also vector spaces.

If any of these concepts feel unfamiliar or shaky, pause here and review them. A strong foundation will make this topic much clearer.

## 4. The core idea — step by step

Let's break down the concepts of orthogonality and orthonormality, building from simple vector properties to full bases.

### Step 1: Orthogonality of two vectors

**Plain English:** Two vectors are "orthogonal" if they are perfectly perpendicular to each other. In 2D or 3D, this means they meet at a $90^\circ$ angle. If one vector is the zero vector, it's considered orthogonal to every other vector.

**Small concrete example:** Consider the vectors $\mathbf{u} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$ and $\mathbf{v} = \begin{pmatrix} -1 \\ 2 \end{pmatrix}$ in $\mathbb{R}^2$.
To check if they are orthogonal, we compute their dot product:
$\mathbf{u} \cdot \mathbf{v} = (2)(-1) + (1)(2) = -2 + 2 = 0$.
Since the dot product is zero, $\mathbf{u}$ and $\mathbf{v}$ are orthogonal.

**Formal/Mathematical Version:** Two vectors $\mathbf{u}$ and $\mathbf{v}$ in an inner product space (like $\mathbb{R}^n$ with the standard dot product) are said to be **orthogonal** if their inner product is zero.
$$ \mathbf{u} \cdot \mathbf{v} = 0 $$
More generally, in an abstract inner product space, we use the notation $\langle \mathbf{u}, \mathbf{v} \rangle = 0$.

**What could go wrong:**
*   Confusing the dot product with scalar multiplication or component-wise multiplication. The dot product results in a scalar, not a vector.
*   Thinking orthogonality only applies to 2D or 3D. The definition holds for vectors in $\mathbb{R}^n$.
*   Forgetting that the zero vector is orthogonal to every vector (since $\mathbf{0} \cdot \mathbf{v} = 0$).

### Step 2: Orthogonal Set of Vectors

**Plain English:** An "orthogonal set" is a collection of two or more non-zero vectors where *every distinct pair* of vectors in the set is orthogonal (perpendicular) to each other.

**Small concrete example:** Consider the set $S = \left\{ \mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3 \right\}$ where $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix}$, and $\mathbf{v}_3 = \begin{pmatrix} 0 \\ 0 \\ 3 \end{pmatrix}$ in $\mathbb{R}^3$.
We need to check all distinct pairs:
1.  $\mathbf{v}_1 \cdot \mathbf{v}_2 = (1)(0) + (0)(2) + (0)(0) = 0$. (Orthogonal)
2.  $\mathbf{v}_1 \cdot \mathbf{v}_3 = (1)(0) + (0)(0) + (0)(3) = 0$. (Orthogonal)
3.  $\mathbf{v}_2 \cdot \mathbf{v}_3 = (0)(0) + (2)(0) + (0)(3) = 0$. (Orthogonal)
Since all pairs are orthogonal, $S$ is an orthogonal set.

**Formal/Mathematical Version:** A set of non-zero vectors $S = \{ \mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k \}$ in an inner product space is called an **orthogonal set** if for every pair of distinct vectors in the set, their inner product is zero:
$$ \mathbf{v}_i \cdot \mathbf{v}_j = 0 \quad \text{whenever } i \neq j $$

**What could go wrong:**
*   Only checking a subset of the pairs. For a set with $k$ vectors, there are $\frac{k(k-1)}{2}$ pairs to check.
*   Including the zero vector in the set when discussing properties like linear independence (though the definition of an orthogonal set technically allows it, it's usually excluded for basis contexts).

### Step 3: Normalization (Unit Vectors)

**Plain English:** A "unit vector" is a vector that has a length (magnitude) of exactly 1. "Normalization" is the process of scaling any non-zero vector so that it becomes a unit vector, without changing its direction. You simply divide the vector by its own length.

**Small concrete example:** Consider the vector $\mathbf{v} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$ in $\mathbb{R}^2$.
First, find its magnitude: $||\mathbf{v}|| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.
To normalize $\mathbf{v}$, we divide it by its magnitude:
$\hat{\mathbf{v}} = \frac{1}{||\mathbf{v}||} \mathbf{v} = \frac{1}{5} \begin{pmatrix} 3 \\ 4 \end{pmatrix} = \begin{pmatrix} 3/5 \\ 4/5 \end{pmatrix}$.
Now, check the magnitude of $\hat{\mathbf{v}}$: $||\hat{\mathbf{v}}|| = \sqrt{(3/5)^2 + (4/5)^2} = \sqrt{9/25 + 16/25} = \sqrt{25/25} = \sqrt{1} = 1$. It's a unit vector.

**Formal/Mathematical Version:** For any non-zero vector $\mathbf{v}$ in an inner product space, its **norm** (or magnitude) is given by $||\mathbf{v}|| = \sqrt{\mathbf{v} \cdot \mathbf{v}}$. A vector $\mathbf{u}$ is a **unit vector** if $||\mathbf{u}|| = 1$.
To **normalize** a non-zero vector $\mathbf{v}$, we form the unit vector $\hat{\mathbf{v}}$ (often pronounced "v-hat"):
$$ \hat{\mathbf{v}} = \frac{1}{||\mathbf{v}||} \mathbf{v} $$

**What could go wrong:**
*   Forgetting to take the square root when calculating the norm.
*   Attempting to normalize the zero vector, which has zero length and thus cannot be divided by its magnitude.
*   Making calculation errors with fractions during normalization.

### Step 4: Orthonormal Set of Vectors

**Plain English:** An "orthonormal set" is an orthogonal set where, in addition to every pair being perpendicular, every single vector in the set also has a length of exactly 1 (i.e., they are all unit vectors). It's the "best behaved" kind of set.

**Small concrete example:** Let's take the orthogonal set from Step 2: $S = \left\{ \mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3 \right\}$ where $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix}$, $\mathbf{v}_3 = \begin{pmatrix} 0 \\ 0 \\ 3 \end{pmatrix}$.
We know it's orthogonal. Now let's check magnitudes:
$||\mathbf{v}_1|| = \sqrt{1^2+0^2+0^2} = 1$. (Unit vector)
$||\mathbf{v}_2|| = \sqrt{0^2+2^2+0^2} = 2$. (NOT a unit vector)
$||\mathbf{v}_3|| = \sqrt{0^2+0^2+3^2} = 3$. (NOT a unit vector)
So, $S$ is *not* an orthonormal set.
To make it orthonormal, we normalize each vector:
$\mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$
$\mathbf{u}_2 = \frac{\mathbf{v}_2}{||\mathbf{v}_2||} = \frac{1}{2} \begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$
$\mathbf{u}_3 = \frac{\mathbf{v}_3}{||\mathbf{v}_3||} = \frac{1}{3} \begin{pmatrix} 0 \\ 0 \\ 3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$
The new set $S' = \left\{ \mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3 \right\}$ is now an orthonormal set.

**Formal/Mathematical Version:** A set of vectors $S = \{ \mathbf{u}_1, \mathbf{u}_2, \dots, \mathbf{u}_k \}$ is an **orthonormal set** if it is an orthogonal set and every vector in $S$ is a unit vector. That is:
$$ \mathbf{u}_i \cdot \mathbf{u}_j = \begin{cases} 0 & \text{if } i \neq j \\ 1 & \text{if } i = j \end{cases} $$
This condition is often expressed using the Kronecker delta symbol, $\delta_{ij}$, where $\mathbf{u}_i \cdot \mathbf{u}_j = \delta_{ij}$.

**What could go wrong:**
*   Forgetting to check *both* conditions: orthogonality *and* unit length for every vector.
*   Incorrectly normalizing vectors.

### Step 5: Orthogonal Basis

**Plain English:** An "orthogonal basis" for a vector space is a basis (a set of linearly independent vectors that span the entire space) where all the basis vectors are mutually orthogonal (perpendicular). It's a special, very convenient kind of basis.

**Small concrete example:** The set $S = \left\{ \mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3 \right\}$ from Step 2, where $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix}$, and $\mathbf{v}_3 = \begin{pmatrix} 0 \\ 0 \\ 3 \end{pmatrix}$, is an orthogonal set.
Does it form a basis for $\mathbb{R}^3$? A basis for $\mathbb{R}^3$ needs 3 linearly independent vectors.
Crucial property: **Any orthogonal set of non-zero vectors is linearly independent.** Since $\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3$ are non-zero and orthogonal, they are linearly independent.
Since there are 3 linearly independent vectors in $\mathbb{R}^3$ (which has dimension 3), they automatically span $\mathbb{R}^3$.
Therefore, $S$ is an orthogonal basis for $\mathbb{R}^3$.

**Formal/Mathematical Version:** An **orthogonal basis** for a vector space $V$ is a basis for $V$ that is also an orthogonal set.
A key theorem states: If $S = \{ \mathbf{v}_1, \dots, \mathbf{v}_k \}$ is an orthogonal set of non-zero vectors, then $S$ is linearly independent.
If the dimension of $V$ is $k$, then any orthogonal set of $k$ non-zero vectors in $V$ is automatically an orthogonal basis for $V$.

**What could go wrong:**
*   Forgetting that an orthogonal set must be non-zero to guarantee linear independence.
*   Not checking if the set spans the entire space (though if the number of vectors equals the dimension of the space, linear independence implies spanning).

### Step 6: Orthonormal Basis

**Plain English:** An "orthonormal basis" is the ultimate convenience: a basis where all the basis vectors are not only mutually perpendicular but also each have a length of exactly 1. This makes calculations incredibly simple. The standard coordinate axes (x, y, z) are the most common example.

**Small concrete example:** The set $S' = \left\{ \mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3 \right\}$ from Step 4, where $\mathbf{u}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{u}_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$, and $\mathbf{u}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$, is an orthonormal set.
Since it's an orthonormal set, it's also an orthogonal set of non-zero vectors, so it's linearly independent.
As there are 3 linearly independent vectors in $\mathbb{R}^3$, they form a basis for $\mathbb{R}^3$.
Therefore, $S'$ is an orthonormal basis for $\mathbb{R}^3$. This is the standard basis!

**Formal/Mathematical Version:** An **orthonormal basis** for a vector space $V$ is a basis for $V$ that is also an orthonormal set. That is, a set $\{ \mathbf{u}_1, \dots, \mathbf{u}_n \}$ is an orthonormal basis for $V$ if:
1.  It is a basis for $V$.
2.  $\mathbf{u}_i \cdot \mathbf{u}_j = \delta_{ij}$ for all $i, j$.

**What could go wrong:**
*   Forgetting to check *both* orthogonality and unit length for all vectors.
*   Not confirming that the set spans the space (or that its size matches the dimension of the space, given linear independence).

## 5. Worked examples — multiple, with every step shown

### Example 1: Check for Orthogonality of Two Vectors

**Problem:** Determine if the vectors $\mathbf{u} = \begin{pmatrix} 3 \\ -2 \\ 1 \end{pmatrix}$ and $\mathbf{v} = \begin{pmatrix} 2 \\ 4 \\ 2 \end{pmatrix}$ are orthogonal in $\mathbb{R}^3$.

**Given:** Two vectors $\mathbf{u}$ and $\mathbf{v}$.
**Want:** To determine if $\mathbf{u} \perp \mathbf{v}$.

**Solution:**
1.  **Recall the definition of orthogonality:** Two vectors are orthogonal if their dot product is zero.
    $$ \mathbf{u} \cdot \mathbf{v} = 0 $$
2.  **Calculate the dot product of $\mathbf{u}$ and $\mathbf{v}$:** The dot product in $\mathbb{R}^3$ is calculated by multiplying corresponding components and summing the results.
    $$ \mathbf{u} \cdot \mathbf{v} = (3)(2) + (-2)(4) + (1)(2) $$
    *We are multiplying the first components, then the second components, then the third components, and adding these products together.*
3.  **Perform the multiplications:**
    $$ = 6 + (-8) + 2 $$
    *Simplifying the products.*
4.  **Perform the additions:**
    $$ = 6 - 8 + 2 = -2 + 2 = 0 $$
    *Completing the sum.*
5.  **Compare the result to the condition for orthogonality:** Since the dot product is $0$, the vectors are orthogonal.
    $$ \mathbf{u} \cdot \mathbf{v} = 0 $$

**Final Answer:**
The vectors $\mathbf{u}$ and $\mathbf{v}$ **are orthogonal**.

**Reflection:** This example was straightforward, directly applying the definition of orthogonality. The key is to correctly compute the dot product and check if it's zero.

---

### Example 2: Check if a Set is an Orthogonal Set

**Problem:** Determine if the set of vectors $S = \left\{ \mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3 \right\}$ is an orthogonal set, where $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \\ 1 \end{pmatrix}$, and $\mathbf{v}_3 = \begin{pmatrix} -1 \\ 1 \\ 2 \end{pmatrix}$.

**Given:** A set of three vectors $S$.
**Want:** To determine if $S$ is an orthogonal set.

**Solution:**
1.  **Recall the definition of an orthogonal set:** A set of non-zero vectors is orthogonal if every distinct pair of vectors in the set has a dot product of zero. We need to check $\mathbf{v}_1 \cdot \mathbf{v}_2$, $\mathbf{v}_1 \cdot \mathbf{v}_3$, and $\mathbf{v}_2 \cdot \mathbf{v}_3$.
    *There are $\frac{k(k-1)}{2}$ pairs for a set of $k$ vectors. For $k=3$, there are $\frac{3(2)}{2}=3$ pairs.*
2.  **Check $\mathbf{v}_1 \cdot \mathbf{v}_2$:**
    $$ \mathbf{v}_1 \cdot \mathbf{v}_2 = (1)(1) + (1)(-1) + (0)(1) $$
    *Multiplying corresponding components and summing them.*
    $$ = 1 - 1 + 0 = 0 $$
    *The first pair is orthogonal.*
3.  **Check $\mathbf{v}_1 \cdot \mathbf{v}_3$:**
    $$ \mathbf{v}_1 \cdot \mathbf{v}_3 = (1)(-1) + (1)(1) + (0)(2) $$
    *Multiplying corresponding components and summing them.*
    $$ = -1 + 1 + 0 = 0 $$
    *The second pair is orthogonal.*
4.  **Check $\mathbf{v}_2 \cdot \mathbf{v}_3$:**
    $$ \mathbf{v}_2 \cdot \mathbf{v}_3 = (1)(-1) + (-1)(1) + (1)(2) $$
    *Multiplying corresponding components and summing them.*
    $$ = -1 - 1 + 2 = -2 + 2 = 0 $$
    *The third pair is orthogonal.*
5.  **Conclusion:** Since the dot product of every distinct pair of vectors in $S$ is zero, and all vectors are non-zero, the set $S$ is an orthogonal set.

**Final Answer:**
The set $S = \left\{ \mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3 \right\}$ **is an orthogonal set**.

**Reflection:** This example highlights the importance of checking *all* distinct pairs. Missing even one pair check could lead to an incorrect conclusion.

---

### Example 3: Convert an Orthogonal Basis to an Orthonormal Basis

**Problem:** Given the orthogonal basis $B = \left\{ \mathbf{v}_1, \mathbf{v}_2 \right\}$ for $\mathbb{R}^2$, where $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} -2 \\ 1 \end{pmatrix}$, find an orthonormal basis for $\mathbb{R}^2$.

**Given:** An orthogonal basis $B$.
**Want:** An orthonormal basis $B'$.

**Solution:**
1.  **Recall the definition of an orthonormal set:** An orthonormal set is an orthogonal set where every vector has a magnitude of 1.
    *Since we are given an orthogonal basis, we only need to normalize each vector to make them unit vectors.*
2.  **Normalize $\mathbf{v}_1$:**
    a.  **Calculate the magnitude of $\mathbf{v}_1$:**
        $$ ||\mathbf{v}_1|| = \sqrt{1^2 + 2^2} = \sqrt{1 + 4} = \sqrt{5} $$
        *The magnitude is the square root of the sum of the squares of its components.*
    b.  **Divide $\mathbf{v}_1$ by its magnitude to get $\mathbf{u}_1$:**
        $$ \mathbf{u}_1 = \frac{1}{||\mathbf{v}_1||} \mathbf{v}_1 = \frac{1}{\sqrt{5}} \begin{pmatrix} 1 \\ 2 \end{pmatrix} = \begin{pmatrix} 1/\sqrt{5} \\ 2/\sqrt{5} \end{pmatrix} $$
        *This new vector $\mathbf{u}_1$ is a unit vector pointing in the same direction as $\mathbf{v}_1$.*
3.  **Normalize $\mathbf{v}_2$:**
    a.  **Calculate the magnitude of $\mathbf{v}_2$:**
        $$ ||\mathbf{v}_2|| = \sqrt{(-2)^2 + 1^2} = \sqrt{4 + 1} = \sqrt{5} $$
        *Again, sum of squares of components, then square root.*
    b.  **Divide $\mathbf{v}_2$ by its magnitude to get $\mathbf{u}_2$:**
        $$ \mathbf{u}_2 = \frac{1}{||\mathbf{v}_2||} \mathbf{v}_2 = \frac{1}{\sqrt{5}} \begin{pmatrix} -2 \\ 1 \end{pmatrix} = \begin{pmatrix} -2/\sqrt{5} \\ 1/\sqrt{5} \end{pmatrix} $$
        *This new vector $\mathbf{u}_2$ is a unit vector pointing in the same direction as $\mathbf{v}_2$.*
4.  **Form the new set $B'$:**
    $$ B' = \left\{ \mathbf{u}_1, \mathbf{u}_2 \right\} = \left\{ \begin{pmatrix} 1/\sqrt{5} \\ 2/\sqrt{5} \end{pmatrix}, \begin{pmatrix} -2/\sqrt{5} \\ 1/\sqrt{5} \end{pmatrix} \right\} $$
    *Since $B$ was an orthogonal basis, and we've normalized each vector, $B'$ is now an orthonormal basis.*

**Final Answer:**
An orthonormal basis for $\mathbb{R}^2$ is $\mathbf{B'} = \left\{ \begin{pmatrix} 1/\sqrt{5} \\ 2/\sqrt{5} \end{pmatrix}, \begin{pmatrix} -2/\sqrt{5} \\ 1/\sqrt{5} \end{pmatrix} \right\}$.

**Reflection:** This example demonstrates the process of normalization. It's crucial to correctly calculate the magnitude and then scale each component. The fact that the original set was already orthogonal meant we didn't need to check dot products again for the new set, as scaling vectors doesn't change their orthogonality (unless one is scaled to zero, which isn't the case here).

---

### Example 4: Verify if a Given Set is an Orthonormal Basis for $\mathbb{R}^3$

**Problem:** Determine if the set $B = \left\{ \mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3 \right\}$ is an orthonormal basis for $\mathbb{R}^3$, where
$\mathbf{u}_1 = \begin{pmatrix} 1/\sqrt{2} \\ 1/\sqrt{2} \\ 0 \end{pmatrix}$, $\mathbf{u}_2 = \begin{pmatrix} -1/\sqrt{2} \\ 1/\sqrt{2} \\ 0 \end{pmatrix}$, and $\mathbf{u}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.

**Given:** A set of three vectors $B$.
**Want:** To determine if $B$ is an orthonormal basis for $\mathbb{R}^3$.

**Solution:**
To be an orthonormal basis for $\mathbb{R}^3$, the set $B$ must satisfy three conditions:
1.  It must be a set of non-zero vectors. (Clearly true here)
2.  It must be an orthogonal set (all distinct pairs have a dot product of 0).
3.  Each vector must be a unit vector (magnitude of 1).
If these conditions are met, then for a space of dimension 3, three such vectors will automatically form a basis.

**Part 1: Check if each vector is a unit vector (Normalization Check):**
1.  **Magnitude of $\mathbf{u}_1$:**
    $$ ||\mathbf{u}_1|| = \sqrt{\left(\frac{1}{\sqrt{2}}\right)^2 + \left(\frac{1}{\sqrt{2}}\right)^2 + 0^2} $$
    *Sum of squares of components, then square root.*
    $$ = \sqrt{\frac{1}{2} + \frac{1}{2} + 0} = \sqrt{1} = 1 $$
    *$\mathbf{u}_1$ is a unit vector.*
2.  **Magnitude of $\mathbf{u}_2$:**
    $$ ||\mathbf{u}_2|| = \sqrt{\left(-\frac{1}{\sqrt{2}}\right)^2 + \left(\frac{1}{\sqrt{2}}\right)^2 + 0^2} $$
    *Sum of squares of components, then square root.*
    $$ = \sqrt{\frac{1}{2} + \frac{1}{2} + 0} = \sqrt{1} = 1 $$
    *$\mathbf{u}_2$ is a unit vector.*
3.  **Magnitude of $\mathbf{u}_3$:**
    $$ ||\mathbf{u}_3|| = \sqrt{0^2 + 0^2 + 1^2} $$
    *Sum of squares of components, then square root.*
    $$ = \sqrt{0 + 0 + 1} = \sqrt{1} = 1 $$
    *$\mathbf{u}_3$ is a unit vector.*
    *All vectors in $B$ are unit vectors. This condition is satisfied.*

**Part 2: Check if the set is orthogonal (Orthogonality Check):**
We need to check the dot product for all distinct pairs: $\mathbf{u}_1 \cdot \mathbf{u}_2$, $\mathbf{u}_1 \cdot \mathbf{u}_3$, and $\mathbf{u}_2 \cdot \mathbf{u}_3$.
1.  **Check $\mathbf{u}_1 \cdot \mathbf{u}_2$:**
    $$ \mathbf{u}_1 \cdot \mathbf{u}_2 = \left(\frac{1}{\sqrt{2}}\right)\left(-\frac{1}{\sqrt{2}}\right) + \left(\frac{1}{\sqrt{2}}\right)\left(\frac{1}{\sqrt{2}}\right) + (0)(0) $$
    *Multiplying corresponding components and summing.*
    $$ = -\frac{1}{2} + \frac{1}{2} + 0 = 0 $$
    *$\mathbf{u}_1$ and $\mathbf{u}_2$ are orthogonal.*
2.  **Check $\mathbf{u}_1 \cdot \mathbf{u}_3$:**
    $$ \mathbf{u}_1 \cdot \mathbf{u}_3 = \left(\frac{1}{\sqrt{2}}\right)(0) + \left(\frac{1}{\sqrt{2}}\right)(0) + (0)(1) $$
    *Multiplying corresponding components and summing.*
    $$ = 0 + 0 + 0 = 0 $$
    *$\mathbf{u}_1$ and $\mathbf{u}_3$ are orthogonal.*
3.  **Check $\mathbf{u}_2 \cdot \mathbf{u}_3$:**
    $$ \mathbf{u}_2 \cdot \mathbf{u}_3 = \left(-\frac{1}{\sqrt{2}}\right)(0) + \left(\frac{1}{\sqrt{2}}\right)(0) + (0)(1) $$
    *Multiplying corresponding components and summing.*
    $$ = 0 + 0 + 0 = 0 $$
    *$\mathbf{u}_2$ and $\mathbf{u}_3$ are orthogonal.*
    *All distinct pairs of vectors in $B$ are orthogonal. This condition is satisfied.*

**Part 3: Conclusion for Basis:**
Since $B$ is an orthonormal set of three vectors in $\mathbb{R}^3$, it is automatically linearly independent. Because the dimension of $\mathbb{R}^3$ is 3, any set of 3 linearly independent vectors will span $\mathbb{R}^3$. Therefore, $B$ is an orthonormal basis for $\mathbb{R}^3$.

**Final Answer:**
The set $B = \left\{ \mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3 \right\}$ **is an orthonormal basis for $\mathbb{R}^3$**.

**Reflection:** This example required a complete verification of both the "ortho" (orthogonality) and "normal" (unit length) conditions. It's easy to make arithmetic errors with fractions and square roots, so careful calculation is essential. Remember that for a set of $n$ vectors in an $n$-dimensional space, if they are orthonormal, they automatically form a basis.

## 6. Common mistakes and traps

1.  **Forgetting to check all pairs for orthogonality:** For a set of $k$ vectors, you must check $\frac{k(k-1)}{2}$ distinct pairs. Students often check only a few and assume the rest.
2.  **Confusing "orthogonal" with "orthonormal":** An orthogonal set only requires vectors to be perpendicular. An orthonormal set requires them to be perpendicular *and* have unit length. These are distinct concepts.
3.  **Incorrectly calculating the dot product:** A common arithmetic error, especially with negative numbers or fractions. Remember $\mathbf{u} \cdot \mathbf{v} = u_1v_1 + u_2v_2 + \dots + u_nv_n$.
4.  **Incorrectly calculating the norm (magnitude):** Forgetting the square root, or making arithmetic errors in squaring components and summing them. Remember $||\mathbf{u}|| = \sqrt{u_1^2 + u_2^2 + \dots + u_n^2}$.
5.  **Assuming linear independence from orthogonality without checking for non-zero vectors:** While an orthogonal set of *non-zero* vectors is always linearly independent, if the zero vector is included, the set is no longer linearly independent. (Though for basis purposes, the zero vector is typically excluded).
6.  **Not understanding the "basis" part:** An orthogonal/orthonormal set is not necessarily a basis unless it also spans the entire vector space (or subspace) and is linearly independent. For finite-dimensional spaces, if the number of vectors in the orthonormal/orthogonal set equals the dimension of the space, then it automatically forms a basis.

## 7. Textbook-precise explanation

Let $V$ be an inner product space. For vectors $\mathbf{u}, \mathbf{v} \in V$, their inner product is denoted $\langle \mathbf{u}, \mathbf{v} \rangle$. The norm (or length) of a vector $\mathbf{u}$ is defined as $||\mathbf{u}|| = \sqrt{\langle \mathbf{u}, \mathbf{u} \rangle}$.

**Definition (Orthogonal Vectors):**
Two vectors $\mathbf{u}, \mathbf{v} \in V$ are said to be **orthogonal** if their inner product is zero:
$$ \langle \mathbf{u}, \mathbf{v} \rangle = 0 $$
This is often denoted $\mathbf{u} \perp \mathbf{v}$. The zero vector $\mathbf{0}$ is orthogonal to every vector in $V$.

**Definition (Orthogonal Set):**
A set of non-zero vectors $S = \{ \mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k \}$ in $V$ is called an **orthogonal set** if all distinct pairs of vectors in $S$ are orthogonal:
$$ \langle \mathbf{v}_i, \mathbf{v}_j \rangle = 0 \quad \text{whenever } i \neq j $$

**Theorem (Linear Independence of Orthogonal Sets):**
If $S = \{ \mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k \}$ is an orthogonal set of non-zero vectors in an inner product space $V$, then $S$ is linearly independent.
*Proof sketch: Assume $\sum_{i=1}^k c_i \mathbf{v}_i = \mathbf{0}$. Take the inner product of both sides with $\mathbf{v}_j$. Due to orthogonality, $\langle c_j \mathbf{v}_j, \mathbf{v}_j \rangle = \langle \mathbf{0}, \mathbf{v}_j \rangle = 0$. Since $\mathbf{v}_j$ is non-zero, $\langle \mathbf{v}_j, \mathbf{v}_j \rangle = ||\mathbf{v}_j||^2 \neq 0$. Thus, $c_j = 0$ for all $j$, implying linear independence.*

**Definition (Orthonormal Set):**
A set of vectors $S = \{ \mathbf{u}_1, \mathbf{u}_2, \dots, \mathbf{u}_k \}$ in $V$ is called an **orthonormal set** if it is an orthogonal set and every vector in $S$ is a unit vector (i.e., has norm 1):
$$ \langle \mathbf{u}_i, \mathbf{u}_j \rangle = \begin{cases} 0 & \text{if } i \neq j \\ 1 & \text{if } i = j \end{cases} $$
This condition is compactly expressed using the Kronecker delta symbol, $\delta_{ij}$, as $\langle \mathbf{u}_i, \mathbf{u}_j \rangle = \delta_{ij}$.

**Definition (Orthogonal Basis):**
An **orthogonal basis** for an inner product space $V$ is a basis for $V$ that is also an orthogonal set.

**Definition (Orthonormal Basis):**
An **orthonormal basis** for an inner product space $V$ is a basis for $V$ that is also an orthonormal set.

**Key Properties of Orthonormal Bases:**
If $B = \{ \mathbf{u}_1, \dots, \mathbf{u}_n \}$ is an orthonormal basis for $V$, then:
1.  Any vector $\mathbf{v} \in V$ can be uniquely expressed as a linear combination of the basis vectors:
    $$ \mathbf{v} = c_1 \mathbf{u}_1 + c_2 \mathbf{u}_2 + \dots + c_n \mathbf{u}_n $$
    where the coefficients $c_i$ are easily found by taking the inner product of $\mathbf{v}$ with each basis vector:
    $$ c_i = \langle \mathbf{v}, \mathbf{u}_i \rangle $$
    This is a significant simplification compared to general bases, where finding coefficients requires solving a system of linear equations.
2.  The norm of any vector $\mathbf{v} \in V$ can be computed from its coordinates relative to an orthonormal basis using Parseval's Identity:
    $$ ||\mathbf{v}||^2 = \sum_{i=1}^n |\langle \mathbf{v}, \mathbf{u}_i \rangle|^2 $$

*(Refer to: Lay, David C., Lay, Steven R., McDonald, Judi J. "Linear Algebra and Its Applications." 5th ed., Pearson, 2016, Chapter 6.1. Or Strang, Gilbert. "Introduction to Linear Algebra." 5th ed., Wellesley-Cambridge Press, 2016, Chapter 4.2.)*

## 8. ASCII diagrams

Here are some ASCII diagrams to visualize these concepts in 2D and 3D.

```text
       ^ y
       |
       | v2 = (0,1)
       |
-------+-------> x
       | v1 = (1,0)
       |
       |
```
**Figure 1: Orthogonal Vectors in 2D.**
This diagram shows two vectors, $\mathbf{v}_1 = (1,0)$ and $\mathbf{v}_2 = (0,1)$, originating from the origin $(0,0)$. $\mathbf{v}_1$ points along the positive x-axis, and $\mathbf{v}_2$ points along the positive y-axis. They meet at a $90^\circ$ angle, illustrating that they are orthogonal. Both are also unit vectors, so they form an orthonormal set (and an orthonormal basis for $\mathbb{R}^2$).

```text
       ^ y
       |  / v_a = (1,1)
       | /
       |/
-------+-------> x
       |\
       | \ v_b = (1,-1)
       |  \
```
**Figure 2: Another Pair of Orthogonal Vectors in 2D.**
Here, $\mathbf{v}_a = (1,1)$ and $\mathbf{v}_b = (1,-1)$ are shown. If you calculate their dot product: $(1)(1) + (1)(-1) = 1 - 1 = 0$. They are orthogonal. However, their magnitudes are $||\mathbf{v}_a|| = \sqrt{1^2+1^2} = \sqrt{2}$ and $||\mathbf{v}_b|| = \sqrt{1^2+(-1)^2} = \sqrt{2}$. Since their lengths are not 1, this set is orthogonal but not orthonormal.

```text
       z
       ^
       |
       | u_3 = (0,0,1)
       |
       +-------> y
      / u_2 = (0,1,0)
     /
    x u_1 = (1,0,0)
```
**Figure 3: Orthonormal Basis in 3D (Standard Basis).**
This represents the standard Cartesian coordinate system in 3D. The vectors $\mathbf{u}_1 = (1,0,0)$, $\mathbf{u}_2 = (0,1,0)$, and $\mathbf{u}_3 = (0,0,1)$ originate from the origin. Each vector points along a positive axis (x, y, z respectively). They are all perpendicular to each other, and each has a length of 1. This set forms the canonical orthonormal basis for $\mathbb{R}^3$.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of a **"Perfect Grid"** or **"Ideal Building Blocks"**.
    *   **O**rthogonal: Think **O**ut-of-the-way, **O**pposite direction (at 90 degrees), **O**ut of each other's "shadows". They are perfectly perpendicular.
    *   **N**ormalized: Think **N**ice and **N**eat, **N**o longer than 1 unit. They all have a standard length of 1.
    *   **B**asis: Think **B**uilding blocks for the whole space. They are enough to describe any vector and are not redundant.
    So, an **O.N.B.** (Orthonormal Basis) is a set of "Perfect Grid" vectors that are perpendicular, unit length, and can build any vector in the space.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Orthogonality Condition:** $\mathbf{u} \cdot \mathbf{v} = 0 \iff \mathbf{u} \perp \mathbf{v}$ (The dot product is the ultimate test for perpendicularity).
    2.  **Normalization Condition (Unit Vector):** $||\mathbf{u}|| = 1$ (A vector's length must be one). To normalize $\mathbf{v}$: $\hat{\mathbf{v}} = \frac{1}{||\mathbf{v}||} \mathbf{v}$.
    3.  **Linear Independence Property:** An orthogonal set of *non-zero* vectors is always linearly independent. (This is a huge shortcut for checking if an orthogonal set is a basis).

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the definitions and work through one easy example.
    *   **3 Days:** Review definitions, work through one medium example. Try to explain the concepts in your own words without looking.
    *   **7 Days:** Review definitions, work through one hard example. List the properties of an orthonormal basis without looking.
    *   **16 Days:** Review all definitions, work through a mixed problem (e.g., given a set, determine if it's orthogonal, orthonormal, or a basis). Re-derive the linear independence theorem.
    *   **35 Days:** Review all concepts, focus on the "Why it matters" and "Connections" sections. Ensure you can explain the core ideas and their implications from first principles.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the properties of an orthonormal basis, you can always rebuild them:
    *   **Start with "Basis":** What does it mean? A set of vectors that are linearly independent and span the vector space.
    *   **Add "Orthogonal":** What does "orthogonal" mean for vectors? They are perpendicular. How do we test for perpendicularity mathematically? The dot product is zero ($\mathbf{u} \cdot \mathbf{v} = 0$). So, all pairs of distinct basis vectors must have a zero dot product.
    *   **Add "Normal":** What does "normal" mean for vectors in this context? They have unit length. How do we test for unit length? The magnitude (norm) is one ($||\mathbf{u}|| = 1$). How do we calculate magnitude? $||\mathbf{u}|| = \sqrt{\mathbf{u} \cdot \mathbf{u}}$. So, each basis vector must have a magnitude of 1.
    *   **Combine and simplify:** If a set of vectors is orthogonal and each has unit length, then $\mathbf{u}_i \cdot \mathbf{u}_j$ is 0 if $i \neq j$ and 1 if $i = j$. This is the compact definition.
    *   **Recall the power:** Why is this so good? Because if they are orthogonal and non-zero, they are automatically linearly independent. This simplifies checking if they form a basis.

## 10. Connections — what this leads to

The concepts of orthogonal sets and orthonormal bases are foundational, opening doors to many advanced topics and techniques in linear algebra and beyond:

1.  **Gram-Schmidt Process:** This is a direct consequence and application. The Gram-Schmidt process is an algorithm that takes any basis for an inner product space and systematically transforms it into an orthogonal basis, and then into an orthonormal basis. It's how you *construct* these ideal bases.
2.  **Orthogonal Projections:** Orthonormal bases make it incredibly easy to project a vector onto a subspace or onto another vector. The coefficients of a vector in an orthonormal basis are simply its projections onto the basis vectors. This is crucial for understanding least squares approximations.
3.  **Fourier Series and Fourier Transforms:** These powerful tools in signal processing and analysis rely on the orthogonality of sine and cosine functions (or complex exponentials). They allow us to decompose complex functions into simpler, orthogonal components, which is the basis for analyzing frequencies in signals, image compression, and solving differential equations.
4.  **Eigenvalues and Eigenvectors of Symmetric Matrices:** A fundamental theorem states that eigenvectors corresponding to distinct eigenvalues of a symmetric matrix are orthogonal. Furthermore, any symmetric matrix can be diagonalized by an orthogonal matrix, whose columns form an orthonormal basis of eigenvectors. This is critical in physics, engineering, and data analysis (like PCA).
5.  **Change of Basis:** When changing coordinates from one basis to another, using an orthonormal basis (especially an orthogonal matrix for the change of basis) simplifies calculations dramatically, as the inverse of an orthogonal matrix is simply its transpose.
6.  **Least Squares Approximation:** When a system of linear equations $A\mathbf{x} = \mathbf{b}$ has no exact solution, we often seek the "best approximate" solution in the least squares sense. This involves projecting $\mathbf{b}$ onto the column space of $A$, and orthogonal projections are central to this method.
7.  **QR Factorization:** This matrix decomposition technique expresses a matrix $A$ as the product of an orthogonal matrix $Q$ and an upper triangular matrix $R$. The columns of $Q$ form an orthonormal basis for the column space of $A$. QR factorization is widely used in numerical analysis for solving linear systems, finding eigenvalues, and least squares problems.
8.  **Hilbert Spaces:** In functional analysis, the concept of an inner product space is generalized to complete inner product spaces, known as Hilbert spaces. Orthonormal bases (often infinite-dimensional) are fundamental to these spaces, allowing for generalizations of Fourier analysis and central to quantum mechanics.

## 11. Self-check questions

1.  Consider the vectors $\mathbf{a} = \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix}$, $\mathbf{b} = \begin{pmatrix} 3 \\ -1 \\ 1 \end{pmatrix}$, and $\mathbf{c} = \begin{pmatrix} 1 \\ 0 \\ 3 \end{pmatrix}$.
    a.  Are $\mathbf{a}$ and $\mathbf{b}$ orthogonal?
    b.  Are $\mathbf{a}$ and $\mathbf{c}$ orthogonal?
    c.  Is the set $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\}$ an orthogonal set?

2.  Given the vector $\mathbf{v} = \begin{pmatrix} -6 \\ 8 \\ 0 \end{pmatrix}$, find a unit vector $\hat{\mathbf{v}}$ in the same direction as $\mathbf{v}$.

3.  A set of vectors $S = \left\{ \begin{pmatrix} 1/\sqrt{3} \\ 1/\sqrt{3} \\ 1/\sqrt{3} \end{pmatrix}, \begin{pmatrix} -1/\sqrt{2} \\ 1/\sqrt{2} \\ 0 \end{pmatrix}, \begin{pmatrix} 1/\sqrt{6} \\ 1/\sqrt{6} \\ -2/\sqrt{6} \end{pmatrix} \right\}$ is given.
    a.  Verify that each vector in $S$ is a unit vector.
    b.  Verify that the set $S$ is an orthogonal set.
    c.  Conclude whether $S$ is an orthonormal basis for $\mathbb{R}^3$.

4.  Suppose $B = \{ \mathbf{v}_1, \mathbf{v}_2 \}$ is an orthogonal basis for a subspace $W$ of $\mathbb{R}^4$, where $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \\ 0 \end{pmatrix}$ and $\mathbf{v}_2 = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix}$.
    a.  Find an orthonormal basis for $W$.
    b.  If $\mathbf{x} = \begin{pmatrix} 2 \\ 4 \\ 1 \\ 3 \end{pmatrix}$, find the coordinates of $\mathbf{x}$ with respect to the orthonormal basis you found in part (a), assuming $\mathbf{x} \in W$.

5.  Prove that if $S = \{ \mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k \}$ is an orthogonal set of non-zero vectors in an inner product space $V$, then $S$ is linearly independent. (Hint: Start with the linear combination $c_1\mathbf{v}_1 + \dots + c_k\mathbf{v}_k = \mathbf{0}$ and take the inner product with $\mathbf{v}_j$ for any $j \in \{1, \dots, k\}$).