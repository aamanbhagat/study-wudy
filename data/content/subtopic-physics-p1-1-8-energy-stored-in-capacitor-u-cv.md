## What it is
A capacitor stores energy in the electric field created between its conductive plates. The equation $U = \frac{1}{2}CV^2$ quantifies this stored electrical potential energy, where $U$ is the energy, $C$ is the capacitance, and $V$ is the voltage (potential difference) across the plates. This energy is equivalent to the total work done to move charge onto the capacitor.

## Why it matters
This concept is not just academic; it's fundamental to modern technology. In aerospace, capacitors are critical for power conditioning in avionics and for storing and rapidly discharging large amounts of energy for radar pulses or engine ignition systems. In computer science, every bit of information in the DRAM of your computer is stored in a tiny capacitor (charged = 1, uncharged = 0), and understanding its energy is key to designing low-power devices. The principle of storing energy in a field is a cornerstone of physics, extending directly to magnetic fields in inductors and the propagation of energy in electromagnetic waves.

## When to study it
Before tackling this derivation, ensure you have a firm grasp of these prerequisites:
1.  **Definition of Electric Potential (Voltage)**: Voltage $V$ is the work done $W$ per unit charge $q$, so $V = W/q$. This implies that the work to move a charge $q$ through a potential difference $V$ is $W = qV$.
2.  **Definition of Capacitance**: Capacitance $C$ is the ratio of stored charge $Q$ to the voltage $V$ across the capacitor, $C = Q/V$.
3.  **Basic Calculus (Integration)**: You must understand that an integral represents the area under a curve and be able to compute a simple polynomial integral, specifically $\int x \, dx = \frac{1}{2}x^2$.

If you are not confident with these, review them first. The derivation will not make sense otherwise.

## How to study it (step by step)
1.  **Derive from first principles.** Start with the definition of work done to move an infinitesimal charge $dq$ onto a plate that already has charge $q$ and potential $v$. This work is $dW = v \, dq$. Use the relation $q=Cv$ to substitute for $v$ and integrate from $q=0$ to $q=Q$.
2.  **Visualize the graphical interpretation.** Plot the voltage $v$ on the y-axis versus the charge $q$ on the x-axis as the capacitor charges. Since $v = q/C$, this is a straight line through the origin. The total work done (energy stored) is the area under this line, which forms a triangle. Calculate this area.
3.  **Derive the alternative forms.** Take the primary result, $U = \frac{Q^2}{2C}$, and use the definition $Q=CV$ to derive the other two common forms: $U = \frac{1}{2}CV^2$ and $U = \frac{1}{2}QV$. For each form, identify which variables ($Q$, $C$, or $V$) must be known.
4.  **Solve a "constant charge" problem.** Calculate the energy in a capacitor. Then, disconnect it from the battery and change its geometry (e.g., pull the plates apart). The charge $Q$ is now constant. Use the appropriate formula to find the new energy and voltage.
5.  **Solve a "constant voltage" problem.** Calculate the energy in a capacitor connected to a battery. Now, change its geometry while it remains connected. The voltage $V$ is now constant. Calculate the new energy and charge. Compare the physics of this situation to the previous step.

## Key ideas, with intuition
1.  **Charging a capacitor is like compressing a spring.** The first bit of charge you move is easy; there's no opposing electric field. As you add more charge, the existing charge on the plates creates a voltage that repels new charges. You have to do more and more work for each subsequent charge packet. The energy isn't just the final charge times the final voltage, because the voltage wasn't always that high.
2.  **The factor of ½ comes from the average.** The voltage on the capacitor increases linearly from $0$ to its final value $V_f$. The *average* voltage during the entire charging process is $V_{avg} = \frac{0 + V_f}{2} = \frac{1}{2}V_f$. The total work done is the total charge moved, $Q$, times this average voltage:
    $$U = W = Q \cdot V_{avg} = Q \left( \frac{1}{2}V_f \right) = \frac{1}{2}QV_f$$
3.  **Energy is stored in the electric field.** The energy is not a fluid sitting on the metal plates. It is stored in the volume of space between the plates, within the electric field itself. This is a profound concept: fields contain energy. For a parallel-plate capacitor, the energy density (energy per unit volume) $u_E$ is uniform and given by:
    $$u_E = \frac{1}{2}\epsilon_0 E^2$$
    where $E$ is the electric field strength and $\epsilon_0$ is the permittivity of free space. Integrating this density over the volume between the plates gives back the total energy $U$.

## Worked example
A parallel-plate air-gap capacitor with capacitance $C_1 = 20 \, \mu\text{F}$ is connected to a $12 \, \text{V}$ battery and allowed to fully charge. The battery is then disconnected. A dielectric slab with dielectric constant $\kappa = 4$ is then inserted, completely filling the space between the plates.

a) Find the initial energy stored in the capacitor.
b) Find the final energy stored in the capacitor.
c) Account for the change in energy.

**Solution:**

**Step 1: Calculate initial charge and energy.**
The capacitor is connected to the battery, so the voltage is $V_1 = 12 \, \text{V}$.
The initial energy $U_1$ is:
$$U_1 = \frac{1}{2}C_1 V_1^2 = \frac{1}{2}(20 \times 10^{-6} \, \text{F})(12 \, \text{V})^2 = \frac{1}{2}(20 \times 10^{-6})(144) = 1.44 \times 10^{-3} \, \text{J} = 1.44 \, \text{mJ}$$
The initial charge $Q_1$ on the plates is:
$$Q_1 = C_1 V_1 = (20 \times 10^{-6} \, \text{F})(12 \, \text{V}) = 240 \times 10^{-6} \, \text{C} = 240 \, \mu\text{C}$$

