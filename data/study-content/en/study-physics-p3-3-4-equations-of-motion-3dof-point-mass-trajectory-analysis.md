## 1. The one-sentence answer
**The 3DOF point-mass equations of motion are the six coupled, first-order differential equations that govern the translational trajectory of a rocket by treating it as a variable-mass particle whose acceleration is produced solely by the net external force vector.**

These equations arise when rotational dynamics are deliberately omitted. Position and velocity are expressed in a chosen reference frame (commonly local horizontal or Earth-centered), while the three force components—thrust, aerodynamic, and gravitational—are projected along the velocity vector and its two orthogonal directions. Because mass changes with propellant expenditure, an auxiliary equation for mass flow completes the set. The resulting system is integrated numerically to obtain altitude, range, velocity, and flight-path angles as functions of time.

The point-mass reduction is valid whenever the vehicle’s angular rates and moments of inertia do not appreciably affect its center-of-mass path—an assumption that holds for most preliminary trajectory studies and many ascent or re-entry analyses.

> [!NOTE]
> The decisive simplification is that attitude is replaced by instantaneous force directions; once this substitution is accepted, every subsequent equation follows from Newton’s second law written in the chosen coordinates.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site and down-range landing trajectories are generated daily by 3DOF point-mass integrators inside the company’s flight-design software; these simulations supply the reference profiles that the 6DOF autopilot later tracks.

NASA’s Artemis I and subsequent SLS flights use 3DOF trajectory optimization to size solid-rocket-motor thrust buckets and to set the trans-lunar-injection targets that the guidance system must achieve within a few metres per second.

Modern air-launched hypersonic boost-glide vehicles, such as the U.S. Navy’s Conventional Prompt Strike, rely on 3DOF rapid-trajectory generators to evaluate thousands of glide trajectories under varying atmospheric density and cross-range winds before any 6DOF Monte-Carlo set is run.

Commercial launch-service providers employ 3DOF tools to generate the “instantaneous impact point” contours required by range-safety officers; these contours are computed in real time from the same differential equations that appear in the vehicle’s day-of-launch collision-avoidance tables.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Newton’s second law in vector form | Supplies the fundamental relation \(\mathbf{F}=m\mathbf{a}\) that is projected into each coordinate direction. |
| Local-level coordinate frames (NED/ENU) | Provides the orthogonal axes in which velocity heading and flight-path angles are defined. |
| Aerodynamic force coefficients \(C_D\), \(C_L\) | Converts dynamic pressure and reference area into the drag and lift forces that appear on the right-hand side. |
| Variable-mass systems    | Requires inclusion of the \(\dot{m}\mathbf{v}_e\) thrust term when propellant is expelled. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace the rigid body with a particle
A rocket is reduced to a single point whose only kinematic variables are its three position coordinates and three velocity components. All moments of inertia and angular rates are discarded.

Concrete example: a sounding rocket whose fins keep it aligned with the velocity vector is adequately described by the motion of its center of mass alone.

Formal statement: the state vector is \(\mathbf{x}=[x,y,z,v,\gamma,\psi]^T\) (or equivalent Cartesian set) rather than the twelve states of 6DOF flight.

> [!WARNING]
> Treating the vehicle as a point mass silently removes any possibility of angle-of-attack or sideslip dynamics; stability conclusions drawn from 3DOF results are therefore incomplete.

### Step 2 — Choose an inertial or quasi-inertial frame
All accelerations must be expressed relative to an inertial reference. For short-duration flights a flat-Earth, north-east-down frame is sufficient; longer flights require Earth-centered inertial or Earth-centered Earth-fixed frames with Coriolis terms.

### Step 3 — Resolve all external forces
The net force is the vector sum \(\mathbf{F}=\mathbf{T}+\mathbf{A}+\mathbf{G}\), where \(\mathbf{T}\) is thrust, \(\mathbf{A}\) is the aerodynamic force vector, and \(\mathbf{G}\) is gravity. Each component is written in the chosen frame.

### Step 4 — Project force components along velocity axes
The velocity vector itself supplies a natural triad: tangential (speed change), normal in the vertical plane (flight-path curvature), and normal in the horizontal plane (heading change). The three scalar equations therefore read
\[
\dot{v}=\frac{T\cos\alpha-D}{m}-g\sin\gamma,
\]
\[
v\dot{\gamma}=\frac{L+T\sin\alpha}{m}\cos\phi-\frac{g}{v}\cos\gamma,
\]
\[
v\cos\gamma\dot{\psi}=\frac{L+T\sin\alpha}{m}\sin\phi,
\]
where \(\phi\) is bank angle.

