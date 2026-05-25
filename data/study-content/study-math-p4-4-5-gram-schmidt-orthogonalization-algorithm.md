## 1. What it is — in plain English

Imagine you have a bunch of slightly crooked, different-sized sticks leaning against each other in a corner. They're a bit messy, and it's hard to tell how much space each one truly takes up independently. Gram-Schmidt orthogonalization is like a neatening-up process for these sticks, which we call "vectors" in mathematics.

First, you pick one stick and make it perfectly straight, pointing in its original direction, and you trim it to a standard, easy-to-measure length (let's say, 1 unit). This is your first "standard" stick.

Next, you take a second stick. This stick might be leaning on the first one a bit. Gram-Schmidt tells you to figure out exactly how much of that second stick is "shadowed" by the first standard stick. You then remove that "shadow" part from the second stick, so what's left is a new stick that's perfectly perpendicular (at a 90-degree angle) to your first standard stick. Then, you trim this new, perpendicular stick to that same standard length of 1 unit.

You repeat this process for every remaining stick: for each new stick, you remove all the parts that are "shadowed" by *all* the previously standardized and perpendicular sticks. Once you've removed all those overlapping parts, the remaining piece will be perfectly perpendicular to *all* the sticks you've already processed. Finally, you trim it to the standard length. By the end, you have a set of sticks all pointing in completely independent directions (they're all perpendicular to each other), and they're all the same standard length. This makes them much easier to work with.

## 2. Why it matters — real-world applications

Gram-Schmidt orthogonalization is a fundamental algorithm in linear algebra with wide-ranging practical applications because it transforms a "messy" set of vectors into a "clean" set that is much easier to analyze and compute with.

1.  **Machine Learning and Data Analysis (Principal Component Analysis - PCA):** In machine learning, especially for dimensionality reduction techniques like PCA, Gram-Schmidt can be used to construct orthogonal bases. PCA aims to find the directions (principal components) in data along which variance is maximized. While PCA typically uses Singular Value Decomposition (SVD) or eigenvalue decomposition, the underlying concept of finding orthogonal directions that capture data variance is closely related to what Gram-Schmidt achieves. For instance, in analyzing high-dimensional datasets (e.g., customer demographics, image features), Gram-Schmidt ensures that the features or components derived are independent, preventing redundant information and simplifying models.
2.  **Signal Processing (Noise Reduction and Compression):** In telecommunications and audio processing, signals are often represented as vectors. When you have multiple signals or measurements, some might be correlated or contain noise that overlaps with the actual signal. Gram-Schmidt can be used to decompose these signals into orthogonal components. This allows engineers to isolate distinct signal components, separate noise from the desired signal, or compress data by representing it more efficiently in an orthogonal basis, which is crucial for efficient data transmission and storage.
3.  **Numerical Stability in Computations (QR Decomposition):** Many scientific and engineering simulations involve solving large systems of linear equations or finding eigenvalues. A key numerical method for these tasks is QR decomposition, which factorizes a matrix $A$ into an orthogonal matrix $Q$ and an upper triangular matrix $R$. Gram-Schmidt is one of the primary algorithms used to compute this QR decomposition. This is vital in fields like aerospace engineering (e.g., simulating fluid dynamics around aircraft, optimizing flight paths) or structural analysis, where numerical stability and accuracy are paramount to avoid catastrophic errors in complex calculations.
4.  **Quantum Mechanics and Physics:** In quantum mechanics, the states of a system are often represented by vectors in a Hilbert space. Observables (like energy or momentum) correspond to operators, and their eigenstates (the states where the observable has a definite value) must form an orthonormal basis. Gram-Schmidt is used to construct such orthonormal bases from a set of linearly independent eigenstates, simplifying calculations involving probabilities and expectations of physical quantities. For example, in atomic physics, calculating electron orbital shapes and energies often relies on having an orthonormal basis of wavefunctions.

## 3. Prerequisites — what you must know first

Before diving into Gram-Schmidt orthogonalization, ensure you have a solid understanding of the following concepts:

*   **Vectors:** An ordered list of numbers representing a magnitude and direction, often visualized as arrows in space.
*   **Vector Spaces:** A collection of vectors that can be added together and multiplied by scalars, satisfying certain axioms.
*   **Subspaces:** A subset of a vector space that is itself a vector space.
*   **Linear Combination:** A sum of scalar multiples of vectors, e.g., $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k$.
*   **Span:** The set of all possible linear combinations of a given set of vectors.
*   **Linear Independence:** A set of vectors is linearly independent if no vector in the set can be written as a linear combination of the others.
*   **Basis:** A set of linearly independent vectors that span a vector space (or subspace).
*   **Dot Product (Inner Product):** A scalar operation between two vectors that measures their "alignment" and is used to define length and angle. For $\mathbf{u} = (u_1, \dots, u_n)$ and $\mathbf{v} = (v_1, \dots, v_n)$, $\mathbf{u} \cdot \mathbf{v} = u_1v_1 + \dots + u_nv_n$.
*   **Magnitude (Norm) of a Vector:** The "length" of a vector, calculated as the square root of its dot product with itself, denoted as $||\mathbf{v}|| = \sqrt{\mathbf{v} \cdot \mathbf{v}}$.
*   **Unit Vector:** A vector with a magnitude of 1. To normalize a vector $\mathbf{v}$ (turn it into a unit vector), you divide it by its magnitude: $\hat{\mathbf{v}} = \frac{\mathbf{v}}{||\mathbf{v}||}$.
*   **Orthogonal Vectors:** Two vectors $\mathbf{u}$ and $\mathbf{v}$ are orthogonal (perpendicular) if their dot product is zero: $\mathbf{u} \cdot \mathbf{v} = 0$.
*   **Orthonormal Vectors:** A set of vectors that are all unit vectors and are all mutually orthogonal to each other.
*   **Projection of a Vector onto Another Vector:** The component of one vector that lies in the direction of another. The projection of $\mathbf{v}$ onto $\mathbf{u}$ is given by $\text{proj}_{\mathbf{u}} \mathbf{v} = \frac{\mathbf{v} \cdot \mathbf{u}}{||\mathbf{u}||^2} \mathbf{u}$.

## 4. The core idea — step by step

The Gram-Schmidt orthogonalization process takes a basis (a set of linearly independent vectors) for a vector space or subspace and transforms it into an orthonormal basis for that same space. This means the new vectors will all be unit length (normalized) and mutually perpendicular (orthogonal).

Let's say we have a basis $B = \{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$ for some subspace $W$. Our goal is to find an orthonormal basis $O = \{\mathbf{u}_1, \mathbf{u}_2, \ldots, \mathbf{u}_k\}$ for $W$.

### Step 1: Normalize the first vector

**Plain-English Statement:** Pick the first vector from your original set. This will be the direction of your first new, standard vector. Just make it unit length.

**Small Concrete Example:** If your first vector is $\mathbf{v}_1 = (3, 4)$, its length is $\sqrt{3^2 + 4^2} = \sqrt{9+16} = \sqrt{25} = 5$. To make it unit length, you divide each component by 5, resulting in $\mathbf{u}_1 = (3/5, 4/5)$.

**Formal/Mathematical Version:**
Let $\mathbf{u}_1$ be the first vector in our orthonormal basis. We obtain it by normalizing $\mathbf{v}_1$:
$$ \mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} $$

**What could go wrong:** Forgetting to normalize, or incorrectly calculating the magnitude. This would lead to vectors that are orthogonal but not orthonormal.

### Step 2: Make the second vector orthogonal to the first, then normalize

**Plain-English Statement:** Take your second original vector. It probably has a component that points in the same direction as your *new* first standard vector ($\mathbf{u}_1$). You need to remove that component. Imagine the shadow of $\mathbf{v}_2$ cast by a light source perpendicular to $\mathbf{u}_1$. You subtract that shadow. What's left is a vector that's guaranteed to be perpendicular to $\mathbf{u}_1$. Then, just like before, make this new perpendicular vector unit length.

**Small Concrete Example:** Suppose $\mathbf{v}_1 = (1, 0)$ and $\mathbf{v}_2 = (1, 1)$.
From Step 1, $\mathbf{u}_1 = (1, 0)$.
Now, we need to find the part of $\mathbf{v}_2$ that points in the direction of $\mathbf{u}_1$. This is the projection:
$\text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = \frac{\mathbf{v}_2 \cdot \mathbf{u}_1}{||\mathbf{u}_1||^2} \mathbf{u}_1 = \frac{(1, 1) \cdot (1, 0)}{1^2} (1, 0) = \frac{1}{1} (1, 0) = (1, 0)$.
Subtract this projection from $\mathbf{v}_2$:
$\mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (1, 1) - (1, 0) = (0, 1)$.
This vector $\mathbf{v}_2' = (0, 1)$ is orthogonal to $\mathbf{u}_1 = (1, 0)$ because $(0, 1) \cdot (1, 0) = 0$.
Finally, normalize $\mathbf{v}_2'$: $||\mathbf{v}_2'|| = \sqrt{0^2 + 1^2} = 1$. So, $\mathbf{u}_2 = \frac{(0, 1)}{1} = (0, 1)$.

**Formal/Mathematical Version:**
Let $\mathbf{v}_2'$ be the component of $\mathbf{v}_2$ that is orthogonal to $\mathbf{u}_1$. We subtract the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$:
$$ \mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 $$
Recall that $\text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = \frac{\mathbf{v}_2 \cdot \mathbf{u}_1}{||\mathbf{u}_1||^2} \mathbf{u}_1$. Since $\mathbf{u}_1$ is a unit vector, $||\mathbf{u}_1||^2 = 1$. So, this simplifies to $(\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1$.
Therefore:
$$ \mathbf{v}_2' = \mathbf{v}_2 - (\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1 $$
Then, normalize $\mathbf{v}_2'$ to get $\mathbf{u}_2$:
$$ \mathbf{u}_2 = \frac{\mathbf{v}_2'}{||\mathbf{v}_2'||} $$

**What could go wrong:** Forgetting to use $\mathbf{u}_1$ (the *normalized* vector) for the projection, or accidentally projecting onto $\mathbf{v}_1$ (the *original* vector) instead. This would result in an incorrect orthogonal vector.

### Step 3: Make the third vector orthogonal to the first two, then normalize

**Plain-English Statement:** Now take your third original vector. It might have components pointing in the direction of both $\mathbf{u}_1$ and $\mathbf{u}_2$. You need to subtract *both* of those "shadows" or projections. What's left will be a vector perpendicular to both $\mathbf{u}_1$ and $\mathbf{u}_2$. Then, normalize it to unit length.

**Small Concrete Example:** Suppose you have $\mathbf{u}_1 = (1, 0, 0)$ and $\mathbf{u}_2 = (0, 1, 0)$, and your next original vector is $\mathbf{v}_3 = (1, 1, 1)$.
First, remove the component of $\mathbf{v}_3$ along $\mathbf{u}_1$:
$\text{proj}_{\mathbf{u}_1} \mathbf{v}_3 = (\mathbf{v}_3 \cdot \mathbf{u}_1) \mathbf{u}_1 = ((1, 1, 1) \cdot (1, 0, 0)) (1, 0, 0) = 1 \cdot (1, 0, 0) = (1, 0, 0)$.
Next, remove the component of $\mathbf{v}_3$ along $\mathbf{u}_2$:
$\text{proj}_{\mathbf{u}_2} \mathbf{v}_3 = (\mathbf{v}_3 \cdot \mathbf{u}_2) \mathbf{u}_2 = ((1, 1, 1) \cdot (0, 1, 0)) (0, 1, 0) = 1 \cdot (0, 1, 0) = (0, 1, 0)$.
Now subtract both projections from $\mathbf{v}_3$:
$\mathbf{v}_3' = \mathbf{v}_3 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_3 - \text{proj}_{\mathbf{u}_2} \mathbf{v}_3 = (1, 1, 1) - (1, 0, 0) - (0, 1, 0) = (0, 0, 1)$.
This vector $\mathbf{v}_3' = (0, 0, 1)$ is orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$.
Finally, normalize $\mathbf{v}_3'$: $||\mathbf{v}_3'|| = \sqrt{0^2 + 0^2 + 1^2} = 1$. So, $\mathbf{u}_3 = \frac{(0, 0, 1)}{1} = (0, 0, 1)$.

**Formal/Mathematical Version:**
Let $\mathbf{v}_3'$ be the component of $\mathbf{v}_3$ that is orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$. We subtract the projections of $\mathbf{v}_3$ onto both $\mathbf{u}_1$ and $\mathbf{u}_2$:
$$ \mathbf{v}_3' = \mathbf{v}_3 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_3 - \text{proj}_{\mathbf{u}_2} \mathbf{v}_3 $$
Using the simplified projection formula for unit vectors:
$$ \mathbf{v}_3' = \mathbf{v}_3 - (\mathbf{v}_3 \cdot \mathbf{u}_1) \mathbf{u}_1 - (\mathbf{v}_3 \cdot \mathbf{u}_2) \mathbf{u}_2 $$
Then, normalize $\mathbf{v}_3'$ to get $\mathbf{u}_3$:
$$ \mathbf{u}_3 = \frac{\mathbf{v}_3'}{||\mathbf{v}_3'||} $$

**What could go wrong:** Forgetting to subtract *all* previous projections, or subtracting projections onto the *original* vectors instead of the *orthonormalized* ones. This is the most common mistake in Gram-Schmidt.

### Step k (General Step): Make the k-th vector orthogonal to all previous, then normalize

**Plain-English Statement:** For any new original vector you pick, say $\mathbf{v}_k$, you need to remove all the parts that align with *any* of the previously found standard, perpendicular vectors ($\mathbf{u}_1, \mathbf{u}_2, \ldots, \mathbf{u}_{k-1}$). You do this by subtracting the projection of $\mathbf{v}_k$ onto each of those $\mathbf{u}_i$ vectors. Once you've removed all those "shadows," the remaining vector will be perfectly perpendicular to all the previous $\mathbf{u}_i$'s. Then, you make it unit length.

**Formal/Mathematical Version:**
To find the $k$-th orthonormal vector $\mathbf{u}_k$ from the $k$-th original vector $\mathbf{v}_k$:
First, compute the component of $\mathbf{v}_k$ that is orthogonal to the subspace spanned by $\{\mathbf{u}_1, \ldots, \mathbf{u}_{k-1}\}$:
$$ \mathbf{v}_k' = \mathbf{v}_k - \sum_{j=1}^{k-1} \text{proj}_{\mathbf{u}_j} \mathbf{v}_k $$
Using the simplified projection formula for unit vectors:
$$ \mathbf{v}_k' = \mathbf{v}_k - \sum_{j=1}^{k-1} (\mathbf{v}_k \cdot \mathbf{u}_j) \mathbf{u}_j $$
Then, normalize $\mathbf{v}_k'$ to get $\mathbf{u}_k$:
$$ \mathbf{u}_k = \frac{\mathbf{v}_k'}{||\mathbf{v}_k'||} $$

**What could go wrong:** Incorrectly calculating any of the dot products or vector subtractions. If at any point $||\mathbf{v}_k'|| = 0$, it means $\mathbf{v}_k$ was linearly dependent on the previous vectors, and thus the original set was not a basis. The Gram-Schmidt process requires a linearly independent set of vectors.

### Summary of the Gram-Schmidt Algorithm:

Given a linearly independent set of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$, we construct an orthonormal set $\{\mathbf{u}_1, \mathbf{u}_2, \ldots, \mathbf{u}_k\}$ as follows:

1.  $\mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||}$
2.  $\mathbf{v}_2' = \mathbf{v}_2 - (\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1$
    $\mathbf{u}_2 = \frac{\mathbf{v}_2'}{||\mathbf{v}_2'||}$
3.  $\mathbf{v}_3' = \mathbf{v}_3 - (\mathbf{v}_3 \cdot \mathbf{u}_1) \mathbf{u}_1 - (\mathbf{v}_3 \cdot \mathbf{u}_2) \mathbf{u}_2$
    $\mathbf{u}_3 = \frac{\mathbf{v}_3'}{||\mathbf{v}_3'||}$
4.  ...
5.  $\mathbf{v}_k' = \mathbf{v}_k - \sum_{j=1}^{k-1} (\mathbf{v}_k \cdot \mathbf{u}_j) \mathbf{u}_j$
    $\mathbf{u}_k = \frac{\mathbf{v}_k'}{||\mathbf{v}_k'||}$

## 5. Worked examples — multiple, with every step shown

### Example 1: Two vectors in $\mathbb{R}^2$ (Easy)

**Problem:** Apply the Gram-Schmidt process to the vectors $\mathbf{v}_1 = (3, 1)$ and $\mathbf{v}_2 = (2, 2)$ to find an orthonormal basis.

**Given:** $\mathbf{v}_1 = (3, 1)$, $\mathbf{v}_2 = (2, 2)$
**Want:** An orthonormal basis $\{\mathbf{u}_1, \mathbf{u}_2\}$.

---

**Step 1: Compute $\mathbf{u}_1$ from $\mathbf{v}_1$.**

First, find the magnitude of $\mathbf{v}_1$:
$$ ||\mathbf{v}_1|| = \sqrt{3^2 + 1^2} = \sqrt{9 + 1} = \sqrt{10} $$
Now, normalize $\mathbf{v}_1$ to get $\mathbf{u}_1$:
$$ \mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} = \frac{(3, 1)}{\sqrt{10}} = \left(\frac{3}{\sqrt{10}}, \frac{1}{\sqrt{10}}\right) $$
*Explanation: We take the first vector and scale it so its length becomes 1. This is the first vector in our orthonormal basis.*

