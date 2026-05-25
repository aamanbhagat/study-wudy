## What it is
Thermal conduction is the transfer of heat energy through a solid material driven by a temperature difference. Thermal stress is the internal mechanical resistance that develops when a structure attempts to expand or contract due to these temperature changes, but is physically constrained from doing so. 

## Why it matters
In orbit, a spacecraft experiences extreme temperature gradients—the sun-facing side can reach $+150^\circ\text{C}$ while the shadowed side plunges to $-150^\circ\text{C}$. If you do not calculate how heat conducts through the spacecraft chassis and the resulting thermal stresses, optical payloads will misalign, solar array hinges will jam, and structural struts will buckle or fracture under their own constrained expansion.

## When to study it
Do not attempt this until you have mastered:
1. **Calculus:** Specifically, ordinary differential equations and the gradient operator ($\nabla$).
2. **Solid Mechanics:** Hooke's Law ($\sigma = E\epsilon$), stress ($\sigma$), and strain ($\epsilon$).
3. **Basic Thermodynamics:** The distinction between heat (energy) and temperature (average kinetic energy).

## How to study it (step by step)
1. **Derive 1D Fourier's Law (20 mins):** Write down the relationship between heat flux, thermal conductivity, and the temperature gradient. Understand why the negative sign exists.
2. **Calculate Free Expansion (15 mins):** Learn the thermal expansion formula $\Delta L = \alpha L \Delta T$. Calculate the free expansion of a 1-meter aluminum boom heated by $100\text{K}$.
3. **Derive Constrained Stress (20 mins):** Set up the "superposition" equation: Total Strain = Mechanical Strain + Thermal Strain. Set Total Strain to zero (clamped) and solve for stress.
4. **Solve a 2-Material Problem (30 mins):** Analyze a composite strut (e.g., Titanium bonded to Carbon Fiber) undergoing a temperature change. Solve for the internal forces where their differing expansion coefficients cause them to fight each other.
5. **Combine Conduction and Stress (30 mins):** Take a strut with a hot end and a cold end. Integrate the linear temperature profile $T(x)$ to find the total thermal expansion, then find the stress if constrained.

## Key ideas, with intuition

**1. Fourier's Law of Heat Conduction**
Heat flows down the "temperature hill." The heat flux $q$ (power per unit area, $\text{W/m}^2$) is proportional to how steep the temperature gradient is.
$$q = -k \nabla T$$
In 1D, this is $q_x = -k \frac{dT}{dx}$. The negative sign is critical: heat flows from high temperature to low temperature (against the gradient). $k$ is the material's thermal conductivity.

**2. Thermal Strain (Free Expansion)**
When a material heats up, its atoms vibrate more violently, pushing each other apart. If the object is free to expand, it experiences *thermal strain* ($\epsilon_{th}$), but **zero stress**.
$$\epsilon_{th} = \alpha \Delta T$$
Where $\alpha$ is the Coefficient of Thermal Expansion (CTE). The change in length is simply $\Delta L = \alpha L \Delta T$.

