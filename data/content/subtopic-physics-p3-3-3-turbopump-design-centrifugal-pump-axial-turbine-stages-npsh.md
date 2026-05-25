## What it is
A turbopump is a high-performance rotary machine that uses a gas turbine to drive one or more pumps on a common shaft. In a rocket engine, the turbine is powered by hot gas (often from a gas generator or preburner), and it drives pumps that force liquid propellants (fuel and oxidizer) into the combustion chamber at extremely high pressures.

## Why it matters
Turbopumps are the heart of nearly all high-performance liquid-propellant rocket engines, from the F-1 on the Saturn V to the Raptor on Starship. They enable the engine to achieve very high chamber pressures ($P_c$), which is a primary driver for increasing specific impulse ($I_{sp}$) and thrust-to-weight ratio. Without them, we would be limited to low-pressure, inefficient pressure-fed engine cycles.

## When to study it
Before tackling this, you must have a firm grasp of several prerequisite concepts.
1.  **Fluid Dynamics:** Incompressible flow, Bernoulli's principle, the continuity equation ($\dot{m} = \rho A v$), and the concept of static vs. total pressure.
2.  **Thermodynamics:** Isentropic flow relations for ideal gases (for the turbine), enthalpy, and the First Law of Thermodynamics as applied to control volumes (Steady Flow Energy Equation).
3.  **Classical Mechanics:** Conservation of angular momentum, rotational kinematics (angular velocity $\omega$, tangential velocity $U = \omega r$), and the relationship between power, torque, and angular velocity ($P = \tau \omega$).

If you are not confident with the Euler turbomachine equation, derived from angular momentum, you are not ready.

## How to study it (step by step)
1.  **Derive the Euler Turbomachine Equation.** Start with the change in angular momentum of a fluid parcel passing through a rotor. Relate the change in angular momentum to torque ($\tau$), and then relate torque to power ($P$). This is the first-principles basis for all turbomachinery.
2.  **Draw and Analyze Velocity Triangles.** For a centrifugal pump impeller, draw the inlet (1) and outlet (2) velocity triangles. Decompose the absolute velocity vector ($\vec{V}$) into the blade velocity ($\vec{U}$) and the relative fluid velocity ($\vec{W}$), i.e., $\vec{V} = \vec{U} + \vec{W}$. Understand what each component represents physically.
3.  **Connect Euler's Equation to Pump Head.** Use the result from step 1 to define the "ideal head" ($H_{ideal}$) added to the fluid by the pump. Understand how this ideal energy input relates to the actual pressure rise ($\Delta P$) through the pump efficiency ($\eta_p$).
4.  **Analyze an Axial Turbine Stage.** Draw the velocity triangles for a single axial turbine stage (stator and rotor). Apply the Euler equation again, but this time to see how energy is *extracted* from the hot gas to generate shaft power. Note the sign change compared to the pump.
5.  **Understand Cavitation and NPSH.** Research the phenomenon of cavitation: the formation of vapor bubbles when local static pressure drops below the fluid's vapor pressure. Define Net Positive Suction Head (NPSH) and distinguish between NPSH required ($NPSH_R$, a pump property) and NPSH available ($NPSH_A$, a system property). The condition $NPSH_A > NPSH_R$ is a critical design constraint.

## Key ideas, with intuition
1.  **Energy Transfer is All About Tangential Velocity.** The core of any turbomachine is the **Euler Turbomachine Equation**. It states that the work per unit mass ($w$) done on or by the fluid is the change in the product of the blade speed ($U$) and the tangential component of the absolute fluid velocity ($V_u$).
    $$ w = U_2 V_{u2} - U_1 V_{u1} $$
    *Intuition:* You are only doing useful work on the fluid if you are "pushing" it in the direction of rotation. A purely radial velocity component ($V_r$) just moves fluid outward; it doesn't add angular momentum or energy. The $V_u$ component is the "spin" you give the fluid. For a pump, you add spin ($w > 0$). For a turbine, the fluid gives up its spin to the blades ($w < 0$).

2.  **Pumps Create "Head," Not Just Pressure.** While the goal is to increase pressure, it's more fundamental to think of the pump adding energy to the fluid. This energy, expressed per unit weight of fluid, is called "head" ($H$) and has units of length (e.g., meters). The total head is the sum of pressure head ($P/\rho g$), velocity head ($V^2/2g$), and potential head ($z$). The Euler equation gives us the ideal head added by the pump:
    $$ H_{ideal} = \frac{w}{g} = \frac{U_2 V_{u2} - U_1 V_{u1}}{g} $$
    *Intuition:* Imagine lifting a column of water. The height you lift it is the potential head you've given it. A pump does the same thing, but the "height" it provides can be converted into pressure or velocity according to Bernoulli's principle.

