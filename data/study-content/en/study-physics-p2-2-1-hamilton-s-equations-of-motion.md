## 1. The one-sentence answer
**Hamilton's equations of motion are the first-order differential equations \(\dot{q}_i = \partial H/\partial p_i\) and \(\dot{p}_i = -\partial H/\partial q_i\) that govern the time evolution of a mechanical system once its Hamiltonian \(H(q,p,t)\) is known.**

They arise by replacing the second-order Euler-Lagrange equations with an equivalent pair of first-order equations written in terms of coordinates and their conjugate momenta. The Hamiltonian itself is obtained from the Lagrangian via a Legendre transform that swaps velocities for momenta, yielding a function whose value is usually the total energy expressed in phase-space variables. This switch converts the geometry of configuration space into the symplectic geometry of phase space, where the equations take an especially symmetric form.

The practical payoff is immediate: every conserved quantity corresponds to a cyclic coordinate whose conjugate momentum is constant, and the entire dynamics can be generated from a single scalar function \(H\) by taking partial derivatives. No second derivatives appear, initial conditions are stated directly as positions and momenta, and numerical integration or perturbation methods become simpler.

> [!NOTE]
> The single deepest insight is that the Hamiltonian is not merely “energy rewritten”; it is the generator of time evolution on phase space, so its partial derivatives literally are the velocities and forces.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance algorithms propagate the six-degree-of-freedom rigid-body equations in Hamiltonian form because the conserved angular-momentum components appear automatically as constants of motion, reducing the number of integrated variables during coast phases.

In semiconductor quantum-dot control, researchers at Intel and academic groups use Hamilton’s equations to model the classical trajectories of electrons in time-dependent electrostatic potentials; the phase-space formulation makes symplectic integrators stable over the nanosecond timescales needed for qubit gate calibration.

ESA’s JUICE mission to Jupiter employs Hamiltonian perturbation theory to design the multi-flyby trajectory that exploits the Laplace resonance among the Galilean moons; the Delaunay variables are canonical momenta conjugate to orbital angles, allowing direct application of Hamilton’s equations to resonant arguments.

High-energy physicists at CERN simulate 10^12-turn beam dynamics in the LHC by splitting the Hamiltonian into drift and kick maps; each map is an exact solution of a piece of Hamilton’s equations, preserving phase-space volume to machine precision.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Lagrangian mechanics     | Supplies the starting point \(L(q,\dot{q},t)\) that is transformed into \(H\). |
| Legendre transform       | Converts velocities into momenta and produces the Hamiltonian. |
| Partial derivatives      | Hamilton’s equations are literally statements about \(\partial H/\partial q_i\) and \(\partial H/\partial p_i\). |
| Phase space              | The 2n-dimensional manifold whose coordinates are \((q,p)\) on which the flow is defined. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From velocities to momenta
The Lagrangian treats velocities \(\dot{q}\) as independent of coordinates \(q\). To obtain a first-order system we need a variable whose time derivative is already the acceleration information. Define the conjugate momentum by \(p_i = \partial L/\partial \dot{q}_i\). This definition is the first half of the Legendre transform.

For a free particle, \(L = \frac12 m\dot{x}^2\), so \(p = m\dot{x}\). The formal statement is
\[
p_i \equiv \frac{\partial L}{\partial \dot{q}_i}.
\]

> [!WARNING]
> Treating \(p_i\) as simply “mass times velocity” fails for velocity-dependent potentials such as the magnetic term \(q\mathbf{v}\cdot\mathbf{A}\).

### Step 2 — The Hamiltonian via Legendre transform
Invert the relation above to express \(\dot{q}_i\) in terms of \(p_i\) and form the scalar
\[
H(q,p,t) = p_i\dot{q}_i - L(q,\dot{q},t).
\]
The velocities on the right-hand side are now regarded as functions of \(p\).

For the free particle this yields \(H = p^2/(2m)\). In display math:
\[
H(q,p,t) = p_i \dot{q}_i(q,p,t) - L(q,\dot{q}(q,p,t),t).
\]

> [!WARNING]
> Forgetting that \(\dot{q}\) must be eliminated in favour of \(p\) leaves \(H\) written in mixed variables and produces inconsistent equations.

