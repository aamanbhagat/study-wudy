## 1. What it is — in plain English

Imagine a garden hose with a special nozzle designed to spray water very, very fast. If you spray this water into open air, it shoots out in a powerful, straight stream. This is like a rocket engine nozzle working perfectly, where the pressure of the water leaving the nozzle is just right for the surrounding air.

Now, imagine you try to spray that same hose, with the same powerful nozzle, *underwater* into a very deep pool. The water leaving your nozzle is trying to expand and shoot out, but the heavy surrounding water in the pool is pushing back much harder. What happens? The water from your hose doesn't get to expand fully; it gets squished and pushed back, and its flow isn't as straight or as powerful as it would be in the open air.

In rocket science, an "over-expanded nozzle" is exactly like that. It's a rocket nozzle designed to let the exhaust gases expand to a very low pressure, typically for space (vacuum) conditions. But if you fire this nozzle in an environment where the outside air pressure is *much higher* than the pressure the nozzle is trying to achieve at its exit (like firing a vacuum-optimized nozzle at sea level), the outside air pushes back.

This push-back forces the exhaust gases to compress suddenly, not in a smooth way, but through invisible "shocks." These shocks are like tiny, abrupt walls that the gas hits, slowing it down and making it less efficient at producing thrust. The net result is that the rocket doesn't get as much push as it should, and it wastes fuel.

## 2. Why it matters — real-world applications

Understanding over-expanded nozzles is crucial for designing efficient and reliable rocket engines. Here are a few real-world applications:

1.  **Multi-stage Rocket Engine Design (e.g., SpaceX Falcon 9):** Rocket stages operate at different altitudes. The first stage operates from sea level to high altitude, while the upper stage operates primarily in the near-vacuum of space. An upper-stage engine (like the Merlin Vacuum engine on Falcon 9) is designed with a very large nozzle exit area to achieve maximum expansion and efficiency in vacuum. If this engine were fired at sea level, it would be severely over-expanded, leading to significant thrust loss and potential flow separation within the nozzle, which could damage the engine. Conversely, a sea-level optimized engine would be "under-expanded" in vacuum, also losing efficiency. This necessitates different nozzle designs for different stages or the use of complex variable-geometry nozzles.

2.  **Altitude-Compensating Nozzles (e.g., Aerospike Engines):** Traditional bell nozzles are fixed geometry. Aerospike engines, however, are a class of nozzles designed to inherently compensate for changes in ambient pressure. They don't have a traditional bell shape but rather a central "spike" around which the exhaust flows. The effective expansion ratio of an aerospike changes with altitude, making it more efficient across a wider range of ambient pressures, thereby mitigating the over-expansion problem at low altitudes and under-expansion at high altitudes. While not widely used commercially yet, they are a classic example of addressing this challenge.

3.  **Thrust Vector Control (TVC) and Nozzle Separation:** If an over-expanded nozzle experiences flow separation (where the exhaust detaches from the nozzle wall) asymmetrically, it can create significant side loads on the nozzle structure. This can interfere with the engine's ability to steer the rocket (Thrust Vector Control) and, in extreme cases, cause structural damage or even failure of the nozzle. Engineers must design nozzles and operating procedures to avoid or manage flow separation, especially during the ascent phase where ambient pressure changes rapidly.

4.  **Aircraft Jet Engines (Supersonic Nozzles):** While more common in rockets, the principles of nozzle expansion and efficiency also apply to supersonic jet engines, particularly military aircraft designed for high-speed flight. For optimal performance, the jet engine's nozzle exit pressure should ideally match the ambient pressure. Variable-area nozzles are often used to adjust the expansion ratio, preventing over-expansion during takeoff and low-altitude flight, and optimizing performance at high altitudes and supersonic speeds.

## 3. Prerequisites — what you must know first

Before diving deep into over-expanded nozzles, ensure you have a solid grasp of these fundamental concepts:

*   **Nozzle Operation:** Understanding how convergent-divergent (de Laval) nozzles accelerate gas from subsonic to supersonic speeds, with a sonic throat ($M=1$).
*   **Isentropic Flow:** Flow that is adiabatic (no heat transfer) and reversible (no friction or shocks), meaning entropy remains constant. This is the ideal, loss-free model for nozzle flow.
*   **Shock Waves:** Abrupt, thin regions in a supersonic flow where properties (pressure, temperature, density) change discontinuously, and the flow decelerates (becomes subsonic in normal shocks, or remains supersonic but slower in oblique shocks), always accompanied by an increase in entropy.
*   **Mach Number ($M$):** The ratio of the flow speed to the local speed of sound. Crucial for understanding compressible flow.
*   **Pressure, Temperature, Density:** Basic thermodynamic properties of a fluid, and how they relate to each other in compressible flow.
*   **Thrust Equation:** The fundamental equation for rocket propulsion, which includes momentum thrust and pressure-area thrust: $F = \dot{m}V_e + (P_e - P_a)A_e$.
*   **Specific Impulse ($I_{sp}$):** A measure of rocket engine efficiency, representing thrust produced per unit of propellant consumed per unit of time ($I_{sp} = F / (\dot{m}g_0)$).
*   **Gas Dynamics Basics:** Conservation laws (mass, momentum, energy) as applied to compressible fluid flow through ducts and nozzles.
*   **Boundary Layers:** The thin layer of fluid near a solid surface where viscous effects are significant, leading to velocity gradients.

