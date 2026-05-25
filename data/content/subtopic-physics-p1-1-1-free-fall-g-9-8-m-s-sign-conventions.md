## What it is
Free fall is the motion of an object where the only force acting on it is gravity. Near the Earth's surface, this results in a constant downward acceleration, denoted by the vector $\vec{g}$. The magnitude of this acceleration is approximately $g \approx 9.8 \, \text{m/s}^2$ or $32 \, \text{ft/s}^2$.

## Why it matters
Understanding free fall is the first step toward analyzing any trajectory, from a thrown baseball to a suborbital rocket flight. The principles of constant acceleration and consistent sign conventions are foundational for projectile motion, orbital mechanics, and entry, descent, and landing (EDL) sequences for planetary probes. Get this right, and more complex dynamics problems become manageable.

## When to study it
You must have a solid grasp of the one-dimensional kinematic equations for constant acceleration. Specifically, you should be able to define and relate position ($x$), velocity ($v$), and acceleration ($a$). Familiarity with basic vectors (understanding that direction matters) is essential.

## How to study it (step by step)
1.  **Memorize the Kinematic Equations:** Write down the three core equations for constant acceleration from memory.
    *   $v_f = v_i + at$
    *   $\Delta x = v_i t + \frac{1}{2}at^2$
    *   $v_f^2 = v_i^2 + 2a\Delta x$
    Replace $x$ with $y$ for vertical motion. These are your tools.

2.  **Define Your Coordinate System First:** Before writing any numbers, draw your physical situation and your coordinate system. The most common choice is "up is the positive y-direction." Stick with this until it's second nature.

3.  **Assign Signs to All Quantities:** Based on your chosen coordinate system, assign a sign to every known and unknown vector quantity: initial position ($y_0$), final position ($y$), initial velocity ($v_{y0}$), final velocity ($v_y$), and acceleration ($a_y$). If "up" is positive, then the acceleration due to gravity is *always* $a_y = -g = -9.8 \, \text{m/s}^2$.

4.  **Solve a "Drop" Problem:** An object is dropped from a 100m tower. How fast is it going just before it hits the ground?
    *   System: Up is positive, origin at the ground.
    *   Knowns: $y_0 = +100 \, \text{m}$, $y = 0 \, \text{m}$, $v_{y0} = 0 \, \text{m/s}$ (dropped), $a_y = -9.8 \, \text{m/s}^2$.
    *   Choose equation: $v_y^2 = v_{y0}^2 + 2a_y(y - y_0)$.
    *   Solve and check the sign. The math will give $v_y^2 \approx 1960$, so $v_y = \pm 44.3 \, \text{m/s}$. Since the object is moving downward, the correct physical answer is $v_y = -44.3 \, \text{m/s}$.

5.  **Solve a "Toss-Up" Problem:** An object is thrown upward at $20 \, \text{m/s}$. What is its velocity at its highest point? What is its acceleration at its highest point?
    *   Velocity at the peak is momentarily $v_y = 0$. This is the key to solving for max height.
    *   Acceleration is *never* zero while in the air. It is *always* $a_y = -9.8 \, \text{m/s}^2$, even at the very top. Gravity doesn't turn off.

## Key ideas, with intuition
1.  **$g$ is a magnitude, $a_y$ is a component.** The number $g = 9.8 \, \text{m/s}^2$ is a positive scalar representing the *strength* of gravity's pull. The acceleration component, $a_y$, gets a sign ($+$ or $-$) based on your chosen coordinate system. Never write "$g = -9.8 \, \text{m/s}^2$". Instead, write "$a_y = -g$".
    $$ \vec{a} = \vec{g} \implies a_y = -g \quad (\text{if 'up' is positive}) $$

2.  **The sign convention is a choice, but it is a binding contract.** You can choose "down" as the positive direction. If you do, gravity's acceleration component becomes $a_y = +g$. All other quantities must follow suit: an object thrown *upward* would have a *negative* initial velocity. The final physics is identical. Consistency is the only rule.

3.  **Velocity and acceleration can have opposite signs.** When you throw a ball up, its velocity is initially positive (moving up), but its acceleration is negative (pulling it down). This means the object is slowing down. On the way down, both velocity and acceleration are negative (moving down, and being pulled down), so the object is speeding up.

4.  **The apex of the trajectory is a special point.** At the maximum height, the instantaneous vertical velocity is zero: $v_y = 0$. This is a powerful piece of information for solving problems. The acceleration, however, remains constant at $a_y = -g$. An object can have zero velocity and non-zero acceleration simultaneously.

## Worked example
A stone is thrown vertically upward from the edge of a cliff 50.0 m high with an initial speed of 15.0 m/s. How long does it take to hit the ground at the base of the cliff?

**Step 1: Define the coordinate system.**
Let's set the origin ($y=0$) at the base of the cliff. The positive y-direction will be upward.

**Step 2: List all known quantities with their signs.**
*   Initial position: $y_0 = +50.0 \, \text{m}$ (starts 50m above the origin)
*   Final position: $y = 0 \, \text{m}$ (ends at the origin/ground)
*   Initial velocity: $v_{y0} = +15.0 \, \text{m/s}$ (thrown upward)
*   Acceleration: $a_y = -g = -9.80 \, \text{m/s}^2$ (gravity acts downward)
*   Unknown: time $t$

