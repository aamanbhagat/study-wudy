## What it is
Projectile motion describes the path of an object launched into the air, subject only to the acceleration of gravity. The **time of flight** is the total time the object is in the air. The **maximum height** is the highest vertical position it reaches, and the **range** is the total horizontal distance it travels before returning to its launch height.

## Why it matters
This is the foundational model for any ballistic trajectory, from throwing a ball to calculating the path of an artillery shell or a sub-orbital rocket. In computer science, these exact equations power the physics engines for countless games and simulations. Understanding this topic is non-negotiable for later studies in orbital mechanics, where we replace constant gravity with an inverse-square law.

## When to study it
Before tackling these derivations, you must be comfortable with two prerequisite concepts:
1.  **Vector Decomposition:** Breaking a vector into its perpendicular components (e.g., $v_0 \rightarrow v_{0x}, v_{0y}$).
2.  **1D Kinematics:** The constant-acceleration equations of motion (often called SUVAT equations). Specifically, $s = ut + \frac{1}{2}at^2$ and $v = u + at$.

If you are not fluent with these, pause and review them first. Attempting this lesson without them will lead to frustration.

## How to study it (step by step)
1.  **Decompose the Initial Velocity:** Start every problem by taking the initial velocity vector, $v_0$ at an angle $\theta$ to the horizontal, and find its components: $v_{0x} = v_0 \cos\theta$ and $v_{0y} = v_0 \sin\theta$. Write these down.
2.  **Isolate the Motion:** Write down two sets of kinematic equations: one for the horizontal (x-direction) and one for the vertical (y-direction). Crucially, set $a_x = 0$ and $a_y = -g$. This separation is the key to everything.
3.  **Derive Time to Max Height ($t_{up}$):** Focus on the vertical motion. At the peak of the trajectory, the vertical velocity $v_y$ is momentarily zero. Use the equation $v_y = v_{0y} + a_y t$ to solve for the time it takes to reach this point.
4.  **Derive Total Time of Flight ($T$):** For a symmetric trajectory (landing at the same height it was launched from), the time to go up is equal to the time to come down. Therefore, the total time of flight is $T = 2 \times t_{up}$. Alternatively, solve for the time when the vertical displacement $s_y$ is zero.
5.  **Derive Max Height ($H$):** Using the time to max height ($t_{up}$) you just found, plug it into the vertical displacement equation $s_y = v_{0y}t + \frac{1}{2}a_y t^2$ to find the maximum height, $H$.
6.  **Derive Range ($R$):** Now, use the total time of flight ($T$). The range is the horizontal distance traveled in that time. Since horizontal velocity is constant, use the simple equation $s_x = v_{0x}t$. The range is $R = v_{0x}T$.
7.  **Solve Problems:** Work through 3-5 standard problems, applying these derived formulas directly. Then, solve 1-2 non-standard problems (e.g., launching from a cliff) where you must use the first principles from steps 1-2, not the final formulas.

## Key ideas, with intuition
1.  **Independence of Motion:** This is the single most important concept. The horizontal motion and the vertical motion are completely independent of each other, linked only by the fact that they happen for the same amount of time. Gravity only acts vertically; it has no effect on the horizontal velocity. Imagine firing a bullet horizontally and dropping another bullet from the same height at the exact same instant. They will both hit the ground at the same time. The fired bullet just happens to be moving very fast horizontally while it falls.

2.  **Horizontal Motion is Boring:** Since there is no horizontal acceleration ($a_x = 0$), the horizontal velocity $v_x$ is constant throughout the entire flight. The only equation you'll ever need for the horizontal dimension is:
    $$
    x = v_{0x}t = (v_0 \cos\theta)t
    $$

3.  **Vertical Motion is Just a Ball Thrown Upwards:** The vertical motion is identical to simply throwing a ball straight up in the air with an initial velocity of $v_{0y}$ and watching it come back down. It accelerates downwards at a constant rate $g$. The key kinematic equations are:
    $$
    v_y(t) = v_{0y} - gt
    $$
    $$
    y(t) = v_{0y}t - \frac{1}{2}gt^2
    $$

4.  **Symmetry is a Shortcut:** For a projectile that lands at the same height it was launched from, the trajectory is perfectly symmetric.
    *   Time to reach max height = Time to fall from max height.
    *   The landing velocity in the y-direction is the negative of the initial y-velocity: $v_{y,final} = -v_{0y}$.
    This symmetry simplifies derivations but is not universally true (e.g., launching from a cliff).

## Worked example
A cannon fires a ball with an initial velocity of $v_0 = 50 \text{ m/s}$ at an angle of $\theta = 37^\circ$ above the horizontal. Assuming $g = 9.8 \text{ m/s}^2$ and ignoring air resistance, find the time of flight, maximum height, and range. (Use $\sin(37^\circ) \approx 0.6$ and $\cos(37^\circ) \approx 0.8$).

**Step 1: Decompose Initial Velocity**
First, find the initial horizontal and vertical components of the velocity.
$v_{0x} = v_0 \cos\theta = 50 \text{ m/s} \times 0.8 = 40 \text{ m/s}$
$v_{0y} = v_0 \sin\theta = 50 \text{ m/s} \times 0.6 = 30 \text{ m/s}$

