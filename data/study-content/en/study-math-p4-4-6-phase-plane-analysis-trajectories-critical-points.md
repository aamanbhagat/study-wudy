## 1. The one-sentence answer
**Phase-plane analysis studies autonomous planar systems by treating solution curves as trajectories in the (x,y)-plane and locating their equilibria at critical points where both derivatives vanish.**

An autonomous system consists of two first-order equations whose right-hand sides depend only on the state variables themselves. In the phase plane these equations become a vector field: at every point (x,y) an arrow indicates the instantaneous direction and speed of motion. A trajectory is simply the curve traced by a particle that always follows the local arrow; different initial conditions produce different trajectories, yet none may cross because the vector field is deterministic.

Critical points are the fixed locations where both components of the vector field are zero; the system remains at rest there. Linearizing the field around each such point yields a Jacobian matrix whose eigenvalues classify the local geometry—nodes, saddles, spirals, or centers—thereby revealing the global skeleton of all possible long-term behaviors.

> [!NOTE]
> The single most powerful insight is that stability and oscillation are decided entirely by the local linear picture at the critical points; global nonlinear features can at most deform trajectories without altering their topological type near each equilibrium.

## 2. Why this matters — concrete and current
SpaceX uses phase-plane portraits of the attitude-control equations for Falcon 9 to design the switching curves that guarantee finite-time convergence of the rocket’s orientation after stage separation, avoiding limit-cycle oscillations observed in early test flights.

In power-system engineering, the swing equations of synchronous generators are routinely reduced to a two-dimensional autonomous system; critical-point analysis identifies the region of attraction of the post-fault stable operating point and supplies the critical clearing time used by PJM Interconnection to set relay thresholds.

Synthetic-biology teams at MIT and Imperial College model the repressilator circuit as a planar autonomous system; locating the unique critical point and computing its eigenvalues predicts whether the genetic oscillator will produce sustained limit cycles or decay to a steady state, guiding promoter-strength choices before any wet-lab construction.

Semiconductor foundries apply phase-plane methods to the averaged models of switched-mode DC–DC converters; the location and type of the critical point determine whether the converter enters a stable periodic orbit or exhibits subharmonic instability under load transients.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Autonomous first-order systems | The vector field must be time-independent for trajectories to be unique curves in the plane. |
| Linear algebra of 2×2 matrices | Eigenvalues of the Jacobian classify every isolated critical point. |
| Existence-uniqueness theorem   | Guarantees that trajectories cannot cross, so the phase portrait is well-defined. |
| Basic phase-line analysis      | Supplies the one-dimensional intuition that extends directly to two dimensions. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The vector field replaces time
A pair of autonomous equations dx/dt = f(x,y), dy/dt = g(x,y) defines, at every point in the plane, a unique direction of motion. Plotting a short arrow at a grid of points produces a direction field whose integral curves are the trajectories.

Example: dx/dt = −y, dy/dt = x yields circular arrows everywhere; every trajectory is therefore a circle traversed counterclockwise.

Formally the vector field is the map (x,y) ↦ (f(x,y), g(x,y)).

> [!WARNING]
> If the right-hand sides depended explicitly on t, arrows would change with time and trajectories could cross, destroying the static portrait.

### Step 2 — Critical points are equilibria
A point (x₀,y₀) is critical when f(x₀,y₀) = g(x₀,y₀) = 0. The constant solution x(t) ≡ x₀, y(t) ≡ y₀ stays there forever.

Example: (−y,x) vanishes only at (0,0), the sole equilibrium.

Formally the set of critical points is the common zero set of the two component functions.

> [!WARNING]
> Mistaking a point where only one component vanishes for an equilibrium produces an incorrect portrait; both must be zero simultaneously.

### Step 3 — Linearization via the Jacobian
Near an isolated critical point the nonlinear field may be replaced by its first-order Taylor expansion. The Jacobian matrix J evaluated at the point supplies the linear system whose phase portrait approximates the nonlinear one.

Example: for dx/dt = −x + y², dy/dt = −y the Jacobian at (0,0) is diag(−1,−1), predicting a stable node.

The linear system is  
$$
\begin{pmatrix} \dot u \\ \dot v \end{pmatrix}
= J\begin{pmatrix} u \\ v \end{pmatrix}.
$$

> [!WARNING]
> When eigenvalues are zero or purely imaginary the linearization is inconclusive and higher-order terms decide the true local behavior.

### Step 4 — Eigenvalue classification
The trace τ and determinant Δ of J determine the eigenvalues λ = (τ ± √(τ²−4Δ))/2. The six generic cases are: stable/unstable node, saddle, stable/unstable spiral, and center.

Example: τ < 0, Δ > 0, τ²−4Δ > 0 yields a stable node; trajectories approach along the slower eigendirection.

> [!WARNING]
> Sign errors in computing τ or Δ invert stability conclusions and produce qualitatively wrong global portraits.

### Step 5 — Global trajectories from local portraits
Once every critical point is classified, trajectories are sketched by following the arrows while respecting the local sectors around saddles and nodes. Non-crossing and the Poincaré–Bendixson theorem close the argument for bounded planar flows.

The resulting phase portrait encodes all qualitative long-term behavior without solving the ODE explicitly.

## 5. Worked examples — every step shown

**Example 1 — Linear saddle**
*Given:*  
$$
\dot x = x,\qquad \dot y = -y.
$$
*Find:* phase portrait and stability of the origin.

