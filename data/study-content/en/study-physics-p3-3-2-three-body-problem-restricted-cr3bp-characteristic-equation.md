## 1. The one-sentence answer
**The characteristic equation of the Circular Restricted Three-Body Problem (CR3BP) is the fifth-degree polynomial in \(\lambda^2\) that arises from the linearized variational equations about a collinear Lagrange point and whose roots decide whether nearby motion is bounded, oscillatory, or exponentially divergent.**

In the CR3BP two primary masses orbit each other in perfect circles while a third body of negligible mass feels only their combined gravity. When the equations of motion are written in the rotating synodic frame, five equilibrium points appear; the three collinear points lie on the line joining the primaries. To learn how a spacecraft or asteroid behaves when placed near one of these points, the nonlinear equations are linearized about the chosen equilibrium. The resulting constant-coefficient system yields a characteristic polynomial whose roots are the possible exponents (or frequencies) of small departures from equilibrium.

Because the system is Hamiltonian and autonomous, the polynomial is even in \(\lambda\) and of degree five in \(\lambda^2\). Real positive roots produce exponential growth and therefore instability; purely imaginary roots produce bounded oscillations. The precise locations of these roots therefore classify each Lagrange point as linearly stable or unstable.

> [!NOTE]
> The single algebraic object that converts an equilibrium from a geometric point into a statement about stability is this fifth-degree characteristic polynomial; everything else in linear CR3BP analysis follows from its roots.

## 2. Why this matters — concrete and current
NASA’s Gateway lunar space station will operate in a near-rectilinear halo orbit about the Earth–Moon L2 point; mission designers rely on the roots of the CR3BP characteristic equation to size station-keeping budgets and to guarantee that insertion errors remain bounded for weeks.

The European Space Agency’s LISA mission places three spacecraft in a triangular formation about the Sun–Earth L1 point; the same characteristic equation supplies the natural frequencies that must be decoupled from the gravitational-wave measurement band.

JAXA’s EQUULEUS CubeSat, launched on Artemis I, used a low-energy transfer through the Earth–Moon L2 region whose design began with a linear stability map generated from the CR3BP eigenvalues.

In exoplanet dynamics, the stability of trojan planets at the L4/L5 points of a star–planet system is decided by the same polynomial; recent TESS discoveries of candidate trojans are vetted against the sign of its real roots.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Synodic rotating frame | Removes explicit time dependence so equilibria become fixed points |
| Jacobi integral | Supplies the only known integral of motion and constrains the linearised energy surface |
| Linearisation of autonomous ODEs | Converts nonlinear vector field into a constant matrix whose spectrum is read from the characteristic polynomial |
| Properties of Hamiltonian matrices | Guarantees that eigenvalues appear in \(\pm\lambda, \pm\lambda^*\) quartets, restricting the possible root patterns |

## 4. Building the idea — from intuition to formalism

### Step 1 — Equilibrium points exist only after switching to a rotating frame
In an inertial frame the two primaries move, so no fixed point exists for the third body. Shifting to the frame that rotates with the primaries freezes their positions and converts the problem into an autonomous system whose equilibria satisfy a simple algebraic balance between gravity and centrifugal force.

Example: place the primaries at \((- \mu,0)\) and \((1-\mu,0)\) with \(\mu = m_2/(m_1+m_2)\). Setting velocities and accelerations to zero yields the well-known quintic for the collinear points.

> [!WARNING]
> Forgetting that the centrifugal term changes sign when the frame is non-rotating produces equilibria that do not exist in the original problem.

### Step 2 — Linearisation produces a constant-coefficient variational equation
Let \(\mathbf{x}_0\) be a collinear equilibrium. Write the state as \(\mathbf{x} = \mathbf{x}_0 + \boldsymbol{\xi}\). Substituting into the CR3BP vector field and discarding quadratic and higher terms gives
\[
\dot{\boldsymbol{\xi}} = A\boldsymbol{\xi},
\]
where \(A\) is the Jacobian matrix evaluated at \(\mathbf{x}_0\).

### Step 3 — The Jacobian matrix has a Hamiltonian block structure
The CR3BP equations derive from a Hamiltonian, so \(A\) satisfies
\[
A = J H_{xx},
\]
with \(J\) the standard symplectic matrix. Consequently the characteristic polynomial \(\det(A - \lambda I)\) is an even function of \(\lambda\) and contains only even powers.

### Step 4 — Explicit evaluation yields a fifth-degree polynomial in \(\lambda^2\)
After inserting the second derivatives of the effective potential at a collinear point, the determinant expands to
\[
\lambda^6 + 2(c_2+1)\lambda^4 + (1+2c_2-c_2^2)\lambda^2 - (1+2c_2-c_2^2)c_2 = 0,
\]
where \(c_2 = U_{xx}\) evaluated at the Lagrange point. Letting \(s = \lambda^2\) produces the monic quintic
\[
s^5 + a s^4 + b s^3 + c s^2 + d s + e = 0.
\]

### Step 5 — Roots classify linear stability
Purely imaginary roots correspond to oscillatory modes (centre manifold); a real positive root produces an exponential divergence (hyperbolic manifold). Because the system is Hamiltonian, roots appear symmetrically; therefore any real root immediately implies linear instability of the equilibrium.

## 5. Worked examples — every step shown

**Example 1 — Characteristic polynomial at L1 in the Earth–Moon system**  
*Given:* \(\mu = 0.01215\), \(x_1 \approx 0.8369\).  
*Find:* the monic quintic in \(s = \lambda^2\).  

