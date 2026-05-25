## 1. What it is — in plain English

Imagine you're standing in your living room, describing where your favorite mug is. You might say, "It's on the coffee table, 2 feet in front of me, and 1 foot to my right." Now, imagine your friend walks into the room and describes the *exact same mug's location*. But your friend is standing in a different spot, facing a different direction. They might say, "It's 3 feet to my left, and 1 foot behind me." Both of you are talking about the same mug, but you're using different "perspectives" or "frames of reference."

In physics and rocket science, we often face this exact problem. A rocket's sensors might tell us about its movement relative to its own body (like how much it's rolling or pitching). This is its "body frame." But we, as mission control, want to know where it is and how it's oriented relative to the Earth, or to a star, or to its target. This is a different "inertial frame" or "navigation frame."

A "direction cosine matrix" (DCM) is like a universal translator that lets us switch between these different perspectives. It's a special kind of mathematical table, a 3x3 grid of numbers, that tells us how one coordinate system (like the rocket's body frame) is rotated relative to another (like the Earth's frame). It quantifies "how much" each axis of one frame points along each axis of the other frame.

So, if you know the mug's location in your friend's perspective, and you have this "translator matrix" that describes how your friend's perspective is rotated relative to yours, you can use it to instantly figure out the mug's location from *your* perspective. It's a powerful tool for understanding how things move and are oriented in 3D space, regardless of who's doing the observing.

## 2. Why it matters — real-world applications

Direction Cosine Matrices are fundamental in any field dealing with 3D rotations and relative orientations. Their applications span across aerospace, robotics, computer graphics, and even certain aspects of machine learning.

1.  **Rocket Navigation and Control (Aerospace):** This is perhaps the most direct application.
    *   **Inertial Measurement Units (IMUs)** on rockets, satellites, and aircraft measure accelerations and angular velocities relative to the vehicle's own "body frame."
    *   However, the guidance and navigation systems need to know the vehicle's position, velocity, and attitude (orientation) relative to an **inertial frame** (e.g., Earth-Centered Inertial, ECI) or a **navigation frame** (e.g., North-East-Down, NED).
    *   DCMs are used constantly to transform sensor readings from the body frame into the navigation frame for guidance calculations, and to transform control commands from the navigation frame back into the body frame for thruster firings or gimbal movements. For example, SpaceX's Falcon 9 or NASA's Orion spacecraft rely heavily on DCMs for precise attitude control during launch, orbital maneuvers, and re-entry.

2.  **Satellite Attitude Determination and Control (Aerospace):** Satellites use star trackers, sun sensors, and magnetometers to determine their orientation in space. Each sensor provides data in its own specific sensor frame. To combine this data and determine the satellite's overall attitude relative to a desired orbital or inertial frame, DCMs are essential. This allows the satellite to point its antennas at Earth, its solar panels at the sun, or its scientific instruments at celestial targets. Companies like Maxar Technologies or Airbus Defence and Space use DCMs in their satellite control algorithms.

3.  **Robotics and Autonomous Systems:** Consider a robotic arm like those used in manufacturing (e.g., by Boston Dynamics or KUKA Robotics). Each joint of the arm has its own coordinate system. To determine the precise position and orientation of the robot's end-effector (the gripper or tool) relative to a fixed base, a series of DCMs (and translation vectors) are chained together. This allows the robot to accurately pick up objects, weld, or perform delicate surgical procedures. Similarly, autonomous vehicles use DCMs to transform sensor data (LiDAR, camera) from the vehicle's body frame to a global map frame.

4.  **Computer Graphics and Virtual Reality (VR/AR):** In 3D games or VR environments, every object (a character, a tree, a spaceship) has its own local coordinate system. To display these objects correctly on screen from a virtual camera's perspective, they must be transformed from their local frames into the world frame, and then into the camera frame. DCMs (often embedded within more general transformation matrices) are the mathematical backbone for rotating and orienting these virtual objects, ensuring realistic movement and perspective. Companies like Epic Games (Unreal Engine) or Unity Technologies use these concepts extensively.

## 3. Prerequisites — what you must know first

Before diving deep into Direction Cosine Matrices, ensure you have a solid grasp of these foundational concepts. If any of these feel unfamiliar, pause and review them first.

*   **Vectors:**
    *   **Definition:** A quantity having both magnitude and direction.
    *   **Components:** How to represent a vector in terms of its projections along coordinate axes.
    *   **Vector Addition/Subtraction:** How to combine or find the difference between vectors geometrically and component-wise.
    *   **Scalar Multiplication:** Scaling a vector's magnitude.
    *   **Unit Vectors:** Vectors with a magnitude of 1, used to define directions (e.g., $\mathbf{\hat{i}}, \mathbf{\hat{j}}, \mathbf{\hat{k}}$ or $\mathbf{\hat{x}}, \mathbf{\hat{y}}, \mathbf{\hat{z}}$).

*   **Cartesian Coordinate Systems:**
    *   **Axes:** Understanding the three mutually perpendicular axes (x, y, z) that define space.
    *   **Origin:** The reference point (0,0,0).
    *   **Right-Hand Rule:** How to determine the positive direction of the third axis given the first two (if you curl fingers from x to y, thumb points to z). This is crucial for consistent frame definitions.

*   **Trigonometry:**
    *   **Sine, Cosine, Tangent:** Definitions in terms of right triangles and the unit circle.
    *   **Inverse Trigonometric Functions:** Finding angles from ratios.
    *   **Trigonometric Identities:** Basic relationships between sine and cosine (e.g., $\sin^2\theta + \cos^2\theta = 1$).

*   **Dot Product (Scalar Product):**
    *   **Definition:** $\mathbf{A} \cdot \mathbf{B} = |\mathbf{A}| |\mathbf{B}| \cos\theta$, where $\theta$ is the angle between the vectors.
    *   **Component Form:** $\mathbf{A} \cdot \mathbf{B} = A_x B_x + A_y B_y + A_z B_z$.
    *   **Geometric Meaning:** Measures how much two vectors point in the same direction. Crucially, if vectors are perpendicular, their dot product is zero. If they are unit vectors, their dot product is simply the cosine of the angle between them.

*   **Matrix Algebra:**
    *   **Definition:** A rectangular array of numbers.
    *   **Matrix Multiplication:** The rules for multiplying matrices (row by column). This is critical for applying DCMs.
    *   **Identity Matrix ($I$):** A square matrix with ones on the main diagonal and zeros elsewhere, acting like the number 1 in multiplication.
    *   **Transpose ($A^T$):** Swapping rows and columns of a matrix.
    *   **Inverse ($A^{-1}$):** A matrix that, when multiplied by the original matrix, yields the identity matrix.
    *   **Determinant ($\det(A)$):** A scalar value computed from the elements of a square matrix, indicating properties like invertibility and scaling factor of transformations.

*   **Linear Transformations (Basic Idea):**
    *   **Concept:** Functions that map vectors to vectors in a way that preserves vector addition and scalar multiplication. Rotations are a type of linear transformation.

## 4. The core idea — step by step

Let's break down the concept of Direction Cosine Matrices from the ground up.

### Step 1: The Problem of Different Perspectives

**Plain English:** Imagine you have a point in space, or a vector (like the direction a rocket is pointing). We can describe this point or vector using numbers (coordinates) based on a specific coordinate system or "frame of reference." If we pick a different frame of reference, those numbers will change, even though the physical point or vector hasn't moved. We need a way to translate these numbers between frames.

**Small Concrete Example:**
Consider a 2D plane.
Frame A has axes $\mathbf{a}_x$ and $\mathbf{a}_y$.
Frame B has axes $\mathbf{b}_x$ and $\mathbf{b}_y$.
Let Frame B be rotated by $90^\circ$ counter-clockwise relative to Frame A. So $\mathbf{b}_x$ aligns with $\mathbf{a}_y$, and $\mathbf{b}_y$ aligns with $-\mathbf{a}_x$.
Now, consider a vector $\mathbf{v}$ that points purely along Frame B's x-axis, with length 5.
In Frame B, $\mathbf{v}_B = \begin{pmatrix} 5 \\ 0 \end{pmatrix}$.
In Frame A, this same vector points along Frame A's y-axis with length 5. So $\mathbf{v}_A = \begin{pmatrix} 0 \\ 5 \end{pmatrix}$.
The vector is the same physical entity, but its numerical representation changes depending on the frame.

**Formal/Mathematical Version:**
Let there be two right-handed Cartesian coordinate systems, Frame A and Frame B.
Frame A is defined by its orthonormal basis vectors $\{\mathbf{a}_1, \mathbf{a}_2, \mathbf{a}_3\}$.
Frame B is defined by its orthonormal basis vectors $\{\mathbf{b}_1, \mathbf{b}_2, \mathbf{b}_3\}$.
Any vector $\mathbf{v}$ can be expressed in Frame A as $\mathbf{v} = v_1 \mathbf{a}_1 + v_2 \mathbf{a}_2 + v_3 \mathbf{a}_3$, or as a column vector $\mathbf{v}_A = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix}$.
Similarly, in Frame B as $\mathbf{v} = v'_1 \mathbf{b}_1 + v'_2 \mathbf{b}_2 + v'_3 \mathbf{b}_3$, or as $\mathbf{v}_B = \begin{pmatrix} v'_1 \\ v'_2 \\ v'_3 \end{pmatrix}$.
Our goal is to find a matrix that transforms $\mathbf{v}_B$ into $\mathbf{v}_A$, or vice-versa.

