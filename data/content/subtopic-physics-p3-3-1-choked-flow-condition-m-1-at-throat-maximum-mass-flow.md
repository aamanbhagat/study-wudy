## What it is
Choked flow is a limiting condition in compressible fluid dynamics where the fluid velocity at the narrowest point of a duct, the "throat," reaches the local speed of sound ($M=1$). Once this occurs, the mass flow rate through the duct is maximized and will not increase further, even if the downstream pressure is lowered. This sonic condition at the throat acts as a bottleneck, preventing downstream disturbances from propagating upstream.

## Why it matters
This principle is the cornerstone of rocket propulsion and high-speed aerodynamics. The de Laval nozzle on a rocket engine is designed to choke the flow at the throat to achieve maximum mass expulsion, and then expand it to supersonic speeds to generate maximum thrust. It is also fundamental to the design of supersonic wind tunnels, safety relief valves, and gas pipeline regulation.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
*   **Thermodynamics:** Isentropic process relations for an ideal gas ($P/\rho^\gamma = \text{const}$, etc.).
*   **Fluid Dynamics:** The integral and differential forms of the conservation laws: continuity ($\nabla \cdot (\rho \vec{V}) = 0$), momentum (Euler's equation), and energy (Steady Flow Energy Equation).
*   **Compressible Flow Basics:** The definition of the speed of sound ($a = \sqrt{\gamma R T}$) and the Mach number ($M = V/a$). Stagnation vs. static properties ($P_0, T_0$ vs. $P, T$).

## How to study it (step by step)
1.  **Derive the Area-Velocity Relation.** Start with the differential form of the continuity equation ($d(\rho A V) = 0$) and the 1D Euler equation ($dP = -\rho V dV$). Combine these using the definition of the speed of sound ($a^2 = dP/d\rho$) for an isentropic process to arrive at the crucial relation: $\frac{dA}{A} = (M^2 - 1)\frac{dV}{V}$.
2.  **Analyze the Area-Velocity Relation.** Interrogate the equation from Step 1. What does it imply for subsonic flow ($M<1$)? Supersonic flow ($M>1$)? What must be true at a throat where the area is minimum ($dA=0$)? This is the key to understanding why $M=1$ occurs at the throat.
3.  **Derive the Mass Flow Rate Equation.** Write the mass flow rate as $\dot{m} = \rho A V$. Use the isentropic relations to express density ($\rho$) and velocity ($V$) in terms of stagnation properties ($P_0, T_0$) and the local Mach number ($M$). This will give you $\dot{m}$ as a function of $A$ and $M$.
4.  **Find the Maximum Mass Flow Condition.** Take the equation for $\dot{m}$ from Step 3. To find the maximum, differentiate it with respect to $M$ and set the derivative to zero ($d\dot{m}/dM = 0$). You will find that the maximum occurs precisely when $M=1$.
5.  **Solve a Nozzle Problem.** Work through a standard problem: given stagnation conditions ($P_0, T_0$) and a throat area ($A^*$), calculate the choked mass flow rate. This will solidify your understanding of the final formula.

## Key ideas, with intuition
1.  **The Subsonic/Supersonic Duality.** The Area-Velocity Relation, $\frac{dA}{A} = (M^2 - 1)\frac{dV}{V}$, governs everything.
    *   **Subsonic ($M<1$):** The term $(M^2-1)$ is negative. To accelerate the flow ($dV>0$), you must decrease the area ($dA<0$). This is intuitive, like pinching a garden hose.
    *   **Supersonic ($M>1$):** The term $(M^2-1)$ is positive. To accelerate the flow ($dV>0$), you must *increase* the area ($dA>0$). This is counter-intuitive. Think of it this way: at supersonic speeds, the gas is highly compressed. Giving it more room allows it to expand rapidly, and this expansion pushes the gas to even higher velocities.
2.  **The Throat as a Sonic Gate.** For a flow to accelerate smoothly from subsonic to supersonic, it must pass through $M=1$. Where can this happen? At the throat, $dA=0$. The Area-Velocity relation becomes $0 = (M^2-1) \frac{dV}{V}$. For a non-trivial flow ($dV \neq 0$), the only solution is $M=1$. The throat is the only location where a smooth transition from subsonic to supersonic can occur.
3.  **Information Blockade.** Sound waves are pressure waves; they are how the fluid communicates changes. When the flow at the throat reaches the speed of sound, any pressure change downstream (e.g., lowering the exit pressure) creates a disturbance that tries to travel upstream. However, it cannot travel faster than the local speed of sound. Since the fluid is moving downstream at exactly the speed of sound, the information wave is held stationary at the throat and cannot propagate upstream. The upstream flow never "learns" about the change, so the mass flow rate remains fixed.

The mass flow rate can be expressed in terms of stagnation conditions and the throat area $A^*=A_{throat}$:
$$
\dot{m}_{max} = \dot{m}_{choked} = A^* \sqrt{\frac{\gamma}{R T_0}} P_0 \left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}}
$$
Notice that for a given gas ($\gamma, R$) and given reservoir conditions ($P_0, T_0$), the maximum mass flow rate depends *only* on the throat area $A^*$.

