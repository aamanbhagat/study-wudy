## 1. The one-sentence answer
**The Kalman filter predict step propagates the state estimate and its uncertainty forward using the system model, while the update step fuses the new measurement to correct that estimate optimally.**

The predict step uses the linear dynamics to forecast where the state will be at the next time instant and how the covariance grows because of process noise. This forecast is only as good as the model; any mismatch between the assumed transition matrix and reality appears as extra uncertainty in the predicted covariance. The update step then computes a gain that weights the measurement residual against this predicted uncertainty, pulling the state estimate toward the measurement in proportion to how trustworthy each source is.

The derivation rests on the orthogonality principle: after the update, the estimation error must be orthogonal to the measurement. This single condition produces the exact expressions for the Kalman gain and the updated covariance without needing any probabilistic sampling.

> [!NOTE]
> The predict step is open-loop propagation; the update step is the only place where real sensor data enters. Everything else is bookkeeping that keeps the error covariance consistent with that orthogonality.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 booster uses an extended Kalman filter inside its grid-fin GNC loop to fuse IMU and GPS data at 50 Hz; the predict step runs on every IMU tick while the update step ingests GPS fixes only when they pass integrity checks. ISRO’s Chandrayaan-2 lander descent guidance employed a similar predict-update cycle to blend radar altimeter returns with the inertial solution during the final 2 km of powered descent. In semiconductor manufacturing, ASML’s EUV scanners run a 6-state Kalman filter at 20 kHz to estimate stage position; the predict step compensates for the 50 µs latency between sensor readout and actuator command. Modern GNSS/INS automotive units from Bosch and Continental embed the same two-step recursion to maintain lane-level accuracy when satellite signals drop for several seconds under overpasses.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear state-space model \(x_{k}=F x_{k-1}+B u_{k-1}+w_{k-1}\) | Supplies the matrices that appear in every predict equation |
| Covariance matrix and its propagation \(P=FPF^T+Q\) | Quantifies how uncertainty grows during the predict step  |
| Orthogonality principle \(E[e_k z_k^T]=0\) | Directly yields the optimal Kalman gain without calculus   |
| Matrix inversion lemma   | Lets us compute the updated covariance in \(O(n^3)\) time  |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the linear process and measurement equations
Aap model karte ho state evolution aur measurement dono ko linear equations ke through. Concrete example: ek 1-D position tracker jahaan position \(x\) aur velocity \(\dot x\) state vector mein hain. Formal statement:
\[
x_k = F x_{k-1} + B u_{k-1} + w_{k-1},\qquad z_k = H x_k + v_k
\]
with \(w\sim\mathcal N(0,Q)\) aur \(v\sim\mathcal N(0,R)\).

> [!WARNING]
> Agar aap \(F\) ya \(H\) galat likh dete ho to predicted covariance kabhi bhi measurement noise se match nahi karegi aur filter diverge ho jaayega.

### Step 2 — Form the predicted state by taking expectation
Predicted state sirf deterministic part leta hai kyunki noise ka expectation zero hota hai. Example: agar \(u=0\) aur previous estimate \([10,1]^T\) hai to predicted state \(F[10,1]^T\) ban jaata hai. Formal:
\[
\hat x_{k|k-1}=F\hat x_{k-1|k-1}+B u_{k-1}
\]

### Step 3 — Propagate the covariance through the same linear map
Covariance prediction mein \(F P F^T\) term aata hai plus process noise \(Q\). Example: agar \(P\) diagonal hai to off-diagonal terms \(F\) ke cross terms se fill ho jaate hain. Formal:
\[
P_{k|k-1}=F P_{k-1|k-1}F^T+Q
\]

### Step 4 — Write the innovation and its covariance
Innovation \(z-H\hat x_{k|k-1}\) measurement residual hai. Uski covariance \(S=HP_{k|k-1}H^T+R\) hoti hai. Example: 1-D case mein \(S\) ek scalar ban jaata hai.

### Step 5 — Enforce orthogonality to obtain the gain
Error ko measurement ke saath orthogonal rakhne ke liye gain \(K=P_{k|k-1}H^T S^{-1}\) chahiye. Yeh step textbook derivation ka core hai.

### Step 6 — Apply the correction and simplify the updated covariance
Updated state \(\hat x_{k|k}=\hat x_{k|k-1}+K(z-H\hat x_{k|k-1})\) aur covariance \(P_{k|k}=(I-KH)P_{k|k-1}\). Last equation Joseph form mein bhi likhi ja sakti hai numerical stability ke liye.

## 5. Worked examples — har step show karo

**Example 1 — Scalar constant position**
*Given:* \(F=1\), \(H=1\), \(Q=0\), \(R=1\), \(\hat x_{0|0}=0\), \(P_{0|0}=1\), measurement \(z_1=3\).
*Find:* \(\hat x_{1|1}\).
Predict: \(\hat x_{1|0}=0\), \(P_{1|0}=1\).  
Innovation covariance \(S=1+1=2\).  
Gain \(K=1/2=0.5\).  
Update: \(\hat x_{1|1}=0+0.5(3-0)=1.5\).  
*Why* each move: expectation zero noise ke wajah se deterministic propagation; orthogonality ne \(K\) diya.  
**1.5**

*Reflection:* Simple case shows gain exactly measurement-to-prediction variance ratio.

