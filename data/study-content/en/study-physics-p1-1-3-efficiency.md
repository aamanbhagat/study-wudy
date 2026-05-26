## 1. The one-sentence answer
**Efficiency is the dimensionless ratio of useful energy (or work or power) delivered by a system to the total energy supplied to it.**

Energy is always conserved, yet real processes never convert every joule of input into the exact form we want. The fraction that appears in the desired output is called efficiency; everything else is dissipated as heat, sound, light, or disordered motion. In the language of work and energy, if a device receives total work \(W_\text{in}\) and performs useful work \(W_\text{out}\), the efficiency is simply the quotient of those two quantities. The same ratio applies to power when rates are constant, and to energy when the process runs for a finite time.

The concept is universal because every machine, engine, or biological system must obey the same accounting. A pulley, a rocket nozzle, and a solar cell are all judged by how little of their input they waste. Because the ratio is always less than one in the real world, efficiency also tells us the minimum input required to achieve a given useful output.

> [!NOTE]
> The single deepest insight is that efficiency is not a property of the energy itself but of the *path* the energy takes; two different machines can consume identical fuel yet deliver different useful work solely because their internal processes scatter different fractions into unusable forms.

## 2. Why this matters — concrete and current
The Merlin 1D engine on SpaceX Falcon 9 stages converts the chemical energy of RP-1/LOX combustion into directed kinetic energy of exhaust with a thermal efficiency of approximately 0.65; any improvement directly increases payload to orbit and reduces the number of stages required for a given mission.

In semiconductor fabrication, extreme-ultraviolet lithography tools at ASML must deliver a precise dose of 13.5 nm photons to photoresist; the efficiency with which electrical input is converted into usable EUV photons is currently ~1 %, forcing enormous electrical infrastructure and driving research into higher-efficiency plasma sources.

The human heart performs mechanical work on blood at an efficiency of roughly 0.20–0.25; cardiologists use this figure when calculating myocardial oxygen consumption and when designing ventricular-assist devices that must match native efficiency to avoid excess heat.

Modern grid-scale lithium-ion battery systems from Tesla Megapack achieve round-trip efficiencies above 0.92; this number determines how much overbuild of wind and solar is required to guarantee a given dispatchable capacity, directly affecting capital cost of decarbonization pathways.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Work                 | Efficiency is defined as a ratio of two works             |
| Conservation of energy | Guarantees that any shortfall in output equals waste      |
| Power                | Allows efficiency statements when processes run continuously |
| Energy units (J, W)  | Ensures consistent dimensions in numerator and denominator |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy enters and leaves
Every device receives energy in some form and returns it in one or more forms. The total energy returned must equal the total energy received; none disappears.

A 100 J battery connected to a motor returns 100 J: 70 J appears as mechanical work on a load and 30 J appears as heat in the windings.

Let \(E_\text{in}\) be the energy supplied and \(E_\text{out,total}\) the sum of all energies leaving. Then
\[
E_\text{in} = E_\text{out,total}.
\]

> [!WARNING]
> Treating “energy used up” as a loss instead of a conversion to another form will produce an efficiency greater than 1, violating conservation.

### Step 2 — Partition output into useful and waste
Only one of the outgoing streams performs the intended task; the remainder is waste by definition of the task.

In the motor above, the designer’s goal is mechanical work, so the 70 J is useful and the 30 J of heat is waste.

Denote useful output \(E_\text{useful}\). Then
\[
E_\text{out,total} = E_\text{useful} + E_\text{waste}.
\]

### Step 3 — Form the ratio
Divide useful output by total input. The quotient is always between 0 and 1.

For the motor,
\[
\eta = \frac{70\,\text{J}}{100\,\text{J}} = 0.70.
\]

The efficiency is therefore
\[
\eta = \frac{E_\text{useful}}{E_\text{in}}.
\]

### Step 4 — Extend to work and power
When the process is steady, energy and work are interchangeable and power is the time derivative of either. The ratio remains identical.

A pump lifting water at constant rate receives electrical power \(P_\text{in}\) and delivers mechanical power \(P_\text{out}\). Then
\[
\eta = \frac{P_\text{out}}{P_\text{in}} = \frac{W_\text{out}/\Delta t}{W_\text{in}/\Delta t}.
\]

### Step 5 — Express as percentage when convenient
Multiply by 100 to obtain a percentage; the numerical value changes but the physical meaning does not.

The motor is 70 % efficient, or \(\eta = 0.70\).

### Step 6 — State the textbook definition
Efficiency of any energy-conversion device is the ratio of useful energy (work, or power) output to total energy (work, or power) input, always satisfying \(0 \leq \eta \leq 1\).

## 5. Worked examples — every step shown

**Example 1 — Simple lever**
*Given:* A lever lifts a 200 N load 0.5 m while the operator applies 50 N through 3 m.  
*Find:* Efficiency.  
Step 1: Calculate input work  
\(W_\text{in} = 50\,\text{N} \times 3\,\text{m} = 150\,\text{J}\)  
*Why:* Work = force × distance along force.  
Step 2: Calculate useful output work  
\(W_\text{useful} = 200\,\text{N} \times 0.5\,\text{m} = 100\,\text{J}\)  
*Why:* Only the gravitational potential energy gained by the load is useful.  
Step 3: Form ratio  
\(\eta = 100/150 = 2/3 \approx 0.667\)  
**0.667**  
*Reflection:* Friction at the fulcrum is the only waste; the example isolates that single loss mechanism.

