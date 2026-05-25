## What it is
The quaternion rotation formula is a mathematical operation that rotates a three-dimensional vector $\vec{v}$ to a new orientation $\vec{v}'$ using a quaternion $q$. The rotation is performed by representing the vector as a "pure" quaternion $p$ and applying the formula $p' = qpq^{-1}$, a process called conjugation.

## Why it matters
This formula is the computational heart of modern Guidance, Navigation, and Control (GNC) systems for spacecraft, drones, and missiles. It avoids the gimbal lock problem inherent in Euler angles and is more computationally efficient and numerically stable than rotation matrices for composing successive rotations. You will see it everywhere in attitude determination, flight simulation, and robotics.

## When to study it
Before tackling this, you must be fluent with the following:
*   **Vector Algebra:** Dot and cross products in $\mathbb{R}^3$.
*   **Complex Numbers:** The concept of a conjugate and the identity $i^2 = -1$.
*   **Quaternion Basics:** The definition of a quaternion $q = w + xi + yj + zk$, the multiplication rules ($i^2=j^2=k^2=ijk=-1$), and how to compute the conjugate ($q^*$), norm ($||q||$), and inverse ($q^{-1} = q^*/||q||^2$).

If you are not solid on these, master them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Embed the Vector:** Take a standard 3D vector like $\vec{v} = (1, 0, 0)$ and practice writing it as a pure quaternion $p = 0 + 1i + 0j + 0k$. Do this for several vectors until it's automatic. This is the "entry ticket" to the quaternion world.
2.  **Construct a Rotation Quaternion:** Choose a simple rotation, like "90 degrees around the y-axis". Practice building the corresponding unit quaternion $q = \cos(\theta/2) + \sin(\theta/2)\hat{u}$. For this example, $\theta = 90^\circ$ and $\hat{u} = (0, 1, 0) = j$. You should get $q = \cos(45^\circ) + \sin(45^\circ)j = \frac{1}{\sqrt{2}}(1+j)$.
3.  **Calculate the Inverse:** For the unit quaternion you just built, find its inverse $q^{-1}$. Remember that for a unit quaternion, the inverse is simply its conjugate: $q^{-1} = q^*$. In the example, $q^{-1} = \frac{1}{\sqrt{2}}(1-j)$.
4.  **Perform the "Sandwich" Multiplication:** With your pure quaternion $p$ from step 1 and your rotation quaternion $q$ and its inverse $q^{-1}$ from steps 2-3, carefully compute $p' = qpq^{-1}$. Pay close attention to the non-commutative multiplication rules (e.g., $ij=k$ but $ji=-k$).
5.  **Extract the Result Vector:** The result $p'$ should be another pure quaternion (its scalar part will be zero). Extract the vector part of $p'$ to get your rotated vector $\vec{v}'$. Verify that the result matches your geometric intuition for the rotation.
6.  **Repeat:** Repeat steps 1-5 with a different rotation, like $180^\circ$ around the x-axis, until the entire process feels mechanical.

## Key ideas, with intuition
1.  **Vectors Live in the "Pure" Subspace:** A 3D vector $\vec{v} = (v_x, v_y, v_z)$ is not a quaternion. We create a special type of quaternion, a *pure quaternion*, to represent it. This is a quaternion with a zero scalar part:
    $$p = 0 + v_x i + v_y j + v_z k$$
    Think of this as placing our familiar 3D world into a larger 4D space where rotations are simpler to describe.

2.  **Rotation is a "Sandwich" Conjugation:** The rotation is not just $qp$. That would produce a general quaternion, knocking our vector out of the "pure" subspace. The magic is the sandwich product:
    $$p' = q p q^{-1}$$
    This operation, called conjugation, is special. It's a fundamental way to transform objects in an algebra while preserving their essential structure. In this case, it guarantees that if $p$ is a pure quaternion, $p'$ will be too. It rotates the vector part of $p$ while ensuring the scalar part remains zero.

