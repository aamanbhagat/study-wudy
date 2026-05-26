## 1. The one-sentence answer
**Choked flow occurs when the Mach number reaches exactly 1 at the minimum-area throat of a converging-diverging duct, fixing the mass-flow rate at its maximum value for given upstream stagnation conditions.**

In subsonic flow through a converging section the velocity rises and the static pressure falls. Once the throat velocity equals the local speed of sound, pressure waves can no longer travel upstream; any further lowering of downstream pressure therefore leaves the throat state unchanged. The mass-flow rate consequently saturates and becomes independent of everything downstream of the throat.

The same saturation appears in rocket nozzles, jet-engine inlets, and even the glottis during speech. The governing physics is identical: the throat is the only station that can set both the sonic condition and the maximum throughput.

> [!NOTE]
> The “choking” is not a limit on how fast the gas can move; it is a limit on how much mass can pass per unit time once the throat becomes sonic.

## 2. Why this matters — concrete and current
SpaceX Merlin engines maintain choked throats during the entire boost phase so that chamber pressure—and therefore thrust—remains constant even as ambient pressure drops from sea level to vacuum.  
The Boeing 787’s CFM LEAP-1B high-bypass turbofan relies on choked fan nozzles to set corrected mass flow during take-off; the resulting fixed operating line protects the fan from surge.  
Semiconductor plasma etch tools use choked orifices to deliver precise, mass-flow-independent argon and CF₄ mixtures; a 0.1 % drift in throat area would shift etch rates beyond process tolerances.  
Vocal-fold vibration in human phonation produces choked glottal flow at roughly 1.2 kPa trans-glottal pressure; the resulting volume-velocity waveform is the source for all voiced speech sounds.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Isentropic relations           | Relate stagnation and static quantities at any Mach number, including M = 1.         |
| Area–Mach-number relation      | Shows that M = 1 is possible only at a geometric throat (dA = 0).                    |
| Continuity for compressible flow | Expresses mass-flow rate as \(\dot{m} = \rho A V\), the quantity that must be maximised. |
| Speed of sound \(a = \sqrt{\gamma R T}\) | Defines the sonic reference that appears in every choked-flow formula.               |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass conservation in variable area
Mass flow is conserved along a streamtube: \(\dot{m} = \rho A V =\) constant. In a converging duct both density and velocity can change, so the product must be examined carefully.

Example: air at 300 K, 1 bar entering a duct whose area halves; if density stayed constant, velocity would double, but density actually drops, so velocity rises more than twofold.

Formal statement:
\[
\dot{m} = \rho A V = \text{constant}.
\]

> [!WARNING]
> Treating density as constant (incompressible assumption) predicts an infinite velocity at a throat of zero area—an obvious physical impossibility.

### Step 2 — Definition of Mach number
Mach number \(M = V/a\) compares flow speed to the local speed of sound. When \(M\) approaches 1, compressibility effects dominate.

Example: sea-level sound speed ≈ 340 m s⁻¹; an aircraft at 340 m s⁻¹ has \(M = 1\).

Formal statement:
\[
M \equiv \frac{V}{a}, \qquad a = \sqrt{\gamma R T}.
\]

### Step 3 — Isentropic area–velocity relation
Differentiating the isentropic relations and substituting into continuity yields
\[
\frac{dA}{A} = (M^2-1)\frac{dV}{V}.
\]
At a throat \(dA = 0\), therefore either \(M = 1\) or \(dV = 0\).

> [!WARNING]
> Reversing the sign of \((M^2-1)\) leads to the incorrect conclusion that a throat can only decelerate supersonic flow.

### Step 4 — Mass-flow rate expressed in stagnation quantities
Substitute the isentropic relations for \(\rho(M)\) and \(V(M)\) into continuity:
\[
\dot{m} = A p_0 \sqrt{\frac{\gamma}{R T_0}} M \left(1 + \frac{\gamma-1}{2}M^2\right)^{-\frac{\gamma+1}{2(\gamma-1)}}.
\]

