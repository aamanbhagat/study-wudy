## 1. The one-sentence answer
**PID control computes a corrective actuator command as a weighted sum of the instantaneous error, the accumulated past error, and the rate of change of the error.**

The proportional term reacts immediately to how far the system is from its target. The integral term steadily eliminates any persistent offset that the proportional term alone cannot remove. The derivative term anticipates future error by opposing rapid changes, damping overshoot before it grows large.

Taken together, the three terms convert a raw measurement of deviation into a smooth, stable command that drives rockets, satellites, and aircraft to their desired attitude or trajectory without manual intervention at every instant.

> [!NOTE]
> The integral term is the only component that can drive steady-state error exactly to zero when the plant contains an integrator or a constant disturbance; the derivative term cannot create stability by itself but can enlarge the range of proportional gains that remain stable.

## 2. Why this matters — concrete and current
SpaceX uses cascaded PID loops on the Falcon 9 booster for both thrust-vector control of the Merlin engines and grid-fin aerodynamic steering during entry; the same structure appears in the Starship flip-maneuver guidance law published in 2021 flight telemetry.

NASA’s OSIRIS-REx spacecraft employed a six-axis PID attitude controller tuned on-orbit to achieve the 2019 touch-and-go sampling at Bennu with < 2 cm/s residual velocity, as documented in the post-mission GNC performance report.

Modern quadrotor flight controllers such as Betaflight and PX4 implement PID rate loops running at 4 kHz on the STM32F7xx MCU; the proportional and derivative gains directly set the vehicle’s damping ratio for gust rejection while the integral term compensates for center-of-gravity shifts caused by battery voltage drop.

Semiconductor lithography stages at ASML rely on PID feedforward augmentation to keep wafer-stage positioning error below 0.3 nm at 10 g acceleration; the derivative term is essential because the stage plant is essentially a double integrator.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Error signal \(e(t)\)    | PID is defined solely in terms of deviation from a reference |
| Laplace transform        | Converts the integro-differential law into an algebraic transfer function \(C(s)\) |
| First-order and second-order linear ODEs | Provide the plant models against which PID stability is tested |
| Block-diagram algebra    | Allows series connection of controller and plant without writing coupled differential equations |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the error
The only information the controller receives is how far the measured output lies from the commanded value.  
Example: a rocket’s pitch angle is 3° when the guidance computer wants 0°.  
Formally,  
\[e(t)=r(t)-y(t).\]  
> [!WARNING]
> Treating a non-zero bias in the sensor as part of \(e(t)\) will cause the controller to fight a phantom error indefinitely.

### Step 2 — Proportional action
Apply a torque or force directly proportional to the present error.  
Example: deflection of a thrust-vector vane by an angle \(\delta=K_pe\).  
The control law is  
\[u_P(t)=K_pe(t).\]  
> [!WARNING]
> Using only proportional action on a type-0 plant leaves a permanent offset under constant disturbance.

### Step 3 — Integral action
Accumulate the error over time and add a term that grows until the error is driven to zero.  
The running integral is  
\[u_I(t)=K_i\int_0^te(\tau)\,d\tau.\]  
> [!WARNING]
> Excessive \(K_i\) integrates wind-up during actuator saturation and produces large overshoot once the actuator recovers.

### Step 4 — Derivative action
Measure the slope of the error and subtract a term that opposes rapid growth.  
The derivative contribution is  
\[u_D(t)=K_d\frac{de(t)}{dt}.\]  
> [!WARNING]
> Pure differentiation amplifies sensor noise; without filtering, derivative kick will saturate the actuator on every measurement spike.

### Step 5 — Combine into the parallel PID law
Superpose the three channels:  
\[u(t)=K_pe(t)+K_i\int_0^te(\tau)\,d\tau+K_d\frac{de(t)}{dt}.\]  
This expression is the textbook statement of the ideal PID controller in the time domain.

### Step 6 — Laplace-domain transfer function
Taking the Laplace transform yields the controller  
\[C(s)=K_p+K_i\frac{1}{s}+K_d s=\frac{K_ds^2+K_ps+K_i}{s}.\]  
The closed-loop transfer function from reference to output is then formed by \(C(s)G(s)/(1+C(s)G(s))\) where \(G(s)\) is the plant.

## 5. Worked examples — every step shown

**Example 1 — Pure proportional response**  
*Given:* Plant \(\ddot{\theta}=u\), \(K_p=4\), step reference \(r=1\) at \(t=0\).  
*Find:* Steady-state error.  
Step 1: Write \(u=4(1-\theta)\).  
*Why:* Proportional law applied to error.  
Step 2: Closed-loop equation becomes \(\ddot{\theta}+4\theta=4\).  
*Why:* Substitute \(u\) into plant.  
Step 3: Particular solution \(\theta_{ss}=1\).  
*Why:* Set derivatives to zero.  
Final answer: **steady-state error = 0** (plant already contains two integrators).  
*Reflection:* The plant type masks the offset that proportional control normally leaves.

**Example 2 — Adding integral to remove offset**  
*Given:* Plant \(\dot{v}=-0.1v+u\), constant wind disturbance \(d=0.5\), \(K_p=2\), \(K_i=0.5\).  
*Find:* Steady-state velocity error.  
Step 1: Error \(e=r-v\).  
*Why:* Definition.  
Step 2: \(u=2e+0.5\int e\,dt\).  
*Why:* PID law without derivative.  
Step 3: At equilibrium, \(\dot{v}=0\) forces \(u=0.5-d=0\).  
*Why:* Plant reaches balance only when integral term cancels disturbance.  
Final answer: **steady-state error = 0**.  
*Reflection:* Integral action supplies whatever constant command the disturbance requires.

