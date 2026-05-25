## 1. What it is — in plain English

Imagine you have an arrow pointing in a specific direction in space. This arrow is a physical thing; it exists regardless of how you choose to describe its position or direction. Now, imagine you have a grid system (like graph paper) to describe this arrow. You could say the arrow goes "3 units to the right and 2 units up." These numbers (3 and 2) are the *components* of the arrow in that specific grid system.

Now, what if you change your grid? What if your graph paper squares are stretched, or the axes aren't perfectly perpendicular? The physical arrow hasn't changed, but the numbers you use to describe it will certainly change. This is where "covariant" and "contravariant" come in. They are just two different, but equally valid, ways to get those numbers (components) from the same physical arrow, especially when your grid isn't perfectly square or orthogonal.

Think of it like this: one way of measuring components is by seeing how much you have to "stretch" your grid lines to reach the end of the arrow. The other way is by seeing how much of the arrow "lines up" with each direction of your grid, by dropping perpendiculars. In a normal, square grid, these two ways give you the exact same numbers. But in a skewed, non-square grid, they give you different numbers, and they transform differently when you switch to another skewed grid.

These two types of components tell us how a vector's description changes when we change our coordinate system. "Contravariant" components scale inversely to how the basis vectors scale, while "covariant" components scale directly with how the basis vectors scale. It's all about maintaining the physical reality of the vector, no matter how we choose to view it through our mathematical lens.

## 2. Why it matters — real-world applications

The distinction between covariant and contravariant components is fundamental in advanced physics and engineering, especially when dealing with curved spaces or non-Cartesian coordinate systems.

1.  **General Relativity and Cosmology:** This is perhaps the most famous application. Einstein's theory of General Relativity describes gravity not as a force, but as the curvature of spacetime. To work with curved spacetime, physicists use tensor calculus, which heavily relies on covariant and contravariant components. For instance, the metric tensor, which defines distances and angles in curved space, has covariant components ($g_{\mu\nu}$), while the four-velocity of a particle often has contravariant components ($u^\mu$). Understanding their transformation properties is crucial for writing physical laws that hold true in any coordinate system, a principle known as general covariance. This allows scientists to model phenomena like black holes, gravitational waves, and the expansion of the universe.

2.  **Robotics and Computer Graphics:** When designing robotic arms or rendering complex 3D scenes, objects and their movements are often described using various coordinate systems (e.g., world coordinates, joint coordinates, camera coordinates). Transformations between these systems involve rotating, translating, and scaling. While often simplified to orthonormal Cartesian systems, in more advanced scenarios (e.g., non-Euclidean spaces for path planning on curved surfaces, or using non-linear transformations), understanding how vector components transform (covariant vs. contravariant) becomes vital. For example, tangent vectors to a path (representing velocity) are contravariant, while gradient vectors (representing directions of steepest ascent/descent) are covariant. Correctly transforming these ensures that a robot's movement or an object's rendering remains physically accurate regardless of the chosen internal representation.

3.  **Fluid Dynamics and Continuum Mechanics:** In the study of fluids, solids, and materials, physical quantities like stress, strain, and velocity fields are often represented by tensors. For example, the stress tensor, which describes internal forces within a material, can have both covariant and contravariant indices depending on how it's defined and what coordinate system is used. When analyzing fluid flow through complex geometries (e.g., an airplane wing, or blood flow in arteries), engineers use curvilinear coordinates (like cylindrical or spherical coordinates). The equations governing fluid motion (Navier-Stokes equations) must be expressed in a form that is valid in these coordinate systems, requiring careful handling of covariant and contravariant components to ensure physical consistency.

4.  **Machine Learning and Manifold Learning:** In advanced machine learning, especially in areas like manifold learning or deep learning on non-Euclidean data (e.g., graphs, point clouds), data points are often viewed as residing on a curved manifold. Algorithms might need to compute gradients (covariant vectors) or tangent vectors (contravariant vectors) on these manifolds. For instance, when optimizing a loss function defined on a Riemannian manifold, the direction of steepest descent (the gradient) is a covariant vector, and its transformation properties are crucial for ensuring the optimization process is robust to coordinate choices on the manifold. This allows for more sophisticated data analysis and model training in complex, high-dimensional data spaces.

## 3. Prerequisites — what you must know first

Before diving into covariant and contravariant components, ensure you have a solid grasp of the following concepts:

*   **Vectors:** Understanding what a vector is geometrically (an arrow with magnitude and direction) and algebraically (an ordered list of numbers).
*   **Basis Vectors:** The concept of a set of linearly independent vectors that span a vector space, allowing any vector in that space to be expressed as a linear combination of these basis vectors.
*   **Linear Combinations:** How to form a new vector by scaling and adding existing vectors.
*   **Dot Product (Scalar Product):** Its geometric interpretation (projection, angle between vectors) and algebraic computation ($ \vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos\theta $ or $ \sum a_i b_i $ in orthonormal Cartesian coordinates).
*   **Orthonormal Basis:** A basis where all basis vectors are mutually perpendicular and have unit length.
*   **General (Oblique) Basis:** A basis where basis vectors are not necessarily perpendicular or of unit length.
*   **Change of Basis:** How to transform the components of a vector from one basis to another using a transformation matrix.
*   **Dual Space and Dual Basis (briefly):** The space of linear functionals (covectors) on a vector space, and a basis for this dual space. Understanding that a covector "eats" a vector and spits out a scalar.
*   **Partial Derivatives:** For understanding how components transform under general coordinate transformations.
*   **Einstein Summation Convention:** The implicit summation over repeated indices (one upper, one lower) in a term. This is absolutely critical for compact tensor notation.

## 4. The core idea — step by step

The core idea revolves around how we represent a physical vector using numbers (its components) and how these numbers change when we change our coordinate system, especially when that system isn't a simple, orthogonal grid.

### ### Step 1: Vectors are independent of coordinate systems

**Plain English:** An arrow pointing from one spot to another in the real world doesn't care how you've drawn your graph paper. It's a fundamental, geometric object. Its length and direction are intrinsic properties.

**Small concrete example:** Imagine a physical stick lying on the ground. Its length and orientation are fixed. You can describe its position relative to a tree, or relative to a house, or using GPS coordinates, but the stick itself remains the same stick.

**Formal/Mathematical Version:** A vector $\vec{v}$ is an element of a vector space $V$. It exists abstractly, independent of any chosen basis. We can write it as $\vec{v} \in V$.

