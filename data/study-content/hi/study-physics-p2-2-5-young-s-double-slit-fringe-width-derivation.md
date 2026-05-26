## 1. The one-sentence answer
**Young's double-slit fringe width** is the constant spacing β between consecutive bright (or dark) fringes on the screen, given by β = λD/d.

Light from two coherent slits separated by distance d travels slightly different paths to a point on a distant screen at distance D. The path difference is δ = (d sinθ). For small angles this simplifies to δ ≈ (d x)/D, where x is the position measured from the central fringe. Constructive interference occurs when δ = mλ, so the m-th bright fringe sits at x_m = m λ D / d. Subtracting consecutive orders gives the spacing β = x_{m+1} − x_m = λ D / d. This spacing is independent of m, which is why fringes look equally spaced near the centre.

> [!NOTE]
> The “aha” moment is that geometry alone (small-angle path difference) converts a phase condition into a linear position rule; once you accept sinθ ≈ tanθ ≈ x/D, the entire fringe pattern becomes an arithmetic sequence whose common difference is simply λD/d.

## 2. Why this matters — concrete and current
In LIGO’s 4 km arms, the same path-difference principle (scaled to kilometres) lets scientists detect gravitational-wave strains of 10^{-21}; the fringe shift is read out with photodiodes whose calibration ultimately traces back to the λD/d relation.  
Semiconductor fabs use 193 nm ArF lithography steppers whose critical-dimension control depends on predicting interference fringes inside photoresist; the fringe-width formula sets the minimum pitch that can be printed before optical proximity correction is applied.  
NASA’s Laser Interferometer Space Antenna (LISA) mission will fly three spacecraft in triangular formation; on-board metrology lasers rely on picometre-level fringe counting derived from the same double-slit geometry to maintain arm-length stability.  
Modern smartphone time-of-flight cameras (e.g., Sony IMX603) embed miniature Young’s interferometers to measure depth; the on-chip grating period d and sensor distance D are chosen so that β matches pixel pitch, giving direct depth from phase.  
Adaptive-optics systems on the Extremely Large Telescope measure atmospheric turbulence with Shack–Hartmann sensors whose microlens arrays produce local fringe patterns whose width yields wavefront slope in real time.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Coherent sources     | Only phase-locked waves produce stable interference fringes |
| Path difference δ    | Fringe location is defined by δ = mλ                      |
| Small-angle approximation | Converts angular condition into linear screen coordinate x |
| Wave nature of light | Treats light as having wavelength λ and phase             |

If any row is unfamiliar, pause and review that single idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visualise the geometry
Two narrow slits S1 and S2, separation d, are illuminated by monochromatic plane waves. A screen lies at perpendicular distance D ≫ d. Any point P on the screen is reached by rays whose geometric paths differ by a distance δ.

### Step 2 — Write the exact path difference
Drop a perpendicular from S1 to the ray S2P; the extra length is d sinθ, where θ is the angle from the centre line to P. Thus δ = d sinθ.

### Step 3 — Apply the interference condition
Constructive interference (bright fringe) occurs when δ = mλ, m = 0, ±1, ±2, …  
Destructive interference (dark fringe) occurs when δ = (m + 1/2)λ.

### Step 4 — Introduce the small-angle regime
Because D ≫ d, θ is small everywhere near the centre; therefore sinθ ≈ tanθ ≈ θ (in radians) and θ ≈ x/D, where x is the linear distance of P from the geometric centre. Substituting yields δ ≈ (d x)/D.

### Step 5 — Locate the m-th bright fringe
Set (d x_m)/D = m λ → x_m = m λ D / d.

### Step 6 — Subtract consecutive orders
x_{m+1} − x_m = (m+1)λD/d − mλD/d = λD/d.  
Hence the constant fringe spacing β = λD/d.

### Step 7 — State the domain of validity
The derivation assumes D ≫ d, monochromatic light, and slits narrow enough that single-slit diffraction envelope does not modulate intensity inside the observed region.

> [!WARNING]
> If you forget the small-angle step and keep sinθ, the fringe spacing becomes position-dependent; all later calculations that treat β as constant will collapse.

## 5. Worked examples — har step show karo

**Example 1 — Basic calculation**  
*Given:* λ = 550 nm, d = 0.2 mm, D = 1.5 m.  
*Find:* β.  
δ = d x / D = m λ  
x_m = m λ D / d  
β = λ D / d = (550 × 10^{-9} × 1.5) / (0.2 × 10^{-3})  
= 4.125 × 10^{-3} m = 4.125 mm.  
*Why:* Direct substitution of the derived formula after converting all quantities to SI.  
**4.125 mm**

*Reflection:* The numbers are typical of a school lab; the result shows β is a few millimetres, easily visible on a screen.

