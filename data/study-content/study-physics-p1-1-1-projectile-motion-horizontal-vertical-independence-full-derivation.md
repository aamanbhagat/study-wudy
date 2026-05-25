## 1. What it is — in plain English

Imagine you throw a ball, kick a football, or fire a cannon. What happens? The object flies through the air, following a curved path, until it hits the ground. This curved path is called a "trajectory," and the motion itself is called "projectile motion."

The key insight, which might seem counter-intuitive at first, is that the forward motion of the object and its up-and-down motion are almost entirely separate. Think of it like this: if you drop a ball straight down from a certain height, and at the exact same moment you throw an identical ball horizontally from the same height, both balls will hit the ground at precisely the same time! The act of throwing it forward doesn't make it fall any slower or faster.

So, in projectile motion, we're dealing with an object that's been launched into the air and is then only affected by the force of gravity pulling it downwards. We usually ignore things like air resistance (for simplicity, especially at first). The "horizontal/vertical independence" means we can analyze its journey sideways and its journey up-and-down as two separate, simpler problems that only share one thing: the total time the object is in the air.

## 2. Why it matters — real-world applications

Projectile motion is a foundational concept in physics and engineering, with widespread applications:

1.  **Ballistics and Weapon Systems:** From ancient catapults to modern artillery and firearms, understanding projectile trajectories is critical. Engineers and military strategists use these principles to calculate the range, flight time, and impact point of shells, bombs, and bullets, ensuring accuracy and effectiveness. This also extends to missile defense systems, where intercepting a projectile requires precise prediction of its path.

2.  **Sports Science and Performance Optimization:** Athletes and coaches constantly apply projectile motion, often without realizing the underlying physics.
    *   **Basketball:** Calculating the optimal launch angle and speed for a free throw or a three-pointer.
    *   **Golf:** Designing clubs and choosing shot types to maximize distance and accuracy, considering launch angle, spin (though spin introduces more complex aerodynamics beyond simple projectile motion), and clubhead speed.
    *   **Baseball/Softball:** Analyzing the trajectory of a hit ball to predict where it will land, or the path of a thrown pitch.
    *   **Archery/Javelin:** Determining the ideal release angle and force for maximum range and precision.

3.  **Aerospace Engineering and Rocketry (Suborbital Flight):** While rockets have active thrust, once their engines cut off (or for stages that separate), their subsequent path until re-entry or impact is a form of projectile motion. This is crucial for:
    *   **Suborbital Spaceflight:** Planning the trajectory of sounding rockets or tourist flights (like Virgin Galactic) that go into space but don't achieve orbit, then fall back to Earth.
    *   **Re-entry Vehicles:** Understanding the initial phase of a spacecraft's re-entry into the atmosphere, before significant atmospheric drag and lift forces become dominant.
    *   **Satellite Deployment:** The initial trajectory imparted to a satellite by its launch vehicle to place it into a specific orbit is a sophisticated application of these principles, albeit under the influence of Earth's curved gravity field rather than a constant downward 'g'.

4.  **Robotics and Machine Learning:**
    *   **Robotic Manipulation:** Designing robot arms that can throw objects accurately (e.g., in manufacturing, waste sorting, or even sports like robotic basketball players). This requires precise calculation of release velocity and angle.
    *   **Computer Vision and Object Tracking:** Algorithms that predict the future position of a moving object (e.g., a thrown ball in a sports game, or debris in a factory) often use simplified projectile motion models to estimate its path and potential collision points.

5.  **Forensic Science:** Analyzing the trajectory of bullets, thrown objects, or even blood spatter at a crime scene can provide critical information about the events that transpired, such as the position of a shooter or the force of an impact.

## 3. Prerequisites — what you must know first

Before diving deep into projectile motion, ensure you have a solid grasp of these fundamental concepts:

*   **Scalars and Vectors:** Understanding the difference between quantities that only have magnitude (scalars like mass, time) and those with both magnitude and direction (vectors like displacement, velocity, force).
*   **Vector Components:** How to break down a vector (like an initial velocity) into its horizontal (x) and vertical (y) parts using trigonometry (sine and cosine).
*   **Vector Addition and Subtraction:** How to combine or find the difference between vectors, often by adding or subtracting their respective components.
*   **Displacement, Velocity, and Acceleration:** The definitions of these kinematic quantities and how they relate to each other.
*   **Constant Acceleration Equations (Kinematic Equations for 1D Motion):** The four main equations that describe motion when acceleration is constant:
    *   $v = v_0 + at$
    *   $\Delta x = v_0t + \frac{1}{2}at^2$
    *   $v^2 = v_0^2 + 2a\Delta x$
    *   $\Delta x = \frac{v_0 + v}{2}t$
*   **Newton's Laws of Motion:** Especially Newton's Second Law ($F=ma$) and the concept of gravitational force, which gives rise to the acceleration due to gravity ($g$).
*   **Trigonometry Basics:** Sine, cosine, tangent, and how to use them to find sides and angles in right-angled triangles.

