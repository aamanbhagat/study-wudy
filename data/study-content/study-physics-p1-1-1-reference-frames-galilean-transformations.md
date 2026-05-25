## 1. What it is — in plain English

Imagine you're sitting on a train that's moving smoothly and at a constant speed. You toss a ball straight up in the air, and it comes straight back down into your hand. From your point of view inside the train, it looks like the ball just went up and down.

Now, imagine someone is standing on the ground, watching the train go by through a window. To them, when you toss the ball, it doesn't just go straight up and down. It also moves forward with the train. So, the ground observer sees the ball travel in a curved path, like a parabola, while still moving forward.

"Reference frames" are simply different "points of view" or "coordinate systems" from which we measure things like position, speed, and acceleration. Your seat on the train is one reference frame, and the ground outside is another. A "Galilean transformation" is the mathematical rule that tells us how to switch our measurements from one point of view to another, especially when one point of view is moving at a constant speed relative to the other. It's like having a translation dictionary for measurements between different observers.

The key idea is that even though the *numbers* for position and velocity might change depending on your reference frame, the *laws of physics* (like how forces cause acceleration) remain the same. This means that if you perform an experiment on the train, you'll get the same fundamental results as someone performing the same experiment on the ground, as long as the train isn't speeding up, slowing down, or turning.

## 2. Why it matters — real-world applications

Understanding reference frames and Galilean transformations is fundamental to classical physics and engineering, especially in scenarios involving relative motion.

1.  **Air Traffic Control & Missile Guidance:** When an air traffic controller tracks an airplane, they are observing its motion relative to the ground (their reference frame). However, the plane's own navigation system might be tracking other aircraft relative to itself. Galilean transformations allow us to convert the plane's velocity relative to the ground into its velocity relative to another plane, which is crucial for collision avoidance systems. Similarly, for a missile intercepting a target, the missile's guidance system needs to calculate the target's relative velocity and position to predict an intercept course.
2.  **GPS and Satellite Navigation:** GPS satellites orbit the Earth at high speeds. Your car, equipped with a GPS receiver, is moving on the Earth's surface. The satellite's position and velocity are known in an Earth-Centered, Earth-Fixed (ECEF) reference frame. Your car's position and velocity are measured relative to the ground. To calculate your precise location, the GPS receiver must account for the relative motion between the satellite, the Earth's rotation, and your car. While GPS uses more advanced relativistic corrections due to high speeds, the classical framework of relative motion (Galilean transformations) is the foundational concept.
3.  **Robotics and Autonomous Vehicles (e.g., Self-Driving Cars):** A self-driving car needs to understand the motion of other vehicles, pedestrians, and obstacles. Its sensors (cameras, LiDAR, radar) measure the relative positions and velocities of these objects *with respect to the car itself*. To make safe decisions, the car's computer then transforms these relative measurements into a common "world" reference frame (e.g., relative to the road or a fixed map coordinate system) and also predicts how these objects will move relative to the car in the future. This continuous transformation and prediction are essential for path planning and collision avoidance.
4.  **Sports Analysis:** In sports like baseball or soccer, analysts often study the trajectory of a ball. A pitcher throws a baseball at a certain speed relative to the mound. A batter, who is also moving (e.g., swinging), needs to perceive the ball's speed and trajectory relative to their own body to hit it. Understanding how the ball's motion appears differently to the pitcher, the batter, and a stationary camera helps in optimizing player performance and designing training programs.
5.  **Everyday Examples (Boats, Airplanes in Wind):** A boat captain needs to know their speed relative to the water, but also their speed relative to the ground (which is affected by river currents). An airplane pilot needs to know their airspeed (speed relative to the air) to generate lift, but also their ground speed (speed relative to the ground) to know when they'll arrive at their destination, accounting for wind velocity. These are direct applications of relative velocity, which is the heart of Galilean transformations.

## 3. Prerequisites — what you must know first

Before diving deep into Galilean transformations, ensure you have a solid grasp of these foundational concepts:

*   **Scalars & Vectors:** Understand the difference between quantities that only have magnitude (scalars, like mass or temperature) and quantities that have both magnitude and direction (vectors, like displacement, velocity, force).
*   **Position, Displacement, Velocity, Acceleration:** Know the precise definitions of these kinematic quantities and their vector nature. Position is location, displacement is change in position, velocity is rate of change of position, and acceleration is rate of change of velocity.
*   **Relative Velocity:** Be comfortable with the concept that velocity is always measured *relative to* something, and how to add or subtract velocities to find relative velocities (e.g., if you walk on a moving walkway, your speed relative to the ground is your speed relative to the walkway plus the walkway's speed relative to the ground).
*   **Coordinate Systems:** Familiarity with Cartesian coordinate systems (x, y, z axes) and how to represent points and vectors within them.
*   **Basic Algebra:** Ability to solve linear equations and perform vector addition and subtraction.

## 4. The core idea — step by step

Let's break down the concept of Galilean transformations slowly, building intuition with each step.

### Step 1: The Concept of a Reference Frame

*   **Plain English Statement:** A reference frame is simply your chosen "point of view" or "observatory" from which you make all your physical measurements. It's like setting up a fixed camera and a clock, and everything you measure is relative to that camera's position and orientation.
*   **Concrete Example:** If you are standing on the ground watching a car drive by, the ground beneath your feet (with its coordinate axes and your watch) is your reference frame. If you are *inside* the car, the car itself (with its own internal coordinate axes and your watch) is your reference frame.
*   **Formal/Mathematical Version:** A reference frame, often denoted by $S$ or $S'$, is defined by an origin point $\vec{O}$ (or $\vec{O}'$) and a set of orthogonal coordinate axes (e.g., $x, y, z$ or $x', y', z'$), along with a synchronized clock. A position vector $\vec{r}$ (or $\vec{r}'$) specifies the location of a point $P$ relative to the origin of that frame.
*   **What Could Go Wrong:** Confusing a reference frame with an object. The frame is the *system* you use for measurement, not the object being measured itself. An object can be measured *within* a frame.

