## What it is
Covariant and contravariant components are two different ways of representing a vector's coordinates when using a non-orthogonal basis (a "skewed" grid). Contravariant components, written with superscripts like $v^i$, behave like standard coordinates and scale inversely to the basis vectors. Covariant components, written with subscripts like $v_i$, are projections that scale along with the basis vectors.

## Why it matters
This distinction is the bedrock of tensor analysis, which is the language of General Relativity, describing gravity as the curvature of spacetime. In aerospace, it's essential for describing motion and forces in non-inertial or rotating reference frames, such as on a satellite. In machine learning, the concept appears in "information geometry," which treats probability distributions as points on a manifold, where the metric tensor defines distances between them.

## When to study it
You must have a solid command of university-level linear algebra. Specifically: vector spaces, basis vectors, change of basis matrices, and the concept of a dual space (the space of all linear functionals on a vector space). If the term "dual space" is unfamiliar, pause and study that first; otherwise, the origin of covariant components will be opaque.

## How to study it (step by step)
1.  **Build Geometric Intuition:** Take graph paper. Draw standard orthogonal axes. Now draw a vector $\vec{v}$. Easy. Now, draw a new set of basis vectors, $\vec{e}_1$ and $\vec{e}_2$, that are not at 90 degrees to each other. How do you represent $\vec{v}$ as a sum $v^1 \vec{e}_1 + v^2 \vec{e}_2$? Use the parallelogram rule to find the components $v^1, v^2$. Notice how these numbers change as you make the basis vectors longer or shorter.
2.  **Derive Contravariant Transformation:** Formalize step 1. Let $\{\vec{e}_i\}$ be your old basis and $\{\vec{e}'_j\}$ be your new basis, related by a transformation matrix $A$: $\vec{e}'_j = \sum_i A^i_j \vec{e}_i$. Since the vector $\vec{v}$ itself is an invariant object, we must have $\vec{v} = \sum_i v^i \vec{e}_i = \sum_j v'^j \vec{e}'_j$. Substitute the basis transformation rule into this equation and solve for $v'^j$ in terms of $v^i$. You will find that the components transform via the *inverse* of the matrix $A$.
3.  **Introduce the Dual Basis:** The dual basis vectors $\{\vec{e}^i\}$ are defined by the property $\vec{e}^i \cdot \vec{e}_j = \delta^i_j$ (the Kronecker delta). For a non-orthogonal basis, the dual basis vectors are not parallel to the original basis vectors. Calculate the dual basis for the skewed grid you drew in step 1.
4.  **Derive Covariant Transformation:** The covariant components of a vector $\vec{v}$ are defined as the dot products with the basis vectors: $v_i = \vec{v} \cdot \vec{e}_i$. (Note: some conventions use the dual basis here, $v_i = \vec{v} \cdot \vec{e}^i$. We will stick to the former for now as it connects to the metric tensor more directly, but be aware of the different conventions). See how these components transform under the same change of basis as step 2. You will find they transform using the matrix $A$ itself, not its inverse.
5.  **Connect with the Metric Tensor:** The metric tensor's components are defined as $g_{ij} = \vec{e}_i \cdot \vec{e}_j$. Show that you can use the metric to convert between component types: $v_i = \sum_j g_{ij} v^j$. This is called "lowering the index." The inverse metric, $g^{ij}$, "raises the index": $v^i = \sum_j g^{ij} v_j$.

## Key ideas, with intuition
1.  **Vectors are Invariant, Components are Not.** A vector, like a displacement from point P to Q, is a real geometric object. Its components are just shadows it casts on a chosen set of basis vectors. If you change your basis (your coordinate system), the shadows change, but the vector does not. The entire formalism of co- and contravariance is designed to track how the components must change to ensure the underlying vector remains the same.

2.  **Contravariant = Coordinates.** Think of contravariant components $v^i$ as telling you "how many steps" to take along each basis vector $\vec{e}_i$ to get to the tip of the vector $\vec{v}$.
    $$ \vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2 + ... = \sum_i v^i \vec{e}_i $$
    If you stretch a basis vector $\vec{e}_1 \to 2\vec{e}_1$, you only need to take *half* as many steps along it to get to the same place. The component $v^1 \to \frac{1}{2}v^1$ varies *contra* (against) the basis vector.

3.  **Covariant = Projections.** Think of covariant components $v_i$ as the result of projecting the vector $\vec{v}$ onto the basis vectors.
    $$ v_i = \vec{v} \cdot \vec{e}_i $$
    If you stretch a basis vector $\vec{e}_1 \to 2\vec{e}_1$, its dot product with $\vec{v}$ also doubles. The component $v_1 \to 2v_1$ varies *co* (with) the basis vector. In an orthogonal basis, where $\vec{e}_i \cdot \vec{e}_j = \delta_{ij}$, the two types of components are identical. The distinction only becomes meaningful for non-orthogonal (skewed) or curvilinear coordinate systems.

4.  **The Metric Tensor is the Rosetta Stone.** The metric tensor $g_{ij} = \vec{e}_i \cdot \vec{e}_j$ encodes all the geometric information about the basis—the lengths of the basis vectors and the angles between them. It is the machine that translates between the contravariant and covariant descriptions of the same vector.
    $$ v_i = \sum_j g_{ij} v^j $$

## Worked example
Let's work in 2D Euclidean space. The standard Cartesian basis is $\hat{x}, \hat{y}$. Consider a vector $\vec{v} = 3\hat{x} + 2\hat{y}$.

Now, let's switch to a non-orthogonal basis:
$\vec{e}_1 = 2\hat{x}$
$\vec{e}_2 = \hat{x} + \hat{y}$

**Step 1: Find the contravariant components of $\vec{v}$ in the new basis.**
We want to find $v^1, v^2$ such that $\vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2$.
$$ 3\hat{x} + 2\hat{y} = v^1(2\hat{x}) + v^2(\hat{x} + \hat{y}) $$
$$ 3\hat{x} + 2\hat{y} = (2v^1 + v^2)\hat{x} + (v^2)\hat{y} $$
Equating components:
- For $\hat{y}$: $v^2 = 2$.
- For $\hat{x}$: $3 = 2v^1 + v^2 \implies 3 = 2v^1 + 2 \implies 2v^1 = 1 \implies v^1 = 1/2$.
So, the contravariant components are $(v^1, v^2) = (1/2, 2)$. The vector is $\vec{v} = \frac{1}{2}\vec{e}_1 + 2\vec{e}_2$.

**Step 2: Find the covariant components of $\vec{v}$ in the new basis.**
The definition is $v_i = \vec{v} \cdot \vec{e}_i$.
$$ v_1 = \vec{v} \cdot \vec{e}_1 = (3\hat{x} + 2\hat{y}) \cdot (2\hat{x}) = 3 \cdot 2 = 6 $$
$$ v_2 = \vec{v} \cdot \vec{e}_2 = (3\hat{x} + 2\hat{y}) \cdot (\hat{x} + \hat{y}) = 3 \cdot 1 + 2 \cdot 1 = 5 $$
So, the covariant components are $(v_1, v_2) = (6, 5)$.

**Step 3: Verify with the metric tensor.**
First, compute the metric tensor components $g_{ij} = \vec{e}_i \cdot \vec{e}_j$.
$$ g_{11} = \vec{e}_1 \cdot \vec{e}_1 = (2\hat{x}) \cdot (2\hat{x}) = 4 $$
$$ g_{12} = \vec{e}_1 \cdot \vec{e}_2 = (2\hat{x}) \cdot (\hat{x} + \hat{y}) = 2 $$
$$ g_{21} = \vec{e}_2 \cdot \vec{e}_1 = (\hat{x} + \hat{y}) \cdot (2\hat{x}) = 2 $$
$$ g_{22} = \vec{e}_2 \cdot \vec{e}_2 = (\hat{x} + \hat{y}) \cdot (\hat{x} + \hat{y}) = 1+1 = 2 $$
So, the metric tensor is $g_{ij} = \begin{pmatrix} 4 & 2 \\ 2 & 2 \end{pmatrix}$.

Now, let's lower the index of $v^j$ to get $v_i$: $v_i = \sum_j g_{ij} v^j$.
$$ v_1 = g_{11}v^1 + g_{12}v^2 = 4(1/2) + 2(2) = 2 + 4 = 6 $$
$$ v_2 = g_{21}v^1 + g_{22}v^2 = 2(1/2) + 2(2) = 1 + 4 = 5 $$
This matches our direct calculation of the covariant components.

*Reflection:* The contravariant components $(1/2, 2)$ tell us "how to build" the vector as a linear combination of the basis vectors. The covariant components $(6, 5)$ tell us the size of the vector's projection onto those same basis vectors. The metric tensor successfully converted between these two descriptions.

## Diagrams
Contravariant components are found by parallelogram projection.

```text
       ^ y
       |
       |      / e_2
       |     /
       |----/-----> v
       |   /|
       |  / |
       | /  |
       |/   |
   ----+----------------> x
       |   e_1

To get to the tip of v, you go v^1 units along e_1, then v^2 units parallel to e_2.
```

Covariant components are found by orthogonal projection onto the *dual basis* vectors (or, equivalently, by dot product with the basis vectors). In a non-orthogonal basis, the dual basis vectors $\vec{e}^i$ are not parallel to the original $\vec{e}_i$. The dual basis is defined by $\vec{e}^i \cdot \vec{e}_j = \delta^i_j$.

```text
       ^ y
       |
       |    e^1     / e_2
       |     \     /
       |      \   /
       |       \ /
       |--------X-----> v
       |       / \
       |      /   \
       |     /     \ e^2
   ----+----------------> x
       |   e_1

The covariant component v_1 is the projection of v onto e_1.
v_1 = |v| |e_1| cos(theta). This is simply v . e_1.
Similarly for v_2 = v . e_2.
```

## Memory technique — remember this forever
1.  **Mnemonic:**
    - **Co**variant components have indices that are **lo**w (subscripts, $v_i$). They transform *with* the basis (**co**-variant).
    - **Contra**variant components have indices that are **high** (superscripts, $v^i$). They transform *against* the basis (**contra**-variant).
    - Visualize a see-saw. The basis vector $\vec{e}_i$ is on one side, the component $v^i$ is on the other. If $\vec{e}_i$ goes up (gets longer), $v^i$ must go down (get smaller) to keep the see-saw (the vector $\vec{v}$) balanced.

2.  **Formulas to Overlearn:**
    - The vector itself: $\vec{v} = \sum_i v^i \vec{e}_i$
    - The covariant components: $v_i = \vec{v} \cdot \vec{e}_i$
    - The metric tensor: $g_{ij} = \vec{e}_i \cdot \vec{e}_j$ and its role: $v_i = \sum_j g_{ij} v^j$

3.  **Spaced Repetition Schedule:**
    - Review these definitions and re-derive the worked example in: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it. Re-work it from a blank sheet of paper.

4.  **First Principles Pathway:**
    If you forget everything, remember this one fact: the vector $\vec{v}$ itself does not change when you change your basis. Start with the invariance equation:
    $$ \vec{v} = \sum_i v^i \vec{e}_i = \sum_j v'^j \vec{e}'_j $$
    And the definition of a basis change: $\vec{e}'_j = \sum_i A^i_j \vec{e}_i$. Substitute the second into the first and use the linear independence of the basis vectors $\{\vec{e}_i\}$ to find the transformation rule for $v^i$. Everything else can be rebuilt from there.

## Common mistakes
1.  **Confusing the component with the basis vector.** A vector is written $\vec{v} = v^i \vec{e}_i$. The superscript on $v^i$ tells you it's a contravariant *component*. The subscript on $\vec{e}_i$ tells you it's a basis vector. Don't mix them up.
2.  **Assuming orthogonality.** In a standard Cartesian grid, $g_{ij} = \delta_{ij}$, so $v_i = v^i$. All the complexity vanishes. Students often implicitly assume this property holds in general, but it only holds for orthonormal bases.
3.  **Index gymnastics without understanding.** It's easy to learn the rules for raising and lowering indices ($v_i = g_{ij}v^j$) but forget the geometric meaning: you are converting between a "coordinate-like" representation and a "projection-like" representation of the exact same vector.
4.  **Believing this is only for curved space.** This entire formalism is necessary for *any* non-orthogonal basis, even in perfectly flat Euclidean space, as the worked example showed. Curvature is an additional complexity built on top of this foundation.

## Self-check
1.  Consider the 2D basis $\vec{e}_1 = (1, 1)$ and $\vec{e}_2 = (1, -1)$. For the vector $\vec{v} = (3, 1)$, find its contravariant components, its covariant components, and the metric tensor in this basis. Verify that $v_i = g_{ij}v^j$.
2.  If you scale a basis by a constant factor, so $\vec{e}'_i = k \vec{e}_i$ (no sum), what happens to the contravariant components $v'^i$? What happens to the covariant components $v'_i$? Explain why this matches the "contra" and "co" naming scheme.
3.  The scalar product (dot product) of two vectors $\vec{u}$ and $\vec{v}$ is an invariant scalar. Show that its value can be computed as $\sum_i u^i v_i$. Using the transformation laws you derived, prove that this quantity is indeed the same in any basis, i.e., $\sum_i u^i v_i = \sum_j u'^j v'_j$.