## What it is
A mass budget is an exhaustive accounting system that tracks every gram of a spacecraft throughout its design lifecycle. "Dry mass" refers to the spacecraft's structural and hardware weight without any propellant, while "wet mass" includes the propellant required for the mission. "Margin" is an unallocated mass allowance kept in reserve to absorb the inevitable weight growth that occurs as designs mature from optimistic blueprints to physical hardware.

## Why it matters
Mass is the most constrained resource in aerospace engineering; every extra kilogram requires exponentially more propellant to launch, as dictated by the Tsiolkovsky rocket equation. In the real world, exceeding your mass budget means you either cannot reach your target orbit, or you must buy a larger, vastly more expensive launch vehicle. Later in this curriculum, mass budgets will directly drive your orbital mechanics $\Delta v$ calculations, structural stress limits, and propulsion system sizing.

## When to study it
You must already understand the Tsiolkovsky rocket equation and the concept of $\Delta v$ (change in velocity). You should also have a basic grasp of orbital mechanics—specifically, how much $\Delta v$ is required for specific maneuvers. If you cannot calculate the propellant mass fraction required to achieve a given $\Delta v$, go back and master the rocket equation first.

## How to study it (step by step)
1. Write out the definitions and mathematical relationships between payload mass, bus mass, dry mass, propellant mass, and wet mass.
2. Substitute wet and dry mass into the Tsiolkovsky rocket equation. Calculate how a $1\%$ increase in dry mass affects the required propellant mass for a fixed $\Delta v$.
3. Research standard aerospace mass margin guidelines (e.g., AIAA S-120A). Note how margins shrink from Conceptual Design (e.g., 30%) to Critical Design (e.g., 10%) as uncertainty decreases.
4. Create a basic mass budget spreadsheet for a hypothetical satellite. List subsystems (power, structure, comms), assign nominal masses, apply a 20% margin to each, and calculate the total allocated dry mass.
5. Using your spreadsheet, calculate the total wet mass assuming a required $\Delta v$. 
6. Perform a sensitivity analysis: increase the structural mass by 15% and observe the cascading exponential effect on the required propellant mass.

## Key ideas, with intuition

**The Mass Hierarchy**
A spacecraft's total mass (wet mass, $m_{wet}$) is the sum of its dry mass ($m_{dry}$) and its propellant mass ($m_{prop}$). The dry mass itself is the sum of the payload (the instruments you care about) and the bus (the systems keeping the payload alive and moving).
$$m_{wet} = m_{dry} + m_{prop}$$

**Current Best Estimate (CBE) and Margin**
Engineers estimate the mass of a component to get a Current Best Estimate (CBE). Because physical parts always end up heavier than CAD models suggest (due to fasteners, wiring harnesses, and manufacturing tolerances), we multiply the CBE by a margin percentage to get the allocated mass.
$$m_{allocated} = m_{CBE} (1 + \%_{margin})$$

**The Tyranny of the Rocket Equation**
Margins matter because of the rocket equation, which dictates that:
$$m_{wet} = m_{dry} e^{\frac{\Delta v}{I_{sp} g_0}}$$
Notice that wet mass scales *linearly* with dry mass, but *exponentially* with $\Delta v$. If your dry mass grows by 10 kg due to poor margin planning, your wet mass grows by $10 \cdot e^{\frac{\Delta v}{I_{sp} g_0}}$ kg. You must buy propellant just to carry the extra propellant required to carry the extra dry hardware.

## Worked example
**Problem:** A spacecraft has a Current Best Estimate (CBE) payload mass of $50 \text{ kg}$ and a CBE bus mass of $200 \text{ kg}$. The systems engineer mandates a $20\%$ mass margin on all dry components. The spacecraft must execute a maneuver of $\Delta v = 1000 \text{ m/s}$. The propulsion system has a specific impulse $I_{sp} = 300 \text{ s}$. Standard gravity $g_0 = 9.81 \text{ m/s}^2$. Calculate the total wet mass and the required propellant mass.

