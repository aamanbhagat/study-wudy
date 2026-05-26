## 1. The one-sentence answer
**Optimum expansion occurs when a rocket nozzle is sized so that the exit-plane static pressure exactly equals ambient pressure, eliminating the pressure-thrust term and thereby maximizing net thrust for given chamber conditions.**

The rocket thrust equation contains two contributions: momentum thrust arising from the exhaust velocity and pressure thrust arising from any mismatch between the gas pressure at the nozzle exit and the surrounding atmosphere. When these two pressures are equal, the second term vanishes and the nozzle contour has extracted the maximum possible directed kinetic energy from the propellant. Any further expansion lowers exit pressure below ambient and produces a suction force that reduces net thrust; any under-expansion leaves unused pressure force inside the nozzle.

The result is geometry-dependent. A nozzle designed for sea-level ambient pressure produces maximum thrust at sea level; the same nozzle at altitude becomes underexpanded and delivers less thrust than a longer nozzle matched to the lower ambient pressure. Designers therefore choose a single design altitude (or accept a compromise) and fix the exit-to-throat area ratio accordingly.

> [!NOTE]
> The pressure-balance condition is not an approximation; it is the stationary point of the thrust function with respect to expansion ratio when chamber pressure, mass-flow rate, and specific-heat ratio are held fixed.

## 2. Why this matters — concrete and current
SpaceX sizes the Merlin 1D vacuum nozzle (area ratio 165) for the near-vacuum conditions of upper-stage flight, while the sea-level Merlin 1D uses area ratio 16 so that exit pressure matches roughly 1 atm; the difference in delivered specific impulse is more than 50 s.  

NASA’s Space Launch System core-stage RS-25 engines are optimized for a design altitude near 30 km; at sea-level ignition they operate slightly over-expanded, producing a visible shock diamond pattern until the vehicle climbs and the pressure ratio reaches the design point.  

Electron and small-launch-vehicle builders such as Rocket Lab deliberately fly sea-level-optimized nozzles on the first stage and accept a thrust penalty at altitude because the vehicle quickly leaves the dense atmosphere; the same choice appears in the first-stage nozzles of Electron’s Rutherford engines.  

In research, the 2022 AIAA paper “Altitude-Compensating Nozzles for Small Launch Vehicles” quantifies that a 10 % mismatch between P_e and P_a at the design point costs 1.8–2.3 % of payload mass to low-Earth orbit, a figure now used in preliminary design tools at several NewSpace firms.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Control-volume momentum balance | Supplies the thrust equation containing both momentum and pressure terms |
| Isentropic nozzle relations | Relate exit Mach number, pressure ratio, and area ratio so that P_e can be expressed as a function of geometry |
| Definition of specific impulse | Converts the thrust optimum into an I_sp optimum used in mission design |
| Steady, one-dimensional flow assumptions | Justify treating all quantities as uniform across the exit plane |

## 4. Building the idea — from intuition to formalism

### Step 1 — Thrust is the sum of two physically distinct contributions
The net axial force on the rocket is the sum of the momentum flux out of the nozzle and the net pressure force acting on the exit plane.  
Concrete example: a garden hose whose nozzle exit pressure is higher than atmospheric pressure pushes the hose backward even if the water velocity is modest.  
Formal statement:  
$$
F = \dot{m} v_e + (P_e - P_a) A_e
$$  
> [!WARNING]
> Omitting the pressure term when P_e ≠ P_a leads to an immediate error in predicted thrust of several percent at sea level.

### Step 2 — Exit velocity depends on the pressure ratio across the nozzle
For isentropic flow of a perfect gas the exit velocity is  
$$
v_e = \sqrt{\frac{2\gamma}{\gamma-1} R T_c \left[1 - \left(\frac{P_e}{P_c}\right)^{(\gamma-1)/\gamma}\right]}
$$  
where the only variable the designer controls through nozzle geometry is P_e.  

### Step 3 — Area ratio fixes the pressure ratio
The isentropic area-Mach relation together with the pressure-Mach relation determines P_e once the expansion ratio ε = A_e/A_t is chosen. Thus ε becomes the single design variable.