If any of these feel unfamiliar, pause here and review them. They are the building blocks for understanding projectile motion.

## 4. The core idea — step by step

Let's break down the concept of projectile motion into its fundamental principles.

### ### Step 1: Define a Projectile

*   **Plain English Statement:** A projectile is any object that is launched into the air and then moves solely under the influence of gravity. This means once it leaves the launcher (a hand, a cannon, a foot), no other forces like engine thrust or significant air resistance are considered.
*   **Concrete Example:** A baseball hit by a bat, a rock thrown from a cliff, a water balloon launched from a slingshot. A rocket with its engine firing is *not* a projectile in this strict sense, but after engine cutoff, it becomes one.
*   **Formal/Mathematical Version:** An object whose acceleration is constant and equal to the acceleration due to gravity, $\vec{a} = \vec{g}$.
*   **What Could Go Wrong:** Confusing projectile motion with situations where there are other active forces (like a bird flying, which generates lift, or a rocket with its engine on).

### ### Step 2: The Crucial Assumption — Neglecting Air Resistance

*   **Plain English Statement:** For simplicity, especially when first learning, we assume there's no air to slow the object down or push it around. It's like the object is moving in a perfect vacuum.
*   **Concrete Example:** The famous experiment where a feather and a hammer are dropped on the Moon (which has no atmosphere) and hit the ground at the same time. On Earth, the feather would float down slowly due to air resistance.
*   **Formal/Mathematical Version:** We assume that the net force acting on the projectile is solely the gravitational force, $F_{net} = mg$. Therefore, by Newton's Second Law, $ma = mg$, which implies $a = g$. We neglect drag forces, $F_{drag} \approx 0$.
*   **What Could Go Wrong:** Applying these simplified equations to objects where air resistance is clearly significant (e.g., a parachute, a badminton shuttlecock, or high-speed bullets over long distances). For more advanced studies, air resistance *is* included, making the problem much more complex.

### ### Step 3: Gravity Acts Only Vertically

*   **Plain English Statement:** Gravity pulls everything straight down towards the center of the Earth. It doesn't pull sideways, or forward, or backward. It only affects the up-and-down motion.
*   **Concrete Example:** If you drop a ball, it falls straight down. If you throw a ball horizontally, it *still* falls straight down, even as it moves forward. Gravity doesn't try to slow down its forward movement.
*   **Formal/Mathematical Version:** The acceleration due to gravity, $\vec{g}$, is a vector pointing purely in the negative y-direction (if we define 'up' as positive y). Its magnitude is approximately $9.81 \text{ m/s}^2$ (or $32.2 \text{ ft/s}^2$). So, $\vec{a} = (0, -g)$ or $a_x = 0$ and $a_y = -g$.
*   **What Could Go Wrong:** Thinking that gravity somehow reduces the horizontal speed of the projectile. It does not.

### ### Step 4: Horizontal Motion is Constant Velocity

*   **Plain English Statement:** Because gravity only pulls down and we're ignoring air resistance, there are no forces acting horizontally (sideways). According to Newton's First Law, an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force. So, the horizontal speed of the projectile never changes.
*   **Concrete Example:** Imagine a perfectly smooth, frictionless table. If you push a ball on it, it will keep rolling at a constant speed in a straight line forever (in an ideal world). That's what happens to the horizontal motion of a projectile.
*   **Formal/Mathematical Version:** Since $a_x = 0$, the horizontal velocity $v_x$ is constant throughout the flight.
    $$ v_x(t) = v_{0x} $$
    The horizontal position $x(t)$ is given by:
    $$ x(t) = x_0 + v_{0x}t $$
    Often, we set $x_0 = 0$ at the launch point, so $x(t) = v_{0x}t$.
*   **What Could Go Wrong:** Accidentally applying acceleration to the horizontal motion, or thinking that the horizontal speed decreases as the object rises or increases as it falls.

### ### Step 5: Vertical Motion is Constant Acceleration

*   **Plain English Statement:** The up-and-down motion is exactly like an object being thrown straight up and then falling back down. Gravity constantly pulls it downwards, causing it to slow down as it goes up, momentarily stop at the peak, and then speed up as it falls back down.
*   **Concrete Example:** Throw a ball straight up in the air. It slows down, stops, and comes back down, speeding up. This is precisely the vertical part of projectile motion.
*   **Formal/Mathematical Version:** Since $a_y = -g$ (constant acceleration), we can use the 1D kinematic equations for the vertical motion.
    $$ v_y(t) = v_{0y} - gt $$
    $$ y(t) = y_0 + v_{0y}t - \frac{1}{2}gt^2 $$
    $$ v_y^2 = v_{0y}^2 - 2g(y - y_0) $$
    Often, we set $y_0 = 0$ at the launch point.
*   **What Could Go Wrong:** Forgetting the negative sign for $g$ when 'up' is positive, or mixing up vertical and horizontal initial velocities.

### ### Step 6: The Independence Principle

