## What it is
The work-energy theorem is a fundamental principle stating that the total work done on an object by all forces (the *net work*) is exactly equal to the change in that object's kinetic energy. It provides a direct link between the forces applied over a distance and the resulting change in the object's speed. In essence, it's an accounting statement for energy of motion.

## Why it matters
This theorem is a cornerstone of mechanics because it allows us to analyze motion using scalar quantities (work, energy) instead of always dealing with vector quantities (force, acceleration). In aerospace, it's used to calculate the velocity change of a spacecraft from a rocket burn (work done by thrust) or from an atmospheric braking maneuver (negative work done by drag). In more advanced physics, it is the first step towards the principle of conservation of energy, a universal law that governs everything from particle collisions to the evolution of stars.

## When to study it
Before tackling this derivation, you must have a firm grasp of three prerequisites:
1.  **Newton's Second Law:** You must be comfortable with $\vec{F}_{net} = m\vec{a}$ in its vector form.
2.  **Definition of Work:** You must understand that work is the line integral of force over a path, $W = \int \vec{F} \cdot d\vec{s}$. You should be able to compute this for constant and simple variable forces in one dimension.
3.  **Differential and Integral Calculus:** You need to understand the chain rule for derivatives and how to perform a definite integral. Specifically, the relationship between position, velocity, and acceleration ($v = dx/dt$, $a = dv/dt$).

If any of these are weak, pause and review them. The derivation is impossible otherwise.

## How to study it (step by step)
1.  **Review the prerequisites.** Write down the definitions of Work, Force, Velocity, and Acceleration from first principles. Do not proceed until these are clear.
2.  **Follow the 1D derivation.** Take a sheet of paper and reproduce the derivation shown in the "Key ideas" section below for the simple case of motion in a straight line. Say each step's justification out loud.
3.  **Generalize to 3D.** Once the 1D case is solid, repeat the derivation using vector notation ($\vec{v} \cdot d\vec{v}$). Pay close attention to how the dot product simplifies the math.
4.  **Solve a constant force problem.** Find a textbook problem where a constant net force acts on an object. Solve for the final velocity using kinematics ($\vec{F}=m\vec{a}$ and $v_f^2 = v_i^2 + 2as$). Then, solve it again using the work-energy theorem. Confirm you get the same answer.
5.  **Solve a variable force problem.** Solve a problem involving the work done by a spring, where the force is $F(x) = -kx$. Use the work-energy theorem to find the change in an object's kinetic energy as the spring compresses or expands. This highlights the power of the theorem where simple kinematics fail.

## Key ideas, with intuition
The core logic connects force, which causes acceleration, to a change in kinetic energy. The link is the concept of work.

1.  **Intuition: Pushing something makes it go faster.** If you apply a net force to an object in the direction it's moving, you do positive work on it, and its speed increases. If you apply a net force opposite to its motion (like friction), you do negative work, and its speed decreases. The work-energy theorem quantifies this exact relationship.

2.  **The Definition of Kinetic Energy Emerges Naturally.** We don't just invent the formula $K = \frac{1}{2}mv^2$. It falls directly out of the mathematics when we connect work and Newton's second law. The derivation reveals *why* kinetic energy must have this form.

3.  **The Derivation is a Change of Variables.** The master stroke in the derivation is switching from an integral over *position* ($ds$) to an integral over *velocity* ($dv$). This is what allows us to connect the external forces to the object's state of motion.

Let's derive it for the 1D case first. An object moves along the x-axis from position $x_i$ to $x_f$. The net force on it is $F_{net}(x)$.

The net work done is, by definition:
$$ W_{net} = \int_{x_i}^{x_f} F_{net}(x) \, dx $$
From Newton's second law, $F_{net} = ma$.
$$ W_{net} = \int_{x_i}^{x_f} m a \, dx $$
Now, we use the chain rule to change variables. We know $a = \frac{dv}{dt}$ and $v = \frac{dx}{dt}$. Therefore, we can write acceleration as:
$$ a = \frac{dv}{dt} = \frac{dv}{dx} \frac{dx}{dt} = \frac{dv}{dx} v $$
This is the key step. It lets us replace acceleration in terms of velocity and position. Substitute this into our integral:
$$ W_{net} = \int_{x_i}^{x_f} m \left(v \frac{dv}{dx}\right) dx $$
The $dx$ terms cancel, and the limits of integration must change from position ($x_i, x_f$) to the corresponding velocities ($v_i, v_f$):
$$ W_{net} = \int_{v_i}^{v_f} m v \, dv $$
This is now a simple integral with respect to velocity:
$$ W_{net} = m \left[ \frac{1}{2}v^2 \right]_{v_i}^{v_f} = m \left( \frac{1}{2}v_f^2 - \frac{1}{2}v_i^2 \right) $$
$$ W_{net} = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2 $$
We define the quantity $\frac{1}{2}mv^2$ as the kinetic energy, $K$.
$$ W_{net} = K_f - K_i = \Delta K $$
This is the work-energy theorem. The net work done on an object equals its change in kinetic energy.

## Worked example
A $10 \text{ kg}$ crate is pulled across a horizontal floor. The pulling force is $50 \text{ N}$ directed at an angle of $37^\circ$ above the horizontal. The crate starts from rest and is pulled for $5 \text{ m}$. The coefficient of kinetic friction between the crate and the floor is $\mu_k = 0.2$. What is the final speed of the crate?

