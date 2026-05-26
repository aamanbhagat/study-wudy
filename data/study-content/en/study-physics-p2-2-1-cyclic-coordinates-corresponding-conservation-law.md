## 1. The one-sentence answer
**A cyclic coordinate is any generalized coordinate that enters the Lagrangian only through its time derivative, and the conservation law it produces is that the conjugate generalized momentum remains constant along the motion.**

In Lagrangian mechanics the equations of motion are second-order differential equations obtained from the action principle. When a coordinate \(q_i\) is absent from \(L\) itself, the partial derivative \(\partial L/\partial q_i\) vanishes identically. The Euler-Lagrange equation then collapses at once to the statement that \(\frac{d}{dt}(\partial L/\partial\dot q_i)=0\). The quantity inside the derivative is precisely the momentum conjugate to \(q_i\), so that momentum is an integral of the motion.

The absence of \(q_i\) from \(L\) usually signals a symmetry: the system looks the same after an arbitrary shift in that coordinate. The conserved momentum is the Noether charge associated with that symmetry. The link is direct and mechanical; no additional assumptions are required beyond the form of the Lagrangian.

> [!NOTE]
> The conserved quantity is the *momentum*, not the coordinate itself; the coordinate can still change linearly with time while its conjugate momentum stays fixed.

## 2. Why this matters — concrete and current
In low-thrust trajectory design, mission analysts at NASA’s Jet Propulsion Laboratory treat the azimuthal angle around a central body as cyclic when the thrust profile is axisymmetric. The resulting constancy of angular momentum reduces the six-dimensional two-body problem to a pair of first-order equations, cutting the computational cost of long-duration electric-propulsion trajectories by more than an order of magnitude.

Spacecraft attitude dynamics teams at ESA’s European Space Operations Centre exploit the cyclic Euler angle about the symmetry axis of a spin-stabilized satellite. Conservation of the associated angular-momentum component supplies an exact integral that is used in real-time onboard Kalman filters to detect actuator faults within a single control cycle.

In semiconductor quantum-dot design, the azimuthal coordinate around a cylindrically symmetric gate stack is cyclic. The conserved canonical angular momentum labels the single-particle states used in capacitance-voltage modeling, allowing device physicists to predict charging energies without solving the full three-dimensional Schrödinger equation.

In relativistic heavy-ion collisions, the azimuthal angle around the beam axis is cyclic for an azimuthally symmetric quark-gluon plasma. The associated conservation law fixes the total angular momentum of the hydrodynamic flow, which is now measured to 5 % precision at the LHC and used to constrain the shear viscosity of the plasma.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Lagrangian \(L=T-V\)           | Supplies the function whose explicit dependence on coordinates is examined |
| Generalized coordinates \(q_i\) | The variables in which cyclicity is defined               |
| Euler-Lagrange equation        | The differential identity that becomes a conservation statement when \(\partial L/\partial q_i=0\) |
| Conjugate momentum \(p_i=\partial L/\partial\dot q_i\) | The quantity proved constant by the conservation law      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Spotting explicit dependence
A coordinate \(q_k\) is cyclic when the Lagrangian does not contain the symbol \(q_k\) at all; only \(\dot q_k\) may appear.  
Concrete example: a free particle in Cartesian coordinates has \(L=\frac12 m(\dot x^2+\dot y^2+\dot z^2)\); none of the three coordinates is present, so all three are cyclic.  
Formal statement: \(q_k\) is cyclic if \(\partial L/\partial q_k\equiv0\).

> [!WARNING]
> Do not confuse “does not appear” with “appears linearly”; a term such as \(q_k\dot q_j\) still counts as explicit dependence on \(q_k\).

### Step 2 — Writing the Euler-Lagrange equation
The general Euler-Lagrange equation for any coordinate is
\[
\frac{d}{dt}\Bigl(\frac{\partial L}{\partial\dot q_k}\Bigr)-\frac{\partial L}{\partial q_k}=0.
\]
When \(q_k\) is cyclic the second term is identically zero, leaving
\[
\frac{d}{dt}\Bigl(\frac{\partial L}{\partial\dot q_k}\Bigr)=0.
\]

