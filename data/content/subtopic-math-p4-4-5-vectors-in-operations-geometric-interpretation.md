## What it is
A vector in $\mathbb{R}^n$ is an ordered list of $n$ real numbers, called its components. Geometrically, a vector can be interpreted as a point in $n$-dimensional space whose coordinates are given by its components, or as an arrow originating from the origin and ending at that point, embodying both magnitude (length) and direction.

## Why it matters
Vectors are the fundamental objects for describing states and forces in physics and engineering. In aerospace, vectors represent velocity, acceleration, thrust, and gravitational fields. In machine learning, a data point with $n$ features (e.g., height, weight, age) is treated as a single vector in $\mathbb{R}^n$, allowing geometric and algebraic tools to find patterns.

## When to study it
You should be comfortable with the Cartesian coordinate system ($\mathbb{R}^2$ and $\mathbb{R}^3$) and basic algebraic manipulation of real numbers. Familiarity with parametric equations of a line is helpful for intuition but not strictly required. This topic is foundational; nearly all of linear algebra builds upon it.

## How to study it (step by step)
1.  **Start with Algebra.** Write down the formal definition of a vector $\vec{v}$ in $\mathbb{R}^n$ as an n-tuple: $\vec{v} = (v_1, v_2, \dots, v_n)$. Define vector addition and scalar multiplication component-wise. For $\vec{v}, \vec{w} \in \mathbb{R}^n$ and a scalar $c \in \mathbb{R}$:
    $\vec{v} + \vec{w} = (v_1+w_1, \dots, v_n+w_n)$
    $c\vec{v} = (cv_1, \dots, cv_n)$
    Work through 2-3 numerical examples in $\mathbb{R}^3$ until the process is automatic.

2.  **Connect to Geometry in $\mathbb{R}^2$.** Take two vectors, e.g., $\vec{v} = (2, 1)$ and $\vec{w} = (1, 3)$. Draw them on a standard x-y plane as arrows from the origin $(0,0)$.

3.  **Visualize Addition.** Calculate $\vec{v} + \vec{w} = (3, 4)$. Now, draw this resultant vector. See that you can obtain it geometrically by taking the arrow for $\vec{v}$ and placing the tail of the arrow for $\vec{w}$ at its tip. The vector from the origin to the new tip is $\vec{v} + \vec{w}$. This is the "tip-to-tail" rule.

4.  **Visualize Scalar Multiplication.** Calculate $2\vec{v} = (4, 2)$ and $-\frac{1}{2}\vec{v} = (-1, -0.5)$. Draw these. Observe that $2\vec{v}$ is in the same direction as $\vec{v}$ but twice as long, and $-\frac{1}{2}\vec{v}$ points in the opposite direction and is half as long. This solidifies the "scaling" intuition.

5.  **Derive the Parallelogram Law.** Using your drawing from step 3, also draw the vector obtained by placing the tail of $\vec{v}$ at the tip of $\vec{w}$. Notice that this also results in the point $(3, 4)$. The vectors $\vec{v}$ and $\vec{w}$ form the adjacent sides of a parallelogram, and their sum $\vec{v}+\vec{w}$ is the main diagonal starting from the origin.

6.  **Generalize to $\mathbb{R}^n$.** Recognize that while you can no longer visualize $\mathbb{R}^4$ and beyond, the algebraic rules are identical. The geometric intuition developed in $\mathbb{R}^2$ and $\mathbb{R}^3$ (scaling, tip-to-tail addition) serves as a powerful analogy for how vectors behave in higher dimensions.

## Key ideas, with intuition
1.  **Vectors as Points vs. Arrows.** A vector like $\vec{p} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$ can mean two things: the *position* of the point $(3,2)$, or the *displacement* of 3 units right and 2 units up. The arrow representation is crucial for understanding operations. An arrow is a vector that is "free" to move; as long as its length and direction are unchanged, it's the same vector. The vector from point $A(a_1, a_2)$ to point $B(b_1, b_2)$ is given by the vector $\vec{v} = \begin{pmatrix} b_1 - a_1 \\ b_2 - a_2 \end{pmatrix}$.

