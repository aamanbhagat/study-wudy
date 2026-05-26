## 1. The one-sentence answer
**INS error propagation through error state equations is the set of linear, time-varying differential equations that describe the time evolution of small navigation errors in position, velocity, and attitude caused by imperfect inertial sensor measurements.**

An inertial navigation system integrates specific force and angular rate measurements to compute position, velocity, and attitude. Because integration is an unstable process, even tiny constant sensor errors produce position errors that grow without bound. The error-state approach therefore never tracks the full navigation solution; instead it tracks only the difference between the computed solution and the true trajectory.

Linearization is performed about the computed trajectory itself. The resulting state vector contains the three position errors, three velocity errors, three attitude errors (usually expressed as a small rotation vector), and any sensor biases or scale-factor errors judged important. The dynamics matrix that multiplies this state vector contains the familiar skew-symmetric Earth-rate and specific-force terms that couple attitude errors into velocity errors and velocity errors into position errors.

> [!NOTE]
> The single most important insight is that the error-state equations are *homogeneous* when sensor errors are treated as constant biases; all subsequent growth of navigation error is therefore completely determined by the initial error and the vehicle’s own acceleration and angular-rate history.

## 2. Why this matters — concrete and current
SpaceX uses a tightly coupled INS/GPS filter on every Falcon 9 first-stage return-to-launch-site burn; the error-state propagation matrix is recomputed at 200 Hz from the vehicle’s measured acceleration so that the Kalman filter can correctly predict how gyro bias will tilt the velocity estimate during the boost-back burn.

Airbus A350 and Boeing 787 flight-management computers maintain three independent laser-gyro inertial reference systems whose error-state models feed the aircraft’s air-data inertial reference units; regulatory requirements (EASA AMC 25.1309) demand that the predicted position error growth after 30 minutes of coasting be shown analytically from these same linearized equations.

NASA’s Perseverance rover propagates its attitude estimate with a tactical-grade IMU during entry, descent, and landing; the error-state formulation supplies the covariance that triggers the switch from inertial to terrain-relative navigation when the tilt error exceeds 0.5°.

Modern smartphone AR frameworks (ARKit, ARCore) run a lightweight error-state Kalman filter at 1 kHz on the phone’s MEMS gyroscope and accelerometer; without the analytic propagation of attitude error into virtual-object drift, registration error would exceed several centimetres within seconds.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Linearization of nonlinear ODEs | The navigation equations are nonlinear; error-state equations are their first-order Taylor expansion about the computed trajectory. |
| Skew-symmetric matrix cross-product operator | Attitude-error kinematics are expressed with the 3×3 skew-symmetric matrix of the angular-rate vector. |
| Specific force and Earth-rate vectors | These quantities appear explicitly in the velocity- and attitude-error coupling terms. |
| Basic state-space form \(\dot{\mathbf{x}}=\mathbf{F}\mathbf{x}+\mathbf{G}\mathbf{w}\) | The final error-state model must be written in this standard form for Kalman filtering. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the ideal strapdown navigation equations
In the absence of errors the computer integrates the measured specific force \(\mathbf{f}^b\) and angular rate \(\boldsymbol{\omega}^b_{ib}\) to obtain velocity and attitude. The attitude matrix \(\mathbf{C}^n_b\) obeys the differential equation
\[
\dot{\mathbf{C}}^n_b = \mathbf{C}^n_b[\boldsymbol{\omega}^b_{ib}\times] - [\boldsymbol{\omega}^n_{in}\times]\mathbf{C}^n_b.
\]
A small constant bias in either sensor immediately violates this ideal integration.

> [!WARNING]
> Omitting the transport-rate term \([\boldsymbol{\omega}^n_{in}\times]\) produces an attitude error that grows linearly with time even on a stationary vehicle.

### Step 2 — Introduce small additive perturbations
Let the true quantities be the computed quantities plus small errors:
\[
\mathbf{f}^b = \hat{\mathbf{f}}^b + \delta\mathbf{f}^b, \quad
\boldsymbol{\omega}^b_{ib} = \hat{\boldsymbol{\omega}}^b_{ib} + \delta\boldsymbol{\omega}^b.
\]
Position, velocity, and attitude errors are defined in the navigation frame:
\[
\delta\mathbf{r}^n, \quad \delta\mathbf{v}^n, \quad \boldsymbol{\psi}^n
\]
where \(\boldsymbol{\psi}^n\) is the small rotation vector such that the true attitude matrix satisfies \(\mathbf{C}^n_b = (\mathbf{I}-[\boldsymbol{\psi}^n\times])\hat{\mathbf{C}}^n_b\).

