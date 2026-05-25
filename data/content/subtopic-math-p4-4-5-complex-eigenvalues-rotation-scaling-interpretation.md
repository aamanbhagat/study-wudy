## What it is
A real matrix can have complex eigenvalues, which always appear in conjugate pairs $\lambda = a \pm ib$. Geometrically, this signifies that the linear transformation acts on a 2D subspace (a plane) by simultaneously rotating and scaling vectors within that plane. The real part $a$ governs the scaling, and the imaginary part $b$ governs the rotation.

## Why it matters
This concept is fundamental to understanding oscillatory systems and stability in physics and engineering. In aerospace, the eigenvalues of a state-space model for an aircraft or rocket determine its flight stability; complex eigenvalues with a negative real part describe a stable, dampened oscillation (good), while a positive real part describes an unstable, growing oscillation (catastrophic flutter). In machine learning, they appear in the analysis of recurrent neural networks (RNNs) and dynamical systems models.

## When to study it
You must be fluent with the following before proceeding:
*   **Eigenvalues and Eigenvectors:** You should be able to find eigenvalues and eigenvectors for real matrices with real eigenvalues.
*   **Complex Numbers:** You need to be comfortable with complex arithmetic, including the polar form $z = re^{i\theta}$, where $r = |z|$ is the magnitude and $\theta = \arg(z)$ is the angle. Euler's formula, $e^{i\theta} = \cos\theta + i\sin\theta$, is essential.
*   **Characteristic Polynomials:** Understanding that eigenvalues are the roots of $\det(A - \lambda I) = 0$.

If you are not solid on these, pause and review them.

## How to study it (step by step)
1.  **Start with the simplest case: a pure rotation matrix.** Consider $R = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$. Calculate its characteristic polynomial and find its eigenvalues. You will find they are $\lambda = \cos\theta \pm i\sin\theta = e^{\pm i\theta}$. Note their magnitude is $|\lambda|=1$, signifying pure rotation with no scaling.
2.  **Add scaling.** Now analyze the matrix $S = \begin{pmatrix} r & 0 \\ 0 & r \end{pmatrix}\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} = \begin{pmatrix} r\cos\theta & -r\sin\theta \\ r\sin\theta & r\cos\theta \end{pmatrix}$. Let $a = r\cos\theta$ and $b = r\sin\theta$. The matrix is $A = \begin{pmatrix} a & -b \\ b & a \end{pmatrix}$. Find its eigenvalues. You will get $\lambda = a \pm ib$.
3.  **Derive the core relationship.** Assume a real matrix $A$ has a complex eigenvalue $\lambda = a+ib$ (where $b \neq 0$) with a corresponding complex eigenvector $\mathbf{v} = \mathbf{x} + i\mathbf{y}$, where $\mathbf{x}$ and $\mathbf{y}$ are real vectors. Start from the definition $A\mathbf{v} = \lambda\mathbf{v}$.
    $$A(\mathbf{x} + i\mathbf{y}) = (a+ib)(\mathbf{x} + i\mathbf{y})$$
    Expand both sides:
    $$A\mathbf{x} + iA\mathbf{y} = (a\mathbf{x} - b\mathbf{y}) + i(b\mathbf{x} + a\mathbf{y})$$
    Equate the real and imaginary parts. This is the crucial step.
    $$A\mathbf{x} = a\mathbf{x} - b\mathbf{y}$$
    $$A\mathbf{y} = b\mathbf{x} + a\mathbf{y}$$
