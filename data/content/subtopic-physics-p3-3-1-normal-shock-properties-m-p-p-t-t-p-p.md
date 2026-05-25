## What it is
A normal shock wave is an infinitesimally thin discontinuity in a supersonic flow, oriented perpendicular (normal) to the flow direction. Across this shock, the fluid properties—Mach number ($M$), static pressure ($P$), static temperature ($T$), and density ($\rho$)—change almost instantaneously, while the stagnation temperature ($T_0$) remains constant. The process is highly irreversible, causing a decrease in stagnation pressure ($P_0$).

## Why it matters
Normal shocks are fundamental to high-speed aerodynamics and propulsion. They occur in supersonic engine inlets (e.g., scramjets) to slow the flow to subsonic speeds for combustion, and they form ahead of blunt bodies during atmospheric re-entry, creating immense heat and pressure. Understanding these property changes is non-negotiable for designing any vehicle or engine that operates at supersonic speeds.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **1D Conservation Laws:** Conservation of mass, momentum, and energy for a control volume.
2.  **Thermodynamics of Ideal Gases:** The ideal gas law ($P=\rho R T$) and the definitions of specific heats ($c_p$, $c_v$) and their ratio ($\gamma = c_p/c_v$).
3.  **Isentropic Flow Relations:** You must understand the definitions of stagnation (or total) properties ($P_0, T_0$) and how they relate to static properties via the Mach number. Crucially, you must understand *why* a shock is **not** an isentropic process.

If these concepts are not solid, review them first. You cannot derive the shock relations without them.

## How to study it (step by step)
1.  **Draw the Control Volume:** Start by drawing a 1D control volume across an infinitesimally thin normal shock. Label the upstream state "1" and the downstream state "2".
2.  **Write the Governing Equations:** Apply the integral form of the conservation laws (mass, momentum, energy) to this control volume, assuming steady, adiabatic flow with no body forces.
3.  **Derive the Rankine-Hugoniot Relations:** Simplify the integral equations into their algebraic form. These three equations relate the properties ($P, \rho, u, h$) in state 2 to state 1.
4.  **Introduce the Mach Number:** Use the definitions of Mach number ($M = u/a$, where $a = \sqrt{\gamma R T}$) and enthalpy for a calorically perfect gas ($h = c_p T$) to rewrite the Rankine-Hugoniot relations purely in terms of $M_1$, $\gamma$, and the property ratios ($P_2/P_1$, etc.). This is the most algebra-intensive step.
5.  **Derive the Stagnation Pressure Ratio:** Using the results from the previous step and the definition of stagnation pressure from isentropic relations, derive the expression for $P_{02}/P_{01}$. This step solidifies why the process is irreversible.
6.  **Solve a Canonical Problem:** Pick a standard upstream Mach number, like $M_1=2.0$, and calculate all five property ratios for air ($\gamma=1.4$). Use the derived formulas.

## Key ideas, with intuition
1.  **Shocks are Compressive and Irreversible:** A shock wave is nature's way of abruptly compressing a supersonic flow to a subsonic state. This process is violent and chaotic at the molecular level, which generates a significant amount of entropy. The tell-tale sign of this irreversibility is the loss of stagnation pressure ($P_{02} < P_{01}$).
2.  **Stagnation Temperature is Conserved:** For an adiabatic flow (no heat added or removed), the total energy is conserved. Since stagnation enthalpy ($h_0 = h + u^2/2$) is a measure of total energy, it is constant across the shock. For a perfect gas, $h_0 = c_p T_0$, so stagnation temperature is also constant.
    $$T_{01} = T_{02}$$
    Do not mistake this for an isentropic process. Constant $T_0$ with a drop in $P_0$ is the hallmark of an adiabatic, irreversible process.
3.  **The Upstream Mach Number Dictates Everything:** All the downstream properties are uniquely determined by the upstream Mach number, $M_1$, and the gas property, $\gamma$. There are no other free parameters. This makes the normal shock relations incredibly powerful predictive tools. The key relation from which others are derived is for the downstream Mach number, $M_2$:
    $$M_2^2 = \frac{M_1^2 + \frac{2}{\gamma-1}}{\frac{2\gamma}{\gamma-1}M_1^2 - 1}$$
4.  **Flow Always Decelerates to Subsonic:** For any upstream supersonic flow ($M_1 > 1$), the downstream flow will always be subsonic ($M_2 < 1$). As $M_1 \to \infty$, the downstream Mach number $M_2$ approaches a finite limit, which for air ($\gamma=1.4$) is $\approx 0.378$. The shock acts as a powerful brake.

