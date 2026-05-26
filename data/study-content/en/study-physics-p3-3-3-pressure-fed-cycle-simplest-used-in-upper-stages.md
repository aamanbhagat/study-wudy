## 1. The one-sentence answer
**The pressure-fed cycle forces liquid propellants from their tanks into the combustion chamber solely by the static pressure of an inert stored gas, eliminating all turbopumps.**

In this arrangement the propellant tanks themselves become pressure vessels. A separate high-pressure bottle of helium or nitrogen, reduced through regulators, maintains tank ullage pressure above chamber pressure so that propellants flow through feed lines when valves open. Because no rotating machinery is required, the system contains only valves, regulators, and lines; the trade-off is that tank wall thickness (and therefore mass) grows rapidly with chamber pressure.

The cycle is therefore confined to modest chamber pressures—typically 1–2 MPa—and modest thrust levels. This makes it attractive precisely where reliability and simplicity outweigh the mass penalty: attitude-control thrusters and the final stages of orbital vehicles that operate in vacuum after booster burnout.

> [!NOTE]
> The decisive insight is that tank mass scales directly with the pressure difference the walls must contain; once that difference exceeds a few atmospheres the exponential growth in structural mass cancels the simplicity advantage.

## 2. Why this matters — concrete and current
The Aerojet Rocketdyne AJ-10-190 engine, pressure-fed with N₂O₄/MMH at 1.0 MPa chamber pressure, has flown on every Delta IV upper stage and on the Orion spacecraft’s service module; its heritage traces to the Apollo service-module engine and exceeds 500 successful firings.

All geostationary-satellite bipropellant apogee motors and reaction-control systems—more than 150 active spacecraft—use pressure-fed thrusters because the absence of pumps removes the dominant failure mode during 15-year missions.

SpaceX’s SuperDraco engines on the Crew Dragon launch-escape system are pressure-fed with storable propellants stored at 7 MPa; the design was chosen so that a single stored-gas bottle can supply both escape thrust and post-landing landing-leg deployment.

The Kibo module’s Japanese Experiment Module Remote Manipulator System uses pressure-fed cold-gas thrusters for fine attitude control; the same architecture appears in every CubeSat reaction-control package that employs butane or xenon.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Ideal-gas law            | Determines mass of pressurant gas required to maintain ullage pressure as propellant is expelled. |
| Bernoulli equation along a streamline | Gives propellant mass-flow rate once tank-to-chamber pressure drop and injector Cd are known. |
| Thin-wall pressure-vessel stress | Sets minimum tank-wall thickness and therefore tank mass as a function of operating pressure. |
| Characteristic velocity \(c^*\) | Links chamber pressure and throat area to the energy release of the chosen propellant combination. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Propellants reside at low initial pressure
The tanks begin at only a few tenths of a megapascal—enough to keep the liquids sub-cooled but far below chamber pressure.  
Example: a 200 L tank of MMH at 0.3 MPa.  
The governing relation is simply the initial ullage volume and temperature; no flow yet occurs.  
> [!WARNING]  
> If the initial tank pressure is mistakenly set equal to chamber pressure, the student concludes (incorrectly) that no pressurant is required.

### Step 2 — Pressurant gas is admitted through a regulator
High-pressure helium from a COPV is reduced to a constant set-point \(p_t\) that exceeds chamber pressure \(p_c\) by the injector and line losses.  
The regulator maintains \(p_t = p_c + \Delta p_{\text{loss}}\) until the propellant load is exhausted.  
The mass of helium consumed follows from the ideal-gas law integrated over the changing ullage volume.

### Step 3 — Propellant flows when isolation valves open
With tank pressure now higher than chamber pressure, the liquids accelerate through the feed lines.  
Applying Bernoulli between tank outlet and injector face yields the mass-flow rate  
\[
\dot{m} = C_d A_i \sqrt{2\rho(p_t - p_c)}
\]  
where \(C_d\) is the injector discharge coefficient.

