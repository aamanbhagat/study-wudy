## 1. The one-sentence answer
**Total internal reflection occurs at the interface between two transparent media when light travels from higher to lower refractive index and the angle of incidence exceeds the critical angle \(c\) defined by \(\sin c = n_2/n_1\).**

Light slows down when it enters a denser medium, so its wavefronts bend toward the normal. When the ray is already inside the denser medium and tries to leave, the same bending rule now forces the refracted ray to bend away from the normal. As the incidence angle grows, the refracted ray lies flatter and flatter against the interface until, at one precise angle, it skims exactly along the surface at 90° to the normal. Beyond that angle the mathematics of Snell’s law admits no real refracted ray; all energy reflects back into the first medium.

This threshold angle is fixed solely by the ratio of the two refractive indices and is independent of wavelength provided both indices are measured at that wavelength.

> [!NOTE]
> The critical angle is not a property of the ray; it is the unique incidence angle at which the transmitted wavefront would have to travel parallel to the interface—an impossible geometry once the incidence angle grows any larger.

## 2. Why this matters — concrete and current
In silica optical fibers manufactured by Corning and OFS, total internal reflection confines 1550 nm telecom signals inside a 125 µm core with losses below 0.2 dB km⁻¹, enabling trans-oceanic cables that carry >100 Tbit s⁻¹.

Laser communication terminals on NASA’s Laser Communications Relay Demonstration satellite use TIR prisms to steer 1.55 µm beams without moving parts, achieving 1.2 Gbit s⁻¹ links from geostationary orbit.

Medical endoscopes from Olympus and Karl Storz route illumination and imaging light through coherent fiber bundles; TIR keeps >90 % of the launched power inside each 10 µm fiber even when the bundle bends through several radii.

Diamond–air interfaces in high-power CO₂ laser windows exploit the 24.4° critical angle to reject stray reflections that would otherwise damage upstream optics in industrial cutting systems.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Refractive index \(n\) | Defines the speed ratio that produces the bending         |
| Snell’s law          | Supplies the quantitative relation between the two angles |
| Angle of incidence measured from the normal | Standard convention required for the sine function to work |

## 4. Building the idea — from intuition to formalism

### Step 1 — Snell’s law at a plane interface
Snell’s law states that \(n_1\sin\theta_1=n_2\sin\theta_2\).  
Consider a ray crossing from water (\(n_1=1.33\)) into air (\(n_2=1.00\)) at \(\theta_1=30^\circ\); the transmitted angle becomes \(\theta_2\approx41.8^\circ\).  
$$n_1\sin\theta_1=n_2\sin\theta_2$$  
> [!WARNING]
> Measuring angles from the surface instead of the normal inverts the sine relation and yields the wrong critical angle.

### Step 2 — Direction of bending when \(n_1>n_2\)
Because \(n_1>n_2\), \(\theta_2>\theta_1\); the transmitted ray bends away from the normal.  
At \(\theta_1=40^\circ\) in the same water–air case, \(\theta_2\) already reaches 58.7°.

### Step 3 — The limiting geometry \(\theta_2=90^\circ\)
Set \(\theta_2=90^\circ\) so \(\sin\theta_2=1\). The incidence angle that satisfies this condition is the critical angle \(c\).  
$$n_1\sin c=n_2\cdot1$$  
> [!WARNING]
> Substituting \(\theta_2=0^\circ\) instead of 90° produces the complementary (and meaningless) angle.

### Step 4 — Solving for the critical angle
Divide both sides by \(n_1\):  
$$\sin c=\frac{n_2}{n_1}$$  
Take the inverse sine (principal value between 0 and 90°):  
$$c=\arcsin\left(\frac{n_2}{n_1}\right)$$  
For water–air this yields \(c\approx48.8^\circ\).

### Step 5 — Total internal reflection for \(\theta_1>c\)
When \(\theta_1>c\), no real \(\theta_2\) exists because \(\sin\theta_2\) would exceed 1. The interface therefore reflects 100 % of the incident power back into medium 1.

## 5. Worked examples — every step shown

**Example 1 — Water–air critical angle**  
*Given:* \(n_\text{water}=1.333\), \(n_\text{air}=1.000\).  
*Find:* \(c\).  
Apply the defining relation:  
$$\sin c=\frac{1.000}{1.333}\approx0.7502$$  
$$c=\arcsin(0.7502)=48.6^\circ$$  
**\(c=48.6^\circ\)**  

*Reflection:* The only arithmetic risk is rounding the ratio before taking arcsin; keep at least four decimals.

