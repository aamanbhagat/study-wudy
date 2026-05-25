## What it is
The Triad method is a deterministic algorithm for finding an object's attitude (its 3D orientation). It works by measuring two non-parallel vectors in the object's own coordinate system (the "body frame") and comparing them to the known directions of those same two vectors in a fixed reference frame. From these two pairs of vectors, it computes the unique rotation matrix that maps the reference frame to the body frame.

## Why it matters
The Triad method is a foundational, computationally inexpensive attitude determination algorithm. It was used in early spacecraft and remains a critical building block for understanding more sophisticated estimation techniques like Kalman filters, which fuse multiple sensor readings over time. You will encounter its core logic in robotics for object pose estimation and in computer graphics for orienting objects.

## When to study it
Before tackling this, you must be proficient in the following. If you are not, master them first.
1.  **Linear Algebra:** Vector dot and cross products, matrix multiplication, matrix transpose, and the properties of orthogonal matrices ($A^T A = I$, $A^{-1} = A^T$).
2.  **Rotational Kinematics:** The definition of a rotation matrix (also called a Direction Cosine Matrix or DCM) and its function in transforming vectors between coordinate frames, i.e., $\vec{v}_{\text{body}} = A \cdot \vec{v}_{\text{ref}}$.

## How to study it (step by step)
1.  **Frame the Problem.** Write down the core mathematical problem: Given two reference vectors $\vec{r}_1, \vec{r}_2$ and two corresponding body-frame measurements $\vec{b}_1, \vec{b}_2$, find the rotation matrix $A$ such that $\vec{b}_1 = A \vec{r}_1$ and $\vec{b}_2 = A \vec{r}_2$.
2.  **Geometric Intuition.** Take a pen. A single vector measurement (e.g., pointing it towards a light) constrains two rotational degrees of freedom, but you can still spin the pen around the vector's axis. Now, hold a second, non-parallel pen fixed to the first. Point both pens at their respective targets. The orientation is now fully constrained. Internalize this physical constraint.
3.  **Derive the Algorithm.** Follow the derivation in the "Key ideas" section below. Start with the two vector equations and derive the final form $A = T_b T_r^T$. Do not just read it; write it out yourself.
4.  **Code It.** Implement the Triad method in a language like Python with NumPy or MATLAB. Create two reference vectors, define a known rotation matrix $A_{true}$, calculate the "measured" body vectors using $\vec{b} = A_{true} \vec{r}$, and then use your Triad implementation to recover $A_{est}$. Verify that $A_{est}$ is very close to $A_{true}$.
5.  **Test the Limits.** In your code, make the two reference vectors nearly parallel (e.g., $\vec{r}_1 = [1, 0, 0]^T$ and $\vec{r}_2 = [1, 0.001, 0]^T$). Observe how the numerical error in your estimated attitude matrix $A_{est}$ explodes. This will build intuition for the method's primary weakness.

## Key ideas, with intuition
The core challenge is that we have two vector equations, $\vec{b}_1 = A \vec{r}_1$ and $\vec{b}_2 = A \vec{r}_2$, but we cannot simply "solve for $A$" as if it were a scalar. The key is to use the given vectors to construct a full coordinate system (a "triad" of orthogonal basis vectors) in both the reference frame and the body frame. Since the rotation $A$ must rotate the reference *basis* into the body *basis*, we can find $A$ by relating these two constructed systems.

1.  **A Single Vector is Not Enough.** A single vector equation $\vec{b}_1 = A \vec{r}_1$ only constrains the rotation partially. Imagine $\vec{r}_1$ is the north pole vector. $\vec{b}_1$ is where your spacecraft's sensor measures that pole. You know how to align that one axis, but the spacecraft can still be rotated freely *around* that axis.

2.  **Building an Orthonormal Basis.** Two non-parallel vectors, $\vec{v}_1$ and $\vec{v}_2$, define a plane. We can use them to build a right-handed orthonormal basis $\{\hat{t}_1, \hat{t}_2, \hat{t}_3\}$. This is the "triad".
    - The first basis vector is along the first measurement vector:
      $$ \hat{t}_1 = \frac{\vec{v}_1}{||\vec{v}_1||} $$
    - The second basis vector is perpendicular to the plane defined by $\vec{v}_1$ and $\vec{v}_2$. The cross product gives us this direction.
      $$ \hat{t}_2 = \frac{\vec{v}_1 \times \vec{v}_2}{||\vec{v}_1 \times \vec{v}_2||} $$
    - The third basis vector completes the right-handed system.
      $$ \hat{t}_3 = \hat{t}_1 \times \hat{t}_2 $$

