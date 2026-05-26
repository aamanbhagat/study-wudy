## 1. The one-sentence answer
**Single-slit diffraction intensity pattern is obtained by integrating the phasor contributions from every infinitesimal Huygens source across the slit width, yielding the amplitude factor \(\frac{\sin\beta}{\beta}\) whose square gives the observed intensity distribution \(I(\theta)=I_0\left(\frac{\sin\beta}{\beta}\right)^2\) where \(\beta=\frac{\pi a\sin\theta}{\lambda}\).**

Light passing through a narrow slit does not produce a sharp geometric shadow. Instead, each point inside the slit acts as a secondary spherical-wave source. Because these sources sit at slightly different distances from a distant observation point, they arrive with a continuous range of phase delays. Adding all those complex amplitudes produces a net field whose magnitude falls off according to the sinc function.

The derivation therefore reduces to a definite integral over the slit. Once the integral is evaluated, intensity follows at once from the time-averaged Poynting vector, which is proportional to the square of the resultant amplitude.

> [!NOTE]
> The central bright fringe is not a simple “maximum”; it is the only place where every secondary source adds in phase, so its intensity is orders of magnitude higher than the side lobes—an immediate consequence of coherent integration across the entire aperture.

## 2. Why this matters — concrete and current
NASA’s James Webb Space Telescope uses the single-slit diffraction limit of its 6.5 m primary mirror segments to set the angular resolution at 0.1 arc-second in the near-infrared; every image is ultimately convolved with the same \(\operatorname{sinc}^2\) pattern derived below.

ASML’s EUV lithography scanners print 3 nm features by shaping the illumination pupil with precisely calculated single-slit diffraction masks; the intensity zeros must fall exactly on the wafer plane or contrast collapses.

In laser material processing, femtosecond pulses are spatially filtered through a 50 µm pinhole whose measured far-field ring pattern directly confirms the \(\beta\) scaling; misalignment of even 2 µm shifts the first minimum onto the optical axis and destroys beam quality.

Radio astronomers map the brightness temperature of the cosmic microwave background with horn antennas whose 1.4 GHz response is governed by the identical single-slit formula scaled to metre wavelengths; sidelobe levels below –30 dB are required to avoid galactic foreground contamination.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Huygens–Fresnel principle | Treats every point on the wavefront as a source of secondary spherical waves        |
| Complex phasor notation  | Allows linear superposition of waves with continuous phase differences              |
| Definite integral        | Converts the discrete sum over infinitesimal sources into the closed-form sinc function |
| Far-field (Fraunhofer) approximation | Removes quadratic phase terms so the integral becomes a simple Fourier transform |
| Time-averaged intensity  | Converts electric-field amplitude into observable power via \(I \propto |E|^2\)      |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Model the slit as a continuous line of coherent sources
Imagine a slit of width \(a\) illuminated by a monochromatic plane wave. Every infinitesimal strip of width \(dy\) at position \(y\) radiates a spherical wave whose amplitude is proportional to \(dy\).

### Step 2 — Introduce the path-length difference
At a distant screen point making angle \(\theta\) with the optic axis, the extra geometrical path from a source at coordinate \(y\) is \(y\sin\theta\). The corresponding phase shift is therefore \(\delta\phi = k y\sin\theta\) where \(k=2\pi/\lambda\).

### Step 3 — Write the infinitesimal phasor contribution
The complex electric-field contribution from the strip at \(y\) is  
\[dE = E_0 e^{i k y \sin\theta}\, dy.\]

### Step 4 — Integrate across the slit
The total field is the definite integral  
\[E(\theta)=E_0\int_{-a/2}^{a/2}e^{i k y\sin\theta}\, dy.\]  
Evaluating the integral yields  
\[E(\theta)=E_0 a\frac{\sin\beta}{\beta},\qquad\beta=\frac{\pi a\sin\theta}{\lambda}.\]

### Step 5 — Convert amplitude to intensity
Observable intensity is proportional to the squared modulus:  
\[I(\theta)=I_0\left(\frac{\sin\beta}{\beta}\right)^2.\]

### Step 6 — Locate the zeros
The intensity vanishes wherever \(\sin\beta=0\) but \(\beta\neq0\), i.e., at \(\beta=m\pi\) (\(m=\pm1,\pm2,\dots\)), giving the familiar dark fringes.

> [!WARNING]
> If the lower integration limit is mistakenly set to zero instead of \(-a/2\), the phase reference shifts and an extra linear phase factor appears; the intensity pattern itself remains correct only after the modulus squared is taken, but any subsequent interference calculation with another aperture will be wrong.

## 5. Worked examples — har step show karo

**Example 1 — Central intensity**  
*Given:* \(a=0.1\) mm, \(\lambda=550\) nm, \(\theta=0\).  
*Find:* \(I(0)/I_0\).  
At \(\theta=0\), \(\beta=0\). The limit \(\lim_{\beta\to0}\frac{\sin\beta}{\beta}=1\) follows directly from L’Hôpital’s rule or the small-angle Taylor series.  
Thus \(I(0)=I_0\).  
*Why:* Every secondary source is exactly in phase, so amplitudes add constructively.  
**Final answer**  
\[I(0)=I_0\]

*Reflection:* The central maximum is the only location where the sinc factor equals unity; all other points suffer partial destructive interference.

