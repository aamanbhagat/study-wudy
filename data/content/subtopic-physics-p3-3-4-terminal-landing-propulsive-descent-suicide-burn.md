## What it is
A suicide burn, or burn-to-touchdown, is a propulsive landing maneuver where a rocket fires its engine at the latest possible moment and at maximum throttle. The goal is to achieve zero velocity at the exact moment the vehicle reaches zero altitude, ensuring a soft landing with the minimum possible fuel consumption.

## Why it matters
This maneuver is the cornerstone of reusable rocketry, as demonstrated by SpaceX and Blue Origin. It is the most fuel-efficient method for a powered descent because it minimizes *gravity losses*—the fuel wasted simply fighting gravity to hover or slow down over an extended period. Mastering this concept is essential for designing guidance, navigation, and control (GNC) systems for any landing vehicle, from planetary probes to reusable boosters.

## When to study it
You must have a solid grasp of the following before proceeding:
- Newton's Second Law ($F_{net} = ma$).
- 1D Kinematics under constant acceleration (the "SUVAT" equations, e.g., $v_f^2 = v_i^2 + 2ad$).
- The concept of a Free Body Diagram to identify all forces acting on an object.
- A basic understanding of gravitational acceleration ($g$).

If you are comfortable deriving and applying these, you are ready.

## How to study it (step by step)
1.  **Draw the System.** Start with a Free Body Diagram of the descending rocket during the landing burn. Identify the two primary forces: the upward thrust ($T$) and the downward force of gravity ($mg$).
2.  **Write the Equation of Motion.** Apply Newton's Second Law in the vertical direction. Define a coordinate system (e.g., up is positive). The net force is $F_{net} = T - mg$, so the net acceleration is $a_{net} = \frac{T}{m} - g$.
3.  **Identify the Goal State.** A successful landing means the final velocity $v_f$ is zero when the final altitude $h_f$ is zero. The burn starts at some initial altitude $h_{burn}$ with an initial downward velocity $v_i$.
4.  **Select the Right Tool.** From your constant acceleration kinematic equations, choose the one that relates initial velocity, final velocity, acceleration, and distance, without involving time: $v_f^2 = v_i^2 + 2a\Delta y$. This is the most direct path to the solution.
5.  **Solve for the Burn Altitude.** Substitute your knowns into the kinematic equation: $v_f = 0$, $a = a_{net}$, and the displacement $\Delta y = h_f - h_i = 0 - h_{burn} = -h_{burn}$. Solve for $h_{burn}$.
6.  **Analyze the Result.** Contemplate what the resulting formula for $h_{burn}$ implies. How does it depend on initial velocity? On the rocket's thrust-to-weight ratio? This builds intuition beyond the mechanics of the derivation.

## Key ideas, with intuition
1.  **Minimizing Gravity Drag:** The core motivation for a suicide burn is to defeat "gravity drag" or "gravity losses." Every second your engine is firing, a portion of its thrust ($mg$) is used just to counteract gravity. By waiting until the last possible moment and firing at full power, you minimize the *time* spent fighting gravity, saving that fuel for useful deceleration. Think of it as ripping off a bandage: quick and efficient is better than slow and prolonged.

