## 1. The one-sentence answer
**The sign convention for mirrors and lenses is a consistent Cartesian rule that assigns algebraic signs to object, image, and focal distances according to the direction of incident light relative to the optical element.**

Light propagates from left to right in every diagram. Any distance measured from the pole or optical centre in that same direction receives a positive sign; any distance measured against the incoming light receives a negative sign. This single rule converts the geometric ray diagram into an algebraic equation that works identically for concave and convex mirrors, converging and diverging lenses, and real or virtual objects and images.

Because the signs are fixed by geometry rather than by the type of surface, the same pair of equations  
\[
\frac{1}{v} + \frac{1}{u} = \frac{1}{f}, \qquad m = -\frac{v}{u}
\]  
applies to every case once the signs have been assigned correctly. The convention therefore removes the need for separate “remember this for concave, that for convex” lists.

> [!NOTE]
> The most important “aha” is that object distance *u* is almost always negative; this single fact forces focal length *f* to be negative for concave mirrors and positive for convex lenses, automatically producing the correct image location without additional case-by-case logic.

## 2. Why this matters — concrete and current
The James Webb Space Telescope’s primary mirror segments are aligned to nanometre precision using wavefront-sensing algorithms whose ray-trace kernels embed the identical Cartesian sign convention; a single sign error in the model would mis-predict the 6.5 m aperture’s focal surface and destroy the telescope’s diffraction-limited performance at 2 µm.

Smartphone camera modules from Sony and Samsung contain stacked lens groups whose design software (Code V, Zemax) propagates rays with the same convention; an incorrect sign on any element spacing produces an inverted distortion map that fails the Modulation Transfer Function specification required for 108 MP sensors.

Semiconductor lithography scanners made by ASML project 13.5 nm EUV light through catadioptric systems whose mirror and lens prescriptions are signed exactly as in the school formula; a sign flip on any concave surface would shift the aerial image by tens of nanometres and scrap every wafer.

Laser guide-star adaptive-optics systems on the Extremely Large Telescope measure atmospheric turbulence by tracking the return of a sodium laser; the Shack–Hartmann wavefront sensor’s centroid calculations rely on the same sign convention to convert measured slopes into deformable-mirror commands accurate to a few tens of nanometres rms.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ray optics: rectilinear propagation, reflection and refraction laws | Supplies the geometric rays whose intersection defines real or virtual image points |
| Definition of pole, optical centre, principal axis, focal point | Identifies the unique origin from which all distances are measured |
| Distinction between real and virtual images | Determines whether the image distance lies on the transmitted-light side (real) or incident-light side (virtual) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose an origin and a positive direction
Place the pole of a mirror or the optical centre of a lens at the coordinate origin. Adopt the direction of the incident light as the positive *x*-axis. All subsequent distances are measured from this origin along or against that axis.

A 5 cm tall object placed 30 cm to the left of a concave mirror therefore has object distance *u* = −30 cm, because the measurement points opposite the incoming light.

The formal statement is simply that the incident-light direction defines the positive sense:
\[
\text{sign}(d) = +1 \quad \text{if } d \text{ is parallel to incident ray}, \quad -1 \text{ otherwise}.
\]

> [!WARNING]
> Reversing the positive direction midway through a multi-element system instantly produces inconsistent signs; always keep the incident-light arrow fixed for the entire calculation.

### Step 2 — Assign the object distance
Real objects lie on the incident-light side, so *u* is invariably negative. Virtual objects (converging beams aimed at a point behind the element) receive positive *u*.

For the concave-mirror example above, *u* = −30 cm.

### Step 3 — Assign the focal length
A concave mirror converges parallel rays; its focal point lies on the reflected-light side, therefore *f* < 0. A convex mirror diverges rays; its virtual focus lies on the incident-light side, *f* > 0. For thin lenses the opposite holds: converging lenses have *f* > 0, diverging lenses *f* < 0.

### Step 4 — Assign the image distance
A real image is formed where rays actually converge after reflection or refraction; that point lies on the transmitted-light side, so *v* < 0 for mirrors and *v* > 0 for lenses. A virtual image lies on the incident-light side, reversing the sign.

### Step 5 — Apply the mirror or lens equation
With every distance signed, the single equation
\[
\frac{1}{v} + \frac{1}{u} = \frac{1}{f}
\]
yields the correct numerical value of *v*. Magnification follows at once:
\[
m = -\frac{v}{u}.
\]

The final textbook statement therefore contains no separate cases; the signs carry all geometric information.

## 5. Worked examples — every step shown

**Example 1 — Concave mirror, real object**
*Given:* Concave mirror, *f* = −15 cm, object at *u* = −30 cm.  
*Find:* *v* and *m*.

1. Insert into mirror equation:  
   \[
   \frac{1}{v} + \frac{1}{-30} = \frac{1}{-15}
   \]
   *Why:* Both *u* and *f* already carry the correct signs from Steps 2 and 3.  
2. Solve:  
   \[
   \frac{1}{v} = -\frac{1}{15} + \frac{1}{30} = -\frac{1}{30} \implies v = -30\,\text{cm}.
   \]
   *Why:* Negative *v* indicates real image on the reflected-light side.  
3. Magnification:  
   \[
   m = -\frac{-30}{-30} = -1.
   \]
   **Final answer:** *v* = −30 cm, *m* = −1 (inverted, same size).  
*Reflection:* The equality |*u*| = |*v*| is the classic centre-of-curvature case; the signs alone produced the inversion without extra logic.

**Example 2 — Convex mirror, real object**
*Given:* Convex mirror, *f* = +20 cm, *u* = −30 cm.  
*Find:* *v*.

