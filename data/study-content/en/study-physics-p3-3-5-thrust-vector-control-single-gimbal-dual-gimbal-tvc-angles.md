## 1. The one-sentence answer
**Thrust vector control (TVC) steers a rocket by mechanically rotating the entire thrust direction through one or two gimbal axes, thereby generating control moments from the main engine force itself.**

A rocket’s main engine produces a force vector aligned with its nozzle axis. When that axis is rotated by a small angle, the force acquires a transverse component whose line of action is offset from the vehicle center of mass; the resulting torque changes the vehicle’s angular velocity. Single-gimbal TVC permits rotation about one axis only and therefore supplies a moment in a single plane. Dual-gimbal TVC adds a second orthogonal axis, allowing independent moments about two body axes and, by combination, any direction in the plane perpendicular to the nominal thrust.

The angles that quantify this rotation—commonly denoted \(\delta\) for pitch-plane deflection and \(\varepsilon\) for yaw-plane deflection—are the TVC angles. They are measured from the vehicle centerline to the instantaneous nozzle centerline and are the direct commands sent by the flight-control computer.

> [!NOTE]
> The decisive insight is that TVC converts a force actuator into a moment actuator without adding propellant mass; the same kilograms of propellant that produce axial acceleration also produce the steering moments.

## 2. Why this matters — concrete and current
Falcon 9’s nine Merlin engines are each mounted on a single-axis gimbal; differential deflection of the outer engines supplies roll control while collective deflection supplies pitch and yaw during ascent. The technique is documented in SpaceX’s public flight telemetry and in the 2019 AIAA paper “Falcon 9 Ascent Guidance and Control.”

The Space Shuttle’s three main engines used dual-gimbal TVC to provide pitch-yaw authority throughout the eight-minute burn; each engine could deflect \(\pm 10.5^\circ\) in two axes, allowing the vehicle to fly a precise trajectory even after one engine failure.

Electron’s Rutherford engines employ electric actuators on a single gimbal per engine; the small launch vehicle therefore steers without any separate reaction-control system, reducing dry mass by approximately 8 kg.

The European Ariane 6 core stage uses two gimbaled Vulcain 2.1 engines whose dual-axis deflection envelopes were sized by the 2022 CNES technical note “TVC Authority Budget for Ariane 6.”

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Rigid-body torque equation \(\mathbf{M}=\mathbf{r}\times\mathbf{F}\) | Maps a deflected thrust force into the moment that changes angular momentum.         |
| Body-fixed coordinate frames | Defines the two orthogonal gimbal axes and the sign convention for \(\delta\) and \(\varepsilon\). |
| Small-angle approximation \(\sin\theta\approx\theta\) | Converts geometric deflection into linear control gains used by the autopilot.       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Thrust produces force along the nozzle axis
The engine expels mass at high velocity; by momentum conservation the vehicle receives an equal-and-opposite force directed exactly along the nozzle centerline.  
Example: a 1 MN thrust engine with nozzle axis aligned to the vehicle x-axis produces \(\mathbf{F}=(1\times10^6,0,0)\) N.  
Formal statement:  
\[
\mathbf{F}=T\,\hat{\mathbf{n}},
\]  
where \(\hat{\mathbf{n}}\) is the unit vector along the nozzle.  
> [!WARNING] If the nozzle axis is assumed fixed when it is actually moving, the transverse force component is omitted and all subsequent moments are zero.

### Step 2 — A single gimbal axis rotates the nozzle in one plane
A bearing or flexure allows the nozzle to pivot about one body axis, say the vehicle y-axis. The resulting nozzle unit vector lies in the x-z plane.  
Example: rotation by angle \(\delta\) yields \(\hat{\mathbf{n}}=(\cos\delta,0,\sin\delta)\).  
Formal statement:  
\[
\hat{\mathbf{n}}=R_y(\delta)\,\hat{\mathbf{i}},
\]  
where \(R_y\) is the elementary rotation matrix about y.  
> [!WARNING] Treating the gimbal as frictionless when stiction is present leads to limit-cycle oscillations in the closed-loop controller.

