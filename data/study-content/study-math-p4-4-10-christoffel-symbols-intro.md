## 1. What it is — in plain English

Imagine you're an ant walking on a crumpled piece of paper. If the paper were flat, you could easily define "straight ahead" and measure distances with a simple ruler. But on the crumpled paper, what does "straight ahead" even mean? If you try to walk in what *feels* like a straight line, you might end up curving relative to someone else's perspective, or even relative to your own path a moment ago.

Christoffel symbols are a set of numbers that help us understand and quantify this "crumpling" or "curving" of space. They tell us how our local sense of "straightness" or our coordinate system's grid lines twist and bend as we move from one point to another.

Think of it like this: when you use a map of the Earth, latitude and longitude lines are straight on the map. But on the actual curved Earth, these lines are not "straight" in the same way. If you walk due north along a longitude line, your "east" direction is constantly changing relative to your path. Christoffel symbols are the mathematical tools that capture these subtle changes in direction and orientation caused by the underlying curvature of the space itself.

They are essentially correction factors. When we try to do calculus (like differentiation) in a curved space or with a curvy coordinate system, the usual rules don't quite apply. Christoffel symbols are the extra terms that pop up, ensuring our calculations correctly account for the bending of the space.

In short, they quantify how much your local "ruler" and "protractor" change their orientation as you move through a curved environment, making sure your measurements and definitions of motion remain consistent.

## 2. Why it matters — real-world applications

Christoffel symbols are not just abstract mathematical constructs; they are fundamental to understanding and navigating curved spaces, both physical and abstract. Their applications span various high-tech and scientific fields:

1.  **General Relativity and Cosmology:** This is arguably their most famous application. Albert Einstein's theory of General Relativity posits that gravity is not a force, but a manifestation of the curvature of spacetime. Christoffel symbols are the mathematical components that describe this curvature. They are essential for calculating how objects (like planets, stars, or light) move in gravitational fields. Without them, we couldn't predict planetary orbits, understand black holes, or model the expansion of the universe. Companies like SpaceX or NASA rely on these principles for precise trajectory calculations for spacecraft.

2.  **Global Positioning Systems (GPS):** While often simplified, accurate GPS calculations on Earth's surface must account for both the Earth's curvature and relativistic effects (which depend on spacetime curvature). The precise timing and positioning algorithms in your smartphone or car's GPS system (and the satellite systems themselves) implicitly or explicitly use principles derived from differential geometry, where Christoffel symbols play a role in defining geodesics (the "straightest paths") on a curved manifold. This ensures your navigation is accurate to within meters, rather than kilometers.

3.  **Robotics and Autonomous Navigation:** For robots operating on complex surfaces, or autonomous vehicles navigating in non-Euclidean environments (e.g., highly constrained spaces, or even abstract "state spaces" in control theory), path planning often involves finding optimal paths that minimize "distance" or "energy." These paths are geodesics. Christoffel symbols are used to formulate the equations for these geodesics, allowing robots to move efficiently and safely on curved terrains or in systems with non-standard metrics. For example, a robotic arm moving in a complex configuration space might use these ideas.

4.  **Machine Learning and Data Science (Riemannian Optimization):** In advanced machine learning, especially when dealing with data that inherently lies on a curved manifold (e.g., probability distributions, covariance matrices, or Lie groups), optimization algorithms need to respect the geometry of that space. Riemannian optimization techniques use Christoffel symbols to define the "gradient" and "Hessian" in a way that correctly accounts for the manifold's curvature. This is crucial for tasks like optimizing parameters for certain types of neural networks or performing statistical analysis on non-Euclidean data, leading to more robust and accurate models.

## 3. Prerequisites — what you must know first

Before diving deep into Christoffel symbols, you must have a solid grasp of several foundational mathematical concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Vector Calculus:** Understanding gradients ($\nabla f$), divergence ($\nabla \cdot \mathbf{F}$), curl ($\nabla \times \mathbf{F}$), and how to differentiate vector-valued functions.
*   **Linear Algebra:** Proficiency with vectors, matrices, matrix multiplication, determinants, and finding inverse matrices. Crucially, understanding basis vectors and how they transform under a change of coordinates.
*   **Multivariable Calculus:** Strong command of partial derivatives ($\frac{\partial f}{\partial x}$), the chain rule for multiple variables, and implicit differentiation.
*   **Differential Geometry (Basic):**
    *   **Manifolds:** The idea of a space that locally looks like Euclidean space but can be globally curved (e.g., the surface of a sphere).
    *   **Tangent Spaces:** The vector space of all possible directions at a point on a manifold.
    *   **Coordinate Systems and Transformations:** How to describe points on a manifold using different sets of coordinates and how to convert between them.
    *   **Metric Tensor ($g_{ij}$):** A fundamental object that defines distances, angles, and volumes on a manifold. It tells you how to measure the "length" of a vector or the "angle" between two vectors at any point.
*   **Tensor Calculus (Basic):**
    *   **Tensors:** A generalization of scalars, vectors, and matrices that transform in specific ways under coordinate changes.
    *   **Covariant and Contravariant Components:** Understanding the difference between upper-indexed (contravariant) and lower-indexed (covariant) components of vectors and tensors, and how they transform.
    *   **Einstein Summation Convention:** The rule that repeated indices (one upper, one lower) imply summation over that index. This is absolutely critical for working with Christoffel symbols.

## 4. The core idea — step by step

Let's build the intuition for Christoffel symbols step by step, starting from the fundamental problem they solve.

### Step 1: The Problem of Basis Vectors in Curved Coordinates

*   **Plain English:** In a standard flat Cartesian coordinate system ($x, y, z$), the basis vectors (like $\hat{i}, \hat{j}, \hat{k}$) are constant. They point in the same directions and have the same length everywhere. But if you use a curved coordinate system (like polar coordinates $r, \theta$ or spherical coordinates $\rho, \phi, \theta$) or if the space itself is curved, your basis vectors change from point to point. They might rotate, stretch, or shrink.

