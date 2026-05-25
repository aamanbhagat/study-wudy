## What it is
Christoffel symbols, denoted $\Gamma^k_{ij}$, are a collection of numbers that describe how basis vectors change from one point to another in a given coordinate system. They are not components of a tensor, but rather "correction terms" needed to define a proper derivative (the covariant derivative) for vectors and tensors on curved manifolds or in curvilinear coordinates.

## Why it matters
These symbols are the bedrock of Einstein's theory of General Relativity, where they are used to define the paths of freely falling particles (geodesics) and to construct the Riemann curvature tensor, which describes the curvature of spacetime. In aerospace engineering, they appear in the equations of motion for satellites and in advanced fluid dynamics when expressing the Navier-Stokes equations in non-Cartesian coordinates (e.g., cylindrical or spherical).

## When to study it
Before tackling this, you must have a solid grasp of the following:
*   **Multivariable Calculus:** Partial derivatives, chain rule for multiple variables.
*   **Linear Algebra:** Basis vectors, change of basis, matrix inversion.
*   **Introductory Tensor Calculus:** Einstein summation convention, upper/lower indices (contravariant/covariant), and the metric tensor ($g_{ij}$ and its inverse $g^{ij}$).

If you are not comfortable manipulating expressions like $V^i = g^{ij}V_j$ or taking partial derivatives like $\frac{\partial g_{ij}}{\partial x^k}$, review those topics first.

## How to study it (step by step)
1.  **Start with intuition in polar coordinates.** In Cartesian coordinates $(x,y)$, the basis vectors $\hat{x}, \hat{y}$ are constant. In polar coordinates $(r, \theta)$, the basis vectors $\hat{r}, \hat{\theta}$ change direction as you move. Calculate the partial derivatives $\frac{\partial \hat{r}}{\partial \theta}$ and $\frac{\partial \hat{\theta}}{\partial \theta}$ to see this explicitly. This is the physical origin of the Christoffel symbols.
2.  **Define the covariant derivative.** The partial derivative of a vector field's components, $\frac{\partial V^i}{\partial x^j}$, does not transform like a tensor. Define the covariant derivative $\nabla_j V^i = \frac{\partial V^i}{\partial x^j} + \Gamma^i_{jk} V^k$. State that this object *is* a tensor, and the $\Gamma^i_{jk}$ are precisely the correction terms that make it so.
3.  **Derive the symbols from the basis vectors.** The core definition comes from the change in basis vectors: $\frac{\partial \vec{e}_i}{\partial x^j} = \Gamma^k_{ij} \vec{e}_k$. Work through how this definition ensures that the covariant derivative of a vector $\vec{V} = V^i \vec{e}_i$ correctly handles the product rule: $\nabla_j \vec{V} = (\nabla_j V^i)\vec{e}_i$.
4.  **Derive the metric-based formula.** This is the main computational tool. Start from the fundamental principle that the metric tensor is constant under covariant differentiation: $\nabla_k g_{ij} = 0$. Expand this definition using the product rule and the definition of the covariant derivative for a covariant tensor. Isolate $\Gamma^k_{ij}$ algebraically.
5.  **Compute, compute, compute.** Use the formula you just derived to calculate all the Christoffel symbols for the 2D plane in polar coordinates, where the metric is $ds^2 = dr^2 + r^2 d\theta^2$. This will make the abstract formula concrete.

## Key ideas, with intuition
1.  **Derivatives need a "correction" for changing basis vectors.**
    Imagine a vector field on the surface of a sphere. As you move from the equator to the north pole, your basis vectors (e.g., "east" and "north") must rotate to stay tangent to the surface. A simple partial derivative of the vector's components fails to account for this rotation of the coordinate system itself. The Christoffel symbol quantifies this change in the basis.
    $$ \underbrace{\frac{\partial \vec{V}}{\partial x^j}}_{\text{Total Change}} = \underbrace{\left(\frac{\partial V^i}{\partial x^j}\right) \vec{e}_i}_{\text{Change in components}} + \underbrace{V^i \left(\frac{\partial \vec{e}_i}{\partial x^j}\right)}_{\text{Change in basis vectors}} $$
    The Christoffel symbol lives in that second term: $\frac{\partial \vec{e}_i}{\partial x^j} = \Gamma^k_{ij} \vec{e}_k$.

2.  **They are "connection coefficients".**
    They provide a rule for comparing or "connecting" vectors in infinitesimally separated tangent spaces. They define the concept of "parallel transport"—how to move a vector from one point to a nearby one while keeping it "pointing in the same direction" relative to the curved space. If all Christoffel symbols are zero, the space is flat and "pointing in the same direction" has its usual Euclidean meaning.

