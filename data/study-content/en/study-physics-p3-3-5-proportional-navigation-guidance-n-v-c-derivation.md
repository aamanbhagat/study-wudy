## 1. The one-sentence answer
**Proportional navigation generates a commanded acceleration perpendicular to the line of sight that is exactly proportional to the product of closing velocity and line-of-sight rate: \(a_c = N V_c \dot{\lambda}\).**

A pursuer and target define a line of sight whose angular rate \(\dot{\lambda}\) is measured by a seeker. Any nonzero \(\dot{\lambda}\) means the current velocity vector will miss; the guidance law therefore commands an acceleration that rotates the velocity vector at a rate proportional to \(\dot{\lambda}\). Because the rotation must be achieved against the component of relative motion that is closing the range, the law multiplies by closing speed \(V_c\) and by a dimensionless gain \(N\) chosen so the trajectory converges to collision.

The same law emerges whether one starts from the collision-triangle geometry, from the requirement that the rate of change of bearing remain zero, or from optimal-control theory under constant-speed assumptions. In every case the commanded acceleration lies in the plane normal to the line of sight and is linear in the single measured quantity \(\dot{\lambda}\).

> [!NOTE]
> The single measured quantity \(\dot{\lambda}\) already encodes both the angular error and the time-to-go; no explicit range or time-to-intercept calculation is required.

## 2. Why this matters — concrete and current
Raytheon’s AIM-120D AMRAAM and MBDA’s Meteor both implement proportional navigation with an added boost-sustain phase; the seeker supplies \(\dot{\lambda}\) at 100 Hz while an inertial unit supplies \(V_c\), yielding miss distances below 3 m against 9 g targets at 100 km.  
NASA’s OSIRIS-REx used a proportional-navigation terminal phase during the 2020 touch-and-go rehearsal on Bennu; the onboard LIDAR supplied range-rate for \(V_c\) and the navigation camera supplied \(\dot{\lambda}\), allowing the spacecraft to null lateral velocity to < 2 cm s⁻¹.  
SpaceX’s Dragon 2 autonomous docking to the ISS employs a variant called “proportional navigation with gravity compensation”; the same \(N V_c \dot{\lambda}\) term is retained while the guidance computer subtracts the known gravitational acceleration vector.  
The European Space Agency’s Hera mission (2024) plans to use proportional navigation for the Milani cubesat’s fly-by of Dimorphos, where \(V_c\) changes sign during the hyperbolic passage and \(N\) is switched from 3 to 4 to maintain stability.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Line-of-sight vector \(\mathbf{r}_{LOS}\) and its derivative | Defines \(\lambda\) and \(\dot{\lambda}\)                 |
| Closing velocity \(V_c = -\dot{r}\) | Scales the required rotation rate into linear acceleration |
| Two-dimensional relative motion in polar coordinates | Permits separation of radial and tangential acceleration components |
| Basic vector differentiation in rotating frames | Converts commanded acceleration into inertial-frame thrust direction |

## 4. Building the idea — from intuition to formalism

### Step 1 — Collision requires zero bearing rate
A constant-velocity collision course appears as a fixed bearing on the pursuer’s seeker; any measured rotation of the line of sight signals an impending miss.  
Concrete example: two ships on the open ocean; if the bearing to the other ship stays constant, they will collide.  
Formal statement: the angular velocity of the line-of-sight vector must satisfy
\[
\dot{\lambda} = 0
\]
for collision under constant velocity.  
> [!WARNING]
> Treating \(\dot{\lambda}\) as an angular error rather than a rate produces a pure pursuit law whose trajectories spiral and miss.

### Step 2 — Velocity must be rotated at a rate proportional to \(\dot{\lambda}\)
To drive \(\dot{\lambda}\) to zero the pursuer must add a velocity component perpendicular to the line of sight. The required rotation rate of the velocity vector is therefore proportional to the observed \(\dot{\lambda}\).  
Formal statement: commanded lateral acceleration satisfies
\[
a_c \propto V \dot{\lambda}.
\]

