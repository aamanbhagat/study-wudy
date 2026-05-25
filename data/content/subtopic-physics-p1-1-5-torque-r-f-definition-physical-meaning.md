## What it is
Torque is the rotational equivalent of force. While a force causes an object to accelerate linearly, a torque causes an object to acquire an angular acceleration—it makes it spin, twist, or rotate. It is a vector quantity defined by the cross product of the position vector $\vec{r}$ (from the pivot to the point of force application) and the applied force vector $\vec{F}$.

## Why it matters
Torque is fundamental to controlling any rotating system. In aerospace, reaction wheels and control moment gyroscopes generate precise torques to change a satellite's orientation (attitude control) without using propellant. In robotics, the torque produced by motors in a robotic arm's joints determines its lifting capacity and precision. Understanding torque is the gateway to understanding angular momentum, a conservation law as fundamental as the conservation of energy and linear momentum.

## When to study it
You must be comfortable with vector algebra, specifically the definition and computation of the **vector cross product**. You should also have a solid grasp of Newton's second law for linear motion ($ \vec{F}_{net} = m\vec{a} $) as torque is the rotational analogue ($ \vec{\tau}_{net} = I\vec{\alpha} $). If you cannot confidently calculate $\vec{a} \times \vec{b}$ for two 3D vectors, review that topic first.

## How to study it (step by step)
1.  **Revisit the Cross Product:** Spend 15 minutes reviewing the geometric definition ($|\vec{a} \times \vec{b}| = ab\sin\theta$) and the algebraic calculation (using the determinant of a 3x3 matrix) of the cross product. Pay special attention to the **right-hand rule** for determining the direction of the resultant vector.
2.  **Draw the canonical example:** Get a piece of paper. Draw a single point for a pivot (like a bolt). Draw a vector $\vec{r}$ originating from the pivot. At the tip of $\vec{r}$, draw a force vector $\vec{F}$ at some angle $\theta$ to $\vec{r}$. This is the physical situation torque describes.
3.  **Build intuition with extremes:** Using your drawing, consider what happens when $\theta = 0^{\circ}$ (pushing along the lever) and $\theta = 180^{\circ}$ (pulling along the lever). The sine term goes to zero. Does this cause rotation? No. Now consider $\theta = 90^{\circ}$ (pushing perpendicular to the lever). The sine term is 1 (maximum). Does this cause the most effective rotation? Yes.
4.  **Practice the Right-Hand Rule:** Place the fingers of your right hand in the direction of $\vec{r}$. Curl them towards the direction of $\vec{F}$. Your thumb points in the direction of the torque vector $\vec{\tau}$. For a standard counter-clockwise rotation in the xy-plane, your thumb should point out of the page (the +z direction).
5.  **Derive the two scalar forms:** Start from $\tau = |\vec{r} \times \vec{F}| = rF\sin\theta$. Group the terms in two different ways: $\tau = F(r\sin\theta)$ and $\tau = r(F\sin\theta)$. Identify $(r\sin\theta)$ as the "perpendicular lever arm" $r_{\perp}$, and $(F\sin\theta)$ as the "perpendicular force component" $F_{\perp}$. Realize they give the same result.
6.  **Solve a simple 2D problem:** A 1-meter-long seesaw is pivoted at its center. A 50 N force pushes down on the right end. Calculate the magnitude and direction of the torque. (Magnitude: $\tau = rF\sin\theta = (0.5 \text{ m})(50 \text{ N})\sin(90^{\circ}) = 25 \text{ N} \cdot \text{m}$. Direction: by right-hand rule, into the page, or "clockwise").

## Key ideas, with intuition
1.  **Torque is Force at a Distance:** Torque requires both a force and a lever arm. A force applied directly at the pivot point ($\vec{r}=0$) produces no torque. The further away you apply the force, the more effective it is at causing rotation. This is why doorknobs are on the opposite side of the door from the hinges.
    $$ \vec{\tau} = \vec{r} \times \vec{F} $$
2.  **Only the Perpendicular Component Matters:** A force can be broken into components parallel and perpendicular to the lever arm. The parallel component just pushes or pulls on the pivot—it doesn't cause rotation. Only the component of the force perpendicular to the lever arm creates torque. This is the reason for the $\sin\theta$ in the magnitude calculation.
    $$ \tau = r (F \sin\theta) = r F_{\perp} $$
    Alternatively, you can think of it as the full force acting on the "effective" lever arm, which is the perpendicular distance from the pivot to the line of action of the force.
    $$ \tau = F (r \sin\theta) = F r_{\perp} $$
3.  **Torque is a Vector Pointing Along the Axis of Rotation:** The direction of the torque vector is crucial. It tells you the axis about which the object will begin to rotate. For a door swinging in the horizontal plane, the torque vector points vertically along the axis of the hinges. The right-hand rule is not a mathematical trick; it defines the conventional direction for the axis of rotation. A positive torque in the z-direction corresponds to a counter-clockwise rotation in the xy-plane.

## Worked example
**Problem:** A force $\vec{F} = (10\hat{i} + 20\hat{j} + 0\hat{k})$ Newtons is applied to an object at a position $\vec{r} = (3\hat{i} + 1\hat{j} + 0\hat{k})$ meters relative to a pivot at the origin. Calculate the torque vector $\vec{\tau}$.

