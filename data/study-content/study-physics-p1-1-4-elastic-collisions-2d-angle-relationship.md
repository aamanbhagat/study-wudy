## 1. What it is — in plain English

Imagine you're playing pool or air hockey. You hit one ball (or puck) with another. What happens? They zoom off in different directions! An "elastic collision" means they bounce off each other perfectly, without losing any of their "bounciness" or "speed-energy" to things like heat, sound, or squishing. Think of two super-bouncy rubber balls hitting each other – no dents, just a perfect rebound.

Now, "2D" just means the action happens on a flat surface, like a pool table, not just in a straight line. So, the balls can go left, right, up, or down, not just back and forth.

The "angle relationship" part is about figuring out *which way* the balls will go after they hit. If you know how fast and in what direction they were moving *before* the collision, and you know their masses, we can use some physics rules to predict their speeds and the exact angles they'll fly off at *after* the collision. It's like being able to predict the outcome of a pool shot before you even take it!

The key idea is that the total "push" (momentum) and the total "motion-energy" (kinetic energy) of the system of balls remain exactly the same before and after the hit, even though they get transferred between the individual balls. This allows us to calculate those tricky angles.

## 2. Why it matters — real-world applications

Understanding 2D elastic collisions and their angle relationships is more than just a pool table trick. It's fundamental to many areas of science and engineering:

1.  **Nuclear Physics and Particle Accelerators:** When scientists want to understand what's inside an atom or discover new fundamental particles, they smash them together at incredibly high speeds. By observing the angles and speeds at which the resulting particles scatter (collide elastically), physicists can deduce properties like mass, charge, and even internal structure. Ernest Rutherford's famous gold foil experiment, which revealed the atomic nucleus, relied heavily on analyzing the scattering angles of alpha particles. Modern particle accelerators like the Large Hadron Collider use these principles to detect and characterize new particles.

2.  **Robotics and Autonomous Systems:** Imagine a self-driving car or a factory robot. If it accidentally bumps into another object (or another robot), understanding elastic collision physics helps predict its post-collision trajectory. This is crucial for designing robust collision avoidance systems and for ensuring that if a collision *does* occur, the system can predict the outcome to minimize damage or disruption, or even to use the collision to achieve a desired maneuver (e.g., in robotic soccer).

3.  **Aerospace and Orbital Mechanics (Gravity Assist Maneuvers):** While not a direct "collision" in the sense of two objects physically touching, the principle of momentum transfer and angle changes is critical for "gravity assist" maneuvers, also known as planetary slingshots. A spacecraft flies close to a planet, using the planet's gravitational pull and orbital motion to gain or lose speed and change direction, effectively "bouncing" off the planet's gravitational field. This elastic-like interaction conserves the total momentum and energy of the spacecraft-planet system, allowing missions like Voyager to travel across the solar system using minimal fuel.

4.  **Sports Science and Engineering:** From the impact of a golf club on a ball, a tennis racket on a ball, to the collision of billiard balls, the physics of elastic collisions at various angles determines the outcome. Sports equipment designers use this knowledge to optimize materials and designs for maximum performance, spin, and trajectory control. For instance, understanding the coefficient of restitution (a measure of "bounciness") and angle of impact helps design golf club faces that impart specific spin and launch angles.

## 3. Prerequisites — what you must know first

Before diving deep into 2D elastic collisions, ensure you have a solid grasp of these foundational concepts:

*   **Vectors:** Quantities with both magnitude (size) and direction. You must be comfortable representing vectors, breaking them into $x$ and $y$ components, and performing vector addition and subtraction.
*   **Momentum ($\vec{p}$):** Defined as the product of an object's mass and its velocity ($\vec{p} = m\vec{v}$). It's a vector quantity.
*   **Conservation of Momentum:** The principle that the total momentum of an isolated system (one not acted upon by external forces) remains constant. This applies to both the total vector momentum and its individual $x$ and $y$ components.
*   **Kinetic Energy ($KE$):** Defined as the energy an object possesses due to its motion ($KE = \frac{1}{2}mv^2$). It's a scalar quantity (only magnitude, no direction).
*   **Conservation of Kinetic Energy (for Elastic Collisions):** The principle that the total kinetic energy of an isolated system remains constant *only* if the collision is elastic.
*   **Trigonometry:** Understanding sine, cosine, and tangent functions, their inverses, and how to use them to resolve vectors into components and to find angles from components.
*   **Algebra:** Proficiency in solving systems of linear and quadratic equations. You'll often end up with multiple equations and multiple unknowns.

If any of these sound unfamiliar, pause here and review them thoroughly. They are the bedrock upon which this topic is built.

## 4. The core idea — step by step

