## 1. The one-sentence answer
**Resistors connected end-to-end share a single current and add their resistances; resistors sharing two common nodes share a single voltage and add their conductances.**

Current is the flow of charge. When resistors lie in a single path, every charge that enters the first must leave the last, so the same current passes through each. Voltage drops add because each resistor converts some electrical potential into heat. When resistors sit side-by-side between the same two points, the voltage across each is identical, yet the total current splits; the effective resistance therefore shrinks because more paths exist for charge to flow.

The reciprocal relation follows at once: conductance \(G = 1/R\) measures ease of flow, and conductances add when paths are parallel. Hence the familiar formulas emerge directly from conservation of charge and energy.

> [!NOTE]
> The single deepest insight is that series and parallel are not arbitrary rules but the direct consequences of Kirchhoff’s current law (charge is conserved) and voltage law (energy is conserved) applied to two elementary topologies.

## 2. Why this matters — concrete and current
NASA’s Artemis lunar lander power-distribution units combine hundreds of resistive heaters and sensors; a single miscalculated parallel string of thermistors would produce a 12 % temperature-reading error at 100 K, forcing an abort.

SpaceX Starlink satellites use series strings of solar-cell bypass diodes; the equivalent resistance of each string determines the voltage at which the maximum-power-point tracker operates, directly setting the 4.2 kW array output.

Semiconductor foundries such as TSMC characterize interconnect resistance with test structures containing deliberately varied series and parallel meanders; extracted values feed the parasitic-resistance models used in every 3 nm chip tape-out.

The James Webb Space Telescope’s fine-steering mirror drive amplifiers rely on precision resistor networks whose parallel combination sets the 16-bit current-source stability to 50 nA; any topology error would degrade image motion below the 7 mas requirement.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ohm’s law \(V = IR\) | Defines resistance itself and links voltage, current, and power dissipation |
| Conservation of charge | Supplies Kirchhoff’s current law at every node            |
| Conservation of energy | Supplies Kirchhoff’s voltage law around every loop        |
| Definition of conductance \(G = 1/R\) | Converts the parallel rule into a simple sum              |

## 4. Building the idea — from intuition to formalism

### Step 1 — Same current in a single path
Charges have nowhere else to go; the current leaving one resistor must enter the next.  
Example: three resistors in a flashlight circuit carry the identical 0.25 A.  
Formal statement: \(I = I_1 = I_2 = I_3\).  
> [!WARNING]  
> Treating currents as additive in series produces an over-estimate of total current and an under-estimate of total voltage drop.

### Step 2 — Voltage drops accumulate
Each resistor converts electrical energy into heat; the total energy lost equals the sum of individual losses.  
Formal statement:  
\[
V = V_1 + V_2 + V_3 = IR_1 + IR_2 + IR_3.
\]
Hence the equivalent resistance satisfies  
\[
R_\text{eq} = R_1 + R_2 + R_3.
\]

### Step 3 — Same voltage across parallel branches
All branches connect the identical pair of nodes, so potential difference is identical by definition of voltage.  
Formal statement: \(V = V_1 = V_2 = V_3\).

