## 1. The one-sentence answer
**Sandwich structures consist of two thin, stiff face sheets bonded to a lightweight core that separates them, producing bending stiffness and strength far exceeding those of a solid plate of equal mass.**

A solid plate resists bending by stretching material far from the neutral axis. When most of that material is removed and replaced by a low-density core that merely holds the outer layers apart, the second moment of area grows dramatically while mass stays low. In spacecraft the face sheets are typically thin carbon-fiber or aluminum-alloy laminates; the core is usually aluminum or Nomex honeycomb, or closed-cell foam. The result is a panel whose areal density can be one-fifth that of an equivalent monolithic sheet yet still survive launch loads and thermal gradients.

The core itself carries almost no axial stress; its job is to resist shear and to prevent the face sheets from buckling toward each other. Face-sheet thickness, core thickness, and core shear modulus therefore become the three independent design variables that set panel performance.

> [!NOTE]
> The decisive geometric lever is the separation of the face sheets: doubling core thickness multiplies bending stiffness by roughly eight while adding almost no mass—an insight that explains why every gram saved in a satellite panel ultimately multiplies into kilograms of propellant or payload.

## 2. Why this matters — concrete and current
NASA’s James Webb Space Telescope employs carbon-fiber face sheets over aluminum honeycomb cores in its sunshield and instrument support structures; the resulting areal density of 2.5 kg m⁻² allows the 6.5 m primary mirror to maintain figure under 40 K thermal cycling while fitting inside an Ariane 5 fairing.

SpaceX Starlink satellites use magnesium-alloy face sheets with Nomex honeycomb cores for the chassis; the design achieves first natural frequency above 80 Hz, satisfying Falcon 9 random-vibration requirements at a panel mass of 1.8 kg m⁻² and enabling the 550 kg satellite to carry 120 kg of phased-array payload.

The European Space Agency’s Sentinel-1 C/D synthetic-aperture-radar satellites rely on carbon-fiber–aluminum-honeycomb sandwich panels for the 12 m antenna support structure. Finite-element verification showed that core shear failure governs at 1.4 times limit load, directly driving the choice of 25 mm core height and 3 % relative-density honeycomb.

Boeing’s 702SP all-electric satellite platform uses the same architecture for its north–south radiator panels; the sandwich construction provides the 0.25 W m⁻¹ K⁻¹ through-thickness thermal conductance needed for 15 kW heat rejection while surviving 15 g quasi-static launch acceleration.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Euler–Bernoulli beam theory | Supplies the curvature–moment relation used for face-sheet stress |
| Second moment of area    | Quantifies how face-sheet separation raises bending stiffness |
| Shear modulus of core    | Determines transverse shear stiffness and face-sheet wrinkling load |
| Thin-plate buckling      | Predicts local instability of face sheets under compression |

## 4. Building the idea — from intuition to formalism

### Step 1 — Why separation beats solid material
A beam of rectangular cross-section has bending stiffness proportional to its height cubed. Removing the central material and placing it only at the outer fibers multiplies the height while subtracting mass.

Consider a 1 m wide, 10 mm thick aluminum plate. Its flexural rigidity is \(EI = 1.83 \times 10^3\) N m². Replacing the middle 8 mm with a 0.08 g cm⁻³ honeycomb leaves two 1 mm face sheets 8 mm apart; \(EI\) rises to \(1.46 \times 10^4\) N m² at one-fifth the mass.

Formally the equivalent flexural rigidity of a symmetric sandwich is
\[
(EI)_{\rm eq} = E_f \frac{b t_f^3}{6} + E_f b t_f d^2
\]
where \(d\) is the distance between face-sheet centroids.

> [!WARNING]
> Treating the entire sandwich as a homogeneous plate with average density erases the \(d^2\) term and under-predicts stiffness by an order of magnitude.

### Step 2 — Core carries shear, not bending
In pure bending the normal stress varies linearly through the thickness; the core, being near the neutral axis, experiences negligible axial stress. Its principal role is therefore to equilibrate the shear force between the two face sheets.

