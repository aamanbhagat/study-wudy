## 1. What it is — in plain English

Imagine you're holding a ball, and you let go. What happens? It falls! This seems incredibly obvious, but the specific way it falls, just under the influence of Earth's gravity, is what we call "free fall."

When an object is in free fall, it means the only significant force acting on it is gravity. We're essentially ignoring things like air pushing against it (air resistance) or any other pushes or pulls. It's just gravity doing its thing, pulling the object downwards.

Because gravity pulls everything towards the center of the Earth, objects in free fall constantly speed up as they fall. This speeding up isn't random; it happens at a very specific, constant rate. This rate of acceleration is what we refer to as "$g$".

On Earth, near its surface, this acceleration $g$ is approximately $9.8$ meters per second squared ($9.8 \, \text{m/s}^2$). This means that for every second an object is falling freely, its downward speed increases by $9.8$ meters per second. Whether you drop a feather (in a vacuum) or a bowling ball, they would both accelerate downwards at this same rate.

So, in simple terms, free fall is the motion of an object solely under the influence of gravity, and on Earth, that means it accelerates downwards at a constant $9.8 \, \text{m/s}^2$.

## 2. Why it matters — real-world applications

Understanding free fall and the acceleration due to gravity ($g$) is foundational to almost all physics and engineering, especially in rocketry and aerospace.

1.  **Rocket Launch and Trajectory Planning (Aerospace):** When a rocket launches, it's fighting against gravity. Knowing $g$ allows engineers at companies like SpaceX or NASA to calculate the precise thrust needed to lift off, how much fuel to burn, and how the rocket's velocity will change as it ascends. During the initial phases of flight, before orbital mechanics dominate, the rocket's vertical motion is directly affected by $g$. Even when planning re-entry, understanding the deceleration due to gravity (and atmospheric drag) is critical for safe landing.

2.  **Satellite Orbits and Spacecraft Maneuvers (Aerospace/Physics):** While satellites in orbit aren't "falling" to the ground, they are continuously "falling around" the Earth. Their orbital paths are a delicate balance between their forward velocity and the Earth's gravitational pull (which causes them to accelerate towards Earth, i.e., free fall towards it). Understanding $g$ and its variation with altitude is crucial for calculating orbital velocities, planning rendezvous maneuvers for spacecraft, and predicting satellite decay.

3.  **Ballistics and Sports Science (Engineering/Physics):** Any time an object is thrown or launched—a basketball shot, a golf swing, a javelin throw, or even the trajectory of a bullet—its path is governed by gravity. Sports scientists use the principles of free fall (as part of projectile motion) to analyze athlete performance, optimize equipment design, and predict where a ball will land. For example, understanding $g$ allows engineers to design golf clubs that achieve specific launch angles and distances.

4.  **Structural Engineering and Safety (Engineering):** Engineers designing buildings, bridges, or roller coasters must account for the forces of gravity. Understanding how objects accelerate under free fall helps in calculating impact forces if something falls, designing safety mechanisms (like fall arrest systems), or ensuring that structures can withstand the weight and dynamic loads imposed by gravity on moving parts. For instance, designing an elevator system requires precise calculations involving $g$ to ensure smooth acceleration and deceleration.

5.  **Autonomous Systems and Robotics (ML/Physics):** Robots and autonomous vehicles that interact with the physical world need to understand gravity. For example, a drone performing a package delivery needs to accurately predict the drop trajectory of a package to ensure it lands at the target. This involves real-time calculations based on the drone's velocity and the constant acceleration due to gravity. Similarly, a robotic arm picking up and placing objects needs to account for how gravity affects the object's movement once released.

## 3. Prerequisites — what you must know first

Before diving deep into free fall, ensure you have a solid grasp of these fundamental concepts:

*   **Displacement, Velocity, and Acceleration:** Understanding what these terms mean, their vector nature (magnitude and direction), and their standard SI units (meters, m/s, m/s²).
*   **Kinematic Equations (Equations of Motion):** The set of four primary equations that describe motion with constant acceleration. You should be able to recall and apply them.
*   **Vectors:** How to represent quantities that have both magnitude and direction, how to add and subtract them, and the concept of components. This is crucial for understanding sign conventions.
*   **Units and SI System:** Familiarity with the International System of Units (meter, kilogram, second) and how to perform unit conversions.
*   **Basic Algebra:** Solving linear and quadratic equations, rearranging formulas.

## 4. The core idea — step by step

Let's break down the concept of free fall into manageable steps, building your intuition and formal understanding.

### Step 1: The Universal Force of Gravity

*   **Plain-English Statement:** Every object in the universe attracts every other object. For us on Earth, this means the Earth constantly pulls everything towards its center. This pull is what we call gravity.
*   **Small Concrete Example:** When you drop a pen, it doesn't float away or move sideways; it goes straight down. That's Earth's gravity pulling it.
*   **Formal/Mathematical Version:** While the full description is Newton's Law of Universal Gravitation ($F = G \frac{m_1 m_2}{r^2}$), for objects near the Earth's surface, we simplify this. The force of gravity on an object of mass $m$ is $F_g = mg$, where $g$ is the acceleration due to gravity.
*   **What Could Go Wrong:** Confusing the *force* of gravity ($F_g$) with the *acceleration* due to gravity ($g$). They are related, but not the same. $g$ is the *effect* (acceleration) caused by the gravitational *force*.

