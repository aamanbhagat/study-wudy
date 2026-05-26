## 1. The one-sentence answer
Newton's rings form from interference in the thin air film trapped between a plano-convex lens and a flat glass plate, with ring radii obeying \( r_m = \sqrt{m\lambda R} \) for dark rings in reflected light.

Light reflects from the bottom surface of the lens and the top surface of the flat plate. The air film thickness increases radially, so the optical path difference changes continuously and produces concentric bright and dark rings. Because one reflection occurs from a denser medium, a \(\pi\) phase shift appears, reversing the usual condition for constructive and destructive interference. The curvature of the lens converts the linear thickness variation into a quadratic radial dependence, which is why the rings are not equally spaced.

> [!NOTE]
> The central spot is always dark in reflected light for an air film; this single observation immediately tells you the phase reversal is present and fixes every subsequent formula.

## 2. Why this matters — concrete and current
In semiconductor lithography, Newton's rings are used to measure the flatness of photomask substrates to <10 nm over 150 mm diameters at ASML and Nikon stepper fabs; any curvature produces measurable ring shifts that are corrected before exposing wafers.

LIGO's test-mass metrology employs the same geometry to certify the 40 kg fused-silica mirrors to \(\lambda/1000\) surface figure; the ring pattern directly maps low-spatial-frequency errors that would otherwise scatter gravitational-wave signals.

In aerospace, Pratt & Whitney uses Newton's-ring interferometry to verify the curvature of high-pressure turbine blade cooling-channel inserts, ensuring film-cooling holes remain aligned after thermal cycling.

Thin-film deposition tools from Veeco and Oxford Instruments monitor real-time growth of dielectric stacks by observing the evolution of Newton's rings on witness samples, giving sub-nanometre thickness control without breaking vacuum.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Wave nature of light | Explains why path difference produces constructive or destructive interference |
| Phase change on reflection | Determines whether central spot is bright or dark         |
| Thin-film path difference | Core relation \(2t + \lambda/2\) or \(2t\) that sets ring condition |
| Geometry of sphere   | Converts lens sagitta into radial thickness \(t(r)\)      |
| Paraxial approximation | Simplifies sagitta equation to \(t \approx r^2/(2R)\)     |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Air-film geometry
A plano-convex lens of radius of curvature \(R\) rests on a flat glass plate, forming a radially increasing air gap. At radial distance \(r\) the gap thickness follows the sagitta of the sphere. Under the paraxial limit the exact sphere equation reduces to the simple quadratic \(t(r) = r^2/(2R)\).  
**Example**: for \(R = 1\) m and \(r = 1\) mm, \(t = 0.5\) µm—already comparable to visible wavelengths.  
$$ t(r) = \frac{r^2}{2R} $$  
> [!WARNING] Using the exact spherical expression instead of the paraxial form introduces higher-order terms that shift measured radii by several percent even at modest apertures.

### Step 2 — Optical path difference with phase reversal
Ray 1 reflects from the lower surface of the lens (glass-to-air, no phase change). Ray 2 reflects from the upper surface of the flat plate (air-to-glass, \(\pi\) phase shift). The extra optical path for the round trip in air is \(2t\). Because of the phase reversal the condition for destructive interference (dark ring) becomes \(2t = m\lambda\).  
$$ 2t = m\lambda \quad (m=0,1,2,\dots) \quad \text{(reflected light, air film)} $$

### Step 3 — Substitute thickness
Insert the geometric expression for \(t\):  
$$ 2\frac{r_m^2}{2R} = m\lambda \implies r_m^2 = m\lambda R $$  
$$ r_m = \sqrt{m\lambda R} \quad \text{(dark rings)} $$

### Step 4 — Bright-ring condition
Removing the extra \(\lambda/2\) path-equivalent phase shift reverses the condition, yielding  
$$ r_m = \sqrt{(2m-1)\frac{\lambda R}{2}} \quad \text{(bright rings)} $$

### Step 5 — Radius of curvature measurement
If the \(m\)-th dark ring radius is measured with a travelling microscope, \(R\) is obtained directly:  
$$ R = \frac{r_m^2}{m\lambda} $$  
This is the standard laboratory method for determining \(R\) of a plano-convex lens.

## 5. Worked examples — har step show karo

**Example 1 — Central spot verification**  
*Given:* Air film, reflected sodium light \(\lambda=589\) nm.  
*Find:* Condition at \(r=0\).  
At \(r=0\), \(t=0\). Path difference \(2t=0\), but phase reversal adds \(\lambda/2\), so total effective difference \(\lambda/2\) → destructive interference.  
**Final answer:** central spot is dark.  
*Reflection:* The phase reversal is the single fact that fixes every later formula; forgetting it inverts bright/dark assignment.