*Reflection: This step is a direct application of the primary formulas.*

**Step 2: Analyze the state after disconnecting the battery and inserting the dielectric.**
The battery is disconnected, so the capacitor is now an isolated system. Charge is conserved. The charge on the plates remains $Q_1 = 240 \, \mu\text{C}$.
$$Q_2 = Q_1 = 240 \, \mu\text{C}$$
Inserting a dielectric with constant $\kappa$ increases the capacitance by a factor of $\kappa$:
$$C_2 = \kappa C_1 = 4 \times (20 \, \mu\text{F}) = 80 \, \mu\text{F}$$

*Reflection: The key physical insight here is identifying the conserved quantity. For an isolated capacitor, it's charge.*

**Step 3: Calculate the final energy.**
Since we know the final charge $Q_2$ and final capacitance $C_2$, the most direct formula for the final energy $U_2$ is $U = \frac{Q^2}{2C}$.
$$U_2 = \frac{Q_2^2}{2C_2} = \frac{(240 \times 10^{-6} \, \text{C})^2}{2(80 \times 10^{-6} \, \text{F})} = \frac{5.76 \times 10^{-8}}{1.6 \times 10^{-4}} = 0.36 \times 10^{-3} \, \text{J} = 0.36 \, \text{mJ}$$

*Reflection: Using the formula involving the conserved quantity ($Q$) and the changed quantity ($C$) is the most robust method.*

**Step 4: Account for the energy change.**
The energy decreased from $1.44 \, \text{mJ}$ to $0.36 \, \text{mJ}$. The change is $\Delta U = U_2 - U_1 = -1.08 \, \text{mJ}$. Where did this energy go? The dielectric slab is polarized by the electric field and is pulled into the capacitor. The electric field does positive work on the slab. If you were inserting the slab by hand, you would feel this pull and would have to do negative work to insert it slowly. The energy from the field is converted into the mechanical work of pulling in the slab.

## Diagrams
Here is the graphical interpretation of the work done to charge a capacitor. The energy $U$ is the shaded area under the voltage-charge graph.

```text
      v (Voltage)
      |
      |          /
      |         /
      |        /
    V +-------/
      |      /|
      |     / |
      |    /  |  <-- Shaded Area = Energy U = ½QV
      |   /   |
      |  /    |
      | /     |
      +-------+---------- q (Charge)
      0       Q
```
The relationship is $v = q/C$. The graph is a line with slope $1/C$. The area is a triangle with base $Q$ and height $V = Q/C$. The area is $\frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2}Q V$.

## Memory technique — remember this forever
1.  **The "Electrical Spring" Analogy**: A capacitor storing energy is like a mechanical spring storing energy.
    -   Spring: Force $F = kx$. Work to stretch is $U = \frac{1}{2}kx^2$.
    -   Capacitor: Voltage $V = (1/C)Q$. Work to charge is $U = \frac{1}{2}(1/C)Q^2 = \frac{Q^2}{2C}$.
    The analogy is strong: charge $Q$ is like displacement $x$, and $1/C$ is like the spring constant $k$. The voltage is the "electrical force" you must overcome to add more charge. The ½ factor appears in both for the same reason: the force/voltage is not constant, it builds up from zero.

2.  **Must Overlearn Formulas**:
    -   $U = \frac{1}{2}CV^2$ (The "main" form)
    -   $Q = CV$ (The definition of capacitance)
    -   $U = \frac{Q^2}{2C}$ (The "isolated capacitor" form)

3.  **Spaced Repetition Schedule**: Review this material and re-derive the formulas from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders.

4.  **First Principles Pathway**: If you forget everything, rebuild it from the absolute basics.
    -   Work to move charge $dq$ is $dW = v \, dq$.
    -   The definition of capacitance is $C = q/v$, so $v = q/C$.
    -   Substitute: $dW = (q/C) \, dq$.
    -   Integrate from 0 to final charge $Q$: $U = \int_0^Q \frac{q}{C} dq = \frac{1}{C} \left[ \frac{q^2}{2} \right]_0^Q = \frac{Q^2}{2C}$.
    -   From here, use $Q=CV$ to get the other two forms. This path is indestructible.

## Common mistakes
1.  **Forgetting the ½.** The most common error. Always think of the "average voltage" or the area of the triangle on the V-q graph to remember it.
2.  **Using the wrong formula for the situation.** If a capacitor is isolated, its charge $Q$ is constant. Use $U=Q^2/(2C)$ to analyze changes. If it's connected to a battery, its voltage $V$ is constant. Use $U=\frac{1}{2}CV^2$. Choosing the wrong formula for a problem where $C$ changes will lead to incorrect results.
3.  **Energy "loss" confusion.** When capacitors are connected, the total charge is conserved, but the total energy is almost never conserved. The "lost" energy is dissipated as heat in the connecting wires (due to resistance) and/or electromagnetic radiation as the charges rapidly rearrange.

## Self-check
1.  A common capacitor in an audio amplifier circuit has a capacitance of $2200 \, \mu\text{F}$ and is charged to $50 \, \text{V}$. How much energy, in Joules, does it store?
2.  The defibrillator used by a paramedic team stores $360 \, \text{J}$ of energy. If its capacitor is charged to a potential of $5000 \, \text{V}$, what is its capacitance?
3.  A $2 \, \mu\text{F}$ capacitor is charged to $100 \, \text{V}$ and a $4 \, \mu\text{F}$ capacitor is charged to $50 \, \text{V}$. They are disconnected from their batteries and then connected to each other, positive plate to positive plate and negative plate to negative plate. What is the final total energy stored in the two capacitors?