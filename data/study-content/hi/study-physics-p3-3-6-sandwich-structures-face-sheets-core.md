## 1. The one-sentence answer
**Sandwich structures** combine two thin, stiff **face sheets** with a thick, lightweight **core** to deliver high bending stiffness at very low mass, exactly what spacecraft need for panels, fairings and propellant tanks.

Face sheets carry almost all the tensile and compressive loads while the core keeps the sheets apart and resists shear. The result is a panel whose flexural rigidity scales with the square of the core thickness, yet whose areal density stays low enough for launch. In practice you see aluminium or carbon-fibre face sheets bonded to aluminium honeycomb or foam cores; the bond line must survive thermal cycling and acoustic loads without delaminating.

A spacecraft designer therefore treats the sandwich not as three separate materials but as a single structural element whose effective properties are derived from the geometry and the individual constituent properties.

> [!NOTE]
> The decisive insight is that separating two strong skins by even a modest distance multiplies second-moment-of-area far more than it adds mass; that geometric leverage is why sandwich panels dominate modern spacecraft primary structures.

## 2. Why this matters — concrete and current
SpaceX Starship uses 304L stainless-steel face sheets with an internal honeycomb core in its methane tanks to survive both cryogenic temperatures and re-entry heat while keeping dry mass under 100 t. NASA’s Orion spacecraft employs carbon-fibre face sheets over aluminium honeycomb for the crew-module pressure vessel; the design passed the 2022 Artemis I acoustic test at 145 dB without core-to-face disbond. The James Webb Space Telescope’s sunshield consists of five Kapton layers tensioned on composite sandwich frames whose cores are Rohacell foam; the low thermal conductivity of the core keeps the telescope below 50 K. ISRO’s Chandrayaan-3 lander used CFRP face sheets with Nomex honeycomb in its propulsion deck; the structure survived 480 g launch loads with a mass fraction under 12 %. European Space Agency’s Sentinel-1 satellites rely on CFRP-aluminium honeycomb sandwich panels for the synthetic-aperture-radar antenna; the panels maintain 0.1 mm flatness over a 12 m aperture after five years in orbit.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second moment of area    | Controls how core thickness raises bending stiffness      |
| Shear modulus of core    | Determines transverse shear stiffness and core failure    |
| Interlaminar shear strength | Limits the bond between face sheet and core            |
| Coefficient of thermal expansion mismatch | Drives residual stresses during temperature swings   |

If any of these four ideas are unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Why two skins separated by distance work
Placing material far from the neutral axis increases resistance to bending far more efficiently than simply adding thickness. Imagine an I-beam: the flanges do the tensile-compressive work while the web only keeps them apart. A sandwich panel is the two-dimensional version of the same idea.

Example: a 1 mm aluminium sheet alone bends easily; the same sheet glued 20 mm away from an identical sheet suddenly feels rigid.

Formal statement: flexural rigidity of a monolithic plate is \(D = \frac{E t^3}{12(1-\nu^2)}\); for a symmetric sandwich with thin faces it becomes  
\[D \approx \frac{E_f t_f d^2}{2(1-\nu^2)}\]  
where \(d\) is the distance between face-sheet centroids.

> [!WARNING]
> If you forget that \(d\) is measured to the face-sheet centroids and not the outer surfaces, you will under-predict stiffness by 10–15 % on thin-core panels.

### Step 2 — Core carries shear, faces carry normal stress
Under bending, the faces experience axial stress \(\sigma_f = \frac{M z}{D}\); the core experiences nearly constant shear stress \(\tau_c = \frac{V}{b d}\).

Example: a 500 N shear force on a 1 m wide panel with 20 mm core produces only 25 kPa shear—easily carried by aluminium honeycomb.

Formal statement: core shear stress is assumed uniform through thickness when face sheets are thin:  
\[\tau_c = \frac{V}{b(d + t_f)}\]

### Step 3 — Equivalent flexural rigidity including core shear
For short spans, core shear compliance reduces apparent stiffness. The total deflection is  
\[\delta = \delta_\text{bending} + \delta_\text{shear} = \frac{P L^3}{48 D} + \frac{P L}{4 A G_c}\]

### Step 4 — Failure modes
Four competing modes exist: face-sheet yielding, face-sheet wrinkling, core shear failure, and bond-line delamination. Design requires checking all four.

### Step 5 — Design equation for minimum mass
For a given bending moment and allowable stress, optimum core thickness satisfies  
\[t_f = \sqrt{\frac{M \cdot \rho_c}{2 \sigma_f \rho_f d}}\]  
subject to core shear margin > 1.25.

## 5. Worked examples — har step show karo

**Example 1 — Simple flexural rigidity**  
*Given:* CFRP faces \(E_f = 70\) GPa, \(t_f = 0.5\) mm, aluminium honeycomb core thickness 15 mm, panel width 1 m.  
*Find:* \(D\).  
Step 1: \(d = 15 + 0.5 = 15.5\) mm.  
Step 2: \(D = \frac{70 \times 10^9 \times 0.0005 \times (0.0155)^2}{2} = 4.23 \times 10^3\) N·m.  
*Why:* We used the thin-face approximation directly.  
**Final answer** \(D = 4230\) N·m.  
*Reflection:* The core thickness term dominates; doubling core thickness multiplies \(D\) by four.

