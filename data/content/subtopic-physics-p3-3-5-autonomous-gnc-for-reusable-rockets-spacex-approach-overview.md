## What it is
Autonomous GNC (Guidance, Navigation, and Control) for reusable rockets is the onboard hardware and software architecture that calculates a vehicle's exact state, computes an optimal trajectory to a landing pad, and commands engines and aerodynamic surfaces to execute that path without human intervention. The "SpaceX approach" specifically relies on real-time convex optimization to continuously recalculate landing trajectories, coupled with grid fins for hypersonic aerodynamic steering and a propulsive "hoverslam" for final touchdown.

## Why it matters
This is the foundational technology of modern aerospace economics; without pinpoint autonomous GNC, rockets cannot be reused, keeping launch costs astronomically high. In the curriculum, this topic ties together classical rigid body dynamics, optimal control theory, and sensor fusion, serving as your direct bridge to advanced robotics, autonomous spacecraft rendezvous, and missile defense systems.

## When to study it
Do not attempt this until you have mastered:
1. Rigid body dynamics (Euler equations and quaternions).
2. State-space control theory (LQR and PID controllers).
3. Basic numerical optimization (gradient descent and constraints).
4. Introductory estimation (Kalman filters).
If you do not understand how a quaternion avoids gimbal lock or the basic physics of thrust vectoring, stop and review 3D kinematics first.

## How to study it (step by step)
1. **Map the GNC loop:** Draw the flow of data from sensors (Navigation) to the trajectory planner (Guidance) to actuators (Control). Understand the distinct frequency each runs at (e.g., Navigation at 1000 Hz, Guidance at 10 Hz, Control at 100 Hz).
2. **Study the "Hoverslam" (Suicide Burn) physics:** Derive the 1D equation of motion for a rocket decelerating to zero velocity exactly at zero altitude. 
3. **Understand Convexification:** Read the foundational papers on "Lossless Convexification" (e.g., the G-FOLD algorithm). Understand how relaxing the minimum thrust constraint turns a highly non-linear pinpoint landing problem into a convex problem solvable in milliseconds.
4. **Analyze the Actuators:** Differentiate the control regimes: cold gas thrusters (vacuum), grid fins (hypersonic/supersonic atmospheric), and Thrust Vector Control (TVC) (propulsive landing).
5. **Implement a 1D simulation:** Write a Python script using a simple PID controller to land a 1D point mass using a variable thrust engine, subject to gravity and mass depletion.

## Key ideas, with intuition

**1. Navigation (Where am I?)**
Sensors are flawed. An IMU (Inertial Measurement Unit) updates at high frequencies but its errors integrate over time (drift). GPS provides absolute position but is slow and noisy. Navigation uses an Extended Kalman Filter (EKF) to fuse these, producing a high-frequency, highly accurate state vector: 
$$ \mathbf{x} = [x, y, z, \dot{x}, \dot{y}, \dot{z}, q_0, q_1, q_2, q_3]^T $$

**2. Guidance (How do I get there?)**
Finding the optimal thrust profile to land while minimizing fuel is a non-linear problem because the engine thrust $\mathbf{T}$ has a minimum throttle limit: $0 < T_{min} \le ||\mathbf{T}|| \le T_{max}$. This creates a "donut-shaped" (non-convex) feasible control space. The SpaceX approach relies on mathematically relaxing this to $||\mathbf{T}|| \le T_{max}$ and introducing slack variables. This transforms the math into a "convex bowl," guaranteeing that a global minimum can be found reliably and deterministically onboard in real-time.

**3. Control (Do it.)**
Reusable rockets like the Falcon 9 often cannot hover. The minimum throttle of one Merlin engine exceeds the weight of the nearly-empty rocket ($T_{min} > mg$). Therefore, they must execute a "Hoverslam" or "Suicide Burn." The control system must ignite the engine at the exact right millisecond and throttle dynamically so that velocity reaches zero exactly as altitude reaches zero.

## Worked example
**1D Hoverslam Ignition Altitude**

**Given:** A rocket of mass $m$, constant engine thrust $T$ (where $T > mg$), current velocity $v_0$ (falling, so $v_0 < 0$), and gravitational acceleration $g$. 
**Find:** The exact altitude $h_{ignite}$ at which the engine must ignite to reach $v=0$ exactly at $h=0$.