## 4. The core idea — step by step

Let's break down the concept of an over-expanded nozzle, building from the ideal case to the complex reality.

### Step 1: Ideal Nozzle Expansion ($P_e = P_a$)

**Plain English:** The perfect scenario for a rocket nozzle is when the pressure of the exhaust gases leaving the nozzle ($P_e$) is exactly equal to the pressure of the surrounding air ($P_a$). In this ideal case, the exhaust gases flow out smoothly, perfectly matched to their environment, and produce maximum thrust for their designed conditions.

**Concrete Example:** Imagine a rocket engine designed to operate in the vacuum of space. The ambient pressure ($P_a$) is virtually zero. An ideal nozzle for this condition would have a very large exit area, allowing the exhaust gases to expand to a pressure ($P_e$) that is also very close to zero. This maximizes the exhaust velocity and thus the thrust.

**Formal/Mathematical Version:** For an ideal (isentropic) nozzle, the relationship between the exit pressure ($P_e$) and the stagnation pressure in the combustion chamber ($P_0$) is given by the isentropic flow relations:

$$ \frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}} $$

where $\gamma$ is the ratio of specific heats for the exhaust gas, and $M_e$ is the Mach number at the nozzle exit. For ideal operation, the nozzle is designed such that $P_e = P_a$.

**What could go wrong:** If the actual ambient pressure ($P_a$) is *not* equal to the designed exit pressure ($P_e$), the nozzle will not operate at peak efficiency. Specifically, if $P_e < P_a$, we have an over-expanded nozzle, leading to thrust losses and shock formation.

### Step 2: Over-expansion Defined ($P_e < P_a$)

**Plain English:** An over-expanded nozzle occurs when the rocket's exhaust gases, having expanded inside the nozzle, exit at a pressure ($P_e$) that is lower than the surrounding atmospheric pressure ($P_a$). The outside air is pushing inward harder than the exhaust is pushing outward.

**Concrete Example:** Take that large, vacuum-optimized nozzle from Step 1. If you fire it at sea level, where $P_a \approx 101.3 \text{ kPa}$, and the nozzle is designed to achieve an exit pressure $P_e \approx 1 \text{ kPa}$ (near vacuum), then $P_e \ll P_a$. The nozzle is severely over-expanded.

**Formal/Mathematical Version:** The condition for over-expansion is simply:

$$ P_e < P_a $$

where $P_e$ is the static pressure of the exhaust gas at the nozzle exit plane, and $P_a$ is the ambient static pressure.

**What could go wrong:** This pressure imbalance is the root cause of all the problems associated with over-expansion: flow separation, shock formation, and thrust loss.

### Step 3: Flow Separation

**Plain English:** When the outside pressure ($P_a$) is significantly higher than the exhaust pressure ($P_e$) inside the nozzle near its exit, the high ambient pressure can actually push *into* the nozzle. This causes the exhaust flow to detach or "separate" from the inner wall of the nozzle, effectively reducing the active length of the nozzle and creating a smaller effective exit area.

**Concrete Example:** You can sometimes see this phenomenon visually in rocket launches. As a rocket ascends, the ambient pressure drops. If the nozzle is initially over-expanded at sea level, the exhaust plume might appear "pinched" or "choked" inside the nozzle, showing that it's separating from the wall. As the rocket climbs, the plume will gradually fill the nozzle again.

**Formal/Mathematical Version:** Flow separation occurs when the adverse pressure gradient (pressure increasing in the direction of flow) becomes severe enough to overcome the momentum of the boundary layer fluid. This leads to a separation point where the flow detaches from the wall. The pressure at the separation point ($P_{sep}$) is typically a specific fraction of the ambient pressure, often around $0.3 \text{ to } 0.4 P_a$ for typical rocket nozzles. The separated flow forms a region of recirculating, often turbulent, flow.

**What could go wrong:** Asymmetric flow separation (where separation occurs on one side of the nozzle before the other) can generate significant side forces on the nozzle, potentially leading to structural damage or loss of vehicle control. This is a major concern for rocket designers.

