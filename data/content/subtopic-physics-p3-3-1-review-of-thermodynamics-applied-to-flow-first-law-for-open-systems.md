## What it is
The first law of thermodynamics for an open system, or control volume, is a statement of energy conservation for a defined region in space where mass is allowed to cross the boundaries. It states that the rate of change of energy within the control volume equals the net rate at which energy enters via heat transfer and mass flow, minus the net rate at which energy leaves via work and mass flow. This extends the familiar closed-system law ($dU = \delta Q - \delta W$) to account for energy carried by the fluid itself.

## Why it matters
This principle is the cornerstone for analyzing nearly all aerospace propulsion and power systems. It governs the energy balances in jet engine components (compressors, combustors, turbines, nozzles), rocket engines, and the flow through wind tunnels. Understanding how heat addition and work extraction change a fluid's energy is fundamental to calculating thrust, power, and aerodynamic heating.

## When to study it
You must be comfortable with the first law for a closed system ($U_2 - U_1 = Q - W$). You should also have a solid grasp of the definitions of fundamental thermodynamic properties: internal energy ($u$), enthalpy ($h$), pressure ($P$), density ($\rho$), and the distinction between a system (fixed mass) and a control volume (fixed region). Familiarity with basic calculus, specifically time derivatives, is also required.

## How to study it (step by step)
1.  **Review the closed-system first law.** Write down the law for a fixed mass: $dE = \delta Q - \delta W$, where $E$ is the total energy (internal + kinetic + potential). Remind yourself that $Q$ is heat added *to* the system and $W$ is work done *by* the system.
2.  **Define a Control Volume (CV).** Draw a box representing a jet engine. Sketch fluid entering and leaving. This is your CV. The boundary is the control surface (CS). Unlike a closed system, mass crosses the CS.
3.  **Derive the energy balance.** Start with the basic principle:
    $$ \frac{dE_{CV}}{dt} = \dot{E}_{in} - \dot{E}_{out} $$
    This says the rate of energy accumulation inside the CV is the rate of energy coming in minus the rate of energy going out.
4.  **Identify all energy transfer mechanisms.** Energy can cross the CS in three ways:
    *   Heat transfer at a rate $\dot{Q}$.
    *   Work done at a rate $\dot{W}$.
    *   Energy convected by mass flow, $\dot{m}e$, where $e$ is the specific energy of the fluid.
5.  **Deconstruct the work term.** The work rate $\dot{W}$ has two parts: shaft work $\dot{W}_s$ (e.g., a turbine spinning a shaft) and flow work. Flow work is the work needed to push fluid into or out of the CV. The rate of flow work is force times velocity: $(PA) \times V$. Since mass flow rate $\dot{m} = \rho A V$, the flow work rate is $\dot{m}(P/\rho)$ or $\dot{m}(Pv)$, where $v$ is specific volume.
6.  **Assemble the full equation.** Combine the terms. The energy carried by the fluid is internal, kinetic, and potential: $e = u + \frac{V^2}{2} + gz$.
    $$ \frac{dE_{CV}}{dt} = \dot{Q} - \dot{W}_s + \sum_{in} \dot{m}_{in} \left( u_{in} + P_{in}v_{in} + \frac{V_{in}^2}{2} + gz_{in} \right) - \sum_{out} \dot{m}_{out} \left( u_{out} + P_{out}v_{out} + \frac{V_{out}^2}{2} + gz_{out} \right) $$
7.  **Introduce enthalpy.** Notice the term $u+Pv$. This is defined as specific enthalpy, $h$. Substituting this in simplifies the equation immensely. For a steady-state system ($dE_{CV}/dt = 0$) with one inlet and one outlet ($\dot{m}_{in} = \dot{m}_{out} = \dot{m}$), we get the workhorse equation for aerospace devices.

## Key ideas, with intuition
1.  **Control volumes are stationary observers.** Instead of tracking a moving parcel of air (a system), we fix our attention on a component like a nozzle or a turbine (a control volume) and watch mass and energy flow through it. This is a much more practical approach for engineering analysis.
2.  **Mass carries energy with it.** This is the crucial difference from a closed system. A kilogram of fluid entering your control volume doesn't just bring its mass; it brings its internal energy, its kinetic energy, and its potential energy. The first law for an open system is simply the closed-system law with extra terms to account for this energy convection.
3.  **Enthalpy ($h$) is the total energy of a *flowing* fluid.** Think of a parcel of fluid trying to enter a pressurized control volume. It has its own internal energy ($u$). But to get in, it must push the fluid already there out of the way. The work required to do this is its pressure times its volume ($Pv$). Enthalpy combines these two: the energy the fluid *has* ($u$) plus the energy it *cost* to get it into position ($Pv$).
    $$ h = u + Pv $$
