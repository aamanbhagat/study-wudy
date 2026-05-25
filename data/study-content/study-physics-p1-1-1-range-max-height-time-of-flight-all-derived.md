## 1. What it is — in plain English

Imagine you throw a ball, kick a football, or launch a model rocket. What happens? It flies through the air, goes up, then comes back down, landing somewhere away from where you launched it. This whole curved path it takes is what we call "projectile motion."

When we talk about "range," "max height," and "time of flight," we're simply describing key features of this journey. The **range** is how far horizontally the object travels from its starting point to where it lands. Think of it as the distance you need to run to catch the ball. The **max height** is the highest point the object reaches during its flight – the peak of its arc. And the **time of flight** is simply how long the object stays in the air from launch to landing.

These concepts are fundamental to understanding how things move when they're launched into the air and only gravity is significantly pulling on them. When we say "all derived," it means we're not just going to give you formulas to memorize. Instead, we'll build these formulas step-by-step from the very basic rules of motion that you've already learned, showing exactly where they come from. It's like learning to bake a cake from scratch rather than just buying one from the store.

## 2. Why it matters — real-world applications

Understanding range, max height, and time of flight is not just an academic exercise; it's crucial for countless real-world applications, especially in physics and rocket science.

1.  **Aerospace Engineering & Ballistics:** For launching rockets, missiles, or even simple payloads, engineers must precisely calculate the trajectory. They need to know the **range** to ensure a missile hits its target or a rocket lands in a designated recovery zone. The **max height** (apogee) is critical for orbital insertion or ensuring a suborbital flight reaches its intended altitude. The **time of flight** helps with tracking, communication windows, and predicting re-entry points. Companies like SpaceX, Northrop Grumman, and NASA constantly perform these calculations.
2.  **Sports Science & Coaching:** Athletes and coaches use these principles to optimize performance. A shot-putter wants to maximize the **range** of their throw. A basketball player needs to calculate the correct launch angle and speed to achieve the necessary **max height** and **time of flight** for a successful shot. Golfers adjust their club selection and swing to achieve specific ranges and trajectories. Advanced sports analytics often involve tracking and modeling these projectile parameters.
3.  **Robotics and Automation:** Imagine a robot designed to throw packages into designated bins, or a drone programmed to drop supplies at a specific location. The robot's control system needs to calculate the precise launch velocity and angle to ensure the package travels the correct **range** and has the appropriate **time of flight** to hit the target accurately. This is fundamental in manufacturing, logistics, and even search-and-rescue drone operations.
4.  **Firefighting and Water Jets:** When firefighters aim a powerful water hose, they are dealing with projectile motion. They need to understand how the water jet's initial pressure and angle affect its **range** to reach a specific part of a burning building, its **max height** to clear obstacles, and its **time of flight** to estimate water delivery.
5.  **Machine Learning for Trajectory Prediction:** In fields like autonomous driving or air traffic control, predicting the future path of moving objects (which can often be approximated as projectiles, even if complex) is vital. Machine learning models are trained on vast datasets to predict trajectories, and the underlying physics principles of range, max height, and time of flight form the foundational truth against which these models are validated.

## 3. Prerequisites — what you must know first

Before diving into the derivations, ensure you have a solid grasp of these foundational concepts:

*   **Vectors and Components:** Understanding how to break down a velocity vector into its horizontal ($x$) and vertical ($y$) components using trigonometry (sine and cosine).
*   **Kinematic Equations (Constant Acceleration):** The five fundamental equations that describe motion with constant acceleration. You should be comfortable using these for both 1D horizontal and 1D vertical motion.
*   **Trigonometry:** Basic functions (sine, cosine, tangent), identities, and solving for angles or sides of right triangles.
*   **Algebra:** Solving linear and quadratic equations, substitution, and rearranging formulas.
*   **Gravitational Acceleration ($g$):** The concept that Earth's gravity causes a constant downward acceleration of approximately $9.81 \, \text{m/s}^2$ (or $32.2 \, \text{ft/s}^2$) near its surface. You must know how to correctly apply its direction (usually negative when upward is positive).
*   **Independence of Motion:** The crucial idea that horizontal motion and vertical motion are entirely independent of each other, except for the shared "time."

## 4. The core idea — step by step

The core idea behind projectile motion is that we can treat the horizontal and vertical movements separately. Gravity only acts vertically, so the horizontal motion is usually at a constant velocity (ignoring air resistance), while the vertical motion is under constant acceleration due to gravity.

### Step 1: Decompose the Initial Velocity

*   **Plain English:** When you throw something, it leaves your hand with a certain speed and in a certain direction (an angle relative to the ground). To understand its flight, we first need to figure out how much of that initial "oomph" is pushing it forward horizontally and how much is pushing it upward vertically.
*   **Concrete Example:** If you throw a ball at $20 \, \text{m/s}$ at an angle of $30^\circ$ above the horizontal, it's not going $20 \, \text{m/s}$ purely forward, nor $20 \, \text{m/s}$ purely upward. Part of that $20 \, \text{m/s}$ is contributing to its horizontal travel, and part to its vertical travel.
*   **Formal/Mathematical Version:** Let the initial speed be $v_0$ and the launch angle be $\theta$ with respect to the horizontal.
    The initial horizontal velocity component is:
    $$v_{0x} = v_0 \cos(\theta)$$
    The initial vertical velocity component is:
    $$v_{0y} = v_0 \sin(\theta)$$
