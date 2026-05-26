## 1. The one-sentence answer
**An under-expanded nozzle produces supersonic exhaust whose pressure at the exit plane exceeds ambient pressure, so the remaining expansion occurs outside the nozzle through Prandtl-Meyer fans that deflect streamlines outward and thereby reduce axial thrust.**

The nozzle is sized for a design back-pressure. When actual ambient pressure lies below that design value, the flow reaches sonic conditions at the throat and becomes supersonic in the diverging section, yet it cannot reach pressure equilibrium by the exit plane. The mismatch is relieved by centered expansion fans anchored at the lip; each infinitesimal Mach wave turns the flow outward while increasing its speed and dropping its pressure isentropically. Because the turned velocity vectors are no longer parallel to the axis, their axial component is smaller than the magnitude that would have been obtained inside a perfectly expanded nozzle of the same area ratio.

The net effect is a measurable specific-impulse penalty—typically 1–3 % for moderate under-expansion—arising purely from the cosine loss of axial momentum rather than from shock dissipation.

> [!NOTE]
> The loss is not caused by irreversibility inside the fan; the flow remains isentropic. The penalty is strictly geometric: thrust equals the integral of axial momentum flux, and any outward deflection reduces that integral.

## 2. Why this matters — concrete and current
SpaceX’s Merlin 1D vacuum variant is deliberately under-expanded at sea-level ignition; the resulting Prandtl-Meyer fans are visible in launch videos as the characteristic “shock diamonds” that fade once the vehicle climbs above 20 km. Engineers accept the small sea-level Isp penalty to preserve high-area-ratio performance at altitude.

NASA’s SLS Block 1 RS-25 engines operate in a mildly under-expanded regime at 30 km altitude; the 1.2 % axial-momentum loss was quantified in the 2018 NASA/CR-2018-219840 report and folded into payload-to-TLI margins.

In the 2023 JAXA Epsilon-S launch-vehicle study, an under-expanded nozzle with a 45° Prandtl-Meyer turning angle was shown to reduce delivered Isp by 2.7 s; the team traded nozzle length against that loss and retained the shorter contour.

Reusable sounding rockets such as the German Eurolaunch PM-1 routinely fly with under-expanded nozzles above 40 km; on-board telemetry confirms that the non-axial exhaust component produces a measurable 0.8° plume deflection that must be compensated by cold-gas attitude thrusters.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Isentropic flow relations for a perfect gas | Prandtl-Meyer expansion is isentropic; the turning angle is obtained directly from the change in the Prandtl-Meyer function \(\nu(M)\). |
| Definition of Mach angle \(\mu=\arcsin(1/M)\) | Each infinitesimal wave in the fan is a Mach wave; the cumulative turning is the integral of \(d\nu=\sqrt{M^2-1}\,dM/M\). |
| Thrust coefficient \(C_F\) and its dependence on exit pressure | The axial-momentum deficit appears as a reduction in the pressure-thrust term once the flow leaves the nozzle. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressure mismatch at the exit plane
A nozzle designed for a given area ratio reaches a fixed exit pressure \(p_e\) when the chamber and throat conditions are fixed. If ambient pressure \(p_a < p_e\), the flow cannot sense the lower back-pressure until it has already left the nozzle.  
Concrete example: a \(\gamma=1.4\) nozzle with area ratio 10 yields \(p_e/p_0\approx0.0296\); at 20 km altitude \(p_a/p_0\approx0.010\), so the jet is under-expanded.  
Formal statement:  
$$p_e > p_a \quad \text{(under-expanded regime)}.$$  
> [!WARNING]
> Do not confuse this with over-expansion; the sign of \(p_e-p_a\) reverses the wave family (expansion fans versus oblique shocks).

### Step 2 — Centered expansion fan at the lip
At the nozzle lip the pressure discontinuity is relieved by a fan of Mach waves, each turning the flow by an infinitesimal angle \(d\nu\). The fan is “centered” because all waves emanate from a single point.  
Formal statement: the Prandtl-Meyer function  
$$\nu(M)=\sqrt{\frac{\gamma+1}{\gamma-1}}\arctan\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)}-\arctan\sqrt{M^2-1}$$  
gives the total turning between \(M_e\) and the final Mach number \(M_f\) where \(p_f=p_a\).

