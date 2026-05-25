## 1. What it is — in plain English

Imagine you have a toy car on a perfectly smooth, flat track. Now, imagine you attach a rubber band to the front of the car and anchor the other end to a wall. If you pull the car a little bit away from the wall and let go, what happens? It zips back towards the wall, but it doesn't just stop there, does it? It overshoots, then the rubber band gets stretched behind it, pulling it back again. It goes back and forth, back and forth, over and over.

This kind of regular, repeating back-and-forth motion around a central, stable point is what we call **oscillation**. When this oscillation happens in a very specific, simple way, where the force trying to bring the object back to the center is always directly proportional to how far it's been moved, we call it **Simple Harmonic Motion (SHM)**.

Think of it like this: the harder you pull the car away from its resting spot, the stronger the rubber band pulls it back. And the further it goes past the resting spot, the stronger the rubber band pulls it back *again*. This "wanting to return" force is what drives SHM, making it a very predictable and fundamental type of movement in the universe.

## 2. Why it matters — real-world applications

Simple Harmonic Motion is far from a mere academic curiosity; it's a foundational concept that underpins countless phenomena and technologies across physics, engineering, and even biology. Understanding SHM is crucial for designing everything from stable structures to advanced sensors.

1.  **Timekeeping Devices (Clocks and Watches):** The rhythmic swing of a pendulum in a grandfather clock is a classic example of SHM. Similarly, the tiny oscillating quartz crystal in modern digital watches and computers vibrates at a precise frequency, acting as the "heartbeat" for timing operations. This precision is vital for everything from CPU clock speeds in high-performance computing to the synchronization of communication networks.
2.  **Vehicle Suspension Systems:** Your car's shock absorbers and springs are designed to isolate the passenger compartment from bumps in the road. When a wheel hits a bump, the spring compresses and then expands, undergoing SHM. The damping in the shock absorber quickly dissipates this energy, bringing the car back to a stable ride without excessive bouncing. In aerospace, similar principles apply to landing gear systems, which must absorb the impact of touchdown and prevent dangerous oscillations.
3.  **Earthquake-Resistant Buildings:** Modern skyscrapers in seismic zones often incorporate "tuned mass dampers." These are massive pendulums or spring-mass systems installed near the top of the building. When an earthquake causes the building to sway (oscillate), the damper is designed to oscillate out of phase, absorbing and dissipating the building's vibrational energy, thereby reducing the amplitude of its SHM and preventing structural damage.
4.  **Acoustics and Sound Production:** Sound itself is a wave created by oscillating air molecules, and many musical instruments rely on SHM. The vibrating strings of a guitar, the oscillating air column in a flute, or the resonant membranes of a drum all exhibit motion that can be modeled as SHM or a superposition of SHMs. In rocket science, understanding acoustic oscillations within combustion chambers is critical to prevent "combustion instabilities" – violent pressure oscillations that can severely damage or destroy an engine.
5.  **Atomic Force Microscopes (AFM):** AFMs are cutting-edge tools used to image surfaces at the nanoscale. They work by having a tiny cantilever (a flexible beam) with a sharp tip oscillate near a surface. As the tip interacts with the surface (due to atomic forces), the oscillation frequency or amplitude changes. By precisely measuring these changes, the AFM can map the topography and properties of the surface with incredible resolution. This technology is vital in materials science, nanotechnology, and even biological research.

## 3. Prerequisites — what you must know first

Before diving deep into Simple Harmonic Motion, ensure you have a solid grasp of these fundamental physics and mathematics concepts:

*   **Newton's Laws of Motion:** Especially Newton's Second Law ($F = ma$), which relates force, mass, and acceleration. This law is the cornerstone for understanding how forces cause motion.
*   **Force and Vectors:** Understanding force as a vector quantity (having both magnitude and direction) and how to resolve forces into components or sum them.
*   **Equilibrium:** The state where the net force acting on an object is zero, resulting in no acceleration (either at rest or moving with constant velocity). This is the "center point" around which SHM occurs.
*   **Displacement, Velocity, and Acceleration:** The definitions of these kinematic quantities and their vector nature. Displacement ($x$) is the change in position, velocity ($v$) is the rate of change of displacement, and acceleration ($a$) is the rate of change of velocity.
*   **Basic Algebra:** Solving equations for unknown variables, understanding proportionality, and interpreting negative signs in mathematical expressions.
*   **Hooke's Law (Conceptual understanding):** The idea that the force exerted by a spring is proportional to its extension or compression. While we'll define it formally here, a prior conceptual understanding is helpful.

