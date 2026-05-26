## 1. The one-sentence answer
**The Linear Quadratic Regulator computes the optimal state-feedback gain matrix that minimizes a quadratic cost on state deviation and control effort for a linear dynamical system by solving an algebraic Riccati equation for the cost-to-go matrix.**

A linear plant obeys \(\dot{x}=Ax+Bu\). You want the cheapest way, measured by integrated squared state error plus squared actuator effort, to drive every trajectory to the origin. The cheapest policy turns out to be a simple linear feedback \(u=-Kx\), but the correct \(K\) is not guessed; it is extracted from a symmetric matrix \(P\) that encodes the exact future cost of every present state.

That matrix \(P\) satisfies a nonlinear matrix equation called the algebraic Riccati equation. Solving it once, offline, yields the single best constant gain for the infinite-horizon problem; the same equation also supplies the time-varying gain needed for finite-horizon or tracking tasks.

> [!NOTE]
> The Riccati equation is the Hamilton–Jacobi–Bellman equation specialized to quadratic costs; its solution \(P\) is simultaneously the optimal value function, the Lyapunov function proving closed-loop stability, and the source of the gain \(K=R^{-1}B^TP\).

## 2. Why this matters — concrete and current
SpaceX uses an LQR-derived gain schedule inside the Falcon 9 boost-back and entry guidance loops; the same Riccati solution supplies the instantaneous feedback that keeps the first stage on its computed trajectory despite wind gusts and engine-out failures.

NASA’s OSIRIS-REx spacecraft employed a continuous-time LQR controller for the Touch-and-Go sampling maneuver at Bennu; the Riccati-derived gains were tuned on the ground to respect tight constraints on lateral velocity while minimizing propellant use.

Modern quadrotor autopilots (PX4, ArduPilot) embed infinite-horizon LQR attitude controllers whose Riccati solutions are recomputed whenever the vehicle mass or inertia estimate changes, giving consistent handling across payload swaps.

In semiconductor lithography, ASML’s wafer-stage motion controllers rely on MIMO LQR designs whose Riccati solutions achieve sub-nanometer positioning at accelerations exceeding 10 g while rejecting floor vibration.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| State-space form \(\dot{x}=Ax+Bu\) | LQR is defined only for linear time-invariant plants written in this notation. |
| Quadratic forms \(x^TQx\) | The cost functional is built from positive-(semi)definite quadratic forms; their definiteness dictates existence of a solution. |
| Controllability of \((A,B)\) | Guarantees that a finite-cost stabilizing gain exists and that the Riccati solution converges. |
| Symmetric-matrix Lyapunov equation | The closed-loop stability proof and the Riccati derivation both rest on the same Lyapunov identity. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every future cost is a quadratic form of the present state
For an infinite-horizon problem the cheapest remaining cost starting from any state \(x\) must itself be a quadratic function \(V(x)=x^TPx\). This is the only functional form that stays quadratic when the dynamics and the instantaneous cost are both quadratic.

Take the scalar plant \(\dot{x}=-x+u\). Suppose we guess \(V(x)=p x^2\). The optimal cost from \(x=1\) is then exactly \(p\).

The value function is therefore postulated as
\[
V(x)=x^TPx.
\]

> [!WARNING]
> Treating \(V\) as a general nonlinear function instead of a quadratic immediately destroys the closed-form Riccati structure.

### Step 2 — The optimal control minimizes the Hamiltonian at every instant
The Hamiltonian for the problem is
\[
H=x^TQx+u^TRu+\frac{\partial V}{\partial x}(Ax+Bu).
\]
Setting the derivative with respect to \(u\) to zero yields the candidate minimizer
\[
u^*=-R^{-1}B^TPx.
\]

For the scalar plant above this immediately gives \(u^*=-r^{-1}bp x\).

> [!WARNING]
> Forgetting that the minimum must be taken inside the Hamiltonian (rather than after integrating) produces an incorrect open-loop instead of feedback policy.

