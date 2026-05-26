## 1. The one-sentence answer
**Terminal descent is the final powered phase in which a spacecraft or rocket continuously aligns its velocity vector with a prescribed touchdown trajectory while satisfying strict velocity, attitude, and position constraints at contact.**

In plain terms, the vehicle has already shed most of its orbital speed and is now only a few hundred metres above the surface. Gravity is pulling it downward; engines must fire in exactly the right direction and throttle so that sideways motion disappears and the remaining downward speed drops to a safe value—typically under 2 m/s—before the legs touch. Any residual sideways speed or tilt will topple the vehicle or damage the structure.

The alignment is achieved by solving, at each instant, for the thrust direction that cancels the current velocity error relative to a reference trajectory. The constraints are inequalities on the final state: vertical speed, horizontal speed, pitch angle, and landing-site dispersion must all lie inside tight numerical bounds.

> [!NOTE]
> The decisive insight is that velocity-vector alignment is not merely “pointing at the ground”; it is the continuous nulling of the velocity-to-be-gained vector so that the integrated effect of gravity and thrust lands the vehicle inside the allowable touchdown box.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by executing a three-engine entry burn followed by a single-engine terminal descent; the guidance law aligns the velocity vector to a vertical reference corridor whose final speed is constrained to < 1 m/s vertical and < 0.5 m/s horizontal. Blue Origin’s New Shepard performs an analogous burn on its booster, using the same velocity-alignment principle but with a cold-gas attitude-control system that must keep the vehicle within 5° of vertical at touchdown. NASA’s Perseverance rover used the “skycrane” terminal-descent phase on Mars in which the descent stage maintained zero horizontal velocity while lowering the rover on bridles; any misalignment would have produced a lateral velocity exceeding the 0.75 m/s limit that the rover’s wheels could tolerate. Intuitive Machines’ Odysseus lunar lander (2024) demonstrated that a small residual horizontal velocity of 2–3 m/s at touchdown caused the vehicle to tip; post-flight analysis traced the error to an incomplete velocity-vector alignment in the final 30 m.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Inertial velocity vector | Must be measured and steered continuously                 |
| Thrust-to-weight ratio   | Determines whether hover or pure gravity turn is possible |
| Specific impulse         | Sets propellant cost of velocity changes                  |
| Landing-site dispersion ellipse | Defines allowable final position error                    |
| Rigid-body attitude dynamics | Couples thrust direction to vehicle tilt at touchdown     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the terminal-descent reference frame
The surface-fixed frame has its origin at the intended touchdown point, z-axis upward, x-axis along the nominal approach azimuth. In this frame the vehicle state is position \(\mathbf{r}\) and inertial velocity \(\mathbf{v}\). Gravity acts as \(\mathbf{g} = -g\hat{z}\).

### Step 2 — Form the velocity-to-be-gained vector
At any instant the velocity that must still be removed is \(\mathbf{v}_{go} = \mathbf{v}_{ref}(t) - \mathbf{v}\), where \(\mathbf{v}_{ref}(t)\) is the velocity along the reference trajectory that reaches the touchdown state. The guidance objective is to drive \(\mathbf{v}_{go}\) to zero by the time \(\mathbf{r}\) reaches the surface.

### Step 3 — Thrust direction from velocity alignment
The instantaneous thrust direction is chosen parallel to the current \(\mathbf{v}_{go}\) plus a gravity-compensation term. The commanded acceleration is therefore
\[
\mathbf{a}_c = \frac{\mathbf{v}_{go}}{\Delta t} - \mathbf{g},
\]
where \(\Delta t\) is the time-to-go estimated from altitude and vertical speed. This produces the alignment law.

### Step 4 — Incorporate touchdown velocity constraints
Touchdown requires \(|\mathbf{v}(t_f)| \le v_{\max}\) with \(v_{\max}\) typically 2 m/s vertical and 0.3 m/s horizontal. These are enforced by shaping the reference trajectory so that \(\mathbf{v}_{ref}(t_f)\) already satisfies the inequalities; the alignment law then only has to track that shaped reference.