**Example 2 — First minimum location**  
*Given:* Same slit, screen at 2 m.  
*Find:* Distance \(y_1\) of first dark fringe.  
Set \(\beta=\pi\): \(\frac{\pi a y_1}{\lambda L}=\pi\) \(\Rightarrow\) \(y_1=\frac{\lambda L}{a}=11\) mm.  
*Why:* The integral vanishes when the total phase excursion across the slit equals exactly \(2\pi\).  
**Final answer**  
\[y_1=11\,\text{mm}\]

*Reflection:* This linear scaling with \(\lambda L/a\) is the practical design equation for spectrometers and beam dumps.

**Example 3 — Intensity at half-width angle**  
*Given:* \(\beta=\pi/2\).  
*Find:* \(I/I_0\).  
\(\frac{\sin(\pi/2)}{\pi/2}=2/\pi\approx0.6366\), squared \(\approx0.405\).  
*Why:* Direct substitution into the closed-form expression.  
**Final answer**  
\[I/I_0\approx0.405\]

*Reflection:* Roughly 40 % of peak intensity still reaches the half-width point, illustrating the slow decay of the central lobe.

**Example 4 — Normalised power in central lobe**  
*Given:* Integrate \(I(\theta)\) from \(-\theta_1\) to \(\theta_1\).  
*Find:* Fraction of total power.  
The integral \(\int_{-\pi}^{\pi}(\sin\beta/\beta)^2 d\beta\) evaluates numerically to \(\approx0.903\).  
*Why:* 90.3 % of the energy lies inside the first zeros; the remaining 9.7 % resides in the weak side lobes.  
**Final answer**  
**90.3 %**

*Reflection:* This number governs the Strehl ratio budget in high-contrast imaging systems.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the factor of \(\pi\) in \(\beta\) | Confusing \(k=2\pi/\lambda\) with \(2\pi/\lambda\) definition | Always write \(\beta=\frac{1}{2}k a\sin\theta\) explicitly |
| Setting integration limits 0 to \(a\) | Thinking the slit starts at the edge                | Centre the coordinate system at the geometric centre |
| Treating \(\theta\) as small everywhere | Over-applying paraxial approximation too early      | Keep \(\sin\theta\) until the final numerical step   |
| Confusing amplitude with intensity zeros | Believing \(\sin\beta=0\) also zeros the field      | Remember intensity is \(|E|^2\); field zeros are the intensity zeros |
| Missing the \(\beta=0\) removable singularity | Plugging \(\theta=0\) directly into \(\sin\beta/\beta\) | Use L’Hôpital or series expansion at the origin      |
| Neglecting obliquity factor       | Assuming all secondary sources radiate equally      | For \(\theta>30^\circ\) multiply by \(\cos\theta\)   |
| Sign error in path difference     | Reversing the coordinate axis                       | Draw the geometry once with consistent \(y\) direction |

## 7. The textbook-precise statement
In the Fraunhofer regime the scalar diffraction integral for a one-dimensional rectangular aperture of width \(a\) centred at the origin reduces to  
\[U(\theta)=C\int_{-a/2}^{a/2}\exp(ik y\sin\theta)\,dy=C a\operatorname{sinc}\left(\frac{a\sin\theta}{\lambda}\right),\]  
where \(\operatorname{sinc}x=\sin(\pi x)/(\pi x)\) and \(C\) absorbs all constants independent of \(\theta\). The observable irradiance is therefore  
\[I(\theta)=I(0)\left[\operatorname{sinc}\left(\frac{a\sin\theta}{\lambda}\right)\right]^2.\]  
All derivations assume monochromatic illumination, scalar wave optics, and observation distances satisfying the Fresnel number \(\ll1\). (Hecht, *Optics*, 5e, §10.2.)

## 8. Visual — diagram or schematic
```
Screen (z = L)
          |
   y ↑    |          central max
     |    |              |
     |    |   side lobes | side lobes
-----|----|---------------|---------------
 slit |    |   θ          | θ
 width|    |  /           |  \
  a   |    | /            |   \
-----|----|/-------------|----\-----------
     0    source plane   (far-field pattern)
```
Horizontal axis is transverse screen coordinate; vertical lines mark the angular locations of intensity zeros at \(\beta = m\pi\).

## 9. The memory technique
1. **The hook** — Picture a single bright central spike with rapidly shrinking ripples on both sides; the ripples are the side lobes whose height drops exactly as \(1/\beta^2\).
2. **What to overlearn** — The exact expression \(\beta=\frac{\pi a\sin\theta}{\lambda}\) and the statement that minima occur at integer multiples of \(\pi\) in \(\beta\).
3. **Spaced-repetition schedule** — Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Return to the integral \(E=\int_{-a/2}^{a/2}e^{i k y\sin\theta}dy\), evaluate it afresh, then square the result.

## 10. What this unlocks
Mastery of the single-slit integral immediately generalises to any aperture whose transmission function can be written as a Fourier transform.  

- Double-slit interference modulated by the single-slit envelope  
- Diffraction gratings and their resolving power  
- Aperture synthesis in radio astronomy  
- Fourier optics and spatial filtering in 4-f systems  
- Beam-propagation methods used in laser-resonator design  

## 11. Self-check — five questions, no answers
1. Derive the angular position of the second minimum for a 0.2 mm slit at 633 nm.  
2. At what angle does the intensity first drop to 1 % of the central value?  
3. Why does the single-slit pattern remain unchanged if the slit is translated laterally by a few millimetres?  
4. A student integrates from 0 to \(a\) and obtains an extra phase factor \(e^{i\beta}\). Does the final intensity pattern change? Explain.  
5. For fixed slit width, how does the width of the central maximum scale with wavelength?