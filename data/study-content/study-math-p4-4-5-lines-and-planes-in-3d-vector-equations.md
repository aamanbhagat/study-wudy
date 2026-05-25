## 1. What it is — in plain English

Imagine you're in a completely dark, empty room, and you have a tiny laser pointer. If you turn on the laser, you'll see a perfectly straight, infinitely long beam of light stretching out from your hand. That laser beam is exactly what we mean by a "line" in 3D space. It has a starting point (your hand) and a direction (where you point it), and it goes on forever in that direction.

Now, imagine you have a perfectly flat, infinitely thin sheet of glass, like a giant window pane. If you hold it up, that flat surface represents a "plane" in 3D space. It's a two-dimensional surface that stretches out endlessly in all directions, but it has a specific "orientation" – it's tilted in a particular way.

In this lesson, we're going to learn how to describe these lines and planes using the language of vectors. Instead of saying "start at my hand and point that way," we'll use numbers to define a starting point and a direction. And instead of saying "a flat sheet tilted like this," we'll use numbers to define a point on the sheet and a vector that sticks straight out of it, telling us its orientation. This mathematical language allows us to precisely locate and orient these fundamental geometric objects in three dimensions.

## 2. Why it matters — real-world applications

Understanding lines and planes in 3D space using vector equations is absolutely fundamental across many scientific and engineering disciplines. It's not just abstract math; it's the bedrock for describing and manipulating objects in our three-dimensional world.

1.  **Aerospace Engineering & Navigation:** When a satellite orbits Earth or an airplane flies a route, its path can often be approximated as a line segment or a curve. Vector equations for lines are used to define flight paths, predict trajectories, and calculate collision courses. For instance, air traffic control systems constantly use these equations to monitor aircraft positions and ensure safe separation. Companies like **Boeing** and **SpaceX** rely heavily on these principles for designing autonomous flight systems and calculating rocket trajectories.

2.  **Computer Graphics & Virtual Reality:** Every object you see in a video game or a CAD model is made up of polygons, which are essentially flat planes (or parts of planes). Ray tracing, a common rendering technique used by companies like **NVIDIA** and in software like **Blender**, involves simulating light rays (lines) bouncing off surfaces (planes). To determine where a ray hits a surface, you need to solve for the intersection of a line and a plane, which is done using their vector equations. This creates realistic lighting and shadows.

3.  **Robotics & Automation:** For a robot arm to pick up an object, its end effector (the "hand") needs to move along a precise path (a line or a curve) and orient itself correctly relative to a surface (a plane). Vector equations are used to program these movements, ensuring the robot navigates its workspace without collisions and performs tasks accurately. Companies like **Boston Dynamics** and **Fanuc** utilize this in their advanced robotic systems for manufacturing and exploration.

4.  **Physics & Engineering Mechanics:** In physics, forces, velocities, and accelerations are often represented as vectors. The motion of a particle can be described by a line in space, and fields (like electric or magnetic fields) can be visualized relative to planes. For example, calculating the torque on a rigid body or analyzing the stresses on a beam in structural engineering (used by firms like **Arup**) involves understanding the geometry of forces and surfaces, which is precisely what vector equations of lines and planes provide.

## 3. Prerequisites — what you must know first

Before diving into vector equations of lines and planes, ensure you have a solid grasp of these foundational concepts. If any of these feel unfamiliar, pause and review them first.

*   **Vectors (Basic Definition & Operations):**
    *   **What it is:** A quantity having both magnitude (length) and direction. Represented geometrically as an arrow or algebraically as an ordered tuple (e.g., $\langle x, y, z \rangle$ or $\begin{pmatrix} x \\ y \\ z \end{pmatrix}$).
    *   **Why it matters:** Lines and planes are fundamentally built using vectors for position and direction/orientation.
    *   **Operations:** Vector addition, scalar multiplication, and finding the magnitude (length) of a vector.

*   **Coordinate Systems (Cartesian in 3D):**
    *   **What it is:** A system that uses three perpendicular axes (x, y, z) to uniquely specify the position of any point in 3D space.
    *   **Why it matters:** We'll be working exclusively in 3D space, and points will be given as $(x, y, z)$ coordinates.

*   **Dot Product:**
    *   **What it is:** An algebraic operation that takes two vectors and returns a single scalar number. Geometrically, it relates to the angle between the vectors: $\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$.
    *   **Why it matters:** Crucially, if two non-zero vectors are perpendicular (orthogonal), their dot product is zero. This property is key to defining planes.

*   **Cross Product:**
    *   **What it is:** An algebraic operation that takes two vectors in 3D space and returns a new vector that is perpendicular to both of the original vectors. Its magnitude is related to the area of the parallelogram formed by the two vectors.
    *   **Why it matters:** It's the primary tool for finding a vector normal (perpendicular) to a plane when you have two non-parallel vectors lying within that plane.

*   **Basic Algebra:**
    *   **What it is:** Competence in solving linear equations, substituting variables, and manipulating algebraic expressions.
    *   **Why it matters:** You'll be performing algebraic manipulations to derive different forms of equations and solve for unknown quantities.

## 4. The core idea — step by step

Let's build up the concept of vector equations for lines and planes from the ground up, focusing on intuition first, then the formal mathematics.

### Step 1: Position Vectors – Pinpointing a Location

**Plain English:** Imagine you're standing at the very center of your room (the "origin"). A "position vector" is just an arrow that starts at this center and points directly to a specific spot in the room. It tells you exactly where that spot is relative to your starting point.

