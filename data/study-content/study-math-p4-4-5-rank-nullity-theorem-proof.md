## 1. What it is — in plain English

Imagine you have a machine that takes in different kinds of ingredients (these are your "inputs") and turns them into various products (these are your "outputs"). This machine is a "linear transformation" in mathematics.

The "Rank-Nullity Theorem" is like a secret rule for this machine. It tells you that the total number of "independent knobs" you can turn on the input side (the dimension of the input space) is always equal to the sum of two things:

First, how many "independent types of output" the machine can produce (this is called the "rank"). Think of it as the effective "variety" of products it can make.

Second, how many "independent input settings" just make the machine do nothing at all – they produce a "zero" output, like adding water to water (this is called the "nullity"). These are the inputs that essentially disappear or get "squashed" by the machine.

So, in simple terms: **The total complexity of the inputs you can feed into a system is perfectly split between the complexity of the useful outputs it generates and the complexity of the inputs it simply ignores or eliminates.** It's a fundamental conservation law for information or "dimensionality" in linear systems.

## 2. Why it matters — real-world applications

The Rank-Nullity Theorem is a cornerstone of linear algebra, providing deep insights into the structure of linear systems. Its implications ripple through many fields:

1.  **Machine Learning and Data Science (Dimensionality Reduction):** In techniques like Principal Component Analysis (PCA), data points (vectors) are transformed to a lower-dimensional space. The rank of the transformation matrix tells you the effective number of dimensions preserved, while the nullity indicates how many dimensions of information were discarded as redundant or irrelevant. Understanding this balance helps optimize models by removing noise or less impactful features without losing crucial information, making computations faster and models more robust.
2.  **Computer Graphics and Image Processing:** When you rotate, scale, or project 3D objects onto a 2D screen, you're performing linear transformations. The rank of these transformations determines the dimensionality of the resulting image (e.g., a 3D object projected onto a 2D plane has a rank of at most 2). The nullity tells you what information was "lost" in the projection – for example, the depth information when a 3D scene is rendered as 2D. This is crucial for efficient rendering and understanding visual data compression.
3.  **Control Systems and Robotics:** In robotics, engineers design control systems to manipulate robots. The state of a robot (position, velocity, joint angles) can be represented by a vector. Linear transformations describe how control inputs affect the robot's state. The rank of the system's "observability matrix" tells you how many state variables can actually be determined from sensor measurements (the observable "output"). The nullity reveals how many state variables are "unobservable" – hidden from the sensors. This is critical for designing effective controllers and ensuring a robot can be accurately monitored and controlled.
4.  **Physics (Quantum Mechanics):** In quantum mechanics, states of particles are represented by vectors in a complex vector space, and physical operations (like measuring energy) are represented by linear operators (matrices). The rank of an operator can relate to the number of distinct outcomes of a measurement, while the nullity can relate to the "degeneracy" of an energy level – meaning multiple distinct quantum states might correspond to the same energy value (they get mapped to the same "output" by the energy operator). This helps physicists understand the fundamental properties of particles and systems.

## 3. Prerequisites — what you must know first

To fully grasp the proof of the Rank-Nullity Theorem, you need a solid understanding of the following concepts. If any of these are unfamiliar, pause and review them thoroughly.

*   **Vector Space:** A set of objects (vectors) that can be added together and multiplied by scalars, satisfying certain axioms (closure, associativity, commutativity, etc.).
*   **Subspace:** A subset of a vector space that is itself a vector space under the same operations.
*   **Linear Combination:** A sum of vectors scaled by coefficients ($c_1v_1 + c_2v_2 + \dots + c_nv_n$).
*   **Span:** The set of all possible linear combinations of a given set of vectors. It forms a subspace.
*   **Linear Independence:** A set of vectors is linearly independent if the only way to form the zero vector from their linear combination is if all coefficients are zero. If one vector can be written as a linear combination of others, they are linearly dependent.
*   **Basis:** A set of vectors that is linearly independent and spans the entire vector space (or subspace). It's a minimal set of vectors needed to describe all others.
*   **Dimension of a Vector Space:** The number of vectors in any basis for that vector space. This number is unique.
*   **Linear Transformation:** A function $T: V \to W$ between two vector spaces $V$ and $W$ that preserves vector addition and scalar multiplication: $T(u+v) = T(u)+T(v)$ and $T(cv) = cT(v)$.
*   **Kernel (or Null Space) of a Linear Transformation:** The set of all vectors in the domain $V$ that get mapped to the zero vector in the codomain $W$. Denoted $\text{Null}(T)$ or $\text{Ker}(T)$. It is a subspace of $V$.
*   **Nullity of a Linear Transformation:** The dimension of the kernel/null space, i.e., $\text{nullity}(T) = \dim(\text{Null}(T))$.
*   **Image (or Range Space) of a Linear Transformation:** The set of all possible output vectors in the codomain $W$ that result from applying $T$ to vectors in the domain $V$. Denoted $\text{Im}(T)$ or $\text{Range}(T)$. It is a subspace of $W$.
*   **Rank of a Linear Transformation:** The dimension of the image/range space, i.e., $\text{rank}(T) = \dim(\text{Im}(T))$.
*   **Matrices as Linear Transformations:** Every $m \times n$ matrix $A$ defines a linear transformation $T_A: \mathbb{R}^n \to \mathbb{R}^m$ by $T_A(x) = Ax$. The null space of $A$ is the set of solutions to $Ax=0$, and the image space of $A$ is the column space of $A$.

## 4. The core idea — step by step

The proof of the Rank-Nullity Theorem is a beautiful demonstration of how to construct bases to relate the dimensions of different vector spaces. We will prove it for a linear transformation $T: V \to W$, where $V$ and $W$ are finite-dimensional vector spaces.