**What could go wrong:** Confusing the physical vector $\vec{v}$ with its numerical representation (its components). The components *describe* the vector in a particular basis, but they *are not* the vector itself. If you change your basis, the components change, but the vector $\vec{v}$ does not.

### ### Step 2: Components depend on the basis

**Plain English:** While the physical arrow is fixed, the numbers you use to describe it depend entirely on the grid you lay over space. If you use a grid with squares, you get one set of numbers. If you use a grid with skewed parallelograms, you get a different set of numbers for the *same* arrow.

**Small concrete example:** An arrow points from the origin to $(3,2)$ in a standard Cartesian grid. If you rotate your grid by 45 degrees, the arrow still points to the same physical location, but its new coordinates might be $(\sqrt{13}, 0)$ if you align one axis with it, or something else if the axes are just rotated.

**Formal/Mathematical Version:** Given a basis $\{\vec{e}_1, \vec{e}_2, \dots, \vec{e}_n\}$ for an $n$-dimensional vector space, any vector $\vec{v}$ can be uniquely expressed as a linear combination of these basis vectors:
$$ \vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2 + \dots + v^n \vec{e}_n $$
Using Einstein summation convention, this is written as:
$$ \vec{v} = v^i \vec{e}_i $$
The numbers $v^i$ are the *components* of $\vec{v}$ with respect to the basis $\{\vec{e}_i\}$.

**What could go wrong:** Assuming that the components $v^i$ are fixed properties of the vector. They are not; they are properties of the vector *relative to a specific basis*.

### ### Step 3: Two natural ways to project (measure) components

**Plain English:** When you have a vector and a coordinate grid, there are two intuitive ways to "measure" how much of the vector lies along each axis, especially if the axes aren't perpendicular.
1.  **"Stretching" along axes:** You can imagine extending lines parallel to your axes until they meet the tip of your vector. The lengths along the axes are your components.
2.  **"Perpendicular shadows":** You can imagine casting shadows of your vector onto each axis, where the light source is perpendicular to the *other* axes. The lengths of these shadows are your components.

**Small concrete example:** Imagine a stick $\vec{v}$ and two non-perpendicular axes, $\vec{e}_1$ and $\vec{e}_2$.
*   To get the first type of component, you draw a line from the tip of $\vec{v}$ parallel to $\vec{e}_2$ until it hits $\vec{e}_1$. The length along $\vec{e}_1$ is one component. Repeat for $\vec{e}_2$.
*   To get the second type of component, you draw a line from the tip of $\vec{v}$ perpendicular to $\vec{e}_1$ until it hits $\vec{e}_1$. The length along $\vec{e}_1$ is the other component. Repeat for $\vec{e}_2$.
In a standard Cartesian grid, these two methods give the same numbers. In a skewed grid, they give different numbers.

**Formal/Mathematical Version:**
1.  **Contravariant components ($v^i$):** These are the coefficients $v^i$ in the linear combination $\vec{v} = v^i \vec{e}_i$. Geometrically, they represent the projections *parallel* to the basis vectors.
2.  **Covariant components ($v_i$):** These are defined by taking the dot product of the vector $\vec{v}$ with each basis vector: $v_i = \vec{v} \cdot \vec{e}_i$. Geometrically, they represent the orthogonal projections *onto* the basis vectors.

**What could go wrong:** Not appreciating that the distinction only matters in non-orthonormal bases. In an orthonormal basis, $\vec{e}_i \cdot \vec{e}_j = \delta_{ij}$ (Kronecker delta), and the two types of components become identical. This can lead to confusion when first learning the concept.

### ### Step 4: Contravariant components ($v^i$)

**Plain English:** These components tell you "how much of each basis vector" you need to add up, stretching them out, to reach the tip of your original vector. They are the standard coefficients you're probably used to from basic linear algebra.

**Small concrete example:** If your basis vectors are $\vec{e}_1 = (1,0)$ and $\vec{e}_2 = (0,1)$ (standard Cartesian), and your vector is $\vec{v} = (3,2)$, then $\vec{v} = 3\vec{e}_1 + 2\vec{e}_2$. Here, $v^1=3$ and $v^2=2$ are the contravariant components.
Now, consider an oblique basis: $\vec{e}_1 = (1,0)$ and $\vec{e}_2 = (1,1)$. If $\vec{v} = (3,2)$, we need to find $v^1, v^2$ such that $(3,2) = v^1(1,0) + v^2(1,1)$. This gives $v^1+v^2=3$ and $v^2=2$. So $v^1=1, v^2=2$. These are the contravariant components.

**Formal/Mathematical Version:** The contravariant components $v^i$ of a vector $\vec{v}$ with respect to a basis $\{\vec{e}_i\}$ are the unique scalars such that:
$$ \vec{v} = v^i \vec{e}_i $$
(using Einstein summation convention).
The superscript 'i' indicates contravariant components.

**What could go wrong:** In an orthonormal basis, it's tempting to think $v^i = \vec{v} \cdot \vec{e}_i$. While this is true in orthonormal bases, it's not the *definition* of contravariant components, but rather a consequence of the orthonormality. The defining property is that they are the coefficients of the linear combination.

### ### Step 5: Covariant components ($v_i$)

**Plain English:** These components tell you "how much" your vector $\vec{v}$ "lines up" with each basis direction $\vec{e}_i$, measured by taking the dot product. It's like finding the length of the orthogonal shadow of $\vec{v}$ onto each basis vector.

**Small concrete example:** Using the same oblique basis: $\vec{e}_1 = (1,0)$ and $\vec{e}_2 = (1,1)$. And $\vec{v} = (3,2)$.
The covariant components $v_i$ are found by dot product:
$v_1 = \vec{v} \cdot \vec{e}_1 = (3,2) \cdot (1,0) = 3 \times 1 + 2 \times 0 = 3$.
$v_2 = \vec{v} \cdot \vec{e}_2 = (3,2) \cdot (1,1) = 3 \times 1 + 2 \times 1 = 5$.
So, $v_1=3$ and $v_2=5$ are the covariant components. Notice these are different from the contravariant components ($v^1=1, v^2=2$) for the same vector in the same oblique basis.