### Step 3 — Differentiate the error definitions and substitute
Differentiating \(\delta\mathbf{v}^n = \mathbf{v}^n - \hat{\mathbf{v}}^n\) and inserting the perturbed specific-force equation yields the velocity-error differential equation containing the cross-product term \(\mathbf{f}^n\times\boldsymbol{\psi}^n\).

### Step 4 — Linearize all products, discarding second-order terms
After linearization the attitude-error kinematics become
\[
\dot{\boldsymbol{\psi}}^n = -[\boldsymbol{\omega}^n_{in}\times]\boldsymbol{\psi}^n + \delta\boldsymbol{\omega}^n_{in} - \mathbf{C}^n_b\delta\boldsymbol{\omega}^b.
\]
The same procedure applied to velocity produces the well-known “psi-angle” form.

### Step 5 — Augment the state with sensor errors
Constant or random-walk biases are appended:
\[
\mathbf{x} = \begin{bmatrix}\delta\mathbf{r}^n \\ \delta\mathbf{v}^n \\ \boldsymbol{\psi}^n \\ \mathbf{b}_a \\ \mathbf{b}_g\end{bmatrix}.
\]
The composite dynamics matrix \(\mathbf{F}\) is therefore 15×15 for a tactical-grade system.

### Step 6 — Assemble the complete linear error-state equation
Collecting every term produces the textbook propagation law
\[
\dot{\mathbf{x}} = \mathbf{F}(t)\mathbf{x} + \mathbf{G}(t)\mathbf{w}(t).
\]

## 5. Worked examples — every step shown

**Example 1 — Stationary north-pointing INS, 1-D position error**
*Given:* North accelerometer bias \(b_a = 10^{-4}\) m s\(^{-2}\), zero initial errors.  
*Find:* North position error after 100 s.  
Step 1: \(\delta\dot{v}^N = b_a\) *Why:* velocity-error equation reduces to direct integration of bias.  
Step 2: \(\delta v^N(t) = b_a t\) *Why:* integrate once.  
Step 3: \(\delta r^N(t) = \frac12 b_a t^2\) *Why:* integrate again.  
**\(\delta r^N(100) = 0.5\) m**  

*Reflection:* Even a micro-g bias produces half-metre error in under two minutes; the quadratic growth is the central practical problem of unaided INS.

**Example 2 — Attitude error coupling into velocity (Schuler effect omitted)**
*Given:* Initial tilt \(\psi^E = 1\) mrad, specific force \(f^D = -g\).  
*Find:* North velocity error after 60 s.  
Step 1: \(\delta\dot{v}^N = -f^D\psi^E = g\psi^E\) *Why:* tilt error rotates gravity into the horizontal channel.  
Step 2: \(\delta v^N(t) = g\psi^E t\) *Why:* constant forcing function.  
**\(\delta v^N(60) \approx 0.59\) m s\(^{-1}\)**  

*Reflection:* The same 1 mrad tilt that is invisible to a theodolite produces a 0.6 m s\(^{-1}\) velocity error in one minute.

**Example 3 — 15-state F-matrix construction (excerpt)**
*Given:* Local-level wander-azimuth frame, constant Earth rate.  
*Find:* Element \(F_{v_N,\psi_E}\).  
From linearization: \(F_{v_N,\psi_E} = -f^D = g\) (neglecting small centrifugal terms).  
**\(F_{6,3} = g\)**  

*Reflection:* This single entry is responsible for the 84-minute Schuler oscillation when the full closed-loop INS equations are examined.

**Example 4 — Propagation of covariance**
*Given:* Discrete-time transition matrix \(\Phi_k = \mathbf{I} + \mathbf{F}\Delta t\).  
*Find:* One-step covariance update.  
\(\mathbf{P}_{k+1} = \Phi_k\mathbf{P}_k\Phi_k^T + \mathbf{Q}_k\) *Why:* linear transformation of zero-mean Gaussian random vector.  
**Final \(\mathbf{P}_{k+1}\) is the predicted error covariance at step \(k+1\).**  