**Example 2 — Find slit separation from measured fringe width**  
*Given:* β = 2.5 mm, λ = 632.8 nm, D = 2 m.  
*Find:* d.  
β = λ D / d → d = λ D / β = (632.8 × 10^{-9} × 2) / (2.5 × 10^{-3})  
= 5.0624 × 10^{-4} m ≈ 0.506 mm.  
*Why:* Algebraic rearrangement isolates the unknown geometry parameter.  
**0.506 mm**

*Reflection:* In the lab you measure β with a ruler and back-calculate d; this is how students verify the formula.

**Example 3 — Shift due to thin film**  
*Given:* Same apparatus, a thin mica sheet (μ = 1.5, t = 5 µm) covers one slit.  
*Find:* new fringe width (unchanged) and central-fringe shift.  
β remains λ D / d because wavelength and geometry are unchanged.  
Extra path = (μ − 1)t = 2.5 µm.  
Shift y = [(μ − 1)t D]/d = 18.75 mm toward the uncovered slit.  
*Why:* Optical-path increase mimics an extra geometric path; the entire pattern translates rigidly while spacing stays constant.  
**β unchanged, central fringe shifts 18.75 mm**

*Reflection:* Shows that β is robust against uniform path offsets; only relative phase matters for spacing.

**Example 4 — Non-normal incidence**  
*Given:* Plane wave incident at angle α = 2°; d = 0.1 mm, λ = 500 nm, D = 1 m.  
*Find:* fringe width on screen.  
Effective path difference becomes d(sinθ − sinα).  
For small θ, β ≈ λ D / (d cosα).  
cos2° ≈ 0.9994 → β ≈ 5.003 mm (slightly larger than the normal-incidence 5 mm).  
*Why:* The projected slit separation is d cosα, so spacing increases.  
**5.003 mm**

*Reflection:* Demonstrates the formula’s first-order correction when the small-angle assumption on incidence is relaxed.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using β = λD/(2d)           | Confusing bright and dark fringe spacing    | Remember β is same for both; only location shifts by β/2 |
| Forgetting to convert units | Mixing nm with mm or cm                     | Always write every quantity in metres first  |
| Applying formula at large θ | sinθ ≠ θ when θ > 10°                       | Check θ = x/D < 0.2 rad before using β       |
| Treating d as slit width    | Notation mix-up with single-slit “a”        | Use d exclusively for centre-to-centre separation |
| Ignoring coherence length   | Assuming any two sources give stable fringes| Verify source bandwidth Δλ ≪ λ²/(path difference) |
| Measuring from first to third fringe and dividing by 2 | Counting error | Always measure from m to m+1 or average over many fringes |
| Applying β when D ≈ d       | Violates paraxial geometry                  | Ensure D/d > 100 before trusting the formula |

## 7. The textbook-precise statement
In Young’s double-slit arrangement two narrow, parallel, coherent line sources separated by distance d lie in a plane parallel to a viewing screen at distance D. For monochromatic light of wavelength λ and observation points whose angular displacement θ from the centre satisfies |θ| ≪ 1 rad, the separation between adjacent bright fringes is  
β = λD/d.  
(Hecht, *Optics*, 5e, §9.3.1, Eq. 9.16, under the explicit hypotheses of scalar diffraction, perfect spatial coherence, and the Fresnel paraxial approximation.)

## 8. Visual — diagram or schematic
```
          S1 ------------------+
          |                  |
          | d                | D
          |                  |
          S2 ----------------+------ screen
                             |
                             x=0 (centre)
```
S1 and S2 are vertical slits (into page). Rays reach point P at height x on screen. Path S2P − S1P ≈ (d x)/D for small x.

## 9. The memory technique

1. **The hook** — Picture two friends walking from slits to screen; the extra footsteps one friend takes equal exactly m wavelengths at bright fringes, and the spacing between those meeting points is always “lambda-D-over-d”.
2. **What to overlearn** — β = λD/d; β independent of order m; small-angle condition D ≫ d.
3. **Spaced-repetition schedule** — Review derivation after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from δ = d sinθ, impose δ = mλ, replace sinθ ≈ x/D, subtract consecutive m.

## 10. What this unlocks
- Diffraction-grating resolving power  
- Michelson stellar interferometer  
- Fourier-optics treatment of periodic objects  
- Holographic interferometry  
- Quantum which-path experiments that still preserve fringe visibility  

## 11. Self-check — five questions, no answers
1. A double-slit setup with λ = 500 nm gives β = 1 mm at D = 1 m. What is d?  
2. If the entire apparatus is immersed in water (μ = 1.33), how does β change?  
3. Derive the position of the first missing order when one slit is covered by a film of thickness t = λ/4(μ−1).  
4. Two fringes are observed at x = 3.2 mm and x = 4.8 mm; is the central fringe at x = 0?  
5. At what maximum θ does the small-angle formula for β deviate by more than 5 % from the exact sinθ expression?