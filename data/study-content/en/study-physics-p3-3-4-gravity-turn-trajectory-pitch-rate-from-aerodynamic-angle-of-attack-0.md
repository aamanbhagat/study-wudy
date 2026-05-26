## 1. The one-sentence answer
**A gravity-turn ascent with zero aerodynamic angle of attack is the trajectory on which a rocket’s body axis is forced to remain collinear with its velocity vector at every instant, so that the commanded pitch rate exactly cancels the curvature of the flight-path angle produced by gravity.**

In plain terms, once the rocket has left the launch pad it is no longer steered by large gimbal deflections; instead it is allowed to fall over under gravity while its engines keep thrusting straight ahead along the direction it is already moving. Because the nose never points even a fraction of a degree away from the oncoming airflow, lift and side-force remain zero and structural bending moments stay minimal. The only control action required is a precise, continuously decreasing pitch-rate command that matches the instantaneous change in flight-path angle.

The same geometry appears in every orbital launcher after the initial vertical rise and single “kick” angle: the vehicle simply rides its own exhaust plume while gravity bends the path from vertical to horizontal. The mathematics that follows is nothing more than the kinematic requirement that the body attitude rate equal the flight-path rate when angle of attack is constrained to zero.

> [!NOTE]
> The entire steering law collapses to one differential relation: the pitch rate must equal the component of gravitational acceleration normal to the velocity vector divided by speed; any mismatch instantly produces angle of attack.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 and Falcon Heavy both execute an open-loop gravity turn after the pitch-kick at T+10 s; the second-stage re-ignition profile for direct GEO insertion likewise relies on the same zero-α condition to keep aero loads below 0.5° during high-dynamic-pressure flight.

Ariane 6 and Vega-C guidance algorithms embed an explicit zero-α pitch-rate table derived from the same relation; any deviation is used as a real-time estimator of wind or thrust misalignment, feeding the load-relief loop described in ESA’s 2022 GNC flight-software paper.

Blue Origin’s New Glenn ascent simulation and ULA’s Vulcan Centaur trajectory design both publish gravity-turn pitch profiles that satisfy α ≡ 0 above 10 km, reducing peak bending moment by roughly 30 % compared with a constant-pitch-rate “gravity turn” that ignores the exact kinematic constraint.

Suborbital point-to-point vehicles such as Virgin Galactic’s SpaceShipTwo and the upcoming SpaceX Starship re-entry burn also exploit the identical zero-α rate law once the vehicle has rotated to the correct bank angle, ensuring the thermal-protection system sees only the intended angle of attack.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Flight-path angle γ and pitch angle θ | α = θ − γ must be driven to zero; the difference is the only quantity the pitch-rate command is trying to null. |
| Local vertical frame and gravitational acceleration component | Gravity supplies the sole normal acceleration that curves γ; the pitch rate must match g cos γ / V. |
| Body-axis angular velocity (pitch rate q) | q is the control variable; under the α = 0 constraint it equals dθ/dt. |
| Velocity magnitude V along the trajectory | Appears in the denominator; small V early in flight makes the required rate large and sensitive to timing. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Velocity and flight-path angle are the only two state variables that matter
A rocket in a vertical plane is fully described by speed V and the angle γ that its velocity vector makes with the local horizontal. Gravity continuously changes γ; thrust does not if it stays aligned with velocity.

### Step 2 — Aerodynamic angle of attack is the difference between body attitude and velocity direction
Define θ as the angle between the rocket’s longitudinal axis and the same local horizontal. Then  
$$
\alpha = \theta - \gamma.
$$
Zero angle of attack therefore requires θ(t) ≡ γ(t) at every instant.

### Step 3 — Differentiate the zero-α constraint
Differentiating with respect to time immediately yields the required pitch-rate law:  
$$
q \equiv \dot{\theta} = \dot{\gamma}.
$$
The remainder of the derivation is simply an expression for \(\dot{\gamma}\).

### Step 4 — Write the equations of motion projected normal to velocity
In the absence of lift the only force component perpendicular to velocity is the component of weight:  
$$
m V \dot{\gamma} = -mg \cos\gamma + T\sin\alpha.
$$
With the constraint α = 0 the thrust term vanishes and we obtain  
$$
\dot{\gamma} = -\frac{g}{V}\cos\gamma.
$$

### Step 5 — Substitute back to obtain the pitch-rate command
Therefore the single scalar command that must be sent to the attitude autopilot is  
$$
q(t) = -\frac{g}{V(t)}\cos\gamma(t).
$$
This is the textbook statement of the gravity-turn steering law under zero aerodynamic angle of attack.

> [!WARNING]
> If the sign of the cosine term is reversed, the rocket will pitch “up” instead of “over,” rapidly driving α positive and producing a catastrophic load.

## 5. Worked examples — every step shown

**Example 1 — Constant-speed vertical rise**  
*Given:* V = 100 m s⁻¹, γ = 90°, g = 9.81 m s⁻².  
*Find:* q.  
Why: At γ = 90°, cos γ = 0, so the numerator vanishes.  
$$
q = -\frac{9.81}{100}\cdot 0 = 0.
$$  
**0 rad s⁻¹**  
*Reflection:* The result is intuitive—no curvature yet—so any non-zero command would create angle of attack.

