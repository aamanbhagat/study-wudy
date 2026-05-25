## What it is
Euler angles are a set of three angles used to describe the orientation of a rigid body (like an aircraft or spacecraft) relative to a fixed reference frame. For aerospace, these angles are typically **roll ($\phi$)**, **pitch ($\theta$)**, and **yaw ($\psi$)**, representing rotations about the body's own axes. The 3-2-1 convention specifies the exact sequence of these rotations: first yaw, then pitch, then roll.

## Why it matters
This is the fundamental language for describing attitude in GNC. Your flight controller needs to know the vehicle's orientation to issue correct thruster firings or control surface deflections. This concept is also critical in robotics for manipulator arm orientation, in computer graphics for object rendering, and in physics for describing the motion of rigid bodies.

## When to study it
You must have a solid grasp of linear algebra, specifically:
*   3D vectors and coordinate systems (right-hand rule).
*   Matrix multiplication.
*   The definition and properties of orthogonal matrices.
*   Single-axis rotation matrices ($R_x, R_y, R_z$).

If you cannot derive the matrix for a simple rotation about the z-axis from memory, review that first.

## How to study it (step by step)
1.  **Master the building blocks.** Write down the three elementary rotation matrices for a positive (counter-clockwise) rotation about the x, y, and z axes from first principles. Do not just copy them. Verify you understand where every cosine, sine, and negative sign comes from using trigonometry on a unit circle.
2.  **Visualize the sequence.** Take a physical object (a book or your phone). Define its body axes: x-axis forward, y-axis right, z-axis down. Define a fixed "inertial" frame on your desk. Perform the 3-2-1 sequence physically:
    *   **3 (Yaw):** Rotate the object around its *own* z-axis (down).
    *   **2 (Pitch):** Rotate it around its *new* y-axis (right).
    *   **1 (Roll):** Rotate it around its *newest* x-axis (forward).
    Notice how the axes of rotation move with the object. This is called an *intrinsic* rotation sequence.
3.  **Derive the composite matrix.** We want the matrix $R$ that transforms the coordinates of a vector from the body frame to the inertial frame. Let a vector be $v_b$ in the body frame. We trace its coordinates back to the inertial frame, $v_i$.
    *   The last rotation was roll ($\phi$) about the x-axis. To undo this, we transform back using $R_x(\phi)$. The vector in the pre-roll frame is $v_2 = R_x(\phi) v_b$.
    *   The second rotation was pitch ($\theta$) about the y-axis. To undo this, we use $R_y(\theta)$. The vector in the pre-pitch frame is $v_1 = R_y(\theta) v_2$.
    *   The first rotation was yaw ($\psi$) about the z-axis. To undo this, we use $R_z(\psi)$. The vector in the original inertial frame is $v_i = R_z(\psi) v_1$.
    *   Substitute backwards: $v_i = R_z(\psi) (R_y(\theta) v_2) = R_z(\psi) R_y(\theta) (R_x(\phi) v_b)$.
    *   Therefore, the full rotation matrix is $R = R_z(\psi) R_y(\theta) R_x(\phi)$. The matrices are applied from right to left.
4.  **Compute the full matrix product.** Multiply out the three elementary matrices $R_z(\psi) R_y(\theta) R_x(\phi)$ algebraically. This is tedious but necessary. The result is the general Direction Cosine Matrix (DCM) for the 3-2-1 sequence. Keep it for reference.
5.  **Solve the inverse problem.** Look at the general DCM you just derived. Figure out how to extract $\psi, \theta, \phi$ if you are given the nine numbers in the matrix. Hint: one of the elements will be just $-\sin(\theta)$. Once you have $\theta$, you can find the others using atan2 functions on other elements.

## Key ideas, with intuition
1.  **Orientation, not Position.** Euler angles tell you which way an object is pointing, not where it is in space. Position is a vector $(x, y, z)$; orientation is a set of angles $(\phi, \theta, \psi)$.
2.  **Sequence is everything.** 3D rotations are not commutative. A yaw-then-pitch rotation results in a different final orientation than a pitch-then-yaw rotation. The 3-2-1 convention (Yaw, Pitch, Roll) is a specific, agreed-upon sequence that removes ambiguity.
3.  **Intrinsic Rotations (Tait-Bryan angles).** The 3-2-1 aerospace convention uses *intrinsic* rotations, meaning each rotation is performed about the axes of the *moving* body frame, not the fixed inertial frame. This is intuitive for a pilot: you roll about the axis pointing out the nose of your plane, not about a fixed north-pointing axis.
4.  **Matrix multiplication order is reverse of rotation order.** To find the total rotation matrix, you multiply the elementary matrices in the reverse order of the physical rotations you perform. As derived above, for a 3-2-1 (Yaw-Pitch-Roll) sequence, the matrix is $R_z R_y R_x$. This is a direct consequence of how function composition and coordinate transformations work.

