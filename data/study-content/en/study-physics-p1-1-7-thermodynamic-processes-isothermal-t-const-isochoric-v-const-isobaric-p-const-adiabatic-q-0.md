## 1. The one-sentence answer
**Thermodynamic processes are idealized paths on the state space of a system in which one variable is held exactly constant, allowing the first law to be integrated in closed form.**

An isothermal process keeps temperature fixed, so internal energy of an ideal gas never changes and any heat added is exactly converted into expansion work. An isochoric process locks volume, eliminating work and forcing every joule of heat into a temperature rise. An isobaric process holds pressure steady, permitting both work and heat while volume and temperature move together. An adiabatic process forbids heat transfer, so any work done must come from the system’s own internal energy and therefore produces the steepest pressure drop for a given volume change.

These four constraints are not arbitrary; each corresponds to a limiting case that real devices approach for measurable intervals of time. Once the constraint is imposed, the equation of state plus the first law immediately yields the work, heat, and internal-energy changes along that path.

> [!NOTE]
> The four processes are the coordinate axes of the P–V plane; every reversible cycle is assembled from segments that lie exactly on one of these axes.

## 2. Why this matters — concrete and current
In the Merlin engines of Falcon 9, the combustion chamber is deliberately run near-isobaric so that chamber pressure remains high while propellant is continuously injected; the subsequent expansion through the nozzle is treated as adiabatic to first order, allowing simple calculation of exit velocity from the relation \(T_2/T_1 = (P_2/P_1)^{(\gamma-1)/\gamma}\).

Cryogenic hydrogen tanks on the James Webb Space Telescope are allowed to vent through isochoric pressure-relief valves; because volume is fixed, the temperature drop that accompanies venting can be predicted directly from \(\Delta U = Q\) with \(Q = 0\) once the valve opens.

Semiconductor plasma etchers use rapid isobaric heating cycles to control wafer temperature; the pressure is held constant by a downstream throttle valve while heat is added, producing a linear relation between energy input and volume change of the process gas.

In the atmosphere of a collapsing molecular cloud, the compression phase is essentially adiabatic until radiative cooling becomes efficient; the resulting \(\gamma = 5/3\) scaling sets the minimum mass for star formation and is still used in current hydrodynamic simulations of the interstellar medium.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ideal-gas law \(PV = nRT\) | Supplies the algebraic link between any two state variables once the third is fixed |
| First law \(\Delta U = Q - W\) | Provides the universal energy balance that becomes solvable once a process constraint is added |
| Definition of work \(W = \int P\,dV\) | Converts the geometric area under a P–V path into a numerical energy transfer |
| Heat capacity at constant volume \(C_V\) | Appears in every \(\Delta U\) calculation for an ideal gas |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the single fixed variable
Any thermodynamic process is defined by declaring which state variable is not allowed to change. The four classical names simply label the four choices: temperature, volume, pressure, or heat.

A sealed, insulated piston that is suddenly locked so its volume cannot move is undergoing an isochoric process. The formal statement is simply \(dV = 0\) at every instant.

> [!WARNING]
> If two variables are accidentally held constant at once, the process collapses to a single point and no path exists.

### Step 2 — Write the first-law differential
With the constraint in hand, the first law \(\mathrm{d}U = \delta Q - \delta W\) reduces to an ordinary differential equation along the path.

For the isochoric case, \(\delta W = P\,dV = 0\), leaving \(\mathrm{d}U = \delta Q\).

### Step 3 — Express \(\Delta U\) for an ideal gas
Internal energy of an ideal gas depends only on temperature: \(\mathrm{d}U = nC_V\,\mathrm{d}T\). Substituting the constraint immediately gives the heat transfer.

Thus \(Q_V = nC_V\Delta T\) for any isochoric temperature change.

### Step 4 — Repeat for the remaining three constraints
Isothermal: \(dT = 0\) forces \(\Delta U = 0\), therefore \(Q = W = nRT\ln(V_2/V_1)\).  
Isobaric: \(dP = 0\) yields \(W = P\Delta V\) and \(Q_P = nC_P\Delta T\).  
Adiabatic: \(\delta Q = 0\) produces \(P V^\gamma = \text{const}\) after integration with the ideal-gas law.

