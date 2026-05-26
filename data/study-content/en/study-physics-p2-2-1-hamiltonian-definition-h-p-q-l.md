## 1. The one-sentence answer
**The Hamiltonian is the Legendre transform of the Lagrangian that replaces velocities with momenta as the independent variables, yielding a first-order formulation of dynamics on phase space.**

The definition begins from the observation that the Lagrangian \(L(q, \dot{q}, t)\) treats positions and velocities symmetrically, yet many problems become simpler once momenta \(p_i = \partial L / \partial \dot{q}_i\) are promoted to independent coordinates. The transformation subtracts \(L\) from the contraction \(\sum p_i \dot{q}_i\), producing a function \(H(q, p, t)\) whose natural variables are already the quantities conserved in time-independent cases.

This single algebraic step converts the second-order Euler–Lagrange equations into a symmetric pair of first-order equations. The resulting \(H\) equals the total energy whenever the Lagrangian is of the standard kinetic-minus-potential form and the coordinates are scleronomic.

> [!NOTE]
> The Hamiltonian is not merely “energy rewritten”; it is the generating function whose partial derivatives directly supply the time evolution of every coordinate and momentum.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance algorithms recast the ascent problem in Hamiltonian form so that primer-vector theory yields the optimal thrust direction without repeated numerical differentiation of the Lagrangian.

NASA’s ARTEMIS program uses Hamiltonian Monte Carlo sampling inside its trajectory-design toolbox to explore the chaotic Earth–Moon phase space; the same symplectic structure guarantees long-term conservation of the Jacobi integral over thousands of revolutions.

In superconducting qubit control, the circuit Hamiltonian is obtained from the Lagrangian of the Josephson junctions exactly via the definition \(H = \sum p_i \dot{q}_i - L\); this produces the charge and flux operators whose spectra determine gate fidelity at Rigetti and IBM.

High-energy beam dynamics at CERN’s LHC are propagated with Hamiltonian integrators (MAD-X) because the phase-space volume preservation prevents artificial emittance growth that would otherwise appear after 10^5 turns.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Lagrangian \(L = T - V\) | Supplies the starting function to be transformed          |
| Generalized momentum \(p_i = \partial L / \partial \dot{q}_i\) | Identifies the new independent variables                  |
| Euler–Lagrange equation  | Shows why the second-order system must be replaced        |
| Total differential       | Required to compute the differential of \(H\) correctly   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognize that velocities are inconvenient
Velocities appear inside \(L\) but are not directly measured; momenta are the quantities that remain constant when symmetries are present.  
Example: free particle \(L = \frac12 m \dot{x}^2\) gives \(p = m\dot{x}\), already the conserved quantity.  
Formal statement: introduce \(p_i \equiv \partial L / \partial \dot{q}_i\).  
> [!WARNING]
> Treating \(p_i\) as a function of \(\dot{q}\) after the transform will destroy the independence of the new variables.

### Step 2 — Form the contraction that matches dimensions of energy
The product \(p_i \dot{q}_i\) has units of energy; summing over all degrees of freedom produces a scalar with the same dimensions as \(L\).  
Example: harmonic oscillator \(p\dot{q} = (m\dot{q})\dot{q} = m\dot{q}^2\).  
Formal statement: define the auxiliary function \(\sum_i p_i \dot{q}_i\).

### Step 3 — Subtract the Lagrangian
The combination \(\sum p_i \dot{q}_i - L\) cancels all explicit velocity dependence once the \(p_i\) are regarded as independent.  
Example: \(H = m\dot{q}^2 - (\frac12 m\dot{q}^2 - \frac12 k q^2) = \frac12 m\dot{q}^2 + \frac12 k q^2\).  
Formal statement: \(H(q,p,t) \equiv \sum_i p_i \dot{q}_i - L(q,\dot{q},t)\).

### Step 4 — Eliminate velocities in favor of momenta
Solve the defining relations \(p_i = \partial L / \partial \dot{q}_i\) for each \(\dot{q}_i\) and substitute; the result is expressed solely in \(q,p\).  
Example: \(\dot{q} = p/m\) yields \(H = p^2/(2m) + \frac12 k q^2\).

