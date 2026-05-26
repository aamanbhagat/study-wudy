## 1. The one-sentence answer
An **IMU** is a rigid assembly of accelerometers and gyroscopes that measures a vehicle’s specific force and angular velocity in its body frame, enabling dead-reckoning of position and attitude when external references are unavailable.

Accelerometers sense linear acceleration along three orthogonal axes; any real accelerometer also registers gravity, so the measured quantity is specific force. Gyroscopes sense angular rates about the same three axes. Numerical integration of the angular rates yields attitude; double integration of the specific-force vector, after it has been rotated into an inertial frame using that attitude, yields velocity and position. Because both sensors are corrupted by bias, scale-factor error and noise, the resulting navigation solution drifts; nevertheless the IMU supplies the only continuous, self-contained measurements available during boost, re-entry, or deep-space coast.

> [!NOTE]
> The decisive insight is that an IMU never measures position or attitude directly; it measures their second derivatives, so every navigation output is obtained by integration and therefore accumulates error without bound unless external aiding (GPS, star tracker, altimeter) is fused.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship vehicles carry a triple-redundant IMU suite (Honeywell MIMU and Si IMU) whose angular-rate and specific-force data are integrated at 200 Hz to provide the guidance computer with the instantaneous state vector during ascent and boost-back burns; loss of IMU data triggers an immediate abort.

NASA’s Orion spacecraft uses the Lockheed Martin Ascent Guidance IMU together with a baro-inertial hybrid filter; during the Artemis I mission the IMU supplied the only attitude reference while the vehicle was in Earth shadow and star-tracker lock was lost.

Blue Origin’s New Shepard crew capsule employs three orthogonal quartz rate sensors and servo accelerometers whose outputs are propagated through a strap-down inertial navigator; the same IMU also supplies the high-rate angular-rate feedback loop that damps the vehicle’s reaction-control jets during landing.

In semiconductor manufacturing, ASML’s EUV lithography scanners mount a 6-DOF IMU on the wafer stage; sub-nanometer positioning is maintained by integrating the IMU at 10 kHz between interferometer updates, demonstrating that the same physics scales from orbital rockets to nanoscale stages.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Vector differentiation in rotating frames | The body-frame accelerometer output must be rotated into inertial coordinates; the transport theorem supplies the necessary Coriolis and centripetal terms. |
| Quaternion or DCM attitude kinematics | Angular velocity must be integrated to attitude without gimbal-lock singularities. |
| Bias and random-walk noise models | Sensor errors integrate into quadratic position drift; the Allan-variance description quantifies the growth. |
| Specific force versus acceleration | Gravity appears in the accelerometer measurement; distinguishing it from thrust is essential for navigation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An accelerometer does not read “acceleration”
A proof-mass accelerometer measures the non-gravitational force per unit mass required to keep the proof mass at a fixed location inside the instrument case. In free fall the output is therefore zero even though the vehicle is accelerating at −g.

The formal statement is  
\[
\mathbf{f}^b = \mathbf{a}^b - \mathbf{g}^b
\]  
where \(\mathbf{f}^b\) is the specific force reported by the accelerometer triad expressed in the body frame, \(\mathbf{a}^b\) is the true inertial acceleration of the origin, and \(\mathbf{g}^b\) is the local gravity vector expressed in the same frame.

> [!WARNING]
> Treating raw accelerometer output as “acceleration” produces a navigation solution that thinks the vehicle is hovering when it is actually in orbit.

### Step 2 — A gyroscope measures angular velocity, not attitude
A rate-integrating or rate gyroscope outputs the instantaneous angular-velocity vector \(\boldsymbol{\omega}^b_{ib}\) of the body frame relative to inertial space, resolved in body axes. Attitude is recovered only after integration.

The kinematic equation for a direction-cosine matrix \(C_b^i\) is  
\[
\dot{C}_b^i = C_b^i [\boldsymbol{\omega}^b_{ib} \times]
\]  
where \([\boldsymbol{\omega}^b_{ib} \times]\) is the skew-symmetric cross-product matrix.

### Step 3 — Strap-down integration rotates the specific-force vector
Because the IMU is bolted to the vehicle, the accelerometer triad rotates with the body. The measured specific force must be transformed into the inertial frame at each instant before integration:  
\[
\mathbf{f}^i = C_b^i \mathbf{f}^b.
\]

### Step 4 — Double integration yields velocity and position
Once \(\mathbf{f}^i\) is known, Newton’s second law supplies  
\[
\dot{\mathbf{v}}^i = \mathbf{f}^i + \mathbf{g}^i, \qquad \dot{\mathbf{r}}^i = \mathbf{v}^i.
\]  
Both integrations are performed numerically at the IMU sample rate (typically 100–1000 Hz).