---

**Step 2: Compute $\mathbf{u}_2$ from $\mathbf{v}_2$.**

First, find the component of $\mathbf{v}_2$ that is orthogonal to $\mathbf{u}_1$. To do this, we subtract the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$ from $\mathbf{v}_2$.
Calculate the dot product $\mathbf{v}_2 \cdot \mathbf{u}_1$:
$$ \mathbf{v}_2 \cdot \mathbf{u}_1 = (2, 2) \cdot \left(\frac{3}{\sqrt{10}}, \frac{1}{\sqrt{10}}\right) = 2 \cdot \frac{3}{\sqrt{10}} + 2 \cdot \frac{1}{\sqrt{10}} = \frac{6}{\sqrt{10}} + \frac{2}{\sqrt{10}} = \frac{8}{\sqrt{10}} $$
Now, calculate the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$:
$$ \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1 = \frac{8}{\sqrt{10}} \cdot \left(\frac{3}{\sqrt{10}}, \frac{1}{\sqrt{10}}\right) = \left(\frac{24}{10}, \frac{8}{10}\right) = \left(\frac{12}{5}, \frac{4}{5}\right) $$
*Explanation: We calculate how much of $\mathbf{v}_2$ "points in the same direction" as $\mathbf{u}_1$. Since $\mathbf{u}_1$ is a unit vector, the projection formula simplifies to a dot product times $\mathbf{u}_1$.*

