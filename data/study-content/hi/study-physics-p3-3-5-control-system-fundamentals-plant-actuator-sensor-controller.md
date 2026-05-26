## 1. The one-sentence answer
**A closed-loop control system consists of four blocks: the plant (the physical process you want to steer), the actuator (device that applies the control effort), the sensor (device that measures the plant output), and the controller (algorithm that decides the actuator command from the error).**

Iska matlab yeh hai ki har modern rocket ya satellite mein ek feedback loop hoti hai jismein yeh chaar cheezein ek dusre se baat karti hain. Plant rocket ka rigid-body dynamics ho sakta hai; actuator thrust-vector-control gimbal ya cold-gas thruster hota hai; sensor IMU aur star-tracker hote hain; aur controller ek flight-computer par chal raha PID ya MPC algorithm hota hai. Jab aap in chaaron ko alag-alag samajhte ho tabhi aap GNC loop ko properly design, tune aur debug kar paate ho.

> [!NOTE]
> The single most important “aha” is that the plant is almost never invertible in real time; therefore the controller must work with imperfect, delayed measurements coming from the sensor and limited authority coming from the actuator.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 uses grid-fin actuators and nitrogen cold-gas thrusters as actuators, while its IMU and GPS receivers act as sensors; the controller running on the flight computer keeps the booster inside a 10 m radius landing ellipse.

ISRO’s Gaganyaan mission employs a similar four-block architecture: the crew module is the plant, reaction-control thrusters are the actuators, and redundant INS/GPS units feed the digital autopilot.

In semiconductor lithography machines (ASML TwinScan), the wafer stage is the plant, voice-coil motors are the actuators, laser interferometers are the sensors, and a 10 kHz MIMO controller achieves sub-nanometre positioning.

Modern electric vertical-take-off vehicles (Joby Aviation) close the loop between battery-driven propeller actuators and IMU/GNSS sensors at 1 kHz to maintain attitude within 0.5° under gusts.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Linear time-invariant (LTI) systems | Plant and actuator dynamics are first modelled as LTI before any controller is designed |
| Transfer function or state-space representation | These are the mathematical languages used to connect plant, actuator and sensor blocks |
| Feedback and error signal | The controller’s only job is to drive the measured error to zero |
| Basic Laplace transform | Allows us to move between time-domain differential equations and s-domain block diagrams |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the plant
Plant woh dynamical system hai jise aap control karna chahte ho. Ek chhota example: ek single-axis reaction wheel. Iska angular momentum inertia ke saath change hota hai jab torque lagaya jaaye.

Mathematically the plant is written as  
$$J\dot{\omega}=u$$  
where \(J\) is moment of inertia and \(u\) is torque.

> [!WARNING]
> Agar aap plant ko galat model karte ho (wrong inertia ya unmodelled flexibility), toh controller jo bhi banaoge woh unstable ho jaayega.

### Step 2 — Choose the actuator
Actuator plant mein physical effort daalta hai. Reaction-wheel ke liye actuator ek brushless motor hota hai jo torque \(u\) generate karta hai. Real hardware mein actuator ka apna bandwidth aur saturation hota hai.

### Step 3 — Place the sensor
Sensor plant ki state ko measure karta hai. Yahan ek rate gyro \(\omega_m = \omega + n(t)\) deta hai jahaan \(n(t)\) sensor noise hai.

### Step 4 — Close the loop with the controller
Controller error \(e = \omega_d - \omega_m\) ko dekhta hai aur actuator command banata hai. Ek simple proportional law  
$$u = K_p e$$  
detective hai.

### Step 5 — Write the closed-loop equation
Plant, actuator aur sensor ko combine karke closed-loop dynamics milti hai  
$$J\dot{\omega} + K_p\omega = K_p\omega_d - K_p n(t).$$

### Step 6 — Analyse stability
Characteristic equation \(Js + K_p = 0\) se pole \(s = -K_p/J\) left-half plane mein hona chahiye; yeh rigorous stability criterion hai.

## 5. Worked examples — har step show karo

**Example 1 — Pure inertia plant with proportional control**  
*Given:* \(J=0.5\) kg m², desired rate \(\omega_d=2\) rad/s, \(K_p=4\).  
*Find:* steady-state error and time constant.  
Step 1: Closed-loop equation \(0.5\dot{\omega}+4\omega=8\).  
Step 2: Time constant \(\tau=J/K_p=0.125\) s.  
Step 3: Steady-state \(\omega_{ss}=2\) (error zero).  
**Final answer**  
\(\tau=0.125\) s, zero steady-state error.  

*Reflection:* Simple case shows that higher gain speeds up response but actuator saturation will appear in later examples.

