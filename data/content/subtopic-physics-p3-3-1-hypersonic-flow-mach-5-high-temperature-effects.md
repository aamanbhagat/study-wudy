## What it is
Hypersonic flow is the regime of fluid dynamics where the flow speed is vastly greater than the speed of sound, conventionally defined as Mach 5 or higher ($M \ge 5$). At these speeds, the kinetic energy of the flow is so immense that upon compression (e.g., by a shock wave), the air temperature rises to thousands of Kelvin, causing the air molecules themselves to vibrate, break apart (dissociate), and ionize, behaving as a chemically reacting plasma. This is often called "real gas effects."

## Why it matters
This is the physics of atmospheric re-entry for all spacecraft (e.g., Orion, SpaceX Starship) and the operating principle behind hypersonic weapons and vehicles. Understanding these high-temperature effects is critical for designing thermal protection systems (heat shields), predicting aerodynamic forces and stability, and developing advanced propulsion like scramjets. The coupling of fluid dynamics with chemistry and electromagnetism is a frontier problem in both aerospace engineering and computational physics.

## When to study it
You must have a firm grasp of the following before tackling this topic:
*   **Thermodynamics:** First and Second Laws, enthalpy, specific heats ($c_p, c_v$), and the ideal gas law.
*   **Compressible Flow:** Isentropic flow relations, normal and oblique shock waves, and Prandtl-Meyer expansion waves, all under the "calorically perfect gas" assumption ($\gamma$ is constant).
*   **Basic Chemistry:** The molecular composition of air ($N_2, O_2$), and the concepts of molecular vibration, dissociation, and ionization.

If you are not confident in deriving and applying the normal shock relations from the conservation laws, pause and review that first.

## How to study it (step by step)
1.  **Motivate the problem:** Use the perfect gas normal shock relations you already know. Calculate the temperature ratio $T_2/T_1$ for a Mach 10 shock in air ($\gamma=1.4$). The result will be an astronomically high temperature, suggesting the perfect gas model is breaking down.
2.  **Understand energy sinks:** For a diatomic gas like $N_2$ or $O_2$, internal energy is stored in several modes: translation, rotation, vibration, and chemical bonds. At low temperatures, only translation and rotation are active. As temperature skyrockets behind a hypersonic shock, energy is "sunk" into exciting vibrational modes and then into breaking the molecular bonds (dissociation). Realize that this energy sink means the final temperature will be *lower* than your perfect gas calculation predicted, as energy is diverted from translation (which defines temperature).
3.  **Learn the new flow features:** Study diagrams of hypersonic flow over a blunt body. Identify the key features: a strong, detached bow shock that stands off from the body, and a very thin "shock layer" of hot, compressed gas between the shock and the body.
4.  **Connect Mach number to geometry:** Using the Mach angle formula, $\mu = \arcsin(1/M)$, see that as $M \rightarrow \infty$, $\mu \rightarrow 0$. This is why shock waves in hypersonic flow "lie down" and wrap very closely to the vehicle body.
5.  **Grasp the Blunt Body Paradox:** Supersonic aircraft have sharp noses to minimize wave drag. Hypersonic vehicles have blunt noses. Why? A blunt nose creates a stronger, detached shock. This increases drag, but it pushes the shock and the hottest part of the shock layer further away from the surface, reducing the heat transfer *rate* to the vehicle, which is the more critical problem.

## Key ideas, with intuition
*   **Energy Partitioning is Key:** The central idea of hypersonic thermodynamics is that the massive kinetic energy of the freestream flow doesn't just become translational kinetic energy (temperature) of gas molecules after the shock. It's partitioned.
    $$
    \text{Kinetic Energy}_{freestream} \rightarrow \Delta E_{internal} = \Delta E_{trans} + \Delta E_{rot} + \Delta E_{vib} + \Delta E_{dissoc} + \Delta E_{ionize}
    $$
    A perfect gas model only accounts for the first two terms. In hypersonics, the last three terms become dominant, acting as energy sinks that cap the peak temperature but introduce immense chemical complexity.

