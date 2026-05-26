## 1. The one-sentence answer
**Augmented proportional navigation with gravity compensation is the guidance law that commands a missile’s lateral acceleration as N V_c \dot{\lambda} plus an explicit target-acceleration feed-forward term and a deterministic gravity-bias term that cancels the component of gravitational acceleration lying in the homing plane.**

Proportional navigation alone steers so that the line-of-sight rate vanishes. When the target maneuvers or gravity curves the trajectory, the basic law leaves a residual miss distance that grows with time-to-go. Augmentation therefore adds a scaled estimate of target acceleration; gravity compensation subtracts the known gravitational component projected onto the missile’s velocity-perpendicular direction so that the remaining acceleration demand is used entirely for collision-course closure.

The resulting command is therefore independent of the slowly varying gravitational field, allowing the autopilot to treat the problem as if it were occurring in gravity-free space while the missile still follows the correct ballistic arc.

> [!NOTE]
> The single conceptual leap is that gravity is not an unknown disturbance; once its direction and magnitude are known, it can be removed from the guidance equation exactly as one removes a known target acceleration, converting an otherwise time-varying bias into a feed-forward correction.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage boost-back burn uses an augmented proportional-navigation variant with explicit gravity compensation to steer the returning booster onto the down-range landing platform; the guidance law must cancel the 9.81 m s^{-2} field while the vehicle is still supersonic and the engines are throttling.

THAAD and SM-3 Block IIA interceptors employ gravity-compensated APN in the exo-atmospheric mid-course phase; without the bias term the missile would undershoot the predicted intercept point by several kilometres because Earth’s gravity continues to act on both interceptor and target for hundreds of seconds.

Modern air-to-air missiles such as the Meteor and AIM-120D employ a vertical-plane gravity bias inside their augmented PN law during the terminal dive; the compensation removes the steady downward acceleration so that the seeker’s measured line-of-sight rate reflects only the relative motion of an evading aircraft.

Reusable launch vehicles under development by Rocket Lab and Blue Origin incorporate the same compensated law during precision landing burns; the algorithm allows the vehicle to treat gravity as a known, subtractable vector rather than an uncertainty that must be absorbed by extra propellant margin.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Line-of-sight rate \(\dot{\lambda}\) | The fundamental measurement that proportional navigation nulls.                     |
| Closing velocity \(V_c\)       | Scales the commanded acceleration; appears directly in every PN variant.            |
| Time-to-go \(t_{go}\)          | Required to convert acceleration commands into position corrections and to size the gravity bias. |
| Projection of gravity onto the homing plane | The deterministic term that must be cancelled; demands knowledge of local vertical and flight-path angle. |
| Target acceleration estimate   | The quantity that distinguishes augmented from classical PN.                        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pure collision triangle
A constant-velocity pursuer collides with a constant-velocity target if and only if the line-of-sight rate is identically zero.  
Example: two particles on a straight-line collision course maintain a fixed bearing; any measured rotation of the bearing indicates an impending miss.  
Formally, the condition is \(\dot{\lambda}=0\).  
> [!WARNING] Treating \(\dot{\lambda}=0\) as a sufficient condition when accelerations are present produces a slowly diverging miss distance.

### Step 2 — Proportional navigation restores the collision triangle
When \(\dot{\lambda}\) is observed, the pursuer applies an acceleration perpendicular to the line of sight proportional to that rate.  
Example: if \(\dot{\lambda}=0.05\) rad s^{-1} and \(V_c=2000\) m s^{-1}, a gain \(N=3\) yields a lateral acceleration of 300 m s^{-2}.  
The law is
\[
a_m = N V_c \dot{\lambda}.
\]

### Step 3 — Target acceleration breaks the triangle
A maneuvering target injects an extra component into the relative acceleration. The line-of-sight rate therefore contains both pursuer and target contributions.  
Example: a target pulling 5 g perpendicular to the line of sight adds a term that classical PN only partially cancels.  
Augmentation therefore adds a feed-forward term:
\[
a_m = N V_c \dot{\lambda} + \frac{N}{2} a_t.
\]

### Step 4 — Gravity acts as a known bias acceleration
Gravity is neither target nor pursuer maneuver; it is an external, perfectly known vector field. Its component perpendicular to the current velocity must be removed from the guidance command so that the remaining demand is used solely for collision.  
The gravity bias projected onto the acceleration-command direction is
\[
g_\perp = g \cos(\gamma),
\]
where \(\gamma\) is the angle between local vertical and the velocity vector.

### Step 5 — Assembling the compensated law
Adding the gravity bias with opposite sign yields the textbook statement of augmented proportional navigation with gravity compensation:
\[
a_m^c = N V_c \dot{\lambda} + \frac{N}{2} a_t - g_\perp.
\]
This is the required terminal guidance equation.

## 5. Worked examples — every step shown

**Example 1 — Stationary target, vertical plane**  
*Given:* \(V_c=1500\) m s^{-1}, \(\dot{\lambda}=0.02\) rad s^{-1}, \(N=3\), \(g=9.81\) m s^{-2}, \(\gamma=30^\circ\).  
*Find:* commanded acceleration.  
Step 1: classical PN term \(3\times1500\times0.02=90\) m s^{-2}.  
*Why:* direct substitution into the proportional term.  
Step 2: gravity component \(9.81\cos30^\circ=8.5\) m s^{-2}.  
*Why:* projection of gravity onto the perpendicular-to-velocity direction.  
Step 3: subtract bias because gravity is already acting.  
Final command: \(90-8.5=81.5\) m s^{-2}.  
**81.5 m s^{-2}**  
*Reflection:* the only non-obvious move is recognizing that gravity must be subtracted, not added.

