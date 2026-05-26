## 1. The one-sentence answer
**The 6DOF equations describe the complete rigid-body motion of a rocket by combining Newton’s second law for the three translational accelerations of the center of mass with Euler’s equations for the three rotational accelerations about the center of mass.**

Newton’s law states that the net force equals the time rate of change of linear momentum; when mass is constant this reduces to \(\mathbf{F}=m\mathbf{a}\). In a rocket the mass changes, so the equation is written in an inertial frame as \(\mathbf{F}=\frac{d}{dt}(m\mathbf{v})\). Euler’s equations arise once the same principle is applied to angular momentum: the net torque equals the rate of change of angular momentum, but the moments of inertia are most conveniently expressed in the body-fixed frame where they are constant, yielding three coupled nonlinear differential equations in the body angular rates.

The six resulting scalar equations are therefore coupled through the direction-cosine matrix that transforms forces and torques between frames, and through the kinematic relations that integrate body rates into attitude.

> [!NOTE]
> The decisive insight is that translation and rotation are independent only when the body axes pass through the center of mass; any offset immediately produces cross-coupling that must be carried explicitly in the equations.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage boost-back and landing burns are controlled by solving the 6DOF equations in real time inside the flight computer; the translational solution supplies the required velocity vector while the rotational solution commands gimbal angles to null attitude error.

NASA’s Artemis Orion spacecraft uses the same set of equations inside its guidance, navigation, and control (GN&C) flight software to execute the trans-lunar injection burn and the subsequent reaction-control-system attitude maneuvers; the rotational equations are solved at 100 Hz to keep the vehicle within a 0.5° dead-band during coast.

Blue Origin’s New Shepard employs an onboard 6DOF propagator to trigger the escape-motor separation logic; the translational equations predict the instantaneous center-of-mass trajectory while the Euler equations forecast the angular rates that would result from a single-engine failure.

In academic research, the 2023 paper “Real-time 6DOF convex optimization for reusable launch vehicle guidance” (Journal of Guidance, Control, and Dynamics) demonstrates that embedding the full Newton–Euler set inside a successive convexification loop reduces landing dispersion by 40 % compared with point-mass approximations.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Vector differentiation in rotating frames | Angular velocity cross-product terms appear when \(\frac{d\mathbf{H}}{dt}\) is taken in body axes. |
| Principal moments of inertia   | Euler’s equations simplify dramatically when products of inertia vanish in body axes. |
| Direction-cosine (or quaternion) kinematics | Attitude integration is required to transform body forces into the inertial frame.   |
| Variable-mass systems          | Rockets expel mass; the thrust term must be added to Newton’s law as an external force. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate translation of the center of mass from rotation about it
A rigid body in free space has six independent motions: three of the center of mass and three rotations about it. Because the definition of the center of mass makes the first moments vanish, the linear and angular momentum equations decouple.

Consider a uniform rod of length \(L\) floating in space. Push one end with an impulsive force; the center of mass accelerates exactly as if the same force acted at the center, while the rod also begins to spin about the center.

The translational equation is therefore written solely for the center-of-mass acceleration:
\[
\mathbf{F}_\text{ext} = m \frac{d\mathbf{v}_\text{cm}}{dt}\Big|_{\text{inertial}}.
\]

> [!WARNING]
> If the reference point is not the center of mass, fictitious torques appear and the translational equation no longer closes by itself.

### Step 2 — Write Newton’s law for variable mass
A rocket loses mass at rate \(\dot{m}<0\). The correct inertial-frame statement includes the relative velocity of the exhaust:
\[
\mathbf{F}_\text{ext} + \mathbf{v}_\text{rel}\dot{m} = m\frac{d\mathbf{v}_\text{cm}}{dt}.
\]
(The term \(\mathbf{v}_\text{rel}\dot{m}\) is the thrust.)

### Step 3 — Express angular momentum in body axes
Angular momentum about the center of mass is \(\mathbf{H}=\mathbf{I}\boldsymbol{\omega}\). In body-fixed principal axes the inertia tensor is diagonal, but the time derivative must account for the rotating frame:
\[
\Big(\frac{d\mathbf{H}}{dt}\Big)_{\text{inertial}} = \Big(\frac{d\mathbf{H}}{dt}\Big)_{\text{body}} + \boldsymbol{\omega}\times\mathbf{H}.
\]