### Step 2: Inertial Reference Frames

*   **Plain English Statement:** An inertial reference frame is a special kind of reference frame that is either standing perfectly still or moving at a perfectly constant velocity (no speeding up, slowing down, or turning). In such a frame, if nothing is pushing or pulling on an object, that object will either stay still or keep moving in a straight line at a constant speed. There are no "fake" or "fictitious" forces in an inertial frame.
*   **Concrete Example:** A smooth-riding train moving at a steady 100 km/h in a straight line is a good approximation of an inertial frame. If you drop a ball, it falls straight down. A train that is braking hard or rounding a sharp curve is *not* an inertial frame; if you drop a ball, it might fly forward or sideways due to the train's acceleration (which feels like a "fictitious" force to you inside).
*   **Formal/Mathematical Version:** An inertial reference frame is one in which Newton's First Law of Motion holds true. That is, an object at rest remains at rest, and an object in motion continues in motion with constant velocity (constant speed and direction) unless acted upon by a net external force. Mathematically, in an inertial frame, $\sum \vec{F} = m\vec{a}$ holds, and if $\sum \vec{F} = 0$, then $\vec{a} = 0$.
*   **What Could Go Wrong:** Incorrectly assuming that *all* reference frames are inertial. This is a common mistake that leads to incorrect application of Newton's laws. The Earth itself is technically not perfectly inertial due to its rotation and orbit, but for many everyday problems, it's a very good approximation.

### Step 3: Relative Position (Galilean Position Transformation)

