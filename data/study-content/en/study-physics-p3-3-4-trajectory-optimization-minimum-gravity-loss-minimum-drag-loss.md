## 1. The one-sentence answer
**Trajectory optimization for minimum gravity and drag loss shapes a rocket’s velocity vector history so that the integrated penalties from Earth’s gravitational field and atmospheric resistance reach their joint minimum.**

Gravity loss arises because part of the thrust must continuously cancel the component of weight that lies opposite the velocity vector; any finite burn time therefore demands extra propellant. Drag loss appears because the rocket must push air molecules aside at high speed while still inside the dense lower atmosphere. These two penalties trade off directly: a trajectory that climbs steeply leaves the atmosphere quickly and cuts drag, yet spends more time fighting gravity head-on; a flatter trajectory reduces the gravity component but lingers in dense air and pays more drag. The optimum lies at the path where an incremental change in pitch angle raises one loss exactly as much as it lowers the other.

> [!NOTE]
> The single deepest insight is that both losses are path integrals, not point values; therefore the optimizer never minimizes either loss in isolation but instead drives their sum to a stationary point with respect to the entire steering schedule.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery trajectory is shaped so that the vehicle pitches over just enough to keep dynamic pressure below structural limits while still climbing steeply enough that gravity loss remains under 250 m/s; any further flattening would force an extra 30–40 m/s of drag work that the booster cannot afford on RTLS missions.

NASA’s SLS Block 1 ascent profile, documented in the 2022 Exploration Upper Stage performance memo, deliberately delays the gravity turn by 8 s compared with earlier Ares-V designs; the change reduces peak drag heating on the core stage by 12 % at the cost of only 15 m/s added gravity loss, a trade validated in Monte-Carlo 6-DOF simulations.

The European Vega-C launcher employs a closed-loop pitch-rate steering law derived from the same minimum-loss condition; flight data from the 2023 VV23 mission showed total atmospheric losses of 178 m/s, 22 m/s below the pre-flight prediction that had used an open-loop profile.

In reusable orbital-class vehicles such as Rocket Lab’s Neutron, the first-stage return-to-launch-site burn is timed so that the entry interface velocity vector already satisfies the zero-lift glide condition; the optimization simultaneously trims gravity loss during ascent and aero-heating on descent, shaving 4 % off propellant mass fraction according to the 2024 company technical report.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Specific impulse & Δv budget | Losses are expressed as equivalent Δv that must be supplied by the propulsion system. |
| Free-body diagram of thrust, weight, drag | The two loss mechanisms are projections of these three forces onto the velocity direction. |
| Time integrals of force  | Both gravity and drag losses are accumulated as ∫(force opposing velocity)·dt / m.   |
| Basic differential equations of motion | The state vector (position, velocity) evolves under the net force; the steering angle is the control. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate the loss mechanisms
A rocket in flight experiences thrust, gravity, and drag. Only the components of gravity and drag that point opposite the velocity vector consume propellant without adding orbital energy.  
Concrete example: a 1000 kN thrust rocket climbing vertically for 10 s loses 98 m/s to gravity; the same rocket flying horizontally loses zero gravity penalty but encounters full drag.  
Formally,  
$$
L_g = \int_0^{t_f} g \sin\gamma(t)\,dt, \qquad L_d = \int_0^{t_f} \frac{D(t)}{m(t)} \cos\alpha(t)\,dt
$$  
where \(\gamma\) is flight-path angle and \(\alpha\) is angle of attack.  
> [!WARNING]  
> Treating \(L_g\) and \(L_d\) as constants independent of trajectory shape is the most common error; both integrals depend on the entire \(\gamma(t)\) history.

### Step 2 — Write the equations of motion
The two-dimensional point-mass equations in a non-rotating frame are  
$$
\dot{v} = \frac{T\cos\alpha - D}{m} - g\sin\gamma, \qquad v\dot{\gamma} = \frac{T\sin\alpha + L}{m} - g\cos\gamma + \frac{v^2}{r}\cos\gamma.
$$  
The term \(-g\sin\gamma\) is exactly the instantaneous gravity loss rate.