3.  **Cavitation is Boiling Without Heat.** If the pressure at the pump inlet drops too low, the liquid propellant will spontaneously boil, forming vapor bubbles. This is called cavitation. When these bubbles collapse downstream in a higher-pressure region of the pump, they create intense shockwaves that can physically destroy the impeller.
    *Intuition:* It's like the "bends" for a pump. A sudden pressure drop causes dissolved gas (or in this case, the liquid itself) to come out of solution, with destructive results.

4.  **NPSH is the Pump's Safety Margin Against Cavitation.** Net Positive Suction Head (NPSH) is the difference between the actual pressure at the pump inlet and the propellant's vapor pressure, expressed as a head.
    $$ NPSH = \frac{P_{inlet} - P_{vapor}}{\rho g} $$
    To prevent cavitation, the available NPSH from the system ($NPSH_A$) must be greater than the required NPSH of the pump ($NPSH_R$).
    *Intuition:* $NPSH_A$ is the "pressure cushion" you have before the liquid starts to boil. $NPSH_R$ is the minimum cushion the pump *needs* to operate without cavitating. Your job as an engineer is to ensure the tank pressure and feed lines provide more cushion than the pump demands.

## Worked example
A centrifugal pump for Liquid Oxygen (LOX, $\rho = 1141 \text{ kg/m}^3$) has an impeller with an outer diameter of $d_2 = 0.2$ m and rotates at $N = 30,000$ rpm. LOX enters the impeller with no pre-swirl (i.e., the tangential velocity at the inlet, $V_{u1}$, is zero). The blades are backward-curved, and the LOX exits the impeller with an absolute velocity tangential component of $V_{u2} = 250$ m/s. Calculate the ideal pressure rise across the pump.

**Step 1: Calculate the impeller tip speed, $U_2$.**
The angular velocity $\omega$ is given by the rotational speed $N$.
$$ \omega = N \times \frac{2\pi \text{ rad}}{1 \text{ rev}} \times \frac{1 \text{ min}}{60 \text{ s}} = 30000 \times \frac{2\pi}{60} \approx 3141.6 \text{ rad/s} $$
The tip speed is $U_2 = \omega r_2 = \omega (d_2/2)$.
$$ U_2 = (3141.6 \text{ rad/s}) \times (0.2 \text{ m} / 2) = 314.16 \text{ m/s} $$
*This step converts the machine's rotational speed into the linear velocity of the impeller tip, which is the primary driver of energy addition.*

**Step 2: Apply the Euler Turbomachine Equation.**
The ideal work per unit mass, $w$, is given by $w = U_2 V_{u2} - U_1 V_{u1}$. We are given $V_{u1} = 0$ (no pre-swirl).
$$ w = (314.16 \text{ m/s})(250 \text{ m/s}) - 0 = 78540 \text{ J/kg} $$
*This step calculates the specific energy transferred to each kilogram of LOX based on the fundamental principle of angular momentum change.*

**Step 3: Relate ideal work to ideal head and pressure rise.**
The ideal head rise is $H_{ideal} = w/g$.
$$ H_{ideal} = \frac{78540 \text{ J/kg}}{9.81 \text{ m/s}^2} \approx 8006 \text{ m} $$
The ideal pressure rise, $\Delta P_{ideal}$, is related to head by $\Delta P = \rho g H$.
$$ \Delta P_{ideal} = \rho \times w = (1141 \text{ kg/m}^3) \times (78540 \text{ J/kg}) $$
$$ \Delta P_{ideal} \approx 8.96 \times 10^7 \text{ Pa} \approx 89.6 \text{ MPa} $$
*This final step converts the abstract concept of energy-per-mass (work) or energy-per-weight (head) into the practical engineering quantity of pressure rise. Note that $\rho g H = \rho w$.*

## Diagrams

**Simplified Turbopump Schematic**
```text
                  HOT GAS IN
                      |
                      V
+------------------------------------------+
|                 TURBINE                  |
|  Stator --> Rotor --> Stator --> Rotor   |
+------------------------------------------+
                      |           ^
                    SHAFT         | HOT GAS OUT
                      |           |
+------------------------------------------+
|                   PUMP                   |
| (Centrifugal Impeller in Volute Casing)  |
+------------------------------------------+
      ^                                |
      |                                V
LOW-PRESSURE                      HIGH-PRESSURE
 PROPELLANT IN                    PROPELLANT OUT
```

