## What it is
Projectile motion describes the path of an object moving in two dimensions under the sole influence of gravity. The core principle is the **independence of motion**: the object's horizontal motion and vertical motion can be analyzed as two separate, one-dimensional problems that share only a common time variable. The horizontal motion has constant velocity, while the vertical motion has constant downward acceleration.

## Why it matters
This principle is the foundation for ballistics, from firing a cannon to calculating the trajectory of a rocket during its initial atmospheric ascent. In orbital mechanics, understanding how to separate motion components is crucial for analyzing orbits. In computer science, game engines use these exact equations to simulate realistic physics for everything from a thrown grenade to a character's jump.

## When to study it
Before tackling this, you must have a solid grasp of the following:
1.  **1D Kinematics:** The constant acceleration equations (often called "suvat" equations): $v = u + at$, $s = ut + \frac{1}{2}at^2$, and $v^2 = u^2 + 2as$.
2.  **Vectors:** Decomposing a vector into its horizontal ($x$) and vertical ($y$) components using trigonometry ($\vec{v} \rightarrow v_x = v \cos\theta, v_y = v \sin\theta$).
3.  **Newton's Second Law:** The concept that a net force causes acceleration ($\vec{F}_{\text{net}} = m\vec{a}$), and that zero net force means zero acceleration (constant velocity).

If you are not fluent in these, master them first. Otherwise, you will be memorizing formulas without understanding their origin.

## How to study it (step by step)
1.  **The Thought Experiment:** Imagine you are at the top of a tower. You drop one cannonball straight down and simultaneously fire another one horizontally. Which one hits the ground first? Meditate on the fact that they hit at the *exact same time*. This is the key intuition: gravity pulls the fired ball down at the same rate as the dropped ball, completely indifferent to its horizontal speed.
2.  **Derive from First Principles:** Start with Newton's Second Law, $\vec{F}_{\text{net}} = m\vec{a}$. In projectile motion (ignoring air resistance), the only force is gravity: $\vec{F}_g = -mg\hat{j}$ (assuming $\hat{j}$ is the unit vector for "up").
3.  **Decompose the Equations:** Break the vector equation $\vec{a} = \vec{F}_{\text{net}}/m$ into components.
    *   x-component: $a_x = F_x/m = 0/m = 0$.
    *   y-component: $a_y = F_y/m = -mg/m = -g$.
4.  **Integrate to Find Velocity and Position:** Integrate the acceleration components with respect to time to get the velocity equations. Integrate again to get the position equations. Use the initial conditions at $t=0$: $x(0)=0$, $y(0)=0$, $v_x(0)=v_0 \cos\theta$, $v_y(0)=v_0 \sin\theta$.
5.  **Solve a Standard Problem:** Use the derived equations to solve for the three key quantities of a projectile launched from level ground: time of flight, maximum height, and range. Do not look up the formulas; derive them yourself.
6.  **Solve a Non-Standard Problem:** Solve a problem where the launch and landing heights are different. This forces you to apply the core equations rather than memorized results. For example: a projectile launched from a cliff of height $h$.

## Key ideas, with intuition
1.  **The Great Divorce:** Horizontal and vertical motions are independent. Gravity is a vertical force; it has no horizontal component. Therefore, it can only change the vertical component of velocity. The horizontal velocity of a projectile, once launched, is constant (ignoring air resistance).
    $$ a_x = 0 \implies v_x(t) = v_{0x} \quad (\text{constant}) $$
    $$ a_y = -g \implies v_y(t) = v_{0y} - gt \quad (\text{changes linearly with time}) $$

2.  **Time is the Bridge:** Time, $t$, is the one variable that connects the two independent motions. The projectile stops moving horizontally at the same instant it stops moving vertically (when it hits the ground). To find the range (a horizontal distance), you first need to solve the vertical problem to find the total time of flight.

3.  **Symmetry in the Path (for level ground):** For a projectile launched and landing at the same height, the trajectory is a perfect parabola. The time to reach the maximum height (the apex) is exactly half the total time of flight. The velocity at the apex is purely horizontal; the vertical velocity is momentarily zero.
    $$ v_y(\text{apex}) = 0 $$

4.  **The Equations are just 1D Kinematics in Disguise:** Look at the two sets of equations. The horizontal set is just the 1D kinematics for $a=0$. The vertical set is just the 1D kinematics for $a=-g$. You are not learning new physics, just applying existing principles in two dimensions simultaneously.
    *   **Horizontal:** $x(t) = x_0 + v_{0x}t$
    *   **Vertical:** $y(t) = y_0 + v_{0y}t - \frac{1}{2}gt^2$

## Worked example
**Problem:** A projectile is launched from the ground with an initial speed $v_0 = 50 \, \text{m/s}$ at an angle of $\theta = 30^\circ$ above the horizontal. Air resistance is negligible. Find (a) the time of flight, (b) the maximum height reached, and (c) the range. Use $g = 9.8 \, \text{m/s}^2$.

**Solution:**

**Step 1: Define a coordinate system and list initial conditions.**
Let the launch point be the origin $(0,0)$. Let "up" be the positive y-direction and "right" be the positive x-direction.
*   $x_0 = 0$, $y_0 = 0$
*   $v_0 = 50 \, \text{m/s}$, $\theta = 30^\circ$
*   $a_x = 0$, $a_y = -g = -9.8 \, \text{m/s}^2$

