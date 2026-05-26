## 1. The one-sentence answer
**Choked flow** is the regime in which the throat of a converging-diverging duct reaches exactly **M = 1**, fixing the mass-flow rate at its theoretical maximum for given stagnation conditions; further lowering of back pressure cannot increase \(\dot{m}\).

In compressible flow the continuity equation couples density, velocity and area. As the flow accelerates through a converging section both \(\rho\) and \(V\) change; their product reaches an extremum precisely when the local Mach number becomes unity. Once this sonic condition is established at the minimum-area station, acoustic signals can no longer propagate upstream, so the mass-flow rate “freezes”.

The practical consequence is that the nozzle mass-flow rate becomes independent of downstream pressure and is controlled only by upstream stagnation pressure and temperature together with throat area.

> [!NOTE]
> The single “aha” is that sonic conditions at the throat act as an information barrier: the flow upstream no longer “knows” what happens after the throat, locking \(\dot{m}\) at its peak value.

## 2. Why this matters — concrete and current
SpaceX Merlin 1D engines maintain choked throats at every throttle setting so that chamber pressure (and therefore thrust) can be commanded independently of the expanding supersonic plume; the same principle appears in the RS-25 engines of the SLS core stage.

Modern high-bypass turbofan engines (GE9X, PW1100G) deliberately size the high-pressure turbine nozzle guide vanes to remain choked at cruise, guaranteeing that turbine mass flow stays constant even when the low-pressure fan operates across a wide range of flight Mach numbers.

In semiconductor etching tools, choked orifices meter precise mass-flow rates of process gases (SF6, Cl2) into vacuum chambers; once sonic, the flow rate depends only on upstream regulator settings, eliminating downstream pressure fluctuations that would ruin wafer uniformity.

Natural transonic flow over an aircraft wing reaches local M = 1 at the crest of the airfoil; the resulting shock and boundary-layer separation limit the maximum operating Mach number of subsonic transports such as the Boeing 787.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Isentropic relations     | Stagnation-to-static property ratios must be written at M = 1 to obtain the choked mass-flow expression. |
| Continuity equation      | \(\dot{m} = \rho A V\) is the starting point; its extremum with respect to area yields the sonic condition. |
| Speed of sound & Mach number | Definition \(M = V/a\) tells us when the flow velocity equals the propagation speed of pressure waves. |
| Area-Mach relation       | The differential form \(dA/A = (M^2-1)dV/V\) shows that only at M = 1 can area reach a minimum. |

If any row above is unfamiliar, pause and review the corresponding section in compressible-flow notes before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass flow written in local variables
Mass flow through any cross-section is simply \(\dot{m} = \rho A V\). In a duct whose area changes, both density and velocity vary with position; the product must be examined for an extremum.

Concrete example: air at 300 K, 10 bar stagnation pressure enters a nozzle whose throat area is 5 cm². At the throat we do not yet know whether \(\rho\) and \(V\) have reached their optimum combination.

Formal statement:
\[
\dot{m} = \rho A V = \text{constant along the duct (steady flow)}.
\]

> [!WARNING]
> Treating \(\rho\) as constant (incompressible assumption) removes the possibility of a maximum; the choked-flow phenomenon disappears.

### Step 2 — Introduce isentropic relations
For an isentropic perfect gas the local density and speed of sound are functions of Mach number only:
\[
\frac{\rho}{\rho_0} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{-1/(\gamma-1)}, \quad a = a_0\left(1 + \frac{\gamma-1}{2}M^2\right)^{-1/2}.
\]

Velocity is \(V = M a\). Substituting yields \(\dot{m}\) as an explicit function of M and A.

### Step 3 — Differentiate with respect to area
Take the logarithmic differential of the mass-flow expression and set \(d\dot{m}=0\) for a stationary value. After algebra the condition collapses to:
\[
\frac{dA}{A} = (M^2-1)\frac{dV}{V}.
\]
A minimum area (\(dA=0\)) is possible only when \(M=1\).

### Step 4 — Confirm it is a maximum
Second-derivative or physical argument: when M < 1 the flow behaves subsonically and mass flow rises with falling back pressure; once M = 1 further reduction cannot increase \(\dot{m}\). Hence the stationary point is a maximum.

### Step 5 — Write the choked mass-flow formula
Insert M = 1 into the isentropic relations:
\[
\dot{m}_\text{choked} = A_t p_0\sqrt{\frac{\gamma}{R T_0}}\left(\frac{\gamma+1}{2}\right)^{-(\gamma+1)/[2(\gamma-1)]}.
\]
All quantities on the right are known upstream stagnation values and throat geometry.

### Step 6 — State the information barrier
Because pressure waves travel at finite speed a, once V = a at the throat, disturbances from downstream cannot propagate upstream. The mass-flow rate is therefore “locked”.

## 5. Worked examples — har step show karo

**Example 1 — Simple throat calculation**  
*Given:* Air, \(\gamma=1.4\), \(R=287\) J kg⁻¹ K⁻¹, \(p_0=10\) bar, \(T_0=300\) K, \(A_t=5\times10^{-4}\) m².  
*Find:* \(\dot{m}_\text{choked}\).  

Substitute directly into the choked formula:
\[
\dot{m} = (5\times10^{-4})\times10^6\times\sqrt{\frac{1.4}{287\times300}}\left(\frac{2.4}{2}\right)^{-3}\approx 1.79\,\text{kg s}^{-1}.
\]
*Why:* Every term is evaluated at stagnation conditions because M = 1 relations have already absorbed the isentropic ratios.  
**Final answer**  
**1.79 kg s⁻¹**

