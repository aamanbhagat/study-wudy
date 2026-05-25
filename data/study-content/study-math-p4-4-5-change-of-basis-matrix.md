## 1. What it is — in plain English

Imagine you have a specific location in a city, say "the coffee shop." You could tell someone how to get there by saying, "Go 3 blocks North and 2 blocks East from the main square." Here, "main square," "North," and "East" form your reference system.

Now, imagine a new friend arrives from out of town, and their reference point is "my hotel," and they prefer directions like "Go 5 blocks towards the river and 1 block towards the mountains." The coffee shop hasn't moved, but the way you describe its location has changed because your fundamental directions and starting point are different.

In linear algebra, a "vector" is like that specific location (the coffee shop) – it's an abstract entity that exists independently. A "basis" is like your chosen reference system (main square + North/East or hotel + river/mountains). It's a set of fundamental, independent "directions" that allow you to describe *any* vector as a combination of them. The "coordinates" of a vector are the specific numbers you use to combine these directions to reach your vector.

A "change of basis matrix" is simply a translator. It's a special mathematical tool (a matrix) that takes the coordinates of a vector described in one reference system (one basis) and spits out the coordinates of the *exact same vector* described in a different reference system (another basis). It doesn't change the vector itself, only its numerical description.

## 2. Why it matters — real-world applications

The ability to translate between different ways of describing the same underlying reality is fundamental across many scientific and engineering disciplines.

1.  **Computer Graphics and Animation (e.g., Pixar, Unity/Unreal Engine):** In 3D graphics, objects are often defined in their own "local" coordinate system (e.g., the center of a character's hand is its origin). The camera viewing the scene has its own coordinate system, and the entire scene exists within a "world" coordinate system. Change of basis matrices are used constantly to transform an object's local coordinates into world coordinates, then into camera coordinates, and finally into the 2D screen coordinates. This allows for complex animations, realistic perspective, and interactive camera movements.

2.  **Robotics and Control Systems (e.g., Boston Dynamics, self-driving cars):** A robot arm's joints and end-effector (gripper) each have their own local coordinate systems. To control the gripper to pick up an object, the robot needs to know the object's position in the "world" and then translate that into the specific angles and positions of its joints. This involves a chain of change of basis transformations from the world frame to the base of the robot, then to each successive joint. Similarly, sensor data (e.g., from a lidar on a self-driving car) might be in the sensor's local frame and needs to be transformed into the car's frame, then into a global map frame.

3.  **Physics and Engineering (e.g., Aerospace Engineering, Quantum Mechanics):**
    *   **Aerospace:** When tracking a satellite, engineers might use an Earth-Centered, Earth-Fixed (ECEF) coordinate system for ground stations, but an Earth-Centered Inertial (ECI) frame for orbital mechanics calculations. The change of basis matrix (often involving rotations due to Earth's spin) allows seamless translation between these frames.
    *   **Quantum Mechanics:** When solving problems involving a particle in a potential, it's often convenient to choose a basis of energy eigenstates. However, if the potential changes, or if we want to describe the particle's position, we might need to change to a position basis. Change of basis matrices (or more generally, transformation operators) are used to move between these different representations of the quantum state.

4.  **Machine Learning and Data Science (e.g., Principal Component Analysis):** In techniques like Principal Component Analysis (PCA), the goal is to find a new basis for your data that captures the most variance in fewer dimensions. This new basis is often a rotation of the original basis. The change of basis matrix allows you to project your high-dimensional data onto this new, lower-dimensional basis, reducing noise and highlighting important features. This is crucial for tasks like image compression, facial recognition, and understanding complex datasets.

## 3. Prerequisites — what you must know first

Before diving deep into change of basis matrices, ensure you have a solid grasp of these foundational linear algebra concepts. If any of these sound unfamiliar, pause and review them thoroughly.

*   **Vector Spaces:** A set of vectors that can be added together and multiplied by scalars, satisfying certain axioms (e.g., $\mathbb{R}^n$, polynomial spaces).
*   **Linear Combinations:** Expressing a vector as a sum of scalar multiples of other vectors (e.g., $c_1\mathbf{v}_1 + c_2\mathbf{v}_2$).
*   **Span:** The set of all possible linear combinations of a given set of vectors; what space they "reach."
*   **Linear Independence:** A set of vectors where no vector can be written as a linear combination of the others (none are redundant).
*   **Basis of a Vector Space:** A set of linearly independent vectors that span the entire vector space. It's the minimal set of vectors needed to describe every vector in the space.
*   **Coordinates of a Vector with respect to a Basis:** The unique scalar coefficients used in the linear combination of basis vectors to represent a given vector.
*   **Matrix Multiplication:** The process of multiplying two matrices, where the result's entries are dot products of rows from the first matrix and columns from the second.
*   **Identity Matrix:** A square matrix with ones on the main diagonal and zeros elsewhere; it acts like the number 1 in matrix multiplication ($AI = IA = A$).
*   **Inverse of a Matrix:** For a square matrix $A$, its inverse $A^{-1}$ satisfies $AA^{-1} = A^{-1}A = I$.
*   **Linear Transformations:** A function between vector spaces that preserves vector addition and scalar multiplication ($T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ and $T(c\mathbf{u}) = cT(\mathbf{u})$).
*   **Representing Linear Transformations with Matrices:** How any linear transformation between finite-dimensional vector spaces can be uniquely represented by a matrix once bases for the domain and codomain are chosen.

## 4. The core idea — step by step

Let's build up the concept of a change of basis matrix piece by piece, starting with the fundamental idea and gradually introducing the formal machinery.

### Step 1: Vectors are independent of coordinate systems.

*   **Plain English:** Imagine an arrow drawn on a piece of paper. That arrow *is* what it is. It has a specific length and points in a specific direction. You can describe it using different sets of numbers (coordinates) depending on where you place your ruler and how you orient it, but the physical arrow itself doesn't change.
*   **Small concrete example:** Consider a physical displacement in a room: "move 2 meters forward and 1 meter to the right." This physical action is independent of whether you're using a compass (North, East) or the room's walls (Wall A, Wall B) as your reference.
*   **Formal/Mathematical version:** A vector $\mathbf{v}$ exists as an element of a vector space $V$. Its existence is intrinsic and not tied to any particular basis.
*   **What could go wrong:** A common mistake is to confuse the vector itself with its coordinate representation. The coordinates are merely a description *of* the vector *with respect to a chosen basis*.

### Step 2: A basis defines a coordinate system.

*   **Plain English:** A basis is like a fundamental set of "measuring sticks" or "directions" that you use to describe any point or vector in your space. For a 2D plane, you need two independent directions. For 3D space, you need three. These directions are your fundamental rulers.
*   **Small concrete example:** In $\mathbb{R}^2$, the *standard basis* is $E = \{\mathbf{e}_1, \mathbf{e}_2\} = \left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$. This is like using the x-axis and y-axis. But you could also use a *non-standard basis* like $B = \left\{ \mathbf{b}_1, \mathbf{b}_2 \right\} = \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \end{pmatrix} \right\}$. This is like using two diagonal axes. Both are valid ways to define a coordinate system.
*   **Formal/Mathematical version:** For an $n$-dimensional vector space $V$, any ordered basis $B = \{\mathbf{b}_1, \mathbf{b}_2, \dots, \mathbf{b}_n\}$ provides a unique way to represent any vector $\mathbf{v} \in V$ as a linear combination:
    $$ \mathbf{v} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2 + \dots + c_n \mathbf{b}_n $$
    The scalars $c_1, \dots, c_n$ are the coordinates of $\mathbf{v}$ with respect to basis $B$, denoted as $[\mathbf{v}]_B = \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix}$.
