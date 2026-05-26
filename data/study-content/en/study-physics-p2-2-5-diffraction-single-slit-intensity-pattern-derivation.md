## 1. The one-sentence answer
**Single-slit diffraction intensity derives from coherent superposition of secondary wavelets across the slit width, yielding the amplitude factor sinc(β) whose square gives the observed intensity distribution.**

Light passing through a narrow slit spreads because every point on the slit acts as a source of spherical wavelets. When these wavelets reach a distant screen they interfere. The path difference between wavelets from opposite edges of the slit is a sin θ, where a is the slit width. Dividing the slit into infinitesimal elements and summing their phasor contributions produces a resultant amplitude proportional to sin(β)/β, with β = (π a sin θ)/λ. Squaring this amplitude supplies the intensity pattern that vanishes at the zeros of the sinc function.

The derivation therefore rests on two ideas only: linear superposition of complex amplitudes and the quadratic relation between intensity and field strength. Once the phase variation across the slit is expressed as a continuous integral, the mathematics collapses to a standard trigonometric identity.

> [!NOTE]
> The central maximum is twice as wide as the secondary maxima because the first zero occurs at β = π rather than at β = π/2; this asymmetry is the direct geometric signature of a continuous source distribution.

## 2. Why this matters — concrete and current
The single-slit pattern sets the diffraction-limited angular resolution of every optical telescope; the James Webb Space Telescope’s 6.5 m primary is segmented precisely so that the individual segment diffraction envelopes can be phased to recover the full aperture resolution.  

Semiconductor lithography tools from ASML use 13.5 nm EUV light whose single-slit-like diffraction through sub-10 nm mask features determines the minimum printable half-pitch; the intensity formula directly enters the aerial-image simulation software that qualifies every new process node.  

Laser beam shaping for gravitational-wave detectors (LIGO, Virgo) employs apodizing apertures whose far-field intensity is calculated from the same sinc-squared kernel to suppress stray-light scattering that would otherwise mask the 10^{-21} strain signals.  

In laser-driven inertial confinement fusion at the National Ignition Facility, the spatial profile of each of the 192 beams is controlled by diffractive optics whose design begins with the single-slit envelope; deviations from the ideal pattern seed hydrodynamic instabilities that reduce fusion yield.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Huygens–Fresnel principle | Treats every point on the wavefront as a secondary source whose amplitude must be integrated. |
| Phasor addition          | Converts path-length differences into vector addition in the complex plane; the resultant length squared is intensity. |
| Far-field (Fraunhofer) approximation | Allows the phase to be written as a linear function of position across the slit, turning the integral into a standard sinc form. |
| Complex exponential representation | Simplifies the continuous sum of cosines and sines into a single definite integral. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every point on the slit is a source
All points within the open aperture radiate spherical wavelets of equal strength. On a distant screen the only observable difference between wavelets is the extra optical path each travels.

Consider a slit of width a illuminated by a plane wave at normal incidence. The leftmost edge and rightmost edge differ in path length to a point at angle θ by a sin θ.

The optical-path difference between the two edges is therefore  
$$
\delta = a \sin\theta.
$$

> [!WARNING]
> Treating the slit as a single point source erases the angular dependence; the finite width must be retained from the outset.

### Step 2 — Phase varies linearly across the aperture
The phase difference between wavelets separated by distance x inside the slit is (2π/λ) x sin θ. Define the reduced variable  
$$
\beta = \frac{\pi a \sin\theta}{\lambda}.
$$
At the slit centre the phase reference is zero; at the edges the phases are ±β.

### Step 3 — Represent each infinitesimal element by a phasor
Divide the slit into N strips of width dx. The electric-field contribution from strip j is proportional to dx and carries phase ϕ_j = (2π x_j sin θ)/λ. In the complex plane these contributions lie along an arc of constant radius.

The total complex amplitude is the integral  
$$
E(\theta) = E_0 \int_{-a/2}^{a/2} e^{i (2\pi x \sin\theta)/\lambda}\, dx.
$$

### Step 4 — Evaluate the definite integral
Substitute u = (2π sin θ / λ) x so that du = (2π sin θ / λ) dx. Limits change from −β to +β. The integral becomes  
$$
E(\theta) = E_0 \frac{\sin\beta}{\beta}.
$$

> [!WARNING]
> Omitting the factor of 1/2 in the definition of β shifts all zeros by a factor of two and produces an incorrect pattern.

### Step 5 — Form the intensity
Intensity is proportional to |E|^2. Normalising so that I(0) = I_0 yields the textbook single-slit intensity:  
$$
I(\theta) = I_0 \left( \frac{\sin\beta}{\beta} \right)^2.
$$

## 5. Worked examples — every step shown

**Example 1 — Locate the first minimum**  
*Given:* λ = 500 nm, a = 0.1 mm, screen distance L = 1 m.  
*Find:* Angle θ of first minimum and its linear position y on the screen.  

The first zero occurs when β = π:  
$$
\frac{\pi a \sin\theta}{\lambda} = \pi \implies \sin\theta = \frac{\lambda}{a} = 5 \times 10^{-3}.
$$  
*Why:* Direct substitution of the definition of β.  
For small θ, θ ≈ λ/a = 5 mrad.  
Position y = L θ = 5 mm.  
**Answer:** θ = 5 mrad, y = 5 mm.

