## What it is
A rigid body is in equilibrium when its state of motion is not changing. This means it has zero translational acceleration and zero rotational acceleration. For this to be true, the net force and the net torque acting on the body must both be zero.

## Why it matters
This concept is the foundation of statics, the engineering discipline used to design every stable structure from bridges and skyscrapers to aircraft wings and rocket launch towers. In aerospace, understanding equilibrium is critical for analyzing the stability of an aircraft in flight and for designing attitude control systems that keep satellites pointed in the right direction by carefully balancing torques.

## When to study it
Before tackling this, you must have a solid grasp of the following prerequisites:
*   **Newton's Laws:** Specifically, the meaning of net force from the First and Second Laws ($\vec{F}_{net} = m\vec{a}$).
*   **Vectors:** Decomposing vectors into components and vector addition.
*   **Free-Body Diagrams (FBDs):** Isolating an object and drawing all external forces acting upon it.
*   **Torque:** The definition of torque as a rotational force, $\vec{\tau} = \vec{r} \times \vec{F}$, and how to calculate its magnitude and direction.
*   **Center of Mass:** The concept of a point where an object's entire weight can be considered to act for translational and rotational calculations.

If any of these are weak, review them first. Otherwise, you will struggle to set up the problems correctly.

## How to study it (step by step)
1.  **Isolate Translational Equilibrium.** Start with Newton's First Law. Solve 2-3 problems involving an object (treated as a point mass) held in place by multiple forces (e.g., a mass hanging from two cables). Focus on setting the sum of force components in each direction to zero: $\sum F_x = 0$ and $\sum F_y = 0$.
2.  **Isolate Rotational Equilibrium.** Solve 2-3 problems involving only torques. A classic example is a seesaw. Set the sum of clockwise torques equal to the sum of counter-clockwise torques, which is the same as saying $\sum \tau = 0$.
3.  **Combine the Conditions.** Now, internalize the two core conditions for total equilibrium: $\sum \vec{F} = 0$ and $\sum \vec{\tau} = 0$. Write them down. Understand that *both* must be true simultaneously for an object to be static.
4.  **Draw Extended FBDs.** Practice drawing FBDs for rigid bodies (like beams, ladders, signs). The key difference from point-mass diagrams is that you must draw each force acting at its precise point of application. This is non-negotiable, as the point of application determines the torque.
5.  **Master the Pivot Choice.** For a body in equilibrium, you can choose *any* point as the pivot for your torque calculation. Work through a simple beam problem three times, using three different pivot points (left end, right end, center). Prove to yourself that you get the same answer. Notice how choosing a pivot where an unknown force acts makes that force's torque zero, simplifying the algebra.
6.  **Solve a 2D Problem.** Tackle the canonical "ladder against a wall" problem. This integrates vector components for forces and torque calculations involving angles. This is the template for most static equilibrium problems.

## Key ideas, with intuition
1.  **No Net Push/Pull.** This is translational equilibrium. If an object is not accelerating, all the forces acting on it must cancel out perfectly. Imagine a tug-of-war with two equally strong teams; the rope doesn't move. This must be true for every dimension independently.
    $$ \sum \vec{F}_{ext} = 0 \quad \iff \quad \begin{cases} \sum F_x = 0 \\ \sum F_y = 0 \\ \sum F_z = 0 \end{cases} $$
2.  **No Net Twist.** This is rotational equilibrium. If an object is not changing its rotation, all the torques (twisting forces) must cancel out. Imagine trying to turn a lug nut with a wrench, but your friend is applying an equal and opposite torque; the wrench won't rotate.
    $$ \sum \vec{\tau}_{ext} = 0 $$
3.  **The Pivot is a Mathematical Tool.** If an object is truly not rotating, it's not rotating around its left end, its right end, its center, or any other point you could imagine. This means we are free to choose the most convenient point to be our pivot for the $\sum \vec{\tau} = 0$ calculation. The "most convenient" point is almost always one where one or more unknown forces are acting, as this makes their torques zero and simplifies the equation.

## Worked example
A uniform ladder of length $L=5.0$ m and mass $M=20$ kg leans against a frictionless vertical wall. The base of the ladder makes an angle $\theta=53^\circ$ with the horizontal ground. The ground is not frictionless. Find the magnitudes of the forces from the ground and the wall on the ladder. Use $g \approx 10 \text{ m/s}^2$.

**1. Draw the Free-Body Diagram (FBD).**
Identify all forces and where they act:
*   $W$: Weight of the ladder, acting downwards at its center of mass (L/2). $W = Mg = 20 \text{ kg} \times 10 \text{ m/s}^2 = 200$ N.
*   $N_w$: Normal force from the wall, acting horizontally outwards (to the left).
*   $N_g$: Normal force from the ground, acting vertically upwards.
*   $f_s$: Static friction force from the ground, acting horizontally to prevent slipping (to the right).

**2. Apply Translational Equilibrium ($\sum \vec{F} = 0$).**
Decompose the forces into x and y components.
*   Sum of x-forces: $\sum F_x = f_s - N_w = 0 \implies f_s = N_w$
*   Sum of y-forces: $\sum F_y = N_g - W = 0 \implies N_g = W = 200$ N