**What could go wrong:**
Confusing which frame is the "original" and which is the "new" one. This leads to incorrect transformations or using the inverse/transpose when not intended. Always clearly label your frames.

### Step 2: Introducing Direction Cosines

**Plain English:** To translate between frames, we need to know how the axes of one frame are oriented relative to the axes of the other. We can quantify this orientation by looking at the angles between them. For example, what's the angle between Frame A's x-axis and Frame B's x-axis? The cosine of that angle tells us "how much" of Frame B's x-axis points along Frame A's x-axis. We call this value a "direction cosine."

**Small Concrete Example:**
Continuing with our 2D example from Step 1: Frame B is rotated $90^\circ$ counter-clockwise relative to Frame A.
*   Angle between $\mathbf{a}_x$ and $\mathbf{b}_x$ is $90^\circ$. So $\cos(90^\circ) = 0$.
*   Angle between $\mathbf{a}_x$ and $\mathbf{b}_y$ is $-90^\circ$ (or $270^\circ$). So $\cos(-90^\circ) = 0$.
*   Angle between $\mathbf{a}_y$ and $\mathbf{b}_x$ is $0^\circ$. So $\cos(0^\circ) = 1$.
*   Angle between $\mathbf{a}_y$ and $\mathbf{b}_y$ is $90^\circ$. So $\cos(90^\circ) = 0$.
These cosines tell us the alignment. For instance, $\mathbf{b}_x$ has *zero* component along $\mathbf{a}_x$, and *full* component along $\mathbf{a}_y$.

**Formal/Mathematical Version:**
The component of a unit vector $\mathbf{u}$ along another unit vector $\mathbf{w}$ is given by their dot product: $\mathbf{u} \cdot \mathbf{w} = |\mathbf{u}| |\mathbf{w}| \cos\theta = \cos\theta$.
So, the direction cosine between the $i$-th axis of Frame A ($\mathbf{a}_i$) and the $j$-th axis of Frame B ($\mathbf{b}_j$) is:
$$ C_{ij} = \mathbf{a}_i \cdot \mathbf{b}_j = \cos(\theta_{ij}) $$
where $\theta_{ij}$ is the angle between $\mathbf{a}_i$ and $\mathbf{b}_j$.
There are $3 \times 3 = 9$ such direction cosines for 3D space.