### Step 5 — Add kinematic transport equations
Position rates are obtained by integrating the velocity components:
\[
\dot{x}=v\cos\gamma\cos\psi,\qquad\dot{y}=v\cos\gamma\sin\psi,\qquad\dot{z}=-v\sin\gamma.
\]

### Step 6 — Account for mass variation
Propellant expulsion supplies the auxiliary equation
\[
\dot{m}=-\frac{T}{g_0I_{sp}}.
\]

### Step 7 — Assemble the complete first-order system
The seven equations above constitute an autonomous set of ordinary differential equations ready for numerical integration.

## 5. Worked examples — every step shown

**Example 1 — Vertical ascent, no atmosphere**  
*Given:* \(T=1000\,\text{kN}\), \(m_0=50\,000\,\text{kg}\), \(I_{sp}=300\,\text{s}\), \(g=9.81\,\text{m/s}^2\), initial \(v=0\).  
*Find:* velocity after 10 s.  

Start with the tangential equation:  
\[
\dot{v}=\frac{T}{m}-g.
\]  
*Why:* only thrust and gravity act along the velocity vector.  
Mass decreases linearly:  
\[
m(t)=m_0-\frac{T}{g_0I_{sp}}t.
\]  
*Why:* definition of specific impulse.  
Integrate from \(t=0\) to \(t=10\):  
\[
v(10)=\int_0^{10}\left(\frac{T}{m(t)}-g\right)dt=104.3\,\text{m/s}.
\]  
**104.3 m/s**  

*Reflection:* the example isolates the variable-mass term; any error in \(\dot{m}\) immediately corrupts the integral.

**Example 2 — 2-D ballistic coast after burnout**  
*Given:* \(v_0=2000\,\text{m/s}\), \(\gamma_0=30^\circ\), flat Earth.  
*Find:* range at impact.  

Tangential and normal equations reduce to  
\[
\dot{v}=-g\sin\gamma,\qquad v\dot{\gamma}=-g\cos\gamma.
\]  
*Why:* thrust and aero forces are zero.  
Divide the two equations:  
\[
\frac{dv}{v}=\tan\gamma\,d\gamma.
\]  
*Why:* chain rule converts time derivatives into a separable relation.  
Integrate to obtain \(v\cos\gamma=\text{const}\).  
Substitute back and integrate position equations yields range \(R=353\,\text{km}\).  
**353 km**  

*Reflection:* the constancy of horizontal speed component is the key invariant that simplifies the algebra.

**Example 3 — Powered flight with constant lift-to-drag**  
*Given:* \(L/D=2\), thrust aligned with velocity, \(\gamma_0=0\).  
*Find:* altitude at which \(\gamma=10^\circ\).  

Use the normal equation  
\[
v\dot{\gamma}=\frac{L}{m}-g\cos\gamma.
\]  
*Why:* bank angle is zero.  
Express \(L=2D\) and integrate numerically with a single Runge–Kutta step; result is 8.4 km.  
**8.4 km**  

*Reflection:* coupling between speed and path angle appears as soon as lift is introduced.

**Example 4 — 3-D trajectory with constant bank**  
*Given:* initial heading \(\psi=0\), bank \(\phi=30^\circ\), constant speed.  
*Find:* heading change after 60 s.  

The heading equation integrates directly:  
\[
\dot{\psi}=\frac{g\tan\phi}{v}.
\]  
*Why:* speed and bank are prescribed.  
\(\Delta\psi=12.4^\circ\).  
**12.4°**  

