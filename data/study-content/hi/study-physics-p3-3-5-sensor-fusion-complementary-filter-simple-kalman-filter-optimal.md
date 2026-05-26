## 1. The one-sentence answer
**Sensor fusion merges noisy measurements from multiple sensors so that the combined estimate of a state (position, velocity, attitude) has lower error than any single sensor alone; the complementary filter achieves this with simple frequency-domain weighting while the Kalman filter achieves the statistically optimal estimate under linear-Gaussian assumptions.**

Complementary filter ek aisa tool hai jo low-frequency drift wale sensors (jaise accelerometer) aur high-frequency noise wale sensors (jaise gyroscope) ko alag-alag frequency bands mein weight karta hai. Iska matlab yeh hai ki aap ek simple first-order filter se hi kaafi achha attitude estimate le sakte ho bina matrix inversion ke. Kalman filter isse aage jaata hai: woh har measurement ko uske noise covariance ke hisaab se optimally blend karta hai aur state covariance ko bhi track karta hai.

Aap rocket guidance mein dekhte ho ki ek hi IMU se sirf gyroscope use karne par drift jaldi badhta hai, lekin complementary filter laga kar drift ko seconds se minutes tak rok sakte ho. Kalman filter usi problem ko Bayesian framework mein solve karta hai aur jab process noise aur measurement noise dono known hon to minimum-variance estimate deta hai.

> [!NOTE]
> The core “aha” moment is realising that both filters are doing the same thing—trading off trust between prediction and measurement—but the Kalman filter does it with explicit uncertainty propagation while the complementary filter hides the same trade-off inside two fixed cutoff frequencies.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 uses a complementary-filtered IMU suite inside its flight computer for the first 60 seconds of ascent; after stage separation the vehicle switches to a full extended Kalman filter that also ingests GPS and star-tracker data.

ISRO’s Reusable Launch Vehicle demonstrator (RLV-TD) flight in 2016 logged raw gyro and accelerometer data that was later post-processed with a 15-state Kalman filter; the filter reduced attitude error from 1.8° (raw) to 0.3° RMS.

DJI Avata drone flight controller runs a 200 Hz complementary filter on its BMI088 IMU for pilot stick response and a 50 Hz Kalman filter that also fuses barometer and optical-flow data for position hold.

NASA’s Mars 2020 Perseverance entry-descent-landing software contained a Kalman filter that fused IMU, radar altimeter and terrain-relative navigation camera measurements; the filter’s covariance matrix was used in real time to trigger parachute deployment.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Linear algebra (vectors, matrices, transpose) | State vector and covariance matrix live in matrix form; Kalman gain is a matrix expression. |
| Basic probability (mean, variance, Gaussian) | Kalman filter derivation minimises trace of posterior covariance under Gaussian noise. |
| Discrete-time LTI systems | Both filters are written as difference equations; z-transform intuition helps for complementary filter. |
| First-order low-pass filter | Complementary filter is literally two first-order filters whose outputs are added. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Sensor noise lives in different frequency bands
Accelerometer noise is mostly high-frequency vibration while gyroscope bias is a slowly varying low-frequency drift.  
Concrete example: a 100 Hz gyro shows 0.05°/s white noise; the same IMU’s accelerometer shows 0.02 m/s² white noise plus 0.01 m/s² bias that wanders over minutes.  
Formal statement: let the true angular rate be \(\omega(t)\). Measured signals are  
\[
\tilde{\omega}(t)=\omega(t)+n_g(t)+b(t),\qquad
\tilde{a}(t)=a(t)+n_a(t)
\]  
where \(b(t)\) is the slowly varying bias and \(n_g,n_a\) are wide-band noises.

> [!WARNING]
> If you treat both signals as equally trustworthy at all frequencies, the fused estimate will either drift or become noisy.

### Step 2 — Complementary weighting in frequency domain
A low-pass filter \(L(s)\) applied to accelerometer-derived angle and a high-pass filter \(H(s)=1-L(s)\) applied to integrated gyro angle gives  
\[
\theta_\text{fused}(s)=L(s)\theta_a(s)+H(s)\theta_g(s).
\]  
Choosing \(L(s)=\frac{\alpha}{s+\alpha}\) yields the classic first-order complementary filter.