### Step 4 — Form the objective function
Substitute the expression for v_e(P_e) and the relation A_e(P_e) into the thrust equation to obtain F as a function of P_e alone (all other quantities fixed).  

### Step 5 — Locate the stationary point
Differentiate F with respect to P_e and set the derivative to zero:  
$$
\frac{dF}{dP_e} = \dot{m}\frac{dv_e}{dP_e} + A_e + (P_e - P_a)\frac{dA_e}{dP_e} = 0
$$  
Using the differential form of the isentropic relations shows that the first and third terms cancel exactly when P_e = P_a, leaving the pressure term itself equal to zero.  

### Step 6 — Confirm it is a maximum
The second derivative d²F/dP_e² is negative at P_e = P_a, establishing a maximum. This is the textbook statement of optimum expansion.

## 5. Worked examples — every step shown

**Example 1 — Sea-level optimum for a small thruster**  
*Given:* P_c = 20 bar, γ = 1.25, T_c = 3000 K, desired P_e = 1 bar.  
*Find:* Required pressure ratio and implied area ratio.  
Step 1: Compute the isentropic pressure ratio  
$$
\frac{P_e}{P_c} = 0.05
$$  
*Why:* Direct substitution of the design condition P_e = P_a.  
Step 2: Solve the isentropic relation for exit Mach number  
$$
M_e = \sqrt{\frac{2}{\gamma-1}\left[\left(\frac{P_c}{P_e}\right)^{(\gamma-1)/\gamma}-1\right]} \approx 3.0
$$  
*Why:* Algebraic rearrangement of the standard pressure-Mach formula.  
Step 3: Insert M_e into the area-Mach relation to obtain ε ≈ 8.5.  
**Final answer**  
ε = 8.5 (rounded)  

*Reflection:* The example isolates the pressure-balance condition from all other variables; the same algebra applies at any altitude.

**Example 2 — Thrust gain from correct expansion**  
*Given:* \dot{m} = 10 kg/s, v_e (at P_e = 1 bar) = 2800 m/s, A_e = 0.05 m², P_a = 0.5 bar.  
*Find:* Thrust increase when nozzle is lengthened to restore P_e = 0.5 bar.  
Step 1: Original thrust (underexpanded)  
$$
F = 10 \times 2800 + (1-0.5)\times0.05 \times 10^5 = 28{,}025\,\text{N}
$$  
*Why:* Pressure term positive.  
Step 2: After redesign, pressure term vanishes and v_e rises to 2850 m/s (from isentropic tables).  
$$
F_\text{opt} = 10 \times 2850 = 28{,}500\,\text{N}
$$  
**Final answer**  
+475 N (1.7 % gain)  

*Reflection:* Even a modest pressure mismatch costs measurable thrust; the velocity increase supplies most of the improvement.

**Example 3 — Over-expanded case at sea level**  
*Given:* Nozzle designed for 0.2 bar but fired at P_a = 1 bar.  
*Find:* Sign of the pressure term and its effect.  
Step 1: P_e − P_a = −0.8 bar.  
Step 2: Pressure term = −0.8 × 10^5 × A_e (negative).  
**Final answer**  
Net thrust reduced by | (P_e − P_a) A_e |  

*Reflection:* Over-expansion produces a retarding force; designers therefore never choose ε so large that P_e < P_a at sea level.

**Example 4 — Vacuum-optimized nozzle**  
*Given:* P_a → 0, same chamber conditions as Example 1.  
*Find:* Limiting area ratio.  
Step 1: Set P_e = 0 in the isentropic relations (theoretical limit).  
Step 2: M_e → ∞, ε → ∞.  
**Final answer**  
No finite nozzle reaches true vacuum optimum; practical designs stop at P_e ≈ 0.01–0.05 bar.  

