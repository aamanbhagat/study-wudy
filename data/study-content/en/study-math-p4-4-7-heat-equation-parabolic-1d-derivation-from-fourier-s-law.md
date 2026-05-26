## 1. The one-sentence answer
**The one-dimensional heat equation arises by applying Fourier’s law of heat conduction to a thin rod and enforcing local conservation of thermal energy, yielding the parabolic PDE \(u_t = \alpha u_{xx}\).**

A thin rod is insulated on its sides. Temperature \(u(x,t)\) varies only along its length and with time. Heat flows from hotter to cooler regions. Fourier’s law states that the flux is proportional to the negative temperature gradient.  

Energy conservation then requires that any net inflow of heat into a small segment must raise the internal energy of that segment. When the proportionality constants are collected, the temperature satisfies a diffusion equation whose second spatial derivative encodes the curvature that drives the flux imbalance.

> [!NOTE]
> The second derivative appears because flux is already a first derivative; its spatial derivative therefore measures the divergence of heat flow, which must equal the rate of temperature change.

## 2. Why this matters — concrete and current
NASA’s Orion heat-shield design uses one-dimensional heat-equation models to predict transient temperature profiles through ablative layers during atmospheric re-entry at 11 km s^{-1}.  

Intel’s thermal-management simulators solve the 1-D heat equation along through-silicon vias to size micro-channel cooling before committing a 3 nm process to silicon.  

In lithium-ion battery packs, the same equation governs temperature evolution along individual electrode layers; Tesla’s battery-management firmware runs reduced-order versions of it every 10 ms to prevent thermal runaway.  

Seismic-while-drilling tools employed by Schlumberger invert 1-D heat-equation solutions to estimate formation thermal diffusivity from measured temperature transients along the drill string.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | Temperature depends on two independent variables \(x\) and \(t\). |
| Definite integrals       | Total heat content in an interval is obtained by integration. |
| Limit arguments          | The PDE is obtained only after an interval length tends to zero. |
| Linear constitutive laws | Fourier’s law supplies the linear relation between flux and gradient. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Temperature and internal energy
Temperature \(u(x,t)\) is the sole state variable. Internal energy stored per unit length is proportional to temperature: \(c\rho A u\), where \(c\) is specific heat, \(\rho\) density, and \(A\) cross-sectional area.  

For a copper rod of length 1 m and diameter 1 cm, a uniform rise of 10 K stores roughly 3 kJ.  

The stored-energy density per unit length is therefore
\[
e(x,t) = c\rho A u(x,t).
\]

> [!WARNING]
> Omitting the factor \(A\) produces an equation whose units are inconsistent with energy.

### Step 2 — Fourier’s law for heat flux
Heat flux \(q(x,t)\) (energy per unit time crossing a cross-section) is proportional to the temperature gradient:
\[
q(x,t) = -k A \frac{\partial u}{\partial x},
\]
where \(k>0\) is thermal conductivity. The negative sign ensures heat flows toward lower temperature.

### Step 3 — Integral statement of conservation
Consider any fixed interval \([a,b]\). The rate of change of stored energy equals net influx plus possible external sources \(f(x,t)\):
\[
\frac{d}{dt}\int_a^b c\rho A u\,dx = q(a,t)-q(b,t)+\int_a^b f\,dx.
\]

### Step 4 — Differentiate under the integral sign
Assuming sufficient smoothness, bring the time derivative inside:
\[
\int_a^b c\rho A u_t\,dx = -q(b,t)+q(a,t)+\int_a^b f\,dx.
\]

### Step 5 — Localize by the fundamental lemma of calculus of variations
Substitute Fourier’s law and divide by \(b-a\). Let \(b\to a\):
\[
c\rho A u_t = \frac{\partial}{\partial x}\Bigl(k A\frac{\partial u}{\partial x}\Bigr)+f.
\]
When material parameters are constant this collapses to the classical heat equation
\[
u_t=\alpha u_{xx}+\frac{f}{c\rho A},\qquad\alpha=\frac{k}{c\rho}.
\]

## 5. Worked examples — every step shown

**Example 1 — Uniform rod, no sources**  
*Given:* \(k=1\), \(c\rho A=1\), \(f=0\), rod on \([0,1]\).  
*Find:* the PDE.  
Energy balance on \([a,b]\):
\[
\int_a^b u_t\,dx=q(a)-q(b).
\]
Fourier: \(q=-u_x\). Differentiate in \(x\):
\[
u_t=u_{xx}.
\]
**Final answer**  
\[u_t=u_{xx}\]

*Reflection:* The only non-obvious move is passing the limit inside the integral; smoothness of \(u\) justifies it.