\[
\frac{1}{v} + \frac{1}{-30} = \frac{1}{+20} \implies \frac{1}{v} = \frac{1}{20} + \frac{1}{30} = \frac{1}{12} \implies v = +12\,\text{cm}.
\]
**Final answer:** *v* = +12 cm (virtual, erect, diminished).  
*Reflection:* Positive *f* and positive *v* emerged automatically once the convex surface was assigned its sign.

**Example 3 — Converging lens, real object beyond 2f**
*Given:* *f* = +10 cm, *u* = −25 cm.  
*Find:* *v*.

\[
\frac{1}{v} = \frac{1}{10} - \frac{1}{-25} = 0.1 + 0.04 = 0.14 \implies v = +7.14\,\text{cm}.
\]
**Final answer:** *v* ≈ +7.1 cm, *m* ≈ −0.29 (real, inverted, diminished).  
*Reflection:* Positive *v* for a lens signals a real image on the far side; the same arithmetic works for diverging lenses when *f* is entered negative.

**Example 4 — Diverging lens, virtual object**
*Given:* Diverging lens, *f* = −8 cm, converging beam aimed at a virtual object 12 cm to the right of the lens (*u* = +12 cm).  
*Find:* *v*.

\[
\frac{1}{v} + \frac{1}{+12} = \frac{1}{-8} \implies \frac{1}{v} = -\frac{1}{8} - \frac{1}{12} = -\frac{5}{24} \implies v = -4.8\,\text{cm}.
\]
**Final answer:** *v* = −4.8 cm (image formed to the left of the lens).  
*Reflection:* The positive *u* correctly signals a virtual object; the negative *v* shows the diverging lens cannot bring the already-converging beam to a focus on the right-hand side.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating *u* as positive because “object distance is positive” | Everyday language says distances are positive; students forget the convention overrides language | Write the incident-light arrow on every diagram before assigning any number |
| Using *f* > 0 for a concave mirror because “it focuses light” | Confusion between “converging” and the sign table | Memorise: mirrors reverse the lens sign rule—concave *f* < 0 |
| Forgetting the minus sign in *m* = −*v*/*u* | The negative is required for orientation; students drop it | Always compute *m* after *v* and check whether the image is inverted |
| Mixing up real/virtual signs between mirrors and lenses | Real image lies on opposite side of mirror but same side of lens relative to incident light | Draw the transmitted ray direction explicitly each time |
| Changing the positive direction when light reflects back | After reflection the “incident” direction has reversed | Keep the original incident arrow fixed for the whole calculation |
| Entering object height as negative | Height is measured perpendicular to axis; only longitudinal distances receive the Cartesian sign | Reserve signs exclusively for *u*, *v*, *f* |
| Using the lens equation for a thick lens without the correct principal-plane shift | The optical centre is no longer at the vertex | Verify the element is thin or locate the principal planes first |

## 7. The textbook-precise statement
Under the New Cartesian Sign Convention the distances *u*, *v* and *f* obey the Gaussian optics equation
\[
\frac{1}{v} - \frac{1}{u} = \frac{1}{f}
\]
(with the mirror form obtained by writing *f* → −*f*) provided: (i) the incident light travels in the positive *x* direction, (ii) all distances are measured from the pole or optical centre, and (iii) the sign of each distance is positive when the corresponding point lies on the side the light is travelling toward after interaction. (Hecht, *Optics*, 5e, §5.2.2)

## 8. Visual — diagram or schematic
```text
Incident light →          Mirror / Lens
          ────────────────┐
          │               │ P (origin)
          │   u (-)       │   f (sign depends)
          │◄──────────────┼──────────────►
          │               │   v (sign depends)
   Object O               Image I
```
- Arrow above the axis points right (positive direction = incident light).  
- Distances to the left of P are negative; distances to the right are positive.  
- For a concave mirror the focal point F lies left of P (*f* < 0); for a converging lens F lies right of P (*f* > 0).

## 9. The memory technique

1. **The hook** — Picture a river flowing left to right; any distance you measure downstream (with the current) is positive, upstream (against the current) is negative. The optical element sits at a bridge; the river never reverses.

2. **What to overlearn** — (a) *u* is negative for every real object; (b) mirror *f* has opposite sign to lens *f* for the same curvature; (c) the equation is always 1/*v* + 1/*u* = 1/*f*.

3. **Spaced-repetition schedule** — Review the river image and the three facts at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Redraw the incident-light arrow, label the pole, then ask for each distance: “Is the endpoint in the direction the light will travel after the element?” If yes, positive; if no, negative.

## 10. What this unlocks
Mastery of the sign convention lets you proceed directly to the lens-maker’s formula, paraxial ray-transfer matrices, and aberration calculations without re-deriving signs each time. It is the prerequisite for matrix optics, Fourier optics, and any ray-trace code used in telescope or lithography design.

- Thin-lens combination formula  
- Lens-maker’s equation derivation  
- Ray-transfer (ABCD) matrices  
- Seidel aberration coefficients  
- Wavefront propagation in adaptive-optics loops

## 11. Self-check — five questions, no answers
1. An object is placed 40 cm in front of a convex mirror of focal length 25 cm. Using the sign convention, compute the image distance and magnification.

2. A real object 15 cm from a diverging lens produces a virtual image 10 cm from the lens on the same side. Determine the focal length with correct sign.

3. A converging beam is incident on a concave mirror so that the virtual object lies 20 cm behind the mirror. If *f* = −12 cm, where is the image formed?

4. Two thin lenses of focal lengths +10 cm and −5 cm are placed in contact. An object is 30 cm to the left of the combination. Find the final image location and overall magnification.

5. Explain why the same numerical value of *f* can describe both a converging lens and a diverging mirror, yet the images they produce differ in character.