3.  **They are determined entirely by the geometry (the metric).**
    The shape of the space dictates how the basis vectors must change. This relationship is captured by the workhorse formula that computes the Christoffel symbols directly from partial derivatives of the metric tensor $g_{ij}$. This is profound: give me the metric (the ruler for measuring distances), and I can tell you everything about the connection and local curvature.
    $$ \Gamma^k_{ij} = \frac{1}{2} g^{kl} \left( \partial_j g_{li} + \partial_i g_{lj} - \partial_l g_{ij} \right) $$
    (Here, $\partial_j$ is shorthand for $\frac{\partial}{\partial x^j}$).

4.  **They are NOT tensors.**
    Under a change of coordinates, a tensor's components transform according to a specific linear rule. Christoffel symbols transform with an extra, non-linear term. This is because they don't represent a physical quantity at a point, but rather the relationship between the coordinate system and the underlying manifold. If they were a tensor, you could always find a coordinate system where they are all zero, which would imply all spaces are flat.

## Worked example
Calculate the Christoffel symbols for a 2D plane in polar coordinates $(x^1, x^2) = (r, \theta)$.

The line element is $ds^2 = dr^2 + r^2 d\theta^2$.

**Step 1: Identify the metric tensor and its inverse.**
By comparing $ds^2 = g_{ij} dx^i dx^j$ with the line element, we get the metric tensor components:
$$ g_{ij} = \begin{pmatrix} 1 & 0 \\ 0 & r^2 \end{pmatrix} $$
So, $g_{rr}=1$, $g_{\theta\theta}=r^2$, and $g_{r\theta}=g_{\theta r}=0$.
The inverse metric tensor $g^{ij}$ is the matrix inverse:
$$ g^{ij} = \begin{pmatrix} 1 & 0 \\ 0 & 1/r^2 \end{pmatrix} $$

**Step 2: Calculate the partial derivatives of the metric.**
Most derivatives are zero because most components are constant. The only non-constant component is $g_{\theta\theta}=r^2$.
The only non-zero partial derivative is:
$$ \frac{\partial g_{\theta\theta}}{\partial r} = \frac{\partial (r^2)}{\partial r} = 2r $$

**Step 3: Apply the Christoffel symbol formula.**
The formula is: $\Gamma^k_{ij} = \frac{1}{2} g^{kl} ( \partial_j g_{li} + \partial_i g_{lj} - \partial_l g_{ij} )$.
Let's compute one non-zero symbol, for example $\Gamma^r_{\theta\theta}$:
$$ \Gamma^r_{\theta\theta} = \frac{1}{2} g^{rl} ( \partial_\theta g_{l\theta} + \partial_\theta g_{l\theta} - \partial_l g_{\theta\theta} ) $$
The summation is over $l \in \{r, \theta\}$.
$$ \Gamma^r_{\theta\theta} = \frac{1}{2} g^{rr} ( \partial_\theta g_{r\theta} + \partial_\theta g_{r\theta} - \partial_r g_{\theta\theta} ) + \frac{1}{2} g^{r\theta} ( \dots ) $$
Since $g^{r\theta}=0$, the second term vanishes. We know $g_{r\theta}=0$ and $\partial_r g_{\theta\theta} = 2r$.
$$ \Gamma^r_{\theta\theta} = \frac{1}{2} g^{rr} ( 0 + 0 - 2r ) = \frac{1}{2} (1) (-2r) = -r $$

Let's compute another, $\Gamma^\theta_{r\theta}$:
$$ \Gamma^\theta_{r\theta} = \frac{1}{2} g^{\theta l} ( \partial_\theta g_{lr} + \partial_r g_{l\theta} - \partial_l g_{r\theta} ) $$
The summation is over $l \in \{r, \theta\}$.
$$ \Gamma^\theta_{r\theta} = \frac{1}{2} g^{\theta r}(\dots) + \frac{1}{2} g^{\theta\theta} ( \partial_\theta g_{\theta r} + \partial_r g_{\theta\theta} - \partial_\theta g_{r\theta} ) $$
Since $g^{\theta r}=0$, the first term vanishes.
$$ \Gamma^\theta_{r\theta} = \frac{1}{2} g^{\theta\theta} ( 0 + \partial_r g_{\theta\theta} - 0 ) = \frac{1}{2} \left(\frac{1}{r^2}\right) (2r) = \frac{1}{r} $$
By symmetry of the lower indices ($\Gamma^k_{ij} = \Gamma^k_{ji}$ for this type of connection), we also have $\Gamma^\theta_{\theta r} = 1/r$.

**Reflection:** The calculation is purely mechanical. The key was correctly identifying the metric components from the line element, taking their partial derivatives, and then methodically plugging them into the master formula, paying close attention to the indices. The non-zero results confirm that our polar coordinate system is curvilinear, and these symbols precisely quantify "how curvilinear" it is.

## Diagrams
This diagram illustrates why Christoffel symbols are necessary. In Cartesian coordinates, the basis vectors are the same everywhere. In polar coordinates, they change direction.

