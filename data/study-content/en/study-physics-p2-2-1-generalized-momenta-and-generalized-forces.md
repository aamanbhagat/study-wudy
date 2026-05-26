## 1. The one-sentence answer
**Generalized momenta are the partial derivatives of the Lagrangian with respect to the generalized velocities, while generalized forces are the quantities conjugate to the generalized coordinates that appear on the right-hand side of the Euler-Lagrange equations.**

In ordinary Newtonian mechanics a particle has linear momentum \(m\mathbf{v}\) and a force \(\mathbf{F}\) that changes it according to \(\mathbf{F}=d\mathbf{p}/dt\). When a system is described by an arbitrary set of coordinates \(q_j\) that may mix lengths, angles, and other quantities, the same physical content must be re-expressed so that each coordinate has its own “momentum-like” and “force-like” partner. These partners are obtained by projecting the original vectors onto the directions allowed by the chosen coordinates; the projection is performed automatically by the partial derivatives of the Lagrangian.

The resulting quantities obey equations that look formally identical to Newton’s second law, yet they remain valid even when the coordinates are non-Cartesian or when constraints are present. Consequently the entire machinery of analytical mechanics—conservation laws, Hamilton’s equations, and canonical transformations—rests on these two definitions.

> [!NOTE]
> The single most important insight is that both generalized momentum and generalized force are defined with respect to the same Lagrangian; changing the coordinate choice changes both quantities simultaneously, but their relationship through the Euler-Lagrange equations is preserved.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site guidance uses a set of generalized coordinates that includes the vehicle’s pitch angle and the gimbal deflection of each Merlin engine. The generalized forces conjugate to these angles are precisely the torques produced by differential thrust vectoring; treating them as generalized forces allows the flight software to enforce attitude constraints without ever writing the full six-degree-of-freedom Newton-Euler equations.

In semiconductor lithography scanners, the reticle and wafer stages are controlled in six axes. Engineers choose generalized coordinates that automatically satisfy the constraint of constant gap height; the generalized momenta conjugate to lateral translations then appear directly in the servo bandwidth calculations, enabling sub-nanometer positioning at accelerations above 10 g.

The Laser Interferometer Gravitational-Wave Observatory (LIGO) models its 4 km arm cavities with generalized coordinates that include the differential arm length and the angular misalignment of each test mass. The generalized forces arising from radiation-pressure fluctuations set the quantum limit on strain sensitivity; these forces are the starting point for squeezed-light injection studies published in *Nature Physics* (2023).

Aircraft gust-load alleviation systems on the Boeing 787 treat wing bending and torsion as generalized coordinates. The generalized forces supplied by the active ailerons are scheduled in real time; the resulting reduction in peak wing-root bending moment is verified during every flight-test campaign.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Lagrangian \(L=T-V\)     | Supplies the scalar from which both momenta and forces are extracted by differentiation |
| Virtual work principle   | Justifies why the generalized force equals the coefficient of \(\delta q_j\) in \(\delta W\) |
| Chain rule for partial derivatives | Required when coordinates are time-dependent or velocities appear inside \(T\) |
| d’Alembert’s principle   | Guarantees that constraint forces do no virtual work and therefore drop out of the generalized-force expression |

## 4. Building the idea — from intuition to formalism

### Step 1 — From Cartesian force to virtual work
A force \(\mathbf{F}\) does work \(\delta W=\mathbf{F}\cdot\delta\mathbf{r}\) on an infinitesimal displacement. When position is expressed through generalized coordinates, the same work must be written as a sum over each coordinate.  
Example: a particle on a plane whose position is \(x=r\cos\theta\), \(y=r\sin\theta\). Then \(\delta W=F_x\delta x+F_y\delta y\) becomes \(Q_r\delta r+Q_\theta\delta\theta\).  
Formally,  
\[Q_j=\mathbf{F}\cdot\frac{\partial\mathbf{r}}{\partial q_j}.\]  
> [!WARNING]  
> If the coordinates are time-dependent, the partial derivative must be taken at fixed time; otherwise fictitious forces appear incorrectly.

### Step 2 — Kinetic energy supplies the momentum definition
The kinetic energy \(T\) is quadratic in the velocities. Its partial derivative with respect to \(\dot{q}_j\) isolates the coefficient that multiplies \(\ddot{q}_j\) in the equations of motion; that coefficient is defined to be the generalized momentum.  
For a single particle, \(T=\frac12 m(\dot{x}^2+\dot{y}^2)\). Substituting the polar expressions yields \(p_\theta=m r^2\dot\theta\), the angular momentum.  
Mathematically,  
\[p_j\equiv\frac{\partial L}{\partial\dot{q}_j}.\]

