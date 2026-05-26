## 1. The one-sentence answer
**The ASTC rule states that the signs of the three primary trigonometric functions are completely determined by the quadrant in which the angle terminates: sine is positive in quadrants I and II, cosine is positive in quadrants I and IV, and tangent is positive in quadrants I and III.**

An angle measured from the positive x-axis lands in one of four quadrants on the unit circle. Each quadrant fixes the signs of the x- and y-coordinates, and because sine equals y, cosine equals x, and tangent equals y/x, the signs of the functions follow at once. The rule therefore converts any angle larger than 90° into an equivalent acute reference angle whose trigonometric values are already known, together with a single sign correction.

The same logic extends beyond 360° by first reducing the angle modulo 360° to an equivalent angle between 0° and 360°. Once that reduction is performed, the quadrant and therefore the sign pattern are fixed.

> [!NOTE]
> The single most powerful insight is that the numerical magnitude is always taken from the acute reference angle; only the sign changes with the quadrant.

## 2. Why this matters — concrete and current
In satellite attitude control, engineers at SpaceX compute the direction cosine matrix that orients a Starlink satellite; each entry is a sine or cosine of an angle that routinely exceeds 90° when the vehicle rolls or pitches, and the ASTC rule guarantees the correct sign without recomputing the entire rotation matrix from scratch.

In semiconductor lithography, ASML’s EUV scanners steer a laser beam through angles greater than 180° inside the illuminator optics; the phase-shift calculations that maintain nanometer overlay accuracy rely on the correct quadrant signs of sine and cosine to keep wavefront errors below 10 mrad.

In inertial navigation systems used by Boeing aircraft, the strapdown algorithm integrates body-frame angular rates into Euler angles that wrap through all four quadrants thousands of times per flight; an undetected sign error in cosine immediately produces a heading drift that exceeds the required 0.01°/h specification.

In power-system protection relays manufactured by Siemens, the phasor measurement unit extracts the argument of a complex voltage whose angle can lie anywhere in [0°, 360°); the ASTC rule supplies the quadrant information needed to decide whether a fault lies in the forward or reverse direction.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Unit-circle definition of sine, cosine, tangent | Supplies the coordinate interpretation that determines signs |
| Reference angle          | Reduces any angle to an acute angle whose values are tabulated |
| Coterminal angles        | Allows reduction of angles larger than 360°               |
| Basic right-triangle ratios | Provides the positive numerical values used after the sign is attached |

## 4. Building the idea — from intuition to formalism

### Step 1 — Quadrants fix coordinate signs
Any ray from the origin divides the plane into one of four quadrants. Inside each quadrant the x-coordinate and y-coordinate each carry a fixed sign.

Example: an angle of 120° terminates in quadrant II, where x is negative and y is positive.

Formally, the four open quadrants are defined by the intervals  
\[
(0^\circ,90^\circ),\ (90^\circ,180^\circ),\ (180^\circ,270^\circ),\ (270^\circ,360^\circ).
\]

> [!WARNING]
> Treating the boundaries 90°, 180°, etc. as belonging to a quadrant produces sign errors; those angles lie on the axes where one function is zero.

### Step 2 — Trigonometric functions read coordinates directly
On the unit circle,  
\[
\sin\theta = y,\qquad \cos\theta = x,\qquad \tan\theta = y/x.
\]
The sign of each function is therefore identical to the sign of the corresponding coordinate expression.

### Step 3 — Reference angle supplies the magnitude
The reference angle \(\theta_\text{ref}\) is the acute angle formed with the nearest x-axis. Its trigonometric values are always positive and can be read from a right triangle or a calculator in degree mode [0°, 90°].

### Step 4 — Attach the quadrant sign
Replace the positive values of \(\sin\theta_\text{ref}\), \(\cos\theta_\text{ref}\), \(\tan\theta_\text{ref}\) by the signs dictated by the quadrant of \(\theta\).

### Step 5 — Reduce angles beyond 360° first
Any angle \(\theta\) is coterminal with \(\theta \bmod 360^\circ\). Compute the remainder, then apply Steps 1–4.

### Step 6 — The resulting sign pattern
Collecting the signs quadrant by quadrant yields the compact rule:  
- Quadrant I: all three positive  
- Quadrant II: sine positive only  
- Quadrant III: tangent positive only  
- Quadrant IV: cosine positive only  

This is the textbook statement of the ASTC rule.

## 5. Worked examples — every step shown

**Example 1 — 150° sine**  
*Given:* \(\sin 150^\circ\)  
*Find:* exact value  
150° lies in quadrant II, so sine is positive.  
Reference angle = 180° − 150° = 30°.  
\(\sin 30^\circ = 1/2\).  
Attach positive sign.  
**\(\dfrac{1}{2}\)**  
*Reflection:* The only decision was quadrant membership; the numerical value came unchanged from the reference angle.