**Step 3: Select the appropriate kinematic equation.**
We have information about position, initial velocity, and acceleration, and we want to find time. The equation relating these is:
$$ y = y_0 + v_{y0}t + \frac{1}{2}a_y t^2 $$

**Step 4: Substitute the values and solve.**
$$ 0 = 50.0 + (15.0)t + \frac{1}{2}(-9.80)t^2 $$
Rearranging into standard quadratic form ($At^2 + Bt + C = 0$):
$$ 4.90t^2 - 15.0t - 50.0 = 0 $$
Use the quadratic formula, $t = \frac{-B \pm \sqrt{B^2 - 4AC}}{2A}$:
$$ t = \frac{-(-15.0) \pm \sqrt{(-15.0)^2 - 4(4.90)(-50.0)}}{2(4.90)} $$
$$ t = \frac{15.0 \pm \sqrt{225 + 980}}{9.80} $$
$$ t = \frac{15.0 \pm \sqrt{1205}}{9.80} $$
$$ t = \frac{15.0 \pm 34.71}{9.80} $$

**Step 5: Interpret the results.**
This gives two possible answers for $t$:
$$ t_1 = \frac{15.0 + 34.71}{9.80} = \frac{49.71}{9.80} \approx 5.07 \, \text{s} $$
$$ t_2 = \frac{15.0 - 34.71}{9.80} = \frac{-19.71}{9.80} \approx -2.01 \, \text{s} $$
Since time must be positive, the physical answer is $t = 5.07 \, \text{s}$.

**Reflection:** Each step was necessary. Defining the coordinate system and signs in Step 1 and 2 prevented fatal errors. Choosing the correct equation in Step 3 led to a solvable path. Recognizing that the quadratic equation yields two roots and that only the positive one is physically meaningful was the final critical step. The negative root represents the time it would have taken for the stone to travel from the ground up to the cliff edge, had it been launched from the ground.

## Diagrams
Here are two common sign conventions for a ball thrown upwards from the ground.

**Convention 1: Up is Positive (most common)**
```text
      +y ^
         |
         |  (peak: v=0, a=-g)
         *
        / \
       /   \
 v_0>0 /     \ v<0
      /       \
  ---*---------*------> Ground (y=0)
     t=0       t_final

Acceleration vector `a` always points down:
         |
         |
         V a = -g
```

**Convention 2: Down is Positive**
```text
  ---*---------*------> Ground (y=0)
     t=0       t_final
      \       /
 v_0<0 \     / v>0
        \   /
         \ /
          *
         |  (peak: v=0, a=+g)
         |
      +y V

Acceleration vector `a` still points down, which is now the positive direction:
         |
         |
         V a = +g
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Gravity is a downer." It always pulls things **down**. If you define your world with **up** as positive (like a good mood), gravity's effect ($a_y$) is **negative**. If you define your world with **down** as positive (going with the flow), gravity's effect ($a_y$) is **positive**.

2.  **Must-know formulas:** Overlearn the constant acceleration kinematic equations.
    $$ v_f = v_i + at $$
    $$ \Delta y = v_i t + \frac{1}{2}at^2 $$
    $$ v_f^2 = v_i^2 + 2a\Delta y $$

3.  **Spaced repetition schedule:** Review problems using these conventions at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not skip this.

4.  **First principles pathway:** If you forget the formulas, re-derive them from calculus. Start with the definition of constant acceleration, $a = \text{const}$.
    *   $a = \frac{dv}{dt} \implies \int_{v_0}^{v(t)} dv = \int_0^t a \, dt' \implies v(t) - v_0 = at \implies v(t) = v_0 + at$.
    *   $v = \frac{dy}{dt} \implies \int_{y_0}^{y(t)} dy = \int_0^t v(t') \, dt' = \int_0^t (v_0 + at') \, dt' \implies y(t) - y_0 = v_0 t + \frac{1}{2}at^2$.

## Common mistakes
1.  **Using $g = -9.8 \, \text{m/s}^2$.** This is conceptually wrong. $g$ is the positive magnitude $9.8 \, \text{m/s}^2$. The component $a_y$ is what becomes $-g$ (or $+g$) depending on your axis choice.
2.  **Setting $a_y = 0$ at the peak of a trajectory.** Velocity is momentarily zero at the top, but acceleration is *always* pointing down with magnitude $g$. If acceleration were zero, the object would stay at the top forever.
3.  **Inconsistent signs.** Choosing "up" as positive, but then using a positive value for the displacement of an object that falls from a table to the floor. If it ends up below where it started, $\Delta y$ is negative.
4.  **Forgetting initial velocity.** When an object is dropped from a moving platform (like a rising balloon or a moving rocket), its initial velocity is the velocity of the platform, not zero.

## Self-check
1.  A brick is dropped from rest from a height of 80m. How long is it in the air?
2.  A ball is thrown vertically upward with a speed of $25 \, \text{m/s}$. What is its speed when it returns to the level from which it was thrown? What is its velocity at that point?
3.  A stone is dropped into a deep well. You hear the splash 3.0 seconds later. Assuming the speed of sound is infinite for this problem, how deep is the well? Now, how would your approach change if the speed of sound were a finite $343 \, \text{m/s}$? (Set up the equations, you don't need to solve the harder case).