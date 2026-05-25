## 1. What it is — in plain English

Imagine you have a toy car moving. Its "kinetic energy" is just a fancy physics term for the energy it has because it's moving. The faster it goes, the more kinetic energy it has; the heavier it is, the more kinetic energy it has. It’s the energy of motion.

Now, usually, we describe where things are using simple $x, y, z$ coordinates – like a grid in a video game. But sometimes, describing motion this way is clunky. Think about a swinging pendulum: its position is much easier to describe just by its angle from the vertical, rather than constantly tracking its $x$ and $y$ coordinates as it arcs. These "easier" ways to describe position (like an angle, or a length along a curve) are what we call "generalized coordinates."

"Kinetic energy in generalized coordinates" simply means finding that energy of motion when you're using these more convenient, often non-$x,y,z$ coordinates. It's about translating the familiar idea of motion energy into a language that better fits the specific type of movement you're observing.

So, instead of calculating energy based on how fast something is moving in $x$, $y$, and $z$ directions, we calculate it based on how fast its angle is changing, or how fast its length along a specific path is changing, or whatever other "generalized coordinate" we've chosen. It's the same energy, just expressed in a different, more natural mathematical form for the problem at hand.

## 2. Why it matters — real-world applications

Understanding kinetic energy in generalized coordinates is absolutely fundamental in advanced mechanics because it simplifies the analysis of complex systems, especially those with constraints.

1.  **Robotics and Automation:** Imagine a robotic arm with multiple joints. Each joint can rotate independently. Describing the end-effector's position in $x, y, z$ coordinates is incredibly complex, but describing the arm's configuration using the angles of each joint (generalized coordinates) is natural. Calculating the kinetic energy of the arm in terms of these joint angles and their angular velocities is crucial for designing control systems, planning trajectories, and ensuring smooth, energy-efficient movement. Companies like Boston Dynamics or ABB use this extensively in their robot design and control algorithms.

2.  **Aerospace Engineering (Satellite and Rocket Dynamics):** When designing a satellite or a multi-stage rocket, its orientation in space (attitude) is often described using angles (like Euler angles or quaternions), which are generalized coordinates. The kinetic energy associated with the rotation of the satellite or the separation of rocket stages is vital for trajectory optimization, attitude control systems, and ensuring stable flight. For example, calculating the kinetic energy of a spinning satellite in terms of its angular velocities around its principal axes helps engineers predict its stability and design thruster firing sequences for attitude adjustments. SpaceX's Falcon 9 landing, for instance, involves complex attitude control calculations that rely on these principles.

3.  **Molecular Dynamics and Material Science:** In simulating the behavior of molecules or crystal lattices, atoms are often constrained by chemical bonds. Instead of tracking the $x, y, z$ positions of every atom, it's often more efficient to describe their relative positions using bond lengths, bond angles, and dihedral angles (generalized coordinates). Calculating the kinetic energy of these systems in generalized coordinates allows researchers to simulate molecular vibrations, chemical reactions, and material properties, which is critical for drug discovery, material design, and understanding biological processes. Software like GROMACS or LAMMPS heavily utilizes these concepts.

4.  **Vehicle Dynamics and Suspension Design:** For designing car suspensions or analyzing the ride comfort of a train, engineers model the vehicle as a system of masses and springs. The motion of different parts (e.g., the car body, individual wheels) might be described by vertical displacements and rotational angles, which are generalized coordinates. Calculating the kinetic energy in terms of these coordinates helps in designing optimal suspension systems that absorb shocks efficiently and provide a comfortable ride, impacting companies like Ford, Mercedes-Benz, or Siemens (for trains).

## 3. Prerequisites — what you must know first

Before diving deep into kinetic energy in generalized coordinates, ensure you have a solid grasp of these foundational concepts:

*   **Newtonian Mechanics:** Understanding Newton's laws of motion ($\mathbf{F} = m\mathbf{a}$), concepts of force, mass, acceleration, and momentum.
*   **Kinetic Energy:** The basic definition of kinetic energy for a point mass, $T = \frac{1}{2}mv^2$, and for a system of particles, $T = \sum_i \frac{1}{2}m_i v_i^2$.
*   **Vectors and Vector Calculus:** How to represent position, velocity, and acceleration as vectors, and how to perform operations like dot products and cross products.
*   **Multivariable Calculus:**
    *   **Partial Derivatives:** How to differentiate a function with respect to one variable while holding others constant.
    *   **Chain Rule (Multivariable):** How to differentiate a composite function where the inner functions are themselves functions of multiple variables (e.g., if $f(x(t), y(t))$ then $\frac{df}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$). This is crucial.
*   **Coordinate Systems:** Familiarity with Cartesian (rectangular) coordinates $(x,y,z)$, and at least an introduction to curvilinear coordinates like polar $(r, \theta)$ and spherical $(r, \theta, \phi)$.
*   **Generalized Coordinates and Velocities:** The basic idea that we can describe the configuration of a system using a minimal set of independent variables (generalized coordinates, $q_j$) and their time derivatives (generalized velocities, $\dot{q}_j$).
*   **Constraints:** Understanding how constraints (like a particle fixed to a rod, or a bead on a wire) reduce the number of independent coordinates needed to describe a system.
*   **Holonomic vs. Non-holonomic Systems:** Knowing that holonomic constraints can be expressed as an equation relating coordinates and time, $f(q_1, ..., q_n, t) = 0$, while non-holonomic constraints cannot.

## 4. The core idea — step by step

The core idea is to transform the familiar expression for kinetic energy, which is naturally stated in Cartesian coordinates, into an equivalent expression using generalized coordinates. This involves a systematic application of the chain rule from multivariable calculus.

### Step 1: Start with Kinetic Energy in Cartesian Coordinates

**Plain-English Statement:** The energy of motion for a single particle is half its mass times the square of its speed. If we have multiple particles, we just add up their individual kinetic energies.

**Small Concrete Example:** Imagine a ball of mass $m=2 \text{ kg}$ moving in a straight line along the x-axis with a speed of $v_x = 3 \text{ m/s}$. Its kinetic energy is $T = \frac{1}{2} (2 \text{ kg}) (3 \text{ m/s})^2 = 9 \text{ J}$. If it's moving in 3D space with velocity components $(\dot{x}, \dot{y}, \dot{z})$, its speed squared is $\dot{x}^2 + \dot{y}^2 + \dot{z}^2$.