The core idea behind solving 2D elastic collision problems is to apply the conservation laws of momentum and kinetic energy in two dimensions. This generates a system of equations that can be solved for unknown velocities and angles.

### Step 1: Define the System and Coordinate System

*   **Plain-English Statement:** Before you do anything else, clearly identify the objects involved in the collision. Then, imagine a grid (an $x-y$ coordinate system) over your collision scene. This grid will help you describe the direction of motion for everything.
*   **Small Concrete Example:** You have two billiard balls, $m_1$ and $m_2$. Ball $m_1$ is moving horizontally to the right. Ball $m_2$ is initially at rest. A good coordinate system would have the positive $x$-axis pointing to the right (the initial direction of $m_1$) and the positive $y$-axis pointing upwards.
*   **Formal/Mathematical Version:**
    *   Identify masses $m_1, m_2$.
    *   Define initial velocities: $\vec{v}_{1i}, \vec{v}_{2i}$.
    *   Define final velocities: $\vec{v}_{1f}, \vec{v}_{2f}$.
    *   Establish a Cartesian coordinate system (e.g., $x$ horizontal, $y$ vertical).
    *   Express all initial and final velocity vectors in terms of their $x$ and $y$ components and angles relative to the chosen axes. For example, $\vec{v}_{1i} = v_{1ix} \hat{i} + v_{1iy} \hat{j}$.
*   **What Could Go Wrong:** Not being consistent with your chosen coordinate system. If you say "right is positive $x$" for one vector, it must be positive $x$ for all vectors. Also, make sure to correctly interpret angles (e.g., an angle below the x-axis typically means a negative y-component).

### Step 2: Apply Conservation of Momentum (Vectorially)

*   **Plain-English Statement:** The total "oomph" (momentum) of the entire system of objects *before* they hit is exactly the same as the total "oomph" *after* they hit. This "oomph" has both a size and a direction.
*   **Small Concrete Example:** If a heavy bowling ball hits a light tennis ball, the bowling ball slows down, and the tennis ball speeds up a lot. But if you add up the momentum of both balls before and after, considering their directions, the total will be the same.
*   **Formal/Mathematical Version:**
    $$ \vec{p}_{total, i} = \vec{p}_{total, f} $$
    $$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = m_1 \vec{v}_{1f} + m_2 \vec{v}_{2f} $$
    This is a single vector equation.
*   **What Could Go Wrong:** Forgetting that momentum is a vector. You can't just add up the magnitudes; directions *must* be considered.

### Step 3: Apply Conservation of Momentum (Component Form)

*   **Plain-English Statement:** Because momentum is a vector, we can break it down into its horizontal ($x$) and vertical ($y$) parts. The total horizontal "oomph" before is conserved, and the total vertical "oomph" before is also conserved, independently.
*   **Small Concrete Example:** If your initial setup has all motion purely in the $x$-direction, then the total $y$-momentum is initially zero. After the collision, the individual objects might have $y$-components of momentum, but they must cancel out so that the *total* $y$-momentum remains zero. One object goes up, the other must go down with equal and opposite $y$-momentum.
*   **Formal/Mathematical Version:** We convert the single vector equation from Step 2 into two scalar equations:
    *   **x-component:**
        $$ m_1 v_{1ix} + m_2 v_{2ix} = m_1 v_{1fx} + m_2 v_{2fx} $$
    *   **y-component:**
        $$ m_1 v_{1iy} + m_2 v_{2iy} = m_1 v_{1fy} + m_2 v_{2fy} $$
    Remember that $v_x = v \cos \theta$ and $v_y = v \sin \theta$, where $v$ is the speed and $\theta$ is the angle relative to the positive x-axis.
*   **What Could Go Wrong:** Incorrectly resolving velocities into components (e.g., using sine instead of cosine, or getting the sign wrong for angles in different quadrants).

### Step 4: Apply Conservation of Kinetic Energy (Scalar)

*   **Plain-English Statement:** Since this is an *elastic* collision, no "motion-energy" is lost to heat, sound, or deformation. The total amount of "motion-energy" (kinetic energy) before the collision is exactly the same as the total amount after. This energy doesn't have a direction.
*   **Small Concrete Example:** If you have two perfectly bouncy balls, their combined "bounciness" is the same before and after they hit.
*   **Formal/Mathematical Version:**
    $$ KE_{total, i} = KE_{total, f} $$
    $$ \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 $$
    Here, $v_{1i}^2$ is the square of the *speed* of object 1 before collision, which is $v_{1ix}^2 + v_{1iy}^2$. Similarly for other terms.
*   **What Could Go Wrong:** Accidentally using velocity components instead of the overall speed squared, or forgetting the $\frac{1}{2}$ (though it often cancels out). The biggest error is applying this to an *inelastic* collision.

### Step 5: The Angle Relationship (Special Case: Equal Masses, One Initially at Rest)

