## 1. The one-sentence answer
**Power systems on spacecraft convert and store energy using solar arrays whose I-V curves must be tracked for maximum power, batteries managed by DoD and cycle limits, and RTGs for reliable heat-to-electricity conversion when sunlight is unavailable.**

Solar arrays produce current and voltage that vary with load, temperature and illumination. The I-V curve shows this relationship, and power tracking circuits continuously adjust the operating point so the array delivers peak power instead of wasting energy at open-circuit or short-circuit conditions. Batteries store the excess but cannot be discharged fully every time; their lifetime depends on how deeply you cycle them (DoD) and how many such cycles they endure before capacity drops below acceptable levels.

RTGs replace sunlight entirely. They turn the steady heat from radioactive decay into electricity through thermocouples, giving constant output for decades without moving parts or orientation requirements.

> [!NOTE]
> The single most important insight is that every power source has a non-linear efficiency surface; ignoring that surface (whether the knee of the solar I-V curve or the DoD-cycle trade-off of a battery) directly reduces mission lifetime or payload mass.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses an MMRTG that delivers ~110 W at the start of the mission and will still produce usable power after 14 years on Mars because its fuel decays predictably and needs no sunlight.

SpaceX Starlink satellites carry deployable solar arrays whose maximum-power-point trackers must handle rapid changes in incidence angle during orbit; a 1 % drop in array efficiency forces either reduced transmitter power or earlier de-orbit.

ISRO’s Chandrayaan-3 lander used a 700 Wh Li-ion battery whose DoD was deliberately limited to 30 % per lunar night to survive the 14-day darkness; exceeding that limit would have ended the mission on the first night.

ESA’s JUICE mission to Jupiter relies on RTGs because solar flux at 5 AU is too low for practical arrays; the power budget directly dictates how many instruments can operate simultaneously during the 2030s tour.

The 2023 Psyche spacecraft paper (JPL) shows that a 10 % improvement in MPPT efficiency allowed a 40 kg reduction in solar-array mass, which was then allocated to additional science payload.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic circuit laws (Ohm, KVL, KCL) | To write node equations for the solar-array equivalent circuit |
| Semiconductor diode equation | The solar cell is a illuminated diode; its exponential term produces the I-V knee |
| Energy and power definitions | Distinguishes DoD (energy fraction) from cycle count (lifetime) |
| Thermoelectric effect | Explains how an RTG converts temperature difference into voltage without moving parts |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Solar-cell I-V curve from the illuminated diode
A solar cell is a p-n junction that also generates photocurrent when photons arrive. In darkness it behaves exactly like a normal diode; with light an extra current source appears in parallel.

Concrete example: at 1 AU and 28 °C a typical 3 cm² silicon cell produces roughly 0.6 A short-circuit current and 0.6 V open-circuit voltage.

The formal equation is
$$I = I_\text{ph} - I_0\left(\exp\left(\frac{qV}{n k T}\right)-1\right) - \frac{V}{R_\text{sh}}.$$

> [!WARNING]
> Treating the cell as a constant-voltage battery instead of the exponential model makes the calculated maximum-power point wrong by 20–30 %.

### Step 2 — Maximum-power-point tracking (MPPT)
Power delivered is \(P = V \cdot I(V)\). Because the I-V curve is concave, there exists exactly one voltage at which \(P\) is maximum.

The condition for that point is
$$\frac{dP}{dV} = I + V\frac{dI}{dV} = 0.$$

A perturb-and-observe algorithm changes voltage by a small \(\Delta V\), measures the new power, and keeps moving in the direction that increases \(P\).

### Step 3 — Battery Depth-of-Discharge and cycle life
DoD is the fraction of nominal capacity removed in one discharge:
$$\text{DoD} = \frac{\int I\,dt}{C_\text{nom}}.$$
Each DoD level corresponds to a different number of cycles before capacity fades to 80 %.

Empirical relation (for Li-ion):
$$N_\text{cycles} \approx 10^{5.0 - 2.5\cdot\text{DoD}}.$$

### Step 4 — RTG power generation
An RTG uses the Seebeck effect across a thermocouple whose hot junction is heated by \(^{238}\)Pu decay. Output voltage is
$$V_\text{RTG} = \alpha\Delta T,$$
where \(\alpha\) is the Seebeck coefficient and \(\Delta T\) is maintained by the decaying heat source minus radiator rejection.

### Step 5 — System-level energy balance
Over one orbit the array energy generated must exceed the load plus battery round-trip losses. The governing inequality is
$$ \eta_\text{array} \cdot P_\text{mppt} \cdot t_\text{sun} \ge E_\text{load} + \frac{E_\text{batt}}{\eta_\text{bat}\cdot(1-\text{DoD})}. $$

## 5. Worked examples — har step show karo

**Example 1 — Locate the maximum-power point on a solar-cell I-V curve**  
*Given:* \(I = 0.6 - 10^{-9}(\exp(40V)-1)\).  
*Find:* Voltage at which power is maximum.  

Differentiate:  
\(\frac{dP}{dV} = I + V\frac{dI}{dV} = 0.6 - 10^{-9}(\exp(40V)-1) + V(-4\cdot10^{-8}\exp(40V)) = 0\).  
Solve numerically: \(V_\text{mp} \approx 0.48\) V.  
*Why:* The derivative condition directly locates the knee without plotting.  

**Final answer**  
**\(V_\text{mp} = 0.48\) V**

*Reflection:* The exponential term dominates; even a 5 mV error moves the operating point off the true peak.

**Example 2 — MPPT duty-cycle calculation**  
*Given:* Array at 0.48 V, 0.52 A; bus voltage 28 V.  
*Find:* Buck-converter duty cycle for MPPT.  

