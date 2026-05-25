## 1. What it is — in plain English

Imagine you have a toy airplane sitting on a table. To describe exactly how it's tilted and turned, you could use a set of three specific instructions. Euler angles are just that: a way to describe an object's orientation in 3D space using three sequential rotations around different axes.

Think of it like giving directions to rotate the airplane. First, you might tell it to turn left or right, like steering a car – that's "yaw." Then, you might tell it to point its nose up or down, like climbing or diving – that's "pitch." Finally, you might tell it to tilt its wings, like banking into a turn – that's "roll."

The key idea is that these rotations happen one after another, and the axis you rotate around changes with each step. So, when you pitch the plane, you're not pitching around the original "world" horizontal axis, but around the horizontal axis *of the already-yawed plane*. This sequence matters a lot, just like turning left then going straight is different from going straight then turning left.

Specifically, the "3-2-1 convention" (also known as Yaw-Pitch-Roll) means you first rotate around the Z-axis (yaw), then around the *new* Y-axis (pitch), and finally around the *newest* X-axis (roll). These three angles—roll ($\phi$), pitch ($\theta$), and yaw ($\psi$)—together uniquely define the object's orientation relative to a starting position.

## 2. Why it matters — real-world applications

Euler angles are fundamental to understanding and controlling anything that moves or is oriented in 3D space. Their simplicity and intuitive connection to human motion make them invaluable, especially in aerospace.

1.  **Aircraft and Spacecraft Guidance, Navigation & Control (GNC):** Every airplane, helicopter, drone, and rocket needs to know its orientation (attitude) to fly correctly. Autopilots on commercial airliners (e.g., **Boeing 787**, **Airbus A350**) constantly use Euler angles to maintain a desired heading, altitude, and bank angle. Similarly, during critical maneuvers like docking a **SpaceX Dragon** capsule with the International Space Station, the spacecraft's attitude is precisely controlled using Euler angles as inputs to its thruster firing algorithms.
2.  **Robotics and Autonomous Systems:** Industrial robots (like those from **KUKA** or **FANUC**) use Euler angles to define the orientation of their end-effectors (the "hand" of the robot) to precisely grasp or manipulate objects. Autonomous vehicles, such as self-driving cars or **Boston Dynamics' Spot** robot, rely on Euler angles derived from their Inertial Measurement Units (IMUs) to understand their current orientation relative to the ground and navigate their environment.
3.  **Computer Graphics and Virtual Reality (VR):** In video games (e.g., **Microsoft Flight Simulator**, **Kerbal Space Program**) and VR applications (e.g., **Meta Quest** headsets), Euler angles are widely used to represent the orientation of cameras, characters, and objects. When you look around in a VR world, your head movements are translated into changes in Euler angles to rotate the virtual camera view accordingly. Game engines like **Unity** and **Unreal Engine** extensively use Euler angles for object transformations.
4.  **Marine and Submarine Navigation:** Ships and submarines use Euler angles (often called "heading," "pitch," and "roll" in this context) to describe their attitude on or under the water. This is crucial for stability control, course keeping, and avoiding capsizing in rough seas. For example, a ship's autopilot system will use these angles to command rudders and stabilizers to maintain a steady course and minimize wave-induced motion.

## 3. Prerequisites — what you must know first

Before diving deep into Euler angles, ensure you have a solid grasp of these foundational concepts:

*   **Vectors:** Quantities with both magnitude and direction, often represented as arrows in 2D or 3D space.
*   **Matrices:** Rectangular arrays of numbers, used here to represent transformations and rotations.
*   **Matrix Multiplication:** The specific rules for multiplying matrices, which is essential for combining rotations.
*   **Rotation Matrices:** Special types of matrices that, when multiplied by a vector, rotate that vector around a specific axis by a specific angle.
*   **Coordinate Systems:** A framework (like x, y, z axes) used to define positions and orientations in space.
    *   **Inertial Frame (or World Frame):** A fixed, non-accelerating reference frame, often considered the "global" or "world" coordinate system.
    *   **Body-Fixed Frame:** A coordinate system attached to and moving with the object itself, with its origin typically at the object's center of mass.
*   **Right-Hand Rule:** A convention for defining the positive direction of rotation around an axis. If you curl the fingers of your right hand in the direction of positive rotation, your thumb points in the positive direction of the axis.
*   **Trigonometry:** Understanding of sine ($\sin$), cosine ($\cos$), and tangent ($\tan$) functions, as well as their inverse functions ($\arcsin$, $\arccos$, $\arctan$, and especially $\operatorname{atan2}$).

## 4. The core idea — step by step

Euler angles provide a way to describe any 3D orientation as a sequence of three rotations about specific axes. The "3-2-1 convention" is one of the most common sequences, especially in aerospace, corresponding to Yaw-Pitch-Roll.

### Step 1: The Concept of Orientation

**Plain English:** An object's orientation is simply how it's positioned or tilted in space relative to some standard starting point. If you pick up a phone, you can hold it flat, tilt it, or turn it. Each of these positions is a different orientation.

**Concrete Example:** Imagine an airplane perfectly level on the runway, pointing north. This is its initial, un-rotated orientation. If it takes off, climbs, and banks to the right, its orientation has changed.

**Formal/Mathematical Version:** We define an object's orientation by the relationship between its **body-fixed coordinate frame** $\{B\}$ and a fixed **inertial coordinate frame** $\{I\}$. The goal is to find a transformation (a rotation matrix) that maps vectors from $\{B\}$ to $\{I\}$, or vice-versa.

**What could go wrong:** Confusing orientation with position. An object can be in the same position but have a different orientation (e.g., a car parked in the same spot but facing a different direction).

### Step 2: Fixed vs. Body-Fixed Frames

**Plain English:** To describe how something is oriented, you need two reference points. One is the "world" (the ground, the room, outer space), which we call the **inertial frame**. The other is attached to the object itself, moving with it, which we call the **body-fixed frame**.

