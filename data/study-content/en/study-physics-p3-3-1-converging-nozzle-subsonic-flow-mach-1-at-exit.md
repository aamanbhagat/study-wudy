## 1. The one-sentence answer
**A converging nozzle reaches Mach 1 exactly at its exit plane when the stagnation-to-back-pressure ratio equals the critical value for the gas, at which point the nozzle is choked and further reduction of back pressure cannot increase the mass-flow rate.**

In subsonic internal flow the velocity rises and the static pressure falls as the cross-sectional area decreases. When the exit pressure is lowered sufficiently, the local Mach number at the minimum area (the exit) reaches unity. At that instant the flow at the exit becomes sonic, and acoustic signals can no longer propagate upstream; the nozzle is therefore choked.

The mass-flow rate then depends only on upstream stagnation conditions and throat area; downstream pressure no longer influences the interior solution provided the back pressure remains at or below the critical value. The flow inside the nozzle remains entirely subsonic until the exit plane itself.

> [!NOTE]
> The throat is the only place where sonic conditions can first appear; once M = 1 is reached there, the mass-flow rate is fixed regardless of how much lower the receiver pressure is driven.

## 2. Why this matters — concrete and current
SpaceX Merlin engines employ converging–diverging nozzles whose throat is sized so that the converging section chokes at sea-level chamber pressure, guaranteeing that the subsequent supersonic expansion begins from a known sonic state independent of ambient back-pressure variations during ascent.

In semiconductor plasma etch tools, argon or CF₄ is delivered through arrays of converging orifices; designers set the supply pressure so that each orifice chokes, thereby fixing the mass-flow rate to within 0.5 % even when chamber pressure fluctuates, which is essential for repeatable etch rates.

The Boeing/AFRL HIFiRE-5 flight test used a choked converging nozzle to inject fuel into a scramjet combustor; because the injector exit Mach number locked at 1, the fuel-jet momentum flux remained constant across the Mach-8 trajectory despite large changes in ambient pressure.

Gas-turbine combustor dilution holes are deliberately sized to choke at the compressor discharge pressure; this decouples the liner cooling flow from downstream turbine-stage pressure pulsations and prevents destructive thermo-acoustic coupling.

Natural geysers and volcanic vents exhibit the same choking phenomenology: when the conduit narrows sufficiently, the steam–water mixture reaches sonic velocity at the constriction and the eruption mass flux becomes independent of surface atmospheric pressure.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Isentropic relations for ideal gas | Supply the algebraic link between stagnation pressure, static pressure, and Mach number at every station. |
| Area–Mach number relation      | Shows that in a converging duct M can increase only toward 1; it cannot exceed 1 inside the nozzle. |
| Definition of choked flow      | Identifies the unique pressure ratio at which the exit first becomes sonic and mass flow saturates. |
| Steady continuity equation     | Relates density, velocity, and area so that the mass-flow integral can be evaluated once M_exit = 1. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Area change forces velocity change in compressible flow
Reducing the cross-sectional area of a duct accelerates a subsonic stream because mass conservation must still hold while density also rises.  
Example: air at 300 K, 1 bar enters a duct whose area halves; the velocity roughly doubles while pressure drops a few percent.  
Formally, the differential area–velocity relation is  
$$
\frac{dA}{A} = (M^2-1)\frac{dV}{V}.
$$
> [!WARNING]  
> Treating density as constant (incompressible assumption) predicts the wrong sign of pressure change once M exceeds ~0.3.

### Step 2 — Stagnation quantities are constant along an isentropic streamline
Because the flow is adiabatic and reversible, the stagnation pressure and temperature remain uniform from reservoir to exit.  
Thus every local static pressure can be written as a function of local Mach number alone:  
$$
\frac{p}{p_0}=\left(1+\frac{\gamma-1}{2}M^2\right)^{-\gamma/(\gamma-1)}.
$$

### Step 3 — Mach number is a monotonic function of area ratio for subsonic flow
For M < 1 the area–Mach relation shows that M increases as A decreases; the maximum attainable M inside the nozzle is therefore 1 at the exit plane.  
The explicit isentropic area ratio is  
$$
\frac{A}{A^*}=\frac{1}{M}\left[\frac{2}{\gamma+1}\left(1+\frac{\gamma-1}{2}M^2\right)\right]^{\frac{\gamma+1}{2(\gamma-1)}}.
$$

### Step 4 — Critical pressure ratio produces M = 1 at minimum area
Setting M = 1 in the pressure–Mach relation yields the critical ratio (γ = 1.4)  
$$
\frac{p^*}{p_0}=0.5283.
$$
When the back pressure p_b equals or falls below p*, the exit pressure locks at p* and M_exit = 1.

### Step 5 — Mass-flow rate reaches a maximum and becomes independent of p_b
With M_exit fixed at 1, the continuity integral evaluated at the exit gives the choked mass-flow expression  
$$
\dot{m}_\text{choked}=A_e p_0\sqrt{\frac{\gamma}{R T_0}}\left(\frac{\gamma+1}{2}\right)^{-\frac{\gamma+1}{2(\gamma-1)}}.
$$
Further lowering p_b produces no increase in \(\dot{m}\).

### Step 6 — Textbook statement of the result
For isentropic flow of a perfect gas in a converging nozzle, the exit plane attains Mach 1 and the mass-flow rate reaches its maximum value when  
$$
\frac{p_b}{p_0}\le\left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)}.
$$
(John D. Anderson, *Modern Compressible Flow*, 4e, §4.4.)

## 5. Worked examples — every step shown

