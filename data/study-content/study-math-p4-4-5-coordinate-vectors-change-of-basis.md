## 1. What it is — in plain English

Imagine you're giving directions. You could say, "Go 3 blocks East, then 2 blocks North." This is like describing a location using a standard grid (East-West, North-South). But what if you're in a city where all the streets are rotated, say, 45 degrees? You might instead say, "Go 5 blocks along Main Street, then 1 block along Elm Avenue," where Main Street and Elm Avenue are themselves at an angle to your standard East-West and North-South.

In mathematics, a "vector" is like a direction and magnitude – a quantity with both size and orientation. A "basis" is like the set of fundamental directions or "rulers" you use to describe any vector. The "coordinate vector" is just the specific "recipe" (how much of each ruler to use) to build your vector using a particular set of rulers.

"Change of basis" simply means taking a vector's recipe from one set of rulers (one basis) and figuring out its equivalent recipe for a *different* set of rulers (another basis). The vector itself doesn't move or change; it's still the same direction and magnitude in space. What changes is *how we describe it* based on the coordinate system we're using. It's like converting a measurement from inches to centimeters – the length of the object is the same, but its numerical description changes.

## 2. Why it matters — real-world applications

The ability to change basis is fundamental across many scientific and engineering disciplines because it allows us to simplify problems, view data from different perspectives, or integrate information from various coordinate systems.

1.  **Computer Graphics and Game Development:** When you see a 3D object on a screen, it exists in multiple coordinate systems. An object might have its own "local" coordinate system (e.g., the front of a car is along its local X-axis). This car then sits within a larger "world" coordinate system. Finally, a camera views the car from its own "camera" coordinate system. Changing basis allows developers to transform the car's local coordinates into world coordinates, and then into camera coordinates, and finally into the 2D screen coordinates for rendering. Companies like NVIDIA and AMD build GPUs that perform these matrix transformations millions of times per second.

2.  **Robotics and Aerospace Engineering:** Consider a robotic arm or an aircraft. The sensors on the arm might report positions and velocities relative to the arm's joints (a "body frame"). However, for navigation or interaction with the environment, these measurements need to be expressed in a global "world frame" or an "Earth-fixed frame." Change of basis matrices are used to convert these sensor readings from the local body frame to the global frame, enabling precise control and path planning. For instance, SpaceX uses these transformations extensively for rocket guidance and control during launch and landing.

3.  **Machine Learning and Data Science (Principal Component Analysis - PCA):** In high-dimensional data, features are often correlated. PCA is a technique used for dimensionality reduction and data visualization. It works by finding a new set of orthogonal basis vectors (called principal components) that best capture the variance in the data. This involves changing the basis of the data from its original features to these new principal components. This transformation simplifies the data, removes redundancy, and can improve the performance of subsequent machine learning models. Google's search algorithms and recommendation systems leverage similar concepts for efficient data processing.

4.  **Physics and Engineering (Stress/Strain Tensors):** In material science, stress and strain are often represented as tensors. How these tensors are described depends on the coordinate system chosen. When analyzing a material under load, engineers might need to rotate the coordinate system to align with the material's principal axes of stress or strain, where the tensor representation becomes diagonal and much simpler to analyze. This change of basis simplifies calculations and provides clearer insights into material behavior, crucial for designing structures like bridges or aircraft components.

## 3. Prerequisites — what you must know first

Before diving into changing bases, ensure you have a solid grasp of these foundational linear algebra concepts:

*   **Vectors:** Quantities with both magnitude and direction, representable as ordered lists of numbers (e.g., $(x,y)$ or $(x,y,z)$).
*   **Vector Spaces:** A set of vectors that can be added together and multiplied by scalars, satisfying certain axioms (e.g., $\mathbb{R}^n$, polynomial spaces).
*   **Subspaces:** A subset of a vector space that is itself a vector space (closed under addition and scalar multiplication).
*   **Linear Combinations:** Expressing a vector as a sum of scalar multiples of other vectors (e.g., $c_1 v_1 + c_2 v_2$).
*   **Linear Independence:** A set of vectors where no vector can be written as a linear combination of the others.
*   **Span:** The set of all possible linear combinations of a given set of vectors.
*   **Basis:** A linearly independent set of vectors that spans the entire vector space. This is the "minimal" set of vectors needed to describe all vectors in the space.
*   **Standard Basis:** The simplest basis for $\mathbb{R}^n$, consisting of vectors with a single 1 and the rest 0s (e.g., for $\mathbb{R}^2$, $\{(1,0), (0,1)\}$).
*   **Coordinates of a vector with respect to a basis:** The unique scalars that express a vector as a linear combination of the basis vectors.
*   **Matrix Multiplication:** The process of multiplying two matrices, resulting in a new matrix.
*   **Invertible Matrices:** Square matrices that have an inverse, meaning there exists another matrix that, when multiplied by the original, yields the identity matrix.
*   **Identity Matrix:** A square matrix with ones on the main diagonal and zeros elsewhere; it acts like the number '1' in matrix multiplication.
*   **Linear Transformations (helpful but not strictly required):** Functions between vector spaces that preserve vector addition and scalar multiplication. Understanding how matrices represent these transformations provides deeper context.

If any of these terms are unfamiliar, please pause and review them. They are the building blocks for understanding coordinate vectors and change of basis.

## 4. The core idea — step by step

Let's break down the concept of changing basis into manageable steps, building from intuition to formal mathematics.