**Concrete Example:** For our airplane, the inertial frame might have its Z-axis pointing straight up from the runway, its X-axis pointing north, and its Y-axis pointing east. The body-fixed frame of the airplane has its X-axis pointing out the nose, its Y-axis out the right wing, and its Z-axis out the belly (downwards, following the right-hand rule for aerospace convention, or upwards for other conventions - we'll use X-forward, Y-right, Z-down for aerospace, making it a right-handed system). When the plane moves, its body frame moves with it, but the inertial frame stays put.

**Formal/Mathematical Version:**
*   **Inertial Frame $\{I\}$:** $\{X_I, Y_I, Z_I\}$
*   **Body Frame $\{B\}$:** $\{X_B, Y_B, Z_B\}$
We want to find the rotation matrix $R_{IB}$ that transforms a vector from the body frame to the inertial frame: $\mathbf{v}_I = R_{IB} \mathbf{v}_B$.

**What could go wrong:** Mixing up which frame is which, or using inconsistent axis conventions (e.g., Z-up for world, but Z-down for body). Always define your frames explicitly.

### Step 3: The Three Fundamental Rotations (Yaw, Pitch, Roll)

**Plain English:** Euler angles break down any complex 3D rotation into three simpler, sequential rotations. Each rotation is about one of the main axes (X, Y, or Z).

*   **Yaw ($\psi$):** This is a rotation around the Z-axis. Think of it as turning left or right, like a car steering or a weather vane spinning. Positive yaw is typically nose-right.
*   **Pitch ($\theta$):** This is a rotation around the Y-axis. Think of it as tilting the nose up or down, like an airplane climbing or diving. Positive pitch is typically nose-up.
*   **Roll ($\phi$):** This is a rotation around the X-axis. Think of it as tilting the wings, like an airplane banking for a turn. Positive roll is typically right wing down.

**Concrete Example:**
*   Yaw: The airplane on the runway turns its nose from North to East.
*   Pitch: The airplane takes off and climbs, pointing its nose upwards.
*   Roll: The airplane banks to the right to make a turn.

**Formal/Mathematical Version:** These are the basic rotation matrices for positive angles around the principal axes.
Rotation about X-axis by angle $\phi$ (Roll):
$$ R_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & \sin\phi \\ 0 & -\sin\phi & \cos\phi \end{pmatrix} $$
Rotation about Y-axis by angle $\theta$ (Pitch):
$$ R_y(\theta) = \begin{pmatrix} \cos\theta & 0 & -\sin\theta \\ 0 & 1 & 0 \\ \sin\theta & 0 & \cos\theta \end{pmatrix} $$
Rotation about Z-axis by angle $\psi$ (Yaw):
$$ R_z(\psi) = \begin{pmatrix} \cos\psi & \sin\psi & 0 \\ -\sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
*Note: The sign convention for $\sin$ in these matrices depends on whether you're rotating a coordinate system or a vector, and which direction is positive. The matrices shown are for active rotation of a vector in a right-handed system, with positive angles following the right-hand rule. For aerospace, often positive roll is right-wing-down, positive pitch is nose-up, positive yaw is nose-right. My matrices above reflect the standard mathematical convention for rotating a vector where a positive angle rotates counter-clockwise when looking down the positive axis towards the origin. We will adjust for aerospace convention in examples if needed, but for now, stick to standard math.*
*Self-correction*: The standard rotation matrices in aerospace texts usually have $\sin\phi$ in the (2,3) position and $-\sin\phi$ in (3,2) for $R_x(\phi)$, and similar for $R_y(\theta)$ and $R_z(\psi)$. Let's use the convention where positive angles correspond to counter-clockwise rotation when looking *down* the positive axis towards the origin.
For $R_x(\phi)$:
$$ R_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & -\sin\phi \\ 0 & \sin\phi & \cos\phi \end{pmatrix} $$
For $R_y(\theta)$:
$$ R_y(\theta) = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix} $$
For $R_z(\psi)$:
$$ R_z(\psi) = \begin{pmatrix} \cos\psi & -\sin\psi & 0 \\ \sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
These are rotations of a coordinate system (passive rotations) or counter-clockwise active rotations of a vector. For aerospace, often the signs are flipped depending on the convention (e.g., positive roll being right wing down, which is clockwise about X). Let's be explicit and state the convention. I will use the *standard mathematical convention* for active rotation of a vector, where positive angles are counter-clockwise when looking down the positive axis towards the origin. This means my $R_x$ matrix above is correct for *this* convention.

**What could go wrong:** Incorrectly defining positive rotation directions. Always use the right-hand rule consistently.

### Step 4: The Importance of Rotation Sequence

**Plain English:** The order in which you apply the three rotations *absolutely* matters. Rotating an object by yaw, then pitch, then roll will almost always result in a different final orientation than rotating by pitch, then roll, then yaw. Rotations are not "commutative."

**Concrete Example:**
1.  Hold your phone flat on a table, screen up.
2.  **Sequence A:**
    *   Rotate it 90 degrees around its Z-axis (yaw left).
    *   Then, rotate it 90 degrees around its *new* Y-axis (pitch up).
    *   The phone is now on its side, screen facing you.
3.  **Sequence B:**
    *   Rotate it 90 degrees around its Y-axis (pitch up).
    *   Then, rotate it 90 degrees around its *new* Z-axis (yaw left).
    *   The phone is now on its side, screen facing the ceiling.
The final orientations are different!

**Formal/Mathematical Version:** Matrix multiplication is generally not commutative, meaning $AB \neq BA$. Since combined rotations are represented by multiplying their individual rotation matrices, the order of multiplication directly reflects the order of rotation and affects the final result.

**What could go wrong:** Assuming you can reorder the rotations arbitrarily. This is a very common and critical mistake.

### Step 5: The 3-2-1 (Yaw-Pitch-Roll) Convention

**Plain English:** The 3-2-1 convention specifies a precise sequence of rotations:
1.  **First rotation:** Rotate around the **initial Z-axis** (Yaw, $\psi$).
2.  **Second rotation:** Rotate around the **new (intermediate) Y-axis** (Pitch, $\theta$).
3.  **Third rotation:** Rotate around the **newest (doubly intermediate) X-axis** (Roll, $\phi$).