**Example 2 — With constant conductivity but variable cross-section**  
*Given:* \(A(x)=1+x^2\).  
*Find:* the PDE.  
Flux \(q=-kA(x)u_x\). Conservation yields
\[
c\rho\frac{\partial}{\partial t}(A u)=\frac{\partial}{\partial x}\Bigl(k A\frac{\partial u}{\partial x}\Bigr).
\]
**Final answer**  
\[A u_t=\alpha\frac{\partial}{\partial x}\Bigl(A u_x\Bigr)\]

*Reflection:* The variable coefficient appears because the area multiplies both capacity and conductivity.

**Example 3 — Steady state with internal heating**  
*Given:* \(u_t=0\), \(f=1\).  
*Find:* ODE satisfied by \(u(x)\).  
The PDE reduces at once to
\[
0=\alpha u_{xx}+1.
\]
**Final answer**  
\[u_{xx}=-\frac{1}{\alpha}\]

*Reflection:* Time independence removes the parabolic character, leaving an elliptic balance.

**Example 4 — Derivation with radiation boundary condition**  
*Given:* ends lose heat by Newton’s law of cooling.  
*Find:* boundary condition at \(x=0\).  
Flux leaving the rod equals \(h u(0,t)\):
\[
-kA u_x(0,t)=hA u(0,t).
\]
**Final answer**  
\[-k u_x(0,t)=h u(0,t)\]

*Reflection:* The derivation of the PDE itself is unchanged; only the boundary term in the integral statement is altered.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Sign error in Fourier’s law       | Forgetting heat flows down the gradient     | Always write \(q=-k u_x\) explicitly         |
| Treating \(k\) as constant when it is not | Assuming homogeneity too early         | Keep \(k(x)\) inside the divergence until the end |
| Confusing flux with temperature   | Mixing energy per time with energy per volume | Track units at every step                    |
| Neglecting the cross-sectional area | Thinking in one spatial dimension only | Retain \(A\) until it cancels or is normalized |
| Taking the limit before differentiating | Losing the integral identity            | Differentiate first, then localize           |
| Forgetting that \(\alpha\) has units | Dimensional analysis omitted           | Verify \([\alpha]=L^2T^{-1}\)                |
| Applying the PDE at a moving boundary without Leibniz rule | Domain is time-dependent             | Insert Leibniz terms when limits move        |

## 7. The textbook-precise statement
Let \(\Omega=(0,L)\times(0,\infty)\). Suppose \(u\in C^{2,1}(\Omega)\cap C(\overline{\Omega})\) satisfies the integral identity
\[
\int_a^b c\rho A u(x,t)\,dx\Big|_{t_1}^{t_2}=\int_{t_1}^{t_2}\Bigl[q(a,s)-q(b,s)+\int_a^b f(x,s)\,dx\Bigr]ds
\]
for all \(0<a<b<L\) and all \(t_2>t_1>0\), where \(q=-kA\partial_x u\). Then \(u\) obeys the classical heat equation
\[
c\rho u_t=\partial_x(k\partial_x u)+f
\]
pointwise in \(\Omega\). (See Strauss, *Partial Differential Equations*, 2e, §2.3.)

## 8. Visual — diagram or schematic
```text
x=0                          x=L
 |-----------------------------|
 |   rod, cross-section A      |
q(0,t)→   heat flux q(x,t)   →q(L,t)
          u(x,t)  (temperature)
arrows point right when u_x <0 (heat flows left to right)
```

The diagram shows a horizontal interval representing the rod, with arrows at each end indicating the direction of heat flux \(q\) and the temperature field \(u(x,t)\) defined along the same line.

## 9. The memory technique

1. **The hook** — Picture heat as “trying to flatten the temperature curve”; the second derivative measures exactly how curved that profile is.  
2. **What to overlearn** — Fourier’s law \(q=-k u_x\) and the final PDE \(u_t=\alpha u_{xx}\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the integral balance on an arbitrary interval and pass to the limit.

## 10. What this unlocks
The derivation supplies the prototype parabolic operator that appears in every subsequent chapter on existence, uniqueness, and numerical approximation of parabolic PDEs. It directly enables the study of maximum principles, fundamental solutions, separation of variables, and finite-difference schemes for the heat equation, all of which extend to higher-dimensional and nonlinear diffusion problems.

## 11. Self-check — five questions, no answers
1. Write the integral form of energy conservation for an arbitrary sub-interval and state the precise smoothness needed to obtain the classical PDE.  
2. Derive the heat equation when thermal conductivity \(k\) is a smooth function of \(x\).  
3. A rod of length \(L\) has both ends held at temperature zero. Show that the total thermal energy \(\int_0^L u\,dx\) is strictly decreasing unless \(u\equiv0\).  
4. Identify the units of \(\alpha=k/(c\rho)\) and verify they are consistent with length²/time.  
5. Suppose an internal heat source \(f(x,t)\) is added. Where does the extra term appear in the final PDE, and why?