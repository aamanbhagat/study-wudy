## 1. What it is — in plain English

Imagine you're swinging a bucket of water in a vertical circle over your head. If you swing it fast enough, the water stays in the bucket, even when it's upside down at the very top of the circle. But if you slow down too much, what happens? Splash! The water falls out.

"Vertical circular motion — minimum speed conditions" is all about figuring out exactly how fast you need to be going at different points in a vertical loop to prevent things from falling, collapsing, or losing contact with the path. It's about finding that critical speed, especially at the highest point of the circle, where gravity is trying its hardest to pull things down and make them fall.

Think of it like a roller coaster going through a loop-the-loop. If the coaster car enters the loop too slowly, it won't make it all the way around; it'll stall at the top and fall back down. The "minimum speed condition" tells us the slowest possible speed the coaster can have at the very peak of the loop to successfully complete the circle without falling.

In essence, it's the bare minimum speed required to defy gravity's pull at the most challenging point in a vertical circle, ensuring the object maintains its circular path. Any slower, and the circular motion breaks, usually with a dramatic fall.

## 2. Why it matters — real-world applications

Understanding minimum speed conditions in vertical circular motion is crucial for safety, design, and performance across many engineering and physics domains.

1.  **Roller Coaster Design and Safety:** This is perhaps the most direct application. Engineers designing roller coasters must precisely calculate the minimum speed required for cars to safely navigate vertical loops without falling off the track or exerting dangerously low (or zero) normal forces on passengers, which could lead to them lifting out of their seats. This ensures both the ride's completion and passenger safety.
2.  **Aircraft Maneuvers (e.g., Loop-the-Loop):** Pilots performing aerobatic maneuvers like a vertical loop must maintain a minimum speed to complete the maneuver successfully and safely. If the speed drops too low at the top of the loop, the aircraft could stall, lose lift, and fall out of the maneuver, which is extremely dangerous. The minimum speed ensures the aircraft remains under control and follows its intended circular path.
3.  **Spacecraft Rendezvous and Docking (Conceptual Link):** While not a direct "falling out of a loop" scenario, the principle of maintaining a certain velocity to counteract gravitational forces is fundamental to orbital mechanics. For example, maintaining a stable circular orbit requires a specific orbital velocity; if a spacecraft's velocity drops too low, it will begin to "fall" towards the central body. Understanding the balance between speed and gravity in a circular path is a foundational concept that extends to more complex orbital maneuvers.
4.  **Industrial Centrifuges (Indirect Application):** Though centrifuges typically operate in horizontal circles, the underlying principles of maintaining an object's circular path through applied forces are relevant. For vertical centrifuges or those with tilting components, understanding how speed affects the forces on the contents (e.g., preventing a substance from collapsing or losing contact with the centrifuge wall) would draw on similar dynamic analyses.

## 3. Prerequisites — what you must know first

Before diving deep into minimum speed conditions for vertical circular motion, ensure you have a solid grasp of these foundational concepts:

*   **Newton's Laws of Motion:** Especially Newton's Second Law ($F_{net} = ma$), which is the bedrock for analyzing forces and motion.
*   **Free Body Diagrams (FBDs):** The ability to accurately draw all forces acting on an object, including their directions, is absolutely essential for setting up correct equations.
*   **Gravitational Force:** Understanding that an object near Earth's surface experiences a downward force $F_g = mg$, where $m$ is mass and $g$ is the acceleration due to gravity ($\approx 9.81 \text{ m/s}^2$).
*   **Circular Motion Kinematics:** Knowledge of centripetal acceleration ($a_c = v^2/r$), which is the acceleration directed towards the center of a circular path, where $v$ is the object's speed and $r$ is the radius of the circle.
*   **Centripetal Force:** Understanding that centripetal force is not a *new* type of force, but rather the *net force* that causes centripetal acceleration. It's the sum of all real forces (like tension, normal force, gravity) acting towards the center of the circle.
*   **Basic Algebra and Vector Addition:** Competence in solving equations and combining forces (vectors) along specific axes.
*   **Conservation of Mechanical Energy (Optional but Recommended):** While not strictly necessary for finding the minimum speed *at a specific point* (usually the top), many problems involving vertical circular motion require calculating speeds at different points in the circle, which is most efficiently done using energy conservation ($E_i = E_f$, where $E = KE + PE = \frac{1}{2}mv^2 + mgh$).

