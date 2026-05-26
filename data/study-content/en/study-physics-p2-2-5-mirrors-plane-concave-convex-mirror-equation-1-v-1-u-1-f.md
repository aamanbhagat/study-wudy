## 1. The one-sentence answer
**The mirror equation \(\frac{1}{v} + \frac{1}{u} = \frac{1}{f}\) is the quantitative relation that locates the image formed by reflection from a spherical mirror once the object position and focal length are known.**

Plane mirrors produce virtual, erect, same-size images at equal distance behind the surface because every ray reflects with angle of incidence equal to angle of reflection. Concave mirrors curve inward and can converge real rays to a focal point when the object lies beyond the center of curvature; convex mirrors curve outward and always diverge rays, forming only virtual, diminished images. The single algebraic statement above encodes all three cases once a consistent sign convention is adopted.

The equation arises from similar triangles in the paraxial-ray diagram and reduces to the plane-mirror result when the radius of curvature tends to infinity.

> [!NOTE]
> The algebraic signs of \(u\), \(v\), and \(f\) carry the entire distinction among real/virtual images and between converging and diverging mirrors; forgetting the sign convention produces the wrong image location even when the arithmetic is flawless.

## 2. Why this matters — concrete and current
The primary mirror of the James Webb Space Telescope is a concave hyperboloid whose focal length and conic constant were chosen so that the Cassegrain secondary produces a diffraction-limited image at the science instruments; the same mirror equation, extended to aspheres, governed every alignment step during cryogenic testing at NASA Goddard.

Smartphone selfie cameras employ arrays of tiny convex mirrors and diffractive elements to fold the optical path; the mirror formula supplies the first-order layout before ray-tracing software refines the prescription.

Laser fusion facilities such as the National Ignition Facility use hundreds of large-aperture concave mirrors to transport and focus 192 beams onto a target; focal-length tolerances are set directly from the derivative of the mirror equation with respect to radius of curvature.

Adaptive-optics systems on ground-based telescopes continuously adjust the curvature of deformable concave mirrors; closed-loop control algorithms linearize the actuator commands around the operating point given by \(\frac{1}{f} = \frac{2}{R}\).

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Law of reflection        | Determines the direction of each reflected ray            |
| Similar triangles        | Supplies the geometric ratios that yield the mirror equation |
| Sign convention (Cartesian) | Fixes the algebraic signs of object, image, and focal distances |
| Paraxial-ray approximation | Validates the small-angle assumptions used throughout     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rays from an on-axis point
A point object on the optic axis sends two special rays toward a spherical mirror: one that strikes the vertex and reflects symmetrically, and one that passes through the center of curvature and returns along itself.  
Place an object 30 cm from a concave mirror whose radius is 40 cm; the center ray reflects back on itself and the vertex ray reflects at equal angle.  
Under the sign convention (light travels left to right, distances to the left of the pole are negative), these directions fix the image location once the focal length is known.

> [!WARNING]
> Treating the center-of-curvature ray as passing through the focal point instead of retracing itself inverts the image position for objects inside the focal length.

### Step 2 — Definition of focal length
Any ray parallel to the axis reflects through the focal point after striking a concave mirror (or appears to come from the focal point behind a convex mirror).  
A bundle of parallel rays 10 cm off axis on a concave mirror of radius 40 cm converges at 20 cm to the right of the pole.  
Thus \(f = R/2\), or in symbols
\[
f = \frac{R}{2}.
\]

### Step 3 — Construction of the image point
The intersection of the reflected center ray and the reflected parallel ray locates the image.  
For the 30 cm object and 20 cm focal length above, the parallel ray reflects through the focal point while the center ray retraces; their crossing lies 60 cm to the left of the pole, giving a real, inverted image.

### Step 4 — Similar-triangle ratios
Drop perpendiculars from object and image to the axis and compare the two right triangles formed with the focal point.  
The ratios of heights to distances are identical, producing
\[
\frac{h_i}{h_o} = -\frac{v}{u}.
\]

### Step 5 — Elimination of height
Substitute the focal-point triangle similarity \(\frac{h_i}{h_o} = \frac{f}{u-f}\) into the magnification relation and clear the resulting proportion.  
Algebra immediately yields the mirror equation
\[
\frac{1}{v} + \frac{1}{u} = \frac{1}{f}.
\]

### Step 6 — Sign convention made explicit
Object distance \(u\) is negative for real objects on the incident-light side; focal length \(f\) is negative for concave mirrors and positive for convex mirrors; image distance \(v\) is negative for real images and positive for virtual images.  
All three quantities therefore carry consistent signs inside the same algebraic statement.

### Step 7 — Plane-mirror limit
When radius \(R \to \infty\), focal length \(f \to \infty\).  
The mirror equation then forces \(v = -u\), recovering the plane-mirror result that the image lies as far behind the mirror as the object lies in front.

## 5. Worked examples — every step shown

**Example 1 — Concave mirror, object beyond center**  
*Given:* Concave mirror, \(R = 40\) cm so \(f = -20\) cm; object at \(u = -30\) cm.  
*Find:* Image distance \(v\) and magnification.  

Start with the mirror equation
\[
\frac{1}{v} + \frac{1}{u} = \frac{1}{f}.
\]
Substitute the known values:
\[
\frac{1}{v} + \frac{1}{-30} = \frac{1}{-20}.
\]
Isolate the image term:
\[
\frac{1}{v} = \frac{1}{-20} + \frac{1}{30} = -\frac{3}{60} + \frac{2}{60} = -\frac{1}{60}.
\]
Invert:
\[
v = -60\ \text{cm}.
\]
Magnification:
\[
m = -\frac{v}{u} = -\frac{-60}{-30} = -2.
\]
**Final answer**  
\(v = -60\) cm, \(m = -2\) (real, inverted, twice as large).  