### Step 5 — Maximisation with respect to Mach number
Differentiate \(\dot{m}\) with respect to \(M\) at fixed \(A\), \(p_0\), \(T_0\). The derivative vanishes only at \(M = 1\). The resulting maximum mass-flow rate is
\[
\dot{m}^* = A^* p_0 \sqrt{\frac{\gamma}{R T_0}} \left(\frac{\gamma+1}{2}\right)^{-\frac{\gamma+1}{2(\gamma-1)}}.
\]

### Step 6 — Choking condition
Once \(M = 1\) is reached at the throat, further reduction of back pressure cannot increase \(\dot{m}\). The flow is said to be choked.

## 5. Worked examples — every step shown

**Example 1 — Simple throat sizing**  
*Given:* Air, \(\gamma = 1.4\), \(R = 287\) J kg⁻¹ K⁻¹, \(p_0 = 10\) bar, \(T_0 = 300\) K, throat area \(A_t = 5\) cm².  
*Find:* maximum mass-flow rate.  

Step 1: Insert \(\gamma = 1.4\) into the choked-flow constant  
\[
\left(\frac{1.4+1}{2}\right)^{-\frac{1.4+1}{2(1.4-1)}} = 0.6847.
\]  
*Why:* evaluates the isentropic factor at \(M = 1\).  

Step 2: Compute the prefactor  
\[
\sqrt{\frac{1.4 \times 287}{300}} = 1.225 \text{ s}^{-1}\text{K}^{-1/2}.
\]  
*Why:* converts stagnation temperature into the correct units for mass flux.  

Step 3: Multiply by throat area and stagnation pressure  
\[
\dot{m}^* = 5\times10^{-4}\times10^6\times1.225\times0.6847 = 0.420 \text{ kg s}^{-1}.
\]  
**0.420 kg s⁻¹**  

*Reflection:* The calculation uses only stagnation quantities; no downstream pressure appears—exactly the signature of choking.

**Example 2 — Verify M = 1 at throat**  
*Given:* Converging nozzle, exit pressure ratio \(p_e/p_0 = 0.528\).  
*Find:* Mach number at exit (throat).  

Use isentropic relation  
\[
\frac{p}{p_0} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{-\gamma/(\gamma-1)}.
\]  
At \(p/p_0 = 0.528\) the right-hand side equals 0.528 only when \(M = 1\).  
**M = 1**  

*Reflection:* The pressure ratio 0.528 is the critical value for air; any lower ratio still yields M = 1.

**Example 3 — Effect of stagnation temperature**  
*Given:* Same geometry as Example 1, but \(T_0 = 600\) K.  
*Find:* new \(\dot{m}^*\).  

Temperature appears under the square root, so mass flow scales as \(1/\sqrt{T_0}\):  
\[
\dot{m}^*_\text{new} = 0.420 \times \sqrt{300/600} = 0.297 \text{ kg s}^{-1}.
\]  
**0.297 kg s⁻¹**  

*Reflection:* Higher temperature lowers density faster than it raises velocity, reducing mass throughput.

**Example 4 — Supersonic nozzle with shock**  
*Given:* Converging–diverging nozzle, throat area 5 cm², exit area 20 cm², back pressure high enough for a normal shock at exit.  
*Find:* still choked?  

Because the throat is the only geometric minimum, M = 1 persists at the throat regardless of the shock downstream. Mass flow remains \(\dot{m}^*\).  
**Yes, choked**  