*   **Small Concrete Example:** Consider 2D polar coordinates $(r, \theta)$. At any point, we have basis vectors $\vec{e}_r$ (pointing radially outward) and $\vec{e}_\theta$ (pointing tangentially in the direction of increasing $\theta$).
    ```
    At point P1:   ^ e_theta
                   |
                   |
                   O---P1--> e_r

    At point P2 (same r, different theta):
                   ^ e_theta'
                   |
                   |
                   O-----P2--> e_r'
    ```
    Notice how $\vec{e}_r$ at $P_1$ points in a different direction than $\vec{e}_r$ at $P_2$. Similarly for $\vec{e}_\theta$. These basis vectors are *functions of position*.

*   **Formal/Mathematical Version:** Let $x^1, x^2, \ldots, x^n$ be a set of coordinates for an $n$-dimensional manifold. At each point, we can define a set of basis vectors for the tangent space, typically denoted as $\vec{e}_i = \frac{\partial}{\partial x^i}$. These basis vectors are generally functions of the coordinates: $\vec{e}_i(x^1, \ldots, x^n)$.

*   **What Could Go Wrong:** Assuming that basis vectors are constant, as they are in Cartesian coordinates in Euclidean space. This assumption is only valid for flat spaces and specific coordinate systems. In general, $\frac{\partial \vec{e}_i}{\partial x^j} \neq 0$.

### Step 2: Quantifying How Basis Vectors Change

*   **Plain English:** Since the basis vectors $\vec{e}_j$ change with position, we need to know *how* they change. This means taking their partial derivatives with respect to the coordinates. For example, how does $\vec{e}_r$ change as we move in the $\theta$ direction? Or how does $\vec{e}_\theta$ change as we move in the $r$ direction?

*   **Small Concrete Example:** In polar coordinates $(r, \theta)$, if we move a tiny bit in the $\theta$ direction, the radial basis vector $\vec{e}_r$ will rotate. If we move a tiny bit in the $r$ direction, the tangential basis vector $\vec{e}_\theta$ will also rotate (and potentially change length, though in standard polar coordinates, its length changes with $r$). We're interested in quantities like $\frac{\partial \vec{e}_r}{\partial \theta}$ or $\frac{\partial \vec{e}_\theta}{\partial r}$.

*   **Formal/Mathematical Version:** We are interested in the partial derivatives of the basis vectors with respect to the coordinates: $\frac{\partial \vec{e}_j}{\partial x^k}$. These derivatives are themselves vectors.

*   **What Could Go Wrong:** Confusing the derivative of a vector with the derivative of its components. Here, we're talking about the change in the *vector itself* (its direction and magnitude), not just its components in some fixed basis.

### Step 3: Expressing the Change in Terms of the Local Basis

*   **Plain English:** Since $\frac{\partial \vec{e}_j}{\partial x^k}$ is a vector, it must be expressible as a linear combination of the *local* basis vectors $\vec{e}_i$. The coefficients in this linear combination are precisely the Christoffel symbols. They tell us "how much" of each basis vector $\vec{e}_i$ is contained in the change of $\vec{e}_j$ when moving in the $x^k$ direction.

*   **Small Concrete Example:** Let's say we calculated $\frac{\partial \vec{e}_r}{\partial \theta}$ in polar coordinates. This resulting vector will point in some direction. We can express this vector as a sum of multiples of $\vec{e}_r$ and $\vec{e}_\theta$.
    For instance, it turns out that $\frac{\partial \vec{e}_r}{\partial \theta} = \vec{e}_\theta$. So, in this case, the "coefficient" for $\vec{e}_\theta$ is 1, and for $\vec{e}_r$ is 0. This '1' is a Christoffel symbol!
    Similarly, $\frac{\partial \vec{e}_\theta}{\partial r} = \frac{1}{r} \vec{e}_\theta$.
    And $\frac{\partial \vec{e}_\theta}{\partial \theta} = -r \vec{e}_r$.

*   **Formal/Mathematical Version:** The Christoffel symbols of the second kind, denoted $\Gamma^i_{jk}$, are defined by the relation:
    $$ \frac{\partial \vec{e}_j}{\partial x^k} = \Gamma^i_{jk} \vec{e}_i $$
    (Here, the Einstein summation convention is used: repeated index $i$ implies summation over all possible values of $i$.)
    This equation means that when you differentiate the $j$-th basis vector with respect to the $k$-th coordinate, the result is a vector that can be decomposed into components along the original basis vectors $\vec{e}_i$, and the coefficients of this decomposition are the Christoffel symbols $\Gamma^i_{jk}$. The upper index $i$ indicates the component of the resulting vector, while the lower indices $j$ and $k$ indicate which basis vector is being differentiated and with respect to which coordinate.

*   **What Could Go Wrong:** Getting the indices mixed up. Remember: $\Gamma^i_{jk}$ means the $i$-th component of the derivative of $\vec{e}_j$ with respect to $x^k$. Also, forgetting the summation convention will lead to incorrect equations.

### Step 4: Connecting Christoffel Symbols to the Metric Tensor

*   **Plain English:** While the definition in Step 3 is intuitive, it's not always practical to work directly with basis vectors. Fortunately, Christoffel symbols can be calculated directly from the metric tensor, which is much easier to work with. The metric tensor ($g_{ij}$) describes the intrinsic geometry of the space – how distances are measured. Since Christoffel symbols describe how "straightness" changes due to curvature, it makes sense they are intimately linked to the metric. They are essentially built from the derivatives of the metric tensor.

*   **Small Concrete Example:** If you know the metric for polar coordinates ($ds^2 = dr^2 + r^2 d\theta^2$), you have $g_{rr}=1$, $g_{\theta\theta}=r^2$, and $g_{r\theta}=g_{\theta r}=0$. From these components and their derivatives, you can calculate all the Christoffel symbols for polar coordinates. For instance, the fact that $g_{\theta\theta}$ depends on $r$ (i.e., $\frac{\partial g_{\theta\theta}}{\partial r} = 2r$) tells you that the scaling of the $\theta$ direction changes as you move radially, which will result in non-zero Christoffel symbols.

