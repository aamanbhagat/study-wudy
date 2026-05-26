## 1. The one-sentence answer
**An open-loop pitch program is a precomputed time- or velocity-based schedule of commanded pitch angle that tilts a vertically launched rocket toward its down-range flight path without using real-time attitude feedback.**

The schedule begins with a short vertical rise to clear the launch tower, after which the vehicle commands a gradual reduction in pitch angle. Because the commands are fixed before liftoff, the rocket follows the identical angular history on every flight unless an external abort intervenes. The resulting trajectory trades a small amount of gravity loss for a large reduction in aerodynamic loads and structural bending moments.

The open-loop nature is deliberate: during the first 10–20 s the vehicle is still slow, the atmosphere is dense, and sensor noise or wind gusts could produce unsafe commands if feedback were active. A stored polynomial or table therefore provides the only reference.

> [!NOTE]
> The single most important insight is that the pitch program does not steer toward a target; it merely starts the rocket falling gently down-range so that gravity itself can continue the turn once dynamic pressure drops.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first stage executes a three-segment open-loop pitch profile (vertical rise, 8°/s pitch rate, then constant pitch hold) for the first 25 s; the same profile flies on every mission regardless of payload mass or wind.

NASA’s Space Launch System uses a velocity-triggered pitch table stored in the flight computer; the table was validated on Artemis I and will be reused on Artemis II–V with only minor table updates.

Ariane 6’s solid boosters ignite under an open-loop pitch law that limits angle of attack to 4° during maximum dynamic pressure; the law is frozen 18 months before launch to satisfy range-safety requirements.

The same technique appears in small-launch-vehicle startups (Rocket Lab Electron, Firefly Alpha) where mass and power budgets preclude high-rate closed-loop guidance until after staging.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Inertial velocity and attitude | The pitch command is expressed in the launch inertial frame; without it the schedule has no reference axis. |
| Thrust-vector-control (TVC) authority | The schedule assumes the engines can produce the commanded pitch rate; TVC saturation violates the assumption. |
| Dynamic pressure \(q\)   | The open-loop window is chosen so that \(q\alpha\) stays below structural limits; \(q\) must be understood quantitatively. |
| Gravity turn equations   | Once the initial pitch angle is set, gravity provides the continuing torque; the governing ODEs are required for later steps. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Vertical rise clears the tower
The rocket lifts off with zero pitch angle and climbs straight up for 5–8 s.  
Example: a 50 m tall vehicle needs ~6 s at 25 m s⁻¹ average speed to clear the lightning mast.  
The constraint is written  
\[
t_{\text{vr}} \ge \frac{h_{\text{tower}} + L_{\text{vehicle}}}{v_z(0)}.
\]
> [!WARNING]
> Starting the pitch maneuver too early produces a side force that can drive the vehicle into the tower.

### Step 2 — Initiate constant-rate pitch-over
A linear pitch ramp \(\theta(t)=\theta_0-\dot{\theta}t\) is commanded.  
For Falcon 9, \(\dot{\theta}=8^\circ\) s⁻¹ for 3–4 s.  
The kinematic relation is  
\[
\theta(t)=\theta_0-\int_0^t\omega_y(\tau)\,d\tau,
\]
where \(\omega_y\) is the body pitch rate delivered by TVC.

### Step 3 — Switch to open-loop table or polynomial
After the initial ramp the vehicle follows a stored function \(\theta_c(t)\) or \(\theta_c(v)\).  
No attitude error feedback is closed; the autopilot simply tracks the stored command with a high-gain rate loop.

### Step 4 — Aerodynamic angle of attack appears
With pitch angle \(\theta\) and flight-path angle \(\gamma\) both nonzero,  
\[
\alpha=\theta-\gamma.
\]
Because \(\gamma\) lags \(\theta\) under gravity, \(\alpha\) grows; the schedule is shaped so that \(q\alpha\) peaks below the design limit.

### Step 5 — Hand-off to gravity turn or closed-loop guidance
When dynamic pressure falls below ~5 kPa the stored schedule ends and either a pure gravity-turn law or a closed-loop guidance algorithm takes over. The open-loop segment is therefore only the first 15–30 s of flight.

## 5. Worked examples — every step shown

**Example 1 — Minimum pitch angle after 10 s**  
*Given:* vertical rise 6 s, constant pitch rate 5° s⁻¹ for 4 s.  
*Find:* pitch angle at \(t=10\) s.  
Step 1: \(t=0\) to 6 s, \(\theta=90^\circ\).  
*Why:* definition of vertical rise.  
Step 2: from \(t=6\) to 10 s, \(\Delta\theta=-5^\circ\times4=-20^\circ\).  
*Why:* constant-rate integration.  
**Answer: \(\theta(10)=70^\circ\)**  
*Reflection:* The arithmetic is trivial; the trap is forgetting that the rate starts only after the vertical-rise timer expires.

**Example 2 — Angle-of-attack estimate**  
*Given:* at \(t=15\) s, \(\theta=65^\circ\), inertial velocity magnitude 180 m s⁻¹, flight-path angle computed from \(\gamma=\arcsin(v_z/v)=58^\circ\).  
*Find:* \(\alpha\).  
Step 1: \(\alpha=\theta-\gamma=65^\circ-58^\circ=7^\circ\).  
*Why:* definition of aerodynamic angle of attack in 2-D pitch plane.  
**Answer: \(\alpha=7^\circ\)**  
*Reflection:* The example isolates the kinematic subtraction that later couples to loads.