*   **Plain-English Statement:** This is a super cool and important special case! If two objects of *exactly the same mass* collide elastically, and one of them was *initially sitting still*, then after the collision, they will always fly off at a 90-degree angle to each other (unless it's a head-on collision, in which case the moving ball stops and the resting ball moves off with the initial velocity).
*   **Small Concrete Example:** A cue ball (mass $m$) hits a stationary object ball (also mass $m$) on a pool table. If the cue ball doesn't hit it dead center, both balls will go off at an angle. If you measure the angle between their paths, it will be $90^\circ$.
*   **Formal/Mathematical Version:** For an elastic collision where $m_1 = m_2 = m$ and $\vec{v}_{2i} = 0$:
    $$ \theta_1 + \theta_2 = 90^\circ $$
    where $\theta_1$ and $\theta_2$ are the angles of the final velocity vectors $\vec{v}_{1f}$ and $\vec{v}_{2f}$ relative to the initial direction of $\vec{v}_{1i}$. This can be derived by taking the dot product of the momentum conservation equation with itself and substituting the energy conservation equation.
*   **What Could Go Wrong:** Applying this $90^\circ$ rule when the masses are *not* equal, or when *both* objects are initially moving. It's a very specific condition!

### Step 6: Solving the System

*   **Plain-English Statement:** Now you have three equations (two from momentum components, one from kinetic energy). You'll typically have 3 or 4 unknowns (like the final speeds and angles of both objects). Use your algebra skills to solve for these unknowns. This is often the most mathematically intensive part.
*   **Small Concrete Example:** You might have equations like:
    $m_1 v_{1i} = m_1 v_{1f} \cos \theta_1 + m_2 v_{2f} \cos \theta_2$
    $0 = m_1 v_{1f} \sin \theta_1 + m_2 v_{2f} \sin \theta_2$
    $\frac{1}{2}m_1 v_{1i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$
    You then solve for $v_{1f}, v_{2f}, \theta_1, \theta_2$.
*   **Formal/Mathematical Version:** This involves substitution, squaring equations, and potentially using trigonometric identities. It's a system of nonlinear equations.
*   **What Could Go Wrong:** Algebraic errors, sign errors, or getting lost in the complexity of the equations. It's crucial to be organized and methodical. Sometimes, there are more unknowns than equations, meaning you need more information (e.g., one of the final angles).

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify your understanding.

### Example 1: Equal Masses, One at Rest

**Problem:** A billiard ball ($m_1 = 0.17 \text{ kg}$) moving at $v_{1i} = 2.0 \text{ m/s}$ in the positive x-direction strikes an identical billiard ball ($m_2 = 0.17 \text{ kg}$) initially at rest. After the elastic collision, the first ball moves off at an angle of $\theta_1 = 30^\circ$ above the positive x-axis. Find the final speed of the first ball ($v_{1f}$), the final speed of the second ball ($v_{2f}$), and the angle ($\theta_2$) at which the second ball moves.

**Given:**
*   $m_1 = 0.17 \text{ kg}$
*   $m_2 = 0.17 \text{ kg}$
*   $v_{1i} = 2.0 \text{ m/s}$
*   $v_{2i} = 0 \text{ m/s}$
*   $\theta_1 = 30^\circ$
*   Collision is elastic.

**Want:** $v_{1f}$, $v_{2f}$, $\theta_2$.

---

**Step 1: Set up the Coordinate System and Initial/Final States**
We'll use a standard Cartesian coordinate system. The initial direction of $m_1$ is along the positive x-axis.
Initial velocities:
$\vec{v}_{1i} = (v_{1i}, 0) = (2.0 \text{ m/s}, 0 \text{ m/s})$
$\vec{v}_{2i} = (0, 0)$

Final velocities:
$\vec{v}_{1f} = (v_{1f} \cos \theta_1, v_{1f} \sin \theta_1) = (v_{1f} \cos 30^\circ, v_{1f} \sin 30^\circ)$
$\vec{v}_{2f} = (v_{2f} \cos \theta_2, v_{2f} \sin \theta_2)$ (We expect $\theta_2$ to be negative or measured clockwise from x-axis)

**Step 2: Apply Conservation of Momentum**
The total momentum before equals the total momentum after.
$$ m_1 \vec{v}_{1i} + m_2 \vec{v}_{2i} = m_1 \vec{v}_{1f} + m_2 \vec{v}_{2f} $$
Since $m_1 = m_2 = m$ and $v_{2i} = 0$, we can simplify by dividing by $m$:
$$ \vec{v}_{1i} = \vec{v}_{1f} + \vec{v}_{2f} $$
This is a vector equation.

**Step 3: Apply Conservation of Momentum (Component Form)**

*   **x-component:**
    $$ m_1 v_{1ix} + m_2 v_{2ix} = m_1 v_{1fx} + m_2 v_{2fx} $$
    $$ m (2.0 \text{ m/s}) + m (0) = m (v_{1f} \cos 30^\circ) + m (v_{2f} \cos \theta_2) $$
    Dividing by $m$:
    $$ 2.0 = v_{1f} \cos 30^\circ + v_{2f} \cos \theta_2 \quad (Equation \ 1) $$
    *This equation states that the total horizontal speed component before the collision is equal to the sum of the horizontal speed components after.*

*   **y-component:**
    $$ m_1 v_{1iy} + m_2 v_{2iy} = m_1 v_{1fy} + m_2 v_{2fy} $$
    $$ m (0) + m (0) = m (v_{1f} \sin 30^\circ) + m (v_{2f} \sin \theta_2) $$
    Dividing by $m$:
    $$ 0 = v_{1f} \sin 30^\circ + v_{2f} \sin \theta_2 \quad (Equation \ 2) $$
    *This equation states that since there was no vertical motion initially, the total vertical speed component after the collision must also be zero. This means the vertical components of the two final velocities must cancel out.*

**Step 4: Apply Conservation of Kinetic Energy**
The total kinetic energy before equals the total kinetic energy after.
$$ \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 $$
Since $m_1 = m_2 = m$ and $v_{2i} = 0$, we can simplify by dividing by $\frac{1}{2}m$:
$$ v_{1i}^2 = v_{1f}^2 + v_{2f}^2 $$
$$ (2.0)^2 = v_{1f}^2 + v_{2f}^2 $$
$$ 4.0 = v_{1f}^2 + v_{2f}^2 \quad (Equation \ 3) $$
*This equation links the squares of the speeds. It's a scalar equation, so direction doesn't matter, only the magnitude of the speed.*

**Step 5: Solve the System of Equations**
We have three equations and three unknowns ($v_{1f}, v_{2f}, \theta_2$).

From Equation 2:
$0 = v_{1f} \sin 30^\circ + v_{2f} \sin \theta_2$
Since $\sin 30^\circ = 0.5$:
$0 = 0.5 v_{1f} + v_{2f} \sin \theta_2$
So, $v_{2f} \sin \theta_2 = -0.5 v_{1f} \quad (Equation \ 4)$
*This tells us that the y-component of $v_{2f}$ is equal and opposite to the y-component of $v_{1f}$.*

From Equation 1:
$2.0 = v_{1f} \cos 30^\circ + v_{2f} \cos \theta_2$
Since $\cos 30^\circ = \frac{\sqrt{3}}{2} \approx 0.866$:
$2.0 = 0.866 v_{1f} + v_{2f} \cos \theta_2 \quad (Equation \ 5)$
*This is the x-component balance.*

Now, recall the special case for equal masses, one at rest: $\theta_1 + \theta_2 = 90^\circ$.
Given $\theta_1 = 30^\circ$, we expect $\theta_2 = 90^\circ - 30^\circ = 60^\circ$.
However, since $m_1$ went *above* the x-axis ($\theta_1 = +30^\circ$), $m_2$ must go *below* the x-axis for the y-momenta to cancel. So, $\theta_2$ should be $-60^\circ$. Let's test this.

If $\theta_2 = -60^\circ$:
$\sin(-60^\circ) = -\sin(60^\circ) = -\frac{\sqrt{3}}{2} \approx -0.866$
$\cos(-60^\circ) = \cos(60^\circ) = 0.5$

Substitute these into Equation 4 and 5:
Equation 4: $v_{2f} (-\frac{\sqrt{3}}{2}) = -0.5 v_{1f} \implies v_{2f} \frac{\sqrt{3}}{2} = 0.5 v_{1f} \implies v_{2f} = \frac{0.5}{\sqrt{3}/2} v_{1f} = \frac{1}{\sqrt{3}} v_{1f}$
So, $v_{2f} = \frac{1}{\sqrt{3}} v_{1f} \quad (Equation \ 6)$

Equation 5: $2.0 = v_{1f} \frac{\sqrt{3}}{2} + v_{2f} (0.5)$
Substitute Equation 6 into Equation 5:
$2.0 = v_{1f} \frac{\sqrt{3}}{2} + (\frac{1}{\sqrt{3}} v_{1f}) (0.5)$
$2.0 = v_{1f} (\frac{\sqrt{3}}{2} + \frac{0.5}{\sqrt{3}})$
$2.0 = v_{1f} (\frac{3}{2\sqrt{3}} + \frac{1}{2\sqrt{3}})$
$2.0 = v_{1f} (\frac{4}{2\sqrt{3}})$
$2.0 = v_{1f} (\frac{2}{\sqrt{3}})$
$v_{1f} = 2.0 \cdot \frac{\sqrt{3}}{2} = \sqrt{3} \text{ m/s}$
$v_{1f} \approx 1.732 \text{ m/s}$

Now find $v_{2f}$ using Equation 6:
$v_{2f} = \frac{1}{\sqrt{3}} (\sqrt{3}) = 1.0 \text{ m/s}$

Let's check these values with the kinetic energy equation (Equation 3):
$4.0 = v_{1f}^2 + v_{2f}^2$
$4.0 = (\sqrt{3})^2 + (1.0)^2$
$4.0 = 3 + 1$
$4.0 = 4.0$
The values are consistent!

**Final Answer:**
*   **$v_{1f} = \sqrt{3} \text{ m/s} \approx 1.73 \text{ m/s}$**
*   **$v_{2f} = 1.0 \text{ m/s}$**
*   **$\theta_2 = -60^\circ$ (or $60^\circ$ below the x-axis)**

**Reflection:** This example beautifully demonstrates the special 90-degree angle relationship for equal masses when one is initially at rest. Knowing this rule beforehand can serve as a powerful check for your calculations. The setup of component equations and the systematic algebraic solution are key.

---

### Example 2: Different Masses, One at Rest

**Problem:** A bowling ball ($m_1 = 6.0 \text{ kg}$) moving at $v_{1i} = 5.0 \text{ m/s}$ in the positive x-direction strikes a stationary billiard ball ($m_2 = 0.17 \text{ kg}$). The collision is elastic. After the collision, the bowling ball is observed to deflect at an angle of $\theta_1 = 5^\circ$ above the positive x-axis. Find the final speed of the bowling ball ($v_{1f}$), the final speed of the billiard ball ($v_{2f}$), and the angle ($\theta_2$) at which the billiard ball moves.

**Given:**
*   $m_1 = 6.0 \text{ kg}$
*   $m_2 = 0.17 \text{ kg}$
*   $v_{1i} = 5.0 \text{ m/s}$
*   $v_{2i} = 0 \text{ m/s}$
*   $\theta_1 = 5^\circ$
*   Collision is elastic.

**Want:** $v_{1f}$, $v_{2f}$, $\theta_2$.

---

**Step 1: Set up the Coordinate System and Initial/Final States**
Initial velocities:
$\vec{v}_{1i} = (5.0, 0)$
$\vec{v}_{2i} = (0, 0)$

Final velocities:
$\vec{v}_{1f} = (v_{1f} \cos 5^\circ, v_{1f} \sin 5^\circ)$
$\vec{v}_{2f} = (v_{2f} \cos \theta_2, v_{2f} \sin \theta_2)$

**Step 2 & 3: Apply Conservation of Momentum (Component Form)**

*   **x-component:**
    $$ m_1 v_{1ix} + m_2 v_{2ix} = m_1 v_{1fx} + m_2 v_{2fx} $$
    $$ (6.0)(5.0) + (0.17)(0) = (6.0)(v_{1f} \cos 5^\circ) + (0.17)(v_{2f} \cos \theta_2) $$
    $$ 30 = 6.0 v_{1f} \cos 5^\circ + 0.17 v_{2f} \cos \theta_2 \quad (Equation \ 1) $$
    *The total horizontal momentum is conserved.*

*   **y-component:**
    $$ m_1 v_{1iy} + m_2 v_{2iy} = m_1 v_{1fy} + m_2 v_{2fy} $$
    $$ (6.0)(0) + (0.17)(0) = (6.0)(v_{1f} \sin 5^\circ) + (0.17)(v_{2f} \sin \theta_2) $$
    $$ 0 = 6.0 v_{1f} \sin 5^\circ + 0.17 v_{2f} \sin \theta_2 \quad (Equation \ 2) $$
    *The total vertical momentum is conserved and must be zero.*

**Step 4: Apply Conservation of Kinetic Energy**
$$ \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 $$
$$ \frac{1}{2}(6.0)(5.0)^2 + \frac{1}{2}(0.17)(0)^2 = \frac{1}{2}(6.0)v_{1f}^2 + \frac{1}{2}(0.17)v_{2f}^2 $$
Multiply by 2 to simplify:
$$ (6.0)(25) = (6.0)v_{1f}^2 + (0.17)v_{2f}^2 $$
$$ 150 = 6.0 v_{1f}^2 + 0.17 v_{2f}^2 \quad (Equation \ 3) $$
*The total kinetic energy is conserved.*

**Step 5: Solve the System of Equations**
We have three equations and three unknowns ($v_{1f}, v_{2f}, \theta_2$).
Let's calculate $\sin 5^\circ \approx 0.08716$ and $\cos 5^\circ \approx 0.99619$.

From Equation 2:
$0 = 6.0 v_{1f} (0.08716) + 0.17 v_{2f} \sin \theta_2$
$0 = 0.52296 v_{1f} + 0.17 v_{2f} \sin \theta_2$
$0.17 v_{2f} \sin \theta_2 = -0.52296 v_{1f}$
$$ v_{2f} \sin \theta_2 = -\frac{0.52296}{0.17} v_{1f} \approx -3.076 v_{1f} \quad (Equation \ 4) $$
*The y-component of the billiard ball's final velocity is negative, as expected, since the bowling ball went up.*

From Equation 1:
$30 = 6.0 v_{1f} (0.99619) + 0.17 v_{2f} \cos \theta_2$
$$ 30 = 5.97714 v_{1f} + 0.17 v_{2f} \cos \theta_2 \quad (Equation \ 5) $$
*This is the x-component balance.*

This is a system of non-linear equations. A common strategy is to solve for $v_{2f} \sin \theta_2$ and $v_{2f} \cos \theta_2$ from the momentum equations, then square and add them to eliminate $\theta_2$ and get $v_{2f}^2$.

From Eq 4: $v_{2f} \sin \theta_2 = -3.076 v_{1f}$
From Eq 5: $0.17 v_{2f} \cos \theta_2 = 30 - 5.97714 v_{1f} \implies v_{2f} \cos \theta_2 = \frac{30 - 5.97714 v_{1f}}{0.17}$
$$ v_{2f} \cos \theta_2 = 176.47 - 35.16 v_{1f} \quad (Equation \ 6) $$

Now, square Equation 4 and Equation 6 and add them:
$(v_{2f} \sin \theta_2)^2 + (v_{2f} \cos \theta_2)^2 = (-3.076 v_{1f})^2 + (176.47 - 35.16 v_{1f})^2$
$v_{2f}^2 (\sin^2 \theta_2 + \cos^2 \theta_2) = (9.462 v_{1f}^2) + (176.47^2 - 2 \cdot 176.47 \cdot 35.16 v_{1f} + 35.16^2 v_{1f}^2)$
$v_{2f}^2 = 9.462 v_{1f}^2 + 31139.6 - 12415.6 v_{1f} + 1236.2 v_{1f}^2$
$$ v_{2f}^2 = 1245.66 v_{1f}^2 - 12415.6 v_{1f} + 31139.6 \quad (Equation \ 7) $$
*This equation relates $v_{2f}^2$ and $v_{1f}$.*

Now substitute Equation 7 into Equation 3 ($150 = 6.0 v_{1f}^2 + 0.17 v_{2f}^2$):
$150 = 6.0 v_{1f}^2 + 0.17 (1245.66 v_{1f}^2 - 12415.6 v_{1f} + 31139.6)$
$150 = 6.0 v_{1f}^2 + 211.76 v_{1f}^2 - 2110.65 v_{1f} + 5293.73$
$0 = 217.76 v_{1f}^2 - 2110.65 v_{1f} + 5293.73 - 150$
$$ 0 = 217.76 v_{1f}^2 - 2110.65 v_{1f} + 5143.73 $$
This is a quadratic equation for $v_{1f}$. Use the quadratic formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$:
$v_{1f} = \frac{2110.65 \pm \sqrt{(-2110.65)^2 - 4(217.76)(5143.73)}}{2(217.76)}$
$v_{1f} = \frac{2110.65 \pm \sqrt{4454848 - 4485579}}{435.52}$
Wait, the term under the square root is negative ($4454848 - 4485579 = -30731$). This indicates an issue.
A negative discriminant means there are no real solutions. This suggests either:
1.  A calculation error on my part.
2.  The given $\theta_1 = 5^\circ$ is not physically possible for an elastic collision with these masses and initial velocity.

Let's re-evaluate the premise. Small deflections for the heavy object often mean the lighter object gets a much larger velocity.
Let's assume the numbers are correct and re-check algebra.
$m_1 = 6.0$, $m_2 = 0.17$, $v_{1i} = 5.0$, $\theta_1 = 5^\circ$.
$v_{1ix} = 5.0$, $v_{1iy} = 0$. $v_{2ix} = 0$, $v_{2iy} = 0$.
$v_{1fx} = v_{1f} \cos 5^\circ$, $v_{1fy} = v_{1f} \sin 5^\circ$.
$v_{2fx} = v_{2f} \cos \theta_2$, $v_{2fy} = v_{2f} \sin \theta_2$.

Momentum x: $m_1 v_{1i} = m_1 v_{1f} \cos \theta_1 + m_2 v_{2f} \cos \theta_2$
$6(5) = 6 v_{1f} \cos 5^\circ + 0.17 v_{2f} \cos \theta_2$
$30 = 6 v_{1f} (0.99619) + 0.17 v_{2f} \cos \theta_2$
$30 = 5.97714 v_{1f} + 0.17 v_{2f} \cos \theta_2$ (Eq 1)

Momentum y: $0 = m_1 v_{1f} \sin \theta_1 + m_2 v_{2f} \sin \theta_2$
$0 = 6 v_{1f} \sin 5^\circ + 0.17 v_{2f} \sin \theta_2$
$0 = 6 v_{1f} (0.08716) + 0.17 v_{2f} \sin \theta_2$
$0 = 0.52296 v_{1f} + 0.17 v_{2f} \sin \theta_2$ (Eq 2)

Kinetic Energy: $m_1 v_{1i}^2 = m_1 v_{1f}^2 + m_2 v_{2f}^2$
$6(5^2) = 6 v_{1f}^2 + 0.17 v_{2f}^2$
$150 = 6 v_{1f}^2 + 0.17 v_{2f}^2$ (Eq 3)

From Eq 2: $0.17 v_{2f} \sin \theta_2 = -0.52296 v_{1f}$
$v_{2f} \sin \theta_2 = -3.0762 v_{1f}$ (Eq 4)

From Eq 1: $0.17 v_{2f} \cos \theta_2 = 30 - 5.97714 v_{1f}$
$v_{2f} \cos \theta_2 = \frac{30 - 5.97714 v_{1f}}{0.17} = 176.4706 - 35.1596 v_{1f}$ (Eq 5)

Square and add Eq 4 and Eq 5:
$v_{2f}^2 = (-3.0762 v_{1f})^2 + (176.4706 - 35.1596 v_{1f})^2$
$v_{2f}^2 = 9.4630 v_{1f}^2 + (176.4706^2 - 2 \cdot 176.4706 \cdot 35.1596 v_{1f} + 35.1596^2 v_{1f}^2)$
$v_{2f}^2 = 9.4630 v_{1f}^2 + 31139.6 - 12415.6 v_{1f} + 1236.20 v_{1f}^2$
$v_{2f}^2 = 1245.663 v_{1f}^2 - 12415.6 v_{1f} + 31139.6$ (Eq 6) - *This matches previous calculation.*

Substitute Eq 6 into Eq 3:
$150 = 6 v_{1f}^2 + 0.17 (1245.663 v_{1f}^2 - 12415.6 v_{1f} + 31139.6)$
$150 = 6 v_{1f}^2 + 211.7627 v_{1f}^2 - 2110.652 v_{1f} + 5293.732$
$0 = (6+211.7627) v_{1f}^2 - 2110.652 v_{1f} + (5293.732 - 150)$
$0 = 217.7627 v_{1f}^2 - 2110.652 v_{1f} + 5143.732$ (Quadratic equation for $v_{1f}$)

$a = 217.7627$, $b = -2110.652$, $c = 5143.732$
Discriminant $\Delta = b^2 - 4ac$
$\Delta = (-2110.652)^2 - 4(217.7627)(5143.732)$
$\Delta = 4454848.5 - 4485579.0 = -30730.5$

The negative discriminant is indeed correct. This means that a deflection angle of $5^\circ$ for the bowling ball is *not physically possible* for an elastic collision with these specific masses and initial speed. The problem statement provides an impossible scenario. This is a crucial learning point: not all combinations of initial conditions and one final angle will yield a physically valid solution.

To make this a solvable example, I must either:
a) Change the given $\theta_1$ to a physically possible value.
b) Change the masses or initial velocity.
c) Ask for a different unknown, e.g., if $\theta_2$ is given, find $\theta_1$.

