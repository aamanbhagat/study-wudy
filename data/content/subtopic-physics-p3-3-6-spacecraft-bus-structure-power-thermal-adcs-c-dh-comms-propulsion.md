## What it is
The spacecraft bus is the foundational infrastructure of a satellite that supports the mission's payload (the scientific instruments or primary cargo). It is composed of seven core subsystems: Structure, Power (EPS), Thermal, Attitude Determination and Control (ADCS), Command and Data Handling (C&DH), Communications (Comms), and Propulsion. If the payload is the passenger, the bus is the chassis, engine, and dashboard of the vehicle.

## Why it matters
In aerospace systems engineering, the bus dictates the physical and financial limits of a mission. Every trade study revolves around it: adding a heavier sensor (payload) requires more power (EPS), which generates more heat (Thermal), requiring a larger radiator and a stronger skeleton (Structure), which increases total mass and demands more fuel (Propulsion) to maintain orbit. Understanding the bus is how you transition from analyzing isolated physics problems to designing complex, coupled engineering systems.

## When to study it
You must already understand:
1. **Classical Mechanics:** Rigid body dynamics, moments of inertia, and conservation of angular momentum.
2. **Thermodynamics:** Heat transfer, specifically the Stefan-Boltzmann law of radiation.
3. **Electromagnetism:** Basic DC circuits (power) and the inverse-square law (RF communications).
If you cannot calculate the angular momentum of a spinning disk or the equilibrium temperature of a radiating blackbody, review those concepts before proceeding.

## How to study it (step by step)
1. **Map the interfaces:** Draw a block diagram of the seven subsystems. Draw arrows representing the flow of data, power, and heat between them.
2. **Master the Power Budget:** Calculate the required solar array area to run a hypothetical 500 W bus, factoring in solar cell efficiency and battery charging for eclipse periods.
3. **Derive Thermal Equilibrium:** Set up the heat balance equation for a spacecraft in sunlight. Understand the difference between absorbed solar flux and emitted infrared radiation.
4. **Analyze ADCS from first principles:** Apply $\vec{\tau} = \frac{d\vec{H}}{dt}$ to a spacecraft using reaction wheels. Prove that spinning a wheel clockwise forces the spacecraft to spin counter-clockwise.
5. **Trace a command:** Write down the step-by-step path of a "fire thruster" command originating at a ground station, passing through Comms, decoded by C&DH, and executed by Propulsion.
6. **Perform a Mass Budget:** Compile a hypothetical list of subsystem masses. Apply a standard 20% dry mass margin to account for design uncertainties.

## Key ideas, with intuition
**1. The Zero-Sum Game of Mass and Power**
A spacecraft is strictly constrained by the launch vehicle's throw mass and the geometry of its solar panels. Every subsystem competes for a slice of the mass and power budgets. C&DH might require 50 W, ADCS 100 W, and Thermal 30 W. The EPS must generate and store this exact sum, plus margin.

**2. Thermal Equilibrium in a Vacuum**
Space is not "cold"; it is a vacuum. Heat cannot convect away; it must be radiated. The temperature of a spacecraft is purely a balance between incoming energy (solar radiation + internal electronics heat) and outgoing energy (blackbody radiation). 
$$ \alpha A_{sun} q_{solar} + Q_{internal} = \epsilon A_{rad} \sigma T^4 $$
Where $\alpha$ is absorptivity, $\epsilon$ is emissivity, $q_{solar}$ is solar flux ($\approx 1361 \text{ W/m}^2$ at Earth), and $\sigma$ is the Stefan-Boltzmann constant.

**3. ADCS and Conservation of Angular Momentum**
Attitude is orientation (where you are pointing); altitude is height. ADCS controls attitude. Because a spacecraft is in a vacuum, external torques are minimal. To rotate the spacecraft, you use internal reaction wheels. By conservation of angular momentum ($\vec{H}_{total} = \text{constant}$), accelerating a wheel in one direction forces the spacecraft bus to rotate in the opposite direction.

## Worked example
**Problem:** Calculate the equilibrium temperature of a spherical spacecraft bus (radius $r = 1 \text{ m}$, uniform surface) in deep space illuminated by the Sun. Assume no Earth albedo or infrared radiation.
*Given:* Solar flux $q_{solar} = 1361 \text{ W/m}^2$. Absorptivity $\alpha = 0.5$, emissivity $\epsilon = 0.8$. Internal power dissipation from C&DH and Comms $Q_{int} = 200 \text{ W}$.

