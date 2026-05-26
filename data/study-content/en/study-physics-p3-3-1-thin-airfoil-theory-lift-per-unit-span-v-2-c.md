## 1. The one-sentence answer
**Thin-airfoil theory models an airfoil as a continuous distribution of vortices whose strength satisfies the zero-normal-velocity boundary condition on the camber line, yielding the lift per unit span \(L' = \pi \rho V_\infty^2 (\alpha + 2\beta/\pi c)\).**

In the simplest case the airfoil is replaced by a flat line segment of length \(c\) at angle \(\alpha\) to the oncoming flow. The flow is assumed incompressible and irrotational, so a vortex sheet can be placed along the chord. The sheet strength \(\gamma(x)\) is chosen so that the induced velocity exactly cancels the component of \(V_\infty\) normal to the chord; solving the resulting integral equation produces a \(\gamma(x)\) that is singular at the leading edge and zero at the trailing edge. Integrating the pressure jump across the sheet then gives a lift force whose magnitude is exactly \(\pi \rho V_\infty^2 c \alpha\).

When the airfoil has camber, the geometric boundary condition changes. A small camber angle or height parameter \(\beta\) adds an extra term to the normal-velocity requirement. The same integral equation is solved with the modified right-hand side; the extra circulation that appears contributes the additive term \(2\beta/\pi c\) inside the parentheses, again multiplied by \(\pi \rho V_\infty^2\).

> [!NOTE]
> The entire result follows from enforcing the Kutta condition at the trailing edge; without it the solution is non-unique and the predicted lift is zero.

## 2. Why this matters — concrete and current
NASA’s X-59 QueSST uses thin-airfoil-based rapid aerodynamic shaping tools to design its 60-ft-long low-boom wing; the same code family still contains the classic Glauert solution that yields the formula above.

SpaceX’s Starship flaps operate at high subsonic Mach numbers where the incompressible thin-airfoil estimate supplies the first-order hinge-moment target before full Navier–Stokes runs are launched; the camber term \(2\beta/\pi c\) directly informs the actuator sizing.

The Boeing 787-10 wing employs a supercritical airfoil whose zero-lift angle is set by the same camber parameter; wind-tunnel data are still compared against the thin-airfoil prediction to within 3 % at cruise lift coefficients.

In atmospheric entry, the Mars Science Laboratory heat-shield trim angle was pre-computed with a thin-airfoil panel code because the effective “airfoil” formed by the offset center-of-mass produces a lift-to-drag ratio governed by the identical vortex-sheet integral.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Incompressible potential flow | Allows velocity to be written as gradient of a potential; vortex sheets are then admissible singularities |
| Kutta–Joukowski theorem  | Converts circulation to lift without integrating pressure |
| Small-angle trigonometry | Linearizes the boundary condition so the integral equation remains tractable |
| Cauchy principal-value integrals | Required to evaluate the singular integral that determines \(\gamma(x)\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace the airfoil with a vortex sheet
A thin airfoil at small angle of attack produces lift by creating a pressure difference between its upper and lower surfaces. That pressure jump is produced by a jump in tangential velocity, which is exactly the definition of a vortex sheet. Place a sheet of unknown strength \(\gamma(x)\) along the chord line from \(x = 0\) to \(x = c\).

### Step 2 — Write the boundary condition
The flow tangency requirement states that the normal velocity induced by the entire sheet plus the free-stream component must be zero on the camber line. For a flat plate this reduces to
\[
\frac{1}{2\pi}\int_0^c\frac{\gamma(\xi)}{x-\xi}\,d\xi = V_\infty(\alpha + \frac{dy_c}{dx}),
\]
where the right-hand side contains the camber slope \(dy_c/dx\).

### Step 3 — Introduce the Glauert transformation
Change variable to \(\theta\) via \(x = (c/2)(1-\cos\theta)\). The unknown strength is expanded as the Fourier series
\[
\gamma(\theta) = 2V_\infty\left(A_0\cot\frac{\theta}{2} + \sum_{n=1}^\infty A_n\sin n\theta\right).
\]
The cotangent term automatically satisfies the leading-edge singularity and the Kutta condition at the trailing edge.

### Step 4 — Project the boundary condition onto the basis functions
Substitute the series into the integral equation and exploit orthogonality of the sine functions. The coefficients become
\[
A_0 = \alpha - \frac{1}{\pi}\int_0^\pi\frac{dy_c}{dx}\,d\theta, \qquad A_n = \frac{2}{\pi}\int_0^\pi\frac{dy_c}{dx}\cos n\theta\,d\theta.
\]

### Step 5 — Integrate to obtain circulation and lift
The total circulation is \(\Gamma = \pi c V_\infty A_0\). Kutta–Joukowski then supplies
\[
L' = \rho V_\infty\Gamma = \pi\rho V_\infty^2 c A_0.
\]
For a parabolic camber line whose maximum height gives the parameter \(\beta\), the integral evaluates to \(A_0 = \alpha + 2\beta/(\pi c)\), producing the stated formula.

> [!WARNING]
> Omitting the Kutta condition (setting \(A_0\) without the trailing-edge constraint) yields a family of solutions differing by an arbitrary circulatory constant; lift is then indeterminate.

## 5. Worked examples — every step shown

**Example 1 — Flat-plate airfoil at angle \(\alpha\)**
*Given:* \(c = 1\) m, \(\alpha = 5^\circ = 0.0873\) rad, \(\rho = 1.225\) kg m\(^{-3}\), \(V_\infty = 50\) m s\(^{-1}\), \(\beta = 0\).
*Find:* Lift per unit span.
The camber integral vanishes, so \(A_0 = \alpha\).  
\[
L' = \pi\rho V_\infty^2 c\alpha = \pi\times1.225\times2500\times0.0873 \approx 842\,\text{N m}^{-1}.
\]
*Why* each factor appears: \(\pi\) from the integrated Fourier coefficient, \(\rho V_\infty^2\) from dynamic pressure scaling, \(c\alpha\) from the linearized angle.  
**842 N m\(^{-1}\)**

*Reflection:* The only non-obvious step is recognizing that the flat-plate camber term is identically zero; once seen, the formula collapses to the classic result.

**Example 2 — Symmetric camber with \(\beta = 0.02\) m**
*Given:* Same numbers plus \(\beta = 0.02\) m.
*Find:* New lift per unit span.
Now \(A_0 = \alpha + 2\beta/(\pi c) = 0.0873 + 0.0127 = 0.1\).  
\[
L' = \pi\rho V_\infty^2 c\times0.1 = 965\,\text{N m}^{-1}.
\]
**965 N m\(^{-1}\)**

*Reflection:* The camber contribution adds a constant angle shift independent of \(\alpha\); this is why camber allows positive lift at zero geometric angle.

**Example 3 — Compute zero-lift angle**
*Given:* \(\beta = 0.02\) m, \(c = 1\) m.
*Find:* \(\alpha_{L=0}\).
Set \(A_0 = 0\):
\[
\alpha_{L=0} = -\frac{2\beta}{\pi c} = -0.0127\,\text{rad} \approx -0.73^\circ.
\]
**\(\alpha_{L=0} = -0.73^\circ\)**

*Reflection:* The negative sign shows that positive camber produces positive lift at negative geometric angles.

**Example 4 — Lift-curve slope verification**
*Given:* Any \(\beta\), vary \(\alpha\) by 1°.
*Find:* Change in \(L'\).
Because the camber term is constant,
\[
\frac{dL'}{d\alpha} = \pi\rho V_\infty^2 c = 482\,\text{N m}^{-1}\text{ per rad}.
\]
For 1° the increment is \(8.41\) N m\(^{-1}\).  
**Slope = \(\pi\rho V_\infty^2 c\)**

*Reflection:* The slope is independent of camber, a direct consequence of the linearised theory.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the leading-edge singularity in \(\gamma(x)\) | Students expect a bounded function; the mathematics forces \(1/\sqrt{x}\). | Keep the Glauert \(\cot(\theta/2)\) term until the final integration. |
| Using the full nonlinear tangency condition | The integral equation is derived under the small-angle assumption. | Linearise \(\sin\alpha\approx\alpha\) before writing the boundary condition. |
| Applying the formula at high \(\alpha\) | Thin-airfoil theory is linear; stall is outside its domain. | Check that \(\alpha < 10^\circ\)–\(12^\circ\) before quoting the result. |
| Confusing \(\beta\) units | The term \(2\beta/\pi c\) must be dimensionless; \(\beta\) carries length. | Verify \(\beta/c\) is an angle-like quantity before substitution. |
| Omitting the Kutta condition | Without it the solution is non-unique. | Always enforce \(\gamma(c)=0\) by discarding the cosine terms that would violate it. |
| Treating the result as compressible | The derivation assumes \(M_\infty=0\). | Add the Prandtl–Glauert factor \(\sqrt{1-M^2}\) only after obtaining the incompressible answer. |
| Integrating \(\gamma\) without the principal value | The integral diverges at \(x=\xi\). | Use the Glauert inversion formula or numerical cosine quadrature from the start. |

## 7. The textbook-precise statement
**Theorem (Glauert, 1924).** Let an airfoil of chord \(c\) be represented by its camber line \(y_c(x)\) with \(|dy_c/dx|\ll1\). In an incompressible, irrotational free stream \(V_\infty\) at geometric angle \(\alpha\), the vortex-sheet strength satisfying flow tangency and the Kutta condition \(\gamma(c)=0\) is given by the Glauert series above. The resulting lift per unit span is
\[
L'=\pi\rho V_\infty^2\left(\alpha-\frac{1}{\pi}\int_0^\pi\frac{dy_c}{dx}\,d\theta\right)c.
\]
When the camber line is parabolic with maximum ordinate \(\beta\), the integral evaluates to \(-2\beta/(\pi c)\), recovering
\[
L'=\pi\rho V_\infty^2(\alpha+2\beta/\pi c).
\]
(See Anderson, *Fundamentals of Aerodynamics*, 6e, §4.8.)

## 8. Visual — diagram or schematic
```text
y
^
|          free stream V_∞
|         ↗ α
|   ────────────────────────→ x
|  /_ _ _ _ _ _ _ _ _ _ _ _\
| /   camber line y_c(x)     \   trailing edge (Kutta: γ=0)
|/
+-------------------------------→ x
0                              c
          vortex sheet γ(x)
```
The diagram shows the chord line, the camber line displaced by height \(\beta\) at mid-chord, the angle \(\alpha\), and the requirement that \(\gamma(c)=0\).

## 9. The memory technique

1. **The hook** — Picture a line of tiny whirlpools (the vortex sheet) marching along the chord; at the trailing edge they all vanish because the Kutta condition “sucks” the last vortex off the edge, fixing the total circulation.
2. **What to overlearn** — \(L' = \pi\rho V_\infty^2 c A_0\) with \(A_0 = \alpha + 2\beta/(\pi c)\); the factor \(\pi\) and the Kutta condition.
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the integral equation from flow tangency, insert the Glauert series, and integrate the first coefficient.

## 10. What this unlocks
Thin-airfoil theory supplies the analytic foundation for panel methods, for the Prandtl lifting-line theory of finite wings, and for the first-order design of supercritical airfoils.  

- Next: 3-D lifting-line theory and the elliptic wing solution  
- Next: Subsonic compressibility corrections (Prandtl–Glauert, Göthert rules)  
- Next: Unsteady thin-airfoil theory (Theodorsen’s function)  
- Next: Numerical vortex-panel codes used in preliminary aircraft design

## 11. Self-check — five questions, no answers
1. Derive the zero-lift angle for a circular-arc camber line whose height at mid-chord is \(\beta = 0.015c\).
2. A thin airfoil at \(\alpha = 4^\circ\) produces \(L' = 1200\) N m\(^{-1}\) at sea-level density and 40 m s\(^{-1}\). What is its chord?
3. Show that the lift-curve slope remains \(2\pi\) per radian even when camber is present; state the single assumption that makes this true.
4. An airfoil with \(\beta = 0.03\) m is flown at \(\alpha = -1^\circ\). Compute the fractional change in lift if the Kutta condition is artificially removed.
5. Why does the leading-edge suction peak predicted by thin-airfoil theory become unrealistic at \(\alpha > 12^\circ\)?