*Reflection:* The mathematical optimum moves with altitude; every real nozzle is therefore a compromise.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the pressure term as always positive | Students remember only the + (P_e − P_a)A_e form and forget the sign | Always write the term explicitly with its sign before substituting numbers |
| Confusing optimum expansion with maximum I_sp in vacuum | Vacuum I_sp keeps rising with ε while sea-level thrust peaks at P_e = P_a | Distinguish “design altitude” from “vacuum”; compute both I_sp,sl and I_sp,vac |
| Assuming P_e = P_a at throat | Throat is always sonic and P_t > P_a for P_c > 1.89 P_a | Remember the throat is never the exit except for a converging-only nozzle |
| Neglecting that v_e also changes with ε | Fixating on the pressure term alone | Re-derive v_e from the same pressure ratio used for the area change |
| Using P_a = 1 atm for all altitudes | Defaulting to sea-level tables | Insert the actual ambient pressure at each flight condition |
| Forgetting shock losses in over-expanded nozzles | Treating the simple 1-D equation as valid when oblique shocks stand inside the nozzle | Apply the 1-D equation only when P_e ≥ P_a/2 roughly; use method-of-characteristics otherwise |
| Optimizing ε for maximum thrust at a single instant | Ignoring that the vehicle climbs through a range of P_a | Perform trajectory-integrated optimization or accept a single design altitude |

## 7. The textbook-precise statement
For steady, isentropic, one-dimensional flow of a calorically perfect gas through a converging-diverging nozzle, the thrust  
$$
F = \dot{m} v_e + (P_e - P_a) A_e
$$  
attains a stationary maximum with respect to exit area A_e when and only when  
$$
P_e = P_a.
$$  
Under the same assumptions the second derivative is negative, confirming a maximum. (See Sutton & Biblarz, *Rocket Propulsion Elements*, 9th ed., §3.4, eq. 3-30 and the subsequent differentiation.)

## 8. Visual — diagram or schematic
```text
          P_c (chamber)
             │
   ┌─────────┴─────────┐
   │   converging     │  throat (M=1)
   └─────────┬─────────┘
             │
   diverging section   exit plane
   (area ratio ε)      P_e ? P_a
             │
             ▼
        exhaust plume
```
Labelled locations: chamber pressure P_c, throat, exit plane with static pressure P_e, ambient pressure P_a acting on the external surface of the exit lip. The pressure term (P_e − P_a) acts over area A_e.

## 9. The memory technique
1. **The hook** — Picture a balloon whose neck is cut exactly at the point where internal pressure equals room pressure; the rubber lip exerts no extra push or pull.  
2. **What to overlearn** — The thrust equation, the statement “maximum thrust at P_e = P_a”, and the isentropic pressure ratio formula.  
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
4. **First-principles fallback** — Begin from the axial momentum balance on a control volume enclosing the nozzle, insert the isentropic v_e(P_e) relation, differentiate with respect to P_e, and set the derivative to zero.

## 10. What this unlocks
The optimum-expansion condition is the starting point for all subsequent nozzle design: over- or underexpanded operation, altitude-compensating concepts (plug nozzles, expansion-deflection nozzles), and the trade-off between sea-level and vacuum specific impulse that governs stage sizing.  

- Next: Nozzle efficiency and losses  
- Next: Method of characteristics for contoured nozzles  
- Next: Trajectory optimization with variable I_sp(P_a)  
- Next: Clustering and plume-impingement constraints  

## 11. Self-check — five questions, no answers
1. A nozzle with ε = 10 is fired at sea level; chamber pressure is raised until P_e exactly equals 1 atm. By how much does thrust change if chamber pressure is raised another 10 % while ε is kept fixed?  
2. Derive the condition P_e = P_a starting from the control-volume momentum equation without assuming isentropic flow a priori; state the additional assumption required.  
3. Two nozzles have identical throat areas and chamber conditions but different exit areas. At what altitude do their thrusts become equal?  
4. An over-expanded nozzle at sea level shows oblique shocks inside the exit cone. Does the simple 1-D thrust equation still predict the correct sign of the pressure term?  
5. A designer claims that lengthening the nozzle always increases vacuum I_sp. Under what limiting condition is this claim false?