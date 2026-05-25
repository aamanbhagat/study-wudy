## What it is
The span of a set of vectors is the collection of all points you can reach by taking linear combinations of those vectors. Imagine starting at the origin; each vector gives you a direction you can travel, and the span is the complete set of destinations you can arrive at by combining these allowed movements. This set always forms a vector subspace, such as a line, a plane, or a higher-dimensional equivalent passing through the origin.

## Why it matters
Span is a foundational concept for understanding the structure of data and physical systems. In machine learning, the span of feature vectors defines the entire space of outputs a linear model can produce. In aerospace, the span of control vectors (e.g., from thrusters) defines the set of all possible changes in a spacecraft's state (position and velocity) that can be achieved.

## When to study it
You must be completely comfortable with these prerequisites before tackling span:
1.  **Vector Spaces:** The definition of a vector space, particularly $\mathbb{R}^n$.
2.  **Vector Operations:** Vector addition and scalar multiplication, both algebraically and geometrically.
3.  **Linear Combinations:** The definition of a linear combination of vectors, $c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_k\vec{v}_k$.

If you are not fluent with these, pause and review them. Span is defined directly in terms of linear combinations, so that concept must be second nature.

## How to study it (step by step)
1.  **Visualize the span of one vector.** Take a single non-zero vector $\vec{v} \in \mathbb{R}^2$. A linear combination is just $c\vec{v}$. What points can you form as you let the scalar $c$ range over all real numbers? Sketch this. You will see it traces an infinite line passing through the origin in the direction of $\vec{v}$.
2.  **Visualize the span of two non-collinear vectors.** Take $\vec{v}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\vec{v}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ in $\mathbb{R}^2$. Consider the linear combination $c_1\vec{v}_1 + c_2\vec{v}_2$. Convince yourself that by choosing appropriate $c_1$ and $c_2$, you can reach *any* point $(x, y)$ in the plane. The span of these two vectors is all of $\mathbb{R}^2$.
3.  **Visualize the span of two collinear vectors.** Now take $\vec{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\vec{v}_2 = \begin{pmatrix} 2 \\ 2 \end{pmatrix}$. What is their span? Notice that $\vec{v}_2 = 2\vec{v}_1$. Any linear combination $c_1\vec{v}_1 + c_2\vec{v}_2$ can be rewritten as $c_1\vec{v}_1 + c_2(2\vec{v}_1) = (c_1 + 2c_2)\vec{v}_1$. This is just a scalar multiple of $\vec{v}_1$. The span is just a line, not a plane. The second vector was redundant.
4.  **Formalize the definition.** Write down the formal definition of span using set-builder notation. For a set of vectors $S = \{\vec{v}_1, \vec{v}_2, \dots, \vec{v}_k\}$, the span is:
    $$ \text{span}(S) = \{ c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_k\vec{v}_k \mid c_1, c_2, \dots, c_k \in \mathbb{R} \} $$
    This says "The span of S is the set of all vectors that can be written as a linear combination of the vectors in S."
5.  **Connect span to systems of equations.** The fundamental computational question is: "Is a vector $\vec{w}$ in the span of $\{\vec{v}_1, \dots, \vec{v}_k\}$?" This is equivalent to asking: "Does the equation $c_1\vec{v}_1 + \dots + c_k\vec{v}_k = \vec{w}$ have a solution for the scalars $c_1, \dots, c_k$?" This turns a geometric question into an algebraic problem of solving a system of linear equations.

## Key ideas, with intuition
1.  **Span is about reachability.** Think of your vectors as a set of "allowed moves" from the origin. The span is the entire region of space you can reach. If you have one vector, you can only move back and forth along its line. If you have two (non-collinear) vectors, you can combine them to "slide" anywhere on the plane they define.
2.  **The origin is always included.** The zero vector $\vec{0}$ is always in the span of any set of vectors. You can always choose all your scalars to be zero: $0\vec{v}_1 + 0\vec{v}_2 + \dots = \vec{0}$. Geometrically, this means any subspace defined by a span (line, plane, etc.) must pass through the origin.
3.  **Span "builds" subspaces.** The span of a set of vectors is not just a loose collection of points; it's a subspace. This means if you take any two vectors *within* the span and add them, their sum is also in the span. Likewise, scaling any vector in the span keeps it within the span. The span is a self-contained geometric object.
4.  **Redundant vectors don't increase the span.** If a vector in your set can be written as a linear combination of the others, it adds no new directions. The span of $\{\begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \end{pmatrix}\}$ is still just the entire plane $\mathbb{R}^2$. The third vector is redundant because $\begin{pmatrix} 1 \\ 1 \end{pmatrix} = 1\begin{pmatrix} 1 \\ 0 \end{pmatrix} + 1\begin{pmatrix} 0 \\ 1 \end{pmatrix}$. This is the core intuition behind the concept of linear independence, which you will study next.

## Worked example
**Question:** Is the vector $\vec{w} = \begin{pmatrix} 7 \\ 2 \\ -3 \end{pmatrix}$ in the span of the set of vectors $S = \left\{ \vec{v}_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \vec{v}_2 = \begin{pmatrix} 2 \\ 0 \\ 1 \end{pmatrix} \right\}$?

**Solution:**
1.  **Set up the vector equation.** To check if $\vec{w}$ is in the span of $S$, we need to determine if there exist scalars $c_1, c_2 \in \mathbb{R}$ such that:
    $$ c_1\vec{v}_1 + c_2\vec{v}_2 = \vec{w} $$
    $$ c_1\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} + c_2\begin{pmatrix} 2 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 7 \\ 2 \\ -3 \end{pmatrix} $$

