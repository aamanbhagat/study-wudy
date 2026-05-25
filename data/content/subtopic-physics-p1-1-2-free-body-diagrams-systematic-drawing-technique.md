## What it is
A free body diagram (FBD) is a simplified sketch that isolates a single object (the "body") from its environment and illustrates all the external forces acting *on* that object. We represent the object as a single point or simple shape and draw vectors originating from it, where each vector represents a force. The diagram is "free" because it detaches the body from all its physical connections to the world, replacing those connections with the forces they exert.

## Why it matters
The FBD is the single most critical tool for translating a physical dynamics problem into a set of mathematical equations. In aerospace, FBDs are used to analyze everything from the forces on a satellite in orbit to the balance of lift, drag, thrust, and weight on an aircraft. In robotics and simulations, which are tightly coupled with machine learning, correctly modeling the forces on a system via FBDs is the first step to creating a reliable physics engine or training a model to interact with the physical world.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Newton's Second Law:** You must understand the vector relationship $\sum \vec{F} = m\vec{a}$, which states that the net force on an object causes it to accelerate.
2.  **Vector Addition and Components:** You must be able to add vectors graphically and decompose a vector into its components along a chosen coordinate system (e.g., $F_x = F \cos\theta$, $F_y = F \sin\theta$).
3.  **Types of Forces:** You should be able to identify and name common forces: gravity ($F_g$ or $W$), normal force ($N$ or $F_N$), tension ($T$), and friction ($f_s$ or $f_k$).

If you are not confident with these, master them first. An FBD is useless without the ability to use it.

## How to study it (step by step)
1.  **Choose one object.** In a system with multiple objects, you must analyze each one with its own separate FBD. Start with one.
2.  **Isolate and sketch.** Draw the object of interest completely isolated from its surroundings. Represent it as a simple dot or a box. This is the "free body."
3.  **Identify and draw contact forces.** Go around the boundary of your object. Wherever it touches something else (a surface, a rope, a hand), there is a contact force. Draw a vector for each:
    *   **Normal Force ($N$):** Perpendicular to a surface, pushing away.
    *   **Friction ($f$):** Parallel to a surface, opposing motion or intended motion.
    *   **Tension ($T$):** Pulling along a rope or cable, away from the body.
    *   **Applied Force ($F_{app}$):** Any other push or pull.
4.  **Identify and draw non-contact forces.** Ask what forces act on the object from a distance. For now, this is almost always gravity ($W=mg$), which always points straight down toward the center of the Earth.
5.  **Establish a coordinate system.** Draw an x-y coordinate axis. It is often strategic to align one axis with the direction of acceleration to simplify your equations.
6.  **Decompose vectors.** If any force vector does not lie perfectly on an axis, break it down into its x and y components using trigonometry. Redraw the components on the diagram (often with dashed lines) and cross out the original vector to avoid double-counting.
7.  **Apply Newton's Second Law.** Write the two equations for your system: $\sum F_x = ma_x$ and $\sum F_y = ma_y$. The terms on the left side of these equations come directly from the labels on your completed FBD.

## Key ideas, with intuition
1.  **Isolate to Clarify:** The entire point of an FBD is to remove clutter. By "freeing" the body, you focus only on the direct causes (forces) of its motion. You don't care about the forces the body exerts on the world, only the forces the world exerts on the body.
2.  **Forces ON the Body, Not BY the Body:** This is the most common conceptual error. If you are drawing an FBD for a book on a table, you draw the force of gravity *on* the book and the normal force from the table *on* the book. You do *not* draw the force of the book pushing down *on the table*—that force belongs on the FBD for the table.
3.  **The Diagram IS the Sum of Forces:** The FBD is the visual representation of the $\sum \vec{F}$ term in Newton's Second Law. Once the diagram is drawn correctly, writing the equations is a simple matter of reading the vector components off the diagram.
    $$ \sum \vec{F} = (\sum F_x)\hat{i} + (\sum F_y)\hat{j} $$
    The FBD helps you find the terms for $\sum F_x$ and $\sum F_y$.
4.  **Acceleration is a RESULT, not a Force:** Never draw an acceleration vector *on* the FBD itself. Acceleration is the *result* of the net force. It can be useful to draw the acceleration vector nearby, off to the side, as a reminder of the direction of motion, but it is not a force and does not belong with the force vectors.

## Worked example
**Problem:** A block of mass $m$ is at rest on a rough ramp inclined at an angle $\theta$ to the horizontal. Draw the FBD and write the equations of motion.

**Step 1: Isolate the body.** The body is the block of mass $m$.

**Step 2: Sketch the body.** We represent the block as a dot.

**Step 3 & 4: Identify all forces.**
*   **Non-contact:** Gravity ($W=mg$) acts on the block, pointing straight down.
*   **Contact:** The ramp touches the block. This contact creates two forces:
    *   A normal force ($N$) perpendicular to the ramp's surface, pointing away from the ramp.
    *   A static friction force ($f_s$) parallel to the ramp's surface, pointing up the ramp to prevent the block from sliding down.

