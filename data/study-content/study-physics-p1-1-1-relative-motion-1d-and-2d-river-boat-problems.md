## 1. What it is — in plain English

Imagine you're sitting still. Are you *really* still? If you're on Earth, you're actually spinning around Earth's axis, and Earth is orbiting the Sun, and the Sun is orbiting the center of the galaxy! So, whether something is "moving" or "still" often depends on *who* is watching.

Relative motion is all about understanding how movement looks different from different viewpoints. It's about figuring out the speed and direction of an object *as seen by a specific observer*, who might themselves be moving.

Think of it this way: if you're walking on a moving walkway at an airport, your speed relative to the walkway might be 3 mph. But if the walkway itself is moving at 5 mph relative to the ground, then someone standing still on the ground sees you moving at 8 mph! Your motion is "relative" to the walkway, and the walkway's motion is "relative" to the ground.

This concept helps us combine these different perspectives to find the "true" motion from a chosen viewpoint. It's fundamental because there's no single "absolute" rest frame in the universe; all motion is relative.

## 2. Why it matters — real-world applications

Understanding relative motion is absolutely crucial in many fields, especially in physics and engineering. It's not just an academic exercise; it's how we navigate, design, and predict.

1.  **Aerospace Engineering & Navigation:** When an airplane flies, its speed and direction relative to the ground (ground speed) are affected by the wind. The pilot knows the plane's speed and heading *relative to the air* (airspeed). To fly a specific path over the ground, they must account for the wind's velocity *relative to the ground*. This is a classic 2D relative motion problem, essential for accurate flight planning, fuel efficiency, and safe landings. Rockets also need to account for Earth's rotation when launching to achieve precise orbits.
2.  **Autonomous Vehicles & Robotics (Machine Learning):** Self-driving cars constantly calculate the relative velocities of other vehicles, pedestrians, and obstacles. To avoid collisions or merge safely, the car's AI must know not just its own speed and direction, but also how fast and in what direction other objects are moving *relative to itself*. This allows the car to predict future positions and make safe maneuvers.
3.  **Space Exploration & Orbital Mechanics:** Rendezvous maneuvers in space, like docking a spacecraft with the International Space Station, require incredibly precise calculations of relative velocity. The two spacecraft must match their velocities exactly to avoid a destructive collision, even though both are moving at thousands of miles per hour relative to Earth. This extends to planning trajectories for probes to intercept planets or comets.
4.  **Fluid Dynamics & Marine Engineering:** Designing ships, submarines, or even surfboards requires understanding how water flows *relative to* the moving object. This affects drag, lift, and stability. Similarly, ocean currents affect the actual path and speed of a boat relative to the shore, which is exactly what "river-boat problems" model.

## 3. Prerequisites — what you must know first

Before diving deep into relative motion, ensure you have a solid grasp of these foundational concepts:

*   **Scalars and Vectors:** Understand the difference between quantities that only have magnitude (scalars like speed, mass, time) and quantities that have both magnitude and direction (vectors like velocity, displacement, force).
*   **Vector Addition and Subtraction:** Be proficient in adding and subtracting vectors, both graphically (head-to-tail method, parallelogram method) and analytically (using components).
*   **Displacement, Velocity, and Acceleration:** Know the definitions of these kinematic quantities and how they relate to each other (e.g., velocity is the rate of change of displacement).
*   **Kinematics in 1D and 2D:** Be comfortable solving problems involving motion with constant acceleration in one and two dimensions, using equations like $v = v_0 + at$, $\Delta x = v_0 t + \frac{1}{2}at^2$, etc.
*   **Trigonometry:** You'll need to use sine, cosine, and tangent to resolve vectors into components and to find angles and magnitudes of resultant vectors.
*   **Pythagorean Theorem:** Essential for finding the magnitude of a resultant vector from its perpendicular components in 2D.

If any of these feel shaky, pause here and review them. They are the building blocks for what's to come.

## 4. The core idea — step by step

Relative motion isn't just a formula; it's a way of thinking about how different observers perceive movement. Let's build this understanding step by step.

### Step 1: The Observer Matters (Frame of Reference)

