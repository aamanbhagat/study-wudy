## What it is
The Rank-Nullity Theorem states that for a linear transformation $T$ from a finite-dimensional vector space $V$ to a vector space $W$, the dimension of the domain $V$ is the sum of the dimension of its kernel (nullity) and the dimension of its image (rank). Formally, if $T: V \to W$, then $\text{rank}(T) + \text{nullity}(T) = \dim(V)$.

## Why it matters
This theorem provides a fundamental "conservation law" for dimensions under a linear map. In machine learning, it's used in dimensionality reduction techniques like Principal Component Analysis (PCA) to understand how much information is preserved versus discarded. In physics and engineering, it helps analyze systems of linear equations, ensuring that solutions exist and are unique, which is critical for modeling everything from electrical circuits to stress in a rocket fuselage.

## When to study it
You must be comfortable with the following concepts before tackling this proof. If any of these are weak, review them first.
*   **Vector Spaces and Subspaces:** The definitions and properties.
*   **Linear Transformations:** The definition of linearity, $T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u})+T(\mathbf{v})$ and $T(c\mathbf{v}) = cT(\mathbf{v})$.
*   **Kernel (Null Space) and Image (Range):** You must know that $\text{ker}(T)$ is a subspace of the domain $V$ and $\text{im}(T)$ is a subspace of the codomain $W$.
*   **Basis and Dimension:** The definition of a basis (linearly independent and spanning set) and dimension.
*   **Basis Extension Theorem:** The fact that any linearly independent set in a finite-dimensional vector space can be extended to a basis for that space.

## How to study it (step by step)
1.  **State the Goal:** Write down the theorem: For a linear map $T: V \to W$ where $\dim(V) = n$, we want to prove $\dim(\text{im}(T)) + \dim(\text{ker}(T)) = n$.
2.  **The Core Strategy:** Read the standard proof. The strategy is to construct a basis for the domain $V$ in a clever way that connects the kernel and the image. Specifically, you start with a basis for the kernel and extend it to a basis for all of $V$.
3.  **Prove the Spanning Part:** Take the basis you constructed for $V$. Apply the transformation $T$ to each basis vector. Show that the resulting set of vectors in $W$ spans the image, $\text{im}(T)$. This is the first half of showing it's a basis for the image.
4.  **Prove the Linear Independence Part:** Now, show that the set of non-zero vectors from the previous step (the images of the basis vectors *not* in the kernel) is linearly independent. This is the more subtle part of the proof.
5.  **Count the Dimensions:** Once you've proven you have a basis for $\text{im}(T)$, count how many vectors are in it. Relate this count (the rank) and the count of your kernel basis vectors (the nullity) back to the total number of vectors in your basis for $V$ (the dimension of $V$). The equation will fall out directly.
6.  **Work a Concrete Example:** Take a $3 \times 3$ matrix with rank 2. Find a basis for its null space (nullity 1) and its column space (rank 2). Verify that $1+2=3$. Trace the steps of the proof with your concrete basis vectors.

## Key ideas, with intuition
1.  **Conservation of Dimension:** Think of a linear transformation as a process that takes the "information" in the domain $V$ and maps it to the codomain $W$. The Rank-Nullity theorem says that no dimension is truly lost. Each dimension of $V$ either gets "crushed" into the zero vector (and thus contributes to the nullity) or it "survives" to become a dimension in the image (and contributes to the rank).

2.  **Building a Smart Basis:** The entire proof hinges on a clever choice of basis for the domain $V$. We don't just pick any basis. We start by building a basis for the kernel, a subspace of $V$. Let's say the nullity is $k$, so we have a basis $\{\mathbf{u}_1, \dots, \mathbf{u}_k\}$ for $\text{ker}(T)$. Since these vectors are in $V$, we can extend this set to a full basis for $V$:
    $$
    \mathcal{B}_V = \{ \underbrace{\mathbf{u}_1, \dots, \mathbf{u}_k}_{\text{basis for ker}(T)}, \underbrace{\mathbf{v}_1, \dots, \mathbf{v}_{n-k}}_{\text{the extension}} \}
    $$
    This construction splits the domain's basis into two parts: the part that gets sent to zero, and the part that doesn't.

3.  **The Image is Built from the "Non-Kernel" Part:** What happens when we apply $T$ to our smart basis?
    *   $T(\mathbf{u}_i) = \mathbf{0}$ for $i=1, \dots, k$, by definition of the kernel. These vectors contribute nothing to the image.
    *   The vectors $\{T(\mathbf{v}_1), \dots, T(\mathbf{v}_{n-k})\}$ are what remain. The proof's main job is to show that this set is a basis for $\text{im}(T)$. If it is, then the dimension of the image (the rank) is $n-k$.
    *   The final calculation is then: $\text{rank} + \text{nullity} = (n-k) + k = n = \dim(V)$.

