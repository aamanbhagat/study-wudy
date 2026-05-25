## What it is
Raising and lowering indices is the process of converting between a vector's contravariant components (upper index, $v^i$) and its covariant components (lower index, $v_i$). This conversion is not merely a notational trick; it is a geometrically meaningful operation performed by the metric tensor ($g_{ij}$) and its inverse ($g^{ij}$), which act as a "dictionary" to translate between a vector space and its dual space.

## Why it matters
This is the fundamental language of General Relativity, where the Einstein Field Equations, $G_{\mu\nu} = 8\pi G T_{\mu\nu}$, relate the curvature of spacetime (a covariant tensor) to the distribution of matter and energy. In aerospace, relativistic effects are critical for GPS accuracy, requiring these tools. In machine learning, the Fisher information matrix acts as a metric tensor on the space of probability distributions, allowing for geometric interpretations of optimization algorithms (Natural Gradient Descent).

## When to study it
You must have a firm grasp of the following before proceeding. If you are not confident in these, pause and review them.
1.  **Linear Algebra:** Vector spaces, basis vectors, and especially the concept of a **dual space** ($V^*$) and dual basis.
2.  **Tensor Notation:** The **Einstein summation convention** is non-negotiable. You must be fluent in what expressions like $A^i_j B^j_k = C^i_k$ mean.
3.  **Tensors (Introductory):** The distinction between **contravariant** (upper index, transforms like a displacement vector) and **covariant** (lower index, transforms like the gradient of a scalar field) components.

## How to study it (step by step)
1.  **Recap the Dual Space.** Spend 20 minutes reviewing how a linear functional (a covector) $\omega \in V^*$ acts on a vector $v \in V$ to produce a scalar: $\omega(v) \in \mathbb{R}$. In component form, this is written $\omega_i v^i$.
2.  **Define the Metric Tensor.** Understand the metric tensor $g_{ij}$ as the components of a bilinear form $g: V \times V \to \mathbb{R}$ that defines an inner product (dot product) on the vector space. The inner product of two vectors $u$ and $v$ is $g(u,v) = g_{ij}u^i v^j$.
3.  **Derive the Lowering Operation.** Use the inner product to associate a unique covector with every vector. For a vector $v$, we define its corresponding covector, let's call it $v_\flat$, by the rule that its action on any other vector $u$ must equal the inner product of $v$ and $u$. Write this out: $v_\flat(u) = g(v, u)$. In components, this is $v_i u^i = g_{ij} v^j u^i$. Since this must hold for all vectors $u$, we can equate the coefficients of $u^i$, yielding the fundamental lowering rule: $v_i = g_{ij} v^j$.
4.  **Define the Inverse Metric.** To reverse this process, we need to "undo" the action of $g_{ij}$. This requires the inverse metric, $g^{ij}$, which is the matrix inverse of $g_{ij}$. Its defining property is $g^{ik}g_{kj} = \delta^i_j$, where $\delta^i_j$ is the Kronecker delta.
5.  **Derive the Raising Operation.** Start with the lowered vector $v_k = g_{kj}v^j$. Apply the inverse metric to both sides: $g^{ik}v_k = g^{ik}g_{kj}v^j$. Using the definition of the inverse metric, the right side becomes $\delta^i_j v^j = v^i$. This gives the raising rule: $v^i = g^{ik}v_k$.
6.  **Practice with a Non-trivial Metric.** Find the metric for 2D polar coordinates and its inverse. Take a simple vector like a radial velocity and practice converting its components between contravariant and covariant forms. Notice how the components change.

## Key ideas, with intuition
1.  **Vectors are "Arrows", Covectors are "Stacks of Planes".** A vector $v$ has a magnitude and a direction. A covector (or one-form) $\omega$ is best visualized as a set of parallel, equally spaced hyperplanes (lines in 2D, planes in 3D). The action $\omega(v)$ counts how many of these planes the vector $v$ pierces. Raising and lowering is the formal process of finding the unique "stack of planes" that corresponds to a given "arrow".

2.  **The Metric is the "Matchmaker".** A vector space $V$ and its dual $V^*$ are distinct spaces. The metric tensor provides a canonical, geometry-induced isomorphism between them. It's the rule that says, "for this specific arrow $v$, *this* specific stack of planes is its natural partner". Without a metric, there is no unique way to associate a covector with a vector.

