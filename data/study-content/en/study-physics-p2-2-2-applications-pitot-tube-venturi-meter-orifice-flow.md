## 1. The one-sentence answer
**These applications are steady, incompressible flow devices that convert between pressure and velocity heads according to Bernoulli’s equation along a streamline, enabling direct measurement of speed or volume flow rate from a single pressure difference.**

A Pitot tube stagnates the flow at one point so the entire velocity head appears as a static-pressure rise. A Venturi meter accelerates the fluid through a contraction, producing a recoverable pressure drop that scales with the square of the flow speed. An orifice plate creates an abrupt contraction whose vena contracta yields a similar but irreversible pressure signal.

All three rest on the same two conservation statements: mass conservation fixes the velocity ratio between two stations, and Bernoulli’s equation then links that velocity ratio to the measured pressure difference. The only distinctions are geometry and whether the pressure recovery is total or partial.

> [!NOTE]
> The square-root dependence on pressure difference is universal; every calibration curve for these instruments ultimately traces back to that single algebraic feature of Bernoulli’s equation.

## 2. Why this matters — concrete and current
Aircraft air-data systems on every commercial and military jet still rely on Pitot-static probes to furnish calibrated airspeed to the flight computers; a single blocked probe on Air France 447 produced the fatal loss of situational awareness. Modern turbofan engine test stands at GE and Pratt & Whitney use Venturi meters in the inlet ducts to meter airflow to 0.1 % accuracy during certification runs that replicate Mach 0.85 cruise. Liquid-propellant rocket test facilities at NASA Stennis and SpaceX’s McGregor site insert sharp-edged orifice plates in the LOX and RP-1 feed lines because the plates tolerate the high pressure drops and two-phase transients that occur during engine start transients. In semiconductor wet-bench processing, critical photoresist and slurry delivery systems employ miniature Venturi flow sensors to maintain Reynolds-number-matched dispense rates below 1 mL min⁻¹, directly affecting yield on 3 nm nodes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Continuity equation      | Supplies the velocity ratio between stations of different area |
| Bernoulli’s equation     | Relates pressure difference directly to velocity head     |
| Incompressible flow      | Density is constant; required for both conservation laws  |
| Streamline and stagnation| Defines the reference points where velocity is zero or known |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass must be conserved
Fluid cannot accumulate or vanish inside a rigid duct. Therefore the volume flow rate is identical at every cross-section when density is constant.

Consider a garden hose whose nozzle narrows from 10 mm to 5 mm diameter. The water leaves the smaller opening visibly faster; the product of area and speed must stay constant.

$$ A_1 v_1 = A_2 v_2 $$

> [!WARNING]
> If the fluid is even slightly compressible, the density ratio appears and the simple area-velocity product fails.

### Step 2 — Mechanical energy is conserved along a streamline
Bernoulli’s equation states that the sum of pressure work, kinetic energy per unit volume, and gravitational potential remains constant when viscous losses and heat transfer are negligible.

Along the centerline streamline of a horizontal Venturi, elevation change is zero, leaving only pressure and velocity heads.

$$ p + \frac12\rho v^2 = \text{constant} $$

### Step 3 — Combine the two statements
Solve continuity for the unknown downstream velocity and substitute into Bernoulli.

$$ v_2 = v_1 \frac{A_1}{A_2} $$

$$ p_1 - p_2 = \frac12\rho(v_2^2 - v_1^2) $$

### Step 4 — Isolate the measurable pressure difference
Rearrange to obtain an expression for the upstream velocity in terms of the single measured quantity \(\Delta p = p_1 - p_2\).

$$ v_1 = A_2\sqrt{\frac{2\Delta p}{\rho(A_1^2 - A_2^2)}} $$

### Step 5 — Recover volume flow rate
Multiply the velocity by the upstream area to obtain the quantity that instruments actually report.

$$ Q = A_1 A_2\sqrt{\frac{2\Delta p}{\rho(A_1^2 - A_2^2)}} $$

### Step 6 — Specialize to each device
- Pitot tube: \(A_2\to0\), \(v_2\to0\), yielding \(v = \sqrt{2\Delta p/\rho}\).
- Orifice plate: the downstream area is replaced by an empirical contraction coefficient \(C_c A_o\) and a discharge coefficient \(C_d\) that accounts for vena-contracta and losses.

## 5. Worked examples — every step shown

**Example 1 — Pitot tube on a small UAV**
- *Given:* Air density \(\rho=1.225\) kg m⁻³, measured stagnation minus static pressure \(\Delta p=250\) Pa.
- *Find:* True airspeed.

Apply the Pitot specialization of Step 6:

$$ v = \sqrt{\frac{2\times250}{1.225}} $$

*Why:* Bernoulli reduces to a single square-root term once stagnation velocity is zero.

**250 m s⁻¹**

*Reflection:* The example is numerically trivial yet exposes the direct square-root mapping that appears in every air-data computer.

**Example 2 — Venturi meter in a water pipe**
- *Given:* Pipe diameter 150 mm, throat diameter 75 mm, \(\Delta p=12\) kPa, \(\rho=998\) kg m⁻³.
- *Find:* Volume flow rate \(Q\).

Areas: \(A_1=\pi(0.075)^2=0.01767\) m², \(A_2=\pi(0.0375)^2=0.004418\) m².

Substitute into the Venturi formula of Step 5:

$$ Q = 0.01767\times0.004418\sqrt{\frac{2\times12000}{998(0.01767^2-0.004418^2)}} $$

*Why:* Continuity supplies the area ratio inside the square root; Bernoulli supplies the \(\Delta p\) term.