## Worked example
Let's prove the theorem.

**Theorem:** Let $T: V \to W$ be a linear transformation, with $V$ a finite-dimensional vector space. Then $\text{rank}(T) + \text{nullity}(T) = \dim(V)$.

**Proof:**

1.  **Setup:** Let $\dim(V) = n$. Let $\text{ker}(T)$ be the kernel of $T$ and $\text{im}(T)$ be the image of $T$. Let $\dim(\text{ker}(T)) = k$. Since $\text{ker}(T)$ is a subspace of $V$, we know $0 \le k \le n$.

2.  **Construct a Basis:** Choose a basis for $\text{ker}(T)$. Let this basis be $\mathcal{B}_{\text{ker}} = \{\mathbf{u}_1, \dots, \mathbf{u}_k\}$.
    By the Basis Extension Theorem, we can extend this linearly independent set to form a basis for the entire domain $V$. Let this extended basis be:
    $$
    \mathcal{B}_V = \{ \mathbf{u}_1, \dots, \mathbf{u}_k, \mathbf{v}_1, \dots, \mathbf{v}_{n-k} \}
    $$
    There are $k + (n-k) = n$ vectors in this basis, as expected.

3.  **Claim:** The set $S = \{ T(\mathbf{v}_1), \dots, T(\mathbf{v}_{n-k}) \}$ is a basis for $\text{im}(T)$.
    To prove this claim, we must show that $S$ spans $\text{im}(T)$ and is linearly independent.

4.  **Show $S$ spans $\text{im}(T)$:**
    Let $\mathbf{w}$ be an arbitrary vector in $\text{im}(T)$. By definition of the image, there exists some $\mathbf{x} \in V$ such that $T(\mathbf{x}) = \mathbf{w}$.
    Since $\mathcal{B}_V$ is a basis for $V$, we can write $\mathbf{x}$ as a linear combination of the basis vectors:
    $$
    \mathbf{x} = \sum_{i=1}^k c_i \mathbf{u}_i + \sum_{j=1}^{n-k} d_j \mathbf{v}_j
    $$
    Now apply $T$ to $\mathbf{x}$:
    $$
    \mathbf{w} = T(\mathbf{x}) = T\left(\sum_{i=1}^k c_i \mathbf{u}_i + \sum_{j=1}^{n-k} d_j \mathbf{v}_j\right)
    $$
    By linearity of $T$:
    $$
    \mathbf{w} = \sum_{i=1}^k c_i T(\mathbf{u}_i) + \sum_{j=1}^{n-k} d_j T(\mathbf{v}_j)
    $$
    Since each $\mathbf{u}_i$ is in the kernel, $T(\mathbf{u}_i) = \mathbf{0}$. The first sum vanishes.
    $$
    \mathbf{w} = \sum_{j=1}^{n-k} d_j T(\mathbf{v}_j)
    $$
    This shows that any vector $\mathbf{w}$ in the image can be written as a linear combination of the vectors in $S$. Thus, $S$ spans $\text{im}(T)$.

5.  **Show $S$ is linearly independent:**
    Consider a linear combination of vectors in $S$ that equals the zero vector:
    $$
    \sum_{j=1}^{n-k} d_j T(\mathbf{v}_j) = \mathbf{0}_W
    $$
    By linearity, we can rewrite this as:
    $$
    T\left(\sum_{j=1}^{n-k} d_j \mathbf{v}_j\right) = \mathbf{0}_W
    $$
    This means the vector $\mathbf{z} = \sum_{j=1}^{n-k} d_j \mathbf{v}_j$ is in the kernel of $T$.
    Since $\mathbf{z} \in \text{ker}(T)$, it must be expressible as a linear combination of the basis vectors for the kernel, $\{\mathbf{u}_1, \dots, \mathbf{u}_k\}$:
    $$
    \mathbf{z} = \sum_{i=1}^k c_i \mathbf{u}_i
    $$
    Combining these two expressions for $\mathbf{z}$:
    $$
    \sum_{j=1}^{n-k} d_j \mathbf{v}_j = \sum_{i=1}^k c_i \mathbf{u}_i \implies \sum_{j=1}^{n-k} d_j \mathbf{v}_j - \sum_{i=1}^k c_i \mathbf{u}_i = \mathbf{0}_V
    $$
    This is a linear combination of all the vectors in our basis for $V$, $\mathcal{B}_V$. Since a basis is by definition linearly independent, all coefficients must be zero. Therefore, all $d_j = 0$ and all $c_i = 0$.
    Since all $d_j = 0$, the original linear combination was trivial, proving that the set $S$ is linearly independent.