**Concrete Example:** If you want to point to the corner of a table that is 2 meters along the x-axis, 3 meters along the y-axis, and 1 meter up along the z-axis, your position vector would be $\langle 2, 3, 1 \rangle$.

**Formal/Mathematical Version:** A position vector $\vec{r}_0$ (pronounced "r-nought" or "r-zero") for a point $P_0(x_0, y_0, z_0)$ in 3D space is given by:
$$ \vec{r}_0 = \langle x_0, y_0, z_0 \rangle \quad \text{or} \quad \vec{r}_0 = x_0\mathbf{i} + y_0\mathbf{j} + z_0\mathbf{k} \quad \text{or} \quad \vec{r}_0 = \begin{pmatrix} x_0 \\ y_0 \\ z_0 \end{pmatrix} $$
Here, $\mathbf{i}, \mathbf{j}, \mathbf{k}$ are the standard unit basis vectors along the x, y, and z axes, respectively.

**What could go wrong:** Don't confuse a point $(x_0, y_0, z_0)$ with its position vector $\langle x_0, y_0, z_0 \rangle$. While they represent the same location, a point is a geometric entity, whereas a position vector is a vector quantity (magnitude and direction) that *points* to that entity *from the origin*.

### Step 2: Direction Vectors – Showing "Which Way"

**Plain English:** A "direction vector" is like an instruction for movement. It tells you how many steps to take in the x-direction, how many in the y-direction, and how many in the z-direction, but it doesn't tell you *where to start*. It just gives the "heading" or "orientation."

**Concrete Example:** If you're told to move in the direction $\langle 1, 2, 0 \rangle$, it means for every 1 unit you move along x, you move 2 units along y, and 0 units along z. This could be moving from (0,0,0) to (1,2,0), or from (5,5,5) to (6,7,5) – the *direction* is the same, just the starting point is different.

**Formal/Mathematical Version:** A direction vector $\vec{d}$ is any non-zero vector that is parallel to the line or object whose direction we want to describe.
$$ \vec{d} = \langle a, b, c \rangle \quad \text{or} \quad \vec{d} = a\mathbf{i} + b\mathbf{j} + c\mathbf{k} \quad \text{or} \quad \vec{d} = \begin{pmatrix} a \\ b \\ c \end{pmatrix} $$
The components $a, b, c$ are called the *direction numbers*. Any scalar multiple of $\vec{d}$ (e.g., $2\vec{d}$ or $-\vec{d}$) will represent the same direction for a line.

**What could go wrong:** Remember that a direction vector only defines the *orientation* of a line, not its specific location. Many different lines can share the same direction vector.

### Step 3: Vector Equation of a Line – "Start Here, Go That Way"

**Plain English:** To define a specific line, you need two things: a fixed point *on* the line (your starting point) and the direction the line travels. So, you start at your fixed point, and then you can move any amount (positive or negative) in the direction of your direction vector to reach any other point on the line.

**Concrete Example:** Let's say a line passes through the point $P_0(1, 2, 3)$ and goes in the direction of $\vec{d} = \langle 4, 5, 6 \rangle$.
To get to any point on this line, you first go to $(1, 2, 3)$. Then, you can take 1 "step" in the direction $\langle 4, 5, 6 \rangle$ to reach $(1+4, 2+5, 3+6) = (5, 7, 9)$. Or half a step to reach $(1+2, 2+2.5, 3+3) = (3, 4.5, 6)$. Or two steps backward (i.e., $-2$ steps) to reach $(1-8, 2-10, 3-12) = (-7, -8, -9)$. The "number of steps" is our parameter $t$.

**Formal/Mathematical Version:** The vector equation of a line passing through a point $P_0(x_0, y_0, z_0)$ (with position vector $\vec{r}_0$) and parallel to a direction vector $\vec{d} = \langle a, b, c \rangle$ is given by:
$$ \vec{r}(t) = \vec{r}_0 + t\vec{d} $$
where $\vec{r}(t) = \langle x(t), y(t), z(t) \rangle$ is the position vector of any point on the line, and $t$ is a scalar parameter that can take any real value ($t \in \mathbb{R}$).

**What could go wrong:** Forgetting that $t$ is a *scalar* multiplier for the direction vector. It scales the length of the direction vector, determining how far along the line you move from $\vec{r}_0$.

### Step 4: Parametric Equations of a Line – Component by Component

**Plain English:** The vector equation is compact, but sometimes it's easier to think about the x, y, and z movements separately. Parametric equations just break down the vector equation into three separate equations, one for each coordinate.

**Concrete Example:** Using the line from Step 3: $\vec{r}_0 = \langle 1, 2, 3 \rangle$ and $\vec{d} = \langle 4, 5, 6 \rangle$.
$\vec{r}(t) = \langle x(t), y(t), z(t) \rangle = \langle 1, 2, 3 \rangle + t\langle 4, 5, 6 \rangle$
$\langle x(t), y(t), z(t) \rangle = \langle 1+4t, 2+5t, 3+6t \rangle$
So, the separate equations are:
$x = 1 + 4t$
$y = 2 + 5t$
$z = 3 + 6t$

**Formal/Mathematical Version:** Given the vector equation $\vec{r}(t) = \langle x_0, y_0, z_0 \rangle + t\langle a, b, c \rangle$, the parametric equations are:
$$ x = x_0 + at $$
$$ y = y_0 + bt $$
$$ z = z_0 + ct $$
where $t \in \mathbb{R}$.

