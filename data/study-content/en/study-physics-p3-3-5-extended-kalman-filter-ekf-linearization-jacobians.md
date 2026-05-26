## 1. The one-sentence answer
**The Extended Kalman Filter approximates a nonlinear dynamical system as locally linear at every time step by replacing the nonlinear functions with their first-order Taylor expansions, whose coefficients are the Jacobians evaluated at the current estimate.**

A nonlinear process or sensor equation maps the state through curves or surfaces. Near any single operating point the curve looks almost straight, so its slope (the Jacobian matrix of partial derivatives) converts the problem into the linear form the ordinary Kalman filter already knows how to solve. The filter therefore propagates and corrects the estimate exactly as in the linear case, but recomputes the slope after every update so the straight-line approximation always rides along with the latest state.

Because the linearization point moves, the filter remains consistent only while the neglected higher-order curvature stays small. When curvature grows, the covariance produced by the filter no longer matches the true uncertainty, and the estimate can diverge.

> [!NOTE]
> The single most important “aha” is that the Jacobians are not fixed matrices; they are functions of the current estimate and must be re-evaluated at every prediction and measurement step.

## 2. Why this matters — concrete and current
NASA’s Artemis lunar missions fuse IMU, star-tracker, and terrain-camera measurements whose geometry is nonlinear; the onboard navigation filter is an EKF whose measurement Jacobian is rebuilt each second from the camera’s line-of-sight vectors.

SpaceX’s Falcon 9 and Starship vehicles run an EKF that blends GPS, radar altimeter, and engine-chamber pressure data; the state-transition Jacobian captures the nonlinear coupling between thrust vector angle and angular acceleration.

Modern automotive radar–camera fusion in vehicles from Mobileye and Tesla linearizes the nonlinear polar-to-Cartesian conversion of radar returns; the resulting 4 × 4 Jacobian appears inside every 20 ms perception cycle.

GPS/INS integration in commercial airliners (Honeywell ADIRU) employs an EKF whose process Jacobian includes the nonlinear Coriolis and transport-rate terms that arise from the wander-azimuth mechanization of the inertial frame.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Standard Kalman filter equations | The EKF simply substitutes linearized matrices into the same predict–update cycle.   |
| Partial derivatives            | Jacobians are assembled column-by-column from partial derivatives of each equation.  |
| State-space representation     | Both process and measurement models must be written as \(\mathbf{x}_{k+1}=f(\mathbf{x}_k)\) and \(\mathbf{z}_k=h(\mathbf{x}_k)\). |
| First-order Taylor expansion   | Linearization is exactly the first-order term of that expansion evaluated at the current estimate. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Nonlinear motion and measurement
Plain-English claim: Real vehicles and sensors obey equations that contain products, trigonometric functions, or square roots.

Concrete example: A range-bearing sensor reports distance and angle to a landmark; the measurement equation therefore contains \(\sqrt{x^2+y^2}\) and \(\arctan(y/x)\).

Formal statement:
\[
\mathbf{x}_{k+1}=f(\mathbf{x}_k,\mathbf{u}_k,\mathbf{w}_k),\qquad
\mathbf{z}_k=h(\mathbf{x}_k,\mathbf{v}_k).
\]

> [!WARNING]
> Treating \(f\) or \(h\) as linear when they are not produces inconsistent covariance and eventual divergence.

### Step 2 — Local linear approximation
Plain-English claim: At any instant the nonlinear map can be replaced by its tangent hyperplane.

Formal statement: The first-order Taylor expansion of \(f\) about \(\hat{\mathbf{x}}_{k|k}\) is
\[
f(\mathbf{x})\approx f(\hat{\mathbf{x}})+\left.\frac{\partial f}{\partial\mathbf{x}}\right|_{\hat{\mathbf{x}}}(\mathbf{x}-\hat{\mathbf{x}}).
\]

### Step 3 — Definition of the process Jacobian
The matrix of partial derivatives is denoted
\[
\mathbf{F}_k=\left.\frac{\partial f}{\partial\mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k}}.
\]
Each column is the gradient of one component of \(f\) with respect to the entire state vector.

### Step 4 — Definition of the measurement Jacobian
Likewise,
\[
\mathbf{H}_k=\left.\frac{\partial h}{\partial\mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}}.
\]

### Step 5 — Substitution into the Kalman filter
The EKF prediction and update equations are identical to the linear Kalman filter except that \(\mathbf{F}_k\) and \(\mathbf{H}_k\) replace the constant matrices and are recomputed at every step.

### Step 6 — Propagation of the covariance
\[
\mathbf{P}_{k+1|k}=\mathbf{F}_k\mathbf{P}_{k|k}\mathbf{F}_k^T+\mathbf{Q}_k.
\]