6.  **Conclusion:**
    We have shown that $S = \{ T(\mathbf{v}_1), \dots, T(\mathbf{v}_{n-k}) \}$ is a basis for $\text{im}(T)$. The number of vectors in this basis is $n-k$.
    Therefore, $\text{rank}(T) = \dim(\text{im}(T)) = n-k$.
    We started by defining $\text{nullity}(T) = \dim(\text{ker}(T)) = k$.
    Summing them gives:
    $$
    \text{rank}(T) + \text{nullity}(T) = (n-k) + k = n
    $$
    Since $n = \dim(V)$, we have proven that $\text{rank}(T) + \text{nullity}(T) = \dim(V)$.

**Reflection:** Each step was necessary. Constructing the special basis in step 2 was the key that unlocked the entire proof. Steps 4 and 5 were the standard two-part process for proving a set is a basis. Step 6 was just counting and putting the pieces together.

## Diagrams
Here is a diagram illustrating the mapping.

```text
       V (Domain, dim=n)                     W (Codomain)
   +-------------------------+             +----------------------+
   |                         |             |                      |
   |   +-----------------+   |             |                      |
   |   | ker(T) (dim=k)  |   |             |   im(T) (dim=n-k)    |
   |   | u_1, ..., u_k   |   |     T       |  +----------------+  |
   |   +-----------------+   | -------->   |  | w=T(v)         |  |
   |                         |             |  |                |  |
   |   v_1, ..., v_{n-k}     |             |  |                |  |
   |                         |             |  +----------------+  |
   |                         |             |         ^            |
   +-------------------------+             |        /             |
                                           |       /              |
                                           +------0_W-------------+

```
**Description:** The space $V$ on the left contains the kernel as a subspace. All vectors in $\text{ker}(T)$ are mapped by $T$ to the single zero vector $\mathbf{0}_W$ in $W$. The other basis vectors of $V$ (the $\mathbf{v}_j$'s) are mapped to vectors that form a basis for the image, $\text{im}(T)$, which is a subspace of $W$. The entire space $V$ is mapped *onto* the subspace $\text{im}(T)$.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** "The Dimension Budget". Imagine the dimension of your domain $V$ is a fixed budget, $n$. A linear transformation $T$ is a project manager that must spend this budget. Every dimension is either "spent" on creating the output image (the rank) or "wasted" by being mapped to zero (the nullity). The budget must be perfectly balanced: $\text{Rank} + \text{Nullity} = \text{Total Budget}$.

2.  **Must-know formulas:**
    $$
    \text{rank}(T) + \text{nullity}(T) = \dim(\text{domain})
    $$
    $$
    \text{rank}(T) = \dim(\text{im}(T))
    $$
    $$
    \text{nullity}(T) = \dim(\text{ker}(T))
    $$

3.  **Spaced Repetition Schedule:** Review the proof and this summary sheet at:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the theorem, you can re-derive it.
    *   Start with the goal: Relate dimensions of kernel, image, and domain.
    *   The key idea: A basis for the kernel can be extended to a basis for the whole domain. Write it out: $\mathcal{B}_V = \{\text{kernel basis}\} \cup \{\text{extension vectors}\}$.
    *   Apply $T$ to this basis. The kernel part goes to zero.
    *   Prove the images of the extension vectors form a basis for the image. (Show spanning, then linear independence).
    *   Count the vectors. $\dim(\text{domain}) = (\# \text{kernel vectors}) + (\# \text{extension vectors})$. You just proved $\text{rank} = (\# \text{extension vectors})$. Substitute and you're done.

## Common mistakes
1.  **Confusing Codomain with Image:** The theorem is $\text{rank}(T) + \text{nullity}(T) = \dim(V)$, NOT $\dim(W)$. The rank is the dimension of the image, $\text{im}(T)$, which is a subspace of $W$. It's possible that $\dim(\text{im}(T)) < \dim(W)$.
2.  **Forgetting Finite-Dimensionality:** The theorem as stated applies to finite-dimensional domain spaces $V$. While the concepts can be extended, this proof relies entirely on the ability to construct finite bases.
3.  **Error in the Independence Proof:** In the proof of linear independence for the image basis, a common error is to stop after showing $T(\sum d_j \mathbf{v}_j) = \mathbf{0}$. You must then use this to conclude that $\sum d_j \mathbf{v}_j$ is in the kernel, and then use the properties of the full basis $\mathcal{B}_V$ to show that all the $d_j$ must be zero.

## Self-check
1.  Let $T: \mathbb{R}^5 \to \mathbb{R}^4$ be a linear transformation. If $T$ is surjective (onto), what is the dimension of its kernel?
2.  Let $A$ be a $7 \times 9$ matrix representing a linear map from $\mathbb{R}^9$ to $\mathbb{R}^7$. What are the maximum and minimum possible values for the nullity of $A$?
3.  Prove that a linear transformation $T: V \to W$ between two vector spaces of the *same* finite dimension $n$ is injective if and only if it is surjective. Use the Rank-Nullity Theorem.