*   **What could go wrong:** Forgetting to use the correct trigonometric function (sine for vertical, cosine for horizontal, assuming angle is with horizontal). Mixing up the components in later equations.

### Step 2: Analyze Horizontal Motion

*   **Plain English:** Once an object is launched, and we ignore air resistance (which is a common and useful simplification in introductory physics), nothing is pushing it horizontally or pulling it back horizontally. This means its horizontal speed stays exactly the same throughout its flight.
*   **Concrete Example:** If our ball from Step 1 starts with a horizontal speed of $17.32 \, \text{m/s}$ (from $20 \cos(30^\circ)$), it will always be moving horizontally at $17.32 \, \text{m/s}$ until it hits the ground.
*   **Formal/Mathematical Version:**
    The horizontal acceleration is $a_x = 0$.
    Therefore, the horizontal velocity at any time $t$ is constant:
    $$v_x(t) = v_{0x} = v_0 \cos(\theta)$$
    The horizontal displacement (range) is given by:
    $$\Delta x = v_{0x} t = (v_0 \cos(\theta)) t$$
*   **What could go wrong:** Assuming there's some horizontal acceleration or deceleration. Forgetting that the horizontal velocity is *constant*.

### Step 3: Analyze Vertical Motion

*   **Plain English:** The vertical motion is different because gravity is always pulling the object downwards. This means the object slows down as it goes up, momentarily stops at its highest point, and then speeds up as it falls back down. This is motion with constant acceleration.
*   **Concrete Example:** Our ball's initial upward speed is $10 \, \text{m/s}$ (from $20 \sin(30^\circ)$). Gravity will continuously pull it down, slowing its upward movement, eventually reversing its direction.
*   **Formal/Mathematical Version:**
    The vertical acceleration is $a_y = -g$, where $g \approx 9.81 \, \text{m/s}^2$. We use a negative sign because we typically define upward as positive.
    The vertical velocity at any time $t$ is:
    $$v_y(t) = v_{0y} + a_y t = v_0 \sin(\theta) - gt$$
    The vertical displacement at any time $t$ is:
    $$\Delta y = v_{0y} t + \frac{1}{2} a_y t^2 = (v_0 \sin(\theta)) t - \frac{1}{2} gt^2$$
    Another useful kinematic equation for vertical motion is:
    $$v_y^2 = v_{0y}^2 + 2 a_y \Delta y = (v_0 \sin(\theta))^2 - 2g \Delta y$$
*   **What could go wrong:** Incorrectly using the sign for $g$. Mixing up initial vertical velocity with initial overall velocity.

### Step 4: Derive Time of Flight ($T$)

*   **Plain English:** The total time the object spends in the air, from launch until it lands at the *same height* it started from. We can find this by considering when the object's vertical displacement is zero (it has returned to its starting height).
*   **Concrete Example:** If you throw a ball from the ground, it goes up and then comes back down to the ground. The total time it takes for this up-and-down journey is the time of flight.
*   **Formal/Mathematical Version:**
    We use the vertical displacement equation, setting $\Delta y = 0$ (assuming launch and landing at the same height):
    $$\Delta y = (v_0 \sin(\theta)) t - \frac{1}{2} gt^2$$
    $$0 = (v_0 \sin(\theta)) T - \frac{1}{2} gT^2$$
    We can factor out $T$:
    $$0 = T \left( v_0 \sin(\theta) - \frac{1}{2} gT \right)$$
    This gives two solutions for $T$:
    1.  $T = 0$ (This is the launch moment, which is trivial).
    2.  $v_0 \sin(\theta) - \frac{1}{2} gT = 0$
        Now, solve for $T$:
        $$v_0 \sin(\theta) = \frac{1}{2} gT$$
        $$T = \frac{2 v_0 \sin(\theta)}{g}$$
    This is the total time of flight.
*   **What could go wrong:** Forgetting that $T=0$ is a valid mathematical solution but not the one we're looking for. Applying this formula if the launch and landing heights are *different* (in which case, you'd need to solve the quadratic equation $y_f - y_i = (v_0 \sin(\theta)) t - \frac{1}{2} gt^2$).

### Step 5: Derive Maximum Height ($H_{max}$)