*   **Plain English Statement:** Your perception of an object's motion (its velocity) is entirely dependent on *your own* motion. If you're standing still, you see things one way. If you're moving, you see them differently. The "frame of reference" is simply the coordinate system (the set of axes) from which an observer is making measurements.
*   **Concrete Example:** Imagine you're on a train moving at 50 mph. You toss a ball straight up in the air and catch it. From *your* perspective (your frame of reference), the ball went straight up and came straight down. But for someone standing on the ground watching the train pass, the ball followed a parabolic path, moving forward with the train while also going up and down.
*   **Formal/Mathematical Version:** At this stage, it's more conceptual. There's no specific formula yet, but the idea is that velocities are always measured *relative to* some reference frame.
*   **What could go wrong:** Forgetting to explicitly state or implicitly understand the reference frame for *each* velocity mentioned in a problem. This is the most common source of confusion.

### Step 2: Defining Relative Velocity (1D)

*   **Plain English Statement:** In one dimension (like cars on a straight road), the velocity of object A *relative to* object B is simply how fast A appears to be moving from B's perspective. If A and B are moving in the same direction, B sees A moving slower (or even backward if A is slower). If they're moving towards each other, B sees A approaching very quickly.
*   **Concrete Example:** Car A is moving east at $v_A = 60 \text{ mph}$. Car B is moving east at $v_B = 40 \text{ mph}$.
    *   What is the velocity of Car A relative to Car B? Car B sees Car A pulling away at $60 - 40 = 20 \text{ mph}$ east.
    *   What is the velocity of Car B relative to Car A? Car A sees Car B falling behind at $40 - 60 = -20 \text{ mph}$ (or $20 \text{ mph}$ west).
*   **Formal/Mathematical Version:** Let's use a consistent notation.
    *   $v_{A/B}$ (read as "velocity of A relative to B") or $v_{AB}$
    *   The velocity of A relative to B is given by:
        $$v_{A/B} = v_A - v_B$$
        where $v_A$ and $v_B$ are the velocities of A and B, respectively, *as measured from a common (usually stationary) frame of reference* (like the ground).
    *   Note that $v_{B/A} = v_B - v_A = -(v_A - v_B) = -v_{A/B}$. This makes sense: if A sees B moving at -20 mph, B sees A moving at +20 mph.
*   **What could go wrong:**
    *   Mixing up the order of subtraction. $v_{A/B}$ is not the same as $v_{B/A}$.
    *   Incorrectly handling signs for directions. Always define a positive direction (e.g., east is +, west is -).

### Step 3: The Notation System - A Common Language

*   **Plain English Statement:** To avoid confusion, we need a clear way to label velocities. The subscript notation is key. The first subscript is the *object* whose velocity we're describing, and the second subscript is the *observer* or the *reference frame* from which that velocity is measured.
*   **Concrete Example:**
    *   $v_{PG}$: Velocity of the **P**erson relative to the **G**round.
    *   $v_{TW}$: Velocity of the **T**rain relative to the **W**ater (if it's a floating train).
    *   $v_{AW}$: Velocity of the **A**irplane relative to the **W**ind (this is the plane's airspeed).
    *   $v_{WG}$: Velocity of the **W**ind relative to the **G**round.
*   **Formal/Mathematical Version:** We use $\vec{v}_{Object/Observer}$ or $\vec{v}_{Object, Observer}$. The arrow reminds us it's a vector.
*   **What could go wrong:** Inconsistent notation within a problem. Forgetting which subscript refers to the object and which to the observer.

### Step 4: The Fundamental Relative Velocity Equation (General Form)

*   **Plain English Statement:** When you have multiple moving objects or reference frames, you can link their relative velocities through an intermediate frame. Think of it like a chain: if you know A relative to B, and B relative to C, you can find A relative to C. The "middle man" reference frame connects the two.
*   **Concrete Example:** You are a passenger (P) walking on a train (T), and the train is moving relative to the ground (G).
    *   Your velocity relative to the train: $\vec{v}_{P/T}$
    *   The train's velocity relative to the ground: $\vec{v}_{T/G}$
    *   What is your velocity relative to the ground? $\vec{v}_{P/G}$
    *   Intuitively, if you walk forward on the train, and the train moves forward on the ground, your speeds add up. If you walk backward, they subtract. This is exactly what the equation captures.
*   **Formal/Mathematical Version:** The fundamental equation for relative velocity is:
    $$\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}$$
    This equation states that the velocity of object A relative to frame C is the vector sum of A's velocity relative to an intermediate frame B, and B's velocity relative to frame C. Notice how the "middle" subscript (B) seems to "cancel out," leaving $A$ and $C$. This is a powerful mnemonic.
*   **What could go wrong:**
    *   Incorrectly applying the "middle man" rule, especially when subtraction is involved (e.g., if you need $\vec{v}_{B/A}$ but have $\vec{v}_{A/B}$, remember $\vec{v}_{B/A} = -\vec{v}_{A/B}$).
    *   Forgetting that these are *vector* additions, not just scalar additions. Directions are critical.

### Step 5: Extending to 2D (Vector Nature)

*   **Plain English Statement:** The same fundamental equation from Step 4 applies in two dimensions, but now we *must* treat velocities as full vectors. This means we'll often need to break them down into x and y components before adding them, and then combine the resultant components to find the final magnitude and direction.
*   **Concrete Example:** A boat tries to cross a river directly eastward, but there's a current flowing southward. The boat's velocity *relative to the water* is eastward. The water's velocity *relative to the ground* is southward. The boat's actual path (velocity *relative to the ground*) will be a combination of these two, likely southeast.
*   **Formal/Mathematical Version:**
    $$\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}$$
    In 2D, each of these terms is a vector, meaning it has both magnitude and direction. To perform the vector addition, you typically:
    1.  Resolve each vector into its x and y components.
    2.  Add the x-components together to get the resultant x-component.
    3.  Add the y-components together to get the resultant y-component.
    4.  Use the Pythagorean theorem to find the magnitude of the resultant vector ($|\vec{v}| = \sqrt{v_x^2 + v_y^2}$).
    5.  Use inverse tangent to find the direction (angle) of the resultant vector ($\theta = \arctan(v_y/v_x)$).