*   **Formal/Mathematical Version:** The Christoffel symbols of the second kind (also known as the Levi-Civita connection coefficients) can be derived from the metric tensor $g_{ij}$ and its inverse $g^{ij}$ using the following formula:
    $$ \Gamma^i_{jk} = \frac{1}{2} g^{im} \left( \frac{\partial g_{mj}}{\partial x^k} + \frac{\partial g_{mk}}{\partial x^j} - \frac{\partial g_{jk}}{\partial x^m} \right) $$
    This formula is derived from the properties that the connection must be "torsion-free" (meaning $\Gamma^i_{jk} = \Gamma^i_{kj}$, which is equivalent to saying the partial derivatives of basis vectors commute, i.e., $\frac{\partial}{\partial x^k} \frac{\partial}{\partial x^j} = \frac{\partial}{\partial x^j} \frac{\partial}{\partial x^k}$) and "metric-compatible" (meaning the covariant derivative of the metric tensor is zero, $\nabla_k g_{ij} = 0$).

*   **What Could Go Wrong:** Errors in computing partial derivatives of the metric components, or mistakes in calculating the inverse metric $g^{im}$. Also, correctly handling the indices in the formula (especially the dummy summation index $m$) is crucial.

### Step 5: What Christoffel Symbols *Do* — Covariant Derivatives and Geodesics

*   **Plain English:** Christoffel symbols are not just about how basis vectors change; they are the "correction terms" that allow us to define "straight lines" and "acceleration" in curved spaces.
    *   **Covariant Derivative:** When you try to differentiate a vector field in curved coordinates, you can't just differentiate its components. You also have to account for the change in the basis vectors themselves. The Christoffel symbols precisely provide this correction. The result is the *covariant derivative*, which correctly measures how a vector field changes intrinsically, regardless of the coordinate system.
    *   **Geodesics:** A geodesic is the "straightest possible path" in a curved space (e.g., a great circle on a sphere, or the path of a freely falling object in spacetime). The equations for these paths involve Christoffel symbols, as they ensure the path locally appears "straight" even though it might be globally curved.

*   **Small Concrete Example:** Imagine a vector $\mathbf{V}$ whose components are $V^i$. Its ordinary derivative $\frac{\partial V^i}{\partial x^k}$ only tells you how the components change. But the *vector itself* might be changing due to the coordinate system's curvature. The covariant derivative $\nabla_k V^i = \frac{\partial V^i}{\partial x^k} + \Gamma^i_{jk} V^j$ adds the Christoffel symbol term to correct for the changing basis vectors.
    For a geodesic, which is a path where the "acceleration" is zero in a curved space, its equation will contain Christoffel symbols. Think of a ball rolling on a curved surface; its path is a geodesic, and the Christoffel symbols describe the "forces" that keep it on that "straight" path.

*   **Formal/Mathematical Version:**
    *   **Covariant Derivative of a Contravariant Vector:**
        $$ \nabla_k V^i = \frac{\partial V^i}{\partial x^k} + \Gamma^i_{jk} V^j $$
        This defines how a vector field $\mathbf{V} = V^i \vec{e}_i$ changes as we move in the $x^k$ direction.
    *   **Geodesic Equation:** A path $x^i(\tau)$ is a geodesic if its tangent vector is parallel transported along itself. This leads to the geodesic equation:
        $$ \frac{d^2 x^k}{d\tau^2} + \Gamma^k_{ij} \frac{dx^i}{d\tau} \frac{dx^j}{d\tau} = 0 $$
        Here, $\tau$ is an affine parameter (like proper time in relativity).

*   **What Could Go Wrong:** Forgetting the Christoffel symbol term in the covariant derivative, which would lead to incorrect physical laws or geometric interpretations in curved spaces. Misinterpreting the geodesic equation as a force equation; it's an equation of motion for a particle under no "external" forces, purely following the curvature of space.

## 5. Worked examples — multiple, with every step shown

We will use the formula for Christoffel symbols of the second kind:
$$ \Gamma^k_{ij} = \frac{1}{2} g^{km} \left( \frac{\partial g_{mj}}{\partial x^i} + \frac{\partial g_{mi}}{\partial x^j} - \frac{\partial g_{ij}}{\partial x^m} \right) $$
Remember that Christoffel symbols are symmetric in their lower indices: $\Gamma^k_{ij} = \Gamma^k_{ji}$. This means we only need to calculate for $i \le j$.

### Example 1: 2D Euclidean space in Cartesian coordinates

*   **Problem:** Calculate all Christoffel symbols for 2D Euclidean space using Cartesian coordinates $(x^1, x^2) = (x, y)$.

*   **Given:** The line element is $ds^2 = dx^2 + dy^2$.
    **Want:** All $\Gamma^k_{ij}$.

