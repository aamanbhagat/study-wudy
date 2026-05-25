## 1. What it is — in plain English

Imagine you have a really sturdy object, like a solid plank of wood or a metal beam. We call this a "rigid body" because it doesn't bend, stretch, or squish when forces act on it. It keeps its shape perfectly.

Now, imagine this rigid body is perfectly still. Not just still in one spot, but also not spinning or wobbling around. It's completely settled, like a book resting on a table, or a perfectly balanced seesaw that isn't moving up or down, and isn't tipping to one side. This state of being completely still, both in terms of moving from place to place and in terms of spinning, is what we call "equilibrium of a rigid body."

To be in this perfect equilibrium, two things must be true: First, all the pushes and pulls (forces) acting on the object must cancel each other out, so it doesn't start sliding or flying off. This is called *translational equilibrium*. Second, all the twisting or turning effects (torques) trying to make the object spin must also cancel each other out, so it doesn't start rotating. This is called *rotational equilibrium*.

So, when we talk about "equilibrium of rigid bodies — translational + rotational," we're simply talking about a sturdy object that is completely motionless, neither moving linearly nor spinning, because all the forces and all the torques acting on it are perfectly balanced.

## 2. Why it matters — real-world applications

Understanding the equilibrium of rigid bodies is absolutely fundamental across countless fields, especially in engineering and physics. It's the bedrock for designing anything that needs to stay put or remain stable.

1.  **Aerospace Engineering & Rocket Science:** When a rocket is on the launchpad, before ignition, it's a rigid body in equilibrium. Engineers must ensure the launch tower and the rocket structure itself can withstand all the forces (gravity, wind, support structures) and torques acting on it without collapsing or tipping over. Later, in orbit, satellites use thrusters to maintain a specific "attitude" (orientation). If a satellite needs to point its antenna at Earth and stay perfectly still, its attitude control system must ensure it's in rotational equilibrium, counteracting any tiny torques from solar radiation pressure or atmospheric drag.
2.  **Civil Engineering & Architecture:** Every building, bridge, and structure you see relies on these principles. Architects and civil engineers design structures so that they remain in equilibrium under all expected loads – the weight of the structure itself, people, furniture, wind, snow, and even earthquakes. They calculate the forces and torques on beams, columns, and foundations to ensure they don't collapse or deform. For example, a crane lifting a heavy load must remain in equilibrium; if the load creates too much torque, the crane will tip over.
3.  **Robotics & Mechanical Design:** Robotic arms, industrial manipulators, and even simple linkages must be designed to hold specific positions stably. When a robotic arm holds an object, it's crucial that the arm's joints and motors can exert the necessary forces and torques to counteract gravity and the object's weight, keeping the arm and object in equilibrium without drift or oscillation. This is critical for precision tasks like surgery or manufacturing.
4.  **Biomechanics:** Our own bodies rely on these principles. When you stand upright, your musculoskeletal system (bones as rigid bodies, muscles as force generators) works to keep your body in equilibrium, counteracting gravity. Poor posture, for instance, often results from muscles failing to maintain the necessary forces and torques for equilibrium, leading to strain.
5.  **Machine Learning & Computer Graphics (Physics Engines):** While not directly applying the physics, the underlying physics engines in video games, animation software, and even some robotics simulations use these principles. To realistically simulate objects at rest or to detect collisions, these engines need to calculate when objects are in equilibrium and how they react when forces and torques are unbalanced.

## 3. Prerequisites — what you must know first

Before diving deep into the equilibrium of rigid bodies, ensure you have a solid grasp of these foundational concepts:

*   **Vectors:** Understanding what vectors are, how to represent them (magnitude and direction), and how to add and subtract them, especially by resolving them into components (e.g., $x$ and $y$ components).
*   **Newton's Laws of Motion:** Especially Newton's First Law (an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force) and Newton's Second Law ($\vec{F} = m\vec{a}$).
*   **Force:** A clear understanding of what a force is (a push or a pull), its units (Newtons), and common types of forces (gravity/weight, normal force, tension, friction).
*   **Torque (or Moment of Force):** The twisting or turning effect of a force. You must know how to calculate torque ($\vec{\tau} = \vec{r} \times \vec{F}$ or $\tau = r F \sin\theta$), its units (Newton-meters), and how to determine its direction (e.g., clockwise vs. counter-clockwise, or using the right-hand rule).
*   **Center of Mass / Center of Gravity:** The point where the entire mass (or weight) of an object can be considered to act. This is crucial for calculating the torque due to gravity.
*   **Free-Body Diagrams (FBDs):** The ability to draw an FBD accurately, showing all external forces acting on an object, their points of application, and their directions. This is the single most important tool for solving equilibrium problems.
*   **Basic Algebra and Trigonometry:** Solving systems of linear equations, working with sine, cosine, and tangent functions for resolving vectors.

If any of these concepts feel unfamiliar, pause here and review them. They are the building blocks for everything that follows.

## 4. The core idea — step by step

Let's break down the concept of equilibrium for rigid bodies, building it up piece by piece.

### Step 1: What is a "Rigid Body"?

