## What it is
Thermodynamic potentials are state functions that measure the energy in a system available to do work under specific constraints (like constant temperature or pressure). The four main potentials—Internal Energy ($U$), Enthalpy ($H$), Helmholtz Free Energy ($F$), and Gibbs Free Energy ($G$)—each correspond to a different set of experimental conditions, and a system will spontaneously evolve to minimize the relevant potential.

## Why it matters
In rocket science, combustion occurs at roughly constant pressure, making Enthalpy ($H$) the critical quantity for calculating heat release and engine performance. In materials science and solid-state physics, processes often occur at constant volume, making Helmholtz Free Energy ($F$) the key predictor of material stability. Chemical reactions and phase changes (like propellant boiling) happen at constant temperature and pressure, so Gibbs Free Energy ($G$) dictates whether they occur spontaneously.

## When to study it
You must have a firm grasp of the First and Second Laws of Thermodynamics before proceeding. Specifically, you need to be fluent with the combined law in differential form ($dU = TdS - PdV$), understand the difference between state and path functions, and be comfortable with multivariable calculus, especially partial derivatives and exact differentials. If the term "Legendre Transform" is unfamiliar, you will learn its application here, but prior exposure helps.

## How to study it (step by step)
1.  **Re-derive the Foundation:** Start with the First Law ($dU = \delta Q + \delta W$) and the definition of entropy for a reversible process ($dS = \delta Q_{rev}/T$). For reversible mechanical work ($\delta W_{rev} = -PdV$), combine them to rigorously derive the fundamental equation: $dU = TdS - PdV$. Understand why this holds for irreversible processes as well (because $U, T, S, P, V$ are state functions).
2.  **Understand the Motivation:** Recognize that $U$ is a function of $S$ and $V$, i.e., $U(S,V)$. In a lab, entropy ($S$) is nearly impossible to control directly. We need potentials whose "natural variables" are controllable, like temperature ($T$) and pressure ($P$).
3.  **Learn the Tool (Legendre Transform):** The Legendre Transform is a mathematical procedure for changing the independent variables of a function. If you have a function $f(x)$ with derivative $p = df/dx$, the transform creates a new function $g(p) = f - px$. We will apply this to $U(S,V)$ to create $H, F, G$.
4.  **Derive Enthalpy ($H$):** To switch from volume ($V$) to pressure ($P$) as the independent variable, we perform a Legendre transform on the $PV$ term. Define $H = U - (-P)V = U+PV$. Differentiate this to find $dH = dU + PdV + VdP$. Substitute the fundamental equation for $dU$ to get $dH = TdS + VdP$. Note that $H$ is now a natural function of $S$ and $P$.
5.  **Derive Helmholtz ($F$):** To switch from entropy ($S$) to temperature ($T$), transform the $TS$ term. Define $F = U - TS$. Differentiate to find $dF = dU - TdS - SdT$. Substitute for $dU$ to get $dF = -SdT - PdV$. Note that $F$ is a natural function of $T$ and $V$.
6.  **Derive Gibbs ($G$):** To switch both variables, transform both terms. Define $G = U - TS - (-P)V = U - TS + PV$. Notice that $G = H - TS = F + PV$. Differentiate $G = H - TS$ to get $dG = dH - TdS - SdT$. Substitute the result for $dH$ from step 4 to get $dG = -SdT + VdP$. Note that $G$ is a natural function of $T$ and $P$, the most common experimental conditions.
7.  **Solve a Problem:** Pick a simple process, like the isothermal expansion of an ideal gas from $V_1$ to $V_2$. Calculate the change in each of the four potentials ($\Delta U, \Delta H, \Delta F, \Delta G$) for this process. This will solidify the differences between them.

## Key ideas, with intuition
1.  **The Fundamental Equation is the Source Code:** All of thermodynamics for simple systems is packed into this one equation. The potentials are just reformulations of it.
    $$dU = TdS - PdV$$
    This equation tells us that the natural variables for internal energy $U$ are entropy $S$ and volume $V$.