*   **What could go wrong:**
    *   Treating 2D vectors as scalars and simply adding their magnitudes. This is a huge error.
    *   Incorrectly resolving vectors into components (e.g., using sine instead of cosine for the x-component, or vice versa, depending on the angle definition).
    *   Forgetting to find both magnitude and direction for the final answer.

### Step 6: River-Boat Problems (A Classic Application of 2D Relative Motion)

*   **Plain English Statement:** River-boat problems are a specific, common type of 2D relative motion problem. The "intermediate frame" is the water itself. The boat has a velocity *relative to the water*, and the water has a velocity *relative to the ground* (the river current). We want to find the boat's actual velocity *relative to the ground*.
*   **Concrete Example:** A boat can travel at 5 mph in still water. It's in a river with a 3 mph current.
    *   If the boat heads straight across the river (perpendicular to the current), the current will push it downstream. Its actual path will be diagonal.
    *   If the boat wants to go straight across (reach a point directly opposite its starting point), it needs to head upstream at an angle to counteract the current.
*   **Formal/Mathematical Version:** Using our notation, we define:
    *   $\vec{v}_{BW}$: Velocity of the **B**oat relative to the **W**ater (this is the boat's engine speed and heading).
    *   $\vec{v}_{WG}$: Velocity of the **W**ater relative to the **G**round (this is the river current).
    *   $\vec{v}_{BG}$: Velocity of the **B**oat relative to the **G**round (this is the boat's actual path and speed observed from the shore).
    *   Applying the fundamental equation:
        $$\vec{v}_{BG} = \vec{v}_{BW} + \vec{v}_{WG}$$
    This equation is your primary tool for river-boat problems.
*   **What could go wrong:**
    *   Confusing $\vec{v}_{BW}$ (what the boat *tries* to do in the water) with $\vec{v}_{BG}$ (what the boat *actually* does relative to the shore).
    *   Incorrectly setting up the vector diagram, especially when the goal is to cross "straight across" or "minimize time."
    *   Forgetting that the time to cross a river of width $W$ is determined *only* by the component of the boat's velocity that is perpendicular to the river banks ($t = W / v_{\text{perpendicular}}$). The parallel component only determines how far downstream or upstream it lands.

## 5. Worked examples — multiple, with every step shown

Let's put these ideas into practice with a range of examples.

### Example 1: 1D - Cars on a Highway

**Problem Statement:** Car A is traveling east at $80 \text{ km/h}$. Car B is traveling west at $60 \text{ km/h}$.
a) What is the velocity of Car A relative to Car B?
b) What is the velocity of Car B relative to Car A?

**Identify Given and Wanted:**
*   Given: $v_A = 80 \text{ km/h}$ (East), $v_B = 60 \text{ km/h}$ (West).
*   Wanted: $v_{A/B}$ and $v_{B/A}$.