### Step 4: Oblique Shocks Formation

**Plain English:** When the exhaust flow separates from the nozzle wall (or even if it doesn't fully separate but is severely over-expanded), the gas still needs to adjust its pressure to match the higher ambient pressure. Since the flow is supersonic, it cannot do this smoothly. Instead, it forms sudden, angled compression waves called "oblique shocks." These are like invisible, angled walls that the supersonic gas hits, causing its pressure to jump up, its velocity to decrease, and its direction to change.

**Concrete Example:** The characteristic "diamond patterns" seen in the exhaust plumes of many rocket engines, especially at lower altitudes, are visual evidence of these oblique shocks and the subsequent expansion waves interacting. The bright regions are where the gas is compressed and heated by the shocks.

**Formal/Mathematical Version:** When a supersonic flow encounters a corner or a region of higher pressure, it compresses via oblique shock waves. Unlike normal shocks, which are perpendicular to the flow and make it subsonic, oblique shocks are angled relative to the flow and can keep the flow supersonic (though slower and deflected). The angle of the oblique shock ($\beta$) is related to the upstream Mach number ($M_1$) and the flow deflection angle ($\theta$) by the $\theta-\beta-M$ relationship (e.g., tangent relation or charts). Across an oblique shock, properties like pressure, temperature, and density increase, while Mach number decreases, and entropy increases.

$$ \tan \theta = \frac{2 \cot \beta (M_1^2 \sin^2 \beta - 1)}{M_1^2 (\gamma + \cos(2\beta)) + 2} $$

The pressure ratio across an oblique shock is:

$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 \sin^2 \beta - 1) $$

**What could go wrong:** Shocks are inherently non-isentropic processes. This means they increase the entropy of the gas, which represents a loss of available energy. This lost energy comes directly from the kinetic energy of the exhaust, reducing its effective velocity and thus the thrust.

### Step 5: Thrust Loss & Efficiency

**Plain English:** The formation of oblique shocks and the pressure difference at the nozzle exit both contribute to a reduction in the rocket's thrust and overall efficiency. The shocks convert useful kinetic energy (which creates thrust) into wasted thermal energy (heat). Additionally, the higher ambient pressure pushing on the nozzle exit acts as a "brake," directly opposing the thrust.

**Concrete Example:** If a rocket engine is rated for a specific impulse ($I_{sp}$) of 450 seconds in vacuum, but it's operating in an over-expanded condition at sea level, its actual $I_{sp}$ might drop to 350 seconds or even less. This means it's getting significantly less "bang for its buck" from the propellant, reducing payload capacity or range.

**Formal/Mathematical Version:** The thrust equation for a rocket engine is:

$$ F = \dot{m}V_e + (P_e - P_a)A_e $$

where $\dot{m}$ is the mass flow rate, $V_e$ is the exhaust velocity, $P_e$ is the exit pressure, $P_a$ is the ambient pressure, and $A_e$ is the exit area.

When the nozzle is over-expanded, $P_e < P_a$. This makes the term $(P_e - P_a)A_e$ negative, directly subtracting from the momentum thrust ($\dot{m}V_e$). This is the "pressure thrust loss."

Furthermore, the oblique shocks (and any normal shocks that might form if separation is severe) are non-isentropic. They convert kinetic energy into thermal energy, which means the effective exhaust velocity ($V_e$) is lower than it would be for an ideal, isentropic expansion to the same exit pressure. This "velocity thrust loss" further reduces the engine's efficiency, as measured by specific impulse ($I_{sp}$).

$$ I_{sp} = \frac{F}{\dot{m}g_0} $$

A lower $F$ for the same $\dot{m}$ leads to a lower $I_{sp}$.

**What could go wrong:** Significant thrust loss means more propellant is needed to achieve a given mission, or the maximum payload is reduced. This directly impacts the economic viability and performance capabilities of a launch vehicle.

### Step 6: Plume Structure – Shock Diamonds

**Plain English:** The interaction of oblique shocks and expansion waves in an over-expanded (or even slightly under-expanded) exhaust plume creates a fascinating, repeating pattern of bright and dark regions known as "shock diamonds" or "Mach diamonds." The gas exits the nozzle, gets compressed by an oblique shock (bright region), then expands through an expansion fan (darker region), then gets compressed again, and so on, creating the diamond shape.

**Concrete Example:** Watch any video of a rocket launch from the first stage's perspective. The exhaust plume often shows distinct, shimmering diamond patterns close to the nozzle exit, especially at lower altitudes where the ambient pressure is significant.