### Step 2: What "Free Fall" Really Means

*   **Plain-English Statement:** "Free fall" is a special condition where an object is moving solely under the influence of gravity, and we specifically ignore any other forces like air resistance. It's an idealization, a simplified model of reality.
*   **Small Concrete Example:** If you drop a bowling ball and a feather in a room full of air, the bowling ball hits the ground first. But if you drop them in a vacuum chamber (where there's no air), they hit the ground at the exact same time. The vacuum chamber scenario is free fall.
*   **Formal/Mathematical Version:** In free fall, the net force on an object of mass $m$ is just the gravitational force, $F_{net} = F_g$. By Newton's Second Law ($F_{net} = ma$), this means $ma = mg$. Dividing by $m$, we get $a = g$. This shows that the acceleration of an object in free fall is always $g$, regardless of its mass.
*   **What Could Go Wrong:** Forgetting the crucial assumption of "no air resistance." In many real-world scenarios, air resistance is significant and cannot be ignored. For introductory physics problems, however, "free fall" almost always implies neglecting air resistance.

### Step 3: The Value of $g$ — Acceleration Due to Gravity

*   **Plain-English Statement:** The acceleration due to gravity, denoted by $g$, tells us how quickly an object's velocity changes when it's in free fall. On Earth's surface, it's roughly $9.8$ meters per second squared.
*   **Small Concrete Example:** If you drop a rock from rest ($0 \, \text{m/s}$), after 1 second, its speed will be $9.8 \, \text{m/s}$. After 2 seconds, its speed will be $19.6 \, \text{m/s}$ ($2 \times 9.8$). After 3 seconds, it'll be $29.4 \, \text{m/s}$ ($3 \times 9.8$), and so on. Its speed increases by $9.8 \, \text{m/s}$ every second.
*   **Formal/Mathematical Version:** The magnitude of the acceleration due to gravity near the Earth's surface is approximately $g = 9.8 \, \text{m/s}^2$. (Sometimes approximated as $9.81 \, \text{m/s}^2$ or even $10 \, \text{m/s}^2$ for quick estimates). This acceleration is always directed downwards, towards the center of the Earth.
*   **What Could Go Wrong:**
    *   Using $g$ as a velocity or displacement instead of an acceleration.
    *   Confusing the units: $g$ is in $\text{m/s}^2$, not $\text{m/s}$.
    *   Forgetting that $g$ is a *magnitude*; the *direction* of the acceleration must be handled by sign conventions (see Step 4).

### Step 4: Direction Matters — Sign Conventions

*   **Plain-English Statement:** When dealing with motion, especially vertical motion, we need to decide which direction is "positive" and which is "negative." This is called setting up a coordinate system or choosing a sign convention. Once you choose, you *must* stick to it consistently throughout the entire problem.
*   **Small Concrete Example:** If you decide "up" is positive, then any upward velocity will be positive, and any downward velocity will be negative. Since gravity always pulls *downwards*, the acceleration due to gravity ($g$) will always be negative ($a = -g$) if "up" is positive. Conversely, if you decide "down" is positive, then $g$ will be positive ($a = +g$).
*   **Formal/Mathematical Version:**
    *   **Convention 1 (Most Common):** Up is positive ($+y$), Down is negative ($-y$). In this case, the acceleration due to gravity is $a_y = -g = -9.8 \, \text{m/s}^2$.
    *   **Convention 2:** Down is positive ($+y$), Up is negative ($-y$). In this case, the acceleration due to gravity is $a_y = +g = +9.8 \, \text{m/s}^2$.
    *   Your choice of origin (where $y=0$) also matters. Often, the ground is $y=0$.
*   **What Could Go Wrong:**
    *   Inconsistency! Switching your sign convention halfway through a problem.
    *   Forgetting to assign a sign to $g$. $g$ is a magnitude; the acceleration *vector* has a direction (and thus a sign).
    *   Confusing the sign of initial velocity with the sign of acceleration. An object thrown upwards has a positive initial velocity (if up is positive), but its acceleration is still negative (due to gravity pulling it down).

### Step 5: Applying Kinematic Equations to Free Fall

*   **Plain-English Statement:** The constant acceleration formulas (kinematic equations) we learned for general motion work perfectly for free fall because $g$ is a constant acceleration. We just replace 'a' with 'g' (with the correct sign!) and usually use 'y' for vertical displacement instead of 'x'.
*   **Small Concrete Example:** If you drop a ball from a $20 \, \text{m}$ tall building (assuming up is positive, and the ground is $y=0$), you know its initial position ($y_0 = 20 \, \text{m}$), initial velocity ($v_0 = 0$), and acceleration ($a = -9.8 \, \text{m/s}^2$). You can then use the equation $y = y_0 + v_0t + \frac{1}{2}at^2$ to find the time it takes to hit the ground ($y=0$).
*   **Formal/Mathematical Version:**
    Given the standard kinematic equations for constant acceleration:
    1.  $v = v_0 + at$
    2.  $\Delta x = v_0t + \frac{1}{2}at^2$
    3.  $v^2 = v_0^2 + 2a\Delta x$
    4.  $\Delta x = \frac{1}{2}(v_0 + v)t$

    For free fall (vertical motion, let's use 'y' for displacement and assume up is positive, so $a = -g$):
    1.  $v_y = v_{0y} - gt$
    2.  $\Delta y = y - y_0 = v_{0y}t - \frac{1}{2}gt^2$
    3.  $v_y^2 = v_{0y}^2 - 2g\Delta y$
    4.  $\Delta y = \frac{1}{2}(v_{0y} + v_y)t$
*   **What Could Go Wrong:**
    *   Using an equation that doesn't fit the knowns and unknowns.
    *   Mixing up initial and final velocities or positions.
    *   Forgetting that $\Delta y = y_{final} - y_{initial}$.

### Step 6: Special Cases: Dropped vs. Thrown

*   **Plain-English Statement:** The initial velocity ($v_0$) is a critical piece of information. Whether an object is simply "dropped" or "thrown" changes its initial velocity value, which significantly impacts the rest of the calculation.
*   **Small Concrete Example:**
    *   If a ball is "dropped from rest," its initial velocity $v_0 = 0 \, \text{m/s}$.
    *   If a ball is "thrown downwards" with a speed of $5 \, \text{m/s}$, and "up" is positive, its initial velocity $v_0 = -5 \, \text{m/s}$.
    *   If a ball is "thrown upwards" with a speed of $5 \, \text{m/s}$, and "up" is positive, its initial velocity $v_0 = +5 \, \text{m/s}$.
*   **Formal/Mathematical Version:** $v_{0y}$ is a variable in all kinematic equations. Its value and sign must be correctly identified from the problem statement.
*   **What Could Go Wrong:** Automatically assuming $v_0 = 0$ for every free-fall problem. This is a common mistake; only objects "dropped from rest" or "released" have zero initial velocity. Objects thrown upwards or downwards have a non-zero $v_0$.

## 8. ASCII diagrams

```text
       ^ +y
       |
       |  (Initial Position, y_0, t=0)
       O  <-- Initial Velocity (v_0) could be up, down, or zero
       |
       |  Acceleration due to gravity (a = -g or a = +g, depending on convention)
       |  ALWAYS points downwards.
       |
       |
       |
       V  (Final Position, y, t)
       O  <-- Final Velocity (v)
       |
       |
       -------------------------- y=0 (Ground/Origin)
```
*   **Figure Description:** This diagram illustrates the setup for a typical free-fall problem. A vertical axis (y-axis) indicates direction, with an arrow pointing upwards signifying the positive y-direction. An object is shown at an initial position ($y_0$) at time $t=0$. It has an initial velocity ($v_0$), which can be upwards, downwards, or zero (if dropped). The acceleration due to gravity, represented by a downward arrow labeled 'a', is constant and always points towards the negative y-direction if 'up' is positive. The object falls to a final position ($y$) at a later time $t$, with a final velocity ($v$). A horizontal line at the bottom represents the ground, often chosen as the origin ($y=0$).

## 5. Worked examples — multiple, with every step shown

We will use the sign convention: **Up is positive (+), Down is negative (-)**. The origin ($y=0$) will be at the ground unless specified.
Therefore, the acceleration due to gravity will be $a = -g = -9.8 \, \text{m/s}^2$.

### Example 1: Dropping a Rock

**Problem:** A rock is dropped from the top of a $45 \, \text{m}$ high building. How long does it take to hit the ground, and what is its velocity just before impact?

**Given:**
*   Initial height, $y_0 = +45 \, \text{m}$ (relative to ground, which is $y=0$)
*   Final height, $y = 0 \, \text{m}$ (when it hits the ground)
*   Initial velocity, $v_0 = 0 \, \text{m/s}$ (because it's "dropped from rest")
*   Acceleration, $a = -g = -9.8 \, \text{m/s}^2$

**Want:**
*   Time to hit the ground, $t$
*   Final velocity, $v$

---

**Step-by-step Solution:**

**Part A: Find the time ($t$)**

1.  **Choose the appropriate kinematic equation:** We know $y_0$, $y$, $v_0$, and $a$, and we want to find $t$. The equation that relates these is:
    $$y = y_0 + v_0t + \frac{1}{2}at^2$$
    *This equation connects displacement, initial velocity, acceleration, and time, which are all the variables we have or want.*

2.  **Substitute the known values into the equation:**
    $$0 \, \text{m} = 45 \, \text{m} + (0 \, \text{m/s})t + \frac{1}{2}(-9.8 \, \text{m/s}^2)t^2$$
    *We've plugged in $y=0$, $y_0=45$, $v_0=0$, and $a=-9.8$. Note the negative sign for acceleration.*

3.  **Simplify the equation:**
    $$0 = 45 - 4.9t^2$$
    *The $v_0t$ term becomes zero, and $\frac{1}{2}(-9.8)$ simplifies to $-4.9$.*

4.  **Rearrange the equation to solve for $t^2$:**
    $$4.9t^2 = 45$$
    *We moved the $4.9t^2$ term to the left side to make it positive.*

5.  **Isolate $t^2$:**
    $$t^2 = \frac{45}{4.9}$$
    $$t^2 \approx 9.1837$$
    *Dividing both sides by $4.9$ gives us the value of $t$ squared.*

6.  **Solve for $t$ by taking the square root:**
    $$t = \sqrt{9.1837}$$
    $$t \approx 3.030 \, \text{s}$$
    *We take the positive square root because time cannot be negative in this context.*

    **Time to hit the ground: $\boxed{t \approx 3.03 \, \text{s}}$**

---

**Part B: Find the final velocity ($v$)**

1.  **Choose the appropriate kinematic equation:** Now that we have $t$, we can use an equation that relates $v$, $v_0$, $a$, and $t$. The simplest one is:
    $$v = v_0 + at$$
    *This equation directly calculates final velocity from initial velocity, acceleration, and time.*

2.  **Substitute the known values (including the calculated $t$):**
    $$v = 0 \, \text{m/s} + (-9.8 \, \text{m/s}^2)(3.030 \, \text{s})$$
    *Plug in $v_0=0$, $a=-9.8$, and the calculated time $t \approx 3.030 \, \text{s}$.*

3.  **Calculate the final velocity:**
    $$v \approx -29.694 \, \text{m/s}$$
    *Multiplying the acceleration by time gives the change in velocity. The negative sign indicates the velocity is downwards.*

    **Final velocity just before impact: $\boxed{v \approx -29.7 \, \text{m/s}}$**

**Reflection:** This was a straightforward problem. The key was correctly identifying $v_0=0$ and consistently using the negative sign for acceleration because 'up' was chosen as positive. The negative final velocity confirms the rock is moving downwards.

---

### Example 2: Throwing a Ball Upwards

**Problem:** A ball is thrown straight upwards from the ground with an initial speed of $20 \, \text{m/s}$.
a) What is the maximum height the ball reaches?
b) How long does it take to reach that maximum height?

**Given:**
*   Initial height, $y_0 = 0 \, \text{m}$ (thrown from the ground)
*   Initial velocity, $v_0 = +20 \, \text{m/s}$ (upwards, so positive)
*   Acceleration, $a = -g = -9.8 \, \text{m/s}^2$
*   At maximum height, the instantaneous final velocity is $v = 0 \, \text{m/s}$ (the ball momentarily stops before falling back down).

**Want:**
*   a) Maximum height, $y_{max}$
*   b) Time to reach maximum height, $t$

