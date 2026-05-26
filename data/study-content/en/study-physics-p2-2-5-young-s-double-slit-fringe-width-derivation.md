## 1. The one-sentence answer
**Young's double-slit fringe width is the constant separation β between adjacent bright (or dark) fringes on the observation screen, obtained from the linear growth of path difference with position.**

Light from two coherent slits reaches any point on a distant screen after traveling slightly different distances. That path difference determines whether the waves add constructively or destructively. Because the extra distance grows linearly with distance from the central axis, the locations of successive maxima are equally spaced. Subtracting the positions of the m-th and (m+1)-th bright fringes immediately yields the spacing β.

The result is independent of the order m and holds only inside the small-angle regime where the screen distance D greatly exceeds both slit separation d and the observed fringe positions. Outside that regime the fringes curve and the simple formula fails.

> [!NOTE]
> The single algebraic step that converts path difference δ = (d sin θ) into fringe spacing is the recognition that, for small θ, sin θ ≈ tan θ ≈ y/D; the geometry therefore collapses to β = λD/d.

## 2. Why this matters — concrete and current
In semiconductor lithography, ASML’s EUV scanners use the same two-beam interference principle to print 7 nm node features; the fringe width formula sets the minimum pitch that can be resolved before higher-order diffraction must be controlled.

LIGO’s 4 km arms function as a macroscopic Michelson interferometer whose fringe spacing is monitored to 10^{-19} m; the double-slit derivation supplies the linear mapping from optical path change to detected displacement that underpins the strain sensitivity h ≈ 10^{-21}.

The Very Large Telescope Interferometer (VLTI) combines light from four 8 m telescopes with baselines up to 130 m; the measured fringe spacing directly calibrates the angular resolution needed to image exoplanet atmospheres at milliarcsecond scales.

Optical coherence tomography (OCT) in ophthalmology exploits the same wavelength-dependent fringe envelope to achieve 5 µm axial resolution in retinal scans; every commercial Zeiss Cirrus instrument contains an explicit implementation of the β = λD/d relation inside its depth-calibration routine.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Huygens–Fresnel principle | Treats each slit as a source of spherical wavelets        |
| Path-length difference   | Determines phase difference δφ = (2π/λ)Δr                 |
| Small-angle approximation| Converts sin θ ≈ θ ≈ y/D so positions become linear       |
| Coherence                | Guarantees stable interference; otherwise fringes wash out|

## 4. Building the idea — from intuition to formalism

### Step 1 — Geometry of the two sources
Two narrow slits separated by distance d are illuminated by a single monochromatic plane wave. A flat screen stands at perpendicular distance D ≫ d. Any point P on the screen lies at an angle θ from the midline.

The geometric path difference between the two rays reaching P is exactly δ = d sin θ.

> [!WARNING]
> If you replace sin θ by θ without first confirming D ≫ y, the derived spacing will be systematically too small at large angles.

### Step 2 — Phase difference and interference condition
The corresponding phase difference is δφ = (2π/λ)δ. Constructive interference (bright fringe) occurs when δφ = 2πm, i.e., δ = mλ, where m = 0, ±1, ±2, …

### Step 3 — Linear position on the screen
For D ≫ d the angle remains small, so sin θ ≈ tan θ ≈ y/D. Substituting gives the location of the m-th bright fringe:
$$
y_m = \frac{m\lambda D}{d}.
$$

### Step 4 — Adjacent-fringe separation
The (m+1)-th bright fringe sits at
$$
y_{m+1} = \frac{(m+1)\lambda D}{d}.
$$
Subtracting yields the constant spacing
$$
\beta = y_{m+1}-y_m = \frac{\lambda D}{d}.
$$

### Step 5 — Textbook statement of fringe width
The fringe width β is therefore independent of order m and equals λD/d inside the paraxial regime.

## 5. Worked examples — every step shown

**Example 1 — Central fringe spacing at visible wavelength**  
*Given:* λ = 550 nm, d = 0.1 mm, D = 1 m.  
*Find:* β.  
Step 1: Convert units → λ = 5.5 × 10^{-7} m, d = 10^{-4} m.  
*Why:* SI consistency.  
Step 2: Insert into formula β = λD/d.  
*Why:* Direct application of derived result.  
**β = 5.5 mm**

*Reflection:* The numbers are typical of undergraduate lab apparatus; the millimetre-scale result matches what is seen on a ruler.

**Example 2 — Changing screen distance**  
*Given:* Same slits and laser, but D doubled to 2 m.  
*Find:* New β.  
Step 1: β ∝ D, therefore new value is exactly twice the previous.  
*Why:* Linearity follows from the small-angle substitution y = D tan θ.  
**β = 11.0 mm**

