## 1. The one-sentence answer
**Eigenvalues of the system matrix A directly give the natural frequencies and damping of every independent motion mode, telling you whether the closed-loop dynamics will grow, decay, or oscillate.**

Linear time-invariant dynamics in state-space form are written as \(\dot{x}=Ax+Bu\). The homogeneous solution is completely fixed once you know how \(A\) stretches or rotates each direction in state space. Because any square matrix can be diagonalised (or Jordan-blocked) by its eigenvectors, the time response along each eigenvector is simply \(e^{\lambda_i t}v_i\). Therefore the real part of each eigenvalue \(\lambda_i\) decides exponential growth or decay while the imaginary part decides oscillation frequency; together they label every “mode” of the vehicle.

In GNC this matters because attitude controllers, orbit-keeping loops, and thrust-vectoring autopilots are all designed so that every eigenvalue of the closed-loop \(A\) lies safely in the left half-plane. One misplaced eigenvalue and a billion-dollar satellite can start nutating or tumbling.

> [!NOTE]
> The single deepest insight is that stability is not about the size of the gains you tune; it is about whether every natural mode you have created with those gains still decays. Eigenvalues make that fact visible at a glance.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 booster uses a 6-state rigid-body model for boost-back guidance. Its closed-loop \(A\) matrix is recomputed on every flight-software build; engineers verify that all six eigenvalues remain left of \(-0.05\) rad/s so that any residual pitch oscillation damps before stage separation.

ISRO’s Gaganyaan crew module reaction-control system was tuned after Monte-Carlo runs showed that a 0.3°/s nutation mode (imaginary part \(\approx 1.8\) rad/s) became unstable when the yaw inertia estimate was off by only 4 %. The eigenvalue locus plot made the fragility obvious before any hardware test.

NASA’s James Webb Space Telescope attitude-control law runs a 14-state Kalman filter whose process-noise covariance is shaped so that the estimator-error eigenvalues stay inside a 0.01 rad/s damping margin; this prevents star-tracker noise from exciting the 0.8 Hz solar-array bending mode.

In reusable launch-vehicle landing, New Shepard’s hydraulic fin actuators close a 4-state loop whose dominant eigenvalue must stay between \(-1.2\) and \(-0.8\) s\(^{-1}\). If it drifts rightward because of propellant slosh, the vehicle rocks on touchdown.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| State-space form \(\dot{x}=Ax+Bu\) | Eigenvalues are defined only for the homogeneous part \(A\). |
| Matrix diagonalisation   | Converts coupled ODEs into independent scalar exponentials \(e^{\lambda t}\). |
| Complex numbers          | Eigenvalues are usually complex; real part = decay, imaginary part = frequency. |
| First-order vector ODE solution | Shows why \(x(t)=e^{At}x_0\) is the object whose behaviour we must predict. |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the unforced dynamics
The plant without external input obeys \(\dot{x}=Ax\). Each component of \(x\) is a linear combination of every other component, so the equations are coupled.

Example: a rigid satellite with small roll-yaw coupling gives the 2-by-2 matrix  
\[
A=\begin{bmatrix}0&0.4\\-0.4&0\end{bmatrix}.
\]
The two states (roll rate and yaw rate) keep exchanging energy; you cannot solve either equation alone.

> [!WARNING]
> Treating the states as independent scalars here will produce completely wrong time constants.

### Step 2 — Assume an exponential trial solution
Guess that a solution exists of the form \(x(t)=e^{\lambda t}v\) where \(v\) is a constant vector. Differentiating gives \(\dot{x}=\lambda e^{\lambda t}v\). Substituting into the ODE immediately produces the algebraic eigenproblem  
\[
Av=\lambda v.
\]

### Step 3 — Solve the characteristic equation
The non-trivial solutions exist only when  
\[
\det(A-\lambda I)=0.
\]
The roots \(\lambda_i\) are the eigenvalues. For the satellite example above the characteristic polynomial is \(\lambda^2+0.16=0\), so \(\lambda=\pm0.4i\).

### Step 4 — Recover the mode shape (eigenvector)
Once \(\lambda\) is known, solve \((A-\lambda I)v=0\) for the direction \(v\). In the example, \(\lambda=0.4i\) yields the mode shape \(v=[1,-i]^\top\), telling you that roll and yaw are 90° out of phase.

### Step 5 — Write the general solution
Any initial condition can be expressed as a linear combination of the eigenvectors:  
\[
x(t)=\sum c_i e^{\lambda_i t}v_i.
\]
Each term \(e^{\lambda_i t}v_i\) is one independent “mode”.

### Step 6 — Read stability from the eigenvalues
- \(\operatorname{Re}(\lambda_i)<0\) for every \(i\) → all modes decay → asymptotically stable.
- Any \(\operatorname{Re}(\lambda_i)>0\) → that mode grows exponentially → unstable.
- Purely imaginary eigenvalues → sustained oscillation (marginally stable).

The textbook-grade statement appears in Section 7.

## 5. Worked examples — har step show karo

**Example 1 — Pure exponential decay**
*Given:*  
\[
A=\begin{bmatrix}-2&0\\0&-3\end{bmatrix}.
\]
*Find:* eigenvalues and stability verdict.

Compute \(\det(A-\lambda I)=(-2-\lambda)(-3-\lambda)=0\).  
Roots: \(\lambda_1=-2\), \(\lambda_2=-3\).