### Step 5 — Verify the total differential
Compute \(dH\) and observe that \(\dot{q}_i = \partial H / \partial p_i\), \(-\dot{p}_i = \partial H / \partial q_i\).  
Formal statement: \(dH = \sum (\dot{q}_i dp_i - \dot{p}_i dq_i) - \partial L / \partial t \, dt\).

### Step 6 — Arrive at the textbook definition
When the Lagrangian does not depend explicitly on time, \(H\) is the energy expressed in phase-space coordinates.  
The definition is therefore \(H(q,p,t) = \sum_i p_i \dot{q}_i(q,p,t) - L(q,\dot{q}(q,p,t),t)\).

## 5. Worked examples — every step shown

**Example 1 — One-dimensional free particle**  
*Given:* \(L = \frac12 m \dot{x}^2\).  
*Find:* \(H(x,p)\).  
1. Compute momentum: \(p = \partial L / \partial \dot{x} = m\dot{x}\).  
   *Why:* definition of conjugate momentum.  
2. Form contraction: \(p\dot{x} = m\dot{x}^2\).  
   *Why:* prepares the Legendre transform.  
3. Subtract \(L\): \(H = m\dot{x}^2 - \frac12 m\dot{x}^2 = \frac12 m\dot{x}^2\).  
   *Why:* produces the new function.  
4. Solve for velocity: \(\dot{x} = p/m\).  
   *Why:* eliminates the old variable.  
**\(H = p^2 / (2m)\)**  

*Reflection:* The example is trivial yet shows that \(H\) equals kinetic energy when \(V=0\); the same algebra works in any dimension.

**Example 2 — Simple harmonic oscillator**  
*Given:* \(L = \frac12 m \dot{q}^2 - \frac12 k q^2\).  
*Find:* \(H(q,p)\).  
1. \(p = m\dot{q}\).  
2. \(p\dot{q} = m\dot{q}^2\).  
3. \(H = m\dot{q}^2 - (\frac12 m\dot{q}^2 - \frac12 k q^2) = \frac12 m\dot{q}^2 + \frac12 k q^2\).  
4. Substitute \(\dot{q} = p/m\): \(H = p^2/(2m) + \frac12 k q^2\).  
**\(H = \frac{p^2}{2m} + \frac12 k q^2\)**  

*Reflection:* The potential term survives unchanged; this pattern holds for any velocity-independent potential.

**Example 3 — Particle in electromagnetic field**  
*Given:* \(L = \frac12 m v^2 - q\phi + q v\cdot A\).  
*Find:* \(H(r,p)\).  
1. \(p = m v + q A\).  
2. \(p\cdot v = m v^2 + q v\cdot A\).  
3. \(H = m v^2 + q v\cdot A - (\frac12 m v^2 - q\phi + q v\cdot A) = \frac12 m v^2 + q\phi\).  
4. Solve \(v = (p - q A)/m\): \(H = \frac1{2m}(p - q A)^2 + q\phi\).  
**\(H = \frac{(p - q A)^2}{2m} + q\phi\)**  

*Reflection:* The vector potential appears inside the kinetic term after the transform, a direct consequence of the minimal-coupling Lagrangian.

**Example 4 — Relativistic free particle**  
*Given:* \(L = -m c^2 \sqrt{1 - v^2/c^2}\).  
*Find:* \(H\).  
1. \(p = \gamma m v\).  
2. \(p\cdot v = \gamma m v^2\).  
3. \(H = \gamma m v^2 + m c^2 \sqrt{1 - v^2/c^2}\).  
4. Algebraic rearrangement yields \(H = \sqrt{p^2 c^2 + m^2 c^4}\).  
**\(H = \sqrt{(pc)^2 + (mc^2)^2}\)**  

