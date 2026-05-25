## 1. What it is — in plain English

Imagine you have a machine that takes in a vector (like an arrow pointing in some direction) and spits out another vector. This machine is called a "transformation" because it changes one vector into another.

Now, imagine this machine has two very special rules. First, if you put two vectors into the machine separately and add their outputs, you get the exact same result as if you had added the two vectors first and then put their sum into the machine. Second, if you scale a vector (make it longer or shorter) before putting it into the machine, the output is the same as if you had put the original vector in and then scaled its output by the same amount.

If a vector-transforming machine follows these two rules, we call it a **linear transformation**. It's a "well-behaved" transformation that respects the fundamental operations of vector addition and scalar multiplication. It doesn't twist or bend the space in a complicated way; it just stretches, rotates, or reflects it uniformly.

The **kernel** of this machine is like a "black hole" for vectors: it's the collection of all input vectors that the machine transforms into the *zero vector* (the arrow that has no length and no direction). And the **image** of the machine is the collection of *all possible output vectors* it can produce. It's the entire "reach" of the machine.

## 2. Why it matters — real-world applications

Linear transformations are not just abstract mathematical concepts; they are the bedrock of many real-world technologies and scientific understanding. They provide a powerful framework for modeling and manipulating data, shapes, and systems.

1.  **Computer Graphics and Animation:** Every time you see a 3D object rotate, scale, or move on a screen (in a video game, CAD software, or animated movie), linear transformations are at play. A 3D model is a collection of points (vectors), and applying a rotation matrix (a type of linear transformation) to these points changes their orientation in space. For instance, Pixar uses complex sequences of linear transformations to animate characters and environments, making them move realistically.

2.  **Machine Learning and Artificial Intelligence:** At the core of many machine learning algorithms, especially deep neural networks, are layers that perform matrix multiplications. Matrix multiplication is a prime example of a linear transformation. When a neural network processes an image, for example, it transforms the pixel data (represented as a vector) through multiple linear and non-linear layers to extract features, classify objects, or generate new images. Dimensionality reduction techniques like Principal Component Analysis (PCA) rely heavily on linear transformations to project high-dimensional data into lower-dimensional spaces while preserving as much variance as possible.

3.  **Physics and Engineering (Aerospace, Quantum Mechanics):**
    *   **Aerospace:** In aerospace engineering, linear transformations are crucial for understanding aircraft dynamics. The equations of motion for an aircraft, particularly in linearized models for control system design, involve linear transformations that describe how control inputs (like rudder deflection) affect the aircraft's state (position, velocity, orientation). Rotational transformations are also key for converting between different coordinate frames (e.g., body frame to Earth frame).
    *   **Quantum Mechanics:** In quantum mechanics, the states of particles are represented by vectors in a complex vector space, and physical observables (like energy or momentum) are represented by linear operators (which are linear transformations). When a measurement is made, the system undergoes a linear transformation corresponding to that measurement. The famous Schrödinger equation itself is a linear differential equation, and its solutions form a vector space.

4.  **Image Processing:** Basic image manipulations like resizing, rotating, shearing, or mirroring an image are all achieved using linear transformations. An image can be thought of as a grid of pixels, each with a color value. When you rotate an image, you are applying a linear transformation to the coordinates of each pixel to determine its new position. Companies like Adobe use these principles extensively in software like Photoshop and Lightroom.

## 3. Prerequisites — what you must know first

Before diving deep into linear transformations, kernel, and image, ensure you have a solid grasp of the following foundational concepts. If any of these feel unfamiliar, pause and review them.

*   **Vectors:** An understanding of what a vector is (a quantity with both magnitude and direction), how to represent them (e.g., as ordered lists of numbers or arrows), and basic operations like vector addition and scalar multiplication.
*   **Vector Spaces:** The formal definition of a vector space, including the ten axioms it must satisfy. Familiarity with common examples like $\mathbb{R}^n$, polynomial spaces $P_n$, and spaces of matrices $M_{m \times n}$.
*   **Subspaces:** The definition of a subspace (a subset of a vector space that is itself a vector space under the same operations), and how to verify if a given subset is a subspace.
*   **Linear Combinations, Span, and Basis:** What a linear combination is, the concept of the span of a set of vectors, and how a basis forms a minimal spanning set of linearly independent vectors for a vector space.
*   **Matrices:** Basic matrix operations including matrix addition, scalar multiplication, and crucially, matrix-vector multiplication.
*   **Functions (or Mappings):** The general concept of a function, including its domain (input set), codomain (potential output set), and range (actual output set).
*   **Systems of Linear Equations:** How to solve systems of linear equations using techniques like Gaussian elimination or row reduction, as this is essential for finding kernels and images.

## 4. The core idea — step by step

Let's break down the concept of linear transformations, kernel, and image step by step, building intuition before formalizing the definitions.

### Step 1: Functions Between Vector Spaces

**Plain English:** At its most basic level, a linear transformation is just a special kind of function. Instead of taking numbers as input and giving numbers as output (like $f(x)=x^2$), it takes vectors as input and gives vectors as output. These vectors must belong to specific vector spaces.

**Small Concrete Example:** Consider a function $T$ that takes a 2D vector $(x,y)$ and outputs another 2D vector $(x+y, x-y)$.
So, if you put the vector $u = (1,2)$ into this function, you get $T(1,2) = (1+2, 1-2) = (3,-1)$.
If you put $v = (3,0)$ into this function, you get $T(3,0) = (3+0, 3-0) = (3,3)$.
This function $T$ maps vectors from $\mathbb{R}^2$ to vectors in $\mathbb{R}^2$.