## Worked example
**Problem:** A satellite is oriented with a yaw of $\psi = 90^\circ$ ($\pi/2$ rad) and a pitch of $\theta = -30^\circ$ ($-\pi/6$ rad), with zero roll ($\phi = 0^\circ$). An antenna on the satellite points along its body x-axis, represented by the vector $v_b = [1, 0, 0]^T$. What is the direction of the antenna in the inertial reference frame?

**Solution:**

1.  **Identify the goal.** We need to find the vector in the inertial frame, $v_i$, given the vector in the body frame, $v_b$. The transformation is $v_i = R_{b \to i} v_b$.

2.  **Formulate the rotation matrix.** The convention is 3-2-1, so the matrix is $R = R_z(\psi) R_y(\theta) R_x(\phi)$.

3.  **Write the individual matrices with the given angles.**
    *   $\psi = 90^\circ, \cos(90^\circ)=0, \sin(90^\circ)=1$
    $$ R_z(90^\circ) = \begin{pmatrix} \cos(90) & -\sin(90) & 0 \\ \sin(90) & \cos(90) & 0 \\ 0 & 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   $\theta = -30^\circ, \cos(-30)=\sqrt{3}/2, \sin(-30)=-1/2$
    $$ R_y(-30^\circ) = \begin{pmatrix} \cos(-30) & 0 & \sin(-30) \\ 0 & 1 & 0 \\ -\sin(-30) & 0 & \cos(-30) \end{pmatrix} = \begin{pmatrix} \sqrt{3}/2 & 0 & -1/2 \\ 0 & 1 & 0 \\ 1/2 & 0 & \sqrt{3}/2 \end{pmatrix} $$
    *   $\phi = 0^\circ$
    $$ R_x(0^\circ) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} = I $$

4.  **Calculate the composite matrix $R = R_z R_y R_x$.**
    $$ R = \left( \begin{pmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} \sqrt{3}/2 & 0 & -1/2 \\ 0 & 1 & 0 \\ 1/2 & 0 & \sqrt{3}/2 \end{pmatrix} \right) I $$
    $$ R = \begin{pmatrix} (0)(\sqrt{3}/2)+(-1)(0)+(0)(1/2) & (0)(0)+(-1)(1)+(0)(0) & (0)(-1/2)+(-1)(0)+(0)(\sqrt{3}/2) \\ (1)(\sqrt{3}/2)+(0)(0)+(0)(1/2) & (1)(0)+(0)(1)+(0)(0) & (1)(-1/2)+(0)(0)+(0)(\sqrt{3}/2) \\ (0)(\sqrt{3}/2)+(0)(0)+(1)(1/2) & (0)(0)+(0)(1)+(1)(0) & (0)(-1/2)+(0)(0)+(1)(\sqrt{3}/2) \end{pmatrix} $$
    $$ R = \begin{pmatrix} 0 & -1 & 0 \\ \sqrt{3}/2 & 0 & -1/2 \\ 1/2 & 0 & \sqrt{3}/2 \end{pmatrix} $$

5.  **Transform the vector.**
    $$ v_i = R v_b = \begin{pmatrix} 0 & -1 & 0 \\ \sqrt{3}/2 & 0 & -1/2 \\ 1/2 & 0 & \sqrt{3}/2 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ \sqrt{3}/2 \\ 1/2 \end{pmatrix} $$

**Reflection:** Each step was a direct application of the core ideas. We identified the correct composite matrix formula ($R_z R_y R_x$), substituted the specific angles into the elementary matrices, performed the matrix multiplication in the correct (reverse) order, and finally applied the resulting operator to our vector. The physical interpretation is that the satellite yawed right, then pitched down, so its nose (the x-axis) now points partly forward-and-right in the inertial frame ($\sqrt{3}/2$ in the Y direction) and partly down ($1/2$ in the Z direction).

## Diagrams
Here is a representation of the standard aerospace body and inertial frames.