---

**Step-by-step Solution:**

**Part A: Find the maximum height ($y_{max}$)**

1.  **Choose the appropriate kinematic equation:** We know $v_0$, $v$ (at max height), and $a$, and we want to find $\Delta y = y_{max} - y_0$. The equation that doesn't involve time is best here:
    $$v^2 = v_0^2 + 2a\Delta y$$
    *This equation is ideal because we don't know the time to reach max height yet, and it directly relates velocities, acceleration, and displacement.*

2.  **Substitute the known values:**
    $$(0 \, \text{m/s})^2 = (20 \, \text{m/s})^2 + 2(-9.8 \, \text{m/s}^2)(y_{max} - 0 \, \text{m})$$
    *Plug in $v=0$, $v_0=20$, $a=-9.8$, and $y_0=0$.*

3.  **Simplify and solve for $y_{max}$:**
    $$0 = 400 - 19.6 y_{max}$$
    *Square $20$ to get $400$. Multiply $2$ by $-9.8$ to get $-19.6$.*

4.  **Rearrange the equation:**
    $$19.6 y_{max} = 400$$
    *Move the $19.6 y_{max}$ term to the left to make it positive.*

5.  **Isolate $y_{max}$:**
    $$y_{max} = \frac{400}{19.6}$$
    $$y_{max} \approx 20.408 \, \text{m}$$
    *Divide both sides by $19.6$ to find the maximum height.*

    **Maximum height reached: $\boxed{y_{max} \approx 20.4 \, \text{m}}$**

