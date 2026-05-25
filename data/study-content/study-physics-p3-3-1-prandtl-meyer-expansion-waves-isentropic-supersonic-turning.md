## 1. What it is — in plain English

Imagine air flowing really, really fast – faster than the speed of sound, like a jet plane breaking the sound barrier. We call this "supersonic flow." Now, picture this super-fast air hitting a corner in a wall, but instead of the wall turning *into* the flow (which would create a shockwave, like a sudden bang), the wall gently turns *away* from the flow, giving the air more space.

When this happens, the supersonic air doesn't just suddenly change direction. Instead, it smoothly and gradually turns around the corner. It does this by creating a series of very weak, almost imperceptible waves, like tiny ripples spreading out from a disturbance. These ripples are called "Mach waves," and when many of them combine and spread out from a corner, they form what we call a "Prandtl-Meyer expansion fan."

This "expansion fan" makes the air flow even faster, and also cooler and less dense, as it turns. Crucially, this process is "isentropic," which means it's incredibly efficient – no energy is lost due to friction or turbulence, and the air's "quality" (its entropy) remains the same. It's like the air is smoothly falling down a gentle slope, picking up speed without any bumps or resistance.

So, in simple terms, a Prandtl-Meyer expansion wave is the natural, smooth, and efficient way supersonic air turns a corner when the corner opens up and gives the air more room to spread out and accelerate.

## 2. Why it matters — real-world applications

Prandtl-Meyer expansion waves are fundamental to the design and understanding of almost any vehicle or device operating at supersonic or hypersonic speeds.

1.  **Supersonic Aircraft and Missile Design:** Designers of aircraft like the Concorde (and future supersonic transports by companies like Boom Supersonic) or advanced missiles must understand how air flows over sharp corners, such as wing leading edges or control surfaces. An expansion fan forms on the trailing edge of a wing or a deflected flap, allowing the flow to turn and accelerate, contributing to lift and control. Optimal shaping minimizes drag and maximizes performance.
2.  **Rocket Nozzle Design:** The bell-shaped exit of a rocket engine nozzle, like those on SpaceX's Falcon 9 or NASA's Space Launch System, is specifically designed to generate a Prandtl-Meyer expansion. Hot, high-pressure gas from the combustion chamber accelerates to supersonic speeds within the nozzle's converging-diverging section. The diverging part of the nozzle acts as a continuous expansion corner, smoothly turning and accelerating the gas to achieve maximum exhaust velocity and thrust.
3.  **Hypersonic Vehicle Inlets and Scramjets:** For vehicles traveling at Mach 5 and above (hypersonic speeds), like those being developed by DARPA or Lockheed Martin Skunk Works, the design of the engine inlet is critical. Expansion waves can be used in conjunction with oblique shocks to carefully compress and slow down the incoming air before it enters the combustion chamber of a scramjet engine. Understanding expansion allows for precise control of flow properties.
4.  **Supersonic Wind Tunnel Nozzles:** To test models of supersonic aircraft, wind tunnels need to generate a uniform supersonic flow. The converging-diverging nozzle of a supersonic wind tunnel utilizes a Prandtl-Meyer expansion to accelerate the flow smoothly and efficiently from subsonic to supersonic speeds, creating the desired test conditions in the test section.
5.  **Re-entry Vehicles and Atmospheric Entry:** When spacecraft re-enter Earth's atmosphere, they experience extreme aerodynamic heating and complex flow phenomena. While shock waves are prominent on the blunt nose, expansion waves form over the shoulders and aft sections of the vehicle, influencing local pressures, temperatures, and heat transfer rates, which are critical for thermal protection system design.

## 3. Prerequisites — what you must know first

Before diving deep into Prandtl-Meyer expansion waves, ensure you have a solid grasp of the following concepts:

