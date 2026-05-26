## 1. The one-sentence answer
**Normal shock waves are governed by the five Rankine-Hugoniot relations obtained by integrating the one-dimensional conservation laws of mass, momentum, and energy across a discontinuous compression front in a compressible fluid.**

These relations arise because a normal shock is a mathematical discontinuity where flow properties jump abruptly while the integral statements of conservation remain satisfied. Begin with the integral forms of the continuity, momentum, and energy equations applied to a thin control volume straddling the shock; the integrals collapse to algebraic jump conditions once the shock thickness is taken to zero. The first three relations are therefore direct statements of conservation. The remaining two follow by algebraic elimination of velocity, yielding explicit ratios for static pressure and density (or temperature) expressed solely in terms of the upstream Mach number and the ratio of specific heats.

The decisive physical fact is that the second law of thermodynamics forces the shock to be compressive: pressure, density, and temperature all rise, while the downstream Mach number falls below unity.

> [!NOTE]
> The Rankine-Hugoniot relations are exact consequences of the integral conservation statements; they contain no assumption about the internal dissipative structure of the shock itself.

## 2. Why this matters — concrete and current
In the design of mixed-compression inlets for the Lockheed Martin F-35 Lightning II, normal-shock relations fix the total-pressure recovery at the throat when the terminal shock is swallowed at Mach 1.6–2.0, directly determining specific excess power available to the aircraft.

Re-entry capsules such as NASA’s Orion use the normal-shock density ratio to size the bow-shock standoff distance; the relation between post-shock density and freestream Mach number governs radiative heat-flux predictions that appear in the 2024 Artemis I post-flight reconstruction reports.

Ramjet-powered missiles such as the Meteor employ the pressure-ratio form of the Rankine-Hugoniot jump to locate the normal shock train inside the isolator; misalignment produces inlet unstart, a limit-cycle instability documented in 2023 wind-tunnel tests at DLR Cologne.

Supernova remnant shocks in astrophysical plasmas obey the same Rankine-Hugoniot energy jump; X-ray observations of Tycho’s remnant by Chandra allow inference of the electron-to-ion temperature ratio immediately behind the shock front.

High-Mach-number shock tunnels such as the Hypervelocity Expansion Tunnel at the University of Queensland rely on the stagnation-pressure loss relation to calibrate test-section conditions for ablative-material response experiments.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| One-dimensional steady continuity, momentum, and energy equations | Supply the integral statements that become the jump conditions once integrated across an infinitesimal control volume |
| Perfect-gas equation of state \(p=\rho RT\) and constant \(\gamma=c_p/c_v\) | Close the algebraic system after the three conservation statements are written |
| Definition of Mach number \(M=u/a\) | Convert velocity ratios into the dimensionless parameter that appears in every explicit jump formula |
| Control-volume formulation of the second law | Establishes that entropy must increase, thereby selecting the physically admissible compressive root |

## 4. Building the idea — from intuition to formalism

### Step 1 — Control volume across an infinitesimally thin front
A normal shock appears as a stationary discontinuity when viewed in its own rest frame. Draw a fixed rectangular control volume that straddles the front; the upstream face lies in region 1 and the downstream face in region 2. Because the volume thickness approaches zero, all surface integrals on the lateral walls vanish and the conservation laws reduce to pure jump statements.

**Example.** At a point on a supersonic wedge, the shock is locally normal to the incoming flow; the control volume can be drawn with faces parallel to the shock.

The formal statements are
\[
[\rho u]=0,\qquad [p+\rho u^2]=0,\qquad \Bigl[h+\frac{u^2}{2}\Bigr]=0,
\]
where \([\,]\) denotes the jump (downstream minus upstream).

> [!WARNING]
> Omitting the lateral-surface contributions is valid only when the shock is perfectly planar and steady; curvature or unsteadiness reintroduces transverse fluxes.

### Step 2 — Mass conservation (first Rankine-Hugoniot relation)
Mass flux is continuous:
\[
\rho_1 u_1=\rho_2 u_2.
\]
This single algebraic relation already shows that an increase in density must be accompanied by a proportional decrease in velocity.