---

**Part B: Find the time to reach maximum height ($t$)**

1.  **Choose the appropriate kinematic equation:** We know $v_0$, $v$ (at max height), and $a$, and we want to find $t$. The simplest equation is:
    $$v = v_0 + at$$
    *This equation directly relates velocities, acceleration, and time.*

2.  **Substitute the known values:**
    $$0 \, \text{m/s} = 20 \, \text{m/s} + (-9.8 \, \text{m/s}^2)t$$
    *Plug in $v=0$, $v_0=20$, and $a=-9.8$.*

3.  **Simplify and solve for $t$:**
    $$-20 = -9.8t$$
    *Subtract $20$ from both sides.*

4.  **Isolate $t$:**
    $$t = \frac{-20}{-9.8}$$
    $$t \approx 2.041 \, \text{s}$$
    *Divide both sides by $-9.8$. The negative signs cancel, resulting in a positive time.*

    **Time to reach maximum height: $\boxed{t \approx 2.04 \, \text{s}}$**

**Reflection:** The key insight here was recognizing that at the maximum height, the ball's *instantaneous* vertical velocity is zero. This allowed us to solve for both height and time. The positive height and time values are physically sensible.

---

### Example 3: Ball Thrown Upwards from a Building

**Problem:** A ball is thrown upwards from the top of a $30 \, \text{m}$ tall building with an initial speed of $15 \, \text{m/s}$.
a) How long does it take for the ball to hit the ground below the building?
b) What is its velocity just before it hits the ground?

