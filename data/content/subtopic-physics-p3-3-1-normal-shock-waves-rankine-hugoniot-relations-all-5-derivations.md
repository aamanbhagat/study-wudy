## What it is
A normal shock wave is an infinitesimally thin discontinuity in a supersonic flow where the fluid properties (pressure, temperature, density) change almost instantaneously. The Rankine-Hugoniot relations are the set of five equations derived from the fundamental conservation laws (mass, momentum, energy) and the equation of state, which describe the relationship between the fluid properties on either side of this shock.

## Why it matters
These relations are fundamental to designing and analyzing any vehicle or system that operates at supersonic speeds. They determine the immense pressure and temperature increase on the nose of a re-entry capsule, the performance of a supersonic jet engine inlet, and the destructive power of a blast wave. Understanding them is non-negotiable for aerospace engineering.

## When to study it
You must have a solid grasp of the integral form of the conservation laws for a control volume:
1.  **Conservation of Mass** (Continuity Equation)
2.  **Conservation of Momentum** (Newton's Second Law for fluids)
3.  **Conservation of Energy** (First Law of Thermodynamics)
4.  **Ideal Gas Law** ($p = \rho R T$) and the definitions of specific heats ($c_p, c_v$), enthalpy ($h$), and the specific heat ratio ($\gamma$).

If you cannot write these down from memory and explain their terms, review them before proceeding.

## How to study it (step by step)
1.  **Set up the Control Volume:** Draw a small, rectangular control volume that cuts across the normal shock wave. Assume the shock is stationary, and the flow moves through it. Label the inlet "1" (upstream, supersonic) and the outlet "2" (downstream, subsonic).
2.  **Apply Conservation of Mass:** Write the integral mass conservation equation for this steady, 1D control volume. Simplify it to obtain the first Rankine-Hugoniot relation.
3.  **Apply Conservation of Momentum:** Write the integral momentum equation, accounting for pressure forces and momentum flux. Simplify to get the second relation.
4.  **Apply Conservation of Energy:** Write the integral energy equation, including enthalpy and kinetic energy flux. Since the shock is adiabatic (no external heat transfer), simplify this to obtain the third relation.
5.  **Introduce the Gas Law:** Write the ideal gas law ($p=\rho R T$) and the relation for enthalpy ($h=c_p T$). These are the fourth and fifth fundamental equations that close the system.
6.  **Derive the Practical Forms:** Use algebraic manipulation of these five equations to derive the final, useful forms for the ratios $\frac{p_2}{p_1}$, $\frac{\rho_2}{\rho_1}$, $\frac{T_2}{T_1}$, etc., as functions of only the upstream Mach number $M_1$ and $\gamma$. Start by deriving the Prandtl relation.
7.  **Solve a Problem:** Take given upstream conditions ($M_1, p_1, T_1$) and use the derived ratio equations to calculate all downstream conditions.

## Key ideas, with intuition
1.  **The Stationary Shock Frame:** A shock wave might be moving over a stationary object, but that's an unsteady problem. By changing our frame of reference to move *with* the shock, the problem becomes steady. The upstream gas flows into our stationary control volume, and the downstream gas flows out. This simplification is crucial.

2.  **Conservation Across a Discontinuity:** The core idea is that even across a violent, irreversible process like a shock, the fundamental laws of physics must hold. Mass, momentum, and energy are all conserved.
    *   **Mass:** $\dot{m}_{in} = \dot{m}_{out} \implies \rho_1 u_1 A = \rho_2 u_2 A$
    *   **Momentum:** The change in momentum flux must be balanced by the net pressure force. $\sum F = \dot{m}(u_{out} - u_{in}) \implies (p_1 - p_2)A = (\rho_2 u_2 A)u_2 - (\rho_1 u_1 A)u_1$
    *   **Energy:** The process is adiabatic (no time for heat to escape the tiny control volume). Thus, the total energy of the fluid, which is the sum of its internal energy (via enthalpy) and kinetic energy, must be conserved. This means stagnation enthalpy is constant: $h_{0,1} = h_{0,2}$.
    $$h_1 + \frac{1}{2}u_1^2 = h_2 + \frac{1}{2}u_2^2$$

3.  **Entropy is Not Conserved:** A shock wave is a highly irreversible process due to viscous dissipation and heat conduction within the wave itself. This means entropy *must* increase ($s_2 > s_1$). This is the physical reason why only compression shocks ($p_2 > p_1$) exist in nature; an "expansion shock" would violate the Second Law of Thermodynamics. This also means stagnation pressure is *not* conserved ($p_{0,2} < p_{0,1}$).

## Worked example
**Problem:** Air ($\gamma=1.4$, $R=287$ J/kg·K) approaches a normal shock at Mach 3.0. The upstream static pressure is $p_1 = 50$ kPa and static temperature is $T_1 = 250$ K. Find the downstream pressure $p_2$, density $\rho_2$, and temperature $T_2$.

**Derivations (The 5 Fundamental Relations):**
Let's first establish the core relations from our control volume analysis. The shock area is $A$.

1.  **Mass Conservation:**
    $$ \rho_1 u_1 A = \rho_2 u_2 A \implies \rho_1 u_1 = \rho_2 u_2 $$
2.  **Momentum Conservation:**
    $$ p_1 A - p_2 A = \dot{m}(u_2 - u_1) = (\rho_1 u_1 A)(u_2 - u_1) $$
    $$ p_1 - p_2 = \rho_1 u_1 u_2 - \rho_1 u_1^2 $$
    Using $\rho_1 u_1 = \rho_2 u_2$, we can write $\rho_1 u_1 u_2 = \rho_2 u_2^2$.
    $$ p_1 - p_2 = \rho_2 u_2^2 - \rho_1 u_1^2 \implies p_1 + \rho_1 u_1^2 = p_2 + \rho_2 u_2^2 $$
3.  **Energy Conservation:**
    $$ \dot{E}_{in} = \dot{E}_{out} \implies \dot{m}(h_1 + \frac{1}{2}u_1^2) = \dot{m}(h_2 + \frac{1}{2}u_2^2) $$
    $$ h_1 + \frac{1}{2}u_1^2 = h_2 + \frac{1}{2}u_2^2 $$
4.  **Equation of State:**
    $$ p = \rho R T $$
5.  **Calorically Perfect Gas Relation:**
    $$ h = c_p T $$

These are the five fundamental Rankine-Hugoniot relations. From them, we derive the practical ratio equations. The pressure ratio equation is:
$$ \frac{p_2}{p_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1) $$
The density ratio equation is:
$$ \frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{2 + (\gamma-1)M_1^2} $$
The temperature ratio is found from the ideal gas law: $\frac{T_2}{T_1} = \frac{p_2}{p_1} \frac{\rho_1}{\rho_2}$.

**Solution Steps:**

1.  **Calculate Pressure Ratio:**
    Given $M_1 = 3.0$ and $\gamma = 1.4$.
    $$ \frac{p_2}{p_1} = 1 + \frac{2(1.4)}{1.4+1}(3.0^2 - 1) = 1 + \frac{2.8}{2.4}(9 - 1) = 1 + \frac{2.8}{2.4}(8) = 1 + 9.333 = 10.333 $$
    $$ p_2 = p_1 \times 10.333 = 50 \text{ kPa} \times 10.333 = 516.65 \text{ kPa} $$

2.  **Calculate Density Ratio:**
    $$ \frac{\rho_2}{\rho_1} = \frac{(1.4+1)(3.0^2)}{2 + (1.4-1)(3.0^2)} = \frac{2.4 \times 9}{2 + 0.4 \times 9} = \frac{21.6}{2 + 3.6} = \frac{21.6}{5.6} = 3.857 $$
    To find $\rho_2$, we first need $\rho_1$.
    $$ \rho_1 = \frac{p_1}{R T_1} = \frac{50 \times 10^3 \text{ Pa}}{(287 \text{ J/kg·K})(250 \text{ K})} = 0.6968 \text{ kg/m}^3 $$
    $$ \rho_2 = \rho_1 \times 3.857 = 0.6968 \text{ kg/m}^3 \times 3.857 = 2.688 \text{ kg/m}^3 $$

3.  **Calculate Temperature Ratio and Temperature:**
    $$ \frac{T_2}{T_1} = \frac{p_2}{p_1} \frac{\rho_1}{\rho_2} = (10.333) \times \frac{1}{3.857} = 2.679 $$
    $$ T_2 = T_1 \times 2.679 = 250 \text{ K} \times 2.679 = 669.75 \text{ K} $$

**Reflection:** Each step directly applied a derived formula. The pressure, density, and temperature all increased dramatically, as expected for a strong shock wave. The derivation of the ratio formulas themselves is just algebraic manipulation of the five fundamental conservation and state equations, a crucial exercise you should perform yourself.

## Diagrams
```text
        SUPERSONIC FLOW                      SUBSONIC FLOW
        (State 1)                            (State 2)
        M_1 > 1                              M_2 < 1
        p_1, T_1, rho_1, u_1                 p_2, T_2, rho_2, u_2

--->      |                                  |      --->
--->      |                                  |      --->
--->      |         CONTROL VOLUME           |      --->
--->      +----------------------------------+      --->
          |                                  |
          |       NORMAL SHOCK WAVE          |
          |       (infinitesimal            |
          |        thickness)                |
--->      +----------------------------------+      --->
--->      |                                  |      --->
--->      |                                  |      --->

          ^                                  ^
          Inlet plane (1)                    Outlet plane (2)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a chaotic, crowded hallway (supersonic flow). Suddenly, everyone hits a single doorway they must all pass through (the shock). The hallway is the control volume.
    *   **Mass:** The number of people entering per second must equal the number exiting. ($\rho_1 u_1 = \rho_2 u_2$)
    *   **Momentum:** People push on the doorframe as they squeeze through. The force of the crowd before the door ($p_1 + \rho_1 u_1^2$) must equal the force of the crowd after. ($p_2 + \rho_2 u_2^2$)
    *   **Energy:** No one is given food or water in the hallway (adiabatic). Their total "excitement" (enthalpy + kinetic energy) is conserved. ($h_1 + \frac{1}{2}u_1^2 = h_2 + \frac{1}{2}u_2^2$)
    *   **Result:** After the door, the crowd is slower, denser, hotter (more agitated), and at a higher pressure.

2.  **Must-Know Formulas (The Foundation):**
    $$ \rho_1 u_1 = \rho_2 u_2 $$
    $$ p_1 + \rho_1 u_1^2 = p_2 + \rho_2 u_2^2 $$
    $$ h_1 + \frac{1}{2}u_1^2 = h_2 + \frac{1}{2}u_2^2 $$

3.  **Spaced Repetition Schedule:** Review these derivations and the three core formulas at: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders now.

4.  **First Principles Pathway:** If you forget everything, re-derive it. Draw a 1D control volume around a stationary shock. Apply the integral forms of conservation of mass, momentum, and energy. Assume steady state and uniform flow at the inlet and outlet. The three formulas above will emerge directly.

## Common mistakes
1.  **Confusing Stagnation and Static Properties:** Stagnation enthalpy ($h_0$) is conserved across a shock. Stagnation pressure ($p_0$) is *not* conserved; it always decreases due to the entropy increase. Static properties ($p, T, \rho$) all jump.
2.  **Assuming Isentropic Flow:** A shock is the definition of a non-isentropic process in aerodynamics. Do not use isentropic relations (like $p/\rho^\gamma = \text{const}$) to relate properties across a shock. You must use the Rankine-Hugoniot relations.
3.  **Using Absolute Pressure Incorrectly:** The momentum equation involves pressure forces ($p \times A$). Ensure you are using absolute pressure, not gauge pressure, in all calculations.
4.  **Algebraic Slips:** The derivation of the practical ratio formulas from the five fundamental equations is dense with algebra. Be meticulous. A common error is incorrectly substituting the continuity equation into the momentum equation.

## Self-check
1.  Starting with the five fundamental relations, derive the Prandtl relation: $u_1 u_2 = a^{*2}$, where $a^*$ is the critical speed of sound (the speed of sound at Mach 1).
2.  Explain physically, using the Second Law of Thermodynamics, why an "expansion shock" (where $p_2 < p_1$ and $M_1 < 1, M_2 > 1$) cannot exist.
3.  A normal shock occurs in a flow of helium ($\gamma=5/3$) where $M_1=2.0$. Calculate the ratio of stagnation pressures, $p_{0,2}/p_{0,1}$. (Hint: you will need to find $M_2$ first, then use the isentropic relations *before* and *after* the shock, but not *across* it).