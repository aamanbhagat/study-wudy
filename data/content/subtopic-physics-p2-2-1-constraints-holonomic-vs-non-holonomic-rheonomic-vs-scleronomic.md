## What it is
A constraint is a restriction on the possible motion of a system of particles. We classify constraints using two independent pairs of labels: **holonomic vs. non-holonomic** describes the mathematical form of the constraint (whether it restricts position or velocity), while **scleronomic vs. rheonomic** describes whether the constraint itself is changing over time.

## Why it matters
This classification is the gateway to Lagrangian and Hamiltonian mechanics, which are the workhorses of modern physics and engineering. Holonomic constraints allow us to simplify complex problems by defining generalized coordinates, which is essential for analyzing satellite orbits, robotic arm movements, and molecular dynamics. Non-holonomic constraints are critical in robotics and control theory, governing things like how a wheeled robot moves or how a spacecraft reorients itself using reaction wheels.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Newtonian Mechanics:** Specifically, the concept of forces and degrees of freedom.
2.  **Multivariable Calculus:** You need to be comfortable with partial derivatives and total differentials. The concept of an integrable differential form is central here.
3.  **Basic Kinematics:** Relationships between position, velocity, and acceleration ($x, \dot{x}, \ddot{x}$).

If you are not comfortable with total differentials (e.g., what makes $df = \frac{\partial f}{\partial x} dx + \frac{\partial f}{\partial y} dy$ an "exact differential"), pause and review that first.

## How to study it (step by step)
1.  **Master the Pendulum:** Start with a simple pendulum of fixed length $L$. Write the equation that constrains the particle's $(x, y)$ coordinates. Classify it using the definitions below. This is your "hello world" for constraints.
2.  **Add Time-Dependence:** Now, imagine the pivot point of the pendulum is being forced to oscillate horizontally as $x_p(t) = A\cos(\omega t)$. Write the new constraint equation for the particle's coordinates $(x, y)$. How does this change the classification?
3.  **Tackle the Rolling Disk:** Consider a disk of radius $R$ rolling along the x-axis without slipping. Write the relationship between the velocity of its center, $\dot{x}$, and its angular velocity, $\dot{\theta}$. See if you can integrate this velocity relationship to get an equation relating only position variables ($x, \theta$). This is the key test for holonomic constraints.
4.  **Read the Formalism:** Pick up a standard mechanics textbook (e.g., Taylor's *Classical Mechanics* or Goldstein's *Classical Mechanics*) and read the introductory chapter on constraints. Focus on connecting the formal definitions to the three examples you just worked through.
5.  **Solve Classification Problems:** Find 3-5 practice problems that ask you to simply classify the constraints of a given system (e.g., a bead on a wire, a particle on a sphere, etc.). Do not solve for the motion yet; just focus on the classification.

## Key ideas, with intuition
The entire topic boils down to answering two questions about each restriction on a system's motion:

**Question 1: Does the constraint restrict *position* or *velocity*?**
This distinguishes holonomic from non-holonomic constraints.

*   **Holonomic Constraints:** These are "positional" or "geometric" constraints. They can always be written as an algebraic equation relating the coordinates of the particles, possibly including time.
    $$f(q_1, q_2, \dots, q_n, t) = 0$$
    *Intuition:* Think of a train on a track. The train is *geometrically* confined to the path of the track. The equation describing the track is the holonomic constraint. It reduces the system's degrees of freedom.

*   **Non-holonomic Constraints:** These are "kinematic" or "velocity" constraints. They are given in terms of the velocities of the particles and *cannot* be integrated to yield a purely positional constraint.
    $$g(q_1, \dots, q_n, \dot{q}_1, \dots, \dot{q}_n, t) = 0 \quad \text{(and is not integrable)}$$
    *Intuition:* Think of an ice skate on a frozen lake. It can go anywhere on the lake (its final position is not constrained to a specific path), but at any instant, its velocity is constrained to be in the direction the blade is pointing. It cannot move sideways.

**Question 2: Is the constraint itself changing with time?**
This distinguishes scleronomic from rheonomic constraints.

*   **Scleronomic Constraints:** The constraint equation does not explicitly depend on time. The prefix "sclero-" means "hard" or "fixed".
    $$f(q_1, \dots, q_n) = 0$$
    *Intuition:* A bead on a fixed, stationary wire. The wire's shape isn't changing.

