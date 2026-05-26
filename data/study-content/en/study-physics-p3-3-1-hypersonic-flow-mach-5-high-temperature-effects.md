## 1. The one-sentence answer
**Hypersonic flow is the regime of compressible aerodynamics above Mach 5 in which aerodynamic heating drives the gas past vibrational excitation into dissociation and ionization, rendering the perfect-gas model with constant specific heats unusable.**

At these speeds the post-shock temperature rises so steeply that the internal energy of air molecules is no longer stored only in translation and rotation. Energy begins to break molecular bonds, changing the effective ratio of specific heats and the local speed of sound. Consequently every classical relation that assumes calorically perfect gas—shock relations, isentropic tables, Prandtl-Meyer functions—ceases to be quantitatively reliable.

The flow field itself becomes a reacting, radiating, partially ionized medium whose thermodynamic state must be obtained from equilibrium or finite-rate chemistry tables rather than from a single analytic equation of state.

> [!NOTE]
> The decisive physical threshold is not an arbitrary Mach number but the temperature at which oxygen dissociation begins (~2500 K), which occurs behind a normal shock once the freestream Mach number exceeds approximately 5 in the stratosphere.

## 2. Why this matters — concrete and current
NASA’s Artemis program relies on accurate prediction of high-enthalpy flow around the Orion crew module during lunar-return entries at 11 km s⁻¹; dissociation and ionization control both heat flux and radiative emission that must be mitigated by the heat shield.

The U.S. Air Force and DARPA’s Hypersonic Air-breathing Weapon Concept (HAWC) and Tactical Boost-Glide programs fly waverider vehicles above Mach 6; real-gas effects alter shock standoff distance and therefore the pressure distribution that provides lift.

SpaceX Starship performs repeated atmospheric entries at hypersonic speeds; ablation and boundary-layer transition are governed by the same high-temperature chemistry that determines whether the vehicle survives or sheds tiles.

Ground-test facilities such as the X3 expansion tube at the University of Queensland and the LENS-XX facility at CUBRC are used to validate CFD codes that incorporate 11-species air chemistry; discrepancies between experiment and simulation directly limit vehicle design margins.

Natural hypersonic phenomena occur during meteoroid entry; the 2013 Chelyabinsk bolide produced a shock layer whose spectrum revealed atomic line radiation from ionized air and ablated metal, confirming the same physics that vehicle designers must model.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Normal-shock relations for calorically perfect gas | Baseline against which real-gas departures are measured |
| Definition of Mach number and stagnation enthalpy | Shows why temperature scales with M² and when dissociation thresholds are crossed |
| Equilibrium thermodynamics and Gibbs free energy | Required to compute species concentrations once T > 2500 K |
| Boundary-layer heat transfer (Fay–Riddell) | Couples the altered post-shock state to surface heating rates |

## 4. Building the idea — from intuition to formalism

### Step 1 — Temperature jump across a normal shock
The kinetic energy of the freestream is converted into thermal energy behind a normal shock. For a perfect gas the temperature ratio is
$$
\frac{T_2}{T_1}=\frac{2\gamma M_1^2-(\gamma-1)}{(\gamma+1)^2M_1^2}\Bigl[(\gamma-1)M_1^2+2\Bigr].
$$
At M₁ = 5 and γ = 1.4 this already yields T₂/T₁ ≈ 13. At M₁ = 10 the ratio exceeds 50, pushing T₂ above 10 000 K at typical stratospheric static temperatures.

> [!WARNING]
> Using the perfect-gas formula at these Mach numbers gives an unrealistically high temperature because the gas begins to absorb energy in dissociation rather than further temperature rise.

### Step 2 — Onset of vibrational excitation and dissociation
Above ~800 K the vibrational modes of O₂ and N₂ become fully excited; above ~2500 K O₂ dissociation begins. The specific heat at constant pressure therefore increases and γ drops from 1.4 toward 1.2–1.3.

