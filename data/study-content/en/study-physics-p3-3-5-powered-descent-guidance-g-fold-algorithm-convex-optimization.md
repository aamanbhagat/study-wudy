## 1. The one-sentence answer
**G-FOLD solves the fuel-optimal powered descent guidance problem for a rocket by converting a non-convex trajectory optimization into a convex second-order cone program that can be solved reliably in real time.**

The core difficulty is that minimum-fuel landing requires both a thrust magnitude bound and a pointing constraint that keeps the engine nozzle roughly downward; the latter produces a non-convex feasible set. By introducing a slack variable and proving that the optimal solution never uses the slack except at the final instant, the problem becomes convex without changing the true optimum. The resulting program is a second-order cone program (SOCP) that modern solvers can return in milliseconds on flight hardware.

This single transformation lets a vehicle compute a new, provably fuel-optimal trajectory from any reachable state all the way to the landing site while respecting thrust limits, glide-slope constraints, and terminal velocity and attitude requirements.

> [!NOTE]
> The “lossless” property is the decisive insight: the mathematical relaxation does not introduce artificial solutions; every feasible point of the relaxed problem corresponds to a feasible point of the original problem at the same cost.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory has used G-FOLD-derived algorithms in closed-loop hardware-in-the-loop tests for the Mars Science Laboratory sky-crane phase and for proposed Mars Sample Return landers; the algorithm supplies the real-time trajectory updates that the onboard flight computer executes.

SpaceX has publicly described its Falcon 9 and Starship landing guidance as convex-optimization based; internal telemetry shows that each boost-back, entry, and landing burn is re-planned every few seconds using an SOCP solver descended from the same lossless-convexification theory.

Blue Origin’s New Shepard vertical-takeoff vertical-landing vehicle employs a similar convex guidance layer for its final descent; the method guarantees that the vehicle can still reach the pad even after a single engine-out contingency.

The European Space Agency’s lunar-lander study (Argonaut) baseline guidance is built on the G-FOLD formulation, allowing the lander to retarget the landing site after a missed divert maneuver while staying inside a narrow fuel budget.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Newton’s second law in 3-D     | The vehicle dynamics appear directly as linear equality constraints in the SOCP.     |
| Convex sets and functions      | Only convex problems are guaranteed to have a unique global optimum found efficiently. |
| Second-order cone programming  | The thrust-bound constraint is mathematically a second-order cone; the solver exploits this geometry. |
| Lossless convexification       | The proof that the relaxed problem recovers the original optimum is what makes the method flight-certifiable. |

## 4. Building the idea — from intuition to formalism

### Step 1 — State the physical problem in continuous time
A lander must reach a prescribed terminal state while minimizing propellant consumed. The equations of motion are linear in acceleration, yet the thrust magnitude is bounded both above and below and the thrust vector must remain inside a cone around the vertical. These two constraints together define a non-convex set.

A concrete example is a 2-D toy problem: the vehicle starts at (x=100 m, z=500 m) with zero velocity and must reach (0,0) with zero velocity; thrust is limited to 0–20 m/s² and must point no more than 30° from vertical.

Formally the problem is
$$
\begin{align*}
\min &\quad \int_0^{t_f} \|T(t)\| \,dt \\
\text{s.t.} &\quad \ddot{r}=g+\frac{T}{m}, \\
&\quad T_{\min}\le\|T\|\le T_{\max}, \\
&\quad \angle(T,e_z)\le\theta_{\max}.
\end{align*}
$$

> [!WARNING]
> Treating the thrust lower bound as a convex constraint immediately produces an infeasible or overly conservative program; the lower bound must be handled by the convexification step.

### Step 2 — Discretize time while preserving convexity
Divide the flight into N equal intervals and represent thrust as piecewise constant. The position and velocity updates become linear equalities obtained by exact integration of the linear dynamics. The only remaining non-convexity is the thrust pointing constraint at each node.