*   **Plain English Statement:** This is the core idea: the horizontal motion and the vertical motion don't affect each other. They are completely independent. The only thing they share is the amount of time the projectile is in the air. You can think of them as two separate movies playing simultaneously, sharing only the clock.
*   **Concrete Example:** Drop a ball from a table. At the exact same time, roll an identical ball off the table horizontally. Both balls hit the floor at the same instant. The horizontal speed of the rolled ball doesn't change the time it takes to fall vertically.
*   **Formal/Mathematical Version:** We treat the x-component and y-component of motion separately using their respective kinematic equations.
    *   **Horizontal (x-direction):**
        $$ a_x = 0 $$
        $$ v_x = v_{0x} $$
        $$ x = v_{0x}t $$
    *   **Vertical (y-direction):**
        $$ a_y = -g $$
        $$ v_y = v_{0y} - gt $$
        $$ y = v_{0y}t - \frac{1}{2}gt^2 $$
        $$ v_y^2 = v_{0y}^2 - 2gy $$ (assuming $y_0 = 0$)
    The variable $t$ (time) is the common link between these two sets of equations.
*   **What Could Go Wrong:** Trying to combine horizontal and vertical quantities directly (e.g., adding $v_x$ and $v_y$ to get a scalar speed, or using $v_x$ in a vertical equation). Always keep components separate until you need to reconstruct a vector.

### ### Step 7: Full Derivation of Projectile Trajectory

Let's combine these principles to derive the general equations for projectile motion.

Assume a projectile is launched from the origin $(0,0)$ at time $t=0$ with an initial speed $v_0$ at an angle $\theta$ above the horizontal.

1.  **Resolve Initial Velocity:**
    The initial velocity vector $\vec{v}_0$ has components:
    $$ v_{0x} = v_0 \cos\theta $$
    $$ v_{0y} = v_0 \sin\theta $$

2.  **Define Acceleration Components:**
    As established, gravity acts only vertically downwards.
    $$ a_x = 0 $$
    $$ a_y = -g $$ (taking 'up' as positive y)

3.  **Derive Horizontal Motion Equations:**
    Since $a_x = 0$, the horizontal velocity is constant:
    $$ v_x(t) = v_{0x} = v_0 \cos\theta $$
    To find the horizontal position, we use $x = x_0 + v_{0x}t$. Since $x_0 = 0$:
    $$ x(t) = (v_0 \cos\theta)t $$

4.  **Derive Vertical Motion Equations:**
    Since $a_y = -g$, we use the constant acceleration equations for the y-direction.
    For vertical velocity:
    $$ v_y(t) = v_{0y} + a_yt $$
    $$ v_y(t) = v_0 \sin\theta - gt $$
    For vertical position, using $y = y_0 + v_{0y}t + \frac{1}{2}a_yt^2$. Since $y_0 = 0$:
    $$ y(t) = (v_0 \sin\theta)t - \frac{1}{2}gt^2 $$
    We can also find the vertical velocity at any height using:
    $$ v_y^2 = v_{0y}^2 + 2a_y(y - y_0) $$
    $$ v_y^2 = (v_0 \sin\theta)^2 - 2gy $$ (assuming $y_0 = 0$)

These four equations are the fundamental set for analyzing projectile motion:
$$ x(t) = (v_0 \cos\theta)t \quad \text{(Horizontal Position)} $$
$$ y(t) = (v_0 \sin\theta)t - \frac{1}{2}gt^2 \quad \text{(Vertical Position)} $$
$$ v_x(t) = v_0 \cos\theta \quad \text{(Horizontal Velocity)} $$
$$ v_y(t) = v_0 \sin\theta - gt \quad \text{(Vertical Velocity)} $$

From these, you can derive other important quantities:

*   **Time to reach maximum height ($t_{peak}$):** At the peak of its trajectory, the vertical velocity $v_y$ is momentarily zero. Set $v_y(t) = 0$:
    $$ 0 = v_0 \sin\theta - gt_{peak} $$
    $$ t_{peak} = \frac{v_0 \sin\theta}{g} $$
*   **Maximum Height ($H_{max}$):** Substitute $t_{peak}$ into the $y(t)$ equation:
    $$ H_{max} = (v_0 \sin\theta)\left(\frac{v_0 \sin\theta}{g}\right) - \frac{1}{2}g\left(\frac{v_0 \sin\theta}{g}\right)^2 $$
    $$ H_{max} = \frac{v_0^2 \sin^2\theta}{g} - \frac{1}{2}\frac{v_0^2 \sin^2\theta}{g} $$
    $$ H_{max} = \frac{v_0^2 \sin^2\theta}{2g} $$
*   **Total Time of Flight ($T$):** If the projectile lands at the same height it was launched from, the total time of flight is twice the time to reach maximum height (due to symmetry).
    $$ T = 2t_{peak} = \frac{2v_0 \sin\theta}{g} $$
    Alternatively, set $y(T) = 0$ in the position equation:
    $$ 0 = (v_0 \sin\theta)T - \frac{1}{2}gT^2 $$
    $$ T\left(v_0 \sin\theta - \frac{1}{2}gT\right) = 0 $$
    This gives two solutions: $T=0$ (the launch time) and $v_0 \sin\theta - \frac{1}{2}gT = 0$, which yields $T = \frac{2v_0 \sin\theta}{g}$.
