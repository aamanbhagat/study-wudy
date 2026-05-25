## What it is
An **orthogonal set** is a collection of vectors where any two distinct vectors are perpendicular, meaning their dot product is zero. An **orthonormal set** is an orthogonal set where every vector has also been scaled to have a length (norm) of exactly one. An **orthonormal basis** for a vector space is a basis composed of vectors from an orthonormal set.

## Why it matters
Orthonormal bases are the "nicest" possible coordinate systems. They simplify calculations dramatically in machine learning for algorithms like Principal Component Analysis (PCA), where we seek an orthonormal basis of maximum data variance. In physics and signal processing, Fourier analysis decomposes complex signals into an infinite orthonormal basis of sine and cosine functions, making filtering and compression possible.

## When to study it
Before tackling this, you must have a firm grasp of the following concepts. If any are weak, review them first.
*   Vector spaces, span, linear independence, and basis.
*   The dot product (inner product) and its geometric meaning, specifically that $u \cdot v = \|u\| \|v\| \cos\theta$.
*   The vector norm (length), defined as $\|v\| = \sqrt{v \cdot v}$.

## How to study it (step by step)
1.  **Re-derive orthogonality from the dot product.** Start with the formula $u \cdot v = \|u\|\|v\|\cos\theta$. Convince yourself that for non-zero vectors $u$ and $v$, the only way for $u \cdot v = 0$ is if $\cos\theta = 0$, which means $\theta = 90^\circ$ or $\pi/2$ radians. The dot product is a "perpendicularity detector."
2.  **Construct an orthogonal set.** Take the standard basis vectors in $\mathbb{R}^3$: $e_1 = (1,0,0)$, $e_2 = (0,1,0)$, $e_3 = (0,0,1)$. Calculate $e_1 \cdot e_2$, $e_1 \cdot e_3$, and $e_2 \cdot e_3$ to verify they are all zero. This is your simplest example of an orthogonal set.
3.  **Prove that orthogonality implies linear independence.** Take a set of non-zero, orthogonal vectors $\{v_1, v_2, ..., v_k\}$. Assume they are linearly dependent and derive a contradiction. Start with $c_1 v_1 + c_2 v_2 + ... + c_k v_k = \vec{0}$ with at least one $c_i \neq 0$. Take the dot product of the entire equation with $v_i$. What happens to all the terms? This proof is fundamental.
4.  **Practice normalization.** Take the vector $v = (3, 4)$. Calculate its norm $\|v\|$. Now create the unit vector $\hat{v} = \frac{v}{\|v\|}$. Verify that $\|\hat{v}\| = 1$. This process of scaling a vector to unit length is called normalization. An orthonormal set is just an orthogonal set where every vector has undergone this process.
5.  **Learn the coordinate projection formula.** For an orthonormal basis $\{u_1, u_2, ..., u_n\}$, any vector $y$ can be written as $y = c_1 u_1 + c_2 u_2 + ... + c_n u_n$. The key insight is that the coefficient $c_j$ is simply the dot product $y \cdot u_j$. Derive this by taking the dot product of the equation with $u_j$ and using the properties of an orthonormal set.
6.  **Solve a coordinate problem.** Use the basis and vector from the worked example below. First, try to find the coordinates by setting up and solving the system of linear equations. Then, use the simple dot product formula $c_j = y \cdot u_j$. Compare the effort required. This will cement the value of orthonormal bases.

## Key ideas, with intuition
1.  **Orthogonal means Perpendicular.** The algebraic condition $u \cdot v = 0$ is the direct translation of the geometric concept of perpendicularity. This is the central link between algebra and geometry in this topic.

2.  **Orthonormal means a Standardized Perpendicular Framework.** The "ortho" part gives you perpendicular directions. The "normal" part standardizes each of these directions to a length of 1. Think of it as creating the most efficient and clean set of rulers for your vector space—all are at right angles to each other, and all use a standard unit of length. The standard basis in $\mathbb{R}^n$ is the most familiar example.