**Given:**
*   Initial height, $y_0 = +30 \, \text{m}$ (relative to ground $y=0$)
*   Final height, $y = 0 \, \text{m}$ (when it hits the ground)
*   Initial velocity, $v_0 = +15 \, \text{m/s}$ (upwards, so positive)
*   Acceleration, $a = -g = -9.8 \, \text{m/s}^2$

**Want:**
*   a) Time to hit the ground, $t$
*   b) Final velocity, $v$

---

**Step-by-step Solution:**

**Part A: Find the time ($t$)**

1.  **Choose the appropriate kinematic equation:** We know $y_0$, $y$, $v_0$, and $a$, and we want to find $t$. This requires the quadratic equation:
    $$y = y_0 + v_0t + \frac{1}{2}at^2$$
    *This equation relates all knowns and the desired unknown (time). Since $t$ will be squared, we expect a quadratic solution.*

2.  **Substitute the known values:**
    $$0 \, \text{m} = 30 \, \text{m} + (15 \, \text{m/s})t + \frac{1}{2}(-9.8 \, \text{m/s}^2)t^2$$
    *Plug in $y=0$, $y_0=30$, $v_0=15$, and $a=-9.8$.*

3.  **Rearrange into standard quadratic form ($At^2 + Bt + C = 0$):**
    $$0 = 30 + 15t - 4.9t^2$$
    $$4.9t^2 - 15t - 30 = 0$$
    *Multiply $\frac{1}{2}$ by $-9.8$ to get $-4.9$. Then, move all terms to one side to set the equation to zero, making the $t^2$ term positive for easier quadratic formula application.*

4.  **Apply the quadratic formula ($t = \frac{-B \pm \sqrt{B^2 - 4AC}}{2A}$):**
    Here, $A = 4.9$, $B = -15$, $C = -30$.
    $$t = \frac{-(-15) \pm \sqrt{(-15)^2 - 4(4.9)(-30)}}{2(4.9)}$$
    *Carefully substitute the coefficients into the quadratic formula.*

5.  **Calculate the terms inside the formula:**
    $$t = \frac{15 \pm \sqrt{225 - (-588)}}{9.8}$$
    $$t = \frac{15 \pm \sqrt{225 + 588}}{9.8}$$
    $$t = \frac{15 \pm \sqrt{813}}{9.8}$$
    $$t = \frac{15 \pm 28.513}{9.8}$$
    *Perform the arithmetic step-by-step to avoid errors, especially with signs.*

6.  **Calculate the two possible values for $t$:**
    $$t_1 = \frac{15 + 28.513}{9.8} = \frac{43.513}{9.8} \approx 4.440 \, \text{s}$$
    $$t_2 = \frac{15 - 28.513}{9.8} = \frac{-13.513}{9.8} \approx -1.379 \, \text{s}$$
    *The quadratic formula yields two solutions. We must interpret them physically.*

7.  **Choose the physically meaningful time:** Time cannot be negative, so $t_2$ is discarded.
    *A negative time would represent a point *before* the ball was thrown, which isn't relevant to this problem's question.*

    **Time to hit the ground: $\boxed{t \approx 4.44 \, \text{s}}$**

---

**Part B: Find the final velocity ($v$)**

1.  **Choose the appropriate kinematic equation:** Now that we have $t$, we can use:
    $$v = v_0 + at$$
    *This is the most direct way to find the final velocity once time is known.*

2.  **Substitute the known values (including the calculated $t$):**
    $$v = 15 \, \text{m/s} + (-9.8 \, \text{m/s}^2)(4.440 \, \text{s})$$
    *Plug in $v_0=15$, $a=-9.8$, and $t \approx 4.440 \, \text{s}$.*

3.  **Calculate the final velocity:**
    $$v = 15 - 43.512$$
    $$v \approx -28.512 \, \text{m/s}$$
    *Perform the multiplication and subtraction. The negative sign indicates the ball is moving downwards.*

    **Final velocity just before impact: $\boxed{v \approx -28.5 \, \text{m/s}}$**

**Reflection:** This example was harder due to the need for the quadratic formula. The key was correctly setting up the displacement equation and interpreting the two time solutions. The negative final velocity is expected as the ball is moving downwards at impact. Notice that the final speed ($28.5 \, \text{m/s}$) is greater than the initial throwing speed ($15 \, \text{m/s}$), which makes sense because it falls further than it rose relative to its starting point.