Next, subtract this projection from $\mathbf{v}_2$ to get $\mathbf{v}_2'$ (the orthogonal component):
$$ \mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (2, 2) - \left(\frac{12}{5}, \frac{4}{5}\right) $$
To perform the subtraction, find a common denominator:
$$ \mathbf{v}_2' = \left(\frac{10}{5}, \frac{10}{5}\right) - \left(\frac{12}{5}, \frac{4}{5}\right) = \left(\frac{10 - 12}{5}, \frac{10 - 4}{5}\right) = \left(-\frac{2}{5}, \frac{6}{5}\right) $$
*Explanation: We remove the component of $\mathbf{v}_2$ that lies along $\mathbf{u}_1$. The resulting vector $\mathbf{v}_2'$ is now guaranteed to be orthogonal to $\mathbf{u}_1$.*

Finally, normalize $\mathbf{v}_2'$ to get $\mathbf{u}_2$. First, find its magnitude:
$$ ||\mathbf{v}_2'|| = \sqrt{\left(-\frac{2}{5}\right)^2 + \left(\frac{6}{5}\right)^2} = \sqrt{\frac{4}{25} + \frac{36}{25}} = \sqrt{\frac{40}{25}} = \frac{\sqrt{40}}{5} = \frac{2\sqrt{10}}{5} $$
Now, normalize $\mathbf{v}_2'$:
$$ \mathbf{u}_2 = \frac{\mathbf{v}_2'}{||\mathbf{v}_2'||} = \frac{\left(-\frac{2}{5}, \frac{6}{5}\right)}{\frac{2\sqrt{10}}{5}} = \left(-\frac{2}{5} \cdot \frac{5}{2\sqrt{10}}, \frac{6}{5} \cdot \frac{5}{2\sqrt{10}}\right) = \left(-\frac{1}{\sqrt{10}}, \frac{3}{\sqrt{10}}\right) $$
*Explanation: We scale $\mathbf{v}_2'$ to have a length of 1, completing the second orthonormal vector.*