This is also known as an "intrinsic" or "body-fixed" rotation sequence, where each subsequent rotation happens about an axis of the *currently rotated* coordinate system.

**Concrete Example:**
*   Start with the airplane aligned with the inertial frame.
*   **Yaw ($\psi$):** Turn the airplane's nose left or right about the *world's vertical axis*.
*   **Pitch ($\theta$):** Now, with the airplane already yawed, tilt its nose up or down about its *own wing-to-wing axis*.
*   **Roll ($\phi$):** Finally, with the airplane already yawed and pitched, bank its wings left or right about its *own nose-to-tail axis*.

**Formal/Mathematical Version:**
Let $\{I\}$ be the inertial frame and $\{B\}$ be the body frame. We start with $\{B\}$ aligned with $\{I\}$.
1.  Rotate $\{B\}$ about $Z_I$ by $\psi$ to get intermediate frame $\{B_1\}$. This transformation is $R_{B_1 I} = R_z(\psi)$.
2.  Rotate $\{B_1\}$ about $Y_{B_1}$ by $\theta$ to get intermediate frame $\{B_2\}$. This transformation is $R_{B_2 B_1} = R_y(\theta)$.
3.  Rotate $\{B_2\}$ about $X_{B_2}$ by $\phi$ to get the final body frame $\{B\}$. This transformation is $R_{B B_2} = R_x(\phi)$.

To find the total rotation matrix $R_{IB}$ that transforms a vector from $\{B\}$ to $\{I\}$, we compose these rotations. If we have a vector $\mathbf{v}_B$ in the body frame, it's first rotated by $R_x(\phi)$ to get it into $\{B_2\}$, then by $R_y(\theta)$ to get it into $\{B_1\}$, then by $R_z(\psi)$ to get it into $\{I\}$.
Thus, $\mathbf{v}_I = R_z(\psi) R_y(\theta) R_x(\phi) \mathbf{v}_B$.
The combined rotation matrix $R_{IB}$ is:
$$ R_{IB} = R_z(\psi) R_y(\theta) R_x(\phi) $$
*Note: For intrinsic rotations, the matrices are multiplied in the reverse order of application.*

**What could go wrong:** Applying extrinsic rotations (about fixed axes) when intrinsic rotations are intended, or vice-versa. This leads to incorrect matrix multiplication order.

### Step 6: Deriving the Combined Rotation Matrix

**Plain English:** Now we combine the individual rotation matrices from Step 3 in the order specified by the 3-2-1 convention (from Step 5) to get one single matrix that does all three rotations at once.

**Formal/Mathematical Version:**
Using the standard mathematical rotation matrices (as defined in Step 3), the combined rotation matrix $R_{IB}$ for the 3-2-1 (Yaw-Pitch-Roll) intrinsic sequence is:
$$ R_{IB} = R_z(\psi) R_y(\theta) R_x(\phi) $$
Let $c\phi = \cos\phi$, $s\phi = \sin\phi$, etc.
$$ R_{IB} = \begin{pmatrix} c\psi & -s\psi & 0 \\ s\psi & c\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} c\theta & 0 & s\theta \\ 0 & 1 & 0 \\ -s\theta & 0 & c\theta \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & c\phi & -s\phi \\ 0 & s\phi & c\phi \end{pmatrix} $$
First, multiply $R_y(\theta) R_x(\phi)$:
$$ R_y(\theta) R_x(\phi) = \begin{pmatrix} c\theta & 0 & s\theta \\ 0 & 1 & 0 \\ -s\theta & 0 & c\theta \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & c\phi & -s\phi \\ 0 & s\phi & c\phi \end{pmatrix} = \begin{pmatrix} c\theta & s\theta s\phi & s\theta c\phi \\ 0 & c\phi & -s\phi \\ -s\theta & c\theta s\phi & c\theta c\phi \end{pmatrix} $$
Now, multiply $R_z(\psi)$ by the result:
$$ R_{IB} = \begin{pmatrix} c\psi & -s\psi & 0 \\ s\psi & c\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} c\theta & s\theta s\phi & s\theta c\phi \\ 0 & c\phi & -s\phi \\ -s\theta & c\theta s\phi & c\theta c\phi \end{pmatrix} $$
$$ R_{IB} = \begin{pmatrix} c\psi c\theta & c\psi s\theta s\phi - s\psi c\phi & c\psi s\theta c\phi + s\psi s\phi \\ s\psi c\theta & s\psi s\theta s\phi + c\psi c\phi & s\psi s\theta c\phi - c\psi s\phi \\ -s\theta & c\theta s\phi & c\theta c\phi \end{pmatrix} $$
This is the full rotation matrix for the 3-2-1 intrinsic Euler angle sequence.

**What could go wrong:** Errors in matrix multiplication, especially with signs. Double-check every term.

### Step 7: Gimbal Lock

**Plain English:** Gimbal lock is a problem unique to Euler angles. It's like a mechanical system (a gimbal) getting stuck when two of its rotation axes become aligned. When this happens, you lose one degree of freedom, meaning you can no longer describe certain rotations uniquely or smoothly.

**Concrete Example:** Imagine you have a physical gimbal system for a camera, with three nested rings for yaw, pitch, and roll. If you pitch the camera straight up (90 degrees), the yaw axis and the roll axis become perfectly aligned. Now, rotating the outer ring (which was yaw) does the exact same thing as rotating the innermost ring (which was roll). You've lost the ability to distinguish between yaw and roll, and you can't reach all possible orientations by further rotations.

