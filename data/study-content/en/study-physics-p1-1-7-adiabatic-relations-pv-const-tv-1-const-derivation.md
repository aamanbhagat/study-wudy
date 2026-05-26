## 1. The one-sentence answer
**An adiabatic process for an ideal gas with no heat transfer obeys the invariant relations \(PV^\gamma=\) constant and \(TV^{\gamma-1}=\) constant, where \(\gamma=C_p/C_v\).**

These relations arise because the internal energy change is supplied entirely by expansion work, forcing pressure and volume to trade off more steeply than in an isothermal process. Begin with the first law under the constraint \(dQ=0\), substitute the ideal-gas expression for internal energy, and eliminate temperature using the equation of state; the resulting differential equation integrates directly to the power-law invariants. The same algebra yields the temperature–volume form once the ideal-gas law is reinserted.

The exponent \(\gamma\) is fixed by the degrees of freedom of the gas; for a monatomic gas it equals \(5/3\), while for diatomic air at room temperature it is \(7/5\).

> [!NOTE]
> The “const” is not arbitrary; it is fixed by the initial state, so every point on an adiabat is completely determined once one pair \((P,V)\) is known.

## 2. Why this matters — concrete and current
In liquid-propellant rocket nozzles the core flow is treated as isentropic (hence adiabatic and reversible) from chamber to throat; the relation \(P_c/P_t=(\gamma+1)/2)^{\gamma/(\gamma-1)}\) sets the chamber pressure needed for sonic throat conditions in engines such as the Merlin 1D on Falcon 9.  

Atmospheric gravity waves and the propagation of thunder are modeled with the adiabatic sound speed \(a=\sqrt{\gamma RT/M}\), which appears in the design of launch-vehicle acoustic environments at NASA Kennedy Space Center.  

Diesel-engine compression ignition relies on the rapid temperature rise given by \(T_2=T_1(r)^{\gamma-1}\) where \(r\) is the compression ratio; modern high-efficiency diesels operate near \(\gamma=1.3\) because of real-gas effects.  

Stellar-structure codes for main-sequence stars integrate the adiabatic gradient \(\nabla_\text{ad}=(\gamma-1)/\gamma\) to decide whether a layer is convective; the same relation enters mixing-length theory used in solar-evolution calculations published by the Aarhus Stellar Modelling Centre.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First law of thermodynamics | Supplies \(dU=dQ-PdV\) with \(dQ=0\) for adiabatic processes |
| Ideal-gas equation of state | Links \(U\) to temperature and \(P,V\) to \(T\)           |
| Definition of heat capacities \(C_p,C_v\) | Defines the single number \(\gamma\) that appears in the exponents |
| Differential calculus     | Required to integrate the separable equation \(dP/P+\gamma dV/V=0\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy can only come from work
When no heat crosses the system boundary, any change in internal energy must be produced by mechanical work. For a quasi-static process the work is \(PdV\), so the first law collapses to \(dU=-PdV\).

A cylinder fitted with a perfectly insulating piston and containing one mole of ideal gas is suddenly allowed to expand against a slowly varying external pressure; the gas cools even though no heat leaves.

$$dU=-PdV.$$

> [!WARNING]
> If the process is rapid and irreversible, \(P\) inside is not uniform; the simple substitution \(PdV\) fails.

### Step 2 — Internal energy depends only on temperature
For any ideal gas, \(U\) is a function of \(T\) alone, so \(dU=nC_v\,dT\). Substituting gives the working equation \(nC_v\,dT=-PdV\).

One mole of monatomic helium at 300 K expands from 2 L to 3 L; the temperature drop is computed directly from the energy removed as work.

$$nC_v\,dT=-PdV.$$

> [!WARNING]
> Treating \(C_v\) as constant is valid only when vibrational modes remain frozen; at high temperatures the relation must be recomputed.

### Step 3 — Replace \(P\) with the equation of state
Insert \(P=nRT/V\) into the energy equation and rearrange:

$$C_v\frac{dT}{T}=-R\frac{dV}{V}.$$

### Step 4 — Introduce \(\gamma\) via Mayer’s relation
Because \(C_p=C_v+R\), the ratio \(\gamma=C_p/C_v\) yields the identity \(R=C_v(\gamma-1)\). The equation becomes

$$\frac{dT}{T}=-(\gamma-1)\frac{dV}{V}.$$

### Step 5 — Integrate to the temperature–volume law
Direct integration produces

$$TV^{\gamma-1}=\text{constant}.$$

### Step 6 — Recover the pressure–volume law
Substitute \(T=PV/nR\) back into the temperature–volume result and rearrange to obtain

$$PV^\gamma=\text{constant}.$$

## 5. Worked examples — every step shown

**Example 1 — Monatomic gas compression**  
*Given:* One mole of helium (\(\gamma=5/3\)) expands adiabatically from 1 L, 300 K to 2 L.  
*Find:* Final temperature.  

Start from the integrated form  
$$T_1V_1^{\gamma-1}=T_2V_2^{\gamma-1}.$$  
*Why:* The relation was obtained by integrating the differential energy balance under the ideal-gas law.  
Insert numbers:  
$$300\times(1)^{2/3}=T_2\times(2)^{2/3}\implies T_2=300\times2^{-2/3}\approx189\text{ K}.$$  
**189 K**  

*Reflection:* The only arithmetic required is evaluating a power; the same exponent appears in every adiabatic problem once \(\gamma\) is known.

**Example 2 — Diatomic pressure ratio**  
*Given:* Air (\(\gamma=1.4\)) at 1 bar, 300 K is compressed adiabatically to one-tenth its volume.  
*Find:* Final pressure.  

Use \(P_1V_1^\gamma=P_2V_2^\gamma\):  
$$P_2=P_1\left(\frac{V_1}{V_2}\right)^\gamma=1\times10^{1.4}\approx25.12\text{ bar}.$$  
**25.12 bar**  

*Reflection:* The exponent 1.4 is larger than the isothermal exponent 1, showing that pressure rises faster when temperature also rises.

**Example 3 — Mixed variables**  
*Given:* 2 mol of O\(_2\) (\(\gamma=1.4\)) at 5 bar, 400 K expands to 10 bar.  
*Find:* Final temperature.  

First obtain volume ratio from the pressure–volume law, then convert to temperature:  
$$V_2/V_1=(P_1/P_2)^{1/\gamma}=(0.5)^{1/1.4}\approx0.615.$$  
Insert into \(TV^{\gamma-1}=\) const:  
$$T_2=T_1(V_1/V_2)^{\gamma-1}=400\times(1.626)^{0.4}\approx477\text{ K}.$$  
**477 K**  

*Reflection:* Two relations must be chained; forgetting to convert pressure ratio into volume ratio is a frequent slip.

**Example 4 — Rocket throat condition**  
*Given:* Combustion gas \(\gamma=1.25\), chamber pressure 70 bar, chamber temperature 3000 K.  
*Find:* Temperature at the sonic throat where \(P=70/1.89\).  

The isentropic pressure ratio for Mach 1 is \((( \gamma+1)/2)^{\gamma/(\gamma-1)}\approx1.89\).  
Apply the temperature–pressure form derived from the two adiabatic invariants:  
$$T_t=T_c\left(\frac{P_t}{P_c}\right)^{(\gamma-1)/\gamma}=3000\times(1/1.89)^{0.2}\approx2600\text{ K}.$$  
**2600 K**  

*Reflection:* Real nozzles add boundary-layer and chemistry corrections, yet the ideal adiabatic drop remains the starting point for every design code.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\gamma=1\)                | Confusing adiabatic with isothermal         | Remember \(\gamma>1\) always for ideal gases |
| Treating \(\gamma\) as constant at high T | Ignoring vibrational excitation             | Check temperature against characteristic vibrational temperature |
| Applying \(PV^\gamma=\) const to free expansion | Process is adiabatic but not quasi-static   | Verify reversibility before using the invariants |
| Forgetting \(n\) in \(PV=nRT\) when deriving | Algebraic oversight                         | Keep \(n\) explicit until it cancels         |
| Mixing \(C_p\) and \(C_v\) definitions | Notation overload                           | Write \(\gamma=C_p/C_v\) at the start of every derivation |
| Assuming the same \(\gamma\) for mixture and pure gas | Real propulsion gases are reacting mixtures | Recompute effective \(\gamma\) from mixture heat capacities |
| Integrating without limits        | Losing the constant                         | Always state “evaluated between state 1 and state 2” |

