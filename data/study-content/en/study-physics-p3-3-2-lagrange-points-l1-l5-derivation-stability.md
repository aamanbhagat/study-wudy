## 1. The one-sentence answer
**Lagrange points L1–L5 are the five equilibrium solutions of the circular restricted three-body problem in which the net force (gravity plus centrifugal) vanishes in the rotating frame, so a negligible-mass body can remain fixed relative to the two primaries.**

Two bodies of masses \(M_1 > M_2\) orbit their common barycenter in circles. In the frame rotating with that orbital angular velocity \(\omega\), an effective potential exists that combines Newtonian gravity with the centrifugal term. Stationary points of this potential are locations where a third body of vanishing mass experiences zero net acceleration and therefore stays at rest relative to the two larger bodies.

The five solutions consist of three collinear points (L1, L2, L3) lying on the line joining the primaries and two equilateral-triangle points (L4, L5) located 60° ahead of and behind the smaller primary. Linear stability analysis shows that only L4 and L5 can be stable; the collinear points are always unstable.

> [!NOTE]
> The “aha” is that the Coriolis force, although velocity-dependent, supplies the restoring mechanism that stabilizes the triangular points when the mass ratio satisfies \(\mu < 0.0385\); without rotation there would be no stable equilibria at all.

## 2. Why this matters — concrete and current
NASA’s James Webb Space Telescope orbits the Sun–Earth L2 point in a halo orbit, where the combined gravitational and centrifugal accelerations allow continuous station-keeping with minimal propellant while the spacecraft remains thermally stable on the anti-solar side of Earth.

The joint ESA–NASA Solar and Heliospheric Observatory (SOHO) has operated at Sun–Earth L1 since 1996; the point’s unstable character is exploited for rapid halo-orbit transfers that give an uninterrupted view of the Sun without Earth occultation.

Jupiter’s Trojan asteroids populate the Sun–Jupiter L4 and L5 regions; more than 12 000 have been catalogued, confirming that the triangular Lagrange points remain populated over solar-system lifetimes when the mass ratio is favourable.

The upcoming ESA PLATO mission will station a photometric observatory near Sun–Earth L2, and several commercial lunar-communication architectures plan relay satellites at Earth–Moon L2 to maintain continuous line-of-sight with the lunar far side.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Newtonian inverse-square gravity | Supplies the only forces acting on the third body. |
| Barycentric two-body circular orbits | Defines the constant angular velocity \(\omega\) of the rotating frame. |
| Non-inertial rotating frames | Introduces both centrifugal and Coriolis accelerations that must be balanced at equilibrium. |
| Linearisation of vector fields about equilibria | Required to classify stability via eigenvalues of the Jacobian. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two primaries in circular orbit
Place two masses \(M_1\) and \(M_2\) on circular orbits about their barycenter with separation \(R\). Their common angular velocity satisfies Kepler’s third law in the form \(\omega^2 R^3 = G(M_1 + M_2)\).  
**Example.** For the Sun–Earth system, \(M_1 \approx 333\,000\,M_\ Earth\), \(R = 1\) AU, yielding \(\omega \approx 2\pi\) rad yr\(^{-1}\).  
The formal statement is the centripetal acceleration balance:
\[
\omega^2 = \frac{G(M_1 + M_2)}{R^3}.
\]
> [!WARNING]
> Treating the primaries as fixed in inertial space removes the centrifugal term and yields no equilibria except the trivial two-body collision points.

### Step 2 — Shift to the synodic (rotating) frame
Attach a coordinate system that rotates with angular velocity \(\omega\) about the barycenter. In this frame the two primaries are stationary. The acceleration of a test mass now includes fictitious terms \(-\omega \times (\omega \times \mathbf{r})\) (centrifugal) and \(-2\omega \times \mathbf{v}\) (Coriolis).

### Step 3 — Construct the effective potential
The gravitational potential is \(U_g = -G M_1/r_1 - G M_2/r_2\). Adding the centrifugal potential produces the effective potential
\[
U = -\frac{G M_1}{r_1} - \frac{G M_2}{r_2} - \frac12 \omega^2 (x^2 + y^2).
\]
Equilibrium points satisfy \(\nabla U = 0\).