*   **Solution:**

    1.  **Identify the metric tensor components:**
        From $ds^2 = (dx^1)^2 + (dx^2)^2$, we have:
        $g_{11} = 1$
        $g_{22} = 1$
        $g_{12} = g_{21} = 0$
        $$ g_{ij} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} $$
        *Explanation:* The coefficients of $dx^i dx^j$ in the line element define the metric components.

    2.  **Calculate the inverse metric tensor components:**
        Since $g_{ij}$ is the identity matrix, its inverse $g^{ij}$ is also the identity matrix.
        $g^{11} = 1$
        $g^{22} = 1$
        $g^{12} = g^{21} = 0$
        $$ g^{ij} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} $$
        *Explanation:* We need the inverse metric for the Christoffel symbol formula.

    3.  **Calculate partial derivatives of the metric components:**
        All $g_{ij}$ are constants (1 or 0). Therefore, all their partial derivatives are zero:
        $$ \frac{\partial g_{ij}}{\partial x^k} = 0 \quad \text{for all } i,j,k $$
        *Explanation:* The metric components do not change with position in Cartesian coordinates.

    4.  **Substitute into the Christoffel symbol formula:**
        $$ \Gamma^k_{ij} = \frac{1}{2} g^{km} \left( \frac{\partial g_{mj}}{\partial x^i} + \frac{\partial g_{mi}}{\partial x^j} - \frac{\partial g_{ij}}{\partial x^m} \right) $$
        Since all partial derivatives $\frac{\partial g_{ij}}{\partial x^k}$ are zero, the entire term in the parenthesis is zero.
        $$ \Gamma^k_{ij} = \frac{1}{2} g^{km} (0 + 0 - 0) = 0 $$

    5.  **Final Answer:**
        $$ \boxed{\Gamma^k_{ij} = 0 \quad \text{for all } k, i, j} $$

    *   **Reflection:** This result makes perfect sense. In Cartesian coordinates in flat Euclidean space, the basis vectors are constant and do not change direction or length. Therefore, there are no "correction terms" needed for differentiation, and all Christoffel symbols are zero. This confirms our intuition that Christoffel symbols quantify curvature or coordinate system "twist."

### Example 2: 2D Euclidean space in Polar coordinates

*   **Problem:** Calculate all Christoffel symbols for 2D Euclidean space using polar coordinates $(x^1, x^2) = (r, \theta)$.

*   **Given:** The line element is $ds^2 = dr^2 + r^2 d\theta^2$.
    **Want:** All $\Gamma^k_{ij}$.

*   **Solution:**

    1.  **Identify the metric tensor components:**
        From $ds^2 = (dr)^2 + r^2 (d\theta)^2 = (dx^1)^2 + (x^1)^2 (dx^2)^2$:
        $g_{11} = 1$ (coefficient of $dr^2$)
        $g_{22} = r^2$ (coefficient of $d\theta^2$)
        $g_{12} = g_{21} = 0$ (no $dr d\theta$ term)
        $$ g_{ij} = \begin{pmatrix} 1 & 0 \\ 0 & r^2 \end{pmatrix} $$
        *Explanation:* We extract the coefficients of the differential products. Note $g_{22}$ depends on $r$.

    2.  **Calculate the inverse metric tensor components:**
        $$ g^{ij} = \begin{pmatrix} 1/1 & 0 \\ 0 & 1/r^2 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1/r^2 \end{pmatrix} $$
        *Explanation:* For a diagonal matrix, the inverse is simply the reciprocal of each diagonal element.

    3.  **Calculate non-zero partial derivatives of the metric components:**
        The only metric component that depends on a coordinate is $g_{22} = r^2$.
        $$ \frac{\partial g_{22}}{\partial r} = \frac{\partial}{\partial x^1} (x^1)^2 = 2x^1 = 2r $$
        All other $\frac{\partial g_{ij}}{\partial x^k}$ are zero.
        *Explanation:* Only $g_{22}$ changes as $r$ changes.

    4.  **Substitute into the Christoffel symbol formula:**
        We need to calculate $\Gamma^k_{ij}$ for $k, i, j \in \{1, 2\}$. Due to symmetry $\Gamma^k_{ij} = \Gamma^k_{ji}$, we only need to calculate for $i \le j$.

        *   **Case 1: $k=1$** (i.e., $\Gamma^1_{ij}$)

            *   $\Gamma^1_{11}$:
                $$ \Gamma^1_{11} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m1}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^m} \right) $$
                The only non-zero $g^{1m}$ is $g^{11}=1$. So $m$ must be 1.
                $$ \Gamma^1_{11} = \frac{1}{2} g^{11} \left( \frac{\partial g_{11}}{\partial x^1} + \frac{\partial g_{11}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^1} \right) $$
                $$ \Gamma^1_{11} = \frac{1}{2} (1) \left( \frac{\partial g_{11}}{\partial r} + \frac{\partial g_{11}}{\partial r} - \frac{\partial g_{11}}{\partial r} \right) $$
                Since $g_{11}=1$, $\frac{\partial g_{11}}{\partial r} = 0$.
                $$ \Gamma^1_{11} = \frac{1}{2} (1) (0+0-0) = 0 $$

            *   $\Gamma^1_{12}$ (and $\Gamma^1_{21}$ by symmetry):
                $$ \Gamma^1_{12} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m2}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^m} \right) $$
                Again, $m$ must be 1.
                $$ \Gamma^1_{12} = \frac{1}{2} g^{11} \left( \frac{\partial g_{12}}{\partial x^1} + \frac{\partial g_{11}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^1} \right) $$
                $$ \Gamma^1_{12} = \frac{1}{2} (1) \left( \frac{\partial g_{12}}{\partial r} + \frac{\partial g_{11}}{\partial \theta} - \frac{\partial g_{12}}{\partial r} \right) $$
                Since $g_{12}=0$ and $g_{11}=1$, all derivatives are zero.
                $$ \Gamma^1_{12} = \frac{1}{2} (1) (0+0-0) = 0 $$

            *   $\Gamma^1_{22}$:
                $$ \Gamma^1_{22} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m2}}{\partial x^2} + \frac{\partial g_{m2}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^m} \right) $$
                Again, $m$ must be 1.
                $$ \Gamma^1_{22} = \frac{1}{2} g^{11} \left( \frac{\partial g_{12}}{\partial x^2} + \frac{\partial g_{12}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^1} \right) $$
                $$ \Gamma^1_{22} = \frac{1}{2} (1) \left( \frac{\partial g_{12}}{\partial \theta} + \frac{\partial g_{12}}{\partial \theta} - \frac{\partial g_{22}}{\partial r} \right) $$
                We know $g_{12}=0$, so $\frac{\partial g_{12}}{\partial \theta}=0$. We know $\frac{\partial g_{22}}{\partial r} = 2r$.
                $$ \Gamma^1_{22} = \frac{1}{2} (1) (0+0-2r) = -r $$

        *   **Case 2: $k=2$** (i.e., $\Gamma^2_{ij}$)

            *   $\Gamma^2_{11}$:
                $$ \Gamma^2_{11} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m1}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^m} \right) $$
                The only non-zero $g^{2m}$ is $g^{22}=1/r^2$. So $m$ must be 2.
                $$ \Gamma^2_{11} = \frac{1}{2} g^{22} \left( \frac{\partial g_{21}}{\partial x^1} + \frac{\partial g_{21}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^2} \right) $$
                $$ \Gamma^2_{11} = \frac{1}{2} (1/r^2) \left( \frac{\partial g_{21}}{\partial r} + \frac{\partial g_{21}}{\partial r} - \frac{\partial g_{11}}{\partial \theta} \right) $$
                Since $g_{21}=0$ and $g_{11}=1$, all derivatives are zero.
                $$ \Gamma^2_{11} = \frac{1}{2} (1/r^2) (0+0-0) = 0 $$

            *   $\Gamma^2_{12}$ (and $\Gamma^2_{21}$ by symmetry):
                $$ \Gamma^2_{12} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m2}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^m} \right) $$
                Again, $m$ must be 2.
                $$ \Gamma^2_{12} = \frac{1}{2} g^{22} \left( \frac{\partial g_{22}}{\partial x^1} + \frac{\partial g_{21}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^2} \right) $$
                $$ \Gamma^2_{12} = \frac{1}{2} (1/r^2) \left( \frac{\partial g_{22}}{\partial r} + \frac{\partial g_{21}}{\partial \theta} - \frac{\partial g_{12}}{\partial \theta} \right) $$
                We know $\frac{\partial g_{22}}{\partial r} = 2r$. And $g_{21}=g_{12}=0$.
                $$ \Gamma^2_{12} = \frac{1}{2} (1/r^2) (2r + 0 - 0) = \frac{r}{r^2} = \frac{1}{r} $$

            *   $\Gamma^2_{22}$:
                $$ \Gamma^2_{22} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m2}}{\partial x^2} + \frac{\partial g_{m2}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^m} \right) $$
                Again, $m$ must be 2.
                $$ \Gamma^2_{22} = \frac{1}{2} g^{22} \left( \frac{\partial g_{22}}{\partial x^2} + \frac{\partial g_{22}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^2} \right) $$
                $$ \Gamma^2_{22} = \frac{1}{2} (1/r^2) \left( \frac{\partial g_{22}}{\partial \theta} + \frac{\partial g_{22}}{\partial \theta} - \frac{\partial g_{22}}{\partial \theta} \right) $$
                Since $g_{22}=r^2$ (which does not depend on $\theta$), $\frac{\partial g_{22}}{\partial \theta} = 0$.
                $$ \Gamma^2_{22} = \frac{1}{2} (1/r^2) (0+0-0) = 0 $$

    5.  **Final Answer:**
        The non-zero Christoffel symbols for polar coordinates are:
        $$ \boxed{\Gamma^1_{22} = -r} $$
        $$ \boxed{\Gamma^2_{12} = \Gamma^2_{21} = \frac{1}{r}} $$
        All others are zero.

    *   **Reflection:** The non-zero Christoffel symbols indicate that polar coordinates are a "curved" coordinate system, even though the underlying space is flat (Euclidean).
        *   $\Gamma^1_{22} = -r$: This corresponds to $\frac{\partial \vec{e}_\theta}{\partial \theta} = -r \vec{e}_r$. If you move in the $\theta$ direction, the $\vec{e}_\theta$ vector rotates towards the negative $\vec{e}_r$ direction. Think about a point moving in a circle: its tangential velocity vector is constantly changing direction, pointing inward.
        *   $\Gamma^2_{12} = \frac{1}{r}$: This corresponds to $\frac{\partial \vec{e}_\theta}{\partial r} = \frac{1}{r} \vec{e}_\theta$. As you move radially outward, the $\vec{e}_\theta$ vector changes its magnitude (it gets longer) and its direction slightly, but its $\theta$-component is scaled by $1/r$. More accurately, this term comes from $\frac{\partial \vec{e}_r}{\partial \theta} = \vec{e}_\theta$.