3.  **Two Frames, Two Bases.** We perform the procedure above twice.
    - Using the reference vectors $\vec{r}_1, \vec{r}_2$, we construct the reference triad basis: $\{\hat{t}_{r1}, \hat{t}_{r2}, \hat{t}_{r3}\}$.
    - Using the body vectors $\vec{b}_1, \vec{b}_2$, we construct the body triad basis: $\{\hat{t}_{b1}, \hat{t}_{b2}, \hat{t}_{b3}\}$.

4.  **Finding the Rotation.** We can pack these column vectors into matrices, $T_r = [\hat{t}_{r1} | \hat{t}_{r2} | \hat{t}_{r3}]$ and $T_b = [\hat{t}_{b1} | \hat{t}_{b2} | \hat{t}_{b3}]$. By construction, these are rotation matrices. The attitude matrix $A$ must rotate the reference triad to the body triad. Therefore, for any vector $\vec{v}$ expressed in the reference triad coordinates, its body triad representation is given by $A \vec{v}$. This must hold for the basis vectors themselves.
    $$
    \begin{align*}
    \hat{t}_{b1} &= A \hat{t}_{r1} \\
    \hat{t}_{b2} &= A \hat{t}_{r2} \\
    \hat{t}_{b3} &= A \hat{t}_{r3}
    \end{align*}
    $$
    We can write this compactly in matrix form:
    $$ T_b = A T_r $$
    Since $T_r$ is an orthogonal matrix, its inverse is its transpose ($T_r^{-1} = T_r^T$). We can solve for $A$ by right-multiplying by $T_r^T$:
    $$ A = T_b T_r^T $$
    This is the solution. The attitude is the rotation that maps the reference triad matrix to the body triad matrix.

## Worked example
A spacecraft measures the direction to the Sun and the direction of the Earth's magnetic field.

**Given:**
- Reference vectors (in the inertial frame, e.g., ECI):
  - Sun vector: $\vec{r}_1 = [1, 0, 0]^T$
  - Magnetic field vector: $\vec{r}_2 = [0, 1, 0]^T$
- Body-frame measurements (from the spacecraft's sun sensor and magnetometer):
  - Sun sensor: $\vec{b}_1 = [0, 1, 0]^T$
  - Magnetometer: $\vec{b}_2 = [0, 0, 1]^T$

**Goal:** Find the attitude rotation matrix $A$.

**Step 1: Construct the reference triad matrix $T_r$.**
- First basis vector: $\hat{t}_{r1} = \frac{\vec{r}_1}{||\vec{r}_1||} = [1, 0, 0]^T$.
- Second basis vector: $\hat{t}_{r2} = \frac{\vec{r}_1 \times \vec{r}_2}{||\vec{r}_1 \times \vec{r}_2||} = \frac{[1,0,0]^T \times [0,1,0]^T}{||...||} = \frac{[0,0,1]^T}{1} = [0, 0, 1]^T$.
- Third basis vector: $\hat{t}_{r3} = \hat{t}_{r1} \times \hat{t}_{r2} = [1,0,0]^T \times [0,0,1]^T = [0, -1, 0]^T$.
- Form the matrix $T_r$:
$$ T_r = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix} $$

**Step 2: Construct the body triad matrix $T_b$.**
- First basis vector: $\hat{t}_{b1} = \frac{\vec{b}_1}{||\vec{b}_1||} = [0, 1, 0]^T$.
- Second basis vector: $\hat{t}_{b2} = \frac{\vec{b}_1 \times \vec{b}_2}{||...||} = \frac{[0,1,0]^T \times [0,0,1]^T}{||...||} = \frac{[1,0,0]^T}{1} = [1, 0, 0]^T$.
- Third basis vector: $\hat{t}_{b3} = \hat{t}_{b1} \times \hat{t}_{b2} = [0,1,0]^T \times [1,0,0]^T = [0, 0, -1]^T$.
- Form the matrix $T_b$:
$$ T_b = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & -1 \end{bmatrix} $$

**Step 3: Calculate the attitude matrix $A = T_b T_r^T$.**
- First, find $T_r^T$:
$$ T_r^T = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & -1 & 0 \end{bmatrix} $$
- Now, multiply:
$$ A = T_b T_r^T = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & -1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & -1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix} $$