---

### Example 4: Dropped from a Hot Air Balloon

**Problem:** A package is dropped from a hot air balloon that is rising upwards at a constant velocity of $5 \, \text{m/s}$. The package is dropped when the balloon is $60 \, \text{m}$ above the ground.
a) How long does it take for the package to hit the ground?
b) What is the maximum height the package reaches above the ground?

**Given:**
*   Initial height, $y_0 = +60 \, \text{m}$ (relative to ground $y=0$)
*   Initial velocity of the package, $v_0 = +5 \, \text{m/s}$ (crucial: when dropped, the package *inherits* the balloon's upward velocity)
*   Acceleration, $a = -g = -9.8 \, \text{m/s}^2$
*   Final height for part (a), $y = 0 \, \text{m}$ (when it hits the ground)
*   Final velocity for part (b), $v_{peak} = 0 \, \text{m/s}$ (at max height)

**Want:**
*   a) Time to hit the ground, $t$
*   b) Maximum height, $y_{max}$

---

**Step-by-step Solution:**

**Part A: Find the time ($t$) to hit the ground**

1.  **Choose the appropriate kinematic equation:** We know $y_0$, $y$, $v_0$, and $a$, and we want to find $t$. This again requires the quadratic equation:
    $$y = y_0 + v_0t + \frac{1}{2}at^2$$
    *This equation connects all the knowns and the desired unknown, time.*

2.  **Substitute the known values:**
    $$0 \, \text{m} = 60 \, \text{m} + (5 \, \text{m/s})t + \frac{1}{2}(-9.8 \, \text{m/s}^2)t^2$$
    *Plug in $y=0$, $y_0=60$, $v_0=5$, and $a=-9.8$. Note the positive $v_0$ because the package initially moves upwards with the balloon.*

3.  **Rearrange into standard quadratic form ($At^2 + Bt + C = 0$):**
    $$0 = 60 + 5t - 4.9t^2$$
    $$4.9t^2 - 5t - 60 = 0$$
    *Multiply $\frac{1}{2}$ by $-9.8$ to get $-4.9$. Then, move all terms to one side to set the equation to zero, making the $t^2$ term positive.*

4.  **Apply the quadratic formula ($t = \frac{-B \pm \sqrt{B^2 - 4AC}}{2A}$):**
    Here, $A = 4.9$, $B = -5$, $C = -60$.
    $$t = \frac{-(-5) \pm \sqrt{(-5)^2 - 4(4.9)(-60)}}{2(4.9)}$$
    *Carefully substitute the coefficients into the quadratic formula.*

5.  **Calculate the terms inside the formula:**
    $$t = \frac{5 \pm \sqrt{25 - (-1176)}}{9.8}$$
    $$t = \frac{5 \pm \sqrt{25 + 1176}}{9.8}$$
    $$t = \frac{5 \pm \sqrt{1201}}{9.8}$$
    $$t = \frac{5 \pm 34.655}{9.8}$$
    *Perform the arithmetic step-by-step, paying attention to signs.*

6.  **Calculate the two possible values for $t$:**
    $$t_1 = \frac{5 + 34.655}{9.8} = \frac{39.655}{9.8} \approx 4.046 \, \text{s}$$
    $$t_2 = \frac{5 - 34.655}{9.8} = \frac{-29.655}{9.8} \approx -3.026 \, \text{s}$$
    *The quadratic formula yields two solutions.*

7.  **Choose the physically meaningful time:** Time must be positive.
    *Discard the negative time, as it's before the package was dropped.*

    **Time to hit the ground: $\boxed{t \approx 4.05 \, \text{s}}$**

---

**Part B: Find the maximum height ($y_{max}$)**

1.  **Choose the appropriate kinematic equation:** We know $v_0$, $v_{peak}$ (at max height), and $a$, and we want to find $\Delta y_{peak} = y_{peak} - y_0$. The equation that doesn't involve time is best:
    $$v_{peak}^2 = v_0^2 + 2a\Delta y_{peak}$$
    *This equation is ideal for finding displacement when velocities and acceleration are known, without needing time.*

2.  **Substitute the known values:**
    $$(0 \, \text{m/s})^2 = (5 \, \text{m/s})^2 + 2(-9.8 \, \text{m/s}^2)(y_{peak} - 60 \, \text{m})$$
    *Plug in $v_{peak}=0$, $v_0=5$, $a=-9.8$, and $y_0=60$. Remember $y_{peak}$ is the total height from the ground, so $\Delta y_{peak}$ is the additional height *above* the initial $60 \, \text{m}$.*

3.  **Simplify and solve for $y_{peak}$ (or $\Delta y_{peak}$ first):**
    $$0 = 25 - 19.6(y_{peak} - 60)$$
    *Square $5$ to get $25$. Multiply $2$ by $-9.8$ to get $-19.6$.*

    Let's find the additional height gained, $\Delta y_{gain}$.
    $$0 = 25 - 19.6 \Delta y_{gain}$$
    $$19.6 \Delta y_{gain} = 25$$
    $$\Delta y_{gain} = \frac{25}{19.6} \approx 1.276 \, \text{m}$$
    *This is the height the package *gains* above its starting point.*