**Example 3 — Dynamic-pressure constraint check**  
*Given:* \(q=35\) kPa, \(\alpha=5^\circ\), allowable \(q\alpha\le200\) kPa·deg.  
*Find:* pass/fail.  
Step 1: \(q\alpha=35\times5=175<200\).  
*Why:* product is the bending-moment proxy.  
**Answer: pass**  
*Reflection:* Shows why the schedule must be tuned to the \(q\) peak.

**Example 4 — Velocity-triggered table switch**  
*Given:* table ends at \(v=250\) m s⁻¹; measured speed at \(t=22\) s is 248 m s⁻¹.  
*Find:* continue or switch.  
Step 1: 248 < 250, remain in open-loop.  
*Why:* velocity trigger prevents early exit under headwind.  
**Answer: remain open-loop**  
*Reflection:* Velocity trigger is robust to mass variation; time trigger is not.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Starting pitch rate while still on the pad | Operator confuses “lift-off” with “clear tower” | Enforce separate vertical-rise timer verified by break-wire or GPS height |
| Using a time-based table on a throttlable engine | Burn time changes with propellant temperature | Replace time triggers with inertial-velocity triggers |
| Ignoring wind bias in \(\alpha\) prediction | Monte-Carlo runs omit measured launch-day wind | Fold 95th-percentile wind profile into pre-flight loads cycle |
| Commanding pitch beyond TVC deflection limit | Table generated for max-thrust only | Run table through 6-DOF simulation at min and max thrust |
| Assuming \(\gamma=\theta\) at pitch initiation | Neglects 1–2 s of gravity-induced lag | Integrate equations of motion for first 5 s before freezing table |
| Reusing a table across different launch sites | Different tower heights and rotation rates | Re-derive vertical-rise duration and initial azimuth for each pad |
| Freezing table after final trajectory cycle | Ignores day-of-launch wind update | Allow a last-minute bias term (≤1°) uploaded 10 min before launch |

## 7. The textbook-precise statement
An open-loop pitch program is a prescribed function \(\theta_c(t)\) or \(\theta_c(v)\) belonging to the admissible set  
\[
\theta_c\in C^1([0,t_f]),\quad|\dot{\theta}_c|\le\dot{\theta}_{\max},\quad q(t)\alpha(t)\le(q\alpha)_{\text{limit}},
\]
where the vehicle dynamics obey the planar point-mass equations  
\[
\dot{v}=\frac{T\cos\alpha-D}{m}-g\sin\gamma,\qquad v\dot{\gamma}=\frac{T\sin\alpha+L}{m}-g\cos\gamma+\frac{v^2}{r}\cos\gamma
\]
with initial conditions \(v(0)=0\), \(\gamma(0)=90^\circ\). No feedback correction is applied to \(\theta_c\) during \([0,t_f]\). (See J. E. Prussing & B. A. Conway, *Orbital Mechanics*, 2e, §7.4, “Open-Loop Ascent Guidance”.)

## 8. Visual — diagram or schematic
```text
Altitude (km)
  ^
  |                                   gravity turn
  |                              \     begins here
  |                               \
  |                                \   closed-loop
  |                                 \  guidance
  |                                  \
  |  vertical rise   pitch ramp       \
  |      |              /              \
  |      |            /                 \
  |______|__________/____________________\______> Down-range (km)
         t=0     t=6s   t=10s   t=25s
Pitch angle: 90°   90°→70°   70°→50°   50° hold
```
Labels: vertical axis = altitude, horizontal = ground range; three trajectory segments shown with pitch-angle annotations at breakpoints.

## 9. The memory technique
1. **The hook** — picture the rocket as a pencil balanced on your finger; you give it one deliberate tilt and then let gravity finish the fall.  
2. **What to overlearn** — vertical-rise timer, maximum allowable \(q\alpha\), and the velocity trigger that ends the open-loop segment.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — re-derive the two planar equations of motion from Newton’s second law in tangential–normal coordinates, then insert the kinematic constraint \(\theta=\gamma+\alpha\).

## 10. What this unlocks
Mastery of the open-loop pitch program is the prerequisite for understanding both the subsequent gravity-turn arc and the transition to closed-loop guidance algorithms.  

- Gravity-turn equations become solvable once the initial \(\theta\) and \(\gamma\) are known.  
- Load-relief and trajectory-shaping algorithms (e.g., powered explicit guidance) inherit the final state vector produced by the pitch program.  
- Day-of-launch wind biasing and collision-avoidance steering both operate on top of the same stored table.

## 11. Self-check — five questions, no answers
1. Why does a velocity-triggered table tolerate ±3 % thrust variation while a time-triggered table does not?  
2. A launch-day wind shear increases \(\alpha\) by 2° at max-\(q\). By how much must the pitch schedule be biased to restore the original \(q\alpha\) margin?  
3. Derive the first-order differential equation that relates commanded pitch rate to the rate of change of flight-path angle during the open-loop segment.  
4. If the vehicle length increases by 10 m, what single parameter in the pitch program must change, and in which direction?  
5. Under what condition does an open-loop pitch program become actively dangerous rather than merely sub-optimal?