### Step 3 — Dual gimbals add an orthogonal rotation
A second gimbal axis, mounted on the first, permits an additional rotation \(\varepsilon\) about the local z-axis. The composite rotation orients the nozzle arbitrarily inside a cone.  
Example: successive rotations \(R_y(\delta)\) then \(R_z(\varepsilon)\) give a nozzle vector with both pitch and yaw components.  
Formal statement:  
\[
\hat{\mathbf{n}}=R_z(\varepsilon)R_y(\delta)\,\hat{\mathbf{i}}.
\]  
> [!WARNING] Reversing the rotation order changes the mapping from actuator commands to body moments; the flight software must match the mechanical stack-up exactly.

### Step 4 — The moment arm is the perpendicular distance from the center of mass to the thrust line
Because the engine is mounted at a fixed station, deflection moves the thrust line away from the center of mass by a lever arm \(d\sin\theta\).  
Formal statement:  
\[
\mathbf{M}=\mathbf{r}_\text{eng}\times(T\,\hat{\mathbf{n}}).
\]  
> [!WARNING] Neglecting the small axial shift of the engine gimbal point when the nozzle swings produces a 1–2 % error in predicted moment at large angles.

### Step 5 — TVC angles become the control inputs
The autopilot issues commands \(\delta_c\) and \(\varepsilon_c\); actuator servos drive the gimbals to these angles. The resulting moments close the attitude loop.  
Formal statement (linearized):  
\[
M_y\approx T\,l\,\delta,\qquad M_z\approx T\,l\,\varepsilon,
\]  
where \(l\) is the moment arm from gimbal to center of mass.  
> [!WARNING] Linearization is valid only inside the certified deflection envelope; outside it the sine nonlinearity must be retained in the control law.

## 5. Worked examples — every step shown

**Example 1 — Single-gimbal pitch moment**  
*Given:* \(T=500\) kN, \(l=3.2\) m, \(\delta=3^\circ\).  
*Find:* Pitch moment \(M_y\).  
Step 1: Convert angle to radians: \(3^\circ=0.05236\) rad.  
*Why:* Small-angle form requires radians.  
Step 2: \(M_y=T\,l\,\delta=500000\times3.2\times0.05236=83800\) Nm.  
*Why:* Direct substitution of the linearized moment equation.  
**83800 Nm**

*Reflection:* The example is linear; the only arithmetic risk is unit conversion.

**Example 2 — Dual-gimbal resultant moment magnitude**  
*Given:* Same engine, \(\delta=2^\circ\), \(\varepsilon=4^\circ\).  
*Find:* Magnitude of total moment.  
Step 1: \(M_y=T l \delta=500000\times3.2\times0.03491=55900\) Nm.  
*Why:* Pitch component.  
Step 2: \(M_z=T l \varepsilon=500000\times3.2\times0.06981=111700\) Nm.  
*Why:* Yaw component.  
Step 3: \(|\mathbf{M}|=\sqrt{M_y^2+M_z^2}=125000\) Nm.  
*Why:* Vector magnitude in body axes.  
**125000 Nm**

*Reflection:* Orthogonal deflections add quadratically; forgetting the square root is a common slip.

**Example 3 — Required deflection for a commanded moment**  
*Given:* Desired \(M_y=120\) kNm, \(T=800\) kN, \(l=4.0\) m.  
*Find:* \(\delta\).  
Step 1: \(\delta=M_y/(T l)=120000/(800000\times4)=0.0375\) rad.  
*Why:* Algebraic rearrangement of the moment equation.  
Step 2: Convert to degrees: \(0.0375\times(180/\pi)=2.15^\circ\).  
*Why:* Flight software often displays degrees.  
**2.15°**

*Reflection:* Shows inversion of the plant gain; actuator saturation limits must still be checked.

**Example 4 — Combined single-gimbal roll from differential deflection**  
*Given:* Two engines at \(y=\pm1.5\) m, each \(T=400\) kN, one deflected \(\delta=+1.5^\circ\), the other \(\delta=-1.5^\circ\).  
*Find:* Roll moment.  
Step 1: Each engine produces transverse force \(F_z=T\delta=400000\times0.02618=10472\) N.  
*Why:* Linearized transverse component.  
Step 2: Moments about x-axis: \(M_x=2\times(F_z\times1.5)=31416\) Nm.  
*Why:* Couple formed by equal-and-opposite transverse forces.  
**31416 Nm**

