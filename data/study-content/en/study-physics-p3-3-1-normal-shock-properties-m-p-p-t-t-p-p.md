## 1. The one-sentence answer
**Normal shock relations supply the exact downstream values of Mach number M₂ together with the static pressure, temperature, density, and stagnation-pressure ratios across a stationary discontinuity perpendicular to a supersonic stream of perfect gas.**

A normal shock is a thin surface across which every thermodynamic and kinematic property jumps discontinuously while the flow direction remains unchanged. The jump is fixed once the upstream Mach number M₁ and the ratio of specific heats γ are known; the same conservation statements that govern subsonic flow become algebraic identities that can be solved explicitly for every downstream quantity. Because the shock converts ordered kinetic energy irreversibly into random thermal motion, the downstream Mach number is always subsonic and the stagnation pressure always falls.

The explicit formulas follow directly from the three Rankine–Hugoniot conservation laws plus the ideal-gas equation of state; no differential equations or iterative procedures are required once the algebra is completed.

> [!NOTE]
> The single most important realization is that a supersonic stream cannot adjust smoothly to a sudden pressure rise; the adjustment must occur through an entropy-generating discontinuity whose strength is set solely by M₁.

## 2. Why this matters — concrete and current
Ramjet and scramjet inlets on vehicles such as the X-51 Waverider rely on a terminal normal shock to decelerate captured air to subsonic speeds before combustion; the loss in stagnation pressure across that shock directly reduces specific impulse and is therefore minimized by careful placement of oblique shocks ahead of the normal shock.

Re-entry capsules such as Orion and Dragon experience a detached bow shock whose normal-shock segment at the stagnation line sets the peak heat-transfer rate; trajectory designers use the exact post-shock temperature and density ratios to size the thermal-protection system.

High-enthalpy shock tunnels at facilities such as NASA Langley’s HYPULSE and the University of Queensland’s T4 generate test flows by driving a normal shock into a driven gas; measured shock speed and pressure ratio are inverted with the normal-shock relations to obtain the freestream conditions delivered to the model.

Supernova remnants and the solar-wind termination shock are astrophysical normal shocks whose observed emission-line ratios are interpreted with the same pressure and temperature jump formulas used in terrestrial propulsion, confirming that the Rankine–Hugoniot relations remain valid at relativistic energies when appropriate γ is chosen.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Control-volume conservation of mass, momentum, and energy | These three integral statements are the only relations that survive inside an infinitesimally thin shock. |
| Definition of Mach number M = V/a | All ratios are expressed as functions of M₁; sound speed supplies the non-dimensional scale. |
| Perfect-gas equation of state and constant-γ isentropic relations | They close the algebraic system and convert static-property ratios into stagnation-pressure ratio. |
| Second law: entropy must increase across a shock | It guarantees M₂ < 1 and P₀₂/P₀₁ < 1; without it the mathematics admits an unphysical expansion shock. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The control volume collapses to algebraic statements
A normal shock is so thin that the usual differential conservation laws integrate to simple jump conditions across two stations immediately upstream and downstream.  
Consider a duct of unit area with steady flow; mass flux, streamwise force balance, and energy flux must be identical on both sides.  
$$ \rho_1 V_1 = \rho_2 V_2, \qquad P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2, \qquad h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2}. $$  
> [!WARNING]  
> Treating the shock as having finite thickness re-introduces viscous dissipation terms that cancel in the integrated balance; omitting the integration step leads to the false conclusion that shocks can be isentropic.

### Step 2 — Non-dimensionalize with Mach number and γ
Introduce the ideal-gas sound speed a² = γRT and the definition M = V/a. The three conservation statements become three algebraic equations in the four unknowns ρ₂/ρ₁, P₂/P₁, T₂/T₁ and M₂.  
The fourth relation is supplied by the equation of state. Solving yields the explicit normal-shock relations.

### Step 3 — Downstream Mach number
Algebraic elimination produces  
$$ M_2^2 = \frac{1 + \frac{\gamma-1}{2}M_1^2}{\gamma M_1^2 - \frac{\gamma-1}{2}}. $$  
When M₁ > 1 the denominator exceeds the numerator, forcing M₂ < 1.

