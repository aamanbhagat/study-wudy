## 1. The one-sentence answer
**Spacecraft power systems generate, condition, and store electrical energy through solar arrays whose current-voltage curves dictate maximum-power-point tracking, batteries sized by allowable depth-of-discharge and cycle life, and radioisotope thermoelectric generators that convert decay heat directly into electricity.**

A solar array is a set of photovoltaic cells wired in series-parallel strings. Each cell produces a nonlinear I-V relationship: short-circuit current is nearly constant while open-circuit voltage drops with temperature and irradiance; the product of voltage and current therefore peaks at only one operating point. Maximum-power-point trackers continuously adjust the load so the array always delivers that peak power.

Batteries act as the buffer between the array and the spacecraft loads. Their usable energy is deliberately limited to a fraction of total capacity (depth-of-discharge) to preserve cycle life; each charge-discharge cycle slowly degrades the electrodes, so mission planners trade battery mass against the number of eclipses the spacecraft will experience. When sunlight is unavailable for years, a radioisotope thermoelectric generator replaces both array and battery: a plutonium-238 heat source drives a thermocouple whose efficiency is low but whose output is steady and independent of distance from the Sun.

> [!NOTE]
> The single most important insight is that every power source imposes a hard constraint on the spacecraft’s mass budget, thermal environment, and operational timeline; choosing among solar, battery, and RTG is therefore a systems-level optimization, not a simple “pick the biggest panel” decision.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover on Mars relies on a single MMRTG that supplies ~110 W at the start of the mission; without it the vehicle could not survive the long Martian nights or the dust-induced reduction in solar-array output that crippled earlier Spirit and Opportunity rovers.

The International Space Station’s eight 35 kW solar-array wings use maximum-power-point tracking to maintain 120 V DC despite continuous orbital day-night cycling; the same arrays have exceeded their original 15-year design life because operators keep depth-of-discharge below 35 %.

SpaceX’s Starlink satellites employ gallium-arsenide solar arrays and lithium-ion batteries sized for 30 % depth-of-discharge over 2 500 cycles, enabling the constellation to maintain continuous coverage while each satellite experiences roughly 15 eclipses per day in low Earth orbit.

The European Space Agency’s JUICE mission to Jupiter’s icy moons carries both a large solar array and a small RTG backup; the hybrid architecture was chosen because solar flux at 5 AU drops to 50 W m⁻², pushing array area beyond launcher fairing limits unless supplemented by radioisotope power.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Ohm’s law and series-parallel circuit rules | Array strings and battery packs are wired combinations whose voltages and currents must be matched to the power bus. |
| Basic semiconductor physics (band gap, minority carriers) | Explains why the solar-cell I-V curve bends and why temperature reduces voltage. |
| First law of thermodynamics and Seebeck effect | RTG efficiency is bounded by the temperature difference across the thermocouple. |
| Simple exponential decay | Plutonium-238 half-life (87.7 yr) determines long-term power degradation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The solar-cell I-V curve
A photovoltaic cell under illumination behaves like a current source in parallel with a diode. At zero voltage the cell delivers its full short-circuit current; as voltage rises the diode begins to conduct and net current falls to zero at open-circuit voltage. The power curve therefore exhibits a single maximum.

Example: a 1 cm² silicon cell at 1 AU, AM0 spectrum produces Isc ≈ 35 mA and Voc ≈ 0.6 V; maximum power occurs near 0.45 V.

The formal expression is
$$
I = I_\text{sc} - I_0\left(\exp\left(\frac{qV}{nkT}\right)-1\right).
$$

> [!WARNING]
> Treating the cell as a constant-voltage battery instead of a current source will cause the calculated array voltage to collapse under load.

### Step 2 — Maximum-power-point tracking
Because the peak-power voltage changes with temperature and irradiance, a switching converter continuously perturbs the operating voltage and observes the change in power; the sign of dP/dV tells the controller which direction to move.

The algorithm is expressed as
$$
V_\text{ref}(k+1) = V_\text{ref}(k) + \Delta V \cdot \operatorname{sign}\left(\frac{dP}{dV}\right).
$$

### Step 3 — Battery depth-of-discharge limit
Depth-of-discharge (DoD) is the fraction of rated capacity removed during a discharge. Cycle life N follows an empirical inverse-power relation
$$
N = N_0(\text{DoD})^{-m},
$$
where m ≈ 1.5–2.5 for lithium-ion cells; mission planners therefore choose DoD to keep total cycles within the battery’s warranted life.

### Step 4 — RTG heat-to-electric conversion
A radioisotope thermoelectric generator uses the Seebeck effect across a thermocouple whose hot junction is heated by ²³⁸Pu decay and whose cold junction is cooled by space radiators. Efficiency is
$$
\eta = \frac{T_h - T_c}{T_h}\cdot\frac{\sqrt{1+Z\bar{T}}-1}{\sqrt{1+Z\bar{T}}+T_c/T_h},
$$
where Z is the figure of merit of the thermoelectric material.

### Step 5 — End-to-end power budget closure
The spacecraft power equation at end-of-life is
$$
P_\text{array}(1-L_\text{deg}) \ge P_\text{load,avg} + P_\text{batt,charge} + P_\text{thermal},
$$
with RTG power substituted when solar flux is insufficient; every term must be positive at the worst-case solar distance, eclipse duration, and degradation.

## 5. Worked examples — every step shown

**Example 1 — Single-cell maximum power**
*Given:* Isc = 0.5 A, Voc = 0.65 V, fill factor FF = 0.78.  
*Find:* Pmax.  
Pmax = Isc × Voc × FF.  
*Why:* Fill factor already encodes the location of the knee of the I-V curve.  
**0.2535 W**