*   **Rheonomic Constraints:** The constraint equation has an explicit time dependence. The prefix "rheo-" means "flow" or "current".
    $$f(q_1, \dots, q_n, t) = 0$$
    *Intuition:* A bead on a wire that is itself being spun around at a constant rate. The constraint (the wire's position) is actively changing in time.

A constraint is classified with one word from each pair. For example, a simple pendulum has a **holonomic, scleronomic** constraint. A bead on a rotating wire has a **holonomic, rheonomic** constraint. A ball rolling on a table without slipping has a **non-holonomic, scleronomic** constraint.

## Worked example
**Problem:** A particle of mass $m$ is constrained to move on the surface of a sphere whose radius is expanding in time as $R(t) = R_0 + vt$. Classify the constraint.

**Step 1: Identify the coordinates.**
The particle's position in Cartesian coordinates is $\vec{r} = (x, y, z)$.

**Step 2: Write the constraint equation.**
The definition of being on the surface of a sphere of radius $R(t)$ is that the distance from the origin is always equal to $R(t)$.
$$ \sqrt{x^2 + y^2 + z^2} = R(t) $$
We can square both sides to get a cleaner algebraic form:
$$ x^2 + y^2 + z^2 = (R_0 + vt)^2 $$
Rearranging this into the standard form $f(x, y, z, t) = 0$:
$$ f(x, y, z, t) = x^2 + y^2 + z^2 - (R_0 + vt)^2 = 0 $$

**Step 3: Classify based on form (Holonomic vs. Non-holonomic).**
The constraint is an algebraic equation relating only the coordinates $(x, y, z)$ and time $t$. It does not involve velocities ($\dot{x}, \dot{y}, \dot{z}$). Therefore, the constraint is **holonomic**.

**Step 4: Classify based on time-dependence (Scleronomic vs. Rheonomic).**
The constraint equation contains an explicit dependence on the variable $t$ through the term $(R_0 + vt)^2$. This time dependence cannot be eliminated. Therefore, the constraint is **rheonomic**.

**Conclusion:** The constraint is **holonomic and rheonomic**.

*Reflection:* The classification was straightforward. Step 2 was key: translating the physical description into a mathematical equation. Step 3 and 4 were direct applications of the definitions to that equation. We checked for velocities (none present -> holonomic) and explicit time dependence (present -> rheonomic).

## Diagrams
Here are two common examples of holonomic constraints.

1.  **Holonomic, Scleronomic:** A bead on a fixed circular wire in the xy-plane.
    The constraint is $x^2 + y^2 - R^2 = 0$. It is fixed in time.

    ```text
          y
          |
        .---.
      ,'     `.
     /    .P(x,y)
    |     |    |
    |-----O----|-- x
    |          |
     \        /
      `.     ,'
        '---'
          R
    ```

2.  **Holonomic, Rheonomic:** A bead on a straight wire rotating in the xy-plane with constant angular velocity $\omega$.
    The constraint is $y - (\tan(\omega t))x = 0$. The constraint itself is moving.

    ```text
           y
           |     /
           |    /
           |   / P(x,y)
           |  /
           | /
           |/  angle = wt
    -------O------------ x
          /|
         / |
        /  |
       /   |
      /    |
    ```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Imagine you are a video game character.
    *   **Holonomic:** You are forced to walk along a specific path or on a specific surface (like a narrow bridge). Your *position* is restricted. The equation of the bridge is $f(q)=0$.
    *   **Non-holonomic:** You are driving a car in an open field. You can get anywhere, but you can't instantly move sideways. Your *velocity* is restricted.
    *   **Sclero-nomic:** The bridge is made of stone (`Sclero` ~ sclerosis, hardening, static). It doesn't move.
    *   **Rheo-nomic:** The bridge is a "river" of flowing lava (`Rheo` ~ river, flow). The path itself is moving.

2.  **Formulas to Overlearn:**
    *   Holonomic: $f(q_1, \dots, q_n, t) = 0$ (An equation of coordinates)
    *   Non-holonomic (differential form): $\sum_j a_j dq_j + a_t dt = 0$ (A non-integrable relation of differentials/velocities)

3.  **Spaced Repetition Schedule:** Review this page and your notes on these concepts at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders.

4.  **First-Principles Pathway:** If you forget everything, ask these two questions about the physical restriction:
    *   Can I write an equation using only positions (`x`, `y`, `θ`, etc.) and maybe `t`? If yes -> **Holonomic**. If the restriction is fundamentally about velocities (`ẋ`, `ω`, etc.) and can't be integrated to an equation of positions -> **Non-holonomic**.
    *   Does the equation I wrote have a `t` in it that I can't get rid of? If yes -> **Rheonomic**. If no -> **Scleronomic**.

## Common mistakes
1.  **Assuming all velocity constraints are non-holonomic.** The constraint for a disk rolling on a line is $\dot{x} - R\dot{\theta} = 0$. This involves velocities, but it's integrable to $x - R\theta = C$, which is an algebraic equation of coordinates. Thus, it's holonomic. The key is *integrability*, not the initial appearance.
2.  **Mixing the classifications.** The pairs (holonomic/non-holonomic) and (scleronomic/rheonomic) are independent. A constraint has one property from each pair. Don't say "this constraint is holonomic instead of rheonomic."
3.  **Ignoring inequality constraints.** A particle inside a box ($0 \le x \le L$) is technically a non-holonomic constraint. For now, most problems in introductory analytical mechanics deal with equality ("bilateral") constraints, but be aware that inequalities ("unilateral") exist and are non-holonomic.

## Self-check
1.  A point mass slides on the inside of a fixed hemispherical bowl of radius $R$. What are the coordinates, what is the constraint equation, and how would you classify it?
2.  A ladder of length $L$ leans against a vertical wall. Its top end slides down the wall while its bottom end slides along the floor. Let $\theta$ be the angle the ladder makes with the floor, and let $(x, y)$ be the coordinates of its center. Find the constraint equations relating $x, y,$ and $\theta$. Are they holonomic or non-holonomic? Scleronomic or rheonomic?
3.  A sphere of radius $R$ rolls without slipping on a horizontal plane. Its center is at $(x, y)$ and its orientation is described by Euler angles $(\phi, \theta, \psi)$. The no-slip condition provides two velocity constraints: $\dot{x} = R(\dot{\psi}\sin\theta\sin\phi + \dot{\theta}\cos\phi)$ and $\dot{y} = R(-\dot{\psi}\sin\theta\cos\phi + \dot{\theta}\sin\phi)$. Can these equations be integrated to find functions of the form $f(x, y, \phi, \theta, \psi) = 0$? Based on your answer, classify the constraints.