**Example 2 — Glass–air interface**  
*Given:* Crown glass \(n=1.517\).  
*Find:* \(c\).  
$$\sin c=\frac{1}{1.517}\approx0.6592$$  
$$c=\arcsin(0.6592)=41.2^\circ$$  
**\(c=41.2^\circ\)**  

*Reflection:* Students often confuse this value with the Brewster angle; remember TIR requires the denser-to-rarer direction.

**Example 3 — Incidence above critical**  
*Given:* Same glass–air interface, \(\theta_1=50^\circ\).  
*Find:* Does TIR occur?  
Compare 50° > 41.2°. Yes.  
**TIR occurs; reflectance = 1.**

*Reflection:* The comparison step is decisive; omitting it leads to attempting an impossible arcsin.

**Example 4 — Fiber critical angle**  
*Given:* Core \(n_1=1.46\), cladding \(n_2=1.45\).  
*Find:* \(c\).  
$$\sin c=\frac{1.45}{1.46}\approx0.9932$$  
$$c=\arcsin(0.9932)=83.0^\circ$$  
**\(c=83.0^\circ\)**  

*Reflection:* The small index difference produces a large critical angle, allowing only shallow rays to be guided.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Using \(n_1/n_2\) instead of \(n_2/n_1\) | Reversing which medium is denser              | Always assign \(n_1\) to the incident medium |
| Measuring angles from the surface | Habit from everyday geometry                  | Draw the normal explicitly each time         |
| Taking \(\arcsin\) of a number >1 | Forgetting to check \(\theta_1>c\) first      | Test \(\sin\theta_1>n_2/n_1\) before computing |
| Confusing critical angle with Brewster angle | Both involve polarization at interfaces       | Brewster uses tangent; critical uses sine    |
| Ignoring dispersion               | Assuming \(n\) is constant with wavelength    | Specify \(\lambda\) when quoting \(n\)       |
| Applying the formula in rarer-to-denser direction | Misreading the problem statement              | Verify \(n_1>n_2\) before using the equation |
| Reporting \(c\) in radians        | Calculator default mode                       | Set calculator to degrees or convert explicitly |

## 7. The textbook-precise statement
Let two isotropic, non-magnetic dielectrics meet at a plane interface. Let \(n_1>n_2\) be their respective refractive indices at wavelength \(\lambda\). A monochromatic plane wave is incident from medium 1 at angle \(\theta_1\) measured from the surface normal. If \(\theta_1>\arcsin(n_2/n_1)\), then the time-averaged Poynting vector of the transmitted field is identically zero and the reflectance for both polarizations equals unity (Hecht, *Optics*, 5e, §5.4.2, eq. 5.41).

## 8. Visual — diagram or schematic
```text
Medium 1 (n₁ > n₂)          Interface
          \ θ₁
           \     (incident)
            \ 
-------------+------------------
              \   θ₂=90° (critical ray)
               \
                \   (grazing)
Medium 2 (n₂)
```
The normal is vertical. The critical ray lies exactly along the interface; any larger \(\theta_1\) produces no transmitted ray.

## 9. The memory technique

1. **The hook** — Picture a fish looking upward from deep water: beyond a certain cone angle it sees only the mirror-like reflection of the underwater world.
2. **What to overlearn** — The single relation \(\sin c=n_2/n_1\) and the inequality \(\theta_1>c\) for TIR.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from Snell’s law, set \(\sin\theta_2=1\), solve.

## 10. What this unlocks
Mastery of the critical-angle condition is the direct prerequisite for analyzing step-index fibers, dielectric waveguides, attenuated total reflection spectroscopy, and the generation of evanescent waves used in near-field optical microscopy and surface-plasmon sensors.

- Acceptance angle and numerical aperture of optical fibers  
- Goos–Hänchen shift at TIR interfaces  
- Frustrated TIR and optical tunneling  
- Design of Porro and Dove prisms in binoculars and laser cavities

## 11. Self-check — five questions, no answers
1. Derive the critical angle for a diamond–air interface (\(n=2.417\)) and state whether a 25° ray will be totally reflected.  
2. A ray inside water strikes the surface at 55°. Compute the would-be transmitted angle in air and explain why it is physically impossible.  
3. Two media have indices 1.60 and 1.45. Which arrangement permits TIR, and what is the resulting critical angle?  
4. Why does the critical angle increase when the wavelength increases inside a dispersive medium?  
5. A step-index fiber has core index 1.48 and cladding index 1.46. A meridional ray enters the core at 12° to the axis. Does this ray undergo TIR at the core–cladding boundary? Show the calculation.