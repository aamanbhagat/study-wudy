## 1. The one-sentence answer
**Aberrations are the deviations from ideal image formation that occur in real optical systems because lenses and mirrors do not focus all rays of light to a single point.**

Chromatic aberration arises because the refractive index of glass changes with wavelength, so different colours bend by different amounts and focus at different planes. Spherical aberration arises because rays striking a spherical surface at different distances from the optical axis encounter different effective curvatures and therefore converge to different points along the axis.

Both effects degrade image sharpness and introduce colour fringing or blur. In rocket-science contexts they limit the performance of star trackers, laser communication terminals and high-resolution Earth-imaging payloads.

> [!NOTE]
> The single most important “aha” is that both aberrations are geometric consequences of Snell’s law applied to real surfaces; they are not mysterious failures but predictable results of using one refractive index or one radius for all rays.

## 2. Why this matters — concrete and current
NASA’s Europa Clipper uses a Ritchey-Chrétien telescope whose hyperbolic mirrors are deliberately chosen to cancel spherical aberration at the design wavelength; residual chromatic aberration is controlled by narrow-band filters so that the ice-penetrating radar calibration images remain diffraction-limited.

SpaceX Starlink satellites carry optical inter-satellite links whose collimating lenses are designed with achromatic doublets; uncorrected chromatic aberration would shift the 1550 nm beam focus by several micrometres across the 0.1 nm linewidth of the laser, dropping link margin below the required 3 dB.

Semiconductor lithography steppers from ASML employ catadioptric systems whose spherical surfaces are corrected to λ/100 rms; even 10 nm of residual spherical aberration at 193 nm would blur the 3 nm node features beyond the 2 nm overlay budget.

Atmospheric seeing monitors on large telescopes (ESO VLT) measure chromatic aberration induced by dispersion in the turbulent layers; the data feed real-time tip-tilt and dispersion-correcting prisms that keep the adaptive-optics loop stable for laser-guide-star tracking.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Snell’s law \(n_1\sin\theta_1=n_2\sin\theta_2\) | Explains why rays bend differently for each wavelength and each height on a spherical surface |
| Paraxial ray approximation (\(\sin\theta\approx\theta\)) | Defines the ideal thin-lens behaviour that aberrations violate |
| Dispersion relation \(n(\lambda)\) | Quantifies how refractive index varies with colour |
| Optical path length and wavefront error | Converts geometric ray errors into measurable blur and Strehl ratio |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Different speeds inside glass
White light entering a lens slows down by different amounts for each colour because glass is dispersive. Red travels faster than violet, so the optical path length for red is shorter inside the same physical thickness. Consequently the wavefront for red curves less and focuses farther away.

Concrete example: a plano-convex lens of BK7 glass focuses 656 nm light 2.3 mm beyond the 486 nm focus when the nominal focal length is 100 mm.

Formal statement: the focal length of a thin lens is
\[
\frac{1}{f(\lambda)}=\bigl(n(\lambda)-1\bigr)\Bigl(\frac{1}{R_1}-\frac{1}{R_2}\Bigr).
\]

> [!WARNING]
> Treating \(n\) as constant hides the entire wavelength dependence; the lens equation then appears perfect when it is not.

### Step 2 — Height-dependent refraction on a sphere
A spherical surface has constant radius, yet the angle between the surface normal and the optical axis grows with ray height \(h\). Marginal rays therefore experience a larger angle of incidence and bend more (or less) than paraxial rays.

Formal statement: exact sagitta gives surface slope
\[
\tan\alpha=\frac{h}{R-\sqrt{R^2-h^2}}.
\]

### Step 3 — Longitudinal spherical aberration
Because marginal and paraxial rays focus at different axial locations, the image of a point source becomes a caustic rather than a point. The distance between the paraxial focus and the marginal focus is the longitudinal spherical aberration (LSA).

### Step 4 — Wavefront error from ray error
Each ray’s deviation from the ideal focus corresponds to an optical path difference (OPD). The rms wavefront error \(\sigma\) determines Strehl ratio \(\approx e^{-(2\pi\sigma/\lambda)^2}\). Even 0.07 waves rms drops peak intensity by 20 %.

### Step 5 — Achromatic doublet construction
A positive crown lens and a negative flint lens can be paired so that their dispersions cancel at two wavelengths while net power remains positive. The condition is
\[
\frac{\omega_1}{f_1}+\frac{\omega_2}{f_2}=0,
\]
where \(\omega\) is the Abbe number. This removes first-order chromatic aberration but leaves higher-order residuals.

### Step 6 — Aspheric or conic correction for spherical aberration
Replacing the spherical surface with a conic of eccentricity
\[
e^2=1+\frac{K(n-1)^2}{n^2}
\]
makes all zones focus to the same point for one wavelength. This is the principle behind parabolic mirrors and modern aspheric lenses.

### Step 7 — Textbook-grade summary
Combining the above, the Seidel aberration coefficients for a thin lens give explicit expressions for both longitudinal chromatic aberration and third-order spherical aberration; these coefficients are the starting point for any optical design software.

## 5. Worked examples — har step show karo

**Example 1 — Simple focal shift with wavelength**
*Given:* BK7 plano-convex lens, \(R_1=51.6\) mm, \(R_2=\infty\), \(n_F=1.5168\), \(n_C=1.5143\).
*Find:* difference in focal length between F and C lines.
\[
\frac{1}{f_F}=(1.5168-1)\frac{1}{51.6}\implies f_F=99.85\,\text{mm},
\]
\[
\frac{1}{f_C}=(1.5143-1)\frac{1}{51.6}\implies f_C=100.05\,\text{mm}.
\]
Difference = 0.20 mm.  
*Why:* only the refractive-index term changed; radii stayed fixed.  
**Final answer:** 0.20 mm longitudinal chromatic aberration.

