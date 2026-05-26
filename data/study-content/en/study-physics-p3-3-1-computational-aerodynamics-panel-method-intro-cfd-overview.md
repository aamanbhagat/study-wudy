## 1. The one-sentence answer
**Panel methods reduce steady, irrotational, inviscid flow around a body to a linear system by placing singularity distributions on a discretized surface, while CFD solves the governing partial differential equations directly on a volumetric mesh.**

Potential flow obeys Laplace’s equation for the velocity potential. Any solution can be built by superposing elementary singularities whose strengths are fixed by requiring that the body surface be a streamline. When the surface is broken into panels, each panel carries an unknown strength; enforcing flow tangency at one collocation point per panel produces a dense but modest-sized matrix equation that is solved once.

The same surface-only reduction fails once viscosity or compressibility introduces vorticity or entropy gradients; the full field equations must then be discretized throughout a volume grid that stretches from the body into the far field. Panel methods therefore remain the fastest tool for preliminary aerodynamic shapes, while CFD supplies the accuracy needed once shocks, boundary layers, or separation appear.

> [!NOTE]
> The decisive insight is dimensionality reduction: a three-dimensional exterior flow problem collapses to an algebraic system whose size equals the number of surface panels, not the number of cells in a surrounding volume mesh.

## 2. Why this matters — concrete and current
NASA’s X-59 QueSST low-boom demonstrator used a panel-method code (PAN AIR) in the initial outer-mold-line optimization loop because thousands of candidate shapes could be evaluated in minutes on a desktop before any Euler or RANS run was launched.

Airbus employs a hybrid panel-plus-boundary-layer solver (FLOWer) during the early loads envelope for the A321XLR wing; the surface-only discretization supplies pressure distributions that feed structural sizing long before the final CFD verification on a 50-million-cell grid.

SpaceX evaluates Falcon 9 first-stage re-entry aerodynamics with both vortex-lattice panel codes for rapid trajectory trades and full CFD for the final transonic buffet margins that determine the re-entry flip maneuver timeline.

The 2023 AIAA Drag Prediction Workshop demonstrated that modern panel methods augmented with viscous corrections still match wind-tunnel drag within 8 % for transonic transport configurations at cruise, illustrating that the technique remains industrially relevant even when full CFD is available.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Velocity potential       | Laplace’s equation supplies the governing PDE for panel methods |
| Superposition principle  | Linear combination of elementary solutions satisfies the same PDE |
| Flow-tangency condition  | Provides the boundary condition that closes the panel system |
| Source and vortex singularities | Elementary building blocks whose induced velocities are known analytically |
| Matrix inversion         | The resulting algebraic system is solved numerically      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Irrotational and inviscid flow implies a potential
Any velocity field satisfying \(\nabla\times\mathbf{V}=0\) can be written \(\mathbf{V}=\nabla\phi\). Substituting into the steady continuity equation for incompressible flow immediately yields Laplace’s equation \(\nabla^2\phi=0\).

A thin flat plate at zero incidence in a uniform stream satisfies this equation everywhere except on the plate itself.

The formal statement is
\[
\nabla^2\phi=0
\]
everywhere in the flow field exterior to solid boundaries.

> [!WARNING]
> If even weak vorticity is present, the velocity is no longer the gradient of a scalar and the entire panel construction collapses.

### Step 2 — Elementary solutions can be superposed
Because Laplace’s equation is linear, any linear combination of known solutions remains a solution. The source potential \(\phi=( \Lambda/2\pi)\ln r\) and the vortex potential \(\phi=( \Gamma/2\pi)\theta\) are two such elementary solutions.

Placing a source of strength \(\Lambda\) at the origin produces a purely radial velocity field whose magnitude is \(\Lambda/(2\pi r)\).

The induced velocity at an arbitrary point \(\mathbf{r}\) due to a singularity of strength \(\gamma\) located at \(\mathbf{r}_0\) is
\[
\mathbf{V}(\mathbf{r})=\gamma\,\mathbf{K}(\mathbf{r}-\mathbf{r}_0),
\]
where \(\mathbf{K}\) is the known kernel for that singularity.

### Step 3 — Surface boundary condition closes the problem
The body surface must be a streamline, so the normal component of velocity vanishes:
\[
\frac{\partial\phi}{\partial n}=0
\]
on the surface (or equals a prescribed transpiration velocity).