**Formal/Mathematical Version:** The plume structure is a complex interaction of wave phenomena in supersonic flow. When the flow exits an over-expanded nozzle ($P_e < P_a$), it initially encounters the higher ambient pressure. This pressure difference leads to the formation of oblique shock waves at the nozzle lip, which turn the flow inward and increase its pressure towards $P_a$. However, the flow then over-compresses, leading to expansion waves that turn it outward again. This cycle of compression (shocks) and expansion (Prandtl-Meyer expansion fans) repeats, creating the characteristic diamond pattern until the flow eventually mixes and dissipates with the ambient air. The length and spacing of these diamonds depend on the Mach number, pressure ratio, and gas properties.

**What could go wrong:** Misinterpreting the presence of shock diamonds. While they indicate a pressure mismatch, they don't *always* mean severe efficiency loss. Even slightly under-expanded plumes can show diamonds. The key is the *degree* of over-expansion and the associated flow separation and shock strength.

## 5. Worked examples — multiple, with every step shown

We'll use a constant $\gamma = 1.2$ for the exhaust gases, which is a common approximation for rocket propellants. Assume $g_0 = 9.81 \text{ m/s}^2$ for specific impulse calculations.

### Example 1: Determining Over-expansion

**Problem:** A rocket engine has a combustion chamber pressure ($P_0$) of $10 \text{ MPa}$ and an exhaust gas ratio of specific heats ($\gamma$) of $1.2$. The nozzle is designed to achieve an exit Mach number ($M_e$) of $3.0$. If this engine is fired at an altitude where the ambient pressure ($P_a$) is $100 \text{ kPa}$, is the nozzle over-expanded, ideally expanded, or under-expanded?

**Given:**
*   $P_0 = 10 \text{ MPa} = 10 \times 10^6 \text{ Pa}$
*   $\gamma = 1.2$
*   $M_e = 3.0$
*   $P_a = 100 \text{ kPa} = 100 \times 10^3 \text{ Pa}$

**We want:** To determine the expansion state ($P_e$ vs. $P_a$).

**Step 1: Calculate the ideal exit pressure ($P_e$) using the isentropic flow relation.**
The isentropic relation between stagnation pressure and static pressure at the exit is:
$$ \frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}} $$
This formula allows us to find the pressure at the nozzle exit if the flow expands ideally (isentropically) to the given Mach number.

**Step 2: Substitute the given values into the equation.**
$$ \frac{P_e}{10 \times 10^6 \text{ Pa}} = \left(1 + \frac{1.2-1}{2}(3.0)^2\right)^{-\frac{1.2}{1.2-1}} $$
Here we are plugging in $P_0$, $\gamma$, and $M_e$.

**Step 3: Simplify the terms inside the parenthesis.**
$$ \frac{P_e}{10 \times 10^6 \text{ Pa}} = \left(1 + \frac{0.2}{2}(9)\right)^{-\frac{1.2}{0.2}} $$
$$ \frac{P_e}{10 \times 10^6 \text{ Pa}} = \left(1 + 0.1 \times 9\right)^{-6} $$
$$ \frac{P_e}{10 \times 10^6 \text{ Pa}} = \left(1 + 0.9\right)^{-6} $$
$$ \frac{P_e}{10 \times 10^6 \text{ Pa}} = \left(1.9\right)^{-6} $$
We are performing the arithmetic operations step-by-step.

**Step 4: Calculate the value of $(1.9)^{-6}$.**
$$ (1.9)^{-6} \approx 0.01602 $$
This is the pressure ratio $P_e/P_0$.

**Step 5: Solve for $P_e$.**
$$ P_e = 10 \times 10^6 \text{ Pa} \times 0.01602 $$
$$ P_e = 160200 \text{ Pa} = 160.2 \text{ kPa} $$
This is the pressure of the exhaust gases as they leave the nozzle.

**Step 6: Compare $P_e$ with $P_a$.**
*   $P_e = 160.2 \text{ kPa}$
*   $P_a = 100 \text{ kPa}$

Since $P_e > P_a$, the nozzle is **under-expanded**.
In this case, the exhaust pressure is *higher* than the ambient pressure, meaning the gases could still expand further to produce more thrust if the nozzle were longer or had a larger exit area. This example highlights the importance of comparison.

**Reflection:** This example was "easy" because it only required direct application of the isentropic flow relation and a comparison. The trick was to correctly identify the condition based on $P_e$ vs $P_a$. An over-expanded nozzle would have $P_e < P_a$.

### Example 2: Calculating Thrust Loss Due to Over-expansion

