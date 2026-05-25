## What it is
A quaternion is a four-dimensional number, an extension of complex numbers, used to represent orientation or rotation in three-dimensional space. It consists of one scalar (or "real") part and three vector (or "imaginary") parts, written as $q = (q_0, q_1, q_2, q_3)$. For a quaternion to represent a pure rotation, it must be a "unit quaternion," meaning its magnitude must be exactly 1.

## Why it matters
In aerospace GNC, quaternions are the standard for representing a spacecraft's attitude (its orientation in space). They are computationally more efficient and numerically more stable than rotation matrices, and critically, they avoid the problem of "gimbal lock," a catastrophic failure mode that can plague systems using Euler angles. You will use them constantly when programming flight software for satellites, drones, and launch vehicles.

## When to study it
You must be fluent with vector algebra (dot products, cross products, vector norms) and complex numbers (real and imaginary parts, magnitude/modulus). A basic understanding of linear algebra, specifically the concept of a vector space and basis vectors, is also essential. If you are not comfortable calculating the magnitude of a 3D vector, review that first.

## How to study it (step by step)
1.  **Review Complex Numbers:** Recall that a complex number $z = a + bi$ has a real part $a$ and an imaginary part $b$, with the property $i^2 = -1$. Its magnitude is $|z| = \sqrt{a^2 + b^2}$.
2.  **Introduce the Quaternion Basis:** A quaternion extends this idea with three imaginary units: $i, j, k$. They obey the fundamental relation: $i^2 = j^2 = k^2 = ijk = -1$.
3.  **Write the Full Form:** Using this basis, write a general quaternion $q$ as $q = q_0 + q_1 i + q_2 j + q_3 k$. Identify $q_0$ as the **scalar part** and $\vec{q} = (q_1, q_2, q_3)$ as the **vector part**. This is often written compactly as $q = (q_0, \vec{q})$.
4.  **Derive the Norm:** The norm (or magnitude) of a quaternion, $\|q\|$, is its length in 4D space. This is a direct extension of the Pythagorean theorem. Just as a 3D vector $\vec{v}=(x,y,z)$ has a norm $\|\vec{v}\| = \sqrt{x^2+y^2+z^2}$, a quaternion has the norm:
    $$
    \|q\| = \sqrt{q_0^2 + q_1^2 + q_2^2 + q_3^2}
    $$
5.  **Apply the Unit Constraint:** For a quaternion to represent a pure 3D rotation without any scaling, its norm must be 1. This is the **unit quaternion constraint**:
    $$
    \|q\| = 1 \implies q_0^2 + q_1^2 + q_2^2 + q_3^2 = 1
    $$
6.  **Practice Normalization:** Take a non-unit quaternion, like $q = (1, 1, 1, 1)$. Calculate its norm: $\|q\| = \sqrt{1^2+1^2+1^2+1^2} = \sqrt{4} = 2$. To create the corresponding unit quaternion $\hat{q}$, divide $q$ by its norm: $\hat{q} = \frac{q}{\|q\|} = (\frac{1}{2}, \frac{1}{2}, \frac{1}{2}, \frac{1}{2})$. Verify that $\|\hat{q}\|=1$.

## Key ideas, with intuition
1.  **A 4D Number for 3D Rotations:** It seems counterintuitive to use four numbers to describe a 3D orientation. Think of it this way: three numbers are needed to specify the axis of rotation (a direction vector), and one number is needed to specify the amount of rotation around that axis. The four components of a unit quaternion cleverly encode this axis-angle information.

2.  **The Scalar/Vector Split:** The quaternion $q=(q_0, \vec{q})$ is a hybrid.
    *   The **scalar part**, $q_0$, relates to the *amount* of rotation.
    *   The **vector part**, $\vec{q}$, relates to the *axis* of rotation.
    We will later derive the precise relationship: $q = (\cos(\theta/2), \sin(\theta/2)\hat{u})$, where $\theta$ is the angle of rotation and $\hat{u}$ is the unit vector of the rotation axis.

3.  **The Unit Constraint Removes Scaling:** A general quaternion can represent both rotation and scaling (a "rotor-dilation"). Forcing the norm to be 1 strips out the scaling component, leaving a pure rotation. This is perfectly analogous to how we use *unit vectors* to represent pure direction, stripping out magnitude. The set of all unit quaternions forms a 4D hypersphere of radius 1.

## Worked example
**Problem:** An onboard computer produces the quaternion $q = (3, -2, 6, 0)$ to represent the rocket's current attitude. Is this a valid attitude quaternion? If not, normalize it.

**Solution:**

1.  **Check the unit constraint.** An attitude quaternion must be a unit quaternion, meaning its norm must be 1. We calculate the norm of $q$:
    $$
    \|q\| = \sqrt{q_0^2 + q_1^2 + q_2^2 + q_3^2}
    $$
    $$
    \|q\| = \sqrt{3^2 + (-2)^2 + 6^2 + 0^2}
    $$
    $$
    \|q\| = \sqrt{9 + 4 + 36 + 0} = \sqrt{49} = 7
    $$
    Since $\|q\| = 7 \neq 1$, this is not a valid unit quaternion. It represents a rotation combined with a scaling factor of 7.

