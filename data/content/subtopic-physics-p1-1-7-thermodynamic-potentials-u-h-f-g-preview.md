## What it is
Thermodynamic potentials are state functions that measure the energy available in a thermodynamic system to do work under specific constraints (like constant temperature or pressure). The four main potentials—Internal Energy ($U$), Enthalpy ($H$), Helmholtz Free Energy ($F$), and Gibbs Free Energy ($G$)—each describe the system's energy content from a different perspective, making one of them uniquely useful depending on the experimental conditions.

## Why it matters
In rocket science, the enthalpy of reaction ($\Delta H$) tells you the total heat released by propellant combustion, a key performance metric. In materials science and chemistry, the Gibbs free energy ($\Delta G$) predicts whether a chemical reaction or phase change (like water freezing) will occur spontaneously under standard lab conditions (constant temperature and pressure). These potentials are the core machinery for predicting the equilibrium state and direction of any thermodynamic process.

## When to study it
You must be comfortable with the following prerequisites. If not, master them first.
1.  **First Law of Thermodynamics**: The concept of internal energy ($U$) and the relation $dU = \delta Q - \delta W$.
2.  **Second Law of Thermodynamics**: The definition of entropy ($S$) and the Clausius inequality, $dS \geq \frac{\delta Q}{T}$.
3.  **Fundamental Thermodynamic Relation**: The combination of the first and second laws for a reversible process: $dU = TdS - PdV$.
4.  **Multivariable Calculus**: Specifically, total and partial derivatives, and the concept of an exact differential.

## How to study it (step by step)
1.  **Anchor on Internal Energy ($U$)**: Start with the fundamental relation $dU = TdS - PdV$. Recognize that the "natural variables" of $U$ are entropy ($S$) and volume ($V$), meaning $U = U(S,V)$. This is the potential for an isolated system where $S$ and $V$ are constant.
2.  **Derive Enthalpy ($H$)**: Many processes happen at constant pressure, not constant volume. We need a potential whose natural variables are $(S,P)$. To switch the variable $V$ for its conjugate $P$, we use a Legendre Transformation: define $H \equiv U + PV$. Differentiate it: $dH = dU + d(PV) = (TdS - PdV) + (PdV + VdP) = TdS + VdP$. The natural variables are now $(S,P)$.
3.  **Derive Helmholtz Free Energy ($F$)**: Many processes happen at constant temperature, not constant entropy. To switch the variable $S$ for its conjugate $T$, define $F \equiv U - TS$. Differentiate it: $dF = dU - d(TS) = (TdS - PdV) - (TdS + SdT) = -SdT - PdV$. The natural variables are now $(T,V)$.
4.  **Derive Gibbs Free Energy ($G$)**: Most lab and real-world processes happen at constant temperature *and* pressure. We need a potential with natural variables $(T,P)$. Start with Enthalpy $H$ and switch $S$ for $T$: define $G \equiv H - TS$. Differentiate it: $dG = dH - d(TS) = (TdS + VdP) - (TdS + SdT) = VdP - SdT$. The natural variables are $(T,P)$.
5.  **Connect to Spontaneity**: For an isolated system ($U, V$ constant), the Second Law says $dS \ge 0$. For a system at constant $T, V$, spontaneous processes have $dF \le 0$. For a system at constant $T, P$, spontaneous processes have $dG \le 0$. Notice how the potentials become the key quantity to track when constraints are applied.

## Key ideas, with intuition
1.  **Potentials are Energy "Available" for Work**: Think of $U$ as the total energy. The other potentials subtract off the energy that is "unavailably" tied up in maintaining the system's conditions.
    *   **Helmholtz Free Energy ($F = U - TS$)**: $U$ is the total energy. $TS$ is the energy required to maintain the system's thermal disorder (entropy) at temperature $T$. What's left, $F$, is the energy "free" to be converted into work in an isothermal process.
    *   **Gibbs Free Energy ($G = U + PV - TS$)**: This is the most useful potential. It subtracts both the thermal energy ($TS$) and the energy required to maintain the system's volume against an external pressure ($PV$). What's left, $G$, is the maximum non-$PV$ work obtainable from a system at constant temperature and pressure.

2.  **Natural Variables Dictate Usefulness**: A potential is most useful when expressed in terms of its "natural variables" because its differential takes a simple form without messy terms.
    $$ dU(S,V) = TdS - PdV $$
    $$ dH(S,P) = TdS + VdP $$
    $$ dF(T,V) = -SdT - PdV $$
    $$ dG(T,P) = -SdT + VdP $$
    If your system is held at constant temperature and pressure, you use $G$ because $dT=0$ and $dP=0$, so $dG=0$ at equilibrium.

3.  **Legendre Transform is a Systematic Variable Swap**: The process of defining $H, F, G$ is not arbitrary. The Legendre Transform is a mathematical machine for changing the independent variables of a function. To swap a variable $x$ for its conjugate variable $p = \frac{\partial f}{\partial x}$, you create a new function $g = f - px$. We did this repeatedly:
    *   To swap $V$ for $P = -(\frac{\partial U}{\partial V})_S$, we defined $H = U - (-P)V = U+PV$.
    *   To swap $S$ for $T = (\frac{\partial U}{\partial S})_V$, we defined $F = U - TS$.

