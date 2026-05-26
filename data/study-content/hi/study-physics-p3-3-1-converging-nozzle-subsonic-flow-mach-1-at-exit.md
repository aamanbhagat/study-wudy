## 1. The one-sentence answer
**In a converging nozzle with subsonic inlet flow, the exit reaches exactly Mach 1 when the back-to-stagnation pressure ratio equals the critical value, after which the nozzle chokes and mass-flow rate becomes independent of further reduction in back pressure.**

A converging nozzle simply narrows the duct area from inlet to exit. Because the flow is compressible, density rises as velocity rises. The continuity and energy equations together force the Mach number to increase toward the exit. When the pressure ratio hits the critical value (approximately 0.528 for air), the local speed at the exit equals the local speed of sound; any further drop in back pressure cannot propagate upstream and the exit Mach number therefore stays locked at 1.

The same geometry cannot produce supersonic flow at the exit; a diverging section after the throat is required for that. Until the critical pressure ratio is reached, the entire flow field remains subsonic and isentropic (assuming negligible friction and heat transfer).

> [!NOTE]
> The “aha” moment is that Mach 1 is not an arbitrary speed limit; it is the precise point where the area-velocity relation changes sign, so a converging duct can no longer accelerate the flow once sonic conditions are met at the minimum area.

## 2. Why this matters — concrete and current
SpaceX’s cold-gas reaction-control thrusters on Starlink satellites use simple converging nozzles to reach sonic exit conditions at modest chamber pressures, giving predictable specific impulse without the mass penalty of a diverging section.

In the compressor discharge lines of CFM LEAP turbofan engines, converging bleed nozzles are sized so that they choke at a known pressure ratio; this fixes the bleed mass-flow rate during surge-margin testing and prevents compressor instability.

NASA’s 15-inch supersonic wind-tunnel facility employs a bank of converging nozzles to deliver precisely Mach 1.0 test-section entry flow for boundary-layer transition studies; the choking condition guarantees constant mass flow even when the downstream diffuser pressure fluctuates.

Gas-turbine combustor cooling holes in Siemens H-class machines are effectively miniature converging nozzles; designers deliberately operate them at critical pressure ratio so that coolant mass flow remains constant across the full range of turbine load, simplifying secondary-flow calculations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Isentropic stagnation relations | Needed to relate local pressure, temperature and density to the reservoir state     |
| Definition of Mach number \(M = V/a\) | Directly tells whether the exit is sonic or still subsonic                          |
| Area-velocity relation   | Explains why acceleration stops once \(M=1\) at minimum area                        |
| Critical pressure ratio formula | Gives the exact back-pressure value that produces \(M=1\) at exit                   |

If any of the above four items feel shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass conservation in variable area
Mass flow rate must stay constant along the nozzle. In differential form this is \(\rho V A = \text{constant}\). Taking the logarithmic derivative yields \(\frac{d\rho}{\rho} + \frac{dV}{V} + \frac{dA}{A} = 0\).

For a concrete example, imagine air flowing from a large tank into a nozzle whose area shrinks by 10 %. If density stayed constant, velocity would rise by roughly 11 %. Because density also drops, velocity must rise a little more.

The formal statement is the continuity equation written for steady one-dimensional flow:
\[
\frac{d}{dx}(\rho V A) = 0.
\]

> [!WARNING]
> Forgetting that density can change leads to the incorrect conclusion that velocity always rises when area falls, even past sonic conditions.

### Step 2 — Speed of sound and Mach number
Local sound speed is \(a = \sqrt{\gamma R T}\). Mach number \(M = V/a\) therefore compares flow speed to the propagation speed of pressure waves.

When \(M < 1\), pressure waves can travel upstream and the flow “knows” about downstream conditions. At \(M = 1\), waves are stationary relative to the exit plane.

### Step 3 — Isentropic relation between pressure and Mach number
For an isentropic process the static-to-stagnation pressure ratio is
\[
\frac{p}{p_0} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{-\gamma/(\gamma-1)}.
\]
At \(M = 1\) this reduces to the critical pressure ratio
\[
\left(\frac{p^*}{p_0}\right) = \left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)}.
\]

### Step 4 — Choking condition
When back pressure \(p_b\) equals \(p^*\), the exit pressure \(p_e = p^*\) and \(M_e = 1\). Further lowering of \(p_b\) cannot lower \(p_e\) because sonic conditions block upstream propagation of information; mass flow therefore freezes.

### Step 5 — Mass-flow rate at sonic exit
Substituting \(M=1\) into the isentropic mass-flow expression yields the maximum (choked) mass-flow rate:
\[
\dot{m}_{\text{max}} = A_e p_0 \sqrt{\frac{\gamma}{R T_0}} \left(\frac{2}{\gamma+1}\right)^{(\gamma+1)/[2(\gamma-1)]}.
\]

## 5. Worked examples — har step show karo

**Example 1 — Critical pressure ratio**
- *Given:* \(\gamma = 1.4\), \(p_0 = 10\) bar.
- *Find:* Back pressure that produces \(M_e = 1\).
\[
\frac{p^*}{p_0} = \left(\frac{2}{2.4}\right)^{3.5} \approx 0.5283 \implies p^* = 5.283\,\text{bar}.
\]
*Why:* Direct substitution of \(\gamma = 1.4\) into the isentropic formula.  
**Final answer: 5.283 bar**

