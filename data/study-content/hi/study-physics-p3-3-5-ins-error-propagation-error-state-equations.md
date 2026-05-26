## 1. The one-sentence answer
**INS error propagation via error state equations** is the linearized differential model that tracks how small errors in inertial sensor measurements (accelerometer and gyroscope) grow into position, velocity, and attitude errors over time.

Error state equations let you replace the full nonlinear INS equations with a smaller linear system whose states are the *errors* themselves. You integrate this linear system alongside the main navigation solution and feed its covariance into a Kalman filter so that GPS, barometer or other aiding measurements can periodically reset the growing drift. The key behaviour is that horizontal position error grows cubically with time when accelerometer bias is present, while attitude error couples into velocity through the gravity vector, creating the well-known Schuler oscillation at roughly 84 minutes.

> [!NOTE]
> The single most important insight is that you never propagate the full high-rate INS states inside the filter; you propagate only the *error* states at a much lower rate, because the error dynamics are slow and linear.

## 2. Why this matters — concrete and current
SpaceX uses error-state Kalman filters on Falcon 9 and Starship to blend IMU data with GPS and radar altimeter measurements; the filter’s 18-state error model (position, velocity, attitude, gyro/accel biases) is propagated at 200 Hz while the main strapdown INS runs at 1 kHz.

Airbus A350 and Boeing 787 flight management computers run tightly coupled INS/GPS solutions whose error-state propagation supplies the integrity monitoring required for RNP-AR approaches; any undetected growth in horizontal position error beyond 0.1 NM triggers a caution.

NASA’s Perseverance rover propagates a 15-state error model on its inertial measurement unit between UHF updates from the Mars Reconnaissance Orbiter; the same formulation appears in the open-source NavLab library used by thousands of autonomous-vehicle teams.

Modern smartphone chipsets (Qualcomm Snapdragon, Apple A-series) embed a miniature error-state INS inside the sensor hub so that step-counting and AR tracking remain usable for several seconds after GNSS is lost inside a building.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Strapdown INS mechanisation | Supplies the reference trajectory about which linearisation occurs |
| Direction cosine matrix or quaternion attitude representation | Attitude error must be expressed in the same frame used by the INS |
| Linearisation of nonlinear ODEs | Error-state equations are the first-order Taylor expansion of the full navigation equations |
| Continuous-to-discrete transition matrix | Needed to propagate the error covariance in a real-time Kalman filter |
| Observability of aided navigation systems | Tells you which error states become observable when GPS or baro measurements arrive |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the raw sensor measurements
Raw accelerometer and gyro outputs contain unknown constant biases plus noise. These biases integrate once into velocity and attitude, then again into position, so even a 1 mg bias produces a 0.5 m s⁻² acceleration error that grows quadratically.

Example: a stationary IMU with 100 µg bias on the north accelerometer yields 0.1 mm s⁻²; after 60 s the velocity error is already 0.36 m s⁻¹ and position error is 10.8 m.

Formally the measurement model is  
$$
\mathbf{f}^b = \mathbf{f}_\text{true}^b + \mathbf{b}_a + \mathbf{w}_a
$$
where \(\mathbf{b}_a\) is the bias vector.

> [!WARNING]
> Treating bias as zero instantly makes the subsequent linearisation inconsistent; the filter will diverge once the real bias integrates.

### Step 2 — Write the full nonlinear navigation equations
Position, velocity and attitude obey  
$$
\dot{\mathbf{r}}^n = \mathbf{v}^n, \quad
\dot{\mathbf{v}}^n = \mathbf{C}_b^n(\mathbf{f}^b - \mathbf{b}_a) + \mathbf{g}^n, \quad
\dot{\mathbf{C}}_b^n = \mathbf{C}_b^n[\boldsymbol{\omega}^b\times]
$$
Any small perturbation \(\delta\mathbf{r},\delta\mathbf{v},\delta\boldsymbol{\psi},\delta\mathbf{b}_a,\delta\mathbf{b}_g\) must be tracked.

### Step 3 — Perturb every variable and retain only first-order terms
Substitute \(\mathbf{r} + \delta\mathbf{r}\), \(\mathbf{C}_b^n(\mathbf{I} - [\delta\boldsymbol{\psi}\times])\) etc. into the nonlinear equations, subtract the nominal trajectory, and discard all products of small quantities. The result is the linear error-state dynamics  
$$
\delta\dot{\mathbf{x}} = \mathbf{F}(t)\delta\mathbf{x} + \mathbf{G}(t)\mathbf{w}(t)
$$
where the 15- or 18-state vector \(\delta\mathbf{x}\) contains position, velocity, attitude, and sensor biases.

