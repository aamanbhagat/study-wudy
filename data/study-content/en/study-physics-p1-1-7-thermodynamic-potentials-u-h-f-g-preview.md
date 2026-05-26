## 1. The one-sentence answer
**Thermodynamic potentials are four equivalent energy functions—internal energy \(U\), enthalpy \(H\), Helmholtz free energy \(F\), and Gibbs free energy \(G\)—obtained from one another by Legendre transforms so that each has a different pair of natural variables.**  

These functions contain identical information about a system yet become simplest to use under different constraints. Internal energy \(U(S,V)\) is natural when entropy and volume are fixed. Enthalpy \(H(S,P)\) replaces volume with pressure. Helmholtz free energy \(F(T,V)\) replaces entropy with temperature. Gibbs free energy \(G(T,P)\) replaces both.  

The transforms are not arbitrary redefinitions; each subtracts a product of conjugate variables so the differential of the new potential automatically incorporates the new independent variables.  

> [!NOTE]
> The decisive insight is that the choice of potential is dictated by the laboratory conditions you can actually control: fixed pressure favors \(H\) or \(G\), fixed volume favors \(U\) or \(F\).

## 2. Why this matters — concrete and current
In liquid-propellant rocket engine design, chamber pressure is the controlled variable while heat addition occurs at roughly constant pressure; enthalpy \(H\) therefore appears directly in the energy balance that determines exhaust velocity, as used in NASA’s CEA code and SpaceX’s Raptor engine cycle analyses.  

Semiconductor manufacturers grow epitaxial layers in reactors held at fixed temperature and pressure; the Gibbs free energy \(G\) governs phase stability and chemical potential equality at the solid–vapor interface, enabling predictive modeling in tools such as Thermo-Calc that guide Intel and TSMC process development.  

Cryogenic hydrogen storage tanks on the James Webb Space Telescope operate at fixed volume and low temperature; Helmholtz free energy \(F\) supplies the equilibrium condition for boil-off rates and material stress calculations performed by NASA Goddard engineers.  

In machine-learning-assisted materials discovery, high-throughput DFT calculations routinely output all four potentials so that convex-hull constructions for alloy stability can switch between \(G\) (ambient conditions) and \(F\) (constant-volume battery electrodes), as implemented in the Materials Project database.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First law \(dU = \delta Q - \delta W\) | Supplies the starting differential that all transforms preserve |
| State variables \(S,V,T,P\) and their conjugate pairs | Identify which variables become independent after each transform |
| Total differential and partial derivatives | Allow extraction of Maxwell relations and equilibrium conditions from each potential |
| Legendre transform (elementary) | Mathematical operation that systematically changes independent variables |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the internal energy
Internal energy \(U\) is the total energy stored in a system when entropy \(S\) and volume \(V\) are the independent variables. For a reversible process the first law plus the definition of entropy gives the fundamental relation  
\[
dU = T\,dS - P\,dV.
\]  
A concrete example is an insulated, rigid container: both \(S\) and \(V\) are fixed, so \(dU = 0\) and the system is in equilibrium.  

> [!WARNING]
> Treating \(T\) and \(P\) as independent variables here leads to sign errors later because they are dependent, not free.

### Step 2 — Perform the first Legendre transform to obtain enthalpy
To make pressure the independent variable instead of volume, subtract the product \(PV\):  
\[
H \equiv U + PV.
\]  
Its differential is  
\[
dH = T\,dS + V\,dP.
\]  
A piston–cylinder device held at constant pressure illustrates the utility: heat added at constant \(P\) equals \(\Delta H\).

> [!WARNING]
> Forgetting the sign change when differentiating \(PV\) produces an incorrect \(+P\,dV\) term that ruins later Maxwell relations.

### Step 3 — Perform the second transform to obtain Helmholtz free energy
Replace entropy with temperature by subtracting \(TS\):  
\[
F \equiv U - TS.
\]  
The differential becomes  
\[
dF = -S\,dT - P\,dV.
\]  
A rigid, isothermal container now has \(dF = -P\,dV\), so the work done by the system at constant \(T\) is \(-\Delta F\).

> [!WARNING]
> Using \(F\) when pressure rather than volume is fixed leads to unnecessary extra variables in the equilibrium condition.

### Step 4 — Perform the final transform to obtain Gibbs free energy
Apply both transforms at once:  
\[
G \equiv H - TS = U - TS + PV.
\]  
The differential is  
\[
dG = -S\,dT + V\,dP.
\]  
At constant \(T\) and \(P\), \(dG = 0\) at equilibrium, which is why phase diagrams are plotted in the \(T\)–\(P\) plane.

> [!WARNING]
> Omitting the \(+PV\) term when converting from \(F\) produces an inconsistent set of natural variables.

### Step 5 — Recover all thermodynamic information from any potential
Because each potential is a Legendre transform of the others, the original \(U\) can be reconstructed and all equations of state recovered. The four differentials together generate the complete set of Maxwell relations by equality of mixed partials.

## 5. Worked examples — every step shown

**Example 1 — Internal energy differential**  
*Given:* A reversible process in a hydrostatic system.  
*Find:* \(dU\).  
Start from the first law:  
\[
dU = \delta Q - \delta W.
\]  
*Why:* definition of energy balance.  
For a reversible process, \(\delta Q = T\,dS\) and \(\delta W = P\,dV\):  
\[
dU = T\,dS - P\,dV.
\]  
*Why:* substitution of reversible expressions.  
**\(dU = T\,dS - P\,dV\)**  

*Reflection:* The signs are fixed by the conventions that work done by the system decreases \(U\) and heat added increases \(U\).