The theorem states:
$$ \dim(V) = \dim(\text{Null}(T)) + \dim(\text{Im}(T)) $$
Or, equivalently:
$$ \dim(V) = \text{nullity}(T) + \text{rank}(T) $$

Let's break down the proof into logical steps.

### Step 1: Understanding the Null Space and its Basis

*   **Plain-English Statement:** Every linear transformation has a "null space" – a collection of input vectors that all get squashed down to the zero vector in the output. This null space is a subspace of the input space. We can find a minimal set of independent vectors that "generate" this entire null space; this set is called a basis for the null space.

*   **Small Concrete Example:** Consider a transformation $T: \mathbb{R}^3 \to \mathbb{R}^2$ that projects a 3D vector onto the $xy$-plane. So, $T(x,y,z) = (x,y)$.
    What vectors get mapped to $(0,0)$? Any vector of the form $(0,0,z)$.
    The null space is the $z$-axis. A basis for this null space could be $\{(0,0,1)\}$.
    So, $\text{nullity}(T) = 1$.

*   **Formal/Mathematical Version:**
    Let $V$ be a finite-dimensional vector space and $T: V \to W$ be a linear transformation.
    The null space of $T$, denoted $\text{Null}(T)$, is defined as:
    $$ \text{Null}(T) = \{v \in V \mid T(v) = 0_W \} $$
    Since $\text{Null}(T)$ is a subspace of $V$, it has a basis. Let's choose a basis for $\text{Null}(T)$.
    Let $\{u_1, u_2, \dots, u_k\}$ be a basis for $\text{Null}(T)$.
    By definition, the dimension of the null space is $k$, so $\dim(\text{Null}(T)) = k$.

*   **What could go wrong:** Forgetting that $\text{Null}(T)$ is a subspace, or incorrectly identifying its basis. If $T(v) = 0_W$ only for $v=0_V$, then $\text{Null}(T) = \{0_V\}$, and its basis is the empty set (or we can say its dimension is 0).

### Step 2: Extending the Null Space Basis to a Basis for the Entire Domain

*   **Plain-English Statement:** We have a basis for the "boring" part of the input space (the null space). Now, we want to describe *all* possible inputs. We can add more vectors to our null space basis until we have a complete basis for the entire input space $V$. These new vectors, along with the null space basis vectors, will form a basis for $V$.

*   **Small Concrete Example:** In our projection example, the null space basis is $\{(0,0,1)\}$. This is just one vector. To get a basis for $\mathbb{R}^3$, we need two more linearly independent vectors. We could choose $(1,0,0)$ and $(0,1,0)$.
    So, a basis for $\mathbb{R}^3$ would be $\{(0,0,1), (1,0,0), (0,1,0)\}$.
    Here, $k=1$ (for null space), and we added $m=2$ vectors. The total dimension of $V$ is $k+m = 1+2=3$.

*   **Formal/Mathematical Version:**
    Since $\text{Null}(T)$ is a subspace of $V$, and $V$ is finite-dimensional, we can extend the basis $\{u_1, u_2, \dots, u_k\}$ for $\text{Null}(T)$ to a basis for the entire vector space $V$.
    Let this extended basis for $V$ be $\{u_1, \dots, u_k, v_1, \dots, v_m\}$.
    The number of vectors in this basis is $k+m$.
    Therefore, the dimension of the domain $V$ is $\dim(V) = k+m$.
    Our goal is to show that $m = \dim(\text{Im}(T))$.

*   **What could go wrong:** Not understanding the "Basis Extension Theorem," which guarantees that such an extension is always possible. Also, confusing the basis vectors $u_i$ (which are in the null space) with the $v_j$ (which are not, unless $m=0$).

### Step 3: Examining the Images of the Extended Basis Vectors

*   **Plain-English Statement:** Now, let's see what happens when we apply our transformation $T$ to all the vectors in our basis for $V$. The vectors from the null space basis ($u_i$) will all go to zero. What about the *other* vectors ($v_j$)? They will produce some output vectors in $W$. We suspect these output vectors, $T(v_1), \dots, T(v_m)$, will be crucial for describing the image space.

*   **Small Concrete Example:**
    Our basis for $\mathbb{R}^3$ is $\{u_1=(0,0,1), v_1=(1,0,0), v_2=(0,1,0)\}$.
    Applying $T(x,y,z) = (x,y)$:
    $T(u_1) = T(0,0,1) = (0,0)$.
    $T(v_1) = T(1,0,0) = (1,0)$.
    $T(v_2) = T(0,1,0) = (0,1)$.
    The set of outputs from the non-null space basis vectors is $\{(1,0), (0,1)\}$.

*   **Formal/Mathematical Version:**
    Consider the set of images of the vectors $v_1, \dots, v_m$:
    $$ S' = \{T(v_1), T(v_2), \dots, T(v_m)\} $$
    We want to show that $S'$ is a basis for $\text{Im}(T)$. This requires proving two things:
    1.  $S'$ spans $\text{Im}(T)$.
    2.  $S'$ is linearly independent.

*   **What could go wrong:** Incorrectly assuming that $T(v_j)$ will automatically be non-zero or linearly independent without proof.

### Step 4: Proving that $S'$ Spans the Image Space