*   **Compressible Flow Fundamentals:** Understanding that air density changes significantly at high speeds, and the concepts of Mach number ($M = v/a$) and the speed of sound ($a = \sqrt{\gamma RT}$).
*   **Isentropic Flow:** The definition of an isentropic process (adiabatic and reversible, implying constant entropy), and the ability to apply isentropic flow relations for temperature, pressure, and density ratios (e.g., $P_0/P = (1 + \frac{\gamma-1}{2}M^2)^{\gamma/(\gamma-1)}$).
*   **Basic Thermodynamics:** Knowledge of specific heats ($c_p, c_v$), ratio of specific heats ($\gamma = c_p/c_v$), and the ideal gas law ($P = \rho RT$).
*   **Conservation Laws:** The principles of conservation of mass (continuity equation), momentum (Euler's equations), and energy (steady flow energy equation).
*   **Oblique Shock Waves:** Understanding how supersonic flow reacts to a compression corner (forming an oblique shock), and the property changes across such a shock (increase in pressure, temperature, density; decrease in Mach number; increase in entropy). This provides a crucial contrast to expansion waves.
*   **Mach Waves:** The concept of a weak pressure wave propagating at the Mach angle $\mu = \arcsin(1/M)$ relative to the flow direction.
*   **Basic Calculus:** Differentiation and integration will be helpful for understanding the derivation of the Prandtl-Meyer function, though not strictly required for its application.

If any of these concepts are unfamiliar, pause here and review them thoroughly. A strong foundation will make this topic much clearer.

## 4. The core idea — step by step

Let's break down the Prandtl-Meyer expansion wave concept, building from simple observations to the powerful mathematical tools.

### Step 1: Supersonic Flow and Turning

*   **Plain-English Statement:** When air flows faster than sound, it behaves differently than slow-moving air. It can't "see" obstacles or changes ahead of it because the information (pressure waves) can't travel upstream against the supersonic flow. This means that when a supersonic flow encounters a corner, it reacts instantly at the corner, not before.
*   **Small Concrete Example:** Imagine a very fast boat on water. Its bow wave travels outwards, but if the boat is going faster than the wave can spread, the wave can't get ahead of the boat. Similarly, pressure disturbances in supersonic air are confined to a cone behind the disturbance (the Mach cone).
*   **Formal/Mathematical Version:** This behavior is characterized by the Mach number $M > 1$. The Mach angle, $\mu = \arcsin(1/M)$, defines the cone of influence for any disturbance in supersonic flow.
*   **What could go wrong:** Confusing the behavior of supersonic flow with subsonic flow, where disturbances propagate in all directions and can "warn" the flow of upcoming changes. This distinction is critical.

### Step 2: The Expansion Corner

*   **Plain-English Statement:** An expansion corner occurs when a solid boundary (like a wall or a wing surface) turns *away* from the direction of the supersonic flow. This effectively gives the flow more room to spread out.
*   **Small Concrete Example:** Think of the sharp trailing edge of a supersonic wing. As the air flows over the top surface and then over the edge, the surface "turns away" from the flow. Another example is the diverging section of a rocket nozzle.
*   **Formal/Mathematical Version:** We define the turning angle, $\theta$, as the angle through which the wall turns. The flow will turn by this same angle $\theta$.
*   **What could go wrong:** Mistaking an expansion corner for a compression corner. A compression corner (where the wall turns *into* the flow) would generate an oblique shock wave, which is a fundamentally different (and non-isentropic) phenomenon.

### Step 3: Infinitesimal Mach Waves and the Expansion Fan

*   **Plain-English Statement:** Unlike a shock wave, which is a single, sudden jump, an expansion is a smooth, continuous process. The flow doesn't turn all at once; it turns gradually through an infinite number of infinitesimally weak pressure waves, each one a Mach wave. These waves spread out from the corner, forming a "fan" shape.
*   **Small Concrete Example:** Imagine a curtain that's slightly pulled back at one end. Instead of bending sharply, it curves smoothly. The expansion fan is like that smooth curve, made up of many tiny, straight segments (the Mach waves).
*   **Formal/Mathematical Version:** Each infinitesimal Mach wave in the expansion fan originates from the corner and makes an angle $\mu = \arcsin(1/M)$ with the local flow direction. As the flow turns and accelerates, its Mach number increases, so the Mach angle $\mu$ decreases. This means the Mach waves at the downstream end of the fan will be at a smaller angle to the flow than those at the upstream end, causing the "fanning out" effect.
*   **What could go wrong:** Thinking the expansion fan is a single, discrete wave. It's a continuous region of turning and acceleration.

### Step 4: The Prandtl-Meyer Function $\nu(M)$

*   **Plain-English Statement:** To quantify how much the flow turns for a given change in Mach number (or vice-versa), we use a special mathematical tool called the Prandtl-Meyer function, denoted $\nu(M)$. This function essentially measures the total angle through which a flow starting from $M=1$ (sonic speed) would have to turn to reach a given Mach number $M$ via an isentropic expansion.
*   **Small Concrete Example:** If you know the air enters a corner at Mach 2 and exits at Mach 3, the Prandtl-Meyer function allows you to calculate the exact turning angle required. It's a way to "look up" the turning capability for a given Mach number.
*   **Formal/Mathematical Version:** For an ideal gas with ratio of specific heats $\gamma$, the Prandtl-Meyer function is given by:
    $$ \nu(M) = \sqrt{\frac{\gamma+1}{\gamma-1}} \arctan\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)} - \arctan\sqrt{M^2-1} $$
    The function $\nu(M)$ is typically expressed in radians, though sometimes converted to degrees. It is defined such that $\nu(1) = 0$.
*   **What could go wrong:** Forgetting that $\nu(M)$ represents the *total* turn from $M=1$, not the turn from an arbitrary $M_1$. Also, be careful with units for the arctan function (radians vs. degrees).

### Step 5: Applying the Prandtl-Meyer Function to Turning

*   **Plain-English Statement:** The beauty of the Prandtl-Meyer function is that the *difference* in its value between two Mach numbers directly corresponds to the total turning angle of the flow between those two states. If flow enters at Mach $M_1$ and exits at Mach $M_2$ after turning through an angle $\theta$, then $\theta$ is simply the difference between the Prandtl-Meyer function evaluated at $M_2$ and $M_1$.
*   **Small Concrete Example:** If you have a flow at $M_1 = 2.0$ and it turns through an angle of $\theta = 15^\circ$, you can find $\nu(M_1)$ from the formula or a table, add $15^\circ$ to it (making sure units match), and then find the Mach number $M_2$ that corresponds to this new $\nu(M_2)$ value.
*   **Formal/Mathematical Version:** The turning angle $\theta$ across an expansion fan is given by:
    $$ \theta = \nu(M_2) - \nu(M_1) $$
    Here, $M_1$ is the upstream Mach number and $M_2$ is the downstream Mach number. Since expansion causes acceleration, $M_2 > M_1$, and thus $\nu(M_2) > \nu(M_1)$, making $\theta$ positive.
*   **What could go wrong:** Getting the sign wrong. Always remember that $\theta$ is the physical turning angle, and $\nu(M_2)$ must be greater than $\nu(M_1)$ for an expansion (as $M_2 > M_1$). If you calculate $\nu(M_1) - \nu(M_2)$, you'll get a negative angle.

### Step 6: Flow Properties Across the Expansion Fan

*   **Plain-English Statement:** As the flow expands and accelerates through the fan, its static pressure, static temperature, and density all decrease. Its total pressure and total temperature, however, remain constant because the process is isentropic (no energy loss or heat addition).
*   **Small Concrete Example:** Imagine a can of compressed air. When you release the valve, the air rushes out, gets much colder, and expands into the room. This is a macroscopic analogy for the microscopic changes in an expansion fan.
*   **Formal/Mathematical Version:** Since the process is isentropic, we can use the standard isentropic flow relations to relate the static properties at state 1 (upstream) to state 2 (downstream):
    $$ \frac{P_2}{P_1} = \left( \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} \right)^{\gamma/(\gamma-1)} $$
    $$ \frac{T_2}{T_1} = \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} $$
    $$ \frac{\rho_2}{\rho_1} = \left( \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} \right)^{1/(\gamma-1)} $$
    Also, the total (stagnation) pressure $P_0$ and total temperature $T_0$ remain constant: $P_{01} = P_{02}$ and $T_{01} = T_{02}$.