**What could go wrong:** Mismatching components (e.g., adding $x_0$ to $bt$). Each equation corresponds to a single coordinate.

### Step 5: Symmetric Equations of a Line – Eliminating the Parameter

**Plain English:** If you want to describe the line without using the parameter $t$, you can solve each parametric equation for $t$ and set them equal. This shows the relationship between $x, y, z$ directly. It's like saying "for every step in x, this many steps in y, and this many steps in z."

**Concrete Example:** From the parametric equations:
$x = 1 + 4t \implies t = \frac{x-1}{4}$
$y = 2 + 5t \implies t = \frac{y-2}{5}$
$z = 3 + 6t \implies t = \frac{z-3}{6}$
Setting them equal gives:
$\frac{x-1}{4} = \frac{y-2}{5} = \frac{z-3}{6}$

**Formal/Mathematical Version:** If $a, b, c$ are all non-zero, we can solve each parametric equation for $t$:
$$ t = \frac{x-x_0}{a}, \quad t = \frac{y-y_0}{b}, \quad t = \frac{z-z_0}{c} $$
Equating these expressions for $t$ gives the symmetric equations of the line:
$$ \frac{x-x_0}{a} = \frac{y-y_0}{b} = \frac{z-z_0}{c} $$
**What could go wrong:** If one of the direction numbers ($a, b,$ or $c$) is zero, you cannot divide by it. For example, if $a=0$, then $x = x_0$. The symmetric equations would then be $x=x_0$ and $\frac{y-y_0}{b} = \frac{z-z_0}{c}$. This means the line is parallel to the yz-plane.

### Step 6: Normal Vectors to a Plane – The "Perpendicular Pointer"

**Plain English:** For a plane, we don't use a direction vector *in* the plane, because a plane goes in infinitely many directions. Instead, we use a "normal vector." This is a special vector that is absolutely perpendicular (at a 90-degree angle) to *every* line and vector lying within the plane. Think of it as a flag pole sticking straight out of a flat field. Its direction tells you how the field is tilted.

**Concrete Example:** Consider the xy-plane (the floor). A vector pointing straight up, like $\langle 0, 0, 1 \rangle$, is normal to this plane. Any vector lying in the xy-plane, like $\langle 5, 2, 0 \rangle$, will have a dot product of zero with $\langle 0, 0, 1 \rangle$: $\langle 5, 2, 0 \rangle \cdot \langle 0, 0, 1 \rangle = 0$.

**Formal/Mathematical Version:** A non-zero vector $\vec{n} = \langle A, B, C \rangle$ is a normal vector to a plane if it is orthogonal to every vector lying in the plane.

**What could go wrong:** Confusing a normal vector with a direction vector. A direction vector is *parallel* to a line; a normal vector is *perpendicular* to a plane.

### Step 7: Vector Equation of a Plane – "All Points Perpendicular to Normal"

**Plain English:** We define a plane by knowing two things: a specific point that *is* on the plane, and the normal vector that tells us its tilt. Any other point is on the plane *if and only if* the vector connecting our fixed point to this new point is perpendicular to the normal vector. Remember, "perpendicular" in vector math means their dot product is zero!

**Concrete Example:** Let a plane pass through $P_0(1, 2, 3)$ and have a normal vector $\vec{n} = \langle 4, 5, 6 \rangle$.
Let $P(x, y, z)$ be any other point on the plane.
The vector from $P_0$ to $P$ is $\vec{P_0 P} = \langle x-1, y-2, z-3 \rangle$.
For $P$ to be on the plane, $\vec{P_0 P}$ must be perpendicular to $\vec{n}$.
So, $\vec{n} \cdot \vec{P_0 P} = 0$.
$\langle 4, 5, 6 \rangle \cdot \langle x-1, y-2, z-3 \rangle = 0$. This is the vector equation.

**Formal/Mathematical Version:** The vector equation of a plane passing through a point $P_0(x_0, y_0, z_0)$ (with position vector $\vec{r}_0$) and having a normal vector $\vec{n} = \langle A, B, C \rangle$ is given by:
$$ \vec{n} \cdot (\vec{r} - \vec{r}_0) = 0 $$
where $\vec{r} = \langle x, y, z \rangle$ is the position vector of any point $P(x, y, z)$ on the plane.

**What could go wrong:** Forgetting to subtract $\vec{r}_0$ from $\vec{r}$. The dot product must be with a vector *lying in the plane*, which is $(\vec{r} - \vec{r}_0)$.

### Step 8: Scalar Equation of a Plane (Cartesian Equation) – The Standard Form

**Plain English:** This is just the expanded version of the vector equation of a plane. You perform the dot product and simplify, which results in a familiar linear equation in terms of $x, y, z$. This is often the most practical form for calculations.

**Concrete Example:** Continuing from Step 7:
$\langle 4, 5, 6 \rangle \cdot \langle x-1, y-2, z-3 \rangle = 0$
$4(x-1) + 5(y-2) + 6(z-3) = 0$
$4x - 4 + 5y - 10 + 6z - 18 = 0$
$4x + 5y + 6z - 32 = 0$
This is the scalar equation of the plane. The coefficients of $x, y, z$ are the components of the normal vector!