**The Formal/Mathematical Version:**
A transformation (or map, or function) $T$ from a vector space $V$ to a vector space $W$ is denoted by
$$ T: V \to W $$
For every vector $v \in V$, $T(v)$ is a unique vector in $W$.
$V$ is called the **domain** of $T$, and $W$ is called the **codomain** of $T$.

**What could go wrong:** Not every function mapping vectors to vectors is a *linear* transformation. The "linear" part is a very specific condition we'll get to next. Forgetting that $V$ and $W$ must be vector spaces over the *same field* (e.g., both over real numbers or both over complex numbers) can also lead to issues in advanced contexts.

### Step 2: The Linearity Conditions

**Plain English:** A transformation $T: V \to W$ is "linear" if it respects the fundamental operations of vector spaces: addition and scalar multiplication. This means that if you perform these operations *before* applying the transformation, you get the same result as if you performed them *after* applying the transformation. It's like the transformation "commutes" with these operations.

**Small Concrete Example:** Let's use our function $T(x,y) = (x+y, x-y)$ from Step 1.
We need to check two conditions:
1.  **Additivity:** $T(u+v) = T(u) + T(v)$ for any vectors $u, v \in \mathbb{R}^2$.
    Let $u = (x_1, y_1)$ and $v = (x_2, y_2)$.
    $u+v = (x_1+x_2, y_1+y_2)$.
    $T(u+v) = T(x_1+x_2, y_1+y_2) = ((x_1+x_2)+(y_1+y_2), (x_1+x_2)-(y_1+y_2))$.
    $T(u) = (x_1+y_1, x_1-y_1)$.
    $T(v) = (x_2+y_2, x_2-y_2)$.
    $T(u)+T(v) = ((x_1+y_1)+(x_2+y_2), (x_1-y_1)+(x_2-y_2)) = ((x_1+x_2)+(y_1+y_2), (x_1+x_2)-(y_1+y_2))$.
    Since $T(u+v) = T(u)+T(v)$, the first condition holds.

2.  **Homogeneity (Scalar Multiplication):** $T(cu) = cT(u)$ for any scalar $c$ and vector $u \in \mathbb{R}^2$.
    Let $u = (x_1, y_1)$.
    $cu = (cx_1, cy_1)$.
    $T(cu) = T(cx_1, cy_1) = (cx_1+cy_1, cx_1-cy_1) = c(x_1+y_1, x_1-y_1)$.
    $cT(u) = c(x_1+y_1, x_1-y_1)$.
    Since $T(cu) = cT(u)$, the second condition holds.
    Because both conditions hold, $T(x,y) = (x+y, x-y)$ is a linear transformation.

**The Formal/Mathematical Version:**
A transformation $T: V \to W$ is a **linear transformation** if, for all vectors $u, v \in V$ and all scalars $c$ in the field $F$ (over which $V$ and $W$ are defined), the following two conditions hold:
1.  **Additivity:** $T(u+v) = T(u) + T(v)$
2.  **Homogeneity of Degree 1:** $T(cu) = cT(u)$

These two conditions can be combined into a single condition:
$$ T(c_1 u_1 + c_2 u_2) = c_1 T(u_1) + c_2 T(u_2) $$
for all $u_1, u_2 \in V$ and all scalars $c_1, c_2 \in F$. This combined form is often more efficient to check.
An important consequence of linearity is that $T(\mathbf{0}_V) = \mathbf{0}_W$. (Proof: $T(\mathbf{0}_V) = T(0 \cdot v) = 0 \cdot T(v) = \mathbf{0}_W$ for any $v \in V$.)

**What could go wrong:**
*   Forgetting to check *both* conditions. A transformation might satisfy one but not the other.
*   Assuming $T(\mathbf{0}_V) = \mathbf{0}_W$ is a sufficient condition for linearity. It's necessary, but not sufficient. For example, $T(x) = x^2$ maps $0 \to 0$, but it's not linear.
*   Treating a constant term as part of linearity. For example, $T(x) = x+1$ is not linear because $T(0) = 1 \ne 0$. Also, $T(u+v) = (u+v)+1 = u+v+1$, but $T(u)+T(v) = (u+1)+(v+1) = u+v+2$. These are not equal.

### Step 3: The Kernel (Null Space)

**Plain English:** The kernel of a linear transformation $T$ is the collection of all input vectors from the domain $V$ that get mapped to the zero vector in the codomain $W$. It's like finding all the vectors that the transformation "annihilates" or "nullifies."

**Small Concrete Example:** Consider the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $T(x,y) = (x+y, 0)$.
To find the kernel, we need to find all vectors $(x,y)$ such that $T(x,y) = (0,0)$.
This means $(x+y, 0) = (0,0)$.
From this, we get the equation $x+y=0$.
So, $y = -x$.
Any vector of the form $(x, -x)$ will be mapped to $(0,0)$. For example, $T(1,-1) = (1-1, 0) = (0,0)$. $T(5,-5) = (5-5, 0) = (0,0)$.
The kernel is the set of all vectors $(x,-x)$ for any real number $x$. This is a line through the origin in $\mathbb{R}^2$.

**The Formal/Mathematical Version:**
Let $T: V \to W$ be a linear transformation. The **kernel** of $T$, denoted $\text{ker}(T)$ or $N(T)$, is the set of all vectors $v \in V$ such that $T(v) = \mathbf{0}_W$.
$$ \text{ker}(T) = \{ v \in V \mid T(v) = \mathbf{0}_W \} $$
Here, $\mathbf{0}_W$ is the zero vector in the codomain $W$.