### Step 3 — Potential energy supplies the conservative generalized force
When forces derive from a potential \(V(q)\), the virtual work is \(-\delta V\). Therefore the generalized force is simply  
\[Q_j=-\frac{\partial V}{\partial q_j}.\]  
This term moves to the left-hand side of the Euler-Lagrange equation, producing the familiar \(\partial L/\partial q_j\).

### Step 4 — Non-conservative forces remain on the right-hand side
Any force not obtainable from a velocity-independent potential is left explicit. Its virtual work is still \(\sum Q_j\delta q_j\), so the generalized force is computed exactly as in Step 1.  
Example: viscous drag \(\mathbf{F}=-b\mathbf{v}\) gives a generalized force \(Q_j=-b\sum_i\dot{x}_i\partial x_i/\partial q_j\).

### Step 5 — The Euler-Lagrange equation assembles both quantities
Differentiating the generalized momentum with respect to time and subtracting the partial of \(L\) with respect to \(q_j\) produces the imbalance that must be supplied by non-conservative generalized forces:  
\[\frac{d}{dt}\left(\frac{\partial L}{\partial\dot{q}_j}\right)-\frac{\partial L}{\partial q_j}=Q_j.\]  
When \(Q_j=0\), \(p_j\) is conserved if \(L\) is independent of \(q_j\).

### Step 6 — Textbook statement reached
The definitions and the equation above are now coordinate-independent and ready for Hamiltonian formulation or canonical transformations.

## 5. Worked examples — every step shown

**Example 1 — Polar coordinates, free particle**  
*Given:* \(L=\frac12 m(\dot r^2+r^2\dot\theta^2)\).  
*Find:* \(p_r\), \(p_\theta\), and the equations of motion with \(Q_j=0\).  
\(\frac{\partial L}{\partial\dot r}=m\dot r\) *Why*: direct differentiation.  
\(\frac{\partial L}{\partial\dot\theta}=m r^2\dot\theta\) *Why*: angular term only.  
\(\frac{d}{dt}p_r-\frac{\partial L}{\partial r}=0\) *Why*: Euler-Lagrange for \(r\).  
This yields \(\ddot r-r\dot\theta^2=0\).  
**Final answer**  
\[p_r=m\dot r,\qquad p_\theta=m r^2\dot\theta.\]  
*Reflection*: The centrifugal term appears automatically from the coordinate dependence of \(T\).

**Example 2 — Bead on a rotating wire**  
*Given:* Wire rotates at constant \(\Omega\), bead at distance \(q(t)\).  
*Find:* generalized force needed to keep \(\Omega\) constant.  
\(T=\frac12 m(\dot q^2+q^2\Omega^2)\), \(V=0\).  
\(p_q=m\dot q\).  
Lagrange equation gives \(m\ddot q-m q\Omega^2=Q_q\).  
The term \(-m q\Omega^2\) is absorbed into an effective generalized force from the rotating frame.  
**Final answer**  
\[Q_q=m(\ddot q-q\Omega^2).\]  
*Reflection*: Time-dependent constraints inject generalized forces even when no external torque acts.

**Example 3 — Charged particle in electromagnetic field**  
*Given:* \(L=\frac12 m v^2-q\phi+q\mathbf{v}\cdot\mathbf{A}\).  
*Find:* generalized momentum.  
\(p_j=m\dot q_j+q A_j\) *Why*: velocity-dependent potential contributes directly to \(\partial L/\partial\dot q_j\).  
**Final answer**  
\[p_j=m\dot q_j+q A_j.\]  
*Reflection*: The canonical momentum differs from mechanical momentum by the vector potential term.

**Example 4 — Double pendulum with friction at joints**  
*Given:* angles \(\theta_1,\theta_2\), frictional torques \(-c\dot\theta_1\), \(-c\dot\theta_2\).  
*Find:* generalized forces.  
Virtual work of friction: \(\delta W=-c\dot\theta_1\delta\theta_1-c\dot\theta_2\delta\theta_2\).  
Hence \(Q_1=-c\dot\theta_1\), \(Q_2=-c\dot\theta_2\).  
**Final answer**  
\[Q_j=-c\dot\theta_j.\]  
*Reflection*: Non-conservative torques appear unchanged because angles are already the generalized coordinates.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(p_j\) as \(m\dot q_j\) | Habit from Cartesian coordinates | Always compute \(\partial L/\partial\dot q_j\) explicitly |
| Forgetting that \(Q_j\) can depend on velocities | Rayleigh dissipation or magnetic forces | Include velocity-dependent terms in the virtual-work calculation |
| Using \(\partial/\partial q_j\) on time-dependent constraints | Coordinates explicitly contain \(t\) | Hold \(t\) fixed when differentiating |
| Confusing generalized force with ordinary force component | Projection is weighted by \(\partial\mathbf{r}/\partial q_j\) | Draw the virtual displacement \(\delta\mathbf{r}\) for each \(q_j\) |
| Assuming \(p_j\) is conserved whenever \(\dot q_j\) is cyclic | Requires \(\partial L/\partial q_j=0\) as well | Check both conditions before claiming conservation |
| Neglecting that \(Q_j\) does no work under ideal constraints | Constraints already removed from the coordinate set | Verify that \(\delta W_\text{constraint}=0\) before omitting terms |
| Sign error in moving potential terms | \(Q_j=-\partial V/\partial q_j\) moves to left side | Keep the sign consistent with virtual-work convention |