**Step 1: Calculate CBE dry mass.**
$$m_{CBE, dry} = m_{payload} + m_{bus} = 50 + 200 = 250 \text{ kg}$$

**Step 2: Apply the margin to find the allocated dry mass.**
$$m_{alloc, dry} = m_{CBE, dry} \times (1 + 0.20) = 250 \times 1.20 = 300 \text{ kg}$$

**Step 3: Calculate wet mass using the rocket equation.**
$$m_{wet} = m_{alloc, dry} \exp\left(\frac{\Delta v}{I_{sp} g_0}\right)$$
$$m_{wet} = 300 \exp\left(\frac{1000}{300 \times 9.81}\right)$$
$$m_{wet} = 300 \exp(0.3398) = 300 \times 1.4046 = 421.4 \text{ kg}$$

**Step 4: Calculate propellant mass.**
$$m_{prop} = m_{wet} - m_{alloc, dry} = 421.4 - 300 = 121.4 \text{ kg}$$

*Reflection:* By applying the margin *before* calculating the propellant, we ensure the propulsion system is sized to push the worst-case heavy spacecraft, not the optimistic CAD model. If we had calculated propellant based on the 250 kg CBE, we would have only loaded 101 kg of propellant—leaving the spacecraft stranded when the hardware inevitably grew to 300 kg.

## Diagrams

```text
[ TOTAL WET MASS ]  <-- Sized by Launch Vehicle capacity
       |
       +----------------------------------+
       |                                  |
[ TOTAL DRY MASS ]                 [ PROPELLANT MASS ]
       |                           (Fuel + Oxidizer + Pressurant)
       +-----------------+                ^
       |                 |                |
[ PAYLOAD MASS ]   [ BUS MASS ]           |
(Science/Comms)    (Structures, Power,    |
                    Thermal, Avionics)    |
       |                 |                |
      CBE               CBE               |
   + Margin          + Margin             |
       |                 |                |
       +--------+--------+                |
                |                         |
                +--- Drives amount of ----+
```

## Memory technique — remember this forever
1. **The Hook:** Think of a sponge. A *dry* sponge is just the structural matrix (hardware). A *wet* sponge is the structure plus the water (propellant). *Margin* is the extra space you must leave in the bucket because you know the sponge will swell.
2. **Formulas to overlearn:** 
   * $m_{allocated} = m_{CBE} \times (1 + \text{margin})$
   * $m_{wet} = m_{dry} + m_{prop}$
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how margins impact propellant, write down the Tsiolkovsky equation $m_{wet} = m_{dry} e^{\frac{\Delta v}{I_{sp} g_0}}$. Substitute $m_{dry} = m_{CBE}(1+\text{margin})$. The exponential relationship instantly reveals why dry mass margins dictate total vehicle size.

## Common mistakes
* **Applying margin to wet mass:** Students often calculate the wet mass using the CBE dry mass, and then apply a 20% margin to the *total wet mass*. This is physically meaningless. Propellant mass is a deterministic result of dry mass and $\Delta v$; it does not get an arbitrary percentage margin.
* **Keeping margins static:** In reality, a component in the concept phase gets a 30% margin. Once it is physically manufactured and weighed on a scale, its margin drops to 0%. Failing to burn down margins as a project matures leads to vastly over-designed rockets.
* **Forgetting pressurant gas:** When calculating wet mass, students often remember fuel and oxidizer but forget the inert pressurant gas (like Helium) required to push the propellants into the engine.

## Self-check
1. A star tracker has a CBE of 2.5 kg. The project requires a 25% margin. What is the allocated mass for the mass budget?
2. A spacecraft has an allocated dry mass of 500 kg. It requires a $\Delta v$ of 2500 m/s. If $I_{sp} = 310 \text{ s}$, what is the required propellant mass?
3. Derive the sensitivity equation $\frac{\partial m_{wet}}{\partial m_{dry}}$. If a spacecraft has an $I_{sp}$ of 300 s and needs a $\Delta v$ of 3000 m/s, exactly how much does 1 kg of unbudgeted dry mass increase the total wet mass?