**What could go wrong:**
*   Forgetting that the kernel is a *set of vectors*, not just a single vector (unless it's only the zero vector).
*   Confusing the zero vector in the domain $V$ with the zero vector in the codomain $W$. While $T(\mathbf{0}_V) = \mathbf{0}_W$ is always true, the kernel can contain other non-zero vectors from $V$.
*   Incorrectly solving the system of equations $T(v) = \mathbf{0}_W$.

### Step 4: The Image (Range Space)

**Plain English:** The image of a linear transformation $T$ is the collection of all possible output vectors in the codomain $W$ that can be produced by applying $T$ to *some* vector in the domain $V$. It's the "reach" or "footprint" of the transformation in the codomain.

**Small Concrete Example:** Let's reuse $T: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $T(x,y) = (x+y, 0)$.
What are all possible output vectors $(a,b)$ that can be formed by $T(x,y)$?
We have $(a,b) = (x+y, 0)$.
This means $a = x+y$ and $b = 0$.
So, any output vector *must* have its second component equal to zero. The first component $a$ can be any real number, because we can always find $x,y$ (e.g., $x=a, y=0$) such that $x+y=a$.
Thus, the image is the set of all vectors of the form $(a,0)$ for any real number $a$. This is the x-axis in $\mathbb{R}^2$.

**The Formal/Mathematical Version:**
Let $T: V \to W$ be a linear transformation. The **image** of $T$, denoted $\text{Im}(T)$ or $R(T)$, is the set of all vectors $w \in W$ for which there exists at least one vector $v \in V$ such that $T(v) = w$.
$$ \text{Im}(T) = \{ w \in W \mid \exists v \in V \text{ such that } T(v) = w \} $$
The image is a subset of the codomain $W$.

**What could go wrong:**
*   Confusing the image with the codomain. The image is a *subset* of the codomain, and it might not be the entire codomain. For example, in our example $T(x,y)=(x+y,0)$, the codomain is $\mathbb{R}^2$, but the image is just the x-axis.
*   Incorrectly identifying the span of the image vectors. Remember that the image is spanned by the images of the basis vectors of the domain.

### Step 5: Kernel and Image as Subspaces

**Plain English:** The kernel and the image are not just arbitrary sets of vectors; they are special kinds of sets called *subspaces*. This means they themselves are vector spaces, inheriting the addition and scalar multiplication rules from their parent spaces. This is a powerful property because it means we can apply all the tools and theorems of vector spaces (like finding bases and dimensions) to the kernel and image.

**Small Concrete Example:**
For $T(x,y) = (x+y, 0)$:
*   **Kernel:** $\text{ker}(T) = \{ (x, -x) \mid x \in \mathbb{R} \}$.
    To show this is a subspace of $\mathbb{R}^2$:
    1.  Contains zero vector: $(0, -0) = (0,0) \in \text{ker}(T)$. Yes.
    2.  Closed under addition: Let $u=(x_1, -x_1)$ and $v=(x_2, -x_2)$ be in $\text{ker}(T)$.
        $u+v = (x_1+x_2, -x_1-x_2) = (x_1+x_2, -(x_1+x_2))$. This is of the form $(k, -k)$, so it's in $\text{ker}(T)$. Yes.
    3.  Closed under scalar multiplication: Let $u=(x_1, -x_1)$ be in $\text{ker}(T)$ and $c$ be a scalar.
        $cu = (cx_1, -cx_1) = (cx_1, -(cx_1))$. This is of the form $(k, -k)$, so it's in $\text{ker}(T)$. Yes.
    Since all conditions are met, $\text{ker}(T)$ is a subspace of $\mathbb{R}^2$.

*   **Image:** $\text{Im}(T) = \{ (a, 0) \mid a \in \mathbb{R} \}$.
    To show this is a subspace of $\mathbb{R}^2$:
    1.  Contains zero vector: $(0,0) \in \text{Im}(T)$. Yes.
    2.  Closed under addition: Let $w_1=(a_1, 0)$ and $w_2=(a_2, 0)$ be in $\text{Im}(T)$.
        $w_1+w_2 = (a_1+a_2, 0)$. This is of the form $(k, 0)$, so it's in $\text{Im}(T)$. Yes.
    3.  Closed under scalar multiplication: Let $w=(a_1, 0)$ be in $\text{Im}(T)$ and $c$ be a scalar.
        $cw = (ca_1, 0)$. This is of the form $(k, 0)$, so it's in $\text{Im}(T)$. Yes.
    Since all conditions are met, $\text{Im}(T)$ is a subspace of $\mathbb{R}^2$.

**The Formal/Mathematical Version:**
**Theorem 1:** Let $T: V \to W$ be a linear transformation. Then $\text{ker}(T)$ is a subspace of $V$.
*Proof Sketch:*
1.  $\mathbf{0}_V \in \text{ker}(T)$ because $T(\mathbf{0}_V) = \mathbf{0}_W$. So, $\text{ker}(T)$ is non-empty.
2.  Let $u, v \in \text{ker}(T)$. Then $T(u) = \mathbf{0}_W$ and $T(v) = \mathbf{0}_W$.
    By linearity, $T(u+v) = T(u) + T(v) = \mathbf{0}_W + \mathbf{0}_W = \mathbf{0}_W$. So, $u+v \in \text{ker}(T)$.
3.  Let $u \in \text{ker}(T)$ and $c$ be a scalar. Then $T(u) = \mathbf{0}_W$.
    By linearity, $T(cu) = cT(u) = c\mathbf{0}_W = \mathbf{0}_W$. So, $cu \in \text{ker}(T)$.
Thus, $\text{ker}(T)$ is a subspace of $V$.

**Theorem 2:** Let $T: V \to W$ be a linear transformation. Then $\text{Im}(T)$ is a subspace of $W$.
*Proof Sketch:*
1.  $\mathbf{0}_W \in \text{Im}(T)$ because $T(\mathbf{0}_V) = \mathbf{0}_W$. So, $\text{Im}(T)$ is non-empty.
2.  Let $w_1, w_2 \in \text{Im}(T)$. Then there exist $v_1, v_2 \in V$ such that $T(v_1)=w_1$ and $T(v_2)=w_2$.
    By linearity, $T(v_1+v_2) = T(v_1) + T(v_2) = w_1 + w_2$. Since $v_1+v_2 \in V$, $w_1+w_2$ is the image of a vector in $V$, so $w_1+w_2 \in \text{Im}(T)$.
3.  Let $w \in \text{Im}(T)$ and $c$ be a scalar. Then there exists $v \in V$ such that $T(v)=w$.
    By linearity, $T(cv) = cT(v) = cw$. Since $cv \in V$, $cw$ is the image of a vector in $V$, so $cw \in \text{Im}(T)$.
Thus, $\text{Im}(T)$ is a subspace of $W$.

**What could go wrong:** Forgetting to prove the subspace properties, or incorrectly applying them. For example, if $T$ wasn't linear, its kernel and image might not be subspaces.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Geometric Transformation

**Problem:** Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be defined by $T(x,y) = (2x, -y)$.
a) Verify that $T$ is a linear transformation.
b) Find the kernel of $T$.
c) Find the image of $T$.

