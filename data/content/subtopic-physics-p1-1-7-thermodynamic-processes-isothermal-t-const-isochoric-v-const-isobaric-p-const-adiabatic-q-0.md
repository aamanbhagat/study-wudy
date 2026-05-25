## What it is
Thermodynamic processes are idealized pathways for a system (like a gas in a cylinder) to change from one state to another. We characterize these processes by holding one thermodynamic variable constant: **isobaric** (constant pressure), **isochoric** (constant volume), **isothermal** (constant temperature), or by preventing heat transfer, **adiabatic** (zero heat exchange). These processes form the building blocks of thermodynamic cycles.

## Why it matters
These idealized processes are the fundamental components of heat engines. The Otto cycle (car engines) and Diesel cycle are modeled by sequences of these processes. In aerospace, the Brayton cycle, which describes how jet engines and gas turbines work, is built from isobaric and adiabatic steps. Understanding these is non-negotiable for analyzing propulsion systems or the behavior of gases in extreme environments like stellar interiors.

## When to study it
Before tackling this, you must have a firm grasp of two concepts:
1.  The **Ideal Gas Law**: $PV = nRT$. You must understand the relationship between pressure ($P$), volume ($V$), number of moles ($n$), and temperature ($T$).
2.  The **First Law of Thermodynamics**: $\Delta U = Q - W$. You must know that the change in a system's internal energy ($\Delta U$) equals the heat added to it ($Q$) minus the work it does ($W$).

If you are not solid on these, pause and review them now.

## How to study it (step by step)
1.  **Master the definitions.** Write down the four process names and their constraints ($P=\text{const}$, $V=\text{const}$, $T=\text{const}$, $Q=0$) on a notecard. Drill this until it is instant recall.
2.  **Derive the work for each process.** Start with the definition of work done by an expanding gas, $W = \int_{V_i}^{V_f} P dV$. Apply the constraint for each of the four processes to solve this integral. For the adiabatic case, you will need the relation $PV^\gamma = k$ (where $k$ is a constant).
3.  **Apply the First Law.** For each process, take your result for work ($W$) and the process constraint (e.g., $Q=0$ for adiabatic) and plug them into $\Delta U = Q - W$. Determine the change in internal energy and the heat exchanged.
4.  **Connect to Internal Energy.** Use the relation for a monatomic ideal gas, $U = \frac{3}{2}nRT$. This shows $\Delta U$ is directly proportional to $\Delta T$. Use this to check your results from step 3. For example, in an isothermal process, $\Delta T=0$, so $\Delta U$ must be zero. Does your First Law analysis agree?
5.  **Sketch the P-V Diagram.** Draw pressure vs. volume axes. Pick a starting point $(V_1, P_1)$. Sketch the path for each of the four processes originating from this point (e.g., for an expansion). This will force you to understand their relative slopes.
6.  **Solve problems.** Work through one simple numerical problem for each process type. Focus on correctly identifying the process, choosing the right formula, and keeping signs consistent.

## Key ideas, with intuition
1.  **Work is Area on a P-V Diagram.** The work done by a gas during expansion, $W = \int P dV$, is literally the area under the process curve on a Pressure-Volume (P-V) diagram. An isochoric process is a vertical line ($dV=0$), so the area is zero, and no work is done. An isobaric process is a horizontal line, so the area is a simple rectangle: $W = P\Delta V$.

2.  **The First Law is the Accountant.** $\Delta U = Q - W$ tracks the energy. The system has an internal energy bank account ($U$). It can receive deposits from heat ($Q>0$) and make withdrawals by doing work ($W>0$). For an ideal gas, $U$ is just the kinetic energy of its molecules, which depends only on temperature.
    *   **Isothermal**: Temperature is constant, so $\Delta U = 0$. The books must balance. Any heat you add must be immediately spent as work: $Q = W$.
    *   **Adiabatic**: No heat is exchanged ($Q=0$). To do work, the gas must spend its own internal energy: $\Delta U = -W$. As it expands and does work, its internal energy and temperature drop. This is why a canister of compressed air gets cold when you discharge it.

