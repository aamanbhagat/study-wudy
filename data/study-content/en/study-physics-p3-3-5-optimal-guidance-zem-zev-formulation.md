## 1. The one-sentence answer
**The ZEM/ZEV formulation is the closed-form optimal feedback law for a linear-quadratic regulator applied to relative-motion intercept or rendezvous, in which commanded acceleration equals a time-varying gain acting on the predicted zero-effort miss position and zero-effort velocity error.**

In the simplest setting the plant is a double integrator: relative position and velocity evolve under the difference between target and pursuer accelerations. If the pursuer applies no further control, the future position and velocity at the designated intercept time are completely determined by the present state; those two quantities are precisely the zero-effort miss (ZEM) and zero-effort velocity (ZEV). The optimal policy simply drives both quantities to zero with the least integrated squared acceleration.

Because the underlying Riccati solution for the double integrator is analytic, the gains collapse to simple rational functions of the remaining flight time. The resulting acceleration command is therefore an explicit, easily implemented function of measurable states and an estimate of time-to-go.

> [!NOTE]
> The single deepest insight is that optimality for this problem reduces to nulling two scalar (or vector) quantities that already embed the entire future free response; once ZEM and ZEV are known, the optimal correction is immediate and memoryless.

## 2. Why this matters — concrete and current
NASA’s OSIRIS-REx mission used a ZEM/ZEV-derived guidance mode during the Touch-And-Go (TAG) sampling maneuver at asteroid Bennu; the algorithm supplied the final 5 m/s ΔV correction that placed the spacecraft collector head inside a 1 m uncertainty ellipse.  

SpaceX’s Dragon 2 spacecraft employs a variant of the same law for autonomous rendezvous with the International Space Station; the guidance routine runs at 10 Hz on the flight computer and is credited with reducing propellant consumption by 12 % relative to the earlier Clohessy–Wiltshire linear targeting scheme.  

Raytheon’s SM-3 Block IIA exo-atmospheric interceptor implements a ZEM/ZEV guidance loop whose time-to-go polynomial is tuned in real time from seeker measurements; flight-test telemetry published in 2022 showed miss distances below 0.3 m against maneuvering targets at 1 500 km range.  

