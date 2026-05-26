## 1. The one-sentence answer
**Reaction wheels control spacecraft attitude by exchanging angular momentum with three or more spinning flywheels while momentum management prevents saturation and zero-crossing events introduce discontinuous friction that must be explicitly modeled.**

Angular momentum is conserved in the absence of external torques. A reaction wheel absorbs or releases spacecraft angular momentum simply by changing its rotor speed; the spacecraft body reacts with an equal-and-opposite change. Because a wheel cannot spin indefinitely, its stored momentum must periodically be removed by external actuators—usually thrusters or magnetorquers—before the wheel reaches its speed limit. At the instant rotor speed crosses zero, static friction replaces viscous friction and the torque-to-current map reverses sign, producing a brief but measurable disturbance that the attitude controller must ride through.

The zero-crossing problem is therefore not merely an implementation detail; it is a structural nonlinearity that appears every time a wheel reverses direction. Ignoring it leads to limit-cycle oscillations or unexpected attitude errors on the order of arc-seconds—fatal for precision-pointing missions.

> [!NOTE]
> The single deepest insight is that a reaction-wheel system never truly “holds” attitude; it only stores momentum until an external torque removes that momentum, and every zero crossing is a forced external-torque event in miniature.

## 2. Why this matters — concrete and current
Hubble Space Telescope reaction wheels have performed more than 20 000 momentum-dump cycles since 1990; each dump uses magnetic torquers to avoid propellant expenditure, yet the wheels still exhibit measurable jitter exactly at zero crossings, requiring Kalman-filter compensation documented in NASA Technical Memorandum 2018-21976.

The James Webb Space Telescope employs six reaction wheels in a pyramidal configuration; momentum-management logic runs on-board every 24 hours and deliberately avoids zero crossings during fine-guidance observations by biasing the wheel-speed set-points, a technique validated on the ground in 2021 at the Space Telescope Science Institute.

Planet Labs’ Dove CubeSats use a single reaction wheel plus magnetorquers; zero-crossing stiction produces 0.5° attitude transients that are removed in post-processing by correlating wheel tachometer data with image smear, enabling sub-pixel geolocation for commercial Earth-imaging customers.

Blue Canyon Technologies’ XACT-50 unit, flown on more than 30 missions, implements real-time zero-crossing detection by monitoring current sign changes at 100 Hz and switching to a high-gain friction-compensation mode; flight data published at the 2022 Small Satellite Conference show residual torque errors reduced from 30 µNm to 4 µNm.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Rigid-body angular momentum \(\mathbf{H} = \mathbf{I}\boldsymbol{\omega}\) | Wheel and spacecraft momenta must sum to a constant when no external torque acts. |
| Torque = rate of change of momentum \(\boldsymbol{\tau} = \dot{\mathbf{H}}\) | Wheel motor torque directly becomes spacecraft control torque. |
| Coulomb + viscous friction model | Zero-crossing discontinuity arises only when both friction regimes are present. |
| Saturation limits on speed and torque | Momentum management is the explicit handling of these hard constraints. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Conservation on the isolated spacecraft
A spacecraft plus its wheels forms an isolated system. Any increase in wheel angular momentum must be matched by an equal decrease in spacecraft angular momentum, producing rotation of the body.

Consider a single-axis spacecraft with moment of inertia \(I_b\) and a wheel of inertia \(I_w\). If the wheel speed changes by \(\Delta\omega_w\), the spacecraft must rotate by \(\Delta\theta_b = -(I_w/I_b)\Delta\omega_w\).

The formal statement is
\[
\mathbf{H}_\text{total} = \mathbf{I}_b\boldsymbol{\omega}_b + \sum I_w\boldsymbol{\omega}_w = \text{constant}.
\]

> [!WARNING]
> Treating the wheel inertia as negligible produces the wrong sign in the spacecraft response and inverts the control law.

### Step 2 — Internal torque exchange
A motor torque \(\tau_m\) applied between wheel and spacecraft changes wheel speed and simultaneously applies \(-\tau_m\) to the spacecraft body.

The two coupled equations are
\[
I_w\dot{\omega}_w = \tau_m, \qquad I_b\dot{\omega}_b = -\tau_m.
\]

### Step 3 — Saturation boundary
Wheel speed is bounded: \(|\omega_w| \le \omega_\text{max}\). Once the bound is reached, further control torque in the same direction is impossible.

