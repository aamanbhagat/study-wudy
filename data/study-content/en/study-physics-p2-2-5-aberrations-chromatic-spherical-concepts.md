## 1. The one-sentence answer
**Aberrations are the systematic deviations from ideal image formation that arise when real lenses or mirrors violate the assumptions of paraxial ray optics and constant refractive index.**

Light rays from a single object point do not converge to a single image point once either the wavelength dependence of refraction or the finite height of rays on a spherical surface is taken into account. Chromatic aberration appears because the refractive index of every transparent material decreases with increasing wavelength, so the focal length of any simple lens is shorter for blue light than for red light. Spherical aberration appears because the paraxial approximation \(\sin\theta \approx \theta\) fails for rays that strike the lens far from the optical axis; marginal rays therefore focus at a different location from paraxial rays even for monochromatic light.

The two effects are independent: one can be removed while the other remains. Correcting both simultaneously requires multiple surfaces, non-spherical profiles, or both.

> [!NOTE]
> The single most important realization is that every practical optical system is a compromise between these two geometric and dispersive errors; perfect imaging exists only in the mathematical limit of infinitesimal aperture and zero wavelength bandwidth.

## 2. Why this matters — concrete and current
The Hubble Space Telescope’s primary mirror was ground to the wrong conic constant, producing 4.3 waves of spherical aberration at 632.8 nm; the 1993 COSTAR corrective optics restored diffraction-limited performance and enabled the measurement of the accelerating expansion of the universe.

Extreme-ultraviolet lithography tools at ASML and Nikon operate at 13.5 nm where every lens material is opaque, forcing all-reflective systems whose multilayer coatings still exhibit residual spherical aberration that must be controlled to <0.1 nm RMS across a 26 mm field.

Consumer smartphone camera modules from Sony and Samsung combine five to seven aspheric elements with anomalous-dispersion glasses to keep lateral chromatic aberration below one pixel at f/1.6, directly limiting the computational denoising algorithms that follow.

The Event Horizon Telescope array corrects for both atmospheric dispersion (chromatic) and large-scale spherical terms in each 6 m antenna before correlation; uncorrected residuals would have blurred the 2019 M87* shadow beyond recognition.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Snell’s law              | Supplies the angle-dependent bending that produces both aberrations |
| Thin-lens equation       | Gives the ideal focal length that aberrations deviate from |
| Paraxial ray tracing     | Defines the reference rays whose failure produces spherical aberration |
| Dispersion relation \(n(\lambda)\) | Quantifies the wavelength dependence that produces chromatic aberration |

## 4. Building the idea — from intuition to formalism

### Step 1 — Refraction depends on wavelength
Glass slows blue light more than red light. A ray of white light therefore splits into a fan of colors at every refracting surface.  
Example: a 10° prism deviates 400 nm light by 7.2° but 700 nm light by only 6.1°.  
Formal statement:  
\[
n = n(\lambda),\qquad \frac{dn}{d\lambda} < 0
\]  
> [!WARNING]
> Treating \(n\) as constant hides the entire phenomenon of chromatic aberration.

### Step 2 — Focal length therefore varies with color
The lens-maker formula contains \(n-1\) in the numerator. Different \(n\) for each \(\lambda\) produces different focal lengths.  
\[
\frac{1}{f(\lambda)} = (n(\lambda)-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right)
\]  
> [!WARNING]
> Forgetting the sign convention on radii immediately reverses the predicted direction of the focal shift.

### Step 3 — Paraxial approximation collapses at finite aperture
Snell’s law contains \(\sin\theta\), yet the thin-lens derivation replaces \(\sin\theta\) by \(\theta\). Rays at height \(h\) experience an error \(\propto h^2\).  
> [!WARNING]
> Using the paraxial focal length for marginal rays produces an image that is never sharp, even in monochromatic light.

