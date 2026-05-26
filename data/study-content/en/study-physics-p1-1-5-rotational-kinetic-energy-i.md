## 1. The one-sentence answer
**Rotational kinetic energy equals \(\frac12 I\omega^2\), the energy stored in a rigid body’s rotation about a fixed axis.**

Linear kinetic energy \(\frac12 mv^2\) measures motion through space. Rotation is motion around an axis, so the same energy concept applies once every point’s linear speed is expressed through a single angular speed \(\omega\). The quantity \(I\) collects the mass distribution that converts \(\omega\) into those individual speeds. The factor of one-half survives unchanged because the underlying work–energy relation remains quadratic in velocity.

The derivation begins from the work done by torque and arrives at an expression identical in form to the linear case. For any rigid body the result is exact when the axis is fixed or when the body is symmetric and the axis passes through the center of mass.

> [!NOTE]
> The “½” is not arbitrary; it is the same integral that produces \(\frac12 mv^2\) once velocity is written as \(r\omega\).

## 2. Why this matters — concrete and current
The James Webb Space Telescope’s reaction wheels store and release rotational kinetic energy to slew the observatory without firing thrusters, conserving propellant over a decade-long mission.  

SpaceX’s Falcon 9 first-stage grid fins are modeled with rotational kinetic energy terms when engineers simulate the vehicle’s roll control during atmospheric entry; the stored energy determines how quickly the fins can counteract torque from asymmetric re-entry heating.  

In semiconductor manufacturing, the spindles of extreme-ultraviolet lithography scanners reach angular speeds above 200 000 rpm; their rotational kinetic energy must be known to within 0.1 % to predict vibration that would blur 3 nm features.  

Neutron-star glitches observed by NICER on the International Space Station are interpreted through sudden changes in rotational kinetic energy as superfluid vortices unpin inside the star’s crust, providing the only direct probe of ultra-dense matter equations of state.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear kinetic energy \(\frac12 mv^2\) | Supplies the starting point that rotational KE generalizes |
| Angular velocity \(\omega\) | Converts every linear speed into a single rotational variable |
| Moment of inertia \(I\)   | Encodes how mass is arranged relative to the axis         |
| Rigid-body constraint     | Guarantees all points share the same \(\omega\)           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with linear kinetic energy
Every particle carries kinetic energy \(\frac12 m v^2\). A rotating rigid body is simply a collection of particles whose velocities are linked by geometry.

Example: a 0.5 kg point mass moving at 3 m s⁻¹ has 2.25 J of kinetic energy.

The formal statement is the definition
\[
K = \frac12 m v^2.
\]

> [!WARNING]
> Treating rotation as “extra” energy added on top of translation will double-count when both motions are present.

### Step 2 — Replace linear speed with angular speed
For a particle at perpendicular distance \(r\) from a fixed axis, \(v = r\omega\). Substitute directly.

Example: the same mass now at \(r = 0.2\) m with \(\omega = 15\) rad s⁻¹ has \(v = 3\) m s⁻¹ again.

The substitution yields
\[
K = \frac12 m (r\omega)^2 = \frac12 (mr^2)\omega^2.
\]

> [!WARNING]
> Forgetting the perpendicular distance produces an incorrect lever arm and wrong energy.

### Step 3 — Define moment of inertia for one particle
The factor \(mr^2\) is the particle’s contribution to the moment of inertia about the axis.

Example: \(I = 0.5 \times 0.2^2 = 0.02\) kg m².

Formally,
\[
I_i = m_i r_i^2.
\]

### Step 4 — Sum over all particles
A rigid body contains many particles. Total rotational kinetic energy is the sum of individual contributions.

Example: three particles at different radii give three separate \(mr^2\) terms that add.

The sum is
\[
K_\text{rot} = \sum_i \frac12 I_i \omega^2 = \frac12 I\omega^2,
\]
where
\[
I = \sum_i m_i r_i^2.
\]

### Step 5 — Extend to continuous mass distributions
Replace the sum by an integral:
\[
I = \int r^2\,dm.
\]

### Step 6 — State the general result
For any rigid body rotating about a fixed axis with angular speed \(\omega\), the rotational kinetic energy is
\[
K_\text{rot} = \frac12 I\omega^2.
\]

## 5. Worked examples — every step shown

**Example 1 — Single particle on a string**  
*Given:* 0.2 kg mass on a massless rod of length 0.5 m, rotating at 8 rad s⁻¹ about one end.  
*Find:* rotational kinetic energy.  

\[
I = m r^2 = 0.2 \times 0.5^2 = 0.05\,\text{kg m}^2
\]  
*Why:* definition for a point mass.  

\[
K = \frac12 I\omega^2 = \frac12 \times 0.05 \times 64 = 1.6\,\text{J}
\]  
*Why:* direct substitution of the derived formula.  

**1.6 J**

*Reflection:* The example is trivial yet forces correct identification of \(r\) as the perpendicular distance.

**Example 2 — Solid disk about its central axis**  
*Given:* uniform disk, mass 4 kg, radius 0.15 m, \(\omega = 20\) rad s⁻¹.  
*Find:* \(K_\text{rot}\).  

\[
I = \frac12 MR^2 = \frac12 \times 4 \times 0.15^2 = 0.045\,\text{kg m}^2
\]  
*Why:* standard table entry obtained by integration.  

\[
K = \frac12 \times 0.045 \times 400 = 9\,\text{J}
\]  
*Why:* formula applied after \(I\) is known.  