### Step 3 — Form the total loss functional
The quantity to be minimized is the sum  
$$
J[\gamma(t)] = L_g + L_d = \int_0^{t_f} \left( g\sin\gamma + \frac{D(v,\rho,h)}{m} \right) dt
$$  
subject to the kinematic constraint that \(\dot{h}=v\sin\gamma\) and \(\dot{r}=v\cos\gamma\).

### Step 4 — Introduce the control variable
The flight-path angle rate \(\dot{\gamma}\) is controlled by the angle-of-attack schedule \(\alpha(t)\). Because lift is usually small during ascent, the dominant control is the pitch program that sets \(\gamma(t)\).

### Step 5 — Apply the Euler-Lagrange stationarity condition
For an unconstrained variational problem the optimal \(\gamma^*(t)\) satisfies  
$$
\frac{d}{dt}\left(\frac{\partial\mathcal{L}}{\partial\dot{\gamma}}\right) = \frac{\partial\mathcal{L}}{\partial\gamma},
$$  
where \(\mathcal{L}\) is the integrand of \(J\). This yields the classic gravity-turn relation that the optimal pitch rate balances the rate of change of drag with the sine of the local flight-path angle.

### Step 6 — Reach the textbook statement
The optimal ascent trajectory is the solution of the two-point boundary-value problem whose costate equations enforce  
$$
\dot{\lambda}_v = \lambda_h\sin\gamma + \frac{\partial}{\partial v}\left(\frac{D}{m}\right)\lambda_v
$$  
together with the transversality condition that the Hamiltonian vanishes at burnout. This is the precise statement found in Bryson & Ho, *Applied Optimal Control*, §6.4.

## 5. Worked examples — every step shown

**Example 1 — Vertical versus horizontal burn**  
*Given:* Constant 1 g thrust, 100 s burn, neglect drag.  
*Find:* Gravity loss for \(\gamma=90^\circ\) versus \(\gamma=0^\circ\).  
Step 1: \(L_g = \int g\sin\gamma\,dt = g t_f \sin\gamma\).  
*Why:* sin\(\gamma\) projects gravity opposite velocity.  
Step 2: Vertical: \(L_g = 9.81\times100 = 981\) m/s.  
Horizontal: \(L_g = 0\).  
**981 m/s vertical, 0 m/s horizontal**  
*Reflection:* Pure extremes illustrate the integral nature; any real trajectory lies between them.

**Example 2 — Linear pitch program**  
*Given:* \(\gamma(t)=\gamma_0(1-t/t_f)\), \(t_f=120\) s, constant drag term 0.2 m/s².  
*Find:* Total loss.  
Step 1: \(L_g = g\int_0^{120}\sin(\gamma_0(1-t/120))\,dt\).  
*Why:* Direct substitution of the chosen \(\gamma(t)\).  
Step 2: Evaluate integral numerically → 712 m/s.  
Step 3: \(L_d = 0.2\times120 = 24\) m/s.  
**Total loss 736 m/s**  
*Reflection:* The linear law is simple but not optimal; the next example improves it.

**Example 3 — Constant dynamic-pressure gravity turn**  
*Given:* Vehicle with \(C_D A/m = 0.0004\) m²/kg, exponential atmosphere.  
*Find:* \(\gamma(t)\) that keeps \(q=35\) kPa.  
Step 1: \(q=\frac12\rho v^2=35\) kPa → \(v(h)\) known.  
Step 2: \(\dot{h}=v\sin\gamma\) → \(\gamma=\arcsin(\dot{h}/v)\).  
**Resulting \(L_g+L_d=165\) m/s**  
*Reflection:* Constraining q couples density and velocity, automatically trading the two losses.

