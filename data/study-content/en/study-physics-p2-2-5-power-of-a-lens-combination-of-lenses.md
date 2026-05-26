## 1. The one-sentence answer
**The power of a lens is the reciprocal of its focal length, and the total power of thin lenses in contact is their algebraic sum.**

A lens changes the curvature of wavefronts. The focal length tells you how far the lens must travel before parallel rays meet (or appear to meet). Taking the reciprocal simply converts that distance into a direct measure of bending strength, expressed in dioptres when focal length is in metres.

When two or more thin lenses touch, each adds its own curvature change to the wavefront. Because curvature is additive and power is proportional to curvature, the powers add directly. The sign of each power follows the same convention used for focal length: positive for converging lenses, negative for diverging lenses.

> [!NOTE]
> The addition rule holds only for thin lenses in contact; any separation introduces an extra term involving the distance between principal planes.

## 2. Why this matters — concrete and current
JWST’s NIRCam and MIRI instruments contain multi-element lens groups whose combined power must be known to sub-millimetre precision so that the 6.5 m primary mirror focuses infrared light onto 2048 × 2048 detector arrays at cryogenic temperatures.

In semiconductor lithography, ASML’s High-NA EUV scanners use catadioptric systems whose lens powers are tuned to 0.01 dioptre accuracy; a 1 % error in effective focal length shifts the 8 nm node pattern by several nanometres across a 26 mm field.

Corrective eyewear and intraocular lenses are prescribed directly in dioptres. A –3.25 D lens placed in contact with a +1.50 D lens yields a net –1.75 D correction; optometrists rely on the algebraic sum to avoid over-refraction during trial-frame fitting.

Laser material-processing heads in aerospace manufacturing combine a collimating lens and a focusing lens whose powers determine spot size at 10–20 kW. Engineers at Trumpf and IPG Photonics calculate effective power to maintain 20 µm spots on titanium airframe components.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Thin-lens equation       | Supplies the definition of focal length that power reciprocates |
| Sign convention (Cartesian) | Determines whether power is positive or negative          |
| Refraction at spherical surfaces | Derives the lens-maker formula that links radius and refractive index to focal length |

## 4. Building the idea — from intuition to formalism

### Step 1 — Focal length as wavefront curvature
Parallel incident rays leave a lens with a spherical wavefront whose radius equals the focal length. A short focal length means tight curvature and strong bending.

Example: A biconvex lens with radii 20 cm focuses sunlight 10 cm behind the lens, so f = +0.10 m.

The lens-maker formula for a thin lens in air is
$$
\frac{1}{f} = (n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right).
$$

> [!WARNING]
> Reversing the sign of R₁ or R₂ without changing the direction of incident light produces the wrong focal length.

### Step 2 — Power as reciprocal curvature
Power P is defined as P = 1/f. The unit is the dioptre (D) when f is in metres. Power therefore measures curvature directly.

For the lens above, P = 1/0.10 = +10 D.

### Step 3 — Algebraic sign follows the same convention
Converging lenses have positive focal length and positive power. Diverging lenses have negative focal length and negative power. This sign is fixed by the Cartesian convention: light travels left to right, distances to the right of the optical centre are positive.

### Step 4 — Wavefront addition for thin lenses in contact
Each lens adds its curvature change at the same plane. Total curvature after two lenses is therefore the sum of individual curvatures.

Hence
$$
P = P_1 + P_2.
$$

### Step 5 — Extension to any number of thin lenses
By induction the rule generalises to N lenses:
$$
P = \sum_{i=1}^N P_i = \sum_{i=1}^N \frac{1}{f_i}.
$$

The effective focal length of the combination is then F = 1/P.

### Step 6 — Textbook statement reached
For thin lenses in contact the total power equals the algebraic sum of individual powers, each measured with the Cartesian sign convention.

## 5. Worked examples — every step shown

**Example 1 — Single converging lens**  
*Given:* A plano-convex lens of refractive index 1.5 has a curved surface of radius +20 cm.  
*Find:* Its power in dioptres.  

Lens-maker formula:
$$
\frac{1}{f}=(1.5-1)\left(\frac{1}{+\infty}-\frac{1}{+0.20}\right)=-2.5\ \text{m}^{-1}.
$$
Why: R₁ = ∞ for the plane surface, R₂ = +0.20 m.  
P = 1/f = –2.5 D.  
**–2.5 D**  