**Step 2: Find Time to Max Height ($t_{up}$)**
At the maximum height, the vertical velocity $v_y$ is zero. We use the vertical velocity kinematic equation: $v_y = v_{0y} - gt$.
$0 = 30 \text{ m/s} - (9.8 \text{ m/s}^2) t_{up}$
$t_{up} = \frac{30 \text{ m/s}}{9.8 \text{ m/s}^2} \approx 3.06 \text{ s}$

**Step 3: Find Total Time of Flight ($T$)**
Since the trajectory is symmetric (lands at the same height), the total time of flight is twice the time to reach the peak.
$T = 2 \times t_{up} = 2 \times 3.06 \text{ s} = 6.12 \text{ s}$

**Step 4: Find Maximum Height ($H$)**
Now we use the time to the peak, $t_{up}$, in the vertical displacement equation: $y(t) = v_{0y}t - \frac{1}{2}gt^2$.
$H = y(t_{up}) = (30 \text{ m/s})(3.06 \text{ s}) - \frac{1}{2}(9.8 \text{ m/s}^2)(3.06 \text{ s})^2$
$H = 91.8 \text{ m} - (4.9 \text{ m/s}^2)(9.36 \text{ s}^2)$
$H = 91.8 \text{ m} - 45.86 \text{ m} = 45.94 \text{ m}$

**Step 5: Find Range ($R$)**
The range is the horizontal distance traveled during the total time of flight, $T$. The horizontal velocity is constant.
$R = x(T) = v_{0x} \times T$
$R = (40 \text{ m/s}) \times (6.12 \text{ s}) = 244.8 \text{ m}$

*Reflection:* Each step logically builds on the last. We started by splitting the problem into two simpler 1D problems (x and y). We solved the vertical problem first to find the time, because time is the one variable that links the two dimensions. Then we used that time to find the horizontal range.

## Diagrams
```text
        ^ y
        |
        |         /|\
        |        / | \
        |       /  |  \
        |      /   |   \
 H .....|...../....|....\............
        |    /     |     \
        |   /      |      \
        |  /       |       \
      v_0 /        |        \
       / \         |         \
      /   \        |          \
     /     \       |           \
    / theta \      |            \
---+-------------------------------------> x
   O              R/2              R

O: Origin (launch point)
v_0: Initial velocity vector
theta: Launch angle
H: Maximum Height
R: Range
```

## Memory technique — remember this forever
1.  **The Story: "The Two Worlds"**
    Imagine two separate, parallel worlds. In World X, a car drives at a perfectly constant speed. In World Y, an acrobat is shot straight up from a cannon, goes up, and falls back down. Projectile motion is what you see when you superimpose these two worlds. The car's position is the x-coordinate, the acrobat's position is the y-coordinate. They are linked only by a shared clock. To find how far the car goes (Range), you first need to ask the acrobat's world how long the clock was running (Time of Flight).

2.  **Formulas to Overlearn:**
    *   Time of Flight: $T = \frac{2 v_0 \sin\theta}{g}$
    *   Maximum Height: $H = \frac{(v_0 \sin\theta)^2}{2g}$
    *   Range: $R = \frac{v_0^2 \sin(2\theta)}{g}$

3.  **Spaced Repetition Schedule:**
    Review these derivations and formulas at these intervals from today: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive them from scratch each time.

4.  **First Principles Pathway:**
    If you forget everything, remember this:
    a. Write down $v_{0x} = v_0 \cos\theta$ and $v_{0y} = v_0 \sin\theta$.
    b. Write down the two independent sets of motion equations:
       *   X-direction: $a_x = 0$, so $x = v_{0x}t$.
       *   Y-direction: $a_y = -g$, so $y = v_{0y}t - \frac{1}{2}gt^2$ and $v_y = v_{0y} - gt$.
    c. From these three equations, you can rebuild everything. To find time of flight, set $y=0$. To find max height, find the time when $v_y=0$ and plug it into the $y$ equation. To find range, plug the total time of flight into the $x$ equation.

## Common mistakes
1.  **Using full $v_0$ in 1D equations:** Students mistakenly plug the entire initial speed $v_0$ into the vertical or horizontal kinematic equations. You *must* use the components, $v_{0x}$ or $v_{0y}$.
2.  **Assuming $v=0$ at the peak:** The *vertical* velocity $v_y$ is zero at the peak, but the horizontal velocity $v_x$ is still its original constant value. The total velocity is not zero unless the object was thrown straight up.
3.  **Applying symmetric formulas to asymmetric problems:** The formulas for $T$, $H$, and $R$ derived above assume the launch and landing heights are the same. If a projectile is launched from a cliff and lands below, these formulas are invalid. You must go back to first principles.
4.  **Angle Units:** Using degrees in a calculator that's set to radians, or vice versa. Always check your calculator's mode.

## Self-check
1.  A golf ball is hit with an initial speed of $40 \text{ m/s}$ at an angle of $60^\circ$ above the horizontal. Find its time of flight, maximum height, and range.
2.  An arrow is shot and achieves a maximum height of $20 \text{ m}$ and travels a horizontal distance of $160 \text{ m}$ before returning to the same height. What were its initial speed and launch angle?
3.  A stone is thrown from the top of a 50-meter-tall building with an initial speed of $20 \text{ m/s}$ at an angle of $30^\circ$ above the horizontal. How far from the base of the building does the stone land? (Hint: The final vertical displacement is $s_y = -50 \text{ m}$).