*   **What could go wrong:** If the set of vectors you choose isn't a basis (e.g., they are linearly dependent or don't span the entire space), then you don't have a valid coordinate system, and coordinates might not be unique or might not exist for all vectors.

### Step 3: A vector's coordinates change with the basis.

*   **Plain English:** The numbers you use to describe the same physical arrow will be different if you switch from one set of rulers (basis) to another. The arrow itself is unchanged, but its numerical address changes.
*   **Small concrete example:** Let $\mathbf{v} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$ in the standard basis $E = \left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$. So, $[\mathbf{v}]_E = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.
    Now consider the basis $B = \left\{ \mathbf{b}_1, \mathbf{b}_2 \right\} = \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \end{pmatrix} \right\}$.
    We want to find $c_1, c_2$ such that $\mathbf{v} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2$.
    $$ \begin{pmatrix} 3 \\ 1 \end{pmatrix} = c_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} -1 \\ 1 \end{pmatrix} = \begin{pmatrix} c_1 - c_2 \\ c_1 + c_2 \end{pmatrix} $$
    Solving the system:
    $c_1 - c_2 = 3$
    $c_1 + c_2 = 1$
    Adding the equations gives $2c_1 = 4 \implies c_1 = 2$.
    Substituting $c_1=2$ into the second equation gives $2 + c_2 = 1 \implies c_2 = -1$.
    So, $[\mathbf{v}]_B = \begin{pmatrix} 2 \\ -1 \end{pmatrix}$.
    Notice that $\begin{pmatrix} 3 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} 2 \\ -1 \end{pmatrix}$ are different numerical representations for the *same vector* $\mathbf{v}$.
*   **Formal/Mathematical version:** If $\mathbf{v} \in V$ and $B = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ and $C = \{\mathbf{c}_1, \dots, \mathbf{c}_n\}$ are two different bases for $V$, then $[\mathbf{v}]_B \neq [\mathbf{v}]_C$ in general.
*   **What could go wrong:** Forgetting that coordinates are *relative* to a basis. You should always specify the basis when writing coordinates, especially if there's ambiguity.

### Step 4: Expressing one basis in terms of another.

*   **Plain English:** To build our "translator," we need to know how the "new ruler's" fundamental directions (the new basis vectors) look when described using the "old ruler's" fundamental directions (the old basis vectors).
*   **Small concrete example:** Let $B = \{\mathbf{b}_1, \mathbf{b}_2\}$ be our "old" basis and $C = \{\mathbf{c}_1, \mathbf{c}_2\}$ be our "new" basis.
    Let $\mathbf{b}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $\mathbf{b}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ (standard basis for simplicity).
    Let $\mathbf{c}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$, $\mathbf{c}_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
    We need to express each vector in $C$ as a linear combination of vectors in $B$.
    $\mathbf{c}_1 = 1 \cdot \mathbf{b}_1 + 1 \cdot \mathbf{b}_2 \implies [\mathbf{c}_1]_B = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
    $\mathbf{c}_2 = -1 \cdot \mathbf{b}_1 + 1 \cdot \mathbf{b}_2 \implies [\mathbf{c}_2]_B = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
*   **Formal/Mathematical version:** Given two bases $B = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ and $C = \{\mathbf{c}_1, \dots, \mathbf{c}_n\}$ for $V$, we can express each vector in $C$ as a linear combination of the vectors in $B$:
    $$ \mathbf{c}_1 = p_{11}\mathbf{b}_1 + p_{21}\mathbf{b}_2 + \dots + p_{n1}\mathbf{b}_n $$
    $$ \mathbf{c}_2 = p_{12}\mathbf{b}_1 + p_{22}\mathbf{b}_2 + \dots + p_{n2}\mathbf{b}_n $$
    $$ \vdots $$
    $$ \mathbf{c}_n = p_{1n}\mathbf{b}_1 + p_{2n}\mathbf{b}_2 + \dots + p_{nn}\mathbf{b}_n $$
    The coefficients $p_{ij}$ are the coordinates of $\mathbf{c}_j$ with respect to basis $B$. That is, $[\mathbf{c}_j]_B = \begin{pmatrix} p_{1j} \\ p_{2j} \\ \vdots \\ p_{nj} \end{pmatrix}$.