*Reflection:* We've found $N_g$ immediately, but we have one equation ($f_s = N_w$) with two unknowns. We need another equation.

**3. Apply Rotational Equilibrium ($\sum \vec{\tau} = 0$).**
Choose a pivot point to simplify the calculation. The best choice is the base of the ladder, where two unknown forces ($N_g$ and $f_s$) act. Their lever arms are zero, so their torques about this pivot are zero.
Convention: counter-clockwise (CCW) torques are positive, clockwise (CW) are negative.
The forces creating torques about the base are $W$ and $N_w$.

*   Torque from weight $W$: $\tau_W = - (L/2) W \cos\theta$. It's negative because it causes a CW rotation. The lever arm is the perpendicular distance from the pivot to the line of action of the force, which is $(L/2)\cos\theta$.
*   Torque from wall force $N_w$: $\tau_{N_w} = + L N_w \sin\theta$. It's positive because it causes a CCW rotation. The lever arm is $L\sin\theta$.

Sum of torques:
$$ \sum \tau = L N_w \sin\theta - \frac{L}{2} W \cos\theta = 0 $$

**4. Solve the system of equations.**
From the torque equation:
$$ L N_w \sin\theta = \frac{L}{2} W \cos\theta $$
$$ N_w = \frac{W \cos\theta}{2 \sin\theta} = \frac{W}{2 \tan\theta} $$
Substitute the values:
$$ N_w = \frac{200 \text{ N}}{2 \tan(53^\circ)} \approx \frac{200 \text{ N}}{2(1.33)} \approx 75.2 \text{ N} $$
From the force equations, we know $f_s = N_w$, so $f_s \approx 75.2$ N.

The forces are:
*   Force from the wall: $N_w \approx 75.2$ N.
*   Force from the ground: This is the vector sum of $N_g$ and $f_s$.
    *   $F_{ground} = \sqrt{N_g^2 + f_s^2} = \sqrt{(200)^2 + (75.2)^2} \approx 214$ N.

*Reflection:* The steps were logical. Drawing the FBD identified all forces. The force equilibrium gave us two equations. The torque equilibrium, with a clever choice of pivot, gave us the third equation needed to solve for all unknowns.

## Diagrams

```text
      ^ y
      |
      |   /|
      |  / |
      | /  |
      |/   | <--- N_w (Normal force from wall)
      /    |
     /     |
    / .    |
   / /|\ W |
  /   |    |
 /    V    |
/ \_theta__|__________> x
<--- f_s   ^ N_g
(Friction) (Normal force from ground)

Ladder of length L
W = Weight, acts at L/2
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Stay still." For an object to be in equilibrium, it must be perfectly still (or moving at a constant velocity, but statics focuses on still). To stay still, you can't be pushed around (**No Net Force**) and you can't be twisted around (**No Net Torque**).
2.  **Formulas to Overlearn:**
    $$ \sum \vec{F}_{ext} = 0 $$
    $$ \sum \vec{\tau}_{ext} = 0 $$
3.  **Spaced Repetition:** Review this concept and re-work the ladder problem from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the formulas, derive them from Newton's Second Laws for translation and rotation:
    *   $\vec{F}_{net} = m\vec{a}$. For equilibrium, acceleration $\vec{a}=0$. Thus, $\vec{F}_{net}=0$.
    *   $\vec{\tau}_{net} = I\vec{\alpha}$. For equilibrium, angular acceleration $\vec{\alpha}=0$. Thus, $\vec{\tau}_{net}=0$.

## Common mistakes
*   **Forgetting the object's own weight.** Students often include applied forces and reaction forces but forget to add the gravitational force $W=mg$ acting at the center of mass.
*   **Incorrect Lever Arm.** Calculating torque as $\tau = rF$ instead of $\tau = r_{\perp}F = rF_{\perp} = rF\sin\phi$. The distance used must be the *perpendicular* distance from the pivot to the line of the force's action.
*   **Sign Errors in Torque Calculation.** Arbitrarily assigning signs to torques. Be consistent: pick a direction (e.g., counter-clockwise) as positive and stick with it for the entire problem.
*   **Placing Forces at the Wrong Location.** The weight acts at the center of mass. A tension force acts where the rope is attached. A normal force acts at the point of contact. Putting these in the wrong place will make your torque calculation incorrect.

## Self-check
1.  A uniform 4 m long plank weighs 200 N. It rests on a fulcrum 1 m from the left end. What downward force must be applied to the very left end of the plank to keep it balanced?
2.  A 50 kg traffic light is suspended from a single cable, which is attached to two other cables that are fastened to a horizontal support beam. One of these cables makes an angle of 30° with the beam, and the other makes an angle of 60°. Find the tension in all three cables. (Hint: this is a translational equilibrium problem, but good practice).
3.  A uniform door, 2.0 m high and 0.8 m wide, has a mass of 15 kg. It is supported by two hinges located 0.2 m from the top and 0.2 m from the bottom. Assuming the door's weight is shared equally between the hinges, find the horizontal and vertical components of the force exerted by each hinge on the door.