**Plain English:** A rigid body is an object that keeps its shape and size perfectly, no matter how many forces push or pull on it. It doesn't bend, stretch, or squish. Think of a steel beam or a solid block of wood.

**Example:** Imagine you have a rubber band versus a metal ruler. If you pull on the rubber band, it stretches and changes shape. It's *not* a rigid body. If you pull on the metal ruler, it largely keeps its shape (unless you apply extreme force, which we ignore in this ideal model). So, the metal ruler can be approximated as a rigid body.

**Formal/Mathematical Version:** A rigid body is an idealized body for which the distance between any two given points of the body remains constant in time, regardless of external forces acting on it. This simplifies analysis because we don't have to worry about internal deformations.

**What could go wrong:** Assuming an object is rigid when it's not. For instance, a long, thin beam under a heavy load *will* bend. Treating it as perfectly rigid would lead to incorrect calculations of stress and deflection, potentially causing structural failure. In introductory physics, we often assume perfect rigidity unless stated otherwise.

### Step 2: What does "Equilibrium" mean for a Rigid Body?

**Plain English:** For a rigid body, "equilibrium" means it's completely settled, not moving from its spot, and not spinning or wobbling. It's perfectly still, and it will stay that way unless something changes the forces or torques acting on it.

**Example:** A car parked on a perfectly level road with its engine off and brakes on is in equilibrium. It's not moving forward or backward, and it's not rotating around any axis. If the road isn't level, or the brakes fail, it might start rolling (translational motion) or even spinning if it hits something (rotational motion).

**Formal/Mathematical Version:** A rigid body is in equilibrium if its linear acceleration is zero ($\vec{a} = 0$) and its angular acceleration is zero ($\vec{\alpha} = 0$). This means its linear velocity is constant (which includes zero velocity) and its angular velocity is constant (which includes zero angular velocity). For static equilibrium, which is what we usually focus on, both velocities are zero.

**What could go wrong:** Confusing *static* equilibrium (completely still) with *dynamic* equilibrium (moving at a constant velocity without accelerating). While both satisfy the mathematical conditions, static equilibrium is typically what "equilibrium" implies in these problems.

### Step 3: The First Condition for Equilibrium — Translational Equilibrium

**Plain English:** For an object not to move from its spot (not to accelerate linearly), all the pushes and pulls (forces) acting on it must perfectly cancel each other out. If you push left with 10 N and someone else pushes right with 10 N, the object won't move left or right.

**Example:** A book resting on a horizontal table. Gravity pulls it down, and the table pushes it up (normal force). These two forces are equal and opposite, so the book doesn't accelerate up or down. If you push the book horizontally, and it doesn't move, it means the static friction force from the table is exactly opposing your push.

**Formal/Mathematical Version:** The vector sum of all external forces acting on the rigid body must be zero.
$$ \sum \vec{F} = 0 $$
This vector equation can be broken down into components along orthogonal axes (e.g., $x$, $y$, and $z$ axes):
$$ \sum F_x = 0 $$
$$ \sum F_y = 0 $$
$$ \sum F_z = 0 $$
Here, $\sum F_x$ represents the sum of all $x$-components of the forces, and similarly for $y$ and $z$.

**What could go wrong:**
*   **Forgetting a force:** Missing a force like friction, tension, or the normal force can lead to incorrect sums.
*   **Incorrectly resolving forces:** If a force acts at an angle, you must correctly find its $x$ and $y$ components using trigonometry.
*   **Sign errors:** Consistently define a positive direction (e.g., right and up are positive) and stick to it.

### Step 4: The Second Condition for Equilibrium — Rotational Equilibrium

**Plain English:** For an object not to spin or rotate, all the twisting effects (torques) trying to make it turn in one direction must be perfectly balanced by twisting effects trying to make it turn in the opposite direction.

**Example:** A seesaw with two children of equal weight sitting at equal distances from the pivot point. The child on the left creates a clockwise torque, and the child on the right creates a counter-clockwise torque. If these torques are equal in magnitude, the seesaw remains level and doesn't rotate. If one child is heavier or sits further out, the seesaw will rotate.

**Formal/Mathematical Version:** The vector sum of all external torques acting on the rigid body, calculated about *any* arbitrary pivot point, must be zero.
$$ \sum \vec{\tau} = 0 $$
Again, this can be broken down into components, but for 2D problems, we typically consider torques about an axis perpendicular to the plane of motion (e.g., the $z$-axis). We assign a sign convention, usually counter-clockwise (CCW) as positive and clockwise (CW) as negative.
$$ \sum \tau_z = 0 $$
**Important Note on Pivot Point:** The beauty of rotational equilibrium is that if a body is in equilibrium, the net torque is zero about *any* point you choose. This is a powerful tool! We strategically choose a pivot point to simplify calculations, often selecting a point where one or more unknown forces act, because forces acting *at* the pivot point produce zero torque (since $r=0$).

