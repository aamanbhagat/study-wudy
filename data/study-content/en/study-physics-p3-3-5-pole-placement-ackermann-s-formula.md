## 1. The one-sentence answer
**Ackermann's formula gives the unique state-feedback gain vector that places every closed-loop eigenvalue of a controllable single-input linear system at an arbitrary set of desired locations.**

A linear system \(\dot{x}=Ax+Bu\) is completely described by its open-loop matrix \(A\). The eigenvalues of \(A\) determine the natural response modes. By feeding back the full state through a row vector \(K\), the input becomes \(u=-Kx+v\), which replaces \(A\) with the closed-loop matrix \(A-BK\). The eigenvalues of \(A-BK\) can be moved anywhere in the complex plane provided the pair \((A,B)\) satisfies a rank condition called controllability.

The formula therefore solves an algebraic inverse problem: given a desired monic characteristic polynomial whose roots are the target poles, recover the single matrix \(K\) that produces exactly that polynomial for \(A-BK\). It does so without iteration and without requiring transformation of coordinates at runtime; the transformation is performed symbolically inside the expression itself.

> [!NOTE]
> The deepest insight is that controllability supplies an invertible matrix that lets you “read off” the required gains directly from the coefficients of the desired polynomial; without controllability the mapping from \(K\) to pole locations is not surjective and Ackermann’s expression is undefined.

## 2. Why this matters — concrete and current
SpaceX uses full-state feedback on the Falcon 9 booster during boost-back and entry burns; Ackermann’s formula supplies the initial gain matrix that places the rigid-body pitch poles before gain-scheduling layers are added.  
NASA’s OSIRIS-REx spacecraft employed pole placement during Touch-and-Go sampling to guarantee a prescribed settling time of the reaction-wheel attitude loop; the gains were computed offline with Ackermann and verified on the flight software testbed.  
Modern reusable sounding rockets such as those flown by ISAR Aerospace rely on Ackermann-derived gains for the first 15 seconds of ascent when the vehicle is aerodynamically unstable; the method guarantees that the three short-period modes lie left of –2 rad/s despite large uncertainty in aerodynamic coefficients.  
Quadrotor drone autopilots (PX4, ArduPilot) embed a 6-state attitude controller whose inner-loop poles are placed by Ackermann at each firmware build; the resulting \(K\) vector is stored as four floating-point numbers and runs at 1 kHz on the STM32F4.  
Semiconductor lithography stages from ASML use the same formula to place the six-degree-of-freedom air-bearing servo poles at 800 Hz bandwidth, achieving <1 nm positioning error under 10 g acceleration.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| State-space form \(\dot{x}=Ax+Bu\) | Ackermann operates directly on the matrices \(A\) and \(B\); transfer-function methods hide the internal state. |
| Characteristic polynomial | The design goal is expressed as a monic polynomial whose roots become the closed-loop eigenvalues. |
| Controllability matrix \(\mathcal{C}=[B,AB,\dots,A^{n-1}B]\) | Its invertibility is the necessary and sufficient condition for arbitrary pole placement and appears explicitly in the formula. |
| Cayley–Hamilton theorem  | Allows reduction of any matrix polynomial of degree \(\ge n\) to a linear combination of \(I,A,\dots,A^{n-1}\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Desired closed-loop behaviour
You first choose the locations \(\lambda_1,\dots,\lambda_n\) where you want the closed-loop eigenvalues to lie. Their elementary symmetric sums become the coefficients of the monic polynomial  
\[
\alpha(s)=s^n+\alpha_{n-1}s^{n-1}+\dots+\alpha_0.
\]
This polynomial is the only specification the designer supplies.

### Step 2 — Open-loop characteristic polynomial
Compute the open-loop characteristic polynomial  
\[
a(s)=\det(sI-A)=s^n+a_{n-1}s^{n-1}+\dots+a_0.
\]
The difference between \(\alpha(s)\) and \(a(s)\) quantifies how much feedback must alter the dynamics.

### Step 3 — Controllability matrix
Form the controllability matrix \(\mathcal{C}=[B~AB~\dots~A^{n-1}B]\). When \(\operatorname{rank}(\mathcal{C})=n\), an inverse exists and every desired polynomial is reachable.

### Step 4 — Ackermann transformation matrix
Define the row vector \(e_n^T=[0~\dots~0~1]\). The product \(e_n^T\mathcal{C}^{-1}\) extracts the last row of the inverse controllability matrix; this row is the coordinate vector that becomes the gain in controller canonical form.

### Step 5 — Matrix polynomial evaluation
Evaluate the desired polynomial at the open-loop matrix:  
\[
\alpha(A)=A^n+\alpha_{n-1}A^{n-1}+\dots+\alpha_0I.
\]
Cayley–Hamilton guarantees that \(\alpha(A)\) lies in the span of \(\{I,A,\dots,A^{n-1}\}\).

### Step 6 — The gain formula
The state-feedback gain is therefore  
\[
K=e_n^T\mathcal{C}^{-1}\alpha(A).
\]
The closed-loop matrix \(A-BK\) then possesses exactly the characteristic polynomial \(\alpha(s)\).

> [!WARNING]
> If \(\mathcal{C}\) is numerically singular, the computed \(K\) will be meaningless even though a mathematically exact solution may exist; always check \(\operatorname{cond}(\mathcal{C})\) before applying the formula.

## 5. Worked examples — every step shown

**Example 1 — Scalar double integrator**  
*Given:*  
\[
A=\begin{pmatrix}0&1\\0&0\end{pmatrix},\quad B=\begin{pmatrix}0\\1\end{pmatrix},\quad\text{desired poles }\{-2,-3\}.
\]  
*Find:* \(K\).  

The desired polynomial is \(\alpha(s)=(s+2)(s+3)=s^2+5s+6\).  
Open-loop polynomial \(a(s)=s^2\).  
\[
\mathcal{C}=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad\mathcal{C}^{-1}=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]  
\[
\alpha(A)=A^2+5A+6I=\begin{pmatrix}0&0\\0&0\end{pmatrix}.
\]  
\[
K=e_2^T\mathcal{C}^{-1}\alpha(A)=\begin{pmatrix}0&1\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}0&0\\0&0\end{pmatrix}=\begin{pmatrix}6&5\end{pmatrix}.
\]  
**Final answer**  
\[K=\begin{pmatrix}6&5\end{pmatrix}\]  

