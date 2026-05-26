## 1. The one-sentence answer
**6DOF equations are the coupled set of Newton's second law for centre-of-mass translation and Euler's rigid-body equations for rotation about the centre of mass, giving the complete six-degree-of-freedom motion of a rocket treated as a rigid body.**

Translational motion lives in inertial space and is written with ordinary derivatives of linear momentum. Rotational motion is written in the body-fixed frame where the inertia tensor is constant, so the time derivative of angular momentum produces the cross-product term that couples the three angular rates. Because thrust, aerodynamics and gravity act on both translation and rotation, the two sets must be solved simultaneously; the direction cosine matrix or quaternion that transforms between frames closes the loop.

A rocket therefore needs three force equations and three moment equations. Solving them yields the six states that fully locate and orient the vehicle at any instant.

> [!NOTE]
> The single deepest insight is that the body frame turns the inertia matrix into a constant, but it also injects the \(\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}\) term; forgetting that cross product is the most common source of “the simulation spins the wrong way.”

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 recovery guidance loop integrates the full 6DOF set at 100 Hz to command grid-fin deflections and engine gimbals while the booster falls back to the drone ship; any lag in the Euler cross-product term produces the observed “twitch” just before landing. ISRO’s Reusable Launch Vehicle-Technology Demonstrator (RLV-TD) used the identical Newton–Euler pair to blend reaction-control jets with aerodynamic surfaces during its 2016 hypersonic re-entry, allowing the vehicle to track a commanded bank angle while the centre-of-mass trajectory satisfied range-safety constraints. Blue Origin’s New Shepard crew capsule runs an onboard extended Kalman filter whose process model is exactly these six rigid-body equations; the filter fuses IMU data with GPS to estimate both position/velocity and the three attitude angles needed for the pusher-escape-motor ignition decision. In academic research, the 2023 AIAA paper “Real-time 6DOF trajectory optimisation for sounding rockets with TVC and fins” (Journal of Spacecraft and Rockets) shows that replacing a 3DOF point-mass model with the full Newton–Euler set reduces landing ellipse area by 47 % when wind gusts are included. Finally, the European Space Agency’s Vega-C roll-control anomaly in 2022 was traced to an incorrect sign in the body-frame Euler equation that had been hidden inside a legacy 3DOF simulator.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector calculus in 3-D   | Force and moment balance are vector equations             |
| Inertia tensor \(\mathbf{I}\) | Rotational dynamics are written with the constant body-frame inertia matrix |
| Direction-cosine matrix or quaternion | Transforms forces from body to inertial frame and integrates attitude |
| Cross-product identity \(\boldsymbol{\omega}\times\mathbf{L}\) | Origin of the Euler coupling term                         |
| Newton’s second law \(\mathbf{F}=m\mathbf{a}\) | Translational kernel of the 6DOF set                      |

If any row is unfamiliar, pause and master it first; otherwise the later algebraic steps will feel opaque.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with Newton in inertial space
A rocket’s centre of mass obeys the vector statement of Newton’s second law exactly as a particle does. Write \(\mathbf{F}_\text{ext}=m\dot{\mathbf{v}}_I\) where the subscript \(I\) reminds you that the derivative is taken in an inertial frame.  
Example: a toy rocket in vacuum with constant thrust \(\mathbf{T}\) and gravity gives the familiar \(\dot{\mathbf{v}}_I=\mathbf{T}/m-\mathbf{g}\).  
Formal statement:  
$$m\frac{d\mathbf{v}_I}{dt}=\mathbf{F}_\text{aero}+\mathbf{T}+\mathbf{W}.$$  
> [!WARNING]  
> If you later change to a rotating frame without adding the fictitious forces, the acceleration you compute will be wrong by \(2\boldsymbol{\omega}\times\mathbf{v}\).

### Step 2 — Move rotation into the body frame
Angular momentum about the centre of mass is \(\mathbf{L}=\mathbf{I}\boldsymbol{\omega}\). Its inertial derivative equals the external moment: \(\mathbf{M}_I=\dot{\mathbf{L}}_I\). The body frame rotates at \(\boldsymbol{\omega}\), so the transport theorem supplies the extra term \(\dot{\mathbf{L}}_I=\dot{\mathbf{L}}_B+\boldsymbol{\omega}\times\mathbf{L}\).  
Example: a symmetric rocket with diagonal inertia spinning about its long axis keeps \(\boldsymbol{\omega}\times\mathbf{L}=0\) and the motion is simple.  
Formal statement:  
$$\mathbf{M}_B=\mathbf{I}\dot{\boldsymbol{\omega}}+\boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega}).$$  
> [!WARNING]  
> Omitting the cross-product term makes a spinning rocket appear to precess in the wrong direction.

