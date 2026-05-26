## 1. The one-sentence answer
**A variable-mass system requires explicit accounting for the momentum carried by mass entering or leaving the system, which produces an additional thrust force proportional to the relative velocity of that mass.**

At any instant a rocket and its remaining fuel form a single object of mass \(m\) moving at velocity \(v\). In the next instant a small parcel of fuel is expelled backward at exhaust speed \(u\) relative to the rocket. The parcel carries away momentum that must be subtracted from the total before the rocket’s new velocity can be found. Because the mass of the rocket itself has changed, the usual statement \(F = ma\) is insufficient; the change in momentum of the whole isolated system must be written and then differentiated with respect to time.

The resulting equation isolates the rocket’s acceleration as the sum of external forces plus the term \(u\,dm/dt\), where the sign of \(dm/dt\) is negative for a rocket losing mass. This term is not an external force; it arises solely from the bookkeeping of momentum leaving the system.

> [!NOTE]
> The thrust \(u\,dm/dt\) is zero if the exhaust velocity relative to the rocket is zero, even when mass is leaving; only the relative velocity converts departing mass into forward momentum.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery relies on real-time integration of the variable-mass thrust equation to predict burnout velocity and landing propellant margin; the same equation supplies the throttle schedule that keeps the stage within structural limits while its mass drops by more than 90 percent.

NASA’s Psyche mission uses Hall-effect ion thrusters whose specific impulse exceeds 4 km s⁻¹; mission designers solve the variable-mass equation iteratively to trade flight time against delivered payload mass because the spacecraft loses only grams per second yet still reaches asteroid 16 Psyche in 2026.

In semiconductor manufacturing, atomic-layer deposition tools eject precursor molecules from a nozzle at controlled relative velocities; the same momentum-balance derivation predicts the recoil force on the wafer stage and is used to compensate stage motion to nanometer precision.

Natural analogs appear in the propulsion of squid and jellyfish, where periodic ejection of water produces thrust pulses whose magnitude follows the identical \(u\,dm/dt\) relation; biologists compare these pulses with rocket data to quantify energetic efficiency across biological and engineered variable-mass systems.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear momentum \(p = mv\) | Provides the conserved quantity once mass crosses the system boundary |
| Newton’s second law in momentum form \(F_\text{ext} = dp/dt\) | Supplies the starting point before mass variation is introduced |
| Relative velocity        | Determines the momentum flux carried by departing or arriving mass |
| Infinitesimal increments \(dt\), \(dm\) | Required to convert discrete mass ejection into a differential equation |

## 4. Building the idea — from intuition to formalism

### Step 1 — Isolate the system at one instant
The rocket plus all fuel still inside it is treated as a closed system at time \(t\). Its total momentum is simply \(p = m v\).

A concrete example: a 10 000 kg rocket moving at 2000 m s⁻¹ has momentum 20 000 000 kg m s⁻¹.

The formal statement is
\[
p(t) = m(t) v(t).
\]

> [!WARNING]
> Treating the rocket and the fuel about to be ejected as already separate objects at time \(t\) introduces an external force that does not exist.

### Step 2 — Advance by an infinitesimal interval
At \(t + dt\) the rocket has mass \(m + dm\) (where \(dm < 0\)) and velocity \(v + dv\). The ejected parcel has mass \(-dm\) and absolute velocity \(v - u\), with \(u > 0\) the rearward exhaust speed relative to the rocket.

The formal momentum at the later instant is therefore
\[
p(t+dt) = (m + dm)(v + dv) + (-dm)(v - u).
\]

### Step 3 — Enforce momentum conservation
If no external forces act, \(p(t + dt) = p(t)\). Expanding and discarding the second-order term \(dm\,dv\) yields
\[
m\,dv + u\,dm = 0.
\]

> [!WARNING]
> Omitting the relative velocity \(u\) and writing the exhaust velocity as \(v\) instead of \(v - u\) produces a thrust term of the wrong sign and magnitude.

### Step 4 — Convert to a rate equation
Divide the relation by \(dt\) and take the limit \(dt \to 0\):
\[
m \frac{dv}{dt} = -u \frac{dm}{dt}.
\]
Because \(dm/dt < 0\) for a rocket, the right-hand side is positive and forward acceleration results.

### Step 5 — Restore external forces
When gravity or drag acts, the external force appears on the left side:
\[
m \frac{dv}{dt} = F_\text{ext} + u \left(-\frac{dm}{dt}\right).
\]
This is the preview form of the rocket equation.

## 5. Worked examples — every step shown

**Example 1 — No external force, constant exhaust speed**  
*Given:* \(m_0 = 1000\) kg, \(u = 3000\) m s⁻¹, fuel mass 800 kg ejected at constant rate.  
*Find:* velocity after all fuel is burned.  

Start from the differential relation  
\[
m\,dv = -u\,dm.
\]  
*Why:* momentum balance with no external force.  
Integrate both sides  
\[
\int_{v_0}^{v} dv = -u \int_{m_0}^{m_f} \frac{dm}{m}.
\]  
*Why:* separation of variables, \(m_f = 200\) kg.  
Result  
\[
v - v_0 = -u \ln\left(\frac{m_f}{m_0}\right) = 3000 \ln 5 \approx 4829\,\text{m s}^{-1}.
\]  
**4829 m s⁻¹**  

