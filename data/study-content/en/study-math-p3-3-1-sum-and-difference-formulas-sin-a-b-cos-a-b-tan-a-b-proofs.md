## 1. The one-sentence answer
**The sum and difference formulas are algebraic identities that express sin(A ± B), cos(A ± B), and tan(A ± B) exactly in terms of the six values sin A, sin B, cos A, cos B, and tan A.**

These identities arise because angles combine linearly on the circle while the functions themselves are nonlinear. Their proofs therefore reduce the problem of two angles to the geometry of a single pair of points whose chord length is already known from the unit-circle definition of cosine. Once the cosine difference formula is established, the remaining five identities follow by algebraic substitution and the even/odd properties of sine and cosine.

The formulas are not approximations; they hold for every pair of real numbers A and B. They convert every trigonometric expression involving a compound angle into an expression involving only the separate angles, which is the mechanical step that makes later identities and integrals tractable.

> [!NOTE]
> The single deepest insight is that the distance formula applied to two points on the unit circle already encodes the cosine of their angular separation; everything else is rearrangement.

## 2. Why this matters — concrete and current
In aerospace guidance, the strapdown inertial navigation algorithms inside SpaceX Falcon 9 and NASA’s Orion spacecraft rotate body-frame accelerometer readings into an Earth-centered inertial frame by applying successive direction-cosine matrices; each matrix element is built from the sum and difference formulas evaluated at the instantaneous roll, pitch, and yaw increments.

In semiconductor lithography, ASML’s extreme-ultraviolet scanners measure wavefront aberrations by interfering reference and test beams whose phase difference appears as a cosine of summed angles; the closed-form difference formula lets the control software subtract the known illumination angle from the measured fringe phase in a single arithmetic step rather than a numerical search.

Modern beamforming in 5G massive-MIMO base stations (Ericsson AIR 6449) steers nulls toward interfering users by computing the argument of complex exponentials of the form e^{j(k·θ)}; the angle-addition formula converts every such product into separate sine and cosine multiplies that fit inside the fixed-point DSP pipeline without transcendental function calls.

In machine-learning audio models such as OpenAI’s Whisper, the positional encoding of time steps inside the transformer uses sinusoidal functions of summed frequencies; the sum formula allows the model to pre-compute relative-position kernels as ordinary matrix multiplications instead of recomputing angles at every layer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Unit-circle definitions of sine and cosine | Supply the coordinates of the two points whose distance yields cos(A−B) |
| Distance formula in the plane | Converts the geometric separation of two angles into an algebraic expression |
| Even/odd identities: cos(−θ)=cos θ, sin(−θ)=−sin θ | Extend the difference formula to the sum formula without new geometry |
| Pythagorean identity sin²θ + cos²θ = 1 | Used to obtain sin(A±B) once cos(A±B) is known |

## 4. Building the idea — from intuition to formalism

### Step 1 — Place two angles on the unit circle
Any angle θ corresponds to the point (cos θ, sin θ). The angular separation between A and B is exactly the angle A−B; therefore the straight-line distance between the two points (cos A, sin A) and (cos B, sin B) must equal the chord length belonging to angle A−B, which is the distance between (cos(A−B), sin(A−B)) and (1,0).

### Step 2 — Write the squared Euclidean distance for both pairs
Equate the two expressions for the squared distance:
$$
(\cos A - \cos B)^2 + (\sin A - \sin B)^2 = (\cos(A-B) - 1)^2 + (\sin(A-B) - 0)^2.
$$

### Step 3 — Expand both sides and cancel identical terms
Left side expands to 2 − 2(cos A cos B + sin A sin B). Right side expands to 2 − 2 cos(A−B). Cancel the common 2 and divide by −2 to obtain the cosine difference formula.

### Step 4 — Obtain the cosine sum formula by sign change
Replace B by −B. Because cosine is even and sine is odd the left side becomes cos A cos B + sin A sin B while the right side becomes cos(A+B), yielding the sum formula.