**Formal/Mathematical Version:** Expanding $\vec{n} \cdot (\vec{r} - \vec{r}_0) = 0$ where $\vec{n} = \langle A, B, C \rangle$ and $\vec{r}_0 = \langle x_0, y_0, z_0 \rangle$:
$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$
Distributing and rearranging, we get the general scalar equation (or Cartesian equation) of a plane:
$$ Ax + By + Cz + D = 0 $$
where $D = -(Ax_0 + By_0 + Cz_0)$.

**What could go wrong:** Algebraic errors when expanding or simplifying. Also, sometimes students forget that the coefficients $A, B, C$ in the scalar equation *directly correspond* to the components of the normal vector $\vec{n} = \langle A, B, C \rangle$. This is a powerful shortcut!

## 5. Worked examples — multiple, with every step shown

### Example 1: Finding the Vector, Parametric, and Symmetric Equations of a Line

**Problem:** Find the vector, parametric, and symmetric equations of the line passing through the points $P(1, -2, 4)$ and $Q(3, 0, 1)$.

**Identify what's given and what we want:**
*   Given: Two points on the line, $P(1, -2, 4)$ and $Q(3, 0, 1)$.
*   Want: Vector equation $\vec{r}(t) = \vec{r}_0 + t\vec{d}$, parametric equations, and symmetric equations.

**Step-by-step solution:**

1.  **Find a position vector $\vec{r}_0$ for a point on the line.**
    *   **Why:** We need a starting point for our line. We can choose either $P$ or $Q$. Let's choose $P$.
    *   $\vec{r}_0 = \langle 1, -2, 4 \rangle$

2.  **Find a direction vector $\vec{d}$ for the line.**
    *   **Why:** A vector from one point on the line to another point on the line will be parallel to the line, so it serves as our direction vector.
    *   $\vec{d} = \vec{PQ} = Q - P = \langle 3-1, 0-(-2), 1-4 \rangle$
    *   $\vec{d} = \langle 2, 2, -3 \rangle$

3.  **Write the vector equation of the line.**
    *   **Why:** Combine the position vector and direction vector using the formula $\vec{r}(t) = \vec{r}_0 + t\vec{d}$.
    *   $$ \vec{r}(t) = \langle 1, -2, 4 \rangle + t\langle 2, 2, -3 \rangle $$

4.  **Write the parametric equations of the line.**
    *   **Why:** Separate the vector equation into its x, y, and z components.
    *   $x(t) = 1 + 2t$
    *   $y(t) = -2 + 2t$
    *   $z(t) = 4 - 3t$
    *   $$ \begin{cases} x = 1 + 2t \\ y = -2 + 2t \\ z = 4 - 3t \end{cases} $$

5.  **Write the symmetric equations of the line.**
    *   **Why:** Solve each parametric equation for $t$ and set the expressions equal. Since none of the direction numbers ($a=2, b=2, c=-3$) are zero, we can proceed directly.
    *   From $x = 1 + 2t \implies t = \frac{x-1}{2}$
    *   From $y = -2 + 2t \implies t = \frac{y-(-2)}{2} = \frac{y+2}{2}$
    *   From $z = 4 - 3t \implies t = \frac{z-4}{-3}$
    *   $$ \boxed{\frac{x-1}{2} = \frac{y+2}{2} = \frac{z-4}{-3}} $$

**Reflection:** This example was straightforward because we were given two points, which directly allowed us to find both a position vector and a direction vector. The key is understanding how to construct $\vec{d}$ from two points.

---

### Example 2: Finding the Equation of a Plane Given Three Points

**Problem:** Find the scalar equation of the plane that passes through the points $A(1, 0, 0)$, $B(0, 2, 0)$, and $C(0, 0, 3)$.

**Identify what's given and what we want:**
*   Given: Three points on the plane: $A(1, 0, 0)$, $B(0, 2, 0)$, $C(0, 0, 3)$.
*   Want: Scalar equation $Ax + By + Cz + D = 0$.

**Step-by-step solution:**

1.  **Find two vectors lying in the plane.**
    *   **Why:** To find the normal vector to the plane, we need two non-parallel vectors that are within the plane. We can form these vectors by subtracting the coordinates of the given points. Let's use $\vec{AB}$ and $\vec{AC}$.
    *   $\vec{AB} = B - A = \langle 0-1, 2-0, 0-0 \rangle = \langle -1, 2, 0 \rangle$
    *   $\vec{AC} = C - A = \langle 0-1, 0-0, 3-0 \rangle = \langle -1, 0, 3 \rangle$

2.  **Find the normal vector $\vec{n}$ to the plane.**
    *   **Why:** The cross product of two non-parallel vectors lying in a plane yields a vector that is perpendicular (normal) to both, and thus normal to the plane itself.
    *   $\vec{n} = \vec{AB} \times \vec{AC}$
    *   $$ \vec{n} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -1 & 2 & 0 \\ -1 & 0 & 3 \end{vmatrix} $$
    *   $$ \vec{n} = \mathbf{i}((2)(3) - (0)(0)) - \mathbf{j}((-1)(3) - (0)(-1)) + \mathbf{k}((-1)(0) - (2)(-1)) $$
    *   $$ \vec{n} = \mathbf{i}(6 - 0) - \mathbf{j}(-3 - 0) + \mathbf{k}(0 - (-2)) $$
    *   $$ \vec{n} = 6\mathbf{i} + 3\mathbf{j} + 2\mathbf{k} = \langle 6, 3, 2 \rangle $$

