## 1. The one-sentence answer
**Work done by an ideal gas equals the integral of pressure with respect to volume along the process path.**  

In any thermodynamic process the system boundary moves when volume changes, so the gas exerts force on the piston; that force times the displacement is mechanical work. Because pressure may vary, the only universal expression is the area under the P-V curve. Different named processes (isobaric, isochoric, isothermal, adiabatic) simply supply different P(V) relations, turning the integral into elementary closed forms.  

The derivations therefore consist of substituting the appropriate constraint (constant P, constant V, PV = constant, or PV^γ = constant) into W = ∫ P dV and evaluating the definite integral between the two states.  

> [!NOTE]
> The sign convention matters: positive W means work done *by* the system; reversing the limits or adopting the engineering convention flips the sign.

## 2. Why this matters — concrete and current
In liquid-propellant rocket engine cycles the turbopump turbines extract shaft work from hot gas expanding through nozzles; the isentropic work integral determines blade loading and propellant mass-flow margins on engines such as SpaceX Merlin and Rocket Lab Rutherford.  

Semiconductor rapid thermal processing chambers cycle wafer temperature by controlling chamber pressure; the isochoric and isobaric work terms enter the energy-balance model that sets ramp rates and prevents wafer slip.  

Cryogenic hydrogen storage tanks on the James Webb Space Telescope undergo repeated isothermal venting; the ln(V) work expression fixes the allowable pressure-drop rate before boil-off exceeds mission lifetime budgets.  

Piston-driven free-piston Stirling engines under development for lunar power stations rely on the adiabatic work formula to size the displacer and predict indicated power at 10^{-3} Pa vacuum levels.  

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First law ΔU = Q − W     | Work is one of the two energy-transfer modes              |
| Ideal-gas law PV = nRT   | Supplies the P(V) or T(V) relation for each process       |
| Definition of γ = C_P/C_V| Appears in the adiabatic exponent                         |
| Definite integral        | Converts the general work expression into closed forms    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressure exerts force on the moving boundary
A gas at pressure P inside a cylinder pushes outward on a piston of area A with force F = PA. When the piston displaces an infinitesimal distance dx the volume change is dV = A dx, so the infinitesimal work is δW = F dx = P dV.  

For a finite change the total work is therefore the integral  
$$W = \int_{V_1}^{V_2} P\,dV.$$  

> [!WARNING]
> Treating W as simply PΔV when P is not constant undercounts or overcounts the area under the actual curve.

### Step 2 — Isochoric process: volume fixed, no displacement
If V = constant then dV = 0 everywhere, so the integral collapses at once to zero:  
$$W_\text{isochoric} = 0.$$  

### Step 3 — Isobaric process: pressure fixed, integral is a rectangle
P = constant, therefore  
$$W_\text{isobaric} = P\int_{V_1}^{V_2} dV = P(V_2 - V_1).$$  

### Step 4 — Isothermal process: PV = constant supplies the integrand
For an ideal gas at constant T, P = nRT/V. Substitute:  
$$W_\text{isothermal} = nRT\int_{V_1}^{V_2}\frac{dV}{V} = nRT\ln\frac{V_2}{V_1}.$$  

### Step 5 — Adiabatic process: PV^γ = constant
The adiabatic condition gives P = K V^{-γ} where K is fixed. The integral evaluates to  
$$W_\text{adiabatic} = \frac{P_1V_1 - P_2V_2}{\gamma-1} = \frac{nR(T_1 - T_2)}{\gamma-1}.$$  

### Step 6 — Path dependence is now explicit
Because each process supplies a different P(V), the numerical value of W between the same two states generally differs; only ΔU is fixed by the end states alone.

## 5. Worked examples — every step shown

**Example 1 — Isobaric expansion**  
*Given:* 2.0 mol of ideal gas expands at constant pressure 1.5 × 10^5 Pa from 0.010 m³ to 0.025 m³.  
*Find:* Work done by the gas.  

W = P(V₂ − V₁)  
= (1.5 × 10^5 Pa)(0.015 m³)  
= 2250 J  

*Why* the subtraction is valid: pressure is constant, so the integral reduces to P times the width of the rectangle.  

**2250 J**

*Reflection:* The arithmetic is trivial once the constant-P constraint is recognized; the same numbers in a non-isobaric path would require integration.

**Example 2 — Isochoric heating**  
*Given:* 1.5 mol of gas heated at constant volume 0.020 m³ until pressure rises from 1.0 × 10^5 Pa to 3.0 × 10^5 Pa.  
*Find:* Work.  