*Reflection:* shows that even a 0.0025 change in \(n\) produces measurable focus shift.

**Example 2 — Marginal-ray focus for spherical surface**
*Given:* spherical mirror \(R=200\) mm, ray at height \(h=20\) mm.
*Find:* intersection point of marginal ray.
Exact reflection angle yields focus at 99.0 mm instead of paraxial 100 mm.  
*Why:* surface normal tilts by \(\alpha=\arcsin(20/200)\).  
**Final answer:** LSA = 1.0 mm.

*Reflection:* the 1 % error appears immediately once the small-angle assumption is dropped.

**Example 3 — Achromatic doublet design**
*Given:* crown \(n_d=1.517\), \(\omega=64.2\); flint \(n_d=1.620\), \(\omega=36.3\). Desired \(f=100\) mm.
Solve
\[
f_1=100\times\frac{64.2-36.3}{64.2}=43.5\,\text{mm},\quad f_2=-70.0\,\text{mm}.
\]
*Why:* opposite powers weighted by Abbe numbers cancel dispersion.  
**Final answer:** doublet focal length 100 mm, chromatic aberration zero to first order.

*Reflection:* demonstrates the classic two-glass solution.

**Example 4 — Wavefront error to Strehl**
*Given:* 0.1 wave rms spherical aberration at 550 nm.
Strehl ratio \(\approx\exp(-(2\pi\times0.1)^2)=0.67\).  
*Why:* quadratic mapping from OPD variance to intensity loss.  
**Final answer:** 67 % peak intensity.

*Reflection:* quantifies when aberration becomes unacceptable for diffraction-limited systems.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using single \(n\) for all colours | Textbook problems often omit dispersion table | Always look up \(n_F\), \(n_d\), \(n_C\) before calculating \(f\) |
| Confusing longitudinal with transverse aberration | Both are called “spherical aberration” in casual speech | Specify LSA (mm along axis) or TSA (mm in focal plane) |
| Ignoring pupil position | Spherical aberration changes with stop location | Trace chief and marginal rays from the actual aperture stop |
| Assuming achromat removes all colour error | Only two wavelengths are corrected | Check secondary spectrum with three-line calculation |
| Using paraxial sagitta formula for aspheres | Higher-order terms dominate at large apertures | Switch to exact surface equation or Zemax-type ray trace |
| Forgetting that mirrors have no chromatic aberration | Reflection law independent of \(\lambda\) | Use mirrors when broad-band performance is required |

## 7. The textbook-precise statement
In the paraxial domain a rotationally symmetric optical system forms a perfect image. When third-order terms are retained, the wavefront aberration function contains five Seidel sums; the first is spherical aberration \(S_I\) and the second longitudinal chromatic aberration \(C_I\). For a thin lens in air these are given explicitly in Born & Wolf, *Principles of Optics*, 7e, §5.3:
\[
S_I=\frac{h^4}{8}\Bigl(\frac{n}{n-1}\Bigr)^2\Bigl(\frac{1}{R_1}-\frac{1}{R_2}\Bigr)^3\Bigl(\frac{n+2}{n(n-1)}\Bigr),
\]
\[
C_I=\frac{h^2}{2}\frac{\mathrm{d}n}{\mathrm{d}\lambda}\Bigl(\frac{1}{R_1}-\frac{1}{R_2}\Bigr).
\]
All symbols retain their conventional meanings and the thin-lens, monochromatic or two-line dispersion assumptions are stated in the surrounding text.

## 8. Visual — diagram or schematic
```
          optical axis
  o----------------------------->
          |            |
paraxial  |            | marginal
focus     |            | focus
   ●      |            |   ●
          |   lens     |
          \__________/
```
Marginal rays (outer) cross the axis before the paraxial focus, producing a longitudinal spread of length LSA. Different colours focus at yet other planes, giving chromatic spread.

## 9. The memory technique
1. **The hook** — picture a spherical lens as a “fat middle-aged mirror” that bends outer rays too much, while colours race at different speeds inside the same glass.
2. **What to overlearn** — (a) \(1/f=(n-1)(1/R_1-1/R_2)\), (b) Abbe condition \(\omega_1/f_1+\omega_2/f_2=0\), (c) Strehl \(\approx e^{-(2\pi\sigma/\lambda)^2}\).
3. **Spaced-repetition schedule** — review the three formulas on day 1, day 3, day 7, day 16 and day 35.
4. **First-principles fallback** — start from Snell’s law at two heights and two wavelengths; integrate the resulting ray slopes to locate foci.

## 10. What this unlocks
Mastery of chromatic and spherical aberration lets you read optical design prescriptions, specify tolerances for space payloads, and understand why Ritchey-Chrétien or apochromatic systems are chosen for a given mission.

- Next: Seidel sums and full aberration theory  
- Coma, astigmatism, field curvature, distortion  
- Wavefront sensing and adaptive optics correction  
- Zemax/Code V optimisation loops used in aerospace projects

## 11. Self-check — five questions, no answers
1. A BK7 singlet has \(f_d=100\) mm. Calculate the F–C focal shift using standard Abbe numbers.
2. For a spherical mirror of radius 500 mm, at what ray height does longitudinal spherical aberration reach 2 mm?
3. Design a thin achromatic doublet of 200 mm focal length using BK7 and SF2; give the two focal lengths.
4. A system shows 0.05 waves rms spherical aberration at 633 nm. Is the Strehl ratio above or below 0.9?
5. Why does a parabolic mirror eliminate spherical aberration for all aperture heights at one wavelength but still suffer chromatic aberration if used with a refractive corrector?