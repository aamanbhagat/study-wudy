## 1. The one-sentence answer
**Thermodynamic potentials** are four specially constructed energy functions—**U**, **H**, **F**, and **G**—each obtained by a Legendre transform of the internal energy so that a different pair of natural variables becomes independent.

Internal energy **U** already tells you how energy is stored inside a system, but its natural variables entropy **S** and volume **V** are rarely the quantities you control in an experiment. By adding or subtracting products such as **PV** or **TS** you shift the independent variables to pressure, temperature, or chemical potential—precisely the quantities an engineer or a rocket scientist can set with valves, heaters, and reservoirs. The resulting potentials therefore act as compact “accounting books” whose minima or maxima directly give equilibrium conditions under realistic constraints.

Aap jab kisi closed system ko constant-temperature bath mein rakhte ho aur uska volume badalte ho, tab Helmholtz free energy **F** ka derivative aapko directly pressure deta hai; Gibbs free energy **G** ka derivative aapko chemical potential deta hai jab pressure aur temperature fixed hon. Yeh transform ek hi energy landscape ko alag-alag “coordinate systems” mein dekhne jaisa hai.

> [!NOTE]
> The deepest insight is that each potential’s total differential already encodes both the first and second laws plus the chosen constraints; you never need to re-derive the equilibrium conditions from scratch.

## 2. Why this matters — concrete and current
In liquid-propellant rocket engines, chamber pressure and temperature are the controlled variables; engineers minimise Gibbs free energy **G** of the combustion products to predict equilibrium composition and specific impulse—exactly the procedure used in NASA’s CEA code and SpaceX’s Raptor engine modelling.

Semiconductor fabs grow epitaxial layers at fixed temperature and pressure; the stable crystal phase is the one that minimises **G**, allowing process simulators such as Synopsys Sentaurus to forecast defect densities before a single wafer is run.

In lithium-ion battery research, open-circuit voltage is proportional to the difference in Gibbs free energy between charged and discharged electrode states; papers from Argonne National Lab’s battery group use tabulated **G** values to screen new cathode chemistries.

Cryogenic hydrogen storage tanks operate at constant temperature while volume changes; Helmholtz free energy **F** minima determine the pressure at which boil-off begins, guiding insulation design for the upper stages of Ariane 6 and SLS.

Magnetocaloric refrigeration cycles exploit the entropy jump at constant **T** and **H**; the relevant potential is the magnetic Helmholtz function whose temperature derivative yields the adiabatic temperature change measured in prototype devices at Fraunhofer IPM.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| First law: \(\Delta U = Q - W\) | Supplies the starting energy balance before any transform. |
| Second law: \(dS \ge \frac{\delta Q}{T}\) | Tells which processes are irreversible and why potentials decrease. |
| Exact differential & state functions | Guarantees that mixed partial derivatives commute (Maxwell relations). |
| Legendre transform intuition | Explains why adding or subtracting \(PV\) or \(TS\) merely changes which variables are independent. |

If any row above feels shaky, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the fundamental relation
Aap already know that for a simple compressible system the internal energy differential is \(dU = T\,dS - P\,dV\). Yeh equation dono laws ko ek saath likhti hai aur **U** ko **S** aur **V** ka natural function banati hai.

Concrete example: ek ideal gas cylinder mein entropy badhao to temperature badhega; volume badhao to pressure girega—dono effects \(dU\) mein dikhte hain.

Formal statement:
\[
dU = T\,dS - P\,dV
\]

> [!WARNING]
> Agar aap yahan \(T\) aur \(P\) ko independent variables samajh baithe to baad mein sign errors pakke hain.

### Step 2 — Change one variable at a time via Legendre transform
Jab aap \(U\) se \(PV\) add karte ho, volume ki jagah pressure independent ho jaata hai. Naya function **H** = **U** + **PV** banta hai.

Example: constant-pressure combustion mein enthalpy change directly heat release deta hai.

Formal result:
\[
dH = T\,dS + V\,dP
\]

### Step 3 — Subtract \(TS\) to fix temperature
Constant-temperature processes ke liye **F** = **U** − **TS** define karo. Ab temperature aur volume dono control kar sakte ho.

Example: isothermal expansion of an ideal gas mein \(\Delta F = -nRT\ln(V_2/V_1)\) directly work potential deta hai.

Formal:
\[
dF = -S\,dT - P\,dV
\]

### Step 4 — Combine both transforms for \(G\)
Pressure aur temperature dono fix karne ke liye **G** = **H** − **TS** = **U** + **PV** − **TS** lo.

Example: chemical equilibrium at fixed \(T,P\) tab hota hai jab \(G\) minimum ho.

Formal:
\[
dG = -S\,dT + V\,dP
\]

### Step 5 — Read equilibrium conditions from the differentials
Har potential ka natural variables set uske minima/maxima ki condition deta hai. Closed system at constant \(T,V\) mein \(F\) minimum equilibrium hai; constant \(T,P\) mein \(G\) minimum.

### Step 6 — Recover all Maxwell relations by equality of mixed derivatives
Because \(dF\) exact hai, \(\frac{\partial^2 F}{\partial T\partial V} = \frac{\partial^2 F}{\partial V\partial T}\) turant \((\partial S/\partial V)_T = (\partial P/\partial T)_V\) de deta hai—Maxwell relation number 1.

## 5. Worked examples — har step show karo

**Example 1 — Internal energy of ideal gas**
*Given:* \(PV = nRT\), \(U = U(T)\) only.  
*Find:* \(\Delta U\) for isothermal expansion.  
Step 1: \(dU = T\,dS - P\,dV\).  
Step 2: Isothermal \(\Rightarrow dT = 0 \Rightarrow dU = 0\) for ideal gas (from equation of state).  
*Why:* Temperature alone fixes \(U\), volume term cancels with entropy term.  
**Final answer:** \(\Delta U = 0\).