**Formal/Mathematical Version:** The covariant components $v_i$ of a vector $\vec{v}$ with respect to a basis $\{\vec{e}_i\}$ are defined as:
$$ v_i = \vec{v} \cdot \vec{e}_i $$
The subscript 'i' indicates covariant components.

**What could go wrong:** Confusing the definition of covariant components with the definition of contravariant components. Remember, $v_i = \vec{v} \cdot \vec{e}_i$ is *always* true for covariant components, whereas $v^i$ are the coefficients in $\vec{v} = v^i \vec{e}_i$.

### ### Step 6: How they transform (The key distinction)

**Plain English:** The defining characteristic that gives them their names ("covariant" and "contravariant") is how their numerical values change when you switch from one coordinate system to another.
*   **Contravariant components** transform "contra" (opposite) to the way the basis vectors transform. If the new basis vectors are "smaller" (scaled down), the contravariant components become "larger" to compensate, ensuring the physical vector remains the same. They transform like the coordinates themselves.
*   **Covariant components** transform "co" (with) the way the basis vectors transform. If the new basis vectors are "smaller", the covariant components also become "smaller". They transform like the basis vectors themselves (or rather, like the dual basis vectors).

**Small concrete example:** Let's say we have an old coordinate system $(x^1, x^2)$ and a new one $(x'^1, x'^2)$.
If a basis vector $\vec{e}_i$ transforms to $\vec{e}'_j = A^i_j \vec{e}_i$ (where $A^i_j$ is a transformation matrix), then:
*   Contravariant components $v^i$ transform as $v'^j = (A^{-1})^j_i v^i$.
*   Covariant components $v_i$ transform as $v'_j = A^i_j v_i$.
Notice the inverse matrix for contravariant components.

**Formal/Mathematical Version:**
Let $x^i$ be the coordinates in the old system and $x'^j$ be the coordinates in the new system.
The transformation rules are:
*   **Contravariant components:** When changing from basis $\{\vec{e}_i\}$ to $\{\vec{e}'_j\}$, the contravariant components $v^i$ transform as:
    $$ v'^j = \frac{\partial x'^j}{\partial x^i} v^i $$
    This is called a *contravariant transformation* because the components transform with the Jacobian matrix of the coordinate transformation.
*   **Covariant components:** When changing from basis $\{\vec{e}_i\}$ to $\{\vec{e}'_j\}$, the covariant components $v_i$ transform as:
    $$ v'_j = \frac{\partial x^i}{\partial x'^j} v_i $$
    This is called a *covariant transformation* because the components transform with the inverse of the Jacobian matrix (or with the Jacobian of the inverse transformation).

**What could go wrong:** Swapping the transformation matrices or the partial derivatives. The position of the indices (superscript for contravariant, subscript for covariant) is a powerful mnemonic for remembering which transformation rule applies. "Contra" implies transformation "against" the basis, "co" implies transformation "with" the dual basis.

### ### Step 7: The Metric Tensor ($g_{ij}$)

**Plain English:** The metric tensor is like a "conversion tool" or a "ruler" that tells you how the basis vectors relate to each other (their lengths and angles between them). It allows you to switch between covariant and contravariant components without having to go back to the original vector definition. It's the mathematical object that encodes the "geometry" of your coordinate system.

**Small concrete example:** In a standard Cartesian system, the basis vectors are orthogonal and unit length. The dot product $\vec{e}_i \cdot \vec{e}_j$ is 1 if $i=j$ and 0 if $i \neq j$. This is the identity matrix. In this case, $v_i = g_{ij} v^j = \delta_{ij} v^j = v^i$. So, covariant and contravariant components are the same.
In our oblique basis $\vec{e}_1 = (1,0)$, $\vec{e}_2 = (1,1)$:
$g_{11} = \vec{e}_1 \cdot \vec{e}_1 = (1,0)\cdot(1,0) = 1$
$g_{12} = \vec{e}_1 \cdot \vec{e}_2 = (1,0)\cdot(1,1) = 1$
$g_{21} = \vec{e}_2 \cdot \vec{e}_1 = (1,1)\cdot(1,0) = 1$
$g_{22} = \vec{e}_2 \cdot \vec{e}_2 = (1,1)\cdot(1,1) = 2$
So the metric tensor is $G = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}$.
Using this, we can convert $v^1=1, v^2=2$ to $v_1, v_2$:
$v_1 = g_{11}v^1 + g_{12}v^2 = 1(1) + 1(2) = 3$.
$v_2 = g_{21}v^1 + g_{22}v^2 = 1(1) + 2(2) = 5$.
These match the $v_1=3, v_2=5$ we found earlier by direct dot product.

**Formal/Mathematical Version:** The metric tensor $g_{ij}$ in a given basis $\{\vec{e}_i\}$ is defined by the dot products of the basis vectors:
$$ g_{ij} = \vec{e}_i \cdot \vec{e}_j $$
It provides the link between covariant and contravariant components:
$$ v_i = g_{ij} v^j $$
To go the other way (from covariant to contravariant), we use the inverse of the metric tensor, denoted $g^{ij}$, where $g^{ik} g_{kj} = \delta^i_j$ (Kronecker delta).
$$ v^i = g^{ij} v_j $$
The metric tensor is symmetric ($g_{ij} = g_{ji}$).

**What could go wrong:** Forgetting that the metric tensor itself is basis-dependent. It encodes the geometry *of the basis*, not just the space itself. Also, confusing $g_{ij}$ with $g^{ij}$ (the inverse). Remember, $g_{ij}$ lowers indices, $g^{ij}$ raises them.

## 5. Worked examples — multiple, with every step shown

### Example 1: 2D Cartesian, orthonormal basis

**State the problem clearly:**
Given a vector $\vec{v} = (4,3)$ in a standard 2D Cartesian coordinate system. The basis vectors are $\vec{e}_1 = (1,0)$ and $\vec{e}_2 = (0,1)$. Find its contravariant and covariant components.

**Identify what's given and what we want:**
Given: $\vec{v} = (4,3)$, Basis $\{\vec{e}_1 = (1,0), \vec{e}_2 = (0,1)\}$.
Want: Contravariant components $v^1, v^2$ and Covariant components $v_1, v_2$.

**Show every algebraic / logical step:**

