## 1. The one-sentence answer
**The controllability matrix rank test states that a linear time-invariant system is fully state-controllable if and only if the matrix formed by stacking the input matrix and its successive multiplications by the system matrix has full row rank equal to the state dimension.**

A controllable system lets you drive every component of the state vector from any initial value to any desired final value in finite time by choosing an appropriate input. The test converts this physical requirement into a single algebraic check on matrices that are already present in the state-space description. When the rank falls short, at least one linear combination of states remains unreachable no matter what control effort is applied; the unreachable direction is invisible to the actuators through every possible chain of dynamics.

The rank condition therefore supplies both a yes/no answer and a diagnostic: the dimension of the column space of the controllability matrix equals the dimension of the controllable subspace. In aerospace vehicles this immediately reveals whether a chosen set of thrusters or control surfaces can independently regulate every attitude, rate, and velocity mode.

> [!NOTE]
> The test is decisive precisely because it is coordinate-independent; any similarity transformation leaves the rank unchanged, so the conclusion survives changes of units or choice of body axes.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 booster performs a boost-back burn followed by an entry burn and a landing burn; the six-degree-of-freedom rigid-body model must be controllable in all six axes using only gimbaled engines and grid fins. Engineers verify controllability of the linearized pitch-plane dynamics at each Mach number before uploading the gain schedule.

NASA’s OSIRIS-REx spacecraft used reaction-control jets to execute a touch-and-go sample collection at Bennu; the 12-state attitude-plus-rate model was checked for controllability after each thruster failure scenario so that safe abort trajectories remained reachable.

Modern launch-vehicle autoland algorithms, such as those demonstrated on Rocket Lab’s Electron first stage, linearize the trajectory-tracking error dynamics about a reference path and apply the rank test to confirm that differential thrust and aerodynamic surfaces can null both position and velocity errors before touchdown.

In semiconductor lithography stages, six-axis magnetically levitated reticle stages must be controllable to nanometer precision; the same rank test on the 12-state electromechanical model certifies that the eight voice-coil actuators span all rigid-body modes before the controller is commissioned.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| State-space form \(\dot{x}=Ax+Bu\) | Supplies the matrices \(A\) and \(B\) that enter the controllability matrix |
| Matrix rank and column space | The numerical test that decides controllability           |
| Linear independence      | Determines whether the reachable directions are distinct  |
| Cayley–Hamilton theorem  | Guarantees that powers of \(A\) beyond \(n-1\) are redundant, fixing the size of the matrix |

## 4. Building the idea — from intuition to formalism

### Step 1 — Reachability from a single input vector
Any instantaneous change in state lies in the column space of \(B\). If that column space is smaller than the full state space, some directions cannot be altered at the present instant.

Consider a cart with state \((position, velocity)\) and force input acting only on acceleration: \(B = [0, 1]^\top\). The position coordinate cannot be altered instantly.

Formally, the reachable velocity at \(t=0^+\) satisfies \(\delta\dot{x}(0) \in \operatorname{Im}(B)\).

> [!WARNING]
> Treating \(\operatorname{Im}(B)\) as the entire controllable subspace is incorrect; dynamics can propagate the input into previously unreachable directions over time.

### Step 2 — Propagation through the open-loop dynamics
Differentiating the state equation repeatedly shows that higher-order time derivatives of the state also depend on \(B\), \(AB\), \(A^2B\), etc.

For the cart example, \(\ddot{x}\) is directly affected by force; the first derivative of acceleration is still in \(\operatorname{Im}(B)\), but the jerk that changes velocity is already covered, while position integrates velocity and therefore appears only after one more differentiation.

The reachable subspace is therefore contained in the column space of the concatenated matrix \([B \quad AB \quad A^2B \quad \dots ]\).

### Step 3 — Finite dimension forces a finite check
By the Cayley–Hamilton theorem, \(A^n\) is a linear combination of lower powers. Consequently only the first \(n\) blocks are required.