*   **What could go wrong:** This is a crucial step for setting up the matrix. The most common mistake is to try to express the *old* basis vectors in terms of the *new* basis vectors if you're trying to build the matrix $P_{B \leftarrow C}$. Always express the *new* basis vectors in terms of the *target* basis.

### Step 5: Constructing the change of basis matrix.

*   **Plain English:** We gather all those coordinate descriptions from Step 4 and arrange them into a matrix. Each column of this matrix will be one of the "new" basis vectors, but written using the "old" basis's coordinates. This matrix is our translator.
*   **Small concrete example:** Using the example from Step 4, where $B$ is the standard basis and $C = \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \end{pmatrix} \right\}$.
    We found $[\mathbf{c}_1]_B = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $[\mathbf{c}_2]_B = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.
    The change of basis matrix from basis $C$ to basis $B$, denoted $P_{B \leftarrow C}$, is formed by placing these coordinate vectors as its columns:
    $$ P_{B \leftarrow C} = \left[ \begin{array}{cc|cc} [\mathbf{c}_1]_B & [\mathbf{c}_2]_B \end{array} \right] = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} $$
*   **Formal/Mathematical version:** The change of basis matrix from basis $C = \{\mathbf{c}_1, \dots, \mathbf{c}_n\}$ to basis $B = \{\mathbf{b}_1, \dots, \mathbf{b}_n\}$ is denoted $P_{B \leftarrow C}$ (or sometimes $P_{B,C}$ or $P_{C \to B}$, but $P_{B \leftarrow C}$ is most common and intuitive, meaning "from C to B"). It is the matrix whose columns are the coordinate vectors of the basis vectors in $C$ with respect to basis $B$:
    $$ P_{B \leftarrow C} = \left[ \begin{array}{cccc} [\mathbf{c}_1]_B & [\mathbf{c}_2]_B & \dots & [\mathbf{c}_n]_B \end{array} \right] $$
    This matrix is also sometimes called the "transition matrix from $C$ to $B$."
*   **What could go wrong:**
    1.  **Order of indices:** The subscript $B \leftarrow C$ means "from $C$ to $B$." The columns must be the vectors of $C$ expressed in terms of $B$.
    2.  **Column vs. Row:** Always place the coordinate vectors as *columns*, not rows.
    3.  **Which basis in which coordinates:** Make sure you're expressing the *new* basis vectors (the ones you're coming *from*) in terms of the *old* basis vectors (the ones you're going *to*).

### Step 6: Using the change of basis matrix.

*   **Plain English:** Once you have this translator matrix, you can use it to convert any vector's coordinates from the "new" basis to the "old" basis. You simply multiply the vector's coordinates (in the "new" basis) by the change of basis matrix.
*   **Small concrete example:** Let's use the matrix $P_{B \leftarrow C} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$ from Step 5.
    Recall from Step 3 that for $\mathbf{v} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$, we found $[\mathbf{v}]_C = \begin{pmatrix} 2 \\ -1 \end{pmatrix}$.
    We expect to get $[\mathbf{v}]_B = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$ (since $B$ was the standard basis in this example, $[\mathbf{v}]_B$ is just $\mathbf{v}$ itself).
    Let's compute:
    $$ P_{B \leftarrow C} [\mathbf{v}]_C = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 2 \\ -1 \end{pmatrix} = \begin{pmatrix} (1)(2) + (-1)(-1) \\ (1)(2) + (1)(-1) \end{pmatrix} = \begin{pmatrix} 2 + 1 \\ 2 - 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix} $$
    This matches $[\mathbf{v}]_B$. The matrix successfully translated the coordinates!
*   **Formal/Mathematical version:** If $\mathbf{v} \in V$ and you have its coordinates with respect to basis $C$, denoted $[\mathbf{v}]_C$, then its coordinates with respect to basis $B$, denoted $[\mathbf{v}]_B$, can be found by:
    $$ [\mathbf{v}]_B = P_{B \leftarrow C} [\mathbf{v}]_C $$
    This equation is the fundamental application of the change of basis matrix.
*   **What could go wrong:**
    1.  **Direction of transformation:** Always ensure you're using $P_{B \leftarrow C}$ when converting from $C$ to $B$. Using $P_{C \leftarrow B}$ would give you the wrong result.
    2.  **Matrix multiplication order:** Matrix multiplication is not commutative. The change of basis matrix must be on the left of the coordinate vector.

### Step 7: The inverse relationship.

*   **Plain English:** If you have a translator that goes from language C to language B, you can also use it to go from B to C by "undoing" its action. In matrices, "undoing" means finding the inverse.
*   **Small concrete example:** From Step 5, we found $P_{B \leftarrow C} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$.
    To find $P_{C \leftarrow B}$, we need to compute the inverse of $P_{B \leftarrow C}$.
    For a $2 \times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
    $$ P_{C \leftarrow B} = P_{B \leftarrow C}^{-1} = \frac{1}{(1)(1) - (-1)(1)} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \frac{1}{1 - (-1)} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \frac{1}{2} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix} $$
    Now, we can use this to convert from $B$ coordinates to $C$ coordinates:
    $[\mathbf{v}]_C = P_{C \leftarrow B} [\mathbf{v}]_B$.
    Using $[\mathbf{v}]_B = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$ from Step 3:
    $$ P_{C \leftarrow B} [\mathbf{v}]_B = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix} \begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} (1/2)(3) + (1/2)(1) \\ (-1/2)(3) + (1/2)(1) \end{pmatrix} = \begin{pmatrix} 3/2 + 1/2 \\ -3/2 + 1/2 \end{pmatrix} = \begin{pmatrix} 4/2 \\ -2/2 \end{pmatrix} = \begin{pmatrix} 2 \\ -1 \end{pmatrix} $$
    This correctly gives us $[\mathbf{v}]_C$.