Let's assume the problem *intended* for a physically possible angle and that the bowling ball would barely deflect, perhaps $1^\circ$ or less, or the billiard ball would have a larger angle.
Instead of fixing $\theta_1$, let's fix $\theta_2$ to be something reasonable, say $\theta_2 = -80^\circ$ (the billiard ball goes off at a steep angle). This is a common way these problems are structured if they want a specific $\theta_1$ or $\theta_2$.

**Revised Problem (Example 2): Different Masses, One at Rest (Revised)**

**Problem:** A bowling ball ($m_1 = 6.0 \text{ kg}$) moving at $v_{1i} = 5.0 \text{ m/s}$ in the positive x-direction strikes a stationary billiard ball ($m_2 = 0.17 \text{ kg}$). The collision is elastic. After the collision, the billiard ball is observed to deflect at an angle of $\theta_2 = -80^\circ$ (i.e., $80^\circ$ below the x-axis). Find the final speed of the bowling ball ($v_{1f}$), the final speed of the billiard ball ($v_{2f}$), and the angle ($\theta_1$) at which the bowling ball moves.

**Given:**
*   $m_1 = 6.0 \text{ kg}$
*   $m_2 = 0.17 \text{ kg}$
*   $v_{1i} = 5.0 \text{ m/s}$
*   $v_{2i} = 0 \text{ m/s}$
*   $\theta_2 = -80^\circ$
*   Collision is elastic.