**Example 3 — Derivative damping of second-order plant**  
*Given:* Plant \(\ddot{\theta}=u\), desired \(\omega_n=2\), \(\zeta=0.7\), \(K_i=0\).  
*Find:* \(K_p\) and \(K_d\).  
Step 1: Characteristic equation \(s^2+K_ds+K_p=0\).  
*Why:* Substitute PID into double-integrator plant.  
Step 2: Match coefficients: \(K_p=\omega_n^2=4\), \(K_d=2\zeta\omega_n=2.8\).  
*Why:* Standard second-order form.  
Final answer: **\(K_p=4\), \(K_d=2.8\)**.  
*Reflection:* Derivative term directly sets damping ratio.

**Example 4 — Full PID on rocket pitch with actuator saturation**  
*Given:* Plant \(G(s)=1/s^2\), \(K_p=9\), \(K_i=2\), \(K_d=6\), saturation at \(|u|\le 1\).  
*Find:* Qualitative effect of integrator wind-up on a 30° step.  
Step 1: Linear response would settle with zero error.  
*Why:* All three terms present.  
Step 2: During saturation the integral continues to grow.  
*Why:* Integrator has no anti-wind-up logic.  
Step 3: When error crosses zero the stored integral produces a large negative command, causing undershoot.  
*Why:* Accumulated area remains until slowly bled off.  
Final answer: **large post-saturation undershoot occurs**.  
*Reflection:* Anti-wind-up (conditional integration or back-calculation) is required for any real actuator limit.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Derivative kick on step     | Step reference produces infinite \(\dot{e}\)        | Apply derivative only to measured output, not error  |
| Integral wind-up            | Actuator saturates while error persists             | Implement conditional integration or back-calculation|
| No noise filter on D term   | Sensor quantization or vibration is differentiated  | Add first-order low-pass filter \(\frac{N}{s+N}\)    |
| Sign error in any gain      | Motor or fin polarity reversed                      | Verify open-loop step response before closing loop   |
| Tuning only by Ziegler-Nichols on noisy plant | Quarter-decay ratio ignores robustness margins | Use relay auto-tuning or model-based optimization    |
| Ignoring plant delay        | Derivative gain excites 180° phase lag              | Measure or estimate delay; reduce \(K_d\) accordingly|
| Treating \(K_i\) as “reset time” without units | Confusion between \(K_i\) and \(1/T_i\)            | Always keep consistent units: \(K_i\) has units 1/s  |

## 7. The textbook-precise statement
A PID controller has the parallel realization  
\[u(t)=K_pe(t)+K_i\int_{-\infty}^te(\tau)\,d\tau+K_d\frac{de(t)}{dt},\]  
where the integral is taken over all past time (or initialized at controller start) and the derivative is understood in the distributional sense when \(e(t)\) contains discontinuities. Under the assumptions that the reference \(r(t)\) is piecewise continuous, the plant \(G(s)\) is finite-dimensional and strictly proper, and all signals remain in \(L_2[0,\infty)\), the closed-loop system is internally stable if and only if the roots of the characteristic equation \(1+C(s)G(s)=0\) lie in the open left half-plane. (Ogata, *Modern Control Engineering*, 5th ed., §7-6.)

## 8. Visual — diagram or schematic
```text
r(t) ---->(+)----> e(t) ----[ Kp ]----+
           ^ -                         |
           |                           v
          y(t) <---[ G(s) ]<---(+)----(+)----> u(t)
                           ^     ^     ^
                           |     |     |
                        [Ki/s] [Kd s]  (saturation limit)
```
Plant input \(u(t)\) is the sum of the three parallel branches; feedback closes through the plant \(G(s)\).

## 9. The memory technique

1. **The hook**  
   Picture three musicians: P plays the current note (error), I keeps a running tally of how long the band has been flat, D anticipates the next note by watching the conductor’s baton speed. Their combined volume is the actuator command.

2. **What to overlearn**  
   - Parallel form: \(u=K_pe+K_i\int e+K_d\dot{e}\)  
   - Laplace form: \(C(s)=K_p+K_i/s+K_ds\)  
   - Derivative-on-measurement rule to avoid kick.

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Start from Newton’s second law on the attitude plant \(\ddot{\theta}=u/I\), substitute the three-term expression for \(u\), collect coefficients of \(\theta\), \(\int\theta\), and \(\dot{\theta}\), and obtain the characteristic polynomial.

## 10. What this unlocks
Mastery of the three-term structure is the prerequisite for every modern GNC technique that augments or replaces PID.  

- Gain scheduling and adaptive PID for time-varying mass properties  
- Linear-quadratic regulator (LQR) and Kalman-filter state estimation  
- Model-predictive control (MPC) that explicitly handles actuator constraints  
- Robust \(\mathcal{H}_\infty\) synthesis used on launch-vehicle thrust-vector controllers  
- Neural-network or reinforcement-learning policy initialization seeded from a well-tuned PID

## 11. Self-check — five questions, no answers
1. A first-order plant \(G(s)=1/(s+1)\) is controlled by proportional action alone. Compute the steady-state error to a unit ramp reference.  

2. Show that adding an integral term to the controller in question 1 yields zero steady-state error to the same ramp.  

3. For the double-integrator plant \(G(s)=1/s^2\), derive the range of \(K_d>0\) that keeps the closed-loop damping ratio above 0.5 when \(K_p=4\).  

4. A PID controller with \(K_i>0\) is applied to a plant that already contains an integrator. The actuator saturates for 5 s. Qualitatively describe the behavior immediately after saturation ends if no anti-wind-up logic is present.  

5. An engineer replaces the ideal derivative term \(K_ds\) by the filtered version \(K_ds/(s/N+1)\) with \(N=10\omega_c\). Explain why the high-frequency gain of the controller is now finite and state the resulting high-frequency asymptote.