2.  **Potentials are for Different Jobs (Constraints):** You don't use a hammer to turn a screw. You don't use internal energy to analyze a process at constant pressure.
    *   **$U(S,V)$:** Total energy. Minimized for isolated systems (constant $S, V$).
    *   **$H(S,P)$:** "Heat content." Minimized for systems at constant $S, P$. Useful for constant pressure processes like combustion.
    *   **$F(T,V)$:** Helmholtz "free energy." The maximum work you can extract from a system at constant $T,V$. Minimized at equilibrium for systems at constant $T,V$.
    *   **$G(T,P)$:** Gibbs "free energy." The maximum *non-expansion* work you can extract. Minimized at equilibrium for systems at constant $T,P$ (most chemistry/biology/materials science).

3.  **"Free Energy" is Energy *Available* for Useful Work:** The term $TS$ in $F=U-TS$ and $G=H-TS$ can be thought of as the "useless" energy, locked up in random thermal motion that cannot be converted into ordered work at a given temperature $T$. Subtracting this "heat tax" ($TS$) from the total energy ($U$ or $H$) leaves the energy that is *free* to perform useful work.

4.  **The Math is a Change of Perspective:** The Legendre Transform is just a way to look at the same physical system from a different control panel. Instead of controlling knobs for Entropy and Volume, we want knobs for Temperature and Pressure. The math builds a new function ($G$) that is simplest when described by the variables on our new control panel ($T, P$).

## Worked example
**Problem:** A 1 kg block of ice at $T = 273.15 \text{ K}$ and $P = 1 \text{ atm}$ melts into 1 kg of liquid water at the same temperature and pressure. Calculate the change in Gibbs free energy, $\Delta G$. The latent heat of fusion for water is $L_f = 334 \text{ kJ/kg}$.

**Solution:**
1.  **Identify the potential:** The process occurs at constant temperature and constant pressure. The correct potential to analyze for spontaneity and equilibrium is the Gibbs Free Energy, $G$.
2.  **Write the relevant formula:** We need the change in Gibbs energy, $\Delta G$. The definition is $G = H - TS$. For a process at constant temperature $T$, the change is:
    $$\Delta G = \Delta H - T \Delta S$$
3.  **Calculate $\Delta H$:** Enthalpy change ($\Delta H$) at constant pressure is simply the heat added to the system. Here, that is the latent heat of fusion.
    $$\Delta H = m L_f = (1 \text{ kg})(334 \text{ kJ/kg}) = 334 \text{ kJ}$$
4.  **Calculate $\Delta S$:** For a reversible process at constant temperature (like a phase change at the transition point), the change in entropy is the heat added divided by the temperature.
    $$\Delta S = \frac{Q_{rev}}{T} = \frac{\Delta H}{T}$$
    $$\Delta S = \frac{334 \text{ kJ}}{273.15 \text{ K}} \approx 1.223 \text{ kJ/K}$$
5.  **Calculate $\Delta G$:** Substitute the values for $\Delta H$ and $\Delta S$ back into the equation for $\Delta G$.
    $$\Delta G = \Delta H - T \Delta S = 334 \text{ kJ} - (273.15 \text{ K})(1.223 \text{ kJ/K})$$
    $$\Delta G \approx 334 \text{ kJ} - 334 \text{ kJ} = 0$$

**Reflection:**
*   Step 1 worked because we correctly identified the system's constraints ($T, P$ constant) and chose the corresponding potential ($G$).
*   Step 2 used the integrated form of the definition of $G$, which is valid for a constant temperature process.
*   Steps 3 and 4 correctly identified $\Delta H$ with the heat of fusion and used the fundamental definition of entropy change for a reversible, isothermal process.
*   The final result, $\Delta G = 0$, is precisely what we expect. It means the system is at equilibrium; the ice and water phases can coexist, and there is no spontaneous drive for the entire system to become all ice or all water. If $\Delta G$ were negative, melting would be spontaneous. If positive, freezing would be.

## Diagrams
This is the thermodynamic square (or Born square). It's a powerful mnemonic device.

```text
      V <--- F <--- T
      |             ^
      |             |
      U             G
      |             |
      v             |
      S ---> H ---> P

(Mnemonic: "Very Fine Teachers Understand Good High-school Physics Students")
```