**Solution:**
First, we establish a coordinate system. Let East be the positive direction (+x).
Therefore:
$v_A = +80 \text{ km/h}$
$v_B = -60 \text{ km/h}$ (since West is opposite to East)

**a) Velocity of Car A relative to Car B ($v_{A/B}$):**

$$v_{A/B} = v_A - v_B$$
*This is the fundamental 1D relative velocity equation. We subtract the observer's velocity from the object's velocity.*

$$v_{A/B} = (+80 \text{ km/h}) - (-60 \text{ km/h})$$
*Substitute the given velocities, paying close attention to the signs.*

$$v_{A/B} = 80 \text{ km/h} + 60 \text{ km/h}$$
*Simplify the subtraction of a negative number.*

$$v_{A/B} = 140 \text{ km/h}$$
*Perform the addition.*

The velocity of Car A relative to Car B is $\boxed{\textbf{140 km/h East}}$.
*The positive sign indicates the direction is East, according to our chosen coordinate system. This means Car B sees Car A approaching it at 140 km/h (if they are moving towards each other) or receding from it at 140 km/h (if A has passed B and is moving away).*

**b) Velocity of Car B relative to Car A ($v_{B/A}$):**

$$v_{B/A} = v_B - v_A$$
*Again, using the fundamental 1D relative velocity equation, but now Car B is the object and Car A is the observer.*

$$v_{B/A} = (-60 \text{ km/h}) - (+80 \text{ km/h})$$
*Substitute the given velocities with their correct signs.*

$$v_{B/A} = -60 \text{ km/h} - 80 \text{ km/h}$$
*Simplify the expression.*

$$v_{B/A} = -140 \text{ km/h}$$
*Perform the subtraction.*

The velocity of Car B relative to Car A is $\boxed{\textbf{140 km/h West}}$.
*The negative sign indicates the direction is West. This makes sense: if B sees A moving East at 140 km/h, then A must see B moving West at 140 km/h.*

**Reflection:** This example highlights the importance of consistently defining a positive direction and carefully handling signs in 1D relative motion. The results confirm that $v_{A/B} = -v_{B/A}$.

---

### Example 2: 1D - Airplane with Wind

**Problem Statement:** An airplane has an airspeed of $500 \text{ km/h}$ (its speed relative to the air). It is flying towards a destination 1500 km away.
a) How long does the trip take if there is a tailwind of $50 \text{ km/h}$?
b) How long does the trip take if there is a headwind of $50 \text{ km/h}$?

**Identify Given and Wanted:**
*   Given: Airspeed ($v_{PW}$) = $500 \text{ km/h}$, Distance ($\Delta x$) = $1500 \text{ km}$, Wind speed ($v_{WG}$) = $50 \text{ km/h}$.
*   Wanted: Time ($t$) for both scenarios.

**Solution:**
Let the direction of the destination be positive (+x).

**a) Tailwind:**
A tailwind blows in the *same direction* as the airplane is trying to fly.
So, $v_{PW} = +500 \text{ km/h}$ and $v_{WG} = +50 \text{ km/h}$.

We need to find the plane's velocity relative to the ground ($v_{PG}$).
Using the general relative velocity equation:
$$\vec{v}_{PG} = \vec{v}_{PW} + \vec{v}_{WG}$$
*This equation links the plane's velocity relative to the ground to its velocity relative to the air and the air's velocity relative to the ground.*

Since all velocities are in the same (or opposite) direction, we can treat them as scalars with signs:
$$v_{PG} = v_{PW} + v_{WG}$$
*In 1D, when vectors are collinear, vector addition simplifies to scalar addition/subtraction based on direction.*

$$v_{PG} = 500 \text{ km/h} + 50 \text{ km/h}$$
*Substitute the given values for airspeed and wind speed.*

$$v_{PG} = 550 \text{ km/h}$$
*Calculate the plane's effective speed relative to the ground.*

Now, to find the time taken:
$$t = \frac{\Delta x}{v_{PG}}$$
*Time is distance divided by speed, assuming constant velocity.*

$$t = \frac{1500 \text{ km}}{550 \text{ km/h}}$$
*Substitute the total distance and the calculated ground speed.*

$$t \approx 2.73 \text{ hours}$$
*Perform the division and round to a reasonable number of significant figures.*

The trip with a tailwind takes $\boxed{\textbf{2.73 hours}}$.