### Step 3 — Momentum conservation (second Rankine-Hugoniot relation)
Streamwise momentum flux plus pressure is continuous:
\[
p_1+\rho_1 u_1^2=p_2+\rho_2 u_2^2.
\]
Substitute the mass-flux equality to eliminate one velocity and obtain a direct link between pressure and density jumps.

### Step 4 — Energy conservation (third Rankine-Hugoniot relation)
Stagnation enthalpy is continuous:
\[
h_1+\frac{u_1^2}{2}=h_2+\frac{u_2^2}{2}.
\]
For a perfect gas this becomes
\[
c_p T_1+\frac{u_1^2}{2}=c_p T_2+\frac{u_2^2}{2}.
\]

### Step 5 — Elimination to explicit pressure and density ratios (fourth and fifth relations)
Introduce the upstream Mach number \(M_1=u_1/a_1\) and the isentropic relation \(a^2=\gamma RT\). After algebraic rearrangement the pressure and density ratios appear in closed form:
\[
\frac{p_2}{p_1}=\frac{2\gamma M_1^2-(\gamma-1)}{\gamma+1},\qquad\frac{\rho_2}{\rho_1}=\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2+2}.
\]
These are the fourth and fifth Rankine-Hugoniot relations; all other jumps (temperature, downstream Mach number, stagnation pressure) follow by further substitution.

## 5. Worked examples — every step shown

**Example 1 — Pressure jump at Mach 2**
*Given:* \(\gamma=1.4\), \(M_1=2.0\)
*Find:* \(p_2/p_1\)
Substitute directly into the pressure-ratio formula:
\[
\frac{p_2}{p_1}=\frac{2\times1.4\times4-(1.4-1)}{1.4+1}=\frac{11.2-0.4}{2.4}=4.5.
\]
*Why:* The formula was obtained by eliminating velocity via mass conservation and inserting the perfect-gas speed of sound.
**4.5**

*Reflection.* The numerical value is independent of static pressure or temperature; only Mach number and \(\gamma\) matter.

**Example 2 — Density ratio and post-shock velocity**
*Given:* Air, \(\gamma=1.4\), \(M_1=2.0\), \(u_1=680\,\text{m/s}\)
*Find:* \(\rho_2/\rho_1\) and \(u_2\)
Density ratio:
\[
\frac{\rho_2}{\rho_1}=\frac{2.4\times4}{0.4\times4+2}=2.667.
\]
Mass conservation then yields
\[
u_2=u_1\times\frac{\rho_1}{\rho_2}=680\times0.375=255\,\text{m/s}.
\]
*Why:* Velocity ratio is exactly the inverse of the density ratio once mass flux equality is imposed.
**255 m/s**

*Reflection.* Post-shock velocity is always subsonic for a normal shock; the calculation confirms the expected deceleration.

**Example 3 — Temperature ratio from energy**
*Given:* Same conditions as Example 2
*Find:* \(T_2/T_1\)
From the equation of state and the two jump ratios,
\[
\frac{T_2}{T_1}=\frac{p_2}{p_1}\times\frac{\rho_1}{\rho_2}=4.5\times0.375=1.6875.
\]
*Why:* Perfect-gas law supplies the missing thermodynamic link between pressure, density, and temperature.
**1.6875**

*Reflection.* Temperature rise is modest compared with pressure rise because density also increases.

**Example 4 — Downstream Mach number**
*Given:* Same upstream state
*Find:* \(M_2\)
Use the relation derived from the three conservation statements:
\[
M_2^2=\frac{(\gamma-1)M_1^2+2}{2\gamma M_1^2-(\gamma-1)}=\frac{0.4\times4+2}{2.8\times4-0.4}=0.408.
\]
Thus \(M_2=0.639\).
*Why:* The expression follows after substituting the velocity and sound-speed ratios obtained from the earlier jumps.
**0.639**

