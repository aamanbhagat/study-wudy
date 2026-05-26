## 1. The one-sentence answer
**Kinetic energy in generalized coordinates is the quadratic form \( T = \frac12 \sum_{i,j} m_{ij}(q) \dot q_i \dot q_j \) obtained by expressing the Euclidean velocities of every particle as linear functions of the chosen generalized velocities \(\dot q\).**

In Cartesian coordinates the kinetic energy of a system of point masses is simply \(\frac12 \sum_a m_a \dot{\mathbf r}_a \cdot \dot{\mathbf r}_a\). When the position vectors \(\mathbf r_a\) are written as functions of a smaller set of independent parameters \(q_k\) (the generalized coordinates), each Cartesian velocity \(\dot{\mathbf r}_a\) becomes a linear combination of the \(\dot q_k\) whose coefficients depend on the instantaneous values of the \(q\)'s. Substituting this linear map into the original sum produces a quadratic expression in the \(\dot q\)'s whose coefficients are themselves functions of the \(q\)'s.

The resulting quadratic form is the only object needed to write the kinetic term of the Lagrangian; potential energy, if present, is expressed directly as a function of the \(q\)'s alone. The procedure therefore converts the Newtonian description, which is tied to a particular coordinate frame, into a coordinate-independent statement that can be used with any convenient set of generalized coordinates.

> [!NOTE]
> The mass matrix \(m_{ij}(q)\) encodes all inertial coupling induced by the chosen coordinates; its off-diagonal elements are the geometric origin of Coriolis and centrifugal terms that appear later in the equations of motion.

## 2. Why this matters — concrete and current
SpaceX’s Starship guidance algorithms propagate the vehicle state in a set of generalized coordinates that automatically satisfy the no-penetration constraint at the launch tower; the kinetic-energy quadratic form supplies the exact mass matrix that appears inside the onboard optimizer.

The European Space Agency’s JUICE mission to Jupiter uses a Lagrangian formulation with generalized coordinates that include the spacecraft’s attitude angles and the angles of its articulated solar arrays; the resulting position-dependent inertia matrix is evaluated at 10 Hz on the flight computer to predict propellant slosh.

Semiconductor lithography stages at ASML employ voice-coil actuators whose controllers are derived from a Lagrangian with generalized coordinates along the six rigid-body degrees of freedom; the quadratic kinetic energy supplies the exact feed-forward inertia compensation that achieves sub-nanometer positioning at 100 g accelerations.

In molecular-dynamics packages such as GROMACS, the SHAKE and RATTLE algorithms constrain bond lengths and convert the Cartesian kinetic energy into a reduced quadratic form on the unconstrained torsional angles; this step is performed at every femtosecond time step on GPU clusters worldwide.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Euclidean inner product \(\mathbf v\cdot\mathbf v\) | Supplies the original definition of kinetic energy before any coordinate change. |
| Chain rule for partial derivatives | Converts Cartesian velocities into linear combinations of generalized velocities. |
| Linear algebra of quadratic forms | Recognizes that \(T\) is always \(\frac12\dot q^T M(q)\dot q\). |
| Independence of generalized coordinates | Guarantees that the map from \(\dot q\) to Cartesian velocities has full column rank. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from Cartesian kinetic energy
Kinetic energy is defined without reference to any particular coordinates; it is simply the sum of \(\frac12 m v^2\) over all particles.  
Concrete example: two particles of mass \(m\) moving in a plane have \(T = \frac12 m(\dot x_1^2 + \dot y_1^2) + \frac12 m(\dot x_2^2 + \dot y_2^2)\).  
Formally,
\[
T = \frac12\sum_a m_a\dot{\mathbf r}_a\cdot\dot{\mathbf r}_a.
\]
> [!WARNING] Treating \(T\) as \(\frac12 m\dot q^2\) for a single coordinate \(q\) immediately fails for any system whose constraints make the metric non-Euclidean.

### Step 2 — Express positions via generalized coordinates
Any admissible configuration can be written \(\mathbf r_a = \mathbf r_a(q_1,\dots,q_n)\).  
Concrete example: a single particle on a circle of radius \(R\) satisfies \(x = R\cos\theta\), \(y = R\sin\theta\).  
Formally the map is a set of \(3N\) functions of the \(n\) independent parameters \(q_k\).

### Step 3 — Differentiate with the chain rule
Differentiate each position with respect to time:
\[
\dot{\mathbf r}_a = \sum_k\frac{\partial\mathbf r_a}{\partial q_k}\dot q_k.
\]
Concrete example: \(\dot x = -R\sin\theta\,\dot\theta\), \(\dot y = R\cos\theta\,\dot\theta\).  
Formally the velocity is a linear combination whose coefficient vectors are the partial derivatives evaluated at the current \(q\).

