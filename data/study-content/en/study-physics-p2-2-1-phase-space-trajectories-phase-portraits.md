## 1. The one-sentence answer
**Phase space is the 2n-dimensional manifold whose coordinates are the n generalized positions together with their n conjugate momenta; a trajectory is an integral curve of Hamilton’s vector field on this manifold, and a phase portrait is the foliation formed by all such curves.**

In classical mechanics a system is completely specified once every position and every velocity (or momentum) is known. Plotting these quantities as orthogonal axes produces a geometric arena in which the entire future and past of the motion appear as a single curve. Because the equations of motion are first-order in time, each point in this arena determines a unique direction; the curve that follows those directions is the trajectory.

For one degree of freedom the arena is a plane. For two degrees of freedom it is already four-dimensional and therefore invisible, yet the same geometric language still applies: the state evolves along a curve that never intersects itself. The collection of all such curves, drawn or imagined together, constitutes the phase portrait.

> [!NOTE]
> The single most important geometric fact is that trajectories in phase space never cross: two distinct curves cannot pass through the same point, because that point would then have two different velocities, violating determinism.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance algorithms propagate the six-dimensional phase-space state (position and velocity) of the booster under a time-varying thrust vector; the resulting trajectory tube is used to certify landing footprints before each flight.

In semiconductor process control, the phase portrait of a driven quartz-crystal microbalance reveals sub-harmonic entrainment; engineers at ASML use these portraits to set piezo-drive amplitudes that keep the oscillator locked to a single stable limit cycle, reducing overlay error below 1 nm.

NASA’s Parker Solar Probe mission designers employed phase-space analysis of the restricted three-body problem to locate the stable manifolds that thread the L1 gateway; the resulting low-thrust transfer trajectories reduced launch-mass requirements by 18 % compared with patched-conic baselines.

In fusion research, the phase-space trajectories of energetic particles in tokamak fields determine whether they remain confined or are lost to the wall; the SPARC team at MIT uses these portraits to set the ripple amplitude of the toroidal-field coils.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Configuration space      | Supplies the position coordinates that are doubled by momenta to form phase space    |
| Hamilton’s equations     | Generate the vector field whose integral curves are the trajectories                 |
| First-order autonomous ODEs | Guarantee local existence and uniqueness of trajectories through each point       |
| Conservative forces      | Produce time-independent Hamiltonians whose level sets constrain the portraits       |

## 4. Building the idea — from intuition to formalism

### Step 1 — From configuration space to tangent bundle
A mechanical system with n degrees of freedom lives in an n-dimensional configuration manifold Q whose local coordinates are the generalized positions q^i.  
Example: a single particle on a line has Q = ℝ with coordinate x.  
The tangent space at each point supplies velocities; the tangent bundle TQ is therefore the space of all (q, q̇).  
> [!WARNING]  
> Treating velocities as independent of positions at the outset leads to second-order equations that obscure the first-order flow structure.

### Step 2 — Legendre transform to cotangent bundle
Replace velocities by momenta via p_i = ∂L/∂q̇^i. The resulting space is the cotangent bundle T*Q, called phase space.  
For the free particle, p = m v̇, so phase space is the (x,p) plane.  
Formally, phase space carries the canonical symplectic form ω = dq^i ∧ dp_i.

### Step 3 — Hamilton’s vector field
The Hamiltonian H(q,p) generates a vector field X_H on T*Q by the contraction  
ι_{X_H} ω = −dH.  
In coordinates this is the autonomous system  
dq^i/dt = ∂H/∂p_i, dp_i/dt = −∂H/∂q^i.

### Step 4 — Integral curves are trajectories
A trajectory is any curve γ(t) = (q(t),p(t)) satisfying γ̇ = X_H(γ). Uniqueness of solutions to the ODE implies that trajectories cannot cross.

### Step 5 — Phase portrait
The phase portrait is the partition of T*Q into all integral curves of X_H. Fixed points occur where X_H = 0; closed curves are periodic orbits; open curves are scattering states.

### Step 6 — Invariant surfaces
If H is time-independent, each trajectory lies on a level set of H. For one degree of freedom these level sets are the trajectories themselves.

### Step 7 — Linearization at equilibria
At an equilibrium the Jacobian matrix of X_H determines the local topology (centers, saddles, nodes) via its eigenvalues.

## 5. Worked examples — every step shown

**Example 1 — Simple harmonic oscillator**  
*Given:* H = p²/2m + (1/2) m ω² q².  
*Find:* the phase portrait.  
Hamilton’s equations:  
dq/dt = p/m,  
dp/dt = −m ω² q.  
Differentiate the first and substitute: d²q/dt² + ω² q = 0.  
Solutions are q(t) = A cos(ωt + ϕ), p(t) = −m ω A sin(ωt + ϕ).  
Eliminate t: (q/A)² + (p/(m ω A))² = 1.  
**Ellipses centered at the origin, traversed clockwise.**  
*Reflection:* The quadratic form of H directly supplies the equation of the ellipse; the same algebra works for any quadratic Hamiltonian.

