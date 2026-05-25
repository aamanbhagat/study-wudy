## What it is
PID control is a feedback loop mechanism that calculates an error value as the difference between a desired setpoint and a measured process variable. It applies a continuous correction to a system's actuators based on three terms: proportional (current error), integral (accumulated past error), and derivative (predicted future error based on rate of change). 

## Why it matters
PID is the workhorse of industrial and aerospace control systems. In Guidance, Navigation, and Control (GNC), PID loops (and their variants) keep rockets dynamically stable during ascent by gimbaling the engines, maintain drone hover altitudes, and point spacecraft antennas at Earth. Even in advanced modern control (like LQR or Model Predictive Control), the low-level actuator commands are almost always governed by PID controllers.

## When to study it
Do not attempt PID control until you have mastered:
1. **Calculus:** Specifically, the physical meaning of derivatives (rates of change) and integrals (accumulation over time).
2. **Kinematics:** Position, velocity, and acceleration.
3. **Differential Equations:** You must understand second-order linear ordinary differential equations (ODEs), specifically the mass-spring-damper system. If you do not know what a damping ratio ($\zeta$) or natural frequency ($\omega_n$) is, go back to classical mechanics.

## How to study it (step by step)
1. **Define the Error:** Write down the equation for the error signal $e(t) = r(t) - y(t)$, where $r(t)$ is the reference (setpoint) and $y(t)$ is the true state.
2. **Isolate the Proportional (P) term:** Write the control law $u(t) = K_p e(t)$. Substitute this into Newton's second law for a simple mass. Observe how it creates a restoring force identical to a spring (Hooke's Law).
3. **Isolate the Derivative (D) term:** Add $u(t) = K_d \dot{e}(t)$. Observe how this acts as a viscous damper, bleeding energy out of the system to prevent infinite oscillation.
4. **Isolate the Integral (I) term:** Add $u(t) = K_i \int e(t) dt$. Assume a constant disturbance (like gravity or wind). Prove mathematically that a steady-state error of zero can only be achieved if this integral term exists.
5. **Synthesize:** Combine all three into the standard time-domain PID equation.
6. **Simulate:** Write a 20-line Python script using Euler integration to simulate a 1D rocket altitude controlled by a PID loop. Tune $K_p$, $K_i$, and $K_d$ manually to see their effects.

## Key ideas, with intuition
The output of the controller, $u(t)$, is the sum of three terms acting on the error $e(t)$:

$$u(t) = K_p e(t) + K_i \int_{0}^{t} e(\tau) d\tau + K_d \frac{de(t)}{dt}$$

*   **Proportional ($K_p$): The Spring.** It pushes harder the further you are from the target. However, if you only have a P-term, a system with inertia will overshoot the target, resulting in endless oscillation.
*   **Derivative ($K_d$): The Damper.** It looks at $\frac{de(t)}{dt}$. If the error is shrinking rapidly, the derivative is negative, which *subtracts* from the control effort. It hits the brakes before you reach the target, preventing overshoot. 
*   **Integral ($K_i$): The Bulldozer.** If a drone is carrying a heavy payload, a P-D controller might reach equilibrium slightly *below* the target altitude (because the proportional "spring" needs a non-zero error to generate the thrust to counteract the extra weight). The I-term integrates this small error over time. Eventually, the integral grows large enough to command the extra thrust needed to reach exactly zero error.

## Worked example
**Scenario:** A 1D hovering rocket of mass $m$. We want to maintain a constant altitude $h_{ref}$. The actual altitude is $h(t)$. We use a PD controller (ignoring the I-term for simplicity) to command the engine thrust $T(t)$.

1. **Define the error and its derivative:**
   $$e(t) = h_{ref} - h(t)$$
   Since $h_{ref}$ is a constant, taking the time derivative yields:
   $$\dot{e}(t) = 0 - \dot{h}(t) = -\dot{h}(t)$$

2. **Define the control law:**
   The thrust must counteract gravity and apply the PD correction:
   $$T(t) = mg + K_p e(t) + K_d \dot{e}(t)$$

3. **Apply Newton's Second Law:**
   $$m\ddot{h}(t) = T(t) - mg$$

4. **Substitute the control law into the physics:**
   $$m\ddot{h}(t) = \left( mg + K_p (h_{ref} - h(t)) + K_d (-\dot{h}(t)) \right) - mg$$

5. **Simplify and rearrange into standard ODE form:**
   The $mg$ terms cancel. Move all $h$ terms to the left side:
   $$m\ddot{h}(t) + K_d \dot{h}(t) + K_p h(t) = K_p h_{ref}$$

**Reflection:** Look at the final equation. By choosing a PD control law, we have forced the rocket's dynamics to behave *exactly* like a driven, damped harmonic oscillator. $K_p$ is the artificial spring constant. $K_d$ is the artificial damping coefficient. By tuning $K_p$ and $K_d$, we completely dictate the natural frequency and damping ratio of the rocket's response.

## Diagrams

```text
                      Disturbances
                           |
                           v
          +-----+    +-----------+    +-------+
r(t) ---> |  +  |--->| PID       |--->| Plant |--+---> y(t)
Setpoint  |  -  | e  | Controller| u  | (ODE) |  |     Output
          +-----+    +-----------+    +-------+  |
             ^                                   |
             |                                   |
             +-----------------------------------+
                          Feedback
```
*Note: $r(t)$ is reference, $e$ is error, $u$ is control signal, $y(t)$ is the actual state. The "Plant" is the physical system (e.g., the rocket).*

## Memory technique — remember this forever
1. **The Mnemonic:** "Past, Present, Future."
   *   **I**ntegral looks at the **Past** (accumulated error).
   *   **P**roportional looks at the **Present** (current error).
   *   **D**erivative predicts the **Future** (trajectory of error).
2. **Overlearn this formula:** 
   $$u(t) = K_p e(t) + K_i \int_{0}^{t} e(\tau) d\tau + K_d \dot{e}(t)$$
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example above at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the PID equation, remember a mass on a spring with a damper ($m\ddot{x} + c\dot{x} + kx = F$). To control a mass electronically, you must simulate the spring ($k \rightarrow K_p$) and the damper ($c \rightarrow K_d$) in software. 

## Common mistakes
*   **Derivative Kick:** If you suddenly change the setpoint $r(t)$ (a step input), $e(t)$ changes instantaneously. The derivative of a step is an impulse (infinity). This causes a massive, violent spike in the actuator command. *Fix: Take the derivative of the process variable $-K_d \dot{y}(t)$ instead of the error.*
*   **Integral Windup:** If your rocket engine reaches maximum throttle (saturation) but the rocket is still below the target altitude, the error remains positive. The integral term will keep accumulating to infinity. When the rocket finally reaches the target, the massive built-up integral term will force it to overshoot wildly. *Fix: Implement anti-windup logic that stops integrating when actuators saturate.*
*   **Sign Errors in the D-term:** Forgetting that $\dot{e}(t) = -\dot{y}(t)$ for a constant setpoint, leading to positive feedback instead of negative damping. This will immediately destroy the vehicle.

## Self-check
1. If a drone is hovering slightly below its target altitude due to a heavier-than-expected payload, which PID term will correct this steady-state error, and exactly how does it do it?
2. Prove mathematically that for a constant setpoint $r$, $\frac{de(t)}{dt} = -\frac{dy(t)}{dt}$. 
3. Take the Laplace transform of the time-domain PID equation to find the transfer function $C(s) = \frac{U(s)}{E(s)}$. Assume initial conditions are zero.