### Step 4 — Substitute into the inner product
Insert the linear expression into the dot product; cross terms appear:
\[
T = \frac12\sum_{k,l}\Bigl(\sum_a m_a\frac{\partial\mathbf r_a}{\partial q_k}\cdot\frac{\partial\mathbf r_a}{\partial q_l}\Bigr)\dot q_k\dot q_l.
\]
The quantity in parentheses is symmetric and depends only on the \(q\)'s.

### Step 5 — Identify the mass matrix
Define the elements
\[
m_{kl}(q) := \sum_a m_a\frac{\partial\mathbf r_a}{\partial q_k}\cdot\frac{\partial\mathbf r_a}{\partial q_l}.
\]
Then
\[
T = \frac12\sum_{k,l}m_{kl}(q)\dot q_k\dot q_l = \frac12\dot q^T M(q)\dot q.
\]
This is the textbook expression for kinetic energy in generalized coordinates.

### Step 6 — Verify positive-definiteness
Because the original Euclidean metric is positive definite and the map \(\dot q\to\{\dot{\mathbf r}_a\}\) is injective for independent coordinates, the matrix \(M(q)\) is positive definite at every point of configuration space.

## 5. Worked examples — every step shown

**Example 1 — Planar polar coordinates**  
*Given:* A particle of mass \(m\) with \(x=r\cos\theta\), \(y=r\sin\theta\).  
*Find:* \(T(r,\theta,\dot r,\dot\theta)\).  

Differentiate:
\[
\dot x = \dot r\cos\theta - r\sin\theta\,\dot\theta, \quad \dot y = \dot r\sin\theta + r\cos\theta\,\dot\theta.
\]
Square and add:
\[
\dot x^2 + \dot y^2 = \dot r^2 + r^2\dot\theta^2.
\]
Multiply by \(m/2\):
\[
T = \frac12 m(\dot r^2 + r^2\dot\theta^2).
\]
*Why* the cross term vanished: the partial derivatives \(\partial\mathbf r/\partial r\) and \(\partial\mathbf r/\partial\theta\) are orthogonal.  
**Final answer**  
\[
T = \frac12 m\dot r^2 + \frac12 m r^2\dot\theta^2.
\]

*Reflection* The example shows how a position-dependent coefficient appears naturally; the same algebra produces the centrifugal barrier in the effective potential.

**Example 2 — Simple pendulum**  
*Given:* Length \(\ell\), angle \(\theta\) from vertical, mass \(m\).  
*Find:* \(T(\theta,\dot\theta)\).  

Position: \(x=\ell\sin\theta\), \(y=-\ell\cos\theta\).  
Velocity squared: \(\ell^2\dot\theta^2\).  
Thus
\[
T = \frac12 m\ell^2\dot\theta^2.
\]
**Final answer**  
\[
T = \frac12 m\ell^2\dot\theta^2.
\]

*Reflection* The mass matrix reduces to a scalar that is constant because the constraint is scleronomic and the coordinate is angular.

**Example 3 — Double pendulum**  
*Given:* Two equal masses \(m\), lengths \(\ell_1,\ell_2\), angles \(\theta_1,\theta_2\).  
*Find:* The full quadratic form.  

After differentiation and collection of terms the mass matrix is
\[
M = m\ell_1^2\begin{pmatrix}2 & \cos(\theta_1-\theta_2)\\ \cos(\theta_1-\theta_2) & 1\end{pmatrix} + m\ell_2^2\begin{pmatrix}0 & 0\\0 & 1\end{pmatrix}.
\]
**Final answer**  
\[
T = \frac12\dot q^T M(\theta_1-\theta_2)\dot q.
\]

*Reflection* Off-diagonal elements encode inertial coupling; they vanish only when the relative angle is \(\pi/2\).

**Example 4 — Particle on a sphere**  
*Given:* Spherical coordinates \(r=R\) (fixed), \(\theta,\phi\).  
*Find:* \(T(\theta,\phi,\dot\theta,\dot\phi)\).  

Metric on the sphere yields
\[
T = \frac12 m R^2(\dot\theta^2 + \sin^2\theta\,\dot\phi^2).
\]
**Final answer**  
\[
T = \frac12 m R^2\dot\theta^2 + \frac12 m R^2\sin^2\theta\,\dot\phi^2.
\]

