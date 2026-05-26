## 1. The one-sentence answer
**The Kalman filter predict step propagates the current Gaussian state estimate forward using the linear dynamics model while inflating its covariance; the update step then fuses a new linear measurement by computing an optimal gain that shrinks the covariance in the directions informed by that measurement.**

The filter treats the unknown state as a random vector whose probability density is approximated by a Gaussian. Because Gaussians remain Gaussian under linear transformations and conditioning, the entire recursion stays closed-form. Propagation simply applies the known transition matrix to the mean and adds process noise to the covariance; this step embodies the fact that uncertainty grows when a system evolves without fresh observations.

The update step treats the measurement as another linear observation corrupted by independent Gaussian noise. The optimal fusion weight (the Kalman gain) is derived by requiring that the posterior error be orthogonal to the measurement residual; the resulting formulas subtract a correction proportional to that residual from the predicted mean and subtract a positive-semidefinite term from the predicted covariance.

> [!NOTE]
> The single deepest insight is that the Kalman gain is exactly the coefficient that makes the updated estimation error uncorrelated with the innovation; any other gain leaves residual information unused.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover fuses IMU, star-tracker, and visual-odometry measurements with a 21-state Kalman filter whose predict step runs at 200 Hz and whose update step ingests camera features at 10 Hz; the same filter architecture flew on the Mars Science Laboratory sky-crane.

SpaceX’s Falcon 9 first-stage return-to-launch-site guidance runs an extended Kalman filter whose linearised predict step propagates the six-degree-of-freedom rigid-body state between 50 Hz GPS/INS updates; covariance propagation supplies the real-time uncertainty ellipse used by the landing-leg touchdown logic.

Modern GNSS/INS integration in commercial airliners (e.g., Boeing 787) employs a 15-state Kalman filter whose predict step models inertial-sensor bias random walks; the filter’s covariance output directly feeds the Required Navigation Performance (RNP) monitors mandated by FAA AC 20-138D.

Semiconductor lithography stages at ASML use sub-nanometre Kalman-filtered metrology fusion; the predict step models piezo-stage dynamics at 10 kHz while the update step ingests interferometer counts, keeping overlay errors below 1 nm despite vibration.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Multivariate Gaussian    | The entire recursion is closed only because the family is closed under linear maps and conditioning. |
| Linear state-space model | Predict and update equations are obtained by taking conditional expectations on the linear dynamics and measurement equations. |
| Orthogonality principle  | The optimal gain is the unique matrix that renders posterior error orthogonal to the innovation; this yields the Kalman-gain formula without explicit minimisation. |
| Matrix inversion lemma   | Efficient update of the covariance inverse (information form) or direct covariance update both rely on the Woodbury identity. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear dynamics and additive noise
A physical system evolves according to a known linear rule plus unknown disturbances that we model as zero-mean Gaussian white noise.  
Concrete example: a cart whose position \(x_k\) obeys \(x_{k+1}=x_k+w_k\) where \(w_k\sim\mathcal{N}(0,q)\).  
Formal statement:
\[
\mathbf{x}_{k+1}=F_k\mathbf{x}_k+\mathbf{w}_k,\qquad\mathbf{w}_k\sim\mathcal{N}(\mathbf{0},Q_k).
\]
> [!WARNING]
> Treating process noise as state-dependent or non-Gaussian immediately destroys the closed-form Gaussian propagation that the filter relies on.

### Step 2 — Measurement model
At discrete instants we obtain a linear observation of the state corrupted by independent Gaussian sensor noise.  
Concrete example: a noisy position sensor yields \(z_k=x_k+v_k\), \(v_k\sim\mathcal{N}(0,r)\).  
Formal statement:
\[
\mathbf{z}_k=H_k\mathbf{x}_k+\mathbf{v}_k,\qquad\mathbf{v}_k\sim\mathcal{N}(\mathbf{0},R_k).
\]

### Step 3 — Predict the mean
Take the conditional expectation of the dynamics given all data up to time \(k\):
\[
\hat{\mathbf{x}}_{k+1|k}=F_k\hat{\mathbf{x}}_{k|k}.
\]
The operation is simply matrix-vector multiplication; no new information enters.

