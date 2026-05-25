## What it is
A reference frame is a coordinate system used to describe the motion of objects. A Galilean transformation is the mathematical rule for translating measurements of position and time from one reference frame to another, assuming the second frame is moving at a constant velocity relative to the first and that time is absolute for both observers.

## Why it matters
This is the mathematical foundation of all of classical mechanics, from analyzing a thrown ball to calculating a rocket's trajectory relative to a moving planet. Understanding this is the prerequisite for understanding its successor, Einstein's Special Relativity, where these simple rules are replaced by the Lorentz transformations to account for the constant speed of light. In robotics and computer graphics, transforming coordinates between different moving parts or cameras is a core, constant operation.

## When to study it
You are ready for this topic if you are comfortable with:
*   **Coordinate Systems:** Cartesian coordinates ($x, y, z$) are essential.
*   **Vectors:** You must be able to add, subtract, and represent vectors using unit vector notation (e.g., $\vec{v} = v_x \hat{i} + v_y \hat{j}$).
*   **Basic Kinematics:** You must know the definitions of position ($\vec{r}$), velocity ($\vec{u} = d\vec{r}/dt$), and acceleration ($\vec{a} = d\vec{u}/dt$).

If any of these are weak, review them first. The math here is simple, but the concepts are foundational.

## How to study it (step by step)
1.  **Draw the setup.** Draw two 1D coordinate systems (number lines) labeled $S$ and $S'$. Let the origin of $S'$ move to the right with a constant speed $V$ relative to $S$. Assume their origins coincide at $t=0$.
2.  **Derive the position transformation.** Mark a point $P$ on the line. Its coordinate in $S$ is $x$. Its coordinate in $S'$ is $x'$. From your drawing, deduce the relationship between $x$, $x'$, $V$, and $t$. You should find $x = x' + Vt$. Generalize this to 3D vectors: $\vec{r} = \vec{r}' + \vec{V}t$.
3.  **Derive the velocity transformation.** Take the time derivative of the position transformation equation ($d/dt$). Remember that $V$ is constant. This will give you the rule for adding velocities: $\vec{u} = \vec{u}' + \vec{V}$.
4.  **Derive the acceleration transformation.** Now, take the time derivative of the velocity transformation equation. What happens to the constant velocity $\vec{V}$? This will reveal why acceleration is *invariant* between inertial frames.
5.  **Solve a "river" problem.** A classic application is a boat crossing a river with a current. Define the ground as frame $S$ and the water as frame $S'$. Solve for the boat's velocity and trajectory relative to the ground. This solidifies the vector nature of the transformation.
6.  **Reflect on the assumptions.** List the two core assumptions made: 1) The frames move at a constant velocity relative to each other (they are *inertial* frames). 2) Time is absolute ($t=t'$). Ask yourself: what would happen if either of these were not true?

## Key ideas, with intuition
*   **An inertial frame is a "calm" frame.** It's a reference frame that is not accelerating. In an inertial frame, Newton's first law holds: an object with no net force on it moves at a constant velocity. Any frame moving at a constant velocity relative to an inertial frame is also an inertial frame. This is the **Principle of Galilean Relativity**.
*   **Position is just vector addition.** The core idea is simple addition. Imagine you are on a train (frame $S'$) moving with velocity $\vec{V}$ relative to the ground (frame $S$). Your position relative to the ground ($\vec{r}$) is your position on the train ($\vec{r}'$) plus the train's origin's position relative to the ground ($\vec{V}t$).
    $$ \vec{r} = \vec{r}' + \vec{V}t $$
*   **Velocities add.** This follows directly from the position rule. Your velocity relative to the ground ($\vec{u}$) is your velocity relative to the train ($\vec{u}'$) plus the train's velocity relative to the ground ($\vec{V}$).
    $$ \vec{u} = \vec{u}' + \vec{V} $$
*   **Acceleration is absolute (invariant).** This is the most profound consequence. If we differentiate the velocity equation, the constant $\vec{V}$ vanishes.
    $$ \vec{a} = \frac{d\vec{u}}{dt} = \frac{d\vec{u}'}{dt} + \frac{d\vec{V}}{dt} = \vec{a}' + 0 \implies \vec{a} = \vec{a}' $$
    This means all inertial observers measure the *same acceleration* for an object. Since Newton's second law is $\vec{F}=m\vec{a}$, this means the laws of physics are identical in all inertial frames. You cannot perform a physics experiment inside a smoothly moving train to tell if you are moving or at rest.

## Worked example
**Problem:** A spy drone flies due north with an airspeed of 40 m/s. It is flying through a wind that blows from west to east at 30 m/s. What is the drone's velocity as measured by an observer on the ground?

**Solution:**
1.  **Define the reference frames.**
    *   Let frame $S$ be the ground (the "stationary" observer).
    *   Let frame $S'$ be the air mass (the wind). This frame moves relative to the ground.
2.  **Identify the velocities.**
    *   The velocity of the drone relative to the air is $\vec{u}'$. The drone flies north, which we'll define as the positive y-direction. So, $\vec{u}' = 40 \hat{j}$ m/s.
    *   The velocity of the air relative to the ground is $\vec{V}$. The wind blows east, which we'll define as the positive x-direction. So, $\vec{V} = 30 \hat{i}$ m/s.
3.  **Apply the Galilean velocity transformation.**
    *   We want to find the drone's velocity relative to the ground, which is $\vec{u}$. The formula is $\vec{u} = \vec{u}' + \vec{V}$.
    *   Substitute the known vectors:
        $$ \vec{u} = (40 \hat{j} \text{ m/s}) + (30 \hat{i} \text{ m/s}) $$
        $$ \vec{u} = 30 \hat{i} + 40 \hat{j} \text{ m/s} $$
4.  **Interpret the result (optional but good practice).**
    *   The drone's ground speed is the magnitude of $\vec{u}$:
        $$ |\vec{u}| = \sqrt{(30)^2 + (40)^2} = \sqrt{900 + 1600} = \sqrt{2500} = 50 \text{ m/s} $$
    *   The direction is the angle $\theta$ north of east:
        $$ \theta = \arctan\left(\frac{u_y}{u_x}\right) = \arctan\left(\frac{40}{30}\right) \approx 53.1^\circ $$

**Reflection:** Each step served a purpose. Step 1 established a clear context. Step 2 translated the words of the problem into precise mathematical vectors. Step 3 applied the core physical principle—the Galilean transformation—which in this case was simple vector addition. Step 4 converted the final vector back into a physically intuitive speed and direction.

## Diagrams
A standard setup for Galilean transformations in 2D. Frame $S'$ moves with velocity $\vec{V}$ along the x-axis of frame $S$.

```text
       y          y'
       |         /
       |        /
       |       /
       |      /
       |     / . P(x,y) or (x',y')
       |    / /
       |   / /
       |  / /
       | / /
-------O------------------ x
       | \----------->
       |  Origin O'
       |
       |  O' is at position Vt along the x-axis.
       |  Vector from O to P is r.
       |  Vector from O' to P is r'.
       |  Vector from O to O' is Vt.
       |  Thus, r = r' + Vt.
```

## Memory technique — remember this forever
1.  **The Story:** "The Moving Walkway". Imagine you're at an airport. Your position relative to the terminal ($x$) is your position on the walkway ($x'$) plus the position of the start of the walkway ($Vt$). It's just common sense addition. The equations are just a formal statement of this obvious fact.
2.  **Must Overlearn:**
    *   $\vec{r} = \vec{r}' + \vec{V}t$ (Position)
    *   $\vec{u} = \vec{u}' + \vec{V}$ (Velocity)
    *   $\vec{a} = \vec{a}'$ (Acceleration is INVARIANT)
3.  **Spaced Repetition Schedule:** Re-derive these three equations from the "Moving Walkway" idea in 1 day, 3 days, 7 days, 16 days, and 35 days. Do it from a blank sheet of paper.
4.  **First Principles Pathway:** If you forget everything, draw two reference frames $S$ and $S'$. Have $S'$ move at speed $V$ relative to $S$. At $t=0$, their origins $O$ and $O'$ coincide. At a later time $t$, the origin $O'$ has moved a distance $Vt$ away from $O$. A point $P$ has coordinate $x$ in $S$ and $x'$ in $S'$. From the drawing, it is obvious that the total distance from $O$ to $P$ is the sum of the distance from $O$ to $O'$ and the distance from $O'$ to $P$. So, $x = Vt + x'$. Differentiate this with respect to time once for the velocity rule, and a second time for the acceleration rule.

## Common mistakes
*   **Scalar confusion:** Treating the velocity transformation $\vec{u} = \vec{u}' + \vec{V}$ as if it were a scalar equation for speeds, $u = u' + V$. This only works in 1D when all velocities are in the same direction. The worked example shows why vector addition is crucial.
*   **Frame ambiguity:** Writing down an equation like $\vec{v} = 10 \text{ m/s}$ without specifying *what* it is the velocity of, and *relative to what*. Always use subscripts for clarity, e.g., $\vec{v}_{\text{boat,water}}$. The rule is $\vec{v}_{AC} = \vec{v}_{AB} + \vec{v}_{BC}$.
*   **Applying to non-inertial frames:** Using these equations when one frame is accelerating (e.g., a car turning a corner, a rocket during launch). Galilean transformations are only valid for *inertial* (non-accelerating) reference frames.

## Self-check
1.  A river flows east at 2 m/s. A swimmer can swim at 1.5 m/s in still water. If the swimmer swims due north (relative to the water), what is their speed relative to the riverbank?
2.  A fighter jet is flying at 300 m/s due east. It fires a missile which has a velocity of 1000 m/s relative to the jet, also pointed due east. A stationary radar station on the ground is destroyed by the missile. What was the missile's impact velocity as measured by the radar station's equipment just before impact? Now, what if the missile was fired due *west*?
3.  Observer A sees a particle with position vector $\vec{r}_A(t) = (5t^2 - 2t)\hat{i} + 3t\hat{j}$. Observer B moves with a constant velocity $\vec{V} = 2\hat{i} - \hat{j}$ relative to observer A. Both observers start at the same origin at $t=0$. What is the acceleration of the particle as measured by observer B?