### Step 1: Understanding a Vector's Coordinates in a Basis

*   **Plain English:** Imagine you have a set of special measuring sticks (your basis vectors). To describe any point or direction (your vector), you just say how many of each measuring stick you need to combine. Those "how many" numbers are the coordinates.
*   **Concrete Example:**
    Let the standard basis for $\mathbb{R}^2$ be $E = \{e_1, e_2\} = \{(1,0), (0,1)\}$.
    The vector $v = (3,2)$ means $v = 3 \cdot (1,0) + 2 \cdot (0,1)$.
    So, the coordinate vector of $v$ with respect to the standard basis $E$ is $[v]_E = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$.
    Now, consider a different basis $B = \{b_1, b_2\} = \{(1,1), (-1,1)\}$.
    If we want to express $v = (3,2)$ using *this* basis, we need to find scalars $c_1, c_2$ such that $v = c_1 b_1 + c_2 b_2$.
    $(3,2) = c_1(1,1) + c_2(-1,1)$
    $(3,2) = (c_1 - c_2, c_1 + c_2)$
    This gives us a system of equations:
    $c_1 - c_2 = 3$
    $c_1 + c_2 = 2$
    Adding the two equations: $2c_1 = 5 \implies c_1 = 5/2$.
    Substituting $c_1$ into the second equation: $5/2 + c_2 = 2 \implies c_2 = 2 - 5/2 = -1/2$.
    So, $v = (5/2)b_1 + (-1/2)b_2$.
    The coordinate vector of $v$ with respect to basis $B$ is $[v]_B = \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix}$.
*   **Formal/Mathematical Version:**
    Let $B = \{b_1, b_2, \dots, b_n\}$ be a basis for a vector space $V$. Any vector $v \in V$ can be expressed uniquely as a linear combination of the basis vectors:
    $$v = c_1 b_1 + c_2 b_2 + \dots + c_n b_n$$
    The scalars $c_1, c_2, \dots, c_n$ are called the coordinates of $v$ with respect to the basis $B$. The coordinate vector of $v$ with respect to $B$ is denoted as:
    $$[v]_B = \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix}$$
*   **What could go wrong:** Students often confuse the vector $v$ itself with its coordinate representation $[v]_B$. The vector $v$ is an abstract entity in the vector space; $[v]_B$ is a specific column vector of numbers that *describes* $v$ relative to a chosen basis.

### Step 2: The Goal: Expressing a Vector's Coordinates in a *New* Basis

*   **Plain English:** You have a vector described using one set of measuring sticks (basis $B$). Now you want to find its description using a *different* set of measuring sticks (basis $B'$). The vector itself hasn't changed, just the language you're using to talk about it.
*   **Concrete Example:**
    From Step 1, we found that for $v = (3,2)$, its coordinates in the standard basis $E$ are $[v]_E = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$, and its coordinates in basis $B = \{(1,1), (-1,1)\}$ are $[v]_B = \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix}$.
    Our goal is to find a way to go directly from $[v]_E$ to $[v]_B$, or from $[v]_B$ to $[v]_E$, or even from $[v]_{B_1}$ to $[v]_{B_2}$ for any two bases $B_1, B_2$.
*   **Formal/Mathematical Version:**
    Given a vector $v$ and its coordinate vector $[v]_B$ with respect to an "old" basis $B = \{b_1, \dots, b_n\}$, we want to find its coordinate vector $[v]_{B'}$ with respect to a "new" basis $B' = \{b'_1, \dots, b'_n\}$. We are looking for a matrix, let's call it $P_{B \to B'}$, such that:
    $$[v]_{B'} = P_{B \to B'} [v]_B$$
    This matrix $P_{B \to B'}$ is called the **change-of-coordinates matrix from $B$ to $B'$**.
*   **What could go wrong:** Thinking that the operation changes the vector $v$. Only its numerical representation changes. Also, the direction of the change ($B \to B'$ vs. $B' \to B$) is crucial and often confused.

### Step 3: From an Old Basis to the Standard Basis (The Bridge)

*   **Plain English:** If you have a recipe for a vector using some non-standard measuring sticks, it's very easy to convert it back to the standard, everyday measuring sticks. You just follow the recipe: take 'x' amount of the first stick, 'y' amount of the second, and add them up.
*   **Concrete Example:**
    Let basis $B = \{b_1, b_2\} = \{(1,1), (-1,1)\}$ and $[v]_B = \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix}$.
    To find $v$ in standard coordinates (i.e., $[v]_E$), we simply perform the linear combination:
    $v = (5/2)b_1 + (-1/2)b_2 = (5/2)(1,1) + (-1/2)(-1,1)$
    $v = (5/2, 5/2) + (1/2, -1/2)$
    $v = (5/2 + 1/2, 5/2 - 1/2) = (6/2, 4/2) = (3,2)$.
    So, $[v]_E = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$.
    Notice that if we form a matrix $P_B$ whose columns are the basis vectors of $B$ (expressed in standard coordinates):
    $P_B = [b_1 \ b_2] = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$.
    Then $P_B [v]_B = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix} = \begin{pmatrix} 1(5/2) + (-1)(-1/2) \\ 1(5/2) + 1(-1/2) \end{pmatrix} = \begin{pmatrix} 5/2 + 1/2 \\ 5/2 - 1/2 \end{pmatrix} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$.
    This is exactly $[v]_E$.