*   **Plain English Statement:** If you know an object's location from one point of view, and you know how your point of view is moving relative to another point of view, you can figure out the object's location from that second point of view. It's like converting coordinates based on a moving origin.
*   **Concrete Example:** Imagine you are standing on the ground (frame $S$). A train (frame $S'$) passes you, moving at a constant velocity $\vec{V}$ in the $+x$ direction. At $t=0$, the front of the train (origin of $S'$) is exactly where you are (origin of $S$). If an object $P$ is at $x_P = 5$ meters inside the train (relative to the train's front), and the train has moved 10 meters ($V \times t = 10$) since $t=0$, then relative to you on the ground, the object $P$ is at $x_P = 5 + 10 = 15$ meters.
*   **Formal/Mathematical Version:** Let frame $S'$ move with a constant velocity $\vec{V}$ relative to frame $S$. Assume their origins coincide at time $t=0$. The position vector $\vec{r}$ of a point $P$ in frame $S$ is related to its position vector $\vec{r}'$ in frame $S'$ by:
    $$ \vec{r} = \vec{r}' + \vec{V}t $$
    Or, equivalently, if we want the position in $S'$ given the position in $S$:
    $$ \vec{r}' = \vec{r} - \vec{V}t $$
    In component form (for 1D motion along x-axis, with $\vec{V} = V\hat{i}$):
    $$ x' = x - Vt $$
    $$ y' = y $$
    $$ z' = z $$
    (Note: The $y$ and $z$ coordinates are unchanged if the relative motion is only along the $x$-axis and the axes are parallel).
*   **What Could Go Wrong:** Forgetting the time dependence ($\vec{V}t$). The relative displacement between the origins of the two frames changes with time. Also, make sure to consistently define $\vec{V}$ as the velocity of $S'$ relative to $S$.

### Step 4: Relative Velocity (Galilean Velocity Transformation)

*   **Plain English Statement:** The speed and direction of an object will appear different to observers in different reference frames if those frames are moving relative to each other. To find an object's velocity in one frame, you subtract the velocity of that frame from the object's velocity in the other frame.
*   **Concrete Example:** You are on a train moving at 20 m/s East (relative to the ground). You walk towards the front of the train at 2 m/s (relative to the train). To someone on the ground, your velocity is $20 \text{ m/s East} + 2 \text{ m/s East} = 22 \text{ m/s East}$. If you walk towards the back of the train at 2 m/s, your velocity relative to the ground is $20 \text{ m/s East} - 2 \text{ m/s East} = 18 \text{ m/s East}$.
*   **Formal/Mathematical Version:** We can derive this by differentiating the position transformation equation with respect to time.
    Starting from $\vec{r}' = \vec{r} - \vec{V}t$:
    $$ \frac{d\vec{r}'}{dt} = \frac{d\vec{r}}{dt} - \frac{d}{dt}(\vec{V}t) $$
    Since $\vec{V}$ is a constant vector (velocity of $S'$ relative to $S$ is constant for Galilean transformations):
    $$ \vec{v}' = \vec{v} - \vec{V} $$
    Here, $\vec{v}'$ is the velocity of the object in frame $S'$, and $\vec{v}$ is the velocity of the object in frame $S$.
    In component form (for 1D motion along x-axis):
    $$ v_x' = v_x - V_x $$
    $$ v_y' = v_y - V_y $$
    $$ v_z' = v_z - V_z $$
*   **What Could Go Wrong:** Incorrectly adding instead of subtracting, or vice-versa. Always remember the "Prime minus Frame" rule: velocity in the *primed* frame equals velocity in the *unprimed* frame *minus* the velocity of the primed frame relative to the unprimed frame. Also, forgetting that velocity is a vector and requires proper vector addition/subtraction, considering directions.

### Step 5: Relative Acceleration (Galilean Acceleration Transformation)

*   **Plain English Statement:** If you are in an inertial reference frame (moving at a constant velocity), any acceleration you measure for an object will be exactly the same as the acceleration measured by another observer in *their* inertial reference frame. The acceleration of an object is invariant between inertial frames.
*   **Concrete Example:** You're on that smooth-riding train moving at 20 m/s East. You drop a ball, and it accelerates downwards at $9.8 \text{ m/s}^2$ due to gravity (relative to the train). Someone on the ground also observes the ball accelerating downwards at $9.8 \text{ m/s}^2$ (relative to the ground). Even though its *velocity* is different (it has a horizontal component for the ground observer), its *rate of change of velocity* in the vertical direction is the same.
*   **Formal/Mathematical Version:** We derive this by differentiating the velocity transformation equation with respect to time.
    Starting from $\vec{v}' = \vec{v} - \vec{V}$:
    $$ \frac{d\vec{v}'}{dt} = \frac{d\vec{v}}{dt} - \frac{d\vec{V}}{dt} $$
    Since $\vec{V}$ is the *constant* velocity of the relative motion between the two inertial frames, its derivative with respect to time is zero ($\frac{d\vec{V}}{dt} = 0$).
    Therefore:
    $$ \vec{a}' = \vec{a} $$
    Here, $\vec{a}'$ is the acceleration of the object in frame $S'$, and $\vec{a}$ is the acceleration of the object in frame $S$.
*   **What Could Go Wrong:** Applying this to non-inertial frames. If the relative velocity $\vec{V}$ is *not* constant (i.e., one frame is accelerating relative to the other), then $\frac{d\vec{V}}{dt} \neq 0$, and $\vec{a}'$ would *not* equal $\vec{a}$. This is a crucial distinction.

### Step 6: The Invariance of Newton's Laws

*   **Plain English Statement:** Because acceleration is the same in all inertial reference frames, and mass is also the same, it means that Newton's Second Law ($\vec{F} = m\vec{a}$) holds true in *all* inertial frames. If you measure a force and an acceleration in one inertial frame, another observer in a different inertial frame (moving at constant velocity relative to yours) will measure the *same* force and the *same* acceleration, leading to the same physical law.
*   **Concrete Example:** If you push a cart with a certain force $\vec{F}$ on the train, and it accelerates at $\vec{a}$ (relative to the train), then $\vec{F} = m\vec{a}$. An observer on the ground, seeing the train move at constant velocity, will observe the *same* acceleration $\vec{a}$ for the cart. Since mass $m$ is also invariant, they will conclude the *same* force $\vec{F}$ was applied. The fundamental physics is the same for both observers.
*   **Formal/Mathematical Version:** Given $\vec{a}' = \vec{a}$ and assuming mass $m$ is invariant (which it is in classical mechanics), then if Newton's Second Law holds in frame $S$:
    $$ \vec{F} = m\vec{a} $$
    It must also hold in frame $S'$:
    $$ \vec{F}' = m\vec{a}' $$
    Since $\vec{a}' = \vec{a}$, this implies $\vec{F}' = \vec{F}$. This is known as the **Principle of Galilean Invariance** or **Galilean Relativity**: the laws of mechanics are the same in all inertial reference frames.
*   **What Could Go Wrong:** Thinking that *all* physical quantities are invariant. Position and velocity are frame-dependent, but acceleration, mass, time intervals, and forces are invariant under Galilean transformations.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy - Walking on a Train

**Problem:** A train is moving East at a constant speed of $25 \text{ m/s}$ relative to the ground. A passenger on the train walks towards the front of the train at $1.5 \text{ m/s}$ relative to the train. What is the passenger's velocity relative to the ground?

**Given:**
*   Velocity of train (frame $S'$) relative to ground (frame $S$): $\vec{V} = +25 \text{ m/s}$ (East)
*   Velocity of passenger (object) relative to train (frame $S'$): $\vec{v}' = +1.5 \text{ m/s}$ (East)

**Want:**
*   Velocity of passenger (object) relative to ground (frame $S$): $\vec{v}$

**Solution:**

We use the Galilean velocity transformation: $\vec{v}' = \vec{v} - \vec{V}$. We want to find $\vec{v}$, so we rearrange the equation:
$$ \vec{v} = \vec{v}' + \vec{V} $$
Let's define East as the positive direction.

1.  **Identify the frames and velocities:**
    *   Frame $S$: Ground frame.
    *   Frame $S'$: Train frame.
    *   $\vec{V}$: Velocity of $S'$ relative to $S$.
    *   $\vec{v}'$: Velocity of the passenger relative to $S'$.
    *   $\vec{v}$: Velocity of the passenger relative to $S$.
    *This step clarifies what each variable represents in the context of the problem.*

2.  **Substitute the given values into the equation:**
    $$ \vec{v} = (+1.5 \text{ m/s}) + (+25 \text{ m/s}) $$
    *We are adding two velocities that are in the same direction (East), so we simply add their magnitudes.*

3.  **Calculate the result:**
    $$ \vec{v} = 26.5 \text{ m/s} $$
    *Performing the simple addition.*

4.  **State the final answer with direction:**
    The passenger's velocity relative to the ground is $\boxed{\text{26.5 m/s East}}$.
    *Always include the direction for vector quantities.*

**Reflection:** This example was straightforward because all motion was along a single dimension, making vector addition simple. The key was correctly identifying which velocity was relative to which frame.

### Example 2: Medium - Boat Crossing a River

**Problem:** A boat can travel at $8.0 \text{ km/h}$ relative to the water. The river current flows East at $3.0 \text{ km/h}$ relative to the ground. The boat captain wants to travel directly North across the river.
a) In what direction must the boat head (relative to the water)?
b) What is the boat's speed relative to the ground?

**Given:**
*   Speed of boat relative to water: $|\vec{v}_{BW}| = 8.0 \text{ km/h}$
*   Velocity of water relative to ground: $\vec{v}_{WG} = 3.0 \text{ km/h East}$
*   Desired direction of boat relative to ground: $\vec{v}_{BG}$ is North.

**Want:**
*   a) Direction of $\vec{v}_{BW}$ (boat relative to water)
*   b) Speed of boat relative to ground: $|\vec{v}_{BG}|$

**Solution:**

Let's use subscripts: $B$ for boat, $W$ for water, $G$ for ground.
The general relative velocity equation is $\vec{v}_{AG} = \vec{v}_{AW} + \vec{v}_{WG}$, where $A$ is an object, $W$ is the moving medium (water), and $G$ is the stationary frame (ground).
So, for our boat:
$$ \vec{v}_{BG} = \vec{v}_{BW} + \vec{v}_{WG} $$
This means the velocity of the boat relative to the ground is the vector sum of the boat's velocity relative to the water and the water's velocity relative to the ground.

Let North be the $+y$ direction and East be the $+x$ direction.

1.  **Visualize the vectors and set up the coordinate system:**
    *   $\vec{v}_{WG}$ is purely in the $+x$ direction ($3.0 \hat{i}$).
    *   $\vec{v}_{BG}$ is purely in the $+y$ direction ($|\vec{v}_{BG}| \hat{j}$).
    *   $\vec{v}_{BW}$ has both $x$ and $y$ components, and its magnitude is $8.0 \text{ km/h}$.
    *This helps us understand the vector addition geometrically.*

2.  **Write the vector equation in components:**
    $$ \vec{v}_{BG} = v_{BG,x}\hat{i} + v_{BG,y}\hat{j} $$
    $$ \vec{v}_{BW} = v_{BW,x}\hat{i} + v_{BW,y}\hat{j} $$
    $$ \vec{v}_{WG} = v_{WG,x}\hat{i} + v_{WG,y}\hat{j} $$
    Substituting into $\vec{v}_{BG} = \vec{v}_{BW} + \vec{v}_{WG}$:
    $$ v_{BG,x}\hat{i} + v_{BG,y}\hat{j} = (v_{BW,x}\hat{i} + v_{BW,y}\hat{j}) + (v_{WG,x}\hat{i} + v_{WG,y}\hat{j}) $$
    *Breaking down the vector equation into its orthogonal components allows us to solve for each dimension independently.*

3.  **Substitute known values for components:**
    *   We know $\vec{v}_{BG}$ is North, so $v_{BG,x} = 0$.
    *   We know $\vec{v}_{WG} = 3.0 \text{ km/h East}$, so $v_{WG,x} = 3.0 \text{ km/h}$ and $v_{WG,y} = 0$.
    *   We know $|\vec{v}_{BW}| = 8.0 \text{ km/h}$, so $v_{BW,x}^2 + v_{BW,y}^2 = (8.0)^2 = 64$.

    The component equations become:
    *   x-component: $0 = v_{BW,x} + 3.0 \text{ km/h}$
    *   y-component: $v_{BG,y} = v_{BW,y} + 0$
    *This step fills in the knowns, simplifying the system of equations.*

4.  **Solve for $v_{BW,x}$ from the x-component equation:**
    $$ v_{BW,x} = -3.0 \text{ km/h} $$
    *This tells us the boat must head $3.0 \text{ km/h}$ West relative to the water to cancel out the current.*

5.  **Use the magnitude of $\vec{v}_{BW}$ to find $v_{BW,y}$:**
    $$ v_{BW,x}^2 + v_{BW,y}^2 = (8.0 \text{ km/h})^2 $$
    $$ (-3.0 \text{ km/h})^2 + v_{BW,y}^2 = (8.0 \text{ km/h})^2 $$
    $$ 9.0 + v_{BW,y}^2 = 64.0 $$
    $$ v_{BW,y}^2 = 64.0 - 9.0 = 55.0 $$
    $$ v_{BW,y} = \sqrt{55.0} \approx 7.416 \text{ km/h} $$
    Since the boat needs to travel North, $v_{BW,y}$ must be positive.
    *This uses the Pythagorean theorem to find the other component of the boat's velocity relative to the water.*

6.  **a) Determine the direction of the boat relative to the water:**
    The boat's velocity relative to the water is $\vec{v}_{BW} = (-3.0 \hat{i} + 7.416 \hat{j}) \text{ km/h}$.
    The angle $\theta$ it must head relative to North (or the $+y$ axis) can be found using trigonometry.
    Let $\phi$ be the angle West of North.
    $$ \tan \phi = \frac{|v_{BW,x}|}{|v_{BW,y}|} = \frac{3.0}{7.416} \approx 0.4045 $$
    $$ \phi = \arctan(0.4045) \approx 22.0^\circ $$
    So, the boat must head $\boxed{\text{22.0}^\circ \text{ West of North}}$.
    *This step converts the vector components into a clear direction, which is often required in such problems.*

7.  **b) Calculate the boat's speed relative to the ground:**
    From step 3, we had $v_{BG,y} = v_{BW,y}$.
    So, $v_{BG,y} = 7.416 \text{ km/h}$.
    And we know $v_{BG,x} = 0$.
    The magnitude of $\vec{v}_{BG}$ is:
    $$ |\vec{v}_{BG}| = \sqrt{v_{BG,x}^2 + v_{BG,y}^2} = \sqrt{(0)^2 + (7.416 \text{ km/h})^2} $$
    $$ |\vec{v}_{BG}| = 7.416 \text{ km/h} $$
    The boat's speed relative to the ground is $\boxed{\text{7.42 km/h}}$ (to 3 significant figures).
    *This final step computes the magnitude of the resultant velocity, which is the boat's actual speed across the river.*