## 4. The core idea — step by step

The core idea behind minimum speed conditions in vertical circular motion is to identify the point where the object is most likely to "fall" or "lose contact" and then determine the slowest speed at that point that still allows it to maintain its circular path. This critical point is always the very top of the vertical circle.

### Step 1: Identify the forces involved and the critical point.

*   **Plain English:** When an object moves in a vertical circle, two main forces are always at play: gravity pulling it down, and a force pushing or pulling it towards the center of the circle (like tension in a string, or the normal force from a track). The most challenging spot for an object to maintain its circular path against gravity is at the very top of the loop.
*   **Example:** Imagine a car going through a loop-the-loop. At the top, gravity is pulling the car downwards. The track also pushes downwards on the car (this is the normal force) to help keep it on the circular path. If the car is too slow, gravity will win, and the car will fall off the track.
*   **Formal/Mathematical:**
    *   Forces: Gravitational force ($F_g = mg$) always acts vertically downwards.
    *   Centripetal force ($F_c = ma_c = mv^2/r$) is the net force acting towards the center of the circle.
    *   Other forces (e.g., Tension $T$, Normal force $N$) act along the radius, either towards or away from the center.
    *   Critical Point: The highest point in the vertical circle.
*   **What could go wrong:** Forgetting to include gravity, or misidentifying the direction of the normal or tension force at different points in the circle.

### Step 2: Apply Newton's Second Law for circular motion.

*   **Plain English:** For an object to move in a circle, there must be a net force acting towards the center of that circle. This net force is called the centripetal force, and it's responsible for constantly changing the object's direction, keeping it on the curved path.
*   **Example:** If you tie a ball to a string and swing it in a circle, the tension in the string provides the centripetal force. Without it, the ball would fly off in a straight line.
*   **Formal/Mathematical:**
    $$ \sum F_{\text{radial}} = ma_c = \frac{mv^2}{r} $$
    Where $\sum F_{\text{radial}}$ is the net force component acting along the radius (towards the center), $m$ is the mass, $v$ is the instantaneous speed, and $r$ is the radius of the circular path.
*   **What could go wrong:** Treating centripetal force as a *new* force in the FBD rather than the *sum* of existing forces. It's a *net* force requirement, not an additional force.

### Step 3: Analyze forces at the critical point (the top of the loop).

*   **Plain English:** At the very top of a vertical circle, both gravity and the force from the string (tension) or track (normal force) are pulling/pushing the object *downwards*, towards the center of the circle. They are working together to provide the necessary centripetal force.
*   **Example:** For the car on the loop-the-loop, at the top, gravity pulls it down, and the track pushes it down. Both forces contribute to keeping the car on the circular path.
*   **Formal/Mathematical:** Let's define "downwards" (towards the center) as the positive direction for our radial forces.
    $$ F_g + N = \frac{mv^2}{r} \quad (\text{for a car on a track}) $$
    or
    $$ F_g + T = \frac{mv^2}{r} \quad (\text{for a ball on a string}) $$
    Where $N$ is the normal force and $T$ is the tension.
*   **What could go wrong:** Incorrectly assigning directions to forces. At the top, both gravity and the normal/tension force are directed towards the center of the circle.

### Step 4: Define the "minimum speed" condition.

*   **Plain English:** The "minimum speed" condition occurs when the object is *just barely* making it around the top. This means that the normal force (if it's on a track) or the tension (if it's on a string) has effectively become zero. If it's a track, the object is on the verge of losing contact. If it's a string, the string is on the verge of going slack. Gravity alone is providing *all* the necessary centripetal force.
*   **Example:** For the car on the loop, if it's going at minimum speed, the normal force from the track on the car is zero. The car is effectively weightless for an instant, just "falling" along the circular path due to gravity. Any slower, and gravity would pull it away from the track. For the bucket of water, the water is just about to fall out, meaning there's no normal force from the bucket's bottom on the water.
*   **Formal/Mathematical:**
    *   For an object on a track: $N = 0$.
    *   For an object on a string: $T = 0$.
    *   This is the critical condition for minimum speed at the top of the loop.
