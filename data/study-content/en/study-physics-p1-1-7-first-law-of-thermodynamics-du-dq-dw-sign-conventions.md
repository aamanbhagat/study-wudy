## 1. The one-sentence answer
**The first law of thermodynamics states that the change in internal energy of a system equals the heat added to it minus the work done by it: \(dU = \delta Q - \delta W\).**

Internal energy \(U\) is the total microscopic energy stored in the molecular motion and interactions inside the system. Heat \(\delta Q\) is energy transferred across the boundary because of a temperature difference. Work \(\delta W\) is energy transferred when the system pushes outward on its surroundings, for example by expanding a piston. Subtracting work from heat therefore accounts for the fact that any energy leaving as organized mechanical effort cannot remain inside as random thermal motion.

The differential form uses \(\delta\) rather than \(d\) for \(Q\) and \(W\) because heat and work are path-dependent; only their difference is guaranteed to be an exact differential of a state function \(U\). This single equation therefore enforces conservation of energy while distinguishing between two physically distinct ways energy can cross a system boundary.

> [!NOTE]
> The sign convention here (positive \(\delta W\) means work done *by* the system) is the one used in most physics and rocket-science texts; chemistry texts often flip the sign of work. The physics convention makes the rocket-nozzle expansion term appear naturally as a positive subtraction from the energy budget.

## 2. Why this matters — concrete and current
In liquid-propellant rocket engines the first law is integrated along a streamline through the combustion chamber and nozzle to predict chamber temperature and exhaust velocity; SpaceX’s Raptor engine performance models rely on this balance to within 0.5 % of measured specific impulse.

Semiconductor foundries use rapid thermal annealing cycles whose energy budgets are governed by the same equation; a 1 % error in work-term accounting can shift wafer yield by several percent because lattice defects are exquisitely sensitive to peak temperature.

High-pressure hydrogen storage tanks in fuel-cell vehicles undergo rapid discharge; the first-law sign convention determines whether the tank cools or warms, directly affecting safety margins published in SAE J2579 test protocols.

