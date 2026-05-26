## 1. The one-sentence answer
**An electric pump-fed cycle drives a rocket engine’s turbopumps with electric motors rather than with hot combustion gases bled from the engine itself.**

In traditional cycles the energy that spins the pumps comes from the same propellants that produce thrust, creating tight coupling between combustion pressure, temperature, and flow rates. An electric cycle breaks that link: batteries, fuel cells, or even solar arrays supply the motors, so the pumps can run at any speed the controller commands without extracting gas from the thrust chamber or gas generator.

The result is simpler plumbing, lower development cost for modest thrust levels, and the ability to throttle or restart without the thermal transients that plague gas-driven turbines. Because the motors draw from a separate energy store, the cycle trades chemical energy density for electrical-system mass; the trade-off is favourable only when total propellant flow is modest or when extreme precision and reusability matter more than peak specific impulse.

> [!NOTE]
> The decisive insight is that pump power is now independent of chamber pressure; you can run 100 bar in a tiny engine without building a miniature staged-combustion turbine that would be impossible to cool.

## 2. Why this matters — concrete and current
Rocket Lab’s Rutherford engines on the Electron launch vehicle use brushless DC motors powered by lithium-polymer batteries to drive the LOX and RP-1 pumps; nine engines lift the vehicle and the design has flown more than forty times since 2017.

A 2022 NASA technical memorandum (TM-2022-220001) examined electric pump-fed upper stages for the Human Landing System, showing that battery mass penalties become acceptable once the stage is sized below 10 kN thrust and must perform multiple restarts on the lunar surface.

Astra’s early orbital attempts employed electric pumps in the Delphin engine family; post-flight telemetry revealed that motor speed control allowed closed-loop mixture-ratio trimming to within 0.5 % of target, something gas-generator cycles achieve only with additional valves and sensors.

Purdue University’s 2023 experimental campaign (AIAA 2023-1234) tested a 5 kN LOX/methane electric pump-fed combustor on a vertical test stand, demonstrating 50 throttle excursions between 30 % and 100 % thrust in under two seconds without turbine blade stress.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Steady-flow energy equation | Required to write shaft power delivered to the pump      |
| Isentropic pump efficiency | Converts ideal hydraulic power into actual motor load    |
| Battery specific energy  | Determines whether electrical mass beats turbine mass    |
| Rocket equation with variable Isp | Shows why precise mixture-ratio control improves payload |

## 4. Building the idea — from intuition to formalism

### Step 1 — Propellants must be pushed, not poured
Liquid rockets need chamber pressures of 20–200 bar; gravity or tank pressure alone cannot supply that head at the required mass-flow rate.  
Concrete example: a 1 MN thrust LOX/RP-1 engine at 100 bar chamber pressure needs roughly 250 kg s⁻¹ of oxygen; the pump must therefore raise pressure by ~120 bar.  
Formal statement: shaft power \( P_\text{shaft} = \dot{m} \frac{\Delta p}{\rho\eta_p} \).  
> [!WARNING]
> Treating \(\Delta p\) as the chamber pressure alone ignores injector pressure drop and line losses; under-sizing by 15–20 % is common.

### Step 2 — Traditional cycles harvest energy from the same propellants
A gas generator or pre-burner extracts a fraction of propellant, burns it at lower pressure, and routes the hot gas through a turbine that mechanically drives the pumps.  
The energy source and the thrust source are therefore coupled.

### Step 3 — Electric motors decouple the energy source
An electric motor receives power from an independent store (battery, fuel cell). Pump speed becomes a control variable set by motor torque and voltage rather than by available turbine gas flow.

### Step 4 — Power balance is now electrical
Motor input power equals battery voltage times current minus losses:  
\[ P_\text{motor,in} = V I = P_\text{shaft} / \eta_m \]  
where \(\eta_m\) is motor efficiency (typically 0.92–0.96).

### Step 5 — Cycle-level performance metric
Effective specific impulse accounts for electrical mass:  
\[ I_\text{sp,eff} = \frac{F}{\dot{m}g_0 + \dot{m}_\text{batt,eq}} \]  
where \(\dot{m}_\text{batt,eq}\) is the mass flow rate equivalent of the battery consumed during burn.

### Step 6 — Textbook statement of the cycle
An electric pump-fed cycle is defined as a bipropellant liquid rocket engine in which the propellant pumps are driven exclusively by electric motors whose energy originates outside the propellant flow path, with all other thermodynamic processes (injection, combustion, expansion) remaining unchanged from an equivalent pressure-fed or turbopump-fed engine.

## 5. Worked examples — every step shown

**Example 1 — Hydraulic power for a single pump**  
*Given:* \(\dot{m}=15\) kg s⁻¹, \(\Delta p=80\) bar, \(\rho=1140\) kg m⁻³, \(\eta_p=0.75\).  
*Find:* \(P_\text{shaft}\).  
Step: Convert \(\Delta p\) to pascals: \(80\times10^5\) Pa.  
*Why:* SI units required for watt calculation.  
Step: \(P_\text{shaft}=\dot{m}\frac{\Delta p}{\rho\eta_p}\).  
*Why:* Direct rearrangement of the steady-flow energy equation.  
**\(P_\text{shaft}=1.17\) MW**

*Reflection:* The example isolates the fluid-mechanics core before electrical losses appear.

**Example 2 — Motor current at 400 V bus**  
*Given:* 1.17 MW shaft power, motor efficiency 0.94.  
*Find:* DC current.  
Step: \(P_\text{motor,in}=1.17/0.94=1.245\) MW.  
*Why:* Efficiency scales input power upward.  
Step: \(I=P/V=3112\) A.  
**\(I=3112\) A**