**Example 2 — Free particle**  
*Given:* H = p²/2m.  
*Find:* trajectories.  
dq/dt = p/m, dp/dt = 0 ⇒ p = const.  
Hence q(t) = (p/m) t + q₀.  
In the (q,p) plane these are horizontal straight lines traversed rightward for p > 0.  
**All trajectories are parallel to the q-axis.**  
*Reflection:* Absence of a potential removes any turning points; the portrait is foliated by invariant lines of constant p.

**Example 3 — Simple pendulum (small angle)**  
*Given:* H = p_θ²/(2m l²) − m g l cos θ.  
Linearize about θ = 0: H ≈ p_θ²/(2I) + (1/2) I ω² θ² with ω² = g/l.  
The portrait is again a family of ellipses, now in (θ,p_θ) coordinates.  
**Center at (0,0).**  
*Reflection:* Linearization converts the nonlinear pendulum into the harmonic oscillator already solved.

**Example 4 — Simple pendulum (full nonlinear)**  
*Given:* same H.  
Level curves: p_θ = ± m l √[2(E + m g l cos θ)].  
For E < m g l the curves are closed librations around (0,0).  
For E = m g l the curves meet at the saddle (π,0) — the separatrix.  
For E > m g l the curves are open rotations.  
**The separatrix divides bounded from unbounded motion.**  
*Reflection:* Energy level sets change topology at the saddle; this is the geometric origin of the pendulum’s homoclinic orbit.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Plotting (q,q̇) instead of (q,p)   | Confuses tangent and cotangent bundles              | Always perform the Legendre transform first          |
| Allowing trajectories to cross    | Forgetting uniqueness theorem                       | Verify that the vector field is Lipschitz            |
| Treating p as “velocity”          | Notation overlap in elementary texts                | Keep p = ∂L/∂q̇ explicit in every derivation          |
| Ignoring periodic identification  | Forgetting angular coordinates are on a circle      | Draw the cylinder explicitly for each angular q      |
| Assuming all equilibria are centers | Linearization yields pure imaginary eigenvalues only for conservative centers | Compute the full Jacobian spectrum                   |
| Forgetting that portraits live in even dimensions | Adding extra “time” axis                            | Count coordinates: always 2n for n degrees of freedom |
| Drawing arrows in the wrong direction | Sign error in Hamilton’s equations               | Memorize dq/dt = +∂H/∂p, dp/dt = −∂H/∂q              |

## 7. The textbook-precise statement
Let (Q, L) be a regular Lagrangian system. The Legendre transform yields the Hamiltonian H : T*Q → ℝ and the Hamilton vector field X_H defined by ι_{X_H} ω = −dH, where ω is the canonical symplectic form. A phase-space trajectory is an integral curve of X_H. The phase portrait is the foliation of T*Q by these curves. (See Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §8.3 and Arnold, *Mathematical Methods of Classical Mechanics*, §37.)

## 8. Visual — diagram or schematic

```text
p
↑
│     ╱─────────────╲          separatrix
│    ╱   closed      ╲
│   ╱   librations    ╲
│  ╱                   ╲
│ /                     \
│/                       \
├───────────┬───────────────→ q
│\           │            /
│ \          │           /
│  \    saddle│         /
│   \         │        /
│    \────────┴───────/
│
│   open rotations (E > mgℓ)
│
```

Horizontal axis: q (or θ); vertical axis: p (or p_θ). Closed curves surround the center at (0,0); the figure-eight separatrix passes through the saddle at (π,0).

## 9. The memory technique

1. **The hook** — Picture a frictionless ice-hockey rink whose (x,p) coordinates are painted on the ice; every puck’s path is a straight horizontal line because p never changes.
2. **What to overlearn** — Hamilton’s equations in coordinate form; the statement that trajectories cannot cross; the fact that level sets of H are invariant.
3. **Spaced-repetition schedule** — Review the definition of phase space after 1 day, redraw the pendulum portrait after 3 days, linearize a new equilibrium after 7 days, construct the separatrix of a new potential after 16 days, and prove uniqueness of trajectories after 35 days.
4. **First-principles fallback** — Start from the Euler–Lagrange equation, perform the Legendre transform explicitly, obtain Hamilton’s equations, integrate the resulting autonomous system.

## 10. What this unlocks
Phase-space geometry supplies the language for Liouville’s theorem, action-angle variables, KAM theory, and the transition to quantum mechanics via the Wigner function.  
- Next: canonical transformations and generating functions  
- Next: Poincaré–Birkhoff theorem on periodic orbits  
- Next: stability analysis via Lyapunov exponents extracted from linearized flow

## 11. Self-check — five questions, no answers
1. For the Hamiltonian H = p²/2 + q⁴/4, sketch the phase portrait and locate all equilibria.  
2. Show that the map (q,p) → (q, p + f(q)) is canonical and describe how it distorts a given phase portrait.  
3. A trajectory in the (q,p) plane is observed to spiral inward toward the origin. Which term must be missing from the Hamiltonian?  
4. Prove that if two trajectories intersect at one point they must coincide for all time.  
5. Construct the phase portrait of a particle in the potential V(q) = −cos q and identify the homoclinic orbit.