**Example 2 — Non-maneuvering target with horizontal flight path**  
*Given:* same numbers except \(\gamma=0^\circ\).  
Gravity component becomes \(9.81\) m s^{-2}.  
Command: \(90-9.81=80.19\) m s^{-2}.  
**80.19 m s^{-2}**  
*Reflection:* when the trajectory is horizontal the full gravitational acceleration appears in the bias.

**Example 3 — Target pulling 2 g normal acceleration**  
*Given:* previous data plus \(a_t=19.62\) m s^{-2}.  
Augmented term: \((3/2)\times19.62=29.43\) m s^{-2}.  
Total before gravity: \(90+29.43=119.43\) m s^{-2}.  
Subtract gravity bias 8.5 m s^{-2}.  
**110.93 m s^{-2}**  
*Reflection:* the factor \(N/2\) appears only on the target term; gravity remains a separate deterministic subtraction.

**Example 4 — Full three-dimensional case with estimated time-to-go**  
*Given:* \(V_c=1200\) m s^{-1}, \(\dot{\lambda}=0.015\) rad s^{-1}, \(N=4\), \(a_t=30\) m s^{-2} (estimated), \(\gamma=45^\circ\), \(t_{go}=8\) s.  
PN term: \(4\times1200\times0.015=72\) m s^{-2}.  
Augmented term: \((4/2)\times30=60\) m s^{-2}.  
Gravity bias: \(9.81/\sqrt{2}\approx6.94\) m s^{-2}.  
Command: \(72+60-6.94=125.06\) m s^{-2}.  
**125.06 m s^{-2}**  
*Reflection:* the same structure holds in three dimensions once the perpendicular component of gravity is obtained by vector projection.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Adding gravity instead of subtracting | Intuition that “more acceleration is needed to fight gravity” | Remember gravity already accelerates the missile; the law only needs to cancel its effect on the relative geometry. |
| Using body-axis gravity instead of velocity-perpendicular component | Confusion between body frame and line-of-sight frame | Always resolve gravity into the plane normal to the current velocity vector before subtracting. |
| Treating estimated \(a_t\) as perfect | Sensor noise or latency makes \(a_t\) uncertain | Apply a fading-memory filter to \(a_t\) and reduce effective navigation gain when uncertainty is high. |
| Ignoring gravity rotation during high-bank maneuvers | Local vertical changes in the inertial frame | Update the gravity projection at each guidance cycle using the latest attitude quaternion. |
| Applying the bias only in the terminal phase | Belief that gravity matters only near impact | Gravity acts throughout; enable compensation as soon as the seeker is locked. |
| Forgetting that \(N\) multiplies only the \(\dot{\lambda}\) and \(a_t\) terms | Algebraic oversight | Write the command explicitly as three separate vector terms before coding. |
| Using constant \(g\) at high altitude | Neglect of the inverse-square law | Replace \(g\) by \(\mu/r^2\) when altitude exceeds ~100 km. |

## 7. The textbook-precise statement
Let \(\mathbf{r}_{m/t}\) be the relative position vector, \(\mathbf{v}_{m/t}\) the relative velocity, \(V_c=-\dot{r}\), \(\boldsymbol{\lambda}\) the line-of-sight unit vector, and \(\mathbf{a}_t\) the inertial target acceleration. The gravity-compensated augmented proportional-navigation acceleration command, expressed in the line-of-sight frame, is
\[
\mathbf{a}_m = N V_c (\boldsymbol{\lambda}\times\dot{\boldsymbol{\lambda}}) + \frac{N}{2}\mathbf{a}_t^\perp - \mathbf{g}^\perp,
\]
where the superscript \(\perp\) denotes the component orthogonal to the pursuer velocity. This is the form given in Zarchan, *Tactical and Strategic Missile Guidance*, 6th ed., §7.4, under the heading “Augmented Proportional Navigation with Gravity Bias.”

## 8. Visual — diagram or schematic
```
Target
   •
    \  LOS
     \   λ
      \ 
       • Missile
        \
         \ v_m
          \
           ↓ g (local vertical)
```
The diagram shows the line-of-sight vector, the missile velocity vector, and the local vertical. The gravity component perpendicular to velocity lies in the plane of the paper and is subtracted from the commanded acceleration.

## 9. The memory technique
1. **The hook** — Picture gravity as a steady “wind” that is already pushing the missile; the guidance law merely cancels that wind so the remaining effort can be used to steer at the target.  
2. **What to overlearn** — The three-term command \(N V_c\dot{\lambda} + (N/2)a_t - g_\perp\) and the projection rule for \(g_\perp\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the collision-triangle condition \(\dot{\lambda}=0\), add relative acceleration terms for both target and gravity, then solve for the required missile acceleration.

## 10. What this unlocks
Mastery of gravity-compensated APN is the prerequisite for every modern terminal-guidance law that must operate inside a gravitational field, including predictive guidance, differential games, and model-predictive control formulations used on precision munitions and reusable boosters.

- Optimal guidance with quadratic drag  
- Impact-angle control extensions  
- Multi-vehicle salvo guidance  
- Kalman-filter-based target acceleration estimation  

## 11. Self-check — five questions, no answers
1. Derive the gravity-bias term for a missile flying at flight-path angle \(\gamma\) when the acceleration command is expressed in the body frame rather than the line-of-sight frame.  
2. A target executes a 3 g weave at 1 Hz; show how the gravity compensation term remains unaffected while the augmented term must track the weave.  
3. Compute the steady-state miss distance that appears if the gravity bias is omitted for a 10 s flight with \(N=3\).  
4. In which coordinate frame must the gravity vector be resolved before subtraction, and why does the choice matter for a rolling airframe?  
5. Demonstrate that the compensated law reduces exactly to classical proportional navigation when both target acceleration and gravity are zero.