**Example 1 — Critical pressure for air**  
*Given:* γ = 1.4, p₀ = 10 bar.  
*Find:* p*.  
Substitute into the isentropic relation:  
$$
\frac{p^*}{p_0}=\left(\frac{2}{2.4}\right)^{3.5}=0.5283 \quad \Rightarrow \quad p^*=5.283\,\text{bar}.
$$  
**5.283 bar**  
*Reflection:* The numerical value 0.528 is universal for diatomic gases and must be memorized.

**Example 2 — Exit Mach number for given pressure ratio**  
*Given:* p_b/p₀ = 0.7.  
*Find:* M_e.  
Invert the pressure–Mach formula:  
$$
M_e=\sqrt{\frac{2}{\gamma-1}\left[\left(\frac{p_b}{p_0}\right)^{(\gamma-1)/\gamma}-1\right]}=0.732.
$$  
**M_e = 0.732**  
*Reflection:* Because 0.7 > 0.528 the nozzle is not choked; the entire flow remains subsonic.

**Example 3 — Choked mass-flow calculation**  
*Given:* p₀ = 10 bar, T₀ = 300 K, A_e = 5 cm², γ = 1.4, R = 287 J kg⁻¹ K⁻¹.  
*Find:* \(\dot{m}_\text{choked}\).  
Insert into the choked formula:  
$$
\dot{m}=5\times10^{-4}\times10^6\times\sqrt{\frac{1.4}{287\times300}}\left(\frac{2.4}{2}\right)^{-3}=2.416\,\text{kg s}^{-1}.
$$  
**2.416 kg s⁻¹**  
*Reflection:* Only upstream stagnation quantities and throat area appear; downstream pressure is absent.

**Example 4 — Effect of lowering back pressure below critical**  
*Given:* Same nozzle as Example 3, now p_b = 3 bar (< 5.283 bar).  
*Find:* New mass-flow rate.  
Because p_b < p* the flow remains choked; the mass-flow expression is unchanged.  
**Still 2.416 kg s⁻¹**  
*Reflection:* Demonstrates that once sonic conditions are reached at the exit, further suction has no effect on internal flow.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming exit pressure always equals back pressure | Students carry over incompressible intuition | Check whether calculated M_e would exceed 1; if so, set p_e = p* instead. |
| Using p*/p₀ = 0.528 for any gas | Forgetting that the exponent contains γ | Always recompute the exponent for monatomic or polyatomic gases. |
| Believing mass flow keeps rising as p_b → 0 | Misreading the choking curve | Plot \(\dot{m}\) versus p_b once; the plateau after p* is unmistakable. |
| Confusing throat and exit for a C-D nozzle | Terminology overlap | Remember: in a purely converging nozzle the throat *is* the exit. |
| Neglecting that density drops at the throat | Treating ρ as constant | Use the isentropic density–Mach relation simultaneously with continuity. |
| Applying the area–Mach formula with A* taken as reservoir area | Misidentifying the sonic reference area | A* is the area at which M would equal 1; for a choked converging nozzle A* = A_e. |
| Forgetting real-gas effects at high pressure | Ideal-gas tables used outside their validity range | Verify reduced pressure and temperature lie inside the ideal-gas regime before applying the formulas. |

## 7. The textbook-precise statement
For steady, one-dimensional, isentropic flow of a calorically perfect gas in a converging duct with subsonic reservoir conditions, the Mach number at the exit plane satisfies M_e = 1 and the mass-flow rate attains its maximum value if and only if the imposed back-pressure ratio obeys  
$$
\frac{p_b}{p_0}\le\left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)}.
$$
Under this condition the static pressure at the exit plane equals the critical pressure p* and remains independent of any further reduction in p_b. (Anderson, *Modern Compressible Flow*, 4e, Theorem 4.2.)

## 8. Visual — diagram or schematic
```text
Reservoir          Converging nozzle          Exit plane
p0, T0, M≈0
   │
   │  area decreases steadily
   ▼
  ────────────────────────────────►
 /                                \
/                                  \   M=1, p=p*
|          subsonic flow            |   (choked)
\                                  /
 \________________________________/
          x = 0          x = L_e
```
Horizontal axis: flow direction. Vertical scale exaggerated for clarity. At x = L_e the area reaches its minimum and, when choked, M = 1.

## 9. The memory technique
1. **The hook** — Picture a converging funnel; when you suck harder than the “critical suck,” the narrowest point screams at the speed of sound and no extra suction pulls more air through.  
2. **What to overlearn** — p*/p₀ = 0.5283 (γ = 1.4) and the choked mass-flow formula above.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from continuity plus the isentropic p–M and T–M relations, set M = 1 at the minimum area, and integrate.

## 10. What this unlocks
Mastery of the choked converging nozzle supplies the boundary condition required for all subsequent supersonic nozzle theory, normal-shock tables, and nozzle-performance calculations.  
- Next: diverging-section flow and the design of C-D nozzles.  
- Immediately enables: over-expanded and under-expanded jet analysis.  
- Later supports: ramjet/scramjet inlet design and variable-area throat control.

## 11. Self-check — five questions, no answers
1. Derive the numerical value of p*/p₀ for a monatomic gas (γ = 5/3).  
2. A converging nozzle with A_e = 10 cm² discharges air from p₀ = 8 bar, T₀ = 320 K into a receiver at 3 bar. Compute the exit Mach number and mass-flow rate.  
3. Explain why lowering the receiver pressure from 4 bar to 2 bar produces no change in mass flow once the nozzle is already choked.  
4. Identify the single assumption that would be violated if the nozzle were extremely short and the flow separated.  
5. A student claims “the exit pressure must equal back pressure, therefore M_e cannot reach 1.” Where is the flaw in the reasoning?