*   **Plain English:** The highest point the object reaches. At this exact moment, the object has momentarily stopped moving upwards before it starts falling downwards. This means its vertical velocity is zero.
*   **Concrete Example:** When the ball reaches the very peak of its arc, for a tiny instant, it's neither moving up nor down. Its vertical speed is zero.
*   **Formal/Mathematical Version:**
    At maximum height, $v_y = 0$. We can use the vertical velocity equation or the kinematic equation that relates initial velocity, final velocity, acceleration, and displacement. Let's use the latter:
    $$v_y^2 = v_{0y}^2 + 2 a_y \Delta y$$
    Substitute $v_y = 0$, $a_y = -g$, and $\Delta y = H_{max}$:
    $$0^2 = (v_0 \sin(\theta))^2 - 2g H_{max}$$
    Now, solve for $H_{max}$:
    $$2g H_{max} = (v_0 \sin(\theta))^2$$
    $$H_{max} = \frac{(v_0 \sin(\theta))^2}{2g}$$
    Alternatively, we could first find the time to reach maximum height ($t_{peak}$) by setting $v_y=0$ in $v_y = v_{0y} - gt$:
    $$0 = v_0 \sin(\theta) - g t_{peak} \implies t_{peak} = \frac{v_0 \sin(\theta)}{g}$$
    Notice that $t_{peak}$ is exactly half of the total time of flight $T$. Then substitute $t_{peak}$ into the vertical displacement equation:
    $$H_{max} = (v_0 \sin(\theta)) t_{peak} - \frac{1}{2} g t_{peak}^2$$
    $$H_{max} = (v_0 \sin(\theta)) \left( \frac{v_0 \sin(\theta)}{g} \right) - \frac{1}{2} g \left( \frac{v_0 \sin(\theta)}{g} \right)^2$$
    $$H_{max} = \frac{v_0^2 \sin^2(\theta)}{g} - \frac{1}{2} g \frac{v_0^2 \sin^2(\theta)}{g^2}$$
    $$H_{max} = \frac{v_0^2 \sin^2(\theta)}{g} - \frac{v_0^2 \sin^2(\theta)}{2g}$$
    $$H_{max} = \frac{2 v_0^2 \sin^2(\theta) - v_0^2 \sin^2(\theta)}{2g}$$
    $$H_{max} = \frac{v_0^2 \sin^2(\theta)}{2g}$$
    Both methods yield the same result.
*   **What could go wrong:** Forgetting that $v_y=0$ only applies to the *vertical* velocity component, not the overall velocity (which is $v_x$ at max height). Using the total time of flight $T$ instead of $t_{peak}$ in the displacement equation.

### Step 6: Derive Range ($R$)

*   **Plain English:** The total horizontal distance the object travels from launch to landing, assuming it lands at the same height it started from. Since horizontal velocity is constant, we just multiply that constant horizontal speed by the total time the object is in the air.
*   **Concrete Example:** If our ball travels horizontally at $17.32 \, \text{m/s}$ for $2$ seconds, its range will be $17.32 \times 2 = 34.64$ meters.
*   **Formal/Mathematical Version:**
    We use the horizontal displacement equation:
    $$\Delta x = (v_0 \cos(\theta)) t$$
    For the total range $R$, we use the total time of flight $T$:
    $$R = (v_0 \cos(\theta)) T$$
    Now, substitute the derived formula for $T$:
    $$R = (v_0 \cos(\theta)) \left( \frac{2 v_0 \sin(\theta)}{g} \right)$$
    $$R = \frac{2 v_0^2 \sin(\theta) \cos(\theta)}{g}$$
    Using the trigonometric identity $\sin(2\theta) = 2 \sin(\theta) \cos(\theta)$, we can simplify this to:
    $$R = \frac{v_0^2 \sin(2\theta)}{g}$$
    This is the total horizontal range.
*   **What could go wrong:** Using the time to max height ($t_{peak}$) instead of the total time of flight ($T$). Forgetting the trigonometric identity or using it incorrectly.

### Step 7: Angle for Maximum Range ($R_{max}$)

*   **Plain English:** If you throw something with a fixed initial speed, what angle should you throw it at to make it go the farthest horizontally?
*   **Concrete Example:** A javelin thrower doesn't just throw as hard as possible; they also choose an optimal angle. Is it $45^\circ$? Is it something else?
*   **Formal/Mathematical Version:**
    We have the range formula:
    $$R = \frac{v_0^2 \sin(2\theta)}{g}$$
    To maximize $R$ for a given $v_0$ and $g$, we need to maximize the $\sin(2\theta)$ term, because $v_0^2/g$ is constant.
    The maximum value that $\sin(x)$ can take is $1$.
    So, we need $\sin(2\theta) = 1$.
    This occurs when the angle $2\theta = 90^\circ$ (or $\pi/2$ radians).
    Therefore,
    $$2\theta = 90^\circ$$
    $$\theta = 45^\circ$$
    So, for maximum range on level ground, the launch angle should be $45^\circ$.
*   **What could go wrong:** Forgetting that it's $2\theta$ that needs to be $90^\circ$, not $\theta$. Applying this rule when the launch and landing heights are *not* the same (e.g., throwing from a cliff).

## 5. Worked examples — multiple, with every step shown

We will use $g = 9.81 \, \text{m/s}^2$ for all examples.

### Example 1: Basic Projectile Motion

**Problem:** A cannonball is fired from the ground with an initial velocity of $50 \, \text{m/s}$ at an angle of $30^\circ$ above the horizontal. Assuming it lands on level ground, calculate its time of flight, maximum height, and horizontal range.

**Given:**
*   Initial speed, $v_0 = 50 \, \text{m/s}$
*   Launch angle, $\theta = 30^\circ$
*   Acceleration due to gravity, $g = 9.81 \, \text{m/s}^2$
*   Launch and landing heights are the same ($\Delta y = 0$ for total flight).

**What we want:**
*   Time of flight ($T$)
*   Maximum height ($H_{max}$)
*   Horizontal range ($R$)

**Solution:**

**Step 1: Decompose initial velocity into components.**
*   **Why:** We need to separate the motion into independent horizontal and vertical parts.
    $$v_{0x} = v_0 \cos(\theta)$$
    $$v_{0x} = 50 \, \text{m/s} \times \cos(30^\circ)$$
    $$v_{0x} = 50 \, \text{m/s} \times 0.866$$
    $$v_{0x} = 43.30 \, \text{m/s}$$
    $$v_{0y} = v_0 \sin(\theta)$$
    $$v_{0y} = 50 \, \text{m/s} \times \sin(30^\circ)$$
    $$v_{0y} = 50 \, \text{m/s} \times 0.5$$
    $$v_{0y} = 25.00 \, \text{m/s}$$