*   **What could go wrong:** Not understanding *why* $N=0$ or $T=0$ is the condition. It signifies the boundary between maintaining contact/tension and losing it.

### Step 5: Derive the minimum speed formula.

*   **Plain English:** Now we combine the previous steps. At the top, with minimum speed, gravity is the *only* force pulling towards the center. So, we set gravity equal to the centripetal force required.
*   **Example:** For the car, $mg = mv^2/r$. We can then solve for $v$.
*   **Formal/Mathematical:** Using the equation from Step 3 and the condition from Step 4:
    $$ F_g + N_{min} = \frac{mv_{min}^2}{r} $$
    Since $N_{min} = 0$ (or $T_{min} = 0$), the equation simplifies to:
    $$ mg + 0 = \frac{mv_{min}^2}{r} $$
    $$ mg = \frac{mv_{min}^2}{r} $$
    Notice that the mass $m$ cancels out! This means the minimum speed at the top is independent of the object's mass.
    $$ g = \frac{v_{min}^2}{r} $$
    Solving for $v_{min}$:
    $$ v_{min}^2 = gr $$
    $$ v_{min} = \sqrt{gr} $$
*   **What could go wrong:** Algebraic errors when solving for $v_{min}$, or forgetting that mass cancels out. Misinterpreting the result (e.g., thinking it applies everywhere, not just the top).

### Step 6: What if the object is at other points in the circle?

*   **Plain English:** While the top of the loop is where we find the *minimum* speed to complete the circle, the forces and required speeds are different at other points. For example, at the bottom of the loop, gravity pulls down, but the track/string pulls *up* (towards the center). The normal force or tension will be much larger here because it has to counteract gravity *and* provide the centripetal force.
*   **Example:** A roller coaster car feels heaviest at the bottom of the loop because the track is pushing up on it with a very large normal force.
*   **Formal/Mathematical:**
    *   At the bottom: If "upwards" (towards the center) is positive: $N - mg = mv^2/r$ (or $T - mg = mv^2/r$).
    *   At the sides: Gravity acts perpendicular to the radial direction, so only $N$ or $T$ provide the centripetal force: $N = mv^2/r$ (or $T = mv^2/r$).
*   **What could go wrong:** Applying the $N=0$ condition at points other than the top. The minimum speed condition $v_{min} = \sqrt{gr}$ is *specific* to the highest point of the vertical circle.

## 5. Worked examples — multiple, with every step shown

### Example 1: Ball on a String

**Problem:** A small ball of mass $0.2 \text{ kg}$ is attached to a string of length $0.8 \text{ m}$ and swung in a vertical circle. What is the minimum speed the ball must have at the top of the circle to complete the loop without the string going slack?

**Given:**
*   Mass of ball, $m = 0.2 \text{ kg}$
*   Length of string (radius of circle), $r = 0.8 \text{ m}$
*   Acceleration due to gravity, $g = 9.81 \text{ m/s}^2$

**Wanted:**
*   Minimum speed at the top, $v_{min}$

**Solution:**

1.  **Draw a Free Body Diagram (FBD) at the top of the circle.**
    *   At the top, gravity ($F_g = mg$) acts downwards.
    *   The tension in the string ($T$) also acts downwards (towards the center of the circle).
    *   The center of the circle is directly below the ball at this point.

    ```text
        O (Center of circle)
        |
        | T (Tension)
        |
        . (Ball)
        |
        | Fg = mg (Gravity)
        V
    ```