**Given:** The transformation $T(x,y) = (2x, -y)$.
**Want:** Verification of linearity, kernel, and image.

---

**a) Verify that $T$ is a linear transformation.**

Let $u = (x_1, y_1)$ and $v = (x_2, y_2)$ be arbitrary vectors in $\mathbb{R}^2$, and let $c$ be an arbitrary scalar in $\mathbb{R}$.

**Step 1: Check Additivity ($T(u+v) = T(u) + T(v)$)**
*   **Calculate $u+v$:**
    $$ u+v = (x_1, y_1) + (x_2, y_2) = (x_1+x_2, y_1+y_2) $$
    *This is the standard vector addition.*
*   **Apply $T$ to $u+v$:**
    $$ T(u+v) = T(x_1+x_2, y_1+y_2) = (2(x_1+x_2), -(y_1+y_2)) $$
    *We substitute the components of $u+v$ into the definition of $T$.*
*   **Calculate $T(u)$ and $T(v)$ separately:**
    $$ T(u) = T(x_1, y_1) = (2x_1, -y_1) $$
    $$ T(v) = T(x_2, y_2) = (2x_2, -y_2) $$
    *We apply $T$ to each vector individually.*
*   **Add $T(u)$ and $T(v)$:**
    $$ T(u) + T(v) = (2x_1, -y_1) + (2x_2, -y_2) = (2x_1+2x_2, -y_1-y_2) $$
    *This is the standard vector addition of the transformed vectors.*
*   **Compare the results:**
    $$ (2(x_1+x_2), -(y_1+y_2)) = (2x_1+2x_2, -y_1-y_2) $$
    The expressions are equal. So, the additivity condition holds.

**Step 2: Check Homogeneity ($T(cu) = cT(u)$)**
*   **Calculate $cu$:**
    $$ cu = c(x_1, y_1) = (cx_1, cy_1) $$
    *This is the standard scalar multiplication.*
*   **Apply $T$ to $cu$:**
    $$ T(cu) = T(cx_1, cy_1) = (2(cx_1), -(cy_1)) = (2cx_1, -cy_1) $$
    *We substitute the components of $cu$ into the definition of $T$.*
*   **Calculate $cT(u)$:**
    $$ cT(u) = c(2x_1, -y_1) = (c \cdot 2x_1, c \cdot (-y_1)) = (2cx_1, -cy_1) $$
    *We apply $T$ to $u$ first, then multiply the resulting vector by the scalar $c$.*
*   **Compare the results:**
    $$ (2cx_1, -cy_1) = (2cx_1, -cy_1) $$
    The expressions are equal. So, the homogeneity condition holds.

Since both conditions are satisfied, $T$ is a linear transformation.

---

**b) Find the kernel of $T$.**

The kernel of $T$ is the set of all vectors $(x,y) \in \mathbb{R}^2$ such that $T(x,y) = (0,0)$.
*   **Set $T(x,y)$ equal to the zero vector:**
    $$ (2x, -y) = (0,0) $$
    *We are looking for inputs that map to the zero vector in the codomain.*
*   **Form a system of equations:**
    $$ 2x = 0 $$
    $$ -y = 0 $$
    *This translates the vector equation into scalar equations for each component.*
*   **Solve the system:**
    From $2x=0$, we get $x=0$.
    From $-y=0$, we get $y=0$.
    *The system is very simple in this case.*
*   **Describe the kernel:**
    The only vector that satisfies these conditions is $(0,0)$.
    $$ \text{ker}(T) = \{ (0,0) \} $$
    *The kernel is the set containing only the zero vector. This means $T$ is injective (one-to-one).*

---

**c) Find the image of $T$.**

The image of $T$ is the set of all possible output vectors $(a,b) \in \mathbb{R}^2$ such that $(a,b) = T(x,y)$ for some $(x,y) \in \mathbb{R}^2$.
*   **Set an arbitrary output vector $(a,b)$ equal to $T(x,y)$:**
    $$ (a,b) = (2x, -y) $$
    *We want to see what constraints this places on $a$ and $b$.*
*   **Form a system of equations:**
    $$ a = 2x $$
    $$ b = -y $$
    *This expresses the components of the output vector in terms of the input components.*
*   **Solve for $x$ and $y$ in terms of $a$ and $b$ (if possible):**
    From $a=2x$, we get $x = a/2$.
    From $b=-y$, we get $y = -b$.
    *Since we can always find real values for $x$ and $y$ for any given $a$ and $b$, this means there are no restrictions on $a$ and $b$.*