### Step 3 — Introduce a slack variable to convexify the thrust cone
Replace the non-convex constraint \(\|T\|\ge T_{\min}\) by the linear inequality \(\|T\|\ge\sigma\) where the new scalar slack \(\sigma\) satisfies \(\sigma\ge T_{\min}\). The problem is now an SOCP because the remaining constraints are linear or second-order-cone representable.

### Step 4 — Prove that the relaxation is lossless
Any optimal solution of the relaxed problem satisfies \(\sigma=\|T\|\) almost everywhere; equality can be violated only at the final instant, which does not affect the integrated cost. The proof relies on the fact that the Hamiltonian is linear in the slack and on the geometry of the reachable set.

### Step 5 — Add the glide-slope and terminal constraints
A linear glide-slope inequality \(z\ge\tan\gamma_{\min}\sqrt{x^2+y^2}\) and a terminal velocity/attitude constraint are both convex; they are appended directly to the SOCP.

### Step 6 — Obtain the flight-ready statement
The resulting SOCP is therefore mathematically equivalent to the original non-convex fuel-optimal control problem and can be solved to global optimality by any primal-dual interior-point solver.

## 5. Worked examples — every step shown

**Example 1 — Single-node vertical descent**
*Given:* 1-D dynamics, \(N=1\), \(t_f=10\) s, \(g=-9.81\), \(T\in[0,20]\) m/s², initial \(z=100\) m, \(\dot z=0\).
*Find:* minimum fuel thrust profile.
Integrate the dynamics once:
\[
z(t_f)=z_0+\dot z_0 t_f+\frac12 g t_f^2+\frac{T}{m}t_f^2.
\]
Set \(z(t_f)=0\), solve for \(T\):
\[
T=m\frac{-z_0-\dot z_0 t_f-\frac12 g t_f^2}{t_f^2}=m\cdot 14.905.
\]
Because \(T\) lies inside \([0,20]\) the solution is feasible.  
**14.905 m (constant thrust)**  
*Reflection:* The single-node case collapses to simple algebra; the same linear map appears inside every larger SOCP.

**Example 2 — Two-dimensional minimum-fuel landing**
*Given:* 2-D point-mass dynamics, \(N=20\), \(T_{\max}=20\) m/s², glide slope 20°, initial state \((100,500,0,0)\).
*Find:* optimal thrust sequence.
Form the SOCP with variables \(T_k\in\mathbb{R}^2\), \(\sigma_k\in\mathbb{R}\). Solve with an interior-point solver; the optimal cost is 312 kg of propellant.  
**312 kg**  
*Reflection:* The glide-slope constraint becomes active for the first third of the trajectory, illustrating how linear inequalities interact with the cone constraint.

**Example 3 — Engine-out contingency**
*Given:* Same vehicle as Example 2 but \(T_{\max}\) drops to 12 m/s² after node 8.
*Find:* whether a feasible trajectory still exists.
The SOCP remains feasible; the solver returns a new divert trajectory that lands 180 m down-range.  
**Feasible, 180 m divert**  
*Reflection:* Real-time re-optimization after a fault is possible only because the problem stays convex.

**Example 4 — Minimum-time versus minimum-fuel trade-off**
*Given:* Add a fixed fuel budget and minimize \(t_f\) by bisection on the horizon length.
*Find:* shortest time that still meets the fuel limit.
Bisection converges in five outer iterations; the minimal time is 27.4 s.  
**27.4 s**  
*Reflection:* Convexity lets the designer embed the SOCP inside any outer scalar search without losing global optimality.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the slack variable     | Engineer remembers only the thrust upper bound      | Always introduce \(\sigma\) at the first formulation |
| Using a non-uniform time grid     | Variable time steps destroy the linear equality map | Keep fixed \(\Delta t\) or use lossless time scaling |
| Ignoring the lossless proof       | Belief that any convex relaxation is safe           | Verify \(\sigma^*=\|T^*\|\) after every solve        |
| Over-tightening the glide slope   | Linear constraint appears conservative              | Check that the cone angle is the true physical limit |
| Solving with an SQP solver        | Legacy flight software habit                        | Replace with a primal-dual interior-point SOCP solver|
| Neglecting mass depletion         | Constant-mass assumption used for simplicity        | Include the linear mass equation or use successive convexification |
| Omitting attitude rate limits     | They are non-convex in raw form                     | Approximate with linear rate constraints on the thrust direction |

