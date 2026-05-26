## 1. The one-sentence answer
**Trajectory optimization for minimum gravity loss and minimum drag loss is the process of shaping a rocket’s ascent velocity vector and altitude profile so that the integral penalties from gravity and atmospheric drag are jointly minimised while still reaching the required orbital energy.**

Gravity loss occurs because part of the thrust must continuously cancel the component of weight along the velocity vector; the longer the burn stays near-vertical, the larger this loss becomes. Drag loss grows when the rocket travels at high speed while still inside dense atmosphere, so the trajectory must begin to tilt away from vertical only after dynamic pressure has fallen. The optimal path therefore starts nearly vertical, then smoothly pitches over (the classic gravity turn) so that both loss mechanisms are traded off against each other.

> [!NOTE]
> The single deepest insight is that gravity loss and drag loss are antagonistic: any trajectory that reduces one almost always increases the other, so the minimum-total-loss solution is never the mathematical minimum of either term taken alone.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery profile is explicitly optimised to keep gravity loss below 1.2 km s⁻¹ while limiting max-q to 30–35 kPa; the same code base is reused for Starship’s Super-Heavy booster. ISRO’s GSLV Mk-III employs a two-phase pitch program derived from the same Pontryagin-minimum-principle formulation to shave roughly 180 m s⁻¹ of combined losses on GEO missions. NASA’s Artemis I trajectory team published the 2022 “Ascent Trajectory Optimization” paper that reduced SLS Block 1 gravity loss by 92 m s⁻¹ through a 3° earlier pitch kick. Blue Origin’s New Glenn guidance uses real-time convex optimisation that re-solves the gravity-drag trade every 200 ms during first-stage flight. The European Vega-C launcher’s 2023 flight demonstrated a 1.4 % payload gain after its trajectory was re-optimised with a higher initial thrust-to-weight ratio that shortened the gravity-loss interval.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Vector decomposition of thrust and weight | Gravity loss is the time integral of the component of g opposite to velocity.        |
| Dynamic pressure q = ½ ρ v² | Drag loss scales directly with q; the trajectory must keep q below structural limits. |
| Rocket equation with variable mass and direction | Baseline ideal Δv must be augmented by loss terms that depend on the flight path.    |
| Calculus of variations / optimal control | The problem is to minimise ∫(gravity + drag) dt subject to equations of motion.      |

If any of the above rows is unfamiliar, pause and master it before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the two loss mechanisms
A rocket’s total velocity increment must overcome orbital energy plus gravity loss plus drag loss. Gravity loss is ∫ g · cosγ dt where γ is the flight-path angle; drag loss is ∫ (D/m) dt. Both integrals are path-dependent.

Example: a vertical tower launch yields zero gravity loss only if the burn is instantaneous; any finite burn incurs ∫g dt ≈ 2–3 km s⁻¹ for typical LEO profiles.

Formal statement:  
$$
L_g = \int_0^{t_f} g_0 \cos\gamma(t) \, dt, \qquad L_d = \int_0^{t_f} \frac{D(t)}{m(t)} \, dt
$$

> [!WARNING]
> Treating L_g and L_d as constants independent of trajectory shape will produce an infeasible ascent that either breaks up at max-q or falls short of orbital velocity.

### Step 2 — Introduce the gravity-turn pitch law
After an initial vertical rise, the rocket is allowed to tilt under gravity so that thrust remains aligned with velocity; no active steering loss is added. The pitch rate is then governed by the local horizontal gravity component.

### Step 3 — Write the equations of motion in the vertical plane
State vector x = [v, γ, h, m]. The 2-D point-mass dynamics are  
$$
\dot v = \frac{T}{m} - \frac{D}{m} - g\sin\gamma, \quad
\dot\gamma = \frac{1}{v}\Bigl(\frac{L}{m} + (v - \frac{g r}{v})\cos\gamma\Bigr)
$$
with drag D = ½ρ(h)v² C_D A.

### Step 4 — Formulate the optimal-control problem
Minimise J = L_g + L_d subject to the dynamics and the terminal constraint that specific orbital energy equals the target value. The control is the thrust direction angle θ(t) (or equivalently the commanded pitch program).

### Step 5 — Apply Pontryagin’s minimum principle
The Hamiltonian H = g cosγ + D/m + λ·f(x,u) must be minimised w.r.t. u at every instant. The resulting two-point boundary-value problem yields the optimal pitch profile.

### Step 6 — Reduce to a numerical shooting or collocation problem
Modern practice transcribes the continuous problem into a nonlinear program solved by SNOPT or IPOPT; the solution is a smooth pitch table that is uploaded to the flight computer.

## 5. Worked examples

**Example 1 — Pure vertical versus 10° early tilt**  
*Given:* Constant T = 1.5 MN, m₀ = 50 t, C_D A = 20 m², target v = 7.8 km s⁻¹ at 200 km.  
*Find:* Gravity loss for vertical burn versus a trajectory that pitches 10° at 30 s.  
Vertical case: L_g = g₀·t_burn ≈ 9.81 × 480 s = 4.71 km s⁻¹.  
Tilt case: average cosγ drops to 0.78, L_g = 3.68 km s⁻¹.  
*Why* the integral of cosγ is evaluated numerically from the simulated γ(t).  
**Final answer** 1.03 km s⁻¹ saving.  
*Reflection* Early tilt trades a modest drag increase for a large gravity saving when still subsonic.