**3. Thermal Stress (Constrained)**
Stress only happens if you fight the expansion. If a strut is clamped between two rigid spacecraft bulkheads and heats up, it wants to expand but cannot. The total strain must be zero. 
$$\epsilon_{total} = \epsilon_{mech} + \epsilon_{th} = 0$$
Since $\epsilon_{mech} = \frac{\sigma}{E}$ (Hooke's Law), we get:
$$\frac{\sigma}{E} + \alpha \Delta T = 0 \implies \sigma = -E \alpha \Delta T$$
The negative sign indicates a compressive stress (the walls are squishing the expanding bar).

## Worked example
**Problem:** An aluminum strut ($E = 70 \text{ GPa}$, $\alpha = 23 \times 10^{-6} \text{ K}^{-1}$) of length $L = 2\text{m}$ is rigidly clamped between two massive, immovable satellite bulkheads at $T_0 = 20^\circ\text{C}$. The strut is exposed to sunlight and uniformly heats to $T_f = 80^\circ\text{C}$. Find the thermal stress in the strut.

**Step 1: Identify the temperature change.**
$$\Delta T = T_f - T_0 = 80^\circ\text{C} - 20^\circ\text{C} = 60\text{ K}$$
*(Note: A change in Celsius equals a change in Kelvin).*

**Step 2: Calculate the free thermal strain.**
If the strut were unconstrained, it would strain by:
$$\epsilon_{th} = \alpha \Delta T = (23 \times 10^{-6} \text{ K}^{-1})(60 \text{ K}) = 0.00138$$

**Step 3: Apply the kinematic constraint.**
Because the bulkheads are rigid, the total strain must be zero. The bulkheads must apply a mechanical strain to exactly cancel the thermal strain.
$$\epsilon_{mech} = -\epsilon_{th} = -0.00138$$

**Step 4: Calculate the stress using Hooke's Law.**
$$\sigma = E \epsilon_{mech} = (70 \times 10^9 \text{ Pa})(-0.00138) = -96.6 \times 10^6 \text{ Pa}$$
$$\sigma = -96.6 \text{ MPa}$$

*Reflection:* The stress is $-96.6 \text{ MPa}$. The negative sign makes physical sense: the strut wants to grow, the walls prevent it, therefore the strut is in compression. If this exceeds the yield strength or critical buckling load of the strut, the spacecraft structure will fail.

## Diagrams

```text
CONSTRAINED THERMAL EXPANSION

      Rigid Wall                           Rigid Wall
      |                                             |
      | <------------- L = 2.0 m -----------------> |
      |                                             |
      |=============================================|
      |               ALUMINUM STRUT                | Heat applied 
      |=============================================| (Delta T > 0)
      |                                             |
      | ->                                       <- |
      | ->           Reaction Forces             <- |
      | ->         (Causes Compressive           <- |
      | ->               Stress)                 <- |

Total Strain = 0
The strut "wants" to expand by Delta L, so the walls must push 
back with force P to compress it by Delta L.
```

## Memory technique — remember this forever
**1. The Hook:** "Free to grow, stress is zero. Block the way, stress will pay." 
**2. Must overlearn:**
*   Fourier's Law: $q = -k \nabla T$
*   Thermal Strain: $\epsilon_{th} = \alpha \Delta T$
*   Total Strain: $\epsilon_{total} = \epsilon_{mech} + \epsilon_{th}$
**3. Spaced-repetition schedule:** Review this concept and re-derive the constrained stress formula at 1 day, 3 days, 7 days, 16 days, and 35 days.
**4. First principles pathway:** Never memorize $\sigma = -E \alpha \Delta T$ in isolation. Always start at $\epsilon_{total} = \epsilon_{mech} + \epsilon_{th}$. If clamped, $\epsilon_{total} = 0$. Substitute Hooke's Law ($\epsilon_{mech} = \sigma/E$) and thermal strain ($\epsilon_{th} = \alpha \Delta T$). Solve for $\sigma$. This prevents sign errors.

## Common mistakes
*   **Assuming heating always causes stress:** Students often calculate $\sigma = E \alpha \Delta T$ for a part that is completely unconstrained. A satellite antenna floating in space can heat up by $200\text{K}$ and experience *zero* thermal stress if it is free to expand. Stress requires a constraint.
*   **Confusing heat ($Q$) and heat flux ($q$):** $Q$ is total energy (Joules). $\dot{Q}$ is power (Watts). $q$ is heat flux (Watts per square meter). Fourier's law gives you $q$.
*   **Dropping the negative sign in Fourier's Law:** Heat flows from hot to cold. The gradient $\frac{dT}{dx}$ is positive if temperature is increasing. You need the negative sign so heat flows in the opposite direction of the gradient.

## Self-check
1. A titanium rod is heated by $50\text{K}$ while floating unattached in a vacuum chamber. What is the thermal strain? What is the thermal stress?
2. A spacecraft wall has an inner temperature of $20^\circ\text{C}$ and an outer temperature of $-100^\circ\text{C}$. If the wall is $5\text{cm}$ thick and has a thermal conductivity of $150 \text{ W/(m K)}$, what is the steady-state heat flux through the wall?
3. Two rods, one of aluminum and one of invar (a very low CTE alloy), are placed end-to-end between two rigid walls. The system is heated by $\Delta T$. Derive the expression for the stress in the rods. (Hint: The forces in both rods must be equal, and the sum of their deformations must be zero).