*   **Plain-English Statement:** Can any output of the transformation be created by combining $T(v_1), \dots, T(v_m)$? Yes. If you take *any* input vector, you can write it as a combination of $u_i$ and $v_j$. When you apply the transformation, the $u_i$ part disappears (because they're in the null space), leaving only the combination of $T(v_j)$. This means the $T(v_j)$ vectors are enough to generate all possible outputs.

*   **Small Concrete Example:**
    Let $w$ be any vector in $\text{Im}(T)$. So $w = T(x,y,z)$ for some $(x,y,z) \in \mathbb{R}^3$.
    We know $(x,y,z)$ can be written as $c_1 u_1 + d_1 v_1 + d_2 v_2$.
    $w = T(c_1 u_1 + d_1 v_1 + d_2 v_2)$
    By linearity, $w = c_1 T(u_1) + d_1 T(v_1) + d_2 T(v_2)$.
    Since $u_1$ is in the null space, $T(u_1) = (0,0)$.
    So, $w = c_1 (0,0) + d_1 (1,0) + d_2 (0,1) = d_1 (1,0) + d_2 (0,1)$.
    This shows that any output $w$ can be written as a linear combination of $\{(1,0), (0,1)\}$.

*   **Formal/Mathematical Version:**
    Let $w$ be an arbitrary vector in $\text{Im}(T)$.
    By definition of the image space, there exists some vector $v \in V$ such that $T(v) = w$.
    Since $\{u_1, \dots, u_k, v_1, \dots, v_m\}$ is a basis for $V$, we can express $v$ as a linear combination of these basis vectors:
    $$ v = c_1 u_1 + \dots + c_k u_k + d_1 v_1 + \dots + d_m v_m $$
    for some scalars $c_1, \dots, c_k, d_1, \dots, d_m$.
    Now, apply the transformation $T$ to $v$:
    $$ w = T(v) = T(c_1 u_1 + \dots + c_k u_k + d_1 v_1 + \dots + d_m v_m) $$
    By the linearity of $T$:
    $$ w = c_1 T(u_1) + \dots + c_k T(u_k) + d_1 T(v_1) + \dots + d_m T(v_m) $$
    Since $u_1, \dots, u_k$ are in $\text{Null}(T)$, we know that $T(u_1) = 0_W, \dots, T(u_k) = 0_W$.
    Therefore, the equation simplifies to:
    $$ w = d_1 T(v_1) + \dots + d_m T(v_m) $$
    This shows that any vector $w$ in $\text{Im}(T)$ can be expressed as a linear combination of the vectors in $S' = \{T(v_1), \dots, T(v_m)\}$.
    Thus, $S'$ spans $\text{Im}(T)$.

*   **What could go wrong:** Forgetting the linearity property of $T$, which is crucial for distributing $T$ across the sum and scalar multiples.

### Step 5: Proving that $S'$ is Linearly Independent

*   **Plain-English Statement:** We need to show that none of the output vectors $T(v_j)$ are redundant. If we form a combination of them that equals the zero vector, the *only* way that can happen is if all the coefficients in the combination were zero to begin with. This means they are truly independent.

*   **Small Concrete Example:**
    We have $T(v_1)=(1,0)$ and $T(v_2)=(0,1)$.
    Suppose $e_1 T(v_1) + e_2 T(v_2) = (0,0)$.
    $e_1 (1,0) + e_2 (0,1) = (0,0)$
    $(e_1, 0) + (0, e_2) = (0,0)$
    $(e_1, e_2) = (0,0)$.
    This implies $e_1=0$ and $e_2=0$. So, $\{(1,0), (0,1)\}$ is linearly independent.

*   **Formal/Mathematical Version:**
    To prove linear independence, assume a linear combination of the vectors in $S'$ equals the zero vector in $W$:
    $$ e_1 T(v_1) + e_2 T(v_2) + \dots + e_m T(v_m) = 0_W $$
    for some scalars $e_1, \dots, e_m$.
    By the linearity of $T$, we can rewrite this as:
    $$ T(e_1 v_1 + e_2 v_2 + \dots + e_m v_m) = 0_W $$
    This equation tells us that the vector $(e_1 v_1 + e_2 v_2 + \dots + e_m v_m)$ is in the null space of $T$.
    Since $\{u_1, \dots, u_k\}$ is a basis for $\text{Null}(T)$, we can express any vector in $\text{Null}(T)$ as a linear combination of $u_i$'s.
    So, there exist scalars $f_1, \dots, f_k$ such that:
    $$ e_1 v_1 + \dots + e_m v_m = f_1 u_1 + \dots + f_k u_k $$
    Rearranging the terms, we get:
    $$ f_1 u_1 + \dots + f_k u_k - e_1 v_1 - \dots - e_m v_m = 0_V $$
    Remember that the set $\{u_1, \dots, u_k, v_1, \dots, v_m\}$ is a basis for $V$. By definition, a basis is a linearly independent set.
    Therefore, all the coefficients in the above linear combination must be zero:
    $$ f_1 = 0, \dots, f_k = 0 \quad \text{and} \quad -e_1 = 0, \dots, -e_m = 0 $$
    This implies $e_1 = 0, \dots, e_m = 0$.
    Since the only way for the linear combination of $T(v_j)$ to be the zero vector is if all coefficients are zero, the set $S' = \{T(v_1), \dots, T(v_m)\}$ is linearly independent.

*   **What could go wrong:** The critical step is recognizing that $e_1 v_1 + \dots + e_m v_m$ must be in the null space. Then, using the linear independence of the *full* basis for $V$ to force all coefficients to zero.

### Step 6: Concluding the Proof

*   **Plain-English Statement:** We've shown that the $m$ vectors $T(v_1), \dots, T(v_m)$ form a basis for the image space. This means the dimension of the image space is $m$. We already knew the dimension of the null space was $k$ and the dimension of the total input space was $k+m$. Putting it all together, we get the theorem!

*   **Small Concrete Example:**
    We found that $\{(1,0), (0,1)\}$ is a basis for $\text{Im}(T)$. This set has $m=2$ vectors. So, $\dim(\text{Im}(T)) = 2$.
    We also found $\dim(\text{Null}(T)) = k=1$.
    And $\dim(V) = k+m = 1+2=3$.
    The Rank-Nullity Theorem states $\dim(V) = \dim(\text{Null}(T)) + \dim(\text{Im}(T))$.
    $3 = 1 + 2$. This holds true!

*   **Formal/Mathematical Version:**
    From Step 4, we showed that $S'$ spans $\text{Im}(T)$.
    From Step 5, we showed that $S'$ is linearly independent.
    Therefore, $S' = \{T(v_1), \dots, T(v_m)\}$ is a basis for $\text{Im}(T)$.
    The number of vectors in this basis is $m$.
    So, $\dim(\text{Im}(T)) = m$.
    Recall from Step 1 that $\dim(\text{Null}(T)) = k$.
    Recall from Step 2 that $\dim(V) = k+m$.
    Substituting $k = \dim(\text{Null}(T))$ and $m = \dim(\text{Im}(T))$ into the equation for $\dim(V)$:
    $$ \dim(V) = \dim(\text{Null}(T)) + \dim(\text{Im}(T)) $$
    This completes the proof of the Rank-Nullity Theorem.

*   **What could go wrong:** Making a logical leap or assuming a step that hasn't been formally proven. Each piece needs to connect rigorously.

## 5. Worked examples — multiple, with every step shown

We will use the matrix representation of linear transformations for these examples, where $T(x) = Ax$.
For an $m \times n$ matrix $A$:
*   $\text{Null}(A)$ is the set of solutions to $Ax=0$, a subspace of $\mathbb{R}^n$. $\text{nullity}(A) = \dim(\text{Null}(A))$.
*   $\text{Im}(A)$ is the column space of $A$, a subspace of $\mathbb{R}^m$. $\text{rank}(A) = \dim(\text{Im}(A))$.
*   The domain $V$ is $\mathbb{R}^n$, so $\dim(V) = n$.
The Rank-Nullity Theorem for matrices is $n = \text{nullity}(A) + \text{rank}(A)$.

### Example 1: Easy - Projection onto a line

**Problem:** Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be the linear transformation defined by $T(x,y) = (x,0)$. Verify the Rank-Nullity Theorem.

**What's given:** A linear transformation $T(x,y) = (x,0)$.
**What we want:** Verify $\dim(\mathbb{R}^2) = \text{nullity}(T) + \text{rank}(T)$.

**Step 1: Determine the matrix $A$ for $T$.**
*   The standard basis vectors for $\mathbb{R}^2$ are $e_1 = (1,0)$ and $e_2 = (0,1)$.
*   Apply $T$ to these vectors:
    $T(1,0) = (1,0)$
    $T(0,1) = (0,0)$
*   The columns of the matrix $A$ are $T(e_1)$ and $T(e_2)$.
$$ A = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} $$
*   **Explanation:** The matrix $A$ represents the transformation. Its columns are the images of the standard basis vectors.

