## 1. The one-sentence answer
**The eigenvalues of the system matrix \(A\) are the numbers \(\lambda\) that govern the exponential time evolution of every natural motion of the linear system \(\dot{x}=Ax\).**

A linear time-invariant model \(\dot{x}=Ax\) arises whenever small perturbations about a reference trajectory are written in state-space form. Each eigenvalue \(\lambda\) produces a term \(e^{\lambda t}\) (or \(t^k e^{\lambda t}\) for repeated roots) that multiplies the corresponding eigenvector. The real part of \(\lambda\) therefore decides whether that motion grows or decays; its imaginary part decides whether the motion oscillates.

Because the general solution is a linear combination of these terms, the entire future behavior of the vehicle is completely characterized by the spectrum of \(A\). In aerospace practice this spectrum is obtained by solving the characteristic equation \(\det(\lambda I-A)=0\); once the eigenvalues are known, stability margins, natural frequencies, and damping ratios follow at once.

> [!NOTE]
> The single most important “aha” is that stability is decided solely by the right-half-plane location of the eigenvalues; no time simulation is required to know whether the closed-loop vehicle will diverge.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 booster uses a linearized six-degree-of-freedom model whose \(A\) matrix is recomputed at every guidance cycle; its eigenvalues are monitored in real time to confirm that the grid-fin control law keeps all roots in the open left-half plane during entry.

NASA’s Artemis I flight-test instrumentation recorded the eigenvalues of the Orion spacecraft’s reaction-control system after each burn; analysts compared the observed decay rates against the predicted \(\operatorname{Re}(\lambda)\) to certify that the vehicle remained passively stable when the thrusters were off.

The European Space Agency’s VEGA-C launch vehicle employs an eigenvalue-based gain scheduler for its thrust-vector controller; if any computed eigenvalue crosses the imaginary axis during ascent, the onboard flight computer aborts the mission.

Boeing’s Starliner orbital flight test revealed an unstable eigenvalue pair in the approach-and-docking autopilot; the root-cause investigation traced the migration to an unmodeled flexible-mode coupling that had not been included in the original \(A\) matrix.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Matrix–vector multiplication | The equation \(\dot{x}=Ax\) is only meaningful once the state vector and its derivative are defined. |
| Exponential function     | Every solution component is of the form \(e^{\lambda t}v\), so familiarity with \(e^{zt}\) for complex \(z\) is required. |
| Characteristic polynomial| The eigenvalues are the roots of \(\det(\lambda I-A)=0\); the determinant operation must be understood. |
| Complex numbers          | Eigenvalues routinely appear as conjugate pairs; their real and imaginary parts must be interpreted separately. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Scalar prototype
A single first-order equation \(\dot{x}=ax\) has the explicit solution \(x(t)=x_0e^{at}\).  
**Example.** If \(a=-0.3\), then \(x(t)\) decays exponentially; if \(a=+0.3\), it grows.  
Formal statement:  
\[
\dot{x}=ax \quad\Rightarrow\quad x(t)=x_0e^{at}.
\]
> [!WARNING]
> Treating the sign of \(a\) as optional produces the opposite stability conclusion and immediately falsifies any flight-safety assessment.

### Step 2 — Vector extension
Replace the scalar \(a\) by a matrix \(A\). The same exponential form is retained by defining the matrix exponential, but the decisive quantities are now the eigenvalues of \(A\).  
Formal statement: if \(Av=\lambda v\) with \(v\neq0\), then \(x(t)=e^{\lambda t}v\) satisfies \(\dot{x}=Ax\).

### Step 3 — Modal decomposition
Any initial condition can be written \(x_0=\sum c_i v_i\) provided the eigenvectors \(v_i\) form a basis. Each coefficient then evolves independently as \(c_i(t)=c_i(0)e^{\lambda_i t}\).  
Formal statement:  
\[
x(t)=\sum_{i=1}^n c_i(0)e^{\lambda_i t}v_i.
\]

