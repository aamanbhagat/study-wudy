## What it is
A converging nozzle is a duct whose cross-sectional area continuously decreases in the direction of flow. In the specific case of subsonic flow reaching Mach 1 at the exit, the fluid enters at a speed below the speed of sound ($M<1$) and is accelerated precisely to the speed of sound ($M=1$) at the narrowest point, which is the nozzle exit. This condition is known as "choked flow."

## Why it matters
Choked flow is the principle that governs the maximum flow rate through any constriction, from a simple valve to the throat of a rocket engine. In rocket propulsion, the throat of the de Laval nozzle is a converging section that chokes the flow, setting a fixed mass flow rate for given chamber conditions. This predictable, maximum flow rate is fundamental to calculating engine thrust and performance.

## When to study it
You must have a solid grasp of the following before proceeding:
1.  **Conservation Laws for a Control Volume:** Specifically, conservation of mass (the continuity equation, $\dot{m} = \rho A u$) and conservation of energy (the steady flow energy equation).
2.  **Isentropic Flow Relations:** The relationships between pressure, temperature, and density for a compressible fluid undergoing a reversible, adiabatic process.
3.  **Stagnation Properties:** The definitions of stagnation pressure ($p_0$), stagnation temperature ($T_0$), and stagnation density ($\rho_0$).
4.  **Mach Number:** The definition and physical meaning of $M = u/a$, where $u$ is the flow speed and $a$ is the local speed of sound.

If any of these are weak, review them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Derive the Area-Velocity Relation.** Start with the differential forms of the continuity equation and Euler's equation (momentum for inviscid flow). Combine them to derive the fundamental relationship: $\frac{dA}{A} = (M^2-1)\frac{du}{u}$. This is the most important derivation in this section.
2.  **Analyze the Area-Velocity Relation for Subsonic Flow.** Set $M<1$ in the equation from step 1. Observe that for the area to decrease ($dA<0$, a converging nozzle), the velocity must increase ($du>0$). This proves *why* a converging nozzle accelerates subsonic flow.
3.  **Define the Critical Condition.** The "critical" condition is where $M=1$. At this point, the Area-Velocity relation shows that $\frac{dA}{A}=0$, meaning the area must be at a local minimum (a "throat"). For a simple converging nozzle, this can only happen at the exit.
4.  **Derive the Isentropic Relations for M=1.** Take the standard isentropic relations for pressure and temperature ($p_0/p$ and $T_0/T$) and substitute $M=1$. This gives you the fixed ratios for pressure ($p^*/p_0$) and temperature ($T^*/T_0$) at the choked throat.
5.  **Solve a Choking Problem.** Use a standard problem setup: given reservoir conditions ($p_0, T_0$) and a converging nozzle, calculate the exit pressure, temperature, velocity, and mass flow rate *assuming* the nozzle is choked. This solidifies the application of the formulas from step 4.
6.  **Consider the Mass Flow Rate.** Derive the expression for the maximum (choked) mass flow rate, $\dot{m}_{\text{max}}$. Notice that it depends only on the upstream stagnation conditions ($p_0, T_0$) and the throat area ($A^*$), not on the pressure downstream of the exit. This is the key insight of choked flow.

## Key ideas, with intuition
1.  **The "Information" Speed Limit.** The speed of sound is the speed at which pressure waves (information about downstream conditions) propagate upstream. When the flow at the exit reaches the speed of sound ($M=1$), downstream pressure changes can no longer travel upstream past the exit. The nozzle is now "unaware" of the conditions outside, and its mass flow rate becomes fixed, or "choked."

2.  **Subsonic Flow is "Incompressible-Like".** For subsonic flow ($M<1$), the fluid density doesn't change very much as it accelerates. The continuity equation $\dot{m} = \rho A u$ is dominated by the trade-off between area $A$ and velocity $u$. To keep the product constant, as area $A$ goes down, velocity $u$ must go up.
    $$ \frac{dA}{A} = (M^2-1)\frac{du}{u} $$
    For $M<1$, the term $(M^2-1)$ is negative. So, for $dA<0$ (converging), we must have $du>0$ (accelerating).