**Reflection:** This problem required careful vector decomposition and understanding that the desired resultant velocity (North) implies a zero x-component for the boat's velocity relative to the ground. It highlights the power of breaking down 2D problems into 1D components.

### Example 3: Hard - Projectile Motion from a Moving Truck

**Problem:** A truck is moving East at a constant speed of $20.0 \text{ m/s}$ on a flat road. A person on the truck throws a ball straight up into the air with an initial vertical velocity of $15.0 \text{ m/s}$ relative to the truck.
a) What is the initial velocity of the ball as observed by a stationary observer on the ground?
b) What is the maximum height the ball reaches above the truck, as observed by both the person on the truck and the ground observer?
c) What is the acceleration of the ball as observed by both the person on the truck and the ground observer?

**Given:**
*   Velocity of truck (frame $S'$) relative to ground (frame $S$): $\vec{V} = +20.0 \hat{i} \text{ m/s}$ (East)
*   Initial vertical velocity of ball relative to truck (frame $S'$): $\vec{v}_{0}' = +15.0 \hat{j} \text{ m/s}$ (Up)
*   Acceleration due to gravity: $\vec{g} = -9.8 \hat{j} \text{ m/s}^2$ (Down)

**Want:**
*   a) Initial velocity of ball relative to ground: $\vec{v}_0$
*   b) Maximum height $h_{max}$ (same for both observers)
*   c) Acceleration of ball $\vec{a}$ and $\vec{a}'$