---

**Final Answer:** The orthonormal basis is
$$ \boxed{\left\{ \left(\frac{3}{\sqrt{10}}, \frac{1}{\sqrt{10}}\right), \left(-\frac{1}{\sqrt{10}}, \frac{3}{\sqrt{10}}\right) \right\}} $$
*Reflection:* This example was straightforward, mainly involving careful arithmetic with fractions and square roots. The key is to consistently use the *normalized* vectors ($\mathbf{u}_i$) for projections, not the original ($\mathbf{v}_i$) or intermediate ($\mathbf{v}_i'$) vectors.

### Example 2: Three vectors in $\mathbb{R}^3$ (Standard)

**Problem:** Apply the Gram-Schmidt process to the vectors $\mathbf{v}_1 = (1, 1, 0)$, $\mathbf{v}_2 = (1, 0, 1)$, $\mathbf{v}_3 = (0, 1, 1)$ to find an orthonormal basis.

**Given:** $\mathbf{v}_1 = (1, 1, 0)$, $\mathbf{v}_2 = (1, 0, 1)$, $\mathbf{v}_3 = (0, 1, 1)$
**Want:** An orthonormal basis $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$.

---

**Step 1: Compute $\mathbf{u}_1$ from $\mathbf{v}_1$.**

Magnitude of $\mathbf{v}_1$:
$$ ||\mathbf{v}_1|| = \sqrt{1^2 + 1^2 + 0^2} = \sqrt{2} $$
Normalize $\mathbf{v}_1$:
$$ \mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} = \frac{(1, 1, 0)}{\sqrt{2}} = \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right) $$
*Explanation: The first vector is simply normalized.*

---

**Step 2: Compute $\mathbf{u}_2$ from $\mathbf{v}_2$.**

First, compute $\mathbf{v}_2'$ by subtracting the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$:
Calculate $\mathbf{v}_2 \cdot \mathbf{u}_1$:
$$ \mathbf{v}_2 \cdot \mathbf{u}_1 = (1, 0, 1) \cdot \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right) = 1 \cdot \frac{1}{\sqrt{2}} + 0 \cdot \frac{1}{\sqrt{2}} + 1 \cdot 0 = \frac{1}{\sqrt{2}} $$
Calculate $\text{proj}_{\mathbf{u}_1} \mathbf{v}_2$:
$$ \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1 = \frac{1}{\sqrt{2}} \cdot \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right) = \left(\frac{1}{2}, \frac{1}{2}, 0\right) $$
*Explanation: We find the component of $\mathbf{v}_2$ that aligns with $\mathbf{u}_1$.*

Subtract the projection from $\mathbf{v}_2$:
$$ \mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (1, 0, 1) - \left(\frac{1}{2}, \frac{1}{2}, 0\right) = \left(1 - \frac{1}{2}, 0 - \frac{1}{2}, 1 - 0\right) = \left(\frac{1}{2}, -\frac{1}{2}, 1\right) $$
*Explanation: This $\mathbf{v}_2'$ is now orthogonal to $\mathbf{u}_1$.*

Now, normalize $\mathbf{v}_2'$ to get $\mathbf{u}_2$. First, find its magnitude:
$$ ||\mathbf{v}_2'|| = \sqrt{\left(\frac{1}{2}\right)^2 + \left(-\frac{1}{2}\right)^2 + 1^2} = \sqrt{\frac{1}{4} + \frac{1}{4} + 1} = \sqrt{\frac{1}{2} + 1} = \sqrt{\frac{3}{2}} $$
Normalize $\mathbf{v}_2'$:
$$ \mathbf{u}_2 = \frac{\mathbf{v}_2'}{||\mathbf{v}_2'||} = \frac{\left(\frac{1}{2}, -\frac{1}{2}, 1\right)}{\sqrt{\frac{3}{2}}} = \left(\frac{1}{2} \cdot \sqrt{\frac{2}{3}}, -\frac{1}{2} \cdot \sqrt{\frac{2}{3}}, 1 \cdot \sqrt{\frac{2}{3}}\right) $$
$$ \mathbf{u}_2 = \left(\frac{1}{\sqrt{6}}, -\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}\right) $$
*Explanation: We scale $\mathbf{v}_2'$ to unit length.*

---

**Step 3: Compute $\mathbf{u}_3$ from $\mathbf{v}_3$.**

First, compute $\mathbf{v}_3'$ by subtracting the projections of $\mathbf{v}_3$ onto $\mathbf{u}_1$ and $\mathbf{u}_2$.
Calculate $\mathbf{v}_3 \cdot \mathbf{u}_1$:
$$ \mathbf{v}_3 \cdot \mathbf{u}_1 = (0, 1, 1) \cdot \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right) = 0 \cdot \frac{1}{\sqrt{2}} + 1 \cdot \frac{1}{\sqrt{2}} + 1 \cdot 0 = \frac{1}{\sqrt{2}} $$
Calculate $\text{proj}_{\mathbf{u}_1} \mathbf{v}_3$:
$$ \text{proj}_{\mathbf{u}_1} \mathbf{v}_3 = (\mathbf{v}_3 \cdot \mathbf{u}_1) \mathbf{u}_1 = \frac{1}{\sqrt{2}} \cdot \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right) = \left(\frac{1}{2}, \frac{1}{2}, 0\right) $$
*Explanation: Find the component of $\mathbf{v}_3$ along $\mathbf{u}_1$.*

Calculate $\mathbf{v}_3 \cdot \mathbf{u}_2$:
$$ \mathbf{v}_3 \cdot \mathbf{u}_2 = (0, 1, 1) \cdot \left(\frac{1}{\sqrt{6}}, -\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}\right) = 0 \cdot \frac{1}{\sqrt{6}} + 1 \cdot \left(-\frac{1}{\sqrt{6}}\right) + 1 \cdot \frac{2}{\sqrt{6}} = -\frac{1}{\sqrt{6}} + \frac{2}{\sqrt{6}} = \frac{1}{\sqrt{6}} $$
Calculate $\text{proj}_{\mathbf{u}_2} \mathbf{v}_3$:
$$ \text{proj}_{\mathbf{u}_2} \mathbf{v}_3 = (\mathbf{v}_3 \cdot \mathbf{u}_2) \mathbf{u}_2 = \frac{1}{\sqrt{6}} \cdot \left(\frac{1}{\sqrt{6}}, -\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}\right) = \left(\frac{1}{6}, -\frac{1}{6}, \frac{2}{6}\right) = \left(\frac{1}{6}, -\frac{1}{6}, \frac{1}{3}\right) $$
*Explanation: Find the component of $\mathbf{v}_3$ along $\mathbf{u}_2$.*