**Example 2 — Core shear stress check**  
*Given:* Same panel, \(V = 10\) kN.  
*Find:* \(\tau_c\).  
\(\tau_c = 10 \times 10^3 / (1 \times 0.0155) = 645\) kPa.  
*Why:* Force divided by effective shear area.  
**Final answer** 645 kPa (safe for typical honeycomb).  
*Reflection:* Short beams are limited by core shear, not face stress.

**Example 3 — Thermal mismatch stress**  
*Given:* \(\Delta T = 200\) K, \(\alpha_f = 2 \times 10^{-6}\), \(\alpha_c = 23 \times 10^{-6}\).  
*Find:* residual face stress after cure.  
Stress \(\sigma = E_f (\alpha_c - \alpha_f) \Delta T / 2 \approx 147\) MPa.  
*Why:* Core wants to expand more, stretching the faces.  
**Final answer** 147 MPa (below yield).  
*Reflection:* Always run this check for GEO satellites that see ±150 K swings.

**Example 4 — Minimum-mass optimisation**  
*Given:* \(M = 5\) kN·m, \(\sigma_f = 300\) MPa, densities given.  
Iterate \(d\) until core shear margin = 1.3. Optimum \(d = 22\) mm, total areal density 3.8 kg m\(^{-2}\).  
**Final answer** 3.8 kg m\(^{-2}\).  
*Reflection:* The calculation couples bending and shear constraints; ignoring shear gives an unsafe 12 mm core.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using monolithic-plate formula for \(D\) | Habit from beam theory                      | Always insert the sandwich-specific expression |
| Ignoring core shear in short spans | Over-reliance on bending-only tables        | Add the shear term whenever \(L/d < 20\)     |
| Assuming perfect bond indefinitely | No fatigue or thermal-cycle data            | Apply knockdown factor 0.7–0.8 on allowables |
| Measuring \(d\) to outer surfaces | Misreading drawings                         | Measure to face-sheet mid-planes             |
| Forgetting hygroscopic expansion of Nomex | Desert launch-site humidity                 | Include moisture coefficient in \(\Delta T\) term |
| Over-optimising face thickness only | Neglecting manufacturing minimum gauge      | Enforce \(t_f \ge 0.3\) mm for handling      |
| Using room-temperature core properties at cryo | Data sheets rarely show 20 K values      | Request or measure cryogenic shear modulus   |

## 7. The textbook-precise statement
A symmetric sandwich plate with isotropic face sheets of thickness \(t_f\), modulus \(E_f\) and Poisson’s ratio \(\nu_f\), separated by a core of thickness \(c\) and effective shear modulus \(G_c\), possesses flexural rigidity per unit width  
\[D = \frac{E_f t_f (c + t_f)^2}{2(1 - \nu_f^2)} + \frac{E_f t_f^3}{6(1 - \nu_f^2)} + \frac{E_c c^3}{12(1 - \nu_c^2)}\]  
under the assumptions that (i) plane sections remain plane, (ii) core carries only transverse shear, and (iii) perfect bonding exists at both interfaces. Source: Plantema, *Sandwich Construction*, 1966, §2.3.

## 8. Visual — diagram or schematic
```
Top face sheet (t_f)   ────────────────────────  z = +d/2
          Core (c)     | | | | | | | | | | | |   z = 0
Bottom face sheet      ────────────────────────  z = -d/2
          ↑ neutral axis
d = c + t_f   (distance between face centroids)
```

## 9. The memory technique
1. **The hook** — Picture two sheets of paper separated by a stack of drinking straws standing on end; the straws keep the paper apart so bending becomes almost impossible.
2. **What to overlearn** — \(D \approx E_f t_f d^2 / 2\) and \(\tau_c = V / (b d)\).
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive \(D\) from the definition \(D = \int E(z) z^2 \, dz\) across the three layers.

## 10. What this unlocks
Mastery of face-sheet/core mechanics lets you size entire spacecraft primary structures, predict vibro-acoustic response, and move on to more advanced topics such as composite joint design, thermal-distortion control, and damage-tolerant certification.

- Next: bonded joint allowables and insert design
- Next: acoustic fatigue of honeycomb panels
- Next: optimisation under combined thermal-mechanical loads

## 11. Self-check — five questions, no answers
1. A 20 mm core panel shows 12 % lower stiffness than predicted; which single assumption is most likely violated?
2. Derive the core thickness that equalises face-sheet stress and core shear margins for a cantilever beam.
3. Why does increasing face-sheet modulus sometimes decrease overall panel mass even though the material is denser?
4. Calculate residual stress after a 150 K cool-down for a titanium–aluminium honeycomb sandwich; state the governing equation.
5. Identify the trap in using the monolithic-plate formula for a panel whose span-to-depth ratio is 8.