### Step 5 — Attitude constraint at contact
The vehicle body axis must lie within a cone of half-angle \(\theta_{\max}\) (often 5–8°) of the local vertical. Because thrust is fixed along the body axis, the velocity-alignment command is rate-limited and blended with an attitude-hold term near touchdown.

### Step 6 — Textbook statement of the guidance law
The continuous-time velocity-alignment guidance law for a constant-thrust vehicle is
\[
\mathbf{u}(t) = -\frac{\mathbf{v}_{go}(t)}{|\mathbf{v}_{go}(t)|} \quad\text{subject to}\quad |\mathbf{v}(t_f)| \le v_{\max},\quad \theta(t_f) \le \theta_{\max}.
\]
This is the precise statement used in real-time flight software.

## 5. Worked examples — every step shown

**Example 1 — Vertical descent from hover**
*Given:* Altitude 50 m, \(\mathbf{v} = (0,0,-1)\) m/s, \(g = 9.81\) m/s², \(v_{\max} = 2\) m/s.  
*Find:* Constant thrust direction that nulls velocity.  
Step 1: \(\mathbf{v}_{go} = (0,0,0) - (0,0,-1) = (0,0,1)\).  
*Why:* Subtract current velocity from reference (zero at touchdown).  
Step 2: \(\mathbf{a}_c = (0,0,1)/\Delta t - (0,0,-9.81)\).  
*Why:* Cancel gravity and remove the 1 m/s residual.  
Final answer: **Thrust straight upward.**

*Reflection:* The example is trivial because horizontal velocity is already zero; any misalignment would immediately violate the horizontal-speed constraint.

**Example 2 — Small horizontal residual**
*Given:* \(\mathbf{v} = (0.8,0,-2)\) m/s at 30 m altitude.  
*Find:* Required thrust angle.  
\(\mathbf{v}_{go} = ( -0.8,0,2 )\).  
Direction \(\mathbf{u} = \mathbf{v}_{go}/|\mathbf{v}_{go}|\) yields \(\theta = \tan^{-1}(0.8/2) \approx 22^\circ\).  
**Final answer: 22° tilt from vertical.**

*Reflection:* The angle is modest; the danger lies in forgetting that the same tilt must be removed before touchdown or the attitude constraint is breached.

**Example 3 — Time-to-go estimation**
*Given:* Altitude \(h\), vertical speed \(v_z\).  
Time-to-go \(\Delta t = \frac{-v_z + \sqrt{v_z^2 + 2gh}}{g}\).  
*Why:* Quadratic solution of constant-acceleration kinematics.  
**Final answer: Use this \(\Delta t\) in the acceleration command.**

*Reflection:* Neglecting the square-root term produces an optimistic \(\Delta t\) and leaves residual speed.

**Example 4 — Constraint violation check**
*Given:* Final predicted state \(\mathbf{v}_f = (0.4,0,-1.9)\) m/s, \(\theta_f = 9^\circ\).  
Compare against \(v_{\max} = 2\) m/s, \(\theta_{\max} = 5^\circ\).  
Horizontal speed and attitude both exceed limits.  
**Final answer: Abort or redesign reference trajectory.**

*Reflection:* The numbers show that velocity alignment alone is insufficient; attitude timing must be considered simultaneously.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(\mathbf{v}_{go}\) as position error | Confuses guidance with navigation | Always form \(\mathbf{v}_{go}\) from velocity states first |
| Ignoring gravity bias in \(\mathbf{a}_c\) | Thrust appears to cancel velocity but gravity still accelerates | Explicitly subtract \(\mathbf{g}\) each cycle |
| Using constant \(\Delta t\) near surface | Time-to-go shrinks rapidly; fixed value over-throttles | Recompute \(\Delta t\) at 50–100 Hz |
| Allowing thrust vector to exceed gimbal limits | Alignment command saturates actuator | Blend with attitude-priority mode below 20 m |
| Neglecting slosh or flexure modes | High-gain alignment excites propellant modes | Add notch filters on rate feedback |
| Checking constraints only at predicted \(t_f\) | Sensor noise or wind changes actual \(t_f\) | Run Monte-Carlo dispersion at each guidance cycle |
| Assuming perfect attitude tracking | Real vehicle has finite slew rate | Rate-limit the commanded thrust direction |