1.  **Find Contravariant Components ($v^i$):**
    *   **Definition:** $\vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2$.
    *   **Substitute values:** $(4,3) = v^1 (1,0) + v^2 (0,1)$.
        *   *Explanation:* We are expressing the vector $\vec{v}$ as a linear combination of the basis vectors $\vec{e}_1$ and $\vec{e}_2$. The coefficients will be the contravariant components.
    *   **Expand:** $(4,3) = (v^1, 0) + (0, v^2) = (v^1, v^2)$.
        *   *Explanation:* We perform the scalar multiplication and vector addition on the right side.
    *   **Equate components:** $v^1 = 4$ and $v^2 = 3$.
        *   *Explanation:* Since two vectors are equal if and only if their corresponding components are equal, we can directly read off the values.

2.  **Find Covariant Components ($v_i$):**
    *   **Definition:** $v_i = \vec{v} \cdot \vec{e}_i$.
    *   **Calculate $v_1$:**
        $v_1 = \vec{v} \cdot \vec{e}_1 = (4,3) \cdot (1,0)$
        *   *Explanation:* We apply the definition of the covariant component $v_1$ by taking the dot product of $\vec{v}$ with the first basis vector $\vec{e}_1$.
        $v_1 = (4)(1) + (3)(0) = 4 + 0 = 4$.
        *   *Explanation:* Perform the dot product calculation.
    *   **Calculate $v_2$:**
        $v_2 = \vec{v} \cdot \vec{e}_2 = (4,3) \cdot (0,1)$
        *   *Explanation:* Similarly, for $v_2$, we take the dot product of $\vec{v}$ with the second basis vector $\vec{e}_2$.
        $v_2 = (4)(0) + (3)(1) = 0 + 3 = 3$.
        *   *Explanation:* Perform the dot product calculation.

3.  **Summary:**
    Contravariant components: $v^1=4, v^2=3$.
    Covariant components: $v_1=4, v_2=3$.

**Final Answer:**
The contravariant components are $\boxed{v^1=4, v^2=3}$.
The covariant components are $\boxed{v_1=4, v_2=3}$.

**Reflection:** In an orthonormal Cartesian basis, the contravariant and covariant components are identical. This is a common special case that can sometimes mask the fundamental difference between the two types of components.

---

### Example 2: 2D Oblique Basis

**State the problem clearly:**
Given a vector $\vec{v} = (5, -1)$ in the standard Cartesian coordinate system. Now, consider an oblique basis given by $\vec{e}_1 = (1,1)$ and $\vec{e}_2 = (-1,2)$. Find the contravariant and covariant components of $\vec{v}$ with respect to this oblique basis.

**Identify what's given and what we want:**
Given: $\vec{v} = (5,-1)$, Basis $\{\vec{e}_1 = (1,1), \vec{e}_2 = (-1,2)\}$.
Want: Contravariant components $v^1, v^2$ and Covariant components $v_1, v_2$.

**Show every algebraic / logical step:**

1.  **Find Contravariant Components ($v^i$):**
    *   **Definition:** $\vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2$.
    *   **Substitute values:** $(5,-1) = v^1 (1,1) + v^2 (-1,2)$.
        *   *Explanation:* We express $\vec{v}$ as a linear combination of the oblique basis vectors.
    *   **Expand:** $(5,-1) = (v^1 - v^2, v^1 + 2v^2)$.
        *   *Explanation:* Perform scalar multiplication and vector addition.
    *   **Form a system of linear equations:**
        $v^1 - v^2 = 5 \quad (Eq. 1)$
        $v^1 + 2v^2 = -1 \quad (Eq. 2)$
        *   *Explanation:* Equate the corresponding x and y components to form a system of two equations with two unknowns.
    *   **Solve the system:**
        Subtract (Eq. 1) from (Eq. 2):
        $(v^1 + 2v^2) - (v^1 - v^2) = -1 - 5$
        $3v^2 = -6$
        $v^2 = -2$.
        *   *Explanation:* We use elimination to solve for $v^2$.
        Substitute $v^2 = -2$ into (Eq. 1):
        $v^1 - (-2) = 5$
        $v^1 + 2 = 5$
        $v^1 = 3$.
        *   *Explanation:* Substitute the value of $v^2$ back into one of the original equations to find $v^1$.

2.  **Find Covariant Components ($v_i$):**
    *   **Definition:** $v_i = \vec{v} \cdot \vec{e}_i$.
    *   **Calculate $v_1$:**
        $v_1 = \vec{v} \cdot \vec{e}_1 = (5,-1) \cdot (1,1)$
        *   *Explanation:* Apply the definition of $v_1$ using the dot product.
        $v_1 = (5)(1) + (-1)(1) = 5 - 1 = 4$.
        *   *Explanation:* Perform the dot product.
    *   **Calculate $v_2$:**
        $v_2 = \vec{v} \cdot \vec{e}_2 = (5,-1) \cdot (-1,2)$
        *   *Explanation:* Apply the definition of $v_2$ using the dot product.
        $v_2 = (5)(-1) + (-1)(2) = -5 - 2 = -7$.
        *   *Explanation:* Perform the dot product.

3.  **Summary:**
    Contravariant components: $v^1=3, v^2=-2$.
    Covariant components: $v_1=4, v_2=-7$.

**Final Answer:**
The contravariant components are $\boxed{v^1=3, v^2=-2}$.
The covariant components are $\boxed{v_1=4, v_2=-7}$.

**Reflection:** This example clearly shows that in an oblique basis, the contravariant and covariant components are generally different. The contravariant components tell us how to *construct* the vector from the basis vectors, while the covariant components tell us the *projection* of the vector onto each basis vector.

---

### Example 3: Finding Covariant Components using the Metric Tensor

**State the problem clearly:**
Using the same vector $\vec{v} = (5, -1)$ and oblique basis $\vec{e}_1 = (1,1)$, $\vec{e}_2 = (-1,2)$ from Example 2. We already found the contravariant components $v^1=3, v^2=-2$. Now, find the covariant components $v_1, v_2$ using the metric tensor.

**Identify what's given and what we want:**
Given: $\vec{v} = (5,-1)$, Basis $\{\vec{e}_1 = (1,1), \vec{e}_2 = (-1,2)\}$, Contravariant components $v^1=3, v^2=-2$.
Want: Covariant components $v_1, v_2$ using the metric tensor.

**Show every algebraic / logical step:**

