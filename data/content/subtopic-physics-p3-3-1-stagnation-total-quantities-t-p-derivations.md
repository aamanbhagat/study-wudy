## What it is
Stagnation quantities (also called total quantities) represent the thermodynamic properties a fluid parcel would attain if it were brought to rest (decelerated to zero velocity) through a frictionless, adiabatic process. We denote stagnation temperature as $T_0$, stagnation pressure as $P_0$, and stagnation density as $\rho_0$. They represent the sum of the static properties and the flow's kinetic energy, expressed in thermodynamic terms.

## Why it matters
These concepts are fundamental to analyzing high-speed flight and propulsion. An aircraft's pitot tube measures stagnation pressure to calculate airspeed, and the temperature at the leading edge of a supersonic wing approaches the stagnation temperature. In rocket engine design, the conditions in the combustion chamber are effectively stagnation conditions, which determine the maximum performance achievable through the nozzle.

## When to study it
You must be comfortable with the following before proceeding. If not, review them first.
- **First Law of Thermodynamics:** Specifically, the steady-flow energy equation.
- **Enthalpy:** The definition $h = u + Pv$ and its relation to temperature for a calorically perfect gas, $h = c_p T$.
- **Perfect Gas Law:** $P = \rho R T$.
- **Isentropic Relations:** The relationships between $P$, $\rho$, and $T$ for a reversible, adiabatic process (e.g., $P/ \rho^\gamma = \text{constant}$).
- **Mach Number:** The definition $M = V/a$, where $a = \sqrt{\gamma R T}$ is the local speed of sound.

## How to study it (step by step)
1.  **Derive Stagnation Enthalpy:** Start with the steady-flow energy equation for an adiabatic flow with no shaft work: $h_1 + \frac{1}{2}V_1^2 = h_2 + \frac{1}{2}V_2^2$. This shows that the quantity $h + \frac{1}{2}V^2$ is constant. Define this constant as the stagnation enthalpy, $h_0$.
2.  **Derive Stagnation Temperature ($T_0$):** For a calorically perfect gas, $h = c_p T$. Substitute this into the stagnation enthalpy definition: $c_p T_0 = c_p T + \frac{1}{2}V^2$. Isolate $T_0$ and then manipulate the equation using the definitions of Mach number ($M=V/a$) and the speed of sound ($a^2=\gamma R T$) to express the ratio $T_0/T$ purely in terms of $M$ and $\gamma$.
3.  **Derive Stagnation Pressure ($P_0$):** The process of bringing the flow to rest is defined as isentropic. Therefore, we can use the isentropic relation between temperature and pressure: $\frac{P_2}{P_1} = \left(\frac{T_2}{T_1}\right)^{\gamma/(\gamma-1)}$. Apply this to the static state (1) and stagnation state (2) to find the expression for $P_0/P$ using your result for $T_0/T$.
4.  **Derive Stagnation Density ($\rho_0$):** Follow the exact same logic as for pressure, but use the isentropic relation between temperature and density: $\frac{\rho_2}{\rho_1} = \left(\frac{T_2}{T_1}\right)^{1/(\gamma-1)}$.
5.  **Solve a Problem:** Take a freestream flow of air ($\gamma=1.4$, $R=287$ J/kg·K) at $T=250$ K, $P=50$ kPa, and $V=600$ m/s. Calculate the Mach number first, then find $T_0$, $P_0$, and $\rho_0$. Check your units at every step.
6.  **Physical Intuition Check:** Ask yourself: Where does the energy come from to raise the temperature from $T$ to $T_0$? The answer must be the kinetic energy of the flow. Verify that the terms in your derived equations make physical sense (e.g., as $M \to 0$, $T_0 \to T$).

## Key ideas, with intuition
1.  **Energy is Conserved, Just Re-packaged.** The core idea is the conservation of energy. Stagnation enthalpy, $h_0$, is the total energy per unit mass of the fluid. It remains constant in an adiabatic flow.
    $$
    h_0 = h + \frac{1}{2}V^2 = \text{constant}
    $$
    This equation states that the total energy is a sum of the internal (thermal) energy, represented by enthalpy $h$, and the macroscopic directed kinetic energy, $\frac{1}{2}V^2$. Stagnation is the state where all kinetic energy has been converted back into thermal energy.