Subtract both projections from $\mathbf{v}_3$:
$$ \mathbf{v}_3' = \mathbf{v}_3 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_3 - \text{proj}_{\mathbf{u}_2} \mathbf{v}_3 $$
$$ \mathbf{v}_3' = (0, 1, 1) - \left(\frac{1}{2}, \frac{1}{2}, 0\right) - \left(\frac{1}{6}, -\frac{1}{6}, \frac{1}{3}\right) $$
Combine the projections first:
$$ \left(\frac{1}{2}, \frac{1}{2}, 0\right) + \left(\frac{1}{6}, -\frac{1}{6}, \frac{1}{3}\right) = \left(\frac{3}{6} + \frac{1}{6}, \frac{3}{6} - \frac{1}{6}, 0 + \frac{2}{6}\right) = \left(\frac{4}{6}, \frac{2}{6}, \frac{2}{6}\right) = \left(\frac{2}{3}, \frac{1}{3}, \frac{1}{3}\right) $$
Now subtract from $\mathbf{v}_3$:
$$ \mathbf{v}_3' = (0, 1, 1) - \left(\frac{2}{3}, \frac{1}{3}, \frac{1}{3}\right) = \left(0 - \frac{2}{3}, 1 - \frac{1}{3}, 1 - \frac{1}{3}\right) = \left(-\frac{2}{3}, \frac{2}{3}, \frac{2}{3}\right) $$
*Explanation: We remove all components of $\mathbf{v}_3$ that align with the previously found orthogonal vectors. This ensures $\mathbf{v}_3'$ is orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$.*

Finally, normalize $\mathbf{v}_3'$ to get $\mathbf{u}_3$. First, find its magnitude:
$$ ||\mathbf{v}_3'|| = \sqrt{\left(-\frac{2}{3}\right)^2 + \left(\frac{2}{3}\right)^2 + \left(\frac{2}{3}\right)^2} = \sqrt{\frac{4}{9} + \frac{4}{9} + \frac{4}{9}} = \sqrt{\frac{12}{9}} = \frac{\sqrt{12}}{3} = \frac{2\sqrt{3}}{3} $$
Normalize $\mathbf{v}_3'$:
$$ \mathbf{u}_3 = \frac{\mathbf{v}_3'}{||\mathbf{v}_3'||} = \frac{\left(-\frac{2}{3}, \frac{2}{3}, \frac{2}{3}\right)}{\frac{2\sqrt{3}}{3}} = \left(-\frac{2}{3} \cdot \frac{3}{2\sqrt{3}}, \frac{2}{3} \cdot \frac{3}{2\sqrt{3}}, \frac{2}{3} \cdot \frac{3}{2\sqrt{3}}\right) = \left(-\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}\right) $$
*Explanation: Scale $\mathbf{v}_3'$ to unit length.*

---

**Final Answer:** The orthonormal basis is
$$ \boxed{\left\{ \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right), \left(\frac{1}{\sqrt{6}}, -\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}\right), \left(-\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}\right) \right\}} $$
*Reflection:* This example involved more steps and more complex fractions, but the process remains the same. It is crucial to be meticulous with arithmetic and ensure that each $\mathbf{v}_k'$ is orthogonal to *all* previously found $\mathbf{u}_j$ vectors. A common mistake is to forget one of the projections in the subtraction step for $\mathbf{v}_k'$.

### Example 3: Two vectors in $\mathbb{R}^3$ (Subspace)

**Problem:** Apply the Gram-Schmidt process to the vectors $\mathbf{v}_1 = (1, 2, 1)$ and $\mathbf{v}_2 = (1, 0, 1)$ to find an orthonormal basis for the subspace they span.

**Given:** $\mathbf{v}_1 = (1, 2, 1)$, $\mathbf{v}_2 = (1, 0, 1)$
**Want:** An orthonormal basis $\{\mathbf{u}_1, \mathbf{u}_2\}$ for $\text{span}\{\mathbf{v}_1, \mathbf{v}_2\}$.

---

**Step 1: Compute $\mathbf{u}_1$ from $\mathbf{v}_1$.**

Magnitude of $\mathbf{v}_1$:
$$ ||\mathbf{v}_1|| = \sqrt{1^2 + 2^2 + 1^2} = \sqrt{1 + 4 + 1} = \sqrt{6} $$
Normalize $\mathbf{v}_1$:
$$ \mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} = \frac{(1, 2, 1)}{\sqrt{6}} = \left(\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}, \frac{1}{\sqrt{6}}\right) $$
*Explanation: First vector normalized to unit length.*

---

**Step 2: Compute $\mathbf{u}_2$ from $\mathbf{v}_2$.**

First, compute $\mathbf{v}_2'$ by subtracting the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$:
Calculate $\mathbf{v}_2 \cdot \mathbf{u}_1$:
$$ \mathbf{v}_2 \cdot \mathbf{u}_1 = (1, 0, 1) \cdot \left(\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}, \frac{1}{\sqrt{6}}\right) = 1 \cdot \frac{1}{\sqrt{6}} + 0 \cdot \frac{2}{\sqrt{6}} + 1 \cdot \frac{1}{\sqrt{6}} = \frac{1}{\sqrt{6}} + \frac{1}{\sqrt{6}} = \frac{2}{\sqrt{6}} $$
Calculate $\text{proj}_{\mathbf{u}_1} \mathbf{v}_2$:
$$ \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1 = \frac{2}{\sqrt{6}} \cdot \left(\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}, \frac{1}{\sqrt{6}}\right) = \left(\frac{2}{6}, \frac{4}{6}, \frac{2}{6}\right) = \left(\frac{1}{3}, \frac{2}{3}, \frac{1}{3}\right) $$
*Explanation: Determine the component of $\mathbf{v}_2$ that lies along $\mathbf{u}_1$.*

Subtract the projection from $\mathbf{v}_2$:
$$ \mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (1, 0, 1) - \left(\frac{1}{3}, \frac{2}{3}, \frac{1}{3}\right) $$
$$ \mathbf{v}_2' = \left(\frac{3}{3}, \frac{0}{3}, \frac{3}{3}\right) - \left(\frac{1}{3}, \frac{2}{3}, \frac{1}{3}\right) = \left(\frac{3-1}{3}, \frac{0-2}{3}, \frac{3-1}{3}\right) = \left(\frac{2}{3}, -\frac{2}{3}, \frac{2}{3}\right) $$
*Explanation: This vector $\mathbf{v}_2'$ is now orthogonal to $\mathbf{u}_1$.*