*Reflection* The \(\sin^2\theta\) factor is the geometric origin of the conserved angular momentum about the polar axis.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting that \(M\) depends on \(q\) | Students treat generalized coordinates as if they were Cartesian. | Always recompute partial derivatives after each coordinate change. |
| Using \(\frac12 m\dot q^2\) for angular coordinates | Confuses arc length with angle. | Insert the correct length scale (\(\ell\) or \(R\)) from the chain rule. |
| Omitting cross terms when multiple coordinates are present | Assumes orthogonality of generalized velocities. | Expand the full dot product before collecting coefficients. |
| Treating \(M\) as constant when constraints are rheonomic | Time-dependent constraints make partial derivatives time-dependent. | Keep explicit time dependence in the partial derivatives. |
| Sign error in potential versus kinetic terms | Lagrangian is \(T-V\), not \(V-T\). | Write \(L=T-V\) explicitly at the start of every derivation. |
| Ignoring positive-definiteness check | Leads to singular mass matrices in degenerate coordinates. | Verify \(\det M(q)>0\) after constructing \(M\). |
| Confusing generalized momentum \(p_i=\partial L/\partial\dot q_i\) with \(m\dot q_i\) | Only true when \(M\) is constant and diagonal. | Always compute \(p=M\dot q\). |

## 7. The textbook-precise statement
Let \(S\) be a system of \(N\) particles whose positions \(\mathbf r_a\) (\(a=1,\dots,N\)) are smooth functions of \(n\) independent generalized coordinates \(q^1,\dots,q^n\) and possibly time \(t\). The kinetic energy is the function
\[
T(q,\dot q,t) = \frac12\sum_{a=1}^N m_a\Bigl|\sum_{k=1}^n\frac{\partial\mathbf r_a}{\partial q^k}\dot q^k + \frac{\partial\mathbf r_a}{\partial t}\Bigr|^2.
\]
When the constraints are scleronomic the explicit time derivative vanishes and \(T\) is a quadratic form
\[
T(q,\dot q)=\frac12\sum_{k,l=1}^n m_{kl}(q)\dot q^k\dot q^l,
\]
where the symmetric matrix \(M(q)=(m_{kl}(q))\) is positive definite on the tangent space. (Goldstein, *Classical Mechanics*, 3rd ed., §1.4.)

## 8. Visual — diagram or schematic
```text
q1 ───►  partial r / partial q1
               │
               │  (velocity contribution)
               ▼
Cartesian v = Σ (∂r/∂qk) * q̇k
               ▲
               │
q2 ───►  partial r / partial q2
```
The diagram shows two generalized velocities feeding linearly into a single Cartesian velocity vector; the inner-product step squares and sums these contributions to produce the quadratic form.

## 9. The memory technique
1. **The hook** — Picture the mass matrix \(M(q)\) as a rubber sheet whose local stretch and shear change with position; kinetic energy is the instantaneous stretching energy when the sheet is deformed at rates \(\dot q\).
2. **What to overlearn** — \(T=\frac12\dot q^T M(q)\dot q\) and the definition \(m_{kl}=\sum_a m_a\partial_k\mathbf r_a\cdot\partial_l\mathbf r_a\).
3. **Spaced-repetition schedule** — Review the definition at 1 day, reconstruct \(M\) for polar coordinates at 3 days, derive the double-pendulum matrix at 7 days, prove positive-definiteness at 16 days, and write the Lagrangian for a new constrained system at 35 days.
4. **First-principles fallback** — Return to the Cartesian sum \(\frac12\sum m_a v_a^2\), apply the chain rule, and collect quadratic terms.

## 10. What this unlocks
The quadratic structure of \(T\) is the sole ingredient required to form the Lagrangian and to pass to the Euler–Lagrange equations or Hamilton’s equations. It also supplies the Riemannian metric on configuration space that appears in geodesic formulations of free motion and in the Hamilton–Jacobi theory.

- Derivation of Lagrange’s equations  
- Legendre transform to Hamiltonian mechanics  
- Noether’s theorem for cyclic coordinates  
- Reduced-mass formalism for two-body problems  
- Linearized small-oscillation analysis via the Hessian of \(T\) and \(V\)

## 11. Self-check — five questions, no answers
1. A bead slides on a wire shaped as \(y=x^2\). Write the single generalized coordinate kinetic energy and identify the position-dependent mass.  
2. Show that the mass matrix for a rigid body rotating about a fixed point is exactly the inertia tensor expressed in generalized angular coordinates.  
3. Two particles are constrained to remain a fixed distance apart. Construct the 5×5 mass matrix in terms of the five chosen generalized coordinates and verify it remains positive definite.  
4. In spherical coordinates the term \(\frac12 m r^2\sin^2\theta\,\dot\phi^2\) appears. Derive it from the chain rule and explain why the factor \(\sin^2\theta\) must be present.  
5. Suppose a coordinate transformation \(q\to Q(q)\) is performed. Demonstrate that the new mass matrix transforms as a (0,2) tensor under this change of coordinates.