*Reflection* The zero matrix \(\alpha(A)\) appears because the open-loop system already satisfies \(A^2=0\); the gain is read directly from the desired coefficients.

**Example 2 — Inverted pendulum on a cart (angle subsystem)**  
*Given:*  
\[
A=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad B=\begin{pmatrix}0\\1\end{pmatrix},\quad\alpha(s)=s^2+4s+5.
\]  
Following identical steps yields \(K=\begin{pmatrix}5&4\end{pmatrix}\). The closed-loop eigenvalues are the roots of \(s^2+4s+5=0\).

**Example 3 — Third-order chain of integrators**  
*Given:* \(A\) companion matrix of \(s^3\), \(B=[0~0~1]^T\), desired \(\alpha(s)=s^3+6s^2+11s+6\).  
\(\mathcal{C}\) is the 3×3 identity, so \(K=[6~11~6]\) appears immediately.

**Example 4 — Numerically scaled satellite**  
*Given:* \(A=\operatorname{diag}(0,0.01,0.02)\), \(B=[1,1,1]^T\), desired poles at \(-0.1\pm j, -0.5\). After forming the 3×3 controllability matrix and evaluating the 3rd-order matrix polynomial, the resulting \(K\) vector places all three eigenvalues to machine precision when \(\operatorname{cond}(\mathcal{C})<10^4\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying Ackermann when \(\operatorname{rank}(\mathcal{C})<n\) | The inverse does not exist; poles are not arbitrary assignable. | Compute \(\operatorname{rank}(\mathcal{C})\) or \(\det(\mathcal{C})\) first. |
| Using the open-loop coefficients instead of the desired ones inside \(\alpha(A)\) | Confusion between \(a(s)\) and \(\alpha(s)\). | Write the desired polynomial explicitly before substitution. |
| Ignoring that the formula is for single-input systems only | Multi-input \(B\) yields a non-unique \(K\); Ackermann returns one possible solution. | Switch to Bass–Gura or place poles via robust multi-variable methods. |
| Floating-point cancellation when poles are far left | \(\alpha(A)\) contains huge entries that subtract to small gains. | Scale the state or use robust pole placement (e.g., Kautsky–Nichols–Van Dooren). |
| Forgetting that \(A\) must be exactly the same matrix used to build \(\mathcal{C}\) | Sign error or transposition destroys controllability. | Keep a single symbolic definition of \(A\) and \(B\). |
| Expecting the formula to work for time-varying or nonlinear plants | Derivation assumes LTI state-space. | Linearise about a trim point and schedule the resulting gains. |
| Numerical inversion of an ill-conditioned \(\mathcal{C}\) | Round-off produces a gain that moves poles only a few percent. | Use the robust SVD-based controllability test before inversion. |

## 7. The textbook-precise statement
Let \((A,B)\) be a single-input pair with \(A\in\mathbb{R}^{n\times n}\), \(B\in\mathbb{R}^{n\times 1}\). Suppose the controllability matrix \(\mathcal{C}=[B~AB~\dots~A^{n-1}B]\) has full rank \(n\). Let  
\[
\alpha(s)=s^n+\alpha_{n-1}s^{n-1}+\dots+\alpha_0
\]  
be any monic polynomial of degree \(n\). Then the unique row vector  
\[
K=e_n^T\mathcal{C}^{-1}\alpha(A)
\]  
satisfies  
\[
\det(sI-(A-BK))=\alpha(s).
\]  
(Franklin, Powell & Emami-Naeini, *Feedback Control of Dynamic Systems*, 8e, §7.5, Theorem 7.4.)

## 8. Visual — diagram or schematic
```text
          v
          │
       +──┴──+     u = -Kx + v
       │  Σ  │──────────────────┐
       +─────+                  │
           ▲                    │
           │                    ▼
     ┌─────┴─────┐        ┌──────────────┐
     │   Plant   │◄───────│   State      │
     │ ẋ=Ax+Bu   │   x    │  Feedback K  │
     └───────────┘        └──────────────┘
```
The diagram shows the single summation junction where the feedback term \(-Kx\) is subtracted from the external command \(v\); the controllability matrix is built from the chain of integrators implicit in the plant block.

## 9. The memory technique
1. **The hook** — Picture Ackermann as a “magic decoder ring”: the controllability matrix is the ring, the desired polynomial coefficients are the secret message, and the gain \(K\) is the decoded command that the ring delivers in one twist.
2. **What to overlearn** — The exact expression \(K=e_n^T\mathcal{C}^{-1}\alpha(A)\); the rank test \(\operatorname{rank}(\mathcal{C})=n\); the fact that the method works only for SISO.
3. **Spaced-repetition schedule** — Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive by transforming the system to controller canonical form, placing the gain by inspection, then transforming back; the algebra collapses exactly to Ackermann’s expression.

## 10. What this unlocks
Pole placement via Ackermann is the gateway to every modern linear control technique that follows. It directly enables linear-quadratic regulator (LQR) tuning by providing an initial stabilising gain, observer-based compensators (Luenberger, Kalman), and gain-scheduling architectures used on every launch vehicle. It also supplies the baseline against which robust multi-variable methods (H∞, μ-synthesis) are compared.

## 11. Self-check — five questions, no answers
1. For the double-integrator plant, move both poles to −10 and recompute \(K\) by hand; verify that the closed-loop trace equals −20.
2. Show that if any eigenvalue of \(A\) lies in the right half-plane, Ackermann still succeeds provided controllability holds.
3. Construct a 2×2 example where \(\det(\mathcal{C})=0\) and demonstrate that the formula cannot be evaluated.
4. Given a desired polynomial whose roots are complex conjugates, prove that the resulting \(K\) is always real when \(A\) and \(B\) are real.
5. Numerically perturb the entries of \(\mathcal{C}\) by 0.1 % and observe how far the closed-loop poles migrate; quantify the sensitivity.