*   **Describe the image:**
    Since any $(a,b) \in \mathbb{R}^2$ can be an output of $T$ (by choosing $x=a/2$ and $y=-b$), the image of $T$ is the entire codomain $\mathbb{R}^2$.
    $$ \text{Im}(T) = \mathbb{R}^2 $$
    *The image is the entire codomain. This means $T$ is surjective (onto).*

---

**Reflection:** This example was relatively straightforward. The transformation involves scaling and reflection, which are fundamental linear operations. The kernel being just the zero vector indicates that the transformation doesn't "collapse" any non-zero vectors, and the image being the entire codomain means it "covers" the whole space.

### Example 2: Transformation from $\mathbb{R}^3$ to $\mathbb{R}^2$

**Problem:** Let $T: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by $T(x,y,z) = (x+y, y-z)$.
a) Verify that $T$ is a linear transformation.
b) Find a basis for the kernel of $T$.
c) Find a basis for the image of $T$.

**Given:** The transformation $T(x,y,z) = (x+y, y-z)$.
**Want:** Verification of linearity, basis for kernel, and basis for image.

---

**a) Verify that $T$ is a linear transformation.**

Let $u = (x_1, y_1, z_1)$ and $v = (x_2, y_2, z_2)$ be arbitrary vectors in $\mathbb{R}^3$, and let $c$ be an arbitrary scalar in $\mathbb{R}$.

**Step 1: Check Additivity ($T(u+v) = T(u) + T(v)$)**
*   **Calculate $u+v$:**
    $$ u+v = (x_1+x_2, y_1+y_2, z_1+z_2) $$
*   **Apply $T$ to $u+v$:**
    $$ T(u+v) = ((x_1+x_2)+(y_1+y_2), (y_1+y_2)-(z_1+z_2)) $$
    $$ = (x_1+x_2+y_1+y_2, y_1+y_2-z_1-z_2) $$
*   **Calculate $T(u)$ and $T(v)$ separately:**
    $$ T(u) = (x_1+y_1, y_1-z_1) $$
    $$ T(v) = (x_2+y_2, y_2-z_2) $$
*   **Add $T(u)$ and $T(v)$:**
    $$ T(u) + T(v) = ((x_1+y_1)+(x_2+y_2), (y_1-z_1)+(y_2-z_2)) $$
    $$ = (x_1+y_1+x_2+y_2, y_1-z_1+y_2-z_2) $$
*   **Compare the results:**
    The results are equal. So, additivity holds.

**Step 2: Check Homogeneity ($T(cu) = cT(u)$)**
*   **Calculate $cu$:**
    $$ cu = (cx_1, cy_1, cz_1) $$
*   **Apply $T$ to $cu$:**
    $$ T(cu) = (cx_1+cy_1, cy_1-cz_1) $$
*   **Calculate $cT(u)$:**
    $$ cT(u) = c(x_1+y_1, y_1-z_1) = (c(x_1+y_1), c(y_1-z_1)) = (cx_1+cy_1, cy_1-cz_1) $$
*   **Compare the results:**
    The results are equal. So, homogeneity holds.

Since both conditions are satisfied, $T$ is a linear transformation.

---

**b) Find a basis for the kernel of $T$.**

The kernel of $T$ is the set of all vectors $(x,y,z) \in \mathbb{R}^3$ such that $T(x,y,z) = (0,0)$.
*   **Set $T(x,y,z)$ equal to the zero vector:**
    $$ (x+y, y-z) = (0,0) $$
*   **Form a system of equations:**
    $$ x+y = 0 \quad (1) $$
    $$ y-z = 0 \quad (2) $$
    *We now have a system of 2 equations with 3 variables.*
*   **Solve the system using row reduction (or substitution):**
    From (2), we have $y=z$.
    Substitute $y=z$ into (1): $x+z=0$, so $x=-z$.
    *We express $x$ and $y$ in terms of $z$. This means $z$ is a free variable.*
*   **Write the general form of vectors in the kernel:**
    Any vector $(x,y,z)$ in the kernel must be of the form $(-z, z, z)$.
    $$ (x,y,z) = (-z, z, z) = z(-1, 1, 1) $$
    *We factor out the free variable $z$.*
*   **Identify a basis for the kernel:**
    The vector $(-1, 1, 1)$ spans the kernel. Since it's a single non-zero vector, it is linearly independent.
    Therefore, a basis for $\text{ker}(T)$ is $\{ (-1, 1, 1) \}$.
    $$ \boxed{\text{Basis for ker}(T) = \{ (-1, 1, 1) \}} $$
    *The dimension of the kernel (nullity) is 1.*

---

**c) Find a basis for the image of $T$.**

The image of $T$ is the set of all possible output vectors $(a,b) \in \mathbb{R}^2$ such that $(a,b) = T(x,y,z)$ for some $(x,y,z) \in \mathbb{R}^3$.
*   **Express $T(x,y,z)$ as a linear combination:**
    We can write $T(x,y,z) = (x+y, y-z)$ as:
    $$ T(x,y,z) = x(1,0) + y(1,1) + z(0,-1) $$
    *This shows that the image of $T$ is spanned by the images of the standard basis vectors of $\mathbb{R}^3$, specifically $T(e_1)=(1,0)$, $T(e_2)=(1,1)$, and $T(e_3)=(0,-1)$.*
    So, $\text{Im}(T) = \text{span}\{ (1,0), (1,1), (0,-1) \}$.