**Problem:** An over-expanded rocket nozzle has an exit pressure ($P_e$) of $20 \text{ kPa}$ and an exit area ($A_e$) of $1.5 \text{ m}^2$. It operates at an altitude where the ambient pressure ($P_a$) is $50 \text{ kPa}$. The momentum thrust ($\dot{m}V_e$) is calculated to be $2.5 \text{ MN}$. Calculate the total thrust and the percentage thrust loss due to the pressure term compared to an ideally expanded nozzle (where $P_e = P_a$).

**Given:**
*   $P_e = 20 \text{ kPa} = 20 \times 10^3 \text{ Pa}$
*   $A_e = 1.5 \text{ m}^2$
*   $P_a = 50 \text{ kPa} = 50 \times 10^3 \text{ Pa}$
*   $\dot{m}V_e = 2.5 \text{ MN} = 2.5 \times 10^6 \text{ N}$

**We want:** Total thrust ($F$) and percentage thrust loss.

**Step 1: Write down the full thrust equation.**
$$ F = \dot{m}V_e + (P_e - P_a)A_e $$
This is the fundamental equation for rocket thrust, accounting for both the momentum of the exhaust and the pressure difference at the exit.

**Step 2: Calculate the pressure-area term $(P_e - P_a)A_e$.**
$$ (P_e - P_a)A_e = (20 \times 10^3 \text{ Pa} - 50 \times 10^3 \text{ Pa}) \times 1.5 \text{ m}^2 $$
$$ (P_e - P_a)A_e = (-30 \times 10^3 \text{ Pa}) \times 1.5 \text{ m}^2 $$
$$ (P_e - P_a)A_e = -45000 \text{ N} $$
The negative sign correctly indicates that this term *reduces* thrust because $P_e < P_a$.

**Step 3: Calculate the total thrust ($F$).**
$$ F = 2.5 \times 10^6 \text{ N} + (-45000 \text{ N}) $$
$$ F = 2500000 \text{ N} - 45000 \text{ N} $$
$$ F = 2455000 \text{ N} = 2.455 \text{ MN} $$
This is the actual thrust produced by the over-expanded nozzle.

**Step 4: Determine the ideal thrust (if $P_e$ were equal to $P_a$).**
If the nozzle were ideally expanded, the pressure term $(P_e - P_a)A_e$ would be zero.
So, the ideal thrust $F_{ideal} = \dot{m}V_e = 2.5 \text{ MN}$.
This is the maximum thrust achievable from the momentum contribution alone.

**Step 5: Calculate the thrust loss.**
Thrust Loss $= F_{ideal} - F = 2.5 \text{ MN} - 2.455 \text{ MN} = 0.045 \text{ MN} = 45000 \text{ N}$.
This value is exactly the negative of the pressure-area term, as expected.

**Step 6: Calculate the percentage thrust loss.**
$$ \text{Percentage Loss} = \frac{\text{Thrust Loss}}{F_{ideal}} \times 100\% $$
$$ \text{Percentage Loss} = \frac{0.045 \text{ MN}}{2.5 \text{ MN}} \times 100\% $$
$$ \text{Percentage Loss} = 0.018 \times 100\% = 1.8\% $$

The total thrust produced by the engine is $\boxed{2.455 \text{ MN}}$, and the percentage thrust loss due to over-expansion (pressure term) is $\boxed{1.8\%}$.

**Reflection:** This example shows that even a seemingly small pressure difference can lead to a measurable thrust loss. It also highlights that the $(P_e - P_a)A_e$ term can be negative, actively reducing the thrust. It doesn't account for losses due to shocks reducing $V_e$, which would be a more complex calculation.

### Example 3: Estimating Specific Impulse with Over-expansion

**Problem:** An engine has a mass flow rate ($\dot{m}$) of $300 \text{ kg/s}$. Its exhaust velocity ($V_e$) (assuming ideal expansion to $P_e$) is $3000 \text{ m/s}$. The nozzle exit area ($A_e$) is $2.0 \text{ m}^2$, and the exit pressure ($P_e$) is $15 \text{ kPa}$. If this engine operates at an altitude where the ambient pressure ($P_a$) is $70 \text{ kPa}$, calculate the actual specific impulse ($I_{sp}$) considering the pressure term. Assume $g_0 = 9.81 \text{ m/s}^2$.

**Given:**
*   $\dot{m} = 300 \text{ kg/s}$
*   $V_e = 3000 \text{ m/s}$ (This is the ideal exhaust velocity, ignoring shock losses for simplicity in this problem)
*   $A_e = 2.0 \text{ m}^2$
*   $P_e = 15 \text{ kPa} = 15 \times 10^3 \text{ Pa}$
*   $P_a = 70 \text{ kPa} = 70 \times 10^3 \text{ Pa}$
*   $g_0 = 9.81 \text{ m/s}^2$

