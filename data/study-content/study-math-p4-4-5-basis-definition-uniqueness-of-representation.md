## 1. What it is — in plain English

Imagine you have a giant box of LEGOs, but you want to build *anything* you can imagine – a house, a car, a spaceship – using the absolute fewest, most fundamental types of bricks. You wouldn't want a hundred different types of bricks if ten would do the job, and you certainly wouldn't want two bricks that are identical or one that's just a combination of others. A "basis" in mathematics is exactly like that minimal, non-redundant set of LEGO bricks for a particular mathematical "space."

In simpler terms, a basis is a special collection of "building block" vectors that can be combined to create *any* other vector in a given vector space. Think of the primary colors (red, yellow, blue) for painting: you can mix them to get any other color. They are "independent" because you can't make red from yellow and blue, and they "span" the space of all colors you can create.

The two crucial properties of these building blocks are: first, they must be able to *make everything* in the space (this is called "spanning"). Second, they must be *efficient* – meaning no block is redundant, and you can't build one block using the others (this is called "linear independence"). If you have both, you have a basis.

Once you have such a set of building blocks, every single thing you build (every vector) has a *unique recipe*. If you use the standard red, yellow, and blue, there's only one way to make orange. You can't make the same orange with a different combination of those specific primary colors. This "uniqueness of representation" is a cornerstone of why bases are so powerful.

## 2. Why it matters — real-world applications

The concept of a basis is fundamental across science and engineering because it provides a structured way to represent and manipulate complex information using simpler, independent components.

1.  **Computer Graphics and 3D Modeling (e.g., Pixar, Unity 3D):** In 3D graphics, every point, object, and camera orientation is represented using coordinates. These coordinates are always relative to a chosen basis. For example, the standard basis vectors $\mathbf{i}=(1,0,0)$, $\mathbf{j}=(0,1,0)$, $\mathbf{k}=(0,0,1)$ define the X, Y, and Z axes of a 3D world. When you rotate an object, you're essentially changing its coordinates relative to a new basis (the object's local coordinate system), which simplifies calculations for transformations like rotations and translations. Game engines like Unity and Unreal Engine heavily rely on this to render realistic environments and character movements.

2.  **Data Compression and Signal Processing (e.g., JPEG, MP3, WiFi):** Many data compression techniques work by representing a complex signal (like an image or sound) as a linear combination of simpler, predefined basis functions. For instance, the JPEG image compression standard uses the Discrete Cosine Transform (DCT), which represents an image block as a sum of cosine functions of varying frequencies. These cosine functions form a basis for a space of signals. By discarding coefficients of high-frequency basis functions (which contribute less to perceived quality), significant compression is achieved without much loss of visual information. Similarly, MP3 uses modified DCT.

3.  **Physics and Engineering (e.g., Quantum Mechanics, Structural Analysis):** In quantum mechanics, the state of a particle is often described as a vector in an abstract vector space (Hilbert space). Measurable properties (observables) correspond to operators, and their possible outcomes are related to eigenvectors, which form a basis for the space. For example, the spin of an electron can be represented as a linear combination of "spin up" and "spin down" basis states. In structural engineering, the forces and displacements in a complex structure can be decomposed into components along a chosen basis, simplifying analysis.

4.  **Machine Learning and Data Science (e.g., Principal Component Analysis - PCA):** PCA is a dimensionality reduction technique that finds a new set of orthogonal (perpendicular) basis vectors for a dataset. These new basis vectors, called principal components, are chosen such that they capture the maximum variance in the data. By projecting the high-dimensional data onto a lower-dimensional subspace spanned by the most significant principal components, data can be compressed, noise can be reduced, and patterns can be more easily identified. This is crucial in fields like facial recognition and bioinformatics.

## 3. Prerequisites — what you must know first

Before diving deep into bases, ensure you have a solid grasp of these foundational linear algebra concepts:

*   **Vector:** An element of a vector space; can be thought of as an arrow with magnitude and direction, or an ordered list of numbers.
*   **Scalar:** A single number (typically real, sometimes complex) used to scale vectors.
*   **Vector Space:** A set of vectors that satisfies certain axioms under vector addition and scalar multiplication, allowing for operations like adding vectors and stretching/shrinking them.
*   **Linear Combination:** A sum of scalar multiples of vectors, like $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k$.
*   **Span (or Spanning Set):** The set of all possible linear combinations of a given set of vectors; it's the "reach" of those vectors.
*   **Linear Independence:** A set of vectors where no vector in the set can be expressed as a linear combination of the others; essentially, no vector is redundant.
*   **Subspace:** A subset of a vector space that is itself a vector space under the same operations.

## 4. The core idea — step by step

Let's build up the concept of a basis and the uniqueness of representation piece by piece.

### ### Step 1: The Idea of "Generating" or "Spanning" a Space

**Plain English:** Imagine you have a set of vectors. If you can combine these vectors using scalar multiplication and addition (i.e., form linear combinations) to reach *every single other vector* in your entire vector space, then your set of vectors "generates" or "spans" that space. They are sufficient to build anything in that space.

**Small Concrete Example:** Consider the space $\mathbb{R}^2$ (the Cartesian plane). The set of vectors $S = \{(1,0), (0,1)\}$ spans $\mathbb{R}^2$. This means any vector $(x,y)$ in $\mathbb{R}^2$ can be written as a linear combination of $(1,0)$ and $(0,1)$. For example, $(3,5) = 3(1,0) + 5(0,1)$.

**Formal/Mathematical Version:** A set of vectors $S = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k\}$ in a vector space $V$ **spans** $V$ if for every vector $\mathbf{v} \in V$, there exist scalars $c_1, c_2, \dots, c_k$ such that:
$$ \mathbf{v} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k $$
We write this as $\text{span}(S) = V$.