**Step 2: Calculate Time of Flight ($T$).**
*   **Why:** The time of flight depends only on the vertical motion. We know the initial vertical velocity and that the final vertical displacement is zero.
    We use the vertical displacement equation: $\Delta y = v_{0y} t + \frac{1}{2} a_y t^2$.
    Here, $\Delta y = 0$ (lands at same height), $a_y = -g$.
    $$0 = v_{0y} T - \frac{1}{2} g T^2$$
    Factor out $T$:
    $$0 = T \left( v_{0y} - \frac{1}{2} g T \right)$$
    The non-trivial solution is when the term in the parentheses is zero:
    $$v_{0y} - \frac{1}{2} g T = 0$$
    Rearrange to solve for $T$:
    $$v_{0y} = \frac{1}{2} g T$$
    $$T = \frac{2 v_{0y}}{g}$$
    Substitute the value of $v_{0y}$:
    $$T = \frac{2 \times 25.00 \, \text{m/s}}{9.81 \, \text{m/s}^2}$$
    $$T = \frac{50.00 \, \text{m/s}}{9.81 \, \text{m/s}^2}$$
    $$T = 5.097 \, \text{s}$$
    Rounding to two decimal places:
    $$\boxed{T = 5.10 \, \text{s}}$$

**Step 3: Calculate Maximum Height ($H_{max}$).**
*   **Why:** At the maximum height, the vertical velocity ($v_y$) is momentarily zero. We can use a kinematic equation that relates initial and final vertical velocities, acceleration, and displacement.
    We use: $v_y^2 = v_{0y}^2 + 2 a_y \Delta y$.
    Here, $v_y = 0$, $a_y = -g$, and $\Delta y = H_{max}$.
    $$0^2 = (25.00 \, \text{m/s})^2 + 2 (-9.81 \, \text{m/s}^2) H_{max}$$
    $$0 = 625 \, \text{m}^2/\text{s}^2 - 19.62 \, \text{m/s}^2 H_{max}$$
    Rearrange to solve for $H_{max}$:
    $$19.62 \, \text{m/s}^2 H_{max} = 625 \, \text{m}^2/\text{s}^2$$
    $$H_{max} = \frac{625 \, \text{m}^2/\text{s}^2}{19.62 \, \text{m/s}^2}$$
    $$H_{max} = 31.855 \, \text{m}$$
    Rounding to two decimal places:
    $$\boxed{H_{max} = 31.86 \, \text{m}}$$

**Step 4: Calculate Horizontal Range ($R$).**
*   **Why:** Horizontal motion is at constant velocity. We multiply the constant horizontal velocity by the total time of flight.
    We use: $\Delta x = v_{0x} t$.
    Here, $\Delta x = R$ and $t = T$.
    $$R = v_{0x} T$$
    Substitute the values of $v_{0x}$ and $T$:
    $$R = 43.30 \, \text{m/s} \times 5.097 \, \text{s}$$
    $$R = 220.704 \, \text{m}$$
    Rounding to two decimal places:
    $$\boxed{R = 220.70 \, \text{m}}$$

**Reflection:** This was a straightforward application of the derived formulas. The key was correctly breaking down the initial velocity and understanding which kinematic equations apply to which component of motion and at what point in time (e.g., $v_y=0$ at max height, $\Delta y=0$ for total flight on level ground).

### Example 2: Projectile Launched from a Height

**Problem:** A ball is thrown horizontally from the top of a $75 \, \text{m}$ tall building with an initial speed of $20 \, \text{m/s}$. How long does it take to hit the ground, and how far from the base of the building does it land?

**Given:**
*   Initial horizontal speed, $v_{0x} = 20 \, \text{m/s}$ (since thrown horizontally, $\theta = 0^\circ$, so $v_{0y} = 0$)
*   Initial vertical displacement, $\Delta y = -75 \, \text{m}$ (final position is $75 \, \text{m}$ below initial, taking upward as positive)
*   Acceleration due to gravity, $g = 9.81 \, \text{m/s}^2$

**What we want:**
*   Time of flight ($T$)
*   Horizontal range ($R$)

**Solution:**

**Step 1: Determine initial velocity components.**
*   **Why:** Even though it's thrown horizontally, it's good practice to explicitly state components.
    Since $\theta = 0^\circ$:
    $$v_{0x} = v_0 \cos(0^\circ) = 20 \, \text{m/s} \times 1 = 20 \, \text{m/s}$$
    $$v_{0y} = v_0 \sin(0^\circ) = 20 \, \text{m/s} \times 0 = 0 \, \text{m/s}$$

**Step 2: Calculate Time of Flight ($T$).**
*   **Why:** The time to hit the ground depends solely on the vertical motion. We know the initial vertical velocity, the vertical displacement, and the acceleration.
    We use the vertical displacement equation: $\Delta y = v_{0y} t + \frac{1}{2} a_y t^2$.
    Here, $\Delta y = -75 \, \text{m}$, $v_{0y} = 0$, and $a_y = -g$.
    $$-75 \, \text{m} = (0 \, \text{m/s}) T + \frac{1}{2} (-9.81 \, \text{m/s}^2) T^2$$
    $$-75 \, \text{m} = -4.905 \, \text{m/s}^2 T^2$$
    Rearrange to solve for $T^2$:
    $$T^2 = \frac{-75 \, \text{m}}{-4.905 \, \text{m/s}^2}$$
    $$T^2 = 15.2905 \, \text{s}^2$$
    Take the square root to find $T$:
    $$T = \sqrt{15.2905 \, \text{s}^2}$$
    $$T = 3.910 \, \text{s}$$
    Rounding to two decimal places:
    $$\boxed{T = 3.91 \, \text{s}}$$