*   **Formal/Mathematical Version:**
    Let $B = \{b_1, \dots, b_n\}$ be a basis for $\mathbb{R}^n$. Let $P_B$ be the matrix whose columns are the basis vectors $b_1, \dots, b_n$ (expressed in the standard basis $E$). This matrix $P_B$ is often called the **change-of-coordinates matrix from $B$ to $E$**, denoted $P_{B \to E}$.
    Then, for any vector $v$, its standard coordinates are given by:
    $$[v]_E = P_B [v]_B$$
    Or, more simply, $v = P_B [v]_B$ (since $v$ is typically assumed to be in standard coordinates if no basis is specified).
*   **What could go wrong:** Forgetting that the columns of $P_B$ are the *basis vectors themselves* (in standard coordinates), not their coordinates in some other basis. Also, remembering that $P_B$ takes coordinates *from* $B$ *to* standard.

### Step 4: From Standard Basis to a New Basis (The Inverse Bridge)

*   **Plain English:** If you have a vector described using standard measuring sticks, and you want its recipe in some new, non-standard measuring sticks, you need to "un-mix" the standard description using the new sticks. This is the reverse process of Step 3.
*   **Concrete Example:**
    We have $v = (3,2)$ (which is $[v]_E = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$) and we want to find $[v]_B$ for $B = \{(1,1), (-1,1)\}$.
    We know from Step 3 that $v = P_B [v]_B$.
    So, $\begin{pmatrix} 3 \\ 2 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} [v]_B$.
    To find $[v]_B$, we need to multiply by the inverse of $P_B$:
    $P_B^{-1} = \frac{1}{(1)(1) - (-1)(1)} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \frac{1}{2} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix}$.
    Now, multiply:
    $[v]_B = P_B^{-1} [v]_E = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix} \begin{pmatrix} 3 \\ 2 \end{pmatrix} = \begin{pmatrix} (1/2)(3) + (1/2)(2) \\ (-1/2)(3) + (1/2)(2) \end{pmatrix} = \begin{pmatrix} 3/2 + 1 \\ -3/2 + 1 \end{pmatrix} = \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix}$.
    This matches our result from Step 1!