4.  **Calculate the maximum height above the ground:**
    $$y_{max} = y_0 + \Delta y_{gain}$$
    $$y_{max} = 60 \, \text{m} + 1.276 \, \text{m}$$
    $$y_{max} \approx 61.276 \, \text{m}$$
    *Add the initial height to the additional height gained to get the total maximum height from the ground.*

    **Maximum height above the ground: $\boxed{y_{max} \approx 61.3 \, \text{m}}$**

**Reflection:** The trickiest part of this problem was correctly identifying the initial velocity of the package. Even though it was "dropped," it initially moved upwards because it was released from an upward-moving balloon. Also, remember that $y_{max}$ is the total height from the ground, not just the height gained after being dropped. This required careful setup of the $\Delta y$ term.

## 6. Common mistakes and traps

1.  **Ignoring Air Resistance:** Assuming "free fall" means completely ignoring air resistance in all real-world scenarios. Remember, free fall is an idealization; in reality, air resistance can significantly alter an object's motion, especially for lighter objects or high speeds.
2.  **Inconsistent Sign Conventions:** Switching positive and negative directions for displacement, velocity, and acceleration within the same problem. Once you choose (e.g., up is positive), stick to it for *all* vector quantities.
3.  **Assuming Initial Velocity is Zero:** Automatically setting $v_0 = 0$ for every free-fall problem. This is only true if the object is "dropped from rest" or "released." If it's thrown upwards or downwards, it has a non-zero initial velocity with a specific sign.
4.  **Confusing $g$ with Acceleration ($a$):** Using $a = 9.8 \, \text{m/s}^2$ instead of $a = -9.8 \, \text{m/s}^2$ (if "up" is positive). $g$ is the *magnitude* of acceleration; the acceleration *vector* has a direction (and thus a sign).
5.  **Not Recognizing $v=0$ at Peak Height:** For an object thrown vertically upwards, its instantaneous velocity at the very top of its trajectory (maximum height) is zero. Many students forget this crucial piece of information.
6.  **Incorrectly Handling Displacement ($\Delta y$):** Confusing total distance traveled with displacement, or using $y_0$ as $\Delta y$. Remember $\Delta y = y_{final} - y_{initial}$. If an object starts at $30 \, \text{m}$ and lands at $0 \, \text{m}$, $\Delta y = 0 - 30 = -30 \, \text{m}$.

## 7. Textbook-precise explanation

**Free Fall:**
Free fall is defined as the motion of an object where the only significant force acting upon it is gravity. This is an idealized scenario, typically assuming the absence of air resistance or any other non-gravitational forces. In the context of kinematics near the Earth's surface, this implies that the object experiences a constant acceleration due to gravity.

**Acceleration Due to Gravity ($g$):**
The acceleration due to gravity, denoted by $g$, is the constant acceleration experienced by an object in free fall near the surface of a celestial body. For Earth, its approximate magnitude is:
$$g \approx 9.80 \, \text{m/s}^2$$
This value can vary slightly with altitude, latitude, and local geological features, but for most introductory physics problems, it is treated as a constant. The direction of this acceleration is always vertically downwards, towards the center of the Earth.

**Sign Conventions:**
To apply the one-dimensional kinematic equations to vertical motion under gravity, a consistent coordinate system and sign convention must be established.
*   **Choice of Origin:** A reference point ($y=0$) must be chosen. This is often the ground, but can be the initial position of the object.
*   **Choice of Positive Direction:** A direction must be designated as positive.
    *   **Common Convention 1:** Upward direction is positive ($+y$). In this convention, displacement ($\Delta y$), upward initial velocities ($v_{0y}$), and upward final velocities ($v_y$) are positive. Downward quantities are negative. Crucially, the acceleration due to gravity is $a_y = -g = -9.8 \, \text{m/s}^2$.
    *   **Common Convention 2:** Downward direction is positive ($+y$). In this convention, displacement ($\Delta y$), downward initial velocities ($v_{0y}$), and downward final velocities ($v_y$) are positive. Upward quantities are negative. The acceleration due to gravity is $a_y = +g = +9.8 \, \text{m/s}^2$.

Once a convention is chosen, it must be applied rigorously to all vector quantities (displacement, velocity, and acceleration) throughout the problem. The kinematic equations for constant acceleration are then applied, substituting $a_y$ for $a$:
1.  $v_y = v_{0y} + a_y t$
2.  $\Delta y = y - y_0 = v_{0y}t + \frac{1}{2}a_y t^2$
3.  $v_y^2 = v_{0y}^2 + 2a_y \Delta y$
4.  $\Delta y = \frac{1}{2}(v_{0y} + v_y)t$