**Solution:**

Let East be the $+x$ direction and Up be the $+y$ direction.

**Part a) Initial velocity of the ball as observed by a stationary observer on the ground.**

1.  **Identify the frames and velocities:**
    *   Frame $S$: Ground frame.
    *   Frame $S'$: Truck frame.
    *   $\vec{V}$: Velocity of $S'$ relative to $S$.
    *   $\vec{v}_0'$: Initial velocity of the ball relative to $S'$.
    *   $\vec{v}_0$: Initial velocity of the ball relative to $S$.
    *This ensures clarity about which velocity belongs to which frame.*

2.  **Apply the Galilean velocity transformation:**
    We want $\vec{v}_0$, and we know $\vec{v}_0' = \vec{v}_0 - \vec{V}$. So, $\vec{v}_0 = \vec{v}_0' + \vec{V}$.
    *Rearranging the transformation equation to solve for the desired quantity.*

3.  **Substitute component values:**
    $$ \vec{v}_0 = (0 \hat{i} + 15.0 \hat{j}) \text{ m/s} + (20.0 \hat{i} + 0 \hat{j}) \text{ m/s} $$
    $$ \vec{v}_0 = (0 + 20.0)\hat{i} + (15.0 + 0)\hat{j} \text{ m/s} $$
    $$ \vec{v}_0 = 20.0 \hat{i} + 15.0 \hat{j} \text{ m/s} $$
    *Adding the vector components.*

4.  **State the final answer for initial velocity:**
    The initial velocity of the ball as observed by the ground observer is $\boxed{\text{(20.0 m/s East, 15.0 m/s Up)}}$.
    *This gives the full vector description.*

**Part b) Maximum height the ball reaches above the truck.**

The maximum height is determined solely by the vertical motion. Since the person on the truck throws the ball straight up relative to the truck, the vertical motion is independent of the horizontal motion of the truck. This height will be the same for both observers because the vertical position of the truck is not changing relative to the ground.

1.  **Use kinematic equations for vertical motion:**
    We know the initial vertical velocity ($v_{0y} = 15.0 \text{ m/s}$), final vertical velocity at max height ($v_y = 0$), and acceleration ($a_y = -9.8 \text{ m/s}^2$). We want displacement ($\Delta y = h_{max}$).
    The relevant kinematic equation is $v_y^2 = v_{0y}^2 + 2a_y \Delta y$.
    *Choosing the appropriate kinematic equation that relates initial/final velocity, acceleration, and displacement.*

2.  **Substitute values and solve for $\Delta y$:**
    $$ (0 \text{ m/s})^2 = (15.0 \text{ m/s})^2 + 2(-9.8 \text{ m/s}^2) h_{max} $$
    $$ 0 = 225 \text{ m}^2/\text{s}^2 - 19.6 \text{ m/s}^2 \cdot h_{max} $$
    $$ 19.6 \text{ m/s}^2 \cdot h_{max} = 225 \text{ m}^2/\text{s}^2 $$
    $$ h_{max} = \frac{225}{19.6} \text{ m} \approx 11.479 \text{ m} $$
    *Performing the algebraic manipulation.*

3.  **State the final answer for maximum height:**
    The maximum height the ball reaches above the truck is $\boxed{\text{11.5 m}}$.
    *This height is the same for both observers because the relative vertical motion between the ball and the truck is identical for both.*

**Part c) Acceleration of the ball as observed by both the person on the truck and the ground observer.**

1.  **Acceleration in the ground frame ($S$):**
    The only force acting on the ball after it's thrown is gravity.
    So, $\vec{a} = \vec{g} = \boxed{\text{-9.8} \hat{j} \text{ m/s}^2}$ (or $9.8 \text{ m/s}^2$ downwards).
    *Gravity acts the same regardless of horizontal motion.*

2.  **Acceleration in the truck frame ($S'$):**
    Since the truck (frame $S'$) is moving at a *constant velocity* relative to the ground (frame $S$), $S'$ is an inertial reference frame.
    According to the Galilean acceleration transformation, $\vec{a}' = \vec{a}$.
    Therefore, the acceleration of the ball as observed by the person on the truck is also $\boxed{\text{-9.8} \hat{j} \text{ m/s}^2}$ (or $9.8 \text{ m/s}^2$ downwards).
    *This directly applies the invariance of acceleration under Galilean transformations for inertial frames.*

**Reflection:** This example demonstrates how initial velocity is frame-dependent, but acceleration (due to gravity) is frame-invariant when dealing with inertial frames. The maximum height calculation also highlights that vertical kinematics are unaffected by constant horizontal velocity.

### Example 4: Harder - Relative Velocity of Two Objects

**Problem:** Car A is traveling North at $60 \text{ km/h}$. Car B is traveling East at $80 \text{ km/h}$.
a) What is the velocity of Car A relative to Car B?
b) What is the velocity of Car B relative to Car A?

**Given:**
*   Velocity of Car A relative to ground: $\vec{v}_{AG} = 60 \text{ km/h North}$
*   Velocity of Car B relative to ground: $\vec{v}_{BG} = 80 \text{ km/h East}$

**Want:**
*   a) $\vec{v}_{AB}$ (velocity of A relative to B)
*   b) $\vec{v}_{BA}$ (velocity of B relative to A)

**Solution:**