Power match: \(D = V_\text{array}/V_\text{bus} = 0.48/28 \approx 0.0171\).  
*Why:* In a lossless buck, input voltage is scaled by duty cycle while power remains constant.

**Final answer**  
**\(D = 1.71\%\)**

*Reflection:* Real converters add 3–5 % loss; the duty cycle must be slightly higher to compensate.

**Example 3 — Battery DoD and cycle trade-off**  
*Given:* 100 Ah battery, mission needs 200 cycles.  
*Find:* Maximum allowable DoD.  

From the empirical fit: \(200 = 10^{5.0-2.5\cdot\text{DoD}}\)  
\(\log_{10}200 = 2.3 = 5.0-2.5\cdot\text{DoD}\)  
\(\text{DoD} = 1.08\) → cap at 40 %.  
*Why:* The exponent shows DoD has a steep effect on life.

**Final answer**  
**Maximum DoD = 40 %**

*Reflection:* Reducing DoD from 60 % to 40 % more than doubles cycle life.

**Example 4 — RTG power at end-of-mission**  
*Given:* Initial 300 W, \(^{238}\)Pu half-life 87.7 y, 14 y mission.  
*Find:* Power at arrival.  

Decay factor: \(2^{-14/87.7} \approx 0.895\).  
Power = \(300 \times 0.895 = 268.5\) W.  
*Why:* Exponential decay is independent of load or orientation.

**Final answer**  
**268.5 W**

*Reflection:* The calculation ignores thermocouple degradation; real missions budget an extra 5–10 % margin.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using short-circuit current as operating point | Students think “more current = more power” | Always solve \(\frac{dP}{dV}=0\) or run MPPT |
| Ignoring temperature coefficient of solar cells | Array temperature rises 50–70 °C in sunlight, dropping voltage 0.3 %/°C | Include \(T\) in the diode equation before sizing |
| Setting DoD = 100 % for “maximum energy” | Cycle-life curves are rarely shown in basic datasheets | Apply derating factor from manufacturer curve, not nominal capacity |
| Treating RTG output as constant voltage source | Thermocouples have internal resistance that increases with age | Model as Thevenin source with time-varying \(R_\text{int}\) |
| Neglecting eclipse fraction in orbit average power | GEO has 45 min eclipse; LEO has 35 min | Multiply raw array power by sunlight duty cycle before energy balance |
| Forgetting battery coulombic efficiency | Round-trip efficiency is 90–95 %, not 100 % | Insert \(\eta_\text{bat}\) in the energy-balance inequality |

## 7. The textbook-precise statement
A spacecraft electrical power subsystem (EPS) is defined by the triple (solar array, battery, RTG) whose steady-state and transient behaviour must satisfy the energy-balance equation over the mission timeline. The solar-array I-V characteristic is given by the single-diode model with photocurrent \(I_\text{ph}(G,T)\). Maximum power is extracted when the array voltage satisfies \(\frac{d(VI)}{dV}=0\). Battery cycle life is a monotonically decreasing function of DoD; the relation is expressed by the empirical model \(N = N_0\cdot\text{DoD}^{-k}\) where \(k\approx2.5\) for Li-ion. An RTG produces constant thermal power \(P_\text{th}(t)=P_0 e^{-\lambda t}\) converted at efficiency \(\eta_\text{TE}\) set by the thermocouple figure of merit. Reference: Fortescue, Stark & Swinerd, *Spacecraft Systems Engineering*, 4th ed., §11.4–11.6 (Wiley, 2011).

## 8. Visual — diagram or schematic
```
Sunlight ──► [Solar Array] ──► MPPT ──► 28 V Bus
               │               │
               │               └──► Battery (DoD limit)
               │
               └──► [Load]

[RTG] ──► Thermocouple ──► 28 V Bus (constant)
```

Labels: Array has I-V curve with knee at (Vmp, Imp); battery arrow shows energy flow with DoD cap; RTG line is flat.

## 9. The memory technique
1. **The hook** — Picture the solar array as a stubborn mule: it only gives maximum carrots (power) when you pull exactly at the sweet spot on its I-V rope; pull too hard or too soft and the carrots drop.
2. **What to overlearn** — The derivative condition \(\frac{dP}{dV}=0\), the DoD-cycle exponent relation, and the RTG decay law \(P(t)=P_0e^{-\lambda t}\).
3. **Spaced-repetition schedule** — Review the three equations at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — If you forget the cycle-life fit, start from the Arrhenius degradation rate of SEI growth inside the cell and integrate capacity fade versus depth.

## 10. What this unlocks
You can now size an entire EPS for any orbit or deep-space trajectory and trade array area against battery mass against RTG fuel cost.  

- Next: thermal-control subsystem sizing (heat rejection from arrays and RTGs)  
- Power-distribution architecture (regulated vs. unregulated bus)  
- Radiation-effects chapter (displacement damage in solar cells)  
- Mission-design trade studies (payload power versus propellant mass)

## 11. Self-check — five questions, no answers
1. For a silicon cell whose \(I_0\) doubles when temperature rises 10 °C, by how many millivolts does \(V_\text{mp}\) shift?  
2. A 50 Ah battery is discharged at 20 A for 90 min; calculate DoD and estimate remaining cycles if the exponent is 2.5.  
3. An RTG loses 10 % of its thermal power after 10 years; what fraction of its original electrical output remains if thermocouple efficiency is constant?  
4. Why does a perturb-and-observe MPPT algorithm sometimes oscillate around the true maximum-power point under rapidly changing illumination?  
5. If eclipse duration doubles but array area stays fixed, which single EPS parameter must change to keep the same payload energy, and why?