**Step 2: Find the null space of $T$ (or $A$).**
*   The null space consists of all vectors $(x,y)$ such that $T(x,y) = (0,0)$.
*   From $A \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$:
    $$ \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
*   This gives the equations:
    $1x + 0y = 0 \implies x = 0$
    $0x + 0y = 0 \implies 0 = 0$ (This equation is always true and provides no constraint on $y$).
*   So, any vector in the null space must have $x=0$, but $y$ can be any real number.
*   The vectors in the null space are of the form $(0,y) = y(0,1)$.
*   **Explanation:** We solve the homogeneous system $Ax=0$ to find all input vectors that map to the zero vector.

**Step 3: Find a basis for the null space and determine its dimension (nullity).**
*   A basis for the null space is $\{(0,1)\}$.
*   $\text{nullity}(T) = \dim(\text{Null}(T)) = 1$.
*   **Explanation:** The basis for the null space is the minimal set of linearly independent vectors that span the null space. Since there is one free variable ($y$), the nullity is 1.

**Step 4: Find the image space of $T$ (or $A$).**
*   The image space consists of all possible output vectors $T(x,y)$.
*   $T(x,y) = (x,0)$.
*   This means any output vector must have its second component equal to 0.
*   The image space is the set of vectors of the form $(x,0) = x(1,0)$.
*   **Explanation:** The image space is the set of all possible outputs. For a matrix, it's the column space, spanned by the columns of the matrix.

**Step 5: Find a basis for the image space and determine its dimension (rank).**
*   The columns of $A$ are $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
*   The image space is spanned by these columns. However, the second column is the zero vector, which doesn't contribute to the span.
*   A basis for the image space is $\{(1,0)\}$.
*   $\text{rank}(T) = \dim(\text{Im}(T)) = 1$.
*   **Explanation:** We identify the linearly independent columns of $A$ that form a basis for the column space (image space).

**Step 6: Verify the Rank-Nullity Theorem.**
*   The domain is $\mathbb{R}^2$, so $\dim(V) = 2$.
*   The theorem states $\dim(V) = \text{nullity}(T) + \text{rank}(T)$.
*   Substituting our values: $2 = 1 + 1$.
*   $2 = 2$.
*   **Explanation:** We plug the calculated nullity and rank into the theorem and check if the equality holds.

$\boxed{\text{The Rank-Nullity Theorem is verified: } 2 = 1 + 1}$

**Reflection:** This example was straightforward because the null space and image space were simple lines. It clearly showed how one dimension of input was "lost" (the $y$-component) and one dimension was "preserved" (the $x$-component) in the output.

### Example 2: Medium - Transformation from $\mathbb{R}^3$ to $\mathbb{R}^2$

**Problem:** Let $T: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by the matrix $A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \end{pmatrix}$. Verify the Rank-Nullity Theorem.

**What's given:** A linear transformation defined by $A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \end{pmatrix}$.
**What we want:** Verify $\dim(\mathbb{R}^3) = \text{nullity}(A) + \text{rank}(A)$.

