## 1. The one-sentence answer
**The mirror equation** \(\frac{1}{v} + \frac{1}{u} = \frac{1}{f}\) relates object distance \(u\), image distance \(v\), and focal length \(f\) for any mirror (plane, concave, or convex) under the paraxial-ray approximation with a consistent sign convention.

Plane mirrors produce virtual, erect, same-size images because their radius of curvature is infinite, so \(f = \infty\). Concave mirrors converge parallel rays to a real focal point and can form both real and virtual images depending on object placement. Convex mirrors diverge rays and always form virtual, diminished images. The single equation works for all three once you fix the sign convention (usually Cartesian: object distance negative, real images positive for \(v\) and \(f\)).

Aap jab ray diagrams draw karte ho aur distances measure karte ho, tab yeh equation automatically bata deti hai ki image kahan aur kis size ki banegi, bina har baar geometry redraw kiye.

> [!NOTE]
> The “aha” moment is realizing that the same algebraic relation holds for every mirror type; only the sign of \(f\) changes. Once the sign convention is locked, plane (\(f = \infty\)), concave (\(f < 0\)), and convex (\(f > 0\)) become special cases of one formula.

## 2. Why this matters — concrete and current
In satellite laser ranging (NASA’s Lunar Reconnaissance Orbiter), concave mirrors focus return pulses onto detectors; the mirror equation predicts spot size at the focal plane to sub-millimeter accuracy.  

JWST’s deployable concave segments use the same relation to verify alignment after unfolding; small errors in \(f\) produce measurable wavefront aberrations that are corrected by actuators.  

Smartphone selfie cameras employ convex mirrors in periscope modules (Samsung Galaxy S23 Ultra) to widen the field of view; the equation tells designers the maximum object distance before distortion exceeds the sensor’s Nyquist limit.  

Autonomous-vehicle LiDAR (Velodyne HDL-64E) uses rotating convex mirrors to steer laser beams; focal-length drift due to temperature directly shifts the reported range via the mirror formula, requiring real-time calibration.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sign convention      | Determines whether \(u\), \(v\), \(f\) are positive or negative |
| Similar triangles    | Derives the mirror equation from ray geometry             |
| Paraxial approximation | Keeps angles small so \(\sin\theta \approx \tan\theta \approx \theta\) |
| Real vs virtual image| Tells you whether light actually converges or only appears to diverge |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Light travels in straight lines until it hits a reflecting surface
Aap sochiye ek object se nikli light ray mirror tak pahunchti hai aur wapas aati hai. Plane mirror mein ray simply flip ho jaati hai; curved mirror mein local normal ke hisaab se angle change hota hai.

Example: wall ke saamne khade ho, aapka reflection seedha dikhta hai.  
Formal statement: angle of incidence = angle of reflection measured from the normal.  
> [!WARNING] Agar aap normal ke bajaye surface se angle lete ho, sign convention toot jaata hai aur pura equation galat ho jaata hai.

### Step 2 — Define pole, centre of curvature, and focus
Pole \(P\) mirror ka centre point hai. Centre of curvature \(C\) sphere ka centre hai jiska part mirror hai. Focus \(F\) woh point hai jahaan se parallel rays guzarne ke baad reflect ho kar jaati hain.

Example: concave mirror mein \(C\) object side par hota hai, \(F\) uske beech mein.  
Formal: focal length \(f = R/2\), jahaan \(R\) radius of curvature hai.

### Step 3 — Choose a consistent sign convention
Cartesian convention: incident light left se right, distances measured from pole, object side negative. Real images aur foci object side par negative \(f\) dete hain concave ke liye.

Example: object 30 cm left of pole → \(u = -30\) cm.  
Formal: all measured quantities carry sign according to the chosen convention.

### Step 4 — Draw two principal rays and locate the image
Ray parallel to axis reflects through focus. Ray through focus reflects parallel. Intersection image point deta hai.

Example: object at infinity → image at focus.  
Formal: image coordinates \((v, h_i)\) obtained by ray intersection.

### Step 5 — Use similar triangles to obtain the mirror equation
From the two triangles formed by object height, image height, and focal point, ratios equate to give \(\frac{1}{v} + \frac{1}{u} = \frac{1}{f}\).

Example: object distance 30 cm, \(f = -15\) cm → \(v = -30\) cm (real image same size).  
Formal: after cancelling common terms from similar-triangle proportions, the equation appears.

### Step 6 — Magnification follows directly
Lateral magnification \(m = -\frac{v}{u}\). Positive \(m\) means erect image.

### Step 7 — Special cases recover plane, concave, convex behaviour
Plane: \(f = \infty\) → \(v = -u\). Concave: \(f < 0\), real/virtual transition at \(u = f\). Convex: \(f > 0\), always virtual.

### Step 8 — Textbook-grade statement
Under the paraxial approximation and the Cartesian sign convention, every spherical mirror satisfies the mirror equation with a single focal length \(f = R/2\).

## 5. Worked examples — har step show karo