*Reflection:* The calculation is simple yet shows that roughly half the reservoir pressure is required to reach sonic exit.

**Example 2 — Exit temperature at choke**
- *Given:* \(T_0 = 300\) K, \(\gamma = 1.4\), \(M_e = 1\).
- *Find:* \(T_e\).
\[
\frac{T_e}{T_0} = \frac{2}{\gamma+1} = \frac{2}{2.4} \approx 0.8333 \implies T_e = 250\,\text{K}.
\]
*Why:* Temperature ratio follows from the same isentropic relation evaluated at \(M=1\).  
**Final answer: 250 K**

*Reflection:* Even though velocity is highest, temperature (and therefore sound speed) has dropped, locking \(V = a\).

**Example 3 — Choked mass-flow rate**
- *Given:* \(A_e = 5 \times 10^{-4}\) m², \(p_0 = 10^6\) Pa, \(T_0 = 300\) K, \(\gamma = 1.4\), \(R = 287\) J kg⁻¹ K⁻¹.
- *Find:* \(\dot{m}_{\text{max}}\).
\[
\dot{m}_{\text{max}} = 5\times10^{-4}\times10^6\times\sqrt{\frac{1.4}{287\times300}}\times(0.5787) \approx 0.239\,\text{kg s}^{-1}.
\]
*Why:* All terms are evaluated at stagnation conditions with the sonic correction factor inserted.  
**Final answer: 0.239 kg/s**

*Reflection:* The result is independent of back pressure once choking occurs.

**Example 4 — Subsonic versus choked comparison**
- *Given:* Same nozzle, \(p_b = 0.7 p_0\) (still above critical).
- *Find:* Exit Mach number.
Solve the isentropic pressure-Mach relation iteratively to obtain \(M_e \approx 0.78\).  
*Why:* Because \(p_b > p^*\), flow remains subsonic throughout.  
**Final answer: \(M_e \approx 0.78\)**

*Reflection:* Only when the pressure ratio crosses 0.528 does the exit lock at Mach 1.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming exit pressure always equals back pressure | Students forget choking blocks pressure information | Check whether calculated \(M_e\) would exceed 1; if so set \(M_e = 1\) |
| Using incompressible continuity   | Density change is ignored                           | Always use \(\rho V A =\) constant with isentropic \(\rho\) |
| Forgetting \(\gamma\) dependence  | Formula memorized for air only                      | Keep \(\gamma\) explicit in every expression         |
| Confusing throat with exit        | In C-D nozzles throat is sonic; here exit = throat  | Draw the geometry first and label the minimum area   |
| Applying supersonic isentropic tables below critical pressure | Tables list both subsonic and supersonic branches   | Verify \(M < 1\) branch before reading values        |

## 7. The textbook-precise statement
Anderson, *Modern Compressible Flow*, 4e, §4.4 states: “For isentropic flow of a perfect gas in a converging duct, the maximum mass-flow rate is achieved when \(M=1\) at the exit plane; this occurs when the static back pressure equals the critical pressure \(p^* = p_0\left(2/(\gamma+1)\right)^{\gamma/(\gamma-1)}\). Further reduction of back pressure produces no increase in mass flow and the nozzle is said to be choked.”

All assumptions are listed: steady, one-dimensional, isentropic, perfect gas, calorically perfect, negligible body forces.

## 8. Visual — diagram or schematic
```
Reservoir (p0,T0) ──────────────► [   converging   ]──► exit
                                   \               /
                                    \             /
                                     \___________/
Area:          A_inlet          A(x)          A_exit (minimum)
Mach:          ~0               increasing     M=1 (choked)
```

## 9. The memory technique
1. **The hook** — Picture a crowd trying to leave a narrowing corridor; once people at the exit are shoulder-to-shoulder and moving at the speed of sound, no extra pushing from behind can make them leave faster.
2. **What to overlearn** — Critical pressure ratio \(\approx 0.528\) for \(\gamma=1.4\); choked mass-flow formula; statement “converging duct cannot accelerate past sonic.”
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\rho V A =\) constant + \(dp = a^2 d\rho\) + energy equation; differentiate to recover the area-velocity relation and set \(M=1\).

## 10. What this unlocks
This result is the foundation for all choked-nozzle analyses and directly precedes the study of converging-diverging (de Laval) nozzles.

- Design of rocket-engine throats
- Supersonic inlet starting criteria
- Mass-flow metering orifices in compressible pipe networks
- Shock-wave formation downstream of a choked converging nozzle

## 11. Self-check — five questions, no answers
1. For \(\gamma=1.3\), calculate the critical pressure ratio to three decimal places.
2. A converging nozzle has \(p_0=8\) bar and \(p_b=3\) bar. Is the exit sonic? Justify with numbers.
3. Derive the temperature ratio \(T^*/T_0\) starting from the energy equation alone.
4. Why does mass-flow rate become independent of back pressure once \(M_e=1\)? Give a one-sentence wave-propagation argument.
5. In Example 3 above, if \(T_0\) is raised to 450 K while keeping \(p_0\) fixed, does \(\dot{m}_{\text{max}}\) increase or decrease? By what factor?