## Worked example
**Problem:** Air ($\gamma = 1.4$, $R = 287$ J/kg·K) at an upstream Mach number of $M_1 = 2.5$, static pressure $P_1 = 50$ kPa, and static temperature $T_1 = 220$ K flows through a normal shock wave. Find $M_2$, $P_2$, $T_2$, $\rho_2$, and $P_{02}$.

**Solution:**

1.  **Calculate $M_2$:**
    Substitute $M_1=2.5$ and $\gamma=1.4$ into the Mach number relation.
    $$M_2^2 = \frac{(2.5)^2 + \frac{2}{1.4-1}}{\frac{2(1.4)}{1.4-1}(2.5)^2 - 1} = \frac{6.25 + 5}{7(6.25) - 1} = \frac{11.25}{43.75 - 1} = \frac{11.25}{42.75} \approx 0.2631$$
    $$M_2 = \sqrt{0.2631} \approx 0.513$$
    *Reflection: As expected, the supersonic flow ($M_1=2.5$) became subsonic ($M_2 \approx 0.513$).*

2.  **Calculate $P_2/P_1$ and $P_2$:**
    The pressure ratio is given by:
    $$\frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1) = 1 + \frac{2(1.4)}{1.4+1}((2.5)^2 - 1) = 1 + \frac{2.8}{2.4}(5.25) = 1 + 6.125 = 7.125$$
    $$P_2 = P_1 \times 7.125 = 50 \text{ kPa} \times 7.125 = 356.25 \text{ kPa}$$
    *Reflection: The static pressure increased dramatically, which is the defining feature of a shock.*

3.  **Calculate $T_2/T_1$ and $T_2$:**
    The temperature ratio is given by:
    $$\frac{T_2}{T_1} = \left[1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1)\right] \frac{2+(\gamma-1)M_1^2}{(\gamma+1)M_1^2} = \frac{P_2}{P_1} \frac{2+(\gamma-1)M_1^2}{(\gamma+1)M_1^2}$$
    $$\frac{T_2}{T_1} = (7.125) \frac{2+(0.4)(2.5)^2}{(2.4)(2.5)^2} = (7.125) \frac{2+2.5}{15} = (7.125) \frac{4.5}{15} = 2.1375$$
    $$T_2 = T_1 \times 2.1375 = 220 \text{ K} \times 2.1375 = 470.25 \text{ K}$$
    *Reflection: The static temperature also increased significantly due to the compressive work done on the gas.*

4.  **Calculate $\rho_2/\rho_1$ and $\rho_2$:**
    The density ratio is given by:
    $$\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{2+(\gamma-1)M_1^2} = \frac{(2.4)(2.5)^2}{2+(0.4)(2.5)^2} = \frac{15}{2+2.5} = \frac{15}{4.5} \approx 3.333$$
    Alternatively, using the ideal gas law: $\frac{\rho_2}{\rho_1} = \frac{P_2/P_1}{T_2/T_1} = \frac{7.125}{2.1375} \approx 3.333$.
    To find $\rho_2$, first find $\rho_1 = P_1 / (R T_1) = 50000 / (287 \times 220) \approx 0.791$ kg/m³.
    $$\rho_2 = \rho_1 \times 3.333 \approx 0.791 \times 3.333 \approx 2.636 \text{ kg/m}^3$$
    *Reflection: The density increased, as expected from compression. The ideal gas law provides a useful check.*

