## 1. The one-sentence answer
**The Rayleigh criterion defines the smallest angular separation at which two point sources remain distinguishable through a circular aperture as the angle where the central maximum of one Airy diffraction pattern falls exactly on the first minimum of the other.**

Light passing any finite aperture spreads into a diffraction pattern rather than forming a perfect point image. For a circular aperture the intensity distribution is the Airy function, whose central disk is surrounded by concentric rings. When two such patterns approach each other, the combined intensity shows a dip between the peaks; the Rayleigh limit occurs when that dip reaches a precise depth set by the first zero of the Airy function.

This limit is therefore not an arbitrary rule of thumb but the direct geometric consequence of the wave nature of light and the circular symmetry of most optical instruments.

> [!NOTE]
> The factor 1.22 arises solely from the first zero of the Bessel function that describes circular diffraction; change the aperture shape and the numerical prefactor changes.

## 2. Why this matters — concrete and current
The James Webb Space Telescope’s 6.5 m primary mirror yields a Rayleigh-limited angular resolution of approximately 0.03 arcseconds at 2 µm; this value sets the minimum separation at which the telescope can separate a planet from its host star in direct-imaging campaigns.  

In semiconductor manufacturing, ASML’s extreme-ultraviolet lithography scanners use the Rayleigh criterion (with k₁ ≈ 0.25–0.3) to determine the smallest printable half-pitch on a wafer; the same formula governs overlay metrology tools that must resolve alignment marks separated by only a few tens of nanometres.  

Synthetic-aperture radar on ESA’s Sentinel-1 satellites achieves azimuthal resolution governed by the same 1.22 λ/D relation applied to the effective antenna length after Doppler processing; mission planners therefore size orbital altitude and antenna dimensions together.  

Ground-based optical tracking of space debris at facilities such as the Zimmerwald Observatory employs Rayleigh-limited predictions to decide whether two catalogued objects can be distinguished on a single frame, directly affecting collision-avoidance alerts issued to operators of low-Earth-orbit constellations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-slit diffraction  | Supplies the amplitude integral that becomes the Airy pattern after circular integration |
| Bessel functions         | The radial part of the circular-aperture Fourier transform yields J₁(x)/x |
| Angular diameter         | Resolution is expressed as an angle because linear size at the object depends on distance |
| Coherent vs. incoherent illumination | Rayleigh’s derivation assumes incoherent sources; partial coherence alters the dip depth |

## 4. Building the idea — from intuition to formalism

### Step 1 — Diffraction from a single circular aperture
A plane wave incident on a circular hole of diameter D produces, in the focal plane of a lens, an amplitude distribution proportional to the Fourier transform of the circular pupil. The resulting intensity pattern is rotationally symmetric.

For a 10 cm aperture illuminated by 500 nm light focused by a 1 m lens, the central bright disk has a radius of roughly 6 µm on the focal plane.

The amplitude is given by  
$$
U(\theta) = U_0 \frac{J_1(k a \sin\theta)}{k a \sin\theta},
$$  
where a = D/2 and k = 2π/λ.

> [!WARNING]
> Omitting the circular geometry and reusing the sinc function from a rectangular slit produces an incorrect first-zero location (1.0 instead of 1.22).

### Step 2 — Location of the first minimum
The first zero of the Airy pattern occurs where J₁(x) = 0 at x ≈ 3.8317. Substituting x = k a sinθ yields the angular radius of the central disk.

For visible light and a modest telescope this angle is a few arcseconds—large enough that stars appear as disks rather than points.

The angle to the first minimum satisfies  
$$
\sin\theta = 1.22 \frac{\lambda}{D}.
$$

> [!WARNING]
> Using the small-angle approximation sinθ ≈ θ too early hides the fact that the exact expression remains valid at larger angles.

### Step 3 — Superposition of two incoherent Airy patterns
Two point sources separated by angle φ produce two shifted Airy patterns whose intensities add because the sources are mutually incoherent.