**We want:** Actual specific impulse ($I_{sp}$).

**Step 1: Calculate the momentum thrust term ($\dot{m}V_e$).**
$$ \text{Momentum Thrust} = \dot{m}V_e = 300 \text{ kg/s} \times 3000 \text{ m/s} = 900000 \text{ N} = 0.9 \text{ MN} $$
This is the thrust generated purely by accelerating the mass of the exhaust.

**Step 2: Calculate the pressure-area thrust term ($(P_e - P_a)A_e$).**
$$ \text{Pressure Thrust} = (P_e - P_a)A_e = (15 \times 10^3 \text{ Pa} - 70 \times 10^3 \text{ Pa}) \times 2.0 \text{ m}^2 $$
$$ \text{Pressure Thrust} = (-55 \times 10^3 \text{ Pa}) \times 2.0 \text{ m}^2 $$
$$ \text{Pressure Thrust} = -110000 \text{ N} = -0.11 \text{ MN} $$
This term is negative, indicating a thrust penalty due to over-expansion.

**Step 3: Calculate the total actual thrust ($F$).**
$$ F = \text{Momentum Thrust} + \text{Pressure Thrust} $$
$$ F = 900000 \text{ N} + (-110000 \text{ N}) $$
$$ F = 790000 \text{ N} = 0.79 \text{ MN} $$
This is the net thrust produced by the engine under over-expanded conditions.

**Step 4: Calculate the actual specific impulse ($I_{sp}$).**
$$ I_{sp} = \frac{F}{\dot{m}g_0} $$
$$ I_{sp} = \frac{790000 \text{ N}}{300 \text{ kg/s} \times 9.81 \text{ m/s}^2} $$
$$ I_{sp} = \frac{790000}{2943} \text{ s} $$
$$ I_{sp} \approx 268.4 \text{ s} $$

The actual specific impulse of the engine under these over-expanded conditions is $\boxed{268.4 \text{ s}}$.

**Reflection:** This example demonstrates how over-expansion directly impacts the engine's efficiency, as shown by the reduced specific impulse. An ideally expanded nozzle with $P_e = P_a$ would have yielded an $I_{sp} = \frac{900000}{2943} \approx 305.8 \text{ s}$. The difference of about 37 seconds is significant for mission planning. Note that this calculation still simplifies by assuming $V_e$ is fixed despite the over-expansion, which means it doesn't account for the *additional* losses from shocks reducing the exhaust velocity itself.

### Example 4: Oblique Shock Angle (Advanced Concept)

**Problem:** A supersonic exhaust flow with a Mach number ($M_1$) of $3.0$ and static pressure ($P_1$) of $15 \text{ kPa}$ exits an over-expanded nozzle. To match the ambient pressure ($P_a$) of $30 \text{ kPa}$, an oblique shock forms at the nozzle lip, deflecting the flow inward. Assuming $\gamma = 1.2$, what is the approximate angle ($\beta$) of this oblique shock relative to the incoming flow? (This problem requires using the pressure ratio across an oblique shock and iterating or using a $\theta-\beta-M$ chart/solver. We will simplify by targeting the pressure ratio and solving for $\beta$).

**Given:**
*   $M_1 = 3.0$ (upstream Mach number, at nozzle exit)
*   $P_1 = 15 \text{ kPa}$ (upstream pressure, $P_e$)
*   $P_2 = 30 \text{ kPa}$ (downstream pressure, approximately $P_a$ after the shock)
*   $\gamma = 1.2$

**We want:** Oblique shock angle ($\beta$).

**Step 1: Determine the required pressure ratio across the shock.**
$$ \frac{P_2}{P_1} = \frac{30 \text{ kPa}}{15 \text{ kPa}} = 2.0 $$
The shock must increase the pressure by a factor of 2.

**Step 2: Use the pressure ratio equation for an oblique shock.**
$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 \sin^2 \beta - 1) $$
We need to solve for $\beta$.

**Step 3: Substitute known values and rearrange to isolate $\sin^2 \beta$.**
$$ 2.0 = 1 + \frac{2(1.2)}{1.2+1}((3.0)^2 \sin^2 \beta - 1) $$
$$ 2.0 = 1 + \frac{2.4}{2.2}(9 \sin^2 \beta - 1) $$
$$ 2.0 = 1 + 1.0909 (9 \sin^2 \beta - 1) $$
Subtract 1 from both sides:
$$ 1.0 = 1.0909 (9 \sin^2 \beta - 1) $$
Divide by 1.0909:
$$ \frac{1.0}{1.0909} = 9 \sin^2 \beta - 1 $$
$$ 0.9167 \approx 9 \sin^2 \beta - 1 $$
Add 1 to both sides:
$$ 1.9167 \approx 9 \sin^2 \beta $$
Divide by 9:
$$ \sin^2 \beta \approx \frac{1.9167}{9} $$
$$ \sin^2 \beta \approx 0.21297 $$

