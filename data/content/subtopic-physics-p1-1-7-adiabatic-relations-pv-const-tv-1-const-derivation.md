## What it is
An adiabatic process is a thermodynamic process in which there is no heat transfer into or out of the system ($Q=0$). The adiabatic relations, such as $PV^\gamma = \text{constant}$, describe the specific relationship between pressure ($P$), volume ($V$), and temperature ($T$) for an ideal gas undergoing such a process. The constant $\gamma$ (gamma) is the ratio of the specific heat at constant pressure to the specific heat at constant volume.

## Why it matters
Adiabatic processes are central to high-speed gas dynamics, making them critical for rocket science and aerospace engineering. The expansion of hot gases through a rocket nozzle is nearly adiabatic; these relations allow us to calculate the thrust generated. They also describe the compression stroke in an internal combustion engine and are used to model the temperature changes in large-scale atmospheric phenomena.

## When to study it
Before tackling this, you must have a solid grasp of these prerequisites:
1.  **The First Law of Thermodynamics:** $dU = dQ - dW$. You must understand internal energy ($U$), heat ($Q$), and work ($W$).
2.  **The Ideal Gas Law:** $PV = nRT$.
3.  **Definitions of Specific Heats:** Molar specific heat at constant volume, $C_V = (\frac{\partial U}{\partial T})_V$, and at constant pressure, $C_P$. You should also know the relation $C_P - C_V = R$ for an ideal gas.
4.  **Basic Calculus:** You need to be comfortable with separation of variables to solve simple differential equations.

If you are not confident with these, master them first. There is no shortcut.

## How to study it (step by step)
1.  **Start with the First Law:** Write down the differential form of the First Law of Thermodynamics, $dU = dQ - dW$. Set $dQ=0$ because the process is adiabatic.
2.  **Substitute Known Expressions:** Replace $dU$ with its definition for an ideal gas, $dU = nC_V dT$. Replace $dW$ with the expression for mechanical work, $dW = P dV$. This gives you $nC_V dT = -P dV$.
3.  **Eliminate a Variable using the Ideal Gas Law:** Your equation has three variables: $T$, $P$, and $V$. Use the ideal gas law, $PV = nRT$, to eliminate one. Differentiate it using the product rule to get $P dV + V dP = nR dT$. Solve for $dT$ and substitute it into the equation from step 2.
4.  **Integrate the Differential Equation:** The result from step 3 will be a differential equation relating only $P$ and $V$. Separate the variables (all $P$ terms on one side, all $V$ terms on the other) and integrate both sides. This will yield the relation $PV^\gamma = \text{constant}$.
5.  **Derive the Other Forms:** Once you have $PV^\gamma = K$ (where $K$ is a constant), use the ideal gas law ($P = nRT/V$ and $V = nRT/P$) to substitute and derive the other two forms: $TV^{\gamma-1} = \text{constant}$ and $P^{1-\gamma}T^\gamma = \text{constant}$.
6.  **Solve a Problem:** Find a textbook problem where a gas expands or is compressed adiabatically. Use the derived relations to calculate the final state (pressure, temperature, or volume) given the initial state and one final parameter.

## Key ideas, with intuition
1.  **No Heat Transfer ($dQ=0$):** This is the defining constraint. Imagine a gas in a perfectly insulated cylinder with a piston. Any change must happen without thermal interaction with the outside world. This is an idealization, but it's a very good approximation for processes that happen very quickly, so fast that heat has no time to flow.

2.  **Work Comes from Internal Energy:** The First Law for an adiabatic process is $dU = -dW$.
    $$ \Delta U = -W $$
    If the gas expands, it does positive work on its surroundings ($W > 0$). Therefore, its internal energy must decrease ($\Delta U < 0$). Since internal energy for an ideal gas is proportional to temperature ($U \propto T$), an adiabatic expansion always results in cooling. Conversely, an adiabatic compression ($W < 0$) increases the internal energy and heats the gas up. This is why a diesel engine can ignite fuel without a spark plug—the rapid compression heats the air-fuel mixture to its ignition temperature.

3.  **The Steepness is Governed by $\gamma$:** On a Pressure-Volume (P-V) diagram, an adiabatic curve is steeper than an isothermal curve. For an isotherm, $PV = \text{const}$, so $P \propto V^{-1}$. For an adiabat, $PV^\gamma = \text{const}$, so $P \propto V^{-\gamma}$. Since $\gamma = C_P/C_V > 1$ for all gases, the pressure drops more quickly with increasing volume in an adiabatic expansion than in an isothermal one. This is because in the adiabatic case, the gas is cooling down, which contributes an additional pressure drop on top of the effect from the volume increase.

## Worked example
**Problem:** A diatomic ideal gas ($\gamma = 7/5$) at an initial state of $P_1 = 100 \text{ kPa}$ and $V_1 = 4.0 \text{ m}^3$ is compressed adiabatically to a final volume of $V_2 = 1.0 \text{ m}^3$. Find the final pressure $P_2$ and the final temperature $T_2$, given the initial temperature is $T_1 = 300 \text{ K}$.

**Solution:**
1.  **Identify the process and governing equation.**
    The process is adiabatic, so the governing relation is $P_1 V_1^\gamma = P_2 V_2^\gamma$. We are given $P_1$, $V_1$, $V_2$, and $\gamma$.

2.  **Solve for the final pressure, $P_2$.**
    Rearrange the equation:
    $$ P_2 = P_1 \left( \frac{V_1}{V_2} \right)^\gamma $$
    Substitute the given values:
    $$ P_2 = (100 \text{ kPa}) \left( \frac{4.0 \text{ m}^3}{1.0 \text{ m}^3} \right)^{7/5} $$
    $$ P_2 = (100 \text{ kPa}) (4)^{1.4} $$
    Calculate the value: $4^{1.4} \approx 6.964$.
    $$ P_2 \approx 100 \times 6.964 = 696.4 \text{ kPa} $$