### Step 5 — Attitude integration supplies the rotation matrix
Simultaneously, the gyroscope rates are integrated to maintain \(C_b^i(t)\). The quaternion form  
\[
\dot{\mathbf{q}} = \frac12 \boldsymbol{\Omega}(\boldsymbol{\omega}^b_{ib})\mathbf{q}
\]  
avoids singularities and is the industry standard.

### Step 6 — The complete strap-down inertial navigation equations
Collecting the preceding relations yields the textbook strap-down INS:  
\[
\begin{align*}
\dot{\mathbf{v}}^i &= C_b^i \mathbf{f}^b + \mathbf{g}^i, \\
\dot{C}_b^i &= C_b^i [\boldsymbol{\omega}^b_{ib} \times], \\
\mathbf{r}^i(t) &= \mathbf{r}^i(0) + \int_0^t \mathbf{v}^i(\tau)\,d\tau.
\end{align*}
\]  
This is the precise mathematical embodiment of an integrated accelerometer-plus-gyroscope IMU.

## 5. Worked examples — every step shown

**Example 1 — Stationary IMU on Earth**  
*Given:* IMU at rest on a launch pad at latitude 28.5°, local gravity 9.792 m s⁻², body axes aligned with north-east-down.  
*Find:* Expected accelerometer and gyroscope readings.  

Accelerometers read the reaction force that counters gravity:  
\[
\mathbf{f}^b = -\mathbf{g}^b = \begin{bmatrix}0\\0\\+9.792\end{bmatrix}\ \text{m s}^{-2}.
\]  
*Why:* The definition \(\mathbf{f}^b = \mathbf{a}^b - \mathbf{g}^b\) and \(\mathbf{a}^b = 0\) gives the result.  
Gyroscopes read Earth rate projected into the local frame:  
\[
\boldsymbol{\omega}^b_{ib} = \boldsymbol{\omega}_{ie}\cos\phi\ \mathbf{e}_N + \boldsymbol{\omega}_{ie}\sin\phi\ \mathbf{e}_D.
\]  
*Why:* The transport theorem applied to a non-rotating local frame yields the horizontal and vertical components.  
**Final answer**  
\[
\mathbf{f}^b = [0,0,9.792]^\top,\quad\boldsymbol{\omega}^b_{ib}\approx[0,7.29\times10^{-5}\cos28.5^\circ,7.29\times10^{-5}\sin28.5^\circ]^\top\ \text{rad s}^{-1}.
\]

*Reflection:* The example shows that an IMU at rest does not read zero; forgetting the gravity term is the most common beginner mistake.

**Example 2 — Constant thrust, no rotation**  
*Given:* Rocket accelerates at 20 m s⁻² along its body x-axis for 10 s; initial velocity zero.  
*Find:* Velocity and position change.  

Because attitude is constant, \(C_b^i = I\).  
\[
\Delta v_x = \int_0^{10} 20\,dt = 200\ \text{m s}^{-1}.
\]  
*Why:* Direct integration of the inertial acceleration.  
\[
\Delta x = \int_0^{10} 20t\,dt = 1000\ \text{m}.
\]  
*Why:* Second integration of constant acceleration.  
**Final answer**  
\[
\Delta\mathbf{v}^i = [200,0,0]^\top\ \text{m s}^{-1},\quad\Delta\mathbf{r}^i = [1000,0,0]^\top\ \text{m}.
\]

*Reflection:* With zero angular velocity the rotation matrix never changes; the problem reduces to one-dimensional kinematics.

**Example 3 — 90° pitch-over with constant rate**  
*Given:* Constant body rate \(\omega_y = 5^\circ\) s⁻¹ for 18 s; initial attitude level.  
*Find:* Final attitude quaternion.  

The quaternion differential equation integrates analytically for constant rate:  
\[
\mathbf{q}(t) = \begin{bmatrix}\cos(\theta/2)\\0\\\sin(\theta/2)\\0\end{bmatrix},\quad\theta=5^\circ\times18=90^\circ.
\]  
*Why:* The rotation axis is fixed in both body and inertial frames.  
**Final answer**  
\[
\mathbf{q} = [ \tfrac{\sqrt2}{2},\ 0,\ \tfrac{\sqrt2}{2},\ 0 ].
\]

*Reflection:* The example isolates attitude propagation before coupling with translation.

**Example 4 — Position drift due to accelerometer bias**  
*Given:* Constant bias \(b_a = 1\times10^{-4}\) m s⁻² on the x-accelerometer, zero initial errors.  
*Find:* Position error after 1000 s.  

Double integration of bias yields  
\[
\delta r_x(t) = \frac12 b_a t^2 = 50\ \text{m}.
\]  
*Why:* The first integral produces a velocity ramp; the second produces a quadratic position error.  
**Final answer**  
\[
\delta r_x(1000\ \text{s}) = 50\ \text{m}.
\]

