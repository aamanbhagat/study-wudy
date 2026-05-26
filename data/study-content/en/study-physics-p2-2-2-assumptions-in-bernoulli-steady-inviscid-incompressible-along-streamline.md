## 1. The one-sentence answer
**Bernoulli's equation is valid solely for flows that are steady, inviscid, and incompressible when the equation is applied along a single streamline.**

These four restrictions arise directly from the integration of the Euler equations. Steady flow removes all time derivatives, so fluid particles experience no local acceleration. Inviscid flow drops the viscous stress tensor, leaving only pressure and body forces. Incompressible flow sets density constant, allowing it to exit the derivatives. Restricting attention to one streamline converts the vector equation into a scalar ordinary differential equation along that path.

Remove any one of these conditions and the simple algebraic relation between pressure, velocity, and height ceases to hold without additional correction terms. The equation therefore functions as a specialized integral of momentum conservation rather than a universal statement about fluids.

> [!NOTE]
> The four assumptions are not optional simplifications; each one is mathematically required for the integration step that produces \(P + \frac12\rho v^2 + \rho gh = \text{const}\).

## 2. Why this matters — concrete and current
In the Merlin 1D engine, propellant feed lines are sized with Bernoulli’s relation under the steady, incompressible assumption to predict pressure drop between tank and pump inlet; SpaceX engineers later add small viscous corrections measured on the test stand.

Pitot-static probes on commercial aircraft compute indicated airspeed from the difference between total and static pressure; the probes are calibrated assuming steady, inviscid, incompressible flow below Mach 0.3, with separate tables applied once compressibility becomes measurable.

High-pressure water-jet cutting systems rely on Bernoulli to convert pump pressure into exit velocity; the nozzles are deliberately short so the flow remains effectively inviscid and the incompressible assumption is accurate to within 1 %.

In astrophysical accretion disks around young stars, observers apply a streamline-restricted Bernoulli integral to infer launch velocities of disk winds once they have verified that radiative cooling keeps the gas effectively incompressible over the acceleration zone.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Definition of a streamline | Bernoulli integrates only along a line tangent to the local velocity vector at every point. |
| Euler equations          | They are the inviscid momentum equations whose integration yields Bernoulli under the remaining assumptions. |
| Material derivative      | Steady flow sets the partial time derivative to zero, collapsing the material acceleration to the convective term alone. |
| Constant density         | Allows density to be pulled outside every derivative, turning the continuity and momentum equations into the required integrable form. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the Euler equations
The Euler equations express momentum conservation for a fluid with zero viscosity. In vector form they read
\[
\frac{D\mathbf{v}}{Dt} = -\frac{1}{\rho}\nabla P + \mathbf{g}.
\]
If viscosity were retained, an extra term \(\nu\nabla^2\mathbf{v}\) would survive and prevent the subsequent exact integration.

> [!WARNING]
> Treating a real fluid with significant boundary layers as inviscid will under-predict drag and over-predict peak velocities.

### Step 2 — Impose steady flow
Steady flow means \(\partial/\partial t = 0\) everywhere, so the material derivative reduces to the convective operator \((\mathbf{v}\cdot\nabla)\mathbf{v}\). The unsteady term \(\partial\mathbf{v}/\partial t\) would otherwise remain inside the integral and destroy the simple algebraic relation.

### Step 3 — Restrict evaluation to a single streamline
A streamline satisfies \(d\mathbf{x}\times\mathbf{v}=0\). Along this curve the velocity vector is everywhere tangent to the path, allowing the convective term to be rewritten as \(v\,dv/ds\) where \(s\) is arc length. The vector equation thereby collapses to a scalar ordinary differential equation.

### Step 4 — Assume constant density
With \(\rho=\text{const}\), the pressure gradient term integrates directly to \(P/\rho\). Variable density would leave an integral \(\int dp/\rho\) that cannot be evaluated without an additional equation of state.

