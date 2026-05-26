## 1. The one-sentence answer
**An IMU is a strapdown sensor package that fuses triaxial accelerometer measurements of specific force with triaxial gyroscope measurements of angular velocity to compute position, velocity and attitude by double integration in an inertial frame.**

Accelerometers alone cannot distinguish gravity from vehicle acceleration and suffer quadratic position drift; gyroscopes alone give only orientation and accumulate angular error linearly with time. When both are rigidly mounted together and sampled at high rate, their complementary error characteristics allow short-term inertial propagation that is independent of external signals such as GPS. In practice the raw specific-force vector \(f^b\) and angular-rate vector \(\omega^b_{ib}\) are rotated into the navigation frame using the current attitude estimate and then integrated.

> [!NOTE]
> The single most important insight is that an IMU never measures absolute position; it only measures derivatives. All position and attitude therefore come from integration, which is why bias and noise specifications dominate IMU performance.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site burns rely on a Honeywell Miniature IMU (MIMU) for real-time attitude and velocity updates during the boost-back and entry phases when GPS is temporarily lost in the plasma sheath.  

ISRO’s Chandrayaan-3 lander used a triad of laser gyros and quartz accelerometers inside its IMU to maintain attitude knowledge during the 25-minute powered descent while the terrain-relative navigation camera was still acquiring lock.  

Modern smartphone AR/VR headsets (Apple Vision Pro, Meta Quest 3) contain a Bosch BMI260 IMU whose 6-axis output is fused at 800 Hz to predict head orientation 20 ms ahead, reducing motion-to-photon latency below perceptible thresholds.  

Autonomous underwater vehicles such as WHOI’s Sentry AUV run a tactical-grade IMU (KVH 1750) for dead-reckoning between sparse acoustic fixes; position error grows at roughly 0.1 % of distance travelled when Doppler-velocity-log data are unavailable.  

The James Webb Space Telescope’s fine-pointing loop uses a set of six Honeywell HRG gyros whose combined Allan variance floor of \(7 \times 10^{-5}\) °/h enables sub-milliarcsecond stability over 10 000 s exposures.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector differentiation in rotating frames | Converts body-frame accelerometer and gyro readings into the inertial navigation equations |
| Direction-cosine matrix or quaternion kinematics | Propagates attitude from integrated angular velocity without gimbal-lock singularities |
| Bias, random walk and Allan variance | Quantifies the sensor errors that dominate after integration |
| Complementary filter / Kalman filter basics | Shows how accelerometer gravity reference corrects gyro drift at low frequency |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Raw accelerometer output
An accelerometer measures specific force, the difference between actual acceleration and gravitational acceleration, expressed in the sensor’s own axes.  
A smartphone lying flat on a table reports \(f^b = [0,0,9.81]^\top\) m s\(^{-2}\) because the normal force cancels gravity.  
Mathematically the measurement equation is  
\[f^b = R^n_b(\,a^n - g^n\,) + b_a + \nu_a\]  
where \(R^n_b\) is the body-to-navigation rotation matrix, \(b_a\) is bias and \(\nu_a\) is noise.  
> [!WARNING]  
> Treating accelerometer output as “acceleration” without subtracting and rotating gravity will produce completely wrong velocity and position.

### Step 2 — Raw gyroscope output
A gyroscope measures angular velocity of the body frame relative to inertial space, again expressed in body axes.  
If the phone is rotated 90° about its z-axis in one second, the gyro reports \(\omega^b_{ib} \approx [0,0,\pi/2]^\top\) rad s\(^{-1}\).  
The kinematic equation that updates attitude is  
\[\dot{R}^n_b = R^n_b [\omega^b_{ib} \times]\]  
or the equivalent quaternion differential equation.  
> [!WARNING]  
> Even a 0.1 °/h bias integrates to 6° after one hour; attitude error then rotates the gravity vector into the horizontal plane and produces a false 0.17 m s\(^{-2}\) acceleration that grows quadratically in position.

### Step 3 — Strapdown integration chain
Both sensors are rigidly fixed (“strapped down”) to the vehicle. At each time step the algorithm (1) integrates gyro data to obtain the new attitude matrix, (2) rotates the accelerometer vector into the navigation frame using that matrix, (3) subtracts gravity, and (4) integrates once for velocity and again for position.  
The discrete update for velocity is  
\[v^n_{k+1} = v^n_k + \bigl(R^n_b f^b_k - g^n\bigr)\Delta t\]  
> [!WARNING]  
> Any attitude error at step (1) immediately corrupts the rotation of \(f^b\), coupling gyro error into velocity and position.