**0.0214 m³ s⁻¹**

*Reflection:* Notice that halving the throat diameter multiplies \(Q\) by a factor that is not simply four because both velocity and area change.

**Example 3 — Orifice plate with discharge coefficient**
- *Given:* Same pipe as Example 2, orifice diameter 60 mm, \(C_d=0.62\), \(\Delta p=15\) kPa.
- *Find:* Actual mass flow rate.

Theoretical \(Q\) is first computed with orifice area, then multiplied by \(C_d\).

*Why:* The coefficient lumps vena-contracta area reduction and irreversible losses omitted from ideal Bernoulli.

**0.0131 m³ s⁻¹** (mass flow 13.1 kg s⁻¹)

*Reflection:* The empirical factor is essential; ignoring it over-predicts flow by 60 %.

**Example 4 — Rocket propellant line sizing**
- *Given:* Required LOX flow 45 kg s⁻¹, \(\rho=1140\) kg m⁻³, allowable \(\Delta p=80\) kPa across a Venturi whose throat is 40 % of pipe area.
- *Find:* Required pipe diameter.

Solve the Venturi equation backwards for \(A_1\), then convert to diameter.

*Why:* The same algebraic structure now serves design rather than measurement.

**Pipe diameter 78 mm**

*Reflection:* The square-root dependence forces the designer to accept either larger pressure drop or larger hardware when flow demand rises.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using static pressure instead of stagnation pressure in a Pitot calculation | Confusing the two ports on the probe | Verify which tap is connected to the stagnation orifice before substituting \(\Delta p\) |
| Neglecting the discharge coefficient for orifices | Treating the orifice as a perfect Venturi | Always insert tabulated \(C_d\) (typically 0.61–0.65) for sharp-edged plates |
| Applying Bernoulli across a hydraulic jump or sudden expansion | Invisible viscous dissipation violates the energy equation | Restrict Bernoulli to gradual contractions or confirmed streamlines |
| Assuming density remains constant when Mach > 0.3 | Compressibility alters both continuity and energy equations | Switch to isentropic compressible relations above M = 0.3 |
| Ignoring elevation change in vertical Venturi installations | Gravitational head becomes comparable to velocity head | Add \(\rho g\Delta z\) term explicitly when the meter axis is not horizontal |
| Using upstream area for orifice flow rate | Vena contracta lies downstream of the plate | Multiply theoretical orifice area by both \(C_c\) and \(C_d\) |
| Forgetting temperature correction on airspeed indicators | Density changes with altitude and temperature | Apply the standard-atmosphere density ratio before reporting calibrated airspeed |

## 7. The textbook-precise statement
For steady, inviscid, incompressible flow along a streamline, Bernoulli’s equation integrated between stations 1 and 2 with the continuity constraint yields the volume-flow expression

$$ Q = C_d A_1 A_2 \sqrt{\frac{2(p_1-p_2)}{\rho(A_1^2-A_2^2)}} $$

where \(C_d\) is an empirical discharge coefficient that accounts for vena-contracta geometry and minor losses (White, *Fluid Mechanics*, 8e, §3.5, eq. 3.58). The same relation with \(A_2\to0\) and \(C_d=1\) recovers the Pitot formula \(v=\sqrt{2\Delta p/\rho}\).

## 8. Visual — diagram or schematic

```text
          Pitot tube                     Venturi meter
   ──────────────────────          ───┐          ┌───
          │   │                       │          │
   static │   │ stagnation            │   throat │
   port   │   │ port                  │          │
          │   │                       │          │
   ──────────────────────          ───┘          └───
          p   p0                      p1         p2
```

The left figure shows a Pitot probe with two pressure taps; the right shows a classical Venturi contraction with pressure taps at the inlet and throat.

## 9. The memory technique

1. **The hook** — Picture a single drop of fluid riding a streamline: at the Pitot nose it stops dead and all its speed becomes pressure; inside the Venturi throat it sprints and its pressure drops in exact compensation.
2. **What to overlearn** — \(v=\sqrt{2\Delta p/\rho}\) for Pitot; the full Venturi expression for \(Q\); \(C_d\approx0.62\) for sharp orifices.
3. **Spaced-repetition schedule** — Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive by writing continuity, writing Bernoulli, eliminating the second velocity, and inserting the appropriate geometric area.

## 10. What this unlocks
Mastery of these devices supplies the measurement foundation for the next layer of internal-flow analysis: compressible nozzle flow, turbomachine performance maps, and unsteady manifold dynamics. The same algebraic skeleton appears in choked converging-diverging nozzles, in the Euler turbomachinery equation, and in acoustic impedance tubes.

## 11. Self-check — five questions, no answers
1. A Pitot probe mounted on a stratospheric glider reads \(\Delta p=180\) Pa at 20 km altitude where \(\rho=0.0889\) kg m⁻³. What is the indicated true airspeed?
2. A Venturi meter with area ratio 4:1 carries water at 2 m s⁻¹ upstream. If the throat pressure is 25 kPa below the inlet pressure, is the flow cavitating (vapor pressure 2.3 kPa absolute)?
3. An orifice plate is installed in a vertical pipe with flow upward. Does the discharge coefficient change when the meter is rotated 180° so flow is downward?
4. Derive the limiting expression for Venturi flow rate as throat area approaches pipe area; explain why the result is physically required.
5. A rocket propellant line must deliver 120 kg s⁻¹ of RP-1 through a Venturi whose pressure drop cannot exceed 150 kPa. If the pipe diameter is fixed at 100 mm, what minimum throat diameter satisfies the constraint?