5.  **Calculate $P_{02}/P_{01}$ and $P_{02}$:**
    The stagnation pressure ratio is given by:
    $$\frac{P_{02}}{P_{01}} = \left[\frac{(\gamma+1)M_1^2}{2+(\gamma-1)M_1^2}\right]^{\frac{\gamma}{\gamma-1}} \left[\frac{\gamma+1}{2\gamma M_1^2 - (\gamma-1)}\right]^{\frac{1}{\gamma-1}}$$
    $$\frac{P_{02}}{P_{01}} = \left[\frac{\rho_2}{\rho_1}\right]^{\frac{\gamma}{\gamma-1}} \left[\frac{P_1}{P_2} \frac{\gamma+1}{1-\frac{\gamma-1}{2\gamma M_1^2}}\right]^{\frac{1}{\gamma-1}} \text{ (This is complex, let's use the values)}$$
    $$\frac{P_{02}}{P_{01}} = \left[\frac{(2.4)(2.5)^2}{2+(0.4)(2.5)^2}\right]^{\frac{1.4}{0.4}} \left[\frac{2.4}{2(1.4)(2.5)^2 - 0.4}\right]^{\frac{1}{0.4}} = \left[\frac{15}{4.5}\right]^{3.5} \left[\frac{2.4}{17.5-0.4}\right]^{2.5} = (3.333)^{3.5} (0.14035)^{2.5} \approx 0.499$$
    To find $P_{02}$, first find $P_{01}$ using the isentropic relation:
    $$P_{01} = P_1 \left(1 + \frac{\gamma-1}{2}M_1^2\right)^{\frac{\gamma}{\gamma-1}} = 50 \left(1 + \frac{0.4}{2}(2.5)^2\right)^{3.5} = 50(1+1.25)^{3.5} = 50(2.25)^{3.5} \approx 854.6 \text{ kPa}$$
    $$P_{02} = P_{01} \times 0.499 \approx 854.6 \times 0.499 \approx 426.4 \text{ kPa}$$
    *Reflection: The stagnation pressure dropped by over 50%, confirming the highly irreversible nature of the shock.*

## Diagrams
```text
           NORMAL SHOCK
Flow Direction ---->
+---------------------------------------+
|                                       |
|      Region 1        |      Region 2  |
|                      |                |
|      Supersonic      |      Subsonic  |
|      M₁ > 1          |      M₂ < 1    |
|      Low P₁, T₁, ρ₁  |      High P₂, T₂, ρ₂ |
|                      |                |
|                      |                |
|      u₁              |      u₂        |
|      --->            |      -->       |
|                      |                |
+---------------------------------------+
                     ^
                     |
            Infinitesimally thin
            discontinuity
```

## Memory technique — remember this forever
1.  **The Story: The "Supersonic Traffic Jam".** Imagine cars (fluid particles) moving on a highway faster than the speed of sound. Suddenly, they encounter an invisible wall—the shock wave. They can't communicate upstream to warn others because they're moving too fast. The result is a massive, instantaneous pile-up. Cars slam into each other, creating a region of high density (high $\rho_2$), high pressure (high $P_2$), and a lot of heat from the wreckage (high $T_2$). The overall "ability to move" (stagnation pressure, $P_0$) is permanently damaged, and the traffic slows to a crawl (subsonic, $M_2 < 1$).
2.  **Must Overlearn Formulas:**
    *   Downstream Mach Number: $M_2^2 = \frac{M_1^2 + \frac{2}{\gamma-1}}{\frac{2\gamma}{\gamma-1}M_1^2 - 1}$
    *   Static Pressure Ratio: $\frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1)$
3.  **Spaced Repetition Schedule:** Review your derivations and these formulas at: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read them; re-derive them from the conservation laws on day 7.
4.  **First Principles Pathway:** If you forget everything, you can always re-derive it.
    *   Draw the 1D control volume.
    *   Write the three conservation equations:
        *   Mass: $\rho_1 u_1 = \rho_2 u_2$
        *   Momentum: $P_1 + \rho_1 u_1^2 = P_2 + \rho_2 u_2^2$
        *   Energy: $h_1 + \frac{u_1^2}{2} = h_2 + \frac{u_2^2}{2}$
    *   Substitute $h=c_p T$, $P=\rho R T$, $c_p = \frac{\gamma R}{\gamma-1}$, and $u=M\sqrt{\gamma R T}$. The algebra will lead you back to the final forms.

## Common mistakes
1.  **Applying Isentropic Relations Across the Shock:** You CANNOT use $P_{01} = P_{02}$ or $P_2/P_1 = (T_2/T_1)^{\gamma/(\gamma-1)}$ across a shock. These relations assume a reversible, isentropic process. A shock is the antithesis of that.
2.  **Confusing Static and Stagnation Properties:** Remember $T_{01} = T_{02}$ (stagnation temperature is constant) but $T_1 \neq T_2$ (static temperature increases). Similarly, $P_{01} > P_{02}$ (stagnation pressure drops) while $P_1 < P_2$ (static pressure rises). Be precise.
3.  **Algebraic Errors in the Derivation:** The derivation is algebra-heavy. A common mistake is losing a term or misplacing a squared sign when substituting the Mach number definition. Work slowly and check your steps.
4.  **Assuming a Shock Can Form in Subsonic Flow:** Normal shocks only form when the upstream flow is supersonic ($M_1 > 1$). The equations will yield non-physical results if you plug in $M_1 < 1$.

## Self-check
1.  A normal shock occurs in a flow of helium ($\gamma = 5/3$) with an upstream Mach number $M_1 = 3.0$. Calculate the downstream Mach number $M_2$ and the density ratio $\rho_2/\rho_1$.
2.  Air ($\gamma=1.4$) flows through a normal shock. A pressure transducer measures the static pressure to be 4.5 times higher downstream than upstream ($P_2/P_1 = 4.5$). What was the upstream Mach number, $M_1$?
3.  A supersonic wind tunnel is designed to produce a Mach 2.5 flow in its test section. A normal shock is observed in the test section. If the air in the reservoir supplying the tunnel is at $P_0 = 1$ MPa, what is the stagnation pressure that would be measured by a Pitot tube placed downstream of the shock?