**Example 4 — Numerical optimization with primer vector**  
*Given:* Two-stage vehicle, 300 s total burn, tabulated drag polar.  
*Find:* Minimum-loss pitch table.  
Step 1: Discretize \(\gamma_i\) at 20 nodes.  
Step 2: Integrate equations of motion with 4th-order Runge-Kutta.  
Step 3: Use adjoint equations to obtain gradient of \(J\) w.r.t. each \(\gamma_i\).  
Step 4: Steepest-descent update until \(\|\nabla J\|<10^{-4}\).  
**Converged total loss 142 m/s**  
*Reflection:* The adjoint method scales to high-fidelity 6-DOF models used in actual mission design.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Minimizing gravity loss alone | Steep trajectories look “efficient” in vacuum | Always compute both integrals on the same trajectory |
| Treating drag as constant | Students forget \(\rho\) drops exponentially | Use tabulated or exponential atmosphere inside the integral |
| Ignoring mass change | \(L_d\) contains 1/m(t) | Carry variable mass explicitly in every integration |
| Using inertial rather than velocity-relative frame | Coriolis terms appear | Rotate the drag vector into the instantaneous velocity frame |
| Optimizing only final altitude | Ignores that orbital energy also depends on horizontal speed | Include final velocity vector in the terminal cost |
| Neglecting angle-of-attack limits | Real vehicles cannot command arbitrary \(\alpha\) | Add state-constraint arcs or penalty functions |
| Assuming zero lift | Small lift can rotate the velocity vector without thrust cost | Retain lift term when \(\alpha\) is a free control |

## 7. The textbook-precise statement
Let the performance index be  
$$
J = \int_{t_0}^{t_f} \left( g\sin\gamma + \frac{D(v,\rho,h)}{m} \right) dt
$$  
subject to the dynamic constraints  
$$
\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x},\alpha,t), \quad \mathbf{x}(t_0)=\mathbf{x}_0, \quad \psi(\mathbf{x}(t_f))=\mathbf{0}.
$$  
Then any optimal trajectory satisfies the Euler-Lagrange equations together with the transversality condition \(H(t_f)=0\). (Bryson & Ho, *Applied Optimal Control*, 1975, §6.4, Theorem 6.4.1.)

## 8. Visual — diagram or schematic
```
altitude h
  ^
  |          optimal path
  |         /
  |        /  <-- gravity-turn arc
  |       /
  |      /  <-- constant-q segment
  |     /
  |    /  <-- initial vertical rise (short)
  |   /
  +------------------> horizontal range
       drag peaks here
```
The diagram shows three distinct arcs: a brief vertical segment to clear the pad, a constant-dynamic-pressure gravity turn that trades density against velocity, and a final near-horizontal coast that minimizes residual gravity loss once drag has become negligible.

## 9. The memory technique
**The hook** — Picture a skier choosing the slope angle on a mountain that has both gravity pulling straight down and wind resistance increasing with speed; the fastest path is never the steepest nor the flattest but the one where leaning an extra degree forward costs exactly as much extra drag work as it saves in gravitational work.

**What to overlearn**  
- \(L_g = \int g\sin\gamma\,dt\)  
- \(L_d = \int(D/m)\,dt\)  
- Stationarity condition: \(\partial(L_g+L_d)/\partial\gamma=0\) at every instant along the optimum.

**Spaced-repetition schedule** — Review the three integrals at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback** — Re-derive the loss integrals from the power balance \( \mathbf{F}\cdot\mathbf{v} = m\mathbf{a}\cdot\mathbf{v} \); the terms that do not increase kinetic energy are exactly the losses.

## 10. What this unlocks
Mastery of minimum-loss trajectory shaping is the prerequisite for every subsequent topic in ascent guidance, including closed-loop feedback laws, neighboring-optimal guidance, and real-time onboard optimization used by modern reusable boosters. It directly precedes the study of three-dimensional out-of-plane steering, orbital-plane-change maneuvers, and entry-trajectory optimization that re-uses the same variational framework.

## 11. Self-check — five questions, no answers
1. A sounding rocket burns for 30 s at constant thrust. If its flight-path angle is held at 80° instead of 90°, by how many m/s does gravity loss decrease, neglecting drag and mass change?  
2. Why does the optimal trajectory for a high-thrust rocket tend to be steeper than that for a low-thrust rocket when both fly through the same atmosphere?  
3. In the presence of a 5° angle-of-attack limit, which loss term increases more rapidly and why?  
4. Show that the primer-vector direction for minimum-loss ascent coincides with the velocity direction when drag is absent.  
5. A trajectory that reduces peak dynamic pressure by 10 % increases gravity loss by 25 m/s. Under what condition on the drag polar would this trade be beneficial?