**b) Headwind:**
A headwind blows in the *opposite direction* to the airplane's intended flight path.
So, $v_{PW} = +500 \text{ km/h}$ and $v_{WG} = -50 \text{ km/h}$.

Again, we find the plane's velocity relative to the ground ($v_{PG}$):
$$\vec{v}_{PG} = \vec{v}_{PW} + \vec{v}_{WG}$$
*The same fundamental equation applies.*

$$v_{PG} = v_{PW} + v_{WG}$$
*Scalar addition/subtraction for collinear vectors.*

$$v_{PG} = 500 \text{ km/h} + (-50 \text{ km/h})$$
*Substitute values, ensuring the headwind has a negative sign.*

$$v_{PG} = 450 \text{ km/h}$$
*Calculate the plane's effective speed relative to the ground.*

Now, to find the time taken:
$$t = \frac{\Delta x}{v_{PG}}$$
*Using the distance and the new ground speed.*

$$t = \frac{1500 \text{ km}}{450 \text{ km/h}}$$
*Substitute the values.*

$$t \approx 3.33 \text{ hours}$$
*Perform the division.*

The trip with a headwind takes $\boxed{\textbf{3.33 hours}}$.

**Reflection:** This example demonstrates how wind significantly impacts travel time, even in 1D. It reinforces the idea of combining velocities relative to an intermediate medium (air) to find the velocity relative to the ground.

---

### Example 3: 2D - River-Boat Problem (Resultant Velocity)

**Problem Statement:** A boat can travel at $4.0 \text{ m/s}$ in still water. It attempts to cross a river that is $100 \text{ m}$ wide. The river current flows at $2.0 \text{ m/s}$ downstream. If the boat heads directly across the river (perpendicular to the current), what is its resultant velocity relative to the shore, and how far downstream does it land?

**Identify Given and Wanted:**
*   Given: Boat speed in still water ($v_{BW}$) = $4.0 \text{ m/s}$, River width ($W$) = $100 \text{ m}$, Current speed ($v_{WG}$) = $2.0 \text{ m/s}$.
*   Boat's heading: Perpendicular to the current.
*   Wanted: Resultant velocity relative to the shore ($\vec{v}_{BG}$), and downstream displacement ($\Delta x$).

**Solution:**
Let's define a coordinate system:
*   +y-direction: Directly across the river (where the boat is heading).
*   +x-direction: Downstream (direction of the current).

The given velocities are:
*   $\vec{v}_{BW} = (0 \hat{i} + 4.0 \hat{j}) \text{ m/s}$ (Boat relative to Water, heading straight across)
*   $\vec{v}_{WG} = (2.0 \hat{i} + 0 \hat{j}) \text{ m/s}$ (Water relative to Ground, current flows downstream)

We want to find the boat's velocity relative to the ground ($\vec{v}_{BG}$).
$$\vec{v}_{BG} = \vec{v}_{BW} + \vec{v}_{WG}$$
*This is the fundamental vector addition for river-boat problems.*

Substitute the component forms of the vectors:
$$\vec{v}_{BG} = (0 \hat{i} + 4.0 \hat{j}) + (2.0 \hat{i} + 0 \hat{j})$$
*Substitute the x and y components for each velocity vector.*

$$\vec{v}_{BG} = (0 + 2.0) \hat{i} + (4.0 + 0) \hat{j}$$
*Group the x-components and y-components for addition.*

$$\vec{v}_{BG} = (2.0 \hat{i} + 4.0 \hat{j}) \text{ m/s}$$
*The resultant velocity vector in component form.*

Now, find the magnitude of $\vec{v}_{BG}$:
$$|\vec{v}_{BG}| = \sqrt{v_{BG,x}^2 + v_{BG,y}^2}$$
*Use the Pythagorean theorem to find the magnitude of the resultant velocity.*

$$|\vec{v}_{BG}| = \sqrt{(2.0 \text{ m/s})^2 + (4.0 \text{ m/s})^2}$$
*Substitute the x and y components of $\vec{v}_{BG}$.*

$$|\vec{v}_{BG}| = \sqrt{4.0 \text{ m}^2/\text{s}^2 + 16.0 \text{ m}^2/\text{s}^2}$$
*Calculate the squares.*

$$|\vec{v}_{BG}| = \sqrt{20.0 \text{ m}^2/\text{s}^2}$$
*Sum the terms under the square root.*

$$|\vec{v}_{BG}| \approx 4.47 \text{ m/s}$$
*Calculate the square root.*