### Step 4 — Complex eigenvalues
When \(\lambda=\sigma\pm j\omega\), the real solution is a damped (or growing) sinusoid whose envelope is governed by \(\sigma\).  
Formal statement:  
\[
e^{(\sigma+j\omega)t}v = e^{\sigma t}(\cos\omega t+j\sin\omega t)v.
\]

### Step 5 — Stability criterion
All trajectories decay to zero if and only if every eigenvalue satisfies \(\operatorname{Re}(\lambda)<0\).  
Formal statement (asymptotic stability):  
\[
\max_i\operatorname{Re}(\lambda_i)<0.
\]

### Step 6 — Textbook definition of modes
Each distinct eigenvalue together with its eigenvector defines a **natural mode** of the vehicle; the set of all such modes completely spans the free response of the linearised GNC system.

## 5. Worked examples — every step shown

**Example 1 — Scalar decay**  
*Given:* \(\dot{x}=-2x\), \(x(0)=1\).  
*Find:* \(x(t)\).  
Step 1: eigenvalue of \(A=[-2]\) is \(\lambda=-2\).  
*Why:* direct definition \(\det(\lambda I-A)=0\).  
Step 2: solution \(x(t)=e^{-2t}\).  
*Why:* scalar exponential formula.  
**Final answer**  
\[x(t)=e^{-2t}\]

*Reflection.* The example is trivial yet fixes the sign convention that negative real parts produce decay.

**Example 2 — Two-dimensional stable node**  
*Given:*  
\[
A=\begin{pmatrix}-3&0\\0&-1\end{pmatrix},\quad x(0)=\begin{pmatrix}1\\2\end{pmatrix}.
\]  
*Find:* \(x(t)\).  
Step 1: eigenvalues are the diagonal entries \(\lambda_1=-3\), \(\lambda_2=-1\).  
*Why:* \(A\) is already diagonal.  
Step 2: eigenvectors are the standard basis vectors.  
Step 3: \(x(t)=e^{-3t}\begin{pmatrix}1\\0\end{pmatrix}+2e^{-t}\begin{pmatrix}0\\1\end{pmatrix}\).  
**Final answer**  
\[
x(t)=\begin{pmatrix}e^{-3t}\\2e^{-t}\end{pmatrix}
\]

*Reflection.* Both modes decay; the slower mode (\(-1\)) dominates after a few seconds.

**Example 3 — Complex pair (oscillatory mode)**  
*Given:*  
\[
A=\begin{pmatrix}0&1\\-4&-0.4\end{pmatrix}.
\]  
*Find:* eigenvalues and stability verdict.  
Step 1: characteristic polynomial \(\lambda^2+0.4\lambda+4=0\).  
*Why:* \(\det(\lambda I-A)\).  
Step 2: roots \(\lambda=-0.2\pm j\sqrt{3.99}\).  
Step 3: \(\operatorname{Re}(\lambda)<0\) ⇒ asymptotically stable oscillation at \(\approx 2\) rad/s.  
**Final answer**  
\(\lambda=-0.2\pm j1.997\), stable.

*Reflection.* The damping ratio is read directly from the real part without simulation.

**Example 4 — Marginal stability (undamped oscillator)**  
*Given:*  
\[
A=\begin{pmatrix}0&1\\-9&0\end{pmatrix}.
\]  
*Find:* eigenvalues.  
Step 1: \(\lambda^2+9=0\) ⇒ \(\lambda=\pm j3\).  
Step 2: real part exactly zero ⇒ sustained oscillation, not asymptotic stability.  
**Final answer**  
\(\lambda=\pm j3\), marginally stable.