1.  **Calculate the Metric Tensor ($g_{ij}$):**
    *   **Definition:** $g_{ij} = \vec{e}_i \cdot \vec{e}_j$.
    *   **Calculate $g_{11}$:**
        $g_{11} = \vec{e}_1 \cdot \vec{e}_1 = (1,1) \cdot (1,1) = (1)(1) + (1)(1) = 1 + 1 = 2$.
        *   *Explanation:* The first component of the metric tensor is the dot product of the first basis vector with itself.
    *   **Calculate $g_{12}$:**
        $g_{12} = \vec{e}_1 \cdot \vec{e}_2 = (1,1) \cdot (-1,2) = (1)(-1) + (1)(2) = -1 + 2 = 1$.
        *   *Explanation:* This is the dot product of the first basis vector with the second.
    *   **Calculate $g_{21}$:**
        $g_{21} = \vec{e}_2 \cdot \vec{e}_1 = (-1,2) \cdot (1,1) = (-1)(1) + (2)(1) = -1 + 2 = 1$.
        *   *Explanation:* This is the dot product of the second basis vector with the first. Note that $g_{21} = g_{12}$ because the dot product is commutative.
    *   **Calculate $g_{22}$:**
        $g_{22} = \vec{e}_2 \cdot \vec{e}_2 = (-1,2) \cdot (-1,2) = (-1)(-1) + (2)(2) = 1 + 4 = 5$.
        *   *Explanation:* The last component is the dot product of the second basis vector with itself.
    *   **Form the Metric Tensor Matrix:**
        $$ G = \begin{pmatrix} g_{11} & g_{12} \\ g_{21} & g_{22} \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 5 \end{pmatrix} $$
        *   *Explanation:* We assemble the calculated components into the metric tensor matrix.

2.  **Use the Metric Tensor to find Covariant Components ($v_i$):**
    *   **Formula:** $v_i = g_{ij} v^j$. In 2D, this expands to:
        $v_1 = g_{11}v^1 + g_{12}v^2$
        $v_2 = g_{21}v^1 + g_{22}v^2$
        *   *Explanation:* This is the fundamental relationship between covariant and contravariant components, using the metric tensor. Einstein summation convention implies summation over the repeated index $j$.
    *   **Substitute known values ($g_{ij}$ and $v^j$):**
        $v_1 = (2)(3) + (1)(-2)$
        *   *Explanation:* Substitute $g_{11}=2, g_{12}=1, v^1=3, v^2=-2$ into the formula for $v_1$.
        $v_1 = 6 - 2 = 4$.
        *   *Explanation:* Perform the arithmetic.
        $v_2 = (1)(3) + (5)(-2)$
        *   *Explanation:* Substitute $g_{21}=1, g_{22}=5, v^1=3, v^2=-2$ into the formula for $v_2$.
        $v_2 = 3 - 10 = -7$.
        *   *Explanation:* Perform the arithmetic.

3.  **Summary:**
    Covariant components: $v_1=4, v_2=-7$.

**Final Answer:**
The covariant components are $\boxed{v_1=4, v_2=-7}$.

**Reflection:** This example demonstrates the utility of the metric tensor. Once you have the contravariant components and the metric of the basis, you can directly calculate the covariant components without going back to the original vector definition and dot products. This confirms the results from Example 2 and highlights the role of $g_{ij}$ in "lowering indices."

---

### Example 4: Transformation of Contravariant Components under a Change of Basis

**State the problem clearly:**
Consider a 2D vector $\vec{v}$ with contravariant components $v^1=3, v^2=-2$ in an "old" oblique basis $\{\vec{e}_1, \vec{e}_2\}$, where $\vec{e}_1 = (1,1)$ and $\vec{e}_2 = (-1,2)$.
A "new" oblique basis $\{\vec{e}'_1, \vec{e}'_2\}$ is defined by:
$\vec{e}'_1 = \vec{e}_1 + \vec{e}_2$
$\vec{e}'_2 = -\vec{e}_1 + \vec{e}_2$
Find the contravariant components $v'^1, v'^2$ of $\vec{v}$ in the new basis using the transformation law.

**Identify what's given and what we want:**
Given: Old contravariant components $v^1=3, v^2=-2$.
Old basis vectors: $\vec{e}_1 = (1,1)$, $\vec{e}_2 = (-1,2)$.
New basis vectors in terms of old: $\vec{e}'_1 = \vec{e}_1 + \vec{e}_2$, $\vec{e}'_2 = -\vec{e}_1 + \vec{e}_2$.
Want: New contravariant components $v'^1, v'^2$.

**Show every algebraic / logical step:**

1.  **Express Old Basis Vectors in terms of New Basis Vectors (or vice versa):**
    From the given relations:
    $\vec{e}'_1 = \vec{e}_1 + \vec{e}_2 \quad (A)$
    $\vec{e}'_2 = -\vec{e}_1 + \vec{e}_2 \quad (B)$
    Add (A) and (B):
    $\vec{e}'_1 + \vec{e}'_2 = 2\vec{e}_2 \implies \vec{e}_2 = \frac{1}{2}\vec{e}'_1 + \frac{1}{2}\vec{e}'_2$.
    *   *Explanation:* We need to find the inverse transformation, i.e., how the old basis vectors relate to the new basis vectors. This is crucial for determining the partial derivatives for the transformation law.
    Subtract (B) from (A):
    $\vec{e}'_1 - \vec{e}'_2 = 2\vec{e}_1 \implies \vec{e}_1 = \frac{1}{2}\vec{e}'_1 - \frac{1}{2}\vec{e}'_2$.
    *   *Explanation:* We solve the system of equations for $\vec{e}_1$ and $\vec{e}_2$.

