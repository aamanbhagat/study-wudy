## 1. The one-sentence answer
**Sensor fusion merges measurements from multiple imperfect sensors into a single estimate whose error is smaller than that of any individual sensor, with the complementary filter achieving this via frequency-domain separation and the Kalman filter achieving the minimum-variance estimate via recursive Bayesian updating.**

A gyroscope integrates angular velocity accurately over short intervals yet drifts over long intervals; an accelerometer senses gravity reliably at low frequencies yet is corrupted by linear acceleration at high frequencies. The complementary filter passes the gyroscope signal through a high-pass filter and the accelerometer signal through a low-pass filter, then adds the results so that each sensor’s reliable band is retained and its unreliable band is rejected.  

The Kalman filter instead treats both measurements and the system dynamics as noisy processes whose statistical properties are known; it propagates an estimate and its covariance forward in time, then corrects them with each new measurement weighted by the relative certainty of prediction versus observation. The result is the linear estimator that minimises mean-square error when the noise is white and Gaussian.

> [!NOTE]
> The complementary filter is a fixed-gain special case of the Kalman filter; once the Kalman gain reaches steady state under constant noise statistics, its behaviour reduces exactly to complementary filtering.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 booster performs a boost-back burn and entry burn using a tightly tuned complementary filter that blends IMU data with GPS velocity; the filter’s 0.02° attitude error bound is what permits the grid-fin steering law to keep the vehicle inside the narrow recovery corridor.  

NASA’s Mars 2020 Perseverance entry, descent, and landing used a Kalman filter whose state vector included position, velocity, attitude, and accelerometer bias; the filter fused IMU, radar altimeter, and terrain-relative navigation camera measurements at 200 Hz, reducing touchdown ellipse major axis from 10 km to 7.7 km.  

Modern smartphone AR frameworks (ARKit, ARCore) run a 15-state Kalman filter at 1 kHz that fuses gyroscope, accelerometer, magnetometer, and visual feature tracks; the filter’s covariance propagation supplies the uncertainty ellipse that lets the rendering engine decide when to drop virtual-object stability.  

Semiconductor fabs employ Kalman-based sensor fusion on 300 mm wafer stages whose interferometric encoders and capacitive sensors are combined to achieve <1 nm positioning repeatability at 2 m s⁻¹ scan speeds; the filter’s process-noise tuning directly determines throughput yield.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear algebra (vectors, matrices, transpose, inverse) | State vectors and covariance matrices are manipulated with these operations. |
| Basic probability (mean, variance, independence) | Noise is characterised by its first two moments; independence justifies the update equations. |
| Frequency response of first-order filters | The complementary filter is constructed by adding a low-pass and a high-pass transfer function that sum to unity. |
| Discrete-time state-space models | Both filters are implemented recursively on sampled data; the prediction step is exactly the state-transition equation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Sensors occupy complementary frequency bands
A rate gyro is accurate above roughly 1 Hz but integrates bias into unbounded drift below that frequency; an accelerometer (or inclinometer) is accurate below 1 Hz but is corrupted by specific force above that frequency.  

**Concrete example.** A 100 Hz gyro with 0.01 ° s⁻¹ bias drift and a 100 Hz accelerometer whose gravity measurement is contaminated by 0.1 m s⁻² vibration above 5 Hz.  

Formally, the true angular velocity \(\omega(t)\) and the measured signals satisfy  
\[
\tilde{\omega}(t)=\omega(t)+b+n_g(t),\qquad\tilde{a}(t)=g\sin\theta(t)+n_a(t)
\]  
where \(b\) is slowly varying bias and \(n_g,n_a\) are band-limited.

> [!WARNING]
> Treating both sensors as equally trustworthy at all frequencies produces unbounded attitude drift or high-frequency jitter.

### Step 2 — Frequency-domain separation yields the complementary filter
Apply a first-order low-pass filter \(L(s)=\frac{\alpha}{s+\alpha}\) to the accelerometer-derived angle and a high-pass filter \(H(s)=\frac{s}{s+\alpha}\) to the integrated gyro angle. Their sum is identically one:  
\[
L(s)+H(s)=1.
\]  
In discrete time with sampling period \(T\) the update is  
\[
\theta_{k}=\bigl(1-\alpha T\bigr)\theta_{k-1}+\alpha T\,\theta_{\text{acc},k}+T\,\omega_{\text{gyro},k}.
\]

> [!WARNING]
> Choosing \(\alpha\) too large lets accelerometer noise leak into the estimate; choosing it too small lets gyro bias accumulate.

### Step 3 — Model the system as a linear stochastic process
Write the attitude kinematics and sensor bias as a discrete state-space model  
\[
\mathbf{x}_{k}=\mathbf{F}\mathbf{x}_{k-1}+\mathbf{w}_{k-1},\qquad\mathbf{z}_{k}=\mathbf{H}\mathbf{x}_{k}+\mathbf{v}_{k}
\]  
where \(\mathbf{w}\sim\mathcal{N}(0,\mathbf{Q})\) and \(\mathbf{v}\sim\mathcal{N}(0,\mathbf{R})\) are white and uncorrelated.