3.  **Identify the next governing equation to find temperature.**
    We can use the relation $T_1 V_1^{\gamma-1} = T_2 V_2^{\gamma-1}$. We are given $T_1$, $V_1$, $V_2$, and $\gamma$.

4.  **Solve for the final temperature, $T_2$.**
    Rearrange the equation:
    $$ T_2 = T_1 \left( \frac{V_1}{V_2} \right)^{\gamma-1} $$
    Substitute the given values. Note that $\gamma-1 = 7/5 - 1 = 2/5 = 0.4$.
    $$ T_2 = (300 \text{ K}) \left( \frac{4.0 \text{ m}^3}{1.0 \text{ m}^3} \right)^{2/5} $$
    $$ T_2 = (300 \text{ K}) (4)^{0.4} $$
    Calculate the value: $4^{0.4} \approx 1.741$.
    $$ T_2 \approx 300 \times 1.741 = 522.3 \text{ K} $$

**Reflection:**
- Step 1 worked because we correctly identified the process type (adiabatic).
- Step 2 was a direct algebraic manipulation of the primary adiabatic relation.
- Step 3 used the second form of the adiabatic relation to connect temperature and volume. We could have also used the ideal gas law ($P_2V_2 = nRT_2$) but that would have required calculating $n$ first. Using the $TV$ relation was more direct.
- Step 4 completed the calculation. Notice the temperature increased significantly, which is the expected result for an adiabatic compression.

## Diagrams
Here is a P-V diagram comparing an adiabatic process with an isothermal process, both starting from the same state $(P_1, V_1)$.

```text
      P (Pressure)
      ^
      |
  P1 -|----(P1,V1)
      |   /    \
      |  /      \
      | /        \ Isotherm (PV = const)
      |/          \
      /            \
     / Adiabat      \
    / (PV^γ = const) \
   /                  \
  +----------------------> V (Volume)
      V1
```
**Description:** The vertical axis is Pressure (P) and the horizontal axis is Volume (V). Both processes start at an initial state $(P_1, V_1)$. Two curves diverge from this point, representing expansion. The upper curve, which is less steep, is the Isotherm ($T=\text{const}$). The lower curve, which is steeper, is the Adiabat ($Q=0$). This shows that for the same change in volume, the pressure drops more in an adiabatic expansion because the gas also cools.

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a TV show called **"Poison TV"**. The show is so bad it's *adiabatically sealed* off from the world (no heat/reviews get in or out). The two main characters are **P**a**V**el (with a weird accent, so he says $V^\gamma$) and **T**re**V**or (who is one year younger, so he is $V^{\gamma-1}$).
    - **P**a**V**el's catchphrase: $PV^\gamma = \text{constant}$.
    - **T**re**V**or's catchphrase: $TV^{\gamma-1} = \text{constant}$.
    This gives you the two most useful forms.

2.  **Must Overlearn:**
    $$ PV^\gamma = \text{constant} $$
    $$ TV^{\gamma-1} = \text{constant} $$
    $$ \gamma = \frac{C_P}{C_V} $$

3.  **Spaced Repetition Schedule:** Review these formulas and their derivation at these intervals:
    - 24 hours
    - 3 days
    - 7 days
    - 16 days
    - 35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it from the foundation.
    - Start with the First Law: $dU = dQ - dW$.
    - Set $dQ=0$ (Adiabatic).
    - Substitute ideal gas expressions: $nC_V dT = -P dV$.
    - Use the Ideal Gas Law ($PV=nRT$) to eliminate one variable (e.g., $T$).
    - Separate variables and integrate. This path is indestructible.

## Common mistakes
1.  **Confusing Adiabatic and Isothermal:** Students often mix these up. Remember: Isothermal means constant temperature ($T=\text{const}$), Adiabatic means no heat exchange ($Q=0$). On a P-V diagram, the adiabat is always steeper.
2.  **Using Temperature in Celsius:** All thermodynamic gas laws, including these, require absolute temperature (Kelvin). Using Celsius will give incorrect answers. Always convert.
3.  **Incorrect $\gamma$ Value:** The value of $\gamma$ depends on the gas. For a monatomic gas (like He, Ar), $\gamma = 5/3 \approx 1.67$. For a diatomic gas (like N$_2$, O$_2$), $\gamma = 7/5 = 1.4$. Using the wrong one is a common error.
4.  **Algebraic Errors with Exponents:** Be careful when solving for a variable. Remember that $(V_1/V_2)^\gamma$ is not the same as $V_1^\gamma / V_2$. It is, but students often make mistakes applying the exponent.

## Self-check
1.  An ideal monatomic gas ($\gamma = 5/3$) expands adiabatically from an initial pressure of $2 \times 10^5$ Pa and volume of $1 \text{ m}^3$ to a final volume of $3 \text{ m}^3$. What is its final pressure?
2.  Starting from the relation $PV^\gamma = K$ (where $K$ is a constant), use the ideal gas law ($PV=nRT$) to derive the relation between temperature and pressure, $P^{1-\gamma}T^\gamma = \text{constant}$.
3.  Two identical cylinders contain the same amount of the same ideal gas at the same initial state $(P_1, V_1)$. Gas in cylinder A expands isothermally to volume $V_2$. Gas in cylinder B expands adiabatically to the same volume $V_2$. Which gas does more work on its surroundings? Justify your answer without calculation, using a P-V diagram.