### Step 4 — Apply the rotating-frame rule to torque
Torque equals the inertial derivative of angular momentum, producing Euler’s equations. In principal axes they read
\[
\begin{align}
I_x\dot{\omega}_x+(I_z-I_y)\omega_y\omega_z &= M_x,\\
I_y\dot{\omega}_y+(I_x-I_z)\omega_z\omega_x &= M_y,\\
I_z\dot{\omega}_z+(I_y-I_x)\omega_x\omega_y &= M_z.
\end{align}
\]

### Step 5 — Couple translation and rotation through the direction-cosine matrix
The aerodynamic and thrust forces are naturally expressed in body axes; they must be rotated into the inertial frame to integrate the center-of-mass trajectory. The same matrix rotates the body angular rates into inertial attitude rates.

### Step 6 — Assemble the complete 6DOF set
The six first-order differential equations for \(\mathbf{v}_\text{cm}\) and \(\boldsymbol{\omega}\) together with the kinematic attitude equations constitute the standard 6DOF model used in every modern launch-vehicle simulation.

## 5. Worked examples — every step shown

**Example 1 — Pure translation of a sounding rocket**
*Given:* A 1200 kg rocket experiences 25 kN thrust along its axis and 300 N constant drag; no torque.  
*Find:* Center-of-mass acceleration at burnout (mass still 1200 kg).

\[
\mathbf{F}_\text{ext} = (25000-300)\mathbf{e}_x = 24700\,\text{N}.
\]
*Why:* Net external force is thrust minus drag.  
\[
a_x = \frac{24700}{1200} = 20.583\,\text{m/s}^2.
\]
*Why:* Newton’s second law with constant mass.  
**20.583 m s⁻² along the body x-axis**

*Reflection:* The rotational equations are idle; the example isolates the translational half of the 6DOF set.

**Example 2 — Torque-induced angular acceleration**
*Given:* A 300 kg-m² pitch inertia, 450 N·m pitching moment.  
*Find:* \(\dot{\omega}_y\).

\[
I_y\dot{\omega}_y = M_y \implies \dot{\omega}_y = \frac{450}{300} = 1.5\,\text{rad/s}^2.
\]
*Why:* Euler’s equation reduces to scalar form when \(\omega_x=\omega_z=0\).  
**1.5 rad s⁻²**

*Reflection:* Demonstrates the direct link between torque and angular acceleration before cross-product terms appear.

**Example 3 — Spin-up with cross-product term**
*Given:* \(I_x=20\), \(I_y=300\), \(I_z=300\) kg·m²; initial rates \(\omega_x=0.1\), \(\omega_y=2\), \(\omega_z=0\) rad/s; \(M_x=0\).  
*Find:* Initial \(\dot{\omega}_x\).

\[
I_x\dot{\omega}_x = (I_y-I_z)\omega_y\omega_z \implies \dot{\omega}_x=0.
\]
*Why:* The product \(\omega_y\omega_z=0\), so the nonlinear term vanishes.  
**0**

*Reflection:* Shows that the nonlinear coupling is latent until two transverse rates are simultaneously nonzero.

**Example 4 — Full 6DOF step for a re-entry capsule**
*Given:* Body axes aligned with velocity vector, \(I_x=800\), \(I_y=1200\), \(I_z=1100\) kg·m²; \(\boldsymbol{\omega}=[0.05,0.02,0.01]^\top\) rad/s; aerodynamic moment \(\mathbf{M}=[-40,120,-30]^\top\) N·m.  
*Find:* \(\dot{\boldsymbol{\omega}}\) at that instant.

\[
\begin{align}
\dot{\omega}_x &= \frac{-40+(1200-1100)(0.02)(0.01)}{800}= -0.049975\,\text{rad/s}^2,\\
\dot{\omega}_y &= \frac{120+(800-1100)(0.01)(0.05)}{1200}=0.09875\,\text{rad/s}^2,\\
\dot{\omega}_z &= \frac{-30+(1100-800)(0.05)(0.02)}{1100}=-0.02636\,\text{rad/s}^2.
\end{align}
\]
*Why:* Each Euler equation evaluated with the instantaneous rates.  
**[-0.049975, 0.09875, -0.02636]ᵀ rad s⁻²**