**Step 4: Solve for $\sin \beta$ and then $\beta$.**
$$ \sin \beta = \sqrt{0.21297} $$
$$ \sin \beta \approx 0.46149 $$
$$ \beta = \arcsin(0.46149) $$
$$ \beta \approx 27.48^\circ $$

The approximate angle of the oblique shock relative to the incoming flow is $\boxed{27.5^\circ}$.

**Reflection:** This example is significantly harder as it involves solving a non-linear equation for $\beta$. It connects the macroscopic phenomenon of pressure matching to the microscopic physics of shock waves. The actual deflection angle ($\theta$) caused by this shock would then be found using the $\theta-\beta-M$ relation. This problem highlights how the flow "reacts" to the adverse pressure gradient by forming these angled compression waves, which are a key feature of over-expanded plumes.

## 6. Common mistakes and traps

1.  **Confusing Over-expansion with Under-expansion:** A common error is mixing up the conditions.
    *   **Over-expanded:** $P_e < P_a$ (exhaust pressure is *too low* for ambient, ambient pushes in).
    *   **Under-expanded:** $P_e > P_a$ (exhaust pressure is *too high* for ambient, exhaust pushes out more).
    Both lead to efficiency losses, but through different mechanisms (compression shocks vs. expansion losses).

2.  **Ignoring the Pressure-Area Term in Thrust:** Students often only consider $\dot{m}V_e$ for thrust. Forgetting the $(P_e - P_a)A_e$ term, especially when $P_e \neq P_a$, leads to an incorrect thrust calculation and specific impulse. This term is *critical* for non-ideally expanded nozzles.

3.  **Assuming Isentropic Flow Through Shocks:** Shock waves are inherently non-isentropic. They increase entropy, which means they dissipate useful kinetic energy into heat. Assuming isentropic flow through a shock will lead to an overestimation of exhaust velocity and thrust.

4.  **Assuming Symmetrical Flow Separation:** While often modeled as symmetrical, flow separation in real over-expanded nozzles can be highly asymmetrical. This can induce significant and dangerous side loads on the nozzle, which are often overlooked in simplified analyses.

5.  **Misinterpreting Plume Diamonds:** While shock diamonds are a visual indicator of pressure mismatch (either over- or under-expansion), their presence alone doesn't quantify the severity of efficiency loss. The strength and frequency of the shocks, and whether they occur inside or outside the nozzle, are more important indicators.

6.  **Neglecting the Effect of $\gamma$ (Ratio of Specific Heats):** The value of $\gamma$ for the exhaust gases significantly influences the expansion process, the Mach number relations, and the behavior of shocks. Using a generic $\gamma=1.4$ (for air) instead of a more appropriate value (e.g., $1.2$ to $1.3$ for typical rocket exhaust) can lead to inaccurate calculations.

## 7. Textbook-precise explanation

An **over-expanded nozzle** is defined by the condition where the static pressure of the exhaust gas at the nozzle exit plane ($P_e$) is less than the ambient static pressure ($P_a$), i.e., $P_e < P_a$. This scenario typically occurs when a nozzle designed for high-altitude or vacuum operation (where $P_a$ is low) is operated at a lower altitude where $P_a$ is significantly higher.

The primary consequence of over-expansion is a reduction in the engine's propulsive efficiency and total thrust. This reduction stems from two main mechanisms:

1.  **Pressure Thrust Deficit:** The fundamental thrust equation for a rocket engine is $F = \dot{m}V_e + (P_e - P_a)A_e$. When $P_e < P_a$, the pressure-area term $(P_e - P_a)A_e$ becomes negative, directly subtracting from the momentum thrust ($\dot{m}V_e$). This represents a net force acting against the desired direction of thrust, as the higher ambient pressure effectively pushes onto the nozzle exit.

2.  **Non-Isentropic Losses via Shock Waves:** To equilibrate the pressure difference between the low-pressure exhaust and the higher ambient environment, the supersonic exhaust flow undergoes a series of compressions. These compressions manifest as **oblique shock waves**, which form either at the nozzle lip or, in severe cases, within the divergent section of the nozzle itself (leading to flow separation). Across an oblique shock wave, the flow's static pressure, temperature, and density increase, while its Mach number decreases. Crucially, shock waves are non-isentropic phenomena; they cause an irreversible increase in entropy, converting a portion of the flow's kinetic energy into thermal energy. This dissipation reduces the effective exhaust velocity ($V_e$) and, consequently, the momentum thrust, thereby lowering the engine's specific impulse ($I_{sp}$).