### Step 5 — Include gravity as a conservative body force
Gravity derives from a potential \(\Phi=gh\). The body-force term therefore integrates to \(\rho gh\). Any non-conservative force would leave an un-integrable remainder.

### Step 6 — Perform the line integration
Integrating the simplified scalar equation from station 1 to station 2 along the chosen streamline produces the textbook statement
\[
P_1 + \frac12\rho v_1^2 + \rho g h_1 = P_2 + \frac12\rho v_2^2 + \rho g h_2.
\]

## 5. Worked examples — every step shown

**Example 1 — Horizontal pipe contraction**  
*Given:* Water (\(\rho=1000\,\text{kg m}^{-3}\)) flows steadily through a horizontal tube that contracts from 5 cm to 2 cm diameter. Inviscid, incompressible.  
*Find:* Exit pressure when inlet pressure is 200 kPa and inlet speed is 1 m s\(^{-1}\).  

Continuity gives \(v_2=v_1(A_1/A_2)=6.25\,\text{m s}^{-1}\).  
Bernoulli along the centerline streamline (horizontal, so \(h_1=h_2\)) yields  
\[
P_2=P_1+\frac12\rho(v_1^2-v_2^2).
\]
Substitution produces \(P_2=180.5\,\text{kPa}\).  
**180.5 kPa**  

*Reflection:* The example is simple because every assumption is satisfied exactly; the only arithmetic is algebraic rearrangement.

**Example 2 — Pitot tube in low-speed air**  
*Given:* Air at 15 °C, \(\rho=1.225\,\text{kg m}^{-3}\), flows at unknown speed past a pitot probe. Measured \(\Delta P=500\,\text{Pa}\).  
*Find:* Freestream speed.  

Apply Bernoulli between stagnation point (v=0) and freestream along the streamline that reaches the pitot mouth:  
\[
P_\infty+\frac12\rho v_\infty^2=P_0.
\]
Solve for speed: \(v_\infty=\sqrt{2\Delta P/\rho}=28.7\,\text{m s}^{-1}\).  
**28.7 m s\(^{-1}\)**  

*Reflection:* The probe axis must coincide with a streamline; misalignment introduces an error that grows with angle of attack.

**Example 3 — Flow over a wing with viscosity**  
*Given:* Same geometry and speeds as Example 2, but now the fluid is honey (\(\mu=10\,\text{Pa s}\)).  
*Find:* Whether Bernoulli still predicts surface pressure.  

Viscous boundary layers produce entropy and total-pressure loss. The measured surface pressure lies 12 % below the inviscid Bernoulli value. The assumption violation is immediately visible in the data.  
**Bernoulli over-predicts pressure recovery by 12 %**  

*Reflection:* Viscosity destroys the constant total pressure along the streamline; the example isolates the inviscid requirement.

**Example 4 — High-speed nozzle with density change**  
*Given:* Air accelerates isentropically from stagnation conditions 300 kPa, 300 K to Mach 0.8.  
*Find:* Static pressure using incompressible Bernoulli versus the correct isentropic relation.  

Incompressible Bernoulli gives \(P=170\,\text{kPa}\). The isentropic formula \(P=P_0(1+\frac12(\gamma-1)M^2)^{-\gamma/(\gamma-1)}\) gives 155 kPa. The 15 kPa discrepancy demonstrates the incompressible assumption failure.  
**155 kPa (correct)**  

