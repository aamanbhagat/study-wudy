## 1. What it is — in plain English

Imagine you have a toy rocket. When it launches, it's pointing straight up. But as it flies, it might tilt, spin, or turn in any direction. How do we precisely describe *which way* it's pointing at any moment? That's what orientation representations are for.

**Direction Cosine Matrices (DCMs)** are like a detailed map or a "lookup table" that tells you exactly where the rocket's own axes (its "front," "side," and "up") are pointing relative to a fixed reference direction (like North, East, and Down on Earth). It's a 3x3 grid of numbers, and each number is the cosine of the angle between one of the rocket's axes and one of the reference axes. It's very robust but can be a bit redundant.

**Euler angles** are like giving a set of three consecutive instructions: "First, turn 30 degrees around your nose. Then, tilt 15 degrees around your wing. Finally, swivel 45 degrees around your tail." They're intuitive because we often think of rotations this way, but they have a famous Achilles' heel called "Gimbal Lock" where you lose a degree of freedom, making certain rotations impossible to describe uniquely.

**Quaternions** are a bit like "super-numbers" that combine a single rotation axis and an amount of rotation into four components. Think of them as a smoother, more elegant way to describe orientation. They avoid the Gimbal Lock problem of Euler angles and are more computationally efficient than DCMs for certain operations, making them very popular in aerospace and computer graphics.

## 2. Why it matters — real-world applications

Understanding and being able to convert between DCMs, quaternions, and Euler angles is absolutely fundamental in any field dealing with 3D rotations, especially in aerospace engineering.

1.  **Spacecraft Attitude Control Systems (ACS):** Every satellite, rocket, and space probe needs to know and control its orientation. For example, **SpaceX's Falcon 9** uses these representations in its flight control software to precisely orient its engines and grid fins for steering, re-entry, and landing. Quaternions are often the preferred representation for onboard state estimation and control algorithms due to their computational efficiency and avoidance of Gimbal Lock. However, Euler angles are frequently used for human-readable telemetry and command inputs, and DCMs are useful for transforming vectors between different coordinate frames.

2.  **Inertial Navigation Systems (INS) for Aircraft and Submarines:** Modern aircraft like the **Boeing 787** and submarines use INS to track their position and orientation without external references for short periods. These systems integrate data from gyroscopes and accelerometers. The orientation information, often maintained internally as quaternions or DCMs, is crucial for accurately calculating velocity and position. Euler angles are then derived from these for display to the pilot (e.g., pitch, roll, yaw).

3.  **Robotics and Autonomous Vehicles:** Robots, such as **Boston Dynamics' Spot** quadruped, need to precisely track their own orientation and the orientation of their end-effectors (e.g., a gripper). Quaternions are frequently used in robotic kinematics and dynamics calculations to avoid singularities and provide smooth interpolation of rotations. DCMs are often used for transforming sensor data (e.g., from a camera mounted on the robot) from the robot's body frame to a world frame.

4.  **Computer Graphics and Virtual Reality (VR):** In game engines like **Unity** or **Unreal Engine**, every 3D object's rotation is typically stored and manipulated using quaternions. This allows for smooth, artifact-free interpolation between different orientations (e.g., when animating a character or rotating a camera) without suffering from Gimbal Lock, which would cause jarring visual glitches. Euler angles are often exposed in user interfaces for artists and designers due to their intuitive nature, with the engine handling the conversion to quaternions internally.

## 3. Prerequisites — what you must know first

Before diving deep into the conversions, ensure you have a solid grasp of these foundational concepts:

*   **Linear Algebra:**
    *   **Vectors:** Understanding what a vector is, vector addition, scalar multiplication.
    *   **Matrices:** Matrix definition, types (square, identity), matrix addition, **matrix multiplication**.
    *   **Determinant of a Matrix:** How to calculate it and its meaning (scaling factor, invertibility).
    *   **Matrix Transpose:** Swapping rows and columns.
    *   **Matrix Inverse:** How to find it, and the property that $A A^{-1} = I$.
    *   **Orthogonal Matrices:** Matrices whose inverse is equal to their transpose ($A^{-1} = A^T$).
    *   **Orthonormal Basis:** A set of basis vectors that are mutually perpendicular and have unit length.
*   **Trigonometry:**
    *   **Sine, Cosine, Tangent:** Definitions and values for common angles.
    *   **Inverse Trigonometric Functions:** $\operatorname{asin}$, $\operatorname{acos}$, $\operatorname{atan}$, and especially $\operatorname{atan2}(y, x)$ which correctly handles quadrants.
    *   **Trigonometric Identities:** Basic relationships like $\sin^2 x + \cos^2 x = 1$.