4.  **Total enthalpy ($h_0$) is the stagnation energy.** In high-speed flow, the kinetic energy is significant. It's convenient to group the specific enthalpy and specific kinetic energy into a single term called the total specific enthalpy, or stagnation enthalpy. It represents the enthalpy the fluid would have if you brought it to a stop adiabatically.
    $$ h_0 = h + \frac{V^2}{2} $$
    Using this, the steady-state energy equation becomes beautifully simple:
    $$ \dot{Q} - \dot{W}_s = \dot{m} (h_{0,out} - h_{0,in}) $$

## Worked example
**Problem:** Air flows steadily through an adiabatic nozzle. At the inlet, the temperature is $T_1 = 600 \text{ K}$, the pressure is $P_1 = 700 \text{ kPa}$, and the velocity is $V_1 = 150 \text{ m/s}$. At the exit, the pressure is $P_2 = 100 \text{ kPa}$. Assuming air behaves as an ideal gas with $c_p = 1005 \text{ J/kg}\cdot\text{K}$, find the exit velocity $V_2$.

**Solution:**
1.  **State the governing equation.** We use the steady-state, single-inlet, single-outlet energy equation.
    $$ \dot{Q} - \dot{W}_s = \dot{m} \left[ (h_2 - h_1) + \frac{1}{2}(V_2^2 - V_1^2) + g(z_2 - z_1) \right] $$
2.  **Apply problem constraints to simplify.**
    *   "Adiabatic" means there is no heat transfer: $\dot{Q} = 0$.
    *   A nozzle is a passive device with no moving parts to do shaft work: $\dot{W}_s = 0$.
    *   Assume the nozzle is horizontal so the change in potential energy is negligible: $g(z_2 - z_1) = 0$.
    *   The mass flow rate $\dot{m}$ is constant, so we can divide it out.
    The equation simplifies to:
    $$ 0 = (h_2 - h_1) + \frac{1}{2}(V_2^2 - V_1^2) $$
3.  **Rearrange and substitute for enthalpy.** For an ideal gas, the change in specific enthalpy is $\Delta h = c_p \Delta T$.
    $$ h_1 + \frac{1}{2}V_1^2 = h_2 + \frac{1}{2}V_2^2 $$
    This is a statement that the total enthalpy is conserved. We need to find $T_2$ to find $h_2$. For an adiabatic and reversible (isentropic) process in an ideal gas, we have the relation:
    $$ \frac{T_2}{T_1} = \left(\frac{P_2}{P_1}\right)^{(\gamma-1)/\gamma} $$
    For air, $\gamma = 1.4$.
    $$ T_2 = T_1 \left(\frac{P_2}{P_1}\right)^{(1.4-1)/1.4} = 600 \text{ K} \left(\frac{100 \text{ kPa}}{700 \text{ kPa}}\right)^{0.4/1.4} = 600 \times (1/7)^{0.2857} \approx 343.4 \text{ K} $$
4.  **Solve for the exit velocity, $V_2$.**
    $$ \frac{1}{2}V_2^2 = h_1 - h_2 + \frac{1}{2}V_1^2 $$
    $$ V_2^2 = 2(h_1 - h_2) + V_1^2 = 2c_p(T_1 - T_2) + V_1^2 $$
    $$ V_2^2 = 2(1005 \text{ J/kg}\cdot\text{K})(600 \text{ K} - 343.4 \text{ K}) + (150 \text{ m/s})^2 $$
    $$ V_2^2 = 2(1005)(256.6) + 22500 = 515766 + 22500 = 538266 \text{ m}^2/\text{s}^2 $$
    $$ V_2 = \sqrt{538266} \approx 733.7 \text{ m/s} $$

**Reflection:** Each step systematically reduced a general principle to fit the specific problem. We started with the full energy equation (Step 1), used the problem statement to eliminate terms (Step 2), introduced the appropriate equation of state for enthalpy and found the exit temperature using isentropic relations (Step 3), and finally solved for the unknown variable (Step 4). The physics shows that the fluid's thermal energy (enthalpy) was converted into kinetic energy, causing a large increase in velocity.

## Diagrams
A general steady-state control volume with one inlet and one outlet.

```text
                  +--------------------------------+
                  |                                |
                  |         CONTROL VOLUME         |
                  |             (CV)               |
                  |                                |
                  |                                |
      ------>     |                                |     ------>
      m_dot       |             .                  |     m_dot
  P_1, T_1, h_1   |             . W_s (out)        | P_2, T_2, h_2
  V_1, z_1        |             ^                  | V_2, z_2
                  |             |                  |
                  | .............................. |
                  | . Q_dot (in)                   |
                  +--------------------------------+
                        Control Surface (CS)
```