*   **Horizontal Range ($R$):** The horizontal distance covered during the total time of flight. Substitute $T$ into the $x(t)$ equation:
    $$ R = (v_0 \cos\theta)T $$
    $$ R = (v_0 \cos\theta)\left(\frac{2v_0 \sin\theta}{g}\right) $$
    $$ R = \frac{2v_0^2 \sin\theta \cos\theta}{g} $$
    Using the trigonometric identity $\sin(2\theta) = 2\sin\theta\cos\theta$:
    $$ R = \frac{v_0^2 \sin(2\theta)}{g} $$
    This formula for range is only valid if the launch and landing heights are the same.

## 5. Worked examples — multiple, with every step shown

We'll use $g = 9.81 \text{ m/s}^2$ for these examples.

### Example 1: Horizontal Launch from a Cliff

**Problem:** A stone is thrown horizontally from the top of a 50.0 m high cliff with an initial speed of 15.0 m/s.
a) How long does it take for the stone to hit the ground?
b) How far from the base of the cliff does the stone land?
c) What is the velocity of the stone just before it hits the ground?

**Given:**
*   Initial height, $y_0 = 50.0 \text{ m}$ (let's set the ground as $y=0$, so initial position is $(0, 50)$)
*   Initial horizontal velocity, $v_{0x} = 15.0 \text{ m/s}$
*   Initial vertical velocity, $v_{0y} = 0 \text{ m/s}$ (since it's thrown horizontally)
*   Acceleration due to gravity, $a_y = -g = -9.81 \text{ m/s}^2$
*   Horizontal acceleration, $a_x = 0 \text{ m/s}^2$
*   Final vertical position, $y = 0 \text{ m}$

**What we want:**
a) Time of flight, $t$
b) Horizontal range, $x$
c) Final velocity vector, $\vec{v}$ (magnitude and direction)

---

**Solution:**

**a) Time to hit the ground ($t$):**
We use the vertical motion equations because we know the initial and final vertical positions and initial vertical velocity.
$$ y = y_0 + v_{0y}t + \frac{1}{2}a_yt^2 $$
Substitute the known values:
$$ 0 = 50.0 \text{ m} + (0 \text{ m/s})t + \frac{1}{2}(-9.81 \text{ m/s}^2)t^2 $$
*This is the kinematic equation for vertical position. We've set the ground as $y=0$ and the launch point as $y_0 = 50.0 \text{ m}$. Since the stone is thrown horizontally, its initial vertical velocity ($v_{0y}$) is zero.*

Simplify the equation:
$$ 0 = 50.0 - 4.905t^2 $$
*The $(0)t$ term vanishes, and $\frac{1}{2}(-9.81)$ becomes $-4.905$.*

Rearrange to solve for $t^2$:
$$ 4.905t^2 = 50.0 $$
*Move the term with $t^2$ to the other side to isolate it.*

Divide by 4.905:
$$ t^2 = \frac{50.0}{4.905} $$
$$ t^2 \approx 10.19368 $$
*Perform the division.*

Take the square root of both sides. Since time must be positive:
$$ t = \sqrt{10.19368} $$
$$ t \approx 3.193 \text{ s} $$
*Calculate the square root. This is the total time the stone is in the air.*

**The stone takes approximately $\boxed{3.19 \text{ s}}$ to hit the ground.**

**b) How far from the base of the cliff does the stone land ($x$)?**
Now that we have the time of flight, we can use the horizontal motion equation.
$$ x = v_{0x}t $$
*This is the kinematic equation for horizontal position. There is no acceleration horizontally, so velocity is constant.*

Substitute the initial horizontal velocity and the time calculated in part (a):
$$ x = (15.0 \text{ m/s})(3.193 \text{ s}) $$
*Multiply the constant horizontal velocity by the total time the stone is in the air.*

Calculate the horizontal distance:
$$ x \approx 47.895 \text{ m} $$

**The stone lands approximately $\boxed{47.9 \text{ m}}$ from the base of the cliff.**

**c) What is the velocity of the stone just before it hits the ground?**
We need both the horizontal and vertical components of the velocity at $t = 3.193 \text{ s}$.

**Horizontal velocity ($v_x$):**
$$ v_x = v_{0x} $$
$$ v_x = 15.0 \text{ m/s} $$
*The horizontal velocity remains constant throughout the flight, as there is no horizontal acceleration.*

**Vertical velocity ($v_y$):**
$$ v_y = v_{0y} + a_yt $$
*This is the kinematic equation for final vertical velocity.*

Substitute the initial vertical velocity, acceleration due to gravity, and time:
$$ v_y = 0 \text{ m/s} + (-9.81 \text{ m/s}^2)(3.193 \text{ s}) $$
*The initial vertical velocity is zero. Gravity constantly accelerates the stone downwards.*