**Step 1: Determine the dimension of the domain.**
*   The matrix $A$ is $2 \times 3$, so it maps vectors from $\mathbb{R}^3$ to $\mathbb{R}^2$.
*   The domain $V = \mathbb{R}^3$, so $\dim(V) = 3$.
*   **Explanation:** The number of columns in the matrix determines the dimension of the domain.

**Step 2: Find the null space of $A$.**
*   We need to solve $A x = 0$, where $x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}$.
    $$ \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$
*   The augmented matrix is already in row echelon form:
    $$ \begin{pmatrix} 1 & 2 & 3 & | & 0 \\ 0 & 1 & 1 & | & 0 \end{pmatrix} $$
*   From the second row: $x_2 + x_3 = 0 \implies x_2 = -x_3$.
*   From the first row: $x_1 + 2x_2 + 3x_3 = 0$.
    Substitute $x_2 = -x_3$:
    $x_1 + 2(-x_3) + 3x_3 = 0$
    $x_1 - 2x_3 + 3x_3 = 0$
    $x_1 + x_3 = 0 \implies x_1 = -x_3$.
*   So, the solution vectors are of the form $\begin{pmatrix} -x_3 \\ -x_3 \\ x_3 \end{pmatrix}$.
*   **Explanation:** We use Gaussian elimination to solve $Ax=0$. The variables corresponding to columns with leading 1s are dependent variables, and the others are free variables.

**Step 3: Find a basis for the null space and determine its dimension (nullity).**
*   Let $x_3 = t$ (a free variable). Then $x_1 = -t$ and $x_2 = -t$.
*   The null space vectors are $t \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix}$.
*   A basis for $\text{Null}(A)$ is $\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix} \right\}$.
*   $\text{nullity}(A) = 1$.
*   **Explanation:** Since there is one free variable, there is one vector in the basis for the null space, and thus the nullity is 1.

**Step 4: Find the image space of $A$.**
*   The image space is the column space of $A$, spanned by its columns:
    $c_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $c_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$, $c_3 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.
*   **Explanation:** The image space is spanned by the columns of the matrix.

**Step 5: Find a basis for the image space and determine its dimension (rank).**
*   We need to find a linearly independent subset of the columns that spans the image space.
*   The first two columns, $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 2 \\ 1 \end{pmatrix}$, are clearly linearly independent (one is not a scalar multiple of the other).
*   Can these two columns span $\mathbb{R}^2$? Yes, because they are two linearly independent vectors in a 2-dimensional space.
*   Thus, a basis for $\text{Im}(A)$ is $\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 2 \\ 1 \end{pmatrix} \right\}$.
*   $\text{rank}(A) = 2$.
*   **Alternative method for rank:** The rank of a matrix is the number of pivot columns in its row echelon form.
    The row echelon form of $A$ is $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \end{pmatrix}$.
    The pivot columns are the first and second columns. So, $\text{rank}(A) = 2$.
*   **Explanation:** The rank is the dimension of the column space. We found two linearly independent column vectors that span the image space.

**Step 6: Verify the Rank-Nullity Theorem.**
*   $\dim(V) = 3$.
*   $\text{nullity}(A) = 1$.
*   $\text{rank}(A) = 2$.
*   The theorem states $\dim(V) = \text{nullity}(A) + \text{rank}(A)$.
*   Substituting our values: $3 = 1 + 2$.
*   $3 = 3$.
*   **Explanation:** We substitute the calculated values and confirm the theorem holds.

$\boxed{\text{The Rank-Nullity Theorem is verified: } 3 = 1 + 2}$

**Reflection:** This example showed how to calculate nullity and rank for a non-square matrix. The nullity corresponds to the number of free variables, and the rank corresponds to the number of pivot variables (or pivot columns).

### Example 3: Harder - Differentiation operator on Polynomials

**Problem:** Let $T: P_2 \to P_1$ be the differentiation operator, where $P_n$ is the vector space of polynomials of degree at most $n$. So $T(p(x)) = p'(x)$. Verify the Rank-Nullity Theorem.

**What's given:** Linear transformation $T: P_2 \to P_1$ defined by $T(p(x)) = p'(x)$.
**What we want:** Verify $\dim(P_2) = \text{nullity}(T) + \text{rank}(T)$.

**Step 1: Determine the dimension of the domain $P_2$.**
*   A general polynomial in $P_2$ is $p(x) = ax^2 + bx + c$.
*   A basis for $P_2$ is $\{1, x, x^2\}$.
*   $\dim(P_2) = 3$.
*   **Explanation:** The dimension of $P_n$ is $n+1$, as it includes constant terms up to $x^n$.

**Step 2: Find the null space of $T$.**
*   The null space consists of all polynomials $p(x) \in P_2$ such that $T(p(x)) = 0_{P_1}$ (the zero polynomial).
*   $T(p(x)) = p'(x) = 0$.
*   If $p'(x) = 0$, then $p(x)$ must be a constant polynomial.
*   So, $p(x) = c$ for some real number $c$.
*   These constant polynomials are in $P_2$ (e.g., $c = 0x^2 + 0x + c$).
*   **Explanation:** We find all polynomials in the domain $P_2$ whose derivative is the zero polynomial.

**Step 3: Find a basis for the null space and determine its dimension (nullity).**
*   The null space is the set of all constant polynomials $\{c \mid c \in \mathbb{R}\}$.
*   A basis for this space is $\{1\}$.
*   $\text{nullity}(T) = \dim(\text{Null}(T)) = 1$.
*   **Explanation:** The constant polynomial $p(x)=1$ is a basis for the space of constant polynomials.