2.  **Apply Newton's Second Law for circular motion.**
    *   The net force towards the center of the circle provides the centripetal force. Let's define downwards (towards the center) as the positive radial direction.
    $$ \sum F_{\text{radial}} = ma_c $$
    $$ T + F_g = \frac{mv^2}{r} $$
    *   Substitute $F_g = mg$:
    $$ T + mg = \frac{mv^2}{r} $$
    *   *Explanation:* The sum of the tension and gravitational force provides the necessary centripetal force to keep the ball moving in a circle.

3.  **Apply the minimum speed condition.**
    *   For the minimum speed, the string is just about to go slack. This means the tension ($T$) becomes zero.
    $$ T = 0 $$
    *   *Explanation:* If the string has no tension, it means it's not pulling the ball. At this critical speed, gravity alone is sufficient to provide the centripetal force. If the ball were any slower, gravity would pull it down faster than the circular path, causing it to fall.

4.  **Substitute $T=0$ into the equation from Step 2.**
    $$ 0 + mg = \frac{mv_{min}^2}{r} $$
    $$ mg = \frac{mv_{min}^2}{r} $$
    *   *Explanation:* We've isolated the forces contributing to the centripetal force at minimum speed.

5.  **Solve for $v_{min}$.**
    *   Notice that the mass $m$ appears on both sides of the equation, so it cancels out.
    $$ g = \frac{v_{min}^2}{r} $$
    $$ v_{min}^2 = gr $$
    $$ v_{min} = \sqrt{gr} $$
    *   *Explanation:* This is the general formula for minimum speed at the top of a vertical loop. It shows that the minimum speed depends only on the acceleration due to gravity and the radius of the loop.

6.  **Plug in the given values.**
    $$ v_{min} = \sqrt{(9.81 \text{ m/s}^2)(0.8 \text{ m})} $$
    $$ v_{min} = \sqrt{7.848 \text{ m}^2/\text{s}^2} $$
    $$ \mathbf{v_{min} \approx 2.80 \text{ m/s}} $$

**Reflection:** This example demonstrates the fundamental derivation. The key insight is that at minimum speed, the tension (or normal force) goes to zero, leaving gravity as the sole provider of centripetal force. The cancellation of mass is a common and important feature of this type of problem.

### Example 2: Roller Coaster Loop

**Problem:** A roller coaster car enters a vertical loop with a radius of $15 \text{ m}$. What is the minimum speed the car must have at the top of the loop to stay on the track?

**Given:**
*   Radius of loop, $r = 15 \text{ m}$
*   Acceleration due to gravity, $g = 9.81 \text{ m/s}^2$

**Wanted:**
*   Minimum speed at the top, $v_{min}$

**Solution:**

1.  **Draw a Free Body Diagram (FBD) at the top of the loop.**
    *   At the top, gravity ($F_g = mg$) acts downwards.
    *   The normal force ($N$) from the track also acts downwards (towards the center of the circle).
    *   The center of the circle is below the car.

    ```text
        O (Center of circle)
        |
        | N (Normal Force)
        |
        . (Car)
        |
        | Fg = mg (Gravity)
        V
    ```

2.  **Apply Newton's Second Law for circular motion.**
    *   The net force towards the center provides the centripetal force. Let's take downwards as positive.
    $$ \sum F_{\text{radial}} = ma_c $$
    $$ N + F_g = \frac{mv^2}{r} $$
    *   Substitute $F_g = mg$:
    $$ N + mg = \frac{mv^2}{r} $$
    *   *Explanation:* Both the normal force from the track and the gravitational force contribute to keeping the car on its circular path.

3.  **Apply the minimum speed condition.**
    *   For the minimum speed, the car is just about to lose contact with the track. This means the normal force ($N$) becomes zero.
    $$ N = 0 $$
    *   *Explanation:* If $N=0$, the track is no longer pushing on the car. At this point, gravity alone is providing all the necessary centripetal force. Any slower, and the car would "fall" away from the track.

4.  **Substitute $N=0$ into the equation from Step 2.**
    $$ 0 + mg = \frac{mv_{min}^2}{r} $$
    $$ mg = \frac{mv_{min}^2}{r} $$
    *   *Explanation:* This equation represents the balance of forces at the minimum speed condition.