Compute the Jacobian:  
$$
J = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}.
$$
Eigenvalues are λ₁ = 1, λ₂ = −1.  
The origin is a saddle.  
Unstable manifold: y = 0, x > 0 and x < 0.  
Stable manifold: x = 0, y > 0 and y < 0.  
**Final answer:** saddle at (0,0) with stable and unstable axes as above.

*Reflection:* The axes are already the eigendirections; any rotation would require an eigenvector calculation.

**Example 2 — Nonlinear stable node**
*Given:*  
$$
\dot x = -x - y^2,\qquad \dot y = -y.
$$
*Find:* behavior near (0,0).

Jacobian at (0,0):  
$$
J = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}.
$$
Both eigenvalues equal −1; linearization predicts a stable node. Higher-order term −y² does not alter the sign of the radial derivative, confirming attraction.  
**Final answer:** asymptotically stable node.

*Reflection:* The quadratic term is “flat” at the origin and cannot overcome the linear contraction.

**Example 3 — Spiral from trace and determinant**
*Given:*  
$$
\dot x = -x - y,\qquad \dot y = x - y.
$$
Jacobian:  
$$
J = \begin{pmatrix} -1 & -1 \\ 1 & -1 \end{pmatrix},\quad \tau=-2,\quad\Delta=2.
$$
Discriminant τ²−4Δ = −4 < 0, complex eigenvalues with negative real part → stable spiral.  
**Final answer:** trajectories spiral into (0,0).

*Reflection:* Computing only the sign of the real part suffices for stability; the imaginary part supplies the rotation.

**Example 4 — Center versus weak focus**
*Given:*  
$$
\dot x = -y + x^3,\qquad \dot y = x.
$$
Jacobian at (0,0) has eigenvalues ±i, inconclusive. Polar-coordinate analysis shows dr/dt = r³ cos⁴θ > 0 for r > 0, so trajectories slowly leave the origin.  
**Final answer:** unstable focus (weak).

*Reflection:* Purely imaginary eigenvalues always demand at least cubic terms; linearization alone is insufficient.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating a non-isolated zero set as equilibria | Multiple roots coincide along a curve       | Solve f = g = 0 algebraically and check isolation    |
| Forgetting that centers are delicate | Linearization yields ±i but nonlinear terms decide | Compute the sign of dr/dt in polar coordinates       |
| Drawing trajectories that cross     | Intuitive but violates uniqueness           | Enforce that distinct solutions cannot intersect     |
| Mis-signing the Jacobian trace      | Off-by-one error in differentiation         | Recalculate partial derivatives twice                |
| Ignoring degeneracy when Δ = 0      | Eigenvalues zero or repeated                | Shift to center-manifold or blow-up techniques       |
| Assuming global stability from local node | Distant saddles may create separatrices     | Sketch nullclines and invariant regions first        |
| Confusing spiral with node by eye   | Coarse grid hides rotation                  | Always compute discriminant before sketching         |

## 7. The textbook-precise statement
Let  
$$
\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}),\quad\mathbf{x}\in\mathbb{R}^2,
$$
where f is C¹. A point x* is a critical point if f(x*) = 0. The Jacobian J(x*) = D f(x*) determines the local phase portrait provided no eigenvalue has zero real part (hyperbolic case). In that case the Hartman–Grobman theorem asserts topological equivalence between the nonlinear flow and its linearization near x*. (Perko, *Differential Equations and Dynamical Systems*, 3e, §2.8.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     .  (spiral in)
          |    . .
          |   .   .
   stable |  .     .  unstable
   manifold| .       . manifold
   (node)  |___________(saddle)
          | .       .
          |  .     .
          |   .   .
          |    . .
          |     .
          +------------------> x
               saddle
```
Axes are the stable and unstable manifolds of the saddle; trajectories approach the saddle only along the stable axis and depart only along the unstable axis. A distant stable spiral is shown in the upper half-plane.

## 9. The memory technique

1. **The hook** — Picture each critical point as a mountain pass (saddle) or a bowl (node/spiral); water always flows downhill along the arrows.
2. **What to overlearn** — The six eigenvalue cases from trace τ and determinant Δ; the rule that trajectories never cross.
3. **Spaced-repetition schedule** — Review classification table at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the Jacobian from the chain rule on the vector field, then solve the characteristic equation λ² − τλ + Δ = 0.

## 10. What this unlocks
Phase-plane analysis supplies the geometric language for all subsequent qualitative theory of planar flows and forms the foundation for center-manifold reduction, Hopf bifurcation, and Poincaré–Bendixson theory.

- Limit-cycle detection via the Poincaré–Bendixson theorem
- Local bifurcation diagrams when parameters vary
- Construction of Lyapunov functions from the linearized portrait
- Global stability via Dulac’s criterion or index theory

## 11. Self-check — five questions, no answers
1. For the system dx/dt = x − y, dy/dt = x + y, classify the origin and state whether trajectories spiral or approach radially.
2. Construct the Jacobian of dx/dt = x² − y, dy/dt = −x + y² at (0,0) and decide whether linearization suffices.
3. Sketch the phase portrait of dx/dt = −x + x y, dy/dt = −y + x² near all critical points; indicate directions on the axes.
4. A trajectory appears to cross itself in a hand-drawn portrait. What theorem is violated and what must be true instead?
5. Given a system whose linearization at the origin yields eigenvalues ±i, outline the calculation needed to determine whether the origin is stable, unstable, or a center.