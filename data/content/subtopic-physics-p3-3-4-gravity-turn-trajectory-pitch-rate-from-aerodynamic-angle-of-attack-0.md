## What it is
A gravity turn is a trajectory shaping maneuver where a rocket uses the force of gravity to change its flight path angle from vertical to horizontal. The specific case of a zero-lift gravity turn, where the aerodynamic angle of attack is maintained at zero ($\alpha=0$), is a flight profile where the rocket's body is always perfectly aligned with its velocity vector. This means gravity is the *only* force available to turn the vehicle's trajectory.

## Why it matters
This is the fundamental ascent trajectory for nearly all launch vehicles. Flying at $\alpha=0$ minimizes aerodynamic stress on the rocket's structure, preventing it from breaking apart under high dynamic pressure. Understanding this concept is critical for designing ascent guidance algorithms, predicting vehicle performance, and optimizing payload capacity.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Newton's Second Law ($\vec{F}=m\vec{a}$)** in vector form.
*   **Kinematics in Curvilinear Coordinates:** Specifically, how to express acceleration in a coordinate system that moves and rotates with the vehicle (path coordinates), where acceleration has a tangential component ($\dot{v}$) and a normal component ($v\dot{\gamma}$).
*   **Forces on a Rocket:** A clear understanding of Thrust ($T$), Drag ($D$), Lift ($L$), and Weight ($mg$).
*   **Flight Angles:** The definitions of and relationship between pitch angle ($\theta$), flight path angle ($\gamma$), and angle of attack ($\alpha$). If $\alpha = \theta - \gamma$ is not second nature, review it first.

## How to study it (step by step)
1.  **Draw the Diagram.** Sketch a rocket in ascent. Draw the local horizontal, the velocity vector $\vec{v}$ at an angle $\gamma$ (flight path angle) to the horizontal, and the rocket's thrust vector $\vec{T}$ aligned with $\vec{v}$. Add the drag vector $\vec{D}$ opposing $\vec{v}$ and the gravity vector $\vec{mg}$ pointing straight down.
2.  **Establish the Coordinate System.** Use a path coordinate system. The "tangential" or "e-hat" axis ($\hat{e}_t$) points along the velocity vector $\vec{v}$. The "normal" or "n-hat" axis ($\hat{e}_n$) is perpendicular to $\vec{v}$, pointing towards the center of the trajectory's curvature.
3.  **Write Newton's Second Law.** Decompose the forces into components along the tangential and normal axes.
    *   $\sum F_t = T - D - mg\sin\gamma = m\dot{v}$
    *   $\sum F_n = L - mg\cos\gamma = mv\dot{\gamma}$
4.  **Apply the Core Constraint.** The entire premise is a zero-lift turn, so set the angle of attack $\alpha=0$. This has two consequences:
    *   The lift force $L=0$, since lift is proportional to $\alpha$ for small angles.
    *   The pitch angle equals the flight path angle, $\theta = \gamma$. Therefore, the pitch rate equals the flight path angle rate, $\dot{\theta} = \dot{\gamma}$.
5.  **Isolate the Turning Equation.** With $L=0$, the equation for the normal direction simplifies dramatically. This equation describes how the velocity vector *turns*.
    $$ -mg\cos\gamma = mv\dot{\gamma} $$
6.  **Solve for the Pitch Rate.** Solve the simplified equation for $\dot{\gamma}$, which we know is the required pitch rate $\dot{\theta}$.
    $$ \dot{\gamma} = -\frac{g}{v}\cos\gamma $$
7.  **Analyze the Result.** This equation tells you the exact rate you must pitch the rocket down to keep its nose aligned with the airflow. Notice it depends only on gravity, velocity, and the current flight path angle.

## Key ideas, with intuition
*   **Gravity is the Steering Wheel.** In a zero-lift turn, there are no aerodynamic forces pushing the rocket sideways. Thrust and drag are aligned with the velocity. The *only* force left with a component perpendicular to the flight path is gravity. Gravity is what pulls the trajectory curve downwards.
*   **Flying Like a Dart ($\alpha=0$).** The condition $\alpha=0$ means the rocket presents the smallest possible cross-section to the oncoming air and experiences no side-loading (lift). This is the most structurally sound way to fly through the dense lower atmosphere. It means the rocket's attitude control system must actively adjust the pitch angle $\theta$ to perfectly match the flight path angle $\gamma$ as it changes.
    $$ \alpha = \theta - \gamma \implies \text{if } \alpha = 0, \text{ then } \theta = \gamma \text{ and } \dot{\theta} = \dot{\gamma} $$
*   **The Turning Equation is a Force Balance.** The expression $mv\dot{\gamma}$ is the centripetal force required to make the vehicle follow a curved path. The equation for the gravity turn simply states that the component of gravity perpendicular to the path provides this required centripetal force.
    $$ \underbrace{-mg\cos\gamma}_{\text{Force available for turning}} = \underbrace{mv\dot{\gamma}}_{\text{Force required for turning}} $$
*   **Faster Means Slower Turning.** The required pitch rate $\dot{\gamma}$ is inversely proportional to velocity $v$. This is intuitive: a very fast-moving object is harder to deflect. To achieve the same change in direction, a faster rocket needs to travel a longer distance, resulting in a slower rate of turn.

## Worked example
A Falcon 9 rocket is passing through an altitude of 30 km. Its velocity is $v = 1500 \text{ m/s}$, its mass is $m = 250,000 \text{ kg}$, and its flight path angle is $\gamma = 45^\circ$. Assume the local acceleration due to gravity is $g = 9.7 \text{ m/s}^2$. What pitch rate must the guidance system command to maintain a zero-lift gravity turn?