*   **Thin Shock Layers:** The density ratio across a normal shock for a perfect gas has a finite limit as $M_1 \rightarrow \infty$:
    $$
    \lim_{M_1 \to \infty} \frac{\rho_2}{\rho_1} = \frac{\gamma+1}{\gamma-1}
    $$
    For air ($\gamma=1.4$), this limit is 6. For a real gas, dissociation effects can increase this ratio to 15-20. This high compression ratio squashes the post-shock flow into a very thin layer between the shock and the body.

*   **The Blunt Body Solution:** The primary engineering challenge in hypersonics is surviving extreme heat flux ($\dot{q}$), not just high temperature. A sharp nose creates a weak, attached oblique shock with a very small shock layer. The hot gas is immediately adjacent to the surface, leading to a catastrophic heat transfer rate. A blunt nose creates a strong, detached bow shock. This pushes the shock further from the body, creating a thicker (though still thin) shock layer. This larger standoff distance dramatically reduces the temperature gradient at the wall, and thus the heat flux, saving the vehicle. It's a trade: accept higher drag to survive the heat.

## Worked example
**Problem:** Air at an altitude where $T_1 = 220 \text{ K}$ and $p_1 = 55 \text{ Pa}$ flows at Mach 20 towards a re-entry capsule. Estimate the temperature $T_2$ directly behind the normal part of the bow shock, assuming the air behaves as a calorically perfect gas with $\gamma = 1.4$. Then, explain qualitatively why the true temperature will be lower.

**Step 1: State the governing equation.**
For a calorically perfect gas, the temperature ratio across a normal shock is given by:
$$
\frac{T_2}{T_1} = \frac{\left(1 + \frac{\gamma-1}{2}M_1^2\right)\left(2\gamma M_1^2 - (\gamma-1)\right)}{\frac{(\gamma+1)^2}{2}M_1^2}
$$

**Step 2: Substitute the given values.**
We have $M_1 = 20$, $\gamma = 1.4$, and $T_1 = 220 \text{ K}$.
Let's calculate the terms:
*   $\gamma - 1 = 0.4$
*   $\gamma + 1 = 2.4$
*   $M_1^2 = 400$

Numerator:
*   $1 + \frac{0.4}{2}(400) = 1 + 0.2(400) = 1 + 80 = 81$
*   $2(1.4)(400) - 0.4 = 2.8(400) - 0.4 = 1120 - 0.4 = 1119.6$
*   Numerator product = $81 \times 1119.6 = 90687.6$

Denominator:
*   $\frac{(2.4)^2}{2}(400) = \frac{5.76}{2}(400) = 2.88(400) = 1152$

**Step 3: Calculate the temperature ratio and the final temperature.**
$$
\frac{T_2}{T_1} = \frac{90687.6}{1152} \approx 78.72
$$
$$
T_2 = T_1 \times 78.72 = 220 \text{ K} \times 78.72 \approx 17318 \text{ K}
$$

**Step 4: Reflection and qualitative analysis.**
The perfect gas model predicts a temperature of over 17,000 K. This is hotter than the surface of the sun and physically unrealistic for air.
The reason is that this model assumes all the kinetic energy is converted into translational and rotational energy of intact $N_2$ and $O_2$ molecules.
In reality, at such temperatures:
1.  The vibrational modes of the molecules would become fully excited, absorbing a large amount of energy.
2.  The $O_2$ molecules would dissociate into oxygen atoms ($O_2 \rightarrow 2O$), requiring ~5.1 eV per molecule.
3.  The $N_2$ molecules would dissociate into nitrogen atoms ($N_2 \rightarrow 2N$), requiring ~9.8 eV per molecule.
4.  At even higher energies, atoms would ionize ($N \rightarrow N^+ + e^-$).

These chemical reactions are endothermic; they absorb enormous amounts of energy from the flow. This energy is "stolen" from the translational modes, so the final equilibrium temperature of the gas mixture is much lower, typically in the range of 6,000-9,000 K for these conditions. The perfect gas model is therefore useful only as a first-order estimate to demonstrate the extreme energy involved.