2.  **Determine the Transformation Matrix (Jacobian) components:**
    The transformation law for contravariant components is $v'^j = \frac{\partial x'^j}{\partial x^i} v^i$.
    This means we need the matrix $J^j_i = \frac{\partial x'^j}{\partial x^i}$.
    The basis vectors transform as $\vec{e}'_j = \frac{\partial x^i}{\partial x'^j} \vec{e}_i$.
    So, if we write $\vec{e}'_j = M^i_j \vec{e}_i$, then $M^i_j = \frac{\partial x^i}{\partial x'^j}$.
    From the given definitions:
    $\vec{e}'_1 = 1 \cdot \vec{e}_1 + 1 \cdot \vec{e}_2 \implies M^1_1 = 1, M^2_1 = 1$.
    $\vec{e}'_2 = -1 \cdot \vec{e}_1 + 1 \cdot \vec{e}_2 \implies M^1_2 = -1, M^2_2 = 1$.
    So the matrix $M$ (which represents $\frac{\partial x^i}{\partial x'^j}$) is:
    $$ M = \begin{pmatrix} M^1_1 & M^1_2 \\ M^2_1 & M^2_2 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix} $$
    *   *Explanation:* The entries of the transformation matrix $M$ are the coefficients of the old basis vectors when expressing the new basis vectors. This matrix is often denoted as $\Lambda^{-1}$ in some texts, or $J^{-1}$ where $J$ is the Jacobian for coordinates.
    The transformation matrix for contravariant components is $J = (M^{-1})^j_i = \frac{\partial x'^j}{\partial x^i}$.
    Let's find $M^{-1}$:
    $\det(M) = (1)(1) - (-1)(1) = 1 + 1 = 2$.
    $$ M^{-1} = \frac{1}{2} \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 1/2 & 1/2 \\ -1/2 & 1/2 \end{pmatrix} $$
    So, $\frac{\partial x'^1}{\partial x^1} = 1/2$, $\frac{\partial x'^1}{\partial x^2} = 1/2$, $\frac{\partial x'^2}{\partial x^1} = -1/2$, $\frac{\partial x'^2}{\partial x^2} = 1/2$.
    *   *Explanation:* The transformation matrix for contravariant components is the inverse of the matrix that transforms the basis vectors. This is the "contra" part of contravariant.

3.  **Apply the Contravariant Transformation Law:**
    *   **Formula:** $v'^j = \frac{\partial x'^j}{\partial x^i} v^i$.
    *   **For $v'^1$:**
        $v'^1 = \frac{\partial x'^1}{\partial x^1} v^1 + \frac{\partial x'^1}{\partial x^2} v^2$
        *   *Explanation:* Expand the summation for $j=1$.
        $v'^1 = (1/2)(3) + (1/2)(-2)$
        *   *Explanation:* Substitute the partial derivatives and the old contravariant components $v^1=3, v^2=-2$.
        $v'^1 = 3/2 - 2/2 = 1/2$.
        *   *Explanation:* Perform the arithmetic.
    *   **For $v'^2$:**
        $v'^2 = \frac{\partial x'^2}{\partial x^1} v^1 + \frac{\partial x'^2}{\partial x^2} v^2$
        *   *Explanation:* Expand the summation for $j=2$.
        $v'^2 = (-1/2)(3) + (1/2)(-2)$
        *   *Explanation:* Substitute the partial derivatives and the old contravariant components.
        $v'^2 = -3/2 - 2/2 = -5/2$.
        *   *Explanation:* Perform the arithmetic.

4.  **Summary:**
    New contravariant components: $v'^1=1/2, v'^2=-5/2$.

**Final Answer:**
The contravariant components in the new basis are $\boxed{v'^1=1/2, v'^2=-5/2}$.

**Reflection:** This example highlights the core property of contravariant components: how they transform under a change of basis. The transformation matrix for the components is the inverse of the matrix that transforms the basis vectors themselves. This is a crucial concept for understanding how physical laws remain invariant under coordinate transformations.

## 6. Common mistakes and traps

1.  **Assuming an orthonormal basis:** The most frequent error is to assume that $v^i = v_i$ (contravariant components equal covariant components). This is only true in orthonormal bases (like standard Cartesian coordinates). In oblique or curvilinear coordinate systems, they are different.
2.  **Confusing vectors with their components:** A vector is a geometric entity; its components are merely its numerical representation in a chosen basis. Changing the basis changes the components, but not the vector itself.
3.  **Mixing up transformation rules:** Students often swap the Jacobian matrix and its inverse when transforming contravariant versus covariant components. Remember: "contra" means the components transform with the *inverse* transformation of the basis vectors, or with the *forward* transformation of the coordinates. "Co" means they transform *with* the transformation of the basis vectors (or with the *inverse* transformation of the coordinates).
4.  **Incorrectly applying Einstein summation convention:** Forgetting to sum over repeated indices, or summing over indices that are not repeated (one upper, one lower), or using more than two identical indices in a single term.
5.  **Not understanding the role of the metric tensor:** The metric tensor $g_{ij}$ is often seen as just a matrix. Its true meaning as encoding the inner product (geometry) of the basis vectors, and its role in raising and lowering indices, is sometimes overlooked.
6.  **Ignoring the abstract nature of vectors/covectors:** Initially, it's easy to just think of components. But truly understanding covariant and contravariant means appreciating that vectors are elements of a vector space, and covectors (linear functionals) are elements of the dual space. Covariant components are naturally associated with covectors, and contravariant components with vectors.

## 7. Textbook-precise explanation

Let $V$ be an $n$-dimensional vector space over a field $\mathbb{R}$.
Let $\{\vec{e}_1, \vec{e}_2, \dots, \vec{e}_n\}$ be a basis for $V$.

**Contravariant Components:**
Any vector $\vec{v} \in V$ can be uniquely expressed as a linear combination of the basis vectors:
$$ \vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2 + \dots + v^n \vec{e}_n $$
Using Einstein summation convention, this is written as:
$$ \vec{v} = v^i \vec{e}_i $$
The scalars $v^i$ are called the **contravariant components** of the vector $\vec{v}$ with respect to the basis $\{\vec{e}_i\}$. They are denoted with a superscript index.

**Transformation of Contravariant Components:**
Consider a transformation from an old coordinate system $x^i$ to a new coordinate system $x'^j$. The new basis vectors $\vec{e}'_j$ are related to the old basis vectors $\vec{e}_i$ by:
$$ \vec{e}'_j = \frac{\partial x^i}{\partial x'^j} \vec{e}_i $$
Since the vector $\vec{v}$ itself is invariant, $\vec{v} = v^i \vec{e}_i = v'^j \vec{e}'_j$.
Substituting the transformation for $\vec{e}'_j$:
$$ v^i \vec{e}_i = v'^j \left( \frac{\partial x^i}{\partial x'^j} \vec{e}_i \right) = \left( \frac{\partial x^i}{\partial x'^j} v'^j \right) \vec{e}_i $$
By the uniqueness of components, we equate the coefficients of $\vec{e}_i$:
$$ v^i = \frac{\partial x^i}{\partial x'^j} v'^j $$
Multiplying by $\frac{\partial x'^k}{\partial x^i}$ and summing over $i$:
$$ \frac{\partial x'^k}{\partial x^i} v^i = \frac{\partial x'^k}{\partial x^i} \frac{\partial x^i}{\partial x'^j} v'^j = \delta^k_j v'^j = v'^k $$
Thus, the contravariant components transform as:
$$ v'^j = \frac{\partial x'^j}{\partial x^i} v^i $$
This is the defining characteristic of a contravariant vector (or contravariant tensor of rank 1). The components transform with the Jacobian matrix of the coordinate transformation.

**Covariant Components:**
Let $V^*$ be the dual space of $V$, consisting of all linear functionals (covectors) on $V$.
Given a basis $\{\vec{e}_i\}$ for $V$, there exists a unique dual basis $\{\vec{e}^j\}$ for $V^*$ such that $\vec{e}^j(\vec{e}_i) = \delta^j_i$ (where $\delta^j_i$ is the Kronecker delta).
The **covariant components** $v_i$ of a vector $\vec{v}$ are defined by taking the dot product (inner product) of $\vec{v}$ with each basis vector $\vec{e}_i$:
$$ v_i = \vec{v} \cdot \vec{e}_i $$
Alternatively, one can consider the vector $\vec{v}$ as an element of $V$ and define its covariant components as the components of the covector $f_{\vec{v}} \in V^*$ that is naturally associated with $\vec{v}$ via the metric. This covector $f_{\vec{v}}$ acts on any vector $\vec{w}$ as $f_{\vec{v}}(\vec{w}) = \vec{v} \cdot \vec{w}$. The components of this covector in the dual basis $\{\vec{e}^j\}$ are $v_i = f_{\vec{v}}(\vec{e}_i) = \vec{v} \cdot \vec{e}_i$. They are denoted with a subscript index.

**Transformation of Covariant Components:**
Using the definition $v_i = \vec{v} \cdot \vec{e}_i$, and the invariance of $\vec{v}$ and the transformation of $\vec{e}_i$:
$$ v'_j = \vec{v} \cdot \vec{e}'_j = \vec{v} \cdot \left( \frac{\partial x^i}{\partial x'^j} \vec{e}_i \right) = \frac{\partial x^i}{\partial x'^j} (\vec{v} \cdot \vec{e}_i) = \frac{\partial x^i}{\partial x'^j} v_i $$
Thus, the covariant components transform as:
$$ v'_j = \frac{\partial x^i}{\partial x'^j} v_i $$
This is the defining characteristic of a covariant vector (or covariant tensor of rank 1). The components transform with the inverse of the Jacobian matrix of the coordinate transformation.

**The Metric Tensor:**
The **metric tensor** $g_{ij}$ is a symmetric, second-rank covariant tensor defined by the inner products of the basis vectors:
$$ g_{ij} = \vec{e}_i \cdot \vec{e}_j $$
It provides the mechanism for converting between contravariant and covariant components:
$$ v_i = g_{ij} v^j $$
The inverse metric tensor $g^{ij}$ (which is a contravariant tensor of rank 2, satisfying $g^{ik} g_{kj} = \delta^i_j$) is used to raise indices:
$$ v^i = g^{ij} v_j $$
The metric tensor encapsulates the geometry of the space (or manifold) in the chosen coordinate system.

**Citations:**
*   **Schutz, Bernard F.** *A First Course in General Relativity*. Cambridge University Press, 2009. (Chapters 2-3 provide excellent intuitive and rigorous treatment).
*   **Wald, Robert M.** *General Relativity*. University of Chicago Press, 1984. (Chapter 2 for a more advanced, formal approach).
*   **Arfken, George B., Hans J. Weber, and Frank E. Harris.** *Mathematical Methods for Physicists*. Academic Press, 2013. (Chapter 10 for a comprehensive overview of tensor analysis).

## 8. ASCII diagrams

Let's visualize a vector $\vec{v}$ in a 2D oblique coordinate system defined by basis vectors $\vec{e}_1$ and $\vec{e}_2$.

```text
       ^ e2
       |  /
       | /
       |/
       *-----> v (vector)
      /|
     / |
    /  |
   /   |
  /    |
 e1<---+-------
      O
```

In this diagram:
*   `O` is the origin.
*   `e1` and `e2` are the basis vectors, which are not orthogonal.
*   `v` is the vector whose components we want to find.

Now, let's illustrate how contravariant and covariant components are obtained:

**Contravariant Components ($v^1, v^2$):**
These are found by projecting the vector $\vec{v}$ *parallel* to the basis axes. Imagine drawing lines from the tip of $\vec{v}$ parallel to $\vec{e}_2$ until it intersects the line extending $\vec{e}_1$, and vice-versa.

```text
       ^ e2
       |  /
       | / .
       |/   .
       *-----> v (vector)
      /|     .
     / |      .  (Line parallel to e1 from v's tip)
    /  |       .
   /   |        .
  / v^1|         .
 e1<---+---------+--------> (Line extending e1)
      O          v^2
      ^          ^
      |          |
      (Projection along e1)
      (Line parallel to e2 from v's tip)
```
In this diagram:
*   The point where the dashed line parallel to $\vec{e}_2$ hits the $\vec{e}_1$ line gives the magnitude $v^1$ along $\vec{e}_1$.
*   The point where the dashed line parallel to $\vec{e}_1$ hits the $\vec{e}_2$ line gives the magnitude $v^2$ along $\vec{e}_2$.
*   So, $\vec{v} = v^1 \vec{e}_1 + v^2 \vec{e}_2$.

**Covariant Components ($v_1, v_2$):**
These are found by projecting the vector $\vec{v}$ *orthogonally* onto the basis axes. This means dropping perpendiculars from the tip of $\vec{v}$ to each axis.

```text
       ^ e2
       |  /
       | /
       |/
       *-----> v (vector)
      /| \
     / |  \  (Perpendicular line from v's tip to e2)
    /  |   \
   /   |    \  v2
  /    |     *--------> (Line extending e2)
 e1<---+-----O-------
      O      v1
      ^
      |
      (Perpendicular line from v's tip to e1)
```
In this diagram:
*   The point where the dashed line (perpendicular to $\vec{e}_1$) hits the $\vec{e}_1$ line gives the magnitude $v_1$.
*   The point where the dashed line (perpendicular to $\vec{e}_2$) hits the $\vec{e}_2$ line gives the magnitude $v_2$.
*   So, $v_1 = \vec{v} \cdot \vec{e}_1$ and $v_2 = \vec{v} \cdot \vec{e}_2$.

Notice how $v^1$ and $v_1$ are different lengths along the $\vec{e}_1$ axis, and similarly for $v^2$ and $v_2$ along the $\vec{e}_2$ axis, because the basis is oblique. If $\vec{e}_1$ and $\vec{e}_2$ were orthogonal, the parallel and perpendicular projections would coincide, making $v^i = v_i$.

## 9. Memory technique — never forget this

1.  **Specific mnemonic/visual hook:**
    *   **Contravariant (superscript $v^i$):** Think of "contra-dictory" or "contra-flow". The components transform *against* the way the basis vectors transform. If basis vectors get 'smaller' (e.g., in a denser grid), the contravariant components must get 'larger' to compensate, keeping the physical vector the same. Visually, imagine building the vector by *stretching* the basis vectors.
    *   **Covariant (subscript $v_i$):** Think of "co-operative" or "co-flow". The components transform *with* the transformation of the dual basis, or in the same direction as the basis vectors themselves (in a sense). If basis vectors get 'smaller', the covariant components also get 'smaller'. Visually, imagine casting *orthogonal shadows* of the vector onto the basis axes.
    *   **"Upstairs-downstairs" rule:** Contravariant indices are "upstairs" ($v^i$), covariant indices are "downstairs" ($v_i$). To move an index up or down, you use the metric tensor ($g_{ij}$ lowers, $g^{ij}$ raises). This visually reinforces the role of the metric.

2.  **1-3 formulas/facts they MUST overlearn:**
    *   **Vector decomposition (contravariant):** $\vec{v} = v^i \vec{e}_i$ (This is the definition of contravariant components).
    *   **Dot product definition (covariant):** $v_i = \vec{v} \cdot \vec{e}_i$ (This is the definition of covariant components).
    *   **Metric tensor bridge:** $v_i = g_{ij} v^j$ (This connects the two types of components).

3.  **Spaced-repetition schedule:**
    *   **Review 1:** After 1 day.
    *   **Review 2:** After 3 days.
    *   **Review 3:** After 7 days.
    *   **Review 4:** After 16 days.
    *   **Review 5:** After 35 days.
    *   For each review, try to explain the concept in your own words, derive the transformation laws, and work through one example from scratch.

4.  **First-principles re-derivation pathway:**
    If you forget the formulas, you can always rebuild them from these core ideas:
    *   **Start with the invariant vector:** A physical vector $\vec{v}$ does not change, regardless of the coordinate system. So, $v^i \vec{e}_i = v'^j \vec{e}'_j$.
    *   **How basis vectors transform:** If a coordinate system $x^i$ is transformed to $x'^j$, then the basis vectors transform as $\vec{e}'_j = \frac{\partial x^k}{\partial x'^j} \vec{e}_k$. (You can derive this by considering $d\vec{r} = dx^k \vec{e}_k = dx'^j \vec{e}'_j$, then $dx^k = \frac{\partial x^k}{\partial x'^j} dx'^j$, then equating coefficients of $dx'^j$).
    *   **Derive contravariant transformation:** Substitute the basis vector transformation into the invariant vector equation and equate coefficients.
    *   **Define covariant components:** $v_i = \vec{v} \cdot \vec{e}_i$.
    *   **Derive covariant transformation:** Use the definition of $v_i$ and the basis vector transformation.
    *   **Define metric tensor:** $g_{ij} = \vec{e}_i \cdot \vec{e}_j$.
    *   **Derive relationship $v_i = g_{ij} v^j$:** Substitute $\vec{v} = v^k \vec{e}_k$ into the definition of $v_i$.
    This pathway ensures you understand the underlying logic, not just memorized formulas.

## 10. Connections — what this leads to

Understanding covariant and contravariant components is a foundational stepping stone to many advanced mathematical and physical theories:

*   **Tensor Calculus:** This is the immediate next step. Covariant and contravariant components are simply the components of rank-1 tensors (vectors and covectors). The distinction generalizes to higher-rank tensors (e.g., $T^{ij}$, $T_{ij}$, $T^i_j$), which can have multiple upper and lower indices, each transforming according to its type. This is the language of modern physics.
*   **Differential Geometry:** This field studies geometric properties of manifolds (generalized surfaces) using calculus. The tangent space at each point on a manifold is a vector space, and the cotangent space is its dual. Tangent vectors are contravariant, while covectors (like gradients of scalar fields) are covariant. This distinction is crucial for defining derivatives, integrals, and curvature on curved spaces.
*   **Riemannian Geometry:** A specific type of differential geometry where a metric tensor is defined on the manifold, allowing for the measurement of distances, angles, and volumes. This is the mathematical framework for General Relativity. The metric tensor itself is a covariant tensor ($g_{\mu\nu}$).
*   **General Relativity:** Einstein's theory of gravity is formulated entirely in terms of tensors on a four-dimensional spacetime manifold. The metric tensor $g_{\mu\nu}$ describes the curvature of spacetime, and all physical quantities (like the stress-energy tensor $T_{\mu\nu}$) are expressed as tensors, requiring a deep understanding of index manipulation and transformation properties.
*   **Fluid Dynamics and Continuum Mechanics:** Stress, strain, and velocity gradient tensors are fundamental in these fields. Expressing these tensors in curvilinear coordinates (e.g., cylindrical or spherical) requires careful use of covariant and contravariant components and the metric tensor.
*   **Electromagnetism:** Maxwell's equations can be elegantly written in a covariant (tensorial) form, particularly in the context of special and general relativity. The electromagnetic field tensor $F_{\mu\nu}$ is an antisymmetric covariant tensor.
*   **Manifold Learning and Geometric Deep Learning:** In machine learning, especially when dealing with data that inherently lies on a non-Euclidean manifold (e.g., graphs, point clouds, high-dimensional data with intrinsic geometry), techniques like manifold learning or geometric deep learning use concepts from differential geometry. Gradients on manifolds are covariant, and tangent vectors are contravariant, playing a role in optimization and data representation.

## 11. Self-check questions

1.  Explain in your own words why covariant and contravariant components are identical in an orthonormal Cartesian coordinate system but differ in an oblique system. Use a simple 2D diagram to illustrate the difference.
2.  Given a 3D basis $\vec{e}_1 = (1,