*Reflection:* The calculation uses only the zero condition; the same θ works for any L provided the small-angle regime holds.

**Example 2 — Intensity at arbitrary angle**  
*Given:* β = π/2.  
*Find:* I/I_0.  

$$
\frac{I}{I_0} = \left( \frac{\sin(\pi/2)}{\pi/2} \right)^2 = \left( \frac{2}{\pi} \right)^2 \approx 0.405.
$$  
*Why:* Direct substitution into the derived formula.  
**Answer:** I/I_0 ≈ 0.405.

*Reflection:* The value lies between the central peak and the first zero, illustrating the smooth roll-off.

**Example 3 — Width of central maximum**  
*Given:* a = 50 μm, λ = 633 nm.  
*Find:* Full angular width between first minima.  

First minima at sin θ = ±λ/a, so angular separation Δθ = 2λ/a ≈ 25.3 mrad.  
*Why:* Symmetric placement of the two β = ±π zeros.  
**Answer:** Δθ = 2λ/a.

*Reflection:* The factor of two arises because the pattern is even in θ.

**Example 4 — Normalisation check at θ = 0**  
*Given:* β → 0.  
*Find:* Limit of I(θ)/I_0.  

Use L’Hôpital’s rule:  
$$
\lim_{\beta\to 0} \frac{\sin\beta}{\beta} = 1 \implies I(0) = I_0.
$$  
*Why:* The indeterminate form 0/0 is resolved by differentiation of numerator and denominator.  
**Answer:** I(0) = I_0.

*Reflection:* Confirms that the prefactor chosen in the derivation is consistent with the on-axis intensity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using β = (2π a sin θ)/λ instead of (π a sin θ)/λ | Confuses phase difference with the argument of the sinc | Always derive β from the half-width phase excursion. |
| Forgetting to square the amplitude | Intensity is |E|^2, not |E|                           | Write I ∝ |∫ E dx|^2 explicitly before evaluating.     |
| Applying the formula inside the Fresnel region | The linear-phase assumption fails near the slit     | Verify z ≫ a²/λ before using the far-field result.   |
| Treating the slit as two point sources | Loses the continuous distribution that produces sinc | Integrate rather than sum two discrete phasors.      |
| Confusing slit width a with separation d in double-slit problems | Notation overlap between single- and double-slit geometries | Keep a for single-slit width, d for centre-to-centre spacing. |
| Using degrees in the argument of sin | Most calculators default to radians; β is defined in radians | Convert θ to radians before computing β.             |
| Neglecting obliquity factor at large θ | The simple derivation assumes θ ≪ 1 rad             | Restrict use to the paraxial regime or multiply by cos θ when necessary. |

## 7. The textbook-precise statement
In the Fraunhofer approximation the diffracted electric-field amplitude from a one-dimensional slit of width a uniformly illuminated by a monochromatic plane wave of wavelength λ is  
$$
E(\theta) = E_0 \frac{\sin\beta}{\beta},\qquad \beta = \frac{\pi a \sin\theta}{\lambda}.
$$
The corresponding intensity on a distant screen is  
$$
I(\theta) = I_0 \left( \frac{\sin\beta}{\beta} \right)^2.
$$
(Hecht, *Optics*, 5e, §10.2.2, Eq. 10.22).

## 8. Visual — diagram or schematic
```text
          plane wave →   |← a →|  
                         ████████████  slit (width a)
                              |
                              |  far-field screen at distance L
                              v
          θ=0  ───────────────┼───────────────→ θ
               central max    | first min at β=π
                              y = L λ/a
```
The diagram shows a plane wave incident from the left, a vertical slit of width a, and rays leaving at angle θ toward a distant screen. The path difference between the top and bottom edges is a sin θ.

## 9. The memory technique
1. **The hook** — Picture a ruler of length a lying across the slit; each millimetre mark sends a phasor whose tip traces an arc whose chord length is the resultant amplitude. When the arc exactly spans 2π radians the chord vanishes—the first minimum.  
2. **What to overlearn** — β ≡ (π a sin θ)/λ and I = I_0 (sin β / β)^2.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the integral E = ∫ e^{i k x sin θ} dx from −a/2 to a/2 and evaluate it directly.

## 10. What this unlocks
Mastery of the single-slit derivation supplies the building block for every multi-aperture interference pattern and for the Fourier-optics treatment of arbitrary apertures.  

- Double-slit interference modulated by the single-slit envelope  
- Rectangular and circular aperture diffraction (Airy pattern)  
- Array-factor × element-factor decomposition in antenna theory  
- Fourier-transform relationship between aperture function and far-field amplitude  

## 11. Self-check — five questions, no answers
1. Derive the location of the second minimum in terms of λ and a without looking up the formula.  
2. A slit of width 20 μm is illuminated at 400 nm. At what angle does the intensity first drop to 1/100 of its central value?  
3. Why does the single-slit pattern remain unchanged if the slit is translated laterally by a few micrometres while keeping its width fixed?  
4. Identify the algebraic error that would result if the integration limits were taken from 0 to a instead of −a/2 to a/2.  
5. A student claims the first zero occurs when a sin θ = λ. Show that this statement is off by a factor of two and explain the origin of the discrepancy.