### Step 4 — Normalise units
Set \(G = 1\), \(R = 1\), \(M_1 + M_2 = 1\). Let \(\mu = M_2/(M_1 + M_2)\). The primaries lie at \((-\mu,0)\) and \((1-\mu,0)\). The effective potential becomes
\[
U = -\frac{1-\mu}{r_1} - \frac{\mu}{r_2} - \frac12 (x^2 + y^2).
\]

### Step 5 — Locate the collinear points
Set \(y = 0\) and solve \(\partial U/\partial x = 0\). The resulting quintic equation admits exactly three real roots, one between the masses (L1), one beyond \(M_2\) (L2), and one on the far side of \(M_1\) (L3).

### Step 6 — Locate the triangular points
Assume an equilateral configuration: \(r_1 = r_2 = 1\). The points satisfying both \(\partial U/\partial x = 0\) and \(\partial U/\partial y = 0\) lie at
\[
(x,y) = \Bigl( \tfrac12 - \mu,\ \pm \tfrac{\sqrt3}{2}\Bigr),
\]
labelled L4 (positive \(y\)) and L5 (negative \(y\)).

### Step 7 — Linearise the equations of motion
The full equations in the rotating frame are
\[
\ddot x - 2\dot y = \frac{\partial U}{\partial x},\qquad \ddot y + 2\dot x = \frac{\partial U}{\partial y}.
\]
Taylor-expand about each equilibrium to obtain a linear system \(\dot{\mathbf{z}} = A\mathbf{z}\). Stability requires all eigenvalues of \(A\) to be purely imaginary.

### Step 8 — Stability criterion
For the collinear points the characteristic equation always possesses at least one real positive root, implying exponential divergence. For the triangular points the eigenvalues remain imaginary if and only if
\[
\mu(1-\mu) < \frac{1}{27}\qquad\Leftrightarrow\qquad \mu < \frac12\bigl(1 - \sqrt{23/27}\bigr) \approx 0.03852.
\]

## 5. Worked examples — every step shown

**Example 1 — Normalised Sun–Earth L1 location**  
*Given:* \(\mu = 3.003 \times 10^{-6}\).  
*Find:* Approximate \(x\) coordinate of L1.  
Step 1: Write the quintic \(\xi^5 - (3-\mu)\xi^4 + \dots = 0\) where \(\xi = x - (1-\mu)\).  
*Why:* Shift origin to \(M_2\).  
Step 2: For small \(\mu\) retain leading terms to obtain \(\xi^3 \approx \mu/3\).  
*Why:* Dominant balance between \(M_2\) gravity and centrifugal difference.  
Step 3: \(\xi \approx (\mu/3)^{1/3} \approx 0.01\).  
**Final answer:** \(x_{L1} \approx 0.99\) (in units of AU).  
*Reflection:* The cubic approximation already gives three correct digits; higher-order terms refine halo-orbit insertion.

**Example 2 — Eigenvalue computation for L1**  
*Given:* Linearised matrix \(A\) at Sun–Earth L1.  
*Find:* One real eigenvalue.  
The characteristic polynomial factors; one real root is \(\lambda \approx +2.5 \omega\).  
*Why:* Positive real part implies saddle instability.  
**Final answer:** \(\lambda \approx +2.5\omega\) (unstable).  
*Reflection:* All three collinear points share this saddle character.

**Example 3 — Mass-ratio stability boundary**  
*Given:* \(\mu = 0.04\).  
*Find:* Stability verdict for L4.  
Compute \(\mu(1-\mu) = 0.0384 > 1/27 \approx 0.0370\).  
*Why:* Violates Routh’s criterion.  
**Final answer:** L4/L5 linearly unstable.  
*Reflection:* The Sun–Jupiter value \(\mu \approx 0.001\) lies comfortably inside the stable regime.