**Centrifugal Pump Impeller Outlet Velocity Triangle**
```text
                 /
                / W_2 (Relative Velocity)
               /
              <----/
             /    /| beta_2
            /    / |
           /    /  | V_r2 (Radial)
          /____/___|
         /    /    V_2 (Absolute Velocity)
        /    /    /
       /    /    /
      /____/____/ alpha_2
     |-------->
        U_2 (Blade Velocity)

     |<------>|
       V_u2 (Tangential/Whirl)

Vector Relation: V_2 = U_2 + W_2
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a "Turbopump Tavern." The **Turbine** is a hyper-caffeinated bartender spinning incredibly fast from drinking hot gas. He grabs a spinning shaft. At the other end, the **Pump** (a bouncer) uses the shaft's spin to grab low-energy propellant patrons and violently fling them ($U_2 V_{u2}$) out the high-pressure exit door. But the bouncer gets thirsty and needs to drink from the "inlet" line. **NPSH** is the "Net Positive Soda Head" in his glass—if the level gets too low ($P_{inlet}$ drops near $P_{vapor}$), he starts sucking air (cavitating) and gets so angry he smashes the tavern (the pump).

2.  **Must-Memorize Formulas:**
    *   **Euler's Turbomachine Equation:** $w = U_2 V_{u2} - U_1 V_{u1}$
    *   **NPSH Available:** $NPSH_A = \frac{P_{inlet} - P_{vapor}}{\rho g}$
    *   **Critical Constraint:** $NPSH_A > NPSH_R$

3.  **Spaced Repetition Schedule:** Review these ideas and re-derive the Euler equation from $\tau = \dot{m} \Delta(r V_u)$ at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget Euler's equation, re-derive it.
    *   Start with torque $\tau$ equals the rate of change of angular momentum.
    *   Angular momentum of a mass $m$ is $L = r \times (mv) = m(r V_u)$.
    *   For a mass flow rate $\dot{m}$, the rate of change of angular momentum is $\dot{L} = \dot{m} (r_2 V_{u2} - r_1 V_{u1})$. This is the torque: $\tau = \dot{m} (r_2 V_{u2} - r_1 V_{u1})$.
    *   Power is torque times angular velocity: $P = \tau \omega$.
    *   $P = \dot{m} (r_2 V_{u2} - r_1 V_{u1}) \omega = \dot{m} ( (r_2 \omega) V_{u2} - (r_1 \omega) V_{u1} )$.
    *   Since blade speed $U = r \omega$, we get $P = \dot{m} (U_2 V_{u2} - U_1 V_{u1})$.
    *   Work per unit mass is $w = P/\dot{m}$, which gives you the formula.

## Common mistakes
1.  **Confusing Absolute ($V$) and Relative ($W$) Velocities.** $V$ is the velocity of the fluid as seen by a stationary observer. $W$ is the velocity of the fluid relative to the moving blade. Always draw the velocity triangle and remember the vector addition: $\vec{V} = \vec{U} + \vec{W}$.
2.  **Treating NPSH as a Pump Property.** $NPSH_R$ (Required) is a property of the pump, determined by its design and operating speed. $NPSH_A$ (Available) is a property of the *system*—tank pressure, fluid temperature (which sets vapor pressure), and pressure losses in the feed lines. You can't buy a pump with a certain $NPSH_A$.
3.  **Forgetting Efficiencies.** The Euler equation gives the *ideal* head. The actual pressure rise is lower due to hydraulic losses, and the power required to drive the pump is higher due to mechanical losses. Real-world calculations must include pump efficiency ($\eta_p$) and turbine efficiency ($\eta_t$).
4.  **Ignoring Inlet Conditions.** Assuming $V_{u1} = 0$ is common for a first analysis, but many designs use "inducers" or pre-swirl vanes to give the fluid an initial tangential velocity, which changes the calculation. Always check the inlet conditions.

## Self-check
1.  A turbine stage in a turbopump extracts power from a hot gas stream. In the Euler Turbomachine Equation for this turbine, would you expect the term $(U_2 V_{u2} - U_1 V_{u1})$ to be positive or negative? Why?
2.  Your rocket's LOX tank is pressurized to $P_{tank} = 0.3$ MPa. The LOX has a vapor pressure of $P_{vapor} = 0.15$ MPa. The feed line from the tank to the pump inlet has a total pressure loss of $0.05$ MPa. The pump inlet is at the same height as the tank outlet. Calculate the available NPSH ($NPSH_A$) for this system. Use $\rho_{LOX} = 1141 \text{ kg/m}^3$ and $g = 9.81 \text{ m/s}^2$.
3.  A centrifugal pump has an ideal head rise of 5000 m. The pump's hydraulic efficiency is $\eta_p = 0.75$. The fluid being pumped is kerosene with a density of $\rho = 800 \text{ kg/m}^3$. What is the *actual* pressure rise (in MPa) across the pump?