**What could go wrong:** If your set $S$ doesn't span $V$, it means there are some vectors in $V$ that you simply cannot "reach" or construct using the vectors in $S$. For instance, the single vector $\{(1,0)\}$ cannot span $\mathbb{R}^2$ because you can only reach points on the x-axis, not points like $(0,1)$.

### ### Step 2: The Idea of "Efficiency" or "Minimality" (Linear Independence)

**Plain English:** Now, imagine you have a set of vectors that *does* span your space. Is it an efficient set? Do you have any redundant vectors? If you can remove one vector from the set, and the remaining vectors can *still* span the same space, then the removed vector was redundant. A set is "efficient" or "minimal" if no vector in it can be built from the others. Each vector brings genuinely new "direction" or "information" to the table.

**Small Concrete Example:** In $\mathbb{R}^2$, the set $S' = \{(1,0), (0,1), (2,3)\}$ spans $\mathbb{R}^2$. However, it's not efficient. The vector $(2,3)$ is redundant because it can be written as $2(1,0) + 3(0,1)$. If you remove $(2,3)$, the remaining set $\{(1,0), (0,1)\}$ still spans $\mathbb{R}^2$. Thus, $S'$ is *not* linearly independent. The set $\{(1,0), (0,1)\}$ *is* linearly independent because you cannot write $(1,0)$ as a multiple of $(0,1)$, nor vice versa.

**Formal/Mathematical Version:** A set of vectors $S = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k\}$ in a vector space $V$ is **linearly independent** if the only solution to the equation:
$$ c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k = \mathbf{0} $$
is the trivial solution $c_1 = c_2 = \dots = c_k = 0$. If there are other solutions where at least one $c_i$ is non-zero, the set is **linearly dependent**.

**What could go wrong:** If your set $S$ is linearly dependent, it means at least one vector in the set can be expressed as a linear combination of the others. This vector is "redundant" and doesn't add new spanning power to the set. It makes the set inefficient and leads to non-unique representations (which we'll see next).

### ### Step 3: Combining them: The Definition of a Basis

**Plain English:** A "basis" for a vector space is a set of vectors that satisfies *both* conditions: it can generate *everything* in the space (it spans the space), AND it's the *most efficient* way to do it (it's linearly independent). It's the perfect, minimal set of building blocks.

**Small Concrete Example:** For $\mathbb{R}^2$:
*   $\{(1,0), (0,1)\}$ is a basis. It spans $\mathbb{R}^2$ and is linearly independent.
*   $\{(1,0), (0,1), (2,3)\}$ spans $\mathbb{R}^2$ but is *not* linearly independent, so it's *not* a basis.
*   $\{(1,0)\}$ is linearly independent but does *not* span $\mathbb{R}^2$, so it's *not* a basis.

**Formal/Mathematical Version:** A set of vectors $B = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ is a **basis** for a vector space $V$ if both of the following conditions hold:
1.  $B$ is linearly independent.
2.  $\text{span}(B) = V$.

**What could go wrong:** If a set fails either of these conditions, it is not a basis. If it's linearly dependent, it's redundant. If it doesn't span the space, it's incomplete.

### ### Step 4: The Uniqueness of Representation

**Plain English:** This is where the power of a basis truly shines. Once you've chosen a basis for your vector space, every single vector in that space has *one and only one* way to be written as a linear combination of the basis vectors. There's no ambiguity, no alternative recipe. This unique recipe gives us the "coordinates" of the vector with respect to that specific basis.

**Small Concrete Example:** Let's use the standard basis $B = \{(1,0), (0,1)\}$ for $\mathbb{R}^2$. The vector $(3,5)$ can *only* be written as $3(1,0) + 5(0,1)$. There are no other scalars $c_1, c_2$ that would give $(3,5)$ from this basis.
Now, consider a non-basis set $S' = \{(1,0), (0,1), (2,3)\}$ which is linearly dependent. The vector $(3,5)$ could be $3(1,0) + 5(0,1) + 0(2,3)$. But it could also be $1(1,0) + 2(0,1) + 1(2,3)$ (since $(2,3) = 2(1,0) + 3(0,1)$, substituting gives $1(1,0) + 2(0,1) + (2(1,0) + 3(0,1)) = 3(1,0) + 5(0,1)$). This shows that if the set is linearly dependent, the representation is *not* unique.

**Formal/Mathematical Version (Uniqueness of Representation Theorem):** If $B = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ is a basis for a vector space $V$, then for every vector $\mathbf{v} \in V$, there exists a **unique** set of scalars $c_1, c_2, \dots, c_n$ such that:
$$ \mathbf{v} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n $$
*Proof Sketch:* Assume there are two different representations for $\mathbf{v}$:
$\mathbf{v} = c_1\mathbf{v}_1 + \dots + c_n\mathbf{v}_n$
$\mathbf{v} = d_1\mathbf{v}_1 + \dots + d_n\mathbf{v}_n$
Subtracting the two equations gives:
$\mathbf{0} = (c_1-d_1)\mathbf{v}_1 + \dots + (c_n-d_n)\mathbf{v}_n$
Since $B$ is a basis, it is linearly independent. By the definition of linear independence, the only way for this linear combination to equal the zero vector is if all the coefficients are zero:
$c_1-d_1 = 0 \Rightarrow c_1 = d_1$
...
$c_n-d_n = 0 \Rightarrow c_n = d_n$
This proves that the scalars must be identical, hence the representation is unique.

