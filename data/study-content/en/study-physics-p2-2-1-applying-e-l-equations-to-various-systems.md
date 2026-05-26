## 1. The one-sentence answer
**Applying the Euler-Lagrange equations to various systems is the direct substitution of a chosen Lagrangian \(L = T - V\) into the operator \(\frac{d}{dt}(\partial L/\partial \dot{q}_i) - \partial L/\partial q_i = 0\) to produce the equations of motion for every chosen generalized coordinate.**

The procedure works because the Lagrangian already encodes the entire dynamics of a conservative system. Once \(T\) and \(V\) are expressed in the selected coordinates and velocities, the Euler-Lagrange operator extracts the correct second-order differential equations without ever writing force vectors or constraint forces explicitly.  

The same formal steps apply whether the system is a single particle, a rigid body, or a collection of coupled oscillators; only the explicit forms of \(T\) and \(V\) change. The resulting equations are guaranteed to be consistent with Newton’s laws yet are often far simpler to obtain once good coordinates are chosen.

> [!NOTE]
> The decisive advantage appears when constraints are present: the Lagrangian method automatically incorporates holonomic constraints through coordinate choice, eliminating the need for separate Lagrange-multiplier terms unless the constraints are non-holonomic.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site trajectory is simulated by writing the Lagrangian in spherical coordinates with time-varying mass; the resulting Euler-Lagrange equations are integrated inside the onboard guidance computer to generate the pitch profile that minimizes fuel while satisfying the no-fly-zone constraint.

The European Space Agency’s LISA mission models the three spacecraft as a triple pendulum in heliocentric orbit; the Euler-Lagrange equations in relative coordinates directly supply the transfer function between proof-mass motion and laser-phase noise that must be subtracted in post-processing.

In semiconductor manufacturing, the tuning fork gyroscopes inside STMicroelectronics’ MEMS inertial sensors are designed by applying the Euler-Lagrange equations to two coupled flexural modes; the resulting analytic expressions for Coriolis coupling strength determine the required electrostatic spring constants.

Molecular-dynamics packages such as GROMACS employ the same formalism for rigid water models: the Euler-Lagrange equations written in quaternion coordinates for each molecule enforce fixed bond lengths while allowing free rotation, enabling nanosecond-scale simulations of protein folding.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Kinetic energy \(T\) and potential energy \(V\) expressed in generalized coordinates | These are the only two scalar functions required to build \(L\); without them the Euler-Lagrange operator has nothing to act on. |
| Definition of generalized coordinates \(q_i\) and velocities \(\dot{q}_i\) | The Euler-Lagrange equation must be written once for each independent coordinate; an incorrect choice leaves constraints explicit and complicates the algebra. |
| Time derivative of a partial derivative | The left-hand side of the Euler-Lagrange equation mixes an ordinary time derivative with a partial derivative; confusing the two produces sign errors in every subsequent equation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the degrees of freedom
Write the smallest set of independent coordinates that fully locates every particle while automatically satisfying all holonomic constraints.  
Example: a bead on a wire needs only the arc-length coordinate \(s\), not three Cartesian coordinates plus a constraint equation.  
Formal statement: choose \(q_1,\dots,q_n\) such that the mapping \(\mathbf{r}_k = \mathbf{r}_k(q_1,\dots,q_n,t)\) is known for every particle \(k\).  
> [!WARNING]
> Retaining a redundant coordinate forces an extra Lagrange multiplier and converts a simple ordinary differential equation into a differential-algebraic system.

### Step 2 — Express the scalars \(T\) and \(V\)
Compute kinetic energy from the velocities obtained by differentiating the coordinate mapping; write potential energy directly in the chosen coordinates.  
Example: for a particle in a central field, \(T = \frac12 m(\dot r^2 + r^2\dot\theta^2)\) and \(V = V(r)\).  
Formal statement:  
\[
T = \sum_k\frac12 m_k|\dot{\mathbf{r}}_k|^2,\qquad V = V(q_1,\dots,q_n).
\]
> [!WARNING]
> Omitting velocity-dependent terms that arise from time-dependent constraints (for instance, a moving support) produces an incorrect Lagrangian.