**Step 3: Calculate Horizontal Range ($R$).**
*   **Why:** Horizontal motion is at constant velocity. We multiply the constant horizontal velocity by the total time of flight.
    We use: $\Delta x = v_{0x} t$.
    Here, $\Delta x = R$ and $t = T$.
    $$R = v_{0x} T$$
    Substitute the values of $v_{0x}$ and $T$:
    $$R = 20 \, \text{m/s} \times 3.910 \, \text{s}$$
    $$R = 78.20 \, \text{m}$$
    Rounding to two decimal places:
    $$\boxed{R = 78.20 \, \text{m}}$$

**Reflection:** This example highlights a common scenario where the launch and landing heights are different. In such cases, the simplified formulas for $T$ and $H_{max}$ (derived assuming $\Delta y = 0$) do not apply directly. Instead, we must go back to the fundamental kinematic equations and solve for time using the actual vertical displacement, which often involves solving a quadratic equation (though in this specific case, $v_{0y}=0$ simplified it to a direct square root).

### Example 3: Finding the Launch Angle

**Problem:** A golfer hits a ball with an initial speed of $45 \, \text{m/s}$. If the ball needs to travel a horizontal distance of $180 \, \text{m}$ and lands on level ground, what launch angle (or angles) could the golfer have used? Ignore air resistance.

**Given:**
*   Initial speed, $v_0 = 45 \, \text{m/s}$
*   Horizontal range, $R = 180 \, \text{m}$
*   Acceleration due to gravity, $g = 9.81 \, \text{m/s}^2$
*   Launch and landing heights are the same.

**What we want:**
*   Launch angle ($\theta$)

**Solution:**

**Step 1: Use the Range formula.**
*   **Why:** We are given the initial speed and the desired range, and we are looking for the angle. The derived range formula for level ground directly relates these quantities.
    $$R = \frac{v_0^2 \sin(2\theta)}{g}$$
    Rearrange to solve for $\sin(2\theta)$:
    $$\sin(2\theta) = \frac{R \cdot g}{v_0^2}$$
    Substitute the given values:
    $$\sin(2\theta) = \frac{180 \, \text{m} \times 9.81 \, \text{m/s}^2}{(45 \, \text{m/s})^2}$$
    $$\sin(2\theta) = \frac{1765.8 \, \text{m}^2/\text{s}^2}{2025 \, \text{m}^2/\text{s}^2}$$
    $$\sin(2\theta) = 0.8720$$

**Step 2: Solve for $2\theta$.**
*   **Why:** To find the angle, we need to take the inverse sine (arcsin) of the value. Remember that $\sin(x)$ has two solutions within $0^\circ$ to $180^\circ$.
    $$2\theta = \arcsin(0.8720)$$
    The primary value is:
    $$2\theta_1 = 60.69^\circ$$
    The secondary value (since $\sin(x) = \sin(180^\circ - x)$) is:
    $$2\theta_2 = 180^\circ - 60.69^\circ = 119.31^\circ$$

**Step 3: Solve for $\theta$.**
*   **Why:** We found $2\theta$, so we simply divide by 2 to get the actual launch angle.
    For the first angle:
    $$\theta_1 = \frac{60.69^\circ}{2}$$
    $$\theta_1 = 30.345^\circ$$
    Rounding to two decimal places:
    $$\boxed{\theta_1 = 30.35^\circ}$$
    For the second angle:
    $$\theta_2 = \frac{119.31^\circ}{2}$$
    $$\theta_2 = 59.655^\circ$$
    Rounding to two decimal places:
    $$\boxed{\theta_2 = 59.66^\circ}$$

**Reflection:** This example demonstrates that for a given initial speed and range (less than the maximum possible range), there are generally *two* launch angles that will achieve it: one shallow and one steep. These two angles are complementary (they add up to $90^\circ$). This is a crucial insight for practical applications like sports, where different trajectories might be desired for the same range.

### Example 4: Hitting a Target at a Specific Height and Distance

**Problem:** A projectile is launched from the ground towards a target located $100 \, \text{m}$ away horizontally and $15 \, \text{m}$ above the launch point. If the projectile is launched at an angle of $45^\circ$ above the horizontal, what initial speed ($v_0$) is required to hit the target?

**Given:**
*   Horizontal displacement, $\Delta x = 100 \, \text{m}$
*   Vertical displacement, $\Delta y = 15 \, \text{m}$
*   Launch angle, $\theta = 45^\circ$
*   Acceleration due to gravity, $g = 9.81 \, \text{m/s}^2$

**What we want:**
*   Initial speed ($v_0$)

**Solution:**

**Step 1: Write down the kinematic equations for horizontal and vertical motion.**
*   **Why:** We have two unknowns ($v_0$ and time $t$) and two independent equations (one for horizontal, one for vertical displacement). This indicates we'll need to solve a system of equations.
    Horizontal motion:
    $$\Delta x = (v_0 \cos(\theta)) t \quad (1)$$
    Vertical motion:
    $$\Delta y = (v_0 \sin(\theta)) t - \frac{1}{2} g t^2 \quad (2)$$