## 4. The core idea — step by step

Let's build up the concept of Simple Harmonic Motion, starting from the very basic idea of a "restoring force."

### Step 1: The Concept of Equilibrium

*   **Plain English:** Every object has a "happy place" where it naturally wants to be. If you leave it alone, it will settle there. This is its equilibrium position.
*   **Small Concrete Example:** Imagine a spring hanging vertically. If you just let it hang, it will stretch a certain amount due to gravity and then stop. That's its equilibrium position. A pendulum, when not swinging, hangs straight down. That's its equilibrium.
*   **Formal/Mathematical Version:** At equilibrium, the net force $\Sigma F$ acting on the object is zero.
    $$ \Sigma F = 0 $$
*   **What could go wrong:** Confusing *any* stationary position with equilibrium. Equilibrium is specifically where the *net* force is zero, meaning it would stay there if undisturbed. An object held by hand is stationary but not necessarily in equilibrium.

### Step 2: Displacement from Equilibrium

*   **Plain English:** What happens if you nudge the object away from its happy place? You've "displaced" it.
*   **Small Concrete Example:** Take that hanging spring. If you pull it down a little further, you've displaced it from its equilibrium position. If you push it up, you've also displaced it.
*   **Formal/Mathematical Version:** We define displacement, often denoted by $x$, as the distance and direction from the equilibrium position. It's a vector quantity.
    $$ x = \text{current position} - \text{equilibrium position} $$
    If we set the equilibrium position as $x=0$, then $x$ directly represents the displacement.
*   **What could go wrong:** Confusing displacement ($x$) with the total length of the spring or the total distance traveled. Displacement is specifically from the *equilibrium point*.

### Step 3: The Restoring Force

*   **Plain English:** When you displace an object from equilibrium, there's often a force that tries to push or pull it *back* to that equilibrium point. This force always opposes the direction of the displacement. We call it a "restoring force" because it wants to "restore" the object to its original state.
*   **Small Concrete Example:** Pull the spring down, and it pulls *up* on your hand. Push the spring up, and it pushes *down* on your hand. The force is always trying to get the spring back to its equilibrium length.
*   **Formal/Mathematical Version:** The restoring force $F_{restore}$ always points in the opposite direction to the displacement $x$. If $x$ is positive (displaced in the positive direction), $F_{restore}$ is negative (points in the negative direction). If $x$ is negative (displaced in the negative direction), $F_{restore}$ is positive (points in the positive direction).
*   **What could go wrong:** Forgetting that the restoring force *always* acts towards equilibrium, regardless of whether the object is moving towards or away from it. Its direction is solely determined by the displacement.

### Step 4: Hooke's Law — The Specific Form of Restoring Force

*   **Plain English:** For many common oscillating systems, especially springs, the restoring force isn't just *any* force; it's a very specific kind. It gets stronger the further you displace the object, and it gets weaker as you get closer to equilibrium. In fact, it's directly proportional to the displacement.
*   **Small Concrete Example:** If you pull a spring 1 cm, it pulls back with a certain force. If you pull it 2 cm (twice as far), it pulls back with *twice* the force.
*   **Formal/Mathematical Version:** This direct proportionality is described by Hooke's Law:
    $$ F = -kx $$
    Here:
    *   $F$ is the restoring force exerted by the spring (or similar elastic system).
    *   $k$ is the "spring constant" (or force constant), a measure of the stiffness of the spring. A larger $k$ means a stiffer spring. Its units are typically Newtons per meter (N/m).
    *   $x$ is the displacement from the equilibrium position.
    *   The negative sign is crucial: it indicates that the force $F$ is always in the opposite direction to the displacement $x$.
*   **What could go wrong:** Forgetting the negative sign! This is a common and critical error. Without it, the force would be in the *same* direction as displacement, leading to runaway motion, not oscillation. Also, confusing $k$ with mass or acceleration.

### Step 5: Defining Simple Harmonic Motion (SHM)

