## 1. The one-sentence answer
**Thermodynamic potentials are the four Legendre transforms of internal energy that encode the same physics while making different pairs of variables the natural independent ones for a given experimental constraint.**

Internal energy \(U\) is defined with entropy \(S\), volume \(V\), and particle number \(N\) as its natural variables; its differential therefore contains the coefficients \(T\), \(-P\), and \(\mu\). In the laboratory we rarely control entropy; we control temperature, pressure, or both. Each new potential is obtained by subtracting the product of one extensive variable and its conjugate intensive variable, exactly as a Legendre transform removes an unwanted independent variable and replaces it with its conjugate. The resulting functions—enthalpy \(H\), Helmholtz free energy \(F\), and Gibbs free energy \(G\)—then have total differentials whose independent variables match the quantities we actually hold fixed.

The four potentials therefore stand in one-to-one correspondence with the four common experimental ensembles. Their minima locate equilibrium under those constraints, and their second derivatives supply the response functions (compressibility, heat capacity, etc.) measured in the laboratory.

> [!NOTE]
> The deepest insight is that the choice of potential is not a matter of convenience but a direct reflection of which pair of variables the surroundings, not the system, controls.

## 2. Why this matters — concrete and current
In liquid-propellant rocket nozzle design, engineers integrate the enthalpy \(H\) along isentropic streamlines to obtain exhaust velocity; SpaceX’s Raptor engine performance models therefore tabulate \(H(T,P)\) rather than \(U(S,V)\).

Semiconductor foundries use the Gibbs free energy \(G\) to predict the equilibrium concentration of point defects during high-temperature annealing; Intel’s 18 Å process node thermal budgets are sized so that the minimum of \(G\) for vacancy formation lies below the supersaturation threshold that would create killer defects.

Cryogenic hydrogen storage tanks on the James Webb Space Telescope rely on Helmholtz free energy surfaces \(F(T,V)\) to forecast boil-off rates when the tank is held at fixed temperature by the sun-shield radiator; any error in the \((\partial F/\partial T)_V = -S\) term would have mis-predicted the 5-year propellant lifetime.

Phase-field models of additive manufacturing (e.g., GE Additive’s electron-beam melting) evolve the grand potential \(\Phi = -pV\) (closely related to \(G\)) because the chamber pressure is the controlled variable; the resulting solidification morphology predictions match synchrotron X-ray images taken at the Advanced Photon Source.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First law in differential form \(dU = đQ + đW\) | Supplies the starting point for every Legendre transform  |
| Second law and entropy maximum principle | Guarantees that each potential reaches an extremum at equilibrium |
| Total differential and chain rule | Required to read off natural variables and Maxwell relations |
| Partial derivative identities (Euler, reciprocity) | Convert between potentials and extract measurable coefficients |
| Concept of conjugate variables (\(T,S\)), (\(P,V\)), (\(\mu,N\)) | Determines which product is subtracted in each transform |

## 4. Building the idea — from intuition to formalism

### Step 1 — Internal energy and its natural variables
The internal energy \(U\) is the fundamental potential when the system is isolated. Its natural variables are \(S\), \(V\), and \(N\) because those are the quantities fixed by the isolating walls.  
Example: an insulated, rigid, closed container has fixed \(S\), \(V\), \(N\).  
The total differential is
\[
dU = T\,dS - P\,dV + \mu\,dN.
\]
> [!WARNING]
> Treating \(T\) as an independent variable here leads to inconsistent signs in all subsequent relations.

### Step 2 — Motivation for a transform
Laboratory conditions rarely fix entropy; they fix temperature. A new function whose natural variable is \(T\) is obtained by subtracting the product \(TS\) from \(U\).

### Step 3 — Helmholtz free energy
Define
\[
F \equiv U - TS.
\]
Its differential is
\[
dF = -S\,dT - P\,dV + \mu\,dN.
\]
Natural variables are now \(T\), \(V\), \(N\). Equilibrium at fixed \(T,V,N\) is a minimum of \(F\).