*   **Coordinate Systems:**
    *   **Right-Hand Rule:** For defining axis directions and rotation sense.
    *   **Inertial Frame:** A non-accelerating reference frame (e.g., Earth-Centered Inertial, ECI).
    *   **Body Frame:** A coordinate frame fixed to the object whose orientation is being described (e.g., a rocket's nose, wing, and belly axes).
*   **Basic Rotations in 3D:**
    *   Understanding how to rotate a vector around a single axis (X, Y, or Z).
    *   The concept of intrinsic vs. extrinsic rotations.

If any of these feel unfamiliar, pause and review them. They are the bedrock upon which orientation representations are built.

## 4. The core idea — step by step

The core idea is that DCMs, quaternions, and Euler angles are merely different mathematical languages to describe the *same physical concept*: the orientation of one coordinate frame relative to another. Each has its strengths and weaknesses, and the ability to translate between them is crucial for practical applications.

### ### Step 1: Understanding Coordinate Frames and Orientation

**Plain-English Statement:** Imagine you have two sets of perfectly straight, mutually perpendicular rulers. One set is fixed in space (the "reference frame," like the directions North, East, Down). The other set is attached to your rocket (the "body frame," like the rocket's nose, right wing, and belly). The orientation is simply how the rocket's rulers are twisted or tilted compared to the fixed rulers.

**Concrete Example:** If your rocket's nose points exactly North, its right wing points exactly East, and its belly points exactly Down, then its body frame is perfectly aligned with the reference frame. If the rocket pitches up, its nose ruler is now pointing upwards relative to North.

**Formal/Mathematical Version:** We typically denote the reference frame as $\{A\}$ and the body frame as $\{B\}$. A vector $\mathbf{v}$ can be expressed in either frame, $\mathbf{v}^A$ or $\mathbf{v}^B$. The orientation describes the relationship between these two frames.

**What could go wrong:** Confusing which frame is which, or which way the axes point (e.g., forgetting the right-hand rule). This leads to incorrect signs in rotations.

### ### Step 2: Direction Cosine Matrices (DCMs)

**Plain-English Statement:** A DCM is a 3x3 grid of numbers that acts like a "Rosetta Stone" to translate vectors from one coordinate system to another. Each column of the DCM tells you where one of the body frame's axes points, as seen from the reference frame. For example, the first column describes the body's X-axis in terms of the reference frame's X, Y, and Z components.

**Concrete Example:** If your rocket's X-axis (nose) points exactly along the reference frame's X-axis, its Y-axis (right wing) along the reference's Y-axis, and its Z-axis (belly) along the reference's Z-axis, the DCM would be the identity matrix. If the rocket rotates, these numbers change.

**Formal/Mathematical Version:** A DCM, often denoted as $\mathbf{C}_B^A$ (meaning "from B to A"), transforms a vector from the body frame $\{B\}$ to the reference frame $\{A\}$:
$$ \mathbf{v}^A = \mathbf{C}_B^A \mathbf{v}^B $$
The matrix $\mathbf{C}_B^A$ is given by:
$$ \mathbf{C}_B^A = \begin{pmatrix} \mathbf{x}_B \cdot \mathbf{x}_A & \mathbf{y}_B \cdot \mathbf{x}_A & \mathbf{z}_B \cdot \mathbf{x}_A \\ \mathbf{x}_B \cdot \mathbf{y}_A & \mathbf{y}_B \cdot \mathbf{y}_A & \mathbf{z}_B \cdot \mathbf{y}_A \\ \mathbf{x}_B \cdot \mathbf{z}_A & \mathbf{y}_B \cdot \mathbf{z}_A & \mathbf{z}_B \cdot \mathbf{z}_A \end{pmatrix} = \begin{pmatrix} \cos(\mathbf{x}_B, \mathbf{x}_A) & \cos(\mathbf{y}_B, \mathbf{x}_A) & \cos(\mathbf{z}_B, \mathbf{x}_A) \\ \cos(\mathbf{x}_B, \mathbf{y}_A) & \cos(\mathbf{y}_B, \mathbf{y}_A) & \cos(\mathbf{z}_B, \mathbf{y}_A) \\ \cos(\mathbf{x}_B, \mathbf{z}_A) & \cos(\mathbf{y}_B, \mathbf{z}_A) & \cos(\mathbf{z}_B, \mathbf{z}_A) \end{pmatrix} $$
Where $\mathbf{x}_A, \mathbf{y}_A, \mathbf{z}_A$ are unit vectors of frame $\{A\}$, and $\mathbf{x}_B, \mathbf{y}_B, \mathbf{z}_B$ are unit vectors of frame $\{B\}$.
Properties of a DCM:
1.  It is **orthogonal**: $\mathbf{C}_B^A (\mathbf{C}_B^A)^T = \mathbf{I}$, which means $(\mathbf{C}_B^A)^{-1} = (\mathbf{C}_B^A)^T$.
2.  Its **determinant is +1**: $\det(\mathbf{C}_B^A) = +1$. (If it's -1, it's a reflection, not a pure rotation).

**What could go wrong:** Forgetting that the inverse is simply the transpose, or using a matrix that isn't orthogonal or has a determinant of -1 (meaning it's not a valid rotation matrix).

### ### Step 3: Euler Angles (Sequences and Gimbal Lock)

**Plain-English Statement:** Euler angles describe an orientation using three sequential rotations around specific axes. Think of it like a series of three turns you make. For example, a common sequence is "yaw, then pitch, then roll" (Z-Y-X). The order matters a lot!

**Concrete Example:** To get your rocket from pointing North-East-Down to pointing South-West-Up, you might first rotate around its vertical axis (yaw), then around its new horizontal axis (pitch), and finally around its new longitudinal axis (roll).

**Formal/Mathematical Version:** There are 12 possible Euler angle sequences (6 with repeating axes, 6 with non-repeating axes). A common one in aerospace is the 3-2-1 (or Z-Y-X) sequence, often denoted by $(\psi, \theta, \phi)$ for yaw, pitch, and roll, respectively. These are *intrinsic* rotations, meaning each rotation is about the *new* rotated axis.
The elemental rotation matrices are:
Rotation about X-axis by angle $\phi$:
$$ \mathbf{R}_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & \sin\phi \\ 0 & -\sin\phi & \cos\phi \end{pmatrix} $$
Rotation about Y-axis by angle $\theta$:
$$ \mathbf{R}_y(\theta) = \begin{pmatrix} \cos\theta & 0 & -\sin\theta \\ 0 & 1 & 0 \\ \sin\theta & 0 & \cos\theta \end{pmatrix} $$
Rotation about Z-axis by angle $\psi$:
$$ \mathbf{R}_z(\psi) = \begin{pmatrix} \cos\psi & \sin\psi & 0 \\ -\sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
For a 3-2-1 (Z-Y-X) intrinsic sequence, the total DCM $\mathbf{C}_B^A$ is formed by multiplying these elemental rotations in reverse order of application (from left to right for intrinsic, or right to left for extrinsic rotations):
$$ \mathbf{C}_B^A = \mathbf{R}_x(\phi) \mathbf{R}_y(\theta) \mathbf{R}_z(\psi) $$
$$ \mathbf{C}_B^A = \begin{pmatrix} \cos\theta\cos\psi & \cos\theta\sin\psi & -\sin\theta \\ \sin\phi\sin\theta\cos\psi - \cos\phi\sin\psi & \sin\phi\sin\theta\sin\psi + \cos\phi\cos\psi & \sin\phi\cos\theta \\ \cos\phi\sin\theta\cos\psi + \sin\phi\sin\psi & \cos\phi\sin\theta\sin\psi - \sin\phi\cos\psi & \cos\phi\cos\theta \end{pmatrix} $$

**Gimbal Lock:** Occurs when two of the rotation axes become aligned. For the 3-2-1 sequence, this happens when $\theta = \pm 90^\circ$. At this point, the first and third rotation axes align, and the system loses a degree of freedom, making it impossible to uniquely determine the first and third angles.

**What could go wrong:** Forgetting the order of multiplication, using the wrong sign convention for angles, or encountering Gimbal Lock, which makes unique conversion *from* DCM to Euler angles impossible.

### ### Step 4: Quaternions (The "Hypercomplex" Approach)

**Plain-English Statement:** Quaternions are like a special kind of four-dimensional number used to represent 3D rotations. They consist of a scalar part (like a regular number) and a 3D vector part. The scalar tells you "how much" to rotate, and the vector tells you "around what axis" to rotate. The magic is that they always represent a rotation smoothly without the Gimbal Lock problem.

**Concrete Example:** Instead of saying "yaw 30, pitch 15, roll 45," a quaternion might say "rotate 60 degrees around the axis (0.5, 0.5, 0.707)." This single representation captures the entire orientation.

**Formal/Mathematical Version:** A quaternion $\mathbf{q}$ is represented as:
$$ \mathbf{q} = q_0 + q_1 \mathbf{i} + q_2 \mathbf{j} + q_3 \mathbf{k} $$
or as a vector:
$$ \mathbf{q} = \begin{pmatrix} q_0 \\ q_1 \\ q_2 \\ q_3 \end{pmatrix} = \begin{pmatrix} q_s \\ \mathbf{q}_v \end{pmatrix} $$
where $q_s$ is the scalar part and $\mathbf{q}_v = (q_1, q_2, q_3)^T$ is the vector part.
For a rotation of angle $\alpha$ about a unit axis $\mathbf{u} = (u_x, u_y, u_z)^T$:
$$ q_0 = \cos(\alpha/2) $$
$$ q_1 = u_x \sin(\alpha/2) $$
$$ q_2 = u_y \sin(\alpha/2) $$
$$ q_3 = u_z \sin(\alpha/2) $$
A **unit quaternion** (which represents a pure rotation) must satisfy:
$$ q_0^2 + q_1^2 + q_2^2 + q_3^2 = 1 $$
Quaternions have a "double cover" property: $\mathbf{q}$ and $-\mathbf{q}$ represent the same physical orientation.

**What could go wrong:** Forgetting to normalize the quaternion (ensuring it's a unit quaternion), leading to scaling or invalid rotations. Also, correctly handling the $q_0$ vs $q_1, q_2, q_3$ components can be tricky.

### ### Step 5: DCM to Euler Angles (e.g., 3-2-1 sequence)

**Plain-English Statement:** Given the detailed "map" (DCM) of your rocket's orientation, we want to find the three specific "turn instructions" (Euler angles) that would get it there. We do this by matching the elements of the known DCM to the general DCM formula for that specific Euler sequence.

**Concrete Example:** If the DCM tells you the nose is pointing slightly up and right, and the wing is pointing slightly down and left, you can deduce how much it must have pitched, then yawed, then rolled.

**Formal/Mathematical Version (for 3-2-1/Z-Y-X sequence):**
Given $\mathbf{C}_B^A = \begin{pmatrix} C_{11} & C_{12} & C_{13} \\ C_{21} & C_{22} & C_{23} \\ C_{31} & C_{32} & C_{33} \end{pmatrix}$ and the analytical form:
$$ \mathbf{C}_B^A = \begin{pmatrix} \cos\theta\cos\psi & \cos\theta\sin\psi & -\sin\theta \\ \sin\phi\sin\theta\cos\psi - \cos\phi\sin\psi & \sin\phi\sin\theta\sin\psi + \cos\phi\cos\psi & \sin\phi\cos\theta \\ \cos\phi\sin\theta\cos\psi + \sin\phi\sin\psi & \cos\phi\sin\theta\sin\psi - \sin\phi\cos\psi & \cos\phi\cos\theta \end{pmatrix} $$
We can extract the angles:
1.  **Pitch ($\theta$):** From $C_{13} = -\sin\theta$.
    $$ \theta = -\operatorname{asin}(C_{13}) $$
    *Caution: $\operatorname{asin}$ has a range of $[-\pi/2, \pi/2]$. If $\theta$ is outside this range, you'll need to adjust. Also, if $C_{13} = \pm 1$, Gimbal Lock occurs.*
2.  **Yaw ($\psi$):** Using $C_{11} = \cos\theta\cos\psi$ and $C_{12} = \cos\theta\sin\psi$.
    If $\cos\theta \ne 0$:
    $$ \psi = \operatorname{atan2}(C_{12}, C_{11}) $$
    *Using $\operatorname{atan2}(y, x)$ is crucial here as it correctly places the angle in the full $360^\circ$ range.*
3.  **Roll ($\phi$):** Using $C_{23} = \sin\phi\cos\theta$ and $C_{33} = \cos\phi\cos\theta$.
    If $\cos\theta \ne 0$:
    $$ \phi = \operatorname{atan2}(C_{23}, C_{33}) $$

**Gimbal Lock Case:** If $\cos\theta = 0$ (i.e., $\theta = \pm 90^\circ$), then $C_{13} = \mp 1$.
In this case, the first and third rotation axes align, and $\psi$ and $\phi$ are no longer uniquely separable.
If $\theta = 90^\circ$ ($C_{13} = -1$):
$$ \mathbf{C}_B^A = \begin{pmatrix} 0 & 0 & -1 \\ \sin\phi\cos\psi - \cos\phi\sin\psi & \sin\phi\sin\psi + \cos\phi\cos\psi & 0 \\ \cos\phi\cos\psi + \sin\phi\sin\psi & \cos\phi\sin\psi - \sin\phi\cos\psi & 0 \end{pmatrix} = \begin{pmatrix} 0 & 0 & -1 \\ \sin(\phi-\psi) & \cos(\phi-\psi) & 0 \\ \cos(\phi-\psi) & -\sin(\phi-\psi) & 0 \end{pmatrix} $$
Here, we can only determine $(\phi-\psi)$. We usually set one of them to zero (e.g., $\psi=0$) and solve for the other.
$$ \phi - \psi = \operatorname{atan2}(C_{21}, C_{22}) \quad \text{or} \quad \phi - \psi = \operatorname{atan2}(C_{32}, -C_{31}) $$
A common convention is to set $\psi=0$ and calculate $\phi = \operatorname{atan2}(C_{21}, C_{22})$.

**What could go wrong:** Not using $\operatorname{atan2}$, failing to handle Gimbal Lock, or using the wrong Euler sequence formula for the DCM.

### ### Step 6: Euler Angles to DCM (e.g., 3-2-1 sequence)

**Plain-English Statement:** This is the reverse of the previous step. Given the three "turn instructions" (Euler angles), we want to build the "map" (DCM) that describes the final orientation. This is done by multiplying the individual rotation matrices in the correct order.

**Concrete Example:** If you know your rocket first yaws 30 degrees, then pitches 15 degrees, then rolls 45 degrees, you can multiply the corresponding rotation matrices to get the final orientation matrix.

**Formal/Mathematical Version (for 3-2-1/Z-Y-X sequence):**
Given Euler angles $(\psi, \theta, \phi)$, calculate the elementary rotation matrices:
$$ \mathbf{R}_z(\psi) = \begin{pmatrix} \cos\psi & \sin\psi & 0 \\ -\sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
$$ \mathbf{R}_y(\theta) = \begin{pmatrix} \cos\theta & 0 & -\sin\theta \\ 0 & 1 & 0 \\ \sin\theta & 0 & \cos\theta \end{pmatrix} $$
$$ \mathbf{R}_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & \sin\phi \\ 0 & -\sin\phi & \cos\phi \end{pmatrix} $$
For an intrinsic 3-2-1 (Z-Y-X) sequence, the final DCM $\mathbf{C}_B^A$ is:
$$ \mathbf{C}_B^A = \mathbf{R}_x(\phi) \mathbf{R}_y(\theta) \mathbf{R}_z(\psi) $$
This multiplication yields the full matrix shown in Step 3.
$$ \mathbf{C}_B^A = \begin{pmatrix} c\theta c\psi & c\theta s\psi & -s\theta \\ s\phi s\theta c\psi - c\phi s\psi & s\phi s\theta s\psi + c\phi c\psi & s\phi c\theta \\ c\phi s\theta c\psi + s\phi s\psi & c\phi s\theta s\psi - s\phi c\psi & c\phi c\theta \end{pmatrix} $$
where $s\alpha = \sin\alpha$ and $c\alpha = \cos\alpha$.

**What could go wrong:** Multiplying the matrices in the wrong order. For intrinsic rotations, the multiplication order is the reverse of the sequence order. For extrinsic rotations, it's the same. (e.g., for intrinsic Z-Y-X, it's $R_x R_y R_z$).

### ### Step 7: DCM to Quaternion

**Plain-English Statement:** Given the detailed "map" (DCM), we want to find the single "axis-angle" representation (quaternion) that describes the same orientation. This is often done by looking at the trace (sum of diagonal elements) of the DCM, which is related to the rotation angle.

**Concrete Example:** If your DCM shows a complex rotation, you can mathematically extract the underlying axis and angle of rotation to form the quaternion.

**Formal/Mathematical Version:**
Given $\mathbf{C}_B^A = \begin{pmatrix} C_{11} & C_{12} & C_{13} \\ C_{21} & C_{22} & C_{23} \\ C_{31} & C_{32} & C_{33} \end{pmatrix}$.
The quaternion components $(q_0, q_1, q_2, q_3)$ can be found using the following method, which is robust against numerical errors:

First, calculate the trace of the DCM: $T = C_{11} + C_{22} + C_{33}$.
Then, determine which component ($q_0, q_1, q_2,$ or $q_3$) has the largest value to ensure numerical stability and avoid division by zero.

**Case 1: $T > 0$ (most common)**
$$ q_0 = \frac{1}{2}\sqrt{1+T} $$
$$ q_1 = \frac{C_{32} - C_{23}}{4q_0} $$
$$ q_2 = \frac{C_{13} - C_{31}}{4q_0} $$
$$ q_3 = \frac{C_{21} - C_{12}}{4q_0} $$

**Case 2: $T \le 0$ (and one of the diagonal elements is dominant)**
This requires checking which diagonal element is largest to determine which $q_i$ is largest.
*   If $C_{11}$ is the largest diagonal element:
    $$ q_1 = \frac{1}{2}\sqrt{1+C_{11}-C_{22}-C_{33}} $$
    $$ q_0 = \frac{C_{32} - C_{23}}{4q_1} $$
    $$ q_2 = \frac{C_{12} + C_{21}}{4q_1} $$
    $$ q_3 = \frac{C_{13} + C_{31}}{4q_1} $$
*   If $C_{22}$ is the largest diagonal element:
    $$ q_2 = \frac{1}{2}\sqrt{1-C_{11}+C_{22}-C_{33}} $$
    $$ q_0 = \frac{C_{13} - C_{31}}{4q_2} $$
    $$ q_1 = \frac{C_{12} + C_{21}}{4q_2} $$
    $$ q_3 = \frac{C_{23} + C_{32}}{4q_2} $$
*   If $C_{33}$ is the largest diagonal element:
    $$ q_3 = \frac{1}{2}\sqrt{1-C_{11}-C_{22}+C_{33}} $$
    $$ q_0 = \frac{C_{21} - C_{12}}{4q_3} $$
    $$ q_1 = \frac{C_{13} + C_{31}}{4q_3} $$
    $$ q_2 = \frac{C_{23} + C_{32}}{4q_3} $$
After computing the components, always **normalize** the quaternion:
$$ \mathbf{q} = \frac{1}{\sqrt{q_0^2 + q_1^2 + q_2^2 + q_3^2}} \begin{pmatrix} q_0 \\ q_1 \\ q_2 \\ q_3 \end{pmatrix} $$

**What could go wrong:** Numerical instability if not careful with the square root of a small number (hence the case analysis). Forgetting to normalize the quaternion.

### ### Step 8: Quaternion to DCM

**Plain-English Statement:** Given the "axis-angle" representation (quaternion), we want to build the detailed "map" (DCM) of the orientation. This is a direct formula involving the quaternion components.

**Concrete Example:** If you have a quaternion $(0.707, 0, 0.707, 0)$, which represents a 90-degree rotation around the Y-axis, you can plug these values into the formula to get the DCM for a 90-degree Y-rotation.

**Formal/Mathematical Version:**
Given a unit quaternion $\mathbf{q} = \begin{pmatrix} q_0 \\ q_1 \\ q_2 \\ q_3 \end{pmatrix}$, the DCM $\mathbf{C}_B^A$ is:
$$ \mathbf{C}_B^A = \begin{pmatrix} q_0^2+q_1^2-q_2^2-q_3^2 & 2(q_1q_2+q_0q_3) & 2(q_1q_3-q_0q_2) \\ 2(q_1q_2-q_0q_3) & q_0^2-q_1^2+q_2^2-q_3^2 & 2(q_2q_3+q_0q_1) \\ 2(q_1q_3+q_0q_2) & 2(q_2q_3-q_0q_1) & q_0^2-q_1^2-q_2^2+q_3^2 \end{pmatrix} $$
An alternative form that is sometimes easier to remember:
$$ \mathbf{C}_B^A = \begin{pmatrix} 1-2(q_2^2+q_3^2) & 2(q_1q_2+q_0q_3) & 2(q_1q_3-q_0q_2) \\ 2(q_1q_2-q_0q_3) & 1-2(q_1^2+q_3^2) & 2(q_2q_3+q_0q_1) \\ 2(q_1q_3+q_0q_2) & 2(q_2q_3-q_0q_1) & 1-2(q_1^2+q_2^2) \end{pmatrix} $$
This conversion assumes $\mathbf{q}$ is a unit quaternion.

**What could go wrong:** Using a non-unit quaternion will result in a non-orthogonal matrix that is not a valid DCM. Sign errors in the off-diagonal elements (e.g., $q_0 q_3$ vs $-q_0 q_3$).

### ### Step 9: Euler Angles to Quaternion (via DCM)

**Plain-English Statement:** To convert from Euler angles to a quaternion, the most straightforward path is usually to first convert the Euler angles into a DCM, and then convert that DCM into a quaternion.

**Concrete Example:** You have your "yaw, pitch, roll" instructions. First, use them to build the 3x3 DCM. Then, use the DCM-to-quaternion formulas to get your quaternion.

**Formal/Mathematical Version:**
1.  **Euler Angles to DCM:** Use the method from Step 6 to calculate $\mathbf{C}_B^A$ from the given Euler angles $(\psi, \theta, \phi)$.
    $$ \mathbf{C}_B^A = \mathbf{R}_x(\phi) \mathbf{R}_y(\theta) \mathbf{R}_z(\psi) $$
2.  **DCM to Quaternion:** Use the method from Step 7 to calculate $\mathbf{q}$ from the resulting $\mathbf{C}_B^A$.

**What could go wrong:** Any error in the intermediate DCM calculation will propagate to the quaternion.

### ### Step 10: Quaternion to Euler Angles (via DCM)

**Plain-English Statement:** To convert from a quaternion to Euler angles, the most common and robust approach is to first convert the quaternion into a DCM, and then convert that DCM into Euler angles.

**Concrete Example:** You have your "axis-angle" quaternion. First, use it to build the 3x3 DCM. Then, use the DCM-to-Euler formulas to get your "yaw, pitch, roll" instructions.

**Formal/Mathematical Version:**
1.  **Quaternion to DCM:** Use the method from Step 8 to calculate $\mathbf{C}_B^A$ from the given quaternion $\mathbf{q}$.
2.  **DCM to Euler Angles:** Use the method from Step 5 to calculate $(\psi, \theta, \phi)$ from the resulting $\mathbf{C}_B^A$. Remember to handle the Gimbal Lock case.

**What could go wrong:** Gimbal Lock is still a problem when converting *to* Euler angles, regardless of the intermediate representation. Errors in the intermediate DCM calculation will propagate.

## 5. Worked examples — multiple, with every step shown

We will use the 3-2-1 (Z-Y-X) Euler sequence for these examples, where $\psi$ is yaw (Z), $\theta$ is pitch (Y), and $\phi$ is roll (X).

### Example 1: Euler Angles to DCM (Easy)

**Problem:** Convert the Euler angles $(\psi, \theta, \phi) = (30^\circ, 0^\circ, 0^\circ)$ to a Direction Cosine Matrix.

**Given:** Yaw $\psi = 30^\circ$, Pitch $\theta = 0^\circ$, Roll $\phi = 0^\circ$.
**Wanted:** The DCM $\mathbf{C}_B^A$.

**Solution:**
1.  **Calculate sine and cosine values for each angle.**
    *   $\psi = 30^\circ$: $\cos(30^\circ) = \sqrt{3}/2 \approx 0.8660$, $\sin(30^\circ) = 1/2 = 0.5$
    *   $\theta = 0^\circ$: $\cos(0^\circ) = 1$, $\sin(0^\circ) = 0$
    *   $\phi = 0^\circ$: $\cos(0^\circ) = 1$, $\sin(0^\circ) = 0$

2.  **Write down the elemental rotation matrices.**
    *   For $\mathbf{R}_z(\psi)$:
        $$ \mathbf{R}_z(30^\circ) = \begin{pmatrix} \cos30^\circ & \sin30^\circ & 0 \\ -\sin30^\circ & \cos30^\circ & 0 \\ 0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 0.8660 & 0.5 & 0 \\ -0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *Explanation: This is the rotation matrix for a rotation around the Z-axis by 30 degrees.*
    *   For $\mathbf{R}_y(\theta)$:
        $$ \mathbf{R}_y(0^\circ) = \begin{pmatrix} \cos0^\circ & 0 & -\sin0^\circ \\ 0 & 1 & 0 \\ \sin0^\circ & 0 & \cos0^\circ \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *Explanation: A 0-degree rotation around the Y-axis is simply the identity matrix, meaning no change.*
    *   For $\mathbf{R}_x(\phi)$:
        $$ \mathbf{R}_x(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos0^\circ & \sin0^\circ \\ 0 & -\sin0^\circ & \cos0^\circ \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *Explanation: Similarly, a 0-degree rotation around the X-axis is the identity matrix.*

3.  **Multiply the matrices in the correct order for an intrinsic 3-2-1 (Z-Y-X) sequence.**
    The order is $\mathbf{C}_B^A = \mathbf{R}_x(\phi) \mathbf{R}_y(\theta) \mathbf{R}_z(\psi)$.
    $$ \mathbf{C}_B^A = \mathbf{R}_x(0^\circ) \mathbf{R}_y(0^\circ) \mathbf{R}_z(30^\circ) $$
    $$ \mathbf{C}_B^A = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0.8660 & 0.5 & 0 \\ -0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    $$ \mathbf{C}_B^A = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0.8660 & 0.5 & 0 \\ -0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *Explanation: Multiplying by the identity matrix leaves the other matrix unchanged. So, the first two multiplications don't change anything.*
    $$ \mathbf{C}_B^A = \begin{pmatrix} 0.8660 & 0.5 & 0 \\ -0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *Explanation: The final DCM is simply the Z-rotation matrix, as expected since pitch and roll were zero.*

**Final Answer:**
$$ \boxed{\mathbf{C}_B^A = \begin{pmatrix} 0.8660 & 0.5 & 0 \\ -0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{pmatrix}} $$
**Reflection:** This example was easy because two of the angles were zero, simplifying the matrix multiplication. It highlights that a single rotation about an axis results in a DCM that is just the elemental rotation matrix for that axis.

### Example 2: DCM to Euler Angles (Medium)

**Problem:** Convert the following DCM to 3-2-1 (Z-Y-X) Euler angles $(\psi, \theta, \phi)$:
$$ \mathbf{C}_B^A = \begin{pmatrix} 0.8660 & 0.0000 & 0.5000 \\ 0.0000 & 1.0000 & 0.0000 \\ -0.5000 & 0.0000 & 0.8660 \end{pmatrix} $$

**Given:** $\mathbf{C}_B^A$.
**Wanted:** $(\psi, \theta, \phi)$.

**Solution:**
Recall the analytical form for 3-2-1 (Z-Y-X) Euler angles:
$$ \mathbf{C}_B^A = \begin{pmatrix} \cos\theta\cos\psi & \cos\theta\sin\psi & -\sin\theta \\ \sin\phi\sin\theta\cos\psi - \cos\phi\sin\psi & \sin\phi\sin\theta\sin\psi + \cos\phi\cos\psi & \sin\phi\cos\theta \\ \cos\phi\sin\theta\cos\psi + \sin\phi\sin\psi & \cos\phi\sin\theta\sin\psi - \sin\phi\cos\psi & \cos\phi\cos\theta \end{pmatrix} $$

1.  **Extract Pitch ($\theta$).**
    From $C_{13} = -\sin\theta$:
    $$ 0.5000 = -\sin\theta $$
    $$ \sin\theta = -0.5000 $$
    $$ \theta = \operatorname{asin}(-0.5000) = -30^\circ $$
    *Explanation: We use the $C_{13}$ element to find the pitch angle. $\operatorname{asin}$ gives the principal value, which is correct here.*
    Now calculate $\cos\theta$: $\cos(-30^\circ) = \sqrt{3}/2 \approx 0.8660$. This is non-zero, so we are not in Gimbal Lock.

2.  **Extract Yaw ($\psi$).**
    From $C_{11} = \cos\theta\cos\psi$ and $C_{12} = \cos\theta\sin\psi$:
    $$ \cos\theta\cos\psi = 0.8660 $$
    $$ \cos\theta\sin\psi = 0.0000 $$
    Substitute $\cos\theta = 0.8660$:
    $$ 0.8660 \cos\psi = 0.8660 \implies \cos\psi = 1 $$
    $$ 0.8660 \sin\psi = 0.0000 \implies \sin\psi = 0 $$
    Using $\operatorname{atan2}(y, x) = \operatorname{atan2}(\sin\psi, \cos\psi)$:
    $$ \psi = \operatorname{atan2}(0, 1) = 0^\circ $$
    *Explanation: $\operatorname{atan2}$ is used to correctly determine $\psi$ from its sine and cosine values, ensuring the correct quadrant. Here, $\sin\psi=0$ and $\cos\psi=1$ uniquely determine $\psi=0^\circ$.*

3.  **Extract Roll ($\phi$).**
    From $C_{23} = \sin\phi\cos\theta$ and $C_{33} = \cos\phi\cos\theta$:
    $$ \sin\phi\cos\theta = 0.0000 $$
    $$ \cos\phi\cos\theta = 0.8660 $$
    Substitute $\cos\theta = 0.8660$:
    $$ 0.8660 \sin\phi = 0.0000 \implies \sin\phi = 0 $$
    $$ 0.8660 \cos\phi = 0.8660 \implies \cos\phi = 1 $$
    Using $\operatorname{atan2}(y, x) = \operatorname{atan2}(\sin\phi, \cos\phi)$:
    $$ \phi = \operatorname{atan2}(0, 1) = 0^\circ $$
    *Explanation: Similar to yaw, $\operatorname{atan2}$ is used to find $\phi$.*

**Final Answer:**
$$ \boxed{(\psi, \theta, \phi) = (0^\circ, -30^\circ, 0^\circ)} $$
**Reflection:** This example demonstrates the process of extracting Euler angles from a DCM. The key is to correctly identify which DCM elements correspond to which trigonometric expressions and to use $\operatorname{atan2}$ for robustness. The matrix provided actually corresponds to a pure Y-axis rotation (pitch), which is $R_y(-30^\circ)$.

### Example 3: Euler Angles to Quaternion (Medium)

**Problem:** Convert the Euler angles $(\psi, \theta, \phi) = (90^\circ, 0^\circ, 0^\circ)$ to a quaternion.

**Given:** Yaw $\psi = 90^\circ$, Pitch $\theta = 0^\circ$, Roll $\phi = 0^\circ$.
**Wanted:** Quaternion $\mathbf{q} = (q_0, q_1, q_2, q_3)^T$.

**Solution:** We will use the two-step process: Euler to DCM, then DCM to Quaternion.

**Step 1: Euler Angles to DCM**
1.  **Calculate sine and cosine values.**
    *   $\psi = 90^\circ$: $\cos(90^\circ) = 0$, $\sin(90^\circ) = 1$
    *   $\theta = 0^\circ$: $\cos(0^\circ) = 1$, $\sin(0^\circ) = 0$
    *   $\phi = 0^\circ$: $\cos(0^\circ) = 1$, $\sin(0^\circ) = 0$

2.  **Elemental rotation matrices.**
    *   $\mathbf{R}_z(90^\circ) = \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$
    *   $\mathbf{R}_y(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$
    *   $\mathbf{R}_x(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$

3.  **Multiply for 3-2-1 (Z-Y-X) sequence: $\mathbf{C}_B^A = \mathbf{R}_x(\phi) \mathbf{R}_y(\theta) \mathbf{R}_z(\psi)$.**
    $$ \mathbf{C}_B^A = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *Explanation: Similar to Example 1, the identity matrices simplify the multiplication, leaving just the Z-rotation matrix.*

**Step 2: DCM to Quaternion**
Given $\mathbf{C}_B^A = \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$.

1.  **Calculate the trace $T$.**
    $$ T = C_{11} + C_{22} + C_{33} = 0 + 0 + 1 = 1 $$
    *Explanation: The trace is the sum of the diagonal elements.*

2.  **Since $T > 0$, use the first set of formulas.**
    $$ q_0 = \frac{1}{2}\sqrt{1+T} = \frac{1}{2}\sqrt{1+1} = \frac{1}{2}\sqrt{2} = \frac{\sqrt{2}}{2} \approx 0.7071 $$
    *Explanation: $q_0$ is calculated directly from the trace.*
    $$ q_1 = \frac{C_{32} - C_{23}}{4q_0} = \frac{0 - 0}{4(\sqrt{2}/2)} = 0 $$
    *Explanation: $q_1$ is related to the difference of off-diagonal elements in the X-row/column.*
    $$ q_2 = \frac{C_{13} - C_{31}}{4q_0} = \frac{0 - 0}{4(\sqrt{2}/2)} = 0 $$
    *Explanation: $q_2$ is related to the difference of off-diagonal elements in the Y-row/column.*
    $$ q_3 = \frac{C_{21} - C_{12}}{4q_0} = \frac{-1 - 1}{4(\sqrt{2}/2)} = \frac{-2}{2\sqrt{2}} = \frac{-1}{\sqrt{2}} = -\frac{\sqrt{2}}{2} \approx -0.7071 $$
    *Explanation: $q_3$ is related to the difference of off-diagonal elements in the Z-row/column.*

3.  **Normalize the quaternion (though it should already be unit if DCM is valid).**
    $$ q_0^2 + q_1^2 + q_2^2 + q_3^2 = (0.7071)^2 + 0^2 + 0^2 + (-0.7071)^2 = 0.5 + 0 + 0 + 0.5 = 1 $$
    The quaternion is already normalized.

**Final Answer:**
$$ \boxed{\mathbf{q} = \begin{pmatrix} 0.7071 \\ 0 \\ 0 \\ -0.7071 \end{pmatrix}} $$
**Reflection:** This example shows that a 90-degree yaw (Z-axis rotation) results in a quaternion where $q_0 = \cos(90^\circ/2) = \cos(45^\circ) = \sqrt{2}/2$ and $q_3 = \sin(90^\circ/2) = \sin(45^\circ) = \sqrt{2}/2$. However, due to the sign convention in the DCM to quaternion formula, $q_3$ comes out negative. This is related to the "double cover" property where $\mathbf{q}$ and $-\mathbf{q}$ represent the same rotation. The quaternion $(0.7071, 0, 0, -0.7071)$ represents a rotation of $-90^\circ$ about the Z-axis, which is equivalent to a rotation of $+90^\circ$ about the Z-axis in the opposite direction. This is a common occurrence and valid.

### Example 4: Quaternion to Euler Angles (Hard - with Gimbal Lock consideration)

**Problem:** Convert the quaternion $\mathbf{q} = (0.7071, 0, 0.7071, 0)^T$ to 3-2-1 (Z-Y-X) Euler angles $(\psi, \theta, \phi)$.

**Given:** Quaternion $\mathbf{q} = (0.7071, 0, 0.7071, 0)^T$.
**Wanted:** $(\psi, \theta, \phi)$.

**Solution:** We will use the two-step process: Quaternion to DCM, then DCM to Euler.

**Step 1: Quaternion to DCM**
Given $\mathbf{q} = (q_0, q_1, q_2, q_3)^T = (0.7071, 0, 0.7071, 0)^T$.
Recall the DCM formula from quaternion:
$$ \mathbf{C}_B^A = \begin{pmatrix} q_0^2+q_1^2-q_2^2-q_3^2 & 2(q_1q_2+q_0q_3) & 2(q_1q_3-q_0q_2) \\ 2(q_1q_2-q_0q_3) & q_0^2-q_1^2+q_2^2-q_3^2 & 2(q_2q_3+q_0q_1) \\ 2(q_1q_3+q_0q_2) & 2(q_2q_3-q_0q_1) & q_0^2-q_1^2-q_2^2+q_3^2 \end{pmatrix} $$
Let's plug in the values: $q_0 = 0.7071$, $q_1 = 0$, $q_2 = 0.7071$, $q_3 = 0$.
$q_0^2 = 0.5$, $q_1^2 = 0$, $q_2^2 = 0.5$, $q_3^2 = 0$.

*   $C_{11} = q_0^2+q_1^2-q_2^2-q_3^2 = 0.5 + 0 - 0.5 - 0 = 0$
*   $C_{12} = 2(q_1q_2+q_0q_3) = 2(0 \cdot 0.7071 + 0.7071 \cdot 0) = 0$
*   $C_{13} = 2(q_1q_3-q_0q_2) = 2(0 \cdot 0 - 0.7071 \cdot 0.7071) = 2(-0.5) = -1$
*   $C_{21} = 2(q_1q_2-q_0q_3) = 2(0 \cdot 0.7071 - 0.7071 \cdot 0) = 0$
*   $C_{22} = q_0^2-q_1^2+q_2^2-q_3^2 = 0.5 - 0 + 0.5 - 0 = 1$
*   $C_{23} = 2(q_2q_3+q_0q_1) = 2(0.7071 \cdot 0 + 0.7071 \cdot 0) = 0$
*   $C_{31} = 2(q_1q_3+q_0q_2) = 2(0 \cdot 0 + 0.7071 \cdot 0.7071) = 2(0.5) = 1$
*   $C_{32} = 2(q_2q_3-q_0q_1) = 2(0.7071 \cdot 0 - 0.7071 \cdot 0) = 0$
*   $C_{33} = q_0^2-q_1^2-q_2^2+q_3^2 = 0.5 - 0 - 0.5 + 0 = 0$

Thus, the DCM is:
$$ \mathbf{C}_B^A = \begin{pmatrix} 0 & 0 & -1 \\ 0 & 1 & 0 \\ 1 & 0 & 0 \end{pmatrix} $$
*Explanation: This DCM represents a 90-degree pitch (Y-axis) rotation. Specifically, $R_y(90^\circ)$.*

**Step 2: DCM to Euler Angles (3-2-1/Z-Y-X)**
Given $\mathbf{C}_B^A = \begin{pmatrix} 0 & 0 & -1 \\ 0 & 1 & 0 \\ 1 & 0 & 0 \end{pmatrix}$.

1.  **Extract Pitch ($\theta$).**
    From $C_{13} = -\sin\theta$:
    $$ -1 = -\sin\theta $$
    $$ \sin\theta = 1 $$
    $$ \theta = \operatorname{asin}(1) = 90^\circ $$
    *Explanation: This is a critical point. $\theta = 90^\circ$ means $\cos\theta = 0$, indicating Gimbal Lock!*

2.  **Handle Gimbal Lock for Yaw ($\psi$) and Roll ($\phi$).**
    Since $\theta = 90^\circ$, we have $\cos\theta = 0$. The formulas for $\psi$ and $\phi$ become indeterminate.
    In the case of $\theta = 90^\circ$, the DCM becomes:
    $$ \mathbf{C}_B^A = \begin{pmatrix} 0 & 0 & -1 \\ \sin(\phi-\psi) & \cos(\phi-\psi) & 0 \\ \cos(\phi-\psi) & -\sin(\phi-\psi) & 0 \end{pmatrix} $$
    Comparing this with our calculated DCM:
    $$ \begin{pmatrix} 0 & 0 & -1 \\ \sin(\phi-\psi) & \cos(\phi-\psi) & 0 \\ \cos(\phi-\psi) & -\sin(\phi-\psi) & 0 \end{pmatrix} = \begin{pmatrix} 0 & 0 & -1 \\ 0 & 1 & 0 \\ 1 & 0 & 0 \end{pmatrix} $$
    From $C_{22}$: $\cos(\phi-\psi) = 1$
    From $C_{21}$: $\sin(\phi-\psi) = 0$
    From these, we can deduce:
    $$ \phi - \psi = \operatorname{atan2}(0, 1) = 0^\circ $$
    *Explanation: We can only determine the difference between roll and yaw, not their individual values.*
    A common convention to resolve Gimbal Lock is to set one of the angles (e.g., $\psi$) to $0^\circ$ and solve for the other.
    If we set $\psi = 0^\circ$, then $\phi - 0^\circ = 0^\circ \implies \phi = 0^\circ$.

**Final Answer:**
$$ \boxed{(\psi, \theta, \phi) = (0^\circ, 90^\circ, 0^\circ)} $$
**Reflection:** This example demonstrates the Gimbal Lock problem. The quaternion $(0.7071, 0, 0.7071, 0)^T$ represents a pure 90-degree pitch rotation. When converting this to 3-2-1 Euler angles, the pitch angle $\theta$ becomes $90^\circ$, causing Gimbal Lock. This means there are infinite combinations of $\psi$ and $\phi$ that yield the same orientation (e.g., $(0^\circ, 90^\circ, 0^\circ)$ or $(45^\circ, 90^\circ, 45^\circ)$). Our convention of setting $\psi=0$ provides *one* valid solution. This highlights why quaternions are often preferred for internal calculations in GNC systems.

## 6. Common mistakes and traps

1.  **Gimbal Lock Neglect:** The most notorious trap with Euler angles. Students often forget to check for $\theta = \pm 90^\circ$ (for 3-2-1 sequence) when converting *from* DCM to Euler angles. This leads to division by zero or non-unique solutions.
2.  **Incorrect Euler Angle Sequence:** There are 12 different Euler angle sequences (e.g., 3-2-1, 3-1-3, 1-2-3, etc.). Using the wrong sequence formula for a conversion will yield incorrect results. Always be explicit about the sequence.
3.  **Intrinsic vs. Extrinsic Rotations:** Confusing whether rotations are about the *fixed* (extrinsic) or *moving* (intrinsic) axes. This affects the order of matrix multiplication and can lead to sign errors. (For intrinsic, multiply in reverse order; for extrinsic, multiply in the given order).
4.  **Non-Unit Quaternions:** Forgetting to normalize quaternions after operations (like integration or interpolation) leads to invalid rotations (scaling and shearing effects) when converting to DCMs or using them in rotation formulas.
5.  **$\operatorname{atan}$ vs. $\operatorname{atan2}$:** Using $\operatorname{atan}(y/x)$ instead of $\operatorname{atan2}(y, x)$ when extracting angles from DCMs. $\operatorname{atan}$ only provides angles in $(-\pi/2, \pi/2)$ and doesn't handle quadrant information correctly, leading to angles in the wrong range. $\operatorname{atan2}$ is crucial for full $360^\circ$ range.
6.  **Matrix Multiplication Order:** For Euler angles to DCM, the order of multiplication of elementary rotation matrices is critical. For an intrinsic sequence $A-B-C$, the DCM is $R_C R_B R_A$. For an extrinsic sequence $A-B-C$, the DCM is $R_A R_B R_C$.
7.  **Sign Conventions:** Different textbooks or software libraries might use slightly different sign conventions for rotation angles or quaternion components. Always check the definitions being used.

## 7. Textbook-precise explanation

This section provides the formal, rigorous definitions and conversion formulas as found in advanced textbooks on aerospace dynamics and control.

**Coordinate Frames:**
Let $\{A\}$ denote an inertial or reference frame, and $\{B\}$ denote a body-fixed frame. Vectors expressed in frame $\{A\}$ are denoted $\mathbf{v}^A$, and in frame $\{B\}$ as $\mathbf{v}^B$.

**Direction Cosine Matrix (DCM):**
The DCM, $\mathbf{C}_B^A$, transforms a vector from frame $\{B\}$ to frame $\{A\}$. Its columns are the unit basis vectors of frame $\{B\}$ expressed in frame $\{A\}$.
$$ \mathbf{C}_B^A = \begin{pmatrix} \mathbf{x}_B \cdot \mathbf{x}_A & \mathbf{y}_B \cdot \mathbf{x}_A & \mathbf{z}_B \cdot \mathbf{x}_A \\ \mathbf{x}_B \cdot \mathbf{y}_A & \mathbf{y}_B \cdot \mathbf{y}_A & \mathbf{z}_B \cdot \mathbf{y}_A \\ \mathbf{x}_B \cdot \mathbf{z}_A & \mathbf{y}_B \cdot \mathbf{z}_A & \mathbf{z}_B \cdot \mathbf{z}_A \end{pmatrix} $$
Properties: $\mathbf{C}_B^A$ is orthogonal, meaning $(\mathbf{C}_B^A)^{-1} = (\mathbf{C}_B^A)^T = \mathbf{C}_A^B$, and $\det(\mathbf{C}_B^A) = +1$.

**Euler Angles (3-2-1 / Z-Y-X Intrinsic Sequence):**
Let the sequence be yaw ($\psi$) about $Z_B$, then pitch ($\theta$) about $Y'_B$, then roll ($\phi$) about $X''_B$.
The elementary rotation matrices are:
$$ \mathbf{R}_x(\phi) = \begin{pmatrix} 1 & 0 &