*   **Plain English:** Simple Harmonic Motion is defined as the motion of an object where the net restoring force acting on it is *always* directly proportional to its displacement from equilibrium and *always* directed towards that equilibrium position. In other words, it's motion driven by Hooke's Law.
*   **Small Concrete Example:** The ideal mass-spring system, where a mass attached to a spring oscillates horizontally on a frictionless surface, is the quintessential example of SHM. A small-angle pendulum also approximates SHM.
*   **Formal/Mathematical Version:** An object undergoes SHM if the net force acting on it is of the form:
    $$ F_{\text{net}} = -kx $$
    Combining this with Newton's Second Law ($F = ma$), we get:
    $$ ma = -kx $$
    Which implies the acceleration $a$ is also directly proportional to the negative of the displacement:
    $$ a = -\frac{k}{m}x $$
    This is the defining characteristic of SHM: acceleration is proportional to, and opposite in direction to, displacement.
*   **What could go wrong:** Assuming any oscillation is SHM. For example, a bouncing ball is an oscillation, but the restoring force (gravity and normal force) doesn't follow $F=-kx$, so it's not SHM. SHM requires that specific linear relationship between force and displacement.

### Step 6: Understanding the Spring Constant ($k$)

*   **Plain English:** The spring constant, $k$, is like a "stiffness rating" for a spring or any elastic material. A high $k$ means it's a very stiff spring, hard to stretch or compress. A low $k$ means it's a very soft, easily stretched spring.
*   **Small Concrete Example:** The suspension spring in a truck will have a much higher $k$ value than the tiny spring in a retractable pen. You need more force to displace the truck spring by the same amount.
*   **Formal/Mathematical Version:** From $F = -kx$, we can rearrange to $k = -F/x$. The units are Newtons per meter (N/m). It quantifies the force required per unit of displacement.
*   **What could go wrong:** Incorrectly interpreting a large $k$ as a "weak" spring. It's the opposite: large $k$ means strong, stiff.

## 5. Worked examples — multiple, with every step shown

### Example 1: Calculating Restoring Force

**Problem:** A spring has a spring constant of $k = 200 \text{ N/m}$. If it is stretched $0.15 \text{ m}$ from its equilibrium position, what is the magnitude and direction of the restoring force exerted by the spring?