### Step 4 — Chamber pressure is set by throat choking
Once combustion begins, the nozzle throat chokes; chamber pressure is then fixed by the continuity relation  
\[
p_c A_t = \dot{m} c^*
\]  
where \(c^*\) is the characteristic velocity of the propellant combination.  
> [!WARNING]  
> Treating \(c^*\) as constant while \(p_c\) changes leads to an inconsistent mass-flow balance.

### Step 5 — Thrust follows from the ideal rocket equation
With \(p_c\) and \(\dot{m}\) known, vacuum thrust is  
\[
F = \dot{m} v_e + (p_e - 0)A_e
\]  
where \(v_e\) is obtained from isentropic expansion tables or the standard \(\gamma\)-dependent formula.

### Step 6 — Tank mass penalty is quantified
Thin-wall hoop-stress gives minimum wall thickness  
\[
t = \frac{p_t r}{\sigma_{\text{allow}}/\text{SF}}
\]  
Tank mass therefore scales linearly with \(p_t\); this is the fundamental limit that confines pressure-fed cycles to upper-stage applications.

## 5. Worked examples — every step shown

**Example 1 — Minimum regulator set-point**  
*Given:* Chamber pressure 1.2 MPa, injector \(\Delta p = 0.3\) MPa, line losses 0.1 MPa.  
*Find:* Required tank pressure.  
Regulator must supply the sum of all downstream drops:  
\[
p_t = p_c + 0.3 + 0.1 = 1.6\,\text{MPa}.
\]  
**1.6 MPa**  
*Reflection:* The 0.4 MPa margin is not arbitrary; it is the minimum needed to keep the injector orifices choked and flow predictable.

**Example 2 — Helium mass for a 500 kg propellant load**  
*Given:* Propellant density average 1200 kg m⁻³, initial ullage 5 %, final ullage 95 %, helium temperature 300 K, regulated pressure 1.6 MPa.  
*Find:* Helium mass.  
Initial helium volume = 0.05 × (500/1200) = 0.0208 m³.  
Final volume = 0.95 × 0.4167 = 0.396 m³.  
Mass expelled = \(pV/RT\) difference:  
\[
m_{\text{He}} = \frac{1.6\times10^6}{4124\times300}(0.396-0.0208) = 0.49\,\text{kg}.
\]  
**0.49 kg**  
*Reflection:* Even a modest propellant load already consumes half a kilogram of helium; scaling to larger stages quickly becomes prohibitive.

**Example 3 — Propellant mass-flow rate**  
*Given:* \(C_d A_i = 2.5\times10^{-4}\) m², \(\rho = 1200\) kg m⁻³, \(\Delta p = 0.4\) MPa.  
*Find:* \(\dot{m}\).  
\[
\dot{m} = 2.5\times10^{-4}\sqrt{2\times1200\times4\times10^5} = 7.75\,\text{kg s}^{-1}.
\]  
**7.75 kg s⁻¹**  
*Reflection:* The square-root dependence shows why small changes in pressure margin produce only modest flow changes.

**Example 4 — Resulting vacuum thrust**  
*Given:* \(\dot{m} = 7.75\) kg s⁻¹, \(c^* = 1600\) m s⁻¹, \(\gamma = 1.25\), expansion ratio 40, \(p_c = 1.2\) MPa.  
*Find:* Vacuum thrust.  
Throat area from continuity: \(A_t = \dot{m}c^*/p_c = 0.0103\) m².  
Exit velocity from isentropic tables yields \(v_e \approx 3100\) m s⁻¹.  
Vacuum thrust:  
\[
F = 7.75\times3100 + p_e A_e \approx 24.0\,\text{kN}.
\]  
**24.0 kN**  
*Reflection:* The pressure term contributes only ~3 % at this expansion ratio; the dominant term is momentum thrust.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting tank pressure equal to chamber pressure | Forgetting injector and line pressure drops | Always add the measured or calculated \(\Delta p\) losses before sizing the regulator. |
| Treating helium mass as negligible | Underestimating ullage-volume growth | Integrate the ideal-gas law over the full expulsion range; never assume constant volume. |
| Using sea-level \(I_{sp}\) for upper-stage calculations | Confusing nozzle-exit pressure term | Use vacuum \(I_{sp}\) or add the \((p_e-p_a)A_e\) term explicitly. |
| Ignoring temperature drop of expanding helium | Regulator outlet gas cools during blow-down | Apply isentropic or polytropic cooling factors when sizing COPVs. |
| Assuming constant \(c^*\) with varying \(p_c\) | Overlooking mixture-ratio shift at off-design pressure | Recalculate \(c^*\) from CEA or tables whenever chamber pressure changes >10 %. |
| Sizing tanks for burst pressure only | Neglecting fatigue and material yield margins | Apply a minimum safety factor of 1.5 on ultimate and 1.25 on yield for flight hardware. |
| Forgetting that pressurant gas must also be stored at high pressure | Treating the COPV volume as free | Include COPV mass and volume in the stage budget from the first iteration. |