## 7. The textbook-precise statement
Terminal-descent velocity-alignment guidance solves the two-point boundary-value problem of driving the vehicle state \((\mathbf{r}(t_f),\mathbf{v}(t_f),\boldsymbol{\theta}(t_f))\) to the set
\[
|\mathbf{v}(t_f)| \le v_{\max},\quad \|\boldsymbol{\theta}(t_f)\| \le \theta_{\max},\quad \mathbf{r}(t_f) \in \mathcal{L},
\]
where \(\mathcal{L}\) is the landing ellipse, by commanding thrust direction
\[
\mathbf{u}(t) = \arg\min_{\mathbf{u}\in\mathcal{U}} \left\| \mathbf{v}(t) + \int_t^{t_f} (\mathbf{u}(\tau) + \mathbf{g})\,d\tau - \mathbf{v}_{ref}(t_f) \right\|.
\]
Reference: Wie, *Space Vehicle Dynamics and Control*, 2e, §8.4.

## 8. Visual — diagram or schematic
```text
          z (up)
           ^
           |   v_go (desired removal)
           |  /
           | / θ
   Thrust  |/____> v (current velocity)
     ^     /
     |    /
     |   /
     |  /
     | /
     |/
  Vehicle body axis
     |
    legs
   surface (x-y plane)
```
The diagram shows the vehicle body axis, current velocity vector \(\mathbf{v}\), and the velocity-to-be-gained vector \(\mathbf{v}_{go}\) that must be aligned with thrust; angle \(\theta\) between thrust and vertical must remain below \(\theta_{\max}\) at contact.

## 9. The memory technique
1. **The hook** — Picture an arrow (velocity) trying to skew sideways while a second arrow (thrust) must stay glued to it until both arrows shrink to a dot on the ground.
2. **What to overlearn** — \(\mathbf{v}_{go} = \mathbf{v}_{ref}-\mathbf{v}\); \(\Delta t = (-v_z + \sqrt{v_z^2+2gh})/g\); \(v_{\max}=2\) m/s, \(\theta_{\max}=5^\circ\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the acceleration command from Newton’s second law applied to the velocity error, adding the gravity vector explicitly.

## 10. What this unlocks
Mastery of terminal-descent alignment supplies the final link in any soft-landing GNC chain and directly enables powered descent guidance for reusable boosters, lunar cargo landers, and Mars sample-return ascent vehicles. The same velocity-to-be-gained formulation appears in divert manoeuvres for hazard avoidance and in the entry-terminal-descent-landing (EDL) sequence of atmospheric entry capsules.

## 11. Self-check — five questions, no answers
1. A vehicle at 100 m altitude has \(\mathbf{v}=(1.5,0,-3)\) m/s. Compute the instantaneous thrust angle required to null horizontal velocity in 8 s while gravity acts.
2. Why does a constant-thrust engine require a time-varying reference trajectory even when the final velocity constraint is fixed?
3. If the attitude slew rate is limited to 5°/s and \(\theta_{\max}=5^\circ\), what is the latest altitude at which the alignment command may still be altered?
4. Show that omitting the gravity term in the acceleration command produces a touchdown velocity error of magnitude \(g\Delta t\).
5. A Monte-Carlo run yields a 3 m/s horizontal residual with probability 0.02. Does this violate the touchdown specification, and what single change to the guidance law would reduce that probability?