### Step 4 — Predict the covariance
Take the covariance of the same linear transformation and add process-noise covariance:
\[
P_{k+1|k}=F_kP_{k|k}F_k^T+Q_k.
\]
The quadratic term spreads existing uncertainty through the dynamics; \(Q_k\) injects fresh uncertainty.

### Step 5 — Form the innovation
The difference between actual and predicted measurement is the innovation:
\[
\tilde{\mathbf{y}}_k=\mathbf{z}_k-H_k\hat{\mathbf{x}}_{k|k-1}.
\]
Its covariance (innovation covariance) is
\[
S_k=H_kP_{k|k-1}H_k^T+R_k.
\]

### Step 6 — Compute the Kalman gain
Enforce orthogonality of posterior error to the innovation; the unique gain satisfying this is
\[
K_k=P_{k|k-1}H_k^TS_k^{-1}.
\]

### Step 7 — Update the mean
Correct the prediction by the gain times the innovation:
\[
\hat{\mathbf{x}}_{k|k}=\hat{\mathbf{x}}_{k|k-1}+K_k\tilde{\mathbf{y}}_k.
\]

### Step 8 — Update the covariance (Joseph form)
Subtract the information gained by the measurement:
\[
P_{k|k}=(I-K_kH_k)P_{k|k-1}.
\]
This is the textbook statement of the linear Kalman filter recursion.

## 5. Worked examples — every step shown

**Example 1 — Scalar constant position**  
*Given:* \(F=1\), \(H=1\), \(Q=0\), \(R=1\), \(\hat{x}_{0|0}=0\), \(P_{0|0}=1\), first measurement \(z_1=3\).  
*Find:* \(\hat{x}_{1|1}\) and \(P_{1|1}\).  
Predict: \(\hat{x}_{1|0}=1\cdot0=0\), \(P_{1|0}=1\cdot1\cdot1+0=1\).  
*Why:* No dynamics or process noise.  
Innovation: \(\tilde{y}_1=3-1\cdot0=3\), \(S_1=1\cdot1\cdot1+1=2\).  
*Why:* Add sensor noise variance.  
Gain: \(K_1=1\cdot1/2=0.5\).  
*Why:* Orthogonality condition.  
Update: \(\hat{x}_{1|1}=0+0.5\cdot3=1.5\), \(P_{1|1}=(1-0.5\cdot1)\cdot1=0.5\).  
**1.5, 0.5**  
*Reflection:* The filter trusts the measurement and prior equally, halving uncertainty.

**Example 2 — Position with process noise**  
*Given:* Same as above but \(Q=1\).  
Predict: \(\hat{x}_{1|0}=0\), \(P_{1|0}=1+1=2\).  
Innovation \(S_1=2+1=3\), \(K_1=2/3\).  
Update: \(\hat{x}_{1|1}=2\), \(P_{1|1}=2-2/3=4/3\).  
**2, 4/3**  
*Reflection:* Extra process noise widens the predicted covariance and therefore increases the gain.

**Example 3 — 1-D constant-velocity tracker**  
State \(\mathbf{x}=[position,velocity]^T\), \(F=\begin{bmatrix}1&dt\\0&1\end{bmatrix}\), \(H=[1,0]\), \(Q=0\), \(R=1\), \(dt=1\).  
Initial \(\hat{\mathbf{x}}_{0|0}=[0,0]^T\), \(P_{0|0}=I\).  
After one predict-update cycle with \(z_1=5\):  
Predict mean \([0,0]^T\), \(P_{1|0}=\begin{bmatrix}2&1\\1&1\end{bmatrix}\).  
\(S=3\), \(K=[2/3,1/3]^T\).  
Posterior mean \([10/3,5/3]^T\), \(P_{1|1}=\begin{bmatrix}2/3&1/3\\1/3&2/3\end{bmatrix}\).  
**Final answer boxed**  
**\(\begin{bmatrix}10/3\\5/3\end{bmatrix}\), \(\begin{bmatrix}2/3&1/3\\1/3&2/3\end{bmatrix}\)**  
*Reflection:* Velocity estimate emerges purely from position differencing weighted by the filter.