2.  **Normalize the quaternion.** To find the corresponding pure rotation, we must normalize $q$ by dividing each of its components by its norm, $\|q\|$. Let the unit quaternion be $\hat{q}$.
    $$
    \hat{q} = \frac{q}{\|q\|} = \frac{(3, -2, 6, 0)}{7}
    $$
    $$
    \hat{q} = \left(\frac{3}{7}, -\frac{2}{7}, \frac{6}{7}, \frac{0}{7}\right) = \left(\frac{3}{7}, -\frac{2}{7}, \frac{6}{7}, 0\right)
    $$

3.  **Verification (optional but good practice).** Let's check the norm of $\hat{q}$ to ensure it is 1.
    $$
    \|\hat{q}\| = \sqrt{\left(\frac{3}{7}\right)^2 + \left(-\frac{2}{7}\right)^2 + \left(\frac{6}{7}\right)^2 + 0^2}
    $$
    $$
    \|\hat{q}\| = \sqrt{\frac{9}{49} + \frac{4}{49} + \frac{36}{49}} = \sqrt{\frac{9+4+36}{49}} = \sqrt{\frac{49}{49}} = \sqrt{1} = 1
    $$
    The result $\hat{q} = (\frac{3}{7}, -\frac{2}{7}, \frac{6}{7}, 0)$ is the correct unit quaternion representing the intended attitude.

**Reflection:** The first step identified the problem: the quaternion included scaling. The second step corrected it by dividing out the magnitude, isolating the rotational part. This process of normalization is a fundamental operation in GNC to correct for numerical drift and ensure rotations are pure.

## Diagrams
It's impossible to draw a 4D object, but we can use an analogy. A unit vector in 3D must lie on the surface of a unit sphere ($x^2+y^2+z^2=1$). Similarly, a unit quaternion must lie on the surface of a 4D "hypersphere" of radius 1.

This diagram illustrates the components.

```text
       A Quaternion q = (q₀, q₁, q₂, q₃)
       _________________ | _________________
      /                 |                 \
     /                  |                  \
Scalar Part (q₀)      Vector Part (q₁, q₂, q₃)
   (a single real number)     (a 3D vector, q⃗)

Analogy to a 3D Unit Sphere:
Imagine a point (x, y, z) on the surface of a sphere with radius 1.
The constraint is x² + y² + z² = 1.

      z ^
        |
        / \
       /---\
      |  .  | (x,y,z)
      \---/ --> y
     / \
    v   x

For a Unit Quaternion:
The point (q₀, q₁, q₂, q₃) is on the surface of a 4D hypersphere with radius 1.
The constraint is q₀² + q₁² + q₂² + q₃² = 1.
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a **QU**een (**Qu**aternion) giving orders. She has **one** main thought (the **scalar** part, $q_0$) and points with a **three**-jeweled scepter (the **vector** part, $\vec{q}$) to give a direction. To be a "unit" of the royal guard, you must have a total power level of exactly **1**.

2.  **Must-Know Formulas:**
    $$
    q = (q_0, q_1, q_2, q_3) = (q_0, \vec{q})
    $$
    $$
    \|q\| = \sqrt{q_0^2 + q_1^2 + q_2^2 + q_3^2}
    $$
    $$
    \text{Unit Constraint: } \|q\| = 1
    $$

3.  **Spaced Repetition Schedule:** Review these formulas and the mnemonic now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Each time, write them from memory before checking.

4.  **First Principles Pathway:** If you forget everything, remember this: A quaternion is just a vector in 4D space. The "norm" or "magnitude" of any vector in any dimension is found by the Pythagorean theorem: square the components, add them up, and take the square root. The "unit" constraint simply means this length must be 1.

## Common mistakes
1.  **Forgetting the scalar part in the norm.** Calculating $\sqrt{q_1^2 + q_2^2 + q_3^2}$ instead of $\sqrt{q_0^2 + q_1^2 + q_2^2 + q_3^2}$. This is the most common error.
2.  **Mixing up the quaternion and a 3D vector.** The vector part $\vec{q} = (q_1, q_2, q_3)$ is *not* a position vector in space. It encodes information about the rotation axis.
3.  **Incorrect normalization.** When normalizing $q = (q_0, q_1, q_2, q_3)$, you must divide *all four* components by the norm $\|q\|$, not just the three vector components.

## Self-check
1.  A quaternion is given by $q = 10 - 2i + 5j + 4k$. What are its scalar and vector parts? Write it in the notation $q=(q_0, \vec{q})$.
2.  Calculate the norm of the quaternion $p = (0, 1, -1, 1)$. Is it a unit quaternion? If not, find the corresponding unit quaternion $\hat{p}$.
3.  A unit quaternion representing a rotation has a vector part $\vec{q} = (\frac{1}{3}, \frac{2}{3}, 0)$. What are the two possible values for its scalar part, $q_0$? Why are there two?