*   **What could go wrong:** Accidentally using the oblique shock relations, which involve entropy increase and total pressure loss. Also, forgetting that total properties remain constant is a common error.

## 5. Worked examples — multiple, with every step shown

We will use $\gamma = 1.4$ for air in all examples.

### Example 1: Calculating Downstream Mach Number

**Problem:** Supersonic air flows over a wall that turns away from the flow by an angle of $10^\circ$. The upstream Mach number is $M_1 = 2.5$. Calculate the downstream Mach number $M_2$.

**Given:**
*   Upstream Mach number, $M_1 = 2.5$
*   Turning angle, $\theta = 10^\circ$ (which is $10 \times \pi/180 \approx 0.1745$ radians)
*   Ratio of specific heats, $\gamma = 1.4$

**Want:** Downstream Mach number, $M_2$.

**Solution:**

1.  **Calculate $\nu(M_1)$:** We use the Prandtl-Meyer function formula for $M_1 = 2.5$:
    $$ \nu(M) = \sqrt{\frac{\gamma+1}{\gamma-1}} \arctan\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)} - \arctan\sqrt{M^2-1} $$
    Substitute $\gamma = 1.4$ and $M_1 = 2.5$:
    $$ \nu(2.5) = \sqrt{\frac{1.4+1}{1.4-1}} \arctan\sqrt{\frac{1.4-1}{1.4+1}(2.5^2-1)} - \arctan\sqrt{2.5^2-1} $$
    $$ \nu(2.5) = \sqrt{\frac{2.4}{0.4}} \arctan\sqrt{\frac{0.4}{2.4}(6.25-1)} - \arctan\sqrt{6.25-1} $$
    $$ \nu(2.5) = \sqrt{6} \arctan\sqrt{\frac{1}{6}(5.25)} - \arctan\sqrt{5.25} $$
    $$ \nu(2.5) = \sqrt{6} \arctan\sqrt{0.875} - \arctan\sqrt{5.25} $$
    $$ \nu(2.5) = 2.44949 \times \arctan(0.93541) - \arctan(2.29129) $$
    *This step calculates the value of the Prandtl-Meyer function for the initial Mach number. Make sure your calculator is in radian mode for arctan.*
    $$ \nu(2.5) = 2.44949 \times 0.75239 - 1.15949 $$
    $$ \nu(2.5) = 1.84299 - 1.15949 $$
    $$ \nu(2.5) = 0.68350 \text{ radians} $$

2.  **Calculate $\nu(M_2)$:** The turning angle $\theta$ is the difference between the downstream and upstream Prandtl-Meyer functions:
    $$ \theta = \nu(M_2) - \nu(M_1) $$
    We need to find $\nu(M_2)$, so rearrange:
    $$ \nu(M_2) = \nu(M_1) + \theta $$
    Convert $\theta$ to radians: $10^\circ = 10 \times (\pi/180) \approx 0.17453$ radians.
    $$ \nu(M_2) = 0.68350 + 0.17453 $$
    $$ \nu(M_2) = 0.85803 \text{ radians} $$
    *The turning angle is added because the flow is expanding, meaning the Mach number increases, and thus the Prandtl-Meyer function value increases.*

3.  **Find $M_2$ from $\nu(M_2)$:** We need to solve the Prandtl-Meyer function for $M_2$ given $\nu(M_2) = 0.85803$. This is typically done iteratively or by looking up values in a Prandtl-Meyer table (which are common in compressible flow textbooks). Let's use an iterative approach or a numerical solver if available. For a precise calculation, we'd use a numerical method or a specialized calculator. If we use a table or solver:
    For $\nu(M_2) = 0.85803$ radians, we find that $M_2 \approx 3.01$.

    *This step involves inverting the Prandtl-Meyer function. In practice, engineers often use tables or software to find M for a given $\nu$. For a manual calculation, you would need to iterate or plot the function.*

**Final Answer:**
The downstream Mach number is $\boxed{M_2 \approx 3.01}$.

**Reflection:** This example demonstrates the core application of the Prandtl-Meyer function: finding the downstream Mach number after a given turning angle. The trickiest part is accurately calculating the $\nu(M)$ values and then inverting the function to find $M_2$.

---

### Example 2: Calculating Downstream Pressure and Temperature

**Problem:** Air flows at $M_1 = 3.0$ and $P_1 = 50 \text{ kPa}$, $T_1 = 250 \text{ K}$. It undergoes a Prandtl-Meyer expansion through a $15^\circ$ turn. Calculate the downstream Mach number $M_2$, static pressure $P_2$, and static temperature $T_2$.

**Given:**
*   Upstream Mach number, $M_1 = 3.0$
*   Upstream static pressure, $P_1 = 50 \text{ kPa}$
*   Upstream static temperature, $T_1 = 250 \text{ K}$
*   Turning angle, $\theta = 15^\circ$ (which is $15 \times \pi/180 \approx 0.2618$ radians)
*   Ratio of specific heats, $\gamma = 1.4$

**Want:** $M_2$, $P_2$, $T_2$.

**Solution:**

1.  **Calculate $\nu(M_1)$:**
    Using the Prandtl-Meyer function for $M_1 = 3.0$:
    $$ \nu(3.0) = \sqrt{\frac{1.4+1}{1.4-1}} \arctan\sqrt{\frac{1.4-1}{1.4+1}(3.0^2-1)} - \arctan\sqrt{3.0^2-1} $$
    $$ \nu(3.0) = \sqrt{6} \arctan\sqrt{\frac{0.4}{2.4}(9-1)} - \arctan\sqrt{8} $$
    $$ \nu(3.0) = \sqrt{6} \arctan\sqrt{\frac{1}{6}(8)} - \arctan(2.8284) $$
    $$ \nu(3.0) = 2.44949 \times \arctan\sqrt{1.3333} - 1.23096 $$
    $$ \nu(3.0) = 2.44949 \times \arctan(1.1547) - 1.23096 $$
    $$ \nu(3.0) = 2.44949 \times 0.85707 - 1.23096 $$
    $$ \nu(3.0) = 2.09949 - 1.23096 $$
    $$ \nu(3.0) = 0.86853 \text{ radians} $$
    *This is the initial Prandtl-Meyer function value for the given upstream Mach number.*

2.  **Calculate $\nu(M_2)$:**
    Convert $\theta$ to radians: $15^\circ = 15 \times (\pi/180) \approx 0.26180$ radians.
    $$ \nu(M_2) = \nu(M_1) + \theta $$
    $$ \nu(M_2) = 0.86853 + 0.26180 $$
    $$ \nu(M_2) = 1.13033 \text{ radians} $$
    *Adding the turning angle to the initial Prandtl-Meyer value gives the final Prandtl-Meyer value.*

3.  **Find $M_2$ from $\nu(M_2)$:**
    Using a Prandtl-Meyer table or numerical solver for $\nu(M_2) = 1.13033$ radians, we find:
    $$ M_2 \approx 3.72 $$
    *This is the downstream Mach number after the expansion.*

4.  **Calculate $T_2$ using isentropic relations:**
    Since the flow is isentropic, we can use the temperature ratio relation:
    $$ \frac{T_2}{T_1} = \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} $$
    Substitute the known values:
    $$ \frac{T_2}{250 \text{ K}} = \frac{1 + \frac{1.4-1}{2}(3.0)^2}{1 + \frac{1.4-1}{2}(3.72)^2} $$
    $$ \frac{T_2}{250} = \frac{1 + 0.2(9)}{1 + 0.2(13.8384)} $$
    $$ \frac{T_2}{250} = \frac{1 + 1.8}{1 + 2.76768} $$
    $$ \frac{T_2}{250} = \frac{2.8}{3.76768} $$
    $$ \frac{T_2}{250} = 0.74316 $$
    $$ T_2 = 0.74316 \times 250 \text{ K} $$
    $$ T_2 = 185.79 \text{ K} $$
    *As expected, the temperature decreases because the flow expands and accelerates.*

5.  **Calculate $P_2$ using isentropic relations:**
    Similarly, for pressure:
    $$ \frac{P_2}{P_1} = \left( \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} \right)^{\gamma/(\gamma-1)} $$
    We already calculated the term inside the parenthesis in the temperature calculation:
    $$ \frac{P_2}{50 \text{ kPa}} = \left( 0.74316 \right)^{1.4/(1.4-1)} $$
    $$ \frac{P_2}{50} = \left( 0.74316 \right)^{1.4/0.4} $$
    $$ \frac{P_2}{50} = \left( 0.74316 \right)^{3.5} $$
    $$ \frac{P_2}{50} = 0.35415 $$
    $$ P_2 = 0.35415 \times 50 \text{ kPa} $$
    $$ P_2 = 17.71 \text{ kPa} $$
    *As expected, the pressure decreases significantly during expansion.*

**Final Answer:**
The downstream Mach number is $\boxed{M_2 \approx 3.72}$.
The downstream static temperature is $\boxed{T_2 \approx 185.79 \text{ K}}$.
The downstream static pressure is $\boxed{P_2 \approx 17.71 \text{ kPa}}$.

**Reflection:** This example combines the calculation of $M_2$ with the application of isentropic relations for static properties. It reinforces that expansion leads to higher Mach numbers and lower static temperatures and pressures. Be careful with the exponents in the isentropic relations.

---

### Example 3: Maximum Turning Angle for a Given Upstream Mach Number

**Problem:** What is the maximum possible turning angle for a Prandtl-Meyer expansion wave if the upstream Mach number is $M_1 = 2.0$? What would be the downstream Mach number?

**Given:**
*   Upstream Mach number, $M_1 = 2.0$
*   Ratio of specific heats, $\gamma = 1.4$

**Want:** Maximum turning angle $\theta_{max}$, and corresponding $M_2$.

**Solution:**

1.  **Understand Maximum Expansion:** The maximum expansion occurs when the flow reaches its theoretical maximum Mach number, which is infinite ($M \to \infty$). At $M \to \infty$, the flow is infinitely expanded, meaning its static temperature and pressure approach absolute zero.
    *This is a theoretical limit; in practice, real gases condense or deviate from ideal gas behavior long before reaching infinite Mach number.*

2.  **Calculate $\nu(M_1)$:**
    Using the Prandtl-Meyer function for $M_1 = 2.0$:
    $$ \nu(2.0) = \sqrt{\frac{1.4+1}{1.4-1}} \arctan\sqrt{\frac{1.4-1}{1.4+1}(2.0^2-1)} - \arctan\sqrt{2.0^2-1} $$
    $$ \nu(2.0) = \sqrt{6} \arctan\sqrt{\frac{0.4}{2.4}(3)} - \arctan\sqrt{3} $$
    $$ \nu(2.0) = \sqrt{6} \arctan\sqrt{0.5} - \arctan(1.73205) $$
    $$ \nu(2.0) = 2.44949 \times \arctan(0.7071) - 1.04720 $$
    $$ \nu(2.0) = 2.44949 \times 0.61548 - 1.04720 $$
    $$ \nu(2.0) = 1.50766 - 1.04720 $$
    $$ \nu(2.0) = 0.46046 \text{ radians} $$
    *This is the initial Prandtl-Meyer function value.*

3.  **Calculate $\nu(M_{max})$:**
    The maximum possible value of the Prandtl-Meyer function, $\nu_{max}$, occurs as $M \to \infty$. Let's evaluate the limit of the $\nu(M)$ formula:
    As $M \to \infty$:
    $$ \sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)} \to \sqrt{\frac{\gamma-1}{\gamma+1}M^2} = M \sqrt{\frac{\gamma-1}{\gamma+1}} $$
    $$ \sqrt{M^2-1} \to M $$
    So,
    $$ \nu_{max} = \sqrt{\frac{\gamma+1}{\gamma-1}} \arctan\left(M \sqrt{\frac{\gamma-1}{\gamma+1}}\right) - \arctan(M) $$
    As $M \to \infty$, both $\arctan(M \sqrt{\frac{\gamma-1}{\gamma+1}})$ and $\arctan(M)$ approach $\pi/2$ (or $90^\circ$).
    $$ \nu_{max} = \sqrt{\frac{\gamma+1}{\gamma-1}} \left(\frac{\pi}{2}\right) - \frac{\pi}{2} $$
    $$ \nu_{max} = \frac{\pi}{2} \left( \sqrt{\frac{\gamma+1}{\gamma-1}} - 1 \right) $$
    For $\gamma = 1.4$:
    $$ \nu_{max} = \frac{\pi}{2} \left( \sqrt{\frac{2.4}{0.4}} - 1 \right) $$
    $$ \nu_{max} = \frac{\pi}{2} \left( \sqrt{6} - 1 \right) $$
    $$ \nu_{max} = \frac{\pi}{2} (2.44949 - 1) $$
    $$ \nu_{max} = \frac{\pi}{2} (1.44949) $$
    $$ \nu_{max} = 1.57080 \times 1.44949 $$
    $$ \nu_{max} = 2.2743 \text{ radians} $$
    *This is the theoretical maximum Prandtl-Meyer function value, corresponding to flow at infinite Mach number.*

4.  **Calculate $\theta_{max}$:**
    The maximum turning angle is the difference between $\nu_{max}$ and $\nu(M_1)$:
    $$ \theta_{max} = \nu_{max} - \nu(M_1) $$
    $$ \theta_{max} = 2.2743 - 0.46046 $$
    $$ \theta_{max} = 1.81384 \text{ radians} $$
    Convert to degrees:
    $$ \theta_{max} = 1.81384 \times \frac{180}{\pi} $$
    $$ \theta_{max} = 103.92^\circ $$
    *This represents the largest possible angle the flow can turn via expansion from the initial Mach number before reaching infinite Mach number.*

**Final Answer:**
The maximum possible turning angle is $\boxed{\theta_{max} \approx 103.92^\circ}$.
The downstream Mach number for this maximum turn is $\boxed{M_2 \to \infty}$.

**Reflection:** This example highlights the theoretical limit of expansion and shows how the Prandtl-Meyer function can be used to determine maximum turning angles. It's tricky because it involves understanding the behavior of the function as $M \to \infty$.

---

### Example 4: Designing a Nozzle Corner (Inverse Problem)

**Problem:** A supersonic nozzle is designed to expand air from $M_1 = 1.5$ to $M_2 = 3.0$ around a single sharp corner. What should be the angle of this corner? If the upstream static pressure is $P_1 = 100 \text{ kPa}$, what is the downstream static pressure $P_2$?

**Given:**
*   Upstream Mach number, $M_1 = 1.5$
*   Downstream Mach number, $M_2 = 3.0$
*   Upstream static pressure, $P_1 = 100 \text{ kPa}$
*   Ratio of specific heats, $\gamma = 1.4$

**Want:** Turning angle $\theta$, and downstream static pressure $P_2$.

**Solution:**

1.  **Calculate $\nu(M_1)$:**
    Using the Prandtl-Meyer function for $M_1 = 1.5$:
    $$ \nu(1.5) = \sqrt{\frac{1.4+1}{1.4-1}} \arctan\sqrt{\frac{1.4-1}{1.4+1}(1.5^2-1)} - \arctan\sqrt{1.5^2-1} $$
    $$ \nu(1.5) = \sqrt{6} \arctan\sqrt{\frac{0.4}{2.4}(2.25-1)} - \arctan\sqrt{1.25} $$
    $$ \nu(1.5) = \sqrt{6} \arctan\sqrt{\frac{1}{6}(1.25)} - \arctan(1.11803) $$
    $$ \nu(1.5) = 2.44949 \times \arctan\sqrt{0.20833} - 0.84099 $$
    $$ \nu(1.5) = 2.44949 \times \arctan(0.45644) - 0.84099 $$
    $$ \nu(1.5) = 2.44949 \times 0.42866 - 0.84099 $$
    $$ \nu(1.5) = 1.05001 - 0.84099 $$
    $$ \nu(1.5) = 0.20902 \text{ radians} $$
    *This calculates the Prandtl-Meyer function value for the initial Mach number.*

2.  **Calculate $\nu(M_2)$:**
    Using the Prandtl-Meyer function for $M_2 = 3.0$:
    (From Example 2, we already calculated this value)
    $$ \nu(3.0) = 0.86853 \text{ radians} $$
    *This calculates the Prandtl-Meyer function value for the final Mach number.*

3.  **Calculate the turning angle $\theta$:**
    The turning angle is the difference between the downstream and upstream Prandtl-Meyer functions:
    $$ \theta = \nu(M_2) - \nu(M_1) $$
    $$ \theta = 0.86853 - 0.20902 $$
    $$ \theta = 0.65951 \text{ radians} $$
    Convert to degrees:
    $$ \theta = 0.65951 \times \frac{180}{\pi} $$
    $$ \theta = 37.78^\circ $$
    *This is the physical angle the nozzle wall must turn to achieve the desired Mach number change.*