For a closed body in a free-stream \(\mathbf{V}_\infty\), this condition is enforced at discrete collocation points.

### Step 4 — Discretization into panels
The surface is subdivided into \(N\) straight or curved segments (panels). On each panel a constant, linear, or quadratic distribution of singularity strength is assumed.

A constant-strength source panel of length \(\Delta s_j\) centered at \(\mathbf{r}_j\) contributes a velocity at collocation point \(i\) equal to
\[
\mathbf{V}_{ij}=\frac{\Lambda_j}{2\pi}\int_{\text{panel }j}\frac{\mathbf{r}_i-\mathbf{r}'}{|\mathbf{r}_i-\mathbf{r}'|^2}\,ds'.
\]

### Step 5 — Assembly of the influence matrix
Evaluating the normal-velocity contribution of every panel at every collocation point produces the dense matrix equation
\[
[A]\{\Lambda\}=\{-\mathbf{V}_\infty\cdot\mathbf{n}\},
\]
where \(A_{ij}\) is the normal velocity induced at point \(i\) by unit strength on panel \(j\).

### Step 6 — Solution and post-processing
The linear system is solved for the unknown strengths \(\Lambda_j\). Surface velocity is recovered by summing the tangential contributions of all panels plus the free stream; surface pressure follows from Bernoulli’s equation.

For lifting bodies an additional Kutta condition supplies one extra equation that fixes the circulation.

## 5. Worked examples — every step shown

**Example 1 — Non-lifting circular cylinder**
*Given:* Uniform flow \(V_\infty=1\), cylinder radius \(R=1\), \(N=8\) equal source panels.
*Find:* Source strengths that satisfy flow tangency.
Place collocation points at panel midpoints. The influence matrix \(A\) is assembled from the analytic source kernel; symmetry forces all \(\Lambda_j\) equal. Solving the 8×8 system yields \(\Lambda_j=0\) for every panel because the free-stream normal velocity is already canceled by the image of a doublet inside the cylinder. The surface velocity is therefore exactly \(2\sin\theta\), recovering the analytic potential-flow solution.

**Example 2 — Source panel on a flat plate**
*Given:* Flat plate of length 2 at zero incidence, one source panel of length 2 with unknown strength \(\Lambda\).
*Find:* \(\Lambda\) that satisfies tangency at the midpoint.
The normal induced velocity at the midpoint due to a constant source sheet is \(\Lambda/2\). Setting this equal to \(-V_\infty\cdot n=0\) immediately gives \(\Lambda=0\). Reflection: the example is trivial yet demonstrates that a single collocation point per panel produces a square system whose size equals the number of unknowns.

**Example 3 — Vortex panel for a flat-plate airfoil**
*Given:* Flat plate chord \(c=1\), angle of attack \(\alpha=5^\circ\), four equal-length vortex panels.
*Find:* Panel circulations satisfying flow tangency and the Kutta condition.
The 4×4 influence matrix is filled with the normal velocity induced by a constant vortex sheet segment. Adding the Kutta condition that the vorticity at the trailing edge is zero augments the system to five equations for four unknowns; the extra equation is satisfied by placing an explicit trailing-edge condition. Inversion yields lift coefficient \(C_L=2\pi\sin\alpha\approx0.548\), within 3 % of thin-airfoil theory.

**Example 4 — Compressible correction via Prandtl-Glauert**
*Given:* The incompressible pressure coefficient on an airfoil is \(C_{p,\text{inc}}=-0.8\) at a point where local Mach number is expected near 0.6.
*Find:* First-order compressible pressure coefficient.
Apply the Prandtl-Glauert transformation
\[
C_{p,\text{comp}}=\frac{C_{p,\text{inc}}}{\sqrt{1-M_\infty^2}}.
\]
Substitution gives \(C_{p,\text{comp}}=-1.0\). Reflection: the panel solution itself remains incompressible; the correction is applied after the surface velocities are obtained.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using constant-strength panels on a cambered airfoil without wake | The Kutta condition is omitted, producing infinite trailing-edge velocity | Enforce explicit Kutta condition or switch to linear vorticity panels |
| Ignoring compressibility above M≈0.3 | Panel kernels are derived for incompressible flow   | Apply Prandtl-Glauert or use subsonic panel codes with compressibility corrections |
| Collocation points placed at panel edges | Induced velocity is singular there                  | Always collocate at panel centers or use Gaussian quadrature |
| Treating separated flows with panel methods | Potential flow cannot represent wakes or vortices shed from separation lines | Switch to CFD or couple panel method with integral boundary-layer code |
| Overly coarse far-field boundary in CFD | Reflections contaminate surface pressures           | Place far-field boundary at least 50 chord lengths away or use non-reflecting boundary conditions |
| Forgetting that panel methods give only surface data | Volume quantities such as downwash in the wake are not directly available | Superpose the known singularity distribution analytically in the field when needed |