**Step 1:** Determine the net upward acceleration during the burn. 
$$ a_{net} = \frac{T}{m} - g $$

**Step 2:** Relate velocity, acceleration, and distance using 1D kinematics. 
$$ v_f^2 = v_0^2 + 2 a_{net} \Delta x $$

**Step 3:** Apply the boundary conditions. Final velocity $v_f = 0$. The displacement during the burn is downward, so $\Delta x = -h_{ignite}$.
$$ 0 = v_0^2 + 2 \left(\frac{T}{m} - g\right) (-h_{ignite}) $$

**Step 4:** Solve algebraically for $h_{ignite}$.
$$ 2 \left(\frac{T}{m} - g\right) h_{ignite} = v_0^2 $$
$$ h_{ignite} = \frac{v_0^2}{2(\frac{T}{m} - g)} $$

*Reflection:* This clean analytical solution shows why real-time guidance is critical. In reality, mass $m$ decreases as fuel burns, and atmospheric drag constantly alters $v_0$. The rocket cannot use a static pre-calculated $h_{ignite}$; the Guidance algorithm must continuously recalculate the target and command the Control system to adjust the throttle ($T$) to keep the projected landing point exactly at $h=0$.

## Diagrams

```text
SPACEX REUSABLE ROCKET DESCENT PROFILE

Altitude
  ^
  |  (1) FLIP & BOOSTBACK
  |      Actuators: Cold Gas Thrusters
  |      [Vacuum / Near-Vacuum]
  |       / \
  |      /   \
  |     /     \
  |    |       \  (2) ENTRY BURN
  |  Ascent     \     Actuators: TVC + Engines
  |              \    Reduces velocity to survive atmosphere.
  |               \
  |                \  (3) AERODYNAMIC DESCENT
  |                 |     Actuators: Grid Fins
  |                 |     [Hypersonic -> Supersonic]
  |                 |     Steers the "glide" to the pad.
  |                 |
  |                 | (4) LANDING BURN (Hoverslam)
  |                 |     Actuators: TVC + Engine (Throttle)
  |                 |     [Subsonic]
  |                 V
--+-----------------X-----> Downrange Distance
                    Landing Pad
```

## Memory technique — remember this forever
1. **Mnemonic:** **N**ever **G**uess **C**oordinates.
   * **N**avigation = *Where am I?* (Sensors/Filters)
   * **G**uidance = *Where to?* (Trajectory/Optimization)
   * **C**ontrol = *Do it.* (Actuators/PID)
2. **Must-overlearn formula:** The Hoverslam altitude constraint: $h = \frac{v^2}{2(a_{thrust} - g)}$
3. **Spaced-repetition schedule:** Review this concept and re-derive the hoverslam equation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the hoverslam formula, rebuild it from the Work-Energy Theorem: The kinetic energy of the falling rocket ($\frac{1}{2}mv^2$) plus the potential energy to be lost ($mgh$) must be exactly cancelled by the work done by the engine ($T \times h$). $\frac{1}{2}mv^2 + mgh = Th$. Solve for $h$.

## Common mistakes
1. **Confusing Guidance with Control.** Guidance draws the map; Control turns the steering wheel. If the rocket lands perfectly smoothly but 100 meters away from the pad, Guidance failed. If the rocket violently flips out of the sky trying to reach the pad, Control failed.
2. **Assuming rockets can hover.** Most orbital-class boosters cannot. If a student designs a control loop assuming the rocket can hold $h=10$ meters while translating horizontally, the simulation will fail. You must account for $T_{min} > mg$.
3. **Ignoring grid fins.** Students often try to steer the rocket through the atmosphere using only Thrust Vector Control. Engines are off during the majority of the descent; aerodynamic surfaces provide the cross-range steering authority.

## Self-check
1. If a rocket's mass decreases significantly during the landing burn, does the required $h_{ignite}$ increase or decrease (assuming constant thrust)?
2. Why is a standard PID controller entirely insufficient for the *Guidance* phase of a pinpoint landing?
3. Formulate the minimum-fuel landing problem as a cost function with constraints. Mathematically, why is the engine throttle constraint $T_{min} \le ||\mathbf{T}|| \le T_{max}$ non-convex, and why is that dangerous for onboard computers?