### Step 3 — Identifying the conserved quantity
The expression inside the remaining derivative is the conjugate momentum
\[
p_k\equiv\frac{\partial L}{\partial\dot q_k}.
\]
Thus \(p_k=\text{constant}\). This is the conservation law corresponding to the cyclic coordinate.

### Step 4 — Reading the physical meaning
Because \(p_k\) is constant, one first integral of the motion is obtained without solving any differential equation. The coordinate \(q_k\) itself may still evolve (often linearly), but its rate of change is now constrained by the fixed value of \(p_k\).

### Step 5 — Textbook statement of the result
If the Lagrangian of a system does not depend explicitly on a generalized coordinate \(q_k\), then the conjugate momentum \(p_k=\partial L/\partial\dot q_k\) is a constant of the motion.

## 5. Worked examples — every step shown

**Example 1 — Planar central-force motion**  
*Given:* \(L=\frac12 m(\dot r^2+r^2\dot\theta^2)-V(r)\).  
*Find:* any conserved momentum.  
The coordinate \(\theta\) does not appear in \(L\).  
*Why:* direct inspection of the expression.  
Euler-Lagrange equation for \(\theta\) therefore reduces to
\[
\frac{d}{dt}\Bigl(\frac{\partial L}{\partial\dot\theta}\Bigr)=0.
\]
*Why:* \(\partial L/\partial\theta=0\) by cyclicity.  
Compute
\[
\frac{\partial L}{\partial\dot\theta}=m r^2\dot\theta.
\]
*Why:* differentiation with respect to \(\dot\theta\) only.  
Hence
\[
m r^2\dot\theta=\text{constant}.
\]
**Final answer**  
\[
\ell=m r^2\dot\theta=\text{const}.
\]

*Reflection:* The example shows how a geometric symmetry (rotational invariance) is converted into an algebraic constant without integration.

**Example 2 — Relativistic free particle**  
*Given:* \(L=-mc^2\sqrt{1-v^2/c^2}\) in Cartesian coordinates.  
*Find:* conserved momenta.  
None of \(x,y,z\) appear in \(L\).  
*Why:* Lorentz invariance.  
Thus each \(p_i=\partial L/\partial\dot x_i\) is constant.  
Explicitly,
\[
p_x=\frac{m\dot x}{\sqrt{1-v^2/c^2}}=\text{const}.
\]
**Final answer**  
Linear momentum is conserved in every inertial direction.

*Reflection:* The same logic applies in special relativity once the correct Lagrangian is written.

**Example 3 — Symmetric top**  
*Given:* Lagrangian of a symmetric top with fixed pivot, using Euler angles \(\phi,\theta,\psi\).  
*Find:* cyclic coordinates.  
Both \(\phi\) and \(\psi\) are absent from \(L\).  
*Why:* axial symmetry about vertical and about body symmetry axis.  
Therefore \(p_\phi\) and \(p_\psi\) are constant.  
**Final answer**  
Vertical component of angular momentum and body-axis component of angular momentum are both conserved.

*Reflection:* Two independent cyclic coordinates yield two independent integrals, reducing the order of the remaining differential equation.

**Example 4 — Particle on a cylinder**  
*Given:* \(L=\frac12 m(\dot\rho^2+\rho^2\dot\phi^2+\dot z^2)-V(\rho)\) with \(\rho=R\) fixed.  
*Find:* conserved quantity.  
\(\phi\) is cyclic.  
*Why:* no explicit \(\phi\).  
Thus
\[
p_\phi=m R^2\dot\phi=\text{const}.
\]
**Final answer**  
Angular momentum about the cylinder axis is conserved.