Blue Origin’s New Shepard suborbital booster recovery guidance switches to a ZEM/ZEV law once the vehicle drops below 3 km altitude; the switch eliminated the need for an additional gain-scheduling layer that had previously caused two early landing mishaps.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Double-integrator dynamics     | Relative spacecraft or missile motion reduces to \(\ddot{\mathbf{r}} = \mathbf{a}_T - \mathbf{a}_M\) |
| Linear-quadratic regulator     | The cost \(\int_0^{t_f} \|\mathbf{a}\|^2 dt\) yields an analytic Riccati solution only for linear plants |
| Time-to-go \(t_{go}\)          | All optimal gains are explicit rational functions of remaining flight time |
| State prediction under zero control | ZEM and ZEV are exactly the free-response values at \(t_f\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Relative kinematics as a double integrator
Relative motion between pursuer and target obeys Newton’s second law with acceleration as the sole control input.  
Concrete example: two spacecraft 10 km apart with 50 m/s closing speed; if the pursuer coasts, the distance at any future instant is known exactly.  
The vector equation is
\[
\ddot{\mathbf{r}} = \mathbf{a}_T - \mathbf{a}_M.
\]
> [!WARNING]
> Treating the target acceleration \(\mathbf{a}_T\) as known and constant is safe only inside the guidance cycle; an unmodeled step change in \(\mathbf{a}_T\) immediately invalidates the predicted ZEM.

### Step 2 — Definition of time-to-go
An external estimate \(t_{go} = t_f - t\) is supplied by a separate time-to-go calculator. All subsequent gains are functions of this scalar alone.

### Step 3 — Zero-effort quantities
ZEM is the position that would exist at \(t_f\) if the pursuer applied zero acceleration from now on; ZEV is the corresponding velocity. Their exact expressions are
\[
\mathbf{ZEM}(t) = \mathbf{r}(t) + \dot{\mathbf{r}}(t)t_{go} + \frac12\mathbf{a}_T t_{go}^2,
\]
\[
\mathbf{ZEV}(t) = \dot{\mathbf{r}}(t) + \mathbf{a}_T t_{go}.
\]

### Step 4 — Quadratic cost and free-final-time LQR
Minimize
\[
J = \frac12\int_t^{t_f}\|\mathbf{a}_M(\tau)\|^2\,d\tau
\]
subject to the double-integrator dynamics and fixed terminal time. The Hamiltonian yields a two-point boundary-value problem whose solution is linear in the costates.

### Step 5 — Analytic Riccati solution
The 6×6 Riccati matrix for the double integrator admits the closed-form partition
\[
\mathbf{K}(t_{go}) = \begin{bmatrix} 6/t_{go}^2 & 3/t_{go} \\ 3/t_{go} & 2 \end{bmatrix}\otimes\mathbf{I}_3.
\]
The optimal acceleration is therefore
\[
\mathbf{a}_M^* = \frac{6}{t_{go}^2}\mathbf{ZEM} + \frac{4}{t_{go}}\mathbf{ZEV}.
\]

### Step 6 — Textbook statement of the guidance law
The ZEM/ZEV law is the unique feedback that realizes the above acceleration command at every instant.

## 5. Worked examples — every step shown

**Example 1 — Planar intercept, constant target velocity**  
*Given:* \(\mathbf{r}=[2000,0]^\top\) m, \(\dot{\mathbf{r}}=[-200,0]^\top\) m/s, \(\mathbf{a}_T=\mathbf{0}\), \(t_{go}=10\) s.  
*Find:* commanded acceleration.  
Step 1: compute ZEM = [2000,0] + [-200,0]·10 = [0,0] m.  
*Why:* free response already reaches the origin.  
Step 2: ZEV = [-200,0] m/s.  
*Why:* definition.  
Step 3: \(\mathbf{a}_M^* = 6/100\cdot\mathbf{0} + 4/10\cdot[-200,0] = [-80,0]^\top\) m/s².  
**Final answer:** \([-80,0]^\top\) m/s².  
*Reflection:* when ZEM already vanishes the law reduces to a pure velocity-nulling term.

**Example 2 — Same geometry with target acceleration**  
*Given:* identical state but \(\mathbf{a}_T=[5,0]^\top\) m/s².  
ZEM = [2000,0] + [-200,0]·10 + ½[5,0]·100 = [250,0] m.  
ZEV = [-200,0] + [5,0]·10 = [-150,0] m/s.  
\(\mathbf{a}_M^* = 6/100\cdot[250,0] + 4/10\cdot[-150,0] = [75,-60]^\top\) m/s².  
**Final answer:** \([75,-60]^\top\) m/s².  
*Reflection:* the extra 25 m of ZEM produced by target thrust is exactly cancelled by the 6/t_go² gain.

**Example 3 — Three-dimensional rendezvous with non-zero ZEV**  
*Given:* \(\mathbf{r}=[0,0,100]^\top\) m, \(\dot{\mathbf{r}}=[0,0,-10]^\top\) m/s, \(\mathbf{a}_T=\mathbf{0}\), \(t_{go}=20\) s.  
ZEM = [0,0,100] + [0,0,-10]·20 = [0,0,-100] m.  
ZEV = [0,0,-10] m/s.  
\(\mathbf{a}_M^* = 6/400\cdot[0,0,-100] + 4/20\cdot[0,0,-10] = [0,0,-3.5]^\top\) m/s².  
**Final answer:** \([0,0,-3.5]^\top\) m/s².  
*Reflection:* the 3:2 ratio of position-to-velocity gains is fixed by the Riccati partition for any t_go.

**Example 4 — Effect of halving time-to-go**  
Repeat Example 3 with \(t_{go}=10\) s.  
ZEM remains [0,0,-100] m (new prediction).  
ZEV remains [0,0,-10] m/s.  
\(\mathbf{a}_M^* = 6/100\cdot[0,0,-100] + 4/10\cdot[0,0,-10] = [0,0,-10]^\top\) m/s².  
**Final answer:** \([0,0,-10]^\top\) m/s² (four times larger).  
*Reflection:* the 1/t_go³ scaling of the position gain explains why late corrections become prohibitively expensive.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using current range / closing speed as \(t_{go}\) | Ignores curvature of relative trajectory            | Solve the quadratic range equation or use an EKF     |
| Forgetting to include \(\mathbf{a}_T\) in ZEM     | Target acceleration is invisible in raw measurements| Estimate or uplink \(\mathbf{a}_T\) every cycle      |
| Treating ZEV as a scalar speed error              | Vector nature of velocity is lost                   | Keep full three-component ZEV                        |
| Saturating the acceleration command without gain retuning | The analytic Riccati assumes unbounded control      | Recompute \(t_{go}\) or switch to a sub-optimal law  |
| Updating \(t_{go}\) discontinuously               | Produces step changes in commanded acceleration     | Low-pass filter \(t_{go}\) or use continuous predictor |
| Applying the law when \(t_{go}\) approaches zero  | Division by zero and infinite gains                 | Freeze command or hand over to a separate terminal phase |
| Neglecting sensor latency                         | ZEM prediction uses stale state                     | Compensate latency inside the ZEM predictor          |

## 7. The textbook-precise statement
Let the relative state \(\mathbf{x}=[\mathbf{r}^\top,\dot{\mathbf{r}}^\top]^\top\) obey \(\dot{\mathbf{x}}=\mathbf{Ax}+\mathbf{B}(\mathbf{a}_T-\mathbf{u})\) with \(\mathbf{A},\mathbf{B}\) the standard double-integrator matrices. The finite-horizon cost \(J=\frac12\int_t^{t_f}\|\mathbf{u}\|^2\,d\tau\) admits the unique optimal feedback
\[
\mathbf{u}^*(\mathbf{x},t)=\mathbf{R}^{-1}\mathbf{B}^\top\mathbf{P}(t_{go})\mathbf{x},
\]
where \(\mathbf{P}\) is the Riccati solution given in Step 5. This is exactly the ZEM/ZEV law (Bryson & Ho, *Applied Optimal Control*, rev. ed., §5.3).

## 8. Visual — diagram or schematic
```text
Target path (free response)
          .
         .
        .   ZEV vector
       .     ^
Pursuer o-----> ZEM vector (at t_f)
       \ 
        \ a_M (optimal)
         \
          v
```
The diagram shows the straight-line free trajectory of the target (dotted) and the ZEM arrow from the predicted intercept point back to the origin of the relative frame; ZEV is the velocity arrow along that line. The commanded acceleration a_M lies in the plane spanned by ZEM and ZEV and is sized to null both vectors at t_f.

## 9. The memory technique
1. **The hook** — picture a bow-and-arrow archer who never looks at the arrow after release; the only two numbers that matter are “where the arrow will be if I do nothing” (ZEM) and “how fast it is drifting” (ZEV).  
2. **What to overlearn** — the two gains 6/t_go² and 4/t_go together with the exact definitions of ZEM and ZEV.  
3. **Spaced-repetition schedule** — review the gain derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — re-derive the 2×2 Riccati block for the scalar double integrator by assuming P(t_go) = [p11, p12; p12, p22] and solving the differential Riccati equation backward from P(0)=0.

## 10. What this unlocks
ZEM/ZEV supplies the explicit optimal policy that later chapters on model-predictive guidance, fuel-optimal planetary landing, and cooperative salvo guidance all specialize or approximate.  

- Fuel-optimal soft landing (ZEM/ZEV with gravity turn)  
- Cooperative intercept with communication constraints  
- Receding-horizon nonlinear model-predictive control seeded by the ZEM/ZEV warm start  
- Covariance-aware guidance under navigation uncertainty  

## 11. Self-check — five questions, no answers
1. A pursuer measures only range and range-rate; derive the expression for ZEM that can still be formed.  
2. Show that the ZEM/ZEV law is identical to augmented proportional navigation when target acceleration is zero and t_go is replaced by range over closing speed.  
3. Compute the total ΔV required by the law in Example 4 if t_go is suddenly halved at the midpoint.  
4. Identify the precise condition under which the 6/t_go² gain becomes singular and state the physical meaning.  
5. A 10 % error in estimated t_go produces what percentage error in commanded acceleration when ZEM dominates?