### Step 7 — Measurement update with the new linearization
The Kalman gain becomes
\[
\mathbf{K}_k=\mathbf{P}_{k|k-1}\mathbf{H}_k^T(\mathbf{H}_k\mathbf{P}_{k|k-1}\mathbf{H}_k^T+\mathbf{R}_k)^{-1}.
\]

### Step 8 — Textbook statement of the algorithm
After each measurement the posterior mean is used as the new linearization point for the subsequent cycle, closing the loop between estimation and re-linearization.

## 5. Worked examples — every step shown

**Example 1 — Scalar nonlinear measurement**
*Given:* \(z=\sqrt{x}+v\), \(\hat{x}=4\), \(P=1\), \(R=0.25\).
*Find:* The scalar \(H\) and the updated variance.
- Compute \(H=\partial\sqrt{x}/\partial x=1/(2\sqrt{x})\) evaluated at 4 → \(H=0.25\).
  *Why:* definition of the Jacobian for a scalar function.
- Kalman gain \(K=P H/(H^2 P+R)=1\cdot0.25/(0.0625+0.25)=0.8\).
  *Why:* standard scalar gain formula.
- Posterior variance \(P^+= (1-KH)P=0.8\times0.25=0.2\).
  *Why:* Joseph or simple form of covariance update.

**Final answer**  
\(H=0.25\), \(P^+=0.2\)

*Reflection:* The square-root made \(H\) state-dependent; forgetting to re-evaluate it at the new estimate would leave the filter using an outdated slope.

**Example 2 — 2-D range-only tracking (prediction step)**
*Given:* \(\mathbf{x}=[x,y]^\top\), \(f(\mathbf{x})=[x+v_x\Delta t,y+v_y\Delta t]^\top\) (constant velocity, nonlinear drag omitted for brevity).
*Find:* \(\mathbf{F}\).
- \(\mathbf{F}=\begin{bmatrix}1&0\\\0&1\end{bmatrix}\) because the map is already linear.
  *Why:* partial derivatives of linear terms are constants.

**Final answer**  
\(\mathbf{F}=\mathbf{I}\)

*Reflection:* Even when the map is linear the EKF machinery still works; the Jacobian simply recovers the original matrix.

**Example 3 — Bearing measurement Jacobian**
*Given:* \(h(\mathbf{x})=\arctan(y/x)\), \(\hat{\mathbf{x}}=[3,4]^\top\).
*Find:* row vector \(\mathbf{H}\).
- \(\partial h/\partial x=-y/(x^2+y^2)=-4/25=-0.16\).
- \(\partial h/\partial y=x/(x^2+y^2)=3/25=0.12\).
  *Why:* quotient rule applied to \(\arctan\).

**Final answer**  
\(\mathbf{H}=[-0.16,0.12]\)

*Reflection:* Trigonometric nonlinearities produce state-dependent entries that vanish at the origin, a common source of filter ill-conditioning.

**Example 4 — Full EKF cycle on Van der Pol oscillator (excerpt)**
*Given:* continuous dynamics \(\dot{x}_1=x_2\), \(\dot{x}_2=-x_1+\mu(1-x_1^2)x_2\), discretized by Euler with \(\Delta t=0.01\), \(\mu=2\).
*Find:* the (2,2) element of \(\mathbf{F}\).
- After discretization the second state update contains the term \(\mu(1-x_1^2)x_2\Delta t\).
- Differentiate w.r.t. \(x_2\): \(\mu(1-x_1^2)\Delta t\).
- Evaluate at current estimate \(x_1=1.5\): \(\mu(1-2.25)\times0.01=-0.025\).

**Final answer**  
\(\mathbf{F}_{22}=-0.025\) (plus the identity contribution of 1 from the linear part).

*Reflection:* The quadratic term \(- \mu x_1^2 x_2\) produces an extra factor of \(-2\mu x_1 x_2\) when differentiated w.r.t. \(x_1\), illustrating how every nonlinearity contributes to the Jacobian.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using a constant Jacobian         | Programmer caches \(\mathbf{F}\) outside the loop   | Recompute Jacobians inside the time-update function  |
| Linearizing about the wrong point | Using predicted instead of updated state            | Always evaluate at \(\hat{\mathbf{x}}_{k|k}\) after correction |
| Analytic Jacobian algebra error   | Sign error in partial derivative                    | Cross-check with finite-difference numerical Jacobian|
| Ignoring state-dependent noise    | \(\mathbf{Q}\) or \(\mathbf{R}\) also depend on \(\mathbf{x}\) | Augment Jacobians with noise-mapping derivatives     |
| Singular \(\mathbf{HPH}^\top+\mathbf{R}\) | Landmark directly overhead, range Jacobian rank-deficient | Add small regularization or switch sensor modality   |
| Covariance collapse               | Higher-order terms neglected for many steps         | Monitor NEES; trigger occasional batch least-squares |
| Unit inconsistency                | Angles in degrees versus radians inside trig functions | Enforce SI units throughout the filter               |