### Step 3 — Differential of the Hamiltonian
Take the total differential of \(H\) and compare coefficients with the differential of \(L\). After using the Euler-Lagrange equation, the cross terms cancel and one obtains
\[
dH = \dot{q}_i\,dp_i - \dot{p}_i\,dq_i - \frac{\partial L}{\partial t}dt.
\]
Reading off the coefficients immediately supplies Hamilton’s equations.

### Step 4 — The canonical equations
The coefficients of \(dp_i\) and \(dq_i\) give the two sets of first-order equations
\[
\dot{q}_i = \frac{\partial H}{\partial p_i}, \qquad \dot{p}_i = -\frac{\partial H}{\partial q_i}.
\]
These are the textbook statement of Hamilton’s equations of motion.

### Step 5 — Time evolution of any function
For an arbitrary phase-space function \(f(q,p,t)\), the chain rule together with Hamilton’s equations produces
\[
\frac{df}{dt} = \{f,H\} + \frac{\partial f}{\partial t},
\]
where \(\{,\}\) is the Poisson bracket. This shows that \(H\) truly generates the entire dynamics.

## 5. Worked examples — every step shown

**Example 1 — Simple harmonic oscillator**  
*Given:* \(L = \frac12 m\dot{x}^2 - \frac12 kx^2\).  
*Find:* Hamilton’s equations.  

Compute \(p = \partial L/\partial\dot{x} = m\dot{x}\).  
*Why:* definition of conjugate momentum.  

Invert: \(\dot{x} = p/m\).  
*Why:* solve for velocity.  

Form Hamiltonian:  
\[
H = p\cdot\frac{p}{m} - \left(\frac12 m\left(\frac{p}{m}\right)^2 - \frac12 kx^2\right) = \frac{p^2}{2m} + \frac12 kx^2.
\]
*Why:* Legendre transform.  

Hamilton’s equations:  
\[
\dot{x} = \frac{\partial H}{\partial p} = \frac{p}{m}, \qquad \dot{p} = -\frac{\partial H}{\partial x} = -kx.
\]
**Final answer**  
\[
\dot{x} = p/m, \quad \dot{p} = -kx.
\]

*Reflection:* The second equation is Newton’s second law recovered; the first is the kinematic definition of momentum.

**Example 2 — Particle in a magnetic field (velocity-dependent potential)**  
*Given:* \(L = \frac12 m\dot{\mathbf{r}}^2 + q\dot{\mathbf{r}}\cdot\mathbf{A}(\mathbf{r})\).  
*Find:* conjugate momenta and Hamiltonian.  

\(p_i = m\dot{x}_i + qA_i\).  
*Why:* partial derivative hits both kinetic and vector-potential terms.  

Hamiltonian after inversion:  
\[
H = \frac{1}{2m}(\mathbf{p}-q\mathbf{A})^2.
\]
*Why:* Legendre transform removes the velocity dependence.  

Equations follow by direct differentiation.

*Reflection:* The magnetic force appears automatically as \(\dot{p}_i = q(\mathbf{v}\times\mathbf{B})_i\) without ever writing \(\mathbf{B}\) explicitly.

**Example 3 — Two-dimensional isotropic oscillator**  
*Given:* \(H = (p_x^2 + p_y^2)/(2m) + \frac12 m\omega^2(x^2 + y^2)\).  
*Find:* time evolution of \(x(t)\).  

Write the four equations:  
\[
\dot{x} = p_x/m, \quad \dot{p}_x = -m\omega^2 x
\]
(and identical pair for \(y\)).  
*Why:* definition of Hamilton’s equations.  

Differentiate the first and substitute the second to recover \(\ddot{x} + \omega^2 x = 0\).  
*Why:* eliminate momenta.  

Solution: \(x(t) = A\cos(\omega t + \phi)\), \(p_x(t) = -m\omega A\sin(\omega t + \phi)\).

*Reflection:* The phase-space orbit is an ellipse whose area is an adiabatic invariant.

**Example 4 — Time-dependent driven oscillator**  
*Given:* \(H = p^2/(2m) + \frac12 m\omega^2 x^2 - f(t)x\).  
*Find:* equation for \(\dot{p}\).  

Direct differentiation:  
\[
\dot{p} = -\frac{\partial H}{\partial x} = -m\omega^2 x + f(t).
\]
*Why:* the driving term contributes with a minus sign.  

Combined with \(\dot{x} = p/m\) this yields the driven harmonic-oscillator equation.