### Step 4 — Assemble the continuous error-state matrix \(\mathbf{F}\)
The attitude-error row contains the transport-rate and Earth-rate cross-product terms; the velocity-error row contains \(-\mathbf{C}_b^n\) scaled by accelerometer bias and the skew-symmetric gravity/centrifugal coupling. Horizontal position error therefore oscillates at the Schuler frequency \(\sqrt{g/R}\approx 0.00124\) rad s⁻¹.

### Step 5 — Discretise for the Kalman filter
Over each aiding interval the state transition matrix is  
$$
\boldsymbol{\Phi}(t_{k+1},t_k) = \exp\left(\int_{t_k}^{t_{k+1}}\mathbf{F}(\tau)\,d\tau\right)
$$
which is evaluated with Padé approximation or exact closed-form blocks for the Schuler dynamics.

### Step 6 — Propagate covariance and apply measurement updates
The filter predicts  
$$
\mathbf{P}_{k+1}^- = \boldsymbol{\Phi}\mathbf{P}_k^+\boldsymbol{\Phi}^T + \mathbf{Q}_d
$$
and corrects with any external measurement whose residual is sensitive to the error states (GPS position, baro altitude, magnetometer heading).

### Step 7 — Reset the full INS with the estimated errors
After each measurement update the estimated \(\delta\hat{\mathbf{r}},\delta\hat{\mathbf{v}},\delta\hat\boldsymbol{\psi}\) are subtracted from the strapdown solution and the sensor biases are used to correct the raw IMU outputs; the error-state vector is then reset to zero. This “closed-loop” correction keeps linearisation valid.

## 5. Worked examples — har step show karo

**Example 1 — Stationary 1-D accelerometer bias**
*Given:* North accelerometer bias \(b_a = 100\,\mu g\), initial errors zero, stationary on Earth.  
*Find:* North position error after 60 s.  
Step 1: acceleration error = \(b_a\).  
Step 2: velocity error = \(b_a t\).  
Step 3: position error = \(\frac12 b_a t^2\).  
*Why* each integration follows the chain rule on the double-integrator kinematics.  
**Final answer** 10.8 m north.

*Reflection:* Shows quadratic growth; any real filter must estimate \(b_a\) before 30 s or the position residual becomes unusable.

**Example 2 — Attitude error into velocity (tilt)**
*Given:* 0.1° initial pitch error, perfect sensors, stationary.  
*Find:* north velocity error after 10 s.  
The tilt produces a spurious specific-force component \(g\sin(0.1^\circ)\approx 0.017\,\text{m s}^{-2}\).  
Integrate once: \(\delta v_N = 0.17\,\text{m s}^{-1}\).  
**Final answer** 0.17 m s⁻¹.

*Reflection:* Demonstrates gravity coupling; attitude error must be estimated even when the vehicle is not manoeuvring.

**Example 3 — Schuler oscillation (analytic)**
*Given:* 18-state \(\mathbf{F}\) matrix evaluated at latitude 0°.  
*Find:* eigenvalues of the horizontal position-velocity-attitude block.  
The characteristic equation yields roots at \(\pm j\sqrt{g/R}\).  
**Final answer** period 84.4 min.

*Reflection:* Bounded oscillation means unbounded position error never occurs from attitude alone; aiding is still required for long-term accuracy.

**Example 4 — Discrete transition matrix (numerical)**
*Given:* 1 s interval, constant \(\mathbf{F}\) with Schuler terms.  
*Find:* \(\boldsymbol{\Phi}(1\,\text{s})\) top-left 3×3 block.  
Padé approximant of order 4 yields  
$$
\boldsymbol{\Phi}_{rr} = \mathbf{I},\quad
\boldsymbol{\Phi}_{rv} = t\mathbf{I},\quad
\boldsymbol{\Phi}_{r\psi} = -\frac12 g t^2\mathbf{N}
$$
where \(\mathbf{N}\) is the north-pointing matrix.  
**Final answer** the 3×3 block shown above.

*Reflection:* Closed-form blocks avoid repeated matrix exponentiation inside the flight computer.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Propagating full nonlinear states inside the Kalman filter | Students forget the error-state formulation exists | Always maintain a separate high-rate strapdown INS and only integrate the 15–18 error states at aiding rate |
| Linearising about a diverging trajectory | Initial alignment error > 5° makes first-order Taylor invalid | Perform coarse alignment or use large-angle attitude error representations (MRPs, quaternions) until covariance drops |
| Ignoring Earth-rate and transport-rate terms | At high latitude or high speed the omitted \(\boldsymbol{\omega}_{ie}^n\) and \(\boldsymbol{\omega}_{en}^n\) corrupt attitude error dynamics | Keep the full \(\mathbf