*   **Formal/Mathematical version:** The change of basis matrix $P_{B \leftarrow C}$ is always invertible because both $B$ and $C$ are bases, meaning their vectors are linearly independent. The inverse matrix $P_{B \leftarrow C}^{-1}$ is precisely the change of basis matrix from $B$ to $C$:
    $$ P_{C \leftarrow B} = P_{B \leftarrow C}^{-1} $$
    This means that if you want to find $[\mathbf{v}]_C$ from $[\mathbf{v}]_B$, you would compute:
    $$ [\mathbf{v}]_C = P_{C \leftarrow B} [\mathbf{v}]_B = P_{B \leftarrow C}^{-1} [\mathbf{v}]_B $$
*   **What could go wrong:** Forgetting that the inverse matrix goes in the opposite direction. Also, remember that only square matrices have inverses, and only invertible matrices can be used this way. Since bases always have the same number of vectors as the dimension of the space, change of basis matrices are always square. Since basis vectors are linearly independent, the matrix will always be invertible.

## 5. Worked examples — multiple, with every step shown

### Example 1: Standard basis to a non-standard basis in $\mathbb{R}^2$

**Problem:** Let $E = \{\mathbf{e}_1, \mathbf{e}_2\} = \left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$ be the standard basis for $\mathbb{R}^2$, and let $B = \{\mathbf{b}_1, \mathbf{b}_2\} = \left\{ \begin{pmatrix} 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \end{pmatrix} \right\}$ be another basis for $\mathbb{R}^2$.
Find the change of basis matrix $P_{E \leftarrow B}$ (from $B$ to $E$) and use it to find the standard coordinates of a vector $\mathbf{v}$ whose $B$-coordinates are $[\mathbf{v}]_B = \begin{pmatrix} 3 \\ -2 \end{pmatrix}$.

**Given:**
*   Standard basis $E = \left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$.
*   Basis $B = \left\{ \begin{pmatrix} 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \end{pmatrix} \right\}$.
*   $B$-coordinates of $\mathbf{v}$: $[\mathbf{v}]_B = \begin{pmatrix} 3 \\ -2 \end{pmatrix}$.

**Want:**
1.  Change of basis matrix $P_{E \leftarrow B}$.
2.  Standard coordinates of $\mathbf{v}$: $[\mathbf{v}]_E$.

**Solution:**

**Step 1: Construct $P_{E \leftarrow B}$.**
The matrix $P_{E \leftarrow B}$ has as its columns the vectors of basis $B$ expressed in terms of basis $E$.
Since $E$ is the standard basis, the coordinates of any vector $\mathbf{x}$ in $E$ are just the components of $\mathbf{x}$ itself, i.e., $[\mathbf{x}]_E = \mathbf{x}$.

*   Express $\mathbf{b}_1$ in terms of $E$:
    $\mathbf{b}_1 = \begin{pmatrix} 2 \\ 1 \end{pmatrix} = 2 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + 1 \begin{pmatrix} 0 \\ 1 \end{pmatrix} = 2\mathbf{e}_1 + 1\mathbf{e}_2$.
    So, $[\mathbf{b}_1]_E = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.
    *This step expresses the first basis vector of $B$ as a linear combination of the standard basis vectors. Since the standard basis vectors are just the unit vectors, the coefficients are simply the components of $\mathbf{b}_1$ itself.*

*   Express $\mathbf{b}_2$ in terms of $E$:
    $\mathbf{b}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix} = 1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + 1 \begin{pmatrix} 0 \\ 1 \end{pmatrix} = 1\mathbf{e}_1 + 1\mathbf{e}_2$.
    So, $[\mathbf{b}_2]_E = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
    *Similarly, this expresses the second basis vector of $B$ in terms of the standard basis.*

*   Form the matrix $P_{E \leftarrow B}$ by placing these coordinate vectors as columns:
    $$ P_{E \leftarrow B} = \left[ \begin{array}{cc} [\mathbf{b}_1]_E & [\mathbf{b}_2]_E \end{array} \right] = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} $$
    *The change of basis matrix from $B$ to $E$ is formed by taking the vectors of $B$ and writing them as columns in the matrix. This is a common shortcut when the target basis is the standard basis.*

**Step 2: Use $P_{E \leftarrow B}$ to find $[\mathbf{v}]_E$.**
We use the formula $[\mathbf{v}]_E = P_{E \leftarrow B} [\mathbf{v}]_B$.
$$ [\mathbf{v}]_E = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ -2 \end{pmatrix} $$
    *This is the core application of the change of basis matrix: multiplying the matrix by the coordinates in the "from" basis to get the coordinates in the "to" basis.*

Perform the matrix multiplication:
$$ [\mathbf{v}]_E = \begin{pmatrix} (2)(3) + (1)(-2) \\ (1)(3) + (1)(-2) \end{pmatrix} $$
$$ [\mathbf{v}]_E = \begin{pmatrix} 6 - 2 \\ 3 - 2 \end{pmatrix} $$
$$ [\mathbf{v}]_E = \begin{pmatrix} 4 \\ 1 \end{pmatrix} $$
    *Each component of the resulting vector is calculated as the dot product of a row of the matrix with the coordinate vector.*