*   **Find a linearly independent subset that spans the image:**
    We have three vectors in $\mathbb{R}^2$. Since $\mathbb{R}^2$ has dimension 2, at most two vectors can be linearly independent.
    Let's check for linear dependence:
    Is $(1,1)$ a multiple of $(1,0)$? No.
    Is $(0,-1)$ a linear combination of $(1,0)$ and $(1,1)$?
    Let $c_1(1,0) + c_2(1,1) = (0,-1)$.
    $(c_1+c_2, c_2) = (0,-1)$.
    From the second component, $c_2 = -1$.
    Substitute into the first component: $c_1 + (-1) = 0 \implies c_1 = 1$.
    So, $(0,-1) = 1(1,0) - 1(1,1)$. This confirms linear dependence.
    *The vector $(0,-1)$ is redundant as it can be expressed as a linear combination of the first two.*
    Therefore, $\text{Im}(T) = \text{span}\{ (1,0), (1,1) \}$.
    The vectors $(1,0)$ and $(1,1)$ are linearly independent (since $(1,1)$ is not a scalar multiple of $(1,0)$).
*   **Identify a basis for the image:**
    A basis for $\text{Im}(T)$ is $\{ (1,0), (1,1) \}$.
    $$ \boxed{\text{Basis for Im}(T) = \{ (1,0), (1,1) \}} $$
    *The dimension of the image (rank) is 2. Note that $\text{dim}(\text{ker}(T)) + \text{dim}(\text{Im}(T)) = 1+2=3 = \text{dim}(\mathbb{R}^3)$, which aligns with the Rank-Nullity Theorem.*

---

**Reflection:** This example demonstrates how the kernel can be non-trivial (not just the zero vector) and how the image might not be the entire codomain (though in this case it was, since the dimension of the image is equal to the dimension of the codomain). Finding bases requires solving systems of equations and checking for linear independence.

### Example 3: Transformation on Polynomial Spaces (Calculus-based)

**Problem:** Let $D: P_2 \to P_1$ be the differentiation operator, defined by $D(p(x)) = p'(x)$. Here $P_2$ is the space of polynomials of degree at most 2, and $P_1$ is the space of polynomials of degree at most 1.
a) Verify that $D$ is a linear transformation.
b) Find a basis for the kernel of $D$.
c) Find a basis for the image of $D$.

**Given:** The transformation $D(p(x)) = p'(x)$.
**Want:** Verification of linearity, basis for kernel, and basis for image.

---

**a) Verify that $D$ is a linear transformation.**

Let $p(x), q(x) \in P_2$ and let $c$ be an arbitrary scalar.
Recall that $p(x) = a_2x^2 + a_1x + a_0$ and $q(x) = b_2x^2 + b_1x + b_0$.

**Step 1: Check Additivity ($D(p(x)+q(x)) = D(p(x)) + D(q(x))$)**
*   **Calculate $p(x)+q(x)$:**
    $$ p(x)+q(x) = (a_2+b_2)x^2 + (a_1+b_1)x + (a_0+b_0) $$
    *This is polynomial addition.*
*   **Apply $D$ to $p(x)+q(x)$:**
    $$ D(p(x)+q(x)) = \frac{d}{dx}[(a_2+b_2)x^2 + (a_1+b_1)x + (a_0+b_0)] $$
    $$ = 2(a_2+b_2)x + (a_1+b_1) $$
    *We apply the differentiation operator.*
*   **Calculate $D(p(x))$ and $D(q(x))$ separately:**
    $$ D(p(x)) = p'(x) = 2a_2x + a_1 $$
    $$ D(q(x)) = q'(x) = 2b_2x + b_1 $$
*   **Add $D(p(x))$ and $D(q(x))$:**
    $$ D(p(x)) + D(q(x)) = (2a_2x + a_1) + (2b_2x + b_1) $$
    $$ = (2a_2+2b_2)x + (a_1+b_1) = 2(a_2+b_2)x + (a_1+b_1) $$
*   **Compare the results:**
    The expressions are equal. So, the additivity condition holds.

**Step 2: Check Homogeneity ($D(cp(x)) = cD(p(x))$)**
*   **Calculate $cp(x)$:**
    $$ cp(x) = c(a_2x^2 + a_1x + a_0) = ca_2x^2 + ca_1x + ca_0 $$
*   **Apply $D$ to $cp(x)$:**
    $$ D(cp(x)) = \frac{d}{dx}[ca_2x^2 + ca_1x + ca_0] = 2ca_2x + ca_1 $$
*   **Calculate $cD(p(x))$:**
    $$ cD(p(x)) = c(2a_2x + a_1) = 2ca_2x + ca_1 $$
*   **Compare the results:**
    The expressions are equal. So, the homogeneity condition holds.

Since both conditions are satisfied, $D$ is a linear transformation. This is a fundamental property of differentiation.

---

**b) Find a basis for the kernel of $D$.**

The kernel of $D$ is the set of all polynomials $p(x) \in P_2$ such that $D(p(x)) = \mathbf{0}_{P_1}$, where $\mathbf{0}_{P_1}$ is the zero polynomial in $P_1$ (i.e., $0x+0 = 0$).
*   **Set $D(p(x))$ equal to the zero polynomial:**
    Let $p(x) = a_2x^2 + a_1x + a_0$.
    Then $D(p(x)) = 2a_2x + a_1$.
    We need $2a_2x + a_1 = 0$ (the zero polynomial).
    *For a polynomial to be the zero polynomial, all its coefficients must be zero.*
*   **Form a system of equations for the coefficients:**
    $$ 2a_2 = 0 \quad (1) $$
    $$ a_1 = 0 \quad (2) $$
*   **Solve the system:**
    From (1), $a_2 = 0$.
    From (2), $a_1 = 0$.
    The coefficient $a_0$ is not constrained by these equations; it can be any real number.
    *This means $a_0$ is a free variable.*
*   **Write the general form of polynomials in the kernel:**
    $$ p(x) = (0)x^2 + (0)x + a_0 = a_0 $$
    *The kernel consists of all constant polynomials.*