### Step 3 — Form the Lagrangian
Subtract the two scalars:  
\[
L(q,\dot q,t) = T(q,\dot q,t) - V(q,t).
\]
No further manipulation is required at this stage.

### Step 4 — Write the Euler-Lagrange equation for each coordinate
Apply the operator once per coordinate:  
\[
\frac{d}{dt}\left(\frac{\partial L}{\partial\dot q_i}\right) - \frac{\partial L}{\partial q_i} = 0.
\]
The first term usually produces an acceleration; the second term produces the generalized force.

### Step 5 — Simplify and interpret
Collect like terms to obtain a second-order ordinary differential equation for each \(q_i\). These are the equations of motion ready for integration or linearization.

## 5. Worked examples — every step shown

**Example 1 — Free particle in Cartesian coordinates**  
*Given:* A particle of mass \(m\) with no forces.  
*Find:* its equations of motion.  
\[
L = \frac12 m(\dot x^2 + \dot y^2 + \dot z^2).
\]  
*Why:* \(T\) is the usual expression; \(V = 0\).  
For the \(x\)-coordinate:  
\[
\frac{\partial L}{\partial\dot x} = m\dot x,\qquad\frac{d}{dt}(m\dot x) = m\ddot x,\qquad\frac{\partial L}{\partial x} = 0.
\]  
*Why:* partial derivative with respect to velocity brings down the linear term; time derivative then yields acceleration; partial with respect to coordinate vanishes.  
Thus \(m\ddot x = 0\). The same holds for \(y\) and \(z\).  
**Final answer**  
\[
\ddot x = \ddot y = \ddot z = 0.
\]  
*Reflection:* The result recovers Newton’s first law; the algebra is trivial, exposing only the structure of the method.

**Example 2 — One-dimensional harmonic oscillator**  
*Given:* \(V = \frac12 kx^2\).  
*Find:* equation of motion.  
\[
L = \frac12 m\dot x^2 - \frac12 kx^2.
\]  
\[
\frac{\partial L}{\partial\dot x} = m\dot x \implies \frac{d}{dt}(\cdots) = m\ddot x,
\]  
\[
\frac{\partial L}{\partial x} = -kx.
\]  
*Why:* derivative of \(V\) supplies the restoring term with a minus sign.  
**Final answer**  
\[
m\ddot x + kx = 0.
\]  
*Reflection:* The same pattern appears in every quadratic potential; only the coefficient matrix changes.

**Example 3 — Simple pendulum**  
*Given:* length \(\ell\), angle \(\theta\) from vertical.  
*Find:* equation of motion.  
\[
T = \frac12 m\ell^2\dot\theta^2,\qquad V = -mg\ell\cos\theta,
\]  
\[
L = \frac12 m\ell^2\dot\theta^2 + mg\ell\cos\theta.
\]  
\[
\frac{\partial L}{\partial\dot\theta} = m\ell^2\dot\theta \implies \frac{d}{dt}(\cdots) = m\ell^2\ddot\theta,
\]  
\[
\frac{\partial L}{\partial\theta} = -mg\ell\sin\theta.
\]  
**Final answer**  
\[
\ddot\theta + \frac{g}{\ell}\sin\theta = 0.
\]  
*Reflection:* The nonlinear term emerges automatically; small-angle linearization is performed after the derivation, not before.