**Step 4: Find the image space of $T$.**
*   The image space consists of all possible derivatives of polynomials in $P_2$.
*   Let $p(x) = ax^2 + bx + c$.
*   $T(p(x)) = p'(x) = 2ax + b$.
*   The outputs are polynomials of degree at most 1. This is exactly the space $P_1$.
*   **Explanation:** We determine the form of the output polynomials by applying the transformation to a general polynomial in $P_2$.

**Step 5: Find a basis for the image space and determine its dimension (rank).**
*   The image space is $P_1$.
*   A basis for $P_1$ is $\{1, x\}$. (Any polynomial $2ax+b$ can be written as $b \cdot 1 + 2a \cdot x$).
*   $\text{rank}(T) = \dim(\text{Im}(T)) = 2$.
*   **Explanation:** We identify a basis for the set of all possible output polynomials.

**Step 6: Verify the Rank-Nullity Theorem.**
*   $\dim(P_2) = 3$.
*   $\text{nullity}(T) = 1$.
*   $\text{rank}(T) = 2$.
*   The theorem states $\dim(P_2) = \text{nullity}(T) + \text{rank}(T)$.
*   Substituting our values: $3 = 1 + 2$.
*   $3 = 3$.
*   **Explanation:** We substitute the calculated values and confirm the theorem holds.

$\boxed{\text{The Rank-Nullity Theorem is verified: } 3 = 1 + 2}$

**Reflection:** This example demonstrates the theorem for abstract vector spaces (polynomials) rather than just $\mathbb{R}^n$. It highlights that the concepts of nullity and rank apply broadly to any linear transformation between finite-dimensional vector spaces.

### Example 4: Hardest - Transformation from $\mathbb{R}^4$ to $\mathbb{R}^3$

**Problem:** Let $T: \mathbb{R}^4 \to \mathbb{R}^3$ be defined by the matrix $A = \begin{pmatrix} 1 & 1 & 2 & 1 \\ 2 & 1 & 3 & 1 \\ 3 & 1 & 4 & 1 \end{pmatrix}$. Verify the Rank-Nullity Theorem.

**What's given:** A linear transformation defined by $A = \begin{pmatrix} 1 & 1 & 2 & 1 \\ 2 & 1 & 3 & 1 \\ 3 & 1 & 4 & 1 \end{pmatrix}$.
**What we want:** Verify $\dim(\mathbb{R}^4) = \text{nullity}(A) + \text{rank}(A)$.

**Step 1: Determine the dimension of the domain.**
*   The matrix $A$ is $3 \times 4$, so it maps vectors from $\mathbb{R}^4$ to $\mathbb{R}^3$.
*   The domain $V = \mathbb{R}^4$, so $\dim(V) = 4$.
*   **Explanation:** The number of columns in the matrix determines the dimension of the domain.

**Step 2: Find the null space of $A$.**
*   We need to solve $A x = 0$, where $x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix}$.
*   Form the augmented matrix and perform Gaussian elimination:
    $$ \begin{pmatrix} 1 & 1 & 2 & 1 & | & 0 \\ 2 & 1 & 3 & 1 & | & 0 \\ 3 & 1 & 4 & 1 & | & 0 \end{pmatrix} $$
*   $R_2 \to R_2 - 2R_1$:
    $$ \begin{pmatrix} 1 & 1 & 2 & 1 & | & 0 \\ 0 & -1 & -1 & -1 & | & 0 \\ 3 & 1 & 4 & 1 & | & 0 \end{pmatrix} $$
*   $R_3 \to R_3 - 3R_1$:
    $$ \begin{pmatrix} 1 & 1 & 2 & 1 & | & 0 \\ 0 & -1 & -1 & -1 & | & 0 \\ 0 & -2 & -2 & -2 & | & 0 \end{pmatrix} $$
*   $R_2 \to -R_2$:
    $$ \begin{pmatrix} 1 & 1 & 2 & 1 & | & 0 \\ 0 & 1 & 1 & 1 & | & 0 \\ 0 & -2 & -2 & -2 & | & 0 \end{pmatrix} $$
*   $R_3 \to R_3 + 2R_2$:
    $$ \begin{pmatrix} 1 & 1 & 2 & 1 & | & 0 \\ 0 & 1 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & 0 & | & 0 \end{pmatrix} $$
*   This is the row echelon form. Now, use back-substitution:
    From the second row: $x_2 + x_3 + x_4 = 0 \implies x_2 = -x_3 - x_4$.
    From the first row: $x_1 + x_2 + 2x_3 + x_4 = 0$.
    Substitute $x_2$:
    $x_1 + (-x_3 - x_4) + 2x_3 + x_4 = 0$
    $x_1 + x_3 = 0 \implies x_1 = -x_3$.
*   The free variables are $x_3$ and $x_4$. Let $x_3 = s$ and $x_4 = t$.
    Then $x_1 = -s$ and $x_2 = -s - t$.
*   The solution vectors are of the form $\begin{pmatrix} -s \\ -s-t \\ s \\ t \end{pmatrix}$.
*   **Explanation:** We perform row operations to bring the augmented matrix to row echelon form, then identify pivot and free variables to express the general solution.

**Step 3: Find a basis for the null space and determine its dimension (nullity).**
*   Separate the solution vector based on free variables $s$ and $t$:
    $$ \begin{pmatrix} -s \\ -s-t \\ s \\ t \end{pmatrix} = s \begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} 0 \\ -1 \\ 0 \\ 1 \end{pmatrix} $$
*   A basis for $\text{Null}(A)$ is $\left\{ \begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ -1 \\ 0 \\ 1 \end{pmatrix} \right\}$.
*   $\text{nullity}(A) = 2$.
*   **Explanation:** Since there are two free variables ($s$ and $t$), the nullity is 2, and the basis consists of two vectors.