*   **Identify a basis for the kernel:**
    We can write $p(x) = a_0 \cdot 1$.
    The polynomial $1$ spans the kernel. Since it's a non-zero polynomial, it's linearly independent.
    Therefore, a basis for $\text{ker}(D)$ is $\{ 1 \}$.
    $$ \boxed{\text{Basis for ker}(D) = \{ 1 \}} $$
    *The dimension of the kernel (nullity) is 1.*

---

**c) Find a basis for the image of $D$.**

The image of $D$ is the set of all possible output polynomials $q(x) \in P_1$ such that $q(x) = D(p(x))$ for some $p(x) \in P_2$.
*   **Consider the general form of an output polynomial:**
    Let $p(x) = a_2x^2 + a_1x + a_0$.
    Then $D(p(x)) = 2a_2x + a_1$.
    *Any polynomial in the image must be of this form.*
*   **Determine what polynomials in $P_1$ can be represented this way:**
    Let $q(x) = bx+c$ be an arbitrary polynomial in $P_1$.
    Can we always find $a_1, a_2, a_0$ such that $2a_2x + a_1 = bx+c$?
    Yes, we can choose $a_2 = b/2$ and $a_1 = c$. The coefficient $a_0$ can be anything.
    This means that *any* polynomial in $P_1$ can be an output of $D$.
    *So, the image of $D$ is the entire codomain $P_1$.*
*   **Find a basis for $P_1$ (which is the image):**
    A standard basis for $P_1$ is $\{ 1, x \}$. These are linearly independent and span $P_1$.
    Therefore, a basis for $\text{Im}(D)$ is $\{ 1, x \}$.
    $$ \boxed{\text{Basis for Im}(D) = \{ 1, x \}} $$
    *The dimension of the image (rank) is 2. Note that $\text{dim}(\text{ker}(D)) + \text{dim}(\text{Im}(D)) = 1+2=3$. The dimension of $P_2$ is 3 (basis $\{1, x, x^2\}$). This again aligns with the Rank-Nullity Theorem.*

---

**Reflection:** This example demonstrates linear transformations in a context beyond $\mathbb{R}^n$ (polynomial spaces). It highlights that the "zero vector" can be a function (the zero polynomial) and that the concepts of kernel and image apply broadly to different types of vector spaces. Calculus is intrinsically linear in its basic operations.

### Example 4: Transformation Defined by Matrix Multiplication

**Problem:** Let $T: \mathbb{R}^3 \to \mathbb{R}^3$ be defined by $T(v) = Av$, where $A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}$.
a) Explain why $T$ is a linear transformation.
b) Find a basis for the kernel of $T$.
c) Find a basis for the image of $T$.

**Given:** The transformation $T(v) = Av$ with a specific matrix $A$.
**Want:** Explanation of linearity, basis for kernel, and basis for image.

---

**a) Explain why $T$ is a linear transformation.**

*   **Property of Matrix Multiplication:**
    Matrix multiplication is inherently linear. For any $m \times n$ matrix $A$, the transformation $T(v) = Av$ (where $v \in \mathbb{R}^n$ and $Av \in \mathbb{R}^m$) is always a linear transformation.
*   **Verification of Linearity Conditions:**
    1.  **Additivity:** For any vectors $u, v \in \mathbb{R}^3$:
        $$ T(u+v) = A(u+v) $$
        By the distributive property of matrix multiplication, $A(u+v) = Au + Av$.
        $$ Au + Av = T(u) + T(v) $$
        So, $T(u+v) = T(u) + T(v)$ holds.
    2.  **Homogeneity:** For any vector $u \in \mathbb{R}^3$ and scalar $c \in \mathbb{R}$:
        $$ T(cu) = A(cu) $$
        By the property of scalar multiplication with matrices, $A(cu) = c(Au)$.
        $$ c(Au) = cT(u) $$
        So, $T(cu) = cT(u)$ holds.
    Since both conditions are satisfied, $T$ is a linear transformation.

---

**b) Find a basis for the kernel of $T$.**

The kernel of $T$ is the set of all vectors $v \in \mathbb{R}^3$ such that $T(v) = \mathbf{0}_{\mathbb{R}^3}$. This is equivalent to finding the null space of the matrix $A$.
*   **Set $Av = \mathbf{0}$:**
    Let $v = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$. We need to solve:
    $$ \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} $$
    *This is a homogeneous system of linear equations.*
*   **Form the augmented matrix and row reduce:**
    The matrix $A$ is already in row echelon form.
    $$ \begin{pmatrix} 1 & 2 & 3 & | & 0 \\ 0 & 1 & 2 & | & 0 \\ 0 & 0 & 0 & | & 0 \end{pmatrix} $$
    *The last row implies $0=0$, which is always true and provides no constraint.*
*   **Write down the corresponding system of equations:**
    $$ x + 2y + 3z = 0 \quad (1) $$
    $$ y + 2z = 0 \quad (2) $$
*   **Solve for the leading variables in terms of free variables:**
    From (2), $y = -2z$.
    Substitute $y = -2z$ into (1):
    $x + 2(-2z) + 3z = 0$
    $x - 4z + 3z = 0$
    $x - z = 0 \implies x = z$.
    *Here, $z$ is the free variable.*
*   **Write the general form of vectors in the kernel:**
    $$ v = \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} z \\ -2z \\ z \end{pmatrix} = z \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} $$
    *We factor out the free variable $z$.*
*   **Identify a basis for the kernel:**
    The vector $\begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}$ spans the kernel. It is a single non-zero vector, so it is linearly independent.
    $$ \boxed{\text{Basis for ker}(T) = \left\{ \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} \right\}} $$
    *The dimension of the kernel (nullity) is 1.*

---

**c) Find a basis for the image of $T$.**