3.  **Use the normal vector and one of the points to write the scalar equation of the plane.**
    *   **Why:** We have $\vec{n} = \langle A, B, C \rangle = \langle 6, 3, 2 \rangle$. We can use any of the three given points as $(x_0, y_0, z_0)$. Let's use $A(1, 0, 0)$.
    *   The scalar equation form is $A(x-x_0) + B(y-y_0) + C(z-z_0) = 0$.
    *   $6(x-1) + 3(y-0) + 2(z-0) = 0$
    *   $6x - 6 + 3y + 2z = 0$
    *   $$ \boxed{6x + 3y + 2z - 6 = 0} $$

**Reflection:** This example highlights the importance of the cross product. Without it, finding the normal vector from three points would be much harder. The choice of which point to use for $(x_0, y_0, z_0)$ doesn't affect the final equation, as long as it's a point on the plane.

---

### Example 3: Finding the Vector Equation of the Line of Intersection of Two Planes

**Problem:** Find the vector equation of the line of intersection of the planes $x + y + z = 1$ and $x - 2y + 3z = 1$.

**Identify what's given and what we want:**
*   Given: Two planes, $P_1: x + y + z = 1$ and $P_2: x - 2y + 3z = 1$.
*   Want: Vector equation of the line of intersection $\vec{r}(t) = \vec{r}_0 + t\vec{d}$.

**Step-by-step solution:**

1.  **Find the normal vectors of the two planes.**
    *   **Why:** The coefficients of $x, y, z$ in the scalar equation of a plane directly give its normal vector.
    *   For $P_1: \vec{n}_1 = \langle 1, 1, 1 \rangle$
    *   For $P_2: \vec{n}_2 = \langle 1, -2, 3 \rangle$

2.  **Find the direction vector $\vec{d}$ of the line of intersection.**
    *   **Why:** The line of intersection lies in both planes. Therefore, it must be perpendicular to *both* normal vectors. The cross product of the two normal vectors will give us a vector perpendicular to both, which is exactly the direction vector of the line of intersection.
    *   $\vec{d} = \vec{n}_1 \times \vec{n}_2$
    *   $$ \vec{d} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 1 & 1 \\ 1 & -2 & 3 \end{vmatrix} $$
    *   $$ \vec{d} = \mathbf{i}((1)(3) - (1)(-2)) - \mathbf{j}((1)(3) - (1)(1)) + \mathbf{k}((1)(-2) - (1)(1)) $$
    *   $$ \vec{d} = \mathbf{i}(3 - (-2)) - \mathbf{j}(3 - 1) + \mathbf{k}(-2 - 1) $$
    *   $$ \vec{d} = 5\mathbf{i} - 2\mathbf{j} - 3\mathbf{k} = \langle 5, -2, -3 \rangle $$

3.  **Find a point $P_0(x_0, y_0, z_0)$ that lies on both planes (i.e., on the line of intersection).**
    *   **Why:** We need a specific point for our $\vec{r}_0$. To find a point on the line of intersection, we need a point that satisfies *both* plane equations simultaneously. We can choose a convenient value for one of the variables (e.g., $x=0$, $y=0$, or $z=0$) to simplify the system of equations. Let's set $z=0$.
    *   Substitute $z=0$ into both plane equations:
        *   $P_1: x + y + 0 = 1 \implies x + y = 1$
        *   $P_2: x - 2y + 0 = 1 \implies x - 2y = 1$
    *   Now we have a system of two equations with two variables:
        1.  $x + y = 1$
        2.  $x - 2y = 1$
    *   Subtract equation (2) from equation (1):
        $(x+y) - (x-2y) = 1 - 1$
        $3y = 0 \implies y = 0$
    *   Substitute $y=0$ into $x+y=1$:
        $x + 0 = 1 \implies x = 1$
    *   So, a point on the line of intersection is $P_0(1, 0, 0)$.
    *   Thus, $\vec{r}_0 = \langle 1, 0, 0 \rangle$.

4.  **Write the vector equation of the line.**
    *   **Why:** Combine the position vector and direction vector using the formula $\vec{r}(t) = \vec{r}_0 + t\vec{d}$.
    *   $$ \boxed{\vec{r}(t) = \langle 1, 0, 0 \rangle + t\langle 5, -2, -3 \rangle} $$

**Reflection:** This example is harder because it requires finding both the direction vector and a point on the line of intersection. The direction vector comes from the cross product of the normal vectors, and finding a point involves solving a system of linear equations. This demonstrates how multiple concepts interweave.

---

### Example 4: Finding the Equation of a Plane Containing a Line and a Point

**Problem:** Find the scalar equation of the plane that contains the line $L: \vec{r}(t) = \langle 1, 2, 0 \rangle + t\langle 1, -1, 2 \rangle$ and the point $P(2, 1, 1)$.

**Identify what's given and what we want:**
*   Given: Line $L$ (with a point and direction vector) and an external point $P(2, 1, 1)$.
*   Want: Scalar equation $Ax + By + Cz + D = 0$.

**Step-by-step solution:**

1.  **Extract a point on the line and the direction vector of the line.**
    *   **Why:** The line provides us with one point that's definitely in the plane and one vector that's definitely in the plane.
    *   From $L: \vec{r}(t) = \langle 1, 2, 0 \rangle + t\langle 1, -1, 2 \rangle$:
        *   A point on the line (and thus on the plane) is $P_L(1, 2, 0)$. Let this be our $\vec{r}_0$.
        *   A direction vector parallel to the line (and thus lying in the plane) is $\vec{v}_1 = \langle 1, -1, 2 \rangle$.