2.  **Vector Addition is Composition of Displacements.** The sum $\vec{v} + \vec{w}$ answers the question: "If I undergo displacement $\vec{v}$, and *then* undergo displacement $\vec{w}$, what is my net displacement from my starting point?" The algebraic operation of adding components directly mirrors this physical intuition.
    $$ \vec{v} = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}, \vec{w} = \begin{pmatrix} w_1 \\ w_2 \end{pmatrix} \implies \vec{v} + \vec{w} = \begin{pmatrix} v_1 + w_1 \\ v_2 + w_2 \end{pmatrix} $$

3.  **Scalar Multiplication is Rescaling.** Multiplying a vector $\vec{v}$ by a scalar $c$ creates a new vector that points along the same line as $\vec{v}$. The scalar $c$ simply scales the vector's magnitude by a factor of $|c|$ and flips its direction if $c$ is negative. This is why the set of all vectors $\{c\vec{v} \mid c \in \mathbb{R}\}$ forms an infinite line through the origin and the point corresponding to $\vec{v}$.
    $$ c\vec{v} = c \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} cv_1 \\ cv_2 \end{pmatrix} $$

## Worked example
Let $\vec{u} = \begin{pmatrix} 4 \\ 1 \end{pmatrix}$ and $\vec{v} = \begin{pmatrix} -1 \\ 2 \end{pmatrix}$ be vectors in $\mathbb{R}^2$. Calculate and interpret the vector $\vec{w} = 2\vec{u} - \vec{v}$.

**Step 1: Scalar Multiplication**
First, compute the vector $2\vec{u}$. This involves multiplying each component of $\vec{u}$ by the scalar $2$.
$$ 2\vec{u} = 2 \begin{pmatrix} 4 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \cdot 4 \\ 2 \cdot 1 \end{pmatrix} = \begin{pmatrix} 8 \\ 2 \end{pmatrix} $$
*Reflection: This step scales the vector $\vec{u}$, making it twice as long but keeping its direction.*

**Step 2: Vector Subtraction**
Vector subtraction $\vec{a} - \vec{b}$ is defined as vector addition $\vec{a} + (-\vec{b})$. So, we need to find $-\vec{v}$ and add it to $2\vec{u}$.
$$ -\vec{v} = -1 \cdot \vec{v} = -1 \begin{pmatrix} -1 \\ 2 \end{pmatrix} = \begin{pmatrix} (-1) \cdot (-1) \\ (-1) \cdot 2 \end{pmatrix} = \begin{pmatrix} 1 \\ -2 \end{pmatrix} $$
Now, add the results from Step 1 and this step.
$$ \vec{w} = 2\vec{u} + (-\vec{v}) = \begin{pmatrix} 8 \\ 2 \end{pmatrix} + \begin{pmatrix} 1 \\ -2 \end{pmatrix} = \begin{pmatrix} 8+1 \\ 2+(-2) \end{pmatrix} = \begin{pmatrix} 9 \\ 0 \end{pmatrix} $$
*Reflection: This step follows the tip-to-tail rule. Geometrically, we would draw the vector $2\vec{u}$, and from its tip, we would draw the vector $-\vec{v}$ (which is $\vec{v}$ flipped 180 degrees). The final vector $\vec{w}$ goes from the origin to the tip of the flipped $\vec{v}$.*

The final vector is $\vec{w} = \begin{pmatrix} 9 \\ 0 \end{pmatrix}$. This represents a displacement of 9 units along the positive x-axis and 0 units along the y-axis.

## Diagrams
Vector Addition (Parallelogram Law) in $\mathbb{R}^2$.
Let $\vec{v} = (v_x, v_y)$ and $\vec{w} = (w_x, w_y)$. Their sum is $\vec{s} = \vec{v}+\vec{w}$.