### Step 3 — Discrete-time complementary filter equation
Replacing the continuous filter with backward Euler gives the update  
\[
\theta_k=\bigl(1-\alpha\bigr)\theta_{k-1}+\alpha\theta_{a,k}+\bigl(1-\alpha\bigr)(\theta_{k-1}-\theta_{k-2}+\Delta t\,\tilde{\omega}_{k-1}).
\]

### Step 4 — From weighting to statistical estimation
Instead of fixed \(\alpha\), we want the weight to be proportional to the inverse of each sensor’s noise variance. This is exactly what the Kalman filter computes at every step.

### Step 5 — Linear state-space model
Define state \(x_k=[\theta_k,b_k]^\top\). The discrete process model is  
\[
x_k=Fx_{k-1}+w_{k-1},\qquad
F=\begin{bmatrix}1&-\Delta t\\0&1\end{bmatrix},
\]  
with process noise covariance \(Q\). Measurement model (accelerometer angle) is  
\[
z_k=Hx_k+v_k,\qquad
H=[1,0],
\]  
with measurement noise covariance \(R\).

### Step 6 — Kalman filter equations
Prediction:  
\[
\hat{x}_{k|k-1}=F\hat{x}_{k-1|k-1},\qquad
P_{k|k-1}=FP_{k-1|k-1}F^\top+Q.
\]  
Update:  
\[
K_k=P_{k|k-1}H^\top(HP_{k|k-1}H^\top+R)^{-1},
\]  
\[
\hat{x}_{k|k}=\hat{x}_{k|k-1}+K_k(z_k-H\hat{x}_{k|k-1}),
\]  
\[
P_{k|k}=(I-K_kH)P_{k|k-1}.
\]

### Step 7 — Optimality guarantee
Under linear dynamics and additive white Gaussian noise, the Kalman filter yields the minimum-variance unbiased estimate; its covariance \(P_{k|k}\) is the actual error covariance.

### Step 8 — Reduction to complementary filter
When \(Q\) and \(R\) are constant and the state dimension is two, the steady-state Kalman gain produces exactly the same first-order complementary filter with cutoff \(\alpha=K_{11}\). Thus the complementary filter is the steady-state Kalman filter under simplifying assumptions.

## 5. Worked examples — har step show karo

**Example 1 — Single-step complementary filter**  
*Given:* \(\theta_{k-1}=5.0^\circ\), \(\tilde{\omega}_{k-1}=2.0^\circ/\text{s}\), \(\theta_{a,k}=5.3^\circ\), \(\Delta t=0.01\) s, \(\alpha=0.05\).  
*Find:* \(\theta_k\).  
\[
\theta_k=(1-0.05)\cdot5.0+0.05\cdot5.3+(1-0.05)(5.0-5.0+0.01\cdot2.0)
\]  
*Why:* first term keeps previous estimate, second term pulls toward accelerometer, third term integrates gyro.  
**Final answer** \(\theta_k=5.11^\circ\).  
*Reflection:* The example is trivial yet shows that \(\alpha\) directly sets how much new accelerometer data is trusted.

**Example 2 — Two-step drift cancellation**  
*Given:* same parameters, second measurement \(\theta_{a,2}=5.4^\circ\), \(\tilde{\omega}_2=2.1^\circ/\text{s}\).  
After first step \(\theta_1=5.11^\circ\).  
Second step yields \(\theta_2=5.215^\circ\).  
*Why:* repeated application of the same linear combination removes constant gyro bias over time.  
**Final answer** \(\theta_2=5.215^\circ\).  
*Reflection:* Bias is rejected because the high-pass path on gyro never passes DC.

**Example 3 — Scalar Kalman gain calculation**  
*Given:* \(P_{k|k-1}=0.04\), \(H=1\), \(R=0.01\).  
\[
K_k=\frac{0.04}{0.04+0.01}=0.8.
\]  
*Why:* gain is the ratio of prediction uncertainty to total uncertainty.  
**Final answer** \(K_k=0.8\).  
*Reflection:* Larger \(R\) lowers \(K\), exactly as lowering \(\alpha\) in the complementary filter.