Next, find the direction of $\vec{v}_{BG}$ (angle $\theta$ relative to the x-axis, downstream):
$$\theta = \arctan\left(\frac{v_{BG,y}}{v_{BG,x}}\right)$$
*Use the inverse tangent function to find the angle of the resultant vector.*

$$\theta = \arctan\left(\frac{4.0 \text{ m/s}}{2.0 \text{ m/s}}\right)$$
*Substitute the y and x components of $\vec{v}_{BG}$.*

$$\theta = \arctan(2.0)$$
*Simplify the ratio.*

$$\theta \approx 63.4^\circ$$
*Calculate the angle.*

The resultant velocity of the boat relative to the shore is $\boxed{\textbf{4.47 m/s at 63.4}^\circ \textbf{ from downstream towards across-river}}$. (Or $63.4^\circ$ North of East, if East is downstream and North is across).

Now, let's find how far downstream the boat lands.
The time to cross the river depends only on the velocity component perpendicular to the river banks (the y-component).
$$t = \frac{\text{River Width}}{v_{BG,y}}$$
*The time to cross is the distance across divided by the velocity component in the direction of crossing.*

$$t = \frac{100 \text{ m}}{4.0 \text{ m/s}}$$
*Substitute the river width and the y-component of the boat's velocity relative to the ground.*

$$t = 25 \text{ s}$$
*Calculate the time.*

During this time, the current carries the boat downstream. The downstream displacement ($\Delta x$) depends on the velocity component parallel to the river banks (the x-component).
$$\Delta x = v_{BG,x} \cdot t$$
*The downstream displacement is the downstream velocity component multiplied by the time spent crossing.*

$$\Delta x = (2.0 \text{ m/s}) \cdot (25 \text{ s})$$
*Substitute the x-component of $\vec{v}_{BG}$ and the calculated time.*

$$\Delta x = 50 \text{ m}$$
*Calculate the displacement.*

The boat lands $\boxed{\textbf{50 m downstream}}$ from its starting point directly across the river.

**Reflection:** This problem perfectly illustrates 2D vector addition. The key is to realize that the boat's actual motion is a combination of its effort to cross and the river's effort to carry it downstream. The time to cross is independent of the current, but the landing spot is not.

---

### Example 4: 2D - River-Boat Problem (Crossing Straight)

**Problem Statement:** A river is $80 \text{ m}$ wide and flows at $3.0 \text{ m/s}$. A boat can travel at $5.0 \text{ m/s}$ in still water.
a) In what direction must the boat head to cross the river directly to a point on the opposite bank straight across from its starting point?
b) How long will it take to cross the river in this manner?

**Identify Given and Wanted:**
*   Given: River width ($W$) = $80 \text{ m}$, Current speed ($v_{WG}$) = $3.0 \text{ m/s}$, Boat speed in still water ($v_{BW}$) = $5.0 \text{ m/s}$.
*   Goal: Cross directly across.
*   Wanted: Heading angle ($\theta$) and time ($t$).

**Solution:**
Let's define a coordinate system:
*   +y-direction: Directly across the river.
*   +x-direction: Downstream (direction of the current).

The boat wants to cross *directly across*, meaning its resultant velocity relative to the ground ($\vec{v}_{BG}$) must have *no x-component*.
So, $\vec{v}_{BG} = (0 \hat{i} + v_{BG,y} \hat{j})$.

The given velocities are:
*   $\vec{v}_{WG} = (3.0 \hat{i} + 0 \hat{j}) \text{ m/s}$ (Water relative to Ground, current is downstream).
*   $\vec{v}_{BW}$: This is the boat's velocity relative to the water. Its magnitude is $5.0 \text{ m/s}$, but its direction (heading) is unknown. Let's say it heads at an angle $\theta$ upstream from the y-axis.
    So, $\vec{v}_{BW} = (v_{BW} \sin\theta_{\text{upstream}}) \hat{i} + (v_{BW} \cos\theta_{\text{upstream}}) \hat{j}$.
    Or, if $\theta$ is measured from the positive x-axis (standard angle), then $\vec{v}_{BW} = (v_{BW} \cos\theta) \hat{i} + (v_{BW} \sin\theta) \hat{j}$. Let's use the latter for consistency, so $\theta$ will be greater than $90^\circ$.

