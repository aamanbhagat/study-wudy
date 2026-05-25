## What it is
Thrust Vector Control (TVC) dynamics describe the physical behavior of the actuators (servos) that swivel a rocket's engine to steer it. Gimbal servo bandwidth measures how quickly these actuators can track steering commands, while time delay accounts for the unavoidable lag between the flight computer issuing a command and the engine actually moving. 

## Why it matters
If the TVC bandwidth is too low or the time delay is too high, the rocket's control system will lag behind reality, leading to unstable oscillations and loss of control. This is the absolute foundation for designing autopilot loop filters, analyzing phase margin in classical control theory, and preventing launch vehicles from tearing themselves apart due to pilot-induced (or computer-induced) oscillations.

## When to study it
You must already understand:
1. Classical control theory (Laplace transforms, transfer functions, Bode plots).
2. Rigid body dynamics (moment of inertia, torque).
3. Basic second-order system responses (damping ratio $\zeta$, natural frequency $\omega_n$).
If you cannot draw a Bode plot for a standard second-order low-pass filter, go back and learn that first.

## How to study it (step by step)
1. Write down the TVC actuator model as a second-order transfer function in the Laplace domain.
2. Add a pure time delay term ($e^{-s\tau}$) to the model to represent computational and transport lag.
3. Substitute $s = j\omega$ and calculate the magnitude and phase of the system as a function of frequency.
4. Plot the Bode response of this combined system to see exactly where the phase crosses $-180^\circ$.
5. Couple the TVC transfer function to a simple rigid-body rocket model (a double integrator $1/s^2$) and calculate the open-loop phase margin.
6. Determine the maximum allowable time delay for a given control bandwidth before the system goes unstable.

## Key ideas, with intuition

**The Actuator as a Low-Pass Filter**
A heavy rocket engine cannot move infinitely fast. It acts like a low-pass filter. Low-frequency commands are followed perfectly, but high-frequency commands are attenuated and delayed. We model this as a second-order system:
$$ G_{servo}(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2} $$
where $\omega_n$ dictates the "stiffness" of the servo and $\zeta$ is the damping. 

**Bandwidth ($\omega_{BW}$)**
Bandwidth is the frequency at which the actuator's output amplitude drops to $1/\sqrt{2}$ (or -3 dB) of the commanded input. A higher bandwidth means a "snappier" engine, but requires massive hydraulic or electrical power. 

**Time Delay is Phase Poison**
Flight computers take time to calculate, and signals take time to travel. This creates a pure time delay $\tau$. In the Laplace domain, a time shift is represented by $e^{-s\tau}$. 
When we look at the frequency response ($s = j\omega$), the time delay adds a phase shift of:
$$ \phi_{delay} = -\omega \tau $$
Because $\omega$ is in the numerator, the phase drops *linearly* with frequency to negative infinity. This rapidly destroys your phase margin.

**The Complete TVC Model**
Combining the physical inertia of the engine and the delay of the system gives the standard TVC transfer function:
$$ G_{TVC}(s) = \left( \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2} \right) e^{-s\tau} $$

## Worked example
**Problem:** A TVC servo is modeled as a first-order system with a bandwidth of $\omega_b = 10$ rad/s and a time delay of $\tau = 0.05$ s. Find the total phase lag at a control frequency of $\omega = 5$ rad/s.

**Step 1: Write the transfer function.**
$$ G(s) = \frac{10}{s + 10} e^{-0.05s} $$

**Step 2: Convert to the frequency domain.**
Substitute $s = j\omega = 5j$:
$$ G(5j) = \frac{10}{5j + 10} e^{-0.05(5j)} $$

**Step 3: Calculate the phase of the first-order lag.**
$$ \phi_{lag} = -\arctan\left(\frac{\omega}{\omega_b}\right) = -\arctan\left(\frac{5}{10}\right) = -26.56^\circ $$

**Step 4: Calculate the phase of the time delay.**
$$ \phi_{delay} = -\omega \tau = -(5)(0.05) = -0.25 \text{ radians} $$
Convert to degrees: 
$$ -0.25 \times \left(\frac{180}{\pi}\right) = -14.32^\circ $$

**Step 5: Sum the phase contributions.**
$$ \phi_{total} = -26.56^\circ - 14.32^\circ = -40.88^\circ $$

*Reflection:* The time delay contributed over a third of the total phase lag even at a relatively low frequency. This shows why fast flight computers (low $\tau$) are as critical as strong hydraulics (high $\omega_b$).

## Diagrams

```text
BODE PLOT: PHASE RESPONSE OF TVC DYNAMICS
Phase (deg)
   0 |---------------------------------------
     |        \
 -45 |         \  <-- Ideal 1st Order Servo
     |          \     (Asymptotes to -90 deg)
 -90 |           \..................
     |            \
-135 |             \  <-- Servo + Time Delay
     |              \     (Drops to -infinity)
-180 |---------------\----------------------- INSTABILITY LINE
     |                \
-225 |                 \
     +---------------------------------------
      0.1      1       10      100     w (rad/s)
```

## Memory technique — remember this forever
1. **The Hook:** "Delay is a Phase Assassin." A physical mass (the engine poles) asymptotes to a maximum phase lag ($-180^\circ$ for a 2nd order system). Time delay, however, drops phase *infinitely* as frequency rises. It will kill your vehicle if ignored.
2. **Formulas to overlearn:**
   * $G_{TVC}(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2} e^{-s\tau}$
   * $\phi_{delay} = -\omega \tau$ (Result is in RADIANS)
3. **Spaced-repetition schedule:** Review this concept and re-derive the phase equation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the delay phase formula, remember the Laplace transform of a time-shifted function $f(t-\tau)$ is $F(s)e^{-s\tau}$. Substitute $s = j\omega$ to get $e^{-j\omega\tau}$. By Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$), the magnitude is $1$ and the angle is exactly $-\omega\tau$.

## Common mistakes
* **Mixing up radians and degrees.** The formula $\phi = -\omega \tau$ yields a result in *radians*. Students constantly subtract this raw decimal directly from degrees, resulting in wildly incorrect phase margins.
* **Assuming the engine moves exactly as commanded.** Assuming $G_{TVC} = 1$ works for static analysis or very low frequencies (0.1 Hz) but causes catastrophic control failure when designing loops near the vehicle's structural bending frequencies (2-5 Hz).
* **Confusing bandwidth with slew rate.** Bandwidth is the small-signal frequency response (how fast it wiggles). Slew rate is the absolute maximum speed (degrees/sec) the actuator can physically move under heavy load.

## Self-check
1. Calculate the phase lag introduced by a 20 ms time delay at a frequency of 10 rad/s.
2. If a TVC servo has a damping ratio of $\zeta = 0.7$ and natural frequency $\omega_n = 30$ rad/s, at what frequency does the phase lag of the *actuator alone* (ignoring time delay) hit exactly $-90^\circ$?
3. Linear control tools (like root locus) cannot handle the exponential $e^{-s\tau}$. Prove using the Taylor expansion of $e^{-s\tau}$ why a first-order Padé approximation $G_{delay} \approx \frac{1 - \tau s/2}{1 + \tau s/2}$ is a valid substitution for small time delays.