4.  **Interpret the result.** The equations from step 3 tell you how $A$ acts on the vectors $\mathbf{x}$ and $\mathbf{y}$. Notice that the outputs, $A\mathbf{x}$ and $A\mathbf{y}$, are linear combinations of $\mathbf{x}$ and $\mathbf{y}$. This means that $A$ maps the plane spanned by $\{\mathbf{x}, \mathbf{y}\}$ to itself.
5.  **Connect to the rotation-scaling matrix.** In the basis $\mathcal{B} = \{\mathbf{x}, \mathbf{y}\}$, the transformation is represented by the matrix $\begin{pmatrix} a & b \\ -b & a \end{pmatrix}$. Wait, the signs are flipped from step 2. Let's re-check. Ah, my derivation gives the action of A on the basis vectors. The matrix of the transformation with respect to the basis $\{\mathbf{x}, \mathbf{y}\}$ has columns $[A\mathbf{x}]_\mathcal{B}$ and $[A\mathbf{y}]_\mathcal{B}$. From step 3, $A\mathbf{x} = a\mathbf{x} - b\mathbf{y}$ and $A\mathbf{y} = b\mathbf{x} + a\mathbf{y}$. The coordinate vectors are $\begin{pmatrix} a \\ -b \end{pmatrix}$ and $\begin{pmatrix} b \\ a \end{pmatrix}$. So the matrix in this basis is $\begin{pmatrix} a & b \\ -b & a \end{pmatrix}$. *Correction*: Standard convention uses the basis $\{\mathbf{y}, \mathbf{x}\}$ or $\{\mathbf{x}, -\mathbf{y}\}$ to get the cleaner form. Let's stick to the basis $\{\mathbf{x}, \mathbf{y}\}$. The matrix of $A$ with respect to this basis is $C = \begin{pmatrix} a & b \\ -b & a \end{pmatrix}$. This matrix has eigenvalues $a \pm ib$. This is close, but the canonical form is $\begin{pmatrix} a & -b \\ b & a \end{pmatrix}$. The key is that in the plane spanned by the real and imaginary parts of the eigenvector, the transformation is a rotation-scaling.
6.  **Solve a problem.** Take a $2 \times 2$ matrix with no obvious real eigenvectors, like $A = \begin{pmatrix} 3 & -2 \\ 5 & 1 \end{pmatrix}$. Find its eigenvalues, find an eigenvector, and describe the geometric action.

## Key ideas, with intuition
1.  **Real Eigenvalues Stretch.** For a real eigenvalue $\lambda$, $A\mathbf{v} = \lambda\mathbf{v}$. The transformation just scales the vector $\mathbf{v}$ by $\lambda$, keeping it on the same line (the eigenspace).
2.  **Complex Eigenvalues Rotate and Stretch.** A complex eigenvalue means there is no real vector $\mathbf{v}$ such that $A\mathbf{v}$ is parallel to $\mathbf{v}$. The transformation must rotate vectors off their original lines. This rotation happens within a specific 2D plane.
3.  **The Plane of Action.** The plane of rotation is not the standard $xy$-plane. It is the plane spanned by the real part $(\mathbf{x})$ and the imaginary part $(\mathbf{y})$ of the complex eigenvector $\mathbf{v} = \mathbf{x} + i\mathbf{y}$. Any real vector in this plane will be transformed into another vector within the same plane.
4.  **Conjugate Pairs are Necessary.** For a matrix $A$ with real entries, if $\lambda$ is an eigenvalue with eigenvector $\mathbf{v}$, then taking the complex conjugate of $A\mathbf{v} = \lambda\mathbf{v}$ gives $A\overline{\mathbf{v}} = \overline{\lambda}\overline{\mathbf{v}}$. This means the conjugate $\overline{\lambda}$ is also an eigenvalue with eigenvector $\overline{\mathbf{v}}$. This ensures that a transformation of a real vector results in a real vector.
5.  **Polar Form is Geometry.** An eigenvalue $\lambda = a + ib$ can be written in polar form as $\lambda = r(\cos\theta + i\sin\theta) = re^{i\theta}$, where $r = |\lambda| = \sqrt{a^2+b^2}$ is the scaling factor and $\theta = \arg(\lambda) = \operatorname{atan2}(b,a)$ is the angle of rotation.

## Worked example
Let's analyze the matrix $A = \begin{pmatrix} 1 & -2 \\ 1 & 3 \end{pmatrix}$.