### Step 4 — Propagate the estimate and its uncertainty (prediction)
The minimum-variance predictor is the conditional mean  
\[
\hat{\mathbf{x}}_{k|k-1}=\mathbf{F}\hat{\mathbf{x}}_{k-1|k-1},\qquad\mathbf{P}_{k|k-1}=\mathbf{F}\mathbf{P}_{k-1|k-1}\mathbf{F}^T+\mathbf{Q}.
\]

### Step 5 — Incorporate the new measurement (update)
The Kalman gain that minimises trace(\(\mathbf{P}_{k|k}\)) is  
\[
\mathbf{K}_k=\mathbf{P}_{k|k-1}\mathbf{H}^T(\mathbf{H}\mathbf{P}_{k|k-1}\mathbf{H}^T+\mathbf{R})^{-1}.
\]  
The corrected estimate and covariance are  
\[
\hat{\mathbf{x}}_{k|k}=\hat{\mathbf{x}}_{k|k-1}+\mathbf{K}_k(\mathbf{z}_k-\mathbf{H}\hat{\mathbf{x}}_{k|k-1}),\qquad\mathbf{P}_{k|k}=(\mathbf{I}-\mathbf{K}_k\mathbf{H})\mathbf{P}_{k|k-1}.
\]

### Step 6 — Steady-state Kalman gain recovers the complementary filter
When \(\mathbf{Q}\) and \(\mathbf{R}\) are constant the Riccati equation converges to a fixed \(\mathbf{K}_\infty\). Substituting this constant gain into the scalar attitude estimator yields exactly the complementary-filter recurrence of Step 2.

## 5. Worked examples — every step shown

**Example 1 — Scalar complementary filter, one time step**  
*Given:* \(\theta_{\text{acc}}=5^\circ\), \(\omega_{\text{gyro}}=0.1^\circ\) s\(^{-1}\), \(\alpha=0.2\) s\(^{-1}\), \(T=0.01\) s, previous estimate \(\theta_{k-1}=4.8^\circ\).  
*Find:* \(\theta_k\).  

\[
\theta_k=(1-\alpha T)\theta_{k-1}+\alpha T\,\theta_{\text{acc},k}+T\,\omega_{\text{gyro},k}
\]  
*Why:* direct substitution of the discrete complementary equation.  
\[
1-0.2\times0.01=0.998,\quad0.2\times0.01\times5=0.01,\quad0.01\times0.1=0.001.
\]  
\[
\theta_k=0.998\times4.8+0.01+0.001=4.7958^\circ.
\]  
**4.7958°**  

*Reflection:* The gyro term supplies the high-frequency increment while the accelerometer term slowly pulls the estimate toward the gravity reference.

**Example 2 — Effect of \(\alpha\) on bias rejection**  
*Given:* constant gyro bias \(b=0.05^\circ\) s\(^{-1}\), \(\alpha=0.05\) s\(^{-1}\), \(T=0.01\) s, zero initial error, run for 100 s.  
*Find:* steady-state attitude error.  

The bias is integrated through the high-pass path whose DC gain is zero; the low-pass path rejects the constant bias entirely. Steady-state error = 0°.  

**0°**  

*Reflection:* Complementary action nulls constant gyro bias without requiring explicit bias estimation.

**Example 3 — Scalar Kalman filter, prediction-update cycle**  
*Given:* \(\hat{x}_{0|0}=0\), \(P_{0|0}=1\), \(F=1\), \(H=1\), \(Q=0.01\), \(R=0.04\), measurement \(z_1=0.3\).  
*Find:* \(\hat{x}_{1|1}\).  

Prediction:  
\[
\hat{x}_{1|0}=1\times0=0,\qquad P_{1|0}=1\times1+0.01=1.01.
\]  
*Why:* state transition and covariance propagation.  

Gain:  
\[
K_1=1.01\times1/(1.01\times1+0.04)=1.01/1.05=0.9619.
\]  
*Why:* minimum-variance weighting.  

Update:  
\[
\hat{x}_{1|1}=0+0.9619(0.3-0)=0.2886,\qquad P_{1|1}=(1-0.9619)1.01=0.0385.
\]  
**0.2886**  

*Reflection:* The filter trusts the measurement more than the prediction because \(R\) is smaller than the propagated \(P\).

**Example 4 — Two-sensor vector Kalman filter (attitude + bias)**  
State \(\mathbf{x}=[\theta,b]^T\).  
\[
F=\begin{bmatrix}1 & -T\\0 & 1\end{bmatrix},\quad H=\begin{bmatrix}1 & 0\end{bmatrix},\quad Q=\operatorname{diag}(0,10^{-6}),\quad R=0.04.
\]  
After convergence the steady-state gain vector is \([0.2,0.001]^T\), recovering the complementary filter with explicit bias estimation.

**Gain vector [0.2, 0.001]**  