**Final Answer:**
The change of basis matrix is $\boxed{P_{E \leftarrow B} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}}$.
The standard coordinates of $\mathbf{v}$ are $\boxed{[\mathbf{v}]_E = \begin{pmatrix} 4 \\ 1 \end{pmatrix}}$.

**Reflection:** This example was relatively easy because the target basis was the standard basis. This means expressing the new basis vectors in terms of the old basis vectors simply involved writing their components directly into the matrix columns.

---

### Example 2: Non-standard basis to another non-standard basis in $\mathbb{R}^2$

**Problem:** Let $B = \{\mathbf{b}_1, \mathbf{b}_2\} = \left\{ \begin{pmatrix} 1 \\ 2 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \end{pmatrix} \right\}$ and $C = \{\mathbf{c}_1, \mathbf{c}_2\} = \left\{ \begin{pmatrix} 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\}$ be two bases for $\mathbb{R}^2$.
Find the change of basis matrix $P_{C \leftarrow B}$ (from $B$ to $C$).

**Given:**
*   Basis $B = \left\{ \begin{pmatrix} 1 \\ 2 \end{pmatrix}, \begin{pmatrix} -1 \\ 1 \end{pmatrix} \right\}$.
*   Basis $C = \left\{ \begin{pmatrix} 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\}$.

**Want:** Change of basis matrix $P_{C \leftarrow B}$.

**Solution Strategy:** To find $P_{C \leftarrow B}$, we need to express each vector in basis $B$ as a linear combination of the vectors in basis $C$. That is, we need to find $[\mathbf{b}_1]_C$ and $[\mathbf{b}_2]_C$.

**Step 1: Find $[\mathbf{b}_1]_C$.**
We need to find scalars $x_1, x_2$ such that $\mathbf{b}_1 = x_1 \mathbf{c}_1 + x_2 \mathbf{c}_2$.
$$ \begin{pmatrix} 1 \\ 2 \end{pmatrix} = x_1 \begin{pmatrix} 2 \\ 1 \end{pmatrix} + x_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} $$
This forms a system of linear equations:
1.  $2x_1 + x_2 = 1$
2.  $x_1 - x_2 = 2$
    *We are setting up a system of equations to find the coordinates of $\mathbf{b}_1$ with respect to basis $C$. The coefficients $x_1, x_2$ are what we're looking for.*

We can solve this system using various methods (substitution, elimination, augmented matrix). Let's use elimination:
Add equation (1) and (2):
$(2x_1 + x_2) + (x_1 - x_2) = 1 + 2$
$3x_1 = 3 \implies x_1 = 1$.
    *Adding the two equations eliminates $x_2$, allowing us to solve for $x_1$.*

Substitute $x_1 = 1$ into equation (2):
$1 - x_2 = 2 \implies x_2 = -1$.
    *Substituting the value of $x_1$ back into one of the original equations allows us to solve for $x_2$.*

So, $[\mathbf{b}_1]_C = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.
    *This is the coordinate vector for $\mathbf{b}_1$ in the $C$ basis.*

**Step 2: Find $[\mathbf{b}_2]_C$.**
We need to find scalars $y_1, y_2$ such that $\mathbf{b}_2 = y_1 \mathbf{c}_1 + y_2 \mathbf{c}_2$.
$$ \begin{pmatrix} -1 \\ 1 \end{pmatrix} = y_1 \begin{pmatrix} 2 \\ 1 \end{pmatrix} + y_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} $$
This forms another system of linear equations:
3.  $2y_1 + y_2 = -1$
4.  $y_1 - y_2 = 1$
    *Similar to Step 1, we set up a system of equations for $\mathbf{b}_2$ with respect to basis $C$.*

Add equation (3) and (4):
$(2y_1 + y_2) + (y_1 - y_2) = -1 + 1$
$3y_1 = 0 \implies y_1 = 0$.
    *Again, elimination is used to solve for $y_1$.*

Substitute $y_1 = 0$ into equation (4):
$0 - y_2 = 1 \implies y_2 = -1$.
    *Solve for $y_2$.*

So, $[\mathbf{b}_2]_C = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$.
    *This is the coordinate vector for $\mathbf{b}_2$ in the $C$ basis.*

**Step 3: Form the change of basis matrix $P_{C \leftarrow B}$.**
The columns of $P_{C \leftarrow B}$ are $[\mathbf{b}_1]_C$ and $[\mathbf{b}_2]_C$.
$$ P_{C \leftarrow B} = \left[ \begin{array}{cc} [\mathbf{b}_1]_C & [\mathbf{b}_2]_C \end{array} \right] = \begin{pmatrix} 1 & 0 \\ -1 & -1 \end{pmatrix} $$
    *The change of basis matrix is constructed by placing the coordinate vectors found in Steps 1 and 2 as its columns.*

**Final Answer:**
The change of basis matrix from $B$ to $C$ is $\boxed{P_{C \leftarrow B} = \begin{pmatrix} 1 & 0 \\ -1 & -1 \end{pmatrix}}$.

**Reflection:** This example was more challenging because neither the source nor the target basis was the standard basis. This required solving a system of linear equations for *each* basis vector of the "from" basis to find its coordinates in the "to" basis. A common alternative approach for non-standard to non-standard basis changes is to first go to the standard basis, then from the standard basis to the target basis, i.e., $P_{C \leftarrow B} = P_{C \leftarrow E} P_{E \leftarrow B}$. This involves two matrix multiplications and finding an inverse, but sometimes it's computationally more straightforward, especially in higher dimensions.

---

### Example 3: Change of basis in $\mathbb{R}^3$ (using the standard basis as an intermediary)