```text
       y
       ^
       |
       |     (vx+wx, vy+wy)
       |     .---------------> s = v+w
       |    /|             /
       |   / |            /
     vy+wy | |           /
       |   w |          /
       |  /  |         /
       | /   |        /
       |/    |       /
       .----(vx,vy) /
       |     .     /
       |    / \   v
       |   /   .
       |  w     .
       +----------------------------> x
     O
```
*Description: The diagram shows the origin O. Vector $\vec{v}$ points from O to $(v_x, v_y)$. Vector $\vec{w}$ also points from O. The sum $\vec{s} = \vec{v}+\vec{w}$ is the diagonal of the parallelogram whose adjacent sides are $\vec{v}$ and $\vec{w}$. The diagram also shows the tip-to-tail method: the dashed arrow equivalent to $\vec{w}$ starts at the tip of $\vec{v}$ and ends at the tip of $\vec{s}$.*

## Memory technique — remember this forever
1.  **The Story:** Think of vectors as treasure map instructions. "Start at the origin. Go 4 paces East, 1 pace North" is the vector $\vec{u} = \begin{pmatrix} 4 \\ 1 \end{pmatrix}$. Vector addition $\vec{u} + \vec{v}$ is simply following the first set of instructions, then following the second set from where you ended up. Scalar multiplication $2\vec{u}$ means "do the $\vec{u}$ instructions twice".

2.  **Must-Know Formulas:**
    -   **Vector Addition:** If $\vec{v} = (v_1, \dots, v_n)$ and $\vec{w} = (w_1, \dots, w_n)$, then $\vec{v} + \vec{w} = (v_1+w_1, \dots, v_n+w_n)$.
    -   **Scalar Multiplication:** If $c \in \mathbb{R}$, then $c\vec{v} = (cv_1, \dots, cv_n)$.

3.  **Spaced Repetition Schedule:** Review these definitions and the tip-to-tail geometric rule at:
    -   1 day (tomorrow)
    -   3 days
    -   7 days
    -   16 days
    -   35 days
    Each time, do one calculation and draw one diagram.

4.  **First Principles Pathway:** If you forget everything, remember this: **Vectors are just lists of numbers, and operations are applied independently to each matching component.** To add two vectors, you just add the first components together, then the second components together, and so on. This is because movement in the x-direction is independent of movement in the y-direction. The algebraic rules are a direct consequence of this physical independence.

## Common mistakes
1.  **Adding vectors of different dimensions.** You cannot add a vector in $\mathbb{R}^2$ to a vector in $\mathbb{R}^3$. The operation is undefined. Always check that vectors have the same number of components before adding them.
2.  **Confusing a point with a vector.** A point $(5, 3)$ is a location. A vector $\begin{pmatrix} 5 \\ 3 \end{pmatrix}$ is a displacement. They are represented by the same coordinates when the vector starts at the origin, but the concepts are distinct. This distinction becomes critical when dealing with affine transformations.
3.  **Incorrectly drawing subtraction.** To draw $\vec{u} - \vec{v}$, you add $\vec{u} + (-\vec{v})$. A common error is to draw the diagonal of the parallelogram formed by $\vec{u}$ and $\vec{v}$ that does *not* start at the origin. This other diagonal actually represents $\vec{u}-\vec{v}$ (or $\vec{v}-\vec{u}$), but it's crucial to get the direction right and understand why.

## Self-check
1.  Given $\vec{a} = (1, -2, 3)$ and $\vec{b} = (0, 4, 1)$ in $\mathbb{R}^3$, compute the vector $\vec{x} = 3\vec{a} - 2\vec{b}$.
2.  Three vectors $\vec{u}, \vec{v}, \vec{w}$ satisfy the equation $\vec{u} + \vec{v} + \vec{w} = \vec{0}$ (the zero vector). If you draw them placed tip-to-tail, what geometric figure do they form?
3.  Let $\vec{v} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $\vec{w} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$ in $\mathbb{R}^2$. Describe the set of all points $P$ that can be written as $\vec{p} = c\vec{v} + d\vec{w}$ for scalars $c, d$ such that $0 \le c \le 1$ and $0 \le d \le 1$. What is this geometric shape?