Now, normalize $\mathbf{v}_2'$ to get $\mathbf{u}_2$. First, find its magnitude:
$$ ||\mathbf{v}_2'|| = \sqrt{\left(\frac{2}{3}\right)^2 + \left(-\frac{2}{3}\right)^2 + \left(\frac{2}{3}\right)^2} = \sqrt{\frac{4}{9} + \frac{4}{9} + \frac{4}{9}} = \sqrt{\frac{12}{9}} = \frac{\sqrt{12}}{3} = \frac{2\sqrt{3}}{3} $$
Normalize $\mathbf{v}_2'$:
$$ \mathbf{u}_2 = \frac{\mathbf{v}_2'}{||\mathbf{v}_2'||} = \frac{\left(\frac{2}{3}, -\frac{2}{3}, \frac{2}{3}\right)}{\frac{2\sqrt{3}}{3}} = \left(\frac{2}{3} \cdot \frac{3}{2\sqrt{3}}, -\frac{2}{3} \cdot \frac{3}{2\sqrt{3}}, \frac{2}{3} \cdot \frac{3}{2\sqrt{3}}\right) = \left(\frac{1}{\sqrt{3}}, -\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}\right) $$
*Explanation: Scale $\mathbf{v}_2'$ to unit length.*

---

**Final Answer:** The orthonormal basis for the subspace spanned by $\mathbf{v}_1$ and $\mathbf{v}_2$ is
$$ \boxed{\left\{ \left(\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}, \frac{1}{\sqrt{6}}\right), \left(\frac{1}{\sqrt{3}}, -\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}\right) \right\}} $$
*Reflection:* This example demonstrates that Gram-Schmidt works for any linearly independent set of vectors, not just those that span the entire ambient space ($\mathbb{R}^n$). The process is identical, just stopping after processing all given vectors. The calculations can still involve fractions and square roots, requiring careful attention.

### Example 4: Vectors with zero components (Harder, potential for miscalculation)

**Problem:** Use Gram-Schmidt to find an orthonormal basis for the subspace spanned by $\mathbf{v}_1 = (1, 0, 1, 0)$, $\mathbf{v}_2 = (1, 1, 1, 0)$, $\mathbf{v}_3 = (0, 1, 0, 1)$.

**Given:** $\mathbf{v}_1 = (1, 0, 1, 0)$, $\mathbf{v}_2 = (1, 1, 1, 0)$, $\mathbf{v}_3 = (0, 1, 0, 1)$
**Want:** An orthonormal basis $\{\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3\}$.

---

**Step 1: Compute $\mathbf{u}_1$ from $\mathbf{v}_1$.**

Magnitude of $\mathbf{v}_1$:
$$ ||\mathbf{v}_1|| = \sqrt{1^2 + 0^2 + 1^2 + 0^2} = \sqrt{2} $$
Normalize $\mathbf{v}_1$:
$$ \mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||} = \frac{(1, 0, 1, 0)}{\sqrt{2}} = \left(\frac{1}{\sqrt{2}}, 0, \frac{1}{\sqrt{2}}, 0\right) $$
*Explanation: The first vector is scaled to unit length.*

---

**Step 2: Compute $\mathbf{u}_2$ from $\mathbf{v}_2$.**

First, compute $\mathbf{v}_2'$ by subtracting the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$:
Calculate $\mathbf{v}_2 \cdot \mathbf{u}_1$:
$$ \mathbf{v}_2 \cdot \mathbf{u}_1 = (1, 1, 1, 0) \cdot \left(\frac{1}{\sqrt{2}}, 0, \frac{1}{\sqrt{2}}, 0\right) = 1 \cdot \frac{1}{\sqrt{2}} + 1 \cdot 0 + 1 \cdot \frac{1}{\sqrt{2}} + 0 \cdot 0 = \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} = \frac{2}{\sqrt{2}} = \sqrt{2} $$
Calculate $\text{proj}_{\mathbf{u}_1} \mathbf{v}_2$:
$$ \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (\mathbf{v}_2 \cdot \mathbf{u}_1) \mathbf{u}_1 = \sqrt{2} \cdot \left(\frac{1}{\sqrt{2}}, 0, \frac{1}{\sqrt{2}}, 0\right) = (1, 0, 1, 0) $$
*Explanation: Determine the component of $\mathbf{v}_2$ that lies along $\mathbf{u}_1$.*

Subtract the projection from $\mathbf{v}_2$:
$$ \mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2 = (1, 1, 1, 0) - (1, 0, 1, 0) = (1-1, 1-0, 1-1, 0-0) = (0, 1, 0, 0) $$
*Explanation: This vector $\mathbf{v}_2'$ is now orthogonal to $\mathbf{u}_1$. Notice how simple it became.*

Now, normalize $\mathbf{v}_2'$ to get $\mathbf{u}_2$. First, find its magnitude:
$$ ||\mathbf{v}_2'|| = \sqrt{0^2 + 1^2 + 0^2 + 0^2} = \sqrt{1} = 1 $$
Normalize $\mathbf{v}_2'$:
$$ \mathbf{u}_2 = \frac{\mathbf{v}_2'}{||\mathbf{v}_2'||} = \frac{(0, 1, 0, 0)}{1} = (0, 1, 0, 0) $$
*Explanation: Scale $\mathbf{v}_2'$ to unit length. In this case, it was already a unit vector.*

---

**Step 3: Compute $\mathbf{u}_3$ from $\mathbf{v}_3$.**

First, compute $\mathbf{v}_3'$ by subtracting the projections of $\mathbf{v}_3$ onto $\mathbf{u}_1$ and $\mathbf{u}_2$.
Calculate $\mathbf{v}_3 \cdot \mathbf{u}_1$:
$$ \mathbf{v}_3 \cdot \mathbf{u}_1 = (0, 1, 0, 1) \cdot \left(\frac{1}{\sqrt{2}}, 0, \frac{1}{\sqrt{2}}, 0\right) = 0 \cdot \frac{1}{\sqrt{2}} + 1 \cdot 0 + 0 \cdot \frac{1}{\sqrt{2}} + 1 \cdot 0 = 0 $$
*Explanation: Find the component of $\mathbf{v}_3$ along $\mathbf{u}_1$. The result is 0, meaning $\mathbf{v}_3$ was already orthogonal to $\mathbf{u}_1$.*

Calculate $\text{proj}_{\mathbf{u}_1} \mathbf{v}_3$:
$$ \text{proj}_{\mathbf{u}_1} \mathbf{v}_3 = (\mathbf{v}_3 \cdot \mathbf{u}_1) \mathbf{u}_1 = 0 \cdot \mathbf{u}_1 = (0, 0, 0, 0) $$
*Explanation: Since the dot product was 0, the projection is the zero vector.*

