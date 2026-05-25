## What it is
Reaction wheels are motorized flywheels mounted inside a spacecraft used to change its orientation without expending propellant. By accelerating a wheel in one direction, the spacecraft rotates in the opposite direction to conserve total angular momentum. "Momentum management" is the operational process of keeping these wheels from reaching their maximum safe spin rates (saturation) due to accumulated external torques. "Zero-crossing" refers to the severe control disturbances caused by static friction when a wheel reverses its spin direction and passes through 0 RPM.

## Why it matters
Every modern precision-pointing spacecraft, from the James Webb Space Telescope to commercial Earth-observation satellites, relies on reaction wheels. If momentum isn't managed, the wheels saturate, the spacecraft loses control authority, and the mission ends. Zero-crossing stiction ruins ultra-precise pointing (causing image blur or laser-comms dropouts), forcing GNC engineers to design complex null-space control algorithms to keep wheels spinning away from zero.

## When to study it
Do not attempt this until you have mastered:
1. Rigid body dynamics (Euler's equations in a rotating reference frame).
2. Conservation of angular momentum.
3. Basic control theory (PID controllers).
4. Friction models (Coulomb vs. viscous friction). 

If you cannot immediately write down $\dot{\vec{H}} = \vec{\tau}_{ext}$ and explain why internal torques cannot change the system's total momentum, go back to rotational kinematics.

## How to study it (step by step)
1. **Define the system:** Write down the conservation of angular momentum for a 1D spacecraft-wheel system.
2. **Model saturation:** Add a constant external disturbance torque (e.g., solar radiation pressure) and integrate to see how wheel speed grows linearly over time.
3. **Design a momentum dump:** Model the application of an external torque (via thruster or magnetorquer) and calculate the exact wheel deceleration required to keep the spacecraft attitude constant while the wheel spins down.
4. **Graph the friction:** Plot the Stribeck friction curve (Friction Torque vs. RPM) to visualize the severe nonlinearity and discontinuity at exactly zero RPM.
5. **Explore the null space:** For a 4-wheel pyramid configuration, write the $3 \times 4$ mapping matrix. Calculate its null space to understand how to speed up or slow down wheels *without* applying net torque to the spacecraft.

## Key ideas, with intuition

**1. Conservation of Angular Momentum**
For a spacecraft containing reaction wheels, the total angular momentum $\vec{H}_{sys}$ is the sum of the spacecraft body's momentum and the wheels' momentum:
$$ \vec{H}_{sys} = \mathbf{I}_{sc}\vec{\omega}_{sc} + \sum \mathbf{I}_{rw}\vec{\omega}_{rw} $$
If no external torques act on the spacecraft, $\Delta \vec{H}_{sys} = 0$. To rotate the spacecraft ($\Delta \vec{\omega}_{sc}$), the motor applies an internal torque to accelerate the wheel ($\Delta \vec{\omega}_{rw}$). Internal torques cancel out globally.

**2. Momentum Accumulation (Saturation)**
Space is not empty. Solar radiation pressure, gravity gradients, and Earth's magnetic field constantly apply tiny external torques ($\vec{\tau}_{ext}$) to the spacecraft. To hold the spacecraft perfectly still ($\vec{\omega}_{sc} = 0$), the reaction wheels must absorb this torque:
$$ \dot{\vec{H}}_{rw} = -\vec{\tau}_{ext} $$
Because $\vec{\tau}_{ext}$ is often biased in one direction, $\vec{H}_{rw}$ grows continuously. Eventually, the wheel hits its physical RPM limit (saturation). It can no longer absorb torque, and the spacecraft drifts.

**3. Momentum Dumping (Desaturation)**
To reduce wheel speed, you *must* use an external force. You fire a thruster to create $\vec{\tau}_{thruster}$. Simultaneously, you command the wheel to decelerate. The thruster torque and the wheel deceleration torque cancel each other out on the spacecraft body, keeping the attitude steady, but the wheel loses its stored RPM.

**4. The Zero-Crossing Problem**
Friction inside the wheel bearing is viscous (proportional to speed) at high RPMs. But at 0 RPM, the motor must overcome static friction (stiction). Friction opposes motion, meaning as the wheel crosses zero, the friction torque discontinuously flips sign and spikes in magnitude. This creates a "deadband" where the motor's commanded torque is entirely eaten by stiction, causing the spacecraft to violently jitter.

## Worked example
**Scenario:** A 1D spacecraft is holding its attitude steady against a constant solar radiation torque. 
**Given:** 
* Wheel inertia $I_{rw} = 0.1 \text{ kg m}^2$
* Maximum wheel speed $\omega_{max} = 500 \text{ rad/s}$
* Constant solar torque $\tau_{solar} = 10^{-4} \text{ Nm}$

**Question:** How long until the reaction wheel saturates, requiring a momentum dump?

**Step 1: Set up the governing equation.**
To maintain a steady attitude, the rate of change of the wheel's angular momentum must perfectly oppose the external torque.
$$ \dot{H}_{rw} = \tau_{solar} $$

**Step 2: Integrate to find momentum over time.**
Assuming the wheel starts at 0 RPM:
$$ H_{rw}(t) = \int_{0}^{t} \tau_{solar} \, dt = \tau_{solar} t $$

**Step 3: Calculate the maximum momentum capacity.**
$$ H_{max} = I_{rw} \omega_{max} = (0.1 \text{ kg m}^2)(500 \text{ rad/s}) = 50 \text{ Nms} $$

**Step 4: Solve for saturation time.**
$$ 50 = (10^{-4}) t \implies t = \frac{50}{10^{-4}} = 500,000 \text{ seconds} $$
$500,000 \text{ seconds} \approx 5.8 \text{ days}$.

**Reflection:** This linear growth demonstrates why satellites cannot survive on reaction wheels alone. They require a secondary actuator system (thrusters/magnetorquers) to periodically "dump" this accumulated momentum.

## Diagrams

```text
1. MOMENTUM MANAGEMENT (Sawtooth Plot)
Wheel RPM
 500 |      /|      /|
     |     / |     / |  <-- Saturation Limit
     |    /  |    /  |
   0 |---/---|---/---|------> Time
     |  /    |  /    |
-500 | /     | /     |  <-- Thruster fires (Momentum Dump)
       Dump 1  Dump 2

2. ZERO-CROSSING STICTION (Stribeck Curve)
Friction Torque
  ^
  |  |\                 /
  |  | \               / <-- Viscous friction (linear)
  |  |  \_____________/
  |  |   
--+--+----------------+---> Wheel RPM (w)
  |  |   0
  |  |
  |  |   ____________
  |  |  /            \
  |  | /              \
  |  |/                \
  v
```
*Note the discontinuous jump at 0 RPM in diagram 2. The motor controller expects a linear response but gets a massive, sudden resistance, causing pointing jitter.*

## Memory technique — remember this forever
**1. The Visual Hook:** 
Think of a Reaction Wheel as a **Water Bucket**. The bucket catches continuous drips of water (external disturbance torques). When the bucket is full (saturation), you must physically tip it out (momentum dump) using an outside force (thrusters). But if the bucket stops spinning entirely (zero-crossing), the hinges rust shut (stiction), and when you try to move it, it jerks and spills water on your payload.

**2. The Must-Know Formulas:**
* System Momentum: $\vec{H}_{sys} = \mathbf{I}_{sc}\vec{\omega}_{sc} + \mathbf{I}_{rw}\vec{\omega}_{rw}$
* Torque balancing (holding attitude): $\dot{\vec{H}}_{rw} = -\vec{\tau}_{ext}$

**3. Spaced-Repetition Schedule:**
Review this concept and re-derive the worked example at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:**
If you forget the formulas, start at Euler's rigid body equation: $\vec{\tau}_{ext} = \frac{d}{dt} \vec{H}_{sys}$. 
If the spacecraft must not rotate, $\vec{\omega}_{sc} = 0$, so $\vec{H}_{sys} = \vec{H}_{rw}$. Substitute that in, and you immediately get $\vec{\tau}_{ext} = \dot{\vec{H}}_{rw}$.

## Common mistakes
1. **Confusing Reaction Wheels with Momentum Wheels:** Reaction wheels are designed to spin in both directions and routinely cross zero. Momentum wheels are biased to spin at a high, constant RPM in one direction to provide gyroscopic stiffness; they rarely cross zero.
2. **Believing internal torques dump momentum:** Students often think spinning the wheel backwards "deletes" momentum. It doesn't. It just transfers the momentum back to the spacecraft body, causing the spacecraft to spin out of control. You *must* have an external torque to dump momentum.
3. **Ignoring the sign of friction:** Friction always opposes velocity. At $\omega = +0.001$, friction is negative. At $\omega = -0.001$, friction is positive. This mathematical sign flip is what breaks linear PID controllers during zero-crossing.

## Self-check
1. If a spacecraft has 3 orthogonal reaction wheels and no thrusters or magnetorquers, can it ever dump accumulated momentum? Why or why not?
2. Derive the exact motor torque $\tau_{motor}$ required to hold a spacecraft perfectly still if it is subject to an external torque $\tau_{ext}$ and the wheel experiences viscous friction $c\omega_{rw}$.
3. In a 4-wheel pyramid configuration, explain mathematically how you can utilize the null space of the configuration matrix to keep all four wheels away from 0 RPM without exerting any net torque on the spacecraft body.