Calculate the vertical velocity:
$$ v_y \approx -31.32 \text{ m/s} $$
*The negative sign indicates the velocity is in the downward direction.*

**Magnitude of the final velocity ($|\vec{v}|$):**
The final velocity vector has components $v_x = 15.0 \text{ m/s}$ and $v_y = -31.32 \text{ m/s}$. We use the Pythagorean theorem to find the magnitude.
$$ |\vec{v}| = \sqrt{v_x^2 + v_y^2} $$
$$ |\vec{v}| = \sqrt{(15.0 \text{ m/s})^2 + (-31.32 \text{ m/s})^2} $$
*The magnitude of a vector with components $A_x$ and $A_y$ is $\sqrt{A_x^2 + A_y^2}$.*

$$ |\vec{v}| = \sqrt{225 + 980.9424} $$
$$ |\vec{v}| = \sqrt{1205.9424} $$
$$ |\vec{v}| \approx 34.73 \text{ m/s} $$

**Direction of the final velocity ($\alpha$):**
We use the arctangent function. Let $\alpha$ be the angle below the horizontal.
$$ \tan\alpha = \frac{|v_y|}{|v_x|} $$
$$ \tan\alpha = \frac{31.32 \text{ m/s}}{15.0 \text{ m/s}} $$
$$ \tan\alpha \approx 2.088 $$
*The tangent of the angle is the ratio of the opposite side (vertical component) to the adjacent side (horizontal component) in the right triangle formed by the velocity components.*

$$ \alpha = \arctan(2.088) $$
$$ \alpha \approx 64.4^\circ $$
*Calculate the inverse tangent to find the angle.*

**The velocity of the stone just before it hits the ground is approximately $\boxed{34.7 \text{ m/s at } 64.4^\circ \text{ below the horizontal}}$.**

**Reflection:** This example was relatively easy because the initial vertical velocity was zero, simplifying the vertical kinematic equations. The key was to first find time using vertical motion, then use that time for horizontal motion.

---

### Example 2: Launch at an Angle (Symmetric Trajectory)

**Problem:** A projectile is launched from the ground with an initial speed of 30.0 m/s at an angle of $30.0^\circ$ above the horizontal.
a) What is the maximum height the projectile reaches?
b) What is the total time the projectile is in the air?
c) What is the horizontal range of the projectile?

**Given:**
*   Initial speed, $v_0 = 30.0 \text{ m/s}$
*   Launch angle, $\theta = 30.0^\circ$
*   Initial height, $y_0 = 0 \text{ m}$ (launched from ground)
*   Final height for total flight, $y = 0 \text{ m}$ (lands on ground)
*   Acceleration due to gravity, $a_y = -g = -9.81 \text{ m/s}^2$
*   Horizontal acceleration, $a_x = 0 \text{ m/s}^2$

**What we want:**
a) Maximum height, $H_{max}$
b) Total time of flight, $T$
c) Horizontal range, $R$

---

**Solution:**

**First, resolve the initial velocity into components:**
$$ v_{0x} = v_0 \cos\theta = (30.0 \text{ m/s})\cos(30.0^\circ) $$
$$ v_{0x} = (30.0 \text{ m/s})(0.866) \approx 25.98 \text{ m/s} $$
*This is the initial speed in the horizontal direction.*

$$ v_{0y} = v_0 \sin\theta = (30.0 \text{ m/s})\sin(30.0^\circ) $$
$$ v_{0y} = (30.0 \text{ m/s})(0.500) = 15.0 \text{ m/s} $$
*This is the initial speed in the vertical direction.*

**a) Maximum height ($H_{max}$):**
At the maximum height, the vertical velocity ($v_y$) is momentarily zero. We use the kinematic equation that relates initial and final velocities, acceleration, and displacement.
$$ v_y^2 = v_{0y}^2 + 2a_y(y - y_0) $$
*This equation is useful because it doesn't require time, which we don't know yet for max height.*

Substitute known values: $v_y = 0$, $v_{0y} = 15.0 \text{ m/s}$, $a_y = -9.81 \text{ m/s}^2$, $y_0 = 0$.
$$ 0^2 = (15.0 \text{ m/s})^2 + 2(-9.81 \text{ m/s}^2)(H_{max} - 0) $$
*The final vertical velocity at the peak is zero. $H_{max}$ is the displacement from the initial height.*

$$ 0 = 225 - 19.62 H_{max} $$
*Square $15.0$ and multiply $2$ by $-9.81$.*

Rearrange to solve for $H_{max}$:
$$ 19.62 H_{max} = 225 $$
$$ H_{max} = \frac{225}{19.62} $$
$$ H_{max} \approx 11.468 \text{ m} $$
*Divide to find the maximum height.*

**The maximum height the projectile reaches is approximately $\boxed{11.5 \text{ m}}$.**