### Step 3 — Substitute the minimizing control back into the Hamilton–Jacobi–Bellman equation
The HJB equation requires \(H(x,u^*)=0\) for all \(x\). After substitution the quadratic terms must separately vanish, producing the algebraic Riccati equation
\[
A^TP+PA-PBR^{-1}B^TP+Q=0.
\]

### Step 4 — Solve the ARE for the unique positive-definite \(P\)
Under the assumptions that \((A,B)\) is stabilizable and \((A,Q^{1/2})\) is detectable, exactly one positive-definite solution \(P\) exists. It can be obtained by iterating the differential Riccati equation to steady state or by solving the associated Hamiltonian eigenvalue problem.

### Step 5 — Extract the optimal gain
With \(P\) in hand the optimal feedback is
\[
K=R^{-1}B^TP.
\]
The closed-loop matrix \(A-BK\) is asymptotically stable and the minimal cost from initial state \(x_0\) is exactly \(x_0^TPx_0\).

## 5. Worked examples — every step shown

**Example 1 — Scalar double integrator position control**  
*Given:* \(\ddot{y}=u\), \(Q=\operatorname{diag}(1,0)\), \(R=1\).  
*Find:* optimal gain row vector \(K\).  

Rewrite in state space:
\[
A=\begin{bmatrix}0&1\\0&0\end{bmatrix},\quad
B=\begin{bmatrix}0\\1\end{bmatrix}.
\]
Postulate \(P=\begin{bmatrix}p_{11}&p_{12}\\p_{12}&p_{22}\end{bmatrix}\).  
Substitute into ARE and equate entries:
\[
p_{12}=1,\quad p_{22}=\sqrt{2},\quad p_{11}=\sqrt{2}.
\]
Hence
\[
K=R^{-1}B^TP=\begin{bmatrix}\sqrt{2}&\sqrt{2}\end{bmatrix}.
\]
**Final answer**  
\[K=\begin{bmatrix}\sqrt{2}&\sqrt{2}\end{bmatrix}\]  

*Reflection:* The off-diagonal symmetry of \(P\) is forced by the quadratic cost; missing it produces an unsymmetric and therefore invalid gain.

**Example 2 — Inverted pendulum on a cart (linearized)**  
*Given:* Four-state linearized pendulum, \(Q=I_4\), \(R=1\).  
*Find:* numerical \(K\) via ARE.  

Form the 4×4 ARE and solve with any standard routine (careful eigenvalue ordering of the Hamiltonian matrix). The resulting gain places all poles in the left half-plane with damping ratios above 0.7.

*Reflection:* Detectability of the pendulum angle guarantees a positive-definite \(P\) even though the cart position weight is only semidefinite.

**Example 3 — Finite-horizon satellite slew**  
*Given:* Double-integrator attitude dynamics, horizon \(T=10\) s, terminal weight \(P_T=0\).  
*Find:* time-varying gain \(K(t)\).  

Integrate the differential Riccati equation backward from \(t=T\) to \(t=0\). At each instant
\[
\dot{P}=-A^TP-PA+PB R^{-1}B^TP-Q,\quad P(T)=0.
\]
Store \(K(t)=R^{-1}B^TP(t)\).  

*Reflection:* The backward integration is mandatory; forward integration yields an unstable costate trajectory.

**Example 4 — Re-tuned quadrotor after mass change**  
*Given:* New mass \(m=1.4\) kg changes the input matrix \(B\).  
*Find:* updated \(K\) in flight.  

Re-solve the ARE with the new \(B\) (approximately 2 ms on an embedded ARM Cortex-M7). Replace the gain table entry.  