The controllability matrix is therefore defined as the \(n \times nm\) matrix
\[
\mathcal{C} = [B \quad AB \quad A^2B \quad \dots \quad A^{n-1}B].
\]

### Step 4 — Full rank is necessary
If \(\operatorname{rank}(\mathcal{C}) < n\), the columns span a proper subspace. There exists a nonzero row vector \(v^\top\) orthogonal to every column, so \(v^\top\mathcal{C}=0\). This implies that the linear functional \(v^\top x\) evolves independently of \(u\) and cannot be driven to zero from arbitrary initial conditions.

### Step 5 — Full rank is sufficient
When \(\operatorname{rank}(\mathcal{C})=n\), the columns form a basis. The controllability Gramian
\[
W_c(t) = \int_0^t e^{A\tau}BB^\top e^{A^\top\tau}\,d\tau
\]
is positive definite for any \(t>0\), and the explicit open-loop control
\[
u(\tau) = -B^\top e^{A^\top(t-\tau)}W_c^{-1}(t)x_0
\]
steers any initial state to the origin in exactly time \(t\).

### Step 6 — The rank test
The system \(\dot{x}=Ax+Bu\) is completely state-controllable if and only if
\[
\operatorname{rank}(\mathcal{C}) = n.
\]

## 5. Worked examples — every step shown

**Example 1 — Scalar integrator**
*Given:* \(\dot{x}=u\), so \(A=0\), \(B=1\), \(n=1\).
*Find:* controllability rank.
\[
\mathcal{C}=[1],\qquad\operatorname{rank}(\mathcal{C})=1=n.
\]
*Why* The single column is nonzero, hence spans \(\mathbb{R}\).  
**Final answer**  
**Controllable.**

*Reflection* The trivial case confirms that direct actuation of the sole state is sufficient.

**Example 2 — Double integrator (cart position)**
*Given:* \(\ddot{x}=u\), \(A=\begin{bmatrix}0&1\\0&0\end{bmatrix}\), \(B=\begin{bmatrix}0\\1\end{bmatrix}\).
*Find:* rank of \(\mathcal{C}\).
\[
AB=\begin{bmatrix}1\\0\end{bmatrix},\qquad\mathcal{C}=\begin{bmatrix}0&1\\1&0\end{bmatrix}.
\]
*Why* First column of \(\mathcal{C}\) is \(B\), second column is \(AB\).  
Determinant equals \(-1\neq0\), so rank\(=2=n\).

**Final answer**  
**Controllable.**

*Reflection* Velocity is reached instantly; position becomes reachable one integration later.

**Example 3 — Two decoupled carts**
*Given:* Two independent carts, \(A=\operatorname{diag}(A_1,A_2)\), \(B=[B_1^\top,0]^\top\).
*Find:* rank.
\[
\mathcal{C}=\begin{bmatrix}B_1& A_1B_1\\0&0\end{bmatrix},\qquad\operatorname{rank}(\mathcal{C})=2<4.
\]
*Why* The second cart’s states lie in the orthogonal complement of the row space.

**Final answer**  
**Not controllable.**

*Reflection* Missing actuator on the second subsystem is immediately diagnosed by rank deficiency.

**Example 4 — Rocket pitch dynamics with actuator lag**
*Given:* State \(( \theta, q, \delta )\), \(A=\begin{bmatrix}0&1&0\\0&0&1\\0&0&-a\end{bmatrix}\), \(B=\begin{bmatrix}0\\0\\b\end{bmatrix}\).
*Find:* rank of \(\mathcal{C}\).
\[
AB=\begin{bmatrix}0\\b\\-ab\end{bmatrix},\quad A^2B=\begin{bmatrix}b\\-ab\\a^2b\end{bmatrix},\quad\mathcal{C}=\begin{bmatrix}0&0&b\\0&b&-ab\\b&-ab&a^2b\end{bmatrix}.
\]
Row reduction yields three nonzero pivots, rank\(=3=n\).