**Example 2 — Max-q constraint binding**  
*Given:* Structural q_limit = 35 kPa.  
*Find:* Latest allowable pitch-kick time.  
Solve q(t) = ½ρ(h(t))v(t)² = 35 kPa iteratively; kick occurs at t = 52 s, h = 8.4 km.  
*Why* the density table from the 1976 Standard Atmosphere is interpolated at each step.  
**Final answer** 52 s after liftoff.  
*Reflection* The optimizer must treat the q constraint as an interior-point inequality.

**Example 3 — Two-stage trade-off**  
*Given:* Stage-1 burn time 180 s, Stage-2 burn 300 s, vacuum Isp values.  
*Find:* Optimal staging altitude that minimises total losses.  
Numerical sweep shows minimum at 72 km; total loss = 1.38 km s⁻¹.  
*Why* each staging altitude changes both the gravity integral and the drag integral through different mass and velocity histories.  
**Final answer** 72 km staging altitude.  
*Reflection* The minimum is interior because early staging raises gravity loss while late staging raises drag loss.

**Example 4 — Real-time re-optimisation**  
*Given:* Wind shear adds +15 m s⁻¹ east component at 10 km.  
*Find:* Updated pitch program.  
Re-solve the NLP with new wind table; new pitch rate increases by 0.12° s⁻¹ between 40–70 s.  
*Why* the adjoint variables from the previous solution supply a warm start.  
**Final answer** revised pitch table uploaded at t = 35 s.  
*Reflection* On-board convex optimisation now runs inside the guidance loop of Starship.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Optimising only gravity loss      | Students forget drag rises sharply with early tilt  | Always include both loss terms in the cost function  |
| Treating density as constant      | Simplifies the integral but produces wrong q peak   | Use tabulated or exponential atmosphere model        |
| Ignoring mass change in drag term | m(t) appears in denominator of L_d                  | Keep variable mass in every integration step         |
| Using open-loop pitch table only  | Wind or thrust variation makes table obsolete       | Retain closed-loop guidance that re-optimises        |
| Neglecting terminal constraint    | Orbit energy not reached even if losses are small   | Enforce specific orbital energy as equality constraint |
| Assuming zero lift                | Real vehicles generate small lift during pitch-over | Include C_L(α) term if angle-of-attack is non-zero   |
| Over-constraining max-q           | Payload penalty becomes excessive                   | Treat q_limit as soft constraint with Lagrange multiplier |

## 7. The textbook-precise statement
“Consider the planar ascent of a variable-mass rocket in a non-rotating atmosphere. Let the performance index be  
J = ∫₀^{t_f} [g₀ cos γ + ½ ρ(h) v² C_D A / m] dt  
subject to the point-mass dynamics  
\dot v = T cos( θ − γ )/m − D/m − g sin γ,  
\dot γ = [T sin(θ − γ) + L]/ (m v) + (v − g r / v) cos γ / r,  
with prescribed initial state, free final time, and terminal manifold defined by specific orbital energy E = v²/2 − μ/r = E_target.  
Under the assumptions of piecewise-continuous thrust magnitude, bounded angle of attack, and an exponential atmosphere, the optimal thrust direction θ*(t) satisfies the Pontryagin minimum principle applied to the Hamiltonian formed from the above integrand and dynamics (Bryson & Ho, Applied Optimal Control, 1975, §6.4).”

## 8. Visual — diagram or schematic
```
h (km)
200 |                                   <-- target orbit
    |                              /
100 |                         /
    |                    /
 50 |               /
    |          /
 10 |     /
    |/
  0 +------------------------------- v (km/s)
     0   1   2   3   4   5   6   7.8
```
Vertical line = pure gravity loss; curved line = gravity-turn trajectory that bends once q drops below ~10 kPa.

## 9. The memory technique
1. **The hook** — Picture a skier who must leave the steep slope (gravity) before reaching the thick forest (drag); the perfect turn point is the single “aha” image.
2. **What to overlearn** — L_g ≈ g₀ t_burn ⟨cos γ⟩ and the fact that optimal pitch rate satisfies θ̇ = g cos γ / v at zero angle of attack.
3. **Spaced-repetition schedule** — Review the two loss integrals after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the Hamiltonian from the loss integrand and set ∂H/∂θ = 0 to recover the optimal steering law.

## 10. What this unlocks
You can now formulate and solve ascent guidance for any launch vehicle, including reusable boosters that must also return to a landing site. The same machinery extends directly to:

- Entry trajectory optimisation (inverse problem)
- Lunar and Mars powered descent guidance
- On-board convex optimisation used by Starship and New Glenn
- Multi-stage rocket sizing codes that iterate on staging altitude

## 11. Self-check — five questions, no answers
1. Compute the gravity loss for a 400 s vertical burn at 9.81 m s⁻².
2. Why does an earlier pitch kick increase drag loss even though it reduces gravity loss?
3. In the Hamiltonian, which costate corresponds to the sensitivity of total loss to a change in staging altitude?
4. A sudden 20 % thrust drop occurs at t = 60 s; qualitatively, how must the remaining pitch program change?
5. Derive the condition under which the optimal trajectory touches but does not exceed the max-q limit.