**Formal/Mathematical Version:** For a single particle of mass $m$, its kinetic energy $T$ is given by:
$$ T = \frac{1}{2} m v^2 = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2 + \dot{z}^2) $$
where $\dot{x} = dx/dt$, $\dot{y} = dy/dt$, and $\dot{z} = dz/dt$ are the components of the particle's velocity vector $\mathbf{v} = (\dot{x}, \dot{y}, \dot{z})$. More generally, using vector notation:
$$ T = \frac{1}{2} m \mathbf{v} \cdot \mathbf{v} $$
For a system of $N$ particles, the total kinetic energy is the sum of the kinetic energies of individual particles:
$$ T = \sum_{i=1}^N \frac{1}{2} m_i (\dot{x}_i^2 + \dot{y}_i^2 + \dot{z}_i^2) = \sum_{i=1}^N \frac{1}{2} m_i \mathbf{v}_i \cdot \mathbf{v}_i $$

**What Could Go Wrong:** A common mistake is to confuse position with velocity. Kinetic energy depends on the *speed* (velocity squared), not the *position*. So, it's $\dot{x}^2$, not $x^2$.

### Step 2: Express Cartesian Coordinates in Terms of Generalized Coordinates

**Plain-English Statement:** Instead of using $x, y, z$ to locate our particle, we're going to use a different set of coordinates, let's call them $q_1, q_2, ..., q_n$. These new coordinates might be angles, lengths along a curve, or some other convenient measures. We need to know how to translate from these new coordinates back to the familiar $x, y, z$. Also, sometimes the relationship between coordinates can change over time, even if the generalized coordinates themselves aren't changing.

**Small Concrete Example:** Consider a particle moving on a circle of radius $R$ in the $xy$-plane. We could use $x$ and $y$ coordinates, but it's much simpler to use just one angle, $\theta$, as our generalized coordinate. The relation is $x = R \cos\theta$ and $y = R \sin\theta$. Here, $q_1 = \theta$. If the circle itself were expanding or shrinking over time, then $R$ would also be a function of time, $R(t)$.

**Formal/Mathematical Version:** For a single particle, its Cartesian position vector $\mathbf{r} = (x, y, z)$ can be expressed as a function of the generalized coordinates $q_1, q_2, ..., q_n$ and possibly time $t$:
$$ \mathbf{r} = \mathbf{r}(q_1, q_2, ..., q_n, t) $$
Or, component-wise:
$$ x = x(q_1, q_2, ..., q_n, t) $$
$$ y = y(q_1, q_2, ..., q_n, t) $$
$$ z = z(q_1, q_2, ..., q_n, t) $$
For a system of $N$ particles, each particle's position $\mathbf{r}_i$ will be a function of the same set of generalized coordinates and time:
$$ \mathbf{r}_i = \mathbf{r}_i(q_1, q_2, ..., q_n, t) \quad \text{for } i=1, ..., N $$

**What Could Go Wrong:** Forgetting the explicit time dependence, $t$, in the coordinate transformation functions. This is crucial for *rheonomic* systems (where constraints explicitly depend on time), like a bead on a rotating rod. If the constraints are *scleronomic* (time-independent), then the explicit $t$ dependence disappears.

### Step 3: Find the Velocity in Generalized Coordinates

**Plain-English Statement:** To get the kinetic energy, we need the speed. Since our position is now described by generalized coordinates, we need to figure out how fast the particle is moving in $x, y, z$ terms, even though we're thinking in terms of $q$'s. This involves using the chain rule to relate how the $x, y, z$ coordinates change as the $q$'s change, and also how they might change if the system itself is moving or changing over time.

**Small Concrete Example:** For the particle on a circle, $x = R \cos\theta$ and $y = R \sin\theta$. To find its velocity components $\dot{x}$ and $\dot{y}$, we differentiate with respect to time $t$:
$\dot{x} = \frac{d}{dt}(R \cos\theta) = R (-\sin\theta) \dot{\theta}$
$\dot{y} = \frac{d}{dt}(R \sin\theta) = R (\cos\theta) \dot{\theta}$
Here, $\frac{\partial x}{\partial \theta} = -R\sin\theta$ and $\frac{\partial y}{\partial \theta} = R\cos\theta$. Since $R$ is constant and there's no explicit $t$ dependence in $x(\theta)$ or $y(\theta)$, the $\partial \mathbf{r}/\partial t$ term is zero.

**Formal/Mathematical Version:** We take the total time derivative of the position vector $\mathbf{r}(q_1, ..., q_n, t)$ using the multivariable chain rule:
$$ \mathbf{v} = \frac{d\mathbf{r}}{dt} = \sum_{j=1}^n \frac{\partial \mathbf{r}}{\partial q_j} \frac{dq_j}{dt} + \frac{\partial \mathbf{r}}{\partial t} $$
Using the notation $\dot{q}_j = dq_j/dt$ for generalized velocities:
$$ \mathbf{v} = \sum_{j=1}^n \frac{\partial \mathbf{r}}{\partial q_j} \dot{q}_j + \frac{\partial \mathbf{r}}{\partial t} $$
This expression gives the Cartesian velocity vector $\mathbf{v}$ in terms of the generalized coordinates $q_j$, generalized velocities $\dot{q}_j$, and time $t$. The term $\frac{\partial \mathbf{r}}{\partial t}$ accounts for any explicit time dependence in the coordinate transformation itself (rheonomic constraints). For scleronomic systems, $\frac{\partial \mathbf{r}}{\partial t} = \mathbf{0}$.

**What Could Go Wrong:** The most common error here is forgetting the $\frac{\partial \mathbf{r}}{\partial t}$ term. If your system has time-dependent constraints (e.g., a ramp that is moving), this term is non-zero and critical. Another mistake is confusing partial derivatives with total derivatives. $\frac{\partial \mathbf{r}}{\partial q_j}$ treats $q_k$ (for $k \neq j$) and $t$ as constants, while $\frac{d\mathbf{r}}{dt}$ accounts for all changes.

### Step 4: Substitute Velocity into the Kinetic Energy Formula