**Step 5: Establish a coordinate system.** The block's potential motion is along the ramp. It's strategic to tilt our axes: let the +x axis point down the ramp, and the +y axis point perpendicular to the ramp (in the direction of $N$).

**Step 6: Decompose vectors.**
*   The normal force $N$ is entirely in the +y direction.
*   The friction force $f_s$ is entirely in the -x direction.
*   The weight $W$ is at an angle to our axes. Using geometry, the angle between the weight vector and the negative y-axis is $\theta$.
    *   The x-component of weight is $W_x = W \sin\theta = mg \sin\theta$ (pointing in the +x direction).
    *   The y-component of weight is $W_y = W \cos\theta = mg \cos\theta$ (pointing in the -y direction).

**Step 7: Apply Newton's Second Law.** The block is at rest, so its acceleration is zero ($a_x = 0, a_y = 0$).
*   **Sum of forces in the x-direction:**
    $$ \sum F_x = W_x - f_s = ma_x $$
    $$ mg \sin\theta - f_s = m(0) \implies f_s = mg \sin\theta $$
*   **Sum of forces in the y-direction:**
    $$ \sum F_y = N - W_y = ma_y $$
    $$ N - mg \cos\theta = m(0) \implies N = mg \cos\theta $$

**Reflection:** Each step was necessary. Isolating the block (1) defined the problem. Identifying forces (3,4) populated the diagram. Choosing a tilted coordinate system (5) was crucial; it put acceleration (which is zero, but could be non-zero) along one axis, simplifying the problem so that only one force (gravity) needed to be decomposed. Applying Newton's laws (7) translated the visual diagram into solvable algebraic equations.

## Diagrams
Here is the physical situation and the corresponding FBD for the worked example.

**Physical Situation:**
```text
        /|
       / |
      /  |
     /   |
    / [] |
   /_____|
  θ
```

**Free Body Diagram (with tilted coordinate system):**
```text
        y ^
          |  /
          | /
          N
          ^
         /|
        / | f_s
       /  <--+
      /     / \
     +----->-- x
    / \   /
   /   \ / W_x = mg sinθ
  /     v
 W_y = mg cosθ
 (W = mg)
```
Note: The vector `W` (not drawn to avoid clutter, but its components are shown) would point straight down from the center `+`.

## Memory technique — remember this forever
1.  **Mnemonic:** **I** **S**ee **F**orces, **A**nd **C**oordinates.
    *   **I**solate the body.
    *   **S**ketch the body (as a dot).
    *   **F**ind and draw all **F**orces (Contact and Non-contact).
    *   **A**dd **A**xes (your coordinate system).
    *   **C**alculate **C**omponents.
2.  **Must-know fact/formula:** The FBD is the visual tool to build the terms for Newton's Second Law. You must overlearn this connection:
    $$ \text{FBD} \xrightarrow{\text{translates to}} \sum \vec{F} = m\vec{a} $$
3.  **Spaced Repetition Schedule:** Review this entire lesson and work one new FBD problem on this schedule: Day 1, Day 3, Day 7, Day 16, Day 35.
4.  **First Principles Pathway:** If you forget the steps, remember the goal: solve $\sum \vec{F} = m\vec{a}$. To do that, you absolutely *must* have a complete and correct list of all forces ($\vec{F}$) acting on the object $m$. A free body diagram is just the most systematic way to generate that list and organize the vectors before summing them.

## Common mistakes
1.  **Including non-force vectors.** Students will incorrectly draw an arrow for velocity ($v$) or acceleration ($a$) on the FBD. These are not forces; they are the *result* of forces. Keep them separate.
2.  **Forgetting the normal force.** The normal force is a passive, reactive force. It's easy to forget because it's not "doing" anything active, but if there's a surface, there's (almost always) a normal force.
3.  **Action-Reaction Pair Confusion.** Drawing forces the body exerts on *other* objects. For example, on the FBD for a person standing on the ground, you draw the force of gravity *on* the person and the normal force of the ground *on* the person. You do *not* draw the person's weight pushing *on the ground*. That belongs to the FBD *of the ground*.
4.  **Botching trigonometry on inclines.** A very common error is to swap sine and cosine for the components of weight. On a plane inclined at $\theta$, the component of gravity *parallel* to the plane is $mg \sin\theta$ and the component *perpendicular* is $mg \cos\theta$. Burn this into your memory.

## Self-check
1.  A satellite of mass $m$ is in a circular orbit around the Earth at a constant speed. Draw the FBD for the satellite. (Be careful: what is the only force acting on it?)
2.  A hockey puck is sliding to the right on a horizontal sheet of ice, slowing down due to friction. Draw the FBD for the puck *after* it has been struck by the stick and is now slowing down.
3.  A person is in an elevator that is accelerating upwards. Draw the FBD for the person. How must the magnitude of the normal force compare to the magnitude of the gravitational force? Why?