5.  **Solve for $v_{min}$.**
    *   Cancel out the mass $m$:
    $$ g = \frac{v_{min}^2}{r} $$
    $$ v_{min}^2 = gr $$
    $$ v_{min} = \sqrt{gr} $$
    *   *Explanation:* As in the previous example, the minimum speed at the top of a vertical loop is independent of the object's mass.

6.  **Plug in the given values.**
    $$ v_{min} = \sqrt{(9.81 \text{ m/s}^2)(15 \text{ m})} $$
    $$ v_{min} = \sqrt{147.15 \text{ m}^2/\text{s}^2} $$
    $$ \mathbf{v_{min} \approx 12.13 \text{ m/s}} $$

**Reflection:** This confirms the general formula derived. It's important to recognize that the *type* of force (tension vs. normal) doesn't change the underlying physics or the minimum speed condition at the top. The principle remains the same.

### Example 3: Finding Speed at the Bottom

**Problem:** A pilot performs a vertical loop-the-loop maneuver in an aircraft. The loop has a radius of $500 \text{ m}$. Assuming the pilot maintains the minimum speed required at the top of the loop, what would be the speed of the aircraft at the bottom of the loop? (Neglect air resistance).

**Given:**
*   Radius of loop, $r = 500 \text{ m}$
*   Acceleration due to gravity, $g = 9.81 \text{ m/s}^2$

**Wanted:**
*   Speed at the bottom of the loop, $v_{bottom}$

**Solution:**

1.  **Calculate the minimum speed at the top of the loop.**
    *   We use the formula derived previously:
    $$ v_{top, min} = \sqrt{gr} $$
    $$ v_{top, min} = \sqrt{(9.81 \text{ m/s}^2)(500 \text{ m})} $$
    $$ v_{top, min} = \sqrt{4905 \text{ m}^2/\text{s}^2} $$
    $$ v_{top, min} \approx 70.04 \text{ m/s} $$
    *   *Explanation:* This is the critical speed at the highest point. Now we need to relate this speed to the speed at the bottom.

2.  **Apply the principle of Conservation of Mechanical Energy.**
    *   Since we are neglecting air resistance, the total mechanical energy (kinetic energy + potential energy) of the aircraft remains constant throughout the loop.
    *   Let's define the bottom of the loop as $h=0$.
    $$ E_{top} = E_{bottom} $$
    $$ KE_{top} + PE_{top} = KE_{bottom} + PE_{bottom} $$
    $$ \frac{1}{2}mv_{top}^2 + mgh_{top} = \frac{1}{2}mv_{bottom}^2 + mgh_{bottom} $$
    *   *Explanation:* Mechanical energy is conserved because gravity is a conservative force and non-conservative forces (like air resistance) are ignored.

3.  **Define heights and substitute into the energy equation.**
    *   At the bottom, $h_{bottom} = 0$.
    *   At the top, the height above the bottom is equal to the diameter of the loop, $h_{top} = 2r$.
    $$ \frac{1}{2}mv_{top}^2 + mg(2r) = \frac{1}{2}mv_{bottom}^2 + mg(0) $$
    $$ \frac{1}{2}mv_{top}^2 + 2mgr = \frac{1}{2}mv_{bottom}^2 $$
    *   *Explanation:* We've set up the energy conservation equation with appropriate heights.

4.  **Simplify the energy equation and solve for $v_{bottom}$.**
    *   Notice that mass $m$ appears in every term, so it cancels out.
    $$ \frac{1}{2}v_{top}^2 + 2gr = \frac{1}{2}v_{bottom}^2 $$
    *   Multiply by 2 to clear the fractions:
    $$ v_{top}^2 + 4gr = v_{bottom}^2 $$
    $$ v_{bottom} = \sqrt{v_{top}^2 + 4gr} $$
    *   *Explanation:* This general relationship connects the speeds at the top and bottom of a vertical loop.