*Reflection:* The negative sign appeared because light encounters the convex surface second; the lens is actually diverging when used this way.

**Example 2 — Two lenses in contact**  
*Given:* A +5 D lens and a –2 D lens are placed in contact.  
*Find:* Net power and effective focal length.  

P = P₁ + P₂ = 5 + (–2) = 3 D.  
Why: Powers add algebraically for thin lenses in contact.  
F = 1/P = 1/3 m = +33.3 cm.  
**+3 D, F = +0.333 m**  

*Reflection:* The diverging lens reduces total power and lengthens the focal length exactly as expected.

**Example 3 — Ophthalmic correction**  
*Given:* A myopic eye requires –4.00 D. A reading lens of +2.50 D is added for near work.  
*Find:* The power of the combined spectacle.  

P = –4.00 + 2.50 = –1.50 D.  
Why: Both powers are measured from the same reference plane (the cornea).  
**–1.50 D**  

*Reflection:* The result is still myopic; the add merely shifts the far point inward for reading.

**Example 4 — Three-lens system**  
*Given:* Lenses of powers +10 D, –3 D and +4 D are cemented together.  
*Find:* Effective focal length.  

P = 10 – 3 + 4 = 11 D.  
F = 1/11 m ≈ 9.09 cm.  
**F = +0.0909 m**  

*Reflection:* Cementing eliminates air gaps; the simple sum remains valid.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Adding focal lengths instead of powers | Confuses distance with curvature            | Always convert to dioptres first             |
| Ignoring sign when one lens diverges | Habit of treating all lenses as positive    | Write the sign explicitly before summing     |
| Using centimetres for focal length | Unit error in dioptre definition            | Convert to metres before taking reciprocal   |
| Applying contact formula to separated lenses | Overlooks the extra propagation term        | Check separation against lens thickness      |
| Reversing R₁ and R₂ in lens-maker formula | Forgetting light direction                  | Fix light direction before assigning signs   |
| Forgetting that power is measured in air | Using medium-dependent focal length         | Divide by refractive index of surrounding medium when required |
| Treating virtual image distances as negative power | Mixing object/image signs with lens power   | Keep lens power sign separate from image distance sign |

## 7. The textbook-precise statement
For a set of thin lenses in contact in air, the effective power is
$$
P = \sum_i P_i,\qquad P_i = \frac{1}{f_i},
$$
where each focal length fᵢ is obtained from the lens-maker formula with the Cartesian sign convention (light travels left to right; radii measured from the optical centre, positive if the centre of curvature lies to the right). The effective focal length of the combination is F = 1/P. (Hecht, *Optics*, 5e, §5.2.3)

## 8. Visual — diagram or schematic
```text
Parallel rays →  [  )  ]  [  (  ]  → focus
                 Lens1     Lens2     F
                 P1>0      P2<0      F=1/(P1+P2)
```
Lens 1 (converging) is drawn as ) (, Lens 2 (diverging) as ( ). Rays bend inward at Lens 1 and outward at Lens 2; net convergence occurs at distance F to the right of the common optical centre.

## 9. The memory technique
1. **The hook** — Imagine each lens stamping a “curvature credit” onto the wavefront; the final wavefront curvature is the algebraic sum of the stamps, hence powers add.
2. **What to overlearn** — P = 1/f (f in m), P = P₁ + P₂ for thin lenses in contact, sign follows Cartesian convention.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the lens-maker formula for each surface, add the power contributions  (n–1)/R at each interface, then sum.

## 10. What this unlocks
Mastery of lens power lets you design afocal beam expanders, calculate back-focal distances in camera lenses, and analyse the stability of laser resonators.  
- Next: thick-lens principal planes and the general matrix optics formalism  
- Next: chromatic aberration and achromatic doublets  
- Next: microscope and telescope tube-length calculations  
- Next: wavefront sensing and adaptive-optics deformable mirrors

## 11. Self-check — five questions, no answers
1. A lens has radii +15 cm and –25 cm and refractive index 1.6. What is its power?  
2. Two thin lenses of powers +8 D and –5 D are separated by 4 cm. Is the contact formula still valid? Explain.  
3. An object is placed 30 cm in front of a +10 D lens. Where is the image?  
4. Why does the effective power of two identical converging lenses decrease when they are moved apart?  
5. A spectacle lens reads –2.75 D in air. What is its power when immersed in water (n = 1.33)?