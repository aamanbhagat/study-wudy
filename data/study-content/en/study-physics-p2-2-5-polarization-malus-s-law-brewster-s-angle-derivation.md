## 1. The one-sentence answer
**Malus’s law and Brewster’s angle together describe how the intensity and reflection of linearly polarized light depend on the angle between the polarization direction and an analyzer or interface.**

Light consists of transverse electromagnetic waves whose electric-field vectors can point in any direction perpendicular to the propagation axis. When these waves encounter a polarizer, only the component of the electric field aligned with the polarizer’s transmission axis passes; the orthogonal component is rejected. The transmitted intensity is therefore proportional to the square of the cosine of the angle between the incident polarization and the transmission axis. At an interface between two dielectrics, the same transverse character produces an angle at which the reflected ray contains no p-polarized component; that angle satisfies a simple tangent relation derived from continuity of the tangential field components.

The square-cosine dependence arises because detectors register energy flux, which scales with the square of field amplitude. The Brewster condition follows from the requirement that the reflected and refracted rays be orthogonal, so the dipole radiation pattern of the medium has a null in the reflection direction for p-polarization.

> [!NOTE]
> The single most important insight is that polarization is not an extra property added to light; it is the direction of the electric-field oscillation itself, and every intensity or reflection rule follows directly from projecting that vector.

## 2. Why this matters — concrete and current
Satellite laser-communication terminals such as those on NASA’s Laser Communications Relay Demonstration use Brewster-angle windows on their optical benches to eliminate reflection losses for one polarization, raising link margins by 0.5 dB without added coatings.

Liquid-crystal spatial light modulators in adaptive-optics systems for ground-based telescopes (e.g., the Extremely Large Telescope) rely on Malus’s law to set pixel-by-pixel intensity; calibration routines measure the cosine-squared curve to 0.1 % accuracy to correct for retardance drift.

Polarimetric radar on ESA’s Sentinel-1 satellites distinguishes oil slicks from biogenic films by measuring the degree of polarization of backscattered microwaves; the underlying Fresnel coefficients are identical in form to the optical Brewster derivation, only scaled by wavelength.

Semiconductor foundries employ in-line ellipsometers at 193 nm that null the reflected p-component at the Brewster angle of the photoresist stack; this single-angle measurement determines film thickness to sub-nanometer precision during high-volume manufacturing.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Transverse wave nature   | Polarization is defined only for transverse fields        |
| Vector projection        | Intensity after a polarizer is a dot-product squared      |
| Snell’s law              | Brewster derivation equates reflected and refracted angles |
| Fresnel coefficients     | Amplitude reflection ratios must vanish for p-polarization |
| Energy flux ∝ |E|²     | Detectors measure irradiance, not field amplitude         |

## 4. Building the idea — from intuition to formalism

### Step 1 — Electric-field vector of a plane wave
A monochromatic plane wave carries an oscillating electric field that lies in the plane perpendicular to the propagation direction. Any such field can be decomposed into two orthogonal components, conventionally called s (senkrecht, perpendicular to the plane of incidence) and p (parallel).  

Consider a wave traveling along z with amplitude E₀ at angle θ to the x-axis:  
Eₓ = E₀ cos θ, Eᵧ = E₀ sin θ.  

The time-averaged power flux is proportional to |E|², so the decomposition is not arbitrary; it directly determines transmitted intensity later.

> [!WARNING]
> Treating polarization as a scalar “filter” instead of a vector projection produces the wrong power law (linear cosine instead of cosine squared).

### Step 2 — Action of an ideal linear polarizer
An ideal polarizer transmits only the field component parallel to its axis and extinguishes the orthogonal component. If the incident field makes an angle φ with the transmission axis, the transmitted amplitude is E₀ cos φ.

### Step 3 — Intensity from amplitude
Irradiance I is proportional to the square of the electric-field amplitude. Therefore the transmitted intensity is  
I = I₀ cos² φ,  
where I₀ is the incident intensity. This is Malus’s law.

### Step 4 — Geometry at a dielectric interface
At an interface, the plane of incidence is defined by the incident ray and the surface normal. The s-component is perpendicular to this plane; the p-component lies within it. Boundary conditions require continuity of tangential E and normal D.

### Step 5 — Brewster condition
For p-polarization the reflected amplitude vanishes when the reflected ray is perpendicular to the refracted ray. In that geometry the dipole oscillation induced in the second medium has a radiation null exactly along the reflection direction. Geometry plus Snell’s law then yields  
tan θ_B = n₂ / n₁.

### Step 6 — Derivation of Brewster’s angle
Apply Snell’s law n₁ sin θᵢ = n₂ sin θₜ.  
Set θᵢ + θₜ = 90° so θₜ = 90° – θᵢ and sin θₜ = cos θᵢ.  
Then n₁ sin θᵢ = n₂ cos θᵢ, hence tan θᵢ = n₂ / n₁.  
This is the textbook Brewster angle.

## 5. Worked examples — every step shown

**Example 1 — Simple Malus measurement**  
*Given:* Unpolarized light of intensity 4.0 W m⁻² passes through a polarizer whose axis is at 30° to an analyzer.  
*Find:* Transmitted intensity after the analyzer.  

