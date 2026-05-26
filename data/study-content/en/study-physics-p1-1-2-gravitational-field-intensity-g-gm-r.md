## 1. The one-sentence answer
**Gravitational field intensity** is the gravitational force per unit mass exerted by a source mass at a distance, given exactly by \( g = GM/r^2 \) directed toward the source.

Newton observed that the force between two masses weakens with the square of their separation. Dividing that force by the test mass removes the dependence on the test object and isolates a property of the source alone: a vector field whose magnitude at distance \( r \) is set only by the source mass \( M \) and the universal constant \( G \). The resulting expression therefore describes how strongly space itself is “pulled” at every point around \( M \).

This field concept converts the two-body problem into a one-body problem: any small mass placed in the field experiences an acceleration identical to the field strength, independent of its own mass. The inverse-square dependence follows directly from the geometry of three-dimensional space; the same area must be shared by the total “pull” at every spherical shell.

> [!NOTE]
> The field is not a force; it is the force that would act on a 1 kg test mass. Once the field is known, the actual force on any object is obtained by simple multiplication by its mass.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage recovery calculations use the exact radial dependence \( GM/r^2 \) to predict residual thrust needed at 50 km altitude where local gravity has already dropped by 1.5 %.  

NASA’s Juno mission at Jupiter required real-time corrections to the gravity field model because the planet’s oblateness modifies the simple point-mass formula inside 1.5 Jupiter radii; the measured deviation reached 0.2 % and directly affected orbit insertion propellant budgets.  

GPS satellites orbit at 20 200 km where gravitational acceleration is 0.56 m s^{-2}; relativistic time-dilation corrections are computed from the same \( GM/r^2 \) term that appears in the Schwarzschild metric, keeping clock errors below 40 ns per day.  

Semiconductor manufacturers simulate electrostatic analogues of gravitational fields when designing ion-implantation beams; the inverse-square fall-off governs beam divergence exactly as planetary gravity governs satellite paths.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Field strength is force per unit mass, \( \mathbf{g} = \mathbf{F}/m \) |
| Newton’s law of gravitation | Supplies the starting force \( F = GMm/r^2 \)            |
| Vector direction         | Gravitational field is a vector pointing toward the source |
| Spherical symmetry       | Allows replacement of extended bodies by point masses at their centers |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force between two point masses
The mutual attraction between masses \( M \) and \( m \) separated by distance \( r \) is an inverse-square central force.  
Concrete example: Earth (\( M \)) and a 1 kg object (\( m \)) at the surface give a measurable pull of roughly 9.8 N.  
Formal statement:  
$$ F = \frac{G M m}{r^2} $$  
> [!WARNING]  
> Treating the force as a property of the test mass alone leads to the incorrect conclusion that heavier objects fall faster in vacuum.

### Step 2 — Define field strength by removing test-mass dependence
Divide the force by \( m \). The resulting quantity depends only on the source.  
Formal statement:  
$$ g = \frac{F}{m} = \frac{G M}{r^2} $$  
> [!WARNING]  
> Omitting the division leaves the expression dimensionally inconsistent with acceleration.

### Step 3 — Recognize the field as a vector
The direction is always toward \( M \). In radial coordinates the field is  
$$ \mathbf{g}(\mathbf{r}) = -\frac{G M}{r^2} \hat{r} $$  
> [!WARNING]  
> Using a positive sign without the unit vector \( \hat{r} \) reverses the physical direction of free-fall acceleration.

### Step 4 — Extend to spherical bodies via shell theorem
Any spherically symmetric mass distribution produces the same external field as a point mass at its center.  
Formal statement remains \( g = GM/r^2 \) for \( r \) outside the body.  
> [!WARNING]  
> Applying the point-mass formula inside a uniform sphere yields an incorrect linear rise instead of the true quadratic drop.

### Step 5 — Arrive at the textbook expression for gravitational field intensity
Combining the preceding steps yields the standard result used throughout orbital mechanics:  
$$ g(r) = \frac{G M}{r^2} \quad (r \ge R) $$  
directed radially inward.

## 5. Worked examples — every step shown

**Example 1 — Surface gravity of Earth**  
*Given:* \( M_E = 5.972 \times 10^{24} \) kg, \( R_E = 6.371 \times 10^6 \) m, \( G = 6.67430 \times 10^{-11} \) m³ kg⁻¹ s⁻².  
*Find:* \( g \) at the surface.  

Step 1: Write the field formula  
$$ g = \frac{G M_E}{R_E^2} $$  
*Why:* Direct application of the definition derived in Step 5.  

Step 2: Substitute numerical values  
$$ g = \frac{(6.67430 \times 10^{-11})(5.972 \times 10^{24})}{(6.371 \times 10^6)^2} $$  
*Why:* Arithmetic substitution preserves units of m s⁻².  

Step 3: Evaluate  
$$ g = 9.822 \text{ m s}^{-2} $$  
**9.822 m s⁻²**  

*Reflection:* The slight excess over the conventional 9.81 arises from using mean radius; latitude and rotation corrections are separate effects.

**Example 2 — Gravity at geostationary altitude**  
*Given:* Same Earth values, altitude 35 786 km so \( r = 4.216 \times 10^7 \) m.  
*Find:* \( g \).  