**1. Identify all forces and calculate their work.**
First, we need the net work, which is the sum of the work done by each force. The forces are: applied force ($F_A$), gravity ($F_g$), normal force ($N$), and friction ($f_k$).
*   **Work by Applied Force ($W_A$):**
    The component of $F_A$ parallel to displacement is $F_A \cos(37^\circ)$.
    $W_A = (F_A \cos(37^\circ)) d = (50 \text{ N} \cdot \cos(37^\circ)) \cdot 5 \text{ m} \approx (50 \cdot 0.8) \cdot 5 = 200 \text{ J}$.
*   **Work by Gravity ($W_g$) and Normal Force ($W_N$):**
    Both $F_g$ and $N$ are perpendicular to the displacement vector $d$. The dot product $\vec{F} \cdot d\vec{s}$ is zero.
    $W_g = 0 \text{ J}$ and $W_N = 0 \text{ J}$.
*   **Work by Friction ($W_f$):**
    Friction opposes motion, so the work is negative. First, find the normal force. The crate is not accelerating vertically, so $\sum F_y = 0$.
    $N + F_A \sin(37^\circ) - F_g = 0 \implies N = mg - F_A \sin(37^\circ)$.
    $N = (10 \text{ kg})(9.8 \text{ m/s}^2) - (50 \text{ N})\sin(37^\circ) \approx 98 - 50 \cdot 0.6 = 68 \text{ N}$.
    The friction force is $f_k = \mu_k N = 0.2 \cdot 68 \text{ N} = 13.6 \text{ N}$.
    Work done by friction is $W_f = -f_k d = -13.6 \text{ N} \cdot 5 \text{ m} = -68 \text{ J}$.

**2. Calculate Net Work ($W_{net}$).**
$W_{net} = W_A + W_g + W_N + W_f = 200 + 0 + 0 - 68 = 132 \text{ J}$.

**3. Apply the Work-Energy Theorem.**
$W_{net} = \Delta K = K_f - K_i$.
The crate starts from rest, so $v_i = 0$ and $K_i = \frac{1}{2}mv_i^2 = 0$.
$132 \text{ J} = \frac{1}{2}mv_f^2 - 0$.
$132 = \frac{1}{2}(10 \text{ kg})v_f^2 = 5 v_f^2$.
$v_f^2 = \frac{132}{5} = 26.4 \text{ m}^2/\text{s}^2$.
$v_f = \sqrt{26.4} \approx 5.14 \text{ m/s}$.

**Reflection:** Each step was necessary. We couldn't find the work from friction without first analyzing the vertical forces to find the normal force (Step 1). Summing the work from *all* forces was crucial to find the *net* work (Step 2). Finally, equating this net work to the change in kinetic energy allowed us to solve for the final speed, the unknown quantity (Step 3).

## Diagrams
A free-body diagram for the worked example:
```text
      y |      ^ N
        |     /
        |    / F_A
        |   / 37 deg
        +------> x
        |  Crate
<-------+ f_k
        |
        |
        v F_g
```
The displacement vector $\vec{d}$ points entirely along the +x axis.

## Memory technique — remember this forever
1.  **The Story:** Imagine you have an "energy bank account" for motion, called kinetic energy. To make a deposit (increase speed), you must do positive "work". To make a withdrawal (decrease speed), something must do negative "work" on you (like friction). The theorem is the bank statement: `Net Work Done = Change in Kinetic Energy Balance`.

2.  **Must-Know Formulas:**
    $$ K = \frac{1}{2}mv^2 $$
    $$ W_{net} = \Delta K $$

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: 24 hours.
    *   Then again in: 3 days.
    *   Then again in: 7 days.
    *   Then again in: 16 days.
    *   Final review in: 35 days.
    Each time, try to re-derive the theorem from a blank sheet of paper.

4.  **First Principles Pathway:** If you forget the theorem, rebuild it.
    *   Start with the definition of net work: $W_{net} = \int F_{net} \, dx$.
    *   Substitute Newton's Second Law: $F_{net} = ma$.
    *   Use the chain rule trick to change variables: $a = v \frac{dv}{dx}$.
    *   The $dx$ cancels, and you integrate $\int mv \, dv$. The result is $\Delta K$.

## Common mistakes
1.  **Using a single force's work, not the NET work.** The theorem is $W_{\mathbf{net}} = \Delta K$. If you calculate the work from just one force (like the pulling force) and set it equal to $\Delta K$, your answer will be wrong if friction or other forces are present.
2.  **Forgetting the square in $K = \frac{1}{2}mv^2$.** A very common algebraic slip. Always double-check your kinetic energy calculations.
3.  **Ignoring negative work.** Forces that oppose the direction of motion, like friction or air resistance, do negative work. This *decreases* kinetic energy. Forgetting the minus sign is a frequent error.
4.  **Calculating work for perpendicular forces.** A force perpendicular to the displacement does zero work. Students sometimes try to include the magnitude of the normal force or gravity in the work calculation for horizontal motion.

## Self-check
1.  A $2 \text{ kg}$ object is pushed from rest by a constant net force of $10 \text{ N}$ over a distance of $4 \text{ m}$. What is its final kinetic energy? What is its final speed?
2.  An object's velocity is reduced from $10 \text{ m/s}$ to $4 \text{ m/s}$ over a distance of $20 \text{ m}$. If the object has a mass of $5 \text{ kg}$, what was the magnitude of the average net force acting on it?
3.  A satellite is in a perfectly circular orbit around the Earth. Over the course of one full orbit, what is the total work done on the satellite by Earth's gravity? What does the work-energy theorem imply about the satellite's speed?