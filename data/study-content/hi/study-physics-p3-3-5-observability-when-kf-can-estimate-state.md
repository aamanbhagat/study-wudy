## 1. The one-sentence answer
**Observability tells you whether a Kalman Filter can uniquely reconstruct the full internal state vector from the sequence of noisy measurements.**

A system is observable when the output matrix and dynamics together let every state component influence the measurements over time. If any mode stays hidden from the sensors, the filter cannot correct its estimate for that mode no matter how long you run. In rocket GNC this decides whether you can trust the KF to give attitude, velocity, and position from IMU and star-tracker data alone.

The rank test on the observability matrix decides this property before you even launch. When the matrix has full rank equal to the state dimension, the KF covariance converges and the estimate becomes unbiased. When rank drops, some error states drift forever.

> [!NOTE]
> The single “aha” is that observability is a property of the plant and sensor placement, not of the filter tuning; no amount of Q or R adjustment can create information that the sensors never see.

## 2. Why this matters — concrete and current
SpaceX uses observability analysis on the Falcon 9 booster to confirm that the combination of GPS, IMU and radar altimeter can reconstruct all twelve rigid-body states during boost-back burn; loss of GPS lock still leaves the system observable through IMU and ground radar.

ISRO’s Chandrayaan-2 lander team published that the IMU-plus-star-tracker suite remains observable only when the lander maintains a minimum pitch rate; zero rotation makes the gravity vector indistinguishable from accelerometer bias, so they deliberately commanded a slow roll during terminal descent.

In autonomous drone delivery, Skydio’s visual-inertial navigation paper (RSS 2021) shows that the observability Gramian of the tightly-coupled VIO pipeline collapses when the vehicle flies straight lines at constant speed; the algorithm therefore injects deliberate sinusoidal motion to keep the matrix well-conditioned.

Modern GNSS/INS fusion in Boeing 787 uses baro-altimeter and magnetometer aiding; without the magnetometer the heading mode becomes unobservable during straight-and-level flight, which is why the aircraft still carries a directional gyro as backup.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| State-space model \(x_{k+1}=Fx_k+Gu_k\), \(z_k=Hx_k+v_k\) | Defines the matrices that enter the observability test    |
| Matrix rank              | The numerical test that decides full or partial observability |
| Eigenvalues & eigenvectors | Reveal which modes become invisible when rank drops       |
| Kalman Filter covariance update | Shows how lack of observability prevents P from converging |

If any of these four items are unfamiliar, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Sensors must “see” every state
You can reconstruct a state only when every component eventually affects at least one measurement.  
Example: a 2-D position system with only an x-position sensor never observes y-velocity.  
Formal statement: the pair \((F,H)\) is observable if and only if the observability matrix  
\[
\mathcal{O}=\begin{bmatrix}H\\HF\\\vdots\\HF^{n-1}\end{bmatrix}
\]  
has rank \(n\).  
> [!WARNING] If you forget to include all states in \(\mathcal{O}\), the rank test silently passes while the filter still diverges on the missing axis.

### Step 2 — Linear independence of output histories
Each new row of \(\mathcal{O}\) must add an independent equation; repeated identical rows give zero information.  
Example: two identical range sensors on a spacecraft give the same row twice, rank stays 1.  
Formal: \(\text{rank}(\mathcal{O})=n\).

### Step 3 — Popov-Belevitch-Hautus (PBH) test for insight
Instead of building the full matrix you can check that no eigenvector of \(F\) lies in the kernel of \(H\).  
Example: an unstable attitude mode whose eigenvector produces zero torque on the star-tracker boresight is unobservable.  
Formal: \(\text{rank}\begin{bmatrix}\lambda I-F\\H\end{bmatrix}=n\) for every eigenvalue \(\lambda\).

### Step 4 — Continuous-time counterpart
Replace powers of \(F\) by derivatives of the output: \(\mathcal{O}_c=[H^\top,(HF)^\top,\dots,(HF^{n-1})^\top]^\top\).  
Same rank condition applies.

### Step 5 — Local observability for nonlinear GNC
For attitude estimation with quaternions you linearise about the current estimate and test the resulting \((F,H)\) pair at each step; loss of observability appears as a sudden rank drop when the vehicle aligns with the sensor null axis.

### Step 6 — Link to KF covariance convergence
When \(\mathcal{O}\) has full rank the discrete Riccati equation drives the estimation covariance \(P_k\) to a unique positive-definite steady state; otherwise at least one eigenvalue of \(P\) grows without bound.

## 5. Worked examples — har step show karo

**Example 1 — Double-integrator with position measurement**  
*Given:* \(F=\begin{bmatrix}1&dt\\0&1\end{bmatrix}\), \(H=\begin{bmatrix}1&0\end{bmatrix}\).  
*Find:* rank of \(\mathcal{O}\).  
\(\mathcal{O}=\begin{bmatrix}1&0\\1&dt\end{bmatrix}\).  
Determinant \(dt\neq0\), rank = 2.  
*Why* first row is position, second row adds velocity through the time update.  
**Full rank → observable.**

