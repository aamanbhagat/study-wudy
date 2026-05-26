## 1. The one-sentence answer
**Newton's rings arise from the interference of monochromatic light reflected from the top and bottom surfaces of a thin air film whose thickness increases radially between a plano-convex lens and a flat glass plate.**

The geometry produces a radially symmetric film whose local thickness t is fixed by the curvature of the lens. Light reflected from the two boundaries of this film travels slightly different paths; the resulting phase difference determines whether the waves reinforce or cancel at each radius. Because thickness grows quadratically with radial distance, the loci of constructive and destructive interference appear as concentric circles.

The derivation therefore consists of three linked calculations: (i) relating film thickness to radial position, (ii) writing the optical-path difference including the π phase shift that occurs at one reflection but not the other, and (iii) converting the resulting condition on t into an expression for observable ring radii.

> [!NOTE]
> The single most important insight is that the extra λ/2 path difference introduced by the phase reversal at the glass–air interface inverts the usual bright/dark conditions, so the centre (t = 0) is dark in reflected light.

## 2. Why this matters — concrete and current
In semiconductor lithography, Newton-ring metrology is still used to verify the flatness of photomask substrates to <10 nm over 150 mm diameters; ASML and Nikon employ automated versions of the same geometry to qualify reticles before extreme-ultraviolet exposure.

Space-based optical payloads such as the James Webb Space Telescope’s primary-mirror segments were aligned on the ground using Newton-ring interferometers to confirm that residual air-gap errors remained below the 50 nm wavefront budget required for diffraction-limited performance at 2 µm.

Precision lens manufacturers (Zeiss, Canon) use real-time Newton-ring analysis during cementing of doublet elements; deviations from the predicted ring pattern directly flag adhesive thickness errors that would otherwise produce astigmatism in high-numerical-aperture objectives.

In fundamental physics, the same geometry appears in cavity optomechanics experiments where a curved mirror and a flat membrane form a “Newton-ring” resonator; the radial mode spacing derived from the ring formula sets the free-spectral range that couples mechanical motion to optical readout.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Thin-film interference   | Supplies the condition 2t = mλ or (m + 1/2)λ after phase shifts |
| Phase change on reflection | Determines whether the central spot is bright or dark     |
| Sagitta approximation    | Converts lens curvature into local air-film thickness t(r) |
| Geometry of a sphere     | Gives the exact relation t = r²/(2R) for small t          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Curved surface meets flat plate
A plano-convex lens of radius of curvature R rests on an optical flat. At the point of contact the air gap is zero; farther out the gap widens.  
Example: for R = 1 m, at r = 1 mm the gap is only 0.5 µm—still << visible wavelengths.  
The exact relation follows from the sagitta of a spherical cap:  
$$t(r)=\frac{r^2}{2R}.$$  
> [!WARNING]
> Using the full spherical equation instead of the paraxial sagitta introduces higher-order terms that are negligible only when r ≪ R; otherwise the rings are no longer perfectly circular.

### Step 2 — Two reflections, one phase reversal
Light reflected at the lower surface of the lens (glass-to-air) suffers a π phase shift; light reflected at the upper surface of the flat (air-to-glass) does not.  
The net effect is an extra λ/2 path difference independent of film thickness.  
Formal statement: reflected amplitudes acquire a relative phase of π.

### Step 3 — Optical path difference inside the film
A ray traversing the film twice travels an extra geometrical distance 2t. Because the film is air (n = 1), the optical-path difference is simply 2t. Adding the fixed λ/2 from the phase reversal gives the total effective path difference  
$$\delta=2t+\frac{\lambda}{2}.$$

### Step 4 — Condition for destructive interference (reflected light)
Destructive interference occurs when δ = mλ (m = 0,1,2,…):  
$$2t+\frac{\lambda}{2}=m\lambda\quad\Rightarrow\quad 2t=\left(m-\frac{1}{2}\right)\lambda.$$  
At the centre, t = 0 forces m = 0, so the central spot is dark.

### Step 5 — Substitute thickness
Insert t(r) = r²/(2R):  
$$2\cdot\frac{r^2}{2R}=\left(m-\frac{1}{2}\right)\lambda\quad\Rightarrow\quad r^2=\left(m-\frac{1}{2}\right)\lambda R.$$  
For the m-th dark ring (reflected light) the radius is therefore  
$$r_m=\sqrt{\left(m-\frac{1}{2}\right)\lambda R}.$$

### Step 6 — Bright rings and transmitted light
For constructive reflection the condition flips to 2t = mλ, yielding  
$$r_m=\sqrt{m\lambda R}.$$  
In transmission the phase-reversal situation is reversed, swapping bright and dark rings.

## 5. Worked examples — every step shown

**Example 1 — Radius of the first dark ring**  
*Given:* λ = 589 nm, R = 2.00 m.  
*Find:* r₁ (reflected light).  
Step: Use the dark-ring formula derived in Step 5.  
$$r_1=\sqrt{\left(1-\frac12\right)589\times10^{-9}\times2.00}=\sqrt{5.89\times10^{-7}}.$$  
*Why:* The factor (m – 1/2) accounts for the phase reversal.  
**5.89×10^{-4} m**  