3.  **Lowering is Projecting.** The formula $v_i = g_{ij}v^j$ can be thought of as taking the inner product of the vector $v$ with each basis vector $\mathbf{e}_i$. In non-orthogonal coordinate systems, this is a projection. The covariant component $v_i$ tells you how $v$ projects onto the $i$-th basis vector, taking the geometry of the space into account.

4.  **The Formula Structure is a Map.** Pay attention to the indices. The metric tensor always has two indices of the same type (both down for $g_{ij}$, both up for $g^{ij}$). When it operates on a tensor, it "grabs" one index and replaces it with another, moving it up or down in the process.
    $$
    v_i = g_{i\color{red}j} v^{\color{red}j} \quad \text{(The metric } g_{ij} \text{ lowers index } j \text{ to } i.)
    $$
    $$
    v^i = g^{i\color{red}j} v_{\color{red}j} \quad \text{(The inverse metric } g^{ij} \text{ raises index } j \text{ to } i.)
    $$
    The summed-over index (the "dummy" index, here $j$) is consumed in the operation.

## Worked example
Let's work in 2D Euclidean space using polar coordinates $(r, \theta)$. The metric tensor and its inverse are:
$$
g_{ij} = \begin{pmatrix} 1 & 0 \\ 0 & r^2 \end{pmatrix} \quad \text{and} \quad g^{ij} = \begin{pmatrix} 1 & 0 \\ 0 & 1/r^2 \end{pmatrix}
$$
Consider a vector field $A$ representing a rotational flow, with contravariant components $A^r = 0$ and $A^\theta = \omega$, where $\omega$ is a constant angular velocity. So, $A^i = (0, \omega)$.

Let's find the covariant components $A_i$ by lowering the index using $A_i = g_{ij}A^j$.

**Step 1: Write out the sum for the first component ($i=r$).**
The summation is over $j \in \{r, \theta\}$.
$$
A_r = g_{r j} A^j = g_{rr}A^r + g_{r\theta}A^\theta
$$

**Step 2: Substitute the known values.**
From the metric, $g_{rr}=1$ and $g_{r\theta}=0$. From the vector, $A^r=0$ and $A^\theta=\omega$.
$$
A_r = (1)(0) + (0)(\omega) = 0
$$

**Step 3: Write out the sum for the second component ($i=\theta$).**
$$
A_\theta = g_{\theta j} A^j = g_{\theta r}A^r + g_{\theta\theta}A^\theta
$$

**Step 4: Substitute the known values.**
From the metric, $g_{\theta r}=0$ and $g_{\theta\theta}=r^2$.
$$
A_\theta = (0)(0) + (r^2)(\omega) = \omega r^2
$$

**Result:** The covariant components are $A_i = (0, \omega r^2)$.

**Reflection:** The contravariant components $A^i=(0, \omega)$ describe the velocity in terms of coordinate displacements per unit time. The $\theta$ component is constant. The covariant components $A_i=(0, \omega r^2)$ represent the same physical vector, but as a covector. Notice that the magnitude of the covariant $\theta$-component, $\omega r^2$, is the angular momentum per unit mass, a physically distinct but related quantity. The metric tensor managed this conversion correctly, accounting for the fact that a displacement in $\theta$ corresponds to a larger physical distance as $r$ increases.

## Diagrams
This diagram illustrates the relationship between a vector $v$ and its dual covector $v_\flat$ (represented by its level sets) in a 2D space with an orthonormal basis (Euclidean metric, $g_{ij} = \delta_{ij}$). The metric makes the covector's planes orthogonal to the vector itself.

```text
       ^ y-axis / e_2
       |
       |         /
       |        / v_flat=2
       |       /
       |      / v_flat=1
       |     /
       |----* v
       |   /|`
       |  / |  `v_y (projection)
       | /  |    `
       |/   |      `
-------+----------------> x-axis / e_1
      /|   v_x
     / |
    /  v_flat=0
   /
  / v_flat=-1
 /
```
In this simple case, $v_x = g_{xx}v^x + g_{xy}v^y = 1 \cdot v^x + 0 \cdot v^y = v^x$. The covariant and contravariant components are identical. In a skewed (non-orthogonal) basis, the lines for $v_\flat$ would not be perpendicular to the vector $v$, and the components would differ. The metric tensor $g_{ij}$ contains the information about the dot products of the basis vectors ($g_{ij} = \mathbf{e}_i \cdot \mathbf{e}_j$) and thus encodes this skew.