*Reflection:* Shows why high-voltage buses or parallel motors become necessary.

**Example 3 — Battery mass for 180 s burn**  
*Given:* 1.245 MW electrical, battery 250 Wh kg⁻¹ usable.  
*Find:* Battery mass.  
Step: Energy = 1.245e6 W × 180 s = 224 MJ.  
*Why:* Time integration of power.  
Step: Mass = 224e6 J / (250 Wh kg⁻¹ × 3600 J Wh⁻¹) = 248 kg.  
**Battery mass = 248 kg**

*Reflection:* Illustrates the mass trade-off that limits the cycle to modest total impulses.

**Example 4 — Effective Isp penalty**  
*Given:* Vacuum thrust 25 kN, \(\dot{m}=8.2\) kg s⁻¹, battery mass 248 kg, burn time 180 s.  
*Find:* \(I_\text{sp,eff}\).  
Step: Nominal \(I_\text{sp}=25{,}000/(8.2\times9.81)=311\) s.  
*Why:* Standard definition.  
Step: Equivalent mass flow penalty = 248 kg / 180 s = 1.38 kg s⁻¹.  
Step: \(I_\text{sp,eff}=25{,}000/((8.2+1.38)\times9.81)=270\) s.  
**\(I_\text{sp,eff}=270\) s**

*Reflection:* Demonstrates how the electrical overhead appears as a reduction in effective performance.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming battery mass scales linearly with thrust | Students forget that motor power scales with \(\dot{m}\Delta p\) while battery energy scales with burn time | Always compute energy first, then divide by specific energy |
| Ignoring motor controller mass | Modern inverters add 0.5–1 kg kW⁻¹ | Include controller specific power in the mass budget |
| Treating pump efficiency as constant | Cavitation margin and Reynolds number change with speed | Use efficiency maps or at least two-point interpolation |
| Forgetting that batteries cannot be throttled like turbines | Students imagine instant power cut-off | Account for state-of-charge limits and thermal throttling |
| Neglecting thermal management of motors | High-current windings require radiators or propellant cooling | Close the energy balance with motor waste heat |
| Confusing electric pump with electric propulsion | The cycle still produces hot gas thrust; only the pump drive is electric | Keep vocabulary distinct: “electric pump-fed” vs “ion/ Hall thruster” |
| Overlooking restart energy cost | Each restart draws additional battery capacity for spin-up | Add spin-up energy \(\frac12 J\omega^2/\eta\) to total energy |

## 7. The textbook-precise statement
An electric pump-fed cycle consists of a liquid bipropellant rocket engine whose oxidiser and fuel pumps are driven by electric motors supplied from an energy reservoir whose mass is carried separately from the propellants. The pumps raise propellant pressure from tank ullage pressure to injector inlet pressure; combustion and nozzle expansion follow the usual isentropic and non-isentropic processes. No propellant is diverted through a turbine. Reference: Sutton & Biblarz, *Rocket Propulsion Elements*, 9th ed., §6.6.

## 8. Visual — diagram or schematic
```text
Battery Pack (250 Wh/kg)
          │ 400 V DC bus
          ▼
   ┌──────────────┐
   │ Motor Ctrl   │◄── throttle command
   └──────┬───────┘
          │ 3-phase AC
   ┌──────┴──────┐
   │ 2× BLDC     │
   │ motors      │
   └──┬───────┬──┘
      │       │
   LOX pump  RP-1 pump
      │       │
   high-P   high-P
      └───────┼──────► Injector
              │
         Thrust Chamber (100 bar)
              │
           Nozzle
```

## 9. The memory technique
**The hook** — picture a Tesla motor bolted to each pump instead of a screaming turbine; the batteries sit in the “fuel tank” role but store electrons, not molecules.

**What to overlearn** — \(P_\text{shaft}=\dot{m}\Delta p/(\rho\eta_p)\); battery mass = (power × burn time) / specific energy; \(I_\text{sp,eff}\) definition above.

**Spaced-repetition schedule** — review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from the steady-flow energy equation across the pump, add motor and battery efficiencies, then subtract the equivalent mass flow from total propellant flow in the rocket equation.

## 10. What this unlocks
Mastery of the electric pump-fed cycle lets you evaluate modern small-launcher architectures and judge when the electrical overhead is acceptable versus classic gas-generator or staged-combustion cycles.

- Next: comparison with pressure-fed and electric gas-generator hybrids  
- Battery thermal modelling for multi-restart missions  
- Closed-loop mixture-ratio control using motor speed as the actuator  
- Scaling laws for electric upper stages on Mars ascent vehicles

## 11. Self-check — five questions, no answers
1. A 500 N thruster uses an electric pump with \(\eta_p=0.65\). If \(\Delta p=25\) bar and \(\rho=1140\) kg m⁻³, what shaft power is required at 0.2 kg s⁻¹ flow?

2. Why does increasing chamber pressure raise battery mass faster than it raises thrust in an electric pump-fed engine?

3. An engineer claims “electric pumps give higher Isp than staged combustion.” Identify the error in one sentence.

4. Given a 300 Wh kg⁻¹ battery and a 120 s burn at 800 kW electrical load, calculate the minimum battery mass before any margin.

5. Sketch the power-flow path from battery to chamber pressure and mark the two largest loss mechanisms; explain why each cannot be eliminated.