The fundamental equation is:
$$\vec{v}_{BG} = \vec{v}_{BW} + \vec{v}_{WG}$$
*This equation relates the boat's actual path to its effort and the current.*

Substitute the component forms:
$$(0 \hat{i} + v_{BG,y} \hat{j}) = (v_{BW} \cos\theta \hat{i} + v_{BW} \sin\theta \hat{j}) + (v_{WG} \hat{i} + 0 \hat{j})$$
*Substitute the components for each vector. Note $v_{BG,x}$ is 0 because we want to cross straight.*

$$(0 \hat{i} + v_{BG,y} \hat{j}) = (v_{BW} \cos\theta + v_{WG}) \hat{i} + (v_{BW} \sin\theta) \hat{j}$$
*Combine the x-components and y-components on the right side.*

Now, equate the x-components and y-components on both sides:

**x-component equation:**
$$0 = v_{BW} \cos\theta + v_{WG}$$
*The x-component of the resultant velocity must be zero for the boat to cross straight.*

$$0 = (5.0 \text{ m/s}) \cos\theta + (3.0 \text{ m/s})$$
*Substitute the magnitudes of the boat's speed in still water and the current speed.*

$$(5.0 \text{ m/s}) \cos\theta = -3.0 \text{ m/s}$$
*Rearrange the equation to isolate the cosine term.*

$$\cos\theta = -\frac{3.0}{5.0}$$
*Solve for $\cos\theta$. The negative sign indicates an angle in the second quadrant, which means heading upstream.*

$$\cos\theta = -0.6$$
*Calculate the value.*

$$\theta = \arccos(-0.6)$$
*Use the inverse cosine function to find the angle.*

$$\theta \approx 126.87^\circ$$
*Calculate the angle. This angle is measured counter-clockwise from the positive x-axis (downstream). So, $126.87^\circ$ from downstream is equivalent to $180^\circ - 126.87^\circ = 53.13^\circ$ upstream from the directly across direction.*

The boat must head $\boxed{\textbf{53.1}^\circ \textbf{ upstream from the direction directly across the river}}$. (Or $126.87^\circ$ from the downstream direction).

**y-component equation:**
$$v_{BG,y} = v_{BW} \sin\theta$$
*The y-component of the boat's velocity relative to the ground is what actually moves it across the river.*

$$v_{BG,y} = (5.0 \text{ m/s}) \sin(126.87^\circ)$$
*Substitute the boat's speed in still water and the calculated heading angle.*

$$v_{BG,y} = (5.0 \text{ m/s}) (0.8)$$
*Calculate $\sin(126.87^\circ) \approx 0.8$.*

$$v_{BG,y} = 4.0 \text{ m/s}$$
*This is the effective speed of the boat directly across the river.*

**b) Time to cross:**
$$t = \frac{\text{River Width}}{v_{BG,y}}$$
*The time to cross is the river width divided by the effective velocity component perpendicular to the flow.*

$$t = \frac{80 \text{ m}}{4.0 \text{ m/s}}$$
*Substitute the river width and the calculated effective crossing speed.*

$$t = 20 \text{ s}$$
*Calculate the time.*

It will take $\boxed{\textbf{20 s}}$ to cross the river in this manner.

**Reflection:** This problem is harder because the unknown is an angle, and it requires setting one component of the resultant velocity to zero. It highlights how to use vector components to solve for unknown directions. The boat has to "fight" the current by aiming upstream.

---

## 6. Common mistakes and traps

Students frequently stumble on relative motion problems due to several recurring errors:

1.  **Confusing Reference Frames:** The most common mistake is mixing up which velocity belongs to which frame. For example, in river problems, confusing $\vec{v}_{BW}$ (boat relative to water) with $\vec{v}_{BG}$ (boat relative to ground). Always write out the subscripts carefully!
2.  **Scalar vs. Vector Addition:** In 2D problems, students sometimes incorrectly add or subtract *magnitudes* of velocities instead of performing proper *vector* addition. For instance, if a boat heads straight across a river with current, the resultant speed is found using Pythagoras, not simple addition.
3.  **Sign Errors in 1D:** When dealing with 1D motion, failing to consistently define a positive direction and apply negative signs to velocities in the opposite direction leads to incorrect results.
4.  **Misinterpreting "Velocity of A relative to B":** Some students instinctively think "relative to" means adding velocities, especially when objects are moving towards each other. Remember the fundamental $v_{A/B} = v_A - v_B$ (or its vector equivalent $\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}$).
5.  **Incorrect Component Resolution:** When resolving vectors into x and y components, errors often occur with sine and cosine, especially if the angle isn't measured from the standard positive x-axis. Always draw a diagram!
6.  **Time Calculation in River Problems:** Assuming the time to cross a river is affected by the river's current in the direction *parallel* to the banks. The time to cross is solely determined by the component of the boat's velocity that is *perpendicular* to the banks and the river's width.