**Formal/Mathematical Version:** Gimbal lock occurs when the pitch angle $\theta$ is $\pm 90^\circ$ (i.e., $\pm \pi/2$ radians). In this case, $\cos\theta = 0$ and $\sin\theta = \pm 1$.
Look at the derived $R_{IB}$ matrix:
$$ R_{IB} = \begin{pmatrix} c\psi c\theta & c\psi s\theta s\phi - s\psi c\phi & c\psi s\theta c\phi + s\psi s\phi \\ s\psi c\theta & s\psi s\theta s\phi + c\psi c\phi & s\psi s\theta c\phi - c\psi s\phi \\ -s\theta & c\theta s\phi & c\theta c\phi \end{pmatrix} $$
If $\theta = 90^\circ$, then $c\theta = 0$ and $s\theta = 1$:
$$ R_{IB}(\theta=90^\circ) = \begin{pmatrix} 0 & c\psi s\phi - s\psi c\phi & c\psi c\phi + s\psi s\phi \\ 0 & s\psi s\phi + c\psi c\phi & s\psi c\phi - c\psi s\phi \\ -1 & 0 & 0 \end{pmatrix} $$
Using trigonometric identities:
$c\psi s\phi - s\psi c\phi = -\sin(\psi-\phi)$
$c\psi c\phi + s\psi s\phi = \cos(\psi-\phi)$
$s\psi s\phi + c\psi c\phi = \cos(\psi-\phi)$
$s\psi c\phi - c\psi s\phi = \sin(\psi-\phi)$
So, for $\theta=90^\circ$:
$$ R_{IB}(\theta=90^\circ) = \begin{pmatrix} 0 & -\sin(\psi-\phi) & \cos(\psi-\phi) \\ 0 & \cos(\psi-\phi) & \sin(\psi-\phi) \\ -1 & 0 & 0 \end{pmatrix} $$
Notice that the first two columns (and rows) now depend on the *sum or difference* of $\psi$ and $\phi$, not on them individually. This means that an infinite number of $(\psi, \phi)$ pairs can produce the same orientation, and you cannot uniquely extract $\psi$ and $\phi$. You've lost a degree of freedom.

**What could go wrong:** Not understanding that Euler angles are not suitable for all orientations, especially when an axis approaches alignment with another. This can lead to uncontrolled behavior in GNC systems. Quaternions are often used to avoid gimbal lock.

## 5. Worked examples — multiple, with every step shown

Let's use the derived $R_{IB}$ for the 3-2-1 intrinsic rotation sequence (Yaw-Pitch-Roll) and the standard mathematical rotation matrices.
Recall:
$$ R_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & c\phi & -s\phi \\ 0 & s\phi & c\phi \end{pmatrix} $$
$$ R_y(\theta) = \begin{pmatrix} c\theta & 0 & s\theta \\ 0 & 1 & 0 \\ -s\theta & 0 & c\theta \end{pmatrix} $$
$$ R_z(\psi) = \begin{pmatrix} c\psi & -s\psi & 0 \\ s\psi & c\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
And $R_{IB} = R_z(\psi) R_y(\theta) R_x(\phi)$.

### Example 1: Single Rotation (Yaw only)

**Problem:** A point has coordinates $\mathbf{p}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ in the body frame. The body frame is rotated by a yaw angle of $\psi = 90^\circ$ (and $\theta = 0^\circ, \phi = 0^\circ$) relative to the inertial frame. Find the coordinates of the point in the inertial frame, $\mathbf{p}_I$.

**Given:**
*   Body frame vector: $\mathbf{p}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$
*   Euler angles: $\psi = 90^\circ$, $\theta = 0^\circ$, $\phi = 0^\circ$

**Want:** Inertial frame vector $\mathbf{p}_I$.

**Show every algebraic / logical step:**

1.  **Identify the individual rotation matrices for the given angles.**
    *   For $\psi = 90^\circ$:
        $c\psi = \cos(90^\circ) = 0$
        $s\psi = \sin(90^\circ) = 1$
        $$ R_z(90^\circ) = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *This is the rotation matrix for a 90-degree yaw.*
    *   For $\theta = 0^\circ$:
        $c\theta = \cos(0^\circ) = 1$
        $s\theta = \sin(0^\circ) = 0$
        $$ R_y(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *This is the identity matrix, meaning no pitch rotation.*
    *   For $\phi = 0^\circ$:
        $c\phi = \cos(0^\circ) = 1$
        $s\phi = \sin(0^\circ) = 0$
        $$ R_x(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *This is also the identity matrix, meaning no roll rotation.*

2.  **Calculate the combined rotation matrix $R_{IB}$.**
    *   For the 3-2-1 convention, $R_{IB} = R_z(\psi) R_y(\theta) R_x(\phi)$.
    *   Since $R_y(0^\circ)$ and $R_x(0^\circ)$ are identity matrices, their product is also an identity matrix.
        $$ R_{IB} = R_z(90^\circ) \cdot I \cdot I = R_z(90^\circ) $$
        $$ R_{IB} = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *The combined rotation matrix is simply the yaw rotation matrix, as expected since pitch and roll are zero.*

3.  **Transform the body frame vector to the inertial frame.**
    *   $\mathbf{p}_I = R_{IB} \mathbf{p}_B$
    $$ \mathbf{p}_I = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} $$
    $$ \mathbf{p}_I = \begin{pmatrix} (0 \cdot 1) + (-1 \cdot 0) + (0 \cdot 0) \\ (1 \cdot 1) + (0 \cdot 0) + (0 \cdot 0) \\ (0 \cdot 1) + (0 \cdot 0) + (1 \cdot 0) \end{pmatrix} $$
    $$ \mathbf{p}_I = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} $$
    *Multiplying the rotation matrix by the point vector gives the rotated coordinates.*

**Final Answer:**
$$ \boxed{\mathbf{p}_I = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}} $$

**Reflection:** This example was straightforward because only one rotation was applied. It demonstrates that a point initially along the body's X-axis (forward) will, after a 90-degree yaw (turn left), point along the inertial Y-axis (left).

### Example 2: Two Rotations (Yaw then Pitch)

**Problem:** A point has coordinates $\mathbf{p}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ in the body frame. The body frame undergoes a yaw of $\psi = 90^\circ$ followed by a pitch of $\theta = 90^\circ$ (and $\phi = 0^\circ$). Find the coordinates of the point in the inertial frame, $\mathbf{p}_I$.