Calculate $\mathbf{v}_3 \cdot \mathbf{u}_2$:
$$ \mathbf{v}_3 \cdot \mathbf{u}_2 = (0, 1, 0, 1) \cdot (0, 1, 0, 0) = 0 \cdot 0 + 1 \cdot 1 + 0 \cdot 0 + 1 \cdot 0 = 1 $$
Calculate $\text{proj}_{\mathbf{u}_2} \mathbf{v}_3$:
$$ \text{proj}_{\mathbf{u}_2} \mathbf{v}_3 = (\mathbf{v}_3 \cdot \mathbf{u}_2) \mathbf{u}_2 = 1 \cdot (0, 1, 0, 0) = (0, 1, 0, 0) $$
*Explanation: Find the component of $\mathbf{v}_3$ along $\mathbf{u}_2$.*

Subtract both projections from $\mathbf{v}_3$:
$$ \mathbf{v}_3' = \mathbf{v}_3 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_3 - \text{proj}_{\mathbf{u}_2} \mathbf{v}_3 $$
$$ \mathbf{v}_3' = (0, 1, 0, 1) - (0, 0, 0, 0) - (0, 1, 0, 0) = (0-0-0, 1-0-1, 0-0-0, 1-0-0) = (0, 0, 0, 1) $$
*Explanation: We remove all components of $\mathbf{v}_3$ that align with the previously found orthonormal vectors. This ensures $\mathbf{v}_3'$ is orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$.*

Finally, normalize $\mathbf{v}_3'$ to get $\mathbf{u}_3$. First, find its magnitude:
$$ ||\mathbf{v}_3'|| = \sqrt{0^2 + 0^2 + 0^2 + 1^2} = \sqrt{1} = 1 $$
Normalize $\mathbf{v}_3'$:
$$ \mathbf{u}_3 = \frac{\mathbf{v}_3'}{||\mathbf{v}_3'||} = \frac{(0, 0, 0, 1)}{1} = (0, 0, 0, 1) $$
*Explanation: Scale $\mathbf{v}_3'$ to unit length. Again, it was already a unit vector.*

---

**Final Answer:** The orthonormal basis is
$$ \boxed{\left\{ \left(\frac{1}{\sqrt{2}}, 0, \frac{1}{\sqrt{2}}, 0\right), (0, 1, 0, 0), (0, 0, 0, 1) \right\}} $$
*Reflection:* This example shows that Gram-Schmidt can sometimes simplify vectors significantly, even turning them into standard basis vectors if they happen to align well with the orthogonalization process. The "trickiness" here lies in not getting confused by the zeros and ensuring that each projection calculation is done correctly, even when the result is zero. It's a good check of understanding the projection formula.

## 6. Common mistakes and traps

1.  **Forgetting to Normalize:** Students often correctly orthogonalize vectors but forget the final step of dividing by the magnitude. This results in an orthogonal basis, but not an *orthonormal* one.
2.  **Projecting onto Original Vectors (v_i) instead of Orthogonalized Ones (u_j):** This is perhaps the most common and critical error. The Gram-Schmidt process requires projecting the current $\mathbf{v}_k$ onto the *already orthonormalized* vectors $\mathbf{u}_1, \ldots, \mathbf{u}_{k-1}$. If you project onto $\mathbf{v}_j$ or $\mathbf{v}_j'$, the resulting vector will not be guaranteed to be orthogonal to all previous vectors.
3.  **Arithmetic Errors:** The calculations often involve fractions and square roots, leading to many opportunities for simple addition, subtraction, or multiplication mistakes. Meticulous calculation is key.
4.  **Incorrect Order of Subtraction:** When calculating $\mathbf{v}_k'$, it's $\mathbf{v}_k$ *minus* the sum of projections. Subtracting in the wrong order or adding instead of subtracting will yield incorrect results.
5.  **Applying to Linearly Dependent Sets:** The Gram-Schmidt process assumes the input set of vectors is linearly independent. If it's not, you'll encounter a situation where one of the intermediate vectors $\mathbf{v}_k'$ turns out to be the zero vector, meaning its magnitude is zero, and you cannot normalize it. This indicates that the original set was not a basis.
6.  **Confusing Scalar Projection with Vector Projection:** While the scalar projection is a number, Gram-Schmidt requires the *vector* projection (a vector pointing in the direction of the $\mathbf{u}_j$) to be subtracted.

## 7. Textbook-precise explanation