### Step 5 — Derive the sine formulas from the cosine formulas
Use the co-function identity sin θ = cos(π/2 − θ). Then sin(A+B) = cos(π/2 − (A+B)) and apply the cosine sum formula already proved; the same route gives sin(A−B).

### Step 6 — Derive the tangent formulas by division
Divide the sine formula by the cosine formula:
$$
\tan(A \pm B) = \frac{\sin(A \pm B)}{\cos(A \pm B)} = \frac{\tan A \pm \tan B}{1 \mp \tan A \tan B},
$$
provided the relevant cosines are nonzero.

## 5. Worked examples — every step shown

**Example 1 — Direct verification of a difference**
*Given:* A = 75°, B = 15°.  
*Find:* cos(60°).  
Step: Apply cos(A−B) = cos A cos B + sin A sin B.  
Why: The identity has already been proved for all angles.  
Substitute: cos 75° = cos(45+30) = (√2/2)(√3/2) − (√2/2)(1/2) = √6/4 − √2/4.  
sin 75° = sin(45+30) = (√2/2)(√3/2) + (√2/2)(1/2) = √6/4 + √2/4.  
cos 15° = cos(45−30) = (√2/2)(√3/2) + (√2/2)(1/2) = √6/4 + √2/4.  
sin 15° = sin(45−30) = (√2/2)(√3/2) − (√2/2)(1/2) = √6/4 − √2/4.  
Now form cos A cos B + sin A sin B = (√6/4 + √2/4)(√6/4 − √2/4) + (√6/4 − √2/4)(√6/4 + √2/4) = 1/2.  
**½**  

*Reflection:* The arithmetic cancels exactly because the identity is an equality, not an approximation.

**Example 2 — Sine of a sum**
*Given:* Evaluate sin(75°).  
*Find:* Exact value.  
Apply sin(A+B) = sin A cos B + cos A sin B with A = 45°, B = 30°.  
Why: The sine-sum formula follows directly from the cosine difference via the co-function identity.  
sin 45° cos 30° + cos 45° sin 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.  
**(√6 + √2)/4**

*Reflection:* One identity re-uses another; no new geometry is required.

**Example 3 — Tangent of a difference**
*Given:* tan(15°).  
*Find:* Exact value.  
Apply tan(A−B) = (tan A − tan B)/(1 + tan A tan B), A = 45°, B = 30°.  
Why: Division of the already-proved sine and cosine formulas.  
(1 − 1/√3)/(1 + 1/√3) = (√3 − 1)/(√3 + 1). Rationalize by multiplying numerator and denominator by √3 − 1 to obtain 2 − √3.  
**2 − √3**

*Reflection:* The tangent formula inherits all domain restrictions of the original sine and cosine formulas.

**Example 4 — Compound angle inside another identity**
*Given:* Prove sin(3θ) = 3 sin θ − 4 sin³ θ.  
*Find:* The triple-angle formula.  
Write sin(3θ) = sin(2θ + θ) = sin(2θ)cos θ + cos(2θ)sin θ.  
Why: Use the sum formula with A = 2θ, B = θ.  
Substitute the double-angle identities sin 2θ = 2 sin θ cos θ and cos 2θ = cos² θ − sin² θ.  
2 sin θ cos² θ + (cos² θ − sin² θ) sin θ = 2 sin θ (1 − sin² θ) + sin θ (1 − 2 sin² θ) after using cos² θ = 1 − sin² θ.  
Collect terms: 3 sin θ − 4 sin³ θ.  
**3 sin θ − 4 sin³ θ**