**Plain-English Statement:** Now that we have the particle's velocity expressed in terms of our generalized coordinates and their rates of change, we can plug this complicated velocity expression back into our simple kinetic energy formula ($1/2 m v^2$). This will give us the kinetic energy directly in terms of generalized coordinates and velocities.

**Small Concrete Example:** For the particle on a circle, we found $\dot{x} = -R \sin\theta \dot{\theta}$ and $\dot{y} = R \cos\theta \dot{\theta}$.
Then $v^2 = \dot{x}^2 + \dot{y}^2 = (-R \sin\theta \dot{\theta})^2 + (R \cos\theta \dot{\theta})^2$
$v^2 = R^2 \sin^2\theta \dot{\theta}^2 + R^2 \cos^2\theta \dot{\theta}^2 = R^2 \dot{\theta}^2 (\sin^2\theta + \cos^2\theta) = R^2 \dot{\theta}^2$.
So, the kinetic energy is $T = \frac{1}{2} m v^2 = \frac{1}{2} m R^2 \dot{\theta}^2$. This is much cleaner than using $x$ and $y$.

**Formal/Mathematical Version:** Substitute the expression for $\mathbf{v}$ from Step 3 into $T = \frac{1}{2} m \mathbf{v} \cdot \mathbf{v}$:
$$ T = \frac{1}{2} m \left( \sum_{j=1}^n \frac{\partial \mathbf{r}}{\partial q_j} \dot{q}_j + \frac{\partial \mathbf{r}}{\partial t} \right) \cdot \left( \sum_{k=1}^n \frac{\partial \mathbf{r}}{\partial q_k} \dot{q}_k + \frac{\partial \mathbf{r}}{\partial t} \right) $$
Expanding this dot product gives a quadratic form in generalized velocities. Let's denote $\mathbf{a}_j = \frac{\partial \mathbf{r}}{\partial q_j}$ and $\mathbf{a}_t = \frac{\partial \mathbf{r}}{\partial t}$.
$$ T = \frac{1}{2} m \left( \sum_j \mathbf{a}_j \dot{q}_j + \mathbf{a}_t \right) \cdot \left( \sum_k \mathbf{a}_k \dot{q}_k + \mathbf{a}_t \right) $$
$$ T = \frac{1}{2} m \left[ \sum_{j,k=1}^n \left( \frac{\partial \mathbf{r}}{\partial q_j} \cdot \frac{\partial \mathbf{r}}{\partial q_k} \right) \dot{q}_j \dot{q}_k + 2 \sum_{j=1}^n \left( \frac{\partial \mathbf{r}}{\partial q_j} \cdot \frac{\partial \mathbf{r}}{\partial t} \right) \dot{q}_j + \left( \frac{\partial \mathbf{r}}{\partial t} \cdot \frac{\partial \mathbf{r}}{\partial t} \right) \right] $$

**What Could Go Wrong:** Algebraic errors are very common here, especially when expanding the dot product of sums. Remember that $\left( \mathbf{A} + \mathbf{B} \right) \cdot \left( \mathbf{C} + \mathbf{D} \right) = \mathbf{A} \cdot \mathbf{C} + \mathbf{A} \cdot \mathbf{D} + \mathbf{B} \cdot \mathbf{C} + \mathbf{B} \cdot \mathbf{D}$. Also, don't forget the factor of 2 when cross-multiplying terms like $\mathbf{a}_j \dot{q}_j \cdot \mathbf{a}_t$.

### Step 5: Recognize the General Quadratic Form

**Plain-English Statement:** After all that algebra, the kinetic energy will always end up looking like a sum of terms where the generalized velocities are squared, plus terms where two different generalized velocities are multiplied together, plus terms where a single generalized velocity appears, and finally, terms that don't depend on any velocities at all. The coefficients in front of these terms can be complicated functions of the generalized coordinates and time.

**Small Concrete Example:** From the particle on a circle example, $T = \frac{1}{2} m R^2 \dot{\theta}^2$. This fits the form. Here, $q_1 = \theta$, and the coefficient $M_{11}$ (the "mass matrix" component) is $mR^2$. There are no terms with $\dot{q}_j$ (linear in velocity) or constant terms (independent of velocity), because it was a scleronomic system with only one degree of freedom.

**Formal/Mathematical Version:** The kinetic energy for a system of particles expressed in generalized coordinates always takes the general form:
$$ T(q, \dot{q}, t) = \frac{1}{2} \sum_{j,k=1}^n M_{jk}(q,t) \dot{q}_j \dot{q}_k + \sum_{j=1}^n N_j(q,t) \dot{q}_j + P(q,t) $$
Where:
*   $q$ represents the set of all generalized coordinates $(q_1, ..., q_n)$.
*   $\dot{q}$ represents the set of all generalized velocities $(\dot{q}_1, ..., \dot{q}_n)$.
*   $M_{jk}(q,t)$ are coefficients that depend on the generalized coordinates and time. They form a symmetric "generalized mass matrix" or "inertia tensor in generalized coordinates". Specifically, $M_{jk} = \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial q_j} \cdot \frac{\partial \mathbf{r}_i}{\partial q_k} \right)$.
*   $N_j(q,t)$ are coefficients that depend on the generalized coordinates and time. They arise from the interaction of generalized velocities with the explicit time dependence of the constraints. Specifically, $N_j = \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial q_j} \cdot \frac{\partial \mathbf{r}_i}{\partial t} \right)$.
*   $P(q,t)$ is a term that depends only on the generalized coordinates and time, not on the generalized velocities. It arises from the explicit time dependence of the constraints. Specifically, $P = \frac{1}{2} \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial t} \cdot \frac{\partial \mathbf{r}_i}{\partial t} \right)$.

For **scleronomic** systems (where constraints do not explicitly depend on time, i.e., $\frac{\partial \mathbf{r}_i}{\partial t} = \mathbf{0}$), the terms $N_j$ and $P$ are zero, and the kinetic energy simplifies to a homogeneous quadratic form in generalized velocities:
$$ T(q, \dot{q}) = \frac{1}{2} \sum_{j,k=1}^n M_{jk}(q) \dot{q}_j \dot{q}_k $$