*Reflection.* The algebraic path guarantees \(M_2<1\) whenever \(M_1>1\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using isentropic relations across the shock | Students forget that entropy rises | Always apply the three conservation statements first; isentropic relations are valid only on each side separately |
| Inverting the density ratio | Sign error when writing \(\rho_2 u_2=\rho_1 u_1\) | Keep subscripts ordered and verify that \(\rho_2>\rho_1\) for \(M_1>1\) |
| Applying the formulas at \(M_1=1\) | The denominator vanishes; shock strength is zero | Recognize that the shock relations are singular at \(M_1=1\) and recover the trivial solution \(p_2=p_1\) |
| Confusing static and stagnation pressure ratios | Stagnation pressure drops while static pressure rises | Compute static ratios first, then evaluate \(p_{02}/p_{01}\) from the isentropic relation evaluated on each side |
| Assuming \(\gamma\) is constant through strong shocks | Real-gas effects appear above \(M_1\approx5\) | State the constant-\(\gamma\) assumption explicitly before quoting the closed-form expressions |
| Neglecting the second-law constraint | Both roots of the quadratic satisfy conservation but only one satisfies \(\Delta s>0\) | Discard the expansive root by checking that \(p_2>p_1\) |
| Using upstream sound speed for downstream Mach number | \(a_2\neq a_1\) | Recompute local speed of sound from the new static temperature after the temperature jump is known |

## 7. The textbook-precise statement
Let subscripts 1 and 2 denote uniform upstream and downstream states of a perfect gas with constant \(\gamma\). A stationary planar discontinuity satisfies the three integral conservation statements
\[
\rho_1 u_1=\rho_2 u_2,\qquad p_1+\rho_1 u_1^2=p_2+\rho_2 u_2^2,\qquad h_1+\frac{u_1^2}{2}=h_2+\frac{u_2^2}{2}
\]
together with the thermodynamic closure \(h=c_p T\) and \(p=\rho R T\). Elimination of the velocities then yields the explicit Rankine-Hugoniot jump relations
\[
\frac{p_2}{p_1}=\frac{2\gamma M_1^2-(\gamma-1)}{\gamma+1},\qquad\frac{\rho_2}{\rho_1}=\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2+2},
\]
where \(M_1=u_1/\sqrt{\gamma R T_1}\). (Anderson, *Modern Compressible Flow*, 4e, §4.3.)

## 8. Visual — diagram or schematic
```text
x = 0 (shock plane)
          |  region 1          |  region 2
   u1 →   |  ρ1, p1, T1, M1>1  |  ρ2>ρ1, p2>p1, T2>T1, M2<1  → u2
          |                    |
  control |←------------------→|
  volume  |  thickness → 0     |
```
Faces perpendicular to the flow; lateral surfaces contribute zero net flux when the shock is planar.

## 9. The memory technique
1. **The hook** — Picture a supersonic locomotive slamming into a rigid wall of air; the sudden compression “piles up” density and pressure exactly as the Rankine-Hugoniot relations quantify.
2. **What to overlearn** — The two explicit ratios for \(p_2/p_1\) and \(\rho_2/\rho_1\) in terms of \(M_1\) and \(\gamma\); the fact that \(M_2<1\) for any \(M_1>1\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive from the three integral statements by eliminating velocity with mass conservation and substituting the perfect-gas speed of sound.

## 10. What this unlocks
Mastery of the normal-shock Rankine-Hugoniot relations supplies the local jump conditions required for any analysis of supersonic inlets, blast waves, or astrophysical shocks. The same algebraic structure reappears in the oblique-shock \(\beta\)-\(\theta\)-\(M\) relation, in the Prandtl-Meyer expansion fan, and in the shock-polar diagram used for shock-wave/boundary-layer interaction studies.

- Oblique-shock charts and the \(\theta\)-\(\beta\)-\(M\) equation
- Shock-expansion theory for diamond airfoils
- Rayleigh-line and Fanno-line flow with embedded normal shocks
- Unsteady shock tubes and the Riemann problem

## 11. Self-check — five questions, no answers
1. Derive the downstream Mach-number expression starting from the three conservation statements and show that \(M_2<1\) whenever \(M_1>1\).
2. For \(\gamma=1.4\) and \(M_1=3\), compute the stagnation-pressure ratio \(p_{02}/p_{01}\) and state the physical reason it is less than unity.
3. A normal shock stands in a duct where the upstream static pressure is 20 kPa. If the measured pressure jump is 4.2, what is the upstream Mach number?
4. Explain why the density ratio \(\rho_2/\rho_1\) cannot exceed \((\gamma+1)/(\gamma-1)\) even as \(M_1\to\infty\).
5. Identify the algebraic step that would become invalid if the gas were calorically imperfect (\(c_p=c_p(T)\)) and sketch how the jump relations would have to be solved instead.