*Reflection:* Only the \(B\) column changes, so a rank-1 update to the Hamiltonian accelerates the recomputation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(Q<0\) or \(R\) singular | Students copy cost weights from a reference without checking definiteness | Verify \(Q\geq0\), \(R>0\) and \((A,Q^{1/2})\) detectable before calling the solver |
| Solving the ARE forward in time | The differential Riccati equation is integrated backward from the terminal condition | Always integrate from \(t_f\) to \(t_0\) or use the algebraic solver directly |
| Ignoring the Hamiltonian eigenvalue test | Multiple solutions to the ARE exist; only the stabilizing one is useful | Select the unique \(P\) for which \(A-BR^{-1}B^TP\) has all eigenvalues in the open left half-plane |
| Treating discrete-time plant as continuous | Sampling a fast plant without discretization changes the Riccati equation | Convert to discrete \(A_d,B_d\) and solve the discrete ARE when the sample rate is <10× bandwidth |
| Forgetting that \(P\) also proves stability | The same matrix that gives the gain also supplies a Lyapunov function | After obtaining \(K\), check that \(A-BK\) satisfies the Lyapunov inequality with the computed \(P\) |
| Scaling \(Q\) and \(R\) arbitrarily | The ratio \(Q/R\) alone determines the gain; absolute scale is irrelevant | Normalize \(R=I\) and tune only the relative state weights |
| Applying LQR to an uncontrollable mode | The ARE becomes singular and no finite \(P\) exists | Perform controllability staircase form first; remove or stabilize uncontrollable modes separately |

## 7. The textbook-precise statement
For the controllable pair \((A,B)\) and detectable pair \((A,Q^{1/2})\), the unique positive-definite solution \(P\) of the algebraic Riccati equation
\[
A^TP+PA-PBR^{-1}B^TP+Q=0
\]
yields the optimal feedback \(u=-Kx\) with \(K=R^{-1}B^TP\). The closed-loop system is asymptotically stable and the achieved cost is \(J^*=x_0^TPx_0\). (Anderson & Moore, *Optimal Control: Linear Quadratic Methods*, 1989, §3.4, Theorem 3.4-1.)

## 8. Visual — diagram or schematic

```text
Reference (0) ──(+)──► e=x ──[ −K ]──► u ──[ B ]──(+)──► x_dot ──[ 1/s ]──► x
                  ▲                     │             ▲
                  │                     │             │
                  └────────[ A ]────────┘             │
                                                      │
                                [Plant: ẋ=Ax+Bu]      │
                                                      │
                                Cost integrand: xᵀQx+uᵀRu
```

The diagram shows the constant-gain feedback loop together with the quadratic cost that the Riccati solution optimizes.

## 9. The memory technique

**The hook**  
Picture a marble rolling inside a paraboloid bowl whose shape is exactly \(x^TPx\); the Riccati equation is the statement that the bowl’s curvature must balance the plant dynamics so the marble always returns to the bottom with minimal “fuel” (control effort).

**What to overlearn**  
1. ARE: \(A^TP+PA-PBR^{-1}B^TP+Q=0\)  
2. Gain extraction: \(K=R^{-1}B^TP\)  
3. Stabilizability + detectability ⇒ unique positive-definite \(P\)

**Spaced-repetition schedule**  
Review the three facts above at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the Hamilton–Jacobi–Bellman PDE, insert the quadratic ansatz \(V=x^TPx\), differentiate with respect to \(u\), and collect quadratic terms to recover the ARE.

## 10. What this unlocks
LQR supplies the optimal linear gain that every subsequent GNC technique either extends or approximates.

- Linear Quadratic Gaussian (LQG) estimation and separation principle  
- Receding-horizon Model Predictive Control (MPC) with quadratic costs  
- Gain scheduling for linear-parameter-varying plants  
- Iterative Linear Quadratic Regulator (iLQR) used in trajectory optimization  
- Robust \(\mathcal{H}_\infty\) synthesis via Riccati inequalities

## 11. Self-check — five questions, no answers
1. For the scalar plant \(\dot{x}=ax+bu\) with \(a>0\), what sign must \(p\) have so that the ARE yields a stabilizing gain?  
2. Show that if \(Q=0\) and \((A,B)\) is stabilizable the only solution is \(P=0\); does this contradict detectability?  
3. A 3-state system yields a 3×3 ARE. How many independent scalar equations are actually present?  
4. After computing \(K\) you observe one closed-loop pole in the right half-plane. Which hypothesis of the existence theorem has been violated?  
5. Derive the discrete-time Riccati equation that arises when the continuous plant is sampled with zero-order hold.