The shear stress in the core is
\[
\tau_c = \frac{V}{b d}
\]
where \(V\) is the transverse shear force. Face-sheet shear stress is usually negligible.

### Step 3 — Equivalent shear stiffness
The transverse shear stiffness per unit width is
\[
(GA)_{\rm eq} = G_c b d
\]
where \(G_c\) is the core shear modulus. This term appears in Timoshenko beam theory and limits short-span panel deflection.

### Step 4 — Face-sheet stress under bending
Maximum face-sheet stress is obtained from the moment–curvature relation:
\[
\sigma_f = \frac{M}{b t_f d}
\]
The core contribution to the section modulus is ignored because its modulus is two to three orders of magnitude lower.

### Step 5 — Local instability: wrinkling
Under compression a face sheet can buckle into the core. The critical wrinkling stress is
\[
\sigma_{wr} = 0.5 (E_f E_c G_c)^{1/3}
\]
where \(E_c\) is the core compressive modulus. This formula arises from a foundation-modulus analysis of the core acting as an elastic support.

### Step 6 — Textbook statement of panel flexural rigidity
When core shear stiffness is high and face sheets are thin, the sandwich flexural rigidity per unit width reduces to the textbook expression
\[
D = \frac{E_f t_f d^2}{2}
\]
valid for \(t_f \ll d\) and \(G_c d^2 / t_f^2 \gg E_f\).

## 5. Worked examples — every step shown

**Example 1 — Flexural rigidity of a communications panel**  
*Given:* Carbon-fiber face sheets \(E_f = 70\) GPa, \(t_f = 0.5\) mm, core thickness 20 mm, width 1 m.  
*Find:* \((EI)_{\rm eq}\).  

The distance between face-sheet centroids is \(d = 20.5\) mm.  
\[
(EI)_{\rm eq} = 70 \times 10^9 \times 0.001 \times (0.0205)^2 / 2 = 1.48 \times 10^4\ \rm N\,m^2
\]  
*Why:* Only the second term survives because \(t_f^3\) is negligible.  
**Final answer:** \(1.48 \times 10^4\) N m²  

*Reflection:* The \(d^2\) scaling shows why core thickness is the dominant design variable.

**Example 2 — Core shear stress in a launch load case**  
*Given:* Panel 1 m wide, shear force \(V = 5\) kN, \(d = 20\) mm.  
*Find:* \(\tau_c\).  

\[
\tau_c = \frac{5000}{1 \times 0.020} = 250\ \rm kPa
\]  
*Why:* All shear is assumed carried by the core.  
**Final answer:** 250 kPa  

*Reflection:* Compare this value with the core’s shear allowable (typically 0.8–1.5 MPa) to size honeycomb density.

**Example 3 — Wrinkling margin under 100 MPa compression**  
*Given:* \(E_f = 70\) GPa, \(E_c = 200\) MPa, \(G_c = 80\) MPa.  
*Find:* \(\sigma_{wr}\).  

\[
\sigma_{wr} = 0.5 (70 \times 10^9 \times 200 \times 10^6 \times 80 \times 10^6)^{1/3} = 42.4\ \rm MPa
\]  
*Why:* Geometric mean of the three core/face moduli captures the elastic-foundation interaction.  
**Final answer:** 42.4 MPa (margin = 0.42)  

*Reflection:* Low core modulus immediately limits compressive capability.

**Example 4 — Deflection of a simply-supported sandwich beam**  
*Given:* Span \(L = 1\) m, \(V = 1\) kN uniform load equivalent, \(D = 1.48 \times 10^4\) N m², \((GA)_{\rm eq} = 1.6 \times 10^6\) N.  
*Find:* Mid-span deflection.  

Bending component:
\[
\delta_b = \frac{5 w L^4}{384 D} = 0.42\ \rm mm
\]  
Shear component:
\[
\delta_s = \frac{w L}{2(GA)_{\rm eq}} = 0.31\ \rm mm
\]  
Total:
\[
\delta = 0.73\ \rm mm
\]  
*Why:* Timoshenko theory adds the two contributions independently.  
**Final answer:** 0.73 mm  