In severe over-expansion, the adverse pressure gradient ($dP/dx > 0$) along the nozzle wall can become sufficiently strong to cause **boundary layer separation**. This occurs when the momentum of the fluid within the boundary layer is insufficient to overcome the increasing pressure, leading to flow detachment from the nozzle wall. The separation point is typically characterized by a pressure ratio $P_{sep}/P_a \approx 0.3 \text{ to } 0.4$. Flow separation is often accompanied by the formation of a **separation shock** within the nozzle. Asymmetric flow separation can induce significant lateral forces on the nozzle structure, posing a risk to structural integrity and control authority.

The characteristic visual manifestation of over-expansion in the exhaust plume is the formation of **shock diamonds** (also known as Mach diamonds). These are repeating patterns of bright and dark regions in the plume, resulting from the cyclical interaction of oblique compression shocks (where the flow is compressed and heated) and Prandtl-Meyer expansion fans (where the flow expands and cools) as the exhaust attempts to adjust to the ambient pressure.

For a rigorous treatment of these phenomena, refer to:
*   **Sutton, G. P., & Biblarz, O. (2017). *Rocket Propulsion Elements* (9th ed.). Wiley.** (Specifically, Chapter 3 on Nozzle Theory and Performance, and Chapter 6 on Nozzles for Liquid Propellant Rockets).
*   **Anderson, J. D. (2017). *Modern Compressible Flow: With Historical Perspective* (4th ed.). McGraw-Hill Education.** (Specifically, Chapter 8 on Oblique Shock and Expansion Waves, and Chapter 11 on Nozzle Flow with Shocks).

## 8. ASCII diagrams

Here's an ASCII diagram illustrating an over-expanded nozzle with flow separation and oblique shocks in the plume:

```text
                                       Ambient Pressure (Pa)
                                       --------------------->
                                      /                      \
                                     /                        \
                                    /                          \
                                   /                            \
                                  /                              \
                                 /                                \
                 ________________|________________________________|_________________
                /                |                                |                 \
               /                 |                                |                  \
              /                  |                                |                   \
             /                   |                                |                    \
            /                    |                                |                     \
           /                     |                                |                      \
          |                      |                                |                       |
          |                      |        Nozzle Wall             |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |        <---- Flow ---->        |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |                                |                       |
          |                      |          Throat (M=1)          |                       |
          |                      |________________________________|                       |
          |                      /                                \                       |
          |                     /                                  \                      |
          |                    /                                    \                     |
          |                   /                                      \                    |
          |                  /                                        \                   |
          |                 /                                          \                  |
          |                /                                            \                 |
          |               /                                              \                |
          |              /                                                \               |
          |             /                                                  \              |
          |            /                                                    \             |
          |           /                                                      \            |
          |          /                                                        \           |
          |         /                                                          \          |
          |        /                                                            \         |
          |       /                                                              \        |
          |      /                                                                \       |
          |     /                                                                  \      |
          |    /                                                                    \     |
          |   /                                                                      \    |
          |  /                                                                        \   |
          | /                                                                          \  |
          |/____________________________________________________________________________\|
          |                                                                             |
          |   <-------------------------------- Nozzle Exit Plane ----------------------> |
          |                                                                             |
          |                                  (Pe < Pa)                                  |
          |                                                                             |
          |                                                                             |
          |                                                                             |
          |                                                                             |
          |                                                                             |
          |                                                                             |
          |                                                                             |
          |                                   / \                                       |
          |                                  /   \                                      |
          |                                 /     \                                     |
          |                                /       \                                    |
          |                               /         \                                   |
          |                              /           \                                  |
          |                             /             \                                 |
          |                            /               \                                |
          |                           /                 \                               |
          |                          /                   \                              |
          |                         /                     \                             |
          |                        /                       \                            |
          |                       /                         \                           |
          |                      /                           \                          |
          |                     /                             \                         |
          |                    /                               \                        |
          |                   /                                 \                       |
          |                  /                                   \                      |
          |                 /                                     \                     |
          |                /                                       \                    |
          |               /                                         \                   |
          |              /                                           \                  |
          |             /                                             \                 |
          |            /                                               \                |
          |           /                                                 \               |
          |          /                                                   \              |
          |         /                                                     \             |
          |        /                                                       \            |
          |       /                                                         \           |
          |      /                                                           \          |
          |     /                                                             \         |
          |    /                                                               \        |
          |   /                                                                 \       |
          |  /                                                                   \      |
          | /                                                                     \     |
          |/_______________________________________________________________________\|
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
          |                                                                         |