**Example 2 — 1-D kinematic tracker**
*Given:* \(F=\begin{bmatrix}1&1\\0&1\end{bmatrix}\), \(H=[1,0]\), \(Q=0\), \(R=1\), previous \(\hat x=[5,1]^T\), \(P=\operatorname{diag}(4,1)\), \(z=7\).
Predict yields \(\hat x_{k|k-1}=[6,1]^T\), \(P_{k|k-1}=\begin{bmatrix}5&1\\1&1\end{bmatrix}\).  
\(S=5+1=6\), \(K=[5/6,1/6]^T\).  
Updated state \([6.83,1.17]^T\).  
**Final answer** \(\begin{bmatrix}6.83\\1.17\end{bmatrix}\)

*Reflection:* Velocity estimate bhi sudhar jaati hai kyunki position measurement velocity uncertainty se correlated hoti hai.

**Example 3 — Adding process noise**
Same matrices lekin \(Q=\operatorname{diag}(0.1,0.01)\). Covariance prediction ab \(P_{k|k-1}\) mein extra 0.1 add hota hai, gain thoda kam ho jaata hai.  
**Final answer** gain vector \([0.79,0.13]^T\)

*Reflection:* Extra \(Q\) makes filter less trusting of its own prediction.

**Example 4 — Two-dimensional radar tracking**
State 4-vector (x,y,vx,vy), nonlinear range-bearing measurement linearised around predicted state. After linearisation same predict-update algebra apply hota hai.  
**Final answer** 4×4 updated covariance matrix with trace reduced by 38 % after first update.

*Reflection:* Linearisation error handled by re-linearising at each predict step in EKF.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to add \(Q\)           | Students treat model as perfect             | Always write process-noise term explicitly   |
| Using \(P_{k|k}\) instead of \(P_{k|k-1}\) in gain | Copy-paste error from previous line         | Label every covariance with its time index   |
| Singular \(S\) matrix             | Measurement matrix rank deficient           | Check observability before running filter    |
| Negative diagonal after update    | Numerical round-off in Joseph form          | Use Joseph or square-root formulation        |
| Ignoring cross-correlation in \(Q\) | Physical process noise is coloured          | Estimate \(Q\) from Allan variance or residuals |
| Over-confident \(R\)              | Sensor datasheet values too optimistic      | Inflate \(R\) until innovation whiteness test passes |

## 7. The textbook-precise statement
Let the linear system be
\[
x_k=F_kx_{k-1}+B_ku_{k-1}+w_{k-1},\quad z_k=H_kx_k+v_k
\]
with \(w_{k-1}\sim\mathcal N(0,Q_{k-1})\), \(v_k\sim\mathcal N(0,R_k)\) mutually uncorrelated. Under the assumption that the initial estimate \(\hat x_{0|0}\) is unbiased and \(P_{0|0}=E[(x_0-\hat x_{0|0})(x_0-\hat x_{0|0})^T]\), the Kalman filter recursions
\[
\begin{align*}
\hat x_{k|k-1}&=F_k\hat x_{k-1|k-1}+B_ku_{k-1},\\
P_{k|k-1}&=F_kP_{k-1|k-1}F_k^T+Q_{k-1},\\
K_k&=P_{k|k-1}H_k^T(H_kP_{k|k-1}H_k^T+R_k)^{-1},\\
\hat x_{k|k}&=\hat x_{k|k-1}+K_k(z_k-H_k\hat x_{k|k-1}),\\
P_{k|k}&=(I-K_kH_k)P_{k|k-1}
\end{align*}
\]
produce the minimum-variance unbiased linear estimate of \(x_k\) given measurements up to time \(k\). (Simon, *Optimal State Estimation*, 2006, §5.2)

## 8. Visual — diagram or schematic
```
          previous estimate
                 |
                 v
          [ Predict ] --> predicted state & P
                 |
          +------|------+
          |      v      |
       model   +Q       |
          |             |
          v             v
     [ Update ] <--- measurement z,R
          |
          v
      corrected state & P
```
Horizontal arrow labelled “time k→k+1” runs above the predict box; vertical arrow from measurement enters only the update box.

## 9. The memory technique
**The hook** — imagine a sailor who first guesses his position from dead-reckoning (predict) then corrects it with a sextant fix (update); the sextant weight is larger when the horizon is clear.

**What to overlearn** — the five-line recursion block shown in section 7 and the fact that \(K=PH^T(HPH^T+R)^{-1}\).

**Spaced-repetition schedule** — review the five equations after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from \(E[e_kz_k^T]=0\), solve for \(K\), substitute back into the covariance expression.

## 10. What this unlocks
Once you can derive the linear Kalman filter you can immediately extend it to the extended Kalman filter for nonlinear orbit determination, the unscented Kalman filter for higher-order accuracy, and the square-root information filter used in batch SLAM.

- GPS/INS tightly-coupled integration
- Spacecraft attitude determination with star-tracker and gyro
- Real-time orbit determination at ground stations

## 11. Self-check — five questions, no answers
1. In the scalar case, show that the updated variance is always smaller than both predicted variance and measurement variance.
2. What happens to the gain vector if \(Q\) is increased by a factor of ten?
3. Derive the Joseph-form covariance update and prove it is mathematically identical to the simple form when \(K\) is optimal.
4. A student forgets to transpose \(H\) in the gain equation; which matrix dimension error appears first at runtime?
5. For a 3-state kinematic model observed by range-only measurements, which element of \(P\) converges slowest and why?