*Reflection:* Even after a holonomic constraint reduces the degrees of freedom, any remaining cyclic coordinate still supplies a first integral.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating a coordinate that appears inside a constraint as cyclic | Constraints are imposed after writing \(L\), so explicit dependence may be hidden | Substitute constraints before checking cyclicity |
| Confusing “\(L\) independent of time” with “cyclic coordinate” | Both yield conserved quantities, but different ones | Check only whether \(\partial L/\partial q_k=0\) |
| Forgetting that \(p_k\) may depend on other velocities | Students expect \(p_k=m\dot q_k\) | Keep the full partial derivative expression |
| Applying the law when the Lagrangian is written in non-inertial coordinates | Extra velocity-dependent potentials can re-introduce the coordinate | Verify that the chosen \(L\) truly lacks \(q_k\) |
| Assuming the coordinate itself is constant | The conserved object is the momentum, not \(q_k\) | Solve \(\dot q_k=p_k/(\partial^2 L/\partial\dot q_k^2)\) after conservation is established |
| Overlooking gauge freedom that can make a coordinate cyclic | Adding a total time derivative can hide or reveal dependence | Choose the simplest gauge before testing |
| Applying the statement to velocity-dependent potentials that secretly contain the coordinate | Some electromagnetic gauges mix coordinates and velocities | Expand the potential fully before inspection |

## 7. The textbook-precise statement
If the Lagrangian \(L(q_j,\dot q_j,t)\) of a mechanical system is independent of a particular generalized coordinate \(q_k\) (i.e., \(\partial L/\partial q_k\equiv0\)), then the conjugate momentum
\[
p_k=\frac{\partial L}{\partial\dot q_k}
\]
is a constant of the motion:
\[
\frac{dp_k}{dt}=0.
\]
(Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §2.6, Theorem 2.)

## 8. Visual — diagram or schematic
```text
          z
          |
          |     conserved p_φ
          |     ↺
          |   θ
          |  /
          | /
   r --->•-------- φ (cyclic)
         particle
```
Horizontal plane contains polar coordinates \((r,\phi)\). The angle \(\phi\) never appears in a central potential \(V(r)\); its conjugate momentum \(p_\phi=m r^2\dot\phi\) is therefore constant. The radial motion remains governed by an effective potential that includes the centrifugal term \(\ell^2/(2mr^2)\).

## 9. The memory technique

**The hook**  
Picture a bead on a vertical wire that can rotate freely about the wire’s axis; the rotation angle is “cyclic” because the bead’s height never cares which way the wire points. The bead’s angular momentum around the axis therefore stays constant, like a turntable that never speeds up or slows down once set spinning.

**What to overlearn**  
1. Definition: \(\partial L/\partial q_k=0\) \(\Leftrightarrow\) \(q_k\) cyclic.  
2. Consequence: \(p_k=\partial L/\partial\dot q_k=\) constant.  
3. The Euler-Lagrange equation collapses to \(\dot p_k=0\).

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the action integral, vary only \(q_k\), integrate by parts, and observe that the boundary term vanishes when \(\partial L/\partial q_k=0\), leaving \(p_k\) constant.

## 10. What this unlocks
Cyclic coordinates supply the first integrals that reduce the order of the equations of motion and make Liouville integrability possible. The same idea reappears in Hamiltonian mechanics as ignorable coordinates whose conjugate momenta are constants, in Noether’s theorem as the link between continuous symmetries and conserved currents, and in optimal-control theory as conserved adjoints when the performance index is independent of a state variable.

- Routh reduction procedure  
- Action-angle variables  
- Integrable systems and Liouville theorem  
- Gauge theories and conserved charges  

## 11. Self-check — five questions, no answers
1. In the Lagrangian \(L=\frac12 m(\dot x^2+\dot y^2)-V(x)\), which coordinate is cyclic and what is conserved?  
2. A bead slides on a frictionless parabolic wire rotating with constant angular speed \(\omega\) about its vertical axis. After writing the Lagrangian in cylindrical coordinates with the constraint imposed, is the azimuthal angle still cyclic?  
3. Show that if two coordinates \(q_1\) and \(q_2\) are both cyclic, their conjugate momenta are separately conserved even when the kinetic energy contains a cross term \(\dot q_1\dot q_2\).  
4. A particle moves in a potential that is invariant under simultaneous translation of \(x\) and \(y\). Which single coordinate is cyclic after a 45° rotation of axes, and why does only one conserved momentum survive?  
5. In the presence of a velocity-dependent magnetic term \(\mathbf{A}(\mathbf{r})\cdot\mathbf{v}\), under what condition on \(\mathbf{A}\) does the azimuthal angle remain cyclic?