**What could go wrong:**
Mixing up the order of the dot product (e.g., $\mathbf{b}_j \cdot \mathbf{a}_i$ instead of $\mathbf{a}_i \cdot \mathbf{b}_j$). This changes the resulting matrix from $C_{AB}$ to $C_{BA}$, which are transposes of each other. Consistency is key.

### Step 3: Building the Direction Cosine Matrix (DCM)

**Plain English:** Now we arrange these nine direction cosines into a 3x3 grid. This grid is our Direction Cosine Matrix. The way we arrange them defines how we use the matrix for transformation. A common convention is that the matrix $C_{AB}$ transforms a vector from Frame B's coordinates to Frame A's coordinates. Its columns are the basis vectors of Frame B, expressed in Frame A's coordinates.

**Small Concrete Example:**
Let's define $C_{AB}$ as the matrix that transforms a vector from Frame B to Frame A.
The $j$-th column of $C_{AB}$ will be the $j$-th basis vector of Frame B ($\mathbf{b}_j$) expressed in Frame A's coordinates.
So, $\mathbf{b}_1 = (\mathbf{b}_1 \cdot \mathbf{a}_1) \mathbf{a}_1 + (\mathbf{b}_1 \cdot \mathbf{a}_2) \mathbf{a}_2 + (\mathbf{b}_1 \cdot \mathbf{a}_3) \mathbf{a}_3$.
The components of $\mathbf{b}_1$ in Frame A are $(\mathbf{b}_1 \cdot \mathbf{a}_1, \mathbf{b}_1 \cdot \mathbf{a}_2, \mathbf{b}_1 \cdot \mathbf{a}_3)^T$.
Similarly for $\mathbf{b}_2$ and $\mathbf{b}_3$.
Thus, $C_{AB}$ would look like:
$$ C_{AB} = \begin{pmatrix} \mathbf{a}_1 \cdot \mathbf{b}_1 & \mathbf{a}_1 \cdot \mathbf{b}_2 & \mathbf{a}_1 \cdot \mathbf{b}_3 \\ \mathbf{a}_2 \cdot \mathbf{b}_1 & \mathbf{a}_2 \cdot \mathbf{b}_2 & \mathbf{a}_2 \cdot \mathbf{b}_3 \\ \mathbf{a}_3 \cdot \mathbf{b}_1 & \mathbf{a}_3 \cdot \mathbf{b}_2 & \mathbf{a}_3 \cdot \mathbf{b}_3 \end{pmatrix} $$
Each element $C_{AB}(i,j)$ is the cosine of the angle between $\mathbf{a}_i$ and $\mathbf{b}_j$.
Let's use the 2D example again: Frame B is rotated $90^\circ$ counter-clockwise relative to Frame A.
$\mathbf{a}_x = (1,0)$, $\mathbf{a}_y = (0,1)$
$\mathbf{b}_x = (0,1)$, $\mathbf{b}_y = (-1,0)$
(These are $\mathbf{b}_x, \mathbf{b}_y$ expressed in Frame A coordinates)
$C_{AB} = \begin{pmatrix} \mathbf{a}_x \cdot \mathbf{b}_x & \mathbf{a}_x \cdot \mathbf{b}_y \\ \mathbf{a}_y \cdot \mathbf{b}_x & \mathbf{a}_y \cdot \mathbf{b}_y \end{pmatrix} = \begin{pmatrix} (1,0)\cdot(0,1) & (1,0)\cdot(-1,0) \\ (0,1)\cdot(0,1) & (0,1)\cdot(-1,0) \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$
Let's check: $\mathbf{v}_B = \begin{pmatrix} 5 \\ 0 \end{pmatrix}$.
$\mathbf{v}_A = C_{AB} \mathbf{v}_B = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 5 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \cdot 5 + (-1) \cdot 0 \\ 1 \cdot 5 + 0 \cdot 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 5 \end{pmatrix}$. This matches our earlier manual calculation!

**Formal/Mathematical Version:**
Let $C_{AB}$ be the Direction Cosine Matrix that transforms a vector from Frame B to Frame A.
The elements of $C_{AB}$ are defined as:
$$ C_{AB}(i,j) = \mathbf{a}_i \cdot \mathbf{b}_j $$
where $\mathbf{a}_i$ are the unit basis vectors of Frame A and $\mathbf{b}_j$ are the unit basis vectors of Frame B.
Explicitly:
$$ C_{AB} = \begin{pmatrix} \mathbf{a}_1 \cdot \mathbf{b}_1 & \mathbf{a}_1 \cdot \mathbf{b}_2 & \mathbf{a}_1 \cdot \mathbf{b}_3 \\ \mathbf{a}_2 \cdot \mathbf{b}_1 & \mathbf{a}_2 \cdot \mathbf{b}_2 & \mathbf{a}_2 \cdot \mathbf{b}_3 \\ \mathbf{a}_3 \cdot \mathbf{b}_1 & \mathbf{a}_3 \cdot \mathbf{b}_2 & \mathbf{a}_3 \cdot \mathbf{b}_3 \end{pmatrix} $$
The transformation rule is:
$$ \mathbf{v}_A = C_{AB} \mathbf{v}_B $$
where $\mathbf{v}_A$ is the vector's components in Frame A, and $\mathbf{v}_B$ is the vector's components in Frame B.

**What could go wrong:**
The most common mistake is confusing the order of frames in the subscript. If you define $C_{AB}$ as transforming from B to A, then $C_{BA}$ (transforming from A to B) will be its transpose. Always be explicit about your notation.

### Step 4: Properties of the DCM

**Plain English:** DCMs are not just any 3x3 matrices; they have very specific properties because they represent pure rotations. They don't stretch, shrink, or reflect objects. These properties make them very useful and easy to work with.