*Reflection:* Downstream shocks cannot propagate information upstream through a sonic throat.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming mass flow always rises when back pressure falls | Intuition from incompressible flow | Check whether throat M has already reached 1; if so, \(\dot{m}\) is fixed. |
| Using exit area instead of throat area in \(\dot{m}^*\) formula | Confusing geometric minimum with exit plane | Identify the minimum-area station first; only that area enters the choked expression. |
| Forgetting that \(T^*\) is not \(T_0\) | Stagnation temperature is constant; static temperature drops | Always evaluate temperature at M = 1, not at stagnation. |
| Applying the formula with \(\gamma = 1.4\) to diatomic gases at high temperature | Vibrational modes raise effective \(\gamma\) | Measure or look up the correct local \(\gamma\) before substitution. |
| Believing choked flow implies zero velocity somewhere | Misreading “choked” as “blocked” | Velocity is sonic at throat; mass flow is merely maximised, not stopped. |
| Ignoring boundary-layer displacement in small throats | Viscous layer reduces effective area | Apply a discharge coefficient or CFD correction for micro-nozzles. |
| Confusing critical pressure ratio with overall nozzle pressure ratio | Critical ratio fixes throat; overall ratio fixes exit M | Separate the two ratios in every calculation. |

## 7. The textbook-precise statement
For steady, one-dimensional, isentropic flow of a perfect gas with constant \(\gamma\) in a duct of varying area, the mass-flow rate reaches its maximum value when the Mach number at the minimum-area station (throat) is unity. The maximum mass-flow rate is given by
\[
\dot{m}^* = A^* p_0 \sqrt{\frac{\gamma}{R T_0}}\left(\frac{\gamma+1}{2}\right)^{-\frac{\gamma+1}{2(\gamma-1)}},
\]
provided the stagnation pressure \(p_0\) and stagnation temperature \(T_0\) are maintained upstream. (Anderson, *Modern Compressible Flow*, 4e, §4.4, Eq. 4.15.)

## 8. Visual — diagram or schematic
```text
          p0, T0
            │
            ▼
   ┌────────┴────────┐
   │   converging   │  subsonic acceleration
   └───────┬─────────┘
           │  throat  A* , M = 1 , choked
           │  (sonic surface)
   ┌───────┴─────────┐
   │   diverging     │  supersonic acceleration (if pe low enough)
   └───────┬─────────┘
           ▼
          pe
```
Horizontal axis = streamwise distance; vertical axis = area (not to scale). Vertical dashed line at throat marks the sonic station.

## 9. The memory technique

1. **The hook** — Picture a garden hose whose nozzle is slowly tightened: water speed rises until the narrowest point becomes “sonic” for water hammer waves; further tightening cannot increase the gallons per minute.
2. **What to overlearn** — (i) \(\dot{m}^* \propto A^* p_0 / \sqrt{T_0}\); (ii) critical pressure ratio for air = 0.528; (iii) M = 1 only at a throat.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Start from continuity, differentiate the isentropic relations, set dA = 0, solve for M; the algebra always yields M = 1.

## 10. What this unlocks
Choked-flow mastery is the gateway to all nozzle design, from de Laval rocket nozzles to steam turbines.  

- Next: normal-shock relations inside nozzles  
- Supersonic nozzle area ratio for prescribed exit Mach number  
- Rayleigh-line and Fanno-line flow with friction and heat addition  
- Method of characteristics for two-dimensional supersonic nozzles  

## 11. Self-check — five questions, no answers
1. A converging nozzle discharges air from 8 bar, 290 K into a receiver at 3 bar. Is the throat sonic?  
2. Derive the numerical value of the isentropic factor \(\left(\frac{\gamma+1}{2}\right)^{-\frac{\gamma+1}{2(\gamma-1)}}\) for \(\gamma = 1.3\).  
3. Two nozzles have identical throats but different divergent sections. Which one can pass more mass when both are choked?  
4. A student replaces \(T_0\) by the static throat temperature in the choked-flow formula and obtains an answer 20 % too high. What conceptual error occurred?  
5. In a rocket engine the chamber pressure suddenly drops 10 % while throat area and \(\gamma\) remain fixed. By what percentage does thrust change while the nozzle is still choked?