*Reflection:* The example isolates the definition of fill factor; any later temperature correction acts only on Voc and FF.

**Example 2 — String sizing**
*Given:* 28 V bus, 0.6 V cell at maximum-power point, 10 % voltage margin for tracking.  
*Find:* Cells per string.  
Cells = ceil(28 / (0.6 × 0.9)) = 52.  
*Why:* Margin prevents the tracker from driving the string past the knee when temperature rises.  
**52 cells**

*Reflection:* Rounding up guarantees the tracker can always reach the bus voltage; the extra cell adds only 2 % mass.

**Example 3 — Battery DoD versus life**
*Given:* 5 000 eclipse cycles required, N0 = 2 000 at 100 % DoD, m = 2.  
*Find:* Allowable DoD.  
DoD = (N0 / N)^(1/m) = (2 000 / 5 000)^0.5 ≈ 0.63.  
*Why:* The exponent converts the cycle ratio into a capacity fraction.  
**63 %**

*Reflection:* The calculation shows why GEO satellites routinely accept 80 % DoD while LEO constellations stay near 30 %.

**Example 4 — RTG power at 20 years**
*Given:* Initial 300 W, ²³⁸Pu half-life 87.7 yr.  
*Find:* Power after 20 yr.  
P = 300 × 2^(-20/87.7) ≈ 300 × 0.855 = 256.5 W.  
*Why:* Exponential decay is independent of load or temperature.  
**256.5 W**

*Reflection:* The slow decay lets RTG missions plan decade-long cruises without power-margin erosion.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming Isc is temperature-independent | Temperature mainly affects Voc, but Isc also rises slightly; designers forget the net power drop. | Apply both dVoc/dT and dIsc/dT coefficients from the cell datasheet. |
| Sizing batteries at beginning-of-life capacity | Capacity fades 1–2 % per year; an EOL DoD calculation performed with BOL numbers underestimates degradation. | Use end-of-life capacity in the DoD equation. |
| Ignoring cosine losses on deployed arrays | Array normal drifts 5–10° from Sun line; power loss is 1 – cos θ. | Include a 5 % cosine derate in the power budget. |
| Treating RTG efficiency as constant | Hot-junction temperature falls as fuel decays, lowering ΔT and η. | Recalculate η at each mission year using updated Th. |
| Wiring strings in parallel without blocking diodes | A shadowed string becomes a load and can reverse-bias cells. | Insert Schottky diodes on every string. |
| Using 100 % DoD for lithium-ion “because it is allowed” | Calendar life collapses faster than cycle life at high DoD. | Cap DoD at 80 % even if cycle count permits higher. |
| Neglecting self-discharge of batteries during long cruise | RTG or array trickle charge must exceed self-discharge plus electronics draw. | Add 3–5 % margin for self-discharge in the power budget. |

## 7. The textbook-precise statement
A spacecraft electrical power subsystem (EPS) shall satisfy
$$
P_\text{gen}(t) \ge P_\text{load}(t) + \frac{dE_\text{storage}}{dt}
$$
for all mission phases, where Pgen is supplied either by a photovoltaic array whose operating point lies on the maximum-power locus of its I-V characteristic or by an RTG whose output follows the exponential decay law of its radioisotope fuel; storage is realized by secondary batteries whose cumulative charge throughput is limited by an allowable depth-of-discharge DoD and total cycle count N. (Fortescue, Stark & Swinerd, *Spacecraft Systems Engineering*, 4th ed., §9.3–9.5, Wiley, 2011.)

## 8. Visual — diagram or schematic
```text
Voltage (V)
  ^
  |          Voc
  |         /
  |        /
  |       /   Pmax point
  |      /     ●
  |     /     /
  |    /     /
  |   /     /
  |  /     /
  | /     /
  |/_____/
  +------------------> Current (I)
         Isc
```
Horizontal axis: current from 0 to Isc. Vertical axis: voltage from 0 to Voc. The curve starts at (Isc,0), bends rightward, and meets the voltage axis at (0,Voc). The maximum-power rectangle is drawn from the origin to the marked knee.

## 9. The memory technique
1. **The hook** — Picture a solar array as a “rubber band” whose tension (voltage) collapses when you pull too hard (excess current); the tracker’s job is to find the point of maximum stretch before the band goes slack.
2. **What to overlearn** — (a) Pmax = Isc × Voc × FF, (b) N ∝ DoD^(-2), (c) RTG power halves every 87.7 yr.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive the diode equation from the law of the junction, then recompute the power extremum by setting d(IV)/dV = 0.

## 10. What this unlocks
Mastery of spacecraft power budgets immediately enables sizing of thermal-control radiators (waste heat from arrays and RTGs), reaction-wheel torque margins (power spikes during eclipse exit), and communications link budgets (transmitter power limited by available bus watts). The next dependent topics are:
- Attitude-determination and control during low-power safe modes
- Electric-propulsion thrust throttling curves
- End-to-end radiation-effects analysis on solar-cell cover-glass darkening

## 11. Self-check — five questions, no answers
1. A 2 m² GaAs array at 1 AU produces 400 W at 28 V; after a 30 °C temperature rise and 5 % cosine loss, what bus voltage margin remains for the MPPT?
2. A 50 Ah lithium-ion battery must support a 120 W load for 45 min at 28 V. What minimum DoD keeps total cycles above 3 000?
3. An RTG with 400 W initial output and 87.7 yr half-life must still deliver 300 W after 15 yr. Is the fuel loading adequate?
4. Two identical solar strings are placed in parallel; one string is fully shadowed. Without blocking diodes, what happens to the unshaded string’s cells?
5. Why does increasing array area eventually become counterproductive for outer-planet missions even though more power is produced?