**Step 1: Calculate incoming solar heat.**
The Sun only hits the *projected cross-sectional area* of the sphere, which is a circle ($\pi r^2$).
$$ Q_{in} = \alpha A_{projected} q_{solar} = 0.5 \cdot (\pi \cdot 1^2) \cdot 1361 \approx 2138 \text{ W} $$

**Step 2: Calculate total heat load.**
$$ Q_{total} = Q_{in} + Q_{int} = 2138 + 200 = 2338 \text{ W} $$

**Step 3: Set up the radiation equation.**
The spacecraft radiates heat from its *entire surface area* ($4\pi r^2$).
$$ Q_{out} = \epsilon A_{surface} \sigma T^4 = 0.8 \cdot (4\pi \cdot 1^2) \cdot (5.67 \times 10^{-8}) \cdot T^4 $$
$$ Q_{out} \approx 5.70 \times 10^{-7} \cdot T^4 $$

**Step 4: Equate and solve for $T$.**
$$ 2338 = 5.70 \times 10^{-7} \cdot T^4 $$
$$ T^4 \approx 4.10 \times 10^9 \implies T \approx 253 \text{ K} \text{ (or } -20^\circ\text{C)} $$

*Reflection:* Notice the geometry. The spacecraft absorbs heat through an area of $\pi r^2$ but radiates it away through an area of $4\pi r^2$. This factor of 4 is the fundamental reason why spherical objects in space stabilize at specific temperatures.

## Diagrams

```text
                     +-------------------+
                     |    SOLAR PANELS   |
                     +---------+---------+
                               | (Power)
+---------------+    +---------v---------+    +---------------+
|     COMMS     |<---|    POWER (EPS)    |--->|     ADCS      |
| (Transceiver) |    | (Batteries/PDU)   |    | (Star Tracker/|
+-------+-------+    +---------+---------+    |  React. Wheel)|
        |                      | (Power)      +-------+-------+
 (Data) |            +---------v---------+            |
        +----------->|       C&DH        |<-----------+ (Data)
                     | (Flight Computer) |
        +----------->|                   |<-----------+
 (Data) |            +---------+---------+            | (Data)
+-------+-------+              |              +-------+-------+
|    PAYLOAD    |              | (Commands)   |  PROPULSION   |
|  (Telescope)  |              v              |  (Thrusters)  |
+---------------+    +-------------------+    +---------------+
                     | THERMAL & STRUCT. |
                     | (Chassis/Radiator)|
                     +-------------------+
```

## Memory technique — remember this forever
1. **Mnemonic for the 7 Subsystems:** **S**pacecraft **C**an **A**lways **P**rovide **T**he **C**oolest **P**ayloads.
   (*Structure, Comms, ADCS, Power, Thermal, C&DH, Propulsion*).
2. **Formulas to overlearn:** 
   * Thermal Balance: $\alpha A_{in} q + Q_{int} = \epsilon A_{out} \sigma T^4$
   * ADCS Momentum: $\Delta \vec{H}_{bus} = -\Delta \vec{H}_{wheels}$
3. **Spaced-repetition schedule:** Review this system map and derive the thermal balance equation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget how a subsystem behaves, fall back on conservation laws. Power and Thermal are governed by Conservation of Energy (Watts in = Watts out). ADCS is governed by Conservation of Angular Momentum.

## Common mistakes
* **Confusing Attitude with Altitude:** Attitude is controlled by ADCS (pointing). Altitude is controlled by Propulsion (orbit raising/station keeping).
* **Forgetting the vacuum environment:** Students often try to apply convective cooling to spacecraft thermal problems. There is no air; heat is *only* managed via conduction (internally) and radiation (externally).
* **Mixing up projected vs. surface area:** When calculating solar heating, use the flat projected area facing the sun. When calculating radiation cooling, use the total emitting surface area of the radiator.

## Self-check
1. If a spacecraft is placed in an orbit where it experiences eclipses (shadows) for 40% of its orbit, which two subsystems must be heavily modified compared to a spacecraft in constant sunlight?
2. A ground station sends a command to point the spacecraft's camera at a specific star. Trace the exact sequence of subsystems this command interacts with, from reception to physical execution.
3. Derive the required solar panel area $A_{sp}$ for a spacecraft that requires a continuous $P_{req}$ watts, given a solar flux $q$, solar cell efficiency $\eta$, and a sun-incidence angle $\theta$ (where $\theta=0$ is face-on to the sun).