### Example 3: Surface of a Sphere (Intrinsic Geometry)

*   **Problem:** Calculate the Christoffel symbols for the surface of a unit sphere using spherical coordinates $(\theta, \phi)$, where $\theta$ is the polar angle (colatitude, from 0 to $\pi$) and $\phi$ is the azimuthal angle (longitude, from 0 to $2\pi$). The radius is $R=1$.
    Let $x^1 = \theta$ and $x^2 = \phi$.

*   **Given:** The line element for a unit sphere is $ds^2 = d\theta^2 + \sin^2\theta d\phi^2$.
    **Want:** All $\Gamma^k_{ij}$.

*   **Solution:**

    1.  **Identify the metric tensor components:**
        From $ds^2 = (dx^1)^2 + \sin^2(x^1) (dx^2)^2$:
        $g_{11} = 1$
        $g_{22} = \sin^2\theta$
        $g_{12} = g_{21} = 0$
        $$ g_{ij} = \begin{pmatrix} 1 & 0 \\ 0 & \sin^2\theta \end{pmatrix} $$
        *Explanation:* The metric components describe how distances are measured on the sphere.

    2.  **Calculate the inverse metric tensor components:**
        $$ g^{ij} = \begin{pmatrix} 1 & 0 \\ 0 & 1/\sin^2\theta \end{pmatrix} $$
        *Explanation:* Inverse of a diagonal matrix.

    3.  **Calculate non-zero partial derivatives of the metric components:**
        Only $g_{22}$ depends on $\theta = x^1$.
        $$ \frac{\partial g_{22}}{\partial \theta} = \frac{\partial}{\partial x^1} (\sin^2 x^1) = 2\sin x^1 \cos x^1 = 2\sin\theta\cos\theta $$
        All other $\frac{\partial g_{ij}}{\partial x^k}$ are zero.
        *Explanation:* $g_{11}$ is constant. $g_{22}$ depends on $\theta$, not $\phi$.

    4.  **Substitute into the Christoffel symbol formula:**

        *   **Case 1: $k=1$** (i.e., $\Gamma^1_{ij}$)

            *   $\Gamma^1_{11}$:
                $$ \Gamma^1_{11} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m1}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^m} \right) $$
                $m=1$ (since $g^{11}=1$ is the only non-zero $g^{1m}$).
                $$ \Gamma^1_{11} = \frac{1}{2} g^{11} \left( \frac{\partial g_{11}}{\partial x^1} + \frac{\partial g_{11}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^1} \right) = \frac{1}{2} (1) (0+0-0) = 0 $$
                *Explanation:* $g_{11}=1$ is constant.

            *   $\Gamma^1_{12}$ (and $\Gamma^1_{21}$):
                $$ \Gamma^1_{12} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m2}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^m} \right) $$
                $m=1$.
                $$ \Gamma^1_{12} = \frac{1}{2} g^{11} \left( \frac{\partial g_{12}}{\partial x^1} + \frac{\partial g_{11}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^1} \right) = \frac{1}{2} (1) (0+0-0) = 0 $$
                *Explanation:* $g_{12}=0$ and $g_{11}=1$ are constant w.r.t. $x^2$.

            *   $\Gamma^1_{22}$:
                $$ \Gamma^1_{22} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m2}}{\partial x^2} + \frac{\partial g_{m2}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^m} \right) $$
                $m=1$.
                $$ \Gamma^1_{22} = \frac{1}{2} g^{11} \left( \frac{\partial g_{12}}{\partial x^2} + \frac{\partial g_{12}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^1} \right) $$
                $$ \Gamma^1_{22} = \frac{1}{2} (1) \left( 0 + 0 - \frac{\partial g_{22}}{\partial \theta} \right) = \frac{1}{2} (1) (-2\sin\theta\cos\theta) = -\sin\theta\cos\theta $$
                *Explanation:* Uses $\frac{\partial g_{22}}{\partial \theta} = 2\sin\theta\cos\theta$.

        *   **Case 2: $k=2$** (i.e., $\Gamma^2_{ij}$)

            *   $\Gamma^2_{11}$:
                $$ \Gamma^2_{11} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m1}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^m} \right) $$
                $m=2$ (since $g^{22}=1/\sin^2\theta$ is the only non-zero $g^{2m}$).
                $$ \Gamma^2_{11} = \frac{1}{2} g^{22} \left( \frac{\partial g_{21}}{\partial x^1} + \frac{\partial g_{21}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^2} \right) = \frac{1}{2} (1/\sin^2\theta) (0+0-0) = 0 $$
                *Explanation:* $g_{21}=0$ and $g_{11}=1$ are constant.

            *   $\Gamma^2_{12}$ (and $\Gamma^2_{21}$):
                $$ \Gamma^2_{12} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m2}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^m} \right) $$
                $m=2$.
                $$ \Gamma^2_{12} = \frac{1}{2} g^{22} \left( \frac{\partial g_{22}}{\partial x^1} + \frac{\partial g_{21}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^2} \right) $$
                $$ \Gamma^2_{12} = \frac{1}{2} (1/\sin^2\theta) \left( \frac{\partial g_{22}}{\partial \theta} + 0 - 0 \right) $$
                $$ \Gamma^2_{12} = \frac{1}{2\sin^2\theta} (2\sin\theta\cos\theta) = \frac{\cos\theta}{\sin\theta} = \cot\theta $$
                *Explanation:* Uses $\frac{\partial g_{22}}{\partial \theta} = 2\sin\theta\cos\theta$.

            *   $\Gamma^2_{22}$:
                $$ \Gamma^2_{22} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m2}}{\partial x^2} + \frac{\partial g_{m2}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^m} \right) $$
                $m=2$.
                $$ \Gamma^2_{22} = \frac{1}{2} g^{22} \left( \frac{\partial g_{22}}{\partial x^2} + \frac{\partial g_{22}}{\partial x^2} - \frac{\partial g_{22}}{\partial x^2} \right) $$
                $$ \Gamma^2_{22} = \frac{1}{2} (1/\sin^2\theta) \left( \frac{\partial g_{22}}{\partial \phi} + \frac{\partial g_{22}}{\partial \phi} - \frac{\partial g_{22}}{\partial \phi} \right) $$
                Since $g_{22}=\sin^2\theta$ (does not depend on $\phi$), $\frac{\partial g_{22}}{\partial \phi} = 0$.
                $$ \Gamma^2_{22} = \frac{1}{2} (1/\sin^2\theta) (0+0-0) = 0 $$

    5.  **Final Answer:**
        The non-zero Christoffel symbols for the surface of a unit sphere are:
        $$ \boxed{\Gamma^1_{22} = -\sin\theta\cos\theta} $$
        $$ \boxed{\Gamma^2_{12} = \Gamma^2_{21} = \cot\theta} $$
        All others are zero.

    *   **Reflection:** These non-zero Christoffel symbols are characteristic of the intrinsic curvature of the sphere.
        *   $\Gamma^1_{22} = -\sin\theta\cos\theta$: This term tells us that if you move along a line of constant $\theta$ (a latitude line) and consider how the basis vector for $\phi$ changes, it will have a component in the negative $\theta$ direction. This makes sense: as you move along a latitude line, the "north" direction (increasing $\theta$) changes.
        *   $\Gamma^2_{12} = \cot\theta$: This term indicates that if you move along a line of constant $\phi$ (a longitude line) and consider how the basis vector for $\phi$ changes, it will have a component in the $\phi$ direction, scaled by $\cot\theta$. This reflects how the width of the "grid cells" changes with $\theta$. At the poles ($\theta=0$ or $\pi$), $\cot\theta$ is undefined, which is expected as spherical coordinates are singular there.