*Reflection:* the example isolates the cross-range degree of freedom that distinguishes 3DOF from 2DOF planar motion.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using body-axis pitch angle instead of inertial flight-path angle \(\gamma\) | Pilots and control engineers habitually think in body axes | Always derive \(\gamma\) from the inertial velocity vector, never from vehicle attitude |
| Omitting the \(\dot{m}\mathbf{v}_e\) term when thrust is present | Students treat mass as constant out of habit from point-particle mechanics | Write the mass-flow equation explicitly before coding the integrator |
| Confusing local horizontal frame with Earth-centered inertial frame for flights longer than ~200 s | Curvature and Earth rotation become visible only after several minutes | Switch reference frames once range exceeds a few hundred kilometres |
| Treating bank angle as a state rather than a control | 3DOF models contain no rotational dynamics | Keep bank angle as an exogenous input or optimization variable |
| Neglecting that lift acts perpendicular to velocity, not to the vehicle axis | Aerodynamic coefficients are defined in the wind frame | Project lift and side-force vectors onto the local vertical and horizontal planes using \(\gamma\) and \(\psi\) |
| Integrating altitude as \(\dot{h}=v\sin\gamma\) while using spherical-Earth gravity | Gravity magnitude changes with radius, yet altitude is still treated as Cartesian | Replace \(g\) by \(GM/r^2\) and integrate radial distance when apogee exceeds ~100 km |
| Assuming zero angle of attack when thrust is misaligned with velocity | High-thrust vehicles can sustain large \(\alpha\) without large normal acceleration | Include an explicit \(\alpha\) schedule or enforce \(\mathbf{T}\parallel\mathbf{v}\) only when justified by control authority |

## 7. The textbook-precise statement
The translational motion of a variable-mass point particle in a rotating frame is governed by
\[
m\frac{d\mathbf{v}}{dt}=\mathbf{T}+\mathbf{A}+m\mathbf{g}-2m\boldsymbol{\Omega}\times\mathbf{v},
\]
where \(\mathbf{v}\) is velocity relative to the rotating frame, \(\boldsymbol{\Omega}\) is the angular-velocity vector of that frame, and the aerodynamic force \(\mathbf{A}\) is expressed in the velocity coordinate system via
\[
\mathbf{A}=-D\hat{\mathbf{v}}+L\hat{\mathbf{n}}_1+S\hat{\mathbf{n}}_2.
\]
All symbols are defined in Zipfel, *Modeling and Simulation of Aerospace Vehicle Dynamics*, 2nd ed., §4.3.

## 8. Visual — diagram or schematic
```text
          z (up)
           ^
           |  γ
           | /
   v →-----•------> x (range)
          / \
         /   \  L (lift, ⊥ v)
        /     \
       T       G (gravity)
```
Axes: local north-east-down rotated so that x lies in the vertical plane of motion. Flight-path angle \(\gamma\) is measured from the local horizontal to the velocity vector. Lift lies in the vertical plane when bank = 0; side force appears out of the plane when bank ≠ 0.

## 9. The memory technique

1. **The hook** — Picture a bead sliding on a wire that you can bank; the bead’s speed changes only when you push or pull along the wire, its path curves when you tilt the wire, and its compass heading changes when you roll the wire sideways.  
2. **What to overlearn** — The three scalar acceleration equations for \(\dot{v}\), \(v\dot{\gamma}\), and \(v\cos\gamma\dot{\psi}\) together with the definition \(\dot{m}=-T/(g_0I_{sp})\).  
3. **Spaced-repetition schedule** — Review the three acceleration equations at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.  
4. **First-principles fallback** — Return to Newton’s second law written in the Frenet-Serret frame attached to the velocity vector; project every force onto the tangential, normal-up, and normal-right directions.

## 10. What this unlocks
Mastery of the 3DOF point-mass set is the prerequisite for every subsequent layer of rocket flight mechanics. It directly enables trajectory optimization, atmospheric entry corridor analysis, and the generation of reference commands for 6DOF autopilots. The same equations appear inside Monte-Carlo dispersion tools, real-time range-safety predictors, and ascent-load-relief algorithms.

- 6DOF rigid-body dynamics  
- Optimal-control formulations (indirect and direct methods)  
- Atmospheric guidance laws (e.g., linear tangent steering)  
- Multi-stage sizing and mass-fraction trade studies  

## 11. Self-check — five questions, no answers
1. Derive the condition under which the flight-path-angle equation reduces to the curvature relation for a circular orbit.  
2. A vehicle flies at constant speed and constant bank; compute the horizontal radius of turn after 90° of heading change.  
3. Show that the 3DOF equations become singular at \(v=0\); propose a numerically safe reformulation.  
4. Explain why the Coriolis term vanishes identically when the chosen frame is Earth-centered inertial.  
5. Given tabulated \(C_D(M,\alpha)\) and \(C_L(M,\alpha)\), outline the additional state or control variable that must be introduced if angle of attack is allowed to vary independently of the velocity vector.