3.  **Adiabatic is Steeper than Isothermal.** Imagine two cylinders, both expanding from $V_1$ to $V_2$.
    *   The **isothermal** cylinder is in a water bath, held at a constant temperature. As it expands, heat flows in from the bath to keep the temperature steady, which helps maintain pressure.
    *   The **adiabatic** cylinder is insulated. As it expands, it does work by using its own internal energy, so its temperature drops. According to $PV=nRT$, if $T$ drops while $V$ increases, $P$ must drop more sharply than in the isothermal case. Therefore, the adiabatic curve on a P-V diagram is steeper than the isothermal curve.

4.  **The Adiabatic Constant $\gamma$.** The relation for an adiabatic process is $PV^\gamma = \text{constant}$, where $\gamma = C_P/C_V$ is the ratio of specific heats. For a monatomic gas, $\gamma = 5/3$. For a diatomic gas like $N_2$ or $O_2$, $\gamma \approx 7/5 = 1.4$. This number encodes how the internal energy of the gas is structured (degrees of freedom), which in turn governs how its temperature changes when it does work without heat input.

## Worked example
**Problem:** A rocket engine uses a gas that can be approximated as an ideal diatomic gas ($\gamma = 1.4$). The gas enters the nozzle at a high pressure $P_1 = 6 \times 10^6$ Pa and temperature $T_1 = 3000$ K, and expands adiabatically to an exit pressure of $P_2 = 1 \times 10^5$ Pa. If the initial volume of a parcel of gas is $V_1 = 0.1 \text{ m}^3$, what is its final volume $V_2$ and the work done during the expansion?

**Solution:**
1.  **Identify the process and governing equation.** The process is adiabatic. The governing equation is $P_1 V_1^\gamma = P_2 V_2^\gamma$.

2.  **Solve for the final volume, $V_2$.**
    $$ P_1 V_1^\gamma = P_2 V_2^\gamma $$
    $$ \frac{P_1}{P_2} = \left(\frac{V_2}{V_1}\right)^\gamma $$
    $$ V_2 = V_1 \left(\frac{P_1}{P_2}\right)^{1/\gamma} $$
    Substitute the values:
    $$ V_2 = (0.1 \text{ m}^3) \left(\frac{6 \times 10^6 \text{ Pa}}{1 \times 10^5 \text{ Pa}}\right)^{1/1.4} $$
    $$ V_2 = (0.1 \text{ m}^3) (60)^{1/1.4} \approx (0.1 \text{ m}^3) (19.95) \approx 1.995 \text{ m}^3 $$
    *Reflection: This step isolates the unknown variable ($V_2$) using the core physics relation for this process. The large pressure drop results in a massive volume expansion, which is the point of a nozzle.*

3.  **Calculate the work done, $W$.** For an adiabatic process, $P = k V^{-\gamma}$ where $k = P_1 V_1^\gamma$.
    $$ W = \int_{V_1}^{V_2} P dV = \int_{V_1}^{V_2} k V^{-\gamma} dV = k \left[ \frac{V^{1-\gamma}}{1-\gamma} \right]_{V_1}^{V_2} $$
    $$ W = \frac{k}{1-\gamma} (V_2^{1-\gamma} - V_1^{1-\gamma}) = \frac{1}{1-\gamma} (k V_2^{1-\gamma} - k V_1^{1-\gamma}) $$
    Since $k = P_1 V_1^\gamma = P_2 V_2^\gamma$, we can substitute back to get a cleaner form:
    $$ W = \frac{1}{1-\gamma} (P_2 V_2^\gamma V_2^{1-\gamma} - P_1 V_1^\gamma V_1^{1-\gamma}) = \frac{P_2 V_2 - P_1 V_1}{1-\gamma} $$
    Now, substitute the values:
    $$ W = \frac{(1 \times 10^5 \text{ Pa})(1.995 \text{ m}^3) - (6 \times 10^6 \text{ Pa})(0.1 \text{ m}^3)}{1 - 1.4} $$
    $$ W = \frac{1.995 \times 10^5 - 6 \times 10^5}{-0.4} = \frac{-4.005 \times 10^5}{-0.4} \approx 1.00 \times 10^6 \text{ J} $$
    The work done by the gas is approximately 1 MJ.
    *Reflection: This step uses the definition of work and the process equation. The final formula $W = (P_2V_2 - P_1V_1)/(1-\gamma)$ is a standard result, but deriving it from the integral is key to understanding. The positive result confirms that the gas does work on its surroundings, which is how a rocket generates thrust.*