## 7. The textbook-precise statement
Let \(L(q,\dot q,t)\) be a Lagrangian that is at least twice continuously differentiable. The **generalized momentum** conjugate to coordinate \(q_j\) is  
\[p_j=\frac{\partial L}{\partial\dot q_j}.\]  
If the virtual work of applied forces (including non-conservative ones) is \(\delta W=\sum_j Q_j\delta q_j\), the **Euler-Lagrange equations** read  
\[\frac{d}{dt}\left(\frac{\partial L}{\partial\dot q_j}\right)-\frac{\partial L}{\partial q_j}=Q_j,\quad j=1,\dots,n.\]  
When all \(Q_j\) derive from a potential independent of velocity, they may be absorbed into \(L\). (Goldstein, *Classical Mechanics*, 3rd ed., §2.4 and §2.5.)

## 8. Visual — diagram or schematic
```text
q1 ───►  x = r cos θ
          y = r sin θ
               │
               │ virtual displacement δr
               ▼
          F = (Fx, Fy)
               │
               │ projection
               ▼
Q_r = F · (∂r/∂r)   Q_θ = F · (∂r/∂θ)
```
The diagram shows a position vector expressed in polar coordinates; the two generalized forces are the components of \(\mathbf{F}\) along the directions \(\partial\mathbf{r}/\partial r\) and \(\partial\mathbf{r}/\partial\theta\).

## 9. The memory technique
**The hook**: picture each generalized coordinate as a “slot” on a control panel; the momentum gauge on that slot reads \(\partial L/\partial\dot q_j\) while the force gauge reads the imbalance that drives the needle.

**What to overlearn**:  
1. \(p_j=\partial L/\partial\dot q_j\)  
2. \(\frac{d p_j}{dt}-\partial L/\partial q_j=Q_j\)  
3. If \(\partial L/\partial q_j=0\) and \(Q_j=0\) then \(p_j\) is constant.

**Spaced-repetition schedule**: 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**: start from \(\delta W=\sum\mathbf{F}_i\cdot\delta\mathbf{r}_i\), express every \(\delta\mathbf{r}_i\) in terms of the \(\delta q_j\), collect coefficients of each \(\delta q_j\); the coefficient is \(Q_j\). Differentiate \(T\) to obtain \(p_j\).

## 10. What this unlocks
With generalized momenta and forces in hand, the passage to Hamilton’s canonical equations, the Hamilton-Jacobi equation, and Poisson brackets becomes purely algebraic. The same objects appear in optimal-control formulations used by SpaceX and in the symplectic integrators that preserve energy in long-duration orbital simulations.

- Hamilton’s equations  
- Routhian reduction for cyclic coordinates  
- Canonical transformations and generating functions  
- Noether’s theorem for conserved quantities  
- Symplectic numerical integration

## 11. Self-check — five questions, no answers
1. A particle moves in a central potential. Choose polar coordinates. Show that \(p_\theta\) is conserved even though the Lagrangian depends explicitly on \(r\).

2. A bead slides on a frictionless wire shaped as \(y=ax^2\) under gravity. Write the single generalized force (if any) that appears when \(x\) is chosen as the coordinate.

3. In spherical coordinates the kinetic energy contains the term \(\frac12 m r^2\dot\phi^2\sin^2\theta\). Compute the generalized momentum conjugate to \(\phi\) and state the condition under which it is conserved.

4. A velocity-dependent force \(\mathbf{F}=-b\mathbf{v}\) acts on a particle whose position is parameterized by \(q(t)\). Derive the expression for \(Q\) and show it is linear in \(\dot q\).

5. Two different sets of generalized coordinates describe the same physical system. Demonstrate that the numerical value of the Lagrangian is identical while the numerical values of the individual \(p_j\) generally differ.