### Step 3 — Real-gas equation of state
The mixture no longer obeys p = ρRT with constant R. Instead the equilibrium composition is found by minimizing Gibbs free energy subject to elemental mass constraints, yielding a state vector (ρ, T, p, cᵢ) that must be tabulated or computed on the fly.

### Step 4 — Modified shock relations
Conservation of mass, momentum and energy still hold, but the enthalpy now includes chemical contributions:
$$
h = \sum_i c_i h_i(T) + \Delta h_{f,i}^0.
$$
The resulting shock relations become implicit algebraic equations solved numerically or read from Mollier charts.

### Step 5 — Thin shock layer and Newtonian limit
Because γ approaches 1, the density ratio across the shock ρ₂/ρ₁ → 6–10. The shock layer becomes extremely thin; surface pressure approaches the Newtonian value
$$
C_p = 2\sin^2\theta,
$$
where θ is the local inclination angle.

### Step 6 — Aerodynamic heating and radiation
Convective heating scales with the enthalpy difference across the boundary layer; dissociation and ionization add radiative heating that can exceed convective heating above 10 km s⁻¹.

### Step 7 — Textbook statement
The complete description of steady, inviscid, equilibrium hypersonic flow is obtained by solving the Euler equations closed by an equilibrium thermodynamic model (e.g., 11-species air) with boundary conditions of uniform freestream at M_∞ ≥ 5 and vehicle surface temperature.

## 5. Worked examples — every step shown

**Example 1 — Post-shock temperature, perfect-gas baseline**  
*Given:* M₁ = 6, T₁ = 220 K, γ = 1.4, R = 287 J kg⁻¹ K⁻¹.  
*Find:* T₂.  
Step 1: Compute M₁² = 36.  
Step 2: Substitute into temperature-ratio formula.  
$$
\frac{T_2}{T_1} = \frac{[2\cdot1.4\cdot36-0.4]\,[0.4\cdot36+2]}{[2.4]^2\cdot36}=15.55.
$$  
*Why:* Direct application of Rankine–Hugoniot relations for calorically perfect gas.  
**T₂ = 3421 K**

*Reflection:* This temperature already lies in the vibrational-excitation regime; the perfect-gas answer is therefore only an upper bound.

**Example 2 — Density ratio with dissociation**  
*Given:* Same freestream, but equilibrium calculation yields γ_eff = 1.25.  
*Find:* ρ₂/ρ₁.  
Use the limiting strong-shock result ρ₂/ρ₁ = (γ+1)/(γ-1) = 9.  
*Why:* Lower γ produces higher compression.  
**ρ₂/ρ₁ = 9**

*Reflection:* The shock layer is now only one-ninth as thick as the perfect-gas prediction.

**Example 3 — Newtonian pressure coefficient**  
*Given:* Local surface inclination θ = 15° on a waverider.  
*Find:* C_p.  
$$
C_p=2\sin^2 15^\circ=0.134.
$$  
*Why:* Newtonian impact theory becomes accurate once the shock layer is thin.  
**C_p = 0.134**

*Reflection:* The result is independent of Mach number and γ, a hallmark of hypersonic similitude.

**Example 4 — Stagnation enthalpy including chemistry**  
*Given:* M_∞ = 10, T_∞ = 250 K, u_∞ = 3150 m s⁻¹.  
*Find:* h₀.  
h₀ = c_p T_∞ + u_∞²/2 + chemical terms (from tables).  
For equilibrium air at stagnation conditions ~4500 K the sensible enthalpy is ~8 MJ kg⁻¹ while dissociation absorbs an additional ~10 MJ kg⁻¹.  
**h₀ ≈ 18 MJ kg⁻¹**