*Reflection:* Even micro-g biases become hundreds of metres after a few minutes; this quantifies why external aiding is mandatory.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating accelerometer output as inertial acceleration | Gravity is invisible to the sensor yet appears in the navigation equations | Always subtract the gravity model after rotating into the inertial frame |
| Integrating gyroscope rates with Euler angles | Gimbal lock at 90° pitch | Use quaternions or DCMs exclusively |
| Ignoring coning and sculling motion | High-frequency angular and linear vibration produce rectification errors | Apply coning/sculling compensation algorithms at >200 Hz |
| Assuming sensor biases are constant | Temperature, aging and turn-on hysteresis change bias | Estimate bias states inside an extended Kalman filter |
| Forgetting that the IMU measures specific force, not acceleration | Free-fall produces zero output | Explicitly add the gravity vector after frame transformation |
| Using body-frame velocity increments without rotation compensation | Attitude changes during the velocity increment interval | Apply rotation-vector or Bortz integration over each minor interval |
| Neglecting scale-factor asymmetry | Accelerometers and gyros often have different positive/negative scale factors | Maintain separate scale-factor matrices for each axis direction |

## 7. The textbook-precise statement
An inertial measurement unit consists of three orthogonal accelerometers and three orthogonal rate gyroscopes rigidly mounted with respect to one another. Let \(\mathbf{f}^b\) and \(\boldsymbol{\omega}^b_{ib}\) be the specific-force and angular-velocity vectors resolved in the body frame. The strap-down inertial navigation equations are  
\[
\begin{align*}
\dot{\mathbf{v}}^i &= C_b^i(\mathbf{q})\mathbf{f}^b + \mathbf{g}^i(\mathbf{r}^i), \\
\dot{\mathbf{q}} &= \frac12\boldsymbol{\Omega}(\boldsymbol{\omega}^b_{ib})\mathbf{q}, \\
\dot{\mathbf{r}}^i &= \mathbf{v}^i,
\end{align*}
\]  
where \(C_b^i(\mathbf{q})\) is the direction-cosine matrix corresponding to the attitude quaternion \(\mathbf{q}\). Initial conditions \(\mathbf{r}^i(0)\), \(\mathbf{v}^i(0)\) and \(\mathbf{q}(0)\) must be supplied by external alignment. (See Groves, *Principles of GNSS, Inertial, and Multisensor Integrated Navigation Systems*, 2nd ed., §6.2.)

## 8. Visual — diagram or schematic

```text
          z_b (up)
           ^
           |
   y_b <---o---> x_b (forward)
          / \
         /   \   IMU case
        /     \
   Accel triad     Gyro triad
   (3 orthogonal   (3 orthogonal
    proof masses)   rate sensors)
```

The body frame origin is at the IMU centre; accelerometer and gyroscope sensitive axes are nominally coincident and aligned with the vehicle body axes. Gravity vector \(\mathbf{g}\) is shown pointing downward in the local vertical; the accelerometer triad measures the reaction to \(-\mathbf{g}\) when the vehicle is at rest.

## 9. The memory technique
1. **The hook** — Picture the IMU as a tiny “digital fly” inside the rocket: its gyroscopes feel every twist, its accelerometers feel every shove, and both keep counting even when the outside world goes dark.  
2. **What to overlearn** — The two kinematic equations \(\dot{\mathbf{q}}=\frac12\boldsymbol{\Omega}\mathbf{q}\) and \(\dot{\mathbf{v}}^i=C_b^i\mathbf{f}^b+\mathbf{g}^i\); the fact that position error grows as \(\frac12 b_a t^2\).  
3. **Spaced-repetition schedule** — Review the kinematic pair at 1 day, 3 days, 7 days, 16 days, 35 days; re-derive the quadratic drift term each time.  
4. **First-principles fallback** — Start from Newton’s second law in an inertial frame, apply the transport theorem to obtain body-frame measurements, then integrate twice.

## 10. What this unlocks
Mastery of the IMU supplies the continuous, high-bandwidth core of any inertial navigation system and is the prerequisite for sensor fusion with GPS, star trackers, or altimeters.  

- Extended Kalman filter design for INS/GNSS integration  
- Strap-down attitude heading reference systems (AHRS)  
- Rocket guidance loops that close on IMU-derived velocity and attitude  
- Error-state Kalman filtering and observability analysis  
- Multi-IMU voting and fault detection logic used on human-rated vehicles

## 11. Self-check — five questions, no answers
1. An IMU on a launch pad reads 9.81 m s⁻² downward. After the vehicle reaches orbital velocity in free fall, what does the same accelerometer triad read?  
2. A gyroscope bias of 0.01° h⁻¹ is left uncorrected. After 2 h, what is the approximate attitude error in degrees?  
3. Why must the specific-force vector be rotated into the inertial frame before integration, rather than integrated in the body frame?  
4. Derive the position-error growth rate that results from a constant accelerometer scale-factor error of 100 ppm under constant 3 g acceleration.  
5. An IMU is mounted 2 m forward of the vehicle centre of mass. During a 10° s⁻¹ pitch rate, what fictitious specific-force component appears on the longitudinal accelerometer, and in which direction?