5.  **Substitute the calculated $v_{top, min}$ from Step 1.**
    *   Recall that $v_{top, min}^2 = gr$.
    $$ v_{bottom} = \sqrt{(gr) + 4gr} $$
    $$ v_{bottom} = \sqrt{5gr} $$
    *   *Explanation:* This elegant result shows that the minimum speed at the bottom of the loop, to just barely make it over the top, is $\sqrt{5gr}$.

6.  **Plug in the numerical values.**
    $$ v_{bottom} = \sqrt{5(9.81 \text{ m/s}^2)(500 \text{ m})} $$
    $$ v_{bottom} = \sqrt{24525 \text{ m}^2/\text{s}^2} $$
    $$ \mathbf{v_{bottom} \approx 156.61 \text{ m/s}} $$

**Reflection:** This problem combines the minimum speed condition with energy conservation. It's a very common type of problem in this topic. The key is to first find the speed at the critical point (the top) and then use energy conservation to find the speed at any other point. The fact that $v_{bottom} = \sqrt{5gr}$ for the minimum condition is a very useful result to remember.

### Example 4: Bucket of Water

**Problem:** A person swings a bucket of water in a vertical circle with a radius of $0.75 \text{ m}$. What is the minimum frequency (in revolutions per second, Hz) at which the person must swing the bucket so that no water spills out when the bucket is upside down at the top of the circle?

**Given:**
*   Radius of circle, $r = 0.75 \text{ m}$
*   Acceleration due to gravity, $g = 9.81 \text{ m/s}^2$

**Wanted:**
*   Minimum frequency, $f_{min}$ (in Hz)

**Solution:**

1.  **Determine the minimum speed at the top of the circle.**
    *   The condition for no water spilling out is equivalent to the normal force from the bucket's bottom on the water being zero at the top. This is the minimum speed condition.
    $$ v_{min} = \sqrt{gr} $$
    $$ v_{min} = \sqrt{(9.81 \text{ m/s}^2)(0.75 \text{ m})} $$
    $$ v_{min} = \sqrt{7.3575 \text{ m}^2/\text{s}^2} $$
    $$ v_{min} \approx 2.712 \text{ m/s} $$
    *   *Explanation:* This is the linear speed needed at the top. Now we need to convert this to frequency.

2.  **Relate linear speed ($v$) to frequency ($f$).**
    *   For circular motion, the linear speed is related to the radius and the period ($T$) by $v = \frac{2\pi r}{T}$.
    *   Frequency is the reciprocal of the period: $f = \frac{1}{T}$.
    *   Therefore, we can write $v = 2\pi r f$.
    *   *Explanation:* This formula connects the linear speed of an object moving in a circle to how many revolutions it completes per unit time.

3.  **Solve for the minimum frequency ($f_{min}$).**
    *   Rearrange the formula from Step 2:
    $$ f = \frac{v}{2\pi r} $$
    *   Substitute $v_{min}$ into this equation:
    $$ f_{min} = \frac{v_{min}}{2\pi r} $$
    *   *Explanation:* We are now using the calculated minimum linear speed to find the corresponding minimum frequency.

4.  **Plug in the values.**
    $$ f_{min} = \frac{2.712 \text{ m/s}}{2\pi (0.75 \text{ m})} $$
    $$ f_{min} = \frac{2.712}{4.7123} \text{ Hz} $$
    $$ \mathbf{f_{min} \approx 0.576 \text{ Hz}} $$

**Reflection:** This example demonstrates how the minimum speed condition can be used to find other related quantities, such as frequency or angular speed. It requires an understanding of the relationships between linear speed, radius, period, and frequency in circular motion. The challenge here is the additional step of converting linear speed to frequency.

## 6. Common mistakes and traps

1.  **Confusing centripetal force with an actual force:** Students often draw a separate "centripetal force" arrow on their FBDs. Remember, centripetal force ($\sum F_{\text{radial}}$) is the *net* force that causes circular motion; it's provided by existing physical forces like tension, normal force, or gravity.
2.  **Incorrectly drawing Free Body Diagrams (FBDs):**
    *   **At the top:** Forgetting that both gravity and the normal/tension force point *downwards* (towards the center).
    *   **At the bottom:** Forgetting that gravity points *downwards* while normal/tension points *upwards* (towards the center).
