## What it is
The projection of a vector $\vec{u}$ onto another vector $\vec{v}$ is the "shadow" that $\vec{u}$ casts on the line defined by $\vec{v}$. It is the component of vector $\vec{u}$ that points in the same (or opposite) direction as $\vec{v}$.

## Why it matters
Projection is fundamental to decomposing problems into simpler, orthogonal parts. In machine learning, it's the core of least squares regression for fitting models to data. In physics and aerospace, it's used to break down force vectors into useful components, like resolving the aerodynamic force on a wing into lift and drag.

## When to study it
You must have a solid understanding of the following before proceeding:
1.  Vector addition and scalar multiplication.
2.  The dot product ($\vec{u} \cdot \vec{v}$).
3.  The vector norm or magnitude ($\|\vec{v}\| = \sqrt{\vec{v} \cdot \vec{v}}$).
4.  The geometric interpretation of the dot product: $\vec{u} \cdot \vec{v} = \|\vec{u}\| \|\vec{v}\| \cos\theta$.

If you are not comfortable with these, review them first.

## How to study it (step by step)
1.  **Re-derive the geometric dot product.** Start with two vectors $\vec{u}$ and $\vec{v}$ and the law of cosines on the triangle they form with $\vec{u}-\vec{v}$. Prove to yourself that $\vec{u} \cdot \vec{v} = \|\vec{u}\| \|\vec{v}\| \cos\theta$. This relationship is the key.
2.  **Derive the scalar projection.** The "shadow" of $\vec{u}$ on $\vec{v}$ forms a right-angled triangle. The length of the shadow (the adjacent side) is $\|\vec{u}\|\cos\theta$. Use the formula from step 1 to express this length purely in terms of a dot product and a norm. This length is called the scalar projection of $\vec{u}$ onto $\vec{v}$.
3.  **Derive the vector projection.** A vector is defined by length and direction. You found the length in step 2. The direction is simply the direction of $\vec{v}$. Find the unit vector in the direction of $\vec{v}$, which is $\hat{v} = \frac{\vec{v}}{\|\vec{v}\|}$. Multiply the scalar projection (length) by this unit vector (direction) to get the final vector projection formula.
4.  **Solve a simple 2D case.** Calculate the projection of $\vec{u} = \langle 2, 3 \rangle$ onto $\vec{v} = \langle 5, 0 \rangle$. Draw the vectors and the result. The answer should be intuitively obvious, providing a sanity check for your formula.
5.  **Solve a general 3D case.** Calculate the projection of $\vec{u} = \langle 1, 1, 2 \rangle$ onto $\vec{v} = \langle -2, 3, 1 \rangle$. This will not have an obvious geometric answer, forcing you to rely on the formula.
6.  **Find the orthogonal component.** Decompose $\vec{u}$ into two vectors: one parallel to $\vec{v}$ (the projection, let's call it $\vec{p}$) and one orthogonal to $\vec{v}$ (let's call it $\vec{o}$). Since $\vec{u} = \vec{p} + \vec{o}$, you can find $\vec{o}$ by calculating $\vec{o} = \vec{u} - \vec{p}$. Verify that your resulting $\vec{o}$ is indeed orthogonal to $\vec{v}$ by checking if $\vec{o} \cdot \vec{v} = 0$.

## Key ideas, with intuition
1.  **Scalar vs. Vector Projection:** The scalar projection is a *length*, while the vector projection is a *vector*. The scalar projection can be negative if the vectors point in generally opposite directions ($\theta > 90^\circ$). The vector projection is simply the scalar projection multiplied by the unit vector of the direction you're projecting onto.
    $$ \text{comp}_{\vec{v}}\vec{u} = \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|} \quad (\text{a scalar: length}) $$
    $$ \text{proj}_{\vec{v}}\vec{u} = \left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|} \right) \frac{\vec{v}}{\|\vec{v}\|} = \left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|^2} \right) \vec{v} \quad (\text{a vector}) $$
2.  **The Dot Product Measures "Sameness" of Direction.** The core of the projection formula is the dot product $\vec{u} \cdot \vec{v}$. Think of it as a machine that tells you how much of $\vec{u}$ is already aligned with $\vec{v}$. Dividing by $\|\vec{v}\|$ (or $\|\vec{v}\|^2$) normalizes this measurement.
3.  **Orthogonal Decomposition.** Any vector $\vec{u}$ can be uniquely split into two parts relative to another vector $\vec{v}$: a part parallel to $\vec{v}$ and a part orthogonal to $\vec{v}$. The projection gives you the parallel part. The remainder, $\vec{u} - \text{proj}_{\vec{v}}\vec{u}$, gives you the orthogonal part. This is the foundation of creating orthogonal coordinate systems (like the Gram-Schmidt process).

## Worked example
Find the projection of vector $\vec{u} = \langle 2, 1, -3 \rangle$ onto vector $\vec{v} = \langle 1, 1, 2 \rangle$.

**Step 1: Calculate the dot product $\vec{u} \cdot \vec{v}$.**
This measures the alignment between the two vectors.
$$ \vec{u} \cdot \vec{v} = (2)(1) + (1)(1) + (-3)(2) = 2 + 1 - 6 = -3 $$

**Step 2: Calculate the squared magnitude of the vector being projected onto, $\|\vec{v}\|^2$.**
This is the normalization factor. Note that $\|\vec{v}\|^2 = \vec{v} \cdot \vec{v}$.
$$ \|\vec{v}\|^2 = 1^2 + 1^2 + 2^2 = 1 + 1 + 4 = 6 $$