## 7. The textbook-precise statement
A pressure-fed liquid rocket feed system maintains propellant-tank ullage pressure \(p_t\) by means of a stored inert gas whose regulator set-point satisfies  
\[
p_t > p_c + \sum\Delta p_{\text{hydraulic}}
\]  
for the entire burn duration. Propellant mass-flow rate is then given by the incompressible orifice equation above; chamber pressure follows from the choked-nozzle relation \(p_c A_t = \dot{m}c^*\). The system contains no turbomachinery. (Sutton & Biblarz, *Rocket Propulsion Elements*, 9th ed., §6.3, “Pressure-Fed Systems”.)

## 8. Visual — diagram or schematic
```text
Helium COPV (p=20 MPa)
        │ regulator
        ▼
   ┌────┴────┐
   │  p=1.6  │
   │   MPa   │
   └─┬─────┬─┘
     │     │
  MMH   NTO
  tank  tank
   │     │
   └─┬─┬─┘
     │ │ isolation valves
     ▼ ▼
   injector orifices
        │
   ┌────┴────┐
   │comb. ch.│ p_c=1.2 MPa
   └────┬────┘
        ▼ nozzle (ε=40)
```

## 9. The memory technique
1. **The hook** — Picture a soda bottle (the propellant tank) being squeezed by an invisible hand (the helium regulator) until the liquid squirts into a thimble-sized fire at the bottom.
2. **What to overlearn** — (i) \(p_t = p_c + 0.3\)–0.5 MPa margin; (ii) helium mass \(\approx(p_t\Delta V)/(RT)\); (iii) tank mass \(\propto p_t r^2 L\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the ideal-gas law on the ullage volume, apply Bernoulli to the feed line, then close the loop with the choked-throat continuity equation.

## 10. What this unlocks
Mastery of the pressure-fed cycle supplies the reference architecture against which every pumped cycle is compared. The next concepts that rest directly on this foundation are:

- Gas-generator, staged-combustion, and expander cycles (all replace the stored-gas bottle with a pump driven by turbine exhaust or waste heat).
- Blow-down versus regulated operation trade studies.
- Propellant-tank material selection and composite overwrapped pressure vessel (COPV) sizing.
- Mixture-ratio control under varying tank pressure during blow-down.

## 11. Self-check — five questions, no answers
1. A 100 kg propellant load at 1.4 MPa regulated pressure must be expelled into a 1.0 MPa chamber; what minimum injector pressure drop guarantees sonic flow through 1 mm orifices?
2. Derive the helium mass required for a spherical tank of radius 0.6 m when propellant density is 900 kg m⁻³ and final ullage fraction is 0.92.
3. Show that tank wall thickness (and therefore mass) scales linearly with regulated pressure while thrust scales only with the square root of pressure drop; state the resulting design implication for chamber pressure choice.
4. An AJ-10-style engine is tested at sea level with the same hardware flown in vacuum. By how much does measured thrust change if exit pressure is 15 kPa?
5. Identify the single most dangerous assumption a designer makes when scaling a pressure-fed upper-stage design from 5 kN to 50 kN thrust without changing tank material.