**Step 4: Find the image space of $A$.**
*   The image space is the column space of $A$. The pivot columns in the original matrix $A$ correspond to a basis for the column space.
*   From the row echelon form $\begin{pmatrix} 1 & 1 & 2 & 1 & | & 0 \\ 0 & 1 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & 0 & | & 0 \end{pmatrix}$, the pivot columns are the 1st and 2nd columns.
*   Therefore, a basis for $\text{Im}(A)$ consists of the 1st and 2nd columns of the *original* matrix $A$:
    $\left\{ \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}, \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} \right\}$.
*   **Explanation:** The columns of the original matrix corresponding to the pivot columns in the row echelon form form a basis for the image space (column space).

**Step 5: Determine the dimension of the image space (rank).**
*   The basis for $\text{Im}(A)$ has 2 vectors.
*   $\text{rank}(A) = 2$.
*   **Explanation:** The number of vectors in the basis for the image space is its dimension. This also equals the number of pivot columns.

**Step 6: Verify the Rank-Nullity Theorem.**
*   $\dim(V) = 4$.
*   $\text{nullity}(A) = 2$.
*   $\text{rank}(A) = 2$.
*   The theorem states $\dim(V) = \text{nullity}(A) + \text{rank}(A)$.
*   Substituting our values: $4 = 2 + 2$.
*   $4 = 4$.
*   **Explanation:** We substitute the calculated values and confirm the theorem holds.

$\boxed{\text{The Rank-Nullity Theorem is verified: } 4 = 2 + 2}$

**Reflection:** This example involved more complex Gaussian elimination and demonstrated how two free variables lead to a nullity of 2, and two pivot columns lead to a rank of 2. It reinforces the connection between the structure of the row echelon form and the dimensions of the fundamental subspaces.

## 6. Common mistakes and traps

Students often stumble in several areas when working with the Rank-Nullity Theorem and its proof. Be aware of these common pitfalls:

1.  **Confusing Domain/Codomain with Null Space/Image Space:** The null space is a *subspace of the domain* $V$, and the image space is a *subspace of the codomain* $W$. They are not the same as $V$ or $W$ themselves, unless the transformation is trivial or surjective/injective.
2.  **Incorrectly Identifying the Basis for Null Space:** A common error is not finding *all* free variables when solving $Ax=0$, or not expressing the null space vectors correctly as linear combinations of basis vectors (one for each free variable). Each free variable corresponds to one basis vector in the null space.
3.  **Incorrectly Identifying the Basis for Image Space:** For a matrix $A$, the image space is the column space. A basis for the image space consists of the *original* columns of $A$ that correspond to the pivot columns in the row echelon form of $A$. Students sometimes use the columns of the *row echelon form* itself, which is incorrect for the column space (though correct for the row space).
4.  **Forgetting Linearity:** The proof relies heavily on the linearity of $T$, specifically $T(u+v) = T(u)+T(v)$ and $T(cv) = cT(v)$. Without this property, the steps in proving span and linear independence of $S'$ would fail.
5.  **Assuming Null Space is Trivial:** Many students implicitly assume that only the zero vector maps to zero. This is not always true; if the transformation is not injective, the null space will contain non-zero vectors.
6.  **Mixing Up Matrix Dimensions:** For an $m \times n$ matrix $A$, the domain is $\mathbb{R}^n$ (so $\dim(V)=n$), and the codomain is $\mathbb{R}^m$. The rank is at most $m$, and the nullity is at most $n$. The theorem relates to $n$, the dimension of the *domain*, not $m$.

## 7. Textbook-precise explanation

**Theorem (Rank-Nullity Theorem):**
Let $V$ and $W$ be finite-dimensional vector spaces over a field $\mathbb{F}$, and let $T: V \to W$ be a linear transformation. Then the dimension of the domain $V$ is equal to the sum of the dimension of the null space of $T$ (nullity of $T$) and the dimension of the image space of $T$ (rank of $T$).
Formally:
$$ \dim(V) = \dim(\text{Null}(T)) + \dim(\text{Im}(T)) $$
where $\text{Null}(T) = \{v \in V \mid T(v) = 0_W\}$ is the null space (or kernel) of $T$, and $\text{Im}(T) = \{T(v) \mid v \in V\}$ is the image space (or range) of $T$.

**Proof:**
Let $\dim(V) = n$.
1.  **Basis for the Null Space:** Since $\text{Null}(T)$ is a subspace of $V$, it is finite-dimensional. Let $k = \dim(\text{Null}(T))$. Choose a basis for $\text{Null}(T)$, denoted by $B_N = \{u_1, u_2, \dots, u_k\}$.

2.  **Extension to a Basis for the Domain:** By the Basis Extension Theorem, we can extend $B_N$ to a basis for the entire vector space $V$. Let this extended basis be $B_V = \{u_1, \dots, u_k, v_1, \dots, v_m\}$.
    The number of vectors in $B_V$ is $k+m$. Since $B_V$ is a basis for $V$, we have $\dim(V) = k+m$.
    Our goal is to show that $m = \dim(\text{Im}(T))$.

3.  **Constructing a Candidate Basis for the Image Space:** Consider the set of vectors $B_I = \{T(v_1), T(v_2), \dots, T(v_m)\}$. We will prove that $B_I$ is a basis for $\text{Im}(T)$.