### Step 4 — Static pressure ratio
Momentum and continuity combine to give the pressure jump  
$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2-1). $$  
The formula is monotonic in M₁; stronger shocks produce arbitrarily large pressure ratios.

### Step 5 — Density and temperature ratios
Mass conservation together with the pressure ratio supplies the density ratio  
$$ \frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}. $$  
Temperature follows at once from the equation of state:  
$$ \frac{T_2}{T_1} = \frac{P_2}{P_1} \cdot \frac{\rho_1}{\rho_2}. $$

### Step 6 — Stagnation-pressure ratio
Stagnation pressure is obtained from the isentropic relation evaluated on each side of the shock. The ratio collapses to  
$$ \frac{P_{0,2}}{P_{0,1}} = \left[ \frac{\frac{\gamma+1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_1^2} \right]^{\gamma/(\gamma-1)} \left[ \frac{\gamma+1}{2\gamma M_1^2 - (\gamma-1)} \right]^{1/(\gamma-1)}. $$  
Because entropy rises, P_{0,2} < P_{0,1} for any M₁ > 1.

### Step 7 — The textbook statement
All five quantities are therefore known once M₁ and γ are specified; the relations are exact for any steady, planar, normal shock in a calorically perfect gas.

## 5. Worked examples — every step shown

**Example 1 — M₁ = 2.0, γ = 1.4**  
*Given:* M₁ = 2, γ = 1.4.  
*Find:* M₂, P₂/P₁, T₂/T₁, ρ₂/ρ₁, P₀₂/P₀₁.  

Substitute into the Mach-number formula:  
$$ M_2^2 = \frac{1 + 0.2 \cdot 4}{1.4 \cdot 4 - 0.2} = \frac{1.8}{5.4} = 0.3333 \implies M_2 = 0.577. $$  
*Why:* Direct insertion of M₁ into the derived algebraic identity.  

Pressure ratio:  
$$ \frac{P_2}{P_1} = 1 + \frac{2.8}{2.4}(4-1) = 4.5. $$  
*Why:* The pressure-jump formula follows from momentum conservation after non-dimensionalization.  

Density ratio:  
$$ \frac{\rho_2}{\rho_1} = \frac{2.4 \cdot 4}{0.4 \cdot 4 + 2} = 2.667. $$  
*Why:* Algebraic rearrangement of continuity and state equations.  

Temperature ratio:  
$$ \frac{T_2}{T_1} = 4.5 / 2.667 = 1.6875. $$  
*Why:* Equation of state supplies the missing link.  

Stagnation-pressure ratio (evaluated numerically): 0.7209.  
**Final answer**  
M₂ = 0.577, P₂/P₁ = 4.5, T₂/T₁ = 1.6875, ρ₂/ρ₁ = 2.667, P₀₂/P₀₁ = 0.7209.

*Reflection:* The arithmetic is elementary once the five closed-form expressions are memorized; the only subtlety is confirming that M₂ is indeed subsonic.

**Example 2 — Weak shock, M₁ = 1.2**  
Repeating the same substitutions yields M₂ ≈ 0.843, P₂/P₁ ≈ 1.513, ρ₂/ρ₁ ≈ 1.342, T₂/T₁ ≈ 1.128, P₀₂/P₀₁ ≈ 0.9928.  
*Reflection:* Even a 20 % supersonic excess produces a measurable total-pressure loss; the formulas remain valid arbitrarily close to M₁ = 1.

**Example 3 — Strong shock, M₁ = 4**  
M₂ = 0.435, P₂/P₁ = 18.0, ρ₂/ρ₁ = 4.571, T₂/T₁ = 3.938, P₀₂/P₀₁ = 0.1388.  
*Reflection:* Density ratio asymptotes to (γ+1)/(γ-1) = 6 while pressure and temperature continue to rise without bound.

**Example 4 — Limiting density ratio**  
Take M₁ → ∞ in the density formula:  
$$ \lim_{M_1\to\infty} \frac{\rho_2}{\rho_1} = \frac{\gamma+1}{\gamma-1}. $$  
For γ = 1.4 the limit is 6.  
*Reflection:* No finite shock can compress a perfect gas beyond this ratio; real gases ionize and the model fails.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using isentropic tables for post-shock static pressure | Students forget that entropy rises and therefore P₂/P₁ is not given by the isentropic relation. | Always apply the normal-shock pressure formula first; isentropic relations are valid only to the stagnation state on each side separately. |
| Reporting M₂ > 1 when M₁ > 1 | Algebraic sign error when solving the quadratic for M₂. | Verify that the denominator γM₁² − (γ−1)/2 exceeds the numerator for M₁ > 1. |
| Forgetting that P₀₂/P₀₁ < 1 | Belief that stagnation pressure is conserved across any adiabatic process. | Recall that only reversible adiabatic processes conserve P₀; the shock is irreversible. |
| Applying γ = 1.4 to a diatomic gas at 2000 K | γ decreases once vibrational modes activate. | Check the temperature after the shock; switch to a temperature-dependent γ or real-gas tables if T₂ exceeds ~800 K. |
| Confusing normal-shock density ratio with oblique-shock wave angle | The oblique-shock chart is entered with both M₁ and deflection angle; normal shock is the special case β = 90°. | Draw the control volume with the shock perpendicular to the incoming velocity vector. |
| Inverting upstream and downstream stations | The shock moves the flow from supersonic to subsonic; labels must respect that ordering. | Always subscript 1 for the known supersonic state. |

## 7. The textbook-precise statement
For steady, one-dimensional flow of a calorically perfect gas with constant γ, the downstream properties across a normal shock are given exactly by the five relations listed in Steps 3–6 above, provided M₁ > 1. These identities are derived in John D. Anderson, *Modern Compressible Flow*, 3rd ed., §4.3 (McGraw-Hill, 2003) from the integral conservation laws applied to an infinitesimally thin control volume.

## 8. Visual — diagram or schematic
```text
x = 0 (shock plane)
          supersonic          subsonic
   →→→→→  M₁>1   ┃   M₂<1  →→→→→
   P₁, T₁, ρ₁     ┃     P₂, T₂, ρ₂
   P₀₁            ┃     P₀₂ < P₀₁
   V₁             ┃     V₂ < V₁
   a₁             ┃     a₂ > a₁
```
Horizontal axis is streamwise coordinate; vertical line marks the discontinuity. All properties are uniform far upstream and far downstream; inside the shock viscous and thermal gradients exist but are integrated out.

## 9. The memory technique
1. **The hook** — Picture a supersonic bullet slamming into a wall of air; the air cannot get out of the way fast enough, so it piles up in an instantaneous “brick wall” that suddenly slows the bullet to subsonic speed while heating and pressurizing the gas.
2. **What to overlearn** — M₂ formula, pressure ratio formula, and the fact that P₀₂/P₀₁ < 1 for any M₁ > 1.
3. **Spaced-repetition schedule** — Review the five closed-form expressions at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.
4. **First-principles fallback** — Return to the three conservation statements, non-dimensionalize with M and γ, and re-solve the algebra; the algebra is only quadratic and always yields the same explicit roots.

## 10. What this unlocks
Mastery of the normal-shock jump conditions supplies the boundary conditions required for any supersonic inlet, nozzle, or blast-wave calculation and is the prerequisite for the next layer of compressible-flow analysis.

- Oblique-shock relations obtained by decomposing the upstream velocity into normal and tangential components.
- Prandtl–Meyer expansion fans that turn supersonic flow isentropically.
- Method of characteristics for designing supersonic nozzles and airfoils.
- Unsteady shock tubes and moving-shock problems solved by Galilean transformation to a stationary normal shock.

## 11. Self-check — five questions, no answers
1. For γ = 1.4 and M₁ = 3, compute M₂ to three decimal places and confirm it is subsonic.  
2. Show that the normal-shock density ratio cannot exceed 6 for any finite M₁ when γ = 1.4.  
3. A stagnation pressure loss of 10 % occurs across a normal shock; estimate the upstream Mach number.  
4. Why does the temperature ratio continue to increase with M₁ while the density ratio saturates?  
5. In an F-15 inlet, why is a single normal shock rarely used at Mach 2.0; what arrangement reduces the total-pressure loss?