Supernova remnant simulations at Lawrence Livermore National Laboratory track \(dU = \delta Q - \delta W\) across shock fronts to set the partition between thermal energy and kinetic energy of the expanding shell, matching Chandra X-ray observations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| State function           | Only \(U\) is path-independent; \(Q\) and \(W\) are not   |
| Infinitesimal work       | \(\delta W = P\,dV\) for quasi-static expansion must be recognized |
| Heat capacity            | Links \(\delta Q\) to temperature change at constant volume or pressure |
| Exact vs inexact differential | Distinguishes \(dU\) from \(\delta Q\) and \(\delta W\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy is conserved, but can leave in two distinct forms
Energy cannot be created or destroyed inside an isolated region. It can, however, enter or leave either as disorganized microscopic motion (heat) or as organized macroscopic force acting through distance (work).  
Example: a sealed, insulated cylinder with a movable piston contains gas. If the piston is locked, any added heat raises temperature. If the piston is free to move, part of that energy appears as mechanical work lifting the piston.  
Formal statement:  
\[
\Delta U = Q - W
\]  
> [!WARNING]
> Treating heat and work as interchangeable without the minus sign produces the wrong sign for expansion cooling and immediately falsifies nozzle calculations.

### Step 2 — Internal energy depends only on the current state
Two identical volumes of the same gas at the same temperature and pressure have identical \(U\) regardless of how they reached that state.  
Example: whether the gas was compressed slowly or heated then cooled, final \(U\) is fixed by the final \(T\) and \(V\).  
Formal statement:  
\[
U = U(T,V)
\]  
> [!WARNING]
> Assuming \(U\) changes with path leads to path-dependent “internal energy,” violating the definition of a state variable.

### Step 3 — Heat and work are path-dependent transfers
The same initial and final states can be reached by different sequences of heating and expansion, each sequence giving different numerical values of \(Q\) and \(W\).  
Example: isothermal versus adiabatic expansion between the same pressure limits.  
Formal statement:  
\[
\delta Q \neq d(\text{something}), \quad \delta W \neq d(\text{something})
\]  
> [!WARNING]
> Integrating \(\delta Q\) or \(\delta W\) without specifying the path yields an ambiguous number.

### Step 4 — The difference \(\delta Q - \delta W\) is path-independent
Because \(U\) is fixed by the end states, any two paths connecting them must give the same \(\Delta U\). Therefore the combination \(\delta Q - \delta W\) must be independent of path.  
Formal statement:  
\[
dU = \delta Q - \delta W
\]  
> [!WARNING]
> Reversing the sign of work here produces the chemistry convention; mixing conventions mid-calculation is the most common source of sign errors in propulsion papers.

### Step 5 — Infinitesimal quasi-static work for a simple compressible system
When the only work mode is pressure-volume work and the process is slow enough that pressure is uniform,  
\[
\delta W = P\,dV.
\]  
Example: slow expansion of an ideal gas in a piston.  
Formal statement:  
\[
dU = \delta Q - P\,dV
\]  
> [!WARNING]
> Using \(\delta W = P\,dV\) for irreversible free expansion gives \(W=0\) correctly only if the external pressure is zero; otherwise the formula must be replaced by \(\delta W = P_{\text{ext}}\,dV\).

### Step 6 — The law in differential form for any process
Restoring full generality, the first law in differential form with the physics sign convention is  
\[
dU = \delta Q - \delta W.
\]  
This is the textbook statement reached after the preceding steps.

## 5. Worked examples — every step shown

**Example 1 — Isochoric heating of monatomic gas**  
*Given:* 1 mol of helium in a rigid container receives 300 J of heat.  
*Find:* \(\Delta U\).  
Step 1: \(dV=0\) so \(\delta W=0\).  
*Why:* Work term vanishes when volume is fixed.  
Step 2: \(dU = \delta Q - 0 = 300\) J.  
*Why:* Direct substitution of the first law.  
**300 J**  

*Reflection:* The example isolates the heat term; the rigid-container constraint removes any ambiguity about the work sign.

**Example 2 — Isothermal expansion of ideal gas**  
*Given:* 1 mol of ideal gas expands isothermally from 1 L to 2 L at 300 K.  
*Find:* \(Q\) and \(W\).  
Step 1: \(\Delta U=0\) for ideal gas at constant \(T\).  
*Why:* \(U\) depends only on \(T\).  
Step 2: \(0 = Q - W\) therefore \(Q=W\).  
*Why:* First law with \(\Delta U=0\).  
Step 3: \(W = \int_{V_1}^{V_2} \frac{RT}{V}\,dV = RT\ln 2 \approx 1.73\) kJ.  
*Why:* Quasi-static work integral for ideal gas.  
**\(Q = W = RT\ln 2\)**  

*Reflection:* The isothermal ideal-gas case forces \(Q\) and \(W\) to be numerically equal, exposing the sign convention immediately.

**Example 3 — Adiabatic expansion against constant external pressure**  
*Given:* 0.5 mol of argon expands adiabatically from 2 bar to 1 bar against constant \(P_{\text{ext}}=1\) bar; initial volume 5 L.  
*Find:* Final temperature.  
Step 1: \(\delta Q=0\) so \(dU = -\delta W = -P_{\text{ext}}dV\).  
*Why:* Adiabatic definition.  
Step 2: \(\Delta U = nC_V\Delta T = -P_{\text{ext}}(V_f-V_i)\).  
*Why:* Ideal-gas internal-energy change.  
Step 3: Solve for \(V_f\) using ideal-gas law at final pressure, yielding \(\Delta T \approx -36\) K.  
**\(T_f \approx 264\) K**  

*Reflection:* Irreversible work uses external pressure; the sign still subtracts work done by the gas.

**Example 4 — Rocket chamber energy balance**  
*Given:* Propellant enters a combustion chamber at enthalpy \(h_i\), heat release \(q\) per unit mass, nozzle exit velocity \(u_e\).  
*Find:* Expression for \(u_e\).  
Step 1: Steady-flow first law per unit mass: \(h_i + q = h_e + u_e^2/2\).  
*Why:* Neglects shaft work and potential energy.  
Step 2: \(u_e = \sqrt{2(h_i+q-h_e)}\).  
*Why:* Algebraic rearrangement.  
**\(u_e = \sqrt{2q_{\text{eff}}}\) (idealized)**  

*Reflection:* The same \(dU=\delta Q-\delta W\) integrated across a control volume yields rocket exhaust velocity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(dU = \delta Q + \delta W\) | Chemistry convention imported unconsciously | Write the sign explicitly on every line      |
| Treating \(\delta W = P\,dV\) for free expansion | Forgetting external pressure is zero        | Check whether \(P_{\text{ext}}=0\)           |
| Adding \(Q\) and \(W\) as state functions | Both appear in energy-balance equations     | Re-derive \(\Delta U\) from two different paths |
| Ignoring kinetic energy of bulk flow in rockets | Control-volume formulation omitted          | Use steady-flow energy equation              |
| Sign error when system does negative work (compression) | Intuitive “work added” language             | Always ask “is the system doing work or having work done on it?” |
| Confusing \(C_V\) and \(C_P\) when computing \(\Delta U\) | \(\Delta U = nC_V\Delta T\) only for ideal gas | Verify ideal-gas assumption first            |
| Forgetting that \(dU\) is exact     | Path dependence of \(Q,W\) not contrasted   | Compute \(\oint dU\) on any closed cycle (=0) |

## 7. The textbook-precise statement
For a simple compressible system whose only work mode is \(P\,dV\) work, the first law in differential form reads  
\[
dU = \delta Q - P\,dV
\]  
where \(U = U(S,V)\) is the internal energy, a natural function of entropy and volume, and the equality holds for both reversible and irreversible processes provided \(\delta Q\) and \(\delta W\) are interpreted as actual transfers across the boundary. (See Feynman, Leighton & Sands, *The Feynman Lectures on Physics*, Vol. I, §44-1.)

## 8. Visual — diagram or schematic
```text
System boundary
+-------------------+
|  U (internal)     |  δQ → (heat in)
|                   |  δW ← (work out = P dV)
|   gas             |
+-------------------+
        ↑
     P dV (expansion)
```
The diagram shows energy entering as heat and leaving as expansion work; the net change inside the boundary is \(dU\).

## 9. The memory technique
1. **The hook** — Picture a bank account: deposits are heat, withdrawals are work the system performs; the balance change is \(dU\).
2. **What to overlearn** — \(dU = \delta Q - \delta W\), \(\Delta U = n C_V \Delta T\) (ideal gas), \(\delta W = P\,dV\) (quasi-static).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from conservation: energy in minus energy out equals change in stored energy; identify the two distinct “out” channels.

## 10. What this unlocks
Mastery of the first-law sign convention is the prerequisite for every subsequent thermodynamic relation in propulsion and heat-transfer analysis.  
- Enthalpy definition \(H = U + PV\) and the steady-flow energy equation  
- Second-law entropy balance \(dS \ge \delta Q/T\)  
- Isentropic flow relations used in de Laval nozzle design  
- Control-volume formulations for turbomachinery and ramjets  

## 11. Self-check — five questions, no answers
1. A gas expands freely into vacuum inside an insulated rigid container. What is \(\Delta U\)?  
2. Why must \(\oint dU = 0\) for any closed cycle while \(\oint \delta Q\) need not be zero?  
3. An ideal gas is compressed adiabatically by a piston. Does its temperature rise or fall, and why, using only the sign convention?  
4. In a rocket combustion chamber the propellant is injected at high speed. Which term in the first-law balance accounts for that inlet kinetic energy?  
5. Two paths connect the same pair of states: path A does 200 J of work while path B does 150 J. Which path requires more heat addition, and by how much?