**Example 1 — Plane mirror**  
*Given:* Object 25 cm in front of plane mirror.  
*Find:* Image location and magnification.  
Step 1: \(f = \infty\).  
Step 2: \(\frac{1}{v} + \frac{1}{-25} = 0\) → \(v = -25\) cm.  
*Why:* Infinity term vanishes, leaving \(v = -u\).  
**Final answer:** \(v = -25\) cm, \(m = 1\) (erect, same size).  
*Reflection:* Plane mirror is the infinite-radius limit; equation reduces to simple equality.

**Example 2 — Concave mirror, object beyond C**  
*Given:* \(f = -15\) cm, \(u = -45\) cm.  
*Find:* \(v\) and \(m\).  
\(\frac{1}{v} + \frac{1}{-45} = \frac{1}{-15}\) → \(\frac{1}{v} = -\frac{1}{15} + \frac{1}{45} = -\frac{1}{22.5}\) → \(v = -22.5\) cm.  
*Why:* Both object and image real, so negative signs.  
**Final answer:** \(v = -22.5\) cm, \(m = 0.5\) (real, inverted, diminished).  
*Reflection:* Object beyond centre yields real image between \(f\) and \(C\).

**Example 3 — Concave mirror, object between f and pole**  
*Given:* \(f = -15\) cm, \(u = -10\) cm.  
\(\frac{1}{v} = -\frac{1}{15} + \frac{1}{10} = \frac{1}{30}\) → \(v = 30\) cm.  
*Why:* Positive \(v\) means virtual image behind mirror.  
**Final answer:** \(v = 30\) cm, \(m = -3\) (virtual, erect, magnified).  
*Reflection:* Virtual image appears when object is inside focal length.

**Example 4 — Convex mirror**  
*Given:* \(f = +20\) cm, \(u = -30\) cm.  
\(\frac{1}{v} = \frac{1}{20} - \frac{1}{30} = \frac{1}{60}\) → \(v = 60\) cm.  
*Why:* Positive \(f\) forces positive \(v\) (virtual image).  
**Final answer:** \(v = 60\) cm, \(m = -2\) (virtual, erect, diminished).  
*Reflection:* Convex mirrors always give virtual, reduced images regardless of object distance.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                           | How to avoid it                              |
|-----------------------------|------------------------------------------|----------------------------------------------|
| Forgetting sign of \(f\)    | Students treat all mirrors as concave    | Write \(f\) sign immediately after reading problem |
| Using object distance positive | Old “real is positive” convention mixed | Stick to one convention for entire problem   |
| Applying equation for large angles | Paraxial limit violated                  | Check that ray angles < 10° or use exact ray trace |
| Confusing \(v\) sign for virtual images | Virtual image behind mirror feels “negative” | Remember: real images have positive \(v\) in Cartesian convention |
| Calculating magnification without negative sign | Missing inverted-image indicator         | Always include the minus in \(m = -v/u\)     |
| Assuming \(R = f\)          | Radius and focal length mixed            | Remember \(f = R/2\) for spherical mirrors   |
| Ignoring units              | cm vs m inconsistency                    | Convert all lengths to same unit before substitution |

## 7. The textbook-precise statement
Hecht, *Optics*, 5e, §5.2.2 states: “For a spherical mirror of radius \(R\), under the paraxial approximation and adopting the sign convention that object distances are negative and that light travels from left to right, the mirror equation is \(\frac{1}{v} + \frac{1}{u} = \frac{1}{f}\) with \(f = R/2\). The equation holds for concave (\(R < 0\)), convex (\(R > 0\)), and plane (\(R = \infty\)) mirrors.”

## 8. Visual — diagram or schematic
```
          C          F          P
          •          •          |
          |          |          |
   object →          |          |  ← reflected rays converge (concave case)
          \          /          |
           \        /           |
            \      /            |
             \    /             |
              \  /              |
               \/               |
```
P = pole, F = focus, C = centre of curvature. Parallel ray reflects through F; ray through C reflects back on itself.

## 9. The memory technique
1. **The hook** — Imagine a spoon: inner (concave) side can burn paper at focus; outer (convex) side always shows a tiny face.  
2. **What to overlearn** — \(\frac{1}{v} + \frac{1}{u} = \frac{1}{f}\), \(f = R/2\), \(m = -v/u\), and Cartesian sign rule.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Redraw two principal rays, label similar triangles, equate height ratios, cancel common terms to recover the equation.

## 10. What this unlocks
You can now predict image location and size for any spherical mirror without drawing a new diagram each time.  

- Thin-lens equation (next subtopic)  
- Lens-maker’s formula  
- Aberration analysis in telescope design  
- Ray-transfer matrices in laser cavities  

## 11. Self-check — five questions, no answers
1. An object is placed 20 cm in front of a concave mirror of focal length 15 cm. Where is the image and is it real or virtual?  
2. A convex mirror forms a virtual image at 30 cm behind the mirror when the object is 45 cm in front. What is its focal length?  
3. Why does the mirror equation fail for a ray that strikes the mirror at 45° to the axis?  
4. Show that a plane mirror is mathematically the limiting case of the mirror equation when \(R \to \infty\).  
5. An object moves from infinity toward the focus of a concave mirror. Describe qualitatively how image distance and magnification change.