## 7. Textbook-precise explanation

In physics, the concept of relative motion is formally described by **Galilean transformations** for velocities in classical mechanics.

Consider two inertial reference frames, $S$ and $S'$. Frame $S'$ moves with a constant velocity $\vec{V}$ relative to frame $S$. Let an object $P$ have a velocity $\vec{v}$ as measured in frame $S$, and a velocity $\vec{v}'$ as measured in frame $S'$.

If the position vector of the object $P$ as measured in frame $S$ is $\vec{r}$, and its position vector as measured in frame $S'$ is $\vec{r}'$, then the relationship between these position vectors is given by:
$$\vec{r} = \vec{r}' + \vec{R}$$
where $\vec{R}$ is the position vector of the origin of frame $S'$ as measured from the origin of frame $S$.

Assuming $\vec{V}$ is the constant velocity of frame $S'$ relative to frame $S$, then $\vec{R} = \vec{V}t$ (if origins coincide at $t=0$).
Differentiating the position equation with respect to time $t$ (which is assumed to be the same in both frames in classical mechanics), we obtain the Galilean velocity transformation:
$$\frac{d\vec{r}}{dt} = \frac{d\vec{r}'}{dt} + \frac{d\vec{R}}{dt}$$
$$\vec{v} = \vec{v}' + \vec{V}$$

Using our previous notation, this can be re-expressed as:
Let $A$ be the object (P), $C$ be frame $S$, and $B$ be frame $S'$.
Then $\vec{v}$ is the velocity of $A$ relative to $C$ ($\vec{v}_{A/C}$).
$\vec{v}'$ is the velocity of $A$ relative to $B$ ($\vec{v}_{A/B}$).
$\vec{V}$ is the velocity of $B$ relative to $C$ ($\vec{v}_{B/C}$).

Thus, the Galilean velocity transformation is:
$$\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}$$
This fundamental vector addition rule holds true for all classical (non-relativistic) relative motion problems, whether in 1D, 2D, or 3D. It is a cornerstone of classical kinematics, allowing us to relate observations made from different inertial reference frames.

For further reading, consult:
*   **Halliday, Resnick, Walker, *Fundamentals of Physics*, 11th Edition, Chapter 4, Section 4.6 "Relative Motion in One Dimension" and Section 4.7 "Relative Motion in Two Dimensions".**
*   **Serway & Jewett, *Physics for Scientists and Engineers*, 10th Edition, Chapter 4, Section 4.6 "Relative Motion".**

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the 2D river-boat problem, specifically the scenario where the boat wants to cross directly across.

```text
                                  +y (Across River)
                                  ^
                                  |
                                  | Boat's actual path (v_BG)
                                  | should be purely in +y direction
                                  |
               Shore B            |                               Shore A
  --------------------------------|------------------------------------
                                  |
                                  |
        <-------------------------|-------------------------
        ^                         |                         ^
        |                         |                         |
        |                         |                         |
        |                         |                         |
        |                         |                         |
        | v_BW (Boat's Heading)   |                         | River Width (W)
        | (Magnitude 5.0 m/s)     |                         |
        |                         |                         |
        |                         |                         |
        |    ^                    |                         |
        |    | \                  |                         |
        |    |  \                 |                         |
        |    |   \                |                         |
        |    |    \               |                         |
        |    |     \ Angle theta  |                         |
        |    |      \             |                         |
        |    |       \            |                         |
        |    |        \           |                         |
        |    |         \          |                         |
        |    |          \         |                         |
        |    |           \        |                         |
        |    |            \       |                         |
        |    |             \      |                         |
        |    |              \     |                         |
        |    |               \    |                         |
        |    |                \   |                         |
        |    |                 \  |                         |
        |    |                  \ |                         |
        |    |                   \|                         |
        |    +--------------------X-------------------------> +x (Downstream)
        |                         ^
        |                         |
        |                         | v_WG (River Current)
        |                         | (Magnitude 3.0 m/s)
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        |                         |
        