**b) Total time the projectile is in the air ($T$):**
The projectile starts at $y_0 = 0$ and lands at $y = 0$. We can use the vertical position equation.
$$ y = y_0 + v_{0y}t + \frac{1}{2}a_yt^2 $$
Substitute known values: $y = 0$, $y_0 = 0$, $v_{0y} = 15.0 \text{ m/s}$, $a_y = -9.81 \text{ m/s}^2$.
$$ 0 = 0 + (15.0 \text{ m/s})T + \frac{1}{2}(-9.81 \text{ m/s}^2)T^2 $$
*Since it lands at the same height, the net vertical displacement is zero. $T$ represents the total time of flight.*

Simplify the equation:
$$ 0 = 15.0T - 4.905T^2 $$
*The $y_0$ term is zero, and $\frac{1}{2}(-9.81)$ is $-4.905$.*

Factor out $T$:
$$ 0 = T(15.0 - 4.905T) $$
*This gives two solutions for $T$. One is $T=0$ (the launch time), and the other is when the term in the parenthesis is zero.*

Set the term in parenthesis to zero and solve for $T$:
$$ 15.0 - 4.905T = 0 $$
$$ 4.905T = 15.0 $$
$$ T = \frac{15.0}{4.905} $$
$$ T \approx 3.058 \text{ s} $$
*This is the non-zero time when the projectile returns to its initial height.*

**The total time the projectile is in the air is approximately $\boxed{3.06 \text{ s}}$.**

*Alternative for time of flight:* You could also find the time to peak ($t_{peak}$) by setting $v_y=0$ in $v_y = v_{0y} + a_yt$, then double it for symmetric flight.
$0 = 15.0 - 9.81 t_{peak} \implies t_{peak} = 15.0/9.81 \approx 1.529 \text{ s}$.
$T = 2 \times t_{peak} = 2 \times 1.529 \text{ s} \approx 3.058 \text{ s}$. This confirms the result.

**c) Horizontal range ($R$):**
Now use the total time of flight and the constant horizontal velocity.
$$ x = v_{0x}t $$
*The horizontal distance is simply the horizontal velocity multiplied by the total time in the air.*

Substitute $v_{0x} = 25.98 \text{ m/s}$ and $T = 3.058 \text{ s}$:
$$ R = (25.98 \text{ m/s})(3.058 \text{ s}) $$
*Multiply the horizontal velocity by the total time calculated in part (b).*

$$ R \approx 79.46 \text{ m} $$

**The horizontal range of the projectile is approximately $\boxed{79.5 \text{ m}}$.**

**Reflection:** This example demonstrates how to handle an angled launch. The initial step of resolving the velocity into components is crucial. For symmetric trajectories (launch and land at same height), the time to max height is half the total flight time, which can be a useful shortcut.

---

### Example 3: Launch at an Angle, Lands at Different Height

**Problem:** A golf ball is hit from the ground with an initial speed of 40.0 m/s at an angle of $35.0^\circ$ above the horizontal. It lands on a green that is 10.0 m *higher* than the tee.
a) What is the time of flight of the golf ball?
b) What is the horizontal distance the ball travels before landing on the green?

**Given:**
*   Initial speed, $v_0 = 40.0 \text{ m/s}$
*   Launch angle, $\theta = 35.0^\circ$
*   Initial height, $y_0 = 0 \text{ m}$ (launched from ground)
*   Final height, $y = 10.0 \text{ m}$ (lands 10m higher)
*   Acceleration due to gravity, $a_y = -g = -9.81 \text{ m/s}^2$
*   Horizontal acceleration, $a_x = 0 \text{ m/s}^2$

**What we want:**
a) Time of flight, $t$
b) Horizontal distance, $x$

---

**Solution:**

**First, resolve the initial velocity into components:**
$$ v_{0x} = v_0 \cos\theta = (40.0 \text{ m/s})\cos(35.0^\circ) $$
$$ v_{0x} = (40.0 \text{ m/s})(0.81915) \approx 32.766 \text{ m/s} $$
*This is the initial speed in the horizontal direction.*

$$ v_{0y} = v_0 \sin\theta = (40.0 \text{ m/s})\sin(35.0^\circ) $$
$$ v_{0y} = (40.0 \text{ m/s})(0.57358) \approx 22.943 \text{ m/s} $$
*This is the initial speed in the vertical direction.*

**a) Time of flight ($t$):**
We know the initial and final vertical positions, initial vertical velocity, and vertical acceleration. This suggests using the vertical position equation.
$$ y = y_0 + v_{0y}t + \frac{1}{2}a_yt^2 $$
Substitute known values: $y = 10.0 \text{ m}$, $y_0 = 0$, $v_{0y} = 22.943 \text{ m/s}$, $a_y = -9.81 \text{ m/s}^2$.
$$ 10.0 = 0 + (22.943)t + \frac{1}{2}(-9.81)t^2 $$
*The final height is $10.0 \text{ m}$ above the initial height. We are solving for the time $t$ when the ball reaches this height.*

Rearrange into a standard quadratic equation form ($at^2 + bt + c = 0$):
$$ 10.0 = 22.943t - 4.905t^2 $$
$$ 4.905t^2 - 22.943t + 10.0 = 0 $$
*Move all terms to one side to get a quadratic equation.*