*Reflection:* Augmenting the state with bias converts the fixed-gain complementary filter into an adaptive estimator.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using raw gyro integration without any aiding sensor | Drift is invisible on short time scales | Always close the loop with at least one absolute reference (accelerometer, magnetometer, star tracker). |
| Treating complementary-filter \(\alpha\) as a free tuning knob without noise analysis | \(\alpha\) sets the crossover frequency that must match sensor spectra | Compute power spectral densities of each sensor first; place crossover where their PSD curves intersect. |
| Forgetting that Kalman covariance \(\mathbf{P}\) is only the filter’s belief, not true error | Model mismatch makes \(\mathbf{P}\) optimistic | Inject deliberate model errors and verify that actual estimation error remains inside the 3\(\sigma\) envelope. |
| Assuming process noise \(\mathbf{Q}\) is diagonal when sensors share vibration | Vibration couples axes | Identify cross-covariance terms from flight data or Monte-Carlo simulation. |
| Running the discrete Kalman filter at a rate much slower than sensor sampling | Aliasing of high-frequency noise into the state | Either run the filter at sensor rate or pre-filter measurements with an anti-aliasing stage. |
| Neglecting numerical conditioning of the Riccati update | Repeated subtraction of nearly equal matrices produces negative eigenvalues | Use Joseph form or square-root covariance filters on flight hardware. |
| Initialising \(\mathbf{P}_0\) too small | Filter becomes over-confident and ignores subsequent measurements | Set initial diagonal entries at least as large as the expected initial uncertainty.

## 7. The textbook-precise statement
Let the linear system and measurement be given by  
\[
\mathbf{x}_{k}=\mathbf{F}\mathbf{x}_{k-1}+\mathbf{w}_{k-1},\qquad\mathbf{z}_{k}=\mathbf{H}\mathbf{x}_{k}+\mathbf{v}_{k}
\]  
with \(\mathbf{w}_{k-1}\sim\mathcal{N}(\mathbf{0},\mathbf{Q})\), \(\mathbf{v}_{k}\sim\mathcal{N}(\mathbf{0},\mathbf{R})\) mutually uncorrelated. The Kalman filter initialised with \(\hat{\mathbf{x}}_{0|0}\) and \(\mathbf{P}_{0|0}\) produces the unique minimum-variance linear unbiased estimator  
\[
\hat{\mathbf{x}}_{k|k}=\hat{\mathbf{x}}_{k|k-1}+\mathbf{K}_k(\mathbf{z}_k-\mathbf{H}\hat{\mathbf{x}}_{k|k-1}),
\]  
where the gain \(\mathbf{K}_k\) is defined in Step 5 above. (Reference: Gelb, *Applied Optimal Estimation*, MIT Press, 1974, §4.2.)

## 8. Visual — diagram or schematic
```text
                  +-----------+          +-----------+
                  |  Gyro     |          |  Accel    |
                  |  ω̃       |          |  θ̃_acc    |
                  +-----+-----+          +-----+-----+
                        |                      |
                        v                      v
                 High-pass (s/(s+α))     Low-pass (α/(s+α))
                        |                      |
                        +----------+-----------+
                                   |
                                   v
                           θ̂ (fused attitude)
```
The diagram shows the parallel paths whose transfer functions sum to unity, guaranteeing that the estimate contains every frequency component of the true signal exactly once.

## 9. The memory technique
1. **The hook** — picture two chefs: one salts the soup quickly (gyro, high-frequency) while the other slowly tastes and corrects (accelerometer, low-frequency); the Kalman filter is the head chef who continually re-weighs their opinions according to how noisy each kitchen station is that day.  
2. **What to overlearn** — the scalar steady-state gain formula \(K=\frac{\sigma_w^2}{\sigma_w^2+\sigma_v^2}\) and the fact that complementary-filter \(\alpha\) equals this \(K/T\).  
3. **Spaced-repetition schedule** — review the prediction-update equations at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from the orthogonality principle: the estimation error must be orthogonal to all measurements; derive the gain expression by enforcing \(\mathbb{E}[(\mathbf{x}-\hat{\mathbf{x}})\mathbf{z}^T]=0\).

## 10. What this unlocks
Sensor fusion is the measurement backbone of every subsequent GNC module.  

- State estimation for orbit determination and interplanetary cruise  
- INS/GPS deeply-coupled integration used in launch-vehicle guidance  
- Multi-sensor SLAM for autonomous planetary rovers  
- Adaptive control laws whose robustness margins are computed from the filter’s covariance  
- Fault detection via innovation monitoring (chi-squared tests on Kalman residuals)

## 11. Self-check — five questions, no answers
1. A gyro exhibits 0.05 ° s⁻¹ bias drift and an accelerometer exhibits 0.2 ° RMS noise above 2 Hz. Where should the complementary-filter crossover frequency be placed?  
2. Derive the steady-state Kalman gain for the scalar system \(x_{k}=x_{k-1}+w_{k-1}\), \(z_k=x_k+v_k\) with constant \(Q\) and \(R\).  
3. Show that the complementary-filter recurrence is recovered when the Kalman filter reaches steady state with a two-state attitude-plus-bias model.  
4. A Kalman filter reports \(P=0.01\) yet the actual estimation error is observed to be 0.3. List three possible causes.  
5. In a vector Kalman filter, the innovation sequence fails a whiteness test. What single modelling assumption is most likely violated?