**Problem:** Let $B = \{\mathbf{b}_1, \mathbf{b}_2, \mathbf{b}_3\} = \left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} \right\}$ and $C = \{\mathbf{c}_1, \mathbf{c}_2, \mathbf{c}_3\} = \left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} \right\}$ be two bases for $\mathbb{R}^3$.
Find the change of basis matrix $P_{C \leftarrow B}$ (from $B$ to $C$).

**Given:**
*   Basis $B = \left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix} \right\}$.
*   Basis $C = \left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} \right\}$.

**Want:** Change of basis matrix $P_{C \leftarrow B}$.

**Solution Strategy:** When neither basis is the standard basis, it's often easier to use the standard basis $E$ as an intermediary. The relationship is $P_{C \leftarrow B} = P_{C \leftarrow E} P_{E \leftarrow B}$.
Recall that $P_{E \leftarrow B}$ is simply the matrix whose columns are the vectors of $B$ (since $E$ is the standard basis).
And $P_{C \leftarrow E} = (P_{E \leftarrow C})^{-1}$.
So, we need to find $P_{E \leftarrow B}$, $P_{E \leftarrow C}$, and then compute $(P_{E \leftarrow C})^{-1}$ and multiply.

**Step 1: Construct $P_{E \leftarrow B}$.**
The columns of $P_{E \leftarrow B}$ are the vectors of $B$ themselves.
$$ P_{E \leftarrow B} = \left[ \begin{array}{ccc} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{array} \right] $$
    *This matrix directly translates coordinates from basis $B$ to the standard basis $E$.*

**Step 2: Construct $P_{E \leftarrow C}$.**
The columns of $P_{E \leftarrow C}$ are the vectors of $C$ themselves.
$$ P_{E \leftarrow C} = \left[ \begin{array}{ccc} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{array} \right] $$
    *This matrix directly translates coordinates from basis $C$ to the standard basis $E$.*

**Step 3: Compute $P_{C \leftarrow E} = (P_{E \leftarrow C})^{-1}$.**
We need to find the inverse of $P_{E \leftarrow C}$. We can do this using Gaussian elimination on the augmented matrix $[P_{E \leftarrow C} | I]$.
$$ \left[ \begin{array}{ccc|ccc} 1 & 1 & 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 & 1 & 0 \\ 0 & 0 & 1 & 0 & 0 & 1 \end{array} \right] $$
    *The goal is to transform the left side into the identity matrix, and the right side will become the inverse matrix.*

Perform row operations:
*   $R_1 \leftarrow R_1 - R_2$:
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & -1 & 0 \\ 0 & 1 & 1 & 0 & 1 & 0 \\ 0 & 0 & 1 & 0 & 0 & 1 \end{array} \right] $$
    *Subtracting $R_2$ from $R_1$ clears the second element in $R_1$. Note that the third element of $R_1$ also becomes 0 because $1-1=0$. This is a lucky simplification due to the triangular form of $P_{E \leftarrow C}$.*

*   $R_2 \leftarrow R_2 - R_3$:
    $$ \left[ \begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & -1 & 0 \\ 0 & 1 & 0 & 0 & 1 & -1 \\ 0 & 0 & 1 & 0 & 0 & 1 \end{array} \right] $$
    *Subtracting $R_3$ from $R_2$ clears the third element in $R_2$. Now the left side is the identity matrix.*

So, $P_{C \leftarrow E} = (P_{E \leftarrow C})^{-1} = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ 0 & 0 & 1 \end{pmatrix}$.
    *The right side of the augmented matrix is now the inverse matrix, which is $P_{C \leftarrow E}$.*

**Step 4: Compute $P_{C \leftarrow B} = P_{C \leftarrow E} P_{E \leftarrow B}$.**
$$ P_{C \leftarrow B} = \begin{pmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{pmatrix} $$
    *Now we multiply the two matrices we found. The order is crucial: $P_{C \leftarrow E}$ on the left, $P_{E \leftarrow B}$ on the right.*

Perform matrix multiplication:
*   Entry (1,1): $(1)(1) + (-1)(0) + (0)(1) = 1$
*   Entry (1,2): $(1)(1) + (-1)(1) + (0)(0) = 0$
*   Entry (1,3): $(1)(0) + (-1)(1) + (0)(1) = -1$
*   Entry (2,1): $(0)(1) + (1)(0) + (-1)(1) = -1$
*   Entry (2,2): $(0)(1) + (1)(1) + (-1)(0) = 1$
*   Entry (2,3): $(0)(0) + (1)(1) + (-1)(1) = 0$
*   Entry (3,1): $(0)(1) + (0)(0) + (1)(1) = 1$
*   Entry (3,2): $(0)(1) + (0)(1) + (1)(0) = 0$
*   Entry (3,3): $(0)(0) + (0)(1) + (1)(1) = 1$

So,
$$ P_{C \leftarrow B} = \begin{pmatrix} 1 & 0 & -1 \\ -1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix} $$
    *The final result of the matrix multiplication is the desired change of basis matrix.*

**Final Answer:**
The change of basis matrix from $B$ to $C$ is $\boxed{P_{C \leftarrow B} = \begin{pmatrix} 1 & 0 & -1 \\ -1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}}$.

**Reflection:** This example was harder due to the $3 \times 3$ matrices and the necessity of finding a matrix inverse. The strategy of using the standard basis as an intermediary is robust and often simplifies the process compared to solving three separate $3 \times 3$ systems of equations for each basis vector. The calculation of the inverse was made easier because $P_{E \leftarrow C}$ was an upper triangular matrix.

---

### Example 4: Change of basis for a Linear Transformation Matrix