## 7. The textbook-precise statement
A panel method for incompressible potential flow seeks a velocity potential \(\phi\) satisfying \(\nabla^2\phi=0\) in the exterior domain together with \(\partial\phi/\partial n=\mathbf{V}_\infty\cdot\mathbf{n}\) on the body surface \(S_B\) and the Kutta condition on a trailing edge. The solution is represented as a linear combination of source and doublet (or vortex) distributions on \(S_B\); collocation at \(N\) surface points produces the dense linear system
\[
\sum_{j=1}^N A_{ij}\mu_j=b_i,\qquad i=1,\dots,N,
\]
where \(\mu_j\) are the unknown singularity strengths. (Katz & Plotkin, *Low-Speed Aerodynamics*, 2nd ed., §10.3.)

## 8. Visual — diagram or schematic
```text
          far-field boundary (CFD)
   +---------------------------------------+
   |                                       |
   |          volume cells (Euler/RANS)    |
   |                   .                   |
   |                .     .                |
   |             .           .             |
   |          .                 .          |
   +--------/-------------------\----------+
           /  panel 1   panel 2   \   <-- surface panels (panel method)
          /                         \
         airfoil                    wake (optional)
```
The diagram shows a closed airfoil surface discretized into panels (lower dimensionality) versus a surrounding volumetric mesh that fills the entire computational domain out to an artificial far-field boundary.

## 9. The memory technique

1. **The hook** — Picture the airplane skin covered with thousands of tiny “faucets” (sources) and “whirlpools” (vortices); you adjust their strengths until no flow crosses the skin.
2. **What to overlearn** — Laplace’s equation \(\nabla^2\phi=0\), the flow-tangency statement \(\mathbf{V}\cdot\mathbf{n}=0\), and the size of the influence matrix equals the number of panels.
3. **Spaced-repetition schedule** — Review the matrix assembly at 1 day, re-derive the source kernel at 3 days, solve a four-panel flat-plate example at 7 days, compare panel versus RANS drag on an airfoil at 16 days, and implement a simple 2-D code at 35 days.
4. **First-principles fallback** — Start from \(\nabla\times\mathbf{V}=0\) → existence of \(\phi\) → \(\nabla^2\phi=0\) → Green’s identity → surface integral representation → discretization.

## 10. What this unlocks
Mastery of panel methods supplies the fastest route to three-dimensional induced-drag and stability derivatives; it also forms the inner loop of many modern aerodynamic shape-optimization frameworks. The immediate next concepts are boundary-layer coupling, transonic small-disturbance theory, and unstructured-grid Euler solvers.

- Vortex-lattice and doublet-lattice extensions for unsteady and 3-D wings
- Viscous-inviscid interaction codes
- Automatic differentiation of panel codes for gradient-based optimization
- Volume-grid generation techniques required for full CFD

## 11. Self-check — five questions, no answers
1. A constant-source panel of length \(\Delta s\) induces what normal velocity exactly at its own midpoint?
2. Why does a closed constant-source distribution around a body produce zero net mass flux when the body is impermeable?
3. For an airfoil at angle of attack, how many additional equations does the Kutta condition supply relative to the number of panels?
4. In a panel solution the surface pressure coefficient is obtained from Bernoulli’s equation; what velocity component is deliberately omitted and why?
5. When the free-stream Mach number approaches 0.6, which single scalar factor multiplies every incompressible pressure coefficient in the Prandtl-Glauert correction, and what physical assumption is thereby invoked?