**Example 4 — Trojan asteroid libration period**  
*Given:* Sun–Jupiter L4, small displacement.  
*Find:* Frequency of in-plane libration.  
The imaginary eigenvalues are \(\pm i \omega \sqrt{(27/4)\mu(1-\mu) - 1}\).  
*Why:* Derived from the quadratic factor of the characteristic equation.  
**Final answer:** Period \(\approx 150\) yr for Jupiter Trojans.  
*Reflection:* The slow libration explains the long-term clustering observed in the Trojan swarms.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the Coriolis term when checking stability | The force is velocity-dependent and vanishes at equilibrium, so it is omitted from \(\nabla U\). | Always retain the full linearised velocity terms in the Jacobian. |
| Confusing barycentric with primary-centred coordinates | Many diagrams place the larger mass at the origin. | Fix the normalised barycentric frame from the outset; convert only after locating the points. |
| Treating L4/L5 as stable for any mass ratio | The Routh limit is rarely memorised. | Evaluate \(\mu < 0.0385\) explicitly for each system. |
| Neglecting that L1–L3 are unstable in all directions | Only one positive real eigenvalue is needed for instability. | Compute the full spectrum; a single positive root suffices. |
| Using inertial-frame accelerations without fictitious forces | Beginners stay in the inertial frame and find no stationary solutions. | Switch to the synodic frame before writing force balance. |
| Assuming zero velocity at L4/L5 implies zero Coriolis | The stability mechanism requires motion; linearisation captures oscillatory velocities. | Solve the linear system rather than the static potential alone. |
| Ignoring that halo orbits are not equilibria | Periodic orbits exist around the points; the points themselves remain equilibria. | Distinguish the equilibrium location from the families of orbits that surround it. |

## 7. The textbook-precise statement
In the circular restricted three-body problem the equations of motion in the synodic frame admit exactly five equilibrium points. Three are collinear with the primaries; their linearisation possesses at least one eigenvalue with positive real part. The remaining two form equilateral triangles with the primaries and are linearly stable if and only if the smaller mass parameter satisfies \(\mu < \frac12(1-\sqrt{23/27})\). (Szebehely, *Theory of Orbits*, Academic Press 1967, §3.3–3.5.)

## 8. Visual — diagram or schematic
```text
          L4
         /  \
        /    \
   M1 -------- M2 -------- L3
        \    /
         \  /
          L5
L1 lies between M1 and M2; L2 lies beyond M2.
Axes: barycenter at origin, x along line of primaries, y perpendicular.
All distances normalised to R = 1.
```

## 9. The memory technique
1. **The hook** — Picture two suns with a hidden “Trojan horse” parked 60° ahead; the horse stays put only when the smaller sun is less than about 4 % of the total mass.  
2. **What to overlearn** — Normalised coordinates of L4/L5: \((1/2-\mu,\pm\sqrt3/2)\); Routh’s limit \(\mu<0.0385\); the quintic for collinear points.  
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the effective potential \(U\), set \(\nabla U=0\), then linearise the equations of motion and extract the characteristic equation.

## 10. What this unlocks
Mastery of Lagrange-point equilibria supplies the foundation for halo-orbit design, station-keeping budgets, and resonance analysis in multi-body systems.  
- Next: invariant manifolds and heteroclinic transfers between Lagrange points.  
- Next: Lissajous and halo-orbit families via numerical continuation.  
- Next: four-body extensions (e.g., Sun–Earth–Moon L2).  
- Next: low-thrust trajectory optimisation anchored at artificial Lagrange points.

## 11. Self-check — five questions, no answers
1. Derive the quintic equation satisfied by the normalised x-coordinate of L1 and obtain the leading-order approximation for small \(\mu\).  
2. Compute the four eigenvalues of the linearised system at Sun–Earth L2 and confirm the presence of a real positive root.  
3. For a hypothetical binary star system with mass ratio 0.05, decide whether L4 remains linearly stable and justify the conclusion with the Routh criterion.  
4. A spacecraft is displaced by a small velocity perturbation at L1. Sketch the resulting unstable manifold in the synodic plane.  
5. Explain why the triangular points can be stable even though the effective potential \(U\) possesses a saddle at those locations.