*Reflection:* Demonstrates that fringe width scales directly with D, a fact used daily when adjusting optical benches.

**Example 3 — Microwave analogue**  
*Given:* λ = 3 cm, d = 12 cm, D = 3 m.  
*Find:* β.  
Step 1: β = (0.03 × 3)/0.12 = 0.75 m.  
*Why:* Formula is wavelength-agnostic provided coherence is maintained.  
**β = 0.75 m**

*Reflection:* Shows the same relation governs radio-frequency “fringes” used in antenna array calibration.

**Example 4 — Locate the third bright fringe and verify spacing**  
*Given:* λ = 600 nm, d = 0.2 mm, D = 2 m.  
*Find:* Position of m = 3 fringe and confirm β.  
Step 1: y_3 = 3λD/d = 3(6×10^{-7})(2)/(2×10^{-4}) = 0.018 m.  
*Why:* Use the position formula before subtracting.  
Step 2: y_4 = 0.024 m; Δy = 0.006 m.  
*Why:* Direct subtraction recovers β = λD/d.  
**y_3 = 1.8 cm, β = 6.0 mm**

*Reflection:* Forces explicit use of both position and difference formulae, exposing any algebraic sign error.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using sin θ = θ without checking D ≫ y | Forgets the small-angle premise             | Compute tan θ at the edge of the screen first |
| Confusing fringe width with angular spacing | Mixes linear β with Δθ = λ/d                | Always convert via β = D Δθ after derivation |
| Taking |m| = 1/2 for bright fringes     | Reverses bright/dark conditions             | Write δ = mλ (bright) and δ = (m+1/2)λ (dark) explicitly |
| Forgetting that β is identical for bright and dark fringes | Thinks only maxima spacing matters          | Derive both sets; spacing is the same        |
| Applying formula when slits are not equally illuminated | Violates coherence assumption               | Verify single-source illumination or add beamsplitter |
| Measuring D from slits to screen centre instead of perpendicular foot | Geometry error                              | Use the optical-axis distance, not hypotenuse |
| Ignoring that β decreases with larger d | Intuition that “more separation = bigger pattern” | Remember δ grows faster with d, compressing fringes |

## 7. The textbook-precise statement
In the paraxial limit (D ≫ d, |y| ≪ D), the irradiance pattern produced by two coherent, monochromatic, line sources of equal amplitude separated by distance d is
$$
I(y) = 4I_0\cos^2\left(\frac{\pi d y}{\lambda D}\right).
$$
The distance between consecutive maxima is therefore
$$
\beta = \frac{\lambda D}{d}.
$$
(Hecht, *Optics*, 5e, §9.3.2, Eq. 9.32–9.33).

## 8. Visual — diagram or schematic
```text
          Slit plane          Screen (D away)
   y ↑     slit 1 ───┐
            (0, +d/2)  \ 
                       \   θ
                        \   
                         \  
                          \ 
           midline ────────P(y)
                        /  
                       /   
            (0,-d/2)  /    
   slit 2 ───┘
          x = 0               x = D
```
Path difference δ = d sin θ ≈ d (y/D). Bright fringes occur at y_m = m λ D / d.

## 9. The memory technique
1. **The hook** — Picture two flashlights on a distant wall: the farther apart the flashlights (larger d), the finer the stripes; the farther the wall (larger D), the wider the stripes—exactly the inverse dependence in β = λD/d.  
2. **What to overlearn** — β = λD/d; the small-angle substitution sin θ ≈ y/D; bright condition δ = mλ.  
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from path difference δ = d sin θ → phase condition → linear y(m) → subtraction.

## 10. What this unlocks
Mastery of the fringe-width derivation is the direct gateway to every multi-beam interference device.  

- Diffraction gratings and their resolving power  
- Michelson and Mach–Zehnder interferometers  
- Thin-film and Fabry–Pérot fringes  
- Fourier-optics treatment of aperture arrays  
- Holographic recording geometry  

## 11. Self-check — five questions, no answers
1. A double-slit apparatus is immersed in water (n = 4/3). By what factor does β change if λ is taken as the vacuum wavelength?  
2. Two fringes are observed 3.2 mm apart on a screen 1.5 m away with 633 nm light; calculate the slit separation.  
3. Why does the central fringe remain bright even when the source is a finite-width slit rather than a perfect point?  
4. If the screen is tilted by 5° around the central axis, does the measured β increase, decrease, or stay the same to first order?  
5. Derive the exact (non-paraxial) expression for the position of the m-th bright fringe and show that β is no longer constant.