**Want:** $v_{1f}$, $v_{2f}$, $\theta_1$.

---

**Step 1: Set up the Coordinate System and Initial/Final States**
Initial velocities:
$\vec{v}_{1i} = (5.0, 0)$
$\vec{v}_{2i} = (0, 0)$

Final velocities:
$\vec{v}_{1f} = (v_{1f} \cos \theta_1, v_{1f} \sin \theta_1)$
$\vec{v}_{2f} = (v_{2f} \cos (-80^\circ), v_{2f} \sin (-80^\circ))$
$\cos(-80^\circ) = \cos(80^\circ) \approx 0.1736$
$\sin(-80^\circ) = -\sin(80^\circ) \approx -0.9848$

**Step 2 & 3: Apply Conservation of Momentum (Component Form)**

*   **x-component:**
    $$ m_1 v_{1ix} + m_2 v_{2ix} = m_1 v_{1fx} + m_2 v_{2fx} $$
    $$ (6.0)(5.0) + (0.17)(0) = (6.0)(v_{1f} \cos \theta_1) + (0.17)(v_{2f} \cos (-80^\circ)) $$
    $$ 30 = 6.0 v_{1f} \cos \theta_1 + 0.17 v_{2f} (0.1736) $$
    $$ 30 = 6.0 v_{1f} \cos \theta_1 + 0.029512 v_{2f} \quad (Equation \ 1) $$