### Example 4: A simple 2D metric with non-diagonal terms

*   **Problem:** Calculate all Christoffel symbols for the 2D metric $ds^2 = (dx^1)^2 + (x^1)^2 (dx^2)^2 + 2x^1 dx^1 dx^2$.
    Let $x^1 = x$ and $x^2 = y$.

*   **Given:** The line element $ds^2 = dx^2 + x^2 dy^2 + 2x dx dy$.
    **Want:** All $\Gamma^k_{ij}$.

*   **Solution:**

    1.  **Identify the metric tensor components:**
        From $ds^2 = g_{11}(dx^1)^2 + g_{22}(dx^2)^2 + 2g_{12}dx^1 dx^2$:
        $g_{11} = 1$
        $g_{22} = (x^1)^2 = x^2$
        $g_{12} = g_{21} = x^1 = x$
        $$ g_{ij} = \begin{pmatrix} 1 & x \\ x & x^2 \end{pmatrix} $$
        *Explanation:* We carefully extract the coefficients. Note the $2g_{12}$ in the general form.

    2.  **Calculate the inverse metric tensor components:**
        For a 2x2 matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is $\frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
        Here, $a=1, b=x, c=x, d=x^2$.
        Determinant $D = (1)(x^2) - (x)(x) = x^2 - x^2 = 0$.
        *Explanation:* Oh, wait! The determinant is zero. This means the metric is degenerate, and the inverse does not exist. This specific metric describes a degenerate space, not a valid Riemannian manifold.
        Let's correct the problem to a non-degenerate metric. A common non-Euclidean metric with off-diagonal terms is hard to come up with on the fly without making it too complex.
        Let's use a simpler, non-degenerate example to illustrate off-diagonal terms.

        **Correction to Problem Statement:** Calculate all Christoffel symbols for the 2D metric $ds^2 = dx^2 + dy^2 + 2xy dx dy$.
        Let $x^1 = x$ and $x^2 = y$.

    *   **Revised Solution:**

        1.  **Identify the metric tensor components (Revised):**
            $g_{11} = 1$
            $g_{22} = 1$
            $g_{12} = g_{21} = xy$
            $$ g_{ij} = \begin{pmatrix} 1 & xy \\ xy & 1 \end{pmatrix} $$

        2.  **Calculate the inverse metric tensor components (Revised):**
            Determinant $D = (1)(1) - (xy)(xy) = 1 - x^2y^2$.
            $$ g^{ij} = \frac{1}{1-x^2y^2} \begin{pmatrix} 1 & -xy \\ -xy & 1 \end{pmatrix} $$
            Provided $1-x^2y^2 \neq 0$.
            *Explanation:* We use the formula for a 2x2 inverse.

        3.  **Calculate non-zero partial derivatives of the metric components:**
            $g_{11}=1 \implies \frac{\partial g_{11}}{\partial x} = 0, \frac{\partial g_{11}}{\partial y} = 0$
            $g_{22}=1 \implies \frac{\partial g_{22}}{\partial x} = 0, \frac{\partial g_{22}}{\partial y} = 0$
            $g_{12}=xy \implies \frac{\partial g_{12}}{\partial x} = y, \frac{\partial g_{12}}{\partial y} = x$
            $g_{21}=xy \implies \frac{\partial g_{21}}{\partial x} = y, \frac{\partial g_{21}}{\partial y} = x$
            *Explanation:* Only the off-diagonal terms depend on $x$ and $y$.

        4.  **Substitute into the Christoffel symbol formula:**
            This will be tedious due to the $g^{km}$ term being non-diagonal. Let's calculate one example, say $\Gamma^1_{11}$.

            *   $\Gamma^1_{11}$:
                $$ \Gamma^1_{11} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m1}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^m} \right) $$
                $m$ can be 1 or 2.
                $$ \Gamma^1_{11} = \frac{1}{2} \left[ g^{11} \left( \frac{\partial g_{11}}{\partial x^1} + \frac{\partial g_{11}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^1} \right) + g^{12} \left( \frac{\partial g_{21}}{\partial x^1} + \frac{\partial g_{21}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^2} \right) \right] $$
                $$ \Gamma^1_{11} = \frac{1}{2} \left[ g^{11} \left( \frac{\partial g_{11}}{\partial x} \right) + g^{12} \left( 2\frac{\partial g_{21}}{\partial x} - \frac{\partial g_{11}}{\partial y} \right) \right] $$
                Plug in values: $g^{11} = \frac{1}{1-x^2y^2}$, $g^{12} = \frac{-xy}{1-x^2y^2}$.
                $\frac{\partial g_{11}}{\partial x} = 0$, $\frac{\partial g_{21}}{\partial x} = y$, $\frac{\partial g_{11}}{\partial y} = 0$.
                $$ \Gamma^1_{11} = \frac{1}{2} \left[ \frac{1}{1-x^2y^2} (0) + \frac{-xy}{1-x^2y^2} (2y - 0) \right] $$
                $$ \Gamma^1_{11} = \frac{1}{2} \left[ \frac{-2xy^2}{1-x^2y^2} \right] = \frac{-xy^2}{1-x^2y^2} $$

            *   Let's calculate $\Gamma^1_{12}$ (by symmetry $\Gamma^1_{21}$ is the same):
                $$ \Gamma^1_{12} = \frac{1}{2} g^{1m} \left( \frac{\partial g_{m2}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^m} \right) $$
                $$ \Gamma^1_{12} = \frac{1}{2} \left[ g^{11} \left( \frac{\partial g_{12}}{\partial x^1} + \frac{\partial g_{11}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^1} \right) + g^{12} \left( \frac{\partial g_{22}}{\partial x^1} + \frac{\partial g_{21}}{\partial x^2} - \frac{\partial g_{12}}{\partial x^2} \right) \right] $$
                $$ \Gamma^1_{12} = \frac{1}{2} \left[ g^{11} \left( \frac{\partial g_{11}}{\partial y} \right) + g^{12} \left( \frac{\partial g_{22}}{\partial x} + \frac{\partial g_{21}}{\partial y} - \frac{\partial g_{12}}{\partial y} \right) \right] $$
                Plug in values: $g^{11} = \frac{1}{1-x^2y^2}$, $g^{12} = \frac{-xy}{1-x^2y^2}$.
                $\frac{\partial g_{11}}{\partial y} = 0$, $\frac{\partial g_{22}}{\partial x} = 0$, $\frac{\partial g_{21}}{\partial y} = x$, $\frac{\partial g_{12}}{\partial y} = x$.
                $$ \Gamma^1_{12} = \frac{1}{2} \left[ \frac{1}{1-x^2y^2} (0) + \frac{-xy}{1-x^2y^2} (0 + x - x) \right] $$
                $$ \Gamma^1_{12} = \frac{1}{2} \left[ \frac{-xy}{1-x^2y^2} (0) \right] = 0 $$

            *   Let's calculate $\Gamma^2_{11}$:
                $$ \Gamma^2_{11} = \frac{1}{2} g^{2m} \left( \frac{\partial g_{m1}}{\partial x^1} + \frac{\partial g_{m1}}{\partial x^1} - \frac{\partial g_{11}}{\partial x^m} \right) $$
                $$ \Gamma^2_{11} = \frac{1}{2} \left[ g^{21} \left( \frac{\partial g_{11}}{\partial x} \right) + g^{22} \left( 2\frac{\partial g_{21}}{\partial x} - \frac{\partial g_{11}}{\partial y} \right) \right] $$
                Plug in values: $g^{21} = \frac{-xy}{1-x^2y^2}$, $g^{22} = \frac{1}{1-x^2y^2}$.
                $\frac{\partial g_{11}}{\partial x} = 0$, $\frac{\partial g_{21}}{\partial x} = y$, $\frac{\partial g_{11}}{\partial y} = 0$.
                $$ \Gamma^2_{11} = \frac{1}{2} \left[ \frac{-xy}{1-x^2y^2} (0) + \frac{1}{1-x^2y^2} (2y - 0) \right] $$
                $$ \Gamma^2_{11} = \frac{1}{2} \left[ \frac{2y}{1-x^2y^2} \right] = \frac{y}{1-x^2y^2} $$

    5.  **Final Answer (partial):**
        $$ \boxed{\Gamma^1_{11} = \frac{-xy^2}{1-x^2y^2}} $$
        $$ \boxed{\Gamma^1_{12} = 0} $$
        $$ \boxed{\Gamma^2_{11} = \frac{y}{1-x^2y^2}} $$
        (Other terms like $\Gamma^1_{22}$, $\Gamma^2_{12}$, $\Gamma^2_{22}$ would also need to be calculated similarly.)

    *   **Reflection:** This example demonstrates that even in a seemingly "simple" 2D space, if the metric tensor has off-diagonal components (meaning the coordinate axes are not orthogonal, or the scale factors are intertwined), the Christoffel symbols can become quite complex. The calculations are much more involved because the summation over $m$ involves multiple terms, and the inverse metric is no longer trivial. This highlights the importance of careful index management and algebraic precision. The degeneracy issue in the initial problem also shows that not all mathematical expressions for $ds^2$ correspond to valid Riemannian manifolds.