**Solution:**
1.  **Identify the definition:** The torque is defined by the cross product $\vec{\tau} = \vec{r} \times \vec{F}$.
2.  **Set up the determinant:** We compute the cross product using the determinant of a 3x3 matrix.
    $$
    \vec{\tau} = \vec{r} \times \vec{F} =
    \begin{vmatrix}
    \hat{i} & \hat{j} & \hat{k} \\
    r_x & r_y & r_z \\
    F_x & F_y & F_z
    \end{vmatrix}
    =
    \begin{vmatrix}
    \hat{i} & \hat{j} & \hat{k} \\
    3 & 1 & 0 \\
    10 & 20 & 0
    \end{vmatrix}
    $$
3.  **Calculate the components:** We expand the determinant.
    *   $\hat{i}$ component: $(r_y F_z - r_z F_y) = (1)(0) - (0)(20) = 0$
    *   $\hat{j}$ component: $(r_z F_x - r_x F_z) = (0)(10) - (3)(0) = 0$
    *   $\hat{k}$ component: $(r_x F_y - r_y F_x) = (3)(20) - (1)(10) = 60 - 10 = 50$
4.  **Assemble the final vector:**
    $$ \vec{\tau} = 0\hat{i} + 0\hat{j} + 50\hat{k} = (50\hat{k}) \text{ N} \cdot \text{m} $$

**Reflection:**
*   The setup in step 1 was the direct application of the definition.
*   Step 2 used the standard computational method for the cross product, which is essential to have memorized.
*   Step 3 executed the computation systematically, component by component, reducing the chance of error.
*   The final result in step 4 makes physical sense. The position and force vectors are both in the xy-plane. The resulting rotation should be about the z-axis (perpendicular to the xy-plane), so it is logical that the torque vector only has a $\hat{k}$ component.

## Diagrams
A top-down view of a wrench turning a bolt. The pivot is at the origin O.

```text
      y
      |
      |     /
      |    /
      |   / F   (Force vector)
      |  /
      | / theta
      |/_______________ P (Point of application)
      O----------------->-- r (Position vector)
      |                 x
      |
```
The diagram shows the pivot `O`, the position vector `r` from `O` to the point of force application `P`, and the force vector `F` applied at `P`. The angle `theta` is the angle between `r` and `F`. The torque vector `τ` would point out of the screen (in the +z direction) for this counter-clockwise twist, according to the right-hand rule.

## Memory technique — remember this forever
1.  **Visual Hook:** Think of opening a very heavy, ancient castle door.
    *   **Lever Arm `r`**: You grab the handle, which is as far from the hinges (the pivot) as possible. You need a large `r`.
    *   **Force `F`**: You push hard. You need a large `F`.
    *   **Angle `sin(θ)`**: You push perpendicular to the door's surface ($\theta=90^\circ, \sin\theta=1$), not into its edge ($\theta=0^\circ, \sin\theta=0$).
    The "twisting effort" you feel is the torque. The axis of that twist is the line of the hinges, which is the direction of the $\vec{\tau}$ vector.

2.  **Must Overlearn:**
    *   The definition: $\vec{\tau} = \vec{r} \times \vec{F}$
    *   The magnitude: $\tau = rF\sin\theta$

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the formulas at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days**. Set calendar reminders.

4.  **First Principles Pathway:** If you forget everything, rebuild it from intuition.
    *   Torque is a twist. A twist depends on three things: how hard you push ($F$), where you push ($r$), and the angle you push at ($\theta$).
    *   The most effective push is perpendicular ($\theta=90^\circ$). The least effective is parallel ($\theta=0^\circ$). The function that is 1 at $90^\circ$ and 0 at $0^\circ$ is $\sin\theta$.
    *   So, the magnitude must be proportional to $r$, $F$, and $\sin\theta$. Thus, $\tau = rF\sin\theta$.
    *   The rotation happens around an axis perpendicular to both the lever arm and the force. The mathematical operation that takes two vectors and produces a third vector perpendicular to both, with a magnitude of $rF\sin\theta$, is the cross product. Therefore, $\vec{\tau} = \vec{r} \times \vec{F}$.

## Common mistakes
1.  **Using distance instead of the position vector.** $\vec{r}$ is a vector that points *from* the pivot *to* the point where the force is applied. Getting its origin or direction wrong will ruin the calculation.
2.  **Calculating the angle $\theta$ incorrectly.** $\theta$ is the angle between $\vec{r}$ and $\vec{F}$ when they are placed tail-to-tail. Students often use an angle relative to an axis instead.
3.  **Mixing up $\vec{r} \times \vec{F}$ and $\vec{F} \times \vec{r}$.** The cross product is anti-commutative: $\vec{r} \times \vec{F} = -(\vec{F} \times \vec{r})$. Swapping the order will flip the sign of your torque, corresponding to a rotation in the opposite direction.
4.  **Forgetting torque is a vector in 3D.** In simple 2D problems, we often just say "clockwise" or "counter-clockwise". This is a shortcut. Formally, torque is always a vector whose direction defines the axis of rotation, even in 2D (e.g., pointing into or out of the page).

## Self-check
1.  A force of 20 N is applied perpendicularly to the end of a door that is 0.8 m wide. What is the magnitude of the torque relative to the hinge?
2.  A force given by the vector $\vec{F} = (0, -10, 0)$ N is applied at the point $\vec{r} = (2, 0, 0)$ m. What is the torque vector $\vec{\tau}$ about the origin?
3.  Consider a particle at position $\vec{r} = (4\hat{j})$ m. Which of the following forces, when applied to the particle, will produce the largest torque about the origin? Which will produce zero torque?
    *   a) $\vec{F}_1 = (10\hat{i})$ N
    *   b) $\vec{F}_2 = (10\hat{j})$ N
    *   c) $\vec{F}_3 = (10\hat{k})$ N
    *   d) $\vec{F}_4 = (6\hat{i} + 8\hat{j})$ N