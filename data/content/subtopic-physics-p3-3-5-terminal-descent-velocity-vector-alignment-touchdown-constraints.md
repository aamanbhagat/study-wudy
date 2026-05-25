## What it is
Terminal descent is the final phase of a spacecraft's landing trajectory. It is the process of using propulsion and control systems to nullify lateral velocity (aligning the velocity vector strictly with the local vertical) and decelerate the vehicle so that it meets strict touchdown constraints: arriving at a specific spatial coordinate with zero lateral speed, a safe vertical speed, and an upright attitude.

## Why it matters
If a lander touches down with residual lateral velocity, the lateral friction force at the landing gear creates a torque that will tip the vehicle over—a catastrophic failure seen in early rocket landing attempts. This subtopic is the mathematical heart of propulsive landings (e.g., SpaceX Falcon 9, Apollo Lunar Module, Mars Sky Crane). It bridges rigid body dynamics, optimal control theory, and real-time guidance algorithms. 

## When to study it
Do not attempt this until you have absolute fluency in:
1. **Newtonian Kinematics (2D/3D):** specifically integrating acceleration to find position and velocity.
2. **Rigid Body Dynamics:** moments of inertia, torque, and rotational kinematics.
3. **Basic Linear Algebra:** vector decomposition and dot/cross products.
If you cannot instantly write down the equations of motion for a point mass under constant acceleration in 2D, review basic kinematics first.

## How to study it (step by step)
1. **Define the State and Constraints:** Write out the 6D state vector for a 2D lander $[x, z, v_x, v_z, \theta, \omega]^T$. Explicitly write the mathematical boundary conditions for touchdown (e.g., $z=0, v_x=0$).
2. **Derive the 1D Hoverslam (Suicide Burn):** Solve the boundary value problem for a strictly vertical landing. Find the exact altitude to ignite the engine to reach $z=0$ exactly as $v_z=0$.
3. **Analyze the Gravity Turn:** Understand the guidance law where thrust is commanded to be strictly anti-parallel to the velocity vector. Prove to yourself why this naturally drives lateral velocity to zero.
4. **Couple Translation and Rotation:** Write the equations of motion showing how pitch angle $\theta$ dictates lateral acceleration $a_x$. 
5. **Simulate:** Write a simple Python or MATLAB script using a PID controller to command pitch angle based on lateral velocity errors.

## Key ideas, with intuition

**1. The Touchdown Constraint Manifold**
Landing is a boundary value problem. You are at an initial state $\mathbf{x}_0$ and must arrive at a final state $\mathbf{x}_f$. The terminal constraints are non-negotiable:
$$ z(t_f) = 0, \quad v_x(t_f) = 0, \quad v_z(t_f) = -v_{td}, \quad \theta(t_f) = 0 $$
where $v_{td}$ is the maximum safe suspension compression velocity. 

**2. Velocity Vector Alignment (The Gravity Turn)**
To kill lateral velocity, you must thrust *against* your direction of travel. If a lander is moving down and to the right, the main engine must point down and to the right (meaning the rocket pitches up and to the left). By continuously aligning the thrust vector anti-parallel to the velocity vector ($\vec{T} \propto -\vec{v}$), the lateral velocity $v_x$ approaches zero exactly as the vertical velocity $v_z$ approaches zero. As $v_x \to 0$, the velocity vector becomes purely vertical, and the rocket naturally returns to an upright position ($\theta \to 0$).

**3. The Pendulum Fallacy**
Students often think a rocket moves laterally like a car. It does not. A rocket is an inverted pendulum. To move left, it must first roll/pitch right (to point the thrust vector right), accelerate left, then pitch left to decelerate, and finally pitch back to vertical. Lateral control authority is entirely dependent on the ability to rotate the vehicle.

## Worked example
**The 1D Touchdown Constraint (The Hoverslam / Suicide Burn)**

**Problem:** A lander of mass $m$ is falling strictly vertically. It has a current altitude $h$ and a downward velocity $v_0$ (so $v_z = -v_0$). The engine produces a constant thrust $T$. Find the required thrust $T$ to satisfy the touchdown constraints: $z_f = 0$ and $v_{zf} = 0$.