*   **y-component:**
    $$ m_1 v_{1iy} + m_2 v_{2iy} = m_1 v_{1fy} + m_2 v_{2fy} $$
    $$ (6.0)(0) + (0.17)(0) = (6.0)(v_{1f} \sin \theta_1) + (0.17)(v_{2f} \sin (-80^\circ)) $$
    $$ 0 = 6.0 v_{1f} \sin \theta_1 + 0.17 v_{2f} (-0.9848) $$
    $$ 0 = 6.0 v_{1f} \sin \theta_1 - 0.167416 v_{2f} \quad (Equation \ 2) $$

**Step 4: Apply Conservation of Kinetic Energy**
$$ \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 $$
$$ (6.0)(5.0)^2 = (6.0)v_{1f}^2 + (0.17)v_{2f}^2 $$
$$ 150 = 6.0 v_{1f}^2 + 0.17 v_{2f}^2 \quad (Equation \ 3) $$

**Step 5: Solve the System of Equations**
From Equation 2, we can express $v_{2f}$ in terms of $v_{1f}$ and $\theta_1$:
$0.167416 v_{2f} = 6.0 v_{1f} \sin \theta_1$
$$ v_{2f} = \frac{6.0}{0.167416} v_{1f} \sin \theta_1 = 35.839 v_{1f} \sin \theta_1 \quad (Equation \ 4) $$