Incident light is unpolarized, so after the first polarizer I₁ = 2.0 W m⁻².  
Angle between polarizer and analyzer is 30°.  
I₂ = I₁ cos² 30° = 2.0 × (√3/2)² = 1.5 W m⁻².  

*Why* each step follows the vector projection and squaring rule.  
**1.5 W m⁻²**

*Reflection:* The factor of ½ for unpolarized input is the only new element; the cosine-squared law itself is unchanged.

**Example 2 — Crossed polarizers with half-wave plate**  
*Given:* Two crossed polarizers (φ = 90°). A half-wave plate at 22.5° is inserted.  
*Find:* Output intensity relative to input.  

The wave plate rotates the polarization by 45°. Effective angle to analyzer becomes 45°.  
I_out / I₀ = (½) cos² 45° = 0.25.  

*Why* the rotation angle is twice the plate angle follows from Jones-matrix algebra.  
**0.25**

*Reflection:* Students often forget the initial ½ from the first polarizer.

**Example 3 — Brewster angle for glass**  
*Given:* Air–glass interface, n_glass = 1.52.  
*Find:* θ_B.  

tan θ_B = 1.52 ⇒ θ_B = arctan(1.52) ≈ 56.7°.  

*Why* the tangent appears is the orthogonality condition above.  
**56.7°**

*Reflection:* The result is independent of wavelength only for non-dispersive media.

**Example 4 — Malus plus Fresnel at Brewster**  
*Given:* s-polarized light incident at θ_B on the same glass.  
*Find:* Reflected intensity fraction.  

At Brewster, r_p = 0; r_s = –(n₁ cos θᵢ – n₂ cos θₜ)/(n₁ cos θᵢ + n₂ cos θₜ).  
With θₜ = 90° – θᵢ the expression simplifies to r_s = –sin(θᵢ – θₜ)/sin(θᵢ + θₜ).  
Numerical evaluation yields |r_s|² ≈ 0.15.  

*Why* only s survives is the dipole-null argument.  
**15 % reflected (s-pol)**

*Reflection:* This example links Malus and Brewster through the same boundary conditions.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using cos φ instead of cos² φ     | Confusing amplitude with intensity          | Always square the projected field            |
| Applying Brewster to metals       | Metals have complex n; Fresnel equations change | Check that both media are lossless dielectrics |
| Forgetting the ½ for unpolarized light | Treating I₀ as already polarized            | Insert an explicit first polarizer step      |
| Confusing θ_B with critical angle | Both involve n₂/n₁ but different geometry   | Draw the reflected-refracted orthogonality   |
| Sign error in r_s at Brewster     | Misidentifying s versus p orientation       | Fix the plane-of-incidence convention once   |
| Ignoring dispersion               | n(λ) changes θ_B measurably in UV           | Use Sellmeier coefficients when λ is given   |
| Assuming ideal polarizers         | Real devices have finite extinction ratio   | Multiply by measured extinction ratio        |

## 7. The textbook-precise statement
Malus’s law: If linearly polarized light of intensity I₀ is incident on an ideal linear polarizer whose transmission axis makes angle φ with the polarization direction, the transmitted intensity is  
I = I₀ cos² φ.  

Brewster’s law: At the interface between two lossless dielectrics of refractive indices n₁ and n₂, the p-polarized Fresnel reflection coefficient vanishes when the angle of incidence satisfies  
θ_B = arctan(n₂ / n₁).  

(Hecht, *Optics*, 5e, §8.3 and §4.3.)

## 8. Visual — diagram or schematic
```text
          air (n₁)
            |
  incident  |  reflected
     ray    |   ray
       \    |    /
        \ θᵢ|θᵣ/
         \  |  /
----------\-+-\-------- interface
           \ | /
            \|/ θₜ
             v
          glass (n₂)
```
At Brewster’s angle, θᵢ + θₜ = 90°, so the reflected ray lies along the direction of zero dipole radiation for p-polarization.

## 9. The memory technique
1. **The hook** — Picture a chain-link fence: only the pickets aligned with the polarization “bars” let the wave through; everything else is blocked. Intensity is the square of how much bar overlaps.

2. **What to overlearn**  
   – I = I₀ cos² φ (Malus)  
   – tan θ_B = n₂/n₁ (Brewster)  
   – Brewster geometry: reflected ⊥ refracted

3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive from boundary conditions: set tangential E continuous, demand reflected p-amplitude = 0, impose θᵢ + θₜ = 90°.

## 10. What this unlocks
These two results are the foundation for Jones and Mueller calculus, liquid-crystal device modeling, and all thin-film coating design.

- Next: Jones vectors and retarders  
- Ellipsometry and Stokes parameters  
- Polarization in anisotropic media (wave plates, birefringence)  
- Anti-reflection coatings that exploit the Brewster minimum

## 11. Self-check — five questions, no answers
1. Unpolarized light passes through three polarizers at 0°, 30°, 60°. What fraction of the original intensity emerges?

2. Show that at Brewster’s angle the reflected and refracted rays are perpendicular for any n₁, n₂.

3. A laser beam reflects from water (n = 1.33) at 53°. Is the reflected light purely s-polarized? Quantify the residual p-component if any.

4. Two polarizers are set for minimum transmission. A third is inserted at angle α. Derive the transmitted intensity as a function of α.

5. Why does Malus’s law fail for partially polarized or circularly polarized light, and what single measurement replaces it?