**Example 4 — Full two-state Kalman update**  
*Given:* \(\hat{x}_{k-1}=[5.0,0.02]^\top\), \(P_{k-1}=\text{diag}(0.04,0.0001)\), \(Q=\text{diag}(0.0001,10^{-8})\), \(R=0.01\), \(z_k=5.3\).  
Prediction and update produce \(\hat{x}_k=[5.24,0.0198]^\top\), \(P_k\) with trace 0.0092.  
*Why:* bias estimate is also corrected because \(F\) couples angle and bias.  
**Final answer** \(\hat{\theta}_k=5.24^\circ\), \(\hat{b}_k=0.0198^\circ/\text{s}\).  
*Reflection:* The filter simultaneously estimates and removes bias—something a fixed-gain complementary filter cannot do.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating complementary filter cutoff as “magic number” | Students copy \(\alpha=0.05\) from a forum without matching sensor bandwidths | Compute \(\alpha\) from the ratio of expected variances or run a short FFT on logged data |
| Forgetting that Kalman \(Q\) must be tuned | Over-confident process model leads to divergence | Start with \(Q\) derived from Allan-variance plots of the actual IMU |
| Using raw accelerometer angle when vehicle is accelerating | Specific force is no longer gravity, so \(\theta_a\) is wrong | Gate the accelerometer measurement or augment state with external acceleration |
| Ignoring cross-axis coupling in 3-axis fusion | 2-D derivation silently assumes orthogonal sensors | Extend state to 7 elements (quaternion + bias) and use EKF |
| Running Kalman at full IMU rate without down-sampling | Matrix inversion at 1 kHz drains CPU | Run prediction at IMU rate, update only when new reference (GPS, star tracker) arrives |
| Initial \(P_0\) too small | Filter trusts first measurement forever | Set diagonal of \(P_0\) to expected initial error variances |
| Not checking observability | Unobservable bias when only gyro is used | Verify rank of observability matrix before flight |

## 7. The textbook-precise statement
Under the linear-Gaussian assumptions stated in Gelb (Applied Optimal Estimation, 1974, §4.2), the discrete Kalman filter given by the prediction and update equations above produces the minimum mean-square-error estimate of the state \(x_k\) given measurements \(z_{1:k}\). When the system is time-invariant and the algebraic Riccati equation reaches steady state, the Kalman gain converges to a constant matrix whose first element equals the complementary-filter coefficient \(\alpha\).

## 8. Visual — diagram or schematic
```
theta_a ---[ L(z) ]---+
                      |
                      +---> theta_fused
                      |
theta_g ---[integrate]---[ H(z)=1-L(z) ]---+
```
L(z) is the discrete low-pass \(\frac{\alpha}{z-(1-\alpha)}\); H(z) is the complementary high-pass. The summing junction is the only place where the two paths interact.

## 9. The memory technique
1. **The hook** — picture two rivers (gyro and accel) merging; a adjustable dam (α or K) decides how much water from each river enters the final stream.
2. **What to overlearn** — steady-state relation \(\alpha=K_{11}\) and the two-line update \(\hat{x}^+= \hat{x}^- + K(z-H\hat{x}^-)\).
3. **Spaced-repetition schedule** — review the five Kalman equations after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the gain formula, re-derive it by setting the derivative of posterior variance w.r.t. K to zero; the minimum occurs at \(K=P^-H^\top(HP^-H^\top+R)^{-1}\).

## 10. What this unlocks
- Extended Kalman filter for nonlinear attitude kinematics (quaternion propagation).  
- Unscented Kalman filter when linearisation error becomes large.  
- Sensor-fusion chapters in GNC textbooks that add GPS/INS, star-tracker and lidar measurements.  
- Covariance analysis for navigation accuracy budgets on launch vehicles.

## 11. Self-check — five questions, no answers
1. Derive the steady-state complementary gain \(\alpha\) from the scalar Riccati equation when \(Q=q\) and \(R=r\).
2. A gyro bias of 0.1 °/s is present; after how many seconds will a pure integration exceed 1° error? How does the complementary filter change that time constant?
3. Show that the Kalman covariance update \(P^+=(I-KH)P^-\) is algebraically identical to the Joseph form that guarantees symmetry.
4. In a 3-axis complementary filter, why must the cutoff frequency be the same on all three axes even if sensor noise differs?
5. Given a sudden 2 g horizontal acceleration lasting 0.5 s, predict qualitatively what happens to the roll estimate of an accelerometer-only complementary filter versus a Kalman filter that also estimates specific force.