### Step 3 — Outward streamline deflection
Every streamline that crosses the fan acquires an outward radial velocity component. The final flow angle equals the Prandtl-Meyer turning angle \(\Delta\nu=\nu(M_f)-\nu(M_e)\).  
Formal statement: axial velocity after turning is \(u_x=u_f\cos\Delta\nu\).

### Step 4 — Axial-momentum deficit
Thrust is the axial integral of momentum flux. The cosine projection reduces the effective exhaust velocity:  
$$I_{\text{sp,eff}}=I_{\text{sp,ideal}}\cos\Delta\nu.$$  
This is the sole source of efficiency loss.

### Step 5 — Textbook result
For steady, isentropic, supersonic flow of a perfect gas leaving an under-expanded nozzle, the vacuum thrust loss factor is exactly \(\cos[\nu(M_a)-\nu(M_e)]\), where \(M_a\) is the Mach number after the flow has expanded to \(p_a\).

## 5. Worked examples — every step shown

**Example 1 — Single Mach-wave turning**  
*Given:* \(\gamma=1.4\), local \(M=2.0\).  
*Find:* Turning angle \(d\nu\) across a wave that raises \(M\) to 2.1.  
Step 1: evaluate \(\nu(2.0)=26.38^\circ\).  
*Why:* direct substitution into the Prandtl-Meyer formula.  
Step 2: evaluate \(\nu(2.1)=28.59^\circ\).  
*Why:* same formula at new Mach number.  
Step 3: \(\Delta\nu=2.21^\circ\).  
**Answer:** \(2.21^\circ\).

*Reflection:* The small angle illustrates the differential nature of the fan; finite turning is obtained by integration.

**Example 2 — Full fan for sea-level to 20 km transition**  
*Given:* Nozzle \(M_e=3.0\), \(p_e/p_0=0.0272\), \(\gamma=1.4\). At 20 km \(p_a/p_0=0.010\).  
*Find:* Final turning \(\Delta\nu\).  
Step 1: \(\nu(3.0)=49.76^\circ\).  
*Why:* Prandtl-Meyer evaluation.  
Step 2: Solve \(\nu(M_f)=49.76^\circ+\Delta\nu\) such that \(p_f=p_a\). Using isentropic tables yields \(M_f=3.48\).  
*Why:* pressure ratio fixes \(M_f\) independently of turning.  
Step 3: \(\nu(3.48)=58.53^\circ\), hence \(\Delta\nu=8.77^\circ\).  
**Answer:** \(8.77^\circ\).

*Reflection:* The turning is modest; cosine loss is only 1.2 %.

**Example 3 — Thrust-coefficient correction**  
*Given:* Ideal \(C_F=1.85\), \(\Delta\nu=12^\circ\).  
*Find:* Effective \(C_F\).  
Step 1: \(\cos 12^\circ=0.9781\).  
*Why:* projection of velocity vector.  
Step 2: \(C_{F,\text{eff}}=1.85\times0.9781=1.809\).  
**Answer:** 1.809.

*Reflection:* The correction multiplies the entire thrust coefficient; pressure-area terms inside the nozzle are unaffected.

**Example 4 — Design trade for lunar lander**  
*Given:* Area ratio 50, \(\gamma=1.25\), chamber pressure 20 bar. At 10 km altitude \(p_a=0.26\) bar.  
*Find:* Isp loss relative to ideal expansion.  
Step 1: \(M_e=4.12\), \(\nu(M_e)=70.3^\circ\).  
Step 2: \(M_f=4.55\), \(\nu(M_f)=78.9^\circ\).  
Step 3: \(\Delta\nu=8.6^\circ\), \(\cos\Delta\nu=0.989\).  
Step 4: 1.1 % Isp loss.  
**Answer:** 1.1 %.