3.  **The Half-Angle is a Feature, Not a Bug:** The quaternion that represents a rotation by an angle $\theta$ around a unit-vector axis $\hat{u}$ is:
    $$q = \cos(\theta/2) + \sin(\theta/2)\hat{u}$$
    Where $\hat{u}$ is shorthand for $u_x i + u_y j + u_z k$. The $\theta/2$ seems strange. An intuitive way to think about it is that the full rotation is a two-step process in 4D: the premultiplication by $q$ contributes "half" the rotation, and the post-multiplication by $q^{-1}$ contributes the other "half", projecting the result back into our 3D subspace.

## Worked example
**Problem:** Rotate the vector $\vec{v} = (0, 5, 0)$ by an angle of $\theta = 60^\circ$ around the x-axis.

**Step 1: Define the vector as a pure quaternion.**
The vector is $\vec{v} = (0, 5, 0)$. As a pure quaternion, this is $p = 0 + 0i + 5j + 0k = 5j$.

**Step 2: Define the rotation quaternion.**
The rotation is by $\theta = 60^\circ$ around the axis $\hat{u} = (1, 0, 0)$, which corresponds to the quaternion basis vector $i$. We use the half-angle, $\theta/2 = 30^\circ$.
$$q = \cos(30^\circ) + \sin(30^\circ)i = \frac{\sqrt{3}}{2} + \frac{1}{2}i$$

**Step 3: Find the inverse of the rotation quaternion.**
Since $q$ is a unit quaternion, its inverse is its conjugate:
$$q^{-1} = q^* = \frac{\sqrt{3}}{2} - \frac{1}{2}i$$

**Step 4: Compute the sandwich product $p' = qpq^{-1}$.**
Substitute the quaternions into the formula:
$$p' = \left(\frac{\sqrt{3}}{2} + \frac{1}{2}i\right) (5j) \left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right)$$
First, multiply the first two terms, remembering that $ij=k$:
$$p' = \left(5 \frac{\sqrt{3}}{2}j + 5 \frac{1}{2}ij\right) \left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right)$$
$$p' = \left(\frac{5\sqrt{3}}{2}j + \frac{5}{2}k\right) \left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right)$$
Now, distribute the terms, remembering $j(\sqrt{3}/2)$, $j(-i/2)$, $k(\sqrt{3}/2)$, and $k(-i/2)$.
$$p' = \frac{5\sqrt{3}}{2}j \cdot \frac{\sqrt{3}}{2} - \frac{5\sqrt{3}}{2}j \cdot \frac{1}{2}i + \frac{5}{2}k \cdot \frac{\sqrt{3}}{2} - \frac{5}{2}k \cdot \frac{1}{2}i$$
Recall $ji = -k$ and $ki = j$.
$$p' = \frac{15}{4}j - \frac{5\sqrt{3}}{4}(ji) + \frac{5\sqrt{3}}{4}k - \frac{5}{4}(ki)$$
$$p' = \frac{15}{4}j - \frac{5\sqrt{3}}{4}(-k) + \frac{5\sqrt{3}}{4}k - \frac{5}{4}(j)$$
$$p' = \frac{15}{4}j + \frac{5\sqrt{3}}{4}k + \frac{5\sqrt{3}}{4}k - \frac{5}{4}j$$
Group the $j$ and $k$ terms:
$$p' = \left(\frac{15}{4} - \frac{5}{4}\right)j + \left(\frac{5\sqrt{3}}{4} + \frac{5\sqrt{3}}{4}\right)k$$
$$p' = \frac{10}{4}j + \frac{10\sqrt{3}}{4}k = \frac{5}{2}j + \frac{5\sqrt{3}}{2}k$$

**Step 5: Convert the resulting pure quaternion back to a vector.**
The resulting quaternion $p' = 0 + 0i + \frac{5}{2}j + \frac{5\sqrt{3}}{2}k$ is pure, as expected. The vector part gives the new vector $\vec{v}'$.
$$\vec{v}' = \left(0, \frac{5}{2}, \frac{5\sqrt{3}}{2}\right)$$