Use the quadratic formula, $t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, where $a = 4.905$, $b = -22.943$, $c = 10.0$.
$$ t = \frac{-(-22.943) \pm \sqrt{(-22.943)^2 - 4(4.905)(10.0)}}{2(4.905)} $$
*Carefully substitute the coefficients into the quadratic formula.*

$$ t = \frac{22.943 \pm \sqrt{526.439 - 196.2}}{9.81} $$
$$ t = \frac{22.943 \pm \sqrt{330.239}}{9.81} $$
$$ t = \frac{22.943 \pm 18.172}{9.81} $$
*Calculate the terms under the square root and then the square root itself.*

This gives two possible times:
$$ t_1 = \frac{22.943 - 18.172}{9.81} = \frac{4.771}{9.81} \approx 0.486 \text{ s} $$
$$ t_2 = \frac{22.943 + 18.172}{9.81} = \frac{41.115}{9.81} \approx 4.191 \text{ s} $$
*The quadratic formula often yields two solutions. Both are physically meaningful: $t_1$ is the time when the ball is at $y=10.0 \text{ m}$ on its way up, and $t_2$ is the time when it's at $y=10.0 \text{ m}$ on its way down (which is when it lands).*

Since the ball lands *on* the green, it has completed its flight, so we choose the longer time.
**The time of flight is approximately $\boxed{4.19 \text{ s}}$.**

**b) Horizontal distance ($x$):**
Now use the total time of flight and the constant horizontal velocity.
$$ x = v_{0x}t $$
*The horizontal distance is simply the horizontal velocity multiplied by the total time in the air.*

Substitute $v_{0x} = 32.766 \text{ m/s}$ and $t = 4.191 \text{ s}$:
$$ x = (32.766 \text{ m/s})(4.191 \text{ s}) $$
*Multiply the horizontal velocity by the total time calculated in part (a).*

$$ x \approx 137.31 \text{ m} $$

**The horizontal distance the ball travels is approximately $\boxed{137 \text{ m}}$.**

**Reflection:** This example highlights the importance of the quadratic formula when the landing height is different from the launch height. Recognizing that both solutions are physically meaningful (one on the way up, one on the way down) is key. We choose the later time for landing.

---

### Example 4: Finding Launch Angle for Maximum Range

**Problem:** A cannon can launch a projectile with an initial speed of 100 m/s. Assuming it's launched from and lands on level ground, what launch angle will achieve the maximum horizontal range, and what is that maximum range?

**Given:**
*   Initial speed, $v_0 = 100 \text{ m/s}$
*   Initial height, $y_0 = 0 \text{ m}$
*   Final height, $y = 0 \text{ m}$
*   Acceleration due to gravity, $g = 9.81 \text{ m/s}^2$

**What we want:**
a) Launch angle $\theta$ for maximum range
b) Maximum range $R_{max}$

---

**Solution:**

**a) Launch angle $\theta$ for maximum range:**
For a projectile launched from and landing on the same horizontal level, the horizontal range $R$ is given by the formula derived earlier:
$$ R = \frac{v_0^2 \sin(2\theta)}{g} $$
*This formula relates range to initial velocity, launch angle, and gravity.*

To maximize $R$ for a given $v_0$ and $g$, we need to maximize the $\sin(2\theta)$ term, because $v_0^2$ and $g$ are constants.
The maximum value of the sine function is 1.
$$ \sin(2\theta)_{max} = 1 $$
*The sine function oscillates between -1 and 1. Its peak value is 1.*

The angle whose sine is 1 is $90^\circ$ (or $\pi/2$ radians).
$$ 2\theta = 90^\circ $$
*Set the argument of the sine function equal to $90^\circ$.*

Solve for $\theta$:
$$ \theta = \frac{90^\circ}{2} $$
$$ \theta = 45^\circ $$
*Divide by 2 to find the launch angle.*

**The launch angle that achieves maximum horizontal range is $\boxed{45^\circ}$.**

**b) Maximum range ($R_{max}$):**
Now substitute $\theta = 45^\circ$ (which makes $\sin(2\theta) = \sin(90^\circ) = 1$) and the given initial speed into the range formula.
$$ R_{max} = \frac{v_0^2 \sin(2 \times 45^\circ)}{g} $$
$$ R_{max} = \frac{v_0^2 \sin(90^\circ)}{g} $$
*Substitute the values into the range equation.*

$$ R_{max} = \frac{(100 \text{ m/s})^2 \times 1}{9.81 \text{ m/s}^2} $$
*Substitute $v_0 = 100 \text{ m/s}$ and $\sin(90^\circ) = 1$.*

$$ R_{max} = \frac{10000 \text{ m}^2/\text{s}^2}{9.81 \text{ m/s}^2} $$
$$ R_{max} \approx 1019.36 \text{ m} $$

**The maximum horizontal range is approximately $\boxed{1020 \text{ m}}$.**