**What Could Go Wrong:** Not recognizing this general form, or incorrectly identifying which terms belong to $M_{jk}$, $N_j$, or $P$. It's important to remember that $M_{jk}$ are coefficients of $\dot{q}_j \dot{q}_k$ (including $\dot{q}_j^2$ when $j=k$), $N_j$ are coefficients of $\dot{q}_j$, and $P$ is the "constant" term.

## 5. Worked examples — multiple, with every step shown

### Example 1: Particle in Polar Coordinates (Easy)

**Problem:** A particle of mass $m$ moves in a plane. Express its kinetic energy in plane polar coordinates $(r, \theta)$.

**Given:**
*   Mass of particle: $m$
*   Cartesian coordinates: $(x, y)$
*   Polar coordinates: $(r, \theta)$
*   Transformation equations: $x = r \cos\theta$, $y = r \sin\theta$

**We want:** Kinetic energy $T$ in terms of $r, \theta, \dot{r}, \dot{\theta}$.

**Solution:**

1.  **Start with Cartesian Kinetic Energy:**
    The kinetic energy in Cartesian coordinates is:
    $$ T = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2) $$
    *Explanation:* This is the fundamental definition of kinetic energy for a point mass.

2.  **Express Cartesian Coordinates in Generalized Coordinates:**
    We are given the transformation equations:
    $$ x = r \cos\theta $$
    $$ y = r \sin\theta $$
    *Explanation:* These equations relate the Cartesian position $(x, y)$ to the generalized coordinates $(r, \theta)$. Note that there is no explicit time dependence in these transformations, so $\frac{\partial \mathbf{r}}{\partial t} = \mathbf{0}$.

3.  **Find Velocities in Generalized Coordinates:**
    We need to find $\dot{x}$ and $\dot{y}$ by taking the total time derivative of $x$ and $y$ using the chain rule.
    $$ \dot{x} = \frac{d}{dt}(r \cos\theta) $$
    $$ \dot{x} = \frac{\partial x}{\partial r}\frac{dr}{dt} + \frac{\partial x}{\partial \theta}\frac{d\theta}{dt} $$
    $$ \dot{x} = (\cos\theta)\dot{r} + (-r \sin\theta)\dot{\theta} $$
    $$ \dot{x} = \dot{r}\cos\theta - r\dot{\theta}\sin\theta $$
    *Explanation:* We apply the product rule and chain rule. $r$ and $\theta$ are both functions of time, so we must differentiate both terms.

    Similarly for $\dot{y}$:
    $$ \dot{y} = \frac{d}{dt}(r \sin\theta) $$
    $$ \dot{y} = \frac{\partial y}{\partial r}\frac{dr}{dt} + \frac{\partial y}{\partial \theta}\frac{d\theta}{dt} $$
    $$ \dot{y} = (\sin\theta)\dot{r} + (r \cos\theta)\dot{\theta} $$
    $$ \dot{y} = \dot{r}\sin\theta + r\dot{\theta}\cos\theta $$
    *Explanation:* Same process as for $\dot{x}$.

4.  **Substitute Velocities into Kinetic Energy:**
    Now substitute $\dot{x}$ and $\dot{y}$ into the kinetic energy formula $T = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2)$:
    $$ T = \frac{1}{2} m \left[ (\dot{r}\cos\theta - r\dot{\theta}\sin\theta)^2 + (\dot{r}\sin\theta + r\dot{\theta}\cos\theta)^2 \right] $$
    *Explanation:* This is the direct substitution. Be careful with the algebra in the next step.

    Expand the squared terms:
    $$ (\dot{r}\cos\theta - r\dot{\theta}\sin\theta)^2 = \dot{r}^2\cos^2\theta - 2\dot{r}r\dot{\theta}\cos\theta\sin\theta + r^2\dot{\theta}^2\sin^2\theta $$
    $$ (\dot{r}\sin\theta + r\dot{\theta}\cos\theta)^2 = \dot{r}^2\sin^2\theta + 2\dot{r}r\dot{\theta}\sin\theta\cos\theta + r^2\dot{\theta}^2\cos^2\theta $$
    *Explanation:* We're expanding $(A-B)^2 = A^2 - 2AB + B^2$ and $(A+B)^2 = A^2 + 2AB + B^2$.

    Add these two expanded terms:
    $$ \dot{x}^2 + \dot{y}^2 = (\dot{r}^2\cos^2\theta - 2\dot{r}r\dot{\theta}\cos\theta\sin\theta + r^2\dot{\theta}^2\sin^2\theta) + (\dot{r}^2\sin^2\theta + 2\dot{r}r\dot{\theta}\sin\theta\cos\theta + r^2\dot{\theta}^2\cos^2\theta) $$
    Notice that the cross-terms cancel out: $-2\dot{r}r\dot{\theta}\cos\theta\sin\theta + 2\dot{r}r\dot{\theta}\sin\theta\cos\theta = 0$.
    $$ \dot{x}^2 + \dot{y}^2 = \dot{r}^2(\cos^2\theta + \sin^2\theta) + r^2\dot{\theta}^2(\sin^2\theta + \cos^2\theta) $$
    *Explanation:* Grouping terms by $\dot{r}^2$ and $r^2\dot{\theta}^2$.

    Using the identity $\cos^2\theta + \sin^2\theta = 1$:
    $$ \dot{x}^2 + \dot{y}^2 = \dot{r}^2(1) + r^2\dot{\theta}^2(1) = \dot{r}^2 + r^2\dot{\theta}^2 $$
    *Explanation:* This trigonometric identity simplifies the expression significantly.

    Finally, substitute this back into the kinetic energy formula:
    $$ T = \frac{1}{2} m (\dot{r}^2 + r^2\dot{\theta}^2) $$

**Final Answer:**
$$ \boxed{T = \frac{1}{2} m (\dot{r}^2 + r^2\dot{\theta}^2)} $$

**Reflection:** This example is straightforward because the coordinate transformation is simple and there's no explicit time dependence. The key is careful application of the chain rule and trigonometric identities. It clearly shows how $T$ becomes a quadratic form in generalized velocities $\dot{r}$ and $\dot{\theta}$.

---

### Example 2: Simple Pendulum (Medium)

**Problem:** A simple pendulum consists of a point mass $m$ attached to a rigid, massless rod of length $L$, which is pivoted at the origin and allowed to swing in a vertical plane. Express its kinetic energy in terms of the angle $\theta$ it makes with the vertical.

