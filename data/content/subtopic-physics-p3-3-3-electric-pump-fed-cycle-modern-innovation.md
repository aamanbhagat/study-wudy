## What it is
The electric pump-fed cycle is a rocket engine design where the propellant pumps are driven by high-power electric motors, rather than by a gas turbine. These motors are powered by a dedicated energy source, typically a battery pack, which is consumed during the engine's operation. This decouples the pump power source from the main propellant flow, simplifying engine plumbing and control.

## Why it matters
This cycle is a significant modern innovation, most famously used in Rocket Lab's Rutherford engine for their Electron rocket. It enables highly controllable, restartable, and potentially cheaper engines, especially for smaller launch vehicles where traditional turbopumps don't scale down well. Understanding this cycle is key to analyzing the frontier of commercial spaceflight, where electrification and novel manufacturing (like 3D printing, which Rocket Lab also uses) are changing the economics of launch.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Tsiolkovsky Rocket Equation:** The fundamental relationship between delta-v, specific impulse, and mass ratio.
2.  **Basic Propulsion Cycles:** You must understand the difference between pressure-fed, gas-generator, and staged-combustion cycles. The electric pump-fed cycle is best understood as an alternative to these.
3.  **Fluid Dynamics:** Specifically, the concept of pressure ($p$), mass flow rate ($\dot{m}$), density ($\rho$), and the work done on a fluid.
4.  **Basic Electrodynamics:** Power ($P$), voltage ($V$), current ($I$), and energy ($E$). You must understand that $P = IV$ and that battery capacity is measured in energy units (e.g., Watt-hours).

If you are not confident in these prerequisites, review them first. The trade-offs of this cycle are incomprehensible without them.

## How to study it (step by step)
1.  **Derive the Pump Power Equation:** Start from the first principle of work done on a fluid, $W = \int p \, dV$. Derive the expression for the ideal hydraulic power required to increase a fluid's pressure.
2.  **Incorporate Real-World Losses:** Modify the ideal power equation to include motor and pump efficiencies ($\eta_{motor}, \eta_{pump}$). This gives you the required *electrical* power from the battery.
3.  **Analyze the Mass Budget:** Calculate the total battery mass required for a given burn time, using the electrical power from step 2 and a given battery specific energy (in Wh/kg or J/kg). This is the critical step for understanding the system's primary drawback.
4.  **Compare and Contrast:** Create a table comparing the electric pump-fed cycle to a gas-generator cycle. List pros and cons for each in terms of complexity, performance ($I_{sp}$), control (throttling), and primary mass penalties (batteries vs. turbine/gas generator).
5.  **Case Study:** Research the specifications of the Rocket Lab Rutherford engine. Find its thrust, $I_{sp}$, and the claimed power of its electric motors. Use your derived equations to estimate the battery mass required for a typical flight.

## Key ideas, with intuition
1.  **Decoupling Power from Propellant:** In a traditional gas-generator cycle, you tap off a small amount of main propellant, burn it in a pre-burner, and use the hot gas to spin a turbine, which drives the pumps. The power system is intrinsically linked to the propellant. In an electric cycle, the power comes from a battery. This is like the difference between a car with a turbocharger (spun by exhaust gas) and one with an electric supercharger (spun by a motor). The electric system is more directly and precisely controllable.

2.  **The Governing Power Equation:** The heart of the analysis is the power required by the pumps. The ideal hydraulic power ($P_{hyd}$) needed to deliver a mass flow rate $\dot{m}$ of a fluid with density $\rho$ at a pressure increase of $\Delta p$ is:
    $$ P_{hyd} = \frac{\dot{m} \Delta p}{\rho} $$
    *Intuition:* You need more power if you want to move more mass per second ($\dot{m}$), or push it against a higher pressure difference ($\Delta p$). It's easier to pump less dense fluids ($\rho$ in the denominator). To get the required *electrical* power, you must account for the inefficiency ($\eta$) of the motor and pump:
    $$ P_{elec} = \frac{P_{hyd}}{\eta_{total}} = \frac{\dot{m} \Delta p}{\rho \eta_{pump} \eta_{motor}} $$

3.  **The Tyranny of the Rocket Equation:** The primary trade-off is mass. Batteries are heavy. The mass of the battery pack ($m_{batt}$) is a direct penalty to the rocket's dry mass. This mass must be justified by the benefits (simplicity, control) or offset by other mass savings. The entire viability of this cycle depends on the specific energy of modern batteries—how much energy they can store per kilogram. This is why this cycle is a *modern* innovation; it was not feasible with the battery technology of the 1960s.

## Worked example
**Problem:** A small upper-stage engine uses an electric pump-fed cycle. It produces $25 \text{ kN}$ of thrust with an $I_{sp}$ of $340 \text{ s}$. It pumps RP-1 kerosene ($\rho \approx 820 \text{ kg/m}^3$) into a combustion chamber operating at $p_{chamber} = 10 \text{ MPa}$. Assume the tank pressure is negligible, so $\Delta p \approx p_{chamber}$. The combined pump and motor efficiency is $\eta_{total} = 55\%$. The battery system has a specific energy of $200 \text{ Wh/kg}$. Calculate the battery mass required for a burn of $t_{burn} = 300 \text{ s}$.

**Step 1: Calculate the required mass flow rate ($\dot{m}$).**
Thrust is given by $F = \dot{m} I_{sp} g_0$. We solve for $\dot{m}$.
$$ \dot{m} = \frac{F}{I_{sp} g_0} = \frac{25000 \text{ N}}{340 \text{ s} \times 9.81 \text{ m/s}^2} \approx 7.50 \text{ kg/s} $$
*This step connects the desired thrust to how much propellant we must move per second.*