### Step 4 — Error propagation model
Linearising the navigation equations yields the classic 15-state inertial error model whose dominant terms are  
\[\delta\dot{v}^n = -\,[\,f^n\times\,]\,\psi^n + R^n_b\,\delta f^b\]  
\[\dot{\psi}^n = -\,[\,\omega^n_{in}\times\,]\,\psi^n + R^n_b\,\delta\omega^b\]  
where \(\psi\) is the attitude-error vector.  
> [!WARNING]  
> Ignoring the skew-symmetric coupling term \([\ f^n\times\ ]\) makes the model predict unbounded attitude drift instead of the Schuler oscillation actually observed.

### Step 5 — Sensor fusion with gravity reference
A simple complementary filter blends high-pass-filtered gyro integration with low-pass-filtered accelerometer gravity direction:  
\[\hat{\theta} = \alpha\,(\hat{\theta} + \omega\Delta t) + (1-\alpha)\,\theta_{\text{accel}}\]  
with \(\alpha \approx 0.98\) at 100 Hz.  
> [!WARNING]  
> Over-filtering removes legitimate high-frequency manoeuvres; under-filtering lets gyro bias leak into the attitude solution.

### Step 6 — Textbook-grade IMU mechanisation equations
The complete strapdown inertial navigation equations (Titterton & Weston, 2nd ed., §3.3) are  
\[\dot{v}^n = R^n_b f^b - (2\omega^n_{ie} + \omega^n_{en})\times v^n + g^n\]  
\[\dot{R}^n_b = R^n_b [\omega^b_{ib} \times] - [\omega^n_{in} \times] R^n_b\]  
with initial conditions on position, velocity and attitude. All subsequent GNC algorithms treat these integrated states as measurements.

## 5. Worked examples — har step show karo

**Example 1 — Stationary IMU on Earth**  
*Given:* Accelerometer triad reads \(f^b = [0,0,9.80665]^\top\) m s\(^{-2}\), gyro triad reads \(\omega^b_{ib} = [0,0,7.2921159\times10^{-5}]^\top\) rad s\(^{-1}\).  
*Find:* Expected velocity and attitude after 10 s if biases are zero.  
Step 1: Subtract gravity → net acceleration = 0.  
Step 2: Integrate → \(\Delta v = 0\).  
Step 3: Integrate attitude using Earth-rate rotation about local vertical.  
*Why* each step: zero net force implies constant velocity; Earth rotation must still be tracked.  
**Final answer**  
\[v^n(10\text{ s}) = [0,0,0]^\top,\quad R^n_b(10\text{ s}) = R_z(7.2921159\times10^{-4}\text{ rad})\]  

*Reflection*: Even at rest the IMU must integrate Earth rate; forgetting this produces a false 0.00146 m s\(^{-1}\) eastward velocity after 10 s.

**Example 2 — Constant 1 m s\(^{-2}\) surge**  
*Given:* \(f^b = [1,0,9.80665]^\top\) m s\(^{-2}\), \(\omega = 0\), initial \(v=0\), level attitude.  
*Find:* Velocity and position after 5 s.  
Step 1: Rotate \(f^b\) into NED → north acceleration = 1 m s\(^{-2}\).  
Step 2: \(v_N = 1\times5 = 5\) m s\(^{-1}\).  
Step 3: \(s_N = 0.5\times1\times25 = 12.5\) m.  
*Why* each step: gravity is removed before integration.  
**Final answer**  
\[v_N = 5\text{ m s}^{-1},\quad s_N = 12.5\text{ m}\]  

*Reflection*: The example isolates double integration; any bias in the accelerometer would appear as quadratic position error.

**Example 3 — 90° yaw rotation**  
*Given:* Constant \(\omega_z = \pi/2\) rad s\(^{-1}\) for 1 s, accelerometer stationary.  
*Find:* Final attitude matrix.  
Step 1: Integrate angle \(\theta = \pi/2\).  
Step 2: \(R = R_z(\pi/2)\).  
**Final answer**  
\[R^n_b = \begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix}\]  

*Reflection*: Pure gyro integration is exact only when bias and noise are absent.