## Diagrams
Here is a diagram of hypersonic flow over a blunt body.

```text
                                --> Detached Bow Shock
                               /
                              /
                             | <--- Shock Layer (Hot, compressed plasma)
                             |
Freestream Flow   ==========>| O <-- Stagnation Point
M > 5, low T, low p          |
                             |
                              \
                               \
                                --> Vehicle Body
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of hypersonic re-entry as a "cosmic brake pad." The vehicle isn't just pushing air out of the way; it's using the air itself as a brake. The immense kinetic energy has to go somewhere. Instead of being absorbed by a mechanical brake (which would vaporize), it's dumped into the air, superheating it into a plasma. The blunt nose is the "brake pad" design that maximizes energy transfer to the air while minimizing heat transfer *to the vehicle*.

2.  **Formulas to Overlearn:**
    *   The concept, not a formula: $KE_{flow} \rightarrow \Delta E_{internal} = \sum (\text{trans, rot, vib, chem, ioniz})$. This is the core physical principle.
    *   The Mach angle: $\mu = \arcsin(1/M)$. This explains the geometry: high Mach number means very swept-back shock waves.
    *   The perfect gas density limit: $\frac{\rho_2}{\rho_1} \to \frac{\gamma+1}{\gamma-1}$ as $M_1 \to \infty$. This explains the physics: compression is finite, leading to a thin shock layer.

3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**: Redraw the blunt body diagram from memory and label the parts.
    *   Review in **3 days**: Re-do the worked example without looking at the solution.
    *   Review in **7 days**: Explain the "blunt body paradox" to a colleague or rubber duck.
    *   Review in **16 days**: Derive the perfect gas density limit formula from the normal shock relations.
    *   Review in **35 days**: Explain how the energy sinks (vibration, dissociation) lower the final temperature compared to the perfect gas prediction.

4.  **First Principles Pathway:** If you forget everything, start from the integral form of the conservation laws (mass, momentum, energy) applied to a control volume across a shock wave. The physics of hypersonic flow is captured by modifying the energy equation. For a perfect gas, enthalpy is simple: $h = c_p T$. For a real, hypersonic gas, the enthalpy of the mixture, $h_{mix} = \sum_i \chi_i h_i(T)$, must account for the changing chemical species concentrations ($\chi_i$) and the complex temperature dependence of each species' enthalpy, including heats of formation. The fundamental conservation laws are your anchor.

## Common mistakes
*   **Applying perfect gas tables/charts:** Using standard compressible flow tables (which assume $\gamma=1.4$) for a Mach 15 flow will give you quantitatively wrong answers for temperature, density, and pressure.
*   **Confusing temperature and heat transfer:** The gas temperature behind the shock can be 8000 K, but this does not mean the vehicle surface is at 8000 K. The critical engineering parameter is the *rate* of heat transfer ($\dot{q}$, in Watts/m$^2$) to the wall, which depends on temperature gradients and transport properties in the shock layer.
*   **"Friction heating":** A common misconception is that re-entry vehicles get hot due to air friction. While skin friction contributes, the dominant heating mechanism by far is the massive, near-instantaneous compression of the air across the bow shock wave.
*   **Ignoring the boundary layer:** Assuming the shock layer is the whole story. There is still a viscous boundary layer at the vehicle surface, and its interaction with the shock layer (viscous interaction) is a complex phenomenon that can dramatically increase local heating and skin friction.

## Self-check
1.  Why is the shock layer on a hypersonic vehicle typically much thinner than on a supersonic aircraft flying at Mach 2?
2.  You are designing a thermal protection system. Two material candidates are available. Material A can withstand a higher peak temperature but is sensitive to high heat flux. Material B can withstand a very high heat flux but has a lower maximum temperature limit. Based on the "blunt body paradox," which material is likely a better choice for the stagnation point of a re-entry vehicle and why?
3.  As air heats from 300 K to 6000 K, the specific heat ratio $\gamma$ changes. Does it increase or decrease? Justify your answer by considering which energy modes become active, and how that affects the definitions of $c_p$ and $c_v$.