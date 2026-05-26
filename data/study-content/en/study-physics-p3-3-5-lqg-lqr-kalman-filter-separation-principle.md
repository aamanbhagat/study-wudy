## 1. The one-sentence answer
**LQG control is the optimal feedback law obtained by pairing an LQR state-feedback gain with a Kalman-filter state estimator, made possible by the separation principle that lets the two designs be solved independently.**

The separation principle arises because the closed-loop eigenvalues of the combined system are simply the union of the regulator poles and the estimator poles. In the linear-Gaussian setting the cost separates into a deterministic quadratic term that depends only on the control gain and a stochastic term that depends only on the estimator gain; cross terms vanish under the orthogonality properties of the Kalman filter. Consequently the designer solves two independent Riccati equations—one for control, one for estimation—and then assembles the compensator by substituting the estimated state into the LQR law.

This construction yields a dynamic output-feedback controller whose order equals the plant order and whose performance is optimal in the expected-value sense for linear plants driven by white process and measurement noise.

> [!NOTE]
> The separation principle is not a physical approximation; it is an exact algebraic fact that holds only for the linear-quadratic-Gaussian triple and fails as soon as any of those three assumptions is relaxed.

## 2. Why this matters — concrete and current
SpaceX uses an LQG-derived attitude controller on the Falcon 9 second stage to regulate thrust-vector angle while the Kalman filter fuses IMU and GPS data; the same architecture appears in the Dragon spacecraft docking autopilot. NASA’s OSIRIS-REx sample-return mission employed an LQG guidance loop for the Touch-and-Go sampling maneuver, where the estimator compensated for uncertain asteroid surface properties and the LQR gain shaped the approach velocity profile. Modern commercial aircraft such as the Boeing 787 fly-by-wire system contains inner-loop LQG pitch controllers whose separation-based design allows independent tuning of handling qualities and sensor-fusion bandwidth. In semiconductor lithography, ASML’s EUV scanners employ LQG stages controllers to position reticles at nanometer precision; the Kalman filter rejects floor vibration while the LQR term minimizes settling time under actuator saturation constraints. Finally, the James Webb Space Telescope’s fine-pointing loop is a six-state LQG controller whose separation property permitted the attitude-control team to verify stability margins without re-deriving the estimator each time the reaction-wheel friction model was updated.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| State-space realization        | Both LQR and Kalman filter are formulated exclusively in \(\dot{x}=Ax+Bu\), \(y=Cx+v\). |
| Algebraic Riccati equation     | The optimal gains are extracted from the unique positive-semidefinite solutions of two AREs. |
| White-noise statistics         | Process noise \(Q\) and measurement noise \(R\) determine the Kalman gain and the separation property. |
| Observability and controllability | They guarantee existence and uniqueness of the stabilizing solutions of the two Riccati equations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — State feedback when the state is known
When every component of the state vector is measured without error, the optimal infinite-horizon quadratic regulator is a static gain \(u=-Kx\) obtained from the control Riccati equation.  
For the scalar double integrator \(\ddot{x}=u\) with cost \(\int(x^2+u^2)dt\), the gain is \(K=[1,\sqrt{2}]\).  
\[
A^\top P+PA-PBR^{-1}B^\top P+Q=0,\qquad K=R^{-1}B^\top P.
\]
> [!WARNING]
> If the measured output is used in place of the true state without accounting for noise, the resulting loop can become arbitrarily sensitive to sensor error.

### Step 2 — State estimation when the input is known
When the state is hidden but the applied input \(u\) is known, the minimum-variance estimator is the Kalman filter whose gain \(L\) solves the filter Riccati equation driven by process-noise intensity \(W\) and sensor-noise intensity \(V\).  
A one-dimensional position measurement of a drifting particle yields \(L=P C^\top V^{-1}\).  
\[
A\Sigma+\Sigma A^\top-\Sigma C^\top V^{-1}C\Sigma+W=0,\qquad L=\Sigma C^\top V^{-1}.
\]