*Reflection:* The continuous \(\mathbf{F}\) must be discretized accurately; a first-order Euler step introduces secular growth in the attitude covariance.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using total-state instead of error-state kinematics | Habit from ordinary integration                     | Always subtract the computed trajectory before differentiating |
| Sign error in \([\boldsymbol{\omega}\times]\) | Confusion between active and passive rotation conventions | Adopt one convention (usually “subtract skew of transport rate”) and keep it |
| Treating Earth-rate as constant when latitude changes rapidly | Neglect of \(\dot{\boldsymbol{\omega}}^n_{in}\) term | Include the full transport-rate derivative in \(\mathbf{F}\) |
| Forgetting that \(\boldsymbol{\psi}\) is a rotation vector, not Euler angles | Euler angles have singularities                     | Use the small-angle DCM approximation consistently   |
| Omitting lever-arm and flexure terms in aided INS | Vehicle is assumed rigid                            | Add explicit lever-arm states when baseline > 1 m    |
| Linearizing about the wrong reference (true vs. computed) | Ambiguous definition of “delta”                     | Linearize every equation about the on-board computed trajectory |
| Ignoring scale-factor errors in high-dynamic flight | Bias-only model assumed sufficient                  | Augment state with scale-factor states when acceleration > 5 g |

## 7. The textbook-precise statement
Let \(\mathbf{x}(t)\) be the 15-dimensional error-state vector comprising position, velocity, and attitude errors together with accelerometer and gyro biases. Under the assumptions that (i) all attitude errors remain small, (ii) sensor errors are adequately modelled as random walks or Gauss–Markov processes, and (iii) the computed trajectory is used as the linearization point, the error-state dynamics are exactly
\[
\dot{\mathbf{x}}(t) = \mathbf{F}(t)\mathbf{x}(t) + \mathbf{G}(t)\mathbf{w}(t),
\]
where \(\mathbf{F}(t)\) is the 15×15 dynamics matrix whose non-zero blocks are given in Groves, *Principles of GNSS, Inertial, and Multisensor Integrated Navigation Systems*, 2nd ed., §12.2, equations (12.34)–(12.38).

## 8. Visual — diagram or schematic
```text
True trajectory ──► [Navigation equations] ──► Computed trajectory
                       ▲                           │
                       │                           │ subtract
                       │                           ▼
                 sensor errors               error-state vector x
                       │                           │
                       ▼                           │ integrate
                 [F(t), G(t)] ◄─────────────── [Φ(t+Δt,t)]
                       │                           │
                       ▼                           ▼
                 process noise w               predicted covariance P
```
Horizontal arrows indicate the flow of the real-time navigation solution; vertical arrows show the separate error-state propagation path that never feeds back into the main integrator.

## 9. The memory technique
1. **The hook** — Picture an initially perfect marble rolling on a table; each tiny tilt of the table (attitude error) and each hidden bubble under the felt (accelerometer bias) makes the marble’s path curve farther and farther away. The error-state equations are simply the differential description of that curving path.
2. **What to overlearn** — The three coupling relations \(\delta\dot{\mathbf{r}}=\delta\mathbf{v}\), \(\delta\dot{\mathbf{v}}=\mathbf{f}\times\boldsymbol{\psi}\), \(\dot{\boldsymbol{\psi}}=-\boldsymbol{\omega}\times\boldsymbol{\psi}\); the 15-state composition; and the fact that \(\mathbf{F}\) is evaluated on the *computed* trajectory.
3. **Spaced-repetition schedule** — Review the three coupling equations at 1 day, 3 days, 7 days, 16 days, 35 days; recompute a 3×3 \(\mathbf{F}\) block from scratch at each interval.
4. **First-principles fallback** — Start from the ideal strapdown equations, introduce additive perturbations, discard all quadratic terms, and collect coefficients of each error component; the resulting matrix is \(\mathbf{F}\).

## 10. What this unlocks
Mastery of the error-state propagation equations is the prerequisite for every modern aided-navigation filter. The same \(\mathbf{F}\) matrix appears in the GPS/INS Kalman filter, in observability analysis of coasting INS, and in the derivation of the Schuler and Foucault oscillations. Subsequent topics that rest directly on this foundation include:

- Loosely and tightly coupled INS/GNSS integration
- Error-state observability and estimability analysis
- Covariance analysis for coasting performance specifications
- Derivation of the Schmidt–Kalman “consider” filter for uncalibrated sensor parameters

## 11. Self-check — five questions, no answers
1. Derive the (3,3) element of the 3×3 attitude-error block of \(\mathbf{F}\) when the vehicle is stationary at latitude \(\phi\).
2. A constant 0.01° h\(^{-1}\) gyro bias acts about the east axis of a north-pointing platform. After 10 minutes, what is the resulting north velocity error (ignore Schuler oscillation)?
3. Show that the position-error dynamics become unstable if the sign of the gravity-coupling term is reversed.
4. In a 15-state model, which three states become unobservable during a perfectly level, constant-velocity cruise, and why?
5. Given an arbitrary 15×15 \(\mathbf{F}\) matrix evaluated at a single epoch, write the exact first-order matrix expression for the state transition matrix over an interval \(\Delta t\).