2.  **Form a second vector lying in the plane.**
    *   **Why:** We need two non-parallel vectors in the plane to take their cross product and find the normal vector. We have $P_L$ and $P$. The vector connecting $P_L$ to $P$ will lie in the plane.
    *   $\vec{v}_2 = \vec{P_L P} = P - P_L = \langle 2-1, 1-2, 1-0 \rangle$
    *   $\vec{v}_2 = \langle 1, -1, 1 \rangle$

3.  **Find the normal vector $\vec{n}$ to the plane.**
    *   **Why:** The cross product of the two vectors $\vec{v}_1$ and $\vec{v}_2$ (which both lie in the plane) will give us a vector normal to the plane.
    *   $\vec{n} = \vec{v}_1 \times \vec{v}_2$
    *   $$ \vec{n} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & -1 & 2 \\ 1 & -1 & 1 \end{vmatrix} $$
    *   $$ \vec{n} = \mathbf{i}((-1)(1) - (2)(-1)) - \mathbf{j}((1)(1) - (2)(1)) + \mathbf{k}((1)(-1) - (-1)(1)) $$
    *   $$ \vec{n} = \mathbf{i}(-1 - (-2)) - \mathbf{j}(1 - 2) + \mathbf{k}(-1 - (-1)) $$
    *   $$ \vec{n} = \mathbf{i}(1) - \mathbf{j}(-1) + \mathbf{k}(0) $$
    *   $$ \vec{n} = \langle 1, 1, 0 \rangle $$

4.  **Use the normal vector and one of the points to write the scalar equation of the plane.**
    *   **Why:** We have $\vec{n} = \langle A, B, C \rangle = \langle 1, 1, 0 \rangle$. We can use either $P_L(1, 2, 0)$ or $P(2, 1, 1)$ as $(x_0, y_0, z_0)$. Let's use $P_L(1, 2, 0)$.
    *   The scalar equation form is $A(x-x_0) + B(y-y_0) + C(z-z_0) = 0$.
    *   $1(x-1) + 1(y-2) + 0(z-0) = 0$
    *   $x - 1 + y - 2 + 0 = 0$
    *   $x + y - 3 = 0$
    *   $$ \boxed{x + y - 3 = 0} $$