3.  **Coordinates Become Simple Projections.** This is the payoff. With a regular basis, finding the coordinates of a vector requires solving a system of linear equations. With an orthonormal basis $\{u_1, ..., u_n\}$, the coordinates of a vector $y$ are found by simply projecting $y$ onto each basis vector. The coordinate $c_j$ is the length of this projection.
    $$ y = (y \cdot u_1)u_1 + (y \cdot u_2)u_2 + \dots + (y \cdot u_n)u_n $$
    This formula replaces a potentially massive matrix inversion with a series of simple dot products.

## Worked example
Let's find the coordinates of the vector $y = \begin{pmatrix} 7 \\ 1 \end{pmatrix}$ with respect to the orthonormal basis $B = \{u_1, u_2\}$ for $\mathbb{R}^2$, where $u_1 = \begin{pmatrix} 1/\sqrt{5} \\ 2/\sqrt{5} \end{pmatrix}$ and $u_2 = \begin{pmatrix} -2/\sqrt{5} \\ 1/\sqrt{5} \end{pmatrix}$.

**Step 1: Verify the basis is orthonormal.**
First, check for orthogonality.
$$ u_1 \cdot u_2 = \left(\frac{1}{\sqrt{5}}\right)\left(\frac{-2}{\sqrt{5}}\right) + \left(\frac{2}{\sqrt{5}}\right)\left(\frac{1}{\sqrt{5}}\right) = \frac{-2}{5} + \frac{2}{5} = 0 $$
They are orthogonal. Now, check for unit length (normalization).
$$ \|u_1\|^2 = u_1 \cdot u_1 = \left(\frac{1}{\sqrt{5}}\right)^2 + \left(\frac{2}{\sqrt{5}}\right)^2 = \frac{1}{5} + \frac{4}{5} = 1 \implies \|u_1\|=1 $$
$$ \|u_2\|^2 = u_2 \cdot u_2 = \left(\frac{-2}{\sqrt{5}}\right)^2 + \left(\frac{1}{\sqrt{5}}\right)^2 = \frac{4}{5} + \frac{1}{5} = 1 \implies \|u_2\|=1 $$
The basis $B$ is indeed orthonormal.

**Step 2: Calculate the coordinates using the projection formula.**
We want to find $c_1, c_2$ such that $y = c_1 u_1 + c_2 u_2$. The formula is $c_j = y \cdot u_j$.
$$ c_1 = y \cdot u_1 = \begin{pmatrix} 7 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1/\sqrt{5} \\ 2/\sqrt{5} \end{pmatrix} = (7)\left(\frac{1}{\sqrt{5}}\right) + (1)\left(\frac{2}{\sqrt{5}}\right) = \frac{7+2}{\sqrt{5}} = \frac{9}{\sqrt{5}} $$
$$ c_2 = y \cdot u_2 = \begin{pmatrix} 7 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} -2/\sqrt{5} \\ 1/\sqrt{5} \end{pmatrix} = (7)\left(\frac{-2}{\sqrt{5}}\right) + (1)\left(\frac{1}{\sqrt{5}}\right) = \frac{-14+1}{\sqrt{5}} = \frac{-13}{\sqrt{5}} $$
So, the coordinate vector of $y$ with respect to basis $B$ is $[y]_B = \begin{pmatrix} 9/\sqrt{5} \\ -13/\sqrt{5} \end{pmatrix}$.

**Reflection:**
Step 1 was a sanity check; it confirmed we could use the simple formula. Step 2 executed the formula, which involved two quick dot products. Without this method, we would have had to set up the vector equation $c_1 u_1 + c_2 u_2 = y$ and solve a $2 \times 2$ system of linear equations for $c_1$ and $c_2$. For a $1000 \times 1000$ system, the difference in computational cost is monumental.

## Diagrams
Here is a diagram showing a vector $y$ and its projections onto an orthonormal basis $\{u_1, u_2\}$, which is rotated relative to the standard axes $\{e_1, e_2\}$. The coordinates $c_1$ and $c_2$ are the lengths of these projections.

```text
       ^ e2
       |
       |    / u2
       |   /
       |  /
       | /
       |/
       *----------------------> e1
      /|
     / |
    /  |
   /   |
  u1   |
       |
```