### Step 4 — Enthalpy
When pressure rather than volume is controlled, subtract \(PV\):
\[
H \equiv U + PV,
\]
\[
dH = T\,dS + V\,dP + \mu\,dN.
\]
Natural variables: \(S\), \(P\), \(N\).

### Step 5 — Gibbs free energy
Both \(T\) and \(P\) are controlled in an open vessel at atmospheric pressure. Perform both transforms:
\[
G \equiv U + PV - TS = H - TS,
\]
\[
dG = -S\,dT + V\,dP + \mu\,dN.
\]
Natural variables: \(T\), \(P\), \(N\). Chemical equilibrium at fixed \(T,P\) is located by the minimum of \(G\).

### Step 6 — Complete set and reciprocity
The four differentials together generate all six Maxwell relations by cross differentiation. Each potential is recovered from any other by the appropriate inverse Legendre transform.

### Step 7 — Equilibrium criteria
Under the respective constraints the equilibrium state minimises the appropriate potential; the second variation is positive definite and yields stability conditions (e.g., \(C_V > 0\), \(\kappa_T > 0\)).

## 5. Worked examples — every step shown

**Example 1 — Differential of enthalpy**  
*Given:* \(U = U(S,V,N)\) with \(dU = T\,dS - P\,dV + \mu\,dN\).  
*Find:* \(dH\).  
Start with the definition
\[
H = U + PV.
\]
Differentiate:
\[
dH = dU + P\,dV + V\,dP.
\]
*Why:* product rule on \(PV\).  
Substitute \(dU\):
\[
dH = T\,dS - P\,dV + \mu\,dN + P\,dV + V\,dP.
\]
*Why:* direct replacement.  
Cancel \(-P\,dV + P\,dV\):
\[
dH = T\,dS + V\,dP + \mu\,dN.
\]
**Final answer**  
\[
dH = T\,dS + V\,dP + \mu\,dN.
\]

*Reflection:* The cancellation shows how the transform removes \(V\) from the independent set; the same pattern repeats for every potential.

**Example 2 — Maxwell relation from \(F\)**  
*Given:* \(dF = -S\,dT - P\,dV + \mu\,dN\).  
*Find:* \((\partial S/\partial V)_T\).  
Cross-differentiate the coefficients of \(dT\) and \(dV\):
\[
\frac{\partial^2 F}{\partial V\partial T} = \frac{\partial^2 F}{\partial T\partial V}.
\]
Left side yields
\[
\left(\frac{\partial(-S)}{\partial V}\right)_T = -\left(\frac{\partial S}{\partial V}\right)_T.
\]
Right side yields
\[
\left(\frac{\partial(-P)}{\partial T}\right)_V = -\left(\frac{\partial P}{\partial T}\right)_V.
\]
Equate and multiply by \(-1\):
\[
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial P}{\partial T}\right)_V.
\]
**Final answer**  
\[
\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial P}{\partial T}\right)_V.
\]

*Reflection:* The equality of mixed partials is the sole origin of all Maxwell relations; sign errors arise only from misidentifying the potential.

**Example 3 — Chemical potential from \(G\)**  
*Given:* \(G = G(T,P,N)\).  
*Find:* \(\mu\).  
From the differential
\[
dG = -S\,dT + V\,dP + \mu\,dN,
\]
the coefficient of \(dN\) at constant \(T,P\) is
\[
\mu = \left(\frac{\partial G}{\partial N}\right)_{T,P}.
\]
Because \(G\) is extensive, Euler integration gives
\[
G = \mu N.
\]
**Final answer**  
\[
\mu = G_m = \frac{G}{N}.
\]

*Reflection:* This identity is used constantly in solution thermodynamics; it fails if \(N\) is not the only extensive variable.

**Example 4 — Stability from \(F\)**  
*Given:* \(F(T,V,N)\).  
*Find:* condition for thermal stability.  
Second variation at fixed \(T,V\):
\[
\delta^2 F = \frac12\left(\frac{\partial^2 F}{\partial T^2}\right)_V(\delta T)^2 + \cdots.
\]
Because
\[
\left(\frac{\partial^2 F}{\partial T^2}\right)_V = -\left(\frac{\partial S}{\partial T}\right)_V = -C_V/T,
\]
positive definiteness requires \(C_V > 0\).  
**Final answer**  
\[
C_V > 0.
\]