**Reflection:** This problem requires careful selection of vectors. We needed to identify a vector *already* in the plane (the line's direction vector) and construct a second vector *in* the plane (from a point on the line to the external point). The cross product then pulls out the normal vector. The fact that $C=0$ in the normal vector means the plane is parallel to the z-axis, which is an interesting geometric insight.

## 6. Common mistakes and traps

1.  **Confusing points and vectors:** A point $(x,y,z)$ is a location. A vector $\langle x,y,z \rangle$ (or $x\mathbf{i}+y\mathbf{j}+z\mathbf{k}$) is a displacement or direction. While a position vector points to a point, they are mathematically distinct entities.
2.  **Incorrectly using dot product vs. cross product:**
    *   **Dot product:** Used for checking perpendicularity (if $\vec{a} \cdot \vec{b} = 0$) or finding the angle between vectors. It results in a *scalar*.
    *   **Cross product:** Used for finding a vector perpendicular to two given vectors. It results in a *vector*.
    *   Students often mix these up, especially when trying to find a normal vector or check for orthogonality.
3.  **Forgetting the parameter 't' for lines:** The parameter $t$ in $\vec{r}(t) = \vec{r}_0 + t\vec{d}$ is crucial. Without it, $\vec{r}_0 + \vec{d}$ is just a single point, not an entire line. $t$ allows the line to extend infinitely.
4.  **Algebraic errors in expansion or simplification:** These equations involve multiple components and signs. Simple arithmetic mistakes or sign errors are common, especially when calculating cross products or expanding the scalar equation of a plane.
5.  **Division by zero in symmetric equations:** If a direction number ($a, b,$ or $c$) for a line is zero, you cannot divide by it to form the symmetric equation. The correct approach is to state that coordinate is constant (e.g., $x=x_0$) and then equate the other two ratios.
6.  **Using a direction vector for a plane's orientation:** A plane doesn't have a single "direction" vector in the same way a line does. Its orientation is defined by its *normal vector*, which is perpendicular to the plane. Attempting to define a plane with a vector *in* the plane (without a second such vector or a normal) is a conceptual error.

## 7. Textbook-precise explanation

### Lines in 3D Space

A **line $L$ in three-dimensional space** is uniquely determined by a fixed point $P_0(x_0, y_0, z_0)$ on the line and a non-zero vector $\vec{d} = \langle a, b, c \rangle$ that is parallel to the line.

Let $\vec{r}_0$ be the position vector of $P_0$, i.e., $\vec{r}_0 = \langle x_0, y_0, z_0 \rangle$. Let $\vec{r}$ be the position vector of an arbitrary point $P(x, y, z)$ on the line. Then the vector $\vec{r} - \vec{r}_0$ is parallel to $\vec{d}$. This means $\vec{r} - \vec{r}_0$ must be a scalar multiple of $\vec{d}$.

1.  **Vector Equation of a Line:**
    The vector equation of line $L$ is given by:
    $$ \vec{r}(t) = \vec{r}_0 + t\vec{d} $$
    where $t$ is a scalar parameter, $t \in \mathbb{R}$.
    (Cf. Stewart, Calculus, 9e, §12.5)

2.  **Parametric Equations of a Line:**
    If $\vec{r} = \langle x, y, z \rangle$, $\vec{r}_0 = \langle x_0, y_0, z_0 \rangle$, and $\vec{d} = \langle a, b, c \rangle$, then the component form of the vector equation yields the parametric equations:
    $$ x = x_0 + at $$
    $$ y = y_0 + bt $$
    $$ z = z_0 + ct $$
    for $t \in \mathbb{R}$.
    (Cf. Lay, Lay, McDonald, Linear Algebra and Its Applications, 6e, §1.5)

3.  **Symmetric Equations of a Line:**
    If the direction numbers $a, b, c$ are all non-zero, we can eliminate the parameter $t$ from the parametric equations by solving for $t$ in each equation and setting the expressions equal:
    $$ \frac{x-x_0}{a} = \frac{y-y_0}{b} = \frac{z-z_0}{c} $$
    If one of the direction numbers is zero (e.g., $a=0$), the symmetric equations are written by stating the corresponding coordinate is constant and equating the remaining ratios (e.g., $x=x_0, \frac{y-y_0}{b} = \frac{z-z_0}{c}$).

### Planes in 3D Space

A **plane in three-dimensional space** is uniquely determined by a fixed point $P_0(x_0, y_0, z_0)$ on the plane and a non-zero vector $\vec{n} = \langle A, B, C \rangle$ that is orthogonal (normal) to the plane.

Let $\vec{r}_0$ be the position vector of $P_0$, i.e., $\vec{r}_0 = \langle x_0, y_0, z_0 \rangle$. Let $\vec{r}$ be the position vector of an arbitrary point $P(x, y, z)$ on the plane. Then the vector $\vec{r} - \vec{r}_0$ lies in the plane. Since $\vec{n}$ is normal to the plane, it must be orthogonal to any vector lying in the plane. Therefore, the dot product of $\vec{n}$ and $\vec{r} - \vec{r}_0$ must be zero.

1.  **Vector Equation of a Plane:**
    The vector equation of the plane is given by:
    $$ \vec{n} \cdot (\vec{r} - \vec{r}_0) = 0 $$
    (Cf. Stewart, Calculus, 9e, §12.5)

2.  **Scalar Equation of a Plane (Cartesian Equation):**
    Expanding the vector equation using $\vec{n} = \langle A, B, C \rangle$, $\vec{r} = \langle x, y, z \rangle$, and $\vec{r}_0 = \langle x_0, y_0, z_0 \rangle$:
    $$ \langle A, B, C \rangle \cdot \langle x-x_0, y-y_0, z-z_0 \rangle = 0 $$
    $$ A(x-x_0) + B(y-y_0) + C(z-z_0) = 0 $$
    This is often called the **scalar equation of the plane**.
    By expanding and collecting constant terms, we can write this in the general form:
    $$ Ax + By + Cz + D = 0 $$
    where $D = -(Ax_0 + By_0 + Cz_0)$. Note that the coefficients $A, B, C$ are the components of a normal vector to the plane.
    (Cf. Lay, Lay, McDonald, Linear Algebra and Its Applications, 6e, §4.2)

## 8. ASCII diagrams

```text
       ^ z
       |
       |
       |  P(x,y,z)
       | /
       |/
-------O-------------> y
      /|
     / |
    /  |
   /   |
  x    P0(x0,y0,z0)

  Diagram 1: Vector Equation of a Line

  - O is the origin (0,0,0).
  - P0 is a fixed point on the line, with position vector r0 (from O to P0).
  - P is any arbitrary point on the line, with position vector r (from O to P).
  - The vector d (direction vector) is parallel to the line.
  - The vector (r - r0) is the vector from P0 to P, which is parallel to d.
  - The line extends infinitely through P0 in the direction of d.

       ^ z
       |   Normal vector n = <A,B,C>
       |  /
       | /
       |/
-------O------------------> y
      / \
     /   \
    /     \
   x       Plane surface

  Diagram 2: Normal Vector to a Plane

  - The flat shaded area represents a plane.
  - The vector 'n' (normal vector) is perpendicular to the plane.
  - It points "straight out" of the plane. Its direction defines the orientation of the plane.
  - Any vector lying entirely within the plane would be orthogonal to 'n'.

       ^ z
       |   Normal vector n
       |  /
       | /
       |/
------ P0(x0,y0,z0) -----------> y
      /|   \
     / |    \
    /  |     P(x,y,z)
   x   |
       Vector (r - r0)
       lying IN the plane

  Diagram 3: Vector Equation of a Plane

  - P0 is a fixed point on the plane, with position vector r0.
  - P is any arbitrary point on the plane, with position vector r.
  - The vector (r - r0) is a vector from P0 to P, and thus lies entirely within the plane.
  - The normal vector 'n' is perpendicular to the plane, and therefore must be perpendicular to (r - r0).
  - This perpendicularity is expressed by their dot product being zero: n . (r - r0) = 0.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **For a Line:** Think of a **L**aser beam. You need a **L**aunch point (position vector $\vec{r}_0$) and a **L**aser direction (direction vector $\vec{d}$). The parameter $t$ is like a "time" variable, letting the laser beam travel for any amount of time to reach any point on the line.
        *   "**L**ine: **L**aunch **P**oint + **T**ime * **D**irection"
    *   **For a Plane:** Imagine a **P**ancake on a table. You need one **P**oint on the pancake ($\vec{r}_0$) and a **P**erpendicular **N**ormal vector ($\vec{n}$) sticking straight out of it. Any vector from your point to another point on the pancake $(\vec{r} - \vec{r}_0)$ must be perpendicular to the normal.
        *   "**P**lane: **N**ormal . (**P**oint - **P**ointOnPlane) = 0"

2.  **Formulas/Facts to Overlearn:**
    *   **Vector Equation of a Line:** $\vec{r}(t) = \vec{r}_0 + t\vec{d}$
    *   **Vector Equation of a Plane:** $\vec{n} \cdot (\vec{r} - \vec{r}_0) = 0$
    *   **Scalar Equation of a Plane:** $Ax + By + Cz + D = 0$ (and remember $\langle A,B,C \rangle$ is the normal vector)

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson and formulas: **1 day** from now.
    *   Review again: **3 days** from now.
    *   Review again: **7 days** from now.
    *   Review again: **16 days** from now.
    *   Review again: **35 days** from now.
    *   Actively try to re-derive the formulas and solve a few problems each time.

4.  **First-Principles Re-derivation Pathway:**
    *   **For a Line:**
        1.  Start with a known point $P_0$ (position vector $\vec{r}_0$) and a known direction $\vec{d}$.
        2.  Any other point $P$ on the line (position vector $\vec{r}$) will form a vector $\vec{P_0 P} = \vec{r} - \vec{r}_0$.
        3.  This vector $\vec{P_0 P}$ must be parallel to $\vec{d}$.
        4.  By definition of parallel vectors, $\vec{P_0 P} = t\vec{d}$ for some scalar $t$.
        5.  Substitute: $\vec{r} - \vec{r}_0 = t\vec{d}$.
        6.  Rearrange: $\vec{r}(t) = \vec{r}_0 + t\vec{d}$.
    *   **For a Plane:**
        1.  Start with a known point $P_0$ on the plane (position vector $\vec{r}_0$) and a known normal vector $\vec{n}$.
        2.  Any other point $P$ on the plane (position vector $\vec{r}$) will form a vector $\vec{P_0 P} = \vec{r} - \vec{r}_0$.
        3.  This vector $\vec{P_0 P}$ must lie entirely within the plane.
        4.  By definition, the normal vector $\vec{n}$ is perpendicular to *any* vector lying in the plane.
        5.  Therefore, their dot product must be zero: $\vec{n} \cdot (\vec{r} - \vec{r}_0) = 0$.

## 10. Connections — what this leads to

The vector equations of lines and planes are foundational concepts in linear algebra and multivariable calculus. Mastering them unlocks a wide array of subsequent topics:

1.  **Distances:** Calculating the distance between two points, a point and a line, a point and a plane, two parallel lines, two skew lines, or two parallel planes. These often involve projections and the geometric interpretation of dot and cross products.
2.  **Angles:** Determining the angle between two lines, two planes, or a line and a plane. This relies heavily on the dot product and the properties of normal vectors.
3.  **Intersections:** Finding the point(s) of intersection of lines with planes, lines with lines, or planes with planes (which results in a line, as seen in an example). This involves solving systems of linear equations derived from the vector/parametric/scalar forms.
4.  **Projections:** Projecting a point onto a line or a plane, or projecting a vector onto another vector. This is critical in many optimization problems and geometric algorithms.
5.  **Linear Transformations:** Understanding how matrices transform points, lines, and planes in space. Lines and planes are often the geometric objects used to visualize the effects of transformations like rotations, scaling, and shears.
6.  **Eigenvalues and Eigenvectors:** For certain linear transformations, lines (defined by eigenvectors) remain in their original direction, only scaled by a factor (eigenvalue). Planes can also be invariant under certain transformations.
7.  **Optimization (Constrained):** Many optimization problems involve finding the maximum or minimum of a function subject to constraints, where these constraints are often defined by planes (e.g., in linear programming, the feasible region is a polyhedron formed by intersecting planes).
8.  **Multivariable Calculus:**
    *   **Tangent Planes and Normal Lines:** These concepts are direct extensions. For a surface defined by $z = f(x,y)$, you'll learn to find the equation of the plane tangent to the surface at a given point and the line normal to the surface at that point.
    *   **Vector Fields and Flux:** Understanding how vector fields (like fluid flow or electric fields) interact with surfaces (planes or curved surfaces) requires a solid grasp of normal vectors and surface orientation.
    *   **Line and Surface Integrals:** These integrals are performed over paths (lines) and surfaces (planes or curved surfaces), and their setup often relies on parameterizing these geometric objects using the techniques learned here.

## 11. Self-check questions

1.  Find the vector equation and parametric equations of the line that passes through the point $(5, 1, 3)$ and is parallel to the vector $\langle -2, 4, 6 \rangle$.
2.  Determine the scalar equation of the plane that contains the point $(1, 2, -3)$ and has a normal vector $\vec{n} = \langle 4, -1, 2 \rangle$.
3.  Find the symmetric equations of the line passing through the points $(1, -1, 0)$ and $(2, 3, -4)$. Be careful if any direction numbers are zero.
4.  Find the scalar equation of the plane that passes through the three points $P(2, 0, 0)$, $Q(0, 3, 0)$, and $R(0, 0, 4)$.
5.  Find the vector equation of the line of intersection of the planes $2x - y + z = 1$ and $x + y - z = 2$.