*Reflection:* The calculation is direct once the phase shift is remembered; the same arithmetic applies to any m.

**Example 2 — Wavelength from measured ring**  
*Given:* r₅ = 3.50 mm (5th bright ring, reflected), R = 1.50 m.  
*Find:* λ.  
Step: Bright-ring formula rₘ² = m λ R.  
$$(3.50\times10^{-3})^2=5\lambda\times1.50.$$  
*Why:* m = 5 for the fifth bright ring.  
$$\lambda=\frac{1.225\times10^{-5}}{7.5}=1.633\times10^{-6}\ \text{m}=1633\ \text{nm}.$$  

*Reflection:* Solving for λ tests whether the student has the bright/dark assignment correct.

**Example 3 — Order at a given radius**  
*Given:* r = 2.00 mm, λ = 550 nm, R = 3.00 m.  
*Find:* nearest dark-ring order.  
Step: Solve m – 1/2 = r²/(λ R).  
$$m-0.5=\frac{(2\times10^{-3})^2}{550\times10^{-9}\times3.00}=2.424.$$  
*Why:* Rearrangement isolates the order.  
m ≈ 2.92 → closest dark ring is m = 3.  

*Reflection:* Fractional orders indicate the ring lies between two integer fringes.

**Example 4 — Ring spacing in transmitted light**  
*Given:* Same parameters as Example 1.  
*Find:* radius of first bright ring in transmission.  
Step: Transmission inverts the condition, so bright rings obey rₘ = √[(m – 1/2) λ R].  
$$r_1=\sqrt{0.5\times589\times10^{-9}\times2}=5.43\times10^{-4}\ \text{m}.$$  
*Why:* The phase reversal is absent in transmission.  

*Reflection:* Comparing reflected and transmitted patterns on the same apparatus immediately reveals the π shift.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Forgetting the λ/2 phase shift    | Students recall only the 2t term              | Always draw the two reflections and mark phase jumps |
| Using t = r²/R instead of r²/(2R) | Confusing sagitta with chord length           | Derive sagitta from Pythagoras once, then memorise   |
| Applying reflected conditions to transmitted light | Overlooking that phase reversal occurs only on reflection | State “reflected or transmitted?” before writing 2t = … |
| Treating m = 0 as bright at centre | Ignoring that δ = λ/2 at t = 0                | Check t = 0 case explicitly                          |
| Using air wavelength inside film  | Forgetting n = 1 for air                      | Write n explicitly even when n = 1                   |
| Measuring diameter instead of radius | Instrument shows full width                   | Halve the measured value before squaring             |
| Neglecting that R must be measured in the same units as r | Unit mismatch in r² = mλR                     | Convert to metres before numerical substitution      |

## 7. The textbook-precise statement
For an air film (n = 1) between a spherical surface of radius R and a plane surface, illuminated at normal incidence by monochromatic light of wavelength λ in vacuum, the radii of the dark interference rings observed in reflected light are given by  
$$r_m=\sqrt{\left(m+\frac12\right)\lambda R},\qquad m=0,1,2,\dots$$  
(Hecht, *Optics*, 5e, §9.4.2, Eq. 9.38, with sign convention for phase shift adjusted). The derivation assumes paraxial rays, negligible multiple reflections, and perfect contact at the origin.

## 8. Visual — diagram or schematic
```text
          plano-convex lens (glass, R)
               ___________________
              /                   \
             /      air film t(r)  \
            /                       \
   flat glass plate ---------------------
                |          ^
                |          | r
                |          v
          contact point (t=0)
```
Two rays: one reflected at lens–air interface (phase shift π), one at air–plate interface (no shift). Radial coordinate r measured from contact point; thickness t(r) = r²/(2R).

## 9. The memory technique
1. **The hook** — Picture Newton’s apple resting on a glass table; the tiny curved gap beneath it splits light into the rings that bear his name.  
2. **What to overlearn** — (i) t = r²/(2R), (ii) reflected dark rings obey rₘ² = (m + 1/2)λR, (iii) centre is always dark in reflection.  
3. **Spaced-repetition schedule** — Review the three facts at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from sagitta geometry, add the single π phase shift, then set 2t + λ/2 = mλ.

## 10. What this unlocks
Newton’s rings supply the calibration standard for measuring radius of curvature, refractive index of gases, and surface irregularities at the nanometre scale.  

- Thin-film coatings and anti-reflection layers  
- Michelson interferometer fringe analysis  
- Fabry–Pérot étalon spacing calibration  
- Optical-shop surface-figure testing (Fizeau and Newton comparators)  
- Modern coherence scanning interferometry algorithms

## 11. Self-check — five questions, no answers
1. A lens of R = 1.2 m produces a dark ring of radius 1.8 mm in reflected sodium light. What is the order m of that ring?  
2. Why does the central spot remain dark even when white light is used?  
3. If the same apparatus is viewed in transmission, where is the first bright ring relative to the reflected dark ring of order m = 1?  
4. A thin oil film (n = 1.4) is introduced into the gap. How does the radius of the m = 2 dark ring change?  
5. An experimenter records ring diameters instead of radii and forgets to halve them before substituting into rₘ² = (m + 1/2)λR. By what factor are the computed wavelengths wrong?