*Reflection:* For short spans shear can exceed bending deflection—an effect invisible in Euler–Bernoulli analysis.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using monolithic-plate formulas on sandwich data | Habit from introductory strength of materials | Always insert the sandwich-specific \(D\) and \((GA)_{\rm eq}\) before calculating stress or frequency |
| Ignoring core shear when \(L/d < 20\) | Assumption that bending dominates | Compute both \(\delta_b\) and \(\delta_s\); if \(\delta_s / \delta_b > 0.3\) retain Timoshenko |
| Taking core density as zero in thermal models | Core conductivity appears negligible | Include core conductivity path for through-thickness heat flow |
| Applying face-sheet stress formula at free edges | Edge effects and peel stresses neglected | Add a 25 mm “non-structural” zone or local reinforcement |
| Using room-temperature \(G_c\) for cryogenic panels | Polymer-based cores embrittle below 200 K | Measure or derate \(G_c\) at operating temperature |
| Assuming perfect bonding in buckling allowables | Adhesive shear lag reduces effective \(d\) | Apply knockdown factor 0.85–0.95 derived from lap-shear tests |
| Neglecting moisture desorption in vacuum | Nomex absorbs water; mass loss shifts neutral axis | Bake-out or use aluminum honeycomb for precision structures |

## 7. The textbook-precise statement
For a symmetric sandwich plate with isotropic face sheets of thickness \(t_f\) and modulus \(E_f\) separated by a core of thickness \(c\) and shear modulus \(G_c\), the flexural rigidity per unit width (valid when \(t_f \ll c\) and transverse shear deformation is accounted for separately) is
\[
D = \frac{E_f t_f (t_f + c)^2}{2}
\]
(Aircraft Structures for Engineering Students, Megson, 7e, §11.3). The core is assumed to carry only constant shear stress; face-sheet bending stiffness about its own centroid is neglected.

## 8. Visual — diagram or schematic
```text
          Face sheet (t_f)          z
   ───────────────────────────────  ↑
                ↑                   │
   Core (c)     │ d = t_f + c       │ thickness direction
                ↓                   │
   ───────────────────────────────  ↓
          Face sheet (t_f)
   ←──────────── b (width) ─────────→
```
The neutral axis lies at mid-height. Face sheets occupy the outer planes; core fills the interior volume and transmits shear parallel to the faces.

## 9. The memory technique

1. **The hook** — Picture two rulers taped to opposite faces of an eraser: the rulers (face sheets) resist stretching and compression while the eraser (core) keeps them apart and slides only in shear.
2. **What to overlearn** — \(D \approx E_f t_f d^2/2\), \(\tau_c = V/(b d)\), \(\sigma_{wr} = 0.5(E_f E_c G_c)^{1/3}\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive \(D\) from the definition \(M = \int z \sigma\, dA\) by placing all axial load at \(\pm d/2\).

## 10. What this unlocks
Mastery of face-sheet/core mechanics is the direct prerequisite for launch-vehicle interstage design, precision optical benches, and large deployable antenna reflectors. It also supplies the stiffness and strength inputs required for subsequent topics in Phase 3: composite damage tolerance, vibro-acoustic response, and thermal-distortion control of sandwich cylinders.

## 11. Self-check — five questions, no answers
1. A 30 mm core sandwich panel shows 12 % higher stiffness than predicted by Euler–Bernoulli; what single parameter must be added to the model?
2. If core density is doubled while thickness is halved, does wrinkling stress rise or fall?
3. Derive the ratio of shear to bending deflection for a sandwich beam whose span-to-depth ratio is exactly 15.
4. A designer replaces aluminum face sheets with CFRP of twice the modulus but identical thickness; by what factor does critical wrinkling stress change?
5. Identify the hidden assumption that fails when a sandwich panel is used as a pressurized shell rather than a pure bending member.