**Step 2: Decompose the initial velocity.**
Find the initial horizontal and vertical components of the velocity.
*   $v_{0x} = v_0 \cos\theta = 50 \cos(30^\circ) = 50 \left(\frac{\sqrt{3}}{2}\right) = 25\sqrt{3} \approx 43.3 \, \text{m/s}$
*   $v_{0y} = v_0 \sin\theta = 50 \sin(30^\circ) = 50 \left(\frac{1}{2}\right) = 25 \, \text{m/s}$

**Step 3: Find the total time of flight (a).**
The flight ends when the projectile returns to the ground, i.e., when $y(t) = 0$.
Use the vertical position equation: $y(t) = y_0 + v_{0y}t + \frac{1}{2}a_yt^2$.
$$ 0 = 0 + (25)t + \frac{1}{2}(-9.8)t^2 $$
$$ 0 = 25t - 4.9t^2 $$
$$ 0 = t(25 - 4.9t) $$
This equation has two solutions: $t=0$ (the launch) and $25 - 4.9t = 0$.
$$ t_{\text{flight}} = \frac{25}{4.9} \approx 5.1 \, \text{s} $$

**Step 4: Find the maximum height (b).**
The maximum height occurs at the apex, where the vertical velocity is momentarily zero ($v_y = 0$).
Use the vertical velocity equation: $v_y(t) = v_{0y} + a_yt$.
$$ 0 = 25 + (-9.8)t_{\text{apex}} $$
$$ t_{\text{apex}} = \frac{25}{9.8} \approx 2.55 \, \text{s} $$
Notice this is exactly half the total flight time, as expected.
Now plug this time into the vertical position equation to find the height $H$:
$$ H = y(t_{\text{apex}}) = (25)(2.55) - \frac{1}{2}(9.8)(2.55)^2 \approx 63.75 - 31.86 \approx 31.9 \, \text{m} $$

**Step 5: Find the range (c).**
The range is the total horizontal distance traveled during the time of flight.
Use the horizontal position equation: $x(t) = x_0 + v_{0x}t$.
$$ R = x(t_{\text{flight}}) = 0 + (43.3)(5.1) \approx 220.8 \, \text{m} $$

**Reflection:** Each step was a self-contained 1D kinematics problem. We used the vertical equations to find time because we had a clear condition (y=0 or v_y=0). We then used that time as the "bridge" to the horizontal world to find the range. This separation is the entire strategy.

## Diagrams
```text
           ^ y
           |
           |         /---------\
           |        /           \
         H +-------(vx, vy=0)----+ Apex
           |      /               \
           |     /                 \
(v0y) ^    |    /                   \
      |    |   /                     \
      |   /   /                       \
      v0 o--> (v0x)                    o--> x
           | /                         | \
           +---------------------------+-- R ---
         (0,0)                      (Range, 0)

Figure 1: Trajectory of a projectile. The initial velocity vector v0 is
decomposed into its x and y components. At the apex, the vertical
velocity vy is zero, but the horizontal velocity vx remains constant.
H is maximum height, R is range.
```

## Memory technique — remember this forever
1.  **Visual Hook:** The "MythBusters" experiment where they fired a bullet horizontally and dropped another simultaneously. Watch a video of it. They hit the ground at the same time. The sound of the fired bullet and the dropped bullet hitting the ground simultaneously is the sound of horizontal/vertical independence. Your brain will not forget this.

2.  **Must-learn formulas:** Do not just memorize the range formula. Memorize the fundamental kinematic equations for projectiles, from which all else is derived.
    *   $a_x = 0$
    *   $a_y = -g$
    *   $x(t) = x_0 + (v_0 \cos\theta) t$
    *   $y(t) = y_0 + (v_0 \sin\theta) t - \frac{1}{2}gt^2$

3.  **Spaced Repetition Schedule:** Re-derive the time of flight, max height, and range formulas from the equations above on this schedule:
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 7 days
    *   In 16 days
    *   In 35 days

4.  **First Principles Pathway:** If you forget everything, rebuild from $\vec{F}_{\text{net}} = m\vec{a}$.
    *   The only force is gravity, $\vec{F} = (0, -mg)$.
    *   Therefore, $\vec{a} = (0, -g)$.
    *   Integrate $\vec{a}$ with respect to time to get $\vec{v}(t) = (C_1, -gt + C_2)$.
    *   Use initial conditions $\vec{v}(0) = (v_0\cos\theta, v_0\sin\theta)$ to find constants $C_1, C_2$.
    *   Integrate $\vec{v}(t)$ to get position $\vec{r}(t)$.
    *   This always works.

## Common mistakes
1.  **Using the full speed $v_0$ in a 1D equation.** You cannot use $v_0$ in the vertical or horizontal equations. You *must* use its components, $v_{0x}$ or $v_{0y}$.
2.  **Sign Errors.** Define your coordinate system and stick to it. If "up" is positive, then displacement to the apex is positive, but acceleration $g$ is negative ($a_y = -g$). Inconsistency here is the most common source of error.
3.  **Assuming $v_y=0$ at landing.** The vertical velocity is zero only at the peak of the trajectory. When the object hits the ground, its vertical position is zero (if it started from the ground), but its vertical velocity is non-zero and pointing downwards.

## Self-check
1.  A stone is thrown horizontally from a 78.4 m high cliff with a speed of 5 m/s. How long does it take to hit the water below?
2.  A football is kicked from the ground with an initial velocity of 20 m/s at an angle of 60° to the horizontal. What is its velocity vector (in terms of its x and y components) after 1.5 seconds?
3.  For a projectile launched from level ground with a fixed initial speed $v_0$, show that the range is the same for a launch angle of $\theta$ as it is for a launch angle of $90^\circ - \theta$. What angle gives the maximum possible range?