*Reflection:* The logarithmic dependence appears only after integration; every intermediate mass must be retained inside the logarithm.

**Example 2 — Constant gravity, vertical launch**  
*Given:* same rocket, \(g = 9.8\) m s⁻² downward.  
*Find:* burnout velocity.  

Add gravity:  
\[
m\,dv = -u\,dm - mg\,dt.
\]  
*Why:* external force contributes an extra term.  
Divide by \(dt\) and integrate numerically or analytically for constant \(\dot{m}\). The velocity increment is reduced by the gravity loss term \(g t_b\), where \(t_b\) is burn time.

**Example 3 — Mass arriving (rain falling into cart)**  
*Given:* cart of mass \(M\) moving at \(v\), rain falls vertically at rate \(\mu\) with horizontal velocity 0.  
*Find:* force needed to keep speed constant.  

Momentum influx carries zero horizontal momentum, so  
\[
F = -u_\text{rel}\mu = 0,
\]  
hence no force is required.

**Example 4 — Two-stage rocket**  
Treat each stage as a separate variable-mass segment; apply the integrated rocket equation to the first stage, then restart with new \(m_0\) and new \(u\) for the second stage.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using absolute exhaust velocity instead of relative | Confusing lab frame with rocket frame       | Always define \(u\) as velocity of exhaust relative to rocket |
| Writing \(dm/dt > 0\) for rockets | Sign convention for mass loss not internalized | Adopt the convention \(dm/dt < 0\) for rockets and keep the minus sign explicit |
| Treating thrust as an external force | Misreading the origin of the \(u\,dm/dt\) term | Derive the term from momentum balance each time until the bookkeeping feels natural |
| Applying \(F = ma\) directly to variable mass | Textbooks usually assume constant mass      | Replace \(ma\) with \(d(mv)/dt\) and expand correctly |
| Ignoring that \(u\) may vary with time | Real engines throttle or change mixture     | Keep \(u = u(t)\) inside the integral when necessary |
| Forgetting that arriving mass also contributes thrust | Symmetric treatment of mass gain and loss omitted | Write the general influx/outflux expression before specializing to rockets |
| Confusing system boundary          | Including or excluding fuel parcel inconsistently | Draw the control volume at each instant and label mass crossing the boundary |

## 7. The textbook-precise statement
For a system whose mass \(m(t)\) may change, the momentum balance reads
\[
\frac{d}{dt}\bigl(m(t)v(t)\bigr) = F_\text{ext} + \vec{u}\cdot\frac{dm}{dt}\Big|_{\text{in}} - \vec{u}\cdot\frac{dm}{dt}\Big|_{\text{out}},
\]
where \(\vec{u}\) is the velocity of the mass flux relative to the system. When mass leaves at relative speed \(u\) (rearward) and no mass enters,
\[
m\frac{dv}{dt} = F_\text{ext} + u\left(-\frac{dm}{dt}\right).
\]
This is equation (9-73) in Halliday, Resnick & Walker, *Fundamentals of Physics*, 12th ed., 2021.

## 8. Visual — diagram or schematic
```text
          ↑ v + dv          (rocket after dt)
        /\
       /  \   m + dm
      /    \
     /------\
    |  fuel  |   ← system boundary at t+dt
     \------/
        |
        |   -dm at velocity v - u  (exhaust parcel)
        v
```
Horizontal axis points right (forward). The exhaust parcel is shown leaving the rear with relative speed \(u\).

## 9. The memory technique
1. **The hook** — Picture a firehose recoiling in your hands; the harder the water leaves backward, the harder you are pushed forward—the same recoil, scaled to orbital speeds.  
2. **What to overlearn** — \(m\,dv = -u\,dm\) and the definition \(u \equiv v_\text{exhaust} - v_\text{rocket}\).  
3. **Spaced-repetition schedule** — Review the differential relation after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Redraw the two instants \(t\) and \(t+dt\), write the four momentum terms, set \(p(t+dt)=p(t)\), discard \(dm\,dv\), divide by \(dt\).

## 10. What this unlocks
The preview directly supplies the differential form needed for the Tsiolkovsky rocket equation, multi-stage optimization, and the inclusion of gravity and drag losses. It also prepares the ground for control-volume analysis in fluid mechanics and for the momentum flux terms that appear in electromagnetic rocket engines and laser sails.

- Next: full integration to \(\Delta v = u\ln(m_0/m_f)\)
- Next: gravity-turn trajectories and ascent optimization
- Next: relativistic variable-mass systems (photon rockets)

## 11. Self-check — five questions, no answers
1. A rocket ejects 2 kg of fuel at 2500 m s⁻¹ relative speed while its mass is 500 kg. What instantaneous acceleration results in free space?  
2. Why does the same rocket equation give zero thrust when the nozzle is closed even though fuel is still being “pumped”?  
3. A conveyor belt collects sand falling vertically at rate \(\mu\). If the belt moves at constant speed \(v\), what horizontal force must the motor supply?  
4. Identify the sign error in the following student statement: “Because the rocket loses mass, \(dm/dt < 0\), so thrust \(u\,dm/dt\) points backward.”  
5. Starting from the general influx/outflux expression, derive the thrust term for a ramjet that scoops stationary air and ejects it at relative speed \(u\) rearward.