**Example 4 — Planar central-force problem**  
*Given:* \(V(r)\).  
*Find:* radial and angular equations.  
\[
L = \frac12 m(\dot r^2 + r^2\dot\theta^2) - V(r).
\]  
Radial:  
\[
m\ddot r - mr\dot\theta^2 + V'(r) = 0.
\]  
Angular:  
\[
\frac{d}{dt}(mr^2\dot\theta) = 0 \implies mr^2\dot\theta = \ell = \text{const}.
\]  
**Final answer**  
Radial equation with centrifugal term plus conservation of angular momentum.  
*Reflection:* Angular momentum conservation appears as a first integral because \(\theta\) is cyclic.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating a velocity-dependent constraint as time-independent | The partial derivative \(\partial L/\partial q_i\) then misses an extra term | Differentiate the coordinate mapping with respect to time before forming \(T\) |
| Confusing \(\frac{d}{dt}(\partial L/\partial\dot q)\) with \(\partial L/\partial q\) evaluated at constant \(\dot q\) | Notation looks similar | Always compute the total time derivative explicitly, expanding the chain rule |
| Forgetting that \(L\) may depend explicitly on time | Leads to energy non-conservation statements that are false | Check whether any coordinate transformation introduces \(t\) explicitly |
| Using Cartesian kinetic energy after a nonlinear coordinate change | The velocity transformation is omitted | Re-derive \(T\) from \(\dot{\mathbf{r}}(q,\dot q)\) each time |
| Linearizing before applying the Euler-Lagrange operator | Destroys exact conserved quantities | Obtain the full nonlinear equations first, then linearize about an equilibrium |
| Omitting the minus sign when subtracting \(V\) | Sign error propagates into every force term | Write \(L = T - V\) as a literal subtraction before differentiating |
| Applying the equation to a non-holonomic constraint without extra multipliers | The method silently enforces the wrong dynamics | Verify constraint type before discarding multipliers |

## 7. The textbook-precise statement
Let \(L(q,\dot q,t)\) be a \(C^2\) function on the tangent bundle of an \(n\)-dimensional configuration manifold. If the curve \(q(t)\) extremizes the action \(\int_{t_1}^{t_2} L\,dt\) with fixed endpoints, then it satisfies the system  
\[
\frac{d}{dt}\Bigl(\frac{\partial L}{\partial\dot q_i}\Bigr) - \frac{\partial L}{\partial q_i} = 0,\qquad i=1,\dots,n.
\]  
(Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §2.4, Eq. 2.13.)

## 8. Visual — diagram or schematic
```text
q_i axis
  ↑
  |     L(q, q̇, t)
  |    /‾‾‾‾‾‾‾‾‾\
  |   /   T(q̇)    \
  |  /             \
  | /       -       \
  |/        V(q)     \
  +-------------------> t
       EL operator
          ↓
   d/dt (∂L/∂q̇) − ∂L/∂q = 0
```
The diagram shows the single scalar function \(L\) being fed into the Euler-Lagrange operator; the output is one ordinary differential equation per coordinate.

## 9. The memory technique
1. **The hook** — picture a single vending machine that accepts only two coins labelled \(T\) and \(V\); the machine’s internal crank is the Euler-Lagrange operator and it always dispenses the correct equation of motion.  
2. **What to overlearn** — the exact operator \(\frac{d}{dt}(\partial L/\partial\dot q_i)-\partial L/\partial q_i=0\) and the definition \(L=T-V\).  
3. **Spaced-repetition schedule** — review the operator at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — reconstruct \(T\) from velocities, subtract \(V\), then apply the product and chain rules to the partial derivatives.

## 10. What this unlocks
Mastery of the procedure lets you treat any conservative system—robotic manipulators, orbiting spacecraft, or molecular rotors—as a straightforward exercise in differentiation rather than a problem in vector mechanics.  

- Linearized small-oscillation analysis and normal-mode extraction  
- Noether’s theorem for conserved quantities from cyclic coordinates  
- Hamilton’s equations via Legendre transform of the same \(L\)  
- Transition to optimal-control formulations used in trajectory optimization

## 11. Self-check — five questions, no answers
1. A bead slides on a frictionless parabolic wire \(y = ax^2\) rotating about the \(y\)-axis at constant angular speed \(\Omega\). Write the Lagrangian and the single Euler-Lagrange equation.  
2. For the central-force problem, show that the angular equation is equivalent to conservation of angular momentum without ever invoking torque.  
3. Two identical pendulums of length \(\ell\) are coupled by a spring of constant \(k\) attached at their bobs. Derive the equations of motion in the small-angle limit.  
4. A particle moves in a time-dependent potential \(V(x,t) = \frac12 k(t)x^2\). Does the Euler-Lagrange equation still guarantee energy conservation? Why or why not?  
5. Identify the coordinate choice that renders the Lagrangian of a free rigid body cyclic in three angles and state the three resulting conserved quantities.