**Example 2 — Enthalpy from internal energy**  
*Given:* \(U(S,V)\) and the definition \(H = U + PV\).  
*Find:* \(dH\).  
Differentiate the definition:  
\[
dH = dU + P\,dV + V\,dP.
\]  
*Why:* product rule on \(PV\).  
Substitute \(dU = T\,dS - P\,dV\):  
\[
dH = T\,dS - P\,dV + P\,dV + V\,dP = T\,dS + V\,dP.
\]  
*Why:* the \(-P\,dV + P\,dV\) terms cancel.  
**\(dH = T\,dS + V\,dP\)**  

*Reflection:* The cancellation shows why enthalpy is the natural function at constant pressure.

**Example 3 — Helmholtz free energy equilibrium condition**  
*Given:* An isothermal, isochoric process.  
*Find:* The equilibrium criterion.  
From \(dF = -S\,dT - P\,dV\), set \(dT = 0\), \(dV = 0\):  
\[
dF = 0.
\]  
*Why:* both independent variables are held fixed.  
Thus the equilibrium state minimizes \(F\).  
**Equilibrium at minimum \(F(T,V)\)**  

*Reflection:* The result follows directly once the natural variables are recognized.

**Example 4 — Gibbs free energy and chemical potential**  
*Given:* A single-component system at fixed \(T\) and \(P\).  
*Find:* Relation of \(G\) to chemical potential \(\mu\).  
By Euler integration of the extensive variables,  
\[
G = \mu N.
\]  
*Why:* \(G\) is homogeneous of degree one.  
Hence  
\[
\mu = \left(\frac{\partial G}{\partial N}\right)_{T,P}.
\]  
*Why:* definition of partial molar quantity.  
**\(\mu = G_m\) (molar Gibbs energy)**  

*Reflection:* This identity is why phase equilibrium is expressed as equality of \(G\) per mole.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing the sign of the \(PV\) term when forming \(H\) | Students remember “add \(PV\)” but forget the differential consequence | Always recompute the differential immediately after writing the definition |
| Using \(F\) for a constant-pressure process | Habit of defaulting to the most familiar potential | Check which variables are actually held fixed by the apparatus |
| Treating \(T\) and \(P\) as independent in \(U(S,V)\) | Failure to track which variables were transformed | List the natural variables beside each potential before any calculation |
| Forgetting that \(G\) is minimized only at constant \(T\) and \(P\) | Over-generalizing the equilibrium condition | Write the differential \(dG\) first, then set the coefficients of \(dT\) and \(dP\) to zero |
| Mixing extensive and intensive variables in Maxwell relations | Partial derivatives taken with respect to the wrong variable | Explicitly state which variables are held constant in every partial |
| Assuming all potentials have the same numerical value | Neglect of the subtracted terms \(TS\) and \(PV\) | Evaluate the correction terms separately for any numerical comparison |

## 7. The textbook-precise statement
A thermodynamic potential is a Legendre transform of the internal energy \(U(S,V,N)\) whose differential takes the form  
\[
d\Phi = \sum_i x_i\,dy_i,
\]  
where the \(y_i\) are the chosen independent variables. The four common potentials and their differentials are  
\[
\begin{align*}
dU &= T\,dS - P\,dV + \mu\,dN, \\
dH &= T\,dS + V\,dP + \mu\,dN, \\
dF &= -S\,dT - P\,dV + \mu\,dN, \\
dG &= -S\,dT + V\,dP + \mu\,dN.
\end{align*}
\]  
Equilibrium at fixed values of the natural variables of a potential \(\Phi\) is the state that extremizes \(\Phi\). (Callen, *Thermodynamics and an Introduction to Thermostatistics*, 2nd ed., §5-3.)

## 8. Visual — diagram or schematic
```text
U(S,V)  --(+PV)-->  H(S,P)
   |                    |
(-TS)                  (-TS)
   |                    |
   v                    v
F(T,V)  --(+PV)-->  G(T,P)

Natural variables:
U: S,V     H: S,P
F: T,V     G: T,P
```
Each arrow is a Legendre transform that replaces one extensive variable with its conjugate intensive variable.

## 9. The memory technique
1. **The hook** — Picture a four-room laboratory: Room U is perfectly insulated and rigid; Room H has a movable piston but perfect thermal insulation; Room F is inside a giant thermostat with rigid walls; Room G is an open laboratory bench at room temperature and atmospheric pressure.  
2. **What to overlearn** — The four differentials and the rule “minimum principle applies when all natural variables are held fixed.”  
3. **Spaced-repetition schedule** — Review the four differentials at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive any potential by writing the definition, taking the total differential, and substituting the known \(dU\).

## 10. What this unlocks
Mastery of the four potentials supplies the language for every subsequent thermodynamic relation, including Maxwell relations, stability criteria, and the chemical-potential equality that governs phase and reaction equilibria.  

- Construction of Maxwell relations from each potential  
- Derivation of the Gibbs–Duhem equation  
- Phase-equilibrium conditions in binary and multicomponent systems  
- Thermodynamic integration methods used in molecular dynamics

## 11. Self-check — five questions, no answers
1. Starting from \(dU = T\,dS - P\,dV\), obtain the differential of \(F\) by performing the appropriate Legendre transform and state its natural variables.  
2. For a process at constant pressure, show that the heat transferred equals the change in which potential.  
3. Write the equilibrium criterion for a system whose temperature and volume are controlled; name the potential.  
4. A student claims \(dG = T\,dS + V\,dP\); identify the error and give the correct expression.  
5. In a constant-volume, constant-temperature battery electrode, which potential’s minimization determines the open-circuit voltage, and why?