At φ equal to the radius of the first dark ring the composite intensity midway between the peaks drops to approximately 0.81 of either peak value, producing a detectable saddle.

The composite intensity is  
$$
I(\phi) = I_0\left[ \left(\frac{2J_1(ka\sin\psi)}{ka\sin\psi}\right)^2 + \left(\frac{2J_1(ka\sin(\psi-\phi))}{ka\sin(\psi-\phi)}\right)^2 \right],
$$  
where ψ is the observation angle.

> [!WARNING]
> Treating the sources as coherent adds an interference term that can fill the dip completely and destroy resolvability.

### Step 4 — Definition of the Rayleigh limit
The conventional Rayleigh criterion declares the sources just resolved when the angular separation equals the angular radius of the first dark ring.

This choice is conventional yet reproducible; any other fixed dip depth could be chosen, but 1.22 λ/D has become the universal benchmark.

Thus the resolving power is stated as  
$$
\theta_R = 1.22 \frac{\lambda}{D}.
$$

### Step 5 — From angle to linear resolution
At large distance L the smallest resolvable linear separation is s = L θ_R (small-angle form). This converts the angular limit into a length useful for microscope objectives or satellite imaging.

## 5. Worked examples — every step shown

**Example 1 — Naked-eye resolution of headlights**  
*Given:* λ = 550 nm, D = 5 mm (pupil).  
*Find:* θ_R.  

Step 1: Insert values into the formula.  
$$
\theta_R = 1.22 \frac{550 \times 10^{-9}}{5 \times 10^{-3}} = 1.342 \times 10^{-4}\ \text{rad}.
$$  
*Why:* Direct substitution of the Rayleigh expression.  

Step 2: Convert to arcminutes.  
$$
1.342 \times 10^{-4} \times \frac{180}{\pi} \times 60 \approx 0.46'.
$$  
*Why:* Useful unit for visual comparisons.  

**0.46 arcmin**  

*Reflection:* The calculation shows why car headlights at 1 km appear merged to the unaided eye.

**Example 2 — Hubble Space Telescope at 500 nm**  
*Given:* D = 2.4 m, λ = 500 nm.  
*Find:* θ_R in arcseconds.  

$$
\theta_R = 1.22 \frac{5 \times 10^{-7}}{2.4} = 2.54 \times 10^{-7}\ \text{rad} \approx 0.052''.
$$  
*Why:* Same formula, different scale.  

**0.052 arcsec**  

*Reflection:* Demonstrates that diffraction, not the atmosphere, ultimately limits HST resolution.

**Example 3 — Two stars at 10 pc**  
*Given:* θ_R = 0.05 arcsec, distance = 10 pc.  
*Find:* minimum linear separation.  

$$
s = 10\ \text{pc} \times 0.05'' = 0.5\ \text{AU}.
$$  
*Why:* Small-angle conversion s = L θ with consistent units.  

**0.5 AU**  

*Reflection:* Shows that even the nearest stars require separations comparable to solar-system scales for resolution.

**Example 4 — Radar antenna at 3 cm wavelength**  
*Given:* D = 3 m, λ = 3 cm.  
*Find:* θ_R and linear resolution at 500 km slant range.  

$$
\theta_R = 1.22 \frac{0.03}{3} = 0.0122\ \text{rad}.
$$  
*Why:* Formula unchanged.  

Linear size:  
$$
s = 500 \times 10^3 \times 0.0122 \approx 6.1\ \text{km}.
$$  
*Why:* Direct multiplication after confirming small-angle validity.  

**6.1 km**  