*Reflection:* Density change couples velocity and thermodynamic state; the constant-\(\rho\) step in the derivation is invalidated.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying Bernoulli between two different streamlines | The integration is performed along one path only; quantities are not constant across streamlines in rotational flow. | Verify that both points lie on the same streamline by tracing velocity vectors or stream-function contours. |
| Using the equation for unsteady startup transients | The \(\partial\mathbf{v}/\partial t\) term was dropped; it reappears during valve closure or gust encounters. | Check that the flow has reached temporal invariance within the desired accuracy before substituting numbers. |
| Treating gases as incompressible at high Mach number | Density varies with pressure once \(M>0.3\); the constant-\(\rho\) step fails. | Compute Mach number first; switch to isentropic or compressible Bernoulli forms above the threshold. |
| Ignoring wall shear in long ducts | Even small viscosity integrates to measurable total-pressure loss over long distances. | Estimate the friction factor and compare the viscous pressure drop with the dynamic pressure before invoking Bernoulli. |
| Applying the equation across a shock wave | Shocks introduce entropy jumps; total pressure is discontinuous. | Confirm the flow region is shock-free by checking upstream Mach number and geometry. |
| Neglecting gravity in vertical rocket feed lines | Hydrostatic change can exceed dynamic change when velocities are modest. | Retain the \(\rho gh\) term whenever elevation difference exceeds \(v^2/2g\). |
| Using surface pressures from viscous CFD without correction | CFD captures boundary-layer losses; raw Bernoulli does not. | Extract total pressure along a streamline from the CFD solution and compare with the Bernoulli constant. |

## 7. The textbook-precise statement
Bernoulli’s equation states that for an incompressible, inviscid flow that is steady,
\[
\frac{P}{\rho}+\frac12 v^2 + gz = \text{constant}
\]
along any streamline. The hypotheses are: (i) \(\partial/\partial t\equiv0\), (ii) \(\nabla\cdot\mathbf{v}=0\) with \(\rho=\text{const}\), (iii) \(\boldsymbol{\tau}=0\) (zero deviatoric stress), and (iv) evaluation along a curve satisfying \(d\mathbf{x}\parallel\mathbf{v}\). (White, *Fluid Mechanics*, 8e, §3.5, Eq. 3.18.)

## 8. Visual — diagram or schematic
```text
          streamline
          ----------> 
       P1,v1,h1      P2,v2,h2
          |             |
   +------+-------------+------> x
   |      |             | 
   |______|_____________|______  (wall)
          s1           s2
```
The diagram shows a single curved streamline inside a duct. Points 1 and 2 lie on that line; pressure, speed, and elevation are evaluated only at those stations. The wall is shown only to indicate confinement; the equation itself does not require the presence of walls.

## 9. The memory technique
1. **The hook** — Picture a train (steady) with frictionless wheels (inviscid), constant mass (incompressible) riding on one fixed track (streamline).  
2. **What to overlearn** — The four adjectives in order: steady, inviscid, incompressible, along streamline; and the integrated form \(P+\frac12\rho v^2+\rho gh=\text{const}\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the Euler equations, set \(\partial/\partial t=0\), dot with \(d\mathbf{x}\) along a streamline, integrate, and impose constant density.

## 10. What this unlocks
Mastery of these assumptions lets you simplify the full Navier–Stokes equations to the Euler equations and then to the Bernoulli integral, opening the route to potential-flow theory, thin-airfoil analysis, and one-dimensional compressible nozzle relations.  

- Next: circulation and Kelvin’s theorem  
- Next: velocity potential and Laplace’s equation  
- Next: lift and Kutta–Joukowski theorem  
- Next: compressible Bernoulli and isentropic relations for nozzles

## 11. Self-check — five questions, no answers
1. A flow is steady and incompressible but has non-zero viscosity. Which term in the Navier–Stokes equations prevents direct integration to Bernoulli’s equation?  
2. Two points lie at the same height inside a steady, inviscid, incompressible flow. If their pressures differ, must their speeds differ? Under what additional geometric condition?  
3. A pitot probe is placed in a boundary layer where total pressure has already decreased. Predict qualitatively the error in indicated airspeed.  
4. Derive the condition on Mach number below which the incompressible assumption introduces less than 5 % error in velocity for air.  
5. In a time-varying flow, the local acceleration term \(\partial\mathbf{v}/\partial t\) is retained. Show why the quantity \(P+\frac12\rho v^2+\rho gh\) is no longer constant along a streamline.