```text
      Cartesian Coordinates (Flat)               Polar Coordinates (Curvilinear on flat space)

      y                                                  ^ e_r
      ^                                                  |
      |                                              P'--+-----> e_theta
      +--> x                                        /    .
                                                   /     .
      e_y ^                                       /      .
          |                                      /       .
      P --+--> e_x                             e_r ^    /
                                                   |   /
      e_y ^                                    P --+--> e_theta
          |
 P' ----+--> e_x                                O (origin)

At P and P', the basis vectors {e_x, e_y}    At P, the basis is {e_r, e_theta}.
are identical.                               At P', a point reached by increasing theta,
                                             the basis vectors have rotated.
∂e_i/∂x^j = 0 for all i,j.                     ∂e_r/∂theta is non-zero.
Therefore, all Γ^k_{ij} = 0.                  Therefore, some Γ^k_{ij} are non-zero.
```

## Memory technique — remember this forever
1.  **The Story:** Think of $\Gamma^k_{ij}$ as a "GPS Correction Signal." You are a vector $V$ trying to walk straight on a curved Earth. Your internal sense of direction uses your components $V^k$. As you take a step in direction $i$, your coordinate grid itself twists. The $j$-th part of your grid changes, and the GPS signal $\Gamma^k_{ij}$ sends a correction to your $k$-th component to keep you on a "straight" path (a geodesic). **Top index ($k$) is the component being corrected. Bottom indices ($i, j$) are the cause: moving in direction $i$ changes the $j$-th basis vector.**

2.  **The Formula to Overlearn:**
    $$ \Gamma^k_{ij} = \frac{1}{2} g^{kl} \left( \frac{\partial g_{li}}{\partial x^j} + \frac{\partial g_{lj}}{\partial x^i} - \frac{\partial g_{ij}}{\partial x^l} \right) $$
    Notice the pattern of indices in the parenthesis: $(+li,j)$, $(+lj,i)$, $(-ij,l)$. It's a cyclic-like permutation.

3.  **Spaced Repetition Schedule:**
    *   Review and re-derive the polar coordinate example in **1 day**.
    *   Review the formula and its "GPS" meaning in **3 days**.
    *   Do a new example (e.g., surface of a sphere) in **7 days**.
    *   Re-derive the formula from $\nabla_k g_{ij}=0$ in **16 days**.
    *   Explain the concept to an imaginary student in **35 days**.

4.  **First Principles Pathway:** If you forget the formula, remember its origin: **The covariant derivative of the metric is zero.**
    *   Write down $\nabla_k g_{ij} = 0$.
    *   Expand the covariant derivative: $\partial_k g_{ij} - \Gamma^l_{ki} g_{lj} - \Gamma^l_{kj} g_{il} = 0$.
    *   Write this equation two more times, cyclically permuting the indices $i, j, k$.
    *   Add two of these equations and subtract the third. The terms with the metric will combine nicely due to symmetry, allowing you to algebraically solve for the term $\Gamma^l_{ij} g_{lk}$.
    *   Multiply by the inverse metric $g^{im}$ to isolate $\Gamma^m_{jk}$.

## Common mistakes
1.  **Assuming $\Gamma^k_{ij}$ is a tensor.** It is not. If you perform a coordinate transformation, you will find that the transformation law contains an "inhomogeneous" term involving second derivatives of the coordinate change, unlike a true tensor.
2.  **Index gymnastics errors.** A misplaced index in the formula will ruin the calculation. For example, writing $\partial_l g_{ij}$ as $\partial_i g_{lj}$. Always double-check the pattern: $(li,j), (lj,i), (ij,l)$.
3.  **Forgetting the inverse metric.** The formula produces a Christoffel symbol of the first kind, $\Gamma_{kij}$, without the leading $g^{kl}$ factor. You must multiply by the inverse metric to raise the first index to get the standard Christoffel symbol of the second kind, $\Gamma^k_{ij}$.
4.  **Assuming symmetry in the upper index.** The connection is symmetric in its lower two indices for the standard Levi-Civita connection used in GR ($\Gamma^k_{ij} = \Gamma^k_{ji}$). There is absolutely no symmetry involving the upper index; $\Gamma^k_{ij}$ is not necessarily equal to $\Gamma^i_{kj}$.

## Self-check
1.  What are all the Christoffel symbols $\Gamma^k_{ij}$ in a standard 3D Cartesian coordinate system $(x,y,z)$? Why?
2.  The metric for the surface of a 2-sphere of radius $R$ is $ds^2 = R^2 d\theta^2 + R^2\sin^2\theta \, d\phi^2$. Let the coordinates be $x^1 = \theta, x^2 = \phi$. Calculate $\Gamma^\theta_{\phi\phi}$ and $\Gamma^\phi_{\theta\phi}$.
3.  Using the definition of the covariant derivative of a covector, $\nabla_i V_j = \partial_i V_j - \Gamma^k_{ij} V_k$, show that the condition $\nabla_k g_{ij} = 0$ leads to the first-principles equation used in the memory technique section.