**Given:**
*   Body frame vector: $\mathbf{p}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$
*   Euler angles: $\psi = 90^\circ$, $\theta = 90^\circ$, $\phi = 0^\circ$

**Want:** Inertial frame vector $\mathbf{p}_I$.

**Show every algebraic / logical step:**

1.  **Identify the individual rotation matrices for the given angles.**
    *   For $\psi = 90^\circ$:
        $c\psi = 0$, $s\psi = 1$
        $$ R_z(90^\circ) = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *This is the yaw rotation matrix.*
    *   For $\theta = 90^\circ$:
        $c\theta = 0$, $s\theta = 1$
        $$ R_y(90^\circ) = \begin{pmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0 \end{pmatrix} $$
        *This is the pitch rotation matrix.*
    *   For $\phi = 0^\circ$:
        $c\phi = 1$, $s\phi = 0$
        $$ R_x(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
        *This is the identity matrix for no roll.*

2.  **Calculate the combined rotation matrix $R_{IB}$.**
    *   For the 3-2-1 convention, $R_{IB} = R_z(\psi) R_y(\theta) R_x(\phi)$.
    *   Since $R_x(0^\circ)$ is the identity matrix, we have $R_{IB} = R_z(90^\circ) R_y(90^\circ)$.
    $$ R_{IB} = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0 \end{pmatrix} $$
    *Multiply the yaw matrix by the pitch matrix.*
    $$ R_{IB} = \begin{pmatrix} (0 \cdot 0) + (-1 \cdot 0) + (0 \cdot -1) & (0 \cdot 0) + (-1 \cdot 1) + (0 \cdot 0) & (0 \cdot 1) + (-1 \cdot 0) + (0 \cdot 0) \\ (1 \cdot 0) + (0 \cdot 0) + (0 \cdot -1) & (1 \cdot 0) + (0 \cdot 1) + (0 \cdot 0) & (1 \cdot 1) + (0 \cdot 0) + (0 \cdot 0) \\ (0 \cdot 0) + (0 \cdot 0) + (1 \cdot -1) & (0 \cdot 0) + (0 \cdot 1) + (1 \cdot 0) & (0 \cdot 1) + (0 \cdot 0) + (1 \cdot 0) \end{pmatrix} $$
    $$ R_{IB} = \begin{pmatrix} 0 & -1 & 0 \\ 0 & 0 & 1 \\ -1 & 0 & 0 \end{pmatrix} $$
    *This is the final combined rotation matrix.*

3.  **Transform the body frame vector to the inertial frame.**
    *   $\mathbf{p}_I = R_{IB} \mathbf{p}_B$
    $$ \mathbf{p}_I = \begin{pmatrix} 0 & -1 & 0 \\ 0 & 0 & 1 \\ -1 & 0 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} $$
    $$ \mathbf{p}_I = \begin{pmatrix} (0 \cdot 1) + (-1 \cdot 0) + (0 \cdot 0) \\ (0 \cdot 1) + (0 \cdot 0) + (1 \cdot 0) \\ (-1 \cdot 1) + (0 \cdot 0) + (0 \cdot 0) \end{pmatrix} $$
    $$ \mathbf{p}_I = \begin{pmatrix} 0 \\ 0 \\ -1 \end{pmatrix} $$
    *Multiplying the rotation matrix by the point vector gives the rotated coordinates.*

**Final Answer:**
$$ \boxed{\mathbf{p}_I = \begin{pmatrix} 0 \\ 0 \\ -1 \end{pmatrix}} $$

**Reflection:** After yawing 90 degrees (nose points along inertial Y), then pitching 90 degrees (nose points straight up relative to its current orientation), the original forward-pointing vector (body X-axis) now points along the inertial negative Z-axis (downwards). This shows the sequential nature of intrinsic rotations.

### Example 3: Full 3-2-1 Sequence

**Problem:** A point has coordinates $\mathbf{p}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ in the body frame. The body frame undergoes a yaw of $\psi = 45^\circ$, a pitch of $\theta = 30^\circ$, and a roll of $\phi = 60^\circ$. Find the coordinates of the point in the inertial frame, $\mathbf{p}_I$.

**Given:**
*   Body frame vector: $\mathbf{p}_B = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$
*   Euler angles: $\psi = 45^\circ$, $\theta = 30^\circ$, $\phi = 60^\circ$

**Want:** Inertial frame vector $\mathbf{p}_I$.

**Show every algebraic / logical step:**

1.  **Identify the individual rotation matrices for the given angles.**
    *   For $\psi = 45^\circ$:
        $c\psi = \cos(45^\circ) = \frac{\sqrt{2}}{2} \approx 0.7071$
        $s\psi = \sin(45^\circ) = \frac{\sqrt{2}}{2} \approx 0.7071$
        $$ R_z(45^\circ) = \begin{pmatrix} \frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} & 0 \\ \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   For $\theta = 30^\circ$:
        $c\theta = \cos(30^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660$
        $s\theta = \sin(30^\circ) = \frac{1}{2} = 0.5$
        $$ R_y(30^\circ) = \begin{pmatrix} \frac{\sqrt{3}}{2} & 0 & \frac{1}{2} \\ 0 & 1 & 0 \\ -\frac{1}{2} & 0 & \frac{\sqrt{3}}{2} \end{pmatrix} $$
    *   For $\phi = 60^\circ$:
        $c\phi = \cos(60^\circ) = \frac{1}{2} = 0.5$
        $s\phi = \sin(60^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660$
        $$ R_x(60^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ 0 & \frac{\sqrt{3}}{2} & \frac{1}{2} \end{pmatrix} $$

2.  **Calculate the combined rotation matrix $R_{IB} = R_z(\psi) R_y(\theta) R_x(\phi)$.**
    *   First, calculate $R_y(\theta) R_x(\phi)$:
        $$ R_y(30^\circ) R_x(60^\circ) = \begin{pmatrix} \frac{\sqrt{3}}{2} & 0 & \frac{1}{2} \\ 0 & 1 & 0 \\ -\frac{1}{2} & 0 & \frac{\sqrt{3}}{2} \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ 0 & \frac{\sqrt{3}}{2} & \frac{1}{2} \end{pmatrix} $$
        $$ = \begin{pmatrix} \frac{\sqrt{3}}{2} & \frac{1}{2} \frac{\sqrt{3}}{2} & \frac{1}{2} \frac{1}{2} \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ -\frac{1}{2} & \frac{\sqrt{3}}{2} \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{2} \frac{1}{2} \end{pmatrix} = \begin{pmatrix} \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{4} & \frac{1}{4} \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ -\frac{1}{2} & \frac{3}{4} & \frac{\sqrt{3}}{4} \end{pmatrix} $$
    *   Now, multiply $R_z(\psi)$ by this result:
        $$ R_{IB} = \begin{pmatrix} \frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} & 0 \\ \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{4} & \frac{1}{4} \\ 0 & \frac{1}{2} & -\frac{\sqrt{3}}{2} \\ -\frac{1}{2} & \frac{3}{4} & \frac{\sqrt{3}}{4} \end{pmatrix} $$
        $$ R_{IB} = \begin{pmatrix} \frac{\sqrt{2}}{2} \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} \frac{\sqrt{3}}{4} - \frac{\sqrt{2}}{2} \frac{1}{2} & \frac{\sqrt{2}}{2} \frac{1}{4} - \frac{\sqrt{2}}{2} (-\frac{\sqrt{3}}{2}) \\ \frac{\sqrt{2}}{2} \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} \frac{\sqrt{3}}{4} + \frac{\sqrt{2}}{2} \frac{1}{2} & \frac{\sqrt{2}}{2} \frac{1}{4} + \frac{\sqrt{2}}{2} (-\frac{\sqrt{3}}{2}) \\ -\frac{1}{2} & \frac{3}{4} & \frac{\sqrt{3}}{4} \end{pmatrix} $$
        $$ R_{IB} = \begin{pmatrix} \frac{\sqrt{6}}{4} & \frac{\sqrt{6}-\sqrt{2}}{8} & \frac{\sqrt{2}+\sqrt{6}}{8} \\ \frac{\sqrt{6}}{4} & \frac{\sqrt{6}+\sqrt{2}}{8} & \frac{\sqrt{2}-\sqrt{6}}{8} \\ -\frac{1}{2} & \frac{3}{4} & \frac{\sqrt{3}}{4} \end{pmatrix} $$
    *   Approximate values for clarity:
        $$ R_{IB} \approx \begin{pmatrix} 0.6124 & 0.1585 & 0.7709 \\ 0.6124 & 0.6124 & -0.3536 \\ -0.5 & 0.75 & 0.4330 \end{pmatrix} $$