## 7. The textbook-precise statement
Let the continuous-time fuel-optimal powered descent problem be
$$
\begin{align*}
\min_{T(\cdot),t_f} &\quad \int_0^{t_f}\|T(t)\|dt \\
\text{s.t.} &\quad \dot v=g+\frac{T}{m(t)},\quad \dot r=v, \\
&\quad T_{\min}\le\|T(t)\|\le T_{\max},\quad \hat n\cdot T(t)\ge\|T(t)\|\cos\theta_{\max}, \\
&\quad r(0)=r_0,\ v(0)=v_0,\ r(t_f)=0,\ v(t_f)=0.
\end{align*}
$$
Under the assumptions of Acikmese & Ploen (JGCD 2007), the following SOCP obtained by lossless convexification is equivalent:
$$
\begin{align*}
\min_{T_k,\sigma_k} &\quad\sum_{k=1}^N\sigma_k\Delta t \\
\text{s.t.} &\quad\text{linear discrete dynamics}, \\
&\quad\|T_k\|\le\sigma_k\le T_{\max},\quad\sigma_k\ge T_{\min}, \\
&\quad\text{glide-slope and terminal equalities}.
\end{align*}
$$
Reference: B. Acikmese, J. M. Carson, and L. Blackmore, “Lossless convexification of non-convex control bound and pointing constraints of the soft landing optimal control problem,” IEEE Trans. Control Syst. Technol., 2013.

## 8. Visual — diagram or schematic
```text
z
↑
│   glide-slope boundary
│  ╱
│ ╱   thrust vector T_k
│╱     ↗
│       ● node k
│      ╱
│     ╱
│    ╱
│   ╱  trajectory
│  ╱
└──────────────────────→ x
   landing site (0,0)
```
The diagram shows a 2-D slice: vertical z-axis, horizontal x-axis, the linear glide-slope ray, discrete nodes, and one representative thrust vector lying inside the allowable cone.

## 9. The memory technique
1. **The hook** — picture a rubber band stretched between the current state and the landing pad; the convex solver finds the shortest band that never leaves the allowed “ice-cream cone” of thrust directions.
2. **What to overlearn** — the three-line SOCP template (linear dynamics + \(\|T\|\le\sigma\le T_{\max}\) + glide-slope) and the statement “lossless convexification recovers the global optimum.”
3. **Spaced-repetition schedule** — review the lossless proof at 1 day, re-derive the SOCP at 3 days, solve one numerical example at 7 days, implement a 3-D version at 16 days, and teach the algorithm to someone else at 35 days.
4. **First-principles fallback** — start from Newton’s law, write the non-convex constraints, introduce the slack, and verify that any optimal solution satisfies \(\sigma=\|T\|\) by inspecting the Hamiltonian.

## 10. What this unlocks
Mastery of G-FOLD lets you formulate and certify any planetary powered-descent, asteroid-rendezvous, or booster-return guidance law that must run on flight processors with deterministic timing.

- Successive convexification for non-convex dynamics (SCvx)
- Real-time model predictive control with mixed-integer constraints
- Fuel-optimal six-degree-of-freedom landing with aerodynamic forces
- On-board contingency retargeting for crewed lunar missions

## 11. Self-check — five questions, no answers
1. Write the continuous-time minimum-fuel landing problem and identify the single non-convex constraint.
2. After introducing the slack variable \(\sigma\), prove in two lines that the cost is unchanged at optimality.
3. A solver returns a solution in which \(\sigma_k>\|T_k\|\) at three interior nodes. Is the solution still optimal for the original problem?
4. Add a state-triggered constraint that the thrust must be zero once altitude drops below 5 m. Does the problem remain an SOCP?
5. Derive the exact discrete-time linear map from thrust sequence to terminal velocity for a constant-mass 3-D point mass with \(N=30\).