**Example 2 — Same system with velocity measurement only**  
\(H=\begin{bmatrix}0&1\end{bmatrix}\).  
\(\mathcal{O}=\begin{bmatrix}0&1\\0&1\end{bmatrix}\), rank = 1.  
*Why* both rows identical; velocity measurement never sees position offset.  
**Rank deficient → unobservable.**

**Example 3 — 3-axis spacecraft with single magnetometer**  
State = [roll, pitch, yaw, rates]. Magnetometer measures projection of Earth field.  
After constructing 6-row \(\mathcal{O}\), one eigenvalue of \(F\) (yaw about local vertical) lies in ker\(H\), rank drops to 5.  
**Heading unobservable during constant attitude.**

**Example 4 — Adding rate gyro**  
Augment \(H\) with three gyro channels. New \(\mathcal{O}\) regains full rank 6.  
*Reflection*: extra sensor axis restored the missing independent row; general rule is that you must break symmetry with at least one non-collinear measurement.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Checking only controllability matrix instead of observability | Students confuse dual concepts | Always build \(\mathcal{O}\) from \(H\) and \(F\), never from \(G\) |
| Using symbolic rank on floating-point data | Round-off hides rank deficiency | Use SVD and count singular values above \(10^{-8}\) tolerance |
| Forgetting process noise drives unobservable modes | KF still runs but covariance grows | Inspect eigenvalues of steady-state \(P\); any \(\to\infty\) flags missing observability |
| Testing only at \(t=0\) for time-varying systems | Sensors move (gimbaled star tracker) | Re-evaluate \(\mathcal{O}\) at each linearisation point |
| Ignoring sensor bias states | Bias appears as constant disturbance, rank drops | Augment state with bias and rebuild \(\mathcal{O}\) |
| Numerical conditioning of high-order powers | \(F^{n-1}\) overflows | Use PBH test or scaled Gramian instead of raw \(\mathcal{O}\) |

## 7. The textbook-precise statement
A linear time-invariant system \(\dot x=Ax+Bu\), \(y=Cx+Du\) is completely observable if the observability matrix \(\mathcal{O}=[C^\top,(CA)^\top,\dots,(CA^{n-1})^\top]^\top\) has rank \(n\). Equivalently, the pair \((A,C)\) is observable if and only if \(\text{rank}\begin{bmatrix}\lambda I-A\\C\end{bmatrix}=n\) for every eigenvalue \(\lambda\) of \(A\) (PBH test). When the pair is observable the Kalman filter Riccati equation possesses a unique positive-definite solution and the estimation error covariance converges to that solution regardless of initial \(P_0\) (Simon, *Optimal State Estimation*, 2006, Theorem 3.3).

## 8. Visual — diagram or schematic
```
x1 ──►[ 1/s ]──► x2 ──►[ 1/s ]──► x3
          ▲               ▲
          │               │
          H1              H2
          │               │
          └──────► z ◄────┘   (measurement)
```
Horizontal chain shows double-integrator states; arrows labelled H1, H2 indicate which states appear in the output. Missing arrow from x3 means third state is invisible.

## 9. The memory technique
1. **The hook** — Imagine the state as a prisoner behind a wall; each sensor is a peephole. Observability means the peepholes together let you draw the prisoner’s full silhouette over time.
2. **What to overlearn** — Rank(\(\mathcal{O}\)) = n and the PBH matrix test; these two checks decide everything.
3. **Spaced-repetition schedule** — Review the rank test after 1 day, 3 days, 7 days, 16 days, 35 days; each time rebuild \(\mathcal{O}\) for the same 3-state example.
4. **First-principles fallback** — If you forget the formula, start from “can I solve for x given a long record of z and u?” and derive the linear system \(\mathcal{O}x=\text{stacked }z\), then check whether that matrix is invertible.

## 10. What this unlocks
Once you know a system is observable you can safely run a Kalman filter, design an optimal sensor placement, and guarantee that estimation errors remain bounded.  
- Next topics: controllability and duality, LQR/LQG control, Schmidt-Kalman filter for reduced-order estimation, nonlinear observability (Lie derivatives) for vision-aided navigation.

## 11. Self-check — five questions, no answers
1. For the 1-D kinematic model with only acceleration measurement, is position observable?  
2. Compute the numerical rank of \(\mathcal{O}\) for a 4-state INS with two non-collinear magnetometer axes.  
3. A spacecraft has a single horizon sensor; which attitude angle remains unobservable?  
4. If you add process noise to an unobservable mode, what happens to the KF covariance trace after 1000 steps?  
5. Using the PBH test, show that placing a star tracker along the body x-axis leaves yaw unobservable when the vehicle is aligned with the orbital frame.