3.  **Transform the body frame vector to the inertial frame.**
    *   $\mathbf{p}_I = R_{IB} \mathbf{p}_B$
    $$ \mathbf{p}_I = \begin{pmatrix} \frac{\sqrt{6}}{4} & \frac{\sqrt{6}-\sqrt{2}}{8} & \frac{\sqrt{2}+\sqrt{6}}{8} \\ \frac{\sqrt{6}}{4} & \frac{\sqrt{6}+\sqrt{2}}{8} & \frac{\sqrt{2}-\sqrt{6}}{8} \\ -\frac{1}{2} & \frac{3}{4} & \frac{\sqrt{3}}{4} \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} $$
    $$ \mathbf{p}_I = \begin{pmatrix} \frac{\sqrt{6}}{4} \\ \frac{\sqrt{6}}{4} \\ -\frac{1}{2} \end{pmatrix} $$
    *Since $\mathbf{p}_B$ is a unit vector along the X-axis, $\mathbf{p}_I$ is simply the first column of $R_{IB}$.*

**Final Answer:**
$$ \boxed{\mathbf{p}_I = \begin{pmatrix} \frac{\sqrt{6}}{4} \\ \frac{\sqrt{6}}{4} \\ -\frac{1}{2} \end{pmatrix} \approx \begin{pmatrix} 0.6124 \\ 0.6124 \\ -0.5 \end{pmatrix}} $$

**Reflection:** This example involved the full sequence of rotations, leading to a more complex combined matrix. The result shows how the initial forward vector is now pointing in a direction that has components along all three inertial axes. The primary difficulty here is the careful execution of matrix multiplication with trigonometric values.

### Example 4: Extracting Euler Angles from a Rotation Matrix

**Problem:** Given a rotation matrix $R_{IB}$ that transforms vectors from the body frame to the inertial frame, extract the Euler angles ($\phi, \theta, \psi$) for a 3-2-1 intrinsic rotation sequence.
$$ R_{IB} = \begin{pmatrix} 0.6124 & 0.1585 & 0.7709 \\ 0.6124 & 0.6124 & -0.3536 \\ -0.5 & 0.75 & 0.4330 \end{pmatrix} $$
(This is the approximate matrix from Example 3)

**Given:**
*   Combined rotation matrix: $R_{IB}$ (as above).

**Want:** Euler angles $\psi, \theta, \phi$.

**Show every algebraic / logical step:**

1.  **Recall the general form of the 3-2-1 rotation matrix.**
    $$ R_{IB} = \begin{pmatrix} c\psi c\theta & c\psi s\theta s\phi - s\psi c\phi & c\psi s\theta c\phi + s\psi s\phi \\ s\psi c\theta & s\psi s\theta s\phi + c\psi c\phi & s\psi s\theta c\phi - c\psi s\phi \\ -s\theta & c\theta s\phi & c\theta c\phi \end{pmatrix} $$
    *We need to match the elements of the given matrix to these trigonometric expressions.*