**How to use it:**
1.  **Potentials:** The potentials U, H, F, G are in the middle of the sides.
2.  **Natural Variables:** The natural variables for each potential are its two neighbors. For $G$, the neighbors are $T$ and $P$. For $U$, they are $S$ and $V$.
3.  **Differentials:** To find the differential (e.g., $dG$), look at the natural variables ($T, P$). The change is the variable *away* from the potential ($dT, dP$) multiplied by its *opposite* neighbor. The sign is positive if you move towards the variable, negative if away. For $dG$: moving from $T$ to $V$ is away, so we get $-SdT$. Moving from $P$ to $V$ is away, so we get $+VdP$. Thus, $dG = -SdT + VdP$. (The arrow directions help with signs for Maxwell relations, but the simple rule above works for differentials).

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a company called **U**nited **P**ressure-**V**olume Inc. It's run by a **H**efty **P**resident named **S**am. He hires two managers: **F**rank **V**on **T**rappe and **G**regory **P**. **T**hompson.
    *   $U$ is the base.
    *   $H = U + PV$ ("United Pressure-Volume").
    *   $F = U - TS$ (Frank's salary is a cost).
    *   $G = H - TS$ (Gregory's salary is also a cost).
    This story connects each potential to its definition.

2.  **MUST Overlearn Formulas:**
    $$H = U + PV$$
    $$F = U - TS$$
    $$G = H - TS = U + PV - TS$$

3.  **Spaced Repetition Schedule:** Review these definitions and the thermodynamic square.
    *   In 24 hours.
    *   In 3 days.
    *   In 7 days.
    *   In 16 days.
    *   In 35 days.
    Each time, re-derive the differential forms ($dH, dF, dG$) from the definitions and $dU = TdS - PdV$.

4.  **First Principles Pathway:** If you forget everything, you only need two things:
    *   The First Law: $dU = \delta Q_{rev} + \delta W_{rev}$
    *   The definition of entropy: $dS = \delta Q_{rev} / T$
    Combine them to get $dU = TdS - PdV$. From there, remember the goal: to replace "uncontrollable" variables ($S, V$) with "controllable" ones ($T, P$) using the Legendre Transform structure: $NewPotential = OldPotential - (old\_variable) \times (derivative)$. This allows you to reconstruct H, F, and G from scratch.

## Common mistakes
1.  **Using the wrong potential.** Do not use $\Delta F$ to determine spontaneity for a reaction happening in an open beaker on a lab bench. That's a constant $(T,P)$ system, so you must use $\Delta G$.
2.  **Sign errors.** The definitions $F=U-TS$ and $G=H-TS$ have minus signs. Forgetting them is common and fatal. The $TS$ term is the "heat tax," an energy cost.
3.  **Confusing "free energy" with "free-of-cost energy."** It is not. It is the energy *free to do non-PV work*. For a battery at constant T and P, the change in Gibbs free energy $\Delta G$ represents the maximum electrical work it can provide, not the total energy change $\Delta H$.
4.  **Applying minimization to the wrong quantity.** A system at constant $T,P$ minimizes $G$, not $\Delta G$. The *value* of the potential is minimized at equilibrium. We calculate the *change* $\Delta G$ to see which direction the system will move to reach that minimum.

## Self-check
1.  Starting from the definition $G = U + PV - TS$ and the fundamental equation $dU = TdS - PdV$, derive the differential form $dG = -SdT + VdP$.
2.  The fact that $dG$ is an exact differential implies that $\left(\frac{\partial (-S)}{\partial P}\right)_T = \left(\frac{\partial V}{\partial T}\right)_P$. This is one of the four Maxwell Relations. Use the differential forms of $U$, $H$, and $F$ to derive the other three Maxwell Relations.
3.  A solid-fuel rocket motor is essentially an isolated, constant-volume system during its very short burn time. Which thermodynamic potential is most useful for analyzing the state of the propellant gases just after the burn is complete but before they have expanded out the nozzle? Explain why the system seeks to minimize this potential to reach equilibrium.