## 7. The textbook-precise statement
Let the nonlinear system be
\[
\mathbf{x}_{k+1}=f(\mathbf{x}_k,\mathbf{u}_k,\mathbf{w}_k),\qquad
\mathbf{z}_k=h(\mathbf{x}_k,\mathbf{v}_k),
\]
with \(\mathbf{w}_k\sim\mathcal{N}(0,\mathbf{Q}_k)\) and \(\mathbf{v}_k\sim\mathcal{N}(0,\mathbf{R}_k)\) white and uncorrelated. The EKF propagates
\[
\hat{\mathbf{x}}_{k+1|k}=f(\hat{\mathbf{x}}_{k|k},\mathbf{u}_k,0),\qquad
\mathbf{P}_{k+1|k}=\mathbf{F}_k\mathbf{P}_{k|k}\mathbf{F}_k^T+\mathbf{Q}_k,
\]
where
\[
\mathbf{F}_k=\left.\frac{\partial f}{\partial\mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k}},
\]
and updates with the measurement Jacobian
\[
\mathbf{H}_k=\left.\frac{\partial h}{\partial\mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}}
\]
exactly as in the linear Kalman filter (see Welch & Bishop, “An Introduction to the Kalman Filter”, UNC Tech. Rep. TR 95-041, §5).

## 8. Visual — diagram or schematic
```text
          x_k(+) ──▶[ f(·) ]──▶ x_k+1(−)
                       │
                       ▼  F = df/dx
                    [Jacobian]
                       │
                       ▼
          P_k(+) ──▶ F P F^T + Q ──▶ P_k+1(−)
                       │
                       ▼
          z_k ──▶[ h(·) ]──▶ innovation
                       │
                       ▼  H = dh/dx
                    [Jacobian]
                       │
                       ▼
                    K = P H^T (H P H^T + R)^−1
                       │
                       ▼
          x_k+1(+) ◀──[update]◀── x_k+1(−)
```
The diagram shows the two linearization points (process and measurement) feeding the same covariance propagation and gain computation.

## 9. The memory technique
1. **The hook** — Picture a hiker walking on a curving mountain path; at every step she unrolls a tiny flat map tangent to the trail exactly where she stands—the map is the Jacobian, and she redraws it after each footstep.
2. **What to overlearn** — The two definitions \(\mathbf{F}_k=\partial f/\partial\mathbf{x}|_{\hat{x}_{k|k}}\) and \(\mathbf{H}_k=\partial h/\partial\mathbf{x}|_{\hat{x}_{k|k-1}}\) together with the fact that both must be recomputed every cycle.
3. **Spaced-repetition schedule** — Review the definitions after 1 day, 3 days, 7 days, 16 days, 35 days; each time derive the Jacobian of a fresh nonlinear example from scratch.
4. **First-principles fallback** — If the mnemonic fails, start from the scalar Taylor expansion \(f(x+\delta x)\approx f(x)+f'(x)\delta x\) and promote the derivative to a matrix of partials; the rest of the EKF follows by substitution.

## 10. What this unlocks
Mastery of EKF linearization immediately opens the door to the Unscented Kalman Filter (UKF), which avoids explicit Jacobians by propagating sigma points, to factorized square-root EKFs used in real-time flight software, and to tightly-coupled visual–inertial odometry algorithms that treat camera reprojection as the nonlinear measurement function.

- Sliding-window bundle adjustment (nonlinear least squares)
- Inertial SLAM with Lie-group state representations
- Differentiable Kalman filters for end-to-end learning pipelines

## 11. Self-check — five questions, no answers
1. Derive the 2×2 process Jacobian for the discrete-time unicycle model \(x_{k+1}=x_k+v\Delta t\cos\theta_k\), \(y_{k+1}=y_k+v\Delta t\sin\theta_k\).
2. A range measurement \(z=\sqrt{x^2+y^2}+v\) is taken when the predicted state is \([0,0]^\top\). What happens to the measurement Jacobian and why is the filter singular?
3. Show that the EKF update equations reduce exactly to the linear Kalman filter when both \(f\) and \(h\) are affine.
4. Compute the finite-difference approximation to \(\partial h/\partial x\) for \(h=\arctan(y/x)\) at \([1,1]^\top\) with step size \(10^{-6}\) and compare with the analytic value.
5. A student caches the Jacobian at the initial guess for all 500 steps of a ballistic trajectory. Predict the qualitative behavior of the filter covariance and the eventual estimate error.