4.  **Calculate $P_2$ using isentropic relations:**
    $$ \frac{P_2}{P_1} = \left( \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} \right)^{\gamma/(\gamma-1)} $$
    Substitute the known values:
    $$ \frac{P_2}{100 \text{ kPa}} = \left( \frac{1 + \frac{1.4-1}{2}(1.5)^2}{1 + \frac{1.4-1}{2}(3.0)^2} \right)^{1.4/(1.4-1)} $$
    $$ \frac{P_2}{100} = \left( \frac{1 + 0.2(2.25)}{1 + 0.2(9)} \right)^{3.5} $$
    $$ \frac{P_2}{100} = \left( \frac{1 + 0.45}{1 + 1.8} \right)^{3.5} $$
    $$ \frac{P_2}{100} = \left( \frac{1.45}{2.8} \right)^{3.5} $$
    $$ \frac{P_2}{100} = \left( 0.51786 \right)^{3.5} $$
    $$ \frac{P_2}{100} = 0.10899 $$
    $$ P_2 = 0.10899 \times 100 \text{ kPa} $$
    $$ P_2 = 10.90 \text{ kPa} $$
    *The pressure drops significantly, as expected with a large expansion.*

**Final Answer:**
The corner angle should be $\boxed{\theta \approx 37.78^\circ}$.
The downstream static pressure is $\boxed{P_2 \approx 10.90 \text{ kPa}}$.

**Reflection:** This is an "inverse design" problem, where the desired Mach number change dictates the geometry. It uses the same principles but in a slightly different order. The large turning angle results in a substantial drop in pressure, which is characteristic of strong expansions.

## 6. Common mistakes and traps

1.  **Confusing Expansion with Compression:** The most fundamental mistake. Prandtl-Meyer expansion waves occur when the flow turns *away* from the stream (corner opens up). If the flow turns *into* the stream (corner closes), an oblique shock wave forms, which is a compression process and *not* isentropic.
2.  **Incorrect Sign for Turning Angle:** When applying $\theta = \nu(M_2) - \nu(M_1)$, always remember that for an expansion, $M_2 > M_1$, which means $\nu(M_2) > \nu(M_1)$. If you subtract in the wrong order, you'll get a negative angle, which doesn't make physical sense for a turning angle.
3.  **Forgetting Isentropic Relations:** While the Prandtl-Meyer function handles the Mach number change and turning angle, you still need the standard isentropic flow relations to calculate changes in static pressure, temperature, and density. Don't mix them up with shock relations.
4.  **Using Total Pressure/Temperature Ratios:** Total pressure ($P_0$) and total temperature ($T_0$) remain constant across an isentropic Prandtl-Meyer expansion. Do not use ratios like $P_{02}/P_{01}$ or $T_{02}/T_{01}$ to calculate changes, as these ratios are unity.
5.  **Units for $\arctan$:** The Prandtl-Meyer function involves arctan, which typically returns values in radians. Ensure consistency in units (radians or degrees) throughout your calculations, especially when adding or subtracting angles.
6.  **Treating the Fan as a Single Wave:** Remember that an expansion fan is a continuous region composed of an infinite number of infinitesimal Mach waves. The flow properties change gradually across this region, not suddenly like across a shock.

## 7. Textbook-precise explanation

A Prandtl-Meyer expansion wave describes the two-dimensional, steady, isentropic turning of a supersonic flow around a convex corner. When a supersonic flow, characterized by an upstream Mach number $M_1 > 1$, encounters a wall that turns away from the flow direction by an angle $\theta$, the flow undergoes an expansion. This expansion is achieved through a continuous fan of infinitesimal Mach waves originating from the corner.

Each Mach wave within the fan locally turns the flow by an infinitesimal angle $d\phi$ and increases the Mach number by $dM$. The angle of these Mach waves relative to the local flow direction is the Mach angle, $\mu = \arcsin(1/M)$. Since the expansion is isentropic, there is no change in entropy, and thus total pressure ($P_0$) and total temperature ($T_0$) remain constant across the entire expansion fan.

The cumulative effect of these infinitesimal turnings is quantified by the Prandtl-Meyer function, $\nu(M)$, which represents the angle through which a flow, initially at sonic conditions ($M=1$), must turn isentropically to reach a given Mach number $M$. For an ideal gas with constant specific heats, the Prandtl-Meyer function is defined as:

$$ \nu(M) = \int_1^M \frac{\sqrt{M^2-1}}{1 + \frac{\gamma-1}{2}M^2} \frac{dM}{M} $$

Upon integration, this yields the closed-form expression:

$$ \nu(M) = \sqrt{\frac{\gamma+1}{\gamma-1}} \arctan\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)} - \arctan\sqrt{M^2-1} $$

where $\gamma$ is the ratio of specific heats. The function $\nu(M)$ is typically expressed in radians.

For a flow turning from an upstream Mach number $M_1$ to a downstream Mach number $M_2$ through an expansion angle $\theta$, the relationship is given by:

$$ \theta = \nu(M_2) - \nu(M_1) $$

Since expansion leads to an increase in Mach number ($M_2 > M_1$), it follows that $\nu(M_2) > \nu(M_1)$, ensuring that the turning angle $\theta$ is positive. Across the expansion fan, the static properties of the flow (pressure $P$, temperature $T$, and density $\rho$) decrease according to the isentropic relations:

$$ \frac{P_2}{P_1} = \left( \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} \right)^{\gamma/(\gamma-1)} $$
$$ \frac{T_2}{T_1} = \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} $$
$$ \frac{\rho_2}{\rho_1} = \left( \frac{1 + \frac{\gamma-1}{2}M_1^2}{1 + \frac{\gamma-1}{2}M_2^2} \right)^{1/(\gamma-1)} $$

The Prandtl-Meyer expansion is a cornerstone of supersonic aerodynamic theory, enabling the analysis and design of components such as supersonic nozzles, leading edges of wings, and control surfaces.

*References: Anderson, J. D. Jr. (2017). *Modern Compressible Flow: With Historical Perspective* (4th ed.). McGraw-Hill Education, Chapter 7. Shapiro, A. H. (1953). *The Dynamics and Thermodynamics of Compressible Fluid Flow*, Vol. 1. Ronald Press, Chapter 13.*

## 8. ASCII diagrams

Here's a simplified ASCII diagram illustrating a Prandtl-Meyer expansion fan around a convex corner.