**Step 1: Find the eigenvalues.**
We compute the characteristic polynomial:
$$ \det(A - \lambda I) = \det\begin{pmatrix} 1-\lambda & -2 \\ 1 & 3-\lambda \end{pmatrix} = (1-\lambda)(3-\lambda) - (-2)(1) $$
$$ = 3 - 4\lambda + \lambda^2 + 2 = \lambda^2 - 4\lambda + 5 = 0 $$
Using the quadratic formula:
$$ \lambda = \frac{-(-4) \pm \sqrt{(-4)^2 - 4(1)(5)}}{2(1)} = \frac{4 \pm \sqrt{16-20}}{2} = \frac{4 \pm \sqrt{-4}}{2} = \frac{4 \pm 2i}{2} = 2 \pm i $$
The eigenvalues are $\lambda_1 = 2+i$ and $\lambda_2 = 2-i$.

**Step 2: Find an eigenvector.**
Let's use $\lambda = 2+i$. We need to find $\mathbf{v}$ such that $(A - (2+i)I)\mathbf{v} = \mathbf{0}$.
$$ \begin{pmatrix} 1-(2+i) & -2 \\ 1 & 3-(2+i) \end{pmatrix}\mathbf{v} = \begin{pmatrix} -1-i & -2 \\ 1 & 1-i \end{pmatrix}\mathbf{v} = \mathbf{0} $$
From the second row: $v_1 + (1-i)v_2 = 0$. This implies $v_1 = -(1-i)v_2 = (-1+i)v_2$.
Let's choose $v_2 = 1$. Then $v_1 = -1+i$.
So, an eigenvector for $\lambda = 2+i$ is $\mathbf{v} = \begin{pmatrix} -1+i \\ 1 \end{pmatrix}$.

**Step 3: Decompose the eigenvector and interpret.**
We separate the eigenvector into its real and imaginary parts: $\mathbf{v} = \mathbf{x} + i\mathbf{y}$.
$$ \mathbf{v} = \begin{pmatrix} -1 \\ 1 \end{pmatrix} + i \begin{pmatrix} 1 \\ 0 \end{pmatrix} $$
So, $\mathbf{x} = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$ and $\mathbf{y} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
The transformation $A$ acts on the plane spanned by the vectors $\mathbf{x}$ and $\mathbf{y}$.

**Step 4: Describe the geometry.**
The eigenvalue is $\lambda = 2+i$.
The scaling factor is the magnitude: $r = |\lambda| = \sqrt{2^2 + 1^2} = \sqrt{5}$.
The rotation angle is the argument: $\theta = \arg(\lambda) = \arctan(1/2) \approx 26.6^\circ$.
So, the matrix $A$ transforms vectors in the plane spanned by $\{\begin{pmatrix}-1\\1\end{pmatrix}, \begin{pmatrix}1\\0\end{pmatrix}\}$ by rotating them by $\approx 26.6^\circ$ and scaling them by a factor of $\sqrt{5}$. Since the real part ($a=2$) is positive, this represents an expanding spiral.

*Reflection:* Each step builds on the last. Finding eigenvalues is mechanical. Finding the eigenvector requires complex arithmetic. The key insight is splitting that complex eigenvector into two real vectors, which define the plane of action. The geometry (scaling and rotation) is then read directly from the polar form of the eigenvalue.

## Diagrams
Here is the plane of action for the worked example, spanned by vectors $\mathbf{x}$ and $\mathbf{y}$. The transformation $A$ maps any vector in this plane back into the same plane, but rotated and scaled.

```text
       ^ y-axis
       |
     x |
   (-1,1)
       |
       * . . . . . . . > y (1,0)
       |             .
       +---------------------> x-axis
       |
       |
```
The diagram above shows the basis vectors $\mathbf{x} = \begin{pmatrix}-1\\1\end{pmatrix}$ and $\mathbf{y} = \begin{pmatrix}1\\0\end{pmatrix}$ that form the plane of rotation in the standard coordinate system.

The action of $A$ on a vector like $\mathbf{y}$ is a rotation and scaling *within this plane*.
$A\mathbf{y} = A\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}1\\1\end{pmatrix}$. This new vector is a linear combination of $\mathbf{x}$ and $\mathbf{y}$: $\begin{pmatrix}1\\1\end{pmatrix} = 1\begin{pmatrix}-1\\1\end{pmatrix} + 2\begin{pmatrix}1\\0\end{pmatrix} = \mathbf{x} + 2\mathbf{y}$. This is incorrect. Let's recheck the derivation. $A\mathbf{y} = b\mathbf{x} + a\mathbf{y}$. Here $a=2, b=1$. So $A\mathbf{y} = 1\mathbf{x} + 2\mathbf{y} = \begin{pmatrix}-1\\1\end{pmatrix} + 2\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}1\\1\end{pmatrix}$. This matches.

