## What it is
Relative motion is the analysis of an object's motion as measured from a different, possibly moving, point of view, known as a reference frame. Instead of describing motion relative to a fixed point on the ground, we might describe it relative to a moving train, a flowing river, or another spacecraft. The core task is to translate motion from one reference frame to another.

## Why it matters
This concept is not academic; it is fundamental to navigation and targeting. In aerospace, calculating the trajectory for a spacecraft to dock with the ISS requires precise relative velocity calculations. In physics, Einstein's theory of Special Relativity is a profound extension of this principle, exploring how observations of space and time change between reference frames moving at speeds near the speed of light.

## When to study it
Before tackling this, you must have a firm command of vector algebra and kinematics. Specifically, ensure you are fluent in:
- **Vector Addition and Subtraction:** Both graphically (head-to-tail method) and using components.
- **Vector Components:** Resolving a vector into its perpendicular components (e.g., $x$ and $y$).
- **Basic Kinematics:** The definitions of position ($\vec{r}$), velocity ($\vec{v} = d\vec{r}/dt$), and acceleration ($\vec{a} = d\vec{v}/dt$) as vector quantities.

If you are not confident with these, master them first. Relative motion is an application of these tools.

## How to study it (step by step)
1.  **Master the Subscript Notation (15 min):** The notation is the key to organizing your thoughts. Let $\vec{v}_{A/B}$ denote the "velocity of A relative to B". Practice writing down relationships like $\vec{v}_{\text{car/road}}$, $\vec{v}_{\text{passenger/car}}$, and $\vec{v}_{\text{passenger/road}}$.
2.  **Derive the 1D Equation (15 min):** Consider two cars, A and B, moving along a straight road. Let their positions relative to a fixed point (the ground, G) be $x_A$ and $x_B$. The position of B relative to A is $x_{B/A} = x_B - x_A$. Differentiate this with respect to time to get the relative velocity equation in 1D: $v_{B/A} = v_B - v_A$. Solve several simple "car on a highway" problems until this is second nature.
3.  **Generalize to 2D Vectors (20 min):** Replace the 1D positions with position vectors: $\vec{r}_{P/A} = \vec{r}_{P/G} - \vec{r}_{A/G}$, where P is a particle, A is one reference frame, and G is the "ground" or absolute frame. Differentiate to get the fundamental equation: $\vec{v}_{P/A} = \vec{v}_{P/G} - \vec{v}_{A/G}$. Rearrange this into the more intuitive addition form: $\vec{v}_{P/G} = \vec{v}_{P/A} + \vec{v}_{A/G}$.
4.  **Solve a Classic River-Boat Problem (30 min):** Take the canonical problem: a boat crossing a river with a current. Identify the three key vectors: $\vec{v}_{\text{boat/water}}$, $\vec{v}_{\text{water/ground}}$, and $\vec{v}_{\text{boat/ground}}$. Use the vector addition equation from step 3 to solve for an unknown, such as the time to cross or the landing position downstream. Focus on the independence of perpendicular motion components.
5.  **Solve a Problem Requiring an Angle (30 min):** Tackle a problem where the goal is to travel in a specific direction (e.g., "straight across the river"). This requires you to orient the $\vec{v}_{\text{boat/water}}$ vector at an angle upstream to counteract the current. This solidifies your understanding of how the vector triangle works.

## Key ideas, with intuition
1.  **The Subscript Chain Rule:** The core equation for translating between frames is $\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}$. Intuitively, this says "the velocity of A relative to C is found by first seeing how A moves relative to B, and then adding how B moves relative to C." Notice how the "inner" subscripts (B) must match. This is your primary tool.

2.  **All Motion is Relative:** There is no absolute "velocity," only velocity *relative to* a specified frame of reference. When we say a car's speed is 100 km/h, we implicitly mean "relative to the ground." This concept forces you to be precise about your observer.

3.  **Perpendicular Components are Independent:** This is a crucial insight for 2D problems. The time it takes for a boat to cross a river depends *only* on the component of its velocity perpendicular to the river banks. The river's current affects *where* it lands downstream, but not the *time* it takes to get to the other side.
    $$ t_{cross} = \frac{\text{width of river}}{\left( v_{\text{boat/water}} \right)_{\perp}} $$
    The downstream drift is then:
    $$ d_{\text{drift}} = \left( v_{\text{water/ground}} \right) \times t_{cross} $$

## Worked example
**Problem:** A boat's engine propels it at a speed of 4 m/s in still water. The boat needs to cross a river 80 m wide. The river flows downstream at 3 m/s. If the boat points directly across the river (perpendicular to the current), (a) what is the boat's velocity relative to the ground? (b) How long does it take to cross? (c) How far downstream does it land?

**Solution:**
1.  **Define Frames and Vectors:**
    - Ground frame (G): The river bank.
    - Water frame (W): The moving water.
    - Boat (B): The object of interest.
    - We are given:
        - Speed of boat relative to water, $|\vec{v}_{B/W}| = 4$ m/s. Its direction is across the river. Let's set up a coordinate system: $+y$ is across the river, $+x$ is downstream. So, $\vec{v}_{B/W} = 4 \hat{j}$ m/s.
        - Velocity of water relative to ground, $\vec{v}_{W/G} = 3 \hat{i}$ m/s.
    - We want to find $\vec{v}_{B/G}$, the velocity of the boat relative to the ground.