**What could go wrong:**
*   **Incorrectly calculating torque:** Remember $\tau = r F \sin\theta$, where $r$ is the distance from the pivot to the point of force application, $F$ is the force, and $\theta$ is the angle between $\vec{r}$ and $\vec{F}$. Often, $r_\perp = r \sin\theta$ (lever arm) or $F_\perp = F \sin\theta$ (perpendicular force component) is used.
*   **Inconsistent sign convention:** Stick to one convention (e.g., CCW positive) for all torques in your sum.
*   **Choosing a pivot point poorly:** While any point works, a smart choice (where unknown forces act) can eliminate variables from your torque equation, making solving easier.
*   **Forgetting the weight/gravity torque:** The weight of the object always acts at its center of gravity.

### Step 5: The Complete Condition for Static Equilibrium of a Rigid Body

**Plain English:** For a rigid body to be perfectly still and stable, it must satisfy *both* conditions simultaneously: no net force (so no linear acceleration) AND no net torque (so no angular acceleration).

**Example:** A bridge must not only resist collapsing (translational equilibrium) but also twisting or swaying (rotational equilibrium) under the load of traffic and wind.

**Formal/Mathematical Version:** A rigid body is in static equilibrium if and only if:
1.  The sum of all external forces acting on it is zero:
    $$ \sum \vec{F} = 0 \quad \implies \quad \sum F_x = 0, \quad \sum F_y = 0, \quad \sum F_z = 0 $$
2.  The sum of all external torques about *any* arbitrary point is zero:
    $$ \sum \vec{\tau} = 0 \quad \implies \quad \sum \tau_z = 0 \quad (\text{for 2D problems}) $$

### Step 6: The Strategy for Solving Equilibrium Problems

Here's a systematic approach that will help you tackle any rigid body equilibrium problem:

1.  **Draw a Free-Body Diagram (FBD):** This is the most crucial step.
    *   Isolate the rigid body you are analyzing.
    *   Draw all external forces acting *on* the body. Include:
        *   Weight (acting at the center of gravity).
        *   Normal forces (perpendicular to surfaces in contact).
        *   Tension forces (from ropes/cables, acting along the rope).
        *   Friction forces (parallel to surfaces, opposing potential motion).
        *   Applied forces (pushes/pulls).
        *   Reaction forces at supports (e.g., hinges, pins, rollers – these often have unknown directions, so represent them with components, like $R_x$ and $R_y$).
    *   Indicate the point of application for each force.
    *   Show known angles and distances.
    *   Choose a coordinate system (e.g., $x$-axis horizontal, $y$-axis vertical).

2.  **Resolve Forces into Components:** Break down any forces acting at an angle into their $x$ and $y$ components (or $x, y, z$ for 3D).

3.  **Apply the First Condition for Equilibrium (Translational):**
    *   Sum all force components in the $x$-direction and set them to zero: $\sum F_x = 0$.
    *   Sum all force components in the $y$-direction and set them to zero: $\sum F_y = 0$.
    *   (For 3D, also $\sum F_z = 0$).

4.  **Apply the Second Condition for Equilibrium (Rotational):**
    *   **Choose a Pivot Point:** Select a point on the rigid body about which to calculate torques. The best choice is often a point where several unknown forces act, as this eliminates those forces from the torque equation (since $r=0$ for them).
    *   **Calculate Torques:** For each force, determine the torque it produces about your chosen pivot point. Remember $\tau = r F \sin\theta$ or $\tau = F \times (\text{perpendicular lever arm})$.
    *   **Assign Signs:** Consistently assign a sign to each torque (e.g., CCW positive, CW negative).
    *   **Sum Torques:** Sum all torques and set them to zero: $\sum \tau = 0$.

5.  **Solve the System of Equations:** You will now have a system of linear equations (typically 3 for 2D problems: $\sum F_x=0$, $\sum F_y=0$, $\sum \tau=0$). Solve these equations simultaneously to find the unknown forces or distances.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Beam Supported at Two Ends (Easy)

**Problem:** A uniform beam of length $L = 6.0 \text{ m}$ and mass $m_b = 50 \text{ kg}$ rests on two supports. One support is at the left end (Support A), and the other is at $4.0 \text{ m}$ from the left end (Support B). A person of mass $m_p = 70 \text{ kg}$ stands at $2.0 \text{ m}$ from the left end. Find the forces exerted by the supports on the beam.

**Given:**
*   Beam length $L = 6.0 \text{ m}$
*   Beam mass $m_b = 50 \text{ kg}$
*   Person mass $m_p = 70 \text{ kg}$
*   Support A at $x=0$
*   Support B at $x=4.0 \text{ m}$
*   Person at $x=2.0 \text{ m}$
*   Acceleration due to gravity $g = 9.8 \text{ m/s}^2$

**What we want:**
*   Force exerted by Support A ($N_A$)
*   Force exerted by Support B ($N_B$)

---

**Step 1: Draw a Free-Body Diagram (FBD)**

```text
       <----------------- L = 6.0 m ----------------->
       |                                               |
       |                                               |
       |  NA                                           |
       |  ^                                            |
       |  |                                            |
       |  |                                            |
       |  |                                            |
       |  |     Wp (Person)                            |
       |  |     |                                      |
       |  |     v                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  |     |                                      |
       |  