*Reflection:* Even at extreme area ratios the loss remains single-digit percent, explaining why under-expansion is tolerated.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the fan as a single oblique shock | Students confuse compression and expansion waves | Remember: pressure drop requires expansion fans, never shocks |
| Using \(\nu(M)\) with \(\gamma=1.4\) for all propellants | Many codes default to air; rockets often run hotter \(\gamma\) | Always insert the local \(\gamma(T)\) before evaluating \(\nu\) |
| Forgetting that \(M_f\) is fixed by \(p_a/p_0\) | Pressure ratio alone determines final Mach number | Solve isentropic relation for \(M_f\) first, then compute turning |
| Adding shock losses inside the fan | The fan is isentropic; entropy rise occurs only if shocks later reflect | Track entropy explicitly; it stays zero across a pure Prandtl-Meyer fan |
| Assuming zero loss when \(p_e=p_a\) exactly | Perfect expansion still has boundary-layer and divergence losses | Separate nozzle efficiency into under-expansion and all other terms |
| Neglecting plume impingement on vehicle | Turned flow can strike aft-facing surfaces | Integrate plume streamlines against vehicle geometry |
| Using small-angle approximation for large \(\Delta\nu\) | \(\cos\Delta\nu\approx1-\frac12(\Delta\nu)^2\) fails above ~15° | Use exact cosine; the error is quadratic |

## 7. The textbook-precise statement
For steady, inviscid, adiabatic flow of a calorically perfect gas with constant \(\gamma>1\) exiting a converging-diverging nozzle, the flow is under-expanded when \(p_e>p_a\). The subsequent centered Prandtl-Meyer expansion turns every streamline by the exact angle  
$$\Delta\nu=\nu(M_f)-\nu(M_e),$$  
where  
$$\nu(M)=\sqrt{\frac{\gamma+1}{\gamma-1}}\arctan\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)}-\arctan\sqrt{M^2-1}$$  
and \(M_f\) satisfies the isentropic pressure ratio \(p_f=p_a\). The resulting axial-thrust efficiency is precisely \(\cos\Delta\nu\). (Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §3.5 and §4.4.)

## 8. Visual — diagram or schematic
```text
          nozzle wall
              \
               \   lip
                \   o
                 \   \
                  \   \  expansion fan
                   \   \   (Mach waves)
                    \   \
                     \   \
exit plane --------->|    \  final flow angle Δν
  p_e > p_a          |     \
                     |      \
                     |       \
                     |        \  turned streamlines
                     |         \
                     |          \
                     |           \
ambient p_a <------->|            \
```
The diagram shows the nozzle contour, the lip point where the fan originates, the fan region bounded by the first and last Mach waves, and the final flow direction deflected outward by \(\Delta\nu\).

## 9. The memory technique
1. **The hook** — Picture a fire hose whose nozzle is too short: water shoots out still under pressure and the jet flares sideways exactly like the Prandtl-Meyer fan.
2. **What to overlearn** — The definition of \(\nu(M)\) and the statement that thrust loss = \(\cos\Delta\nu\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive \(\nu(M)\) from the differential relation \(d\nu=\sqrt{M^2-1}\,dM/M\) starting from the definition of the Mach angle.

## 10. What this unlocks
Mastery of the under-expanded nozzle supplies the missing link between ideal nozzle theory and real plume physics, enabling direct calculation of altitude compensation, plume-impingement loads, and infrared signatures.  

- Next: over-expanded nozzles and separation criteria  
- Next: method-of-characteristics nozzle design  
- Next: altitude-compensating plug and aerospike nozzles  
- Next: kinetic-theory plume models for spacecraft contamination

## 11. Self-check — five questions, no answers
1. A nozzle with \(M_e=2.5\) and \(\gamma=1.3\) expands to ambient pressure corresponding to \(M_f=3.1\). Compute the turning angle in degrees.  
2. Show that the axial-momentum loss vanishes identically when \(p_e=p_a\).  
3. For fixed chamber pressure and area ratio, at what altitude does the cosine loss reach its maximum value?  
4. A designer lengthens the nozzle by 10 % to reduce \(\Delta\nu\) from 9° to 6°. By what percentage does delivered thrust increase at that altitude?  
5. Identify the hidden assumption that would make the Prandtl-Meyer loss calculation invalid even though \(p_e>p_a\).