## 6. Common mistakes and traps

1.  **Forgetting Einstein Summation Convention:** This is the most frequent error. An index appearing once as a superscript and once as a subscript implies summation over all possible values of that index. Missing this means you're not summing over terms, leading to incorrect formulas.
2.  **Mixing Up Upper and Lower Indices:** Christoffel symbols have one upper index and two lower indices ($\Gamma^k_{ij}$). The upper index indicates the component of the resulting vector (or the index of the coordinate system that the "acceleration" points along), while the lower indices indicate the basis vector being differentiated and the direction of differentiation. Swapping them changes the meaning entirely.
3.  **Incorrectly Calculating Partial Derivatives of Metric Components:** The Christoffel symbol formula relies heavily on these derivatives. A single mistake in $\frac{\partial g_{ij}}{\partial x^k}$ will propagate through all subsequent calculations. Be meticulous with your differentiation.
4.  **Errors in Calculating the Inverse Metric:** For higher dimensions, computing $g^{ij}$ can be algebraically intensive. A mistake here will invalidate all Christoffel symbols. For a 2x2 matrix, it's straightforward; for 3x3 or 4x4, it's prone to error without computational tools.
5.  **Not Recognizing Symmetry Properties:** Christoffel symbols are symmetric in their lower indices: $\Gamma^k_{ij} = \Gamma^k_{ji}$. This symmetry can save a lot of calculation by reducing the number of unique symbols you need to compute. Forgetting it means redundant calculations and a higher chance of error.
6.  **Confusing Christoffel Symbols of the First and Second Kind:** While we focused on the second kind ($\Gamma^k_{ij}$), there are also Christoffel symbols of the first kind ($\Gamma_{kij} = g_{km} \Gamma^m_{ij}$). They are related by lowering an index with the metric tensor. Using the wrong kind in a formula will lead to incorrect results.

## 7. Textbook-precise explanation

In the rigorous language of differential geometry, Christoffel symbols are the components of the **Levi-Civita connection** with respect to a particular coordinate basis. A connection is a mathematical object that allows us to define differentiation of tensor fields on a manifold, which is inherently curved and lacks a global notion of parallelism.

Let $M$ be an $n$-dimensional differentiable manifold equipped with a Riemannian metric $g$. Let $(x^1, \ldots, x^n)$ be a local coordinate system on $M$. The coordinate basis vectors are given by $\vec{e}_i = \frac{\partial}{\partial x^i}$.

The **covariant derivative** of a vector field $\mathbf{V} = V^i \vec{e}_i$ with respect to the coordinate direction $\vec{e}_k$ is defined as:
$$ \nabla_k \mathbf{V} = \nabla_{\vec{e}_k} (V^i \vec{e}_i) = \left( \frac{\partial V^i}{\partial x^k} \right) \vec{e}_i + V^i \nabla_k \vec{e}_i $$
Since $\nabla_k