Substitute Equation 4 into Equation 1:
$30 = 6.0 v_{1f} \cos \theta_1 + 0.029512 (35.839 v_{1f} \sin \theta_1)$
$30 = 6.0 v_{1f} \cos \theta_1 + 1.057 v_{1f} \sin \theta_1$
$$ 30 = v_{1f} (6.0 \cos \theta_1 + 1.057 \sin \theta_1) \quad (Equation \ 5) $$

Now substitute Equation 4 into Equation 3:
$150 = 6.0 v_{1f}^2 + 0.17 (35.839 v_{1f} \sin \theta_1)^2$
$150 = 6.0 v_{1f}^2 + 0.17 (1284.43 v_{1f}^2 \sin^2 \theta_1)$
$150 = 6.0 v_{1f}^2 + 218.35 v_{1f}^2 \sin^2 \theta_1$
$$ 150 = v_{1f}^2 (6.0 + 218.35 \sin^2 \theta_1) \quad (Equation \ 6) $$

From Equation 5, $v_{1f} = \frac{30}{6.0 \cos \theta_1 + 1.057 \sin \theta_1}$.
Substitute this into Equation 6:
$150 = \left( \frac{30}{6.0 \cos \theta_1 + 1.057 \sin \theta_1} \right)^2 (6.0 + 218.35 \sin^2 \theta_1)$
$150 = \frac{900}{(6.0 \cos \theta_1 + 1.057 \sin \theta_1)^2} (6.0 + 218.35 \sin^2 \theta_1)$
Divide by 150:
$1 = \frac{6}{(6.0 \cos \theta_1 + 1.057 \sin \theta_1)^2} (6.0 + 218.35 \sin^2 \theta_1)$
$(6.0 \cos \theta_1 + 1.057 \sin \theta_1)^2 = 6 (