2.  **Extract the pitch angle $\theta$.**
    *   From the matrix, $R_{IB}(3,1) = -s\theta$.
    *   So, $-s\theta = -0.5 \implies s\theta = 0.5$.
    *   Therefore, $\theta = \arcsin(0.5)$. This gives $\theta = 30^\circ$ or $\theta = 150^\circ$.
    *   We also know $R_{IB}(3,2) = c\theta s\phi$ and $R_{IB}(3,3) = c\theta c\phi$.
    *   If $c\theta = 0$ (i.e., $\theta = \pm 90^\circ$), we would be in gimbal lock. In this case, $c\theta = \cos(30^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660 \neq 0$, so we are not in gimbal lock.
    *   To get a unique $\theta$, we consider the range of pitch. Typically, pitch is restricted to $(-\pi/2, \pi/2)$ or $(-90^\circ, 90^\circ)$ to avoid gimbal lock and for uniqueness. Given $s\theta = 0.5$, $\theta = 30^\circ$ is the principal value.

    $$ \theta = \arcsin(-R_{IB}(3,1)) = \arcsin(0.5) = 30^\circ $$
    *The element $R_{IB}(3,1)$ directly provides the sine of the pitch angle.*

3.  **Extract the yaw angle $\psi$.**
    *   We have $R_{IB}(1,1) = c\psi c\theta$ and $R_{IB}(2,1) = s\psi c\theta$.
    *   Since $c\theta \neq 0$, we can divide:
        $$ \frac{R_{IB}(2,1)}{R_{IB}(1,1)} = \frac{s\psi c\theta}{c\psi c\theta} = \tan\psi $$
    *   Using the given matrix elements and $\theta = 30^\circ$:
        $R_{IB}(1,1) = 0.6124$
        $R_{IB}(2,1) = 0.6124$
        $c\theta = \cos(30^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660$
        $c\psi = R_{IB}(1,1) / c\theta = 0.6124 / 0.8660 \approx 0.7071$
        $s\psi = R_{IB}(2,1) / c\theta = 0.6124 / 0.8660 \approx 0.7071$
    *   We use $\operatorname{atan2}(y, x)$ to get the angle in the correct quadrant.
        $$ \psi = \operatorname{atan2}(s\psi, c\psi) = \operatorname{atan2}(0.7071, 0.7071) = 45^\circ $$
    *The elements $R_{IB}(1,1)$ and $R_{IB}(2,1)$ (scaled by $c\theta$) provide the cosine and sine of the yaw angle, allowing us to use atan2 for a unique result.*

4.  **Extract the roll angle $\phi$.**
    *   We have $R_{IB}(3,2) = c\theta s\phi$ and $R_{IB}(3,3) = c\theta c\phi$.
    *   Since $c\theta \neq 0$, we can divide:
        $$ \frac{R_{IB}(3,2)}{R_{IB}(3,3)} = \frac{c\theta s\phi}{c\theta c\phi} = \tan\phi $$
    *   Using the given matrix elements and $\theta = 30^\circ$:
        $R_{IB}(3,2) = 0.75$
        $R_{IB}(3,3) = 0.4330$
        $c\theta = \cos(30^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660$
        $s\phi = R_{IB}(3,2) / c\theta = 0.75 / 0.8660 \approx 0.8660$
        $c\phi = R_{IB}(3,3) / c\theta = 0.4330 / 0.8660 \approx 0.5$
    *   Again, use $\operatorname{atan2}(y, x)$:
        $$ \phi = \operatorname{atan2}(s\phi, c\phi) = \operatorname{atan2}(0.8660, 0.5) = 60^\circ $$
    *The elements $R_{IB}(3,2)$ and $R_{IB}(3,3)$ (scaled by $c\theta$) provide the sine and cosine of the roll angle, used with atan2.*

**Final Answer:**
$$ \boxed{\psi = 45^\circ, \quad \theta = 30^\circ, \quad \phi = 60^\circ} $$

**Reflection:** This is the inverse problem, which is crucial for GNC systems to determine an object's current attitude from sensor data. The key is to carefully identify which elements of the rotation matrix correspond to which trigonometric functions of the Euler angles. The use of $\operatorname{atan2}(y, x)$ is critical to correctly determine the angle's quadrant and avoid ambiguity, particularly when dealing with angles outside of $(-\pi/2, \pi/2)$. The condition $c\theta \neq 0$ must always be checked to avoid division by zero, which signals gimbal lock.

## 6. Common mistakes and traps

1.  **Incorrect Rotation Order:** This is the most frequent mistake. Students often assume rotations can be applied in any order, but matrix multiplication is non-commutative ($AB \neq BA$). The 3-2-1 sequence (Yaw-Pitch-Roll) is specific.
2.  **Mixing Intrinsic and Extrinsic Rotations:** The 3-2-1 convention typically refers to *intrinsic* rotations (about the *new*, body-fixed axes after each rotation). Confusing this with *extrinsic* rotations (about the *fixed* inertial axes) will lead to incorrect matrix multiplication order ($R_{IB} = R_z R_y R_x$ for intrinsic 3-2-1 vs. $R_{IB} = R_x R_y R_z$ for extrinsic 3-2-1).
3.  **Sign Errors in Rotation Matrices:** The signs of $\sin$ terms in rotation matrices depend on the chosen axis and positive rotation direction (e.g., clockwise vs. counter-clockwise). Inconsistent use of the right-hand rule or copying matrices incorrectly can lead to flipped signs and wrong results.
4.  **Using `atan` instead of `atan2` for Angle Extraction:** `atan(y/x)` only provides an angle in $(-\pi/2, \pi/2)$, losing quadrant information. `atan2(y, x)` correctly determines the angle in $(-\pi, \pi]$ by considering the signs of both `y` and `x` components. This is critical for robust angle extraction.
5.  **Ignoring Gimbal Lock:** Not recognizing that Euler angles have singularities at $\pm 90^\circ$ pitch. This can lead to division by zero during angle extraction or unpredictable behavior in GNC systems trying to navigate through these singular orientations.
6.  **Inconsistent Coordinate System Conventions:** Different fields (aerospace, robotics, graphics) may use different conventions for axis directions (e.g., Z-up vs. Z-down) or positive rotation directions. Always explicitly state and stick to a consistent convention.

## 7. Textbook-precise explanation

The orientation of a rigid body in three-dimensional Euclidean space can be described by a rotation matrix $R$ that transforms coordinates from a body-fixed frame $\{B\}$ to an inertial (or world) frame $\{I\}$. Let the inertial frame be denoted by $\{X_I, Y_I, Z_I\}$ and the body frame by $\{X_B, Y_B, Z_B\}$.

Euler angles represent a sequence of three successive rotations that align the body frame with the inertial frame. For the 3-2-1 (Yaw-Pitch-Roll) convention, these are *intrinsic* rotations, meaning each subsequent rotation occurs about an axis of the *intermediate* coordinate system.

The sequence of rotations is as follows:
1.  **Yaw ($\psi$):** A rotation about the $Z_I$ axis (the initial inertial Z-axis) by an angle $\psi$. This transforms the inertial frame $\{I\}$ to an intermediate frame $\{I_1\}$. The rotation matrix for this step is $R_z(\psi)$.
    $$ R_z(\psi) = \begin{pmatrix} \cos\psi & -\sin\psi & 0 \\ \sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
2.  **Pitch ($\theta$):** A rotation about the $Y_{I_1}$ axis (the Y-axis of the first intermediate frame) by an angle $\theta$. This transforms $\{I_1\}$ to a second intermediate frame $\{I_2\}$. The rotation matrix for this step is $R_y(\theta)$.
    $$ R_y(\theta) = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix} $$
3.  **Roll ($\phi$):** A rotation about the $X_{I_2}$ axis (the X-axis of the second intermediate frame) by an angle $\phi$. This transforms $\{I_2\}$ to the final body frame $\{B\}$. The rotation matrix for this step is $R_x(\phi)$.
    $$ R_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & -\sin\phi \\ 0 & \sin\phi & \cos\phi \end{pmatrix} $$

The overall rotation matrix $R_{IB}$ that transforms a vector $\mathbf{v}_B$ expressed in the body frame to a vector $\mathbf{v}_I$ in the inertial frame ($\mathbf{v}_I = R_{IB} \mathbf{v}_B$) is obtained by multiplying these individual rotation matrices in the reverse order of their application:
$$ R_{IB}(\phi, \theta, \psi) = R_z(\psi) R_y(\theta) R_x(\phi) $$
Performing the matrix multiplication yields:
$$ R_{IB} = \begin{pmatrix} c\psi & -s\psi & 0 \\ s\psi & c\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} c\theta & 0 & s\theta \\ 0 & 1 & 0 \\ -s\theta & 0 & c\theta \end{pmatrix} \begin{pmatrix} 1 & 0 & 0 \\ 0 & c\phi & -s\phi \\ 0 & s\phi & c\phi \end{pmatrix} $$
$$ R_{IB} = \begin{pmatrix} c\psi c\theta & c\psi s\theta s\phi - s\psi c\phi & c\psi s\theta c\phi + s\psi s\phi \\ s\psi c\theta & s\psi s\theta s\phi + c\psi c\phi & s\psi s\theta c\phi - c\psi s\phi \\ -s\theta & c\theta s\phi & c\theta c\phi \end{pmatrix} $$
where $c(\cdot) = \cos(\cdot)$ and $s(\cdot) = \sin(\cdot)$.

**Extraction of Euler Angles:**
Given a rotation matrix $R_{IB}$, the Euler angles can be extracted as follows:
1.  **Pitch ($\theta$):**
    From $R_{IB}(3,1) = -s\theta$, we get $\theta = \arcsin(-R_{IB}(3,1))$.
    To ensure uniqueness and avoid gimbal lock, $\theta$ is typically restricted to the range $(-\pi/2, \pi/2)$.
2.  **Yaw ($\psi$):**
    If $\cos\theta \neq 0$ (i.e., not in gimbal lock), then:
    $c\psi = R_{IB}(1,1) / c\theta$
    $s\psi = R_{IB}(2,1) / c\theta$
    $\psi = \operatorname{atan2}(R_{IB}(2,1), R_{IB}(1,1))$ (if $c\theta$ is positive) or $\psi = \operatorname{atan2}(-R_{IB}(2,1), -R_{IB}(1,1))$ (if $c\theta$ is negative). More robustly: $\psi = \operatorname{atan2}(R_{IB}(2,1)/c\theta, R_{IB}(1,1)/c\theta)$.
3.  **Roll ($\phi$):**
    If $\cos\theta \neq 0$:
    $c\phi = R_{IB}(3,3) / c\theta$
    $s\phi = R_{IB}(3,2) / c\theta$
    $\phi = \operatorname{atan2}(R_{IB}(3,2), R_{IB}(3,3))$.

**Gimbal Lock:**
A singularity occurs when $\theta = \pm \pi/2$ (i.e., $\cos\theta = 0$). In this case, the first and third rotation axes become collinear, leading to a loss of a degree of freedom. For $\theta = \pi/2$:
$$ R_{IB}(\phi, \pi/2, \psi) = \begin{pmatrix} c\psi \cdot 0 & c\psi \cdot 1 \cdot s\phi - s\psi c\phi & c\psi \cdot 1 \cdot c\phi + s\psi s\phi \\ s\psi \cdot 0 & s\psi \cdot 1 \cdot s\phi + c\psi c\phi & s\psi \cdot 1 \cdot c\phi - c\psi s\phi \\ -1 & 0 & 0 \end{pmatrix} $$
$$ R_{IB}(\phi, \pi/2, \psi) = \begin{pmatrix} 0 & -(s\psi c\phi - c\psi s\phi) & (c\psi c\phi + s\psi s\phi) \\ 0 & (s\psi s\phi + c\psi c\phi) & -(c\psi s\phi - s\psi c\phi) \\ -1 & 0 & 0 \end{pmatrix} $$
Using sum and difference identities:
$$ R_{IB}(\phi, \pi/2, \psi) = \begin{pmatrix} 0 & -\sin(\psi-\phi) & \cos(\psi-\phi) \\ 0 & \cos(\psi-\phi) & \sin(\psi-\phi) \\ -1 & 0 & 0 \end{pmatrix} $$
Here, only the combination $(\psi-\phi)$ can