*Reflection:* Roughly half the vehicle’s kinetic energy is stored in chemical form rather than temperature.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using γ = 1.4 above Mach 5 | Textbooks emphasize constant-γ tables | Always check post-shock temperature against dissociation curves before applying perfect-gas relations |
| Treating stagnation temperature as the maximum temperature | Ignores that dissociation caps temperature rise | Use stagnation enthalpy, not temperature, as the conserved quantity |
| Assuming calorically perfect isentropic relations for expansion fans | γ changes continuously through the fan | Integrate along isentropes using equilibrium properties or tabulated Mollier charts |
| Neglecting ionization above 10 km s⁻¹ | Students stop at dissociation | Include at least 11-species air model once h₀ > 15 MJ kg⁻¹ |
| Applying Newtonian theory at Mach 3–4 | Thin-shock-layer assumption fails | Verify density ratio > 6 before invoking C_p = 2 sin²θ |
| Ignoring finite-rate chemistry on short-duration trajectories | Equilibrium tables are easier | Compare Damköhler number with flow time; switch to finite-rate solver when Da ~ 1 |
| Using perfect-gas Mach-number definition for local speed of sound | a = √(γRT) changes with composition | Compute a from equilibrium partial derivatives (∂p/∂ρ)_s |

## 7. The textbook-precise statement
In steady, inviscid, adiabatic flow of a reacting gas mixture the conservation laws are
$$
\nabla\cdot(\rho\mathbf{u})=0,\qquad
\nabla\cdot(\rho\mathbf{u}\mathbf{u}+p\mathbf{I})=0,\qquad
\nabla\cdot\bigl[\rho\mathbf{u}(h+|\mathbf{u}|^2/2)\bigr]=0,
$$
closed by the equilibrium state equations p = p(ρ,e) obtained from minimization of Gibbs free energy for an 11-species air model. The freestream is uniform with M_∞ ≥ 5. (Anderson, *Hypersonic and High-Temperature Gas Dynamics*, 2nd ed., AIAA, 2006, §4.3 and §9.2.)

## 8. Visual — diagram or schematic
```text
Freestream M_∞=8
→
   Shock wave (detached, thin layer)
   /\
  /  \   Shock layer (ρ₂/ρ₁≈8, T≈6000 K, O₂ dissociated)
 /    \
Vehicle surface (Newtonian Cp=2 sin²θ)
```
The figure shows a blunt-body bow shock with a thin, high-density shock layer; streamlines are deflected sharply and the layer thickness δ/R_n ≈ (ρ_∞/ρ₂) is < 0.15.

## 9. The memory technique
1. **The hook** — Picture the air “melting” behind the shock; once molecules break apart they can no longer push back as hard, so γ drops and the shock hugs the vehicle.
2. **What to overlearn** — (i) Post-shock temperature scaling T₂ ∝ M₁²; (ii) density ratio → (γ+1)/(γ-1) with γ_eff ≈ 1.25; (iii) Newtonian limit C_p = 2 sin²θ.
3. **Spaced-repetition schedule** — Review the three overlearned items at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the strong-shock density ratio from mass and momentum conservation with variable γ, then insert the equilibrium γ obtained from Gibbs minimization.

## 10. What this unlocks
Mastery of hypersonic flow with high-temperature effects is the prerequisite for boundary-layer transition prediction, radiative heat-transfer calculations, and the design of thermal-protection systems. It directly enables the study of:
- nonequilibrium chemistry and catalysis at the wall,
- magnetohydrodynamic flow control,
- coupled aero-thermo-elastic analysis of slender vehicles,
- entry, descent, and landing trajectory optimization for planetary missions.

## 11. Self-check — five questions, no answers
1. A normal shock at Mach 7 in air at 220 K produces what approximate post-shock temperature if γ is artificially held at 1.4? What temperature would equilibrium air actually reach?
2. Why does the shock-layer thickness around a sphere decrease with increasing Mach number even after the density ratio has saturated?
3. Derive the Newtonian pressure coefficient from the oblique-shock relations in the double limit M → ∞ and γ → 1.
4. A waverider is designed with perfect-gas streamlines at Mach 6; after dissociation is included the shock moves closer to the surface. Does the lift-to-drag ratio increase or decrease?
5. At what freestream enthalpy does ionization begin to dominate the electron number density behind a normal shock, and why does this matter for radio blackout?