2.  **The Constant Acceleration Abstraction:** The simplest model assumes the net upward acceleration during the burn is constant.
    $$
    a_{net} = \frac{T}{m} - g
    $$
    This is a powerful simplification. It assumes thrust $T$ is constant (full throttle) and mass $m$ is constant (the fuel burned is negligible compared to the rocket's total mass). This allows us to use the simple high-school kinematic equations to find the exact moment to start the burn.

3.  **The Landing Condition as a Boundary Value Problem:** The problem is defined by its boundaries. We know the state *before* the burn (altitude $h_{burn}$, velocity $v_i$) and the desired state *after* the burn (altitude 0, velocity 0). The suicide burn is the trajectory that connects these two points in state space. The burn altitude is not arbitrary; it is the single value that makes a solution possible. Start higher, and you'll hover, wasting fuel. Start lower, and you form a new crater.

## Worked example
**Problem:** A Falcon 9 first stage is descending toward the droneship. Its velocity is $v_i = -90 \text{ m/s}$ (downward) when it is high above the ocean. Local gravity is $g = 9.81 \text{ m/s}^2$. During the landing burn, its engine provides a constant thrust $T$ such that the rocket's mass-normalized thrust is $T/m = 15 \text{ m/s}^2$. At what altitude must the rocket initiate the suicide burn?

**Solution:**

1.  **Define a coordinate system.** Let's define "up" as the positive direction. Therefore, the initial velocity is $v_i = -90 \text{ m/s}$, and gravitational acceleration is effectively $-9.81 \text{ m/s}^2$.

2.  **Calculate the net acceleration.** The rocket is subject to upward thrust and downward gravity.
    $$
    a_{net} = \frac{T}{m} - g = 15 \text{ m/s}^2 - 9.81 \text{ m/s}^2 = 5.19 \text{ m/s}^2
    $$
    This is the constant upward acceleration the rocket will experience during the burn.

3.  **Identify the kinematic variables.**
    - Initial velocity, $v_i = -90 \text{ m/s}$
    - Final velocity, $v_f = 0 \text{ m/s}$ (for a soft landing)
    - Net acceleration, $a_{net} = +5.19 \text{ m/s}^2$
    - We need to find the displacement, $\Delta y$.

4.  **Choose and apply the appropriate kinematic equation.** We use the time-independent equation:
    $$
    v_f^2 = v_i^2 + 2a_{net}\Delta y
    $$

5.  **Solve for the displacement.**
    $$
    0^2 = (-90 \text{ m/s})^2 + 2(5.19 \text{ m/s}^2)\Delta y
    $$
    $$
    0 = 8100 \text{ m}^2/\text{s}^2 + (10.38 \text{ m/s}^2)\Delta y
    $$
    $$
    \Delta y = - \frac{8100}{10.38} \approx -780.3 \text{ m}
    $$

6.  **Interpret the result.** The displacement $\Delta y$ is the change in position from the start of the burn to the end. Since the final altitude is 0, the initial altitude must be $h_{burn} = - \Delta y = 780.3 \text{ m}$. The burn must begin at an altitude of approximately 780 meters.

**Reflection:** Each step builds logically on the last. We started with fundamental forces (Step 2), used them to find the dynamics of the system ($a_{net}$), and then applied a kinematic rule (Step 4) to connect the initial state to the desired final state, revealing the required starting altitude.

## Diagrams
```text
1. Trajectory Profile                   2. Free Body Diagram (during burn)

h (altitude)                                     ^ Thrust (T)
^                                                |
|                                               +-+
|  <-- Coasting / Freefall (v becomes more neg) |R|
|                                               +-+
|                                                |
h_burn + . . . . . (Ignition)                    v Gravity (mg)
|      .
|      .  <-- Propulsive Deceleration (v -> 0)
|     .
h=0 ---+----------------> t (time)
       (Touchdown, v=0)
```

## Memory technique — remember this forever
1.  **The Story:** "The Cliff Jumper's Dilemma." Imagine you've jumped off a cliff, but you have a powerful jetpack. To survive, you must fire the jetpack at the last possible moment to land softly. Fire too soon, and you waste fuel hovering before you land. Fire too late, and you become a permanent geological feature. The suicide burn is calculating the exact altitude where the smart (but terrifying) cliff jumper fires their jetpack.

2.  **The Must-Know Formulas:**
    - Net Acceleration: $$a_{net} = \frac{T}{m} - g$$
    - Burn Altitude: $$h_{burn} = \frac{v_i^2}{2a_{net}} = \frac{v_i^2}{2(\frac{T}{m} - g)}$$
    (Note: $v_i$ here is the *speed*, or magnitude of the initial velocity).

3.  **Spaced Repetition Schedule:**
    - Review this derivation and these formulas in 1 day.
    - Then again in 3 days.
    - Then in 7 days.
    - Then in 16 days.
    - Finally, in 35 days.

4.  **First Principles Pathway:** If you forget the formula for $h_{burn}$, rebuild it from bedrock:
    - Start with $F_{net} = ma$.
    - The forces are thrust up, gravity down: $T - mg = ma$.
    - Therefore, the constant acceleration is $a = \frac{T}{m} - g$.
    - Recall the kinematic equation relating velocity and distance: $v_f^2 = v_i^2 + 2a\Delta y$.
    - For a landing, $v_f=0$ and the displacement is $\Delta y = -h_{burn}$.
    - Substitute: $0 = v_i^2 + 2a(-h_{burn})$.
    - Solve for $h_{burn}$: $h_{burn} = \frac{v_i^2}{2a}$. Substitute your expression for $a$. Done.

## Common mistakes
- **Sign Errors:** The most common trap. Strictly define your coordinate system (e.g., up is positive) and stick to it. Velocity is negative, displacement is negative, gravity acts in the negative direction, but the net acceleration is positive.
- **Forgetting Gravity:** A frequent error is to assume the rocket's acceleration is just $T/m$. The engine must simultaneously cancel gravity *and* provide the net deceleration. The $a_{net} = T/m - g$ is critical.
- **Using Thrust-to-Weight Ratio Incorrectly:** The term $T/m$ is an acceleration. The Thrust-to-Weight Ratio (TWR) is $T/(mg)$. They are related by $T/m = \text{TWR} \times g$. Don't mix them up. The suicide burn is only possible if $T/m > g$ (or TWR > 1).
- **Assuming Constant Mass for High-Fidelity Problems:** The simple formula works well for short burns. For a long burn where a significant fraction of the rocket's mass is propellant, $m$ changes with time, making $a_{net}$ non-constant. This requires integration, not simple kinematics.

## Self-check
1.  A lunar lander is descending at $25 \text{ m/s}$. The Moon's gravity is $1.62 \text{ m/s}^2$. The lander's engine provides a constant net deceleration of $2.0 \text{ m/s}^2$. From what altitude must it begin its landing burn?
2.  A 50,000 kg vehicle is entering the Martian atmosphere (where $g = 3.71 \text{ m/s}^2$). After its heatshield phase, it is descending at $150 \text{ m/s}$. Its landing engines can produce a combined total thrust of $1,000,000 \text{ N}$. Calculate the altitude at which the suicide burn must commence, and the total time the burn will last. Assume the vehicle's mass remains constant during the burn.
3.  Derive an expression for the required Thrust-to-Weight Ratio (TWR) to land safely from a height $h_{burn}$ with an initial downward velocity $v_i$. Your final expression should solve for TWR in terms of $v_i$, $h_{burn}$, and the local gravitational acceleration $g$. What happens to the required TWR as $h_{burn}$ approaches infinity? What does this tell you about landing from orbit?