**Reflection:** This example demonstrates a common optimization problem in projectile motion. Understanding the properties of trigonometric functions (specifically the maximum value of sine) is crucial here. This formula for range is a shortcut and only applies to symmetric trajectories.

---

## 6. Common mistakes and traps

1.  **Mixing up horizontal and vertical quantities:** This is the most frequent error. Students might accidentally use $v_{0y}$ in a horizontal equation or $v_x$ in a vertical equation. *Always separate variables by component.*
2.  **Incorrectly applying signs for acceleration due to gravity:** If 'up' is chosen as positive, then $a_y$ must be $-g$. If 'down' is chosen as positive, then $a_y$ is $+g$. Inconsistency leads to wrong answers.
3.  **Forgetting that horizontal velocity ($v_x$) is constant:** Many students incorrectly assume that horizontal velocity changes, perhaps slowing down at the peak or speeding up as it falls, like vertical velocity. *Remember: $a_x=0$ means $v_x$ is constant.*
4.  **Using the wrong kinematic equation:** There are four 1D kinematic equations. Choosing the correct one depends on what variables are known and what needs to be found. Forgetting one or misapplying it is a common pitfall.
5.  **Not resolving initial velocity into components:** When a projectile is launched at an angle, the first step *must* be to break $v_0$ into $v_{0x}$ and $v_{0y}$ using trigonometry. Skipping this step or doing it incorrectly will propagate errors throughout the problem.
6.  **Assuming symmetry for non-symmetric trajectories:** The formulas for total time of flight and range ($T = \frac{2v_0 \sin\theta}{g}$, $R = \frac{v_0^2 \sin(2\theta)}{g}$) are only valid if the projectile lands at the *same height* from which it was launched. If the landing height is different (e.g., landing on a cliff or in a valley), these formulas cannot be used directly, and you'll likely need the quadratic formula for time.

## 7. Textbook-precise explanation

Projectile motion describes the motion of an object launched into the air, subject only to the acceleration of gravity. In this idealized model, air resistance and the rotation of the Earth are neglected. The fundamental principle governing projectile motion is the independence of horizontal and vertical components of motion.

Consider a coordinate system where the positive x-axis is horizontal and the positive y-axis is vertically upward. The acceleration vector for a projectile is given by:
$$ \vec{a} = a_x \hat{i} + a_y \hat{j} $$
Under the influence of gravity alone, the acceleration components are:
$$ a_x = 0 $$
$$ a_y = -g $$
where $g$ is the magnitude of the acceleration due to gravity (approximately $9.81 \text{ m/s}^2$ near Earth's surface).

Let the projectile be launched at time $t=0$ from an initial position $\vec{r}_0 = x_0 \hat{i} + y_0 \hat{j}$ with an initial velocity $\vec{v}_0 = v_{0x} \hat{i} + v_{0y} \hat{j}$. If the launch occurs at an angle $\theta$ with respect to the horizontal and an initial speed $v_0$, then the initial velocity components are:
$$ v_{0x} = v_0 \cos\theta $$
$$ v_{0y} = v_0 \sin\theta $$

**Horizontal Motion:**
Since $a_x = 0$, the horizontal velocity $v_x$ remains constant throughout the flight:
$$ v_x(t) = v_{0x} $$
The horizontal position $x(t)$ at any time $t$ is given by:
$$ x(t) = x_0 + v_{0x}t $$

**Vertical Motion:**
Since $a_y = -g$ (constant acceleration), the vertical motion is described by the standard kinematic equations for constant acceleration:
$$ v_y(t) = v_{0y} - gt $$
$$ y(t) = y_0 + v_{0y}t - \frac{1}{2}gt^2 $$
$$ v_y^2(t) = v_{0y}^2 - 2g(y(t) - y_0) $$

The position vector $\vec{r}(t)$ and velocity vector $\vec{v}(t)$ of the projectile at any time $t$ are then:
$$ \vec{r}(t) = (x_0 + v_{0x}t)\hat{i} + (y_0 + v_{0y}t - \frac{1}{2}gt^2)\hat{j} $$
$$ \vec{v}(t) = (v_{0x})\hat{i} + (v_{0y} - gt)\hat{j} $$

The trajectory of the projectile is a parabola. This can be shown by solving the horizontal position equation for $t = \frac{x-x_0}{v_{0x}}$ and substituting it into the vertical position equation, yielding $y(x) = y_0 + \frac{v_{0y}}{v_{0x}}(x-x_0) - \frac{g}{2v_{0x}^2}(x-x_0)^2$, which is a quadratic equation in $x$.

For a more rigorous treatment, refer to:
*   Serway, R. A., & Jewett, J. W. (2018). *Physics for Scientists and Engineers* (10th ed.). Cengage Learning. (Chapter 4: Motion in Two and Three Dimensions)
*   Halliday, D., Resnick, R., & Walker, J. (2018). *Fundamentals of Physics* (11th ed.). John Wiley & Sons. (Chapter 4: Motion in Two and Three Dimensions)

## 8. ASCII diagrams

```text
       ^ y
       |
       |  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .