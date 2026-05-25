## 1. What it is — in plain English

Imagine you have a powerful pump pushing water into a garden hose, but instead of a normal nozzle, you have a special one that gets wider after a narrow pinch. The "chamber" is like where the pump is building up a lot of pressure and temperature, full of hot, energetic gas. This gas then rushes into the special nozzle.

As the gas speeds up through the nozzle, it starts to cool down and its pressure drops dramatically. The "exit" is the very end of this nozzle, where the gas blasts out into the atmosphere or space. What we want to figure out is: if we know how fast the gas is moving at the exit (measured by its Mach number, $M_e$) and a property of the gas itself ($\gamma$, the specific heat ratio), can we calculate *everything else* about the gas at the exit?

"Everything else" means its temperature, pressure, density, and even how fast it's actually moving, all relative to the cozy, high-energy conditions back in the chamber. This relationship is incredibly powerful because it links the initial state of the fuel burning in the engine to the final state of the exhaust pushing the rocket.

So, in simple terms, this topic is about a set of mathematical formulas that let us predict the exact conditions of the exhaust gas leaving a rocket engine, just by knowing how fast it's going (relative to the speed of sound) and what kind of gas it is. It's like having a universal translator for gas properties as it accelerates through a nozzle.

## 2. Why it matters — real-world applications

Understanding the chamber-to-exit relationship is fundamental to designing, analyzing, and optimizing propulsion systems. Its applications span across various high-tech industries:

1.  **Rocket Engine Design and Performance:** This is perhaps the most direct application. Engineers at companies like **SpaceX** (Raptor engine) or **Blue Origin** (BE-4 engine) use these relationships daily. To achieve a specific thrust or specific impulse, they need to know the exhaust velocity ($V_e$), exit pressure ($P_e$), and temperature ($T_e$). These formulas allow them to design the nozzle geometry (especially the expansion ratio, $A_e/A_t$) to achieve the desired exit Mach number ($M_e$) for optimal performance in a given atmospheric pressure or vacuum. For instance, a vacuum-optimized nozzle will have a very high expansion ratio, leading to a very high $M_e$ and very low $P_e$, calculated precisely using these relations.

2.  **Jet Engine Nozzle Design:** While rockets operate differently from jet engines, the principles of compressible flow through a nozzle are identical. Manufacturers like **General Electric (GE Aviation)** or **Rolls-Royce** use these equations to design the exhaust nozzles of their turbofan and turbojet engines. Optimizing the nozzle for different flight regimes (subsonic cruise, supersonic flight) requires precise control over the exit conditions to maximize thrust and fuel efficiency, ensuring the gas expands correctly from the turbine exit to the atmosphere.

3.  **Supersonic Wind Tunnel Design:** To test aircraft and spacecraft models at supersonic speeds, engineers need to create a uniform supersonic flow in a test section. This is achieved using a convergent-divergent nozzle, much like a rocket nozzle. The relationships between chamber conditions (stagnation pressure and temperature) and the desired test section Mach number ($M_e$) are directly calculated using these equations to determine the required nozzle geometry and operating parameters. Without these calculations, designing a functional supersonic wind tunnel would be impossible.

4.  **High-Speed Aerodynamics and Re-entry Vehicles:** When a spacecraft re-enters Earth's atmosphere, or a hypersonic vehicle flies at extreme speeds, the air flow around it behaves compressibly. Understanding how air properties change with Mach number is crucial for predicting aerodynamic heating, shock wave formation, and drag. While not directly a "chamber-to-exit" scenario, the underlying isentropic flow equations derived from stagnation properties are precisely what's used to analyze these external flows, treating free stream conditions as "stagnation" relative to the vehicle's frame of reference for certain analyses.

## 3. Prerequisites — what you must know first

Before diving into the core idea, ensure you have a solid grasp of these fundamental concepts:

*   **Thermodynamics Basics:** Understanding temperature ($T$), pressure ($P$), density ($\rho$), specific internal energy ($u$), enthalpy ($h$), and how they relate for an ideal gas.
*   **Ideal Gas Law:** The relationship $P = \rho R T$, where $R$ is the specific gas constant.
*   **Specific Heats ($c_p, c_v$):** The heat capacity at constant pressure and constant volume, respectively, and their relation $c_p - c_v = R$.
*   **Specific Heat Ratio ($\gamma$):** Defined as $\gamma = c_p/c_v$. This dimensionless quantity is crucial for compressible flow calculations.
*   **Isentropic Process:** A thermodynamic process that is both adiabatic (no heat transfer) and reversible (no entropy generation). In ideal nozzle flow, this is a key assumption.
*   **Stagnation Properties:** The properties (temperature, pressure, density, enthalpy) a fluid would attain if brought to rest isentropically. Denoted with a subscript '0' (e.g., $T_0$, $P_0$).
*   **Static Properties:** The actual properties of the fluid at a given point in the flow, as measured by an instrument moving with the fluid. Denoted without a subscript (e.g., $T$, $P$).
*   **Speed of Sound ($a$):** The speed at which small disturbances propagate through a medium, given by $a = \sqrt{\gamma R T}$ for an ideal gas.
*   **Mach Number ($M$):** The ratio of the flow velocity ($V$) to the local speed of sound ($a$), $M = V/a$. It indicates whether the flow is subsonic ($M<1$), sonic ($M=1$), or supersonic ($M>1$).
*   **Continuity Equation:** Conservation of mass, $\dot{m} = \rho A V = \text{constant}$.
*   **Energy Equation (for steady flow):** The first law of thermodynamics applied to a control volume, often simplified to $h_0 = h + \frac{1}{2}V^2$ for adiabatic flow.

## 4. The core idea — step by step

The core idea is to establish a set of relationships that connect the static properties of the gas at the nozzle exit ($P_e, T_e, \rho_e, V_e$) to the stagnation properties in the combustion chamber ($P_0, T_0, \rho_0$) and the exit Mach number ($M_e$), assuming isentropic flow.

### Step 1: Understanding Stagnation Properties

*   **Plain English:** Imagine you're flying in an airplane, and you stick a thermometer and pressure gauge out the window. Those would measure the *static* temperature and pressure of the air rushing past. Now, imagine you have a special probe that perfectly stops a tiny bit of that air without any friction or heat loss, bringing it to a complete halt. The temperature and pressure that tiny bit of air would reach are its *stagnation* temperature and pressure. The chamber of a rocket engine is considered a stagnation state because the gas velocity there is very low compared to the exit velocity.

*   **Small concrete example:** If an airplane is flying at 200 m/s through air that has a static temperature of 250 K, the air hitting a pitot tube (which measures stagnation pressure and implicitly stagnation temperature) will be slightly warmer than 250 K because the kinetic energy of the moving air is converted into internal energy (heat) when it's brought to rest.

*   **Formal/Mathematical version:**
    For an ideal gas, the stagnation enthalpy $h_0$ is related to static enthalpy $h$ and kinetic energy by:
    $$h_0 = h + \frac{V^2}{2}$$
    For an ideal gas, $h = c_p T$. So,
    $$c_p T_0 = c_p T + \frac{V^2}{2}$$
    Dividing by $c_p T$:
    $$\frac{T_0}{T} = 1 + \frac{V^2}{2c_p T}$$
    We know $c_p = \frac{\gamma R}{\gamma-1}$ and $a^2 = \gamma R T$.
    Substituting these, and remembering $M = V/a$:
    $$\frac{T_0}{T} = 1 + \frac{V^2}{2 \frac{\gamma R}{\gamma-1} T} = 1 + \frac{V^2}{2 \frac{1}{\gamma-1} (\gamma R T)} = 1 + \frac{V^2}{2(\gamma-1)a^2} = 1 + \frac{\gamma-1}{2} \left(\frac{V}{a}\right)^2$$
    Thus, the **stagnation temperature ratio** is:
    $$\frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2$$
    For an isentropic process, the pressure and density ratios are related to the temperature ratio by:
    $$\frac{P_0}{P} = \left(\frac{T_0}{T}\right)^{\frac{\gamma}{\gamma-1}}$$
    $$\frac{\rho_0}{\rho} = \left(\frac{T_0}{T}\right)^{\frac{1}{\gamma-1}}$$
    Substituting the expression for $T_0/T$:
    The **stagnation pressure ratio** is:
    $$\frac{P_0}{P} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\frac{\gamma}{\gamma-1}}$$
    The **stagnation density ratio** is:
    $$\frac{\rho_0}{\rho} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\frac{1}{\gamma-1}}$$

*   **What could go wrong:** A common mistake is to confuse static properties with stagnation properties. Remember, stagnation properties are measured when the fluid is *hypothetically* brought to rest isentropically, while static properties are what you'd measure *in the moving flow*. The chamber conditions are essentially stagnation conditions ($M \approx 0$).

### Step 2: Exit Temperature Ratio ($T_e/T_0$)

*   **Plain English:** As the hot, high-pressure gas from the chamber expands through the nozzle and speeds up, it converts its internal energy (heat) into kinetic energy (motion). This conversion causes the gas to cool down significantly. This formula tells us exactly how much cooler the gas gets at the exit compared to its initial temperature in the chamber, based on how fast it's moving at the exit.

*   **Small concrete example:** If the gas in a rocket chamber is 3000 K, and it exits the nozzle at Mach 3, this formula will tell us the exact temperature of the exhaust plume, which will be much lower, perhaps around 1000-1500 K, depending on the gas properties.

*   **Formal/Mathematical version:**
    From Step 1, we have the stagnation temperature ratio:
    $$\frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2$$
    To find the ratio of exit temperature ($T_e$) to chamber temperature ($T_0$), we simply invert this relationship and apply it at the exit conditions:
    $$\frac{T_e}{T_0} = \frac{1}{1 + \frac{\gamma-1}{2}M_e^2}$$
    Or, more commonly written:
    $$\frac{T_e}{T_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-1}$$

*   **What could go wrong:** Forgetting to invert the ratio. It's $T_e/T_0$, not $T_0/T_e$. Also, ensuring that $M_e$ is the *exit* Mach number, not some intermediate Mach number.

### Step 3: Exit Pressure Ratio ($P_e/P_0$)

*   **Plain English:** Just like temperature, the pressure of the gas drops as it expands and accelerates through the nozzle. This pressure drop is what generates thrust. This formula quantifies how much the pressure falls from the chamber to the exit, again, based on the exit Mach number and the gas's specific heat ratio.

*   **Small concrete example:** A rocket engine might have a chamber pressure of 100 atmospheres (about 10 MPa). If it's designed to expand to a Mach number of 4 in a vacuum, the exit pressure calculated by this formula could be as low as a few thousand Pascals (a tiny fraction of atmospheric pressure), demonstrating the immense expansion.

*   **Formal/Mathematical version:**
    From Step 1, we have the stagnation pressure ratio:
    $$\frac{P_0}{P} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\frac{\gamma}{\gamma-1}}$$
    Applying this at the exit and inverting to get $P_e/P_0$:
    $$\frac{P_e}{P_0} = \frac{1}{\left(1 + \frac{\gamma-1}{2}M_e^2\right)^{\frac{\gamma}{\gamma-1}}}$$
    Or, more compactly:
    $$\frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}}$$

*   **What could go wrong:** Incorrectly using the exponent. The pressure ratio exponent is $\frac{\gamma}{\gamma-1}$, not $\frac{1}{\gamma-1}$. This is a common algebraic error.

### Step 4: Exit Density Ratio ($\rho_e/\rho_0$)

*   **Plain English:** As the gas expands and cools, it also becomes less dense – it "thins out." This is intuitive: a given mass of gas takes up more volume when it's expanded. This formula tells us how much the density drops from the chamber to the exit, again, based on the exit Mach number.

*   **Small concrete example:** The hot, dense gas in the combustion chamber might have a density similar to steam at high pressure. After expanding through the nozzle, the exhaust gas density might be hundreds of times lower, similar to very thin air at high altitudes.

*   **Formal/Mathematical version:**
    From Step 1, we have the stagnation density ratio:
    $$\frac{\rho_0}{\rho} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\frac{1}{\gamma-1}}$$
    Applying this at the exit and inverting to get $\rho_e/\rho_0$:
    $$\frac{\rho_e}{\rho_0} = \frac{1}{\left(1 + \frac{\gamma-1}{2}M_e^2\right)^{\frac{1}{\gamma-1}}}$$
    Or, more compactly:
    $$\frac{\rho_e}{\rho_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{1}{\gamma-1}}$$

*   **What could go wrong:** Using the pressure exponent ($\frac{\gamma}{\gamma-1}$) instead of the correct density exponent ($\frac{1}{\gamma-1}$). Also, ensuring consistent units for density calculations (e.g., kg/m$^3$).

### Step 5: Exit Velocity ($V_e$)

*   **Plain English:** This is the actual speed at which the exhaust gas leaves the nozzle. It's the most direct contributor to thrust. We can calculate it using the exit Mach number and the local speed of sound at the exit, or more fundamentally, from the energy conservation principle that relates the initial energy in the chamber to the final kinetic energy.

*   **Small concrete example:** A typical rocket engine exhaust velocity can be anywhere from 2,500 m/s to 4,500 m/s (Mach 8 to Mach 15 or more, depending on gas temperature). This formula allows us to calculate that precise speed.

*   **Formal/Mathematical version:**
    First, we know the definition of Mach number: $M_e = V_e / a_e$. So, $V_e = M_e a_e$.
    The local speed of sound at the exit is $a_e = \sqrt{\gamma R T_e}$.
    Therefore,
    $$V_e = M_e \sqrt{\gamma R T_e}$$
    We can also express $T_e$ in terms of $T_0$ using the ratio derived in Step 2: $T_e = T_0 \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-1}$.
    Substituting this into the $V_e$ equation:
    $$V_e = M_e \sqrt{\gamma R T_0 \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-1}}$$
    Alternatively, using the energy equation directly from stagnation conditions to exit conditions:
    $h_0 = h_e + \frac{V_e^2}{2}$
    $c_p T_0 = c_p T_e + \frac{V_e^2}{2}$
    $V_e^2 = 2 c_p (T_0 - T_e) = 2 c_p T_0 \left(1 - \frac{T_e}{T_0}\right)$
    Substitute $c_p = \frac{\gamma R}{\gamma-1}$ and $\frac{T_e}{T_0} = \left(\frac{P_e}{P_0}\right)^{\frac{\gamma-1}{\gamma}}$ (from isentropic relations):
    $$V_e = \sqrt{2 \frac{\gamma R}{\gamma-1} T_0 \left(1 - \left(\frac{P_e}{P_0}\right)^{\frac{\gamma-1}{\gamma}}\right)}$$
    This latter form is particularly useful if $P_e/P_0$ is known or determined by the ambient pressure and nozzle design.

*   **What could go wrong:** Using $T_0$ instead of $T_e$ for the local speed of sound calculation ($a_e$). Remember, $a_e$ depends on the *local static* temperature. Also, ensure $R$ is the specific gas constant for the *exhaust gas*, not the universal gas constant.

### Step 6: Area Ratio ($A_e/A^*$)

*   **Plain English:** For gas to accelerate to supersonic speeds, the nozzle must first converge to a narrowest point (the throat, where $M=1$) and then diverge. This formula tells us how much wider the nozzle exit needs to be compared to its throat for a given exit Mach number. It's crucial for shaping the nozzle.

*   **Small concrete example:** If a rocket nozzle is designed for an exit Mach number of 4, this formula will tell the engineers that the exit area must be many times larger than the throat area (e.g., $A_e/A^*$ might be around 10-15 for $\gamma=1.2$).

*   **Formal/Mathematical version:**
    The mass flow rate $\dot{m}$ is constant throughout the nozzle:
    $\dot{m} = \rho A V = \rho^* A^* V^* = \rho_e A_e V_e$
    Where $A^*$ is the throat area and $V^*$ is the sonic velocity at the throat ($M^*=1$).
    From $\rho A V = \rho^* A^* V^*$, we get:
    $$\frac{A_e}{A^*} = \frac{\rho^* V^*}{\rho_e V_e} = \frac{\rho^*}{\rho_e} \frac{V^*}{V_e}$$
    Using $V = M a = M \sqrt{\gamma R T}$:
    $$\frac{V^*}{V_e} = \frac{M^* \sqrt{\gamma R T^*}}{M_e \sqrt{\gamma R T_e}} = \frac{1}{M_e} \sqrt{\frac{T^*}{T_e}}$$
    From the temperature ratio (Step 2), we know $T_e/T_0 = (1 + \frac{\gamma-1}{2}M_e^2)^{-1}$ and $T^*/T_0 = (1 + \frac{\gamma-1}{2}(1)^2)^{-1} = (1 + \frac{\gamma-1}{2})^{-1}$.
    So, $\frac{T^*}{T_e} = \frac{T^*/T_0}{T_e/T_0} = \frac{(1 + \frac{\gamma-1}{2})^{-1}}{(1 + \frac{\gamma-1}{2}M_e^2)^{-1}} = \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}}$.
    Thus, $\sqrt{\frac{T^*}{T_e}} = \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{1/2}$.
    For the density ratio $\rho^*/\rho_e$:
    $\frac{\rho^*}{\rho_e} = \frac{\rho^*/\rho_0}{\rho_e/\rho_0} = \frac{(1 + \frac{\gamma-1}{2})^{-1/(\gamma-1)}}{(1 + \frac{\gamma-1}{2}M_e^2)^{-1/(\gamma-1)}} = \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{\frac{1}{\gamma-1}}$.
    Combining these:
    $$\frac{A_e}{A^*} = \frac{1}{M_e} \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{\frac{1}{\gamma-1}} \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{1/2}$$
    Adding the exponents: $\frac{1}{\gamma-1} + \frac{1}{2} = \frac{2 + (\gamma-1)}{2(\gamma-1)} = \frac{\gamma+1}{2(\gamma-1)}$.
    Therefore, the **isentropic area ratio** is:
    $$\frac{A_e}{A^*} = \frac{1}{M_e} \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{\frac{\gamma+1}{2(\gamma-1)}}$$

*   **What could go wrong:** This derivation is often considered tricky. The most common errors are algebraic, especially with the exponents. Remember that $A^*$ is the *throat* area where $M=1$, not just any reference area.

## 5. Worked examples — multiple, with every step shown

We will use the following standard values for typical rocket exhaust gases (e.g., products of LOX/LH2 or LOX/Kerosene combustion):
*   Specific heat ratio, $\gamma = 1.25$
*   Specific gas constant, $R = 350 \text{ J/(kg·K)}$

### Example 1: Basic Exit Conditions

**Problem:** A rocket engine operates with a chamber temperature ($T_0$) of 3200 K and a chamber pressure ($P_0$) of 15 MPa. The exhaust gas has a specific heat ratio ($\gamma$) of 1.25 and a specific gas constant ($R$) of 350 J/(kg·K). If the flow at the nozzle exit reaches a Mach number ($M_e$) of 4.0, calculate the static temperature ($T_e$) and static pressure ($P_e$) at the exit.

**Given:**
*   $T_0 = 3200 \text{ K}$
*   $P_0 = 15 \text{ MPa} = 15 \times 10^6 \text{ Pa}$
*   $\gamma = 1.25$
*   $R = 350 \text{ J/(kg·K)}$
*   $M_e = 4.0$

**Want:**
*   $T_e$
*   $P_e$

**Solution:**

**Step 1: Calculate the temperature ratio $T_e/T_0$.**
We use the isentropic temperature ratio formula:
$$ \frac{T_e}{T_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-1} $$
Substitute the given values:
$$ \frac{T_e}{3200 \text{ K}} = \left(1 + \frac{1.25-1}{2}(4.0)^2\right)^{-1} $$
*Here, we're plugging in the known $\gamma$ and $M_e$ to find the ratio.*
$$ \frac{T_e}{3200 \text{ K}} = \left(1 + \frac{0.25}{2}(16)\right)^{-1} $$
*Simplify the terms inside the parenthesis.*
$$ \frac{T_e}{3200 \text{ K}} = \left(1 + 0.125 \times 16\right)^{-1} $$
*Continue simplifying.*
$$ \frac{T_e}{3200 \text{ K}} = \left(1 + 2\right)^{-1} $$
*Further simplification.*
$$ \frac{T_e}{3200 \text{ K}} = (3)^{-1} $$
$$ \frac{T_e}{3200 \text{ K}} = \frac{1}{3} $$
*This is the temperature ratio.*
Now, solve for $T_e$:
$$ T_e = \frac{3200 \text{ K}}{3} $$
$$ \boxed{T_e = 1066.67 \text{ K}} $$
*The exit temperature is significantly lower than the chamber temperature, as expected due to expansion.*

**Step 2: Calculate the pressure ratio $P_e/P_0$.**
We use the isentropic pressure ratio formula:
$$ \frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}} $$
Substitute the given values:
$$ \frac{P_e}{15 \times 10^6 \text{ Pa}} = \left(1 + \frac{1.25-1}{2}(4.0)^2\right)^{-\frac{1.25}{1.25-1}} $$
*Again, substituting $\gamma$ and $M_e$. Note the exponent for pressure.*
$$ \frac{P_e}{15 \times 10^6 \text{ Pa}} = \left(1 + \frac{0.25}{2}(16)\right)^{-\frac{1.25}{0.25}} $$
*Simplify terms.*
$$ \frac{P_e}{15 \times 10^6 \text{ Pa}} = \left(1 + 0.125 \times 16\right)^{-5} $$
*The exponent simplifies to -5.*
$$ \frac{P_e}{15 \times 10^6 \text{ Pa}} = \left(1 + 2\right)^{-5} $$
$$ \frac{P_e}{15 \times 10^6 \text{ Pa}} = (3)^{-5} $$
$$ \frac{P_e}{15 \times 10^6 \text{ Pa}} = \frac{1}{3^5} = \frac{1}{243} $$
*This is the pressure ratio.*
Now, solve for $P_e$:
$$ P_e = \frac{15 \times 10^6 \text{ Pa}}{243} $$
$$ P_e \approx 61728.395 \text{ Pa} $$
$$ \boxed{P_e \approx 61.73 \text{ kPa}} $$
*The exit pressure is drastically lower than the chamber pressure, which is crucial for generating thrust.*

**Reflection:** This example was straightforward, primarily testing the correct application of the temperature and pressure ratio formulas. The main trick is careful calculation of the exponents and ensuring all values are substituted correctly. The results clearly show the significant drop in temperature and pressure during supersonic expansion.

---

### Example 2: Exit Velocity and Density

**Problem:** Using the same rocket engine conditions as Example 1 ($T_0 = 3200 \text{ K}$, $P_0 = 15 \text{ MPa}$, $\gamma = 1.25$, $R = 350 \text{ J/(kg·K)}$, $M_e = 4.0$), calculate the static density ($\rho_e$) and the exit velocity ($V_e$) of the exhaust gas.

**Given:**
*   $T_0 = 3200 \text{ K}$
*   $P_0 = 15 \text{ MPa} = 15 \times 10^6 \text{ Pa}$
*   $\gamma = 1.25$
*   $R = 350 \text{ J/(kg·K)}$
*   $M_e = 4.0$
*   From Example 1: $T_e = 1066.67 \text{ K}$
*   From Example 1: $P_e = 61.73 \text{ kPa} = 61728.395 \text{ Pa}$

**Want:**
*   $\rho_e$
*   $V_e$

**Solution:**

**Step 1: Calculate the stagnation density ($\rho_0$) in the chamber.**
First, we need the density in the chamber. Since chamber conditions are stagnation conditions, we can use the ideal gas law:
$$ P_0 = \rho_0 R T_0 $$
$$ \rho_0 = \frac{P_0}{R T_0} $$
Substitute the given values:
$$ \rho_0 = \frac{15 \times 10^6 \text{ Pa}}{350 \text{ J/(kg·K)} \times 3200 \text{ K}} $$
*Using the ideal gas law to find the initial density of the gas.*
$$ \rho_0 = \frac{15 \times 10^6}{1120000} $$
$$ \rho_0 \approx 13.393 \text{ kg/m}^3 $$
*This is the density of the gas in the combustion chamber.*

**Step 2: Calculate the density ratio $\rho_e/\rho_0$.**
We use the isentropic density ratio formula:
$$ \frac{\rho_e}{\rho_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{1}{\gamma-1}} $$
Substitute the given values:
$$ \frac{\rho_e}{13.393 \text{ kg/m}^3} = \left(1 + \frac{1.25-1}{2}(4.0)^2\right)^{-\frac{1}{1.25-1}} $$
*Plugging in $\gamma$ and $M_e$. Note the exponent for density is different from pressure.*
$$ \frac{\rho_e}{13.393 \text{ kg/m}^3} = \left(1 + \frac{0.25}{2}(16)\right)^{-\frac{1}{0.25}} $$
*Simplify terms.*
$$ \frac{\rho_e}{13.393 \text{ kg/m}^3} = \left(1 + 0.125 \times 16\right)^{-4} $$
*The exponent simplifies to -4.*
$$ \frac{\rho_e}{13.393 \text{ kg/m}^3} = \left(1 + 2\right)^{-4} $$
$$ \frac{\rho_e}{13.393 \text{ kg/m}^3} = (3)^{-4} $$
$$ \frac{\rho_e}{13.393 \text{ kg/m}^3} = \frac{1}{3^4} = \frac{1}{81} $$
*This is the density ratio.*
Now, solve for $\rho_e$:
$$ \rho_e = \frac{13.393 \text{ kg/m}^3}{81} $$
$$ \boxed{\rho_e \approx 0.165 \text{ kg/m}^3} $$
*The exit density is significantly lower, consistent with the large expansion and cooling.*

**Step 3: Calculate the exit velocity ($V_e$).**
We use the formula $V_e = M_e a_e$, where $a_e$ is the local speed of sound at the exit.
First, calculate $a_e$:
$$ a_e = \sqrt{\gamma R T_e} $$
Substitute $T_e$ from Example 1:
$$ a_e = \sqrt{1.25 \times 350 \text{ J/(kg·K)} \times 1066.67 \text{ K}} $$
*Using the calculated static exit temperature $T_e$ for the local speed of sound.*
$$ a_e = \sqrt{466667.5} $$
$$ a_e \approx 683.13 \text{ m/s} $$
*This is the speed of sound at the nozzle exit.*
Now, calculate $V_e$:
$$ V_e = M_e a_e $$
$$ V_e = 4.0 \times 683.13 \text{ m/s} $$
$$ \boxed{V_e \approx 2732.52 \text{ m/s}} $$
*This high exhaust velocity is typical for rocket engines and directly contributes to thrust.*

**Reflection:** This example built upon the previous one by requiring the calculation of stagnation density and then using the derived temperature and pressure values. The key challenge was correctly applying the ideal gas law and remembering to use the *static* exit temperature for the local speed of sound calculation.

---

### Example 3: Finding Mach Number from Pressure Ratio

**Problem:** A rocket engine exhaust system is being tested. The chamber pressure ($P_0$) is 12 MPa, and the measured static pressure ($P_e$) at a certain point in the nozzle is 200 kPa. The exhaust gas has a specific heat ratio ($\gamma$) of 1.3. What is the Mach number ($M$) at this point in the nozzle? Assume isentropic flow.

**Given:**
*   $P_0 = 12 \text{ MPa} = 12 \times 10^6 \text{ Pa}$
*   $P_e = 200 \text{ kPa} = 200 \times 10^3 \text{ Pa}$
*   $\gamma = 1.3$

**Want:**
*   $M_e$

**Solution:**

**Step 1: Set up the pressure ratio equation.**
We use the isentropic pressure ratio formula, but this time we're solving for $M_e$:
$$ \frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}} $$
Substitute the given values:
$$ \frac{200 \times 10^3 \text{ Pa}}{12 \times 10^6 \text{ Pa}} = \left(1 + \frac{1.3-1}{2}M_e^2\right)^{-\frac{1.3}{1.3-1}} $$
*Plugging in the known pressures and $\gamma$. We need to isolate $M_e$.*

**Step 2: Simplify the ratios and exponents.**
$$ \frac{200}{12000} = \frac{1}{60} $$
$$ \frac{1.3}{1.3-1} = \frac{1.3}{0.3} = \frac{13}{3} \approx 4.333 $$
$$ \frac{\gamma-1}{2} = \frac{1.3-1}{2} = \frac{0.3}{2} = 0.15 $$
So the equation becomes:
$$ \frac{1}{60} = \left(1 + 0.15 M_e^2\right)^{-\frac{13}{3}} $$
*Simplifying the left side and the exponents on the right side.*

**Step 3: Isolate the term containing $M_e^2$.**
To remove the exponent on the right side, we raise both sides to the power of $-\frac{3}{13}$:
$$ \left(\frac{1}{60}\right)^{-\frac{3}{13}} = \left(\left(1 + 0.15 M_e^2\right)^{-\frac{13}{3}}\right)^{-\frac{3}{13}} $$
*To undo an exponent, raise both sides to its reciprocal power. Note the negative sign.*
$$ (60)^{\frac{3}{13}} = 1 + 0.15 M_e^2 $$
Calculate $(60)^{\frac{3}{13}}$:
$$ (60)^{\frac{3}{13}} \approx 60^{0.23077} \approx 2.053 $$
So,
$$ 2.053 = 1 + 0.15 M_e^2 $$
*Now we have a linear equation for $M_e^2$.*

**Step 4: Solve for $M_e$.**
$$ 2.053 - 1 = 0.15 M_e^2 $$
$$ 1.053 = 0.15 M_e^2 $$
$$ M_e^2 = \frac{1.053}{0.15} $$
$$ M_e^2 \approx 7.02 $$
*Finally, take the square root to find $M_e$.*
$$ M_e = \sqrt{7.02} $$
$$ \boxed{M_e \approx 2.65} $$
*The Mach number at this point in the nozzle is supersonic, as expected for such a large pressure drop.*

**Reflection:** This example was harder because it required rearranging the formula to solve for $M_e$, which involved fractional exponents. The key is to carefully apply algebraic rules for exponents and perform calculations step-by-step to avoid errors. It also reinforces the connection between pressure ratio and Mach number.

---

### Example 4: Area Ratio Calculation for Nozzle Design

**Problem:** Design a nozzle exit for a rocket engine where the chamber conditions are $T_0 = 3500 \text{ K}$ and $P_0 = 20 \text{ MPa}$. The exhaust gas has $\gamma = 1.2$ and $R = 400 \text{ J/(kg·K)}$. The desired exit Mach number ($M_e$) is 5.0. Calculate the required ratio of the exit area ($A_e$) to the throat area ($A^*$).

**Given:**
*   $T_0 = 3500 \text{ K}$
*   $P_0 = 20 \text{ MPa}$
*   $\gamma = 1.2$
*   $R = 400 \text{ J/(kg·K)}$
*   $M_e = 5.0$

**Want:**
*   $A_e/A^*$

**Solution:**

**Step 1: Use the isentropic area ratio formula.**
$$ \frac{A_e}{A^*} = \frac{1}{M_e} \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{\frac{\gamma+1}{2(\gamma-1)}} $$
Substitute the given values:
$$ \frac{A_e}{A^*} = \frac{1}{5.0} \left[ \frac{1 + \frac{1.2-1}{2}(5.0)^2}{1 + \frac{1.2-1}{2}} \right]^{\frac{1.2+1}{2(1.2-1)}} $$
*This is a direct application of the area ratio formula. Careful calculation of exponents is crucial.*

**Step 2: Simplify the terms inside the brackets and the exponent.**
Numerator term in bracket:
$$ 1 + \frac{1.2-1}{2}(5.0)^2 = 1 + \frac{0.2}{2}(25) = 1 + 0.1 \times 25 = 1 + 2.5 = 3.5 $$
Denominator term in bracket:
$$ 1 + \frac{1.2-1}{2} = 1 + \frac{0.2}{2} = 1 + 0.1 = 1.1 $$
Exponent:
$$ \frac{1.2+1}{2(1.2-1)} = \frac{2.2}{2(0.2)} = \frac{2.2}{0.4} = 5.5 $$
Now substitute these simplified terms back into the equation:
$$ \frac{A_e}{A^*} = \frac{1}{5.0} \left[ \frac{3.5}{1.1} \right]^{5.5} $$
*Simplifying the components makes the calculation less prone to errors.*

**Step 3: Calculate the value.**
$$ \frac{A_e}{A^*} = 0.2 \times \left[ 3.1818 \right]^{5.5} $$
Calculate $[3.1818]^{5.5}$:
$$ [3.1818]^{5.5} \approx 3.1818^5 \times \sqrt{3.1818} \approx 306.9 \times 1.7837 \approx 547.4 $$
So,
$$ \frac{A_e}{A^*} = 0.2 \times 547.4 $$
$$ \boxed{\frac{A_e}{A^*} \approx 109.48} $$
*This indicates that for an exit Mach number of 5.0, the exit area needs to be almost 110 times larger than the throat area. This is a very large expansion ratio, typical for vacuum-optimized rocket nozzles.*

**Reflection:** This example demonstrates the practical application of the area ratio formula in nozzle design. The complexity here lies in the multi-step calculation involving fractional exponents. It highlights why rocket nozzles operating in vacuum have such dramatically flared shapes. The chamber conditions $T_0$ and $P_0$ were given but not directly used in this specific calculation, as the area ratio only depends on $M_e$ and $\gamma$.

## 6. Common mistakes and traps

1.  **Confusing Static and Stagnation Properties:** This is the most frequent error. Students often use $T_0$ when $T_e$ is required (e.g., for $a_e = \sqrt{\gamma R T_e}$) or vice versa. Remember that stagnation properties are reference values if the flow were brought to rest, while static properties are the actual conditions in the moving flow.
2.  **Incorrect Exponents:** The exponents for pressure ($\frac{\gamma}{\gamma-1}$), temperature ($\frac{1}{\gamma-1}$), and density ($\frac{1}{\gamma-1}$) are distinct and easily mixed up, especially between pressure and density. Pay close attention to whether $\gamma$ is in the numerator or denominator of the exponent.
3.  **Unit Inconsistency:** Forgetting to convert chamber pressure from MPa to Pa, or ensuring that temperature is always in Kelvin when using the ideal gas law or specific gas constant $R$. Using Celsius or Fahrenheit will lead to incorrect results.
4.  **Using Universal Gas Constant Instead of Specific Gas Constant:** The formulas use the specific gas constant $R$ (J/(kg·K)), which is unique to the particular gas, not the universal gas constant $\bar{R}$ (J/(mol·K)). If molar mass $M_w$ is given, $R = \bar{R}/M_w$.
5.  **Algebraic Errors in Rearrangement:** When solving for $M_e$ from a known pressure ratio (as in Example 3), students often make mistakes in isolating $M_e^2$, especially with fractional or negative exponents. Careful step-by-step algebra is essential.
6.  **Misinterpreting $M_e$ in Area Ratio:** The area ratio $A_e/A^*$ is specifically the ratio of the exit area to the *throat* area, where the Mach number is 1 ($M^*=1$). It's not a ratio to the chamber area or any arbitrary upstream area.

## 7. Textbook-precise explanation

For an ideal gas undergoing steady, one-dimensional, isentropic flow through a convergent-divergent nozzle, the relationships between the static properties at any point in the flow (subscript $e$ for exit) and the stagnation properties (subscript $0$ for chamber) are given as functions of the local Mach number ($M_e$) and the specific heat ratio ($\gamma$). These relations are derived from the conservation laws of mass, momentum, and energy, coupled with the ideal gas law and the definition of an isentropic process.

The **stagnation temperature ratio** is defined by the energy equation for adiabatic flow, expressing the conversion of kinetic energy to internal energy:
$$ \frac{T_e}{T_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-1} $$
This equation indicates that as the Mach number increases, the static temperature decreases relative to the stagnation temperature.

The **stagnation pressure ratio** is derived from the isentropic relation $P/\rho^\gamma = \text{constant}$ and the ideal gas law, combined with the temperature ratio:
$$ \frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}} $$
This demonstrates a more rapid decrease in static pressure with increasing Mach number compared to temperature, due to the exponent $\frac{\gamma}{\gamma-1} > 1$.

The **stagnation density ratio** follows similarly from the isentropic relation $P/\rho^\gamma = \text{constant}$ and the ideal gas law, or directly from $P_e/P_0 = (\rho_e/\rho_0)^\gamma$:
$$ \frac{\rho_e}{\rho_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{1}{\gamma-1}} $$
The density also decreases as the flow accelerates, reflecting the expansion of the gas.

The **exit velocity** ($V_e$) can be determined from the definition of the Mach number and the local speed of sound ($a_e = \sqrt{\gamma R T_e}$):
$$ V_e = M_e \sqrt{\gamma R T_e} $$
Alternatively, from the energy equation, it can be expressed in terms of stagnation temperature and pressure ratio:
$$ V_e = \sqrt{2 \frac{\gamma R}{\gamma-1} T_0 \left(1 - \left(\frac{P_e}{P_0}\right)^{\frac{\gamma-1}{\gamma}}\right)} $$
This form is particularly useful for calculating the exhaust velocity based on the overall pressure ratio across the nozzle.

Finally, the **isentropic area ratio** relates the area at any point to the throat area ($A^*$, where $M=1$):
$$ \frac{A_e}{A^*} = \frac{1}{M_e} \left[ \frac{1 + \frac{\gamma-1}{2}M_e^2}{1 + \frac{\gamma-1}{2}} \right]^{\frac{\gamma+1}{2(\gamma-1)}} $$
This relation is critical for designing the geometry of convergent-divergent nozzles required for supersonic flow, showing that for $M_e > 1$, $A_e > A^*$.

These relations are foundational in compressible fluid dynamics and rocket propulsion, forming the basis for nozzle design, performance prediction, and analysis of high-speed flows.
(Refer to: Anderson, John D. Jr. *Fundamentals of Aerodynamics*. 5th ed. McGraw-Hill Education, 2017, Chapter 3. Also, Sutton, George P., and Oscar Biblarz. *Rocket Propulsion Elements*. 9th ed. John Wiley & Sons, 2017, Chapter 3.)

## 8. ASCII diagrams

Here is a simplified diagram of a convergent-divergent (de Laval) nozzle, indicating the flow properties at different sections.

```text
       Chamber (Stagnation Conditions: P0, T0, rho0, V ~ 0)
       <--------------------------------------------------->
       |                                                   |
       |                                                   |  <-- Nozzle Wall
       |  \                                             /  |
       |   \                                           /   |
       |    \                                         /    |
       |     \                                       /     |
       |      \                                     /      |
       |       \                                   /       |
       |        \                                 /        |
       |         \                             /         |
       |          \                         /          |
       |           \                     /           |
       |            \                   /            |
       |             \                 /             |
       |              \               /              |
       |               \             /               |
       |                \           /                |
       |                 \         /                 |
       |                  \       /                  |
       |                   \     /                   |
       |                    \   /                    |
       |                     \ /                     |  <-- Throat (A*, M=1, P*, T*, rho*)
       |                      V                      |
       |                     / \                     |
       |                    /   \                    |
       |                   /     \                   |
       |                  /       \                  |
       |                 /         \                 |
       |                /           \                |
       |               /             \               |
       |              /               \              |
       |             /                 \             |
       |            /                   \            |
       |           /                       \           |
       |          /                         \          |
       |         /                             \         |
       |        /                                 \        |
       |       /                                   \       |
       |      /                                     \      |
       |     /                                       \     |
       |    /                                         \    |
       |   /                                           \   |
       |  /                                             \  |
       |/                                                \|  <-- Exit (Ae, Me, Pe, Te, rho_e, Ve)
       -----------------------------------------------------> Flow Direction

Key:
- P0, T0, rho0: Stagnation Pressure, Temperature, Density (in Chamber)
- P*, T*, rho*: Static Pressure, Temperature, Density at Throat (M=1)
- A*: Throat Area (minimum area)
- Pe, Te, rho_e: Static Pressure, Temperature, Density at Exit
- Ve, Me: Velocity and Mach number at Exit
- Ae: Exit Area
- V ~ 0: Velocity is approximately zero in the chamber.
```

This diagram illustrates the key regions of a de Laval nozzle. The gas enters the chamber at high pressure and temperature, with negligible velocity (stagnation conditions). It then accelerates through the converging section, reaching sonic speed ($M=1$) at the throat, which is the minimum area ($A^*$). Beyond the throat, in the diverging section, the flow continues to accelerate, becoming supersonic ($M>1$), while its static pressure, temperature, and density decrease further until it exits the nozzle at area $A_e$ with exit Mach number $M_e$.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of the "P-T-D" order (Pressure, Temperature, Density) and their corresponding exponents in the stagnation ratio formulas.
    *   **P**ressure: Has $\gamma$ "on top" in the exponent, so $\frac{\gamma}{\gamma-1}$.
    *   **T**emperature: Has "no $\gamma$" on top, so $\frac{1}{\gamma-1}$.
    *   **D**ensity: Also has "no $\gamma$" on top, so $\frac{1}{\gamma-1}$.
    Visual: Imagine a "P" for Pressure with a little $\gamma$ hat, while "T" and "D" just have a flat hat.
    All exponents are negative when you want $P_e/P_0$, $T_e/T_0$, $\rho_e/\rho_0$. So, the base term $(1 + \frac{\gamma-1}{2}M_e^2)$ is always raised to a *negative* power.

2.  **Formulas/Facts to Overlearn:**
    *   $\frac{T_e}{T_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-1}$
    *   $\frac{P_e}{P_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{\gamma}{\gamma-1}}$
    *   $\frac{\rho_e}{\rho_0} = \left(1 + \frac{\gamma-1}{2}M_e^2\right)^{-\frac{1}{\gamma-1}}$
    *   $V_e = M_e \sqrt{\gamma R T_e}$ (and remember to use $T_e$, not $T_0$)

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, work through all examples without looking at solutions.
    *   **Day 3:** Re-derive the three ratio formulas from first principles. Work through Example 3 (solving for $M_e$) again.
    *   **Day 7:** Quickly write down all four key formulas from memory. Attempt one self-check question.
    *   **Day 16:** Review the derivations, focusing on the area ratio formula. Attempt another self-check question.
    *   **Day 35:** Go through all self-check questions. If any formula is fuzzy, re-derive it.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget these formulas, you can always rebuild them:
    *   **Start with the energy equation for steady, adiabatic flow:** $h_0 = h + \frac{V^2}{2}$.
    *   **Substitute ideal gas relations:** $h = c_p T$. This gives $c_p T_0 = c_p T + \frac{V^2}{2}$.
    *   **Introduce Mach number:** Divide by $c_p T$, substitute $c_p = \frac{\gamma R}{\gamma-1}$ and $a^2 = \gamma R T$, and $M = V/a$. This directly yields $\frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2$.
    *   **Use isentropic relations:** For isentropic flow, $P/\rho^\gamma = \text{const}$ and $P/\rho = RT$. These lead to $\frac{P_0}{P} = \left(\frac{T_0}{T}\right)^{\frac{\gamma}{\gamma-1}}$ and $\frac{\rho_0}{\rho} = \left(\frac{T_0}{T}\right)^{\frac{1}{\gamma-1}}$.
    *   **Substitute the temperature ratio:** Plug the derived $T_0/T$ expression into the pressure and density ratios to get their final forms.
    *   **For velocity:** Use $V = M a$ and $a = \sqrt{\gamma R T}$. Substitute the $T_e/T_0$ relation to express $T_e$ in terms of $T_0$.

## 10. Connections — what this leads to

Understanding the chamber-to-exit relations is not an end in itself; it's a foundational stepping stone to many advanced topics in propulsion and high-speed fluid dynamics:

1.  **Nozzle Performance Parameters:** These relations are directly used to calculate crucial rocket engine performance metrics like:
    *   **Thrust:** $F = \dot{m} V_e + (P_e - P_{amb}) A_e$. The $V_e$ and $P_e$ values come directly from these relations.
    *   **Specific Impulse ($I_{sp}$):** $I_{sp} = F / (\dot{m} g_0)$, which is a measure of engine efficiency.
    *   **Characteristic Velocity ($c^*$):** A measure of combustion efficiency, often used in conjunction with the thrust coefficient ($C_F$) to predict thrust.
    *   **Thrust Coefficient ($C_F$):** Relates thrust to chamber pressure and throat area, and is derived using these isentropic flow relations.

2.  **Nozzle Design Optimization:** Engineers use these formulas to design the optimal nozzle expansion ratio ($A_e/A^*$) for various operating conditions (e.g., sea-level vs. vacuum). An "over-expanded" or "under-expanded" nozzle can lead to performance loss or flow separation, and these phenomena are understood by analyzing the $P_e/P_0$ ratio relative to ambient pressure.

3.  **Shock Waves and Nozzle Flow Separation:** When $P_e$ is significantly different from the ambient pressure, complex flow phenomena like shock waves (if $P_e > P_{amb}$) or flow separation (if $P_e \ll P_{amb}$) can occur inside or at the exit of the nozzle. The chamber-to-exit relations provide the baseline isentropic conditions against which these non-isentropic effects are analyzed.

4.  **Turbomachinery (Turbines and Compressors):** The principles of compressible flow, stagnation properties, and isentropic expansion/compression are directly applicable to the design and analysis of gas turbines and jet engine compressors. The flow through turbine stages involves expansion, similar to a nozzle, while compressors involve compression.

5.  **Hypersonic Aerodynamics:** For vehicles traveling at Mach 5 and above, the flow field around the vehicle is highly compressible. The concepts of stagnation properties and their relation to static properties are fundamental to understanding aerodynamic heating, shock layers, and pressure distributions on hypersonic vehicles.

6.  **Computational Fluid Dynamics (CFD):** These analytical solutions serve as benchmark cases for validating numerical simulations (CFD) of nozzle flows and other compressible flow problems. Any CFD code attempting to model a rocket nozzle must accurately reproduce these fundamental isentropic relations.

## 11. Self-check questions

1.  A gas with $\gamma = 1.4$ flows through a nozzle. If the stagnation temperature is 500 K and the static temperature at a point is 400 K, what is the Mach number at that point?
2.  An exhaust gas from a combustion chamber has $T_0 = 2800 \text{ K}$, $P_0 = 10 \text{ MPa}$, $\gamma = 1.2$, and $R = 300 \text{ J/(kg·K)}$. If the nozzle is designed for an exit Mach number of 3.5, calculate the exit pressure ($P_e$) and the exit velocity ($V_e$).
3.  For a nozzle operating with $\gamma = 1.3$, if the exit pressure ($P_e$) is 50 kPa and the chamber pressure ($P_0$) is 15 MPa, what is the ratio of the exit temperature ($T_e$) to the chamber temperature ($T_0$)? You do not need to find $M_e$ explicitly, but you may use it as an intermediate step.
4.  A convergent-divergent nozzle has an area ratio $A_e/A^*$ of 20. If the exhaust gas has $\gamma = 1.28$, what are the two possible Mach numbers at the exit? Explain why there are two solutions.
5.  Consider two rocket engines. Engine A has $\gamma = 1.2$ and an exit Mach number of 4.0. Engine B has $\gamma = 1.3$ and an