4.  **Proof of Span:**
    Let $w \in \text{Im}(T)$. By definition, there exists some $v \in V$ such that $T(v) = w$.
    Since $B_V = \{u_1, \dots, u_k, v_1, \dots, v_m\}$ is a basis for $V$, $v$ can be written as a linear combination:
    $$ v = c_1 u_1 + \dots + c_k u_k + d_1 v_1 + \dots + d_m v_m $$
    for some scalars $c_i, d_j \in \mathbb{F}$.
    Applying $T$ to $v$:
    $$ w = T(v) = T(c_1 u_1 + \dots + c_k u_k + d_1 v_1 + \dots + d_m v_m) $$
    Due to the linearity of $T$:
    $$ w = c_1 T(u_1) + \dots + c_k T(u_k) + d_1 T(v_1) + \dots + d_m T(v_m) $$
    Since $u_i \in \text{Null}(T)$ for all $i=1, \dots, k$, we have $T(u_i) = 0_W$.
    Therefore, the expression for $w$ simplifies to:
    $$ w = d_1 T(v_1) + \dots + d_m T(v_m) $$
    This shows that any vector $w \in \text{Im}(T)$ can be expressed as a linear combination of the vectors in $B_I$. Thus, $B_I$ spans $\text{Im}(T)$.

5.  **Proof of Linear Independence:**
    Assume a linear combination of the vectors in $B_I$ equals the zero vector in $W$:
    $$ e_1 T(v_1) + e_2 T(v_2) + \dots + e_m T(v_m) = 0_W $$
    for some scalars $e_j \in \mathbb{F}$.
    By the linearity of $T$, we can rewrite this as:
    $$ T(e_1 v_1 + e_2 v_2 + \dots + e_m v_m) = 0_W $$
    This implies that the vector $(e_1 v_1 + e_2 v_2 + \dots + e_m v_m)$ is an element of $\text{Null}(T)$.
    Since $B_N = \{u_1, \dots, u_k\}$ is a basis for $\text{Null}(T)$, we can express this vector as a linear combination of the $u_i$'s:
    $$ e_1 v_1 + \dots + e_m v_m = f_1 u_1 + \dots + f_k u_k $$
    for some scalars $f_i \in \mathbb{F}$.
    Rearranging the terms, we get:
    $$ f_1 u_1 + \dots + f_k u_k - e_1 v_1 - \dots - e_m v_m = 0_V $$
    Since $B_V = \{u_1, \dots, u_k, v_1, \dots, v_m\}$ is a basis for $V$, it is a linearly independent set. Therefore, all the coefficients in the above linear combination must be zero:
    $$ f_1 = \dots = f_k = 0 \quad \text{and} \quad -e_1 = \dots = -e_m = 0 $$
    This implies $e_1 = \dots = e_m = 0$.
    Since the only linear combination of vectors in $B_I$ that equals the zero vector is the trivial one (all coefficients are zero), $B_I$ is linearly independent.

6.  **Conclusion:**
    Since $B_I = \{T(v_1), \dots, T(v_m)\}$ spans $\text{Im}(T)$ and is linearly independent, it is a basis for $\text{Im}(T)$.
    Therefore, $\dim(\text{Im}(T)) = m$.
    Substituting this back into the equation from Step 2, we have:
    $$ \dim(V) = k+m = \dim(\text{Null}(T)) + \dim(\text{Im}(T)) $$
    This completes the proof.

**References:**
*   Friedberg, S. H., Insel, A. J., & Spence, L. E. (2019). *Linear Algebra* (5th ed., Chapter 2, Section 2.1, Theorem 2.3). Pearson.
*   Axler, S. (2015). *Linear Algebra Done Right* (3rd ed., Chapter 3, Theorem 3.4). Springer.
*   Strang, G. (2016). *Introduction to Linear Algebra* (5th ed., Chapter 3, Section 3.4, Theorem 3A). Wellesley-Cambridge Press.

## 8. ASCII diagrams

Here's a conceptual ASCII diagram to visualize the Rank-Nullity Theorem.
Imagine the input space $V$ as a large box. Inside it, there's a smaller "null space" region. The transformation $T$ takes everything from $V$ and maps it to the output space $W$. The "image space" is the part of $W$ that actually gets "hit" by $T$.

```text
        +-------------------------------------------------+
        |                                                 |
        |      Input Vector Space V (dim V = n)           |
        |                                                 |
        |     +---------------------------+               |
        |     |                           |               |
        |     |  Null(T) (dim = nullity)  |               |  T: V -> W
        |     |       (Vectors that       |               |
        |     |    map to 0 in W)         |               |
        |     |                           |               |
        |     +---------------------------+               |
        |                                                 |
        +-------------------------------------------------+
                                |
                                | T (Linear Transformation)
                                V
        +-------------------------------------------------+
        |                                                 |
        |      Output Vector Space W                      |
        |                                                 |
        |     +---------------------------+               |
        |     |                           |               |
        |     |  Im(T) (dim = rank)       |               |
        |     |       (All possible       |               |
        |     |    outputs of T)          |               |
        |     |                           |               |
        |     +---------------------------+               |
        |                                                 |
        +-------------------------------------------------+

The Rank-Nullity Theorem states:
dim(V) = dim(Null(T)) + dim(Im(T))
       = nullity(T)    + rank(T)

Interpretation:
- dim(V): Total "input capacity" or number of independent input directions.
- nullity(T): Number of input directions that get "crushed" to zero (lost information).
- rank(T): Number of input directions that result in distinct, non-zero output directions (preserved information).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of a **pipeline** or a **funnel**.
    *   The wide opening is your **Input Space (V)**, representing all the "stuff" you can put in. Its size is `dim(V)`.
    *   As the stuff goes through the funnel, some of it gets **"lost"** or "disappears" (like water going down a drain, or air bubbles escaping). This "lost" part is the **Null Space**, and its size is `nullity(T)`.
    *   The remaining "useful" stuff that comes out the narrow end of the funnel is your **Output (Image Space, Im(T))**. Its size is `rank(T)`.
    The total amount of "stuff" you put in (`dim(V)`) must either be "lost" (`nullity(T)`) or "come out" (`rank(T)`). It's a conservation principle for dimensions!
    **"Input Dimensions = Lost Dimensions + Output Dimensions"**

2.  **Formulas/Facts to Overlearn:**
    *