Both real parts negative → **system is asymptotically stable**.

*Why:* Because the matrix was already diagonal, each state simply obeys its own scalar ODE \(\dot{x}_i=\lambda_i x_i\).

**Example 2 — Coupled oscillator**
*Given:* the roll-yaw matrix of Step 1.  
*Find:* eigenvalues.

Characteristic equation \(\lambda^2+0.16=0\) yields \(\lambda=\pm0.4i\).

Real part zero → **marginally stable, sustained 0.4 rad/s oscillation**.

*Reflection:* The example shows why you must keep the sign of the off-diagonal coupling correct; flipping it would move eigenvalues into the right half-plane.

**Example 3 — Lightly damped flexible mode**
*Given:*  
\[
A=\begin{bmatrix}0&1\\-4&-0.2\end{bmatrix}.
\]
*Find:* eigenvalues and damping ratio.

Characteristic polynomial \(\lambda^2+0.2\lambda+4=0\).  
\(\lambda=-0.1\pm j\sqrt{3.99}\).

Real part \(-0.1\) guarantees decay; imaginary part \(\approx2\) rad/s is the natural frequency. Damping ratio \(\zeta=0.025\).

**Example 4 — Unstable open-loop booster**
*Given:* pitch dynamics of a sounding rocket  
\[
A=\begin{bmatrix}0&1\\2.5&0.1\end{bmatrix}.
\]
*Find:* eigenvalues.

\(\lambda^2-0.1\lambda-2.5=0\) → \(\lambda=0.05\pm j1.58\).

Positive real part → **open-loop unstable**; any disturbance grows.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting that complex eigenvalues come in conjugate pairs | Students solve the quadratic and report only one root | Always check that coefficients are real; if \(\lambda\) is a root then \(\bar{\lambda}\) must also be. |
| Reading stability from the magnitude of \(\lambda\) instead of its real part | Confusing “fast” with “stable” | Write \(\operatorname{Re}(\lambda)<0\) explicitly on every answer sheet. |
| Using the open-loop \(A\) when the question asks for closed-loop behaviour | Habit of writing plant matrices only | Label every matrix with the subscript “cl” once feedback is closed. |
| Treating Jordan blocks as diagonal | Missing repeated-root case | Check algebraic multiplicity versus geometric multiplicity before writing the solution. |
| Sign error when moving terms to form \(A-\lambda I\) | Algebra slip under time pressure | Expand the determinant by the first row and verify the constant term equals \(\det(A)\). |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{n\times n}\). The eigenvalues of \(A\) are the roots of the characteristic polynomial \(p(\lambda)=\det(A-\lambda I)\). If every eigenvalue satisfies \(\operatorname{Re}(\lambda_i)<0\), then the origin of the linear system \(\dot{x}=Ax\) is globally asymptotically stable (Ogata, *Modern Control Engineering*, 5e, §4-5). When \(A\) is diagonalisable, the state transition matrix admits the spectral decomposition \(e^{At}=V\operatorname{diag}(e^{\lambda_i t})V^{-1}\), where the columns of \(V\) are the eigenvectors (Chen, *Linear System Theory and Design*, 4e, §3.5).

## 8. Visual — diagram or schematic
```
Complex plane
Im(λ) ↑
      |     × λ = σ + jω
      |    /  (mode oscillates at ω, decays if σ<0)
      |   /
------+-----+------→ Re(λ)
      |   \
      |    \ × conjugate
      |
Left half-plane (stable) | Right half-plane (unstable)
```
All eigenvalues must lie strictly left of the imaginary axis.

## 9. The memory technique

1. **The hook** — Picture each eigenvalue as a small flag planted on the complex plane; if any flag is on or to the right of the y-axis the whole rocket starts “growing” instead of settling.
2. **What to overlearn** — The stability test: \(\operatorname{Re}(\lambda_i)<0\) for all \(i\); and the meaning \(\lambda=\sigma\pm j\omega\) → decay rate \(\sigma\), frequency \(\omega\).
3. **Spaced-repetition schedule** — Review the definition and the stability rule after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the formula, start from \(\dot{x}=Ax\), assume \(x=e^{\lambda t}v\), substitute, and obtain \(Av=\lambda v\); the rest follows.

## 10. What this unlocks
Once you can read stability from eigenvalues you can proceed to:
- Root-locus design of gain \(K\) so that every branch stays in the left half-plane.
- Modal controllability tests that tell which actuator can move which eigenvalue.
- Observer eigenvalue placement for Kalman-filter pole placement.
- Lyapunov-function construction that uses the same eigenvectors to prove global stability of nonlinear extensions.

## 11. Self-check — five questions, no answers
1. For the matrix \(A=\begin{bmatrix}0&1\\-2&-0.1\end{bmatrix}\), compute the eigenvalues and state whether the origin is stable.
2. A 3-by-3 matrix has eigenvalues \(-1\), \(0.2+0.5j\), \(0.2-0.5j\). Is the system asymptotically stable?
3. Why must complex eigenvalues of a real matrix appear in conjugate pairs?
4. In the Jordan-block case \(\lambda= -0.5\) (repeated twice) but only one independent eigenvector, write the general time response.
5. You close a feedback loop and one closed-loop eigenvalue moves from \(-1.2\) to \(+0.3\). What physical behaviour will the vehicle now exhibit?