### Step 5 — Obtain the four work integrals
Each constraint converts the general line integral \(W = \int P\,dV\) into an elementary expression that can be evaluated between any two end states.

### Step 6 — Assemble the textbook relations
The four processes therefore supply the complete set of elementary path integrals needed to evaluate any reversible cycle composed of straight segments on the P–V diagram.

## 5. Worked examples — every step shown

**Example 1 — Isochoric heating of argon**
*Given:* 0.5 mol of argon (\(C_V = 12.5\,\mathrm{J\,mol^{-1}K^{-1}}\)) heated from 300 K to 600 K at constant volume.  
*Find:* Heat added and work done.

Step 1: \(\Delta U = n C_V \Delta T = 0.5 \times 12.5 \times 300 = 1875\,\mathrm{J}\).  
*Why:* Internal energy depends only on temperature for an ideal gas.  
Step 2: Because \(dV = 0\), \(W = 0\).  
*Why:* Work is defined as \(\int P\,dV\).  
Step 3: First law then requires \(Q = \Delta U = 1875\,\mathrm{J}\).  
**1875 J of heat, 0 J of work.**

*Reflection:* The example isolates the fact that all energy input appears as a temperature rise when expansion is forbidden.

**Example 2 — Isothermal expansion of nitrogen**
*Given:* 2 mol of N₂ expands isothermally at 290 K from 0.1 m³ to 0.4 m³.  
*Find:* Work and heat transfer.

Step 1: \(\Delta U = 0\) because \(T\) is constant.  
*Why:* \(U\) is a function of \(T\) alone.  
Step 2: \(W = nRT\ln(V_2/V_1) = 2 \times 8.314 \times 290 \times \ln(4) = 3340\,\mathrm{J}\).  
*Why:* The integral \(\int_{V_1}^{V_2} (nRT/V)\,dV\) reduces to the logarithm.  
Step 3: First law then gives \(Q = W = 3340\,\mathrm{J}\).  
**3340 J of work done by the gas, 3340 J of heat absorbed.**

*Reflection:* The numerical equality of \(Q\) and \(W\) is the signature of an isothermal ideal-gas process.

**Example 3 — Isobaric expansion followed by adiabatic compression**
*Given:* 1 mol of air (\(\gamma = 1.4\)) expands isobarically from 1 L to 3 L at 2 atm, then returns adiabatically to the original volume.  
*Find:* Net work of the two-step path.

Step 1 (isobaric): \(W_1 = P\Delta V = 2\,\mathrm{atm} \times 2\,\mathrm{L} = 405\,\mathrm{J}\) (after unit conversion).  
Step 2 (adiabatic): \(T_2/T_3 = (V_3/V_2)^{\gamma-1}\), \(W_2 = -C_V\Delta T\).  
Step 3: Net work equals the enclosed area on the P–V diagram.  
**Net work = 405 J − 288 J = 117 J (by the system).**

*Reflection:* The adiabatic leg is steeper than the isothermal leg would have been, reducing the area under the return curve.

**Example 4 — Full adiabatic reversible nozzle calculation**
*Given:* Combustion gas at 20 atm, 3000 K expands adiabatically to 1 atm in a rocket nozzle (\(\gamma = 1.25\)).  
*Find:* Exit temperature and velocity (neglect inlet velocity).

Step 1: \(T_e = T_c (P_e/P_c)^{(\gamma-1)/\gamma} = 3000 \times (1/20)^{0.2} = 3000 \times 0.525 = 1575\,\mathrm{K}\).  
Step 2: \(c_p = \gamma R/(\gamma-1)\).  
Step 3: \(v_e = \sqrt{2 c_p (T_c - T_e)}\).  
**Exit temperature 1575 K, exit velocity 1720 m s⁻¹.**

