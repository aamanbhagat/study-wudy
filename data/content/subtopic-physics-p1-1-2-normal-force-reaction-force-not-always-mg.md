## What it is
The normal force, denoted $N$ or $F_N$, is a contact force exerted by a surface on an object. It is always directed perpendicular (i.e., "normal") to the surface and has whatever magnitude is necessary to prevent the object from accelerating through the surface.

## Why it matters
Understanding the normal force is non-negotiable for analyzing almost any mechanical system. It is the direct input for calculating friction ($f = \mu N$), which is critical in designing everything from brake systems to tires on a Mars rover. In aerospace, analyzing the forces on landing gear during impact or the lift component on a banked aircraft relies on correctly calculating normal forces in dynamic situations.

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **Newton's First and Second Laws:** Specifically, the vector nature of forces and the equation $\sum \vec{F} = m\vec{a}$.
2.  **Free-Body Diagrams (FBDs):** You must be able to isolate an object and draw all the forces acting *on* it.
3.  **Vector Components:** You must be able to resolve vectors, particularly the force of gravity, into components parallel and perpendicular to a surface.

If any of these are weak, master them first. You cannot solve these problems otherwise.

## How to study it (step by step)
1.  **The "Default" Case:** Draw the FBD for a book of mass $m$ at rest on a horizontal table. Apply Newton's Second Law in the vertical direction ($\sum F_y = ma_y$). Since the book is not accelerating vertically, $a_y = 0$. Solve for $N$. You will find $N = mg$. Understand why this is a result of the specific situation, not a general law.
2.  **Add an External Push:** Now, imagine you are pushing down on the book with a force $P$. Redraw the FBD. Apply $\sum F_y = 0$ again. See how the normal force must now be larger to counteract both gravity and your push.
3.  **Add an External Pull:** Imagine you are pulling up on the book with a force $P$ (less than its weight, so it stays on the table). Redraw the FBD. Apply $\sum F_y = 0$. See how the normal force is now smaller than the weight.
4.  **The Inclined Plane:** This is the classic non-trivial case. Draw a block on a ramp inclined at an angle $\theta$. Draw the FBD. Crucially, set up your coordinate system so the x-axis is parallel to the ramp and the y-axis is perpendicular to it. Resolve the gravitational force $mg$ into components: $mg \sin\theta$ (down the ramp) and $mg \cos\theta$ (into the ramp). Apply $\sum F_y = ma_y = 0$ (assuming the block doesn't fly off the ramp). Solve for $N$.
5.  **The Accelerating Frame:** Draw the FBD for a person of mass $m$ standing in an elevator that is accelerating upwards with acceleration $a$. Apply $\sum F_y = ma_y$. Note that $a_y = a$. Solve for $N$. You will find $N > mg$. This is why you feel heavier. Repeat for downward acceleration.

## Key ideas, with intuition
1.  **Normal means Perpendicular.** The word "normal" is a synonym for "perpendicular" in mathematics and physics. The normal force vector $\vec{N}$ is *always* perpendicular to the surface of contact, pointing away from the surface. If the surface is a ramp, the normal force points perpendicular to the ramp, not straight up.
2.  **It's a "Smart" Force.** The normal force is a constraint force. Think of it like a security guard at a wall; it pushes back with exactly enough force to stop you from walking through it. It is not a fixed value. Its magnitude, $N$, is determined by the other forces and acceleration in the perpendicular direction. The surface provides whatever $N$ is required to satisfy Newton's Second Law.
    $$ \sum F_{\perp} = N - (\text{all other forces pushing into surface}) = ma_{\perp} $$
    In most introductory problems, the object is not accelerating through the surface, so $a_{\perp} = 0$.
3.  **It is NOT the partner to gravity.** This is a critical point about Newton's Third Law. The force of gravity on a book ($m\vec{g}$) is the Earth pulling the book down. Its Third Law partner is the book pulling the Earth up. The normal force ($\vec{N}$) is the table pushing the book up. Its Third Law partner is the book pushing the table down. These are two completely separate action-reaction pairs.

## Worked example
**Problem:** A crate of mass $m=10$ kg rests on a ramp inclined at $\theta = 30^\circ$. You push on the crate with a horizontal force (parallel to the ground, not the ramp) of $P = 50$ N. What is the magnitude of the normal force? Use $g \approx 10$ m/s².

**Solution:**

1.  **Free-Body Diagram & Coordinate System:**
    -   Isolate the crate.
    -   Define a coordinate system with the x-axis parallel to the ramp (pointing up the ramp) and the y-axis perpendicular to the ramp (pointing away from it).
    -   Draw the forces:
        -   Weight ($mg$) acts straight down.
        -   Normal force ($N$) acts perpendicular to the ramp (along the +y-axis).
        -   Pushing force ($P$) acts horizontally.

2.  **Resolve Forces into Components:**
    -   The normal force $N$ is already entirely in the y-direction.
    -   Resolve weight $mg$: The component perpendicular to the ramp is $mg \cos\theta$ (into the ramp, so in the -y direction). The component parallel is $mg \sin\theta$ (down the ramp, so in the -x direction).
    -   Resolve the push $P$: The angle between the horizontal push and the perpendicular y-axis is $\theta$. The component of $P$ pushing into the ramp is $P \sin\theta$ (in the -y direction). The component pushing up the ramp is $P \cos\theta$ (in the +x direction).

3.  **Apply Newton's Second Law:**
    -   We only need the normal force, so we only need the y-direction equation. The crate is not accelerating perpendicular to the ramp, so $a_y = 0$.
    $$ \sum F_y = ma_y = 0 $$
    -   Sum the forces in the y-direction: The normal force points in the +y direction. The perpendicular components of weight and the push point in the -y direction.
    $$ N - mg \cos\theta - P \sin\theta = 0 $$

4.  **Solve for N:**
    -   Rearrange the equation:
    $$ N = mg \cos\theta + P \sin\theta $$
    -   Substitute the values:
    $$ N = (10 \text{ kg})(10 \text{ m/s}^2) \cos(30^\circ) + (50 \text{ N}) \sin(30^\circ) $$
    $$ N = (100 \text{ N})(\frac{\sqrt{3}}{2}) + (50 \text{ N})(\frac{1}{2}) $$
    $$ N = 50\sqrt{3} \text{ N} + 25 \text{ N} \approx 86.6 \text{ N} + 25 \text{ N} = 111.6 \text{ N} $$

**Reflection:** Each force was identified (Step 1). Then, any force not aligned with our chosen coordinate system was broken into components (Step 2). We applied Newton's Second Law in the direction perpendicular to motion because that's where the normal force lives (Step 3). Finally, we solved algebraically before substituting numbers (Step 4). Note how $N$ is significantly different from $mg = 100$ N.

## Diagrams
A block on an inclined plane with a horizontal push force P.

```text
        y ^
          |  / x
          | /
          |/
     +----+ ............ P (Horizontal Push)
     |    | /
     | N / |
     |  /  |
     | /   | mg*cos(theta)
     |/____V__
     +----+ \
           /  \ mg*sin(theta)
          /    \
         /      V
        <--theta--> mg
```
*Description:* The diagram shows a block on a ramp inclined at angle `theta`. The coordinate system is tilted, with the y-axis perpendicular to the ramp and the x-axis parallel to it. The normal force `N` points along the +y-axis. The weight `mg` points straight down and is resolved into two components: `mg*cos(theta)` pointing into the ramp (opposite to `N`) and `mg*sin(theta)` pointing down the ramp. A horizontal force `P` is also shown, which itself would need to be resolved into components parallel and perpendicular to the ramp.

## Memory technique — remember this forever
1.  **Visual Hook:** The word **Normal** means **Perpendicular**. Burn this into your mind. Visualize a surface and then draw a line sticking straight out from it at a 90-degree angle. That is the only direction the normal force can ever point.
2.  **Formulas to Overlearn:** Do not memorize a formula for $N$. Instead, overlearn the **process** and the master equation it comes from.
    $$ \sum F_{\perp} = ma_{\perp} $$
    In 95% of foundation problems, $a_{\perp} = 0$, so the equation you will use is:
    $$ \sum F_{\perp} = 0 $$
    The sum of forces perpendicular to the surface is zero. $N$ is one of these forces.
3.  **Spaced Repetition Schedule:** Redo the inclined plane problem (from "How to study it", step 4) from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not look at the answer until you are finished.
4.  **First Principles Pathway:** If you are ever stuck, you can rebuild the solution from this sequence:
    -   Draw the Free-Body Diagram for the object of interest.
    -   Choose a coordinate system where one axis is perpendicular to the surface of contact.
    -   Write down $\sum F_{\perp} = ma_{\perp}$.
    -   Identify all forces or components of forces that lie along this perpendicular axis.
    -   Solve the resulting algebraic equation for $N$.

## Common mistakes
1.  **The $N=mg$ assumption:** Automatically writing $N=mg$ without thinking. This is only true for an object on a horizontal surface with no other vertical forces or acceleration. It is a conclusion, not a starting point.
2.  **Drawing $N$ vertically on an incline:** Drawing the normal force pointing straight up, opposing gravity, even when the object is on a ramp. The normal force is perpendicular to the ramp, not the ground.
3.  **Incorrectly decomposing $mg$:** Mixing up sine and cosine when resolving gravity on an incline. Remember: as the incline angle $\theta \to 0$, the perpendicular component should approach $mg$. Since $\cos(0)=1$, the perpendicular component must be $mg \cos\theta$.
4.  **Confusing action-reaction pairs:** Stating that the normal force is the "reaction" to gravity. This is incorrect. The normal force and the force of the object pushing on the surface are an action-reaction pair. Gravity and the object's gravitational pull on the Earth are another.

## Self-check
1.  A 5 kg box sits on a horizontal floor. You pull on a rope attached to the box with a force of 20 N at an angle of $30^\circ$ above the horizontal. What is the normal force exerted by the floor on the box?
2.  A 1000 kg roller coaster car is at the bottom of a circular dip with a radius of 25 m. If the car's speed is 20 m/s at this point, what is the normal force exerted by the track on the car?
3.  A small block is placed on the inside wall of a hollow cylinder of radius $R=2$ m that is rotating about a vertical axis. The coefficient of static friction between the block and the wall is $\mu_s = 0.5$. What is the minimum angular velocity $\omega$ the cylinder must have so that the block does not slide down? What is the normal force in this case?