**Step 3: Calculate the scalar coefficient $\left( \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|^2} \right)$.**
This scalar tells us how much to scale the vector $\vec{v}$ to get the projection.
$$ \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|^2} = \frac{-3}{6} = -\frac{1}{2} $$

**Step 4: Multiply the scalar coefficient by the vector $\vec{v}$.**
This final step scales the original vector $\vec{v}$ to the correct length and direction (in this case, opposite) to form the projection.
$$ \text{proj}_{\vec{v}}\vec{u} = -\frac{1}{2} \vec{v} = -\frac{1}{2} \langle 1, 1, 2 \rangle = \left\langle -\frac{1}{2}, -\frac{1}{2}, -1 \right\rangle $$

**Reflection:**
- Step 1 found that the vectors point in generally opposite directions (since the dot product is negative).
- Step 2 gave us the scaling factor related to the length of $\vec{v}$.
- Step 3 combined these to find the precise scaling factor: the projection should be a vector pointing in the opposite direction of $\vec{v}$ with half its length.
- Step 4 executed this scaling to produce the final vector.

## Diagrams
Here is a 2D representation of the projection of $\vec{u}$ onto $\vec{v}$. The vector $\vec{p}$ is the projection, and $\vec{o}$ is the orthogonal component.

```text
      ^ y
      |
      |    /
      |   / u
      |  /
      | /
      |/
 o<---*
      | \
      |  \
      +---+------------> x
      p--> v
```
In this diagram:
- The vector `v` lies on the x-axis for simplicity.
- The vector `u` is the hypotenuse of the right triangle.
- The projection `p` is the base of the triangle, the "shadow" of `u` on `v`.
- The orthogonal component `o` is the height of the triangle, where $\vec{o} = \vec{u} - \vec{p}$. Notice that $\vec{p} \cdot \vec{o} = 0$.

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the sun being directly "above" the line containing vector $\vec{v}$, shining down perpendicularly onto it. The projection of $\vec{u}$ onto $\vec{v}$ is literally the **shadow** that $\vec{u}$ casts.

2.  **Formula to Overlearn:** Memorize this form. It is the most robust.
    $$ \text{proj}_{\vec{v}}\vec{u} = \left( \frac{\vec{u} \cdot \vec{v}}{\vec{v} \cdot \vec{v}} \right) \vec{v} $$
    Why this form? It avoids square roots. It is dimensionally clean: a scalar $(\frac{\text{scalar}}{\text{scalar}})$ times a vector $(\vec{v})$.

3.  **Spaced Repetition Schedule:**
    - Day 1: Re-derive the formula from first principles.
    - Day 3: Solve two new projection problems.
    - Day 7: Write down the formula from memory. Explain what each part means.
    - Day 16: Find the orthogonal component of a vector.
    - Day 35: Explain to an imaginary student why projection is useful in physics.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    - **Goal:** A vector in the direction of $\vec{v}$ with the "shadow" length.
    - **Direction:** The unit vector in the direction of $\vec{v}$ is $\hat{v} = \frac{\vec{v}}{\|\vec{v}\|}$.
    - **Length:** The shadow's length is $\|\vec{u}\|\cos\theta$.
    - **Connect:** We know $\vec{u} \cdot \vec{v} = \|\vec{u}\|\|\vec{v}\|\cos\theta$. Solve for the length: $\|\vec{u}\|\cos\theta = \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|}$.
    - **Combine:** Projection = (Length) $\times$ (Direction) = $\left(\frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|}\right) \left(\frac{\vec{v}}{\|\vec{v}\|}\right) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{v}\|^2}\vec{v} = \left( \frac{\vec{u} \cdot \vec{v}}{\vec{v} \cdot \vec{v}} \right) \vec{v}$. Done.

## Common mistakes
1.  **Providing a scalar answer for a vector projection.** The projection of a vector is a *vector*, not a number. If you end up with just a scalar, you have calculated the scalar projection (component), not the vector projection.
2.  **Dividing by $\|\vec{v}\|$ instead of $\|\vec{v}\|^2$.** This is a very common algebraic error. The formula $\left( \frac{\vec{u} \cdot \vec{v}}{\vec{v} \cdot \vec{v}} \right) \vec{v}$ is the safest way to write it to avoid this mistake.
3.  **Projecting onto the wrong vector.** The projection of $\vec{u}$ onto $\vec{v}$ is not the same as the projection of $\vec{v}$ onto $\vec{u}$. The vector in the denominator of the scalar part and on the outside must be the one you are projecting *onto*.

## Self-check
1.  What is the projection of the vector $\vec{u} = \langle -3, 4 \rangle$ onto the vector $\vec{i} = \langle 1, 0 \rangle$? Can you solve this using the formula and also by just sketching it?
2.  Find the vector projection of $\vec{a} = \langle 1, 0, 2 \rangle$ onto $\vec{b} = \langle -1, 3, 1 \rangle$.
3.  Let $\vec{u} = \langle 2, 2 \rangle$ and $\vec{v} = \langle 4, -1 \rangle$. Decompose $\vec{u}$ into two vectors, $\vec{p}$ and $\vec{o}$, such that $\vec{u} = \vec{p} + \vec{o}$, where $\vec{p}$ is parallel to $\vec{v}$ and $\vec{o}$ is orthogonal to $\vec{v}$.