### Step 3 — Replace speed \(V\) by closing speed \(V_c\)
Only the component of relative velocity that reduces range contributes to closing the gap; the tangential component is already accounted for by the seeker measurement. Hence the proportionality constant is written with \(V_c = -\dot{r}\).  
Formal statement:
\[
a_c = N V_c \dot{\lambda}.
\]

### Step 4 — Choose the navigation ratio \(N\)
Differentiating the collision-triangle geometry shows that \(N = 3\) yields a straight-line trajectory against a non-manoeuvring target and finite acceleration against a constant-g target. Higher \(N\) (4–5) improves robustness to manoeuvres at the cost of earlier acceleration saturation.  
Formal statement: optimal-control derivation under constant-speed, constant-target-acceleration assumptions returns
\[
N^* = 3 + \frac{t_{go}^2 a_T}{V_c^2}.
\]

### Step 5 — The law in vector form
The commanded acceleration is applied perpendicular to the instantaneous line of sight:
\[
\mathbf{a}_c = N V_c \dot{\lambda} \,\mathbf{u}_\perp,
\]
where \(\mathbf{u}_\perp\) is the unit vector normal to \(\mathbf{r}_{LOS}\). This is the textbook statement of true proportional navigation.

## 5. Worked examples — every step shown

**Example 1 — Stationary target, head-on approach**  
*Given:* \(V_c = 800\) m s⁻¹, \(\dot{\lambda} = 0.05\) rad s⁻¹, \(N = 3\).  
*Find:* commanded acceleration.  
Step 1: write the law \(a_c = N V_c \dot{\lambda}\).  
*Why:* direct substitution of measured quantities.  
Step 2: insert numbers \(a_c = 3 \times 800 \times 0.05 = 120\) m s⁻².  
*Why:* arithmetic evaluation.  
**120 m s⁻²**  
*Reflection:* zero initial \(\dot{\lambda}\) would have produced zero command; the example isolates the scaling.

**Example 2 — Crossing target, constant velocity**  
*Given:* pursuer speed 600 m s⁻¹, target speed 300 m s⁻¹ crossing at 90°, initial range 5 km, initial \(\lambda = 30^\circ\), \(N = 4\).  
*Find:* \(a_c\) at \(t=0\).  
Step 1: compute closing velocity \(V_c = 600 + 0 = 600\) m s⁻¹ (target velocity perpendicular).  
*Why:* only radial component closes range.  
Step 2: geometry gives \(\dot{\lambda} = (300 \cos 30^\circ)/5000 = 0.052\) rad s⁻¹.  
*Why:* tangential velocity divided by range.  
Step 3: \(a_c = 4 \times 600 \times 0.052 = 124.8\) m s⁻².  
**124.8 m s⁻²**  
*Reflection:* the cosine projection appears naturally from the definition of closing speed.

**Example 3 — Target executing 3 g turn**  
*Given:* same numbers as Example 2 plus target lateral acceleration 29.4 m s⁻².  
*Find:* \(a_c\) required at mid-course.  
Step 1: effective navigation ratio rises to \(N = 3 + t_{go}^2 a_T / V_c^2\).  
*Why:* optimal-control correction term.  
Step 2: \(t_{go} \approx 5\) s yields \(N \approx 3.4\).  
Step 3: \(a_c = 3.4 \times 600 \times 0.052 = 106\) m s⁻².  
**106 m s⁻²**  
*Reflection:* the extra 0.4 in \(N\) compensates exactly for the target’s acceleration.