### Step 4 — Longitudinal spherical aberration
The longitudinal shift between paraxial and marginal foci is  
\[
\Delta f \approx \frac{h^2}{2f}\left(\frac{1}{n-1}\right)\left(\frac{n+2}{n(n-1)}\right)
\]  
for a plano-convex lens.  
> [!WARNING]
> The quadratic dependence on \(h\) means that stopping the lens down reduces spherical aberration faster than it reduces light.

### Step 5 — Chromatic and spherical aberrations are separable
Because dispersion acts on the paraxial focal length while spherical aberration acts on ray height, the two can be treated independently to first order.  
> [!WARNING]
> Designing an achromat without controlling spherical aberration still yields color-free but blurred images.

### Step 6 — Textbook definition
An optical system is said to be free of primary chromatic and spherical aberration when the optical path length from object to image is stationary with respect to both wavelength and aperture height within the desired field.

## 5. Worked examples — every step shown

**Example 1 — Chromatic focal shift of a BK7 singlet**  
*Given:* equiconvex BK7 lens, \(R_1 = +50\) mm, \(R_2 = -50\) mm, \(n_F = 1.5224\), \(n_C = 1.5143\).  
*Find:* \(\Delta f = f_F - f_C\).  

\[
\frac{1}{f_F} = (1.5224-1)\left(\frac{2}{50}\right) \implies f_F = 47.96\,\text{mm}
\]  
*Why:* direct substitution into the lens-maker formula.  

\[
\frac{1}{f_C} = (1.5143-1)\left(\frac{2}{50}\right) \implies f_C = 48.85\,\text{mm}
\]  
*Why:* same formula with the C-line index.  

**Final answer**  
\[
\Delta f = 0.89\,\text{mm}
\]

*Reflection:* The 0.89 mm shift exceeds the depth of focus of an f/2 lens, so the image is visibly blurred in white light.

**Example 2 — Spherical aberration of the same lens at f/4**  
*Given:* marginal ray height \(h = 12.5\) mm.  
*Find:* longitudinal spherical aberration using the formula in Step 4.  

\[
\Delta f_\text{sph} = \frac{(12.5)^2}{2\times48.4}\times\frac{1}{0.516}\times\frac{3.516}{1.516\times0.516} \approx 1.12\,\text{mm}
\]  
*Why:* each factor follows from the Seidel coefficient for a thin lens.  

**Final answer**  
Spherical blur circle diameter \(\approx 0.23\) mm at the paraxial focus.

*Reflection:* The spherical term is comparable to the chromatic term, showing why both must be attacked together.

**Example 3 — Achromatic doublet design**  
*Given:* crown-flint pair with \(\nu_C = 64\), \(\nu_F = 36\).  
*Find:* power ratio for zero chromatic aberration.  

\[
\frac{P_C}{P_F} = -\frac{\nu_C}{\nu_F} \implies P_F = -0.5625\,P_C
\]  
*Why:* the dispersive powers must cancel while the total power remains positive.  

**Final answer**  
Crown element carries 64 % of the positive power; flint carries the balancing negative power.

*Reflection:* The solution removes chromatic aberration but leaves residual spherical aberration that must be fixed by bending the elements.

**Example 4 — Effect of aperture stop position**  
*Given:* same singlet, stop moved 10 mm in front of the lens.  
*Find:* change in spherical aberration contribution.  
The marginal ray now strikes the lens at reduced height for off-axis bundles; the Seidel \(S_I\) term drops by \(\approx 30\) %.  

**Final answer**  
Spherical blur reduced to 0.16 mm.