```text
      Inertial Frame (e.g., North-East-Down)
              
              Z_i (Down)
             /
            /
           o ----------- Y_i (East)
           |
           |
           X_i (North)


      Body Frame (fixed to the vehicle)
              
              z_b (Yaw axis, points down fuselage)
             /
            /
           o ----------- y_b (Pitch axis, points right wing)
           |
           |
           x_b (Roll axis, points out nose)
```
To visualize the 3-2-1 sequence:
1.  Align the Body Frame with the Inertial Frame.
2.  Rotate the Body Frame by $\psi$ around $Z_i$. The body's $x_b$ and $y_b$ axes swing around in the North-East plane.
3.  Rotate the Body Frame by $\theta$ around its *new* $y_b$ axis. The nose ($x_b$) pitches up or down.
4.  Rotate the Body Frame by $\phi$ around its *newest* $x_b$ axis. The wings ($y_b$) roll.

## Memory technique — remember this forever
1.  **Mnemonic:** "You Better Roll" -> **Y**aw, **P**itch, **R**oll. This gives the sequence of physical rotations. The axis numbers are 3 (Z), 2 (Y), 1 (X). So it's a **3-2-1** sequence.
2.  **Formulas to overlearn:**
    *   The elementary rotation matrices. For $R_z(\psi)$, remember it only affects x and y. For $R_x(\phi)$, only y and z. For $R_y(\theta)$, it affects x and z, and the sign on the sine is "weird" (top right is positive, bottom left is negative).
        $$ R_x(\phi) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & -\sin\phi \\ 0 & \sin\phi & \cos\phi \end{pmatrix} \quad R_y(\theta) = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix} \quad R_z(\psi) = \begin{pmatrix} \cos\psi & -\sin\psi & 0 \\ \sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{pmatrix} $$
    *   The 3-2-1 composite matrix order:
        $$ R_{body \to inertial} = R_z(\psi) R_y(\theta) R_x(\phi) $$
3.  **Spaced Repetition:** Review this material and re-derive the composite matrix from scratch at **1 day, 3 days, 7 days, 16 days, 35 days**.
4.  **First Principles Pathway:** If you forget the composite matrix formula, don't panic. Redraw the coordinate frames. Define a vector $v_b$ in the final body frame. To express it in the inertial frame, you must "undo" the rotations one by one, from last to first. The last rotation was roll ($R_x$), so the first matrix to apply to $v_b$ is $R_x(\phi)$. The second-to-last was pitch ($R_y$), so the next is $R_y(\theta)$. The first rotation was yaw ($R_z$), so the last matrix to apply is $R_z(\psi)$. This gives $v_i = R_z(R_y(R_x v_b))$, which rebuilds the formula $R = R_z R_y R_x$.

## Common mistakes
*   **Matrix Order:** Calculating $R_x R_y R_z$ instead of $R_z R_y R_x$. This corresponds to a different rotation sequence (1-2-3 Roll-Pitch-Yaw) and gives a completely different final orientation.
*   **Angle Signs:** Using a positive angle for a clockwise rotation. By convention, positive angles are counter-clockwise when looking from the positive end of an axis towards the origin. A pitch *up* is a negative rotation about the y-axis (right wing).
*   **Gimbal Lock:** Assuming Euler angles always work perfectly. When pitch angle $\theta$ is $\pm 90^\circ$, the yaw and roll axes align, creating a mathematical singularity and a loss of one degree of rotational freedom. We will cover this later with Quaternions.
*   **Frame Confusion:** Applying the matrix backwards. The matrix $R = R_z R_y R_x$ transforms a vector *from* the body frame *to* the inertial frame. To go the other way (inertial to body), you must use the inverse, which is the transpose for rotation matrices: $R^T$.

## Self-check
1.  An aircraft is in straight and level flight, then performs a pure roll to the right by $25^\circ$. Write down the 3-2-1 rotation matrix describing its new attitude.
2.  A space probe has an attitude of $(\phi, \theta, \psi) = (0^\circ, -90^\circ, 45^\circ)$. A thruster fires, producing a force purely along the body y-axis, $F_b = [0, 10, 0]^T$ N. What is the force vector $F_i$ in the inertial frame? What does the result tell you about gimbal lock?
3.  You are given the following Direction Cosine Matrix:
    $$ R = \begin{pmatrix} 1/\sqrt{2} & -1/2 & 1/2 \\ 1/\sqrt{2} & 1/2 & -1/2 \\ 0 & 1/\sqrt{2} & 1/\sqrt{2} \end{pmatrix} $$
    Extract the 3-2-1 Euler angles $(\phi, \theta, \psi)$ that produced this orientation.