## Memory technique — remember this forever
1.  **The Story: The Energy Tollbooth.** Imagine your control volume (a jet engine) is a tollbooth on an energy highway. Energy can't be created or destroyed, it just pays tolls and changes form.
    *   Cars (mass flow $\dot{m}$) arrive carrying cash (enthalpy $h$) and speed (kinetic energy $V^2/2$).
    *   The tollbooth can add energy by heating the road ($\dot{Q}_{in}$).
    *   The tollbooth can do work by spinning a generator ($\dot{W}_{out}$).
    *   The cars leave with a new amount of cash and speed.
    *   The law is just the accounting: (Heat Added) - (Work Done) = (Energy of cars leaving) - (Energy of cars arriving).
2.  **Must-learn formulas:**
    *   Definition of enthalpy: $h = u + Pv$
    *   Steady-state energy equation (single inlet/outlet, neglecting potential energy):
        $$ \dot{Q} - \dot{W}_s = \dot{m} \left( (h_2 - h_1) + \frac{V_2^2 - V_1^2}{2} \right) $$
    *   The same equation using total enthalpy ($h_0 = h + V^2/2$):
        $$ \dot{Q} - \dot{W}_s = \dot{m} (h_{0,2} - h_{0,1}) $$
3.  **Spaced repetition schedule:** Review this concept and re-derive the main formula at **1 day, 3 days, 7 days, 16 days, and 35 days**.
4.  **First principles pathway:** If you forget the formula, rebuild it.
    *   Start with "Rate of Energy Change in CV = Rate In - Rate Out".
    *   What are the ways energy can cross the boundary? Heat ($\dot{Q}$), Work ($\dot{W}$), and Mass ($\dot{m}e$).
    *   Work has two parts: shaft work ($\dot{W}_s$) and flow work ($\dot{m}Pv$).
    *   Energy carried by mass has three parts: internal ($u$), kinetic ($V^2/2$), and potential ($gz$).
    *   Assemble: $\frac{dE_{CV}}{dt} = \dot{Q} - \dot{W}_s + \dot{m}_{in}(u_{in}+P_{in}v_{in}+...) - \dot{m}_{out}(u_{out}+P_{out}v_{out}+...)$.
    *   Recognize $u+Pv=h$. Assume steady state ($dE_{CV}/dt=0$) and one inlet/outlet. You have now re-derived the formula.

## Common mistakes
1.  **Using internal energy $u$ instead of enthalpy $h$.** This is the most common error. You are forgetting to account for the flow work ($Pv$) required to move mass across the control surface. Open systems almost always use enthalpy.
2.  **Unit mismatch between enthalpy and kinetic energy.** Enthalpy from tables is often in kJ/kg, while kinetic energy ($V^2/2$) calculated from $V$ in m/s will be in J/kg. You must divide the kinetic energy term by 1000 to work in kJ, or multiply the enthalpy by 1000 to work in J.
3.  **Incorrectly applying the ideal gas enthalpy relation.** The relation $\Delta h = c_p \Delta T$ is only valid for a calorically perfect gas (where $c_p$ is constant). For very large temperature changes, you may need to use thermodynamic tables that account for the variation of $c_p$ with temperature.
4.  **Sign convention for work and heat.** Be rigorous. The standard convention used here is $\dot{Q}$ is positive *in* to the system, and $\dot{W}_s$ is positive *out* of the system (work done by the fluid, e.g., in a turbine). A compressor requires work input, so $\dot{W}_s$ would be negative.

## Self-check
1.  Air enters a pipe at 300 K and is heated by an electric resistor. It exits at 800 K. If the pipe is horizontal and the inlet and exit velocities are negligible, what is the heat added per kilogram of air?
2.  Steam enters a turbine with a total enthalpy of $h_{0,1} = 3200 \text{ kJ/kg}$ and exits with a total enthalpy of $h_{0,2} = 2400 \text{ kJ/kg}$. The process is adiabatic. If the mass flow rate is $1.5 \text{ kg/s}$, what is the power output of the turbine in kilowatts?
3.  In a jet engine combustor, fuel is added and burned, releasing $42,000 \text{ kJ}$ for every kilogram of fuel. Air enters the combustor with a total enthalpy of $600 \text{ kJ/kg}$ and the air-to-fuel ratio is 50:1 by mass. What is the total enthalpy of the exhaust gas mixture per kilogram of mixture? (Assume the mass of the fuel is added to the mass of the air).