**Example 2 — 210° cosine**  
*Given:* \(\cos 210^\circ\)  
*Find:* exact value  
210° lies in quadrant III, so cosine is negative.  
Reference angle = 210° − 180° = 30°.  
\(\cos 30^\circ = \sqrt{3}/2\).  
Attach negative sign.  
**\(-\sqrt{3}/2\)**  
*Reflection:* The same reference angle appears again; only the quadrant sign changes.

**Example 3 — 315° tangent**  
*Given:* \(\tan 315^\circ\)  
*Find:* exact value  
315° lies in quadrant IV, so tangent is negative.  
Reference angle = 360° − 315° = 45°.  
\(\tan 45^\circ = 1\).  
Attach negative sign.  
**\(-1\)**  
*Reflection:* Tangent is the ratio y/x; both coordinates change sign together, preserving the ratio sign rule.

**Example 4 — 750° cosine**  
*Given:* \(\cos 750^\circ\)  
*Find:* exact value  
Reduce modulo 360°: 750° − 2×360° = 30°.  
30° lies in quadrant I, so cosine is positive.  
\(\cos 30^\circ = \sqrt{3}/2\).  
**\(\sqrt{3}/2\)**  
*Reflection:* The modular reduction must precede quadrant identification; otherwise the wrong sign pattern is applied.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using 90° as reference angle      | Student forgets axis angles have zero value | Always subtract from 180° or 360° to obtain acute reference |
| Forgetting to reduce angles >360° | Pattern-matching the given number directly  | Compute \(\theta \bmod 360^\circ\) before quadrant lookup |
| Assigning sign to reference angle | Confusing “acute” with “positive function”  | Keep reference values positive; attach sign afterwards |
| Mixing sine and cosine signs in QIII | Over-generalising “both negative” rule     | Memorise the single positive function per quadrant   |
| Calculator in wrong mode          | Degree/radian mismatch produces wrong magnitude | Verify mode before each calculation                  |
| Treating 180° as quadrant II      | Boundary ambiguity                          | Classify axis angles separately: sine or cosine is zero |
| Sign error on tangent in QIV      | Forgetting tangent = y/x                    | Track numerator and denominator signs independently  |

## 7. The textbook-precise statement
Let \(\theta\) be any real number. Let \(\theta' = \theta - 360^\circ k\) where \(k\in\mathbb{Z}\) is chosen so that \(0^\circ\le\theta'<360^\circ\). Let \(\alpha\) be the reference angle of \(\theta'\). Then  
\[
\sin\theta = \pm\sin\alpha,\qquad
\cos\theta = \pm\cos\alpha,\qquad
\tan\theta = \pm\tan\alpha,
\]  
where the sign is positive precisely when the function is positive in the quadrant containing \(\theta'\) (Stewart, *Calculus*, 9e, §3.4, Quadrantal Angles and Reference Angles).

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     II     |     I
          |  (sin+)    |  (all+)
          |            |
    180°--+------------+--0°/360°
          |            |
          |  (tan+)    |  (cos+)
          |     III    |     IV
          +------------+--> x
```
Label the four quadrants with the single positive function (or “All”) according to the ASTC pattern. The origin is the vertex; positive x-axis is 0°.

## 9. The memory technique
1. **The hook** — Picture the letters “ASTC” marching clockwise around the unit circle, each letter sitting inside its quadrant and shouting the one function that is allowed to be positive there.  
2. **What to overlearn** — The four sign patterns, the definition of reference angle, and the reduction \(\theta \bmod 360^\circ\).  
3. **Spaced-repetition schedule** — Review the quadrant diagram at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the unit-circle definitions \(\sin\theta=y\), \(\cos\theta=x\), \(\tan\theta=y/x\) and read the coordinate signs directly.

## 10. What this unlocks
Mastery of the ASTC rule removes the last obstacle to solving trigonometric equations, proving identities, and differentiating or integrating functions that contain angles outside [0°, 90°].  

- Solving general trigonometric equations  
- Sum-to-product identities and harmonic addition  
- Polar-to-rectangular conversions in vectors  
- Fourier-series coefficient calculations  
- Derivative formulas for \(\sin u(x)\) and \(\cos u(x)\) when \(u(x)\) exceeds 90°  

## 11. Self-check — five questions, no answers
1. Without a calculator, evaluate \(\sin 210^\circ\) and justify the sign.  
2. Reduce 945° to an equivalent angle between 0° and 360° and state its quadrant.  
3. A student claims \(\tan 300^\circ = -\sqrt{3}\). Is the claim correct? Explain the reference angle and sign choice.  
4. An angle \(\theta\) satisfies \(\cos\theta < 0\) and \(\sin\theta > 0\). Which quadrant must contain \(\theta\)?  
5. Compute \(\cos(-120^\circ)\) using the ASTC rule and the even/odd property of cosine; verify both routes agree.