## Worked example
**Problem:** A rocket engine combustion chamber maintains air at a stagnation pressure $P_0 = 20 \text{ MPa}$ and stagnation temperature $T_0 = 3000 \text{ K}$. The engine's de Laval nozzle has a throat area of $A^* = 0.1 \text{ m}^2$. Assuming the combustion products behave as an ideal gas with $\gamma = 1.4$ and $R = 287 \text{ J/(kg·K)}$, calculate the mass flow rate through the engine when the flow is choked.

**Solution:**
1.  **Identify the Goal:** We need to calculate the maximum (choked) mass flow rate, $\dot{m}_{max}$. The problem states the flow is choked, so we can use the choked flow equation directly.

2.  **State the Governing Equation:**
    $$
    \dot{m}_{max} = A^* P_0 \sqrt{\frac{\gamma}{R T_0}} \left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}}
    $$

3.  **List Knowns and Convert Units:**
    *   $A^* = 0.1 \text{ m}^2$
    *   $P_0 = 20 \text{ MPa} = 20 \times 10^6 \text{ Pa}$
    *   $T_0 = 3000 \text{ K}$
    *   $\gamma = 1.4$
    *   $R = 287 \text{ J/(kg·K)}$

4.  **Calculate the Exponent Term:** This is the most complex part of the formula.
    $$
    \frac{\gamma+1}{2(\gamma-1)} = \frac{1.4+1}{2(1.4-1)} = \frac{2.4}{2(0.4)} = \frac{2.4}{0.8} = 3
    $$

5.  **Calculate the Base of the Exponent:**
    $$
    \frac{2}{\gamma+1} = \frac{2}{1.4+1} = \frac{2}{2.4} \approx 0.8333
    $$

6.  **Substitute and Solve:**
    $$
    \dot{m}_{max} = (0.1 \text{ m}^2) (20 \times 10^6 \text{ Pa}) \sqrt{\frac{1.4}{(287 \text{ J/(kg·K)})(3000 \text{ K})}} \left(0.8333\right)^{3}
    $$
    $$
    \dot{m}_{max} = (2 \times 10^6) \sqrt{\frac{1.4}{861000}} (0.5787)
    $$
    $$
    \dot{m}_{max} = (2 \times 10^6) \sqrt{1.626 \times 10^{-6}} (0.5787)
    $$
    $$
    \dot{m}_{max} = (2 \times 10^6) (1.275 \times 10^{-3}) (0.5787)
    $$
    $$
    \dot{m}_{max} \approx 1475.6 \text{ kg/s}
    $$

**Reflection:** Each step systematically breaks down the formula. Step 1 confirms we can use the specialized choked flow equation. Step 3 ensures unit consistency (Pascals, not MPa). Steps 4 and 5 handle the trickiest part of the formula separately to avoid calculation errors. The final step combines everything to yield the mass flow rate, which is the primary performance metric determined by the throat.

## Diagrams
A converging-diverging (de Laval) nozzle showing choked flow properties.

```text
      P_0, T_0 (Stagnation)
      V ~ 0
      M << 1
        |
        |
      \       /   <-- Converging Section (Subsonic, M < 1, V increases)
       \     /
        \   /
         |=|      <-- Throat (Sonic, M = 1, dA = 0)
        /   \
       /     \
      /       \   <-- Diverging Section (Supersonic, M > 1, V increases)

Flow Direction: Left to Right --->
```