*Reflection:* The adiabatic assumption supplies the entire enthalpy drop that becomes kinetic energy.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(C_P\) instead of \(C_V\) for isochoric heat | Students remember “heat capacity at constant pressure” more easily | Write the subscript that matches the constraint before substituting |
| Treating adiabatic as “no temperature change” | Confusing “no heat” with “no energy change” | Remember \(Q=0\) implies \(\Delta U = -W\), so temperature must change |
| Applying \(PV^\gamma =\) const to isothermal processes | Both processes have no heat transfer in some mental shorthand | Check the constraint list: isothermal has \(T\) fixed, adiabatic has \(Q\) fixed |
| Forgetting that real processes are never perfectly adiabatic | Heat leaks are always present at finite temperature differences | Label every adiabatic segment “approximately adiabatic” and estimate the error |
| Sign error on work when the system is compressed | Work done on the system is conventionally positive in some texts | Fix a sign convention once and stay with it; most engineering texts use \(W\) = work by system |
| Assuming \(\gamma\) is constant through a large temperature swing | \(\gamma\) is defined for an ideal gas with constant heat capacities | Verify that the temperature range keeps \(C_V\) nearly constant before using a single \(\gamma\) |
| Calculating \(\Delta U\) for a real gas as \(nC_V\Delta T\) | Real-gas internal energy also depends on volume | Use the ideal-gas model only when \(PV = nRT\) is stated or implied |

## 7. The textbook-precise statement
A thermodynamic process is a continuous sequence of equilibrium states. When one of the variables \(T\), \(V\), \(P\), or \(Q\) is constrained to a constant value, the process is called isothermal, isochoric, isobaric, or adiabatic, respectively. For an ideal gas the following relations hold between any two states on the path (Fermi, *Thermodynamics*, 1956, §3.3):

- Isothermal: \(T=\text{const}\), \(PV=\text{const}\), \(Q=W=nRT\ln(V_2/V_1)\)
- Isochoric: \(V=\text{const}\), \(W=0\), \(Q=nC_V\Delta T\)
- Isobaric: \(P=\text{const}\), \(W=P(V_2-V_1)\), \(Q=nC_P\Delta T\)
- Adiabatic: \(Q=0\), \(PV^\gamma=\text{const}\), \(TV^{\gamma-1}=\text{const}\)

## 8. Visual — diagram or schematic
```text
P
│
│   Adiabatic (steepest)
│      ╱
│     ╱   Isothermal
│    ╱     ╲
│   ╱       ╲
│  ╱         ╲  Isobaric (horizontal)
│ ╱           ╲
│╱             ╲
└────────────────── V
   Isochoric (vertical)
```
Labelled axes: vertical = pressure, horizontal = volume. Four curves emanate from a common point: vertical line (isochoric), horizontal line (isobaric), convex curve (isothermal, \(PV=\text{const}\)), steeper convex curve (adiabatic, \(PV^\gamma=\text{const}\)).

## 9. The memory technique

**The hook**  
Picture a piston with four colored locks: red for temperature (isothermal), blue for volume (isochoric), green for pressure (isobaric), and a perfect insulator blanket (adiabatic). Only one lock may be engaged at a time.

**What to overlearn**  
1. \(Q = W\) when \(T\) is fixed (ideal gas).  
2. \(W = 0\) when \(V\) is fixed.  
3. \(PV^\gamma =\) const when \(Q = 0\).

**Spaced-repetition schedule**  
Review the four work/heat expressions at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
Start from \(\mathrm{d}U = \delta Q - P\,dV\), impose the single constraint, integrate, and recover the textbook formula.

## 10. What this unlocks
Mastery of these four elementary paths lets you evaluate the net work and efficiency of any reversible cycle drawn on the P–V plane and prepares the ground for the second law, entropy calculations, and the analysis of real rocket nozzles, compressors, and turbines.

- Carnot, Otto, and Brayton cycles  
- Entropy changes along reversible paths  
- Nozzle flow and stagnation properties  
- Polytropic processes as generalizations

## 11. Self-check — five questions, no answers
1. A cylinder contains 3 mol of helium at 400 K. It is expanded isothermally to twice its volume. Compute the work done by the gas.  
2. The same cylinder is instead cooled isochorically until its pressure halves. Compute the heat removed.  
3. An adiabatic compression raises the temperature of air from 300 K to 600 K. What is the pressure ratio if \(\gamma = 1.4\)?  
4. Why does the adiabatic curve lie above the isothermal curve on a P–V diagram when both start from the same point and the gas is compressed?  
5. In a proposed engine cycle an isobaric expansion is followed by an isochoric pressure drop and then an adiabatic compression back to the starting state. Sketch the cycle and state whether net work is positive or negative.