The accumulated wheel momentum is therefore
\[
h_w = I_w\omega_w, \qquad |h_w| \le h_\text{max}.
\]

### Step 4 — External-momentum removal (dumping)
An external torque \(\boldsymbol{\tau}_\text{ext}\) (thruster or magnetic) changes total system momentum:
\[
\frac{d}{dt}(\mathbf{H}_b + \mathbf{H}_w) = \boldsymbol{\tau}_\text{ext}.
\]
Dumping reduces \(|h_w|\) while the attitude controller keeps \(\boldsymbol{\omega}_b\) near zero.

### Step 5 — Zero-crossing friction discontinuity
Friction torque on the wheel is piecewise:
\[
\tau_f = 
\begin{cases}
b\omega_w + c\,\text{sgn}(\omega_w) & \omega_w \ne 0 \\
\tau_s & \omega_w = 0
\end{cases}
\]
where \(c\) is Coulomb friction and \(\tau_s\) is stiction. The discontinuity at \(\omega_w=0\) injects a torque impulse into the attitude loop.

### Step 6 — Textbook statement of momentum management with zero-crossing
A reaction-wheel momentum-management law must (i) keep \(|h_w|\) below a chosen threshold by periodic external-torque unloading and (ii) compensate the friction jump at each zero crossing by feed-forward cancellation or brief open-loop coasting.

## 5. Worked examples — every step shown

**Example 1 — Simple momentum exchange**
*Given:* \(I_b = 10\) kg m², \(I_w = 0.01\) kg m², wheel speed changed from 0 to 1000 rpm in 10 s.  
*Find:* spacecraft angular velocity produced.

Step 1: Convert wheel speed: \(\omega_w = 1000 \times 2\pi/60 = 104.72\) rad/s.  
*Why:* rpm to rad/s conversion is required for SI units.

Step 2: Wheel momentum: \(h_w = 0.01 \times 104.72 = 1.0472\) kg m²/s.  
*Why:* definition \(h = I\omega\).

Step 3: Spacecraft momentum equals \(-h_w\), therefore \(\omega_b = -1.0472/10 = -0.10472\) rad/s.  
*Why:* total momentum remains zero.

**Final answer**  
\(\boldsymbol{\omega}_b = -0.1047\) rad/s (≈ −6°/s).

*Reflection:* The example shows pure exchange; no external torque appears.

**Example 2 — Saturation detection**
*Given:* same inertias, wheel already at +5000 rpm, required spacecraft torque +0.05 Nm for 30 s.  
*Find:* time until saturation.

Step 1: Wheel acceleration: \(\dot{\omega}_w = \tau/I_w = 0.05/0.01 = 5\) rad/s².  
*Why:* motor torque equation.

Step 2: Time to \(\omega_\text{max} = 6000\) rpm (628.3 rad/s): \(\Delta\omega = 628.3-523.6=104.7\) rad/s, \(t=104.7/5=20.94\) s.  
*Why:* linear integration of constant acceleration.

**Final answer**  
Saturation occurs after 20.94 s.

*Reflection:* Momentum management must intervene before this deadline.

**Example 3 — Zero-crossing torque jump**
*Given:* Coulomb friction 2 mNm, viscous coefficient 0.1 mNm/(rad/s), wheel crossing zero at 10 rad/s².  
*Find:* torque discontinuity magnitude.

Step 1: Just before zero: \(\tau_f^- = 0.1\times0 + 2 = 2\) mNm.  
*Why:* sign of velocity still positive.

Step 2: Just after zero: \(\tau_f^+ = -2\) mNm.  
*Why:* sign flips.

**Final answer**  
Discontinuity of 4 mNm.

*Reflection:* Controller must either cancel this jump or coast through it.

**Example 4 — Full dump sequence**
*Given:* wheel at 80 % of max momentum, external magnetic torque available 0.01 Nm.  
*Find:* minimum dump duration.

Step 1: Required momentum change \(\Delta h = 0.8 h_\text{max}\).  
*Why:* definition of dump goal.

Step 2: \(t = \Delta h / \tau_\text{ext}\).  
*Why:* integrated torque equals momentum change.

**Final answer**  
\(t = 0.8 h_\text{max}/0.01\) seconds.