*Reflection:* Time dependence in \(H\) does not alter the form of the canonical equations; it only makes energy non-conserved.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing \(\dot{q} = \partial H/\partial q\) | Sign error from confusing which variable is differentiated | Always remember \(\dot{p} = - \partial H/\partial q\). |
| Keeping velocities inside \(H\) | Failure to complete the Legendre transform | Solve \(p = \partial L/\partial\dot{q}\) for every \(\dot{q}\) before forming \(H\). |
| Treating \(H\) as \(T+V\) when potentials depend on velocity | Magnetic or dissipative terms are omitted | Compute \(H = p\dot{q}-L\) explicitly. |
| Forgetting that \(q\) and \(p\) are independent variables | Old habit from Lagrangian mechanics | In phase space, \(\partial/\partial q\) holds \(p\) fixed. |
| Using the same symbol for \(L\) and \(H\) cyclic coordinates | Notation collision | Label cyclic coordinates separately in each formalism. |
| Ignoring explicit time dependence when checking energy conservation | \(\partial H/\partial t \neq 0\) | Check \(\mathrm{d}H/\mathrm{d}t = \partial H/\partial t\) at every step. |
| Applying Hamilton’s equations to non-canonical variables | Coordinates not obtained from a Legendre transform | Verify the fundamental Poisson brackets \(\{q_i,p_j\}=\delta_{ij}\). |

## 7. The textbook-precise statement
Let \(Q\) be an \(n\)-dimensional configuration manifold with local coordinates \(q^i\). Let \(L:TQ\times\mathbb{R}\to\mathbb{R}\) be a regular Lagrangian. The fibre derivative (Legendre transform) defines the Hamiltonian \(H:T^*Q\times\mathbb{R}\to\mathbb{R}\) on the cotangent bundle. Then the integral curves of the Hamiltonian vector field \(X_H\) satisfy Hamilton’s canonical equations
\[
\frac{dq^i}{dt}=\frac{\partial H}{\partial p_i},\qquad\frac{dp_i}{dt}=-\frac{\partial H}{\partial q^i}.
\]
(Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §8.1, eqs. 8.3–8.4.)

## 8. Visual — diagram or schematic
```text
Phase-space plane (q,p)
          p ↑
            |     . (q(t),p(t))
            |    /
            |   /  flow lines of X_H
            |  /
 q --------+--------→ q
            |
            |
```
Horizontal axis: coordinate \(q\); vertical axis: conjugate momentum \(p\). Each point is a state; the vector \((\partial H/\partial p, -\partial H/\partial q)\) is tangent to the trajectory.

## 9. The memory technique
1. **The hook** — Picture a frictionless hockey puck on an infinite table whose height is exactly the value of \(H\); the slope of the table in the \(q\) direction pushes the momentum, while the slope in the \(p\) direction sets how fast the puck slides in \(q\).

2. **What to overlearn** — The pair \(\dot{q}=\partial H/\partial p\), \(\dot{p}=-\partial H/\partial q\); the definition \(H=p\dot{q}-L\); the statement that \(H\) generates time evolution via Poisson brackets.

3. **Spaced-repetition schedule** — Review the two canonical equations at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback** — Re-derive from the differential of \(H\) obtained via the Legendre transform; the coefficients of \(dq\) and \(dp\) are the equations.

## 10. What this unlocks
Hamilton’s equations open the door to symplectic geometry, canonical transformations, action-angle variables, and Hamilton-Jacobi theory.

- Canonical perturbation theory for nearly-integrable systems (KAM theorem)
- Symplectic integrators used in long-term orbital propagation
- Quantization rules that replace Poisson brackets by commutators
- Optimal-control formulations in aerospace guidance

## 11. Self-check — five questions, no answers
1. Starting from \(L=\frac12 m\dot{r}^2 - V(r)\) in spherical coordinates, obtain the Hamiltonian and write the four Hamilton equations for \(r\) and \(p_r\).

2. A system has \(H=q p^2\). Compute \(\mathrm{d}H/\mathrm{d}t\) along trajectories and decide whether energy is conserved.

3. Show that if \(H\) does not depend explicitly on time then \(H\) itself is a constant of the motion.

4. Identify the mistake: a student writes \(\dot{p}=-\partial H/\partial\dot{q}\). Explain why this expression is dimensionally and conceptually invalid.

5. For the Hamiltonian of a charged particle in an electromagnetic field, verify that Hamilton’s equations reproduce the Lorentz force law.