*Reflection:* The numbers satisfy the center-of-curvature check; any sign error would have produced a positive \(v\) and an impossible erect real image.

**Example 2 — Convex mirror**  
*Given:* Convex mirror, \(f = +15\) cm, object at \(u = -20\) cm.  
*Find:* \(v\).  

\[
\frac{1}{v} + \frac{1}{-20} = \frac{1}{15} \implies \frac{1}{v} = \frac{1}{15} + \frac{1}{20} = \frac{7}{60} \implies v = +\frac{60}{7}\ \text{cm}.
\]
**Final answer**  
\(v \approx +8.57\) cm (virtual, erect, diminished).  

*Reflection:* Positive \(f\) forces positive \(v\) for any real object, the universal behavior of diverging mirrors.

**Example 3 — Object at focal point**  
*Given:* Concave mirror, \(f = -20\) cm, \(u = -20\) cm.  
*Find:* Image location.  

The denominator on the right vanishes, so
\[
\frac{1}{v} = 0 \implies v = \infty.
\]
**Final answer**  
Image at infinity (rays emerge parallel).  

*Reflection:* The parallel-ray construction becomes the only surviving ray; the equation correctly signals the limiting case.

**Example 4 — Virtual object**  
*Given:* Concave mirror, \(f = -25\) cm, converging incident beam produces virtual object at \(u = +15\) cm.  
*Find:* \(v\).  

\[
\frac{1}{v} + \frac{1}{15} = \frac{1}{-25} \implies \frac{1}{v} = -\frac{1}{25} - \frac{1}{15} = -\frac{8}{75} \implies v = -\frac{75}{8}\ \text{cm}.
\]
**Final answer**  
\(v = -9.375\) cm (real image formed closer than the mirror).  

*Reflection:* Positive \(u\) is the only change required; the same equation handles virtual objects without modification.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(f = R\) instead of \(f = R/2\) | Confuses center of curvature with focal point       | Always write \(f = R/2\) before substituting         |
| Reversing signs of \(u\) and \(v\) | Mixing “front/behind” language with Cartesian convention | Draw the axis and label every distance with its sign before algebra |
| Treating convex focal length as negative | Copying the concave sign by habit                   | State “convex \(\to\) positive \(f\)” as a standing rule |
| Applying the equation for large angles | Forgetting paraxial restriction                     | Restrict all rays to \(\theta < 10^\circ\)           |
| Expecting erect real images       | Ignoring the negative magnification sign            | Always compute \(m = -v/u\) and interpret the sign   |
| Forgetting the image flips when object crosses focal point | Relying on memorized “inside/outside” rules without derivation | Re-derive magnification from similar triangles each time |
| Using object distance as positive when light travels right to left | Changing coordinate direction without updating signs | Fix the incident-light direction once and keep it    |

## 7. The textbook-precise statement
Under the Cartesian sign convention, for a spherical mirror of focal length \(f\) (negative if concave, positive if convex) the object and image distances \(u\) and \(v\) of any paraxial ray satisfy
\[
\frac{1}{v} + \frac{1}{u} = \frac{1}{f},
\]
provided all distances are measured from the pole and the sign of each distance is positive when the corresponding point lies on the side of the outgoing light. (Hecht, *Optics*, 5th ed., §5.2.2.)

## 8. Visual — diagram or schematic
```text
          C          f          P
          •----------•----------•----------→ (axis)
                       \         /
                        \       /  reflected ray
                         \     /
                          \   /
real object →-------------• (vertex)
                          concave mirror surface
```
- C = center of curvature  
- f = focal point  
- P = pole  
Object arrow stands left of C; image arrow (inverted) stands between C and f.

## 9. The memory technique

1. **The hook** — Picture a spoon: the concave inner surface gathers light to a real focus (negative \(f\)); the convex back always pushes light away (positive \(f\)).

2. **What to overlearn**  
   - Mirror equation \(\frac{1}{v} + \frac{1}{u} = \frac{1}{f}\)  
   - Focal-length relation \(f = R/2\)  
   - Sign triad: concave \(f < 0\), convex \(f > 0\), real image \(v < 0\)

3. **Spaced-repetition schedule** — Re-derive the equation from similar triangles at 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback** — Redraw the parallel ray and center-of-curvature ray, form the two similar triangles sharing the focal point, equate height ratios, and clear the algebra.

## 10. What this unlocks
Mastery of the mirror equation supplies the identical algebraic skeleton used for thin-lens imaging and for the first-order design of two-mirror telescopes.  

- Thin-lens equation and lens-maker formula  
- Combination of coaxial mirrors and lenses (effective focal length)  
- Ray-transfer matrices for paraxial beam propagation  
- Aberration theory starting with spherical aberration of a spherical mirror

## 11. Self-check — five questions, no answers
1. An object 15 cm from a concave mirror of focal length 10 cm produces a real image. Where is the image and what is its magnification?

2. A convex mirror forms a virtual image one-third the size of the object. What is the radius of curvature?

3. Derive the mirror equation starting from the sagitta approximation for a spherical surface of radius \(R\).

4. An object is placed exactly at the center of curvature of a concave mirror. Show that the image coincides with the object and explain why the mirror equation appears to give an indeterminate form.

5. A beam converging toward a virtual object 12 cm behind a convex mirror (\(f = +18\) cm) reflects and forms a real image. Calculate the image distance and state whether the mirror increased or decreased the convergence of the beam.