*Reflection:* The small but nonzero cross-product terms illustrate why linearised attitude equations are insufficient for large-angle maneuvers.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                           | How to avoid it                                              |
|-------------------------------------------|----------------------------------------------------------|--------------------------------------------------------------|
| Treating mass as constant in Newton’s law | Textbooks often omit variable-mass derivation            | Always include the \(\mathbf{v}_\text{rel}\dot{m}\) thrust term for rockets. |
| Using inertial-frame inertia tensor       | Body axes are the only frame where \(\mathbf{I}\) is constant | Transform torques, never the inertia matrix itself.          |
| Ignoring the \(\boldsymbol{\omega}\times\mathbf{H}\) term | It vanishes at \(\boldsymbol{\omega}=0\) and feels optional | Evaluate the term at every integration step.                 |
| Confusing body and wind axes for forces   | Both are “vehicle-carried” but not identical             | Maintain an explicit direction-cosine matrix between them.   |
| Integrating Euler angles directly         | Gimbal lock at 90° pitch                                 | Use quaternions or rotation-vector kinematics instead.       |
| Applying torques about a non-CM point     | Structural convenience tempts the wrong reference        | Shift all moments to the instantaneous center of mass first. |
| Neglecting propellant slosh inertia       | Liquid mass is not rigidly attached                      | Augment the inertia tensor or add slosh pendulums.           |

## 7. The textbook-precise statement
For a rigid body whose mass distribution may vary slowly, the translational motion of the center of mass in an inertial frame obeys
\[
\mathbf{F}_\text{ext}+\mathbf{u}_\text{rel}\dot{m}=m\dot{\mathbf{v}}_\text{cm},
\]
while the rotational motion about the center of mass, expressed in principal body axes, obeys Euler’s equations
\[
\mathbf{I}\dot{\boldsymbol{\omega}}+\boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega})=\mathbf{M}.
\]
Attitude kinematics close the system via the quaternion differential equation
\[
\dot{\mathbf{q}}=\frac12\mathbf{q}\otimes\boldsymbol{\omega}.
\]
(Reference: Zipfel, *Modeling and Simulation of Aerospace Vehicle Dynamics*, 2e, §4.3–4.4.)

## 8. Visual — diagram or schematic
```text
          z (yaw)
           ↑
           |
   x (roll)→  [Rocket CG] ----→ v_cm (inertial)
           |
          y (pitch)
Torque M_x, M_y, M_z act about CG
Body axes rotate with ω = [ωx, ωy, ωz]
Inertial frame (X,Y,Z) fixed to Earth-centered non-rotating axes
Direction-cosine matrix C_b^i transforms body vectors → inertial
```

## 9. The memory technique
1. **The hook** — Picture a rigid dumbbell: the two masses translate together while the bar between them twists; the center of the bar never feels a net force from the twisting, yet the masses feel torques that the center-of-mass equations ignore.
2. **What to overlearn** — The three scalar Euler equations in principal axes; the fact that the cross-product term \(\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}\) is the only nonlinearity in the attitude dynamics.
3. **Spaced-repetition schedule** — Review the Euler equations at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive Euler’s equations from \(\mathbf{M}=\frac{d\mathbf{H}}{dt}\) by inserting the rotating-frame transport theorem and setting products of inertia to zero.

## 10. What this unlocks
Mastery of the 6DOF Newton–Euler set is the prerequisite for every subsequent module in rocket guidance and control.

- Linearised state-space models for autopilot design  
- Six-DOF trajectory optimization (direct collocation, successive convexification)  
- Monte-Carlo dispersion analysis for launch-vehicle safety  
- Hardware-in-the-loop simulation of thrust-vector-control actuators  
- Coupled rigid-body/flexible-body equations once slosh or bending modes are added  

## 11. Self-check — five questions, no answers
1. A rocket’s center of mass accelerates at 30 m s⁻² while its body x-axis is pitched 10° from the velocity vector; what is the component of inertial acceleration along the body x-axis?  
2. In principal body axes the products of inertia are zero; does that statement remain true after a 45° roll maneuver?  
3. Write the full expression for \(\dot{\omega}_x\) when all three body rates and all three moments are nonzero.  
4. Why does a constant body-frame thrust vector produce a curved inertial trajectory even in the absence of gravity or aerodynamics?  
5. A vehicle with unequal transverse inertias is given a pure roll rate; will any pitch or yaw rate ever appear if all external moments remain zero?