(Adapted from "Halliday, Resnick, & Walker, Fundamentals of Physics, 11e, Chapter 2" and "Serway & Jewett, Physics for Scientists and Engineers, 10e, Chapter 2")

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:** Imagine an apple falling from a tree. The apple always falls *down*. Its speed *increases* as it falls. Think of "Gravity's G-force: Always Down, Always $9.8$." Visualize the number "9.8" tattooed on the falling apple, and a big arrow pointing straight down.
2.  **1-3 Formulas/Facts to Overlearn:**
    *   The magnitude of acceleration due to gravity: $g = 9.8 \, \text{m/s}^2$.
    *   The direction of acceleration due to gravity: **ALWAYS DOWNWARDS**. This means $a = -g$ if "up" is positive, or $a = +g$ if "down" is positive.
    *   At the peak of any vertical motion, the instantaneous vertical velocity is $v_y = 0$.
3.  **Spaced-Repetition Schedule:** Review this lesson and its core concepts:
    *   **Tomorrow (1 day):** Reread the "Core Idea" and "Common Mistakes" sections. Try a simple problem.
    *   **In 3 days:** Work through one or two of the worked examples without looking at the solution first.
    *   **In 7 days:** Try to explain free fall and sign conventions to an imaginary friend or write a summary from memory.
    *   **In 16 days:** Attempt one of the self-check questions.
    *   **In 35 days:** Review the entire lesson and ensure you can still articulate all key points clearly.
4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the kinematic equations or how they apply to free fall, you can always rebuild them from the definitions of velocity and acceleration.
    *   Start with the definition of constant acceleration: $a = \frac{dv}{dt}$.
    *   Integrate with respect to time to get velocity: $\int dv = \int a \, dt \implies v = at + C$. At $t=0$, $v=v_0$, so $C=v_0$. Thus, $v = v_0 + at$.
    *   Next, use the definition of velocity: $v = \frac{dy}{dt}$.
    *   Substitute the velocity equation: $\frac{dy}{dt} = v_0 + at$.
    *   Integrate with respect to time to get position: $\int dy = \int (v_0 + at) \, dt \implies y = v_0t + \frac{1}{2}at^2 + C'$. At $t=0$, $y=y_0$, so $C'=y_0$. Thus, $y = y_0 + v_0t + \frac{1}{2}at^2$.
    *   For free fall, simply substitute $a = -g$ (if up is positive) into these derived equations. This ensures you always remember the fundamental relationship between position, velocity, and acceleration under constant gravity.

## 10. Connections — what this leads to

Understanding free fall is a cornerstone for many advanced topics in physics and rocket science:

*   **Projectile Motion:** This is the immediate next step. Free fall describes the vertical component of projectile motion (like a thrown ball or a launched missile). The horizontal motion is typically constant velocity, but the vertical motion is pure free fall.
*   **Work and Energy:** Free fall directly relates to gravitational potential energy ($PE_g = mgh$). As an object falls, its potential energy converts into kinetic energy, and the principles of conservation of mechanical energy can be applied.
*   **Momentum and Impulse:** The impact of a falling object (its collision with the ground) involves concepts of momentum change and impulse. The velocity calculated from free fall is the initial velocity for these impact calculations.
*   **Newton's Law of Universal Gravitation (Deeper Dive):** While $g=9.8 \, \text{m/s}^2$ is a local approximation, a deeper study involves Newton's full law, which explains how $g$ varies with altitude and how celestial bodies attract each other, leading directly to orbital mechanics.
*   **Orbital Mechanics:** Satellites in orbit are continuously in a state of free fall around Earth. Their motion is a balance between their tangential velocity and the Earth's gravitational pull. Understanding $g$ and its variation with distance is crucial for calculating orbital parameters.
*   **Fluid Dynamics (Terminal Velocity):** When air resistance *is* considered, objects in free fall eventually reach a "terminal velocity" where the drag force equals the gravitational force. This is a more realistic extension of free fall.
*   **Relativity:** At extremely high velocities or in very strong gravitational fields, Einstein's theory of general relativity provides a more accurate description of gravity, where free fall is interpreted as following geodesics (straightest possible paths) in curved spacetime.

## 11. Self-check questions

1.  Define "free fall" in your own words, and explain the significance of $g = 9.8 \, \text{m/s}^2$. What crucial assumption is usually made in introductory free-fall problems?
2.  A student drops a coin from a height of $1.5 \, \text{m}$.
    a) What is the coin's initial velocity?
    b) What is its acceleration?
    c) How long does it take to hit the ground?
3.  A tennis ball is hit straight up into the air with an initial velocity of $18 \, \text{m/s}$.
    a) What is the ball's velocity at its maximum height?
    b) How long does it take to reach its maximum height?
    c) How long does it take for the ball to return to the height from which it was hit?
4.  An astronaut on a newly discovered planet drops a rock from a height of $10 \, \text{m}$. The rock hits the ground after $1.5 \, \text{s}$.
    a) What is the acceleration due to gravity on this planet?
    b) If the astronaut then throws the rock upwards with an initial speed of $5 \, \text{m/s}$ from the same height, how long will it take to hit the ground?
5.  Consider two objects, Object A (mass $1 \, \text{kg}$) and Object B (mass $10 \, \text{kg}$). Both are dropped simultaneously from the same height in a vacuum. Which object hits the ground first, and why? How would your answer change if the experiment were conducted in a room with air?