**Given:**
*   Mass of particle: $m$
*   Length of rod: $L$ (constant)
*   Generalized coordinate: $\theta$ (angle from the vertical)
*   Assume the pivot is at $(0,0)$ in the $xy$-plane.

**We want:** Kinetic energy $T$ in terms of $\theta, \dot{\theta}$.

**Solution:**

1.  **Start with Cartesian Kinetic Energy:**
    $$ T = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2) $$
    *Explanation:* As before, this is the basic definition.

2.  **Express Cartesian Coordinates in Generalized Coordinates:**
    Let's define the angle $\theta$ from the *downward* vertical axis, positive counter-clockwise.
    The Cartesian coordinates $(x, y)$ of the mass $m$ are:
    $$ x = L \sin\theta $$
    $$ y = L \cos\theta $$
    *Explanation:* The particle is constrained to move on a circle of radius $L$. The $x$ coordinate is $L \sin\theta$ (horizontal distance from vertical axis), and $y$ coordinate is $L \cos\theta$ (vertical distance from horizontal axis, measured downwards from pivot). Since $L$ is constant and there's no explicit $t$ dependence, $\frac{\partial \mathbf{r}}{\partial t} = \mathbf{0}$.

3.  **Find Velocities in Generalized Coordinates:**
    Differentiate $x$ and $y$ with respect to time $t$:
    $$ \dot{x} = \frac{d}{dt}(L \sin\theta) = L (\cos\theta) \dot{\theta} $$
    *Explanation:* $L$ is a constant. We use the chain rule: $\frac{d}{dt} \sin(\theta(t)) = \cos(\theta(t)) \frac{d\theta}{dt}$.

    $$ \dot{y} = \frac{d}{dt}(L \cos\theta) = L (-\sin\theta) \dot{\theta} $$
    *Explanation:* Similarly for $\cos\theta$.

4.  **Substitute Velocities into Kinetic Energy:**
    Substitute $\dot{x}$ and $\dot{y}$ into $T = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2)$:
    $$ T = \frac{1}{2} m \left[ (L\dot{\theta}\cos\theta)^2 + (-L\dot{\theta}\sin\theta)^2 \right] $$
    *Explanation:* Direct substitution.

    Expand the squared terms:
    $$ T = \frac{1}{2} m \left[ L^2\dot{\theta}^2\cos^2\theta + L^2\dot{\theta}^2\sin^2\theta \right] $$
    *Explanation:* Squaring each term.

    Factor out $L^2\dot{\theta}^2$:
    $$ T = \frac{1}{2} m L^2\dot{\theta}^2 (\cos^2\theta + \sin^2\theta) $$
    *Explanation:* Common factor extraction.

    Using the identity $\cos^2\theta + \sin^2\theta = 1$:
    $$ T = \frac{1}{2} m L^2\dot{\theta}^2 (1) $$
    $$ T = \frac{1}{2} m L^2\dot{\theta}^2 $$

**Final Answer:**
$$ \boxed{T = \frac{1}{2} m L^2\dot{\theta}^2} $$

**Reflection:** This example is a classic. It shows how the kinetic energy of rotational motion can be expressed very compactly in terms of angular velocity. The term $mL^2$ is the moment of inertia for a point mass rotating about an axis at distance $L$. This form is much simpler than using Cartesian coordinates and is a cornerstone of rotational dynamics.

---

### Example 3: Particle on a Rotating Rod (Harder - Rheonomic System)

**Problem:** A particle of mass $m$ slides without friction along a massless rod. The rod itself rotates in the $xy$-plane about a fixed origin with a constant angular velocity $\omega$. The position of the particle is described by its distance $s$ from the origin along the rod. Express the kinetic energy of the particle in terms of $s$, $\dot{s}$, and $\omega$.

**Given:**
*   Mass of particle: $m$
*   Generalized coordinate: $s$ (distance from origin along the rod)
*   Angular velocity of rod: $\omega$ (constant)
*   The angle of the rod with the $x$-axis is $\theta(t) = \omega t$ (assuming $\theta(0)=0$).

**We want:** Kinetic energy $T$ in terms of $s, \dot{s}, \omega$.

**Solution:**

1.  **Start with Cartesian Kinetic Energy:**
    $$ T = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2) $$
    *Explanation:* Standard definition.

2.  **Express Cartesian Coordinates in Generalized Coordinates (and time):**
    The particle's position $(x,y)$ is determined by its distance $s$ along the rod and the rod's angle $\theta$. Since the rod rotates with constant angular velocity $\omega$, its angle is $\theta = \omega t$.
    So, the transformation equations are:
    $$ x = s \cos(\omega t) $$
    $$ y = s \sin(\omega t) $$
    *Explanation:* Here, the transformation explicitly depends on time $t$ through the $\omega t$ term. This is a *rheonomic* system. Our generalized coordinate is $s$.

3.  **Find Velocities in Generalized Coordinates:**
    We need to find $\dot{x}$ and $\dot{y}$ by taking the total time derivative. Remember the chain rule for functions with explicit time dependence:
    $\frac{d}{dt} f(q(t), t) = \frac{\partial f}{\partial q} \frac{dq}{dt} + \frac{\partial f}{\partial t}$.
    For $x = s \cos(\omega t)$:
    $$ \dot{x} = \frac{\partial x}{\partial s}\frac{ds}{dt} + \frac{\partial x}{\partial t} $$
    $$ \frac{\partial x}{\partial s} = \cos(\omega t) $$
    $$ \frac{\partial x}{\partial t} = s (-\sin(\omega t)) \omega = -s\omega\sin(\omega t) $$
    So,
    $$ \dot{x} = \dot{s}\cos(\omega t) - s\omega\sin(\omega t) $$
    *Explanation:* We apply the chain rule. The first term is due to the change in $s$, and the second term is due to the rotation of the rod itself (explicit time dependence).

    For $y = s \sin(\omega t)$:
    $$ \dot{y} = \frac{\partial y}{\partial s}\frac{ds}{dt} + \frac{\partial y}{\partial t} $$
    $$ \frac{\partial y}{\partial s} = \sin(\omega t) $$
    $$ \frac{\partial y}{\partial t} = s (\cos(\omega t)) \omega = s\omega\cos(\omega t) $$
    So,
    $$ \dot{y} = \dot{s}\sin(\omega t) + s\omega\cos(\omega t) $$
    *Explanation:* Same process as for $\dot{x}$.