*Reflection:* The sign of every second derivative of a potential translates directly into a stability inequality.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sign error in \(dU\) (writing \(+P\,dV\)) | Confusing work done on versus by the system | Always start from the mechanical definition \(đW = -P\,dV\) for expansion work |
| Using \(G\) minimum when volume is fixed | Mixing ensembles | Check the independent variables in the differential before choosing the potential |
| Treating \(\mu\) as \(\partial U/\partial N\) at fixed \(T\) | Forgetting natural variables | Differentiate only with respect to the variables that actually appear in the potential |
| Forgetting the \(+PV\) term when converting \(U\) to \(H\) | Mechanical intuition that enthalpy “includes flow work” is learned after the definition | Write the Legendre transform explicitly each time |
| Applying Maxwell relations across different potentials | Assuming all cross derivatives are equal | Label every second derivative with its parent potential |
| Neglecting the \(\mu\,dN\) term in open systems | Habit from closed-system problems | Retain \(\mu\,dN\) until explicitly told \(N\) is constant |
| Confusing \(F\) and \(G\) stability criteria | Both involve temperature derivatives | Remember \(F\) controls \(V\) while \(G\) controls \(P\); their second derivatives differ by \(\kappa_T\) versus \(\kappa_S\) |

## 7. The textbook-precise statement
A thermodynamic potential is any Legendre transform of the internal energy \(U(S,V,N)\). The complete set is
\[
U,\quad H=U+PV,\quad F=U-TS,\quad G=U+PV-TS.
\]
Each is a function of its natural variables obtained by the transform; its differential is exact, its first derivatives recover the equations of state, and its second derivatives are the thermodynamic response functions. Equilibrium under constraints that fix the natural variables of a given potential is the minimum of that potential (Callen, *Thermodynamics and an Introduction to Thermostatistics*, 2nd ed., §5-3 and §6-2).

## 8. Visual — diagram or schematic
```text
U(S,V,N) ──(Legendre, subtract TS)──▶ F(T,V,N)
   │                                   │
   │ (subtract PV)                     │ (subtract PV)
   ▼                                   ▼
H(S,P,N) ──(Legendre, subtract TS)──▶ G(T,P,N)

Arrows point in the direction of increasing number of intensive natural variables.
Each horizontal or vertical step replaces one extensive variable by its conjugate intensive variable.
```

## 9. The memory technique
1. **The hook** — Picture a four-room house whose doors open only when the correct pair of knobs (one intensive, one extensive) is turned; U lives in the basement with two extensive knobs, G lives on the roof with two intensive knobs.  
2. **What to overlearn** — The four exact differentials and the rule that every Maxwell relation is a cross derivative of one of them.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Begin with \(dU = T\,dS - P\,dV + \mu\,dN\) and subtract the appropriate conjugate product; recompute the differential each time.

## 10. What this unlocks
Mastery of the four potentials immediately supplies the Maxwell relations, the thermodynamic equation of state, and the stability criteria used in every subsequent chapter.  
- Phase equilibria and the Gibbs phase rule  
- Fluctuation–dissipation theorems in statistical mechanics  
- Thermodynamic integration methods in molecular dynamics  
- Non-equilibrium extensions via the entropy-production potential

## 11. Self-check — five questions, no answers
1. Starting from \(dU\), derive the total differential of the grand potential \(\Phi = U - TS - \mu N\) and state its natural variables.  
2. A van der Waals gas obeys \(\left(P + a/V_m^2\right)(V_m - b) = RT\). Compute \(\left(\partial U/\partial V_m\right)_T\) and decide whether \(U\) or \(F\) is the simpler route.  
3. Show that \(C_P - C_V = T V \alpha^2 / \kappa_T\) follows from second derivatives of \(G\).  
4. In an open system at fixed \(T\) and \(P\), the equilibrium condition is \(\delta G = 0\). If two phases coexist, what relation must hold between their chemical potentials?  
5. Identify the sign error that would result from writing \(dH = T\,dS - V\,dP + \mu\,dN\) and trace it to the definition of the transform.