### Step 3 — Certainty equivalence
Replace the unknown state in the LQR law by its Kalman estimate: \(u=-K\hat{x}\). The resulting controller is dynamic and of the same order as the plant.  
The substitution is justified once the separation principle is proved; until then it remains an intuitive but unproven guess.

### Step 4 — Closed-loop eigenvalues
Substitute the control law into the plant and augment with the estimator dynamics. The 2n-dimensional state matrix is block-triangular:
\[
\begin{bmatrix}
A-BK & BK \\
0 & A-LC
\end{bmatrix}.
\]
Its spectrum is therefore the disjoint union of the spectra of \(A-BK\) and \(A-LC\).

### Step 5 — Cost separation
The expected quadratic cost splits into two independent terms: one that depends only on \(K\) and the deterministic initial condition, and one that depends only on \(L\) and the noise intensities. Cross terms vanish because the Kalman estimation error is orthogonal to the estimate. This algebraic cancellation is the separation principle.

### Step 6 — Textbook statement of LQG
The LQG controller is the dynamic compensator
\[
\dot{\hat{x}}=(A-BK-LC)\hat{x}+Ly,\qquad u=-K\hat{x},
\]
where \(K\) and \(L\) are obtained from the two independent Riccati equations above. The design is optimal for the stochastic cost \(\mathbb{E}\int(x^\top Qx+u^\top Ru)dt\).

## 5. Worked examples — every step shown

**Example 1 — Scalar plant**  
*Given:* \(\dot{x}=u+w\), \(y=x+v\), \(Q=R=W=V=1\).  
*Find:* LQG controller.  
The control Riccati yields \(P=1\), hence \(K=1\).  
The filter Riccati yields \(\Sigma=1\), hence \(L=1\).  
Controller: \(\dot{\hat{x}}=-2\hat{x}+y\), \(u=-\hat{x}\).  
**Final answer:** \(\dot{\hat{x}}=-2\hat{x}+y\), \(u=-\hat{x}\).  
*Reflection:* The numbers are identical because the two Riccati equations are dual; the same arithmetic appears in both.

**Example 2 — Double integrator position control**  
*Given:* \(\ddot{x}=u+w\), \(y=x+v\), \(Q=\operatorname{diag}(1,0)\), \(R=1\), \(W=\operatorname{diag}(0,1)\), \(V=0.01\).  
*Find:* Gains.  
Control ARE solution \(P=\begin{bmatrix}1.732&1\\1&1.732\end{bmatrix}\), \(K=[1.732,1.732]\).  
Filter ARE yields \(\Sigma=\begin{bmatrix}0.1414&0.1\\0.1&0.1414\end{bmatrix}\), \(L=[14.14,10]^\top\).  
**Final answer:** \(K=[1.732,1.732]\), \(L=[14.14,10]^\top\).  
*Reflection:* The filter bandwidth is deliberately higher than the regulator bandwidth because measurement noise is low.

**Example 3 — Adding process-noise intensity**  
*Given:* Same plant as Example 2 but \(W=\operatorname{diag}(0,10)\).  
The filter Riccati now produces larger \(\Sigma\), hence larger \(L\). The control gain \(K\) remains unchanged.  
**Final answer:** \(K\) unchanged, \(L\) increases.  
*Reflection:* Separation lets the designer raise estimator gain without retuning the regulator.