2.  **Convert to a system of linear equations.** By combining the vectors on the left, we can write this as a single vector equation:
    $$ \begin{pmatrix} c_1 + 2c_2 \\ c_1 \\ c_2 \end{pmatrix} = \begin{pmatrix} 7 \\ 2 \\ -3 \end{pmatrix} $$
    For these vectors to be equal, their corresponding components must be equal. This gives us a system of three linear equations with two unknowns:
    (1) $c_1 + 2c_2 = 7$
    (2) $c_1 = 2$
    (3) $c_2 = -3$

3.  **Solve the system.** This system is overdetermined, but it's easy to solve. Equations (2) and (3) directly give us candidate values for our scalars: $c_1 = 2$ and $c_2 = -3$.

4.  **Check for consistency.** We must check if these values satisfy the remaining equation, equation (1).
    $$ (2) + 2(-3) = 2 - 6 = -4 $$
    The equation requires the result to be $7$, but we got $-4$. So, $-4 \neq 7$.

5.  **Conclusion.** Since there is no pair of scalars $(c_1, c_2)$ that can satisfy all three equations simultaneously, the system is inconsistent. Therefore, $\vec{w}$ cannot be written as a linear combination of $\vec{v}_1$ and $\vec{v}_2$.

**Final Answer:** No, $\vec{w}$ is not in the span of $\{\vec{v}_1, \vec{v}_2\}$.

**Reflection:** The process was a direct translation of the definition of span into an algebraic test. We asked "Can we build $\vec{w}$ from $\vec{v}_1$ and $\vec{v}_2$?" which became "Does a solution exist for the scalars $c_1, c_2$?". The inconsistency of the linear system provided a definitive "no". Geometrically, the span of $\vec{v}_1$ and $\vec{v}_2$ is a plane in $\mathbb{R}^3$, and we have just shown that the vector $\vec{w}$ does not lie on that plane.

## Diagrams

Span of a single vector $\vec{v}$ in $\mathbb{R}^2$:
```text
      y
      ^
      |     /
      |    /
      |   * (v)
      |  /
      | /
------O------------> x
     /|
    / |
   /  |
  /   |
```
*The span is the entire infinite line passing through the origin O and the point v.*

Span of two non-collinear vectors $\vec{v}_1$ and $\vec{v}_2$ in $\mathbb{R}^2$:
```text
      y
      ^
      | . . . . * (v2)
      | . . . ./ .
      | . . . / . .
      | . . ./ . . .
------O----*-----------> x
      | . (v1) . . .
      | . . . . . .
```
*The span is the entire 2D plane. Any point on the grid can be reached by some combination $c_1\vec{v}_1 + c_2\vec{v}_2$.*

## Memory technique — remember this forever
1.  **The Paintbrush Analogy:** Think of the origin as your paint bucket. Each vector in your set, like $\{\vec{v}_1, \vec{v}_2\}$, is a special paintbrush. You can only paint in straight lines from the origin in the direction of that brush. The scalars $c_1, c_2$ are "pressure controls" that let you paint a longer or shorter line, or even paint backwards (negative scalar). The **span** is the entire canvas you could possibly cover by making strokes with these brushes and layering them on top of each other. One brush gives you a line. Two brushes (pointed in different directions) let you cover a whole sheet of paper (a plane).

2.  **Must-learn formulas:**
    *   Linear Combination: $\vec{w} = c_1\vec{v}_1 + c_2\vec{v}_2 + \dots + c_k\vec{v}_k$
    *   Definition of Span: $\text{span}\{\vec{v}_1, \dots, \vec{v}_k\} = \{ c_1\vec{v}_1 + \dots + c_k\vec{v}_k \mid c_1, \dots, c_k \in \mathbb{R} \}$

3.  **Spaced Repetition Schedule:** Review this concept and re-work the example at **1 day, 3 days, 7 days, 16 days, and 35 days**. Put it in your calendar.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   What is a linear combination? It's scaling and adding vectors: $c_1\vec{v}_1 + c_2\vec{v}_2$.
    *   What if I did this for *all possible* scalars $c_1, c_2$? I'd get a set of resulting vectors.
    *   "Span" is just the name for that set.

## Common mistakes
1.  **Confusing the set with its span.** The set $\{\vec{v}_1, \vec{v}_2\}$ contains exactly two vectors. Their span, $\text{span}\{\vec{v}_1, \vec{v}_2\}$, is an infinite set of vectors (a line or a plane). Don't say "the span *is* the two vectors."
2.  **Assuming the span is just the axes.** Students sometimes visualize the span of $\{\begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix}\}$ as just the x-axis and the y-axis. It is the *entire* plane, which is reachable by *adding* multiples of these vectors.
3.  **Assuming $k$ vectors span a $k$-dimensional space.** As we saw, the two collinear vectors $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} 2 \\ 2 \end{pmatrix}$ only span a 1D line, not a 2D plane. The dimensionality of the span depends on the number of *linearly independent* vectors, not the total number of vectors.

## Self-check
1.  Describe the geometric shape of the span of a single non-zero vector $\vec{v} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ in $\mathbb{R}^3$.
2.  Is the vector $\vec{w} = \begin{pmatrix} 5 \\ -2 \end{pmatrix}$ in the span of $S = \left\{ \vec{v}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \vec{v}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\}$? Justify your answer by finding the specific linear combination if it exists.
3.  Consider the set of vectors $S = \left\{ \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix} \right\}$ in $\mathbb{R}^3$. Does their span cover all of $\mathbb{R}^3$? Or is it a plane or a line? Justify your answer by inspecting the relationship between the vectors, without setting up a full system of equations.