2.  **Apply the Relative Velocity Equation:**
    The core equation is $\vec{v}_{B/G} = \vec{v}_{B/W} + \vec{v}_{W/G}$.
    Substituting the known vectors:
    $$ \vec{v}_{B/G} = (4 \hat{j}) \text{ m/s} + (3 \hat{i}) \text{ m/s} = (3 \hat{i} + 4 \hat{j}) \text{ m/s} $$
    This is the answer to (a). The boat moves in a diagonal path relative to the bank. The magnitude is $|\vec{v}_{B/G}| = \sqrt{3^2 + 4^2} = 5$ m/s. The direction is $\theta = \arctan(4/3) \approx 53.1^\circ$ relative to the river bank.

3.  **Calculate Crossing Time:**
    The time to cross depends only on the distance in the $y$-direction (width) and the velocity component in the $y$-direction.
    - Width $W = 80$ m.
    - $y$-component of velocity relative to ground is $(v_{B/G})_y = 4$ m/s.
    $$ t = \frac{W}{(v_{B/G})_y} = \frac{80 \text{ m}}{4 \text{ m/s}} = 20 \text{ s} $$
    This is the answer to (b).

4.  **Calculate Downstream Drift:**
    The drift depends only on the time spent in the water and the velocity component in the $x$-direction (the current).
    - Time $t = 20$ s.
    - $x$-component of velocity relative to ground is $(v_{B/G})_x = 3$ m/s.
    $$ d = (v_{B/G})_x \times t = (3 \text{ m/s}) \times (20 \text{ s}) = 60 \text{ m} $$
    This is the answer to (c).

**Reflection:** Each step isolated a specific physical principle. Step 1 established a clear, unambiguous coordinate system and notation. Step 2 used the core vector addition formula. Steps 3 and 4 demonstrated the crucial principle of the independence of perpendicular motion components, which simplified the problem into two separate 1D kinematics calculations.

## Diagrams
Here is the vector addition diagram for the worked example.

```text
        ^ y (across river)
        |
        |-----> v_B/G (velocity of Boat wrt Ground)
        |    /
        |   /
 v_B/W  |  /  (velocity of Boat wrt Water)
 (4 m/s)| /
        |/
(start) O---------------> x (downstream)
           v_W/G
           (3 m/s)
           (velocity of Water wrt Ground)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of the subscripts as a journey. To find the velocity of a **P**assenger relative to the **G**round ($\vec{v}_{P/G}$), you first find the velocity of the **P**assenger relative to the **T**rain ($\vec{v}_{P/T}$) and add the velocity of the **T**rain relative to the **G**round ($\vec{v}_{T/G}$). The "waypoints" must connect: $\vec{v}_{P/G} = \vec{v}_{P/\underline{T}} + \vec{v}_{\underline{T}/G}$. The inner subscripts match and "cancel out".

2.  **Must-Know Formulas:** Overlearn these two equivalent forms.
    - **Addition Form:** $\vec{v}_{A/C} = \vec{v}_{A/B} + \vec{v}_{B/C}$ (for composing motion)
    - **Subtraction Form:** $\vec{v}_{A/B} = \vec{v}_{A/C} - \vec{v}_{B/C}$ (for finding motion relative to another moving object, when both are known in a common frame C, usually the Ground).

3.  **Spaced Repetition Schedule:** Redo a river-boat problem from scratch (without looking at your notes) at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget the formulas, draw the vectors. Start with the physical situation. The velocity of the object with respect to the ground is the vector sum of its motion relative to the medium (air, water) plus the medium's motion relative to the ground. This physical reasoning will allow you to re-derive the vector triangle and the component equations every time.

## Common mistakes
1.  **Scalar Addition:** Adding speeds instead of velocities. A plane flying at 500 km/h in a 100 km/h tailwind has a ground speed of 600 km/h. A plane in a 100 km/h crosswind does *not* have a ground speed of 600 km/h. You must use vector addition: $|\vec{v}_{P/G}| = \sqrt{500^2 + 100^2}$.
2.  **Incorrect Subscripts:** Writing $\vec{v}_{A/B} = \vec{v}_{B/A}$. Remember they are anti-parallel: $\vec{v}_{A/B} = -\vec{v}_{B/A}$. The velocity of you relative to the train is the opposite of the velocity of the train relative to you.
3.  **Confusing "Pointing" vs. "Traveling":** The direction a boat/plane is "pointed" or "aimed" corresponds to its velocity relative to the medium ($\vec{v}_{\text{boat/water}}$). The direction it actually "travels" or "moves" is its velocity relative to the ground ($\vec{v}_{\text{boat/ground}}$).

## Self-check
1.  A train moves east at 30 m/s. A passenger walks towards the front of the train at 2 m/s relative to the train. What is the passenger's velocity relative to the ground? Now, what if they walk towards the back of the train at 2 m/s?
2.  A kayaker can paddle at 2 m/s in still water. They want to cross a 100 m wide river that flows at 1 m/s. If they point their kayak straight across, how long does it take them to reach the other side, and where do they land?
3.  An airplane has an airspeed of 200 km/h. The pilot wants to fly directly north, but there is a wind blowing from west to east at 50 km/h. In what direction (as a bearing or angle west of north) must the pilot point the plane? What will be the plane's resulting speed relative to the ground?