**Small Concrete Example:**
If you rotate an object, its length doesn't change. If you rotate a coordinate system, the unit vectors still have unit length and are still perpendicular. These geometric properties translate directly into algebraic properties of the DCM.
For instance, if you rotate from frame A to B, and then rotate back from B to A, you should end up exactly where you started. This means the matrix for rotating A to B, multiplied by the matrix for rotating B to A, should give you the "do nothing" matrix (the identity matrix).

**Formal/Mathematical Version:**
A Direction Cosine Matrix $C$ (let's drop the subscripts for general properties) has the following fundamental properties:

1.  **Orthogonality:** Its inverse is equal to its transpose.
    $$ C^{-1} = C^T $$
    This also implies:
    $$ C C^T = I $$
    $$ C^T C = I $$
    where $I$ is the 3x3 identity matrix. Geometrically, this means that the rows (and columns) of a DCM form an orthonormal set of vectors. They are all unit vectors and are mutually perpendicular.

2.  **Determinant:** The determinant of a DCM is always +1.
    $$ \det(C) = +1 $$
    A determinant of -1 would indicate a reflection (a left-handed coordinate system being transformed into a right-handed one, or vice-versa), which is not a pure rotation. Since we always work with right-handed coordinate systems in aerospace, this property must hold.

These two properties together define what is known as a **Special Orthogonal Matrix** or a member of the group **SO(3)**.

**What could go wrong:**
If you calculate a matrix and find that $C C^T \neq I$ or $\det(C) \neq +1$, then your matrix is *not* a valid DCM, and it does not represent a pure rotation between right-handed coordinate systems. This often indicates a calculation error or an incorrect setup of the coordinate systems.

### Step 5: Applying the DCM for Vector Transformation

**Plain English:** Once you have the DCM, using it to translate a vector's components from one frame to another is straightforward: it's just matrix multiplication. If you have a vector described in Frame B's numbers, and you want to know its numbers in Frame A, you simply multiply the DCM (which translates B to A) by the vector's B-frame components.

**Small Concrete Example:**
Let $C_{AB}$ be the DCM that transforms from Frame B to Frame A.
If we have a vector $\mathbf{v}$ whose components in Frame B are $\mathbf{v}_B = \begin{pmatrix} v_{Bx} \\ v_{By} \\ v_{Bz} \end{pmatrix}$,
then its components in Frame A, $\mathbf{v}_A = \begin{pmatrix} v_{Ax} \\ v_{Ay} \\ v_{Az} \end{pmatrix}$, are found by:
$$ \mathbf{v}_A = C_{AB} \mathbf{v}_B $$
For example, if $C_{AB} = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$ (a $90^\circ$ rotation around Z-axis, from B to A) and $\mathbf{v}_B = \begin{pmatrix} 5 \\ 0 \\ 0 \end{pmatrix}$, then
$$ \mathbf{v}_A = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 5 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \cdot 5 + (-1) \cdot 0 + 0 \cdot 0 \\ 1 \cdot 5 + 0 \cdot 0 + 0 \cdot 0 \\ 0 \cdot 5 + 0 \cdot 0 + 1 \cdot 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 5 \\ 0 \end{pmatrix} $$
This matches our 2D example extended to 3D with no Z-component.

**Formal/Mathematical Version:**
Given a vector $\mathbf{v}$ with components $\mathbf{v}_B$ in Frame B and $\mathbf{v}_A$ in Frame A, and the DCM $C_{AB}$ which transforms from Frame B to Frame A:
$$ \mathbf{v}_A = C_{AB} \mathbf{v}_B $$
To transform a vector from Frame A to Frame B, we use the inverse (or transpose) of $C_{AB}$:
$$ \mathbf{v}_B = C_{BA} \mathbf{v}_A = C_{AB}^T \mathbf{v}_A $$
This is because $C_{BA} = C_{AB}^{-1} = C_{AB}^T$.

**What could go wrong:**
The primary error here is using the wrong matrix (e.g., $C_{BA}$ instead of $C_{AB}$) or forgetting to transpose when going the "other way." Always remember the subscript convention: $C_{\text{to_frame, from_frame}}$.

### Step 6: Sequential Rotations

**Plain English:** Often, one frame isn't just rotated directly relative to another. Instead, it might be rotated relative to an intermediate frame, which itself is rotated relative to a global frame. Think of a robot arm: its hand is rotated relative to its wrist, which is rotated relative to its elbow, which is rotated relative to its shoulder, which is rotated relative to the base. To get the hand's orientation relative to the base, you multiply the individual rotation matrices in the correct order.

**Small Concrete Example:**
Let's say we have three frames: A, B, and C.
$C_{AB}$ transforms from B to A.
$C_{BC}$ transforms from C to B.
We want to find $C_{AC}$, which transforms from C to A.
If we have a vector $\mathbf{v}_C$ in Frame C, we can first transform it to Frame B:
$\mathbf{v}_B = C_{BC} \mathbf{v}_C$
Then, we can transform $\mathbf{v}_B$ to Frame A:
$\mathbf{v}_A = C_{AB} \mathbf{v}_B$
Substituting the first equation into the second:
$\mathbf{v}_A = C_{AB} (C_{BC} \mathbf{v}_C) = (C_{AB} C_{BC}) \mathbf{v}_C$
So, the combined transformation matrix is $C_{AC} = C_{AB} C_{BC}$.

**Formal/Mathematical Version:**
If we have a sequence of transformations from Frame C to Frame B ($C_{BC}$), and then from Frame B to Frame A ($C_{AB}$), the composite DCM that transforms a vector from Frame C directly to Frame A ($C_{AC}$) is found by multiplying the individual DCMs in reverse order of application to the vector:
$$ C_{AC} = C_{AB} C_{BC} $$
This is a critical property and is fundamental to understanding rigid body kinematics.

**What could go wrong:**
The most frequent mistake is multiplying the matrices in the wrong order. Matrix multiplication is not commutative ($AB \neq BA$). The order is crucial: the matrix that applies the *last* rotation (to the destination frame) goes *first* in the multiplication sequence, and the matrix that applies the *first* rotation (from the initial frame) goes *last*. Think of it as "reading right to left" for the frames: $C_{A \leftarrow B \leftarrow C}$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple 2D Rotation (Easy)

**Problem Statement:**
A coordinate system B is rotated by $90^\circ$ counter-clockwise around the Z-axis relative to coordinate system A. A vector $\mathbf{r}$ has components $\mathbf{r}_B = \begin{pmatrix} 3 \\ 4 \\ 0 \end{pmatrix}$ in Frame B. Find the components of $\mathbf{r}$ in Frame A, denoted $\mathbf{r}_A$.

**Given:**
*   Rotation: $90^\circ$ counter-clockwise around the Z-axis (from A to B).
*   Vector in Frame B: $\mathbf{r}_B = \begin{pmatrix} 3 \\ 4 \\ 0 \end{pmatrix}$.

**Want:**
*   Vector in Frame A: $\mathbf{r}_A$.

**Steps:**

1.  **Define the coordinate systems and angles.**
    *   Frame A: $(\mathbf{a}_x, \mathbf{a}_y, \mathbf{a}_z)$
    *   Frame B: $(\mathbf{b}_x, \mathbf{b}_y, \mathbf{b}_z)$
    *   Rotation is $90^\circ$ counter-clockwise around $\mathbf{a}_z$. This means $\mathbf{b}_z$ is aligned with $\mathbf{a}_z$.
    *   $\mathbf{b}_x$ is rotated $90^\circ$ from $\mathbf{a}_x$ towards $\mathbf{a}_y$.
    *   $\mathbf{b}_y$ is rotated $90^\circ$ from $\mathbf{a}_y$ towards $-\mathbf{a}_x$.

2.  **Determine the direction cosines for $C_{AB}$.**
    *   Recall $C_{AB}(i,j) = \mathbf{a}_i \cdot \mathbf{b}_j$.
    *   $\mathbf{a}_x \cdot \mathbf{b}_x = \cos(90^\circ) = 0$
        *   *Explanation:* The angle between A's x-axis and B's x-axis is $90^\circ$.
    *   $\mathbf{a}_x \cdot \mathbf{b}_y = \cos(180^\circ) = -1$
        *   *Explanation:* B's y-axis is aligned with A's negative x-axis (from $\mathbf{a}_x$ to $\mathbf{a}_y$ is $90^\circ$, then to $\mathbf{b}_y$ is another $90^\circ$ to $-\mathbf{a}_x$, total $180^\circ$).
    *   $\mathbf{a}_x \cdot \mathbf{b}_z = \cos(90^\circ) = 0$
        *   *Explanation:* B's z-axis is perpendicular to A's x-axis.
    *   $\mathbf{a}_y \cdot \mathbf{b}_x = \cos(0^\circ) = 1$
        *   *Explanation:* B's x-axis is aligned with A's y-axis.
    *   $\mathbf{a}_y \cdot \mathbf{b}_y = \cos(90^\circ) = 0$
        *   *Explanation:* B's y-axis is perpendicular to A's y-axis.
    *   $\mathbf{a}_y \cdot \mathbf{b}_z = \cos(90^\circ) = 0$
        *   *Explanation:* B's z-axis is perpendicular to A's y-axis.
    *   $\mathbf{a}_z \cdot \mathbf{b}_x = \cos(90^\circ) = 0$
        *   *Explanation:* B's x-axis is perpendicular to A's z-axis.
    *   $\mathbf{a}_z \cdot \mathbf{b}_y = \cos(90^\circ) = 0$
        *   *Explanation:* B's y-axis is perpendicular to A's z-axis.
    *   $\mathbf{a}_z \cdot \mathbf{b}_z = \cos(0^\circ) = 1$
        *   *Explanation:* B's z-axis is aligned with A's z-axis.

3.  **Construct the DCM $C_{AB}$.**
    $$ C_{AB} = \begin{pmatrix} \mathbf{a}_x \cdot \mathbf{b}_x & \mathbf{a}_x \cdot \mathbf{b}_y & \mathbf{a}_x \cdot \mathbf{b}_z \\ \mathbf{a}_y \cdot \mathbf{b}_x & \mathbf{a}_y \cdot \mathbf{b}_y & \mathbf{a}_y \cdot \mathbf{b}_z \\ \mathbf{a}_z \cdot \mathbf{b}_x & \mathbf{a}_z \cdot \mathbf{b}_y & \mathbf{a}_z \cdot \mathbf{b}_z \end{pmatrix} = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   *Explanation:* We've populated the matrix with the direction cosines calculated in the previous step. This is the standard rotation matrix for a positive rotation $\theta$ around the z-axis:
        $$ R_z(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        For $\theta = 90^\circ$, $\cos(90^\circ)=0$ and $\sin(90^\circ)=1$. So $R_z(90^\circ) = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$. This matches.

4.  **Perform the vector transformation.**
    $$ \mathbf{r}_A = C_{AB} \mathbf{r}_B $$
    $$ \mathbf{r}_A = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ 4 \\ 0 \end{pmatrix} $$
    *   *Explanation:* We multiply the DCM by the vector components in Frame B.
    $$ \mathbf{r}_A = \begin{pmatrix} (0)(3) + (-1)(4) + (0)(0) \\ (1)(3) + (0)(4) + (0)(0) \\ (0)(3) + (0)(4) + (1)(0) \end{pmatrix} $$
    $$ \mathbf{r}_A = \begin{pmatrix} -4 \\ 3 \\ 0 \end{pmatrix} $$

**Final Answer:**
$$ \boxed{\mathbf{r}_A = \begin{pmatrix} -4 \\ 3 \\ 0 \end{pmatrix}} $$

**Reflection:** This example was tricky because the $90^\circ$ rotation makes $\cos$ values zero or $\pm 1$, which can sometimes obscure the general process. The key is to carefully visualize the orientation of each axis of Frame B relative to Frame A and correctly determine the angles for the dot products. The fact that the vector had no Z-component simplified the multiplication but didn't change the 3D nature of the DCM.

---

### Example 2: 3D Rotation Around One Axis (Medium)

**Problem Statement:**
A rocket's body frame (B) is rotated by $30^\circ$ about the x-axis of the navigation frame (N). A force vector $\mathbf{F}$ is measured by sensors in the body frame as $\mathbf{F}_B = \begin{pmatrix} 10 \\ 5 \\ -2 \end{pmatrix} \text{ N}$. Find the components of this force vector in the navigation frame, $\mathbf{F}_N$.

**Given:**
*   Rotation: $30^\circ$ about the N-frame's x-axis (from N to B).
*   Vector in Body Frame B: $\mathbf{F}_B = \begin{pmatrix} 10 \\ 5 \\ -2 \end{pmatrix} \text{ N}$.

**Want:**
*   Vector in Navigation Frame N: $\mathbf{F}_N$.

**Steps:**

1.  **Understand the rotation.**
    *   The rotation is about the x-axis. This means the x-axes of both frames are aligned: $\mathbf{n}_x = \mathbf{b}_x$.
    *   The N-frame's x-axis is the axis of rotation.
    *   The rotation of $30^\circ$ is counter-clockwise when looking *from* the positive x-axis *towards* the origin. (This is the standard convention for positive rotation angles).
    *   So, $\mathbf{b}_y$ is rotated $30^\circ$ from $\mathbf{n}_y$ towards $\mathbf{n}_z$.
    *   And $\mathbf{b}_z$ is rotated $30^\circ$ from $\mathbf{n}_z$ towards $-\mathbf{n}_y$.

2.  **Determine the direction cosines for $C_{NB}$.**
    *   Recall $C_{NB}(i,j) = \mathbf{n}_i \cdot \mathbf{b}_j$.
    *   $\mathbf{n}_x \cdot \mathbf{b}_x = \cos(0^\circ) = 1$
        *   *Explanation:* Both x-axes are aligned.
    *   $\mathbf{n}_x \cdot \mathbf{b}_y = \cos(90^\circ) = 0$
        *   *Explanation:* $\mathbf{n}_x$ is perpendicular to $\mathbf{b}_y$.
    *   $\mathbf{n}_x \cdot \mathbf{b}_z = \cos(90^\circ) = 0$
        *   *Explanation:* $\mathbf{n}_x$ is perpendicular to $\mathbf{b}_z$.
    *   $\mathbf{n}_y \cdot \mathbf{b}_x = \cos(90^\circ) = 0$
        *   *Explanation:* $\mathbf{n}_y$ is perpendicular to $\mathbf{b}_x$.
    *   $\mathbf{n}_y \cdot \mathbf{b}_y = \cos(30^\circ) = \frac{\sqrt{3}}{2}$
        *   *Explanation:* Angle between $\mathbf{n}_y$ and $\mathbf{b}_y$ is $30^\circ$.
    *   $\mathbf{n}_y \cdot \mathbf{b}_z = \cos(120^\circ) = -\frac{1}{2}$
        *   *Explanation:* Angle between $\mathbf{n}_y$ and $\mathbf{b}_z$ is $90^\circ + 30^\circ = 120^\circ$. (From $\mathbf{n}_y$ to $\mathbf{n}_z$ is $90^\circ$, then $\mathbf{b}_z$ is $30^\circ$ further in that direction, so total $120^\circ$ from $\mathbf{n}_y$).
    *   $\mathbf{n}_z \cdot \mathbf{b}_x = \cos(90^\circ) = 0$
        *   *Explanation:* $\mathbf{n}_z$ is perpendicular to $\mathbf{b}_x$.
    *   $\mathbf{n}_z \cdot \mathbf{b}_y = \cos(60^\circ) = \frac{1}{2}$
        *   *Explanation:* Angle between $\mathbf{n}_z$ and $\mathbf{b}_y$ is $90^\circ - 30^\circ = 60^\circ$. (From $\mathbf{n}_z$ to $\mathbf{n}_y$ is $90^\circ$ clockwise, $\mathbf{b}_y$ is $30^\circ$ counter-clockwise from $\mathbf{n}_y$, so $60^\circ$ from $\mathbf{n}_z$).
    *   $\mathbf{n}_z \cdot \mathbf{b}_z = \cos(30^\circ) = \frac{\sqrt{3}}{2}$
        *   *Explanation:* Angle between $\mathbf{n}_z$ and $\mathbf{b}_z$ is $30^\circ$.

3.  **Construct the DCM $C_{NB}$.**
    $$ C_{NB} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos(30^\circ) & -\sin(30^\circ) \\ 0 & \sin(30^\circ) & \cos(30^\circ) \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{\sqrt{3}}{2} & -\frac{1}{2} \\ 0 & \frac{1}{2} & \frac{\sqrt{3}}{2} \end{pmatrix} $$
    *   *Explanation:* This is the standard rotation matrix for a positive rotation $\theta$ around the x-axis:
        $$ R_x(\theta) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{pmatrix} $$
        For $\theta = 30^\circ$, $\cos(30^\circ)=\frac{\sqrt{3}}{2}$ and $\sin(30^\circ)=\frac{1}{2}$. This matches.

4.  **Perform the vector transformation.**
    $$ \mathbf{F}_N = C_{NB} \mathbf{F}_B $$
    $$ \mathbf{F}_N = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{\sqrt{3}}{2} & -\frac{1}{2} \\ 0 & \frac{1}{2} & \frac{\sqrt{3}}{2} \end{pmatrix} \begin{pmatrix} 10 \\ 5 \\ -2 \end{pmatrix} $$
    *   *Explanation:* Multiply the DCM by the vector components in Frame B.
    $$ \mathbf{F}_N = \begin{pmatrix} (1)(10) + (0)(5) + (0)(-2) \\ (0)(10) + (\frac{\sqrt{3}}{2})(5) + (-\frac{1}{2})(-2) \\ (0)(10) + (\frac{1}{2})(5) + (\frac{\sqrt{3}}{2})(-2) \end{pmatrix} $$
    $$ \mathbf{F}_N = \begin{pmatrix} 10 \\ \frac{5\sqrt{3}}{2} + 1 \\ \frac{5}{2} - \sqrt{3} \end{pmatrix} $$
    *   *Approximate values for clarity:* $\sqrt{3} \approx 1.732$
    $$ \mathbf{F}_N \approx \begin{pmatrix} 10 \\ \frac{5 \times 1.732}{2} + 1 \\ \frac{5}{2} - 1.732 \end{pmatrix} = \begin{pmatrix} 10 \\ 4.33 + 1 \\ 2.5 - 1.732 \end{pmatrix} = \begin{pmatrix} 10 \\ 5.33 \\ 0.768 \end{pmatrix} $$

**Final Answer:**
$$ \boxed{\mathbf{F}_N = \begin{pmatrix} 10 \\ \frac{5\sqrt{3}}{2} + 1 \\ \frac{5}{2} - \sqrt{3} \end{pmatrix} \text{ N}} $$

**Reflection:** This example involved non-trivial angles, requiring accurate trigonometric values. The key was correctly identifying the rotation axis and direction to construct the standard rotation matrix. The x-component of the force remained unchanged because the rotation was about the x-axis, which is a good sanity check.

---

### Example 3: Two Sequential Rotations (Harder)

**Problem Statement:**
A sensor frame (S) is initially aligned with a spacecraft body frame (B). It then undergoes two successive rotations relative to the *current* frame:
1.  A rotation of $45^\circ$ about its current y-axis.
2.  A rotation of $60^\circ$ about its current x-axis.
A vector $\mathbf{v}$ is measured in the sensor frame as $\mathbf{v}_S = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$. Find the components of $\mathbf{v}$ in the body frame, $\mathbf{v}_B$.

**Given:**
*   Initial state: Sensor frame S is aligned with Body frame B.
*   Rotation 1: $45^\circ$ about *current* y-axis. Let's call this intermediate frame S'.
*   Rotation 2: $60^\circ$ about *current* x-axis. This results in final sensor frame S.
*   Vector in Sensor Frame S: $\mathbf{v}_S = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.

**Want:**
*   Vector in Body Frame B: $\mathbf{v}_B$.

**Steps:**

1.  **Define the intermediate frames and rotations.**
    *   Frame B (Body frame): initial reference.
    *   Frame S' (Intermediate frame): after the first rotation.
    *   Frame S (Sensor frame): after the second rotation.
    *   We need $C_{BS}$, which transforms from S to B.

2.  **Determine the first rotation matrix $C_{BS'}$.**
    *   This rotation is $45^\circ$ about the y-axis, from B to S'.
    *   The standard rotation matrix for a positive rotation $\theta$ around the y-axis is:
        $$ R_y(\theta) = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix} $$
    *   For $\theta = 45^\circ$, $\cos(45^\circ) = \frac{\sqrt{2}}{2}$ and $\sin(45^\circ) = \frac{\sqrt{2}}{2}$.
    *   So, $C_{BS'} = R_y(45^\circ) = \begin{pmatrix} \frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \\ 0 & 1 & 0 \\ -\frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \end{pmatrix}$.
        *   *Explanation:* This matrix transforms a vector from S' (after the first rotation) to B (the initial frame).

3.  **Determine the second rotation matrix $C_{S'S}$.**
    *   This rotation is $60^\circ$ about the *current* x-axis (which is S''s x-axis). This means it's a rotation from S to S'.
    *   The standard rotation matrix for a positive rotation $\phi$ around the x-axis is:
        $$ R_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & -\sin\phi \\ 0 & \sin\phi & \cos\phi \end{pmatrix} $$
    *   For $\phi = 60^\circ$, $\cos(60^\circ) = \frac{1}{2}$ and $\sin(60^\circ) = \frac{\sqrt{3}}{2}$.
    *   So, $C_{S'S} = R_x(60^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ 0 & \frac{\sqrt{3}}{2} & \frac{1}{2} \end{pmatrix}$.
        *   *Explanation:* This matrix transforms a vector from the final sensor frame S to the intermediate frame S'.

4.  **Combine the rotations to find $C_{BS}$.**
    *   We want to transform a vector from S to B.
    *   The path is S $\rightarrow$ S' $\rightarrow$ B.
    *   So, $C_{BS} = C_{BS'} C_{S'S}$.
        *   *Explanation:* The rotation applied *first* (from S to S') is multiplied *last*. The rotation applied *second* (from S' to B) is multiplied *first*.
    $$ C_{BS} = \begin{pmatrix} \frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \\ 0 & 1 & 0 \\ -\frac{\sqrt{2}}{2} & 0 & \frac{\sqrt{2}}{2} \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ 0 & \frac{\sqrt{3}}{2} & \frac{1}{2} \end{pmatrix} $$
    $$ C_{BS} = \begin{pmatrix} (\frac{\sqrt{2}}{2})(1) + (0)(0) + (\frac{\sqrt{2}}{2})(0) & (\frac{\sqrt{2}}{2})(0) + (0)(\frac{1}{2}) + (\frac{\sqrt{2}}{2})(\frac{\sqrt{3}}{2}) & (\frac{\sqrt{2}}{2})(0) + (0)(-\frac{\sqrt{3}}{2}) + (\frac{\sqrt{2}}{2})(\frac{1}{2}) \\ (0)(1) + (1)(0) + (0)(0) & (0)(0) + (1)(\frac{1}{2}) + (0)(\frac{\sqrt{3}}{2}) & (0)(0) + (1)(-\frac{\sqrt{3}}{2}) + (0)(\frac{1}{2}) \\ (-\frac{\sqrt{2}}{2})(1) + (0)(0) + (\frac{\sqrt{2}}{2})(0) & (-\frac{\sqrt{2}}{2})(0) + (0)(\frac{1}{2}) + (\frac{\sqrt{2}}{2})(\frac{\sqrt{3}}{2}) & (-\frac{\sqrt{2}}{2})(0) + (0)(-\frac{\sqrt{3}}{2}) + (\frac{\sqrt{2}}{2})(\frac{1}{2}) \end{pmatrix} $$
    $$ C_{BS} = \begin{pmatrix} \frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4} \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ -\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4} \end{pmatrix} $$

5.  **Perform the vector transformation.**
    $$ \mathbf{v}_B = C_{BS} \mathbf{v}_S $$
    $$ \mathbf{v}_B = \begin{pmatrix} \frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4} \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ -\frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{4} & \frac{\sqrt{2}}{4} \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} $$
    *   *Explanation:* Multiply the combined DCM by the vector components in Frame S.
    $$ \mathbf{v}_B = \begin{pmatrix} (\frac{\sqrt{2}}{2})(1) + (\frac{\sqrt{6}}{4})(0) + (\frac{\sqrt{2}}{4})(0) \\ (0)(1) + (\frac{1}{2})(0) + (-\frac{\sqrt{3}}{2})(0) \\ (-\frac{\sqrt{2}}{2})(1) + (\frac{\sqrt{6}}{4})(0) + (\frac{\sqrt{2}}{4})(0) \end{pmatrix} $$
    $$ \mathbf{v}_B = \begin{pmatrix} \frac{\sqrt{2}}{2} \\ 0 \\ -\frac{\sqrt{2}}{2} \end{pmatrix} $$

**Final Answer:**
$$ \boxed{\mathbf{v}_B = \begin{pmatrix} \frac{\sqrt{2}}{2} \\ 0 \\ -\frac{\sqrt{2}}{2} \end{pmatrix}} $$

**Reflection:** The primary difficulty here is understanding the order of matrix multiplication for sequential rotations. "Rotation about its *current* axis" means the second rotation is applied relative to the frame that resulted from the first rotation. This leads to $C_{AC} = C_{AB} C_{BC}$. If the rotations were about the *original* (fixed) axes, the order would be reversed. This is a common source of error. Also, the algebra with square roots can be tedious, but it's important to keep it exact until the very end.

---

### Example 4: Finding DCM from Basis Vectors (Hardest)

**Problem Statement:**
Frame A has basis vectors $\mathbf{a}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{a}_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$, $\mathbf{a}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.
Frame B has basis vectors, expressed in Frame A, as $\mathbf{b}_1 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$, $\mathbf{b}_2 = \begin{pmatrix} -1 \\ 0 \\ 0 \end{pmatrix}$, $\mathbf{b}_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$.
Find the Direction Cosine Matrix $C_{AB}$ that transforms a vector from Frame B to Frame A. Then, verify that $C_{AB}$ is a valid DCM.

**Given:**
*   Basis vectors of Frame A (standard basis).
*   Basis vectors of Frame B, expressed in Frame A: $\mathbf{b}_1, \mathbf{b}_2, \mathbf{b}_3$.

**Want:**
*   DCM $C_{AB}$.
*   Verification of $C_{AB}$'s properties.

**Steps:**

1.  **Recall the definition of $C_{AB}$.**
    *   $C_{AB}$ transforms a vector from Frame B to Frame A: $\mathbf{v}_A = C_{AB} \mathbf{v}_B$.
    *   The columns of $C_{AB}$ are the basis vectors of Frame B, expressed in Frame A.
        *   *Explanation:* This is a direct consequence of how matrix multiplication works. If $\mathbf{v}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ (i.e., the vector is $\mathbf{b}_1$), then $\mathbf{v}_A = C_{AB} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$, which simply pulls out the first column of $C_{AB}$. This first column must be $\mathbf{b}_1$ expressed in Frame A.

2.  **Construct $C_{AB}$ directly from the given basis vectors.**
    $$ C_{AB} = \begin{pmatrix} \mathbf{b}_1 | \mathbf{b}_2 | \mathbf{b}_3 \end{pmatrix}_{\text{expressed in A}} $$
    $$ C_{AB} = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   *Explanation:* We are given the components of $\mathbf{b}_1, \mathbf{b}_2, \mathbf{b}_3$ directly in Frame A. So we just place them as columns.
    *   *Alternative (using dot products):*
        *   $C_{AB}(1,1) = \mathbf{a}_1 \cdot \mathbf{b}_1 = (1,0,0) \cdot (0,1,0) = 0$
        *   $C_{AB}(1,2) = \mathbf{a}_1 \cdot \mathbf{b}_2 = (1,0,0) \cdot (-1,0,0) = -1$
        *   $C_{AB}(1,3) = \mathbf{a}_1 \cdot \mathbf{b}_3 = (1,0,0) \cdot (0,0,1) = 0$
        *   ...and so on for all 9 elements. This yields the same matrix.

3.  **Verify DCM properties: Orthogonality ($C C^T = I$).**
    *   First, find $C_{AB}^T$:
        $$ C_{AB}^T = \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   Now, calculate $C_{AB} C_{AB}^T$:
        $$ C_{AB} C_{AB}^T = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        $$ = \begin{pmatrix} (0)(0)+(-1)(-1)+(0)(0) & (0)(1)+(-1)(0)+(0)(0) & (0)(0)+(-1)(0)+(0)(1) \\ (1)(0)+(0)(-1)+(0)(0) & (1)(1)+(0)(0)+(0)(0) & (1)(0)+(0)(0)+(0)(1) \\ (0)(0)+(0)(-1)+(1)(0) & (0)(1)+(0)(0)+(1)(0) & (0)(0)+(0)(0)+(1)(1) \end{pmatrix} $$
        $$ = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} = I $$