### Step 4 — Currents add at the common nodes
Charge conservation at each node requires the total current to equal the sum of branch currents.  
Formal statement:  
\[
I = I_1 + I_2 + I_3 = V/R_1 + V/R_2 + V/R_3.
\]
Hence  
\[
\frac{1}{R_\text{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}.
\]

### Step 5 — Two-resistor parallel shortcut
Algebraic rearrangement of the reciprocal sum yields the compact product-over-sum form used in hand calculations:  
\[
R_\text{eq} = \frac{R_1 R_2}{R_1 + R_2}.
\]

### Step 6 — Power dissipation follows from the equivalent circuit
Once \(R_\text{eq}\) is known, total power is \(P = V^2 / R_\text{eq}\) or \(I^2 R_\text{eq}\); individual powers are recovered by returning to the original topology.

## 5. Worked examples — every step shown

**Example 1 — Two resistors in series**  
*Given:* \(R_1 = 2\,\Omega\), \(R_2 = 3\,\Omega\), \(V = 10\,\text{V}\).  
*Find:* \(R_\text{eq}\) and total current.  

Apply series rule:  
\[
R_\text{eq} = 2 + 3 = 5\,\Omega \qquad \text{(Why: voltages add at constant current)}
\]  
Current follows from Ohm’s law:  
\[
I = \frac{10}{5} = 2\,\text{A}.
\]  
**Final answer**  
**\(R_\text{eq} = 5\,\Omega\), \(I = 2\,\text{A}\)**  

*Reflection:* The arithmetic is trivial; the conceptual move is recognizing that current is forced to be identical.

**Example 2 — Two resistors in parallel**  
*Given:* \(R_1 = 4\,\Omega\), \(R_2 = 4\,\Omega\), \(V = 12\,\text{V}\).  
*Find:* \(R_\text{eq}\).  

Use reciprocal sum:  
\[
\frac{1}{R_\text{eq}} = \frac{1}{4} + \frac{1}{4} = 0.5 \implies R_\text{eq} = 2\,\Omega \qquad \text{(Why: conductances add)}
\]  
**Final answer**  
**\(R_\text{eq} = 2\,\Omega\)**  

*Reflection:* Equal resistors halve the resistance; the factor of two is the first pattern students should internalize.

**Example 3 — Mixed series-parallel network**  
*Given:* A 6 Ω resistor in series with the parallel combination of 4 Ω and 12 Ω.  
*Find:* \(R_\text{eq}\).  

Parallel pair first:  
\[
R_p = \frac{4 \times 12}{4 + 12} = 3\,\Omega \qquad \text{(Why: product-over-sum)}
\]  
Add series resistor:  
\[
R_\text{eq} = 6 + 3 = 9\,\Omega.
\]  
**Final answer**  
**\(R_\text{eq} = 9\,\Omega\)**  

*Reflection:* Order of operations (parallel before series) mirrors the topology traversal.

**Example 4 — Three parallel resistors with source current**  
*Given:* \(R_1 = 2\,\Omega\), \(R_2 = 3\,\Omega\), \(R_3 = 6\,\Omega\), total current \(I = 11\,\text{A}\).  
*Find:* voltage across the combination.  

Reciprocal sum:  
\[
\frac{1}{R_\text{eq}} = \frac{1}{2} + \frac{1}{3} + \frac{1}{6} = 1 \implies R_\text{eq} = 1\,\Omega.
\]  
Voltage:  
\[
V = I R_\text{eq} = 11 \times 1 = 11\,\text{V}.
\]  
**Final answer**  
**\(V = 11\,\text{V}\)**  

*Reflection:* The equivalent resistance equals 1 Ω exactly because the conductances sum to unity; this is a designed “nice number” case.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Adding resistances in parallel | Students treat resistance like capacitance or simply mimic the series rule | Always convert to conductance first; verify that \(R_\text{eq}\) is smaller than the smallest resistor |
| Forgetting to reduce parallel sub-networks before adding series elements | Circuit diagrams contain nested groups; eye skips the inner pair | Redraw the circuit after each reduction step, labeling the new single resistor |
| Using the two-resistor formula on three or more resistors | Over-generalization of the shortcut | Use the full reciprocal sum whenever more than two branches exist |
| Assuming voltage is the same in series | Confusion between “voltage across” and “voltage drop” | Label every node potential explicitly on the diagram |
| Neglecting internal resistance of sources when measuring parallel combinations | Real batteries have series resistance that merges with the network | Include the source resistance in the first series element |
| Inverting the parallel formula (writing \(R_\text{eq} = 1/R_1 + 1/R_2\)) | Algebraic slip when taking reciprocals | Keep an extra line that explicitly shows \(\frac{1}{R_\text{eq}} = \dots\) before inverting |
| Treating wires as zero resistance when they are long traces | Under-estimate of total series resistance on PCBs | Add trace resistance calculated from copper resistivity and geometry |

## 7. The textbook-precise statement
For a set of resistors \(R_1, R_2, \dots, R_n\) connected in series between two terminals, the equivalent resistance is  
\[
R_\text{eq} = \sum_{i=1}^n R_i,
\]  
provided the same current traverses every element (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §27-3).  

For the same resistors connected in parallel,  
\[
\frac{1}{R_\text{eq}} = \sum_{i=1}^n \frac{1}{R_i},
\]  
which follows from equating the total current to the sum of branch currents at constant voltage (ibid., §27-4).

## 8. Visual — diagram or schematic
```text
Series:
    +-----R1-----R2-----R3-----+
    |                          |
   (+)                        (-)

Parallel:
          R1
    +-----/\/\/\-----+
    |                |
   (+)              (-)
    |                |
          R2
    +-----/\/\/\-----+
    |                |
          R3
    +-----/\/\/\-----+
```
Nodes at left and right are equipotential; current splits among the three vertical branches.

## 9. The memory technique

1. **The hook**  
   Picture train cars coupled end-to-end (series): one track, resistances add. Picture three roads between the same two towns (parallel): more lanes, conductances add.

2. **What to overlearn**  
   - Series: \(R_\text{eq} = \sum R_i\)  
   - Parallel (two): \(R_\text{eq} = R_1 R_2 / (R_1 + R_2)\)  
   - Parallel (any number): \(\frac{1}{R_\text{eq}} = \sum 1/R_i\)

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Return to Kirchhoff’s laws: write KCL at every node and KVL around every loop; solve the resulting linear system for the terminal resistance.

## 10. What this unlocks
Mastery of series and parallel reduction is the prerequisite for every subsequent circuit-analysis technique.  

- Kirchhoff’s laws applied to non-reducible networks  
- Node-voltage and mesh-current methods  
- Thevenin and Norton equivalents  
- RC, RL, and RLC transient and frequency response  
- Power budgeting in spacecraft electrical systems

## 11. Self-check — five questions, no answers
1. Three 10 Ω resistors are placed in parallel; what single resistor would draw the same current from a 5 V source?  
2. A 2 Ω resistor is placed in series with the parallel combination of 3 Ω and 6 Ω; calculate the total resistance seen by a current source.  
3. Why does the parallel-equivalent resistance always lie strictly between zero and the smallest individual resistance?  
4. A student adds three resistances in parallel by summing the resistances instead of the conductances. By what factor is the calculated current wrong when a voltage is applied?  
5. Draw the sequence of reductions that converts the following network into a single resistor: a 4 Ω in series with (a 5 Ω parallel to a 20 Ω), that combination then parallel to an 8 Ω.