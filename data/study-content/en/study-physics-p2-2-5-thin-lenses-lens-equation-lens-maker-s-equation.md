## 1. The one-sentence answer
**Thin-lens optics rests on two equations that connect object distance, image distance, focal length, and the curvatures plus refractive index of a lens.**

Light rays bend at each spherical surface according to Snell's law. For a lens thin enough that its thickness can be neglected compared with the radii, the two refractions combine into a single relation between object and image locations. The focal length that appears in this relation is itself fixed by the lens maker's formula, which follows from applying the refraction formula at each surface and adding the powers.

The result is the Gaussian lens equation
\[
\frac{1}{f}=\frac{1}{u}+\frac{1}{v}
\]
together with the explicit expression for \(f\) in terms of geometry and material. These equations hold under the paraxial approximation (rays nearly parallel to the optic axis) and the sign convention that object distance is negative when measured against the incoming light.

> [!NOTE]
> The single most powerful insight is that every thin lens behaves exactly like a device that adds a fixed optical power \(P=1/f\); once you accept that addition rule, image location becomes simple arithmetic.

## 2. Why this matters — concrete and current
The James Webb Space Telescope uses a 6.5 m primary mirror whose image is formed by a three-mirror anastigmat whose secondary and tertiary elements are figured as thin-lens equivalents during the first-order optical design; the thin-lens starting point fixes the required focal lengths before any aspheric correction is applied.

Semiconductor lithography scanners at ASML employ projection lenses with more than 20 elements whose first-order properties are still computed from the thin-lens equation; the numerical aperture and field size are set by solving the lens equation for the reduction ratio before wave-optics corrections are introduced.

Laser guide-star systems on ground-based telescopes such as the Keck Observatory focus sodium-layer beacons with refractive or hybrid lenses whose focal lengths are obtained from the lens-maker equation; the resulting spot size on the mesosphere directly determines the wavefront-sensor sampling.

CubeSat star trackers and Earth-imaging payloads rely on commercial off-the-shelf lenses whose effective focal length is verified with the thin-lens formula before the modulation-transfer-function budget is calculated.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Snell's law at a spherical surface | Supplies the angle change that becomes the power of each surface |
| Sign convention for distances | Prevents sign errors when object and image lie on opposite sides of the lens |
| Paraxial-ray (small-angle) approximation | Justifies the linearised form of the ray-transfer equations |
| Optical power addition | Explains why two surfaces in contact produce a single focal length |

## 4. Building the idea — from intuition to formalism

### Step 1 — Refraction at one spherical surface
A ray travelling in air strikes a convex glass surface of radius \(R\). The surface changes the ray's direction according to the difference in refractive indices.

Place an object point on the axis at distance \(u\) from the vertex. Under the paraxial approximation the image formed by this single surface lies at distance \(v\) given by
\[
\frac{n}{v}-\frac{1}{u}=\frac{n-1}{R}.
\]

> [!WARNING]
> Omitting the refractive index \(n\) on the image side produces an immediate factor-of-\(n\) error in focal length.

### Step 2 — Second surface completes the lens
A second spherical surface of radius \(R_2\) is placed a negligible thickness \(d\to0\) after the first. The intermediate image formed by the first surface now acts as object for the second.

Because thickness is zero the object distance for the second surface equals \(-v\) (sign flip). Applying the single-surface formula again and adding the two equations eliminates the intermediate distance and yields a direct relation between object and final image.

### Step 3 — Definition of focal length
When the object is at infinity the final image distance equals the focal length \(f\). Substituting \(u=-\infty\) into the combined equation isolates
\[
\frac{1}{f}=(n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right).
\]
This is the lens-maker's equation.

### Step 4 — The thin-lens equation
With focal length defined, the combined surface equation reduces to the compact form
\[
\frac{1}{u}+\frac{1}{v}=\frac{1}{f}.
\]
All subsequent calculations use only this algebraic statement.

### Step 5 — Power and sign convention
Optical power \(P=1/f\) (in dioptres when \(f\) is in metres) adds for thin lenses in contact. Distances are measured from the lens; light travels left to right, real-object distances are negative, real-image distances are positive.

## 5. Worked examples — every step shown

**Example 1 — Converging lens, object beyond focal point**  
*Given:* \(f=+20\) cm, \(u=-30\) cm.  
*Find:* \(v\).  

Start with the lens equation:
\[
\frac{1}{u}+\frac{1}{v}=\frac{1}{f}.
\]
Substitute the signed values:
\[
\frac{1}{-30}+\frac{1}{v}=\frac{1}{20}.
\]
Add \(1/30\) to both sides:
\[
\frac{1}{v}=\frac{1}{20}+\frac{1}{30}=\frac{3+2}{60}=\frac{5}{60}=\frac{1}{12}.
\]
Invert:
\[
v=+12\text{ cm}.
\]
**Final answer:** \(v=+12\) cm.  
*Reflection:* The positive image distance shows a real, inverted image on the opposite side; the arithmetic is identical for any sign-consistent choice of \(u\).

**Example 2 — Lens maker's equation, biconvex lens**  
*Given:* \(n=1.5\), \(R_1=+10\) cm, \(R_2=-10\) cm.  
*Find:* \(f\).  