*Reflection:* The sum formula turns every multiple-angle problem into a polynomial in a single sine or cosine.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sign error in cos(A−B) versus cos(A+B) | Students remember “cosine keeps the plus” but forget which identity carries the plus | Always derive the difference formula first from the distance; the sum follows by the even property |
| Using tan(A+B) when cos(A+B)=0 | The division step is undefined | Check that the denominator 1 − tan A tan B ≠ 0 before writing the tangent formula |
| Treating A and B as acute only | The geometric proof never assumes positivity | Verify each new identity on a calculator with one negative angle |
| Forgetting the Pythagorean check after obtaining sin(A±B) | sin(A+B) is obtained from cos(A+B) via the identity, not by a second distance | After writing sin(A+B), square it with cos(A+B) and confirm the sum equals 1 |
| Applying the formula to tan when both angles are 45° | 1 − tan A tan B = 0 produces division by zero | Recognize that tan(90°) is undefined and exclude the case |
| Confusing the order inside sin(B−A) | The formula is odd in the second argument | Always expand sin(B−A) = −sin(A−B) explicitly before substituting numbers |
| Using degrees and radians interchangeably inside the same expression | The algebraic identities are independent of unit, but numerical checks are not | Convert every numerical test to a single unit before evaluating |

## 7. The textbook-precise statement
Let A, B ∈ ℝ. Then
$$
\begin{align*}
\cos(A-B)&=\cos A\cos B+\sin A\sin B,\\
\cos(A+B)&=\cos A\cos B-\sin A\sin B,\\
\sin(A-B)&=\sin A\cos B-\cos A\sin B,\\
\sin(A+B)&=\sin A\cos B+\cos A\sin B,\\
\tan(A-B)&=\frac{\tan A-\tan B}{1+\tan A\tan B}\quad(\text{provided }1+\tan A\tan B\neq0),\\
\tan(A+B)&=\frac{\tan A+\tan B}{1-\tan A\tan B}\quad(\text{provided }1-\tan A\tan B\neq0).
\end{align*}
$$
These six identities appear as Theorem 3 in Stewart, *Calculus*, 9e, §3.4.

## 8. Visual — diagram or schematic
```text
Unit circle, origin O
Point P: (cos A, sin A)   angle A from positive x-axis
Point Q: (cos B, sin B)   angle B from positive x-axis
Point R: (1, 0)           reference for angle 0
Chord PQ has length equal to chord between R and the point at angle |A-B|
Squared length PQ² = 2 − 2(cos A cos B + sin A sin B)
Squared length RR'² = 2 − 2 cos(A-B)
Equating both expressions yields the cosine difference formula.
```
(The diagram is fully determined by the four labeled points and the two chord lengths; any standard unit-circle sketch with those coordinates reproduces the proof.)

## 9. The memory technique
**The hook**  
Picture two arrows on a clock face; the straight-line distance between their tips already knows the angle between them—this distance is the cosine difference.

**What to overlearn**  
1. cos(A−B) = cos A cos B + sin A sin B (the single root identity)  
2. sin θ = cos(π/2 − θ) (the bridge to all sine formulas)  
3. tan(A+B) = (tan A + tan B)/(1 − tan A tan B) with its exact denominator condition

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Return to the unit-circle distance between (cos A, sin A) and (cos B, sin B); expand and simplify; all other formulas follow by sign changes and division.

## 10. What this unlocks
These identities are the gateway to every subsequent manipulation in trigonometry and to Fourier analysis.

- Multiple-angle and half-angle formulas  
- Trigonometric solution of cubic equations  
- Linear differential equations with constant coefficients (characteristic equation method)  
- Discrete Fourier transform and FFT butterfly diagrams  
- Rotation matrices in linear algebra and computer graphics

## 11. Self-check — five questions, no answers
1. Using only the distance argument on the unit circle, derive cos(A−B) without quoting any sum or difference formula in advance.  
2. Evaluate sin(105°) in exact radical form by applying the sum formula once.  
3. Show that tan(22.5°) satisfies the quadratic equation x² − √2 x − 1? Wait, derive the correct quadratic from the half-angle case of the tangent difference formula.  
4. Identify the precise values of A and B for which the expression (tan A + tan B)/(1 − tan A tan B) is undefined even though both tan A and tan B are defined.  
5. Prove that cos(A+B)cos(A−B) = cos²A − sin²B by expanding the left-hand side with the sum and difference formulas and simplifying.