*   **Formal/Mathematical Version:**
    Let $B' = \{b'_1, \dots, b'_n\}$ be a basis for $\mathbb{R}^n$. Let $P_{B'}$ be the matrix whose columns are the basis vectors $b'_1, \dots, b'_n$ (in standard coordinates).
    We know that $[v]_E = P_{B'} [v]_{B'}$.
    To find $[v]_{B'}$ from $[v]_E$, we must multiply by the inverse of $P_{B'}$:
    $$[v]_{B'} = P_{B'}^{-1} [v]_E$$
    This matrix $P_{B'}^{-1}$ is the **change-of-coordinates matrix from $E$ to $B'$**, denoted $P_{E \to B'}$.
*   **What could go wrong:** Forgetting to invert the matrix. The matrix $P_{B'}$ takes coordinates *from* $B'$ *to* standard, so its inverse must take coordinates *from* standard *to* $B'$.

### Step 5: The Full Change of Basis Formula (Old Basis to New Basis)

*   **Plain English:** To go from any old set of measuring sticks ($B$) to any new set ($B'$), we use the standard measuring sticks ($E$) as an intermediary. First, convert from $B$ to $E$ (using $P_B$). Then, convert from $E$ to $B'$ (using $P_{B'}^{-1}$). It's a two-step translation.
*   **Concrete Example:**
    Given $[v]_B = \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix}$ for $B = \{(1,1), (-1,1)\}$.
    We want to find $[v]_{B'}$ for $B' = \{(1,0), (1,1)\}$. (Note: $B'$ here is a different non-standard basis, not the standard basis $E$).
    Step 1: Convert $[v]_B$ to standard coordinates $[v]_E$.
    $P_B = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$.
    $[v]_E = P_B [v]_B = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 5/2 \\ -1/2 \end{pmatrix} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$.
    Step 2: Convert $[v]_E$ to coordinates in $B'$.
    $P_{B'} = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$.
    $P_{B'}^{-1} = \frac{1}{(1)(1) - (1)(0)} \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$.
    $[v]_{B'} = P_{B'}^{-1} [v]_E = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ 2 \end{pmatrix} = \begin{pmatrix} 1(3) + (-1)(2) \\ 0(3) + 1(2) \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.
    So, $[v]_{B'} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.
    (Check: $1 \cdot (1,0) + 2 \cdot (1,1) = (1,0) + (2,2) = (3,2)$, which is $v$. Correct!)
*   **Formal/Mathematical Version:**
    To go from coordinates in basis $B$ to coordinates in basis $B'$, we combine the steps:
    First, convert from $B$ to the standard basis $E$: $[v]_E = P_B [v]_B$.
    Then, convert from $E$ to $B'$: $[v]_{B'} = P_{B'}^{-1} [v]_E$.
    Substituting the first equation into the second:
    $$[v]_{B'} = P_{B'}^{-1} (P_B [v]_B)$$
    So, the change-of-coordinates matrix from $B$ to $B'$ is:
    $$P_{B \to B'} = P_{B'}^{-1} P_B$$
    This is the most general and widely used formula for changing basis.
*   **What could go wrong:** Incorrectly ordering the matrices. Remember the process: $B \to E \to B'$. The matrix $P_B$ takes you from $B$ to $E$. The matrix $P_{B'}^{-1}$ takes you from $E$ to $B'$. So, $P_{B'}^{-1}$ must be applied *after* $P_B$.

### Step 6: The Change of Basis Matrix by Expressing Old Basis Vectors in New Basis

*   **Plain English:** Instead of using the standard basis as an intermediary, you can directly build the "translator" matrix. To do this, you figure out how each of your *old* measuring sticks can be described using your *new* measuring sticks. Each of those descriptions forms a column of your translator matrix.
*   **Concrete Example:**
    Let $B = \{b_1, b_2\} = \{(1,1), (-1,1)\}$ and $B' = \{b'_1, b'_2\} = \{(1,0), (1,1)\}$.
    We want to find $P_{B \to B'}$.
    According to this method, the columns of $P_{B \to B'}$ are $[b_1]_{B'}$ and $[b_2]_{B'}$.
    1.  Find $[b_1]_{B'}$: Express $b_1$ as a linear combination of $b'_1, b'_2$.
        $b_1 = (1,1)$. We need $c_1, c_2$ such that $(1,1) = c_1(1,0) + c_2(1,1)$.
        $(1,1) = (c_1 + c_2, c_2)$.
        So, $c_2 = 1$.
        $c_1 + c_2 = 1 \implies c_1 + 1 = 1 \implies c_1 = 0$.
        Thus, $[b_1]_{B'} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
    2.  Find $[b_2]_{B'}$: Express $b_2$ as a linear combination of $b'_1, b'_2$.
        $b_2 = (-1,1)$. We need $d_1, d_2$ such that $(-1,1) = d_1(1,0) + d_2(1,1)$.
        $(-1,1) = (d_1 + d_2, d_2)$.
        So, $d_2 = 1$.
        $d_1 + d_2 = -1 \implies d_1 + 1 = -1 \implies d_1 = -2$.
        Thus, $[b_2]_{B'} = \begin{pmatrix} -2 \\ 1 \end{pmatrix}$.
    Now, form $P_{B \to B'}$ using these coordinate vectors as columns:
    $P_{B \to B'} = [[b_1]_{B'} \ [b_2]_{B'}] = \begin{pmatrix} 0 & -2 \\ 1 & 1 \end{pmatrix}$.
    Let's verify this with the formula from Step 5: $P_{B \to B'} = P_{B'}^{-1} P_B$.
    $P_B = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$ and $P_{B'}^{-1} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$.
    $P_{B \to B'} = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 1(1)+(-1)(1) & 1(-1)+(-1)(1) \\ 0(1)+1(1) & 0(-1)+1(1) \end{pmatrix} = \begin{pmatrix} 0 & -2 \\ 1 & 1 \end{pmatrix}$.
    The results match! This method is often more intuitive for deriving the matrix directly.
*   **Formal/Mathematical Version:**
    Let $B = \{b_1, \dots, b_n\}$ and $B' = \{b'_1, \dots, b'_n\}$ be bases for a vector space $V$. The change-of-coordinates matrix from $B$ to $B'$ is given by:
    $$P_{B \to B'} = [[b_1]_{B'} \ [b_2]_{B'} \ \dots \ [b_n]_{B'}] $$
    That is, the columns of $P_{B \to B'}$ are the coordinate vectors of the basis vectors from $B$ (the "old" basis) with respect to $B'$ (the "new" basis).
*   **What could go wrong:** Accidentally using the new basis vectors expressed in terms of the old basis, or simply using the new basis vectors as columns directly without finding their coordinates. Remember, it's the *old* basis vectors expressed *in terms of the new basis*.

## 5. Worked examples — multiple, with every step shown

### Example 1: Standard Basis to a Non-Standard Basis in $\mathbb{R}^2$

**Problem:** Let $v = \begin{pmatrix} 7 \\ 4 \end{pmatrix}$ be a vector in $\mathbb{R}^2$ (understood to be in the standard basis $E = \{e_1, e_2\}$). Find the coordinate vector $[v]_B$ with respect to the basis $B = \{b_1, b_2\}$, where $b_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $b_2 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.

**Given:**
*   Vector $v = \begin{pmatrix} 7 \\ 4 \end{pmatrix}$ (which is $[v]_E$).
*   Basis $B = \{b_1, b_2\}$ with $b_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $b_2 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.

**Want:** The coordinate vector $[v]_B$.

**Solution:**

1.  **Understand the relationship:** We know that $v = P_B [v]_B$, where $P_B$ is the matrix whose columns are the basis vectors of $B$.
    $$ \begin{pmatrix} 7 \\ 4 \end{pmatrix} = \begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix} [v]_B $$
    *Explanation:* The vector $v$ can be expressed as a linear combination of the basis vectors in $B$. The matrix $P_B$ represents this linear combination in matrix form, taking the coordinates in $B$ and transforming them into standard coordinates.

2.  **Solve for $[v]_B$ by inverting $P_B$:** To isolate $[v]_B$, we need to multiply both sides by $P_B^{-1}$.
    First, find the inverse of $P_B = \begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix}$.
    The determinant of $P_B$ is $\text{det}(P_B) = (1)(1) - (3)(2) = 1 - 6 = -5$.
    For a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
    $$ P_B^{-1} = \frac{1}{-5} \begin{pmatrix} 1 & -3 \\ -2 & 1 \end{pmatrix} = \begin{pmatrix} -1/5 & 3/5 \\ 2/5 & -1/5 \end{pmatrix} $$
    *Explanation:* We calculate the determinant to ensure the matrix is invertible. Then we apply the formula for the inverse of a $2 \times 2$ matrix. This inverse matrix will allow us to "undo" the transformation from $B$ coordinates to standard coordinates.

3.  **Multiply to find $[v]_B$:**
    $$ [v]_B = P_B^{-1} [v]_E = \begin{pmatrix} -1/5 & 3/5 \\ 2/5 & -1/5 \end{pmatrix} \begin{pmatrix} 7 \\ 4 \end{pmatrix} $$
    $$ [v]_B = \begin{pmatrix} (-1/5)(7) + (3/5)(4) \\ (2/5)(7) + (-1/5)(4) \end{pmatrix} $$
    $$ [v]_B = \begin{pmatrix} -7/5 + 12/5 \\ 14/5 - 4/5 \end{pmatrix} $$
    $$ [v]_B = \begin{pmatrix} 5/5 \\ 10/5 \end{pmatrix} $$
    $$ \mathbf{[v]_B = \begin{pmatrix} 1 \\ 2 \end{pmatrix}} $$
    *Explanation:* We perform matrix multiplication. Each entry in the resulting coordinate vector is the dot product of a row from $P_B^{-1}$ with the column vector $[v]_E$. This gives us the scalar coefficients needed to express $v$ as a linear combination of $b_1$ and $b_2$.

**Reflection:** This example demonstrates the direct conversion from standard coordinates to non-standard coordinates. The key is to form the matrix $P_B$ from the new basis vectors and then invert it. The problem was straightforward because one of the bases was the standard basis.

---

### Example 2: Change of Basis from $B$ to $B'$ in $\mathbb{R}^2$

**Problem:** Let $B = \{b_1, b_2\}$ with $b_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $b_2 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$. Let $B' = \{b'_1, b'_2\}$ with $b'_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $b'_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
Given a vector $v$ with coordinates $[v]_B = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$, find its coordinates $[v]_{B'}$.

**Given:**
*   Basis $B = \{b_1, b_2\}$ with $b_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $b_2 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.
*   Basis $B' = \{b'_1, b'_2\}$ with $b'_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $b'_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
*   Coordinate vector $[v]_B = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.

**Want:** The coordinate vector $[v]_{B'}$.

**Solution (using the $P_{B'}^{-1} P_B$ formula):**

1.  **Construct $P_B$ and $P_{B'}$:**
    $P_B$ is the matrix whose columns are the vectors in $B$:
    $$ P_B = \begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix} $$
    $P_{B'}$ is the matrix whose columns are the vectors in $B'$:
    $$ P_{B'} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} $$
    *Explanation:* These matrices transform coordinates from their respective bases to the standard basis. $P_B$ converts $[v]_B$ to $v$ (standard coordinates), and $P_{B'}$ converts $[v]_{B'}$ to $v$.

2.  **Find $P_{B'}^{-1}$:**
    The determinant of $P_{B'}$ is $\text{det}(P_{B'}) = (1)(1) - (-1)(1) = 1 - (-1) = 2$.
    $$ P_{B'}^{-1} = \frac{1}{2} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix} $$
    *Explanation:* We need the inverse of $P_{B'}$ because we want to go *from* standard coordinates *to* $B'$ coordinates. The inverse matrix performs this reverse transformation.

3.  **Calculate the change-of-coordinates matrix $P_{B \to B'}$:**
    The formula is $P_{B \to B'} = P_{B'}^{-1} P_B$.
    $$ P_{B \to B'} = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix} \begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix} $$
    $$ P_{B \to B'} = \begin{pmatrix} (1/2)(1) + (1/2)(2) & (1/2)(3) + (1/2)(1) \\ (-1/2)(1) + (1/2)(2) & (-1/2)(3) + (1/2)(1) \end{pmatrix} $$
    $$ P_{B \to B'} = \begin{pmatrix} 1/2 + 1 & 3/2 + 1/2 \\ -1/2 + 1 & -3/2 + 1/2 \end{pmatrix} $$
    $$ P_{B \to B'} = \begin{pmatrix} 3/2 & 2 \\ 1/2 & -1 \end{pmatrix} $$
    *Explanation:* This matrix $P_{B \to B'}$ is the "translator" that directly converts coordinates from basis $B$ to basis $B'$. We obtain it by first transforming from $B$ to standard (using $P_B$) and then from standard to $B'$ (using $P_{B'}^{-1}$).

4.  **Apply $P_{B \to B'}$ to $[v]_B$ to find $[v]_{B'}$:**
    $$ [v]_{B'} = P_{B \to B'} [v]_B = \begin{pmatrix} 3/2 & 2 \\ 1/2 & -1 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} (3/2)(1) + (2)(2) \\ (1/2)(1) + (-1)(2) \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} 3/2 + 4 \\ 1/2 - 2 \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} 3/2 + 8/2 \\ 1/2 - 4/2 \end{pmatrix} $$
    $$ \mathbf{[v]_{B'} = \begin{pmatrix} 11/2 \\ -3/2 \end{pmatrix}} $$
    *Explanation:* We multiply the change-of-coordinates matrix by the given coordinate vector in basis $B$ to get the equivalent coordinate vector in basis $B'$.

**Reflection:** This example demonstrates the general case of changing between two non-standard bases. It reinforces the formula $P_{B \to B'} = P_{B'}^{-1} P_B$. It's crucial to correctly identify which matrix needs to be inverted and the order of multiplication.

---

### Example 3: Change of Basis in $\mathbb{R}^3$ (Harder, requires $3 \times 3$ inverse)

**Problem:** Let $B = \{b_1, b_2, b_3\}$ where $b_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $b_2 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$, $b_3 = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$.
Let $B' = \{b'_1, b'_2, b'_3\}$ where $b'_1 = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$, $b'_2 = \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix}$, $b'_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.
Given $[v]_B = \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix}$, find $[v]_{B'}$.

**Given:**
*   Basis $B = \{b_1, b_2, b_3\}$ as specified.
*   Basis $B' = \{b'_1, b'_2, b'_3\}$ as specified.
*   Coordinate vector $[v]_B = \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix}$.

**Want:** The coordinate vector $[v]_{B'}$.

**Solution:**

1.  **Construct $P_B$ and $P_{B'}$:**
    $$ P_B = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix} $$
    $$ P_{B'} = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 2 & 1 \end{pmatrix} $$
    *Explanation:* These matrices are formed by placing the basis vectors as columns. $P_B$ transforms coordinates from $B$ to standard, and $P_{B'}$ transforms coordinates from $B'$ to standard.

2.  **Find $P_{B'}^{-1}$ (using Gaussian elimination for $3 \times 3$ matrix):**
    We augment $P_{B'}$ with the identity matrix and row-reduce: $[P_{B'} | I]$
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 0 & 0 \\ 2 & 1 & 0 & 0 & 1 & 0 \\ 3 & 2 & 1 & 0 & 0 & 1 \end{array} \right] $$
    $R_2 \to R_2 - 2R_1$:
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 0 & 0 \\ 0 & 1 & 0 & -2 & 1 & 0 \\ 3 & 2 & 1 & 0 & 0 & 1 \end{array} \right] $$
    $R_3 \to R_3 - 3R_1$:
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 0 & 0 \\ 0 & 1 & 0 & -2 & 1 & 0 \\ 0 & 2 & 1 & -3 & 0 & 1 \end{array} \right] $$
    $R_3 \to R_3 - 2R_2$:
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 0 & 0 \\ 0 & 1 & 0 & -2 & 1 & 0 \\ 0 & 0 & 1 & -3 - 2(-2) & 0 - 2(1) & 1 - 2(0) \end{array} \right] $$
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 0 & 0 \\ 0 & 1 & 0 & -2 & 1 & 0 \\ 0 & 0 & 1 & 1 & -2 & 1 \end{array} \right] $$
    So, $P_{B'}^{-1} = \begin{pmatrix} 1 & 0 & 0 \\ -2 & 1 & 0 \\ 1 & -2 & 1 \end{pmatrix}$.
    *Explanation:* We use Gaussian elimination (row operations) to transform the augmented matrix $[P_{B'} | I]$ into $[I | P_{B'}^{-1}]$. This systematic process finds the inverse of the $3 \times 3$ matrix.

3.  **Calculate the change-of-coordinates matrix $P_{B \to B'}$:**
    $P_{B \to B'} = P_{B'}^{-1} P_B$.
    $$ P_{B \to B'} = \begin{pmatrix} 1 & 0 & 0 \\ -2 & 1 & 0 \\ 1 & -2 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{pmatrix} $$
    $$ P_{B \to B'} = \begin{pmatrix} 1(1)+0(0)+0(0) & 1(1)+0(1)+0(0) & 1(1)+0(1)+0(1) \\ -2(1)+1(0)+0(0) & -2(1)+1(1)+0(0) & -2(1)+1(1)+0(1) \\ 1(1)+(-2)(0)+1(0) & 1(1)+(-2)(1)+1(0) & 1(1)+(-2)(1)+1(1) \end{pmatrix} $$
    $$ P_{B \to B'} = \begin{pmatrix} 1 & 1 & 1 \\ -2 & -1 & -1 \\ 1 & -1 & 0 \end{pmatrix} $$
    *Explanation:* This matrix directly translates coordinates from basis $B$ to basis $B'$. It's the product of the inverse of the target basis matrix and the source basis matrix.

4.  **Apply $P_{B \to B'}$ to $[v]_B$ to find $[v]_{B'}$:**
    $$ [v]_{B'} = P_{B \to B'} [v]_B = \begin{pmatrix} 1 & 1 & 1 \\ -2 & -1 & -1 \\ 1 & -1 & 0 \end{pmatrix} \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} 1(2)+1(-1)+1(3) \\ -2(2)+(-1)(-1)+(-1)(3) \\ 1(2)+(-1)(-1)+0(3) \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} 2 - 1 + 3 \\ -4 + 1 - 3 \\ 2 + 1 + 0 \end{pmatrix} $$
    $$ \mathbf{[v]_{B'} = \begin{pmatrix} 4 \\ -6 \\ 3 \end{pmatrix}} $$
    *Explanation:* The final matrix multiplication applies the change of basis transformation to the given coordinate vector.

**Reflection:** This example is harder due to the $3 \times 3$ matrix inversion, which is more computationally intensive. The process remains the same: construct the basis matrices, invert the target basis matrix, multiply them to get the change-of-basis matrix, and then apply it to the vector's coordinates.

---

### Example 4: Alternative Method - Constructing $P_{B \to B'}$ by Expressing Old Basis Vectors in New Basis

**Problem:** Using the same bases as Example 2:
$B = \{b_1, b_2\}$ with $b_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $b_2 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.
$B' = \{b'_1, b'_2\}$ with $b'_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $b'_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
Find the change-of-coordinates matrix $P_{B \to B'}$ directly, and then use it to find $[v]_{B'}$ for $[v]_B = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.

**Given:**
*   Basis $B = \{b_1, b_2\}$ as specified.
*   Basis $B' = \{b'_1, b'_2\}$ as specified.
*   Coordinate vector $[v]_B = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$.

**Want:** The change-of-coordinates matrix $P_{B \to B'}$ and then $[v]_{B'}$.

**Solution:**

1.  **Express each vector in $B$ as a linear combination of vectors in $B'$:**
    The columns of $P_{B \to B'}$ are $[b_1]_{B'}$ and $[b_2]_{B'}$.

    *   **Find $[b_1]_{B'}$:** We need to find $c_1, c_2$ such that $b_1 = c_1 b'_1 + c_2 b'_2$.
        $$ \begin{pmatrix} 1 \\ 2 \end{pmatrix} = c_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} -1 \\ 1 \end{pmatrix} $$
        This leads to the system of equations:
        $c_1 - c_2 = 1$
        $c_1 + c_2 = 2$
        Adding the equations: $2c_1 = 3 \implies c_1 = 3/2$.
        Substituting $c_1$ into the second equation: $3/2 + c_2 = 2 \implies c_2 = 2 - 3/2 = 1/2$.
        So, $[b_1]_{B'} = \begin{pmatrix} 3/2 \\ 1/2 \end{pmatrix}$.
        *Explanation:* We're finding the "recipe" for $b_1$ using the ingredients from basis $B'$. This gives us the first column of our change-of-basis matrix.

    *   **Find $[b_2]_{B'}$:** We need to find $d_1, d_2$ such that $b_2 = d_1 b'_1 + d_2 b'_2$.
        $$ \begin{pmatrix} 3 \\ 1 \end{pmatrix} = d_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + d_2 \begin{pmatrix} -1 \\ 1 \end{pmatrix} $$
        This leads to the system of equations:
        $d_1 - d_2 = 3$
        $d_1 + d_2 = 1$
        Adding the equations: $2d_1 = 4 \implies d_1 = 2$.
        Substituting $d_1$ into the second equation: $2 + d_2 = 1 \implies d_2 = 1 - 2 = -1$.
        So, $[b_2]_{B'} = \begin{pmatrix} 2 \\ -1 \end{pmatrix}$.
        *Explanation:* Similarly, we find the "recipe" for $b_2$ using the ingredients from basis $B'$. This gives us the second column.

2.  **Construct $P_{B \to B'}$:**
    The matrix $P_{B \to B'}$ has $[b_1]_{B'}$ as its first column and $[b_2]_{B'}$ as its second column.
    $$ \mathbf{P_{B \to B'} = \begin{pmatrix} 3/2 & 2 \\ 1/2 & -1 \end{pmatrix}} $$
    *Explanation:* This matrix is the direct translator from basis $B$ to basis $B'$. Each column tells us how one of the "old" basis vectors ($b_i$) is expressed in terms of the "new" basis vectors ($b'_j$).

3.  **Apply $P_{B \to B'}$ to $[v]_B$ to find $[v]_{B'}$:**
    $$ [v]_{B'} = P_{B \to B'} [v]_B = \begin{pmatrix} 3/2 & 2 \\ 1/2 & -1 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} (3/2)(1) + (2)(2) \\ (1/2)(1) + (-1)(2) \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} 3/2 + 4 \\ 1/2 - 2 \end{pmatrix} $$
    $$ [v]_{B'} = \begin{pmatrix} 3/2 + 8/2 \\ 1/2 - 4/2 \end{pmatrix} $$
    $$ \mathbf{[v]_{B'} = \begin{pmatrix} 11/2 \\ -3/2 \end{pmatrix}} $$
    *Explanation:* This step is identical to the final step in Example 2, confirming that both methods yield the same change-of-coordinates matrix and result.

**Reflection:** This alternative method is often more intuitive for directly constructing $P_{B \to B'}$. It involves solving multiple systems of linear equations (one for each old basis vector) rather than inverting a matrix. For smaller matrices, it can sometimes feel simpler, but for larger matrices, Gaussian elimination for inverse might be more systematic. The trickiest part is ensuring you're expressing the *old* basis vectors in terms of the *new* basis vectors.

## 6. Common mistakes and traps

1.  **Confusing $P_{B \to B'}$ with $P_{B' \to B}$:** These are inverses of each other. $P_{B \to B'}$ takes coordinates from $B$ to $B'$, while $P_{B' \to B}$ takes coordinates from $B'$ to $B$. Students often apply the wrong matrix or forget to invert.
2.  **Incorrectly inverting the matrix:** When using the formula $P_{B \to B'} = P_{B'}^{-1} P_B$, students sometimes invert $P_B$ instead of $P_{B'}$, or invert both, or neither. Remember, the matrix for the *target* basis ($B'$) needs to be inverted.
3.  **Mixing up the order of matrix multiplication:** Matrix multiplication is not commutative. $P_{B'}^{-1} P_B$ is not the same as $P_B P_{B'}^{-1}$. The order matters: $P_{B'}^{-1}$ (from standard to $B'$) acts on $P_B [v]_B$ (which is $v$ in standard coordinates).
4.  **Assuming the vector itself changes:** The vector $v$ in the vector space is a geometric entity that remains fixed. Only its numerical representation (its coordinate vector) changes when viewed from a different basis.
5.  **Using basis vectors as rows instead of columns:** When constructing the matrix $P_B$ (or $P_{B'}$), the basis vectors must be placed as *columns*. Using them as rows will result in an incorrect matrix.
6.  **Forgetting that coordinates are *scalars*:** A coordinate vector $[v]_B$ is a column vector of scalars, not vectors themselves. For example, if $v = 3b_1 + 2b_2$, then $[v]_B = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$, not $\begin{pmatrix} 3b_1 \\ 2b_2 \end{pmatrix}$.

## 7. Textbook-precise explanation

Let $V$ be an $n$-dimensional vector space.
Let $B = \{b_1, b_2, \dots, b_n\}$ and $B' = \{b'_1, b'_2, \dots, b'_n\}$ be two ordered bases for $V$.

For any vector $v \in V$, its coordinate vector with respect to basis $B$, denoted $[v]_B$, is the unique column vector $\begin{pmatrix} c_1 \\ \vdots \\ c_n \end{pmatrix}$ such that $v = c_1 b_1 + \dots + c_n b_n$. Similarly for $[v]_{B'}$.

**Definition (Change-of-Coordinates Matrix):**
The **change-of-coordinates matrix from basis $B$ to basis $B'$**, denoted $P_{B \to B'}$, is the unique $n \times n$ matrix such that for any vector $v \in V$:
$$[v]_{B'} = P_{B \to B'} [v]_B$$

**Theorem 1 (Construction of $P_{B \to B'}$):**
The columns of the change-of-coordinates matrix $P_{B \to B'}$ are the coordinate vectors of the basis vectors from $B$ with respect to the basis $B'$. That is:
$$P_{B \to B'} = [[b_1]_{B'} \ [b_2]_{B'} \ \dots \ [b_n]_{B'}] $$
This means that to find $P_{B \to B'}$, one must solve $n$ vector equations of the form $b_j = x_1 b'_1 + \dots + x_n b'_n$ for $j=1, \dots, n$, where the solution $(x_1, \dots, x_n)$ forms the $j$-th column of $P_{B \to B'}$.

**Theorem 2 (Inverse Relationship):**
If $P_{B \to B'}$ is the change-of-coordinates matrix from $B$ to $B'$, then its inverse, $(P_{B \to B'})^{-1}$, is the change-of-coordinates matrix from $B'$ to $B$.
$$(P_{B \to B'})^{-1} = P_{B' \to B}$$

**Theorem 3 (Change of Basis via Standard Basis):**
Let $E = \{e_1, e_2, \dots, e_n\}$ be the standard basis for $\mathbb{R}^n$.
Let $P_B$ be the matrix whose columns are the vectors in $B$ (expressed in standard coordinates), i.e., $P_B = [b_1 \ b_2 \ \dots \ b_n]$. This matrix $P_B$ is precisely the change-of-coordinates matrix from $B$ to $E$, so $P_{B \to E} = P_B$.
Similarly, $P_{B' \to E} = P_{B'}$.
Then, the change-of-coordinates matrix from $B$ to $B'$ can be computed as:
$$P_{B \to B'} = P_{B'}^{-1} P_B$$
This formula works because $P_B$ transforms $[v]_B$ into standard coordinates $v$ (i.e., $[v]_E$), and then $P_{B'}^{-1}$ transforms these standard coordinates into coordinates with respect to $B'$.

**Relationship between Theorem 1 and Theorem 3:**
Theorem 1 provides a direct method to construct $P_{B \to B'}$. Theorem 3 provides a computational shortcut, especially when working in $\mathbb{R}^n$, by leveraging the standard basis as an intermediary. Both methods yield the same matrix. To see this, consider the equation $b_j = P_{B'} [b_j]_{B'}$. Multiplying by $P_{B'}^{-1}$ gives $[b_j]_{B'} = P_{B'}^{-1} b_j$. Since $b_j$ is a column vector in standard coordinates, this is equivalent to $P_{B'}^{-1} P_B = [[P_{B'}^{-1} b_1] \ \dots \ [P_{B'}^{-1} b_n]] = [[b_1]_{B'} \ \dots \ [b_n]_{B'}]$.

**Reference:**
*   Lay, Lay, McDonald, "Linear Algebra and Its Applications", 5th Edition, Chapter 4, Section 4.7: "Change of Basis".

## 8. ASCII diagrams

Let's visualize two bases, $B$ and $B'$, in $\mathbb{R}^2$ and a vector $v$.

```text
       ^ y (standard)
       |
       |
       |  b'_2
       |  /
       | /
       |/
-------+-----------------> x (standard)
       |\
       | \
       |  \ b_2
       |   \
       |    \
       |     v (vector)
       |    /|
       |   / |
       |  /  |
       | /   |
       |/    |
      b_1   b'_1
       
Description:
- The standard basis vectors (1,0) and (0,1) implicitly define the x and y axes.
- Basis B = {b_1, b_2}:
    - b_1 is a vector pointing roughly up-left (e.g., (-0.5, 1)).
    - b_2 is a vector pointing roughly down-right (e.g., (1, -0.5)).
- Basis B' = {b'_1, b'_2}:
    - b'_1 is a vector pointing roughly up-right (e.g., (1, 0.5)).
    - b'_2 is a vector pointing roughly up-left (e.g., (-0.5, 1)).
- Vector v: A single vector originating from the origin.

To describe v in basis B:
Draw lines parallel to b_1 and b_2