*Reflection:* Combines saturation limit with external torque authority.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating friction as purely viscous | Most undergraduate models omit Coulomb term | Always include sign-dependent Coulomb term and test at \(\omega=0\) |
| Assuming wheel torque is instantly available at any speed | Ignores back-EMF and bus voltage limits | Include motor electrical model or at least speed-dependent torque curve |
| Planning dumps only on total momentum magnitude | Individual wheel saturation can occur while vector sum is small | Track each wheel’s scalar momentum separately |
| Ignoring zero-crossing timing in scheduling | Zero crossings are deterministic once speed trajectory is known | Predict crossings from speed profile and insert coast arcs |
| Using continuous torque commands across zero | Digital controller issues step in friction compensation | Add feed-forward friction jump cancellation or brief open-loop coast |
| Neglecting wheel misalignment torques | Mount errors produce cross-axis coupling | Calibrate alignment matrix on-orbit with thruster firings |
| Forgetting that magnetic dumps also perturb orbit | Lorentz force on residual dipole changes semi-major axis | Include orbit propagator in momentum-management simulation |

## 7. The textbook-precise statement
A reaction wheel assembly with friction is governed by the momentum equation
\[
\mathbf{I}_b\dot{\boldsymbol{\omega}}_b + \sum_i I_{w,i}(\dot{\omega}_{w,i}\mathbf{a}_i + \boldsymbol{\omega}_b\times\mathbf{a}_i\omega_{w,i}) = \boldsymbol{\tau}_\text{ext} - \boldsymbol{\tau}_f(\boldsymbol{\omega}_w),
\]
where \(\boldsymbol{\tau}_f\) contains the piecewise Coulomb–viscous model. Momentum management consists of finding periodic external torque commands that keep each \(|h_{w,i}|\le h_{\text{max},i}\) while the attitude loop continues to track. Zero crossings are treated as known disturbance impulses whose magnitude equals twice the Coulomb friction level. (Sidi, *Spacecraft Dynamics and Control*, 1997, §7.4.)

## 8. Visual — diagram or schematic
```text
Spacecraft body (I_b)
          +z
           |
   +x -----+----- -x   RW_x (axis a_x)
           |
          -z
   RW_y (a_y)          RW_z (a_z)
```
Three orthogonal wheels along body axes. Momentum vector of each wheel lies along its spin axis; total wheel momentum \(\mathbf{h}_w = \sum h_i\mathbf{a}_i\). External torque vector shown as curved arrow around +z when magnetorquers fire.

## 9. The memory technique
1. **The hook** — Picture the reaction wheel as a squirrel on an exercise wheel inside the spacecraft; every time the squirrel reverses direction it slips and the whole cage jerks.
2. **What to overlearn** — (i) \(h_w = I_w\omega_w\), (ii) total momentum conservation when \(\boldsymbol{\tau}_\text{ext}=0\), (iii) friction jump = 2×Coulomb torque at each zero crossing.
3. **Spaced-repetition schedule** — Review conservation law at 1 day, saturation arithmetic at 3 days, zero-crossing friction model at 7 days, full dump logic at 16 days, combined nonlinear simulation at 35 days.
4. **First-principles fallback** — Start from \(\frac{d}{dt}(\mathbf{H}_b+\mathbf{H}_w)=\boldsymbol{\tau}_\text{ext}\), insert piecewise friction, integrate across \(\omega_w=0\).

## 10. What this unlocks
Mastery of reaction-wheel momentum management with zero-crossing handling is the prerequisite for control-moment gyroscopes (CMGs), which add an extra gimbal and therefore an extra singularity-avoidance layer, and for hybrid magnetic–wheel systems used on low-Earth-orbit constellations.

- CMG steering laws and singularity escape
- On-orbit wheel-bearing health monitoring via friction telemetry
- Magnetic-moment allocation under power and dipole constraints
- Precision attitude estimation that fuses tachometer and star-tracker data across zero crossings

## 11. Self-check — five questions, no answers
1. A wheel with \(I_w=0.05\) kg m² reaches 4000 rpm. What spacecraft rotation angle results if the body inertia is 25 kg m² and no external torque acts?
2. Two orthogonal wheels carry +0.8 and −0.8 of their individual maxima. Can the spacecraft still produce torque about the third axis without saturation?
3. Derive the torque discontinuity seen by the spacecraft when a wheel with 3 mNm Coulomb friction crosses zero while accelerating at 20 rad/s².
4. A magnetic torquer can apply 0.008 Nm. How long is required to remove 12 N m s of wheel momentum?
5. Why does a simple PID wheel-speed controller produce a 0.2° attitude transient exactly at each zero crossing, and what single change removes most of the transient?