**Step 1: Define the kinematics.**
We want to find the constant vertical acceleration $a_z$ required to span the initial and final states. We use the time-independent kinematic equation:
$$ v_{zf}^2 - v_{z0}^2 = 2 a_z (z_f - z_0) $$

**Step 2: Apply the touchdown constraints.**
Substitute $v_{zf} = 0$, $v_{z0} = -v_0$, $z_f = 0$, and $z_0 = h$:
$$ 0 - (-v_0)^2 = 2 a_z (0 - h) $$
$$ -v_0^2 = -2 a_z h $$

**Step 3: Solve for required acceleration.**
$$ a_z = \frac{v_0^2}{2h} $$
*Reflection:* This makes physical sense. Higher velocity requires proportionally vastly more acceleration (squared relationship), while having more altitude $h$ linearly reduces the required acceleration.

**Step 4: Relate acceleration to thrust (Dynamics).**
Draw a free body diagram. Thrust $T$ points up (positive), gravity $mg$ points down (negative). Newton's second law:
$$ \sum F_z = T - mg = m a_z $$
Substitute $a_z$:
$$ T - mg = m \left( \frac{v_0^2}{2h} \right) $$
$$ T = m \left( g + \frac{v_0^2}{2h} \right) $$
*Reflection:* The engine must support the weight of the vehicle ($mg$) *plus* provide the extra force ($m \frac{v_0^2}{2h}$) necessary to arrest the incoming kinetic energy. If $T_{max}$ is less than this value, the vehicle will crash.

## Diagrams

```text
VELOCITY VECTOR ALIGNMENT (GRAVITY TURN)

      Trajectory path
           \
            \  Lander (pitched to oppose velocity)
             \   /\
              \ /  \  <-- Body axis
               |    |
               |____|
                 ||   \
                 ||    \ \vec{v} (Velocity vector)
                 /\     v
                /  \
               /    \
              v      v
            \vec{T}   \vec{T}_x (Lateral thrust kills v_x)
          (Thrust)

As \vec{v} becomes more vertical, the lander pitches back to upright.
At touchdown: \vec{v} is straight down, \vec{T} is straight up, \theta = 0.

```

## Memory technique — remember this forever
1. **The Visual Hook:** Imagine balancing a broomstick on your palm. If the broom is sliding right, you must tilt it right to push it left. **"Pitch to slide, vertical to glide."**
2. **The Must-Know Formula:** The 1D Hoverslam constraint: 
   $$ a_{req} = \frac{v^2}{2h} $$
   Overlearn this. It is the quickest sanity check for any vertical landing algorithm.
3. **Spaced-repetition schedule:** Review this concept and re-derive the Hoverslam formula at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the hoverslam formula, integrate $a = \frac{dv}{dt}$ and $v = \frac{dz}{dt}$ to get $\int v dv = \int a dz$, which directly yields $v_f^2 - v_i^2 = 2a\Delta z$.

## Common mistakes
1. **Ignoring gravity in the lateral plane:** Students often write lateral acceleration as $a_x = \frac{T}{m} \sin\theta$. They forget that thrust must *also* fight gravity, so $T \cos\theta \ge mg$. If you pitch too far, you lose vertical control authority and accelerate into the ground.
2. **Assuming instantaneous rotation:** In software simulations, students often command $\theta$ directly. Real rockets have rotational inertia ($I\ddot{\theta} = \tau$). You must command torque to achieve a pitch rate, to achieve a pitch angle, to achieve lateral acceleration.
3. **Over-constraining the landing:** Attempting to land at a specific time $t_f$ *and* specific location $(x,z)$ with a constant thrust engine. You mathematically cannot satisfy all constraints without throttling (variable thrust) or a free final time.

## Self-check
1. A lander is at $h = 1000$ m, falling at $100$ m/s. What minimum Thrust-to-Weight Ratio (TWR) is required to stop exactly at $h=0$?
2. A lander has a velocity vector $\vec{v} = [30, -40]^T$ m/s. What pitch angle $\theta$ (measured from the vertical) is required to align the thrust vector exactly anti-parallel to the velocity?
3. If a lander has a maximum pitch angle of $\theta_{max} = 30^\circ$ to prevent loss of vertical altitude control, what is the theoretical maximum lateral acceleration it can achieve while maintaining a constant descent velocity?