## Diagrams
A P-V diagram showing the four processes starting from an initial state $(P_1, V_1)$ and expanding.

```text
      P (Pressure)
      ^
      |
  P1 -+----(P1,V1)-------------------> Isobaric (P=const)
      |    .  /|\
      |   .    | Isochoric (V=const)
      |  .     |
      | .      |
      |.       v
      | \
      |  \  <-- Isothermal (T=const)
      |   \
      |    \ <-- Adiabatic (Q=0, steeper)
      |     \
      +--------------------------------------> V (Volume)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **ISO** means "same".
    *   **Baric** -> Barometer -> Pressure. **Isobaric = same pressure.**
    *   **Choric** -> Choreography/Chorus -> occupies a defined space. **Isochoric = same space (volume).**
    *   **Thermal** -> Thermometer -> Temperature. **Isothermal = same temperature.**
    *   **Adiabatic** comes from Greek *adiabatos*, "impassable". Heat cannot pass through the boundary. **Adiabatic = no heat transfer.**

2.  **Must Overlearn Formulas:**
    *   First Law: $\Delta U = Q - W$ (The source of truth)
    *   Work: $W = \int P \, dV$ (The definition of work)
    *   Adiabatic relation: $PV^\gamma = \text{constant}$

3.  **Spaced Repetition Schedule:**
    Review these concepts and re-derive the work formulas at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget a formula for work or heat, reconstruct it.
    *   Start with $\Delta U = Q - W$ and $W = \int P dV$.
    *   Identify the process constraint (e.g., for isothermal, $T$ is constant).
    *   Use the ideal gas law $PV=nRT$ to substitute. For isothermal, $P = nRT/V$.
    *   Substitute this into the work integral: $W = \int (nRT/V) dV$. Since $n, R, T$ are constant, pull them out: $W = nRT \int (1/V) dV = nRT \ln(V_f/V_i)$.
    *   You have now re-derived the isothermal work formula from scratch.

## Common mistakes
1.  **Sign Conventions.** Confusing work done *by* the gas (positive $W$, energy leaves the system) with work done *on* the gas (negative $W$, energy enters the system). Stick to one convention; $W = \int P dV$ is work done *by* the gas.
2.  **Applying $\Delta U = 0$ incorrectly.** For an ideal gas, internal energy $U$ is a function of temperature *only*. Thus, $\Delta U = 0$ *only* for an isothermal process. For an adiabatic expansion, $T$ drops, so $\Delta U$ is negative.
3.  **Mixing up curves on a P-V diagram.** Students often draw the adiabatic and isothermal curves with the same slope. Remember: the adiabatic curve is always steeper because the gas is cooling as it expands, causing its pressure to drop faster.
4.  **Using the wrong specific heat.** The value of $\gamma$ depends on the gas (monatomic, diatomic). Using $\gamma=5/3$ for air (which is diatomic) will lead to incorrect answers in adiabatic problems.

## Self-check
1.  A sealed, rigid container of air is heated by the sun. What is the work done by the air inside? What can you say about the relationship between the heat absorbed and the internal energy of the air?
2.  2 moles of an ideal gas expand isobarically at a pressure of $101.3$ kPa from a volume of $0.025 \text{ m}^3$ to $0.050 \text{ m}^3$. Calculate the work done by the gas, the change in its temperature, and the heat added to the gas. (For a diatomic gas, $C_P = \frac{7}{2}R$).
3.  A gas expands from state A to state B, once isothermally and once adiabatically. In which process is more work done by the gas? In which process is the final internal energy higher? Justify your answers using a P-V diagram and the First Law of Thermodynamics.