**Problem:** Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be a linear transformation defined by $T\left( \begin{pmatrix} x \\ y \end{pmatrix} \right) = \begin{pmatrix} 2x + y \\ x - 3y \end{pmatrix}$.
Let $E = \{\mathbf{e}_1, \mathbf{e}_2\}$ be the standard basis, and $B = \{\mathbf{b}_1, \mathbf{b}_2\} = \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\}$ be another basis for $\mathbb{R}^2$.
Find the matrix representation of $T$ with respect to basis $B$, denoted $[T]_B$.

**Given:**
*   Linear transformation $T\left( \begin{pmatrix} x \\ y \end{pmatrix} \right) = \begin{pmatrix} 2x + y \\ x - 3y \end{pmatrix}$.
*   Standard basis $E = \left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$.
*   Basis $B = \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\}$.

**Want:** The matrix $[T]_B$.

**Solution Strategy:**
The matrix representation of $T$ with respect to basis $B$, $[T]_B$, transforms $B$-coordinates of a vector in the domain to $B$-coordinates of its image in the codomain.
The formula for changing the matrix representation of a linear transformation is:
$[T]_B = P_{B \leftarrow E} [T]_E P_{E \leftarrow B}$.
Here, $[T]_E$ is the matrix representation of $T$ with respect to the standard basis $E$.

**Step 1: Find $[T]_E$.**
To find $[T]_E$, we apply $T$ to each standard basis vector and write the results as columns.
*   $T(\mathbf{e}_1) = T\left( \begin{pmatrix} 1 \\ 0 \end{pmatrix} \right) = \begin{pmatrix} 2(1) + 0 \\ 1 - 3(0) \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.
    *Applying the transformation to the first standard basis vector gives its image.*
*   $T(\mathbf{e}_2) = T\left( \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right) = \begin{pmatrix} 2(0) + 1 \\ 0 - 3(1) \end{pmatrix} = \begin{pmatrix} 1 \\ -3 \end{pmatrix}$.
    *Applying the transformation to the second standard basis vector gives its image.*

So, $[T]_E = \left[ \begin{array}{cc} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{array} \right] = \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix}$.
    *The matrix $[T]_E$ is formed by placing these image vectors as columns. This is the standard matrix for the transformation $T$.*

**Step 2: Find $P_{E \leftarrow B}$.**
The matrix $P_{E \leftarrow B}$ has as its columns the vectors of basis $B$ expressed in terms of basis $E$.
Since $E$ is the standard basis, the coordinates of any vector in $E$ are just its components.
*   $[\mathbf{b}_1]_E = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
*   $[\mathbf{b}_2]_E = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.
$$ P_{E \leftarrow B} = \left[ \begin{array}{cc} [\mathbf{b}_1]_E & [\mathbf{b}_2]_E \end{array} \right] = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} $$
    *This matrix translates coordinates from basis $B$ to the standard basis $E$.*

**Step 3: Find $P_{B \leftarrow E}$.**
$P_{B \leftarrow E}$ is the inverse of $P_{E \leftarrow B}$.
For $P_{E \leftarrow B} = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$, the determinant is $(1)(-1) - (1)(1) = -1 - 1 = -2$.
$$ P_{B \leftarrow E} = (P_{E \leftarrow B})^{-1} = \frac{1}{-2} \begin{pmatrix} -1 & -1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix} $$
    *This matrix translates coordinates from the standard basis $E$ to basis $B$.*

**Step 4: Compute $[T]_B = P_{B \leftarrow E} [T]_E P_{E \leftarrow B}$.**
Substitute the matrices we found:
$$ [T]_B = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix} \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} $$
    *This is the core formula for similarity transformation. We are "sandwiching" the standard matrix of $T$ between the change of basis matrix from $E$ to $B$ and the change of basis matrix from $B$ to $E$.*

First, multiply $P_{B \leftarrow E} [T]_E$:
$$ \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix} \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix} = \begin{pmatrix} (1/2)(2) + (1/2)(1) & (1/2)(1) + (1/2)(-3) \\ (1/2)(2) + (-1/2)(1) & (1/2)(1) + (-1/2)(-3) \end{pmatrix} $$
$$ = \begin{pmatrix} 1 + 1/2 & 1/2 - 3/2 \\ 1 - 1/2 & 1/2 + 3/2 \end{pmatrix} = \begin{pmatrix} 3/2 & -1 \\ 1/2 & 2 \end{pmatrix} $$
    *Perform the first matrix multiplication. It's often easier to do this in two steps.*

Now, multiply the result by $P_{E \leftarrow B}$:
$$ [T]_B = \begin{pmatrix} 3/2 & -1 \\ 1/2 & 2 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} $$
$$ = \begin{pmatrix} (3/2)(1) + (-1)(1) & (3/2)(1) + (-1)(-1) \\ (1/2)(1) + (2)(1) & (1/2)(1) + (2)(-1) \end{pmatrix} $$
$$ = \begin{pmatrix} 3/2 - 1 & 3/2 + 1 \\ 1/2 + 2 & 1/2 - 2 \end{pmatrix} = \begin{pmatrix} 1/2 & 5/2 \\ 5/2 & -3/2 \end{pmatrix} $$
    *Perform the second matrix multiplication to get the final matrix representation.*

**Final Answer:**
The matrix representation of $T$ with respect to basis $B$ is $\boxed{[T]_B = \begin{pmatrix} 1/2 & 5/2 \\ 5/2 & -3/2 \end{pmatrix}}$.

**Reflection:** This example demonstrates a more advanced application of change of basis matrices. It shows how the matrix representation of a linear transformation changes when you switch to a different basis. This concept is crucial for understanding diagonalization, eigenvalues, and eigenvectors, where the goal is often to find a basis in which the transformation matrix is as simple as possible (e.g., diagonal). The trickiest part is correctly setting up the similarity transformation formula and performing the matrix multiplications accurately.