Let $W$ be a $k$-dimensional subspace of $\mathbb{R}^n$ with a basis $B = \{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$. The Gram-Schmidt orthogonalization algorithm constructs an orthonormal basis $O = \{\mathbf{u}_1, \mathbf{u}_2, \ldots, \mathbf{u}_k\}$ for $W$.

The algorithm proceeds iteratively as follows:

**Algorithm: Gram-Schmidt Orthogonalization**

Input: A linearly independent set of vectors $B = \{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$ in $\mathbb{R}^n$.
Output: An orthonormal set of vectors $O = \{\mathbf{u}_1, \mathbf{u}_2, \ldots, \mathbf{u}_k\}$ such that $\text{span}\{\mathbf{u}_1, \ldots, \mathbf{u}_j\} = \text{span}\{\mathbf{v}_1, \ldots, \mathbf{v}_j\}$ for $j=1, \ldots, k$.

**Initialization:**
1.  Set $\mathbf{u}_1 = \frac{\mathbf{v}_1}{||\mathbf{v}_1||}$.

**Iterative Step (for $j = 2, \ldots, k$):**
2.  Compute an intermediate orthogonal vector $\mathbf{v}_j'$ by subtracting from $\mathbf{v}_j$ its projections onto all previously constructed orthonormal vectors $\mathbf{u}_1, \ldots, \mathbf{u}_{j-1}$:
    $$ \mathbf{v}_j' = \mathbf{v}_j - \sum_{i=1}^{j-1} \text{proj}_{\mathbf{u}_i} \mathbf{v}_j $$
    where the vector projection of $\mathbf{v}_j$ onto $\mathbf{u}_i$ is given by $\text{proj}_{\mathbf{u}_i} \mathbf{v}_j = \frac{\mathbf{v}_j \cdot \mathbf{u}_i}{||\mathbf{u}_i||^2} \mathbf{u}_i$.
    Since $\mathbf{u}_i$ are orthonormal vectors, $||\mathbf{u}_i||^2 = 1$, simplifying the projection to:
    $$ \text{proj}_{\mathbf{u}_i} \mathbf{v}_j = (\mathbf{v}_j \cdot \mathbf{u}_i) \mathbf{u}_i $$
    Thus, the expression for $\mathbf{v}_j'$ becomes:
    $$ \mathbf{v}_j' = \mathbf{v}_j - \sum_{i=1}^{j-1} (\mathbf{v}_j \cdot \mathbf{u}_i) \mathbf{u}_i $$
3.  Normalize $\mathbf{v}_j'$ to obtain the $j$-th orthonormal vector $\mathbf{u}_j$:
    $$ \mathbf{u}_j = \frac{\mathbf{v}_j'}{||\mathbf{v}_j'||} $$
    (If $||\mathbf{v}_j'|| = 0$, then $\mathbf{v}_j$ is linearly dependent on $\{\mathbf{v}_1, \ldots, \mathbf{v}_{j-1}\}$, contradicting the assumption that $B$ is a basis. In practical numerical computation, this indicates a near-linear dependence and numerical instability.)

The resulting set $\{\mathbf{u}_1, \mathbf{u}_2, \ldots, \mathbf{u}_k\}$ is an orthonormal basis for $W$.

*Reference:* This formulation is standard and can be found in most introductory linear algebra textbooks. For example, it is covered in "Linear Algebra and Its Applications" by David C. Lay, Steven R. Lay, and Judi J. McDonald (5th ed., §6.4) or "Introduction to Linear Algebra" by Gilbert Strang (5th ed., §4.4).

## 8. ASCII diagrams

Let's visualize the core step of Gram-Schmidt in 2D: making $\mathbf{v}_2$ orthogonal to $\mathbf{u}_1$.

Given:
- $\mathbf{u}_1$: The first orthonormal vector (unit length, pointing in the direction of $\mathbf{v}_1$).
- $\mathbf{v}_2$: The second original vector.

We want to find $\mathbf{v}_2'$ such that $\mathbf{v}_2'$ is orthogonal to $\mathbf{u}_1$.

```text
       ^ v2
      /|
     / |
    /  |  v2' (orthogonal component)
   /   |
  /    |
 /     |
+-------> u1 (normalized v1)
|      proj_u1 v2
```

**Description of the figure:**
Imagine a horizontal line representing the direction of the unit vector $\mathbf{u}_1$. From the origin, an arrow representing $\mathbf{v}_2$ points upwards and to the right, not perpendicular to $\mathbf{u}_1$.
A dashed line drops perpendicularly from the tip of $\mathbf{v}_2$ onto the line defined by $\mathbf{u}_1$. The point where this dashed line meets the $\mathbf{u}_1$ line is the tip of the vector projection, $\text{proj}_{\mathbf{u}_1} \mathbf{v}_2$.
The vector $\mathbf{v}_2'$ is drawn from the tip of $\text{proj}_{\mathbf{u}_1} \mathbf{v}_2$ to the tip of $\mathbf{v}_2$. This vector $\mathbf{v}_2'$ is now perpendicular to $\mathbf{u}_1$.
Mathematically, this is $\mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2$.

**Extending to 3D:**
In 3D, if you have $\mathbf{u}_1$ and $\mathbf{u}_2$ already, and you're processing $\mathbf{v}_3$:
Imagine a plane formed by $\mathbf{u}_1$ and $\mathbf{u}_2$. $\mathbf{v}_3$ is a vector originating from the origin, pointing out of this plane.
To make $\mathbf{v}_3$ orthogonal to both $\mathbf{u}_1$ and $\mathbf{u}_2$, you project $\mathbf{v}_3$ onto the plane spanned by $\mathbf{u}_1$ and $\mathbf{u}_2$. This projection is the sum of $\text{proj}_{\mathbf{u}_1} \mathbf{v}_3$ and $\text{proj}_{\mathbf{u}_2} \mathbf{v}_3$.
Then, $\mathbf{v}_3'$ is the vector from the tip of this combined projection (which lies in the plane) to the tip of $\mathbf{v}_3$. This $\mathbf{v}_3'$ will be perpendicular to the entire plane, and thus perpendicular to both $\mathbf{u}_1$ and $\mathbf{u}_2$.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "Grammy Schmidt" as a meticulous cleaner. She takes your messy, overlapping "vector-sticks" and first **Normalizes** the first one (makes it perfectly straight and unit length). Then, for every other stick, she carefully sweeps away all the "shadows" it casts on the previously cleaned sticks (**Orthogonalization by Subtraction of Projections**), making it perfectly perpendicular to all of them. Finally, she **Normalizes** that newly perpendicular stick too.
    *   **G**rammy **S**chmidt: **G**et **S**traight! (Orthogonalize and Scale)
    *   The process is always: **Project, Subtract, Normalize.** (PSN)

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Normalization:** $\mathbf{u} = \frac{\mathbf{v}}{||\mathbf{v}||}$ (Makes a vector unit length).
    *   **Projection of $\mathbf{v}$ onto $\mathbf{u}$ (when $\mathbf{u}$ is a unit vector):** $\text{proj}_{\mathbf{u}} \mathbf{v} = (\mathbf{v} \cdot \mathbf{u}) \mathbf{u}$ (Finds the component of $\mathbf{v}$ in the direction of $\mathbf{u}$).
    *   **General Gram-Schmidt Step:** $\mathbf{v}_k' = \mathbf{v}_k - \sum_{j=1}^{k-1} (\mathbf{v}_k \cdot \mathbf{u}_j) \mathbf{u}_j$ (Removes all components that are not orthogonal to previous orthonormal vectors).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after learning, work through 2-3 examples without looking at notes.
    *   **Day 3:** Review the core idea and formulas. Work through 1-2 new examples.
    *   **Day 7:** Quickly derive the general step from first principles (see below). Work through 1 harder example.
    *   **Day 16:** Explain the algorithm to an imaginary friend. Identify common pitfalls.
    *   **Day 35:** Solve a problem involving Gram-Schmidt as part of a larger problem (e.g., QR decomposition).

4.  **First-Principles Re-derivation Pathway:**
    If you forget the Gram-Schmidt formula, you can always rebuild it from the definitions of orthogonality and projection:
    *   **Goal:** We want to find a vector $\mathbf{v}_k'$ from $\mathbf{v}_k$ such that $\mathbf{v}_k'$ is orthogonal to all previous $\mathbf{u}_1, \ldots, \mathbf{u}_{k-1}$.
    *   **Start with the simplest case:** To make $\mathbf{v}_2$ orthogonal to $\mathbf{u}_1$, we need to remove the part of $\mathbf{v}_2$ that is *parallel* to $\mathbf{u}_1$. That "parallel part" is exactly the projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$.
    *   So, $\mathbf{v}_2' = \mathbf{v}_2 - \text{proj}_{\mathbf{u}_1} \mathbf{v}_2$.
    *   **Recall projection formula:** $\text{proj}_{\mathbf{a}} \mathbf{b} = \frac{\mathbf{b} \cdot \mathbf{a}}{||\mathbf{a}||^2} \mathbf{a}$.
    *   **Crucial Insight:** Since we're building an *orthonormal* basis, we use *unit vectors* $\mathbf{u}_j$ for projections. So $||\mathbf{u}_j||^