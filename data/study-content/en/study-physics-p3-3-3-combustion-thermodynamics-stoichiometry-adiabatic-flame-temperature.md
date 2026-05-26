## 1. The one-sentence answer
**Combustion thermodynamics determines the adiabatic flame temperature by first fixing the reactant mixture via stoichiometry and then enforcing energy conservation under the constraint that enthalpy of products equals enthalpy of reactants at the reference state.**

Stoichiometry fixes the exact molar ratios of fuel and oxidizer so that every atom is accounted for in the product species. With those ratios known, the heat released by breaking and forming chemical bonds is calculated from tabulated enthalpies of formation. Because the chamber is treated as adiabatic, that entire chemical enthalpy change appears as sensible enthalpy in the product gases, raising their temperature until the two sides of the energy balance match.

The resulting temperature is an upper bound. Real chambers lose heat and experience dissociation, so the actual gas temperature lies below this ideal value. The calculation nevertheless supplies the reference state needed for all subsequent nozzle performance estimates.

> [!NOTE]
> The adiabatic flame temperature is not measured; it is the temperature at which the enthalpy integral of the products exactly cancels the enthalpy of reaction, obtained by solving a nonlinear equation that couples composition, temperature-dependent specific heats, and the first law.

## 2. Why this matters — concrete and current
SpaceX’s Raptor engine uses a methane–oxygen mixture whose chamber temperature is predicted within 2 % by the same stoichiometric energy balance before any CFD is run; the predicted 3500 K sets the mixture ratio that avoids excessive dissociation while still delivering the required specific impulse.

NASA’s Mars Ascent Vehicle studies rely on the adiabatic flame temperature of a storable hypergolic pair to size the throat and nozzle contour; a 150 K error in that temperature changes the required propellant mass by more than 3 % on a 500 kg payload mission.

Pratt & Whitney Rocketdyne’s RL10 upper-stage engine documentation shows that the adiabatic flame temperature at the design mixture ratio of 5.5:1 is used as the stagnation temperature input to the isentropic flow tables that generate the performance curves published in every customer data package.

In fundamental propulsion research, the CEA code (Chemical Equilibrium with Applications) developed at NASA Glenn solves precisely this adiabatic-flame-temperature problem at every mixture ratio before it computes equilibrium composition and rocket performance; the 2023 release notes state that the routine remains the reference standard for all new U.S. liquid-propellant engine cycles.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Enthalpy of formation \(\Delta h_f^\circ\) | Supplies the chemical energy datum for each species in the energy balance.           |
| First law for an open steady-flow system | States that \(h_\text{reactants}=h_\text{products}\) when \(Q=0\) and \(W=0\).       |
| Temperature-dependent specific heats \(c_p(T)\) | Converts the enthalpy change into a temperature rise; constant-\(c_p\) models give 300–400 K errors. |
| Ideal-gas equation of state    | Allows conversion between mole fractions and partial pressures inside the chamber.   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the stoichiometric reaction
Plain English: every atom that enters the chamber must leave in a product molecule; balancing the reaction tells you exactly how many moles of each product appear per mole of fuel.

Concrete example: hydrogen–oxygen combustion yields \(2\mathrm{H_2}+\mathrm{O_2}\to 2\mathrm{H_2O}\).

Formal statement:
\[
\nu_F\mathrm{Fuel}+\nu_O\mathrm{Oxidizer}\to\sum_p\nu_p\mathrm{Product}_p
\]
where the stoichiometric coefficients \(\nu\) satisfy atom-balance equations for C, H, O, N, etc.

> [!WARNING]
> If you omit an atom-balance check you will later obtain a negative mole fraction or an energy balance that cannot be satisfied.

### Step 2 — Introduce the enthalpy of reaction
The chemical energy released (or absorbed) is the difference between the enthalpies of formation of products and reactants, evaluated at the reference temperature 298.15 K.

\[
\Delta h_r^\circ=\sum_p\nu_p\Delta h_{f,p}^\circ-\sum_r\nu_r\Delta h_{f,r}^\circ
\]

### Step 3 — Write the adiabatic-chamber energy balance
No heat leaves the control volume and no shaft work is done, so total enthalpy is conserved:

\[
\sum_r n_r\bigl(h_r(T_\text{ref})+\Delta h_r(T_\text{ref}\to T_0)\bigr)=\sum_p n_p\bigl(h_p(T_\text{ref})+\Delta h_p(T_\text{ref}\to T_\text{ad})\bigr)
\]

where \(T_\text{ad}\) is the unknown adiabatic flame temperature.

### Step 4 — Express sensible enthalpy with variable specific heats
Because \(c_p\) changes with temperature, the sensible enthalpy is the definite integral

\[
\Delta h_i(T_\text{ref}\to T)=\int_{T_\text{ref}}^T c_{p,i}(T')\,dT'
\]

NASA polynomials or Shomate equations supply \(c_p(T)\).

### Step 5 — Close the nonlinear equation for \(T_\text{ad}\)
After substituting the integrals, the energy balance becomes an implicit scalar equation in the single unknown \(T_\text{ad}\). It is solved numerically (Newton–Raphson or bisection) because the integrals are nonlinear in temperature.

### Step 6 — Textbook statement of the adiabatic flame temperature
The adiabatic flame temperature \(T_\text{ad}\) is the unique temperature that satisfies

\[
\sum_i n_i\bigl[\Delta h_{f,i}^\circ+\int_{T_\text{ref}}^{T_\text{ad}}c_{p,i}(T)\,dT\bigr]=0
\]

when the mixture is stoichiometric or fuel-rich/lean as specified, all species are ideal gases, and dissociation is either neglected or treated by simultaneous equilibrium constants.

## 5. Worked examples — every step shown

**Example 1 — Stoichiometric H₂–O₂ at 298 K reference**

*Given:* 2 mol H₂ + 1 mol O₂, both at 298 K; \(\Delta h_f^\circ(\mathrm{H_2O},g)=-241.826\,\mathrm{kJ\,mol^{-1}}\); constant \(c_p=36\,\mathrm{J\,mol^{-1}K^{-1}}\) for water vapor.

*Find:* \(T_\text{ad}\).

Energy balance:
\[
0=2\bigl(-241.826+\int_{298}^{T_\text{ad}}36\,dT'\bigr)\quad(\mathrm{kJ})
\]
\[
-483.652+72(T_\text{ad}-298)=0
\]
\[
T_\text{ad}=298+\frac{483.652}{72}=7001\,\mathrm{K}
\]

**7001 K**

*Reflection:* Constant \(c_p\) over-predicts temperature by ~2000 K; real dissociation caps temperature near 3200 K.

**Example 2 — CH₄–air at \(\phi=1\)**

*Given:* \(\mathrm{CH_4}+2(\mathrm{O_2}+3.76\mathrm{N_2})\); \(\Delta h_f^\circ(\mathrm{CH_4})=-74.873\), \(\mathrm{CO_2}=-393.509\), \(\mathrm{H_2O}=-241.826\,\mathrm{kJ\,mol^{-1}}\); use NASA 7-coefficient polynomials.

*Find:* \(T_\text{ad}\).

After substitution and numerical solution of the enthalpy integral equation, \(T_\text{ad}=2226\,\mathrm{K}\).

**2226 K**

*Reflection:* Nitrogen dilution lowers temperature by more than 1000 K compared with pure oxygen.

**Example 3 — LOX/RP-1 rocket mixture ratio 2.3**

*Find:* \(T_\text{ad}\) at chamber pressure 70 bar.

CEA equilibrium calculation with variable composition yields \(T_\text{ad}=3670\,\mathrm{K}\).

**3670 K**

*Reflection:* The 70 bar pressure shifts equilibrium slightly but changes \(T_\text{ad}\) by <30 K.

**Example 4 — Fuel-rich H₂–O₂, \(r=3.5\) (mass)**

*Given:* Excess hydrogen.

Energy balance now includes unburned H₂ as a product diluent; numerical solution gives \(T_\text{ad}=3100\,\mathrm{K}\).

**3100 K**

*Reflection:* Excess fuel acts as a heat sink, lowering temperature while raising average molecular weight—two competing effects on specific impulse.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using constant \(c_p=7/2R\)       | Introductory thermo courses teach it first          | Always integrate NASA polynomials above 1000 K       |
| Ignoring dissociation             | Equilibrium constants look complicated              | Run CEA or include at least H, OH, O, H₂O, O₂        |
| Forgetting that \(\Delta h_f^\circ\) is at 298 K only | Tables list a single reference temperature          | Add the explicit integral from 298 K to \(T_\text{ad}\) |
| Treating mixture ratio as mole ratio | Mass ratios are used in engine specifications       | Convert via molecular weights before balancing       |
| Assuming all water remains gaseous | Liquid water would release latent heat              | Verify \(T_\text{ad}>500\,\mathrm{K}\)               |
| Neglecting pressure effect on equilibrium | Most introductory problems are at 1 atm             | Use partial-pressure terms in \(K_p\) at chamber pressure |
| Reporting \(T_\text{ad}\) as stagnation temperature without checking | They are numerically equal only for calorically perfect gas | Confirm \(T_0=T_\text{ad}\) after confirming \(\gamma\) |

## 7. The textbook-precise statement
Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §4.3 states: “The adiabatic flame temperature is the temperature \(T_c\) that satisfies the steady-flow energy equation

\[
\sum_i n_i\bigl[\Delta H_{f,i}^\circ+\int_{T_\text{ref}}^{T_c}C_{p,i}(T)\,dT\bigr]=0
\]

when the chamber is adiabatic, the flow velocity is negligible, and the composition is that given by either frozen or shifting chemical equilibrium at the chamber pressure \(p_c\).”

## 8. Visual — diagram or schematic
```text
Reactants (T_ref, h_ref)          Products (T_ad, h_ad)
          │                                 │
          │   Q = 0, W = 0                  │
          ▼                                 ▼
   h_reactants = Σ n_r [Δh_f,r° + ∫ c_p,r dT]
                       ═══════════════════════════
   h_products   = Σ n_p [Δh_f,p° + ∫ c_p,p dT]
Energy conserved → solve for T_ad
```
The horizontal line represents the control-volume boundary across which no heat crosses; the equality of the two enthalpy sums fixes the single unknown \(T_\text{ad}\).

## 9. The memory technique
1. **The hook** — Picture a perfectly insulated thermos bottle containing fuel and oxidizer; after ignition the temperature inside rises until the “chemical money” (enthalpy of formation) has been entirely converted into “thermal money” (sensible enthalpy). That final temperature is \(T_\text{ad}\).

2. **What to overlearn** — (a) The energy-balance statement \(\sum n_i\Delta h_i=0\), (b) the definition of equivalence ratio \(\phi\), (c) the fact that dissociation lowers \(T_\text{ad}\).

3. **Spaced-repetition schedule** — Review the energy-balance equation at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive from the steady-flow first law with \(Q=W=0\), insert the definition of enthalpy of formation, and integrate \(c_p(T)\) from the reference state.

## 10. What this unlocks
Mastery of adiabatic flame temperature supplies the chamber stagnation temperature \(T_c\) required for isentropic nozzle relations, specific-impulse calculations, and heat-transfer estimates. It is the necessary starting point for the next topics: nozzle flow with variable \(\gamma\), shifting equilibrium performance, and regenerative-cooling channel design.

## 11. Self-check — five questions, no answers
1. Write the stoichiometric reaction for liquid methane burned with 10 % excess oxygen and compute the mole fractions of all products assuming no dissociation.

2. Using constant \(c_p=36\,\mathrm{J\,mol^{-1}K^{-1}}\) for water vapor, calculate the adiabatic flame temperature for the reaction in question 1; then repeat with the NASA polynomial for water and quantify the difference.

3. A proposed propellant combination yields \(T_\text{ad}=4200\,\mathrm{K}\) at 100 bar. Explain why the actual measured chamber temperature will be lower and identify the dominant physical mechanism.

4. Derive the condition under which the adiabatic flame temperature equals the stagnation temperature of the subsequent nozzle flow; state the assumption that must be relaxed when that equality fails.

5. Two mixture ratios give the same \(T_\text{ad}\). Which one will produce higher specific impulse in a vacuum nozzle, and why?