*Reflection:* The arithmetic is trivial once the formula is accepted; the real work was deriving that formula in Step 5.

**Example 2 — Verify M = 1 at throat**  
*Given:* Same stagnation state, throat pressure measured as 5.28 bar.  
*Find:* Local Mach number.  

Isentropic pressure ratio:
\[
\frac{p}{p_0}=\left(1+\frac{\gamma-1}{2}M^2\right)^{-\gamma/(\gamma-1)}=0.528.
\]
Solving yields M = 1 exactly.  
*Why:* The critical pressure ratio 0.528 is the mathematical signature of M = 1 for \(\gamma=1.4\).

**Example 3 — Effect of back pressure**  
*Given:* Nozzle with design back pressure 1 bar; actual back pressure lowered to 0.5 bar.  
*Find:* Change in mass flow.  

Because throat remains sonic, \(\dot{m}\) stays identical to Example 1. Only the shock location in the divergent section moves.  
*Why:* Information barrier prevents downstream pressure from influencing throat conditions.

**Example 4 — Non-ideal gas correction (advanced)**  
*Given:* Same geometry, but stagnation temperature raised so that \(\gamma\) varies from 1.4 to 1.33.  
*Find:* Percentage change in \(\dot{m}_\text{choked}\).  

Re-evaluate the exponent \(-(\gamma+1)/[2(\gamma-1)]\); result drops by ~3 %.  
*Why:* Real rocket combustion products have temperature-dependent \(\gamma\); the formula must be re-linearised around the new value.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming density constant | Students carry incompressible intuition | Always write \(\rho=\rho(M)\) before differentiating. |
| Confusing throat pressure with back pressure | Visual similarity of symbols | Label \(p_t\) (throat) versus \(p_b\) (back) explicitly on diagrams. |
| Forgetting that M = 1 gives maximum, not minimum | Sign error in second derivative | Re-derive the sign of \(d^2\dot{m}/dA^2\) at M = 1 once. |
| Using total pressure at exit instead of throat | Misreading station numbering | Fix station 0 = stagnation, t = throat, e = exit. |
| Ignoring that formula requires isentropic flow | Real nozzles have losses | State “assuming isentropic flow up to throat” every time the formula is quoted. |
| Treating \(\gamma\) as 1.4 for hot combustion gas | Convenience | Measure or look up local \(\gamma(T)\) before numerical substitution. |

## 7. The textbook-precise statement
Anderson, *Fundamentals of Aerodynamics*, 6e, §9.4 states:  

“Let a compressible gas undergo steady, one-dimensional, isentropic flow in a duct whose area reaches a minimum value \(A^*\) at the throat. Then the mass-flow rate attains its maximum value when the Mach number at the throat is exactly unity. Under these conditions the choked mass-flow rate is given by
\[
\dot{m}_\text{max}=A^*p_0\sqrt{\frac{\gamma}{RT_0}}\left(\frac{\gamma+1}{2}\right)^{-(\gamma+1)/[2(\gamma-1)]},
\]
provided the flow remains isentropic from the stagnation reservoir to the throat and \(\gamma\) is constant.”

## 8. Visual — diagram or schematic
```
          converging          throat          diverging
          section             (M=1)           section
   p0,T0 ────────────────●───────────────────────▶ supersonic
          /               |                     \
         /                |                      \
        /                 |                       \
       /                  |                        \
      /                   |                         \
     /                    |                          \
    /                     |                           \
   /                      |                            \
  /                       |                             \
```

The minimum-area station is labelled “throat (M = 1)”. Flow direction is left to right; sonic condition exists only at the dot.

## 9. The memory technique
1. **The hook** — Picture a bottle whose neck is exactly the width that lets sound waves just get stuck; once the neck “sings” at Mach 1, nothing downstream can push more mass through.
2. **What to overlearn** — The numerical factor for air \(\gamma=1.4\):
   \[
   \dot{m}_\text{choked}/(A_tp_0/\sqrt{RT_0})\approx0.6847.
   \]
   Also remember the critical pressure ratio 0.528.
3. **Spaced-repetition schedule** — Review the formula and the 0.6847 factor after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Start from \(\dot{m}=\rho AV\), insert isentropic \(\rho(M)\) and \(V(M)\), differentiate with respect to M, set derivative to zero; the algebra again forces M = 1 at the area minimum.

## 10. What this unlocks
Choked-flow behaviour is the gateway to all supersonic nozzle design, shock-wave tables, and thrust equations for rockets and ramjets.

- Normal-shock relations inside over-expanded nozzles  
- Method of characteristics for supersonic nozzle contours  
- Correct expansion criterion for optimum thrust coefficient  
- Unsteady blow-down tunnel operation  
- Critical-flow Venturi meters used in gas pipelines  

## 11. Self-check — five questions, no answers
1. Derive the numerical constant 0.6847 for \(\gamma=1.4\) starting from the general choked-flow expression.  
2. A nozzle has throat area 10 cm² and stagnation pressure 20 bar. If back pressure is lowered from 15 bar to 2 bar, does mass flow change? Quantify the change, if any.  
3. Show that the area-Mach relation \(dA/A=(M^2-1)dV/V\) is mathematically singular at M = 1 and explain the physical meaning.  
4. For a gas with \(\gamma=1.3\), recalculate both the critical pressure ratio and the choked mass-flow coefficient; compare with air values.  
5. In a real rocket nozzle the throat boundary layer displaces the sonic surface by 0.2 mm. Estimate the percentage loss in mass flow for a 50 mm throat radius.