*Reflection:* Stop position is a free parameter that costs no glass yet controls aberration balance.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using a single \(n\) for all colors | Textbooks often drop the \((\lambda)\) argument | Always write \(n(\lambda)\) until the final numerical substitution |
| Confusing longitudinal and lateral chromatic aberration | Both scale with \(\Delta n\), but only longitudinal affects focus | Draw the chief ray and measure where colors cross the axis versus the image plane |
| Applying the thin-lens formula to thick elements | The derivation assumes zero thickness | Insert the thick-lens transfer matrix before calculating foci |
| Ignoring the sign of radii when flipping a lens | Sign convention is left-handed for each surface | Adopt the Cartesian sign convention once and never deviate |
| Assuming aspheres remove all spherical aberration | Aspheres remove spherical aberration for one conjugate only | Verify the design conjugates before claiming correction |
| Treating the Abbe number as constant across glass types | \(\nu\) is quoted at d-line but dispersion curves differ | Use partial dispersion when secondary spectrum matters |
| Stopping the lens down to “fix” aberrations | Both aberrations scale with aperture, yet diffraction grows | Calculate the diffraction limit before stopping down |

## 7. The textbook-precise statement
In the Seidel aberration theory for rotationally symmetric systems, the primary spherical aberration coefficient \(S_I\) and the primary axial chromatic aberration coefficient \(C_I\) are given by  
\[
S_I = -\sum h^4 \Phi^3 \left(\frac{n+2}{n(n-1)^2} + \frac{4(n+1)}{n(n-1)}P + \frac{3n+2}{n}P^2\right),
\]  
\[
C_I = \sum h^2 \Phi \frac{\Delta n}{n(n-1)},
\]  
where \(\Phi\) is the surface power, \(P\) the shape factor, and the sums run over all surfaces (Born & Wolf, *Principles of Optics*, 7e, §5.3). Both coefficients must vanish for an image to be free of primary chromatic and spherical aberration at a given conjugate.

## 8. Visual — diagram or schematic
```text
          marginal ray (blue)          paraxial ray (red)
                 \                       /
                  \                     /
                   \                   /
                    \                 /
                     \               /
          lens surface (spherical)  optical axis
     object o----------------------•---------------------- image plane
                 |<--- h --->|     f_paraxial     f_marginal
```
The diagram shows a plano-convex lens. The marginal ray (higher angle) crosses the axis closer to the lens than the paraxial ray. The vertical separation at the image plane is the spherical blur; repeating the diagram for two wavelengths shows the additional axial color shift.

## 9. The memory technique

1. **The hook** — Picture a single white ray hitting a curved glass “hill”; the blue component bends more sharply and lands closer, while the outer shoulders of the hill focus the ray even earlier than the gentle center.
2. **What to overlearn** — \(f \propto 1/(n-1)\); \(\Delta f_\text{sph} \propto h^2\); an achromat satisfies \(P_1/\nu_1 + P_2/\nu_2 = 0\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the lens-maker formula from Snell’s law at two surfaces, then replace \(\theta\) by \(\sin\theta\) and \(n\) by \(n(\lambda)\).

## 10. What this unlocks
Mastery of primary chromatic and spherical aberration lets you design achromatic doublets, understand why aspheres appear in modern objectives, and proceed to higher-order aberrations and wave-front aberrations that govern diffraction-limited performance.  

- Seidel coefficients for astigmatism, coma, and field curvature  
- Apochromatic and super-achromatic designs  
- Zernike-polynomial decomposition used in adaptive optics  
- Optical transfer function calculation for system-level imaging metrics

## 11. Self-check — five questions, no answers
1. A plano-convex lens is reversed so the curved surface faces the image. Does longitudinal spherical aberration increase or decrease for an object at infinity?  
2. Two thin lenses of identical glass are placed in contact. Can their combination ever be achromatic?  
3. A marginal ray at height \(h\) and a paraxial ray are traced through a spherical surface. Which surface parameter must be changed to zero the spherical aberration for one conjugate pair?  
4. The secondary spectrum of an achromatic doublet is observed to be 1/10 of the primary spectrum. What does this imply about the partial dispersions of the two glasses?  
5. An f/2 singlet shows 0.5 mm of spherical blur at full aperture. If the aperture is reduced to f/4, what is the new blur size (neglecting diffraction)?