3.  **Energy is a Zero-Sum Game.** The flow's total energy is fixed (constant stagnation enthalpy, $h_0$, and thus constant stagnation temperature, $T_0$). To gain kinetic energy ($\frac{1}{2}u^2$), the fluid must give up thermal energy (enthalpy $h$, and thus static temperature $T$). As velocity increases, temperature drops.
    $$ T_0 = T + \frac{u^2}{2c_p} \implies T_0 = T \left(1 + \frac{\gamma-1}{2}M^2\right) $$

4.  **The Critical Ratios are Fixed by Physics.** When $M=1$, the isentropic relations simplify to fixed ratios that depend only on the specific heat ratio, $\gamma$. For air ($\gamma=1.4$), the pressure and temperature at the sonic throat are always a fixed fraction of the stagnation values.
    $$ \frac{p^*}{p_0} = \left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)} \approx 0.528 \quad (\text{for air}) $$
    $$ \frac{T^*}{T_0} = \frac{2}{\gamma+1} \approx 0.833 \quad (\text{for air}) $$
    This means if you know the reservoir pressure, you immediately know the pressure at the choked exit.

## Worked example
**Problem:** A large reservoir of air ($\gamma=1.4$, $R=287$ J/kg·K) at $p_0 = 1.0$ MPa and $T_0 = 500$ K feeds a converging nozzle with an exit area of $A_e = 10 \text{ cm}^2$. The pressure outside the nozzle (back pressure) is low enough to ensure choked flow. Find the pressure, temperature, velocity, and mass flow rate at the exit.

**Solution:**
1.  **Identify the condition:** The flow is choked, so the Mach number at the exit is $M_e=1$. The exit area is the critical area, $A_e = A^*$.

2.  **Calculate exit static pressure ($p_e$):** Since $M_e=1$, we use the critical pressure ratio.
    $$ p_e = p^* = p_0 \left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)} $$
    $$ p_e = (1.0 \times 10^6 \text{ Pa}) \left(\frac{2}{1.4+1}\right)^{1.4/(1.4-1)} = (1.0 \times 10^6 \text{ Pa}) (0.52828) $$
    $$ p_e \approx 528.3 \text{ kPa} $$

3.  **Calculate exit static temperature ($T_e$):** Similarly, use the critical temperature ratio.
    $$ T_e = T^* = T_0 \left(\frac{2}{\gamma+1}\right) $$
    $$ T_e = (500 \text{ K}) \left(\frac{2}{1.4+1}\right) = (500 \text{ K}) (0.83333) $$
    $$ T_e \approx 416.7 \text{ K} $$

4.  **Calculate exit velocity ($u_e$):** At the exit, $M_e=1$, so the velocity is equal to the local speed of sound, $u_e = a_e$.
    $$ a_e = \sqrt{\gamma R T_e} $$
    $$ u_e = \sqrt{(1.4)(287 \text{ J/kg·K})(416.7 \text{ K})} = \sqrt{167584} $$
    $$ u_e \approx 409.4 \text{ m/s} $$

5.  **Calculate mass flow rate ($\dot{m}$):** Use the continuity equation at the exit. First find the density $\rho_e$ from the ideal gas law.
    $$ \rho_e = \frac{p_e}{R T_e} = \frac{528.3 \times 10^3 \text{ Pa}}{(287 \text{ J/kg·K})(416.7 \text{ K})} \approx 4.415 \text{ kg/m}^3 $$
    Now, use $\dot{m} = \rho_e A_e u_e$. Convert area to m$^2$: $10 \text{ cm}^2 = 10 \times (10^{-2} \text{ m})^2 = 0.001 \text{ m}^2$.
    $$ \dot{m} = (4.415 \text{ kg/m}^3)(0.001 \text{ m}^2)(409.4 \text{ m/s}) $$
    $$ \dot{m} \approx 1.808 \text{ kg/s} $$

