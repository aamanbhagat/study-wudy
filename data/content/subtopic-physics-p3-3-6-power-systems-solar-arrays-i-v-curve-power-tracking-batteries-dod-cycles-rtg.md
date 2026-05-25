## What it is
Spacecraft power systems generate, store, and distribute the electrical energy required to run a vehicle. Solar arrays convert photon energy into electrical current, batteries store this energy to keep the spacecraft alive during orbital eclipses, and Radioisotope Thermoelectric Generators (RTGs) provide a steady, decaying trickle of power from the heat of radioactive isotopes for deep-space missions where sunlight is too weak.

## Why it matters
Power is the ultimate hard constraint on spacecraft design. If you lose power, you lose telemetry, thermal control, and the payload; the spacecraft becomes a dead piece of space debris. Sizing these systems dictates the mass budget of the spacecraft. Because mass drives launch costs, optimizing solar array efficiency, battery depth-of-discharge, and RTG mass directly impacts the feasibility and rocket sizing of the entire mission.

## When to study it
You must already understand:
1. Basic DC circuits (Ohm's Law $V=IR$, electrical power $P=IV$).
2. Introductory orbital mechanics (specifically, calculating orbital periods and eclipse durations).
3. Basic thermodynamics (heat transfer, efficiency) and exponential decay.
If you cannot confidently calculate the time a satellite spends in Earth's shadow, review orbital geometry first.

## How to study it (step by step)
1. **Master the I-V Curve:** Sketch a solar cell's Current-Voltage (I-V) curve. Identify the short-circuit current ($I_{sc}$) and open-circuit voltage ($V_{oc}$). 
2. **Derive the P-V Curve:** Multiply $I$ and $V$ at each point on your curve to plot Power vs. Voltage. Locate the peak—this is the Maximum Power Point (MPP).
3. **Apply the Inverse Square Law:** Calculate the solar flux available at Earth ($1361 \text{ W/m}^2$) and scale it for Mars and Jupiter using $S = S_0 (R_0/R)^2$.
4. **Size a Battery:** Write down the relationship between Depth of Discharge (DoD), required energy during eclipse, and total battery mass. 
5. **Model RTG Decay:** Use the radioactive decay equation to plot the electrical power output of an RTG over a 15-year mission lifecycle.

## Key ideas, with intuition

**1. The Solar Array I-V Curve and MPPT**
A solar cell is neither a perfect voltage source nor a perfect current source. If you short the terminals ($V=0$), maximum current flows ($I_{sc}$), but power $P = IV = 0$. If you leave them open ($I=0$), voltage is maximum ($V_{oc}$), but $P=0$. 
Between these extremes, there is a specific voltage and current where the power rectangle ($I \times V$) has the maximum area. This is the Maximum Power Point (MPP). Because temperature and illumination change constantly in space, a circuit called a Maximum Power Point Tracker (MPPT) dynamically alters the resistance of the spacecraft load to force the solar array to operate exactly at this peak.

**2. Batteries, DoD, and Cycle Life**
In Low Earth Orbit (LEO), a satellite might experience 5,000 eclipses a year. If you drain a lithium-ion battery to 0% (100% Depth of Discharge, or DoD), it will suffer chemical degradation and die in a few hundred cycles. To survive a 5-year LEO mission, you must use a *shallow* DoD (e.g., 20%). This means you must carry a battery 5 times larger than the raw energy requirement dictates.
The required battery capacity $C_{req}$ (in Watt-hours) is:
$$ C_{req} = \frac{P_{eclipse} \cdot t_{eclipse}}{DoD \cdot \eta} $$
where $\eta$ is the transmission and discharge efficiency.

**3. RTGs: Heat to Electricity**
For missions past Jupiter, solar arrays become impractically massive due to the inverse square law. RTGs use Plutonium-238. As it decays, it generates heat. Thermocouples convert this heat gradient into electricity via the Seebeck effect. They are highly inefficient (only ~6% of thermal energy becomes electricity) but have zero moving parts. The electrical power output follows:
$$ P_e(t) = \eta_{te} P_{th,0} e^{-\lambda t} $$
where $\lambda = \frac{\ln 2}{t_{1/2}}$ and $t_{1/2}$ is the half-life of the isotope (87.7 years for Pu-238).

## Worked example
**Problem:** A LEO satellite requires $500 \text{ W}$ of continuous power during a $0.6 \text{ hr}$ eclipse. To ensure the batteries survive the 5-year mission, the Depth of Discharge (DoD) must not exceed 25%. The power distribution efficiency from the battery to the load is 90%. Calculate the required nameplate capacity of the battery in Watt-hours (Wh).

**Step 1: Calculate the actual energy required by the load during eclipse.**
$$ E_{load} = P_{eclipse} \cdot t_{eclipse} = 500 \text{ W} \cdot 0.6 \text{ hr} = 300 \text{ Wh} $$

**Step 2: Account for discharge efficiency.**
The battery must output more than 300 Wh because 10% is lost as heat in the wiring and regulators.
$$ E_{discharge} = \frac{E_{load}}{\eta} = \frac{300 \text{ Wh}}{0.90} = 333.33 \text{ Wh} $$

**Step 3: Size for Depth of Discharge.**
We can only use 25% of the battery's total capacity.
$$ C_{req} = \frac{E_{discharge}}{DoD} = \frac{333.33 \text{ Wh}}{0.25} = 1333.3 \text{ Wh} $$

*Reflection:* The spacecraft only needs 300 Wh of energy to survive the dark, but we must fly a 1,333 Wh battery. This massive penalty is the physical cost of ensuring chemical battery longevity in LEO.

## Diagrams

```text
      Current (I) & Power (P) vs. Voltage (V) for a Solar Cell
      
  I, P ^
       | 
   Isc +-------+-------+-------+-------.   <-- I-V Curve
       |       |       |       |        \
       |       |       |       |         \
       |       |       |       |          \
       |       |       |       * MPP       \
       |       |       |      /|            \
       |       |       |    /  |             \
       |       |       |  /    |              \
       |       |       |/      |               \
       |       |      /|       |                \
       |       |    /  |       |                 \
       |       |  /    |       |                  \
       |       |/      |       |                   \
       |     / |       |       |                    \
       |   /   |       |       |                     \
       | /     |       |       |                      \
       +-------+-------+-------+-------+-------+-------+--> V
       0                                              Voc

Legend:
--- : I-V Curve (Current stays flat, then drops sharply)
/*\ : P-V Curve (Power = I*V. Peaks at MPP, hits 0 at Voc)
Isc : Short Circuit Current
Voc : Open Circuit Voltage
MPP : Maximum Power Point
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of the **"Power Triangle"**:
   * **Sun:** A shrinking circle (Inverse square law $1/r^2$).
   * **Cell:** A mountain peak (MPPT finds the summit of the P-V curve).
   * **Battery:** A shallow swimming pool (DoD means you only swim in the top 20% of the water to keep the pool from cracking).
2. **Formulas to overlearn:**
   * Battery Sizing: $C = \frac{P \cdot t}{DoD \cdot \eta}$
   * RTG Power: $P(t) = P_0 e^{-\lambda t}$
3. **Spaced-repetition schedule:** Review this material at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the battery sizing formula, rely on Conservation of Energy. Energy needed = Power $\times$ time. Energy pulled from battery = Energy needed / efficiency. Total battery size = Energy pulled / fraction allowed to pull.

## Common mistakes
1. **Confusing cell efficiency with MPPT efficiency.** Cell efficiency (~30%) is how much sunlight becomes electricity. MPPT efficiency (~98%) is how well the electronics keep the array operating at the top of the P-V mountain.
2. **Sizing LEO batteries for 100% DoD.** Students often calculate $C = P \cdot t$ and stop. If you do this in a design review, your satellite will die in three weeks.
3. **Ignoring temperature coefficients.** Solar cells produce *higher* voltage (and thus more power) when they are cold. Students often assume maximum power occurs when the array is hottest. It is the opposite.

## Self-check
1. If a solar array's temperature increases significantly, what happens to its open-circuit voltage ($V_{oc}$) and its Maximum Power Point?
2. A Mars mission ($1.52 \text{ AU}$ from the Sun) requires $1000 \text{ W}$ of power. If the solar flux at Earth ($1 \text{ AU}$) is $1361 \text{ W/m}^2$ and the array is 20% efficient, what is the required array area?
3. An RTG uses an isotope with a half-life of 87.7 years. If the spacecraft requires $200 \text{ W}$ of electrical power at the end of a 15-year mission, what must the initial electrical power output ($P_{e,0}$) be at launch?