**Reflection:**
- Step 1 created a coordinate system based on the known reference directions.
- Step 2 created a corresponding coordinate system based on what the spacecraft's sensors actually saw.
- Step 3 found the unique rotation that transforms the reference system into the body system, which is by definition the attitude of the spacecraft.

## Diagrams
Here is an ASCII diagram illustrating the setup. We have a reference frame $\{X, Y, Z\}$ and a body frame $\{x, y, z\}$ that is rotated with respect to it. Two vectors are known in the reference frame ($\vec{r}_1, \vec{r}_2$) and measured in the body frame ($\vec{b}_1, \vec{b}_2$). The Triad method finds the rotation $A$ that aligns the frames such that the vectors match.

```text
       Z (ref)
       |
       |    / z (body)
       |   /
       |  /
       | /
       |/___________ Y (ref)
      / \
     /   \ y (body)
    /     \
   X (ref)   x (body)

In Reference Frame {X,Y,Z}:           In Body Frame {x,y,z}:
---------------------------           ------------------------
      Z                                     z
      |                                     |
      |                                     |
 r2-->o------> Y                       b2-->o------> y
     /                                     /
    /                                     /
   X <--r1                               X <--b1

Goal: Find rotation matrix A such that A*ri = bi
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**B**uild **R**ight-handed **T**riads." This reminds you that the final formula involves the Body triad ($T_b$) and the Reference triad ($T_r$). The order is $A = T_b T_r^T$. Think of it as mapping *from* Reference *to* Body, so Body comes first: $A = T_b (\text{map from } T_r)$.
2.  **Must-Overlearn Formulas:**
    $$ A = T_b T_r^T $$
    Where $T_v = [\hat{t}_1 | \hat{t}_2 | \hat{t}_3]$ for a frame $v$, and the basis vectors are constructed as:
    $$ \hat{t}_1 = \frac{\vec{v}_1}{||\vec{v}_1||} \quad, \quad \hat{t}_2 = \frac{\vec{v}_1 \times \vec{v}_2}{||\vec{v}_1 \times \vec{v}_2||} \quad, \quad \hat{t}_3 = \hat{t}_1 \times \hat{t}_2 $$
3.  **Spaced Repetition Schedule:** Review this derivation and re-do the worked example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the final formula, rebuild it. You know the goal is to find $A$ such that it rotates the reference triad to the body triad. This means $A$ applied to the first reference basis vector gives the first body basis vector, and so on. In matrix form, this is $A T_r = T_b$. Since $T_r$ is an orthogonal matrix, its inverse is its transpose. Right-multiply by $T_r^T$ to isolate $A$.

## Common mistakes
1.  **Order of Operations:** Calculating $A = T_r^T T_b$ or $A = T_r T_b^T$. The correct formula $A = T_b T_r^T$ maps vectors from reference to body. A mnemonic is that the "to" frame ($T_b$) comes first.
2.  **Using Collinear Vectors:** If $\vec{r}_1$ and $\vec{r}_2$ are nearly parallel, their cross product $\vec{r}_1 \times \vec{r}_2$ will be close to the zero vector. Normalizing this vector will cause large numerical errors, yielding a garbage attitude estimate. The two vectors must be sufficiently separated.
3.  **Normalization Errors:** Forgetting to normalize the vectors at each stage of building the triad basis. The matrices $T_b$ and $T_r$ *must* be orthogonal for the relation $T_r^{-1} = T_r^T$ to hold.
4.  **Ignoring Measurement Error:** The Triad method gives unequal weight to the two measurements. The first vector $\vec{v}_1$ is trusted completely to define the first basis vector $\hat{t}_1$. All the error from both $\vec{v}_1$ and $\vec{v}_2$ is pushed into the second and third basis vectors. For better accuracy, the more precise sensor measurement should be chosen as the primary vector $\vec{v}_1$.

## Self-check
1.  Given $\vec{r}_1 = [0, 1, 0]^T$, $\vec{r}_2 = [0, 0, 1]^T$ and $\vec{b}_1 = [1, 0, 0]^T$, $\vec{b}_2 = [0, -1, 0]^T$, calculate the attitude matrix $A$.
2.  Explain, geometrically, why the Triad method fails if $\vec{r}_1$ and $\vec{r}_2$ are parallel. What happens mathematically in the algorithm at the point of failure?
3.  Suppose your sun sensor is extremely accurate, but your magnetometer is very noisy. Which measurement would you choose as $\vec{v}_1$ in the Triad construction, and why does this choice minimize the attitude error?