## Memory technique — remember this forever
1.  **The Mnemonic:** Think of the metric tensor as an **elevator**.
    *   $g_{ij}$ has indices on the "ground floor" (downstairs). It takes other indices **down**.
    *   $g^{ij}$ has indices on the "top floor" (upstairs). It takes other indices **up**.
    *   To go from $v^j$ to $v_i$, you need an elevator going down: $g_{ij}$. The index $j$ gets on the elevator with $v^j$, gets summed over (disappears), and the index $i$ gets off on the ground floor.

2.  **Overlearn these formulas:**
    $$
    v_i = g_{ij} v^j \quad (\text{Lowering})
    $$
    $$
    v^i = g^{ij} v_j \quad (\text{Raising})
    $$
    $$
    g^{ik} g_{kj} = \delta^i_j \quad (\text{Inverse Definition})
    $$

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-derive the raising/lowering rules from the definition of the inner product.
    *   Day 3: Do the worked example again from scratch, without looking.
    *   Day 7: Find the metric for 3D spherical coordinates and lower the index of a radial vector.
    *   Day 16: Explain to an imaginary student why $g^{ij}$ is not simply $1/g_{ij}$.
    *   Day 35: Prove that $g^{ij} A_i B_j = g_{ij} A^i B^j$.

4.  **First Principles Pathway:** If you forget everything, remember this: **The covector associated with $v$ is the object that, when fed any vector $u$, produces the scalar inner product $g(v, u)$**.
    *   Write this statement in index notation: $v_\alpha u^\alpha = g_{\beta \alpha} v^\beta u^\alpha$.
    *   The $u^\alpha$ is a placeholder that can be any vector. Therefore, the coefficients must be equal.
    *   $v_\alpha = g_{\beta \alpha} v^\beta$. Relabel indices to the conventional $v_i = g_{ij}v^j$. You have just re-derived the lowering rule from the definition of the inner product.

## Common mistakes
1.  **Incorrectly inverting the metric.** For a non-diagonal metric, $g^{ij}$ is the **matrix inverse**, not the element-wise reciprocal. For $g_{ij} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, $g^{ij}$ is $\frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$, not $\begin{pmatrix} 1/a & 1/b \\ 1/c & 1/d \end{pmatrix}$.
2.  **Summing over the wrong index.** In $v_i = g_{ij}v^j$, the index $j$ is the "dummy" index being summed over. It must appear once up, once down. An expression like $g_{ij}v_j$ is syntactically incorrect.
3.  **Confusing components with the object.** The vector $v$ and the covector $v_\flat$ are distinct mathematical objects, though they represent the same physical entity. The components $v^i$ and $v_i$ are just their coordinate representations. Don't think of $v^i$ and $v_i$ as two different vectors.
4.  **Assuming the metric is the identity matrix.** In Cartesian coordinates, $g_{ij} = \delta_{ij}$, so $v_i = \delta_{ij}v^j = v^i$. The distinction between covariant and contravariant components vanishes. Many students get used to this and forget that in almost any other coordinate system, $v_i \neq v^i$.

## Self-check
1.  In 3D spherical coordinates $(r, \theta, \phi)$, the metric is diagonal with components $g_{rr}=1$, $g_{\theta\theta}=r^2$, and $g_{\phi\phi}=r^2\sin^2\theta$. A velocity vector has contravariant components $V^i = (v_r, v_\theta, v_\phi)$. Find its covariant components $V_i$.
2.  Consider a 2D spacetime with the non-diagonal metric $g_{\mu\nu} = \begin{pmatrix} -1 & 1/2 \\ 1/2 & 1 \end{pmatrix}$. First, find the inverse metric $g^{\mu\nu}$. Then, given a covector $F_\mu = (E, 0)$, find its contravariant components $F^\mu$.
3.  Using only the definitions $v_i = g_{ij}v^j$, $v^i = g^{ij}v_j$, and $g^{ik}g_{kj}=\delta^i_j$, prove that raising an index and then immediately lowering it returns the original components. That is, show that if you define an intermediate vector $A^i = g^{ij}B_j$, then calculating $g_{ki}A^i$ gives you back $B_k$.