**Example 2 — Adding actuator saturation**  
*Given:* Same plant, \(K_p=20\), but actuator saturates at \(|u|\le 5\) Nm.  
Step 1: Desired torque initially 40 Nm → saturates at 5 Nm.  
Step 2: Effective initial acceleration \(5/0.5=10\) rad/s².  
**Final answer**  
Rise time increases; integrator wind-up risk appears if integral term added later.

*Reflection:* Real hardware always limits authority; controller must respect saturation.

**Example 3 — Sensor noise effect**  
*Given:* White noise \(n(t)\) with PSD 0.01 (rad/s)²/Hz added to measurement.  
Step 1: Control signal variance becomes \(K_p^2\times0.01\).  
**Final answer**  
\(K_p=20\) produces 4 (Nm)² variance; trade-off between speed and noise appears.

*Reflection:* Sensor noise limits usable gain.

**Example 4 — First-order actuator dynamics**  
*Given:* Actuator \(\dot{u}=-20(u-u_c)\).  
Step 1: Augment state vector \([\omega,u]^\top\).  
Step 2: New 2×2 system matrix obtained.  
**Final answer**  
Closed-loop poles solved from \(\det(sI-A)=0\); dominant pole shifts from −40 to −18 rad/s.

*Reflection:* Actuator lag reduces phase margin; compensator needed.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Treating actuator as ideal gain | Students forget bandwidth and saturation    | Always include first-order lag and saturation blocks in Simulink |
| Ignoring sensor delay       | IMU packets arrive at 100 Hz while controller runs at 1 kHz | Model transport delay and use multi-rate analysis |
| Sign error in feedback      | Gyro axis definition mismatch               | Perform hardware-in-loop sign check before flight |
| High gain without filtering | Noise amplification                         | Add roll-off filter or Kalman estimator      |
| Neglecting plant uncertainty | Mass properties change after fuel burn      | Run Monte-Carlo robustness analysis          |
| Integral wind-up            | Actuator saturates while integrator keeps growing | Implement conditional integration or anti-wind-up |

## 7. The textbook-precise statement
A feedback control system is composed of four interconnected objects: the plant \(P(s)\) whose input is the actuator effort \(u(t)\) and whose output is the regulated variable \(y(t)\); the actuator \(A(s)\) that maps the controller command \(u_c(t)\) into \(u(t)\) subject to magnitude and rate constraints; the sensor \(H(s)\) that produces the measurement \(y_m(t)=H(s)y(t)+n(t)\); and the controller \(C(s)\) that generates \(u_c(t)\) from the error \(e(t)=r(t)-y_m(t)\). The closed-loop transfer function from reference to output, assuming linearity and time-invariance, is  
\[
T(s)=\frac{C(s)A(s)P(s)}{1+C(s)A(s)P(s)H(s)}.
\]
All poles of \(T(s)\) must lie in the open left-half plane for internal stability (Dorf & Bishop, *Modern Control Systems*, 14e, §4.4).

## 8. Visual — diagram or schematic
```text
r(t) ---->(+)----> [ C(s) ] ----> [ A(s) ] ----> [ P(s) ] ----> y(t)
           ^ -                         actuator     plant
           |                           effort
        [ H(s) ] <--- sensor <-----------------------------+
           noise n(t)
```
Labels: r = reference, e = error, u_c = controller output, u = actuator output, y = plant output, y_m = measured output.

## 9. The memory technique
1. **The hook** — Imagine a waiter (controller) watching a spinning plate (plant) through foggy glasses (sensor) and pushing it with his hand (actuator); if any one is missing the plate falls.
2. **What to overlearn** — Closed-loop characteristic equation \(1+L(s)=0\) where \(L(s)=C A P H\); actuator saturation limits; sensor noise propagation \(K_p^2 \sigma_n^2\).
3. **Spaced-repetition schedule** — Review block diagram and hook image after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from Newton’s second law on the plant, add actuator dynamics as first-order lag, add measurement equation, then close the algebraic loop to obtain the characteristic polynomial.

## 10. What this unlocks
Once you can draw and analyse the four-block loop you can move to state-space control, Kalman filtering, robust \(\mu\)-synthesis and model-predictive control used in launch-vehicle ascent guidance.

- GNC textbook chapters on “autopilot design” and “ thruster management”
- Observability and controllability tests for the augmented plant+actuator+sensor system
- Gain scheduling across flight regimes

## 11. Self-check — five questions, no answers
1. A reaction-wheel plant has \(J=2\) kg m². If you close a proportional loop with \(K_p=10\), what is the closed-loop time constant?
2. An actuator saturates at 3 Nm. If the proportional controller demands 15 Nm, what happens to the effective plant input?
3. Sensor noise has variance 0.05 (rad/s)². With \(K_p=8\), compute the variance of the torque command.
4. Draw the block diagram when actuator dynamics are placed before the plant and show where saturation must be inserted.
5. A student flips the sign of feedback; list the first three observable behaviours in a hardware test.