*Reflection:* Illustrates why longer radar wavelengths demand impractically large antennas for fine ground resolution.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using 1.0 λ/D instead of 1.22 λ/D | Confusing rectangular-slit sinc zero with circular Bessel zero | Always verify aperture shape before choosing the prefactor |
| Treating the criterion as a hard physical cutoff | The 81 % dip is a convention; images can sometimes be deconvolved below it | State explicitly that Rayleigh is a benchmark, not an absolute limit |
| Applying the formula to coherent laser sources | Coherent addition fills the central dip | Check source mutual coherence before inserting numbers |
| Forgetting the obliquity factor at large angles | sinθ ≈ θ assumed without checking θ ≪ 1 | Retain the exact sinθ expression when θ > 10° |
| Confusing angular and linear resolution | Reporting metres when arcseconds are required | Keep a clear variable for distance L and convert only at the end |
| Ignoring central obscuration in Cassegrain telescopes | The inner secondary mirror modifies the Airy pattern | Use the appropriate annular-aperture Bessel combination |
| Quoting resolution at the wrong wavelength | Broadband detectors have λ-dependent limits | Specify the wavelength or integrate over the bandpass |

## 7. The textbook-precise statement
For a circular aperture of diameter D illuminated by quasi-monochromatic incoherent light of wavelength λ, two point sources are defined to be just resolved when their angular separation satisfies  

$$
\theta_R = 1.22 \frac{\lambda}{D}.
$$  

This definition follows from placing the centre of one Airy pattern at the first zero of the second, producing a composite intensity whose saddle is 0.81 of the peak value (Born & Wolf, *Principles of Optics*, 7e, §8.5.2).

## 8. Visual — diagram or schematic
```text
Intensity
   ^
   |          Airy 1                  Airy 2
   |        .–·–·.                 .–·–·.
   |      .'       '.             .'       '.
   |    .'           '.         .'           '.
   |___/               \_______/               \___
   |   \               /       \               /
   |    '._         _.'         '._         _.'
   |       '–·–·–·–'               '–·–·–·–'
   +---------------------------------------------> angle
             ↑                     ↑
          centre of           first min of
           Airy 2               Airy 1
```
The diagram shows two identical Airy patterns whose angular centres are separated by exactly the radius of the first dark ring; the vertical dashed line marks the location of the intensity saddle used by the Rayleigh criterion.

## 9. The memory technique
**The hook** — Picture two overlapping wagon wheels whose spokes just touch rim-to-hub; the point where the second wheel’s spoke crosses the first wheel’s rim is the Rayleigh “just-resolved” position.

**What to overlearn**  
- θ_R = 1.22 λ/D (exact numerical factor and aperture shape)  
- The factor originates from the first zero of J₁(x) at 3.8317  

**Spaced-repetition schedule** — Review the formula and the Bessel origin at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback** — Re-derive the Airy pattern by performing the Fourier transform of the circular pupil, locate the first zero of J₁, and impose the geometric shift condition.

## 10. What this unlocks
Mastery of the Rayleigh criterion supplies the quantitative link between aperture size, wavelength, and image detail that underpins every subsequent treatment of optical instrumentation.

- Abbe resolution limit and the concept of numerical aperture  
- Sparse-aperture imaging and interferometric baselines (Michelson stellar interferometer)  
- Deconvolution algorithms that attempt to surpass the classical limit  
- Design trade-offs for segmented-mirror telescopes and synthetic-aperture radar

## 11. Self-check — five questions, no answers
1. A 0.5 m telescope observes at 800 nm; calculate θ_R and state whether the result is limited by diffraction or by typical atmospheric seeing of 1 arcsec.  
2. Two incoherent point sources produce a central dip of exactly 0.81 when their separation equals 1.22 λ/D; what happens to the dip depth if the sources are made mutually coherent with zero phase difference?  
3. Derive the numerical prefactor 1.22 from the first zero of the appropriate Bessel function without quoting the final formula.  
4. An annular aperture has inner diameter 0.3D and outer diameter D; qualitatively predict whether its Rayleigh angle will be larger or smaller than that of a filled aperture of diameter D, and justify the direction of change.  
5. A radar system at λ = 3 cm must resolve two aircraft 50 m apart at 30 km range; determine the minimum antenna diameter required under the Rayleigh criterion and identify one practical reason the actual antenna might need to be larger.