**Example 2 — Electric motor driving a hoist**
*Given:* Motor draws 2.4 kW while lifting 500 kg at 0.4 m s⁻¹.  
*Find:* Efficiency.  
Step 1: Output power = force × velocity = \(mgv\)  
\(P_\text{out} = 500 \times 9.81 \times 0.4 = 1962\,\text{W}\)  
*Why:* Steady speed means net force equals weight.  
Step 2: Efficiency  
\(\eta = 1962/2400 = 0.8175\)  
**0.818**  
*Reflection:* The 18 % loss appears as I²R heating and core losses; measuring input electrically and output mechanically isolates those terms.

**Example 3 — Ideal heat engine (Carnot limit)**
*Given:* Engine operates between 600 K and 300 K.  
*Find:* Maximum possible efficiency.  
Step 1: Carnot efficiency formula  
\(\eta_\text{C} = 1 - T_\text{cold}/T_\text{hot}\)  
*Why:* Derived from entropy balance on reversible cycle.  
Step 2: Substitute  
\(\eta_\text{C} = 1 - 300/600 = 0.5\)  
**0.500**  
*Reflection:* No real engine reaches this value; the example shows the theoretical ceiling set by temperatures alone.

**Example 4 — Rocket nozzle kinetic efficiency**
*Given:* Combustion chamber enthalpy 8.5 MJ kg⁻¹; 15 % remains as thermal energy in exhaust at nozzle exit.  
*Find:* Kinetic efficiency of the nozzle.  
Step 1: Useful output = chamber enthalpy minus residual thermal  
\(e_\text{kinetic} = 8.5 - 0.15 \times 8.5 = 7.225\,\text{MJ kg⁻¹}\)  
*Why:* Only directed kinetic energy contributes to thrust.  
Step 2: Efficiency  
\(\eta = 7.225/8.5 = 0.85\)  
**0.850**  
*Reflection:* Frozen-flow and boundary-layer losses are omitted; adding them lowers real nozzle efficiency below 0.85.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using total output instead of useful output | Confusing conservation with usefulness      | Explicitly define the engineering goal before labelling any stream “useful” |
| Forgetting that efficiency is path-dependent | Thinking efficiency is an intrinsic property of fuel | Always trace the actual sequence of conversions      |
| Reporting efficiency > 1          | Arithmetic sign error or double-counting    | Verify numerator ≤ denominator before quoting        |
| Mixing energy and power units     | Treating kWh and kW interchangeably         | Convert to consistent base units (J or W) first      |
| Ignoring time-varying loads       | Assuming steady state when power fluctuates | Integrate instantaneous power over the actual duty cycle |
| Quoting Carnot efficiency for non-heat engines | Over-generalising the temperature formula   | Confirm the device is a heat engine before applying  |
| Neglecting auxiliary power draws  | Counting only primary actuator power        | Include all subsystems required for operation        |

## 7. The textbook-precise statement
The efficiency \(\eta\) of an energy-conversion process is defined as
\[
\eta = \frac{E_\text{useful}}}{E_\text{supplied}} = \frac{W_\text{useful}}}{W_\text{supplied}} = \frac{P_\text{useful}}}{P_\text{supplied}},
\]
where the three forms are numerically equal when the process is steady and the quantities are dimensionally consistent. The definition assumes a clearly identified useful output stream and accounts for all supplied energy crossing the system boundary. (See Feynman, Leighton & Sands, *The Feynman Lectures on Physics*, Vol. I, §4–2.)

## 8. Visual — diagram or schematic
```text
          E_in (100 J)
              │
              ▼
        ┌─────────────┐
        │   Device    │
        │             │
        └──────┬──────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
 E_useful (70 J)   E_waste (30 J)
(mechanical work)   (heat, sound)
```
Horizontal arrows labelled “useful” and “waste” leave the box; the vertical arrow entering the box is labelled “input”. All three energies sum to the conservation statement \(E_\text{in}=E_\text{useful}+E_\text{waste}\).

## 9. The memory technique
**The hook** — Picture a water barrel with two spigots: the lower spigot pours into a bucket labelled “useful work”; the upper spigot pours onto the ground labelled “waste heat”. Efficiency is the fraction that lands in the bucket.

**What to overlearn**  
- \(\eta = E_\text{useful}/E_\text{in}\) (always ≤ 1)  
- \(\eta = P_\text{out}/P_\text{in}\) when rates are constant  
- Real devices satisfy \(0 < \eta < 1\)

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from conservation of energy, partition the outgoing streams according to the engineering goal, and form the ratio.

## 10. What this unlocks
Efficiency is the quantitative bridge from ideal mechanics to real thermodynamics and propulsion. It appears directly in the definition of specific impulse for rockets, coefficient of performance for refrigerators, and quantum efficiency of detectors.

- Next: Thermodynamic cycles and the second law  
- Next: Propulsive efficiency and rocket equation corrections  
- Next: Power budgets in spacecraft and aircraft design

## 11. Self-check — five questions, no answers
1. A 1200 W heater raises the temperature of 2 kg of water by 15 °C in 4 min. What is its efficiency if the theoretical minimum energy required is 125.5 kJ?  
2. Why can a Carnot engine never reach 100 % efficiency even if friction is eliminated?  
3. An electric car recovers 70 % of its kinetic energy during regenerative braking. If the battery-to-wheel efficiency is 0.85, what fraction of the original battery energy is restored after one acceleration–braking cycle?  
4. Identify the hidden assumption in the statement “our new motor is 95 % efficient” when the motor is driving a fan whose purpose is to move air.  
5. Derive the condition under which the efficiency of a steady-flow device equals the efficiency of the same device evaluated over a finite time interval.