**Example 4 — Verify separation numerically**  
*Given:* 2-state plant, compute closed-loop eigenvalues of the 4th-order LQG system.  
Place poles of \(A-BK\) at \(-1\pm j\) and poles of \(A-LC\) at \(-5\pm 2j\). The composite spectrum is exactly those four numbers, confirming the block-triangular structure.  
**Final answer:** Eigenvalues match the union of the two sets.  
*Reflection:* Any mismatch would indicate an algebraic error in the controller realization.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using measured \(y\) directly in the LQR law | Designer forgets sensor noise exists | Always insert the Kalman filter; never substitute \(y\) for \(\hat{x}\). |
| Designing \(K\) and \(L\) from the same Riccati | Confusion between control and filter duals | Solve two distinct AREs with different \((Q,R)\) and \((W,V)\). |
| Ignoring that separation fails for nonlinear plants | Over-generalization of the linear result | Verify linearity before invoking separation. |
| Treating the LQG controller as robust by default | LQR is optimal only for the nominal model | Add robustness margins or switch to \(\mathcal{H}_\infty\) when uncertainty is large. |
| Forgetting that \(Q\) and \(W\) are design knobs | Both appear as “noise” matrices | Remember \(Q,R\) shape deterministic performance; \(W,V\) shape estimator bandwidth. |
| Numerical ill-conditioning of ARE solvers | Plant has widely separated time scales | Scale states or use descriptor Riccati solvers. |
| Assuming the compensator order can be reduced arbitrarily | Loss of observability after reduction | Check that the reduced-order model retains the separation property. |

## 7. The textbook-precise statement
Let \((A,B)\) be stabilizable and \((A,C)\) detectable. Let \(Q=Q^\top\geq0\), \(R=R^\top>0\), \(W=W^\top\geq0\), \(V=V^\top>0\). The unique positive-semidefinite solutions \(P\) and \(\Sigma\) of the control and filter algebraic Riccati equations yield gains \(K=R^{-1}B^\top P\) and \(L=\Sigma C^\top V^{-1}\). The compensator
\[
\dot{\hat{x}}=(A-BK-LC)\hat{x}+Ly,\qquad u=-K\hat{x}
\]
minimizes \(\mathbb{E}\int_0^\infty(x^\top Qx+u^\top Ru)\,dt\) for the stochastic system driven by white noises of intensities \(W\) and \(V\). (Kwakernaak & Sivan, *Linear Optimal Control Systems*, 1972, §5.5.)

## 8. Visual — diagram or schematic
```text
          w
          |
          v
   +------+-----+          +-----------------+
   |   Plant    |   y      |   LQG Controller|
   |  \dot x=Ax+Bu |------>|                 |
   |     y=Cx+v    |       |  \hat x dot =   |
   +------+-----+          | (A-BK-LC)\hat x + L y |
          ^                |  u = -K \hat x  |
          | u              +-----------------+
          |                        |
          +------------------------+
```
Axes: horizontal time, vertical signal amplitude; arrows labelled \(u,w,y\); blocks contain the exact state equations shown.

## 9. The memory technique
1. **The hook** — Picture two Riccati “twins” sitting back-to-back; one solves control, the other estimation; they never speak yet produce a perfect controller when placed side-by-side.  
2. **What to overlearn** — The block-triangular closed-loop matrix and the two AREs with their exact quadratic terms.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the 2n closed-loop matrix, observe its triangular form, then recompute the expected cost to see the cross term vanish.

## 10. What this unlocks
LQG supplies the foundation for every subsequent stochastic and optimal-control technique used in aerospace GNC.  
- Linear Quadratic Gaussian with Loop Transfer Recovery (LQG/LTR)  
- \(\mathcal{H}_2\) and \(\mathcal{H}_\infty\) synthesis via Riccati equations  
- Model Predictive Control with Gaussian noise models  
- Kalman smoothing for post-flight trajectory reconstruction  
- Covariance Control and sensor-placement optimization

## 11. Self-check — five questions, no answers
1. For a second-order plant, how many independent Riccati equations must be solved to obtain the LQG controller?  
2. Write the 4×4 closed-loop state matrix of an LQG regulator for a 2-state plant and locate its eigenvalues.  
3. If the measurement-noise intensity \(V\) is doubled while every other matrix stays fixed, which gain changes and in what direction?  
4. A colleague claims the LQG controller remains optimal when actuator saturation is introduced. Identify the modelling assumption that has been violated.  
5. Derive the separation principle for a first-order plant by direct expansion of the quadratic cost; show that the cross term is identically zero.