Let North be the $+y$ direction and East be the $+x$ direction.
So, $\vec{v}_{AG} = 60 \hat{j} \text{ km/h}$ and $\vec{v}_{BG} = 80 \hat{i} \text{ km/h}$.

**Part a) Velocity of Car A relative to Car B ($\vec{v}_{AB}$)**

To find the velocity of object A relative to object B, we can use the formula:
$$ \vec{v}_{AB} = \vec{v}_{AG} - \vec{v}_{BG} $$
This means the velocity of A relative to B is the velocity of A relative to the ground minus the velocity of B relative to the ground. This is equivalent to viewing from a reference frame moving with B.

1.  **Substitute the given velocities:**
    $$ \vec{v}_{AB} = (60 \hat{j} \text{ km/h}) - (80 \hat{i} \text{ km/h}) $$
    *This is a direct vector subtraction.*

2.  **Rearrange into standard vector component form:**
    $$ \vec{v}_{AB} = -80 \hat{i} + 60 \hat{j} \text{ km/h} $$
    *This is the velocity vector. It means Car A appears to move $80 \text{ km/h}$ West and $60 \text{ km/h}$ North, as seen from Car B.*

3.  **Calculate the magnitude (speed) of $\vec{v}_{AB}$:**
    $$ |\vec{v}_{AB}| = \sqrt{(-80)^2 + (60)^2} $$
    $$ |\vec{v}_{AB}| = \sqrt{6400 + 3600} = \sqrt{10000} = 100 \text{ km/h} $$
    *Using the Pythagorean theorem for the magnitude of the resultant vector.*

4.  **Calculate the direction of $\vec{v}_{AB}$:**
    Let $\theta$ be the angle measured counter-clockwise from the positive x-axis (East).
    $$ \tan \theta = \frac{v_{AB,y}}{v_{AB,x}} = \frac{60}{-80} = -0.75 $$
    Since $v_{AB,x}$ is negative and $v_{AB,y}$ is positive, the vector is in the second quadrant (North-West).
    The reference angle (acute angle with the x-axis) is $\arctan(0.75) \approx 36.87^\circ$.
    The angle from the positive x-axis is $180^\circ - 36.87^\circ = 143.13^\circ$.
    Alternatively, we can state it as: $36.87^\circ$ North of West.

5.  **State the final answer for $\vec{v}_{AB}$:**
    The velocity of Car A relative to Car B is $\boxed{\text{100 km/h at 36.9}^\circ \text{ North of West}}$.
    *Full vector description with magnitude and direction.*

**Part b) Velocity of Car B relative to Car A ($\vec{v}_{BA}$)**

To find the velocity of object B relative to object A, we use:
$$ \vec{v}_{BA} = \vec{v}_{BG} - \vec{v}_{AG} $$
Alternatively, we know that $\vec{v}_{BA} = -\vec{v}_{AB}$.

1.  **Substitute the given velocities (or use the shortcut):**
    Using the formula:
    $$ \vec{v}_{BA} = (80 \hat{i} \text{ km/h}) - (60 \hat{j} \text{ km/h}) $$
    $$ \vec{v}_{BA} = 80 \hat{i} - 60 \hat{j} \text{ km/h} $$
    Using the shortcut:
    $$ \vec{v}_{BA} = - \vec{v}_{AB} = -(-80 \hat{i} + 60 \hat{j}) \text{ km/h} = 80 \hat{i} - 60 \hat{j} \text{ km/h} $$
    *Both methods yield the same result, confirming the relationship between $\vec{v}_{AB}$ and $\vec{v}_{BA}$.*

2.  **Calculate the magnitude (speed) of $\vec{v}_{BA}$:**
    $$ |\vec{v}_{BA}| = \sqrt{(80)^2 + (-60)^2} $$
    $$ |\vec{v}_{BA}| = \sqrt{6400 + 3600} = \sqrt{10000} = 100 \text{ km/h} $$
    *The relative speed is the same, as expected.*

3.  **Calculate the direction of $\vec{v}_{BA}$:**
    Here, $v_{BA,x}$ is positive and $v_{BA,y}$ is negative, so the vector is in the fourth quadrant (South-East).
    The reference angle is $\arctan(\frac{|-60|}{|80|}) = \arctan(0.75) \approx 36.87^\circ$.
    So, the direction is $36.87^\circ$ South of East.

4.  **State the final answer for $\vec{v}_{BA}$:**
    The velocity of Car B relative to Car A is $\boxed{\text{100 km/h at 36.9}^\circ \text{ South of East}}$.
    *Again, full vector description.*

**Reflection:** This example highlights the symmetry of relative velocity: $\vec{v}_{AB} = -\vec{v}_{BA}$. It also reinforces the importance of vector subtraction and careful calculation of magnitudes and directions in 2D. This type of problem is crucial for understanding how objects move relative to each other, which is vital in fields like aerospace and robotics.

## 6. Common mistakes and traps