**Reflection:** Each step was a direct application of a definition. Step 1 embedded the vector. Step 2 encoded the rotation axis and angle. Step 4 was careful algebraic manipulation. Step 5 decoded the result. The process is a round trip: $\mathbb{R}^3 \to \mathbb{H} \to \mathbb{H} \to \mathbb{R}^3$.

## Diagrams

A rotation in the y-z plane (around the x-axis).

```text
      z
      ^
      |
      |     /
      |    /
      |   / v' = (0, 5/2, 5√3/2)
      |  /
      | /) 60°
      *------------> y
     /| \ v = (0, 5, 0)
    / |
   /  |
  x (out of page)
```

The round-trip process:
```text
  +-----------------+      +------------------------+      +--------------------------+      +-------------------+
  | Vector in R^3   |      | Pure Quaternion in H   |      | Rotated Quaternion in H  |      | Vector in R^3     |
  | v = (vx,vy,vz)  |----->| p = 0 + vxi + vyj + vzk|----->| p' = q * p * q^-1        |----->| v' = (v'x,v'y,v'z)|
  +-----------------+      +------------------------+      +--------------------------+      +-------------------+
        Step 1:                    Step 4:                       Step 5:
        Embed                      Apply Rotation                Extract
```

## Memory technique — remember this forever
1.  **Mnemonic:** "The Quaternion Sandwich." To rotate the vector (the *filling*, $p$), you must wrap it on both sides with the rotation quaternion (the *bread*, $q$ and $q^{-1}$). One slice of bread isn't enough; you need the full sandwich to keep it in the world of vectors.

2.  **Must-know formulas:** Overlearn these exactly.
    *   Rotation quaternion definition: $q = \cos(\theta/2) + \sin(\theta/2)\hat{u}$
    *   Vector embedding: $\vec{v} \to p = 0 + v_x i + v_y j + v_z k$
    *   The rotation formula: $p' = q p q^{-1}$

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in **1 day**.
    *   Do a new worked example (from self-check) in **3 days**.
    *   Re-derive the worked example from this lesson without looking in **7 days**.
    *   Explain the "why" of the half-angle and the sandwich product to a wall in **16 days**.
    *   Implement the formula in a short Python script in **35 days**.

4.  **First Principles Pathway:** If you forget the exact formula, remember the *concept*: rotation is a **conjugation operation**. This means it must have the form $f(p) = g \cdot p \cdot h$. For rotations, the transformer must be related to its inverse, hence the form $p' = qpq^{-1}$. From there, you'd recall that the specific $q$ involves a half-angle. This conceptual anchor is your safety net.

## Common mistakes
*   **Using the full angle.** The most common error is writing $q = \cos(\theta) + \sin(\theta)\hat{u}$. It is *always* $\theta/2$.
*   **Forgetting to use a pure quaternion.** Trying to rotate $\vec{v}$ by computing $q(v_x i + v_y j + v_z k)q^{-1}$ but forgetting the zero scalar part. The math will work out identically, but it's a conceptual error that can lead to confusion.
*   **Calculating $qp$ or $pq$ only.** This is an incomplete rotation. You will get a result with a non-zero scalar part, which is no longer a vector. You must complete the sandwich.
*   **Assuming commutativity.** Calculating $qpq^{-1}$ as $qq^{-1}p = p$. Quaternion multiplication is not commutative. The order is fixed and essential.

## Self-check
1.  Find the quaternion $q$ that represents a $180^\circ$ rotation around the z-axis. Use it to rotate the vector $\vec{v}=(2, 3, 0)$. Does your result make sense geometrically?
2.  A spacecraft's attitude is represented by $q_1$. It then performs a maneuver represented by $q_2$. If its onboard camera is pointing along a vector represented by pure quaternion $p$, show that the camera's final direction is given by $(q_2 q_1) p (q_2 q_1)^{-1}$.
3.  Prove that the length of the vector is preserved by the rotation formula. That is, show that if $p' = qpq^{-1}$ and $q$ is a unit quaternion, then $||p'|| = ||p||$. (Hint: use the property that the norm of a product is the product of the norms: $||ab|| = ||a|| ||b||$).