**9 J**

*Reflection:* Students often forget the ½ inside the moment of inertia itself.

**Example 3 — Rod rotating about its center**  
*Given:* thin rod, mass 1.2 kg, length 0.8 m, spinning at 12 rad s⁻¹ about its midpoint, perpendicular to length.  
*Find:* \(K_\text{rot}\).  

\[
I = \frac1{12}ML^2 = \frac1{12}\times1.2\times0.64 = 0.064\,\text{kg m}^2
\]  
*Why:* parallel-axis or integration result for rod.  

\[
K = \frac12 \times 0.064 \times 144 = 4.608\,\text{J}
\]  
*Why:* arithmetic after substitution.  

**4.608 J**

*Reflection:* Axis location must be verified; using end-point inertia produces an immediate factor-of-four error.

**Example 4 — Rolling without slipping**  
*Given:* solid sphere, mass 2 kg, radius 0.1 m, center-of-mass speed 3 m s⁻¹.  
*Find:* total kinetic energy.  

\[
v = R\omega \implies \omega = 30\,\text{rad s}^{-1}
\]  
*Why:* no-slip kinematic constraint.  

\[
I_\text{cm} = \frac25 MR^2 = 0.008\,\text{kg m}^2
\]  
*Why:* sphere formula.  

\[
K_\text{rot} = \frac12 \times 0.008 \times 900 = 3.6\,\text{J},\qquad K_\text{trans} = \frac12\times2\times9 = 9\,\text{J}
\]  
*Why:* add independent translational and rotational terms.  

**Total KE = 12.6 J**

*Reflection:* The rotational term is required even though the sphere is also translating.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using linear KE formula on rotating object | Habit from translational problems           | Always check whether motion is described by \(\omega\) |
| Confusing \(I\) about different axes | Tables list multiple entries                | State the axis explicitly before calculating |
| Forgetting \(I\) already contains the ½ for symmetric bodies | Over-learning formulas without derivation   | Re-derive \(I\) for disk or sphere once      |
| Applying \(\frac12 I\omega^2\) when axis is accelerating | Formula assumes fixed axis or CM frame      | Verify axis condition before use             |
| Treating rolling KE as only rotational | Missing translational contribution          | Write both terms and add                     |
| Using \(r\) that is not perpendicular | Misreading geometry                         | Draw the radius vector and drop perpendicular |
| Dimensional inconsistency         | Mixing rad s⁻¹ with rpm or deg s⁻¹          | Convert to rad s⁻¹ before substitution       |

## 7. The textbook-precise statement
For a rigid body of total mass \(M\) whose orientation is described by a single angle \(\theta(t)\) about a fixed axis, the rotational kinetic energy is
\[
T = \frac12 I\omega^2,\qquad\omega=\dot\theta,
\]
where the moment of inertia about that axis is
\[
I=\int(r_\perp)^2\,dm
\]
and the integral runs over the entire body. The result follows at once from the definition of kinetic energy once the rigid-body velocity field \(\mathbf{v}=\boldsymbol{\omega}\times\mathbf{r}\) is substituted (Goldstein, *Classical Mechanics*, 3e, §4.9).

## 8. Visual — diagram or schematic
```text
          axis (z)
            ↑
            │
   r⊥──────●────── m (particle)
            │
            │
         rigid body
```
Horizontal line represents the axis of rotation. Perpendicular distance \(r_\perp\) is measured from the axis to each mass element; \(\omega\) is the rotation rate about the vertical axis. For a continuous body the diagram is identical, with the integral replacing the single dot.

## 9. The memory technique
**The hook** — Picture a flywheel: the faster it spins (\(\omega\)), the more energy it stores, but only the mass farthest from the axle (\(I\)) really matters—like a figure skater whose outstretched arms slow the spin.

**What to overlearn**  
- \(K_\text{rot}=\frac12 I\omega^2\)  
- \(v=r\omega\) for every point  
- Definition \(I=\int r^2\,dm\)

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Begin with \(\sum\frac12 m_i v_i^2\), insert \(v_i=r_i\omega\), factor out \(\omega^2\), recognize the definition of \(I\).

## 10. What this unlocks
Mastery of \(\frac12 I\omega^2\) is required before torque–angular-momentum relations, rigid-body Euler equations, and spacecraft attitude dynamics can be understood quantitatively.

- Angular momentum \(\mathbf{L}=I\boldsymbol{\omega}\)  
- Work–energy theorem for rotation \(\int\tau\,d\theta=\Delta K_\text{rot}\)  
- Conservation of angular momentum in isolated systems  
- Stability analysis of spinning satellites and projectiles

## 11. Self-check — five questions, no answers
1. A thin ring and a solid disk of identical mass and radius spin at the same \(\omega\). Which stores more rotational kinetic energy and by what factor?

2. Derive the rotational kinetic energy of a uniform rod of length \(L\) and mass \(M\) rotating at angular speed \(\omega\) about an axis through one end and perpendicular to the rod.

3. A wheel of moment of inertia \(I\) is accelerated from rest to \(\omega_f\) by a constant torque \(\tau\). Show that the work done equals \(\frac12 I\omega_f^2\).

4. Explain why the rotational kinetic energy of a rigid body is frame-dependent even though \(\omega\) is the same in every inertial frame that shares the axis direction.

5. Two spheres roll without slipping down identical inclines; one is hollow, one is solid. Which reaches the bottom first? Quantify the difference using rotational kinetic energy.