4.  **Substitute Velocities into Kinetic Energy:**
    Substitute $\dot{x}$ and $\dot{y}$ into $T = \frac{1}{2} m (\dot{x}^2 + \dot{y}^2)$:
    $$ T = \frac{1}{2} m \left[ (\dot{s}\cos(\omega t) - s\omega\sin(\omega t))^2 + (\dot{s}\sin(\omega t) + s\omega\cos(\omega t))^2 \right] $$
    *Explanation:* Direct substitution.

    Expand the squared terms:
    $$ (\dot{s}\cos(\omega t) - s\omega\sin(\omega t))^2 = \dot{s}^2\cos^2(\omega t) - 2\dot{s}s\omega\cos(\omega t)\sin(\omega t) + s^2\omega^2\sin^2(\omega t) $$
    $$ (\dot{s}\sin(\omega t) + s\omega\cos(\omega t))^2 = \dot{s}^2\sin^2(\omega t) + 2\dot{s}s\omega\sin(\omega t)\cos(\omega t) + s^2\omega^2\cos^2(\omega t) $$
    *Explanation:* Expanding $(A-B)^2$ and $(A+B)^2$.

    Add these two expanded terms:
    $$ \dot{x}^2 + \dot{y}^2 = (\dot{s}^2\cos^2(\omega t) - 2\dot{s}s\omega\cos(\omega t)\sin(\omega t) + s^2\omega^2\sin^2(\omega t)) $$
    $$ \quad \quad \quad + (\dot{s}^2\sin^2(\omega t) + 2\dot{s}s\omega\sin(\omega t)\cos(\omega t) + s^2\omega^2\cos^2(\omega t)) $$
    The cross-terms cancel out:
    $$ \dot{x}^2 + \dot{y}^2 = \dot{s}^2(\cos^2(\omega t) + \sin^2(\omega t)) + s^2\omega^2(\sin^2(\omega t) + \cos^2(\omega t)) $$
    *Explanation:* Grouping terms by $\dot{s}^2$ and $s^2\omega^2$.

    Using the identity $\cos^2(\omega t) + \sin^2(\omega t) = 1$:
    $$ \dot{x}^2 + \dot{y}^2 = \dot{s}^2(1) + s^2\omega^2(1) = \dot{s}^2 + s^2\omega^2 $$
    *Explanation:* Applying the trigonometric identity.

    Finally, substitute this back into the kinetic energy formula:
    $$ T = \frac{1}{2} m (\dot{s}^2 + s^2\omega^2) $$

**Final Answer:**
$$ \boxed{T = \frac{1}{2} m (\dot{s}^2 + s^2\omega^2)} $$

**Reflection:** This example highlights a *rheonomic* system where the constraints (the rotating rod) explicitly depend on time. Notice that the kinetic energy now has a term $P = \frac{1}{2} m s^2 \omega^2$ which does not depend on the generalized velocity $\dot{s}$. This term arises directly from the explicit time dependence in the coordinate transformation. If we had chosen $\theta$ as a generalized coordinate instead of fixing it to $\omega t$, the problem would look different, and this term would be part of the quadratic form.

---

### Example 4: Double Pendulum (Hardest)

**Problem:** A double pendulum consists of two point masses $m_1$ and $m_2$ connected by two massless rigid rods of lengths $L_1$ and $L_2$. The first rod is pivoted at the origin, and the second rod is pivoted at the end of the first rod. Both pendulums swing in a vertical plane. Express the total kinetic energy of the system in terms of the angles $\theta_1$ and $\theta_2$ that the rods make with the downward vertical.

**Given:**
*   Masses: $m_1, m_2$
*   Lengths: $L_1, L_2$
*   Generalized coordinates: $\theta_1, \theta_2$ (angles from downward vertical)

**We want:** Total kinetic energy $T$ in terms of $\theta_1, \theta_2, \dot{\theta}_1, \dot{\theta}_2$.

**Solution:**

1.  **Start with Cartesian Kinetic Energy for Each Mass:**
    The total kinetic energy is the sum of the kinetic energies of $m_1$ and $m_2$:
    $$ T = T_1 + T_2 = \frac{1}{2} m_1 (\dot{x}_1^2 + \dot{y}_1^2) + \frac{1}{2} m_2 (\dot{x}_2^2 + \dot{y}_2^2) $$
    *Explanation:* This is the principle of superposition for kinetic energy of a system of particles.

2.  **Express Cartesian Coordinates in Generalized Coordinates:**
    The coordinates of $m_1$:
    $$ x_1 = L_1 \sin\theta_1 $$
    $$ y_1 = L_1 \cos\theta_1 $$
    *Explanation:* Similar to the simple pendulum, $m_1$ is at the end of rod $L_1$.

    The coordinates of $m_2$:
    The position of $m_2$ depends on the position of $m_1$ *and* the angle $\theta_2$.
    $$ x_2 = x_1 + L_2 \sin\theta_2 = L_1 \sin\theta_1 + L_2 \sin\theta_2 $$
    $$ y_2 = y_1 + L_2 \cos\theta_2 = L_1 \cos\theta_1 + L_2 \cos\theta_2 $$
    *Explanation:* The coordinates of $m_2$ are the coordinates of the pivot of the second rod ($x_1, y_1$) plus the relative coordinates of $m_2$ with respect to that pivot ($L_2 \sin\theta_2, L_2 \cos\theta_2$).

3.  **Find Velocities in Generalized Coordinates:**
    Differentiate $x_1, y_1, x_2, y_2$ with respect to time $t$. Both $\theta_1$ and $\theta_2$ are functions of time.
    For $m_1$:
    $$ \dot{x}_1 = \frac{d}{dt}(L_1 \sin\theta_1) = L_1 \cos\theta_1 \dot{\theta}_1 $$
    $$ \dot{y}_1 = \frac{d}{dt}(L_1 \cos\theta_1) = -L_1 \sin\theta_1 \dot{\theta}_1 $$
    *Explanation:* Standard chain rule application for $m_1$.

    For $m_2$:
    $$ \dot{x}_2 = \frac{d}{dt}(L_1 \sin\theta_1 + L_2 \sin\theta_2) = L_1 \cos\theta_1 \dot{\theta}_1 + L_2 \cos\theta_2 \dot{\theta}_2 $$
    $$ \dot{y}_2 = \frac{d}{dt}(L_1 \cos\theta_1 + L_2 \cos\theta_2) = -L_1 \sin\theta_1 \dot{\theta}_1 - L_2 \sin\theta_2 \dot{\theta}_2 $$
    *Explanation:* Each term involving $\theta_1$ or $\theta_2$ is differentiated using the chain rule.