**What could go wrong:** If the set of vectors is *not* linearly independent (i.e., it's linearly dependent), then the representation of a vector as a linear combination of those vectors will *not* be unique. This is why linear independence is critical for a basis.

### ### Step 5: Coordinates with respect to a Basis

**Plain English:** Because the representation is unique, those specific scalars (the $c_i$'s) that form the unique linear combination of basis vectors are called the "coordinates" of the vector *with respect to that particular basis*. It's like giving directions: "go 3 units in the direction of the first basis vector, then 5 units in the direction of the second."

**Small Concrete Example:** For $\mathbb{R}^2$ with standard basis $B_{std} = \{\mathbf{e}_1, \mathbf{e}_2\} = \{(1,0), (0,1)\}$, the vector $\mathbf{v} = (3,5)$ has the unique representation $3\mathbf{e}_1 + 5\mathbf{e}_2$. The coordinates of $\mathbf{v}$ with respect to $B_{std}$ are $(3,5)$. We write this as $[\mathbf{v}]_{B_{std}} = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$.
Now consider a different basis for $\mathbb{R}^2$: $B' = \{\mathbf{b}_1, \mathbf{b}_2\} = \{(1,1), (1,-1)\}$. The same vector $\mathbf{v} = (3,5)$ will have *different* coordinates with respect to $B'$. We need to find $c_1, c_2$ such that $(3,5) = c_1(1,1) + c_2(1,-1)$. Solving this system (which we'll do in examples), we find $c_1=4, c_2=-1$. So, $[\mathbf{v}]_{B'} = \begin{pmatrix} 4 \\ -1 \end{pmatrix}$. The vector itself is the same, but its "address" changes depending on the coordinate system (basis) you use.

**Formal/Mathematical Version:** Let $B = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ be an ordered basis for a vector space $V$. For any vector $\mathbf{v} \in V$, the unique scalars $c_1, c_2, \dots, c_n$ such that $\mathbf{v} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n$ are called the **coordinates of $\mathbf{v}$ relative to the basis $B$**. The column vector $[\mathbf{v}]_B = \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix}$ is called the **coordinate vector of $\mathbf{v}$ relative to $B$**.

**What could go wrong:** It's easy to mix up the coordinates with respect to different bases. Always be explicit about which basis you are referring to when discussing coordinates. The coordinate vector is always a column vector.

## 5. Worked examples — multiple, with every step shown

### Example 1: Standard Basis for $\mathbb{R}^2$

**Problem:** Show that the set $B = \{\mathbf{e}_1, \mathbf{e}_2\} = \{(1,0), (0,1)\}$ is a basis for $\mathbb{R}^2$. Then, find the coordinates of the vector $\mathbf{v} = (3,-2)$ with respect to this basis.

**Given:** Set of vectors $B = \{(1,0), (0,1)\}$, Vector space $V = \mathbb{R}^2$, Vector $\mathbf{v} = (3,-2)$.
**Want:**
1.  Prove $B$ is a basis for $\mathbb{R}^2$.
2.  Find $[\mathbf{v}]_B$.

---

**Step 1: Check for Linear Independence**
*   **Plain English:** We need to make sure that neither vector in $B$ can be formed by scaling the other. If we set a linear combination of them to the zero vector, the only way that can happen is if all the scaling factors are zero.
*   **Algebraic Step:** Set a linear combination of the vectors in $B$ equal to the zero vector $\mathbf{0} = (0,0)$:
    $$ c_1(1,0) + c_2(0,1) = (0,0) $$
*   **Explanation:** This is the definition of linear independence. We're looking for the values of $c_1$ and $c_2$.
*   **Algebraic Step:** Perform the scalar multiplication and vector addition:
    $$ (c_1 \cdot 1 + c_2 \cdot 0, c_1 \cdot 0 + c_2 \cdot 1) = (0,0) $$
    $$ (c_1, c_2) = (0,0) $$
*   **Explanation:** We've combined the components of the vectors.
*   **Algebraic Step:** Equate the components:
    $$ c_1 = 0 $$
    $$ c_2 = 0 $$
*   **Explanation:** For two vectors to be equal, their corresponding components must be equal.
*   **Conclusion:** Since the only solution is $c_1=0$ and $c_2=0$, the set $B$ is linearly independent.

**Step 2: Check if $B$ Spans $\mathbb{R}^2$**
*   **Plain English:** We need to show that *any* arbitrary vector $(x,y)$ in $\mathbb{R}^2$ can be written as a linear combination of $(1,0)$ and $(0,1)$.
*   **Algebraic Step:** Let $(x,y)$ be any vector in $\mathbb{R}^2$. We want to find scalars $c_1, c_2$ such that:
    $$ c_1(1,0) + c_2(0,1) = (x,y) $$
*   **Explanation:** This is the definition of spanning. We are trying to see if we can always find $c_1, c_2$ for any $x,y$.
*   **Algebraic Step:** Perform the scalar multiplication and vector addition:
    $$ (c_1, c_2) = (x,y) $$
*   **Explanation:** Combining the components as before.
*   **Algebraic Step:** Equate the components:
    $$ c_1 = x $$
    $$ c_2 = y $$
*   **Explanation:** We have found explicit values for $c_1$ and $c_2$ in terms of $x$ and $y$.
*   **Conclusion:** Since we can always find such scalars ($c_1=x, c_2=y$) for any $(x,y) \in \mathbb{R}^2$, the set $B$ spans $\mathbb{R}^2$.

**Step 3: Conclude $B$ is a Basis**
*   **Plain English:** Since $B$ is both linearly independent and spans $\mathbb{R}^2$, it fits the definition of a basis.
*   **Conclusion:** Because $B$ is linearly independent and spans $\mathbb{R}^2$, $B = \{(1,0), (0,1)\}$ is a basis for $\mathbb{R}^2$.

**Step 4: Find the Coordinates of $\mathbf{v} = (3,-2)$ with respect to $B$**
*   **Plain English:** We need to find the unique scalars $c_1, c_2$ such that $c_1(1,0) + c_2(0,1) = (3,-2)$.
*   **Algebraic Step:** Set up the equation:
    $$ c_1(1,0) + c_2(0,1) = (3,-2) $$
*   **Explanation:** This is the definition of finding coordinates.
*   **Algebraic Step:** Perform the scalar multiplication and vector addition:
    $$ (c_1, c_2) = (3,-2) $$
*   **Explanation:** Combining the components.
*   **Algebraic Step:** Equate the components:
    $$ c_1 = 3 $$
    $$ c_2 = -2 $$
*   **Explanation:** We have found the unique scalars.
*   **Final Answer:** The coordinate vector of $\mathbf{v}$ with respect to $B$ is:
    $$ \boxed{[\mathbf{v}]_B = \begin{pmatrix} 3 \\ -2 \end{pmatrix}} $$
*   **Reflection:** This example was straightforward because the standard basis vectors align perfectly with the coordinate axes, making the coordinates identical to the vector's components. This is why it's called the "standard" basis.

---

### Example 2: Non-Standard Basis for $\mathbb{R}^2$

**Problem:** Show that the set $B' = \{\mathbf{b}_1, \mathbf{b}_2\} = \{(1,1), (1,-1)\}$ is a basis for $\mathbb{R}^2$. Then, find the coordinates of the vector $\mathbf{v} = (5,1)$ with respect to this basis.

**Given:** Set of vectors $B' = \{(1,1), (1,-1)\}$, Vector space $V = \mathbb{R}^2$, Vector $\mathbf{v} = (5,1)$.
**Want:**
1.  Prove $B'$ is a basis for $\mathbb{R}^2$.
2.  Find $[\mathbf{v}]_{B'}$.

---

**Step 1: Check for Linear Independence**
*   **Plain English:** We need to ensure that $\{(1,1), (1,-1)\}$ are not multiples of each other.
*   **Algebraic Step:** Set a linear combination of the vectors in $B'$ equal to the zero vector:
    $$ c_1(1,1) + c_2(1,-1) = (0,0) $$
*   **Explanation:** This is the definition of linear independence.
*   **Algebraic Step:** Form a system of linear equations by equating components:
    $$ c_1 + c_2 = 0 \quad \text{(Equation 1)} $$
    $$ c_1 - c_2 = 0 \quad \text{(Equation 2)} $$
*   **Explanation:** The first equation comes from the x-components, the second from the y-components.
*   **Algebraic Step:** Solve the system. Add (Equation 1) and (Equation 2):
    $$ (c_1 + c_2) + (c_1 - c_2) = 0 + 0 $$
    $$ 2c_1 = 0 \Rightarrow c_1 = 0 $$
*   **Explanation:** Adding the equations eliminates $c_2$, allowing us to solve for $c_1$.
*   **Algebraic Step:** Substitute $c_1=0$ into (Equation 1):
    $$ 0 + c_2 = 0 \Rightarrow c_2 = 0 $$
*   **Explanation:** Substituting $c_1$ back into one of the original equations allows us to solve for $c_2$.
*   **Conclusion:** Since the only solution is $c_1=0$ and $c_2=0$, the set $B'$ is linearly independent.

**Step 2: Check if $B'$ Spans $\mathbb{R}^2$**
*   **Plain English:** We need to show that any vector $(x,y)$ can be formed by a linear combination of $(1,1)$ and $(1,-1)$.
*   **Algebraic Step:** Let $(x,y)$ be any vector in $\mathbb{R}^2$. We want to find scalars $c_1, c_2$ such that:
    $$ c_1(1,1) + c_2(1,-1) = (x,y) $$
*   **Explanation:** This is the definition of spanning.
*   **Algebraic Step:** Form a system of linear equations:
    $$ c_1 + c_2 = x \quad \text{(Equation 3)} $$
    $$ c_1 - c_2 = y \quad \text{(Equation 4)} $$
*   **Explanation:** Again, equating components gives us a system.
*   **Algebraic Step:** Add (Equation 3) and (Equation 4):
    $$ (c_1 + c_2) + (c_1 - c_2) = x + y $$
    $$ 2c_1 = x + y \Rightarrow c_1 = \frac{x+y}{2} $$
*   **Explanation:** We're solving for $c_1$ and $c_2$ in terms of $x$ and $y$.
*   **Algebraic Step:** Subtract (Equation 4) from (Equation 3):
    $$ (c_1 + c_2) - (c_1 - c_2) = x - y $$
    $$ 2c_2 = x - y \Rightarrow c_2 = \frac{x-y}{2} $$
*   **Explanation:** Subtracting the equations eliminates $c_1$, allowing us to solve for $c_2$.
*   **Conclusion:** Since we can always find such scalars ($c_1 = \frac{x+y}{2}, c_2 = \frac{x-y}{2}$) for any $(x,y) \in \mathbb{R}^2$, the set $B'$ spans $\mathbb{R}^2$.

**Step 3: Conclude $B'$ is a Basis**
*   **Plain English:** $B'$ satisfies both conditions, so it's a basis.
*   **Conclusion:** Because $B'$ is linearly independent and spans $\mathbb{R}^2$, $B' = \{(1,1), (1,-1)\}$ is a basis for $\mathbb{R}^2$.

**Step 4: Find the Coordinates of $\mathbf{v} = (5,1)$ with respect to $B'$**
*   **Plain English:** We need to find the unique scalars $c_1, c_2$ such that $c_1(1,1) + c_2(1,-1) = (5,1)$.
*   **Algebraic Step:** Set up the system of equations (using $x=5, y=1$ from our general solution in Step 2):
    $$ c_1 + c_2 = 5 $$
    $$ c_1 - c_2 = 1 $$
*   **Explanation:** This is the specific instance of finding the coefficients for $\mathbf{v}=(5,1)$.
*   **Algebraic Step:** Add the two equations:
    $$ 2c_1 = 6 \Rightarrow c_1 = 3 $$
*   **Explanation:** Solving for $c_1$.
*   **Algebraic Step:** Substitute $c_1=3$ into the first equation:
    $$ 3 + c_2 = 5 \Rightarrow c_2 = 2 $$
*   **Explanation:** Solving for $c_2$.
*   **Final Answer:** The coordinate vector of $\mathbf{v}$ with respect to $B'$ is:
    $$ \boxed{[\mathbf{v}]_{B'} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}} $$
*   **Reflection:** This example showed that coordinates are specific to the basis. The vector $(5,1)$ in the standard basis is $(3,2)$ in the $B'$ basis. This highlights the importance of specifying the basis.

---

### Example 3: Basis for $\mathbb{R}^3$

**Problem:** Show that the set $B = \{\mathbf{b}_1, \mathbf{b}_2, \mathbf{b}_3\} = \{(1,0,0), (1,1,0), (1,1,1)\}$ is a basis for $\mathbb{R}^3$. Then, find the coordinates of the vector $\mathbf{v} = (2,3,4)$ with respect to this basis.

**Given:** Set of vectors $B = \{(1,0,0), (1,1,0), (1,1,1)\}$, Vector space $V = \mathbb{R}^3$, Vector $\mathbf{v} = (2,3,4)$.
**Want:**
1.  Prove $B$ is a basis for $\mathbb{R}^3$.
2.  Find $[\mathbf{v}]_B$.

---

**Step 1: Check for Linear Independence**
*   **Plain English:** We need to check if any vector in $B$ can be written as a combination of the others.
*   **Algebraic Step:** Set a linear combination of the vectors in $B$ equal to the zero vector $\mathbf{0} = (0,0,0)$:
    $$ c_1(1,0,0) + c_2(1,1,0) + c_3(1,1,1) = (0,0,0) $$
*   **Explanation:** This is the definition of linear independence.
*   **Algebraic Step:** Form a system of linear equations by equating components:
    $$ c_1 + c_2 + c_3 = 0 \quad \text{(Equation 1)} $$
    $$ 0c_1 + c_2 + c_3 = 0 \quad \Rightarrow \quad c_2 + c_3 = 0 \quad \text{(Equation 2)} $$
    $$ 0c_1 + 0c_2 + c_3 = 0 \quad \Rightarrow \quad c_3 = 0 \quad \text{(Equation 3)} $$
*   **Explanation:** We've translated the vector equation into a system of scalar equations.
*   **Algebraic Step:** Solve the system using back-substitution. From (Equation 3):
    $$ c_3 = 0 $$
*   **Explanation:** We immediately have $c_3$.
*   **Algebraic Step:** Substitute $c_3=0$ into (Equation 2):
    $$ c_2 + 0 = 0 \Rightarrow c_2 = 0 $$
*   **Explanation:** Now we have $c_2$.
*   **Algebraic Step:** Substitute $c_2=0$ and $c_3=0$ into (Equation 1):
    $$ c_1 + 0 + 0 = 0 \Rightarrow c_1 = 0 $$
*   **Explanation:** And finally $c_1$.
*   **Conclusion:** Since the only solution is $c_1=0, c_2=0, c_3=0$, the set $B$ is linearly independent.

**Step 2: Check if $B$ Spans $\mathbb{R}^3$**
*   **Plain English:** We need to show that any arbitrary vector $(x,y,z)$ in $\mathbb{R}^3$ can be written as a linear combination of the vectors in $B$.
*   **Algebraic Step:** Let $(x,y,z)$ be any vector in $\mathbb{R}^3$. We want to find scalars $c_1, c_2, c_3$ such that:
    $$ c_1(1,0,0) + c_2(1,1,0) + c_3(1,1,1) = (x,y,z) $$
*   **Explanation:** This sets up the spanning condition.
*   **Algebraic Step:** Form a system of linear equations:
    $$ c_1 + c_2 + c_3 = x \quad \text{(Equation 4)} $$
    $$ c_2 + c_3 = y \quad \text{(Equation 5)} $$
    $$ c_3 = z \quad \text{(Equation 6)} $$
*   **Explanation:** Again, equating components. Notice this is an upper triangular system, which is easy to solve.
*   **Algebraic Step:** Solve using back-substitution. From (Equation 6):
    $$ c_3 = z $$
*   **Explanation:** $c_3$ is directly found.
*   **Algebraic Step:** Substitute $c_3=z$ into (Equation 5):
    $$ c_2 + z = y \Rightarrow c_2 = y - z $$
*   **Explanation:** Now $c_2$ is found.
*   **Algebraic Step:** Substitute $c_2=y-z$ and $c_3=z$ into (Equation 4):
    $$ c_1 + (y-z) + z = x $$
    $$ c_1 + y = x \Rightarrow c_1 = x - y $$
*   **Explanation:** And finally $c_1$.
*   **Conclusion:** Since we can always find such scalars ($c_1=x-y, c_2=y-z, c_3=z$) for any $(x,y,z) \in \mathbb{R}^3$, the set $B$ spans $\mathbb{R}^3$.

**Step 3: Conclude $B$ is a Basis**
*   **Plain English:** $B$ is both linearly independent and spans $\mathbb{R}^3$.
*   **Conclusion:** Because $B$ is linearly independent and spans $\mathbb{R}^3$, $B = \{(1,0,0), (1,1,0), (1,1,1)\}$ is a basis for $\mathbb{R}^3$.

**Step 4: Find the Coordinates of $\mathbf{v} = (2,3,4)$ with respect to $B$}
*   **Plain English:** We need to find the unique scalars $c_1, c_2, c_3$ such that $c_1(1,0,0) + c_2(1,1,0) + c_3(1,1,1) = (2,3,4)$.
*   **Algebraic Step:** Use the formulas derived in Step 2 with $x=2, y=3, z=4$:
    $$ c_1 = x - y = 2 - 3 = -1 $$
    $$ c_2 = y - z = 3 - 4 = -1 $$
    $$ c_3 = z = 4 $$
*   **Explanation:** We're directly applying the general solution for the coefficients to our specific vector.
*   **Check (Optional but Recommended):**
    $$ -1(1,0,0) + (-1)(1,1,0) + 4(1,1,1) $$
    $$ = (-1,0,0) + (-1,-1,0) + (4,4,4) $$
    $$ = (-1-1+4, 0-1+4, 0+0+4) $$
    $$ = (2,3,4) $$
*   **Explanation:** The check confirms our calculations are correct.
*   **Final Answer:** The coordinate vector of $\mathbf{v}$ with respect to $B$ is:
    $$ \boxed{[\mathbf{v}]_B = \begin{pmatrix} -1 \\ -1 \\ 4 \end{pmatrix}} $$
*   **Reflection:** This example used a basis that's not orthogonal (vectors are not perpendicular), which is common. The method of setting up and solving a system of linear equations (often via Gaussian elimination or back-substitution) is the standard approach for both checking basis properties and finding coordinates. The structure of the basis vectors here made the system upper triangular, simplifying the solution.

---

### Example 4: Basis for a Polynomial Space

**Problem:** Show that the set $B = \{1, x, x^2\}$ is a basis for $P_2$, the vector space of all polynomials of degree at most 2. Then, find the coordinates of the polynomial $p(x) = 3x^2 - 2x + 5$ with respect to this basis.

**Given:** Set of vectors $B = \{1, x, x^2\}$, Vector space $V = P_2$, Polynomial $p(x) = 3x^2 - 2x + 5$.
**Want:**
1.  Prove $B$ is a basis for $P_2$.
2.  Find $[p(x)]_B$.

---

**Step 1: Check for Linear Independence**
*   **Plain English:** We need to ensure that none of the polynomials $1, x, x^2$ can be expressed as a linear combination of the others. For example, $x^2$ cannot be formed by combining $1$ and $x$.
*   **Algebraic Step:** Set a linear combination of the polynomials in $B$ equal to the zero polynomial $\mathbf{0} = 0 + 0x + 0x^2$:
    $$ c_1(1) + c_2(x) + c_3(x^2) = 0 $$
    $$ c_1 + c_2x + c_3x^2 = 0 $$
*   **Explanation:** This is the definition of linear independence for polynomials. The zero polynomial means all coefficients are zero.
*   **Algebraic Step:** For a polynomial to be identically zero for all $x$, all its coefficients must be zero.
    $$ c_1 = 0 $$
    $$ c_2 = 0 $$
    $$ c_3 = 0 $$
*   **Explanation:** This is a fundamental property of polynomials. If $ax^2+bx+c=0$ for all $x$, then $a=b=c=0$.
*   **Conclusion:** Since the only solution is $c_1=0, c_2=0, c_3=0$, the set $B$ is linearly independent.

**Step 2: Check if $B$ Spans $P_2$**
*   **Plain English:** We need to show that *any* polynomial $ax^2 + bx + c$ (where $a,b,c$ are any real numbers) can be written as a linear combination of $1, x, x^2$.
*   **Algebraic Step:** Let $p(x) = ax^2 + bx + c$ be any polynomial in $P_2$. We want to find scalars $c_1, c_2, c_3$ such that:
    $$ c_1(1) + c_2(x) + c_3(x^2) = ax^2 + bx + c $$
    $$ c_1 + c_2x + c_3x^2 = c + bx + ax^2 $$
*   **Explanation:** This is the definition of spanning for polynomial spaces. We are trying to match coefficients.
*   **Algebraic Step:** By comparing the coefficients of the powers of $x$ on both sides:
    $$ c_1 = c $$
    $$ c_2 = b $$
    $$ c_3 = a $$
*   **Explanation:** For two polynomials to be equal, their corresponding coefficients must be equal.
*   **Conclusion:** Since we can always find such scalars ($c_1=c, c_2=b, c_3=a$) for any polynomial $ax^2+bx+c \in P_2$, the set $B$ spans $P_2$.

**Step 3: Conclude $B$ is a Basis**
*   **Plain English:** $B$ is both linearly independent and spans $P_2$.
*   **Conclusion:** Because $B$ is linearly independent and spans $P_2$, $B = \{1, x, x^2\}$ is a basis for $P_2$. This is often called the *standard basis* for $P_2$.

**Step 4: Find the Coordinates of $p(x) = 3x^2 - 2x + 5$ with respect to $B$}
*   **Plain English:** We need to find the unique scalars $c_1, c_2, c_3$ such that $c_1(1) + c_2(x) + c_3(x^2) = 3x^2 - 2x + 5$.
*   **Algebraic Step:** Set up the equation:
    $$ c_1 + c_2x + c_3x^2 = 5 - 2x + 3x^2 $$
*   **Explanation:** We're writing the polynomial in the form of a linear combination of the basis vectors.
*   **Algebraic Step:** Compare coefficients:
    $$ c_1 = 5 $$
    $$ c_2 = -2 $$
    $$ c_3 = 3 $$
*   **Explanation:** The coefficients of the polynomial directly become the coordinates with respect to the standard basis.
*   **Final Answer:** The coordinate vector of $p(x)$ with respect to $B$ is:
    $$ \boxed{[p(x)]_B = \begin{pmatrix} 5 \\ -2 \\ 3 \end{pmatrix}} $$
*   **Reflection:** This example demonstrates that vector spaces are not just about arrows in $\mathbb{R}^n$. Polynomials, matrices, and even functions can form vector spaces, and the concept of a basis applies universally. The process of finding coordinates involves matching coefficients, which is analogous to solving a system of linear equations for $\mathbb{R}^n$. Notice the order of coordinates typically follows the order of basis vectors (e.g., constant term, then $x$, then $x^2$).

## 6. Common mistakes and traps

1.  **Confusing a spanning set with a basis:** A spanning set can be linearly dependent (have redundant vectors). A basis *must* be linearly independent.
2.  **Confusing a linearly independent set with a basis:** A linearly independent set might not span the entire vector space (it might be too small). A basis *must* span the space.
3.  **Forgetting to check *both* conditions:** Many students check only linear independence or only spanning. Both are required for a set to be a basis.
4.  **Assuming the standard basis is the *only* basis:** For any given vector space, there are infinitely many possible bases (unless the space is trivial, $\{\mathbf{0}\}$). The standard basis is just one convenient choice.
5.  **Incorrectly solving for coefficients when finding unique representation:** This usually boils down to errors in solving systems of linear equations. Practice with Gaussian elimination and back-substitution is key.
6.  **Thinking the number of vectors in a basis can vary for a given space:** While a vector space can have many *different* bases, all bases for a particular vector space will always contain the *same number* of vectors. This number is called the **dimension** of the vector space.

## 7. Textbook-precise explanation

Let $V$ be a vector space over a scalar field $\mathbb{F}$ (typically $\mathbb{R}$ or $\mathbb{C}$).

**Definition (Basis):**
A set of vectors $B = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ in $V$ is called a **basis** for $V$ if the following two conditions are satisfied:
1.  **Linear Independence:** The set $B$ is linearly independent. That is, the only scalars $c_1, c_2, \dots, c_n \in \mathbb{F}$ for which
    $$ c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n = \mathbf{0} $$
    is the trivial solution $c_1 = c_2 = \dots = c_n = 0$.
2.  **Spanning Property:** The set $B$ spans $V$. That is, for every vector $\mathbf{v} \in V$, there exist scalars $c_1, c_2, \dots, c_n \in \mathbb{F}$ such that
    $$ \mathbf{v} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n $$

**Theorem (Uniqueness of Representation):**
If $B = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ is a basis for a vector space $V$, then for every vector $\mathbf{v} \in V$, the representation of $\mathbf{v}$ as a linear combination of the vectors in $B$ is **unique**. That is, there exists one and only one set of scalars $c_1, c_2, \dots, c_n \in \mathbb{F}$ such that $\mathbf{v} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n$.

*Proof:* Let $B = \{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ be a basis for $V$. By the spanning property, for any $\mathbf{v} \in V$, there exists at least one set of scalars $c_1, \dots, c_n$ such that $\mathbf{v} = c_1\mathbf{v}_1 + \dots + c_n\mathbf{v}_n$.
To prove uniqueness, assume there are two such representations for a given $\mathbf{v}$:
$$ \mathbf{v} = c_1\mathbf{v}_1 + \dots + c_n\mathbf{v}_n $$
$$ \mathbf{v} = d_1\mathbf{v}_1 + \dots + d_n\mathbf{v}_n $$
Subtracting the second equation from the first yields:
$$ \mathbf{0} = (c_1 - d_1)\mathbf{v}_1 + \dots + (c_n - d_n)\mathbf{v}_n $$
Since $B$ is a basis, it is linearly independent. By the definition of linear independence, the only way for this linear combination to equal the zero vector is if all coefficients are zero:
$$ c_1 - d_1 = 0 \implies c_1 = d_1 $$
$$ c_2 - d_2 = 0 \implies c_2 = d_2 $$
$$ \vdots $$
$$ c_n - d_n = 0 \implies c_n = d_n $$
Thus, the coefficients must be identical, proving that the representation is unique.

**Definition (Coordinates Relative to a Basis):**
Let $B = \{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$ be an **ordered basis** for a vector space $V$. For any vector $\mathbf{v} \in V$, the unique scalars $c_1, c_2, \dots, c_n$ such that $\mathbf{v} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_n\mathbf{v}_n$ are called the **coordinates of $\mathbf{v}$ relative to the basis $B$**. The column vector
$$ [\mathbf{v}]_B = \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix} $$
is called the **coordinate vector of $\mathbf{v}$ relative to $B$**.

*Note:* The order of vectors in an ordered basis is important, as it determines the order of the coordinates in the coordinate vector.

(Refer to: Lay, David C., Lay, Steven R., McDonald, Judi J. *Linear Algebra and Its Applications*, 5th ed., Pearson, 2016, §4.3. Also, Strang, Gilbert. *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016, §2.1 and §3.4.)

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to illustrate basis vectors and vector representation in $\mathbb{R}^2$.

```text
Diagram 1: Standard Basis in R^2

  ^ y
  |
  | (0,1)  e2
  |   ^
  |   |
  +---+------> x
  (0,0) (1,0)  e1

Vector v = (2,3) in standard basis:
  ^ y
  |     v=(2,3)
  |     .
  |     .
  |     .
  |     .
  |     .
  |     .
  |     .
  +-----+------> x
  (0,0) (1,0) (2,0)
     v = 2*e1 + 3*e2
     v = 2*(1,0) + 3*(0,1)

This shows the standard basis vectors e1 and e2.
The vector v=(2,3) is represented as 2 units along e1 and 3 units along e2.
```

```text
Diagram 2: Non-Standard Basis in R^2

Let B = {b1, b2} be a basis where:
b1 = (1,1)
b2 = (1,-1)

  ^ y
  |   / b1=(1,1)
  |  /
  | /
  |/
  +----- b2=(1,-1)
  |\
  | \
  |  \

Representing v = (3,1) in this basis:
We found in Example 2 that v = 2*b1 + 1*b2.

  ^ y
  |   /
  |  /  v=(3,1)
  | /  .
  |/  .
  +----- b2=(1,-1)
  |\   .
  | \  .
  |  \ .
  |   \.
  |    v = 2*b1 + 1*b2
  |        = 2*(1,1) + 1*(1,-1)
  |        = (2,2) + (1,-1)
  |        = (3,1)

This diagram shows how a vector v=(3,1) is decomposed into components along
the non-standard basis vectors b1 and b2. The coordinates (2,1)
refer to how many "steps" in the b1 and b2 directions are needed to reach v.
```

## 9. Memory technique — never forget this

1.  **Mnemonic:** "A **B**asis **L**oves **I**ts **S**pan **U**niquely."
    *   **B**asis: The concept itself.
    *   **L**oves **I**ts: **L**inearly **I**ndependent (no redundancy).
    *   **S**pan: **S**pans the entire vector space (can reach everywhere).
    *   **U**niquely: Every vector has a **U**nique representation (coordinates).

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   A set $B = \{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is a basis for $V$ if and only if:
        1.  $B$ is linearly independent.
        2.  $\text{span}(B) = V$.
    *   If $B$ is a basis for $V$, then for any $\mathbf{v} \in V$, there exist **unique** scalars $c_1, \dots, c_n$ such that $\mathbf{v} = c_1\mathbf{v}_1 + \dots + c_n\mathbf{v}_n$.
    *   All bases for a given vector space $V$ have the same number of vectors. This number is the **dimension** of $V$.

3.  **Spaced-Repetition Schedule:**
    *   **Today (Day 0):** Thoroughly review this lesson, work through all examples, and attempt the self-check questions.
    *   **Tomorrow (Day 1):** Briefly review the definitions, the uniqueness theorem, and the mnemonic. Try to recall the conditions for a basis without looking.
    *   **In 3 Days (Day 3):** Rework one or two examples from memory. Can you prove the uniqueness of representation?
    *   **In 7 Days (Day 7):** Explain the concept of a basis and uniqueness to an imaginary friend or rubber duck. What are the common pitfalls?
    *   **In 16 Days (Day 16):** Solve a new problem involving finding coordinates in a non-standard basis.
    *   **In 35 Days (Day 35):** Connect the concept of basis to dimension and change of basis (once you've learned those topics).

4.  **First-Principles Re-derivation Pathway:**
    *   **Start with the most basic building block: a linear combination.** Understand what $c_1\mathbf{v}_1 + \dots + c_k\mathbf{v}_k$ means.
    *   **From linear combinations, define "span".** The span is simply *all possible* linear combinations. If this set of all possible combinations equals your entire vector space $V$, then your vectors *span* $V$.
    *   **From linear combinations, define "linear independence".** If the *only* way to get the zero vector from a linear combination is to use all zero coefficients, then the vectors are linearly independent. This means no vector is redundant.
    *   **Combine these two ideas:** A set is a basis if it is *both* linearly independent (efficient) *and* spans the space (complete).
    *   **Prove uniqueness from linear independence:** Assume two different representations exist for the same vector. Subtract them to get a linear combination of basis vectors equaling the zero vector. Because the basis is linearly independent, all coefficients in this new combination must be zero, which implies the original coefficients were identical. This proves uniqueness.

## 10. Connections — what this leads to

Understanding bases is absolutely foundational. It unlocks a vast array of subsequent topics in linear algebra and beyond:

*   **Dimension of a Vector Space:** The number of vectors in any basis for a given vector space is always the same. This unique number is defined as the **dimension** of the vector space. This is a critical concept for classifying and understanding vector spaces.
*   **Change of Basis:** Since a vector can have different coordinate representations depending on the chosen basis, we need a way to convert coordinates from one basis to another. This is achieved through **change-of-basis matrices**, which are direct applications of the uniqueness of representation.
*   **Linear Transformations and Matrix Representation:** Linear transformations (functions between vector spaces that preserve vector addition and scalar multiplication) can be represented by matrices. The entries of these matrices depend entirely on the choice of bases for the domain and codomain spaces. Choosing an appropriate basis can simplify the matrix representation of a transformation (e.g., diagonalizing a matrix).
*   **Eigenvalues and Eigenvectors:** Eigenvectors are special vectors that are only scaled by a linear transformation, not changed in direction. They form a particularly useful basis (an eigenbasis) in which the matrix of the transformation is diagonal, making computations much simpler.
*   **Orthogonal and Orthonormal Bases:** These are bases where the basis vectors are mutually perpendicular (orthogonal) and have unit length (orthonormal). They simplify many calculations, especially projections and distance measurements. The **Gram-Schmidt process** is a method for constructing an orthogonal basis from any given basis.
*   **Fourier Series and Wavelets (Function Spaces):** The concept of a basis extends beyond finite-dimensional vector spaces like $\mathbb{R}^n$ to infinite-dimensional function spaces. Fourier series represent functions as infinite linear combinations of sine and cosine functions, which form a basis for certain function spaces. Wavelets provide another set of basis functions useful in signal processing and image analysis.
*   **Row Space, Column Space, Null Space:** These fundamental subspaces associated with a matrix are defined by their bases. Finding bases for these spaces is crucial for understanding the properties and behavior of linear systems and transformations.

## 11. Self-check questions

1.  Consider the set $S = \{(1,2), (2,4)\}$. Is this set a basis for $\mathbb{R}^2$? Justify your answer by explicitly checking both conditions.
2.  Given the set $B = \{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\} = \{(1,0,1), (0,1,1), (1,1,0)\}$, determine if it is a basis for $\mathbb{R}^3$. If it is, find the coordinate vector of $\mathbf{w} = (2,3,2)$ with respect to $B$.
3.  Can a vector space have more than one basis? If so, what fundamental property do all bases for that specific vector space share? If not, why not?
4.  Prove the following statement: If a set of vectors $S$ contains the zero vector ($\mathbf{0}$), then $S$ cannot be a basis for any vector space (unless the vector space is trivial, i.e., consists only of the zero vector).
5.  Let $V$ be the vector space of all $2 \times 2$ matrices, denoted $M_{2 \times 2}$.
    a.  Propose a set of four matrices $B = \{M_1, M_2, M_3, M_4\}$ that you believe could be a basis for $V$.
    b.  Using your proposed set $B$, demonstrate (conceptually, not necessarily with full algebraic detail unless you wish) how you would check if it satisfies the two conditions for being a basis.
    c.  If $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ is a matrix in $V$, how would you find its coordinate vector $[A]_B$ with respect to your proposed basis $B$?