2.  **Temperature is a Measure of Total Enthalpy.** For a perfect gas, $h = c_p T$. This allows us to write the energy equation in terms of temperature, which is easier to measure and conceptualize.
    $$
    c_p T_0 = c_p T + \frac{1}{2}V^2
    $$
    $T_0$ is simply a convenient name for the total specific energy of the flow, scaled by the specific heat capacity $c_p$. It's the temperature the fluid would reach if you stopped it perfectly.

3.  **Isentropic Compression Links Everything.** The assumption that the deceleration is *isentropic* (reversible and adiabatic) is the key that unlocks the formulas for pressure and density. Without this, we only know $T_0$. With it, we can use the well-known power-law relations to link the change in temperature to changes in pressure and density.
    $$
    \frac{P_0}{P} = \left(\frac{T_0}{T}\right)^{\frac{\gamma}{\gamma-1}} \quad \text{and} \quad \frac{\rho_0}{\rho} = \left(\frac{T_0}{T}\right)^{\frac{1}{\gamma-1}}
    $$
    This is the mathematical bridge connecting the energy conservation principle (which gives us $T_0$) to the other thermodynamic properties.

## Worked example
**Problem:** A jet flies at Mach 2.0 at an altitude where the ambient (static) temperature is $T = 220$ K and the ambient (static) pressure is $P = 25$ kPa. Assume air is a perfect gas with $\gamma = 1.4$. Find the stagnation temperature and pressure on the nose of the aircraft.

**Solution:**

1.  **Identify knowns:**
    -   Mach number, $M = 2.0$
    -   Static temperature, $T = 220$ K
    -   Static pressure, $P = 25$ kPa
    -   Ratio of specific heats, $\gamma = 1.4$

2.  **Calculate Stagnation Temperature ($T_0$):**
    Start with the stagnation temperature formula.
    $$
    \frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2
    $$
    Substitute the known values:
    $$
    \frac{T_0}{220 \text{ K}} = 1 + \frac{1.4-1}{2}(2.0)^2 = 1 + \frac{0.4}{2}(4) = 1 + 0.2(4) = 1.8
    $$
    Solve for $T_0$:
    $$
    T_0 = 1.8 \times 220 \text{ K} = 396 \text{ K}
    $$
    *Reflection: This step applies the direct consequence of the energy equation. The kinetic energy of the Mach 2 flow is converted into thermal energy, significantly raising the temperature at the stagnation point.*

3.  **Calculate Stagnation Pressure ($P_0$):**
    Use the isentropic relation for pressure, which leverages the temperature ratio we just found.
    $$
    \frac{P_0}{P} = \left(\frac{T_0}{T}\right)^{\frac{\gamma}{\gamma-1}}
    $$
    We already calculated $T_0/T = 1.8$. Now calculate the exponent:
    $$
    \frac{\gamma}{\gamma-1} = \frac{1.4}{1.4-1} = \frac{1.4}{0.4} = 3.5
    $$
    Substitute the values into the pressure relation:
    $$
    \frac{P_0}{25 \text{ kPa}} = (1.8)^{3.5} \approx 7.824
    $$
    Solve for $P_0$:
    $$
    P_0 \approx 7.824 \times 25 \text{ kPa} = 195.6 \text{ kPa}
    $$
    *Reflection: This step uses the assumption of an isentropic process to determine the pressure rise that accompanies the temperature rise. The large increase in pressure is due to both the compression of the fluid (density increase) and its temperature increase.*

**Final Answer:** The stagnation temperature is 396 K and the stagnation pressure is 195.6 kPa.

## Diagrams
A streamline approaching a blunt body, illustrating the concept of a stagnation point.

```text
      P, T, ρ, V -> 0
      (Stagnation Point)
           |
           *
          / \
         /   \
        /     \
-------> ------> |       |
Freestream      | Blunt |
P, T, ρ, V      | Body  |
-------> ------> |       |
        \     /
         \   /
          \ /
```
The diagram shows parallel streamlines of a fluid with static properties $P, T, \rho$ and velocity $V$. As the central streamline impacts the blunt body, its velocity is forced to zero at the stagnation point (*). At this single point, the fluid's properties become the stagnation properties $P_0, T_0, \rho_0$.