4.  **Substitute Velocities into Kinetic Energy:**
    Now we need to calculate $\dot{x}_1^2 + \dot{y}_1^2$ and $\dot{x}_2^2 + \dot{y}_2^2$.

    For $m_1$:
    $$ \dot{x}_1^2 + \dot{y}_1^2 = (L_1 \cos\theta_1 \dot{\theta}_1)^2 + (-L_1 \sin\theta_1 \dot{\theta}_1)^2 $$
    $$ = L_1^2 \dot{\theta}_1^2 \cos^2\theta_1 + L_1^2 \dot{\theta}_1^2 \sin^2\theta_1 $$
    $$ = L_1^2 \dot{\theta}_1^2 (\cos^2\theta_1 + \sin^2\theta_1) = L_1^2 \dot{\theta}_1^2 $$
    Thus, $T_1 = \frac{1}{2} m_1 L_1^2 \dot{\theta}_1^2$.
    *Explanation:* This is identical to the simple pendulum case.

    For $m_2$: This is where it gets complex.
    $$ \dot{x}_2^2 = (L_1 \cos\theta_1 \dot{\theta}_1 + L_2 \cos\theta_2 \dot{\theta}_2)^2 $$
    $$ = L_1^2 \cos^2\theta_1 \dot{\theta}_1^2 + L_2^2 \cos^2\theta_2 \dot{\theta}_2^2 + 2 L_1 L_2 \cos\theta_1 \cos\theta_2 \dot{\theta}_1 \dot{\theta}_2 $$
    *Explanation:* Expanding $(A+B)^2 = A^2 + B^2 + 2AB$.

    $$ \dot{y}_2^2 = (-L_1 \sin\theta_1 \dot{\theta}_1 - L_2 \sin\theta_2 \dot{\theta}_2)^2 $$
    $$ = (L_1 \sin\theta_1 \dot{\theta}_1 + L_2 \sin\theta_2 \dot{\theta}_2)^2 $$
    $$ = L_1^2 \sin^2\theta_1 \dot{\theta}_1^2 + L_2^2 \sin^2\theta_2 \dot{\theta}_2^2 + 2 L_1 L_2 \sin\theta_1 \sin\theta_2 \dot{\theta}_1 \dot{\theta}_2 $$
    *Explanation:* Note that $(-A-B)^2 = (A+B)^2$. Expanding this again.

    Now sum $\dot{x}_2^2 + \dot{y}_2^2$:
    $$ \dot{x}_2^2 + \dot{y}_2^2 = (L_1^2 \cos^2\theta_1 \dot{\theta}_1^2 + L_2^2 \cos^2\theta_2 \dot{\theta}_2^2 + 2 L_1 L_2 \cos\theta_1 \cos\theta_2 \dot{\theta}_1 \dot{\theta}_2) $$
    $$ \quad \quad \quad + (L_1^2 \sin^2\theta_1 \dot{\theta}_1^2 + L_2^2 \sin^2\theta_2 \dot{\theta}_2^2 + 2 L_1 L_2 \sin\theta_1 \sin\theta_2 \dot{\theta}_1 \dot{\theta}_2) $$
    Group terms:
    $$ = L_1^2 \dot{\theta}_1^2 (\cos^2\theta_1 + \sin^2\theta_1) + L_2^2 \dot{\theta}_2^2 (\cos^2\theta_2 + \sin^2\theta_2) $$
    $$ \quad + 2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 (\cos\theta_1 \cos\theta_2 + \sin\theta_1 \sin\theta_2) $$
    *Explanation:* Grouping terms by $\dot{\theta}_1^2$, $\dot{\theta}_2^2$, and $\dot{\theta}_1 \dot{\theta}_2$.

    Use trigonometric identities ($\cos^2\alpha + \sin^2\alpha = 1$ and $\cos\alpha \cos\beta + \sin\alpha \sin\beta = \cos(\alpha - \beta)$):
    $$ = L_1^2 \dot{\theta}_1^2 (1) + L_2^2 \dot{\theta}_2^2 (1) + 2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2) $$
    $$ = L_1^2 \dot{\theta}_1^2 + L_2^2 \dot{\theta}_2^2 + 2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2) $$
    Thus, $T_2 = \frac{1}{2} m_2 (L_1^2 \dot{\theta}_1^2 + L_2^2 \dot{\theta}_2^2 + 2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2))$.
    *Explanation:* This is the full velocity squared for $m_2$. Notice the cross-term $\dot{\theta}_1 \dot{\theta}_2$, which is characteristic of coupled systems.

5.  **Calculate Total Kinetic Energy:**
    $$ T = T_1 + T_2 $$
    $$ T = \frac{1}{2} m_1 L_1^2 \dot{\theta}_1^2 + \frac{1}{2} m_2 (L_1^2 \dot{\theta}_1^2 + L_2^2 \dot{\theta}_2^2 + 2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2)) $$
    Combine terms with $\dot{\theta}_1^2$:
    $$ T = \frac{1}{2} (m_1 L_1^2 + m_2 L_1^2) \dot{\theta}_1^2 + \frac{1}{2} m_2 L_2^2 \dot{\theta}_2^2 + m_2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2) $$

**Final Answer:**
$$ \boxed{T = \frac{1}{2} (m_1 + m_2) L_1^2 \dot{\theta}_1^2 + \frac{1}{2} m_2 L_2^2 \dot{\theta}_2^2 + m_2 L_1 L_2 \cos(\theta_1 - \theta_2) \dot{\theta}_1 \dot{\theta}_2} $$