The image of $T$ is the set of all vectors $w \in \mathbb{R}^3$ such that $w = T(v)$ for some $v \in \mathbb{R}^3$. When $T(v) = Av$, the image of $T$ is precisely the column space of $A$.
*   **Identify the column vectors of $A$:**
    $$ A = \begin{pmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \mathbf{a}_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 3 \\ 2 \\ 0 \end{pmatrix} $$
    The image of $T$ is spanned by these column vectors: $\text{Im}(T) = \text{span}\left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 3 \\ 2 \\ 0 \end{pmatrix} \right\}$.
*   **Find a linearly independent subset of these column vectors:**
    To find a basis for the column space, we can use the pivots from the row-reduced form of $A$.
    The pivot columns in $A$ are the first and second columns. These correspond to the original first and second columns of $A$.
    *The pivot positions in the row-reduced matrix tell us which columns of the *original* matrix form a basis for the column space.*
    The first column is $\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.
    The second column is $\begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}$.
    These two vectors are linearly independent (one is not a scalar multiple of the other).
    The third column $\begin{pmatrix} 3 \\ 2 \\ 0 \end{pmatrix}$ is a linear combination of the first two:
    $1 \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + 1 \begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1+2 \\ 0+1 \\ 0+0 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \\ 0 \end{pmatrix}$ -- this is not correct. Let's find the combination directly from the RREF:
    The RREF of $A$ is $\begin{pmatrix} 1 & 0 & -1 \\ 0 & 1 & 2 \\ 0 & 0 & 0 \end{pmatrix}$. This tells us that $Col_3 = -1 \cdot Col_1 + 2 \cdot Col_2$.
    Let's check this for the original matrix:
    $-1 \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + 2 \begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} -1+4 \\ 0+2 \\ 0+0 \end{pmatrix} = \begin{pmatrix} 3 \\ 2 \\ 0 \end{pmatrix}$. This matches the third column of $A$.
    *So the third column is indeed redundant.*
*   **Identify a basis for the image:**
    A basis for $\text{Im}(T)$ is the set of the pivot columns of the original matrix $A$:
    $$ \boxed{\text{Basis for Im}(T) = \left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix} \right\}} $$
    *The dimension of the image (rank) is 2. Again, $\text{dim}(\text{ker}(T)) + \text{dim}(\text{Im}(T)) = 1+2=3 = \text{dim}(\mathbb{R}^3)$, confirming the Rank-Nullity Theorem.*

---

**Reflection:** This example highlights the deep connection between linear transformations and matrices. The kernel of $T(v)=Av$ is the null space of $A$, and the image of $T$ is the column space of $A$. This connection is fundamental and will be explored further when discussing matrix representations of linear transformations. The process of finding a basis for the kernel and image directly relates to solving homogeneous systems and identifying pivot columns, respectively.

## 6. Common mistakes and traps

Students often stumble on specific points when learning about linear transformations, kernel, and image. Being aware of these traps can help you avoid them.

1.  **Assuming $T(\mathbf{0}) = \mathbf{0}$ implies linearity:** While it's true that any linear transformation must map the zero vector of the domain to the zero vector of the codomain ($T(\mathbf{0}_V) = \mathbf{0}_W$), the converse is false. Many non-linear transformations also map zero to zero (e.g., $T(x) = x^2$ or $T(x,y) = (x^3, y^3)$). Always check both additivity and homogeneity.
2.  **Forgetting to check *both* linearity conditions:** Sometimes a transformation might satisfy additivity but not homogeneity, or vice-versa. For example, $T(x) = |x|$ satisfies $T(x+y) = |x+y| \le |x|+|y| = T(x)+T(y)$ (triangle inequality, not equality) and $T(cx) = |cx| = |c||x| = |c|T(x)$, which is not $cT(x)$ for negative $c$. Another one: $T(x,y) = (x, 0)$ is linear, but $T(x,y) = (x,1)$ is not, even though it seems "simple."
3.  **Confusing the kernel with the zero vector itself:** The kernel is a *set* of vectors, specifically a subspace. While it *can* be just $\{\mathbf{0}_V\}$, it often contains other non-zero vectors. Stating "the kernel is 0" is imprecise and incorrect; it's "the kernel is the zero subspace" or "the kernel contains only the zero vector."
4.  **Confusing the image with the codomain:** The image is a *subset* of the codomain. It is only equal to the codomain if the transformation is surjective (onto). Always be precise about the actual vectors the transformation can produce.
5.  **Algebraic errors when solving for kernel or image:** Finding the kernel involves solving a homogeneous system of equations ($T(v) = \mathbf{0}$). Finding the image often involves determining the span of a set of vectors (e.g., the columns of the matrix representation). Mistakes in row reduction, substitution, or identifying free variables will lead to incorrect kernels or images.
6.  **Incorrectly assuming a basis for kernel/image:** After finding the general form of vectors in the kernel or image, students sometimes list all components as basis vectors. Remember to factor out free variables to identify the spanning vectors, and then ensure these vectors are linearly independent. For example, if $\text{ker}(T) = \{ (x,y) \mid x=y \}$, then $(1,1)$ is a basis, not $(1,1)$ and $(2,2)$.

## 7. Textbook-precise explanation

This section provides the formal, rigorous definitions and theorems as they would appear in a university-level linear algebra textbook. This is for solidifying your understanding against the intuitive explanations.

Let $V$ and $W$ be vector spaces over the same field $F$.

**Definition 7.1: Linear Transformation**
A function $T: V \to W$ is called a **linear transformation** (or linear map, or vector space homomorphism) if for all $u, v \in V$ and all scalars $c \in F$:
1.  (Additivity) $T(u+v) = T(u) + T(v)$
2.  (Homogeneity) $T(cu) = cT(u)$

**Remark:** These two conditions are often combined into a single equivalent condition:
$T(c_1 u_1 + c_2 u_2) = c_1 T(u_1) + c_2 T(u_2)$ for all $u_1, u_2 \in V