Mass flow rate versus back pressure ratio.

```text
  ^ Mass Flow Rate (m_dot)
  |
  |................... (Choked Flow Regime)
  |                  .
  |                 /
  |                /
  |               / (Unchoked Flow Regime)
  |              /
  |_____________/________________________________> Back Pressure Ratio (P_back / P_0)
  0           P_choked/P_0                  1.0
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a highway with five lanes of traffic (the reservoir) being forced into a single-lane tunnel (the throat). The traffic speeds up as it approaches the tunnel. At the tunnel entrance, the cars are packed bumper-to-bumper, moving as fast as physically possible. This is the choked condition ($M=1$). No matter how clear the road is *after* the tunnel (low back pressure), the cars can't get through the single-lane entrance any faster. The tunnel throat dictates the maximum flow of traffic.

2.  **Must-Know Formulas:**
    *   **The "Why":** Area-Velocity Relation.
        $$ \frac{dA}{A} = (M^2 - 1)\frac{dV}{V} $$
    *   **The "How Much":** Choked Mass Flow Rate.
        $$ \dot{m}_{max} = A^* P_0 \sqrt{\frac{\gamma}{R T_0}} \left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}} $$

3.  **Spaced Repetition Schedule:** Review these derivations and formulas at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively re-derive them from scratch each time.

4.  **First Principles Pathway:** If you forget the choked flow formula, rebuild it.
    *   Start with $\dot{m} = \rho A V$.
    *   Use the isentropic relations to replace $\rho$ and $V$ with expressions involving $P_0, T_0$, and $M$.
        *   $\frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2 \implies T = T_0(...)^{-1}$
        *   $\frac{\rho_0}{\rho} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\frac{1}{\gamma-1}} \implies \rho = \rho_0(...)^{-\frac{1}{\gamma-1}}$
        *   $V = M a = M \sqrt{\gamma R T}$. Substitute for T.
    *   Substitute these into $\dot{m} = \rho A V$.
    *   You will have $\dot{m}$ as a function of $A$ and $M$. To find the maximum, set $A=A^*$ and $M=1$. This will yield the formula.

## Common mistakes
1.  **Applying the choked formula when the flow isn't choked.** The flow only chokes if the back pressure is low enough. Specifically, for a converging nozzle, the ratio of back pressure to stagnation pressure ($P_b/P_0$) must be at or below the critical pressure ratio, which is $\left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)}$.
2.  **Confusing stagnation and static properties.** The $P_0$ and $T_0$ in the choked flow formula are the stagnation properties in the reservoir where velocity is near zero. Do not use the static pressure or temperature at the throat.
3.  **Assuming $M=1$ anywhere but the throat.** For a flow accelerating from subsonic to supersonic, the sonic condition can only occur at the point of minimum area. A constant-area duct cannot accelerate a subsonic flow to sonic speeds without other effects like heating or friction.
4.  **Thinking mass flow increases in the diverging section.** The mass flow rate, $\dot{m}$, is constant throughout the nozzle (conservation of mass). The velocity and Mach number increase in the diverging section (for supersonic flow), but the density decreases by a corresponding amount to keep $\dot{m} = \rho A V$ constant.

## Self-check
1.  A converging nozzle exhausts air from a large tank to the atmosphere. The flow is choked at the exit. If the specific heat ratio $\gamma=1.4$, what is the pressure at the exit plane as a fraction of the tank's stagnation pressure?
2.  Two identical converging-diverging nozzles are connected to identical reservoirs of gas ($P_0, T_0$). Nozzle A uses helium ($\gamma = 1.67$) and Nozzle B uses carbon dioxide ($\gamma = 1.29$). Which nozzle will have a higher choked mass flow rate, and why?
3.  You are designing a supersonic wind tunnel using a de Laval nozzle. The flow is choked at the throat. You decide you need a higher Mach number at the test section (exit). Without changing the reservoir conditions or the throat area, what single geometric parameter of the nozzle must you change, and in what direction? Explain your reasoning using the isentropic relations.