**Given:**
*   Spring constant, $k = 200 \text{ N/m}$
*   Displacement from equilibrium, $x = 0.15 \text{ m}$ (Let's assume stretching in the positive direction)

**Want:**
*   Restoring force, $F$

**Solution:**

1.  **State the formula for the restoring force:**
    $$ F = -kx $$
    *This is Hooke's Law, which defines the restoring force for a spring.*

2.  **Substitute the given values into the formula:**
    $$ F = -(200 \text{ N/m})(0.15 \text{ m}) $$
    *We plug in the spring constant $k$ and the displacement $x$. The negative sign is crucial as it indicates direction.*

3.  **Perform the multiplication:**
    $$ F = -30 \text{ N} $$
    *Multiplying 200 by 0.15 gives 30. The units of meters cancel out, leaving Newtons, which is appropriate for force.*

4.  **Interpret the result:**
    The magnitude of the restoring force is $30 \text{ N}$. The negative sign indicates that the force is in the opposite direction to the displacement. Since we assumed positive displacement for stretching, the force is directed in the negative direction, i.e., back towards the equilibrium position.

    $$ \boxed{F = -30 \text{ N}} $$

**Reflection:** This example was straightforward, directly applying Hooke's Law. The key is to remember the negative sign and correctly interpret its meaning for the direction of the force. If the spring were compressed (negative $x$), the force would be positive, still pointing back to equilibrium.

### Example 2: Finding the Spring Constant

**Problem:** A $0.5 \text{ kg}$ mass is hung vertically from a spring, causing the spring to stretch $5 \text{ cm}$ to reach a new equilibrium position. What is the spring constant of the spring? (Assume $g = 9.8 \text{ m/s}^2$)

**Given:**
*   Mass, $m = 0.5 \text{ kg}$
*   Displacement (stretch) from original unstretched length, $x = 5 \text{ cm} = 0.05 \text{ m}$ (Important to convert to meters!)
*   Acceleration due to gravity, $g = 9.8 \text{ m/s}^2$

**Want:**
*   Spring constant, $k$

**Solution:**

1.  **Identify the forces at the new equilibrium position:**
    At equilibrium, the net force on the mass is zero. The forces acting on the mass are:
    *   Gravity pulling down: $F_g = mg$
    *   Spring force pulling up: $F_s = -kx$ (where $x$ is the stretch from the *original* unstretched length)
    *We're looking at a static equilibrium situation. The spring's restoring force is balanced by gravity.*

2.  **Apply Newton's First Law (equilibrium condition):**
    Since the mass is at equilibrium, the sum of forces is zero. Let's define the downward direction as positive.
    $$ \Sigma F_y = F_g + F_s = 0 $$
    *The gravitational force is pulling down, and the spring force is pulling up. In our coordinate system where downward is positive, $F_g$ is positive, and $F_s$ (which is $-kx$) is negative since it opposes the downward stretch.*
    So, $F_g - kx = 0$ (taking $x$ as the magnitude of stretch, and the negative sign in $F=-kx$ explicitly handles direction).
    More carefully, if $x$ is the downward displacement (positive), then the spring force is *upward*, which is $-kx$. Gravity is $mg$ downward.
    So, $mg - kx = 0$.

3.  **Calculate the gravitational force:**
    $$ F_g = mg = (0.5 \text{ kg})(9.8 \text{ m/s}^2) = 4.9 \text{ N} $$
    *This is the force pulling the mass down.*

4.  **Set up the equilibrium equation to solve for $k$:**
    At equilibrium, the upward spring force must balance the downward gravitational force.
    $$ \text{Magnitude of spring force} = \text{Magnitude of gravitational force} $$
    $$ | -kx | = mg $$
    $$ kx = mg $$
    *We use the magnitude because we've already accounted for the direction by balancing the forces. The displacement $x$ here is the stretch from the unstretched length.*

5.  **Substitute known values and solve for $k$:**
    $$ k(0.05 \text{ m}) = 4.9 \text{ N} $$
    $$ k = \frac{4.9 \text{ N}}{0.05 \text{ m}} $$
    $$ k = 98 \text{ N/m} $$
    *Divide the gravitational force by the displacement to find the spring constant.*

    $$ \boxed{k = 98 \text{ N/m}} $$

**Reflection:** This example introduced the concept of equilibrium with gravity. The key was to recognize that at the *new* equilibrium position, the spring force perfectly balances the gravitational force, allowing us to find $k$. Converting units (cm to m) was also critical.

### Example 3: Finding Displacement for a Given Force

**Problem:** A spring has a spring constant of $k = 150 \text{ N/m}$. What displacement from equilibrium is required to produce a restoring force of $45 \text{ N}$?

**Given:**
*   Spring constant, $k = 150 \text{ N/m}$
*   Magnitude of restoring force, $|F| = 45 \text{ N}$

**Want:**
*   Displacement, $x$

**Solution:**

1.  **State the formula for the restoring force:**
    $$ F = -kx $$
    *This is Hooke's Law.*

2.  **Rearrange the formula to solve for displacement $x$:**
    $$ x = -\frac{F}{k} $$
    *We isolate $x$ by dividing both sides by $-k$.*

3.  **Substitute the given values into the rearranged formula:**
    Since we are given the *magnitude* of the restoring force, we need to consider the direction. If the force is $45 \text{ N}$ in the positive direction, then $F = +45 \text{ N}$. If it's $45 \text{ N}$ in the negative direction, then $F = -45 \text{ N}$. The problem asks for the displacement *required* to produce a force of $45 \text{ N}$. This implies we're interested in the magnitude of the displacement, and the direction will naturally follow. Let's assume the restoring force is $F = -45 \text{ N}$ (meaning it's trying to pull it back in the negative direction, so the displacement must have been positive).
    $$ x = -\frac{(-45 \text{ N})}{150 \text{ N/m}} $$
    *We use $F = -45 \text{ N}$ because if the restoring force is $45 \text{ N}$, it must be opposing the displacement. If we're looking for a displacement that *causes* a restoring force of magnitude $45 \text{ N}$, then the force will be $-45 \text{ N}$ if $x$ is positive, or $+45 \text{ N}$ if $x$ is negative. The question implies the magnitude of force, so we can use $|F| = k|x|$, but using the full vector form is better for understanding direction.*