## Worked example
**Problem**: Calculate the change in Gibbs free energy ($\Delta G$) when 1 mole of ice melts into water at a temperature of $1^\circ\text{C}$ ($274.15 \text{ K}$) and standard pressure. Is the process spontaneous?
Given:
-   Molar enthalpy of fusion for water, $\Delta H_{fus} = 6010 \text{ J/mol}$.
-   Molar entropy of fusion for water, $\Delta S_{fus} = 22.0 \text{ J/(mol}\cdot\text{K)}$.
-   Assume $\Delta H$ and $\Delta S$ are constant with temperature near the melting point.

**Solution**:
1.  **Identify the correct potential**: The process occurs at constant temperature ($T=274.15 \text{ K}$) and constant pressure (standard pressure). The correct potential to determine spontaneity under these conditions is the Gibbs Free Energy, $G$. A process is spontaneous if $\Delta G < 0$.

2.  **State the relevant formula**: For a process at constant temperature, the change in Gibbs free energy is given by its definition:
    $$ \Delta G = \Delta H - T\Delta S $$

3.  **Substitute the values**:
    *   $\Delta H = 6010 \text{ J/mol}$
    *   $\Delta S = 22.0 \text{ J/(mol}\cdot\text{K)}$
    *   $T = 274.15 \text{ K}$

    $$ \Delta G = (6010 \text{ J/mol}) - (274.15 \text{ K}) \times (22.0 \text{ J/(mol}\cdot\text{K)}) $$

4.  **Calculate the result**:
    $$ \Delta G = 6010 - 6031.3 \text{ J/mol} $$
    $$ \Delta G = -21.3 \text{ J/mol} $$

5.  **Interpret the result**: Since $\Delta G < 0$, the process of ice melting at $1^\circ\text{C}$ is spontaneous.

**Reflection**: This example shows the predictive power of $G$. The enthalpy change ($\Delta H > 0$) suggests the process is unfavorable as it requires energy input. However, the entropy change ($\Delta S > 0$) is favorable as the liquid state is more disordered. The Gibbs free energy correctly balances these two competing factors at the given temperature to provide the definitive answer on spontaneity.

## Diagrams
The Thermodynamic Square (or Born Square) is a powerful mnemonic device for recalling the potentials and their relationships.

```text
          V (Volume)
          ^
          |
    F ----G---- H      <-- Potentials (F, G, H, U)
    |     |     |
    |     S     |      <-- S (Entropy) in the middle
    |     |     |
    U ----T---- P      <-- Variables (V, T, P, S)
          |
          v
          T (Temperature)

Mnemonic for layout: "Valid Facts and Theoretical Underpinnings Generate Solutions to Hard Problems"
Clockwise from top left: V, F, T, U, S(center), P, H, G
```
This diagram encodes the definitions of the potentials, their differentials, and the Maxwell relations. For example, $G$ is flanked by its natural variables $T$ and $P$.

## Memory technique — remember this forever
1.  **Mnemonic**: The Thermodynamic Square. Get a pen and paper and practice drawing it from memory using the mnemonic **"Good Physicists Have Studied Under Very Fine Teachers"**. Go clockwise around the square for the potentials: G, P, H, S, U, V, F, T. The variables ($P, S, V, T$) are on the sides and corners.
2.  **Overlearn these formulas**:
    $$ dU = TdS - PdV $$
    $$ H = U + PV $$
    $$ F = U - TS $$
    $$ G = H - TS $$
3.  **Spaced Repetition**: Review the Thermodynamic Square and the definitions of H, F, G at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days**. Actively re-derive their differential forms each time.
4.  **First Principles Pathway**: If you forget everything, rebuild it from the combined law: $dU = TdS - PdV$.
    *   Need to control for pressure instead of volume? The term is $-PdV$. Add the product of these conjugate variables, $+PV$, to $U$. This creates Enthalpy: $H=U+PV$.
    *   Need to control for temperature instead of entropy? The term is $TdS$. Subtract the product, $-TS$, from $U$. This creates Helmholtz energy: $F=U-TS$.
    *   Need both? Do both. $G = U + PV - TS$.

## Common mistakes
1.  **Wrong potential for the job**: Using $\Delta G$ to analyze a process in a sealed, insulated container (an isolated system). For an isolated system, the Second Law dictates $\Delta S \ge 0$ is the criterion for spontaneity. Use the potential that matches the constraints.
2.  **Sign errors**: Writing $F = U+TS$ or $H = U-PV$. The signs in the Legendre transform are critical. Remember: you *subtract* the product of conjugate variables to get the "free" energies (F, G).
3.  **Mixing differentials and finite changes**: The equation $\Delta G = \Delta H - T\Delta S$ is only valid for an isothermal (constant $T$) process. For a process where temperature changes, you must integrate: $\Delta G = \Delta H - \int (TdS + SdT)$.
4.  **Ignoring units**: Always use Kelvin for temperature in these equations. Using Celsius will lead to completely wrong results.

## Self-check
1.  What are the natural variables for Enthalpy ($H$)? Derive its full differential form, $dH$, from first principles, starting with $dU = TdS - PdV$.
2.  A solid propellant in a rocket motor undergoes combustion. The process happens very quickly at extremely high pressure, and the volume of the motor casing is fixed. Which thermodynamic potential is most natural for analyzing the energy change of the propellant system itself, ignoring heat transfer to the walls for a moment? Why?
3.  The differential for Gibbs Free Energy is $dG = -SdT + VdP$. Because $G$ is a state function, its differential is exact. Use the property of exact differentials (equality of mixed partial derivatives) to derive the corresponding Maxwell Relation between $S, T, V, P$.