## 7. The textbook-precise statement
For a thermally perfect ideal gas undergoing a reversible adiabatic process, the thermodynamic state variables satisfy
$$PV^\gamma=\text{constant},\qquad TV^{\gamma-1}=\text{constant},$$
where \(\gamma=C_p/C_v>1\) is constant. These relations follow from the first law together with \(dU=nC_v\,dT\) and the equation of state \(PV=nRT\), under the auxiliary condition \(dQ=0\). (See Callen, *Thermodynamics and an Introduction to Thermostatistics*, 2nd ed., §4-3.)

## 8. Visual — diagram or schematic
```text
P
↑
|          * (P1,V1)
|         /
|        /   adiabat  γ>1
|       /
|      /
|     /
|    /
|   /
|  /
| /___________________________> V
     steeper than isotherm (γ=1)
```
The curve is labelled “adiabat”; a second, shallower curve through the same point is labelled “isotherm” for comparison. Axes are \(P\) vertical, \(V\) horizontal; no numerical scale is required.

## 9. The memory technique
1. **The hook** — Picture a perfectly insulated cylinder whose piston is slammed inward; the gas “fights back” harder than an isothermal twin because its temperature rises, producing the steeper \(P\propto V^{-\gamma}\) curve.
2. **What to overlearn** — \(\gamma=C_p/C_v\), the pair of invariants \(PV^\gamma=\) const and \(TV^{\gamma-1}=\) const, and the differential starting point \(C_v\,dT=-P\,dV\).
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive from \(dU=-PdV\) plus \(PV=nRT\) in under two minutes; the algebra is only five lines once the definitions are written down.

## 10. What this unlocks
Mastery of the adiabatic invariants is the gateway to isentropic flow tables, nozzle design, and the entire subject of compressible aerodynamics.

- Isentropic relations for Mach number, stagnation temperature and pressure
- Rankine–Hugoniot jump conditions across shock waves
- Simple-wave solutions of the unsteady one-dimensional Euler equations
- Convective stability criteria in stellar atmospheres and planetary interiors

## 11. Self-check — five questions, no answers
1. One mole of argon expands adiabatically from 5 bar, 400 K to 1 bar. Compute the final temperature and the work done by the gas.  
2. Show that the slope of an adiabat on the \(P\)–\(V\) diagram is \(\gamma\) times the slope of the isotherm through the same point.  
3. A diatomic gas has \(\gamma=1.4\) at 300 K but \(\gamma=1.3\) at 2000 K. Which value gives the larger temperature drop for a given volume expansion, and why?  
4. In a rocket nozzle calculation the chamber pressure is doubled while \(\gamma\) and chamber temperature are held fixed. By what factor does the throat temperature change?  
5. Identify the hidden assumption that would make the relation \(PV^{1.4}=\) const invalid even though the process remains adiabatic.