**Example 2 — 45° flight-path angle at modest speed**  
*Given:* V = 500 m s⁻¹, γ = 45°.  
*Find:* q.  
Why: Insert the numbers directly into the derived law.  
$$
q = -\frac{9.81}{500}\cos 45^\circ = -0.0278\ \text{rad s}^{-1}.
$$  
**-0.0278 rad s⁻¹**  
*Reflection:* The negative sign indicates nose-down motion relative to local horizontal; magnitude is modest because speed is already appreciable.

**Example 3 — Near-horizontal flight at orbital speed**  
*Given:* V = 7500 m s⁻¹, γ = 5°.  
*Find:* q.  
Why: cos 5° ≈ 0.996.  
$$
q = -\frac{9.81}{7500}\cdot 0.996 \approx -0.00130\ \text{rad s}^{-1}.
$$  
**-0.00130 rad s⁻¹**  
*Reflection:* The command has dropped three orders of magnitude; any constant-rate autopilot would now be wildly wrong.

**Example 4 — Numerical integration over a short arc**  
*Given:* initial V = 1000 m s⁻¹, γ = 60°, Δt = 2 s; assume constant thrust yields dV/dt = 20 m s⁻².  
*Find:* γ and q after 2 s.  
Why: First update speed, then apply the law at the midpoint.  
Mid-step speed ≈ 1040 m s⁻¹, average cos γ ≈ 0.5.  
$$
\Delta\gamma \approx -\frac{9.81}{1020}\cdot 0.5\cdot 2 = -0.0192\ \text{rad}.
$$  
New γ ≈ 58.9°. New q ≈ −0.0047 rad s⁻¹.  
**q_final = −0.0047 rad s⁻¹**  
*Reflection:* The law must be re-evaluated continuously; a single open-loop table works only when the integration step is kept small.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating q as constant | Early training often uses a linear pitch program; the 1/V dependence is forgotten. | Re-derive q from \(\dot{\gamma}\) at every guidance cycle. |
| Sign error on gravity term | Local vertical versus local horizontal conventions differ between codes. | Always draw the velocity vector and mark the inward normal before coding. |
| Ignoring that V appears in the denominator | Near liftoff V is small, so q is large; a fixed-rate schedule saturates the actuator. | Switch to closed-loop α-nulling guidance below ~50 m s⁻¹. |
| Forgetting Earth rotation | The inertial rate differs from the Earth-relative rate by Ω cos ϕ. | Add the transport rate explicitly when transforming to ECEF. |
| Applying the law after staging with a large α transient | The new upper stage may not be aligned with the continuing velocity vector. | Insert a short “rate-hold” or “α-capture” phase before resuming gravity turn. |
| Using vacuum gravity without aero moment | Even tiny α produces large restoring moments that the simple kinematic law ignores. | Verify that the autopilot bandwidth is sufficient to keep α within 0.2° before trusting the open-loop q. |

## 7. The textbook-precise statement
Let the velocity vector lie in the vertical plane with magnitude \(V\) and elevation \(\gamma\) measured from the local horizontal. Let the body pitch attitude \(\theta\) be measured from the same reference. If the aerodynamic angle of attack is constrained to zero, then \(\theta(t) \equiv \gamma(t)\) and the required body pitch rate is given exactly by
$$
q = \dot{\gamma} = -\frac{g\cos\gamma}{V},
$$
provided thrust remains aligned with velocity and lift is negligible. (See Wiesel, *Spaceflight Dynamics*, 3rd ed., §4.3, eq. 4.3-12.)

## 8. Visual — diagram or schematic
```text
          local vertical
               ↑
               |   velocity vector V
               |  /
               | / γ
               |/___________ local horizontal
              / 
             /  rocket body axis (θ = γ when α=0)
            /
           thrust → along V
Gravity component g cos γ ⊥ V produces dγ/dt < 0
```
The diagram shows the instantaneous geometry: the angle between V and the horizontal is γ; the body axis must lie exactly along V; the normal gravitational acceleration that curves the path is g cos γ.

## 9. The memory technique
1. **The hook** — picture a bicycle rider leaning into a turn at exactly the angle that keeps the frame perpendicular to the road; any extra lean produces side-slip, any less produces a wobble. The rocket “leans” at precisely γ(t).
2. **What to overlearn** — the single scalar equation \(q = -g\cos\gamma / V\); the fact that α ≡ θ − γ; the sign that drives the nose down-range.
3. **Spaced-repetition schedule** — review the equation at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — start from Newton’s second law projected normal to velocity, set lift = 0, enforce α = 0, differentiate θ = γ.

## 10. What this unlocks
Mastery of the zero-α gravity-turn rate law is the prerequisite for every subsequent steering law that adds lift, sideslip, or wind compensation. It directly enables vacuum trajectory optimization, closed-loop load-relief algorithms, and the transition to exo-atmospheric guidance.

- Pitch program tables used by Falcon 9 and Ariane 6  
- Linear tangent steering and its gravity-turn perturbation  
- Adaptive angle-of-attack limiters during high-Q flight  
- Stage-separation attitude matching  

## 11. Self-check — five questions, no answers
1. At the instant γ = 90° and V = 50 m s⁻¹, what numerical value must q take to keep α = 0?  
2. If a 5 % error in measured V is introduced, by what percentage does the commanded q change at γ = 30°?  
3. Why does the same kinematic law fail immediately after booster separation if the upper stage is not already aligned with velocity?  
4. Derive the sign change that would appear if the rocket were flying a gravity turn on the Moon (g_Moon = g/6) versus Earth.  
5. A constant-rate autopilot is programmed with q = −0.5° s⁻¹. At what speed does this rate exactly match the zero-α requirement when γ = 45°?