**Step 1: Identify the governing equation.**
The required pitch rate $\dot{\theta}$ to maintain $\alpha=0$ is equal to the rate of change of the flight path angle, $\dot{\gamma}$. We derived the expression for this:
$$ \dot{\gamma} = -\frac{g}{v}\cos\gamma $$

**Step 2: Substitute the known values.**
We are given:
*   $g = 9.7 \text{ m/s}^2$
*   $v = 1500 \text{ m/s}$
*   $\gamma = 45^\circ$

$$ \dot{\gamma} = -\frac{9.7 \text{ m/s}^2}{1500 \text{ m/s}}\cos(45^\circ) $$

**Step 3: Calculate the result.**
Recall that $\cos(45^\circ) = \frac{\sqrt{2}}{2} \approx 0.707$.

$$ \dot{\gamma} \approx -\frac{9.7}{1500} \times 0.707 $$
$$ \dot{\gamma} \approx -0.00647 \times 0.707 $$
$$ \dot{\gamma} \approx -0.00457 \text{ rad/s} $$

To convert to degrees per second for better intuition:
$$ \dot{\gamma} \approx -0.00457 \frac{\text{rad}}{\text{s}} \times \frac{180^\circ}{\pi \text{ rad}} \approx -0.262 \text{ deg/s} $$

**Reflection:**
*   The equation directly relates the physical parameters ($g, v, \gamma$) to the required control action ($\dot{\gamma}$).
*   The negative sign confirms our intuition: the rocket must be pitching *downward* to curve its trajectory towards the horizontal.
*   The magnitude is small (about a quarter of a degree per second), which is typical for a high-velocity ascent phase. The turn is gradual and efficient.

## Diagrams
A diagram showing the angles and coordinate system:
```text
           ^ Rocket Body Axis (Thrust T)
          /
         /
        / θ
       /__________________> Velocity Vector v
      / α    (e_t axis)
     /
    / γ
___/______________________ Local Horizontal

α = θ - γ
For a gravity turn, α = 0, so θ = γ.
```

A diagram showing the force decomposition in path coordinates:
```text
                 ^ e_n (Normal)
                 |
                 |
                 |
                 +----------------> e_t (Tangential, along v)
                /|
               / |
              /  |
             /   |
            /    | mg*cos(γ)
           / γ   |
          /______|
         v mg
      (Gravity)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**G**ravity **C**urves the **V**ehicle." The letters give you the terms in the formula: **G** ($g$), **C** ($\cos\gamma$), and **V** ($v$). The pitch rate $\dot{\gamma}$ is just $g$ times $\cos\gamma$ over $v$. The negative sign comes from the fact that gravity pulls you *down*, decreasing your flight path angle.

2.  **Formula to Overlearn:**
    $$ \dot{\gamma} = -\frac{g}{v}\cos\gamma $$

3.  **Spaced Repetition Schedule:** Review this derivation and formula at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Set a calendar reminder.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Start with $\sum \vec{F} = m\vec{a}$.
    *   Choose path coordinates. The acceleration's normal component is $a_n = v\dot{\gamma}$.
    *   Sum forces in the normal direction: $\sum F_n = mv\dot{\gamma}$.
    *   For a zero-lift gravity turn, the only force with a normal component is gravity: $F_{n, \text{gravity}} = -mg\cos\gamma$.
    *   Set them equal: $-mg\cos\gamma = mv\dot{\gamma}$. Solve for $\dot{\gamma}$.

## Common mistakes
*   **Angle Confusion:** Mixing up pitch angle $\theta$ and flight path angle $\gamma$. Remember, they are only equal *because* we enforce the $\alpha=0$ condition. The physics governs $\dot{\gamma}$, and the control system makes $\dot{\theta}$ match it.
*   **Forgetting the `cos(γ)`:** The turning force is not the full weight of the rocket, only the component perpendicular to the velocity vector. At liftoff, $\gamma=90^\circ$ and $\cos(90^\circ)=0$, so gravity cannot turn the vehicle at all—it only slows it down.
*   **Sign Error:** Getting a positive pitch rate. During ascent, the rocket is pitching over from vertical ($\gamma=90^\circ$) to horizontal ($\gamma=0^\circ$), so $\gamma$ must be decreasing, and its rate $\dot{\gamma}$ must be negative.
*   **Ignoring Velocity:** Thinking the pitch rate is constant. The formula clearly shows that as velocity $v$ increases dramatically during ascent, the required pitch rate $\dot{\gamma}$ decreases. The turn is fastest at the beginning (after the initial vertical climb) and becomes very gradual at high speeds.

## Self-check
1.  A rocket is flying perfectly vertically ($\gamma=90^\circ$). What is the required pitch rate to maintain a zero-lift gravity turn at this instant? What does this imply about how a gravity turn must be initiated?
2.  Two rockets are at the same point in space with the same velocity $v$ and local gravity $g$. Rocket A has a flight path angle of $\gamma_A = 30^\circ$. Rocket B is much further along in its turn, with $\gamma_B = 60^\circ$. Which rocket is experiencing a stronger "turning pull" from gravity, and which one has a larger magnitude of required pitch rate?
3.  How would the derivation for $\dot{\gamma}$ change if we included the centrifugal force term for a vehicle orbiting a spherical planet? The centrifugal acceleration is $\frac{v^2}{R+h}$ (where $R$ is planet radius, $h$ is altitude) and it points radially outward. How would this term be projected onto the normal axis $\hat{e}_n$?