**Step 2: Substitute known values and simplify.**
*   **Why:** Plug in the given numbers to make the equations easier to work with. Note that $\cos(45^\circ) = \sin(45^\circ) = \frac{\sqrt{2}}{2} \approx 0.7071$.
    From (1):
    $$100 = (v_0 \times 0.7071) t$$
    $$100 = 0.7071 v_0 t \quad (1')$$
    From (2):
    $$15 = (v_0 \times 0.7071) t - \frac{1}{2} (9.81) t^2$$
    $$15 = 0.7071 v_0 t - 4.905 t^2 \quad (2')$$

**Step 3: Solve for $t$ in terms of $v_0$ (or vice versa) from one equation and substitute into the other.**
*   **Why:** We need to eliminate one variable to solve for the other. It's often easier to solve for time from the horizontal equation.
    From (1'):
    $$t = \frac{100}{0.7071 v_0} \quad (3)$$

**Step 4: Substitute $t$ from (3) into (2') and solve for $v_0$.**
*   **Why:** This will give us a single equation with only $v_0$ as the unknown.
    $$15 = 0.7071 v_0 \left( \frac{100}{0.7071 v_0} \right) - 4.905 \left( \frac{100}{0.7071 v_0} \right)^2$$
    The $0.7071 v_0$ terms cancel in the first part:
    $$15 = 100 - 4.905 \left( \frac{100^2}{(0.7071)^2 v_0^2} \right)$$
    $$15 = 100 - 4.905 \left( \frac{10000}{0.5 v_0^2} \right)$$
    $$15 = 100 - 4.905 \left( \frac{20000}{v_0^2} \right)$$
    $$15 = 100 - \frac{98100}{v_0^2}$$
    Rearrange to isolate the $v_0^2$ term:
    $$\frac{98100}{v_0^2} = 100 - 15$$
    $$\frac{98100}{v_0^2} = 85$$
    Now, solve for $v_0^2$:
    $$v_0^2 = \frac{98100}{85}$$
    $$v_0^2 = 1154.1176$$
    Take the square root to find $v_0$:
    $$v_0 = \sqrt{1154.1176}$$
    $$v_0 = 33.972 \, \text{m/s}$$
    Rounding to two decimal places:
    $$\boxed{v_0 = 33.97 \, \text{m/s}}$$

**Reflection:** This example is more challenging because it involves solving a system of two equations with two unknowns, and the target is not on level ground. The key is to avoid using the simplified range/max height/time formulas directly and instead work with the fundamental kinematic equations, solving for one variable (like time) in terms of another ($v_0$) and substituting. This approach is robust for any projectile motion problem.

## 6. Common mistakes and traps

1.  **Mixing up horizontal and vertical components:** Using $v_{0x}$ in a vertical motion equation or $v_{0y}$ in a horizontal motion equation. Remember $x$ and $y$ motions are independent.
2.  **Incorrect sign for $g$:** Always define a positive direction (e.g., upward is positive) and consistently apply $g$ as negative (downward) if that's the case.
3.  **Assuming $v_y=0$ at the end of flight:** $v_y=0$ only at the peak of the trajectory. At the end of flight, if it lands at the same height, the final vertical speed will be equal in magnitude but opposite in direction to the initial vertical speed ($v_y = -v_{0y}$). If it lands at a different height, $v_y$ will be non-zero.
4.  **Using $v_0$ (total initial speed) directly in kinematic equations:** The kinematic equations for 1D motion (like vertical motion) require the initial velocity *component* in that specific direction, not the overall launch speed.
5.  **Not understanding the "time" connection:** Time is the *only* variable that links the horizontal and vertical motions. You often need to solve for time using one component's equations and then use that time in the other component's equations.
6.  **Applying level-ground formulas to non-level-ground scenarios:** The derived formulas for $T$, $H_{max}$, and $R$ (especially $R$) assume the projectile lands at the same height it was launched from. If launch and landing heights differ, you must revert to the fundamental kinematic equations and solve the quadratic for time.
7.  **Trigonometric errors:** Forgetting $\sin(2\theta) = 2 \sin(\theta) \cos(\theta)$ or incorrectly using $\sin$ vs. $\cos$ for components.

## 7. Textbook-precise explanation

Projectile motion describes the motion of an object thrown or projected into the air, subject only to the acceleration of gravity. We typically make the following idealizing assumptions:
1.  **Negligible Air Resistance:** The force exerted by air friction on the projectile is ignored.
2.  **Constant Gravitational Acceleration:** The acceleration due to gravity, $g$, is constant in magnitude ($9.81 \, \text{m/s}^2$ near Earth's surface) and directed vertically downward. We assume the Earth is flat over the trajectory, so $g$ does not change direction.
3.  **No Earth Rotation:** The effects of Earth's rotation (e.g., Coriolis effect) are ignored.

Under these assumptions, the motion of a projectile can be analyzed by considering its horizontal and vertical components independently.

Let $v_0$ be the initial speed of the projectile and $\theta$ be the launch angle above the horizontal.

The initial velocity components are:
*   Horizontal: $v_{0x} = v_0 \cos(\theta)$
*   Vertical: $v_{0y} = v_0 \sin(\theta)$

**Horizontal Motion:**
The horizontal acceleration is $a_x = 0$.
Thus, the horizontal velocity $v_x$ remains constant throughout the flight:
$$v_x(t) = v_{0x} = v_0 \cos(\theta)$$
The horizontal displacement $\Delta x$ at time $t$ is:
$$\Delta x(t) = v_{0x} t = (v_0 \cos(\theta)) t$$

**Vertical Motion:**
The vertical acceleration is $a_y = -g$ (taking upward as the positive $y$-direction).
The vertical velocity $v_y$ at time $t$ is:
$$v_y(t) = v_{0y} - gt = v_0 \sin(\theta) - gt$$
The vertical displacement $\Delta y$ at time $t$ is:
$$\Delta y(t) = v_{0y} t - \frac{1}{2} gt^2 = (v_0 \sin(\theta)) t - \frac{1}{2} gt^2$$
Another useful kinematic relation for vertical motion is:
$$v_y^2 = v_{0y}^2 - 2g \Delta y = (v_0 \sin(\theta))^2 - 2g \Delta y$$

**Derived Quantities (for launch and landing at the same height, $\Delta y = 0$):**

1.  **Time of Flight ($T$):** The total time the projectile spends in the air.
    Setting $\Delta y(T) = 0$:
    $$0 = (v_0 \sin(\theta)) T - \frac{1}{2} gT^2$$
    $$T \left( v_0 \sin(\theta) - \frac{1}{2} gT \right) = 0$$
    The non-trivial solution ($T \neq 0$) yields:
    $$T = \frac{2 v_0 \sin(\theta)}{g}$$

2.  **Maximum Height ($H_{max}$):** The greatest vertical displacement reached by the projectile. At this point, the vertical velocity $v_y = 0$.
    Using $v_y^2 = v_{0y}^2 - 2g \Delta y$:
    $$0^2 = (v_0 \sin(\theta))^2 - 2g H_{max}$$
    $$H_{max} = \frac{(v_0 \sin(\theta))^2}{2g}$$

3.  **Horizontal Range ($R$):** The total horizontal distance traveled by the projectile. This is calculated by multiplying the constant horizontal velocity by the total time of flight.
    $$R = v_{0x} T = (v_0 \cos(\theta)) \left( \frac{2 v_0 \sin(\theta)}{g} \right)$$
    $$R = \frac{2 v_0^2 \sin(\theta) \cos(\theta)}{g}$$
    Using the trigonometric identity $\sin(2\theta) = 2 \sin(\theta) \cos(\theta)$:
    $$R = \frac{v_0^2 \sin(2\theta)}{g}$$

For maximum range on level ground, $\sin(2\theta)$ must be maximized, which occurs when $2\theta = 90^\circ$, so $\theta = 45^\circ$.

These derivations are standard in introductory physics textbooks, such as "Halliday, Resnick, & Walker, Fundamentals of Physics, 11e, Chapter 4" or "Serway & Jewett, Physics for Scientists and Engineers, 10e, Chapter 4."

## 8. ASCII diagrams

Here's a basic representation of projectile motion:

```text
       ^ y (vertical)
       |
       |         . (Max Height, H_max)
       |        /|\
       |       / | \
       |      /  |  \
       |     /   |   \
       |    /    |    \
       |   /     |     \
       |  /      |      \
       | /       |       \
       |/        |        \
    v0 .---------|---------\--------------------> x (horizontal)
      / \        |          \
     /   \       |           \
    /     \      |            \
   /       \     |             \
  /         \    |              \
 /           \   |               \
(Launch)      \  |                \ (Landing)
              ----------------------------------
                  <---------- Range (R) -------->

Key:
v0: Initial velocity vector
theta: Launch angle with horizontal
v0x: Initial horizontal velocity component (constant)
v0y: Initial vertical velocity component
g: Acceleration due to gravity (downward)
T: Total Time of Flight (from Launch to Landing)
H_max: Maximum Height (vertical distance from launch to peak)
R: Horizontal Range (horizontal distance from launch to landing)
```

This diagram shows the parabolic trajectory of a projectile launched from the origin (0,0) with initial velocity $v_0$ at an angle $\theta$. The horizontal component of velocity ($v_{0x}$) remains constant, while the vertical component ($v_{0y}$) decreases to zero at the maximum height and then increases in the negative direction. The maximum height ($H_{max}$) is where $v_y=0$, and the range ($R$) is the total horizontal distance covered during the time of flight ($T$).

## 9. Memory technique — never forget this

1.  **Specific mnemonic/visual hook:**
    *   **"Separate and Conquer, Time Connects!"** Visualize a projectile's path as two independent battles: one horizontal (easy, no gravity, constant speed) and one vertical (harder, gravity's pull, changing speed). The crucial link, the messenger between these two battles, is **TIME**. Always remember to find time from one component if you need it for the other.
    *   **"Sine for Sky, Cosine for Coast"**: $\sin(\theta)$ gives the vertical component (sky, up/down), $\cos(\theta)$ gives the horizontal component (coast, along the ground).

2.  **Formulas/facts to overlearn:**
    *   **The initial velocity components:** $v_{0x} = v_0 \cos(\theta)$ and $v_{0y} = v_0 \sin(\theta)$. These are your starting points for almost every problem.
    *   **The fundamental kinematic equations:** Especially $\Delta x = v_0 t + \frac{1}{2} a t^2$ and $v_f = v_0 + at$. These are the bedrock. The derived formulas are shortcuts, but these are the first principles.
    *   **The crucial conditions:**
        *   Horizontal acceleration $a_x = 0$.
        *   Vertical acceleration $a_y = -g$.
        *   At max height, $v_y = 0$.
        *   For level-ground flight, $\Delta y = 0$ for the total time $T$.

3.  **Spaced-repetition schedule:**
    *   **Review 1:** In 1 day (tomorrow).
    *   **Review 2:** In 3 days.
    *   **Review 3:** In 7 days.
    *   **Review 4:** In 16 days.
    *   **Review 5:** In 35 days.
    *   Each review should involve re-deriving the formulas and working through one or two new problems.

4.  **First-principles re-derivation pathway:** If you ever forget the specific formulas for $T$, $H_{max}$, or $R$, you can always rebuild them:
    *   **Step 1: Decompose $v_0$ into $v_{0x}$ and $v_{0y}$.** (Always start here).
    *   **Step 2: For Time of Flight ($T$):** Use the vertical displacement equation $\Delta y = v_{0y} t - \frac{1}{2} g t^2$. Set $\Delta y = 0$ (for level ground) and solve for $t$. You'll get $T = \frac{2 v_{0y}}{g}$.
    *   **Step 3: For Maximum Height ($H_{max}$):** Use the vertical velocity equation $v_y = v_{0y} - gt$. Set $v_y = 0$ to find the time to peak ($t_{peak} = v_{0y}/g$). Then substitute $t_{peak}$ into the vertical displacement equation, or use $v_y^2 = v_{0y}^2 - 2g \Delta y$ with $v_y = 0$. You'll get $H_{max} = \frac{v_{0y}^2}{2g}$.
    *   **Step 4: For Range ($R$):** Use the horizontal displacement equation $\Delta x = v_{0x} t$. Substitute the *total time of flight* $T$ (from Step 2) for $t$. You'll get $R = v_{0x} T$.

## 10. Connections — what this leads to

Understanding range, max height, and time of flight in ideal projectile motion is a foundational stepping stone to many advanced topics in physics and engineering:

*   **Orbital Mechanics:** Projectile motion is essentially a very short, low-altitude segment of an orbit. If you launch something fast enough, it won't fall back to Earth; it will continuously "fall around" it, entering orbit. The principles of decomposing velocity and analyzing motion under gravity are directly extended to elliptical orbits (Kepler's laws, patched conics).
*   **Rocket Trajectory Optimization:** For actual rocket launches, these basic principles are expanded to include varying gravity (with altitude), air resistance (drag), multi-stage rocket thrust, and the rotation of the Earth. The initial phases of a rocket's ascent still involve calculating a ballistic trajectory, and the gravity turn maneuver is designed to efficiently transition from vertical to horizontal velocity.
*   **Atmospheric Re-entry:** When spacecraft return to Earth, their re-entry trajectory is a complex form of projectile motion, heavily influenced by atmospheric drag, which must be precisely calculated to ensure safe landing and prevent overheating.
*   **Ballistics and Weapon Systems:** The study of projectile motion is central to ballistics, which informs the design and targeting of firearms, artillery, and missiles. Factors like spin stabilization, wind drift, and the Coriolis effect become relevant.
*   **Fluid Dynamics and Aerodynamics:** While we ignore air resistance here, understanding ideal projectile motion is a prerequisite to studying how air resistance (drag) and lift forces modify these trajectories. This is crucial for aircraft design, sports equipment, and even weather forecasting.
*   **Robotics and Control Systems:** For robots that manipulate objects by throwing or launching them (e.g., in manufacturing, automated sorting, or even space exploration for sample collection), precise control of launch angle and velocity is paramount. These systems often use real-time calculations based on projectile motion principles.
*   **Computational Physics and Simulation:** These simple analytical solutions serve as benchmarks for more complex numerical simulations of trajectories that include many non-ideal factors. They are also used to initialize such simulations.

## 11. Self-check questions

1.  A golfer hits a ball with an initial velocity of $60 \, \text{m/s}$ at an angle of $37^\circ$ above the horizontal. Assuming it lands on level ground, calculate the time it takes to reach its maximum height.
2.  A stone is thrown horizontally from a cliff $120 \, \text{m}$ high. If it lands $90 \, \text{m}$ from the base of the cliff, what was its initial speed?
3.  You want to throw a ball to a friend who is standing $30 \, \text{m}$ away on level ground. If you throw the ball with an initial speed of $25 \, \text{m/s}$, what are the two possible launch angles you could use to reach your friend?
4.  A projectile is launched with an initial speed $v_0$ at an angle $\theta$ from the ground. If its time of flight is $T$ and its maximum height is $H_{max}$, derive an expression for the horizontal range $R$ purely in terms of $v_0$, $H_{max}$, and $g$. (Hint: you may need to use trigonometric identities or substitute from the $H_{max}$ formula).
5.  A target is located at coordinates $(x, y)$ relative to the launch point $(0,0)$. If a projectile is launched with an initial speed $v_0$, show that the two possible launch angles $\theta$ (if they exist) are given by:
    $$\tan(\theta) = \frac{v_0^2 \pm \sqrt{v_0^4 - g(gx^2 + 2y v_0^2)}}{gx}$$
    (This is known as the "shooting equation" or "range equation" when solving for angle. It's a challenging derivation, but possible from first principles.)