**Final answer**  
**Controllable.**

*Reflection* Actuator dynamics add a new state yet remain controllable because the input still chains through all three integrators.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using only \(B\) instead of the full \(\mathcal{C}\) | Confuses instantaneous reachability with reachability under dynamics | Always form at least up to \(A^{n-1}B\) |
| Checking rank after a coordinate change without re-computing | Similarity preserves rank, yet numerical round-off may mislead | Compute rank in original coordinates or use SVD |
| Treating uncontrollable modes as “stable enough” | Hidden unstable poles still destroy performance | Compute the uncontrollable eigenvalues explicitly via staircase form |
| Forgetting that rank must equal \(n\) exactly, not merely be “large” | Near-singularity from poor scaling looks controllable numerically | Scale states to comparable magnitudes before rank test |
| Applying the test to a nonlinear model without linearization | The matrix is defined only for LTI systems | Linearize about the operating trajectory first |
| Ignoring that \(m>1\) inputs simply widen the matrix | Extra columns can only increase rank | Stack all input columns at each power of \(A\) |
| Using controllability Gramian without checking its conditioning | Ill-conditioned \(W_c\) yields unreliable inverses even when rank is full | Use the rank test on \(\mathcal{C}\) rather than on \(W_c\) |

## 7. The textbook-precise statement
A linear system \(\dot{x}=Ax+Bu\) with \(A\in\mathbb{R}^{n\times n}\), \(B\in\mathbb{R}^{n\times m}\) is completely state-controllable if and only if
\[
\operatorname{rank}[B\quad AB\quad\dots\quad A^{n-1}B]=n.
\]
(Chen, *Linear System Theory and Design*, 4e, §6.3, Theorem 6.3-1.)

## 8. Visual — diagram or schematic
```text
State space (n-dimensional)
+---------------------------+
|  x1   x2   ...   xn       |
|   ▲    ▲          ▲       |
|   │    │          │       |
|   B   AB   ...  A^{n-1}B  |  <-- columns of C
|   │    │          │       |
|   └────┴──────────┘       |
|          rank(C)=n ?      |
+---------------------------+
          Controllable subspace = whole space
```
Each vertical arrow represents one column of \(\mathcal{C}\). When the columns together span the entire horizontal box, every state coordinate can be reached.

## 9. The memory technique
1. **The hook** — Picture a lighthouse whose beam (the input \(B\)) sweeps through a rotating mirror gallery (\(A\)); after \(n-1\) reflections the light must illuminate every corner of the room or some corner stays dark forever.
2. **What to overlearn** — \(\mathcal{C}=[B,AB,\dots,A^{n-1}B]\) and the single test \(\operatorname{rank}(\mathcal{C})=n\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the reachable subspace by successive differentiation of \(\dot{x}=Ax+Bu\) and invoke Cayley–Hamilton to truncate at \(n-1\).

## 10. What this unlocks
Mastery of the rank test lets you certify actuator placement on any rigid-body or flexible-mode vehicle before gain design begins. It is the prerequisite for pole placement, LQR, Kalman filtering, and controllability-based model reduction.

- PBH eigenvector test for controllability  
- Controllability staircase form and Kalman decomposition  
- Minimum-energy control via the Gramian inverse  
- Sensor placement duality via observability rank test  

## 11. Self-check — five questions, no answers
1. For the harmonic oscillator \(\ddot{x}+x=u\), form \(\mathcal{C}\) and state its rank.  
2. A system has \(\operatorname{rank}(\mathcal{C})=n-1\). How many independent states remain unreachable?  
3. Show that similarity transformations leave \(\operatorname{rank}(\mathcal{C})\) invariant.  
4. Given \(A\) nilpotent of index 3 and single-input \(B\), what is the smallest \(n\) for which the system can be uncontrollable?  
5. In a 6-DOF satellite with only two reaction wheels, the controllability matrix has rank 4. Which two body axes are uncontrollable and why?