**Reflection:** This is a significantly more complex example, showcasing the quadratic form with cross-terms (i.e., $M_{12}$ and $M_{21}$ are non-zero). The term $m_2 L_1 L_2 \cos(\theta_1 - \theta_2) \dot{\theta}_1 \dot{\theta}_2$ represents the coupling between the two pendulums. The coefficients $M_{jk}$ are functions of the generalized coordinates $\theta_1, \theta_2$. This result is crucial for deriving the equations of motion for a double pendulum using the Lagrangian formalism, which is known for its chaotic behavior. The algebraic steps require careful attention to detail.

## 6. Common mistakes and traps

1.  **Forgetting the Chain Rule for Time Dependence ($\partial \mathbf{r}/\partial t$):** This is the most frequent error, especially in rheonomic systems. Students often only consider $\sum_j \frac{\partial \mathbf{r}}{\partial q_j} \dot{q}_j$ and omit the term arising from explicit time dependence in the coordinate transformation.
2.  **Algebraic Errors in Squaring Velocities and Dot Products:** Expanding $(\sum A_j)^2$ or $(\sum A_j) \cdot (\sum B_k)$ can be tedious and prone to mistakes. Forgetting the factor of 2 in cross-terms (e.g., $2AB$ from $(A+B)^2$) is common.
3.  **Incorrectly Identifying Generalized Coordinates:** Choosing too many (redundant) or too few (incomplete) generalized coordinates, or choosing coordinates that are not truly independent. This leads to incorrect degrees of freedom or unmanageable equations.
4.  **Mixing Coordinate Systems:** Inconsistently using components from different coordinate systems (e.g., mixing polar velocity components with Cartesian position components). Stick to expressing all positions in Cartesian first, then converting to generalized velocities.
5.  **Assuming Coefficients are Constant:** The coefficients $M_{jk}$, $N_j$, and $P$ in the general kinetic energy expression are often functions of the generalized coordinates $q_j$ and sometimes time $t$. Treating them as constants (like $m$ or $L$) can lead to incorrect results.
6.  **Confusing Velocity Components with Position Components:** Forgetting that kinetic energy depends on the *time derivatives* of position (velocities), not the positions themselves. For example, using $x^2$ instead of $\dot{x}^2$.

## 7. Textbook-precise explanation

The kinetic energy of a system of $N$ particles, each with mass $m_i$ and position vector $\mathbf{r}_i$, is given by:
$$ T = \sum_{i=1}^N \frac{1}{2} m_i \mathbf{v}_i \cdot \mathbf{v}_i $$
where $\mathbf{v}_i = d\mathbf{r}_i/dt$ is the velocity of the $i$-th particle.

In analytical mechanics, it is often convenient to describe the configuration of a system using a set of $n$ independent **generalized coordinates** $q_1, q_2, \ldots, q_n$. The Cartesian position vector of each particle $\mathbf{r}_i$ can then be expressed as a function of these generalized coordinates and, potentially, time $t$:
$$ \mathbf{r}_i = \mathbf{r}_i(q_1, q_2, \ldots, q_n, t) $$
These relations define the constraints on the system. If the constraints explicitly depend on time, the system is **rheonomic**; otherwise, it is **scleronomic**.

To express the kinetic energy in terms of generalized coordinates and velocities, we first find the velocity $\mathbf{v}_i$ by taking the total time derivative of $\mathbf{r}_i$. Using the multivariable chain rule:
$$ \mathbf{v}_i = \frac{d\mathbf{r}_i}{dt} = \sum_{j=1}^n \frac{\partial \mathbf{r}_i}{\partial q_j} \dot{q}_j + \frac{\partial \mathbf{r}_i}{\partial t} $$
where $\dot{q}_j = dq_j/dt$ are the **generalized velocities**.

Substituting this expression for $\mathbf{v}_i$ into the kinetic energy formula:
$$ T = \sum_{i=1}^N \frac{1}{2} m_i \left( \sum_{j=1}^n \frac{\partial \mathbf{r}_i}{\partial q_j} \dot{q}_j + \frac{\partial \mathbf{r}_i}{\partial t} \right) \cdot \left( \sum_{k=1}^n \frac{\partial \mathbf{r}_i}{\partial q_k} \dot{q}_k + \frac{\partial \mathbf{r}_i}{\partial t} \right) $$
Expanding the dot product, the kinetic energy takes on a general quadratic form in the generalized velocities:
$$ T(q, \dot{q}, t) = \frac{1}{2} \sum_{j,k=1}^n M_{jk}(q,t) \dot{q}_j \dot{q}_k + \sum_{j=1}^n N_j(q,t) \dot{q}_j + P(q,t) $$
The coefficients are defined as:
*   **Generalized Mass Tensor (or Inertia Tensor):**
    $$ M_{jk}(q,t) = \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial q_j} \cdot \frac{\partial \mathbf{r}_i}{\partial q_k} \right) $$
    This is a symmetric matrix, i.e., $M_{jk} = M_{kj}$. The first term in $T$ is a homogeneous quadratic function of the generalized velocities.
*   **Linear Velocity Coefficient:**
    $$ N_j(q,t) = \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial q_j} \cdot \frac{\partial \mathbf{r}_i}{\partial t} \right) $$
    This term is linear in the generalized velocities.
*   **Velocity-Independent Term:**
    $$ P(q,t) = \frac{1}{2} \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial t} \cdot \frac{\partial \mathbf{r}_i}{\partial t} \right) $$
    This term is independent of the generalized velocities.

For **scleronomic systems**, where $\frac{\partial \mathbf{r}_i}{\partial t} = \mathbf{0}$ for all $i$, the terms $N_j$ and $P$ vanish, and the kinetic energy simplifies to a homogeneous quadratic function of the generalized velocities:
$$ T(q, \dot{q}) = \frac{1}{2} \sum_{j,k=1}^n M_{jk}(q) \dot{q}_j \dot{q}_k $$
In this case, $M_{jk}(q) = \sum_{i=1}^N m_i \left( \frac{\partial \mathbf{r}_i}{\partial q_j} \cdot \frac{\partial \mathbf{r}_i}{\partial q_k} \right)$.

This formulation is foundational for Lagrangian mechanics, where the Lagrangian $L = T - V$ (Kinetic Energy - Potential Energy) is used to derive the equations of motion.

*References:
*   Goldstein, H., Poole, C. P., & Safko, J. L. (2002). *Classical Mechanics* (3rd ed.). Addison