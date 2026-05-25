## 1. What it is — in plain English

Imagine you're watering your garden with a hose. If you want the water to shoot out faster and further, what do you do? You put your thumb over the end, making the opening smaller. This "squeezing" action speeds up the water. That's the basic idea behind a nozzle: it's a specially shaped tube designed to increase the speed of a fluid, usually by reducing its cross-sectional area.

Now, imagine you want to speed up something much, much faster – faster than the speed of sound, like a rocket exhaust. Just squeezing it with a simple, narrowing tube (a "converging" nozzle) won't work past the speed of sound. In fact, if you keep squeezing after the flow hits the speed of sound, it will actually *slow down*! This is where the magic of a "converging-diverging" nozzle comes in.

A converging-diverging nozzle, often called a de Laval nozzle, is like two funnels joined at their narrowest point. First, the tube narrows down (the "converging" part) to a minimum area called the "throat." Here, the flow can reach the speed of sound. Then, crucially, the tube starts to widen out again (the "diverging" part). This widening section, counter-intuitively, is what allows the flow to accelerate *beyond* the speed of sound, achieving supersonic speeds.

So, in simple terms, it's a special hourglass-shaped tube that takes a relatively slow-moving, high-pressure gas, first squeezes it to make it go fast (up to the speed of sound), and then expands it to make it go *even faster* (supersonic), converting pressure energy into kinetic energy to generate powerful thrust.

## 2. Why it matters — real-world applications

The converging-diverging (de Laval) nozzle is a cornerstone of modern aerospace engineering and has profound implications for energy generation and high-speed fluid mechanics.

1.  **Rocket Engines:** This is the most iconic application. Every chemical rocket engine, from the mighty Space Launch System (SLS) to SpaceX's Falcon 9, uses a de Laval nozzle to accelerate the hot, high-pressure combustion gases produced in the combustion chamber to supersonic speeds. This super-fast exhaust stream is what generates the immense thrust needed to propel rockets into orbit and beyond. Without de Laval nozzles, space travel as we know it would be impossible, as the efficiency of converting thermal energy to kinetic energy would be drastically reduced.

2.  **Jet Engines (Afterburners and Supersonic Nozzles):** While the primary nozzle of a typical turbofan jet engine is often a simple converging design (as the exhaust is usually subsonic), military fighter jets designed for supersonic flight often incorporate variable-geometry de Laval nozzles, especially in their afterburners. An afterburner injects and burns additional fuel in the exhaust stream to provide a significant thrust boost. A variable de Laval nozzle allows the engine to optimize its performance for both subsonic and supersonic flight conditions, ensuring efficient acceleration to and through the sound barrier.

3.  **Steam Turbines for Power Generation:** In power plants, high-pressure steam is expanded through nozzles to drive turbine blades, which then turn generators to produce electricity. For maximum efficiency, especially in the later stages of large turbines, the steam often needs to reach supersonic speeds. De Laval nozzles are employed here to convert the steam's thermal and pressure energy into kinetic energy efficiently, maximizing the rotational speed and power output of the turbine.

4.  **Supersonic Wind Tunnels:** To test aircraft and spacecraft designs at supersonic speeds, engineers use supersonic wind tunnels. These tunnels rely on large de Laval nozzles to accelerate air from a high-pressure reservoir to the desired supersonic Mach number in the test section. The precise design of the nozzle determines the Mach number achieved, allowing for controlled study of aerodynamic phenomena like shock waves and drag at speeds relevant to supersonic flight.

## 3. Prerequisites — what you must know first

Before diving deep into de Laval nozzles, you must have a solid grasp of the following foundational concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Fluid Dynamics Fundamentals:** Basic understanding of fluid properties (density, pressure, temperature, velocity), and the distinction between static and stagnation (total) properties.
*   **Conservation Laws (Integral Form):**
    *   **Conservation of Mass (Continuity Equation):** $\dot{m} = \rho A V = \text{constant}$ for steady flow. This states that mass flow rate through a duct remains constant.
    *   **Conservation of Momentum (Newton's Second Law):** $\sum \vec{F} = \dot{m} (\vec{V}_{\text{out}} - \vec{V}_{\text{in}})$. This relates forces to changes in momentum.
    *   **Conservation of Energy (First Law of Thermodynamics for Control Volumes):** $h_1 + \frac{V_1^2}{2} + gz_1 = h_2 + \frac{V_2^2}{2} + gz_2 + q - w_s$. For adiabatic, horizontal flow through a nozzle with no work done, this simplifies to $h_0 = h + \frac{V^2}{2} = \text{constant}$, where $h_0$ is stagnation enthalpy.
*   **Thermodynamics of Ideal Gases:**
    *   **Ideal Gas Law:** $P = \rho R T$. Relates pressure, density, and temperature.
    *   **Specific Heats:** $c_p$ and $c_v$, and their ratio $\gamma = c_p/c_v$.
    *   **Enthalpy and Internal Energy:** $h = u + Pv$, and $dh = c_p dT$, $du = c_v dT$.
*   **Speed of Sound:** The speed at which small disturbances propagate through a fluid, $a = \sqrt{\gamma R T}$.
*   **Mach Number:** The ratio of local flow velocity to the local speed of sound, $M = V/a$. Crucial for classifying flow as subsonic ($M<1$), sonic ($M=1$), or supersonic ($M>1$).
*   **Isentropic Flow:** Flow that is both adiabatic (no heat transfer) and reversible (no friction or other irreversibilities). This is a common and powerful idealization for nozzle flow, leading to simple relations between properties.
*   **Isentropic Flow Relations:** Equations that relate static properties ($P, T, \rho$) to stagnation properties ($P_0, T_0, \rho_0$) and Mach number for isentropic flow, such as $P/P_0 = (1 + \frac{\gamma-1}{2}M^2)^{-\gamma/(\gamma-1)}$.
*   **Nozzle Flow Basics:** Understanding how a simple converging nozzle works to accelerate subsonic flow and the concept of "choking" (maximum mass flow rate).

## 4. The core idea — step by step

The de Laval nozzle is a marvel of fluid dynamics because it achieves something counter-intuitive: accelerating a fluid *beyond* the speed of sound by first squeezing it and then letting it expand. Let's break down the core ideas.

### Step 1: Energy Conversion in a Nozzle

*   **Plain English:** A nozzle's primary job is to turn the stored energy (pressure and internal energy) of a high-pressure fluid into kinetic energy, making the fluid move very fast. Think of it like a spring-loaded toy car: the compressed spring (high pressure) is released, pushing the car (fluid) forward.
*   **Small concrete example:** In a rocket engine, the hot, high-pressure gases from combustion have a lot of internal energy. As these gases pass through the nozzle, this internal energy and pressure energy are converted into the kinetic energy of the exhaust stream, making the gases shoot out at incredibly high speeds.
*   **Formal/mathematical version:** For steady, adiabatic, one-dimensional flow through a nozzle with negligible potential energy changes and no work done, the conservation of energy equation simplifies to:
    $$h_0 = h + \frac{V^2}{2}$$
    Where $h_0$ is the stagnation enthalpy (total energy per unit mass), $h$ is the static enthalpy, and $V$ is the flow velocity. For an ideal gas, $h = c_p T$, so we can write:
    $$c_p T_0 = c_p T + \frac{V^2}{2}$$
    This shows that as velocity $V$ increases, the static temperature $T$ must decrease, converting thermal energy into kinetic energy, while the stagnation temperature $T_0$ (which represents the total energy content) remains constant.
*   **What could go wrong:** Assuming the stagnation temperature changes. In an ideal adiabatic nozzle, $T_0$ remains constant from inlet to exit. Also, confusing static temperature with stagnation temperature.

### Step 2: The Critical Role of the Speed of Sound

*   **Plain English:** The speed of sound isn't just a number; it's a fundamental barrier in fluid flow. How a fluid behaves changes dramatically when it crosses this speed. Below the speed of sound (subsonic), disturbances can travel upstream, "telling" the fluid what's ahead. Above the speed of sound (supersonic), disturbances can't travel upstream; the fluid is essentially "unaware" of what's coming. This difference in communication fundamentally alters how area changes affect velocity.
*   **Small concrete example:** Imagine trying to shout instructions to a person running towards you. If they're running slower than your voice travels (subsonic), they'll hear you. If they're running faster than your voice (supersonic), they'll pass you before your voice reaches them, effectively receiving no warning.
*   **Formal/mathematical version:** The local speed of sound is $a = \sqrt{\gamma R T}$. The Mach number is $M = V/a$. The critical condition is $M=1$.
*   **What could go wrong:** Not appreciating that the physics of flow changes fundamentally at $M=1$. Applying subsonic intuition to supersonic flow will lead to incorrect conclusions.

### Step 3: Converging Section — Accelerating Subsonic Flow

*   **Plain English:** For flow moving *slower* than sound (subsonic), making the tube narrower (converging) forces the fluid to speed up. This is intuitive: if the same amount of fluid has to pass through a smaller hole in the same amount of time, it must move faster.
*   **Small concrete example:** Squeezing a garden hose with your thumb. The water speeds up as it exits the smaller opening.
*   **Formal/mathematical version:** The differential form of the area-velocity relation for one-dimensional, isentropic flow is:
    $$\frac{dA}{A} = \frac{dV}{V}(M^2 - 1)$$
    For subsonic flow ($M < 1$), the term $(M^2 - 1)$ is negative. Therefore, if we want to increase velocity ($dV > 0$), we must have $dA < 0$, meaning the area must decrease. So, a converging section accelerates subsonic flow.
*   **What could go wrong:** Expecting this to work indefinitely. A converging nozzle can only accelerate flow up to, but not beyond, $M=1$. Once $M=1$ is reached at the exit, it "chokes."

### Step 4: The Throat — Reaching Sonic Speed (Choking)

*   **Plain English:** The "throat" is the narrowest point of the de Laval nozzle. This is the crucial bottleneck where, if the pressure difference across the nozzle is large enough, the flow *must* reach exactly the speed of sound ($M=1$). Once the flow reaches $M=1$ at the throat, the nozzle is said to be "choked." At this point, the mass flow rate through the nozzle reaches its maximum possible value and cannot increase further, even if the downstream pressure is lowered.
*   **Small concrete example:** Imagine a busy highway with a single toll booth. During rush hour, the toll booth is the bottleneck, and cars can only pass through it at a certain maximum rate. Even if the highway beyond the toll booth is completely empty, you can't get more cars through the toll booth per minute.
*   **Formal/mathematical version:** At the throat, $dA = 0$. From the area-velocity relation $\frac{dA}{A} = \frac{dV}{V}(M^2 - 1)$, if $dA = 0$ and $dV \ne 0$, then it must be that $(M^2 - 1) = 0$, which implies $M=1$. The area at the throat when $M=1$ is denoted $A^*$. The ratio of any area $A$ to the throat area $A^*$ for isentropic flow is given by:
    $$\frac{A}{A^*} = \frac{1}{M} \left[ \frac{2}{\gamma+1} \left(1 + \frac{\gamma-1}{2}M^2 \right) \right]^{(\gamma+1)/(2(\gamma-1))}$$
    This equation is fundamental for de Laval nozzle design and analysis.
*   **What could go wrong:** Assuming flow *always* reaches $M=1$ at the throat. It only does if the pressure ratio $P_{\text{back}}/P_0$ is below a critical value. If the back pressure is too high, the flow remains subsonic throughout the entire nozzle.

### Step 5: Diverging Section — Accelerating Supersonic Flow

*   **Plain English:** This is the most counter-intuitive part. For flow moving *faster* than sound (supersonic), making the tube *wider* (diverging) actually causes the fluid to speed up even more. This is because at supersonic speeds, density changes become dominant. As the area increases, the density drops significantly, and for mass flow to be conserved, the velocity must increase even more to compensate for the lower density.
*   **Small concrete example:** This is hard to visualize with everyday experience because we don't naturally observe supersonic flow. Think of it more abstractly: once the "information" (pressure waves) can no longer travel upstream, the fluid effectively expands into the larger area, and this expansion energy is converted into further velocity.
*   **Formal/mathematical version:** Again, using the area-velocity relation:
    $$\frac{dA}{A} = \frac{dV}{V}(M^2 - 1)$$
    For supersonic flow ($M > 1$), the term $(M^2 - 1)$ is positive. Therefore, if we want to increase velocity ($dV > 0$), we must have $dA > 0$, meaning the area must increase. So, a diverging section accelerates supersonic flow.
*   **What could go wrong:** Applying the subsonic intuition that a wider area means slower flow. This is a common trap. Remember, the physics changes at $M=1$.

### Step 6: Back Pressure and Operating Regimes

*   **Plain English:** The pressure outside the nozzle, called the "back pressure" ($P_b$), plays a huge role in how the de Laval nozzle operates. Depending on how low the back pressure is relative to the inlet pressure, the flow can be entirely subsonic, choked at the throat and then subsonic in the diverging section, or choked and then supersonic in the diverging section. If the back pressure is *just right*, the flow exits perfectly at the design pressure. If it's too high or too low, complex phenomena like shock waves or expansion waves occur at the exit.
*   **Small concrete example:** Imagine a car exhaust. If the muffler is blocked (high back pressure), the engine struggles. If it's completely open (low back pressure), the exhaust flows freely. A de Laval nozzle is similar, but the "struggle" can involve dramatic changes in flow behavior.
*   **Formal/mathematical version:** The ratio $P_b/P_0$ (where $P_0$ is the stagnation pressure at the inlet) determines the flow regime.
    *   If $P_b/P_0$ is high (close to 1), flow is subsonic throughout.
    *   As $P_b/P_0$ decreases, velocity increases. At a critical pressure ratio, $M=1$ is reached at the throat (choking).
    *   Further decreasing $P_b/P_0$ will cause supersonic flow in the diverging section, but the exit pressure $P_e$ might not match $P_b$.
    *   If $P_e > P_b$ (overexpanded), compression waves or a normal shock wave forms inside or at the exit.
    *   If $P_e < P_b$ (underexpanded), expansion waves form at the exit.
    *   If $P_e = P_b$, the nozzle is perfectly expanded.
*   **What could go wrong:** Assuming the flow will always be perfectly isentropic and exit at the design Mach number regardless of back pressure. Real nozzles experience shocks and expansion waves if the back pressure isn't perfectly matched.

## 5. Worked examples — multiple, with every step shown

We will use $\gamma = 1.4$ for air/combustion products unless otherwise specified. $R = 287 \text{ J/(kg K)}$.

---

### Example 1: Choked Throat Area Calculation

**Problem:** A rocket engine operates with a combustion chamber pressure ($P_0$) of $10 \text{ MPa}$ and a temperature ($T_0$) of $3000 \text{ K}$. The gas constant for the exhaust products is $R = 300 \text{ J/(kg K)}$ and $\gamma = 1.25$. If the mass flow rate ($\dot{m}$) through the nozzle is $250 \text{ kg/s}$, what is the required throat area ($A^*$), assuming the nozzle is choked?

**Given:**
*   $P_0 = 10 \text{ MPa} = 10 \times 10^6 \text{ Pa}$
*   $T_0 = 3000 \text{ K}$
*   $R = 300 \text{ J/(kg K)}$
*   $\gamma = 1.25$
*   $\dot{m} = 250 \text{ kg/s}$
*   We want to find $A^*$.

**Solution:**

1.  **Identify the conditions at the throat:** For a choked nozzle, the Mach number at the throat ($M^*$) is 1.
    *   *Why this step works:* This is the definition of choking in a de Laval nozzle.

2.  **Calculate the critical temperature ($T^*$) at the throat:** We use the isentropic relation for temperature ratio at $M=1$.
    $$ \frac{T^*}{T_0} = \left(1 + \frac{\gamma-1}{2}(M^*)^2 \right)^{-1} $$
    Since $M^* = 1$:
    $$ \frac{T^*}{T_0} = \left(1 + \frac{\gamma-1}{2}(1)^2 \right)^{-1} = \left(\frac{\gamma+1}{2} \right)^{-1} = \frac{2}{\gamma+1} $$
    Substitute the given values:
    $$ T^* = T_0 \frac{2}{\gamma+1} = (3000 \text{ K}) \frac{2}{1.25+1} $$
    $$ T^* = (3000 \text{ K}) \frac{2}{2.25} = (3000 \text{ K}) \times 0.8888... $$
    $$ T^* = 2666.67 \text{ K} $$
    *   *Why this step works:* This is a standard isentropic flow relation that gives the static temperature at the throat when the flow is sonic, based on the stagnation temperature and specific heat ratio.

3.  **Calculate the critical pressure ($P^*$) at the throat:** We use the isentropic relation for pressure ratio at $M=1$.
    $$ \frac{P^*}{P_0} = \left(1 + \frac{\gamma-1}{2}(M^*)^2 \right)^{-\gamma/(\gamma-1)} $$
    Since $M^* = 1$:
    $$ \frac{P^*}{P_0} = \left(\frac{\gamma+1}{2} \right)^{-\gamma/(\gamma-1)} $$
    Substitute the given values:
    $$ P^* = P_0 \left(\frac{2}{\gamma+1} \right)^{\gamma/(\gamma-1)} = (10 \times 10^6 \text{ Pa}) \left(\frac{2}{1.25+1} \right)^{1.25/(1.25-1)} $$
    $$ P^* = (10 \times 10^6 \text{ Pa}) \left(\frac{2}{2.25} \right)^{1.25/0.25} = (10 \times 10^6 \text{ Pa}) (0.8888...)^5 $$
    $$ P^* = (10 \times 10^6 \text{ Pa}) \times 0.55648 $$
    $$ P^* = 5.5648 \times 10^6 \text{ Pa} $$
    *   *Why this step works:* Similar to the temperature ratio, this is an isentropic flow relation for the static pressure at the throat when the flow is sonic.

4.  **Calculate the density ($\rho^*$) at the throat:** Use the ideal gas law at the throat conditions.
    $$ P^* = \rho^* R T^* \implies \rho^* = \frac{P^*}{R T^*} $$
    Substitute the values:
    $$ \rho^* = \frac{5.5648 \times 10^6 \text{ Pa}}{(300 \text{ J/(kg K)}) (2666.67 \text{ K})} $$
    $$ \rho^* = \frac{5.5648 \times 10^6}{800001} $$
    $$ \rho^* = 6.956 \text{ kg/m}^3 $$
    *   *Why this step works:* The ideal gas law relates pressure, density, and temperature for the gas at the throat.

5.  **Calculate the speed of sound ($a^*$) at the throat:**
    $$ a^* = \sqrt{\gamma R T^*} $$
    Substitute the values:
    $$ a^* = \sqrt{(1.25) (300 \text{ J/(kg K)}) (2666.67 \text{ K})} $$
    $$ a^* = \sqrt{999999.375} $$
    $$ a^* \approx 1000 \text{ m/s} $$
    *   *Why this step works:* This is the definition of the speed of sound, calculated using the static temperature at the throat.

6.  **Calculate the velocity ($V^*$) at the throat:** Since $M^* = 1$, the velocity at the throat is equal to the speed of sound at the throat.
    $$ V^* = M^* a^* = 1 \times 1000 \text{ m/s} = 1000 \text{ m/s} $$
    *   *Why this step works:* By definition, Mach number is $V/a$. At the throat, $M=1$, so $V=a$.

7.  **Calculate the throat area ($A^*$):** Use the mass flow rate equation.
    $$ \dot{m} = \rho^* A^* V^* \implies A^* = \frac{\dot{m}}{\rho^* V^*} $$
    Substitute the values:
    $$ A^* = \frac{250 \text{ kg/s}}{(6.956 \text{ kg/m}^3) (1000 \text{ m/s})} $$
    $$ A^* = \frac{250}{6956} $$
    $$ A^* = 0.03594 \text{ m}^2 $$

    The required throat area is $\boxed{\mathbf{0.03594 \text{ m}^2}}$.

**Reflection:** This example demonstrates the step-by-step process of finding throat conditions and area for a choked nozzle. The trickiest part is correctly applying the isentropic relations and ensuring all properties (P, T, $\rho$, V, a) are evaluated at the *throat* conditions, not the stagnation conditions.

---

### Example 2: Exit Mach Number and Pressure for Supersonic Flow

**Problem:** A de Laval nozzle has an inlet stagnation pressure $P_0 = 5 \text{ MPa}$ and stagnation temperature $T_0 = 1500 \text{ K}$. The throat area $A^*$ is $0.01 \text{ m}^2$ and the exit area $A_e$ is $0.05 \text{ m}^2$. Assuming isentropic flow with $\gamma = 1.4$, determine the exit Mach number ($M_e$) and exit static pressure ($P_e$).

**Given:**
*   $P_0 = 5 \text{ MPa}$
*   $T_0 = 1500 \text{ K}$
*   $A^* = 0.01 \text{ m}^2$
*   $A_e = 0.05 \text{ m}^2$
*   $\gamma = 1.4$
*   We want to find $M_e$ and $P_e$.

**Solution:**

1.  **Calculate the area ratio:**
    $$ \frac{A_e}{A^*} = \frac{0.05 \text{ m}^2}{0.01 \text{ m}^2} = 5 $$
    *   *Why this step works:* The area ratio is a key parameter in isentropic flow relations, linking the physical geometry to the Mach number.

2.  **Use the isentropic area-Mach number relation to find $M_e$:** We assume supersonic flow in the diverging section, so we look for $M > 1$.
    $$ \frac{A_e}{A^*} = \frac{1}{M_e} \left[ \frac{2}{\gamma+1} \left(1 + \frac{\gamma-1}{2}M_e^2 \right) \right]^{(\gamma+1)/(2(\gamma-1))} $$
    Substitute $\frac{A_e}{A^*} = 5$ and $\gamma = 1.4$:
    $$ 5 = \frac{1}{M_e} \left[ \frac{2}{1.4+1} \left(1 + \frac{1.4-1}{2}M_e^2 \right) \right]^{(1.4+1)/(2(1.4-1))} $$
    $$ 5 = \frac{1}{M_e} \left[ \frac{2}{2.4} \left(1 + 0.2 M_e^2 \right) \right]^{2.4/0.8} $$
    $$ 5 = \frac{1}{M_e} \left[ 0.8333 (1 + 0.2 M_e^2) \right]^3 $$
    This equation is transcendental and must be solved iteratively or by using isentropic flow tables. Looking up $\frac{A}{A^*}=5$ in standard isentropic flow tables for $\gamma=1.4$ (or using a numerical solver), we find:
    $$ M_e \approx 3.162 $$
    *   *Why this step works:* This is the fundamental relation that connects the area ratio of an isentropic nozzle to the Mach number at that area. Since we're looking for supersonic flow, we choose the $M>1$ solution.

3.  **Calculate the exit static pressure ($P_e$):** Use the isentropic pressure ratio relation with $M_e$.
    $$ \frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2 \right)^{-\gamma/(\gamma-1)} $$
    Substitute $M_e = 3.162$, $P_0 = 5 \text{ MPa}$, and $\gamma = 1.4$:
    $$ P_e = P_0 \left(1 + \frac{1.4-1}{2}(3.162)^2 \right)^{-1.4/(1.4-1)} $$
    $$ P_e = (5 \text{ MPa}) \left(1 + 0.2(9.998) \right)^{-1.4/0.4} $$
    $$ P_e = (5 \text{ MPa}) \left(1 + 1.9996 \right)^{-3.5} $$
    $$ P_e = (5 \text{ MPa}) (2.9996)^{-3.5} $$
    $$ P_e = (5 \text{ MPa}) \times 0.01955 $$
    $$ P_e = 0.09775 \text{ MPa} $$

    The exit Mach number is $\boxed{\mathbf{M_e \approx 3.162}}$ and the exit static pressure is $\boxed{\mathbf{P_e \approx 0.09775 \text{ MPa}}}$.

**Reflection:** The main challenge here is solving the transcendental area-Mach relation. In practice, engineers use tables or software. It highlights how a large area ratio leads to a high supersonic Mach number and a significant drop in static pressure.

---

### Example 3: Rocket Engine Thrust Calculation

**Problem:** A rocket engine has a combustion chamber where the stagnation pressure is $P_0 = 15 \text{ MPa}$ and stagnation temperature is $T_0 = 3500 \text{ K}$. The exhaust gas has $\gamma = 1.2$ and $R = 320 \text{ J/(kg K)}$. The nozzle throat area $A^*$ is $0.1 \text{ m}^2$ and the exit area $A_e$ is $0.5 \text{ m}^2$. The nozzle is perfectly expanded, meaning the exit static pressure $P_e$ equals the ambient back pressure $P_b = 80 \text{ kPa}$. Calculate the thrust produced by this engine.

**Given:**
*   $P_0 = 15 \text{ MPa} = 15 \times 10^6 \text{ Pa}$
*   $T_0 = 3500 \text{ K}$
*   $\gamma = 1.2$
*   $R = 320 \text{ J/(kg K)}$
*   $A^* = 0.1 \text{ m}^2$
*   $A_e = 0.5 \text{ m}^2$
*   $P_b = P_e = 80 \text{ kPa} = 80 \times 10^3 \text{ Pa}$
*   We want to find Thrust ($F$).

**Solution:**

1.  **Calculate the area ratio:**
    $$ \frac{A_e}{A^*} = \frac{0.5 \text{ m}^2}{0.1 \text{ m}^2} = 5 $$
    *   *Why this step works:* Again, the area ratio is needed to find the exit Mach number.

2.  **Find the exit Mach number ($M_e$) using the area-Mach relation:**
    $$ \frac{A_e}{A^*} = \frac{1}{M_e} \left[ \frac{2}{\gamma+1} \left(1 + \frac{\gamma-1}{2}M_e^2 \right) \right]^{(\gamma+1)/(2(\gamma-1))} $$
    Substitute $\frac{A_e}{A^*} = 5$ and $\gamma = 1.2$:
    $$ 5 = \frac{1}{M_e} \left[ \frac{2}{1.2+1} \left(1 + \frac{1.2-1}{2}M_e^2 \right) \right]^{(1.2+1)/(2(1.2-1))} $$
    $$ 5 = \frac{1}{M_e} \left[ \frac{2}{2.2} \left(1 + 0.1 M_e^2 \right) \right]^{2.2/0.4} $$
    $$ 5 = \frac{1}{M_e} \left[ 0.90909 (1 + 0.1 M_e^2) \right]^{5.5} $$
    Solving this numerically (or using tables for $\gamma=1.2$), we find:
    $$ M_e \approx 3.018 $$
    *   *Why this step works:* This gives us the velocity at the exit in terms of Mach number, which is essential for calculating exit velocity and mass flow.

3.  **Calculate the exit static temperature ($T_e$):**
    $$ \frac{T_e}{T_0} = \left(1 + \frac{\gamma-1}{2}M_e^2 \right)^{-1} $$
    $$ T_e = T_0 \left(1 + \frac{1.2-1}{2}(3.018)^2 \right)^{-1} $$
    $$ T_e = (3500 \text{ K}) \left(1 + 0.1(9.108) \right)^{-1} $$
    $$ T_e = (3500 \text{ K}) (1.9108)^{-1} $$
    $$ T_e = 1831.6 \text{ K} $$
    *   *Why this step works:* Required to find the speed of sound and thus the actual exit velocity.

4.  **Calculate the speed of sound ($a_e$) at the exit:**
    $$ a_e = \sqrt{\gamma R T_e} $$
    $$ a_e = \sqrt{(1.2) (320 \text{ J/(kg K)}) (1831.6 \text{ K})} $$
    $$ a_e = \sqrt{702374.4} $$
    $$ a_e = 838.08 \text{ m/s} $$
    *   *Why this step works:* The speed of sound is directly related to the local temperature and gas properties.

5.  **Calculate the exit velocity ($V_e$):**
    $$ V_e = M_e a_e $$
    $$ V_e = (3.018) (838.08 \text{ m/s}) $$
    $$ V_e = 2529.2 \text{ m/s} $$
    *   *Why this step works:* Definition of Mach number.

6.  **Calculate the mass flow rate ($\dot{m}$):** First, find the throat conditions.
    *   $T^* = T_0 \frac{2}{\gamma+1} = (3500 \text{ K}) \frac{2}{1.2+1} = (3500 \text{ K}) \frac{2}{2.2} = 3181.8 \text{ K}$
    *   $a^* = \sqrt{\gamma R T^*} = \sqrt{(1.2)(320)(3181.8)} = \sqrt{1221888} = 1105.4 \text{ m/s}$
    *   $V^* = a^* = 1105.4 \text{ m/s}$ (since $M^*=1$)
    *   $P^* = P_0 \left(\frac{2}{\gamma+1} \right)^{\gamma/(\gamma-1)} = (15 \times 10^6 \text{ Pa}) \left(\frac{2}{2.2} \right)^{1.2/0.2} = (15 \times 10^6) (0.90909)^6 = 8.00 \times 10^6 \text{ Pa}$
    *   $\rho^* = \frac{P^*}{R T^*} = \frac{8.00 \times 10^6 \text{ Pa}}{(320 \text{ J/(kg K)}) (3181.8 \text{ K})} = 7.85 \text{ kg/m}^3$
    *   $\dot{m} = \rho^* A^* V^* = (7.85 \text{ kg/m}^3) (0.1 \text{ m}^2) (1105.4 \text{ m/s})$
    $$ \dot{m} = 867.7 \text{ kg/s} $$
    *   *Why this step works:* The mass flow rate is constant throughout the nozzle. Calculating it at the choked throat is often the most straightforward way, as $M=1$ conditions are well-defined.

7.  **Calculate the thrust ($F$):** For a perfectly expanded nozzle, the thrust equation simplifies to:
    $$ F = \dot{m} V_e $$
    Substitute the values:
    $$ F = (867.7 \text{ kg/s}) (2529.2 \text{ m/s}) $$
    $$ F = 2194900 \text{ N} $$
    $$ F = 2.195 \text{ MN} $$

    The thrust produced by the engine is $\boxed{\mathbf{2.195 \text{ MN}}}$.

**Reflection:** This example integrates several concepts: isentropic relations, area-Mach relation, ideal gas law, and finally the thrust equation. The "perfectly expanded" condition simplifies the thrust calculation by eliminating the $(P_e - P_b)A_e$ term. The most complex part is finding $M_e$ from the area ratio, which often requires iterative methods or tables.

---

### Example 4: Operating Regimes of a C-D Nozzle

**Problem:** A de Laval nozzle has an inlet stagnation pressure $P_0 = 1 \text{ MPa}$ and stagnation temperature $T_0 = 300 \text{ K}$. The throat area $A^*$ is $0.005 \text{ m}^2$ and the exit area $A_e$ is $0.015 \text{ m}^2$. Assume $\gamma = 1.4$. Determine the range of back pressures ($P_b$) for the following operating regimes:
    a) Subsonic flow throughout the nozzle.
    b) Choked flow with a normal shock wave in the diverging section.
    c) Perfectly expanded supersonic flow.
    d) Underexpanded supersonic flow.

**Given:**
*   $P_0 = 1 \text{ MPa} = 10^6 \text{ Pa}$
*   $T_0 = 300 \text{ K}$
*   $A^* = 0.005 \text{ m}^2$
*   $A_e = 0.015 \text{ m}^2$
*   $\gamma = 1.4$

**Solution:**

1.  **Calculate the area ratio:**
    $$ \frac{A_e}{A^*} = \frac{0.015 \text{ m}^2}{0.005 \text{ m}^2} = 3 $$
    *   *Why this step works:* This ratio is crucial for determining Mach numbers and critical pressures.

2.  **Determine critical pressure ratio for choking ($P^*/P_0$):**
    $$ \frac{P^*}{P_0} = \left(\frac{2}{\gamma+1} \right)^{\gamma/(\gamma-1)} = \left(\frac{2}{1.4+1} \right)^{1.4/(1.4-1)} = \left(\frac{2}{2.4} \right)^{1.4/0.4} = (0.8333)^{3.5} $$
    $$ \frac{P^*}{P_0} \approx 0.528 $$
    So, $P^* = 0.528 \times P_0 = 0.528 \times 10^6 \text{ Pa} = 528 \text{ kPa}$.
    *   *Why this step works:* This is the pressure at the throat when $M=1$. If $P_b$ is above this, the flow is not choked.

3.  **Determine the exit pressure for perfectly expanded supersonic flow ($P_{e,sup}$):**
    First, find the supersonic Mach number at the exit ($M_{e,sup}$) for $A_e/A^* = 3$. Using the isentropic area-Mach relation for $\gamma=1.4$:
    $$ 3 = \frac{1}{M_{e,sup}} \left[ \frac{2}{2.4} \left(1 + 0.2 M_{e,sup}^2 \right) \right]^{3} $$
    Solving numerically or using tables for $\frac{A}{A^*} = 3$, we find:
    $$ M_{e,sup} \approx 2.637 $$
    Now, calculate the corresponding exit pressure:
    $$ \frac{P_{e,sup}}{P_0} = \left(1 + \frac{\gamma-1}{2}M_{e,sup}^2 \right)^{-\gamma/(\gamma-1)} $$
    $$ P_{e,sup} = (10^6 \text{ Pa}) \left(1 + 0.2(2.637)^2 \right)^{-3.5} = (10^6 \text{ Pa}) (1 + 0.2 \times 6.9536)^{-3.5} $$
    $$ P_{e,sup} = (10^6 \text{ Pa}) (2.39072)^{-3.5} = (10^6 \text{ Pa}) \times 0.04016 $$
    $$ P_{e,sup} = 40.16 \text{ kPa} $$
    *   *Why this step works:* This is the pressure at which the nozzle is designed to operate, where the flow exits supersonically and matches the ambient pressure.

4.  **Determine the exit pressure for fully subsonic flow ($P_{e,sub}$):**
    For fully subsonic flow, the flow accelerates in the converging section, but does not reach $M=1$ at the throat. It then decelerates in the diverging section. This means the exit Mach number $M_{e,sub}$ will be less than 1, and the area ratio $A_e/A^* = 3$ will correspond to a subsonic Mach number.
    Using the isentropic area-Mach relation for $\frac{A}{A^*} = 3$ and looking for the subsonic root:
    $$ M_{e,sub} \approx 0.203 $$
    Now, calculate the corresponding exit pressure:
    $$ \frac{P_{e,sub}}{P_0} = \left(1 + \frac{\gamma-1}{2}M_{e,sub}^2 \right)^{-\gamma/(\gamma-1)} $$
    $$ P_{e,sub} = (10^6 \text{ Pa}) \left(1 + 0.2(0.203)^2 \right)^{-3.5} = (10^6 \text{ Pa}) (1 + 0.2 \times 0.041209)^{-3.5} $$
    $$ P_{e,sub} = (10^6 \text{ Pa}) (1.00824)^{-3.5} = (10^6 \text{ Pa}) \times 0.9717 $$
    $$ P_{e,sub} = 971.7 \text{ kPa} $$
    *   *Why this step works:* This represents the highest possible back pressure for which flow through the nozzle is entirely subsonic and matches the exit area ratio.

5.  **Determine the back pressure for a normal shock at the exit ($P_{b,shock}$):**
    If a normal shock forms exactly at the exit plane, the flow immediately upstream of the shock is $M_{e,sup} = 2.637$. The pressure downstream of a normal shock ($P_{y}$) is related to the pressure upstream ($P_x$) by the normal shock relations:
    $$ \frac{P_y}{P_x} = 1 + \frac{2\gamma}{\gamma+1}(M_x^2 - 1) $$
    Here, $P_x$ is $P_{e,sup}$ (pressure just before the shock) and $M_x$ is $M_{e,sup}$.
    $$ P_x = 40.16 \text{ kPa} $$
    $$ \frac{P_y}{40.16 \text{ kPa}} = 1 + \frac{2(1.4)}{1.4+1}((2.637)^2 - 1) $$
    $$ \frac{P_y}{40.16 \text{ kPa}} = 1 + \frac{2.8}{2.4}(6.9536 - 1) = 1 + 1.1667 \times 5.9536 $$
    $$ \frac{P_y}{40.16 \text{ kPa}} = 1 + 6.946 = 7.946 $$
    $$ P_y = 7.946 \times 40.16 \text{ kPa} = 318.0 \text{ kPa} $$
    So, $P_{b,shock} = 318.0 \text{ kPa}$.
    *   *Why this step works:* This is a critical back pressure. If $P_b$ is between $P_{e,sup}$ and $P_{b,shock}$, a normal shock will occur *inside* the diverging section. If $P_b$ equals $P_{b,shock}$, the shock is at the exit.

**Summary of Regimes:**

a)  **Subsonic flow throughout the nozzle:**
    This occurs when the back pressure is high enough that the flow never chokes.
    Range: $\boxed{\mathbf{P_b \ge P_{e,sub} \approx 971.7 \text{ kPa}}}$
    (More precisely, $P_b \ge P_0$ for no flow, and $P_b$ must be high enough to prevent choking, i.e., $P_b > P^*$). The highest $P_b$ for fully subsonic flow is $P_{e,sub}$. If $P_b > P_{e,sub}$, the flow will be entirely subsonic, but the exit Mach number will be less than $M_{e,sub}$. If $P_b = P_{e,sub}$, the flow is subsonic throughout and exits at $M_{e,sub}$.

b)  **Choked flow with a normal shock wave in the diverging section:**
    This happens when the nozzle is choked ($P_b < P^*$), but the back pressure is too high for fully supersonic isentropic expansion. The shock wave moves further downstream as $P_b$ decreases.
    Range: $\boxed{\mathbf{P_{b,shock} \approx 318.0 \text{ kPa} < P_b < P^* \approx 528 \text{ kPa}}}$
    (Note: The upper limit $P^*$ is the choking pressure. The lower limit is when the shock is at the exit).

c)  **Perfectly expanded supersonic flow:**
    This is the design condition where the exit pressure matches the ambient pressure, and the flow is entirely supersonic and isentropic after the throat.
    Range: $\boxed{\mathbf{P_b = P_{e,sup} \approx 40.16 \text{ kPa}}}$

d)  **Underexpanded supersonic flow:**
    This occurs when the back pressure is lower than the perfectly expanded pressure. The flow exits the nozzle supersonically, but its pressure is higher than the ambient, leading to expansion waves outside the nozzle.
    Range: $\boxed{\mathbf{P_b < P_{e,sup} \approx 40.16 \text{ kPa}}}$
    (Theoretically, down to vacuum, $P_b=0$).

**Reflection:** This example is significantly more complex as it requires understanding the interplay of isentropic flow, choking, and normal shock relations. The key is to identify the critical back pressures that define the boundaries between different flow regimes. It also highlights that a de Laval nozzle can operate in many ways, not just its design condition.

---

## 6. Common mistakes and traps

1.  **Confusing Subsonic and Supersonic Area-Velocity Relations:** The most frequent error. Students often assume that widening a duct *always* slows down the flow. This is true for subsonic flow, but for supersonic flow, widening a duct *accelerates* it. Remember: $\frac{dA}{A} = \frac{dV}{V}(M^2 - 1)$. The sign of $(M^2-1)$ is critical.
2.  **Assuming Choking Always Occurs:** A de Laval nozzle only chokes if the back pressure is below a critical threshold (i.e., $P_b \le P^*$). If the back pressure is too high, the flow remains subsonic throughout, never reaching $M=1$ at the throat.
3.  **Ignoring the Role of Back Pressure ($P_b$):** The de Laval nozzle's performance is highly dependent on the ratio of exit pressure to back pressure. Neglecting $P_b$ leads to incorrect assumptions about exit Mach number, pressure, and whether shocks are present.
4.  **Incorrectly Applying Isentropic Flow Assumptions:** While convenient, assuming isentropic flow means no friction and no heat transfer. Real nozzles have boundary layers and some losses, especially if shock waves are present, which are inherently non-isentropic. Do not use isentropic relations across a shock wave.
5.  **Confusing Static and Stagnation Properties:** Stagnation properties ($P_0, T_0$) represent the total energy content of the fluid if it were brought to rest isentropically. Static properties ($P, T$) are the actual properties of the moving fluid. These are distinct and cannot be interchanged.
6.  **Mistaking Mach Number for Velocity Directly:** Mach number is a *ratio* of velocity to the local speed of sound. A high Mach number doesn't necessarily mean a higher absolute velocity than a lower Mach number if the local speed of sound is vastly different (e.g., due to temperature changes).
7.  **Solving Transcendental Equations Manually:** The area-Mach number relation is transcendental. Trying to solve it algebraically for $M$ given $A/A^*$ is futile. Use iterative methods, numerical solvers, or isentropic flow tables.

## 7. Textbook-precise explanation

A **converging-diverging (de Laval) nozzle** is a duct of varying cross-sectional area, designed to accelerate a compressible fluid. It consists of three distinct sections: a converging inlet, a minimum area section known as the throat, and a diverging outlet. The fundamental operation of a de Laval nozzle relies on the principles of one-dimensional, steady, adiabatic, and often isentropic, compressible flow.

The governing equations for such flow are derived from the conservation laws:

1.  **Conservation of Mass (Continuity Equation):**
    $$ \dot{m} = \rho A V = \text{constant} $$
    where $\dot{m}$ is the mass flow rate, $\rho$ is the local density, $A$ is the local cross-sectional area, and $V$ is the local flow velocity. Differentiating logarithmically yields:
    $$ \frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 $$

2.  **Conservation of Momentum (Euler's Equation for steady, inviscid flow):**
    $$ \rho V \frac{dV}{dx} = -\frac{dP}{dx} $$
    where $P$ is the local static pressure. This can be manipulated to show:
    $$ dP = -\rho V dV $$

3.  **Conservation of Energy (Steady Flow Energy Equation for adiabatic, no-work flow):**
    $$ h_0 = h + \frac{V^2}{2} = \text{constant} $$
    where $h_0$ is the stagnation enthalpy and $h$ is the static enthalpy. For an ideal gas, $dh = c_p dT$, leading to $c_p T_0 = c_p T + \frac{V^2}{2}$.

4.  **Isentropic Relations (for reversible adiabatic flow):**
    $$ \frac{P}{P_0} = \left( \frac{T}{T_0} \right)^{\gamma/(\gamma-1)} = \left( \frac{\rho}{\rho_0} \right)^{\gamma} $$
    And the speed of sound $a = \sqrt{\gamma R T}$.

Combining the conservation equations and the definition of Mach number ($M = V/a$), we derive the crucial **Area-Velocity Relation**:
$$ \frac{dA}{A} = \frac{dV}{V}(M^2 - 1) $$
This relation dictates the behavior of flow in a nozzle:
*   **Subsonic flow ($M < 1$):** $(M^2 - 1)$ is negative. For $dV > 0$ (acceleration), $dA$ must be negative. Thus, a **converging section** accelerates subsonic flow.
*   **Supersonic flow ($M > 1$):** $(M^2 - 1)$ is positive. For $dV > 0$ (acceleration), $dA$ must be positive. Thus, a **diverging section** accelerates supersonic flow.
*   **Sonic flow ($M = 1$):** At this point, $dA = 0$ (assuming $dV \ne 0$). This occurs at the **throat** (minimum area) of the de Laval nozzle.

The condition $M=1$ at the throat is referred to as **choking**. When a nozzle is choked, the mass flow rate reaches its maximum possible value, given by:
$$ \dot{m} = A^* \rho^* V^* = A^* \frac{P^*}{R T^*} \sqrt{\gamma R T^*} = A^* P_0 \sqrt{\frac{\gamma}{R T_0}} \left( \frac{2}{\gamma+1} \right)^{(\gamma+1)/(2(\gamma-1))} $$
where $A^*$ is the throat area, and $P^*, T^*, \rho^*, V^*$ are the static properties at the throat when $M=1$. The ratio of any area $A$ to the critical (throat) area $A^*$ for isentropic flow is given by:
$$ \frac{A}{A^*} = \frac{1}{M} \left[ \frac{2}{\gamma+1} \left(1 + \frac{\gamma-1}{2}M^2 \right) \right]^{(\gamma+1)/(2(\gamma-1))} $$
(Anderson, *Fundamentals of Aerodynamics*, 5th ed., §4.11)

The operation of a de Laval nozzle is highly dependent on the **back pressure ($P_b$)** relative to the stagnation pressure ($P_0$).
*   **High $P_b/P_0$ (above $P_{e,sub}/P_0$):** Subsonic flow throughout, no choking. The nozzle acts like a Venturi.
*   **$P_b/P_0 = P_{e,sub}/P_0$:** Subsonic flow throughout, $M_{exit} = M_{subsonic}$ from $A_e/A^*$.
*   **$P^*/P_0 < P_b/P_0 < P_{e,sub}/P_0$:** Flow chokes at the throat ($M=1$), but remains subsonic in the diverging section, decelerating to match $P_b$.
*   **Critical $P_b/P_0 = P^*/P_0$:** Flow chokes, $M=1$ at throat, but flow becomes subsonic in diverging section, reaching $M=1$ again at the exit.
*   **$P_{e,sup}/P_0 < P_b/P_0 < P^*/P_0$:** Flow chokes, accelerates supersonically in the diverging section, but a **normal shock wave** forms inside the nozzle to raise the pressure and decelerate the flow to match $P_b$. The shock location depends on $P_b$. (Cengel & Cimbala, *Fluid Mechanics: Fundamentals and Applications*, 4th ed., §17-6)
*   **$P_b/P_0 = P_{e,sup}/P_0$:** Perfectly expanded flow. Flow chokes, accelerates isentropically to $M_{sup}$ at the exit, and $P_e = P_b$. This is the design condition for maximum thrust efficiency.
*   **$P_b/P_0 < P_{e,sup}/P_0$:** Underexpanded flow. Flow chokes, accelerates isentropically to $M_{sup}$ at the exit, but $P_e > P_b$. Expansion waves form outside the nozzle exit.

## 8. ASCII diagrams

```text
       HIGH PRESSURE  |       CONVERGING SECTION        |   DIVERGING SECTION    |  LOW PRESSURE
       HIGH TEMP      |         (Area decreases)        |    (Area increases)    |  AMBIENT
       LOW VELOCITY   |                                 |                        |
                      |                                 |                        |
  P0, T0, V~0         |                                 |                        |
  (Stagnation)        |                                 |                        |
        +-------------+-----------------+---------------+----------------+-------+
        |             |                 |               |                |       |
        |             |                 |               |                |       |
        |             |                 |               |                |       |
        |             |                 |               |                |       |
        |             |                 |               |                |       |
        +-------------+-----------------+-------*-------+----------------+-------+
                      |                 |       ^       |                |
                      |                 |       |       |                |
                      |                 |       |       |                |
                      |                 |     THROAT    |                |
                      |                 |    (Min Area) |                |
                      |                 |       A*      |                |
                      |                 |       M=1     |                |
                      |                 |               |                |
                      |                 |               |                |
                      |                 |               |                |
   <------------------|   SUBSONIC FLOW ACCELERATION    | SUPERSONIC FLOW ACCELERATION  |
                      |      (V increases, P decreases) |   (V increases, P decreases)  |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               |
                      |                                 |                               