## Memory technique — remember this forever
1.  **The Story: The "Kinetic Energy Tax".** Imagine a fluid parcel is a tiny car driving on a highway. Its speed is its kinetic energy. When it exits the highway and comes to a complete stop at a toll booth (the stagnation point), it must pay a "tax". This tax is paid by converting all its kinetic energy into heat and pressure. The faster the car was going (higher Mach number), the higher the tax. $T_0$ and $P_0$ are the "post-tax" conditions at the toll booth.

2.  **Must Overlearn These Formulas:**
    $$
    \frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2
    $$
    $$
    \frac{P_0}{P} = \left(\frac{T_0}{T}\right)^{\frac{\gamma}{\gamma-1}}
    $$
    $$
    \frac{\rho_0}{\rho} = \left(\frac{T_0}{T}\right)^{\frac{1}{\gamma-1}}
    $$
    Notice how the pressure and density formulas are just the temperature formula plugged into the standard isentropic relations. If you know the first one and the isentropic laws, you know them all.

3.  **Spaced Repetition Schedule:** Review these derivations and formulas at these intervals:
    -   24 hours
    -   3 days
    -   7 days
    -   16 days
    -   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it from the **Steady Flow Energy Equation**.
    -   $h + \frac{1}{2}V^2 = h_0$ (Definition)
    -   $c_p T + \frac{1}{2}V^2 = c_p T_0$ (Substitute $h=c_p T$)
    -   Divide by $c_p T$: $\frac{T_0}{T} = 1 + \frac{V^2}{2 c_p T}$
    -   Use $c_p = \frac{\gamma R}{\gamma-1}$ and $a^2 = \gamma R T$: $\frac{V^2}{2c_p T} = \frac{V^2(\gamma-1)}{2\gamma R T} = \frac{V^2}{a^2} \frac{\gamma-1}{2} = M^2 \frac{\gamma-1}{2}$.
    -   This recovers the $T_0/T$ formula. The others follow from isentropic relations.

## Common mistakes
1.  **Confusing Static vs. Stagnation.** $T$ is the actual temperature of the gas as it flies by. $T_0$ is the much higher temperature at the point where it stops (e.g., the tip of a probe). Never use $T_0$ to calculate the local speed of sound. The speed of sound is *always* $a = \sqrt{\gamma R T}$.
2.  **Applying Isentropic Relations Across a Shock.** These formulas assume an isentropic process. Flow across a shock wave is *not* isentropic. While $T_0$ is conserved across a normal shock, $P_0$ is not. You cannot use the stagnation pressure formula to relate conditions upstream and downstream of a shock.
3.  **Using Celsius or Fahrenheit.** All thermodynamic calculations in this field require absolute temperature units (Kelvin or Rankine). Using Celsius will lead to completely wrong answers because the ratios will be incorrect.
4.  **Incompressible Assumption.** For low speeds ($M < 0.3$), it's common to use Bernoulli's equation, which is an incompressible formulation. The formulas derived here are for compressible flow. Using the stagnation pressure formula for $M=0.1$ will give a nearly identical result to Bernoulli's, but using Bernoulli's for $M=2$ is catastrophically wrong.

## Self-check
1.  Air ($\gamma=1.4$) flows with a static temperature of 288 K and a stagnation temperature of 350 K. What is the flow's Mach number?
2.  Starting from $P_0/P = (1 + \frac{\gamma-1}{2}M^2)^{\gamma/(\gamma-1)}$, use the binomial expansion $(1+x)^n \approx 1+nx$ for small $x$ to show that for low Mach numbers, the stagnation pressure formula simplifies to the incompressible Bernoulli equation result: $P_0 \approx P + \frac{1}{2}\rho V^2$.
3.  A rocket is in a static test fire. The combustion chamber has a pressure of 3000 kPa and a temperature of 3500 K. The gas velocity in the chamber is negligible. The gas ($\gamma=1.2$, $R=450$ J/kg·K) is then expanded through a nozzle to an exit where the static pressure is 100 kPa. What is the temperature and velocity of the gas at the nozzle exit, assuming an isentropic expansion?