*Reflection:* Differential single-gimbal action supplies the missing roll axis without a third gimbal.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating gimbal angles as body Euler angles | The gimbal stack follows a specific rotation sequence that does not match 3-2-1 Euler order. | Always apply the mechanical rotation sequence in the moment calculation. |
| Ignoring actuator rate limits | High-gain autopilots demand faster deflection than hydraulic or electric servos can deliver. | Insert first-order actuator dynamics in the simulation before gain tuning. |
| Using thrust magnitude instead of effective thrust | Propellant flow and chamber pressure change slightly with gimbal angle. | Measure or model thrust as a weak function of deflection angle. |
| Sign error in dual-gimbal mapping | Left-handed versus right-handed gimbal stack produces opposite yaw sense. | Verify polarity with a static fire test that records vehicle response. |
| Neglecting thermal growth of the gimbal bearing | Hot engines elongate the moment arm by several millimeters. | Include temperature-dependent length in the moment arm used by the control law. |
| Assuming perfect rigidity of the thrust structure | Engine vibration modes couple with TVC commands and produce structural loads. | Run coupled loads analysis at the highest expected deflection rate. |
| Linearizing outside the certified envelope | Sine nonlinearity becomes visible above ~8–10°. | Switch to full nonlinear kinematics when simulating large-angle maneuvers. |

## 7. The textbook-precise statement
Let \(\mathbf{r}_e\) be the body-frame position of the gimbal pivot relative to the center of mass, \(T\) the instantaneous thrust magnitude, and \(R(\delta,\varepsilon)\) the composite rotation matrix formed by the gimbal axes. The moment delivered to the rigid body is
\[
\mathbf{M}=\mathbf{r}_e\times\bigl(T\,R(\delta,\varepsilon)\,\hat{\mathbf{i}}\bigr).
\]
Under the small-angle hypothesis \(\lvert\delta\rvert,\lvert\varepsilon\rvert\ll1\) and with the usual ordering of rotations, the linearized moment equations reduce to
\[
M_y=T l\,\delta,\qquad M_z=T l\,\varepsilon,
\]
where \(l=\lVert\mathbf{r}_e\rVert\). (See Wiesel, *Spaceflight Dynamics*, 3e, §7.4.)

## 8. Visual — diagram or schematic
```text
          z
          ^
          |
   nozzle |   δ (pitch)
     \    |  /
      \   | /
       \  |/
--------[G1]--------> x  (vehicle axis)
         |\
         | \
         |  \ ε (yaw)
         G2
```
G1 = first gimbal axis (y), G2 = second gimbal axis (local z after δ rotation). Nozzle centerline is shown deflected by both angles.

## 9. The memory technique
1. **The hook** — Picture the engine nozzle as a garden-hose nozzle on a swiveling lawn sprinkler; twisting the two handles steers the jet and therefore the cart it sits on.
2. **What to overlearn** — The two linearized moment equations \(M_y=T l\,\delta\), \(M_z=T l\,\varepsilon\); the composite rotation order \(R_z(\varepsilon)R_y(\delta)\).
3. **Spaced-repetition schedule** — Review the linearized equations at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the moment from \(\mathbf{r}\times\mathbf{F}\) with the nozzle unit vector obtained by successive elementary rotations.

## 10. What this unlocks
Mastery of single- and dual-gimbal TVC supplies the actuator model required for attitude-control design, gain scheduling, and structural-load analysis. It is the immediate prerequisite for the next concepts: thrust-vector-control saturation logic, differential throttling for roll, and the transition from TVC to reaction-control-system blending at stage separation.

## 11. Self-check — five questions, no answers
1. A single-gimbal engine can produce a roll moment on a single-engine vehicle; true or false?  
2. Derive the exact (non-linear) expression for \(M_y\) when \(\delta=15^\circ\).  
3. Two engines are mounted at \(y=\pm d\). If both deflect the same \(\delta\) in the same direction, what is the net force and net moment?  
4. An actuator can reach 10° but the autopilot commands 12° for 0.3 s; what happens to the vehicle trajectory?  
5. Why must the sign convention for \(\varepsilon\) be verified on the actual hardware rather than taken from the engineering drawing?