This second diagram shows the geometry of the projection. The vector $y$ is the hypotenuse of a right triangle formed by the scaled basis vectors $c_1 u_1$ and $c_2 u_2$.

```text
       ^ u2
       |
       |
       | . . . . . . . y
       | .           .`
       | .          /
 c2 u2 | .         /
       | .        /
       | .       /
       +---------*------> u1
          c1 u1
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture an "orthodontist" straightening teeth. The goal is a perfect, "normal" smile where all teeth are straight and at right angles to the gums. **Ortho-Normal** means **Right-Angle & Standard-Length**. An orthonormal basis is the perfectly straight, standardized framework for your vector space.

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    *   **Orthogonality Condition:** $u \cdot v = 0$
    *   **Vector in Orthonormal Basis:** For an orthonormal basis $\{u_1, ..., u_n\}$, any vector $y$ can be expressed as:
        $$ y = \sum_{i=1}^{n} (y \cdot u_i) u_i $$
    *   **Projection Formula for an Orthogonal (not orthonormal) Basis:**
        $$ y = \sum_{i=1}^{n} \frac{y \cdot u_i}{u_i \cdot u_i} u_i $$

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the coordinate formula $c_j = y \cdot u_j$, re-derive it. It takes 30 seconds.
    *   Start with the definition: $y = c_1 u_1 + \dots + c_j u_j + \dots + c_n u_n$.
    *   To isolate $c_j$, "hit" both sides with $\cdot u_j$:
        $y \cdot u_j = (c_1 u_1 + \dots + c_j u_j + \dots + c_n u_n) \cdot u_j$
    *   Distribute: $y \cdot u_j = c_1(u_1 \cdot u_j) + \dots + c_j(u_j \cdot u_j) + \dots + c_n(u_n \cdot u_j)$
    *   Since the basis is orthonormal, $u_i \cdot u_j = 0$ for $i \neq j$ and $u_j \cdot u_j = 1$. Every term on the right side becomes zero except for one:
        $y \cdot u_j = 0 + \dots + c_j(1) + \dots + 0$
    *   Result: $c_j = y \cdot u_j$. You can always rebuild this.

## Common mistakes
1.  **Confusing Orthogonal and Orthonormal:** An orthogonal set only requires vectors to be perpendicular. An orthonormal set requires them to be perpendicular *and* have a length of 1. Forgetting to normalize is a frequent error.
2.  **Applying the Simple Formula to a Non-Orthonormal Basis:** The formula $c_j = y \cdot u_j$ is a special privilege of orthonormal bases. If a basis is not orthonormal, you *must* go back to solving a system of linear equations. If it's orthogonal but not normal, you must use the more general projection formula $c_j = \frac{y \cdot u_j}{u_j \cdot u_j}$.
3.  **Assuming a Random Basis is Orthogonal:** Most bases are not orthogonal. The standard basis $\{e_1, \dots, e_n\}$ is a notable exception that can build false intuition. Always verify orthogonality with the dot product before using any special formulas.

## Self-check
1.  Consider the vectors $v_1 = \begin{pmatrix} 3 \\ -1 \end{pmatrix}$ and $v_2 = \begin{pmatrix} 2 \\ 6 \end{pmatrix}$ in $\mathbb{R}^2$. Is the set $\{v_1, v_2\}$ orthogonal? Is it orthonormal? Can it be converted into an orthonormal basis for $\mathbb{R}^2$?
2.  The set $B = \left\{ u_1=\begin{pmatrix} 2/3 \\ 1/3 \\ 2/3 \end{pmatrix}, u_2=\begin{pmatrix} -2/3 \\ 2/3 \\ 1/3 \end{pmatrix} \right\}$ is an orthonormal set. Find a third vector $u_3$ such that $\{u_1, u_2, u_3\}$ forms an orthonormal basis for $\mathbb{R}^3$.
3.  Let $V$ be the vector space of all continuous functions on the interval $[-\pi, \pi]$, with the inner product defined as $\langle f, g \rangle = \int_{-\pi}^{\pi} f(x)g(x)dx$. Show that the set $\{1, \cos(x), \sin(x)\}$ is an orthogonal set in this space.