## 6. Common mistakes and traps

1.  **Confusing $P_{B \leftarrow C}$ with $P_{C \leftarrow B}$:** This is by far the most common mistake. Remember that $P_{B \leftarrow C}$ transforms coordinates *from* basis $C$ *to* basis $B$. If you need to go the other way, you need $P_{C \leftarrow B} = P_{B \leftarrow C}^{-1}$.
2.  **Putting basis vectors as rows instead of columns:** The convention for constructing a change of basis matrix is that the coordinate vectors of the "from" basis (expressed in the "to" basis) become the *columns* of the matrix. Putting them as rows leads to an incorrect matrix.
3.  **Forgetting to express the *new* basis vectors in terms of the *old* basis:** When constructing $P_{B \leftarrow C}$, you must express the vectors of $C$ (the "from" basis) in terms of $B$ (the "to" basis). A common error is to try to express $\mathbf{b}_i$ in terms of $\mathbf{c}_j$ instead.
4.  **Thinking the change of basis matrix transforms the vector itself:** The change of basis matrix transforms the *coordinate representation* of a vector, not the vector itself. The underlying vector remains the same, but its numerical description changes.
5.  **Mixing up the order of matrix multiplication:** For $[\mathbf{v}]_B = P_{B \leftarrow C} [\mathbf{v}]_C$, the change of basis matrix must always be on the left of the coordinate vector. For changing the representation of a linear transformation, $[T]_B = P_{B \leftarrow E} [T]_E P_{E \leftarrow B}$, the order of multiplication is specific and cannot be swapped.
6.  **Assuming the standard basis is always $E = \{\mathbf{e}_1, \dots, \mathbf{e}_n\}$:** While often convenient, the standard basis is just one specific choice. Any set of linearly independent vectors that span the space can be a basis. When the problem does not specify the standard basis, don't assume it.
7.  **Calculation errors during inverse or matrix multiplication:** These operations, especially for $3 \times 3$ or larger matrices, are prone to arithmetic mistakes. Double-check your work.

## 7. Textbook-precise explanation

Let $V$ be an $n$-dimensional vector space over a scalar field $\mathbb{F}$.
Let $B = \{\mathbf{b}_1, \mathbf{b}_2, \dots, \mathbf{b}_n\}$ and $C = \{\mathbf{c}_1, \mathbf{c}_2, \dots, \mathbf{c}_n\}$ be two ordered bases for $V$.

For any vector $\mathbf{v} \in V$, its coordinates with respect to basis $B$, denoted $[\mathbf{v}]_B$, are the unique scalars $\alpha_1, \alpha_2, \dots, \alpha_n$ such that $\mathbf{v} = \alpha_1\mathbf{b}_1 + \alpha_2\mathbf{b}_2 + \dots + \alpha_n\mathbf{b}_n$. We write $[\mathbf{v}]_B = \begin{pmatrix} \alpha_1 \\ \alpha_2 \\ \vdots \\ \alpha_n \end{pmatrix}$. Similarly for $[\mathbf{v}]_C$.

Since $B$ is a basis, each vector in $C$ can be uniquely expressed as a linear combination of the vectors in $B$. Specifically, for each $\mathbf{c}_j \in C$, there exist unique scalars $p_{1j}, p_{2j}, \dots, p_{nj}$ such that:
$$ \mathbf{c}_j = p_{1j}\mathbf{b}_1 + p_{2j}\mathbf{b}_2 + \dots + p_{nj}\mathbf{b}_n $$
The column vector $[\mathbf{c}_j]_B = \begin{pmatrix} p_{1j} \\ p_{2j} \\ \vdots \\ p_{nj} \end{pmatrix}$ represents the coordinates of $\mathbf{c}_j$ with respect to basis $B$.

**Definition:** The **change of basis matrix from basis $C$ to basis $B$**, denoted $P_{B \leftarrow C}$ (also sometimes written as $P_{B,C}$ or $P_{C \to B}$), is the $n \times n$ matrix whose columns are the coordinate vectors of the basis vectors in $C$ with respect to basis $B$:
$$ P_{B \leftarrow C} = \left[ \begin{array}{cccc} [\mathbf{c}_1]_B & [\mathbf{c}_2]_B & \dots & [\mathbf{c}_n]_B \end{array} \right] $$

**Theorem (Coordinate Transformation):** If $P_{B \leftarrow C}$ is the change of basis matrix from $C$ to $B$, then for any vector $\mathbf{v} \in V$, its coordinates with respect to $B$ can be obtained from its coordinates with respect to $C$ by the matrix-vector product:
$$ [\mathbf{v}]_B = P_{B \leftarrow C} [\mathbf{v}]_C $$

**Proof:**
Let $[\mathbf{v}]_C = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$. By definition, this means $\mathbf{v} = x_1\mathbf{c}_1 + x_2\mathbf{c}_2 + \dots + x_n\mathbf{c}_n$.
Now, substitute the expression for each $\mathbf{c}_j$ in terms of the basis $B$:
$$ \mathbf{v} = x_1(p_{11}\mathbf{b}_1 + \dots + p_{n1}\mathbf{b}_n) + x_2(p_{12}\mathbf{b}_1 + \dots + p_{n2}\mathbf{b}_n) + \dots + x_n(p_{1n}\mathbf{b}_1 + \dots + p_{nn}\mathbf{b}_n) $$
Rearranging terms by collecting coefficients for each $\mathbf{b}_i$:
$$ \mathbf{v} = (p_{11}x_1 + p_{12}x_2 + \dots + p_{1n}x_n)\mathbf{b}_1 + (p_{21}x_1 + p_{22}x_2 + \dots + p_{2n}x_n)\mathbf{b}_2 + \dots + (p_{n1}x_1 + p_{