*Reflection:* The square-root structure survives because the Legendre transform of the relativistic Lagrangian is the on-shell energy.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to solve for \(\dot{q}\) | Habit of leaving velocities explicit        | Always invert \(p = \partial L / \partial \dot{q}\) before writing \(H\) |
| Sign error in definition          | Confusing with Euler homogeneous function   | Memorize \(H = p\dot{q} - L\), never the reverse     |
| Treating \(H\) as always equal to energy | Works only for standard \(T-V\) Lagrangians | Check whether \(L\) is quadratic in velocities       |
| Using time-dependent constraints without care | Coordinates become rheonomic                | Verify \(\partial L / \partial t\) term before claiming \(H = E\) |
| Differentiating \(H\) while holding \(\dot{q}\) fixed | Old variables still in mind                 | Differentiate only after substitution                |
| Omitting the sum over repeated indices | Cartesian intuition                         | Write the explicit summation until the notation is automatic |
| Assuming \(H\) is conserved when \(\partial H / \partial t \neq 0\) | Over-generalizing “energy conservation”     | Inspect explicit time dependence first               |

## 7. The textbook-precise statement
Let \(L(q,\dot{q},t)\) be a \(C^2\) function on the tangent bundle. Define the fiber derivative (Legendre map) \(p_i = \partial L / \partial \dot{q}_i\). If this map is a local diffeomorphism, the Hamiltonian is the function on the cotangent bundle given by
\[
H(q,p,t) = \sum_i p_i \dot{q}_i(q,p,t) - L(q,\dot{q}(q,p,t),t).
\]
When the Lagrangian is hyperregular, \(H\) generates Hamilton’s equations. (Goldstein, *Classical Mechanics*, 3rd ed., §8.1.)

## 8. Visual — diagram or schematic
```text
q-axis (configuration)          p-axis (momentum)
      ↑                               ↑
      |                               |
      |          H = const            |
      |         (level curves)        |
      |     .--------------.          |
      |    /                \         |
      |   /    phase-space   \        |
      |  |      orbit         |       |
      |   \                  /        |
      |    '--------------'           |
      +-------------------------→ q
```
Horizontal axis: generalized coordinate \(q\); vertical axis: conjugate momentum \(p\). Closed curves are level sets of \(H(q,p)\); the flow is everywhere tangent to these curves with speed given by Hamilton’s equations.

## 9. The memory technique
1. **The hook** — Picture a balance scale: the term \(\sum p_i \dot{q}_i\) sits on one pan, the Lagrangian on the other; whatever remains is the Hamiltonian, the “net weight” expressed in momentum coordinates.  
2. **What to overlearn** — \(H \equiv p\dot{q} - L\) (one degree of freedom) and the two inversion relations \(\dot{q} = \partial H / \partial p\), \(\dot{p} = -\partial H / \partial q\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the total differential of \(L\), impose the definition of \(p\), and rearrange; the same algebra recovers \(H\) and Hamilton’s equations.

## 10. What this unlocks
Hamilton’s canonical equations, the symplectic geometry of phase space, Liouville’s theorem, action-angle variables, Hamilton–Jacobi theory, and modern geometric integrators all rest on this definition.  
- Hamilton’s equations of motion  
- Poisson brackets and Lie algebra structure  
- Canonical transformations  
- Symplectic numerical methods for long-term orbital propagation  

## 11. Self-check — five questions, no answers
1. Starting from \(L = \frac12 m(\dot{x}^2 + \dot{y}^2) - V(r)\), obtain \(H\) in polar coordinates and verify it equals total energy.  
2. For a charged particle in a time-varying vector potential, show that \(H\) is not the mechanical energy and identify the extra term.  
3. A system has \(L = \frac12 \dot{q}^2 - \frac12 q^2 + f(t)q\). Compute \(H(q,p,t)\) and decide whether it is conserved.  
4. Demonstrate that the Legendre transform of \(L = -mc^2\sqrt{1-v^2/c^2}\) yields the relativistic energy expression without assuming the answer.  
5. Two Lagrangians differ by a total time derivative: \(L' = L + dF/dt\). Show that the resulting Hamiltonians differ only by a canonical transformation.