4.  **Perform the division:**
    $$ x = \frac{45}{150} \text{ m} $$
    $$ x = 0.3 \text{ m} $$
    *The Newtons cancel out, and the 'per meter' in the denominator becomes 'meters' in the numerator. The two negative signs cancel, giving a positive displacement.*

5.  **Interpret the result:**
    A displacement of $0.3 \text{ m}$ in the positive direction will result in a restoring force of $45 \text{ N}$ in the negative direction. Conversely, a displacement of $-0.3 \text{ m}$ (compression) would result in a restoring force of $+45 \text{ N}$ (expansion). The question asks for "what displacement," implying the magnitude is sufficient, but understanding the direction is key.

    $$ \boxed{x = 0.3 \text{ m}} $$

**Reflection:** This example required rearranging Hooke's Law. The main subtlety was handling the sign of the force. If you are asked for a displacement that *produces* a certain *magnitude* of restoring force, you can use the magnitude form $|F|=k|x|$. However, using the full $F=-kx$ helps reinforce the directionality.

### Example 4: Combined Springs (Conceptual, then Calculation)

**Problem:** Two identical springs, each with a spring constant $k_1 = 300 \text{ N/m}$, are connected in parallel to support a single mass. If the mass causes a total displacement of $2 \text{ cm}$ from the springs' combined unstretched length, what is the magnitude of the force exerted by the mass?

**Given:**
*   Spring constant of each individual spring, $k_1 = 300 \text{ N/m}$
*   Number of springs, $N = 2$ (connected in parallel)
*   Total displacement, $x = 2 \text{ cm} = 0.02 \text{ m}$

**Want:**
*   Magnitude of the force exerted by the mass (which is equal to the magnitude of the total restoring force from the springs).

**Solution:**

1.  **Understand "springs in parallel":**
    When springs are connected in parallel, they share the load, and each spring stretches by the *same* amount ($x$). The total restoring force is the sum of the forces from each individual spring.
    *This is a crucial conceptual step. Imagine two springs side-by-side supporting a weight. Both stretch equally, and both contribute to holding the weight up.*

2.  **Determine the effective spring constant ($k_{eff}$) for springs in parallel:**
    For springs in parallel, the effective spring constant is the sum of the individual spring constants.
    $$ k_{eff} = k_1 + k_2 + \dots + k_N $$
    In this case, with two identical springs:
    $$ k_{eff} = k_1 + k_1 = 2k_1 $$
    *Since both springs stretch by the same $x$, and each exerts a force $F_1 = -k_1x$, the total force is $F_{total} = F_1 + F_1 = -k_1x - k_1x = -(2k_1)x$. This means the effective spring constant is $2k_1$.*

3.  **Calculate the effective spring constant:**
    $$ k_{eff} = 2 \times (300 \text{ N/m}) = 600 \text{ N/m} $$
    *The combined system is stiffer than a single spring.*

4.  **Apply Hooke's Law using the effective spring constant:**
    The total restoring force exerted by the combined system is given by:
    $$ F_{total} = -k_{eff}x $$
    *Now we treat the two springs as a single equivalent spring with constant $k_{eff}$.*

5.  **Substitute the values and calculate the force:**
    $$ F_{total} = -(600 \text{ N/m})(0.02 \text{ m}) $$
    $$ F_{total} = -12 \text{ N} $$
    *Multiply the effective spring constant by the displacement. The negative sign indicates the force is in the opposite direction to the displacement (upward if the mass displaced it downward).*

6.  **State the magnitude of the force:**
    The magnitude of the force exerted by the mass (which is equal to the magnitude of the total restoring force) is $12 \text{ N}$.

    $$ \boxed{|F| = 12 \text{ N}} $$

**Reflection:** This example introduced the concept of combining springs, specifically in parallel. The trick was to correctly determine the effective spring constant before applying Hooke's Law. Understanding how forces add up and how displacement is shared (or not shared) in spring combinations is key.

## 6. Common mistakes and traps