**Step 2: Calculate the required electrical power ($P_{elec}$).**
We use the power equation. We need to pump both fuel and oxidizer, but for simplicity, this problem considers only the fuel pump's contribution. A full analysis would sum the power for both. Let's assume the given $\dot{m}$ is for the fuel pump we are analyzing.
$$ P_{elec} = \frac{\dot{m} \Delta p}{\rho \eta_{total}} = \frac{(7.50 \text{ kg/s}) (10 \times 10^6 \text{ Pa})}{(820 \text{ kg/m}^3)(0.55)} $$
$$ P_{elec} \approx 166,297 \text{ W} \approx 166.3 \text{ kW} $$
*This step determines how powerful the electric motor and its controller must be.*

**Step 3: Calculate the total energy required ($E_{total}$).**
Energy is power multiplied by time.
$$ E_{total} = P_{elec} \times t_{burn} = 166.3 \text{ kW} \times 300 \text{ s} = 49,890 \text{ kJ} $$
*This step calculates the total energy that must be stored in the battery.*

**Step 4: Convert energy to Watt-hours and calculate battery mass ($m_{batt}$).**
The specific energy is in Watt-hours per kg, so we must convert our energy from Joules.
$1 \text{ Wh} = 3600 \text{ J}$.
$$ E_{total} (\text{Wh}) = \frac{49,890,000 \text{ J}}{3600 \text{ J/Wh}} \approx 13,858 \text{ Wh} $$
Now, find the mass.
$$ m_{batt} = \frac{E_{total} (\text{Wh})}{\text{Specific Energy}} = \frac{13,858 \text{ Wh}}{200 \text{ Wh/kg}} \approx 69.3 \text{ kg} $$
*This final step reveals the mass penalty of the power system. For a small upper stage, 70 kg is a significant mass.*

## Diagrams

A simplified schematic of the electric pump-fed cycle:

```text
+-----------------+
|   Battery Pack  |
|      (Energy   |
|      Source)    |
+-------+---------+
        |
        | Electrical Power
        v
+-----------------+
| Motor Controller|
+-------+---------+
        |
        v
+-----------------+      +----------------+      +----------------+
|  Electric Motor |----->|      Pump      |----->|    Injector    |
+-----------------+      +-------+--------+      +-------+--------+
                                 ^                       |
                                 | Propellant            v
                           +-----+-----+           +-----+-----+
                           | Propellant|           | Combustion|
                           |    Tank   |           |   Chamber |
                           +-----------+           +-----+-----+
                                                         |
                                                         v
                                                       Nozzle
                                                         |
                                                         v
                                                        Thrust
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a Tesla battery pack bolted to the side of a rocket engine. Instead of a complex web of hot gas pipes feeding a turbine, you see a simple, thick orange electrical cable running to a motor. The mantra is: **"Electrons, not Exhaust."**

2.  **Must-Know Formulas:**
    *   Thrust to Mass Flow: $F = \dot{m} I_{sp} g_0$
    *   Electrical Power Requirement: $P_{elec} = \frac{\dot{m} \Delta p}{\rho \eta_{total}}$

3.  **Spaced Repetition Schedule:** Review these formulas and the "Electrons, not Exhaust" hook at **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget the power formula, re-derive it.
    *   Work is pressure times change in volume: $dW = p \, dV$.
    *   Power is work per time: $P = \frac{dW}{dt} = p \frac{dV}{dt}$.
    *   Mass flow rate is density times volume flow rate: $\dot{m} = \rho \frac{dV}{dt}$, so $\frac{dV}{dt} = \frac{\dot{m}}{\rho}$.
    *   Substitute: $P = p \frac{\dot{m}}{\rho}$.
    *   This is for a pressure $p$. We care about the *change* in pressure, $\Delta p$. This gives the ideal hydraulic power.
    *   Real systems have losses. Divide by efficiency $\eta$ to get the input power needed. You always need *more* input power than you get useful output power.

## Common mistakes
1.  **Forgetting Efficiency:** Calculating the ideal hydraulic power and forgetting to divide by $\eta_{total}$. This will drastically underestimate the required electrical power and battery mass.
2.  **Ignoring Battery Mass:** Praising the simplicity of the cycle without acknowledging that the battery mass is a significant performance penalty that must be overcome with very high specific energy.
3.  **Units Mismatch:** Mixing Pascals with Megapascals, or Joules with Watt-hours in the same equation. Always convert to base SI units (meters, kilograms, seconds, Watts, Joules) for the physics calculation, then convert back to conventional units (Wh) only when needed.
4.  **Summing Power:** A real engine has two pumps (fuel and oxidizer). The total electrical power is the sum of the power required for each pump: $P_{total} = P_{fuel} + P_{ox}$. Many students forget to account for both.

## Self-check
1.  What is the primary component in an electric pump-fed cycle that is absent in a gas-generator cycle, and what component does it replace?
2.  An engineer proposes using a new motor-pump unit that is 10% more efficient (e.g., $\eta$ goes from 0.50 to 0.55). Assuming all other parameters remain constant, by what percentage does the required battery mass decrease?
3.  A competing rocket company uses a gas-generator cycle. Their turbopump and gas generator assembly has a mass of 50 kg. The small amount of propellant they divert to the gas generator reduces their effective specific impulse by 2%. Using the numbers from the worked example (battery mass of 69.3 kg), which system is "better" from a mass perspective for a 300-second burn? Justify your answer with a brief, quantitative argument.