Compute \(c_2 = 1 + 2/x_1^3 \approx 3.190\).  
Substitute into the coefficients:  
\(a = 2(c_2+1) \approx 8.380\),  
\(b = 1+2c_2-c_2^2 \approx -2.190\),  
\(c = -c_2 b \approx 6.987\),  
\(d = 0\), \(e = 0\) (exact for planar case after reduction).  
The polynomial is therefore
\[
s^5 + 8.380 s^4 - 2.190 s^3 + 6.987 s^2 = 0.
\]
**Final answer**  
\[
s^2(s^3 + 8.380 s^2 - 2.190 s + 6.987) = 0
\]

*Reflection:* The extra \(s^2\) factor reflects the two trivial zero-frequency modes removed by the Jacobi integral constraint.

**Example 2 — Root classification**  
*Given:* the cubic factor above.  
*Find:* number of real positive roots.  

Numerical solution yields one real root \(s \approx 4.12 > 0\) and two complex-conjugate pairs. One positive real root implies a real \(\lambda = \sqrt{s}\) and therefore linear instability.

**Example 3 — Frequency of planar oscillation at L4**  
For the triangular point the same procedure produces a biquadratic whose imaginary roots give the well-known frequencies \(\omega_{1,2} = \sqrt{(1\pm\sqrt{1-27\mu(1-\mu)})/2}\).

**Example 4 — Effect of increasing \(\mu\)**  
When \(\mu > \mu_R \approx 0.0385\) the triangular-point polynomial acquires a positive real root, destroying linear stability. The transition is detected simply by evaluating the constant term of the quintic.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the characteristic equation as fourth-order | Forgetting the out-of-plane \(\lambda^2 + c_2 = 0\) factor | Always factor the determinant into planar 4×4 and vertical 2×2 blocks first |
| Sign error in \(c_2\) | Confusing the effective potential \(U\) with its negative | Remember \(c_2 = U_{xx}\) and \(U\) already includes centrifugal potential |
| Assuming all roots are purely imaginary at L4/L5 | Overlooking Routh’s critical mass ratio | Compute the discriminant of the biquadratic before claiming stability |
| Using inertial rather than synodic coordinates | The linearisation matrix is frame-dependent | Derive the equations in the rotating frame from the start |
| Dropping the Jacobi integral constraint | Leads to an extra zero root that is dynamically meaningless | Reduce the system to the energy surface before forming the polynomial |
| Numerical root finders missing multiple roots | Quintic is ill-conditioned near \(\mu_R\) | Use exact symbolic coefficients and Sturm sequences instead of floating-point solvers |

## 7. The textbook-precise statement
Let the CR3BP Hamiltonian be written in the synodic frame with effective potential \(U(x,y,z)\). At a collinear equilibrium \(\mathbf{x}_0\) the Hessian of \(U\) supplies the constant \(c_2 = U_{xx}(\mathbf{x}_0)\). The linearised equations admit the characteristic polynomial
\[
\lambda^6 + 2(c_2+1)\lambda^4 + (1+2c_2-c_2^2)\lambda^2 - c_2(1+2c_2-c_2^2) = 0
\]
(Szebehely, *Theory of Orbits*, Academic Press 1967, §3.4, Eq. 3.4-17). The equilibrium is linearly unstable if and only if this polynomial possesses at least one positive real root.

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
L4        |        L3
  \       |       /
   \      |      /
    \     |     /
     L1---O-----L2     ---> x (rotating frame)
    /     |     \
   /      |      \
  /       |       \
L5        |        (primary masses on x-axis)
          |
```
The diagram shows the five Lagrange points in the synodic frame. The characteristic equation is formed only at L1, L2, L3 (collinear) where the linearised spectrum contains real eigenvalues; at L4 and L5 the spectrum may be purely imaginary below the Routh mass ratio.

## 9. The memory technique
1. **The hook** — Picture a quintic “see-saw” whose single positive real root is a trap-door that opens an escape route for any nearby particle.
2. **What to overlearn** — The exact coefficient pattern \(2(c_2+1)\), \(1+2c_2-c_2^2\), and the factor \(-c_2(1+2c_2-c_2^2)\).
3. **Spaced-repetition schedule** — Review roots at 1 day, 3 days, 7 days, 16 days, 35 days after first derivation.
4. **First-principles fallback** — Re-derive the Jacobian from the second partials of \(U\), insert into \(\det(A-\lambda I)\), and exploit the symplectic structure to confirm the polynomial is even.

## 10. What this unlocks
Mastery of the CR3BP characteristic equation is the gateway to halo-orbit design, invariant-manifold transfers, and the centre-manifold reduction that yields practical station-keeping algorithms.

- Construction of periodic and quasi-periodic orbits (Lyapunov, halo, Lissajous)
- Computation of stable and unstable manifolds for low-energy capture
- Normal-form transformations that remove non-resonant terms
- Extension to the bicircular and elliptic restricted problems

## 11. Self-check — five questions, no answers
1. Why does the characteristic polynomial contain only even powers of \(\lambda\)?
2. Compute the numerical value of \(c_2\) at the Sun–Earth L1 point to three decimal places.
3. For what range of \(\mu\) does the triangular-point quintic possess four purely imaginary roots?
4. If a positive real root \(s_1\) exists, how many real eigenvalues \(\lambda\) does the original sixth-order matrix possess?
5. In the limit \(\mu\to 0\), the L1 and L2 points approach the secondary; what happens to the largest real root of the characteristic equation?