**Reflection:** Each step builds on the last. We first established the state of the gas ($M_e=1$), which allowed us to find the static properties ($p_e, T_e$) using the fixed critical ratios. With the static temperature, we found the speed of sound, which is the exit velocity. Finally, with all exit properties known, the continuity equation gave the mass flow rate.

## Diagrams
A simple converging nozzle with flow properties labeled.

```text
        Reservoir
 (p_0, T_0, u_0 ≈ 0)
        +-------+
       /         \
======<           |
 Flow  \         /
------> +-------+ ----------------> Jet
 (p, T, u, M)   (p_e, T_e, u_e, M_e=1)

         <------ L ------>

       x=0             x=L
       Inlet           Exit (Throat)
       A(x=0)          A(x=L) = A_e = A*
```

## Memory technique — remember this forever
1.  **The Story: The Fire Hose.** Imagine a firefighter holding a fire hose with a simple converging nozzle. To get a faster stream of water (accelerate the flow), they use a nozzle that gets narrower. This is the subsonic part. Now, imagine the water is a compressible gas. As you squeeze the nozzle more and more (lower the back pressure), the gas speeds up until it hits a "speed limit" at the exit—the speed of sound. At this point, the hose is "choked." No matter how much you try to suck the gas out from the other side, the hose can't deliver any more mass per second. The exit itself has become the bottleneck, and the flow rate is now maxed out.

2.  **Must Overlearn:**
    *   $T_0/T = 1 + \frac{\gamma-1}{2}M^2$ (Energy conservation)
    *   $p_0/p = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\gamma/(\gamma-1)}$ (Isentropic pressure relation)
    *   At the throat when choked: $M=1$. This is the key condition.

3.  **Spaced Repetition Schedule:** Review this material and re-work the example problem from memory at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget everything, rebuild from the **Area-Velocity Relation**.
    *   Start with mass: $d(\rho A u) = 0$.
    *   And momentum (Euler): $dp = -\rho u du$.
    *   And sound speed: $a^2 = dp/d\rho$.
    *   Combine them algebraically. The result is $\frac{dA}{A} = (M^2-1)\frac{du}{u}$. This single equation tells you that for $M<1$, a converging duct ($dA<0$) must accelerate the flow ($du>0$), and that the only place $M=1$ can exist is where $dA=0$ (a throat).

## Common mistakes
1.  **Using stagnation pressure in the ideal gas law.** The ideal gas law, $p=\rho R T$, relates *static* properties at a single point in the flow. Never mix static and stagnation properties in this equation (e.g., writing $p_0 = \rho R T_0$ is incorrect unless $\rho$ is also $\rho_0$).
2.  **Assuming the exit pressure equals the back pressure.** When a nozzle is choked, the exit pressure $p_e$ is fixed at the critical pressure $p^*$. The external back pressure $p_b$ can be much lower. The flow expands from $p_e$ to $p_b$ *outside* the nozzle in a series of expansion waves.
3.  **Forgetting to convert units.** A common error is mixing cm$^2$ with m$^2$ or kPa with Pa. Always convert to base SI units (m, kg, s, K, Pa) before calculating.

## Self-check
1.  A subsonic flow of air enters a converging nozzle. As it flows through the nozzle, does its static temperature increase, decrease, or stay the same? Justify your answer using a physical principle.
2.  A converging nozzle is connected to a reservoir with $p_0 = 800$ kPa. The nozzle exhausts to an environment where the pressure is slowly lowered from 800 kPa. At what environmental pressure will the nozzle first choke?
3.  For a choked converging nozzle, the mass flow rate is given by $\dot{m}_{\text{max}} = A^* \frac{p_0}{\sqrt{T_0}} \sqrt{\frac{\gamma}{R}\left(\frac{2}{\gamma+1}\right)^{(\gamma+1)/(\gamma-1)}}$. Starting from the continuity equation ($\dot{m}=\rho A u$) and the isentropic relations, derive this expression.