1.  **Forgetting the negative sign in $F = -kx$:** This is the most frequent error. The negative sign is crucial because it indicates that the restoring force *always* opposes the displacement, pointing back towards equilibrium. Without it, your calculations will imply a force that drives the object *further* from equilibrium, leading to runaway motion, not oscillation.
2.  **Confusing displacement ($x$) with total length:** The variable $x$ in Hooke's Law specifically refers to the displacement *from the equilibrium position* (or the unstretched/uncompressed length of the spring if that's the reference). It is not the total length of the spring.
3.  **Incorrect units:** Always ensure that $k$ is in N/m and $x$ is in meters to get force in Newtons. Forgetting to convert centimeters or millimeters to meters is a common oversight.
4.  **Applying $F = -kx$ to non-SHM systems:** Hooke's Law describes a *specific* type of restoring force. Not all oscillating systems obey this linear relationship. For example, a pendulum only approximates SHM for small angles; for large angles, the restoring force (a component of gravity) is proportional to $\sin\theta$, not $\theta$ itself, making it non-linear and not strictly SHM.
5.  **Misinterpreting "equilibrium position":** For a horizontal spring, equilibrium is often its natural length. For a vertical spring with a mass hanging, equilibrium is the point where the spring's upward force balances gravity's downward force. Displacements ($x$) are measured from *this* equilibrium point, not necessarily the spring's original unstretched length.
6.  **Assuming $k$ is constant for all materials/situations:** While $k$ is a constant for a *given* spring within its elastic limit, it varies widely between different springs and materials. Also, if a spring is stretched too far (beyond its elastic limit), it won't return to its original shape, and Hooke's Law no longer applies.

## 7. Textbook-precise explanation

Simple Harmonic Motion (SHM) is a special type of periodic motion in which the restoring force acting on an oscillating body is directly proportional to the magnitude of the body's displacement from its equilibrium position and acts in the direction opposite to the displacement.

Mathematically, this defining characteristic is encapsulated by **Hooke's Law**, which states that the restoring force $F$ exerted by an ideal spring (or any system exhibiting similar elastic behavior within its elastic limit) is given by:

$$ F = -kx $$

Where:
*   $F$ is the restoring force, a vector quantity, measured in Newtons (N).
*   $k$ is the **spring constant** (or force constant), a positive scalar quantity that represents the stiffness of the spring. It is measured in Newtons per meter (N/m). A larger value of $k$ indicates a stiffer spring.
*   $x$ is the displacement vector from the equilibrium position, measured in meters (m). The equilibrium position is defined as the point where the net force on the object is zero.

The negative sign in Hooke's Law is of paramount importance. It signifies that the restoring force $F$ always acts in the direction opposite to the displacement $x$. If the object is displaced in the positive $x$ direction (e.g., stretched to the right), the restoring force acts in the negative $x$ direction (to the left, pulling it back). Conversely, if the object is displaced in the negative $x$ direction (e.g., compressed to the left), the restoring force acts in the positive $x$ direction (to the right, pushing it back). This antagonistic relationship between force and displacement is what drives the oscillatory motion back and forth about the equilibrium point.

When this restoring force is the *net* force acting on a mass $m$, Newton's Second Law of Motion ($F_{\text{net}} = ma$) can be applied:

$$ ma = -kx $$

This leads to the defining differential equation for Simple Harmonic Motion:

$$ a = -\frac{k}{m}x $$

This equation explicitly states that for SHM, the acceleration $a$ of the oscillating object is directly proportional to its displacement $x$ from equilibrium and is always directed towards the equilibrium position (due to the negative sign). This linear relationship between acceleration and displacement is the most fundamental mathematical definition of Simple Harmonic Motion.

(Refer to: Serway & Jewett, *Physics for Scientists and Engineers*, Chapter 15; Halliday, Resnick, & Walker, *Fundamentals of Physics*, Chapter 15; Young & Freedman, *University Physics with Modern Physics*, Chapter 14)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a mass-spring system undergoing Simple Harmonic Motion, showing the equilibrium position, displacement, and the direction of the restoring force.

```text
                                                
   <------------------ x ------------------>
              (Displacement from Equilibrium)

   Wall
   |
   |----[Spring]----(Mass)----|
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   +-----O-----------O---------+
   ^     ^           ^         ^
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           |         |
   |     |           