```text
       ^
       |
       |
       |             A*y (rotated & scaled)
       x <--- x
   (original)  .
       |     .
       *------> y (original)
       |
       +--------------------->
```
This second diagram conceptualizes the transformation. A vector like `y` in the plane is rotated and stretched to become `A*y`.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a complex eigenvalue $\lambda = a + ib$ as a flight command for a drone. The matrix $A$ is the drone's autopilot. The command says: "In your special plane of maneuver, for every second that passes, change your position vector by rotating it by an angle proportional to $b$ and scaling its length by a factor related to $a$."
    *   `a` is **A**ltitude change: $a > 0 \implies$ spiral out (unstable), $a < 0 \implies$ spiral in (stable), $a=0 \implies$ circle (neutral).
    *   `b` is **B**end/turn: $b$ controls the speed of rotation.
2.  **Must-know formulas:**
    $$ \lambda = a \pm ib $$
    $$ A\mathbf{v} = \lambda\mathbf{v} \quad \text{where} \quad \mathbf{v} = \mathbf{x} + i\mathbf{y} $$
    $$ \text{Action in basis } \{\mathbf{x}, \mathbf{y}\} \text{ is like } \begin{pmatrix} a & b \\ -b & a \end{pmatrix} \text{ or } \begin{pmatrix} a & -b \\ b & a \end{pmatrix} $$
    (The exact form depends on basis choice, but the interpretation is identical: scaling by $r = \sqrt{a^2+b^2}$ and rotation.)
3.  **Spaced Repetition Schedule:** Review this topic and re-do the worked example from scratch on day 1, day 3, day 7, day 16, and day 35.
4.  **First Principles Pathway:** If you forget everything, you can rebuild it.
    *   Start with the definition: $A\mathbf{v} = \lambda\mathbf{v}$.
    *   Substitute in the complex forms: $A(\mathbf{x}+i\mathbf{y}) = (a+ib)(\mathbf{x}+i\mathbf{y})$.
    *   Expand and equate the real and imaginary parts. This gives you the two crucial equations relating $A\mathbf{x}$, $A\mathbf{y}$ to $\mathbf{x}, \mathbf{y}$. The entire geometric interpretation flows from these two equations.

## Common mistakes
1.  **Thinking the rotation happens in the $x,y$ coordinate plane.** The rotation happens in the plane spanned by the real and imaginary parts of the eigenvector, which is usually tilted relative to the standard axes.
2.  **Confusing the scaling factor.** The scaling factor is $|\lambda| = \sqrt{a^2+b^2}$, not the real part $a$. The real part $a$ determines if the spiral is inward ($a<0$) or outward ($a>0$).
3.  **Using a real vector to find the eigenvector.** You must allow the components of your eigenvector to be complex numbers when solving $(A-\lambda I)\mathbf{v} = \mathbf{0}$ for a complex $\lambda$.
4.  **Stopping at the numbers.** Students find $\lambda = 2 \pm i$ and stop. The goal is not the number, but the geometric story it tells: a rotation-scaling, in what plane, by how much, and in what direction (inward/outward).

## Self-check
1.  Let $A = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$. Find its eigenvalues and describe the transformation geometrically. What is the plane of action?
2.  Let $A = \begin{pmatrix} 1 & 1 \\ -4 & 1 \end{pmatrix}$. Find the eigenvalues. Does this transformation correspond to a spiral? If so, is it inward or outward, and what is the scaling factor per rotation?
3.  A $3 \times 3$ real matrix $B$ has eigenvalues $\lambda_1 = -2$, and $\lambda_{2,3} = 1 \pm 3i$. Describe the geometry of the transformation $T(\mathbf{u}) = B\mathbf{u}$. What happens to vectors on the eigenspace for $\lambda_1$? What happens to vectors in the 2D invariant subspace corresponding to the complex pair?