**Example 2 — First dark ring radius**  
*Given:* \(R=100\) cm, \(\lambda=589\) nm.  
*Find:* \(r_1\).  
Use \(r_m^2=m\lambda R\):  
\(r_1^2=1\times589\times10^{-7}\times100=5.89\times10^{-5}\) cm².  
\(r_1=\sqrt{5.89\times10^{-5}}=0.00767\) cm = 76.7 µm.  
**Final answer:** 76.7 µm.  
*Reflection:* Units must be consistent (cm here) before taking square root.

**Example 3 — Order at given radius**  
*Given:* Observed ring radius 0.5 mm, same lens and wavelength.  
*Find:* Order \(m\).  
\(m=r^2/(\lambda R)= (0.05)^2/(5.89\times10^{-5}\times100)=0.425\).  
Not integer → ring lies between orders.  
**Final answer:** between 0 and 1.  
*Reflection:* Non-integer \(m\) simply means the ring is not exactly at a maximum or minimum.

**Example 4 — Lens-curvature measurement**  
*Given:* 10th dark ring at 4.2 mm, \(\lambda=589\) nm.  
*Find:* \(R\).  
\(R=r_{10}^2/(10\lambda)=(0.42)^2/(10\times5.89\times10^{-5})=30.05\) cm.  
**Final answer:** 30.05 cm.  
*Reflection:* Microscope measurement uncertainty in \(r\) is squared, so radius error grows rapidly for outer rings.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \(\pi\) phase shift | Student recalls thin-film formula without boundary conditions | Always check which reflection has the phase change before writing \(2t=m\lambda\) or \(2t=(m+1/2)\lambda\) |
| Using transmitted-light condition in reflection setup | Mixing two standard derivations             | Write “reflected, air film” at top of every derivation page |
| Paraxial sagitta omitted    | Using exact sphere equation for convenience | State “paraxial limit \(r\ll R\)” explicitly before substituting \(t=r^2/2R\) |
| Taking \(m=0\) as bright    | Ignoring central dark spot observation      | Verify with a quick Michelson-style test before quoting radii |
| Unit mismatch (nm vs cm)    | Calculator input error                      | Convert all lengths to same unit before squaring |
| Measuring diameter instead of radius | Misreading microscope scale                 | Confirm whether instrument reads radius or diameter and halve if needed |
| Ignoring lens deformation   | Assuming rigid contact                      | Use minimal pressure or consult elastic deformation correction tables |

## 7. The textbook-precise statement
In reflected light, for a plano-convex lens of radius of curvature \(R\) placed on an optical flat and illuminated at normal incidence by monochromatic light of wavelength \(\lambda\), the radii of the dark interference rings are given by  
$$ r_m = \sqrt{m\lambda R},\qquad m=0,1,2,\dots $$  
provided the air film is bounded by a phase-reversing reflection at the lower surface. The derivation assumes (i) paraxial rays, (ii) negligible multiple reflections, and (iii) refractive index of air exactly unity. (Hecht, *Optics*, 5e, §9.4.2)

## 8. Visual — diagram or schematic
```
          plano-convex lens (R)
               _____
             /       \
            |    air film t(r)
flat plate  --------------------
```
Axis vertical, radial coordinate \(r\) horizontal; thickness \(t\) zero at centre, quadratic outward. Rings appear as concentric circles when viewed from above.

## 9. The memory technique
1. **The hook** — Imagine dropping a stone in a pond; the concentric ripples are exactly Newton’s rings, but the “pond” is only a few wavelengths deep and curved by one lens surface.  
2. **What to overlearn** — \(r_m^2 = m\lambda R\) (dark, reflected) and the fact that the centre is always dark.  
3. **Spaced-repetition schedule** — Review the formula after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Redraw the lens–plate gap, write the two reflected rays, insert the \(\pi\) phase shift, substitute \(t=r^2/2R\).

## 10. What this unlocks
Newton’s rings open the experimental route to precise radius-of-curvature metrology and to the quantitative study of thin-film interference.  

- Leads directly to Michelson interferometer fringe analysis  
- Supplies the calibration standard for Fizeau and Twyman–Green interferometers  
- Extends to Newton’s fringes in liquid films and anti-reflection coating design  
- Provides the geometric foundation for testing aspheric surfaces with null correctors

## 11. Self-check — five questions, no answers
1. Derive the bright-ring radius formula starting from the dark-ring condition and the extra phase shift.  
2. A lens of \(R=80\) cm gives a 5th dark ring at 1.8 mm with \(\lambda=546\) nm; calculate \(\lambda\) if the radius were measured instead as 1.9 mm.  
3. Why does the ring spacing decrease with increasing order?  
4. In an experiment the central spot appears bright; list the two most probable experimental reasons.  
5. Show that the radius of curvature measurement error \(\Delta R\) scales as \(2r\Delta r/(m\lambda)\).