**Example 4 — Bias-induced drift**  
*Given:* 0.01 °/h gyro bias about vertical axis, stationary IMU.  
*Find:* Attitude error after 1 h.  
Step 1: Convert bias to rad s\(^{-1}\): \(b = 4.848\times10^{-8}\) rad s\(^{-1}\).  
Step 2: \(\Delta\theta = b\times3600 = 1.745\times10^{-4}\) rad = 0.01°.  
**Final answer**  
Attitude error = 0.01° after one hour.  

*Reflection*: Shows why tactical-grade IMUs need periodic aiding.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Treating accelerometer output as kinematic acceleration | Gravity is never zero                       | Always subtract \(g^n\) after frame rotation |
| Ignoring coning & sculling integrals | High-frequency angular and linear motion couple into attitude and velocity | Use coning/sculling compensation algorithms at >200 Hz |
| Using Euler angles for attitude propagation | Gimbal lock at 90° pitch                    | Switch to quaternions or DCM                 |
| Forgetting transport-rate term | Vehicle moving over curved Earth            | Include \(\omega^n_{en}\) in gyro compensation |
| Assuming constant bias        | Temperature and ageing change bias          | Estimate bias states inside the Kalman filter |
| Over-trusting IMU during GPS outages longer than spec | Position error grows quadratically          | Monitor innovation sequence; switch to aiding sensor earlier |

## 7. The textbook-precise statement
An inertial measurement unit consists of three orthogonal accelerometers and three orthogonal gyroscopes rigidly mounted with respect to one another. Let \(f^b\) be the specific-force vector and \(\omega^b_{ib}\) the angular-velocity vector, both resolved in the body frame. The strapdown inertial navigation equations (Titterton & Weston, *Strapdown Inertial Navigation Technology*, 2nd ed., §3.3) are
\[
\dot{v}^n = R^n_b f^b - (2\omega^n_{ie}+\omega^n_{en})\times v^n + g^n,
\]
\[
\dot{R}^n_b = R^n_b[\omega^b_{ib}\times]-[\omega^n_{in}\times]R^n_b,
\]
with initial conditions \(v^n(t_0)\), \(R^n_b(t_0)\) and position. All sensor errors are modelled as additive biases and noise processes whose power-spectral densities are characterised by Allan variance.

## 8. Visual — diagram or schematic
```
NED frame (n)          Body frame (b)
  N (North)               +z (up)
   ^                       ^
   |                       |
E<-+->W                 y<-+->x (forward)
   |                       |
   v                       v
  D (Down)               -z (down)
Accelerometer triad measures f^b along x,y,z.
Gyro triad measures ω^b along same axes.
Attitude matrix R^n_b rotates vectors between frames.
```

## 9. The memory technique
1. **The hook** — Picture a blindfolded pilot inside a sealed box; the accelerometers are his inner-ear linear sensors and the gyros are his semicircular canals; together they keep the box oriented while the pilot integrates every jolt.  
2. **What to overlearn** — The two mechanisation equations above and the fact that position error grows as \(\frac12 b_a t^2\).  
3. **Spaced-repetition schedule** — Review the equations after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — If you forget the transport-rate term, re-derive it from the rotating-frame differentiation rule \(\frac{d^n}{dt} = \frac{d^b}{dt} + \omega^n_b\times\).

## 10. What this unlocks
Mastery of the IMU mechanisation equations is the prerequisite for every subsequent GNC block.  
- GPS/INS Kalman-filter architectures treat IMU outputs as the process model.  
- Star-tracker and terrain-referenced navigation algorithms use IMU-propagated attitude as the high-rate backbone.  
- Powered-descent guidance (Apollo E-guidance, fuel-optimal divert) integrates IMU acceleration at 100 Hz to close the velocity loop.  
- Fault-detection and isolation logic monitors IMU consistency before handing control to a redundant unit.

## 11. Self-check — five questions, no answers
1. A stationary IMU on the equator shows a constant vertical accelerometer reading of 9.81 m s\(^{-2}\). After 3600 s the integrated position shows a 10 m northward drift. Which single sensor error most likely explains the observation?  
2. Derive the attitude-error differential equation when a constant body-frame gyro bias is present and the vehicle is stationary at the pole.  
3. An IMU with 1 mg accelerometer bias flies a straight-and-level 100 m s\(^{-1}\) trajectory for 60 s. Compute the along-track position error at the end of the minute.  
4. Why does a complementary filter with cutoff 0.01 Hz still allow a 0.05 °/s gyro bias to produce unbounded attitude drift?  
5. In the 15-state inertial error model, which off-diagonal term couples north velocity error into east attitude error, and under what flight condition does this term vanish?