Apply the lens-maker formula directly:
\[
\frac{1}{f}=(1.5-1)\left(\frac{1}{+10}-\frac{1}{-10}\right)=0.5\left(\frac{1}{10}+\frac{1}{10}\right)=0.5\times0.2=0.1.
\]
Thus
\[
f=10\text{ cm}.
\]
**Final answer:** \(f=+10\) cm.  
*Reflection:* Equal radii of opposite sign maximise power for a given \(n\); reversing either radius flips the sign of \(f\).

**Example 3 — Virtual object, diverging lens**  
*Given:* \(f=-15\) cm, converging beam so \(u=+25\) cm (virtual object).  
*Find:* \(v\).  

Lens equation:
\[
\frac{1}{+25}+\frac{1}{v}=\frac{1}{-15}.
\]
Solve for the image term:
\[
\frac{1}{v}=-\frac{1}{15}-\frac{1}{25}=-\frac{5+3}{75}=-\frac{8}{75}.
\]
Invert:
\[
v=-9.375\text{ cm}.
\]
**Final answer:** \(v=-9.375\) cm (virtual image).  
*Reflection:* The negative object distance reverses the usual arithmetic; always insert the sign that matches the chosen convention before calculating.

**Example 4 — Two thin lenses in contact**  
*Given:* \(f_1=+20\) cm, \(f_2=-10\) cm, object at \(u=-30\) cm.  
*Find:* final image distance.  

Combined power:
\[
\frac{1}{f}=\frac{1}{20}+\frac{1}{-10}=0.05-0.1=-0.05\implies f=-20\text{ cm}.
\]
Lens equation:
\[
\frac{1}{-30}+\frac{1}{v}=\frac{1}{-20}.
\]
\[
\frac{1}{v}=-\frac{1}{20}+\frac{1}{30}=-\frac{3-2}{60}=-\frac{1}{60}.
\]
\[
v=-60\text{ cm}.
\]
**Final answer:** \(v=-60\) cm.  
*Reflection:* Power addition works only for zero separation; any finite gap requires the thick-lens or matrix treatment.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the sign of \(R_2\) | Students treat both radii as positive by default | Always assign \(R\) positive if the centre lies to the right of the surface |
| Using object distance as positive | Habit from Cartesian geometry | Fix the convention once: real object distance is negative for light travelling left to right |
| Applying the lens equation to thick lenses | Neglecting the separation between principal planes | Measure distances from the appropriate principal planes or use the thick-lens formula |
| Confusing focal length with radius | Reading “f = R/2” from mirrors into lenses | Remember the lens-maker factor \((n-1)\) multiplies the curvature sum |
| Ignoring medium index | Assuming the lens is always in air | Replace 1 by \(n_m\) on both sides of the lens-maker equation when immersed |
| Adding focal lengths instead of powers | Intuitive but algebraically wrong | Convert to power \(P=1/f\) before adding |
| Paraxial breakdown at large angles | Using the linear equation beyond its validity | Check that ray heights remain ≪ radii before trusting the result |

## 7. The textbook-precise statement
For a thin lens of refractive index \(n\) surrounded by medium of index \(n_m=1\), bounded by spherical surfaces of radii \(R_1\) and \(R_2\) (sign: centre after the surface is positive), the focal length measured in the surrounding medium satisfies
\[
\frac{1}{f}=(n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right)
\]
provided all angles remain small enough that \(\sin\theta\approx\theta\). The conjugate relation between object and image distances is
\[
\frac{1}{u}+\frac{1}{v}=\frac{1}{f}.
\]
(Hecht, *Optics*, 5e, §6.2, eqs. 6.9–6.10.)

## 8. Visual — diagram or schematic
```text
          optic axis
  ────────────────────────────────►
          │               │
   object │      lens     │  image
     ●    │     ) (       │    ●
          │               │
   u <─── │               │ ───> v
          │               │
          R1 >0     R2 <0
```
Light travels left to right. \(R_1\) is positive when its centre of curvature lies to the right of the first vertex; \(R_2\) is negative when its centre lies to the left of the second vertex.

## 9. The memory technique
1. **The hook** — Picture a thin lens as a “power pump” that adds a fixed dioptre value at a single plane, like a single electrical resistor whose resistance is fixed regardless of current direction.  
2. **What to overlearn** — The two equations
   \[
   \frac{1}{f}=(n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right),\qquad\frac{1}{u}+\frac{1}{v}=\frac{1}{f}
   \]
   together with the sign rule “real object distance negative”.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by applying the single-surface refraction formula twice and setting thickness to zero.

## 10. What this unlocks
Mastery of the thin-lens equation lets you design first-order layouts for multi-element systems, compute image location and magnification instantly, and move without hesitation into matrix optics or aberration theory.

- Ray-transfer (ABCD) matrices treat each thin lens as a simple diagonal matrix whose determinant is unity.  
- Thick-lens and principal-plane calculations begin from the thin-lens limit.  
- Paraxial ray tracing in optical design software uses the same power-addition step before higher-order surfaces are introduced.

## 11. Self-check — five questions, no answers
1. A plano-convex lens has \(R_1=\infty\), \(R_2=-8\) cm, \(n=1.6\). Compute \(f\).  
2. An object is placed 12 cm to the left of a diverging lens of focal length −8 cm. Where is the image?  
3. Two thin lenses of powers +5 D and −2 D are placed in contact. What is the combined focal length?  
4. Explain why the lens-maker equation changes sign when the lens is flipped end-for-end in air.  
5. A ray parallel to the axis at height 2 cm strikes a thin lens of \(f=+10\) cm. After refraction, where does it cross the axis?