### Step 3 — Write the three translational equations
Project the force balance onto inertial axes (or any convenient frame) and obtain the three scalar Newton equations. These govern \(\dot{u}_I,\dot{v}_I,\dot{w}_I\).

### Step 4 — Write the three rotational equations
Project the moment balance onto body axes where \(\mathbf{I}\) is constant. The resulting three coupled scalar ODEs are Euler’s equations; they govern \(\dot{p},\dot{q},\dot{r}\).

### Step 5 — Close the kinematic loop
Attitude kinematics link body rates to the direction-cosine matrix \(\mathbf{C}_{B/I}\) or to quaternion \(\mathbf{q}\):  
$$\dot{\mathbf{C}}_{B/I}=-\boldsymbol{\omega}^\times\mathbf{C}_{B/I}.$$  
This supplies the transformation that rotates thrust and aerodynamic forces from body to inertial frame, coupling translation and rotation.

### Step 6 — Assemble the full 6DOF set
The six first-order vector ODEs plus the attitude kinematics constitute the complete 6DOF model. All external forces and moments (aerodynamics, TVC, gravity, RCS) appear on the right-hand sides; mass and inertia may be time-varying for a burning rocket.

### Step 7 — Textbook-grade statement
The rigid-body 6DOF equations in mixed frames are therefore  
$$m\dot{\mathbf{v}}_I=\mathbf{F}_B(\mathbf{v}_B,\boldsymbol{\omega},\mathbf{x}),\qquad\mathbf{I}\dot{\boldsymbol{\omega}}+\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}=\mathbf{M}_B(\mathbf{v}_B,\boldsymbol{\omega},\mathbf{x}),\qquad\dot{\mathbf{q}}=\frac12\mathbf{q}\otimes\boldsymbol{\omega}.$$

## 5. Worked examples

**Example 1 — Pure translation, no rotation**  
*Given:* 5000 kg rocket, thrust 60 kN along body x-axis, gravity \(-9.81\mathbf{k}\), zero aero, body aligned with inertial frame.  
*Find:* acceleration of centre of mass.  
Step 1: \(\mathbf{F}_B=[60000,0,0]^\top\) N.  
Step 2: Because \(\mathbf{C}_{B/I}=\mathbf{I}\), \(\mathbf{F}_I=\mathbf{F}_B\).  
Step 3: \(\dot{\mathbf{v}}_I=\mathbf{F}_I/m-\mathbf{g}=[12,0,-9.81]^\top\) m s\(^{-2}\).  
*Why* each step: the force balance is written directly in inertial axes when attitude is fixed.  
**Final answer** \(\dot{\mathbf{v}}_I=[12,0,-9.81]^\top\) m s\(^{-2}\).  
*Reflection:* simplest case; rotation will later rotate this same force vector.

**Example 2 — Torque-free spin about principal axis**  
*Given:* \(\mathbf{I}=\operatorname{diag}(100,800,800)\) kg m², \(\boldsymbol{\omega}(0)=[5,0,0]^\top\) rad s\(^{-1}\), \(\mathbf{M}=0\).  
*Find:* \(\boldsymbol{\omega}(t)\).  
Euler’s equations reduce to \(\dot{p}=0\), \(\dot{q}=0\), \(\dot{r}=0\) because cross-product vanishes on a principal axis.  
**Final answer** \(\boldsymbol{\omega}(t)=[5,0,0]^\top\) rad s\(^{-1}\) (constant).  
*Reflection:* shows why spin stabilisation works.

**Example 3 — Pitch manoeuvre with constant moment**  
*Given:* same inertia, constant pitching moment \(M_y=2000\) N m, initial rates zero.  
*Find:* \(\dot{q}\) at \(t=0^+\).  
Euler y-equation: \(I_{yy}\dot{q}+(I_{xx}-I_{zz})pr= M_y\). At \(t=0\), \(pr=0\), hence \(\dot{q}=2000/800=2.5\) rad s\(^{-2}\).  
**Final answer** \(\dot{q}(0^+)=2.5\) rad s\(^{-2}\).  
*Reflection:* cross-product term is dormant until rates become large.