*Reflection:* Simple case teaches that not every term in \(dU\) contributes when constraints are applied.

**Example 2 — Enthalpy change in isobaric heating**
*Given:* 1 kg water, \(c_p = 4180\) J kg\(^{-1}\) K\(^{-1}\), heated from 20 °C to 80 °C at 1 atm.  
*Find:* \(\Delta H\).  
Step 1: \(dH = T\,dS + V\,dP\), \(dP = 0\).  
Step 2: \(dS = c_p dT/T \Rightarrow \Delta H = \int c_p dT = c_p\Delta T\).  
**Final answer:** \(\Delta H = 251\) kJ.

*Reflection:* Enthalpy directly equals heat at constant pressure—exactly why calorimeters report \(\Delta H\).

**Example 3 — Helmholtz free energy for isothermal expansion**
*Given:* Ideal gas, isothermal reversible expansion, \(V_1\to V_2\).  
*Find:* \(\Delta F\).  
Step 1: \(dF = -S\,dT - P\,dV\), \(dT = 0\).  
Step 2: \(\Delta F = -\int P\,dV = -nRT\ln(V_2/V_1)\).  
**Final answer:** \(\Delta F = -nRT\ln(V_2/V_1)\).

*Reflection:* Work extracted equals decrease in \(F\) at constant \(T\).

**Example 4 — Gibbs free energy of vaporisation**
*Given:* Water boils at 373 K, 1 atm; \(\Delta H_\text{vap} = 40.66\) kJ mol\(^{-1}\).  
*Find:* \(\Delta G\) at equilibrium.  
Step 1: At saturation, \(T\) and \(P\) fixed, \(\Delta G = 0\) by definition of equilibrium.  
Step 2: \(\Delta G = \Delta H - T\Delta S \Rightarrow \Delta S = \Delta H/T\).  
**Final answer:** \(\Delta G = 0\).

*Reflection:* Phase equilibrium is the clearest macroscopic signature that \(G\) is minimised.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sign error in \(dF\) or \(dG\) | Students remember “subtract TS” but forget the resulting minus sign in front of \(S dT\). | Always write the full differential immediately after defining the potential. |
| Treating \(U\) as function of \(T,V\) | Textbooks often plot \(U(T,V)\), hiding that natural variables are \(S,V\). | Before any derivative, state the natural pair out loud. |
| Forgetting \(\mu dN\) term | Single-component problems hide particle exchange. | Add \(\mu dN\) from the first step whenever composition can change. |
| Confusing \(F\) minimum with \(G\) minimum | Both decrease, but constraints differ. | Write the fixed variables next to each potential name. |
| Using \(\Delta G = \Delta H - T\Delta S\) at varying pressure | Formula only holds at constant \(T\). | Check that both \(T\) and \(P\) are constant before applying. |
| Ignoring that potentials are state functions | Path dependence sneaks back in. | Verify \(dX\) is written as an exact differential before integrating. |

## 7. The textbook-precise statement
A thermodynamic potential is a Legendre transform of the internal energy \(U(S,V,N)\). The four common transforms are:
\[
H(S,P,N) = U + PV, \quad F(T,V,N) = U - TS, \quad G(T,P,N) = U + PV - TS.
\]
Each potential is a natural function of its independent variables; its total differential is exact and yields the equations of state plus Maxwell relations by equality of cross derivatives. Equilibrium at constant \(T,V\) is a minimum of \(F\); at constant \(T,P\) a minimum of \(G\). (Callen, *Thermodynamics and an Introduction to Thermostatistics*, 2nd ed., §5-3 and §6-2.)

## 8. Visual — diagram or schematic
```
U(S,V) ──(+PV)──► H(S,P)
   │                │
(-TS)              (-TS)
   │                │
   ▼                ▼
F(T,V) ──(+PV)──► G(T,P)
```
Horizontal arrows = Legendre transform w.r.t. volume; vertical arrows = transform w.r.t. entropy. Fixed variables appear on the axes of each box.

## 9. The memory technique
**The hook** — Imagine four different “energy dashboards” on a car: U shows total fuel, H shows fuel plus tyre pressure work, F shows fuel minus heat already lost to the radiator, G shows the net “useful-to-drive” energy at today’s temperature and altitude.

**What to overlearn**  
\(dU = T dS - P dV\)  
\(dG = -S dT + V dP\) (most used in chemistry/rockets)

**Spaced-repetition schedule** — Review the four differentials on day 1, day 3, day 7, day 16, day 35.

**First-principles fallback** — Forget the name? Start from \(dU\), decide which variable you want to replace, add or subtract its conjugate pair, and differentiate—new potential appears automatically.

## 10. What this unlocks
Once you can switch potentials fluently you can derive every Maxwell relation in one line, write equilibrium conditions for open systems, and move directly into statistical mechanics where each potential is the logarithm of a partition function.

- Phase equilibria and Clapeyron equation
- Chemical potential and law of mass action
- Nernst equation in electrochemistry
- Fluctuation–dissipation theorems in statistical mechanics

## 11. Self-check — five questions, no answers
1. Write the total differential of \(G\) and identify its natural variables.  
2. For an ideal gas undergoing isothermal expansion, compute \(\Delta F\) and \(\Delta G\) and explain why they differ.  
3. A reaction occurs at constant \(T\) and \(P\); which potential’s change must be negative for spontaneity?  
4. Starting from \(dF\), obtain the Maxwell relation \((\partial S/\partial V)_T = (\partial P/\partial T)_V\).  
5. In a rocket combustion chamber held at fixed pressure, which potential’s minimisation yields the equilibrium mole fractions, and why would using \(U\) instead give wrong answers?