Because dV = 0, W = 0 J.  

**0 J**

*Reflection:* Many students still attempt to insert a pressure difference; the zero result follows directly from the definition of mechanical work.

**Example 3 — Isothermal expansion**  
*Given:* 0.50 mol of helium at 300 K expands isothermally from 2.0 L to 6.0 L.  
*Find:* Work.  

W = nRT ln(V₂/V₁)  
= (0.50 mol)(8.314 J mol⁻¹ K⁻¹)(300 K) ln(3)  
= 1370 J (rounded)  

**1370 J**

*Reflection:* The logarithm appears only because the ideal-gas law supplies 1/V; forgetting to convert litres to cubic metres is a common unit slip.

**Example 4 — Adiabatic compression**  
*Given:* 3.0 mol of diatomic gas (γ = 1.4) compressed adiabatically from 400 K to 650 K.  
*Find:* Work done *on* the gas.  

W_by gas = nR(T₁ − T₂)/(γ − 1)  
= (3.0)(8.314)(400 − 650)/0.4 = −15589 J  
Work done *on* the gas = +15589 J  

**15589 J (on the gas)**

*Reflection:* The negative sign for expansion work and the switch to positive for work done on the system must be tracked explicitly.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using W = PΔV for every process   | Over-generalisation from the isobaric case          | Check whether P is constant before integrating       |
| Sign reversal between conventions | Thermodynamics vs engineering sign conventions      | State the convention once and keep it consistent     |
| Forgetting nR when using T form   | Treating the adiabatic expression as purely P-V     | Convert to temperature form only after writing nR    |
| Applying isothermal formula to adiabatic state change | Both processes can connect same (P,V) points | Verify whether heat exchange is zero before choosing formula |
| Units mismatch in logarithms      | Volume in litres while R expects m³                 | Convert volumes to consistent SI units first         |
| Treating γ as 5/3 for all gases   | Memorising monatomic value only                     | Look up C_P/C_V for the specific gas in the problem  |
| Assuming ΔU = 0 for isothermal work calculation | Confusing ideal-gas internal energy with work       | Recall ΔU depends only on ΔT for ideal gas           |

## 7. The textbook-precise statement
For a quasi-static process executed by an ideal gas the work done *by* the system is  
$$W = \int_{V_i}^{V_f} P(V)\,dV,$$  
where the function P(V) is determined by the process constraints. The four elementary cases are:  
- Isochoric: W = 0  
- Isobaric: W = P(V_f − V_i)  
- Isothermal: W = nRT ln(V_f/V_i)  
- Adiabatic: W = (P_i V_i − P_f V_f)/(γ − 1)  

(Cengel & Boles, *Thermodynamics: An Engineering Approach*, 8e, §4-4.)

## 8. Visual — diagram or schematic
```text
P
↑
│     isothermal
│   ↗‾‾‾‾‾‾‾‾‾↘
│  /            \
│ /  adiabatic   \  isobaric
│/________________\___________→ V
│   isochoric (vertical line)
```
Horizontal line = isobaric, vertical line = isochoric, 1/V hyperbola = isothermal, steeper 1/V^γ curve = adiabatic.

## 9. The memory technique

1. **The hook** — Picture four pistons: one locked (isochoric, zero area), one sliding at constant force (isobaric, rectangle), one breathing slowly with “ln” written on the side, and one insulated with a γ stamp.  
2. **What to overlearn** — The four closed-form expressions and the fact that W equals the area under the P-V path.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to W = ∫P dV, insert the defining relation of the process, and integrate.

## 10. What this unlocks
Mastery of these integrals lets you compute heat transfer via the first law for every elementary process and prepares the ground for polytropic processes, availability analysis, and cycle efficiency calculations.  

- Next: polytropic work derivation  
- Carnot-cycle efficiency  
- Steady-flow energy equation in nozzles and turbines  

## 11. Self-check — five questions, no answers
1. An ideal gas expands from 1 L to 3 L at constant pressure 200 kPa. Compute W.  
2. The same gas is then cooled at constant volume back to the initial pressure. Compute the work for this second leg.  
3. A monatomic gas undergoes isothermal expansion doing 500 J of work. What is ΔU?  
4. Derive the adiabatic work expression starting from PV^γ = constant without looking at notes.  
5. Two paths connect the same initial and final states: one isothermal, one adiabatic. Which path produces larger |W| and why?