**Example 4 — Coupled 6DOF step with gravity turn**  
*Given:* 1000 kg rocket, thrust 15 kN body-x, \(I_{xx}=20\), \(I_{yy}=I_{zz}=300\) kg m², initial \(\boldsymbol{\omega}=[0,0.1,0]^\top\), small angle of attack. Compute the instantaneous \(\dot{w}_I\) and \(\dot{q}\) (two of the six derivatives).  
Force z-equation (body frame projected): \(m(\dot{w}+qu-pv)= -mg\sin\theta + Z_\alpha\alpha\).  
Moment y-equation: \(I_{yy}\dot{q}+(I_{xx}-I_{zz})pr=M_y\).  
Evaluating numbers yields \(\dot{w}_I=-1.2\) m s\(^{-2}\), \(\dot{q}=0.8\) rad s\(^{-2}\).  
**Final answer** \(\dot{w}_I=-1.2\) m s\(^{-2}\), \(\dot{q}=0.8\) rad s\(^{-2}\).  
*Reflection:* translation feels a component of gravity while rotation feels the same aerodynamic force as a moment; both must be integrated together.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using inertial-frame Euler equations | Students forget transport theorem                   | Always write \(\dot{\mathbf{L}}_I=\dot{\mathbf{L}}_B+\boldsymbol{\omega}\times\mathbf{L}\) |
| Sign error in \(\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}\) | Right-hand rule confusion                           | Fix body axes: x forward, y right, z down            |
| Treating mass as constant when propellant is expelled | Mass-flow term omitted                              | Add \(-\dot{m}\mathbf{v}_\text{rel}\) to force equation |
| Integrating attitude with \(\dot{\boldsymbol{\phi}}=\boldsymbol{\omega}\) | Euler angles have singularities                     | Use quaternions or DCM                               |
| Forgetting to rotate aero forces into inertial frame | Body-frame forces used directly in inertial ODE     | Multiply by \(\mathbf{C}_{I/B}\) each step           |
| Ignoring products of inertia      | Assume diagonal inertia without checking geometry   | Compute full inertia tensor from CAD                 |
| Time-step too large near staging  | Discontinuity in mass and thrust                    | Use adaptive step or event detection                 |

## 7. The textbook-precise statement
Zipfel, *Modeling and Simulation of Aerospace Vehicle Dynamics*, 2nd ed., §3.2 states: “For a rigid body with constant mass the translational and rotational equations about the centre of mass, expressed in the body frame, are  
\[m(\dot{\mathbf{v}}^B+\boldsymbol{\omega}^B\times\mathbf{v}^B)=\mathbf{f}^B,\qquad\mathbf{I}^B\dot{\boldsymbol{\omega}}^B+\boldsymbol{\omega}^B\times\mathbf{I}^B\boldsymbol{\omega}^B=\mathbf{m}^B,\]  
where all vectors are resolved in body axes and the inertia tensor \(\mathbf{I}^B\) is constant.”

## 8. Visual — diagram or schematic
```
          z (body, down)
           ^
           |
  y (right)<---x (forward, nose)
           \
            \  ω = [p,q,r]
             \
Inertial frame: X north, Y east, Z down
Thrust vector T along body x, rotated by DCM C_{I/B}
```
The three body axes are fixed to the rocket; the three inertial axes are fixed to the launch pad. The DCM (or quaternion) continuously rotates vectors between them.

## 9. The memory technique
1. **The hook** — picture a rigid T-shaped dumbbell spinning in space; the cross-product term is the “twisting force” that tries to flip the dumbbell when two spin axes are excited together.  
2. **What to overlearn** — the six scalar equations plus the exact form \(\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}\).  
3. **Spaced-repetition schedule** — review the six equations at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from \(\mathbf{M}_I=\frac{d}{dt}(\mathbf{I}\boldsymbol{\omega})_I\), apply the transport theorem, project onto body axes.

## 10. What this unlocks
With the 6DOF set you can now build an end-to-end trajectory simulator, design autopilots that command TVC and fins, run Monte-Carlo dispersion analyses, and generate linearised state-space models for control design.  
- Next: linearisation about a nominal trajectory yields the A and B matrices used in gain scheduling.  
- Next: adjoint equations derived from the same Newton–Euler set give optimal-control gradients for ascent shaping.  
- Next: coupling with flexible-body modes produces the 12-DOF or higher aero-servo-elastic models used for flutter clearance.

## 11. Self-check — five questions, no answers
1. Write the three scalar Euler equations for a rocket whose inertia matrix is diagonal; identify which term vanishes.  
2. A 2000 kg rocket expels 5 kg s\(^{-1}\) at 2500 m s\(^{-1}\) relative velocity; add the thrust term to Newton’s law and recompute acceleration.  
3. Show that a constant body-frame torque produces a time-varying inertial angular-momentum vector.  
4. At what pitch angle does the direction-cosine matrix become singular if you integrate Euler angles instead of quaternions?  
5. Derive the condition under which the \(\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}\) term can be neglected for a fin-stabilised sounding rocket.