**Example 4 — Two-dimensional range-bearing fusion (linearised)**  
State \([x,y]^T\), two scalar range measurements from known beacons. The stacked \(H\) matrix yields a 2-by-2 innovation covariance; the gain matrix becomes 2-by-2. After algebra the posterior covariance eigenvalues are strictly smaller than the predicted ones in every direction spanned by the measurements.  
**Reflection:** The matrix update automatically accounts for geometric dilution of precision.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to add \(Q\)           | Intuition that “the model is perfect”               | Always treat \(Q\) as a tunable design parameter     |
| Using \(P_{k|k}\) instead of \(P_{k|k-1}\) in gain | Confusion between filtered and predicted covariance | Label every covariance with its time index           |
| Assuming \(R\) is diagonal        | Sensor noises often correlated across channels      | Estimate cross-covariances from data                 |
| Negative covariance eigenvalues   | Numerical asymmetry after many updates              | Use Joseph or square-root form                       |
| Treating \(K\) as constant        | Gain actually depends on current \(P\)              | Recompute \(K\) at every step unless steady-state    |
| Ignoring cross-correlation between process and measurement noise | Model assumption violated in tightly coupled sensors | Augment state or derive correlated-noise equations   |
| Over-confident initial \(P_0\)    | Belief that “we know the state exactly”             | Initialise \(P_0\) from physical error bounds        |

## 7. The textbook-precise statement
Let the linear system and measurement be given by the equations in Steps 1–2 with \(\mathbf{w}_k\), \(\mathbf{v}_k\) white, zero-mean, mutually uncorrelated, and \(E[\mathbf{w}_k\mathbf{w}_j^T]=Q_k\delta_{kj}\), likewise for \(R_k\). Then the minimum-mean-square-error estimator obeys the recursion of Steps 3–8 with initial conditions \(\hat{\mathbf{x}}_{0|0}=E[\mathbf{x}_0]\), \(P_{0|0}=E[(\mathbf{x}_0-\hat{\mathbf{x}}_{0|0})(\cdot)^T]\). (Kalman, 1960, “A New Approach to Linear Filtering and Prediction Problems,” Trans. ASME J. Basic Eng.)

## 8. Visual — diagram or schematic
```text
          +-----------+          +-----------+
          |  Predict  |--------->|   Update  |
          |  x̂, P     |          |  z, K     |
          +-----------+          +-----------+
               ^                       |
               |   (I-KH)P             v
               +-----------------------+
```
The loop shows covariance flowing from predict into the gain calculation, then the Joseph-form correction feeding back to the next predict.

## 9. The memory technique
**The hook** — Imagine a lighthouse keeper who predicts where the ship will be (predict) and then swings the beam to the actual bearing, shrinking the uncertainty ellipse each time the light touches the hull (update).  
**What to overlearn** — The two-line predict pair and the gain expression \(K=PH^T(HPH^T+R)^{-1}\).  
**Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive the gain by imposing \(E[(\mathbf{x}-\hat{\mathbf{x}}^+ )\tilde{\mathbf{y}}^T]=0\) and solving for \(K\).

## 10. What this unlocks
The linear Kalman filter is the exact Bayesian filter for linear-Gaussian problems and the foundation for every subsequent GNC estimator.  
- Extended Kalman filter (linearisation about the current estimate)  
- Unscented Kalman filter (sigma-point propagation)  
- Square-root and UD-factorised implementations for numerical stability  
- Information-form filters used in distributed multi-sensor fusion  
- Covariance analysis for sensor-placement optimisation on spacecraft

## 11. Self-check — five questions, no answers
1. Derive the scalar Kalman gain for a static parameter observed with two independent sensors of different variances; show that the result is identical to inverse-variance weighting.  
2. A system has \(F=0\), \(Q=1\), \(H=1\), \(R=0\). What happens to \(P_{k|k}\) after the first update, and why?  
3. In the constant-velocity tracker of Example 3, compute the steady-state gain as \(R\to0\); interpret the result physically.  
4. Show that the Joseph-form covariance update is mathematically equivalent to the simple form yet remains positive-semidefinite even when \(K\) is slightly suboptimal because of rounding.  
5. A gyroscope bias is modelled as a random walk (\(Q>0\)). If the designer mistakenly sets \(Q=0\), what long-term behaviour will the filter exhibit when the true bias drifts?