1.  **Confusing reference frames:** Students often mix up which velocity refers to which frame (e.g., using $\vec{v}$ when they mean $\vec{v}'$). Always clearly label your frames ($S$, $S'$, or using descriptive subscripts like `ground`, `train`) and define what $\vec{V}$ represents (velocity of $S'$ relative to $S$).
2.  **Incorrect vector addition/subtraction:** Forgetting that velocities are vectors and simply adding or subtracting their magnitudes without considering direction. This is especially common in 2D problems where components must be handled separately or using geometric vector addition.
3.  **Applying Galilean transformations to non-inertial frames:** Assuming $\vec{a}' = \vec{a}$ always holds. This is only true if the relative velocity $\vec{V}$ between the frames is constant. If one frame is accelerating relative to the other, then $\frac{d\vec{V}}{dt} \neq 0$, and acceleration will *not* be invariant.
4.  **Forgetting initial conditions for position:** The position transformation $\vec{r}' = \vec{r} - \vec{V}t$ assumes that the origins of the two frames coincide at $t=0$. If they don't, you need to add an initial relative position vector: $\vec{r}' = \vec{r} - \vec{V}t - \vec{R}_0$, where $\vec{R}_0$ is the position of $S'$'s origin relative to $S$'s origin at $t=0$.
5.  **Assuming all quantities are frame-dependent:** While position and velocity are frame-dependent, acceleration, time intervals, mass, and force are *invariant* under Galilean transformations (for inertial frames). Students sometimes incorrectly transform these invariant quantities.
6.  **Misinterpreting "relative to":** Always be precise about what "relative to" means. "Velocity of A relative to B" means how B sees A moving, and it's calculated as $\vec{v}_A - \vec{v}_B$.

## 7. Textbook-precise explanation

In classical mechanics, a **reference frame** is an abstract coordinate system from which physical measurements are made. A special class of reference frames, known as **inertial reference frames**, are those in which Newton's First Law of Motion holds: an object subject to no net external force experiences zero acceleration. Any frame moving at a constant velocity relative to an inertial frame is also an inertial frame.

Consider two inertial reference frames, $S$ and $S'$. Let frame $S$ have coordinates $(x, y, z)$ and frame $S'$ have coordinates $(x', y', z')$. Assume the axes of $S'$ are parallel to the axes of $S$. Let the frame $S'$ move with a constant velocity $\vec{V}$ relative to frame $S$. For simplicity, we align the $x$-axes of both frames such that $\vec{V}$ is along the positive $x$-axis, so $\vec{V} = V\hat{i}$. Furthermore, let the origins of the two frames coincide at time $t=0$.

The **Galilean transformations** relate the space and time coordinates of an event observed in $S$ to those observed in $S'$:

1.  **Position Transformation:**
    For an event occurring at position $\vec{r} = (x, y, z)$ in frame $S$ at time $t$, its coordinates $\vec{r}' = (x', y', z')$ in frame $S'$ at time $t'$ are given by:
    $$ x' = x - Vt $$
    $$ y' = y $$
    $$ z' = z $$
    $$ t' = t $$
    In vector form, this is $\vec{r}' = \vec{r} - \vec{V}t$. The assumption $t' = t$ signifies the classical notion of absolute time, meaning time flows identically for all observers, regardless of their relative motion.

2.  **Velocity Transformation:**
    By differentiating the position transformation with respect to time, we obtain the velocity transformation. Let an object have velocity $\vec{v} = (v_x, v_y, v_z)$ in frame $S$ and $\vec{v}' = (v_x', v_y', v_z')$ in frame $S'$.
    $$ v_x' = \frac{dx'}{dt'} = \frac{d(x - Vt)}{dt} = \frac{dx}{dt} - V = v_x - V $$
    $$ v_y' = \frac{dy'}{dt'} = \frac{dy}{dt} = v_y $$
    $$ v_z' = \frac{dz'}{dt'} = \frac{dz}{dt} = v_z $$
    In vector form:
    $$ \vec{v}' = \vec{v} - \vec{V} $$

3.  **Acceleration Transformation:**
    Differentiating the velocity transformation with respect to time yields the acceleration transformation. Let an object have acceleration $\vec{a} = (a_x, a_y, a_z)$ in frame $S$ and $\vec{a}' = (a_x', a_y', a_z')$ in frame $S'$.
    $$ a_x' = \frac{dv_x'}{dt'} = \frac{d(v_x - V)}{dt} = \frac{dv_x}{dt} - \frac{dV}{dt} = a_x - 0 = a_x $$
    (Since $\vec{V}$ is constant, $\frac{dV}{dt} = 0$)
    $$ a_y' = \frac{dv_y'}{dt'} = \frac{dv_y}{dt} = a_y $$
    $$ a_z' = \frac{dv_z'}{dt'} = \frac{dv_z}{dt} = a_z $$
    In vector form:
    $$ \vec{a}' = \vec{a} $$
    This invariance of acceleration is a cornerstone of Galilean relativity.

The **Principle of Galilean Relativity** states that the laws of mechanics are the same in all inertial reference frames. This is a direct consequence of the acceleration transformation. Since forces are related to acceleration by Newton's Second Law ($\vec{F} = m\vec{a}$), and mass $m$ is considered invariant in classical mechanics, then if $\vec{a}' = \vec{a}$, it follows that $\vec{F}' = \vec{F}$. Thus, the form of Newton's Second Law, and indeed all mechanical laws, is invariant under Galilean transformations.

This framework is rigorously discussed in classical mechanics textbooks such as "Physics for Scientists and Engineers" by Serway and Jewett (Chapter 4) or "Fundamentals of Physics" by Halliday, Resnick, and Walker (Chapter 4).

## 8. ASCII diagrams

Here's a diagram illustrating two reference frames, $S$ and $S'$, where $S'$ is moving with a constant velocity $\vec{V}$ relative to $S$. A point $P$ is shown with its coordinates in both frames.

```text
       S' Frame (x', y')
       ^ y'
       |
       |     P (x', y')
       |    /
       |   /
       O'-----> x'
       |
       |
       |
       |
       |
       |
       |
       V (velocity of S' relative to S)
       |
       |
       |
       S Frame (x, y)
       ^ y
       |
       |         P (x, y)
       |        /
       |       /
       O-------------> x

At t=0, the origins O and O' coincide.
At a later time t, the origin O' of frame S' is at position V*t relative to the origin O of frame S.
The coordinates of point P in frame S are (x, y).
The coordinates of point P in frame S' are (x', y').

Relationship:
x = x' + V*t
y = y'
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of a **"Prime-Time Observer"** vs. a **"Ground-Level Observer"**.
    *   The "Prime-Time Observer" ($\vec{v}'$) is *in* the moving frame.
    *   The "Ground-Level Observer" ($\vec{v}$) is *in* the stationary frame.
    *   The "Frame's Velocity" ($\vec{V}$) is how the Prime-Time Observer's frame moves relative to the Ground-Level Observer's frame.
    The key equation is $\vec{v}' = \vec{v} - \vec{V}$.
    Mnemonic: **"Prime equals Ground minus Frame"** (P = G - F). This helps remember the subtraction.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **Position:** $\vec{r}' = \vec{r} - \vec{V}t$ (assuming origins coincide at $t=0$)
    *   **Velocity:** $\vec{v}' = \vec{v} - \vec{V}$
    *   **Acceleration:** $\vec{a}' = \vec{a}$ (This is the most important one for understanding Galilean invariance and its limits.)

3.  **Spaced-Repetition Schedule:**
    *   Review these concepts and formulas:
        *   **1 day** after learning
        *   **3 days** after learning
        *   **7 days** after learning
        *   **16 days** after learning
        *   **35 days** after learning
    *   Actively recall the formulas and try to re-derive them from first principles each time.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the velocity or acceleration transformation, you can always rebuild them from the position transformation, as long as you remember the definition of velocity and acceleration.

    *   **Start with the position transformation:**
        Assume frame $S'$ moves with constant velocity $\vec{V}$ relative to frame $S$, and their origins coincide at $t=0$.
        $$ \vec{r}' = \vec{r} - \vec{V}t $$
        (Remember: position in the moving frame equals position in the stationary frame minus the displacement of the moving frame's origin.)

    *   **Derive the velocity transformation:**
        Velocity is the time derivative of position: $\vec{v} = \frac{d\vec{r}}{dt}$ and $\vec{v}' = \frac{d\vec{r}'}{dt}$.
        Differentiate the position transformation equation with respect to time $t$:
        $$ \frac{d\vec{r}'}{dt} = \frac{d}{dt}(\vec{r} - \vec{V}t) $$
        $$ \frac{d\vec{r}'}{dt} = \frac{d\vec{r}}{dt} - \frac{d}{dt}(\vec{V}t) $$
        Since $\vec{V}$ is a constant vector (for Galilean transformations), $\frac{d}{dt}(\vec{V}t) = \vec{V}$.
        $$ \vec{v}' = \vec{v} - \vec{V} $$

    *   **Derive the acceleration transformation:**
        Acceleration is the time derivative of velocity: $\vec{a} = \frac{d\vec{v}}{dt}$ and $\vec{a}' = \frac{d\vec{v}'}{dt}$.
        Differentiate the velocity transformation equation with respect to time $t$:
        $$ \frac{d\vec{v}'}{dt} = \frac{d}{dt}(\vec{v} - \vec{V}) $$
        $$ \frac{d\vec{v}'}{dt} = \frac{d\vec{v}}{dt} - \frac{d\vec{V}}{dt} $$
        Since $\vec{V}$ is a constant vector, $\frac{d\vec{V}}{dt} = 0$.
        $$ \vec{a}' = \vec{a} $$
    This re-derivation process solidifies your understanding and makes the formulas less about rote memorization and more about logical consequence.

## 10. Connections — what this leads to

Galilean transformations are a cornerstone of classical mechanics and serve as a crucial stepping stone to more advanced concepts:

*   **Special Relativity:** The most direct and profound connection. Galilean transformations are an excellent approximation for speeds much less than the speed of light. However, they break down at relativistic speeds. Special Relativity, introduced by Einstein, replaces them with **Lorentz transformations**, which correctly describe how space and time themselves transform between inertial frames, leading to phenomena like time dilation and length contraction. Understanding Galilean transformations first provides a clear contrast and highlights *why* new physics was needed.
*   **Non-Inertial Reference Frames:** While Galilean transformations apply only to inertial frames, they lay the groundwork for understanding what happens in non-inertial (accelerating) frames. When a frame accelerates, the simple $\vec{a}' = \vec{a}$ no longer holds. Instead, "fictitious forces" (like the centrifugal force or Coriolis force) appear, which are necessary to make Newton's laws appear to hold in the accelerating frame. This leads to the study of rotating frames and their applications in meteorology (Coriolis effect on weather patterns) and aerospace (guidance systems in rotating spacecraft).
*   **Newton's Laws of Motion:** Galilean transformations explicitly demonstrate the **Principle of Galilean Invariance**, which states that the laws of mechanics are the same in all inertial reference frames. This invariance is a fundamental symmetry of nature and underpins the universality of physics.
*   **Kinematics and Dynamics:** This subtopic provides the tools to analyze motion (kinematics) and the forces causing it (dynamics) from multiple perspectives. It's essential for solving complex problems involving relative motion, such as projectile motion observed from a moving vehicle, or the motion of objects in flowing fluids.
*   **Electromagnetism (Historical Context):** Historically, it was observed that Maxwell's equations (describing electromagnetism) were *not* invariant under Galilean transformations. This discrepancy was a major puzzle that ultimately led to the development of Special Relativity.

## 11. Self-check questions

1.  Define an inertial reference frame and provide two examples: one that is a good approximation of an inertial frame, and one that is clearly not.
2.  A boat is traveling at $10 \text{ m/s}$ North relative to the water. The river current flows at $3 \text{ m/s}$ East relative to the ground. What is the boat's velocity (magnitude and direction) relative to the ground?
3.  State the Galilean transformation equations for position, velocity, and acceleration. Explain the assumption made about time in these transformations.
4.  Why is the acceleration of an object the same in two different inertial reference frames, even though its position and velocity are not? Explain the physical principle behind this invariance.
5.  A spaceship is moving through space at a constant velocity of $0.1c$ (where $c$ is the speed of light) relative to a space station. An astronaut inside the spaceship throws a wrench at $10 \text{ m/s}$ in the direction perpendicular to the spaceship's motion, relative to the spaceship.
    a) What is the velocity (magnitude and direction) of the wrench as observed by an observer on the space station?
    b) If the astronaut applies a force to the wrench, causing it to accelerate at $2 \text{ m/s}^2$ relative to the spaceship, what acceleration would the observer on the space station measure for the wrench? Assume Galilean transformations are valid for this scenario.