Step 1: Insert larger \( r \)  
$$ g = \frac{G M_E}{(4.216 \times 10^7)^2} $$  
*Why:* Field depends only on radial distance from center.  

Step 2: Compute ratio of squares  
$$ \left( \frac{R_E}{r} \right)^2 = (0.151)^2 = 0.0228 $$  
*Why:* Scaling isolates the geometric dilution.  

Step 3: Multiply by surface value  
$$ g = 9.822 \times 0.0228 = 0.224 \text{ m s}^{-2} $$  
**0.224 m s⁻²**  

*Reflection:* The 1/r² factor reduces weight by a factor of ~44; satellites still “fall” at this reduced rate to stay in orbit.

**Example 3 — Field inside a uniform sphere (contrast case)**  
*Given:* Uniform sphere, \( r < R \).  
*Find:* Functional form of \( g(r) \).  

Step 1: Enclosed mass scales with volume  
$$ M_{\text{enc}} = M \left( \frac{r}{R} \right)^3 $$  
*Why:* Density is constant.  

Step 2: Apply Gauss’s law for gravity or shell theorem  
$$ g(r) = \frac{G M_{\text{enc}}}{r^2} = \frac{G M}{R^3} r $$  
*Why:* Only interior mass contributes.  
**\( g(r) \propto r \)**  

*Reflection:* The linear rise is the key signature distinguishing interior from exterior solutions.

**Example 4 — Ratio of surface gravities (Moon vs Earth)**  
*Given:* \( M_M = 0.0123 M_E \), \( R_M = 0.272 R_E \).  
*Find:* \( g_M / g_E \).  

Step 1: Form the ratio  
$$ \frac{g_M}{g_E} = \left( \frac{M_M}{M_E} \right) \left( \frac{R_E}{R_M} \right)^2 $$  
*Why:* \( G \) and constants cancel.  

Step 2: Insert numbers  
$$ \frac{g_M}{g_E} = 0.0123 \times (3.676)^2 = 0.165 $$  
**0.165**  

*Reflection:* The Moon’s weaker field is dominated by its smaller radius, not merely its smaller mass.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating g as constant everywhere | Everyday experience on Earth’s surface      | Always write \( g(r) \) and check the radial argument |
| Forgetting direction              | Scalar habit from introductory problems     | Attach \( -\hat{r} \) at every use           |
| Using diameter instead of radius  | Confusion between r and 2r                  | Draw the radial line from center to point    |
| Applying point-mass formula inside a body | Shell theorem not recalled                | Verify \( r \ge R \) before using \( GM/r^2 \) |
| Confusing field with potential    | Both vary as 1/r or 1/r²                    | Field is force per mass; potential is work per mass |
| Omitting G in numerical work      | Over-familiarity with “g = 9.8”             | Keep G explicit until final substitution     |
| Sign error in orbital equations   | Treating g as positive scalar               | Use vector form or explicit inward arrow     |

## 7. The textbook-precise statement
For a spherically symmetric mass distribution of total mass \( M \) and radius \( R \), the gravitational field intensity at a point outside the body (\( r \ge R \)) is the vector  
$$ \mathbf{g}(\mathbf{r}) = -\frac{G M}{r^2} \hat{r} \qquad (r \ge R). $$  
Inside a uniform sphere the field is linear: \( \mathbf{g}(\mathbf{r}) = -(GM/R^3) \mathbf{r} \). This is the direct consequence of Newton’s law of gravitation together with the shell theorem (see Feynman Lectures on Physics, Vol. I, §7–4).

## 8. Visual — diagram or schematic
```text
          r
   •------->----- M (center)
   |             |
   |<--- g --->  v  (field vector points inward)
 spherical shell of radius r
```
The diagram shows a single radial coordinate r measured from the center of mass M. The field vector g lies along the same line, directed toward M, with magnitude GM/r². All points on the spherical shell experience identical magnitude; direction is everywhere radial.

## 9. The memory technique
1. **The hook** — Picture a sphere whose surface area grows as r²; the same total gravitational “flux” is therefore diluted by exactly 1/r
2. **What to overlearn** — \( g = GM/r^2 \) (vector, inward) and the two domains: exterior inverse-square, interior linear.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \( F = GMm/r^2 \), divide by m, attach direction.

## 10. What this unlocks
Mastery of \( g = GM/r^2 \) supplies the acceleration term required by every subsequent orbital equation.  

- Two-body problem reduction to equivalent one-body motion  
- Derivation of Kepler’s third law and circular-orbit speed \( v = \sqrt{GM/r} \)  
- Escape-velocity formula and hyperbolic trajectories  
- Tidal forces via radial gradient of g  
- Perturbation theory for non-spherical mass distributions  

## 11. Self-check — five questions, no answers
1. Calculate the gravitational field strength at 2 Earth radii from Earth’s center and express the ratio to surface gravity.  
2. A uniform sphere of radius R has a spherical cavity whose center is at R/2. At the cavity’s center, is the field zero? Explain with vector reasoning.  
3. Why does the inverse-square law fail to describe gravity inside a hollow spherical shell?  
4. Two satellites orbit Earth at radii r and 2r. What is the exact ratio of the gravitational forces they experience?  
5. Identify the algebraic error in the following student claim: “Because g ∝ 1/r², doubling the distance quarters the weight, so escape velocity also drops by a factor of four.”