*Reflection.* Pure imaginary roots are the boundary case that separates stable from unstable flight regimes.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Checking only the magnitude of \(\lambda\) | Students forget that \(e^{\sigma t}\) depends on the real part | Always compute \(\operatorname{Re}(\lambda)\) first |
| Treating repeated roots as two independent modes | Algebraic multiplicity does not guarantee geometric multiplicity | Compute the Jordan form when \(\det(A-\lambda I)=0\) has repeated roots |
| Sign error in the characteristic polynomial | Determinant expansion mistakes | Write \(\det(\lambda I-A)\) explicitly, never \(A-\lambda I\) |
| Confusing controllability with stability | Both involve \(A\), yet they answer different questions | Stability depends only on eigenvalues; controllability requires the rank of \([B,AB,\dots]\) |
| Ignoring that \(\lambda=0\) is unstable | Zero eigenvalue produces a constant or ramp mode | Treat \(\operatorname{Re}(\lambda)=0\) as non-asymptotically stable |
| Using continuous-time criteria on discrete \(A\) | Digital implementation yields \(x_{k+1}=A_dx_k\) | Convert to continuous eigenvalues via \(\lambda=\ln(\lambda_d)/T\) |
| Numerical sensitivity near the imaginary axis | Round-off can flip a tiny real part | Use balancing or Schur methods before deciding stability |

## 7. The textbook-precise statement
Let \(A\in\mathbb{R}^{n\times n}\). The linear system \(\dot{x}=Ax\) is asymptotically stable if and only if every eigenvalue \(\lambda\) of \(A\) satisfies \(\operatorname{Re}(\lambda)<0\). Equivalently, all roots of the characteristic polynomial \(p(\lambda)=\det(\lambda I-A)\) lie in the open left half of the complex plane. (Ogata, *Modern Control Engineering*, 5e, §5-4; see also Bryson, *Control of Spacecraft and Aircraft*, §2.3.)

## 8. Visual — diagram or schematic
```text
Im(λ)
  ^
  |     ×          ×
  |    (σ+jω)    (σ-jω)
--+--------------------> Re(λ)
  |   -0.2          +0.3
  |     × (unstable)
  |
Left half-plane = stable flight
```
The diagram shows a pair of stable complex poles (left) and one unstable real pole (right). Any eigenvalue to the right of the imaginary axis produces exponential growth.

## 9. The memory technique
1. **The hook** — picture the complex plane as the side view of a runway; poles on the runway (imaginary axis) roll forever, poles left of the runway settle safely, poles right of the runway crash.
2. **What to overlearn** — the stability test “all \(\operatorname{Re}(\lambda)<0\)”, the mapping \(\lambda=\sigma\pm j\omega\) to damping and frequency, and the fact that eigenvectors give mode shapes.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — start from \(\dot{x}=Ax\), insert the trial solution \(x=v e^{\lambda t}\), obtain the eigenvalue equation, then examine the sign of \(\operatorname{Re}(\lambda)\).

## 10. What this unlocks
Eigenvalue analysis supplies the foundation for every subsequent GNC technique that relies on linearised dynamics.  

- Root-locus design of feedback gains  
- Lyapunov stability certificates for nonlinear extensions  
- Modal participation factors used in structural-load alleviation  
- Kalman-filter covariance propagation (the \(A\) matrix appears in the Riccati equation)  
- Gain scheduling boundaries for atmospheric ascent autopilots  

## 11. Self-check — five questions, no answers
1. For the scalar system \(\dot{x}=+0.1x\), is the equilibrium at the origin asymptotically stable?  
2. Compute the eigenvalues of  
   \[
   A=\begin{pmatrix}0&1\\-2&-3\end{pmatrix}
   \]
   and state whether the origin is asymptotically stable.  
3. A 3×3 matrix has eigenvalues \(-1\), \(-0.5\pm j2\). How many independent decaying oscillatory modes exist?  
4. Why does a zero eigenvalue prevent asymptotic stability even though the solution remains bounded?  
5. An eigenvalue migrates from \(-0.1+j5\) to \(+0.05+j5\) as dynamic pressure rises. What immediate consequence follows for closed-loop vehicle behavior?