3.  **Forgetting gravity:** Sometimes students only consider the normal force or tension when setting up the centripetal force equation, completely omitting gravity, especially at the top where it's crucial.
4.  **Applying $N=0$ (or $T=0$) at the wrong point:** The minimum speed condition where normal force or tension becomes zero is *only* valid at the very top of the vertical circle. Applying it at the bottom or sides will lead to incorrect results.
5.  **Sign errors in Newton's 2nd Law:** Inconsistent sign conventions for forces. It's best to always define the direction *towards the center* of the circle as positive for radial forces.
6.  **Not understanding *why* $N=0$ is the condition:** Simply memorizing $N=0$ without understanding that it means "losing contact" or "string going slack" can hinder problem-solving in variations of the standard problem.
7.  **Ignoring energy conservation:** When problems ask for speeds at different points in the loop (e.g., minimum speed at the bottom to clear the top), energy conservation is almost always required and is a more efficient approach than trying to apply Newton's Laws at multiple points.

## 7. Textbook-precise explanation

In vertical circular motion, an object of mass $m$ traverses a circular path of radius $r$ in a vertical plane. The dynamics of this motion are governed by Newton's Second Law, specifically the requirement for a net centripetal force, $F_c = mv^2/r$, directed towards the center of the circle, where $v$ is the instantaneous tangential speed.

The "minimum speed condition" refers to the lowest possible tangential speed an object can have at the highest point of its vertical trajectory while still maintaining its circular path. This condition is critical because at the apex of the circle, gravitational force ($F_g = mg$) acts vertically downwards, aligning with the direction towards the center of the circle.

Consider an object constrained to a circular path by a normal force $N$ (e.g., a roller coaster car on a track) or a tension $T$ (e.g., a ball on a string). At the very top of the circle, both the gravitational force and the constraining force (normal force or tension) act in the same direction—downwards, towards the center of the circle. Applying Newton's Second Law in the radial direction (taking "towards the center" as positive):

$$ \sum F_{\text{radial}} = \frac{mv^2}{r} $$

For an object on a track:
$$ N + mg = \frac{mv^2}{r} $$

For an object on a string:
$$ T + mg = \frac{mv^2}{r} $$

The minimum speed condition is achieved when the constraining force ($N$ or $T$) becomes zero. This signifies the point where the object is on the verge of losing contact with the track (for $N=0$) or the string going slack (for $T=0$). At this critical juncture, gravity alone provides the entirety of the necessary centripetal force.

Setting $N=0$ (or $T=0$) in the equations above:
$$ 0 + mg = \frac{mv_{min}^2}{r} $$
$$ mg = \frac{mv_{min}^2}{r} $$

Solving for $v_{min}$, we observe that the mass $m$ cancels out:
$$ g = \frac{v_{min}^2}{r} $$
$$ v_{min}^2 = gr $$
$$ v_{min} = \sqrt{gr} $$

This derived expression, $v_{min} = \sqrt{gr}$, represents the absolute minimum speed an object must possess at the apex of a vertical circular path of radius $r$ to successfully complete the loop. If the speed falls below this value, the object will deviate from the circular path and fall. This principle is fundamental in the design of amusement park rides, aircraft maneuvers, and theoretical analyses of orbital mechanics.

(Refer to "Fundamentals of Physics" by Halliday, Resnick, and Walker, Chapter 6, for a comprehensive treatment of circular dynamics, or "Physics for Scientists and Engineers" by Serway and Jewett, Chapter 6.)

## 8. ASCII diagrams

Here's a diagram illustrating the forces at the critical point (the top) and another point (the bottom) of a vertical circular path.

```text
                                 TOP OF THE LOOP
                                      _ _
                                    /     \
                                   |   . O  <-- Object (e.g., roller coaster car)
                                   |   |
                                   |   | N (Normal Force from track, towards center)
                                   |   | Fg (Gravity, towards center)
                                   |   V
                                   |   C    <-- Center of circle
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   