```text
                                       M_2 > M_1
                                       P_2 < P_1
                                       T_2 < T_1
                                       rho_2 < rho_1
                                       (Isentropic)
                                       
                                       /  <--- Flow direction
                                      /   
                                     /
                                    /     (Mach wave at M_2, angle mu_2)
                                   /
                                  /
                                 /
                                /
                               /
                              /
                             /
                            /
                           /
                          /
                         /
                        /
                       /
                      /
                     /
                    /
                   /
                  /
                 /
                /
               /
              /
             /
            /
           /
          /
         /
        /
       /
      /
     /
    /
   /
  /
 /
/
+--------------------------------------------------------------------> M_1
|                                            mu_1 \
|                                                  \
|                                                   \
|                                                    \
|                                                     \
|                                                      \
|                                                       \
|                                                        \
|                                                         \
|                                                          \
|                                                           \
|                                                            \
|                                                             \
|                                                              \
|                                                               \
|                                                                \
|                                                                 \
|                                                                  \
|                                                                   \
|                                                                    \
|                                                                     \
|                                                                      \
|                                                                       \
|                                                                        \
|                                                                         \
|                                                                          \
|                                                                           \
|                                                                            \
|                                                                             \
|                                                                              \
|                                                                               \
|                                                                                \
|                                                                                 \
|                                                                                  \
|                                                                                   \
|                                                                                    \
|                                                                                     \
|                                                                                      \
|                                                                                       \
|                                                                                        \
|                                                                                         \
|                                                                                          \
|                                                                                           \
|                                                                                            \
|                                                                                             \
|                                                                                              \
|                                                                                               \
|                                                                                                \
|                                                                                                 \
|                                                                                                  \
|                                                                                                   \
|                                                                                                    \
|                                                                                                     \
|                                                                                                      \
|                                                                                                       \
|                                                                                                        \
|                                                                                                         \
|                                                                                                          \
|                                                                                                           \
|                                                                                                            \
|                                                                                                             \
|                                                                                                              \
|                                                                                                               \
|                                                                                                                \
|                                                                                                                 \
|                                                                                                                  \
|                                                                                                                   \
|                                                                                                                    \
|                                                                                                                     \
|                                                                                                                      \
|                                                                                                                       \
|                                                                                                                        \
|                                                                                                                         \
|                                                                                                                          \
|                                                                                                                           \
|                                                                                                                            \
|                                                                                                                             \
|                                                                                                                              \
|                                                                                                                               \
|                                                                                                                                \
|                                                                                                                                 \
|                                                                                                                                  \
|                                                                                                                                   \
|                                                                                                                                    \
|                                                                                                                                     \
|                                                                                                                                      \
|                                                                                                                                       \
|                                                                                                                                        \
|                                                                                                                                         \
|                                                                                                                                          \
|                                                                                                                                           \
|                                                                                                                                            \
|                                                                                                                                             \
|                                                                                                                                              \
|                                                                                                                                               \
|                                                                                                                                                \
|                                                                                                                                                 \
|                                                                                                                                                  \
|                                                                                                                                                   \
|                                                                                                                                                    \
|                                                                                                                                                     \
|                                                                                                                                                      \
|                                                                                                                                                       \
|                                                                                                                                                        \
|                                                                                                                                                         \
|                                                                                                                                                          \
|                                                                                                                                                           \
|                                                                                                                                                            \
|                                                                                                                                                             \
|                                                                                                                                                              \
|                                                                                                                                                               \
|                                                                                                                                                                \
|                                                                                                                                                                 \
|                                                                                                                                                                  \
|                                                                                                                                                                   \
|                                                                                                                                                                    \
|                                                                                                                                                                     \
|                                                                                                                                                                      \
|                                                                                                                                                                       \
|                                                                                                                                                                        \
|                                                                                                                                                                         \
|                                                                                                                                                                          \
|                                                                                                                                                                           \
|                                                                                                                                                                            \
|                                                                                                                                                                             \
|                                                                                                                                                                              \
|                                                                                                                                                                               \
|                                                                                                                                                                                \
|                                                                                                                                                                                 \
|                                                                                                                                                                                  \
|                                                                                                                                                                                   \
|                                                                                                                                                                                    \
|                                                                                                                                                                                     \
|                                                                                                                                                                                      \
|                                                                                                                                                                                       \
|                                                                                                                                                                                        \
|                                                                                                                                                                                         \
|                                                                                                                                                                                          \
|                                                                                                                                                                                           \
|                                                                                                                                                                                            \
|                                                                                                                                                                                             \
|                                                                                                                                                                                              \
|                                                                                                                                                                                               \
|                                                                                                                                                                                                \
|                                                                                                                                                                                                 \
|                                                                                                                                                                                                  \
|                                                                                                                                                                                                   \
|                                                                                                                                                                                                    \
|                                                                                                                                                                                                     \
|                                                                                                                                                                                                      \
|                                                                                                                                                                                                       \
|                                                                                                                                                                                                        \
|                                                                                                                                                                                                         \
|                                                                                                                                                                                                          \
|                                                                                                                                                                                                           \
|                                                                                                                                                                                                            \
|                                                                                                                                                                                                             \
|                                                                                                                                                                                                              \
|                                                                                                                                                                                                               \
|                                                                                                                                                                                                                \
|                                                                                                                                                                                                                 \
|                                                                                                                                                                                                                  \
|                                                                                                                                                                                                                   \
|                                                                                                                                                                                                                    \
|                                                                                                                                                                                                                     \
|                                                                                                                                                                                                                      \
|                                                                                                                                                                                                                       \
|                                                                                                                                                                                                                        \
|                                                                                                                                                                                                                         \
|                                                                                                                                                                                                                          \
|                                                                                                                                                                                                                           \
|                                                                                                                                                                                                                            \
|                                                                                                                                                                                                                             \
|                                                                                                                                                                                                                              \
|                                                                                                                                                                                                                               \
|                                                                                                                                                                                                                                \
|                                                                                                                                                                                                                                 \
|                                                                                                                                                                                                                                  \
|                                                                                                                                                                                                                                   \
|                                                                                                                                                                                                                                    \
|                                                                                                                                                                                                                                     \
|                                                                                                                                                                                                                                      \
|                                                                                                                                                                                                                                       \
|                                                                                                                                                                                                                                        \
|                                                                                                                                                                                                                                         \
|                                                                                                                                                                                                                                          \
|                                                                                                                                                                                                                                           \
|                                                                                                                                                                                                                                            \
|                                                                                                                                                                                                                                             \
|                                                                                                                                                                                                                                              \
|                                                                                                                                                                                                                                               \
|                                                                                                                                                                                                                                                \
|                                                                                                                                                                                                                                                 \
|                                                                                                                                                                                                                   /
|                                                                                                                                                                                                                  /
|                                                                                                                                                                                                                 /
|                                                                                                                                                                                                                /
|                                                                                                                                                                                                               /
|                                                                                                                                                                                                              /
|                                                                                                                                                                                                             /
|                                                                                                                                                                                                            /
|                                                                                                                                                                                                           /
|                                                                                                                                                                                                          /
|                                                                                                                                                                                                         /
|                                                                                                                                                                                                        /
|                                                                                                                                                                                                       /
|                                                                                                                                                                                                      /
|                                                                                                                                                                                                     /
|                                                                                                                                                                                                    /
|                                                                                                                                                                                                   /
|                                                                                                                                                                                                  /
|                                                                                                                                                                                                 /
|                                                                                                                                                                                                /
|                                                                                                                                                                                               /
|                                                                                                                                                                                              /
|                                                                                                                                                                                             /
|                                                                                                                                                                                            /
|                                                                                                                                                                                           /
|                                                                                                                                                                                          /
|                                                                                                                                                                                         /
|                                                                                                                                                                                        /
|                                                                                                                                                                                       /
|                                                                                                                                                                                      /
|                                                                                                                                                                                     /
|                                                                                                                                                                                    /
|                                                                                                                                                                                   /
|                                                                                                                                                                                  /
|                                                                                                                                                                                 /
|                                                                                                                                                                                /
|                                                                                                                                                                               /
|                                                                                                                                                                              /
|                                                                                                                                                                             /
|                                                                                                                                                                            /
|                                                                                                                                                                           /
|                                                                                                                                                                          /
|                                                                                                                                                                         /
|                                                                                                                                                                        /
|                                                                                                                                                                       /
|                                                                                                                                                                      /
|                                                                                                                                                                     /
|                                                                                                                                                                    /
|                                                                                                                                                                   /
|                                                                                                                                                                  /
|                                                                                                                                                                 /
|                                                                                                                                                                /
|                                                                                                                                                               /
|                                                                                                                                                              /
|                                                                                                                                                             /
|                                                                                                                                                            /
|                                                                                                                                                           /
|                                                                                                                                                          /
|                                                                                                                                                         /
|                                                                                                                                                        /
|                                                                                                                                                       /
|                                                                                                                                                      /
|                                                                                                                                                     /
|                                                                                                                                                    /
|                                                                                                                                                   /
|                                                                                                                                                  /
|                                                                                                                                                 /
|                                                                                                                                                /
|                                                                                                                                               /
|                                                                                                                                              /
|                                                                                                                                             /
|                                                                                                                                            /
|                                                                                                                                           /
|                                                                                                                                          /
|                                                                                                                                         /
|                                                                                                                                        /
|                                                                                                                                       /
|                                                                                                                                      /
|                                                                                                                                     /
|                                                                                                                                    /
|                                                                                                                                   /
|                                                                                                                                  /
|                                                                                                                                 /
|                                                                                                                                /
|                                                                                                                               /
|                                                                                                                              /
|                                                                                                                             /
|                                                                                                                            /
|                                                                                                                           /
|                                                                                                                          /
|                                                                                                                         /
|                                                                                                                        /
|                                                                                                                       /
|                                                                                                                      /
|                                                                                                                     /
|                                                                                                                    /
|                                                                                                                   /
|                                                                                                                  /
|                                                                                                                 /
|                                                                                                                /
|                                                                                                               /
|                                                                                                              /
|                                                                                                             /
|                                                                                                            /
|                                                                                                           /
|                                                                                                          /
|                                                                                                         /
|                                                                                                        /
|                                                                                                       /
|                                                                                                      /
|                                                                                                     /
|                                                                                                    /
|                                                                                                   /
|                                                                                                  /
|                                                                                                 /
|                                                                                                /
|                                                                                               /
|                                                                                              /
|                                                                                             /
|                                                                                            /
|                                                                                           /
|                                                                                          /
|                                                                                         /
|                                                                                        /
|                                                                                       /
|                                                                                      /
|                                                                                     /
|                                                                                    /
|                                                                                   /
|                                                                                  /
|                                                                                 /
|                                                                                /
|                                                                               /
|                                                                              /
|                                                                             /
|                                                                            /
|                                                                           /
|                                                                          /
|                                                                         /
|                                                                        /
|                                                                       /
|                                                                      /
|                                                                     /
|                                                                    /
|                                                                   /
|                                                                  /
|                                                                 /
|                                                                /
|                                                               /
|                                                              /
|                                                             /
|                                                            /
|                                                           /
|                                                          /
|                                                         /
|                                                        /
|                                                       /
|                                                      /
|                                                     /
|                                                    /
|                                                   /
|                                                  /
|                                                 /
|                                                /
|                                               /
|                                              /
|                                             /
|                                            /
|                                           /
|                                          /
|                                         /
|                                        /
|                                       /
|                                      /
|                                     /
|                                    /
|                                   /
|                                  /
|                                 /
|                                /
|                               /
|                             /
|                            /
|                           /
|                          /
|                         /
|                        /
|                       /
|                      /
|                     /
|                    /
|                   /
|                  /
|                 /
|                /
|               /
|              /
|             /
|            /
|           /
|          /
|         /
|        /
|       /
|      /
|     /
|    /
|   /
|  /
| /
|/
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------