**Example 4 — Vector implementation in 3-D**  
*Given:* \(\mathbf{r}_{LOS} = (3000,4000,0)\) m, \(\mathbf{v}_{rel} = (-800,0,0)\) m s⁻¹, \(N=3\).  
*Find:* inertial acceleration command.  
Step 1: \(\dot{\lambda} = |\mathbf{r}_{LOS} \times \mathbf{v}_{rel}| / r^2 = 0.08\) rad s⁻¹.  
*Why:* magnitude of cross product over range squared.  
Step 2: unit perpendicular \(\mathbf{u}_\perp = \mathbf{r}_{LOS} \times \mathbf{v}_{rel} / |\ldots|\).  
Step 3: \(\mathbf{a}_c = 3 \times 800 \times 0.08 \,\mathbf{u}_\perp\).  
**Resulting vector (0,192,0) m s⁻²**  
*Reflection:* the cross-product construction automatically places \(\mathbf{a}_c\) normal to the line of sight.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using speed instead of closing speed | Confusing body speed with range-rate               | Always compute \(V_c = -\dot{r}\) from seeker data   |
| Applying acceleration along LOS   | Misreading the perpendicular requirement           | Verify \(\mathbf{a}_c \cdot \mathbf{r}_{LOS} = 0\)   |
| Forgetting sign of \(\dot{\lambda}\)| Treating rate as unsigned angle error              | Retain the signed output of the seeker               |
| Saturating actuators early        | Choosing \(N > 5\) without checking acceleration limit | Run Monte-Carlo envelope before flight               |
| Ignoring gravity bias             | Treating the law as operating in inertial space    | Subtract local gravity before sending command        |
| Using fixed \(N\) against weaving targets | Optimal \(N\) varies with \(t_{go}\) and \(a_T\)   | Schedule \(N\) or augment with target-acceleration estimate |
| Division by zero at \(r=0\)       | Seeker range becomes undefined at impact           | Switch to zero-effort-miss logic inside 50 m         |

## 7. The textbook-precise statement
True proportional navigation (TPN) states that the acceleration command lies in the plane normal to the instantaneous line-of-sight vector and satisfies
\[
\mathbf{a}_c = N V_c \dot{\lambda} \,\hat{\mathbf{e}}_\theta,
\]
where \(V_c = -\dot{r}\), \(\dot{\lambda}\) is the inertial line-of-sight rate, and \(N \geq 3\) is a constant. The law is derived under the assumptions of constant pursuer speed, point-mass kinematics, and perfect seeker information (Zarchan, *Tactical and Strategic Missile Guidance*, 6e, §2.3).

## 8. Visual — diagram or schematic
```text
Target (T)          Pursuer (P)
   • -----------------•          LOS vector r
        \            /
         \          /  λ (inertial angle)
          \        /
           \      /
            \    /
             \  /
              •
          Relative velocity
          component V_c closes range
```
Horizontal axis: range; vertical axis: cross-track. The perpendicular acceleration command rotates the pursuer velocity vector to null \(\dot{\lambda}\).

## 9. The memory technique
**The hook** — imagine a hawk that never looks at the rabbit’s body, only at the angular twitch of its head; every twitch instantly produces a sideways acceleration proportional to how fast the head is turning and how quickly the distance is shrinking.  
**What to overlearn** — \(a_c = N V_c \dot{\lambda}\), \(N=3\) for non-manoeuvring targets, \(V_c = -\dot{r}\).  
**Spaced-repetition schedule** — review the vector form at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — redraw the collision triangle, set \(\dot{\lambda}=0\), differentiate with respect to time, and recover the same linear relation.

## 10. What this unlocks
Proportional navigation is the foundation for every modern homing law. It directly feeds into augmented proportional navigation (APN), optimal guidance with impact-angle constraints, and predictive guidance used in hypersonic boost-glide vehicles. The same \(\dot{\lambda}\) measurement appears in bearings-only SLAM filters and in spacecraft relative-orbit control (Clohessy–Wiltshire targeting).

## 11. Self-check — five questions, no answers
1. A stationary target lies directly ahead; the seeker reports \(\dot{\lambda}=0\). What acceleration command does the law issue, and why is that answer physically correct?  
2. Derive the navigation ratio \(N\) that produces a straight-line trajectory against a constant-velocity target.  
3. Show that replacing \(V_c\) by pursuer speed \(V\) yields pure pursuit and produces a curved trajectory even against a stationary target.  
4. A target executes a sudden 5 g lateral manoeuvre at \(t_{go}=4\) s; compute the minimum \(N\) required to keep miss distance below 5 m if actuator limit is 30 g.  
5. In three-dimensional space the line-of-sight vector and relative velocity are never coplanar with the current velocity vector. How must the two-dimensional law be extended?